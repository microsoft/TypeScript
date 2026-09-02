import { wasmURL } from "@typescript/api-wasm";
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

describe("API over WebAssembly in a browser", () => {
    let browser: Browser;
    let origin: string;
    const server = createServer();

    before(async () => {
        const result = await build({
            stdin: {
                contents: `
                    import { instantiateWasm, WasmTransport } from "@typescript/api-wasm";
                    import { API as AsyncAPI } from "typescript/unstable/async";
                    import { API as SyncAPI } from "typescript/unstable/sync";

                    async function check(API, module) {
                        const instance = await instantiateWasm(module);
                        const transport = new WasmTransport({ instance, cwd: "/" });
                        const api = new API({ transport });
                        transport.setFile("/tsconfig.json", "{}");
                        transport.setFile("/src/index.ts", "export const value = 42 as const;");
                        try {
                            const snapshot = await api.updateSnapshot({
                                openFiles: ["/src/index.ts"],
                                fileChanges: {
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
                        const module = await WebAssembly.compileStreaming(fetch("/typescript-api.wasm"));
                        return [
                            await check(AsyncAPI, module),
                            await check(SyncAPI, module),
                        ];
                    }
                `,
                loader: "ts",
                resolveDir: process.cwd(),
            },
            alias: {
                typescript: "@typescript/typescript",
            },
            bundle: true,
            conditions: ["@typescript/source", "browser"],
            format: "esm",
            platform: "browser",
            write: false,
        });
        assert.strictEqual(result.outputFiles.length, 1);
        const bundle = result.outputFiles[0].contents;
        const wasm = await readFile(wasmURL);

        server.on("request", (request, response) => {
            switch (request.url) {
                case "/":
                    response.setHeader("Content-Type", "text/html");
                    response.end('<script type="module">import { run } from "/bundle.js"; globalThis.result = run();</script>');
                    break;
                case "/bundle.js":
                    response.setHeader("Content-Type", "text/javascript");
                    response.end(bundle);
                    break;
                case "/typescript-api.wasm":
                    response.setHeader("Content-Type", "application/wasm");
                    response.end(wasm);
                    break;
                default:
                    response.statusCode = 404;
                    response.end();
                    break;
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
        assert.deepStrictEqual(result, ["42", "42"]);
    });
});
