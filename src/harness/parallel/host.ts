if (typeof describe === "undefined") {
    (global as any).describe = undefined; // If launched without mocha for parallel mode, we still need a global describe visible to satisfy the parsing of the unit tests
    (global as any).it = undefined;
}
namespace Harness.Parallel.Host {

    interface ChildProcessPartial {
        send(message: any, callback?: (error: Error) => void): boolean;
        on(event: "error", listener: (err: Error) => void): this;
        on(event: "exit", listener: (code: number, signal: string) => void): this;
        on(event: "message", listener: (message: any) => void): this;
        disconnect(): void;
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

    export function start() {
        initializeProgressBarsDependencies();
        console.log("Discovering tests...");
        const discoverStart = +(new Date());
        const { statSync }: { statSync(path: string): { size: number }; } = require("fs");
        const tasks: { runner: TestRunnerKind, file: string, size: number }[] = [];
        let totalSize = 0;
        for (const runner of runners) {
            const files = runner.enumerateTestFiles();
            for (const file of files) {
                const size = statSync(file).size;
                tasks.push({ runner: runner.kind(), file, size });
                totalSize += size;
            }
        }
        tasks.sort((a, b) => a.size - b.size);
        const batchSize = (totalSize / workerCount) * 0.9;
        console.log(`Discovered ${tasks.length} test files in ${+(new Date()) - discoverStart}ms.`);
        console.log(`Starting to run tests using ${workerCount} threads...`);
        const { fork }: { fork(modulePath: string, args?: string[], options?: {}): ChildProcessPartial; } = require("child_process");

        const totalFiles = tasks.length;
        let passingFiles = 0;
        let failingFiles = 0;
        let errorResults: ErrorInfo[] = [];
        let totalPassing = 0;
        const startTime = Date.now();

        const progressBars = new ProgressBars({ noColors });
        const progressUpdateInterval = 1 / progressBars._options.width;
        let nextProgress = progressUpdateInterval;

        const workers: ChildProcessPartial[] = [];
        for (let i = 0; i < workerCount; i++) {
            // TODO: Just send the config over the IPC channel or in the command line arguments
            const config: TestConfig = { light: Harness.lightMode, listenForWork: true, runUnitTests: runners.length === 1 ? false : i === workerCount - 1 };
            const configPath = ts.combinePaths(taskConfigsFolder, `task-config${i}.json`);
            Harness.IO.writeFile(configPath, JSON.stringify(config));
            const child = fork(__filename, [`--config="${configPath}"`]);
            child.on("error", err => {
                child.disconnect();
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
                        child.disconnect();
                        console.error(`Test worker encounted unexpected error and was forced to close:
        Message: ${data.payload.error}
        Stack: ${data.payload.stack}`);
                        return process.exit(2);
                    }
                    case "progress":
                    case "result": {
                        totalPassing += data.payload.passing;
                        if (data.payload.errors.length) {
                            errorResults = errorResults.concat(data.payload.errors);
                            failingFiles++;
                        }
                        else {
                            passingFiles++;
                        }

                        const progress = (failingFiles + passingFiles) / totalFiles;
                        if (progress >= nextProgress) {
                            while (nextProgress < progress) {
                                nextProgress += progressUpdateInterval;
                            }
                            updateProgress(progress, errorResults.length ? `${errorResults.length} failing` : `${totalPassing} passing`, errorResults.length ? "fail" : undefined);
                        }

                        if (failingFiles + passingFiles === totalFiles) {
                            // Done. Finished every task and collected results.
                            child.send({ type: "close" });
                            child.disconnect();
                            return outputFinalResult();
                        }
                        if (tasks.length === 0) {
                            // No more tasks to distribute
                            child.send({ type: "close" });
                            child.disconnect();
                            return;
                        }
                        if (data.type === "result") {
                            child.send({ type: "test", payload: tasks.pop() });
                        }
                    }
                }
            });
            workers.push(child);
        }

        // It's only really worth doing an initial batching if there are a ton of files to go through
        if (totalFiles > 1000) {
            console.log("Batching initial test lists...");
            const batches: { runner: TestRunnerKind, file: string, size: number }[][] = new Array(workerCount);
            const doneBatching = new Array(workerCount);
            batcher: while (true) {
                for (let i = 0; i < workerCount; i++) {
                    if (tasks.length === 0) {
                        // TODO: This indicates a particularly suboptimal packing
                        break batcher;
                    }
                    if (doneBatching[i]) {
                        continue;
                    }
                    if (!batches[i]) {
                        batches[i] = [];
                    }
                    const total = batches[i].reduce((p, c) => p + c.size, 0);
                    if (total >= batchSize && !doneBatching[i]) {
                        doneBatching[i] = true;
                        continue;
                    }
                    batches[i].push(tasks.pop());
                }
                for (let j = 0; j < workerCount; j++) {
                    if (!doneBatching[j]) {
                        continue;
                    }
                }
                break;
            }
            console.log(`Batched into ${workerCount} groups with approximate total file sizes of ${Math.floor(batchSize)} bytes in each group.`);
            for (const worker of workers) {
                const action: ParallelBatchMessage = { type: "batch", payload: batches.pop() };
                if (!action.payload[0]) {
                    throw new Error(`Tried to send invalid message ${action}`);
                }
                worker.send(action);
            }
        }
        else {
            for (let i = 0; i < workerCount; i++) {
                workers[i].send({ type: "test", payload: tasks.pop() });
            }
        }

        progressBars.enable();
        updateProgress(0);
        let duration: number;

        const ms = require("mocha/lib/ms");
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
                titleColor
            );
        }

        function outputFinalResult() {
            duration = Date.now() - startTime;
            completeBar();
            progressBars.disable();

            const reporter = new Base();
            const stats = reporter.stats;
            const failures = reporter.failures;
            stats.passes = totalPassing;
            stats.failures = errorResults.length;
            stats.tests = totalPassing + errorResults.length;
            stats.duration = duration;
            for (let j = 0; j < errorResults.length; j++) {
                const failure = errorResults[j];
                failures.push(makeMochaTest(failure));
            }
            if (noColors) {
                const savedUseColors = Base.useColors;
                Base.useColors = false;
                reporter.epilogue();
                Base.useColors = savedUseColors;
            }
            else {
                reporter.epilogue();
            }

            process.exit(errorResults.length);
        }

        function makeMochaTest(test: ErrorInfo) {
            return {
                fullTitle: () => {
                    return test.name;
                },
                err: {
                    message: test.error,
                    stack: test.stack
                }
            };
        }

        describe = ts.noop as any; // Disable unit tests

        return;
    }

    let Mocha: any;
    let Base: any;
    let color: any;
    let cursor: any;
    let readline: any;
    let os: any;
    let tty: { isatty(x: number): boolean };
    let isatty: boolean;

    function initializeProgressBarsDependencies() {
        Mocha = require("mocha");
        Base = Mocha.reporters.Base;
        color = Base.color;
        cursor = Base.cursor;
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
            const incomplete = options.incomplete || Base.symbols.dot;
            const maxWidth = Base.window.width - open.length - close.length - 30;
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