import { wasmURL } from "@typescript/typescript-wasip1-wasm";
import { build } from "esbuild";
import assert from "node:assert";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import {
    after,
    before,
    describe,
    test,
} from "node:test";
import {
    type Browser,
    chromium,
} from "playwright";

/** Returns a module whose `run` export exercises the API entries at the given specifiers. */
function testModule(entries: { async: string; sync: string; wasm: string; fs: string; }): string {
    return `
import { API as AsyncAPI } from "${entries.async}";
import { API as SyncAPI } from "${entries.sync}";
import { instantiateWasm, WasmTransport } from "${entries.wasm}";
import { createFileSystemWithLib } from "${entries.fs}";

async function check(API, module) {
    const instance = await instantiateWasm(module);
    const transport = new WasmTransport({ instance, cwd: "/" });
    const api = new API({ transport });
    transport.setFile("/tsconfig.json", "{}");
    transport.setFile("/src/index.ts", "export const value = 42 as const;");
    try {
        const snapshot = await api.createSnapshot({
            openFiles: ["/src/index.ts"],
            fileNotifications: {
                changed: ["/tsconfig.json", "/src/index.ts"],
                deleted: [],
            },
        });
        const project = await snapshot.getDefaultProjectForFile("/src/index.ts");
        const sourceFile = await project.program.getSourceFile("/src/index.ts");
        const name = sourceFile.statements[0].declarationList.declarations[0].name;
        const type = await project.checker.getTypeAtLocation(name);
        return project.checker.typeToString(type);
    }
    finally {
        await api.close();
    }
}

export async function run() {
    const module = await WebAssembly.compileStreaming(fetch("/tsc.wasm"));
    return [
        await check(AsyncAPI, module),
        await check(SyncAPI, module),
        Object.keys(createFileSystemWithLib([]).symlinks).length,
    ];
}
`;
}

describe("API over WebAssembly in a browser", () => {
    let browser: Browser;
    let origin: string;
    const server = createServer();

    before(async () => {
        const result = await build({
            stdin: {
                contents: testModule({
                    async: "typescript/async",
                    sync: "typescript/sync",
                    wasm: "typescript/wasm",
                    fs: "typescript/fs",
                }),
                loader: "ts",
                resolveDir: process.cwd(),
            },
            alias: {
                typescript: "@typescript/typescript",
            },
            bundle: true,
            conditions: ["@typescript/source"],
            format: "esm",
            platform: "browser",
            write: false,
        });
        assert.strictEqual(result.outputFiles.length, 1);
        const output = result.outputFiles[0].text;
        assert.doesNotMatch(output, /(?:from|import)\s*\(?["']node:/);
        const bundle = result.outputFiles[0].contents;
        const wasm = await readFile(wasmURL);

        const unbundled = testModule({
            async: "/dist/api/async/api.js",
            sync: "/dist/api/sync/api.js",
            wasm: "/dist/wasm/index.js",
            fs: "/dist/api/fs.js",
        });

        // Serve the package root so the built entries' relative imports resolve as published.
        const root = new URL("../../", import.meta.url);
        server.on("request", async (request, response) => {
            switch (request.url) {
                case "/":
                    response.setHeader("Content-Type", "text/html");
                    response.end('<script type="module">import { run } from "/bundle.js"; globalThis.result = run();</script>');
                    break;
                case "/unbundled":
                    response.setHeader("Content-Type", "text/html");
                    response.end('<script type="module">import { run } from "/unbundled.js"; globalThis.result = run();</script>');
                    break;
                case "/bundle.js":
                    response.setHeader("Content-Type", "text/javascript");
                    response.end(bundle);
                    break;
                case "/unbundled.js":
                    response.setHeader("Content-Type", "text/javascript");
                    response.end(unbundled);
                    break;
                case "/tsc.wasm":
                    response.setHeader("Content-Type", "application/wasm");
                    response.end(wasm);
                    break;
                default: {
                    const file = new URL(`.${request.url}`, root);
                    const contents = file.href.startsWith(root.href) && file.pathname.endsWith(".js")
                        ? await readFile(file).catch(() => undefined)
                        : undefined;
                    if (contents === undefined) {
                        response.statusCode = 404;
                        response.end();
                        break;
                    }
                    response.setHeader("Content-Type", "text/javascript");
                    response.end(contents);
                    break;
                }
            }
        });
        await new Promise<void>((resolve, reject) => {
            server.once("error", reject);
            server.listen(0, "127.0.0.1", resolve);
        });
        const address = server.address();
        assert.ok(address && typeof address !== "string");
        origin = `http://127.0.0.1:${address.port}`;
        browser = await chromium.launch();
    });

    after(async () => {
        await browser?.close();
        await new Promise<void>((resolve, reject) => {
            server.close(error => error ? reject(error) : resolve());
        });
    });

    test("runs the async and sync APIs in Chromium", async () => {
        const page = await browser.newPage();
        await page.goto(origin);
        const result = await page.evaluate(() => Reflect.get(globalThis, "result"));
        assert.deepStrictEqual(result, ["42", "42", 1]);
    });

    test("runs the built async and sync API entries without bundling", async () => {
        const page = await browser.newPage();
        await page.goto(`${origin}/unbundled`);
        const result = await page.evaluate(() => Reflect.get(globalThis, "result"));
        assert.deepStrictEqual(result, ["42", "42", 1]);
    });

    test("loads the transport entry without package resolution", async () => {
        const page = await browser.newPage();
        await page.goto(origin);
        const exports = await page.evaluate(async origin => Object.keys(await import(`${origin}/dist/wasm/index.js`)), origin);
        assert.deepStrictEqual(exports, ["WasmTransport", "instantiateWasm", "instantiateWasmSync"]);
    });
});
