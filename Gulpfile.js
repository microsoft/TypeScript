/// <reference path="scripts/types/ambient.d.ts" />
// @ts-check
const cp = require("child_process");
const path = require("path");
const fs = require("fs");
const child_process = require("child_process");
const originalGulp = require("gulp");
const helpMaker = require("gulp-help");
const runSequence = require("run-sequence");
const concat = require("gulp-concat");
const clone = require("gulp-clone");
const newer = require("gulp-newer");
const tsc = require("gulp-typescript");
const insert = require("gulp-insert");
const sourcemaps = require("gulp-sourcemaps");
const Q = require("q");
const del = require("del");
const mkdirP = require("mkdirp");
const minimist = require("minimist");
const browserify = require("browserify");
const through2 = require("through2");
const merge2 = require("merge2");
const os = require("os");
const fold = require("travis-fold");
const ts = require("./lib/typescript");
const gulp = helpMaker(originalGulp);

Error.stackTraceLimit = 1000;

/**
 * This regexp exists to capture our const enums and replace them with normal enums in our public API
 *   - this is fine since we compile with preserveConstEnums, and ensures our consumers are not locked
 *     to the TS version they compile with.
 */
const constEnumCaptureRegexp = /^(\s*)(export )?const enum (\S+) {(\s*)$/gm;
const constEnumReplacement = "$1$2enum $3 {$4";

const cmdLineOptions = minimist(process.argv.slice(2), {
    boolean: ["debug", "inspect", "light", "colors", "lint", "soft"],
    string: ["browser", "tests", "host", "reporter", "stackTraceLimit", "timeout"],
    alias: {
        "b": "browser",
        "d": "debug", "debug-brk": "debug",
        "i": "inspect", "inspect-brk": "inspect",
        "t": "tests", "test": "tests",
        "ru": "runners", "runner": "runners",
        "r": "reporter",
        "c": "colors", "color": "colors",
        "w": "workers",
    },
    default: {
        soft: false,
        colors: process.env.colors || process.env.color || true,
        debug: process.env.debug || process.env["debug-brk"] || process.env.d,
        inspect: process.env.inspect || process.env["inspect-brk"] || process.env.i,
        host: process.env.TYPESCRIPT_HOST || process.env.host || "node",
        browser: process.env.browser || process.env.b || (os.platform() === "win32" ? "edge" : "chrome"),
        timeout: process.env.timeout || 40000,
        tests: process.env.test || process.env.tests || process.env.t,
        runners: process.env.runners || process.env.runner || process.env.ru,
        light: process.env.light === undefined || process.env.light !== "false",
        reporter: process.env.reporter || process.env.r,
        lint: process.env.lint || true,
        workers: process.env.workerCount || os.cpus().length,
    }
});

const noop = () => {}; // tslint:disable-line no-empty
/**
 * @param {string} cmd
 * @param {string[]} args
 * @param {() => void} complete
 * @param {(e: *, status: number) => void} error
 */
function exec(cmd, args, complete = noop, error = noop) {
    console.log(`${cmd} ${args.join(" ")}`);
    // TODO (weswig): Update child_process types to add windowsVerbatimArguments to the type definition
    const subshellFlag = isWin ? "/c" : "-c";
    const command = isWin ? [possiblyQuote(cmd), ...args] : [`${cmd} ${args.join(" ")}`];
    const ex = cp.spawn(isWin ? "cmd" : "/bin/sh", [subshellFlag, ...command], { stdio: "inherit", windowsVerbatimArguments: true });
    ex.on("exit", (code) => code === 0 ? complete() : error(/*e*/ undefined, code));
    ex.on("error", error);
}

/**
 * @param {string} cmd
 */
function possiblyQuote(cmd) {
    return cmd.indexOf(" ") >= 0 ? `"${cmd}"` : cmd;
}

/**
 * @param diagnostics {ts.Diagnostic[]}
 * @param [pretty] {boolean}
 */
function diagnosticsToString(diagnostics, pretty) {
    const host = {
        getCurrentDirectory() { return process.cwd(); },
        getCanonicalFileName(fileName) { return fileName; },
        getNewLine() { return os.EOL; }
    };
    return pretty ? ts.formatDiagnosticsWithColorAndContext(diagnostics, host) :
        ts.formatDiagnostics(diagnostics, host);
}

/** @param diagnostics {ts.Diagnostic[]} */
function reportDiagnostics(diagnostics) {
    console.log(diagnosticsToString(diagnostics, process.stdout.isTTY));
}

/** @param jsonPath {string} */
function readJson(jsonPath) {
    const jsonText = fs.readFileSync(jsonPath, "utf8");
    const result = ts.parseConfigFileTextToJson(jsonPath, jsonText);
    if (result.error) {
        reportDiagnostics([result.error]);
        throw new Error("An error occurred during parse.");
    }
    return result.config;
}

let useDebugMode = true;
let host = cmdLineOptions.host;

// Constants
const compilerDirectory = "src/compiler/";
const harnessDirectory = "src/harness/";
const libraryDirectory = "src/lib/";
const scriptsDirectory = "scripts/";
const docDirectory = "doc/";
const lclDirectory = "src/loc/lcl";

const builtDirectory = "built/";
const builtLocalDirectory = "built/local/";
const lkgDirectory = "lib/";

const copyright = "CopyrightNotice.txt";

const compilerFilename = "tsc.js";
const lkgCompiler = path.join(lkgDirectory, compilerFilename);
const builtLocalCompiler = path.join(builtLocalDirectory, compilerFilename);

const nodeModulesPathPrefix = path.resolve("./node_modules/.bin/");
const isWin = /^win/.test(process.platform);
const mocha = path.join(nodeModulesPathPrefix, "mocha") + (isWin ? ".cmd" : "");

/** @type {{ libs: string[], paths?: Record<string, string>, sources?: Record<string, string[]> }} */
const libraries = readJson("./src/lib/libs.json");

/**
 * .lcg file is what localization team uses to know what messages to localize.
 * The file is always generated in 'enu\diagnosticMessages.generated.json.lcg'
 */
const generatedLCGFile = path.join(builtLocalDirectory, "enu", "diagnosticMessages.generated.json.lcg");

/**
 * The localization target produces the two following transformations:
 *    1. 'src\loc\lcl\<locale>\diagnosticMessages.generated.json.lcl' => 'built\local\<locale>\diagnosticMessages.generated.json'
 *       convert localized resources into a .json file the compiler can understand
 *    2. 'src\compiler\diagnosticMessages.generated.json' => 'built\local\ENU\diagnosticMessages.generated.json.lcg'
 *       generate the lcg file (source of messages to localize) from the diagnosticMessages.generated.json
 */
const localizationTargets = ["cs", "de", "es", "fr", "it", "ja", "ko", "pl", "pt-br", "ru", "tr", "zh-cn", "zh-tw"]
    .map(f => path.join(builtLocalDirectory, f, "diagnosticMessages.generated.json"))
    .concat(generatedLCGFile);

const libraryTargets = libraries.libs.map(lib => {
    const relativeSources = ["header.d.ts"].concat(libraries.sources && libraries.sources[lib] || [lib + ".d.ts"]);
    const relativeTarget = libraries.paths && libraries.paths[lib] || ("lib." + lib + ".d.ts");
    const sources = [copyright].concat(relativeSources.map(s => path.join(libraryDirectory, s)));
    const target = path.join(builtLocalDirectory, relativeTarget);
    gulp.task(target, /*help*/ false, [], () =>
        gulp.src(sources)
            .pipe(newer(target))
            .pipe(concat(target, { newLine: "\n\n" }))
            .pipe(gulp.dest(".")));
    return target;
});

const configurePreleleaseJs = path.join(scriptsDirectory, "configurePrerelease.js");
const configurePreleleaseTs = path.join(scriptsDirectory, "configurePrerelease.ts");
const packageJson = "package.json";
const versionFile = path.join(compilerDirectory, "core.ts");

/**
 * @param {string | string[]} source
 * @param {string | string[]} dest
 * @returns {boolean}
 */
function needsUpdate(source, dest) {
    if (typeof source === "string" && typeof dest === "string") {
        if (fs.existsSync(dest)) {
            const {mtime: outTime} = fs.statSync(dest);
            const {mtime: inTime} = fs.statSync(source);
            if (+inTime <= +outTime) {
                return false;
            }
        }
    }
    else if (typeof source === "string" && typeof dest !== "string") {
        const {mtime: inTime} = fs.statSync(source);
        for (const filepath of dest) {
            if (fs.existsSync(filepath)) {
                const {mtime: outTime} = fs.statSync(filepath);
                if (+inTime > +outTime) {
                    return true;
                }
            }
            else {
                return true;
            }
        }
        return false;
    }
    else if (typeof source !== "string" && typeof dest === "string") {
        if (fs.existsSync(dest)) {
            const {mtime: outTime} = fs.statSync(dest);
            for (const filepath of source) {
                if (fs.existsSync(filepath)) {
                    const {mtime: inTime} = fs.statSync(filepath);
                    if (+inTime > +outTime) {
                        return true;
                    }
                }
                else {
                    return true;
                }
            }
            return false;
        }
    }
    else if (typeof source !== "string" && typeof dest !== "string") {
        for (let i = 0; i < source.length; i++) {
            if (!dest[i]) {
                continue;
            }
            if (fs.existsSync(dest[i])) {
                const {mtime: outTime} = fs.statSync(dest[i]);
                const {mtime: inTime} = fs.statSync(source[i]);
                if (+inTime > +outTime) {
                    return true;
                }
            }
            else {
                return true;
            }
        }
        return false;
    }
    return true;
}

/**
 * @param {tsc.Settings} base
 * @param {boolean=} useBuiltCompiler
 * @returns {tsc.Settings}
 */
function getCompilerSettings(base, useBuiltCompiler) {
    const copy = /** @type {tsc.Settings} */ ({});
    for (const key in base) {
        copy[key] = base[key];
    }
    if (!useDebugMode) {
        if (copy.removeComments === undefined) copy.removeComments = true;
    }
    copy.newLine = "lf";
    if (useBuiltCompiler === true) {
        copy.typescript = /** @type {*} */ (require("./built/local/typescript.js"));
    }
    else if (useBuiltCompiler === false) {
        copy.typescript = /** @type {*} */ (require("./lib/typescript.js"));
    }
    return copy;
}

gulp.task(configurePreleleaseJs, /*help*/ false, [], () => {
    /** @type {tsc.Settings} */
    const settings = {
        declaration: false,
        removeComments: true,
        noResolve: false,
        stripInternal: false,
        module: "commonjs"
    };
    return gulp.src(configurePreleleaseTs)
        .pipe(sourcemaps.init())
        .pipe(tsc(settings))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./scripts"));
});


// Nightly management tasks
gulp.task("configure-nightly", "Runs scripts/configurePrerelease.ts to prepare a build for nightly publishing", [configurePreleleaseJs], (done) => {
    exec(host, [configurePreleleaseJs, "dev", packageJson, versionFile], done, done);
});
gulp.task("publish-nightly", "Runs `npm publish --tag next` to create a new nightly build on npm", ["LKG"], () => {
    return runSequence("clean", "useDebugMode", "runtests-parallel", (done) => {
        exec("npm", ["publish", "--tag", "next"], done, done);
    });
});

const importDefinitelyTypedTestsDirectory = path.join(scriptsDirectory, "importDefinitelyTypedTests");
const importDefinitelyTypedTestsJs = path.join(importDefinitelyTypedTestsDirectory, "importDefinitelyTypedTests.js");
const importDefinitelyTypedTestsTs = path.join(importDefinitelyTypedTestsDirectory, "importDefinitelyTypedTests.ts");

gulp.task(importDefinitelyTypedTestsJs, /*help*/ false, [], () => {
    /** @type {tsc.Settings} */
    const settings = getCompilerSettings({
        declaration: false,
        removeComments: true,
        noResolve: false,
        stripInternal: false,
        outFile: importDefinitelyTypedTestsJs
    }, /*useBuiltCompiler*/ false);
    return gulp.src(importDefinitelyTypedTestsTs)
        .pipe(sourcemaps.init())
        .pipe(tsc(settings))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("."));
});

gulp.task("importDefinitelyTypedTests", "Runs scripts/importDefinitelyTypedTests/importDefinitelyTypedTests.ts to copy DT's tests to the TS-internal RWC tests", [importDefinitelyTypedTestsJs], (done) => {
    exec(host, [importDefinitelyTypedTestsJs, "./", "../DefinitelyTyped"], done, done);
});

gulp.task("lib", "Builds the library targets", libraryTargets);


// Generate diagnostics
const processDiagnosticMessagesJs = path.join(scriptsDirectory, "processDiagnosticMessages.js");
const processDiagnosticMessagesTs = path.join(scriptsDirectory, "processDiagnosticMessages.ts");
const diagnosticMessagesJson = path.join(compilerDirectory, "diagnosticMessages.json");
const diagnosticInfoMapTs = path.join(compilerDirectory, "diagnosticInformationMap.generated.ts");
const generatedDiagnosticMessagesJSON = path.join(compilerDirectory, "diagnosticMessages.generated.json");
const builtGeneratedDiagnosticMessagesJSON = path.join(builtLocalDirectory, "diagnosticMessages.generated.json");

// processDiagnosticMessages script
gulp.task(processDiagnosticMessagesJs, /*help*/ false, [], () => {
    const diagsProject = tsc.createProject('./scripts/processDiagnosticMessages.tsconfig.json');
    return diagsProject.src()
        .pipe(newer(processDiagnosticMessagesJs))
        .pipe(diagsProject())
        .pipe(gulp.dest(scriptsDirectory));
});

// The generated diagnostics map; built for the compiler and for the "generate-diagnostics" task
gulp.task(diagnosticInfoMapTs, [processDiagnosticMessagesJs], (done) => {
    if (needsUpdate(diagnosticMessagesJson, [generatedDiagnosticMessagesJSON, diagnosticInfoMapTs])) {
        exec(host, [processDiagnosticMessagesJs, diagnosticMessagesJson], done, done);
    }
    else {
        done();
    }
});

gulp.task(builtGeneratedDiagnosticMessagesJSON, [diagnosticInfoMapTs], (done) => {
    if (fs.existsSync(builtLocalDirectory) && needsUpdate(generatedDiagnosticMessagesJSON, builtGeneratedDiagnosticMessagesJSON)) {
        fs.writeFileSync(builtGeneratedDiagnosticMessagesJSON, fs.readFileSync(generatedDiagnosticMessagesJSON));
    }
    done();
});

gulp.task("generate-diagnostics", "Generates a diagnostic file in TypeScript based on an input JSON file", [diagnosticInfoMapTs]);

//  Localize diagnostics script
const generateLocalizedDiagnosticMessagesJs = path.join(scriptsDirectory, "generateLocalizedDiagnosticMessages.js");
const generateLocalizedDiagnosticMessagesTs = path.join(scriptsDirectory, "generateLocalizedDiagnosticMessages.ts");

gulp.task(generateLocalizedDiagnosticMessagesJs, /*help*/ false, [], () => {
    /** @type {tsc.Settings} */
    const settings = getCompilerSettings({
        target: "es5",
        declaration: false,
        removeComments: true,
        noResolve: false,
        stripInternal: false,
        types: ["node", "xml2js"]
    }, /*useBuiltCompiler*/ false);
    return gulp.src(generateLocalizedDiagnosticMessagesTs)
        .pipe(newer(generateLocalizedDiagnosticMessagesJs))
        .pipe(sourcemaps.init())
        .pipe(tsc(settings))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(scriptsDirectory));
});

// Localize diagnostics
gulp.task(generatedLCGFile, [generateLocalizedDiagnosticMessagesJs, diagnosticInfoMapTs], (done) => {
    if (fs.existsSync(builtLocalDirectory) && needsUpdate(generatedDiagnosticMessagesJSON, generatedLCGFile)) {
        exec(host, [generateLocalizedDiagnosticMessagesJs, lclDirectory, builtLocalDirectory, generatedDiagnosticMessagesJSON], done, done);
    }
});

gulp.task("localize", [generatedLCGFile]);

const servicesFile = path.join(builtLocalDirectory, "typescriptServices.js");
const standaloneDefinitionsFile = path.join(builtLocalDirectory, "typescriptServices.d.ts");
const nodePackageFile = path.join(builtLocalDirectory, "typescript.js");
const nodeDefinitionsFile = path.join(builtLocalDirectory, "typescript.d.ts");
const nodeStandaloneDefinitionsFile = path.join(builtLocalDirectory, "typescript_standalone.d.ts");

/** @type {string} */
let copyrightContent;
/**
 * @param {boolean} outputCopyright
 */
function prependCopyright(outputCopyright = !useDebugMode) {
    return insert.prepend(outputCopyright ? (copyrightContent || (copyrightContent = fs.readFileSync(copyright).toString())) : "");
}

gulp.task(builtLocalCompiler, /*help*/ false, [servicesFile], () => {
    const localCompilerProject = tsc.createProject("src/compiler/tsconfig.json", getCompilerSettings({}, /*useBuiltCompiler*/ true));
    return localCompilerProject.src()
        .pipe(newer(builtLocalCompiler))
        .pipe(sourcemaps.init())
        .pipe(localCompilerProject())
        .pipe(prependCopyright())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("src/compiler"));
});

gulp.task(servicesFile, /*help*/ false, ["lib", "generate-diagnostics"], () => {
    const servicesProject = tsc.createProject("src/services/tsconfig.json", getCompilerSettings({ removeComments: false }, /*useBuiltCompiler*/ false));
    const {js, dts} = servicesProject.src()
        .pipe(newer(servicesFile))
        .pipe(sourcemaps.init())
        .pipe(servicesProject());
    const completedJs = js.pipe(prependCopyright())
        .pipe(sourcemaps.write("."));
    const completedDts = dts.pipe(prependCopyright(/*outputCopyright*/ true))
        .pipe(insert.transform((contents, file) => {
            file.path = standaloneDefinitionsFile;
            return contents.replace(constEnumCaptureRegexp, constEnumReplacement);
        }));
    return merge2([
        completedJs,
        completedJs.pipe(clone())
            .pipe(insert.transform((content, file) => (file.path = nodePackageFile, content))),
        completedDts,
        completedDts.pipe(clone())
            .pipe(insert.transform((content, file) => {
                file.path = nodeDefinitionsFile;
                return content + "\nexport = ts;";
            }))
            .pipe(gulp.dest("src/services")),
        completedDts.pipe(clone())
            .pipe(insert.transform((content, file) => {
                file.path = nodeStandaloneDefinitionsFile;
                return content.replace(/declare (namespace|module) ts/g, 'declare module "typescript"');
            }))
    ]).pipe(gulp.dest("src/services"));
});

// cancellationToken.js
const cancellationTokenJs = path.join(builtLocalDirectory, "cancellationToken.js");
gulp.task(cancellationTokenJs, /*help*/ false, [servicesFile], () => {
    const cancellationTokenProject = tsc.createProject("src/server/cancellationToken/tsconfig.json", getCompilerSettings({}, /*useBuiltCompiler*/ true));
    return cancellationTokenProject.src()
        .pipe(newer(cancellationTokenJs))
        .pipe(sourcemaps.init())
        .pipe(cancellationTokenProject())
        .pipe(prependCopyright())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(builtLocalDirectory));
});

// typingsInstallerFile.js
const typingsInstallerJs = path.join(builtLocalDirectory, "typingsInstaller.js");
gulp.task(typingsInstallerJs, /*help*/ false, [servicesFile], () => {
    const cancellationTokenProject = tsc.createProject("src/server/typingsInstaller/tsconfig.json", getCompilerSettings({}, /*useBuiltCompiler*/ true));
    return cancellationTokenProject.src()
        .pipe(newer(typingsInstallerJs))
        .pipe(sourcemaps.init())
        .pipe(cancellationTokenProject())
        .pipe(prependCopyright())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("src/server/typingsInstaller"));
});

const serverFile = path.join(builtLocalDirectory, "tsserver.js");

gulp.task(serverFile, /*help*/ false, [servicesFile, typingsInstallerJs, cancellationTokenJs], () => {
    const serverProject = tsc.createProject("src/server/tsconfig.json", getCompilerSettings({}, /*useBuiltCompiler*/ true));
    return serverProject.src()
        .pipe(newer(serverFile))
        .pipe(sourcemaps.init())
        .pipe(serverProject())
        .pipe(prependCopyright())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("src/server"));
});

const typesMapJson = path.join(builtLocalDirectory, "typesMap.json");
const tsserverLibraryFile = path.join(builtLocalDirectory, "tsserverlibrary.js");
const tsserverLibraryDefinitionFile = path.join(builtLocalDirectory, "tsserverlibrary.d.ts");

gulp.task(tsserverLibraryFile, /*help*/ false, [servicesFile, typesMapJson], (done) => {
    const serverLibraryProject = tsc.createProject("src/server/tsconfig.library.json", getCompilerSettings({ removeComments: false }, /*useBuiltCompiler*/ true));
    /** @type {{ js: NodeJS.ReadableStream, dts: NodeJS.ReadableStream }} */
    const {js, dts} = serverLibraryProject.src()
        .pipe(sourcemaps.init())
        .pipe(newer(/** @type {*} */({ dest: tsserverLibraryFile, extra: ["src/compiler/**/*.ts", "src/services/**/*.ts"] })))
        .pipe(serverLibraryProject());

    return merge2([
        js.pipe(prependCopyright())
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest("src/server")),
        dts.pipe(prependCopyright(/*outputCopyright*/ true))
            .pipe(insert.transform((content) => {
                return content.replace(constEnumCaptureRegexp, constEnumReplacement) + "\nexport = ts;\nexport as namespace ts;";
            }))
            .pipe(gulp.dest("src/server"))
    ]);
});

gulp.task(typesMapJson, /*help*/ false, [], () => {
    return gulp.src("src/server/typesMap.json")
        .pipe(insert.transform((contents, file) => {
            JSON.parse(contents);
            return contents;
        }))
        .pipe(gulp.dest(builtLocalDirectory));
});

gulp.task("lssl", "Builds language service server library", [tsserverLibraryFile]);
gulp.task("local", "Builds the full compiler and services", [builtLocalCompiler, servicesFile, serverFile, builtGeneratedDiagnosticMessagesJSON, tsserverLibraryFile, "localize"]);
gulp.task("tsc", "Builds only the compiler", [builtLocalCompiler]);

// Generate Markdown spec
const word2mdJs = path.join(scriptsDirectory, "word2md.js");
const word2mdTs = path.join(scriptsDirectory, "word2md.ts");
const specWord = path.join(docDirectory, "TypeScript Language Specification.docx");
const specMd = path.join(docDirectory, "spec.md");

gulp.task(word2mdJs, /*help*/ false, [], () => {
    /** @type {tsc.Settings} */
    const settings = getCompilerSettings({
        outFile: word2mdJs
    }, /*useBuiltCompiler*/ false);
    return gulp.src(word2mdTs)
        .pipe(newer(word2mdJs))
        .pipe(sourcemaps.init())
        .pipe(tsc(settings))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("."));
});

gulp.task(specMd, /*help*/ false, [word2mdJs], (done) => {
    const specWordFullPath = path.resolve(specWord);
    const specMDFullPath = path.resolve(specMd);
    const cmd = "cscript //nologo " + word2mdJs + " \"" + specWordFullPath + "\" " + "\"" + specMDFullPath + "\"";
    console.log(cmd);
    cp.exec(cmd, done);
});

gulp.task("generate-spec", "Generates a Markdown version of the Language Specification", [specMd]);

gulp.task("clean", "Cleans the compiler output, declare files, and tests", [], () => {
    return del([builtDirectory]);
});

gulp.task("useDebugMode", /*help*/ false, [], (done) => { useDebugMode = true; done(); });
gulp.task("dontUseDebugMode", /*help*/ false, [], (done) => { useDebugMode = false; done(); });

gulp.task("VerifyLKG", /*help*/ false, [], () => {
    const expectedFiles = [builtLocalCompiler, servicesFile, serverFile, nodePackageFile, nodeDefinitionsFile, standaloneDefinitionsFile, tsserverLibraryFile, tsserverLibraryDefinitionFile, typingsInstallerJs, cancellationTokenJs].concat(libraryTargets);
    const missingFiles = expectedFiles.
        concat(localizationTargets).
        filter(f => !fs.existsSync(f));
    if (missingFiles.length > 0) {
        throw new Error("Cannot replace the LKG unless all built targets are present in directory " + builtLocalDirectory +
            ". The following files are missing:\n" + missingFiles.join("\n"));
    }
    // Copy all the targets into the LKG directory
    return gulp.src([...expectedFiles, path.join(builtLocalDirectory, "**"), `!${path.join(builtLocalDirectory, "tslint")}`, `!${path.join(builtLocalDirectory, "*.*")}`]).pipe(gulp.dest(lkgDirectory));
});

gulp.task("LKGInternal", /*help*/ false, ["lib", "local"]);

gulp.task("LKG", "Makes a new LKG out of the built js files", ["clean", "dontUseDebugMode"], () => {
    return runSequence("LKGInternal", "VerifyLKG");
});


// Task to build the tests infrastructure using the built compiler
const run = path.join(builtLocalDirectory, "run.js");
gulp.task(run, /*help*/ false, [servicesFile, tsserverLibraryFile], () => {
    const testProject = tsc.createProject("src/harness/tsconfig.json", getCompilerSettings({}, /*useBuiltCompiler*/ true));
    return testProject.src()
        .pipe(newer(run))
        .pipe(sourcemaps.init())
        .pipe(testProject())
        .pipe(sourcemaps.write(".", { includeContent: false, sourceRoot: "." }))
        .pipe(gulp.dest("src/harness"));
});

const internalTests = "internal/";

const localBaseline = "tests/baselines/local/";
const refBaseline = "tests/baselines/reference/";

const localRwcBaseline = path.join(internalTests, "baselines/rwc/local");
const refRwcBaseline = path.join(internalTests, "baselines/rwc/reference");

const localTest262Baseline = path.join(internalTests, "baselines/test262/local");

gulp.task("tests", "Builds the test infrastructure using the built compiler", [run]);
gulp.task("tests-debug", "Builds the test sources and automation in debug mode", () => {
    return runSequence("useDebugMode", "tests");
});

function deleteTemporaryProjectOutput() {
    return del(path.join(localBaseline, "projectOutput/"));
}

/** @type {string} */
let savedNodeEnv;
function setNodeEnvToDevelopment() {
    savedNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";
}

function restoreSavedNodeEnv() {
    process.env.NODE_ENV = savedNodeEnv;
}

/**
 * @param {string} defaultReporter
 * @param {boolean} runInParallel
 * @param {(e?: any) => void} done
 */
function runConsoleTests(defaultReporter, runInParallel, done) {
    const lintFlag = cmdLineOptions.lint;
    cleanTestDirs((err) => {
        if (err) { console.error(err); failWithStatus(err, 1); }
        let testTimeout = cmdLineOptions.timeout;
        const debug = cmdLineOptions.debug;
        const inspect = cmdLineOptions.inspect;
        const tests = cmdLineOptions.tests;
        const runners = cmdLineOptions.runners;
        const light = cmdLineOptions.light;
        const stackTraceLimit = cmdLineOptions.stackTraceLimit;
        const testConfigFile = "test.config";
        if (fs.existsSync(testConfigFile)) {
            fs.unlinkSync(testConfigFile);
        }
        let workerCount, taskConfigsFolder;
        if (runInParallel) {
            // generate name to store task configuration files
            const prefix = os.tmpdir() + "/ts-tests";
            let i = 1;
            do {
                taskConfigsFolder = prefix + i;
                i++;
            } while (fs.existsSync(taskConfigsFolder));
            fs.mkdirSync(taskConfigsFolder);

            workerCount = cmdLineOptions.workers;
        }

        if (tests && tests.toLocaleLowerCase() === "rwc") {
            testTimeout = 400000;
        }

        if (tests || runners || light || testTimeout || taskConfigsFolder) {
            writeTestConfigFile(tests, runners, light, taskConfigsFolder, workerCount, stackTraceLimit, testTimeout);
        }

        const colors = cmdLineOptions.colors;
        const reporter = cmdLineOptions.reporter || defaultReporter;

        // timeout normally isn"t necessary but Travis-CI has been timing out on compiler baselines occasionally
        // default timeout is 2sec which really should be enough, but maybe we just need a small amount longer
        if (!runInParallel) {
            const args = [];
            args.push("-R", reporter);
            if (tests) {
                args.push("-g", `"${tests}"`);
            }
            if (colors) {
                args.push("--colors");
            }
            else {
                args.push("--no-colors");
            }
            if (inspect) {
                args.unshift("--inspect-brk");
            }
            else if (debug) {
                args.unshift("--debug-brk");
            }
            else {
                args.push("-t", testTimeout);
            }
            args.push(run);
            setNodeEnvToDevelopment();
            exec(mocha, args, lintThenFinish, finish);

        }
        else {
            // run task to load all tests and partition them between workers
            setNodeEnvToDevelopment();
            exec(host, [run], lintThenFinish, finish);
        }
    });

    /**
     * @param {any=} err
     * @param {number=} status
     */
    function failWithStatus(err, status) {
        if (err || status) {
            process.exit(typeof status === "number" ? status : 2);
        }
        done();
    }

    function lintThenFinish() {
        if (lintFlag) {
            runSequence("lint", finish);
        }
        else {
            finish();
        }
    }

    /**
     * @param {any=} error
     * @param {number=} errorStatus
     */
    function finish(error, errorStatus) {
        restoreSavedNodeEnv();
        deleteTestConfig().then(deleteTemporaryProjectOutput).then(() => {
            if (error !== undefined || errorStatus !== undefined) {
                failWithStatus(error, errorStatus);
            }
            else {
                done();
            }
        });
    }

    function deleteTestConfig() {
        return del("test.config");
    }
}

gulp.task("runtests-parallel", "Runs all the tests in parallel using the built run.js file. Optional arguments are: --t[ests]=category1|category2|... --d[ebug]=true.", ["build-rules", "tests"], (done) => {
    runConsoleTests("min", /*runInParallel*/ true, done);
});
gulp.task("runtests",
    "Runs the tests using the built run.js file. Optional arguments are: --t[ests]=regex --r[eporter]=[list|spec|json|<more>] --d[ebug]=true --color[s]=false --lint=true.",
    ["build-rules", "tests"],
    (done) => {
        runConsoleTests("mocha-fivemat-progress-reporter", /*runInParallel*/ false, done);
    });

const nodeServerOutFile = "tests/webTestServer.js";
const nodeServerInFile = "tests/webTestServer.ts";
gulp.task(nodeServerOutFile, /*help*/ false, [servicesFile], () => {
    /** @type {tsc.Settings} */
    const settings = getCompilerSettings({ module: "commonjs", target: "es2015" }, /*useBuiltCompiler*/ true);
    return gulp.src(nodeServerInFile)
        .pipe(newer(nodeServerOutFile))
        .pipe(sourcemaps.init())
        .pipe(tsc(settings))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(path.dirname(nodeServerOutFile)));
});

const convertMap = require("convert-source-map");
const sorcery = require("sorcery");
const Vinyl = require("vinyl");

const bundlePath = path.resolve("built/local/bundle.js");

gulp.task("browserify", "Runs browserify on run.js to produce a file suitable for running tests in the browser", [servicesFile], (done) => {
    const testProject = tsc.createProject("src/harness/tsconfig.json", getCompilerSettings({ outFile: bundlePath, inlineSourceMap: true }, /*useBuiltCompiler*/ true));
    /** @type {*} */
    let originalMap;
    /** @type {string} */
    let prebundledContent;
    browserify(testProject.src()
        .pipe(newer(bundlePath))
        .pipe(sourcemaps.init())
        .pipe(testProject())
        .pipe(through2.obj((file, enc, next) => {
            if (originalMap) {
                throw new Error("Should only recieve one file!");
            }
            console.log(`Saving sourcemaps for ${file.path}`);
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
            console.log(`Fixing sourcemaps for ${file.path}`);
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

/**
 * @param {(e?: any) => void} done
 */
function cleanTestDirs(done) {
    // Clean the local baselines & Rwc baselines directories
    del([
        localBaseline,
        localRwcBaseline,
    ]).then(() => {
        mkdirP(localRwcBaseline, (err) => {
            if (err) done(err);
            mkdirP(localTest262Baseline, () => {
                if (err) done(err);
                mkdirP(localBaseline, (err) => done(err));
            });
        });
    });
}

/**
 * used to pass data from jake command line directly to run.js
 * @param {string} tests
 * @param {string} runners
 * @param {boolean} light
 * @param {string=} taskConfigsFolder
 * @param {number=} workerCount
 * @param {string=} stackTraceLimit
 * @param {number=} timeout
 */
function writeTestConfigFile(tests, runners, light, taskConfigsFolder, workerCount, stackTraceLimit, timeout) {
    const testConfigContents = JSON.stringify({
        test: tests ? [tests] : undefined,
        runner: runners ? runners.split(",") : undefined,
        light,
        workerCount,
        stackTraceLimit,
        taskConfigsFolder,
        noColor: !cmdLineOptions.colors,
        timeout,
    });
    console.log("Running tests with config: " + testConfigContents);
    fs.writeFileSync("test.config", testConfigContents);
}


gulp.task("runtests-browser", "Runs the tests using the built run.js file like 'gulp runtests'. Syntax is gulp runtests-browser. Additional optional parameters --tests=[regex], --browser=[chrome|IE]", ["browserify", nodeServerOutFile], (done) => {
    cleanTestDirs((err) => {
        if (err) { console.error(err); done(err); process.exit(1); }
        host = "node";
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

        const args = [nodeServerOutFile];
        if (cmdLineOptions.browser) {
            args.push(cmdLineOptions.browser);
        }
        if (tests) {
            args.push(JSON.stringify(tests));
        }
        exec(host, args, done, done);
    });
});

gulp.task("generate-code-coverage", "Generates code coverage data via istanbul", ["tests"], (done) => {
    const testTimeout = cmdLineOptions.timeout;
    exec("istanbul", ["cover", "node_modules/mocha/bin/_mocha", "--", "-R", "min", "-t", testTimeout.toString(), run], done, done);
});


function getDiffTool() {
    const program = process.env.DIFF;
    if (!program) {
        console.error("Add the 'DIFF' environment variable to the path of the program you want to use.");
        process.exit(1);
    }
    return program;
}

gulp.task("diff", "Diffs the compiler baselines using the diff tool specified by the 'DIFF' environment variable", (done) => {
    exec(getDiffTool(), [refBaseline, localBaseline], done, done);
});
gulp.task("diff-rwc", "Diffs the RWC baselines using the diff tool specified by the 'DIFF' environment variable", (done) => {
    exec(getDiffTool(), [refRwcBaseline, localRwcBaseline], done, done);
});

gulp.task("baseline-accept", "Makes the most recent test results the new baseline, overwriting the old baseline", () => {
    return baselineAccept("");
});

function baselineAccept(subfolder = "") {
    return merge2(baselineCopy(subfolder), baselineDelete(subfolder));
}

function baselineCopy(subfolder = "") {
    return gulp.src([`tests/baselines/local/${subfolder}/**`, `!tests/baselines/local/${subfolder}/**/*.delete`])
        .pipe(gulp.dest(refBaseline));
}

function baselineDelete(subfolder = "") {
    return gulp.src(["tests/baselines/local/**/*.delete"])
        .pipe(insert.transform((content, fileObj) => {
            const target = path.join(refBaseline, fileObj.relative.substr(0, fileObj.relative.length - ".delete".length));
            del.sync(target);
            del.sync(fileObj.path);
            return "";
        }));
}

gulp.task("baseline-accept-rwc", "Makes the most recent rwc test results the new baseline, overwriting the old baseline", () => {
    return baselineAccept("rwc");
});


gulp.task("baseline-accept-test262", "Makes the most recent test262 test results the new baseline, overwriting the old baseline", () => {
    return baselineAccept("test262");
});


// Webhost
const webhostPath = "tests/webhost/webtsc.ts";
const webhostJsPath = "tests/webhost/webtsc.js";
gulp.task(webhostJsPath, /*help*/ false, [servicesFile], () => {
    const settings = getCompilerSettings({
        outFile: webhostJsPath
    }, /*useBuiltCompiler*/ true);
    return gulp.src(webhostPath)
        .pipe(newer(webhostJsPath))
        .pipe(sourcemaps.init())
        .pipe(tsc(settings))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(path.dirname(webhostJsPath)));
});

gulp.task("webhost", "Builds the tsc web host", [webhostJsPath], () => {
    return gulp.src(path.join(builtLocalDirectory, "lib.d.ts")).pipe(gulp.dest("tests/webhost/"));
});


// Perf compiler
const perftscPath = "tests/perftsc.ts";
const perftscJsPath = "built/local/perftsc.js";
gulp.task(perftscJsPath, /*help*/ false, [servicesFile], () => {
    const settings = getCompilerSettings({
        outFile: perftscJsPath
    }, /*useBuiltCompiler*/ true);
    return gulp.src(perftscPath)
        .pipe(newer(perftscJsPath))
        .pipe(sourcemaps.init())
        .pipe(tsc(settings))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("."));
});

gulp.task("perftsc", "Builds augmented version of the compiler for perf tests", [perftscJsPath]);


// Instrumented compiler
const loggedIOpath = path.join(harnessDirectory, "loggedIO.ts");
const loggedIOJsPath = path.join(builtLocalDirectory, "loggedIO.js");
gulp.task(loggedIOJsPath, /*help*/ false, [], (done) => {
    const temp = path.join(builtLocalDirectory, "temp");
    mkdirP(temp, (err) => {
        if (err) { console.error(err); done(err); process.exit(1); }
        exec(host, [lkgCompiler, "--types", "--target es5", "--lib es5", "--outdir", temp, loggedIOpath], () => {
            fs.renameSync(path.join(temp, "/harness/loggedIO.js"), loggedIOJsPath);
            del(temp).then(() => done(), done);
        }, done);
    });
});

const instrumenterPath = path.join(harnessDirectory, "instrumenter.ts");
const instrumenterJsPath = path.join(builtLocalDirectory, "instrumenter.js");
gulp.task(instrumenterJsPath, /*help*/ false, [servicesFile], () => {
    const settings = getCompilerSettings({
        module: "commonjs",
        target: "es5",
        lib: [
            "es6",
            "dom",
            "scripthost"
        ]
    }, /*useBuiltCompiler*/ true);
    return gulp.src(instrumenterPath)
        .pipe(newer(instrumenterJsPath))
        .pipe(sourcemaps.init())
        .pipe(tsc(settings))
        .pipe(sourcemaps.write(builtLocalDirectory))
        .pipe(gulp.dest(builtLocalDirectory));
});

gulp.task("tsc-instrumented", "Builds an instrumented tsc.js - run with --test=[testname]", ["local", loggedIOJsPath, instrumenterJsPath, servicesFile], (done) => {
    const test = cmdLineOptions.tests || "iocapture";
    exec(host, [instrumenterJsPath, "record", test, builtLocalCompiler], done, done);
});

gulp.task("update-sublime", "Updates the sublime plugin's tsserver", ["local", serverFile], () => {
    return gulp.src([serverFile, serverFile + ".map"]).pipe(gulp.dest("../TypeScript-Sublime-Plugin/tsserver/"));
});

gulp.task("build-rules", "Compiles tslint rules to js", () => {
    const settings = getCompilerSettings({ module: "commonjs", lib: ["es6"] }, /*useBuiltCompiler*/ false);
    const dest = path.join(builtLocalDirectory, "tslint");
    return gulp.src("scripts/tslint/**/*.ts")
        .pipe(newer({
            dest,
            ext: ".js"
        }))
        .pipe(sourcemaps.init())
        .pipe(tsc(settings))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(dest));
});

gulp.task("lint", "Runs tslint on the compiler sources. Optional arguments are: --f[iles]=regex", ["build-rules"], () => {
    if (fold.isTravis()) console.log(fold.start("lint"));
    for (const project of ["scripts/tslint/tsconfig.json", "src/tsconfig-base.json"]) {
        const cmd = `node node_modules/tslint/bin/tslint --project ${project} --formatters-dir ./built/local/tslint/formatters --format autolinkableStylish`;
        console.log("Linting: " + cmd);
        child_process.execSync(cmd, { stdio: [0, 1, 2] });
    }
    if (fold.isTravis()) console.log(fold.end("lint"));
});

gulp.task("default", "Runs 'local'", ["local"]);

gulp.task("watch", "Watches the src/ directory for changes and executes runtests-parallel.", [], () => {
    gulp.watch("src/**/*.*", ["runtests-parallel"]);
});
