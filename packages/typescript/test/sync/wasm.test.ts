import { wasmURL } from "@typescript/typescript-wasip1-wasm";
import { API as SyncAPI } from "@typescript/typescript/sync";
import {
    instantiateWasm,
    instantiateWasmSync,
    WasmTransport,
} from "@typescript/typescript/wasm";
import binaryen from "binaryen";
import assert from "node:assert";
import { spawn } from "node:child_process";
import {
    mkdir,
    mkdtemp,
    open,
    readFile,
    rm,
    writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import {
    describe,
    test,
} from "node:test";
import { WASI } from "node:wasi";
import { serverFS } from "../../src/api/fs.ts";

describe("API over WebAssembly", () => {
    test("publishes its library file list", async () => {
        const libFilesURL = new URL("libFiles.json", wasmURL);
        const libFiles = JSON.parse(await readFile(libFilesURL, "utf8")) as string[];
        assert.ok(libFiles.includes("lib.d.ts"));
        assert.ok(libFiles.includes("lib.es5.d.ts"));
        assert.ok(libFiles.every(file => !file.includes("/")));
    });

    test("implements reactor stdio descriptor lifecycle", () => {
        const WebAssembly = (globalThis as any).WebAssembly;
        const output: string[] = [];
        const module = binaryen.parseText(`
            (module
                (import "wasi_snapshot_preview1" "fd_close" (func $fd_close (param i32) (result i32)))
                (import "wasi_snapshot_preview1" "fd_fdstat_get" (func $fd_fdstat_get (param i32 i32) (result i32)))
                (import "wasi_snapshot_preview1" "fd_write" (func $fd_write (param i32 i32 i32 i32) (result i32)))
                (memory (export "memory") 1)
                (func (export "typescript_initialize"))
                (func (export "write_stdout") (param $pointer i32) (param $length i32) (result i32)
                    (i32.store (i32.const 0) (local.get $pointer))
                    (i32.store (i32.const 4) (local.get $length))
                    (call $fd_write (i32.const 1) (i32.const 0) (i32.const 1) (i32.const 8))
                )
                (func (export "close_stdout") (result i32)
                    (call $fd_close (i32.const 1))
                )
                (func (export "stat_stdout") (result i32)
                    (call $fd_fdstat_get (i32.const 1) (i32.const 16))
                )
                (data (i32.const 32) "\\e2\\82")
            )
        `);
        const instance = instantiateWasmSync(
            new WebAssembly.Module(module.emitBinary()),
            { stdout: (text: string) => output.push(text) },
        );
        const exports = instance.exports as {
            write_stdout(pointer: number, length: number): number;
            close_stdout(): number;
            stat_stdout(): number;
        };

        assert.strictEqual(exports.write_stdout(32, 0), 0);
        assert.deepStrictEqual(output, []);
        assert.strictEqual(exports.write_stdout(32, 2), 0);
        assert.deepStrictEqual(output, []);
        assert.strictEqual(exports.close_stdout(), 0);
        assert.deepStrictEqual(output, ["\uFFFD"]);
        assert.strictEqual(exports.write_stdout(32, 0), 8);
        assert.strictEqual(exports.stat_stdout(), 8);
        assert.strictEqual(exports.close_stdout(), 8);
        module.dispose();
    });

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

    test("keeps paths resolved below the working directory in the compiler namespace", async () => {
        const WebAssembly = (globalThis as any).WebAssembly;
        const directory = await mkdtemp(path.join(tmpdir(), "typescript-wasip1-"));
        try {
            const root = path.join(directory, "root");
            // Windows cannot create a directory named like a drive.
            const projects = ["^/~ts-uri~/memfs/host/project", ...process.platform === "win32" ? [] : ["c:/project"]];
            for (const project of projects) {
                const projectDir = path.join(root, project);
                await mkdir(path.join(projectDir, "node_modules", "pkg"), { recursive: true });
                // Node's WASI cannot list directories on Windows.
                await writeFile(path.join(projectDir, "tsconfig.json"), `{ "compilerOptions": { "noEmit": true, "noLib": true, "types": [] }, "files": ["index.ts"] }`);
                await writeFile(path.join(projectDir, "index.ts"), `import { x } from "pkg";`);
                await writeFile(path.join(projectDir, "node_modules", "pkg", "package.json"), `{ "name": "pkg", "types": "index.d.ts" }`);
                await writeFile(path.join(projectDir, "node_modules", "pkg", "index.d.ts"), `export declare const x: number;`);
            }
            const module = await WebAssembly.compile(await readFile(wasmURL));
            // The same directories named by absolute paths stay POSIX paths.
            for (const project of [...projects, ...projects.map(project => `/${project}`)]) {
                const stdoutPath = path.join(directory, "stdout");
                const stdout = await open(stdoutPath, "w+");
                let exitCode: number | undefined;
                try {
                    const wasi = new WASI({
                        version: "preview1",
                        args: ["tsc.wasm", "-p", project, "--listFilesOnly"],
                        env: { PWD: "/" },
                        preopens: { "/": root },
                        stdout: stdout.fd,
                        returnOnExit: true,
                    });
                    const instance = await WebAssembly.instantiate(module, {
                        wasi_snapshot_preview1: wasi.wasiImport,
                    });
                    exitCode = wasi.start(instance);
                }
                finally {
                    await stdout.close();
                }
                const output = await readFile(stdoutPath, "utf8");
                assert.strictEqual(exitCode, 0, `tsc -p ${project} failed:\n${output}`);
                assert.deepStrictEqual(
                    output.trim().split("\n").sort(),
                    [`${project}/index.ts`, `${project}/node_modules/pkg/index.d.ts`],
                );
            }
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
                    if (++reads > 50) throw new Error("stdin was read repeatedly while idle");
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
                    if (++reads > 50) throw new Error("stdin was read repeatedly while idle");
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

    test("enforces reactor transport invariants", async () => {
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
        const memory = Reflect.get(instance.exports, "memory");
        assert.ok(memory instanceof WebAssembly.Memory);
        let transport!: WasmTransport;
        transport = new WasmTransport({
            instance,
            cwd: "/",
            collectTiming: true,
            fs: {
                writeFile(path, data) {
                    memory.grow(0);
                    assert.throws(
                        () => transport.close(),
                        /TypeScript WASM callbacks cannot close the same API transport/,
                    );
                    assert.throws(
                        () => transport.readFile("/src/index.ts"),
                        /TypeScript WASM callbacks cannot call the same API transport/,
                    );
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

        const rawContent = '\uFEFFconst lone = "\uD800";';
        transport.setFile("/raw.ts", rawContent);
        assert.strictEqual(transport.readFile("/raw.ts"), rawContent);
        transport.removeFile("/raw.ts");
        assert.throws(() => transport.setFile("", "text"), /panic setting file/);
        assert.throws(() => transport.removeFile(""), /panic removing file/);
        assert.throws(() => transport.readFile(""), /panic reading file/);

        transport.setFile("/tsconfig.json", `{ "compilerOptions": { "emitBOM": true } }`);
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
        assert.strictEqual(emittedFiles.get("/src/index.js"), "\uFEFFexport const value = 42;\n");
        assert.strictEqual(transport.requestSync("echo", "after callback"), "after callback");

        transport.setFileSystem({ writeFile: () => serverFS.useOS });
        project.program.emit();
        assert.strictEqual(transport.readFile("/src/index.js"), "\uFEFFexport const value = 42;\n");
        transport.setFileSystem({ writeFile: serverFS.error });
        assert.match(
            project.program.emit().diagnostics[0]?.text ?? "",
            /Could not write file '\/src\/index\.js': filesystem callback returned serverFS\.error/,
        );

        const largeResolution = { resolvedFileName: "/large.d.ts", padding: "x".repeat(100_000) };
        let resolverCalls = 0;
        const resolver = api.createModuleResolver({}, {
            resolveModuleName: () => {
                resolverCalls++;
                return largeResolution;
            },
        });
        assert.strictEqual(resolver.resolveModuleName("large", "/src", undefined).resolvedModule?.resolvedFileName, "/large.d.ts");
        assert.strictEqual(resolverCalls, 1);

        const timing = api.getTimingInfo();
        assert.strictEqual(timing.enabled, true);
        assert.ok(timing.totals.requestCount > 0);
        assert.ok(timing.totals.serverTimeMs >= 0);
        transport.registerCallback("retained", () => "");
        api.close();
        assert.deepStrictEqual(Reflect.get(transport, "callbackNames"), new Set());

        const secondTransport = new WasmTransport({ instance, cwd: "/" });
        const second = new SyncAPI({ transport: secondTransport });
        assert.strictEqual(secondTransport.requestSync("echo", "recreated"), "recreated");
        secondTransport.registerCallback("retained", () => "");
        transport.unregisterCallback("retained");
        assert.deepStrictEqual(Reflect.get(secondTransport, "callbackNames"), new Set(["retained"]));
        second.close();
    });
});
