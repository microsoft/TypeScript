/// <reference path="core.ts" />

/* @internal */
namespace ts {
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

    export enum WatchLogLevel {
        None,
        TriggerOnly,
        Verbose
    }

    export type WatchFile<X, Y> = (host: System, file: string, callback: FileWatcherCallback, pollingInterval?: number, detailInfo1?: X, detailInfo2?: Y) => FileWatcher;
    export type FilePathWatcherCallback = (fileName: string, eventKind: FileWatcherEventKind, filePath: Path) => void;
    export type WatchFilePath<X, Y> = (host: System, file: string, callback: FilePathWatcherCallback, pollingInterval: number | undefined, path: Path, detailInfo1?: X, detailInfo2?: Y) => FileWatcher;
    export type WatchDirectory<X, Y> = (host: System, directory: string, callback: DirectoryWatcherCallback, flags: WatchDirectoryFlags, detailInfo1?: X, detailInfo2?: Y) => FileWatcher;

    export function createWatchFile<X = undefined, Y = undefined>(watchLogLevel: WatchLogLevel, log: (s: string) => void, getDetailWatchInfo?: GetDetailWatchInfo<X, Y>): WatchFile<X, Y> {
        const createFileWatcher: CreateFileWatcher<number | undefined, FileWatcherEventKind, undefined, X, Y> = getCreateFileWatcher(watchLogLevel, watchFile);
        return (host, file, callback, pollingInterval, detailInfo1, detailInfo2) =>
            createFileWatcher(host, file, callback, pollingInterval, /*passThrough*/ undefined, detailInfo1, detailInfo2, watchFile, log, "FileWatcher", getDetailWatchInfo);
    }

    export function createWatchFilePath<X = undefined, Y = undefined>(watchLogLevel: WatchLogLevel, log: (s: string) => void, getDetailWatchInfo?: GetDetailWatchInfo<X, Y>): WatchFilePath<X, Y> {
        const createFileWatcher: CreateFileWatcher<number | undefined, FileWatcherEventKind, Path, X, Y> = getCreateFileWatcher(watchLogLevel, watchFilePath);
        return (host, file, callback, pollingInterval, path, detailInfo1, detailInfo2) =>
            createFileWatcher(host, file, callback, pollingInterval, path, detailInfo1, detailInfo2, watchFile, log, "FileWatcher", getDetailWatchInfo);
    }

    export function createWatchDirectory<X = undefined, Y = undefined>(watchLogLevel: WatchLogLevel, log: (s: string) => void, getDetailWatchInfo?: GetDetailWatchInfo<X, Y>): WatchDirectory<X, Y> {
        const createFileWatcher: CreateFileWatcher<WatchDirectoryFlags, undefined, undefined, X, Y> = getCreateFileWatcher(watchLogLevel, watchDirectory);
        return (host, directory, callback, flags, detailInfo1, detailInfo2) =>
            createFileWatcher(host, directory, callback, flags, /*passThrough*/ undefined, detailInfo1, detailInfo2, watchDirectory, log, "DirectoryWatcher", getDetailWatchInfo);
    }

    function watchFile(host: System, file: string, callback: FileWatcherCallback, pollingInterval?: number): FileWatcher {
        return host.watchFile(file, callback, pollingInterval);
    }

    function watchFilePath(host: System, file: string, callback: FilePathWatcherCallback, pollingInterval: number | undefined, path: Path): FileWatcher {
        return host.watchFile(file, (fileName, eventKind) => callback(fileName, eventKind, path), pollingInterval);
    }

    function watchDirectory(host: System, directory: string, callback: DirectoryWatcherCallback, flags: WatchDirectoryFlags): FileWatcher {
        return host.watchDirectory(directory, callback, (flags & WatchDirectoryFlags.Recursive) !== 0);
    }

    export type WatchCallback<T, U> = (fileName: string, cbOptional?: T, passThrough?: U) => void;
    export type AddWatch<T, U, V> = (host: System, file: string, cb: WatchCallback<U, V>, flags: T, passThrough?: V, detailInfo1?: undefined, detailInfo2?: undefined) => FileWatcher;
    export type GetDetailWatchInfo<X, Y> = (detailInfo1: X, detailInfo2: Y) => string;

    type CreateFileWatcher<T, U, V, X, Y> = (host: System, file: string, cb: WatchCallback<U, V>, flags: T, passThrough: V | undefined, detailInfo1: X | undefined, detailInfo2: Y | undefined, addWatch: AddWatch<T, U, V>, log: (s: string) => void, watchCaption: string, getDetailWatchInfo: GetDetailWatchInfo<X, Y> | undefined) => FileWatcher;
    function getCreateFileWatcher<T, U, V, X, Y>(watchLogLevel: WatchLogLevel, addWatch: AddWatch<T, U, V>): CreateFileWatcher<T, U, V, X, Y> {
        switch (watchLogLevel) {
            case WatchLogLevel.None:
                return addWatch;
            case WatchLogLevel.TriggerOnly:
                return createFileWatcherWithLogging;
            case WatchLogLevel.Verbose:
                return createFileWatcherWithTriggerLogging;
        }
    }

    function createFileWatcherWithLogging<T, U, V, X, Y>(host: System, file: string, cb: WatchCallback<U, V>, flags: T, passThrough: V | undefined, detailInfo1: X | undefined, detailInfo2: Y | undefined, addWatch: AddWatch<T, U, undefined>, log: (s: string) => void, watchCaption: string, getDetailWatchInfo: GetDetailWatchInfo<X, Y> | undefined): FileWatcher {
        log(`${watchCaption}:: Added:: ${getWatchInfo(file, flags, detailInfo1, detailInfo2, getDetailWatchInfo)}`);
        const watcher = createFileWatcherWithTriggerLogging(host, file, cb, flags, passThrough, detailInfo1, detailInfo2, addWatch, log, watchCaption, getDetailWatchInfo);
        return {
            close: () => {
                log(`${watchCaption}:: Close:: ${getWatchInfo(file, flags, detailInfo1, detailInfo2, getDetailWatchInfo)}`);
                watcher.close();
            }
        };
    }

    function createFileWatcherWithTriggerLogging<T, U, V, X, Y>(host: System, file: string, cb: WatchCallback<U, V>, flags: T, passThrough: V | undefined, detailInfo1: X | undefined, detailInfo2: Y | undefined, addWatch: AddWatch<T, U, undefined>, log: (s: string) => void, watchCaption: string, getDetailWatchInfo: GetDetailWatchInfo<X, Y> | undefined): FileWatcher {
        return addWatch(host, file, (fileName, cbOptional) => {
            const triggerredInfo = `${watchCaption}:: Triggered with ${fileName}${cbOptional !== undefined ? cbOptional : ""}:: ${getWatchInfo(file, flags, detailInfo1, detailInfo2, getDetailWatchInfo)}`;
            log(triggerredInfo);
            const start = timestamp();
            cb(fileName, cbOptional, passThrough);
            const elapsed = timestamp() - start;
            log(`Elapsed:: ${elapsed}ms ${triggerredInfo}`);
        }, flags);
    }

    function getWatchInfo<T, X, Y>(file: string, flags: T, detailInfo1: X | undefined, detailInfo2: Y | undefined, getDetailWatchInfo: GetDetailWatchInfo<X, Y> | undefined) {
        return `WatchInfo: ${file} ${flags} ${getDetailWatchInfo ? getDetailWatchInfo(detailInfo1, detailInfo2) : ""}`
    }

    export function closeFileWatcher(watcher: FileWatcher) {
        watcher.close();
    }

    export function closeFileWatcherOf<T extends { watcher: FileWatcher; }>(objWithWatcher: T) {
        objWithWatcher.watcher.close();
    }
}
