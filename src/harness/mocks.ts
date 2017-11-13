/// <reference path="./core.ts" />
/// <reference path="./vfs.ts" />import { debug } from "util";



// NOTE: The contents of this file are all exported from the namespace 'mocks'. This is to
//       support the eventual conversion of harness into a modular system.

namespace mocks {
    const MAX_INT32 = 2 ** 31 - 1;

    export interface Immediate {
        readonly kind: "immediate";
        readonly callback: (...args: any[]) => void;
        readonly args: ReadonlyArray<any>;
    }

    export interface Timeout {
        readonly kind: "timeout";
        readonly callback: (...args: any[]) => void;
        readonly args: ReadonlyArray<any>;
        readonly due: number;
    }

    export interface Interval {
        readonly kind: "interval";
        readonly callback: (...args: any[]) => void;
        readonly args: ReadonlyArray<any>;
        readonly due: number;
        readonly interval: number;
    }

    export type Timer = Immediate | Timeout | Interval;

    interface InternalInterval extends Interval {
        due: number;
    }

    /**
     * Programmatic control over timers.
     */
    export class Timers {
        public static readonly MAX_DEPTH = MAX_INT32;
        private _immediates = new Set<Immediate>();
        private _timeouts = new Set<Timeout>();
        private _intervals = new Set<InternalInterval>();
        private _time: number;

        constructor(startTime = Date.now()) {
            this._time = startTime;

            // bind each timer method so that it can be detached from this instance.
            this.setImmediate = this.setImmediate.bind(this);
            this.clearImmedate = this.clearImmedate.bind(this);
            this.setTimeout = this.setTimeout.bind(this);
            this.clearTimeout = this.clearImmedate.bind(this);
            this.setInterval = this.setInterval.bind(this);
            this.clearInterval = this.clearInterval.bind(this);
        }

        /**
         * Get the current time.
         */
        public get time(): number {
            return this._time;
        }

        public getPending(kind: "immediate", ms?: number): Immediate[];
        public getPending(kind: "timeout", ms?: number): Timeout[];
        public getPending(kind: "interval", ms?: number): Interval[];
        public getPending(kind?: Timer["kind"], ms?: number): Timer[];
        public getPending(kind?: Timer["kind"], ms = 0) {
            if (ms < 0) throw new TypeError("Argument 'ms' out of range.");
            const pending: Timer[] = [];
            if (!kind || kind === "immediate") this.appendImmediates(pending);
            if (!kind || kind === "timeout") this.appendDueTimeouts(pending, this._time + ms);
            if (!kind || kind === "interval") this.appendDueIntervals(pending, this._time + ms, /*expand*/ false);
            return core.stableSort(pending, compareTimers);
        }

        /**
         * Advance the current time and trigger callbacks, returning the number of callbacks triggered.
         * @param ms The number of milliseconds to advance.
         * @param maxDepth The maximum depth for nested `setImmediate` calls to continue processing.
         * - Use `0` (default) to disable processing of nested `setImmediate` calls.
         * - Use `Timer.NO_MAX_DEPTH` to continue processing all nested `setImmediate` calls.
         */
        public advance(ms: number, maxDepth = 0): number {
            if (ms < 0) throw new TypeError("Argument 'ms' out of range.");
            if (maxDepth < 0) throw new TypeError("Argument 'maxDepth' out of range.");
            this._time += ms;
            return this.executePending(maxDepth);
        }

        /**
         * Execute any pending timers, returning the number of timers triggered.
         * @param maxDepth The maximum depth for nested `setImmediate` calls to continue processing.
         * - Use `0` (default) to disable processing of nested `setImmediate` calls.
         * - Use `Timer.NO_MAX_DEPTH` to continue processing all nested `setImmediate` calls.
         */
        public executePending(maxDepth = 0): number {
            if (maxDepth < 0) throw new TypeError("Argument 'maxDepth' out of range.");
            const pending: Timer[] = [];
            this.appendImmediates(pending);
            this.appendDueTimeouts(pending, this._time);
            this.appendDueIntervals(pending, this._time, /*expand*/ true);
            let count = this.execute(pending);
            for (let depth = 0; depth < maxDepth && this._immediates.size > 0; depth++) {
                pending.length = 0;
                this.appendImmediates(pending);
                count += this.execute(pending);
            }
            return count;
        }

        public setImmediate(callback: (...args: any[]) => void, ...args: any[]): any {
            const timer: Immediate = { kind: "immediate", callback, args };
            this._immediates.add(timer);
            return timer;
        }

        public clearImmedate(timerId: any): void {
            this._immediates.delete(timerId);
        }

        public setTimeout(callback: (...args: any[]) => void, timeout: number, ...args: any[]): any {
            if (timeout < 0) timeout = 0;
            const due = this._time + timeout;
            const timer: Timeout = { kind: "timeout", callback, args, due };
            this._timeouts.add(timer);
            return timer;
        }

        public clearTimeout(timerId: any): void {
            this._timeouts.delete(timerId);
        }

        public setInterval(callback: (...args: any[]) => void, interval: number, ...args: any[]): any {
            if (interval < 0) interval = 0;
            const due = this._time + interval;
            const timer: Interval = { kind: "interval", callback, args, due, interval };
            this._intervals.add(timer);
            return timer;
        }

        public clearInterval(timerId: any): void {
            this._intervals.delete(timerId);
        }

        private appendImmediates(pending: Timer[]) {
            this._immediates.forEach(timer => {
                pending.push(timer);
            });
        }

        private appendDueTimeouts(timers: Timer[], dueTime: number) {
            this._timeouts.forEach(timer => {
                if (timer.due <= dueTime) {
                    timers.push(timer);
                }
            });
        }

        private appendDueIntervals(timers: Timer[], dueTime: number, expand: boolean) {
            this._intervals.forEach(timer => {
                while (timer.due <= dueTime) {
                    timers.push(timer);
                    if (!expand) break;
                    timer.due += timer.interval;
                }
            });
        }

        private execute(timers: Timer[]) {
            for (const timer of core.stableSort(timers, compareTimers)) {
                switch (timer.kind) {
                    case "immediate": this._immediates.delete(timer); break;
                    case "timeout": this._timeouts.delete(timer); break;
                }
                const { callback, args } = timer;
                callback(...args);
            }
            return timers.length;
        }
    }

    function compareTimers(a: Immediate | Timeout, b: Immediate | Timeout) {
        return (a.kind === "immediate" ? -1 : a.due) - (b.kind === "immediate" ? -1 : b.due);
    }

    export class MockServerHost implements ts.server.ServerHost, ts.FormatDiagnosticsHost {
        public readonly exitMessage = "System Exit";
        public readonly timers = new Timers();
        public readonly vfs: vfs.VirtualFileSystem;
        public exitCode: number;

        private readonly _output: string[] = [];
        private readonly _executingFilePath: string;
        private readonly _getCanonicalFileName: (file: string) => string;

        constructor(vfs: vfs.VirtualFileSystem, executingFilePath = "/.ts/tsc.js", newLine = "\n") {
            this.vfs = vfs;
            this.useCaseSensitiveFileNames = vfs.useCaseSensitiveFileNames;
            this.newLine = newLine;
            this._executingFilePath = executingFilePath;
            this._getCanonicalFileName = ts.createGetCanonicalFileName(this.useCaseSensitiveFileNames);
        }

        // #region DirectoryStructureHost members
        public readonly newLine: string;
        public readonly useCaseSensitiveFileNames: boolean;

        public write(message: string) {
            this._output.push(message);
        }

        public readFile(path: string) {
            return this.vfs.readFile(path);
        }

        public writeFile(path: string, data: string): void {
            this.vfs.writeFile(path, data);
        }

        public fileExists(path: string) {
            return this.vfs.fileExists(path);
        }

        public directoryExists(path: string) {
            return this.vfs.directoryExists(path);
        }

        public createDirectory(path: string): void {
            this.vfs.addDirectory(path);
        }

        public getCurrentDirectory() {
            return this.vfs.currentDirectory;
        }

        public getDirectories(path: string) {
            return this.vfs.getDirectoryNames(path);
        }

        public readDirectory(path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>, depth?: number): string[] {
            return ts.matchFiles(path, extensions, exclude, include, this.useCaseSensitiveFileNames, this.vfs.currentDirectory, depth, path => {
                return this.vfs.getAccessibleFileSystemEntries(path);
            });
        }

        public exit(exitCode?: number) {
            this.exitCode = exitCode;
            throw new Error("System exit");
        }
        // #endregion DirectoryStructureHost members

        // #region System members
        public readonly args: string[] = [];

        public getFileSize(path: string) {
            const stats = this.vfs.getStats(path);
            return stats && stats.isFile() ? stats.size : 0;
        }

        public watchFile(path: string, cb: ts.FileWatcherCallback) {
            return this.vfs.watchFile(path, (path, change) => {
                cb(path, change === "added" ? ts.FileWatcherEventKind.Created :
                    change === "removed" ? ts.FileWatcherEventKind.Deleted :
                    ts.FileWatcherEventKind.Changed);
            });
        }

        public watchDirectory(path: string, cb: ts.DirectoryWatcherCallback, recursive: boolean): ts.FileWatcher {
            return this.vfs.watchDirectory(path, cb, recursive);
        }

        public resolvePath(path: string) {
            return vpath.resolve(this.vfs.currentDirectory, path);
        }

        public getExecutingFilePath() {
            return this._executingFilePath;
        }

        public getModifiedTime(path: string) {
            const stats = this.vfs.getStats(path);
            return stats && stats.mtime;
        }

        public createHash(data: string): string {
            return core.sha1(data);
        }

        public realpath(path: string) {
            const entry = this.vfs.getRealEntry(this.vfs.getEntry(path));
            return entry && entry.path;
        }

        public getEnvironmentVariable(_name: string): string | undefined {
            return undefined;
        }

        public setTimeout(callback: (...args: any[]) => void, timeout: number, ...args: any[]) {
            return this.timers.setTimeout(callback, timeout, ...args);
        }

        public clearTimeout(timeoutId: any): void {
            this.timers.clearTimeout(timeoutId);
        }
        // #endregion System members

        // #region FormatDiagnosticsHost members
        public getNewLine() {
            return this.newLine;
        }

        public getCanonicalFileName(fileName: string) {
            return this._getCanonicalFileName(fileName);
        }
        // #endregion FormatDiagnosticsHost members

        // #region ServerHost members
        public setImmediate(callback: (...args: any[]) => void, ...args: any[]): any {
            return this.timers.setImmediate(callback, args);
        }

        public clearImmediate(timeoutId: any): void {
            this.timers.clearImmedate(timeoutId);
        }
        // #endregion ServerHost members

        public getOutput(): ReadonlyArray<string> {
            return this._output;
        }

        public clearOutput() {
            this._output.length = 0;
        }
    }
}