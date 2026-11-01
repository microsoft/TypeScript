import assert from "node:assert/strict";
import { type ChildProcess } from "node:child_process";
import { randomUUID } from "node:crypto";
import {
    EventEmitter,
    once,
} from "node:events";
import {
    mkdtempSync,
    readdirSync,
    readFileSync,
    rmSync,
} from "node:fs";
import {
    createServer,
    type Socket,
} from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { PassThrough } from "node:stream";
import {
    test,
    type TestContext,
} from "node:test";
import {
    type Client,
    createClient,
} from "../../src/api/async/client.ts";
import {
    createStreamConnection,
    type MessageConnection,
    RequestType,
} from "../../src/api/async/jsonrpc.ts";
import {
    createMessageConnection,
    Message,
    SocketMessageReader,
    SocketMessageWriter,
    StreamMessageReader,
    StreamMessageWriter,
} from "../../vendor/vscode-jsonrpc/lib/node/main.js";

type TransportKind = "socket" | "spawn";

interface Peer {
    client: Client;
    requests: EventEmitter;
    disconnect(): void;
    replyAndDisconnect?: () => void;
}

const parsedCommandLine = { options: {}, fileNames: [], errors: [] };

async function createPeer(t: TestContext, kind: TransportKind, holdInitialize = false, timingDirectory?: string): Promise<Peer> {
    const previousDirectory = process.env.TS_API_TIMING_DIR;
    if (timingDirectory === undefined) delete process.env.TS_API_TIMING_DIR;
    else process.env.TS_API_TIMING_DIR = timingDirectory;
    t.after(() => {
        if (previousDirectory === undefined) delete process.env.TS_API_TIMING_DIR;
        else process.env.TS_API_TIMING_DIR = previousDirectory;
    });
    const requests = new EventEmitter();
    if (kind === "socket") {
        const pipe = process.platform === "win32"
            ? `\\\\.\\pipe\\ts-api-disconnect-${randomUUID()}`
            : join(tmpdir(), `ts-api-disconnect-${randomUUID()}.sock`);
        let socket: Socket | undefined;
        const queuedIds: (number | string)[] = [];
        const server = createServer(value => {
            socket = value;
            const connection = createMessageConnection(new SocketMessageReader(value), new SocketMessageWriter(value), undefined, {
                messageStrategy: {
                    handleMessage(message, next) {
                        if (
                            Message.isRequest(message) && message.id !== null && message.method === "parseCommandLine" &&
                            (message.params as { commandLine: string[]; }).commandLine[0] === "queue"
                        ) {
                            queuedIds.push(message.id);
                            requests.emit("request", "queue");
                            return;
                        }
                        if (
                            Message.isRequest(message) && message.method === "parseCommandLine" &&
                            (message.params as { commandLine: string[]; }).commandLine[0] === "replyAndClose"
                        ) {
                            const response = JSON.stringify({ jsonrpc: "2.0", id: message.id, result: parsedCommandLine });
                            value.end(`Content-Length: ${Buffer.byteLength(response)}\r\n\r\n${response}`);
                            return;
                        }
                        return next(message);
                    },
                },
            });
            connection.onRequest("initialize", () => {
                if (holdInitialize) {
                    requests.emit("request", "initialize");
                    return new Promise(() => {});
                }
                return { currentDirectory: process.cwd(), caseSensitivity: 1 };
            });
            connection.onRequest("parseCommandLine", (params: { commandLine: string[]; }) => {
                if (params.commandLine[0] === "hold") {
                    requests.emit("request", "parseCommandLine");
                    return new Promise(() => {});
                }
                return parsedCommandLine;
            });
            connection.onRequest("batchRequests", () => {
                requests.emit("request", "batchRequests");
                return new Promise(() => {});
            });
            connection.onRequest("getServerTiming", () => {
                requests.emit("request", "getServerTiming");
                return new Promise(() => {});
            });
            connection.listen();
        });
        server.listen(pipe);
        await once(server, "listening");
        const client = createClient({ pipe });
        t.after(async () => {
            await client.close();
            socket?.destroy();
            await new Promise<void>(resolve => server.close(() => resolve()));
        });
        return {
            client,
            requests,
            disconnect: () => socket!.destroy(),
            replyAndDisconnect: () => socket!.end(Buffer.concat(queuedIds.map(id => responseFrame(id, parsedCommandLine)))),
        };
    }

    // The client still uses a real spawned process and stdio streams. Replace only
    // the compiler executable with a small Node JSON-RPC peer for this test.
    const childProcess = process.getBuiltinModule("node:child_process");
    const spawn = childProcess.spawn;
    let child: ChildProcess | undefined;
    const script = `
        import { createMessageConnection, Message, StreamMessageReader, StreamMessageWriter } from ${JSON.stringify(new URL("../../vendor/vscode-jsonrpc/lib/node/main.js", import.meta.url).href)};
        const connection = createMessageConnection(new StreamMessageReader(process.stdin), new StreamMessageWriter(process.stdout), undefined, {
            messageStrategy: {
                handleMessage(message, next) {
                    if (Message.isRequest(message) && message.method === "parseCommandLine" && message.params.commandLine[0] === "replyAndClose") {
                        const response = JSON.stringify({ jsonrpc: "2.0", id: message.id, result: { options: {}, fileNames: [], errors: [] } });
                        process.stdout.end("Content-Length: " + Buffer.byteLength(response) + "\\r\\n\\r\\n" + response, () => process.exit(0));
                        return;
                    }
                    return next(message);
                },
            },
        });
        connection.onRequest("initialize", () => {
            if (${holdInitialize}) {
                process.send("initialize");
                return new Promise(() => {});
            }
            return { currentDirectory: process.cwd(), caseSensitivity: 1 };
        });
        connection.onRequest("parseCommandLine", params => {
            if (params.commandLine[0] === "hold") {
                process.send("parseCommandLine");
                return new Promise(() => {});
            }
            return { options: {}, fileNames: [], errors: [] };
        });
        connection.onRequest("batchRequests", () => {
            process.send("batchRequests");
            return new Promise(() => {});
        });
        connection.listen();
        process.on("message", () => process.exit(0));
        process.stdin.on("end", () => process.exit(0));
    `;
    t.mock.method(childProcess, "spawn", () => {
        child = spawn(process.execPath, ["--input-type=module", "--eval", script], { stdio: ["pipe", "pipe", "inherit", "ipc"] });
        child.on("message", message => requests.emit("request", message));
        return child;
    });
    const client = createClient({ tsserverPath: process.execPath, useCaseSensitiveFileNames: true });
    t.after(async () => {
        await client.close();
        if (child && child.exitCode === null && child.signalCode === null) {
            const exited = once(child, "exit");
            child.kill();
            await exited;
        }
    });
    return {
        client,
        requests,
        disconnect: () => {
            child!.send!("disconnect");
        },
    };
}

async function assertRejectsPromptly(promise: Promise<unknown>): Promise<void> {
    let timer: NodeJS.Timeout | undefined;
    try {
        await Promise.race([
            assert.rejects(promise, /closed|disposed/i),
            new Promise<never>((_, reject) => {
                timer = setTimeout(() => reject(new Error("Request did not reject after the connection closed")), 3000);
            }),
        ]);
    }
    finally {
        clearTimeout(timer);
    }
}

for (const kind of ["socket", "spawn"] as const) {
    test(`${kind}: receives a response before a graceful disconnect`, { timeout: 10000 }, async t => {
        const { client } = await createPeer(t, kind);
        await client.apiRequest("initialize", null);
        assert.deepEqual(await client.apiRequest("parseCommandLine", { commandLine: ["replyAndClose"] }), parsedCommandLine);
    });

    test(`${kind}: normal requests work and explicit close rejects an in-flight request`, { timeout: 10000 }, async t => {
        const { client, requests } = await createPeer(t, kind);
        await client.apiRequest("initialize", null);
        assert.deepEqual(await client.apiRequest("parseCommandLine", { commandLine: [] }), parsedCommandLine);
        const received = once(requests, "request");
        const pending = client.apiRequest("parseCommandLine", { commandLine: ["hold"] });
        assert.deepEqual(await received, ["parseCommandLine"]);
        const rejected = assertRejectsPromptly(pending);
        await client.close();
        await rejected;
        await assert.rejects(client.apiRequest("parseCommandLine", { commandLine: [] }), /closed/i);
    });

    test(`${kind}: disconnect rejects all in-flight and batched requests`, { timeout: 10000 }, async t => {
        const { client, requests, disconnect } = await createPeer(t, kind);
        await client.apiRequest("initialize", null);
        const pending: Promise<unknown>[] = [];
        for (let i = 0; i < 2; i++) {
            const received = once(requests, "request");
            pending.push(client.apiRequest("parseCommandLine", { commandLine: ["hold"] }));
            assert.deepEqual(await received, ["parseCommandLine"]);
        }
        const received = once(requests, "request");
        const batch = client.batchContext();
        pending.push(client.apiRequest("parseCommandLine", { commandLine: ["hold"] }));
        pending.push(client.apiRequest("parseCommandLine", { commandLine: ["hold"] }));
        batch[Symbol.dispose]();
        assert.deepEqual(await received, ["batchRequests"]);
        const rejected = Promise.all(pending.map(assertRejectsPromptly));
        disconnect();
        await rejected;
        await assert.rejects(client.apiRequest("parseCommandLine", { commandLine: [] }), /closed|disposed/i);
    });

    test(`${kind}: disconnect rejects requests held by a manual batch`, { timeout: 10000 }, async t => {
        const { client, disconnect } = await createPeer(t, kind);
        await client.apiRequest("initialize", null);
        const batch = client.batchContext();
        const pending = client.apiRequest("parseCommandLine", { commandLine: ["hold"] });
        const rejected = assertRejectsPromptly(pending);
        disconnect();
        await rejected;
        batch[Symbol.dispose]();
    });

    test(`${kind}: disconnect rejects initialization`, { timeout: 10000 }, async t => {
        const { client, requests, disconnect } = await createPeer(t, kind, true);
        const received = once(requests, "request");
        const pending = client.apiRequest("initialize", null);
        assert.deepEqual(await received, ["initialize"]);
        const rejected = assertRejectsPromptly(pending);
        disconnect();
        await rejected;
    });
}

for (const closeTime of ["before", "during", "after"] as const) {
    test(`a failed spawn can be retried when its streams close ${closeTime} the retry`, { timeout: 10000 }, async t => {
        const childProcess = process.getBuiltinModule("node:child_process");
        const created = new EventEmitter();
        const children: ChildProcess[] = [];
        t.mock.method(childProcess, "spawn", () => {
            const child = new EventEmitter() as ChildProcess;
            child.stdin = new PassThrough();
            child.stdout = new PassThrough();
            children.push(child);
            created.emit("child");
            return child;
        });
        const client = createClient({ tsserverPath: process.execPath, useCaseSensitiveFileNames: true });
        if (!("connect" in client)) throw new Error("Expected a process client");
        t.after(async () => {
            await client.close();
            for (const child of children) {
                child.stdin?.destroy();
                child.stdout?.destroy();
            }
        });

        const firstCreated = once(created, "child");
        const first = client.connect();
        await firstCreated;
        children[0].emit("error", new Error("temporary failure"));
        await assert.rejects(first, /temporary failure/);
        async function closeFirstStream(): Promise<void> {
            const closed = once(children[0].stdout!, "close");
            children[0].stdout!.destroy();
            await closed;
        }
        if (closeTime === "before") await closeFirstStream();

        const secondCreated = once(created, "child");
        const second = client.connect();
        await secondCreated;
        if (closeTime === "during") await closeFirstStream();
        const secondChild = children[1];
        const peer = createMessageConnection(new StreamMessageReader(secondChild.stdin as PassThrough), new StreamMessageWriter(secondChild.stdout as PassThrough));
        peer.onRequest("parseCommandLine", () => parsedCommandLine);
        peer.listen();
        secondChild.emit("spawn");
        await second;
        if (closeTime === "after") await closeFirstStream();
        assert.deepEqual(await client.apiRequest("parseCommandLine", { commandLine: [] }), parsedCommandLine);
        peer.dispose();
    });
}

function createWirePeer(t: TestContext) {
    const input = new PassThrough();
    const output = new PassThrough();
    const received = new EventEmitter();
    const { connection, drain } = createStreamConnection(input, output);
    connection.onClose(() => {
        void drain().then(() => connection.dispose());
    });
    connection.listen();
    let buffer: Buffer = Buffer.alloc(0);
    output.on("data", (chunk: Buffer) => {
        buffer = Buffer.concat([buffer, chunk]);
        while (true) {
            const headerEnd = buffer.indexOf("\r\n\r\n");
            if (headerEnd < 0) return;
            const length = Number(/Content-Length: (\d+)/i.exec(buffer.subarray(0, headerEnd).toString())![1]);
            const end = headerEnd + 4 + length;
            if (buffer.length < end) return;
            received.emit("request", JSON.parse(buffer.subarray(headerEnd + 4, end).toString()));
            buffer = buffer.subarray(end);
        }
    });
    t.after(() => {
        connection.dispose();
        input.destroy();
        output.destroy();
    });
    return { connection, input, output, received };
}

function responseFrame(id: number | string, result: unknown): Buffer {
    const body = JSON.stringify({ jsonrpc: "2.0", id, result });
    return Buffer.from(`Content-Length: ${Buffer.byteLength(body)}\r\n\r\n${body}`);
}

test("a close drains many complete responses and rejects a request with no response", { timeout: 10000 }, async t => {
    const { connection, input, received } = createWirePeer(t);
    const pending: Promise<unknown>[] = [];
    const ids: number[] = [];
    for (let i = 0; i < 31; i++) {
        const request = once(received, "request");
        pending.push(connection.sendRequest(new RequestType<unknown, unknown, void>("probe"), {}));
        const [message] = await request;
        ids.push(message.id);
    }
    const settled = Promise.allSettled(pending);
    input.end(Buffer.concat(ids.slice(0, -1).map(id => responseFrame(id, id))));
    const results = await settled;
    assert.deepEqual(results.slice(0, -1), ids.slice(0, -1).map(value => ({ status: "fulfilled", value })));
    assert.equal(results.at(-1)?.status, "rejected");
});

test("a close drains a fragmented complete response", { timeout: 10000 }, async t => {
    const { connection, input, received } = createWirePeer(t);
    const request = once(received, "request");
    const pending = connection.sendRequest(new RequestType<unknown, unknown, void>("probe"), {});
    const [message] = await request;
    const frame = responseFrame(message.id, "received");
    for (let offset = 0; offset < frame.length; offset += 3) input.write(frame.subarray(offset, offset + 3));
    input.end();
    assert.equal(await pending, "received");
});

for (const [description, invalidFrame] of [["malformed", "Content-Length: 1\r\n\r\n{"], ["empty", "Content-Length: 0\r\n\r\n"]] as const) {
    test(`a close drains a valid response after a ${description} JSON frame`, { timeout: 10000 }, async t => {
        const { connection, input, received } = createWirePeer(t);
        const request = once(received, "request");
        const pending = connection.sendRequest(new RequestType<unknown, unknown, void>("probe"), {});
        const [message] = await request;
        input.end(Buffer.concat([Buffer.from(invalidFrame), responseFrame(message.id, "received")]));
        assert.equal(await pending, "received");
    });
}

for (
    const [description, data] of [
        ["invalid JSON", "Content-Length: 1\r\n\r\n{"],
        ["invalid message", "Content-Length: 4\r\n\r\nnull"],
        ["invalid header", "Content-Length: invalid\r\n\r\n{}"],
        ["truncated frame", "Content-Length: 40\r\n\r\n{"],
    ] as const
) {
    test(`a close rejects a request after ${description}`, { timeout: 10000 }, async t => {
        const { connection, input, received } = createWirePeer(t);
        const request = once(received, "request");
        const pending = connection.sendRequest(new RequestType<unknown, unknown, void>("probe"), {});
        await request;
        const rejected = assertRejectsPromptly(pending);
        input.end(data);
        await rejected;
    });
}

test("writer close rejects pending requests without waiting for later input", { timeout: 10000 }, async t => {
    const { connection, input, output, received } = createWirePeer(t);
    const request = once(received, "request");
    const pending = connection.sendRequest(new RequestType<unknown, unknown, void>("probe"), {});
    await request;
    const rejected = assertRejectsPromptly(pending);
    const closed = once(output, "close");
    output.destroy();
    await closed;
    const body = JSON.stringify({ jsonrpc: "2.0", method: "notification" });
    const frame = Buffer.from(`Content-Length: ${Buffer.byteLength(body)}\r\n\r\n${body}`);
    for (let i = 0; i < 30; i++) input.write(frame);
    await rejected;
});

test("a close rejects pending requests after an invalid header followed by another message", { timeout: 10000 }, async t => {
    const { connection, input, received } = createWirePeer(t);
    const request = once(received, "request");
    const pending = connection.sendRequest(new RequestType<unknown, unknown, void>("probe"), {});
    await request;
    const rejected = assertRejectsPromptly(pending);
    const notification = new Promise<void>(resolve => connection.onNotification("notification", resolve));
    input.write("Content-Length: invalid\r\n\r\n");
    const body = JSON.stringify({ jsonrpc: "2.0", method: "notification" });
    input.write(`Content-Length: ${Buffer.byteLength(body)}\r\n\r\n${body}`);
    await notification;
    input.end();
    await rejected;
});

for (const invalidLength of ["invalid", "-1"]) {
    test(`a response followed by Content-Length ${invalidLength} does not prevent close`, { timeout: 10000 }, async t => {
        const { connection, input, received } = createWirePeer(t);
        const requests: Promise<unknown>[] = [];
        const ids: number[] = [];
        for (let i = 0; i < 2; i++) {
            const request = once(received, "request");
            requests.push(connection.sendRequest(new RequestType<unknown, unknown, void>("probe"), {}));
            const [message] = await request;
            ids.push(message.id);
        }
        const settled = Promise.allSettled(requests);
        input.write(Buffer.concat([responseFrame(ids[0], "received"), Buffer.from(`Content-Length: ${invalidLength}\r\n\r\n`)]));
        const body = JSON.stringify({ jsonrpc: "2.0", method: "notification" });
        input.end(`Content-Length: ${Buffer.byteLength(body)}\r\n\r\n${body}`);
        const results = await settled;
        assert.deepEqual(results[0], { status: "fulfilled", value: "received" });
        assert.equal(results[1].status, "rejected");
    });
}

test("a timing dump can be written after an unexpected disconnect", { timeout: 10000 }, async t => {
    const directory = mkdtempSync(join(tmpdir(), "ts-api-disconnect-timing-"));
    const { client, requests, disconnect } = await createPeer(t, "socket", false, directory);
    t.after(() => rmSync(directory, { recursive: true, force: true }));
    await client.apiRequest("initialize", null);
    const received = once(requests, "request");
    const pending = client.apiRequest("parseCommandLine", { commandLine: ["hold"] });
    await received;
    const rejected = assertRejectsPromptly(pending);
    disconnect();
    await rejected;
    await client.close();
    const files = readdirSync(directory);
    assert.equal(files.length, 1);
    assert.match(JSON.parse(readFileSync(join(directory, files[0]), "utf8")).serverTimingError, /closed|disposed/i);
});

test("a timing dump can be written when the server disconnects during close", { timeout: 10000 }, async t => {
    const directory = mkdtempSync(join(tmpdir(), "ts-api-disconnect-timing-"));
    const { client, requests, disconnect } = await createPeer(t, "socket", false, directory);
    t.after(() => rmSync(directory, { recursive: true, force: true }));
    await client.apiRequest("initialize", null);
    const received = once(requests, "request");
    const closing = client.close();
    assert.deepEqual(await received, ["getServerTiming"]);
    disconnect();
    await closing;
    const files = readdirSync(directory);
    assert.equal(files.length, 1);
    assert.match(JSON.parse(readFileSync(join(directory, files[0]), "utf8")).serverTimingError, /closed|disposed/i);
});

test("a timing dump includes responses drained after disconnect", { timeout: 10000 }, async t => {
    const directory = mkdtempSync(join(tmpdir(), "ts-api-disconnect-timing-"));
    const { client, requests, replyAndDisconnect } = await createPeer(t, "socket", false, directory);
    t.after(() => rmSync(directory, { recursive: true, force: true }));
    await client.apiRequest("initialize", null);
    const pending: Promise<unknown>[] = [];
    for (let i = 0; i < 30; i++) {
        const received = once(requests, "request");
        pending.push(client.apiRequest("parseCommandLine", { commandLine: ["queue"] }));
        assert.deepEqual(await received, ["queue"]);
    }
    assert.ok(replyAndDisconnect);
    const connection = (client as unknown as { connection: MessageConnection; }).connection;
    const closed = new Promise<void>(resolve => connection.onClose(resolve));
    replyAndDisconnect();
    await closed;
    await pending[0];
    await client.close();
    await Promise.all(pending);
    const files = readdirSync(directory);
    assert.equal(files.length, 1);
    const dump = JSON.parse(readFileSync(join(directory, files[0]), "utf8"));
    assert.equal(dump.timing.totals.requestCount, 31);
});
