import * as FourSlash from "./_namespaces/FourSlash";
import {
    CompilerBaselineRunner,
    CompilerTestType,
    FourSlashRunner,
    GeneratedFourslashRunner,
    IO,
    Parallel,
    RunnerBase,
    setLightMode,
    setShardId,
    setShards,
    TestRunnerKind,
} from "./_namespaces/Harness";
import * as project from "./_namespaces/project";
import * as ts from "./_namespaces/ts";
import * as vpath from "./_namespaces/vpath";

/* eslint-disable prefer-const */
export let runners: RunnerBase[] = [];
export let iterations = 1;
/* eslint-enable prefer-const */

function runTests(runners: RunnerBase[]) {
    for (let i = iterations; i > 0; i--) {
        const seen = new Map<string, string>();
        const dupes: [string, string][] = [];
        for (const runner of runners) {
            if (runner instanceof CompilerBaselineRunner || runner instanceof FourSlashRunner) {
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
    return configPath && configPath.replace(/(^["'])|(["']$)/g, "");
}

export function createRunner(kind: TestRunnerKind): RunnerBase {
    switch (kind) {
        case "conformance":
            return new CompilerBaselineRunner(CompilerTestType.Conformance);
        case "compiler":
            return new CompilerBaselineRunner(CompilerTestType.Regressions);
        case "fourslash":
            return new FourSlashRunner(FourSlash.FourSlashTestType.Native);
        case "fourslash-server":
            return new FourSlashRunner(FourSlash.FourSlashTestType.Server);
        case "project":
            return new project.ProjectRunner();
    }
    return ts.Debug.fail(`Unknown runner kind ${kind}`);
}

// users can define tests to run in mytest.config that will override cmd line args, otherwise use cmd line args (test.config), otherwise no options

const mytestconfigFileName = "mytest.config";
const testconfigFileName = "test.config";

const customConfig = tryGetConfig(IO.args());
const testConfigContent = customConfig && IO.fileExists(customConfig)
    ? IO.readFile(customConfig)!
    : IO.fileExists(mytestconfigFileName)
    ? IO.readFile(mytestconfigFileName)!
    : IO.fileExists(testconfigFileName) ? IO.readFile(testconfigFileName)! : "";

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
    runner: TestRunnerKind;
    files: string[];
}

export let configOption: string;
export let globalTimeout: number;
function handleTestConfig() {
    if (testConfigContent !== "") {
        const testConfig = JSON.parse(testConfigContent) as TestConfig;
        if (testConfig.light) {
            setLightMode(true);
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
            setShardId(testConfig.shardId);
        }
        if (testConfig.shards) {
            setShards(testConfig.shards);
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
                runUnitTests = runnerConfig.includes("unittest");
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
                        runners.push(new CompilerBaselineRunner(CompilerTestType.Conformance));
                        runners.push(new CompilerBaselineRunner(CompilerTestType.Regressions));
                        break;
                    case "conformance":
                        runners.push(new CompilerBaselineRunner(CompilerTestType.Conformance));
                        break;
                    case "project":
                        runners.push(new project.ProjectRunner());
                        break;
                    case "fourslash":
                        runners.push(new FourSlashRunner(FourSlash.FourSlashTestType.Native));
                        break;
                    case "fourslash-server":
                        runners.push(new FourSlashRunner(FourSlash.FourSlashTestType.Server));
                        break;
                    case "fourslash-generated":
                        runners.push(new GeneratedFourslashRunner(FourSlash.FourSlashTestType.Native));
                        break;
                        break;
                }
            }
        }
    }

    if (runners.length === 0) {
        // compiler
        runners.push(new CompilerBaselineRunner(CompilerTestType.Conformance));
        runners.push(new CompilerBaselineRunner(CompilerTestType.Regressions));

        runners.push(new project.ProjectRunner());

        // language services
        runners.push(new FourSlashRunner(FourSlash.FourSlashTestType.Native));
        runners.push(new FourSlashRunner(FourSlash.FourSlashTestType.Server));
        // runners.push(new GeneratedFourslashRunner());
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
        },
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
    // For debugging convenience.
    (globalThis as any).ts = ts;

    isWorker = handleTestConfig();
    if (isWorker) {
        return Parallel.Worker.start();
    }
    else if (taskConfigsFolder && workerCount && workerCount > 1) {
        return Parallel.Host.start();
    }
    beginTests();
}

startTestEnvironment();

// This brings in all of the unittests.

// If running as emitted CJS, we want to start the tests here after startTestEnvironment.
// If running bundled, we will do this in Harness.ts.
if (__filename.endsWith("runner.js")) {
    require("./tests");
}
