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
        // TODO: Not sure withSafeList is still needed
        withSafeList?: boolean;
        inodeWatching?: boolean;
    }

    export function createVirtualServerHost(params: VirtualServerHostCreationParameters): VirtualServerHost {
        const host = new VirtualServerHost(params);
        // Just like sys, patch the host to use writeFile
        patchWriteFileEnsuringDirectory(host);
        return host;
    }

    export function createWatchedSystem(fileOrFolderList: FileOrFolderOrSymLinkMap | readonly FileOrFolderOrSymLink[], params?: TestServerHostCreationParameters): TestServerHost {
        return new TestServerHost(fileOrFolderList, params);
    }

    export function createServerHost(fileOrFolderList: FileOrFolderOrSymLinkMap | readonly FileOrFolderOrSymLink[], params?: TestServerHostCreationParameters): TestServerHost {
        const host = new TestServerHost(fileOrFolderList, params);
        // Just like sys, patch the host to use writeFile
        patchWriteFileEnsuringDirectory(host);
        return host;
    }

    interface CallbackData {
        cb: TimeOutCallback;
        args: any[];
        ms: number | undefined;
        time: number;
    }
    class Callbacks {
        private map: { cb: TimeOutCallback; args: any[]; ms: number | undefined; time: number; }[] = [];
        private nextId = 1;

        constructor(private host: TestServerHost) {
        }

        getNextId() {
            return this.nextId;
        }

        register(cb: TimeOutCallback, args: any[], ms?: number) {
            const timeoutId = this.nextId;
            this.nextId++;
            this.map[timeoutId] = { cb, args, ms, time: this.host.getTime() };
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

        private invokeCallback({ cb, args, ms, time }: CallbackData) {
            if (ms !== undefined) {
                const newTime = ms + time;
                if (this.host.getTime() < newTime) {
                    this.host.setTime(newTime);
                }
            }
            cb(...args);
        }

        invoke(invokeKey?: number) {
            if (invokeKey) {
                this.invokeCallback(this.map[invokeKey]);
                delete this.map[invokeKey];
                return;
            }

            // Note: invoking a callback may result in new callbacks been queued,
            // so do not clear the entire callback list regardless. Only remove the
            // ones we have invoked.
            for (const key in this.map) {
                this.invokeCallback(this.map[key]);
                delete this.map[key];
            }
        }

        serialize(baseline: string[]) {
            for (const id in this.map) {
                baseline.push(`${id} at time ${this.map[id].time} in ${this.map[id].ms} ms: ${this.map[id].args[1]}`)
            }
        }
    }

    type TimeOutCallback = (...args: any[]) => void;

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

    export const timeIncrements = 1000;

    export class TestServerHost extends VirtualServerHost implements server.ServerHost {
        private readonly output: string[] = [];
        private time = timeIncrements;
        private timeoutCallbacks = new Callbacks(this);
        private immediateCallbacks = new Callbacks(this);
        readonly screenClears: number[] = [];
        private readonly environmentVariables?: ESMap<string, string>;
        public require: ((initialPath: string, moduleName: string) => RequireResult) | undefined;
        runWithFallbackPolling: boolean;
        public defaultWatchFileKind?: () => WatchFileKind | undefined;
        private readonly inodes?: ESMap<Path, number>;

        constructor(
            fileOrFolderOrSymLinkList: FileOrFolderOrSymLinkMap | readonly FileOrFolderOrSymLink[],
            options: TestServerHostCreationParameters = {}) {
            super({
                ...options,
                executingFilePath: options.executingFilePath || getExecutingFilePathFromLibFile(),
            },
            options,
            () => this.defaultWatchFileKind?.());
            const { environmentVariables, runWithFallbackPolling, inodeWatching } = options;
            this.runWithFallbackPolling = !!runWithFallbackPolling;
            this.environmentVariables = environmentVariables;
            if (inodeWatching) {
                this.inodeWatching = true;
                this.inodes = new Map();
            }
            this.reloadFS(fileOrFolderOrSymLinkList);
        }

        private nextInode = 0;
        protected override setInode(path: Path) {
            if (this.inodes) this.inodes.set(path, this.nextInode++);
        }
        override getInode(path: Path): number | undefined {
            if (this.inodes) return this.inodes.get(path);
        }
        protected override deleteInode(path: Path) {
            if (this.inodes) this.inodes.delete(path);
        }

        // Output is pretty
        writeOutputIsTTY() {
            return true;
        }

        override now() {
            this.time += timeIncrements;
            return new Date(this.time);
        }

        getTime() {
            return this.time;
        }

        setTime(time: number) {
            this.time = time;
        }

        private reloadFS(fileOrFolderOrSymLinkList: FileOrFolderOrSymLinkMap | readonly FileOrFolderOrSymLink[]) {
            Debug.assert(this.fs.size === 0);
            if (isArray(fileOrFolderOrSymLinkList)) {
                fileOrFolderOrSymLinkList.forEach(f => this.ensureFileOrFolder(!this.windowsStyleRoot ?
                    f :
                    { ...f, path: this.getHostSpecificPath(f.path) }
                ));
            }
            else {
                for (const key in fileOrFolderOrSymLinkList) {
                    if (hasProperty(fileOrFolderOrSymLinkList, key)) {
                        const path = this.getHostSpecificPath(key);
                        const value = fileOrFolderOrSymLinkList[key];
                        if (isString(value)) {
                            this.ensureFileOrFolder({ path, content: value });
                        }
                        else {
                            this.ensureFileOrFolder({ path, ...value });
                        }
                    }
                }
            }
        }

        renameFile(fileName: string, newFileName: string) {
            const fullPath = getNormalizedAbsolutePath(fileName, this.currentDirectory);
            const path = this.toPath(fullPath);
            const file = this.fs.get(path) as FsFile;
            Debug.assert(!!file);

            // Only remove the file
            this.removeFileOrFolder(file, /*isRenaming*/ true);

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
            this.removeFileOrFolder(folder, /*isRenaming*/ true);

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
                this.setInode(entry.path);
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
                        this.removeFileOrFolder(fsEntry);
                    }
                });
            }
            this.removeFileOrFolder(currentEntry);
        }

        protected override fsWatchWorker(
            fileOrDirectory: string,
            recursive: boolean,
            cb: FsWatchCallback,
        ) {
            if (this.runWithFallbackPolling) throw new Error("Need to use fallback polling instead of file system native watching");
            const path = this.toFullPath(fileOrDirectory);
            // Error if the path does not exist
            if (this.inodeWatching && !this.inodes?.has(path)) throw new Error();
            const result = createWatcher(
                recursive ? this.fsWatchesRecursive : this.fsWatches,
                path,
                {
                    directoryName: fileOrDirectory,
                    cb,
                    inode: this.inodes?.get(path)
                }
            ) as FsWatchWorkerWatcher;
            result.on = noop;
            return result;
        }

        createHash(s: string): string {
            return `${generateDjb2Hash(s)}-${s}`;
        }

        createSHA256Hash(s: string): string {
            return sys.createSHA256Hash!(s);
        }

        // TODO: record and invoke callbacks to simulate timer events
        setTimeout(callback: TimeOutCallback, ms: number, ...args: any[]) {
            return this.timeoutCallbacks.register(callback, args, ms);
        }

        getNextTimeoutId() {
            return this.timeoutCallbacks.getNextId();
        }

        clearTimeout(timeoutId: any): void {
            this.timeoutCallbacks.unregister(timeoutId);
        }

        serializeTimeout(baseline: string[]) {
            this.timeoutCallbacks.serialize(baseline)
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

        setImmediate(callback: TimeOutCallback, ...args: any[]) {
            return this.immediateCallbacks.register(callback, args);
        }

        clearImmediate(timeoutId: any): void {
            this.immediateCallbacks.unregister(timeoutId);
        }

        prependFile(path: string, content: string, options?: Partial<WatchInvokeOptions>): void {
            this.modifyFile(path, content + this.readFile(path), options);
        }

        appendFile(path: string, content: string, options?: Partial<WatchInvokeOptions>): void {
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

        readonly exitMessage = "System Exit";
        exitCode: number | undefined;
        exit(exitCode?: number) {
            this.exitCode = exitCode;
            throw new Error(this.exitMessage);
        }

        getEnvironmentVariable(name: string) {
            return this.environmentVariables && this.environmentVariables.get(name) || "";
        }
    }

    export function snap(fshost: VirtualServerHost): ESMap<Path, FSEntry> {
        const result = new Map<Path, FSEntry>();
        fshost.fs.forEach((value, key) => {
            const cloneValue = clone(value);
            if (isFsFolder(cloneValue)) {
                cloneValue.entries = cloneValue.entries.map(clone) as SortedArray<FSEntry>;
            }
            result.set(key, cloneValue);
        });

        return result;
    }

    export function diff(fshost: VirtualServerHost, baseline: string[], base: ESMap<Path, FSEntry> = new Map()) {
        fshost.fs.forEach((newFsEntry, path) => {
            diffFsEntry(baseline, base.get(path), newFsEntry, fshost.getInode(path), fshost.writtenFiles);
        });
        base.forEach((oldFsEntry, path) => {
            const newFsEntry = fshost.fs.get(path);
            if (!newFsEntry) {
                diffFsEntry(baseline, oldFsEntry, newFsEntry, fshost.getInode(path), fshost.writtenFiles);
            }
        });
        baseline.push("");
    }

    function diffFsFile(baseline: string[], fsEntry: FsFile, newInode: number | undefined) {
        baseline.push(`//// [${fsEntry.fullPath}]${inodeString(newInode)}\r\n${fsEntry.content}`, "");
    }
    function diffFsSymLink(baseline: string[], fsEntry: FsSymLink, newInode: number | undefined) {
        baseline.push(`//// [${fsEntry.fullPath}] symlink(${fsEntry.symLink})${inodeString(newInode)}`);
    }
    function inodeString(inode: number | undefined) {
        return inode !== undefined ? ` Inode:: ${inode}` : "";
    }
    function diffFsEntry(baseline: string[], oldFsEntry: FSEntry | undefined, newFsEntry: FSEntry | undefined, newInode: number | undefined, writtenFiles: ESMap<string, any> | undefined): void {
        const file = newFsEntry && newFsEntry.fullPath;
        if (isFsFile(oldFsEntry)) {
            if (isFsFile(newFsEntry)) {
                if (oldFsEntry.content !== newFsEntry.content) {
                    diffFsFile(baseline, newFsEntry, newInode);
                }
                else if (oldFsEntry.modifiedTime !== newFsEntry.modifiedTime) {
                    if (oldFsEntry.fullPath !== newFsEntry.fullPath) {
                        baseline.push(`//// [${file}] file was renamed from file ${oldFsEntry.fullPath}${inodeString(newInode)}`);
                    }
                    else if (writtenFiles && !writtenFiles.has(newFsEntry.path)) {
                        baseline.push(`//// [${file}] file changed its modified time${inodeString(newInode)}`);
                    }
                    else {
                        baseline.push(`//// [${file}] file written with same contents${inodeString(newInode)}`);
                    }
                }
            }
            else {
                baseline.push(`//// [${oldFsEntry.fullPath}] deleted`);
                if (isFsSymLink(newFsEntry)) {
                    diffFsSymLink(baseline, newFsEntry, newInode);
                }
            }
        }
        else if (isFsSymLink(oldFsEntry)) {
            if (isFsSymLink(newFsEntry)) {
                if (oldFsEntry.symLink !== newFsEntry.symLink) {
                    diffFsSymLink(baseline, newFsEntry, newInode);
                }
                else if (oldFsEntry.modifiedTime !== newFsEntry.modifiedTime) {
                    if (oldFsEntry.fullPath !== newFsEntry.fullPath) {
                        baseline.push(`//// [${file}] symlink was renamed from symlink ${oldFsEntry.fullPath}${inodeString(newInode)}`);
                    }
                    else if (writtenFiles && !writtenFiles.has(newFsEntry.path)) {
                        baseline.push(`//// [${file}] symlink changed its modified time${inodeString(newInode)}`);
                    }
                    else {
                        baseline.push(`//// [${file}] symlink written with same link${inodeString(newInode)}`);
                    }
                }
            }
            else {
                baseline.push(`//// [${oldFsEntry.fullPath}] deleted symlink`);
                if (isFsFile(newFsEntry)) {
                    diffFsFile(baseline, newFsEntry, newInode);
                }
            }
        }
        else if (isFsFile(newFsEntry)) {
            diffFsFile(baseline, newFsEntry, newInode);
        }
        else if (isFsSymLink(newFsEntry)) {
            diffFsSymLink(baseline, newFsEntry, newInode);
        }
    }

    function baselineOutputs(baseline: string[], output: readonly string[], start: number, end = output.length) {
        let baselinedOutput: string[] | undefined;
        for (let i = start; i < end; i++) {
            (baselinedOutput ||= []).push(output[i].replace(/Elapsed::\s[0-9]+(?:\.\d+)?ms/g, "Elapsed:: *ms"));
        }
        if (baselinedOutput) baseline.push(baselinedOutput.join(""));
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
    export const tsbuildProjectsLocation = "/user/username/projects";
    export function getTsBuildProjectFilePath(project: string, file: string) {
        return `${tsbuildProjectsLocation}/${project}/${file}`;
    }

    export function getTsBuildProjectFile(project: string, file: string): File {
        return {
            path: getTsBuildProjectFilePath(project, file),
            content: Harness.IO.readFile(`${Harness.IO.getWorkspaceRoot()}/tests/projects/${project}/${file}`)!
        };
    }
}
