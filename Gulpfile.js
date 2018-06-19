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
const browserify = require("browserify");
const through2 = require("through2");
const fold = require("travis-fold");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const convertMap = require("convert-source-map");
const sorcery = require("sorcery");
const Vinyl = require("vinyl");
const mkdirp = require("./scripts/build/mkdirp");
const gulp = require("./scripts/build/gulp");
const getDirSize = require("./scripts/build/getDirSize");
const project = require("./scripts/build/project");
const replace = require("./scripts/build/replace");
const convertConstEnums = require("./scripts/build/convertConstEnum");
const makeLibraryTargets = require("./scripts/build/lib");
const needsUpdate = require("./scripts/build/needsUpdate");
const getDiffTool = require("./scripts/build/getDiffTool");
const baselineAccept = require("./scripts/build/baselineAccept");
const cmdLineOptions = require("./scripts/build/options");
const exec = require("./scripts/build/exec");
const { runConsoleTests, cleanTestDirs, writeTestConfigFile, refBaseline, localBaseline, refRwcBaseline, localRwcBaseline } = require("./scripts/build/tests");

Error.stackTraceLimit = 1000;

// Constants
const host = cmdLineOptions.host;
const copyright = "CopyrightNotice.txt";
const libraryTargets = makeLibraryTargets([copyright]);

// Compile using the LKG compiler
project.addTypeScript("lkg", "./lib/typescript.js");
project.addTypeScript("default", "lkg");

const scriptsProject = "scripts/tsconfig.json";
const configurePrereleaseJs = "scripts/configurePrerelease.js";
const processDiagnosticMessagesJs = "scripts/processDiagnosticMessages.js";
const generateLocalizedDiagnosticMessagesJs = "scripts/generateLocalizedDiagnosticMessages.js";
const buildProtocolJs = "scripts/buildProtocol.js";
const produceLKGJs = "scripts/produceLKG.js";
const word2mdJs = "scripts/word2md.js";
gulp.task("scripts", /*help*/ false, [project(scriptsProject)], undefined, {
    aliases: [
        configurePrereleaseJs, 
        processDiagnosticMessagesJs,
        generateLocalizedDiagnosticMessagesJs,
        produceLKGJs,
        buildProtocolJs,
        word2mdJs
    ]
});
gulp.task("clean-scripts", /*help*/ false, [project.clean(scriptsProject)]);

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
    () => runSequence("clean", "useDebugMode", "runtests-parallel",
        () => exec("npm", ["publish", "--tag", "next"])));

const importDefinitelyTypedTestsProject = "scripts/importDefinitelyTypedTests/tsconfig.json";
const importDefinitelyTypedTestsJs = "scripts/importDefinitelyTypedTests/importDefinitelyTypedTests.js";
gulp.task(importDefinitelyTypedTestsJs, /*help*/ false, [project(importDefinitelyTypedTestsProject)]);
gulp.task("clean:" + importDefinitelyTypedTestsJs, /*help*/ false, [project.clean(importDefinitelyTypedTestsProject)]);

gulp.task(
    "importDefinitelyTypedTests",
    "Runs scripts/importDefinitelyTypedTests/importDefinitelyTypedTests.ts to copy DT's tests to the TS-internal RWC tests",
    [importDefinitelyTypedTestsJs],
    () => exec(host, [importDefinitelyTypedTestsJs, "./", "../DefinitelyTyped"]));

gulp.task(
    "lib",
    "Builds the library targets",
    libraryTargets);

// The generated diagnostics map; built for the compiler and for the "generate-diagnostics" task
const diagnosticInformationMapTs = "src/compiler/diagnosticInformationMap.generated.ts";
const diagnosticMessagesJson = "src/compiler/diagnosticMessages.json";
const diagnosticMessagesGeneratedJson = "src/compiler/diagnosticMessages.generated.json";
gulp.task(diagnosticInformationMapTs, /*help*/ false, [processDiagnosticMessagesJs], () => {
    if (needsUpdate(diagnosticMessagesJson, [diagnosticMessagesGeneratedJson, diagnosticInformationMapTs])) {
        return exec(host, [processDiagnosticMessagesJs, diagnosticMessagesJson]);
    }
});
gulp.task("clean:" + diagnosticInformationMapTs, /*help*/ false, () => del([diagnosticInformationMapTs, diagnosticMessagesGeneratedJson]));

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
const localizationTargets = ["cs", "de", "es", "fr", "it", "ja", "ko", "pl", "pt-br", "ru", "tr", "zh-cn", "zh-tw"]
    .map(f => `built/local/${f}/diagnosticMessages.generated.json`)
    .concat(generatedLCGFile);

gulp.task(generatedLCGFile, /*help*/ false, [generateLocalizedDiagnosticMessagesJs, diagnosticInformationMapTs], (done) => {
    if (needsUpdate(diagnosticMessagesGeneratedJson, generatedLCGFile)) {
        return exec(host, [generateLocalizedDiagnosticMessagesJs, "src/loc/lcl", "built/local", diagnosticMessagesGeneratedJson], { ignoreExitCode: true });
    }
});

gulp.task("localize", /*help*/ false, [generatedLCGFile]);

const typescriptServicesProject = "built/local/typescriptServices.tsconfig.json";
gulp.task(typescriptServicesProject, /*help*/ false, () => {
    // NOTE: flatten services so that we can properly strip @internal
    project.flatten("src/services/tsconfig.json", typescriptServicesProject, {
        compilerOptions: {
            "stripInternal": true,
            "outFile": "typescriptServices.js"
        }
    });
})

const typescriptServicesJs = "built/local/typescriptServices.js";
const typescriptServicesDts = "built/local/typescriptServices.d.ts";
const typescriptServicesProjectTask = project.defer(typescriptServicesProject, {
    dts: files => files.pipe(convertConstEnums()),
    release: { compilerOptions: { removeComments: true } }
});

gulp.task(typescriptServicesJs, /*help*/ false, ["lib", "generate-diagnostics", typescriptServicesProject], typescriptServicesProjectTask, { aliases: [typescriptServicesDts] });

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
gulp.task("typescriptServices", /*help*/ false, [typescriptServicesJs, typescriptServicesDts, typescriptJs, typescriptDts, typescriptStandaloneDts]);

// Add the "built" compiler with a dependency on the built version of the compiler.
project.addTypeScript("built", "./built/local/typescriptServices.js", [typescriptServicesJs]);

const tscProject = "src/tsc/tsconfig.json";
const tscJs = "built/local/tsc.js";
gulp.task(tscJs, /*help*/ false, [project(tscProject, { typescript: "built", release: { compilerOptions: { removeComments: true } } })]);

const cancellationTokenProject = "src/cancellationToken/tsconfig.json";
const cancellationTokenJs = "built/local/cancellationToken.js";
gulp.task(cancellationTokenJs, /*help*/ false, [project(cancellationTokenProject, { typescript: "built", release: { compilerOptions: { removeComments: true } } })]);

const typingsInstallerProject = "src/typingsInstaller/tsconfig.json";
const typingsInstallerJs = "built/local/typingsInstaller.js";
gulp.task(typingsInstallerJs, /*help*/ false, [project(typingsInstallerProject, { typescript: "built", release: { compilerOptions: { removeComments: true } } })]);

const tsserverProject = "src/tsserver/tsconfig.json";
const tsserverJs = "built/local/tsserver.js";
gulp.task(tsserverJs, /*help*/ false, [project(tsserverProject, { typescript: "built", release: { compilerOptions: { removeComments: true } } })]);

const watchGuardProject = "src/watchGuard/tsconfig.json";
const watchGuardJs = "built/local/watchGuard.js";
gulp.task(watchGuardJs, /*help*/ false, [project(watchGuardProject, { typescript: "built", release: { compilerOptions: { removeComments: true } } })]);

const typesMapJson = "built/local/typesMap.json";
gulp.task(typesMapJson, /*help*/ false, [], () =>
    gulp.src("src/server/typesMap.json")
        .pipe(newer(typesMapJson))
        .pipe(insert.transform(contents => (JSON.parse(contents), contents)))
        .pipe(gulp.dest("built/local")));

const tsserverlibraryDts = "built/local/tsserverlibrary.d.ts";
gulp.task(tsserverlibraryDts, /*help*/ false, [tsserverJs], () =>
    gulp.src(["built/local/compiler.d.ts", "built/local/jsTyping.d.ts", "built/local/services.d.ts", "built/local/server.d.ts"], { base: "built/local" })
        .pipe(convertConstEnums())
        .pipe(concat("tsserverlibrary.d.ts", { newLine: "\n" }))
        .pipe(append("\nexport = ts;\nexport as namespace ts;"))
        .pipe(gulp.dest("built/local")));

gulp.task(
    "lssl",
    "Builds language service server library",
    [tsserverlibraryDts]);

gulp.task(
    "local",
    "Builds the full compiler and services",
    [tscJs, "typescriptServices", tsserverJs, builtGeneratedDiagnosticMessagesJson, tsserverlibraryDts, "localize"]);

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

gulp.task(
    "LKG", 
    "Makes a new LKG out of the built js files", 
    () => runSequence("clean-built", "dontUseDebugMode", ["scripts", "local", cancellationTokenJs, typingsInstallerJs, watchGuardJs], 
        () => {
            const expectedFiles = [
                tscJs, 
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
        }));

// Task to build the tests infrastructure using the built compiler
const testRunnerProject = "src/testRunner/tsconfig.json";
const runJs = "built/local/run.js";
gulp.task(runJs, /*help*/ false, [project(testRunnerProject, { typescript: "built", deps: [tsserverlibraryDts] })]);

gulp.task(
    "tests",
    "Builds the test infrastructure using the built compiler",
    [runJs]);

gulp.task(
    "tests-debug",
    "Builds the test sources and automation in debug mode",
    () => runSequence("useDebugMode", "tests"));

gulp.task(
    "runtests-parallel",
    "Runs all the tests in parallel using the built run.js file. Optional arguments are: --t[ests]=category1|category2|... --d[ebug]=true.",
    ["build-rules", "tests"],
    () => runConsoleTests(runJs, "min", /*runInParallel*/ true));

gulp.task(
    "runtests",
    "Runs the tests using the built run.js file. Optional arguments are: --t[ests]=regex --r[eporter]=[list|spec|json|<more>] --d[ebug]=true --color[s]=false --lint=true.",
    ["build-rules", "tests"],
    () => runConsoleTests(runJs, "mocha-fivemat-progress-reporter", /*runInParallel*/ false));

const webTestServerProject = "tests/webTestServer.tsconfig.json";
const webTestServerJs = "tests/webTestServer.js";
gulp.task(webTestServerJs, /*help*/ false, [project(webTestServerProject, { typescript: "built", release: { compilerOptions: { removeComments: true } } })])
gulp.task("clean:" + webTestServerJs, /*help*/ false, [project.clean(webTestServerProject, { typescript: "built" })])

const bundlePath = path.resolve("built/local/bundle.js");

// TODO(rbuckton): Clean up browserify logic
gulp.task(
    "browserify",
    "Runs browserify on run.js to produce a file suitable for running tests in the browser",
    [runJs],
    (done) => {
        /** @type {*} */
        let originalMap;
        /** @type {string} */
        let prebundledContent;
        browserify(gulp.src([runJs])
            .pipe(newer(bundlePath))
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(through2.obj((file, enc, next) => {
                if (originalMap) {
                    throw new Error("Should only recieve one file!");
                }
                log(`Saving sourcemaps for ${file.path}`);
                originalMap = file.sourceMap;
                prebundledContent = file.contents.toString();
                // Make paths absolute to help sorcery deal with all the terrible paths being thrown around
                originalMap.sources = originalMap.sources.map(s => path.resolve(path.join("src/harness", s)));
                // browserify names input files this when they are streamed in, so this is what it puts in the sourcemap
                originalMap.file = "built/local/_stream_0.js";

                next(/*err*/ undefined, file.contents);
            }))
            .on("error", err => {
                return done(err);
            }), { debug: true, basedir: __dirname }) // Attach error handler to inner stream
            .bundle((err, contents) => {
                if (err) {
                    if (err.message.match(/Cannot find module '.*_stream_0.js'/)) {
                        return done(); // Browserify errors when we pass in no files when `newer` filters the input, we should count that as a success, though
                    }
                    return done(err);
                }
                const stringContent = contents.toString();
                const file = new Vinyl({ contents, path: bundlePath });
                log(`Fixing sourcemaps for ${file.path}`);
                // assumes contents is a Buffer, since that's what browserify yields
                const maps = convertMap.fromSource(stringContent).toObject();
                delete maps.sourceRoot;
                maps.sources = maps.sources.map(s => path.resolve(s === "_stream_0.js" ? "built/local/_stream_0.js" : s));
                // Strip browserify's inline comments away (could probably just let sorcery do this, but then we couldn't fix the paths)
                file.contents = new Buffer(convertMap.removeComments(stringContent));
                const chain = sorcery.loadSync(bundlePath, {
                    content: {
                        "built/local/_stream_0.js": prebundledContent,
                        [bundlePath]: stringContent
                    },
                    sourcemaps: {
                        "built/local/_stream_0.js": originalMap,
                        [bundlePath]: maps,
                        "node_modules/source-map-support/source-map-support.js": undefined,
                    }
                });
                const finalMap = chain.apply();
                file.sourceMap = finalMap;

                const stream = through2.obj((file, enc, callback) => {
                    return callback(/*err*/ undefined, file);
                });
                stream.pipe(sourcemaps.write(".", { includeContent: false }))
                    .pipe(gulp.dest("."))
                    .on("end", done)
                    .on("error", done);
                stream.write(file);
                stream.end();
            });
    });

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
gulp.task(webtscJs, /*help*/ false, [project(webtscProject, { typescript: "built", release: { compilerOptions: { removeComments: true } } })]);
gulp.task("clean:" + webtscJs, /*help*/ false, [project.clean(webtscProject, { typescript: "built" })]);

gulp.task("webhost", "Builds the tsc web host", [webtscJs], () =>
    gulp.src("built/local/lib.d.ts")
        .pipe(gulp.dest("tests/webhost/")));

// Perf compiler
const perftscProject = "tests/perftsc.tsconfig.json";
const perftscJs = "built/local/perftsc.js";
gulp.task(perftscJs, /*help*/ false, [project(perftscProject, { typescript: "built", release: { compilerOptions: { removeComments: true } } })]);
gulp.task("clean:" + perftscJs, /*help*/ false, [project.clean(perftscProject, { typescript: "built" })]);

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
gulp.task(instrumenterJs, /*help*/ false, [project(instrumenterProject)]);
gulp.task("clean:" + instrumenterJs, /*help*/ false, [project.clean(instrumenterProject)]);

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
    [project("scripts/tslint/tsconfig.json")]);

gulp.task("clean-rules", /*help*/ false, [project.clean("scripts/tslint/tsconfig.json")]);

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

// TODO(rbuckton): Investigate restoring gulp.watch() functionality.
// gulp.task(
//     "watch",
//     "Watches the src/ directory for changes and executes runtests-parallel.",
//     [],
//     () => gulp.watch("src/**/*.*", ["runtests-parallel"]));

gulp.task("clean-built", /*help*/ false, ["clean:" + diagnosticInformationMapTs], () => del(["built"]));
gulp.task(
    "clean",
    "Cleans the compiler output, declare files, and tests",
    [
        "clean:" + importDefinitelyTypedTestsJs,
        "clean:" + webtscJs,
        "clean:" + perftscJs,
        "clean:" + instrumenterJs,
        "clean:" + webTestServerJs,
        "clean-scripts",
        "clean-rules",
        "clean-built"
    ]);