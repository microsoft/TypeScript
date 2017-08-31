/// <reference path="types.ts"/>
/// <reference path="core.ts"/>

/*@internal*/
namespace ts {
    /** This is the cache of module/typedirectives resolution that can be retained across program */
    export interface ResolutionCache {
        startRecordingFilesWithChangedResolutions(): void;
        finishRecordingFilesWithChangedResolutions(): Path[];

        resolveModuleNames(moduleNames: string[], containingFile: string, logChanges: boolean): ResolvedModuleFull[];
        resolveTypeReferenceDirectives(typeDirectiveNames: string[], containingFile: string): ResolvedTypeReferenceDirective[];

        invalidateResolutionOfFile(filePath: Path): void;
        createHasInvalidatedResolution(): HasInvalidatedResolution;

        startCachingPerDirectoryResolution(): void;
        finishCachingPerDirectoryResolution(): void;

        setRootDirectory(dir: string): void;

        updateTypeRootsWatch(): void;
        closeTypeRootsWatch(): void;

        clear(): void;
    }

    interface NameResolutionWithFailedLookupLocations {
        readonly failedLookupLocations: ReadonlyArray<string>;
        isInvalidated?: boolean;
    }

    export interface ResolutionCacheHost extends ModuleResolutionHost {
        toPath(fileName: string): Path;
        getCompilationSettings(): CompilerOptions;
        watchDirectoryOfFailedLookupLocation(directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags): FileWatcher;
        onInvalidatedResolution(): void;
        watchTypeRootsDirectory(directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags): FileWatcher;
        onChangedAutomaticTypeDirectiveNames(): void;
        getCachedPartialSystem?(): CachedPartialSystem;
        projectName?: string;
        getGlobalCache?(): string | undefined;
        writeLog(s: string): void;
    }

    export function createResolutionCache(resolutionHost: ResolutionCacheHost): ResolutionCache {
        let filesWithChangedSetOfUnresolvedImports: Path[] | undefined;
        let filesWithInvalidatedResolutions: Map<true> | undefined;

        // The resolvedModuleNames and resolvedTypeReferenceDirectives are the cache of resolutions per file.
        // The key in the map is source file's path.
        // The values are Map of resolutions with key being name lookedup.
        const resolvedModuleNames = createMap<Map<ResolvedModuleWithFailedLookupLocations>>();
        const perDirectoryResolvedModuleNames = createMap<Map<ResolvedModuleWithFailedLookupLocations>>();
        const resolvedTypeReferenceDirectives = createMap<Map<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>>();
        const perDirectoryResolvedTypeReferenceDirectives = createMap<Map<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>>();
        const getCurrentDirectory = memoize(() => resolutionHost.getCurrentDirectory());

        const directoryWatchesOfFailedLookups = createMap<FileWatcher>();
        let hasChangesInFailedLookupLocations = false;
        let rootDir: string;
        let rootPath: Path;

        // TypeRoot watches for the types that get added as part of getAutomaticTypeDirectiveNames
        const typeRootsWatches = createMap<FileWatcher>();

        return {
            startRecordingFilesWithChangedResolutions,
            finishRecordingFilesWithChangedResolutions,
            startCachingPerDirectoryResolution,
            finishCachingPerDirectoryResolution,
            resolveModuleNames,
            resolveTypeReferenceDirectives,
            invalidateResolutionOfFile,
            createHasInvalidatedResolution,
            setRootDirectory,
            updateTypeRootsWatch,
            closeTypeRootsWatch,
            clear
        };

        function setRootDirectory(dir: string) {
            Debug.assert(!resolvedModuleNames.size && !resolvedTypeReferenceDirectives.size && !directoryWatchesOfFailedLookups.size);
            rootDir = removeTrailingDirectorySeparator(getNormalizedAbsolutePath(dir, getCurrentDirectory()));
            rootPath = resolutionHost.toPath(rootDir);
        }

        function isInDirectoryPath(dir: Path, file: Path) {
            if (dir === undefined || file.length <= dir.length) {
                return false;
            }
            return startsWith(file, dir) && file[dir.length] === directorySeparator;
        }

        function clear() {
            clearMap(directoryWatchesOfFailedLookups, closeFileWatcher);
            hasChangesInFailedLookupLocations = false;
            closeTypeRootsWatch();
            resolvedModuleNames.clear();
            resolvedTypeReferenceDirectives.clear();
            Debug.assert(perDirectoryResolvedModuleNames.size === 0 && perDirectoryResolvedTypeReferenceDirectives.size === 0);
        }

        function startRecordingFilesWithChangedResolutions() {
            filesWithChangedSetOfUnresolvedImports = [];
        }

        function finishRecordingFilesWithChangedResolutions() {
            const collected = filesWithChangedSetOfUnresolvedImports;
            filesWithChangedSetOfUnresolvedImports = undefined;
            return collected;
        }

        function createHasInvalidatedResolution(): HasInvalidatedResolution {
            const collected = filesWithInvalidatedResolutions;
            filesWithInvalidatedResolutions = undefined;
            return path => collected && collected.has(path);
        }

        function startCachingPerDirectoryResolution() {
            Debug.assert(perDirectoryResolvedModuleNames.size === 0 && perDirectoryResolvedTypeReferenceDirectives.size === 0);
        }

        function finishCachingPerDirectoryResolution() {
            if (hasChangesInFailedLookupLocations) {
                const seenDirectories = createMap<true>();
                watchFailedLookupLocationForCache(perDirectoryResolvedModuleNames, seenDirectories);
                watchFailedLookupLocationForCache(perDirectoryResolvedTypeReferenceDirectives, seenDirectories);
                directoryWatchesOfFailedLookups.forEach((watcher, path) => {
                    if (!seenDirectories.has(path)) {
                        watcher.close();
                    }
                });
                hasChangesInFailedLookupLocations = false;
            }

            perDirectoryResolvedModuleNames.clear();
            perDirectoryResolvedTypeReferenceDirectives.clear();
        }

        function resolveModuleName(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost): ResolvedModuleWithFailedLookupLocations {
            const primaryResult = ts.resolveModuleName(moduleName, containingFile, compilerOptions, host);
            // return result immediately only if global cache support is not enabled or if it is .ts, .tsx or .d.ts
            if (!resolutionHost.getGlobalCache) {
                return primaryResult;
            }

            // otherwise try to load typings from @types
            const globalCache = resolutionHost.getGlobalCache();
            if (globalCache !== undefined && !isExternalModuleNameRelative(moduleName) && !(primaryResult.resolvedModule && extensionIsTypeScript(primaryResult.resolvedModule.extension))) {
                // create different collection of failed lookup locations for second pass
                // if it will fail and we've already found something during the first pass - we don't want to pollute its results
                const { resolvedModule, failedLookupLocations } = loadModuleFromGlobalCache(moduleName, resolutionHost.projectName, compilerOptions, host, globalCache);
                if (resolvedModule) {
                    return { resolvedModule, failedLookupLocations: addRange(primaryResult.failedLookupLocations as Array<string>, failedLookupLocations) };
                }
            }

            // Default return the result from the first pass
            return primaryResult;
        }

        function resolveNamesWithLocalCache<T extends NameResolutionWithFailedLookupLocations, R>(
            names: string[],
            containingFile: string,
            cache: Map<Map<T>>,
            perDirectoryCache: Map<Map<T>>,
            loader: (name: string, containingFile: string, options: CompilerOptions, host: ModuleResolutionHost) => T,
            getResult: (s: T) => R,
            getResultFileName: (result: R) => string | undefined,
            logChanges: boolean): R[] {

            const path = resolutionHost.toPath(containingFile);
            const currentResolutionsInFile = cache.get(path);
            const dirPath = getDirectoryPath(path);
            let perDirectoryResolution = perDirectoryCache.get(dirPath);
            if (!perDirectoryResolution) {
                perDirectoryResolution = createMap();
                perDirectoryCache.set(dirPath, perDirectoryResolution);
            }

            const newResolutions: Map<T> = createMap<T>();
            const resolvedModules: R[] = [];
            const compilerOptions = resolutionHost.getCompilationSettings();

            for (const name of names) {
                // check if this is a duplicate entry in the list
                let resolution = newResolutions.get(name);
                if (!resolution) {
                    const existingResolution = currentResolutionsInFile && currentResolutionsInFile.get(name);
                    if (existingResolution) {
                        // Remove from the cache since we would update the resolution in new file ourselves
                        currentResolutionsInFile.delete(name);
                    }

                    if (moduleResolutionIsValid(existingResolution)) {
                        // ok, it is safe to use existing name resolution results
                        resolution = existingResolution;
                    }
                    else {
                        const resolutionInDirectory = perDirectoryResolution && perDirectoryResolution.get(name);
                        if (resolutionInDirectory) {
                            resolution = resolutionInDirectory;
                        }
                        else {
                            resolution = loader(name, containingFile, compilerOptions, resolutionHost);
                            perDirectoryResolution.set(name, resolution);
                            hasChangesInFailedLookupLocations = hasChangesInFailedLookupLocations ||
                                resolution.failedLookupLocations !== (existingResolution && existingResolution.failedLookupLocations);
                        }
                    }
                    newResolutions.set(name, resolution);
                    if (logChanges && filesWithChangedSetOfUnresolvedImports && !resolutionIsEqualTo(existingResolution, resolution)) {
                        filesWithChangedSetOfUnresolvedImports.push(path);
                        // reset log changes to avoid recording the same file multiple times
                        logChanges = false;
                    }
                }

                Debug.assert(resolution !== undefined);

                resolvedModules.push(getResult(resolution));
            }

            // replace old results with a new one
            cache.set(path, newResolutions);
            return resolvedModules;

            function resolutionIsEqualTo(oldResolution: T, newResolution: T): boolean {
                if (oldResolution === newResolution) {
                    return true;
                }
                if (!oldResolution || !newResolution || oldResolution.isInvalidated) {
                    return false;
                }
                const oldResult = getResult(oldResolution);
                const newResult = getResult(newResolution);
                if (oldResult === newResult) {
                    return true;
                }
                if (!oldResult || !newResult) {
                    return false;
                }
                return getResultFileName(oldResult) === getResultFileName(newResult);
            }

            function moduleResolutionIsValid(resolution: T): boolean {
                if (!resolution || resolution.isInvalidated) {
                    return false;
                }

                const result = getResult(resolution);
                if (result) {
                    return true;
                }

                // consider situation if we have no candidate locations as valid resolution.
                // after all there is no point to invalidate it if we have no idea where to look for the module.
                return resolution.failedLookupLocations.length === 0;
            }
        }

        function resolveTypeReferenceDirectives(typeDirectiveNames: string[], containingFile: string): ResolvedTypeReferenceDirective[] {
            resolutionHost.writeLog(`resolveTypeReferenceDirectives[${resolvedTypeReferenceDirectives.size}"]: " + ${containingFile}`);
            return resolveNamesWithLocalCache(
                typeDirectiveNames, containingFile,
                resolvedTypeReferenceDirectives, perDirectoryResolvedTypeReferenceDirectives,
                resolveTypeReferenceDirective, m => m.resolvedTypeReferenceDirective, r => r.resolvedFileName,
                /*logChanges*/ false
            );
        }

        function resolveModuleNames(moduleNames: string[], containingFile: string, logChanges: boolean): ResolvedModuleFull[] {
            resolutionHost.writeLog(`resolveModuleNames[${resolvedModuleNames.size}"]: " + ${containingFile}`);
            return resolveNamesWithLocalCache(
                moduleNames, containingFile,
                resolvedModuleNames, perDirectoryResolvedModuleNames,
                resolveModuleName, m => m.resolvedModule, r => r.resolvedFileName,
                logChanges
            );
        }

        function isNodeModulesDirectory(dirPath: Path) {
            return endsWith(dirPath, "/node_modules");
        }

        type DirectoryOfFailedLookupWatch = { dir: string; dirPath: Path; };
        function getDirectoryToWatchFailedLookupLocation(failedLookupLocation: string, failedLookupLocationPath: Path): DirectoryOfFailedLookupWatch {
            if (isInDirectoryPath(rootPath, failedLookupLocationPath)) {
                return { dir: rootDir, dirPath: rootPath };
            }

            let dir = getDirectoryPath(getNormalizedAbsolutePath(failedLookupLocation, getCurrentDirectory()));
            let dirPath = getDirectoryPath(failedLookupLocationPath);

            // If the directory is node_modules use it to watch
            if (isNodeModulesDirectory(dirPath)) {
                return { dir, dirPath };
            }

            // If directory path contains node module, get the node_modules directory for watching
            if (dirPath.indexOf("/node_modules/") !== -1) {
                while (!isNodeModulesDirectory(dirPath)) {
                    dir = getDirectoryPath(dir);
                    dirPath = getDirectoryPath(dirPath);
                }
                return { dir, dirPath };
            }

            // Use some ancestor of the root directory
            if (rootPath !== undefined) {
                while (!isInDirectoryPath(dirPath, rootPath)) {
                    const parentPath = getDirectoryPath(dirPath);
                    if (parentPath === dirPath) {
                        break;
                    }
                    dirPath = parentPath;
                    dir = getDirectoryPath(dir);
                }
            }

            return { dir, dirPath };
        }

        function watchFailedLookupLocationForCache<T extends NameResolutionWithFailedLookupLocations>(
            cache: Map<Map<T>>, seenDirectories: Map<true>
        ) {
            cache.forEach(value => value && value.forEach(
                resolution => forEach(resolution && resolution.failedLookupLocations,
                    failedLookupLocation => {
                        const { dir, dirPath } = getDirectoryToWatchFailedLookupLocation(failedLookupLocation, resolutionHost.toPath(failedLookupLocation));
                        if (!seenDirectories.has(dirPath)) {
                            if (!directoryWatchesOfFailedLookups.has(dirPath)) {
                                directoryWatchesOfFailedLookups.set(dirPath, createDirectoryWatcher(dir, dirPath));
                            }
                            seenDirectories.set(dirPath, true);
                        }
                    }
                )
            ));
        }

        function createDirectoryWatcher(directory: string, dirPath: Path) {
            return resolutionHost.watchDirectoryOfFailedLookupLocation(directory, fileOrFolder => {
                const fileOrFolderPath = resolutionHost.toPath(fileOrFolder);
                if (resolutionHost.getCachedPartialSystem) {
                    // Since the file existance changed, update the sourceFiles cache
                    resolutionHost.getCachedPartialSystem().addOrDeleteFileOrFolder(fileOrFolder, fileOrFolderPath);
                }

                // If the files are added to project root or node_modules directory, always run through the invalidation process
                // Otherwise run through invalidation only if adding to the immediate directory
                if (dirPath === rootPath || isNodeModulesDirectory(dirPath) || getDirectoryPath(fileOrFolderPath) === dirPath) {
                    const isChangedFailedLookupLocation: (location: string) => boolean = dirPath === fileOrFolderPath ?
                        // If the file watched directory is created/deleted invalidate any resolution has failed lookup in this directory
                        location => isInDirectoryPath(dirPath, resolutionHost.toPath(location)) :
                        // Otherwise only the resolutions referencing the file or folder added
                        location => resolutionHost.toPath(location) === fileOrFolderPath;
                    if (invalidateResolutionOfFailedLookupLocation(isChangedFailedLookupLocation)) {
                        resolutionHost.onInvalidatedResolution();
                    }
                }
            }, WatchDirectoryFlags.Recursive);
        }

        function invalidateResolutionCacheOfDeletedFile<T extends NameResolutionWithFailedLookupLocations, R>(
            deletedFilePath: Path,
            cache: Map<Map<T>>,
            getResult: (s: T) => R,
            getResultFileName: (result: R) => string | undefined) {
            cache.forEach((value, path) => {
                if (path === deletedFilePath) {
                    cache.delete(path);
                    hasChangesInFailedLookupLocations = hasChangesInFailedLookupLocations ||
                        value && forEachEntry(value, resolution => !!resolution.failedLookupLocations);
                }
                else if (value) {
                    value.forEach(resolution => {
                        if (resolution && !resolution.isInvalidated) {
                            const result = getResult(resolution);
                            if (result) {
                                if (resolutionHost.toPath(getResultFileName(result)) === deletedFilePath) {
                                    resolution.isInvalidated = true;
                                    (filesWithInvalidatedResolutions || (filesWithInvalidatedResolutions = createMap<true>())).set(path, true);
                                }
                            }
                        }
                    });
                }
            });
        }

        function invalidateResolutionOfFile(filePath: Path) {
            invalidateResolutionCacheOfDeletedFile(filePath, resolvedModuleNames, m => m.resolvedModule, r => r.resolvedFileName);
            invalidateResolutionCacheOfDeletedFile(filePath, resolvedTypeReferenceDirectives, m => m.resolvedTypeReferenceDirective, r => r.resolvedFileName);
        }

        function invalidateResolutionCacheOfFailedLookupLocation<T extends NameResolutionWithFailedLookupLocations>(
            cache: Map<Map<T>>,
            isChangedFailedLookupLocation: (location: string) => boolean
        ) {
            cache.forEach((value, containingFile) => {
                if (value) {
                    value.forEach(resolution => {
                        if (resolution && !resolution.isInvalidated && some(resolution.failedLookupLocations, isChangedFailedLookupLocation)) {
                            // Mark the file as needing re-evaluation of module resolution instead of using it blindly.
                            resolution.isInvalidated = true;
                            (filesWithInvalidatedResolutions || (filesWithInvalidatedResolutions = createMap<true>())).set(containingFile, true);
                        }
                    });
                }
            });
        }

        function invalidateResolutionOfFailedLookupLocation(isChangedFailedLookupLocation: (location: string) => boolean) {
            const invalidatedFilesCount = filesWithInvalidatedResolutions && filesWithInvalidatedResolutions.size;
            invalidateResolutionCacheOfFailedLookupLocation(resolvedModuleNames, isChangedFailedLookupLocation);
            invalidateResolutionCacheOfFailedLookupLocation(resolvedTypeReferenceDirectives, isChangedFailedLookupLocation);
            return filesWithInvalidatedResolutions && filesWithInvalidatedResolutions.size !== invalidatedFilesCount;
        }

        function closeTypeRootsWatch() {
            clearMap(typeRootsWatches, closeFileWatcher);
        }

        function createTypeRootsWatch(_typeRootPath: string, typeRoot: string): FileWatcher {
            // Create new watch and recursive info
            return resolutionHost.watchTypeRootsDirectory(typeRoot, fileOrFolder => {
                const fileOrFolderPath = resolutionHost.toPath(fileOrFolder);
                if (resolutionHost.getCachedPartialSystem) {
                    // Since the file existance changed, update the sourceFiles cache
                    resolutionHost.getCachedPartialSystem().addOrDeleteFileOrFolder(fileOrFolder, fileOrFolderPath);
                }

                // For now just recompile
                // We could potentially store more data here about whether it was/would be really be used or not
                // and with that determine to trigger compilation but for now this is enough
                resolutionHost.onChangedAutomaticTypeDirectiveNames();
            }, WatchDirectoryFlags.Recursive);
        }

        /**
         * Watches the types that would get added as part of getAutomaticTypeDirectiveNames
         * To be called when compiler options change
         */
        function updateTypeRootsWatch() {
            const options = resolutionHost.getCompilationSettings();
            if (options.types) {
                // No need to do any watch since resolution cache is going to handle the failed lookups
                // for the types added by this
                closeTypeRootsWatch();
                return;
            }

            // we need to assume the directories exist to ensure that we can get all the type root directories that get included
            const typeRoots = getEffectiveTypeRoots(options, { directoryExists: returnTrue, getCurrentDirectory });
            if (typeRoots) {
                mutateMap(
                    typeRootsWatches,
                    arrayToMap(typeRoots, tr => resolutionHost.toPath(tr)),
                    {
                        createNewValue: createTypeRootsWatch,
                        onDeleteValue: closeFileWatcher
                    }
                );
            }
            else {
                closeTypeRootsWatch();
            }
        }
    }
}
