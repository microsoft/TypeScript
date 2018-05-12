if (typeof describe === "undefined") {
    (global as any).describe = undefined; // If launched without mocha for parallel mode, we still need a global describe visible to satisfy the parsing of the unit tests
    (global as any).it = undefined;
}
namespace Harness.Parallel.Host {

    interface ChildProcessPartial {
        send(message: ParallelHostMessage, callback?: (error: Error) => void): boolean;
        on(event: "error", listener: (err: Error) => void): this;
        on(event: "exit", listener: (code: number, signal: string) => void): this;
        on(event: "message", listener: (message: ParallelClientMessage) => void): this;
        kill(signal?: string): void;
        currentTasks?: {file: string}[]; // Custom monkeypatch onto child process handle
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

    const perfdataFileNameFragment = ".parallelperf";
    function perfdataFileName(target?: string) {
        return `${perfdataFileNameFragment}${target ? `.${target}` : ""}.json`;
    }
    function readSavedPerfData(target?: string): {[testHash: string]: number} {
        const perfDataContents = IO.readFile(perfdataFileName(target));
        if (perfDataContents) {
            return JSON.parse(perfDataContents);
        }
        return undefined;
    }

    function hashName(runner: TestRunnerKind | "unittest", test: string) {
        return `tsrunner-${runner}://${test}`;
    }

    let tasks: { runner: TestRunnerKind | "unittest", file: string, size: number }[] = [];
    const newTasks: { runner: TestRunnerKind | "unittest", file: string, size: number }[] = [];
    let unknownValue: string | undefined;
    export function start() {
        const perfData = readSavedPerfData(configOption);
        let totalCost = 0;
        if (runUnitTests) {
            (global as any).describe = (suiteName: string) => {
                // Note, sub-suites are not indexed (we assume such granularity is not required)
                let size = 0;
                if (perfData) {
                    size = perfData[hashName("unittest", suiteName)];
                    if (size === undefined) {
                        newTasks.push({ runner: "unittest", file: suiteName, size: 0 });
                        unknownValue = suiteName;
                        return;
                    }
                }
                tasks.push({ runner: "unittest", file: suiteName, size });
                totalCost += size;
            };
        }
        else {
            (global as any).describe = ts.noop;
        }

        setTimeout(() => startDelayed(perfData, totalCost), 0); // Do real startup on next tick, so all unit tests have been collected
    }

    function startDelayed(perfData: {[testHash: string]: number}, totalCost: number) {
        initializeProgressBarsDependencies();
        console.log(`Discovered ${tasks.length} unittest suites` + (newTasks.length ? ` and ${newTasks.length} new suites.` : "."));
        console.log("Discovering runner-based tests...");
        const discoverStart = +(new Date());
        const { statSync }: { statSync(path: string): { size: number }; } = require("fs");
        const path: { join: (...args: string[]) => string } = require("path");
        for (const runner of runners) {
            for (const test of runner.enumerateTestFiles()) {
                const file = typeof test === "string" ? test : test.file;
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
        const { fork }: { fork(modulePath: string, args?: string[], options?: {}): ChildProcessPartial; } = require("child_process");

        const totalFiles = tasks.length;
        let passingFiles = 0;
        let failingFiles = 0;
        let errorResults: ErrorInfo[] = [];
        let passingResults: { name: string[] }[] = [];
        let totalPassing = 0;
        const startTime = Date.now();

        const progressBars = new ProgressBars({ noColors });
        const progressUpdateInterval = 1 / progressBars._options.width;
        let nextProgress = progressUpdateInterval;

        const newPerfData: {[testHash: string]: number} = {};

        const workers: ChildProcessPartial[] = [];
        const defaultTimeout = globalTimeout !== undefined
            ? globalTimeout
            : mocha && mocha.suite && mocha.suite._timeout
                ? mocha.suite._timeout
                : 20000; // 20 seconds
        let closedWorkers = 0;
        for (let i = 0; i < workerCount; i++) {
            // TODO: Just send the config over the IPC channel or in the command line arguments
            const config: TestConfig = { light: lightMode, listenForWork: true, runUnitTests, stackTraceLimit };
            const configPath = ts.combinePaths(taskConfigsFolder, `task-config${i}.json`);
            IO.writeFile(configPath, JSON.stringify(config));
            const child = fork(__filename, [`--config="${configPath}"`]);
            let currentTimeout = defaultTimeout;
            const killChild = () => {
                child.kill();
                console.error(`Worker exceeded ${currentTimeout}ms timeout ${child.currentTasks && child.currentTasks.length ? `while running test '${child.currentTasks[0].file}'.` : `during test setup.`}`);
                return process.exit(2);
            };
            let timer = setTimeout(killChild, currentTimeout);
            const timeoutStack: number[] = [];
            child.on("error", err => {
                console.error("Unexpected error in child process:");
                console.error(err);
                return process.exit(2);
            });
            child.on("exit", (code, _signal) => {
                if (code !== 0) {
                    console.error("Test worker process exited with nonzero exit code!");
                    return process.exit(2);
                }
            });
            child.on("message", (data: ParallelClientMessage) => {
                switch (data.type) {
                    case "error": {
                        console.error(`Test worker encounted unexpected error${data.payload.name ? ` during the execution of test ${data.payload.name}` : ""} and was forced to close:
        Message: ${data.payload.error}
        Stack: ${data.payload.stack}`);
                        return process.exit(2);
                    }
                    case "timeout": {
                        clearTimeout(timer);
                        if (data.payload.duration === "reset") {
                            currentTimeout = timeoutStack.pop() || defaultTimeout;
                        }
                        else {
                            timeoutStack.push(currentTimeout);
                            currentTimeout = data.payload.duration;
                        }
                        timer = setTimeout(killChild, currentTimeout); // Reset timeout on timeout update, for when a timeout changes while a suite is executing
                        break;
                    }
                    case "progress":
                    case "result": {
                        clearTimeout(timer);
                        timer = setTimeout(killChild, currentTimeout);
                        if (child.currentTasks) {
                            child.currentTasks.shift();
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
                        newPerfData[hashName(data.payload.runner, data.payload.file)] = data.payload.duration;

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
                                child.send({ type: "close" });
                                closedWorkers++;
                                if (closedWorkers === workerCount) {
                                    outputFinalResult();
                                }
                                return;
                            }
                            // Send tasks in blocks if the tasks are small
                            const taskList = [tasks.pop()];
                            while (tasks.length && taskList.reduce((p, c) => p + c.size, 0) < chunkSize) {
                                taskList.push(tasks.pop());
                            }
                            child.currentTasks = taskList;
                            if (taskList.length === 1) {
                                child.send({ type: "test", payload: taskList[0] });
                            }
                            else {
                                child.send({ type: "batch", payload: taskList });
                            }
                        }
                    }
                }
            });
            workers.push(child);
        }

        // It's only really worth doing an initial batching if there are a ton of files to go through (and they have estimates)
        if (totalFiles > 1000 && batchSize > 0) {
            console.log("Batching initial test lists...");
            const batches: { runner: TestRunnerKind | "unittest", file: string, size: number }[][] = new Array(batchCount);
            const doneBatching = new Array(batchCount);
            let scheduledTotal = 0;
            batcher: while (true) {
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
                    const task = tasks.pop();
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
                    worker.send({ type: "batch", payload });
                }
                else { // Out of batches, send off just one test
                    const payload = tasks.pop();
                    ts.Debug.assert(!!payload); // The reserve kept above should ensure there is always an initial task available, even in suboptimal scenarios
                    worker.currentTasks = [payload];
                    worker.send({ type: "test", payload });
                }
            }
        }
        else {
            for (let i = 0; i < workerCount; i++) {
                const task = tasks.pop();
                workers[i].currentTasks = [task];
                workers[i].send({ type: "test", payload: task });
            }
        }

        progressBars.enable();
        updateProgress(0);
        let duration: number;

        function completeBar() {
            const isPartitionFail = failingFiles !== 0;
            const summaryColor = isPartitionFail ? "fail" : "green";
            const summarySymbol = isPartitionFail ? base.symbols.err : base.symbols.ok;

            const summaryTests = (isPartitionFail ? totalPassing + "/" + (errorResults.length + totalPassing) : totalPassing) + " passing";
            const summaryDuration = "(" + ms(duration) + ")";
            const savedUseColors = base.useColors;
            base.useColors = !noColors;

            const summary = color(summaryColor, summarySymbol + " " + summaryTests) + " " + color("light", summaryDuration);
            base.useColors = savedUseColors;

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
                titleColor
            );
        }

        function outputFinalResult() {
            duration = Date.now() - startTime;
            completeBar();
            progressBars.disable();

            const reporter = new base();
            const stats = reporter.stats;
            const failures = reporter.failures;
            stats.passes = totalPassing;
            stats.failures = errorResults.length;
            stats.tests = totalPassing + errorResults.length;
            stats.duration = duration;
            for (const failure of errorResults) {
                failures.push(makeMochaTest(failure));
            }
            if (noColors) {
                const savedUseColors = base.useColors;
                base.useColors = false;
                reporter.epilogue();
                base.useColors = savedUseColors;
            }
            else {
                reporter.epilogue();
            }

            IO.writeFile(perfdataFileName(configOption), JSON.stringify(newPerfData, null, 4)); // tslint:disable-line:no-null-keyword

            if (Utils.getExecutionEnvironment() !== Utils.ExecutionEnvironment.Browser && process.env.CI === "true") {
                const xunitReport = new xunit({ on: ts.noop, once: ts.noop }, { reporterOptions: { output: "./TEST-results.xml" } });
                xunitReport.stats = reporter.stats;
                xunitReport.failures = reporter.failures;
                const rootAttrs: {[index: string]: any} = {
                    name: "Tests",
                    tests: stats.tests,
                    failures: stats.failures,
                    errors: stats.failures,
                    skipped: stats.tests - stats.failures - stats.passes,
                    timestamp: (new Date()).toUTCString(),
                    time: (stats.duration / 1000) || 0
                };
                xunitReport.write(`<?xml version="1.0" encoding="UTF-8"?>` + "\n");
                xunitReport.write(`<testsuite ${Object.keys(rootAttrs).map(k => `${k}="${escape("" + rootAttrs[k])}"`).join(" ")}>`);
                [...failures, ...ts.map(passingResults, makeMochaTest)].forEach(t => {
                    xunitReport.test(t);
                });
                xunitReport.write("</testsuite>");
                xunitReport.done(failures, (f: any[]) => {
                    process.exit(f.length);
                });
            }
            else {
                process.exit(failures.length);
            }

        }

        function makeMochaTest(test: ErrorInfo | TestInfo) {
            return {
                state: (test as ErrorInfo).error ? "failed" : "passed",
                parent: {
                    fullTitle: () => {
                        return test.name.slice(0, test.name.length - 1).join(" ");
                    }
                },
                title: test.name[test.name.length - 1],
                fullTitle: () => {
                    return test.name.join(" ");
                },
                titlePath: () => {
                    return test.name;
                },
                isPending: () => false,
                err: (test as ErrorInfo).error ? {
                    message: (test as ErrorInfo).error,
                    stack: (test as ErrorInfo).stack
                } : undefined
            };
        }

        (global as any).describe = ts.noop as any; // Disable unit tests

        return;
    }

    let mocha: any;
    let base: any;
    let xunit: any;
    let color: any;
    let cursor: any;
    let readline: any;
    let os: any;
    let tty: { isatty(x: number): boolean };
    let isatty: boolean;

    const s = 1000;
    const m = s * 60;
    const h = m * 60;
    const d = h * 24;
    function ms(ms: number) {
        let result = "";
        if (ms >= d) {
            const count = Math.floor(ms / d);
            result += count + "d";
            ms -= count * d;
        }
        if (ms >= h) {
            const count = Math.floor(ms / h);
            result += count + "h";
            ms -= count * h;
        }
        if (ms >= m) {
            const count = Math.floor(ms / m);
            result += count + "m";
            ms -= count * m;
        }
        if (ms >= s) {
            const count = Math.round(ms / s);
            result += count + "s";
            return result;
        }
        if (ms > 0) {
            result += Math.round(ms) + "ms";
        }
        return result;
    }

    function initializeProgressBarsDependencies() {
        mocha = require("mocha");
        base = mocha.reporters.Base;
        xunit = mocha.reporters.xunit;
        color = base.color;
        cursor = base.cursor;
        readline = require("readline");
        os = require("os");
        tty = require("tty");
        isatty = tty.isatty(1) && tty.isatty(2);
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
            const incomplete = options.incomplete || base.symbols.dot;
            const maxWidth = base.window.width - open.length - close.length - 34;
            const width = minMax(options.width || maxWidth, 10, maxWidth);
            this._options = {
                open,
                complete,
                incomplete,
                close,
                width,
                noColors: options.noColors || false
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
        update(index: number, percentComplete: number, color: string, title: string, titleColor?: string) {
            percentComplete = minMax(percentComplete, 0, 1);

            const progressBar = this._progressBars[index] || (this._progressBars[index] = { });
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
}
