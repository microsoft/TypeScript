import {
    AssertionLevel,
    closeFileWatcher,
    closeFileWatcherOf,
    combinePaths,
    Comparison,
    contains,
    containsPath,
    createGetCanonicalFileName,
    createMultiMap,
    Debug,
    directorySeparator,
    emptyArray,
    emptyFileSystemEntries,
    endsWith,
    enumerateInsertsAndDeletes,
    FileSystemEntries,
    getDirectoryPath,
    getFallbackOptions,
    getNormalizedAbsolutePath,
    getRelativePathFromDirectory,
    getRelativePathToDirectoryOrUrl,
    getRootLength,
    getStringComparer,
    isArray,
    isNodeLikeSystem,
    isString,
    mapDefined,
    matchesExclude,
    matchFiles,
    memoize,
    ModuleImportResult,
    noop,
    normalizePath,
    normalizeSlashes,
    orderedRemoveItem,
    Path,
    PollingWatchKind,
    resolveJSModule,
    some,
    startsWith,
    timestamp,
    unorderedRemoveItem,
    WatchDirectoryKind,
    WatchFileKind,
    WatchOptions,
    writeFileEnsuringDirectories,
} from "./_namespaces/ts.js";

declare function setTimeout(handler: (...args: any[]) => void, timeout: number): any;
declare function clearTimeout(handle: any): void;

/**
 * djb2 hashing algorithm
 * http://www.cse.yorku.ca/~oz/hash.html
 *
 * @internal
 */
export function generateDjb2Hash(data: string): string {
    let acc = 5381;
    for (let i = 0; i < data.length; i++) {
        acc = ((acc << 5) + acc) + data.charCodeAt(i);
    }
    return acc.toString();
}

/**
 * Set a high stack trace limit to provide more information in case of an error.
 * Called for command-line and server use cases.
 * Not called if TypeScript is used as a library.
 *
 * @internal
 */
export function setStackTraceLimit() {
    if ((Error as any).stackTraceLimit < 100) { // Also tests that we won't set the property if it doesn't exist.
        (Error as any).stackTraceLimit = 100;
    }
}

export enum FileWatcherEventKind {
    Created,
    Changed,
    Deleted,
}

export type FileWatcherCallback = (fileName: string, eventKind: FileWatcherEventKind, modifiedTime?: Date) => void;
export type DirectoryWatcherCallback = (fileName: string) => void;
interface WatchedFile {
    readonly fileName: string;
    readonly callback: FileWatcherCallback;
    mtime: Date;
}

/** @internal */
export enum PollingInterval {
    High = 2000,
    Medium = 500,
    Low = 250,
}

/** @internal */
export type HostWatchFile = (fileName: string, callback: FileWatcherCallback, pollingInterval: PollingInterval, options: WatchOptions | undefined) => FileWatcher;
/** @internal */
export type HostWatchDirectory = (fileName: string, callback: DirectoryWatcherCallback, recursive: boolean, options: WatchOptions | undefined) => FileWatcher;

/** @internal */
export const missingFileModifiedTime = new Date(0); // Any subsequent modification will occur after this time

/** @internal */
export function getModifiedTime(host: { getModifiedTime: NonNullable<System["getModifiedTime"]>; }, fileName: string) {
    return host.getModifiedTime(fileName) || missingFileModifiedTime;
}

interface Levels {
    Low: number;
    Medium: number;
    High: number;
}

function createPollingIntervalBasedLevels(levels: Levels) {
    return {
        [PollingInterval.Low]: levels.Low,
        [PollingInterval.Medium]: levels.Medium,
        [PollingInterval.High]: levels.High,
    };
}

const defaultChunkLevels: Levels = { Low: 32, Medium: 64, High: 256 };
let pollingChunkSize = createPollingIntervalBasedLevels(defaultChunkLevels);
/** @internal */
export let unchangedPollThresholds = createPollingIntervalBasedLevels(defaultChunkLevels);

function setCustomPollingValues(system: System) {
    if (!system.getEnvironmentVariable) {
        return;
    }
    const pollingIntervalChanged = setCustomLevels("TSC_WATCH_POLLINGINTERVAL", PollingInterval);
    pollingChunkSize = getCustomPollingBasedLevels("TSC_WATCH_POLLINGCHUNKSIZE", defaultChunkLevels) || pollingChunkSize;
    unchangedPollThresholds = getCustomPollingBasedLevels("TSC_WATCH_UNCHANGEDPOLLTHRESHOLDS", defaultChunkLevels) || unchangedPollThresholds;

    function getLevel(envVar: string, level: keyof Levels) {
        return system.getEnvironmentVariable(`${envVar}_${level.toUpperCase()}`);
    }

    function getCustomLevels(baseVariable: string) {
        let customLevels: Partial<Levels> | undefined;
        setCustomLevel("Low");
        setCustomLevel("Medium");
        setCustomLevel("High");
        return customLevels;

        function setCustomLevel(level: keyof Levels) {
            const customLevel = getLevel(baseVariable, level);
            if (customLevel) {
                (customLevels || (customLevels = {}))[level] = Number(customLevel);
            }
        }
    }

    function setCustomLevels(baseVariable: string, levels: Levels) {
        const customLevels = getCustomLevels(baseVariable);
        if (customLevels) {
            setLevel("Low");
            setLevel("Medium");
            setLevel("High");
            return true;
        }
        return false;

        function setLevel(level: keyof Levels) {
            levels[level] = customLevels![level] || levels[level];
        }
    }

    function getCustomPollingBasedLevels(baseVariable: string, defaultLevels: Levels) {
        const customLevels = getCustomLevels(baseVariable);
        return (pollingIntervalChanged || customLevels) &&
            createPollingIntervalBasedLevels(customLevels ? { ...defaultLevels, ...customLevels } : defaultLevels);
    }
}

interface WatchedFileWithIsClosed extends WatchedFile {
    isClosed?: boolean;
}
function pollWatchedFileQueue<T extends WatchedFileWithIsClosed>(
    host: { getModifiedTime: NonNullable<System["getModifiedTime"]>; },
    queue: (T | undefined)[],
    pollIndex: number,
    chunkSize: number,
    callbackOnWatchFileStat?: (watchedFile: T, pollIndex: number, fileChanged: boolean) => void,
) {
    let definedValueCopyToIndex = pollIndex;
    // Max visit would be all elements of the queue
    for (let canVisit = queue.length; chunkSize && canVisit; nextPollIndex(), canVisit--) {
        const watchedFile = queue[pollIndex];
        if (!watchedFile) {
            continue;
        }
        else if (watchedFile.isClosed) {
            queue[pollIndex] = undefined;
            continue;
        }

        // Only files polled count towards chunkSize
        chunkSize--;
        const fileChanged = onWatchedFileStat(watchedFile, getModifiedTime(host, watchedFile.fileName));
        if (watchedFile.isClosed) {
            // Closed watcher as part of callback
            queue[pollIndex] = undefined;
            continue;
        }

        callbackOnWatchFileStat?.(watchedFile, pollIndex, fileChanged);
        // Defragment the queue while we are at it
        if (queue[pollIndex]) {
            // Copy this file to the non hole location
            if (definedValueCopyToIndex < pollIndex) {
                queue[definedValueCopyToIndex] = watchedFile;
                queue[pollIndex] = undefined;
            }
            definedValueCopyToIndex++;
        }
    }

    // Return next poll index
    return pollIndex;

    function nextPollIndex() {
        pollIndex++;
        if (pollIndex === queue.length) {
            if (definedValueCopyToIndex < pollIndex) {
                // There are holes from definedValueCopyToIndex to end of queue, change queue size
                queue.length = definedValueCopyToIndex;
            }
            pollIndex = 0;
            definedValueCopyToIndex = 0;
        }
    }
}

interface WatchedFileWithUnchangedPolls extends WatchedFileWithIsClosed {
    unchangedPolls: number;
}
function createDynamicPriorityPollingWatchFile(host: {
    getModifiedTime: NonNullable<System["getModifiedTime"]>;
    setTimeout: NonNullable<System["setTimeout"]>;
}): HostWatchFile {
    interface PollingIntervalQueue extends Array<WatchedFileWithUnchangedPolls> {
        pollingInterval: PollingInterval;
        pollIndex: number;
        pollScheduled: boolean;
    }

    const watchedFiles: WatchedFileWithUnchangedPolls[] = [];
    const changedFilesInLastPoll: WatchedFileWithUnchangedPolls[] = [];
    const lowPollingIntervalQueue = createPollingIntervalQueue(PollingInterval.Low);
    const mediumPollingIntervalQueue = createPollingIntervalQueue(PollingInterval.Medium);
    const highPollingIntervalQueue = createPollingIntervalQueue(PollingInterval.High);
    return watchFile;

    function watchFile(fileName: string, callback: FileWatcherCallback, defaultPollingInterval: PollingInterval): FileWatcher {
        const file: WatchedFileWithUnchangedPolls = {
            fileName,
            callback,
            unchangedPolls: 0,
            mtime: getModifiedTime(host, fileName),
        };
        watchedFiles.push(file);

        addToPollingIntervalQueue(file, defaultPollingInterval);
        return {
            close: () => {
                file.isClosed = true;
                // Remove from watchedFiles
                unorderedRemoveItem(watchedFiles, file);
                // Do not update polling interval queue since that will happen as part of polling
            },
        };
    }

    function createPollingIntervalQueue(pollingInterval: PollingInterval): PollingIntervalQueue {
        const queue = [] as WatchedFileWithUnchangedPolls[] as PollingIntervalQueue;
        queue.pollingInterval = pollingInterval;
        queue.pollIndex = 0;
        queue.pollScheduled = false;
        return queue;
    }

    function pollPollingIntervalQueue(_timeoutType: string, queue: PollingIntervalQueue) {
        queue.pollIndex = pollQueue(queue, queue.pollingInterval, queue.pollIndex, pollingChunkSize[queue.pollingInterval]);
        // Set the next polling index and timeout
        if (queue.length) {
            scheduleNextPoll(queue.pollingInterval);
        }
        else {
            Debug.assert(queue.pollIndex === 0);
            queue.pollScheduled = false;
        }
    }

    function pollLowPollingIntervalQueue(_timeoutType: string, queue: PollingIntervalQueue) {
        // Always poll complete list of changedFilesInLastPoll
        pollQueue(changedFilesInLastPoll, PollingInterval.Low, /*pollIndex*/ 0, changedFilesInLastPoll.length);

        // Finally do the actual polling of the queue
        pollPollingIntervalQueue(_timeoutType, queue);
        // Schedule poll if there are files in changedFilesInLastPoll but no files in the actual queue
        // as pollPollingIntervalQueue wont schedule for next poll
        if (!queue.pollScheduled && changedFilesInLastPoll.length) {
            scheduleNextPoll(PollingInterval.Low);
        }
    }

    function pollQueue(queue: (WatchedFileWithUnchangedPolls | undefined)[], pollingInterval: PollingInterval, pollIndex: number, chunkSize: number) {
        return pollWatchedFileQueue(
            host,
            queue,
            pollIndex,
            chunkSize,
            onWatchFileStat,
        );

        function onWatchFileStat(watchedFile: WatchedFileWithUnchangedPolls, pollIndex: number, fileChanged: boolean) {
            if (fileChanged) {
                watchedFile.unchangedPolls = 0;
                // Changed files go to changedFilesInLastPoll queue
                if (queue !== changedFilesInLastPoll) {
                    queue[pollIndex] = undefined;
                    addChangedFileToLowPollingIntervalQueue(watchedFile);
                }
            }
            else if (watchedFile.unchangedPolls !== unchangedPollThresholds[pollingInterval]) {
                watchedFile.unchangedPolls++;
            }
            else if (queue === changedFilesInLastPoll) {
                // Restart unchangedPollCount for unchanged file and move to low polling interval queue
                watchedFile.unchangedPolls = 1;
                queue[pollIndex] = undefined;
                addToPollingIntervalQueue(watchedFile, PollingInterval.Low);
            }
            else if (pollingInterval !== PollingInterval.High) {
                watchedFile.unchangedPolls++;
                queue[pollIndex] = undefined;
                addToPollingIntervalQueue(watchedFile, pollingInterval === PollingInterval.Low ? PollingInterval.Medium : PollingInterval.High);
            }
        }
    }

    function pollingIntervalQueue(pollingInterval: PollingInterval) {
        switch (pollingInterval) {
            case PollingInterval.Low:
                return lowPollingIntervalQueue;
            case PollingInterval.Medium:
                return mediumPollingIntervalQueue;
            case PollingInterval.High:
                return highPollingIntervalQueue;
        }
    }

    function addToPollingIntervalQueue(file: WatchedFileWithUnchangedPolls, pollingInterval: PollingInterval) {
        pollingIntervalQueue(pollingInterval).push(file);
        scheduleNextPollIfNotAlreadyScheduled(pollingInterval);
    }

    function addChangedFileToLowPollingIntervalQueue(file: WatchedFileWithUnchangedPolls) {
        changedFilesInLastPoll.push(file);
        scheduleNextPollIfNotAlreadyScheduled(PollingInterval.Low);
    }

    function scheduleNextPollIfNotAlreadyScheduled(pollingInterval: PollingInterval) {
        if (!pollingIntervalQueue(pollingInterval).pollScheduled) {
            scheduleNextPoll(pollingInterval);
        }
    }

    function scheduleNextPoll(pollingInterval: PollingInterval) {
        pollingIntervalQueue(pollingInterval).pollScheduled = host.setTimeout(pollingInterval === PollingInterval.Low ? pollLowPollingIntervalQueue : pollPollingIntervalQueue, pollingInterval, pollingInterval === PollingInterval.Low ? "pollLowPollingIntervalQueue" : "pollPollingIntervalQueue", pollingIntervalQueue(pollingInterval));
    }
}

function createUseFsEventsOnParentDirectoryWatchFile(
    fsWatch: FsWatch,
    useCaseSensitiveFileNames: boolean,
    getModifiedTime: NonNullable<System["getModifiedTime"]>,
    fsWatchWithTimestamp: boolean | undefined,
): HostWatchFile {
    // One file can have multiple watchers
    const fileWatcherCallbacks = createMultiMap<string, FileWatcherCallback>();
    const fileTimestamps = fsWatchWithTimestamp ? new Map<string, Date>() : undefined;
    const dirWatchers = new Map<string, DirectoryWatcher>();
    const toCanonicalName = createGetCanonicalFileName(useCaseSensitiveFileNames);
    return nonPollingWatchFile;

    function nonPollingWatchFile(fileName: string, callback: FileWatcherCallback, _pollingInterval: PollingInterval, fallbackOptions: WatchOptions | undefined): FileWatcher {
        const filePath = toCanonicalName(fileName);
        if (fileWatcherCallbacks.add(filePath, callback).length === 1 && fileTimestamps) {
            fileTimestamps.set(filePath, getModifiedTime(fileName) || missingFileModifiedTime);
        }
        const dirPath = getDirectoryPath(filePath) || ".";
        const watcher = dirWatchers.get(dirPath) ||
            createDirectoryWatcher(getDirectoryPath(fileName) || ".", dirPath, fallbackOptions);
        watcher.referenceCount++;
        return {
            close: () => {
                if (watcher.referenceCount === 1) {
                    watcher.close();
                    dirWatchers.delete(dirPath);
                }
                else {
                    watcher.referenceCount--;
                }
                fileWatcherCallbacks.remove(filePath, callback);
            },
        };
    }

    function createDirectoryWatcher(dirName: string, dirPath: string, fallbackOptions: WatchOptions | undefined) {
        const watcher = fsWatch(
            dirName,
            FileSystemEntryKind.Directory,
            (eventName: string, relativeFileName) => {
                // When files are deleted from disk, the triggered "rename" event would have a relativefileName of "undefined"
                if (!isString(relativeFileName)) return;
                const fileName = getNormalizedAbsolutePath(relativeFileName, dirName);
                const filePath = toCanonicalName(fileName);
                // Some applications save a working file via rename operations
                const callbacks = fileName && fileWatcherCallbacks.get(filePath);
                if (callbacks) {
                    let currentModifiedTime;
                    let eventKind = FileWatcherEventKind.Changed;
                    if (fileTimestamps) {
                        const existingTime = fileTimestamps.get(filePath)!;
                        if (eventName === "change") {
                            currentModifiedTime = getModifiedTime(fileName) || missingFileModifiedTime;
                            if (currentModifiedTime.getTime() === existingTime.getTime()) return;
                        }
                        currentModifiedTime ||= getModifiedTime(fileName) || missingFileModifiedTime;
                        fileTimestamps.set(filePath, currentModifiedTime);
                        if (existingTime === missingFileModifiedTime) eventKind = FileWatcherEventKind.Created;
                        else if (currentModifiedTime === missingFileModifiedTime) eventKind = FileWatcherEventKind.Deleted;
                    }
                    for (const fileCallback of callbacks) {
                        fileCallback(fileName, eventKind, currentModifiedTime);
                    }
                }
            },
            /*recursive*/ false,
            PollingInterval.Medium,
            fallbackOptions,
        ) as DirectoryWatcher;
        watcher.referenceCount = 0;
        dirWatchers.set(dirPath, watcher);
        return watcher;
    }
}

function createFixedChunkSizePollingWatchFile(host: {
    getModifiedTime: NonNullable<System["getModifiedTime"]>;
    setTimeout: NonNullable<System["setTimeout"]>;
}): HostWatchFile {
    const watchedFiles: (WatchedFileWithIsClosed | undefined)[] = [];
    let pollIndex = 0;
    let pollScheduled: any;
    return watchFile;

    function watchFile(fileName: string, callback: FileWatcherCallback): FileWatcher {
        const file: WatchedFileWithIsClosed = {
            fileName,
            callback,
            mtime: getModifiedTime(host, fileName),
        };
        watchedFiles.push(file);
        scheduleNextPoll();
        return {
            close: () => {
                file.isClosed = true;
                unorderedRemoveItem(watchedFiles, file);
            },
        };
    }

    function pollQueue() {
        pollScheduled = undefined;
        pollIndex = pollWatchedFileQueue(host, watchedFiles, pollIndex, pollingChunkSize[PollingInterval.Low]);
        scheduleNextPoll();
    }

    function scheduleNextPoll() {
        if (!watchedFiles.length || pollScheduled) return;
        pollScheduled = host.setTimeout(pollQueue, PollingInterval.High, "pollQueue");
    }
}

interface SingleFileWatcher<T extends FileWatcherCallback | FsWatchCallback> {
    watcher: FileWatcher;
    callbacks: T[];
}
function createSingleWatcherPerName<T extends FileWatcherCallback | FsWatchCallback>(
    cache: Map<string, SingleFileWatcher<T>>,
    useCaseSensitiveFileNames: boolean,
    name: string,
    callback: T,
    createWatcher: (callback: T) => FileWatcher,
): FileWatcher {
    const toCanonicalFileName = createGetCanonicalFileName(useCaseSensitiveFileNames);
    const path = toCanonicalFileName(name);
    const existing = cache.get(path);
    if (existing) {
        existing.callbacks.push(callback);
    }
    else {
        cache.set(path, {
            watcher: createWatcher(
                (
                    // Cant infer types correctly so lets satisfy checker
                    (param1: any, param2: never, param3: any) => cache.get(path)?.callbacks.slice().forEach(cb => cb(param1, param2, param3))
                ) as T,
            ),
            callbacks: [callback],
        });
    }

    return {
        close: () => {
            const watcher = cache.get(path);
            // Watcher is not expected to be undefined, but if it is normally its because
            // exception was thrown somewhere else and watch state is not what it should be
            if (!watcher) return;
            if (!orderedRemoveItem(watcher.callbacks, callback) || watcher.callbacks.length) return;
            cache.delete(path);
            closeFileWatcherOf(watcher);
        },
    };
}

/**
 * Returns true if file status changed
 */
function onWatchedFileStat(watchedFile: WatchedFile, modifiedTime: Date): boolean {
    const oldTime = watchedFile.mtime.getTime();
    const newTime = modifiedTime.getTime();
    if (oldTime !== newTime) {
        watchedFile.mtime = modifiedTime;
        // Pass modified times so tsc --build can use it
        watchedFile.callback(watchedFile.fileName, getFileWatcherEventKind(oldTime, newTime), modifiedTime);
        return true;
    }

    return false;
}

/** @internal */
export function getFileWatcherEventKind(oldTime: number, newTime: number) {
    return oldTime === 0
        ? FileWatcherEventKind.Created
        : newTime === 0
        ? FileWatcherEventKind.Deleted
        : FileWatcherEventKind.Changed;
}

/** @internal */
export const ignoredPaths = ["/node_modules/.", "/.git", "/.#"];

let curSysLog: (s: string) => void = noop;

/** @internal */
export function sysLog(s: string) {
    return curSysLog(s);
}

/** @internal */
export function setSysLog(logger: typeof sysLog) {
    curSysLog = logger;
}

interface RecursiveDirectoryWatcherHost {
    watchDirectory: HostWatchDirectory;
    useCaseSensitiveFileNames: boolean;
    getCurrentDirectory: System["getCurrentDirectory"];
    getAccessibleSortedChildDirectories(path: string): readonly string[];
    fileSystemEntryExists: FileSystemEntryExists;
    realpath(s: string): string;
    setTimeout: NonNullable<System["setTimeout"]>;
    clearTimeout: NonNullable<System["clearTimeout"]>;
}

/**
 * Watch the directory recursively using host provided method to watch child directories
 * that means if this is recursive watcher, watch the children directories as well
 * (eg on OS that dont support recursive watch using fs.watch use fs.watchFile)
 */
function createDirectoryWatcherSupportingRecursive({
    watchDirectory,
    useCaseSensitiveFileNames,
    getCurrentDirectory,
    getAccessibleSortedChildDirectories,
    fileSystemEntryExists,
    realpath,
    setTimeout,
    clearTimeout,
}: RecursiveDirectoryWatcherHost): HostWatchDirectory {
    interface ChildDirectoryWatcher extends FileWatcher {
        dirName: string;
    }
    type ChildWatches = readonly ChildDirectoryWatcher[];
    interface HostDirectoryWatcher {
        watcher: FileWatcher;
        childWatches: ChildWatches;
        refCount: number;
        targetWatcher: ChildDirectoryWatcher | undefined;
        links: Set<string> | undefined;
    }

    const cache = new Map<Path, HostDirectoryWatcher>();
    const callbackCache = createMultiMap<Path, { dirName: string; callback: DirectoryWatcherCallback; }>();
    const cacheToUpdateChildWatches = new Map<Path, { dirName: string; options: WatchOptions | undefined; fileNames: string[]; }>();
    let timerToUpdateChildWatches: any;

    const filePathComparer = getStringComparer(!useCaseSensitiveFileNames);
    const toCanonicalFilePath = createGetCanonicalFileName(useCaseSensitiveFileNames) as (fileName: string) => Path;

    return (dirName, callback, recursive, options) =>
        recursive ?
            createDirectoryWatcher(dirName, options, callback) :
            watchDirectory(dirName, callback, recursive, options);

    /**
     * Create the directory watcher for the dirPath.
     */
    function createDirectoryWatcher(
        dirName: string,
        options: WatchOptions | undefined,
        callback?: DirectoryWatcherCallback,
        link?: string,
    ): ChildDirectoryWatcher {
        const dirPath = toCanonicalFilePath(dirName);
        let directoryWatcher = cache.get(dirPath);
        if (directoryWatcher) {
            directoryWatcher.refCount++;
        }
        else {
            directoryWatcher = {
                watcher: watchDirectory(
                    dirName,
                    fileName => {
                        if (isIgnoredPath(fileName, options)) return;

                        if (options?.synchronousWatchDirectory) {
                            // Call the actual callback
                            if (!cache.get(dirPath)?.targetWatcher) invokeCallbacks(dirName, dirPath, fileName);

                            // Iterate through existing children and update the watches if needed
                            updateChildWatches(dirName, dirPath, options);
                        }
                        else {
                            nonSyncUpdateChildWatches(dirName, dirPath, fileName, options);
                        }
                    },
                    /*recursive*/ false,
                    options,
                ),
                refCount: 1,
                childWatches: emptyArray,
                targetWatcher: undefined,
                links: undefined,
            };
            cache.set(dirPath, directoryWatcher);
            updateChildWatches(dirName, dirPath, options);
        }

        if (link) (directoryWatcher.links ??= new Set()).add(link);

        const callbackToAdd = callback && { dirName, callback };
        if (callbackToAdd) {
            callbackCache.add(dirPath, callbackToAdd);
        }

        return {
            dirName,
            close: () => {
                const directoryWatcher = Debug.checkDefined(cache.get(dirPath));
                if (callbackToAdd) callbackCache.remove(dirPath, callbackToAdd);
                if (link) directoryWatcher.links?.delete(link);
                directoryWatcher.refCount--;

                if (directoryWatcher.refCount) return;

                cache.delete(dirPath);
                directoryWatcher.links = undefined;
                closeFileWatcherOf(directoryWatcher);
                closeTargetWatcher(directoryWatcher);
                directoryWatcher.childWatches.forEach(closeFileWatcher);
            },
        };
    }

    type InvokeMap = Map<Path, string[] | true>;
    function invokeCallbacks(dirName: string, dirPath: Path, fileName: string): void;
    function invokeCallbacks(dirName: string, dirPath: Path, invokeMap: InvokeMap, fileNames: string[] | undefined): void;
    function invokeCallbacks(dirName: string, dirPath: Path, fileNameOrInvokeMap: string | InvokeMap, fileNames?: string[]) {
        let fileName: string | undefined;
        let invokeMap: InvokeMap | undefined;
        if (isString(fileNameOrInvokeMap)) {
            fileName = fileNameOrInvokeMap;
        }
        else {
            invokeMap = fileNameOrInvokeMap;
        }
        // Call the actual callback
        callbackCache.forEach((callbacks, rootDirName) => {
            if (invokeMap && invokeMap.get(rootDirName) === true) return;
            if (rootDirName === dirPath || (startsWith(dirPath, rootDirName) && dirPath[rootDirName.length] === directorySeparator)) {
                if (invokeMap) {
                    if (fileNames) {
                        const existing = invokeMap.get(rootDirName);
                        if (existing) {
                            (existing as string[]).push(...fileNames);
                        }
                        else {
                            invokeMap.set(rootDirName, fileNames.slice());
                        }
                    }
                    else {
                        invokeMap.set(rootDirName, true);
                    }
                }
                else {
                    callbacks.forEach(({ callback }) => callback(fileName!));
                }
            }
        });
        cache.get(dirPath)?.links?.forEach(link => {
            const toPathInLink = (fileName: string) => combinePaths(link, getRelativePathFromDirectory(dirName, fileName, toCanonicalFilePath));
            if (invokeMap) {
                invokeCallbacks(link, toCanonicalFilePath(link), invokeMap, fileNames?.map(toPathInLink));
            }
            else {
                invokeCallbacks(link, toCanonicalFilePath(link), toPathInLink(fileName!));
            }
        });
    }

    function nonSyncUpdateChildWatches(dirName: string, dirPath: Path, fileName: string, options: WatchOptions | undefined) {
        // Iterate through existing children and update the watches if needed
        const parentWatcher = cache.get(dirPath);
        if (parentWatcher && fileSystemEntryExists(dirName, FileSystemEntryKind.Directory)) {
            // Schedule the update and postpone invoke for callbacks
            scheduleUpdateChildWatches(dirName, dirPath, fileName, options);
            return;
        }

        // Call the actual callbacks and remove child watches
        invokeCallbacks(dirName, dirPath, fileName);
        closeTargetWatcher(parentWatcher);
        removeChildWatches(parentWatcher);
    }

    function scheduleUpdateChildWatches(dirName: string, dirPath: Path, fileName: string, options: WatchOptions | undefined) {
        const existing = cacheToUpdateChildWatches.get(dirPath);
        if (existing) {
            existing.fileNames.push(fileName);
        }
        else {
            cacheToUpdateChildWatches.set(dirPath, { dirName, options, fileNames: [fileName] });
        }
        if (timerToUpdateChildWatches) {
            clearTimeout(timerToUpdateChildWatches);
            timerToUpdateChildWatches = undefined;
        }
        timerToUpdateChildWatches = setTimeout(onTimerToUpdateChildWatches, 1000, "timerToUpdateChildWatches");
    }

    function onTimerToUpdateChildWatches() {
        timerToUpdateChildWatches = undefined;
        sysLog(`sysLog:: onTimerToUpdateChildWatches:: ${cacheToUpdateChildWatches.size}`);
        const start = timestamp();
        const invokeMap = new Map<Path, string[]>();

        while (!timerToUpdateChildWatches && cacheToUpdateChildWatches.size) {
            const result = cacheToUpdateChildWatches.entries().next();
            Debug.assert(!result.done);
            const { value: [dirPath, { dirName, options, fileNames }] } = result;
            cacheToUpdateChildWatches.delete(dirPath);
            // Because the child refresh is fresh, we would need to invalidate whole root directory being watched
            // to ensure that all the changes are reflected at this time
            const hasChanges = updateChildWatches(dirName, dirPath, options);
            if (!cache.get(dirPath)?.targetWatcher) invokeCallbacks(dirName, dirPath, invokeMap, hasChanges ? undefined : fileNames);
        }

        sysLog(`sysLog:: invokingWatchers:: Elapsed:: ${timestamp() - start}ms:: ${cacheToUpdateChildWatches.size}`);
        callbackCache.forEach((callbacks, rootDirName) => {
            const existing = invokeMap.get(rootDirName);
            if (existing) {
                callbacks.forEach(({ callback, dirName }) => {
                    if (isArray(existing)) {
                        existing.forEach(callback);
                    }
                    else {
                        callback(dirName);
                    }
                });
            }
        });

        const elapsed = timestamp() - start;
        sysLog(`sysLog:: Elapsed:: ${elapsed}ms:: onTimerToUpdateChildWatches:: ${cacheToUpdateChildWatches.size} ${timerToUpdateChildWatches}`);
    }

    function removeChildWatches(parentWatcher: HostDirectoryWatcher | undefined) {
        if (!parentWatcher) return;
        const existingChildWatches = parentWatcher.childWatches;
        parentWatcher.childWatches = emptyArray;
        for (const childWatcher of existingChildWatches) {
            childWatcher.close();
            removeChildWatches(cache.get(toCanonicalFilePath(childWatcher.dirName)));
        }
    }

    function closeTargetWatcher(watcher: HostDirectoryWatcher | undefined) {
        if (watcher?.targetWatcher) {
            watcher.targetWatcher.close();
            watcher.targetWatcher = undefined;
        }
    }

    function updateChildWatches(parentDir: string, parentDirPath: Path, options: WatchOptions | undefined) {
        // Iterate through existing children and update the watches if needed
        const parentWatcher = cache.get(parentDirPath);
        if (!parentWatcher) return false;
        const target = normalizePath(realpath(parentDir));
        let hasChanges;
        let newChildWatches: ChildDirectoryWatcher[] | undefined;
        if (filePathComparer(target, parentDir) === Comparison.EqualTo) {
            // if (parentWatcher.target) closeFileWatcher
            hasChanges = enumerateInsertsAndDeletes<string, ChildDirectoryWatcher>(
                fileSystemEntryExists(parentDir, FileSystemEntryKind.Directory) ? mapDefined(getAccessibleSortedChildDirectories(parentDir), child => {
                    const childFullName = getNormalizedAbsolutePath(child, parentDir);
                    // Filter our the symbolic link directories since those arent included in recursive watch
                    // which is same behaviour when recursive: true is passed to fs.watch
                    return !isIgnoredPath(childFullName, options) && filePathComparer(childFullName, normalizePath(realpath(childFullName))) === Comparison.EqualTo ? childFullName : undefined;
                }) : emptyArray,
                parentWatcher.childWatches,
                (child, childWatcher) => filePathComparer(child, childWatcher.dirName),
                createAndAddChildDirectoryWatcher,
                closeFileWatcher,
                addChildDirectoryWatcher,
            );
        }
        else if (parentWatcher.targetWatcher && filePathComparer(target, parentWatcher.targetWatcher.dirName) === Comparison.EqualTo) {
            hasChanges = false;
            Debug.assert(parentWatcher.childWatches === emptyArray);
        }
        else {
            closeTargetWatcher(parentWatcher);
            parentWatcher.targetWatcher = createDirectoryWatcher(target, options, /*callback*/ undefined, parentDir);
            parentWatcher.childWatches.forEach(closeFileWatcher);
            hasChanges = true;
        }
        parentWatcher.childWatches = newChildWatches || emptyArray;
        return hasChanges;

        /**
         * Create new childDirectoryWatcher and add it to the new ChildDirectoryWatcher list
         */
        function createAndAddChildDirectoryWatcher(childName: string) {
            const result = createDirectoryWatcher(childName, options);
            addChildDirectoryWatcher(result);
        }

        /**
         * Add child directory watcher to the new ChildDirectoryWatcher list
         */
        function addChildDirectoryWatcher(childWatcher: ChildDirectoryWatcher) {
            (newChildWatches || (newChildWatches = [])).push(childWatcher);
        }
    }

    function isIgnoredPath(path: string, options: WatchOptions | undefined) {
        return some(ignoredPaths, searchPath => isInPath(path, searchPath)) ||
            isIgnoredByWatchOptions(path, options, useCaseSensitiveFileNames, getCurrentDirectory);
    }

    function isInPath(path: string, searchPath: string) {
        if (path.includes(searchPath)) return true;
        if (useCaseSensitiveFileNames) return false;
        return toCanonicalFilePath(path).includes(searchPath);
    }
}

/** @internal */
export type FsWatchCallback = (eventName: "rename" | "change", relativeFileName: string | undefined | null, modifiedTime?: Date) => void; // eslint-disable-line no-restricted-syntax
/** @internal */
export type FsWatch = (fileOrDirectory: string, entryKind: FileSystemEntryKind, callback: FsWatchCallback, recursive: boolean, fallbackPollingInterval: PollingInterval, fallbackOptions: WatchOptions | undefined) => FileWatcher;
/** @internal */
export interface FsWatchWorkerWatcher extends FileWatcher {
    on(eventName: string, listener: () => void): void;
}
/** @internal */
export type FsWatchWorker = (fileOrDirectory: string, recursive: boolean, callback: FsWatchCallback) => FsWatchWorkerWatcher;
/** @internal */
export const enum FileSystemEntryKind {
    File,
    Directory,
}

function createFileWatcherCallback(callback: FsWatchCallback): FileWatcherCallback {
    return (_fileName, eventKind, modifiedTime) => callback(eventKind === FileWatcherEventKind.Changed ? "change" : "rename", "", modifiedTime);
}

function createFsWatchCallbackForFileWatcherCallback(
    fileName: string,
    callback: FileWatcherCallback,
    getModifiedTime: NonNullable<System["getModifiedTime"]>,
): FsWatchCallback {
    return (eventName, _relativeFileName, modifiedTime) => {
        if (eventName === "rename") {
            // Check time stamps rather than file system entry checks
            modifiedTime ||= getModifiedTime(fileName) || missingFileModifiedTime;
            callback(fileName, modifiedTime !== missingFileModifiedTime ? FileWatcherEventKind.Created : FileWatcherEventKind.Deleted, modifiedTime);
        }
        else {
            // Change
            callback(fileName, FileWatcherEventKind.Changed, modifiedTime);
        }
    };
}

function isIgnoredByWatchOptions(
    pathToCheck: string,
    options: WatchOptions | undefined,
    useCaseSensitiveFileNames: boolean,
    getCurrentDirectory: System["getCurrentDirectory"],
) {
    return (options?.excludeDirectories || options?.excludeFiles) && (
        matchesExclude(pathToCheck, options?.excludeFiles, useCaseSensitiveFileNames, getCurrentDirectory()) ||
        matchesExclude(pathToCheck, options?.excludeDirectories, useCaseSensitiveFileNames, getCurrentDirectory())
    );
}

function createFsWatchCallbackForDirectoryWatcherCallback(
    directoryName: string,
    callback: DirectoryWatcherCallback,
    options: WatchOptions | undefined,
    useCaseSensitiveFileNames: boolean,
    getCurrentDirectory: System["getCurrentDirectory"],
): FsWatchCallback {
    return (eventName, relativeFileName) => {
        // In watchDirectory we only care about adding and removing files (when event name is
        // "rename"); changes made within files are handled by corresponding fileWatchers (when
        // event name is "change")
        if (eventName === "rename") {
            // When deleting a file, the passed baseFileName is null
            const fileName = !relativeFileName ? directoryName : normalizePath(combinePaths(directoryName, relativeFileName));
            if (!relativeFileName || !isIgnoredByWatchOptions(fileName, options, useCaseSensitiveFileNames, getCurrentDirectory)) {
                callback(fileName);
            }
        }
    };
}

/** @internal */
export type FileSystemEntryExists = (fileorDirectrory: string, entryKind: FileSystemEntryKind) => boolean;

/** @internal */
export interface CreateSystemWatchFunctions {
    // Polling watch file
    pollingWatchFileWorker: HostWatchFile;
    // For dynamic polling watch file
    getModifiedTime: NonNullable<System["getModifiedTime"]>;
    setTimeout: NonNullable<System["setTimeout"]>;
    clearTimeout: NonNullable<System["clearTimeout"]>;
    // For fs events :
    fsWatchWorker: FsWatchWorker;
    fileSystemEntryExists: FileSystemEntryExists;
    useCaseSensitiveFileNames: boolean;
    getCurrentDirectory: System["getCurrentDirectory"];
    fsSupportsRecursiveFsWatch: boolean;
    getAccessibleSortedChildDirectories(path: string): readonly string[];
    realpath(s: string): string;
    // For backward compatibility environment variables
    tscWatchFile: string | undefined;
    useNonPollingWatchers?: boolean;
    tscWatchDirectory: string | undefined;
    inodeWatching: boolean;
    fsWatchWithTimestamp: boolean | undefined;
    sysLog: (s: string) => void;
}

/** @internal */
export function createSystemWatchFunctions({
    pollingWatchFileWorker,
    getModifiedTime,
    setTimeout,
    clearTimeout,
    fsWatchWorker,
    fileSystemEntryExists,
    useCaseSensitiveFileNames,
    getCurrentDirectory,
    fsSupportsRecursiveFsWatch,
    getAccessibleSortedChildDirectories,
    realpath,
    tscWatchFile,
    useNonPollingWatchers,
    tscWatchDirectory,
    inodeWatching,
    fsWatchWithTimestamp,
    sysLog,
}: CreateSystemWatchFunctions): { watchFile: HostWatchFile; watchDirectory: HostWatchDirectory; } {
    const pollingWatches = new Map<string, SingleFileWatcher<FileWatcherCallback>>();
    const fsWatches = new Map<string, SingleFileWatcher<FsWatchCallback>>();
    const fsWatchesRecursive = new Map<string, SingleFileWatcher<FsWatchCallback>>();
    let dynamicPollingWatchFile: HostWatchFile | undefined;
    let fixedChunkSizePollingWatchFile: HostWatchFile | undefined;
    let nonPollingWatchFile: HostWatchFile | undefined;
    let hostRecursiveDirectoryWatcher: HostWatchDirectory | undefined;
    let hitSystemWatcherLimit = false;
    return {
        watchFile,
        watchDirectory,
    };

    function watchFile(fileName: string, callback: FileWatcherCallback, pollingInterval: PollingInterval, options: WatchOptions | undefined): FileWatcher {
        options = updateOptionsForWatchFile(options, useNonPollingWatchers);
        const watchFileKind = Debug.checkDefined(options.watchFile);
        switch (watchFileKind) {
            case WatchFileKind.FixedPollingInterval:
                return pollingWatchFile(fileName, callback, PollingInterval.Low, /*options*/ undefined);
            case WatchFileKind.PriorityPollingInterval:
                return pollingWatchFile(fileName, callback, pollingInterval, /*options*/ undefined);
            case WatchFileKind.DynamicPriorityPolling:
                return ensureDynamicPollingWatchFile()(fileName, callback, pollingInterval, /*options*/ undefined);
            case WatchFileKind.FixedChunkSizePolling:
                return ensureFixedChunkSizePollingWatchFile()(fileName, callback, /* pollingInterval */ undefined!, /*options*/ undefined);
            case WatchFileKind.UseFsEvents:
                return fsWatch(
                    fileName,
                    FileSystemEntryKind.File,
                    createFsWatchCallbackForFileWatcherCallback(fileName, callback, getModifiedTime),
                    /*recursive*/ false,
                    pollingInterval,
                    getFallbackOptions(options),
                );
            case WatchFileKind.UseFsEventsOnParentDirectory:
                if (!nonPollingWatchFile) {
                    nonPollingWatchFile = createUseFsEventsOnParentDirectoryWatchFile(fsWatch, useCaseSensitiveFileNames, getModifiedTime, fsWatchWithTimestamp);
                }
                return nonPollingWatchFile(fileName, callback, pollingInterval, getFallbackOptions(options));
            default:
                Debug.assertNever(watchFileKind);
        }
    }

    function ensureDynamicPollingWatchFile() {
        return dynamicPollingWatchFile ||= createDynamicPriorityPollingWatchFile({ getModifiedTime, setTimeout });
    }

    function ensureFixedChunkSizePollingWatchFile() {
        return fixedChunkSizePollingWatchFile ||= createFixedChunkSizePollingWatchFile({ getModifiedTime, setTimeout });
    }

    function updateOptionsForWatchFile(options: WatchOptions | undefined, useNonPollingWatchers?: boolean): WatchOptions {
        if (options && options.watchFile !== undefined) return options;
        switch (tscWatchFile) {
            case "PriorityPollingInterval":
                // Use polling interval based on priority when create watch using host.watchFile
                return { watchFile: WatchFileKind.PriorityPollingInterval };
            case "DynamicPriorityPolling":
                // Use polling interval but change the interval depending on file changes and their default polling interval
                return { watchFile: WatchFileKind.DynamicPriorityPolling };
            case "UseFsEvents":
                // Use notifications from FS to watch with falling back to fs.watchFile
                return generateWatchFileOptions(WatchFileKind.UseFsEvents, PollingWatchKind.PriorityInterval, options);
            case "UseFsEventsWithFallbackDynamicPolling":
                // Use notifications from FS to watch with falling back to dynamic watch file
                return generateWatchFileOptions(WatchFileKind.UseFsEvents, PollingWatchKind.DynamicPriority, options);
            case "UseFsEventsOnParentDirectory":
                useNonPollingWatchers = true;
            // fall through
            default:
                return useNonPollingWatchers ?
                    // Use notifications from FS to watch with falling back to fs.watchFile
                    generateWatchFileOptions(WatchFileKind.UseFsEventsOnParentDirectory, PollingWatchKind.PriorityInterval, options) :
                    // Default to using fs events
                    { watchFile: WatchFileKind.UseFsEvents };
        }
    }

    function generateWatchFileOptions(
        watchFile: WatchFileKind,
        fallbackPolling: PollingWatchKind,
        options: WatchOptions | undefined,
    ): WatchOptions {
        const defaultFallbackPolling = options?.fallbackPolling;
        return {
            watchFile,
            fallbackPolling: defaultFallbackPolling === undefined ?
                fallbackPolling :
                defaultFallbackPolling,
        };
    }

    function watchDirectory(directoryName: string, callback: DirectoryWatcherCallback, recursive: boolean, options: WatchOptions | undefined): FileWatcher {
        if (fsSupportsRecursiveFsWatch) {
            return fsWatch(
                directoryName,
                FileSystemEntryKind.Directory,
                createFsWatchCallbackForDirectoryWatcherCallback(directoryName, callback, options, useCaseSensitiveFileNames, getCurrentDirectory),
                recursive,
                PollingInterval.Medium,
                getFallbackOptions(options),
            );
        }

        if (!hostRecursiveDirectoryWatcher) {
            hostRecursiveDirectoryWatcher = createDirectoryWatcherSupportingRecursive({
                useCaseSensitiveFileNames,
                getCurrentDirectory,
                fileSystemEntryExists,
                getAccessibleSortedChildDirectories,
                watchDirectory: nonRecursiveWatchDirectory,
                realpath,
                setTimeout,
                clearTimeout,
            });
        }
        return hostRecursiveDirectoryWatcher(directoryName, callback, recursive, options);
    }

    function nonRecursiveWatchDirectory(directoryName: string, callback: DirectoryWatcherCallback, recursive: boolean, options: WatchOptions | undefined): FileWatcher {
        Debug.assert(!recursive);
        const watchDirectoryOptions = updateOptionsForWatchDirectory(options);
        const watchDirectoryKind = Debug.checkDefined(watchDirectoryOptions.watchDirectory);
        switch (watchDirectoryKind) {
            case WatchDirectoryKind.FixedPollingInterval:
                return pollingWatchFile(
                    directoryName,
                    () => callback(directoryName),
                    PollingInterval.Medium,
                    /*options*/ undefined,
                );
            case WatchDirectoryKind.DynamicPriorityPolling:
                return ensureDynamicPollingWatchFile()(
                    directoryName,
                    () => callback(directoryName),
                    PollingInterval.Medium,
                    /*options*/ undefined,
                );
            case WatchDirectoryKind.FixedChunkSizePolling:
                return ensureFixedChunkSizePollingWatchFile()(
                    directoryName,
                    () => callback(directoryName),
                    /* pollingInterval */ undefined!,
                    /*options*/ undefined,
                );
            case WatchDirectoryKind.UseFsEvents:
                return fsWatch(
                    directoryName,
                    FileSystemEntryKind.Directory,
                    createFsWatchCallbackForDirectoryWatcherCallback(directoryName, callback, options, useCaseSensitiveFileNames, getCurrentDirectory),
                    recursive,
                    PollingInterval.Medium,
                    getFallbackOptions(watchDirectoryOptions),
                );
            default:
                Debug.assertNever(watchDirectoryKind);
        }
    }

    function updateOptionsForWatchDirectory(options: WatchOptions | undefined): WatchOptions {
        if (options && options.watchDirectory !== undefined) return options;
        switch (tscWatchDirectory) {
            case "RecursiveDirectoryUsingFsWatchFile":
                // Use polling interval based on priority when create watch using host.watchFile
                return { watchDirectory: WatchDirectoryKind.FixedPollingInterval };
            case "RecursiveDirectoryUsingDynamicPriorityPolling":
                // Use polling interval but change the interval depending on file changes and their default polling interval
                return { watchDirectory: WatchDirectoryKind.DynamicPriorityPolling };
            default:
                const defaultFallbackPolling = options?.fallbackPolling;
                return {
                    watchDirectory: WatchDirectoryKind.UseFsEvents,
                    fallbackPolling: defaultFallbackPolling !== undefined ?
                        defaultFallbackPolling :
                        undefined,
                };
        }
    }

    function pollingWatchFile(fileName: string, callback: FileWatcherCallback, pollingInterval: PollingInterval, options: WatchOptions | undefined) {
        return createSingleWatcherPerName(
            pollingWatches,
            useCaseSensitiveFileNames,
            fileName,
            callback,
            cb => pollingWatchFileWorker(fileName, cb, pollingInterval, options),
        );
    }
    function fsWatch(
        fileOrDirectory: string,
        entryKind: FileSystemEntryKind,
        callback: FsWatchCallback,
        recursive: boolean,
        fallbackPollingInterval: PollingInterval,
        fallbackOptions: WatchOptions | undefined,
    ): FileWatcher {
        return createSingleWatcherPerName(
            recursive ? fsWatchesRecursive : fsWatches,
            useCaseSensitiveFileNames,
            fileOrDirectory,
            callback,
            cb => fsWatchHandlingExistenceOnHost(fileOrDirectory, entryKind, cb, recursive, fallbackPollingInterval, fallbackOptions),
        );
    }

    function fsWatchHandlingExistenceOnHost(
        fileOrDirectory: string,
        entryKind: FileSystemEntryKind,
        callback: FsWatchCallback,
        recursive: boolean,
        fallbackPollingInterval: PollingInterval,
        fallbackOptions: WatchOptions | undefined,
    ): FileWatcher {
        let lastDirectoryPartWithDirectorySeparator: string | undefined;
        let lastDirectoryPart: string | undefined;
        if (inodeWatching) {
            lastDirectoryPartWithDirectorySeparator = fileOrDirectory.substring(fileOrDirectory.lastIndexOf(directorySeparator));
            lastDirectoryPart = lastDirectoryPartWithDirectorySeparator.slice(directorySeparator.length);
        }
        /** Watcher for the file system entry depending on whether it is missing or present */
        let watcher: FileWatcher | undefined = !fileSystemEntryExists(fileOrDirectory, entryKind) ?
            watchMissingFileSystemEntry() :
            watchPresentFileSystemEntry();
        return {
            close: () => {
                // Close the watcher (either existing file system entry watcher or missing file system entry watcher)
                if (watcher) {
                    watcher.close();
                    watcher = undefined;
                }
            },
        };

        function updateWatcher(createWatcher: () => FileWatcher) {
            // If watcher is not closed, update it
            if (watcher) {
                sysLog(`sysLog:: ${fileOrDirectory}:: Changing watcher to ${createWatcher === watchPresentFileSystemEntry ? "Present" : "Missing"}FileSystemEntryWatcher`);
                watcher.close();
                watcher = createWatcher();
            }
        }

        /**
         * Watch the file or directory that is currently present
         * and when the watched file or directory is deleted, switch to missing file system entry watcher
         */
        function watchPresentFileSystemEntry(): FileWatcher {
            if (hitSystemWatcherLimit) {
                sysLog(`sysLog:: ${fileOrDirectory}:: Defaulting to watchFile`);
                return watchPresentFileSystemEntryWithFsWatchFile();
            }
            try {
                const presentWatcher = (entryKind === FileSystemEntryKind.Directory || !fsWatchWithTimestamp ? fsWatchWorker : fsWatchWorkerHandlingTimestamp)(
                    fileOrDirectory,
                    recursive,
                    inodeWatching ?
                        callbackChangingToMissingFileSystemEntry :
                        callback,
                );
                // Watch the missing file or directory or error
                presentWatcher.on("error", () => {
                    callback("rename", "");
                    updateWatcher(watchMissingFileSystemEntry);
                });
                return presentWatcher;
            }
            catch (e) {
                // Catch the exception and use polling instead
                // Eg. on linux the number of watches are limited and one could easily exhaust watches and the exception ENOSPC is thrown when creating watcher at that point
                // so instead of throwing error, use fs.watchFile
                hitSystemWatcherLimit ||= e.code === "ENOSPC";
                sysLog(`sysLog:: ${fileOrDirectory}:: Changing to watchFile`);
                return watchPresentFileSystemEntryWithFsWatchFile();
            }
        }

        function callbackChangingToMissingFileSystemEntry(event: "rename" | "change", relativeName: string | undefined | null) { // eslint-disable-line no-restricted-syntax
            // In some scenarios, file save operation fires event with fileName.ext~ instead of fileName.ext
            // To ensure we see the file going missing and coming back up (file delete and then recreated)
            // and watches being updated correctly we are calling back with fileName.ext as well as fileName.ext~
            // The worst is we have fired event that was not needed but we wont miss any changes
            // especially in cases where file goes missing and watches wrong inode
            let originalRelativeName: string | undefined;
            if (relativeName && endsWith(relativeName, "~")) {
                originalRelativeName = relativeName;
                relativeName = relativeName.slice(0, relativeName.length - 1);
            }
            // because relativeName is not guaranteed to be correct we need to check on each rename with few combinations
            // Eg on ubuntu while watching app/node_modules the relativeName is "node_modules" which is neither relative nor full path
            if (
                event === "rename" &&
                (!relativeName ||
                    relativeName === lastDirectoryPart ||
                    endsWith(relativeName, lastDirectoryPartWithDirectorySeparator!))
            ) {
                const modifiedTime = getModifiedTime(fileOrDirectory) || missingFileModifiedTime;
                if (originalRelativeName) callback(event, originalRelativeName, modifiedTime);
                callback(event, relativeName, modifiedTime);
                if (inodeWatching) {
                    // If this was rename event, inode has changed means we need to update watcher
                    updateWatcher(modifiedTime === missingFileModifiedTime ? watchMissingFileSystemEntry : watchPresentFileSystemEntry);
                }
                else if (modifiedTime === missingFileModifiedTime) {
                    updateWatcher(watchMissingFileSystemEntry);
                }
            }
            else {
                if (originalRelativeName) callback(event, originalRelativeName);
                callback(event, relativeName);
            }
        }

        /**
         * Watch the file or directory using fs.watchFile since fs.watch threw exception
         * Eg. on linux the number of watches are limited and one could easily exhaust watches and the exception ENOSPC is thrown when creating watcher at that point
         */
        function watchPresentFileSystemEntryWithFsWatchFile(): FileWatcher {
            return watchFile(
                fileOrDirectory,
                createFileWatcherCallback(callback),
                fallbackPollingInterval,
                fallbackOptions,
            );
        }

        /**
         * Watch the file or directory that is missing
         * and switch to existing file or directory when the missing filesystem entry is created
         */
        function watchMissingFileSystemEntry(): FileWatcher {
            return watchFile(
                fileOrDirectory,
                (_fileName, eventKind, modifiedTime) => {
                    if (eventKind === FileWatcherEventKind.Created) {
                        modifiedTime ||= getModifiedTime(fileOrDirectory) || missingFileModifiedTime;
                        if (modifiedTime !== missingFileModifiedTime) {
                            callback("rename", "", modifiedTime);
                            // Call the callback for current file or directory
                            // For now it could be callback for the inner directory creation,
                            // but just return current directory, better than current no-op
                            updateWatcher(watchPresentFileSystemEntry);
                        }
                    }
                },
                fallbackPollingInterval,
                fallbackOptions,
            );
        }
    }

    function fsWatchWorkerHandlingTimestamp(fileOrDirectory: string, recursive: boolean, callback: FsWatchCallback): FsWatchWorkerWatcher {
        let modifiedTime = getModifiedTime(fileOrDirectory) || missingFileModifiedTime;
        return fsWatchWorker(fileOrDirectory, recursive, (eventName, relativeFileName, currentModifiedTime) => {
            if (eventName === "change") {
                currentModifiedTime ||= getModifiedTime(fileOrDirectory) || missingFileModifiedTime;
                if (currentModifiedTime.getTime() === modifiedTime.getTime()) return;
            }
            modifiedTime = currentModifiedTime || getModifiedTime(fileOrDirectory) || missingFileModifiedTime;
            callback(eventName, relativeFileName, modifiedTime);
        });
    }
}

/**
 * patch writefile to create folder before writing the file
 *
 * @internal
 */
export function patchWriteFileEnsuringDirectory(sys: System) {
    // patch writefile to create folder before writing the file
    const originalWriteFile = sys.writeFile;
    sys.writeFile = (path, data, writeBom) =>
        writeFileEnsuringDirectories(
            path,
            data,
            !!writeBom,
            (path, data, writeByteOrderMark) => originalWriteFile.call(sys, path, data, writeByteOrderMark),
            path => sys.createDirectory(path),
            path => sys.directoryExists(path),
        );
}

export type BufferEncoding = "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex";

// TODO: GH#18217 Methods on System are often used as if they are certainly defined
export interface System {
    args: string[];
    newLine: string;
    useCaseSensitiveFileNames: boolean;
    write(s: string): void;
    writeOutputIsTTY?(): boolean;
    getWidthOfTerminal?(): number;
    readFile(path: string, encoding?: string): string | undefined;
    getFileSize?(path: string): number;
    writeFile(path: string, data: string, writeByteOrderMark?: boolean): void;

    /**
     * @pollingInterval - this parameter is used in polling-based watchers and ignored in watchers that
     * use native OS file watching
     */
    watchFile?(path: string, callback: FileWatcherCallback, pollingInterval?: number, options?: WatchOptions): FileWatcher;
    watchDirectory?(path: string, callback: DirectoryWatcherCallback, recursive?: boolean, options?: WatchOptions): FileWatcher;
    /**@internal */ preferNonRecursiveWatch?: boolean;
    resolvePath(path: string): string;
    fileExists(path: string): boolean;
    directoryExists(path: string): boolean;
    createDirectory(path: string): void;
    getExecutingFilePath(): string;
    getCurrentDirectory(): string;
    getDirectories(path: string): string[];
    readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];
    getModifiedTime?(path: string): Date | undefined;
    setModifiedTime?(path: string, time: Date): void;
    deleteFile?(path: string): void;
    /**
     * A good implementation is node.js' `crypto.createHash`. (https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm)
     */
    createHash?(data: string): string;
    /** This must be cryptographically secure. Only implement this method using `crypto.createHash("sha256")`. */
    createSHA256Hash?(data: string): string;
    getMemoryUsage?(): number;
    exit(exitCode?: number): void;
    /** @internal */ enableCPUProfiler?(path: string, continuation: () => void): boolean;
    /** @internal */ disableCPUProfiler?(continuation: () => void): boolean;
    /** @internal */ cpuProfilingEnabled?(): boolean;
    realpath?(path: string): string;
    /** @internal */ getEnvironmentVariable(name: string): string;
    /** @internal */ tryEnableSourceMapsForHost?(): void;
    /** @internal */ getAccessibleFileSystemEntries?(path: string): FileSystemEntries;
    /** @internal */ debugMode?: boolean;
    setTimeout?(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
    clearTimeout?(timeoutId: any): void;
    clearScreen?(): void;
    /** @internal */ setBlocking?(): void;
    base64decode?(input: string): string;
    base64encode?(input: string): string;
    /** @internal */ require?(baseDir: string, moduleName: string): ModuleImportResult;

    // For testing
    /** @internal */ now?(): Date;
    /** @internal */ storeSignatureInfo?: boolean;
}

export interface FileWatcher {
    close(): void;
}

interface DirectoryWatcher extends FileWatcher {
    referenceCount: number;
}

// TODO: GH#18217 this is used as if it's certainly defined in many places.
export let sys: System = (() => {
    // NodeJS detects "\uFEFF" at the start of the string and *replaces* it with the actual
    // byte order mark from the specified encoding. Using any other byte order mark does
    // not actually work.
    const byteOrderMarkIndicator = "\uFEFF";

    function getNodeSystem(): System {
        const nativePattern = /^native |^\([^)]+\)$|^(internal[\\/]|[a-zA-Z0-9_\s]+(\.js)?$)/;
        const _fs: typeof import("fs") = require("fs");
        const _path: typeof import("path") = require("path");
        const _os = require("os");
        // crypto can be absent on reduced node installations
        let _crypto: typeof import("crypto") | undefined;
        try {
            _crypto = require("crypto");
        }
        catch {
            _crypto = undefined;
        }
        let activeSession: import("inspector").Session | "stopping" | undefined;
        let profilePath = "./profile.cpuprofile";

        const isMacOs = process.platform === "darwin";
        const isLinuxOrMacOs = process.platform === "linux" || isMacOs;

        const platform: string = _os.platform();
        const useCaseSensitiveFileNames = isFileSystemCaseSensitive();
        const fsRealpath = !!_fs.realpathSync.native ? process.platform === "win32" ? fsRealPathHandlingLongPath : _fs.realpathSync.native : _fs.realpathSync;

        // If our filename is "sys.js", then we are executing unbundled on the raw tsc output.
        // In that case, simulate a faked path in the directory where a bundle would normally
        // appear (e.g. the directory containing lib.*.d.ts files).
        //
        // Note that if we ever emit as files like cjs/mjs, this check will be wrong.
        const executingFilePath = __filename.endsWith("sys.js") ? _path.join(_path.dirname(__dirname), "__fake__.js") : __filename;

        const fsSupportsRecursiveFsWatch = process.platform === "win32" || isMacOs;
        const getCurrentDirectory = memoize(() => process.cwd());
        const { watchFile, watchDirectory } = createSystemWatchFunctions({
            pollingWatchFileWorker: fsWatchFileWorker,
            getModifiedTime,
            setTimeout,
            clearTimeout,
            fsWatchWorker,
            useCaseSensitiveFileNames,
            getCurrentDirectory,
            fileSystemEntryExists,
            // Node 4.0 `fs.watch` function supports the "recursive" option on both OSX and Windows
            // (ref: https://github.com/nodejs/node/pull/2649 and https://github.com/Microsoft/TypeScript/issues/4643)
            fsSupportsRecursiveFsWatch,
            getAccessibleSortedChildDirectories: path => getAccessibleFileSystemEntries(path).directories,
            realpath,
            tscWatchFile: process.env.TSC_WATCHFILE,
            useNonPollingWatchers: !!process.env.TSC_NONPOLLING_WATCHER,
            tscWatchDirectory: process.env.TSC_WATCHDIRECTORY,
            inodeWatching: isLinuxOrMacOs,
            fsWatchWithTimestamp: isMacOs,
            sysLog,
        });
        const nodeSystem: System = {
            args: process.argv.slice(2),
            newLine: _os.EOL,
            useCaseSensitiveFileNames,
            write(s: string): void {
                process.stdout.write(s);
            },
            getWidthOfTerminal() {
                return process.stdout.columns;
            },
            writeOutputIsTTY() {
                return process.stdout.isTTY;
            },
            readFile,
            writeFile,
            watchFile,
            watchDirectory,
            preferNonRecursiveWatch: !fsSupportsRecursiveFsWatch,
            resolvePath: path => _path.resolve(path),
            fileExists,
            directoryExists,
            getAccessibleFileSystemEntries,
            createDirectory(directoryName: string) {
                if (!nodeSystem.directoryExists(directoryName)) {
                    // Wrapped in a try-catch to prevent crashing if we are in a race
                    // with another copy of ourselves to create the same directory
                    try {
                        _fs.mkdirSync(directoryName);
                    }
                    catch (e) {
                        if (e.code !== "EEXIST") {
                            // Failed for some other reason (access denied?); still throw
                            throw e;
                        }
                    }
                }
            },
            getExecutingFilePath() {
                return executingFilePath;
            },
            getCurrentDirectory,
            getDirectories,
            getEnvironmentVariable(name: string) {
                return process.env[name] || "";
            },
            readDirectory,
            getModifiedTime,
            setModifiedTime,
            deleteFile,
            createHash: _crypto ? createSHA256Hash : generateDjb2Hash,
            createSHA256Hash: _crypto ? createSHA256Hash : undefined,
            getMemoryUsage() {
                if (global.gc) {
                    global.gc();
                }
                return process.memoryUsage().heapUsed;
            },
            getFileSize(path) {
                try {
                    const stat = statSync(path);
                    if (stat?.isFile()) {
                        return stat.size;
                    }
                }
                catch { /*ignore*/ }
                return 0;
            },
            exit(exitCode?: number): void {
                disableCPUProfiler(() => process.exit(exitCode));
            },
            enableCPUProfiler,
            disableCPUProfiler,
            cpuProfilingEnabled: () => !!activeSession || contains(process.execArgv, "--cpu-prof") || contains(process.execArgv, "--prof"),
            realpath,
            debugMode: !!process.env.NODE_INSPECTOR_IPC || !!process.env.VSCODE_INSPECTOR_OPTIONS || some(process.execArgv, arg => /^--(inspect|debug)(-brk)?(=\d+)?$/i.test(arg)) || !!(process as any).recordreplay,
            tryEnableSourceMapsForHost() {
                try {
                    (require("source-map-support") as typeof import("source-map-support")).install();
                }
                catch {
                    // Could not enable source maps.
                }
            },
            setTimeout,
            clearTimeout,
            clearScreen: () => {
                process.stdout.write("\x1B[2J\x1B[3J\x1B[H");
            },
            setBlocking: () => {
                const handle = (process.stdout as any)?._handle as { setBlocking?: (value: boolean) => void; };
                if (handle && handle.setBlocking) {
                    handle.setBlocking(true);
                }
            },
            base64decode: input => Buffer.from(input, "base64").toString("utf8"),
            base64encode: input => Buffer.from(input).toString("base64"),
            require: (baseDir, moduleName) => {
                try {
                    const modulePath = resolveJSModule(moduleName, baseDir, nodeSystem);
                    return { module: require(modulePath), modulePath, error: undefined };
                }
                catch (error) {
                    return { module: undefined, modulePath: undefined, error };
                }
            },
        };
        return nodeSystem;

        /**
         * `throwIfNoEntry` was added so recently that it's not in the node types.
         * This helper encapsulates the mitigating usage of `any`.
         * See https://github.com/nodejs/node/pull/33716
         */
        function statSync(path: string): import("fs").Stats | undefined {
            // throwIfNoEntry will be ignored by older versions of node
            return (_fs as any).statSync(path, { throwIfNoEntry: false });
        }

        /**
         * Uses the builtin inspector APIs to capture a CPU profile
         * See https://nodejs.org/api/inspector.html#inspector_example_usage for details
         */
        function enableCPUProfiler(path: string, cb: () => void) {
            if (activeSession) {
                cb();
                return false;
            }
            const inspector: typeof import("inspector") = require("inspector");
            if (!inspector || !inspector.Session) {
                cb();
                return false;
            }
            const session = new inspector.Session();
            session.connect();

            session.post("Profiler.enable", () => {
                session.post("Profiler.start", () => {
                    activeSession = session;
                    profilePath = path;
                    cb();
                });
            });
            return true;
        }

        /**
         * Strips non-TS paths from the profile, so users with private projects shouldn't
         * need to worry about leaking paths by submitting a cpu profile to us
         */
        function cleanupPaths(profile: import("inspector").Profiler.Profile) {
            let externalFileCounter = 0;
            const remappedPaths = new Map<string, string>();
            const normalizedDir = normalizeSlashes(_path.dirname(executingFilePath));
            // Windows rooted dir names need an extra `/` prepended to be valid file:/// urls
            const fileUrlRoot = `file://${getRootLength(normalizedDir) === 1 ? "" : "/"}${normalizedDir}`;
            for (const node of profile.nodes) {
                if (node.callFrame.url) {
                    const url = normalizeSlashes(node.callFrame.url);
                    if (containsPath(fileUrlRoot, url, useCaseSensitiveFileNames)) {
                        node.callFrame.url = getRelativePathToDirectoryOrUrl(fileUrlRoot, url, fileUrlRoot, createGetCanonicalFileName(useCaseSensitiveFileNames), /*isAbsolutePathAnUrl*/ true);
                    }
                    else if (!nativePattern.test(url)) {
                        node.callFrame.url = (remappedPaths.has(url) ? remappedPaths : remappedPaths.set(url, `external${externalFileCounter}.js`)).get(url)!;
                        externalFileCounter++;
                    }
                }
            }
            return profile;
        }

        function disableCPUProfiler(cb: () => void) {
            if (activeSession && activeSession !== "stopping") {
                const s = activeSession;
                activeSession.post("Profiler.stop", (err, { profile }) => {
                    if (!err) {
                        try {
                            if (statSync(profilePath)?.isDirectory()) {
                                profilePath = _path.join(profilePath, `${(new Date()).toISOString().replace(/:/g, "-")}+P${process.pid}.cpuprofile`);
                            }
                        }
                        catch {
                            // do nothing and ignore fallible fs operation
                        }
                        try {
                            _fs.mkdirSync(_path.dirname(profilePath), { recursive: true });
                        }
                        catch {
                            // do nothing and ignore fallible fs operation
                        }
                        _fs.writeFileSync(profilePath, JSON.stringify(cleanupPaths(profile)));
                    }
                    activeSession = undefined;
                    s.disconnect();
                    cb();
                });
                activeSession = "stopping";
                return true;
            }
            else {
                cb();
                return false;
            }
        }

        function isFileSystemCaseSensitive(): boolean {
            // win32\win64 are case insensitive platforms
            if (platform === "win32" || platform === "win64") {
                return false;
            }
            // If this file exists under a different case, we must be case-insensitve.
            return !fileExists(swapCase(__filename));
        }

        /** Convert all lowercase chars to uppercase, and vice-versa */
        function swapCase(s: string): string {
            return s.replace(/\w/g, ch => {
                const up = ch.toUpperCase();
                return ch === up ? ch.toLowerCase() : up;
            });
        }

        function fsWatchFileWorker(fileName: string, callback: FileWatcherCallback, pollingInterval: number): FileWatcher {
            _fs.watchFile(fileName, { persistent: true, interval: pollingInterval }, fileChanged);
            let eventKind: FileWatcherEventKind;
            return {
                close: () => _fs.unwatchFile(fileName, fileChanged),
            };

            function fileChanged(curr: import("fs").Stats, prev: import("fs").Stats) {
                // previous event kind check is to ensure we recongnize the file as previously also missing when it is restored or renamed twice (that is it disappears and reappears)
                // In such case, prevTime returned is same as prev time of event when file was deleted as per node documentation
                const isPreviouslyDeleted = +prev.mtime === 0 || eventKind === FileWatcherEventKind.Deleted;
                if (+curr.mtime === 0) {
                    if (isPreviouslyDeleted) {
                        // Already deleted file, no need to callback again
                        return;
                    }
                    eventKind = FileWatcherEventKind.Deleted;
                }
                else if (isPreviouslyDeleted) {
                    eventKind = FileWatcherEventKind.Created;
                }
                // If there is no change in modified time, ignore the event
                else if (+curr.mtime === +prev.mtime) {
                    return;
                }
                else {
                    // File changed
                    eventKind = FileWatcherEventKind.Changed;
                }
                callback(fileName, eventKind, curr.mtime);
            }
        }

        function fsWatchWorker(
            fileOrDirectory: string,
            recursive: boolean,
            callback: FsWatchCallback,
        ) {
            // Node 4.0 `fs.watch` function supports the "recursive" option on both OSX and Windows
            // (ref: https://github.com/nodejs/node/pull/2649 and https://github.com/Microsoft/TypeScript/issues/4643)
            return _fs.watch(
                fileOrDirectory,
                fsSupportsRecursiveFsWatch ?
                    { persistent: true, recursive: !!recursive } : { persistent: true },
                callback,
            );
        }

        function readFile(fileName: string, _encoding?: string): string | undefined {
            let buffer: Buffer;
            try {
                buffer = _fs.readFileSync(fileName);
            }
            catch (e) {
                return undefined;
            }
            let len = buffer.length;
            if (len >= 2 && buffer[0] === 0xFE && buffer[1] === 0xFF) {
                // Big endian UTF-16 byte order mark detected. Since big endian is not supported by node.js,
                // flip all byte pairs and treat as little endian.
                len &= ~1; // Round down to a multiple of 2
                for (let i = 0; i < len; i += 2) {
                    const temp = buffer[i];
                    buffer[i] = buffer[i + 1];
                    buffer[i + 1] = temp;
                }
                return buffer.toString("utf16le", 2);
            }
            if (len >= 2 && buffer[0] === 0xFF && buffer[1] === 0xFE) {
                // Little endian UTF-16 byte order mark detected
                return buffer.toString("utf16le", 2);
            }
            if (len >= 3 && buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
                // UTF-8 byte order mark detected
                return buffer.toString("utf8", 3);
            }
            // Default is UTF-8 with no byte order mark
            return buffer.toString("utf8");
        }

        function writeFile(fileName: string, data: string, writeByteOrderMark?: boolean): void {
            // If a BOM is required, emit one
            if (writeByteOrderMark) {
                data = byteOrderMarkIndicator + data;
            }

            let fd: number | undefined;

            try {
                fd = _fs.openSync(fileName, "w");
                _fs.writeSync(fd, data, /*position*/ undefined, "utf8");
            }
            finally {
                if (fd !== undefined) {
                    _fs.closeSync(fd);
                }
            }
        }

        function getAccessibleFileSystemEntries(path: string): FileSystemEntries {
            try {
                const entries = _fs.readdirSync(path || ".", { withFileTypes: true });
                const files: string[] = [];
                const directories: string[] = [];
                for (const dirent of entries) {
                    // withFileTypes is not supported before Node 10.10.
                    const entry = typeof dirent === "string" ? dirent : dirent.name;

                    // This is necessary because on some file system node fails to exclude
                    // "." and "..". See https://github.com/nodejs/node/issues/4002
                    if (entry === "." || entry === "..") {
                        continue;
                    }

                    let stat: any;
                    if (typeof dirent === "string" || dirent.isSymbolicLink()) {
                        const name = combinePaths(path, entry);

                        try {
                            stat = statSync(name);
                            if (!stat) {
                                continue;
                            }
                        }
                        catch (e) {
                            continue;
                        }
                    }
                    else {
                        stat = dirent;
                    }

                    if (stat.isFile()) {
                        files.push(entry);
                    }
                    else if (stat.isDirectory()) {
                        directories.push(entry);
                    }
                }
                files.sort();
                directories.sort();
                return { files, directories };
            }
            catch (e) {
                return emptyFileSystemEntries;
            }
        }

        function readDirectory(path: string, extensions?: readonly string[], excludes?: readonly string[], includes?: readonly string[], depth?: number): string[] {
            return matchFiles(path, extensions, excludes, includes, useCaseSensitiveFileNames, process.cwd(), depth, getAccessibleFileSystemEntries, realpath);
        }

        function fileSystemEntryExists(path: string, entryKind: FileSystemEntryKind): boolean {
            // Since the error thrown by fs.statSync isn't used, we can avoid collecting a stack trace to improve
            // the CPU time performance.
            const originalStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 0;

            try {
                const stat = statSync(path);
                if (!stat) {
                    return false;
                }
                switch (entryKind) {
                    case FileSystemEntryKind.File:
                        return stat.isFile();
                    case FileSystemEntryKind.Directory:
                        return stat.isDirectory();
                    default:
                        return false;
                }
            }
            catch (e) {
                return false;
            }
            finally {
                Error.stackTraceLimit = originalStackTraceLimit;
            }
        }

        function fileExists(path: string): boolean {
            return fileSystemEntryExists(path, FileSystemEntryKind.File);
        }

        function directoryExists(path: string): boolean {
            return fileSystemEntryExists(path, FileSystemEntryKind.Directory);
        }

        function getDirectories(path: string): string[] {
            return getAccessibleFileSystemEntries(path).directories.slice();
        }

        function fsRealPathHandlingLongPath(path: string): string {
            return path.length < 260 ? _fs.realpathSync.native(path) : _fs.realpathSync(path);
        }

        function realpath(path: string): string {
            try {
                return fsRealpath(path);
            }
            catch {
                return path;
            }
        }

        function getModifiedTime(path: string) {
            // Since the error thrown by fs.statSync isn't used, we can avoid collecting a stack trace to improve
            // the CPU time performance.
            const originalStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 0;
            try {
                return statSync(path)?.mtime;
            }
            catch (e) {
                return undefined;
            }
            finally {
                Error.stackTraceLimit = originalStackTraceLimit;
            }
        }

        function setModifiedTime(path: string, time: Date) {
            try {
                _fs.utimesSync(path, time, time);
            }
            catch (e) {
                return;
            }
        }

        function deleteFile(path: string) {
            try {
                return _fs.unlinkSync(path);
            }
            catch (e) {
                return;
            }
        }

        function createSHA256Hash(data: string): string {
            const hash = _crypto!.createHash("sha256");
            hash.update(data);
            return hash.digest("hex");
        }
    }

    let sys: System | undefined;
    if (isNodeLikeSystem()) {
        sys = getNodeSystem();
    }
    if (sys) {
        // patch writefile to create folder before writing the file
        patchWriteFileEnsuringDirectory(sys);
    }
    return sys!;
})();

/** @internal @knipignore */
export function setSys(s: System) {
    sys = s;
}

if (sys && sys.getEnvironmentVariable) {
    setCustomPollingValues(sys);
    Debug.setAssertionLevel(
        /^development$/i.test(sys.getEnvironmentVariable("NODE_ENV"))
            ? AssertionLevel.Normal
            : AssertionLevel.None,
    );
}
if (sys && sys.debugMode) {
    Debug.isDebugging = true;
}
