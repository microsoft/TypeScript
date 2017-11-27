/// <reference path="./core.ts" />
/// <reference path="./utils.ts" />
/// <reference path="./vfs.ts" />
/// <reference path="./typemock.ts" />

// NOTE: The contents of this file are all exported from the namespace 'fakes'. This is to
//       support the eventual conversion of harness into a modular system.

// harness fakes
namespace fakes {
    export interface FakeServerHostOptions {
        /**
         * The `VirtualFleSystem` to use. If not specified, a new case-sensitive `VirtualFileSystem`
         * is created.
         */
        vfs?: vfs.VirtualFileSystem | { currentDirectory?: string, useCaseSensitiveFileNames?: boolean };
        /**
         * The virtual path to tsc.js. If not specified, a default of `"/.ts/tsc.js"` is used.
         */
        executingFilePath?: string;
        /**
         * The new-line style. If not specified, a default of `"\n"` is used.
         */
        newLine?: "\r\n" | "\n";
        /**
         * Indicates whether to include _safeList.json_.
         */
        safeList?: boolean;
        /**
         * Indicates whether to include a bare _lib.d.ts_.
         */
        lib?: boolean;
        /**
         * Indicates whether to use DOS paths by default.
         */
        dos?: boolean;
    }

    export class FakeServerHost implements ts.server.ServerHost, ts.FormatDiagnosticsHost, ts.ModuleResolutionHost {
        public static readonly dosExecutingFilePath = "c:/.ts/tsc.js";
        public static readonly defaultExecutingFilePath = "/.ts/tsc.js";
        public static readonly dosDefaultCurrentDirectory = "c:/";
        public static readonly defaultCurrentDirectory = "/";
        public static readonly dosSafeListPath = "c:/safelist.json";
        public static readonly safeListPath = "/safelist.json";
        public static readonly safeListContent =
            `{\n` +
            `    "commander": "commander",\n` +
            `    "express": "express",\n` +
            `    "jquery": "jquery",\n` +
            `    "lodash": "lodash",\n` +
            `    "moment": "moment",\n` +
            `    "chroma": "chroma-js"\n` +
            `}`;

        public static readonly dosLibPath = "c:/.ts/lib.d.ts";
        public static readonly libPath = "/.ts/lib.d.ts";
        public static readonly libContent =
            `/// <reference no-default-lib="true"/>\n` +
            `interface Boolean {}\n` +
            `interface Function {}\n` +
            `interface IArguments {}\n` +
            `interface Number { toExponential: any; }\n` +
            `interface Object {}\n` +
            `interface RegExp {}\n` +
            `interface String { charAt: any; }\n` +
            `interface Array<T> {}`;

        public readonly timers = new typemock.Timers();
        public readonly vfs: vfs.VirtualFileSystem;
        public exitCode: number;

        private static readonly processExitSentinel = new Error("System exit");
        private readonly _output: string[] = [];
        private readonly _trace: string[] = [];
        private readonly _executingFilePath: string;
        private readonly _getCanonicalFileName: (file: string) => string;

        constructor(options: FakeServerHostOptions = {}) {
            const {
                dos = false,
                vfs: _vfs = {},
                executingFilePath = dos
                    ? FakeServerHost.dosExecutingFilePath
                    : FakeServerHost.defaultExecutingFilePath,
                newLine = "\n",
                safeList = false,
                lib = false
            } = options;

            const {
                currentDirectory = dos
                    ? FakeServerHost.dosDefaultCurrentDirectory
                    : FakeServerHost.defaultCurrentDirectory,
                useCaseSensitiveFileNames = false
            } = _vfs;

            this.vfs = _vfs instanceof vfs.VirtualFileSystem
                ? _vfs
                : new vfs.VirtualFileSystem(currentDirectory, useCaseSensitiveFileNames);

            this.useCaseSensitiveFileNames = this.vfs.useCaseSensitiveFileNames;
            this.newLine = newLine;
            this._executingFilePath = executingFilePath;
            this._getCanonicalFileName = ts.createGetCanonicalFileName(this.useCaseSensitiveFileNames);

            if (safeList) {
                this.vfs.addFile(
                    dos ? FakeServerHost.dosSafeListPath : FakeServerHost.safeListPath,
                    FakeServerHost.safeListContent);
            }

            if (lib) {
                this.vfs.addFile(
                    dos ? FakeServerHost.dosLibPath : FakeServerHost.libPath,
                    FakeServerHost.libContent);
            }
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

        public writeFile(path: string, data: string, writeByteOrderMark?: boolean): void {
            this.vfs.writeFile(path, writeByteOrderMark ? core.addUTF8ByteOrderMark(data) : data);
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
            throw FakeServerHost.processExitSentinel;
        }
        // #endregion DirectoryStructureHost members

        // #region ModuleResolutionHost members
        public trace(message: string) {
            this._trace.push(message);
        }
        // #endregion

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

        public getTrace(): ReadonlyArray<string> {
            return this._trace;
        }

        public clearTrace() {
            this._trace.length = 0;
        }

        public checkTimeoutQueueLength(expected: number) {
            const callbacksCount = this.timers.getPending({ kind: "timeout", ms: this.timers.remainingTime }).length;
            assert.equal(callbacksCount, expected, `expected ${expected} timeout callbacks queued but found ${callbacksCount}.`);
        }

        public checkTimeoutQueueLengthAndRun(count: number) {
            this.checkTimeoutQueueLength(count);
            this.runQueuedTimeoutCallbacks();
        }

        public runQueuedImmediateCallbacks() {
            try {
                this.timers.executeImmediates();
            }
            catch (e) {
                if (e !== FakeServerHost.processExitSentinel) {
                    throw e;
                }
            }
        }

        public runQueuedTimeoutCallbacks() {
            try {
                this.timers.advanceToEnd();
            }
            catch (e) {
                if (e !== FakeServerHost.processExitSentinel) {
                    throw e;
                }
            }
        }
    }
}