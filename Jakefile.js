// This file contains the build logic for the public repo
// @ts-check
/// <reference types="jake" />

const fs = require("fs");
const os = require("os");
const path = require("path");
const fold = require("travis-fold");
const ts = require("./lib/typescript");
const del = require("del");
const { getDirSize, needsUpdate, flatten } = require("./scripts/build/utils");
const { base64VLQFormatEncode } = require("./scripts/build/sourcemaps");

// add node_modules to path so we don't need global modules, prefer the modules by adding them first
var nodeModulesPathPrefix = path.resolve("./node_modules/.bin/") + path.delimiter;
if (process.env.path !== undefined) {
    process.env.path = nodeModulesPathPrefix + process.env.path;
}
else if (process.env.PATH !== undefined) {
    process.env.PATH = nodeModulesPathPrefix + process.env.PATH;
}

const host = process.env.TYPESCRIPT_HOST || process.env.host || "node";

const defaultTestTimeout = 40000;

let useDebugMode = true;

const TaskNames = {
    local: "local",
    runtests: "runtests",
    runtestsParallel: "runtests-parallel",
    buildRules: "build-rules",
    clean: "clean",
    lib: "lib",
    buildFoldStart: "build-fold-start",
    buildFoldEnd: "build-fold-end",
    generateDiagnostics: "generate-diagnostics",
    coreBuild: "core-build",
    tsc: "tsc",
    lkg: "LKG",
    release: "release",
    lssl: "lssl",
    lint: "lint",
    scripts: "scripts",
    localize: "localize",
    configureInsiders: "configure-insiders",
    publishInsiders: "publish-insiders",
    configureNightly: "configure-nightly",
    publishNightly: "publish-nightly",
    help: "help"
};

const Paths = {};
Paths.lkg = "lib";
Paths.lkgCompiler = "lib/tsc.js";
Paths.built = "built";
Paths.builtLocal = "built/local";
Paths.builtLocalCompiler = "built/local/tsc.js";
Paths.builtLocalTSServer = "built/local/tsserver.js";
Paths.builtLocalRun = "built/local/run.js";
Paths.releaseCompiler = "built/local/tsc.release.js";
Paths.typesMapOutput = "built/local/typesMap.json";
Paths.typescriptFile = "built/local/typescript.js";
Paths.servicesFile = "built/local/typescriptServices.js";
Paths.servicesDefinitionFile = "built/local/typescriptServices.d.ts";
Paths.servicesOutFile = "built/local/typescriptServices.out.js";
Paths.servicesDefinitionOutFile = "built/local/typescriptServices.out.d.ts";
Paths.typescriptDefinitionFile = "built/local/typescript.d.ts";
Paths.typescriptStandaloneDefinitionFile = "built/local/typescript_standalone.d.ts";
Paths.tsserverLibraryFile = "built/local/tsserverlibrary.js";
Paths.tsserverLibraryDefinitionFile = "built/local/tsserverlibrary.d.ts";
Paths.tsserverLibraryOutFile = "built/local/tsserverlibrary.out.js";
Paths.tsserverLibraryDefinitionOutFile = "built/local/tsserverlibrary.out.d.ts";
Paths.baselines = {};
Paths.baselines.local = "tests/baselines/local";
Paths.baselines.localTest262 = "tests/baselines/test262/local";
Paths.baselines.localRwc = "internal/baselines/rwc/local";
Paths.baselines.reference = "tests/baselines/reference";
Paths.baselines.referenceTest262 = "tests/baselines/test262/reference";
Paths.baselines.referenceRwc = "internal/baselines/rwc/reference";
Paths.copyright = "CopyrightNotice.txt";
Paths.thirdParty = "ThirdPartyNoticeText.txt";
Paths.processDiagnosticMessagesJs = "scripts/processDiagnosticMessages.js";
Paths.diagnosticInformationMap = "src/compiler/diagnosticInformationMap.generated.ts";
Paths.diagnosticMessagesJson = "src/compiler/diagnosticMessages.json";
Paths.diagnosticGeneratedJson = "src/compiler/diagnosticMessages.generated.json";
Paths.builtDiagnosticGeneratedJson = "built/local/diagnosticMessages.generated.json";
Paths.lcl = "src/loc/lcl"
Paths.locLcg = "built/local/enu/diagnosticMessages.generated.json.lcg";
Paths.generatedLCGFile = path.join(Paths.builtLocal, "enu", "diagnosticMessages.generated.json.lcg");
Paths.library = "src/lib";
Paths.srcServer = "src/server";
Paths.scripts = {};
Paths.scripts.generateLocalizedDiagnosticMessages = "scripts/generateLocalizedDiagnosticMessages.js";
Paths.scripts.processDiagnosticMessages = "scripts/processDiagnosticMessages.js";
Paths.scripts.produceLKG = "scripts/produceLKG.js";
Paths.scripts.configurePrerelease = "scripts/configurePrerelease.js";
Paths.packageJson = "package.json";
Paths.versionFile = "src/compiler/core.ts";

const ConfigFileFor = {
    tsc: "src/tsc",
    tscRelease: "src/tsc/tsconfig.release.json",
    tsserver: "src/tsserver",
    runjs: "src/testRunner",
    lint: "scripts/tslint",
    scripts: "scripts",
    all: "src",
    typescriptServices: "built/local/typescriptServices.tsconfig.json",
    tsserverLibrary: "built/local/tsserverlibrary.tsconfig.json",
};

const ExpectedLKGFiles = [
    "tsc.js",
    "tsserver.js",
    "typescriptServices.js",
    "typescriptServices.d.ts",
    "typescript.js",
    "typescript.d.ts",
    "cancellationToken.js",
    "typingsInstaller.js",
    "protocol.d.ts",
    "watchGuard.js"
];

directory(Paths.builtLocal);

// Local target to build the compiler and services
desc("Builds the full compiler and services");
task(TaskNames.local, [
    TaskNames.buildFoldStart,
    TaskNames.coreBuild,
    Paths.servicesDefinitionFile,
    Paths.typescriptFile,
    Paths.typescriptDefinitionFile,
    Paths.typescriptStandaloneDefinitionFile,
    Paths.tsserverLibraryDefinitionFile,
    TaskNames.localize,
    TaskNames.buildFoldEnd
]);

task("default", [TaskNames.local]);

const RunTestsPrereqs = [TaskNames.lib, Paths.servicesDefinitionFile, Paths.typescriptDefinitionFile, Paths.tsserverLibraryDefinitionFile];
desc("Runs all the tests in parallel using the built run.js file. Optional arguments are: t[ests]=category1|category2|... i[nspect]=true.");
task(TaskNames.runtestsParallel, RunTestsPrereqs, function () {
    tsbuild([ConfigFileFor.runjs], true, () => {
        runConsoleTests("min", /*parallel*/ true);
    });
}, { async: true });

desc("Runs all the tests in parallel using the built run.js file. Optional arguments are: t[ests]=category1|category2|... i[nspect]=true.");
task(TaskNames.runtests, RunTestsPrereqs, function () {
    tsbuild([ConfigFileFor.runjs], true, () => {
        runConsoleTests('mocha-fivemat-progress-reporter', /*runInParallel*/ false);
    });
}, { async: true });

desc("Generates a diagnostic file in TypeScript based on an input JSON file");
task(TaskNames.generateDiagnostics, [Paths.diagnosticInformationMap]);

const libraryTargets = getLibraryTargets();
desc("Builds the library targets");
task(TaskNames.lib, libraryTargets);

desc("Builds internal scripts");
task(TaskNames.scripts, [TaskNames.coreBuild], function() {
    tsbuild([ConfigFileFor.scripts], true, () => {
        complete();
    });
}, { async: true });

task(Paths.releaseCompiler, function () {
    tsbuild([ConfigFileFor.tscRelease], true, () => {
        complete();
    });
}, { async: true });

// Makes a new LKG. This target does not build anything, but errors if not all the outputs are present in the built/local directory
desc("Makes a new LKG out of the built js files");
task(TaskNames.lkg, [
    TaskNames.scripts,
    TaskNames.release,
    TaskNames.local,
    Paths.servicesDefinitionFile,
    Paths.typescriptFile,
    Paths.typescriptDefinitionFile,
    Paths.typescriptStandaloneDefinitionFile,
    Paths.tsserverLibraryDefinitionFile,
    Paths.releaseCompiler,
    ...libraryTargets
], () => {
    const sizeBefore = getDirSize(Paths.lkg);

    exec(`${host} ${Paths.scripts.produceLKG}`, () => {
        const sizeAfter = getDirSize(Paths.lkg);
        if (sizeAfter > (sizeBefore * 1.10)) {
            throw new Error("The lib folder increased by 10% or more. This likely indicates a bug.");
        }

        complete();
    });
}, { async: true });

desc("Makes the most recent test results the new baseline, overwriting the old baseline");
task("baseline-accept", function () {
    acceptBaseline(Paths.baselines.local, Paths.baselines.reference);
});

desc("Makes the most recent rwc test results the new baseline, overwriting the old baseline");
task("baseline-accept-rwc", function () {
    acceptBaseline(Paths.baselines.localRwc, Paths.baselines.referenceRwc);
});

desc("Makes the most recent test262 test results the new baseline, overwriting the old baseline");
task("baseline-accept-test262", function () {
    acceptBaseline(Paths.baselines.localTest262, Paths.baselines.referenceTest262);
});

desc("Runs tslint on the compiler sources. Optional arguments are: f[iles]=regex");
task(TaskNames.lint, [TaskNames.buildRules], () => {
    if (fold.isTravis()) console.log(fold.start("lint"));
    function lint(project, cb) {
        const fix = process.env.fix || process.env.f;
        const cmd = `node node_modules/tslint/bin/tslint --project ${project} --formatters-dir ./built/local/tslint/formatters --format autolinkableStylish${fix ? " --fix" : ""}`;
        exec(cmd, cb);
    }
    lint("scripts/tslint/tsconfig.json", () => lint("src/tsconfig-base.json", () => {
        if (fold.isTravis()) console.log(fold.end("lint"));
        complete();
    }));
}, { async: true });

desc("Diffs the compiler baselines using the diff tool specified by the 'DIFF' environment variable");
task('diff', function () {
    var cmd = `"${getDiffTool()}" ${Paths.baselines.reference} ${Paths.baselines.local}`;
    exec(cmd);
}, { async: true });

desc("Diffs the RWC baselines using the diff tool specified by the 'DIFF' environment variable");
task('diff-rwc', function () {
    var cmd = `"${getDiffTool()}" ${Paths.baselines.referenceRwc} ${Paths.baselines.localRwc}`;
    exec(cmd);
}, { async: true });

task(TaskNames.configureNightly, [TaskNames.scripts], function () {
    const cmd = `${host} ${Paths.scripts.configurePrerelease} dev ${Paths.packageJson} ${Paths.versionFile}`;
    exec(cmd, () => complete());
}, { async: true });

desc("Configure, build, test, and publish the nightly release.");
task(TaskNames.publishNightly, [TaskNames.coreBuild, TaskNames.configureNightly, TaskNames.lkg, "setDebugMode", "runtests-parallel"], function () {
    var cmd = "npm publish --tag next";
    exec(cmd, () => complete());
}, { async: true });

task(TaskNames.help, function() {
    var cmd = "jake --tasks";
    exec(cmd, () => complete());
})

task(TaskNames.configureInsiders, [TaskNames.scripts], function () {
    const cmd = `${host} ${Paths.scripts.configurePrerelease} insiders ${Paths.packageJson} ${Paths.versionFile}`;
    exec(cmd, () => complete());
}, { async: true });

desc("Configure, build, test, and publish the insiders release.");
task(TaskNames.publishInsiders, [TaskNames.coreBuild, TaskNames.configureInsiders, TaskNames.lkg, "setDebugMode", "runtests-parallel"], function () {
    var cmd = "npm publish --tag insiders";
    exec(cmd, () => complete());
}, { async: true });

desc("Sets the release mode flag");
task("release", function () {
    useDebugMode = false;
});

desc("Clears the release mode flag");
task("setDebugMode", function () {
    useDebugMode = true;
});

desc("Generates localized diagnostic messages");
task(TaskNames.localize, [Paths.generatedLCGFile]);

desc("Emit the start of the build fold");
task(TaskNames.buildFoldStart, [], function () {
    if (fold.isTravis()) console.log(fold.start("build"));
});

desc("Emit the end of the build fold");
task(TaskNames.buildFoldEnd, [], function () {
    if (fold.isTravis()) console.log(fold.end("build"));
});

desc("Compiles tslint rules to js");
task(TaskNames.buildRules, [], function () {
    tsbuild(ConfigFileFor.lint, false, () => complete());
}, { async: true });

desc("Cleans the compiler output, declare files, and tests");
task(TaskNames.clean, function () {
    jake.rmRf(Paths.built);
});

desc("Generates the LCG file for localization");
task("localize", [Paths.generatedLCGFile]);

task(TaskNames.tsc, [Paths.diagnosticInformationMap, TaskNames.lib], function () {
    tsbuild(ConfigFileFor.tsc, true, () => {
        complete();
    });
}, { async: true });

task(TaskNames.coreBuild, [Paths.diagnosticInformationMap, TaskNames.lib], function () {
    tsbuild(ConfigFileFor.all, true, () => {
        complete();
    });
}, { async: true });

file(Paths.diagnosticMessagesJson);

file(Paths.typesMapOutput, /** @type {*} */(function () {
    var content = readFileSync(path.join(Paths.srcServer, 'typesMap.json'));
    // Validate that it's valid JSON
    try {
        JSON.parse(content);
    } catch (e) {
        console.log("Parse error in typesMap.json: " + e);
    }
    fs.writeFileSync(Paths.typesMapOutput, content);
}));

file(Paths.builtDiagnosticGeneratedJson, [Paths.diagnosticGeneratedJson], function () {
    if (fs.existsSync(Paths.builtLocal)) {
        jake.cpR(Paths.diagnosticGeneratedJson, Paths.builtDiagnosticGeneratedJson);
    }
});

// Localized diagnostics
file(Paths.generatedLCGFile, [TaskNames.scripts, Paths.diagnosticInformationMap, Paths.diagnosticGeneratedJson], function () {
    const cmd = `${host} ${Paths.scripts.generateLocalizedDiagnosticMessages} ${Paths.lcl} ${Paths.builtLocal} ${Paths.diagnosticGeneratedJson}`
    exec(cmd, complete);
}, { async: true });


// The generated diagnostics map; built for the compiler and for the 'generate-diagnostics' task
file(Paths.diagnosticInformationMap, [Paths.diagnosticMessagesJson], function () {
    tsbuild(ConfigFileFor.scripts, true, () => {
        const cmd = `${host} ${Paths.scripts.processDiagnosticMessages} ${Paths.diagnosticMessagesJson}`;
        exec(cmd, complete);
    });
}, { async: true });

file(ConfigFileFor.tsserverLibrary, [], function () {
    flatten("src/tsserver/tsconfig.json", ConfigFileFor.tsserverLibrary, {
        exclude: ["src/tsserver/server.ts"],
        compilerOptions: {
            "removeComments": false,
            "stripInternal": true,
            "declaration": true,
            "outFile": "tsserverlibrary.out.js"
        }
    })
});

// tsserverlibrary.js
// tsserverlibrary.d.ts
file(Paths.tsserverLibraryFile, [TaskNames.coreBuild, ConfigFileFor.tsserverLibrary], function() {
    tsbuild(ConfigFileFor.tsserverLibrary, false, () => {
        if (needsUpdate([Paths.tsserverLibraryOutFile, Paths.tsserverLibraryDefinitionOutFile], [Paths.tsserverLibraryFile, Paths.tsserverLibraryDefinitionFile])) {
            const copyright = readFileSync(Paths.copyright);

            let libraryDefinitionContent = readFileSync(Paths.tsserverLibraryDefinitionOutFile);
            libraryDefinitionContent = copyright + removeConstModifierFromEnumDeclarations(libraryDefinitionContent);
            libraryDefinitionContent += "\nexport = ts;\nexport as namespace ts;";
            fs.writeFileSync(Paths.tsserverLibraryDefinitionFile, libraryDefinitionContent, "utf8");

            let libraryContent = readFileSync(Paths.tsserverLibraryOutFile);
            libraryContent = copyright + libraryContent;
            fs.writeFileSync(Paths.tsserverLibraryFile, libraryContent, "utf8");

            // adjust source map for tsserverlibrary.js
            let libraryMapContent = readFileSync(Paths.tsserverLibraryOutFile + ".map");
            const map = JSON.parse(libraryMapContent);
            const lineStarts = /**@type {*}*/(ts).computeLineStarts(copyright);
            let prependMappings = "";
            for (let i = 1; i < lineStarts.length; i++) {
                prependMappings += ";";
            }

            const offset = copyright.length - lineStarts[lineStarts.length - 1];
            if (offset > 0) {
                prependMappings += base64VLQFormatEncode(offset) + ",";
            }

            const outputMap = {
                version: map.version,
                file: map.file,
                sources: map.sources,
                sourceRoot: map.sourceRoot,
                mappings: prependMappings + map.mappings,
                names: map.names,
                sourcesContent: map.sourcesContent
            };

            libraryMapContent = JSON.stringify(outputMap);
            fs.writeFileSync(Paths.tsserverLibraryFile + ".map", libraryMapContent);
        }
        complete();
    });
}, { async: true });
task(Paths.tsserverLibraryDefinitionFile, [Paths.tsserverLibraryFile]);

file(ConfigFileFor.typescriptServices, [], function () {
    flatten("src/services/tsconfig.json", ConfigFileFor.typescriptServices, {
        compilerOptions: {
            "removeComments": false,
            "stripInternal": true,
            "declarationMap": false,
            "outFile": "typescriptServices.out.js"
        }
    });
});

// typescriptServices.js
// typescriptServices.d.ts
file(Paths.servicesFile, [TaskNames.coreBuild, ConfigFileFor.typescriptServices], function() {
    tsbuild(ConfigFileFor.typescriptServices, false, () => {
        if (needsUpdate([Paths.servicesOutFile, Paths.servicesDefinitionOutFile], [Paths.servicesFile, Paths.servicesDefinitionFile])) {
            const copyright = readFileSync(Paths.copyright);

            let servicesDefinitionContent = readFileSync(Paths.servicesDefinitionOutFile);
            servicesDefinitionContent = copyright + removeConstModifierFromEnumDeclarations(servicesDefinitionContent);
            fs.writeFileSync(Paths.servicesDefinitionFile, servicesDefinitionContent, "utf8");

            let servicesContent = readFileSync(Paths.servicesOutFile);
            servicesContent = copyright + servicesContent;
            fs.writeFileSync(Paths.servicesFile, servicesContent, "utf8");

            // adjust source map for typescriptServices.js
            let servicesMapContent = readFileSync(Paths.servicesOutFile + ".map");
            const map = JSON.parse(servicesMapContent);
            const lineStarts = /**@type {*}*/(ts).computeLineStarts(copyright);
            let prependMappings = "";
            for (let i = 1; i < lineStarts.length; i++) {
                prependMappings += ";";
            }

            const offset = copyright.length - lineStarts[lineStarts.length - 1];
            if (offset > 0) {
                prependMappings += base64VLQFormatEncode(offset) + ",";
            }

            const outputMap = {
                version: map.version,
                file: map.file,
                sources: map.sources,
                sourceRoot: map.sourceRoot,
                mappings: prependMappings + map.mappings,
                names: map.names,
                sourcesContent: map.sourcesContent
            };

            servicesMapContent = JSON.stringify(outputMap);
            fs.writeFileSync(Paths.servicesFile + ".map", servicesMapContent);
        }

        complete();
    });
}, { async: true });
task(Paths.servicesDefinitionFile, [Paths.servicesFile]);

// typescript.js
// typescript.d.ts
file(Paths.typescriptFile, [Paths.servicesFile], function() {
    if (needsUpdate([Paths.servicesFile, Paths.servicesDefinitionFile], [Paths.typescriptFile, Paths.typescriptDefinitionFile])) {
        jake.cpR(Paths.servicesFile, Paths.typescriptFile);
        if (fs.existsSync(Paths.servicesFile + ".map")) {
            jake.cpR(Paths.servicesFile + ".map", Paths.typescriptFile + ".map");
        }
        const content = readFileSync(Paths.servicesDefinitionFile);
        fs.writeFileSync(Paths.typescriptDefinitionFile, content + "\r\nexport = ts;", { encoding: "utf-8" });
    }
});
task(Paths.typescriptDefinitionFile, [Paths.typescriptFile]);

// typescript_standalone.d.ts
file(Paths.typescriptStandaloneDefinitionFile, [Paths.servicesDefinitionFile], function() {
    if (needsUpdate(Paths.servicesDefinitionFile, Paths.typescriptStandaloneDefinitionFile)) {
        const content = readFileSync(Paths.servicesDefinitionFile);
        fs.writeFileSync(Paths.typescriptStandaloneDefinitionFile, content.replace(/declare (namespace|module) ts(\..+)? \{/g, 'declare module "typescript" {'), { encoding: "utf-8"});
    }
});

function getLibraryTargets() {
    /** @type {{ libs: string[], paths?: Record<string, string>, sources?: Record<string, string[]> }} */
    const libraries = readJson("./src/lib/libs.json");
    return libraries.libs.map(function (lib) {
        const relativeSources = ["header.d.ts"].concat(libraries.sources && libraries.sources[lib] || [lib + ".d.ts"]);
        const relativeTarget = libraries.paths && libraries.paths[lib] || ("lib." + lib + ".d.ts");
        const sources = [Paths.copyright].concat(relativeSources.map(s => path.join(Paths.library, s)));
        const target = path.join(Paths.builtLocal, relativeTarget);
        file(target, [Paths.builtLocal].concat(sources), function () {
            concatenateFiles(target, sources);
        });
        return target;
    });
}

function runConsoleTests(defaultReporter, runInParallel) {
    var dirty = process.env.dirty;
    if (!dirty) {
        cleanTestDirs();
    }

    let testTimeout = process.env.timeout || defaultTestTimeout;
    const inspect = process.env.inspect || process.env["inspect-brk"] || process.env.i;
    const runners = process.env.runners || process.env.runner || process.env.ru;
    const tests = process.env.test || process.env.tests || process.env.t;
    const light = process.env.light === undefined || process.env.light !== "false";
    const failed = process.env.failed;
    const keepFailed = process.env.keepFailed || failed;
    const stackTraceLimit = process.env.stackTraceLimit;
    const colorsFlag = process.env.color || process.env.colors;
    const colors = colorsFlag !== "false" && colorsFlag !== "0";
    const reporter = process.env.reporter || process.env.r || defaultReporter;
    const bail = process.env.bail || process.env.b;
    const lintFlag = process.env.lint !== 'false';
    const testConfigFile = 'test.config';

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

        workerCount = process.env.workerCount || process.env.p || os.cpus().length;
    }

    if (tests && tests.toLocaleLowerCase() === "rwc") {
        testTimeout = 800000;
    }

    if (tests || runners || light || testTimeout || taskConfigsFolder || keepFailed) {
        writeTestConfigFile(tests, runners, light, taskConfigsFolder, workerCount, stackTraceLimit, colors, testTimeout, keepFailed);
    }

    // timeout normally isn't necessary but Travis-CI has been timing out on compiler baselines occasionally
    // default timeout is 2sec which really should be enough, but maybe we just need a small amount longer
    if (!runInParallel) {
        var startTime = Travis.mark();
        var args = [];
        args.push("-R", "scripts/failed-tests");
        args.push("-O", '"reporter=' + reporter + (keepFailed ? ",keepFailed=true" : "") + '"');
        if (tests) args.push("-g", `"${tests}"`);
        args.push(colors ? "--colors" : "--no-colors");
        if (bail) args.push("--bail");
        if (inspect) {
            args.unshift("--inspect-brk");
        } else {
            args.push("-t", testTimeout);
        }
        args.push(Paths.builtLocalRun);

        var cmd;
        if (failed) {
            args.unshift("scripts/run-failed-tests.js");
            cmd = host + " " + args.join(" ");
        }
        else {
            cmd = "mocha " + args.join(" ");
        }
        var savedNodeEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = "development";
        exec(cmd, function () {
            process.env.NODE_ENV = savedNodeEnv;
            Travis.measure(startTime);
            runLinterAndComplete();
        }, function (e, status) {
            process.env.NODE_ENV = savedNodeEnv;
            Travis.measure(startTime);
            finish(status);
        });
    }
    else {
        var savedNodeEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = "development";
        var startTime = Travis.mark();
        const cmd = `${host} ${Paths.builtLocalRun}`;
        exec(cmd, function () {
            // Tests succeeded; run 'lint' task
            process.env.NODE_ENV = savedNodeEnv;
            Travis.measure(startTime);
            runLinterAndComplete();
        }, function (e, status) {
            // Tests failed
            process.env.NODE_ENV = savedNodeEnv;
            Travis.measure(startTime);
            finish(status);
        });
    }

    function finish(errorStatus) {
        deleteTemporaryProjectOutput();
        if (errorStatus !== undefined) {
            fail("Process exited with code " + errorStatus);
        }
        else {
            complete();
        }
    }

    function runLinterAndComplete() {
        if (!lintFlag || dirty) {
            return finish();
        }
        var lint = jake.Task['lint'];
        lint.once('complete', function () {
            finish();
        });
        lint.invoke();
    }

    function deleteTemporaryProjectOutput() {
        if (fs.existsSync(path.join(Paths.baselines.local, "projectOutput/"))) {
            jake.rmRf(path.join(Paths.baselines.local, "projectOutput/"));
        }
    }
}

// used to pass data from jake command line directly to run.js
function writeTestConfigFile(tests, runners, light, taskConfigsFolder, workerCount, stackTraceLimit, colors, testTimeout, keepFailed) {
    var testConfigContents = JSON.stringify({
        runners: runners ? runners.split(",") : undefined,
        test: tests ? [tests] : undefined,
        light: light,
        workerCount: workerCount,
        taskConfigsFolder: taskConfigsFolder,
        stackTraceLimit: stackTraceLimit,
        noColor: !colors,
        timeout: testTimeout,
        keepFailed: keepFailed
    });
    fs.writeFileSync('test.config', testConfigContents, { encoding: "utf-8" });
}

function cleanTestDirs() {
    // Clean the local baselines directory
    if (fs.existsSync(Paths.baselines.local)) {
        del.sync(Paths.baselines.local);
    }

    // Clean the local Rwc baselines directory
    if (fs.existsSync(Paths.baselines.localRwc)) {
        del.sync(Paths.baselines.localRwc);
    }

    jake.mkdirP(Paths.baselines.local);
    jake.mkdirP(Paths.baselines.localTest262);
}

function tsbuild(tsconfigPath, useLkg = true, done = undefined) {
    const startCompileTime = Travis.mark();
    const compilerPath = useLkg ? Paths.lkgCompiler : Paths.builtLocalCompiler;
    const cmd = `${host} ${compilerPath} -b ${Array.isArray(tsconfigPath) ? tsconfigPath.join(" ") : tsconfigPath}`;

    exec(cmd, () => {
        // Success
        Travis.measure(startCompileTime);
        done ? done() : complete();
    }, () => {
        // Fail
        Travis.measure(startCompileTime);
        fail(`Compilation of ${tsconfigPath} unsuccessful`);
    });
}

const Travis = {
    mark() {
        if (!fold.isTravis()) return;
        var stamp = process.hrtime();
        var id = Math.floor(Math.random() * 0xFFFFFFFF).toString(16);
        console.log("travis_time:start:" + id + "\r");
        return {
            stamp: stamp,
            id: id
        };
    },
    measure(marker) {
        if (!fold.isTravis()) return;
        var diff = process.hrtime(marker.stamp);
        var total = [marker.stamp[0] + diff[0], marker.stamp[1] + diff[1]];
        console.log("travis_time:end:" + marker.id + ":start=" + toNs(marker.stamp) + ",finish=" + toNs(total) + ",duration=" + toNs(diff) + "\r");
    }
};

function toNs(diff) {
    return diff[0] * 1e9 + diff[1];
}

function exec(cmd, successHandler, errorHandler) {
    var ex = jake.createExec([cmd], /** @type {jake.ExecOptions} */({ windowsVerbatimArguments: true, interactive: true }));
    // Add listeners for output and error
    ex.addListener("stdout", function (output) {
        process.stdout.write(output);
    });
    ex.addListener("stderr", function (error) {
        process.stderr.write(error);
    });
    ex.addListener("cmdEnd", function () {
        if (successHandler) {
            successHandler();
        }
    });
    ex.addListener("error", function (e, status) {
        if (errorHandler) {
            errorHandler(e, status);
        }
        else {
            fail("Process exited with code " + status);
        }
    });

    console.log(cmd);
    ex.run();
}

function acceptBaseline(sourceFolder, targetFolder) {
    console.log('Accept baselines from ' + sourceFolder + ' to ' + targetFolder);
    var deleteEnding = '.delete';

    jake.mkdirP(targetFolder);
    acceptBaselineFolder(sourceFolder, targetFolder);

    function acceptBaselineFolder(sourceFolder, targetFolder) {
        var files = fs.readdirSync(sourceFolder);

        for (var i in files) {
            var filename = files[i];
            var fullLocalPath = path.join(sourceFolder, filename);
            var stat = fs.statSync(fullLocalPath);
            if (stat.isFile()) {
                if (filename.substr(filename.length - deleteEnding.length) === deleteEnding) {
                    filename = filename.substr(0, filename.length - deleteEnding.length);
                    fs.unlinkSync(path.join(targetFolder, filename));
                }
                else {
                    var target = path.join(targetFolder, filename);
                    if (fs.existsSync(target)) {
                        fs.unlinkSync(target);
                    }
                    jake.mkdirP(path.dirname(target));
                    fs.renameSync(path.join(sourceFolder, filename), target);
                }
            }
            else if (stat.isDirectory()) {
                acceptBaselineFolder(fullLocalPath, path.join(targetFolder, filename));
            }
        }
    }
}

/** @param jsonPath {string} */
function readJson(jsonPath) {
    const jsonText = readFileSync(jsonPath);
    const result = ts.parseConfigFileTextToJson(jsonPath, jsonText);
    if (result.error) {
        reportDiagnostics([result.error]);
        throw new Error("An error occurred during parse.");
    }
    return result.config;
}

/** @param diagnostics {ts.Diagnostic[]} */
function reportDiagnostics(diagnostics) {
    console.log(diagnosticsToString(diagnostics, process.stdout.isTTY));
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

/**
 * Concatenate a list of sourceFiles to a destinationFile
 * @param {string} destinationFile
 * @param {string[]} sourceFiles
 * @param {string=} extraContent
 */
function concatenateFiles(destinationFile, sourceFiles, extraContent) {
    var temp = "temptemp";
    // append all files in sequence
    var text = "";
    for (var i = 0; i < sourceFiles.length; i++) {
        if (!fs.existsSync(sourceFiles[i])) {
            fail(sourceFiles[i] + " does not exist!");
        }
        if (i > 0) { text += "\n\n"; }
        text += readFileSync(sourceFiles[i]).replace(/\r?\n/g, "\n");
    }
    if (extraContent) {
        text += extraContent;
    }
    fs.writeFileSync(temp, text);
    // Move the file to the final destination
    fs.renameSync(temp, destinationFile);
}

function appendToFile(path, content) {
    fs.writeFileSync(path, readFileSync(path) + "\r\n" + content);
}

/**
 *
 * @param {string} path
 * @returns string
 */
function readFileSync(path) {
    return fs.readFileSync(path, { encoding: "utf-8" });
}

function getDiffTool() {
    var program = process.env['DIFF'];
    if (!program) {
        fail("Add the 'DIFF' environment variable to the path of the program you want to use.");
    }
    return program;
}

/**
 * Replaces const enum declarations with non-const enums
 * @param {string} text
 */
function removeConstModifierFromEnumDeclarations(text) {
    return text.replace(/^(\s*)(export )?const enum (\S+) {(\s*)$/gm, '$1$2enum $3 {$4');
}