/// <reference path="harness.ts" />

namespace ts.TestFSWithWatch {
    const { content: libFileContent } = Harness.getDefaultLibraryFile(Harness.IO);
    export const libFile: FileOrFolder = {
        path: "/a/lib/lib.d.ts",
        content: libFileContent
    };

    export const safeList = {
        path: <Path>"/safeList.json",
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

    interface TestServerHostCreationParameters {
        useCaseSensitiveFileNames?: boolean;
        executingFilePath?: string;
        currentDirectory?: string;
        newLine?: string;
    }

    export function createWatchedSystem(fileOrFolderList: FileOrFolder[], params?: TestServerHostCreationParameters): TestServerHost {
        if (!params) {
            params = {};
        }
        const host = new TestServerHost(/*withSafelist*/ false,
            params.useCaseSensitiveFileNames !== undefined ? params.useCaseSensitiveFileNames : false,
            params.executingFilePath || getExecutingFilePathFromLibFile(),
            params.currentDirectory || "/",
            fileOrFolderList,
            params.newLine);
        return host;
    }

    export function createServerHost(fileOrFolderList: FileOrFolder[], params?: TestServerHostCreationParameters): TestServerHost {
        if (!params) {
            params = {};
        }
        const host = new TestServerHost(/*withSafelist*/ true,
            params.useCaseSensitiveFileNames !== undefined ? params.useCaseSensitiveFileNames : false,
            params.executingFilePath || getExecutingFilePathFromLibFile(),
            params.currentDirectory || "/",
            fileOrFolderList,
            params.newLine);
        return host;
    }

    export interface FileOrFolder {
        path: string;
        content?: string;
        fileSize?: number;
    }

    interface FSEntry {
        path: Path;
        fullPath: string;
    }

    interface File extends FSEntry {
        content: string;
        fileSize?: number;
    }

    interface Folder extends FSEntry {
        entries: FSEntry[];
    }

    function isFolder(s: FSEntry): s is Folder {
        return s && isArray((<Folder>s).entries);
    }

    function isFile(s: FSEntry): s is File {
        return s && isString((<File>s).content);
    }

    function invokeWatcherCallbacks<T>(callbacks: T[], invokeCallback: (cb: T) => void): void {
        if (callbacks) {
            // The array copy is made to ensure that even if one of the callback removes the callbacks,
            // we dont miss any callbacks following it
            const cbs = callbacks.slice();
            for (const cb of cbs) {
                invokeCallback(cb);
            }
        }
    }

    function checkMapKeys(caption: string, map: Map<any>, expectedKeys: string[]) {
        assert.equal(map.size, expectedKeys.length, `${caption}: incorrect size of map: Actual keys: ${arrayFrom(map.keys())} Expected: ${expectedKeys}`);
        for (const name of expectedKeys) {
            assert.isTrue(map.has(name), `${caption} is expected to contain ${name}, actual keys: ${arrayFrom(map.keys())}`);
        }
    }

    export function checkFileNames(caption: string, actualFileNames: string[], expectedFileNames: string[]) {
        assert.equal(actualFileNames.length, expectedFileNames.length, `${caption}: incorrect actual number of files, expected ${JSON.stringify(expectedFileNames)}, got ${actualFileNames}`);
        for (const f of expectedFileNames) {
            assert.isTrue(contains(actualFileNames, f), `${caption}: expected to find ${f} in ${JSON.stringify(actualFileNames)}`);
        }
    }

    export function checkWatchedFiles(host: TestServerHost, expectedFiles: string[]) {
        checkMapKeys("watchedFiles", host.watchedFiles, expectedFiles);
    }

    export function checkWatchedDirectories(host: TestServerHost, expectedDirectories: string[], recursive = false) {
        checkMapKeys("watchedDirectories", recursive ? host.watchedDirectoriesRecursive : host.watchedDirectories, expectedDirectories);
    }

    export function checkOutputContains(host: TestServerHost, expected: ReadonlyArray<string>) {
        const mapExpected = arrayToSet(expected);
        const mapSeen = createMap<true>();
        for (const f of host.getOutput()) {
            assert.isUndefined(mapSeen.get(f), `Already found ${f} in ${JSON.stringify(host.getOutput())}`);
            if (mapExpected.has(f)) {
                mapExpected.delete(f);
                mapSeen.set(f, true);
            }
        }
        assert.equal(mapExpected.size, 0, `Output has missing ${JSON.stringify(flatMapIter(mapExpected.keys(), key => key))} in ${JSON.stringify(host.getOutput())}`);
    }

    export function checkOutputDoesNotContain(host: TestServerHost, expectedToBeAbsent: string[] | ReadonlyArray<string>) {
        const mapExpectedToBeAbsent = arrayToSet(expectedToBeAbsent);
        for (const f of host.getOutput()) {
            assert.isFalse(mapExpectedToBeAbsent.has(f), `Contains ${f} in ${JSON.stringify(host.getOutput())}`);
        }
    }

    class Callbacks {
        private map: TimeOutCallback[] = [];
        private nextId = 1;

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

        invoke() {
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

    export class TestServerHost implements server.ServerHost {
        args: string[] = [];

        private readonly output: string[] = [];

        private fs: Map<FSEntry> = createMap<FSEntry>();
        private getCanonicalFileName: (s: string) => string;
        private toPath: (f: string) => Path;
        private timeoutCallbacks = new Callbacks();
        private immediateCallbacks = new Callbacks();

        readonly watchedDirectories = createMultiMap<DirectoryWatcherCallback>();
        readonly watchedDirectoriesRecursive = createMultiMap<DirectoryWatcherCallback>();
        readonly watchedFiles = createMultiMap<FileWatcherCallback>();

        constructor(public withSafeList: boolean, public useCaseSensitiveFileNames: boolean, private executingFilePath: string, private currentDirectory: string, fileOrFolderList: FileOrFolder[], public readonly newLine = "\n") {
            this.getCanonicalFileName = createGetCanonicalFileName(useCaseSensitiveFileNames);
            this.toPath = s => toPath(s, currentDirectory, this.getCanonicalFileName);

            this.reloadFS(fileOrFolderList);
        }

        toNormalizedAbsolutePath(s: string) {
            return getNormalizedAbsolutePath(s, this.currentDirectory);
        }

        toFullPath(s: string) {
            return this.toPath(this.toNormalizedAbsolutePath(s));
        }

        reloadFS(fileOrFolderList: FileOrFolder[]) {
            const mapNewLeaves = createMap<true>();
            const isNewFs = this.fs.size === 0;
            // always inject safelist file in the list of files
            for (const fileOrFolder of fileOrFolderList.concat(this.withSafeList ? safeList : [])) {
                const path = this.toFullPath(fileOrFolder.path);
                mapNewLeaves.set(path, true);
                // If its a change
                const currentEntry = this.fs.get(path);
                if (currentEntry) {
                    if (isFile(currentEntry)) {
                        if (isString(fileOrFolder.content)) {
                            // Update file
                            if (currentEntry.content !== fileOrFolder.content) {
                                currentEntry.content = fileOrFolder.content;
                                this.invokeFileWatcher(currentEntry.fullPath, FileWatcherEventKind.Changed);
                            }
                        }
                        else {
                            // TODO: Changing from file => folder
                        }
                    }
                    else {
                        // Folder
                        if (isString(fileOrFolder.content)) {
                            // TODO: Changing from folder => file
                        }
                        else {
                            // Folder update: Nothing to do.
                        }
                    }
                }
                else {
                    this.ensureFileOrFolder(fileOrFolder);
                }
            }

            if (!isNewFs) {
                this.fs.forEach((fileOrFolder, path) => {
                    // If this entry is not from the new file or folder
                    if (!mapNewLeaves.get(path)) {
                        // Leaf entries that arent in new list => remove these
                        if (isFile(fileOrFolder) || isFolder(fileOrFolder) && fileOrFolder.entries.length === 0) {
                            this.removeFileOrFolder(fileOrFolder, folder => !mapNewLeaves.get(folder.path));
                        }
                    }
                });
            }
        }

        ensureFileOrFolder(fileOrFolder: FileOrFolder) {
            if (isString(fileOrFolder.content)) {
                const file = this.toFile(fileOrFolder);
                Debug.assert(!this.fs.get(file.path));
                const baseFolder = this.ensureFolder(getDirectoryPath(file.fullPath));
                this.addFileOrFolderInFolder(baseFolder, file);
            }
            else {
                const fullPath = getNormalizedAbsolutePath(fileOrFolder.path, this.currentDirectory);
                this.ensureFolder(fullPath);
            }
        }

        private ensureFolder(fullPath: string): Folder {
            const path = this.toPath(fullPath);
            let folder = this.fs.get(path) as Folder;
            if (!folder) {
                folder = this.toFolder(fullPath);
                const baseFullPath = getDirectoryPath(fullPath);
                if (fullPath !== baseFullPath) {
                    // Add folder in the base folder
                    const baseFolder = this.ensureFolder(baseFullPath);
                    this.addFileOrFolderInFolder(baseFolder, folder);
                }
                else {
                    // root folder
                    Debug.assert(this.fs.size === 0);
                    this.fs.set(path, folder);
                }
            }
            Debug.assert(isFolder(folder));
            return folder;
        }

        private addFileOrFolderInFolder(folder: Folder, fileOrFolder: File | Folder) {
            folder.entries.push(fileOrFolder);
            this.fs.set(fileOrFolder.path, fileOrFolder);

            if (isFile(fileOrFolder)) {
                this.invokeFileWatcher(fileOrFolder.fullPath, FileWatcherEventKind.Created);
            }
            this.invokeDirectoryWatcher(folder.fullPath, fileOrFolder.fullPath);
        }

        private removeFileOrFolder(fileOrFolder: File | Folder, isRemovableLeafFolder: (folder: Folder) => boolean) {
            const basePath = getDirectoryPath(fileOrFolder.path);
            const baseFolder = this.fs.get(basePath) as Folder;
            if (basePath !== fileOrFolder.path) {
                Debug.assert(!!baseFolder);
                filterMutate(baseFolder.entries, entry => entry !== fileOrFolder);
            }
            this.fs.delete(fileOrFolder.path);

            if (isFile(fileOrFolder)) {
                this.invokeFileWatcher(fileOrFolder.fullPath, FileWatcherEventKind.Deleted);
            }
            else {
                Debug.assert(fileOrFolder.entries.length === 0);
                const relativePath = this.getRelativePathToDirectory(fileOrFolder.fullPath, fileOrFolder.fullPath);
                // Invoke directory and recursive directory watcher for the folder
                // Here we arent invoking recursive directory watchers for the base folders
                // since that is something we would want to do for both file as well as folder we are deleting
                invokeWatcherCallbacks(this.watchedDirectories.get(fileOrFolder.path), cb => cb(relativePath));
                invokeWatcherCallbacks(this.watchedDirectoriesRecursive.get(fileOrFolder.path), cb => cb(relativePath));
            }

            if (basePath !== fileOrFolder.path) {
                if (baseFolder.entries.length === 0 && isRemovableLeafFolder(baseFolder)) {
                    this.removeFileOrFolder(baseFolder, isRemovableLeafFolder);
                }
                else {
                    this.invokeRecursiveDirectoryWatcher(baseFolder.fullPath, fileOrFolder.fullPath);
                }
            }
        }

        private invokeFileWatcher(fileFullPath: string, eventKind: FileWatcherEventKind) {
            const callbacks = this.watchedFiles.get(this.toPath(fileFullPath));
            const fileName = getBaseFileName(fileFullPath);
            invokeWatcherCallbacks(callbacks, cb => cb(fileName, eventKind));
        }

        private getRelativePathToDirectory(directoryFullPath: string, fileFullPath: string) {
            return getRelativePathToDirectoryOrUrl(directoryFullPath, fileFullPath, this.currentDirectory, this.getCanonicalFileName, /*isAbsolutePathAnUrl*/ false);
        }

        /**
         * This will call the directory watcher for the folderFullPath and recursive directory watchers for this and base folders
         */
        private invokeDirectoryWatcher(folderFullPath: string, fileName: string) {
            const relativePath = this.getRelativePathToDirectory(folderFullPath, fileName);
            invokeWatcherCallbacks(this.watchedDirectories.get(this.toPath(folderFullPath)), cb => cb(relativePath));
            this.invokeRecursiveDirectoryWatcher(folderFullPath, fileName);
        }

        /**
         * This will call the recursive directory watcher for this directory as well as all the base directories
         */
        private invokeRecursiveDirectoryWatcher(fullPath: string, fileName: string) {
            const relativePath = this.getRelativePathToDirectory(fullPath, fileName);
            invokeWatcherCallbacks(this.watchedDirectoriesRecursive.get(this.toPath(fullPath)), cb => cb(relativePath));
            const basePath = getDirectoryPath(fullPath);
            if (this.getCanonicalFileName(fullPath) !== this.getCanonicalFileName(basePath)) {
                this.invokeRecursiveDirectoryWatcher(basePath, fileName);
            }
        }

        private toFile(fileOrFolder: FileOrFolder): File {
            const fullPath = getNormalizedAbsolutePath(fileOrFolder.path, this.currentDirectory);
            return {
                path: this.toPath(fullPath),
                content: fileOrFolder.content,
                fullPath,
                fileSize: fileOrFolder.fileSize
            };
        }

        private toFolder(path: string): Folder {
            const fullPath = getNormalizedAbsolutePath(path, this.currentDirectory);
            return {
                path: this.toPath(fullPath),
                entries: [],
                fullPath
            };
        }

        fileExists(s: string) {
            const path = this.toFullPath(s);
            return isFile(this.fs.get(path));
        }

        readFile(s: string) {
            const fsEntry = this.fs.get(this.toFullPath(s));
            return isFile(fsEntry) ? fsEntry.content : undefined;
        }

        getFileSize(s: string) {
            const path = this.toFullPath(s);
            const entry = this.fs.get(path);
            if (isFile(entry)) {
                return entry.fileSize ? entry.fileSize : entry.content.length;
            }
            return undefined;
        }

        directoryExists(s: string) {
            const path = this.toFullPath(s);
            return isFolder(this.fs.get(path));
        }

        getDirectories(s: string) {
            const path = this.toFullPath(s);
            const folder = this.fs.get(path);
            if (isFolder(folder)) {
                return mapDefined(folder.entries, entry => isFolder(entry) ? getBaseFileName(entry.fullPath) : undefined);
            }
            Debug.fail(folder ? "getDirectories called on file" : "getDirectories called on missing folder");
            return [];
        }

        readDirectory(path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>, depth?: number): string[] {
            return ts.matchFiles(this.toNormalizedAbsolutePath(path), extensions, exclude, include, this.useCaseSensitiveFileNames, this.getCurrentDirectory(), depth, (dir) => {
                const directories: string[] = [];
                const files: string[] = [];
                const dirEntry = this.fs.get(this.toPath(dir));
                if (isFolder(dirEntry)) {
                    dirEntry.entries.forEach((entry) => {
                        if (isFolder(entry)) {
                            directories.push(getBaseFileName(entry.fullPath));
                        }
                        else if (isFile(entry)) {
                            files.push(getBaseFileName(entry.fullPath));
                        }
                        else {
                            Debug.fail("Unknown entry");
                        }
                    });
                }
                return { directories, files };
            });
        }

        watchDirectory(directoryName: string, callback: DirectoryWatcherCallback, recursive: boolean): DirectoryWatcher {
            const path = this.toFullPath(directoryName);
            const map = recursive ? this.watchedDirectoriesRecursive : this.watchedDirectories;
            map.add(path, callback);
            return {
                referenceCount: 0,
                directoryName,
                close: () => map.remove(path, callback)
            };
        }

        createHash(s: string): string {
            return Harness.mockHash(s);
        }

        watchFile(fileName: string, callback: FileWatcherCallback) {
            const path = this.toFullPath(fileName);
            this.watchedFiles.add(path, callback);
            return { close: () => this.watchedFiles.remove(path, callback) };
        }

        // TOOD: record and invoke callbacks to simulate timer events
        setTimeout(callback: TimeOutCallback, _time: number, ...args: any[]) {
            return this.timeoutCallbacks.register(callback, args);
        }

        clearTimeout(timeoutId: any): void {
            this.timeoutCallbacks.unregister(timeoutId);
        }

        checkTimeoutQueueLengthAndRun(expected: number) {
            this.checkTimeoutQueueLength(expected);
            this.runQueuedTimeoutCallbacks();
        }

        checkTimeoutQueueLength(expected: number) {
            const callbacksCount = this.timeoutCallbacks.count();
            assert.equal(callbacksCount, expected, `expected ${expected} timeout callbacks queued but found ${callbacksCount}.`);
        }

        runQueuedTimeoutCallbacks() {
            try {
                this.timeoutCallbacks.invoke();
            }
            catch (e) {
                if (e.message === this.existMessage) {
                    return;
                }
                throw e;
            }
        }

        runQueuedImmediateCallbacks() {
            this.immediateCallbacks.invoke();
        }

        setImmediate(callback: TimeOutCallback, _time: number, ...args: any[]) {
            return this.immediateCallbacks.register(callback, args);
        }

        clearImmediate(timeoutId: any): void {
            this.immediateCallbacks.unregister(timeoutId);
        }

        createDirectory(directoryName: string): void {
            const folder = this.toFolder(directoryName);

            // base folder has to be present
            const base = getDirectoryPath(folder.fullPath);
            const baseFolder = this.fs.get(base) as Folder;
            Debug.assert(isFolder(baseFolder));

            Debug.assert(!this.fs.get(folder.path));
            this.addFileOrFolderInFolder(baseFolder, folder);
        }

        writeFile(path: string, content: string): void {
            const file = this.toFile({ path, content });

            // base folder has to be present
            const base = getDirectoryPath(file.fullPath);
            const folder = this.fs.get(base) as Folder;
            Debug.assert(isFolder(folder));

            this.addFileOrFolderInFolder(folder, file);
        }

        write(message: string) {
            this.output.push(message);
        }

        getOutput(): ReadonlyArray<string> {
            return this.output;
        }

        clearOutput() {
            clear(this.output);
        }

        readonly existMessage = "System Exit";
        exitCode: number;
        readonly resolvePath = (s: string) => s;
        readonly getExecutingFilePath = () => this.executingFilePath;
        readonly getCurrentDirectory = () => this.currentDirectory;
        exit(exitCode?: number) {
            this.exitCode = exitCode;
            throw new Error(this.existMessage);
        }
        readonly getEnvironmentVariable = notImplemented;
    }
}
