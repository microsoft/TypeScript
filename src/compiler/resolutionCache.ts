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

    interface DirectoryWatchesOfFailedLookup {
        /** watcher for the directory of failed lookup */
        watcher: FileWatcher;
        /** ref count keeping this directory watch alive */
        refCount: number;
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

        const directoryWatchesOfFailedLookups = createMap<DirectoryWatchesOfFailedLookup>();
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
            clearMap(directoryWatchesOfFailedLookups, closeFileWatcherOf);
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
            directoryWatchesOfFailedLookups.forEach((watcher, path) => {
                if (watcher.refCount === 0) {
                    directoryWatchesOfFailedLookups.delete(path);
                    watcher.watcher.close();
                }
            });

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
            const resolutionsInFile = cache.get(path) || cache.set(path, createMap()).get(path);
            const dirPath = getDirectoryPath(path);
            let perDirectoryResolution = perDirectoryCache.get(dirPath);
            if (!perDirectoryResolution) {
                perDirectoryResolution = createMap();
                perDirectoryCache.set(dirPath, perDirectoryResolution);
            }

            const resolvedModules: R[] = [];
            const compilerOptions = resolutionHost.getCompilationSettings();

            const seenNamesInFile = createMap<true>();
            for (const name of names) {
                let resolution = resolutionsInFile.get(name);
                // Resolution is valid if it is present and not invalidated
                if (!resolution || resolution.isInvalidated) {
                    const existingResolution = resolution;
                    const resolutionInDirectory = perDirectoryResolution.get(name);
                    if (resolutionInDirectory) {
                        resolution = resolutionInDirectory;
                    }
                    else {
                        resolution = loader(name, containingFile, compilerOptions, resolutionHost);
                        perDirectoryResolution.set(name, resolution);
                    }
                    resolutionsInFile.set(name, resolution);
                    const diffIndex = existingResolution && existingResolution.failedLookupLocations && resolution.failedLookupLocations && findDiffIndex(resolution.failedLookupLocations, existingResolution.failedLookupLocations);
                    watchFailedLookupLocationOfResolution(resolution, diffIndex || 0);
                    stopWatchFailedLookupLocationOfResolutionFrom(existingResolution, diffIndex || 0);
                    if (logChanges && filesWithChangedSetOfUnresolvedImports && !resolutionIsEqualTo(existingResolution, resolution)) {
                        filesWithChangedSetOfUnresolvedImports.push(path);
                        // reset log changes to avoid recording the same file multiple times
                        logChanges = false;
                    }
                }
                Debug.assert(resolution !== undefined && !resolution.isInvalidated);
                seenNamesInFile.set(name, true);
                resolvedModules.push(getResult(resolution));
            }

            // Stop watching and remove the unused name
            resolutionsInFile.forEach((resolution, name) => {
                if (!seenNamesInFile.has(name)) {
                    stopWatchFailedLookupLocationOfResolution(resolution);
                    resolutionsInFile.delete(name);
                }
            });

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
        }

        function resolveTypeReferenceDirectives(typeDirectiveNames: string[], containingFile: string): ResolvedTypeReferenceDirective[] {
            return resolveNamesWithLocalCache(
                typeDirectiveNames, containingFile,
                resolvedTypeReferenceDirectives, perDirectoryResolvedTypeReferenceDirectives,
                resolveTypeReferenceDirective, m => m.resolvedTypeReferenceDirective, r => r.resolvedFileName,
                /*logChanges*/ false
            );
        }

        function resolveModuleNames(moduleNames: string[], containingFile: string, logChanges: boolean): ResolvedModuleFull[] {
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

        function watchFailedLookupLocationOfResolution<T extends NameResolutionWithFailedLookupLocations>(
            resolution: T, startIndex?: number
        ) {
            if (resolution && resolution.failedLookupLocations) {
                for (let i = startIndex || 0; i < resolution.failedLookupLocations.length; i++) {
                    const failedLookupLocation = resolution.failedLookupLocations[i];
                    const { dir, dirPath } = getDirectoryToWatchFailedLookupLocation(failedLookupLocation, resolutionHost.toPath(failedLookupLocation));
                    const dirWatcher = directoryWatchesOfFailedLookups.get(dirPath);
                    if (dirWatcher) {
                        dirWatcher.refCount++;
                    }
                    else {
                        directoryWatchesOfFailedLookups.set(dirPath, { watcher: createDirectoryWatcher(dir, dirPath), refCount: 1 });
                    }
                }
            }
        }

        function stopWatchFailedLookupLocationOfResolution<T extends NameResolutionWithFailedLookupLocations>(
            resolution: T
        ) {
            stopWatchFailedLookupLocationOfResolutionFrom(resolution, 0);
        }

        function stopWatchFailedLookupLocationOfResolutionFrom<T extends NameResolutionWithFailedLookupLocations>(
            resolution: T, startIndex: number
        ) {
            if (resolution && resolution.failedLookupLocations) {
                for (let i = startIndex; i < resolution.failedLookupLocations.length; i++) {
                    const failedLookupLocation = resolution.failedLookupLocations[i];
                    const { dirPath } = getDirectoryToWatchFailedLookupLocation(failedLookupLocation, resolutionHost.toPath(failedLookupLocation));
                    const dirWatcher = directoryWatchesOfFailedLookups.get(dirPath);
                    // Do not close the watcher yet since it might be needed by other failed lookup locations.
                    dirWatcher.refCount--;
                }
            }
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
                    if (value) {
                        value.forEach(stopWatchFailedLookupLocationOfResolution);
                    }
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
