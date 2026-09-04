import getExePath from "#getExePath";
import {
    createMessageConnection,
    StreamMessageReader,
    StreamMessageWriter,
} from "#vscode-jsonrpc/node";
import { API } from "@typescript/typescript/unstable/sync";
import assert from "node:assert";
import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { once } from "node:events";
import {
    closeSync,
    constants,
    existsSync,
    openSync,
    readFileSync,
    statSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import {
    fileURLToPath,
    pathToFileURL,
} from "node:url";

async function waitForRemoved(path: string): Promise<void> {
    for (let i = 0; i < 100 && existsSync(path); i++) {
        await new Promise(resolve => setTimeout(resolve, 10));
    }
    assert.equal(existsSync(path), false);
}

async function waitForCreated(path: string): Promise<void> {
    for (let i = 0; i < 100 && !existsSync(path); i++) {
        await new Promise(resolve => setTimeout(resolve, 10));
    }
    assert.equal(existsSync(path), true);
}

async function waitForReplaced(path: string, inode: number): Promise<void> {
    for (let i = 0; i < 100; i++) {
        try {
            if (statSync(path).ino !== inode) return;
        }
        catch {
            // The server removes stale endpoints before recreating them.
        }
        await new Promise(resolve => setTimeout(resolve, 10));
    }
    assert.notEqual(statSync(path).ino, inode);
}

test("connects synchronously to an existing API server", { timeout: 10_000 }, async () => {
    const endpoint = process.platform === "win32"
        ? `\\\\.\\pipe\\tsgo-api-test-${randomUUID()}`
        : path.join(tmpdir(), `tsgo-api-test-${randomUUID()}`);
    const child = spawn(getExePath(), ["--api", "--transport", `sync=${endpoint}`], {
        stdio: ["ignore", "ignore", "pipe"],
    });
    const childExit = once(child, "exit");

    try {
        {
            using api = new API({ pipe: endpoint });
            const commandLine = api.parseCommandLine(["--strict"]);
            assert.equal(commandLine.options.strict, true);
        }
        const [exitCode] = await childExit;
        assert.equal(exitCode, 0);
        if (process.platform !== "win32") {
            assert.equal(existsSync(endpoint + ".in"), false);
            assert.equal(existsSync(endpoint + ".out"), false);
        }
    }
    finally {
        if (child.exitCode === null) {
            child.kill();
        }
        await childExit;
    }
});

test("an unconnected synchronous API server can shut down", {
    timeout: 10_000,
    skip: process.platform === "win32",
}, async () => {
    const endpoint = path.join(tmpdir(), `tsgo-api-test-${randomUUID()}`);
    const child = spawn(getExePath(), ["--api", "--transport", `sync=${endpoint}`], {
        stdio: ["ignore", "ignore", "pipe"],
    });
    const childExit = once(child, "exit");

    try {
        await waitForCreated(endpoint + ".in");
        child.kill();
        await childExit;
        await waitForRemoved(endpoint + ".in");
        await waitForRemoved(endpoint + ".out");
    }
    finally {
        if (child.exitCode === null) {
            child.kill();
        }
        await childExit;
    }
});

test("a synchronous API server can replace stale FIFOs", {
    timeout: 10_000,
    skip: process.platform === "win32",
}, async () => {
    const endpoint = path.join(tmpdir(), `tsgo-api-test-${randomUUID()}`);
    const firstChild = spawn(getExePath(), ["--api", "--transport", `sync=${endpoint}`], {
        stdio: ["ignore", "ignore", "pipe"],
    });
    const firstExit = once(firstChild, "exit");
    let staleFd: number | undefined;

    try {
        await waitForCreated(endpoint + ".in");
        firstChild.kill("SIGKILL");
        await firstExit;
        assert.equal(existsSync(endpoint + ".in"), true);
        assert.equal(existsSync(endpoint + ".out"), true);
        // Keep the stale inode alive so the filesystem cannot reuse its number
        // for the replacement FIFO before waitForReplaced observes it.
        staleFd = openSync(endpoint + ".in", constants.O_RDWR | constants.O_NONBLOCK);
        const staleInode = statSync(endpoint + ".in").ino;

        const secondChild = spawn(getExePath(), ["--api", "--transport", `sync=${endpoint}`], {
            stdio: ["ignore", "ignore", "pipe"],
        });
        const secondExit = once(secondChild, "exit");
        let stderr = "";
        secondChild.stderr.setEncoding("utf8");
        secondChild.stderr.on("data", chunk => stderr += chunk);
        try {
            await waitForReplaced(endpoint + ".in", staleInode);
            {
                using api = new API({ pipe: endpoint });
                assert.equal(api.parseCommandLine(["--strict"]).options.strict, true);
            }
            const [exitCode] = await secondExit;
            assert.equal(exitCode, 0, stderr);
        }
        finally {
            if (secondChild.exitCode === null) {
                secondChild.kill();
            }
            await secondExit;
        }
    }
    finally {
        if (staleFd !== undefined) {
            closeSync(staleFd);
        }
        if (firstChild.exitCode === null) {
            firstChild.kill("SIGKILL");
        }
        await firstExit;
    }
});

test("connects synchronously to an API session in an existing LSP server", { timeout: 10_000 }, async () => {
    const child = spawn(getExePath(), ["--lsp", "--stdio"], {
        stdio: ["pipe", "pipe", "pipe"],
    });
    const childExit = once(child, "exit");
    const connection = createMessageConnection(
        new StreamMessageReader(child.stdout),
        new StreamMessageWriter(child.stdin),
    );
    connection.listen();

    try {
        await connection.sendRequest("initialize", {
            processId: process.pid,
            rootUri: null,
            capabilities: {},
        });
        connection.sendNotification("initialized", {});
        const repoRoot = fileURLToPath(new URL("../../../../", import.meta.url));
        const fileName = path.join(repoRoot, "tsc/testdata/fixtures/compiler/program.ts");
        connection.sendNotification("textDocument/didOpen", {
            textDocument: {
                uri: pathToFileURL(fileName).href,
                languageId: "typescript",
                version: 1,
                text: readFileSync(fileName, "utf8"),
            },
        });

        const { pipe } = await connection.sendRequest<{ sessionId: string; pipe: string; }>(
            "custom/initializeAPISession",
            { synchronous: true },
        );
        const api = API.fromLSPConnection({ pipe });
        try {
            const commandLine = api.parseCommandLine(["--strict"]);
            assert.equal(commandLine.options.strict, true);
            const snapshot = api.updateSnapshot();
            const sourceFile = snapshot.getProjects()[0].program.getSourceFile("program.ts");
            assert.equal(sourceFile?.fileName.endsWith("/program.ts"), true);
            snapshot.dispose();

            await connection.sendRequest("shutdown");
            connection.sendNotification("exit");
            await childExit;
            if (process.platform !== "win32") {
                await waitForRemoved(pipe + ".in");
                await waitForRemoved(pipe + ".out");
            }
        }
        finally {
            api.close();
        }
    }
    finally {
        connection.dispose();
        if (child.exitCode === null) {
            child.kill();
        }
        await childExit;
    }
});
