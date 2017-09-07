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

    interface ResolutionWithResolvedFileName {
        resolvedFileName: string | undefined;
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

        const failedLookupDefaultExtensions = [Extension.Ts, Extension.Tsx, Extension.Js, Extension.Jsx, Extension.Json];
        const customFailedLookupPaths = createMap<number>();

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

        function getResolvedModule(resolution: ResolvedModuleWithFailedLookupLocations) {
            return resolution.resolvedModule;
        }

        function getResolvedTypeReferenceDirective(resolution: ResolvedTypeReferenceDirectiveWithFailedLookupLocations) {
            return resolution.resolvedTypeReferenceDirective;
        }

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
            customFailedLookupPaths.clear();
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

        function resolveNamesWithLocalCache<T extends NameResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>(
            names: string[],
            containingFile: string,
            cache: Map<Map<T>>,
            perDirectoryCache: Map<Map<T>>,
            loader: (name: string, containingFile: string, options: CompilerOptions, host: ModuleResolutionHost) => T,
            getResolutionFromNameResolutionWithFailedLookupLocations: (s: T) => R,
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
                resolvedModules.push(getResolutionFromNameResolutionWithFailedLookupLocations(resolution));
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
                const oldResult = getResolutionFromNameResolutionWithFailedLookupLocations(oldResolution);
                const newResult = getResolutionFromNameResolutionWithFailedLookupLocations(newResolution);
                if (oldResult === newResult) {
                    return true;
                }
                if (!oldResult || !newResult) {
                    return false;
                }
                return oldResult.resolvedFileName === newResult.resolvedFileName;
            }
        }

        function resolveTypeReferenceDirectives(typeDirectiveNames: string[], containingFile: string): ResolvedTypeReferenceDirective[] {
            return resolveNamesWithLocalCache(
                typeDirectiveNames, containingFile,
                resolvedTypeReferenceDirectives, perDirectoryResolvedTypeReferenceDirectives,
                resolveTypeReferenceDirective, getResolvedTypeReferenceDirective,
                /*logChanges*/ false
            );
        }

        function resolveModuleNames(moduleNames: string[], containingFile: string, logChanges: boolean): ResolvedModuleFull[] {
            return resolveNamesWithLocalCache(
                moduleNames, containingFile,
                resolvedModuleNames, perDirectoryResolvedModuleNames,
                resolveModuleName, getResolvedModule,
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

        function isPathWithDefaultFailedLookupExtension(path: Path) {
            return fileExtensionIsOneOf(path, failedLookupDefaultExtensions);
        }

        function watchFailedLookupLocationOfResolution<T extends NameResolutionWithFailedLookupLocations>(
            resolution: T, startIndex?: number
        ) {
            if (resolution && resolution.failedLookupLocations) {
                for (let i = startIndex || 0; i < resolution.failedLookupLocations.length; i++) {
                    const failedLookupLocation = resolution.failedLookupLocations[i];
                    const failedLookupLocationPath = resolutionHost.toPath(failedLookupLocation);
                    // If the failed lookup location path is not one of the supported extensions,
                    // store it in the custom path
                    if (!isPathWithDefaultFailedLookupExtension(failedLookupLocationPath)) {
                        const refCount = customFailedLookupPaths.get(failedLookupLocationPath) || 0;
                        customFailedLookupPaths.set(failedLookupLocationPath, refCount + 1);
                    }
                    const { dir, dirPath } = getDirectoryToWatchFailedLookupLocation(failedLookupLocation, failedLookupLocationPath);
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
                    const failedLookupLocationPath = resolutionHost.toPath(failedLookupLocation);
                    const refCount = customFailedLookupPaths.get(failedLookupLocationPath);
                    if (refCount) {
                        if (refCount === 1) {
                            customFailedLookupPaths.delete(failedLookupLocationPath);
                        }
                        else {
                            customFailedLookupPaths.set(failedLookupLocationPath, refCount - 1);
                        }
                    }
                    const { dirPath } = getDirectoryToWatchFailedLookupLocation(failedLookupLocation, failedLookupLocationPath);
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
                    let isChangedFailedLookupLocation: (location: string) => boolean;
                    if (dirPath === fileOrFolderPath) {
                        // Watching directory is created
                        // Invalidate any resolution has failed lookup in this directory
                        isChangedFailedLookupLocation = location => isInDirectoryPath(dirPath, resolutionHost.toPath(location));
                    }
                    else {
                        // Some file or folder in the watching directory is created
                        // Return early if it does not have any of the watching extension or not the custom failed lookup path
                        if (!isPathWithDefaultFailedLookupExtension(fileOrFolderPath) && !customFailedLookupPaths.has(fileOrFolderPath)) {
                            return;
                        }
                        // Resolution need to be invalidated if failed lookup location is same as the file or folder getting created
                        isChangedFailedLookupLocation = location => resolutionHost.toPath(location) === fileOrFolderPath;
                    }
                    const hasChangedFailedLookupLocation = (resolution: NameResolutionWithFailedLookupLocations) => some(resolution.failedLookupLocations, isChangedFailedLookupLocation);
                    if (invalidateResolutionOfFailedLookupLocation(hasChangedFailedLookupLocation)) {
                        resolutionHost.onInvalidatedResolution();
                    }
                }
            }, WatchDirectoryFlags.Recursive);
        }

        function invalidateResolutionCache<T extends NameResolutionWithFailedLookupLocations>(
            cache: Map<Map<T>>,
            ignoreFile: (resolutions: Map<T>, containingFilePath: Path) => boolean,
            isInvalidatedResolution: (resolution: T) => boolean
        ) {
            const seen = createMap<Map<true>>();
            cache.forEach((resolutions, containingFilePath) => {
                if (!ignoreFile(resolutions, containingFilePath as Path) && resolutions) {
                    const dirPath = getDirectoryPath(containingFilePath);
                    let seenInDir = seen.get(dirPath);
                    if (!seenInDir) {
                        seenInDir = createMap<true>();
                        seen.set(dirPath, seenInDir);
                    }
                    resolutions.forEach((resolution, name) => {
                        if (seenInDir.has(name)) {
                            return;
                        }
                        seenInDir.set(name, true);
                        if (!resolution.isInvalidated && isInvalidatedResolution(resolution)) {
                            // Mark the file as needing re-evaluation of module resolution instead of using it blindly.
                            resolution.isInvalidated = true;
                            (filesWithInvalidatedResolutions || (filesWithInvalidatedResolutions = createMap<true>())).set(containingFilePath, true);
                        }
                    });
                }
            });
        }

        function invalidateResolutionCacheOfDeletedFile<T extends NameResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>(
            deletedFilePath: Path,
            cache: Map<Map<T>>,
            getResolutionFromNameResolutionWithFailedLookupLocations: (s: T) => R,
        ) {
            invalidateResolutionCache(
                cache,
                // Ignore file thats same as deleted file path, and handle it here
                (resolutions, containingFilePath) => {
                    if (containingFilePath !== deletedFilePath) {
                        return false;
                    }

                    // Deleted file, stop watching failed lookups for all the resolutions in the file
                    cache.delete(containingFilePath);
                    resolutions.forEach(stopWatchFailedLookupLocationOfResolution);
                    return true;
                },
                // Resolution is invalidated if the resulting file name is same as the deleted file path
                resolution => {
                    const result = getResolutionFromNameResolutionWithFailedLookupLocations(resolution);
                    return result && resolutionHost.toPath(result.resolvedFileName) === deletedFilePath;
                }
            );
        }

        function invalidateResolutionOfFile(filePath: Path) {
            invalidateResolutionCacheOfDeletedFile(filePath, resolvedModuleNames, getResolvedModule);
            invalidateResolutionCacheOfDeletedFile(filePath, resolvedTypeReferenceDirectives, getResolvedTypeReferenceDirective);
        }

        function invalidateResolutionCacheOfFailedLookupLocation<T extends NameResolutionWithFailedLookupLocations>(
            cache: Map<Map<T>>,
            hasChangedFailedLookupLocation: (resolution: T) => boolean
        ) {
            invalidateResolutionCache(
                cache,
                // Do not ignore any file
                returnFalse,
                // Resolution is invalidated if the resulting file name is same as the deleted file path
                hasChangedFailedLookupLocation
            );
        }

        function invalidateResolutionOfFailedLookupLocation(hasChangedFailedLookupLocation: (resolution: NameResolutionWithFailedLookupLocations) => boolean) {
            const invalidatedFilesCount = filesWithInvalidatedResolutions && filesWithInvalidatedResolutions.size;
            invalidateResolutionCacheOfFailedLookupLocation(resolvedModuleNames, hasChangedFailedLookupLocation);
            invalidateResolutionCacheOfFailedLookupLocation(resolvedTypeReferenceDirectives, hasChangedFailedLookupLocation);
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
