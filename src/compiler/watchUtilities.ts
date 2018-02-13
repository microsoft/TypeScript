/// <reference path="core.ts" />

/* @internal */
namespace ts {
    /**
     * Partial interface of the System thats needed to support the caching of directory structure
     */
    export interface DirectoryStructureHost {
        fileExists(path: string): boolean;
        readFile(path: string, encoding?: string): string | undefined;

        directoryExists?(path: string): boolean;
        getDirectories?(path: string): string[];
        readDirectory?(path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>, depth?: number): string[];

        createDirectory?(path: string): void;
        writeFile?(path: string, data: string, writeByteOrderMark?: boolean): void;
    }

    interface FileAndDirectoryExistence {
        fileExists: boolean;
        directoryExists: boolean;
    }

    export interface CachedDirectoryStructureHost extends DirectoryStructureHost {
        useCaseSensitiveFileNames: boolean;

        getDirectories(path: string): string[];
        readDirectory(path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>, depth?: number): string[];

        /** Returns the queried result for the file exists and directory exists if at all it was done */
        addOrDeleteFileOrDirectory(fileOrDirectory: string, fileOrDirectoryPath: Path): FileAndDirectoryExistence | undefined;
        addOrDeleteFile(fileName: string, filePath: Path, eventKind: FileWatcherEventKind): void;
        clearCache(): void;
    }

    interface MutableFileSystemEntries {
        readonly files: string[];
        readonly directories: string[];
    }

    export function createCachedDirectoryStructureHost(host: DirectoryStructureHost, currentDirectory: string, useCaseSensitiveFileNames: boolean): CachedDirectoryStructureHost | undefined {
        if (!host.getDirectories || !host.readDirectory) {
            return undefined;
        }

        const cachedReadDirectoryResult = createMap<MutableFileSystemEntries>();
        const getCanonicalFileName = createGetCanonicalFileName(useCaseSensitiveFileNames);
        return {
            useCaseSensitiveFileNames,
            fileExists,
            readFile: (path, encoding) => host.readFile(path, encoding),
            directoryExists: host.directoryExists && directoryExists,
            getDirectories,
            readDirectory,
            createDirectory: host.createDirectory && createDirectory,
            writeFile: host.writeFile && writeFile,
            addOrDeleteFileOrDirectory,
            addOrDeleteFile,
            clearCache
        };

        function toPath(fileName: string) {
            return ts.toPath(fileName, currentDirectory, getCanonicalFileName);
        }

        function getCachedFileSystemEntries(rootDirPath: Path): MutableFileSystemEntries | undefined {
            return cachedReadDirectoryResult.get(rootDirPath);
        }

        function getCachedFileSystemEntriesForBaseDir(path: Path): MutableFileSystemEntries | undefined {
            return getCachedFileSystemEntries(getDirectoryPath(path));
        }

        function getBaseNameOfFileName(fileName: string) {
            return getBaseFileName(normalizePath(fileName));
        }

        function createCachedFileSystemEntries(rootDir: string, rootDirPath: Path) {
            const resultFromHost: MutableFileSystemEntries = {
                files: map(host.readDirectory(rootDir, /*extensions*/ undefined, /*exclude*/ undefined, /*include*/["*.*"]), getBaseNameOfFileName) || [],
                directories: host.getDirectories(rootDir) || []
            };

            cachedReadDirectoryResult.set(rootDirPath, resultFromHost);
            return resultFromHost;
        }

        /**
         * If the readDirectory result was already cached, it returns that
         * Otherwise gets result from host and caches it.
         * The host request is done under try catch block to avoid caching incorrect result
         */
        function tryReadDirectory(rootDir: string, rootDirPath: Path): MutableFileSystemEntries | undefined {
            const cachedResult = getCachedFileSystemEntries(rootDirPath);
            if (cachedResult) {
                return cachedResult;
            }

            try {
                return createCachedFileSystemEntries(rootDir, rootDirPath);
            }
            catch (_e) {
                // If there is exception to read directories, dont cache the result and direct the calls to host
                Debug.assert(!cachedReadDirectoryResult.has(rootDirPath));
                return undefined;
            }
        }

        function fileNameEqual(name1: string, name2: string) {
            return getCanonicalFileName(name1) === getCanonicalFileName(name2);
        }

        function hasEntry(entries: ReadonlyArray<string>, name: string) {
            return some(entries, file => fileNameEqual(file, name));
        }

        function updateFileSystemEntry(entries: string[], baseName: string, isValid: boolean) {
            if (hasEntry(entries, baseName)) {
                if (!isValid) {
                    return filterMutate(entries, entry => !fileNameEqual(entry, baseName));
                }
            }
            else if (isValid) {
                return entries.push(baseName);
            }
        }

        function writeFile(fileName: string, data: string, writeByteOrderMark?: boolean): void {
            const path = toPath(fileName);
            const result = getCachedFileSystemEntriesForBaseDir(path);
            if (result) {
                updateFilesOfFileSystemEntry(result, getBaseNameOfFileName(fileName), /*fileExists*/ true);
            }
            return host.writeFile(fileName, data, writeByteOrderMark);
        }

        function fileExists(fileName: string): boolean {
            const path = toPath(fileName);
            const result = getCachedFileSystemEntriesForBaseDir(path);
            return result && hasEntry(result.files, getBaseNameOfFileName(fileName)) ||
                host.fileExists(fileName);
        }

        function directoryExists(dirPath: string): boolean {
            const path = toPath(dirPath);
            return cachedReadDirectoryResult.has(path) || host.directoryExists(dirPath);
        }

        function createDirectory(dirPath: string) {
            const path = toPath(dirPath);
            const result = getCachedFileSystemEntriesForBaseDir(path);
            const baseFileName = getBaseNameOfFileName(dirPath);
            if (result) {
                updateFileSystemEntry(result.directories, baseFileName, /*isValid*/ true);
            }
            host.createDirectory(dirPath);
        }

        function getDirectories(rootDir: string): string[] {
            const rootDirPath = toPath(rootDir);
            const result = tryReadDirectory(rootDir, rootDirPath);
            if (result) {
                return result.directories.slice();
            }
            return host.getDirectories(rootDir);
        }

        function readDirectory(rootDir: string, extensions?: ReadonlyArray<string>, excludes?: ReadonlyArray<string>, includes?: ReadonlyArray<string>, depth?: number): string[] {
            const rootDirPath = toPath(rootDir);
            const result = tryReadDirectory(rootDir, rootDirPath);
            if (result) {
                return matchFiles(rootDir, extensions, excludes, includes, useCaseSensitiveFileNames, currentDirectory, depth, getFileSystemEntries);
            }
            return host.readDirectory(rootDir, extensions, excludes, includes, depth);

            function getFileSystemEntries(dir: string) {
                const path = toPath(dir);
                if (path === rootDirPath) {
                    return result;
                }
                return tryReadDirectory(dir, path) || emptyFileSystemEntries;
            }
        }

        function addOrDeleteFileOrDirectory(fileOrDirectory: string, fileOrDirectoryPath: Path) {
            const existingResult = getCachedFileSystemEntries(fileOrDirectoryPath);
            if (existingResult) {
                // Just clear the cache for now
                // For now just clear the cache, since this could mean that multiple level entries might need to be re-evaluated
                clearCache();
                return undefined;
            }

            const parentResult = getCachedFileSystemEntriesForBaseDir(fileOrDirectoryPath);
            if (!parentResult) {
                return undefined;
            }

            // This was earlier a file (hence not in cached directory contents)
            // or we never cached the directory containing it

            if (!host.directoryExists) {
                // Since host doesnt support directory exists, clear the cache as otherwise it might not be same
                clearCache();
                return undefined;
            }

            const baseName = getBaseNameOfFileName(fileOrDirectory);
            const fsQueryResult: FileAndDirectoryExistence = {
                fileExists: host.fileExists(fileOrDirectoryPath),
                directoryExists: host.directoryExists(fileOrDirectoryPath)
            };
            if (fsQueryResult.directoryExists || hasEntry(parentResult.directories, baseName)) {
                // Folder added or removed, clear the cache instead of updating the folder and its structure
                clearCache();
            }
            else {
                // No need to update the directory structure, just files
                updateFilesOfFileSystemEntry(parentResult, baseName, fsQueryResult.fileExists);
            }
            return fsQueryResult;

        }

        function addOrDeleteFile(fileName: string, filePath: Path, eventKind: FileWatcherEventKind) {
            if (eventKind === FileWatcherEventKind.Changed) {
                return;
            }

            const parentResult = getCachedFileSystemEntriesForBaseDir(filePath);
            if (parentResult) {
                updateFilesOfFileSystemEntry(parentResult, getBaseNameOfFileName(fileName), eventKind === FileWatcherEventKind.Created);
            }
        }

        function updateFilesOfFileSystemEntry(parentResult: MutableFileSystemEntries, baseName: string, fileExists: boolean) {
            updateFileSystemEntry(parentResult.files, baseName, fileExists);
        }

        function clearCache() {
            cachedReadDirectoryResult.clear();
        }
    }

    export enum ConfigFileProgramReloadLevel {
        None,
        /** Update the file name list from the disk */
        Partial,
        /** Reload completely by re-reading contents of config file from disk and updating program */
        Full
    }

    /**
     * Updates the existing missing file watches with the new set of missing files after new program is created
     */
    export function updateMissingFilePathsWatch(
        program: Program,
        missingFileWatches: Map<FileWatcher>,
        createMissingFileWatch: (missingFilePath: Path) => FileWatcher,
    ) {
        const missingFilePaths = program.getMissingFilePaths();
        const newMissingFilePathMap = arrayToSet(missingFilePaths);
        // Update the missing file paths watcher
        mutateMap(
            missingFileWatches,
            newMissingFilePathMap,
            {
                // Watch the missing files
                createNewValue: createMissingFileWatch,
                // Files that are no longer missing (e.g. because they are no longer required)
                // should no longer be watched.
                onDeleteValue: closeFileWatcher
            }
        );
    }

    export interface WildcardDirectoryWatcher {
        watcher: FileWatcher;
        flags: WatchDirectoryFlags;
    }

    /**
     * Updates the existing wild card directory watches with the new set of wild card directories from the config file
     * after new program is created because the config file was reloaded or program was created first time from the config file
     * Note that there is no need to call this function when the program is updated with additional files without reloading config files,
     * as wildcard directories wont change unless reloading config file
     */
    export function updateWatchingWildcardDirectories(
        existingWatchedForWildcards: Map<WildcardDirectoryWatcher>,
        wildcardDirectories: Map<WatchDirectoryFlags>,
        watchDirectory: (directory: string, flags: WatchDirectoryFlags) => FileWatcher
    ) {
        mutateMap(
            existingWatchedForWildcards,
            wildcardDirectories,
            {
                // Create new watch and recursive info
                createNewValue: createWildcardDirectoryWatcher,
                // Close existing watch thats not needed any more
                onDeleteValue: closeFileWatcherOf,
                // Close existing watch that doesnt match in the flags
                onExistingValue: updateWildcardDirectoryWatcher
            }
        );

        function createWildcardDirectoryWatcher(directory: string, flags: WatchDirectoryFlags): WildcardDirectoryWatcher {
            // Create new watch and recursive info
            return {
                watcher: watchDirectory(directory, flags),
                flags
            };
        }

        function updateWildcardDirectoryWatcher(existingWatcher: WildcardDirectoryWatcher, flags: WatchDirectoryFlags, directory: string) {
            // Watcher needs to be updated if the recursive flags dont match
            if (existingWatcher.flags === flags) {
                return;
            }

            existingWatcher.watcher.close();
            existingWatchedForWildcards.set(directory, createWildcardDirectoryWatcher(directory, flags));
        }
    }

    export function isEmittedFileOfProgram(program: Program | undefined, file: string) {
        if (!program) {
            return false;
        }

        return program.isEmittedFile(file);
    }

    export interface WatchFileHost {
        watchFile(path: string, callback: FileWatcherCallback, pollingInterval?: number): FileWatcher;
    }

    export function addFileWatcher(host: WatchFileHost, file: string, cb: FileWatcherCallback): FileWatcher {
        return host.watchFile(file, cb);
    }

    export function addFileWatcherWithLogging(host: WatchFileHost, file: string, cb: FileWatcherCallback, log: (s: string) => void): FileWatcher {
        const watcherCaption = `FileWatcher:: `;
        return createWatcherWithLogging(addFileWatcher, watcherCaption, log, /*logOnlyTrigger*/ false, host, file, cb);
    }

    export function addFileWatcherWithOnlyTriggerLogging(host: WatchFileHost, file: string, cb: FileWatcherCallback, log: (s: string) => void): FileWatcher {
        const watcherCaption = `FileWatcher:: `;
        return createWatcherWithLogging(addFileWatcher, watcherCaption, log, /*logOnlyTrigger*/ true, host, file, cb);
    }

    export type FilePathWatcherCallback = (fileName: string, eventKind: FileWatcherEventKind, filePath: Path) => void;
    export function addFilePathWatcher(host: WatchFileHost, file: string, cb: FilePathWatcherCallback, path: Path): FileWatcher {
        return host.watchFile(file, (fileName, eventKind) => cb(fileName, eventKind, path));
    }

    export function addFilePathWatcherWithLogging(host: WatchFileHost, file: string, cb: FilePathWatcherCallback, path: Path, log: (s: string) => void): FileWatcher {
        const watcherCaption = `FileWatcher:: `;
        return createWatcherWithLogging(addFileWatcher, watcherCaption, log, /*logOnlyTrigger*/ false, host, file, cb, path);
    }

    export function addFilePathWatcherWithOnlyTriggerLogging(host: WatchFileHost, file: string, cb: FilePathWatcherCallback, path: Path, log: (s: string) => void): FileWatcher {
        const watcherCaption = `FileWatcher:: `;
        return createWatcherWithLogging(addFileWatcher, watcherCaption, log, /*logOnlyTrigger*/ true, host, file, cb, path);
    }

    export interface WatchDirectoryHost {
        watchDirectory(path: string, callback: DirectoryWatcherCallback, recursive?: boolean): FileWatcher;
    }

    export function addDirectoryWatcher(host: WatchDirectoryHost, directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags): FileWatcher {
        const recursive = (flags & WatchDirectoryFlags.Recursive) !== 0;
        return host.watchDirectory(directory, cb, recursive);
    }

    export function addDirectoryWatcherWithLogging(host: WatchDirectoryHost, directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags, log: (s: string) => void): FileWatcher {
        const watcherCaption = `DirectoryWatcher ${(flags & WatchDirectoryFlags.Recursive) !== 0 ? "recursive" : ""}:: `;
        return createWatcherWithLogging(addDirectoryWatcher, watcherCaption, log, /*logOnlyTrigger*/ false, host, directory, cb, flags);
    }

    export function addDirectoryWatcherWithOnlyTriggerLogging(host: WatchDirectoryHost, directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags, log: (s: string) => void): FileWatcher {
        const watcherCaption = `DirectoryWatcher ${(flags & WatchDirectoryFlags.Recursive) !== 0 ? "recursive" : ""}:: `;
        return createWatcherWithLogging(addDirectoryWatcher, watcherCaption, log, /*logOnlyTrigger*/ true, host, directory, cb, flags);
    }

    type WatchCallback<T, U> = (fileName: string, cbOptional1?: T, optional?: U) => void;
    type AddWatch<H, T, U> = (host: H, file: string, cb: WatchCallback<T, U>, optional?: U) => FileWatcher;
    function createWatcherWithLogging<H, T, U>(addWatch: AddWatch<H, T, U>, watcherCaption: string, log: (s: string) => void, logOnlyTrigger: boolean, host: H, file: string, cb: WatchCallback<T, U>, optional?: U): FileWatcher {
        const info = `PathInfo: ${file}`;
        if (!logOnlyTrigger) {
            log(`${watcherCaption}Added: ${info}`);
        }
        const watcher = addWatch(host, file, (fileName, cbOptional1?) => {
            const optionalInfo = cbOptional1 !== undefined ? ` ${cbOptional1}` : "";
            log(`${watcherCaption}Trigger: ${fileName}${optionalInfo} ${info}`);
            const start = timestamp();
            cb(fileName, cbOptional1, optional);
            const elapsed = timestamp() - start;
            log(`${watcherCaption}Elapsed: ${elapsed}ms Trigger: ${fileName}${optionalInfo} ${info}`);
        }, optional);
        return {
            close: () => {
                if (!logOnlyTrigger) {
                    log(`${watcherCaption}Close: ${info}`);
                }
                watcher.close();
            }
        };
    }

    export function closeFileWatcher(watcher: FileWatcher) {
        watcher.close();
    }

    export function closeFileWatcherOf<T extends { watcher: FileWatcher; }>(objWithWatcher: T) {
        objWithWatcher.watcher.close();
    }
}
