import * as Harness from "./_namespaces/Harness";
import {
    arrayFrom, arrayToMap, clear, clone, combinePaths, compareStringsCaseSensitive, createGetCanonicalFileName,
    createMultiMap, createSystemWatchFunctions, Debug, directorySeparator, ESMap, FileSystemEntryKind, FileWatcher,
    FileWatcherCallback, FileWatcherEventKind, filterMutate, forEach, FormatDiagnosticsHost, FsWatchCallback,
    FsWatchWorkerWatcher, generateDjb2Hash, getBaseFileName, getDirectoryPath, getNormalizedAbsolutePath,
    getRelativePathToDirectoryOrUrl, hasProperty, HostWatchDirectory, HostWatchFile, identity, insertSorted, isArray,
    isNumber, isString, Map, mapDefined, matchFiles, ModuleResolutionHost, MultiMap, noop,
    patchWriteFileEnsuringDirectory, Path, PollingInterval, ReadonlyESMap, RequireResult, Set, SortedArray, sys, toPath,
} from "./_namespaces/ts";
import { ServerHost } from "./_namespaces/ts.server";

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
    inodeWatching?: boolean;
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

export interface File {
    path: string;
    content: string;
    fileSize?: number;
}

export interface Folder {
    path: string;
}

export interface SymLink {
    /** Location of the symlink. */
    path: string;
    /** Relative path to the real file. */
    symLink: string;
}

export type FileOrFolderOrSymLink = File | Folder | SymLink;
export interface FileOrFolderOrSymLinkMap {
    [path: string]: string | Omit<FileOrFolderOrSymLink, "path">;
}
export function isFile(fileOrFolderOrSymLink: FileOrFolderOrSymLink): fileOrFolderOrSymLink is File {
    return isString((fileOrFolderOrSymLink as File).content);
}

export function isSymLink(fileOrFolderOrSymLink: FileOrFolderOrSymLink): fileOrFolderOrSymLink is SymLink {
    return isString((fileOrFolderOrSymLink as SymLink).symLink);
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

export type FSEntry = FsFile | FsFolder | FsSymLink;

function isFsFolder(s: FSEntry | undefined): s is FsFolder {
    return !!s && isArray((s as FsFolder).entries);
}

function isFsFile(s: FSEntry | undefined): s is FsFile {
    return !!s && isString((s as FsFile).content);
}

function isFsSymLink(s: FSEntry | undefined): s is FsSymLink {
    return !!s && isString((s as FsSymLink).symLink);
}

function invokeWatcherCallbacks<T>(callbacks: readonly T[] | undefined, invokeCallback: (cb: T) => void): void {
    if (callbacks) {
        // The array copy is made to ensure that even if one of the callback removes the callbacks,
        // we dont miss any callbacks following it
        const cbs = callbacks.slice();
        for (const cb of cbs) {
            invokeCallback(cb);
        }
    }
}

function createWatcher<T>(map: MultiMap<Path, T>, path: Path, callback: T): FileWatcher {
    map.add(path, callback);
    let closed = false;
    return {
        close: () => {
            Debug.assert(!closed);
            map.remove(path, callback);
            closed = true;
        }
    };
}

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
}

type TimeOutCallback = (...args: any[]) => void;

export interface TestFileWatcher {
    cb: FileWatcherCallback;
    pollingInterval: PollingInterval;
}

export interface TestFsWatcher {
    cb: FsWatchCallback;
    inode: number | undefined;
}

export interface WatchInvokeOptions {
    /** Invokes the directory watcher for the parent instead of the file changed */
    invokeDirectoryWatcherInsteadOfFileChanged: boolean;
    /** When new file is created, do not invoke watches for it */
    ignoreWatchInvokedWithTriggerAsFileCreate: boolean;
    /** Invoke the file delete, followed by create instead of file changed */
    invokeFileDeleteCreateAsPartInsteadOfChange: boolean;
    /** Dont invoke delete watches */
    ignoreDelete: boolean;
    /** Skip inode check on file or folder create*/
    skipInodeCheckOnCreate: boolean;
    /** When invoking rename event on fs watch, send event with file name suffixed with tilde */
    useTildeAsSuffixInRenameEventFileName: boolean;
}

export enum Tsc_WatchFile {
    DynamicPolling = "DynamicPriorityPolling",
}

export enum Tsc_WatchDirectory {
    WatchFile = "RecursiveDirectoryUsingFsWatchFile",
    NonRecursiveWatchDirectory = "RecursiveDirectoryUsingNonRecursiveWatchDirectory",
    DynamicPolling = "RecursiveDirectoryUsingDynamicPriorityPolling"
}

export const timeIncrements = 1000;
export interface TestServerHostOptions {
    useCaseSensitiveFileNames: boolean;
    executingFilePath: string;
    currentDirectory: string;
    newLine?: string;
    useWindowsStylePaths?: boolean;
    environmentVariables?: ESMap<string, string>;
}

export class TestServerHost implements ServerHost, FormatDiagnosticsHost, ModuleResolutionHost {
    args: string[] = [];

    private readonly output: string[] = [];

    private fs: ESMap<Path, FSEntry> = new Map();
    private time = timeIncrements;
    getCanonicalFileName: (s: string) => string;
    private toPath: (f: string) => Path;
    private timeoutCallbacks = new Callbacks(this);
    private immediateCallbacks = new Callbacks(this);
    readonly screenClears: number[] = [];

    readonly watchedFiles = createMultiMap<Path, TestFileWatcher>();
    readonly fsWatches = createMultiMap<Path, TestFsWatcher>();
    readonly fsWatchesRecursive = createMultiMap<Path, TestFsWatcher>();
    runWithFallbackPolling: boolean;
    public readonly useCaseSensitiveFileNames: boolean;
    public readonly newLine: string;
    public readonly windowsStyleRoot?: string;
    private readonly environmentVariables?: ESMap<string, string>;
    private readonly executingFilePath: string;
    private readonly currentDirectory: string;
    public require: ((initialPath: string, moduleName: string) => RequireResult) | undefined;
    public storeFilesChangingSignatureDuringEmit = true;
    watchFile: HostWatchFile;
    private inodeWatching: boolean | undefined;
    private readonly inodes?: ESMap<Path, number>;
    watchDirectory: HostWatchDirectory;
    constructor(
        fileOrFolderorSymLinkList: FileOrFolderOrSymLinkMap | readonly FileOrFolderOrSymLink[],
        {
            useCaseSensitiveFileNames, executingFilePath, currentDirectory,
            newLine, windowsStyleRoot, environmentVariables,
            runWithoutRecursiveWatches, runWithFallbackPolling,
            inodeWatching,
        }: TestServerHostCreationParameters = {}) {
        this.useCaseSensitiveFileNames = !!useCaseSensitiveFileNames;
        this.newLine = newLine || "\n";
        this.windowsStyleRoot = windowsStyleRoot;
        this.environmentVariables = environmentVariables;
        currentDirectory = currentDirectory || "/";
        this.getCanonicalFileName = createGetCanonicalFileName(!!useCaseSensitiveFileNames);
        this.toPath = s => toPath(s, currentDirectory, this.getCanonicalFileName);
        this.executingFilePath = this.getHostSpecificPath(executingFilePath || getExecutingFilePathFromLibFile());
        this.currentDirectory = this.getHostSpecificPath(currentDirectory);
        this.runWithFallbackPolling = !!runWithFallbackPolling;
        const tscWatchFile = this.environmentVariables && this.environmentVariables.get("TSC_WATCHFILE");
        const tscWatchDirectory = this.environmentVariables && this.environmentVariables.get("TSC_WATCHDIRECTORY");
        if (inodeWatching) {
            this.inodeWatching = true;
            this.inodes = new Map();
        }

        const { watchFile, watchDirectory } = createSystemWatchFunctions({
            // We dont have polling watch file
            // it is essentially fsWatch but lets get that separate from fsWatch and
            // into watchedFiles for easier testing
            pollingWatchFileWorker: this.watchFileWorker.bind(this),
            getModifiedTime: this.getModifiedTime.bind(this),
            setTimeout: this.setTimeout.bind(this),
            clearTimeout: this.clearTimeout.bind(this),
            fsWatchWorker: this.fsWatchWorker.bind(this),
            fileSystemEntryExists: this.fileSystemEntryExists.bind(this),
            useCaseSensitiveFileNames: this.useCaseSensitiveFileNames,
            getCurrentDirectory: this.getCurrentDirectory.bind(this),
            fsSupportsRecursiveFsWatch: tscWatchDirectory ? false : !runWithoutRecursiveWatches,
            getAccessibleSortedChildDirectories: path => this.getDirectories(path),
            realpath: this.realpath.bind(this),
            tscWatchFile,
            tscWatchDirectory,
            inodeWatching: !!this.inodeWatching,
            sysLog: s => this.write(s + this.newLine),
        });
        this.watchFile = watchFile;
        this.watchDirectory = watchDirectory;
        this.reloadFS(fileOrFolderorSymLinkList);
    }

    private nextInode = 0;
    private setInode(path: Path) {
        if (this.inodes) this.inodes.set(path, this.nextInode++);
    }

    // Output is pretty
    writeOutputIsTTY() {
        return true;
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
        if (this.windowsStyleRoot && s.startsWith(directorySeparator)) {
            return this.windowsStyleRoot + s.substring(1);
        }
        return s;
    }

    now() {
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

    modifyFile(filePath: string, content: string, options?: Partial<WatchInvokeOptions>) {
        const path = this.toFullPath(filePath);
        const currentEntry = this.fs.get(path);
        if (!currentEntry || !isFsFile(currentEntry)) {
            throw new Error(`file not present: ${filePath}`);
        }

        if (options && options.invokeFileDeleteCreateAsPartInsteadOfChange) {
            this.removeFileOrFolder(currentEntry, /*isRenaming*/ false, options);
            this.ensureFileOrFolder({ path: filePath, content }, /*ignoreWatchInvokedWithTriggerAsFileCreate*/ undefined, /*ignoreParentWatch*/ undefined, options);
        }
        else {
            currentEntry.content = content;
            currentEntry.modifiedTime = this.now();
            this.fs.get(getDirectoryPath(currentEntry.path))!.modifiedTime = this.now();
            if (options && options.invokeDirectoryWatcherInsteadOfFileChanged) {
                const directoryFullPath = getDirectoryPath(currentEntry.fullPath);
                this.invokeFileWatcher(directoryFullPath, FileWatcherEventKind.Changed, currentEntry.modifiedTime);
                this.invokeFsWatchesCallbacks(directoryFullPath, "rename", currentEntry.modifiedTime, currentEntry.fullPath, options.useTildeAsSuffixInRenameEventFileName);
                this.invokeRecursiveFsWatches(directoryFullPath, "rename", currentEntry.modifiedTime, currentEntry.fullPath, options.useTildeAsSuffixInRenameEventFileName);
            }
            else {
                this.invokeFileAndFsWatches(currentEntry.fullPath, FileWatcherEventKind.Changed, currentEntry.modifiedTime, options?.useTildeAsSuffixInRenameEventFileName);
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

    ensureFileOrFolder(fileOrDirectoryOrSymLink: FileOrFolderOrSymLink, ignoreWatchInvokedWithTriggerAsFileCreate?: boolean, ignoreParentWatch?: boolean, options?: Partial<WatchInvokeOptions>) {
        if (isFile(fileOrDirectoryOrSymLink)) {
            const file = this.toFsFile(fileOrDirectoryOrSymLink);
            // file may already exist when updating existing type declaration file
            if (!this.fs.get(file.path)) {
                const baseFolder = this.ensureFolder(getDirectoryPath(file.fullPath), ignoreParentWatch, options);
                this.addFileOrFolderInFolder(baseFolder, file, ignoreWatchInvokedWithTriggerAsFileCreate, options);
            }
        }
        else if (isSymLink(fileOrDirectoryOrSymLink)) {
            const symLink = this.toFsSymLink(fileOrDirectoryOrSymLink);
            Debug.assert(!this.fs.get(symLink.path));
            const baseFolder = this.ensureFolder(getDirectoryPath(symLink.fullPath), ignoreParentWatch, options);
            this.addFileOrFolderInFolder(baseFolder, symLink, ignoreWatchInvokedWithTriggerAsFileCreate, options);
        }
        else {
            const fullPath = getNormalizedAbsolutePath(fileOrDirectoryOrSymLink.path, this.currentDirectory);
            this.ensureFolder(getDirectoryPath(fullPath), ignoreParentWatch, options);
            this.ensureFolder(fullPath, ignoreWatchInvokedWithTriggerAsFileCreate, options);
        }
    }

    private ensureFolder(fullPath: string, ignoreWatch: boolean | undefined, options: Partial<WatchInvokeOptions> | undefined): FsFolder {
        const path = this.toPath(fullPath);
        let folder = this.fs.get(path) as FsFolder;
        if (!folder) {
            folder = this.toFsFolder(fullPath);
            const baseFullPath = getDirectoryPath(fullPath);
            if (fullPath !== baseFullPath) {
                // Add folder in the base folder
                const baseFolder = this.ensureFolder(baseFullPath, ignoreWatch, options);
                this.addFileOrFolderInFolder(baseFolder, folder, ignoreWatch, options);
            }
            else {
                // root folder
                Debug.assert(this.fs.size === 0 || !!this.windowsStyleRoot);
                this.fs.set(path, folder);
                this.setInode(path);
            }
        }
        Debug.assert(isFsFolder(folder));
        return folder;
    }

    private addFileOrFolderInFolder(folder: FsFolder, fileOrDirectory: FsFile | FsFolder | FsSymLink, ignoreWatch?: boolean, options?: Partial<WatchInvokeOptions>) {
        if (!this.fs.has(fileOrDirectory.path)) {
            insertSorted(folder.entries, fileOrDirectory, (a, b) => compareStringsCaseSensitive(getBaseFileName(a.path), getBaseFileName(b.path)));
        }
        folder.modifiedTime = this.now();
        this.fs.set(fileOrDirectory.path, fileOrDirectory);
        this.setInode(fileOrDirectory.path);

        if (ignoreWatch) {
            return;
        }
        const inodeWatching = this.inodeWatching;
        if (options?.skipInodeCheckOnCreate) this.inodeWatching = false;
        this.invokeFileAndFsWatches(fileOrDirectory.fullPath, FileWatcherEventKind.Created, fileOrDirectory.modifiedTime, options?.useTildeAsSuffixInRenameEventFileName);
        this.invokeFileAndFsWatches(folder.fullPath, FileWatcherEventKind.Changed, fileOrDirectory.modifiedTime, options?.useTildeAsSuffixInRenameEventFileName);
        this.inodeWatching = inodeWatching;
    }

    private removeFileOrFolder(fileOrDirectory: FsFile | FsFolder | FsSymLink, isRenaming?: boolean, options?: Partial<WatchInvokeOptions>) {
        const basePath = getDirectoryPath(fileOrDirectory.path);
        const baseFolder = this.fs.get(basePath) as FsFolder;
        if (basePath !== fileOrDirectory.path) {
            Debug.assert(!!baseFolder);
            baseFolder.modifiedTime = this.now();
            filterMutate(baseFolder.entries, entry => entry !== fileOrDirectory);
        }
        this.fs.delete(fileOrDirectory.path);

        if (isFsFolder(fileOrDirectory)) {
            Debug.assert(fileOrDirectory.entries.length === 0 || isRenaming);
        }
        if (!options?.ignoreDelete) this.invokeFileAndFsWatches(fileOrDirectory.fullPath, FileWatcherEventKind.Deleted, /*modifiedTime*/ undefined, options?.useTildeAsSuffixInRenameEventFileName);
        this.inodes?.delete(fileOrDirectory.path);
        if (!options?.ignoreDelete) this.invokeFileAndFsWatches(baseFolder.fullPath, FileWatcherEventKind.Changed, baseFolder.modifiedTime, options?.useTildeAsSuffixInRenameEventFileName);
    }

    deleteFile(filePath: string) {
        const path = this.toFullPath(filePath);
        const currentEntry = this.fs.get(path) as FsFile;
        Debug.assert(isFsFile(currentEntry));
        this.removeFileOrFolder(currentEntry);
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

    private watchFileWorker(fileName: string, cb: FileWatcherCallback, pollingInterval: PollingInterval) {
        return createWatcher(
            this.watchedFiles,
            this.toFullPath(fileName),
            { cb, pollingInterval }
        );
    }

    private fsWatchWorker(
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
                cb,
                inode: this.inodes?.get(path)
            }
        ) as FsWatchWorkerWatcher;
        result.on = noop;
        return result;
    }

    invokeFileWatcher(fileFullPath: string, eventKind: FileWatcherEventKind, modifiedTime: Date | undefined) {
        invokeWatcherCallbacks(this.watchedFiles.get(this.toPath(fileFullPath)), ({ cb }) => cb(fileFullPath, eventKind, modifiedTime));
    }

    private fsWatchCallback(map: MultiMap<Path, TestFsWatcher>, fullPath: string, eventName: "rename" | "change", modifiedTime: Date | undefined, entryFullPath: string | undefined, useTildeSuffix: boolean | undefined) {
        const path = this.toPath(fullPath);
        const currentInode = this.inodes?.get(path);
        invokeWatcherCallbacks(map.get(path), ({ cb, inode }) => {
            // TODO::
            if (this.inodeWatching && inode !== undefined && inode !== currentInode) return;
            let relativeFileName = (entryFullPath ? this.getRelativePathToDirectory(fullPath, entryFullPath) : "");
            if (useTildeSuffix) relativeFileName = (relativeFileName ? relativeFileName : getBaseFileName(fullPath)) + "~";
            cb(eventName, relativeFileName, modifiedTime);
        });
    }

    invokeFsWatchesCallbacks(fullPath: string, eventName: "rename" | "change", modifiedTime?: Date, entryFullPath?: string, useTildeSuffix?: boolean) {
        this.fsWatchCallback(this.fsWatches, fullPath, eventName, modifiedTime, entryFullPath, useTildeSuffix);
    }

    invokeFsWatchesRecursiveCallbacks(fullPath: string, eventName: "rename" | "change", modifiedTime?: Date, entryFullPath?: string, useTildeSuffix?: boolean) {
        this.fsWatchCallback(this.fsWatchesRecursive, fullPath, eventName, modifiedTime, entryFullPath, useTildeSuffix);
    }

    private getRelativePathToDirectory(directoryFullPath: string, fileFullPath: string) {
        return getRelativePathToDirectoryOrUrl(directoryFullPath, fileFullPath, this.currentDirectory, this.getCanonicalFileName, /*isAbsolutePathAnUrl*/ false);
    }

    private invokeRecursiveFsWatches(fullPath: string, eventName: "rename" | "change", modifiedTime?: Date, entryFullPath?: string, useTildeSuffix?: boolean) {
        this.invokeFsWatchesRecursiveCallbacks(fullPath, eventName, modifiedTime, entryFullPath, useTildeSuffix);
        const basePath = getDirectoryPath(fullPath);
        if (this.getCanonicalFileName(fullPath) !== this.getCanonicalFileName(basePath)) {
            this.invokeRecursiveFsWatches(basePath, eventName, modifiedTime, entryFullPath || fullPath, useTildeSuffix);
        }
    }

    private invokeFsWatches(fullPath: string, eventName: "rename" | "change", modifiedTime: Date | undefined, useTildeSuffix: boolean | undefined) {
        this.invokeFsWatchesCallbacks(fullPath, eventName, modifiedTime, fullPath, useTildeSuffix);
        this.invokeFsWatchesCallbacks(getDirectoryPath(fullPath), eventName, modifiedTime, fullPath, useTildeSuffix);
        this.invokeRecursiveFsWatches(fullPath, eventName, modifiedTime, /*entryFullPath*/ undefined, useTildeSuffix);
    }

    private invokeFileAndFsWatches(fileOrFolderFullPath: string, eventKind: FileWatcherEventKind, modifiedTime?: Date, useTildeSuffix?: boolean) {
        this.invokeFileWatcher(fileOrFolderFullPath, eventKind, modifiedTime);
        this.invokeFsWatches(fileOrFolderFullPath, eventKind === FileWatcherEventKind.Changed ? "change" : "rename", modifiedTime, useTildeSuffix);
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
        fsFolder.entries = [] as FSEntry[] as SortedArray<FSEntry>; // https://github.com/Microsoft/TypeScript/issues/19873
        return fsFolder;
    }

    private getRealFsEntry<T extends FSEntry>(isFsEntry: (fsEntry: FSEntry) => fsEntry is T, path: Path, fsEntry = this.fs.get(path)!): T | undefined {
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

        const realpath = this.toPath(this.realpath(path));
        if (path !== realpath) {
            return this.getRealFsEntry(isFsEntry, realpath);
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

    fileSystemEntryExists(s: string, entryKind: FileSystemEntryKind) {
        return entryKind === FileSystemEntryKind.File ? this.fileExists(s) : this.directoryExists(s);
    }

    fileExists(s: string) {
        const path = this.toFullPath(s);
        return !!this.getRealFile(path);
    }

    getModifiedTime(s: string) {
        const path = this.toFullPath(s);
        const fsEntry = this.fs.get(path);
        return (fsEntry && fsEntry.modifiedTime)!; // TODO: GH#18217
    }

    setModifiedTime(s: string, date: Date) {
        const path = this.toFullPath(s);
        const fsEntry = this.fs.get(path);
        if (fsEntry) {
            fsEntry.modifiedTime = date;
            this.invokeFileAndFsWatches(fsEntry.fullPath, FileWatcherEventKind.Changed, fsEntry.modifiedTime);
        }
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

    readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[] {
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
        }, path => this.realpath(path));
    }

    createHash(s: string): string {
        return `${generateDjb2Hash(s)}-${s}`;
    }

    createSHA256Hash(s: string): string {
        return sys.createSHA256Hash!(s);
    }

    // TOOD: record and invoke callbacks to simulate timer events
    setTimeout(callback: TimeOutCallback, ms: number, ...args: any[]) {
        return this.timeoutCallbacks.register(callback, args, ms);
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

    setImmediate(callback: TimeOutCallback, ...args: any[]) {
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
        const folder = Debug.checkDefined(this.getRealFolder(base));

        if (folder.path === base) {
            if (!this.fs.has(file.path)) {
                this.addFileOrFolderInFolder(folder, file);
            }
            else {
                this.modifyFile(path, content);
            }
        }
        else {
            this.writeFile(this.realpath(path), content);
        }
    }

    prependFile(path: string, content: string, options?: Partial<WatchInvokeOptions>): void {
        this.modifyFile(path, content + this.readFile(path), options);
    }

    appendFile(path: string, content: string, options?: Partial<WatchInvokeOptions>): void {
        this.modifyFile(path, this.readFile(path) + content, options);
    }

    write(message: string) {
        if (Debug.isDebugging) console.log(message);
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
    diff(baseline: string[], base: ESMap<Path, FSEntry> = new Map()) {
        this.fs.forEach((newFsEntry, path) => {
            diffFsEntry(baseline, base.get(path), newFsEntry, this.inodes?.get(path), this.writtenFiles);
        });
        base.forEach((oldFsEntry, path) => {
            const newFsEntry = this.fs.get(path);
            if (!newFsEntry) {
                diffFsEntry(baseline, oldFsEntry, newFsEntry, this.inodes?.get(path), this.writtenFiles);
            }
        });
        baseline.push("");
    }

    serializeWatches(baseline: string[] = []) {
        serializeMultiMap(baseline, "PolledWatches", this.watchedFiles);
        baseline.push("");
        serializeMultiMap(baseline, "FsWatches", this.fsWatches);
        baseline.push("");
        serializeMultiMap(baseline, "FsWatchesRecursive", this.fsWatchesRecursive);
        baseline.push("");
        return baseline;
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
        const fsEntry = this.fs.get(this.toPath(realFullPath))!;
        if (isFsSymLink(fsEntry)) {
            return this.realpath(fsEntry.symLink);
        }

        // realpath supports non-existent files, so there may not be an fsEntry
        return fsEntry?.fullPath || realFullPath;
    }

    readonly exitMessage = "System Exit";
    exitCode: number | undefined;
    readonly resolvePath = (s: string) => s;
    readonly getExecutingFilePath = () => this.executingFilePath;
    readonly getCurrentDirectory = () => this.currentDirectory;
    exit(exitCode?: number) {
        this.exitCode = exitCode;
        throw new Error(this.exitMessage);
    }
    getEnvironmentVariable(name: string) {
        return this.environmentVariables && this.environmentVariables.get(name) || "";
    }
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

function serializeMultiMap<T>(baseline: string[], caption: string, multiMap: MultiMap<string, T>) {
    baseline.push(`${caption}::`);
    multiMap.forEach((values, key) => {
        baseline.push(`${key}:`);
        for (const value of values) {
            baseline.push(`  ${JSON.stringify(value)}`);
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
