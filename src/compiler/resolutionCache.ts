import {
    CachedDirectoryStructureHost,
    clearMap,
    closeFileWatcher,
    closeFileWatcherOf,
    CompilerOptions,
    createModeAwareCache,
    createModuleResolutionCache,
    createTypeReferenceDirectiveResolutionCache,
    createTypeReferenceResolutionLoader,
    Debug,
    Diagnostics,
    directorySeparator,
    DirectoryWatcherCallback,
    emptyArray,
    endsWith,
    Extension,
    extensionIsTS,
    fileExtensionIs,
    FileReference,
    FileWatcher,
    FileWatcherCallback,
    firstDefinedIterator,
    GetCanonicalFileName,
    getDirectoryPath,
    getEffectiveTypeRoots,
    getInferredLibraryNameResolveFrom,
    getNormalizedAbsolutePath,
    getOptionsForLibraryResolution,
    getPathComponents,
    getPathFromPathComponents,
    getResolvedModuleFromResolution,
    getResolvedTypeReferenceDirectiveFromResolution,
    HasInvalidatedLibResolutions,
    HasInvalidatedResolutions,
    ignoredPaths,
    inferredTypesContainingFile,
    isDiskPathRoot,
    isEmittedFileOfProgram,
    isExternalModuleNameRelative,
    isNodeModulesDirectory,
    isRootedDiskPath,
    isTraceEnabled,
    loadModuleFromGlobalCache,
    memoize,
    MinimalResolutionCacheHost,
    ModeAwareCache,
    ModuleResolutionCache,
    moduleResolutionNameAndModeGetter,
    mutateMap,
    noopFileWatcher,
    normalizePath,
    packageIdToString,
    PackageJsonInfoCacheEntry,
    parseNodeModuleFromPath,
    Path,
    PathPathComponents,
    Program,
    removeSuffix,
    removeTrailingDirectorySeparator,
    resolutionExtensionIsTSOrJson,
    ResolutionLoader,
    ResolutionMode,
    ResolutionWithResolvedFileName,
    ResolvedModuleWithFailedLookupLocations,
    ResolvedProjectReference,
    ResolvedTypeReferenceDirectiveWithFailedLookupLocations,
    resolveLibrary as ts_resolveLibrary,
    resolveModuleName as ts_resolveModuleName,
    returnTrue,
    some,
    SourceFile,
    startsWith,
    StringLiteralLike,
    trace,
    updateResolutionField,
    WatchDirectoryFlags,
} from "./_namespaces/ts.js";

/** @internal */
export interface HasInvalidatedFromResolutionCache {
    hasInvalidatedResolutions: HasInvalidatedResolutions;
    hasInvalidatedLibResolutions: HasInvalidatedLibResolutions;
}
/**
 * This is the cache of module/typedirectives resolution that can be retained across program
 *
 * @internal
 */
export interface ResolutionCache {
    rootDirForResolution: string;
    resolvedModuleNames: Map<Path, ModeAwareCache<CachedResolvedModuleWithFailedLookupLocations>>;
    resolvedTypeReferenceDirectives: Map<Path, ModeAwareCache<CachedResolvedTypeReferenceDirectiveWithFailedLookupLocations>>;
    resolvedLibraries: Map<string, CachedResolvedModuleWithFailedLookupLocations>;
    resolvedFileToResolution: Map<Path, Set<ResolutionWithFailedLookupLocations>>;
    resolutionsWithFailedLookups: Set<ResolutionWithFailedLookupLocations>;
    resolutionsWithOnlyAffectingLocations: Set<ResolutionWithFailedLookupLocations>;
    directoryWatchesOfFailedLookups: Map<string, DirectoryWatchesOfFailedLookup>;
    fileWatchesOfAffectingLocations: Map<string, FileWatcherOfAffectingLocation>;
    packageDirWatchers: Map<Path, PackageDirWatcher>;
    dirPathToSymlinkPackageRefCount: Map<Path, number>;
    startRecordingFilesWithChangedResolutions(): void;
    finishRecordingFilesWithChangedResolutions(): Path[] | undefined;

    watchFailedLookupLocationsOfExternalModuleResolutions<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>(
        name: string,
        resolution: T,
        filePath: Path,
        getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>,
        deferWatchingNonRelativeResolution: boolean,
    ): void;

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
        reusedNames: readonly T[] | undefined,
    ): readonly ResolvedTypeReferenceDirectiveWithFailedLookupLocations[];
    resolveLibrary(
        libraryName: string,
        resolveFrom: string,
        options: CompilerOptions,
        libFileName: string,
    ): ResolvedModuleWithFailedLookupLocations;
    resolveSingleModuleNameWithoutWatching(
        moduleName: string,
        containingFile: string,
    ): ResolvedModuleWithFailedLookupLocations;

    invalidateResolutionsOfFailedLookupLocations(): boolean;
    invalidateResolutionOfFile(filePath: Path): void;
    removeResolutionsOfFile(filePath: Path): void;
    removeResolutionsFromProjectReferenceRedirects(filePath: Path): void;
    setFilesWithInvalidatedNonRelativeUnresolvedImports(filesWithUnresolvedImports: Map<Path, readonly string[]>): void;
    createHasInvalidatedResolutions(
        customHasInvalidatedResolutions: HasInvalidatedResolutions,
        customHasInvalidatedLibResolutions: HasInvalidatedLibResolutions,
    ): HasInvalidatedFromResolutionCache;
    hasChangedAutomaticTypeDirectiveNames(): boolean;
    isFileWithInvalidatedNonRelativeUnresolvedImports(path: Path): boolean;

    startCachingPerDirectoryResolution(): void;
    finishCachingPerDirectoryResolution(newProgram: Program | undefined, oldProgram: Program | undefined): void;

    updateTypeRootsWatch(): void;
    closeTypeRootsWatch(): void;

    getModuleResolutionCache(): ModuleResolutionCache;

    clear(): void;
    onChangesAffectModuleResolution(): void;
}

/** @internal */
export interface ResolutionWithFailedLookupLocations {
    failedLookupLocations?: string[];
    affectingLocations?: string[];
    isInvalidated?: boolean;
    // Files that have this resolution using
    files?: Set<Path>;
    alternateResult?: string;
}

/** @internal */
export interface CachedResolvedModuleWithFailedLookupLocations extends ResolvedModuleWithFailedLookupLocations, ResolutionWithFailedLookupLocations {
}

/** @internal */
export interface CachedResolvedTypeReferenceDirectiveWithFailedLookupLocations extends ResolvedTypeReferenceDirectiveWithFailedLookupLocations, ResolutionWithFailedLookupLocations {
}

/** @internal */
export interface ResolutionCacheHost extends MinimalResolutionCacheHost {
    toPath(fileName: string): Path;
    getCanonicalFileName: GetCanonicalFileName;
    getCompilationSettings(): CompilerOptions;
    preferNonRecursiveWatch: boolean | undefined;
    watchDirectoryOfFailedLookupLocation(directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags): FileWatcher;
    watchAffectingFileLocation(file: string, cb: FileWatcherCallback): FileWatcher;
    onInvalidatedResolution(): void;
    watchTypeRootsDirectory(directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags): FileWatcher;
    onChangedAutomaticTypeDirectiveNames(): void;
    scheduleInvalidateResolutionsOfFailedLookupLocations(): void;
    getCachedDirectoryStructureHost(): CachedDirectoryStructureHost | undefined;
    projectName?: string;
    globalCacheResolutionModuleName?(externalModuleName: string): string;
    writeLog(s: string): void;
    getCurrentProgram(): Program | undefined;
    fileIsOpen(filePath: Path): boolean;
    onDiscoveredSymlink?(): void;

    // For incremental testing
    beforeResolveSingleModuleNameWithoutWatching?(
        moduleResolutionCache: ModuleResolutionCache,
    ): any;
    afterResolveSingleModuleNameWithoutWatching?(
        moduleResolutionCache: ModuleResolutionCache,
        moduleName: string,
        containingFile: string,
        result: ResolvedModuleWithFailedLookupLocations,
        data: any,
    ): any;
}

/** @internal */
export interface FileWatcherOfAffectingLocation {
    /** watcher for the lookup */
    watcher: FileWatcher;
    resolutions: number;
    files: number;
    symlinks: Set<string> | undefined;
}

/** @internal */
export interface DirectoryWatchesOfFailedLookup {
    /** watcher for the lookup */
    watcher: FileWatcher;
    /** ref count keeping this watch alive */
    refCount: number;
    /** is the directory watched being non recursive */
    nonRecursive?: boolean;
}
/** @internal */
export interface DirPathToWatcherOfPackageDirWatcher {
    watcher: DirectoryWatchesOfFailedLookup;
    refCount: number;
}
/** @internal */
export interface PackageDirWatcher {
    dirPathToWatcher: Map<Path, DirPathToWatcherOfPackageDirWatcher>;
    isSymlink: boolean;
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
export function getDirectoryToWatchFailedLookupLocationFromTypeRoot(
    typeRoot: string,
    typeRootPath: Path,
    rootPath: Path,
    rootPathComponents: Readonly<PathPathComponents>,
    isRootWatchable: boolean,
    getCurrentDirectory: () => string | undefined,
    preferNonRecursiveWatch: boolean | undefined,
    filterCustomPath: (path: Path) => boolean, // Return true if this path can be used
): Path | undefined {
    const typeRootPathComponents = getPathComponents(typeRootPath);
    if (isRootWatchable && isInDirectoryPath(rootPathComponents, typeRootPathComponents)) {
        // Because this is called when we are watching typeRoot, we dont need additional check whether typeRoot is not say c:/users/node_modules/@types when root is c:/
        return rootPath;
    }
    typeRoot = isRootedDiskPath(typeRoot) ? normalizePath(typeRoot) : getNormalizedAbsolutePath(typeRoot, getCurrentDirectory());
    const toWatch = getDirectoryToWatchFromFailedLookupLocationDirectory(
        getPathComponents(typeRoot),
        typeRootPathComponents,
        typeRootPathComponents.length,
        perceivedOsRootLengthForWatching(typeRootPathComponents, typeRootPathComponents.length),
        typeRootPathComponents.indexOf("node_modules" as Path),
        rootPathComponents,
        typeRootPathComponents.lastIndexOf("node_modules" as Path),
        preferNonRecursiveWatch,
    );
    return toWatch && filterCustomPath(toWatch.dirPath) ? toWatch.dirPath : undefined;
}

/** @internal */
export function getRootDirectoryOfResolutionCache(rootDirForResolution: string, getCurrentDirectory: () => string | undefined): string {
    const normalized = getNormalizedAbsolutePath(rootDirForResolution, getCurrentDirectory());
    return !isDiskPathRoot(normalized) ?
        removeTrailingDirectorySeparator(normalized) :
        normalized;
}

function getModuleResolutionHost(resolutionHost: ResolutionCacheHost) {
    return resolutionHost.getCompilerHost?.() || resolutionHost;
}

/** @internal */
export function createModuleResolutionLoaderUsingGlobalCache(
    containingFile: string,
    redirectedReference: ResolvedProjectReference | undefined,
    options: CompilerOptions,
    resolutionHost: ResolutionCacheHost,
    moduleResolutionCache: ModuleResolutionCache,
): ResolutionLoader<StringLiteralLike, ResolvedModuleWithFailedLookupLocations, SourceFile> {
    return {
        nameAndMode: moduleResolutionNameAndModeGetter,
        resolve: (moduleName, resoluionMode) =>
            resolveModuleNameUsingGlobalCache(
                resolutionHost,
                moduleResolutionCache,
                moduleName,
                containingFile,
                options,
                redirectedReference,
                resoluionMode,
            ),
    };
}

function resolveModuleNameUsingGlobalCache(
    resolutionHost: ResolutionCacheHost,
    moduleResolutionCache: ModuleResolutionCache,
    moduleName: string,
    containingFile: string,
    compilerOptions: CompilerOptions,
    redirectedReference?: ResolvedProjectReference,
    mode?: ResolutionMode,
): ResolvedModuleWithFailedLookupLocations {
    const host = getModuleResolutionHost(resolutionHost);
    const primaryResult = ts_resolveModuleName(moduleName, containingFile, compilerOptions, host, moduleResolutionCache, redirectedReference, mode);
    // return result immediately only if global cache support is not enabled or if it is .ts, .tsx or .d.ts
    if (!resolutionHost.getGlobalTypingsCacheLocation) {
        return primaryResult;
    }

    // otherwise try to load typings from @types
    const globalCache = resolutionHost.getGlobalTypingsCacheLocation();
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
            primaryResult.failedLookupLocations = updateResolutionField(primaryResult.failedLookupLocations, failedLookupLocations);
            primaryResult.affectingLocations = updateResolutionField(primaryResult.affectingLocations, affectingLocations);
            primaryResult.resolutionDiagnostics = updateResolutionField(primaryResult.resolutionDiagnostics, resolutionDiagnostics);
            return primaryResult;
        }
    }

    // Default return the result from the first pass
    return primaryResult;
}

/** @internal */
export type GetResolutionWithResolvedFileName<T extends ResolutionWithFailedLookupLocations = ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName = ResolutionWithResolvedFileName> = (resolution: T) => R | undefined;

/** @internal */
export function createResolutionCache(resolutionHost: ResolutionCacheHost, rootDirForResolution: string, logChangesWhenResolvingModule: boolean): ResolutionCache {
    let filesWithChangedSetOfUnresolvedImports: Path[] | undefined;
    let filesWithInvalidatedResolutions: Set<Path> | undefined;
    let filesWithInvalidatedNonRelativeUnresolvedImports: ReadonlyMap<Path, readonly string[]> | undefined;
    const nonRelativeExternalModuleResolutions = new Set<ResolutionWithFailedLookupLocations>();

    const resolutionsWithFailedLookups = new Set<ResolutionWithFailedLookupLocations>();
    const resolutionsWithOnlyAffectingLocations = new Set<ResolutionWithFailedLookupLocations>();
    const resolvedFileToResolution = new Map<Path, Set<ResolutionWithFailedLookupLocations>>();
    const impliedFormatPackageJsons = new Map<Path, readonly string[]>();

    let hasChangedAutomaticTypeDirectiveNames = false;
    let affectingPathChecksForFile: Set<string> | undefined;
    let affectingPathChecks: Set<string> | undefined;
    let failedLookupChecks: Set<Path> | undefined;
    let startsWithPathChecks: Set<Path> | undefined;
    let isInDirectoryChecks: Set<Path> | undefined;
    let allModuleAndTypeResolutionsAreInvalidated = false;

    const getCurrentDirectory = memoize(() => resolutionHost.getCurrentDirectory!());
    const cachedDirectoryStructureHost = resolutionHost.getCachedDirectoryStructureHost();

    // The resolvedModuleNames and resolvedTypeReferenceDirectives are the cache of resolutions per file.
    // The key in the map is source file's path.
    // The values are Map of resolutions with key being name lookedup.
    const resolvedModuleNames = new Map<Path, ModeAwareCache<CachedResolvedModuleWithFailedLookupLocations>>();
    const moduleResolutionCache = createModuleResolutionCache(
        getCurrentDirectory(),
        resolutionHost.getCanonicalFileName,
        resolutionHost.getCompilationSettings(),
    );

    const resolvedTypeReferenceDirectives = new Map<Path, ModeAwareCache<CachedResolvedTypeReferenceDirectiveWithFailedLookupLocations>>();
    const typeReferenceDirectiveResolutionCache = createTypeReferenceDirectiveResolutionCache(
        getCurrentDirectory(),
        resolutionHost.getCanonicalFileName,
        resolutionHost.getCompilationSettings(),
        moduleResolutionCache.getPackageJsonInfoCache(),
        moduleResolutionCache.optionsToRedirectsKey,
    );

    const resolvedLibraries = new Map<string, CachedResolvedModuleWithFailedLookupLocations>();
    const libraryResolutionCache = createModuleResolutionCache(
        getCurrentDirectory(),
        resolutionHost.getCanonicalFileName,
        getOptionsForLibraryResolution(resolutionHost.getCompilationSettings()),
        moduleResolutionCache.getPackageJsonInfoCache(),
    );

    const directoryWatchesOfFailedLookups = new Map<Path, DirectoryWatchesOfFailedLookup>();
    const fileWatchesOfAffectingLocations = new Map<string, FileWatcherOfAffectingLocation>();
    const rootDir = getRootDirectoryOfResolutionCache(rootDirForResolution, getCurrentDirectory);
    const rootPath = resolutionHost.toPath(rootDir);
    const rootPathComponents = getPathComponents(rootPath);
    const isRootWatchable = canWatchDirectoryOrFile(rootPathComponents);

    const isSymlinkCache = new Map<Path, boolean>();
    const packageDirWatchers = new Map<Path, PackageDirWatcher>(); // Watching packageDir if symlink otherwise watching dirPath
    const dirPathToSymlinkPackageRefCount = new Map<Path, number>(); // Refcount for dirPath watches when watching symlinked packageDir

    // TypeRoot watches for the types that get added as part of getAutomaticTypeDirectiveNames
    const typeRootsWatches = new Map<string, FileWatcher>();

    return {
        rootDirForResolution,
        resolvedModuleNames,
        resolvedTypeReferenceDirectives,
        resolvedLibraries,
        resolvedFileToResolution,
        resolutionsWithFailedLookups,
        resolutionsWithOnlyAffectingLocations,
        directoryWatchesOfFailedLookups,
        fileWatchesOfAffectingLocations,
        packageDirWatchers,
        dirPathToSymlinkPackageRefCount,
        watchFailedLookupLocationsOfExternalModuleResolutions,
        getModuleResolutionCache: () => moduleResolutionCache,
        startRecordingFilesWithChangedResolutions,
        finishRecordingFilesWithChangedResolutions,
        // perDirectoryResolvedModuleNames and perDirectoryResolvedTypeReferenceDirectives could be non empty if there was exception during program update
        // (between startCachingPerDirectoryResolution and finishCachingPerDirectoryResolution)
        startCachingPerDirectoryResolution,
        finishCachingPerDirectoryResolution,
        resolveModuleNameLiterals,
        resolveTypeReferenceDirectiveReferences,
        resolveLibrary,
        resolveSingleModuleNameWithoutWatching,
        removeResolutionsFromProjectReferenceRedirects,
        removeResolutionsOfFile,
        hasChangedAutomaticTypeDirectiveNames: () => hasChangedAutomaticTypeDirectiveNames,
        invalidateResolutionOfFile,
        invalidateResolutionsOfFailedLookupLocations,
        setFilesWithInvalidatedNonRelativeUnresolvedImports,
        createHasInvalidatedResolutions,
        isFileWithInvalidatedNonRelativeUnresolvedImports,
        updateTypeRootsWatch,
        closeTypeRootsWatch,
        clear,
        onChangesAffectModuleResolution,
    };

    function clear() {
        clearMap(directoryWatchesOfFailedLookups, closeFileWatcherOf);
        clearMap(fileWatchesOfAffectingLocations, closeFileWatcherOf);
        isSymlinkCache.clear();
        packageDirWatchers.clear();
        dirPathToSymlinkPackageRefCount.clear();
        nonRelativeExternalModuleResolutions.clear();
        closeTypeRootsWatch();
        resolvedModuleNames.clear();
        resolvedTypeReferenceDirectives.clear();
        resolvedFileToResolution.clear();
        resolutionsWithFailedLookups.clear();
        resolutionsWithOnlyAffectingLocations.clear();
        failedLookupChecks = undefined;
        startsWithPathChecks = undefined;
        isInDirectoryChecks = undefined;
        affectingPathChecks = undefined;
        affectingPathChecksForFile = undefined;
        allModuleAndTypeResolutionsAreInvalidated = false;
        moduleResolutionCache.clear();
        typeReferenceDirectiveResolutionCache.clear();
        moduleResolutionCache.update(resolutionHost.getCompilationSettings());
        typeReferenceDirectiveResolutionCache.update(resolutionHost.getCompilationSettings());
        libraryResolutionCache.clear();
        impliedFormatPackageJsons.clear();
        resolvedLibraries.clear();
        hasChangedAutomaticTypeDirectiveNames = false;
    }

    function onChangesAffectModuleResolution() {
        allModuleAndTypeResolutionsAreInvalidated = true;
        moduleResolutionCache.clearAllExceptPackageJsonInfoCache();
        typeReferenceDirectiveResolutionCache.clearAllExceptPackageJsonInfoCache();
        moduleResolutionCache.update(resolutionHost.getCompilationSettings());
        typeReferenceDirectiveResolutionCache.update(resolutionHost.getCompilationSettings());
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

    function createHasInvalidatedResolutions(
        customHasInvalidatedResolutions: HasInvalidatedResolutions,
        customHasInvalidatedLibResolutions: HasInvalidatedLibResolutions,
    ): HasInvalidatedFromResolutionCache {
        // Ensure pending resolutions are applied
        invalidateResolutionsOfFailedLookupLocations();
        const collected = filesWithInvalidatedResolutions;
        filesWithInvalidatedResolutions = undefined;
        return {
            hasInvalidatedResolutions: path =>
                customHasInvalidatedResolutions(path) ||
                allModuleAndTypeResolutionsAreInvalidated ||
                !!collected?.has(path) ||
                isFileWithInvalidatedNonRelativeUnresolvedImports(path),
            hasInvalidatedLibResolutions: libFileName =>
                customHasInvalidatedLibResolutions(libFileName) ||
                !!resolvedLibraries?.get(libFileName)?.isInvalidated,
        };
    }

    function startCachingPerDirectoryResolution() {
        moduleResolutionCache.isReadonly = undefined;
        typeReferenceDirectiveResolutionCache.isReadonly = undefined;
        libraryResolutionCache.isReadonly = undefined;
        moduleResolutionCache.getPackageJsonInfoCache().isReadonly = undefined;
        moduleResolutionCache.clearAllExceptPackageJsonInfoCache();
        typeReferenceDirectiveResolutionCache.clearAllExceptPackageJsonInfoCache();
        libraryResolutionCache.clearAllExceptPackageJsonInfoCache();
        // perDirectoryResolvedModuleNames and perDirectoryResolvedTypeReferenceDirectives could be non empty if there was exception during program update
        // (between startCachingPerDirectoryResolution and finishCachingPerDirectoryResolution)
        watchFailedLookupLocationOfNonRelativeModuleResolutions();
        isSymlinkCache.clear();
    }

    function cleanupLibResolutionWatching(newProgram: Program | undefined) {
        resolvedLibraries.forEach((resolution, libFileName) => {
            if (!newProgram?.resolvedLibReferences?.has(libFileName)) {
                stopWatchFailedLookupLocationOfResolution(
                    resolution,
                    resolutionHost.toPath(getInferredLibraryNameResolveFrom(resolutionHost.getCompilationSettings(), getCurrentDirectory(), libFileName)),
                    getResolvedModuleFromResolution,
                );
                resolvedLibraries.delete(libFileName);
            }
        });
    }

    function finishCachingPerDirectoryResolution(newProgram: Program | undefined, oldProgram: Program | undefined) {
        filesWithInvalidatedNonRelativeUnresolvedImports = undefined;
        allModuleAndTypeResolutionsAreInvalidated = false;
        watchFailedLookupLocationOfNonRelativeModuleResolutions();
        // Update file watches
        if (newProgram !== oldProgram) {
            cleanupLibResolutionWatching(newProgram);
            newProgram?.getSourceFiles().forEach(newFile => {
                const expected = newFile.packageJsonLocations?.length ?? 0;
                const existing = impliedFormatPackageJsons.get(newFile.resolvedPath) ?? emptyArray;
                for (let i = existing.length; i < expected; i++) {
                    createFileWatcherOfAffectingLocation(newFile.packageJsonLocations![i], /*forResolution*/ false);
                }
                if (existing.length > expected) {
                    for (let i = expected; i < existing.length; i++) {
                        fileWatchesOfAffectingLocations.get(existing[i])!.files--;
                    }
                }
                if (expected) impliedFormatPackageJsons.set(newFile.resolvedPath, newFile.packageJsonLocations!);
                else impliedFormatPackageJsons.delete(newFile.resolvedPath);
            });
            impliedFormatPackageJsons.forEach((existing, path) => {
                const newFile = newProgram?.getSourceFileByPath(path);
                if (!newFile || newFile.resolvedPath !== path) {
                    existing.forEach(location => fileWatchesOfAffectingLocations.get(location)!.files--);
                    impliedFormatPackageJsons.delete(path);
                }
            });
        }
        directoryWatchesOfFailedLookups.forEach(closeDirectoryWatchesOfFailedLookup);
        fileWatchesOfAffectingLocations.forEach(closeFileWatcherOfAffectingLocation);
        packageDirWatchers.forEach(closePackageDirWatcher);
        hasChangedAutomaticTypeDirectiveNames = false;
        moduleResolutionCache.isReadonly = true;
        typeReferenceDirectiveResolutionCache.isReadonly = true;
        libraryResolutionCache.isReadonly = true;
        moduleResolutionCache.getPackageJsonInfoCache().isReadonly = true;
        isSymlinkCache.clear();
    }

    function closePackageDirWatcher(watcher: PackageDirWatcher, packageDirPath: Path) {
        if (watcher.dirPathToWatcher.size === 0) {
            packageDirWatchers.delete(packageDirPath);
        }
    }

    function closeDirectoryWatchesOfFailedLookup(watcher: DirectoryWatchesOfFailedLookup, path: Path) {
        if (watcher.refCount === 0) {
            directoryWatchesOfFailedLookups.delete(path);
            watcher.watcher.close();
        }
    }

    function closeFileWatcherOfAffectingLocation(watcher: FileWatcherOfAffectingLocation, path: string) {
        if (watcher.files === 0 && watcher.resolutions === 0 && !watcher.symlinks?.size) {
            fileWatchesOfAffectingLocations.delete(path);
            watcher.watcher.close();
        }
    }

    interface ResolveNamesWithLocalCacheInput<Entry, SourceFile, T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName> {
        entries: readonly Entry[];
        containingFile: string;
        containingSourceFile: SourceFile;
        redirectedReference: ResolvedProjectReference | undefined;
        options: CompilerOptions;
        reusedNames?: readonly Entry[];
        perFileCache: Map<Path, ModeAwareCache<T>>;
        loader: ResolutionLoader<Entry, T, SourceFile>;
        getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>;
        shouldRetryResolution: (t: T) => boolean;
        logChanges?: boolean;
        deferWatchingNonRelativeResolution: boolean;
    }
    function resolveNamesWithLocalCache<Entry, SourceFile, T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>({
        entries,
        containingFile,
        containingSourceFile,
        redirectedReference,
        options,
        perFileCache,
        reusedNames,
        loader,
        getResolutionWithResolvedFileName,
        deferWatchingNonRelativeResolution,
        shouldRetryResolution,
        logChanges,
    }: ResolveNamesWithLocalCacheInput<Entry, SourceFile, T, R>): readonly T[] {
        const path = resolutionHost.toPath(containingFile);
        const resolutionsInFile = perFileCache.get(path) || perFileCache.set(path, createModeAwareCache()).get(path)!;
        const resolvedModules: T[] = [];
        const hasInvalidatedNonRelativeUnresolvedImport = logChanges && isFileWithInvalidatedNonRelativeUnresolvedImports(path);

        // All the resolutions in this file are invalidated if this file wasn't resolved using same redirect
        const program = resolutionHost.getCurrentProgram();
        const oldRedirect = program && program.getResolvedProjectReferenceToRedirect(containingFile);
        const unmatchedRedirects = oldRedirect ?
            !redirectedReference || redirectedReference.sourceFile.path !== oldRedirect.sourceFile.path :
            !!redirectedReference;

        const seenNamesInFile = createModeAwareCache<true>();
        for (const entry of entries) {
            const name = loader.nameAndMode.getName(entry);
            const mode = loader.nameAndMode.getMode(entry, containingSourceFile, redirectedReference?.commandLine.options || options);
            let resolution = resolutionsInFile.get(name, mode);
            // Resolution is valid if it is present and not invalidated
            if (
                !seenNamesInFile.has(name, mode) &&
                (allModuleAndTypeResolutionsAreInvalidated || unmatchedRedirects || !resolution || resolution.isInvalidated ||
                    // If the name is unresolved import that was invalidated, recalculate
                    (hasInvalidatedNonRelativeUnresolvedImport && !isExternalModuleNameRelative(name) && shouldRetryResolution(resolution)))
            ) {
                const existingResolution = resolution;
                resolution = loader.resolve(name, mode);
                if (resolutionHost.onDiscoveredSymlink && resolutionIsSymlink(resolution)) {
                    resolutionHost.onDiscoveredSymlink();
                }
                resolutionsInFile.set(name, mode, resolution);
                if (resolution !== existingResolution) {
                    watchFailedLookupLocationsOfExternalModuleResolutions(name, resolution, path, getResolutionWithResolvedFileName, deferWatchingNonRelativeResolution);
                    if (existingResolution) {
                        stopWatchFailedLookupLocationOfResolution(existingResolution, path, getResolutionWithResolvedFileName);
                    }
                }

                if (logChanges && filesWithChangedSetOfUnresolvedImports && !resolutionIsEqualTo(existingResolution, resolution)) {
                    filesWithChangedSetOfUnresolvedImports.push(path);
                    // reset log changes to avoid recording the same file multiple times
                    logChanges = false;
                }
            }
            else {
                const host = getModuleResolutionHost(resolutionHost);
                if (isTraceEnabled(options, host) && !seenNamesInFile.has(name, mode)) {
                    const resolved = getResolutionWithResolvedFileName(resolution!);
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
                        resolved?.packageId && packageIdToString(resolved.packageId),
                    );
                }
            }
            Debug.assert(resolution !== undefined && !resolution.isInvalidated);
            seenNamesInFile.set(name, mode, true);
            resolvedModules.push(resolution);
        }
        reusedNames?.forEach(entry =>
            seenNamesInFile.set(
                loader.nameAndMode.getName(entry),
                loader.nameAndMode.getMode(entry, containingSourceFile, redirectedReference?.commandLine.options || options),
                true,
            )
        );
        if (resolutionsInFile.size() !== seenNamesInFile.size()) {
            // Stop watching and remove the unused name
            resolutionsInFile.forEach((resolution, name, mode) => {
                if (!seenNamesInFile.has(name, mode)) {
                    stopWatchFailedLookupLocationOfResolution(resolution, path, getResolutionWithResolvedFileName);
                    resolutionsInFile.delete(name, mode);
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
        reusedNames: readonly T[] | undefined,
    ): readonly ResolvedTypeReferenceDirectiveWithFailedLookupLocations[] {
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
                getModuleResolutionHost(resolutionHost),
                typeReferenceDirectiveResolutionCache,
            ),
            getResolutionWithResolvedFileName: getResolvedTypeReferenceDirectiveFromResolution,
            shouldRetryResolution: resolution => resolution.resolvedTypeReferenceDirective === undefined,
            deferWatchingNonRelativeResolution: false,
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
            loader: createModuleResolutionLoaderUsingGlobalCache(
                containingFile,
                redirectedReference,
                options,
                resolutionHost,
                moduleResolutionCache,
            ),
            getResolutionWithResolvedFileName: getResolvedModuleFromResolution,
            shouldRetryResolution: resolution => !resolution.resolvedModule || !resolutionExtensionIsTSOrJson(resolution.resolvedModule.extension),
            logChanges: logChangesWhenResolvingModule,
            deferWatchingNonRelativeResolution: true, // Defer non relative resolution watch because we could be using ambient modules
        });
    }

    function resolveLibrary(
        libraryName: string,
        resolveFrom: string,
        options: CompilerOptions,
        libFileName: string,
    ) {
        const host = getModuleResolutionHost(resolutionHost);
        let resolution = resolvedLibraries?.get(libFileName);
        if (!resolution || resolution.isInvalidated) {
            const existingResolution = resolution;
            resolution = ts_resolveLibrary(libraryName, resolveFrom, options, host, libraryResolutionCache);
            const path = resolutionHost.toPath(resolveFrom);
            watchFailedLookupLocationsOfExternalModuleResolutions(libraryName, resolution, path, getResolvedModuleFromResolution, /*deferWatchingNonRelativeResolution*/ false);
            resolvedLibraries.set(libFileName, resolution);
            if (existingResolution) {
                stopWatchFailedLookupLocationOfResolution(existingResolution, path, getResolvedModuleFromResolution);
            }
        }
        else {
            if (isTraceEnabled(options, host)) {
                const resolved = getResolvedModuleFromResolution(resolution);
                trace(
                    host,
                    resolved?.resolvedFileName ?
                        resolved.packageId ?
                            Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2_with_Package_ID_3 :
                            Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2 :
                        Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_not_resolved,
                    libraryName,
                    resolveFrom,
                    resolved?.resolvedFileName,
                    resolved?.packageId && packageIdToString(resolved.packageId),
                );
            }
        }
        return resolution;
    }

    function resolveSingleModuleNameWithoutWatching(moduleName: string, containingFile: string) {
        const path = resolutionHost.toPath(containingFile);
        const resolutionsInFile = resolvedModuleNames.get(path);
        const resolution = resolutionsInFile?.get(moduleName, /*mode*/ undefined);
        if (resolution && !resolution.isInvalidated) return resolution;
        const data = resolutionHost.beforeResolveSingleModuleNameWithoutWatching?.(moduleResolutionCache);
        const host = getModuleResolutionHost(resolutionHost);
        // We are not resolving d.ts so just normal resolution instead of doing resolution pass to global cache
        const result = ts_resolveModuleName(
            moduleName,
            containingFile,
            resolutionHost.getCompilationSettings(),
            host,
            moduleResolutionCache,
        );
        resolutionHost.afterResolveSingleModuleNameWithoutWatching?.(moduleResolutionCache, moduleName, containingFile, result, data);
        return result;
    }

    function isNodeModulesAtTypesDirectory(dirPath: Path) {
        return endsWith(dirPath, "/node_modules/@types");
    }

    function watchFailedLookupLocationsOfExternalModuleResolutions<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>(
        name: string,
        resolution: T,
        filePath: Path,
        getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>,
        deferWatchingNonRelativeResolution: boolean,
    ) {
        (resolution.files ??= new Set()).add(filePath);
        if (resolution.files.size !== 1) return;
        if (!deferWatchingNonRelativeResolution || isExternalModuleNameRelative(name)) {
            watchFailedLookupLocationOfResolution(resolution);
        }
        else {
            nonRelativeExternalModuleResolutions.add(resolution);
        }
        const resolved = getResolutionWithResolvedFileName(resolution);
        if (resolved && resolved.resolvedFileName) {
            const key = resolutionHost.toPath(resolved.resolvedFileName);
            let resolutions = resolvedFileToResolution.get(key);
            if (!resolutions) resolvedFileToResolution.set(key, resolutions = new Set());
            resolutions.add(resolution);
        }
    }

    function watchFailedLookupLocation(failedLookupLocation: string, setAtRoot: boolean) {
        const failedLookupLocationPath = resolutionHost.toPath(failedLookupLocation);
        const toWatch = getDirectoryToWatchFailedLookupLocation(
            failedLookupLocation,
            failedLookupLocationPath,
            rootDir,
            rootPath,
            rootPathComponents,
            isRootWatchable,
            getCurrentDirectory,
            resolutionHost.preferNonRecursiveWatch,
        );
        if (toWatch) {
            const { dir, dirPath, nonRecursive, packageDir, packageDirPath } = toWatch;
            if (dirPath === rootPath) {
                Debug.assert(nonRecursive);
                Debug.assert(!packageDir);
                setAtRoot = true;
            }
            else {
                setDirectoryWatcher(dir, dirPath, packageDir, packageDirPath, nonRecursive);
            }
        }
        return setAtRoot;
    }

    function watchFailedLookupLocationOfResolution(resolution: ResolutionWithFailedLookupLocations) {
        Debug.assert(!!resolution.files?.size);

        const { failedLookupLocations, affectingLocations, alternateResult } = resolution;
        if (!failedLookupLocations?.length && !affectingLocations?.length && !alternateResult) return;
        if (failedLookupLocations?.length || alternateResult) resolutionsWithFailedLookups.add(resolution);

        let setAtRoot = false;
        if (failedLookupLocations) {
            for (const failedLookupLocation of failedLookupLocations) {
                setAtRoot = watchFailedLookupLocation(failedLookupLocation, setAtRoot);
            }
        }
        if (alternateResult) setAtRoot = watchFailedLookupLocation(alternateResult, setAtRoot);
        if (setAtRoot) {
            // This is always non recursive
            setDirectoryWatcher(rootDir, rootPath, /*packageDir*/ undefined, /*packageDirPath*/ undefined, /*nonRecursive*/ true);
        }
        watchAffectingLocationsOfResolution(resolution, !failedLookupLocations?.length && !alternateResult);
    }

    function watchAffectingLocationsOfResolution(resolution: ResolutionWithFailedLookupLocations, addToResolutionsWithOnlyAffectingLocations: boolean) {
        Debug.assert(!!resolution.files?.size);
        const { affectingLocations } = resolution;
        if (!affectingLocations?.length) return;
        if (addToResolutionsWithOnlyAffectingLocations) resolutionsWithOnlyAffectingLocations.add(resolution);
        // Watch package json
        for (const affectingLocation of affectingLocations) {
            createFileWatcherOfAffectingLocation(affectingLocation, /*forResolution*/ true);
        }
    }

    function createFileWatcherOfAffectingLocation(affectingLocation: string, forResolution: boolean) {
        const fileWatcher = fileWatchesOfAffectingLocations.get(affectingLocation);
        if (fileWatcher) {
            if (forResolution) fileWatcher.resolutions++;
            else fileWatcher.files++;
            return;
        }
        let locationToWatch = affectingLocation;
        let isSymlink = false;
        let symlinkWatcher: FileWatcherOfAffectingLocation | undefined;
        if (resolutionHost.realpath) {
            locationToWatch = resolutionHost.realpath(affectingLocation);
            if (affectingLocation !== locationToWatch) {
                isSymlink = true;
                symlinkWatcher = fileWatchesOfAffectingLocations.get(locationToWatch);
            }
        }

        const resolutions = forResolution ? 1 : 0;
        const files = forResolution ? 0 : 1;
        if (!isSymlink || !symlinkWatcher) {
            const watcher: FileWatcherOfAffectingLocation = {
                watcher: canWatchAffectingLocation(resolutionHost.toPath(locationToWatch)) ?
                    resolutionHost.watchAffectingFileLocation(locationToWatch, (fileName, eventKind) => {
                        cachedDirectoryStructureHost?.addOrDeleteFile(fileName, resolutionHost.toPath(locationToWatch), eventKind);
                        invalidateAffectingFileWatcher(locationToWatch, moduleResolutionCache.getPackageJsonInfoCache().getInternalMap());
                        resolutionHost.scheduleInvalidateResolutionsOfFailedLookupLocations();
                    }) : noopFileWatcher,
                resolutions: isSymlink ? 0 : resolutions,
                files: isSymlink ? 0 : files,
                symlinks: undefined,
            };
            fileWatchesOfAffectingLocations.set(locationToWatch, watcher);
            if (isSymlink) symlinkWatcher = watcher;
        }
        if (isSymlink) {
            Debug.assert(!!symlinkWatcher);
            const watcher: FileWatcherOfAffectingLocation = {
                watcher: {
                    close: () => {
                        const symlinkWatcher = fileWatchesOfAffectingLocations.get(locationToWatch);
                        // Close symlink watcher if no ref
                        if (symlinkWatcher?.symlinks?.delete(affectingLocation) && !symlinkWatcher.symlinks.size && !symlinkWatcher.resolutions && !symlinkWatcher.files) {
                            fileWatchesOfAffectingLocations.delete(locationToWatch);
                            symlinkWatcher.watcher.close();
                        }
                    },
                },
                resolutions,
                files,
                symlinks: undefined,
            };
            fileWatchesOfAffectingLocations.set(affectingLocation, watcher);
            (symlinkWatcher.symlinks ??= new Set()).add(affectingLocation);
        }
    }

    function invalidateAffectingFileWatcher(path: string, packageJsonMap: Map<Path, PackageJsonInfoCacheEntry> | undefined) {
        const watcher = fileWatchesOfAffectingLocations.get(path);
        if (watcher?.resolutions) (affectingPathChecks ??= new Set()).add(path);
        if (watcher?.files) (affectingPathChecksForFile ??= new Set()).add(path);
        watcher?.symlinks?.forEach(path => invalidateAffectingFileWatcher(path, packageJsonMap));
        packageJsonMap?.delete(resolutionHost.toPath(path));
    }

    function watchFailedLookupLocationOfNonRelativeModuleResolutions() {
        nonRelativeExternalModuleResolutions.forEach(watchFailedLookupLocationOfResolution);
        nonRelativeExternalModuleResolutions.clear();
    }

    function createDirectoryWatcherForPackageDir(
        dir: string,
        dirPath: Path,
        packageDir: string,
        packageDirPath: Path,
        nonRecursive: boolean | undefined,
    ) {
        Debug.assert(!nonRecursive);
        // Check if this is symlink:
        let isSymlink = isSymlinkCache.get(packageDirPath);
        let packageDirWatcher = packageDirWatchers.get(packageDirPath);
        if (isSymlink === undefined) {
            const realPath = resolutionHost.realpath!(packageDir);
            isSymlink = realPath !== packageDir && resolutionHost.toPath(realPath) !== packageDirPath;
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
                packageDirWatcher.dirPathToWatcher.forEach(watcher => {
                    removeDirectoryWatcher(packageDirWatcher!.isSymlink ? packageDirPath : dirPath);
                    watcher.watcher = createDirPathToWatcher();
                });
                packageDirWatcher.isSymlink = isSymlink;
            }
        }
        else {
            Debug.assertIsDefined(packageDirWatcher);
            Debug.assert(isSymlink === packageDirWatcher.isSymlink);
        }
        const forDirPath = packageDirWatcher.dirPathToWatcher.get(dirPath);
        if (forDirPath) {
            forDirPath.refCount++;
        }
        else {
            packageDirWatcher.dirPathToWatcher.set(dirPath, {
                watcher: createDirPathToWatcher(),
                refCount: 1,
            });
            if (isSymlink) dirPathToSymlinkPackageRefCount.set(dirPath, (dirPathToSymlinkPackageRefCount.get(dirPath) ?? 0) + 1);
        }

        function createDirPathToWatcher() {
            return isSymlink ?
                createOrAddRefToDirectoryWatchOfFailedLookups(packageDir, packageDirPath, nonRecursive) :
                createOrAddRefToDirectoryWatchOfFailedLookups(dir, dirPath, nonRecursive);
        }
    }

    function setDirectoryWatcher(
        dir: string,
        dirPath: Path,
        packageDir: string | undefined,
        packageDirPath: Path | undefined,
        nonRecursive: boolean | undefined,
    ) {
        if (!packageDirPath || !resolutionHost.realpath) {
            createOrAddRefToDirectoryWatchOfFailedLookups(dir, dirPath, nonRecursive);
        }
        else {
            createDirectoryWatcherForPackageDir(dir, dirPath, packageDir!, packageDirPath, nonRecursive);
        }
    }

    function createOrAddRefToDirectoryWatchOfFailedLookups(dir: string, dirPath: Path, nonRecursive: boolean | undefined) {
        let dirWatcher = directoryWatchesOfFailedLookups.get(dirPath);
        if (dirWatcher) {
            Debug.assert(!!nonRecursive === !!dirWatcher.nonRecursive);
            dirWatcher.refCount++;
        }
        else {
            directoryWatchesOfFailedLookups.set(dirPath, dirWatcher = { watcher: createDirectoryWatcher(dir, dirPath, nonRecursive), refCount: 1, nonRecursive });
        }
        return dirWatcher;
    }

    function stopWatchFailedLookupLocation(failedLookupLocation: string, removeAtRoot: boolean) {
        const failedLookupLocationPath = resolutionHost.toPath(failedLookupLocation);
        const toWatch = getDirectoryToWatchFailedLookupLocation(
            failedLookupLocation,
            failedLookupLocationPath,
            rootDir,
            rootPath,
            rootPathComponents,
            isRootWatchable,
            getCurrentDirectory,
            resolutionHost.preferNonRecursiveWatch,
        );
        if (toWatch) {
            const { dirPath, packageDirPath } = toWatch;
            if (dirPath === rootPath) {
                removeAtRoot = true;
            }
            else if (packageDirPath && resolutionHost.realpath) {
                const packageDirWatcher = packageDirWatchers.get(packageDirPath)!;
                const forDirPath = packageDirWatcher.dirPathToWatcher.get(dirPath)!;
                forDirPath.refCount--;
                if (forDirPath.refCount === 0) {
                    removeDirectoryWatcher(packageDirWatcher.isSymlink ? packageDirPath : dirPath);
                    packageDirWatcher.dirPathToWatcher.delete(dirPath);
                    if (packageDirWatcher.isSymlink) {
                        const refCount = dirPathToSymlinkPackageRefCount.get(dirPath)! - 1;
                        if (refCount === 0) {
                            dirPathToSymlinkPackageRefCount.delete(dirPath);
                        }
                        else {
                            dirPathToSymlinkPackageRefCount.set(dirPath, refCount);
                        }
                    }
                }
            }
            else {
                removeDirectoryWatcher(dirPath);
            }
        }
        return removeAtRoot;
    }

    function stopWatchFailedLookupLocationOfResolution<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>(
        resolution: T,
        filePath: Path,
        getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>,
    ) {
        Debug.checkDefined(resolution.files).delete(filePath);
        if (resolution.files!.size) return;
        resolution.files = undefined;
        const resolved = getResolutionWithResolvedFileName(resolution);
        if (resolved && resolved.resolvedFileName) {
            const key = resolutionHost.toPath(resolved.resolvedFileName);
            const resolutions = resolvedFileToResolution.get(key);
            if (resolutions?.delete(resolution) && !resolutions.size) resolvedFileToResolution.delete(key);
        }

        const { failedLookupLocations, affectingLocations, alternateResult } = resolution;
        if (resolutionsWithFailedLookups.delete(resolution)) {
            let removeAtRoot = false;
            if (failedLookupLocations) {
                for (const failedLookupLocation of failedLookupLocations) {
                    removeAtRoot = stopWatchFailedLookupLocation(failedLookupLocation, removeAtRoot);
                }
            }
            if (alternateResult) removeAtRoot = stopWatchFailedLookupLocation(alternateResult, removeAtRoot);
            if (removeAtRoot) removeDirectoryWatcher(rootPath);
        }
        else if (affectingLocations?.length) {
            resolutionsWithOnlyAffectingLocations.delete(resolution);
        }

        if (affectingLocations) {
            for (const affectingLocation of affectingLocations) {
                const watcher = fileWatchesOfAffectingLocations.get(affectingLocation)!;
                watcher.resolutions--;
            }
        }
    }

    function removeDirectoryWatcher(dirPath: Path) {
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
        cache: Map<string, ModeAwareCache<T>>,
        filePath: Path,
        getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>,
    ) {
        // Deleted file, stop watching failed lookups for all the resolutions in the file
        const resolutions = cache.get(filePath);
        if (resolutions) {
            resolutions.forEach(resolution =>
                stopWatchFailedLookupLocationOfResolution(
                    resolution,
                    filePath,
                    getResolutionWithResolvedFileName,
                )
            );
            cache.delete(filePath);
        }
    }

    function removeResolutionsFromProjectReferenceRedirects(filePath: Path) {
        if (!fileExtensionIs(filePath, Extension.Json)) return;

        const program = resolutionHost.getCurrentProgram();
        if (!program) return;

        // If this file is input file for the referenced project, get it
        const resolvedProjectReference = program.getResolvedProjectReferenceByPath(filePath);
        if (!resolvedProjectReference) return;

        // filePath is for the projectReference and the containing file is from this project reference, invalidate the resolution
        resolvedProjectReference.commandLine.fileNames.forEach(f => removeResolutionsOfFile(resolutionHost.toPath(f)));
    }

    function removeResolutionsOfFile(filePath: Path) {
        removeResolutionsOfFileFromCache(resolvedModuleNames, filePath, getResolvedModuleFromResolution);
        removeResolutionsOfFileFromCache(resolvedTypeReferenceDirectives, filePath, getResolvedTypeReferenceDirectiveFromResolution);
    }

    function invalidateResolutions(resolutions: Set<ResolutionWithFailedLookupLocations> | Map<string, ResolutionWithFailedLookupLocations> | undefined, canInvalidate: (resolution: ResolutionWithFailedLookupLocations) => boolean | undefined) {
        if (!resolutions) return false;
        let invalidated = false;
        resolutions.forEach(resolution => {
            if (resolution.isInvalidated || !canInvalidate(resolution)) return;
            resolution.isInvalidated = invalidated = true;
            for (const containingFilePath of Debug.checkDefined(resolution.files)) {
                (filesWithInvalidatedResolutions ??= new Set()).add(containingFilePath);
                // When its a file with inferred types resolution, invalidate type reference directive resolution
                hasChangedAutomaticTypeDirectiveNames = hasChangedAutomaticTypeDirectiveNames || endsWith(containingFilePath, inferredTypesContainingFile);
            }
        });
        return invalidated;
    }

    function invalidateResolutionOfFile(filePath: Path) {
        removeResolutionsOfFile(filePath);
        // Resolution is invalidated if the resulting file name is same as the deleted file path
        const prevHasChangedAutomaticTypeDirectiveNames = hasChangedAutomaticTypeDirectiveNames;
        if (
            invalidateResolutions(resolvedFileToResolution.get(filePath), returnTrue) &&
            hasChangedAutomaticTypeDirectiveNames &&
            !prevHasChangedAutomaticTypeDirectiveNames
        ) {
            resolutionHost.onChangedAutomaticTypeDirectiveNames();
        }
    }

    function setFilesWithInvalidatedNonRelativeUnresolvedImports(filesMap: ReadonlyMap<Path, readonly string[]>) {
        Debug.assert(filesWithInvalidatedNonRelativeUnresolvedImports === filesMap || filesWithInvalidatedNonRelativeUnresolvedImports === undefined);
        filesWithInvalidatedNonRelativeUnresolvedImports = filesMap;
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
            if (
                isNodeModulesAtTypesDirectory(fileOrDirectoryPath) || isNodeModulesDirectory(fileOrDirectoryPath) ||
                isNodeModulesAtTypesDirectory(dirOfFileOrDirectory) || isNodeModulesDirectory(dirOfFileOrDirectory)
            ) {
                // Invalidate any resolution from this directory
                (failedLookupChecks ||= new Set()).add(fileOrDirectoryPath);
                (startsWithPathChecks ||= new Set()).add(fileOrDirectoryPath);
            }
            else {
                // Ignore emits from the program
                if (isEmittedFileOfProgram(resolutionHost.getCurrentProgram(), fileOrDirectoryPath)) {
                    return false;
                }
                // Ignore .map files
                if (fileExtensionIs(fileOrDirectoryPath, ".map")) {
                    return false;
                }
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
        resolutionHost.scheduleInvalidateResolutionsOfFailedLookupLocations();
    }

    function invalidatePackageJsonMap() {
        const packageJsonMap = moduleResolutionCache.getPackageJsonInfoCache().getInternalMap();
        if (packageJsonMap && (failedLookupChecks || startsWithPathChecks || isInDirectoryChecks)) {
            packageJsonMap.forEach((_value, path) => isInvalidatedFailedLookup(path) ? packageJsonMap.delete(path) : undefined);
        }
    }

    function invalidateResolutionsOfFailedLookupLocations() {
        if (allModuleAndTypeResolutionsAreInvalidated) {
            affectingPathChecksForFile = undefined;
            invalidatePackageJsonMap();
            if (failedLookupChecks || startsWithPathChecks || isInDirectoryChecks || affectingPathChecks) {
                invalidateResolutions(resolvedLibraries, canInvalidateFailedLookupResolution);
            }
            failedLookupChecks = undefined;
            startsWithPathChecks = undefined;
            isInDirectoryChecks = undefined;
            affectingPathChecks = undefined;
            return true;
        }
        let invalidated = false;
        if (affectingPathChecksForFile) {
            resolutionHost.getCurrentProgram()?.getSourceFiles().forEach(f => {
                if (some(f.packageJsonLocations, location => affectingPathChecksForFile!.has(location))) {
                    (filesWithInvalidatedResolutions ??= new Set()).add(f.path);
                    invalidated = true;
                }
            });
            affectingPathChecksForFile = undefined;
        }

        if (!failedLookupChecks && !startsWithPathChecks && !isInDirectoryChecks && !affectingPathChecks) {
            return invalidated;
        }

        invalidated = invalidateResolutions(resolutionsWithFailedLookups, canInvalidateFailedLookupResolution) || invalidated;
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
        return resolution.failedLookupLocations?.some(location => isInvalidatedFailedLookup(resolutionHost.toPath(location))) ||
            (!!resolution.alternateResult && isInvalidatedFailedLookup(resolutionHost.toPath(resolution.alternateResult)));
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

    function closeTypeRootsWatch() {
        clearMap(typeRootsWatches, closeFileWatcher);
    }

    function createTypeRootsWatch(typeRoot: string): FileWatcher {
        // Create new watch and recursive info
        return canWatchTypeRootPath(typeRoot) ?
            resolutionHost.watchTypeRootsDirectory(typeRoot, fileOrDirectory => {
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
                const dirPath = getDirectoryToWatchFailedLookupLocationFromTypeRoot(
                    typeRoot,
                    resolutionHost.toPath(typeRoot),
                    rootPath,
                    rootPathComponents,
                    isRootWatchable,
                    getCurrentDirectory,
                    resolutionHost.preferNonRecursiveWatch,
                    dirPath => directoryWatchesOfFailedLookups.has(dirPath) || dirPathToSymlinkPackageRefCount.has(dirPath),
                );
                if (dirPath) {
                    scheduleInvalidateResolutionOfFailedLookupLocation(fileOrDirectoryPath, dirPath === fileOrDirectoryPath);
                }
            }, WatchDirectoryFlags.Recursive) :
            noopFileWatcher;
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
        const typeRoots = getEffectiveTypeRoots(options, { getCurrentDirectory });
        if (typeRoots) {
            mutateMap(
                typeRootsWatches,
                new Set(typeRoots),
                {
                    createNewValue: createTypeRootsWatch,
                    onDeleteValue: closeFileWatcher,
                },
            );
        }
        else {
            closeTypeRootsWatch();
        }
    }

    function canWatchTypeRootPath(typeRoot: string) {
        // If type roots is specified, watch that path
        if (resolutionHost.getCompilationSettings().typeRoots) return true;

        // Otherwise can watch directory only if we can watch the parent directory of node_modules/@types
        return canWatchAtTypes(resolutionHost.toPath(typeRoot));
    }
}

function resolutionIsSymlink(resolution: ResolutionWithFailedLookupLocations) {
    return !!(
        (resolution as ResolvedModuleWithFailedLookupLocations).resolvedModule?.originalPath ||
        (resolution as ResolvedTypeReferenceDirectiveWithFailedLookupLocations).resolvedTypeReferenceDirective?.originalPath
    );
}
