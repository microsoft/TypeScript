//
// Copyright (c) Microsoft Corporation.  All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

/// <reference path="test262Runner.ts" />
/// <reference path="compilerRunner.ts" />
/// <reference path="fourslashRunner.ts" />
/// <reference path="projectsRunner.ts" />
/// <reference path="rwcRunner.ts" />
/// <reference path="externalCompileRunner.ts" />
/// <reference path="harness.ts" />
/// <reference path="./parallel/shared.ts" />

let runners: RunnerBase[] = [];
let iterations = 1;

function runTests(runners: RunnerBase[]) {
    for (let i = iterations; i > 0; i--) {
        for (const runner of runners) {
            runner.initializeTests();
        }
    }
}

function tryGetConfig(args: string[]) {
    const prefix = "--config=";
    const configPath = ts.forEach(args, arg => arg.lastIndexOf(prefix, 0) === 0 && arg.substr(prefix.length));
    // strip leading and trailing quotes from the path (necessary on Windows since shell does not do it automatically)
    return configPath && configPath.replace(/(^[\"'])|([\"']$)/g, "");
}

function createRunner(kind: TestRunnerKind): RunnerBase {
    switch (kind) {
        case "conformance":
            return new CompilerBaselineRunner(CompilerTestType.Conformance);
        case "compiler":
            return new CompilerBaselineRunner(CompilerTestType.Regressions);
        case "fourslash":
            return new FourSlashRunner(FourSlashTestType.Native);
        case "fourslash-shims":
            return new FourSlashRunner(FourSlashTestType.Shims);
        case "fourslash-shims-pp":
            return new FourSlashRunner(FourSlashTestType.ShimsWithPreprocess);
        case "fourslash-server":
            return new FourSlashRunner(FourSlashTestType.Server);
        case "project":
            return new project.ProjectRunner();
        case "rwc":
            return new RWCRunner();
        case "test262":
            return new Test262BaselineRunner();
        case "user":
            return new UserCodeRunner();
        case "dt":
            return new DefinitelyTypedRunner();
    }
    ts.Debug.fail(`Unknown runner kind ${kind}`);
}

// users can define tests to run in mytest.config that will override cmd line args, otherwise use cmd line args (test.config), otherwise no options

const mytestconfigFileName = "mytest.config";
const testconfigFileName = "test.config";

const customConfig = tryGetConfig(Harness.IO.args());
let testConfigContent =
    customConfig && Harness.IO.fileExists(customConfig)
        ? Harness.IO.readFile(customConfig)
        : Harness.IO.fileExists(mytestconfigFileName)
            ? Harness.IO.readFile(mytestconfigFileName)
            : Harness.IO.fileExists(testconfigFileName) ? Harness.IO.readFile(testconfigFileName) : "";

let taskConfigsFolder: string;
let workerCount: number;
let runUnitTests: boolean | undefined;
let stackTraceLimit: number | "full" | undefined;
let noColors = false;

interface TestConfig {
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
}

interface TaskSet {
    runner: TestRunnerKind;
    files: string[];
}

let configOption: string;
let globalTimeout: number;
function handleTestConfig() {
    if (testConfigContent !== "") {
        const testConfig = <TestConfig>JSON.parse(testConfigContent);
        if (testConfig.light) {
            Harness.lightMode = true;
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

        if (testConfig.stackTraceLimit === "full") {
            (<any>Error).stackTraceLimit = Infinity;
            stackTraceLimit = testConfig.stackTraceLimit;
        }
        else if ((+testConfig.stackTraceLimit | 0) > 0) {
            (<any>Error).stackTraceLimit = +testConfig.stackTraceLimit | 0;
            stackTraceLimit = +testConfig.stackTraceLimit | 0;
        }
        if (testConfig.listenForWork) {
            return true;
        }

        const runnerConfig = testConfig.runners || testConfig.test;
        if (runnerConfig && runnerConfig.length > 0) {
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
                        runners.push(new project.ProjectRunner());
                        break;
                    case "conformance":
                        runners.push(new CompilerBaselineRunner(CompilerTestType.Conformance));
                        break;
                    case "project":
                        runners.push(new project.ProjectRunner());
                        break;
                    case "fourslash":
                        runners.push(new FourSlashRunner(FourSlashTestType.Native));
                        break;
                    case "fourslash-shims":
                        runners.push(new FourSlashRunner(FourSlashTestType.Shims));
                        break;
                    case "fourslash-shims-pp":
                        runners.push(new FourSlashRunner(FourSlashTestType.ShimsWithPreprocess));
                        break;
                    case "fourslash-server":
                        runners.push(new FourSlashRunner(FourSlashTestType.Server));
                        break;
                    case "fourslash-generated":
                        runners.push(new GeneratedFourslashRunner(FourSlashTestType.Native));
                        break;
                    case "rwc":
                        runners.push(new RWCRunner());
                        break;
                    case "test262":
                        runners.push(new Test262BaselineRunner());
                        break;
                    case "user":
                        runners.push(new UserCodeRunner());
                        break;
                    case "dt":
                        runners.push(new DefinitelyTypedRunner());
                        break;
                }
            }
        }
    }

    if (runners.length === 0) {
        // compiler
        runners.push(new CompilerBaselineRunner(CompilerTestType.Conformance));
        runners.push(new CompilerBaselineRunner(CompilerTestType.Regressions));

        // TODO: project tests don"t work in the browser yet
        if (Utils.getExecutionEnvironment() !== Utils.ExecutionEnvironment.Browser) {
            runners.push(new project.ProjectRunner());
        }

        // language services
        runners.push(new FourSlashRunner(FourSlashTestType.Native));
        runners.push(new FourSlashRunner(FourSlashTestType.Shims));
        runners.push(new FourSlashRunner(FourSlashTestType.ShimsWithPreprocess));
        runners.push(new FourSlashRunner(FourSlashTestType.Server));
        // runners.push(new GeneratedFourslashRunner());

        // CRON-only tests
        if (Utils.getExecutionEnvironment() !== Utils.ExecutionEnvironment.Browser && process.env.TRAVIS_EVENT_TYPE === "cron") {
            runners.push(new UserCodeRunner());
        }
    }
    if (runUnitTests === undefined) {
        runUnitTests = runners.length !== 1; // Don't run unit tests when running only one runner if unit tests were not explicitly asked for
    }
}

function beginTests() {
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

let isWorker: boolean;
function startTestEnvironment() {
    isWorker = handleTestConfig();
    if (Utils.getExecutionEnvironment() !== Utils.ExecutionEnvironment.Browser) {
        if (isWorker) {
            return Harness.Parallel.Worker.start();
        }
        else if (taskConfigsFolder && workerCount && workerCount > 1) {
            return Harness.Parallel.Host.start();
        }
    }
    beginTests();
}

startTestEnvironment();
