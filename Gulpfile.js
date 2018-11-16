/// <reference path="scripts/types/ambient.d.ts" />
// @ts-check
const path = require("path");
const log = require("fancy-log"); // was `require("gulp-util").log (see https://github.com/gulpjs/gulp-util)
const fs = require("fs");
const child_process = require("child_process");
const runSequence = require("run-sequence");
const newer = require("gulp-newer");
const insert = require("gulp-insert");
const { append } = require("gulp-insert");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const fold = require("travis-fold");
const rename = require("gulp-rename");
const mkdirp = require("./scripts/build/mkdirp");
const gulp = require("./scripts/build/gulp");
const getDirSize = require("./scripts/build/getDirSize");
const project = require("./scripts/build/project");
const replace = require("./scripts/build/replace");
const convertConstEnums = require("./scripts/build/convertConstEnum");
const needsUpdate = require("./scripts/build/needsUpdate");
const getDiffTool = require("./scripts/build/getDiffTool");
const baselineAccept = require("./scripts/build/baselineAccept");
const cmdLineOptions = require("./scripts/build/options");
const exec = require("./scripts/build/exec");
const browserify = require("./scripts/build/browserify");
const prepend = require("./scripts/build/prepend");
const { removeSourceMaps } = require("./scripts/build/sourcemaps");
const { CancellationTokenSource, CancelError, delay, Semaphore } = require("prex");
const { libraryTargets, generateLibs } = require("./scripts/build/lib");
const { runConsoleTests, cleanTestDirs, writeTestConfigFile, refBaseline, localBaseline, refRwcBaseline, localRwcBaseline } = require("./scripts/build/tests");

Error.stackTraceLimit = 1000;

// Constants
const host = cmdLineOptions.host;
const copyright = "CopyrightNotice.txt";

project.addTypeScript("lkg", "./lib/typescript.js");
project.addTypeScript("built", "./built/local/typescriptServices.js");
project.addTypeScript("default", "lkg"); // Compile using the LKG compiler by default

const scriptsProject = "scripts/tsconfig.json";
const configurePrereleaseJs = "scripts/configurePrerelease.js";
const processDiagnosticMessagesJs = "scripts/processDiagnosticMessages.js";
const generateLocalizedDiagnosticMessagesJs = "scripts/generateLocalizedDiagnosticMessages.js";
const buildProtocolJs = "scripts/buildProtocol.js";
const produceLKGJs = "scripts/produceLKG.js";
const word2mdJs = "scripts/word2md.js";
const scriptsTaskAliases = [configurePrereleaseJs, processDiagnosticMessagesJs, generateLocalizedDiagnosticMessagesJs, produceLKGJs, buildProtocolJs, word2mdJs];
gulp.task("scripts", /*help*/ false, () => project.compile(scriptsProject), { aliases: scriptsTaskAliases });
gulp.task("clean:scripts", /*help*/ false, () => project.clean(scriptsProject), { aliases: scriptsTaskAliases.map(alias => `clean:${alias}`)});

// Nightly management tasks
gulp.task(
    "configure-nightly",
    "Runs scripts/configurePrerelease.ts to prepare a build for nightly publishing",
    [configurePrereleaseJs],
    () => exec(host, [configurePrereleaseJs, "dev", "package.json", "src/compiler/core.ts"]));

gulp.task(
    "publish-nightly",
    "Runs `npm publish --tag next` to create a new nightly build on npm",
    ["LKG"],
    () => runSequence("clean", "runtests-parallel",
        () => exec("npm", ["publish", "--tag", "next"])));

const importDefinitelyTypedTestsProject = "scripts/importDefinitelyTypedTests/tsconfig.json";
const importDefinitelyTypedTestsJs = "scripts/importDefinitelyTypedTests/importDefinitelyTypedTests.js";
gulp.task(importDefinitelyTypedTestsJs, /*help*/ false, () => project.compile(importDefinitelyTypedTestsProject));
gulp.task(`clean:${importDefinitelyTypedTestsJs}`, /*help*/ false, () => project.clean(importDefinitelyTypedTestsProject));

gulp.task(
    "importDefinitelyTypedTests",
    "Runs scripts/importDefinitelyTypedTests/importDefinitelyTypedTests.ts to copy DT's tests to the TS-internal RWC tests",
    [importDefinitelyTypedTestsJs],
    () => exec(host, [importDefinitelyTypedTestsJs, "./", "../DefinitelyTyped"]));

gulp.task(
    "lib",
    "Builds the library targets",
    () => generateLibs([copyright]));

// The generated diagnostics map; built for the compiler and for the "generate-diagnostics" task
const diagnosticInformationMapTs = "src/compiler/diagnosticInformationMap.generated.ts";
const diagnosticMessagesJson = "src/compiler/diagnosticMessages.json";
const diagnosticMessagesGeneratedJson = "src/compiler/diagnosticMessages.generated.json";
gulp.task(diagnosticInformationMapTs, /*help*/ false, [processDiagnosticMessagesJs], () => {
    if (needsUpdate(diagnosticMessagesJson, [diagnosticMessagesGeneratedJson, diagnosticInformationMapTs])) {
        return exec(host, [processDiagnosticMessagesJs, diagnosticMessagesJson]);
    }
});
gulp.task(`clean:${diagnosticInformationMapTs}`, /*help*/ false, () => del([diagnosticInformationMapTs, diagnosticMessagesGeneratedJson]));

const builtGeneratedDiagnosticMessagesJson = "built/local/diagnosticMessages.generated.json";
gulp.task(builtGeneratedDiagnosticMessagesJson, /*help*/ false, [diagnosticInformationMapTs], () =>
    gulp.src([diagnosticMessagesGeneratedJson], { base: "src/compiler" })
        .pipe(newer(builtGeneratedDiagnosticMessagesJson))
        .pipe(gulp.dest("built/local")));

gulp.task(
    "generate-diagnostics",
    "Generates a diagnostic file in TypeScript based on an input JSON file",
    [diagnosticInformationMapTs]);

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
const localizationTargets = ["cs", "de", "es", "fr", "it", "ja", "ko", "pl", "pt-BR", "ru", "tr", "zh-CN", "zh-TW"]
    .map(f => `built/local/${f}/diagnosticMessages.generated.json`)
    .concat(generatedLCGFile);

gulp.task(generatedLCGFile, /*help*/ false, [generateLocalizedDiagnosticMessagesJs, diagnosticInformationMapTs], (done) => {
    if (needsUpdate(diagnosticMessagesGeneratedJson, generatedLCGFile)) {
        return exec(host, [generateLocalizedDiagnosticMessagesJs, "src/loc/lcl", "built/local", diagnosticMessagesGeneratedJson], { ignoreExitCode: true });
    }
});

gulp.task("localize", /*help*/ false, [generatedLCGFile]);

const servicesProject = "src/services/tsconfig.json";
const typescriptServicesProject = "built/local/typescriptServices.tsconfig.json";
gulp.task(typescriptServicesProject, /*help*/ false, () => {
    // NOTE: flatten services so that we can properly strip @internal
    project.flatten(servicesProject, typescriptServicesProject, {
        compilerOptions: {
            "removeComments": false,
            "stripInternal": true,
            "declarationMap": false,
            "outFile": "typescriptServices.out.js" // must align with same task in jakefile. We fix this name below.
        }
    });
});

const typescriptServicesJs = "built/local/typescriptServices.js";
const typescriptServicesDts = "built/local/typescriptServices.d.ts";
gulp.task(typescriptServicesJs, /*help*/ false, ["lib", "generate-diagnostics", typescriptServicesProject], () =>
    project.compile(typescriptServicesProject, {
        js: files => files
            .pipe(prepend.file(copyright))
            .pipe(rename("typescriptServices.js")),
        dts: files => files
            .pipe(removeSourceMaps())
            .pipe(prepend.file(copyright))
            .pipe(convertConstEnums())
            .pipe(rename("typescriptServices.d.ts"))
    }),
    { aliases: [typescriptServicesDts] });

const typescriptJs = "built/local/typescript.js";
gulp.task(typescriptJs, /*help*/ false, [typescriptServicesJs], () =>
    gulp.src([typescriptServicesJs], { base: "built/local" })
        .pipe(newer(typescriptJs))
        .pipe(rename("typescript.js"))
        .pipe(gulp.dest("built/local")))

const typescriptDts = "built/local/typescript.d.ts";
gulp.task(typescriptDts, /*help*/ false, [typescriptServicesDts], () =>
    gulp.src([typescriptServicesDts], { base: "built/local" })
        .pipe(newer(typescriptDts))
        .pipe(append("\nexport = ts;"))
        .pipe(rename("typescript.d.ts"))
        .pipe(gulp.dest("built/local")));

const typescriptStandaloneDts = "built/local/typescript_standalone.d.ts";
gulp.task(typescriptStandaloneDts, /*help*/ false, [typescriptServicesDts], () =>
    gulp.src([typescriptServicesDts], { base: "built/local" })
        .pipe(newer(typescriptStandaloneDts))
        .pipe(replace(/declare (namespace|module) ts/g, 'declare module "typescript"'))
        .pipe(rename("typescript_standalone.d.ts"))
        .pipe(gulp.dest("built/local")));

// build all 'typescriptServices'-related outputs
gulp.task("services", /*help*/ false, [typescriptServicesJs, typescriptServicesDts, typescriptJs, typescriptDts, typescriptStandaloneDts]);

const useCompiler = cmdLineOptions.lkg ? "lkg" : "built";
const useCompilerDeps = cmdLineOptions.lkg ? ["lib", "generate-diagnostics"] : [typescriptServicesJs];

const tscProject = "src/tsc/tsconfig.json";
const tscJs = "built/local/tsc.js";
gulp.task(tscJs, /*help*/ false, useCompilerDeps, () =>
    project.compile(tscProject, {
        typescript: useCompiler,
        js: files => files.pipe(prepend.file(copyright))
    }));

const tscReleaseProject = "src/tsc/tsconfig.release.json";
const tscReleaseJs = "built/local/tsc.release.js";
gulp.task(tscReleaseJs, /*help*/ false, () =>
    project.compile(tscReleaseProject, {
        js: files => files.pipe(prepend.file(copyright))
    }));

const cancellationTokenProject = "src/cancellationToken/tsconfig.json";
const cancellationTokenJs = "built/local/cancellationToken.js";
gulp.task(cancellationTokenJs, /*help*/ false, useCompilerDeps, () => project.compile(cancellationTokenProject, { typescript: useCompiler }));

const typingsInstallerProject = "src/typingsInstaller/tsconfig.json";
const typingsInstallerJs = "built/local/typingsInstaller.js";
gulp.task(typingsInstallerJs, /*help*/ false, useCompilerDeps, () => project.compile(typingsInstallerProject, { typescript: useCompiler }));

const tsserverProject = "src/tsserver/tsconfig.json";
const tsserverJs = "built/local/tsserver.js";
gulp.task(tsserverJs, /*help*/ false, useCompilerDeps, () => project.compile(tsserverProject, { typescript: useCompiler }));

const watchGuardProject = "src/watchGuard/tsconfig.json";
const watchGuardJs = "built/local/watchGuard.js";
gulp.task(watchGuardJs, /*help*/ false, useCompilerDeps, () => project.compile(watchGuardProject, { typescript: useCompiler }));

const typesMapJson = "built/local/typesMap.json";
gulp.task(typesMapJson, /*help*/ false, [], () =>
    gulp.src("src/server/typesMap.json")
        .pipe(newer(typesMapJson))
        .pipe(insert.transform(contents => (JSON.parse(contents), contents)))
        .pipe(gulp.dest("built/local")));

const tsserverlibraryProject = "built/local/tsserverlibrary.tsconfig.json";
gulp.task(tsserverlibraryProject, /*help*/ false, () => {
    // NOTE: flatten tsserverlibrary so that we can properly strip @internal
    project.flatten("src/tsserver/tsconfig.json", tsserverlibraryProject, {
        exclude: ["src/tsserver/server.ts"],
        compilerOptions: {
            "removeComments": false,
            "stripInternal": true,
            "declarationMap": false,
            "outFile": "tsserverlibrary.out.js" // must align with same task in jakefile. We fix this name below.
        }
    });
});

const tsserverlibraryJs = "built/local/tsserverlibrary.js";
const tsserverlibraryDts = "built/local/tsserverlibrary.d.ts";
gulp.task(tsserverlibraryJs, /*help*/ false, useCompilerDeps.concat([tsserverlibraryProject]), () =>
    project.compile(tsserverlibraryProject, {
        js: files => files
            .pipe(prepend.file(copyright))
            .pipe(rename("tsserverlibrary.js")),
        dts: files => files
            .pipe(removeSourceMaps())
            .pipe(prepend.file(copyright))
            .pipe(convertConstEnums())
            .pipe(append("\nexport = ts;\nexport as namespace ts;"))
            .pipe(rename("tsserverlibrary.d.ts")),
        typescript: useCompiler
    }), { aliases: [tsserverlibraryDts] });

gulp.task(
    "lssl",
    "Builds language service server library",
    [tsserverlibraryDts]);

gulp.task(
    "local",
    "Builds the full compiler and services",
    [tscJs, "services", tsserverJs, builtGeneratedDiagnosticMessagesJson, tsserverlibraryDts, "localize"]);

gulp.task(
    "tsc",
    "Builds only the compiler",
    [tscJs]);

// Generate Markdown spec
const specMd = "doc/spec.md";
gulp.task(specMd, /*help*/ false, [word2mdJs], () =>
    exec("cscript", ["//nologo", word2mdJs, path.resolve(specMd), path.resolve("doc/TypeScript Language Specification.docx")]));

gulp.task(
    "generate-spec",
    "Generates a Markdown version of the Language Specification",
    [specMd]);

gulp.task("produce-LKG", /*help*/ false, ["scripts", "local", cancellationTokenJs, typingsInstallerJs, watchGuardJs, tscReleaseJs], () => {
    const expectedFiles = [
        tscReleaseJs,
        typescriptServicesJs,
        tsserverJs,
        typescriptJs,
        typescriptDts,
        typescriptServicesDts,
        tsserverlibraryDts,
        tsserverlibraryDts,
        typingsInstallerJs,
        cancellationTokenJs
    ].concat(libraryTargets);
    const missingFiles = expectedFiles
        .concat(localizationTargets)
        .filter(f => !fs.existsSync(f));
    if (missingFiles.length > 0) {
        throw new Error("Cannot replace the LKG unless all built targets are present in directory 'built/local/'. The following files are missing:\n" + missingFiles.join("\n"));
    }
    const sizeBefore = getDirSize("lib");
    return exec(host, [produceLKGJs]).then(() => {
        const sizeAfter = getDirSize("lib");
        if (sizeAfter > (sizeBefore * 1.10)) {
            throw new Error("The lib folder increased by 10% or more. This likely indicates a bug.");
        }
    });
});

gulp.task(
    "LKG",
    "Makes a new LKG out of the built js files",
    () => runSequence("clean-built", "produce-LKG"));

// Task to build the tests infrastructure using the built compiler
const testRunnerProject = "src/testRunner/tsconfig.json";
const runJs = "built/local/run.js";
gulp.task(runJs, /*help*/ false, useCompilerDeps, () => project.compile(testRunnerProject, { typescript: useCompiler }));

gulp.task(
    "tests",
    "Builds the test infrastructure using the built compiler",
    [runJs, tsserverlibraryDts]);

gulp.task(
    "runtests-parallel",
    "Runs all the tests in parallel using the built run.js file. Optional arguments are: --t[ests]=category1|category2|... --d[ebug]=true.",
    ["build-rules", "tests", "services", tsserverlibraryDts],
    () => runConsoleTests(runJs, "min", /*runInParallel*/ true, /*watchMode*/ false));

gulp.task(
    "runtests",
    "Runs the tests using the built run.js file. Optional arguments are: --t[ests]=regex --r[eporter]=[list|spec|json|<more>] --d[ebug]=true --color[s]=false --lint=true.",
    ["build-rules", "tests", "services", tsserverlibraryDts],
    () => runConsoleTests(runJs, "mocha-fivemat-progress-reporter", /*runInParallel*/ false, /*watchMode*/ false));

const webTestServerProject = "tests/webTestServer.tsconfig.json";
const webTestServerJs = "tests/webTestServer.js";
gulp.task(webTestServerJs, /*help*/ false, useCompilerDeps, () => project.compile(webTestServerProject, { typescript: useCompiler }));
gulp.task(`clean:${webTestServerJs}`, /*help*/ false, () => project.clean(webTestServerProject));

const bundlePath = path.resolve("built/local/bundle.js");

gulp.task(
    "browserify",
    "Runs browserify on run.js to produce a file suitable for running tests in the browser",
    [runJs],
    () => gulp.src([runJs], { base: "built/local" })
        .pipe(newer(bundlePath))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(browserify())
        .pipe(rename("bundle.js"))
        .pipe(sourcemaps.write(".", /**@type {*}*/({ includeContent: false, destPath: "built/local" })))
        .pipe(gulp.dest("built/local")));

gulp.task(
    "runtests-browser",
    "Runs the tests using the built run.js file like 'gulp runtests'. Syntax is gulp runtests-browser. Additional optional parameters --tests=[regex], --browser=[chrome|IE]",
    ["browserify", webTestServerJs],
    () => cleanTestDirs().then(() => {
        const tests = cmdLineOptions.tests;
        const runners = cmdLineOptions.runners;
        const light = cmdLineOptions.light;
        const testConfigFile = "test.config";
        if (fs.existsSync(testConfigFile)) {
            fs.unlinkSync(testConfigFile);
        }
        if (tests || runners || light) {
            writeTestConfigFile(tests, runners, light);
        }
        const args = [webTestServerJs];
        if (cmdLineOptions.browser) {
            args.push(cmdLineOptions.browser);
        }
        if (tests) {
            args.push(JSON.stringify(tests));
        }
        return exec("node", args);
    }));

gulp.task(
    "generate-code-coverage",
    "Generates code coverage data via istanbul",
    ["tests"],
    () => exec("istanbul", ["cover", "node_modules/mocha/bin/_mocha", "--", "-R", "min", "-t", "" + cmdLineOptions.testTimeout, runJs]));


gulp.task(
    "diff",
    "Diffs the compiler baselines using the diff tool specified by the 'DIFF' environment variable",
    () => exec(getDiffTool(), [refBaseline, localBaseline], { ignoreExitCode: true }));

gulp.task(
    "diff-rwc",
    "Diffs the RWC baselines using the diff tool specified by the 'DIFF' environment variable",
    () => exec(getDiffTool(), [refRwcBaseline, localRwcBaseline], { ignoreExitCode: true }));

gulp.task(
    "baseline-accept",
    "Makes the most recent test results the new baseline, overwriting the old baseline",
    () => baselineAccept());

gulp.task(
    "baseline-accept-rwc",
    "Makes the most recent rwc test results the new baseline, overwriting the old baseline",
    () => baselineAccept("rwc"));

gulp.task(
    "baseline-accept-test262",
    "Makes the most recent test262 test results the new baseline, overwriting the old baseline",
    () => baselineAccept("test262"));

// Webhost
const webtscProject = "tests/webhost/webtsc.tsconfig.json";
const webtscJs = "tests/webhost/webtsc.js";
gulp.task(webtscJs, /*help*/ false, useCompilerDeps, () => project.compile(webtscProject, { typescript: useCompiler }));
gulp.task(`clean:${webtscJs}`, /*help*/ false, () => project.clean(webtscProject));

gulp.task("webhost", "Builds the tsc web host", [webtscJs], () =>
    gulp.src("built/local/lib.d.ts")
        .pipe(gulp.dest("tests/webhost/")));

// Perf compiler
const perftscProject = "tests/perftsc.tsconfig.json";
const perftscJs = "built/local/perftsc.js";
gulp.task(perftscJs, /*help*/ false, useCompilerDeps, () => project.compile(perftscProject, { typescript: useCompiler }));
gulp.task(`clean:${perftscJs}`, /*help*/ false, () => project.clean(perftscProject));

gulp.task(
    "perftsc",
    "Builds augmented version of the compiler for perf tests",
    [perftscJs]);

// Instrumented compiler
const loggedIOTs = "src/harness/loggedIO.ts";
const loggedIOJs = "built/local/loggedIO.js";
gulp.task(loggedIOJs, /*help*/ false, [], (done) => {
    return mkdirp("built/local/temp")
        .then(() => exec(host, ["lib/tsc.js", "--types", "--target es5", "--lib es5", "--outdir", "built/local/temp", loggedIOTs]))
        .then(() => { fs.renameSync(path.join("built/local/temp", "/harness/loggedIO.js"), loggedIOJs); })
        .then(() => del("built/local/temp"));
});

const instrumenterProject = "src/instrumenter/tsconfig.json";
const instrumenterJs = "built/local/instrumenter.js";
gulp.task(instrumenterJs, /*help*/ false, () => project.compile(instrumenterProject));
gulp.task(`clean:${instrumenterJs}`, /*help*/ false, () => project.clean(instrumenterProject));

gulp.task(
    "tsc-instrumented",
    "Builds an instrumented tsc.js - run with --test=[testname]",
    ["local", loggedIOJs, instrumenterJs, typescriptServicesJs],
    () => exec(host, [instrumenterJs, "record", cmdLineOptions.tests || "iocapture", "built/local"]));

gulp.task(
    "update-sublime",
    "Updates the sublime plugin's tsserver",
    ["local", tsserverJs],
    () =>
        gulp.src([tsserverJs, tsserverJs + ".map"])
            .pipe(gulp.dest("../TypeScript-Sublime-Plugin/tsserver/")));

gulp.task(
    "build-rules",
    "Compiles tslint rules to js",
    () => project.compile("scripts/tslint/tsconfig.json"));

gulp.task("clean-rules", /*help*/ false, () => project.clean("scripts/tslint/tsconfig.json"));

gulp.task(
    "lint",
    "Runs tslint on the compiler sources. Optional arguments are: --f[iles]=regex",
    ["build-rules"],
    () => {
        if (fold.isTravis()) console.log(fold.start("lint"));
        for (const project of ["scripts/tslint/tsconfig.json", "src/tsconfig-base.json"]) {
            const cmd = `node node_modules/tslint/bin/tslint --project ${project} --formatters-dir ./built/local/tslint/formatters --format autolinkableStylish${cmdLineOptions.fix ? " --fix" : ""}`;
            log("Linting: " + cmd);
            child_process.execSync(cmd, { stdio: [0, 1, 2] });
        }
        if (fold.isTravis()) console.log(fold.end("lint"));
    });

gulp.task(
    "default",
    "Runs 'local'",
    ["local"]);

gulp.task(
    "watch-diagnostics",
    /*help*/ false,
    [processDiagnosticMessagesJs],
    () => gulp.watch([diagnosticMessagesJson], [diagnosticInformationMapTs, builtGeneratedDiagnosticMessagesJson]));

gulp.task(
    "watch-lib",
    /*help*/ false,
    () => gulp.watch(["src/lib/**/*"], ["lib"]));

gulp.task(
    "watch-tsc",
    /*help*/ false,
    ["watch-diagnostics", "watch-lib"].concat(useCompilerDeps),
    () => project.watch(tscProject, { typescript: useCompiler }));

const watchServicesPatterns = [
    "src/compiler/**/*",
    "src/jsTypings/**/*",
    "src/services/**/*"
];

gulp.task(
    "watch-services",
    /*help*/ false,
    ["watch-diagnostics", "watch-lib"],
    () => gulp.watch(watchServicesPatterns, ["services"]));

const watchLsslPatterns = [
    ...watchServicesPatterns,
    "src/server/**/*",
    "src/tsserver/tsconfig.json"
];

gulp.task(
    "watch-lssl",
    /*help*/ false,
    () => gulp.watch(watchLsslPatterns, ["lssl"]));

gulp.task(
    "watch-server",
    /*help*/ false,
    ["watch-diagnostics", "watch-lib"].concat(useCompilerDeps),
    () => project.watch(tsserverProject, { typescript: useCompiler }));

gulp.task(
    "watch-runner",
    /*help*/ false,
    useCompilerDeps,
    () => project.watch(testRunnerProject, { typescript: useCompiler }));

gulp.task(
    "watch-local",
    "Watches for changes to projects in src/ (but does not execute tests).",
    ["watch-lib", "watch-tsc", "watch-services", "watch-server", "watch-runner", "watch-lssl"]);

gulp.task(
    "watch",
    "Watches for changes to the build inputs for built/local/run.js, then runs tests.",
    ["build-rules", "watch-runner", "watch-services", "watch-lssl"],
    () => {
        const sem = new Semaphore(1);

        gulp.watch([runJs, typescriptDts, tsserverlibraryDts], () => {
            runTests();
        });

        // NOTE: gulp.watch is far too slow when watching tests/cases/**/* as it first enumerates *every* file
        const testFilePattern = /(\.ts|[\\/]tsconfig\.json)$/;
        fs.watch("tests/cases", { recursive: true }, (_, file) => {
            if (testFilePattern.test(file)) runTests();
        });

        async function runTests() {
            try {
                // Ensure only one instance of the test runner is running at any given time.
                if (sem.count > 0) {
                    await sem.wait();
                    try {
                        // Wait for any concurrent recompilations to complete...
                        try {
                            await delay(100);
                            while (project.hasRemainingWork()) {
                                await project.waitForWorkToComplete();
                                await delay(500);
                            }
                        }
                        catch (e) {
                            if (e instanceof CancelError) return;
                            throw e;
                        }

                        // cancel any pending or active test run if a new recompilation is triggered
                        const source = new CancellationTokenSource();
                        project.waitForWorkToStart().then(() => {
                            source.cancel();
                        });
                    
                        if (cmdLineOptions.tests || cmdLineOptions.failed) {
                            await runConsoleTests(runJs, "mocha-fivemat-progress-reporter", /*runInParallel*/ false, /*watchMode*/ true, source.token);
                        }
                        else {
                            await runConsoleTests(runJs, "min", /*runInParallel*/ true, /*watchMode*/ true, source.token);
                        }
                    }
                    finally {
                        sem.release();
                    }
                }
            }
            catch (e) {
                if (e instanceof CancelError) {
                    log.warn("Operation was canceled");
                }
                else {
                    log.error(e);
                }
            }
        };
    });

gulp.task("clean-built", /*help*/ false, [`clean:${diagnosticInformationMapTs}`], () => del(["built"]));
gulp.task(
    "clean",
    "Cleans the compiler output, declare files, and tests",
    [
        `clean:${importDefinitelyTypedTestsJs}`,
        `clean:${webtscJs}`,
        `clean:${perftscJs}`,
        `clean:${instrumenterJs}`,
        `clean:${webTestServerJs}`,
        "clean:scripts",
        "clean-rules",
        "clean-built"
    ]);