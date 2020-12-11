/* @internal */
namespace ts {
    /**
     * Partial interface of the System thats needed to support the caching of directory structure
     */
    export interface DirectoryStructureHost {
        fileExists(path: string): boolean;
        readFile(path: string, encoding?: string): string | undefined;

        // TODO: GH#18217 Optional methods are frequently used as non-optional
        directoryExists?(path: string): boolean;
        getDirectories?(path: string): string[];
        readDirectory?(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];
        realpath?(path: string): string;

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
        readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];

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

        const cachedReadDirectoryResult = new Map<string, MutableFileSystemEntries>();
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
            clearCache,
            realpath: host.realpath && realpath
        };

        function toPath(fileName: string) {
            return ts.toPath(fileName, currentDirectory, getCanonicalFileName);
        }

        function getCachedFileSystemEntries(rootDirPath: Path): MutableFileSystemEntries | undefined {
            return cachedReadDirectoryResult.get(ensureTrailingDirectorySeparator(rootDirPath));
        }

        function getCachedFileSystemEntriesForBaseDir(path: Path): MutableFileSystemEntries | undefined {
            return getCachedFileSystemEntries(getDirectoryPath(path));
        }

        function getBaseNameOfFileName(fileName: string) {
            return getBaseFileName(normalizePath(fileName));
        }

        function createCachedFileSystemEntries(rootDir: string, rootDirPath: Path) {
            const resultFromHost: MutableFileSystemEntries = {
                files: map(host.readDirectory!(rootDir, /*extensions*/ undefined, /*exclude*/ undefined, /*include*/["*.*"]), getBaseNameOfFileName) || [],
                directories: host.getDirectories!(rootDir) || []
            };

            cachedReadDirectoryResult.set(ensureTrailingDirectorySeparator(rootDirPath), resultFromHost);
            return resultFromHost;
        }

        /**
         * If the readDirectory result was already cached, it returns that
         * Otherwise gets result from host and caches it.
         * The host request is done under try catch block to avoid caching incorrect result
         */
        function tryReadDirectory(rootDir: string, rootDirPath: Path): MutableFileSystemEntries | undefined {
            rootDirPath = ensureTrailingDirectorySeparator(rootDirPath);
            const cachedResult = getCachedFileSystemEntries(rootDirPath);
            if (cachedResult) {
                return cachedResult;
            }

            try {
                return createCachedFileSystemEntries(rootDir, rootDirPath);
            }
            catch (_e) {
                // If there is exception to read directories, dont cache the result and direct the calls to host
                Debug.assert(!cachedReadDirectoryResult.has(ensureTrailingDirectorySeparator(rootDirPath)));
                return undefined;
            }
        }

        function fileNameEqual(name1: string, name2: string) {
            return getCanonicalFileName(name1) === getCanonicalFileName(name2);
        }

        function hasEntry(entries: readonly string[], name: string) {
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
            return host.writeFile!(fileName, data, writeByteOrderMark);
        }

        function fileExists(fileName: string): boolean {
            const path = toPath(fileName);
            const result = getCachedFileSystemEntriesForBaseDir(path);
            return result && hasEntry(result.files, getBaseNameOfFileName(fileName)) ||
                host.fileExists(fileName);
        }

        function directoryExists(dirPath: string): boolean {
            const path = toPath(dirPath);
            return cachedReadDirectoryResult.has(ensureTrailingDirectorySeparator(path)) || host.directoryExists!(dirPath);
        }

        function createDirectory(dirPath: string) {
            const path = toPath(dirPath);
            const result = getCachedFileSystemEntriesForBaseDir(path);
            const baseFileName = getBaseNameOfFileName(dirPath);
            if (result) {
                updateFileSystemEntry(result.directories, baseFileName, /*isValid*/ true);
            }
            host.createDirectory!(dirPath);
        }

        function getDirectories(rootDir: string): string[] {
            const rootDirPath = toPath(rootDir);
            const result = tryReadDirectory(rootDir, rootDirPath);
            if (result) {
                return result.directories.slice();
            }
            return host.getDirectories!(rootDir);
        }

        function readDirectory(rootDir: string, extensions?: readonly string[], excludes?: readonly string[], includes?: readonly string[], depth?: number): string[] {
            const rootDirPath = toPath(rootDir);
            const result = tryReadDirectory(rootDir, rootDirPath);
            if (result) {
                return matchFiles(rootDir, extensions, excludes, includes, useCaseSensitiveFileNames, currentDirectory, depth, getFileSystemEntries, realpath);
            }
            return host.readDirectory!(rootDir, extensions, excludes, includes, depth);

            function getFileSystemEntries(dir: string): FileSystemEntries {
                const path = toPath(dir);
                if (path === rootDirPath) {
                    return result!;
                }
                return tryReadDirectory(dir, path) || emptyFileSystemEntries;
            }
        }

        function realpath(s: string) {
            return host.realpath ? host.realpath(s) : s;
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

    export interface SharedExtendedConfigFileWatcher<T> extends FileWatcher {
        fileWatcher: FileWatcher;
        projects: Set<T>;
    }

    /**
     * Updates the map of shared extended config file watches with a new set of extended config files from a base config file of the project
     */
    export function updateSharedExtendedConfigFileWatcher<T>(
        projectPath: T,
        parsed: ParsedCommandLine | undefined,
        extendedConfigFilesMap: ESMap<Path, SharedExtendedConfigFileWatcher<T>>,
        createExtendedConfigFileWatch: (extendedConfigPath: string, extendedConfigFilePath: Path) => FileWatcher,
        toPath: (fileName: string) => Path,
    ) {
        const extendedConfigs = arrayToMap(parsed?.options.configFile?.extendedSourceFiles || emptyArray, toPath);
        // remove project from all unrelated watchers
        extendedConfigFilesMap.forEach((watcher, extendedConfigFilePath) => {
            if (!extendedConfigs.has(extendedConfigFilePath)) {
                watcher.projects.delete(projectPath);
                watcher.close();
            }
        });
        // Update the extended config files watcher
        extendedConfigs.forEach((extendedConfigFileName, extendedConfigFilePath) => {
            const existing = extendedConfigFilesMap.get(extendedConfigFilePath);
            if (existing) {
                existing.projects.add(projectPath);
            }
            else {
                // start watching previously unseen extended config
                extendedConfigFilesMap.set(extendedConfigFilePath, {
                    projects: new Set([projectPath]),
                    fileWatcher: createExtendedConfigFileWatch(extendedConfigFileName, extendedConfigFilePath),
                    close: () => {
                        const existing = extendedConfigFilesMap.get(extendedConfigFilePath);
                        if (!existing || existing.projects.size !== 0) return;
                        existing.fileWatcher.close();
                        extendedConfigFilesMap.delete(extendedConfigFilePath);
                    },
                });
            }
        });
    }

    /**
     * Updates the existing missing file watches with the new set of missing files after new program is created
     */
    export function updateMissingFilePathsWatch(
        program: Program,
        missingFileWatches: ESMap<Path, FileWatcher>,
        createMissingFileWatch: (missingFilePath: Path) => FileWatcher,
    ) {
        const missingFilePaths = program.getMissingFilePaths();
        // TODO(rbuckton): Should be a `Set` but that requires changing the below code that uses `mutateMap`
        const newMissingFilePathMap = arrayToMap(missingFilePaths, identity, returnTrue);
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
        existingWatchedForWildcards: ESMap<string, WildcardDirectoryWatcher>,
        wildcardDirectories: ESMap<string, WatchDirectoryFlags>,
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

    export interface IsIgnoredFileFromWildCardWatchingInput {
        watchedDirPath: Path;
        fileOrDirectory: string;
        fileOrDirectoryPath: Path;
        configFileName: string;
        options: CompilerOptions;
        program: BuilderProgram | Program | undefined;
        extraFileExtensions?: readonly FileExtensionInfo[];
        currentDirectory: string;
        useCaseSensitiveFileNames: boolean;
        writeLog: (s: string) => void;
    }
    /* @internal */
    export function isIgnoredFileFromWildCardWatching({
        watchedDirPath, fileOrDirectory, fileOrDirectoryPath,
        configFileName, options, program, extraFileExtensions,
        currentDirectory, useCaseSensitiveFileNames,
        writeLog,
    }: IsIgnoredFileFromWildCardWatchingInput): boolean {
        const newPath = removeIgnoredPath(fileOrDirectoryPath);
        if (!newPath) {
            writeLog(`Project: ${configFileName} Detected ignored path: ${fileOrDirectory}`);
            return true;
        }

        fileOrDirectoryPath = newPath;
        if (fileOrDirectoryPath === watchedDirPath) return false;

        // If the the added or created file or directory is not supported file name, ignore the file
        // But when watched directory is added/removed, we need to reload the file list
        if (hasExtension(fileOrDirectoryPath) && !isSupportedSourceFileName(fileOrDirectory, options, extraFileExtensions)) {
            writeLog(`Project: ${configFileName} Detected file add/remove of non supported extension: ${fileOrDirectory}`);
            return true;
        }

        if (isExcludedFile(fileOrDirectory, options.configFile!.configFileSpecs!, getNormalizedAbsolutePath(getDirectoryPath(configFileName), currentDirectory), useCaseSensitiveFileNames, currentDirectory)) {
            writeLog(`Project: ${configFileName} Detected excluded file: ${fileOrDirectory}`);
            return true;
        }

        if (!program) return false;

        // We want to ignore emit file check if file is not going to be emitted next to source file
        // In that case we follow config file inclusion rules
        if (options.outFile || options.outDir) return false;

        // File if emitted next to input needs to be ignored
        if (fileExtensionIs(fileOrDirectoryPath, Extension.Dts)) {
            // If its declaration directory: its not ignored if not excluded by config
            if (options.declarationDir) return false;
        }
        else if (!fileExtensionIsOneOf(fileOrDirectoryPath, supportedJSExtensions)) {
            return false;
        }

        // just check if sourceFile with the name exists
        const filePathWithoutExtension = removeFileExtension(fileOrDirectoryPath);
        const realProgram = isBuilderProgram(program) ? program.getProgramOrUndefined() : program;
        if (hasSourceFile((filePathWithoutExtension + Extension.Ts) as Path) ||
            hasSourceFile((filePathWithoutExtension + Extension.Tsx) as Path)) {
            writeLog(`Project: ${configFileName} Detected output file: ${fileOrDirectory}`);
            return true;
        }
        return false;

        function hasSourceFile(file: Path) {
            return realProgram ?
                !!realProgram.getSourceFileByPath(file) :
                (program as BuilderProgram).getState().fileInfos.has(file);
        }
    }

    function isBuilderProgram<T extends BuilderProgram>(program: Program | T): program is T {
        return !!(program as T).getState;
    }

    export function isEmittedFileOfProgram(program: Program | undefined, file: string) {
        if (!program) {
            return false;
        }

        return program.isEmittedFile(file);
    }

    export enum WatchLogLevel {
        None,
        TriggerOnly,
        Verbose
    }

    export interface WatchFactoryHost {
        watchFile(path: string, callback: FileWatcherCallback, pollingInterval?: number, options?: WatchOptions): FileWatcher;
        watchDirectory(path: string, callback: DirectoryWatcherCallback, recursive?: boolean, options?: WatchOptions): FileWatcher;
        getCurrentDirectory?(): string;
        useCaseSensitiveFileNames: boolean | (() => boolean);
    }

    export interface WatchFactory<X, Y = undefined> {
        watchFile: (file: string, callback: FileWatcherCallback, pollingInterval: PollingInterval, options: WatchOptions | undefined, detailInfo1: X, detailInfo2?: Y) => FileWatcher;
        watchDirectory: (directory: string, callback: DirectoryWatcherCallback, flags: WatchDirectoryFlags, options: WatchOptions | undefined, detailInfo1: X, detailInfo2?: Y) => FileWatcher;
    }

    export type GetDetailWatchInfo<X, Y> = (detailInfo1: X, detailInfo2: Y | undefined) => string;
    export function getWatchFactory<X, Y = undefined>(host: WatchFactoryHost, watchLogLevel: WatchLogLevel, log: (s: string) => void, getDetailWatchInfo?: GetDetailWatchInfo<X, Y>): WatchFactory<X, Y> {
        setSysLog(watchLogLevel === WatchLogLevel.Verbose ? log : noop);
        const plainInvokeFactory: WatchFactory<X, Y> = {
            watchFile: (file, callback, pollingInterval, options) => host.watchFile(file, callback, pollingInterval, options),
            watchDirectory: (directory, callback, flags, options) => host.watchDirectory(directory, callback, (flags & WatchDirectoryFlags.Recursive) !== 0, options),
        };
        const triggerInvokingFactory: WatchFactory<X, Y> | undefined = watchLogLevel !== WatchLogLevel.None ?
            {
                watchFile: createTriggerLoggingAddWatch("watchFile"),
                watchDirectory: createTriggerLoggingAddWatch("watchDirectory")
            } :
            undefined;
        const factory = watchLogLevel === WatchLogLevel.Verbose ?
            {
                watchFile: createFileWatcherWithLogging,
                watchDirectory: createDirectoryWatcherWithLogging
            } :
            triggerInvokingFactory || plainInvokeFactory;
        const excludeWatcherFactory = watchLogLevel === WatchLogLevel.Verbose ?
            createExcludeWatcherWithLogging :
            returnNoopFileWatcher;

        return {
            watchFile: createExcludeHandlingAddWatch("watchFile"),
            watchDirectory: createExcludeHandlingAddWatch("watchDirectory")
        };

        function createExcludeHandlingAddWatch<T extends keyof WatchFactory<X, Y>>(key: T): WatchFactory<X, Y>[T] {
            return (
                file: string,
                cb: FileWatcherCallback | DirectoryWatcherCallback,
                flags: PollingInterval | WatchDirectoryFlags,
                options: WatchOptions | undefined,
                detailInfo1: X,
                detailInfo2?: Y
            ) => !matchesExclude(file, key === "watchFile" ? options?.excludeFiles : options?.excludeDirectories, useCaseSensitiveFileNames(), host.getCurrentDirectory?.() || "") ?
                    factory[key].call(/*thisArgs*/ undefined, file, cb, flags, options, detailInfo1, detailInfo2) :
                    excludeWatcherFactory(file, flags, options, detailInfo1, detailInfo2);
        }

        function useCaseSensitiveFileNames() {
            return typeof host.useCaseSensitiveFileNames === "boolean" ?
                host.useCaseSensitiveFileNames :
                host.useCaseSensitiveFileNames();
        }

        function createExcludeWatcherWithLogging(
            file: string,
            flags: PollingInterval | WatchDirectoryFlags,
            options: WatchOptions | undefined,
            detailInfo1: X,
            detailInfo2?: Y
        ) {
            log(`ExcludeWatcher:: Added:: ${getWatchInfo(file, flags, options, detailInfo1, detailInfo2, getDetailWatchInfo)}`);
            return {
                close: () => log(`ExcludeWatcher:: Close:: ${getWatchInfo(file, flags, options, detailInfo1, detailInfo2, getDetailWatchInfo)}`)
            };
        }

        function createFileWatcherWithLogging(
            file: string,
            cb: FileWatcherCallback,
            flags: PollingInterval,
            options: WatchOptions | undefined,
            detailInfo1: X,
            detailInfo2?: Y
        ): FileWatcher {
            log(`FileWatcher:: Added:: ${getWatchInfo(file, flags, options, detailInfo1, detailInfo2, getDetailWatchInfo)}`);
            const watcher = triggerInvokingFactory!.watchFile(file, cb, flags, options, detailInfo1, detailInfo2);
            return {
                close: () => {
                    log(`FileWatcher:: Close:: ${getWatchInfo(file, flags, options, detailInfo1, detailInfo2, getDetailWatchInfo)}`);
                    watcher.close();
                }
            };
        }

        function createDirectoryWatcherWithLogging(
            file: string,
            cb: DirectoryWatcherCallback,
            flags: WatchDirectoryFlags,
            options: WatchOptions | undefined,
            detailInfo1: X,
            detailInfo2?: Y
        ): FileWatcher {
            const watchInfo = `DirectoryWatcher:: Added:: ${getWatchInfo(file, flags, options, detailInfo1, detailInfo2, getDetailWatchInfo)}`;
            log(watchInfo);
            const start = timestamp();
            const watcher = triggerInvokingFactory!.watchDirectory(file, cb, flags, options, detailInfo1, detailInfo2);
            const elapsed = timestamp() - start;
            log(`Elapsed:: ${elapsed}ms ${watchInfo}`);
            return {
                close: () => {
                    const watchInfo = `DirectoryWatcher:: Close:: ${getWatchInfo(file, flags, options, detailInfo1, detailInfo2, getDetailWatchInfo)}`;
                    log(watchInfo);
                    const start = timestamp();
                    watcher.close();
                    const elapsed = timestamp() - start;
                    log(`Elapsed:: ${elapsed}ms ${watchInfo}`);
                }
            };
        }

        function createTriggerLoggingAddWatch<T extends keyof WatchFactory<X, Y>>(key: T): WatchFactory<X, Y>[T] {
            return (
                file: string,
                cb: FileWatcherCallback | DirectoryWatcherCallback,
                flags: PollingInterval | WatchDirectoryFlags,
                options: WatchOptions | undefined,
                detailInfo1: X,
                detailInfo2?: Y
            ) => plainInvokeFactory[key].call(/*thisArgs*/ undefined, file, (...args: any[]) => {
                const triggerredInfo = `${key === "watchFile" ? "FileWatcher" : "DirectoryWatcher"}:: Triggered with ${args[0]} ${args[1] !== undefined ? args[1] : ""}:: ${getWatchInfo(file, flags, options, detailInfo1, detailInfo2, getDetailWatchInfo)}`;
                log(triggerredInfo);
                const start = timestamp();
                cb.call(/*thisArg*/ undefined, ...args);
                const elapsed = timestamp() - start;
                log(`Elapsed:: ${elapsed}ms ${triggerredInfo}`);
            }, flags, options, detailInfo1, detailInfo2);
        }

        function getWatchInfo<T>(file: string, flags: T, options: WatchOptions | undefined, detailInfo1: X, detailInfo2: Y | undefined, getDetailWatchInfo: GetDetailWatchInfo<X, Y> | undefined) {
            return `WatchInfo: ${file} ${flags} ${JSON.stringify(options)} ${getDetailWatchInfo ? getDetailWatchInfo(detailInfo1, detailInfo2) : detailInfo2 === undefined ? detailInfo1 : `${detailInfo1} ${detailInfo2}`}`;
        }
    }

    export function getFallbackOptions(options: WatchOptions | undefined): WatchOptions {
        const fallbackPolling = options?.fallbackPolling;
        return {
            watchFile: fallbackPolling !== undefined ?
                fallbackPolling as unknown as WatchFileKind :
                WatchFileKind.PriorityPollingInterval
        };
    }

    export function closeFileWatcherOf<T extends { watcher: FileWatcher; }>(objWithWatcher: T) {
        objWithWatcher.watcher.close();
    }
}
