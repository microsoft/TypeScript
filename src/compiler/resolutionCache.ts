/*@internal*/
namespace ts {
    /** This is the cache of module/typedirectives resolution that can be retained across program */
    export interface ResolutionCache {
        startRecordingFilesWithChangedResolutions(): void;
        finishRecordingFilesWithChangedResolutions(): Path[] | undefined;

        resolveModuleNames(moduleNames: string[], containingFile: string, reusedNames: string[] | undefined, redirectedReference?: ResolvedProjectReference): (ResolvedModuleFull | undefined)[];
        getResolvedModuleWithFailedLookupLocationsFromCache(moduleName: string, containingFile: string): CachedResolvedModuleWithFailedLookupLocations | undefined;
        resolveTypeReferenceDirectives(typeDirectiveNames: string[], containingFile: string, redirectedReference?: ResolvedProjectReference): (ResolvedTypeReferenceDirective | undefined)[];

        invalidateResolutionsOfFailedLookupLocations(): boolean;
        invalidateResolutionOfFile(filePath: Path): void;
        removeResolutionsOfFile(filePath: Path): void;
        removeResolutionsFromProjectReferenceRedirects(filePath: Path): void;
        setFilesWithInvalidatedNonRelativeUnresolvedImports(filesWithUnresolvedImports: Map<readonly string[]>): void;
        createHasInvalidatedResolution(forceAllFilesAsInvalidated?: boolean): HasInvalidatedResolution;
        hasChangedAutomaticTypeDirectiveNames(): boolean;

        startCachingPerDirectoryResolution(): void;
        finishCachingPerDirectoryResolution(): void;

        updateTypeRootsWatch(): void;
        closeTypeRootsWatch(): void;

        clear(): void;
    }

    interface ResolutionWithFailedLookupLocations {
        readonly failedLookupLocations: string[];
        isInvalidated?: boolean;
        refCount?: number;
        // Files that have this resolution using
        files?: Path[];
    }

    interface ResolutionWithResolvedFileName {
        resolvedFileName: string | undefined;
    }

    interface CachedResolvedModuleWithFailedLookupLocations extends ResolvedModuleWithFailedLookupLocations, ResolutionWithFailedLookupLocations {
    }

    interface CachedResolvedTypeReferenceDirectiveWithFailedLookupLocations extends ResolvedTypeReferenceDirectiveWithFailedLookupLocations, ResolutionWithFailedLookupLocations {
    }

    export interface ResolutionCacheHost extends ModuleResolutionHost {
        toPath(fileName: string): Path;
        getCanonicalFileName: GetCanonicalFileName;
        getCompilationSettings(): CompilerOptions;
        watchDirectoryOfFailedLookupLocation(directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags): FileWatcher;
        onInvalidatedResolution(): void;
        watchTypeRootsDirectory(directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags): FileWatcher;
        onChangedAutomaticTypeDirectiveNames(): void;
        scheduleInvalidateResolutionsOfFailedLookupLocations(): void;
        getCachedDirectoryStructureHost(): CachedDirectoryStructureHost | undefined;
        projectName?: string;
        getGlobalCache?(): string | undefined;
        globalCacheResolutionModuleName?(externalModuleName: string): string;
        writeLog(s: string): void;
        getCurrentProgram(): Program | undefined;
        fileIsOpen(filePath: Path): boolean;
        getCompilerHost?(): CompilerHost | undefined;
    }

    interface DirectoryWatchesOfFailedLookup {
        /** watcher for the directory of failed lookup */
        watcher: FileWatcher;
        /** ref count keeping this directory watch alive */
        refCount: number;
        /** is the directory watched being non recursive */
        nonRecursive?: boolean;
    }

    interface DirectoryOfFailedLookupWatch {
        dir: string;
        dirPath: Path;
        nonRecursive?: boolean;
    }

    export function removeIgnoredPath(path: Path): Path | undefined {
        // Consider whole staging folder as if node_modules changed.
        if (endsWith(path, "/node_modules/.staging")) {
            return removeSuffix(path, "/.staging") as Path;
        }

        return some(ignoredPaths, searchPath => stringContains(path, searchPath)) ?
            undefined :
            path;
    }

    /**
     * Filter out paths like
     * "/", "/user", "/user/username", "/user/username/folderAtRoot",
     * "c:/", "c:/users", "c:/users/username", "c:/users/username/folderAtRoot", "c:/folderAtRoot"
     * @param dirPath
     */
    export function canWatchDirectory(dirPath: Path) {
        const rootLength = getRootLength(dirPath);
        if (dirPath.length === rootLength) {
            // Ignore "/", "c:/"
            return false;
        }

        let nextDirectorySeparator = dirPath.indexOf(directorySeparator, rootLength);
        if (nextDirectorySeparator === -1) {
            // ignore "/user", "c:/users" or "c:/folderAtRoot"
            return false;
        }

        let pathPartForUserCheck = dirPath.substring(rootLength, nextDirectorySeparator + 1);
        const isNonDirectorySeparatorRoot = rootLength > 1 || dirPath.charCodeAt(0) !== CharacterCodes.slash;
        if (isNonDirectorySeparatorRoot &&
            dirPath.search(/[a-zA-Z]:/) !== 0 && // Non dos style paths
            pathPartForUserCheck.search(/[a-zA-z]\$\//) === 0) { // Dos style nextPart
            nextDirectorySeparator = dirPath.indexOf(directorySeparator, nextDirectorySeparator + 1);
            if (nextDirectorySeparator === -1) {
                // ignore "//vda1cs4850/c$/folderAtRoot"
                return false;
            }

            pathPartForUserCheck = dirPath.substring(rootLength + pathPartForUserCheck.length, nextDirectorySeparator + 1);
        }

        if (isNonDirectorySeparatorRoot &&
            pathPartForUserCheck.search(/users\//i) !== 0) {
            // Paths like c:/folderAtRoot/subFolder are allowed
            return true;
        }

        for (let searchIndex = nextDirectorySeparator + 1, searchLevels = 2; searchLevels > 0; searchLevels--) {
            searchIndex = dirPath.indexOf(directorySeparator, searchIndex) + 1;
            if (searchIndex === 0) {
                // Folder isnt at expected minimum levels
                return false;
            }
        }
        return true;
    }

    type GetResolutionWithResolvedFileName<T extends ResolutionWithFailedLookupLocations = ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName = ResolutionWithResolvedFileName> =
        (resolution: T) => R | undefined;

    export function createResolutionCache(resolutionHost: ResolutionCacheHost, rootDirForResolution: string | undefined, logChangesWhenResolvingModule: boolean): ResolutionCache {
        let filesWithChangedSetOfUnresolvedImports: Path[] | undefined;
        let filesWithInvalidatedResolutions: Map<true> | undefined;
        let filesWithInvalidatedNonRelativeUnresolvedImports: ReadonlyMap<readonly string[]> | undefined;
        const nonRelativeExternalModuleResolutions = createMultiMap<ResolutionWithFailedLookupLocations>();

        const resolutionsWithFailedLookups: ResolutionWithFailedLookupLocations[] = [];
        const resolvedFileToResolution = createMultiMap<ResolutionWithFailedLookupLocations>();

        let hasChangedAutomaticTypeDirectiveNames = false;
        const failedLookupChecks: Path[] = [];
        const startsWithPathChecks: Path[] = [];
        const isInDirectoryChecks: Path[] = [];

        const getCurrentDirectory = memoize(() => resolutionHost.getCurrentDirectory!()); // TODO: GH#18217
        const cachedDirectoryStructureHost = resolutionHost.getCachedDirectoryStructureHost();

        // The resolvedModuleNames and resolvedTypeReferenceDirectives are the cache of resolutions per file.
        // The key in the map is source file's path.
        // The values are Map of resolutions with key being name lookedup.
        const resolvedModuleNames = createMap<Map<CachedResolvedModuleWithFailedLookupLocations>>();
        const perDirectoryResolvedModuleNames: CacheWithRedirects<Map<CachedResolvedModuleWithFailedLookupLocations>> = createCacheWithRedirects();
        const nonRelativeModuleNameCache: CacheWithRedirects<PerModuleNameCache> = createCacheWithRedirects();
        const moduleResolutionCache = createModuleResolutionCacheWithMaps(
            perDirectoryResolvedModuleNames,
            nonRelativeModuleNameCache,
            getCurrentDirectory(),
            resolutionHost.getCanonicalFileName
        );

        const resolvedTypeReferenceDirectives = createMap<Map<CachedResolvedTypeReferenceDirectiveWithFailedLookupLocations>>();
        const perDirectoryResolvedTypeReferenceDirectives: CacheWithRedirects<Map<CachedResolvedTypeReferenceDirectiveWithFailedLookupLocations>> = createCacheWithRedirects();

        /**
         * These are the extensions that failed lookup files will have by default,
         * any other extension of failed lookup will be store that path in custom failed lookup path
         * This helps in not having to comb through all resolutions when files are added/removed
         * Note that .d.ts file also has .d.ts extension hence will be part of default extensions
         */
        const failedLookupDefaultExtensions = [Extension.Ts, Extension.Tsx, Extension.Js, Extension.Jsx, Extension.Json];
        const customFailedLookupPaths = createMap<number>();

        const directoryWatchesOfFailedLookups = createMap<DirectoryWatchesOfFailedLookup>();
        const rootDir = rootDirForResolution && removeTrailingDirectorySeparator(getNormalizedAbsolutePath(rootDirForResolution, getCurrentDirectory()));
        const rootPath = (rootDir && resolutionHost.toPath(rootDir)) as Path; // TODO: GH#18217
        const rootSplitLength = rootPath !== undefined ? rootPath.split(directorySeparator).length : 0;

        // TypeRoot watches for the types that get added as part of getAutomaticTypeDirectiveNames
        const typeRootsWatches = createMap<FileWatcher>();

        return {
            startRecordingFilesWithChangedResolutions,
            finishRecordingFilesWithChangedResolutions,
            // perDirectoryResolvedModuleNames and perDirectoryResolvedTypeReferenceDirectives could be non empty if there was exception during program update
            // (between startCachingPerDirectoryResolution and finishCachingPerDirectoryResolution)
            startCachingPerDirectoryResolution: clearPerDirectoryResolutions,
            finishCachingPerDirectoryResolution,
            resolveModuleNames,
            getResolvedModuleWithFailedLookupLocationsFromCache,
            resolveTypeReferenceDirectives,
            removeResolutionsFromProjectReferenceRedirects,
            removeResolutionsOfFile,
            hasChangedAutomaticTypeDirectiveNames: () => hasChangedAutomaticTypeDirectiveNames,
            invalidateResolutionOfFile,
            invalidateResolutionsOfFailedLookupLocations,
            setFilesWithInvalidatedNonRelativeUnresolvedImports,
            createHasInvalidatedResolution,
            updateTypeRootsWatch,
            closeTypeRootsWatch,
            clear
        };

        function getResolvedModule(resolution: CachedResolvedModuleWithFailedLookupLocations) {
            return resolution.resolvedModule;
        }

        function getResolvedTypeReferenceDirective(resolution: CachedResolvedTypeReferenceDirectiveWithFailedLookupLocations) {
            return resolution.resolvedTypeReferenceDirective;
        }

        function isInDirectoryPath(dir: Path | undefined, file: Path) {
            if (dir === undefined || file.length <= dir.length) {
                return false;
            }
            return startsWith(file, dir) && file[dir.length] === directorySeparator;
        }

        function clear() {
            clearMap(directoryWatchesOfFailedLookups, closeFileWatcherOf);
            customFailedLookupPaths.clear();
            nonRelativeExternalModuleResolutions.clear();
            closeTypeRootsWatch();
            resolvedModuleNames.clear();
            resolvedTypeReferenceDirectives.clear();
            resolvedFileToResolution.clear();
            resolutionsWithFailedLookups.length = 0;
            failedLookupChecks.length = 0;
            startsWithPathChecks.length = 0;
            isInDirectoryChecks.length = 0;
            // perDirectoryResolvedModuleNames and perDirectoryResolvedTypeReferenceDirectives could be non empty if there was exception during program update
            // (between startCachingPerDirectoryResolution and finishCachingPerDirectoryResolution)
            clearPerDirectoryResolutions();
            hasChangedAutomaticTypeDirectiveNames = false;
        }

        function startRecordingFilesWithChangedResolutions() {
            filesWithChangedSetOfUnresolvedImports = [];
        }

        function finishRecordingFilesWithChangedResolutions() {
            const collected = filesWithChangedSetOfUnresolvedImports;
            filesWithChangedSetOfUnresolvedImports = undefined;
            return collected;
        }

        function isFileWithInvalidatedNonRelativeUnresolvedImports(path: Path): boolean {
            if (!filesWithInvalidatedNonRelativeUnresolvedImports) {
                return false;
            }

            // Invalidated if file has unresolved imports
            const value = filesWithInvalidatedNonRelativeUnresolvedImports.get(path);
            return !!value && !!value.length;
        }

        function createHasInvalidatedResolution(forceAllFilesAsInvalidated?: boolean): HasInvalidatedResolution {
            // Ensure pending resolutions are applied
            invalidateResolutionsOfFailedLookupLocations();
            if (forceAllFilesAsInvalidated) {
                // Any file asked would have invalidated resolution
                filesWithInvalidatedResolutions = undefined;
                return returnTrue;
            }
            const collected = filesWithInvalidatedResolutions;
            filesWithInvalidatedResolutions = undefined;
            return path => (!!collected && collected.has(path)) ||
                isFileWithInvalidatedNonRelativeUnresolvedImports(path);
        }

        function clearPerDirectoryResolutions() {
            perDirectoryResolvedModuleNames.clear();
            nonRelativeModuleNameCache.clear();
            perDirectoryResolvedTypeReferenceDirectives.clear();
            nonRelativeExternalModuleResolutions.forEach(watchFailedLookupLocationOfNonRelativeModuleResolutions);
            nonRelativeExternalModuleResolutions.clear();
        }

        function finishCachingPerDirectoryResolution() {
            filesWithInvalidatedNonRelativeUnresolvedImports = undefined;
            clearPerDirectoryResolutions();
            directoryWatchesOfFailedLookups.forEach((watcher, path) => {
                if (watcher.refCount === 0) {
                    directoryWatchesOfFailedLookups.delete(path);
                    watcher.watcher.close();
                }
            });
            hasChangedAutomaticTypeDirectiveNames = false;
        }

        function resolveModuleName(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, redirectedReference?: ResolvedProjectReference): CachedResolvedModuleWithFailedLookupLocations {
            const primaryResult = ts.resolveModuleName(moduleName, containingFile, compilerOptions, host, moduleResolutionCache, redirectedReference);
            // return result immediately only if global cache support is not enabled or if it is .ts, .tsx or .d.ts
            if (!resolutionHost.getGlobalCache) {
                return primaryResult;
            }

            // otherwise try to load typings from @types
            const globalCache = resolutionHost.getGlobalCache();
            if (globalCache !== undefined && !isExternalModuleNameRelative(moduleName) && !(primaryResult.resolvedModule && extensionIsTS(primaryResult.resolvedModule.extension))) {
                // create different collection of failed lookup locations for second pass
                // if it will fail and we've already found something during the first pass - we don't want to pollute its results
                const { resolvedModule, failedLookupLocations } = loadModuleFromGlobalCache(
                    Debug.checkDefined(resolutionHost.globalCacheResolutionModuleName)(moduleName),
                    resolutionHost.projectName,
                    compilerOptions,
                    host,
                    globalCache);
                if (resolvedModule) {
                    // Modify existing resolution so its saved in the directory cache as well
                    (primaryResult.resolvedModule as any) = resolvedModule;
                    primaryResult.failedLookupLocations.push(...failedLookupLocations);
                    return primaryResult;
                }
            }

            // Default return the result from the first pass
            return primaryResult;
        }

        interface ResolveNamesWithLocalCacheInput<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName> {
            names: readonly string[];
            containingFile: string;
            redirectedReference: ResolvedProjectReference | undefined;
            cache: Map<Map<T>>;
            perDirectoryCacheWithRedirects: CacheWithRedirects<Map<T>>;
            loader: (name: string, containingFile: string, options: CompilerOptions, host: ModuleResolutionHost, redirectedReference?: ResolvedProjectReference) => T;
            getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>;
            shouldRetryResolution: (t: T) => boolean;
            reusedNames?: readonly string[];
            logChanges?: boolean;
        }
        function resolveNamesWithLocalCache<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>({
            names, containingFile, redirectedReference,
            cache, perDirectoryCacheWithRedirects,
            loader, getResolutionWithResolvedFileName,
            shouldRetryResolution, reusedNames, logChanges
        }: ResolveNamesWithLocalCacheInput<T, R>): (R | undefined)[] {
            const path = resolutionHost.toPath(containingFile);
            const resolutionsInFile = cache.get(path) || cache.set(path, createMap()).get(path)!;
            const dirPath = getDirectoryPath(path);
            const perDirectoryCache = perDirectoryCacheWithRedirects.getOrCreateMapOfCacheRedirects(redirectedReference);
            let perDirectoryResolution = perDirectoryCache.get(dirPath);
            if (!perDirectoryResolution) {
                perDirectoryResolution = createMap();
                perDirectoryCache.set(dirPath, perDirectoryResolution);
            }
            const resolvedModules: (R | undefined)[] = [];
            const compilerOptions = resolutionHost.getCompilationSettings();
            const hasInvalidatedNonRelativeUnresolvedImport = logChanges && isFileWithInvalidatedNonRelativeUnresolvedImports(path);

            // All the resolutions in this file are invalidated if this file wasnt resolved using same redirect
            const program = resolutionHost.getCurrentProgram();
            const oldRedirect = program && program.getResolvedProjectReferenceToRedirect(containingFile);
            const unmatchedRedirects = oldRedirect ?
                !redirectedReference || redirectedReference.sourceFile.path !== oldRedirect.sourceFile.path :
                !!redirectedReference;

            const seenNamesInFile = createMap<true>();
            for (const name of names) {
                let resolution = resolutionsInFile.get(name);
                // Resolution is valid if it is present and not invalidated
                if (!seenNamesInFile.has(name) &&
                    unmatchedRedirects || !resolution || resolution.isInvalidated ||
                    // If the name is unresolved import that was invalidated, recalculate
                    (hasInvalidatedNonRelativeUnresolvedImport && !isExternalModuleNameRelative(name) && shouldRetryResolution(resolution))) {
                    const existingResolution = resolution;
                    const resolutionInDirectory = perDirectoryResolution.get(name);
                    if (resolutionInDirectory) {
                        resolution = resolutionInDirectory;
                    }
                    else {
                        resolution = loader(name, containingFile, compilerOptions, resolutionHost.getCompilerHost?.() || resolutionHost, redirectedReference);
                        perDirectoryResolution.set(name, resolution);
                    }
                    resolutionsInFile.set(name, resolution);
                    watchFailedLookupLocationsOfExternalModuleResolutions(name, resolution, path, getResolutionWithResolvedFileName);
                    if (existingResolution) {
                        stopWatchFailedLookupLocationOfResolution(existingResolution, path, getResolutionWithResolvedFileName);
                    }

                    if (logChanges && filesWithChangedSetOfUnresolvedImports && !resolutionIsEqualTo(existingResolution, resolution)) {
                        filesWithChangedSetOfUnresolvedImports.push(path);
                        // reset log changes to avoid recording the same file multiple times
                        logChanges = false;
                    }
                }
                Debug.assert(resolution !== undefined && !resolution.isInvalidated);
                seenNamesInFile.set(name, true);
                resolvedModules.push(getResolutionWithResolvedFileName(resolution));
            }

            // Stop watching and remove the unused name
            resolutionsInFile.forEach((resolution, name) => {
                if (!seenNamesInFile.has(name) && !contains(reusedNames, name)) {
                    stopWatchFailedLookupLocationOfResolution(resolution, path, getResolutionWithResolvedFileName);
                    resolutionsInFile.delete(name);
                }
            });

            return resolvedModules;

            function resolutionIsEqualTo(oldResolution: T | undefined, newResolution: T | undefined): boolean {
                if (oldResolution === newResolution) {
                    return true;
                }
                if (!oldResolution || !newResolution) {
                    return false;
                }
                const oldResult = getResolutionWithResolvedFileName(oldResolution);
                const newResult = getResolutionWithResolvedFileName(newResolution);
                if (oldResult === newResult) {
                    return true;
                }
                if (!oldResult || !newResult) {
                    return false;
                }
                return oldResult.resolvedFileName === newResult.resolvedFileName;
            }
        }

        function resolveTypeReferenceDirectives(typeDirectiveNames: string[], containingFile: string, redirectedReference?: ResolvedProjectReference): (ResolvedTypeReferenceDirective | undefined)[] {
            return resolveNamesWithLocalCache<CachedResolvedTypeReferenceDirectiveWithFailedLookupLocations, ResolvedTypeReferenceDirective>({
                names: typeDirectiveNames,
                containingFile,
                redirectedReference,
                cache: resolvedTypeReferenceDirectives,
                perDirectoryCacheWithRedirects: perDirectoryResolvedTypeReferenceDirectives,
                loader: resolveTypeReferenceDirective,
                getResolutionWithResolvedFileName: getResolvedTypeReferenceDirective,
                shouldRetryResolution: resolution => resolution.resolvedTypeReferenceDirective === undefined,
            });
        }

        function resolveModuleNames(moduleNames: string[], containingFile: string, reusedNames: string[] | undefined, redirectedReference?: ResolvedProjectReference): (ResolvedModuleFull | undefined)[] {
            return resolveNamesWithLocalCache<CachedResolvedModuleWithFailedLookupLocations, ResolvedModuleFull>({
                names: moduleNames,
                containingFile,
                redirectedReference,
                cache: resolvedModuleNames,
                perDirectoryCacheWithRedirects: perDirectoryResolvedModuleNames,
                loader: resolveModuleName,
                getResolutionWithResolvedFileName: getResolvedModule,
                shouldRetryResolution: resolution => !resolution.resolvedModule || !resolutionExtensionIsTSOrJson(resolution.resolvedModule.extension),
                reusedNames,
                logChanges: logChangesWhenResolvingModule
            });
        }

        function getResolvedModuleWithFailedLookupLocationsFromCache(moduleName: string, containingFile: string): CachedResolvedModuleWithFailedLookupLocations | undefined {
            const cache = resolvedModuleNames.get(resolutionHost.toPath(containingFile));
            return cache && cache.get(moduleName);
        }

        function isNodeModulesAtTypesDirectory(dirPath: Path) {
            return endsWith(dirPath, "/node_modules/@types");
        }

        function getDirectoryToWatchFailedLookupLocation(failedLookupLocation: string, failedLookupLocationPath: Path): DirectoryOfFailedLookupWatch | undefined {
            if (isInDirectoryPath(rootPath, failedLookupLocationPath)) {
                // Ensure failed look up is normalized path
                failedLookupLocation = isRootedDiskPath(failedLookupLocation) ? normalizePath(failedLookupLocation) : getNormalizedAbsolutePath(failedLookupLocation, getCurrentDirectory());
                const failedLookupPathSplit = failedLookupLocationPath.split(directorySeparator);
                const failedLookupSplit = failedLookupLocation.split(directorySeparator);
                Debug.assert(failedLookupSplit.length === failedLookupPathSplit.length, `FailedLookup: ${failedLookupLocation} failedLookupLocationPath: ${failedLookupLocationPath}`);
                if (failedLookupPathSplit.length > rootSplitLength + 1) {
                    // Instead of watching root, watch directory in root to avoid watching excluded directories not needed for module resolution
                    return {
                        dir: failedLookupSplit.slice(0, rootSplitLength + 1).join(directorySeparator),
                        dirPath: failedLookupPathSplit.slice(0, rootSplitLength + 1).join(directorySeparator) as Path
                    };
                }
                else {
                    // Always watch root directory non recursively
                    return {
                        dir: rootDir!,
                        dirPath: rootPath,
                        nonRecursive: false
                    };
                }
            }

            return getDirectoryToWatchFromFailedLookupLocationDirectory(
                getDirectoryPath(getNormalizedAbsolutePath(failedLookupLocation, getCurrentDirectory())),
                getDirectoryPath(failedLookupLocationPath)
            );
        }

        function getDirectoryToWatchFromFailedLookupLocationDirectory(dir: string, dirPath: Path): DirectoryOfFailedLookupWatch | undefined {
            // If directory path contains node module, get the most parent node_modules directory for watching
            while (pathContainsNodeModules(dirPath)) {
                dir = getDirectoryPath(dir);
                dirPath = getDirectoryPath(dirPath);
            }

            // If the directory is node_modules use it to watch, always watch it recursively
            if (isNodeModulesDirectory(dirPath)) {
                return canWatchDirectory(getDirectoryPath(dirPath)) ? { dir, dirPath } : undefined;
            }

            let nonRecursive = true;
            // Use some ancestor of the root directory
            let subDirectoryPath: Path | undefined, subDirectory: string | undefined;
            if (rootPath !== undefined) {
                while (!isInDirectoryPath(dirPath, rootPath)) {
                    const parentPath = getDirectoryPath(dirPath);
                    if (parentPath === dirPath) {
                        break;
                    }
                    nonRecursive = false;
                    subDirectoryPath = dirPath;
                    subDirectory = dir;
                    dirPath = parentPath;
                    dir = getDirectoryPath(dir);
                }
            }

            return canWatchDirectory(dirPath) ? { dir: subDirectory || dir, dirPath: subDirectoryPath || dirPath, nonRecursive } : undefined;
        }

        function isPathWithDefaultFailedLookupExtension(path: Path) {
            return fileExtensionIsOneOf(path, failedLookupDefaultExtensions);
        }

        function watchFailedLookupLocationsOfExternalModuleResolutions<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>(
            name: string,
            resolution: T,
            filePath: Path,
            getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>,
        ) {
            if (resolution.refCount) {
                resolution.refCount++;
                Debug.assertDefined(resolution.files);
            }
            else {
                resolution.refCount = 1;
                Debug.assert(resolution.files === undefined);
                if (isExternalModuleNameRelative(name)) {
                    watchFailedLookupLocationOfResolution(resolution);
                }
                else {
                    nonRelativeExternalModuleResolutions.add(name, resolution);
                }
                const resolved = getResolutionWithResolvedFileName(resolution);
                if (resolved && resolved.resolvedFileName) {
                    resolvedFileToResolution.add(resolutionHost.toPath(resolved.resolvedFileName), resolution);
                }
            }
            (resolution.files || (resolution.files = [])).push(filePath);
        }

        function watchFailedLookupLocationOfResolution(resolution: ResolutionWithFailedLookupLocations) {
            Debug.assert(!!resolution.refCount);

            const { failedLookupLocations } = resolution;
            if (!failedLookupLocations.length) return;
            resolutionsWithFailedLookups.push(resolution);

            let setAtRoot = false;
            for (const failedLookupLocation of failedLookupLocations) {
                const failedLookupLocationPath = resolutionHost.toPath(failedLookupLocation);
                const toWatch = getDirectoryToWatchFailedLookupLocation(failedLookupLocation, failedLookupLocationPath);
                if (toWatch) {
                    const { dir, dirPath, nonRecursive } = toWatch;
                    // If the failed lookup location path is not one of the supported extensions,
                    // store it in the custom path
                    if (!isPathWithDefaultFailedLookupExtension(failedLookupLocationPath)) {
                        const refCount = customFailedLookupPaths.get(failedLookupLocationPath) || 0;
                        customFailedLookupPaths.set(failedLookupLocationPath, refCount + 1);
                    }
                    if (dirPath === rootPath) {
                        Debug.assert(!nonRecursive);
                        setAtRoot = true;
                    }
                    else {
                        setDirectoryWatcher(dir, dirPath, nonRecursive);
                    }
                }
            }

            if (setAtRoot) {
                // This is always non recursive
                setDirectoryWatcher(rootDir!, rootPath, /*nonRecursive*/ true); // TODO: GH#18217
            }
        }

        function watchFailedLookupLocationOfNonRelativeModuleResolutions(resolutions: ResolutionWithFailedLookupLocations[], name: string) {
            const program = resolutionHost.getCurrentProgram();
            if (!program || !program.getTypeChecker().tryFindAmbientModuleWithoutAugmentations(name)) {
                resolutions.forEach(watchFailedLookupLocationOfResolution);
            }
        }

        function setDirectoryWatcher(dir: string, dirPath: Path, nonRecursive?: boolean) {
            const dirWatcher = directoryWatchesOfFailedLookups.get(dirPath);
            if (dirWatcher) {
                Debug.assert(!!nonRecursive === !!dirWatcher.nonRecursive);
                dirWatcher.refCount++;
            }
            else {
                directoryWatchesOfFailedLookups.set(dirPath, { watcher: createDirectoryWatcher(dir, dirPath, nonRecursive), refCount: 1, nonRecursive });
            }
        }

        function stopWatchFailedLookupLocationOfResolution<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>(
            resolution: T,
            filePath: Path,
            getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>,
        ) {
            unorderedRemoveItem(Debug.assertDefined(resolution.files), filePath);
            resolution.refCount!--;
            if (resolution.refCount) {
                return;
            }
            const resolved = getResolutionWithResolvedFileName(resolution);
            if (resolved && resolved.resolvedFileName) {
                resolvedFileToResolution.remove(resolutionHost.toPath(resolved.resolvedFileName), resolution);
            }

            if (!unorderedRemoveItem(resolutionsWithFailedLookups, resolution)) {
                // If not watching failed lookups, it wont be there in resolutionsWithFailedLookups
                return;
            }

            const { failedLookupLocations } = resolution;
            let removeAtRoot = false;
            for (const failedLookupLocation of failedLookupLocations) {
                const failedLookupLocationPath = resolutionHost.toPath(failedLookupLocation);
                const toWatch = getDirectoryToWatchFailedLookupLocation(failedLookupLocation, failedLookupLocationPath);
                if (toWatch) {
                    const { dirPath } = toWatch;
                    const refCount = customFailedLookupPaths.get(failedLookupLocationPath);
                    if (refCount) {
                        if (refCount === 1) {
                            customFailedLookupPaths.delete(failedLookupLocationPath);
                        }
                        else {
                            Debug.assert(refCount > 1);
                            customFailedLookupPaths.set(failedLookupLocationPath, refCount - 1);
                        }
                    }

                    if (dirPath === rootPath) {
                        removeAtRoot = true;
                    }
                    else {
                        removeDirectoryWatcher(dirPath);
                    }
                }
            }
            if (removeAtRoot) {
                removeDirectoryWatcher(rootPath);
            }
        }

        function removeDirectoryWatcher(dirPath: string) {
            const dirWatcher = directoryWatchesOfFailedLookups.get(dirPath)!;
            // Do not close the watcher yet since it might be needed by other failed lookup locations.
            dirWatcher.refCount--;
        }

        function createDirectoryWatcher(directory: string, dirPath: Path, nonRecursive: boolean | undefined) {
            return resolutionHost.watchDirectoryOfFailedLookupLocation(directory, fileOrDirectory => {
                const fileOrDirectoryPath = resolutionHost.toPath(fileOrDirectory);
                if (cachedDirectoryStructureHost) {
                    // Since the file existence changed, update the sourceFiles cache
                    cachedDirectoryStructureHost.addOrDeleteFileOrDirectory(fileOrDirectory, fileOrDirectoryPath);
                }

                scheduleInvalidateResolutionOfFailedLookupLocation(fileOrDirectoryPath, dirPath === fileOrDirectoryPath);
            }, nonRecursive ? WatchDirectoryFlags.None : WatchDirectoryFlags.Recursive);
        }

        function removeResolutionsOfFileFromCache<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>(
            cache: Map<Map<T>>,
            filePath: Path,
            getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>,
        ) {
            // Deleted file, stop watching failed lookups for all the resolutions in the file
            const resolutions = cache.get(filePath);
            if (resolutions) {
                resolutions.forEach(resolution => stopWatchFailedLookupLocationOfResolution(resolution, filePath, getResolutionWithResolvedFileName));
                cache.delete(filePath);
            }
        }

        function removeResolutionsFromProjectReferenceRedirects(filePath: Path) {
            if (!fileExtensionIs(filePath, Extension.Json)) { return; }

            const program = resolutionHost.getCurrentProgram();
            if (!program) { return; }

            // If this file is input file for the referenced project, get it
            const resolvedProjectReference = program.getResolvedProjectReferenceByPath(filePath);
            if (!resolvedProjectReference) { return; }

            // filePath is for the projectReference and the containing file is from this project reference, invalidate the resolution
            resolvedProjectReference.commandLine.fileNames.forEach(f => removeResolutionsOfFile(resolutionHost.toPath(f)));
        }

        function removeResolutionsOfFile(filePath: Path) {
            removeResolutionsOfFileFromCache(resolvedModuleNames, filePath, getResolvedModule);
            removeResolutionsOfFileFromCache(resolvedTypeReferenceDirectives, filePath, getResolvedTypeReferenceDirective);
        }

        function invalidateResolutions(resolutions: ResolutionWithFailedLookupLocations[] | undefined, canInvalidate: (resolution: ResolutionWithFailedLookupLocations) => boolean) {
            if (!resolutions) return false;
            let invalidated = false;
            for (const resolution of resolutions) {
                if (resolution.isInvalidated || !canInvalidate(resolution)) continue;
                resolution.isInvalidated = invalidated = true;
                for (const containingFilePath of Debug.assertDefined(resolution.files)) {
                    (filesWithInvalidatedResolutions || (filesWithInvalidatedResolutions = createMap<true>())).set(containingFilePath, true);
                    // When its a file with inferred types resolution, invalidate type reference directive resolution
                    hasChangedAutomaticTypeDirectiveNames = hasChangedAutomaticTypeDirectiveNames || containingFilePath.endsWith(inferredTypesContainingFile);
                }
            }
            return invalidated;
        }

        function invalidateResolutionOfFile(filePath: Path) {
            removeResolutionsOfFile(filePath);
            // Resolution is invalidated if the resulting file name is same as the deleted file path
            const prevHasChangedAutomaticTypeDirectiveNames = hasChangedAutomaticTypeDirectiveNames;
            if (invalidateResolutions(resolvedFileToResolution.get(filePath), returnTrue) &&
                hasChangedAutomaticTypeDirectiveNames &&
                !prevHasChangedAutomaticTypeDirectiveNames) {
                resolutionHost.onChangedAutomaticTypeDirectiveNames();
            }
        }

        function setFilesWithInvalidatedNonRelativeUnresolvedImports(filesMap: ReadonlyMap<readonly string[]>) {
            Debug.assert(filesWithInvalidatedNonRelativeUnresolvedImports === filesMap || filesWithInvalidatedNonRelativeUnresolvedImports === undefined);
            filesWithInvalidatedNonRelativeUnresolvedImports = filesMap;
        }

        function scheduleInvalidateResolutionOfFailedLookupLocation(fileOrDirectoryPath: Path, isCreatingWatchedDirectory: boolean) {
            if (isCreatingWatchedDirectory) {
                // Watching directory is created
                // Invalidate any resolution has failed lookup in this directory
                isInDirectoryChecks.push(fileOrDirectoryPath);
            }
            else {
                // If something to do with folder/file starting with "." in node_modules folder, skip it
                const updatedPath = removeIgnoredPath(fileOrDirectoryPath);
                if (!updatedPath) return false;
                fileOrDirectoryPath = updatedPath;

                // prevent saving an open file from over-eagerly triggering invalidation
                if (resolutionHost.fileIsOpen(fileOrDirectoryPath)) {
                    return false;
                }

                // Some file or directory in the watching directory is created
                // Return early if it does not have any of the watching extension or not the custom failed lookup path
                const dirOfFileOrDirectory = getDirectoryPath(fileOrDirectoryPath);
                if (isNodeModulesAtTypesDirectory(fileOrDirectoryPath) || isNodeModulesDirectory(fileOrDirectoryPath) ||
                    isNodeModulesAtTypesDirectory(dirOfFileOrDirectory) || isNodeModulesDirectory(dirOfFileOrDirectory)) {
                    // Invalidate any resolution from this directory
                    failedLookupChecks.push(fileOrDirectoryPath);
                    startsWithPathChecks.push(fileOrDirectoryPath);
                }
                else {
                    if (!isPathWithDefaultFailedLookupExtension(fileOrDirectoryPath) && !customFailedLookupPaths.has(fileOrDirectoryPath)) {
                        return false;
                    }
                    // Ignore emits from the program
                    if (isEmittedFileOfProgram(resolutionHost.getCurrentProgram(), fileOrDirectoryPath)) {
                        return false;
                    }
                    // Resolution need to be invalidated if failed lookup location is same as the file or directory getting created
                    failedLookupChecks.push(fileOrDirectoryPath);
                }
            }
            resolutionHost.scheduleInvalidateResolutionsOfFailedLookupLocations();
        }

        function invalidateResolutionsOfFailedLookupLocations() {
            if (!failedLookupChecks.length && !startsWithPathChecks.length && !isInDirectoryChecks.length) {
                return false;
            }

            const invalidated = invalidateResolutions(resolutionsWithFailedLookups, canInvalidateFailedLookupResolution);
            failedLookupChecks.length = 0;
            startsWithPathChecks.length = 0;
            isInDirectoryChecks.length = 0;
            return invalidated;
        }

        function canInvalidateFailedLookupResolution(resolution: ResolutionWithFailedLookupLocations) {
            return resolution.failedLookupLocations.some(location => {
                const locationPath = resolutionHost.toPath(location);
                return contains(failedLookupChecks, locationPath) ||
                    startsWithPathChecks.some(fileOrDirectoryPath => startsWith(locationPath, fileOrDirectoryPath)) ||
                    isInDirectoryChecks.some(fileOrDirectoryPath => isInDirectoryPath(fileOrDirectoryPath, locationPath));
            });
        }

        function closeTypeRootsWatch() {
            clearMap(typeRootsWatches, closeFileWatcher);
        }

        function getDirectoryToWatchFailedLookupLocationFromTypeRoot(typeRoot: string, typeRootPath: Path): Path | undefined {
            if (isInDirectoryPath(rootPath, typeRootPath)) {
                return rootPath;
            }
            const toWatch = getDirectoryToWatchFromFailedLookupLocationDirectory(typeRoot, typeRootPath);
            return toWatch && directoryWatchesOfFailedLookups.has(toWatch.dirPath) ? toWatch.dirPath : undefined;
        }

        function createTypeRootsWatch(typeRootPath: Path, typeRoot: string): FileWatcher {
            // Create new watch and recursive info
            return resolutionHost.watchTypeRootsDirectory(typeRoot, fileOrDirectory => {
                const fileOrDirectoryPath = resolutionHost.toPath(fileOrDirectory);
                if (cachedDirectoryStructureHost) {
                    // Since the file existence changed, update the sourceFiles cache
                    cachedDirectoryStructureHost.addOrDeleteFileOrDirectory(fileOrDirectory, fileOrDirectoryPath);
                }

                // For now just recompile
                // We could potentially store more data here about whether it was/would be really be used or not
                // and with that determine to trigger compilation but for now this is enough
                hasChangedAutomaticTypeDirectiveNames = true;
                resolutionHost.onChangedAutomaticTypeDirectiveNames();

                // Since directory watchers invoked are flaky, the failed lookup location events might not be triggered
                // So handle to failed lookup locations here as well to ensure we are invalidating resolutions
                const dirPath = getDirectoryToWatchFailedLookupLocationFromTypeRoot(typeRoot, typeRootPath);
                if (dirPath) {
                    scheduleInvalidateResolutionOfFailedLookupLocation(fileOrDirectoryPath, dirPath === fileOrDirectoryPath);
                }
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
            // But filter directories that are at root level to say directory doesnt exist, so that we arent watching them
            const typeRoots = getEffectiveTypeRoots(options, { directoryExists: directoryExistsForTypeRootWatch, getCurrentDirectory });
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

        /**
         * Use this function to return if directory exists to get type roots to watch
         * If we return directory exists then only the paths will be added to type roots
         * Hence return true for all directories except root directories which are filtered from watching
         */
        function directoryExistsForTypeRootWatch(nodeTypesDirectory: string) {
            const dir = getDirectoryPath(getDirectoryPath(nodeTypesDirectory));
            const dirPath = resolutionHost.toPath(dir);
            return dirPath === rootPath || canWatchDirectory(dirPath);
        }
    }
}
