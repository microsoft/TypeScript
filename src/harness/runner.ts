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
    listenForWork?: boolean;
    workerCount?: number;
    stackTraceLimit?: number | "full";
    test?: string[];
    runUnitTests?: boolean;
}

interface TaskSet {
    runner: TestRunnerKind;
    files: string[];
}

function handleTestConfig() {
    if (testConfigContent !== "") {
        const testConfig = <TestConfig>JSON.parse(testConfigContent);
        if (testConfig.listenForWork) {
            return true;
        }
        if (testConfig.light) {
            Harness.lightMode = true;
        }
        if (testConfig.runUnitTests !== undefined) {
            runUnitTests = testConfig.runUnitTests;
        }
        if (testConfig.workerCount) {
            workerCount = testConfig.workerCount;
        }
        if (testConfig.taskConfigsFolder) {
            taskConfigsFolder = testConfig.taskConfigsFolder;
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
}

function beginTests() {
    if (ts.Debug.isDebugging) {
        ts.Debug.enableDebugInfo();
    }

    runTests(runners);

    if (!runUnitTests) {
        // patch `describe` to skip unit tests
        describe = ts.noop as any;
    }
}

type ParallelTestMessage = { type: "test", payload: { runner: TestRunnerKind, file: string } } | never;
type ParallelCloseMessage = { type: "close" } | never;
type ParallelHostMessage = ParallelTestMessage | ParallelCloseMessage;

type ParallelErrorMessage = { type: "error", payload: { error: string, stack: string } } | never;
type ErrorInfo = ParallelErrorMessage["payload"] & { name: string };
type ParallelResultMessage = { type: "result", payload: { passing: number, errors: ErrorInfo[] } } | never;
type ParallelClientMessage = ParallelErrorMessage | ParallelResultMessage;

let errors: ErrorInfo[] = [];
let passing = 0;
function resetShimHarnessAndExecute(runner: RunnerBase) {
    errors = [];
    passing = 0;
    runner.initializeTests();
    return { errors, passing };
}

function shimMochaHarness() {
    let beforeEachFunc: Function;
    describe = ((_name, callback) => {
        const fakeContext: Mocha.ISuiteCallbackContext = {
            retries() { return this; },
            slow() { return this; },
            timeout() { return this; },
        };
        (before as any) = (cb: Function) => cb();
        let afterFunc: Function;
        (after as any) = (cb: Function) => afterFunc = cb;
        const savedBeforeEach = beforeEachFunc;
        (beforeEach as any) = (cb: Function) => beforeEachFunc = cb;
        callback.call(fakeContext);
        afterFunc && afterFunc();
        afterFunc = undefined;
        beforeEachFunc = savedBeforeEach;
    }) as Mocha.IContextDefinition;
    it = ((name, callback) => {
        const fakeContext: Mocha.ITestCallbackContext = {
            skip() { return this; },
            timeout() { return this; },
            retries() { return this; },
            slow() { return this; },
        };
        // TODO: If we ever start using async test completions, polyfill the `done` parameter/promise return handling
        if (beforeEachFunc) {
            try {
                beforeEachFunc();
            }
            catch (error) {
                errors.push({ error: error.message, stack: error.stack, name });
                return;
            }
        }
        try {
            callback.call(fakeContext);
        }
        catch (error) {
            errors.push({ error: error.message, stack: error.stack, name });
            return;
        }
        passing++;
    }) as Mocha.ITestDefinition;
}

function beginWorkListener() {
    shimMochaHarness();
    const runners = ts.createMap<RunnerBase>();
    process.on("message", (data: ParallelHostMessage) => {
        switch (data.type) {
            case "test":
                const { runner, file } = data.payload;
                if (!runners.has(runner)) {
                    runners.set(runner, createRunner(runner));
                }
                const instance = runners.get(runner);
                instance.tests = [];
                instance.addTest(file);
                const payload = resetShimHarnessAndExecute(instance);
                const message: ParallelResultMessage = { type: "result", payload };
                process.send(message);
                break;
            case "close":
                process.exit(0);
                break;
        }
    });
    process.on("uncaughtException", error => {
        const message: ParallelErrorMessage = { type: "error", payload: { error: error.message, stack: error.stack } };
        process.send(message);
    });
}

interface ChildProcessPartial {
    send(message: any, callback?: (error: Error) => void): boolean;
    on(event: "error", listener: (err: Error) => void): this;
    on(event: "exit", listener: (code: number, signal: string) => void): this;
    on(event: "message", listener: (message: any) => void): this;
    disconnect(): void;
}

function beginTestHost() {
    const { statSync }: { statSync(path: string): { size: number }; } = require("fs");
    const tasks: { runner: TestRunnerKind, file: string, size: number }[] = [];
    for (const runner of runners) {
        const files = runner.enumerateTestFiles();
        for (const file in files) {
            tasks.push({ runner: runner.kind(), file, size: statSync(file).size });
        }
    }
    tasks.sort((a, b) => a.size - b.size);
    const { fork }: { fork(modulePath: string, args?: string[], options?: {}): ChildProcessPartial; } = require("child_process");

    const totalFiles = tasks.length;
    console.log(`1..${totalFiles}`);
    let passingFiles = 0;
    let failingFiles = 0;
    let errorResults: ErrorInfo[] = [];
    let totalPassing = 0;
    for (let i = 0; i < workerCount; i++) {
        // TODO: Just send the config over the IPC channel or in the command line arguments
        const config: TestConfig = { light: Harness.lightMode, listenForWork: true, runUnitTests: runners.length !== 1 && i === workerCount - 1 };
        const configPath = ts.combinePaths(taskConfigsFolder, `task-config${i}.json`);
        Harness.IO.writeFile(configPath, JSON.stringify(config));
        const child = fork(__filename, [`--config="${configPath}"`]);
        child.on("error", err => {
            child.disconnect();
            console.error(err);
        });
        child.on("exit", (code, _signal) => {
            child.disconnect();
            if (code !== 0) {
                console.error("Test worker process exited with nonzero exit code!");
            }
        });
        child.on("message", (data: ParallelClientMessage) => {
            switch (data.type) {
                case "error":
                child.disconnect();
                console.error(`Test worker encounted unexpected error and was forced to close:
Message: ${data.payload.error}
Stack: ${data.payload.stack}`);
                return;
                case "result":
                totalPassing += data.payload.passing;
                if (data.payload.errors.length) {
                    errorResults = errorResults.concat(data.payload.errors);
                    failingFiles++;
                    console.log(`not ok ${passingFiles + failingFiles} - ${data.payload.errors.map(e => `test ${e.name} failed! Error: ${e.error.replace(/\r?\n/g, " ")} Stack: ${e.stack.replace(/\r?\n/g, " ")}`).join(" | ")}`);
                }
                else {
                    passingFiles++;
                    console.log(`ok ${passingFiles + failingFiles}`);
                }
                if (failingFiles + passingFiles === totalFiles) {
                    // Done. Finished every task and collected results.
                    child.send({ type: "close" });
                    child.disconnect();
                    return process.exit(errorResults.length);
                }
                if (tasks.length === 0) {
                    // No more tasks to distribute
                    child.send({ type: "close" });
                    child.disconnect();
                    return;
                }
                child.send({ type: "test", payload: tasks.pop() });
            }
        });
        child.send({ type: "test", payload: tasks.pop() });
    }
}

function startTestEnvironment() {
    const isWorker = handleTestConfig();
    if (Utils.getExecutionEnvironment() !== Utils.ExecutionEnvironment.Browser) {
        if (isWorker) {
            return beginWorkListener();
        }
        else if (taskConfigsFolder && workerCount && workerCount > 1) {
            return beginTestHost();
        }
    }
    beginTests();
}

startTestEnvironment();

