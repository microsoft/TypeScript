/// <reference path="scripts/types/ambient.d.ts" />
import * as cp from "child_process";
import * as path from "path";
import * as fs from "fs";
import originalGulp = require("gulp");
import helpMaker = require("gulp-help");
import runSequence = require("run-sequence");
import concat = require("gulp-concat");
import clone = require("gulp-clone");
import newer = require("gulp-newer");
import tsc = require("gulp-typescript");
declare module "gulp-typescript" {
    interface Settings {
        pretty?: boolean;
        newLine?: string;
        noImplicitThis?: boolean;
        stripInternal?: boolean;
        types?: string[];
    }
    interface CompileStream extends NodeJS.ReadWriteStream { } // Either gulp or gulp-typescript has some odd typings which don't reflect reality, making this required
}
import * as insert from "gulp-insert";
import * as sourcemaps from "gulp-sourcemaps";
import Q = require("q");
declare global {
    // `del` further depends on `Promise` (and is also not included), so we just, patch the global scope's Promise to Q's (which we already include in our deps because gulp depends on it)
    type Promise<T> = Q.Promise<T>;
}
import del = require("del");
import mkdirP = require("mkdirp");
import minimist = require("minimist");
import browserify = require("browserify");
import through2 = require("through2");
import merge2 = require("merge2");
import intoStream = require("into-stream");
import * as os from "os";
import fold = require("travis-fold");
const gulp = helpMaker(originalGulp);
const mochaParallel = require("./scripts/mocha-parallel.js");
const {runTestsInParallel} = mochaParallel;

const cmdLineOptions = minimist(process.argv.slice(2), {
    boolean: ["debug", "light", "colors", "lint", "soft"],
    string: ["browser", "tests", "host", "reporter"],
    alias: {
        d: "debug",
        t: "tests",
        test: "tests",
        r: "reporter",
        color: "colors",
        f: "files",
        file: "files"
    },
    default: {
        soft: false,
        colors: process.env.colors || process.env.color || true,
        debug: process.env.debug || process.env.d,
        host: process.env.TYPESCRIPT_HOST || process.env.host || "node",
        browser: process.env.browser || process.env.b || "IE",
        tests: process.env.test || process.env.tests || process.env.t,
        light: process.env.light || false,
        reporter: process.env.reporter || process.env.r,
        lint: process.env.lint || true,
        files: process.env.f || process.env.file || process.env.files || "",
    }
});

function exec(cmd: string, args: string[], complete: () => void = (() => { }), error: (e: any, status: number) => void = (() => { })) {
    console.log(`${cmd} ${args.join(" ")}`);
    // TODO (weswig): Update child_process types to add windowsVerbatimArguments to the type definition
    const subshellFlag = isWin ? "/c" : "-c";
    const command = isWin ? [possiblyQuote(cmd), ...args] : [`${cmd} ${args.join(" ")}`];
    const ex = cp.spawn(isWin ? "cmd" : "/bin/sh", [subshellFlag, ...command], { stdio: "inherit", windowsVerbatimArguments: true } as any);
    ex.on("exit", (code) => code === 0 ? complete() : error(/*e*/ undefined, code));
    ex.on("error", error);
}

function possiblyQuote(cmd: string) {
    return cmd.indexOf(" ") >= 0 ? `"${cmd}"` : cmd;
}

let useDebugMode = true;
let host = cmdLineOptions["host"];

// Constants
const compilerDirectory = "src/compiler/";
const harnessDirectory = "src/harness/";
const libraryDirectory = "src/lib/";
const scriptsDirectory = "scripts/";
const docDirectory = "doc/";

const builtDirectory = "built/";
const builtLocalDirectory = "built/local/";
const LKGDirectory = "lib/";

const copyright = "CopyrightNotice.txt";

const compilerFilename = "tsc.js";
const LKGCompiler = path.join(LKGDirectory, compilerFilename);
const builtLocalCompiler = path.join(builtLocalDirectory, compilerFilename);

const nodeModulesPathPrefix = path.resolve("./node_modules/.bin/");
const isWin = /^win/.test(process.platform);
const mocha = path.join(nodeModulesPathPrefix, "mocha") + (isWin ? ".cmd" : "");

const es2015LibrarySources = [
    "es2015.core.d.ts",
    "es2015.collection.d.ts",
    "es2015.generator.d.ts",
    "es2015.iterable.d.ts",
    "es2015.promise.d.ts",
    "es2015.proxy.d.ts",
    "es2015.reflect.d.ts",
    "es2015.symbol.d.ts",
    "es2015.symbol.wellknown.d.ts"
];

const es2015LibrarySourceMap = es2015LibrarySources.map(function(source) {
    return { target: "lib." + source, sources: ["header.d.ts", source] };
});

const es2016LibrarySource = ["es2016.array.include.d.ts"];

const es2016LibrarySourceMap = es2016LibrarySource.map(function(source) {
    return { target: "lib." + source, sources: ["header.d.ts", source] };
});

const es2017LibrarySource = [
    "es2017.object.d.ts",
    "es2017.sharedmemory.d.ts"
];

const es2017LibrarySourceMap = es2017LibrarySource.map(function(source) {
    return { target: "lib." + source, sources: ["header.d.ts", source] };
});

const hostsLibrarySources = ["dom.generated.d.ts", "webworker.importscripts.d.ts", "scripthost.d.ts"];

const librarySourceMap = [
    // Host library
    { target: "lib.dom.d.ts", sources: ["header.d.ts", "dom.generated.d.ts"] },
    { target: "lib.dom.iterable.d.ts", sources: ["header.d.ts", "dom.iterable.d.ts"] },
    { target: "lib.webworker.d.ts", sources: ["header.d.ts", "webworker.generated.d.ts"] },
    { target: "lib.scripthost.d.ts", sources: ["header.d.ts", "scripthost.d.ts"] },

    // JavaScript library
    { target: "lib.es5.d.ts", sources: ["header.d.ts", "es5.d.ts"] },
    { target: "lib.es2015.d.ts", sources: ["header.d.ts", "es2015.d.ts"] },
    { target: "lib.es2016.d.ts", sources: ["header.d.ts", "es2016.d.ts"] },
    { target: "lib.es2017.d.ts", sources: ["header.d.ts", "es2017.d.ts"] },

    // JavaScript + all host library
    { target: "lib.d.ts", sources: ["header.d.ts", "es5.d.ts"].concat(hostsLibrarySources) },
    { target: "lib.es6.d.ts", sources: ["header.d.ts", "es5.d.ts"].concat(es2015LibrarySources, hostsLibrarySources, "dom.iterable.d.ts") }
].concat(es2015LibrarySourceMap, es2016LibrarySourceMap, es2017LibrarySourceMap);

const libraryTargets = librarySourceMap.map(function(f) {
    return path.join(builtLocalDirectory, f.target);
});

for (const i in libraryTargets) {
    const entry = librarySourceMap[i];
    const target = libraryTargets[i];
    const sources = [copyright].concat(entry.sources.map(function(s) {
        return path.join(libraryDirectory, s);
    }));
    gulp.task(target, false, [], function() {
        return gulp.src(sources)
            .pipe(newer(target))
            .pipe(concat(target, { newLine: "" }))
            .pipe(gulp.dest("."));
    });
}

const configureNightlyJs = path.join(scriptsDirectory, "configureNightly.js");
const configureNightlyTs = path.join(scriptsDirectory, "configureNightly.ts");
const packageJson = "package.json";
const programTs = path.join(compilerDirectory, "program.ts");

function needsUpdate(source: string | string[], dest: string | string[]): boolean {
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

function getCompilerSettings(base: tsc.Settings, useBuiltCompiler?: boolean): tsc.Settings {
    const copy: tsc.Settings = {};
    copy.noEmitOnError = true;
    copy.noImplicitAny = true;
    copy.noImplicitThis = true;
    copy.pretty = true;
    copy.types = [];
    for (const key in base) {
        copy[key] = base[key];
    }
    if (!useDebugMode) {
        if (copy.removeComments === undefined) copy.removeComments = true;
        copy.newLine = "lf";
    }
    else {
        copy.preserveConstEnums = true;
    }
    if (useBuiltCompiler === true) {
        copy.typescript = require("./built/local/typescript.js");
    }
    else if (useBuiltCompiler === false) {
        copy.typescript = require("./lib/typescript.js");
    }
    return copy;
}

gulp.task(configureNightlyJs, false, [], () => {
    const settings: tsc.Settings = {
        declaration: false,
        removeComments: true,
        noResolve: false,
        stripInternal: false,
    };
    return gulp.src(configureNightlyTs)
        .pipe(sourcemaps.init())
        .pipe(tsc(settings))
        .pipe(sourcemaps.write(path.dirname(configureNightlyJs)))
        .pipe(gulp.dest(path.dirname(configureNightlyJs)));
});


// Nightly management tasks
gulp.task("configure-nightly", "Runs scripts/configureNightly.ts to prepare a build for nightly publishing", [configureNightlyJs], (done) => {
    exec(host, [configureNightlyJs, packageJson, programTs], done, done);
});
gulp.task("publish-nightly", "Runs `npm publish --tag next` to create a new nightly build on npm", ["LKG"], () => {
    return runSequence("clean", "useDebugMode", "runtests", (done) => {
        exec("npm", ["publish", "--tag", "next"], done, done);
    });
});

const importDefinitelyTypedTestsDirectory = path.join(scriptsDirectory, "importDefinitelyTypedTests");
const importDefinitelyTypedTestsJs = path.join(importDefinitelyTypedTestsDirectory, "importDefinitelyTypedTests.js");
const importDefinitelyTypedTestsTs = path.join(importDefinitelyTypedTestsDirectory, "importDefinitelyTypedTests.ts");

gulp.task(importDefinitelyTypedTestsJs, false, [], () => {
    const settings: tsc.Settings = getCompilerSettings({
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
gulp.task(processDiagnosticMessagesJs, false, [], () => {
    const settings: tsc.Settings = getCompilerSettings({
        declaration: false,
        removeComments: true,
        noResolve: false,
        stripInternal: false,
        outFile: processDiagnosticMessagesJs
    }, /*useBuiltCompiler*/ false);
    return gulp.src(processDiagnosticMessagesTs)
        .pipe(newer(processDiagnosticMessagesJs))
        .pipe(sourcemaps.init())
        .pipe(tsc(settings))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("."));
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


const servicesFile = path.join(builtLocalDirectory, "typescriptServices.js");
const standaloneDefinitionsFile = path.join(builtLocalDirectory, "typescriptServices.d.ts");
const nodePackageFile = path.join(builtLocalDirectory, "typescript.js");
const nodeDefinitionsFile = path.join(builtLocalDirectory, "typescript.d.ts");
const nodeStandaloneDefinitionsFile = path.join(builtLocalDirectory, "typescript_standalone.d.ts");

let copyrightContent: string;
function prependCopyright(outputCopyright: boolean = !useDebugMode) {
    return insert.prepend(outputCopyright ? (copyrightContent || (copyrightContent = fs.readFileSync(copyright).toString())) : "");
}

gulp.task(builtLocalCompiler, false, [servicesFile], () => {
    const localCompilerProject = tsc.createProject("src/compiler/tsconfig.json", getCompilerSettings({}, /*useBuiltCompiler*/true));
    return localCompilerProject.src()
        .pipe(newer(builtLocalCompiler))
        .pipe(sourcemaps.init())
        .pipe(tsc(localCompilerProject))
        .pipe(prependCopyright())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(builtLocalDirectory));
});

gulp.task(servicesFile, false, ["lib", "generate-diagnostics"], () => {
    const servicesProject = tsc.createProject("src/services/tsconfig.json", getCompilerSettings({ removeComments: false }, /*useBuiltCompiler*/false));
    const {js, dts} = servicesProject.src()
        .pipe(newer(servicesFile))
        .pipe(sourcemaps.init())
        .pipe(tsc(servicesProject));
    const completedJs = js.pipe(prependCopyright())
        .pipe(sourcemaps.write("."));
    const completedDts = dts.pipe(prependCopyright(/*outputCopyright*/true))
        .pipe(insert.transform((contents, file) => {
            file.path = standaloneDefinitionsFile;
            return contents.replace(/^(\s*)(export )?const enum (\S+) {(\s*)$/gm, "$1$2enum $3 {$4");
        }));
    return merge2([
        completedJs,
        completedJs.pipe(clone())
            .pipe(insert.transform((content, file) => (file.path = nodePackageFile, content))),
        completedDts,
        completedDts.pipe(clone())
            .pipe(insert.transform((content, file) => {
                file.path = nodeDefinitionsFile;
                return content + "\r\nexport = ts;";
            }))
            .pipe(gulp.dest(builtLocalDirectory)),
        completedDts.pipe(clone())
            .pipe(insert.transform((content, file) => {
                file.path = nodeStandaloneDefinitionsFile;
                return content.replace(/declare (namespace|module) ts/g, 'declare module "typescript"');
            }))
    ]).pipe(gulp.dest(builtLocalDirectory));
});

const serverFile = path.join(builtLocalDirectory, "tsserver.js");

gulp.task(serverFile, false, [servicesFile], () => {
    const serverProject = tsc.createProject("src/server/tsconfig.json", getCompilerSettings({}, /*useBuiltCompiler*/true));
    return serverProject.src()
        .pipe(newer(serverFile))
        .pipe(sourcemaps.init())
        .pipe(tsc(serverProject))
        .pipe(prependCopyright())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(builtLocalDirectory));
});

const tsserverLibraryFile = path.join(builtLocalDirectory, "tsserverlibrary.js");
const tsserverLibraryDefinitionFile = path.join(builtLocalDirectory, "tsserverlibrary.d.ts");

gulp.task(tsserverLibraryFile, false, [servicesFile], (done) => {
    const serverLibraryProject = tsc.createProject("src/server/tsconfig.library.json", getCompilerSettings({}, /*useBuiltCompiler*/ true));
    const {js, dts}: { js: NodeJS.ReadableStream, dts: NodeJS.ReadableStream } = serverLibraryProject.src()
        .pipe(sourcemaps.init())
        .pipe(newer(tsserverLibraryFile))
        .pipe(tsc(serverLibraryProject));

    return merge2([
        js.pipe(prependCopyright())
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest(builtLocalDirectory)),
        dts.pipe(prependCopyright())
            .pipe(gulp.dest(builtLocalDirectory))
    ]);
});

gulp.task("lssl", "Builds language service server library", [tsserverLibraryFile]);
gulp.task("local", "Builds the full compiler and services", [builtLocalCompiler, servicesFile, serverFile, builtGeneratedDiagnosticMessagesJSON, tsserverLibraryFile]);
gulp.task("tsc", "Builds only the compiler", [builtLocalCompiler]);


// Generate Markdown spec
const word2mdJs = path.join(scriptsDirectory, "word2md.js");
const word2mdTs = path.join(scriptsDirectory, "word2md.ts");
const specWord = path.join(docDirectory, "TypeScript Language Specification.docx");
const specMd = path.join(docDirectory, "spec.md");

gulp.task(word2mdJs, false, [], () => {
    const settings: tsc.Settings = getCompilerSettings({
        outFile: word2mdJs
    }, /*useBuiltCompiler*/ false);
    return gulp.src(word2mdTs)
        .pipe(newer(word2mdJs))
        .pipe(sourcemaps.init())
        .pipe(tsc(settings))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("."));
});

gulp.task(specMd, false, [word2mdJs], (done) => {
    const specWordFullPath = path.resolve(specWord);
    const specMDFullPath = path.resolve(specMd);
    const cmd = "cscript //nologo " + word2mdJs + " \"" + specWordFullPath + "\" " + "\"" + specMDFullPath + "\"";
    console.log(cmd);
    cp.exec(cmd, function() {
        done();
    });
});

gulp.task("generate-spec", "Generates a Markdown version of the Language Specification", [specMd]);

gulp.task("clean", "Cleans the compiler output, declare files, and tests", [], () => {
    return del([builtDirectory]);
});

gulp.task("useDebugMode", false, [], (done) => { useDebugMode = true; done(); });
gulp.task("dontUseDebugMode", false, [], (done) => { useDebugMode = false; done(); });

gulp.task("VerifyLKG", false, [], () => {
    const expectedFiles = [builtLocalCompiler, servicesFile, serverFile, nodePackageFile, nodeDefinitionsFile, standaloneDefinitionsFile, tsserverLibraryFile, tsserverLibraryDefinitionFile].concat(libraryTargets);
    const missingFiles = expectedFiles.filter(function(f) {
        return !fs.existsSync(f);
    });
    if (missingFiles.length > 0) {
        throw new Error("Cannot replace the LKG unless all built targets are present in directory " + builtLocalDirectory +
            ". The following files are missing:\n" + missingFiles.join("\n"));
    }
    // Copy all the targets into the LKG directory
    return gulp.src(expectedFiles).pipe(gulp.dest(LKGDirectory));
});

gulp.task("LKGInternal", false, ["lib", "local"]);

gulp.task("LKG", "Makes a new LKG out of the built js files", ["clean", "dontUseDebugMode"], () => {
    return runSequence("LKGInternal", "VerifyLKG");
});


// Task to build the tests infrastructure using the built compiler
const run = path.join(builtLocalDirectory, "run.js");
gulp.task(run, false, [servicesFile], () => {
    const testProject = tsc.createProject("src/harness/tsconfig.json", getCompilerSettings({}, /*useBuiltCompiler*/true));
    return testProject.src()
        .pipe(newer(run))
        .pipe(sourcemaps.init())
        .pipe(tsc(testProject))
        .pipe(sourcemaps.write(".", { includeContent: false, sourceRoot: "../../" }))
        .pipe(gulp.dest(builtLocalDirectory));
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

let savedNodeEnv: string;
function setNodeEnvToDevelopment() {
    savedNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";
}

function restoreSavedNodeEnv() {
    process.env.NODE_ENV = savedNodeEnv;
}

let testTimeout = 40000;
function runConsoleTests(defaultReporter: string, runInParallel: boolean, done: (e?: any) => void) {
    const lintFlag = cmdLineOptions["lint"];
    cleanTestDirs((err) => {
        if (err) { console.error(err); failWithStatus(err, 1); }
        const debug = cmdLineOptions["debug"];
        const tests = cmdLineOptions["tests"];
        const light = cmdLineOptions["light"];
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

            workerCount = process.env.workerCount || os.cpus().length;
        }

        if (tests || light || taskConfigsFolder) {
            writeTestConfigFile(tests, light, taskConfigsFolder, workerCount);
        }

        if (tests && tests.toLocaleLowerCase() === "rwc") {
            testTimeout = 400000;
        }

        const colors = cmdLineOptions["colors"];
        const reporter = cmdLineOptions["reporter"] || defaultReporter;

        // timeout normally isn"t necessary but Travis-CI has been timing out on compiler baselines occasionally
        // default timeout is 2sec which really should be enough, but maybe we just need a small amount longer
        if (!runInParallel) {
            const args = [];
            if (debug) {
                args.push("--debug-brk");
            }
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
            args.push("-t", testTimeout);
            args.push(run);
            setNodeEnvToDevelopment();
            exec(mocha, args, lintThenFinish, function(e, status) {
                finish(e, status);
            });

        }
        else {
            // run task to load all tests and partition them between workers
            const args = [];
            args.push("-R", "min");
            if (colors) {
                args.push("--colors");
            }
            else {
                args.push("--no-colors");
            }
            args.push(run);
            setNodeEnvToDevelopment();
            runTestsInParallel(taskConfigsFolder, run, { testTimeout: testTimeout, noColors: colors === " --no-colors " }, function(err) {
                // last worker clean everything and runs linter in case if there were no errors
                del(taskConfigsFolder).then(() => {
                    if (!err) {
                        lintThenFinish();
                    }
                    else {
                        finish(err);
                    }
                });
            });
        }
    });

    function failWithStatus(err?: any, status?: number) {
        if (err) {
            console.log(err);
        }
        done(err || status);
        process.exit(status);
    }

    function lintThenFinish() {
        if (lintFlag) {
            runSequence("lint", finish);
        }
        else {
            finish();
        }
    }

    function finish(error?: any, errorStatus?: number) {
        restoreSavedNodeEnv();
        deleteTemporaryProjectOutput().then(() => {
            if (error !== undefined || errorStatus !== undefined) {
                failWithStatus(error, errorStatus);
            }
            else {
                done();
            }
        });
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
gulp.task(nodeServerOutFile, false, [servicesFile], () => {
    const settings: tsc.Settings = getCompilerSettings({ module: "commonjs" }, /*useBuiltCompiler*/ true);
    return gulp.src(nodeServerInFile)
        .pipe(newer(nodeServerOutFile))
        .pipe(sourcemaps.init())
        .pipe(tsc(settings))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(path.dirname(nodeServerOutFile)));
});

import convertMap = require("convert-source-map");
import sorcery = require("sorcery");
declare module "convert-source-map" {
    export function fromSource(source: string, largeSource?: boolean): SourceMapConverter;
}

gulp.task("browserify", "Runs browserify on run.js to produce a file suitable for running tests in the browser", [servicesFile], (done) => {
    const testProject = tsc.createProject("src/harness/tsconfig.json", getCompilerSettings({ outFile: "built/local/bundle.js" }, /*useBuiltCompiler*/ true));
    return testProject.src()
        .pipe(newer("built/local/bundle.js"))
        .pipe(sourcemaps.init())
        .pipe(tsc(testProject))
        .pipe(through2.obj((file, enc, next) => {
            const originalMap = file.sourceMap;
            const prebundledContent = file.contents.toString();
            // Make paths absolute to help sorcery deal with all the terrible paths being thrown around
            originalMap.sources = originalMap.sources.map(s => path.resolve("src", s));
            // intoStream (below) makes browserify think the input file is named this, so this is what it puts in the sourcemap
            originalMap.file = "built/local/_stream_0.js";

            browserify(intoStream(file.contents), { debug: true })
                .bundle((err, res) => {
                    // assumes file.contents is a Buffer
                    const maps = JSON.parse(convertMap.fromSource(res.toString(), /*largeSource*/true).toJSON());
                    delete maps.sourceRoot;
                    maps.sources = maps.sources.map(s => path.resolve(s === "_stream_0.js" ? "built/local/_stream_0.js" : s));
                    // Strip browserify's inline comments away (could probably just let sorcery do this, but then we couldn't fix the paths)
                    file.contents = new Buffer(convertMap.removeComments(res.toString()));
                    const chain = sorcery.loadSync("built/local/bundle.js", {
                        content: {
                            "built/local/_stream_0.js": prebundledContent,
                            "built/local/bundle.js": file.contents.toString()
                        },
                        sourcemaps: {
                            "built/local/_stream_0.js": originalMap,
                            "built/local/bundle.js": maps,
                        }
                    });
                    const finalMap = chain.apply();
                    file.sourceMap = finalMap;
                    next(undefined, file);
                });
        }))
        .pipe(sourcemaps.write(".", { includeContent: false }))
        .pipe(gulp.dest("."));
});


function cleanTestDirs(done: (e?: any) => void) {
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

// used to pass data from jake command line directly to run.js
function writeTestConfigFile(tests: string, light: boolean, taskConfigsFolder?: string, workerCount?: number) {
    const testConfigContents = JSON.stringify({ test: tests ? [tests] : undefined, light: light, workerCount: workerCount, taskConfigsFolder: taskConfigsFolder });
    console.log("Running tests with config: " + testConfigContents);
    fs.writeFileSync("test.config", testConfigContents);
}


gulp.task("runtests-browser", "Runs the tests using the built run.js file like 'gulp runtests'. Syntax is gulp runtests-browser. Additional optional parameters --tests=[regex], --browser=[chrome|IE]", ["browserify", nodeServerOutFile], (done) => {
    cleanTestDirs((err) => {
        if (err) { console.error(err); done(err); process.exit(1); }
        host = "node";
        const tests = cmdLineOptions["tests"];
        const light = cmdLineOptions["light"];
        const testConfigFile = "test.config";
        if (fs.existsSync(testConfigFile)) {
            fs.unlinkSync(testConfigFile);
        }
        if (tests || light) {
            writeTestConfigFile(tests, light);
        }

        const args = [nodeServerOutFile];
        if (cmdLineOptions["browser"]) {
            args.push(cmdLineOptions["browser"]);
        }
        if (tests) {
            args.push(JSON.stringify(tests));
        }
        exec(host, args, done, done);
    });
});

gulp.task("generate-code-coverage", "Generates code coverage data via istanbul", ["tests"], (done) => {
    exec("istanbul", ["cover", "node_modules/mocha/bin/_mocha", "--", "-R", "min", "-t", testTimeout.toString(), run], done, done);
});


function getDiffTool() {
    const program = process.env["DIFF"];
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
gulp.task(webhostJsPath, false, [servicesFile], () => {
    const settings: tsc.Settings = getCompilerSettings({
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
gulp.task(perftscJsPath, false, [servicesFile], () => {
    const settings: tsc.Settings = getCompilerSettings({
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
gulp.task(loggedIOJsPath, false, [], (done) => {
    const temp = path.join(builtLocalDirectory, "temp");
    mkdirP(temp, (err) => {
        if (err) { console.error(err); done(err); process.exit(1); };
        exec(host, [LKGCompiler, "--outdir", temp, loggedIOpath], () => {
            fs.renameSync(path.join(temp, "/harness/loggedIO.js"), loggedIOJsPath);
            del(temp).then(() => done(), done);
        }, done);
    });
});

const instrumenterPath = path.join(harnessDirectory, "instrumenter.ts");
const instrumenterJsPath = path.join(builtLocalDirectory, "instrumenter.js");
gulp.task(instrumenterJsPath, false, [servicesFile], () => {
    const settings: tsc.Settings = getCompilerSettings({
        outFile: instrumenterJsPath
    }, /*useBuiltCompiler*/ true);
    return gulp.src(instrumenterPath)
        .pipe(newer(instrumenterJsPath))
        .pipe(sourcemaps.init())
        .pipe(tsc(settings))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("."));
});

gulp.task("tsc-instrumented", "Builds an instrumented tsc.js", [loggedIOJsPath, instrumenterJsPath, servicesFile], (done) => {
    exec(host, [instrumenterJsPath, "record", "iocapture", builtLocalDirectory, compilerFilename], done, done);
});

gulp.task("update-sublime", "Updates the sublime plugin's tsserver", ["local", serverFile], () => {
    return gulp.src([serverFile, serverFile + ".map"]).pipe(gulp.dest("../TypeScript-Sublime-Plugin/tsserver/"));
});

gulp.task("build-rules", "Compiles tslint rules to js", () => {
    const settings: tsc.Settings = getCompilerSettings({ module: "commonjs" }, /*useBuiltCompiler*/ false);
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

const lintTargets = [
    "Gulpfile.ts",
    "src/compiler/**/*.ts",
    "src/harness/**/*.ts",
    "!src/harness/unittests/services/formatting/**/*.ts",
    "src/server/**/*.ts",
    "scripts/tslint/**/*.ts",
    "src/services/**/*.ts",
    "tests/*.ts", "tests/webhost/*.ts" // Note: does *not* descend recursively
];

function sendNextFile(files: {path: string}[], child: cp.ChildProcess, callback: (failures: number) => void, failures: number) {
    const file = files.pop();
    if (file) {
        console.log(`Linting '${file.path}'.`);
        child.send({ kind: "file", name: file.path });
    }
    else {
        child.send({ kind: "close" });
        callback(failures);
    }
}

function spawnLintWorker(files: {path: string}[], callback: (failures: number) => void) {
    const child = cp.fork("./scripts/parallel-lint");
    let failures = 0;
    child.on("message", function(data) {
        switch (data.kind) {
            case "result":
                if (data.failures > 0) {
                    failures += data.failures;
                    console.log(data.output);
                }
                sendNextFile(files, child, callback, failures);
                break;
            case "error":
                console.error(data.error);
                failures++;
                sendNextFile(files, child, callback, failures);
                break;
        }
    });
    sendNextFile(files, child, callback, failures);
}

gulp.task("lint", "Runs tslint on the compiler sources. Optional arguments are: --f[iles]=regex", ["build-rules"], () => {
    const fileMatcher = RegExp(cmdLineOptions["files"]);
    if (fold.isTravis()) console.log(fold.start("lint"));

    let files: {stat: fs.Stats, path: string}[] = [];
    return gulp.src(lintTargets, { read: false })
        .pipe(through2.obj((chunk, enc, cb) => {
            files.push(chunk);
            cb();
        }, (cb) => {
            files = files.filter(file =>  fileMatcher.test(file.path)).sort((filea, fileb) => filea.stat.size - fileb.stat.size);
            const workerCount = (process.env.workerCount && +process.env.workerCount) || os.cpus().length;
            for (let i = 0; i < workerCount; i++) {
                spawnLintWorker(files, finished);
            }

            let completed = 0;
            let failures = 0;
            function finished(fails) {
                completed++;
                failures += fails;
                if (completed === workerCount) {
                    if (fold.isTravis()) console.log(fold.end("lint"));
                    if (failures > 0) {
                        throw new Error(`Linter errors: ${failures}`);
                    }
                    else {
                        cb();
                    }
                }
            }
        }));
});


gulp.task("default", "Runs 'local'", ["local"]);

gulp.task("watch", "Watches the src/ directory for changes and executes runtests-parallel.", [], () => {
    gulp.watch("src/**/*.*", ["runtests-parallel"]);
});
