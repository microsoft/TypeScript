// @ts-check
const gulp = require("gulp");
const del = require("del");
const fs = require("fs");
const os = require("os");
const path = require("path");
const mkdirP = require("mkdirp");
const log = require("fancy-log");
const cmdLineOptions = require("./options");
const { CancellationToken } = require("prex");
const { exec } = require("./utils");
const { findUpFile } = require("./findUpDir");

const mochaJs = require.resolve("mocha/bin/_mocha");
exports.localBaseline = "tests/baselines/local/";
exports.refBaseline = "tests/baselines/reference/";
exports.localRwcBaseline = "internal/baselines/rwc/local";
exports.refRwcBaseline = "internal/baselines/rwc/reference";
exports.localTest262Baseline = "internal/baselines/test262/local";

/**
 * @param {string} runJs
 * @param {string} defaultReporter
 * @param {boolean} runInParallel
 * @param {boolean} watchMode
 * @param {import("prex").CancellationToken} [cancelToken]
 */
async function runConsoleTests(runJs, defaultReporter, runInParallel, watchMode, cancelToken = CancellationToken.none) {
    let testTimeout = cmdLineOptions.timeout;
    let tests = cmdLineOptions.tests;
    const inspect = cmdLineOptions.break || cmdLineOptions.inspect;
    const runners = cmdLineOptions.runners;
    const light = cmdLineOptions.light;
    const stackTraceLimit = cmdLineOptions.stackTraceLimit;
    const testConfigFile = "test.config";
    const failed = cmdLineOptions.failed;
    const keepFailed = cmdLineOptions.keepFailed;
    const shards = +cmdLineOptions.shards || undefined;
    const shardId = +cmdLineOptions.shardId || undefined;
    if (!cmdLineOptions.dirty) {
        await cleanTestDirs();
        cancelToken.throwIfCancellationRequested();
    }

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

    if (tests || runners || light || testTimeout || taskConfigsFolder || keepFailed || shards || shardId) {
        writeTestConfigFile(tests, runners, light, taskConfigsFolder, workerCount, stackTraceLimit, testTimeout, keepFailed, shards, shardId);
    }

    const colors = cmdLineOptions.colors;
    const reporter = cmdLineOptions.reporter || defaultReporter;

    /** @type {string[]} */
    let args = [];

    // timeout normally isn't necessary but Travis-CI has been timing out on compiler baselines occasionally
    // default timeout is 2sec which really should be enough, but maybe we just need a small amount longer
    if (!runInParallel) {
        args.push(mochaJs);
        args.push("-R", findUpFile("scripts/failed-tests.js"));
        args.push("-O", '"reporter=' + reporter + (keepFailed ? ",keepFailed=true" : "") + '"');
        if (tests) {
            args.push("-g", `"${tests}"`);
        }
        if (failed) {
            const grep = fs.readFileSync(".failed-tests", "utf8")
                .split(/\r?\n/g)
                .map(test => test.trim())
                .filter(test => test.length > 0)
                .map(regExpEscape)
                .join("|");
            const file = path.join(os.tmpdir(), ".failed-tests.json");
            fs.writeFileSync(file, JSON.stringify({ grep }), "utf8");
            args.push("--config", file);
        }
        if (colors) {
            args.push("--colors");
        }
        else {
            args.push("--no-colors");
        }
        if (inspect !== undefined) {
            args.unshift((inspect == "" || inspect === true) ? "--inspect-brk" : "--inspect-brk="+inspect);
            args.push("-t", "0");
        }
        else {
            args.push("-t", "" + testTimeout);
        }
        args.push(runJs);
    }
    else {
        // run task to load all tests and partition them between workers
        args.push(runJs);
    }

    /** @type {number | undefined} */
    let errorStatus;

    /** @type {Error | undefined} */
    let error;

    try {
        setNodeEnvToDevelopment();
        const { exitCode } = await exec("node", args, { cancelToken });
        if (exitCode !== 0) {
            errorStatus = exitCode;
            error = new Error(`Process exited with status code ${errorStatus}.`);
        }
        else if (process.env.CI === "true") {
            // finally, do a sanity check and build the compiler with the built version of itself
            log.info("Starting sanity check build...");
            // Cleanup everything except lint rules (we'll need those later and would rather not waste time rebuilding them)
            await exec("gulp", ["clean-tsc", "clean-services", "clean-tsserver", "clean-lssl", "clean-tests"], { cancelToken });
            const { exitCode } = await exec("gulp", ["local", "--lkg=false"], { cancelToken });
            if (exitCode !== 0) {
                errorStatus = exitCode;
                error = new Error(`Sanity check build process exited with status code ${errorStatus}.`);
            }
        }
    }
    catch (e) {
        errorStatus = undefined;
        error = e;
    }
    finally {
        restoreSavedNodeEnv();
    }

    await del("test.config");
    await deleteTemporaryProjectOutput();

    if (error !== undefined) {
        process.exitCode = typeof errorStatus === "number" ? errorStatus : 2;
        throw error;
    }
}
exports.runConsoleTests = runConsoleTests;

async function cleanTestDirs() {
    await del([exports.localBaseline, exports.localRwcBaseline])
    mkdirP.sync(exports.localRwcBaseline);
    mkdirP.sync(exports.localBaseline);
}
exports.cleanTestDirs = cleanTestDirs;

/**
 * used to pass data from gulp command line directly to run.js
 * @param {string} tests
 * @param {string} runners
 * @param {boolean} light
 * @param {string} [taskConfigsFolder]
 * @param {string | number} [workerCount]
 * @param {string} [stackTraceLimit]
 * @param {string | number} [timeout]
 * @param {boolean} [keepFailed]
 * @param {number | undefined} [shards]
 * @param {number | undefined} [shardId]
 */
function writeTestConfigFile(tests, runners, light, taskConfigsFolder, workerCount, stackTraceLimit, timeout, keepFailed, shards, shardId) {
    const testConfigContents = JSON.stringify({
        test: tests ? [tests] : undefined,
        runners: runners ? runners.split(",") : undefined,
        light,
        workerCount,
        stackTraceLimit,
        taskConfigsFolder,
        noColor: !cmdLineOptions.colors,
        timeout,
        keepFailed,
        shards,
        shardId
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

function regExpEscape(text) {
    return text.replace(/[.*+?^${}()|\[\]\\]/g, '\\$&');
}
