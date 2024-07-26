import {
    CachedDirectoryStructureHost,
    clearMap,
    closeFileWatcher,
    closeFileWatcherOf,
    CompilerHostSupportingResolutionCache,
    CompilerOptions,
    createModeAwareCache,
    createModuleResolutionCache,
    CreateSourceFileOptions,
    createTypeReferenceDirectiveResolutionCache,
    createTypeReferenceResolutionLoader,
    Debug,
    Diagnostics,
    directorySeparator,
    DirectoryWatcherCallback,
    emptyArray,
    endsWith,
    Extension,
    fileExtensionIs,
    FileReference,
    FileWatcher,
    FileWatcherCallback,
    firstDefinedIterator,
    getAutomaticTypeDirectiveContainingFile,
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
    ModuleOrTypeReferenceResolutionCache,
    ModuleResolutionCache,
    moduleResolutionNameAndModeGetter,
    mutateMap,
    noopFileWatcher,
    normalizePath,
    packageIdToString,
    parseNodeModuleFromPath,
    Path,
    PathPathComponents,
    Program,
    removeSuffix,
    removeTrailingDirectorySeparator,
    resolutionExtensionIsTSOrJson,
    ResolutionLoader,
    ResolutionMode,
    ResolutionNameAndModeGetter,
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
    TypeReferenceDirectiveResolutionCache,
    typeReferenceResolutionNameAndModeGetter,
    updateResolutionField,
    WatchDirectoryFlags,
} from "./_namespaces/ts.js";

/** @internal */
export interface HasInvalidatedFromResolutionCache {
    hasInvalidatedResolutions: HasInvalidatedResolutions;
    hasInvalidatedLibResolutions: HasInvalidatedLibResolutions;
}
/** @internal */
export type CallbackOnNewResolution<T extends ResolutionWithFailedLookupLocations> = (
    existing: T | undefined,
    current: T,
    path: Path,
    name: string,
    mode: ResolutionMode,
) => void;
/**
 * This is the cache of module/typedirectives resolution that can be retained across program
 *
 * @internal
 */
export interface ResolutionCache extends Required<CompilerHostSupportingResolutionCache> {
    rootDirForResolution: string;
    resolvedModuleNames: Map<Path, ModeAwareCache<ResolvedModuleWithFailedLookupLocations>>;
    resolvedTypeReferenceDirectives: Map<Path, ModeAwareCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>>;
    resolvedLibraries: Map<string, ResolvedModuleWithFailedLookupLocations>;
    moduleResolutionCache: ModuleResolutionCache;
    typeReferenceDirectiveResolutionCache: TypeReferenceDirectiveResolutionCache;
    libraryResolutionCache: ModuleResolutionCache;
    resolvedFileToResolution: Map<Path, Set<ResolutionWithFailedLookupLocations>>;
    resolutionsWithFailedLookups: Set<ResolutionWithFailedLookupLocations>;
    resolutionsWithOnlyAffectingLocations: Set<ResolutionWithFailedLookupLocations>;
    packageJsonRefCount: Map<Path, number>;
    directoryWatchesOfFailedLookups: Map<Path, DirectoryWatchesOfFailedLookup>;
    fileWatchesOfAffectingLocations: Map<string, FileWatcherOfAffectingLocation>;
    packageDirWatchers: Map<Path, PackageDirWatcher>;
    dirPathToSymlinkPackageRefCount: Map<Path, number>;

    countResolutionsResolvedWithGlobalCache(): number;
    countResolutionsResolvedWithoutGlobalCache(): number;
    watchResolution<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>(
        resolution: T,
        filePath: Path,
        getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>,
    ): void;

    resolveModuleNameLiterals(
        moduleLiterals: readonly StringLiteralLike[],
        containingFile: string,
        redirectedReference: ResolvedProjectReference | undefined,
        options: CompilerOptions,
        containingSourceFile: SourceFile,
        reusedNames: readonly StringLiteralLike[] | undefined,
        onNewResolution?: CallbackOnNewResolution<ResolvedModuleWithFailedLookupLocations>,
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
    invalidateResolutionsWithGlobalCachePass(): void;
    invalidateResolutionsWithoutGlobalCachePass(): void;
    invalidateUnresolvedResolutionsWithGlobalCachePass(): void;
    invalidateResolutionOfFile(filePath: Path): void;
    removeResolutionsOfFile(filePath: Path): void;
    removeResolutionsFromProjectReferenceRedirects(filePath: Path): void;
    createHasInvalidatedResolutions(
        customHasInvalidatedResolutions: HasInvalidatedResolutions,
        customHasInvalidatedLibResolutions: HasInvalidatedLibResolutions,
    ): HasInvalidatedFromResolutionCache;
    hasChangedAutomaticTypeDirectiveNames(): boolean;

    startCachingPerDirectoryResolution(): void;
    finishCachingPerDirectoryResolution(
        newProgram: Program | undefined,
        oldProgram: Program | undefined,
        skipCacheCompact?: boolean,
    ): void;
    compactCaches(newProgram: Program | undefined): void;

    updateTypeRootsWatch(): void;
    closeTypeRootsWatch(): void;
    clear(): void;
    onChangesAffectModuleResolution(): void;
}

/** @internal */
export interface WatchedResolutionWithFailedLookupLocations {
    isInvalidated?: boolean;
    // Files that have this resolution using
    files?: Set<Path>;
    watchedFailed?: number;
    watchedAffected?: number;
    setAtRoot?: boolean;
}

/** @internal */
export type ResolutionWithFailedLookupLocations =
    | ResolvedModuleWithFailedLookupLocations
    | (
        & ResolvedTypeReferenceDirectiveWithFailedLookupLocations
        // Just so we can use this directly. These any ways are optional properties
        & Pick<ResolvedModuleWithFailedLookupLocations, "alternateResult" | "globalCacheResolution">
    );

declare module "./types.js" {
    /** @internal */
    export interface ResolvedModuleWithFailedLookupLocations extends WatchedResolutionWithFailedLookupLocations {
    }
    /** @internal */
    export interface ResolvedTypeReferenceDirectiveWithFailedLookupLocations extends WatchedResolutionWithFailedLookupLocations {
    }
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

/** @internal */
export function needsResolutionFromGlobalCache(moduleName: string, resolution: ResolvedModuleWithFailedLookupLocations): boolean {
    return !isExternalModuleNameRelative(moduleName) && isUnresolvedOrResolvedToJs(resolution);
}

/** @internal */
export function isUnresolvedOrResolvedToJs(resolution: ResolvedModuleWithFailedLookupLocations): boolean {
    return !resolution.resolvedModule || !resolutionExtensionIsTSOrJson(resolution.resolvedModule.extension);
}

function isResolvedWithGlobalCachePass(resolution: ResolutionWithFailedLookupLocations): resolution is ResolvedModuleWithFailedLookupLocations {
    return !!resolution.globalCacheResolution;
}

function isResolvedWithoutGlobalCachePass(resolution: ResolutionWithFailedLookupLocations) {
    return resolution.globalCacheResolution === false;
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
    if (
        !resolutionHost.getGlobalTypingsCacheLocation ||
        primaryResult.globalCacheResolution !== undefined ||
        !needsResolutionFromGlobalCache(moduleName, primaryResult)
    ) return primaryResult;

    // otherwise try to load typings from @types
    const globalCache = resolutionHost.getGlobalTypingsCacheLocation();
    if (globalCache === undefined) {
        primaryResult.globalCacheResolution = false;
        return primaryResult;
    }

    // create different collection of failed lookup locations for second pass
    // if it will fail and we've already found something during the first pass - we don't want to pollute its results
    primaryResult.globalCacheResolution = {
        resolution: loadModuleFromGlobalCache(
            Debug.checkDefined(resolutionHost.globalCacheResolutionModuleName)(moduleName),
            resolutionHost.projectName,
            compilerOptions,
            host,
            globalCache,
            moduleResolutionCache,
        ),
        primary: primaryResult.resolvedModule,
    };
    if (primaryResult.globalCacheResolution.resolution.resolvedModule) {
        // Modify existing resolution so its saved in the directory cache as well
        (primaryResult.resolvedModule as any) = primaryResult.globalCacheResolution.resolution.resolvedModule;
        primaryResult.failedLookupLocations = updateResolutionField(primaryResult.failedLookupLocations, primaryResult.globalCacheResolution.resolution.failedLookupLocations);
        primaryResult.affectingLocations = updateResolutionField(primaryResult.affectingLocations, primaryResult.globalCacheResolution.resolution.affectingLocations);
        primaryResult.resolutionDiagnostics = updateResolutionField(primaryResult.resolutionDiagnostics, primaryResult.globalCacheResolution.resolution.resolutionDiagnostics);
    }
    return primaryResult;
}

/** @internal */
export type GetResolutionWithResolvedFileName<T extends ResolutionWithFailedLookupLocations = ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName = ResolutionWithResolvedFileName> = (resolution: T) => R | undefined;

function getModuleOrTypeRefResolved(resolution: ResolutionWithFailedLookupLocations) {
    return (resolution as ResolvedModuleWithFailedLookupLocations).resolvedModule ??
        (resolution as ResolvedTypeReferenceDirectiveWithFailedLookupLocations).resolvedTypeReferenceDirective;
}

/** @internal */
export function createResolutionCache(
    resolutionHost: ResolutionCacheHost,
    rootDirForResolution: string,
): ResolutionCache {
    let filesWithInvalidatedResolutions: Set<Path> | undefined;

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
    let resolutionsWithGlobalCachePassAreInvalidated = false;
    let resolutionsWithoutGlobalCachePassAreInvalidated = false;
    let unresolvedResolutionsWithGlobalCachePassAreInvalidated = false;

    let potentiallyUnreferencedResolutions: Map<ModuleOrTypeReferenceResolutionCache<ResolutionWithFailedLookupLocations>, Set<ResolutionWithFailedLookupLocations>> | undefined;
    let potentiallyUnreferencedDirWatchers: Set<Path> | undefined;
    let newUnresolvedResolutionCachePassResolutions: Set<ResolutionWithFailedLookupLocations> | undefined;

    const getCurrentDirectory = memoize(() => resolutionHost.getCurrentDirectory!());
    const cachedDirectoryStructureHost = resolutionHost.getCachedDirectoryStructureHost();

    // The resolvedModuleNames and resolvedTypeReferenceDirectives are the cache of resolutions per file.
    // The key in the map is source file's path.
    // The values are Map of resolutions with key being name lookedup.
    const resolvedModuleNames = new Map<Path, ModeAwareCache<ResolvedModuleWithFailedLookupLocations>>();
    const moduleResolutionCache = createModuleResolutionCache(
        getCurrentDirectory(),
        resolutionHost.getCanonicalFileName,
        resolutionHost.getCompilationSettings(),
        /*packageJsonInfoCache*/ undefined,
        /*optionsToRedirectsKey*/ undefined,
        getValidResolution,
    );

    const resolvedTypeReferenceDirectives = new Map<Path, ModeAwareCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>>();
    const typeReferenceDirectiveResolutionCache: TypeReferenceDirectiveResolutionCache = createTypeReferenceDirectiveResolutionCache(
        getCurrentDirectory(),
        resolutionHost.getCanonicalFileName,
        resolutionHost.getCompilationSettings(),
        moduleResolutionCache.getPackageJsonInfoCache(),
        moduleResolutionCache.optionsToRedirectsKey,
        getValidResolution,
    );

    const resolvedLibraries = new Map<string, ResolvedModuleWithFailedLookupLocations>();
    const libraryResolutionCache = createModuleResolutionCache(
        getCurrentDirectory(),
        resolutionHost.getCanonicalFileName,
        getOptionsForLibraryResolution(resolutionHost.getCompilationSettings()),
        moduleResolutionCache.getPackageJsonInfoCache(),
        /*optionsToRedirectsKey*/ undefined,
        getValidResolution,
    );

    let resolutionsResolvedWithGlobalCache = 0;
    let resolutionsResolvedWithoutGlobalCache = 0;

    const packageJsonRefCount = new Map<Path, number>();
    let potentiallyUnwatchedPackageJsons: Set<Path> | undefined;
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
        moduleResolutionCache,
        typeReferenceDirectiveResolutionCache,
        libraryResolutionCache,
        resolvedFileToResolution,
        resolutionsWithFailedLookups,
        resolutionsWithOnlyAffectingLocations,
        packageJsonRefCount,
        directoryWatchesOfFailedLookups,
        fileWatchesOfAffectingLocations,
        packageDirWatchers,
        dirPathToSymlinkPackageRefCount,
        countResolutionsResolvedWithGlobalCache: () => resolutionsResolvedWithGlobalCache,
        countResolutionsResolvedWithoutGlobalCache: () => resolutionsResolvedWithoutGlobalCache,
        watchResolution,
        // perDirectoryResolvedModuleNames and perDirectoryResolvedTypeReferenceDirectives could be non empty if there was exception during program update
        // (between startCachingPerDirectoryResolution and finishCachingPerDirectoryResolution)
        startCachingPerDirectoryResolution,
        finishCachingPerDirectoryResolution,
        compactCaches,
        resolveModuleNameLiterals,
        resolveTypeReferenceDirectiveReferences,
        onReusedModuleResolutions,
        onReusedTypeReferenceDirectiveResolutions,
        onSourceFileNotCreated,
        resolveLibrary,
        resolveSingleModuleNameWithoutWatching,
        removeResolutionsFromProjectReferenceRedirects,
        removeResolutionsOfFile,
        hasChangedAutomaticTypeDirectiveNames: () => hasChangedAutomaticTypeDirectiveNames,
        invalidateResolutionOfFile,
        invalidateResolutionsOfFailedLookupLocations,
        invalidateResolutionsWithGlobalCachePass,
        invalidateResolutionsWithoutGlobalCachePass,
        invalidateUnresolvedResolutionsWithGlobalCachePass,
        createHasInvalidatedResolutions,
        updateTypeRootsWatch,
        closeTypeRootsWatch,
        clear,
        onChangesAffectModuleResolution,
    };

    function clear() {
        potentiallyUnreferencedResolutions = undefined;
        potentiallyUnreferencedDirWatchers = undefined;
        potentiallyUnwatchedPackageJsons = undefined;
        newUnresolvedResolutionCachePassResolutions = undefined;
        clearMap(directoryWatchesOfFailedLookups, closeFileWatcherOf);
        clearMap(fileWatchesOfAffectingLocations, closeFileWatcherOf);
        packageJsonRefCount.clear();
        isSymlinkCache.clear();
        packageDirWatchers.clear();
        dirPathToSymlinkPackageRefCount.clear();
        closeTypeRootsWatch();
        resolvedModuleNames.clear();
        resolvedTypeReferenceDirectives.clear();
        resolvedFileToResolution.clear();
        resolutionsWithFailedLookups.clear();
        resolutionsWithOnlyAffectingLocations.clear();
        resolutionsResolvedWithGlobalCache = 0;
        resolutionsResolvedWithoutGlobalCache = 0;
        failedLookupChecks = undefined;
        startsWithPathChecks = undefined;
        isInDirectoryChecks = undefined;
        affectingPathChecks = undefined;
        affectingPathChecksForFile = undefined;
        allModuleAndTypeResolutionsAreInvalidated = false;
        resolutionsWithGlobalCachePassAreInvalidated = false;
        resolutionsWithoutGlobalCachePassAreInvalidated = false;
        unresolvedResolutionsWithGlobalCachePassAreInvalidated = false;
        moduleResolutionCache.clear();
        typeReferenceDirectiveResolutionCache.clear();
        libraryResolutionCache.clear();
        impliedFormatPackageJsons.clear();
        resolvedLibraries.clear();
        hasChangedAutomaticTypeDirectiveNames = false;
    }

    function onChangesAffectModuleResolution() {
        allModuleAndTypeResolutionsAreInvalidated = true;
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
                resolutionsWithGlobalCachePassAreInvalidated ||
                resolutionsWithoutGlobalCachePassAreInvalidated ||
                unresolvedResolutionsWithGlobalCachePassAreInvalidated ||
                !!collected?.has(path),
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
        isSymlinkCache.clear();
        moduleResolutionCache.update(resolutionHost.getCompilationSettings());
        typeReferenceDirectiveResolutionCache.update(resolutionHost.getCompilationSettings());
    }

    function cleanupLibResolutionWatching(newProgram: Program | undefined) {
        resolvedLibraries.forEach((resolution, libFileName) => {
            if (!newProgram?.resolvedLibReferences?.has(libFileName)) {
                stopWatchFailedLookupLocationOfResolution(
                    resolution,
                    resolutionHost.toPath(getInferredLibraryNameResolveFrom(resolutionHost.getCompilationSettings(), getCurrentDirectory(), libFileName)),
                    libraryResolutionCache,
                );
                resolvedLibraries.delete(libFileName);
            }
        });
    }

    function finishCachingPerDirectoryResolution(
        newProgram: Program | undefined,
        oldProgram: Program | undefined,
        skipCacheCompact?: boolean,
    ) {
        allModuleAndTypeResolutionsAreInvalidated = false;
        resolutionsWithGlobalCachePassAreInvalidated = false;
        resolutionsWithoutGlobalCachePassAreInvalidated = false;
        unresolvedResolutionsWithGlobalCachePassAreInvalidated = false;
        newUnresolvedResolutionCachePassResolutions = undefined;
        let potentiallyUnReferencedFileWatcherOfAffectingLocation: Map<string, FileWatcherOfAffectingLocation> | undefined;
        // Update file watches
        if (newProgram !== oldProgram) {
            const releaseFileWatcherOfAffectingLocation = (location: string) => {
                const watcher = fileWatchesOfAffectingLocations.get(location)!;
                watcher.files--;
                (potentiallyUnReferencedFileWatcherOfAffectingLocation ??= new Map()).set(location, watcher);
            };
            cleanupLibResolutionWatching(newProgram);
            newProgram?.getSourceFiles().forEach(newFile => {
                const expected = newFile.packageJsonLocations?.length ?? 0;
                const existing = impliedFormatPackageJsons.get(newFile.resolvedPath) ?? emptyArray;
                for (let i = existing.length; i < expected; i++) {
                    createFileWatcherOfAffectingLocation(newFile.packageJsonLocations![i], /*forResolution*/ false);
                }
                if (existing.length > expected) {
                    for (let i = expected; i < existing.length; i++) {
                        releaseFileWatcherOfAffectingLocation(existing[i]);
                    }
                }
                if (expected) impliedFormatPackageJsons.set(newFile.resolvedPath, newFile.packageJsonLocations!);
                else impliedFormatPackageJsons.delete(newFile.resolvedPath);
            });
            impliedFormatPackageJsons.forEach((existing, path) => {
                const newFile = newProgram?.getSourceFileByPath(path);
                if (!newFile || newFile.resolvedPath !== path) {
                    existing.forEach(releaseFileWatcherOfAffectingLocation);
                    impliedFormatPackageJsons.delete(path);
                }
            });
        }
        potentiallyUnReferencedFileWatcherOfAffectingLocation?.forEach(closeFileWatcherOfAffectingLocation);
        potentiallyUnReferencedFileWatcherOfAffectingLocation = undefined;
        // These are only dir watchers that were potentially removed because packageDir symlink status changed while watching resolutions
        potentiallyUnreferencedDirWatchers?.forEach(path =>
            closeDirectoryWatchesOfFailedLookup(
                directoryWatchesOfFailedLookups.get(path)!,
                path,
            )
        );
        potentiallyUnreferencedDirWatchers = undefined;
        if (potentiallyUnreferencedResolutions) {
            potentiallyUnreferencedResolutions.forEach(gcModuleOrTypeRefCache);
            potentiallyUnreferencedResolutions = undefined;
        }
        hasChangedAutomaticTypeDirectiveNames = false;
        potentiallyUnwatchedPackageJsons?.forEach(releasePotentiallyUnwatchedPackageJson);
        potentiallyUnwatchedPackageJsons = undefined;
        if (!skipCacheCompact) compactCaches(newProgram);
        moduleResolutionCache.isReadonly = true;
        typeReferenceDirectiveResolutionCache.isReadonly = true;
        libraryResolutionCache.isReadonly = true;
        moduleResolutionCache.getPackageJsonInfoCache().isReadonly = true;
        isSymlinkCache.clear();
    }

    function compactCaches(newProgram: Program | undefined) {
        const availableOptions = new Set<CompilerOptions>();
        if (newProgram) {
            availableOptions.add(newProgram.getCompilerOptions());
            newProgram.forEachResolvedProjectReference(ref => {
                availableOptions.add(ref.commandLine.options);
            });
        }
        moduleResolutionCache.compact(availableOptions, /*skipOptionsToRedirectsKeyCleanup*/ true);
        typeReferenceDirectiveResolutionCache.compact(availableOptions);
        libraryResolutionCache.compact();
    }

    function gcModuleOrTypeRefCache(
        setOfResolutions: Set<ResolutionWithFailedLookupLocations>,
        cache: ModuleOrTypeReferenceResolutionCache<ResolutionWithFailedLookupLocations>,
    ) {
        let needsGc = false;
        setOfResolutions.forEach(resolution => {
            if (resolution.files!.size) return;
            needsGc = true;
            releaseResolution(resolution);
        });
        if (needsGc) {
            // Iterate through maps to remove things that have 0 refCount
            cache.directoryToModuleNameMap.forEach((resolutions, dir, redirectsCacheKey, directoryToModuleNameMap) => {
                resolutions.forEach((resolution, name, mode, key) => {
                    if (resolution.files?.size) return;
                    resolutions.delete(name, mode);
                    if (!isExternalModuleNameRelative(name)) {
                        const moduleNameToDirectoryMap = !redirectsCacheKey ?
                            cache.moduleNameToDirectoryMap.getOwnMap() :
                            cache.moduleNameToDirectoryMap.redirectsKeyToMap.get(redirectsCacheKey);
                        const directoryMap = moduleNameToDirectoryMap?.get(key);
                        directoryMap?.deleteByPath(dir);
                        if (!directoryMap?.directoryPathMap.size) moduleNameToDirectoryMap!.delete(key);
                    }
                });
                if (!resolutions.size()) directoryToModuleNameMap.delete(dir);
            });
        }
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

    function releasePotentiallyUnwatchedPackageJson(path: Path) {
        if (!packageJsonRefCount.has(path)) moduleResolutionCache.getPackageJsonInfoCache().getInternalMap()?.delete(path);
    }

    function releasePackageJsonCachePath(path: Path) {
        moduleResolutionCache.getPackageJsonInfoCache().getInternalMap()?.delete(path);
        packageJsonRefCount.delete(path);
    }

    function releasePackageJson(path: Path) {
        const existing = packageJsonRefCount.get(path)!;
        if (existing !== 1) packageJsonRefCount.set(path, existing - 1);
        else releasePackageJsonCachePath(path);
    }

    function addRefToPackageJson(path: Path) {
        packageJsonRefCount.set(path, (packageJsonRefCount.get(path) ?? 0) + 1);
    }

    function closeFileWatcherOfAffectingLocation(watcher: FileWatcherOfAffectingLocation, path: string) {
        if (watcher.files === 0 && watcher.resolutions === 0 && !watcher.symlinks?.size) {
            fileWatchesOfAffectingLocations.delete(path);
            releasePackageJson(resolutionHost.toPath(path));
            watcher.watcher.close();
        }
    }

    function onSourceFileNotCreated(sourceFileOptions: CreateSourceFileOptions) {
        sourceFileOptions.packageJsonLocations?.forEach(addToPotentiallyUnwatchedPackageJsons);
    }

    function getValidResolution<T extends ResolutionWithFailedLookupLocations>(resolution: T | undefined) {
        return isInvalidatedResolution(resolution) ? undefined : resolution;
    }

    function isInvalidatedResolution(resolution: ResolutionWithFailedLookupLocations | undefined) {
        return !resolution ||
            resolution.isInvalidated ||
            (resolutionsWithGlobalCachePassAreInvalidated && isResolvedWithGlobalCachePass(resolution)) ||
            (resolutionsWithoutGlobalCachePassAreInvalidated && isResolvedWithoutGlobalCachePass(resolution)) ||
            // If this is not a new resolution and its unresolved, its invalid
            (!newUnresolvedResolutionCachePassResolutions?.has(resolution) && isInvalidatedUnResolvedGlobalCachePassResolution(resolution));
    }

    function isInvalidatedUnResolvedGlobalCachePassResolution(resolution: ResolutionWithFailedLookupLocations) {
        return unresolvedResolutionsWithGlobalCachePassAreInvalidated &&
            isResolvedWithGlobalCachePass(resolution) &&
            isUnresolvedOrResolvedToJs(resolution);
    }

    interface ResolveNamesWithLocalCacheInput<Entry, SourceFile, T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName> {
        entries: readonly Entry[];
        containingFile: string;
        containingSourceFile: SourceFile;
        redirectedReference: ResolvedProjectReference | undefined;
        options: CompilerOptions;
        reusedNames?: readonly Entry[];
        perFileCache: Map<Path, ModeAwareCache<T>>;
        moduleOrTypeRefCache: ModuleOrTypeReferenceResolutionCache<T>;
        loader: ResolutionLoader<Entry, T, SourceFile>;
        getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>;
        onNewResolution?: CallbackOnNewResolution<T>;
    }
    function resolveNamesWithLocalCache<Entry, SourceFile, T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>({
        entries,
        containingFile,
        containingSourceFile,
        redirectedReference,
        options,
        perFileCache,
        moduleOrTypeRefCache,
        reusedNames,
        loader,
        getResolutionWithResolvedFileName,
        onNewResolution,
    }: ResolveNamesWithLocalCacheInput<Entry, SourceFile, T, R>): readonly T[] {
        const path = resolutionHost.toPath(containingFile);
        const resolutionsInFile = perFileCache.get(path) || perFileCache.set(path, createModeAwareCache()).get(path)!;
        const resolvedModules: T[] = [];

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
                (
                    allModuleAndTypeResolutionsAreInvalidated ||
                    unmatchedRedirects ||
                    isInvalidatedResolution(resolution)
                )
            ) {
                const existingResolution = resolution;
                resolution = loader.resolve(name, mode);
                if (resolutionHost.onDiscoveredSymlink && resolutionIsSymlink(resolution)) {
                    resolutionHost.onDiscoveredSymlink();
                }
                resolutionsInFile.set(name, mode, resolution);
                if (resolution !== existingResolution) {
                    watchResolution(resolution, path, getResolutionWithResolvedFileName);
                    if (existingResolution) {
                        stopWatchFailedLookupLocationOfResolution(existingResolution, path, moduleOrTypeRefCache);
                    }
                }
                // Store new resolutions that are unresolved during global cache pass so we dont see them as invalidated and calculate resolution again
                if (isInvalidatedUnResolvedGlobalCachePassResolution(resolution)) {
                    (newUnresolvedResolutionCachePassResolutions ??= new Set()).add(resolution);
                }
                onNewResolution?.(existingResolution, resolution, path, name, mode);
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
        onReusedResolutions({
            reusedNames,
            containingSourceFile,
            redirectedReference,
            options,
            path,
            resolutionsInFile,
            seenNamesInFile,
            nameAndModeGetter: loader.nameAndMode,
            moduleOrTypeRefCache,
        });
        return resolvedModules;
    }

    interface OnReusedResolutionsInput<Entry, SourceFile, T extends ResolutionWithFailedLookupLocations> {
        reusedNames: readonly Entry[] | undefined;
        containingSourceFile: SourceFile;
        redirectedReference: ResolvedProjectReference | undefined;
        options: CompilerOptions;
        path: Path;
        resolutionsInFile: ModeAwareCache<T> | undefined;
        seenNamesInFile?: ModeAwareCache<true>;
        nameAndModeGetter: ResolutionNameAndModeGetter<Entry, SourceFile>;
        moduleOrTypeRefCache: ModuleOrTypeReferenceResolutionCache<T>;
    }
    function onReusedResolutions<Entry, SourceFile, T extends ResolutionWithFailedLookupLocations>({
        reusedNames,
        containingSourceFile,
        redirectedReference,
        options,
        path,
        resolutionsInFile,
        seenNamesInFile,
        nameAndModeGetter,
        moduleOrTypeRefCache,
    }: OnReusedResolutionsInput<Entry, SourceFile, T>) {
        if (!resolutionsInFile) return;
        if (!seenNamesInFile) seenNamesInFile = createModeAwareCache();
        reusedNames?.forEach(entry =>
            seenNamesInFile.set(
                nameAndModeGetter.getName(entry),
                nameAndModeGetter.getMode(entry, containingSourceFile, redirectedReference?.commandLine.options || options),
                true,
            )
        );
        if (resolutionsInFile.size() !== seenNamesInFile.size()) {
            // Stop watching and remove the unused name
            resolutionsInFile.forEach((resolution, name, mode) => {
                if (!seenNamesInFile.has(name, mode)) {
                    stopWatchFailedLookupLocationOfResolution(resolution, path, moduleOrTypeRefCache);
                    resolutionsInFile.delete(name, mode);
                }
            });
        }
    }

    function onReusedModuleResolutions(
        reusedNames: readonly StringLiteralLike[] | undefined,
        containingSourceFile: SourceFile,
        redirectedReference: ResolvedProjectReference | undefined,
        options: CompilerOptions,
    ) {
        onReusedResolutions({
            reusedNames,
            containingSourceFile,
            redirectedReference,
            options,
            path: containingSourceFile.path,
            resolutionsInFile: resolvedModuleNames.get(containingSourceFile.path),
            nameAndModeGetter: moduleResolutionNameAndModeGetter,
            moduleOrTypeRefCache: moduleResolutionCache,
        });
    }

    function onReusedTypeReferenceDirectiveResolutions<T extends FileReference | string>(
        reusedNames: readonly T[] | undefined,
        containingSourceFile: SourceFile | undefined,
        redirectedReference: ResolvedProjectReference | undefined,
        options: CompilerOptions,
    ) {
        const path = containingSourceFile ?
            containingSourceFile.path :
            resolutionHost.toPath(getAutomaticTypeDirectiveContainingFile(resolutionHost.getCompilationSettings(), getCurrentDirectory()));
        onReusedResolutions({
            reusedNames,
            containingSourceFile,
            redirectedReference,
            options,
            path,
            resolutionsInFile: resolvedTypeReferenceDirectives.get(path),
            nameAndModeGetter: typeReferenceResolutionNameAndModeGetter,
            moduleOrTypeRefCache: typeReferenceDirectiveResolutionCache,
        });
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
            moduleOrTypeRefCache: typeReferenceDirectiveResolutionCache,
            loader: createTypeReferenceResolutionLoader(
                containingFile,
                redirectedReference,
                options,
                getModuleResolutionHost(resolutionHost),
                typeReferenceDirectiveResolutionCache,
            ),
            getResolutionWithResolvedFileName: getResolvedTypeReferenceDirectiveFromResolution,
        });
    }

    function resolveModuleNameLiterals(
        moduleLiterals: readonly StringLiteralLike[],
        containingFile: string,
        redirectedReference: ResolvedProjectReference | undefined,
        options: CompilerOptions,
        containingSourceFile: SourceFile,
        reusedNames: readonly StringLiteralLike[] | undefined,
        onNewResolution?: CallbackOnNewResolution<ResolvedModuleWithFailedLookupLocations>,
    ): readonly ResolvedModuleWithFailedLookupLocations[] {
        return resolveNamesWithLocalCache({
            entries: moduleLiterals,
            containingFile,
            containingSourceFile,
            redirectedReference,
            options,
            reusedNames,
            perFileCache: resolvedModuleNames,
            moduleOrTypeRefCache: moduleResolutionCache,
            loader: createModuleResolutionLoaderUsingGlobalCache(
                containingFile,
                redirectedReference,
                options,
                resolutionHost,
                moduleResolutionCache,
            ),
            getResolutionWithResolvedFileName: getResolvedModuleFromResolution,
            onNewResolution,
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
        if (isInvalidatedResolution(resolution)) {
            const existingResolution = resolution;
            resolution = ts_resolveLibrary(libraryName, resolveFrom, options, host, libraryResolutionCache);
            const path = resolutionHost.toPath(resolveFrom);
            watchResolution(resolution, path, getResolvedModuleFromResolution);
            resolvedLibraries.set(libFileName, resolution);
            if (existingResolution) {
                stopWatchFailedLookupLocationOfResolution(existingResolution, path, libraryResolutionCache);
            }
        }
        else {
            if (isTraceEnabled(options, host)) {
                const resolved = getResolvedModuleFromResolution(resolution!);
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
        return resolution!;
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

    function watchResolution<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>(
        resolution: T,
        filePath: Path,
        getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>,
    ) {
        const firstTime = !resolution.files;
        (resolution.files ??= new Set()).add(filePath);
        watchFailedLookupLocationOfResolution(resolution);
        watchAffectingLocationsOfResolution(resolution);
        if (!firstTime) return;
        if (resolution.globalCacheResolution && !resolution.globalCacheResolution.resolution.resolvedModule) {
            // Add to potentially unreferenced resolutions
            resolution.globalCacheResolution.resolution.failedLookupLocations?.forEach(
                addToPotentiallyUnwatchedPackageJsonsIfPackageJson,
            );
            if (resolution.globalCacheResolution.resolution.alternateResult) addToPotentiallyUnwatchedPackageJsonsIfPackageJson(resolution.globalCacheResolution.resolution.alternateResult);
            resolution.globalCacheResolution.resolution.affectingLocations?.forEach(addToPotentiallyUnwatchedPackageJsons);
        }
        if (isResolvedWithGlobalCachePass(resolution)) resolutionsResolvedWithGlobalCache++;
        else if (isResolvedWithoutGlobalCachePass(resolution)) resolutionsResolvedWithoutGlobalCache++;
        const resolved = getResolutionWithResolvedFileName(resolution);
        if (resolved && resolved.resolvedFileName) {
            const key = resolutionHost.toPath(resolved.resolvedFileName);
            let resolutions = resolvedFileToResolution.get(key);
            if (!resolutions) resolvedFileToResolution.set(key, resolutions = new Set());
            resolutions.add(resolution);
        }
    }

    function addToPotentiallyUnwatchedPackageJsonsIfPackageJson(location: string) {
        if (endsWith(location, "/package.json")) addToPotentiallyUnwatchedPackageJsons(location);
    }

    function addToPotentiallyUnwatchedPackageJsons(location: string) {
        (potentiallyUnwatchedPackageJsons ??= new Set()).add(resolutionHost.toPath(location));
    }

    function watchFailedLookupLocation(failedLookupLocation: string) {
        const failedLookupLocationPath = resolutionHost.toPath(failedLookupLocation);
        if (endsWith(failedLookupLocationPath, "/package.json")) addRefToPackageJson(failedLookupLocationPath);
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
        if (!toWatch) return;
        const { dir, dirPath, nonRecursive, packageDir, packageDirPath } = toWatch;
        if (dirPath === rootPath) {
            Debug.assert(nonRecursive);
            Debug.assert(!packageDir);
            return true;
        }
        else {
            setDirectoryWatcher(dir, dirPath, packageDir, packageDirPath, nonRecursive);
        }
    }

    function watchFailedLookupLocationOfResolution(resolution: ResolutionWithFailedLookupLocations) {
        Debug.assert(!!resolution.files?.size);

        const { failedLookupLocations, alternateResult, watchedFailed } = resolution;
        // There have to be failed lookup locations if there is alternateResult so storing failedLookupLocation length is good enough,
        // alternateResult doesnt change later only failed lookup locations get added on
        if (watchedFailed === failedLookupLocations?.length) return;
        if (!watchedFailed) {
            resolutionsWithFailedLookups.add(resolution);
            if (resolution.watchedAffected) resolutionsWithOnlyAffectingLocations.delete(resolution);
        }

        let setAtRoot = !!resolution.setAtRoot;
        for (let i = watchedFailed || 0; i < failedLookupLocations!.length; i++) {
            setAtRoot = watchFailedLookupLocation(failedLookupLocations![i]) || setAtRoot;
        }
        if (!watchedFailed && alternateResult) setAtRoot = watchFailedLookupLocation(alternateResult) || setAtRoot;
        if (!resolution.setAtRoot && setAtRoot) {
            // This is always non recursive
            setDirectoryWatcher(rootDir, rootPath, /*packageDir*/ undefined, /*packageDirPath*/ undefined, /*nonRecursive*/ true);
        }
        resolution.watchedFailed = failedLookupLocations?.length;
        resolution.setAtRoot = setAtRoot;
    }

    function watchAffectingLocationsOfResolution(resolution: ResolutionWithFailedLookupLocations) {
        Debug.assert(!!resolution.files?.size);
        const { affectingLocations, watchedAffected } = resolution;
        if (affectingLocations?.length === watchedAffected) return;
        if (!watchedAffected && !resolution.watchedFailed) resolutionsWithOnlyAffectingLocations.add(resolution);
        // Watch package json
        for (let i = watchedAffected || 0; i < affectingLocations!.length; i++) {
            createFileWatcherOfAffectingLocation(affectingLocations![i], /*forResolution*/ true);
        }
        resolution.watchedAffected = affectingLocations?.length;
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
                        invalidateAffectingFileWatcher(locationToWatch);
                        resolutionHost.scheduleInvalidateResolutionsOfFailedLookupLocations();
                    }) : noopFileWatcher,
                resolutions: isSymlink ? 0 : resolutions,
                files: isSymlink ? 0 : files,
                symlinks: undefined,
            };
            fileWatchesOfAffectingLocations.set(locationToWatch, watcher);
            addRefToPackageJson(resolutionHost.toPath(locationToWatch));
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
                            releasePackageJson(resolutionHost.toPath(locationToWatch));
                            symlinkWatcher.watcher.close();
                        }
                    },
                },
                resolutions,
                files,
                symlinks: undefined,
            };
            fileWatchesOfAffectingLocations.set(affectingLocation, watcher);
            addRefToPackageJson(resolutionHost.toPath(affectingLocation));
            (symlinkWatcher.symlinks ??= new Set()).add(affectingLocation);
        }
    }

    function invalidateAffectingFileWatcher(path: string) {
        const watcher = fileWatchesOfAffectingLocations.get(path);
        if (watcher?.resolutions) (affectingPathChecks ??= new Set()).add(path);
        if (watcher?.files) (affectingPathChecksForFile ??= new Set()).add(path);
        moduleResolutionCache.getPackageJsonInfoCache().getInternalMap()?.delete(resolutionHost.toPath(path));
        watcher?.symlinks?.forEach(path => invalidateAffectingFileWatcher(path));
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
                    removeDirectoryWatcher(packageDirWatcher!.isSymlink ? packageDirPath : dirPath, /*delayed*/ true);
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

    function stopWatchFailedLookupLocation(failedLookupLocation: string) {
        const failedLookupLocationPath = resolutionHost.toPath(failedLookupLocation);
        if (endsWith(failedLookupLocationPath, "/package.json")) releasePackageJson(failedLookupLocationPath);
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
        if (!toWatch) return;
        const { dirPath, packageDirPath } = toWatch;
        if (dirPath === rootPath) return;
        if (packageDirPath && resolutionHost.realpath) {
            const packageDirWatcher = packageDirWatchers.get(packageDirPath)!;
            const forDirPath = packageDirWatcher.dirPathToWatcher.get(dirPath)!;
            forDirPath.refCount--;
            if (forDirPath.refCount === 0) {
                removeDirectoryWatcher(packageDirWatcher.isSymlink ? packageDirPath : dirPath, /*delayed*/ false);
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
                closePackageDirWatcher(packageDirWatcher, packageDirPath);
            }
        }
        else {
            removeDirectoryWatcher(dirPath, /*delayed*/ false);
        }
    }

    function stopWatchFailedLookupLocationOfResolution(
        resolution: ResolutionWithFailedLookupLocations,
        filePath: Path,
        cache: ModuleOrTypeReferenceResolutionCache<ResolutionWithFailedLookupLocations>,
    ) {
        Debug.assertIsDefined(resolution.files);
        resolution.files.delete(filePath);
        if (resolution.files.size) return;
        let setOfResolutions = potentiallyUnreferencedResolutions?.get(cache);
        if (!setOfResolutions) (potentiallyUnreferencedResolutions ??= new Map()).set(cache, setOfResolutions = new Set());
        setOfResolutions.add(resolution);
    }

    function releaseResolution(resolution: ResolutionWithFailedLookupLocations) {
        resolution.files = undefined;
        // Even if this is in cache, we cant reuse this resolution after this since we are not watching it any more
        resolution.isInvalidated = true;
        if (isResolvedWithGlobalCachePass(resolution)) resolutionsResolvedWithGlobalCache--;
        else if (isResolvedWithoutGlobalCachePass(resolution)) resolutionsResolvedWithoutGlobalCache--;
        const resolved = getModuleOrTypeRefResolved(resolution);
        if (resolved && resolved.resolvedFileName) {
            const key = resolutionHost.toPath(resolved.resolvedFileName);
            const resolutions = resolvedFileToResolution.get(key);
            if (resolutions?.delete(resolution) && !resolutions.size) resolvedFileToResolution.delete(key);
        }

        const { failedLookupLocations, affectingLocations, alternateResult, setAtRoot } = resolution;
        if (resolutionsWithFailedLookups.delete(resolution)) {
            if (failedLookupLocations) {
                for (const failedLookupLocation of failedLookupLocations) {
                    stopWatchFailedLookupLocation(failedLookupLocation);
                }
            }
            if (alternateResult) stopWatchFailedLookupLocation(alternateResult);
            if (setAtRoot) removeDirectoryWatcher(rootPath, /*delayed*/ false);
        }
        else if (affectingLocations?.length) {
            resolutionsWithOnlyAffectingLocations.delete(resolution);
        }

        if (affectingLocations) {
            for (const affectingLocation of affectingLocations) {
                const watcher = fileWatchesOfAffectingLocations.get(affectingLocation)!;
                watcher.resolutions--;
                closeFileWatcherOfAffectingLocation(watcher, affectingLocation);
            }
        }
    }

    function removeDirectoryWatcher(dirPath: Path, delayed: boolean) {
        const dirWatcher = directoryWatchesOfFailedLookups.get(dirPath)!;
        // Do not close the watcher yet since it might be needed by other failed lookup locations.
        dirWatcher.refCount--;
        if (!delayed) closeDirectoryWatchesOfFailedLookup(dirWatcher, dirPath);
        else (potentiallyUnreferencedDirWatchers ??= new Set()).add(dirPath);
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

    function removeResolutionsOfFileFromCache<T extends ResolutionWithFailedLookupLocations>(
        cache: Map<string, ModeAwareCache<T>>,
        filePath: Path,
        moduleOrTypeRefCache: ModuleOrTypeReferenceResolutionCache<T>,
    ) {
        // Deleted file, stop watching failed lookups for all the resolutions in the file
        const resolutions = cache.get(filePath);
        if (resolutions) {
            resolutions.forEach(resolution =>
                stopWatchFailedLookupLocationOfResolution(
                    resolution,
                    filePath,
                    moduleOrTypeRefCache,
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
        removeResolutionsOfFileFromCache(resolvedModuleNames, filePath, moduleResolutionCache);
        removeResolutionsOfFileFromCache(resolvedTypeReferenceDirectives, filePath, typeReferenceDirectiveResolutionCache);
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

    function invalidateResolutionsWithGlobalCachePass() {
        if (resolutionsResolvedWithGlobalCache) resolutionsWithGlobalCachePassAreInvalidated = true;
    }
    function invalidateResolutionsWithoutGlobalCachePass() {
        if (resolutionsResolvedWithoutGlobalCache) resolutionsWithoutGlobalCachePassAreInvalidated = true;
    }
    function invalidateUnresolvedResolutionsWithGlobalCachePass() {
        if (resolutionsResolvedWithGlobalCache) unresolvedResolutionsWithGlobalCachePassAreInvalidated = true;
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
