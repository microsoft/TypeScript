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
/// <reference path="harness.ts" />

let runners: RunnerBase[] = [];
let iterations = 1;

function runTests(runners: RunnerBase[]) {
    for (let i = iterations; i > 0; i--) {
        for (let j = 0; j < runners.length; j++) {
            runners[j].initializeTests();
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
            return new ProjectRunner();
        case "rwc":
            return new RWCRunner();
        case "test262":
            return new Test262BaselineRunner();
    }
}

if (Harness.IO.tryEnableSourceMapsForHost && /^development$/i.test(Harness.IO.getEnvironmentVariable("NODE_ENV"))) {
    Harness.IO.tryEnableSourceMapsForHost();
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
let runUnitTests = true;

interface TestConfig {
    light?: boolean;
    taskConfigsFolder?: string;
    workerCount?: number;
    stackTraceLimit?: number | "full";
    tasks?: TaskSet[];
    test?: string[];
    runUnitTests?: boolean;
}

interface TaskSet {
    runner: TestRunnerKind;
    files: string[];
}

if (testConfigContent !== "") {
    const testConfig = <TestConfig>JSON.parse(testConfigContent);
    if (testConfig.light) {
        Harness.lightMode = true;
    }
    if (testConfig.taskConfigsFolder) {
        taskConfigsFolder = testConfig.taskConfigsFolder;
    }
    if (testConfig.runUnitTests !== undefined) {
        runUnitTests = testConfig.runUnitTests;
    }
    if (testConfig.workerCount) {
        workerCount = testConfig.workerCount;
    }
    if (testConfig.tasks) {
        for (const taskSet of testConfig.tasks) {
            const runner = createRunner(taskSet.runner);
            for (const file of taskSet.files) {
                runner.addTest(file);
            }
            runners.push(runner);
        }
    }

    if (testConfig.stackTraceLimit === "full") {
        (<any>Error).stackTraceLimit = Infinity;
    }
    else if ((+testConfig.stackTraceLimit | 0) > 0) {
        (<any>Error).stackTraceLimit = testConfig.stackTraceLimit;
    }

    if (testConfig.test && testConfig.test.length > 0) {
        for (const option of testConfig.test) {
            if (!option) {
                continue;
            }

            switch (option) {
                case "compiler":
                    runners.push(new CompilerBaselineRunner(CompilerTestType.Conformance));
                    runners.push(new CompilerBaselineRunner(CompilerTestType.Regressions));
                    runners.push(new ProjectRunner());
                    break;
                case "conformance":
                    runners.push(new CompilerBaselineRunner(CompilerTestType.Conformance));
                    break;
                case "project":
                    runners.push(new ProjectRunner());
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
            }
        }
    }
}

if (runners.length === 0) {
    // compiler
    runners.push(new CompilerBaselineRunner(CompilerTestType.Conformance));
    runners.push(new CompilerBaselineRunner(CompilerTestType.Regressions));

    // TODO: project tests don't work in the browser yet
    if (Utils.getExecutionEnvironment() !== Utils.ExecutionEnvironment.Browser) {
        runners.push(new ProjectRunner());
    }

    // language services
    runners.push(new FourSlashRunner(FourSlashTestType.Native));
    runners.push(new FourSlashRunner(FourSlashTestType.Shims));
    runners.push(new FourSlashRunner(FourSlashTestType.ShimsWithPreprocess));
    runners.push(new FourSlashRunner(FourSlashTestType.Server));
    // runners.push(new GeneratedFourslashRunner());
}

if (taskConfigsFolder) {
    // this instance of mocha should only partition work but not run actual tests
    runUnitTests = false;
    const workerConfigs: TestConfig[] = [];
    for (let i = 0; i < workerCount; i++) {
        // pass light mode settings to workers
        workerConfigs.push({ light: Harness.lightMode, tasks: [] });
    }

    for (const runner of runners) {
        const files = runner.enumerateTestFiles();
        const chunkSize = Math.floor(files.length / workerCount) + 1; // add extra 1 to prevent missing tests due to rounding
        for (let i = 0; i < workerCount; i++) {
            const startPos = i * chunkSize;
            const len = Math.min(chunkSize, files.length - startPos);
            if (len > 0) {
                workerConfigs[i].tasks.push({
                    runner: runner.kind(),
                    files: files.slice(startPos, startPos + len)
                });
            }
        }
    }

    for (let i = 0; i < workerCount; i++) {
        const config = workerConfigs[i];
        // use last worker to run unit tests
        config.runUnitTests = i === workerCount - 1;
        Harness.IO.writeFile(ts.combinePaths(taskConfigsFolder, `task-config${i}.json`), JSON.stringify(workerConfigs[i]));
    }
}
else {
    runTests(runners);
}
if (!runUnitTests) {
    // patch `describe` to skip unit tests
    describe = ts.noop as any;
}
