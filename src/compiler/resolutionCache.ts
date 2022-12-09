import * as ts from "./_namespaces/ts";
import {
    arrayToMap,
    CachedDirectoryStructureHost,
    CharacterCodes,
    clearMap,
    closeFileWatcher,
    closeFileWatcherOf,
    CompilerOptions,
    createModeAwareCache,
    createModuleResolutionCache,
    createPerNonRelativeNameCache,
    createRedirectsCacheKey,
    createTypeReferenceDirectiveResolutionCache,
    createTypeReferenceResolutionLoader,
    Debug,
    Diagnostics,
    directorySeparator,
    DirectoryWatcherCallback,
    emptyIterator,
    endsWith,
    Extension,
    extensionIsTS,
    fileExtensionIsOneOf,
    FileReference,
    FileWatcher,
    FileWatcherCallback,
    firstDefinedIterator,
    GetCanonicalFileName,
    getDirectoryPath,
    getEffectiveTypeRoots,
    getNormalizedAbsolutePath,
    getOriginalOrResolvedModuleFileName,
    getOriginalOrResolvedTypeReferenceFileName,
    getPackageJsonInfo,
    getPackageJsonLocationFromScope,
    getRootLength,
    getTemporaryModuleResolutionState,
    HasInvalidatedResolutions,
    ignoredPaths,
    inferredTypesContainingFile,
    isEmittedFileOfProgram,
    isExternalModuleNameRelative,
    isExternalOrCommonJsModule,
    isNodeModulesDirectory,
    isRootedDiskPath,
    isString,
    isTraceEnabled,
    loadModuleFromGlobalCache,
    memoize,
    MinimalResolutionCacheHost,
    ModeAwareCache,
    ModuleResolutionCache,
    moduleResolutionNameAndModeGetter,
    mutateMap,
    noop,
    noopFileWatcher,
    normalizePath,
    OldPackageJsonInfoCache,
    OldResolutionCache,
    PackageId,
    packageIdToString,
    PackageJsonScope,
    parseNodeModuleFromPath,
    Path,
    pathContainsNodeModules,
    PerDirectoryAndNonRelativeNameCache,
    PerNonRelativeNameCache,
    Program,
    RedirectsCacheKey,
    removeSuffix,
    removeTrailingDirectorySeparator,
    resolutionExtensionIsTSOrJson,
    ResolutionLoader,
    ResolutionMode,
    ResolvedModuleWithFailedLookupLocations,
    ResolvedProjectReference,
    ResolvedTypeReferenceDirectiveWithFailedLookupLocations,
    returnTrue,
    some,
    SourceFile,
    startsWith,
    stringContains,
    StringLiteralLike,
    StructureIsReused,
    toPerDirectoryAndNonRelativeNameCache,
    trace,
    TypeReferenceDirectiveResolutionCache,
    updateResolutionField,
    WatchDirectoryFlags,
} from "./_namespaces/ts";

/** @internal */
export interface UnresolvedImports {
    readonly packages: readonly string[];
    readonly imports: readonly { name: string; mode: ResolutionMode; }[];
}

/**
 * This is the cache of module/typedirectives resolution that can be retained across program
 *
 * @internal
 */
export interface ResolutionCache {
    startRecordingFilesWithChangedResolutions(): void;
    finishRecordingFilesWithChangedResolutions(): Path[] | undefined;

    resolveModuleNameLiterals(
        moduleLiterals: readonly StringLiteralLike[],
        containingFile: string,
        redirectedReference: ResolvedProjectReference | undefined,
        options: CompilerOptions,
        containingSourceFile: SourceFile,
        reusedNames: readonly StringLiteralLike[] | undefined,
    ): readonly ResolvedModuleWithFailedLookupLocations[];
    resolveTypeReferenceDirectiveReferences<T extends FileReference | string>(
        typeDirectiveReferences: readonly T[],
        containingFile: string,
        redirectedReference: ResolvedProjectReference | undefined,
        options: CompilerOptions,
        containingSourceFile: SourceFile | undefined,
        reusedNames: readonly T[] | undefined
    ): readonly ResolvedTypeReferenceDirectiveWithFailedLookupLocations[];

    resolveSingleModuleNameWithoutWatching(
        moduleName: string,
        containingFile: string,
    ): ResolvedModuleWithFailedLookupLocations;

    invalidateResolutionsOfFailedLookupLocations(): boolean;
    invalidateResolutionOfFile(filePath: Path): void;
    setFilesWithInvalidatedNonRelativeUnresolvedImports(filesWithUnresolvedImports: Map<Path, UnresolvedImports>): void;
    createHasInvalidatedResolutions(customHasInvalidatedResolutions: HasInvalidatedResolutions): HasInvalidatedResolutions;
    hasChangedAutomaticTypeDirectiveNames(): boolean;

    resolvedModuleNames: PerFileCache<CachedResolvedModuleWithFailedLookupLocations>;
    resolvedTypeReferenceDirectives: PerFileCache<CachedResolvedTypeReferenceDirectiveWithFailedLookupLocations>;

    startCachingPerDirectoryResolution(): void;
    finishCachingPerDirectoryResolution(newProgram: Program | undefined, oldProgram: Program | undefined): void;

    getModuleResolutionCache(): ModuleResolutionCache;
    getTypeReferenceDirectiveResolutionCache(): TypeReferenceDirectiveResolutionCache;

    clear(): void;
}

/** @internal */
export interface CachePackageJsonScope extends PackageJsonScope {
    isInvalidated?: boolean;
    files?: Set<Path>;
    watchedFailed?: number;
    watchedAffected?: number;
}

/** @internal */
export interface ResolutionWithFailedLookupLocations {
    failedLookupLocations?: string[];
    affectingLocations?: string[];
    isInvalidated?: boolean;
    // Files that have this resolution using
    files?: Set<Path>;
    watchedFailed?: number | false;
    watchedAffected?: number;
    setAtRoot?: boolean;
}

interface ResolutionWithResolvedFileName {
    resolvedFileName: string | undefined;
    packageId?: PackageId;
}

/** @internal */
export interface CachedResolvedModuleWithFailedLookupLocations extends ResolvedModuleWithFailedLookupLocations, ResolutionWithFailedLookupLocations {
}

/** @internal */
export interface CachedResolvedTypeReferenceDirectiveWithFailedLookupLocations extends ResolvedTypeReferenceDirectiveWithFailedLookupLocations, ResolutionWithFailedLookupLocations {
}

/** @internal */
export interface PerFileCacheEntry<T> {
    cache: ModeAwareCache<T>;
    options: CompilerOptions;
    key: RedirectsCacheKey | undefined;
}
/** @internal */
export type PerFileCache<T> = Map<Path, PerFileCacheEntry<T>>;

interface OldModuleAndTypeRefCache {
    modules: OldResolutionCache<ResolvedModuleWithFailedLookupLocations> | undefined;
    typeRefs: OldResolutionCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations> | undefined;
}

/** @internal */
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

/** @internal */
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
 *
 * @internal
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
        pathPartForUserCheck.search(/[a-zA-Z]\$\//) === 0) { // Dos style nextPart
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

/** @internal */
export function createResolutionCache(resolutionHost: ResolutionCacheHost, rootDirForResolution: string | undefined, logChangesWhenResolvingModule: boolean): ResolutionCache {
    let filesWithChangedSetOfUnresolvedImports: Path[] | undefined;
    let filesWithInvalidatedResolutions: Set<Path> | undefined;

    const resolutionsWithFailedLookups = new Set<ResolutionWithFailedLookupLocations>();
    const resolutionsWithOnlyAffectingLocations = new Set<ResolutionWithFailedLookupLocations>();
    const resolvedFileToResolution = new Map<Path, Set<ResolutionWithFailedLookupLocations>>();
    const perFilePackageJsonScope = new Map<Path, CachePackageJsonScope>();
    const watchedPackageJsonScopes = new Set<CachePackageJsonScope>();
    let packageJsonsToCloseWatcherOn: CachePackageJsonScope[] | undefined;
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
    const resolvedModuleNames: PerFileCache<CachedResolvedModuleWithFailedLookupLocations> = new Map();
    const moduleResolutionCache = createModuleResolutionCache(
        getCurrentDirectory(),
        resolutionHost.getCanonicalFileName,
        resolutionHost.getCompilationSettings(),
    );

    const resolvedTypeReferenceDirectives: PerFileCache<CachedResolvedTypeReferenceDirectiveWithFailedLookupLocations> = new Map();
    const typeReferenceDirectiveResolutionCache = createTypeReferenceDirectiveResolutionCache(
        getCurrentDirectory(),
        resolutionHost.getCanonicalFileName,
        resolutionHost.getCompilationSettings(),
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
        resolveModuleNameLiterals,
        resolveTypeReferenceDirectiveReferences,
        resolveSingleModuleNameWithoutWatching,
        hasChangedAutomaticTypeDirectiveNames: () => hasChangedAutomaticTypeDirectiveNames,
        invalidateResolutionOfFile,
        invalidateResolutionsOfFailedLookupLocations,
        setFilesWithInvalidatedNonRelativeUnresolvedImports,
        createHasInvalidatedResolutions,
        clear,
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
        clearMap(fileWatchesOfAffectingLocations, closeFileWatcherOf);
        customFailedLookupPaths.clear();
        closeTypeRootsWatch();
        resolvedModuleNames.clear();
        resolvedTypeReferenceDirectives.clear();
        resolvedFileToResolution.clear();
        resolutionsWithFailedLookups.clear();
        resolutionsWithOnlyAffectingLocations.clear();
        watchedPackageJsonScopes.clear();
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
        moduleResolutionCache.update(resolutionHost.getCompilationSettings());
        typeReferenceDirectiveResolutionCache.update(resolutionHost.getCompilationSettings());
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

    function createHasInvalidatedResolutions(customHasInvalidatedResolutions: HasInvalidatedResolutions): HasInvalidatedResolutions {
        // Ensure pending resolutions are applied
        invalidateResolutionsOfFailedLookupLocations();
        const collected = filesWithInvalidatedResolutions;
        filesWithInvalidatedResolutions = undefined;
        return path => customHasInvalidatedResolutions(path) ||
            !!collected?.has(path);
    }

    function startCachingPerDirectoryResolution() {
        const packageJsonInfoCache = moduleResolutionCache.getPackageJsonInfoCache();
        const internalCache = packageJsonInfoCache.getInternalMap();
        moduleResolutionCache.clear();
        typeReferenceDirectiveResolutionCache.clear();
        moduleResolutionCache.update(resolutionHost.getCompilationSettings());
        typeReferenceDirectiveResolutionCache.update(resolutionHost.getCompilationSettings());
        if (oldModuleAndTypeRefCache) {
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
        let modules: PerDirectoryAndNonRelativeNameCache<ResolvedModuleWithFailedLookupLocations> | undefined;
        let typeRefs: PerDirectoryAndNonRelativeNameCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations> | undefined;
        let packageJsonScopes: PerNonRelativeNameCache<PackageJsonScope> | undefined;
        for (const newFile of newProgram.getSourceFiles()) {
            if (needsResolutionUpdate) {
                modules = ensureResolutionsOfFile(
                    newProgram,
                    modules,
                    getOriginalOrResolvedModuleFileName,
                    newFile.resolvedModules,
                    newFile,
                    resolvedModuleNames,
                    getResolvedModule,
                );
                typeRefs = ensureResolutionsOfFile(
                    newProgram,
                    typeRefs,
                    getOriginalOrResolvedTypeReferenceFileName,
                    newFile.resolvedTypeReferenceDirectiveNames,
                    newFile,
                    resolvedTypeReferenceDirectives,
                    getResolvedTypeReferenceDirective,
                );
            }
            packageJsonScopes = ensurePackageJsonWatchesForFile(newProgram, packageJsonScopes, newFile);
        }
        if (needsResolutionUpdate) {
            const newProgramAutoTypeRefContainingFile = resolutionHost.toPath(newProgram.getAutomaticTypeDirectiveContainingFile());
            typeRefs = ensureResolutionsOfFile(
                newProgram,
                typeRefs,
                getOriginalOrResolvedTypeReferenceFileName,
                newProgram.getAutomaticTypeDirectiveResolutions(),
                newProgramAutoTypeRefContainingFile,
                resolvedTypeReferenceDirectives,
                getResolvedTypeReferenceDirective,
            );
            oldModuleAndTypeRefCache = getOldResolutionCache(modules, typeRefs);
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
        oldPackageJsonInfoCache = getOldPackageJsonInfoCache(packageJsonScopes);
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

    function ensurePackageJsonWatchesForFile(
        newProgram: Program,
        packageJsonScopes: PerNonRelativeNameCache<CachePackageJsonScope> | undefined,
        newFile: SourceFile,
    ): PerNonRelativeNameCache<PackageJsonScope> | undefined {
        const existing = perFilePackageJsonScope.get(newFile.path);
        const scope = isExternalOrCommonJsModule(newFile) ? newFile.packageJsonScope as CachePackageJsonScope : undefined;
        if (scope) {
            (scope.files ??= new Set()).add(newFile.path);
            watchPackageJsonScopeLocations(scope, scope.failedLookupLocations, "watchedFailed");
            watchPackageJsonScopeLocations(scope, scope.affectingLocations, "watchedAffected");
            perFilePackageJsonScope.set(newFile.path, scope);
            (packageJsonScopes ??= createPerNonRelativeNameCache(
                newProgram.getCurrentDirectory(),
                newProgram.getCanonicalFileName,
                getPackageJsonLocationFromScope,
            )).setWithPath(getDirectoryPath(newFile.resolvedPath), scope, noop);
        }
        if (existing && scope !== existing) stopWatchingPackageJsonScope(existing, newFile.path);
        return packageJsonScopes;
    }

    function stopWatchingPackageJsonScope(scope: CachePackageJsonScope, path: Path) {
        scope.files?.delete(path);
        if (!scope.files?.size) (packageJsonsToCloseWatcherOn ??= []).push(scope);
    }

    function watchPackageJsonScopeLocations(scope: CachePackageJsonScope, locations: string[] | undefined, field: "watchedFailed" | "watchedAffected") {
        const locationsLength = locations?.length ?? 0;
        if (!locationsLength || scope[field] === locationsLength) return;
        if (!scope.watchedFailed && !scope.watchedAffected) watchedPackageJsonScopes.add(scope);
        for (let i = scope[field] ?? 0; i < locationsLength; i++) {
            createFileWatcherOfAffectingLocation(locations![i], /*forResolution*/ false);
        }
        scope[field] = locationsLength;
    }

    function closeWatchersOfPackageJsonScope(scope: CachePackageJsonScope) {
        // Either in use or already closed, skip
        if (scope.files?.size || !scope.files) return;
        scope.files = undefined;
        watchedPackageJsonScopes.delete(scope);
        stopWatchingPackageJsonScopeLocations(scope, scope.failedLookupLocations, "watchedFailed");
        stopWatchingPackageJsonScopeLocations(scope, scope.affectingLocations, "watchedAffected");
    }

    function stopWatchingPackageJsonScopeLocations(scope: CachePackageJsonScope, locations: string[] | undefined, field: "watchedFailed" | "watchedAffected") {
        if (!scope[field]) return;
        for (let i = 0; i < scope[field]!; i++){
            fileWatchesOfAffectingLocations.get(locations![i])!.files--;
        }
        scope[field] = undefined;
    }

    function getOldPackageJsonInfoCache(packageJsonScopes: PerNonRelativeNameCache<CachePackageJsonScope> | undefined): OldPackageJsonInfoCache | undefined {
        if (!packageJsonScopes) return undefined;
        let packageJsons: Map<string, PackageJsonScope | false> | undefined;
        return {
            getPackageJsonScope: dir => {
                const scope = packageJsonScopes.get(dir);
                if (!scope) return undefined;
                if (!scope.isInvalidated) return scope;
                if (!resolutionHost.getCompilationSettings().cacheResolutions || !scope.contents) return undefined;
                const packageJson = getPackageJsonLocationFromScope(scope)!;
                let result = packageJsons?.get(packageJson);
                if (result !== undefined) return result || undefined;
                if (resolutionHost.fileExists(packageJson)) {
                    result = {
                        contents: getPackageJsonInfo(
                            getDirectoryPath(packageJson),
                             /*onlyRecordFailures*/ false,
                            getTemporaryModuleResolutionState(moduleResolutionCache.getPackageJsonInfoCache(), resolutionHost.getCompilerHost?.() || resolutionHost, resolutionHost.getCompilationSettings())
                        )!.contents,
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
        perDirCache: PerDirectoryAndNonRelativeNameCache<T> | undefined,
        getResolvedFileName: (resolved: T) => string | undefined,
        fileCacheFromProgram: ModeAwareCache<T> | undefined,
        sourceFileOrPath: SourceFile | Path,
        perFileCache: PerFileCache<T>,
        getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>,
    ): PerDirectoryAndNonRelativeNameCache<T> | undefined {
        const path = !isString(sourceFileOrPath) ? sourceFileOrPath.path : sourceFileOrPath;
        let resolutionsInFile = perFileCache.get(path);
        const seenNamesInFile = createModeAwareCache<true>();
        perDirCache = toPerDirectoryAndNonRelativeNameCache(
            newProgram,
            perDirCache,
            getResolvedFileName,
            fileCacheFromProgram,
            sourceFileOrPath,
            redirectedReference => {
                const key = resolutionsInFile && getKeyIfOptionsChange(resolutionsInFile, newProgram.getCompilerOptions(), redirectedReference);
                if (resolutionsInFile && key) {
                    resolutionsInFile.cache.forEach(r => stopWatchingResolution(r, path, getResolutionWithResolvedFileName));
                    resolutionsInFile = undefined;
                }
                return key;
            },
            (resolution, name, mode, _dirPath, redirectedReference, key) => {
                seenNamesInFile.set(name, mode, true);
                const existing = resolutionsInFile?.cache.get(name, mode);
                if (existing && resolution !== existing) stopWatchingResolution(existing, path, getResolutionWithResolvedFileName);
                watchResolution(newProgram, name, resolution, path, getResolutionWithResolvedFileName);
                if (!resolutionsInFile) {
                    perFileCache.set(path, resolutionsInFile = {
                        cache: createModeAwareCache(),
                        options: redirectedReference?.commandLine.options || newProgram.getCompilerOptions(),
                        key,
                    });
                }
                resolutionsInFile.cache.set(name, mode, resolution);
            },
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
        modules: PerDirectoryAndNonRelativeNameCache<ResolvedModuleWithFailedLookupLocations> | undefined,
        typeRefs: PerDirectoryAndNonRelativeNameCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations> | undefined,
    ): OldModuleAndTypeRefCache | undefined {
        if (!modules && !typeRefs) return undefined;
        return {
            modules: {
                getResolved: (name, mode, dirPath, redirectedReference) => getResolvedWithOldCache(modules, name, mode, dirPath, redirectedReference)
            },
            typeRefs: {
                getResolved: (name, mode, dirPath, redirectedReference) => getResolvedWithOldCache(typeRefs, name, mode, dirPath, redirectedReference)
            },
        };
    }

    function getResolvedWithOldCache<T extends ResolutionWithFailedLookupLocations>(
        cache: PerDirectoryAndNonRelativeNameCache<T> | undefined,
        name: string,
        mode: ResolutionMode,
        dirPath: Path,
        redirectedReference: ResolvedProjectReference | undefined,
    ): T | undefined {
        if (!cache) return undefined;
        const result = cache.getFromCache(name, mode, dirPath, redirectedReference?.commandLine.options || resolutionHost.getCompilationSettings());
        return result && !result.isInvalidated ? result : undefined;
    }

    function resolveModuleName(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, redirectedReference?: ResolvedProjectReference, mode?: ResolutionMode): CachedResolvedModuleWithFailedLookupLocations {
        const host = resolutionHost.getCompilerHost?.() || resolutionHost;
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
                if (!compilerOptions.cacheResolutions) updateResolutionField(primaryResult.failedLookupLocations, failedLookupLocations);
                else primaryResult.failedLookupLocations = undefined;
                primaryResult.affectingLocations = updateResolutionField(primaryResult.affectingLocations, affectingLocations);
                primaryResult.resolutionDiagnostics = updateResolutionField(primaryResult.resolutionDiagnostics, resolutionDiagnostics);
                return primaryResult;
            }
        }

        // Default return the result from the first pass
        return primaryResult;
    }

    function createModuleResolutionLoader(
        containingFile: string,
        redirectedReference: ResolvedProjectReference | undefined,
        options: CompilerOptions,
    ): ResolutionLoader<StringLiteralLike, ResolvedModuleWithFailedLookupLocations, SourceFile> {
        return {
            nameAndMode: moduleResolutionNameAndModeGetter,
            resolve: (moduleName, resoluionMode) => resolveModuleName(
                moduleName,
                containingFile,
                options,
                redirectedReference,
                resoluionMode,
            ),
        };
    }

    function getKeyIfOptionsChange<T>(cacheEntry: PerFileCacheEntry<T>, options: CompilerOptions, redirectedReference: ResolvedProjectReference | undefined) {
        const optionsForEntry = redirectedReference?.commandLine.options || options;
        if (cacheEntry.options === optionsForEntry) return undefined;
        if (!cacheEntry.key) cacheEntry.key = createRedirectsCacheKey(cacheEntry.options);
        const key = createRedirectsCacheKey(optionsForEntry);
        return key === cacheEntry.key ? undefined : key;
    }

    interface ResolveNamesWithLocalCacheInput<Entry, SourceFile, T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName> {
        entries: readonly Entry[];
        containingFile: string;
        containingSourceFile: SourceFile;
        redirectedReference: ResolvedProjectReference | undefined;
        options: CompilerOptions;
        reusedNames?: readonly Entry[];
        perFileCache: PerFileCache<T>;
        loader: ResolutionLoader<Entry, T, SourceFile>;
        getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>;
        logChanges?: boolean;
    }
    function resolveNamesWithLocalCache<Entry, SourceFile, T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>({
        entries, containingFile, containingSourceFile, redirectedReference, options,
        perFileCache, reusedNames,
        loader, getResolutionWithResolvedFileName,
        logChanges,
    }: ResolveNamesWithLocalCacheInput<Entry, SourceFile, T, R>): readonly T[] {
        const path = resolutionHost.toPath(containingFile);
        let resolutionsInFile = perFileCache.get(path);
        const optionsForFile = redirectedReference?.commandLine.options || options;
        const key = resolutionsInFile && getKeyIfOptionsChange(resolutionsInFile, options, redirectedReference);
        if (!resolutionsInFile || key) {
            resolutionsInFile?.cache.forEach(r => stopWatchingResolution(r, path, getResolutionWithResolvedFileName));
            perFileCache.set(path, resolutionsInFile = { cache: createModeAwareCache(), options: optionsForFile, key });
        }
        const resolvedModules: T[] = [];
        const seenNamesInFile = createModeAwareCache<true>();
        for (const entry of entries) {
            const name = loader.nameAndMode.getName(entry);
            const mode = loader.nameAndMode.getMode(entry, containingSourceFile);
            let resolution = resolutionsInFile.cache.get(name, mode);
            if (!seenNamesInFile.has(name, mode)) {
                // Resolution is valid if it is present and not invalidated
                if (!resolution || resolution.isInvalidated) {
                    const existingResolution = resolution;
                    resolution = loader.resolve(name, mode);
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
                    if (isTraceEnabled(options, host) && !seenNamesInFile.has(name, mode)) {
                        const resolved = getResolutionWithResolvedFileName(resolution);
                        trace(
                            host,
                            perFileCache === resolvedModuleNames as unknown ?
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
            }
            Debug.assert(resolution !== undefined && !resolution.isInvalidated);
            seenNamesInFile.set(name, mode, true);
            resolvedModules.push(resolution);
        }
        reusedNames?.forEach(entry => seenNamesInFile.set(
            loader.nameAndMode.getName(entry),
            loader.nameAndMode.getMode(entry, containingSourceFile),
            true,
        ));
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

    function resolveTypeReferenceDirectiveReferences<T extends FileReference | string>(
        typeDirectiveReferences: readonly T[],
        containingFile: string,
        redirectedReference: ResolvedProjectReference | undefined,
        options: CompilerOptions,
        containingSourceFile: SourceFile | undefined,
        reusedNames: readonly T[] | undefined
    ): readonly ResolvedTypeReferenceDirectiveWithFailedLookupLocations[]{
        return resolveNamesWithLocalCache({
            entries: typeDirectiveReferences,
            containingFile,
            containingSourceFile,
            redirectedReference,
            options,
            reusedNames,
            perFileCache: resolvedTypeReferenceDirectives,
            loader: createTypeReferenceResolutionLoader(
                containingFile,
                redirectedReference,
                options,
                resolutionHost.getCompilerHost?.() || resolutionHost,
                typeReferenceDirectiveResolutionCache
            ),
            getResolutionWithResolvedFileName: getResolvedTypeReferenceDirective,
        });
    }

    function resolveModuleNameLiterals(
        moduleLiterals: readonly StringLiteralLike[],
        containingFile: string,
        redirectedReference: ResolvedProjectReference | undefined,
        options: CompilerOptions,
        containingSourceFile: SourceFile,
        reusedNames: readonly StringLiteralLike[] | undefined,
    ): readonly ResolvedModuleWithFailedLookupLocations[] {
        return resolveNamesWithLocalCache({
            entries: moduleLiterals,
            containingFile,
            containingSourceFile,
            redirectedReference,
            options,
            reusedNames,
            perFileCache: resolvedModuleNames,
            loader: createModuleResolutionLoader(
                containingFile,
                redirectedReference,
                options,
            ),
            getResolutionWithResolvedFileName: getResolvedModule,
            logChanges: logChangesWhenResolvingModule,
        });
    }

    function resolveSingleModuleNameWithoutWatching(moduleName: string, containingFile: string) {
        const path = resolutionHost.toPath(containingFile);
        const resolutionsInFile = resolvedModuleNames.get(path);
        const resolution = resolutionsInFile?.cache.get(moduleName, /*mode*/ undefined);
        if (resolution && !resolution.isInvalidated) return resolution;
        return resolveModuleName(moduleName, containingFile, resolutionHost.getCompilationSettings());
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
            const key = resolutionHost.toPath(resolved.resolvedFileName);
            let resolutions = resolvedFileToResolution.get(key);
            if (!resolutions) resolvedFileToResolution.set(key, resolutions = new Set());
            resolutions.add(resolution);
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
        if (!failedLookupLocations?.length || resolution.watchedFailed === failedLookupLocations.length) return;
        if (!resolution.watchedFailed) {
            resolutionsWithFailedLookups.add(resolution);
            // Remove resolution from only watching affected locations
            if (resolution.watchedAffected) resolutionsWithOnlyAffectingLocations.delete(resolution);
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
            setDirectoryWatcher(rootDir!, rootPath, /*nonRecursive*/ true); // TODO: GH#18217
        }
        resolution.setAtRoot = setAtRoot;
        resolution.watchedFailed = failedLookupLocations.length;
    }

    function watchAffectingLocationsOfResolution(resolution: ResolutionWithFailedLookupLocations) {
        const { affectingLocations } = resolution;
        if (!affectingLocations?.length || resolution.watchedAffected === affectingLocations.length) return;
        if (!resolution.watchedFailed && !resolution.watchedAffected) resolutionsWithOnlyAffectingLocations.add(resolution);
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
            const key = resolutionHost.toPath(resolved.resolvedFileName);
            const resolutions = resolvedFileToResolution.get(key);
            if (resolutions?.delete(resolution) && !resolutions.size) resolvedFileToResolution.delete(key);
        }

        if (resolution.watchedFailed) {
            resolutionsWithFailedLookups.delete(resolution);
            let removeAtRoot = false;
            for (let i = 0; i < resolution.watchedFailed; i++) {
                const failedLookupLocation = resolution.failedLookupLocations![i];
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
            resolution.watchedFailed = undefined;
            resolution.setAtRoot = undefined;
        }
        else if (resolution.watchedAffected) {
            resolutionsWithOnlyAffectingLocations.delete(resolution);
        }

        if (resolution.watchedAffected) {
            for (let i = 0; i < resolution.watchedAffected; i++) {
                const watcher = fileWatchesOfAffectingLocations.get(resolution.affectingLocations![i])!;
                watcher.resolutions--;
            }
            resolution.watchedAffected = undefined;
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
        removeResolutionsOfFileFromCache(resolvedModuleNames, filePath, getResolvedModule);
        removeResolutionsOfFileFromCache(resolvedTypeReferenceDirectives, filePath, getResolvedTypeReferenceDirective);
    }

    function invalidateResolutions(resolutions: Set<ResolutionWithFailedLookupLocations> | undefined, canInvalidate: (resolution: ResolutionWithFailedLookupLocations) => boolean | undefined) {
        if (!resolutions) return false;
        let invalidated = false;
        resolutions.forEach(resolution => {
            if (resolution.isInvalidated || !canInvalidate(resolution)) return;
            resolution.isInvalidated = invalidated = true;
            resolution.files?.forEach(containingFilePath => {
                (filesWithInvalidatedResolutions ??= new Set()).add(containingFilePath);
                // When its a file with inferred types resolution, invalidate type reference directive resolution
                hasChangedAutomaticTypeDirectiveNames = hasChangedAutomaticTypeDirectiveNames || endsWith(containingFilePath, inferredTypesContainingFile);
            });
        });
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

    function setFilesWithInvalidatedNonRelativeUnresolvedImports(filesMap: ReadonlyMap<Path, UnresolvedImports>) {
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
        return resolution.failedLookupLocations?.some(location => isInvalidatedFailedLookup(resolutionHost.toPath(location)));
    }

    function isInvalidatedFailedLookup(locationPath: Path) {
        return failedLookupChecks?.has(locationPath) ||
            firstDefinedIterator(startsWithPathChecks?.keys() || emptyIterator, fileOrDirectoryPath => startsWith(locationPath, fileOrDirectoryPath) ? true : undefined) ||
            firstDefinedIterator(isInDirectoryChecks?.keys() || emptyIterator, fileOrDirectoryPath => isInDirectoryPath(fileOrDirectoryPath, locationPath) ? true : undefined);
    }

    function canInvalidatedFailedLookupResolutionWithAffectingLocation(resolution: ResolutionWithFailedLookupLocations) {
        return !!affectingPathChecks && resolution.affectingLocations?.some(location => affectingPathChecks!.has(location));
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
