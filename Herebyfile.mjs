// @ts-check
import { CancelToken } from "@esfx/canceltoken";
import assert from "assert";
import chalk from "chalk";
import chokidar from "chokidar";
import esbuild from "esbuild";
import { EventEmitter } from "events";
import fs from "fs";
import { glob } from "glob";
import { task } from "hereby";
import path from "path";

import { localizationDirectories } from "./scripts/build/localization.mjs";
import cmdLineOptions from "./scripts/build/options.mjs";
import {
    buildProject,
    cleanProject,
    watchProject,
} from "./scripts/build/projects.mjs";
import {
    localBaseline,
    refBaseline,
    runConsoleTests,
} from "./scripts/build/tests.mjs";
import {
    Debouncer,
    Deferred,
    exec,
    getDiffTool,
    memoize,
    needsUpdate,
    readJson,
    rimraf,
} from "./scripts/build/utils.mjs";

/** @typedef {ReturnType<typeof task>} Task */
void 0;

const copyrightFilename = "./scripts/CopyrightNotice.txt";
const getCopyrightHeader = memoize(async () => {
    const contents = await fs.promises.readFile(copyrightFilename, "utf-8");
    return contents.replace(/\r\n/g, "\n");
});

export const buildScripts = task({
    name: "scripts",
    description: "Builds files in the 'scripts' folder.",
    run: () => buildProject("scripts"),
});

const libs = memoize(() => {
    /** @type {{ libs: string[]; paths: Record<string, string | undefined>; }} */
    const libraries = readJson("./src/lib/libs.json");
    const libs = libraries.libs.map(lib => {
        const relativeSources = ["header.d.ts", lib + ".d.ts"];
        const relativeTarget = libraries.paths && libraries.paths[lib] || ("lib." + lib + ".d.ts");
        const sources = relativeSources.map(s => path.posix.join("src/lib", s));
        const target = `built/local/${relativeTarget}`;
        return { target, sources };
    });
    return libs;
});

export const generateLibs = task({
    name: "lib",
    description: "Builds the library targets",
    run: async () => {
        await fs.promises.mkdir("./built/local", { recursive: true });
        for (const lib of libs()) {
            let output = await getCopyrightHeader();

            for (const source of lib.sources) {
                const contents = await fs.promises.readFile(source, "utf-8");
                output += "\n" + contents.replace(/\r\n/g, "\n");
            }

            await fs.promises.writeFile(lib.target, output);
        }
    },
});

const diagnosticInformationMapTs = "src/compiler/diagnosticInformationMap.generated.ts";
const diagnosticMessagesJson = "src/compiler/diagnosticMessages.json";
const diagnosticMessagesGeneratedJson = "src/compiler/diagnosticMessages.generated.json";

export const generateDiagnostics = task({
    name: "generate-diagnostics",
    description: "Generates a diagnostic file in TypeScript based on an input JSON file",
    run: async () => {
        await exec(process.execPath, ["scripts/processDiagnosticMessages.mjs", diagnosticMessagesJson]);
    },
});

const cleanDiagnostics = task({
    name: "clean-diagnostics",
    description: "Generates a diagnostic file in TypeScript based on an input JSON file",
    hiddenFromTaskList: true,
    run: async () => {
        await rimraf(diagnosticInformationMapTs);
        await rimraf(diagnosticMessagesGeneratedJson);
    },
});

// Localize diagnostics
/**
 * .lcg file is what localization team uses to know what messages to localize.
 * The file is always generated in 'enu/diagnosticMessages.generated.json.lcg'
 */
const generatedLCGFile = "built/local/enu/diagnosticMessages.generated.json.lcg";

/**
 * The localization target produces the two following transformations:
 *    1. 'src\loc\lcl\<locale>\diagnosticMessages.generated.json.lcl' => 'built\local\<locale>\diagnosticMessages.generated.json'
 *       convert localized resources into a .json file the compiler can understand
 *    2. 'src\compiler\diagnosticMessages.generated.json' => 'built\local\ENU\diagnosticMessages.generated.json.lcg'
 *       generate the lcg file (source of messages to localize) from the diagnosticMessages.generated.json
 */
const localizationTargets = localizationDirectories
    .map(f => `built/local/${f}/diagnosticMessages.generated.json`)
    .concat(generatedLCGFile);

const localize = task({
    name: "localize",
    dependencies: [generateDiagnostics],
    run: async () => {
        if (needsUpdate(diagnosticMessagesGeneratedJson, generatedLCGFile)) {
            await exec(process.execPath, ["scripts/generateLocalizedDiagnosticMessages.mjs", "src/loc/lcl", "built/local", diagnosticMessagesGeneratedJson], { ignoreExitCode: true });
        }
    },
});

export const buildSrc = task({
    name: "build-src",
    description: "Builds the src project (all code)",
    dependencies: [generateDiagnostics],
    run: () => buildProject("src"),
});

export const watchSrc = task({
    name: "watch-src",
    description: "Watches the src project (all code)",
    hiddenFromTaskList: true,
    dependencies: [generateDiagnostics],
    run: () => watchProject("src"),
});

export const cleanSrc = task({
    name: "clean-src",
    hiddenFromTaskList: true,
    run: () => cleanProject("src"),
});

const dtsBundlerPath = "./scripts/dtsBundler.mjs";

/**
 * @param {string} entrypoint
 * @param {string} output
 */
async function runDtsBundler(entrypoint, output) {
    await exec(process.execPath, [
        dtsBundlerPath,
        "--entrypoint",
        entrypoint,
        "--output",
        output,
    ]);
}

/**
 * @param {string} entrypoint
 * @param {string} outfile
 * @param {BundlerTaskOptions} [taskOptions]
 *
 * @typedef BundlerTaskOptions
 * @property {boolean} [exportIsTsObject]
 * @property {boolean} [treeShaking]
 * @property {boolean} [usePublicAPI]
 * @property {() => void} [onWatchRebuild]
 */
function createBundler(entrypoint, outfile, taskOptions = {}) {
    const getOptions = memoize(async () => {
        const copyright = await getCopyrightHeader();
        const banner = taskOptions.exportIsTsObject ? "var ts = {}; ((module) => {" : "";

        /** @type {esbuild.BuildOptions} */
        const options = {
            entryPoints: [entrypoint],
            banner: { js: copyright + banner },
            bundle: true,
            outfile,
            platform: "node",
            target: ["es2020", "node14.17"],
            format: "cjs",
            sourcemap: "linked",
            sourcesContent: false,
            treeShaking: taskOptions.treeShaking,
            packages: "external",
            logLevel: "warning",
            // legalComments: "none", // If we add copyright headers to the source files, uncomment.
        };

        if (taskOptions.usePublicAPI) {
            options.external = ["./typescript.js"];
            options.plugins = options.plugins || [];
            options.plugins.push({
                name: "remap-typescript-to-require",
                setup(build) {
                    build.onLoad({ filter: /src[\\/]typescript[\\/]typescript\.ts$/ }, () => {
                        return { contents: `export * from "./typescript.js"` };
                    });
                },
            });
        }

        if (taskOptions.exportIsTsObject) {
            // Monaco bundles us as ESM by wrapping our code with something that defines module.exports
            // but then does not use it, instead using the `ts` variable. Ensure that if we think we're CJS
            // that we still set `ts` to the module.exports object.
            options.footer = { js: `})({ get exports() { return ts; }, set exports(v) { ts = v; if (typeof module !== "undefined" && module.exports) { module.exports = v; } } })` };

            // esbuild converts calls to "require" to "__require"; this function
            // calls the real require if it exists, or throws if it does not (rather than
            // throwing an error like "require not defined"). But, since we want typescript
            // to be consumable by other bundlers, we need to convert these calls back to
            // require so our imports are visible again.
            //
            // To fix this, we redefine "require" to a name we're unlikely to use with the
            // same length as "require", then replace it back to "require" after bundling,
            // ensuring that source maps still work.
            //
            // See: https://github.com/evanw/esbuild/issues/1905
            const require = "require";
            const fakeName = "Q".repeat(require.length);
            const fakeNameRegExp = new RegExp(fakeName, "g");
            options.define = { [require]: fakeName };

            // For historical reasons, TypeScript does not set __esModule. Hack esbuild's __toCommonJS to be a noop.
            // We reference `__copyProps` to ensure the final bundle doesn't have any unreferenced code.
            const toCommonJsRegExp = /var __toCommonJS .*/;
            const toCommonJsRegExpReplacement = "var __toCommonJS = (mod) => (__copyProps, mod); // Modified helper to skip setting __esModule.";

            options.plugins = options.plugins || [];
            options.plugins.push(
                {
                    name: "post-process",
                    setup: build => {
                        build.onEnd(async () => {
                            let contents = await fs.promises.readFile(outfile, "utf-8");
                            contents = contents.replace(fakeNameRegExp, require);
                            let matches = 0;
                            contents = contents.replace(toCommonJsRegExp, () => {
                                matches++;
                                return toCommonJsRegExpReplacement;
                            });
                            assert(matches === 1, "Expected exactly one match for __toCommonJS");
                            await fs.promises.writeFile(outfile, contents);
                        });
                    },
                },
            );
        }

        return options;
    });

    return {
        build: async () => esbuild.build(await getOptions()),
        watch: async () => {
            /** @type {esbuild.BuildOptions} */
            const options = { ...await getOptions(), logLevel: "info" };
            if (taskOptions.onWatchRebuild) {
                const onRebuild = taskOptions.onWatchRebuild;
                options.plugins = (options.plugins?.slice(0) ?? []).concat([{
                    name: "watch",
                    setup: build => {
                        let firstBuild = true;
                        build.onEnd(() => {
                            if (firstBuild) {
                                firstBuild = false;
                            }
                            else {
                                onRebuild();
                            }
                        });
                    },
                }]);
            }

            const ctx = await esbuild.context(options);
            ctx.watch();
        },
    };
}

let printedWatchWarning = false;

/**
 * @param {object} options
 * @param {string} options.name
 * @param {string} [options.description]
 * @param {Task[]} [options.buildDeps]
 * @param {string} options.project
 * @param {string} options.srcEntrypoint
 * @param {string} options.builtEntrypoint
 * @param {string} options.output
 * @param {boolean} [options.enableCompileCache]
 * @param {Task[]} [options.mainDeps]
 * @param {BundlerTaskOptions} [options.bundlerOptions]
 */
function entrypointBuildTask(options) {
    const build = task({
        name: `build-${options.name}`,
        dependencies: options.buildDeps,
        run: () => buildProject(options.project),
    });

    const mainDeps = options.mainDeps?.slice(0) ?? [];

    let output = options.output;
    if (options.enableCompileCache) {
        const originalOutput = output;
        output = path.join(path.dirname(output), "_" + path.basename(output));

        const compileCacheShim = task({
            name: `shim-compile-cache-${options.name}`,
            run: async () => {
                const outDir = path.dirname(originalOutput);
                await fs.promises.mkdir(outDir, { recursive: true });
                const moduleSpecifier = path.relative(outDir, output);
                const lines = [
                    `// This file is a shim which defers loading the real module until the compile cache is enabled.`,
                    `try {`,
                    `  const { enableCompileCache } = require("node:module");`,
                    `  if (enableCompileCache) {`,
                    `    enableCompileCache();`,
                    `  }`,
                    `} catch {}`,
                    `module.exports = require("./${moduleSpecifier.replace(/[\\/]/g, "/")}");`,
                ];
                await fs.promises.writeFile(originalOutput, lines.join("\n") + "\n");
            },
        });

        mainDeps.push(compileCacheShim);
    }

    const bundler = createBundler(options.srcEntrypoint, output, options.bundlerOptions);

    // If we ever need to bundle our own output, change this to depend on build
    // and run esbuild on builtEntrypoint.
    const bundle = task({
        name: `bundle-${options.name}`,
        dependencies: options.buildDeps,
        run: () => bundler.build(),
    });

    /**
     * Writes a CJS module that reexports another CJS file. E.g. given
     * `options.builtEntrypoint = "./built/local/tsc/tsc.js"` and
     * `options.output = "./built/local/tsc.js"`, this will create a file
     * named "./built/local/tsc.js" containing:
     *
     * ```
     * module.exports = require("./tsc/tsc.js")
     * ```
     */
    const shim = task({
        name: `shim-${options.name}`,
        run: async () => {
            const outDir = path.dirname(output);
            await fs.promises.mkdir(outDir, { recursive: true });
            const moduleSpecifier = path.relative(outDir, options.builtEntrypoint);
            await fs.promises.writeFile(output, `module.exports = require("./${moduleSpecifier.replace(/[\\/]/g, "/")}")`);
        },
    });

    if (cmdLineOptions.bundle) {
        mainDeps.push(bundle);
        if (cmdLineOptions.typecheck) {
            mainDeps.push(build);
        }
    }
    else {
        mainDeps.push(build, shim);
    }

    const main = task({
        name: options.name,
        description: options.description,
        dependencies: mainDeps,
    });

    const watch = task({
        name: `watch-${options.name}`,
        hiddenFromTaskList: true, // This is best effort.
        dependencies: (options.buildDeps ?? []).concat(options.mainDeps ?? []).concat(cmdLineOptions.bundle ? [] : [shim]),
        run: () => {
            // These watch functions return promises that resolve once watch mode has started,
            // allowing them to operate as regular tasks, while creating unresolved promises
            // in the background that keep the process running after all tasks have exited.
            if (!printedWatchWarning) {
                console.error(chalk.yellowBright("Warning: watch mode is incomplete and may not work as expected. Use at your own risk."));
                printedWatchWarning = true;
            }

            if (!cmdLineOptions.bundle) {
                return watchProject(options.project);
            }
            return bundler.watch();
        },
    });

    return { build, bundle, shim, main, watch };
}

const { main: tsc, watch: watchTsc } = entrypointBuildTask({
    name: "tsc",
    description: "Builds the command-line compiler",
    buildDeps: [generateDiagnostics],
    project: "src/tsc",
    srcEntrypoint: "./src/tsc/tsc.ts",
    builtEntrypoint: "./built/local/tsc/tsc.js",
    output: "./built/local/tsc.js",
    mainDeps: [generateLibs],
    enableCompileCache: true,
});
export { tsc, watchTsc };

const { main: services, build: buildServices, watch: watchServices } = entrypointBuildTask({
    name: "services",
    description: "Builds the typescript.js library",
    buildDeps: [generateDiagnostics],
    project: "src/typescript",
    srcEntrypoint: "./src/typescript/typescript.ts",
    builtEntrypoint: "./built/local/typescript/typescript.js",
    output: "./built/local/typescript.js",
    mainDeps: [generateLibs],
    bundlerOptions: { exportIsTsObject: true },
});
export { services, watchServices };

export const dtsServices = task({
    name: "dts-services",
    description: "Bundles typescript.d.ts",
    dependencies: [buildServices],
    run: async () => {
        if (needsUpdate(["./built/local/typescript/tsconfig.tsbuildinfo", dtsBundlerPath], ["./built/local/typescript.d.ts", "./built/local/typescript.internal.d.ts"])) {
            await runDtsBundler("./built/local/typescript/typescript.d.ts", "./built/local/typescript.d.ts");
        }
    },
});

const { main: tsserver, watch: watchTsserver } = entrypointBuildTask({
    name: "tsserver",
    description: "Builds the language server",
    buildDeps: [generateDiagnostics],
    project: "src/tsserver",
    srcEntrypoint: "./src/tsserver/server.ts",
    builtEntrypoint: "./built/local/tsserver/server.js",
    output: "./built/local/tsserver.js",
    mainDeps: [generateLibs, services],
    bundlerOptions: { usePublicAPI: true },
    enableCompileCache: true,
});
export { tsserver, watchTsserver };

export const min = task({
    name: "min",
    description: "Builds only tsc and tsserver",
    dependencies: [tsc, tsserver],
});

export const watchMin = task({
    name: "watch-min",
    description: "Watches only tsc and tsserver",
    hiddenFromTaskList: true,
    dependencies: [watchTsc, watchTsserver],
});

// This is technically not enough to make tsserverlibrary loadable in the
// browser, but it's unlikely that anyone has actually been doing that.
const lsslJs = `
if (typeof module !== "undefined" && module.exports) {
    module.exports = require("./typescript.js");
}
else {
    throw new Error("tsserverlibrary requires CommonJS; use typescript.js instead");
}
`;

const lsslDts = `
import ts = require("./typescript.js");
export = ts;
`;

const lsslDtsInternal = `
import ts = require("./typescript.internal.js");
export = ts;
`;

/**
 * @param {string} contents
 */
async function fileContentsWithCopyright(contents) {
    return await getCopyrightHeader() + contents.trim().replace(/\r\n/g, "\n") + "\n";
}

const lssl = task({
    name: "lssl",
    description: "Builds language service server library",
    dependencies: [services],
    run: async () => {
        await fs.promises.writeFile("./built/local/tsserverlibrary.js", await fileContentsWithCopyright(lsslJs));
    },
});

export const dtsLssl = task({
    name: "dts-lssl",
    description: "Bundles tsserverlibrary.d.ts",
    dependencies: [dtsServices],
    run: async () => {
        await fs.promises.writeFile("./built/local/tsserverlibrary.d.ts", await fileContentsWithCopyright(lsslDts));
        await fs.promises.writeFile("./built/local/tsserverlibrary.internal.d.ts", await fileContentsWithCopyright(lsslDtsInternal));
    },
});

export const dts = task({
    name: "dts",
    dependencies: [dtsServices, dtsLssl],
});

const testRunner = "./built/local/run.js";
const watchTestsEmitter = new EventEmitter();
const { main: tests, watch: watchTests } = entrypointBuildTask({
    name: "tests",
    description: "Builds the test infrastructure",
    buildDeps: [generateDiagnostics],
    project: "src/testRunner",
    srcEntrypoint: "./src/testRunner/_namespaces/Harness.ts",
    builtEntrypoint: "./built/local/testRunner/runner.js",
    output: testRunner,
    mainDeps: [generateLibs],
    bundlerOptions: {
        // Ensure we never drop any dead code, which might be helpful while debugging.
        treeShaking: false,
        onWatchRebuild() {
            watchTestsEmitter.emit("rebuild");
        },
    },
});
export { tests, watchTests };

export const runEslintRulesTests = task({
    name: "run-eslint-rules-tests",
    description: "Runs the eslint rule tests",
    run: () => runConsoleTests("scripts/eslint/tests", "mocha-fivemat-progress-reporter", /*runInParallel*/ false),
});

export const lint = task({
    name: "lint",
    description: "Runs eslint on the compiler and scripts sources.",
    run: async () => {
        const folder = ".";
        const formatter = cmdLineOptions.ci ? "stylish" : "autolinkable-stylish";
        const args = [
            "node_modules/eslint/bin/eslint",
            "--cache",
            "--cache-location",
            `${folder}/.eslintcache`,
            "--format",
            formatter,
            "--report-unused-disable-directives",
            "--max-warnings",
            "0",
        ];

        if (cmdLineOptions.fix) {
            args.push("--fix");
        }

        args.push(folder);

        console.log(`Linting: ${args.join(" ")}`);
        return exec(process.execPath, args);
    },
});

export const format = task({
    name: "format",
    description: "Formats the codebase.",
    run: () => exec(process.execPath, ["node_modules/dprint/bin.js", "fmt"]),
});

export const checkFormat = task({
    name: "check-format",
    description: "Checks that the codebase is formatted.",
    run: () => exec(process.execPath, ["node_modules/dprint/bin.js", "check"], { ignoreStdout: true }),
});

export const knip = task({
    name: "knip",
    description: "Runs knip.",
    dependencies: [generateDiagnostics],
    run: () => exec(process.execPath, ["node_modules/knip/bin/knip.js", "--tags=+internal,-knipignore", "--exclude=duplicates,enumMembers", ...(cmdLineOptions.fix ? ["--fix"] : [])]),
});

const { main: typingsInstaller, watch: watchTypingsInstaller } = entrypointBuildTask({
    name: "typings-installer",
    buildDeps: [generateDiagnostics],
    project: "src/typingsInstaller",
    srcEntrypoint: "./src/typingsInstaller/nodeTypingsInstaller.ts",
    builtEntrypoint: "./built/local/typingsInstaller/nodeTypingsInstaller.js",
    output: "./built/local/typingsInstaller.js",
    mainDeps: [services],
    bundlerOptions: { usePublicAPI: true },
    enableCompileCache: true,
});

const { main: watchGuard, watch: watchWatchGuard } = entrypointBuildTask({
    name: "watch-guard",
    project: "src/watchGuard",
    srcEntrypoint: "./src/watchGuard/watchGuard.ts",
    builtEntrypoint: "./built/local/watchGuard/watchGuard.js",
    output: "./built/local/watchGuard.js",
});

export const generateTypesMap = task({
    name: "generate-types-map",
    run: async () => {
        await fs.promises.mkdir("./built/local", { recursive: true });
        const source = "src/server/typesMap.json";
        const target = "built/local/typesMap.json";
        const contents = await fs.promises.readFile(source, "utf-8");
        JSON.parse(contents); // Validates that the JSON parses.
        await fs.promises.writeFile(target, contents.replace(/\r\n/g, "\n"));
    },
});

// Drop a copy of diagnosticMessages.generated.json into the built/local folder. This allows
// it to be synced to the Azure DevOps repo, so that it can get picked up by the build
// pipeline that generates the localization artifacts that are then fed into the translation process.
const builtLocalDiagnosticMessagesGeneratedJson = "built/local/diagnosticMessages.generated.json";
const copyBuiltLocalDiagnosticMessages = task({
    name: "copy-built-local-diagnostic-messages",
    dependencies: [generateDiagnostics],
    run: async () => {
        const contents = await fs.promises.readFile(diagnosticMessagesGeneratedJson, "utf-8");
        JSON.parse(contents); // Validates that the JSON parses.
        await fs.promises.writeFile(builtLocalDiagnosticMessagesGeneratedJson, contents);
    },
});

export const otherOutputs = task({
    name: "other-outputs",
    description: "Builds miscelaneous scripts and documents distributed with the LKG",
    dependencies: [typingsInstaller, watchGuard, generateTypesMap, copyBuiltLocalDiagnosticMessages],
});

export const watchOtherOutputs = task({
    name: "watch-other-outputs",
    description: "Builds miscelaneous scripts and documents distributed with the LKG",
    hiddenFromTaskList: true,
    dependencies: [watchTypingsInstaller, watchWatchGuard, generateTypesMap, copyBuiltLocalDiagnosticMessages],
});

export const local = task({
    name: "local",
    description: "Builds the full compiler and services",
    dependencies: [localize, tsc, tsserver, services, lssl, otherOutputs, dts],
});
export default local;

export const watchLocal = task({
    name: "watch-local",
    description: "Watches the full compiler and services",
    hiddenFromTaskList: true,
    dependencies: [localize, watchTsc, watchTsserver, watchServices, lssl, watchOtherOutputs, dts, watchSrc],
});

const runtestsDeps = [tests, generateLibs].concat(cmdLineOptions.typecheck ? [dts] : []);

export const runTests = task({
    name: "runtests",
    description: "Runs the tests using the built run.js file.",
    dependencies: runtestsDeps,
    run: () => runConsoleTests(testRunner, "mocha-fivemat-progress-reporter", /*runInParallel*/ false),
});
// task("runtests").flags = {
//     "-t --tests=<regex>": "Pattern for tests to run.",
//     "   --failed": "Runs tests listed in '.failed-tests'.",
//     "   --coverage": "Generate test coverage using c8",
//     "-r --reporter=<reporter>": "The mocha reporter to use.",
//     "-i --break": "Runs tests in inspector mode (NodeJS 8 and later)",
//     "   --keepFailed": "Keep tests in .failed-tests even if they pass",
//     "   --light": "Run tests in light mode (fewer verifications, but tests run faster)",
//     "   --dirty": "Run tests without first cleaning test output directories",
//     "   --stackTraceLimit=<limit>": "Sets the maximum number of stack frames to display. Use 'full' to show all frames.",
//     "   --no-color": "Disables color",
//     "   --timeout=<ms>": "Overrides the default test timeout.",
//     "   --built": "Compile using the built version of the compiler.",
//     "   --shards": "Total number of shards running tests (default: 1)",
//     "   --shardId": "1-based ID of this shard (default: 1)",
// };

export const runTestsAndWatch = task({
    name: "runtests-watch",
    dependencies: [watchTests],
    run: async () => {
        if (!cmdLineOptions.tests && !cmdLineOptions.failed) {
            console.log(chalk.redBright(`You must specifiy either --tests/-t or --failed to use 'runtests-watch'.`));
            return;
        }

        let watching = true;
        let running = true;
        let lastTestChangeTimeMs = Date.now();
        let testsChangedDeferred = /** @type {Deferred<void>} */ (new Deferred());
        let testsChangedCancelSource = CancelToken.source();

        const testsChangedDebouncer = new Debouncer(1_000, endRunTests);
        const testCaseWatcher = chokidar.watch([
            "tests/cases/**/*.*",
            "tests/lib/**/*.*",
            "tests/projects/**/*.*",
        ], {
            ignorePermissionErrors: true,
            alwaysStat: true,
        });

        process.on("SIGINT", endWatchMode);
        process.on("beforeExit", endWatchMode);
        watchTestsEmitter.on("rebuild", onRebuild);
        testCaseWatcher.on("all", onChange);

        while (watching) {
            const promise = testsChangedDeferred.promise;
            const token = testsChangedCancelSource.token;
            if (!token.signaled) {
                running = true;
                try {
                    await runConsoleTests(testRunner, "mocha-fivemat-progress-reporter", /*runInParallel*/ false, { token, watching: true });
                }
                catch {
                    // ignore
                }
                running = false;
            }
            if (watching) {
                console.log(chalk.yellowBright(`[watch] test run complete, waiting for changes...`));
                await promise;
            }
        }

        function onRebuild() {
            beginRunTests(testRunner);
        }

        /**
         * @param {'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir'} eventName
         * @param {string} path
         * @param {fs.Stats | undefined} stats
         */
        function onChange(eventName, path, stats) {
            switch (eventName) {
                case "change":
                case "unlink":
                case "unlinkDir":
                    break;
                case "add":
                case "addDir":
                    // skip files that are detected as 'add' but haven't actually changed since the last time tests were
                    // run.
                    if (stats && stats.mtimeMs <= lastTestChangeTimeMs) {
                        return;
                    }
                    break;
            }
            beginRunTests(path);
        }

        /**
         * @param {string} path
         */
        function beginRunTests(path) {
            if (testsChangedDebouncer.empty) {
                console.log(chalk.yellowBright(`[watch] tests changed due to '${path}', restarting...`));
                if (running) {
                    console.log(chalk.yellowBright("[watch] aborting in-progress test run..."));
                }
                testsChangedCancelSource.cancel();
                testsChangedCancelSource = CancelToken.source();
            }

            testsChangedDebouncer.enqueue();
        }

        function endRunTests() {
            lastTestChangeTimeMs = Date.now();
            testsChangedDeferred.resolve();
            testsChangedDeferred = /** @type {Deferred<void>} */ (new Deferred());
        }

        function endWatchMode() {
            if (watching) {
                watching = false;
                console.log(chalk.yellowBright("[watch] exiting watch mode..."));
                testsChangedCancelSource.cancel();
                testCaseWatcher.close();
                watchTestsEmitter.off("rebuild", onRebuild);
            }
        }
    },
});

const doRunTestsParallel = task({
    name: "do-runtests-parallel",
    description: "Runs all the tests in parallel using the built run.js file.",
    dependencies: runtestsDeps,
    run: () => runConsoleTests(testRunner, "min", /*runInParallel*/ cmdLineOptions.workers > 1),
});

export const runTestsParallel = task({
    name: "runtests-parallel",
    description: "Runs all the tests in parallel using the built run.js file, linting in parallel if --lint=true.",
    dependencies: [doRunTestsParallel].concat(cmdLineOptions.lint ? [lint] : []),
});

// task("runtests-parallel").flags = {
//     "   --coverage": "Generate test coverage using c8",
//     "   --light": "Run tests in light mode (fewer verifications, but tests run faster).",
//     "   --keepFailed": "Keep tests in .failed-tests even if they pass.",
//     "   --dirty": "Run tests without first cleaning test output directories.",
//     "   --stackTraceLimit=<limit>": "Sets the maximum number of stack frames to display. Use 'full' to show all frames.",
//     "   --workers=<number>": "The number of parallel workers to use.",
//     "   --timeout=<ms>": "Overrides the default test timeout.",
//     "   --built": "Compile using the built version of the compiler.",
//     "   --shards": "Total number of shards running tests (default: 1)",
//     "   --shardId": "1-based ID of this shard (default: 1)",
// };

export const testBrowserIntegration = task({
    name: "test-browser-integration",
    description: "Runs scripts/browserIntegrationTest.mjs which tests that typescript.js loads in a browser",
    dependencies: [services],
    run: () => exec(process.execPath, ["scripts/browserIntegrationTest.mjs"]),
});

export const diff = task({
    name: "diff",
    description: "Diffs the compiler baselines using the diff tool specified by the 'DIFF' environment variable",
    run: () => exec(getDiffTool(), [refBaseline, localBaseline], { ignoreExitCode: true, waitForExit: false }),
});

/**
 * @param {string} localBaseline Path to the local copy of the baselines
 * @param {string} refBaseline Path to the reference copy of the baselines
 */
function baselineAcceptTask(localBaseline, refBaseline) {
    /**
     * @param {string} p
     */
    function localPathToRefPath(p) {
        const relative = path.relative(localBaseline, p);
        return path.join(refBaseline, relative);
    }

    return async () => {
        const toCopy = await glob(`${localBaseline}/**`, { nodir: true, ignore: `${localBaseline}/**/*.delete` });
        for (const p of toCopy) {
            const out = localPathToRefPath(p);
            await fs.promises.mkdir(path.dirname(out), { recursive: true });
            await fs.promises.copyFile(p, out);
        }
        const toDelete = await glob(`${localBaseline}/**/*.delete`, { nodir: true });
        for (const p of toDelete) {
            const out = localPathToRefPath(p).replace(/\.delete$/, "");
            await rimraf(out);
        }
    };
}

export const baselineAccept = task({
    name: "baseline-accept",
    description: "Makes the most recent test results the new baseline, overwriting the old baseline",
    run: baselineAcceptTask(localBaseline, refBaseline),
});

// TODO(rbuckton): Determine if we still need this task. Depending on a relative
//                 path here seems like a bad idea.
export const updateSublime = task({
    name: "update-sublime",
    description: "Updates the sublime plugin's tsserver",
    dependencies: [tsserver],
    run: async () => {
        for (const file of ["built/local/tsserver.js", "built/local/tsserver.js.map"]) {
            await fs.promises.copyFile(file, path.resolve("../TypeScript-Sublime-Plugin/tsserver/", path.basename(file)));
        }
    },
});

export const produceLKG = task({
    name: "LKG",
    description: "Makes a new LKG out of the built js files",
    dependencies: [local],
    run: async () => {
        if (!cmdLineOptions.bundle) {
            throw new Error("LKG cannot be created when --bundle=false");
        }

        const expectedFiles = [
            "built/local/tsc.js",
            "built/local/_tsc.js",
            "built/local/tsserver.js",
            "built/local/_tsserver.js",
            "built/local/tsserverlibrary.js",
            "built/local/tsserverlibrary.d.ts",
            "built/local/typescript.js",
            "built/local/typescript.d.ts",
            "built/local/typingsInstaller.js",
            "built/local/_typingsInstaller.js",
            "built/local/watchGuard.js",
        ].concat(libs().map(lib => lib.target));
        const missingFiles = expectedFiles
            .concat(localizationTargets)
            .filter(f => !fs.existsSync(f));
        if (missingFiles.length > 0) {
            throw new Error("Cannot replace the LKG unless all built targets are present in directory 'built/local/'. The following files are missing:\n" + missingFiles.join("\n"));
        }

        await exec(process.execPath, ["scripts/produceLKG.mjs"]);
    },
});

export const lkg = task({
    name: "lkg",
    hiddenFromTaskList: true,
    dependencies: [produceLKG],
});

export const cleanBuilt = task({
    name: "clean-built",
    hiddenFromTaskList: true,
    run: () => fs.promises.rm("built", { recursive: true, force: true }),
});

export const clean = task({
    name: "clean",
    description: "Cleans build outputs",
    dependencies: [cleanBuilt, cleanDiagnostics],
});

export const configureNightly = task({
    name: "configure-nightly",
    description: "Runs scripts/configurePrerelease.mjs to prepare a build for nightly publishing",
    run: () => exec(process.execPath, ["scripts/configurePrerelease.mjs", "dev", "package.json", "src/compiler/corePublic.ts"]),
});

export const configureInsiders = task({
    name: "configure-insiders",
    description: "Runs scripts/configurePrerelease.mjs to prepare a build for insiders publishing",
    run: () => exec(process.execPath, ["scripts/configurePrerelease.mjs", "insiders", "package.json", "src/compiler/corePublic.ts"]),
});

export const configureExperimental = task({
    name: "configure-experimental",
    description: "Runs scripts/configurePrerelease.mjs to prepare a build for experimental publishing",
    run: () => exec(process.execPath, ["scripts/configurePrerelease.mjs", "experimental", "package.json", "src/compiler/corePublic.ts"]),
});

export const help = task({
    name: "help",
    description: "Prints the top-level tasks.",
    hiddenFromTaskList: true,
    run: () => exec("hereby", ["--tasks"], { hidePrompt: true }),
});
