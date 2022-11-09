import del from "del";
import fs from "fs";
import os from "os";
import path from "path";
import chalk from "chalk";
import cmdLineOptions from "./options.mjs";
import { exec } from "./utils.mjs";
import { findUpFile, findUpRoot } from "./findUpDir.mjs";
import { CancelError } from "@esfx/canceltoken";

const mochaJs = path.resolve(findUpRoot(), "node_modules", "mocha", "bin", "_mocha");
export const localBaseline = "tests/baselines/local/";
export const refBaseline = "tests/baselines/reference/";
export const localRwcBaseline = "internal/baselines/rwc/local";
export const refRwcBaseline = "internal/baselines/rwc/reference";
export const localTest262Baseline = "internal/baselines/test262/local";

/**
 * @param {string} runJs
 * @param {string} defaultReporter
 * @param {boolean} runInParallel
 * @param {object} options
 * @param {import("@esfx/canceltoken").CancelToken} [options.token]
 * @param {boolean} [options.watching]
 */
export async function runConsoleTests(runJs, defaultReporter, runInParallel, options = {}) {
    let testTimeout = cmdLineOptions.timeout;
    const tests = cmdLineOptions.tests;
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
        if (options.watching) {
            console.log(chalk.yellowBright(`[watch] cleaning test directories...`));
        }
        await cleanTestDirs();

        if (options.token?.signaled) {
            return;
        }
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

    if (options.watching) {
        console.log(chalk.yellowBright(`[watch] running tests...`));
    }

    if (tests || runners || light || testTimeout || taskConfigsFolder || keepFailed || shards || shardId) {
        writeTestConfigFile(tests, runners, light, taskConfigsFolder, workerCount, stackTraceLimit, testTimeout, keepFailed, shards, shardId);
    }

    const colors = cmdLineOptions.colors;
    const reporter = cmdLineOptions.reporter || defaultReporter;

    /** @type {string[]} */
    const args = [];

    // timeout normally isn't necessary but Travis-CI has been timing out on compiler baselines occasionally
    // default timeout is 2sec which really should be enough, but maybe we just need a small amount longer
    if (!runInParallel) {
        args.push(mochaJs);
        args.push("-R", findUpFile("scripts/failed-tests.cjs"));
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
            args.unshift((inspect === "" || inspect === true) ? "--inspect-brk" : "--inspect-brk="+inspect);
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

        const { exitCode } = await exec(process.execPath, args, { token: options.token });
        if (exitCode !== 0) {
            errorStatus = exitCode;
            error = new Error(`Process exited with status code ${errorStatus}.`);
        }
    }
    catch (e) {
        errorStatus = undefined;
        error = /** @type {Error} */ (e);
    }
    finally {
        restoreSavedNodeEnv();
    }

    await del("test.config");
    await deleteTemporaryProjectOutput();

    if (error !== undefined) {
        if (error instanceof CancelError) {
            throw error;
        }

        if (options.watching) {
            console.error(`${chalk.redBright(error.name)}: ${error.message}`);
        }
        else {
            process.exitCode = typeof errorStatus === "number" ? errorStatus : 2;
            throw error;
        }
    }
}

export async function cleanTestDirs() {
    await del([localBaseline, localRwcBaseline]);
    await fs.promises.mkdir(localRwcBaseline, { recursive: true });
    await fs.promises.mkdir(localBaseline, { recursive: true });
}

/**
 * used to pass data from command line directly to run.js
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
export function writeTestConfigFile(tests, runners, light, taskConfigsFolder, workerCount, stackTraceLimit, timeout, keepFailed, shards, shardId) {
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
    console.info("Running tests with config: " + testConfigContents);
    fs.writeFileSync("test.config", testConfigContents);
}

/** @type {string | undefined} */
let savedNodeEnv;
function setNodeEnvToDevelopment() {
    savedNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";
}

function restoreSavedNodeEnv() {
    process.env.NODE_ENV = savedNodeEnv;
}

function deleteTemporaryProjectOutput() {
    return del(path.join(localBaseline, "projectOutput/"));
}

/**
 * @param {string} text
 */
function regExpEscape(text) {
    return text.replace(/[.*+?^${}()|\[\]\\]/g, "\\$&");
}
