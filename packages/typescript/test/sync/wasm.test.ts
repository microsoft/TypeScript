import {
    instantiateWasm,
    WasmTransport,
    wasmURL,
} from "@typescript/typescript-wasip1-wasm";
import {
    isIdentifier,
    isVariableStatement,
} from "@typescript/typescript/unstable/ast";
import { API as AsyncAPI } from "@typescript/typescript/unstable/async";
import { API as SyncAPI } from "@typescript/typescript/unstable/sync";
import assert from "node:assert";
import { spawn } from "node:child_process";
import {
    mkdtemp,
    open,
    readFile,
    rm,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import {
    describe,
    test,
} from "node:test";
import { WASI } from "node:wasi";

describe("API over WebAssembly", () => {
    test("runs the compiler command from the same module", async () => {
        const WebAssembly = (globalThis as any).WebAssembly;
        const directory = await mkdtemp(path.join(tmpdir(), "typescript-wasip1-"));
        try {
            const stdoutPath = path.join(directory, "stdout");
            const stdout = await open(stdoutPath, "w+");
            try {
                const wasi = new WASI({
                    version: "preview1",
                    args: ["tsc.wasm", "--version"],
                    env: { PWD: "/" },
                    preopens: { "/": process.cwd() },
                    stdout: stdout.fd,
                    returnOnExit: true,
                });
                const module = await WebAssembly.compile(await readFile(wasmURL));
                const instance = await WebAssembly.instantiate(module, {
                    wasi_snapshot_preview1: wasi.wasiImport,
                });
                assert.strictEqual(wasi.start(instance), 0);
            }
            finally {
                await stdout.close();
            }
            assert.match(await readFile(stdoutPath, "utf8"), /^Version \d+\.\d+\.\d+/);
        }
        finally {
            await rm(directory, { recursive: true });
        }
    });

    test("exits successfully when LSP stdin closes", async () => {
        const WebAssembly = (globalThis as any).WebAssembly;
        const directory = await mkdtemp(path.join(tmpdir(), "typescript-wasip1-"));
        try {
            const stdin = await open(path.join(directory, "stdin"), "w+");
            const stdout = await open(path.join(directory, "stdout"), "w+");
            const stderr = await open(path.join(directory, "stderr"), "w+");
            try {
                const wasi = new WASI({
                    version: "preview1",
                    args: ["tsc.wasm", "--lsp", "--stdio"],
                    env: { PWD: "/" },
                    preopens: { "/": process.cwd() },
                    stdin: stdin.fd,
                    stdout: stdout.fd,
                    stderr: stderr.fd,
                    returnOnExit: true,
                });
                const module = await WebAssembly.compile(await readFile(wasmURL));
                const instance = await WebAssembly.instantiate(module, {
                    wasi_snapshot_preview1: wasi.wasiImport,
                });
                assert.strictEqual(wasi.start(instance), 0);
            }
            finally {
                await Promise.all([stdin.close(), stdout.close(), stderr.close()]);
            }
        }
        finally {
            await rm(directory, { recursive: true });
        }
    });

    test("waits for LSP stdin without repeatedly reading", { timeout: 10_000 }, async () => {
        const childSource = `
            import { readFileSync } from "node:fs";
            import { WASI } from "node:wasi";
            const wasi = new WASI({
                version: "preview1",
                args: ["tsc.wasm", "--lsp", "--stdio"],
                env: { PWD: "/" },
                preopens: { "/": process.cwd() },
                returnOnExit: true,
            });
            let reads = 0;
            const imports = {
                ...wasi.wasiImport,
                fd_read(...args) {
                    if (++reads > 10) throw new Error("stdin was read repeatedly while idle");
                    return wasi.wasiImport.fd_read(...args);
                },
            };
            const module = await WebAssembly.compile(readFileSync(new URL(${JSON.stringify(wasmURL.toString())})));
            const instance = await WebAssembly.instantiate(module, { wasi_snapshot_preview1: imports });
            process.exitCode = wasi.start(instance);
        `;
        const child = spawn(process.execPath, ["--input-type=module", "-e", childSource], {
            cwd: process.cwd(),
            stdio: ["pipe", "pipe", "pipe"],
        });
        let stdout = "";
        let stderr = "";
        child.stdout.setEncoding("utf8");
        child.stderr.setEncoding("utf8");
        child.stdout.on("data", chunk => stdout += chunk);
        child.stderr.on("data", chunk => stderr += chunk);

        await new Promise(resolve => setTimeout(resolve, 250));
        const request = JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "initialize",
            params: {
                processId: null,
                capabilities: {},
                rootUri: null,
                workspaceFolders: null,
            },
        });
        child.stdin.write(`Content-Length: ${Buffer.byteLength(request)}\r\n\r\n${request}`);

        while (!stdout.includes("Resolved client capabilities") && child.exitCode === null) {
            await new Promise(resolve => setTimeout(resolve, 10));
        }
        child.stdin.end();
        const exitCode = child.exitCode ?? await new Promise<number | null>(resolve => child.once("exit", resolve));
        assert.strictEqual(exitCode, 0, stderr);
        assert.match(stdout, /Resolved client capabilities/);
    });

    test("waits for API stdin without repeatedly reading", { timeout: 10_000 }, async () => {
        const childSource = `
            import { readFileSync } from "node:fs";
            import { WASI } from "node:wasi";
            const wasi = new WASI({
                version: "preview1",
                args: ["tsc.wasm", "--api"],
                env: { PWD: "/" },
                preopens: { "/": process.cwd() },
                returnOnExit: true,
            });
            let reads = 0;
            const imports = {
                ...wasi.wasiImport,
                fd_read(...args) {
                    if (++reads > 10) throw new Error("stdin was read repeatedly while idle");
                    return wasi.wasiImport.fd_read(...args);
                },
            };
            const module = await WebAssembly.compile(readFileSync(new URL(${JSON.stringify(wasmURL.toString())})));
            const instance = await WebAssembly.instantiate(module, { wasi_snapshot_preview1: imports });
            process.exitCode = wasi.start(instance);
        `;
        const child = spawn(process.execPath, ["--input-type=module", "-e", childSource], {
            cwd: process.cwd(),
            stdio: ["pipe", "pipe", "pipe"],
        });
        let stderr = "";
        child.stderr.setEncoding("utf8");
        child.stderr.on("data", chunk => stderr += chunk);

        await new Promise(resolve => setTimeout(resolve, 250));
        child.stdin.end();
        const exitCode = child.exitCode ?? await new Promise<number | null>(resolve => child.once("exit", resolve));
        assert.strictEqual(exitCode, 0, stderr);
    });

    test("runs the compiler and checker through the reactor", async () => {
        const WebAssembly = (globalThis as any).WebAssembly;
        const module = await WebAssembly.compile(
            await readFile(wasmURL),
        );
        assert.deepStrictEqual(
            [...new Set(WebAssembly.Module.imports(module).map((value: { module: string; }) => value.module))],
            ["wasi_snapshot_preview1"],
        );
        const exportNames = WebAssembly.Module.exports(module).map((value: { name: string; }) => value.name);
        assert.ok(exportNames.includes("_start"));
        assert.ok(exportNames.includes("typescript_initialize"));
        assert.ok(!exportNames.includes("_initialize"));
        const instance = await instantiateWasm(module, { stdout: undefined, stderr: undefined });

        assert.throws(
            () =>
                new WasmTransport({
                    instance: { exports: instance.exports },
                    cwd: undefined,
                    useCaseSensitiveFileNames: undefined,
                    collectTiming: undefined,
                    fs: { writeFile() {} },
                }),
            /was not created by instantiateWasm/,
        );

        const emittedFiles = new Map<string, string>();
        const transport = new WasmTransport({
            instance,
            cwd: "/",
            collectTiming: true,
            fs: {
                writeFile(path, data) {
                    emittedFiles.set(path, data);
                },
            },
        });
        const api = new SyncAPI({ transport, collectTiming: true });
        assert.strictEqual(transport.requestSync("echo", "text"), "text");
        assert.deepStrictEqual(
            transport.requestBinarySync("echo", new Uint8Array([1, 2, 3])),
            new Uint8Array([1, 2, 3]),
        );

        transport.setFile("/tsconfig.json", "{}");
        transport.setFile("/src/index.ts", "export const value = 42 as const;");
        const snapshot = api.createSnapshot({
            openFiles: ["/src/index.ts"],
            fileNotifications: {
                changed: ["/tsconfig.json", "/src/index.ts"],
                deleted: [],
            },
        });
        const project = snapshot.getDefaultProjectForFile("/src/index.ts");
        assert.ok(project);
        const sourceFile = project.program.getSourceFile("/src/index.ts");
        assert.ok(sourceFile);
        const statement = sourceFile.statements[0];
        assert.ok(isVariableStatement(statement));
        const name = statement.declarationList.declarations[0].name;
        assert.ok(isIdentifier(name));
        const type = project.checker.getTypeAtLocation(name);
        assert.strictEqual(project.checker.typeToString(type), "42");
        assert.throws(
            () =>
                new WasmTransport({
                    instance,
                    fs: { writeFile() {} },
                }),
            /session already created/,
        );
        assert.deepStrictEqual(project.program.emit(), {
            diagnostics: [],
            emitSkipped: false,
            emittedFiles: ["/src/index.js"],
            fileSystem: undefined,
        });
        assert.strictEqual(emittedFiles.get("/src/index.js"), "export const value = 42;\n");

        const timing = api.getTimingInfo();
        assert.strictEqual(timing.enabled, true);
        assert.ok(timing.totals.requestCount > 0);
        assert.ok(timing.totals.serverTimeMs >= 0);
        Reflect.set(transport, "inCallback", true);
        assert.throws(
            () => transport.close(),
            /TypeScript WASM callbacks cannot close the same API transport/,
        );
        Reflect.set(transport, "inCallback", false);
        api.close();

        const secondTransport = new WasmTransport({ instance, cwd: "/" });
        const second = new SyncAPI({ transport: secondTransport });
        assert.strictEqual(secondTransport.requestSync("echo", "recreated"), "recreated");
        second.close();

        const asyncTransport = new WasmTransport({ instance, cwd: "/" });
        const asyncAPI = new AsyncAPI({ transport: asyncTransport });
        asyncTransport.setFile("/tsconfig.json", "{}");
        asyncTransport.setFile("/src/async.ts", "export const value = 42 as const;");
        const asyncSnapshot = await asyncAPI.createSnapshot({
            openFiles: ["/src/async.ts"],
            fileNotifications: {
                changed: ["/tsconfig.json", "/src/async.ts"],
                deleted: [],
            },
        });
        const asyncProject = await asyncSnapshot.getDefaultProjectForFile("/src/async.ts");
        assert.ok(asyncProject);
        const asyncSourceFile = await asyncProject.program.getSourceFile("/src/async.ts");
        assert.ok(asyncSourceFile);
        const asyncStatement = asyncSourceFile.statements[0];
        assert.ok(isVariableStatement(asyncStatement));
        const asyncName = asyncStatement.declarationList.declarations[0].name;
        assert.ok(isIdentifier(asyncName));
        const asyncType = await asyncProject.checker.getTypeAtLocation(asyncName);
        assert.strictEqual(await asyncProject.checker.typeToString(asyncType), "42");
        await asyncAPI.close();
    });
});
