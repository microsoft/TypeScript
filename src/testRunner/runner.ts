import * as Harness from "./_namespaces/Harness";
import * as vpath from "./_namespaces/vpath";
import * as ts from "./_namespaces/ts";
import * as FourSlash from "./_namespaces/FourSlash";
import * as project from "./_namespaces/project";
import * as RWC from "./_namespaces/RWC";

/* eslint-disable prefer-const */
export let runners: Harness.RunnerBase[] = [];
export let iterations = 1;
/* eslint-enable prefer-const */

function runTests(runners: Harness.RunnerBase[]) {
    for (let i = iterations; i > 0; i--) {
        const seen = new Map<string, string>();
        const dupes: [string, string][] = [];
        for (const runner of runners) {
            if (runner instanceof Harness.CompilerBaselineRunner || runner instanceof Harness.FourSlashRunner) {
                for (const sf of runner.enumerateTestFiles()) {
                    const full = typeof sf === "string" ? sf : sf.file;
                    const base = vpath.basename(full).toLowerCase();
                    // allow existing dupes in fourslash/shims and fourslash/server
                    if (seen.has(base) && !/fourslash\/(shim|server)/.test(full)) {
                        dupes.push([seen.get(base)!, full]);
                    }
                    else {
                        seen.set(base, full);
                    }
                }
            }
            runner.initializeTests();
        }
        if (dupes.length) {
            throw new Error(`${dupes.length} Tests with duplicate baseline names:
${JSON.stringify(dupes, undefined, 2)}`);
        }
    }
}

function tryGetConfig(args: string[]) {
    const prefix = "--config=";
    const configPath = ts.forEach(args, arg => arg.lastIndexOf(prefix, 0) === 0 && arg.substr(prefix.length));
    // strip leading and trailing quotes from the path (necessary on Windows since shell does not do it automatically)
    return configPath && configPath.replace(/(^[\"'])|([\"']$)/g, "");
}

export function createRunner(kind: Harness.TestRunnerKind): Harness.RunnerBase {
    switch (kind) {
        case "conformance":
            return new Harness.CompilerBaselineRunner(Harness.CompilerTestType.Conformance);
        case "compiler":
            return new Harness.CompilerBaselineRunner(Harness.CompilerTestType.Regressions);
        case "fourslash":
            return new Harness.FourSlashRunner(FourSlash.FourSlashTestType.Native);
        case "fourslash-shims":
            return new Harness.FourSlashRunner(FourSlash.FourSlashTestType.Shims);
        case "fourslash-shims-pp":
            return new Harness.FourSlashRunner(FourSlash.FourSlashTestType.ShimsWithPreprocess);
        case "fourslash-server":
            return new Harness.FourSlashRunner(FourSlash.FourSlashTestType.Server);
        case "project":
            return new project.ProjectRunner();
        case "rwc":
            return new RWC.RWCRunner();
        case "test262":
            return new Harness.Test262BaselineRunner();
        case "user":
            return new Harness.UserCodeRunner();
        case "dt":
            return new Harness.DefinitelyTypedRunner();
        case "docker":
            return new Harness.DockerfileRunner();
    }
    return ts.Debug.fail(`Unknown runner kind ${kind}`);
}

// users can define tests to run in mytest.config that will override cmd line args, otherwise use cmd line args (test.config), otherwise no options

const mytestconfigFileName = "mytest.config";
const testconfigFileName = "test.config";

const customConfig = tryGetConfig(Harness.IO.args());
const testConfigContent =
    customConfig && Harness.IO.fileExists(customConfig)
        ? Harness.IO.readFile(customConfig)!
        : Harness.IO.fileExists(mytestconfigFileName)
            ? Harness.IO.readFile(mytestconfigFileName)!
            : Harness.IO.fileExists(testconfigFileName) ? Harness.IO.readFile(testconfigFileName)! : "";

export let taskConfigsFolder: string;
export let workerCount: number;
export let runUnitTests: boolean | undefined;
export let stackTraceLimit: number | "full" | undefined;
export let noColors = false;
export let keepFailed = false;

export interface TestConfig {
    light?: boolean;
    taskConfigsFolder?: string;
    listenForWork?: boolean;
    workerCount?: number;
    stackTraceLimit?: number | "full";
    test?: string[];
    runners?: string[];
    runUnitTests?: boolean;
    noColors?: boolean;
    timeout?: number;
    keepFailed?: boolean;
    shardId?: number;
    shards?: number;
}

export interface TaskSet {
    runner: Harness.TestRunnerKind;
    files: string[];
}

export let configOption: string;
export let globalTimeout: number;
function handleTestConfig() {
    if (testConfigContent !== "") {
        const testConfig = JSON.parse(testConfigContent) as TestConfig;
        if (testConfig.light) {
            Harness.setLightMode(true);
        }
        if (testConfig.timeout) {
            globalTimeout = testConfig.timeout;
        }
        runUnitTests = testConfig.runUnitTests;
        if (testConfig.workerCount) {
            workerCount = +testConfig.workerCount;
        }
        if (testConfig.taskConfigsFolder) {
            taskConfigsFolder = testConfig.taskConfigsFolder;
        }
        if (testConfig.noColors !== undefined) {
            noColors = testConfig.noColors;
        }
        if (testConfig.keepFailed) {
            keepFailed = true;
        }
        if (testConfig.shardId) {
            Harness.setShardId(testConfig.shardId);
        }
        if (testConfig.shards) {
            Harness.setShards(testConfig.shards);
        }

        if (testConfig.stackTraceLimit === "full") {
            (Error as any).stackTraceLimit = Infinity;
            stackTraceLimit = testConfig.stackTraceLimit;
        }
        else if ((+testConfig.stackTraceLimit! | 0) > 0) {
            (Error as any).stackTraceLimit = +testConfig.stackTraceLimit! | 0;
            stackTraceLimit = +testConfig.stackTraceLimit! | 0;
        }
        if (testConfig.listenForWork) {
            return true;
        }

        const runnerConfig = testConfig.runners || testConfig.test;
        if (runnerConfig && runnerConfig.length > 0) {
            if (testConfig.runners) {
                runUnitTests = runnerConfig.indexOf("unittest") !== -1;
            }
            for (const option of runnerConfig) {
                if (!option) {
                    continue;
                }

                if (!configOption) {
                    configOption = option;
                }
                else {
                    configOption += "+" + option;
                }

                switch (option) {
                    case "compiler":
                        runners.push(new Harness.CompilerBaselineRunner(Harness.CompilerTestType.Conformance));
                        runners.push(new Harness.CompilerBaselineRunner(Harness.CompilerTestType.Regressions));
                        break;
                    case "conformance":
                        runners.push(new Harness.CompilerBaselineRunner(Harness.CompilerTestType.Conformance));
                        break;
                    case "project":
                        runners.push(new project.ProjectRunner());
                        break;
                    case "fourslash":
                        runners.push(new Harness.FourSlashRunner(FourSlash.FourSlashTestType.Native));
                        break;
                    case "fourslash-shims":
                        runners.push(new Harness.FourSlashRunner(FourSlash.FourSlashTestType.Shims));
                        break;
                    case "fourslash-shims-pp":
                        runners.push(new Harness.FourSlashRunner(FourSlash.FourSlashTestType.ShimsWithPreprocess));
                        break;
                    case "fourslash-server":
                        runners.push(new Harness.FourSlashRunner(FourSlash.FourSlashTestType.Server));
                        break;
                    case "fourslash-generated":
                        runners.push(new Harness.GeneratedFourslashRunner(FourSlash.FourSlashTestType.Native));
                        break;
                    case "rwc":
                        runners.push(new RWC.RWCRunner());
                        break;
                    case "test262":
                        runners.push(new Harness.Test262BaselineRunner());
                        break;
                    case "user":
                        runners.push(new Harness.UserCodeRunner());
                        break;
                    case "dt":
                        runners.push(new Harness.DefinitelyTypedRunner());
                        break;
                    case "docker":
                        runners.push(new Harness.DockerfileRunner());
                        break;
                }
            }
        }
    }

    if (runners.length === 0) {
        // compiler
        runners.push(new Harness.CompilerBaselineRunner(Harness.CompilerTestType.Conformance));
        runners.push(new Harness.CompilerBaselineRunner(Harness.CompilerTestType.Regressions));

        runners.push(new project.ProjectRunner());

        // language services
        runners.push(new Harness.FourSlashRunner(FourSlash.FourSlashTestType.Native));
        runners.push(new Harness.FourSlashRunner(FourSlash.FourSlashTestType.Shims));
        runners.push(new Harness.FourSlashRunner(FourSlash.FourSlashTestType.ShimsWithPreprocess));
        runners.push(new Harness.FourSlashRunner(FourSlash.FourSlashTestType.Server));
        // runners.push(new GeneratedFourslashRunner());

        // CRON-only tests
        if (process.env.TRAVIS_EVENT_TYPE === "cron") {
            runners.push(new Harness.UserCodeRunner());
            runners.push(new Harness.DockerfileRunner());
        }
    }
    if (runUnitTests === undefined) {
        runUnitTests = runners.length !== 1; // Don't run unit tests when running only one runner if unit tests were not explicitly asked for
    }
    return false;
}

function beginTests() {
    ts.Debug.loggingHost = {
        log(_level, s) {
            console.log(s || "");
        }
    };

    if (ts.Debug.isDebugging) {
        ts.Debug.enableDebugInfo();
    }

    // run tests in en-US by default.
    let savedUILocale: string | undefined;
    beforeEach(() => {
        savedUILocale = ts.getUILocale();
        ts.setUILocale("en-US");
    });
    afterEach(() => ts.setUILocale(savedUILocale));

    runTests(runners);

    if (!runUnitTests) {
        // patch `describe` to skip unit tests
        (global as any).describe = ts.noop;
    }
}

export let isWorker: boolean;
function startTestEnvironment() {
    isWorker = handleTestConfig();
    if (isWorker) {
        return Harness.Parallel.Worker.start();
    }
    else if (taskConfigsFolder && workerCount && workerCount > 1) {
        return Harness.Parallel.Host.start();
    }
    beginTests();
}

startTestEnvironment();
