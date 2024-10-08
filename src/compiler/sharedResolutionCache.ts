import {
    clearMap,
    closeFileWatcherOf,
    CompilerOptions,
    createModuleResolutionCache,
    createTypeReferenceDirectiveResolutionCache,
    Debug,
    directorySeparator,
    endsWith,
    fileExtensionIs,
    FileWatcher,
    firstDefinedIterator,
    forEachKey,
    GetCanonicalFileName,
    getDirectoryPath,
    getNormalizedAbsolutePath,
    getOptionsForLibraryResolution,
    getPathComponents,
    getPathFromPathComponents,
    identity,
    ignoredPaths,
    isDiskPathRoot,
    isEmittedFileOfProgram,
    isNodeModulesDirectory,
    isResolvedWithGlobalCachePass,
    isResolvedWithGlobalCachePassButStillUnresolved,
    isRootedDiskPath,
    memoize,
    ModuleOrTypeReferenceResolutionCache,
    ModuleResolutionCache,
    noopFileWatcher,
    normalizePath,
    parseNodeModuleFromPath,
    Path,
    PathPathComponents,
    removeSuffix,
    ResolutionCache,
    ResolutionWithResolvedFileName,
    ResolvedModuleWithFailedLookupLocations,
    ResolvedProjectReference,
    ResolvedTypeReferenceDirectiveWithFailedLookupLocations,
    returnTrue,
    RootDirInfo,
    some,
    startsWith,
    tryAddToSet,
    TypeReferenceDirectiveResolutionCache,
    TypeRootsCacheKeyOrSpecifiedTypeRoots,
    WatchDirectoryFlags,
} from "./_namespaces/ts.js";

declare module "./_namespaces/ts.js" {
    /** @internal */
    export interface ModuleOrTypeReferenceResolutionCache<T> {
        sharedCache?: ModuleOrTypeReferenceResolutionCache<T>;
    }
}

/** @internal */
export interface CacheToOptionsEntry {
    availableOptions: Set<CompilerOptions>;
    availableTypeCacheKeys: Map<CompilerOptions, Set<TypeRootsCacheKeyOrSpecifiedTypeRoots>>;
}

/**
 * This is the cache of module/typedirectives resolution that are shared across projects
 *
 * @internal
 */
export interface SharedResolutionCache {
    sharedCacheHost: SharedResolutionCacheHost;
    moduleResolutionCache: ModuleResolutionCache;
    typeReferenceDirectiveResolutionCache: TypeReferenceDirectiveResolutionCache;
    libraryResolutionCache: ModuleResolutionCache;
    resolvedFileToResolution: Map<Path, Set<ResolutionWithFailedLookupLocations>>;
    resolutionsWithFailedLookups: Set<ResolutionWithFailedLookupLocations>;
    packageJsonRefCount: Map<Path, number>;
    resolutionsWithOnlyAffectingLocations: Set<ResolutionWithFailedLookupLocations>;
    watchedResolutionInfoMap: Map<ResolutionWithFailedLookupLocations, WatchedResolutionInfo>;
    typeRootsWatches: Map<string, TypeRootWatch>;
    inUseResolutionCaches: RefCountCache;
    cacheToOptions: Map<ResolutionCache, CacheToOptionsEntry>;
    directoryWatchesOfFailedLookups: Map<Path, DirectoryWatchesOfFailedLookup>;
    nonRecursiveDirectoryWatchesOfFailedLookups: Map<Path, DirectoryWatchesOfFailedLookup>;
    fileWatchesOfAffectingLocations: Map<string, FileWatcherOfAffectingLocation>;
    packageDirWatchers: Map<Path, PackageDirWatcher>;
    dirPathToSymlinkPackageRefCount: Map<Path, number>;

    clear(cache: ResolutionCache): void;
    startCachingPerDirectoryResolution(cache: ResolutionCache): void;
    finishCachingPerDirectoryResolution(): void;
    compactCaches(
        availableOptions: Set<CompilerOptions>,
        availableTypeCacheKeys: Map<CompilerOptions, Set<TypeRootsCacheKeyOrSpecifiedTypeRoots>>,
        cache: ResolutionCache,
    ): void;

    watchResolution<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>(
        resolution: T,
        getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>,
        redirectedReference: ResolvedProjectReference | undefined,
    ): void;
    releaseResolution(
        resolution: ResolutionWithFailedLookupLocations,
        moduleOrTypeRefCache: ModuleOrTypeReferenceResolutionCache<ResolutionWithFailedLookupLocations>,
    ): void;

    createFileWatcherOfAffectingLocation(affectingLocation: string): void;
    releaseFileWatcherOfAffectingLocation(location: string): void;
    closeFileWatcherOfAffectingLocation(path: string): void;
    addToPotentiallyUnwatchedPackageJsons(location: string): void;

    invalidateResolutionsOfFailedLookupLocations(): boolean;
    invalidateResolutionOfFile(filePath: Path): boolean;
    invalidateResolution(
        resolution: ResolutionWithFailedLookupLocations,
        canInvalidate: (resolution: ResolutionWithFailedLookupLocations) => boolean | undefined,
    ): void;

    createTypeRootsWatch(typeRoot: string, cache: ResolutionCache): FileWatcher;
    currentCache(): ResolutionCache | undefined;
}

/** @internal */
export interface WatchedResolutionInfo {
    isInvalidated?: boolean;
    // Files that have this resolution using
    caches: Set<ResolutionCache>;
    watchedFailed?: number;
    watchedAffected?: number;
    dirWatches?: Set<Path>;
    nonRecursiveDirWatches?: Set<Path>;
    packageDirWatchers?: Map<Path, Set<Path>>;
    rootDirInfo?: RootDirInfo;
}

/** @internal */
export type ResolutionWithFailedLookupLocations =
    | ResolvedModuleWithFailedLookupLocations
    | (
        & ResolvedTypeReferenceDirectiveWithFailedLookupLocations
        // Just so we can use this directly. These any ways are optional properties
        & Pick<ResolvedModuleWithFailedLookupLocations, "alternateResult" | "globalCacheResolution">
    );

/** @internal */
export interface SharedResolutionCacheHost {
    getCurrentDirectory(): string;
    toPath(fileName: string): Path;
    getCanonicalFileName: GetCanonicalFileName;
    preferNonRecursiveWatch: boolean | undefined;
    fileIsOpen(filePath: Path): boolean;
}

/** @internal */
export type RefCountCache = Map<ResolutionCache, number>;

/** @internal */
export interface FileWatcherOfAffectingLocation {
    /** watcher for the lookup */
    watcher: FileWatcher;
    resolutions: RefCountCache | undefined;
    files: RefCountCache | undefined;
    symlinks: Set<string> | undefined;
}

/** @internal */
export interface DirectoryWatchesOfFailedLookup {
    /** watcher for the lookup */
    watcher: FileWatcher;
    /** ref count keeping this watch alive */
    refCount: RefCountCache;
}
/** @internal */
export interface DirPathToWatcherOfPackageDirWatcher {
    watcher: DirectoryWatchesOfFailedLookup;
    refCount: RefCountCache;
}
/** @internal */
export interface PackageDirWatcher {
    dirPathToWatcher: Map<Path, DirPathToWatcherOfPackageDirWatcher>;
    isSymlink: boolean;
}
/** @internal */
export interface TypeRootWatch {
    watcher: FileWatcher;
    refCount: Set<ResolutionCache>;
}

/** @internal */
export interface DirectoryOfFailedLookupWatch {
    dir: string;
    dirPath: Path;
    nonRecursive?: boolean;
    packageDir?: string;
    packageDirPath?: Path;
}

/** @internal */
export function removeIgnoredPath(path: Path): Path | undefined {
    // Consider whole staging folder as if node_modules changed.
    if (endsWith(path, "/node_modules/.staging")) {
        return removeSuffix(path, "/.staging") as Path;
    }

    return some(ignoredPaths, searchPath => path.includes(searchPath)) ?
        undefined :
        path;
}

function perceivedOsRootLengthForWatching(pathComponents: Readonly<PathPathComponents>, length: number) {
    // Ignore "/", "c:/"
    if (length <= 1) return 1;
    let indexAfterOsRoot = 1;
    let isDosStyle = pathComponents[0].search(/[a-z]:/i) === 0;
    if (
        pathComponents[0] !== directorySeparator &&
        !isDosStyle && // Non dos style paths
        pathComponents[1].search(/[a-z]\$$/i) === 0 // Dos style nextPart
    ) {
        // ignore "//vda1cs4850/c$/folderAtRoot"
        if (length === 2) return 2;
        indexAfterOsRoot = 2;
        isDosStyle = true;
    }

    if (
        isDosStyle &&
        !pathComponents[indexAfterOsRoot].match(/^users$/i)
    ) {
        // Paths like c:/notUsers
        return indexAfterOsRoot;
    }

    if (pathComponents[indexAfterOsRoot].match(/^workspaces$/i)) {
        // Paths like: /workspaces as codespaces hoist the repos in /workspaces so we have to exempt these from "2" level from root rule
        return indexAfterOsRoot + 1;
    }

    // Paths like: c:/users/username or /home/username
    return indexAfterOsRoot + 2;
}

/**
 * Filter out paths like
 * "/", "/user", "/user/username", "/user/username/folderAtRoot",
 * "c:/", "c:/users", "c:/users/username", "c:/users/username/folderAtRoot", "c:/folderAtRoot"
 * @param dirPath
 *
 * @internal
 */
export function canWatchDirectoryOrFile(pathComponents: Readonly<PathPathComponents>, length?: number): boolean {
    if (length === undefined) length = pathComponents.length;
    // Ignore "/", "c:/"
    // ignore "/user", "c:/users" or "c:/folderAtRoot"
    if (length <= 2) return false;
    const perceivedOsRootLength = perceivedOsRootLengthForWatching(pathComponents, length);
    return length > perceivedOsRootLength + 1;
}

/** @internal */
export function canWatchDirectoryOrFilePath(path: Path): boolean {
    return canWatchDirectoryOrFile(getPathComponents(path));
}

/** @internal */
export function canWatchAtTypes(atTypes: Path): boolean {
    // Otherwise can watch directory only if we can watch the parent directory of node_modules/@types
    return canWatchAffectedPackageJsonOrNodeModulesOfAtTypes(getDirectoryPath(atTypes));
}

function isInDirectoryPath(dirComponents: Readonly<PathPathComponents>, fileOrDirComponents: Readonly<PathPathComponents>) {
    if (fileOrDirComponents.length < fileOrDirComponents.length) return false;
    for (let i = 0; i < dirComponents.length; i++) {
        if (fileOrDirComponents[i] !== dirComponents[i]) return false;
    }
    return true;
}

function canWatchAffectedPackageJsonOrNodeModulesOfAtTypes(fileOrDirPath: Path) {
    return canWatchDirectoryOrFilePath(fileOrDirPath);
}

/** @internal */
export function canWatchAffectingLocation(filePath: Path): boolean {
    return canWatchAffectedPackageJsonOrNodeModulesOfAtTypes(filePath);
}

/** @internal */
export function getDirectoryToWatchFailedLookupLocation(
    failedLookupLocation: string,
    failedLookupLocationPath: Path,
    rootDir: string,
    rootPath: Path,
    rootPathComponents: Readonly<PathPathComponents>,
    isRootWatchable: boolean,
    getCurrentDirectory: () => string | undefined,
    preferNonRecursiveWatch: boolean | undefined,
): DirectoryOfFailedLookupWatch | undefined {
    const failedLookupPathComponents: Readonly<PathPathComponents> = getPathComponents(failedLookupLocationPath);
    // Ensure failed look up is normalized path
    failedLookupLocation = isRootedDiskPath(failedLookupLocation) ? normalizePath(failedLookupLocation) : getNormalizedAbsolutePath(failedLookupLocation, getCurrentDirectory());
    const failedLookupComponents: readonly string[] = getPathComponents(failedLookupLocation);
    const perceivedOsRootLength = perceivedOsRootLengthForWatching(failedLookupPathComponents, failedLookupPathComponents.length);
    if (failedLookupPathComponents.length <= perceivedOsRootLength + 1) return undefined;
    // If directory path contains node module, get the most parent node_modules directory for watching
    const nodeModulesIndex = failedLookupPathComponents.indexOf("node_modules" as Path);
    if (nodeModulesIndex !== -1 && nodeModulesIndex + 1 <= perceivedOsRootLength + 1) return undefined; // node_modules not at position where it can be watched
    const lastNodeModulesIndex = failedLookupPathComponents.lastIndexOf("node_modules" as Path);
    if (isRootWatchable && isInDirectoryPath(rootPathComponents, failedLookupPathComponents)) {
        if (failedLookupPathComponents.length > rootPathComponents.length + 1) {
            // Instead of watching root, watch directory in root to avoid watching excluded directories not needed for module resolution
            return getDirectoryOfFailedLookupWatch(
                failedLookupComponents,
                failedLookupPathComponents,
                Math.max(rootPathComponents.length + 1, perceivedOsRootLength + 1),
                lastNodeModulesIndex,
            );
        }
        else {
            // Always watch root directory non recursively
            return {
                dir: rootDir,
                dirPath: rootPath,
                nonRecursive: true,
            };
        }
    }

    return getDirectoryToWatchFromFailedLookupLocationDirectory(
        failedLookupComponents,
        failedLookupPathComponents,
        failedLookupPathComponents.length - 1,
        perceivedOsRootLength,
        nodeModulesIndex,
        rootPathComponents,
        lastNodeModulesIndex,
        preferNonRecursiveWatch,
    );
}

function getDirectoryToWatchFromFailedLookupLocationDirectory(
    dirComponents: readonly string[],
    dirPathComponents: Readonly<PathPathComponents>,
    dirPathComponentsLength: number,
    perceivedOsRootLength: number,
    nodeModulesIndex: number,
    rootPathComponents: Readonly<PathPathComponents>,
    lastNodeModulesIndex: number,
    preferNonRecursiveWatch: boolean | undefined,
): DirectoryOfFailedLookupWatch | undefined {
    // If directory path contains node module, get the most parent node_modules directory for watching
    if (nodeModulesIndex !== -1) {
        // If the directory is node_modules use it to watch, always watch it recursively
        return getDirectoryOfFailedLookupWatch(
            dirComponents,
            dirPathComponents,
            nodeModulesIndex + 1,
            lastNodeModulesIndex,
        );
    }

    // Use some ancestor of the root directory
    let nonRecursive = true;
    let length = dirPathComponentsLength;
    if (!preferNonRecursiveWatch) {
        for (let i = 0; i < dirPathComponentsLength; i++) {
            if (dirPathComponents[i] !== rootPathComponents[i]) {
                nonRecursive = false;
                length = Math.max(i + 1, perceivedOsRootLength + 1);
                break;
            }
        }
    }
    return getDirectoryOfFailedLookupWatch(
        dirComponents,
        dirPathComponents,
        length,
        lastNodeModulesIndex,
        nonRecursive,
    );
}

function getDirectoryOfFailedLookupWatch(
    dirComponents: readonly string[],
    dirPathComponents: Readonly<PathPathComponents>,
    length: number,
    lastNodeModulesIndex: number,
    nonRecursive?: boolean,
): DirectoryOfFailedLookupWatch {
    let packageDirLength;
    if (lastNodeModulesIndex !== -1 && lastNodeModulesIndex + 1 >= length && lastNodeModulesIndex + 2 < dirPathComponents.length) {
        if (!startsWith(dirPathComponents[lastNodeModulesIndex + 1], "@")) {
            packageDirLength = lastNodeModulesIndex + 2;
        }
        else if (lastNodeModulesIndex + 3 < dirPathComponents.length) {
            packageDirLength = lastNodeModulesIndex + 3;
        }
    }
    return {
        dir: getPathFromPathComponents(dirComponents, length),
        dirPath: getPathFromPathComponents(dirPathComponents, length),
        nonRecursive,
        packageDir: packageDirLength !== undefined ? getPathFromPathComponents(dirComponents, packageDirLength) : undefined,
        packageDirPath: packageDirLength !== undefined ? getPathFromPathComponents(dirPathComponents, packageDirLength) : undefined,
    };
}

/** @internal */
export type GetResolutionWithResolvedFileName<T extends ResolutionWithFailedLookupLocations = ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName = ResolutionWithResolvedFileName> = (resolution: T) => R | undefined;

function getModuleOrTypeRefResolved(resolution: ResolutionWithFailedLookupLocations) {
    return (resolution as ResolvedModuleWithFailedLookupLocations).resolvedModule ??
        (resolution as ResolvedTypeReferenceDirectiveWithFailedLookupLocations).resolvedTypeReferenceDirective;
}

/** @internal */
export function createSharedResolutionCache(sharedCacheHost: SharedResolutionCacheHost): SharedResolutionCache {
    const resolutionsWithFailedLookups = new Set<ResolutionWithFailedLookupLocations>();
    const resolutionsWithOnlyAffectingLocations = new Set<ResolutionWithFailedLookupLocations>();
    const resolvedFileToResolution = new Map<Path, Set<ResolutionWithFailedLookupLocations>>();
    const impliedFormatPackageJsons = new Map<Path, readonly string[]>();
    const watchedResolutionInfoMap = new Map<ResolutionWithFailedLookupLocations, WatchedResolutionInfo>();
    const typeRootsWatches = new Map<string, TypeRootWatch>();
    const inUseResolutionCaches = new Map<ResolutionCache, number>();
    const cacheToOptions = new Map<ResolutionCache, CacheToOptionsEntry>();

    let affectingPathChecks: Set<string> | undefined;
    let failedLookupChecks: Set<Path> | undefined;
    let startsWithPathChecks: Set<Path> | undefined;
    let isInDirectoryChecks: Set<Path> | undefined;

    let cachesNeedingGc: Set<ModuleOrTypeReferenceResolutionCache<ResolutionWithFailedLookupLocations>> | undefined;
    let potentiallyUnreferencedDirWatchers: Set<Path> | undefined;
    let considerNonWatchedResolutionAsInvalidated = false;

    const getCurrentDirectory = memoize(() => sharedCacheHost.getCurrentDirectory());

    const moduleResolutionCache = createModuleResolutionCache(
        getCurrentDirectory(),
        sharedCacheHost.getCanonicalFileName,
        /*options*/ undefined,
        /*packageJsonInfoCache*/ undefined,
        /*optionsToRedirectsKey*/ undefined,
        getValidModuleResolution,
    );

    const typeReferenceDirectiveResolutionCache: TypeReferenceDirectiveResolutionCache = createTypeReferenceDirectiveResolutionCache(
        getCurrentDirectory(),
        sharedCacheHost.getCanonicalFileName,
        /*options*/ undefined,
        moduleResolutionCache.getPackageJsonInfoCache(),
        moduleResolutionCache.optionsToRedirectsKey,
        getValidResolution,
    );

    const libraryResolutionCache = createModuleResolutionCache(
        getCurrentDirectory(),
        sharedCacheHost.getCanonicalFileName,
        getOptionsForLibraryResolution(/*options*/ undefined),
        moduleResolutionCache.getPackageJsonInfoCache(),
        /*optionsToRedirectsKey*/ undefined,
        getValidResolution,
    );

    const packageJsonRefCount = new Map<Path, number>();
    let potentiallyUnwatchedPackageJsons: Set<Path> | undefined;
    const directoryWatchesOfFailedLookups = new Map<Path, DirectoryWatchesOfFailedLookup>();
    const nonRecursiveDirectoryWatchesOfFailedLookups = new Map<Path, DirectoryWatchesOfFailedLookup>();
    const fileWatchesOfAffectingLocations = new Map<string, FileWatcherOfAffectingLocation>();

    const isSymlinkCache = new Map<Path, boolean>();
    const packageDirWatchers = new Map<Path, PackageDirWatcher>(); // Watching packageDir if symlink otherwise watching dirPath
    const dirPathToSymlinkPackageRefCount = new Map<Path, number>(); // Refcount for dirPath watches when watching symlinked packageDir

    let currentCache: ResolutionCache | undefined;

    return {
        sharedCacheHost,
        moduleResolutionCache,
        typeReferenceDirectiveResolutionCache,
        libraryResolutionCache,
        resolvedFileToResolution,
        resolutionsWithFailedLookups,
        resolutionsWithOnlyAffectingLocations,
        packageJsonRefCount,
        watchedResolutionInfoMap,
        typeRootsWatches,
        inUseResolutionCaches,
        cacheToOptions,
        directoryWatchesOfFailedLookups,
        nonRecursiveDirectoryWatchesOfFailedLookups,
        fileWatchesOfAffectingLocations,
        packageDirWatchers,
        dirPathToSymlinkPackageRefCount,

        clear,
        startCachingPerDirectoryResolution,
        finishCachingPerDirectoryResolution,
        compactCaches,

        watchResolution,
        releaseResolution,

        createFileWatcherOfAffectingLocation,
        releaseFileWatcherOfAffectingLocation,
        closeFileWatcherOfAffectingLocation,
        addToPotentiallyUnwatchedPackageJsons,

        invalidateResolutionsOfFailedLookupLocations,
        invalidateResolutionOfFile,
        invalidateResolution,

        createTypeRootsWatch,
        currentCache: () => currentCache,
    };

    function clearForCache(cache: ResolutionCache) {
        let gcCaches = false;
        currentCache = cache;
        watchedResolutionInfoMap.forEach((watchedResolutionInfo, resolution) => {
            if (watchedResolutionInfo.caches.has(cache)) {
                gcCaches = releaseResolution(resolution, /*moduleOrTypeRefCache*/ undefined) || gcCaches;
            }
        });
        fileWatchesOfAffectingLocations.forEach((watcher, location) => {
            if (watcher.files?.delete(cache)) closeFileWatcherOfAffectingLocation(location, watcher);
        });
        // Skip handling typeRoots as they would be cleared before calling this method
        inUseResolutionCaches.delete(cache);
        if (gcCaches) {
            gcModuleOrTypeRefCache(moduleResolutionCache);
            gcModuleOrTypeRefCache(typeReferenceDirectiveResolutionCache);
            gcModuleOrTypeRefCache(libraryResolutionCache);
        }
        currentCache = undefined;
        if (cacheToOptions.delete(cache)) compactCachesWoker();
    }

    function clear(cache: ResolutionCache) {
        if (!inUseResolutionCaches.has(cache)) return;
        if (inUseResolutionCaches.size !== 1) return clearForCache(cache);
        currentCache = undefined;
        inUseResolutionCaches.clear();
        cacheToOptions.clear();
        cachesNeedingGc = undefined;
        potentiallyUnwatchedPackageJsons = undefined;
        clearMap(directoryWatchesOfFailedLookups, closeFileWatcherOf);
        clearMap(nonRecursiveDirectoryWatchesOfFailedLookups, closeFileWatcherOf);
        clearMap(fileWatchesOfAffectingLocations, closeFileWatcherOf);
        clearMap(typeRootsWatches, closeFileWatcherOf);
        packageJsonRefCount.clear();
        isSymlinkCache.clear();
        packageDirWatchers.clear();
        dirPathToSymlinkPackageRefCount.clear();
        resolvedFileToResolution.clear();
        resolutionsWithFailedLookups.clear();
        resolutionsWithOnlyAffectingLocations.clear();
        watchedResolutionInfoMap.clear();
        failedLookupChecks = undefined;
        startsWithPathChecks = undefined;
        isInDirectoryChecks = undefined;
        affectingPathChecks = undefined;
        moduleResolutionCache.clear();
        typeReferenceDirectiveResolutionCache.clear();
        libraryResolutionCache.clear();
        impliedFormatPackageJsons.clear();
    }

    function startCachingPerDirectoryResolution(cache: ResolutionCache) {
        currentCache = cache;
        moduleResolutionCache.isReadonly = undefined;
        typeReferenceDirectiveResolutionCache.isReadonly = undefined;
        libraryResolutionCache.isReadonly = undefined;
        moduleResolutionCache.getPackageJsonInfoCache().isReadonly = undefined;
        isSymlinkCache.clear();
    }

    function finishCachingPerDirectoryResolution() {
        // These are only dir watchers that were potentially removed because packageDir symlink status changed while watching resolutions
        potentiallyUnreferencedDirWatchers?.forEach(path =>
            closeDirectoryWatchesOfFailedLookup(
                getDirectoryWatchesOfFailedLookup(path, /*nonRecursive*/ false),
                path,
                /*nonRecursive*/ false,
            )
        );
        potentiallyUnreferencedDirWatchers = undefined;
        cachesNeedingGc?.forEach(gcModuleOrTypeRefCache);
        cachesNeedingGc = undefined;
        potentiallyUnwatchedPackageJsons?.forEach(releasePotentiallyUnwatchedPackageJson);
        potentiallyUnwatchedPackageJsons = undefined;
        moduleResolutionCache.isReadonly = true;
        typeReferenceDirectiveResolutionCache.isReadonly = true;
        libraryResolutionCache.isReadonly = true;
        moduleResolutionCache.getPackageJsonInfoCache().isReadonly = true;
        isSymlinkCache.clear();
        currentCache = undefined;
    }

    function compactCaches(
        availableOptions: Set<CompilerOptions>,
        availableTypeCacheKeys: Map<CompilerOptions, Set<TypeRootsCacheKeyOrSpecifiedTypeRoots>>,
        cache: ResolutionCache,
    ) {
        if (availableOptions.size) cacheToOptions.set(cache, { availableOptions, availableTypeCacheKeys });
        else cacheToOptions.delete(cache);
        compactCachesWoker();
    }

    function compactCachesWoker() {
        let availableOptions: Set<CompilerOptions>;
        let availableTypeCacheKeys: Map<CompilerOptions, Set<TypeRootsCacheKeyOrSpecifiedTypeRoots>>;
        if (cacheToOptions.size === 1) {
            ({ availableOptions, availableTypeCacheKeys } = firstDefinedIterator(cacheToOptions.values(), identity)!);
        }
        else {
            availableOptions = new Set();
            availableTypeCacheKeys = new Map();
            cacheToOptions.forEach(entry => {
                entry.availableOptions.forEach(options => availableOptions.add(options));
                entry.availableTypeCacheKeys.forEach((keys, options) => {
                    const existing = availableTypeCacheKeys.get(options);
                    if (existing) keys.forEach(key => existing.add(key));
                    else availableTypeCacheKeys.set(options, new Set(keys));
                });
            });
        }
        moduleResolutionCache.compact(availableOptions, /*skipOptionsToRedirectsKeyCleanup*/ true);
        typeReferenceDirectiveResolutionCache.compact(availableOptions, /*skipOptionsToRedirectsKeyCleanup*/ false, availableTypeCacheKeys);
        libraryResolutionCache.compact();
    }

    function gcModuleOrTypeRefCache(
        cache: ModuleOrTypeReferenceResolutionCache<ResolutionWithFailedLookupLocations>,
    ) {
        considerNonWatchedResolutionAsInvalidated = true;
        cache.gc(watchedResolutionInfoMap);
        considerNonWatchedResolutionAsInvalidated = false;
    }

    function getValidResolution<T extends ResolutionWithFailedLookupLocations>(resolution: T | undefined) {
        return isInvalidatedResolution(resolution) ? undefined : resolution;
    }

    function getValidModuleResolution(resolution: ResolvedModuleWithFailedLookupLocations | undefined, forSet?: boolean) {
        resolution = getValidResolution(resolution);
        return resolution && (
            forSet ?
                resolution.globalCacheResolution && isInvalidatedResolution(resolution.globalCacheResolution.globalResult) ?
                    undefined :
                    resolution :
                currentCache?.resolutionHost.getGlobalTypingsCacheLocation?.() && resolution?.globalCacheResolution?.globalResult ?
                currentCache.getValidResolution(resolution.globalCacheResolution.globalResult) :
                resolution
        );
    }

    function isInvalidatedResolution(resolution: ResolutionWithFailedLookupLocations | undefined) {
        return !resolution ||
            (considerNonWatchedResolutionAsInvalidated && !watchedResolutionInfoMap.has(resolution)) ||
            watchedResolutionInfoMap.get(resolution)?.isInvalidated;
    }

    function isNodeModulesAtTypesDirectory(dirPath: Path) {
        return endsWith(dirPath, "/node_modules/@types");
    }

    function watchResolution<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>(
        resolution: T,
        getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>,
        redirectedReference: ResolvedProjectReference | undefined,
    ) {
        let watchedResolutionInfo = watchedResolutionInfoMap.get(resolution);
        if (!watchedResolutionInfo?.caches.has(currentCache!)) addRefCountToCacheMap(inUseResolutionCaches, currentCache!);
        if (!watchedResolutionInfo?.caches.size) {
            if (!watchedResolutionInfo) {
                watchedResolutionInfoMap.set(resolution, watchedResolutionInfo = { caches: new Set() });
                if (isResolvedWithGlobalCachePass(resolution) && !watchedResolutionInfoMap.has(resolution.globalCacheResolution.primary)) {
                    watchedResolutionInfoMap.set(resolution.globalCacheResolution.primary, { caches: new Set() });
                }
            }
            if (isResolvedWithGlobalCachePassButStillUnresolved(resolution)) {
                // Add to potentially unreferenced resolutions
                resolution.globalCacheResolution.globalResolution.failedLookupLocations?.forEach(
                    addToPotentiallyUnwatchedPackageJsonsIfPackageJson,
                );
                if (resolution.globalCacheResolution.globalResolution.alternateResult) addToPotentiallyUnwatchedPackageJsonsIfPackageJson(resolution.globalCacheResolution.globalResolution.alternateResult);
                resolution.globalCacheResolution.globalResolution.affectingLocations?.forEach(addToPotentiallyUnwatchedPackageJsons);
            }
            const resolved = getResolutionWithResolvedFileName(resolution);
            if (resolved && resolved.resolvedFileName) {
                const key = sharedCacheHost.toPath(resolved.resolvedFileName);
                let resolutions = resolvedFileToResolution.get(key);
                if (!resolutions) resolvedFileToResolution.set(key, resolutions = new Set());
                resolutions.add(resolution);
            }
        }
        watchFailedLookupLocationOfResolution(resolution, redirectedReference, watchedResolutionInfo);
        watchAffectingLocationsOfResolution(resolution, watchedResolutionInfo);
        watchedResolutionInfo.caches.add(currentCache!);
        // If this resolution is primary
        if (isResolvedWithGlobalCachePass(resolution)) {
            // Update to global cache pass resolution
            watchPrimaryOrGlobalResultFailedAndAffectedLookups(resolution.globalCacheResolution.primary);
        }
        else if (resolution.globalCacheResolution?.globalResult) {
            // Update to global cache pass resolution
            watchPrimaryOrGlobalResultFailedAndAffectedLookups(resolution.globalCacheResolution.globalResult);
        }
    }

    function watchPrimaryOrGlobalResultFailedAndAffectedLookups(primaryOrGlobalResult: ResolvedModuleWithFailedLookupLocations) {
        const watchInfo = watchedResolutionInfoMap.get(primaryOrGlobalResult);
        if (!watchInfo?.caches.size) return;
        const first = firstDefinedIterator(watchInfo.caches, identity)!;
        const savedCurrentCache = currentCache;
        currentCache = first;
        watchFailedLookupLocationOfResolution(primaryOrGlobalResult, /*redirectedReference*/ undefined, watchInfo);
        watchAffectingLocationsOfResolution(primaryOrGlobalResult, watchInfo);
        currentCache = savedCurrentCache;
    }

    function watchFailedLookupLocation(
        failedLookupLocation: string,
        resolution: ResolutionWithFailedLookupLocations,
        redirectedReference: ResolvedProjectReference | undefined,
        watchedResolutionInfo: WatchedResolutionInfo,
    ) {
        watchedResolutionInfo.rootDirInfo ??= currentCache!.getRootDirInfoForResolution(redirectedReference, resolution);
        const failedLookupLocationPath = sharedCacheHost.toPath(failedLookupLocation);
        if (endsWith(failedLookupLocationPath, "/package.json")) addRefToPackageJson(failedLookupLocationPath);
        const toWatch = getDirectoryToWatchFailedLookupLocation(
            failedLookupLocation,
            failedLookupLocationPath,
            watchedResolutionInfo.rootDirInfo.rootDir,
            watchedResolutionInfo.rootDirInfo.rootPath,
            watchedResolutionInfo.rootDirInfo.rootPathComponents,
            watchedResolutionInfo.rootDirInfo.canWatch,
            getCurrentDirectory,
            sharedCacheHost.preferNonRecursiveWatch,
        );
        if (!toWatch) return;
        const { dir, dirPath, nonRecursive, packageDir, packageDirPath } = toWatch;

        if (!packageDirPath || !currentCache!.resolutionHost.realpath) {
            if (!(!nonRecursive ? watchedResolutionInfo.dirWatches : watchedResolutionInfo.nonRecursiveDirWatches)?.has(dirPath)) {
                const dirWatcher = createOrAddRefToDirectoryWatchOfFailedLookups(dir, dirPath, nonRecursive, currentCache!);
                (!nonRecursive ? watchedResolutionInfo.dirWatches ??= new Set() : watchedResolutionInfo.nonRecursiveDirWatches ??= new Set()).add(dirPath);
                addRefCountToMapForCaches(dirWatcher.refCount, watchedResolutionInfo.caches, currentCache);
            }
        }
        else {
            Debug.assert(!nonRecursive);
            const forDirPath = watchedResolutionInfo.packageDirWatchers?.get(packageDirPath);
            if (!forDirPath?.has(dirPath)) {
                const packageDirWatcher = createDirectoryWatcherForPackageDir(dir, dirPath, packageDir!, packageDirPath);
                if (forDirPath) forDirPath.add(dirPath);
                else (watchedResolutionInfo.packageDirWatchers ??= new Map()).set(packageDirPath, new Set([dirPath]));
                forRefCountCaches(watchedResolutionInfo.caches, cache => addRefToDirPathWatcherOfPackageDir(packageDirWatcher, dirPath, cache), currentCache);
            }
        }
    }

    function addRefToPackageJson(path: Path) {
        addRefCountToCacheMap(packageJsonRefCount, path);
    }

    function releasePackageJsonCachePath(path: Path) {
        moduleResolutionCache.getPackageJsonInfoCache().getInternalMap()?.delete(path);
        packageJsonRefCount.delete(path);
    }

    function addToPotentiallyUnwatchedPackageJsons(location: string) {
        (potentiallyUnwatchedPackageJsons ??= new Set()).add(sharedCacheHost.toPath(location));
    }

    function addToPotentiallyUnwatchedPackageJsonsIfPackageJson(location: string) {
        if (endsWith(location, "/package.json")) addToPotentiallyUnwatchedPackageJsons(location);
    }

    function releasePotentiallyUnwatchedPackageJson(path: Path) {
        if (!packageJsonRefCount.has(path)) moduleResolutionCache.getPackageJsonInfoCache().getInternalMap()?.delete(path);
    }

    function releasePackageJson(path: Path) {
        const existing = packageJsonRefCount.get(path)!;
        if (existing !== 1) packageJsonRefCount.set(path, existing - 1);
        else releasePackageJsonCachePath(path);
    }

    function releaseIfPackageJson(failedLookupLocation: string) {
        if (endsWith(failedLookupLocation, "/package.json")) releasePackageJson(sharedCacheHost.toPath(failedLookupLocation));
    }

    function watchFailedLookupLocationOfResolution(
        resolution: ResolutionWithFailedLookupLocations,
        redirectedReference: ResolvedProjectReference | undefined,
        watchedResolutionInfo: WatchedResolutionInfo,
    ) {
        // Existing watches need to be ref counted for this cache
        if (!watchedResolutionInfo.caches.has(currentCache!)) {
            watchedResolutionInfo.dirWatches?.forEach(dirPath => addRefCountToCacheMap(getDirectoryWatchesOfFailedLookup(dirPath, /*nonRecursive*/ false)!.refCount, currentCache!));
            watchedResolutionInfo.nonRecursiveDirWatches?.forEach(dirPath => addRefCountToCacheMap(getDirectoryWatchesOfFailedLookup(dirPath, /*nonRecursive*/ true)!.refCount, currentCache!));
            watchedResolutionInfo.packageDirWatchers?.forEach((dirPaths, packageDirPath) => {
                const packageDirWatcher = packageDirWatchers.get(packageDirPath)!;
                dirPaths.forEach(dirPath => addRefToDirPathWatcherOfPackageDir(packageDirWatcher, dirPath, currentCache!));
            });
        }

        // There have to be failed lookup locations if there is alternateResult so storing failedLookupLocation length is good enough,
        // alternateResult doesnt change later only failed lookup locations get added on
        if (watchedResolutionInfo.watchedFailed === resolution.failedLookupLocations?.length) return;
        if (!watchedResolutionInfo.watchedFailed) {
            resolutionsWithFailedLookups.add(resolution);
            if (watchedResolutionInfo.watchedAffected) resolutionsWithOnlyAffectingLocations.delete(resolution);
        }

        for (let i = watchedResolutionInfo.watchedFailed || 0; i < resolution.failedLookupLocations!.length; i++) {
            watchFailedLookupLocation(
                resolution.failedLookupLocations![i],
                resolution,
                redirectedReference,
                watchedResolutionInfo,
            );
        }
        if (!watchedResolutionInfo.watchedFailed && resolution.alternateResult) {
            watchFailedLookupLocation(
                resolution.alternateResult,
                resolution,
                redirectedReference,
                watchedResolutionInfo,
            );
        }
        watchedResolutionInfo.watchedFailed = resolution.failedLookupLocations?.length;
    }

    function createDirectoryWatcherForPackageDir(
        dir: string,
        dirPath: Path,
        packageDir: string,
        packageDirPath: Path,
    ) {
        // Check if this is symlink:
        let isSymlink = isSymlinkCache.get(packageDirPath);
        let packageDirWatcher = packageDirWatchers.get(packageDirPath);
        if (isSymlink === undefined) {
            const realPath = currentCache!.resolutionHost.realpath!(packageDir);
            isSymlink = realPath !== packageDir && sharedCacheHost.toPath(realPath) !== packageDirPath;
            isSymlinkCache.set(packageDirPath, isSymlink);
            if (!packageDirWatcher) {
                packageDirWatchers.set(
                    packageDirPath,
                    packageDirWatcher = {
                        dirPathToWatcher: new Map(),
                        isSymlink,
                    },
                );
            }
            else if (packageDirWatcher.isSymlink !== isSymlink) {
                // Handle the change
                packageDirWatcher.dirPathToWatcher.forEach((watcher, dirPath, map) => {
                    // Do not close the watcher yet since it might be needed by other failed lookup locations.
                    releaseRefCountFromMapForCaches(watcher.watcher.refCount, watcher.refCount);
                    (potentiallyUnreferencedDirWatchers ??= new Set()).add(packageDirWatcher!.isSymlink ? packageDirPath : dirPath);
                    const firstCache = firstDefinedIterator(watcher.refCount.keys(), identity);
                    if (firstCache) {
                        watcher.watcher = createDirPathToWatcher(firstCache);
                        addRefCountToMapForCaches(watcher.watcher.refCount, watcher.refCount, firstCache);
                    }
                    else {
                        // Unused, remove it
                        map.delete(dirPath);
                    }
                });
                packageDirWatcher.isSymlink = isSymlink;
            }
        }
        else {
            Debug.assertIsDefined(packageDirWatcher);
            Debug.assert(isSymlink === packageDirWatcher.isSymlink);
        }

        if (packageDirWatcher.dirPathToWatcher.has(dirPath)) {
            addRefToDirPathWatcherOfPackageDir(packageDirWatcher, dirPath, currentCache!);
        }
        else {
            packageDirWatcher.dirPathToWatcher.set(dirPath, {
                watcher: createDirPathToWatcher(currentCache!),
                refCount: new Map([[currentCache!, 1]]),
            });
            if (isSymlink) addRefCountToCacheMap(dirPathToSymlinkPackageRefCount, dirPath);
        }
        return packageDirWatcher;

        function createDirPathToWatcher(cache: ResolutionCache) {
            return isSymlink ?
                createOrAddRefToDirectoryWatchOfFailedLookups(packageDir, packageDirPath, /*nonRecursive*/ false, cache) :
                createOrAddRefToDirectoryWatchOfFailedLookups(dir, dirPath, /*nonRecursive*/ false, cache);
        }
    }

    function addRefToDirPathWatcherOfPackageDir(packageDirWatcher: PackageDirWatcher, dirPath: Path, cache: ResolutionCache) {
        const forDirPath = packageDirWatcher.dirPathToWatcher.get(dirPath)!;
        // If this is the first time cache is added for this dirPath, add cache refcount to watcher as well
        if (!forDirPath.refCount.has(cache)) addRefCountToCacheMap(forDirPath.watcher.refCount, cache);
        addRefCountToCacheMap(forDirPath.refCount, cache);
    }

    function removeRefToDirPathWatcherOfPackageDir(packageDirPath: Path, dirPath: Path) {
        const packageDirWatcher = packageDirWatchers.get(packageDirPath);
        if (!packageDirWatcher) return;
        const forDirPath = packageDirWatcher.dirPathToWatcher.get(dirPath);
        if (!forDirPath) return;
        releaseRefCountFromMap(forDirPath.refCount, currentCache!);
        if (forDirPath.refCount.has(currentCache!)) return;
        // Release the watcher refcount
        releaseRefCountFromMap(forDirPath.watcher.refCount, currentCache!);
        if (forDirPath.refCount.size !== 0) return;
        closeDirectoryWatchesOfFailedLookup(forDirPath.watcher, packageDirWatcher.isSymlink ? packageDirPath : dirPath, /*nonRecursive*/ false);
        packageDirWatcher.dirPathToWatcher.delete(dirPath);
        if (packageDirWatcher.isSymlink) releaseRefCountFromMap(dirPathToSymlinkPackageRefCount, dirPath);
        if (packageDirWatcher.dirPathToWatcher.size === 0) {
            packageDirWatchers.delete(packageDirPath);
        }
    }

    function getDirectoryWatchesOfFailedLookup(dirPath: Path, nonRecursive: boolean | undefined) {
        const watchMap = !nonRecursive ? directoryWatchesOfFailedLookups : nonRecursiveDirectoryWatchesOfFailedLookups;
        return watchMap.get(dirPath);
    }

    function createOrAddRefToDirectoryWatchOfFailedLookups(
        dir: string,
        dirPath: Path,
        nonRecursive: boolean | undefined,
        cache: ResolutionCache,
    ) {
        const watchMap = !nonRecursive ? directoryWatchesOfFailedLookups : nonRecursiveDirectoryWatchesOfFailedLookups;
        let dirWatcher = watchMap.get(dirPath);
        if (dirWatcher) {
            addRefCountToCacheMap(dirWatcher.refCount, cache);
        }
        else {
            watchMap.set(
                dirPath,
                dirWatcher = {
                    watcher: cache.resolutionHost.watchDirectoryOfFailedLookupLocation(
                        dir,
                        fileOrDirectory => onDirectoryWatcher(dirPath, nonRecursive, fileOrDirectory),
                        nonRecursive ? WatchDirectoryFlags.None : WatchDirectoryFlags.Recursive,
                    ),
                    refCount: new Map([[cache, 1]]),
                },
            );
        }
        return dirWatcher;
    }

    function removeDirectoryWatcher(dirPath: Path, nonRecursive: boolean, forCaches: Set<ResolutionCache> | RefCountCache) {
        const dirWatcher = getDirectoryWatchesOfFailedLookup(dirPath, nonRecursive);
        // Do not close the watcher yet since it might be needed by other failed lookup locations.
        if (dirWatcher) releaseRefCountFromMapForCaches(dirWatcher.refCount, forCaches);
        closeDirectoryWatchesOfFailedLookup(dirWatcher, dirPath, nonRecursive);
    }

    function closeDirectoryWatchesOfFailedLookup(watcher: DirectoryWatchesOfFailedLookup | undefined, path: Path, nonRecursive: boolean | undefined) {
        if (watcher && watcher.refCount.size === 0) {
            if (!nonRecursive) directoryWatchesOfFailedLookups.delete(path);
            else nonRecursiveDirectoryWatchesOfFailedLookups.delete(path);
            watcher.watcher.close();
        }
    }

    function onDirectoryWatcher(dirPath: Path, nonRecursive: boolean | undefined, fileOrDirectory: string, fileOrDirectoryPath?: Path) {
        const refCountCache = getDirectoryWatchesOfFailedLookup(dirPath, nonRecursive)?.refCount;
        if (!refCountCache) return;
        fileOrDirectoryPath ??= sharedCacheHost.toPath(fileOrDirectory);
        refCountCache.forEach((_refCount, cache) => {
            // Since the file existence changed, update the sourceFiles cache
            cache.resolutionHost.getCachedDirectoryStructureHost()?.addOrDeleteFileOrDirectory(fileOrDirectory, fileOrDirectoryPath);
        });
        scheduleInvalidateResolutionOfFailedLookupLocation(fileOrDirectoryPath, dirPath === fileOrDirectoryPath, refCountCache);
    }

    function watchAffectingLocationsOfResolution(
        resolution: ResolutionWithFailedLookupLocations,
        watchedResolutionInfo: WatchedResolutionInfo,
    ) {
        if (resolution.affectingLocations?.length === watchedResolutionInfo.watchedAffected) {
            if (!watchedResolutionInfo.caches.has(currentCache!)) {
                resolution.affectingLocations?.forEach(affectingLocation =>
                    addRefCountToCacheMap(
                        fileWatchesOfAffectingLocations.get(affectingLocation)!.resolutions!,
                        currentCache!,
                    )
                );
            }
            return;
        }
        if (!watchedResolutionInfo.watchedAffected && !watchedResolutionInfo.watchedFailed) resolutionsWithOnlyAffectingLocations.add(resolution);
        // Watch package json
        for (let i = watchedResolutionInfo.watchedAffected || 0; i < resolution.affectingLocations!.length; i++) {
            createFileWatcherOfAffectingLocation(resolution.affectingLocations![i], /*forResolution*/ true);
            addRefCountToMapForCaches(
                fileWatchesOfAffectingLocations.get(resolution.affectingLocations![i])!.resolutions!,
                watchedResolutionInfo.caches,
                currentCache,
            );
        }
        watchedResolutionInfo.watchedAffected = resolution.affectingLocations?.length;
    }

    function createFileWatcherOfAffectingLocation(affectingLocation: string, forResolution?: true) {
        if (!forResolution) addRefCountToCacheMap(inUseResolutionCaches, currentCache!);
        const fileWatcher = fileWatchesOfAffectingLocations.get(affectingLocation);
        if (fileWatcher) {
            addRefCountToCacheMap(forResolution ? fileWatcher.resolutions ??= new Map() : fileWatcher.files ??= new Map(), currentCache!);
            return;
        }
        let locationToWatch = affectingLocation;
        let isSymlink = false;
        let symlinkWatcher: FileWatcherOfAffectingLocation | undefined;
        if (currentCache!.resolutionHost.realpath) {
            locationToWatch = currentCache!.resolutionHost.realpath(affectingLocation);
            if (affectingLocation !== locationToWatch) {
                isSymlink = true;
                symlinkWatcher = fileWatchesOfAffectingLocations.get(locationToWatch);
            }
        }

        const resolutions = forResolution ? new Map([[currentCache!, 1]]) : undefined;
        const files = forResolution ? undefined : new Map([[currentCache!, 1]]);
        if (!isSymlink || !symlinkWatcher) {
            const watcher: FileWatcherOfAffectingLocation = {
                watcher: canWatchAffectingLocation(sharedCacheHost.toPath(locationToWatch)) ?
                    currentCache!.resolutionHost.watchAffectingFileLocation(locationToWatch, (fileName, eventKind) => {
                        const refCountCaches = new Set<RefCountCache>();
                        onFileWatcherOfAffectingLocation(locationToWatch, refCountCaches);
                        const seenCaches = new Set<ResolutionCache>();
                        refCountCaches.forEach(caches =>
                            forRefCountCaches(caches, cache => {
                                if (!tryAddToSet(seenCaches, cache)) return;
                                cache.resolutionHost.getCachedDirectoryStructureHost()?.addOrDeleteFile(fileName, sharedCacheHost.toPath(locationToWatch), eventKind);
                                cache.resolutionHost.scheduleInvalidateResolutionsOfFailedLookupLocations();
                            }, /*skipCache*/ undefined)
                        );
                    }) : noopFileWatcher,
                resolutions: isSymlink ? undefined : resolutions,
                files: isSymlink ? undefined : files,
                symlinks: undefined,
            };
            fileWatchesOfAffectingLocations.set(locationToWatch, watcher);
            addRefToPackageJson(sharedCacheHost.toPath(locationToWatch));
            if (isSymlink) symlinkWatcher = watcher;
        }
        if (isSymlink) {
            Debug.assert(!!symlinkWatcher);
            const watcher: FileWatcherOfAffectingLocation = {
                watcher: {
                    close: () => {
                        const symlinkWatcher = fileWatchesOfAffectingLocations.get(locationToWatch);
                        // Close symlink watcher if no ref
                        if (symlinkWatcher?.symlinks?.delete(affectingLocation) && !symlinkWatcher.symlinks.size && !symlinkWatcher.resolutions?.size && !symlinkWatcher.files?.size) {
                            fileWatchesOfAffectingLocations.delete(locationToWatch);
                            releasePackageJson(sharedCacheHost.toPath(locationToWatch));
                            symlinkWatcher.watcher.close();
                        }
                    },
                },
                resolutions,
                files,
                symlinks: undefined,
            };
            fileWatchesOfAffectingLocations.set(affectingLocation, watcher);
            addRefToPackageJson(sharedCacheHost.toPath(affectingLocation));
            (symlinkWatcher.symlinks ??= new Set()).add(affectingLocation);
        }
    }

    function releaseFileWatcherOfAffectingLocation(location: string) {
        releaseRefCountFromMap(inUseResolutionCaches, currentCache!);
        const watcher = fileWatchesOfAffectingLocations.get(location)!;
        releaseRefCountFromMap(watcher.files!, currentCache!);
    }

    function closeFileWatcherOfAffectingLocation(path: string, watcher?: FileWatcherOfAffectingLocation) {
        watcher ??= fileWatchesOfAffectingLocations.get(path);
        if (watcher && !watcher.files?.size && !watcher.resolutions?.size && !watcher.symlinks?.size) {
            fileWatchesOfAffectingLocations.delete(path);
            releasePackageJson(sharedCacheHost.toPath(path));
            watcher.watcher.close();
        }
    }

    function onFileWatcherOfAffectingLocation(path: string, seenCaches: Set<RefCountCache>) {
        const watcher = fileWatchesOfAffectingLocations.get(path);
        if (watcher?.resolutions?.size) {
            (affectingPathChecks ??= new Set()).add(path);
            seenCaches.add(watcher.resolutions);
        }
        if (watcher?.files?.size) {
            watcher.files.forEach((_refCount, cache) => cache.invalidateAffectingFileWatcher(path));
            seenCaches.add(watcher.files);
        }
        moduleResolutionCache.getPackageJsonInfoCache().getInternalMap()?.delete(sharedCacheHost.toPath(path));
        watcher?.symlinks?.forEach(path => onFileWatcherOfAffectingLocation(path, seenCaches));
    }

    function releaseResolution(
        resolution: ResolutionWithFailedLookupLocations,
        moduleOrTypeRefCache: ModuleOrTypeReferenceResolutionCache<ResolutionWithFailedLookupLocations> | undefined,
    ) {
        releaseRefCountFromMap(inUseResolutionCaches, currentCache!);
        const watchedResolutionInfo = watchedResolutionInfoMap.get(resolution)!;
        watchedResolutionInfo.caches.delete(currentCache!);

        const forCaches = new Set([currentCache!]);
        watchedResolutionInfo.dirWatches?.forEach(dirPath => removeDirectoryWatcher(dirPath, /*nonRecursive*/ false, forCaches));
        watchedResolutionInfo.nonRecursiveDirWatches?.forEach(dirPath => removeDirectoryWatcher(dirPath, /*nonRecursive*/ true, forCaches));
        watchedResolutionInfo.packageDirWatchers?.forEach((dirPaths, packageDirPath) =>
            dirPaths.forEach(
                dirPath => removeRefToDirPathWatcherOfPackageDir(packageDirPath, dirPath),
            )
        );
        resolution.affectingLocations?.forEach(affectingLocation => {
            const watcher = fileWatchesOfAffectingLocations.get(affectingLocation);
            if (watcher?.resolutions) releaseRefCountFromMap(watcher.resolutions, currentCache!);
            closeFileWatcherOfAffectingLocation(affectingLocation, watcher);
        });

        if (watchedResolutionInfo.caches.size) return false;
        watchedResolutionInfoMap.delete(resolution);
        if (resolutionsWithFailedLookups.delete(resolution)) {
            resolution.failedLookupLocations?.forEach(releaseIfPackageJson);
            if (resolution.alternateResult) releaseIfPackageJson(resolution.alternateResult);
        }
        resolutionsWithOnlyAffectingLocations.delete(resolution);

        const resolved = getModuleOrTypeRefResolved(resolution);
        if (resolved && resolved.resolvedFileName) {
            const key = sharedCacheHost.toPath(resolved.resolvedFileName);
            const resolutions = resolvedFileToResolution.get(key);
            if (resolutions?.delete(resolution) && !resolutions.size) resolvedFileToResolution.delete(key);
        }

        if (isResolvedWithGlobalCachePass(resolution)) {
            // Remove globalCacheResult from primary resolution
            const primary = resolution.globalCacheResolution.primary;
            const primaryWatchedInfo = watchedResolutionInfoMap.get(primary)!;
            if (primaryWatchedInfo.caches.size) {
                primary.globalCacheResolution = { primary };
            }
            else {
                // Release primary as well
                watchedResolutionInfoMap.delete(primary);
            }
        }
        else if (resolution.globalCacheResolution?.globalResult) {
            // Keep this in watchInfo if has a globalCacheResult.globalResolution
            watchedResolutionInfoMap.set(resolution, watchedResolutionInfo);
            watchedResolutionInfo.dirWatches = undefined;
            watchedResolutionInfo.nonRecursiveDirWatches = undefined;
            watchedResolutionInfo.packageDirWatchers = undefined;
            watchedResolutionInfo.watchedFailed = undefined;
            watchedResolutionInfo.watchedAffected = undefined;
            watchedResolutionInfo.isInvalidated = undefined;
            watchedResolutionInfo.rootDirInfo = undefined;
        }
        if (moduleOrTypeRefCache) (cachesNeedingGc ??= new Set()).add(moduleOrTypeRefCache.sharedCache!);
        return true;
    }

    function invalidateResolutions(
        resolutions: Set<ResolutionWithFailedLookupLocations> | Map<string, ResolutionWithFailedLookupLocations> | undefined,
        canInvalidate: (resolution: ResolutionWithFailedLookupLocations) => boolean | undefined,
    ) {
        if (!resolutions) return false;
        let invalidated = false;
        resolutions.forEach(resolution => invalidated = invalidateResolution(resolution, canInvalidate) || invalidated);
        return invalidated;
    }

    function invalidateResolution(
        resolution: ResolutionWithFailedLookupLocations,
        canInvalidate: (resolution: ResolutionWithFailedLookupLocations) => boolean | undefined,
    ) {
        const watchedResolutionInfo = watchedResolutionInfoMap.get(resolution)!;
        if (watchedResolutionInfo.isInvalidated || !canInvalidate(resolution)) return false;
        watchedResolutionInfo.isInvalidated = true;
        watchedResolutionInfo.caches.forEach(cache =>
            cache !== currentCache ?
                cache.invalidateResolution(resolution) :
                undefined
        );
        return true;
    }

    function invalidateResolutionOfFile(filePath: Path) {
        return invalidateResolutions(resolvedFileToResolution.get(filePath), returnTrue);
    }

    function scheduleInvalidateResolutionOfFailedLookupLocation(
        fileOrDirectoryPath: Path,
        isCreatingWatchedDirectory: boolean,
        refCountCache: RefCountCache,
    ) {
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
            if (sharedCacheHost.fileIsOpen(fileOrDirectoryPath)) {
                return false;
            }

            // Some file or directory in the watching directory is created
            // Return early if it does not have any of the watching extension or not the custom failed lookup path
            const dirOfFileOrDirectory = getDirectoryPath(fileOrDirectoryPath);
            if (
                isNodeModulesAtTypesDirectory(fileOrDirectoryPath) || isNodeModulesDirectory(fileOrDirectoryPath) ||
                isNodeModulesAtTypesDirectory(dirOfFileOrDirectory) || isNodeModulesDirectory(dirOfFileOrDirectory)
            ) {
                // Invalidate any resolution from this directory
                (failedLookupChecks ||= new Set()).add(fileOrDirectoryPath);
                (startsWithPathChecks ||= new Set()).add(fileOrDirectoryPath);
            }
            else {
                // Ignore .map files
                if (fileExtensionIs(fileOrDirectoryPath, ".map")) {
                    return false;
                }
                // Ignore emits from the program if all caches ignore it
                if (
                    !forEachKey(
                        refCountCache,
                        cache =>
                            !isEmittedFileOfProgram(
                                cache.resolutionHost.getCurrentProgram(),
                                fileOrDirectoryPath,
                            ),
                    )
                ) return false;
                // Resolution need to be invalidated if failed lookup location is same as the file or directory getting created
                (failedLookupChecks ||= new Set()).add(fileOrDirectoryPath);

                // Also any path that starts with this path should be added just in case if this is directory notification
                // and we dont get any notification for file
                (startsWithPathChecks ||= new Set()).add(fileOrDirectoryPath);

                // If the invalidated file is from a node_modules package, invalidate everything else
                // in the package since we might not get notifications for other files in the package.
                // This hardens our logic against unreliable file watchers.
                const packagePath = parseNodeModuleFromPath(fileOrDirectoryPath, /*isFolder*/ true);
                if (packagePath) (startsWithPathChecks ||= new Set()).add(packagePath as Path);
            }
        }
        refCountCache.forEach((_refCount, cache) => cache.resolutionHost.scheduleInvalidateResolutionsOfFailedLookupLocations());
    }

    function invalidatePackageJsonMap() {
        const packageJsonMap = moduleResolutionCache.getPackageJsonInfoCache().getInternalMap();
        if (packageJsonMap && (failedLookupChecks || startsWithPathChecks || isInDirectoryChecks)) {
            packageJsonMap.forEach((_value, path) => isInvalidatedFailedLookup(path) ? packageJsonMap.delete(path) : undefined);
        }
    }

    function invalidateResolutionsOfFailedLookupLocations() {
        if (!failedLookupChecks && !startsWithPathChecks && !isInDirectoryChecks && !affectingPathChecks) {
            return false;
        }

        let invalidated = invalidateResolutions(resolutionsWithFailedLookups, canInvalidateFailedLookupResolution);
        invalidatePackageJsonMap();
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
        return resolution.failedLookupLocations?.some(location => isInvalidatedFailedLookup(sharedCacheHost.toPath(location))) ||
            (!!resolution.alternateResult && isInvalidatedFailedLookup(sharedCacheHost.toPath(resolution.alternateResult)));
    }

    function isInvalidatedFailedLookup(locationPath: Path) {
        return failedLookupChecks?.has(locationPath) ||
            firstDefinedIterator(startsWithPathChecks?.keys() || [], fileOrDirectoryPath => startsWith(locationPath, fileOrDirectoryPath) ? true : undefined) ||
            firstDefinedIterator(isInDirectoryChecks?.keys() || [], dirPath =>
                locationPath.length > dirPath.length &&
                    startsWith(locationPath, dirPath) && (isDiskPathRoot(dirPath) || locationPath[dirPath.length] === directorySeparator) ? true : undefined);
    }

    function canInvalidatedFailedLookupResolutionWithAffectingLocation(resolution: ResolutionWithFailedLookupLocations) {
        return !!affectingPathChecks && resolution.affectingLocations?.some(location => affectingPathChecks!.has(location));
    }

    function createTypeRootsWatch(typeRoot: string, cache: ResolutionCache): FileWatcher {
        let watcher = typeRootsWatches.get(typeRoot);
        if (watcher) {
            watcher.refCount.add(cache);
        }
        else {
            typeRootsWatches.set(
                typeRoot,
                watcher = {
                    watcher: canWatchAtTypes(sharedCacheHost.toPath(typeRoot)) ?
                        cache.resolutionHost.watchTypeRootsDirectory(typeRoot, fileOrDirectory => {
                            const fileOrDirectoryPath = sharedCacheHost.toPath(fileOrDirectory);
                            typeRootsWatches.get(typeRoot)?.refCount.forEach(cache => {
                                // Since the file existence changed, update the sourceFiles cache
                                cache.resolutionHost.getCachedDirectoryStructureHost()?.addOrDeleteFileOrDirectory(
                                    fileOrDirectory,
                                    fileOrDirectoryPath,
                                );
                                cache.invalidateTypeRoot();
                            });

                            // Since directory watchers invoked are flaky, the failed lookup location events might not be triggered
                            // So handle to failed lookup locations here as well to ensure we are invalidating resolutions
                            const fileOrDirectoryPathComponents = getPathComponents(fileOrDirectoryPath);
                            directoryWatchesOfFailedLookups.forEach((_watcher, dirPath) => {
                                if (isInDirectoryPath(getPathComponents(dirPath), fileOrDirectoryPathComponents)) {
                                    onDirectoryWatcher(dirPath, /*nonRecursive*/ false, fileOrDirectory, fileOrDirectoryPath);
                                }
                            });
                            nonRecursiveDirectoryWatchesOfFailedLookups.forEach((_watcher, dirPath) => {
                                const dirPathComponents = getPathComponents(dirPath);
                                if (
                                    isInDirectoryPath(dirPathComponents, fileOrDirectoryPathComponents) &&
                                    (dirPathComponents.length === fileOrDirectoryPathComponents.length || dirPathComponents.length + 1 === fileOrDirectoryPathComponents.length)
                                ) {
                                    onDirectoryWatcher(dirPath, /*nonRecursive*/ true, fileOrDirectory, fileOrDirectoryPath);
                                }
                            });
                        }, WatchDirectoryFlags.Recursive) :
                        noopFileWatcher,
                    refCount: new Set([cache]),
                },
            );
        }
        const result: FileWatcher = {
            close: () => {
                const existing = typeRootsWatches.get(typeRoot);
                if (existing?.refCount.delete(cache)) {
                    releaseRefCountFromMap(inUseResolutionCaches, cache);
                    closeTypeRootsWatch(typeRoot, existing);
                }
            },
        };
        addRefCountToCacheMap(inUseResolutionCaches, cache);
        return result;
    }

    function closeTypeRootsWatch(typeRoot: string, watcher: TypeRootWatch) {
        if (!watcher.refCount.size) {
            typeRootsWatches.delete(typeRoot);
            watcher.watcher.close();
        }
    }
}

/** @internal */
export function enableSharingModuleOrTypeReferenceResolutionCache<T extends ModuleOrTypeReferenceResolutionCache<any>>(
    moduleOrTypeRefCache: T,
    sharedCache: T,
): T {
    const getFromDirectoryCache = moduleOrTypeRefCache.getFromDirectoryCache;
    moduleOrTypeRefCache.getFromDirectoryCache = (name, mode, directoryName, redirectedReference, typeRootsKey?) => {
        let result = getFromDirectoryCache.call(moduleOrTypeRefCache, name, mode, directoryName, redirectedReference, typeRootsKey);
        if (result) return result;
        result = withSharingModuleOrTypeReferenceResolutionCache(
            moduleOrTypeRefCache,
            sharedCache => sharedCache.getFromDirectoryCache(name, mode, directoryName, redirectedReference, typeRootsKey as TypeRootsCacheKeyOrSpecifiedTypeRoots | undefined),
        );
        if (result) {
            moduleOrTypeRefCache.setPerDirectoryAndNonRelativeNameCacheResult(
                name,
                mode,
                directoryName,
                redirectedReference,
                typeRootsKey as TypeRootsCacheKeyOrSpecifiedTypeRoots | undefined,
                result,
            );
        }
        return result;
    };
    const getFromNonRelativeNameCache = moduleOrTypeRefCache.getFromNonRelativeNameCache;
    moduleOrTypeRefCache.getFromNonRelativeNameCache = (nonRelativeModuleName, mode, directoryName, redirectedReference, typeRootsKey?) =>
        getFromNonRelativeNameCache.call(moduleOrTypeRefCache, nonRelativeModuleName, mode, directoryName, redirectedReference, typeRootsKey) ||
        withSharingModuleOrTypeReferenceResolutionCache(
            moduleOrTypeRefCache,
            sharedCache => sharedCache?.getFromNonRelativeNameCache(nonRelativeModuleName, mode, directoryName, redirectedReference, typeRootsKey as TypeRootsCacheKeyOrSpecifiedTypeRoots | undefined),
        );
    const setPerDirectoryAndNonRelativeNameCacheResult = moduleOrTypeRefCache.setPerDirectoryAndNonRelativeNameCacheResult;
    moduleOrTypeRefCache.setPerDirectoryAndNonRelativeNameCacheResult = (name, mode, directoryName, redirectedReference, typeRootsKey, result, primary) => {
        setPerDirectoryAndNonRelativeNameCacheResult.call(moduleOrTypeRefCache, name, mode, directoryName, redirectedReference, typeRootsKey, result, primary);
        if (primary) return; // Already in the cache
        result = result.globalCacheResolution?.primary || result;
        withSharingModuleOrTypeReferenceResolutionCache(
            moduleOrTypeRefCache,
            sharedCache => sharedCache.setPerDirectoryAndNonRelativeNameCacheResult(name, mode, directoryName, redirectedReference, typeRootsKey, result),
        );
    };
    const update = moduleOrTypeRefCache.update;
    moduleOrTypeRefCache.update = options => {
        update.call(moduleOrTypeRefCache, options);
        moduleOrTypeRefCache.sharedCache?.update(options);
    };
    moduleOrTypeRefCache.sharedCache = sharedCache;
    return moduleOrTypeRefCache;
}

function withSharingModuleOrTypeReferenceResolutionCache<T extends ModuleOrTypeReferenceResolutionCache<any>, R>(
    moduleOrTypeRefCache: T,
    cb: (sharedCache: ModuleOrTypeReferenceResolutionCache<any>) => R,
): R | undefined {
    if (!moduleOrTypeRefCache.sharedCache) return;
    moduleOrTypeRefCache.sharedCache.update(moduleOrTypeRefCache.options());
    return cb(moduleOrTypeRefCache.sharedCache);
}

function addRefCountToCacheMap<K>(refCountCache: Map<K, number>, key: K) {
    refCountCache.set(key, (refCountCache.get(key) ?? 0) + 1);
}

function releaseRefCountFromMap<K>(refCountCache: Map<K, number>, key: K) {
    const existing = refCountCache.get(key)!;
    if (existing !== 1) refCountCache.set(key, existing - 1);
    else refCountCache.delete(key);
}

function addRefCountToMapForCaches(refCountCache: RefCountCache, forCaches: Set<ResolutionCache> | RefCountCache, alreadyAddedCache: ResolutionCache | undefined) {
    forRefCountCaches(forCaches, cache => addRefCountToCacheMap(refCountCache, cache), alreadyAddedCache);
}

function releaseRefCountFromMapForCaches(refCountCache: RefCountCache, forCaches: Set<ResolutionCache> | RefCountCache) {
    forRefCountCaches(forCaches, cache => releaseRefCountFromMap(refCountCache, cache), /*skipCache*/ undefined);
}

function forRefCountCaches(forCaches: Set<ResolutionCache> | RefCountCache, cb: (cache: ResolutionCache) => void, skipCache: ResolutionCache | undefined) {
    forCaches.forEach((_refCount, cache) => {
        if (cache === skipCache) return;
        cb(cache);
    });
}
