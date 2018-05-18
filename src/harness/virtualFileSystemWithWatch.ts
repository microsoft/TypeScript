/// <reference path="harness.ts" />

namespace ts.TestFSWithWatch {
    export const libFile: File = {
        path: "/a/lib/lib.d.ts",
        content: `/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> {}`
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
        useWindowsStylePaths?: boolean;
        environmentVariables?: Map<string>;
    }

    export function createWatchedSystem(fileOrFolderList: ReadonlyArray<FileOrFolderOrSymLink>, params?: TestServerHostCreationParameters): TestServerHost {
        if (!params) {
            params = {};
        }
        const host = new TestServerHost(/*withSafelist*/ false,
            params.useCaseSensitiveFileNames !== undefined ? params.useCaseSensitiveFileNames : false,
            params.executingFilePath || getExecutingFilePathFromLibFile(),
            params.currentDirectory || "/",
            fileOrFolderList,
            params.newLine,
            params.useWindowsStylePaths,
            params.environmentVariables);
        return host;
    }

    export function createServerHost(fileOrFolderList: ReadonlyArray<FileOrFolderOrSymLink>, params?: TestServerHostCreationParameters): TestServerHost {
        if (!params) {
            params = {};
        }
        const host = new TestServerHost(/*withSafelist*/ true,
            params.useCaseSensitiveFileNames !== undefined ? params.useCaseSensitiveFileNames : false,
            params.executingFilePath || getExecutingFilePathFromLibFile(),
            params.currentDirectory || "/",
            fileOrFolderList,
            params.newLine,
            params.useWindowsStylePaths,
            params.environmentVariables);
        return host;
    }

    export interface File {
        path: string;
        content: string;
        fileSize?: number;
    }

    export interface Folder {
        path: string;
    }

    export interface SymLink {
        path: string;
        symLink: string;
    }

    export type FileOrFolderOrSymLink = File | Folder | SymLink;
    function isFile(fileOrFolderOrSymLink: FileOrFolderOrSymLink): fileOrFolderOrSymLink is File {
        return isString((<File>fileOrFolderOrSymLink).content);
    }

    function isSymLink(fileOrFolderOrSymLink: FileOrFolderOrSymLink): fileOrFolderOrSymLink is SymLink {
        return isString((<SymLink>fileOrFolderOrSymLink).symLink);
    }

    interface FSEntryBase {
        path: Path;
        fullPath: string;
        modifiedTime: Date;
    }

    interface FsFile extends FSEntryBase {
        content: string;
        fileSize?: number;
    }

    interface FsFolder extends FSEntryBase {
        entries: SortedArray<FSEntry>;
    }

    interface FsSymLink extends FSEntryBase {
        symLink: string;
    }

    type FSEntry = FsFile | FsFolder | FsSymLink;

    function isFsFolder(s: FSEntry): s is FsFolder {
        return s && isArray((<FsFolder>s).entries);
    }

    function isFsFile(s: FSEntry): s is FsFile {
        return s && isString((<FsFile>s).content);
    }

    function isFsSymLink(s: FSEntry): s is FsSymLink {
        return s && isString((<FsSymLink>s).symLink);
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

    function getDiffInKeys<T>(map: Map<T>, expectedKeys: ReadonlyArray<string>) {
        if (map.size === expectedKeys.length) {
            return "";
        }
        const notInActual: string[] = [];
        const duplicates: string[] = [];
        const seen = createMap<true>();
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

    export function verifyMapSize(caption: string, map: Map<any>, expectedKeys: ReadonlyArray<string>) {
        assert.equal(map.size, expectedKeys.length, `${caption}: incorrect size of map: Actual keys: ${arrayFrom(map.keys())} Expected: ${expectedKeys}${getDiffInKeys(map, expectedKeys)}`);
    }

    function checkMapKeys(caption: string, map: Map<any>, expectedKeys: ReadonlyArray<string>) {
        verifyMapSize(caption, map, expectedKeys);
        for (const name of expectedKeys) {
            assert.isTrue(map.has(name), `${caption} is expected to contain ${name}, actual keys: ${arrayFrom(map.keys())}`);
        }
    }

    export function checkMultiMapKeyCount(caption: string, actual: MultiMap<any>, expectedKeys: Map<number>) {
        verifyMapSize(caption, actual, arrayFrom(expectedKeys.keys()));
        expectedKeys.forEach((count, name) => {
            assert.isTrue(actual.has(name), `${caption}: expected to contain ${name}, actual keys: ${arrayFrom(actual.keys())}`);
            assert.equal(actual.get(name).length, count, `${caption}: Expected to be have ${count} entries for ${name}. Actual entry: ${JSON.stringify(actual.get(name))}`);
        });
    }

    export function checkMultiMapEachKeyWithCount(caption: string, actual: MultiMap<any>, expectedKeys: ReadonlyArray<string>, count: number) {
        return checkMultiMapKeyCount(caption, actual, arrayToMap(expectedKeys, s => s, () => count));
    }

    export function checkArray(caption: string, actual: ReadonlyArray<string>, expected: ReadonlyArray<string>) {
        assert.equal(actual.length, expected.length, `${caption}: incorrect actual number of files, expected:\r\n${expected.join("\r\n")}\r\ngot: ${actual.join("\r\n")}`);
        for (const f of expected) {
            assert.equal(true, contains(actual, f), `${caption}: expected to find ${f} in ${actual}`);
        }
    }

    export function checkWatchedFiles(host: TestServerHost, expectedFiles: string[]) {
        checkMapKeys("watchedFiles", host.watchedFiles, expectedFiles);
    }

    export function checkWatchedFilesDetailed(host: TestServerHost, expectedFiles: Map<number>) {
        checkMultiMapKeyCount("watchedFiles", host.watchedFiles, expectedFiles);
    }

    export function checkWatchedDirectories(host: TestServerHost, expectedDirectories: string[], recursive: boolean) {
        checkMapKeys(`watchedDirectories${recursive ? " recursive" : ""}`, recursive ? host.watchedDirectoriesRecursive : host.watchedDirectories, expectedDirectories);
    }

    export function checkWatchedDirectoriesDetailed(host: TestServerHost, expectedDirectories: Map<number>, recursive: boolean) {
        checkMultiMapKeyCount(`watchedDirectories${recursive ? " recursive" : ""}`, recursive ? host.watchedDirectoriesRecursive : host.watchedDirectories, expectedDirectories);
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
        assert.equal(mapExpected.size, 0, `Output has missing ${JSON.stringify(arrayFrom(mapExpected.keys()))} in ${JSON.stringify(host.getOutput())}`);
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

    export interface TestFileWatcher {
        cb: FileWatcherCallback;
        fileName: string;
    }

    export interface TestDirectoryWatcher {
        cb: DirectoryWatcherCallback;
        directoryName: string;
    }

    export interface ReloadWatchInvokeOptions {
        /** Invokes the directory watcher for the parent instead of the file changed */
        invokeDirectoryWatcherInsteadOfFileChanged: boolean;
        /** When new file is created, do not invoke watches for it */
        ignoreWatchInvokedWithTriggerAsFileCreate: boolean;
        /** Invoke the file delete, followed by create instead of file changed */
        invokeFileDeleteCreateAsPartInsteadOfChange: boolean;
    }

    export enum Tsc_WatchDirectory {
        WatchFile = "RecursiveDirectoryUsingFsWatchFile",
        NonRecursiveWatchDirectory = "RecursiveDirectoryUsingNonRecursiveWatchDirectory",
        DynamicPolling = "RecursiveDirectoryUsingDynamicPriorityPolling"
    }

    const timeIncrements = 1000;
    export class TestServerHost implements server.ServerHost, FormatDiagnosticsHost, ModuleResolutionHost {
        args: string[] = [];

        private readonly output: string[] = [];

        private fs: Map<FSEntry> = createMap<FSEntry>();
        private time = timeIncrements;
        getCanonicalFileName: (s: string) => string;
        private toPath: (f: string) => Path;
        private timeoutCallbacks = new Callbacks();
        private immediateCallbacks = new Callbacks();
        readonly screenClears: number[] = [];

        readonly watchedDirectories = createMultiMap<TestDirectoryWatcher>();
        readonly watchedDirectoriesRecursive = createMultiMap<TestDirectoryWatcher>();
        readonly watchedFiles = createMultiMap<TestFileWatcher>();
        private readonly executingFilePath: string;
        private readonly currentDirectory: string;
        private readonly dynamicPriorityWatchFile: HostWatchFile;
        private readonly customRecursiveWatchDirectory: HostWatchDirectory | undefined;

        constructor(public withSafeList: boolean, public useCaseSensitiveFileNames: boolean, executingFilePath: string, currentDirectory: string, fileOrFolderorSymLinkList: ReadonlyArray<FileOrFolderOrSymLink>, public readonly newLine = "\n", public readonly useWindowsStylePath?: boolean, private readonly environmentVariables?: Map<string>) {
            this.getCanonicalFileName = createGetCanonicalFileName(useCaseSensitiveFileNames);
            this.toPath = s => toPath(s, currentDirectory, this.getCanonicalFileName);
            this.executingFilePath = this.getHostSpecificPath(executingFilePath);
            this.currentDirectory = this.getHostSpecificPath(currentDirectory);
            this.reloadFS(fileOrFolderorSymLinkList);
            this.dynamicPriorityWatchFile = this.environmentVariables && this.environmentVariables.get("TSC_WATCHFILE") === "DynamicPriorityPolling" ?
                createDynamicPriorityPollingWatchFile(this) :
                undefined;
            const tscWatchDirectory = this.environmentVariables && this.environmentVariables.get("TSC_WATCHDIRECTORY") as Tsc_WatchDirectory;
            if (tscWatchDirectory === Tsc_WatchDirectory.WatchFile) {
                const watchDirectory: HostWatchDirectory = (directory, cb) => this.watchFile(directory, () => cb(directory), PollingInterval.Medium);
                this.customRecursiveWatchDirectory = createRecursiveDirectoryWatcher({
                    directoryExists: path => this.directoryExists(path),
                    getAccessibleSortedChildDirectories: path => this.getDirectories(path),
                    filePathComparer: this.useCaseSensitiveFileNames ? compareStringsCaseSensitive : compareStringsCaseInsensitive,
                    watchDirectory,
                    realpath: s => this.realpath(s)
                });
            }
            else if (tscWatchDirectory === Tsc_WatchDirectory.NonRecursiveWatchDirectory) {
                const watchDirectory: HostWatchDirectory = (directory, cb) => this.watchDirectory(directory, fileName => cb(fileName), /*recursive*/ false);
                this.customRecursiveWatchDirectory = createRecursiveDirectoryWatcher({
                    directoryExists: path => this.directoryExists(path),
                    getAccessibleSortedChildDirectories: path => this.getDirectories(path),
                    filePathComparer: this.useCaseSensitiveFileNames ? compareStringsCaseSensitive : compareStringsCaseInsensitive,
                    watchDirectory,
                    realpath: s => this.realpath(s)
                });
            }
            else if (tscWatchDirectory === Tsc_WatchDirectory.DynamicPolling) {
                const watchFile = createDynamicPriorityPollingWatchFile(this);
                const watchDirectory: HostWatchDirectory = (directory, cb) => watchFile(directory, () => cb(directory), PollingInterval.Medium);
                this.customRecursiveWatchDirectory = createRecursiveDirectoryWatcher({
                    directoryExists: path => this.directoryExists(path),
                    getAccessibleSortedChildDirectories: path => this.getDirectories(path),
                    filePathComparer: this.useCaseSensitiveFileNames ? compareStringsCaseSensitive : compareStringsCaseInsensitive,
                    watchDirectory,
                    realpath: s => this.realpath(s)
                });
            }
        }

        getNewLine() {
            return this.newLine;
        }

        toNormalizedAbsolutePath(s: string) {
            return getNormalizedAbsolutePath(s, this.currentDirectory);
        }

        toFullPath(s: string) {
            return this.toPath(this.toNormalizedAbsolutePath(s));
        }

        getHostSpecificPath(s: string) {
            if (this.useWindowsStylePath && s.startsWith(directorySeparator)) {
                return "c:/" + s.substring(1);
            }
            return s;
        }

        private now() {
            this.time += timeIncrements;
            return new Date(this.time);
        }

        reloadFS(fileOrFolderOrSymLinkList: ReadonlyArray<FileOrFolderOrSymLink>, options?: Partial<ReloadWatchInvokeOptions>) {
            const mapNewLeaves = createMap<true>();
            const isNewFs = this.fs.size === 0;
            fileOrFolderOrSymLinkList = fileOrFolderOrSymLinkList.concat(this.withSafeList ? safeList : []);
            const filesOrFoldersToLoad: ReadonlyArray<FileOrFolderOrSymLink> = !this.useWindowsStylePath ? fileOrFolderOrSymLinkList :
                fileOrFolderOrSymLinkList.map<FileOrFolderOrSymLink>(f => {
                    const result = clone(f);
                    result.path = this.getHostSpecificPath(f.path);
                    return result;
                });
            for (const fileOrDirectory of filesOrFoldersToLoad) {
                const path = this.toFullPath(fileOrDirectory.path);
                mapNewLeaves.set(path, true);
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
                        }
                    }
                }
                else {
                    this.ensureFileOrFolder(fileOrDirectory, options && options.ignoreWatchInvokedWithTriggerAsFileCreate);
                }
            }

            if (!isNewFs) {
                this.fs.forEach((fileOrDirectory, path) => {
                    // If this entry is not from the new file or folder
                    if (!mapNewLeaves.get(path)) {
                        // Leaf entries that arent in new list => remove these
                        if (isFsFile(fileOrDirectory) || isFsSymLink(fileOrDirectory) || isFsFolder(fileOrDirectory) && fileOrDirectory.entries.length === 0) {
                            this.removeFileOrFolder(fileOrDirectory, folder => !mapNewLeaves.get(folder.path));
                        }
                    }
                });
            }
        }

        modifyFile(filePath: string, content: string, options?: Partial<ReloadWatchInvokeOptions>) {
            const path = this.toFullPath(filePath);
            const currentEntry = this.fs.get(path);
            if (!currentEntry || !isFsFile(currentEntry)) {
                throw new Error(`file not present: ${filePath}`);
            }

            if (options && options.invokeFileDeleteCreateAsPartInsteadOfChange) {
                this.removeFileOrFolder(currentEntry, returnFalse);
                this.ensureFileOrFolder({ path: filePath, content });
            }
            else {
                currentEntry.content = content;
                currentEntry.modifiedTime = this.now();
                this.fs.get(getDirectoryPath(currentEntry.path)).modifiedTime = this.now();
                if (options && options.invokeDirectoryWatcherInsteadOfFileChanged) {
                    this.invokeDirectoryWatcher(getDirectoryPath(currentEntry.fullPath), currentEntry.fullPath);
                }
                else {
                    this.invokeFileWatcher(currentEntry.fullPath, FileWatcherEventKind.Changed);
                }
            }
        }

        renameFolder(folderName: string, newFolderName: string) {
            const fullPath = getNormalizedAbsolutePath(folderName, this.currentDirectory);
            const path = this.toPath(fullPath);
            const folder = this.fs.get(path) as FsFolder;
            Debug.assert(!!folder);

            // Only remove the folder
            this.removeFileOrFolder(folder, returnFalse, /*isRenaming*/ true);

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
                this.invokeFileWatcher(entry.fullPath, FileWatcherEventKind.Deleted);

                entry.fullPath = combinePaths(newFolder.fullPath, getBaseFileName(entry.fullPath));
                entry.path = this.toPath(entry.fullPath);
                if (newFolder !== oldFolder) {
                    newFolder.entries.push(entry);
                }
                this.fs.set(entry.path, entry);
                this.invokeFileWatcher(entry.fullPath, FileWatcherEventKind.Created);
                if (isFsFolder(entry)) {
                    this.renameFolderEntries(entry, entry);
                }
            }
        }

        ensureFileOrFolder(fileOrDirectoryOrSymLink: FileOrFolderOrSymLink, ignoreWatchInvokedWithTriggerAsFileCreate?: boolean) {
            if (isFile(fileOrDirectoryOrSymLink)) {
                const file = this.toFsFile(fileOrDirectoryOrSymLink);
                // file may already exist when updating existing type declaration file
                if (!this.fs.get(file.path)) {
                    const baseFolder = this.ensureFolder(getDirectoryPath(file.fullPath));
                    this.addFileOrFolderInFolder(baseFolder, file, ignoreWatchInvokedWithTriggerAsFileCreate);
                }
            }
            else if (isSymLink(fileOrDirectoryOrSymLink)) {
                const symLink = this.toFsSymLink(fileOrDirectoryOrSymLink);
                Debug.assert(!this.fs.get(symLink.path));
                const baseFolder = this.ensureFolder(getDirectoryPath(symLink.fullPath));
                this.addFileOrFolderInFolder(baseFolder, symLink, ignoreWatchInvokedWithTriggerAsFileCreate);
            }
            else {
                const fullPath = getNormalizedAbsolutePath(fileOrDirectoryOrSymLink.path, this.currentDirectory);
                this.ensureFolder(fullPath);
            }
        }

        private ensureFolder(fullPath: string): FsFolder {
            const path = this.toPath(fullPath);
            let folder = this.fs.get(path) as FsFolder;
            if (!folder) {
                folder = this.toFsFolder(fullPath);
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
            Debug.assert(isFsFolder(folder));
            return folder;
        }

        private addFileOrFolderInFolder(folder: FsFolder, fileOrDirectory: FsFile | FsFolder | FsSymLink, ignoreWatch?: boolean) {
            insertSorted(folder.entries, fileOrDirectory, (a, b) => compareStringsCaseSensitive(getBaseFileName(a.path), getBaseFileName(b.path)));
            folder.modifiedTime = this.now();
            this.fs.set(fileOrDirectory.path, fileOrDirectory);

            if (ignoreWatch) {
                return;
            }
            this.invokeFileWatcher(fileOrDirectory.fullPath, FileWatcherEventKind.Created);
            this.invokeDirectoryWatcher(folder.fullPath, fileOrDirectory.fullPath);
        }

        private removeFileOrFolder(fileOrDirectory: FsFile | FsFolder | FsSymLink, isRemovableLeafFolder: (folder: FsFolder) => boolean, isRenaming?: boolean) {
            const basePath = getDirectoryPath(fileOrDirectory.path);
            const baseFolder = this.fs.get(basePath) as FsFolder;
            if (basePath !== fileOrDirectory.path) {
                Debug.assert(!!baseFolder);
                baseFolder.modifiedTime = this.now();
                filterMutate(baseFolder.entries, entry => entry !== fileOrDirectory);
            }
            this.fs.delete(fileOrDirectory.path);

            this.invokeFileWatcher(fileOrDirectory.fullPath, FileWatcherEventKind.Deleted);
            if (isFsFolder(fileOrDirectory)) {
                Debug.assert(fileOrDirectory.entries.length === 0 || isRenaming);
                const relativePath = this.getRelativePathToDirectory(fileOrDirectory.fullPath, fileOrDirectory.fullPath);
                // Invoke directory and recursive directory watcher for the folder
                // Here we arent invoking recursive directory watchers for the base folders
                // since that is something we would want to do for both file as well as folder we are deleting
                this.invokeWatchedDirectoriesCallback(fileOrDirectory.fullPath, relativePath);
                this.invokeWatchedDirectoriesRecursiveCallback(fileOrDirectory.fullPath, relativePath);
            }

            if (basePath !== fileOrDirectory.path) {
                if (baseFolder.entries.length === 0 && isRemovableLeafFolder(baseFolder)) {
                    this.removeFileOrFolder(baseFolder, isRemovableLeafFolder);
                }
                else {
                    this.invokeRecursiveDirectoryWatcher(baseFolder.fullPath, fileOrDirectory.fullPath);
                }
            }
        }

        removeFolder(folderPath: string, recursive?: boolean) {
            const path = this.toFullPath(folderPath);
            const currentEntry = this.fs.get(path) as FsFolder;
            Debug.assert(isFsFolder(currentEntry));
            if (recursive && currentEntry.entries.length) {
                const subEntries = currentEntry.entries.slice();
                subEntries.forEach(fsEntry => {
                    if (isFsFolder(fsEntry)) {
                        this.removeFolder(fsEntry.fullPath, recursive);
                    }
                    else {
                        this.removeFileOrFolder(fsEntry, returnFalse);
                    }
                });
            }
            this.removeFileOrFolder(currentEntry, returnFalse);
        }

        // For overriding the methods
        invokeWatchedDirectoriesCallback(folderFullPath: string, relativePath: string) {
            invokeWatcherCallbacks(this.watchedDirectories.get(this.toPath(folderFullPath)), cb => this.directoryCallback(cb, relativePath));
        }

        invokeWatchedDirectoriesRecursiveCallback(folderFullPath: string, relativePath: string) {
            invokeWatcherCallbacks(this.watchedDirectoriesRecursive.get(this.toPath(folderFullPath)), cb => this.directoryCallback(cb, relativePath));
        }

        invokeFileWatcher(fileFullPath: string, eventKind: FileWatcherEventKind, useFileNameInCallback?: boolean) {
            invokeWatcherCallbacks(this.watchedFiles.get(this.toPath(fileFullPath)), ({ cb, fileName }) => cb(useFileNameInCallback ? fileName : fileFullPath, eventKind));
        }

        private getRelativePathToDirectory(directoryFullPath: string, fileFullPath: string) {
            return getRelativePathToDirectoryOrUrl(directoryFullPath, fileFullPath, this.currentDirectory, this.getCanonicalFileName, /*isAbsolutePathAnUrl*/ false);
        }

        /**
         * This will call the directory watcher for the folderFullPath and recursive directory watchers for this and base folders
         */
        private invokeDirectoryWatcher(folderFullPath: string, fileName: string) {
            const relativePath = this.getRelativePathToDirectory(folderFullPath, fileName);
            // Folder is changed when the directory watcher is invoked
            this.invokeFileWatcher(folderFullPath, FileWatcherEventKind.Changed, /*useFileNameInCallback*/ true);
            this.invokeWatchedDirectoriesCallback(folderFullPath, relativePath);
            this.invokeRecursiveDirectoryWatcher(folderFullPath, fileName);
        }

        private directoryCallback({ cb, directoryName }: TestDirectoryWatcher, relativePath: string) {
            cb(combinePaths(directoryName, relativePath));
        }

        /**
         * This will call the recursive directory watcher for this directory as well as all the base directories
         */
        private invokeRecursiveDirectoryWatcher(fullPath: string, fileName: string) {
            const relativePath = this.getRelativePathToDirectory(fullPath, fileName);
            this.invokeWatchedDirectoriesRecursiveCallback(fullPath, relativePath);
            const basePath = getDirectoryPath(fullPath);
            if (this.getCanonicalFileName(fullPath) !== this.getCanonicalFileName(basePath)) {
                this.invokeRecursiveDirectoryWatcher(basePath, fileName);
            }
        }

        private toFsEntry(path: string): FSEntryBase {
            const fullPath = getNormalizedAbsolutePath(path, this.currentDirectory);
            return {
                path: this.toPath(fullPath),
                fullPath,
                modifiedTime: this.now()
            };
        }

        private toFsFile(file: File): FsFile {
            const fsFile = this.toFsEntry(file.path) as FsFile;
            fsFile.content = file.content;
            fsFile.fileSize = file.fileSize;
            return fsFile;
        }

        private toFsSymLink(symLink: SymLink): FsSymLink {
            const fsSymLink = this.toFsEntry(symLink.path) as FsSymLink;
            fsSymLink.symLink = getNormalizedAbsolutePath(symLink.symLink, getDirectoryPath(fsSymLink.fullPath));
            return fsSymLink;
        }

        private toFsFolder(path: string): FsFolder {
            const fsFolder = this.toFsEntry(path) as FsFolder;
            fsFolder.entries = [] as SortedArray<FSEntry>;
            return fsFolder;
        }

        private getRealFsEntry<T extends FSEntry>(isFsEntry: (fsEntry: FSEntry) => fsEntry is T, path: Path, fsEntry = this.fs.get(path)): T | undefined {
            if (isFsEntry(fsEntry)) {
                return fsEntry;
            }

            if (isFsSymLink(fsEntry)) {
                return this.getRealFsEntry(isFsEntry, this.toPath(fsEntry.symLink));
            }

            if (fsEntry) {
                // This fs entry is something else
                return undefined;
            }

            const realpath = this.realpath(path);
            if (path !== realpath) {
                return this.getRealFsEntry(isFsEntry, this.toPath(realpath));
            }

            return undefined;
        }

        private isFsFile(fsEntry: FSEntry) {
            return !!this.getRealFile(fsEntry.path, fsEntry);
        }

        private getRealFile(path: Path, fsEntry?: FSEntry): FsFile | undefined {
            return this.getRealFsEntry(isFsFile, path, fsEntry);
        }

        private isFsFolder(fsEntry: FSEntry) {
            return !!this.getRealFolder(fsEntry.path, fsEntry);
        }

        private getRealFolder(path: Path, fsEntry = this.fs.get(path)): FsFolder | undefined {
            return this.getRealFsEntry(isFsFolder, path, fsEntry);
        }

        fileExists(s: string) {
            const path = this.toFullPath(s);
            return !!this.getRealFile(path);
        }

        getModifiedTime(s: string) {
            const path = this.toFullPath(s);
            const fsEntry = this.fs.get(path);
            return fsEntry && fsEntry.modifiedTime;
        }

        readFile(s: string): string {
            const fsEntry = this.getRealFile(this.toFullPath(s));
            return fsEntry ? fsEntry.content : undefined;
        }

        getFileSize(s: string) {
            const path = this.toFullPath(s);
            const entry = this.fs.get(path);
            if (isFsFile(entry)) {
                return entry.fileSize ? entry.fileSize : entry.content.length;
            }
            return undefined;
        }

        directoryExists(s: string) {
            const path = this.toFullPath(s);
            return !!this.getRealFolder(path);
        }

        getDirectories(s: string): string[] {
            const path = this.toFullPath(s);
            const folder = this.getRealFolder(path);
            if (folder) {
                return mapDefined(folder.entries, entry => this.isFsFolder(entry) ? getBaseFileName(entry.fullPath) : undefined);
            }
            Debug.fail(folder ? "getDirectories called on file" : "getDirectories called on missing folder");
            return [];
        }

        readDirectory(path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>, depth?: number): string[] {
            return matchFiles(path, extensions, exclude, include, this.useCaseSensitiveFileNames, this.getCurrentDirectory(), depth, (dir) => {
                const directories: string[] = [];
                const files: string[] = [];
                const folder = this.getRealFolder(this.toPath(dir));
                if (folder) {
                    folder.entries.forEach((entry) => {
                        if (this.isFsFolder(entry)) {
                            directories.push(getBaseFileName(entry.fullPath));
                        }
                        else if (this.isFsFile(entry)) {
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

        watchDirectory(directoryName: string, cb: DirectoryWatcherCallback, recursive: boolean): FileWatcher {
            if (recursive && this.customRecursiveWatchDirectory) {
                return this.customRecursiveWatchDirectory(directoryName, cb, /*recursive*/ true);
            }
            const path = this.toFullPath(directoryName);
            const map = recursive ? this.watchedDirectoriesRecursive : this.watchedDirectories;
            const callback: TestDirectoryWatcher = {
                cb,
                directoryName
            };
            map.add(path, callback);
            return {
                close: () => map.remove(path, callback)
            };
        }

        createHash(s: string): string {
            return Harness.mockHash(s);
        }

        createSHA256Hash(s: string): string {
            return sys.createSHA256Hash(s);
        }

        watchFile(fileName: string, cb: FileWatcherCallback, pollingInterval: number) {
            if (this.dynamicPriorityWatchFile) {
                return this.dynamicPriorityWatchFile(fileName, cb, pollingInterval);
            }

            const path = this.toFullPath(fileName);
            const callback: TestFileWatcher = { fileName, cb };
            this.watchedFiles.add(path, callback);
            return { close: () => this.watchedFiles.remove(path, callback) };
        }

        // TOOD: record and invoke callbacks to simulate timer events
        setTimeout(callback: TimeOutCallback, _time: number, ...args: any[]) {
            return this.timeoutCallbacks.register(callback, args);
        }

        getNextTimeoutId() {
            return this.timeoutCallbacks.getNextId();
        }

        clearTimeout(timeoutId: any): void {
            this.timeoutCallbacks.unregister(timeoutId);
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

        setImmediate(callback: TimeOutCallback, _time: number, ...args: any[]) {
            return this.immediateCallbacks.register(callback, args);
        }

        clearImmediate(timeoutId: any): void {
            this.immediateCallbacks.unregister(timeoutId);
        }

        createDirectory(directoryName: string): void {
            const folder = this.toFsFolder(directoryName);

            // base folder has to be present
            const base = getDirectoryPath(folder.path);
            const baseFolder = this.fs.get(base) as FsFolder;
            Debug.assert(isFsFolder(baseFolder));

            Debug.assert(!this.fs.get(folder.path));
            this.addFileOrFolderInFolder(baseFolder, folder);
        }

        writeFile(path: string, content: string): void {
            const file = this.toFsFile({ path, content });

            // base folder has to be present
            const base = getDirectoryPath(file.path);
            const folder = this.fs.get(base) as FsFolder;
            Debug.assert(isFsFolder(folder));

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
            this.screenClears.length = 0;
        }

        realpath(s: string): string {
            const fullPath = this.toNormalizedAbsolutePath(s);
            const path = this.toPath(fullPath);
            if (getDirectoryPath(path) === path) {
                // Root
                return s;
            }
            const dirFullPath = this.realpath(getDirectoryPath(fullPath));
            const realFullPath = combinePaths(dirFullPath, getBaseFileName(fullPath));
            const fsEntry = this.fs.get(this.toPath(realFullPath));
            if (isFsSymLink(fsEntry)) {
                return this.realpath(fsEntry.symLink);
            }

            return realFullPath;
        }

        readonly exitMessage = "System Exit";
        exitCode: number;
        readonly resolvePath = (s: string) => s;
        readonly getExecutingFilePath = () => this.executingFilePath;
        readonly getCurrentDirectory = () => this.currentDirectory;
        exit(exitCode?: number) {
            this.exitCode = exitCode;
            throw new Error(this.exitMessage);
        }
        getEnvironmentVariable(name: string) {
            return this.environmentVariables && this.environmentVariables.get(name);
        }
    }
}
