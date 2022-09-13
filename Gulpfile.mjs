// @ts-check
import path from "path";
import fs from "fs";
import log from "fancy-log";
import newer from "gulp-newer";
import del from "del";
import rename from "gulp-rename";
import concat from "gulp-concat";
import merge2 from "merge2";
import gulp from "gulp";
import { transform } from "gulp-insert";
import { exec, readJson, needsUpdate, getDiffTool, getDirSize, rm } from "./scripts/build/utils.mjs";
import { runConsoleTests, refBaseline, localBaseline, refRwcBaseline, localRwcBaseline } from "./scripts/build/tests.mjs";
import { buildProject as realBuildProject, cleanProject, watchProject } from "./scripts/build/projects.mjs";
import { localizationDirectories } from "./scripts/build/localization.mjs";
import cmdLineOptions from "./scripts/build/options.mjs";
import esbuild from "esbuild";

const { src, dest, task, parallel, series, watch } = gulp;

const copyright = "CopyrightNotice.txt";
const cleanTasks = [];


// TODO(jakebailey): This is really gross. Waiting on https://github.com/microsoft/TypeScript/issues/25613,
// or at least control over noEmit / emitDeclarationOnly in build mode.
let currentlyBuilding = 0;
let oldTsconfigBase;

/** @type {typeof realBuildProject} */
const buildProjectWithEmit = async (...args) => {
    const tsconfigBasePath = "./src/tsconfig-base.json";

    if (currentlyBuilding === 0) {
        oldTsconfigBase = fs.readFileSync(tsconfigBasePath, "utf-8");
        fs.writeFileSync(tsconfigBasePath, oldTsconfigBase.replace(`"emitDeclarationOnly": true,`, `"emitDeclarationOnly": false, // DO NOT COMMIT`));
    }

    currentlyBuilding++;

    await realBuildProject(...args);

    currentlyBuilding--;

    if (currentlyBuilding === 0) {
        fs.writeFileSync(tsconfigBasePath, oldTsconfigBase);
    }
};


const buildProject = cmdLineOptions.bundle ? realBuildProject : buildProjectWithEmit;


const buildScripts = () => buildProject("scripts");
task("scripts", buildScripts);
task("scripts").description = "Builds files in the 'scripts' folder.";

/** @type {{ libs: string[]; paths: Record<string, string | undefined>; }} */
const libraries = readJson("./src/lib/libs.json");
const libs = libraries.libs.map(lib => {
    const relativeSources = ["header.d.ts", lib + ".d.ts"];
    const relativeTarget = libraries.paths && libraries.paths[lib] || ("lib." + lib + ".d.ts");
    const sources = relativeSources.map(s => path.posix.join("src/lib", s));
    const target = `built/local/${relativeTarget}`;
    return { target, relativeTarget, sources };
});

const generateLibs = () => {
    return merge2(libs.map(({ sources, target, relativeTarget }) =>
        src([copyright, ...sources])
            .pipe(newer(target))
            .pipe(concat(relativeTarget, { newLine: "\n\n" }))
            .pipe(dest("built/local"))));
};
task("lib", generateLibs);
task("lib").description = "Builds the library targets";

const cleanLib = () => del(libs.map(lib => lib.target));
cleanTasks.push(cleanLib);

const watchLib = () => watch(["src/lib/**/*"], generateLibs);

const diagnosticInformationMapTs = "src/compiler/diagnosticInformationMap.generated.ts";
const diagnosticMessagesJson = "src/compiler/diagnosticMessages.json";
const diagnosticMessagesGeneratedJson = "src/compiler/diagnosticMessages.generated.json";
const generateDiagnostics = async () => {
    if (needsUpdate(diagnosticMessagesJson, [diagnosticMessagesGeneratedJson, diagnosticInformationMapTs])) {
        await exec(process.execPath, ["scripts/processDiagnosticMessages.mjs", diagnosticMessagesJson]);
    }
};
task("generate-diagnostics", generateDiagnostics);
task("generate-diagnostics").description = "Generates a diagnostic file in TypeScript based on an input JSON file";

const cleanDiagnostics = () => del([diagnosticInformationMapTs, diagnosticMessagesGeneratedJson]);
cleanTasks.push(cleanDiagnostics);

const watchDiagnostics = () => watch(["src/compiler/diagnosticMessages.json"], task("generate-diagnostics"));

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

const localize = async () => {
    if (needsUpdate(diagnosticMessagesGeneratedJson, generatedLCGFile)) {
        return exec(process.execPath, ["scripts/generateLocalizedDiagnosticMessages.mjs", "src/loc/lcl", "built/local", diagnosticMessagesGeneratedJson], { ignoreExitCode: true });
    }
};

const preSrc = parallel(generateLibs, series(buildScripts, generateDiagnostics, localize));
const buildSrc = () => buildProject("src");

task("build-src", series(preSrc, buildSrc));

const cleanSrc = () => cleanProject("src");
task("clean-src", cleanSrc);


/** @type {string | undefined} */
let copyrightHeader;
function getCopyrightHeader() {
    if (copyrightHeader === undefined) {
        copyrightHeader = fs.readFileSync(copyright, "utf-8");
    }
    return copyrightHeader;
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
        target: "es2018",
        format: "cjs",
        sourcemap: "linked",
        external: ["./node_modules/*"],
        conditions: ["require"],
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
function writeCJSReexport(infile, outfile) {
    const outDir = path.dirname(outfile);
    fs.mkdirSync(outDir, { recursive: true });
    const inRelativeToOut = path.relative(outDir, infile);
    fs.writeFileSync(outfile, `module.exports = require("./${inRelativeToOut}")`);
}

const esbuildDebugTools = esbuildTask("./src/debug/compilerDebug.ts", "./built/local/compiler-debug.js");

const buildDebugTools = () => {
    if (cmdLineOptions.bundle) return esbuildDebugTools.build();
    writeCJSReexport("./built/local/debug/compilerDebug.js", "./built/local/compiler-debug.js")
    return buildProject("src/debug")
};
const cleanDebugTools = () => cmdLineOptions.bundle ? esbuildDebugTools.build() : cleanProject("src/debug");
cleanTasks.push(cleanDebugTools);

// Pre-build steps when targeting the LKG compiler
const lkgPreBuild = parallel(generateLibs, series(generateDiagnostics, buildDebugTools));


const esbuildTsc = esbuildTask("./src/tsc/tsc.ts", "./built/local/tsc.js", /* exportIsTsObject */ true);
const writeTscCJSShim = () => writeCJSReexport("./built/local/tsc/tsc.js", "./built/local/tsc.js");


const buildTsc = () => {
    if (cmdLineOptions.bundle) return esbuildTsc.build();
    writeTscCJSShim();
    return buildProject("src/tsc");
};
task("tsc", series(lkgPreBuild, buildTsc));
task("tsc").description = "Builds the command-line compiler";

const cleanTsc = () => cmdLineOptions.bundle ? esbuildTsc.clean() : cleanProject("src/tsc");
cleanTasks.push(cleanTsc);
task("clean-tsc", cleanTsc);
task("clean-tsc").description = "Cleans outputs for the command-line compiler";

const watchTsc = () => {
    if (cmdLineOptions.bundle) return esbuildTsc.watch();
    writeTscCJSShim();
    return watchProject("src/tsc");
};
task("watch-tsc", series(lkgPreBuild, parallel(watchLib, watchDiagnostics, watchTsc)));
task("watch-tsc").description = "Watch for changes and rebuild the command-line compiler only.";

// Pre-build steps when targeting the built/local compiler.
const localPreBuild = parallel(generateLibs, series(generateDiagnostics, buildDebugTools, buildTsc));

// Pre-build steps to use based on supplied options.
const preBuild = cmdLineOptions.lkg ? lkgPreBuild : localPreBuild;

const esbuildServices = esbuildTask("./src/typescript/typescript.ts", "./built/local/typescript.js", /* exportIsTsObject */ true);
const writeServicesCJSShim = () => writeCJSReexport("./built/local/typescript/typescript.js", "./built/local/typescript.js");
const buildServicesProject = () => buildProject("src/typescript");

const buildServices = () => {
    if (cmdLineOptions.bundle) return esbuildServices.build();
    writeServicesCJSShim();
    return buildServicesProject();
};

task("services", series(preBuild, buildServices));
task("services").description = "Builds the language service";
task("services").flags = {
    "   --built": "Compile using the built version of the compiler."
};

const cleanServices = () => cmdLineOptions.bundle ? esbuildServices.clean() : cleanProject("src/typescript");

cleanTasks.push(cleanServices);
task("clean-services", cleanServices);
task("clean-services").description = "Cleans outputs for the language service";

const watchServices = () => {
    if (cmdLineOptions.bundle) return esbuildServices.watch();
    writeServicesCJSShim();
    return watchProject("src/typescript");
};
task("watch-services", series(preBuild, parallel(watchLib, watchDiagnostics, watchServices)));
task("watch-services").description = "Watches for changes and rebuild language service only";
task("watch-services").flags = {
    "   --built": "Compile using the built version of the compiler."
};


const esbuildServer = esbuildTask("./src/tsserver/server.ts", "./built/local/tsserver.js", /* exportIsTsObject */ true);
const writeServerCJSShim = () => writeCJSReexport("./built/local/tsserver/server.js", "./built/local/tsserver.js");

const buildServer = () => {
    if (cmdLineOptions.bundle) return esbuildServer.build();
    writeServerCJSShim();
    return buildProject("src/tsserver");
};
buildServer.displayName = "buildServer";
task("tsserver", series(preBuild, buildServer));
task("tsserver").description = "Builds the language server";
task("tsserver").flags = {
    "   --built": "Compile using the built version of the compiler."
};

const cleanServer = () => cmdLineOptions.bundle ? esbuildServer.clean() : cleanProject("src/tsserver");
cleanServer.displayName = "cleanServer";
cleanTasks.push(cleanServer);
task("clean-tsserver", cleanServer);
task("clean-tsserver").description = "Cleans outputs for the language server";

const watchServer = () => {
    if (cmdLineOptions.bundle) return esbuildServer.watch();
    writeServerCJSShim();
    return watchProject("src/tsserver");
};
task("watch-tsserver", series(preBuild, parallel(watchLib, watchDiagnostics, watchServer)));
task("watch-tsserver").description = "Watch for changes and rebuild the language server only";
task("watch-tsserver").flags = {
    "   --built": "Compile using the built version of the compiler."
};

task("min", series(preBuild, parallel(buildTsc, buildServer)));
task("min").description = "Builds only tsc and tsserver";
task("min").flags = {
    "   --built": "Compile using the built version of the compiler."
};

task("clean-min", series(cleanTsc, cleanServer));
task("clean-min").description = "Cleans outputs for tsc and tsserver";

task("watch-min", series(preBuild, parallel(watchLib, watchDiagnostics, watchTsc, watchServer)));
task("watch-min").description = "Watches for changes to a tsc and tsserver only";
task("watch-min").flags = {
    "   --built": "Compile using the built version of the compiler."
};

const esbuildLssl = esbuildTask("./src/tsserverlibrary/tsserverlibrary.ts", "./built/local/tsserverlibrary.js", /* exportIsTsObject */ true);
const writeLsslCJSShim = () => writeCJSReexport("./built/local/tsserverlibrary/tsserverlibrary.js", "./built/local/tsserverlibrary.js");

const buildLssl = () => {
    if (cmdLineOptions.bundle) return esbuildLssl.build();
    writeLsslCJSShim();
    return buildProject("src/tsserverlibrary");
};
task("lssl", series(preBuild, buildLssl));
task("lssl").description = "Builds language service server library";
task("lssl").flags = {
    "   --built": "Compile using the built version of the compiler."
};

const cleanLssl = () => cmdLineOptions.bundle ? esbuildLssl.clean() : cleanProject("src/tsserverlibrary");
cleanTasks.push(cleanLssl);
task("clean-lssl", cleanLssl);
task("clean-lssl").description = "Clean outputs for the language service server library";

const watchLssl = () => {
    if (cmdLineOptions.bundle) return esbuildLssl.watch();
    writeLsslCJSShim();
    return watchProject("src/tsserverlibrary");
};
task("watch-lssl", series(preBuild, parallel(watchLib, watchDiagnostics, watchLssl)));
task("watch-lssl").description = "Watch for changes and rebuild tsserverlibrary only";
task("watch-lssl").flags = {
    "   --built": "Compile using the built version of the compiler."
};

const testRunner = "./built/local/run.js";
const esbuildTests = esbuildTask("./src/testRunner/_namespaces/Harness.ts", testRunner);
const writeTestsCJSShim = () => writeCJSReexport("./built/local/testRunner/runner.js", testRunner);

const buildTests = () => {
    if (cmdLineOptions.bundle) return esbuildTests.build();
    writeTestsCJSShim();
    return buildProject("src/testRunner");
};
task("tests", series(preBuild, parallel(buildLssl, buildTests)));
task("tests").description = "Builds the test infrastructure";
task("tests").flags = {
    "   --built": "Compile using the built version of the compiler."
};

const cleanTests = () => cmdLineOptions.bundle ? esbuildTests.clean() : cleanProject("src/testRunner");
cleanTasks.push(cleanTests);
task("clean-tests", cleanTests);
task("clean-tests").description = "Cleans the outputs for the test infrastructure";

const watchTests = () => {
    if (cmdLineOptions.bundle) return esbuildTests.watch();
    writeTestsCJSShim();
    return watchProject("src/testRunner");
};

const runEslintRulesTests = () => runConsoleTests("scripts/eslint/tests", "mocha-fivemat-progress-reporter", /*runInParallel*/ false, /*watchMode*/ false);
task("run-eslint-rules-tests", runEslintRulesTests);
task("run-eslint-rules-tests").description = "Runs the eslint rule tests";

/** @type { (folder: string) => { (): Promise<any>; displayName?: string } } */
const eslint = (folder) => async () => {
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

    log(`Linting: ${args.join(" ")}`);
    return exec(process.execPath, args);
};

const lint = eslint(".");
lint.displayName = "lint";
task("lint", lint);
task("lint").description = "Runs eslint on the compiler and scripts sources.";


const esbuildCancellationToken = esbuildTask("./src/cancellationToken/cancellationToken.ts", "./built/local/cancellationToken.js");

const buildCancellationToken = () => {
    if (cmdLineOptions.bundle) return esbuildCancellationToken.build()
    writeCJSReexport("./built/local/cancellationToken/cancellationToken.js", "./built/local/cancellationToken.js");
    return buildProject("src/cancellationToken")
};
const cleanCancellationToken = () => cmdLineOptions.bundle ? esbuildCancellationToken.clean() : cleanProject("src/cancellationToken");
cleanTasks.push(cleanCancellationToken);

const esbuildTypingsInstaller = esbuildTask("./src/typingsInstaller/nodeTypingsInstaller.ts", "./built/local/typingsInstaller.js");

const buildTypingsInstaller = () => {
    if (cmdLineOptions.bundle) return esbuildTypingsInstaller.build();
    writeCJSReexport("./built/local/typingsInstaller/nodeTypingsInstaller.js", "./built/local/typingsInstaller.js");
    return buildProject("src/typingsInstaller");
};
const cleanTypingsInstaller = () => cmdLineOptions.bundle ? esbuildTypingsInstaller.clean() : cleanProject("src/typingsInstaller");
cleanTasks.push(cleanTypingsInstaller);

const esbuildWatchGuard = esbuildTask("./src/watchGuard/watchGuard.ts", "./built/local/watchGuard.js");

const buildWatchGuard = () => {
    if (cmdLineOptions.bundle) return esbuildWatchGuard.build();
    writeCJSReexport("./built/local/watchGuard/watchGuard.js", "./built/local/watchGuard.js");
    return buildProject("src/watchGuard");
};
const cleanWatchGuard = () => cmdLineOptions.bundle ? esbuildWatchGuard.clean() : cleanProject("src/watchGuard");
cleanTasks.push(cleanWatchGuard);

const generateTypesMap = () => src("src/server/typesMap.json")
    .pipe(newer("built/local/typesMap.json"))
    .pipe(transform(contents => (JSON.parse(contents), contents))) // validates typesMap.json is valid JSON
    .pipe(dest("built/local"));
task("generate-types-map", generateTypesMap);

const cleanTypesMap = () => del("built/local/typesMap.json");
cleanTasks.push(cleanTypesMap);

// Drop a copy of diagnosticMessages.generated.json into the built/local folder. This allows
// it to be synced to the Azure DevOps repo, so that it can get picked up by the build
// pipeline that generates the localization artifacts that are then fed into the translation process.
const builtLocalDiagnosticMessagesGeneratedJson = "built/local/diagnosticMessages.generated.json";
const copyBuiltLocalDiagnosticMessages = () => src(diagnosticMessagesGeneratedJson)
    .pipe(newer(builtLocalDiagnosticMessagesGeneratedJson))
    .pipe(dest("built/local"));

const cleanBuiltLocalDiagnosticMessages = () => del(builtLocalDiagnosticMessagesGeneratedJson);
cleanTasks.push(cleanBuiltLocalDiagnosticMessages);

const buildOtherOutputs = parallel(buildCancellationToken, buildTypingsInstaller, buildWatchGuard, generateTypesMap, copyBuiltLocalDiagnosticMessages);
task("other-outputs", series(preBuild, buildOtherOutputs));
task("other-outputs").description = "Builds miscelaneous scripts and documents distributed with the LKG";

task("local", series(preBuild, parallel(localize, buildTsc, buildServer, buildServices, buildLssl, buildOtherOutputs)));
task("local").description = "Builds the full compiler and services";
task("local").flags = {
    "   --built": "Compile using the built version of the compiler."
};

task("watch-local", series(preBuild, parallel(watchLib, watchDiagnostics, watchTsc, watchServices, watchServer, watchLssl)));
task("watch-local").description = "Watches for changes to projects in src/ (but does not execute tests).";
task("watch-local").flags = {
    "   --built": "Compile using the built version of the compiler."
};

const preTest = parallel(buildTsc, buildTests, buildServices, buildLssl);
preTest.displayName = "preTest";

const runTests = () => runConsoleTests(testRunner, "mocha-fivemat-progress-reporter", /*runInParallel*/ false, /*watchMode*/ false);
task("runtests", series(preBuild, preTest, runTests));
task("runtests").description = "Runs the tests using the built run.js file.";
task("runtests").flags = {
    "-t --tests=<regex>": "Pattern for tests to run.",
    "   --failed": "Runs tests listed in '.failed-tests'.",
    "-r --reporter=<reporter>": "The mocha reporter to use.",
    "-i --break": "Runs tests in inspector mode (NodeJS 8 and later)",
    "   --keepFailed": "Keep tests in .failed-tests even if they pass",
    "   --light": "Run tests in light mode (fewer verifications, but tests run faster)",
    "   --dirty": "Run tests without first cleaning test output directories",
    "   --stackTraceLimit=<limit>": "Sets the maximum number of stack frames to display. Use 'full' to show all frames.",
    "   --no-color": "Disables color",
    "   --timeout=<ms>": "Overrides the default test timeout.",
    "   --built": "Compile using the built version of the compiler.",
    "   --shards": "Total number of shards running tests (default: 1)",
    "   --shardId": "1-based ID of this shard (default: 1)",
};

const runTestsParallel = () => runConsoleTests(testRunner, "min", /*runInParallel*/ cmdLineOptions.workers > 1, /*watchMode*/ false);
task("runtests-parallel", series(preBuild, preTest, runTestsParallel));
task("runtests-parallel").description = "Runs all the tests in parallel using the built run.js file.";
task("runtests-parallel").flags = {
    "   --light": "Run tests in light mode (fewer verifications, but tests run faster).",
    "   --keepFailed": "Keep tests in .failed-tests even if they pass.",
    "   --dirty": "Run tests without first cleaning test output directories.",
    "   --stackTraceLimit=<limit>": "Sets the maximum number of stack frames to display. Use 'full' to show all frames.",
    "   --workers=<number>": "The number of parallel workers to use.",
    "   --timeout=<ms>": "Overrides the default test timeout.",
    "   --built": "Compile using the built version of the compiler.",
    "   --shards": "Total number of shards running tests (default: 1)",
    "   --shardId": "1-based ID of this shard (default: 1)",
};


task("test-browser-integration", () => exec(process.execPath, ["scripts/browserIntegrationTest.mjs"]));
task("test-browser-integration").description = "Runs scripts/browserIntegrationTest.mjs which tests that typescript.js loads in a browser";


task("diff", () => exec(getDiffTool(), [refBaseline, localBaseline], { ignoreExitCode: true, waitForExit: false }));
task("diff").description = "Diffs the compiler baselines using the diff tool specified by the 'DIFF' environment variable";

task("diff-rwc", () => exec(getDiffTool(), [refRwcBaseline, localRwcBaseline], { ignoreExitCode: true, waitForExit: false }));
task("diff-rwc").description = "Diffs the RWC baselines using the diff tool specified by the 'DIFF' environment variable";

/**
 * @param {string} localBaseline Path to the local copy of the baselines
 * @param {string} refBaseline Path to the reference copy of the baselines
 */
const baselineAccept = (localBaseline, refBaseline) => merge2(
    src([`${localBaseline}/**`, `!${localBaseline}/**/*.delete`], { base: localBaseline })
        .pipe(dest(refBaseline)),
    src([`${localBaseline}/**/*.delete`], { base: localBaseline, read: false })
        .pipe(rm())
        .pipe(rename({ extname: "" }))
        .pipe(rm(refBaseline)));
task("baseline-accept", () => baselineAccept(localBaseline, refBaseline));
task("baseline-accept").description = "Makes the most recent test results the new baseline, overwriting the old baseline";

task("baseline-accept-rwc", () => baselineAccept(localRwcBaseline, refRwcBaseline));
task("baseline-accept-rwc").description = "Makes the most recent rwc test results the new baseline, overwriting the old baseline";

// TODO(rbuckton): Determine if we still need this task. Depending on a relative
//                 path here seems like a bad idea.
const updateSublime = () => src(["built/local/tsserver.js", "built/local/tsserver.js.map"])
    .pipe(dest("../TypeScript-Sublime-Plugin/tsserver/"));
task("update-sublime", updateSublime);
task("update-sublime").description = "Updates the sublime plugin's tsserver";

// TODO(rbuckton): Should the path to DefinitelyTyped be configurable via an environment variable?
const importDefinitelyTypedTests = () => exec(process.execPath, ["scripts/importDefinitelyTypedTests.mjs", "./", "../DefinitelyTyped"]);
task("importDefinitelyTypedTests", importDefinitelyTypedTests);
task("importDefinitelyTypedTests").description = "Runs the importDefinitelyTypedTests script to copy DT's tests to the TS-internal RWC tests";

const cleanBuilt = () => del("built");

const produceLKG = async () => {
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
};

// TODO(jakebailey): dependencies on dts
task("LKG", series(lkgPreBuild, parallel(localize, buildTsc, buildServer, buildServices, buildLssl, buildOtherOutputs), produceLKG));
task("LKG").description = "Makes a new LKG out of the built js files";
task("LKG").flags = {
    "   --built": "Compile using the built version of the compiler.",
};
task("lkg", series("LKG"));

const generateSpec = () => exec("cscript", ["//nologo", "scripts/word2md.mjs", path.resolve("doc/TypeScript Language Specification - ARCHIVED.docx"), path.resolve("doc/spec-ARCHIVED.md")]);
task("generate-spec", generateSpec);
task("generate-spec").description = "Generates a Markdown version of the Language Specification";

task("clean", series(parallel(cleanTasks), cleanBuilt));
task("clean").description = "Cleans build outputs";

const configureNightly = () => exec(process.execPath, ["scripts/configurePrerelease.mjs", "dev", "package.json", "src/compiler/corePublic.ts"]);
task("configure-nightly", series(buildScripts, configureNightly));
task("configure-nightly").description = "Runs scripts/configurePrerelease.ts to prepare a build for nightly publishing";

const configureInsiders = () => exec(process.execPath, ["scripts/configurePrerelease.mjs", "insiders", "package.json", "src/compiler/corePublic.ts"]);
task("configure-insiders", configureInsiders);
task("configure-insiders").description = "Runs scripts/configurePrerelease.mjs to prepare a build for insiders publishing";

const configureExperimental = () => exec(process.execPath, ["scripts/configurePrerelease.mjs", "experimental", "package.json", "src/compiler/corePublic.ts"]);
task("configure-experimental", configureExperimental);
task("configure-experimental").description = "Runs scripts/configurePrerelease.mjs to prepare a build for experimental publishing";

const publishNightly = () => exec("npm", ["publish", "--tag", "next"]);
task("publish-nightly", series(task("clean"), task("LKG"), task("clean"), task("runtests-parallel"), publishNightly));
task("publish-nightly").description = "Runs `npm publish --tag next` to create a new nightly build on npm";

// TODO(rbuckton): The problem with watching in this way is that a change in compiler/ will result
// in cascading changes in other projects that may take differing amounts of times to complete. As
// a result, the watch may accidentally trigger early, so we have to set a significant delay. An
// alternative approach would be to leverage a builder API, or to have 'tsc -b' have an option to
// write some kind of trigger file that indicates build completion that we could listen for instead.
const watchRuntests = () => watch(["built/local/*.js", "tests/cases/**/*.ts", "tests/cases/**/tsconfig.json"], { delay: 5000 }, async () => {
    if (cmdLineOptions.tests || cmdLineOptions.failed) {
        await runConsoleTests(testRunner, "mocha-fivemat-progress-reporter", /*runInParallel*/ false, /*watchMode*/ true);
    }
    else {
        await runConsoleTests(testRunner, "min", /*runInParallel*/ true, /*watchMode*/ true);
    }
});
task("watch", series(preBuild, preTest, parallel(watchLib, watchDiagnostics, watchServices, watchLssl, watchTests, watchRuntests)));
task("watch").description = "Watches for changes and rebuilds and runs tests in parallel.";
task("watch").flags = {
    "-t --tests=<regex>": "Pattern for tests to run. Forces tests to be run in a single worker.",
    "   --failed": "Runs tests listed in '.failed-tests'. Forces tests to be run in a single worker.",
    "-r --reporter=<reporter>": "The mocha reporter to use.",
    "   --keepFailed": "Keep tests in .failed-tests even if they pass",
    "   --light": "Run tests in light mode (fewer verifications, but tests run faster)",
    "   --dirty": "Run tests without first cleaning test output directories",
    "   --stackTraceLimit=<limit>": "Sets the maximum number of stack frames to display. Use 'full' to show all frames.",
    "   --no-color": "Disables color",
    "   --timeout=<ms>": "Overrides the default test timeout.",
    "   --workers=<number>": "The number of parallel workers to use.",
    "   --built": "Compile using the built version of the compiler.",
};

task("default", series("local"));
task("default").description = "Runs 'local'";

task("help", () => exec("gulp", ["--tasks", "--depth", "1", "--sort-tasks"], { hidePrompt: true }));
task("help").description = "Prints the top-level tasks.";
