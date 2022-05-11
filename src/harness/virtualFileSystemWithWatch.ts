namespace ts.VirtualFS {
    export const libFile: File = {
        path: "/a/lib/lib.d.ts",
        content: `/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }`
    };

    export const safeList = {
        path: "/safeList.json" as Path,
        content: JSON.stringify({
            commander: "commander",
            express: "express",
            jquery: "jquery",
            lodash: "lodash",
            moment: "moment",
            chroma: "chroma-js"
        })
    };

    function getExecutingFilePathFromLibFile(): string {
        return combinePaths(getDirectoryPath(libFile.path), "tsc.js");
    }

    export interface TestServerHostCreationParameters {
        useCaseSensitiveFileNames?: boolean;
        executingFilePath?: string;
        currentDirectory?: string;
        newLine?: string;
        windowsStyleRoot?: string;
        environmentVariables?: ESMap<string, string>;
        runWithoutRecursiveWatches?: boolean;
        runWithFallbackPolling?: boolean;
        withSafeList?: boolean;
    }

    export function createWatchedSystem(fileOrFolderList: readonly FileOrFolderOrSymLink[], params?: TestServerHostCreationParameters): TestServerHost {
        return new TestServerHost(/*withSafelist*/ false, fileOrFolderList, params);
    }

    export function createServerHost(fileOrFolderList: readonly FileOrFolderOrSymLink[], params?: TestServerHostCreationParameters): TestServerHost {
        const host = new TestServerHost(/*withSafelist*/ true, fileOrFolderList, params);
        // Just like sys, patch the host to use writeFile
        patchWriteFileEnsuringDirectory(host);
        return host;
    }

    export function createVirtualServerHost(params: VirtualServerHostCreationParameters): VirtualServerHost {
        const host = new VirtualServerHost(params);
        host.init();
        // Just like sys, patch the host to use writeFile
        patchWriteFileEnsuringDirectory(host);
        return host;
    }

    class Callbacks {
        private map: TimeOutCallback[] = [];
        private nextId = 1;

        getNextId() {
            return this.nextId;
        }

        register(cb: (...args: any[]) => void, args: any[]) {
            const timeoutId = this.nextId;
            this.nextId++;
            this.map[timeoutId] = cb.bind(/*this*/ undefined, ...args);
            return timeoutId;
        }

        unregister(id: any) {
            if (typeof id === "number") {
                delete this.map[id];
            }
        }

        count() {
            let n = 0;
            for (const _ in this.map) {
                n++;
            }
            return n;
        }

        invoke(invokeKey?: number) {
            if (invokeKey) {
                this.map[invokeKey]();
                delete this.map[invokeKey];
                return;
            }

            // Note: invoking a callback may result in new callbacks been queued,
            // so do not clear the entire callback list regardless. Only remove the
            // ones we have invoked.
            for (const key in this.map) {
                this.map[key]();
                delete this.map[key];
            }
        }
    }

    type TimeOutCallback = () => any;

    export function getDiffInKeys<T>(map: ESMap<string, T>, expectedKeys: readonly string[]) {
        if (map.size === expectedKeys.length) {
            return "";
        }
        const notInActual: string[] = [];
        const duplicates: string[] = [];
        const seen = new Map<string, true>();
        forEach(expectedKeys, expectedKey => {
            if (seen.has(expectedKey)) {
                duplicates.push(expectedKey);
                return;
            }
            seen.set(expectedKey, true);
            if (!map.has(expectedKey)) {
                notInActual.push(expectedKey);
            }
        });
        const inActualNotExpected: string[] = [];
        map.forEach((_value, key) => {
            if (!seen.has(key)) {
                inActualNotExpected.push(key);
            }
            seen.set(key, true);
        });
        return `\n\nNotInActual: ${notInActual}\nDuplicates: ${duplicates}\nInActualButNotInExpected: ${inActualNotExpected}`;
    }

    export function verifyMapSize(caption: string, map: ESMap<string, any>, expectedKeys: readonly string[]) {
        assert.equal(map.size, expectedKeys.length, `${caption}: incorrect size of map: Actual keys: ${arrayFrom(map.keys())} Expected: ${expectedKeys}${getDiffInKeys(map, expectedKeys)}`);
    }

    export type MapValueTester<T, U> = [ESMap<string, U[]> | undefined, (value: T) => U];

    export function checkMap<T, U = undefined>(caption: string, actual: MultiMap<string, T>, expectedKeys: ReadonlyESMap<string, number>, valueTester?: MapValueTester<T,U>): void;
    export function checkMap<T, U = undefined>(caption: string, actual: MultiMap<string, T>, expectedKeys: readonly string[], eachKeyCount: number, valueTester?: MapValueTester<T, U>): void;
    export function checkMap<T>(caption: string, actual: ESMap<string, T> | MultiMap<string, T>, expectedKeys: readonly string[], eachKeyCount: undefined): void;
    export function checkMap<T, U = undefined>(
        caption: string,
        actual: ESMap<string, T> | MultiMap<string, T>,
        expectedKeysMapOrArray: ReadonlyESMap<string, number> | readonly string[],
        eachKeyCountOrValueTester?: number | MapValueTester<T, U>,
        valueTester?: MapValueTester<T, U>) {
        const expectedKeys = isArray(expectedKeysMapOrArray) ? arrayToMap(expectedKeysMapOrArray, s => s, () => eachKeyCountOrValueTester as number) : expectedKeysMapOrArray;
        verifyMapSize(caption, actual, isArray(expectedKeysMapOrArray) ? expectedKeysMapOrArray : arrayFrom(expectedKeys.keys()));
        if (!isNumber(eachKeyCountOrValueTester)) {
            valueTester = eachKeyCountOrValueTester;
        }
        const [expectedValues, valueMapper] = valueTester || [undefined, undefined!];
        expectedKeys.forEach((count, name) => {
            assert.isTrue(actual.has(name), `${caption}: expected to contain ${name}, actual keys: ${arrayFrom(actual.keys())}`);
            // Check key information only if eachKeyCount is provided
            if (!isArray(expectedKeysMapOrArray) || eachKeyCountOrValueTester !== undefined) {
                assert.equal((actual as MultiMap<string, T>).get(name)!.length, count, `${caption}: Expected to be have ${count} entries for ${name}. Actual entry: ${JSON.stringify(actual.get(name))}`);
                if (expectedValues) {
                    assert.deepEqual(
                        (actual as MultiMap<string, T>).get(name)!.map(valueMapper),
                        expectedValues.get(name),
                        `${caption}:: expected values mismatch for ${name}`
                    );
                }
            }
        });
    }

    export function checkArray(caption: string, actual: readonly string[], expected: readonly string[]) {
        checkMap(caption, arrayToMap(actual, identity), expected, /*eachKeyCount*/ undefined);
    }

    export function checkWatchedFiles(host: TestServerHost, expectedFiles: readonly string[], additionalInfo?: string) {
        checkMap(`watchedFiles:: ${additionalInfo || ""}::`, host.watchedFiles, expectedFiles, /*eachKeyCount*/ undefined);
    }

    export interface WatchFileDetails {
        fileName: string;
        pollingInterval: PollingInterval;
    }
    export function checkWatchedFilesDetailed(host: TestServerHost, expectedFiles: ReadonlyESMap<string, number>, expectedDetails?: ESMap<string, WatchFileDetails[]>): void;
    export function checkWatchedFilesDetailed(host: TestServerHost, expectedFiles: readonly string[], eachFileWatchCount: number, expectedDetails?: ESMap<string, WatchFileDetails[]>): void;
    export function checkWatchedFilesDetailed(host: TestServerHost, expectedFiles: ReadonlyESMap<string, number> | readonly string[], eachFileWatchCountOrExpectedDetails?: number | ESMap<string, WatchFileDetails[]>, expectedDetails?: ESMap<string, WatchFileDetails[]>) {
        if (!isNumber(eachFileWatchCountOrExpectedDetails)) expectedDetails = eachFileWatchCountOrExpectedDetails;
        if (isArray(expectedFiles)) {
            checkMap(
                "watchedFiles",
                host.watchedFiles,
                expectedFiles,
                eachFileWatchCountOrExpectedDetails as number,
                [expectedDetails, ({ fileName, pollingInterval }) => ({ fileName, pollingInterval })]
            );
        }
        else {
            checkMap(
                "watchedFiles",
                host.watchedFiles,
                expectedFiles,
                [expectedDetails, ({ fileName, pollingInterval }) => ({ fileName, pollingInterval })]
            );
        }
    }

    export function checkWatchedDirectories(host: TestServerHost, expectedDirectories: string[], recursive: boolean) {
        checkMap(`watchedDirectories${recursive ? " recursive" : ""}`, recursive ? host.fsWatchesRecursive : host.fsWatches, expectedDirectories, /*eachKeyCount*/ undefined);
    }

    export interface WatchDirectoryDetails {
        directoryName: string;
        fallbackPollingInterval: PollingInterval;
        fallbackOptions: WatchOptions | undefined;
    }
    export function checkWatchedDirectoriesDetailed(host: TestServerHost, expectedDirectories: ReadonlyESMap<string, number>, recursive: boolean, expectedDetails?: ESMap<string, WatchDirectoryDetails[]>): void;
    export function checkWatchedDirectoriesDetailed(host: TestServerHost, expectedDirectories: readonly string[], eachDirectoryWatchCount: number, recursive: boolean, expectedDetails?: ESMap<string, WatchDirectoryDetails[]>): void;
    export function checkWatchedDirectoriesDetailed(host: TestServerHost, expectedDirectories: ReadonlyESMap<string, number> | readonly string[], recursiveOrEachDirectoryWatchCount: boolean | number, recursiveOrExpectedDetails?: boolean | ESMap<string, WatchDirectoryDetails[]>, expectedDetails?: ESMap<string, WatchDirectoryDetails[]>) {
        if (typeof recursiveOrExpectedDetails !== "boolean") expectedDetails = recursiveOrExpectedDetails;
        if (isArray(expectedDirectories)) {
            checkMap(
                `fsWatches${recursiveOrExpectedDetails ? " recursive" : ""}`,
                recursiveOrExpectedDetails as boolean ? host.fsWatchesRecursive : host.fsWatches,
                expectedDirectories,
                recursiveOrEachDirectoryWatchCount as number,
                [expectedDetails, ({ directoryName, fallbackPollingInterval, fallbackOptions }) => ({ directoryName, fallbackPollingInterval, fallbackOptions })]
            );
        }
        else {
            recursiveOrExpectedDetails = recursiveOrEachDirectoryWatchCount as boolean;
            checkMap(
                `fsWatches${recursiveOrExpectedDetails ? " recursive" : ""}`,
                recursiveOrExpectedDetails ? host.fsWatchesRecursive : host.fsWatches,
                expectedDirectories,
                [expectedDetails, ({ directoryName, fallbackPollingInterval, fallbackOptions }) => ({ directoryName, fallbackPollingInterval, fallbackOptions })]
            );
        }
    }

    export function checkOutputContains(host: TestServerHost, expected: readonly string[]) {
        const mapExpected = new Set(expected);
        const mapSeen = new Set<string>();
        for (const f of host.getOutput()) {
            assert.isFalse(mapSeen.has(f), `Already found ${f} in ${JSON.stringify(host.getOutput())}`);
            if (mapExpected.has(f)) {
                mapExpected.delete(f);
                mapSeen.add(f);
            }
        }
        assert.equal(mapExpected.size, 0, `Output has missing ${JSON.stringify(arrayFrom(mapExpected.keys()))} in ${JSON.stringify(host.getOutput())}`);
    }

    export function checkOutputDoesNotContain(host: TestServerHost, expectedToBeAbsent: string[] | readonly string[]) {
        const mapExpectedToBeAbsent = new Set(expectedToBeAbsent);
        for (const f of host.getOutput()) {
            assert.isFalse(mapExpectedToBeAbsent.has(f), `Contains ${f} in ${JSON.stringify(host.getOutput())}`);
        }
    }

    export type TestServerHostTrackingWrittenFiles = TestServerHost & { writtenFiles: ESMap<Path, number>; };

    export function changeToHostTrackingWrittenFiles(inputHost: TestServerHost) {
        const host = inputHost as TestServerHostTrackingWrittenFiles;
        const originalWriteFile = host.writeFile;
        host.writtenFiles = new Map<Path, number>();
        host.writeFile = (fileName, content) => {
            originalWriteFile.call(host, fileName, content);
            const path = host.toFullPath(fileName);
            host.writtenFiles.set(path, (host.writtenFiles.get(path) || 0) + 1);
        };
        return host;
    }

    export function getTsBuildProjectFile(project: string, file: string): File {
        return {
            path: getTsBuildProjectFilePath(project, file),
            content: Harness.IO.readFile(`${Harness.IO.getWorkspaceRoot()}/tests/projects/${project}/${file}`)!
        };
    }

    export const timeIncrements = 1000;

    export class TestServerHost extends VirtualServerHost implements server.ServerHost {
        readonly screenClears: number[] = [];
        private readonly output: string[] = [];
        private time = timeIncrements;
        private timeoutCallbacks = new Callbacks();
        private immediateCallbacks = new Callbacks();
        private readonly environmentVariables?: ESMap<string, string>;
        public require: ((initialPath: string, moduleName: string) => RequireResult) | undefined;
        private readonly tscWatchFile?: string;
        private readonly tscWatchDirectory?: string;
        private readonly runWithoutRecursiveWatches?: boolean;
        runWithFallbackPolling: boolean;
        public defaultWatchFileKind?: () => WatchFileKind | undefined;

        constructor(
            public withSafeList: boolean,
            fileOrFolderOrSymLinkList: readonly FileOrFolderOrSymLink[],
            options: TestServerHostCreationParameters = {}) {
            super({
                ...options,
                executingFilePath: options.executingFilePath || getExecutingFilePathFromLibFile()
            });
            const { environmentVariables, runWithoutRecursiveWatches, runWithFallbackPolling } = options;
            fileOrFolderOrSymLinkList = fileOrFolderOrSymLinkList.concat(withSafeList ? safeList : []);
            this.tscWatchFile = environmentVariables && environmentVariables.get("TSC_WATCHFILE");
            this.tscWatchDirectory = environmentVariables && environmentVariables.get("TSC_WATCHDIRECTORY");
            this.runWithoutRecursiveWatches = runWithoutRecursiveWatches;
            this.runWithFallbackPolling = !!runWithFallbackPolling;
            this.environmentVariables = environmentVariables;
            this.init();
            this.reloadFS(fileOrFolderOrSymLinkList);
        }

        override init() {
            const { watchFile, watchDirectory } = createSystemWatchFunctions({
                // We dont have polling watch file
                // it is essentially fsWatch but lets get that separate from fsWatch and
                // into watchedFiles for easier testing
                pollingWatchFile: this.tscWatchFile === Tsc_WatchFile.SingleFileWatcherPerName ?
                    createSingleFileWatcherPerName(
                        this.watchFileWorker.bind(this),
                        this.useCaseSensitiveFileNames
                    ) :
                    this.watchFileWorker.bind(this),
                getModifiedTime: this.getModifiedTime.bind(this),
                setTimeout: this.setTimeout.bind(this),
                clearTimeout: this.clearTimeout.bind(this),
                fsWatch: this.fsWatch.bind(this),
                fileExists: this.fileExists.bind(this),
                useCaseSensitiveFileNames: this.useCaseSensitiveFileNames,
                getCurrentDirectory: this.getCurrentDirectory.bind(this),
                fsSupportsRecursiveFsWatch: this.tscWatchDirectory ? false : !this.runWithoutRecursiveWatches,
                directoryExists: this.directoryExists.bind(this),
                getAccessibleSortedChildDirectories: path => this.getDirectories(path),
                realpath: this.realpath.bind(this),
                tscWatchFile: this.tscWatchFile,
                tscWatchDirectory: this.tscWatchDirectory,
                defaultWatchFileKind: () => this.defaultWatchFileKind?.(),
            });
            this.watchFile = watchFile;
            this.watchDirectory = watchDirectory;
        }

        private reloadFS(fileOrFolderOrSymLinkList: readonly FileOrFolderOrSymLink[], options?: Partial<ReloadWatchInvokeOptions>) {
            Debug.assert(this.fs.size === 0);
            const filesOrFoldersToLoad: readonly FileOrFolderOrSymLink[] = !this.windowsStyleRoot ? fileOrFolderOrSymLinkList :
                fileOrFolderOrSymLinkList.map<FileOrFolderOrSymLink>(f => {
                    const result = clone(f);
                    result.path = this.getHostSpecificPath(f.path);
                    return result;
                });
            for (const fileOrDirectory of filesOrFoldersToLoad) {
                const path = this.toFullPath(fileOrDirectory.path);
                // If its a change
                const currentEntry = this.fs.get(path);
                if (currentEntry) {
                    if (isFsFile(currentEntry)) {
                        if (isFile(fileOrDirectory)) {
                            // Update file
                            if (currentEntry.content !== fileOrDirectory.content) {
                                this.modifyFile(fileOrDirectory.path, fileOrDirectory.content, options);
                            }
                        }
                        else {
                            // TODO: Changing from file => folder/Symlink
                        }
                    }
                    else if (isFsSymLink(currentEntry)) {
                        // TODO: update symlinks
                    }
                    else {
                        // Folder
                        if (isFile(fileOrDirectory)) {
                            // TODO: Changing from folder => file
                        }
                        else {
                            // Folder update: Nothing to do.
                            currentEntry.modifiedTime = this.now();
                            this.invokeFsWatches(currentEntry.fullPath, "change");
                        }
                    }
                }
                else {
                    this.ensureFileOrFolder(fileOrDirectory, options && options.ignoreWatchInvokedWithTriggerAsFileCreate);
                }
            }
        }

        protected override fsWatch(
            fileOrDirectory: string,
            _entryKind: FileSystemEntryKind,
            cb: FsWatchCallback,
            recursive: boolean,
            fallbackPollingInterval: PollingInterval,
            fallbackOptions: WatchOptions | undefined): FileWatcher {
            return this.runWithFallbackPolling ?
                this.watchFile(
                    fileOrDirectory,
                    createFileWatcherCallback(cb),
                    fallbackPollingInterval,
                    fallbackOptions
                ) :
                createWatcher(
                    recursive ? this.fsWatchesRecursive : this.fsWatches,
                    this.toFullPath(fileOrDirectory),
                    {
                        directoryName: fileOrDirectory,
                        cb,
                        fallbackPollingInterval,
                        fallbackOptions
                    }
                );
        }

        // Output is pretty
        writeOutputIsTTY() {
            return true;
        }

        override now() {
            this.time += timeIncrements;
            return new Date(this.time);
        }

        // TODO: record and invoke callbacks to simulate timer events
        setTimeout(callback: TimeOutCallback, _time: number, ...args: any[]) {
            return this.timeoutCallbacks.register(callback, args);
        }

        getNextTimeoutId() {
            return this.timeoutCallbacks.getNextId();
        }

        clearTimeout(timeoutId: any): void {
            this.timeoutCallbacks.unregister(timeoutId);
        }

        runQueuedTimeoutCallbacks(timeoutId?: number) {
            try {
                this.timeoutCallbacks.invoke(timeoutId);
            }
            catch (e) {
                if (e.message === this.exitMessage) {
                    return;
                }
                throw e;
            }
        }

        runQueuedImmediateCallbacks(checkCount?: number) {
            if (checkCount !== undefined) {
                assert.equal(this.immediateCallbacks.count(), checkCount);
            }
            this.immediateCallbacks.invoke();
        }

        setImmediate(callback: TimeOutCallback, _time: number, ...args: any[]) {
            return this.immediateCallbacks.register(callback, args);
        }

        clearImmediate(timeoutId: any): void {
            this.immediateCallbacks.unregister(timeoutId);
        }

        clearScreen(): void {
            this.screenClears.push(this.output.length);
        }

        checkTimeoutQueueLengthAndRun(expected: number) {
            this.checkTimeoutQueueLength(expected);
            this.runQueuedTimeoutCallbacks();
        }

        checkTimeoutQueueLength(expected: number) {
            const callbacksCount = this.timeoutCallbacks.count();
            assert.equal(callbacksCount, expected, `expected ${expected} timeout callbacks queued but found ${callbacksCount}.`);
        }

        renameFile(fileName: string, newFileName: string) {
            const fullPath = getNormalizedAbsolutePath(fileName, this.currentDirectory);
            const path = this.toPath(fullPath);
            const file = this.fs.get(path) as FsFile;
            Debug.assert(!!file);

            // Only remove the file
            this.removeFileOrFolder(file, /*isRemoveableLeafFolder*/ false, /*isRenaming*/ true);

            // Add updated folder with new folder name
            const newFullPath = getNormalizedAbsolutePath(newFileName, this.currentDirectory);
            const newFile = this.toFsFile({ path: newFullPath, content: file.content });
            const newPath = newFile.path;
            const basePath = getDirectoryPath(path);
            Debug.assert(basePath !== path);
            Debug.assert(basePath === getDirectoryPath(newPath));
            const baseFolder = this.fs.get(basePath) as FsFolder;
            this.addFileOrFolderInFolder(baseFolder, newFile);
        }

        renameFolder(folderName: string, newFolderName: string) {
            const fullPath = getNormalizedAbsolutePath(folderName, this.currentDirectory);
            const path = this.toPath(fullPath);
            const folder = this.fs.get(path) as FsFolder;
            Debug.assert(!!folder);

            // Only remove the folder
            this.removeFileOrFolder(folder, /*isRemoveableLeafFolder*/ false, /*isRenaming*/ true);

            // Add updated folder with new folder name
            const newFullPath = getNormalizedAbsolutePath(newFolderName, this.currentDirectory);
            const newFolder = this.toFsFolder(newFullPath);
            const newPath = newFolder.path;
            const basePath = getDirectoryPath(path);
            Debug.assert(basePath !== path);
            Debug.assert(basePath === getDirectoryPath(newPath));
            const baseFolder = this.fs.get(basePath) as FsFolder;
            this.addFileOrFolderInFolder(baseFolder, newFolder);

            // Invoke watches for files in the folder as deleted (from old path)
            this.renameFolderEntries(folder, newFolder);
        }

        private renameFolderEntries(oldFolder: FsFolder, newFolder: FsFolder) {
            for (const entry of oldFolder.entries) {
                this.fs.delete(entry.path);
                this.invokeFileAndFsWatches(entry.fullPath, FileWatcherEventKind.Deleted);

                entry.fullPath = combinePaths(newFolder.fullPath, getBaseFileName(entry.fullPath));
                entry.path = this.toPath(entry.fullPath);
                if (newFolder !== oldFolder) {
                    newFolder.entries.push(entry);
                }
                this.fs.set(entry.path, entry);
                this.invokeFileAndFsWatches(entry.fullPath, FileWatcherEventKind.Created);
                if (isFsFolder(entry)) {
                    this.renameFolderEntries(entry, entry);
                }
            }
        }

        deleteFolder(folderPath: string, recursive?: boolean) {
            const path = this.toFullPath(folderPath);
            const currentEntry = this.fs.get(path) as FsFolder;
            Debug.assert(isFsFolder(currentEntry));
            if (recursive && currentEntry.entries.length) {
                const subEntries = currentEntry.entries.slice();
                subEntries.forEach(fsEntry => {
                    if (isFsFolder(fsEntry)) {
                        this.deleteFolder(fsEntry.fullPath, recursive);
                    }
                    else {
                        this.removeFileOrFolder(fsEntry, /*isRemoveableLeafFolder*/ false);
                    }
                });
            }
            this.removeFileOrFolder(currentEntry, /*isRemoveableLeafFolder*/ false);
        }

        readFile(s: string): string | undefined {
            const fsEntry = this.getRealFile(this.toFullPath(s));
            return fsEntry ? fsEntry.content : undefined;
        }

        getFileSize(s: string) {
            const path = this.toFullPath(s);
            const entry = this.fs.get(path)!;
            if (isFsFile(entry)) {
                return entry.fileSize ? entry.fileSize : entry.content.length;
            }
            return undefined!; // TODO: GH#18217
        }

        createHash(s: string): string {
            return `${generateDjb2Hash(s)}-${s}`;
        }

        createSHA256Hash(s: string): string {
            return sys.createSHA256Hash!(s);
        }

        prependFile(path: string, content: string, options?: Partial<ReloadWatchInvokeOptions>): void {
            this.modifyFile(path, content + this.readFile(path), options);
        }

        appendFile(path: string, content: string, options?: Partial<ReloadWatchInvokeOptions>): void {
            this.modifyFile(path, this.readFile(path) + content, options);
        }

        override write(message: string) {
            this.output.push(message);
        }

        getOutput(): readonly string[] {
            return this.output;
        }

        clearOutput() {
            clear(this.output);
            this.screenClears.length = 0;
        }

        serializeOutput(baseline: string[]) {
            const output = this.getOutput();
            let start = 0;
            baseline.push("Output::");
            for (const screenClear of this.screenClears) {
                baselineOutputs(baseline, output, start, screenClear);
                start = screenClear;
                baseline.push(">> Screen clear");
            }
            baselineOutputs(baseline, output, start);
            baseline.push("");
            this.clearOutput();
        }

        snap(): ESMap<Path, FSEntry> {
            const result = new Map<Path, FSEntry>();
            this.fs.forEach((value, key) => {
                const cloneValue = clone(value);
                if (isFsFolder(cloneValue)) {
                    cloneValue.entries = cloneValue.entries.map(clone) as SortedArray<FSEntry>;
                }
                result.set(key, cloneValue);
            });

            return result;
        }

        writtenFiles?: ESMap<Path, number>;
        diff(baseline: string[], base: ESMap<string, FSEntry> = new Map()) {
            this.fs.forEach(newFsEntry => {
                diffFsEntry(baseline, base.get(newFsEntry.path), newFsEntry, this.writtenFiles);
            });
            base.forEach(oldFsEntry => {
                const newFsEntry = this.fs.get(oldFsEntry.path);
                if (!newFsEntry) {
                    diffFsEntry(baseline, oldFsEntry, newFsEntry, this.writtenFiles);
                }
            });
            baseline.push("");
        }

        serializeWatches(baseline: string[]) {
            serializeMultiMap(baseline, "WatchedFiles", this.watchedFiles, ({ fileName, pollingInterval }) => ({ fileName, pollingInterval }));
            baseline.push("");
            serializeMultiMap(baseline, "FsWatches", this.fsWatches, serializeTestFsWatcher);
            baseline.push("");
            serializeMultiMap(baseline, "FsWatchesRecursive", this.fsWatchesRecursive, serializeTestFsWatcher);
            baseline.push("");
        }

        override getEnvironmentVariable(name: string) {
            return this.environmentVariables && this.environmentVariables.get(name) || "";
        }
    }

    function diffFsFile(baseline: string[], fsEntry: FsFile) {
        baseline.push(`//// [${fsEntry.fullPath}]\r\n${fsEntry.content}`, "");
    }
    function diffFsSymLink(baseline: string[], fsEntry: FsSymLink) {
        baseline.push(`//// [${fsEntry.fullPath}] symlink(${fsEntry.symLink})`);
    }
    function diffFsEntry(baseline: string[], oldFsEntry: FSEntry | undefined, newFsEntry: FSEntry | undefined, writtenFiles: ESMap<string, any> | undefined): void {
        const file = newFsEntry && newFsEntry.fullPath;
        if (isFsFile(oldFsEntry)) {
            if (isFsFile(newFsEntry)) {
                if (oldFsEntry.content !== newFsEntry.content) {
                    diffFsFile(baseline, newFsEntry);
                }
                else if (oldFsEntry.modifiedTime !== newFsEntry.modifiedTime) {
                    if (oldFsEntry.fullPath !== newFsEntry.fullPath) {
                        baseline.push(`//// [${file}] file was renamed from file ${oldFsEntry.fullPath}`);
                    }
                    else if (writtenFiles && !writtenFiles.has(newFsEntry.path)) {
                        baseline.push(`//// [${file}] file changed its modified time`);
                    }
                    else {
                        baseline.push(`//// [${file}] file written with same contents`);
                    }
                }
            }
            else {
                baseline.push(`//// [${oldFsEntry.fullPath}] deleted`);
                if (isFsSymLink(newFsEntry)) {
                    diffFsSymLink(baseline, newFsEntry);
                }
            }
        }
        else if (isFsSymLink(oldFsEntry)) {
            if (isFsSymLink(newFsEntry)) {
                if (oldFsEntry.symLink !== newFsEntry.symLink) {
                    diffFsSymLink(baseline, newFsEntry);
                }
                else if (oldFsEntry.modifiedTime !== newFsEntry.modifiedTime) {
                    if (oldFsEntry.fullPath !== newFsEntry.fullPath) {
                        baseline.push(`//// [${file}] symlink was renamed from symlink ${oldFsEntry.fullPath}`);
                    }
                    else if (writtenFiles && !writtenFiles.has(newFsEntry.path)) {
                        baseline.push(`//// [${file}] symlink changed its modified time`);
                    }
                    else {
                        baseline.push(`//// [${file}] symlink written with same link`);
                    }
                }
            }
            else {
                baseline.push(`//// [${oldFsEntry.fullPath}] deleted symlink`);
                if (isFsFile(newFsEntry)) {
                    diffFsFile(baseline, newFsEntry);
                }
            }
        }
        else if (isFsFile(newFsEntry)) {
            diffFsFile(baseline, newFsEntry);
        }
        else if (isFsSymLink(newFsEntry)) {
            diffFsSymLink(baseline, newFsEntry);
        }
    }

    function serializeTestFsWatcher({ directoryName, fallbackPollingInterval, fallbackOptions }: VirtualFsWatcher) {
        return {
            directoryName,
            fallbackPollingInterval,
            fallbackOptions: serializeWatchOptions(fallbackOptions)
        };
    }

    function serializeWatchOptions(fallbackOptions: WatchOptions | undefined) {
        if (!fallbackOptions) return undefined;
        const { watchFile, watchDirectory, fallbackPolling, ...rest } = fallbackOptions;
        return {
            watchFile: watchFile !== undefined ? WatchFileKind[watchFile] : undefined,
            watchDirectory: watchDirectory !== undefined ? WatchDirectoryKind[watchDirectory] : undefined,
            fallbackPolling: fallbackPolling !== undefined ? PollingWatchKind[fallbackPolling] : undefined,
            ...rest
        };
    }

    function serializeMultiMap<T, U>(baseline: string[], caption: string, multiMap: MultiMap<string, T>, valueMapper: (value: T) => U) {
        baseline.push(`${caption}::`);
        multiMap.forEach((values, key) => {
            baseline.push(`${key}:`);
            for (const value of values) {
                baseline.push(`  ${JSON.stringify(valueMapper(value))}`);
            }
        });
    }

    function baselineOutputs(baseline: string[], output: readonly string[], start: number, end = output.length) {
        let baselinedOutput: string[] | undefined;
        for (let i = start; i < end; i++) {
            (baselinedOutput ||= []).push(output[i].replace(/Elapsed::\s[0-9]+(?:\.\d+)?ms/g, "Elapsed:: *ms"));
        }
        if (baselinedOutput) baseline.push(baselinedOutput.join(""));
    }

    export const tsbuildProjectsLocation = "/user/username/projects";
    export function getTsBuildProjectFilePath(project: string, file: string) {
        return `${tsbuildProjectsLocation}/${project}/${file}`;
    }
}
