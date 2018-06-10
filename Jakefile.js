// This file contains the build logic for the public repo
// @ts-check
/// <reference types="jake" />

const fs = require("fs");
const os = require("os");
const path = require("path");
const child_process = require("child_process");
const removeInternal = require("remove-internal");
const fold = require("travis-fold");
const ts = require("./lib/typescript");
const del = require("del");
const getDirSize = require("./scripts/build/getDirSize");

const host = process.env.TYPESCRIPT_HOST || process.env.host || "node";

const locales = ["cs", "de", "es", "fr", "it", "ja", "ko", "pl", "pt-br", "ru", "tr", "zh-cn", "zh-tw"];

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
    lkg: "LKG",
    release: "release",
    lssl: "lssl",
    lint: "lint"
};

const Paths = {
    lkg: "lib",
    lkgCompiler: "lib/tsc.js",

    built: "built",
    builtLocal: "built/local",
    builtLocalCompiler: "built/local/tsc.js",
    builtLocalRun: "built/local/run.js",
    locLcg: "built/local/enu/diagnosticMessages.generated.json.lcg",
    typesMapOutput: "built/local/typesMap.json",
    servicesFile: "built/local/typescriptServices.js",
    servicesDefinitionFile: "built/local/typescriptServices.d.ts",

    tsserverLibraryFile: "built/local/tsserverlibrary.js",
    tsserverLibraryDefinitionFile: "built/local/tsserverlibrary.d.ts",

    baselines: {
        local: "tests/baselines/local",
        localTest262: "tests/baselines/test262/local",
        localRwc: "tests/baselines/rwc/local",
        reference: "tests/baselines/reference",
        referenceTest262: "tests/baselines/test262/reference",
        referenceRwc: "tests/baselines/rwc/reference"
    },
    copyright: "CopyrightNotice.txt",
    thirdParty: "ThirdPartyNoticeText.txt",
    library: "src/lib",

    processDiagnosticMessagesJs: "scripts/processDiagnosticMessages.js",
    diagnosticInformationMap: "src/parser/diagnosticInformationMap.generated.ts",
    diagnosticMessagesJson: "src/parser/diagnosticMessages.json",

    srcServer: "src/server",

};

const ConfigFileFor = {
    tsc: "src/tsc",
    tsserver: "src/tsserver",
    runjs: "src/testRunner",
    lint: "scripts/tslint",
    all: "src"
};

const ExpectedLKGFiles = [
    "tsc.js",
    "tsserver.js",
    "typescriptServices.js",
    "typescriptServices.d.ts",
    "typescript.js",
    "typescript.d.ts",
    "tsserverlibrary.js",
    "tsserverlibrary.d.js",
    "cancellationToken.js",
    "typingsInstaller.js",
    "protocol.d.ts",
    "watchGuard.js"
];

/** @type {{ libs: string[], paths?: Record<string, string>, sources?: Record<string, string[]> }} */
const libraries = readJson("./src/lib/libs.json");

directory(Paths.builtLocal);

// Local target to build the compiler and services
desc("Builds the full compiler and services");
task(TaskNames.local, [
    TaskNames.buildFoldStart,
    TaskNames.generateDiagnostics,
    TaskNames.lib,
    TaskNames.coreBuild,
    // buildProtocolDts,
    // builtGeneratedDiagnosticMessagesJSON,
    TaskNames.lssl,
    // "localize",
    TaskNames.buildFoldEnd
]);

desc("Runs all the tests in parallel using the built run.js file. Optional arguments are: t[ests]=category1|category2|... d[ebug]=true.");
task(TaskNames.runtestsParallel, [TaskNames.lib], function () {
    tsbuild([ConfigFileFor.runjs, ConfigFileFor.lint]);
    runConsoleTests("min", /*parallel*/ true);
}, { async: true });

desc("Runs all the tests in parallel using the built run.js file. Optional arguments are: t[ests]=category1|category2|... d[ebug]=true.");
task(TaskNames.runtests, [TaskNames.lib], function () {
    tsbuild([ConfigFileFor.runjs, ConfigFileFor.lint]);
    runConsoleTests('mocha-fivemat-progress-reporter', /*runInParallel*/ false);;
}, { async: true });

// Makes the test results the new baseline
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

const libraryTargets = getLibraryTargets();
desc("Builds the library targets");
task(TaskNames.lib, libraryTargets);

desc("Builds language service server library");
task("lssl", [TaskNames.coreBuild, Paths.tsserverLibraryFile, Paths.tsserverLibraryDefinitionFile, Paths.typesMapOutput]);

// Makes a new LKG. This target does not build anything, but errors if not all the outputs are present in the built/local directory
desc("Makes a new LKG out of the built js files");
task(TaskNames.lkg, [
    TaskNames.clean,
    TaskNames.release,
    TaskNames.local,
    ...libraryTargets
], () => {
    const sizeBefore = getDirSize(Paths.lkg);
    const localizationTargets = locales.map(f => path.join(Paths.builtLocal, f)).concat(path.dirname(Paths.locLcg));

    const copyrightContent = fs.readFileSync(Paths.copyright, { encoding: 'utf-8' });

    const expectedFiles = [...libraryTargets, ...ExpectedLKGFiles, ...localizationTargets];
    const missingFiles = expectedFiles.filter(f => !fs.existsSync(f));
    if (missingFiles.length > 0) {
        fail(new Error("Cannot replace the LKG unless all built targets are present in directory " + Paths.builtLocal +
            ". The following files are missing:\n" + missingFiles.join("\n")));
    }
    // Copy all the targets into the LKG directory
    jake.mkdirP(Paths.lkg);
    expectedFiles.forEach(f => {
        let content = fs.readFileSync(f, { encoding: 'utf-8' });

        // If this is a .d.ts file, run remove-internal on it
        if (f.endsWith(".d.ts")) {
            content = removeInternal.elide(content).result;
        }

        if (f.endsWith(".d.ts") || f.endsWith(".js")) {
            // Prepend the copyright header to it
            content = copyrightContent + content;
        }

        fs.writeFile(path.join(Paths.lkg, path.basename(f)), content, { encoding: 'utf-8' }, (err) => {
            if (err) throw err;
        });
    });

    const sizeAfter = getDirSize(Paths.lkg);
    if (sizeAfter > (sizeBefore * 1.10)) {
        throw new Error("The lib folder increased by 10% or more. This likely indicates a bug.");
    }
});

desc("Runs tslint on the compiler sources. Optional arguments are: f[iles]=regex");
task(TaskNames.lint, [TaskNames.buildRules], () => {
    if (fold.isTravis()) console.log(fold.start("lint"));
    function lint(project, cb) {
        const fix = process.env.fix || process.env.f;
        const cmd = `node node_modules/tslint/bin/tslint --project ${project} --formatters-dir ./built/local/tslint/formatters --format autolinkableStylish${fix ? " --fix" : ""}`;
        console.log("Linting: " + cmd);
        jake.exec([cmd], cb, /** @type {jake.ExecOptions} */({ interactive: true, windowsVerbatimArguments: true }));
    }
    lint("scripts/tslint/tsconfig.json", () => lint("src/tsconfig-base.json", () => {
        if (fold.isTravis()) console.log(fold.end("lint"));
        complete();
    }));
});

desc("Diffs the compiler baselines using the diff tool specified by the 'DIFF' environment variable");
task('diff', function () {
    var cmd = `"${getDiffTool()} ${Paths.baselines.reference} ${Paths.baselines.local}`;
    console.log(cmd);
    exec(cmd);
}, { async: true });

desc("Diffs the RWC baselines using the diff tool specified by the 'DIFF' environment variable");
task('diff-rwc', function () {
    var cmd = `"${getDiffTool()} ${Paths.baselines.referenceRwc} ${Paths.baselines.localRwc}`;
    console.log(cmd);
    exec(cmd);
}, { async: true });

desc("Sets the release mode flag");
task("release", function () {
    useDebugMode = false;
});

desc("Clears the release mode flag");
task("setDebugMode", function () {
    useDebugMode = true;
});

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
    tsbuild(ConfigFileFor.lint, undefined, () => complete());
}, { async: true });

desc("Cleans the compiler output, declare files, and tests");
task(TaskNames.clean, function () {
    jake.rmRf(Paths.built);
});

desc("Generates a diagnostic file in TypeScript based on an input JSON file");
task(TaskNames.generateDiagnostics, [Paths.diagnosticInformationMap]);

task(TaskNames.coreBuild, function () {
    tsbuild(ConfigFileFor.all, undefined, () => complete());
}, { async: true });

file(Paths.diagnosticMessagesJson);
file(Paths.diagnosticInformationMap, [Paths.diagnosticMessagesJson], function (complete) {
    tsbuild("scripts/processDiagnosticMessages.tsconfig.json", /*lkg*/ true, function () {
        const cmd = `${host} scripts/processDiagnosticMessages.js ${Paths.diagnosticMessagesJson}`;
        console.log(cmd);
        var ex = jake.createExec([cmd]);
        // Add listeners for output and error
        ex.addListener("stdout", function (output) {
            process.stdout.write(output);
        });
        ex.addListener("stderr", function (error) {
            process.stderr.write(error);
        });
        ex.addListener("cmdEnd", function () {
            complete();
        });
        ex.run();
    });
}, { async: true });

file(Paths.typesMapOutput, /** @type {*} */(function () {
    var content = fs.readFileSync(path.join(Paths.srcServer, 'typesMap.json'));
    // Validate that it's valid JSON
    try {
        JSON.parse(content.toString());
    } catch (e) {
        console.log("Parse error in typesMap.json: " + e);
    }
    fs.writeFileSync(Paths.typesMapOutput, content);
}));

file(Paths.tsserverLibraryFile, [TaskNames.coreBuild, Paths.copyright, ...libraryTargets], function() {
    // fs.writeFileSync(Paths.tsserverLibraryFile, fs.readFileSync(path.join(Paths.builtLocal, "server.js"), { encoding: 'utf-8'}));
    fs.writeFileSync(Paths.tsserverLibraryFile, "wat");
});

file(Paths.tsserverLibraryDefinitionFile, [TaskNames.coreBuild, Paths.copyright, ...libraryTargets], function () {
    const content = fs.readFileSync(Paths.servicesFile, { encoding: 'utf-8' });
    const newContent =
        removeConstModifierFromEnumDeclarations(content) +
        `\nexport = ts` +
        `\nexport as namespace ts;`;

    fs.writeFileSync(Paths.tsserverLibraryDefinitionFile, newContent, { encoding: 'utf-8' });
});

function getLibraryTargets() {
    return libraries.libs.map(function (lib) {
        var relativeSources = ["header.d.ts"].concat(libraries.sources && libraries.sources[lib] || [lib + ".d.ts"]);
        var relativeTarget = libraries.paths && libraries.paths[lib] || ("lib." + lib + ".d.ts");
        var sources = [Paths.copyright].concat(relativeSources.map(s => path.join(Paths.library, s)));
        var target = path.join(Paths.builtLocal, relativeTarget);
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

    var debug = process.env.debug || process.env["debug-brk"] || process.env.d;
    var inspect = process.env.inspect || process.env["inspect-brk"] || process.env.i;
    var testTimeout = process.env.timeout || defaultTestTimeout;
    var runners = process.env.runners || process.env.runner || process.env.ru;
    var tests = process.env.test || process.env.tests || process.env.t;
    var light = process.env.light === undefined || process.env.light !== "false";
    var stackTraceLimit = process.env.stackTraceLimit;
    var testConfigFile = 'test.config';
    if (fs.existsSync(testConfigFile)) {
        fs.unlinkSync(testConfigFile);
    }
    var workerCount, taskConfigsFolder;
    if (runInParallel) {
        // generate name to store task configuration files
        var prefix = os.tmpdir() + "/ts-tests";
        var i = 1;
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

    if (tests || runners || light || testTimeout || taskConfigsFolder) {
        writeTestConfigFile(tests, runners, light, taskConfigsFolder, workerCount, stackTraceLimit, colors, testTimeout);
    }

    var colorsFlag = process.env.color || process.env.colors;
    var colors = colorsFlag !== "false" && colorsFlag !== "0";
    var reporter = process.env.reporter || process.env.r || defaultReporter;
    var bail = process.env.bail || process.env.b;
    var lintFlag = process.env.lint !== 'false';

    // timeout normally isn't necessary but Travis-CI has been timing out on compiler baselines occasionally
    // default timeout is 2sec which really should be enough, but maybe we just need a small amount longer
    if (!runInParallel) {
        var startTime = Travis.mark();
        var args = [];
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
        if (bail) {
            args.push("--bail");
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
        args.push(Paths.builtLocalRun);

        var cmd = "mocha " + args.join(" ");
        console.log(cmd);

        var savedNodeEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = "development";
        exec(cmd, function () {
            process.env.NODE_ENV = savedNodeEnv;
            Travis.measure(startTime);
            runLinter();
            finish();
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
        exec(host + " " + Paths.builtLocalRun, function () {
            process.env.NODE_ENV = savedNodeEnv;
            Travis.measure(startTime);
            var lint = jake.Task["lint"];
            lint.addListener("complete", () => finish());
            lint.invoke();
            finish();
        }, function (e, status) {
            process.env.NODE_ENV = savedNodeEnv;
            Travis.measure(startTime);
            finish(status);
        });
    }

    function failWithStatus(status) {
        fail("Process exited with code " + status);
    }

    function finish(errorStatus) {
        deleteTemporaryProjectOutput();
        if (errorStatus !== undefined) {
            failWithStatus(errorStatus);
        }
        else {
            complete();
        }
    }
    function runLinter() {
        if (!lintFlag || dirty) {
            return;
        }
        var lint = jake.Task['lint'];
        lint.addListener('complete', function () {
            complete();
        });
        lint.invoke();
    }

    // used to pass data from jake command line directly to run.js
    function writeTestConfigFile(tests, runners, light, taskConfigsFolder, workerCount, stackTraceLimit, colors, testTimeout) {
        var testConfigContents = JSON.stringify({
            runners: runners ? runners.split(",") : undefined,
            test: tests ? [tests] : undefined,
            light: light,
            workerCount: workerCount,
            taskConfigsFolder: taskConfigsFolder,
            stackTraceLimit: stackTraceLimit,
            noColor: !colors,
            timeout: testTimeout
        });
        fs.writeFileSync('test.config', testConfigContents);
    }

    function deleteTemporaryProjectOutput() {
        if (fs.existsSync(path.join(Paths.baselines.local, "projectOutput/"))) {
            jake.rmRf(path.join(Paths.baselines.local, "projectOutput/"));
        }
    }
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
    jake.mkdirP(Paths.baselines.localRwc);
    jake.mkdirP(Paths.baselines.localTest262);
}

function tsbuild(tsconfigPath, useLkg = true, done = undefined) {
    const startCompileTime = Travis.mark();

    const compilerPath = useLkg ? Paths.lkgCompiler : Paths.builtLocalCompiler;
    const cmd = `${host} ${compilerPath} -b -v ${Array.isArray(tsconfigPath) ? tsconfigPath.join(" ") : tsconfigPath}`;

    var ex = jake.createExec([cmd]);
    // Add listeners for output and error
    ex.addListener("stdout", function (output) {
        process.stdout.write(output);
    });
    ex.addListener("stderr", function (error) {
        process.stderr.write(error);
    });
    ex.addListener("cmdEnd", function () {
        Travis.measure(startCompileTime);
        done && done();
    });
    ex.addListener("error", function () {
        fail(`Compilation of ${tsconfigPath} unsuccessful`);
        Travis.measure(startCompileTime);
    });
    ex.run();
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

function exec(cmd, completeHandler, errorHandler) {
    var ex = jake.createExec([cmd], /** @type {jake.ExecOptions} */({ windowsVerbatimArguments: true, interactive: true }));
    // Add listeners for output and error
    ex.addListener("stdout", function (output) {
        process.stdout.write(output);
    });
    ex.addListener("stderr", function (error) {
        process.stderr.write(error);
    });
    ex.addListener("cmdEnd", function () {
        if (completeHandler) {
            completeHandler();
        }
        complete();
    });
    ex.addListener("error", function (e, status) {
        if (errorHandler) {
            errorHandler(e, status);
        }
        else {
            fail("Process exited with code " + status);
        }
    });

    ex.run();
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

function acceptBaseline(sourceFolder, targetFolder) {
    console.log('Accept baselines from ' + sourceFolder + ' to ' + targetFolder);
    var deleteEnding = '.delete';

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

// concatenate a list of sourceFiles to a destinationFile
function concatenateFiles(destinationFile, sourceFiles) {
    var temp = "temptemp";
    // append all files in sequence
    var text = "";
    for (var i = 0; i < sourceFiles.length; i++) {
        if (!fs.existsSync(sourceFiles[i])) {
            fail(sourceFiles[i] + " does not exist!");
        }
        if (i > 0) { text += "\n\n"; }
        text += fs.readFileSync(sourceFiles[i]).toString().replace(/\r?\n/g, "\n");
    }
    fs.writeFileSync(temp, text);
    // Move the file to the final destination
    fs.renameSync(temp, destinationFile);
}

function getDiffTool() {
    var program = process.env['DIFF'];
    if (!program) {
        fail("Add the 'DIFF' environment variable to the path of the program you want to use.");
    }
    return program;
}

function removeConstModifierFromEnumDeclarations(text) {
    return text.replace(/^(\s*)(export )?const enum (\S+) {(\s*)$/gm, '$1$2enum $3 {$4');
}
