// @ts-check
const path = require("path");
const fs = require("fs");
const log = require("fancy-log");
const newer = require("gulp-newer");
const del = require("del");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const merge2 = require("merge2");
const { src, dest, task, parallel, series, watch } = require("gulp");
const { append, transform } = require("gulp-insert");
const { exec, readJson, needsUpdate, getDiffTool, getDirSize, rm } = require("./scripts/build/utils");
const { runConsoleTests, refBaseline, localBaseline, refRwcBaseline, localRwcBaseline } = require("./scripts/build/tests");
const { buildProject: realBuildProject, cleanProject, watchProject } = require("./scripts/build/projects");
const cmdLineOptions = require("./scripts/build/options");
const esbuild = require("esbuild");

const copyright = "CopyrightNotice.txt";
const cleanTasks = [];


// TODO(jakebailey): This is really gross. Waiting on: https://github.com/microsoft/TypeScript/issues/25613
let currentlyBuilding = 0;
let oldTsconfigBase;

/** @type {typeof realBuildProject} */
const buildProjectWithEmit = async (...args) => {
    const tsconfigBasePath = "./src/tsconfig-base.json";

    if (currentlyBuilding === 0) {
        oldTsconfigBase = fs.readFileSync(tsconfigBasePath, "utf-8");
        fs.writeFileSync(tsconfigBasePath, oldTsconfigBase.replace(`"emitDeclarationOnly": true`, `"emitDeclarationOnly": false`));;
    }

    currentlyBuilding++;

    await realBuildProject(...args);

    currentlyBuilding--;

    if (currentlyBuilding === 0) {
        fs.writeFileSync(tsconfigBasePath, oldTsconfigBase);
    }
};


const buildProject = cmdLineOptions.bundle ? realBuildProject : buildProjectWithEmit;


const buildScripts = () => buildProject("scripts", cmdLineOptions);
task("scripts", buildScripts);
task("scripts").description = "Builds files in the 'scripts' folder.";

const cleanScripts = () => cleanProject("scripts");
cleanTasks.push(cleanScripts);

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
        await exec(process.execPath, ["scripts/processDiagnosticMessages.js", diagnosticMessagesJson]);
    }
};
task("generate-diagnostics", series(buildScripts, generateDiagnostics));
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
const localizationTargets = ["cs", "de", "es", "fr", "it", "ja", "ko", "pl", "pt-br", "ru", "tr", "zh-cn", "zh-tw"]
    .map(f => f.toLowerCase())
    .map(f => `built/local/${f}/diagnosticMessages.generated.json`)
    .concat(generatedLCGFile);

const localize = async () => {
    if (needsUpdate(diagnosticMessagesGeneratedJson, generatedLCGFile)) {
        return exec(process.execPath, ["scripts/generateLocalizedDiagnosticMessages.js", "src/loc/lcl", "built/local", diagnosticMessagesGeneratedJson], { ignoreExitCode: true });
    }
};

const preSrc = parallel(generateLibs, series(buildScripts, generateDiagnostics, localize));
const buildSrc = () => buildProject("src");

// TODO(jakebailey): when should we run this? it's nice to have tests run quickly, but we also want to know if the code is broken.
// But, if we are bundling, we are running only d.ts emit, so maybe this is fast?
task("buildSrc", series(preSrc, buildSrc));

const apiExtractor = async () => {
    async function runApiExtractor(configPath) {
        await exec(process.execPath, [
            "node_modules/@microsoft/api-extractor/bin/api-extractor",
            "run",
            "--local",
            "--config",
            configPath,
        ]);
    }

    // TODO(jakebailey): prepend copyright notice, replace const enums with regular enums
    await runApiExtractor("./src/typescript/api-extractor.json");
    await runApiExtractor("./src/tsserverlibrary/api-extractor.json");
};

// TODO(jakebailey): Some tests depend on the extracted output.
task("api-extractor", series(preSrc, buildSrc, apiExtractor));

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
 */
function esbuildTask(entrypoint, outfile) {
    /** @type {esbuild.BuildOptions} */
    const options = {
        entryPoints: [entrypoint],
        banner: { js: getCopyrightHeader() },
        bundle: true,
        outfile,
        platform: "node",
        // TODO: also specify minimal browser targets
        target: "node10", // Node 10 is the oldest benchmarker.
        // format: "iife", // TODO(jakebailey): figure out how to conditionally use module.exports
        sourcemap: true,
        external: ["./node_modules/*"], // TODO(jakebailey): does the test runner import relatively from scripts?
        conditions: ["require"],
        supported: {
            // "const-and-let": false, // Unfortunately, no: https://github.com/evanw/esbuild/issues/297
            "object-rest-spread": false, // See: https://github.com/evanw/esbuild/releases/tag/v0.14.46
        },
        // legalComments: "none", // TODO(jakebailey): enable once we add copyright headers to our source files.
        // logLevel: "info",
    };

    // TODO: these need to have better function names, for gulp.
    return {
        build: () => esbuild.build(options),
        clean: () => del([outfile, `${outfile}.map`]),
        watch: () => esbuild.build({ ...options, watch: true }),
    };
}

// TODO(jakebailey): Add this function to the non-bundle paths which
// don't output to the correct location. (e.g., not dynamicImportCompat).

/**
 * Creates a function that writes a CJS module that reexports another CJS file via
 * `module.exports = require("...")`.
 *
 * @param {string} infile Relative path from the repo root to the file to be required.
 * @param {string} outfile Relative path from the repo root to the output file.
 * @returns {(done: () => void) => void} A function that can be passed to gulp.
 */
 function writeCJSReexport(infile, outfile) {
    return (done) => {
        const inRelativeToOut = infile = path.relative(path.dirname(outfile), infile);
        fs.writeFileSync(outfile, `module.exports = require("./${inRelativeToOut}")`);
        done();
    };
};

const esbuildDebugTools = esbuildTask("./src/debug/compilerDebug.ts", "./built/local/compilerDebug.js");

const buildDebugTools = () => cmdLineOptions.bundle ? esbuildDebugTools.build() : buildProject("src/debug", cmdLineOptions);
const cleanDebugTools = () => cmdLineOptions.bundle ? esbuildDebugTools.build() : cleanProject("src/debug");
cleanTasks.push(cleanDebugTools);

// Pre-build steps when targeting the LKG compiler
const lkgPreBuild = parallel(generateLibs, series(buildScripts, generateDiagnostics, buildDebugTools));


const esbuildTsc = esbuildTask("./src/tsc/tsc.ts", "./built/local/tsc.js");


const buildTsc = () => cmdLineOptions.bundle ? esbuildTsc.build() : buildProject("src/tsc", cmdLineOptions);
task("tsc", series(lkgPreBuild, buildTsc));
task("tsc").description = "Builds the command-line compiler";

const cleanTsc = () => cmdLineOptions.bundle ? esbuildTsc.clean() : cleanProject("src/tsc");
cleanTasks.push(cleanTsc);
task("clean-tsc", cleanTsc);
task("clean-tsc").description = "Cleans outputs for the command-line compiler";

const watchTsc = () => cmdLineOptions.bundle ? esbuildTsc.watch() : watchProject("src/tsc");
task("watch-tsc", series(lkgPreBuild, parallel(watchLib, watchDiagnostics, watchTsc)));
task("watch-tsc").description = "Watch for changes and rebuild the command-line compiler only.";

// Pre-build steps when targeting the built/local compiler.
const localPreBuild = parallel(generateLibs, series(buildScripts, generateDiagnostics, buildDebugTools, buildTsc));

// Pre-build steps to use based on supplied options.
const preBuild = cmdLineOptions.lkg ? lkgPreBuild : localPreBuild;

const esbuildServices = esbuildTask("./src/typescript/typescript.ts", "./built/local/typescript.js");

const buildServices = () => cmdLineOptions.bundle ? esbuildServices.build() : buildProject("src/typescript", cmdLineOptions);

task("services", series(preBuild, buildServices));
task("services").description = "Builds the language service";
task("services").flags = {
    "   --built": "Compile using the built version of the compiler."
};

const cleanServices = () => cmdLineOptions.bundle ? esbuildServices.clean() : cleanProject("src/typescript");

cleanTasks.push(cleanServices);
task("clean-services", cleanServices);
task("clean-services").description = "Cleans outputs for the language service";

// TODO(jakebailey): this is probably wrong.
const watchServices = () => cmdLineOptions.bundle ? esbuildServices.watch() : watchProject("src/typescript");
task("watch-services", series(preBuild, parallel(watchLib, watchDiagnostics, watchServices)));
task("watch-services").description = "Watches for changes and rebuild language service only";
task("watch-services").flags = {
    "   --built": "Compile using the built version of the compiler."
};

const buildDynamicImportCompat = () => buildProject("src/dynamicImportCompat", cmdLineOptions);
task("dynamicImportCompat", buildDynamicImportCompat);

const cleanDynamicImportCompat = () => cleanProject("src/dynamicImportCompat");
const watchDynamicImportCompat = () => watchProject("src/dynamicImportCompat", cmdLineOptions);


const esbuildServer = esbuildTask("./src/tsserver/server.ts", "./built/local/tsserver.js");

const buildServerMain = () => cmdLineOptions.bundle ? esbuildServer.build() : buildProject("src/tsserver", cmdLineOptions);
const buildServer = series(buildDynamicImportCompat, buildServerMain);
buildServer.displayName = "buildServer";
task("tsserver", series(preBuild, buildServer));
task("tsserver").description = "Builds the language server";
task("tsserver").flags = {
    "   --built": "Compile using the built version of the compiler."
};

const cleanServerMain = () => cmdLineOptions.bundle ? esbuildServer.clean() : cleanProject("src/tsserver");
const cleanServer = series(cleanDynamicImportCompat, cleanServerMain);
cleanServer.displayName = "cleanServer";
cleanTasks.push(cleanServer);
task("clean-tsserver", cleanServer);
task("clean-tsserver").description = "Cleans outputs for the language server";

const watchServer = () => cmdLineOptions.bundle ? esbuildServer.watch() : watchProject("src/tsserver", cmdLineOptions);
task("watch-tsserver", series(preBuild, parallel(watchLib, watchDiagnostics, watchDynamicImportCompat, watchServer)));
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

const esbuildLssl = esbuildTask("./src/tsserverlibrary/tsserverlibrary.ts", "./built/local/tsserverlibrary.js");

const buildLssl = () => cmdLineOptions.bundle ? esbuildLssl.build() : buildProject("src/tsserverlibrary", cmdLineOptions);
task("lssl", series(preBuild, buildLssl));
task("lssl").description = "Builds language service server library";
task("lssl").flags = {
    "   --built": "Compile using the built version of the compiler."
};

const cleanLssl = () => cmdLineOptions.bundle ? esbuildLssl.clean() : cleanProject("src/tsserverlibrary");
cleanTasks.push(cleanLssl);
task("clean-lssl", cleanLssl);
task("clean-lssl").description = "Clean outputs for the language service server library";

// TODO(jakebailey): this is probably wrong.
const watchLssl = () => cmdLineOptions.bundle ? esbuildLssl.watch() : watchProject("src/tsserverlibrary");

task("watch-lssl", series(preBuild, parallel(watchLib, watchDiagnostics, watchLssl)));
task("watch-lssl").description = "Watch for changes and rebuild tsserverlibrary only";
task("watch-lssl").flags = {
    "   --built": "Compile using the built version of the compiler."
};

const testRunner = cmdLineOptions.bundle ? "./built/local/run.js" : "./built/local/testRunner/runner.js";
const esbuildTests = esbuildTask("./src/testRunner/_namespaces/Harness.ts", testRunner);

const buildTests = () => cmdLineOptions.bundle ? esbuildTests.build() : buildProject("src/testRunner", cmdLineOptions);
task("tests", series(preBuild, parallel(buildLssl, buildTests)));
task("tests").description = "Builds the test infrastructure";
task("tests").flags = {
    "   --built": "Compile using the built version of the compiler."
};

const cleanTests = () => cmdLineOptions.bundle ? esbuildTests.clean() : cleanProject("src/testRunner");
cleanTasks.push(cleanTests);
task("clean-tests", cleanTests);
task("clean-tests").description = "Cleans the outputs for the test infrastructure";

const watchTests = () => cmdLineOptions.bundle ? esbuildTests.watch() : watchProject("src/testRunner", cmdLineOptions);

const buildEslintRules = () => buildProject("scripts/eslint", cmdLineOptions);
task("build-eslint-rules", buildEslintRules);
task("build-eslint-rules").description = "Compiles eslint rules to js";

const cleanEslintRules = () => cleanProject("scripts/eslint");
cleanTasks.push(cleanEslintRules);
task("clean-eslint-rules", cleanEslintRules);
task("clean-eslint-rules").description = "Cleans the outputs for the eslint rules";

const runEslintRulesTests = () => runConsoleTests("scripts/eslint/built/tests", "mocha-fivemat-progress-reporter", /*runInParallel*/ false, /*watchMode*/ false);
task("run-eslint-rules-tests", series(buildEslintRules, runEslintRulesTests));
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

const buildCancellationToken = () => cmdLineOptions.bundle ? esbuildCancellationToken.build() : buildProject("src/cancellationToken", cmdLineOptions);
const cleanCancellationToken = () => cmdLineOptions.bundle ? esbuildCancellationToken.clean() : cleanProject("src/cancellationToken");
cleanTasks.push(cleanCancellationToken);

const esbuildTypingsInstaller = esbuildTask("./src/typingsInstaller/nodeTypingsInstaller.ts", "./built/local/typingsInstaller.js");

const buildTypingsInstaller = () => cmdLineOptions.bundle ? esbuildTypingsInstaller.build() : buildProject("src/typingsInstaller", cmdLineOptions);
const cleanTypingsInstaller = () => cmdLineOptions.bundle ? esbuildTypingsInstaller.clean() : cleanProject("src/typingsInstaller");
cleanTasks.push(cleanTypingsInstaller);

const esbuildWatchGuard = esbuildTask("./src/typingsInstaller/nodeTypingsInstaller.ts", "./built/local/typingsInstaller.js");

const buildWatchGuard = () => cmdLineOptions.bundle ? esbuildWatchGuard.build() : buildProject("src/watchGuard", cmdLineOptions);
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


task("test-browser-integration", () => exec(process.execPath, ["scripts/browserIntegrationTest.js"]));
task("test-browser-integration").description = "Runs scripts/browserIntegrationTest.ts which tests that typescript.js loads in a browser";


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

// TODO(jakebailey): figure out what tsc-instrumented and such are for and what do to with them.

const buildLoggedIO = () => buildProject("src/loggedIO/tsconfig-tsc-instrumented.json", cmdLineOptions);
const cleanLoggedIO = () => del("built/local/loggedIO.js");
cleanTasks.push(cleanLoggedIO);

const buildInstrumenter = () => buildProject("src/instrumenter", cmdLineOptions);
const cleanInstrumenter = () => cleanProject("src/instrumenter");
cleanTasks.push(cleanInstrumenter);

const tscInstrumented = () => exec(process.execPath, ["built/local/instrumenter.js", "record", cmdLineOptions.tests || "iocapture", "built/local/tsc.js"]);
task("tsc-instrumented", series(lkgPreBuild, parallel(localize, buildTsc, buildServer, buildServices, buildLssl, buildLoggedIO, buildInstrumenter), tscInstrumented));
task("tsc-instrumented").description = "Builds an instrumented tsc.js";
task("tsc-instrumented").flags = {
    "-t --tests=<testname>": "The test to run."
};

// TODO(rbuckton): Determine if we still need this task. Depending on a relative
//                 path here seems like a bad idea.
const updateSublime = () => src(["built/local/tsserver.js", "built/local/tsserver.js.map"])
    .pipe(dest("../TypeScript-Sublime-Plugin/tsserver/"));
task("update-sublime", updateSublime);
task("update-sublime").description = "Updates the sublime plugin's tsserver";

const buildImportDefinitelyTypedTests = () => buildProject("scripts/importDefinitelyTypedTests", cmdLineOptions);
const cleanImportDefinitelyTypedTests = () => cleanProject("scripts/importDefinitelyTypedTests");
cleanTasks.push(cleanImportDefinitelyTypedTests);

// TODO(rbuckton): Should the path to DefinitelyTyped be configurable via an environment variable?
const importDefinitelyTypedTests = () => exec(process.execPath, ["scripts/importDefinitelyTypedTests/importDefinitelyTypedTests.js", "./", "../DefinitelyTyped"]);
task("importDefinitelyTypedTests", series(buildImportDefinitelyTypedTests, importDefinitelyTypedTests));
task("importDefinitelyTypedTests").description = "Runs the importDefinitelyTypedTests script to copy DT's tests to the TS-internal RWC tests";

// TODO(jakebailey): There isn't a release build anymore; figure out what to do here.
// Probably just use tsc.js.

const buildReleaseTsc = () => buildProject("src/tsc/tsconfig.release.json");
const cleanReleaseTsc = () => cleanProject("src/tsc/tsconfig.release.json");
cleanTasks.push(cleanReleaseTsc);

const cleanBuilt = () => del("built");

const produceLKG = async () => {
    const expectedFiles = [
        "built/local/tsc.release.js",
        "built/local/typescriptServices.js",
        "built/local/typescriptServices.d.ts",
        "built/local/tsserver.js",
        "built/local/dynamicImportCompat.js",
        "built/local/typescript.js",
        "built/local/typescript.d.ts",
        "built/local/tsserverlibrary.js",
        "built/local/tsserverlibrary.d.ts",
        "built/local/typingsInstaller.js",
        "built/local/cancellationToken.js"
    ].concat(libs.map(lib => lib.target));
    const missingFiles = expectedFiles
        .concat(localizationTargets)
        .filter(f => !fs.existsSync(f));
    if (missingFiles.length > 0) {
        throw new Error("Cannot replace the LKG unless all built targets are present in directory 'built/local/'. The following files are missing:\n" + missingFiles.join("\n"));
    }
    const sizeBefore = getDirSize("lib");
    await exec(process.execPath, ["scripts/produceLKG.js"]);
    const sizeAfter = getDirSize("lib");
    if (sizeAfter > (sizeBefore * 1.10)) {
        throw new Error("The lib folder increased by 10% or more. This likely indicates a bug.");
    }
};

task("LKG", series(lkgPreBuild, parallel(localize, buildTsc, buildServer, buildServices, buildLssl, buildOtherOutputs, buildReleaseTsc), produceLKG));
task("LKG").description = "Makes a new LKG out of the built js files";
task("LKG").flags = {
    "   --built": "Compile using the built version of the compiler.",
};
task("lkg", series("LKG"));

const generateSpec = () => exec("cscript", ["//nologo", "scripts/word2md.js", path.resolve("doc/TypeScript Language Specification - ARCHIVED.docx"), path.resolve("doc/spec-ARCHIVED.md")]);
task("generate-spec", series(buildScripts, generateSpec));
task("generate-spec").description = "Generates a Markdown version of the Language Specification";

task("clean", series(parallel(cleanTasks), cleanBuilt));
task("clean").description = "Cleans build outputs";

// TODO(jakebailey): Figure out what needs to change below.

const configureNightly = () => exec(process.execPath, ["scripts/configurePrerelease.js", "dev", "package.json", "src/compiler/corePublic.ts"]);
task("configure-nightly", series(buildScripts, configureNightly));
task("configure-nightly").description = "Runs scripts/configurePrerelease.ts to prepare a build for nightly publishing";

const configureInsiders = () => exec(process.execPath, ["scripts/configurePrerelease.js", "insiders", "package.json", "src/compiler/corePublic.ts"]);
task("configure-insiders", series(buildScripts, configureInsiders));
task("configure-insiders").description = "Runs scripts/configurePrerelease.ts to prepare a build for insiders publishing";

const configureExperimental = () => exec(process.execPath, ["scripts/configurePrerelease.js", "experimental", "package.json", "src/compiler/corePublic.ts"]);
task("configure-experimental", series(buildScripts, configureExperimental));
task("configure-experimental").description = "Runs scripts/configurePrerelease.ts to prepare a build for experimental publishing";

const createLanguageServicesBuild = () => exec(process.execPath, ["scripts/createLanguageServicesBuild.js"]);
task("create-language-services-build", series(buildScripts, createLanguageServicesBuild));
task("create-language-services-build").description = "Runs scripts/createLanguageServicesBuild.ts to prepare a build which only has the require('typescript') JS.";

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
