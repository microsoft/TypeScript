// @ts-check
import path from "path";
import fs from "fs";
import del from "del";
import esbuild from "esbuild";
import { task } from "hereby";
import _glob from "glob";
import util from "util";
import { exec, readJson, needsUpdate, getDiffTool, getDirSize } from "./scripts/build/utils.mjs";
import { runConsoleTests, refBaseline, localBaseline, refRwcBaseline, localRwcBaseline } from "./scripts/build/tests.mjs";
import { buildProject as realBuildProject, cleanProject } from "./scripts/build/projects.mjs";
import { localizationDirectories } from "./scripts/build/localization.mjs";
import cmdLineOptions from "./scripts/build/options.mjs";

const glob = util.promisify(_glob);

const copyright = "CopyrightNotice.txt";

/** @type {string | undefined} */
let copyrightHeader;
function getCopyrightHeader() {
    if (copyrightHeader === undefined) {
        copyrightHeader = fs.readFileSync(copyright, "utf-8");
        copyrightHeader.replace(/\r\n/g, "\n");
    }
    return copyrightHeader;
}


/** @type {ReturnType<typeof task>[]} */
const cleanTasks = [];


// TODO(jakebailey): This is really gross. Waiting on https://github.com/microsoft/TypeScript/issues/25613,
// or at least control over noEmit / emitDeclarationOnly in build mode.
let currentlyBuilding = 0;
let oldTsconfigBase;

/** @type {typeof realBuildProject} */
const buildProjectWithEmit = async (...args) => {
    const tsconfigBasePath = "./src/tsconfig-base.json";

    // Not using fs.promises here, to ensure we are synchronous until running the real build.

    if (currentlyBuilding === 0) {
        oldTsconfigBase = fs.readFileSync(tsconfigBasePath, "utf-8");
        fs.writeFileSync(tsconfigBasePath, oldTsconfigBase.replace(`"emitDeclarationOnly": true`, `"emitDeclarationOnly": false`));
    }

    currentlyBuilding++;

    await realBuildProject(...args);

    currentlyBuilding--;

    if (currentlyBuilding === 0) {
        fs.writeFileSync(tsconfigBasePath, oldTsconfigBase);
    }
};


const buildProject = cmdLineOptions.bundle ? realBuildProject : buildProjectWithEmit;


export const buildScripts = task({
    name: "scripts",
    description: "Builds files in the 'scripts' folder.",
    run: () => buildProject("scripts")
});


/** @type {{ libs: string[]; paths: Record<string, string | undefined>; }} */
const libraries = readJson("./src/lib/libs.json");
const libs = libraries.libs.map(lib => {
    const relativeSources = ["header.d.ts", lib + ".d.ts"];
    const relativeTarget = libraries.paths && libraries.paths[lib] || ("lib." + lib + ".d.ts");
    const sources = relativeSources.map(s => path.posix.join("src/lib", s));
    const target = `built/local/${relativeTarget}`;
    return { target, relativeTarget, sources };
});

export const generateLibs = task({
    name: "lib",
    description: "Builds the library targets",
    run: async () => {
        await fs.promises.mkdir("./built/local", { recursive: true });
        const allSources = libs.flatMap((lib) => lib.sources);
        const allTargets = libs.flatMap((lib) => lib.target);
        if (needsUpdate([copyright, ...allSources], allTargets)) {
            for (const lib of libs) {
                let output = getCopyrightHeader();

                await fs.promises.writeFile(lib.target, getCopyrightHeader());
                for (const source of lib.sources) {
                    const contents = await fs.promises.readFile(source, "utf-8");
                    // TODO(jakebailey): "\n\n" is for compatibility with our current tests; our test baselines
                    // are sensitive to the positions of things in the lib files. Eventually remove this,
                    // or remove lib.d.ts line numbers from our baselines.
                    output += "\n\n" + contents.replace(/\r\n/g, "\n");
                }

                await fs.promises.writeFile(lib.target, output);
            }
        }
    },
});

const cleanLib = task({
    name: "clean-lib",
    hiddenFromTaskList: true,
    run: () => del(libs.map(lib => lib.target)),
});
cleanTasks.push(cleanLib);


const diagnosticInformationMapTs = "src/compiler/diagnosticInformationMap.generated.ts";
const diagnosticMessagesJson = "src/compiler/diagnosticMessages.json";
const diagnosticMessagesGeneratedJson = "src/compiler/diagnosticMessages.generated.json";

export const generateDiagnostics = task({
    name: "generate-diagnostics",
    description: "Generates a diagnostic file in TypeScript based on an input JSON file",
    run: async () => {
        if (needsUpdate(diagnosticMessagesJson, [diagnosticMessagesGeneratedJson, diagnosticInformationMapTs])) {
            await exec(process.execPath, ["scripts/processDiagnosticMessages.mjs", diagnosticMessagesJson]);
        }
    }
});

const cleanDiagnostics = task({
    name: "clean-diagnostics",
    description: "Generates a diagnostic file in TypeScript based on an input JSON file",
    hiddenFromTaskList: true,
    run: () => del([diagnosticInformationMapTs, diagnosticMessagesGeneratedJson]),
});
cleanTasks.push(cleanDiagnostics);


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
            return exec(process.execPath, ["scripts/generateLocalizedDiagnosticMessages.mjs", "src/loc/lcl", "built/local", diagnosticMessagesGeneratedJson], { ignoreExitCode: true });
        }
    }
});

export const buildSrc = task({
    name: "build-src",
    dependencies: [generateDiagnostics],
    run: () => buildProject("src"),
});

export const cleanSrc = task({
    name: "clean-src",
    run: () => cleanProject("src"),
});

/**
 * @param {string} entrypoint
 * @param {string} output
 */
async function runDtsBundler(entrypoint, output) {
    await exec(process.execPath, [
        "./scripts/dtsBundler.mjs",
        "--entrypoint",
        entrypoint,
        "--output",
        output,
    ]);
}

/**
 * @param {string} entrypoint
 * @param {string} outfile
 * @param {boolean} exportIsTsObject True if this file exports the TS object and should have relevant code injected.
 */
 function esbuildTask(entrypoint, outfile, exportIsTsObject = false) {
    // Note: we do not use --minify, as that would hide function names from user backtraces
    // (we don't ship our sourcemaps), and would break consumers like monaco which modify
    // typescript.js for their own needs. Also, using --sourcesContent=false doesn't help,
    // as even though it's a smaller source map that could be shipped to users for better
    // stack traces via names, the maps are bigger than the actual source files themselves.
    /** @type {esbuild.BuildOptions} */
    const options = {
        entryPoints: [entrypoint],
        banner: { js: getCopyrightHeader() },
        bundle: true,
        outfile,
        platform: "node",
        target: "es2018", // Covers Node 10.
        format: "cjs",
        sourcemap: "linked",
        external: ["./node_modules/*"],
        conditions: ["require"],
        supported: {
            // "const-and-let": false, // https://github.com/evanw/esbuild/issues/297
            "object-rest-spread": false, // Performance enhancement, see: https://github.com/evanw/esbuild/releases/tag/v0.14.46
        },
        // legalComments: "none", // If we add copyright headers to the source files, uncomment.
        plugins: [
            {
                name: "fix-require",
                setup: (build) => {
                    build.onEnd(async () => {
                        // esbuild converts calls to "require" to "__require"; this function
                        // calls the real require if it exists, or throws if it does not (rather than
                        // throwing an error like "require not defined"). But, since we want typescript
                        // to be consumable by other bundlers, we need to convert these calls back to
                        // require so our imports are visible again.
                        //
                        // Note that this step breaks source maps, but only for lines that reference
                        // "__require", which is an okay tradeoff for the performance of not running
                        // the output through transpileModule/babel/etc.
                        //
                        // See: https://github.com/evanw/esbuild/issues/1905
                        let contents = await fs.promises.readFile(outfile, "utf-8");
                        contents = contents.replace(/__require\(/g, "require(");
                        await fs.promises.writeFile(outfile, contents);
                    });
                },
            }
        ]
    };

    if (exportIsTsObject) {
        options.format = "iife"; // We use an IIFE so we can inject the code below.
        options.globalName = "ts"; // Name the variable ts, matching our old big bundle and so we can use the code below.
        options.footer = {
            // These snippets cannot appear in the actual source files, otherwise they will be rewritten
            // to things like exports or requires.
            js: `
if (typeof module !== "undefined" && module.exports) {
    // If we are in a CJS context, export the ts namespace.
    module.exports = ts;
}
if (ts.server) {
    // If we are in a server bundle, inject the dynamicImport function.
    ts.server.dynamicImport = id => import(id);
}`
        };
    }

    return {
        build: () => esbuild.build(options),
        clean: () => del([outfile, `${outfile}.map`]),
        watch: () => esbuild.build({ ...options, watch: true }),
    };
}

/**
 * Writes a CJS module that reexports another CJS file via
 * `module.exports = require("...")`.
 *
 * @param {string} infile Relative path from the repo root to the file to be required.
 * @param {string} outfile Relative path from the repo root to the output file.
 */
async function writeCJSReexport(infile, outfile) {
    const inRelativeToOut = infile = path.relative(path.dirname(outfile), infile);
    await fs.promises.writeFile(outfile, `module.exports = require("./${inRelativeToOut}")`);
}

const esbuildDebugTools = esbuildTask("./src/debug/compilerDebug.ts", "./built/local/compilerDebug.js");

const buildDebugTools = task({
    name: "build-debug-tools",
    dependencies: [generateDiagnostics],
    run: () => cmdLineOptions.bundle ? esbuildDebugTools.build() : buildProject("src/debug"),
});

const cleanDebugTools = task({
    name: "clean-debug-tools",
    hiddenFromTaskList: true,
    run: () => cmdLineOptions.bundle ? esbuildDebugTools.build() : cleanProject("src/debug")
});
cleanTasks.push(cleanDebugTools);


const esbuildTsc = esbuildTask("./src/tsc/tsc.ts", "./built/local/tsc.js", /* exportIsTsObject */ true);

export const buildTsc = task({
    name: "tsc",
    description: "Builds the command-line compiler",
    dependencies: [generateDiagnostics, buildDebugTools, generateLibs],
    run: async () => {
        if (cmdLineOptions.bundle) return esbuildTsc.build();
        await writeCJSReexport("./built/local/tsc/tsc.js", "./built/local/tsc.js");
        await buildProject("src/tsc");
    }
});

export const cleanTsc = task({
    name: "clean-tsc",
    description: "Cleans outputs for the command-line compiler",
    hiddenFromTaskList: true,
    run: () => cmdLineOptions.bundle ? esbuildTsc.clean() : cleanProject("src/tsc"),
});
cleanTasks.push(cleanTsc);

const buildServicesWithTsc = task({
    name: "services-src",
    dependencies: [generateDiagnostics],
    run: () => buildProject("src/typescript"),
});

// TODO(jakebailey): rename this; no longer "services".

const esbuildServices = esbuildTask("./src/typescript/typescript.ts", "./built/local/typescript.js", /* exportIsTsObject */ true);

export const buildServices = task({
    name: "services",
    description: "Builds the language service",
    dependencies: [generateDiagnostics, generateLibs].concat(cmdLineOptions.bundle ? [] : [buildServicesWithTsc]),
    run: async () => {
        if (cmdLineOptions.bundle) return esbuildServices.build();
        await writeCJSReexport("./built/local/typescript/typescript.js", "./built/local/typescript.js");
    }
});

export const cleanServices = task({
    name: "clean-services",
    description: "Cleans outputs for the language service",
    hiddenFromTaskList: true,
    run: () => cmdLineOptions.bundle ? esbuildServices.clean() : cleanProject("src/typescript"),
});
cleanTasks.push(cleanServices);


export const dtsServices = task({
    name: "dts-services",
    description: "Bundles typescript.d.ts",
    dependencies: [buildServicesWithTsc],
    run: () => runDtsBundler("./built/local/typescript/typescript.d.ts", "./built/local/typescript.d.ts"),
});

const esbuildServer = esbuildTask("./src/tsserver/server.ts", "./built/local/tsserver.js", /* exportIsTsObject */ true);

export const buildServer = task({
    name: "tsserver",
    description: "Builds the language server",
    dependencies: [generateDiagnostics, generateLibs],
    run: async () => {
        if (cmdLineOptions.bundle) return esbuildServer.build();
        await writeCJSReexport("./built/local/tsserver/server.js", "./built/local/tsserver.js");
        await buildProject("src/tsserver");
    }
});

export const cleanServer = task({
    name: "clean-tsserver",
    description: "Cleans outputs for the language server",
    hiddenFromTaskList: true,
    run: () => cmdLineOptions.bundle ? esbuildServer.clean() : cleanProject("src/tsserver"),
});
cleanTasks.push(cleanServer);


export const min = task({
    name: "min",
    description: "Builds only tsc and tsserver",
    dependencies: [buildTsc, buildServer],
});

export const cleanMin = task({
    name: "clean-min",
    description: "Cleans outputs for tsc and tsserver",
    hiddenFromTaskList: true,
    dependencies: [cleanTsc, cleanServer],
});

const buildLsslWithTsc = task({
    name: "lssl-src",
    dependencies: [generateDiagnostics],
    run: () => buildProject("src/tsserverlibrary"),
});

const esbuildLssl = esbuildTask("./src/tsserverlibrary/tsserverlibrary.ts", "./built/local/tsserverlibrary.js", /* exportIsTsObject */ true);

export const buildLssl = task({
    name: "lssl",
    description: "Builds language service server library",
    dependencies: [generateDiagnostics, generateLibs].concat(cmdLineOptions.bundle ? [] : [buildLsslWithTsc]),
    run: async () => {
        if (cmdLineOptions.bundle) return esbuildLssl.build();
        await writeCJSReexport("./built/local/tsserverlibrary/tsserverlibrary.js", "./built/local/tsserverlibrary.js");
    },
});

export const cleanLssl = task({
    name: "clean-lssl",
    description: "Clean outputs for the language service server library",
    hiddenFromTaskList: true,
    run: () => cmdLineOptions.bundle ? esbuildLssl.clean() : cleanProject("src/tsserverlibrary"),
});
cleanTasks.push(cleanLssl);

export const dtsLssl = task({
    name: "dts-lssl",
    description: "Bundles tsserverlibrary.d.ts",
    dependencies: [buildLsslWithTsc],
    run: () => runDtsBundler("./built/local/tsserverlibrary/tsserverlibrary.d.ts", "./built/local/tsserverlibrary.d.ts")
});

export const dts = task({
    name: "dts",
    dependencies: [dtsServices, dtsLssl],
});


const testRunner = "./built/local/run.js";
const esbuildTests = esbuildTask("./src/testRunner/_namespaces/Harness.ts", testRunner);

export const buildTests = task({
    name: "tests",
    description: "Builds the test infrastructure",
    dependencies: [generateDiagnostics],
    run: async () => {
        if (cmdLineOptions.bundle) return esbuildTests.build();
        await writeCJSReexport("./built/local/testRunner/runner.js", testRunner);
        await buildProject("src/testRunner");
    },
});

export const cleanTests = task({
    name: "clean-tests",
    description: "Cleans the outputs for the test infrastructure",
    hiddenFromTaskList: true,
    run: () => cmdLineOptions.bundle ? esbuildTests.clean() : cleanProject("src/testRunner"),
});
cleanTasks.push(cleanTests);



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
            "--cache-location", `${folder}/.eslintcache`,
            "--format", formatter,
        ];

        if (cmdLineOptions.fix) {
            args.push("--fix");
        }

        args.push(folder);

        console.log(`Linting: ${args.join(" ")}`);
        return exec(process.execPath, args);
    }
});


const esbuildCancellationToken = esbuildTask("./src/cancellationToken/cancellationToken.ts", "./built/local/cancellationToken.js");

// No need for writeCJSReexport, this outputs to the right place.
const buildCancellationToken = task({
    name: "cancellation-token",
    dependencies: [generateDiagnostics],
    run: () => cmdLineOptions.bundle ? esbuildCancellationToken.build() : buildProject("src/cancellationToken"),
});
const cleanCancellationToken = task({
    name: "clean-cancellation-token",
    hiddenFromTaskList: true,
    run: () => cmdLineOptions.bundle ? esbuildCancellationToken.clean() : cleanProject("src/cancellationToken"),
});
cleanTasks.push(cleanCancellationToken);

const esbuildTypingsInstaller = esbuildTask("./src/typingsInstaller/nodeTypingsInstaller.ts", "./built/local/typingsInstaller.js");

const buildTypingsInstaller = task({
    name: "typings-installer",
    dependencies: [generateDiagnostics],
    run: async () => {
        if (cmdLineOptions.bundle) return esbuildTypingsInstaller.build();
        await writeCJSReexport("./built/typingsInstaller/nodeTypingsInstaller.js", "./built/local/typingsInstaller.js");
        await buildProject("src/typingsInstaller");
    },
});
const cleanTypingsInstaller = task({
    name: "clean-typings-installer",
    hiddenFromTaskList: true,
    run: () => cmdLineOptions.bundle ? esbuildTypingsInstaller.clean() : cleanProject("src/typingsInstaller"),
});
cleanTasks.push(cleanTypingsInstaller);

const esbuildWatchGuard = esbuildTask("./src/watchGuard/watchGuard.ts", "./built/local/watchGuard.js");

// No need for writeCJSReexport, this outputs to the right place.
const buildWatchGuard = task({
    name: "watch-guard",
    dependencies: [generateDiagnostics],
    run: () => cmdLineOptions.bundle ? esbuildWatchGuard.build() : buildProject("src/watchGuard"),
});
const cleanWatchGuard = task({
    name: "clean-watch-guard",
    hiddenFromTaskList: true,
    run: () => cmdLineOptions.bundle ? esbuildWatchGuard.clean() : cleanProject("src/watchGuard"),
});
cleanTasks.push(cleanWatchGuard);

export const generateTypesMap = task({
    name: "generate-types-map",
    run: async () => {
        const source = "src/server/typesMap.json";
        const target = "built/local/typesMap.json";
        if (needsUpdate(source, target)) {
            const contents = await fs.promises.readFile(source, "utf-8");
            JSON.parse(contents);
            await fs.promises.writeFile(target, contents);
        }
    }
});

const cleanTypesMap = task({
    name: "clean-types-map",
    hiddenFromTaskList: true,
    run: () => del("built/local/typesMap.json"),
});
cleanTasks.push(cleanTypesMap);

// Drop a copy of diagnosticMessages.generated.json into the built/local folder. This allows
// it to be synced to the Azure DevOps repo, so that it can get picked up by the build
// pipeline that generates the localization artifacts that are then fed into the translation process.
const builtLocalDiagnosticMessagesGeneratedJson = "built/local/diagnosticMessages.generated.json";
const copyBuiltLocalDiagnosticMessages = task({
    name: "copy-built-local-diagnostic-messages",
    dependencies: [generateDiagnostics],
    run: async () => {
        if (needsUpdate(diagnosticMessagesGeneratedJson, builtLocalDiagnosticMessagesGeneratedJson)) {
            const contents = await fs.promises.readFile(diagnosticMessagesGeneratedJson, "utf-8");
            JSON.parse(contents);
            await fs.promises.writeFile(builtLocalDiagnosticMessagesGeneratedJson, contents);
        }
    }
});

const cleanBuiltLocalDiagnosticMessages = task({
    name: "clean-built-local-diagnostic-messages",
    hiddenFromTaskList: true,
    run: () => del(builtLocalDiagnosticMessagesGeneratedJson),
});
cleanTasks.push(cleanBuiltLocalDiagnosticMessages);

export const buildOtherOutputs = task({
    name: "other-outputs",
    description: "Builds miscelaneous scripts and documents distributed with the LKG",
    dependencies: [buildCancellationToken, buildTypingsInstaller, buildWatchGuard, generateTypesMap, copyBuiltLocalDiagnosticMessages],
});

export const local = task({
    name: "local",
    description: "Builds the full compiler and services",
    dependencies: [localize, buildTsc, buildServer, buildServices, buildLssl, buildOtherOutputs, dts],
});
export default local;


export const runTests = task({
    name: "runtests",
    description: "Runs the tests using the built run.js file.",
    dependencies: [buildTests, generateLibs, dts],
    run: () => runConsoleTests(testRunner, "mocha-fivemat-progress-reporter", /*runInParallel*/ false),
});
// task("runtests").flags = {
//     "-t --tests=<regex>": "Pattern for tests to run.",
//     "   --failed": "Runs tests listed in '.failed-tests'.",
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

export const runTestsParallel = task({
    name: "runtests-parallel",
    description: "Runs all the tests in parallel using the built run.js file.",
    dependencies: [buildTests, generateLibs, dts],
    run: () => runConsoleTests(testRunner, "min", /*runInParallel*/ cmdLineOptions.workers > 1),
});
// task("runtests-parallel").flags = {
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
    run: () => exec(process.execPath, ["scripts/browserIntegrationTest.mjs"]),
});

export const diff = task({
    name: "diff",
    description: "Diffs the compiler baselines using the diff tool specified by the 'DIFF' environment variable",
    run: () => exec(getDiffTool(), [refBaseline, localBaseline], { ignoreExitCode: true, waitForExit: false }),
});

export const diffRwc = task({
    name: "diff-rwc",
    description: "Diffs the RWC baselines using the diff tool specified by the 'DIFF' environment variable",
    run: () => exec(getDiffTool(), [refRwcBaseline, localRwcBaseline], { ignoreExitCode: true, waitForExit: false }),
});

/**
 * @param {string} localBaseline Path to the local copy of the baselines
 * @param {string} refBaseline Path to the reference copy of the baselines
 */
function createBaselineAccept(localBaseline, refBaseline) {
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
            const out = localPathToRefPath(p);
            await fs.promises.rm(out);
        }
    };
}

export const baselineAccept = task({
    name: "baseline-accept",
    description: "Makes the most recent test results the new baseline, overwriting the old baseline",
    run: createBaselineAccept(localBaseline, refBaseline),
});

export const baselineAcceptRwc = task({
    name: "baseline-accept-rwc",
    description: "Makes the most recent rwc test results the new baseline, overwriting the old baseline",
    run: createBaselineAccept(localRwcBaseline, refRwcBaseline),
});

// TODO(rbuckton): Determine if we still need this task. Depending on a relative
//                 path here seems like a bad idea.
export const updateSublime = task({
    name: "update-sublime",
    description: "Updates the sublime plugin's tsserver",
    dependencies: [buildServer],
    run: async () => {
        for (const file of ["built/local/tsserver.js", "built/local/tsserver.js.map"]) {
            await fs.promises.copyFile(file, path.resolve("../TypeScript-Sublime-Plugin/tsserver/", path.basename(file)));
        }
    }
});

// TODO(rbuckton): Should the path to DefinitelyTyped be configurable via an environment variable?
export const importDefinitelyTypedTests = task({
    name: "importDefinitelyTypedTests",
    description: "Runs the importDefinitelyTypedTests script to copy DT's tests to the TS-internal RWC tests",
    run: () => exec(process.execPath, ["scripts/importDefinitelyTypedTests/importDefinitelyTypedTests.mjs", "./", "../DefinitelyTyped"]),
});


export const produceLKG = task({
    name: "LKG",
    description: "Makes a new LKG out of the built js files",
    dependencies: [localize, buildTsc, buildServer, buildServices, buildLssl, buildOtherOutputs, dts],
    run: async () => {
        if (!cmdLineOptions.bundle) {
            throw new Error("LKG cannot be created when --bundle=false");
        }

        const expectedFiles = [
            "built/local/cancellationToken.js",
            "built/local/tsc.js",
            "built/local/tsserver.js",
            "built/local/tsserverlibrary.js",
            "built/local/tsserverlibrary.d.ts",
            "built/local/typescript.js",
            "built/local/typescript.d.ts",
            "built/local/typingsInstaller.js",
            "built/local/watchGuard.js",
        ].concat(libs.map(lib => lib.target));
        const missingFiles = expectedFiles
            .concat(localizationTargets)
            .filter(f => !fs.existsSync(f));
        if (missingFiles.length > 0) {
            throw new Error("Cannot replace the LKG unless all built targets are present in directory 'built/local/'. The following files are missing:\n" + missingFiles.join("\n"));
        }
        const sizeBefore = getDirSize("lib");
        await exec(process.execPath, ["scripts/produceLKG.mjs"]);
        const sizeAfter = getDirSize("lib");
        if (sizeAfter > (sizeBefore * 1.10)) {
            throw new Error("The lib folder increased by 10% or more. This likely indicates a bug.");
        }
    }
});

export const lkg = task({
    name: "lkg",
    hiddenFromTaskList: true,
    dependencies: [produceLKG],
});

export const generateSpec = task({
    name: "generate-spec",
    description: "Generates a Markdown version of the Language Specification",
    hiddenFromTaskList: true,
    run: () => exec("cscript", ["//nologo", "scripts/word2md.mjs", path.resolve("doc/TypeScript Language Specification - ARCHIVED.docx"), path.resolve("doc/spec-ARCHIVED.md")]),
});

// TODO(jakebailey): this seems silly; most tasks in cleanTasks just remove
// things in built, only to just remove built anyway. Instead just depend on
// cleaning built and the diagnostics in src?
export const clean = task({
    name: "clean",
    description: "Cleans build outputs",
    dependencies: cleanTasks,
    run: () => del("built"),
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
