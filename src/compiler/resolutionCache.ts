/*@internal*/
namespace ts {
    /*@internal*/
    export interface UnresolvedImports {
        packages: readonly string[];
        imports: readonly { name: string; mode: ResolutionMode; }[];
    }
    /** This is the cache of module/typedirectives resolution that can be retained across program */
    export interface ResolutionCache {
        startRecordingFilesWithChangedResolutions(): void;
        finishRecordingFilesWithChangedResolutions(): Path[] | undefined;

        resolveModuleNames(
            moduleNames: string[],
            containingFile: string,
            redirectedReference: ResolvedProjectReference | undefined,
            containingSourceFile: SourceFile | undefined,
            partialResolutionInfo: PartialResolutionInfo | undefined
        ): ResolvedModuleWithFailedLookupLocations[];
        resolveTypeReferenceDirectives(
            typeDirectiveNames: string[] | readonly FileReference[],
            containingFile: string,
            redirectedReference: ResolvedProjectReference | undefined,
            containingFileMode: ResolutionMode,
            partialResolutionInfo: PartialResolutionInfo | undefined
        ): ResolvedTypeReferenceDirectiveWithFailedLookupLocations[];

        invalidateResolutionsOfFailedLookupLocations(): boolean;
        invalidateResolutionOfFile(filePath: Path): void;
        setFilesWithInvalidatedNonRelativeUnresolvedImports(filesWithUnresolvedImports: ESMap<Path, UnresolvedImports>): void;
        createHasInvalidatedResolution(forceAllFilesAsInvalidated?: boolean): HasInvalidatedResolution;
        hasChangedAutomaticTypeDirectiveNames(): boolean;
        resolvedModuleNames: PerFileCache<ResolvedModuleWithFailedLookupLocations>;
        resolvedTypeReferenceDirectives: PerFileCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>;

        startCachingPerDirectoryResolution(): void;
        finishCachingPerDirectoryResolution(newProgram: Program | undefined, oldProgram: Program | undefined): void;

        getModuleResolutionCache(): ModuleResolutionCache;
        getTypeReferenceDirectiveResolutionCache(): TypeReferenceDirectiveResolutionCache;

        clear(): void;
    }

    export interface PackageJsonScope {
        isInvalidated?: boolean;
        files?: Set<Path>;
        watchedFailed?: number;
        watchedAffected?: number;
    }

    export interface ResolutionWithFailedLookupLocations {
        readonly failedLookupLocations: string[];
        affectingLocations?: string[];
        isInvalidated?: boolean;
        // Files that have this resolution using
        files?: Set<Path>;
        watchedFailed?: number | false;
        watchedAffected?: number;
        setAtRoot?: boolean;
    }

    export interface ResolutionWithResolvedFileName {
        resolvedFileName: string | undefined;
        packageId?: PackageId;
    }

    export interface ResolvedModuleWithFailedLookupLocations extends ResolutionWithFailedLookupLocations {
    }

    export interface ResolvedTypeReferenceDirectiveWithFailedLookupLocations extends ResolutionWithFailedLookupLocations {
    }

    export interface ResolutionCacheHost extends MinimalResolutionCacheHost {
        toPath(fileName: string): Path;
        getCanonicalFileName: GetCanonicalFileName;
        getCompilationSettings(): CompilerOptions;
        watchDirectoryOfFailedLookupLocation(directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags): FileWatcher;
        watchAffectingFileLocation(file: string, cb: FileWatcherCallback): FileWatcher;
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
        onDiscoveredSymlink?(): void;
    }

    interface FileWatcherOfAffectingLocation {
        /** watcher for the lookup */
        watcher: FileWatcher;
        resolutions: number;
        files: number;
        paths: Set<string>;
    }

    interface DirectoryWatchesOfFailedLookup {
        /** watcher for the lookup */
        watcher: FileWatcher;
        /** ref count keeping this watch alive */
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
    export function canWatchDirectoryOrFile(dirPath: Path) {
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

    export type GetResolutionWithResolvedFileName<T extends ResolutionWithFailedLookupLocations = ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName = ResolutionWithResolvedFileName> =
        (resolution: T) => R | undefined;

    export function getResolvedModuleOfResolution(resolution: ResolvedModuleWithFailedLookupLocations) {
        return resolution.resolvedModule;
    }

    export function getResolvedTypeReferenceDirectiveOfResolution(resolution: ResolvedTypeReferenceDirectiveWithFailedLookupLocations) {
        return resolution.resolvedTypeReferenceDirective;
    }

    export function toPerDirectoryResolution<T extends ResolutionWithFailedLookupLocations, U>(
        newProgram: Program,
        fileCacheFromProgram: ModeAwareCache<T> | undefined,
        sourceFileOrPath: SourceFile | Path,
        perDirCache: CacheWithRedirects<Path, ModeAwareCache<T>> | undefined,
        moduleNameToDirectoryMap: CacheWithRedirects<ModeAwareCacheKey, ESMap<Path, ResolvedModuleWithFailedLookupLocations>> | undefined,
        onRedirectedReferenceKey: (key: RedirectsCacheKey) => void,
        forEachResolution: (r: T, name: string, mode: ResolutionMode, key: RedirectsCacheKey, redirectedReference: ResolvedProjectReference | undefined, dirPath: Path) => U | undefined,
        toPath: (dir: string) => Path,
        ancestoryWorker: (ancestorPath: Path, name: string, mode: ResolutionMode, perDirResolutionCache: ESMap<Path, ModeAwareCache<T>> | undefined) => void,
    ): CacheWithRedirects<Path, ModeAwareCache<T>> | undefined {
        if (!fileCacheFromProgram?.size()) return perDirCache;
        const path = !isString(sourceFileOrPath) ? sourceFileOrPath.path : sourceFileOrPath;
        const redirectedReference = !isString(sourceFileOrPath) ? newProgram.getRedirectReferenceForResolution(sourceFileOrPath) : undefined;
        const options = redirectedReference?.commandLine.options || newProgram.getCompilerOptions();
        const key = getRedirectsCacheKey(options);
        onRedirectedReferenceKey(key);
        const dirPath = getDirectoryPath(path);
        let perDirResolutionCache = perDirCache?.getMapOfCacheRedirects(redirectedReference);
        let cacheForDir = perDirResolutionCache?.get(dirPath);
        fileCacheFromProgram.forEach((r, name, mode) => {
            if (forEachResolution(r, name, mode, key, redirectedReference, dirPath)) return;
            if (cacheForDir?.has(name, mode)) return;
            if (!cacheForDir) {
                perDirResolutionCache ??= (perDirCache ??= createCacheWithRedirects(newProgram.getCompilerOptions())).createMapForCompilerOptions(options, key);
                perDirResolutionCache.set(dirPath, cacheForDir = createModeAwareCache());
            }
            cacheForDir.set(name, mode, r);
            if (!moduleNameToDirectoryMap || isExternalModuleNameRelative(name)) return;

            const actualModuleNameToDirectoryMap = moduleNameToDirectoryMap.createMapForCompilerOptions(options, key);
            const modeAwareCacheKey = getModeAwareCacheKey(name, mode);
            let directoryPathMap = actualModuleNameToDirectoryMap.get(modeAwareCacheKey);
            if (!directoryPathMap) actualModuleNameToDirectoryMap.set(modeAwareCacheKey, directoryPathMap = new Map());
            moduleNameToDirectorySet(
                directoryPathMap,
                dirPath,
                r as unknown as ResolvedModuleWithFailedLookupLocations,
                getResolvedFileNameForModuleNameToDirectorySet,
                toPath,
                ancestorPath => ancestoryWorker(ancestorPath, name, mode, perDirResolutionCache),
            );
        });
        return perDirCache;
    }

    export type PerFileCache<T> = ESMap<Path, { key: RedirectsCacheKey; cache: ModeAwareCache<T>; }>;

    interface OldModuleAndTypeRefCache {
        modules: OldResolutionCache<ResolvedModuleWithFailedLookupLocations> | undefined;
        typeRefs: OldResolutionCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations> | undefined;
        clearRedirectsMap(): void;
    }

    export function createResolutionCache(resolutionHost: ResolutionCacheHost, rootDirForResolution: string | undefined, logChangesWhenResolvingModule: boolean): ResolutionCache {
        let filesWithChangedSetOfUnresolvedImports: Path[] | undefined;
        let filesWithInvalidatedResolutions: Set<Path> | undefined;

        const resolutionsWithFailedLookups: ResolutionWithFailedLookupLocations[] = [];
        const resolutionsWithOnlyAffectingLocations: ResolutionWithFailedLookupLocations[] = [];
        const resolvedFileToResolution = createMultiMap<ResolutionWithFailedLookupLocations>();
        const perFilePackageJsonScope = new Map<Path, PackageJsonScope>();
        const watchedPackageJsonScopes: PackageJsonScope[] = [];
        let packageJsonsToCloseWatcherOn: PackageJsonScope[] | undefined;
        let resolutionsToCloseWatcherOn: { resolution: ResolutionWithFailedLookupLocations; getResolved: GetResolutionWithResolvedFileName; }[] | undefined;

        let hasChangedAutomaticTypeDirectiveNames = false;
        let affectingPathChecksForFile: Set<string> | undefined;
        let affectingPathChecks: Set<string> | undefined;
        let failedLookupChecks: Set<Path> | undefined;
        let startsWithPathChecks: Set<Path> | undefined;
        let isInDirectoryChecks: Set<Path> | undefined;

        const getCurrentDirectory = memoize(() => resolutionHost.getCurrentDirectory!()); // TODO: GH#18217
        const cachedDirectoryStructureHost = resolutionHost.getCachedDirectoryStructureHost();

        let oldModuleAndTypeRefCache: OldModuleAndTypeRefCache | undefined;
        let oldPackageJsonInfoCache: OldPackageJsonInfoCache | undefined;

        // The resolvedModuleNames and resolvedTypeReferenceDirectives are the cache of resolutions per file.
        // The key in the map is source file's path.
        // The values are Map of resolutions with key being name lookedup.
        const resolvedModuleNames: PerFileCache<ResolvedModuleWithFailedLookupLocations> = new Map();
        const moduleResolutionCache = createModuleResolutionCache(
            getCurrentDirectory(),
            resolutionHost.getCanonicalFileName,
        );

        const resolvedTypeReferenceDirectives: PerFileCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations> = new Map();
        const typeReferenceDirectiveResolutionCache = createTypeReferenceDirectiveResolutionCache(
            getCurrentDirectory(),
            resolutionHost.getCanonicalFileName,
            /*options*/ undefined,
            moduleResolutionCache.getPackageJsonInfoCache(),
        );

        /**
         * These are the extensions that failed lookup files will have by default,
         * any other extension of failed lookup will be store that path in custom failed lookup path
         * This helps in not having to comb through all resolutions when files are added/removed
         * Note that .d.ts file also has .d.ts extension hence will be part of default extensions
         */
        const failedLookupDefaultExtensions = [Extension.Ts, Extension.Tsx, Extension.Js, Extension.Jsx, Extension.Json];
        const customFailedLookupPaths = new Map<string, number>();

        const directoryWatchesOfFailedLookups = new Map<string, DirectoryWatchesOfFailedLookup>();
        const fileWatchesOfAffectingLocations = new Map<string, FileWatcherOfAffectingLocation>();
        const rootDir = rootDirForResolution && removeTrailingDirectorySeparator(getNormalizedAbsolutePath(rootDirForResolution, getCurrentDirectory()));
        const rootPath = (rootDir && resolutionHost.toPath(rootDir)) as Path; // TODO: GH#18217
        const rootSplitLength = rootPath !== undefined ? rootPath.split(directorySeparator).length : 0;

        // TypeRoot watches for the types that get added as part of getAutomaticTypeDirectiveNames
        const typeRootsWatches = new Map<string, FileWatcher>();

        return {
            resolvedModuleNames,
            resolvedTypeReferenceDirectives,
            getModuleResolutionCache: () => moduleResolutionCache,
            getTypeReferenceDirectiveResolutionCache: () => typeReferenceDirectiveResolutionCache,
            startRecordingFilesWithChangedResolutions,
            finishRecordingFilesWithChangedResolutions,
            startCachingPerDirectoryResolution,
            finishCachingPerDirectoryResolution,
            resolveModuleNames,
            resolveTypeReferenceDirectives,
            hasChangedAutomaticTypeDirectiveNames: () => hasChangedAutomaticTypeDirectiveNames,
            invalidateResolutionOfFile,
            invalidateResolutionsOfFailedLookupLocations,
            setFilesWithInvalidatedNonRelativeUnresolvedImports,
            createHasInvalidatedResolution,
            clear
        };

        function isInDirectoryPath(dir: Path | undefined, file: Path) {
            if (dir === undefined || file.length <= dir.length) {
                return false;
            }
            return startsWith(file, dir) && file[dir.length] === directorySeparator;
        }

        function clear() {
            clearMap(directoryWatchesOfFailedLookups, closeFileWatcherOf);
            clearMap(fileWatchesOfAffectingLocations, closeFileWatcherOf);
            customFailedLookupPaths.clear();
            closeTypeRootsWatch();
            resolvedModuleNames.clear();
            resolvedTypeReferenceDirectives.clear();
            resolvedFileToResolution.clear();
            resolutionsWithFailedLookups.length = 0;
            resolutionsWithOnlyAffectingLocations.length = 0;
            watchedPackageJsonScopes.length = 0;
            failedLookupChecks = undefined;
            startsWithPathChecks = undefined;
            isInDirectoryChecks = undefined;
            affectingPathChecks = undefined;
            affectingPathChecksForFile = undefined;
            resolutionsToCloseWatcherOn = undefined;
            packageJsonsToCloseWatcherOn = undefined;
            oldModuleAndTypeRefCache = undefined;
            oldPackageJsonInfoCache = undefined;
            moduleResolutionCache.clear();
            typeReferenceDirectiveResolutionCache.clear();
            perFilePackageJsonScope.clear();
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
            return path => !!collected?.has(path);
        }

        function startCachingPerDirectoryResolution() {
            const packageJsonInfoCache = moduleResolutionCache.getPackageJsonInfoCache();
            const internalCache = packageJsonInfoCache.getInternalMap();
            moduleResolutionCache.clear();
            typeReferenceDirectiveResolutionCache.clear();
            moduleResolutionCache.update(resolutionHost.getCompilationSettings());
            typeReferenceDirectiveResolutionCache.update(resolutionHost.getCompilationSettings());
            if (oldModuleAndTypeRefCache) {
                oldModuleAndTypeRefCache.clearRedirectsMap();
                moduleResolutionCache.setOldResolutionCache(oldModuleAndTypeRefCache.modules);
                typeReferenceDirectiveResolutionCache.setOldResolutionCache(oldModuleAndTypeRefCache.typeRefs);
            }
            packageJsonInfoCache.setInternalMap(internalCache);
            packageJsonInfoCache.setOldPackageJsonScopeCache(oldPackageJsonInfoCache);
        }

        function finishCachingPerDirectoryResolution(newProgram: Program | undefined, oldProgram: Program | undefined) {
            hasChangedAutomaticTypeDirectiveNames = false;
            if (!newProgram) {
                clear();
                return;
            }
            if (newProgram === oldProgram) return;
            const needsResolutionUpdate = newProgram.structureIsReused !== StructureIsReused.Completely;
            let modules: CacheWithRedirects<Path, ModeAwareCache<ResolvedModuleWithFailedLookupLocations>> | undefined;
            let typeRefs: CacheWithRedirects<Path, ModeAwareCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>> | undefined;
            const moduleNameToDirectoryMap = createCacheWithRedirects<ModeAwareCacheKey, ESMap<Path, ResolvedModuleWithFailedLookupLocations>>(newProgram.getCompilerOptions());
            const dirToPackageJsonScope = new Map<Path, PackageJsonScope>();
            for (const newFile of newProgram.getSourceFiles()) {
                if (needsResolutionUpdate) {
                    modules = ensureResolutionsOfFile(
                        newProgram,
                        resolvedModuleNames,
                        newFile.resolvedModules,
                        newFile,
                        getResolvedModuleOfResolution,
                        modules,
                        moduleNameToDirectoryMap,
                    );
                    typeRefs = ensureResolutionsOfFile(
                        newProgram,
                        resolvedTypeReferenceDirectives,
                        newFile.resolvedTypeReferenceDirectiveNames,
                        newFile,
                        getResolvedTypeReferenceDirectiveOfResolution,
                        typeRefs,
                        /*moduleNameToDirectoryMap*/ undefined,
                    );
                }
                ensurePackageJsonWatchesForFile(newFile, dirToPackageJsonScope);
            }
            if (needsResolutionUpdate) {
                const newProgramAutoTypeRefContainingFile = resolutionHost.toPath(newProgram.getAutomaticTypeDirectiveContainingFile());
                typeRefs = ensureResolutionsOfFile(
                    newProgram,
                    resolvedTypeReferenceDirectives,
                    newProgram.getAutomaticTypeDirectiveResolutions(),
                    newProgramAutoTypeRefContainingFile,
                    getResolvedTypeReferenceDirectiveOfResolution,
                    typeRefs,
                    /*moduleNameToDirectoryMap*/ undefined,
                );
                if (!modules && !typeRefs) {
                    oldModuleAndTypeRefCache = undefined;
                }
                else {
                    oldModuleAndTypeRefCache = getOldResolutionCache(modules, typeRefs, moduleNameToDirectoryMap);
                }
                // Remove resolutions for files not in the program
                if (oldProgram) {
                    for (const f of oldProgram.getSourceFiles()) {
                        if (!newProgram.getSourceFileByPath(f.path)) removeResolutionsOfFile(f.path);
                    }
                    const oldProgramAutoTypeRefContainingFile = resolutionHost.toPath(oldProgram.getAutomaticTypeDirectiveContainingFile());
                    if (oldProgramAutoTypeRefContainingFile !== newProgramAutoTypeRefContainingFile) {
                        removeResolutionsOfFile(oldProgramAutoTypeRefContainingFile);
                    }
                }
            }
            perFilePackageJsonScope.forEach((existing, path) => {
                if (!newProgram?.getSourceFileByPath(path)) {
                    stopWatchingPackageJsonScope(existing, path);
                    perFilePackageJsonScope.delete(path);
                }
            });
            if (dirToPackageJsonScope.size) {
                oldPackageJsonInfoCache = getOldPackageJsonInfoCache(dirToPackageJsonScope);
            }
            else {
                oldPackageJsonInfoCache = undefined;
            }
            if (needsResolutionUpdate && (!oldProgram || newProgram.getCompilerOptions() !== oldProgram.getCompilerOptions())) updateTypeRootsWatch();
            // Remove symlinked watchers that have zero ref count
            resolutionsToCloseWatcherOn?.forEach(closeWatchersOfResolution);
            resolutionsToCloseWatcherOn = undefined;
            packageJsonsToCloseWatcherOn?.forEach(closeWatchersOfPackageJsonScope);
            packageJsonsToCloseWatcherOn = undefined;
            fileWatchesOfAffectingLocations.forEach((watcher, path) => {
                if (watcher.files === 0 && watcher.resolutions === 0) {
                    fileWatchesOfAffectingLocations.delete(path);
                    watcher.watcher.close();
                }
            });
        }

        function ensurePackageJsonWatchesForFile(newFile: SourceFile, dirToPackageJsonScope: ESMap<Path, PackageJsonScope>) {
            const existing = perFilePackageJsonScope.get(newFile.path);
            const scope = isExternalOrCommonJsModule(newFile) ? newFile.packageJsonScope : undefined;
            if (scope) {
                (scope.files ??= new Set()).add(newFile.path);
                watchPackageJsonScopeLocations(scope, scope.failedLookupLocations, "watchedFailed");
                watchPackageJsonScopeLocations(scope, scope.affectingLocations, "watchedAffected");
                perFilePackageJsonScope.set(newFile.path, scope);
                moduleNameToDirectorySet(
                    dirToPackageJsonScope,
                    getDirectoryPath(newFile.resolvedPath),
                    scope,
                    getPackageJsconLocationFromScope,
                    dir => resolutionHost.toPath(dir),
                    noop,
                );
            }
            if (existing && scope !== existing) stopWatchingPackageJsonScope(existing, newFile.path);
        }

        function stopWatchingPackageJsonScope(scope: PackageJsonScope, path: Path) {
            scope.files?.delete(path);
            if (!scope.files?.size) (packageJsonsToCloseWatcherOn ??= []).push(scope);
        }

        function watchPackageJsonScopeLocations(scope: PackageJsonScope, locations: string[] | undefined, field: "watchedFailed" | "watchedAffected") {
            const locationsLength = locations?.length ?? 0;
            if (!locationsLength || scope[field] === locationsLength) return;
            if (!scope.watchedFailed && !scope.watchedAffected) watchedPackageJsonScopes.push(scope);
            for (let i = scope[field] ?? 0; i < locationsLength; i++) {
                createFileWatcherOfAffectingLocation(locations![i], /*forResolution*/ false);
            }
            scope[field] = locationsLength;
        }

        function closeWatchersOfPackageJsonScope(scope: PackageJsonScope) {
            // Either in use or already closed, skip
            if (scope.files?.size || !scope.files) return;
            scope.files = undefined;
            unorderedRemoveItem(watchedPackageJsonScopes, scope);
            stopWatchingPackageJsonScopeLocations(scope, scope.failedLookupLocations, "watchedFailed");
            stopWatchingPackageJsonScopeLocations(scope, scope.affectingLocations, "watchedAffected");
        }

        function stopWatchingPackageJsonScopeLocations(scope: PackageJsonScope, locations: string[] | undefined, field: "watchedFailed" | "watchedAffected") {
            if (!scope[field]) return;
            for (let i = 0; i < scope[field]!; i++){
                fileWatchesOfAffectingLocations.get(locations![i])!.files--;
            }
            scope[field] = undefined;
        }

        function getOldPackageJsonInfoCache(dirToPackageJsonScope: ESMap<Path, PackageJsonScope>): OldPackageJsonInfoCache {
            let packageJsons: ESMap<string, PackageJsonScope | false> | undefined;
            return {
                getPackageJsonScope: dir => {
                    const scope = dirToPackageJsonScope.get(dir);
                    if (!scope) return undefined;
                    if (!scope.isInvalidated) return scope;
                    if (!resolutionHost.getCompilationSettings().cacheResolutions || !scope.info) return undefined;
                    const packageJson = getPackageJsconLocationFromScope(scope)!;
                    let result = packageJsons?.get(packageJson);
                    if (result !== undefined) return result || undefined;
                    if (resolutionHost.fileExists(packageJson)) {
                        result = {
                            info: getPackageJsonInfo(
                                getDirectoryPath(packageJson),
                                 /*onlyRecordFailures*/ false,
                                getTemporaryModuleResolutionState(moduleResolutionCache.getPackageJsonInfoCache(), resolutionHost.getCompilerHost?.() || resolutionHost, resolutionHost.getCompilationSettings())
                            ),
                            affectingLocations: [packageJson],
                        };
                    }
                    (packageJsons ??= new Map()).set(packageJson, result || false);
                    return result;
                }
            };
        }

        function ensureResolutionsOfFile<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>(
            newProgram: Program,
            perFileCache: PerFileCache<T>,
            fileCacheFromProgram: ModeAwareCache<T> | undefined,
            sourceFileOrPath: SourceFile | Path,
            getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>,
            perDirCache: CacheWithRedirects<Path, ModeAwareCache<T>> | undefined,
            moduleNameToDirectoryMap: CacheWithRedirects<ModeAwareCacheKey, ESMap<Path, ResolvedModuleWithFailedLookupLocations>> | undefined,
        ): CacheWithRedirects<Path, ModeAwareCache<T>> | undefined {
            const path = !isString(sourceFileOrPath) ? sourceFileOrPath.path : sourceFileOrPath;
            let resolutionsInFile = perFileCache.get(path);
            const seenNamesInFile = createModeAwareCache<true>();
            perDirCache = toPerDirectoryResolution(
                newProgram,
                fileCacheFromProgram,
                sourceFileOrPath,
                perDirCache,
                moduleNameToDirectoryMap,
                key => {
                    // If keys dont match release existing resolutions
                    if (resolutionsInFile && resolutionsInFile.key !== key) {
                        resolutionsInFile.cache.forEach(r => stopWatchingResolution(r, path, getResolutionWithResolvedFileName));
                        resolutionsInFile = undefined;
                    }
                },
                (r, name, mode, key) => {
                    seenNamesInFile.set(name, mode, true);
                    const existing = resolutionsInFile?.cache.get(name, mode);
                    if (existing && r !== existing) stopWatchingResolution(existing, path, getResolutionWithResolvedFileName);
                    watchResolution(newProgram, name, r, path, getResolutionWithResolvedFileName);
                    if (!resolutionsInFile) perFileCache.set(path, resolutionsInFile = { key, cache: createModeAwareCache() });
                    resolutionsInFile.cache.set(name, mode, r);
                },
                dir => resolutionHost.toPath(dir),
                noop,
            );
            if ((resolutionsInFile?.cache.size() || 0) !== seenNamesInFile.size()) {
                // Stop watching and remove the unused name
                resolutionsInFile!.cache.forEach((resolution, name, mode) => {
                    if (!seenNamesInFile.has(name, mode)) {
                        stopWatchingResolution(resolution, path, getResolutionWithResolvedFileName);
                        resolutionsInFile!.cache.delete(name, mode);
                    }
                });
                if (!resolutionsInFile?.cache.size) perFileCache.delete(path);
            }
            return perDirCache;
        }

        function getOldResolutionCache(
            modules: CacheWithRedirects<Path, ModeAwareCache<ResolvedModuleWithFailedLookupLocations>> | undefined,
            typeRefs: CacheWithRedirects<Path, ModeAwareCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>> | undefined,
            moduleNameToDirectoryMap: CacheWithRedirects<ModeAwareCacheKey, ESMap<Path, ResolvedModuleWithFailedLookupLocations>>,
        ): OldModuleAndTypeRefCache | undefined {
            if (!modules && !typeRefs) return undefined;
            return {
                modules: {
                    getResolved: (dirPath, name, mode, redirectedReference) => getResolvedWithOldCache(dirPath, name, mode, redirectedReference, modules, moduleNameToDirectoryMap)
                },
                typeRefs: {
                    getResolved: (dirPath, name, mode, redirectedReference) => getResolvedWithOldCache(dirPath, name, mode, redirectedReference, typeRefs, /*moduleNameToDirectoryMap*/ undefined)
                },
                clearRedirectsMap: () => {
                    modules?.clearRedirectsMap();
                    typeRefs?.clearRedirectsMap();
                    moduleNameToDirectoryMap.clearRedirectsMap();
                },
            };
        }

        function getResolvedWithOldCache<T extends ResolutionWithFailedLookupLocations>(
            dirPath: Path,
            name: string,
            mode: ResolutionMode,
            redirectedReference: ResolvedProjectReference | undefined,
            perDirCache: CacheWithRedirects<Path, ModeAwareCache<T>> | undefined,
            moduleNameToDirectoryMap: CacheWithRedirects<ModeAwareCacheKey, ESMap<Path, ResolvedModuleWithFailedLookupLocations>> | undefined
        ): T | undefined {
            if (!perDirCache) return undefined;
            const result = perDirCache.getMapOfCacheRedirects(redirectedReference)?.get(dirPath)?.get(name, mode) ||
                moduleNameToDirectoryMap?.getMapOfCacheRedirects(redirectedReference)?.get(getModeAwareCacheKey(name, mode))?.get(dirPath) as unknown as T;

            return result && !result.isInvalidated ? result : undefined;
        }

        function resolveModuleName(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, redirectedReference?: ResolvedProjectReference, _containingSourceFile?: never, mode?: ResolutionMode): ResolvedModuleWithFailedLookupLocations {
            const primaryResult = ts.resolveModuleName(moduleName, containingFile, compilerOptions, host, moduleResolutionCache, redirectedReference, mode);
            // return result immediately only if global cache support is not enabled or if it is .ts, .tsx or .d.ts
            if (!resolutionHost.getGlobalCache) {
                return primaryResult;
            }

            // otherwise try to load typings from @types
            const globalCache = resolutionHost.getGlobalCache();
            if (globalCache !== undefined && !isExternalModuleNameRelative(moduleName) && !(primaryResult.resolvedModule && extensionIsTS(primaryResult.resolvedModule.extension))) {
                // create different collection of failed lookup locations for second pass
                // if it will fail and we've already found something during the first pass - we don't want to pollute its results
                const { resolvedModule, failedLookupLocations, affectingLocations, resolutionDiagnostics } = loadModuleFromGlobalCache(
                    Debug.checkDefined(resolutionHost.globalCacheResolutionModuleName)(moduleName),
                    resolutionHost.projectName,
                    compilerOptions,
                    host,
                    globalCache,
                    moduleResolutionCache,
                );
                if (resolvedModule) {
                    // Modify existing resolution so its saved in the directory cache as well
                    (primaryResult.resolvedModule as any) = resolvedModule;
                    if (!compilerOptions.cacheResolutions) primaryResult.failedLookupLocations.push(...failedLookupLocations);
                    else primaryResult.failedLookupLocations.length = 0;
                    primaryResult.affectingLocations = updateResolutionField(primaryResult.affectingLocations, affectingLocations);
                    primaryResult.resolutionDiagnostics = updateResolutionField(primaryResult.resolutionDiagnostics, resolutionDiagnostics);
                    return primaryResult;
                }
            }

            // Default return the result from the first pass
            return primaryResult;
        }

        function resolveTypeReferenceDirective(typeReferenceDirectiveName: string, containingFile: string | undefined, options: CompilerOptions, host: ModuleResolutionHost, redirectedReference?: ResolvedProjectReference, _containingSourceFile?: SourceFile, resolutionMode?: ResolutionMode): ResolvedTypeReferenceDirectiveWithFailedLookupLocations {
            return ts.resolveTypeReferenceDirective(typeReferenceDirectiveName, containingFile, options, host, redirectedReference, typeReferenceDirectiveResolutionCache, resolutionMode);
        }

        interface ResolveNamesWithLocalCacheInput<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName> {
            names: readonly string[] | readonly FileReference[];
            containingFile: string;
            redirectedReference: ResolvedProjectReference | undefined;
            perFileCache: PerFileCache<T>;
            loader: (name: string, containingFile: string, options: CompilerOptions, host: ModuleResolutionHost, redirectedReference?: ResolvedProjectReference, containingSourceFile?: SourceFile, resolutionMode?: ResolutionMode) => T;
            getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>;
            partialResolutionInfo?: PartialResolutionInfo;
            logChanges?: boolean;
            containingSourceFile?: SourceFile;
            containingSourceFileMode?: ResolutionMode;
        }
        function resolveNamesWithLocalCache<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>({
            names, containingFile, redirectedReference,
            perFileCache,
            loader, getResolutionWithResolvedFileName,
            partialResolutionInfo, logChanges, containingSourceFile, containingSourceFileMode
        }: ResolveNamesWithLocalCacheInput<T, R>): T[] {
            const path = resolutionHost.toPath(containingFile);
            let resolutionsInFile = perFileCache.get(path);
            const compilerOptions = resolutionHost.getCompilationSettings();
            const key = getRedirectsCacheKey(redirectedReference?.commandLine.options || compilerOptions);
            if (!resolutionsInFile || resolutionsInFile.key !== key) {
                resolutionsInFile?.cache.forEach(r => stopWatchingResolution(r, path, getResolutionWithResolvedFileName));
                perFileCache.set(path, resolutionsInFile = { key, cache: createModeAwareCache() });
            }

            const resolvedModules: T[] = [];
            const seenNamesInFile = createModeAwareCache<true>();
            let i = 0;
            for (const entry of names) {
                const name = isString(entry) ? entry : toFileNameLowerCase(entry.fileName);
                // Imports supply a `containingSourceFile` but no `containingSourceFileMode` - it would be redundant
                // they require calculating the mode for a given import from it's position in the resolution table, since a given
                // import's syntax may override the file's default mode.
                // Type references instead supply a `containingSourceFileMode` and a non-string entry which contains
                // a default file mode override if applicable.
                const mode = !isString(entry) ? getModeForFileReference(entry, containingSourceFileMode) :
                    containingSourceFile ? getModeForResolutionAtIndex(containingSourceFile, partialResolutionInfo?.namesIndex[i] ?? i) : undefined;
                i++;
                let resolution = resolutionsInFile.cache.get(name, mode);
                // Resolution is valid if it is present and not invalidated
                if (!seenNamesInFile.has(name, mode) && (!resolution || resolution.isInvalidated)) {
                    const existingResolution = resolution;
                    resolution = loader(name, containingFile, compilerOptions, resolutionHost.getCompilerHost?.() || resolutionHost, redirectedReference, containingSourceFile, mode);
                    if (resolutionHost.onDiscoveredSymlink && resolutionIsSymlink(resolution)) {
                        resolutionHost.onDiscoveredSymlink();
                    }
                    resolutionsInFile.cache.set(name, mode, resolution);
                    if (existingResolution) {
                        stopWatchingResolution(existingResolution, path, getResolutionWithResolvedFileName);
                    }

                    if (logChanges && filesWithChangedSetOfUnresolvedImports && !resolutionIsEqualTo(existingResolution, resolution)) {
                        filesWithChangedSetOfUnresolvedImports.push(path);
                        // reset log changes to avoid recording the same file multiple times
                        logChanges = false;
                    }
                }
                else {
                    const host = resolutionHost.getCompilerHost?.() || resolutionHost;
                    if (isTraceEnabled(compilerOptions, host) && !seenNamesInFile.has(name, mode)) {
                        const resolved = getResolutionWithResolvedFileName(resolution!);
                        trace(
                            host,
                            loader === resolveModuleName as unknown ?
                                resolved?.resolvedFileName ?
                                    resolved.packageId ?
                                        Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2_with_Package_ID_3 :
                                        Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2 :
                                    Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_not_resolved :
                                resolved?.resolvedFileName ?
                                    resolved.packageId ?
                                        Diagnostics.Reusing_resolution_of_type_reference_directive_0_from_1_of_old_program_it_was_successfully_resolved_to_2_with_Package_ID_3 :
                                        Diagnostics.Reusing_resolution_of_type_reference_directive_0_from_1_of_old_program_it_was_successfully_resolved_to_2 :
                                    Diagnostics.Reusing_resolution_of_type_reference_directive_0_from_1_of_old_program_it_was_not_resolved,
                            name,
                            containingFile,
                            resolved?.resolvedFileName,
                            resolved?.packageId && packageIdToString(resolved.packageId)
                        );
                    }
                }
                Debug.assert(resolution !== undefined && !resolution.isInvalidated);
                seenNamesInFile.set(name, mode, true);
                resolvedModules.push(resolution);
            }

            partialResolutionInfo?.reusedNames?.forEach(({ name, mode }) => seenNamesInFile.set(name, mode, true));
            if (resolutionsInFile.cache.size() !== seenNamesInFile.size()) {
                // Stop watching and remove the unused name
                resolutionsInFile.cache.forEach((resolution, name, mode) => {
                    if (!seenNamesInFile.has(name, mode)) {
                        stopWatchingResolution(resolution, path, getResolutionWithResolvedFileName);
                        resolutionsInFile!.cache.delete(name, mode);
                    }
                });
            }

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

        function resolveTypeReferenceDirectives(
            typeDirectiveNames: string[] | readonly FileReference[],
            containingFile: string,
            redirectedReference?: ResolvedProjectReference,
            containingFileMode?: ResolutionMode,
            partialResolutionInfo?: PartialResolutionInfo
        ) {
            return resolveNamesWithLocalCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations, ResolvedTypeReferenceDirective>({
                names: typeDirectiveNames,
                containingFile,
                redirectedReference,
                perFileCache: resolvedTypeReferenceDirectives,
                loader: resolveTypeReferenceDirective,
                getResolutionWithResolvedFileName: getResolvedTypeReferenceDirectiveOfResolution,
                containingSourceFileMode: containingFileMode,
                partialResolutionInfo,
            });
        }

        function resolveModuleNames(
            moduleNames: string[],
            containingFile: string,
            redirectedReference?: ResolvedProjectReference,
            containingSourceFile?: SourceFile,
            partialResolutionInfo?: PartialResolutionInfo
        ) {
            return resolveNamesWithLocalCache<ResolvedModuleWithFailedLookupLocations, ResolvedModuleFull>({
                names: moduleNames,
                containingFile,
                redirectedReference,
                perFileCache: resolvedModuleNames,
                loader: resolveModuleName,
                getResolutionWithResolvedFileName: getResolvedModuleOfResolution,
                partialResolutionInfo,
                logChanges: logChangesWhenResolvingModule,
                containingSourceFile,
            });
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
                return canWatchDirectoryOrFile(getDirectoryPath(dirPath)) ? { dir, dirPath } : undefined;
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

            return canWatchDirectoryOrFile(dirPath) ? { dir: subDirectory || dir, dirPath: subDirectoryPath || dirPath, nonRecursive } : undefined;
        }

        function isPathWithDefaultFailedLookupExtension(path: Path) {
            return fileExtensionIsOneOf(path, failedLookupDefaultExtensions);
        }

        function watchResolution<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>(
            newProgram: Program,
            name: string,
            resolution: T,
            filePath: Path,
            getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>,
        ) {
            if (resolution.files) {
                resolution.files.add(filePath);
                if (resolution.watchedFailed !== false) watchFailedLookupLocationOfResolution(resolution);
                watchAffectingLocationsOfResolution(resolution);
                return;
            }

            resolution.files = new Set();
            resolution.files.add(filePath);
            const resolved = getResolutionWithResolvedFileName(resolution);
            if (resolved && resolved.resolvedFileName) {
                resolvedFileToResolution.add(resolutionHost.toPath(resolved.resolvedFileName), resolution);
            }
            if (isExternalModuleNameRelative(name) || !newProgram.getTypeChecker().tryFindAmbientModuleWithoutAugmentations(name)) {
                watchFailedLookupLocationOfResolution(resolution);
                watchAffectingLocationsOfResolution(resolution);
            }
            else {
                resolution.watchedFailed = false;
                watchAffectingLocationsOfResolution(resolution);
            }
        }

        function watchFailedLookupLocationOfResolution(resolution: ResolutionWithFailedLookupLocations) {
            const { failedLookupLocations } = resolution;
            if (!failedLookupLocations.length || resolution.watchedFailed === failedLookupLocations.length) return;
            if (!resolution.watchedFailed) {
                resolutionsWithFailedLookups.push(resolution);
                // Remove resolution from only watching affected locations
                if (resolution.watchedAffected) unorderedRemoveItem(resolutionsWithOnlyAffectingLocations, resolution);
            }

            let setAtRoot = !!resolution.setAtRoot;
            for (let i = resolution.watchedFailed || 0; i < failedLookupLocations.length; i++) {
                const failedLookupLocation = failedLookupLocations[i];
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

            if (setAtRoot && !resolution.setAtRoot) {
                // This is always non recursive
                setDirectoryWatcher(rootDir!, rootPath, /*nonRecursive*/ true);
            }
            resolution.setAtRoot = setAtRoot;
            resolution.watchedFailed = failedLookupLocations.length;
        }

        function watchAffectingLocationsOfResolution(resolution: ResolutionWithFailedLookupLocations) {
            const { affectingLocations } = resolution;
            if (!affectingLocations?.length || resolution.watchedAffected === affectingLocations.length) return;
            if (!resolution.watchedFailed && !resolution.watchedAffected) resolutionsWithOnlyAffectingLocations.push(resolution);
            // Watch package json
            for (let i = resolution.watchedAffected || 0; i < affectingLocations.length; i++) {
                createFileWatcherOfAffectingLocation(affectingLocations[i], /*forResolution*/ true);
            }
            resolution.watchedAffected = affectingLocations.length;
        }

        function createFileWatcherOfAffectingLocation(affectingLocation: string, forResolution: boolean) {
            const fileWatcher = fileWatchesOfAffectingLocations.get(affectingLocation);
            if (fileWatcher) {
                if (forResolution) fileWatcher.resolutions++;
                else fileWatcher.files++;
                return;
            }
            let locationToWatch = affectingLocation;
            if (resolutionHost.realpath) {
                locationToWatch = resolutionHost.realpath(affectingLocation);
                if (affectingLocation !== locationToWatch) {
                    const fileWatcher = fileWatchesOfAffectingLocations.get(locationToWatch);
                    if (fileWatcher) {
                        if (forResolution) fileWatcher.resolutions++;
                        else fileWatcher.files++;
                        fileWatcher.paths.add(affectingLocation);
                        fileWatchesOfAffectingLocations.set(affectingLocation, fileWatcher);
                        return;
                    }
                }
            }
            const paths = new Set<string>();
            paths.add(locationToWatch);
            let actualWatcher = canWatchDirectoryOrFile(resolutionHost.toPath(locationToWatch)) ?
                resolutionHost.watchAffectingFileLocation(locationToWatch, (fileName, eventKind) => {
                    cachedDirectoryStructureHost?.addOrDeleteFile(fileName, resolutionHost.toPath(locationToWatch), eventKind);
                    const packageJsonMap = moduleResolutionCache.getPackageJsonInfoCache().getInternalMap();
                    paths.forEach(path => {
                        if (watcher.resolutions) (affectingPathChecks ??= new Set()).add(path);
                        if (watcher.files) (affectingPathChecksForFile ??= new Set()).add(path);
                        packageJsonMap?.delete(resolutionHost.toPath(path));
                    });
                    resolutionHost.scheduleInvalidateResolutionsOfFailedLookupLocations();
                }) : noopFileWatcher;
            const watcher: FileWatcherOfAffectingLocation = {
                watcher: actualWatcher !== noopFileWatcher ? {
                    close: () => {
                        actualWatcher.close();
                        // Ensure when watching symlinked package.json, we can close the actual file watcher only once
                        actualWatcher = noopFileWatcher;
                    }
                } : actualWatcher,
                resolutions: forResolution ? 1 : 0,
                files: forResolution ? 0 : 1,
                paths,
            };
            fileWatchesOfAffectingLocations.set(locationToWatch, watcher);
            if (affectingLocation !== locationToWatch) {
                fileWatchesOfAffectingLocations.set(affectingLocation, watcher);
                paths.add(affectingLocation);
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

        function stopWatchingResolution<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>(
            resolution: T,
            filePath: Path,
            getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>,
        ) {
            resolution.files?.delete(filePath);
            if (!resolution.files?.size) (resolutionsToCloseWatcherOn ??= []).push({ resolution, getResolved: getResolutionWithResolvedFileName });
        }

        function closeWatchersOfResolution({ resolution, getResolved }: {
            resolution: ResolutionWithFailedLookupLocations;
            getResolved: (resolution: ResolutionWithFailedLookupLocations) => ResolutionWithResolvedFileName;
        }) {
            // If some files are using this resolution or we have already closed all watchers ignore
            if (resolution.files?.size || !resolution.files) return;
            resolution.files = undefined;
            const resolved = getResolved(resolution);
            if (resolved && resolved.resolvedFileName) {
                resolvedFileToResolution.remove(resolutionHost.toPath(resolved.resolvedFileName), resolution);
            }

            if (resolution.watchedFailed) {
                unorderedRemoveItem(resolutionsWithFailedLookups, resolution);
                let removeAtRoot = false;
                for (let i = 0; i < resolution.watchedFailed; i++) {
                    const failedLookupLocation = resolution.failedLookupLocations[i];
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
                Debug.assert(resolution.setAtRoot === removeAtRoot);
                if (removeAtRoot) {
                    removeDirectoryWatcher(rootPath);
                }
            }
            else if (resolution.watchedAffected) {
                unorderedRemoveItem(resolutionsWithOnlyAffectingLocations, resolution);
            }

            if (resolution.watchedAffected) {
                for (let i = 0; i < resolution.watchedAffected; i++) {
                    const watcher = fileWatchesOfAffectingLocations.get(resolution.affectingLocations![i])!;
                    watcher.resolutions--;
                }
            }
        }

        function removeDirectoryWatcher(dirPath: string) {
            const dirWatcher = directoryWatchesOfFailedLookups.get(dirPath)!;
            dirWatcher.refCount--;
            if (dirWatcher.refCount === 0) {
                directoryWatchesOfFailedLookups.delete(dirPath);
                dirWatcher.watcher.close();
            }
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
            cache: PerFileCache<T>,
            filePath: Path,
            getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>,
        ) {
            // Deleted file, stop watching failed lookups for all the resolutions in the file
            const resolutions = cache.get(filePath);
            if (resolutions) {
                resolutions.cache.forEach(resolution => stopWatchingResolution(resolution, filePath, getResolutionWithResolvedFileName));
                cache.delete(filePath);
            }
        }

        function removeResolutionsOfFile(filePath: Path) {
            removeResolutionsOfFileFromCache(resolvedModuleNames, filePath, getResolvedModuleOfResolution);
            removeResolutionsOfFileFromCache(resolvedTypeReferenceDirectives, filePath, getResolvedTypeReferenceDirectiveOfResolution);
        }

        function invalidateResolutions(resolutions: ResolutionWithFailedLookupLocations[] | undefined, canInvalidate: (resolution: ResolutionWithFailedLookupLocations) => boolean) {
            if (!resolutions) return false;
            let invalidated = false;
            for (const resolution of resolutions) {
                if (resolution.isInvalidated || !canInvalidate(resolution)) continue;
                resolution.isInvalidated = invalidated = true;
                resolution.files?.forEach(containingFilePath => {
                    (filesWithInvalidatedResolutions ??= new Set()).add(containingFilePath);
                    // When its a file with inferred types resolution, invalidate type reference directive resolution
                    hasChangedAutomaticTypeDirectiveNames = hasChangedAutomaticTypeDirectiveNames || endsWith(containingFilePath, inferredTypesContainingFile);
                });
            }
            return invalidated;
        }

        function invalidateResolutionOfFile(filePath: Path) {
            // Resolution is invalidated if the resulting file name is same as the deleted file path
            const prevHasChangedAutomaticTypeDirectiveNames = hasChangedAutomaticTypeDirectiveNames;
            if (invalidateResolutions(resolvedFileToResolution.get(filePath), returnTrue) &&
                hasChangedAutomaticTypeDirectiveNames &&
                !prevHasChangedAutomaticTypeDirectiveNames) {
                resolutionHost.onChangedAutomaticTypeDirectiveNames();
            }
        }

        function setFilesWithInvalidatedNonRelativeUnresolvedImports(filesMap: ReadonlyESMap<Path, UnresolvedImports>) {
            filesMap.forEach(({ imports }, filePath) => {
                if (!imports.length) return;
                const resolvedModules = resolvedModuleNames.get(filePath);
                const resolvedTypeRefs = resolvedTypeReferenceDirectives.get(filePath);
                if (!resolvedModules?.cache.size() && !resolvedTypeRefs?.cache.size()) return;
                imports.forEach(({ name, mode }) => {
                    const resolvedModule = resolvedModules?.cache.get(name, mode);
                    if (resolvedModule && !resolvedModule.isInvalidated && (!resolvedModule.resolvedModule || !resolutionExtensionIsTSOrJson(resolvedModule.resolvedModule.extension))) {
                        resolvedModule.isInvalidated = true;
                        (filesWithInvalidatedResolutions ??= new Set()).add(filePath);
                    }
                    const resolvedTypeRef = resolvedTypeRefs?.cache.get(name, mode);
                    if (resolvedTypeRef && !resolvedTypeRef.isInvalidated && !resolvedTypeRef.resolvedTypeReferenceDirective) {
                        resolvedTypeRef.isInvalidated = true;
                        (filesWithInvalidatedResolutions ??= new Set()).add(filePath);
                    }
                });
            });
        }

        function scheduleInvalidateResolutionOfFailedLookupLocation(fileOrDirectoryPath: Path, isCreatingWatchedDirectory: boolean) {
            if (isCreatingWatchedDirectory) {
                // Watching directory is created
                // Invalidate any resolution has failed lookup in this directory
                (isInDirectoryChecks ||= new Set()).add(fileOrDirectoryPath);
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
                    (failedLookupChecks ||= new Set()).add(fileOrDirectoryPath);
                    (startsWithPathChecks ||= new Set()).add(fileOrDirectoryPath);
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
                    (failedLookupChecks ||= new Set()).add(fileOrDirectoryPath);

                    // If the invalidated file is from a node_modules package, invalidate everything else
                    // in the package since we might not get notifications for other files in the package.
                    // This hardens our logic against unreliable file watchers.
                    const packagePath = parseNodeModuleFromPath(fileOrDirectoryPath);
                    if (packagePath) (startsWithPathChecks ||= new Set()).add(packagePath as Path);
                }
            }
            resolutionHost.scheduleInvalidateResolutionsOfFailedLookupLocations();
        }

        function invalidateResolutionsOfFailedLookupLocations() {
            let invalidated = false;
            if (affectingPathChecksForFile) {
                for (const scope of watchedPackageJsonScopes) {
                    if (scope.isInvalidated) continue;
                    if (some(scope.failedLookupLocations, location => affectingPathChecksForFile!.has(location)) ||
                        some(scope.affectingLocations, location => affectingPathChecksForFile!.has(location))) {
                        scope.isInvalidated = true;
                        invalidated = true;
                        scope.files?.forEach(path => (filesWithInvalidatedResolutions ??= new Set()).add(path));
                    }
                }
                affectingPathChecksForFile = undefined;
            }

            if (!failedLookupChecks && !startsWithPathChecks && !isInDirectoryChecks && !affectingPathChecks) {
                return invalidated;
            }

            invalidated = invalidateResolutions(resolutionsWithFailedLookups, canInvalidateFailedLookupResolution) || invalidated;
            const packageJsonMap = moduleResolutionCache.getPackageJsonInfoCache().getInternalMap();
            if (packageJsonMap && (failedLookupChecks || startsWithPathChecks || isInDirectoryChecks)) {
                packageJsonMap.forEach((_value, path) => isInvalidatedFailedLookup(path) ? packageJsonMap.delete(path) : undefined);
            }
            failedLookupChecks = undefined;
            startsWithPathChecks = undefined;
            isInDirectoryChecks = undefined;
            invalidated = invalidateResolutions(resolutionsWithOnlyAffectingLocations, canInvalidatedFailedLookupResolutionWithAffectingLocation) || invalidated;
            affectingPathChecks = undefined;
            return invalidated;
        }

        function canInvalidateFailedLookupResolution(resolution: ResolutionWithFailedLookupLocations) {
            if (canInvalidatedFailedLookupResolutionWithAffectingLocation(resolution)) return true;
            if (!failedLookupChecks && !startsWithPathChecks && !isInDirectoryChecks) return false;
            return resolution.failedLookupLocations.some(location => isInvalidatedFailedLookup(resolutionHost.toPath(location)));
        }

        function isInvalidatedFailedLookup(locationPath: Path) {
            return failedLookupChecks?.has(locationPath) ||
                firstDefinedIterator(startsWithPathChecks?.keys() || emptyIterator, fileOrDirectoryPath => startsWith(locationPath, fileOrDirectoryPath) ? true : undefined) ||
                firstDefinedIterator(isInDirectoryChecks?.keys() || emptyIterator, fileOrDirectoryPath => isInDirectoryPath(fileOrDirectoryPath, locationPath) ? true : undefined);
        }

        function canInvalidatedFailedLookupResolutionWithAffectingLocation(resolution: ResolutionWithFailedLookupLocations) {
            return !!affectingPathChecks && !!resolution.affectingLocations?.some(location => affectingPathChecks!.has(location));
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
            return dirPath === rootPath || canWatchDirectoryOrFile(dirPath);
        }
    }

    function resolutionIsSymlink(resolution: ResolutionWithFailedLookupLocations) {
        return !!(
            (resolution as ResolvedModuleWithFailedLookupLocations).resolvedModule?.originalPath ||
            (resolution as ResolvedTypeReferenceDirectiveWithFailedLookupLocations).resolvedTypeReferenceDirective?.originalPath
        );
    }
}
