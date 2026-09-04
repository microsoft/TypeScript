import { build } from "esbuild";
import assert from "node:assert";
import {
    describe,
    test,
} from "node:test";

describe("browser API bundle", () => {
    test("uses browser clients without Node dependencies", async () => {
        const result = await build({
            stdin: {
                contents: `
                    import { WasmTransport, wasmURL } from "@typescript/typescript-wasip1-wasm";
                    import { API as AsyncAPI } from "typescript/unstable/async";
                    import { API as SyncAPI } from "typescript/unstable/sync";
                    globalThis.typescriptAPI = { AsyncAPI, SyncAPI, WasmTransport, wasmURL };
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
        const output = result.outputFiles[0].text;
        assert.doesNotMatch(output, /(?:from|import)\s*\(?["']node:/);
        assert.match(output, /The browser async API requires an injected transport/);
        assert.match(output, /The browser sync API requires an injected transport/);
    });
});
