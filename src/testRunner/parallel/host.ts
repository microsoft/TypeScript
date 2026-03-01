import { fork } from "child_process";
import { statSync } from "fs";
import Mocha from "mocha";
import ms from "ms";
import os from "os";
import path from "path";
import readline from "readline";
import tty from "tty";
import {
    configOption,
    globalTimeout,
    IO,
    keepFailed,
    lightMode,
    noColors,
    runners,
    runUnitTests,
    stackTraceLimit,
    taskConfigsFolder,
    TestConfig,
    TestRunnerKind,
    workerCount,
} from "../_namespaces/Harness.js";
import {
    ErrorInfo,
    ParallelClientMessage,
    ParallelHostMessage,
    shimNoopTestInterface,
    Task,
    TaskTimeout,
    TestInfo,
} from "../_namespaces/Harness.Parallel.js";
import * as ts from "../_namespaces/ts.js";
import * as Utils from "../_namespaces/Utils.js";

export function start(importTests: () => Promise<unknown>): void {
    const Base = Mocha.reporters.Base;
    const color = Base.color;
    const cursor = Base.cursor;
    const isatty = tty.isatty(1) && tty.isatty(2);

    // NOTE: paths for module and types for FailedTestReporter _do not_ line up when bundled
    const FailedTestReporter = require(Utils.findUpFile("scripts/failed-tests.cjs")) as typeof import("../../../scripts/failed-tests.cjs");

    const perfdataFileNameFragment = ".parallelperf";
    const perfData = readSavedPerfData(configOption);
    const newTasks: Task[] = [];
    let tasks: Task[] = [];
    let unknownValue: string | undefined;
    let totalCost = 0;

    class RemoteSuite extends Mocha.Suite {
        suiteMap = new Map<string, RemoteSuite>();
        constructor(title: string) {
            super(title);
            this.pending = false;
            this.delayed = false;
        }
        override addSuite(suite: RemoteSuite) {
            super.addSuite(suite);
            this.suiteMap.set(suite.title, suite);
            return this;
        }
        override addTest(test: RemoteTest) {
            return super.addTest(test);
        }
    }

    class RemoteTest extends Mocha.Test {
        info: ErrorInfo | TestInfo;
        constructor(info: ErrorInfo | TestInfo) {
            super(info.name[info.name.length - 1]);
            this.info = info;
            this.state = "error" in info ? "failed" : "passed"; // eslint-disable-line local/no-in-operator
            this.pending = false;
        }
    }

    interface Worker {
        process: import("child_process").ChildProcess;
        accumulatedOutput: string;
        currentTasks?: { file: string; }[];
        timer?: any;
    }

    interface ProgressBarsOptions {
        open: string;
        close: string;
        complete: string;
        incomplete: string;
        width: number;
        noColors: boolean;
    }

    interface ProgressBar {
        lastN?: number;
        title?: string;
        progressColor?: string;
        text?: string;
    }

    class ProgressBars {
        public readonly _options: Readonly<ProgressBarsOptions>;
        private _enabled: boolean;
        private _lineCount: number;
        private _progressBars: ProgressBar[];
        constructor(options?: Partial<ProgressBarsOptions>) {
            if (!options) options = {};
            const open = options.open || "[";
            const close = options.close || "]";
            const complete = options.complete || "▬";
            const incomplete = options.incomplete || Base.symbols.dot;
            const maxWidth = Base.window.width - open.length - close.length - 34;
            const width = minMax(options.width || maxWidth, 10, maxWidth);
            this._options = {
                open,
                complete,
                incomplete,
                close,
                width,
                noColors: options.noColors || false,
            };

            this._progressBars = [];
            this._lineCount = 0;
            this._enabled = false;
        }
        enable() {
            if (!this._enabled) {
                process.stdout.write(os.EOL);
                this._enabled = true;
            }
        }
        disable() {
            if (this._enabled) {
                process.stdout.write(os.EOL);
                this._enabled = false;
            }
        }
        update(index: number, percentComplete: number, color: string, title: string | undefined, titleColor?: string) {
            percentComplete = minMax(percentComplete, 0, 1);

            const progressBar = this._progressBars[index] || (this._progressBars[index] = {});
            const width = this._options.width;
            const n = Math.floor(width * percentComplete);
            const i = width - n;
            if (n === progressBar.lastN && title === progressBar.title && color === progressBar.progressColor) {
                return;
            }

            progressBar.lastN = n;
            progressBar.title = title;
            progressBar.progressColor = color;

            let progress = "  ";
            progress += this._color("progress", this._options.open);
            progress += this._color(color, fill(this._options.complete, n));
            progress += this._color("progress", fill(this._options.incomplete, i));
            progress += this._color("progress", this._options.close);

            if (title) {
                progress += this._color(titleColor || "progress", " " + title);
            }

            if (progressBar.text !== progress) {
                progressBar.text = progress;
                this._render(index);
            }
        }
        private _render(index: number) {
            if (!this._enabled || !isatty) {
                return;
            }

            cursor.hide();
            readline.moveCursor(process.stdout, -process.stdout.columns, -this._lineCount);
            let lineCount = 0;
            const numProgressBars = this._progressBars.length;
            for (let i = 0; i < numProgressBars; i++) {
                if (i === index) {
                    readline.clearLine(process.stdout, 1);
                    process.stdout.write(this._progressBars[i].text + os.EOL);
                }
                else {
                    readline.moveCursor(process.stdout, -process.stdout.columns, +1);
                }

                lineCount++;
            }

            this._lineCount = lineCount;
            cursor.show();
        }
        private _color(type: string, text: string) {
            return type && !this._options.noColors ? color(type, text) : text;
        }
    }

    function perfdataFileName(target?: string) {
        return `${perfdataFileNameFragment}${target ? `.${target}` : ""}.json`;
    }

    function readSavedPerfData(target?: string): { [testHash: string]: number; } | undefined {
        const perfDataContents = IO.readFile(perfdataFileName(target));
        if (perfDataContents) {
            return JSON.parse(perfDataContents);
        }
        return undefined;
    }

    function hashName(runner: TestRunnerKind | "unittest", test: string) {
        return `tsrunner-${runner}://${test}`;
    }

    function startDelayed(perfData: { [testHash: string]: number; } | undefined, totalCost: number) {
        console.log(`Discovered ${tasks.length} unittest suites` + (newTasks.length ? ` and ${newTasks.length} new suites.` : "."));
        console.log("Discovering runner-based tests...");
        const discoverStart = +(new Date());
        for (const runner of runners) {
            for (const file of runner.getTestFiles()) {
                let size: number;
                if (!perfData) {
                    try {
                        size = statSync(path.join(runner.workingDirectory, file)).size;
                    }
                    catch {
                        // May be a directory
                        try {
                            size = IO.listFiles(path.join(runner.workingDirectory, file), /.*/g, { recursive: true }).reduce((acc, elem) => acc + statSync(elem).size, 0);
                        }
                        catch {
                            // Unknown test kind, just return 0 and let the historical analysis take over after one run
                            size = 0;
                        }
                    }
                }
                else {
                    const hashedName = hashName(runner.kind(), file);
                    size = perfData[hashedName];
                    if (size === undefined) {
                        size = 0;
                        unknownValue = hashedName;
                        newTasks.push({ runner: runner.kind(), file, size });
                        continue;
                    }
                }
                tasks.push({ runner: runner.kind(), file, size });
                totalCost += size;
            }
        }
        tasks.sort((a, b) => a.size - b.size);
        tasks = tasks.concat(newTasks);
        const batchCount = workerCount;
        const packfraction = 0.9;
        const chunkSize = 1000; // ~1KB or 1s for sending batches near the end of a test
        const batchSize = (totalCost / workerCount) * packfraction; // Keep spare tests for unittest thread in reserve
        console.log(`Discovered ${tasks.length} test files in ${+(new Date()) - discoverStart}ms.`);
        console.log(`Starting to run tests using ${workerCount} threads...`);

        const totalFiles = tasks.length;
        let passingFiles = 0;
        let failingFiles = 0;
        let errorResults: ErrorInfo[] = [];
        let passingResults: { name: string[]; }[] = [];
        let totalPassing = 0;
        const startDate = new Date();

        const progressBars = new ProgressBars({ noColors });
        const progressUpdateInterval = 1 / progressBars._options.width;
        let nextProgress = progressUpdateInterval;

        const newPerfData: { [testHash: string]: number; } = {};

        const workers: Worker[] = [];
        let closedWorkers = 0;
        for (let i = 0; i < workerCount; i++) {
            // TODO: Just send the config over the IPC channel or in the command line arguments
            const config: TestConfig = { light: lightMode, listenForWork: true, runUnitTests, stackTraceLimit, timeout: globalTimeout };
            const configPath = ts.combinePaths(taskConfigsFolder, `task-config${i}.json`);
            IO.writeFile(configPath, JSON.stringify(config));
            const worker: Worker = {
                process: fork(process.argv[1], [`--config="${configPath}"`], { stdio: ["pipe", "pipe", "pipe", "ipc"] }),
                accumulatedOutput: "",
                currentTasks: undefined,
                timer: undefined,
            };
            const appendOutput = (d: Buffer) => {
                worker.accumulatedOutput += d.toString();
                console.log(`[Worker ${i}]`, d.toString());
            };
            worker.process.stderr!.on("data", appendOutput);
            worker.process.stdout!.on("data", appendOutput);
            const killChild = (timeout: TaskTimeout) => {
                worker.process.kill();
                console.error(`Worker exceeded ${timeout.duration}ms timeout ${worker.currentTasks && worker.currentTasks.length ? `while running test '${worker.currentTasks[0].file}'.` : `during test setup.`}`);
                return process.exit(2);
            };
            worker.process.on("error", err => {
                console.error("Unexpected error in child process:");
                console.error(err);
                return process.exit(2);
            });
            worker.process.on("exit", (code, _signal) => {
                if (code !== 0) {
                    console.error(`Test worker process exited with nonzero exit code! Output:
    ${worker.accumulatedOutput}`);
                    return process.exit(2);
                }
            });
            worker.process.on("message", (data: ParallelClientMessage) => {
                switch (data.type) {
                    case "error": {
                        console.error(`Test worker encountered unexpected error${data.payload.name ? ` during the execution of test ${data.payload.name}` : ""} and was forced to close:
            Message: ${data.payload.error}
            Stack: ${data.payload.stack}`);
                        return process.exit(2);
                    }
                    case "timeout": {
                        if (worker.timer) {
                            clearTimeout(worker.timer);
                        }
                        if (data.payload.duration === "reset") {
                            worker.timer = undefined;
                        }
                        else {
                            worker.timer = setTimeout(killChild, data.payload.duration, data.payload);
                        }
                        break;
                    }
                    case "progress":
                    case "result": {
                        if (worker.currentTasks) {
                            worker.currentTasks.shift();
                        }
                        totalPassing += data.payload.passing;
                        if (data.payload.errors.length) {
                            errorResults = errorResults.concat(data.payload.errors);
                            passingResults = passingResults.concat(data.payload.passes);
                            failingFiles++;
                        }
                        else {
                            passingResults = passingResults.concat(data.payload.passes);
                            passingFiles++;
                        }
                        newPerfData[hashName(data.payload.task.runner, data.payload.task.file)] = data.payload.duration;

                        const progress = (failingFiles + passingFiles) / totalFiles;
                        if (progress >= nextProgress) {
                            while (nextProgress < progress) {
                                nextProgress += progressUpdateInterval;
                            }
                            updateProgress(progress, errorResults.length ? `${errorResults.length} failing` : `${totalPassing} passing`, errorResults.length ? "fail" : undefined);
                        }

                        if (data.type === "result") {
                            if (tasks.length === 0) {
                                // No more tasks to distribute
                                worker.process.send({ type: "close" });
                                closedWorkers++;
                                if (closedWorkers === workerCount) {
                                    outputFinalResult();
                                }
                                return;
                            }
                            // Send tasks in blocks if the tasks are small
                            const taskList = [tasks.pop()!];
                            while (tasks.length && taskList.reduce((p, c) => p + c.size, 0) < chunkSize) {
                                taskList.push(tasks.pop()!);
                            }
                            worker.currentTasks = taskList;
                            if (taskList.length === 1) {
                                worker.process.send({ type: "test", payload: taskList[0] } satisfies ParallelHostMessage); // TODO: GH#18217
                            }
                            else {
                                worker.process.send({ type: "batch", payload: taskList } satisfies ParallelHostMessage); // TODO: GH#18217
                            }
                        }
                    }
                }
            });
            workers.push(worker);
        }

        // It's only really worth doing an initial batching if there are a ton of files to go through (and they have estimates)
        if (totalFiles > 1000 && batchSize > 0) {
            console.log("Batching initial test lists...");
            const batches: { runner: TestRunnerKind | "unittest"; file: string; size: number; }[][] = new Array(batchCount);
            const doneBatching = new Array(batchCount);
            let scheduledTotal = 0;
            batcher:
            while (true) {
                for (let i = 0; i < batchCount; i++) {
                    if (tasks.length <= workerCount) { // Keep a small reserve even in the suboptimally packed case
                        console.log(`Suboptimal packing detected: no tests remain to be stolen. Reduce packing fraction from ${packfraction} to fix.`);
                        break batcher;
                    }
                    if (doneBatching[i]) {
                        continue;
                    }
                    if (!batches[i]) {
                        batches[i] = [];
                    }
                    const total = batches[i].reduce((p, c) => p + c.size, 0);
                    if (total >= batchSize) {
                        doneBatching[i] = true;
                        continue;
                    }
                    const task = tasks.pop()!;
                    batches[i].push(task);
                    scheduledTotal += task.size;
                }
                for (let j = 0; j < batchCount; j++) {
                    if (!doneBatching[j]) {
                        continue batcher;
                    }
                }
                break;
            }
            const prefix = `Batched into ${batchCount} groups`;
            if (unknownValue) {
                console.log(`${prefix}. Unprofiled tests including ${unknownValue} will be run first.`);
            }
            else {
                console.log(`${prefix} with approximate total ${perfData ? "time" : "file sizes"} of ${perfData ? ms(batchSize) : `${Math.floor(batchSize)} bytes`} in each group. (${(scheduledTotal / totalCost * 100).toFixed(1)}% of total tests batched)`);
            }
            for (const worker of workers) {
                const payload = batches.pop();
                if (payload) {
                    worker.currentTasks = payload;
                    worker.process.send({ type: "batch", payload });
                }
                else { // Out of batches, send off just one test
                    const payload = tasks.pop()!;
                    ts.Debug.assert(!!payload); // The reserve kept above should ensure there is always an initial task available, even in suboptimal scenarios
                    worker.currentTasks = [payload];
                    worker.process.send({ type: "test", payload });
                }
            }
        }
        else {
            for (let i = 0; i < workerCount; i++) {
                const task = tasks.pop()!;
                workers[i].currentTasks = [task];
                workers[i].process.send({ type: "test", payload: task });
            }
        }

        progressBars.enable();
        updateProgress(0);
        let duration: number;
        let endDate: Date;

        function completeBar() {
            const isPartitionFail = failingFiles !== 0;
            const summaryColor = isPartitionFail ? "fail" : "green";
            const summarySymbol = isPartitionFail ? Base.symbols.err : Base.symbols.ok;

            const summaryTests = (isPartitionFail ? totalPassing + "/" + (errorResults.length + totalPassing) : totalPassing) + " passing";
            const summaryDuration = "(" + ms(duration) + ")";
            const savedUseColors = Base.useColors;
            Base.useColors = !noColors;

            const summary = color(summaryColor, summarySymbol + " " + summaryTests) + " " + color("light", summaryDuration);
            Base.useColors = savedUseColors;

            updateProgress(1, summary);
        }

        function updateProgress(percentComplete: number, title?: string, titleColor?: string) {
            let progressColor = "pending";
            if (failingFiles) {
                progressColor = "fail";
            }

            progressBars.update(
                0,
                percentComplete,
                progressColor,
                title,
                titleColor,
            );
        }

        function outputFinalResult() {
            function patchStats(stats: Mocha.Stats) {
                Object.defineProperties(stats, {
                    start: {
                        configurable: true,
                        enumerable: true,
                        get() {
                            return startDate;
                        },
                        set(_: Date) {/*do nothing*/},
                    },
                    end: {
                        configurable: true,
                        enumerable: true,
                        get() {
                            return endDate;
                        },
                        set(_: Date) {/*do nothing*/},
                    },
                    duration: {
                        configurable: true,
                        enumerable: true,
                        get() {
                            return duration;
                        },
                        set(_: number) {/*do nothing*/},
                    },
                });
            }

            function rebuildSuite(failures: ErrorInfo[], passes: TestInfo[]) {
                const root = new RemoteSuite("");
                for (const result of [...failures, ...passes] as (ErrorInfo | TestInfo)[]) {
                    getSuite(root, result.name.slice(0, -1)).addTest(new RemoteTest(result));
                }
                return root;
                function getSuite(parent: RemoteSuite, titlePath: string[]): Mocha.Suite {
                    const title = titlePath[0];
                    let suite = parent.suiteMap.get(title);
                    if (!suite) parent.addSuite(suite = new RemoteSuite(title));
                    return titlePath.length === 1 ? suite : getSuite(suite, titlePath.slice(1));
                }
            }

            function rebuildError(result: ErrorInfo) {
                const error = new Error(result.error);
                error.stack = result.stack;
                return error;
            }

            function replaySuite(runner: Mocha.Runner, suite: RemoteSuite) {
                runner.emit("suite", suite);
                for (const test of suite.tests) {
                    replayTest(runner, test as RemoteTest);
                }
                for (const child of suite.suites) {
                    replaySuite(runner, child as RemoteSuite);
                }
                runner.emit("suite end", suite);
            }

            function replayTest(runner: Mocha.Runner, test: RemoteTest) {
                runner.emit("test", test);
                if (test.isFailed()) {
                    runner.emit("fail", test, "error" in test.info ? rebuildError(test.info) : new Error("Unknown error")); // eslint-disable-line local/no-in-operator
                }
                else {
                    runner.emit("pass", test);
                }
                runner.emit("test end", test);
            }

            endDate = new Date();
            duration = +endDate - +startDate;
            completeBar();
            progressBars.disable();

            const replayRunner = new Mocha.Runner(new Mocha.Suite(""), { delay: false });
            replayRunner.started = true;
            const createStatsCollector = require("mocha/lib/stats-collector");
            createStatsCollector(replayRunner); // manually init stats collector like mocha.run would

            const consoleReporter = new Base(replayRunner);
            patchStats(consoleReporter.stats);

            let xunitReporter: import("mocha").reporters.XUnit | undefined;
            let failedTestReporter: import("../../../scripts/failed-tests.cjs") | undefined;
            if (process.env.CI === "true") {
                xunitReporter = new Mocha.reporters.XUnit(replayRunner, {
                    reporterOptions: {
                        suiteName: "Tests",
                        output: "./TEST-results.xml",
                    },
                });
                patchStats(xunitReporter.stats);
                xunitReporter.write(`<?xml version="1.0" encoding="UTF-8"?>\n`);
            }
            else {
                failedTestReporter = new FailedTestReporter(replayRunner, {
                    reporterOptions: {
                        file: path.resolve(".failed-tests"),
                        keepFailed,
                    },
                });
            }

            const savedUseColors = Base.useColors;
            if (noColors) Base.useColors = false;
            replayRunner.started = true;
            replayRunner.emit("start");
            replaySuite(replayRunner, rebuildSuite(errorResults, passingResults));
            replayRunner.emit("end");
            consoleReporter.epilogue();
            if (noColors) Base.useColors = savedUseColors;

            // eslint-disable-next-line no-restricted-syntax
            IO.writeFile(perfdataFileName(configOption), JSON.stringify(newPerfData, null, 4));

            if (xunitReporter) {
                xunitReporter.done(errorResults.length, failures => process.exit(failures));
            }
            else if (failedTestReporter) {
                failedTestReporter.done(errorResults.length, failures => process.exit(failures));
            }
            else {
                process.exit(errorResults.length);
            }
        }
    }

    function fill(ch: string, size: number) {
        let s = "";
        while (s.length < size) {
            s += ch;
        }

        return s.length > size ? s.substr(0, size) : s;
    }

    function minMax(value: number, min: number, max: number) {
        if (value < min) return min;
        if (value > max) return max;
        return value;
    }

    function shimDiscoveryInterface(context: Mocha.MochaGlobals) {
        shimNoopTestInterface(context);

        const perfData = readSavedPerfData(configOption);
        context.describe = addSuite as Mocha.SuiteFunction;
        context.it = addSuite as Mocha.TestFunction;

        function addSuite(title: string) {
            // Note, sub-suites are not indexed (we assume such granularity is not required)
            let size = 0;
            if (perfData) {
                size = perfData[hashName("unittest", title)];
                if (size === undefined) {
                    newTasks.push({ runner: "unittest", file: title, size: 0 });
                    unknownValue = title;
                    return;
                }
            }
            tasks.push({ runner: "unittest", file: title, size });
            totalCost += size;
        }
    }

    if (runUnitTests) {
        shimDiscoveryInterface(global);
    }
    else {
        shimNoopTestInterface(global);
    }

    importTests().then(() => startDelayed(perfData, totalCost));
}
