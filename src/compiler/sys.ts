declare function setTimeout(handler: (...args: any[]) => void, timeout: number): any;
declare function clearTimeout(handle: any): void;

namespace ts {
    /**
     * djb2 hashing algorithm
     * http://www.cse.yorku.ca/~oz/hash.html
     */
    /* @internal */
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
     */
    /* @internal */
    export function setStackTraceLimit() {
        if ((Error as any).stackTraceLimit < 100) { // Also tests that we won't set the property if it doesn't exist.
            (Error as any).stackTraceLimit = 100;
        }
    }

    export enum FileWatcherEventKind {
        Created,
        Changed,
        Deleted
    }

    export type FileWatcherCallback = (fileName: string, eventKind: FileWatcherEventKind) => void;
    export type DirectoryWatcherCallback = (fileName: string) => void;
    /*@internal*/
    export interface WatchedFile {
        readonly fileName: string;
        readonly callback: FileWatcherCallback;
        mtime: Date;
    }

    /* @internal */
    export enum PollingInterval {
        High = 2000,
        Medium = 500,
        Low = 250
    }

    /* @internal */
    export type HostWatchFile = (fileName: string, callback: FileWatcherCallback, pollingInterval: PollingInterval, options: WatchOptions | undefined) => FileWatcher;
    /* @internal */
    export type HostWatchDirectory = (fileName: string, callback: DirectoryWatcherCallback, recursive: boolean, options: WatchOptions | undefined) => FileWatcher;

    /* @internal */
    export const missingFileModifiedTime = new Date(0); // Any subsequent modification will occur after this time

    interface Levels {
        Low: number;
        Medium: number;
        High: number;
    }

    function createPollingIntervalBasedLevels(levels: Levels) {
        return {
            [PollingInterval.Low]: levels.Low,
            [PollingInterval.Medium]: levels.Medium,
            [PollingInterval.High]: levels.High
        };
    }

    const defaultChunkLevels: Levels = { Low: 32, Medium: 64, High: 256 };
    let pollingChunkSize = createPollingIntervalBasedLevels(defaultChunkLevels);
    /* @internal */
    export let unchangedPollThresholds = createPollingIntervalBasedLevels(defaultChunkLevels);

    /* @internal */
    export function setCustomPollingValues(system: System) {
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

    /* @internal */
    export function createDynamicPriorityPollingWatchFile(host: {
        getModifiedTime: NonNullable<System["getModifiedTime"]>;
        setTimeout: NonNullable<System["setTimeout"]>;
    }): HostWatchFile {
        interface WatchedFile extends ts.WatchedFile {
            isClosed?: boolean;
            unchangedPolls: number;
        }

        interface PollingIntervalQueue extends Array<WatchedFile> {
            pollingInterval: PollingInterval;
            pollIndex: number;
            pollScheduled: boolean;
        }

        const watchedFiles: WatchedFile[] = [];
        const changedFilesInLastPoll: WatchedFile[] = [];
        const lowPollingIntervalQueue = createPollingIntervalQueue(PollingInterval.Low);
        const mediumPollingIntervalQueue = createPollingIntervalQueue(PollingInterval.Medium);
        const highPollingIntervalQueue = createPollingIntervalQueue(PollingInterval.High);
        return watchFile;

        function watchFile(fileName: string, callback: FileWatcherCallback, defaultPollingInterval: PollingInterval): FileWatcher {
            const file: WatchedFile = {
                fileName,
                callback,
                unchangedPolls: 0,
                mtime: getModifiedTime(fileName)
            };
            watchedFiles.push(file);

            addToPollingIntervalQueue(file, defaultPollingInterval);
            return {
                close: () => {
                    file.isClosed = true;
                    // Remove from watchedFiles
                    unorderedRemoveItem(watchedFiles, file);
                    // Do not update polling interval queue since that will happen as part of polling
                }
            };
        }

        function createPollingIntervalQueue(pollingInterval: PollingInterval): PollingIntervalQueue {
            const queue = [] as WatchedFile[] as PollingIntervalQueue;
            queue.pollingInterval = pollingInterval;
            queue.pollIndex = 0;
            queue.pollScheduled = false;
            return queue;
        }

        function pollPollingIntervalQueue(queue: PollingIntervalQueue) {
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

        function pollLowPollingIntervalQueue(queue: PollingIntervalQueue) {
            // Always poll complete list of changedFilesInLastPoll
            pollQueue(changedFilesInLastPoll, PollingInterval.Low, /*pollIndex*/ 0, changedFilesInLastPoll.length);

            // Finally do the actual polling of the queue
            pollPollingIntervalQueue(queue);
            // Schedule poll if there are files in changedFilesInLastPoll but no files in the actual queue
            // as pollPollingIntervalQueue wont schedule for next poll
            if (!queue.pollScheduled && changedFilesInLastPoll.length) {
                scheduleNextPoll(PollingInterval.Low);
            }
        }

        function pollQueue(queue: (WatchedFile | undefined)[], pollingInterval: PollingInterval, pollIndex: number, chunkSize: number) {
            // Max visit would be all elements of the queue
            let needsVisit = queue.length;
            let definedValueCopyToIndex = pollIndex;
            for (let polled = 0; polled < chunkSize && needsVisit > 0; nextPollIndex(), needsVisit--) {
                const watchedFile = queue[pollIndex];
                if (!watchedFile) {
                    continue;
                }
                else if (watchedFile.isClosed) {
                    queue[pollIndex] = undefined;
                    continue;
                }

                polled++;
                const fileChanged = onWatchedFileStat(watchedFile, getModifiedTime(watchedFile.fileName));
                if (watchedFile.isClosed) {
                    // Closed watcher as part of callback
                    queue[pollIndex] = undefined;
                }
                else if (fileChanged) {
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
                        // There are holes from nextDefinedValueIndex to end of queue, change queue size
                        queue.length = definedValueCopyToIndex;
                    }
                    pollIndex = 0;
                    definedValueCopyToIndex = 0;
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

        function addToPollingIntervalQueue(file: WatchedFile, pollingInterval: PollingInterval) {
            pollingIntervalQueue(pollingInterval).push(file);
            scheduleNextPollIfNotAlreadyScheduled(pollingInterval);
        }

        function addChangedFileToLowPollingIntervalQueue(file: WatchedFile) {
            changedFilesInLastPoll.push(file);
            scheduleNextPollIfNotAlreadyScheduled(PollingInterval.Low);
        }

        function scheduleNextPollIfNotAlreadyScheduled(pollingInterval: PollingInterval) {
            if (!pollingIntervalQueue(pollingInterval).pollScheduled) {
                scheduleNextPoll(pollingInterval);
            }
        }

        function scheduleNextPoll(pollingInterval: PollingInterval) {
            pollingIntervalQueue(pollingInterval).pollScheduled = host.setTimeout(pollingInterval === PollingInterval.Low ? pollLowPollingIntervalQueue : pollPollingIntervalQueue, pollingInterval, pollingIntervalQueue(pollingInterval));
        }

        function getModifiedTime(fileName: string) {
            return host.getModifiedTime(fileName) || missingFileModifiedTime;
        }
    }

    function createUseFsEventsOnParentDirectoryWatchFile(fsWatch: FsWatch, useCaseSensitiveFileNames: boolean): HostWatchFile {
        // One file can have multiple watchers
        const fileWatcherCallbacks = createMultiMap<FileWatcherCallback>();
        const dirWatchers = createMap<DirectoryWatcher>();
        const toCanonicalName = createGetCanonicalFileName(useCaseSensitiveFileNames);
        return nonPollingWatchFile;

        function nonPollingWatchFile(fileName: string, callback: FileWatcherCallback, _pollingInterval: PollingInterval, fallbackOptions: WatchOptions | undefined): FileWatcher {
            const filePath = toCanonicalName(fileName);
            fileWatcherCallbacks.add(filePath, callback);
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
                }
            };
        }

        function createDirectoryWatcher(dirName: string, dirPath: string, fallbackOptions: WatchOptions | undefined) {
            const watcher = fsWatch(
                dirName,
                FileSystemEntryKind.Directory,
                (_eventName: string, relativeFileName) => {
                    // When files are deleted from disk, the triggered "rename" event would have a relativefileName of "undefined"
                    if (!isString(relativeFileName)) { return; }
                    const fileName = getNormalizedAbsolutePath(relativeFileName, dirName);
                    // Some applications save a working file via rename operations
                    const callbacks = fileName && fileWatcherCallbacks.get(toCanonicalName(fileName));
                    if (callbacks) {
                        for (const fileCallback of callbacks) {
                            fileCallback(fileName, FileWatcherEventKind.Changed);
                        }
                    }
                },
                /*recursive*/ false,
                PollingInterval.Medium,
                fallbackOptions
            ) as DirectoryWatcher;
            watcher.referenceCount = 0;
            dirWatchers.set(dirPath, watcher);
            return watcher;
        }
    }

    /* @internal */
    export function createSingleFileWatcherPerName(
        watchFile: HostWatchFile,
        useCaseSensitiveFileNames: boolean
    ): HostWatchFile {
        interface SingleFileWatcher {
            watcher: FileWatcher;
            refCount: number;
        }
        const cache = createMap<SingleFileWatcher>();
        const callbacksCache = createMultiMap<FileWatcherCallback>();
        const toCanonicalFileName = createGetCanonicalFileName(useCaseSensitiveFileNames);

        return (fileName, callback, pollingInterval, options) => {
            const path = toCanonicalFileName(fileName);
            const existing = cache.get(path);
            if (existing) {
                existing.refCount++;
            }
            else {
                cache.set(path, {
                    watcher: watchFile(
                        fileName,
                        (fileName, eventKind) => forEach(
                            callbacksCache.get(path),
                            cb => cb(fileName, eventKind)
                        ),
                        pollingInterval,
                        options
                    ),
                    refCount: 1
                });
            }
            callbacksCache.add(path, callback);

            return {
                close: () => {
                    const watcher = Debug.checkDefined(cache.get(path));
                    callbacksCache.remove(path, callback);
                    watcher.refCount--;
                    if (watcher.refCount) return;
                    cache.delete(path);
                    closeFileWatcherOf(watcher);
                }
            };
        };
    }

    /**
     * Returns true if file status changed
     */
    /*@internal*/
    export function onWatchedFileStat(watchedFile: WatchedFile, modifiedTime: Date): boolean {
        const oldTime = watchedFile.mtime.getTime();
        const newTime = modifiedTime.getTime();
        if (oldTime !== newTime) {
            watchedFile.mtime = modifiedTime;
            watchedFile.callback(watchedFile.fileName, getFileWatcherEventKind(oldTime, newTime));
            return true;
        }

        return false;
    }

    /*@internal*/
    export function getFileWatcherEventKind(oldTime: number, newTime: number) {
        return oldTime === 0
            ? FileWatcherEventKind.Created
            : newTime === 0
                ? FileWatcherEventKind.Deleted
                : FileWatcherEventKind.Changed;
    }

    /*@internal*/
    export const ignoredPaths = ["/node_modules/.", "/.git", "/.#"];

    /*@internal*/
    export let sysLog: (s: string) => void = noop; // eslint-disable-line prefer-const

    /*@internal*/
    export function setSysLog(logger: typeof sysLog) {
        sysLog = logger;
    }

    /*@internal*/
    export interface RecursiveDirectoryWatcherHost {
        watchDirectory: HostWatchDirectory;
        useCaseSensitiveFileNames: boolean;
        getAccessibleSortedChildDirectories(path: string): readonly string[];
        directoryExists(dir: string): boolean;
        realpath(s: string): string;
        setTimeout: NonNullable<System["setTimeout"]>;
        clearTimeout: NonNullable<System["clearTimeout"]>;
    }

    /**
     * Watch the directory recursively using host provided method to watch child directories
     * that means if this is recursive watcher, watch the children directories as well
     * (eg on OS that dont support recursive watch using fs.watch use fs.watchFile)
     */
    /*@internal*/
    export function createDirectoryWatcherSupportingRecursive(host: RecursiveDirectoryWatcherHost): HostWatchDirectory {
        interface ChildDirectoryWatcher extends FileWatcher {
            dirName: string;
        }
        type ChildWatches = readonly ChildDirectoryWatcher[];
        interface HostDirectoryWatcher {
            watcher: FileWatcher;
            childWatches: ChildWatches;
            refCount: number;
        }

        const cache = createMap<HostDirectoryWatcher>();
        const callbackCache = createMultiMap<{ dirName: string; callback: DirectoryWatcherCallback; }>();
        const cacheToUpdateChildWatches = createMap<{ dirName: string; options: WatchOptions | undefined; }>();
        let timerToUpdateChildWatches: any;

        const filePathComparer = getStringComparer(!host.useCaseSensitiveFileNames);
        const toCanonicalFilePath = createGetCanonicalFileName(host.useCaseSensitiveFileNames);

        return (dirName, callback, recursive, options) => recursive ?
            createDirectoryWatcher(dirName, options, callback) :
            host.watchDirectory(dirName, callback, recursive, options);

        /**
         * Create the directory watcher for the dirPath.
         */
        function createDirectoryWatcher(dirName: string, options: WatchOptions | undefined, callback?: DirectoryWatcherCallback): ChildDirectoryWatcher {
            const dirPath = toCanonicalFilePath(dirName) as Path;
            let directoryWatcher = cache.get(dirPath);
            if (directoryWatcher) {
                directoryWatcher.refCount++;
            }
            else {
                directoryWatcher = {
                    watcher: host.watchDirectory(dirName, fileName => {
                        if (isIgnoredPath(fileName)) return;

                        if (options?.synchronousWatchDirectory) {
                            // Call the actual callback
                            invokeCallbacks(dirPath, fileName);

                            // Iterate through existing children and update the watches if needed
                            updateChildWatches(dirName, dirPath, options);
                        }
                        else {
                            nonSyncUpdateChildWatches(dirName, dirPath, fileName, options);
                        }
                    }, /*recursive*/ false, options),
                    refCount: 1,
                    childWatches: emptyArray
                };
                cache.set(dirPath, directoryWatcher);
                updateChildWatches(dirName, dirPath, options);
            }

            const callbackToAdd = callback && { dirName, callback };
            if (callbackToAdd) {
                callbackCache.add(dirPath, callbackToAdd);
            }

            return {
                dirName,
                close: () => {
                    const directoryWatcher = Debug.checkDefined(cache.get(dirPath));
                    if (callbackToAdd) callbackCache.remove(dirPath, callbackToAdd);
                    directoryWatcher.refCount--;

                    if (directoryWatcher.refCount) return;

                    cache.delete(dirPath);
                    closeFileWatcherOf(directoryWatcher);
                    directoryWatcher.childWatches.forEach(closeFileWatcher);
                }
            };
        }

        function invokeCallbacks(dirPath: Path, fileNameOrInvokeMap: string | Map<true>) {
            let fileName: string | undefined;
            let invokeMap: Map<true> | undefined;
            if (isString(fileNameOrInvokeMap)) {
                fileName = fileNameOrInvokeMap;
            }
            else {
                invokeMap = fileNameOrInvokeMap;
            }
            // Call the actual callback
            callbackCache.forEach((callbacks, rootDirName) => {
                if (invokeMap && invokeMap.has(rootDirName)) return;
                if (rootDirName === dirPath || (startsWith(dirPath, rootDirName) && dirPath[rootDirName.length] === directorySeparator)) {
                    if (invokeMap) {
                        invokeMap.set(rootDirName, true);
                    }
                    else {
                        callbacks.forEach(({ callback }) => callback(fileName!));
                    }
                }
            });
        }

        function nonSyncUpdateChildWatches(dirName: string, dirPath: Path, fileName: string, options: WatchOptions | undefined) {
            // Iterate through existing children and update the watches if needed
            const parentWatcher = cache.get(dirPath);
            if (parentWatcher && host.directoryExists(dirName)) {
                // Schedule the update and postpone invoke for callbacks
                scheduleUpdateChildWatches(dirName, dirPath, options);
                return;
            }

            // Call the actual callbacks and remove child watches
            invokeCallbacks(dirPath, fileName);
            removeChildWatches(parentWatcher);
        }

        function scheduleUpdateChildWatches(dirName: string, dirPath: Path, options: WatchOptions | undefined) {
            if (!cacheToUpdateChildWatches.has(dirPath)) {
                cacheToUpdateChildWatches.set(dirPath, { dirName, options });
            }
            if (timerToUpdateChildWatches) {
                host.clearTimeout(timerToUpdateChildWatches);
                timerToUpdateChildWatches = undefined;
            }
            timerToUpdateChildWatches = host.setTimeout(onTimerToUpdateChildWatches, 1000);
        }

        function onTimerToUpdateChildWatches() {
            timerToUpdateChildWatches = undefined;
            sysLog(`sysLog:: onTimerToUpdateChildWatches:: ${cacheToUpdateChildWatches.size}`);
            const start = timestamp();
            const invokeMap = createMap<true>();

            while (!timerToUpdateChildWatches && cacheToUpdateChildWatches.size) {
                const { value: [dirPath, { dirName, options }], done } = cacheToUpdateChildWatches.entries().next();
                Debug.assert(!done);
                cacheToUpdateChildWatches.delete(dirPath);
                // Because the child refresh is fresh, we would need to invalidate whole root directory being watched
                // to ensure that all the changes are reflected at this time
                invokeCallbacks(dirPath as Path, invokeMap);
                updateChildWatches(dirName, dirPath as Path, options);
            }

            sysLog(`sysLog:: invokingWatchers:: ${timestamp() - start}ms:: ${cacheToUpdateChildWatches.size}`);
            callbackCache.forEach((callbacks, rootDirName) => {
                if (invokeMap.has(rootDirName)) {
                    callbacks.forEach(({ callback, dirName }) => callback(dirName));
                }
            });

            const elapsed = timestamp() - start;
            sysLog(`sysLog:: Elapsed ${elapsed}ms:: onTimerToUpdateChildWatches:: ${cacheToUpdateChildWatches.size} ${timerToUpdateChildWatches}`);
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

        function updateChildWatches(dirName: string, dirPath: Path, options: WatchOptions | undefined) {
            // Iterate through existing children and update the watches if needed
            const parentWatcher = cache.get(dirPath);
            if (parentWatcher) {
                parentWatcher.childWatches = watchChildDirectories(dirName, parentWatcher.childWatches, options);
            }
        }

        /**
         * Watch the directories in the parentDir
         */
        function watchChildDirectories(parentDir: string, existingChildWatches: ChildWatches, options: WatchOptions | undefined): ChildWatches {
            let newChildWatches: ChildDirectoryWatcher[] | undefined;
            enumerateInsertsAndDeletes<string, ChildDirectoryWatcher>(
                host.directoryExists(parentDir) ? mapDefined(host.getAccessibleSortedChildDirectories(parentDir), child => {
                    const childFullName = getNormalizedAbsolutePath(child, parentDir);
                    // Filter our the symbolic link directories since those arent included in recursive watch
                    // which is same behaviour when recursive: true is passed to fs.watch
                    return !isIgnoredPath(childFullName) && filePathComparer(childFullName, normalizePath(host.realpath(childFullName))) === Comparison.EqualTo ? childFullName : undefined;
                }) : emptyArray,
                existingChildWatches,
                (child, childWatcher) => filePathComparer(child, childWatcher.dirName),
                createAndAddChildDirectoryWatcher,
                closeFileWatcher,
                addChildDirectoryWatcher
            );

            return newChildWatches || emptyArray;

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

        function isIgnoredPath(path: string) {
            return some(ignoredPaths, searchPath => isInPath(path, searchPath));
        }

        function isInPath(path: string, searchPath: string) {
            if (stringContains(path, searchPath)) return true;
            if (host.useCaseSensitiveFileNames) return false;
            return stringContains(toCanonicalFilePath(path), searchPath);
        }
    }

    /*@internal*/
    export type FsWatchCallback = (eventName: "rename" | "change", relativeFileName: string | undefined) => void;
    /*@internal*/
    export type FsWatch = (fileOrDirectory: string, entryKind: FileSystemEntryKind, callback: FsWatchCallback, recursive: boolean, fallbackPollingInterval: PollingInterval, fallbackOptions: WatchOptions | undefined) => FileWatcher;

    /*@internal*/
    export const enum FileSystemEntryKind {
        File,
        Directory,
    }

    /*@internal*/
    export function createFileWatcherCallback(callback: FsWatchCallback): FileWatcherCallback {
        return (_fileName, eventKind) => callback(eventKind === FileWatcherEventKind.Changed ? "change" : "rename", "");
    }

    function createFsWatchCallbackForFileWatcherCallback(
        fileName: string,
        callback: FileWatcherCallback,
        fileExists: System["fileExists"]
    ): FsWatchCallback {
        return eventName => {
            if (eventName === "rename") {
                callback(fileName, fileExists(fileName) ? FileWatcherEventKind.Created : FileWatcherEventKind.Deleted);
            }
            else {
                // Change
                callback(fileName, FileWatcherEventKind.Changed);
            }
        };
    }

    function createFsWatchCallbackForDirectoryWatcherCallback(directoryName: string, callback: DirectoryWatcherCallback): FsWatchCallback {
        return (eventName, relativeFileName) => {
            // In watchDirectory we only care about adding and removing files (when event name is
            // "rename"); changes made within files are handled by corresponding fileWatchers (when
            // event name is "change")
            if (eventName === "rename") {
                // When deleting a file, the passed baseFileName is null
                callback(!relativeFileName ? directoryName : normalizePath(combinePaths(directoryName, relativeFileName)));
            }
        };
    }

    /*@internal*/
    export interface CreateSystemWatchFunctions {
        // Polling watch file
        pollingWatchFile: HostWatchFile;
        // For dynamic polling watch file
        getModifiedTime: NonNullable<System["getModifiedTime"]>;
        setTimeout: NonNullable<System["setTimeout"]>;
        clearTimeout: NonNullable<System["clearTimeout"]>;
        // For fs events :
        fsWatch: FsWatch;
        fileExists: System["fileExists"];
        useCaseSensitiveFileNames: boolean;
        fsSupportsRecursiveFsWatch: boolean;
        directoryExists: System["directoryExists"];
        getAccessibleSortedChildDirectories(path: string): readonly string[];
        realpath(s: string): string;
        // For backward compatibility environment variables
        tscWatchFile: string | undefined;
        useNonPollingWatchers?: boolean;
        tscWatchDirectory: string | undefined;
    }

    /*@internal*/
    export function createSystemWatchFunctions({
        pollingWatchFile,
        getModifiedTime,
        setTimeout,
        clearTimeout,
        fsWatch,
        fileExists,
        useCaseSensitiveFileNames,
        fsSupportsRecursiveFsWatch,
        directoryExists,
        getAccessibleSortedChildDirectories,
        realpath,
        tscWatchFile,
        useNonPollingWatchers,
        tscWatchDirectory,
    }: CreateSystemWatchFunctions): { watchFile: HostWatchFile; watchDirectory: HostWatchDirectory; } {
        let dynamicPollingWatchFile: HostWatchFile | undefined;
        let nonPollingWatchFile: HostWatchFile | undefined;
        let hostRecursiveDirectoryWatcher: HostWatchDirectory | undefined;
        return {
            watchFile,
            watchDirectory
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
                case WatchFileKind.UseFsEvents:
                    return fsWatch(
                        fileName,
                        FileSystemEntryKind.File,
                        createFsWatchCallbackForFileWatcherCallback(fileName, callback, fileExists),
                        /*recursive*/ false,
                        pollingInterval,
                        getFallbackOptions(options)
                    );
                case WatchFileKind.UseFsEventsOnParentDirectory:
                    if (!nonPollingWatchFile) {
                        nonPollingWatchFile = createUseFsEventsOnParentDirectoryWatchFile(fsWatch, useCaseSensitiveFileNames);
                    }
                    return nonPollingWatchFile(fileName, callback, pollingInterval, getFallbackOptions(options));
                default:
                    Debug.assertNever(watchFileKind);
            }
        }

        function ensureDynamicPollingWatchFile() {
            return dynamicPollingWatchFile ||
                (dynamicPollingWatchFile = createDynamicPriorityPollingWatchFile({ getModifiedTime, setTimeout }));
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
                        // Default to do not use fixed polling interval
                        { watchFile: WatchFileKind.FixedPollingInterval };
            }
        }

        function generateWatchFileOptions(
            watchFile: WatchFileKind,
            fallbackPolling: PollingWatchKind,
            options: WatchOptions | undefined
        ): WatchOptions {
            const defaultFallbackPolling = options?.fallbackPolling;
            return {
                watchFile,
                fallbackPolling: defaultFallbackPolling === undefined ?
                    fallbackPolling :
                    defaultFallbackPolling
            };
        }

        function watchDirectory(directoryName: string, callback: DirectoryWatcherCallback, recursive: boolean, options: WatchOptions | undefined): FileWatcher {
            if (fsSupportsRecursiveFsWatch) {
                return fsWatch(
                    directoryName,
                    FileSystemEntryKind.Directory,
                    createFsWatchCallbackForDirectoryWatcherCallback(directoryName, callback),
                    recursive,
                    PollingInterval.Medium,
                    getFallbackOptions(options)
                );
            }

            if (!hostRecursiveDirectoryWatcher) {
                hostRecursiveDirectoryWatcher = createDirectoryWatcherSupportingRecursive({
                    useCaseSensitiveFileNames,
                    directoryExists,
                    getAccessibleSortedChildDirectories,
                    watchDirectory: nonRecursiveWatchDirectory,
                    realpath,
                    setTimeout,
                    clearTimeout
                });
            }
            return hostRecursiveDirectoryWatcher(directoryName, callback, recursive, options);
        }

        function nonRecursiveWatchDirectory(directoryName: string, callback: DirectoryWatcherCallback, recursive: boolean, options: WatchOptions | undefined): FileWatcher {
            Debug.assert(!recursive);
            options = updateOptionsForWatchDirectory(options);
            const watchDirectoryKind = Debug.checkDefined(options.watchDirectory);
            switch (watchDirectoryKind) {
                case WatchDirectoryKind.FixedPollingInterval:
                    return pollingWatchFile(
                        directoryName,
                        () => callback(directoryName),
                        PollingInterval.Medium,
                        /*options*/ undefined
                    );
                case WatchDirectoryKind.DynamicPriorityPolling:
                    return ensureDynamicPollingWatchFile()(
                        directoryName,
                        () => callback(directoryName),
                        PollingInterval.Medium,
                        /*options*/ undefined
                    );
                case WatchDirectoryKind.UseFsEvents:
                    return fsWatch(
                        directoryName,
                        FileSystemEntryKind.Directory,
                        createFsWatchCallbackForDirectoryWatcherCallback(directoryName, callback),
                        recursive,
                        PollingInterval.Medium,
                        getFallbackOptions(options)
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
                            undefined
                    };
            }
        }
    }

    /**
     * patch writefile to create folder before writing the file
     */
    /*@internal*/
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
                path => sys.directoryExists(path));
    }

    /*@internal*/
    export type BufferEncoding = "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex";

    /*@internal*/
    interface NodeBuffer extends Uint8Array {
        constructor: any;
        write(str: string, encoding?: BufferEncoding): number;
        write(str: string, offset: number, encoding?: BufferEncoding): number;
        write(str: string, offset: number, length: number, encoding?: BufferEncoding): number;
        toString(encoding?: string, start?: number, end?: number): string;
        toJSON(): { type: "Buffer"; data: number[] };
        equals(otherBuffer: Uint8Array): boolean;
        compare(
            otherBuffer: Uint8Array,
            targetStart?: number,
            targetEnd?: number,
            sourceStart?: number,
            sourceEnd?: number
        ): number;
        copy(targetBuffer: Uint8Array, targetStart?: number, sourceStart?: number, sourceEnd?: number): number;
        slice(begin?: number, end?: number): Buffer;
        subarray(begin?: number, end?: number): Buffer;
        writeUIntLE(value: number, offset: number, byteLength: number): number;
        writeUIntBE(value: number, offset: number, byteLength: number): number;
        writeIntLE(value: number, offset: number, byteLength: number): number;
        writeIntBE(value: number, offset: number, byteLength: number): number;
        readUIntLE(offset: number, byteLength: number): number;
        readUIntBE(offset: number, byteLength: number): number;
        readIntLE(offset: number, byteLength: number): number;
        readIntBE(offset: number, byteLength: number): number;
        readUInt8(offset: number): number;
        readUInt16LE(offset: number): number;
        readUInt16BE(offset: number): number;
        readUInt32LE(offset: number): number;
        readUInt32BE(offset: number): number;
        readInt8(offset: number): number;
        readInt16LE(offset: number): number;
        readInt16BE(offset: number): number;
        readInt32LE(offset: number): number;
        readInt32BE(offset: number): number;
        readFloatLE(offset: number): number;
        readFloatBE(offset: number): number;
        readDoubleLE(offset: number): number;
        readDoubleBE(offset: number): number;
        reverse(): this;
        swap16(): Buffer;
        swap32(): Buffer;
        swap64(): Buffer;
        writeUInt8(value: number, offset: number): number;
        writeUInt16LE(value: number, offset: number): number;
        writeUInt16BE(value: number, offset: number): number;
        writeUInt32LE(value: number, offset: number): number;
        writeUInt32BE(value: number, offset: number): number;
        writeInt8(value: number, offset: number): number;
        writeInt16LE(value: number, offset: number): number;
        writeInt16BE(value: number, offset: number): number;
        writeInt32LE(value: number, offset: number): number;
        writeInt32BE(value: number, offset: number): number;
        writeFloatLE(value: number, offset: number): number;
        writeFloatBE(value: number, offset: number): number;
        writeDoubleLE(value: number, offset: number): number;
        writeDoubleBE(value: number, offset: number): number;
        readBigUInt64BE?(offset?: number): bigint;
        readBigUInt64LE?(offset?: number): bigint;
        readBigInt64BE?(offset?: number): bigint;
        readBigInt64LE?(offset?: number): bigint;
        writeBigInt64BE?(value: bigint, offset?: number): number;
        writeBigInt64LE?(value: bigint, offset?: number): number;
        writeBigUInt64BE?(value: bigint, offset?: number): number;
        writeBigUInt64LE?(value: bigint, offset?: number): number;
        fill(value: string | Uint8Array | number, offset?: number, end?: number, encoding?: BufferEncoding): this;
        indexOf(value: string | number | Uint8Array, byteOffset?: number, encoding?: BufferEncoding): number;
        lastIndexOf(value: string | number | Uint8Array, byteOffset?: number, encoding?: BufferEncoding): number;
        entries(): IterableIterator<[number, number]>;
        includes(value: string | number | Buffer, byteOffset?: number, encoding?: BufferEncoding): boolean;
        keys(): IterableIterator<number>;
        values(): IterableIterator<number>;
    }

    /*@internal*/
    interface Buffer extends NodeBuffer { }

    // TODO: GH#18217 Methods on System are often used as if they are certainly defined
    export interface System {
        args: string[];
        newLine: string;
        useCaseSensitiveFileNames: boolean;
        write(s: string): void;
        writeOutputIsTTY?(): boolean;
        readFile(path: string, encoding?: string): string | undefined;
        getFileSize?(path: string): number;
        writeFile(path: string, data: string, writeByteOrderMark?: boolean): void;

        /**
         * @pollingInterval - this parameter is used in polling-based watchers and ignored in watchers that
         * use native OS file watching
         */
        watchFile?(path: string, callback: FileWatcherCallback, pollingInterval?: number, options?: WatchOptions): FileWatcher;
        watchDirectory?(path: string, callback: DirectoryWatcherCallback, recursive?: boolean, options?: WatchOptions): FileWatcher;
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
        /*@internal*/ enableCPUProfiler?(path: string, continuation: () => void): boolean;
        /*@internal*/ disableCPUProfiler?(continuation: () => void): boolean;
        realpath?(path: string): string;
        /*@internal*/ getEnvironmentVariable(name: string): string;
        /*@internal*/ tryEnableSourceMapsForHost?(): void;
        /*@internal*/ debugMode?: boolean;
        setTimeout?(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
        clearTimeout?(timeoutId: any): void;
        clearScreen?(): void;
        /*@internal*/ setBlocking?(): void;
        base64decode?(input: string): string;
        base64encode?(input: string): string;
        /*@internal*/ bufferFrom?(input: string, encoding?: string): Buffer;
        // For testing
        /*@internal*/ now?(): Date;
        /*@internal*/ require?(baseDir: string, moduleName: string): RequireResult;
    }

    export interface FileWatcher {
        close(): void;
    }

    interface DirectoryWatcher extends FileWatcher {
        referenceCount: number;
    }

    declare const require: any;
    declare const process: any;
    declare const global: any;
    declare const __filename: string;
    declare const __dirname: string;

    export function getNodeMajorVersion(): number | undefined {
        if (typeof process === "undefined") {
            return undefined;
        }
        const version: string = process.version;
        if (!version) {
            return undefined;
        }
        const dot = version.indexOf(".");
        if (dot === -1) {
            return undefined;
        }
        return parseInt(version.substring(1, dot));
    }

    // TODO: GH#18217 this is used as if it's certainly defined in many places.
    // eslint-disable-next-line prefer-const
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

            const Buffer: {
                new (input: string, encoding?: string): any;
                from?(input: string, encoding?: string): any;
            } = require("buffer").Buffer;

            const nodeVersion = getNodeMajorVersion();
            const isNode4OrLater = nodeVersion! >= 4;
            const isLinuxOrMacOs = process.platform === "linux" || process.platform === "darwin";

            const platform: string = _os.platform();
            const useCaseSensitiveFileNames = isFileSystemCaseSensitive();
            const fsSupportsRecursiveFsWatch = isNode4OrLater && (process.platform === "win32" || process.platform === "darwin");
            const { watchFile, watchDirectory } = createSystemWatchFunctions({
                pollingWatchFile: createSingleFileWatcherPerName(fsWatchFileWorker, useCaseSensitiveFileNames),
                getModifiedTime,
                setTimeout,
                clearTimeout,
                fsWatch,
                useCaseSensitiveFileNames,
                fileExists,
                // Node 4.0 `fs.watch` function supports the "recursive" option on both OSX and Windows
                // (ref: https://github.com/nodejs/node/pull/2649 and https://github.com/Microsoft/TypeScript/issues/4643)
                fsSupportsRecursiveFsWatch,
                directoryExists,
                getAccessibleSortedChildDirectories: path => getAccessibleFileSystemEntries(path).directories,
                realpath,
                tscWatchFile: process.env.TSC_WATCHFILE,
                useNonPollingWatchers: process.env.TSC_NONPOLLING_WATCHER,
                tscWatchDirectory: process.env.TSC_WATCHDIRECTORY,
            });
            const nodeSystem: System = {
                args: process.argv.slice(2),
                newLine: _os.EOL,
                useCaseSensitiveFileNames,
                write(s: string): void {
                    process.stdout.write(s);
                },
                writeOutputIsTTY() {
                    return process.stdout.isTTY;
                },
                readFile,
                writeFile,
                watchFile,
                watchDirectory,
                resolvePath: path => _path.resolve(path),
                fileExists,
                directoryExists,
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
                    return __filename;
                },
                getCurrentDirectory() {
                    return process.cwd();
                },
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
                        const stat = _fs.statSync(path);
                        if (stat.isFile()) {
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
                realpath,
                debugMode: !!process.env.NODE_INSPECTOR_IPC || some(<string[]>process.execArgv, arg => /^--(inspect|debug)(-brk)?(=\d+)?$/i.test(arg)),
                tryEnableSourceMapsForHost() {
                    try {
                        require("source-map-support").install();
                    }
                    catch {
                        // Could not enable source maps.
                    }
                },
                setTimeout,
                clearTimeout,
                clearScreen: () => {
                    process.stdout.write("\x1Bc");
                },
                setBlocking: () => {
                    if (process.stdout && process.stdout._handle && process.stdout._handle.setBlocking) {
                        process.stdout._handle.setBlocking(true);
                    }
                },
                bufferFrom,
                base64decode: input => bufferFrom(input, "base64").toString("utf8"),
                base64encode: input => bufferFrom(input).toString("base64"),
                require: (baseDir, moduleName) => {
                    try {
                        const modulePath = resolveJSModule(moduleName, baseDir, nodeSystem);
                        return { module: require(modulePath), modulePath, error: undefined };
                    }
                    catch (error) {
                        return { module: undefined, modulePath: undefined, error };
                    }
                }
            };
            return nodeSystem;

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
                const remappedPaths = createMap<string>();
                const normalizedDir = normalizeSlashes(__dirname);
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
                                if (_fs.statSync(profilePath).isDirectory()) {
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

            function bufferFrom(input: string, encoding?: string): Buffer {
                // See https://github.com/Microsoft/TypeScript/issues/25652
                return Buffer.from && (Buffer.from as Function) !== Int8Array.from
                    ? Buffer.from(input, encoding)
                    : new Buffer(input, encoding);
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
                return s.replace(/\w/g, (ch) => {
                    const up = ch.toUpperCase();
                    return ch === up ? ch.toLowerCase() : up;
                });
            }

            function fsWatchFileWorker(fileName: string, callback: FileWatcherCallback, pollingInterval: number): FileWatcher {
                _fs.watchFile(fileName, { persistent: true, interval: pollingInterval }, fileChanged);
                let eventKind: FileWatcherEventKind;
                return {
                    close: () => _fs.unwatchFile(fileName, fileChanged)
                };

                function fileChanged(curr: any, prev: any) {
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
                    callback(fileName, eventKind);
                }
            }

            function fsWatch(
                fileOrDirectory: string,
                entryKind: FileSystemEntryKind,
                callback: FsWatchCallback,
                recursive: boolean,
                fallbackPollingInterval: PollingInterval,
                fallbackOptions: WatchOptions | undefined
            ): FileWatcher {
                let options: any;
                let lastDirectoryPartWithDirectorySeparator: string | undefined;
                let lastDirectoryPart: string | undefined;
                if (isLinuxOrMacOs) {
                    lastDirectoryPartWithDirectorySeparator = fileOrDirectory.substr(fileOrDirectory.lastIndexOf(directorySeparator));
                    lastDirectoryPart = lastDirectoryPartWithDirectorySeparator.slice(directorySeparator.length);
                }
                /** Watcher for the file system entry depending on whether it is missing or present */
                let watcher = !fileSystemEntryExists(fileOrDirectory, entryKind) ?
                    watchMissingFileSystemEntry() :
                    watchPresentFileSystemEntry();
                return {
                    close: () => {
                        // Close the watcher (either existing file system entry watcher or missing file system entry watcher)
                        watcher.close();
                        watcher = undefined!;
                    }
                };

                /**
                 * Invoke the callback with rename and update the watcher if not closed
                 * @param createWatcher
                 */
                function invokeCallbackAndUpdateWatcher(createWatcher: () => FileWatcher) {
                    sysLog(`sysLog:: ${fileOrDirectory}:: Changing watcher to ${createWatcher === watchPresentFileSystemEntry ? "Present" : "Missing"}FileSystemEntryWatcher`);
                    // Call the callback for current directory
                    callback("rename", "");

                    // If watcher is not closed, update it
                    if (watcher) {
                        watcher.close();
                        watcher = createWatcher();
                    }
                }

                /**
                 * Watch the file or directory that is currently present
                 * and when the watched file or directory is deleted, switch to missing file system entry watcher
                 */
                function watchPresentFileSystemEntry(): FileWatcher {
                    // Node 4.0 `fs.watch` function supports the "recursive" option on both OSX and Windows
                    // (ref: https://github.com/nodejs/node/pull/2649 and https://github.com/Microsoft/TypeScript/issues/4643)
                    if (options === undefined) {
                        if (fsSupportsRecursiveFsWatch) {
                            options = { persistent: true, recursive: !!recursive };
                        }
                        else {
                            options = { persistent: true };
                        }
                    }
                    try {
                        const presentWatcher = _fs.watch(
                            fileOrDirectory,
                            options,
                            isLinuxOrMacOs ?
                                callbackChangingToMissingFileSystemEntry :
                                callback
                        );
                        // Watch the missing file or directory or error
                        presentWatcher.on("error", () => invokeCallbackAndUpdateWatcher(watchMissingFileSystemEntry));
                        return presentWatcher;
                    }
                    catch (e) {
                        // Catch the exception and use polling instead
                        // Eg. on linux the number of watches are limited and one could easily exhaust watches and the exception ENOSPC is thrown when creating watcher at that point
                        // so instead of throwing error, use fs.watchFile
                        return watchPresentFileSystemEntryWithFsWatchFile();
                    }
                }

                function callbackChangingToMissingFileSystemEntry(event: "rename" | "change", relativeName: string | undefined) {
                    // because relativeName is not guaranteed to be correct we need to check on each rename with few combinations
                    // Eg on ubuntu while watching app/node_modules the relativeName is "node_modules" which is neither relative nor full path
                    return event === "rename" &&
                        (!relativeName ||
                            relativeName === lastDirectoryPart ||
                            relativeName.lastIndexOf(lastDirectoryPartWithDirectorySeparator!) === relativeName.length - lastDirectoryPartWithDirectorySeparator!.length) &&
                        !fileSystemEntryExists(fileOrDirectory, entryKind) ?
                        invokeCallbackAndUpdateWatcher(watchMissingFileSystemEntry) :
                        callback(event, relativeName);
                }

                /**
                 * Watch the file or directory using fs.watchFile since fs.watch threw exception
                 * Eg. on linux the number of watches are limited and one could easily exhaust watches and the exception ENOSPC is thrown when creating watcher at that point
                 */
                function watchPresentFileSystemEntryWithFsWatchFile(): FileWatcher {
                    sysLog(`sysLog:: ${fileOrDirectory}:: Changing to fsWatchFile`);
                    return watchFile(
                        fileOrDirectory,
                        createFileWatcherCallback(callback),
                        fallbackPollingInterval,
                        fallbackOptions
                    );
                }

                /**
                 * Watch the file or directory that is missing
                 * and switch to existing file or directory when the missing filesystem entry is created
                 */
                function watchMissingFileSystemEntry(): FileWatcher {
                    return watchFile(
                        fileOrDirectory,
                        (_fileName, eventKind) => {
                            if (eventKind === FileWatcherEventKind.Created && fileSystemEntryExists(fileOrDirectory, entryKind)) {
                                // Call the callback for current file or directory
                                // For now it could be callback for the inner directory creation,
                                // but just return current directory, better than current no-op
                                invokeCallbackAndUpdateWatcher(watchPresentFileSystemEntry);
                            }
                        },
                        fallbackPollingInterval,
                        fallbackOptions
                    );
                }
            }

            function readFileWorker(fileName: string, _encoding?: string): string | undefined {
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

            function readFile(fileName: string, _encoding?: string): string | undefined {
                perfLogger.logStartReadFile(fileName);
                const file = readFileWorker(fileName, _encoding);
                perfLogger.logStopReadFile();
                return file;
            }

            function writeFile(fileName: string, data: string, writeByteOrderMark?: boolean): void {
                perfLogger.logEvent("WriteFile: " + fileName);
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
                perfLogger.logEvent("ReadDir: " + (path || "."));
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
                                stat = _fs.statSync(name);
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
                try {
                    const stat = _fs.statSync(path);
                    switch (entryKind) {
                        case FileSystemEntryKind.File: return stat.isFile();
                        case FileSystemEntryKind.Directory: return stat.isDirectory();
                        default: return false;
                    }
                }
                catch (e) {
                    return false;
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

            function realpath(path: string): string {
                try {
                    return _fs.realpathSync(path);
                }
                catch {
                    return path;
                }
            }

            function getModifiedTime(path: string) {
                try {
                    return _fs.statSync(path).mtime;
                }
                catch (e) {
                    return undefined;
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
        if (typeof process !== "undefined" && process.nextTick && !process.browser && typeof require !== "undefined") {
            // process and process.nextTick checks if current environment is node-like
            // process.browser check excludes webpack and browserify
            sys = getNodeSystem();
        }
        if (sys) {
            // patch writefile to create folder before writing the file
            patchWriteFileEnsuringDirectory(sys);
        }
        return sys!;
    })();

    if (sys && sys.getEnvironmentVariable) {
        setCustomPollingValues(sys);
        Debug.setAssertionLevel(/^development$/i.test(sys.getEnvironmentVariable("NODE_ENV"))
            ? AssertionLevel.Normal
            : AssertionLevel.None);
    }
    if (sys && sys.debugMode) {
        Debug.isDebugging = true;
    }
}
