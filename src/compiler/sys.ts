declare function setTimeout(handler: (...args: any[]) => void, timeout: number): any;
declare function clearTimeout(handle: any): void;

namespace ts {
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

    function getPriorityValues(highPriorityValue: number): [number, number, number] {
        const mediumPriorityValue = highPriorityValue * 2;
        const lowPriorityValue = mediumPriorityValue * 4;
        return [highPriorityValue, mediumPriorityValue, lowPriorityValue];
    }

    function pollingInterval(watchPriority: PollingInterval): number {
        return pollingIntervalsForPriority[watchPriority];
    }

    const pollingIntervalsForPriority = getPriorityValues(250);

    /* @internal */
    export function watchFileUsingPriorityPollingInterval(host: System, fileName: string, callback: FileWatcherCallback, watchPriority: PollingInterval): FileWatcher {
        return host.watchFile(fileName, callback, pollingInterval(watchPriority));
    }

    /* @internal */
    export type HostWatchFile = (fileName: string, callback: FileWatcherCallback, pollingInterval: PollingInterval) => FileWatcher;
    /* @internal */
    export type HostWatchDirectory = (fileName: string, callback: DirectoryWatcherCallback, recursive?: boolean) => FileWatcher;

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
                levels[level] = customLevels[level] || levels[level];
            }
        }

        function getCustomPollingBasedLevels(baseVariable: string, defaultLevels: Levels) {
            const customLevels = getCustomLevels(baseVariable);
            return (pollingIntervalChanged || customLevels) &&
                createPollingIntervalBasedLevels(customLevels ? { ...defaultLevels, ...customLevels } : defaultLevels);
        }
    }

    /* @internal */
    export function createDynamicPriorityPollingWatchFile(host: { getModifiedTime: System["getModifiedTime"]; setTimeout: System["setTimeout"]; }): HostWatchFile {
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
            const queue = [] as PollingIntervalQueue;
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

        function pollQueue(queue: WatchedFile[], pollingInterval: PollingInterval, pollIndex: number, chunkSize: number) {
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

    /**
     * Returns true if file status changed
     */
    /*@internal*/
    export function onWatchedFileStat(watchedFile: WatchedFile, modifiedTime: Date): boolean {
        const oldTime = watchedFile.mtime.getTime();
        const newTime = modifiedTime.getTime();
        if (oldTime !== newTime) {
            watchedFile.mtime = modifiedTime;
            const eventKind = oldTime === 0
                ? FileWatcherEventKind.Created
                : newTime === 0
                    ? FileWatcherEventKind.Deleted
                    : FileWatcherEventKind.Changed;
            watchedFile.callback(watchedFile.fileName, eventKind);
            return true;
        }

        return false;
    }

    /*@internal*/
    export interface RecursiveDirectoryWatcherHost {
        watchDirectory: HostWatchDirectory;
        getAccessibleSortedChildDirectories(path: string): ReadonlyArray<string>;
        directoryExists(dir: string): boolean;
        filePathComparer: Comparer<string>;
        realpath(s: string): string;
    }

    /**
     * Watch the directory recursively using host provided method to watch child directories
     * that means if this is recursive watcher, watch the children directories as well
     * (eg on OS that dont support recursive watch using fs.watch use fs.watchFile)
     */
    /*@internal*/
    export function createRecursiveDirectoryWatcher(host: RecursiveDirectoryWatcherHost): (directoryName: string, callback: DirectoryWatcherCallback) => FileWatcher {
        type ChildWatches = ReadonlyArray<DirectoryWatcher>;
        interface DirectoryWatcher extends FileWatcher {
            childWatches: ChildWatches;
            dirName: string;
        }

        return createDirectoryWatcher;

        /**
         * Create the directory watcher for the dirPath.
         */
        function createDirectoryWatcher(dirName: string, callback: DirectoryWatcherCallback): DirectoryWatcher {
            const watcher = host.watchDirectory(dirName, fileName => {
                // Call the actual callback
                callback(fileName);

                // Iterate through existing children and update the watches if needed
                updateChildWatches(result, callback);
            });

            let result: DirectoryWatcher = {
                close: () => {
                    watcher.close();
                    result.childWatches.forEach(closeFileWatcher);
                    result = undefined;
                },
                dirName,
                childWatches: emptyArray
            };
            updateChildWatches(result, callback);
            return result;
        }

        function updateChildWatches(watcher: DirectoryWatcher, callback: DirectoryWatcherCallback) {
            // Iterate through existing children and update the watches if needed
            if (watcher) {
                watcher.childWatches = watchChildDirectories(watcher.dirName, watcher.childWatches, callback);
            }
        }

        /**
         * Watch the directories in the parentDir
         */
        function watchChildDirectories(parentDir: string, existingChildWatches: ChildWatches, callback: DirectoryWatcherCallback): ChildWatches {
            let newChildWatches: DirectoryWatcher[] | undefined;
            enumerateInsertsAndDeletes<string, DirectoryWatcher>(
                host.directoryExists(parentDir) ? mapDefined(host.getAccessibleSortedChildDirectories(parentDir), child => {
                    const childFullName = getNormalizedAbsolutePath(child, parentDir);
                    // Filter our the symbolic link directories since those arent included in recursive watch
                    // which is same behaviour when recursive: true is passed to fs.watch
                    return host.filePathComparer(childFullName, host.realpath(childFullName)) === Comparison.EqualTo ? childFullName : undefined;
                }) : emptyArray,
                existingChildWatches,
                (child, childWatcher) => host.filePathComparer(child, childWatcher.dirName),
                createAndAddChildDirectoryWatcher,
                closeFileWatcher,
                addChildDirectoryWatcher
            );

            return newChildWatches || emptyArray;

            /**
             * Create new childDirectoryWatcher and add it to the new ChildDirectoryWatcher list
             */
            function createAndAddChildDirectoryWatcher(childName: string) {
                const result = createDirectoryWatcher(childName, callback);
                addChildDirectoryWatcher(result);
            }

            /**
             * Add child directory watcher to the new ChildDirectoryWatcher list
             */
            function addChildDirectoryWatcher(childWatcher: DirectoryWatcher) {
                (newChildWatches || (newChildWatches = [])).push(childWatcher);
            }
        }
    }

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
        watchFile?(path: string, callback: FileWatcherCallback, pollingInterval?: number): FileWatcher;
        watchDirectory?(path: string, callback: DirectoryWatcherCallback, recursive?: boolean): FileWatcher;
        resolvePath(path: string): string;
        fileExists(path: string): boolean;
        directoryExists(path: string): boolean;
        createDirectory(path: string): void;
        getExecutingFilePath(): string;
        getCurrentDirectory(): string;
        getDirectories(path: string): string[];
        readDirectory(path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>, depth?: number): string[];
        getModifiedTime?(path: string): Date;
        /**
         * A good implementation is node.js' `crypto.createHash`. (https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm)
         */
        createHash?(data: string): string;
        /** This must be cryptographically secure. Only implement this method using `crypto.createHash("sha256")`. */
        createSHA256Hash?(data: string): string;
        getMemoryUsage?(): number;
        exit(exitCode?: number): void;
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

    export function getNodeMajorVersion() {
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

    declare const ChakraHost: {
        args: string[];
        currentDirectory: string;
        executingFile: string;
        newLine?: string;
        useCaseSensitiveFileNames?: boolean;
        echo(s: string): void;
        quit(exitCode?: number): void;
        fileExists(path: string): boolean;
        directoryExists(path: string): boolean;
        createDirectory(path: string): void;
        resolvePath(path: string): string;
        readFile(path: string): string | undefined;
        writeFile(path: string, contents: string): void;
        getDirectories(path: string): string[];
        readDirectory(path: string, extensions?: ReadonlyArray<string>, basePaths?: ReadonlyArray<string>, excludeEx?: string, includeFileEx?: string, includeDirEx?: string): string[];
        watchFile?(path: string, callback: FileWatcherCallback): FileWatcher;
        watchDirectory?(path: string, callback: DirectoryWatcherCallback, recursive?: boolean): FileWatcher;
        realpath(path: string): string;
        getEnvironmentVariable?(name: string): string;
    };

    export let sys: System = (() => {
        // NodeJS detects "\uFEFF" at the start of the string and *replaces* it with the actual
        // byte order mark from the specified encoding. Using any other byte order mark does
        // not actually work.
        const byteOrderMarkIndicator = "\uFEFF";

        function getNodeSystem(): System {
            const _fs = require("fs");
            const _path = require("path");
            const _os = require("os");
            // crypto can be absent on reduced node installations
            let _crypto: typeof import("crypto");
            try {
              _crypto = require("crypto");
            }
            catch {
              _crypto = undefined;
            }

            const Buffer: {
                new (input: string, encoding?: string): any;
                from?(input: string, encoding?: string): any;
            } = require("buffer").Buffer;

            const nodeVersion = getNodeMajorVersion();
            const isNode4OrLater = nodeVersion >= 4;

            const platform: string = _os.platform();
            const useCaseSensitiveFileNames = isFileSystemCaseSensitive();

            const enum FileSystemEntryKind {
                File,
                Directory
            }

            const useNonPollingWatchers = process.env.TSC_NONPOLLING_WATCHER;
            const tscWatchFile = process.env.TSC_WATCHFILE;
            const tscWatchDirectory = process.env.TSC_WATCHDIRECTORY;
            let dynamicPollingWatchFile: HostWatchFile | undefined;
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
                watchFile: getWatchFile(),
                watchDirectory: getWatchDirectory(),
                resolvePath: path => _path.resolve(path),
                fileExists,
                directoryExists,
                createDirectory(directoryName: string) {
                    if (!nodeSystem.directoryExists(directoryName)) {
                        _fs.mkdirSync(directoryName);
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
                createHash: _crypto ? createMD5HashUsingNativeCrypto : generateDjb2Hash,
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
                    process.exit(exitCode);
                },
                realpath,
                debugMode: some(<string[]>process.execArgv, arg => /^--(inspect|debug)(-brk)?(=\d+)?$/i.test(arg)),
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
                base64decode: Buffer.from ? input => {
                    return Buffer.from(input, "base64").toString("utf8");
                } : input => {
                    return new Buffer(input, "base64").toString("utf8");
                },
                base64encode: Buffer.from ? input => {
                    return Buffer.from(input).toString("base64");
                } : input => {
                    return new Buffer(input).toString("base64");
                }
            };
            return nodeSystem;

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

            function getWatchFile(): HostWatchFile {
                switch (tscWatchFile) {
                    case "PriorityPollingInterval":
                        // Use polling interval based on priority when create watch using host.watchFile
                        return fsWatchFile;
                    case "DynamicPriorityPolling":
                        // Use polling interval but change the interval depending on file changes and their default polling interval
                        return createDynamicPriorityPollingWatchFile({ getModifiedTime, setTimeout });
                    case "UseFsEvents":
                        // Use notifications from FS to watch with falling back to fs.watchFile
                        return watchFileUsingFsWatch;
                    case "UseFsEventsWithFallbackDynamicPolling":
                        // Use notifications from FS to watch with falling back to dynamic watch file
                        dynamicPollingWatchFile = createDynamicPriorityPollingWatchFile({ getModifiedTime, setTimeout });
                        return createWatchFileUsingDynamicWatchFile(dynamicPollingWatchFile);
                    case "UseFsEventsOnParentDirectory":
                        // Use notifications from FS to watch with falling back to fs.watchFile
                        return createNonPollingWatchFile();
                }
                return useNonPollingWatchers ?
                    createNonPollingWatchFile() :
                    // Default to do not use polling interval as it is before this experiment branch
                    (fileName, callback) => fsWatchFile(fileName, callback);
            }

            function getWatchDirectory(): HostWatchDirectory {
                // Node 4.0 `fs.watch` function supports the "recursive" option on both OSX and Windows
                // (ref: https://github.com/nodejs/node/pull/2649 and https://github.com/Microsoft/TypeScript/issues/4643)
                const fsSupportsRecursive = isNode4OrLater && (process.platform === "win32" || process.platform === "darwin");
                if (fsSupportsRecursive) {
                    return watchDirectoryUsingFsWatch;
                }

                const watchDirectory = tscWatchDirectory === "RecursiveDirectoryUsingFsWatchFile" ?
                    createWatchDirectoryUsing(fsWatchFile) :
                    tscWatchDirectory === "RecursiveDirectoryUsingDynamicPriorityPolling" ?
                        createWatchDirectoryUsing(dynamicPollingWatchFile || createDynamicPriorityPollingWatchFile({ getModifiedTime, setTimeout })) :
                        watchDirectoryUsingFsWatch;
                const watchDirectoryRecursively = createRecursiveDirectoryWatcher({
                    filePathComparer: getStringComparer(!useCaseSensitiveFileNames),
                    directoryExists,
                    getAccessibleSortedChildDirectories: path => getAccessibleFileSystemEntries(path).directories,
                    watchDirectory,
                    realpath
                });

                return (directoryName, callback, recursive) => {
                    if (recursive) {
                        return watchDirectoryRecursively(directoryName, callback);
                    }
                    watchDirectory(directoryName, callback);
                };
            }

            function createNonPollingWatchFile() {
                // One file can have multiple watchers
                const fileWatcherCallbacks = createMultiMap<FileWatcherCallback>();
                const dirWatchers = createMap<DirectoryWatcher>();
                const toCanonicalName = createGetCanonicalFileName(useCaseSensitiveFileNames);
                return nonPollingWatchFile;

                function nonPollingWatchFile(fileName: string, callback: FileWatcherCallback): FileWatcher {
                    const filePath = toCanonicalName(fileName);
                    fileWatcherCallbacks.add(filePath, callback);
                    const dirPath = getDirectoryPath(filePath) || ".";
                    const watcher = dirWatchers.get(dirPath) || createDirectoryWatcher(getDirectoryPath(fileName) || ".", dirPath);
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

                function createDirectoryWatcher(dirName: string, dirPath: string) {
                    const watcher = fsWatchDirectory(
                        dirName,
                        (_eventName: string, relativeFileName) => {
                            // When files are deleted from disk, the triggered "rename" event would have a relativefileName of "undefined"
                            const fileName = !isString(relativeFileName)
                                ? undefined
                                : getNormalizedAbsolutePath(relativeFileName, dirName);
                            // Some applications save a working file via rename operations
                            const callbacks = fileWatcherCallbacks.get(toCanonicalName(fileName));
                            if (callbacks) {
                                for (const fileCallback of callbacks) {
                                    fileCallback(fileName, FileWatcherEventKind.Changed);
                                }
                            }
                        }
                    ) as DirectoryWatcher;
                    watcher.referenceCount = 0;
                    dirWatchers.set(dirPath, watcher);
                    return watcher;
                }
            }

            function fsWatchFile(fileName: string, callback: FileWatcherCallback, pollingInterval?: number): FileWatcher {
                _fs.watchFile(fileName, { persistent: true, interval: pollingInterval || 250 }, fileChanged);
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

            type FsWatchCallback = (eventName: "rename" | "change", relativeFileName: string) => void;

            function createFileWatcherCallback(callback: FsWatchCallback): FileWatcherCallback {
                return (_fileName, eventKind) => callback(eventKind === FileWatcherEventKind.Changed ? "change" : "rename", "");
            }

            function createFsWatchCallbackForFileWatcherCallback(fileName: string, callback: FileWatcherCallback): FsWatchCallback {
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

            function fsWatch(fileOrDirectory: string, entryKind: FileSystemEntryKind.File | FileSystemEntryKind.Directory, callback: FsWatchCallback, recursive: boolean, fallbackPollingWatchFile: HostWatchFile, pollingInterval?: number): FileWatcher {
                let options: any;
                /** Watcher for the file system entry depending on whether it is missing or present */
                let watcher = !fileSystemEntryExists(fileOrDirectory, entryKind) ?
                    watchMissingFileSystemEntry() :
                    watchPresentFileSystemEntry();
                return {
                    close: () => {
                        // Close the watcher (either existing file system entry watcher or missing file system entry watcher)
                        watcher.close();
                        watcher = undefined;
                    }
                };

                /**
                 * Invoke the callback with rename and update the watcher if not closed
                 * @param createWatcher
                 */
                function invokeCallbackAndUpdateWatcher(createWatcher: () => FileWatcher) {
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
                        if (isNode4OrLater && (process.platform === "win32" || process.platform === "darwin")) {
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

                /**
                 * Watch the file or directory using fs.watchFile since fs.watch threw exception
                 * Eg. on linux the number of watches are limited and one could easily exhaust watches and the exception ENOSPC is thrown when creating watcher at that point
                 */
                function watchPresentFileSystemEntryWithFsWatchFile(): FileWatcher {
                    return fallbackPollingWatchFile(fileOrDirectory, createFileWatcherCallback(callback), pollingInterval);
                }

                /**
                 * Watch the file or directory that is missing
                 * and switch to existing file or directory when the missing filesystem entry is created
                 */
                function watchMissingFileSystemEntry(): FileWatcher {
                    return fallbackPollingWatchFile(fileOrDirectory, (_fileName, eventKind) => {
                        if (eventKind === FileWatcherEventKind.Created && fileSystemEntryExists(fileOrDirectory, entryKind)) {
                            // Call the callback for current file or directory
                            // For now it could be callback for the inner directory creation,
                            // but just return current directory, better than current no-op
                            invokeCallbackAndUpdateWatcher(watchPresentFileSystemEntry);
                        }
                    }, pollingInterval);
                }
            }

            function watchFileUsingFsWatch(fileName: string, callback: FileWatcherCallback, pollingInterval?: number) {
                return fsWatch(fileName, FileSystemEntryKind.File, createFsWatchCallbackForFileWatcherCallback(fileName, callback), /*recursive*/ false, fsWatchFile, pollingInterval);
            }

            function createWatchFileUsingDynamicWatchFile(watchFile: HostWatchFile): HostWatchFile {
                return (fileName, callback, pollingInterval) => fsWatch(fileName, FileSystemEntryKind.File, createFsWatchCallbackForFileWatcherCallback(fileName, callback), /*recursive*/ false, watchFile, pollingInterval);
            }

            function fsWatchDirectory(directoryName: string, callback: FsWatchCallback, recursive?: boolean): FileWatcher {
                return fsWatch(directoryName, FileSystemEntryKind.Directory, callback, !!recursive, fsWatchFile);
            }

            function watchDirectoryUsingFsWatch(directoryName: string, callback: DirectoryWatcherCallback, recursive?: boolean) {
                return fsWatchDirectory(directoryName, createFsWatchCallbackForDirectoryWatcherCallback(directoryName, callback), recursive);
            }

            function createWatchDirectoryUsing(fsWatchFile: HostWatchFile): HostWatchDirectory {
                return (directoryName, callback) => fsWatchFile(directoryName, () => callback(directoryName), PollingInterval.Medium);
            }

            function readFile(fileName: string, _encoding?: string): string | undefined {
                if (!fileExists(fileName)) {
                    return undefined;
                }
                const buffer = _fs.readFileSync(fileName);
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

                let fd: number;

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
                    const entries = _fs.readdirSync(path || ".").sort();
                    const files: string[] = [];
                    const directories: string[] = [];
                    for (const entry of entries) {
                        // This is necessary because on some file system node fails to exclude
                        // "." and "..". See https://github.com/nodejs/node/issues/4002
                        if (entry === "." || entry === "..") {
                            continue;
                        }
                        const name = combinePaths(path, entry);

                        let stat: any;
                        try {
                            stat = _fs.statSync(name);
                        }
                        catch (e) {
                            continue;
                        }

                        if (stat.isFile()) {
                            files.push(entry);
                        }
                        else if (stat.isDirectory()) {
                            directories.push(entry);
                        }
                    }
                    return { files, directories };
                }
                catch (e) {
                    return emptyFileSystemEntries;
                }
            }

            function readDirectory(path: string, extensions?: ReadonlyArray<string>, excludes?: ReadonlyArray<string>, includes?: ReadonlyArray<string>, depth?: number): string[] {
                return matchFiles(path, extensions, excludes, includes, useCaseSensitiveFileNames, process.cwd(), depth, getAccessibleFileSystemEntries);
            }

            function fileSystemEntryExists(path: string, entryKind: FileSystemEntryKind): boolean {
                try {
                    const stat = _fs.statSync(path);
                    switch (entryKind) {
                        case FileSystemEntryKind.File: return stat.isFile();
                        case FileSystemEntryKind.Directory: return stat.isDirectory();
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
                return filter<string>(_fs.readdirSync(path), dir => fileSystemEntryExists(combinePaths(path, dir), FileSystemEntryKind.Directory));
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

            /**
             * djb2 hashing algorithm
             * http://www.cse.yorku.ca/~oz/hash.html
             */
            function generateDjb2Hash(data: string): string {
                const chars = data.split("").map(str => str.charCodeAt(0));
                return `${chars.reduce((prev, curr) => ((prev << 5) + prev) + curr, 5381)}`;
            }

            function createMD5HashUsingNativeCrypto(data: string): string {
                const hash = _crypto.createHash("md5");
                hash.update(data);
                return hash.digest("hex");
            }

            function createSHA256Hash(data: string): string {
                const hash = _crypto.createHash("sha256");
                hash.update(data);
                return hash.digest("hex");
            }
        }

        function getChakraSystem(): System {
            const realpath = ChakraHost.realpath && ((path: string) => ChakraHost.realpath(path));
            return {
                newLine: ChakraHost.newLine || "\r\n",
                args: ChakraHost.args,
                useCaseSensitiveFileNames: !!ChakraHost.useCaseSensitiveFileNames,
                write: ChakraHost.echo,
                readFile(path: string, _encoding?: string) {
                    // encoding is automatically handled by the implementation in ChakraHost
                    return ChakraHost.readFile(path);
                },
                writeFile(path: string, data: string, writeByteOrderMark?: boolean) {
                    // If a BOM is required, emit one
                    if (writeByteOrderMark) {
                        data = byteOrderMarkIndicator + data;
                    }

                    ChakraHost.writeFile(path, data);
                },
                resolvePath: ChakraHost.resolvePath,
                fileExists: ChakraHost.fileExists,
                directoryExists: ChakraHost.directoryExists,
                createDirectory: ChakraHost.createDirectory,
                getExecutingFilePath: () => ChakraHost.executingFile,
                getCurrentDirectory: () => ChakraHost.currentDirectory,
                getDirectories: ChakraHost.getDirectories,
                getEnvironmentVariable: ChakraHost.getEnvironmentVariable || (() => ""),
                readDirectory(path, extensions, excludes, includes, _depth) {
                    const pattern = getFileMatcherPatterns(path, excludes, includes, !!ChakraHost.useCaseSensitiveFileNames, ChakraHost.currentDirectory);
                    return ChakraHost.readDirectory(path, extensions, pattern.basePaths, pattern.excludePattern, pattern.includeFilePattern, pattern.includeDirectoryPattern);
                },
                exit: ChakraHost.quit,
                realpath
            };
        }

        function recursiveCreateDirectory(directoryPath: string, sys: System) {
            const basePath = getDirectoryPath(directoryPath);
            const shouldCreateParent = basePath !== "" && directoryPath !== basePath && !sys.directoryExists(basePath);
            if (shouldCreateParent) {
                recursiveCreateDirectory(basePath, sys);
            }
            if (shouldCreateParent || !sys.directoryExists(directoryPath)) {
                sys.createDirectory(directoryPath);
            }
        }

        let sys: System;
        if (typeof ChakraHost !== "undefined") {
            sys = getChakraSystem();
        }
        else if (typeof process !== "undefined" && process.nextTick && !process.browser && typeof require !== "undefined") {
            // process and process.nextTick checks if current environment is node-like
            // process.browser check excludes webpack and browserify
            sys = getNodeSystem();
        }
        if (sys) {
            // patch writefile to create folder before writing the file
            const originalWriteFile = sys.writeFile;
            sys.writeFile = (path, data, writeBom) => {
                const directoryPath = getDirectoryPath(normalizeSlashes(path));
                if (directoryPath && !sys.directoryExists(directoryPath)) {
                    recursiveCreateDirectory(directoryPath, sys);
                }
                originalWriteFile.call(sys, path, data, writeBom);
            };
        }
        return sys;
    })();

    if (sys && sys.getEnvironmentVariable) {
        setCustomPollingValues(sys);
        Debug.currentAssertionLevel = /^development$/i.test(sys.getEnvironmentVariable("NODE_ENV"))
            ? AssertionLevel.Normal
            : AssertionLevel.None;
    }
    if (sys && sys.debugMode) {
        Debug.isDebugging = true;
    }
}
