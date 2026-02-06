import { CancelError } from "@esfx/canceltoken";
import fs from "fs";
import os from "os";
import path from "path";
import pc from "picocolors";

import {
    findUpFile,
    findUpRoot,
} from "./findUpDir.mjs";
import cmdLineOptions from "./options.mjs";
import {
    exec,
    ExecError,
    rimraf,
} from "./utils.mjs";

/** @import { CancelToken } from "@esfx/canceltoken" */
void 0;

const mochaJs = path.resolve(findUpRoot(), "node_modules", "mocha", "bin", "_mocha");
export const localBaseline = "tests/baselines/local/";
export const refBaseline = "tests/baselines/reference/";
export const coverageDir = "coverage";

/**
 * @param {string} runJs
 * @param {string} defaultReporter
 * @param {boolean} runInParallel
 * @param {object} options
 * @param {CancelToken} [options.token]
 * @param {boolean} [options.watching]
 */
export async function runConsoleTests(runJs, defaultReporter, runInParallel, options = {}) {
    let testTimeout = cmdLineOptions.timeout;
    const tests = cmdLineOptions.tests;
    const skipSysTests = cmdLineOptions.skipSysTests;
    const inspect = cmdLineOptions.break || cmdLineOptions.inspect;
    const runners = cmdLineOptions.runners;
    const light = cmdLineOptions.light;
    const stackTraceLimit = cmdLineOptions.stackTraceLimit;
    const testConfigFile = "test.config";
    const failed = cmdLineOptions.failed;
    const keepFailed = cmdLineOptions.keepFailed;
    const shards = +cmdLineOptions.shards || undefined;
    const shardId = +cmdLineOptions.shardId || undefined;
    const coverage = cmdLineOptions.coverage;

    if (coverage && testTimeout) {
        testTimeout *= 2;
        console.log(pc.yellowBright(`[coverage] doubling test timeout to ${testTimeout}ms...`));
    }

    if (!cmdLineOptions.dirty) {
        if (options.watching) {
            console.log(pc.yellowBright(`[watch] cleaning test directories...`));
        }
        await cleanTestDirs();
        await rimraf(coverageDir);

        if (options.token?.signaled) {
            return;
        }
    }

    await rimraf(testConfigFile);

    let workerCount, taskConfigsFolder;
    if (runInParallel) {
        // generate name to store task configuration files
        const prefix = os.tmpdir() + "/ts-tests";
        let i = 1;
        do {
            taskConfigsFolder = prefix + i;
            i++;
        }
        while (fs.existsSync(taskConfigsFolder));
        fs.mkdirSync(taskConfigsFolder);

        workerCount = cmdLineOptions.workers;
    }

    if (options.watching) {
        console.log(pc.yellowBright(`[watch] running tests...`));
    }

    if (tests || skipSysTests || runners || light || testTimeout || taskConfigsFolder || keepFailed || shards || shardId) {
        writeTestConfigFile(tests, skipSysTests, runners, light, taskConfigsFolder, workerCount, stackTraceLimit, testTimeout, keepFailed, shards, shardId);
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
                .split(/\r?\n/)
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
            args.unshift((inspect === "" || inspect === true) ? "--inspect-brk" : "--inspect-brk=" + inspect);
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

    const savedNodeEnv = process.env.NODE_ENV;
    const savedNodeV8Coverage = process.env.NODE_V8_COVERAGE;
    try {
        process.env.NODE_ENV = "development";
        if (coverage) {
            process.env.NODE_V8_COVERAGE = path.resolve(coverageDir, "tmp");
        }

        try {
            await exec(process.execPath, args, { token: options.token });
        }
        finally {
            // Calculate coverage even if tests failed.
            if (coverage) {
                await exec("npm", ["--prefer-offline", "exec", "--", "c8", "report", "--experimental-monocart"], { token: options.token });
            }
        }
    }
    catch (e) {
        errorStatus = e instanceof ExecError ? e.exitCode ?? undefined : undefined;
        error = /** @type {Error} */ (e);
    }
    finally {
        if (coverage) {
            process.env.NODE_V8_COVERAGE = savedNodeV8Coverage;
        }
        process.env.NODE_ENV = savedNodeEnv;
    }

    await rimraf("test.config");
    await rimraf(path.join(localBaseline, "projectOutput"));

    if (error !== undefined) {
        if (error instanceof CancelError) {
            throw error;
        }

        if (options.watching) {
            console.error(`${pc.redBright(error.name)}: ${error.message}`);
        }
        else {
            process.exitCode = typeof errorStatus === "number" ? errorStatus : 2;
            throw error;
        }
    }
}

export async function cleanTestDirs() {
    await rimraf(localBaseline);
    await fs.promises.mkdir(localBaseline, { recursive: true });
}

/**
 * used to pass data from command line directly to run.js
 * @param {string} tests
 * @param {boolean} skipSysTests
 * @param {string} runners
 * @param {boolean} light
 * @param {string} [taskConfigsFolder]
 * @param {number} [workerCount]
 * @param {string} [stackTraceLimit]
 * @param {number} [timeout]
 * @param {boolean} [keepFailed]
 * @param {number | undefined} [shards]
 * @param {number | undefined} [shardId]
 */
export function writeTestConfigFile(tests, skipSysTests, runners, light, taskConfigsFolder, workerCount, stackTraceLimit, timeout, keepFailed, shards, shardId) {
    const testConfigContents = JSON.stringify({
        test: tests ? [tests] : undefined,
        skipSysTests: skipSysTests ? skipSysTests : undefined,
        runners: runners ? runners.split(",") : undefined,
        light,
        workerCount,
        stackTraceLimit,
        taskConfigsFolder,
        noColor: !cmdLineOptions.colors,
        timeout,
        keepFailed,
        shards,
        shardId,
    });
    console.info("Running tests with config: " + testConfigContents);
    fs.writeFileSync("test.config", testConfigContents);
}

/**
 * @param {string} text
 */
function regExpEscape(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
