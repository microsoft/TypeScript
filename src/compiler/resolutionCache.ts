import {
    CachedDirectoryStructureHost,
    canWatchDirectoryOrFile,
    clearMap,
    closeFileWatcher,
    CompilerHostSupportingResolutionCache,
    CompilerOptions,
    createModeAwareCache,
    createModuleResolutionCache,
    createSharedResolutionCache,
    CreateSourceFileOptions,
    createTypeReferenceDirectiveResolutionCache,
    createTypeReferenceResolutionLoader,
    Debug,
    Diagnostics,
    DirectoryWatcherCallback,
    emptyArray,
    enableSharingModuleOrTypeReferenceResolutionCache,
    endsWith,
    Extension,
    fileExtensionIs,
    FileReference,
    FileWatcher,
    FileWatcherCallback,
    getAutomaticTypeDirectiveContainingFile,
    GetCanonicalFileName,
    getDirectoryPath,
    getEffectiveTypeRoots,
    getInferredLibraryNameResolveFrom,
    getNormalizedAbsolutePath,
    getPathComponents,
    GetResolutionWithResolvedFileName,
    getResolvedModuleFromResolution,
    getResolvedTypeReferenceDirectiveFromResolution,
    HasInvalidatedLibResolutions,
    HasInvalidatedResolutions,
    inferredTypesContainingFile,
    isDiskPathRoot,
    isExternalModuleNameRelative,
    isTraceEnabled,
    loadModuleFromGlobalCache,
    maybeBind,
    memoize,
    MinimalResolutionCacheHost,
    ModeAwareCache,
    ModuleOrTypeReferenceResolutionCache,
    ModuleResolutionCache,
    moduleResolutionNameAndModeGetter,
    mutateMap,
    packageIdToString,
    Path,
    PathPathComponents,
    Program,
    removeTrailingDirectorySeparator,
    resolutionExtensionIsTSOrJson,
    ResolutionLoader,
    ResolutionMode,
    ResolutionNameAndModeGetter,
    ResolutionWithFailedLookupLocations,
    ResolutionWithResolvedFileName,
    ResolvedModuleWithFailedLookupLocations,
    ResolvedModuleWithFailedLookupLocationsGlobalCachePass,
    ResolvedModuleWithFailedLookupLocationsGlobalCachePassDisabled,
    ResolvedProjectReference,
    ResolvedTypeReferenceDirectiveWithFailedLookupLocations,
    resolveLibrary as ts_resolveLibrary,
    resolveModuleName as ts_resolveModuleName,
    returnTrue,
    SharedResolutionCache,
    SharedResolutionCacheHost,
    some,
    SourceFile,
    StringLiteralLike,
    trace,
    TypeReferenceDirectiveResolutionCache,
    typeReferenceResolutionNameAndModeGetter,
    TypeRootsCacheKeyOrSpecifiedTypeRoots,
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
    resolutionHost: ResolutionCacheHost;
    sharedCache: SharedResolutionCache;

    rootDirForResolution: string;
    resolvedModuleNames: Map<Path, ModeAwareCache<ResolvedModuleWithFailedLookupLocations>>;
    resolvedTypeReferenceDirectives: Map<Path, ModeAwareCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>>;
    resolvedLibraries: Map<string, ResolvedModuleWithFailedLookupLocations>;
    moduleResolutionCache: ModuleResolutionCache;
    typeReferenceDirectiveResolutionCache: TypeReferenceDirectiveResolutionCache;
    libraryResolutionCache: ModuleResolutionCache;
    filesReferencingResolution: Map<ResolutionWithFailedLookupLocations, Set<Path>>;
    typeRootsWatches: Map<string, FileWatcher>;

    countResolutionsResolvedWithGlobalCache(): number;
    countResolutionsResolvedWithoutGlobalCache(): number;
    watchResolution<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>(
        resolution: T,
        filePath: Path,
        getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>,
        redirectedReference: ResolvedProjectReference | undefined,
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

    // Incremental tests pass options to avoid using incorrect options
    startCachingPerDirectoryResolution(options?: CompilerOptions): void;
    finishCachingPerDirectoryResolution(
        newProgram: Program | undefined,
        oldProgram: Program | undefined,
        skipCacheCompact?: boolean,
    ): void;
    compactCaches(newProgram: Program | undefined): void;

    // Incremental tests pass options to avoid using incorrect options
    updateTypeRootsWatch(options?: CompilerOptions): void;
    closeTypeRootsWatch(): void;
    clear(): void;
    onChangesAffectModuleResolution(): void;

    // Used by shared cache
    getRootDirInfoForResolution(
        redirectedReference: ResolvedProjectReference | undefined,
        resolution: ResolutionWithFailedLookupLocations,
    ): RootDirInfo;
    invalidateAffectingFileWatcher(path: string): void;
    invalidateResolution(resolution: ResolutionWithFailedLookupLocations): void;
    invalidateTypeRoot(): void;
    getValidResolution<T extends ResolutionWithFailedLookupLocations>(resolution: T | undefined): T | undefined;
}

/** @internal */
export interface RootDirInfo {
    rootDir: string;
    rootPath: Path;
    rootPathComponents: Readonly<PathPathComponents>;
    canWatch: boolean;
}

/** @internal */
export interface ResolutionCacheHost extends MinimalResolutionCacheHost, SharedResolutionCacheHost {
    getCurrentDirectory(): string;
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
    getRootDirInfoForResolution?(
        redirectedReference: ResolvedProjectReference | undefined,
        resolution: ResolutionWithFailedLookupLocations,
    ): RootDirInfo;
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

/** @internal */
export function isResolvedWithGlobalCachePass(resolution: ResolutionWithFailedLookupLocations): resolution is ResolvedModuleWithFailedLookupLocationsGlobalCachePass {
    return resolution.globalCacheResolution?.globalResult === resolution;
}

/** @internal */
export function isResolvedWithoutGlobalCachePass(resolution: ResolutionWithFailedLookupLocations): resolution is ResolvedModuleWithFailedLookupLocationsGlobalCachePassDisabled {
    return resolution.globalCacheResolution?.primary === resolution;
}

/** @internal */
export function isResolvedWithGlobalCachePassButStillUnresolved(resolution: ResolutionWithFailedLookupLocations): resolution is ResolvedModuleWithFailedLookupLocationsGlobalCachePass {
    return isResolvedWithGlobalCachePass(resolution) &&
        !resolution.globalCacheResolution.globalResolution.resolvedModule;
}

function createGlobalResolutionResultField<T>(primary: T[] | undefined, global: T[] | undefined): T[] | undefined {
    if (!primary) return global?.slice();
    if (!global) return primary.slice();
    return primary.concat(global);
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
    const primary = ts_resolveModuleName(moduleName, containingFile, compilerOptions, host, moduleResolutionCache, redirectedReference, mode);
    // return result immediately only if global cache support is not enabled or if it is .ts, .tsx or .d.ts
    if (!resolutionHost.getGlobalTypingsCacheLocation) return primary;
    const globalCache = resolutionHost.getGlobalTypingsCacheLocation?.();
    if (
        (
            globalCache === undefined ?
                isResolvedWithoutGlobalCachePass(primary) :
                isResolvedWithGlobalCachePass(primary)
        ) ||
        !needsResolutionFromGlobalCache(moduleName, primary)
    ) return primary;
    // otherwise try to load typings from @types
    if (globalCache === undefined) {
        // This disabled type acquisition
        primary.globalCacheResolution = { primary };

        return primary;
    }

    // create different collection of failed lookup locations for second pass
    // if it will fail and we've already found something during the first pass - we don't want to pollute its results
    const globalResolution = loadModuleFromGlobalCache(
        Debug.checkDefined(resolutionHost.globalCacheResolutionModuleName)(moduleName),
        resolutionHost.projectName,
        compilerOptions,
        host,
        globalCache,
        moduleResolutionCache,
    );

    if (globalResolution.resolvedModule) {
        primary.globalCacheResolution = { primary, globalResolution, globalResult: globalResolution };
        globalResolution.failedLookupLocations = createGlobalResolutionResultField(primary.failedLookupLocations, globalResolution.failedLookupLocations);
        globalResolution.affectingLocations = createGlobalResolutionResultField(primary.affectingLocations, globalResolution.affectingLocations);
        globalResolution.resolutionDiagnostics = createGlobalResolutionResultField(globalResolution.resolutionDiagnostics, primary.resolutionDiagnostics);
        globalResolution.alternateResult = primary.alternateResult;
    }
    else {
        primary.globalCacheResolution = {
            primary,
            globalResolution,
            globalResult: { ...primary },
        };
    }
    Debug.assertIsDefined(primary.globalCacheResolution.globalResult);
    primary.globalCacheResolution.globalResult.globalCacheResolution = primary.globalCacheResolution;
    moduleResolutionCache.setPerDirectoryAndNonRelativeNameCacheResult(
        moduleName,
        mode,
        getDirectoryPath(containingFile),
        redirectedReference,
        undefined,
        primary.globalCacheResolution.globalResult,
        primary,
    );
    return primary.globalCacheResolution.globalResult;
}

/** @internal */
export function createResolutionCache(
    resolutionHost: ResolutionCacheHost,
    rootDirForResolution: string,
    sharedCache: SharedResolutionCache = createSharedResolutionCache(resolutionHost as SharedResolutionCacheHost),
): ResolutionCache {
    let filesWithInvalidatedResolutions: Set<Path> | undefined;
    const impliedFormatPackageJsons = new Map<Path, readonly string[]>();
    const filesReferencingResolution = new Map<ResolutionWithFailedLookupLocations, Set<Path>>();

    let hasChangedAutomaticTypeDirectiveNames = false;
    let affectingPathChecksForFile: Set<string> | undefined;
    let allModuleAndTypeResolutionsAreInvalidated = false;
    let resolutionsWithGlobalCachePassAreInvalidated = false;
    let resolutionsWithoutGlobalCachePassAreInvalidated = false;
    let unresolvedResolutionsWithGlobalCachePassAreInvalidated = false;

    let pendingRemoveResolutionsOfFile: Set<Path> | undefined;
    let potentiallyUnreferencedResolutions: Map<ModuleOrTypeReferenceResolutionCache<ResolutionWithFailedLookupLocations>, Set<ResolutionWithFailedLookupLocations>> | undefined;
    let newUnresolvedResolutionCachePassResolutions: Set<ResolutionWithFailedLookupLocations> | undefined;
    let considerNonWatchedResolutionAsInvalidated = false;

    const getCurrentDirectory = memoize(() => resolutionHost.getCurrentDirectory());

    // The resolvedModuleNames and resolvedTypeReferenceDirectives are the cache of resolutions per file.
    // The key in the map is source file's path.
    // The values are Map of resolutions with key being name lookedup.
    const resolvedModuleNames = new Map<Path, ModeAwareCache<ResolvedModuleWithFailedLookupLocations>>();
    const moduleResolutionCache = enableSharingModuleOrTypeReferenceResolutionCache(
        createModuleResolutionCache(
            getCurrentDirectory(),
            resolutionHost.getCanonicalFileName,
            /*options*/ undefined,
            sharedCache.moduleResolutionCache.getPackageJsonInfoCache(),
            /*optionsToRedirectsKey*/ undefined,
            getValidResolution,
        ),
        sharedCache.moduleResolutionCache,
    );

    const resolvedTypeReferenceDirectives = new Map<Path, ModeAwareCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>>();
    const typeReferenceDirectiveResolutionCache: TypeReferenceDirectiveResolutionCache = enableSharingModuleOrTypeReferenceResolutionCache(
        createTypeReferenceDirectiveResolutionCache(
            getCurrentDirectory(),
            resolutionHost.getCanonicalFileName,
            /*options*/ undefined,
            moduleResolutionCache.getPackageJsonInfoCache(),
            moduleResolutionCache.optionsToRedirectsKey,
            getValidResolution,
        ),
        sharedCache.typeReferenceDirectiveResolutionCache,
    );

    const resolvedLibraries = new Map<string, ResolvedModuleWithFailedLookupLocations>();
    const libraryResolutionCache = enableSharingModuleOrTypeReferenceResolutionCache(
        createModuleResolutionCache(
            getCurrentDirectory(),
            resolutionHost.getCanonicalFileName,
            sharedCache.libraryResolutionCache.options(),
            moduleResolutionCache.getPackageJsonInfoCache(),
            /*optionsToRedirectsKey*/ undefined,
            getValidResolution,
        ),
        sharedCache.libraryResolutionCache,
    );

    let resolutionsResolvedWithGlobalCache = 0;
    let resolutionsResolvedWithoutGlobalCache = 0;

    const rootDirInfo = getRootDirInfo(rootDirForResolution);
    const redirectsToRootDirInfo = new Map<ResolvedProjectReference, RootDirInfo>();

    // TypeRoot watches for the types that get added as part of getAutomaticTypeDirectiveNames
    const typeRootsWatches = new Map<string, FileWatcher>();

    const cache: ResolutionCache = {
        resolutionHost,
        sharedCache,
        rootDirForResolution,
        resolvedModuleNames,
        resolvedTypeReferenceDirectives,
        resolvedLibraries,
        moduleResolutionCache,
        typeReferenceDirectiveResolutionCache,
        libraryResolutionCache,
        filesReferencingResolution,
        typeRootsWatches,
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

        // Used by shared cache
        getRootDirInfoForResolution: maybeBind(resolutionHost, resolutionHost.getRootDirInfoForResolution) ?? getRootDirInfoOfRedirectedReference,
        invalidateAffectingFileWatcher,
        invalidateResolution,
        invalidateTypeRoot,
        getValidResolution,
    };
    return cache;

    function getRootDirInfo(rootDirForResolution: string): RootDirInfo {
        const rootDir = getRootDirectoryOfResolutionCache(rootDirForResolution, getCurrentDirectory);
        const rootPath = resolutionHost.toPath(rootDir);
        const rootPathComponents = getPathComponents(rootPath);
        return {
            rootDir,
            rootPath,
            rootPathComponents,
            canWatch: canWatchDirectoryOrFile(rootPathComponents),
        };
    }

    function getRootDirInfoOfRedirectedReference(redirectedReference: ResolvedProjectReference | undefined): RootDirInfo {
        if (!redirectedReference) return rootDirInfo;
        let result = redirectsToRootDirInfo.get(redirectedReference);
        if (!result) {
            redirectsToRootDirInfo.set(
                redirectedReference,
                result = getRootDirInfo(
                    getDirectoryPath(redirectedReference.sourceFile.fileName),
                ),
            );
        }
        return result;
    }

    function cleanupRedirectRootDirInfo(newProgram: Program | undefined) {
        const toDeleteRedirectToRootDirInfo = new Set(redirectsToRootDirInfo.keys());
        newProgram?.forEachResolvedProjectReference(redirect => {
            toDeleteRedirectToRootDirInfo.delete(redirect);
        });
        toDeleteRedirectToRootDirInfo.forEach(redirect => redirectsToRootDirInfo.delete(redirect));
    }

    function clear() {
        pendingRemoveResolutionsOfFile = undefined;
        potentiallyUnreferencedResolutions = undefined;
        newUnresolvedResolutionCachePassResolutions = undefined;
        redirectsToRootDirInfo.clear();
        closeTypeRootsWatch();
        sharedCache.clear(cache);
        resolvedModuleNames.clear();
        resolvedTypeReferenceDirectives.clear();
        filesReferencingResolution.clear();
        resolutionsResolvedWithGlobalCache = 0;
        resolutionsResolvedWithoutGlobalCache = 0;
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
                !!sharedCache.watchedResolutionInfoMap.get(resolvedLibraries?.get(libFileName)!)?.isInvalidated,
        };
    }

    function startCachingPerDirectoryResolution(options?: CompilerOptions) {
        moduleResolutionCache.isReadonly = undefined;
        typeReferenceDirectiveResolutionCache.isReadonly = undefined;
        libraryResolutionCache.isReadonly = undefined;
        moduleResolutionCache.update(options ?? resolutionHost.getCompilationSettings());
        typeReferenceDirectiveResolutionCache.update(options ?? resolutionHost.getCompilationSettings());
        sharedCache.startCachingPerDirectoryResolution(cache);
        pendingRemoveResolutionsOfFile?.forEach(path => removeResolutionsOfFile(path));
        pendingRemoveResolutionsOfFile = undefined;
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
        let potentiallyUnReferencedFileWatcherOfAffectingLocation: Set<string> | undefined;
        // Update file watches
        if (newProgram !== oldProgram) {
            const releaseFileWatcherOfAffectingLocation = (location: string) => {
                sharedCache.releaseFileWatcherOfAffectingLocation(location);
                (potentiallyUnReferencedFileWatcherOfAffectingLocation ??= new Set()).add(location);
            };
            cleanupLibResolutionWatching(newProgram);
            newProgram?.getSourceFiles().forEach(newFile => {
                const expected = newFile.packageJsonLocations?.length ?? 0;
                const existing = impliedFormatPackageJsons.get(newFile.resolvedPath) ?? emptyArray;
                for (let i = existing.length; i < expected; i++) {
                    sharedCache.createFileWatcherOfAffectingLocation(newFile.packageJsonLocations![i]);
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
            cleanupRedirectRootDirInfo(newProgram);
        }
        potentiallyUnReferencedFileWatcherOfAffectingLocation?.forEach(location => sharedCache.closeFileWatcherOfAffectingLocation(location));
        potentiallyUnReferencedFileWatcherOfAffectingLocation = undefined;
        if (potentiallyUnreferencedResolutions) {
            potentiallyUnreferencedResolutions.forEach(gcModuleOrTypeRefCache);
            potentiallyUnreferencedResolutions = undefined;
        }
        sharedCache.finishCachingPerDirectoryResolution();
        hasChangedAutomaticTypeDirectiveNames = false;
        if (!skipCacheCompact) compactCaches(newProgram);
        moduleResolutionCache.isReadonly = true;
        typeReferenceDirectiveResolutionCache.isReadonly = true;
        libraryResolutionCache.isReadonly = true;
        moduleResolutionCache.getPackageJsonInfoCache().isReadonly = true;
    }

    function compactCaches(newProgram: Program | undefined) {
        const availableOptions = new Set<CompilerOptions>();
        const availableTypeCacheKeys = new Map<CompilerOptions, Set<TypeRootsCacheKeyOrSpecifiedTypeRoots>>();
        if (newProgram) {
            availableOptions.add(newProgram.getCompilerOptions());
            const key = newProgram.getTypeRootsCacheKeys()?.get(/*key*/ undefined);
            if (key !== undefined) availableTypeCacheKeys.set(newProgram.getCompilerOptions(), new Set([key]));
            newProgram.forEachResolvedProjectReference(ref => {
                availableOptions.add(ref.commandLine.options);
                const key = newProgram.getTypeRootsCacheKeys()?.get(ref.sourceFile.path);
                if (key !== undefined) {
                    const existing = availableTypeCacheKeys.get(ref.commandLine.options);
                    if (existing) existing.add(key);
                    else availableTypeCacheKeys.set(ref.commandLine.options, new Set([key]));
                }
            });
        }
        moduleResolutionCache.compact(availableOptions, /*skipOptionsToRedirectsKeyCleanup*/ true);
        typeReferenceDirectiveResolutionCache.compact(availableOptions, /*skipOptionsToRedirectsKeyCleanup*/ false, availableTypeCacheKeys);
        libraryResolutionCache.compact();
        sharedCache.compactCaches(availableOptions, availableTypeCacheKeys, cache);
    }

    function gcModuleOrTypeRefCache(
        setOfResolutions: Set<ResolutionWithFailedLookupLocations>,
        cache: ModuleOrTypeReferenceResolutionCache<ResolutionWithFailedLookupLocations>,
    ) {
        let needsGc = false;
        setOfResolutions.forEach(resolution => needsGc = releaseResolution(resolution, cache) || needsGc);
        if (needsGc) {
            considerNonWatchedResolutionAsInvalidated = true;
            cache.gc(filesReferencingResolution);
            considerNonWatchedResolutionAsInvalidated = false;
        }
    }

    function onSourceFileNotCreated(sourceFileOptions: CreateSourceFileOptions) {
        sourceFileOptions.packageJsonLocations?.forEach(location => sharedCache.addToPotentiallyUnwatchedPackageJsons(location));
    }

    function getValidResolution<T extends ResolutionWithFailedLookupLocations>(resolution: T | undefined) {
        return isInvalidatedResolution(resolution) ? undefined : resolution;
    }

    function isInvalidatedResolution(resolution: ResolutionWithFailedLookupLocations | undefined) {
        if (
            !resolution ||
            (considerNonWatchedResolutionAsInvalidated && !filesReferencingResolution.has(resolution)) ||
            sharedCache.watchedResolutionInfoMap.get(resolution)?.isInvalidated ||
            (resolutionsWithGlobalCachePassAreInvalidated && isResolvedWithGlobalCachePass(resolution)) ||
            (resolutionsWithoutGlobalCachePassAreInvalidated && isResolvedWithoutGlobalCachePass(resolution))
        ) return true;
        // If this is not a new resolution and its unresolved, its invalid
        if (newUnresolvedResolutionCachePassResolutions?.has(resolution) || !isInvalidatedUnResolvedGlobalCachePassResolution(resolution)) return false;
        sharedCache.invalidateResolution(resolution, returnTrue);
        return true;
    }

    function isInvalidatedUnResolvedGlobalCachePassResolution(resolution: ResolutionWithFailedLookupLocations) {
        return unresolvedResolutionsWithGlobalCachePassAreInvalidated &&
            isResolvedWithGlobalCachePassButStillUnresolved(resolution);
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
                    watchResolution(resolution, path, getResolutionWithResolvedFileName, redirectedReference);
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
            Debug.assert(resolution !== undefined && !sharedCache.watchedResolutionInfoMap.get(resolution)!.isInvalidated);
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
            watchResolution(resolution, path, getResolvedModuleFromResolution, /*redirectedReference*/ undefined);
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
        if (resolution && !sharedCache.watchedResolutionInfoMap.get(resolution)!.isInvalidated) return resolution;
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

    function watchResolution<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>(
        resolution: T,
        filePath: Path,
        getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>,
        redirectedReference: ResolvedProjectReference | undefined,
    ) {
        let files = filesReferencingResolution.get(resolution);
        if (!files) {
            filesReferencingResolution.set(resolution, files = new Set([filePath]));
            if (isResolvedWithGlobalCachePass(resolution)) resolutionsResolvedWithGlobalCache++;
            else if (isResolvedWithoutGlobalCachePass(resolution)) resolutionsResolvedWithoutGlobalCache++;
        }
        else {
            files.add(filePath);
        }
        sharedCache.watchResolution(resolution, getResolutionWithResolvedFileName, redirectedReference);
    }

    function invalidateAffectingFileWatcher(path: string) {
        (affectingPathChecksForFile ??= new Set()).add(path);
    }

    function stopWatchFailedLookupLocationOfResolution(
        resolution: ResolutionWithFailedLookupLocations,
        filePath: Path,
        cache: ModuleOrTypeReferenceResolutionCache<ResolutionWithFailedLookupLocations>,
    ) {
        const files = filesReferencingResolution.get(resolution)!;
        files.delete(filePath);
        if (files.size) return;
        let setOfResolutions = potentiallyUnreferencedResolutions?.get(cache);
        if (!setOfResolutions) (potentiallyUnreferencedResolutions ??= new Map()).set(cache, setOfResolutions = new Set());
        setOfResolutions.add(resolution);
    }

    function releaseResolution(
        resolution: ResolutionWithFailedLookupLocations,
        moduleOrTypeRefCache: ModuleOrTypeReferenceResolutionCache<ResolutionWithFailedLookupLocations>,
    ) {
        const files = filesReferencingResolution.get(resolution)!;
        if (files.size) return false;
        filesReferencingResolution.delete(resolution);
        if (isResolvedWithGlobalCachePass(resolution)) resolutionsResolvedWithGlobalCache--;
        else if (isResolvedWithoutGlobalCachePass(resolution)) resolutionsResolvedWithoutGlobalCache--;
        sharedCache.releaseResolution(resolution, moduleOrTypeRefCache);
        return true;
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
        if (sharedCache.currentCache() === cache) {
            removeResolutionsOfFileFromCache(resolvedModuleNames, filePath, moduleResolutionCache);
            removeResolutionsOfFileFromCache(resolvedTypeReferenceDirectives, filePath, typeReferenceDirectiveResolutionCache);
        }
        else {
            (pendingRemoveResolutionsOfFile ??= new Set()).add(filePath);
        }
    }

    function invalidateResolution(resolution: ResolutionWithFailedLookupLocations) {
        const files = filesReferencingResolution.get(resolution)!;
        for (const containingFilePath of files) {
            (filesWithInvalidatedResolutions ??= new Set()).add(containingFilePath);
            // When its a file with inferred types resolution, invalidate type reference directive resolution
            hasChangedAutomaticTypeDirectiveNames = hasChangedAutomaticTypeDirectiveNames || endsWith(containingFilePath, inferredTypesContainingFile);
        }
    }

    function invalidateResolutionOfFile(filePath: Path) {
        removeResolutionsOfFile(filePath);
        // Resolution is invalidated if the resulting file name is same as the deleted file path
        const prevHasChangedAutomaticTypeDirectiveNames = hasChangedAutomaticTypeDirectiveNames;
        if (
            sharedCache.invalidateResolutionOfFile(filePath) &&
            hasChangedAutomaticTypeDirectiveNames &&
            !prevHasChangedAutomaticTypeDirectiveNames
        ) {
            resolutionHost.onChangedAutomaticTypeDirectiveNames();
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
        let invalidated = allModuleAndTypeResolutionsAreInvalidated;
        if (!allModuleAndTypeResolutionsAreInvalidated && affectingPathChecksForFile) {
            resolutionHost.getCurrentProgram()?.getSourceFiles().forEach(f => {
                if (some(f.packageJsonLocations, location => affectingPathChecksForFile!.has(location))) {
                    (filesWithInvalidatedResolutions ??= new Set()).add(f.path);
                    invalidated = true;
                }
            });
        }
        affectingPathChecksForFile = undefined;
        return sharedCache.invalidateResolutionsOfFailedLookupLocations() || invalidated;
    }

    function closeTypeRootsWatch() {
        clearMap(typeRootsWatches, closeFileWatcher);
    }

    function createTypeRootsWatch(typeRoot: string): FileWatcher {
        // Create new watch and recursive info
        return sharedCache.createTypeRootsWatch(typeRoot, cache);
    }

    function invalidateTypeRoot() {
        hasChangedAutomaticTypeDirectiveNames = true;
        resolutionHost.onChangedAutomaticTypeDirectiveNames();
    }

    /**
     * Watches the types that would get added as part of getAutomaticTypeDirectiveNames
     * To be called when compiler options change
     */
    function updateTypeRootsWatch(options?: CompilerOptions) {
        options ??= resolutionHost.getCompilationSettings();
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
}

function resolutionIsSymlink(resolution: ResolutionWithFailedLookupLocations) {
    return !!(
        (resolution as ResolvedModuleWithFailedLookupLocations).resolvedModule?.originalPath ||
        (resolution as ResolvedTypeReferenceDirectiveWithFailedLookupLocations).resolvedTypeReferenceDirective?.originalPath
    );
}
