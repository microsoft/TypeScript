/// <reference path="core.ts" />

/* @internal */
namespace ts {
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

    export function addFileWatcher(host: System, file: string, cb: FileWatcherCallback): FileWatcher {
        return host.watchFile(file, cb);
    }

    export function addFileWatcherWithLogging(host: System, file: string, cb: FileWatcherCallback, log: (s: string) => void): FileWatcher {
        const watcherCaption = `FileWatcher:: `;
        return createWatcherWithLogging(addFileWatcher, watcherCaption, log, /*logOnlyTrigger*/ false, host, file, cb);
    }

    export function addFileWatcherWithOnlyTriggerLogging(host: System, file: string, cb: FileWatcherCallback, log: (s: string) => void): FileWatcher {
        const watcherCaption = `FileWatcher:: `;
        return createWatcherWithLogging(addFileWatcher, watcherCaption, log, /*logOnlyTrigger*/ true, host, file, cb);
    }

    export type FilePathWatcherCallback = (fileName: string, eventKind: FileWatcherEventKind, filePath: Path) => void;
    export function addFilePathWatcher(host: System, file: string, cb: FilePathWatcherCallback, path: Path): FileWatcher {
        return host.watchFile(file, (fileName, eventKind) => cb(fileName, eventKind, path));
    }

    export function addFilePathWatcherWithLogging(host: System, file: string, cb: FilePathWatcherCallback, path: Path, log: (s: string) => void): FileWatcher {
        const watcherCaption = `FileWatcher:: `;
        return createWatcherWithLogging(addFileWatcher, watcherCaption, log, /*logOnlyTrigger*/ false, host, file, cb, path);
    }

    export function addFilePathWatcherWithOnlyTriggerLogging(host: System, file: string, cb: FilePathWatcherCallback, path: Path, log: (s: string) => void): FileWatcher {
        const watcherCaption = `FileWatcher:: `;
        return createWatcherWithLogging(addFileWatcher, watcherCaption, log, /*logOnlyTrigger*/ true, host, file, cb, path);
    }

    export function addDirectoryWatcher(host: System, directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags): FileWatcher {
        const recursive = (flags & WatchDirectoryFlags.Recursive) !== 0;
        return host.watchDirectory(directory, cb, recursive);
    }

    export function addDirectoryWatcherWithLogging(host: System, directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags, log: (s: string) => void): FileWatcher {
        const watcherCaption = `DirectoryWatcher ${(flags & WatchDirectoryFlags.Recursive) !== 0 ? "recursive" : ""}:: `;
        return createWatcherWithLogging(addDirectoryWatcher, watcherCaption, log, /*logOnlyTrigger*/ false, host, directory, cb, flags);
    }

    export function addDirectoryWatcherWithOnlyTriggerLogging(host: System, directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags, log: (s: string) => void): FileWatcher {
        const watcherCaption = `DirectoryWatcher ${(flags & WatchDirectoryFlags.Recursive) !== 0 ? "recursive" : ""}:: `;
        return createWatcherWithLogging(addDirectoryWatcher, watcherCaption, log, /*logOnlyTrigger*/ true, host, directory, cb, flags);
    }

    type WatchCallback<T, U> = (fileName: string, cbOptional1?: T, optional?: U) => void;
    type AddWatch<T, U> = (host: System, file: string, cb: WatchCallback<T, U>, optional?: U) => FileWatcher;
    function createWatcherWithLogging<T, U>(addWatch: AddWatch<T, U>, watcherCaption: string, log: (s: string) => void, logOnlyTrigger: boolean, host: System, file: string, cb: WatchCallback<T, U>, optional?: U): FileWatcher {
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
