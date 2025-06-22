import {
    harnessSessionCurrentDirectory,
    harnessTypingInstallerCacheLocation,
} from "../../../harness/harnessLanguageService.js";
import { replaceAll } from "../../../harness/tsserverLogger.js";
import {
    createWatchUtils,
    ensureWatchablePath,
    Watches,
    WatchUtils,
} from "../../../harness/watchUtils.js";
import {
    CreateDirectoryWatcherEventBody,
    CreateFileWatcherEventBody,
} from "../../../server/protocol.js";
import {
    append,
    arrayFrom,
    clear,
    clone,
    combinePaths,
    compareStringsCaseSensitive,
    createGetCanonicalFileName,
    createSystemWatchFunctions,
    Debug,
    directorySeparator,
    emptyArray,
    FileSystemEntryKind,
    FileWatcherCallback,
    FileWatcherEventKind,
    filterMutate,
    FormatDiagnosticsHost,
    FsWatchCallback,
    FsWatchWorkerWatcher,
    generateDjb2Hash,
    getBaseFileName,
    getDirectoryPath,
    getNormalizedAbsolutePath,
    getRelativePathToDirectoryOrUrl,
    hasProperty,
    HostWatchDirectory,
    HostWatchFile,
    insertSorted,
    isArray,
    isString,
    libMap,
    mapDefined,
    matchFiles,
    ModuleImportResult,
    ModuleResolutionHost,
    noop,
    patchWriteFileEnsuringDirectory,
    Path,
    PollingInterval,
    server,
    SortedArray,
    sys,
    targetToLibMap,
    toPath,
} from "../../_namespaces/ts.js";
import { typingsInstaller } from "../../_namespaces/ts.server.js";
import { timeIncrements } from "../../_namespaces/vfs.js";
import { jsonToReadableText } from "../helpers.js";
import {
    getPathForTypeScriptTestLocation,
    tscTypeScriptTestLocation,
} from "./contents.js";
import {
    createTypesRegistryFileContent,
    getTypesRegistryFileLocation,
} from "./typingsInstaller.js";

export const libFile: File = {
    path: getPathForTypeScriptTestLocation("lib.d.ts"),
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
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };`,
};

export const enum TestServerHostOsFlavor {
    Windows,
    MacOs,
    Linux,
}

export interface TestServerHostCreationParameters {
    useCaseSensitiveFileNames?: boolean;
    executingFilePath?: string;
    currentDirectory?: string;
    newLine?: string;
    windowsStyleRoot?: string;
    environmentVariables?: Map<string, string>;
    runWithFallbackPolling?: boolean;
    osFlavor?: TestServerHostOsFlavor;
    typingsInstallerGlobalCacheLocation?: string;
    typingsInstallerTypesRegistry?: string | readonly string[];
}

export interface WatchableExempt {
    /** Add this field to true only if its the interesting scenario about what to watch  */
    watchableExempt?: boolean;
}

export interface File extends WatchableExempt {
    path: string;
    content: string;
    fileSize?: number;
}

export interface Folder extends WatchableExempt {
    path: string;
}

export interface SymLink extends WatchableExempt {
    /** Location of the symlink. */
    path: string;
    /** Relative path to the real file. */
    symLink: string;
}

export interface LibFile extends WatchableExempt {
    path: string;
    libFile: true;
}

export type FileOrFolderOrSymLink = File | Folder | SymLink;
export type FileOrFolderOrSymLinkOrLibFile = FileOrFolderOrSymLink | LibFile;
export interface FileOrFolderOrSymLinkMap {
    [path: string]: string | Omit<File, "path"> | Omit<SymLink, "path"> | undefined;
}
export function isFile(fileOrFolderOrSymLink: FileOrFolderOrSymLinkOrLibFile): fileOrFolderOrSymLink is File | LibFile {
    return isString((fileOrFolderOrSymLink as File).content) || (fileOrFolderOrSymLink as LibFile).libFile;
}

export function isSymLink(fileOrFolderOrSymLink: FileOrFolderOrSymLinkOrLibFile): fileOrFolderOrSymLink is SymLink {
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

interface FsLibFile extends FSEntryBase {
    content?: string;
    libFile: true;
}

interface FsFolder extends FSEntryBase {
    entries: SortedArray<FSEntry>;
}

interface FsSymLink extends FSEntryBase {
    symLink: string;
}

export type FSEntry = FsFile | FsFolder | FsSymLink | FsLibFile;
export type FSFileOrLibFile = FsFile | FsLibFile;

function isFsFolder(s: FSEntry | undefined): s is FsFolder {
    return !!s && isArray((s as FsFolder).entries);
}

function isFsFileOrFsLibFile(s: FSEntry | undefined) {
    return isFsFile(s) || isFsLibFile(s);
}

function isFsLibFile(s: FSEntry | undefined): s is FsLibFile {
    return !!s && (s as FsLibFile).libFile;
}

export function isFsFile(s: FSEntry | undefined): s is FsFile {
    return !!s && isString((s as FsFile).content);
}

function getFsFileOrLibFileContent(entry: FSFileOrLibFile) {
    return entry.content ?? (entry.content = libFile.content);
}

function isFsSymLink(s: FSEntry | undefined): s is FsSymLink {
    return !!s && isString((s as FsSymLink).symLink);
}

export interface StateLogger {
    log(s: string): void;
    logs: string[];
}

const exitMessage = "System Exit";
interface CallbackData {
    cb: TimeOutCallback;
    args: any[];
    ms: number | undefined;
    time: number;
}
class Callbacks {
    readonly map: Map<number, CallbackData> = new Map();
    private nextId = 1;
    invoke: (invokeKey?: number) => void = invokeKey => this.invokeWorker(invokeKey);
    private hasChanges = false;
    private serializedKeys = new Map<number, any>();

    constructor(private host: TestServerHost, readonly callbackType: string, private readonly swallowExitException?: boolean) {
    }

    getNextId(): number {
        return this.nextId;
    }

    register(cb: TimeOutCallback, args: any[], ms?: number): number {
        const timeoutId = this.nextId;
        this.nextId++;
        this.map.set(timeoutId, { cb, args, ms, time: this.host.getTime() });
        this.hasChanges = true;
        return timeoutId;
    }

    unregister(id: any): void {
        if (typeof id === "number") {
            this.hasChanges = this.map.delete(id) || this.hasChanges;
        }
    }

    log(logChanges?: boolean): string {
        const details: string[] = [];
        this.map.forEach(({ args }, timeoutId) => {
            details.push(`${timeoutId}: ${args[0]}${!logChanges || this.serializedKeys.has(timeoutId) ? "" : " *new*"}`);
            if (logChanges) this.serializedKeys.set(timeoutId, args[0]);
        });
        const deleted: string[] = [];
        if (logChanges && this.serializedKeys.size !== this.map.size) {
            this.serializedKeys.forEach((value, key) => {
                if (this.map.has(key)) return;
                deleted.push(`${key}: ${value} *deleted*`);
                this.serializedKeys.delete(key);
            });
        }
        return `${this.callbackType} callback:: count: ${this.map.size}` +
            (deleted.length ? "\r\n" + deleted.join("\r\n") : "") +
            (details.length ? "\r\n" + details.join("\r\n") : "");
    }

    private invokeCallback(timeoutId: number) {
        const data = this.map.get(timeoutId);
        if (!data) return;
        const { cb, args, ms, time } = data;
        this.map.delete(timeoutId);
        this.serializedKeys.delete(timeoutId);
        if (ms !== undefined) {
            const newTime = ms + time;
            if (this.host.getTime() < newTime) {
                this.host.setTime(newTime);
            }
        }
        cb(...args);
    }

    invokeWorker(invokeKey?: number): void {
        try {
            if (invokeKey) return this.invokeCallback(invokeKey);

            // Note: invoking a callback may result in new callbacks been queued,
            // so do not clear the entire callback list regardless. Only remove the
            // ones we have invoked.
            const keys = arrayFrom(this.map.keys());
            for (const key of keys) {
                this.invokeCallback(key);
            }
        }
        catch (e) {
            if (this.swallowExitException && e.message === exitMessage) {
                return;
            }
            throw e;
        }
    }

    switchToBaseliningInvoke(logger: StateLogger, serializeOutputOrder: SerializeOutputOrder): void {
        this.invoke = invokeKey => {
            logger.log(`Before running ${this.log()}`);
            this.host.serializeState(logger.logs, serializeOutputOrder);
            if (invokeKey !== undefined) logger.log(`Invoking ${this.callbackType} callback:: timeoutId:: ${invokeKey}:: ${this.map.get(invokeKey)!.args[0]}`);
            this.invokeWorker(invokeKey);
            logger.log(`After running ${this.callbackType} callback:: count: ${this.map.size}`);
            this.host.serializeState(logger.logs, serializeOutputOrder);
        };
    }

    serialize(baseline: string[]): void {
        if (this.hasChanges) {
            baseline.push(this.log(/*logChanges*/ true), "");
            this.hasChanges = false;
        }
    }
}

type TimeOutCallback = (...args: any[]) => void;

export interface TestFileWatcher {
    cb: FileWatcherCallback;
    pollingInterval: PollingInterval;
    event?: CreateFileWatcherEventBody;
}

export interface TestFsWatcher {
    cb: FsWatchCallback;
    inode: number | undefined;
    event?: CreateDirectoryWatcherEventBody;
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
    /** ignore all watches */
    ignoreWatches?: boolean;
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
    DynamicPolling = "RecursiveDirectoryUsingDynamicPriorityPolling",
}

export interface TestServerHostOptions {
    useCaseSensitiveFileNames: boolean;
    executingFilePath: string;
    currentDirectory: string;
    newLine?: string;
    useWindowsStylePaths?: boolean;
    environmentVariables?: Map<string, string>;
}

export type PendingInstallCallback = (
    pendingInstallInfo: string,
    installedTypingsOrSuccess: string[] | string | boolean,
    typingFiles: readonly File[],
    onRequestCompleted: typingsInstaller.RequestCompletedAction,
) => void;

export enum SerializeOutputOrder {
    None,
    BeforeDiff,
    AfterDiff,
}

export type TestServerHostSnapshot = Map<Path, FSEntry>;

export function cloneFsMap(fs: Map<Path, FSEntry>): TestServerHostSnapshot {
    const snap = new Map<Path, FSEntry>();
    const clonedMap = new Map<FSEntry, FSEntry>();
    const getCloned = (entry: FSEntry) => {
        const existing = clonedMap.get(entry);
        if (existing) return existing;
        const cloned = clone(entry);
        clonedMap.set(entry, cloned);
        if (isFsFolder(cloned)) {
            cloned.entries = cloned.entries.map(clone) as SortedArray<FSEntry>;
        }
        return cloned;
    };
    fs.forEach((value, key) => {
        snap.set(key, getCloned(value));
    });
    return snap;
}

export class TestServerHost implements server.ServerHost, FormatDiagnosticsHost, ModuleResolutionHost {
    args: string[] = [];

    private readonly output: string[] = [];

    private fs = new Map<Path, FSEntry>();
    private time = timeIncrements;
    getCanonicalFileName: (s: string) => string;
    toPath: (f: string) => Path;
    readonly timeoutCallbacks: Callbacks = new Callbacks(this, "Timeout", /*swallowExitException*/ true);
    readonly immediateCallbacks: Callbacks = new Callbacks(this, "Immedidate");
    readonly pendingInstalls: Callbacks = new Callbacks(this, "PendingInstalls");
    readonly screenClears: number[] = [];

    readonly watchUtils: WatchUtils<TestFileWatcher, TestFsWatcher>;
    runWithFallbackPolling: boolean;
    public readonly useCaseSensitiveFileNames: boolean;
    public readonly newLine: string;
    public readonly windowsStyleRoot?: string;
    private readonly environmentVariables?: Map<string, string>;
    private readonly executingFilePath: string;
    private readonly currentDirectory: string;
    require?: (initialPath: string, moduleName: string) => ModuleImportResult;
    importPlugin?: (root: string, moduleName: string) => Promise<ModuleImportResult>;
    public storeSignatureInfo = true;
    watchFile: HostWatchFile;
    private inodeWatching: boolean;
    private readonly inodes?: Map<Path, number>;
    watchDirectory: HostWatchDirectory;
    service?: server.ProjectService;
    osFlavor: TestServerHostOsFlavor;
    preferNonRecursiveWatch: boolean;
    globalTypingsCacheLocation: string;
    private readonly typesRegistry: string | readonly string[] | undefined;
    private constructor(
        fileOrFolderorSymLinkList: FileOrFolderOrSymLinkMap | readonly FileOrFolderOrSymLink[],
        {
            useCaseSensitiveFileNames,
            executingFilePath,
            currentDirectory,
            newLine,
            windowsStyleRoot,
            environmentVariables,
            runWithFallbackPolling,
            osFlavor,
            typingsInstallerGlobalCacheLocation,
            typingsInstallerTypesRegistry,
        }: TestServerHostCreationParameters = {},
    ) {
        this.useCaseSensitiveFileNames = !!useCaseSensitiveFileNames;
        this.newLine = newLine || "\n";
        this.osFlavor = osFlavor || TestServerHostOsFlavor.Windows;
        this.windowsStyleRoot = windowsStyleRoot;
        this.environmentVariables = environmentVariables;
        this.currentDirectory = this.getHostSpecificPath(currentDirectory ?? harnessSessionCurrentDirectory);
        this.getCanonicalFileName = createGetCanonicalFileName(!!useCaseSensitiveFileNames);
        this.watchUtils = createWatchUtils("PolledWatches", "FsWatches", s => this.getCanonicalFileName(s), this);
        this.toPath = s => toPath(s, this.currentDirectory, this.getCanonicalFileName);
        this.executingFilePath = this.getHostSpecificPath(executingFilePath ?? tscTypeScriptTestLocation);
        this.runWithFallbackPolling = !!runWithFallbackPolling;
        const tscWatchFile = this.environmentVariables && this.environmentVariables.get("TSC_WATCHFILE");
        const tscWatchDirectory = this.environmentVariables && this.environmentVariables.get("TSC_WATCHDIRECTORY");
        this.preferNonRecursiveWatch = this.osFlavor === TestServerHostOsFlavor.Linux;
        this.inodeWatching = this.osFlavor !== TestServerHostOsFlavor.Windows;
        if (this.inodeWatching) this.inodes = new Map();

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
            fsSupportsRecursiveFsWatch: !this.preferNonRecursiveWatch,
            getAccessibleSortedChildDirectories: path => this.getDirectories(path),
            realpath: this.realpath.bind(this),
            tscWatchFile,
            tscWatchDirectory,
            inodeWatching: this.inodeWatching,
            fsWatchWithTimestamp: this.osFlavor === TestServerHostOsFlavor.MacOs,
            sysLog: s => this.write(s + this.newLine),
        });
        this.watchFile = watchFile;
        this.watchDirectory = watchDirectory;
        this.reloadFS(fileOrFolderorSymLinkList);

        // Ensure current directory exists
        this.ensureFileOrFolder({ path: this.currentDirectory });

        // Ensure libs
        this.ensureFileOrFolder({
            path: combinePaths(getDirectoryPath(this.executingFilePath), "lib.d.ts"),
            content: libFile.content,
        });
        targetToLibMap.forEach(libFile => this.ensureLib(libFile));
        libMap.forEach(libFile => this.ensureLib(libFile));

        // Ensure global cache location has required data
        this.globalTypingsCacheLocation = this.getHostSpecificPath(
            typingsInstallerGlobalCacheLocation ??
                harnessTypingInstallerCacheLocation,
        );
        this.typesRegistry = typingsInstallerTypesRegistry;
        if (this.directoryExists(this.globalTypingsCacheLocation)) {
            // Package.json
            const npmConfigPath = combinePaths(this.globalTypingsCacheLocation, "package.json");
            if (!this.fileExists(npmConfigPath)) {
                this.writeFile(npmConfigPath, '{ "private": true }');
            }
            // Typings registry
            this.ensureTypingRegistryFile();
        }
    }

    private ensureLib(path: string) {
        this.ensureFileOrFolder({
            path: combinePaths(getDirectoryPath(this.executingFilePath), path),
            libFile: true,
        });
    }

    ensureTypingRegistryFile(): void {
        this.ensureFileOrFolder({
            path: getTypesRegistryFileLocation(this.globalTypingsCacheLocation),
            content: jsonToReadableText(createTypesRegistryFileContent(
                this.typesRegistry ?
                    isString(this.typesRegistry) ?
                        [this.typesRegistry] :
                        this.typesRegistry :
                    emptyArray,
            )),
        });
    }

    static createWatchedSystem(
        fileOrFolderList: FileOrFolderOrSymLinkMap | readonly FileOrFolderOrSymLink[],
        params?: Omit<TestServerHostCreationParameters, "typingsInstallerGlobalCacheLocation" | "typingsInstallerTypesRegistry">,
    ): TestServerHost {
        const useDefaultCurrentDirectory = !params?.currentDirectory;
        if (useDefaultCurrentDirectory) (params ??= {}).currentDirectory = "/home/src/workspaces/project";
        else ensureWatchablePath(params!.currentDirectory!, `currentDirectory: ${params!.currentDirectory}`);
        const host = new TestServerHost(fileOrFolderList, params);
        if (useDefaultCurrentDirectory && fileOrFolderList !== emptyArray) {
            const folder = host.getRealFolder(host.toPath(host.currentDirectory))!;
            Debug.assert(
                folder.entries.length,
                `currentDirectory: Not specified, using default as "/home/src/workspaces/project". The files specified do not belong to it.`,
            );
        }
        return host;
    }

    static createServerHost(
        fileOrFolderList: FileOrFolderOrSymLinkMap | readonly FileOrFolderOrSymLink[],
        params?: Omit<TestServerHostCreationParameters, "currentDirectory"> & { overrideCurrentDirectory?: string; },
    ): TestServerHost {
        if ((params as TestServerHostCreationParameters)?.currentDirectory) (params as TestServerHostCreationParameters).currentDirectory = undefined;
        if (params) (params as TestServerHostCreationParameters).currentDirectory = params?.overrideCurrentDirectory;
        const host = new TestServerHost(fileOrFolderList, params);
        // Just like sys, patch the host to use writeFile
        patchWriteFileEnsuringDirectory(host);
        return host;
    }

    static getCreateWatchedSystem(forTsserver: boolean | undefined): typeof TestServerHost.createWatchedSystem | typeof TestServerHost.createServerHost {
        return (!forTsserver ? TestServerHost.createWatchedSystem : TestServerHost.createServerHost);
    }

    private nextInode = 0;
    private setInode(path: Path) {
        if (this.inodes) this.inodes.set(path, this.nextInode++);
    }

    // Output is pretty
    writeOutputIsTTY() {
        return true;
    }

    getNewLine(): string {
        return this.newLine;
    }

    toNormalizedAbsolutePath(s: string): string {
        return getNormalizedAbsolutePath(s, this.currentDirectory);
    }

    toFullPath(s: string): Path {
        return this.toPath(this.toNormalizedAbsolutePath(s));
    }

    getHostSpecificPath(s: string): string {
        if (this.windowsStyleRoot) {
            let result = s;
            if (s.startsWith(directorySeparator)) {
                result = this.windowsStyleRoot + s.substring(1);
            }
            if (!result.startsWith(directorySeparator)) result = replaceAll(result, directorySeparator, "\\");
            return result;
        }
        return s;
    }

    now(): Date {
        this.time += timeIncrements;
        return new Date(this.time);
    }

    getTime(): number {
        return this.time;
    }

    setTime(time: number): void {
        this.time = time;
    }

    switchToBaseliningInvoke(logger: StateLogger, serializeOutputOrder: SerializeOutputOrder): void {
        const originalSetTime = this.setTime;
        this.setTime = time => {
            logger.log(`Host is moving to new time`);
            return originalSetTime.call(this, time);
        };
        this.timeoutCallbacks.switchToBaseliningInvoke(logger, serializeOutputOrder);
        this.immediateCallbacks.switchToBaseliningInvoke(logger, serializeOutputOrder);
        this.pendingInstalls.switchToBaseliningInvoke(logger, serializeOutputOrder);
    }

    private ensureInitialFileOrFolder(f: FileOrFolderOrSymLink) {
        if (!f.watchableExempt) ensureWatchablePath(getDirectoryPath(f.path), `Directory path of FileOrFolderOrSymLink: ${f.path}`);
        this.ensureFileOrFolder(f);
    }

    private reloadFS(fileOrFolderOrSymLinkList: FileOrFolderOrSymLinkMap | readonly FileOrFolderOrSymLink[]) {
        Debug.assert(this.fs.size === 0);
        if (isArray(fileOrFolderOrSymLinkList)) {
            fileOrFolderOrSymLinkList.forEach(f =>
                this.ensureInitialFileOrFolder(
                    !this.windowsStyleRoot ?
                        f :
                        { ...f, path: this.getHostSpecificPath(f.path) },
                )
            );
        }
        else {
            for (const key in fileOrFolderOrSymLinkList) {
                if (hasProperty(fileOrFolderOrSymLinkList, key)) {
                    const path = this.getHostSpecificPath(key);
                    const value = fileOrFolderOrSymLinkList[key];
                    if (isString(value)) {
                        this.ensureInitialFileOrFolder({ path, content: value });
                    }
                    else {
                        this.ensureInitialFileOrFolder({ path, ...value });
                    }
                }
            }
        }
        // Ensure root folder exists
        this.ensureFileOrFolder({ path: !this.windowsStyleRoot ? "/" : this.getHostSpecificPath("/") });
    }

    modifyFile(filePath: string, content: string, options?: Partial<WatchInvokeOptions>): void {
        const path = this.toFullPath(filePath);
        const currentEntry = this.fs.get(path);
        if (!currentEntry || !isFsFileOrFsLibFile(currentEntry)) {
            throw new Error(`file not present: ${filePath}`);
        }

        if (isFsLibFile(currentEntry) || options?.invokeFileDeleteCreateAsPartInsteadOfChange) {
            this.removeFileOrFolder(currentEntry, /*isRenaming*/ false, options);
            this.ensureFileOrFolder({ path: filePath, content }, /*ignoreWatchInvokedWithTriggerAsFileCreate*/ undefined, /*ignoreParentWatch*/ undefined, options);
        }
        else {
            currentEntry.content = content;
            currentEntry.modifiedTime = this.now();
            if (options?.ignoreWatches) return;
            if (options && options.invokeDirectoryWatcherInsteadOfFileChanged) {
                const directoryFullPath = getDirectoryPath(currentEntry.fullPath);
                this.fs.get(getDirectoryPath(currentEntry.path))!.modifiedTime = this.now();
                this.invokeFileWatcher(directoryFullPath, FileWatcherEventKind.Changed, /*modifiedTime*/ undefined);
                this.invokeFsWatchesCallbacks(directoryFullPath, "rename", currentEntry.fullPath, options.useTildeAsSuffixInRenameEventFileName);
                this.invokeRecursiveFsWatches(directoryFullPath, "rename", currentEntry.fullPath, options.useTildeAsSuffixInRenameEventFileName);
            }
            else {
                this.invokeFileAndFsWatches(currentEntry.fullPath, FileWatcherEventKind.Changed, currentEntry.fullPath, currentEntry.modifiedTime, options?.useTildeAsSuffixInRenameEventFileName);
            }
        }
    }

    renameFile(fileName: string, newFileName: string): void {
        const fullPath = getNormalizedAbsolutePath(fileName, this.currentDirectory);
        const path = this.toPath(fullPath);
        const file = this.fs.get(path) as FsFile;
        Debug.assert(!!file);

        // Only remove the file
        this.removeFileOrFolder(file, /*isRenaming*/ true);

        // Add updated folder with new folder name
        const newFullPath = getNormalizedAbsolutePath(newFileName, this.currentDirectory);
        const newFile = this.toFsFileOrLibFile({ path: newFullPath, content: file.content });
        const newPath = newFile.path;
        const basePath = getDirectoryPath(newPath);
        Debug.assert(basePath !== path);
        this.ensureFileOrFolder({ path: getDirectoryPath(newFullPath) });
        const baseFolder = this.fs.get(basePath) as FsFolder;
        this.addFileOrFolderInFolder(baseFolder, newFile);
    }

    renameFolder(folderName: string, newFolderName: string, skipFolderEntryWatches?: true): void {
        const fullPath = getNormalizedAbsolutePath(folderName, this.currentDirectory);
        const path = this.toPath(fullPath);
        const folder = this.fs.get(path) as FsFolder;
        Debug.assert(!!folder);

        const newFullPath = getNormalizedAbsolutePath(newFolderName, this.currentDirectory);
        const newFolder = this.toFsFolder(newFullPath);

        // Invoke watches for files in the folder as deleted (from old path)
        this.renameFolderEntries(folder, newFolder, skipFolderEntryWatches);

        // Only remove the folder
        this.removeFileOrFolder(folder, /*isRenaming*/ true);

        // Add updated folder with new folder name
        const newPath = newFolder.path;
        const basePath = getDirectoryPath(newPath);
        this.ensureFileOrFolder({ path: getDirectoryPath(newFullPath) });
        const baseFolder = this.fs.get(basePath) as FsFolder;
        this.addFileOrFolderInFolder(baseFolder, newFolder);
    }

    private renameFolderEntries(oldFolder: FsFolder, newFolder: FsFolder, skipWatches: true | undefined) {
        for (const entry of oldFolder.entries) {
            this.fs.delete(entry.path);
            if (!skipWatches) this.invokeFileAndFsWatches(entry.fullPath, FileWatcherEventKind.Deleted, entry.fullPath);

            entry.fullPath = combinePaths(newFolder.fullPath, getBaseFileName(entry.fullPath));
            entry.path = this.toPath(entry.fullPath);
            if (newFolder !== oldFolder) {
                newFolder.entries.push(entry);
            }
            this.fs.set(entry.path, entry);
            this.setInode(entry.path);
            if (!skipWatches) this.invokeFileAndFsWatches(entry.fullPath, FileWatcherEventKind.Created, entry.fullPath);
            if (isFsFolder(entry)) {
                this.renameFolderEntries(entry, entry, skipWatches);
            }
        }
    }

    ensureFileOrFolder(fileOrDirectoryOrSymLink: FileOrFolderOrSymLinkOrLibFile, ignoreWatchInvokedWithTriggerAsFileCreate?: boolean, ignoreParentWatch?: boolean, options?: Partial<WatchInvokeOptions>): void {
        if (isFile(fileOrDirectoryOrSymLink)) {
            const file = this.toFsFileOrLibFile(fileOrDirectoryOrSymLink);
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

    private addFileOrFolderInFolder(folder: FsFolder, fileOrDirectory: FSEntry, ignoreWatch?: boolean, options?: Partial<WatchInvokeOptions>) {
        if (!this.fs.has(fileOrDirectory.path)) {
            insertSorted(folder.entries, fileOrDirectory, (a, b) => compareStringsCaseSensitive(getBaseFileName(a.path), getBaseFileName(b.path)));
        }
        folder.modifiedTime = this.now();
        this.fs.set(fileOrDirectory.path, fileOrDirectory);
        this.setInode(fileOrDirectory.path);

        if (ignoreWatch || options?.ignoreWatches) {
            return;
        }
        const inodeWatching = this.inodeWatching;
        if (options?.skipInodeCheckOnCreate) this.inodeWatching = false;
        this.invokeFileAndFsWatches(fileOrDirectory.fullPath, FileWatcherEventKind.Created, fileOrDirectory.fullPath, fileOrDirectory.modifiedTime, options?.useTildeAsSuffixInRenameEventFileName);
        if (this.osFlavor !== TestServerHostOsFlavor.MacOs) {
            this.invokeFileAndFsWatches(folder.fullPath, FileWatcherEventKind.Changed, fileOrDirectory.fullPath, folder.modifiedTime, options?.useTildeAsSuffixInRenameEventFileName);
            const folderOfFolder = getDirectoryPath(folder.fullPath);
            if (folderOfFolder !== folder.fullPath) {
                this.invokeFsWatches(folderOfFolder, "change", folder.fullPath, options?.useTildeAsSuffixInRenameEventFileName);
            }
        }
        this.inodeWatching = inodeWatching;
    }

    private removeFileOrFolder(fileOrDirectory: FSEntry, isRenaming?: boolean, options?: Partial<WatchInvokeOptions>) {
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
        if (!options?.ignoreDelete && !options?.ignoreWatches) this.invokeFileAndFsWatches(fileOrDirectory.fullPath, FileWatcherEventKind.Deleted, fileOrDirectory.fullPath, /*modifiedTime*/ undefined, options?.useTildeAsSuffixInRenameEventFileName);
        this.inodes?.delete(fileOrDirectory.path);
    }

    rimrafSync(fileOrFolderPath: string): void {
        const fileOrFolder = this.getRealFileOrFolder(fileOrFolderPath);
        if (isFsFileOrFsLibFile(fileOrFolder)) this.removeFileOrFolder(fileOrFolder);
        else if (isFsFolder(fileOrFolder)) this.deleteFolder(fileOrFolder.fullPath, /*recursive*/ true);
    }

    deleteFile(filePath: string): void {
        const file = this.getRealFileOrFolder(filePath);
        Debug.assert(isFsFileOrFsLibFile(file));
        this.removeFileOrFolder(file);
    }

    deleteFolder(folderPath: string, recursive?: boolean): void {
        const path = this.toFullPath(folderPath);
        const currentEntry = this.fs.get(path);
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
        return this.watchUtils.pollingWatch(
            this.toNormalizedAbsolutePath(fileName),
            { cb, pollingInterval },
        );
    }

    fsWatchWorker(
        fileOrDirectory: string,
        recursive: boolean,
        cb: FsWatchCallback,
    ): FsWatchWorkerWatcher {
        if (this.runWithFallbackPolling) throw new Error("Need to use fallback polling instead of file system native watching");
        let inode: number | undefined;
        if (this.inodeWatching) {
            const entry = this.getRealFileOrFolder(fileOrDirectory);
            // Error if the path does not exist
            if (!entry) throw new Error("Cannot watch missing file or folder");
            inode = this.inodes?.get(entry.path);
            if (inode === undefined) throw new Error("inode not found");
        }
        const result = this.watchUtils.fsWatch(
            this.toNormalizedAbsolutePath(fileOrDirectory),
            recursive,
            {
                cb,
                inode,
            },
        ) as FsWatchWorkerWatcher;
        result.on = noop;
        return result;
    }

    invokeFileWatcher(fileFullPath: string, eventKind: FileWatcherEventKind, modifiedTime: Date | undefined): void {
        this.watchUtils.pollingWatches.forEach(fileFullPath, ({ cb }, fullPath) => cb(fullPath, eventKind, modifiedTime));
    }

    private fsWatchCallback(watches: Watches<TestFsWatcher>, fullPath: string, eventName: "rename" | "change", eventFullPath: string | undefined, useTildeSuffix: boolean | undefined) {
        const path = this.toPath(fullPath);
        const currentInode = this.inodes?.get(path);
        watches.forEach(path, ({ cb, inode }) => {
            if (this.inodeWatching && inode !== undefined && inode !== currentInode) return;
            let relativeFileName = eventFullPath ? this.getRelativePathToDirectory(fullPath, eventFullPath) : "";
            if (useTildeSuffix) relativeFileName = (relativeFileName ? relativeFileName : getBaseFileName(fullPath)) + "~";
            cb(eventName, relativeFileName);
        });
    }

    invokeFsWatchesCallbacks(fullPath: string, eventName: "rename" | "change", eventFullPath: string | undefined, useTildeSuffix?: boolean): void {
        this.fsWatchCallback(this.watchUtils.fsWatches, fullPath, eventName, eventFullPath, useTildeSuffix);
    }

    invokeFsWatchesRecursiveCallbacks(fullPath: string, eventName: "rename" | "change", eventFullPath: string | undefined, useTildeSuffix?: boolean): void {
        this.fsWatchCallback(this.watchUtils.fsWatchesRecursive, fullPath, eventName, eventFullPath, useTildeSuffix);
    }

    private getRelativePathToDirectory(directoryFullPath: string, fileFullPath: string) {
        return getRelativePathToDirectoryOrUrl(directoryFullPath, fileFullPath, this.currentDirectory, this.getCanonicalFileName, /*isAbsolutePathAnUrl*/ false);
    }

    private invokeRecursiveFsWatches(fullPath: string, eventName: "rename" | "change", eventFullPath: string | undefined, useTildeSuffix?: boolean) {
        this.invokeFsWatchesRecursiveCallbacks(fullPath, eventName, eventFullPath, useTildeSuffix);
        const basePath = getDirectoryPath(fullPath);
        if (this.getCanonicalFileName(fullPath) !== this.getCanonicalFileName(basePath)) {
            this.invokeRecursiveFsWatches(basePath, eventName, eventFullPath, useTildeSuffix);
        }
    }

    invokeFsWatches(fullPath: string, eventName: "rename" | "change", eventFullPath: string | undefined, useTildeSuffix: boolean | undefined): void {
        this.invokeFsWatchesCallbacks(fullPath, eventName, eventFullPath, useTildeSuffix);
        this.invokeFsWatchesCallbacks(getDirectoryPath(fullPath), eventName, eventFullPath, useTildeSuffix);
        this.invokeRecursiveFsWatches(fullPath, eventName, eventFullPath, useTildeSuffix);
    }

    private invokeFileAndFsWatches(
        fileOrFolderFullPath: string,
        eventKind: FileWatcherEventKind,
        eventFullPath: string | undefined,
        modifiedTime?: Date,
        useTildeSuffix?: boolean,
    ) {
        this.invokeFileWatcher(fileOrFolderFullPath, eventKind, modifiedTime);
        this.invokeFsWatches(fileOrFolderFullPath, eventKind === FileWatcherEventKind.Changed ? "change" : "rename", eventFullPath, useTildeSuffix);
    }

    private toFsEntry(path: string): FSEntryBase {
        const fullPath = getNormalizedAbsolutePath(path, this.currentDirectory);
        return {
            path: this.toPath(fullPath),
            fullPath,
            modifiedTime: this.now(),
        };
    }

    private toFsFileOrLibFile(file: File | LibFile): FsFile | FsLibFile {
        const fsFile = this.toFsEntry(file.path) as FsFile & FsLibFile;
        fsFile.content = (file as File).content;
        fsFile.fileSize = (file as File).fileSize;
        fsFile.libFile = (file as LibFile).libFile;
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

    private getRealFile(path: Path, fsEntry?: FSEntry): FSFileOrLibFile | undefined {
        return this.getRealFsEntry(isFsFileOrFsLibFile, path, fsEntry);
    }

    private isFsFolder(fsEntry: FSEntry) {
        return !!this.getRealFolder(fsEntry.path, fsEntry);
    }

    private getRealFolder(path: Path, fsEntry = this.fs.get(path)): FsFolder | undefined {
        return this.getRealFsEntry(isFsFolder, path, fsEntry);
    }

    private getRealFileOrFolder(s: string): FsFile | FsFolder | undefined {
        return this.getRealFsEntry((entry): entry is FsFile | FsFolder => !!entry && !isFsSymLink(entry), this.toFullPath(s));
    }

    fileSystemEntryExists(s: string, entryKind: FileSystemEntryKind): boolean {
        return entryKind === FileSystemEntryKind.File ? this.fileExists(s) : this.directoryExists(s);
    }

    fileExists(s: string): boolean {
        const path = this.toFullPath(s);
        return !!this.getRealFile(path);
    }

    getModifiedTime(s: string): Date | undefined {
        return this.getRealFileOrFolder(s)?.modifiedTime;
    }

    setModifiedTime(s: string, date: Date): void {
        const fsEntry = this.getRealFileOrFolder(s);
        if (fsEntry) {
            fsEntry.modifiedTime = date;
            this.invokeFileAndFsWatches(fsEntry.fullPath, FileWatcherEventKind.Changed, fsEntry.fullPath, fsEntry.modifiedTime);
        }
    }

    readFile(s: string): string | undefined {
        const fsEntry = this.getRealFile(this.toFullPath(s));
        return fsEntry ? getFsFileOrLibFileContent(fsEntry) : undefined;
    }

    getFileSize(s: string): number {
        const path = this.toFullPath(s);
        const entry = this.fs.get(path)!;
        if (isFsFileOrFsLibFile(entry)) {
            return (entry as FsFile).fileSize ? (entry as FsFile).fileSize! : getFsFileOrLibFileContent(entry).length;
        }
        return undefined!; // TODO: GH#18217
    }

    directoryExists(s: string): boolean {
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
        return matchFiles(path, extensions, exclude, include, this.useCaseSensitiveFileNames, this.getCurrentDirectory(), depth, dir => {
            const directories: string[] = [];
            const files: string[] = [];
            const folder = this.getRealFolder(this.toPath(dir));
            if (folder) {
                folder.entries.forEach(entry => {
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
    setTimeout(callback: TimeOutCallback, ms: number, ...args: any[]): number {
        return this.timeoutCallbacks.register(callback, args, ms);
    }

    getNextTimeoutId(): number {
        return this.timeoutCallbacks.getNextId();
    }

    clearTimeout(timeoutId: any): void {
        this.timeoutCallbacks.unregister(timeoutId);
    }

    clearScreen(): void {
        this.screenClears.push(this.output.length);
    }

    runQueuedTimeoutCallbacks(timeoutId?: number): void {
        this.timeoutCallbacks.invoke(timeoutId);
    }

    runQueuedImmediateCallbacks(): void {
        this.immediateCallbacks.invoke();
    }

    setImmediate(callback: TimeOutCallback, ...args: any[]): number {
        return this.immediateCallbacks.register(callback, args);
    }

    clearImmediate(timeoutId: any): void {
        this.immediateCallbacks.unregister(timeoutId);
    }

    scheduleInstall(cb: TimeOutCallback, ...args: any[]): void {
        this.pendingInstalls.register(cb, args);
    }

    runPendingInstalls(): void {
        this.pendingInstalls.invoke();
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
        const file = this.toFsFileOrLibFile({ path, content });

        // base folder has to be present
        const base = getDirectoryPath(file.path);
        const folder = this.getRealFolder(base);

        if (!folder) {
            throw new Error(`Directory not found: ${base}`);
        }

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

    replaceFileText(file: string, searchValue: string | RegExp, replaceValue: string): void {
        const content = Debug.checkDefined(this.readFile(file));
        this.writeFile(file, content.replace(searchValue, replaceValue));
    }

    write(message: string): void {
        if (Debug.isDebugging) console.log(message);
        this.output.push(message);
    }

    getOutput(): readonly string[] {
        return this.output;
    }

    clearOutput(): void {
        clear(this.output);
        this.screenClears.length = 0;
    }

    serializeOutput(baseline: string[]): void {
        const output = this.getOutput();
        if (!this.output.length && !this.screenClears.length) return;
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

    getSnap(): TestServerHostSnapshot {
        return cloneFsMap(this.fs);
    }

    private snap() {
        this.serializedDiff = cloneFsMap(this.fs);
    }

    serializeState(baseline: string[], serializeOutput: SerializeOutputOrder): void {
        if (serializeOutput === SerializeOutputOrder.BeforeDiff) this.serializeOutput(baseline);
        this.diff(baseline);
        if (serializeOutput === SerializeOutputOrder.AfterDiff) this.serializeOutput(baseline);
        this.serializeWatches(baseline);
        this.timeoutCallbacks.serialize(baseline);
        this.immediateCallbacks.serialize(baseline);
        this.pendingInstalls.serialize(baseline);
        this.service?.baseline();
    }

    writtenFiles?: Map<Path, number>;
    private serializedDiff: TestServerHostSnapshot = new Map<Path, FSEntry>();
    diff(baseline: string[]): void {
        this.fs.forEach((newFsEntry, path) => {
            diffFsEntry(baseline, this.serializedDiff.get(path), newFsEntry, this.inodes?.get(path), this.writtenFiles);
        });
        this.serializedDiff.forEach((oldFsEntry, path) => {
            const newFsEntry = this.fs.get(path);
            if (!newFsEntry) {
                diffFsEntry(baseline, oldFsEntry, newFsEntry, this.inodes?.get(path), this.writtenFiles);
            }
        });
        baseline.push("");
        this.snap();
        this.writtenFiles?.clear();
    }

    serializeWatches(baseline?: string[]): string[] {
        return this.watchUtils.serializeWatches(baseline);
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

    exitCode: number | undefined;
    readonly resolvePath = (s: string): string => s;
    readonly getExecutingFilePath = (): string => this.executingFilePath;
    readonly getCurrentDirectory = (): string => this.currentDirectory;
    exit(exitCode?: number): void {
        this.exitCode = exitCode;
        throw new Error(exitMessage);
    }
    getEnvironmentVariable(name: string): string {
        return this.environmentVariables && this.environmentVariables.get(name) || "";
    }
}

function diffFsFile(baseline: string[], fsEntry: FSFileOrLibFile, newInode: number | undefined) {
    if (!isFsLibFile(fsEntry)) {
        baseline.push(`//// [${fsEntry.fullPath}]${inodeString(newInode)}\r\n${fsEntry.content}`, "");
    }
    else if (fsEntry.content) {
        baseline.push(`//// [${fsEntry.fullPath}] *Lib*${inodeString(newInode)}`, "");
    }
}
function diffFsSymLink(baseline: string[], fsEntry: FsSymLink, newInode: number | undefined) {
    baseline.push(`//// [${fsEntry.fullPath}] symlink(${fsEntry.symLink})${inodeString(newInode)}`, "");
}
function inodeString(inode: number | undefined) {
    return inode !== undefined ? ` Inode:: ${inode}` : "";
}
function diffFsEntry(baseline: string[], oldFsEntry: FSEntry | undefined, newFsEntry: FSEntry | undefined, newInode: number | undefined, writtenFiles: Map<string, any> | undefined): void {
    const file = newFsEntry && newFsEntry.fullPath;
    if (isFsFileOrFsLibFile(oldFsEntry)) {
        if (isFsFileOrFsLibFile(newFsEntry)) {
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
            if (isFsFileOrFsLibFile(newFsEntry)) {
                diffFsFile(baseline, newFsEntry, newInode);
            }
        }
    }
    else if (isFsFileOrFsLibFile(newFsEntry)) {
        diffFsFile(baseline, newFsEntry, newInode);
    }
    else if (isFsSymLink(newFsEntry)) {
        diffFsSymLink(baseline, newFsEntry, newInode);
    }
}

function baselineOutputs(baseline: string[], output: readonly string[], start: number, end = output.length) {
    let baselinedOutput: string[] | undefined;
    for (let i = start; i < end; i++) {
        baselinedOutput = append(baselinedOutput, sanitizeSysOutput(output[i]));
    }
    if (baselinedOutput) baseline.push(baselinedOutput.join(""));
}

function sanitizeSysOutput(output: string) {
    return output
        .replace(/Elapsed::\s\d+(?:\.\d+)?ms/g, "Elapsed:: *ms")
        .replace(/\d\d:\d\d:\d\d\s(?:A|P)M/g, "HH:MM:SS AM");
}

export type TestServerHostTrackingWrittenFiles = TestServerHost & { writtenFiles: Map<Path, number>; };

export function changeToHostTrackingWrittenFiles(inputHost: TestServerHost): TestServerHostTrackingWrittenFiles {
    const host = inputHost as TestServerHostTrackingWrittenFiles;
    if (host.writtenFiles) return host;
    const originalWriteFile = host.writeFile;
    host.writtenFiles = new Map<Path, number>();
    host.writeFile = (fileName, content) => {
        originalWriteFile.call(host, fileName, content);
        const path = host.toFullPath(fileName);
        host.writtenFiles.set(path, (host.writtenFiles.get(path) || 0) + 1);
    };
    return host;
}

export function osFlavorToString(osFlavor: TestServerHostOsFlavor): "Windows" | "MacOs" | "Linux" {
    switch (osFlavor) {
        case TestServerHostOsFlavor.Windows:
            return "Windows";
        case TestServerHostOsFlavor.MacOs:
            return "MacOs";
        case TestServerHostOsFlavor.Linux:
            return "Linux";
        default:
            Debug.assertNever(osFlavor);
    }
}
