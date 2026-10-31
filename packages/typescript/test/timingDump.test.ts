import { API as AsyncAPI } from "@typescript/typescript/async";
import { API as SyncAPI } from "@typescript/typescript/sync";
import assert from "node:assert/strict";
import { once } from "node:events";
import {
    mkdtempSync,
    readdirSync,
    readFileSync,
    rmSync,
} from "node:fs";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import {
    combineTimingInfo,
    disabledServerTimingInfo,
    TimingCollector,
} from "../src/api/timing.ts";
import {
    createMessageConnection,
    SocketMessageReader,
    SocketMessageWriter,
} from "../vendor/vscode-jsonrpc/lib/node/main.js";
import { createVirtualFileSystem } from "./testUtils.ts";

test("disabled server timing preserves the client-only snapshot", () => {
    const collector = new TimingCollector();
    collector.record({ method: "initialize", roundTripMs: 10, bytesSent: 1, bytesReceived: 1 });
    const local = collector.getInfo();
    assert.strictEqual(combineTimingInfo(local, disabledServerTimingInfo()), local);
});

test("timing dumps", async t => {
    const directory = mkdtempSync(join(tmpdir(), "ts-timing-"));
    const original = process.env.TS_API_TIMING_DIR;
    t.after(() => {
        if (original === undefined) delete process.env.TS_API_TIMING_DIR;
        else process.env.TS_API_TIMING_DIR = original;
        rmSync(directory, { recursive: true, force: true });
    });

    function assertDumpCount(count: number): void {
        const files = readdirSync(directory).filter(file => file.endsWith(".json"));
        assert.equal(files.length, count);
        for (const file of files) {
            assert.ok(Object.keys(JSON.parse(readFileSync(join(directory, file), "utf8"))).length > 0);
        }
    }

    let count = 0;
    for (const [mode, API] of [["async", AsyncAPI], ["sync", SyncAPI]] as const) {
        for (const value of [undefined, "", directory]) {
            await t.test(`${mode}: dumping ${value ? "enabled" : value === "" ? "empty" : "unset"}`, async () => {
                if (value === undefined) delete process.env.TS_API_TIMING_DIR;
                else process.env.TS_API_TIMING_DIR = value;
                const api = new API({ collectTiming: false });
                try {
                    await api.parseCommandLine([]);
                    assert.equal((await api.getTimingInfo()).enabled, !!value);
                    assertDumpCount(count);
                }
                finally {
                    await api.close();
                }
                if (value) count++;
                assertDumpCount(count);
                await api.close();
                assertDumpCount(count);
            });
        }
    }

    process.env.TS_API_TIMING_DIR = directory;
    await t.test("sync: preserves a dump after a filesystem callback throws", async t => {
        const warning = t.mock.method(process, "emitWarning", () => {});
        const api = new SyncAPI({
            fs: {
                ...createVirtualFileSystem({}),
                readFile() {
                    throw new Error("read failed");
                },
            },
        });
        try {
            api.parseCommandLine([]);
            assert.throws(() => api.readConfigFile("/tsconfig.json"), /read failed/);
            assert.throws(() => api.parseCommandLine([]), /read failed/);
            assert.throws(() => api.getTimingInfo(), /read failed/);
        }
        finally {
            api.close();
        }
        assertDumpCount(++count);
        assert.equal(warning.mock.callCount(), 0);
    });

    for (const scenario of ["error", "disconnect", "disabled"] as const) {
        await t.test(`async: preserves a dump when server timing is ${scenario}`, { timeout: 5000 }, async t => {
            const warning = t.mock.method(process, "emitWarning", () => {});
            const pipe = process.platform === "win32" ? `\\\\.\\pipe\\ts-timing-${process.pid}` : join(directory, "api.sock");
            let disconnect = () => {};
            const server = createServer(socket => {
                const connection = createMessageConnection(new SocketMessageReader(socket), new SocketMessageWriter(socket));
                disconnect = () => {
                    connection.dispose();
                    socket.destroy();
                };
                connection.onRequest("initialize", () => ({ currentDirectory: process.cwd(), caseSensitivity: 1 }));
                connection.onRequest("getServerTiming", () => {
                    if (scenario === "disconnect") {
                        disconnect();
                        return new Promise(() => {});
                    }
                    if (scenario === "disabled") return disabledServerTimingInfo();
                    throw new Error("server timing unavailable");
                });
                connection.listen();
            });
            t.after(() => {
                disconnect();
                return new Promise<void>(resolve => server.close(() => resolve()));
            });
            server.listen(pipe);
            await once(server, "listening");
            const api = await AsyncAPI.fromLSPConnection({ pipe });
            await api.close();
            assertDumpCount(++count);
            assert.equal(warning.mock.callCount(), 0);
        });
    }
});
