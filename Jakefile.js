// This file contains the build logic for the public repo
// @ts-check
/// <reference types="jake" />

const fs = require("fs");
const os = require("os");
const path = require("path");
const child_process = require("child_process");
const fold = require("travis-fold");
const ts = require("./lib/typescript");
const del = require("del");
const getDirSize = require("./scripts/build/getDirSize");

const host = process.env.TYPESCRIPT_HOST || process.env.host || "node";

const defaultTestTimeout = 40000;

const TaskNames = {
    runtests: "runtests",
    runtestsParallel: "runtests-parallel",
    buildRules: "build-rules",
    clean: "clean"
}

const Paths = {
    lkgCompiler: "lib/tsc.js",
    built: "built",
    builtLocal: "built/local",
    builtLocalCompiler: "built/local/tsc.js",
    builtLocalRun: "built/local/run.js",
    baselines: {
        local: "tests/baselines/local",
        localTest262: "tests/baselines/test262/local",
        localRwc: "tests/baselines/rwc/local",
        reference: "tests/baselines/reference",
        referenceTest262: "tests/baselines/test262/reference",
        referenceTwc: "tests/baselines/rwc/reference"
    }
}

const ConfigFileFor = {
    tsc: "src/tsc",
    tsserver: "src/tsserver",
    runjs: "src/testRunner",
    lint: "scripts/tslint"
};

desc("Runs all the tests in parallel using the built run.js file. Optional arguments are: t[ests]=category1|category2|... d[ebug]=true.");
task(TaskNames.runtestsParallel, [TaskNames.buildRules], function() {
    tsbuild(ConfigFileFor.runjs);
    runConsoleTests("min", /*parallel*/ true);
}, { async: true});

desc("Runs all the tests in parallel using the built run.js file. Optional arguments are: t[ests]=category1|category2|... d[ebug]=true.");
task(TaskNames.runtests, [TaskNames.buildRules], function() {
    tsbuild(ConfigFileFor.runjs);
    runConsoleTests('mocha-fivemat-progress-reporter', /*runInParallel*/ false);;
}, { async: true});

desc("Compiles tslint rules to js");
task(TaskNames.buildRules, [], function() {
    tsbuild(ConfigFileFor.lint);
}, { async: true });

desc("Cleans the compiler output, declare files, and tests");
task("clean", function () {
    jake.rmRf(Paths.built);;
});

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
        exec(host + " " + run, function () {
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

function tsbuild(tsconfigPath, useLkg = false) {
    const startCompileTime = Travis.mark();

    const compilerPath = useLkg ? Paths.lkgCompiler : Paths.builtLocalCompiler;
    const cmd = `${host} ${compilerPath} -b -v ${tsconfigPath}`;

    var ex = jake.createExec([cmd]);
    // Add listeners for output and error
    ex.addListener("stdout", function (output) {
        process.stdout.write(output);
    });
    ex.addListener("stderr", function (error) {
        process.stderr.write(error);
    });
    ex.addListener("cmdEnd", function () {
        /*
        if (!useDebugMode && prefixes && fs.existsSync(outFile)) {
            for (var i in prefixes) {
                prependFile(prefixes[i], outFile);
            }
        }

        if (callback) {
            callback();
        }
        */

        Travis.measure(startCompileTime);
        complete();
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