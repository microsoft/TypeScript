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

        clear(): void;
    }

    interface NameResolutionWithFailedLookupLocations {
        readonly failedLookupLocations: ReadonlyArray<string>;
        isInvalidated?: boolean;
    }

    interface DirectoryWatchesOfFailedLookup {
        /** watcher for the directory of failed lookup */
        watcher: FileWatcher;
        /** map with key being the failed lookup location path and value being the actual location */
        mapLocations: Map<number>;
    }

    export interface ResolutionCacheHost extends ModuleResolutionHost {
        toPath(fileName: string): Path;
        getCompilationSettings(): CompilerOptions;
        watchDirectoryOfFailedLookupLocation(directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags): FileWatcher;
        onInvalidatedResolution(): void;
        getCachedPartialSystem?(): CachedPartialSystem;
        projectName?: string;
        getGlobalCache?(): string | undefined;
        writeLog(s: string): void;
    }

    const MAX_DIRPATHS_TO_RECURSE = 5;

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

        const directoryWatchesOfFailedLookups = createMap<DirectoryWatchesOfFailedLookup>();
        const failedLookupLocationToDirPath = createMap<Path>();
        let rootDir: string;
        let rootPath: Path;
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
            clear
        };

        function setRootDirectory(dir: string) {
            Debug.assert(!resolvedModuleNames.size && !resolvedTypeReferenceDirectives.size && !directoryWatchesOfFailedLookups.size);
            rootDir = removeTrailingDirectorySeparator(getNormalizedAbsolutePath(dir, resolutionHost.getCurrentDirectory()));
            rootPath = resolutionHost.toPath(rootDir);
        }

        function isInDirectoryPath(dir: Path, file: Path) {
            if (dir === undefined || file.length <= dir.length) {
                return false;
            }
            return startsWith(file, dir) && file[dir.length] === directorySeparator;
        }

        function clear() {
            // Close all the watches for failed lookup locations, irrespective of refcounts for them since this is to clear the cache
            clearMap(directoryWatchesOfFailedLookups, closeFileWatcherOf);
            failedLookupLocationToDirPath.clear();
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
                        }
                        updateFailedLookupLocationWatches(resolution.failedLookupLocations, existingResolution && existingResolution.failedLookupLocations);
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

            // Close all the file watchers for the names that arent required any more
            if (currentResolutionsInFile) {
                clearMap(currentResolutionsInFile, resolution => withFailedLookupLocations(resolution.failedLookupLocations, closeFailedLookupLocationWatcher));
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
            resolutionHost.writeLog(`resolveTypeReferenceDirectives: ${typeDirectiveNames} in ${containingFile}`);
            return resolveNamesWithLocalCache(
                typeDirectiveNames, containingFile,
                resolvedTypeReferenceDirectives, perDirectoryResolvedTypeReferenceDirectives,
                resolveTypeReferenceDirective, m => m.resolvedTypeReferenceDirective, r => r.resolvedFileName,
                /*logChanges*/ false
            );
        }

        function resolveModuleNames(moduleNames: string[], containingFile: string, logChanges: boolean): ResolvedModuleFull[] {
            resolutionHost.writeLog(`resolveModuleNames: ${moduleNames} in ${containingFile}`);
            return resolveNamesWithLocalCache(
                moduleNames, containingFile,
                resolvedModuleNames, perDirectoryResolvedModuleNames,
                resolveModuleName, m => m.resolvedModule, r => r.resolvedFileName,
                logChanges
            );
        }

        function watchFailedLookupLocation(failedLookupLocation: string, failedLookupLocationPath: Path) {
            const cachedDir = failedLookupLocationToDirPath.get(failedLookupLocationPath);
            if (cachedDir) {
                watchFailedLookupLocationInDirectory(cachedDir, failedLookupLocationPath, /*dir*/ undefined);
                return;
            }

            if (isInDirectoryPath(rootPath, failedLookupLocationPath)) {
                // Watch in directory of rootPath
                watchFailedLookupLocationInDirectory(rootPath, failedLookupLocationPath, rootDir);
                return;
            }

            let dirPath = getDirectoryPath(failedLookupLocationPath);
            let dir = getDirectoryPath(getNormalizedAbsolutePath(failedLookupLocation, resolutionHost.getCurrentDirectory()));
            for (let i = 0; i < MAX_DIRPATHS_TO_RECURSE; i++) {
                const parentPath = getDirectoryPath(dirPath);
                if (directoryWatchesOfFailedLookups.has(dirPath) || parentPath === dirPath) {
                    watchFailedLookupLocationInDirectory(dirPath, failedLookupLocationPath, dir);
                    return;
                }
                dirPath = parentPath;
                dir = getDirectoryPath(dir);
            }

            // Verify there are no watches in parent directory
            const ancestorDirPath = getAncestorDirectoryWithWatches(dirPath);
            // We wont need directory if we are using ancestor since its already cached
            watchFailedLookupLocationInDirectory(ancestorDirPath || dirPath, failedLookupLocationPath, dir);
        }

        function getAncestorDirectoryWithWatches(dirPath: Path) {
            for (let parentDirPath = getDirectoryPath(dirPath); parentDirPath !== dirPath; parentDirPath = getDirectoryPath(parentDirPath)) {
                if (directoryWatchesOfFailedLookups.has(parentDirPath)) {
                    return parentDirPath;
                }
                dirPath = parentDirPath;
            }
            return undefined;
        }

        function watchFailedLookupLocationInDirectory(dirPath: Path, failedLookupLocationPath: Path, dir: string | undefined) {
            failedLookupLocationToDirPath.set(failedLookupLocationPath, dirPath);
            const watches = directoryWatchesOfFailedLookups.get(dirPath);
            if (watches) {
                const existingCount = watches.mapLocations.get(failedLookupLocationPath) || 0;
                watches.mapLocations.set(failedLookupLocationPath, existingCount + 1);
            }
            else {
                Debug.assert(dir !== undefined);
                const mapLocations = createMap<number>();
                mapLocations.set(failedLookupLocationPath, 1);
                directoryWatchesOfFailedLookups.set(dirPath, {
                    watcher: createDirectoryWatcher(dir, dirPath),
                    mapLocations
                });
            }
        }

        function createDirectoryWatcher(directory: string, dirPath: Path) {
            return resolutionHost.watchDirectoryOfFailedLookupLocation(directory, fileOrFolder => {
                const fileOrFolderPath = resolutionHost.toPath(fileOrFolder);
                if (resolutionHost.getCachedPartialSystem) {
                    // Since the file existance changed, update the sourceFiles cache
                    resolutionHost.getCachedPartialSystem().addOrDeleteFileOrFolder(fileOrFolder, fileOrFolderPath);
                }

                // If the location results in update to failed lookup, schedule program update
                if (dirPath === fileOrFolderPath) {
                    onAddOrRemoveDirectoryOfFailedLookup(dirPath);
                    resolutionHost.onInvalidatedResolution();
                }
                else if (onFileAddOrRemoveInDirectoryOfFailedLookup(dirPath, fileOrFolderPath)) {
                    resolutionHost.onInvalidatedResolution();
                }
            }, WatchDirectoryFlags.Recursive);
        }

        function closeFailedLookupLocationWatcher(_failedLookupLocation: string, failedLookupLocationPath: Path) {
            const dirPath = failedLookupLocationToDirPath.get(failedLookupLocationPath);
            const watches = directoryWatchesOfFailedLookups.get(dirPath);
            const refCount = watches.mapLocations.get(failedLookupLocationPath);
            if (refCount === 1) {
                // If this was last failed lookup location being tracked by the dir watcher,
                // remove the failed lookup location path to dir Path entry
                watches.mapLocations.delete(failedLookupLocationPath);
                failedLookupLocationToDirPath.delete(failedLookupLocationPath);

                // If there are no more files that need this watcher alive, close the watcher
                if (watches.mapLocations.size === 0) {
                    watches.watcher.close();
                    directoryWatchesOfFailedLookups.delete(dirPath);
                }
            }
            else {
                watches.mapLocations.set(failedLookupLocationPath, refCount - 1);
            }
        }

        type FailedLookupLocationAction = (failedLookupLocation: string, failedLookupLocationPath: Path) => void;
        function withFailedLookupLocations(failedLookupLocations: ReadonlyArray<string> | undefined, fn: FailedLookupLocationAction, startIndex?: number) {
            if (failedLookupLocations) {
                for (let i = startIndex || 0; i < failedLookupLocations.length; i++) {
                    fn(failedLookupLocations[i], resolutionHost.toPath(failedLookupLocations[i]));
                }
            }
        }

        function updateFailedLookupLocationWatches(failedLookupLocations: ReadonlyArray<string> | undefined, existingFailedLookupLocations: ReadonlyArray<string> | undefined) {
            const index = existingFailedLookupLocations && failedLookupLocations ?
                findDiffIndex(failedLookupLocations, existingFailedLookupLocations) :
                0;

            // Watch all the failed lookup locations
            withFailedLookupLocations(failedLookupLocations, watchFailedLookupLocation, index);

            // Close existing watches for the failed locations
            withFailedLookupLocations(existingFailedLookupLocations, closeFailedLookupLocationWatcher, index);
        }

        function invalidateResolutionCacheOfDeletedFile<T extends NameResolutionWithFailedLookupLocations, R>(
            deletedFilePath: Path,
            cache: Map<Map<T>>,
            getResult: (s: T) => R,
            getResultFileName: (result: R) => string | undefined) {
            cache.forEach((value, path) => {
                if (path === deletedFilePath) {
                    cache.delete(path);
                    value.forEach(resolution => {
                        withFailedLookupLocations(resolution.failedLookupLocations, closeFailedLookupLocationWatcher);
                    });
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

        function invalidateResolutionCacheOfChangedFailedLookupLocation<T extends NameResolutionWithFailedLookupLocations>(
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

        function invalidateResolutionOfFile(filePath: Path) {
            invalidateResolutionCacheOfDeletedFile(filePath, resolvedModuleNames, m => m.resolvedModule, r => r.resolvedFileName);
            invalidateResolutionCacheOfDeletedFile(filePath, resolvedTypeReferenceDirectives, m => m.resolvedTypeReferenceDirective, r => r.resolvedFileName);
        }

        function onFileAddOrRemoveInDirectoryOfFailedLookup(dirPath: Path, fileOrFolder: Path) {
            const watches = directoryWatchesOfFailedLookups.get(dirPath);
            const isFailedLookupFile = watches.mapLocations.has(fileOrFolder);
            if (isFailedLookupFile) {
                const isFileOrFolder: (location: string) => boolean = location => resolutionHost.toPath(location) === fileOrFolder;
                invalidateResolutionCacheOfChangedFailedLookupLocation(resolvedModuleNames, isFileOrFolder);
                invalidateResolutionCacheOfChangedFailedLookupLocation(resolvedTypeReferenceDirectives, isFileOrFolder);
            }
            return isFailedLookupFile;
        }

        function onAddOrRemoveDirectoryOfFailedLookup(dirPath: Path) {
            const isInDirPath: (location: string) => boolean = location => isInDirectoryPath(dirPath, resolutionHost.toPath(location));
            invalidateResolutionCacheOfChangedFailedLookupLocation(resolvedModuleNames, isInDirPath);
            invalidateResolutionCacheOfChangedFailedLookupLocation(resolvedTypeReferenceDirectives, isInDirPath);
        }
    }
}
