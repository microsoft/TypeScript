/// <reference types="mocha" />
import * as io from "./io";
import * as vpath from "./vpath";
import * as ts from "./api";
import { TestRunTask, TestRunnerKind } from "./runner";
import { getTestConfig, TestConfig } from "./config";
import { parseCommandLine } from "./options";
import { getExecutionEnvironment, ExecutionEnvironment } from "./utils";
import { CompilerRunner } from "./runners/compiler";
import { install } from "source-map-support";

// enable source
install();

// start harness
main();

/**
 * Get tasks that describe the test runners and test cases to use in this session.
 */
function getTestRunTasks(config: TestConfig): TestRunTask[] {
    const runners: TestRunTask[] = [];

    // If `tasks` have been specified, add each task
    if (config.tasks) {
        for (const testRun of config.tasks) {
            runners.push(testRun);
        }
    }

    // if `test` has been specified, add each test suite.
    if (config.test) {
        for (const option of config.test) {
            switch (option) {
                case "compiler":
                    runners.push({ runner: "conformance" });
                    runners.push({ runner: "compiler" });
                    // runners.push({ runner: "project" });
                    break;
                case "conformance":
                    runners.push({ runner: "conformance" });
                    break;
                // case "project":
                //     runners.push({ runner: "project" });
                //     break;
                // case "fourslash":
                //     runners.push({ runner: "fourslash" });
                //     break;
                // case "fourslash-shims":
                //     runners.push({ runner: "fourslash-shims" });
                //     break;
                // case "fourslash-shims-pp":
                //     runners.push({ runner: "fourslash-shims-pp" });
                //     break;
                // case "fourslash-server":
                //     runners.push({ runner: "fourslash-server" });
                //     break;
                // case "fourslash-generated":
                //     runners.push({ runner: "fourslash-generated" });
                //     break;
                // case "rwc":
                //     runners.push({ runner: "rwc" });
                //     break;
                // case "test262":
                //     runners.push({ runner: "test262" });
                //     break;
            }
        }
    }

    // if nothing has been specified, add defaults.
    if (runners.length === 0) {
        // compiler
        runners.push({ runner: "conformance" });
        runners.push({ runner: "compiler" });

        // TODO: project tests don't work in the browser yet
        if (getExecutionEnvironment() !== ExecutionEnvironment.Browser) {
            // runners.push({ runner: "project" });
        }

        // language services
        // runners.push({ runner: "fourslash" });
        // runners.push({ runner: "fourslash-shims" });
        // runners.push({ runner: "fourslash-shims-pp" });
        // runners.push({ runner: "fourslash-server" });
    }

    return runners;
}

/**
 * Creates a test runner for the provided kind.
 * @param kind The kind of runner to create
 * @param config The test harness configuration
 */
function createRunner(kind: TestRunnerKind, config: TestConfig) {
    switch (kind) {
        case "conformance": return new CompilerRunner(kind, config);
        case "compiler": return new CompilerRunner(kind, config);
    }
}

/**
 * Divides the tasks in this session into one or more partitions to be run in parallel.
 * Tests discovered are distributed between partitions as evenly as possible, with the exception
 * that the last partition will also run the unit tests.
 * @param taskConfigsFolder The folder into which test partition configuration files should be written.
 * @param tasks The tasks for the session that should be partitioned.
 */
function discoverTests(config: TestConfig, tasks: TestRunTask[]) {
    if (!config.taskConfigsFolder) throw new Error("Property 'taskConfigsFolder' not specified in config.");
    if (!config.workerCount) throw new Error("Property 'workerCount' not specified in config.");

    // Create partitions
    const partitions: TestConfig[] = [];
    for (let i = 0; i < config.workerCount; i++) {
        // Use the last worker to run unit tests. This may need to be changed in the future...
        partitions.push({ light: config.light, tasks: [], runUnitTests: i === config.workerCount - 1 });
    }

    // Add tasks to each partition
    for (const task of tasks) {
        const runner = createRunner(task.runner, config);
        const tests = runner.discover();
        const remainder = tests.length % config.workerCount;
        const quotient = (tests.length - remainder) / config.workerCount;
        let end = -1;
        for (let i = 0; i < config.workerCount; i++) {
            // We know that `tasks` is defined as we provided it above.
            const tasks = partitions[i].tasks!;
            const start = end + 1;
            end = i < remainder ? start + quotient : start + quotient - 1;
            tasks.push({ runner: runner.kind, tests: tests.slice(start, end) });
        }
    }

    // Write each partition configuration.
    for (let i = 0; i < config.workerCount; i++) {
        io.writeFile(vpath.combine(config.taskConfigsFolder, `task-config${i}.json`), JSON.stringify(partitions[i]));
    }
}

/**
 * Runs the provided tests.
 * @param tasks The tasks for the session that should be run.
 */
function runTests(config: TestConfig, tasks: TestRunTask[]) {
    // Set stack trace limit
    if (config.stackTraceLimit === "full") {
        Error.stackTraceLimit = Infinity;
    }
    else if (config.stackTraceLimit !== undefined) {
        Error.stackTraceLimit = config.stackTraceLimit;
    }

    // Enable debugging support
    if (ts.Debug.isDebugging) {
        ts.Debug.enableDebugInfo();
    }

    // Run tests
    for (const task of tasks) {
        const runner = createRunner(task.runner, config);
        runner.run(task.tests);
    }
}

/**
 * Main entrypoint for the harness.
 */
function main() {
    const args = parseCommandLine(io.args());
    const config = getTestConfig(args);
    const tasks = getTestRunTasks(config);
    if (args.discover) {
        discoverTests(config, tasks);
    }
    else {
        runTests(config, tasks);
    }
    if (!config.runUnitTests) {
        // patch `describe` to skip unit tests
        // FIXME(rbuckton): We need to have a better way to handle this.
        (<any>global).describe = function () { };
    }
}