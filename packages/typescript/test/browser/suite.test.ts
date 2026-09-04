import { wasmURL } from "@typescript/typescript-wasip1-wasm";
import {
    build,
    type Plugin,
} from "esbuild";
import assert from "node:assert";
import { globSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import {
    after,
    before,
    describe,
    test,
} from "node:test";
import { fileURLToPath } from "node:url";
import {
    type Browser,
    chromium,
} from "playwright";
import type { BrowserTestResults } from "./harness.ts";

const browserDir = fileURLToPath(new URL(".", import.meta.url));
const packageDir = path.resolve(browserDir, "../..");
const modes = ["async", "sync"] as const;
const expectedTestCounts = {
    async: 335,
    sync: 386,
} as const;
const fileExclusions = [
    {
        mode: "async",
        file: "version.test.ts",
        tests: 2,
        reason: "These tests exercise Node.js executable and package resolution behavior.",
    },
    {
        mode: "async",
        file: "async/astnav.test.ts",
        tests: 4,
        reason: "These tests read compiler fixtures and Go baselines from the repository filesystem.",
    },
    {
        mode: "sync",
        file: "sync/astnav.test.ts",
        tests: 4,
        reason: "These tests read compiler fixtures and Go baselines from the repository filesystem.",
    },
    {
        mode: "sync",
        file: "sync/wasm.test.ts",
        tests: 2,
        reason: "These Node.js integration tests use node:fs and node:wasi; wasm.test.ts covers browser API loading.",
    },
] as const;

describe("API test suite in a browser", () => {
    let browser: Browser;
    let origin: string;
    const bundles = new Map<string, Uint8Array>();
    const server = createServer();

    before(async () => {
        const allTestFiles = globSync(["*.test.ts", "async/**/*.test.ts", "sync/**/*.test.ts"], {
            cwd: path.join(packageDir, "test"),
        });
        for (const mode of modes) {
            const testFiles = allTestFiles.filter(file => {
                const belongsToMode = mode === "async"
                    ? !file.includes("/") || file.startsWith("async/")
                    : file.startsWith("sync/");
                return belongsToMode && !fileExclusions.some(exclusion => exclusion.file === file);
            });
            const result = await build({
                stdin: {
                    contents: `
                        ${testFiles.map(file => `import ${JSON.stringify(path.join(packageDir, "test", file))};`).join("\n")}
                        import { runRegisteredTests } from ${JSON.stringify(path.join(browserDir, "harness.ts"))};
                        import { initializeBrowserAPIInstances } from ${JSON.stringify(path.join(browserDir, "apiWrapper.ts"))};
                        try {
                            const module = await WebAssembly.compileStreaming(fetch("/tsc.wasm"));
                            await initializeBrowserAPIInstances(module, 4);
                            globalThis.browserTestResults = await runRegisteredTests([
                                {
                                    pattern: /Benchmarks$/,
                                    reason: "Benchmarks require Node.js process and filesystem APIs.",
                                },
                                {
                                    pattern: /Parse-clone-emit roundtrip$/,
                                    reason: "The roundtrip fixture discovers source files through Node.js glob and filesystem APIs.",
                                },
                                {
                                    pattern: /parseJsonConfigFileContent accepts non-object JSON$|parseConfigFile$|project exposes parsedCommandLine$/,
                                    reason: "These assertions depend on insertion-ordered callback filesystem directory listings.",
                                },
                            ]);
                        }
                        catch (error) {
                            globalThis.browserTestError = {
                                message: String(error),
                                stack: error instanceof Error ? error.stack : undefined,
                            };
                        }
                    `,
                    loader: "ts",
                    resolveDir: packageDir,
                },
                alias: {
                    typescript: "@typescript/typescript",
                },
                bundle: true,
                conditions: ["@typescript/source", "browser"],
                format: "esm",
                inject: [path.join(browserDir, "processShim.ts")],
                platform: "browser",
                plugins: [browserTestPlugin(mode)],
                write: false,
            });
            assert.strictEqual(result.outputFiles.length, 1);
            bundles.set(mode, result.outputFiles[0].contents);
        }
        const wasm = await readFile(wasmURL);

        server.on("request", (request, response) => {
            if (request.url === "/tsc.wasm") {
                response.setHeader("Content-Type", "application/wasm");
                response.end(wasm);
                return;
            }
            const pageMode = request.url?.slice(1);
            if (pageMode && bundles.has(pageMode)) {
                response.setHeader("Content-Type", "text/html");
                response.end(`<script type="module" src="/${pageMode}.js"></script>`);
                return;
            }
            const mode = request.url?.slice(1, -3);
            const bundle = mode && bundles.get(mode);
            if (bundle) {
                response.setHeader("Content-Type", "text/javascript");
                response.end(bundle);
                return;
            }
            response.statusCode = 404;
            response.end();
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

    for (const mode of modes) {
        test(`runs the existing ${mode} API tests`, async t => {
            const page = await browser.newPage();
            const pageErrors: string[] = [];
            const pageConsole: string[] = [];
            page.on("pageerror", error => pageErrors.push(error.stack ?? error.message));
            page.on("console", message => pageConsole.push(message.text()));
            await page.goto(`${origin}/${mode}`, { waitUntil: "domcontentloaded" });
            try {
                await page.waitForFunction(
                    () => Reflect.has(globalThis, "browserTestResults") || Reflect.has(globalThis, "browserTestError"),
                    undefined,
                    { timeout: 300_000 },
                );
            }
            catch (error) {
                const progress = await page.evaluate(() => Reflect.get(globalThis, "browserTestProgress"));
                throw new Error(`Browser API tests stalled at: ${progress}\n${pageErrors.join("\n\n")}`, { cause: error });
            }
            const error = await page.evaluate(() => Reflect.get(globalThis, "browserTestError"));
            assert.strictEqual(error, undefined, error?.stack ?? error?.message);
            const results = await page.evaluate(() => Reflect.get(globalThis, "browserTestResults")) as BrowserTestResults;
            assert.strictEqual(
                results.failures.length,
                0,
                [
                    ...results.failures.map(failure => `${failure.name}: ${failure.message}\n${failure.stack ?? ""}`),
                    ...pageConsole,
                ].join("\n\n"),
            );
            assert.ok(results.passed > 0);
            const excludedFiles = fileExclusions.filter(exclusion => exclusion.mode === mode);
            const excludedFileTests = excludedFiles.reduce((count, exclusion) => count + exclusion.tests, 0);
            assert.strictEqual(
                results.passed + results.skipped.length + excludedFileTests,
                expectedTestCounts[mode],
                `Browser ${mode} API test accounting changed`,
            );
            t.diagnostic(`${results.passed} passed, ${results.skipped.length + excludedFileTests} skipped`);
            for (const skipped of results.skipped) {
                t.diagnostic(`SKIP ${skipped.name}: ${skipped.reason}`);
            }
            for (const exclusion of excludedFiles) {
                t.diagnostic(`SKIP ${exclusion.file} (${exclusion.tests} tests): ${exclusion.reason}`);
            }
        });
    }
});

function browserTestPlugin(mode: "async" | "sync"): Plugin {
    const harness = path.join(browserDir, "harness.ts");
    const api = path.join(browserDir, `${mode}API.ts`);
    return {
        name: "browser-test",
        setup(build) {
            build.onResolve({ filter: /^node:test$/ }, () => ({ path: harness }));
            build.onResolve({ filter: /^node:assert$/ }, args => {
                return build.resolve("assert", {
                    kind: args.kind,
                    resolveDir: packageDir,
                });
            });
            build.onResolve({ filter: /^node:fs$/ }, () => ({ path: "node-fs", namespace: "browser-shim" }));
            build.onResolve({ filter: /^node:path$/ }, () => ({ path: "node-path", namespace: "browser-shim" }));
            build.onResolve({ filter: /^node:url$/ }, () => ({ path: "node-url", namespace: "browser-shim" }));
            build.onResolve({ filter: /^@typescript\/typescript\/unstable\/async$/ }, () => ({
                path: mode === "async" ? api : path.join(browserDir, "asyncAPI.ts"),
            }));
            build.onResolve({ filter: /^@typescript\/typescript\/unstable\/sync$/ }, () => ({
                path: mode === "sync" ? api : path.join(browserDir, "syncAPI.ts"),
            }));
            build.onResolve({ filter: /^\.\/api\.bench\.ts$/ }, () => ({ path: "api-bench", namespace: "browser-shim" }));
            build.onLoad({ filter: /.*/, namespace: "browser-shim" }, args => {
                switch (args.path) {
                    case "api-bench":
                        return { contents: "export function runBenchmarks() { throw new Error('Benchmarks are not available in a browser'); }" };
                    case "node-fs":
                        return { contents: "export function globSync() { throw new Error('globSync is not available in a browser'); }" };
                    case "node-path":
                        return {
                            contents: `
                                export function resolve(...parts) {
                                    const path = parts.join("/");
                                    const normalized = [];
                                    for (const part of path.split("/")) {
                                        if (!part || part === ".") continue;
                                        if (part === "..") normalized.pop();
                                        else normalized.push(part);
                                    }
                                    return "/" + normalized.join("/");
                                }
                            `,
                        };
                    case "node-url":
                        return { contents: "export function fileURLToPath(url) { return new URL(url).pathname; }" };
                }
                return undefined;
            });
        },
    };
}
