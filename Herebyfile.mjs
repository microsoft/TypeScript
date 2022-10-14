// @ts-check
import path from "path";
import fs from "fs";
import del from "del";
import esbuild from "esbuild";
import { task } from "hereby";
import _glob from "glob";
import util from "util";
import { exec, readJson, getDiffTool, getDirSize } from "./scripts/build/utils.mjs";
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


// TODO(jakebailey): This is really gross. If the build is cancelled (i.e. Ctrl+C), the modification will persist.
// Waiting on: https://github.com/microsoft/TypeScript/issues/51164
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
    }
});

const cleanDiagnostics = task({
    name: "clean-diagnostics",
    description: "Generates a diagnostic file in TypeScript based on an input JSON file",
    hiddenFromTaskList: true,
    run: () => del([diagnosticInformationMapTs, diagnosticMessagesGeneratedJson]),
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
    run: () => exec(process.execPath, ["scripts/generateLocalizedDiagnosticMessages.mjs", "src/loc/lcl", "built/local", diagnosticMessagesGeneratedJson], { ignoreExitCode: true }),
});

export const buildSrc = task({
    name: "build-src",
    dependencies: [generateDiagnostics],
    run: () => buildProject("src"),
});

export const cleanSrc = task({
    name: "clean-src",
    hiddenFromTaskList: true,
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
 * @typedef {{
    external?: string[];
    exportIsTsObject?: boolean;
    setDynamicImport?: boolean;
}} ESBuildTaskOptions
 * @param {string} entrypoint
 * @param {string} outfile
 * @param {ESBuildTaskOptions | undefined} [taskOptions]
 */
 function esbuildTask(entrypoint, outfile, taskOptions = {}) {
    return {
        build: async () => {
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
                sourcesContent: false,
                external: [
                    ...(taskOptions.external ?? []),
                    "source-map-support",
                ],
                supported: {
                    // "const-and-let": false, // https://github.com/evanw/esbuild/issues/297
                    "object-rest-spread": false, // Performance enhancement, see: https://github.com/evanw/esbuild/releases/tag/v0.14.46
                },
                logLevel: "warning",
                // legalComments: "none", // If we add copyright headers to the source files, uncomment.
                plugins: [
                    {
                        name: "no-node-modules",
                        setup: (build) => {
                            build.onLoad({ filter: /[\\/]node_modules[\\/]/ }, () => {
                                // Ideally, we'd use "--external:./node_modules/*" here, but that doesn't work; we
                                // will instead end up with paths to node_modules rather than the package names.
                                // Instead, we'll return a load error when we see that we're trying to bundle from
                                // node_modules, then explicitly declare which external dependencies we rely on, which
                                // ensures that the correct module specifier is kept in the output (the non-wildcard
                                // form works properly). It also helps us keep tabs on what external dependencies we
                                // may be importing, which is handy.
                                //
                                // See: https://github.com/evanw/esbuild/issues/1958
                                return {
                                    errors: [{ text: 'Attempted to bundle from node_modules; ensure "external" is set correctly.' }]
                                };
                            });
                        }
                    },
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
                                // The leading spaces are to keep the offsets the same within the files to keep
                                // source maps working (though this only really matters for the line the require is on).
                                //
                                // See: https://github.com/evanw/esbuild/issues/1905
                                let contents = await fs.promises.readFile(outfile, "utf-8");
                                contents = contents.replace(/__require\(/g, "  require(");
                                await fs.promises.writeFile(outfile, contents);
                            });
                        },
                    }
                ]
            };

            if (taskOptions.exportIsTsObject) {
                // These snippets cannot appear in the actual source files, otherwise they will be rewritten
                // to things like exports or requires.

                // If we are in a CJS context, export the ts namespace.
                let footer = `\nif (typeof module !== "undefined" && module.exports) { module.exports = ts; }`;

                if (taskOptions.setDynamicImport) {
                    // If we are in a server bundle, inject the dynamicImport function.
                    // This only works because the web server's "start" function returns;
                    // the node server does not, but we don't use this there.
                    footer += `\nif (ts.server && ts.server.setDynamicImport) { ts.server.setDynamicImport(id => import(id)); }`;
                }

                options.format = "iife"; // We use an IIFE so we can inject the footer, and so that "ts" is global if not loaded as a module.
                options.globalName = "ts"; // Name the variable ts, matching our old big bundle and so we can use the code below.
                options.footer = { js: footer };
            }

            await esbuild.build(options);
        },
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


const esbuildTsc = esbuildTask("./src/tsc/tsc.ts", "./built/local/tsc.js");

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


const buildServicesWithTsc = task({
    name: "services-src",
    dependencies: [generateDiagnostics],
    run: () => buildProject("src/typescript"),
});

// TODO(jakebailey): rename this; no longer "services".

const esbuildServices = esbuildTask("./src/typescript/typescript.ts", "./built/local/typescript.js", { exportIsTsObject: true });

export const buildServices = task({
    name: "services",
    description: "Builds the language service",
    dependencies: [generateDiagnostics, generateLibs].concat(cmdLineOptions.bundle ? [] : [buildServicesWithTsc]),
    run: async () => {
        if (cmdLineOptions.bundle) return esbuildServices.build();
        await writeCJSReexport("./built/local/typescript/typescript.js", "./built/local/typescript.js");
    }
});


export const dtsServices = task({
    name: "dts-services",
    description: "Bundles typescript.d.ts",
    dependencies: [buildServicesWithTsc],
    run: () => runDtsBundler("./built/local/typescript/typescript.d.ts", "./built/local/typescript.d.ts"),
});

const esbuildServer = esbuildTask("./src/tsserver/server.ts", "./built/local/tsserver.js", { exportIsTsObject: true, setDynamicImport: true });

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


export const min = task({
    name: "min",
    description: "Builds only tsc and tsserver",
    dependencies: [buildTsc, buildServer],
});


const buildLsslWithTsc = task({
    name: "lssl-src",
    dependencies: [generateDiagnostics],
    run: () => buildProject("src/tsserverlibrary"),
});

const esbuildLssl = esbuildTask("./src/tsserverlibrary/tsserverlibrary.ts", "./built/local/tsserverlibrary.js", { exportIsTsObject: true });

export const buildLssl = task({
    name: "lssl",
    description: "Builds language service server library",
    dependencies: [generateDiagnostics, generateLibs].concat(cmdLineOptions.bundle ? [] : [buildLsslWithTsc]),
    run: async () => {
        if (cmdLineOptions.bundle) return esbuildLssl.build();
        await writeCJSReexport("./built/local/tsserverlibrary/tsserverlibrary.js", "./built/local/tsserverlibrary.js");
    },
});


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
const esbuildTests = esbuildTask("./src/testRunner/_namespaces/Harness.ts", testRunner, {
    external: [
        "chai",
        "del",
        "diff",
        "mocha",
        "ms",
    ],
});

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

const buildCancellationToken = task({
    name: "cancellation-token",
    dependencies: [generateDiagnostics],
    run: async () =>{
        if (cmdLineOptions.bundle) return esbuildCancellationToken.build();
        await writeCJSReexport("./built/local/cancellationToken/cancellationToken.js", "./built/local/cancellationToken.js");
        await buildProject("src/cancellationToken");
    },
});

const esbuildTypingsInstaller = esbuildTask("./src/typingsInstaller/nodeTypingsInstaller.ts", "./built/local/typingsInstaller.js");

const buildTypingsInstaller = task({
    name: "typings-installer",
    dependencies: [generateDiagnostics],
    run: async () => {
        if (cmdLineOptions.bundle) return esbuildTypingsInstaller.build();
        await writeCJSReexport("./built/local/typingsInstaller/nodeTypingsInstaller.js", "./built/local/typingsInstaller.js");
        await buildProject("src/typingsInstaller");
    },
});


const esbuildWatchGuard = esbuildTask("./src/watchGuard/watchGuard.ts", "./built/local/watchGuard.js");

const buildWatchGuard = task({
    name: "watch-guard",
    dependencies: [generateDiagnostics],
    run: async () => {
        if (cmdLineOptions.bundle) return esbuildWatchGuard.build();
        await writeCJSReexport("./built/local/watchGuard/watchGuard.js", "./built/local/watchGuard.js");
        await buildProject("src/watchGuard");
    },
});


export const generateTypesMap = task({
    name: "generate-types-map",
    run: async () => {
        const source = "src/server/typesMap.json";
        const target = "built/local/typesMap.json";
        const contents = await fs.promises.readFile(source, "utf-8");
        JSON.parse(contents); // Validates that the JSON parses.
        await fs.promises.writeFile(target, contents);
    }
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
    }
});


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

export const cleanBuilt = task({
    name: "clean-built",
    hiddenFromTaskList: true,
    run: () => del("built"),
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
