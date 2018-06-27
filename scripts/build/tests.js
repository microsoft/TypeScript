// @ts-check
const del = require("del");
const fs = require("fs");
const os = require("os");
const path = require("path");
const mkdirP = require("./mkdirp");
const cmdLineOptions = require("./options");
const exec = require("./exec");
const runSequence = require("run-sequence");
const finished = require("./finished");
const log = require("fancy-log"); // was `require("gulp-util").log (see https://github.com/gulpjs/gulp-util)

const nodeModulesPathPrefix = path.resolve("./node_modules/.bin/");
const isWin = /^win/.test(process.platform);
const mocha = path.join(nodeModulesPathPrefix, "mocha") + (isWin ? ".cmd" : "");

exports.localBaseline = "tests/baselines/local/";
exports.refBaseline = "tests/baselines/reference/";
exports.localRwcBaseline = "internal/baselines/rwc/local";
exports.refRwcBaseline = "internal/baselines/rwc/reference";
exports.localTest262Baseline = "internal/baselines/test262/local";

/**
 * @param {string} runJs
 * @param {string} defaultReporter
 * @param {boolean} runInParallel
 */
function runConsoleTests(runJs, defaultReporter, runInParallel) {
    let testTimeout = cmdLineOptions.timeout;
    let tests = cmdLineOptions.tests;
    const lintFlag = cmdLineOptions.lint;
    const debug = cmdLineOptions.debug;
    const inspect = cmdLineOptions.inspect;
    const runners = cmdLineOptions.runners;
    const light = cmdLineOptions.light;
    const stackTraceLimit = cmdLineOptions.stackTraceLimit;
    const testConfigFile = "test.config";
    const failed = cmdLineOptions.failed;
    const keepFailed = cmdLineOptions.keepFailed || failed;
    return cleanTestDirs()
        .then(() => {
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

            if (tests || runners || light || testTimeout || taskConfigsFolder || keepFailed) {
                writeTestConfigFile(tests, runners, light, taskConfigsFolder, workerCount, stackTraceLimit, testTimeout, keepFailed);
            }

            const colors = cmdLineOptions.colors;
            const reporter = cmdLineOptions.reporter || defaultReporter;

            /** @type {string} */
            let host = "node";
            
            /** @type {string[]} */
            let args = [];

            // timeout normally isn"t necessary but Travis-CI has been timing out on compiler baselines occasionally
            // default timeout is 2sec which really should be enough, but maybe we just need a small amount longer
            if (!runInParallel) {
                args.push("-R", "scripts/failed-tests");
                args.push("-O", '"reporter=' + reporter + (keepFailed ? ",keepFailed=true" : "") + '"');
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
                    args.push("-t", "" + testTimeout);
                }
                args.push(runJs);
                host = mocha;
            }
            else {
                // run task to load all tests and partition them between workers
                host = "node";
                args.push(runJs);
            }
            setNodeEnvToDevelopment();
            if (failed) {
                return exec(host, ["scripts/run-failed-tests.js"].concat(args));
            }
            else {
                return exec(host, args);
            }
        })
        .then(({ exitCode }) => {
            if (exitCode !== 0) return finish(undefined, exitCode);
            if (lintFlag) return finished(runSequence("lint")).then(() => finish(), finish);
            return finish();
        }, finish);

    /**
     * @param {any=} error
     * @param {number=} errorStatus
     */
    function finish(error, errorStatus) {
        restoreSavedNodeEnv();
        return deleteTestConfig()
            .then(deleteTemporaryProjectOutput)
            .then(() => {
                if (error !== undefined || errorStatus !== undefined) {
                    process.exit(typeof errorStatus === "number" ? errorStatus : 2);
                }
            });
    }

    function deleteTestConfig() {
        return del("test.config");
    }
}
exports.runConsoleTests = runConsoleTests;

function cleanTestDirs() {
    return del([exports.localBaseline, exports.localRwcBaseline,])
        .then(() => mkdirP(exports.localRwcBaseline))
        .then(() => mkdirP(exports.localBaseline));
}
exports.cleanTestDirs = cleanTestDirs;

/**
 * used to pass data from jake command line directly to run.js
 * @param {string} tests
 * @param {string} runners
 * @param {boolean} light
 * @param {string} [taskConfigsFolder]
 * @param {string | number} [workerCount]
 * @param {string} [stackTraceLimit]
 * @param {string | number} [timeout]
 * @param {boolean} [keepFailed]
 */
function writeTestConfigFile(tests, runners, light, taskConfigsFolder, workerCount, stackTraceLimit, timeout, keepFailed) {
    const testConfigContents = JSON.stringify({
        test: tests ? [tests] : undefined,
        runner: runners ? runners.split(",") : undefined,
        light,
        workerCount,
        stackTraceLimit,
        taskConfigsFolder,
        noColor: !cmdLineOptions.colors,
        timeout,
        keepFailed
    });
    log.info("Running tests with config: " + testConfigContents);
    fs.writeFileSync("test.config", testConfigContents);
}
exports.writeTestConfigFile = writeTestConfigFile;

/** @type {string} */
let savedNodeEnv;
function setNodeEnvToDevelopment() {
    savedNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";
}

function restoreSavedNodeEnv() {
    process.env.NODE_ENV = savedNodeEnv;
}

function deleteTemporaryProjectOutput() {
    return del(path.join(exports.localBaseline, "projectOutput/"));
}