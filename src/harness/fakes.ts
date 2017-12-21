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
        vfs?: vfs.FileSystem | { currentDirectory?: string, useCaseSensitiveFileNames?: boolean };
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
        public readonly vfs: vfs.FileSystem;
        public exitCode: number;
        public watchFiles = true;
        public watchDirectories = true;

        private static readonly processExitSentinel = new Error("System exit");
        private readonly _output: string[] = [];
        private readonly _trace: string[] = [];
        private readonly _executingFilePath: string;
        private readonly _getCanonicalFileName: (file: string) => string;
        private _screenClears = 0;
        private _watchedFiles: core.KeyedCollection<string, number> | undefined;
        private _watchedFilesSet: core.SortedSet<string> | undefined;
        private _watchedRecursiveDirectories: core.KeyedCollection<string, number> | undefined;
        private _watchedRecursiveDirectoriesSet: core.SortedSet<string> | undefined;
        private _watchedNonRecursiveDirectories: core.KeyedCollection<string, number> | undefined;
        private _watchedNonRecursiveDirectoriesSet: core.SortedSet<string> | undefined;

        constructor(options: FakeServerHostOptions = {}, files?: vfs.FileMap) {
            const {
                dos = false,
                vfs: _vfs = {},
                executingFilePath = dos
                    ? FakeServerHost.dosExecutingFilePath
                    : FakeServerHost.defaultExecutingFilePath,
                newLine = "\n",
                safeList = false,
                lib = false,
            } = options;

            const currentDirectory = _vfs instanceof vfs.FileSystem ? _vfs.cwd() :
                _vfs.currentDirectory !== undefined ? _vfs.currentDirectory :
                dos ? FakeServerHost.dosDefaultCurrentDirectory :
                FakeServerHost.defaultCurrentDirectory;

            const useCaseSensitiveFileNames = _vfs instanceof vfs.FileSystem ? !_vfs.ignoreCase :
                _vfs.useCaseSensitiveFileNames !== undefined ? _vfs.useCaseSensitiveFileNames :
                false;

            this.vfs = _vfs instanceof vfs.FileSystem
                ? _vfs
                : new vfs.FileSystem(!useCaseSensitiveFileNames, { cwd: currentDirectory });

            if (this.vfs.isReadonly) {
                this.vfs = this.vfs.shadow();
            }

            this.vfs.mkdirpSync(currentDirectory);
            this.vfs.chdir(currentDirectory);

            this.useCaseSensitiveFileNames = !this.vfs.ignoreCase;
            this.newLine = newLine;
            this._executingFilePath = executingFilePath;
            this._getCanonicalFileName = ts.createGetCanonicalFileName(this.useCaseSensitiveFileNames);

            if (files) {
                this.vfs.apply(files);
            }

            if (safeList) {
                const safeListPath = dos ? FakeServerHost.dosSafeListPath : FakeServerHost.safeListPath;
                this.vfs.mkdirpSync(vpath.dirname(safeListPath));
                this.vfs.writeFileSync(safeListPath, FakeServerHost.safeListContent);
            }

            if (lib) {
                const libPath = dos ? FakeServerHost.dosLibPath : FakeServerHost.libPath;
                this.vfs.mkdirpSync(vpath.dirname(libPath));
                this.vfs.writeFileSync(libPath, FakeServerHost.libContent);
            }
        }

        // #region DirectoryStructureHost members
        public readonly newLine: string;
        public readonly useCaseSensitiveFileNames: boolean;

        public write(message: string) {
            this._output.push(message);
        }

        public readFile(path: string) {
            return vfsutils.readFile(this.vfs, path);
        }

        public writeFile(path: string, data: string, writeByteOrderMark?: boolean): void {
            vfsutils.writeFile(this.vfs, path, data, writeByteOrderMark);
        }

        public fileExists(path: string) {
            return vfsutils.fileExists(this.vfs, path);
        }

        public directoryExists(path: string) {
            return vfsutils.directoryExists(this.vfs, path);
        }

        public createDirectory(path: string): void {
            this.vfs.mkdirpSync(path);
        }

        public getCurrentDirectory() {
            return this.vfs.cwd();
        }

        public getDirectories(path: string) {
            return vfsutils.getDirectories(this.vfs, path);
        }

        public readDirectory(path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>, depth?: number): string[] {
            return ts.matchFiles(path, extensions, exclude, include, this.useCaseSensitiveFileNames, this.vfs.cwd(), depth, path => {
                return vfsutils.getAccessibleFileSystemEntries(this.vfs, path);
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
            return vfsutils.getFileSize(this.vfs, path);
        }

        public watchFile(path: string, cb: ts.FileWatcherCallback) {
            if (!this._watchedFiles) this._watchedFiles = new core.KeyedCollection<string, number>(this.vfs.stringComparer);
            if (!this._watchedFilesSet) this._watchedFilesSet = new core.SortedSet<string>(this.vfs.stringComparer);

            const previousCount = this._watchedFiles.get(path) || 0;
            if (previousCount === 0) {
                this._watchedFilesSet.add(path);
            }

            this._watchedFiles.set(path, previousCount + 1);

            let watching = true;
            const watcher = vfsutils.watchFile(this.vfs, path, (fileName, eventKind) => {
                if (this.watchFiles) cb(fileName, eventKind);
            });
            return {
                close: () => {
                    if (watching) {
                        const previousCount = this._watchedFiles.get(path) || 0;
                        if (previousCount === 1) {
                            this._watchedFiles.delete(path);
                            this._watchedFilesSet.delete(path);
                        }
                        else {
                            this._watchedFiles.set(path, previousCount - 1);
                        }
                        watcher.close();
                        watching = false;
                    }
                }
            }
        }

        public watchDirectory(path: string, cb: ts.DirectoryWatcherCallback, recursive: boolean): ts.FileWatcher {
            const watchedDirectories = recursive
                ? this._watchedRecursiveDirectories || (this._watchedRecursiveDirectories = new core.KeyedCollection(this.vfs.stringComparer))
                : this._watchedNonRecursiveDirectories || (this._watchedNonRecursiveDirectories = new core.KeyedCollection(this.vfs.stringComparer));

            const watchedDirectoriesSet = recursive
                ? this._watchedRecursiveDirectoriesSet || (this._watchedRecursiveDirectoriesSet = new core.SortedSet(this.vfs.stringComparer))
                : this._watchedNonRecursiveDirectoriesSet || (this._watchedNonRecursiveDirectoriesSet = new core.SortedSet(this.vfs.stringComparer));

            const previousCount = watchedDirectories.get(path) || 0;
            if (previousCount === 0) {
                watchedDirectoriesSet.add(path);
            }

            watchedDirectories.set(path, previousCount + 1);

            let watcher: ts.FileWatcher | undefined = vfsutils.watchDirectory(this.vfs, path, fileName => {
                if (this.watchDirectories) {
                    cb(fileName);
                }
            });

            return {
                close: () => {
                    if (watcher) {
                        console.trace(`watchDirectory.close(path: "${path}", recursive: ${recursive})`);
                        const previousCount = watchedDirectories.get(path) || 0;
                        if (previousCount === 1) {
                            watchedDirectories.delete(path);
                            watchedDirectoriesSet.delete(path);
                        }
                        else {
                            watchedDirectories.set(path, previousCount - 1);
                        }

                        watcher.close();
                        watcher = undefined;
                    }
                }
            }
        }

        public resolvePath(path: string) {
            return vpath.resolve(this.vfs.cwd(), path);
        }

        public getExecutingFilePath() {
            return this._executingFilePath;
        }

        public getModifiedTime(path: string) {
            return vfsutils.getModifiedTime(this.vfs, path);
        }

        public createHash(data: string): string {
            return core.sha1(data);
        }

        public realpath(path: string) {
            return this.vfs.realpathSync(path);
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

        public clearScreen(): void {
            this._screenClears++;
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

        // expectations
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

        public checkOutputContains(expected: Iterable<string>) {
            const mapExpected = new Set(expected);
            const mapSeen = new Set<string>();
            for (const f of this._output) {
                assert.isFalse(mapSeen.has(f), `Already found ${f} in ${JSON.stringify(this._output)}`);
                if (mapExpected.has(f)) {
                    mapExpected.delete(f);
                    mapSeen.add(f);
                }
            }
            assert.equal(mapExpected.size, 0, `Output is missing ${JSON.stringify(ts.flatMap(Array.from(mapExpected.keys()), key => key))} in ${JSON.stringify(this._output)}`);
        }

        public checkOutputDoesNotContain(notExpected: Iterable<string>) {
            const mapExpectedToBeAbsent = new Set(notExpected);
            for (const f of this._output) {
                assert.isFalse(mapExpectedToBeAbsent.has(f), `Contains ${f} in ${JSON.stringify(this._output)}`);
            }
        }

        public checkWatchedFiles(expected: Iterable<string>) {
            return checkSortedSet(this._watchedFilesSet, expected);
        }

        public checkWatchedDirectories(expected: Iterable<string>, recursive = false) {
            return checkSortedSet(recursive ? this._watchedRecursiveDirectoriesSet : this._watchedNonRecursiveDirectoriesSet, expected);
        }

        public checkScreenClears(expected: number) {
            assert.equal(this._screenClears, expected);
        }
    }

    function checkSortedSet<T>(set: ReadonlySet<T> | undefined, values: Iterable<T>) {
        const array = Array.from(values);
        const size = set ? set.size : 0;
        assert.strictEqual(size, array.length, `Actual: ${set ? Array.from(set) : []}, expected: ${array}.`);
        if (set) {
            for (const value of array) {
                assert.isTrue(set.has(value));
            }
        }
    }
}