/// <reference path="core.ts"/>

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
    export interface WatchedFile {
        readonly fileName: string;
        readonly callback: FileWatcherCallback;
        mtime: Date;
    }

    /* @internal */
    export enum WatchPriority {
        High,
        Medium,
        Low
    }

    function getPriorityValues(highPriorityValue: number): [number, number, number] {
        const mediumPriorityValue = highPriorityValue * 2;
        const lowPriorityValue = mediumPriorityValue * 4;
        return [highPriorityValue, mediumPriorityValue, lowPriorityValue];
    }

    const pollingIntervalsForPriority = getPriorityValues(250);
    function pollingInterval(watchPriority: WatchPriority): number {
        return pollingIntervalsForPriority[watchPriority];
    }

    /* @internal */
    export function watchFileUsingPriorityPollingInterval(host: System, fileName: string, callback: FileWatcherCallback, watchPriority: WatchPriority): FileWatcher {
        return host.watchFile(fileName, callback, pollingInterval(watchPriority));
    }

    /* @internal */
    export interface DynamicPriorityPollingStatsSet {
        watchFile(fileName: string, callback: FileWatcherCallback, defaultPriority: WatchPriority): FileWatcher;
    }

    /* @internal */
    export const missingFileModifiedTime = new Date(0); // Any subsequent modification will occur after this time
    /* @internal */
    export function createDynamicPriorityPollingStatsSet(host: System): DynamicPriorityPollingStatsSet {
        if (!host.getModifiedTime || !host.setTimeout) {
            throw notImplemented();
        }

        interface WatchedFile extends ts.WatchedFile {
            isClosed?: boolean;
            unchangedPolls: number;
        }

        interface WatchPriorityQueue extends Array<WatchedFile> {
            watchPriority: WatchPriority;
            pollIndex: number;
        }

        const chunkSizes = getPriorityValues(32);
        const unChangedThresholds = getPriorityValues(32);
        const watchedFiles: WatchedFile[] = [];
        const changedFilesInLastPoll: WatchedFile[] = [];
        const priorityQueues = [createPriorityQueue(WatchPriority.High), createPriorityQueue(WatchPriority.Medium), createPriorityQueue(WatchPriority.Low)];
        return {
            watchFile
        };

        function watchFile(fileName: string, callback: FileWatcherCallback, defaultPriority: WatchPriority): FileWatcher {
            const file: WatchedFile = {
                fileName,
                callback,
                unchangedPolls: 0,
                mtime: getModifiedTime(fileName)
            };
            watchedFiles.push(file);

            addToPriorityQueue(file, defaultPriority);
            return {
                close: () => {
                    file.isClosed = true;
                    // Remove from watchedFiles
                    unorderedRemoveItem(watchedFiles, file);
                    // Do not update priority queue since that will happen as part of polling
                }
            };
        }

        function createPriorityQueue(watchPriority: WatchPriority): WatchPriorityQueue {
            const queue = [] as WatchPriorityQueue;
            queue.watchPriority = watchPriority;
            queue.pollIndex = 0;
            return queue;
        }

        function pollPriorityQueue(queue: WatchPriorityQueue) {
            const priority = queue.watchPriority;
            queue.pollIndex = pollQueue(queue, priority, queue.pollIndex, chunkSizes[priority]);
            // Set the next polling index and timeout
            if (queue.length) {
                scheduleNextPoll(priority);
            }
            else {
                Debug.assert(queue.pollIndex === 0);
            }
        }

        function pollHighPriorityQueue(queue: WatchPriorityQueue) {
            // Always poll complete list of changedFilesInLastPoll
            pollQueue(changedFilesInLastPoll, WatchPriority.High, /*pollIndex*/ 0, changedFilesInLastPoll.length);

            // Finally do the actual polling of the queue
            pollPriorityQueue(queue);
            // Schedule poll if there are files in changedFilesInLastPoll but no files in the actual queue
            // as pollPriorityQueue wont schedule for next poll
            if (!queue.length && changedFilesInLastPoll.length) {
                scheduleNextPoll(WatchPriority.High);
            }
        }

        function pollQueue(queue: WatchedFile[], priority: WatchPriority, pollIndex: number, chunkSize: number) {
            // Max visit would be all elements of the queue
            let needsVisit = queue.length;
            let definedValueCopyToIndex = pollIndex;
            const unChangedThreshold = unChangedThresholds[priority];
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
                    if (queue !== changedFilesInLastPoll && priority !== WatchPriority.High) {
                        queue[pollIndex] = undefined;
                        addChangedFileToHighPriorityQueue(watchedFile);
                    }
                }
                else if (watchedFile.unchangedPolls !== unChangedThreshold) {
                    watchedFile.unchangedPolls++;
                }
                else if (queue === changedFilesInLastPoll) {
                    // Restart unchangedPollCount for unchanged file and move to high priority queue
                    watchedFile.unchangedPolls = 0;
                    addToPriorityQueue(watchedFile, WatchPriority.High);
                }
                else if (priority !== WatchPriority.Low) {
                    watchedFile.unchangedPolls++;
                    queue[pollIndex] = undefined;
                    addToPriorityQueue(watchedFile, priority + 1);
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

        function addToPriorityQueue(file: WatchedFile, priority: WatchPriority) {
            if (priorityQueues[priority].push(file) === 1) {
                scheduleNextPoll(priority);
            }
        }

        function addChangedFileToHighPriorityQueue(file: WatchedFile) {
            if (changedFilesInLastPoll.push(file) === 1 && !priorityQueues[WatchPriority.High].length) {
                scheduleNextPoll(WatchPriority.High);
            }
        }

        function scheduleNextPoll(priority: WatchPriority) {
            host.setTimeout(priority === WatchPriority.High ? pollHighPriorityQueue : pollPriorityQueue, pollingInterval(priority), priorityQueues[priority]);
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

    /**
     * Partial interface of the System thats needed to support the caching of directory structure
     */
    export interface DirectoryStructureHost {
        newLine: string;
        useCaseSensitiveFileNames: boolean;
        write(s: string): void;
        readFile(path: string, encoding?: string): string | undefined;
        writeFile(path: string, data: string, writeByteOrderMark?: boolean): void;
        fileExists(path: string): boolean;
        directoryExists(path: string): boolean;
        createDirectory(path: string): void;
        getCurrentDirectory(): string;
        getDirectories(path: string): string[];
        readDirectory(path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>, depth?: number): string[];
        exit(exitCode?: number): void;
    }

    export interface System extends DirectoryStructureHost {
        args: string[];
        getFileSize?(path: string): number;
        /**
         * @pollingInterval - this parameter is used in polling-based watchers and ignored in watchers that
         * use native OS file watching
         */
        watchFile?(path: string, callback: FileWatcherCallback, pollingInterval?: number): FileWatcher;
        watchDirectory?(path: string, callback: DirectoryWatcherCallback, recursive?: boolean): FileWatcher;
        resolvePath(path: string): string;
        getExecutingFilePath(): string;
        getModifiedTime?(path: string): Date;
        /**
         * This should be cryptographically secure.
         * A good implementation is node.js' `crypto.createHash`. (https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm)
         */
        createHash?(data: string): string;
        getMemoryUsage?(): number;
        realpath?(path: string): string;
        /*@internal*/ getEnvironmentVariable(name: string): string;
        /*@internal*/ tryEnableSourceMapsForHost?(): void;
        /*@internal*/ debugMode?: boolean;
        setTimeout?(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
        clearTimeout?(timeoutId: any): void;
        clearScreen?(): void;
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
        const utf8ByteOrderMark = "\u00EF\u00BB\u00BF";

        function getNodeSystem(): System {
            const _fs = require("fs");
            const _path = require("path");
            const _os = require("os");
            const _crypto = require("crypto");

            const nodeVersion = getNodeMajorVersion();
            const isNode4OrLater = nodeVersion >= 4;

            const platform: string = _os.platform();
            const useCaseSensitiveFileNames = isFileSystemCaseSensitive();

            const enum FileSystemEntryKind {
                File,
                Directory
            }

            const useNonPollingWatchers = process.env.TSC_NONPOLLING_WATCHER;

            const nodeSystem: System = {
                args: process.argv.slice(2),
                newLine: _os.EOL,
                useCaseSensitiveFileNames,
                write(s: string): void {
                    process.stdout.write(s);
                },
                readFile,
                writeFile,
                watchFile: useNonPollingWatchers ? createNonPollingWatchFile() : fsWatchFile,
                watchDirectory: (directoryName, callback, recursive) => {
                    // Node 4.0 `fs.watch` function supports the "recursive" option on both OSX and Windows
                    // (ref: https://github.com/nodejs/node/pull/2649 and https://github.com/Microsoft/TypeScript/issues/4643)
                    return fsWatchDirectory(directoryName, (eventName, relativeFileName) => {
                        // In watchDirectory we only care about adding and removing files (when event name is
                        // "rename"); changes made within files are handled by corresponding fileWatchers (when
                        // event name is "change")
                        if (eventName === "rename") {
                            // When deleting a file, the passed baseFileName is null
                            callback(!relativeFileName ? relativeFileName : normalizePath(combinePaths(directoryName, relativeFileName)));
                        }
                    }, recursive);
                },
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
                getModifiedTime(path) {
                    try {
                        return _fs.statSync(path).mtime;
                    }
                    catch (e) {
                        return undefined;
                    }
                },
                createHash(data) {
                    const hash = _crypto.createHash("md5");
                    hash.update(data);
                    return hash.digest("hex");
                },
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
                realpath(path: string): string {
                    return _fs.realpathSync(path);
                },
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
                                : ts.getNormalizedAbsolutePath(relativeFileName, dirName);
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
                    if (+curr.mtime === 0) {
                        eventKind = FileWatcherEventKind.Deleted;
                    }
                    // previous event kind check is to ensure we send created event when file is restored or renamed twice (that is it disappears and reappears)
                    // since in that case the prevTime returned is same as prev time of event when file was deleted as per node documentation
                    else if (+prev.mtime === 0 || eventKind === FileWatcherEventKind.Deleted) {
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

            function fsWatchDirectory(directoryName: string, callback: (eventName: string, relativeFileName: string) => void, recursive?: boolean): FileWatcher {
                let options: any;
                /** Watcher for the directory depending on whether it is missing or present */
                let watcher = !directoryExists(directoryName) ?
                    watchMissingDirectory() :
                    watchPresentDirectory();
                return {
                    close: () => {
                        // Close the watcher (either existing directory watcher or missing directory watcher)
                        watcher.close();
                    }
                };

                /**
                 * Watch the directory that is currently present
                 * and when the watched directory is deleted, switch to missing directory watcher
                 */
                function watchPresentDirectory(): FileWatcher {
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

                    const dirWatcher = _fs.watch(
                        directoryName,
                        options,
                        callback
                    );
                    dirWatcher.on("error", () => {
                        // Watch the missing directory
                        watcher.close();
                        watcher = watchMissingDirectory();
                        // Call the callback for current directory
                        callback("rename", "");
                    });
                    return dirWatcher;
                }

                /**
                 * Watch the directory that is missing
                 * and switch to existing directory when the directory is created
                 */
                function watchMissingDirectory(): FileWatcher {
                    return fsWatchFile(directoryName, (_fileName, eventKind) => {
                        if (eventKind === FileWatcherEventKind.Created && directoryExists(directoryName)) {
                            watcher.close();
                            watcher = watchPresentDirectory();
                            // Call the callback for current directory
                            // For now it could be callback for the inner directory creation,
                            // but just return current directory, better than current no-op
                            callback("rename", "");
                        }
                    });
                }
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
                    data = utf8ByteOrderMark + data;
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
                    return { files: [], directories: [] };
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
                        data = utf8ByteOrderMark + data;
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
        Debug.currentAssertionLevel = /^development$/i.test(sys.getEnvironmentVariable("NODE_ENV"))
            ? AssertionLevel.Normal
            : AssertionLevel.None;
    }
    if (sys && sys.debugMode) {
        Debug.isDebugging = true;
    }
}
