import * as ts from "./_namespaces/ts";

/** @internal */
/** This is the cache of module/typedirectives resolution that can be retained across program */
export interface ResolutionCache {
    startRecordingFilesWithChangedResolutions(): void;
    finishRecordingFilesWithChangedResolutions(): ts.Path[] | undefined;

    resolveModuleNames(moduleNames: string[], containingFile: string, reusedNames: string[] | undefined, redirectedReference?: ts.ResolvedProjectReference, containingSourceFile?: ts.SourceFile): (ts.ResolvedModuleFull | undefined)[];
    getResolvedModuleWithFailedLookupLocationsFromCache(moduleName: string, containingFile: string, resolutionMode?: ts.ModuleKind.CommonJS | ts.ModuleKind.ESNext): CachedResolvedModuleWithFailedLookupLocations | undefined;
    resolveTypeReferenceDirectives(typeDirectiveNames: string[] | readonly ts.FileReference[], containingFile: string, redirectedReference?: ts.ResolvedProjectReference, containingFileMode?: ts.SourceFile["impliedNodeFormat"]): (ts.ResolvedTypeReferenceDirective | undefined)[];

    invalidateResolutionsOfFailedLookupLocations(): boolean;
    invalidateResolutionOfFile(filePath: ts.Path): void;
    removeResolutionsOfFile(filePath: ts.Path): void;
    removeResolutionsFromProjectReferenceRedirects(filePath: ts.Path): void;
    setFilesWithInvalidatedNonRelativeUnresolvedImports(filesWithUnresolvedImports: ts.ESMap<ts.Path, readonly string[]>): void;
    createHasInvalidatedResolutions(customHasInvalidatedResolutions: ts.HasInvalidatedResolutions): ts.HasInvalidatedResolutions;
    hasChangedAutomaticTypeDirectiveNames(): boolean;
    isFileWithInvalidatedNonRelativeUnresolvedImports(path: ts.Path): boolean;


    startCachingPerDirectoryResolution(): void;
    finishCachingPerDirectoryResolution(newProgram: ts.Program | undefined, oldProgram: ts.Program | undefined): void;

    updateTypeRootsWatch(): void;
    closeTypeRootsWatch(): void;

    getModuleResolutionCache(): ts.ModuleResolutionCache;

    clear(): void;
}

interface ResolutionWithFailedLookupLocations {
    readonly failedLookupLocations: string[];
    readonly affectingLocations: string[];
    isInvalidated?: boolean;
    refCount?: number;
    // Files that have this resolution using
    files?: ts.Path[];
}

interface ResolutionWithResolvedFileName {
    resolvedFileName: string | undefined;
    packagetId?: ts.PackageId;
}

interface CachedResolvedModuleWithFailedLookupLocations extends ts.ResolvedModuleWithFailedLookupLocations, ResolutionWithFailedLookupLocations {
}

interface CachedResolvedTypeReferenceDirectiveWithFailedLookupLocations extends ts.ResolvedTypeReferenceDirectiveWithFailedLookupLocations, ResolutionWithFailedLookupLocations {
}

/** @internal */
export interface ResolutionCacheHost extends ts.MinimalResolutionCacheHost {
    toPath(fileName: string): ts.Path;
    getCanonicalFileName: ts.GetCanonicalFileName;
    getCompilationSettings(): ts.CompilerOptions;
    watchDirectoryOfFailedLookupLocation(directory: string, cb: ts.DirectoryWatcherCallback, flags: ts.WatchDirectoryFlags): ts.FileWatcher;
    watchAffectingFileLocation(file: string, cb: ts.FileWatcherCallback): ts.FileWatcher;
    onInvalidatedResolution(): void;
    watchTypeRootsDirectory(directory: string, cb: ts.DirectoryWatcherCallback, flags: ts.WatchDirectoryFlags): ts.FileWatcher;
    onChangedAutomaticTypeDirectiveNames(): void;
    scheduleInvalidateResolutionsOfFailedLookupLocations(): void;
    getCachedDirectoryStructureHost(): ts.CachedDirectoryStructureHost | undefined;
    projectName?: string;
    getGlobalCache?(): string | undefined;
    globalCacheResolutionModuleName?(externalModuleName: string): string;
    writeLog(s: string): void;
    getCurrentProgram(): ts.Program | undefined;
    fileIsOpen(filePath: ts.Path): boolean;
    onDiscoveredSymlink?(): void;
}

interface FileWatcherOfAffectingLocation {
    /** watcher for the lookup */
    watcher: ts.FileWatcher;
    resolutions: number;
    files: number;
    paths: ts.Set<string>;
}

interface DirectoryWatchesOfFailedLookup {
    /** watcher for the lookup */
    watcher: ts.FileWatcher;
    /** ref count keeping this watch alive */
    refCount: number;
    /** is the directory watched being non recursive */
    nonRecursive?: boolean;
}

interface DirectoryOfFailedLookupWatch {
    dir: string;
    dirPath: ts.Path;
    nonRecursive?: boolean;
}

/** @internal */
export function removeIgnoredPath(path: ts.Path): ts.Path | undefined {
    // Consider whole staging folder as if node_modules changed.
    if (ts.endsWith(path, "/node_modules/.staging")) {
        return ts.removeSuffix(path, "/.staging") as ts.Path;
    }

    return ts.some(ts.ignoredPaths, searchPath => ts.stringContains(path, searchPath)) ?
        undefined :
        path;
}

/** @internal */
/**
 * Filter out paths like
 * "/", "/user", "/user/username", "/user/username/folderAtRoot",
 * "c:/", "c:/users", "c:/users/username", "c:/users/username/folderAtRoot", "c:/folderAtRoot"
 * @param dirPath
 */
export function canWatchDirectoryOrFile(dirPath: ts.Path) {
    const rootLength = ts.getRootLength(dirPath);
    if (dirPath.length === rootLength) {
        // Ignore "/", "c:/"
        return false;
    }

    let nextDirectorySeparator = dirPath.indexOf(ts.directorySeparator, rootLength);
    if (nextDirectorySeparator === -1) {
        // ignore "/user", "c:/users" or "c:/folderAtRoot"
        return false;
    }

    let pathPartForUserCheck = dirPath.substring(rootLength, nextDirectorySeparator + 1);
    const isNonDirectorySeparatorRoot = rootLength > 1 || dirPath.charCodeAt(0) !== ts.CharacterCodes.slash;
    if (isNonDirectorySeparatorRoot &&
        dirPath.search(/[a-zA-Z]:/) !== 0 && // Non dos style paths
        pathPartForUserCheck.search(/[a-zA-z]\$\//) === 0) { // Dos style nextPart
        nextDirectorySeparator = dirPath.indexOf(ts.directorySeparator, nextDirectorySeparator + 1);
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
        searchIndex = dirPath.indexOf(ts.directorySeparator, searchIndex) + 1;
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
    let filesWithChangedSetOfUnresolvedImports: ts.Path[] | undefined;
    let filesWithInvalidatedResolutions: ts.Set<ts.Path> | undefined;
    let filesWithInvalidatedNonRelativeUnresolvedImports: ts.ReadonlyESMap<ts.Path, readonly string[]> | undefined;
    const nonRelativeExternalModuleResolutions = ts.createMultiMap<ResolutionWithFailedLookupLocations>();

    const resolutionsWithFailedLookups: ResolutionWithFailedLookupLocations[] = [];
    const resolutionsWithOnlyAffectingLocations: ResolutionWithFailedLookupLocations[] = [];
    const resolvedFileToResolution = ts.createMultiMap<ResolutionWithFailedLookupLocations>();
    const impliedFormatPackageJsons = new ts.Map<ts.Path, readonly string[]>();

    let hasChangedAutomaticTypeDirectiveNames = false;
    let affectingPathChecksForFile: ts.Set<string> | undefined;
    let affectingPathChecks: ts.Set<string> | undefined;
    let failedLookupChecks: ts.Set<ts.Path> | undefined;
    let startsWithPathChecks: ts.Set<ts.Path> | undefined;
    let isInDirectoryChecks: ts.Set<ts.Path> | undefined;

    const getCurrentDirectory = ts.memoize(() => resolutionHost.getCurrentDirectory!()); // TODO: GH#18217
    const cachedDirectoryStructureHost = resolutionHost.getCachedDirectoryStructureHost();

    // The resolvedModuleNames and resolvedTypeReferenceDirectives are the cache of resolutions per file.
    // The key in the map is source file's path.
    // The values are Map of resolutions with key being name lookedup.
    const resolvedModuleNames = new ts.Map<ts.Path, ts.ModeAwareCache<CachedResolvedModuleWithFailedLookupLocations>>();
    const perDirectoryResolvedModuleNames: ts.CacheWithRedirects<ts.ModeAwareCache<CachedResolvedModuleWithFailedLookupLocations>> = ts.createCacheWithRedirects();
    const nonRelativeModuleNameCache: ts.CacheWithRedirects<ts.PerModuleNameCache> = ts.createCacheWithRedirects();
    const moduleResolutionCache = ts.createModuleResolutionCache(
        getCurrentDirectory(),
        resolutionHost.getCanonicalFileName,
        /*options*/ undefined,
        perDirectoryResolvedModuleNames,
        nonRelativeModuleNameCache,
    );

    const resolvedTypeReferenceDirectives = new ts.Map<ts.Path, ts.ModeAwareCache<CachedResolvedTypeReferenceDirectiveWithFailedLookupLocations>>();
    const perDirectoryResolvedTypeReferenceDirectives: ts.CacheWithRedirects<ts.ModeAwareCache<CachedResolvedTypeReferenceDirectiveWithFailedLookupLocations>> = ts.createCacheWithRedirects();
    const typeReferenceDirectiveResolutionCache = ts.createTypeReferenceDirectiveResolutionCache(
        getCurrentDirectory(),
        resolutionHost.getCanonicalFileName,
        /*options*/ undefined,
        moduleResolutionCache.getPackageJsonInfoCache(),
        perDirectoryResolvedTypeReferenceDirectives
    );

    /**
     * These are the extensions that failed lookup files will have by default,
     * any other extension of failed lookup will be store that path in custom failed lookup path
     * This helps in not having to comb through all resolutions when files are added/removed
     * Note that .d.ts file also has .d.ts extension hence will be part of default extensions
     */
    const failedLookupDefaultExtensions = [ts.Extension.Ts, ts.Extension.Tsx, ts.Extension.Js, ts.Extension.Jsx, ts.Extension.Json];
    const customFailedLookupPaths = new ts.Map<string, number>();

    const directoryWatchesOfFailedLookups = new ts.Map<string, DirectoryWatchesOfFailedLookup>();
    const fileWatchesOfAffectingLocations = new ts.Map<string, FileWatcherOfAffectingLocation>();
    const rootDir = rootDirForResolution && ts.removeTrailingDirectorySeparator(ts.getNormalizedAbsolutePath(rootDirForResolution, getCurrentDirectory()));
    const rootPath = (rootDir && resolutionHost.toPath(rootDir)) as ts.Path; // TODO: GH#18217
    const rootSplitLength = rootPath !== undefined ? rootPath.split(ts.directorySeparator).length : 0;

    // TypeRoot watches for the types that get added as part of getAutomaticTypeDirectiveNames
    const typeRootsWatches = new ts.Map<string, ts.FileWatcher>();

    return {
        getModuleResolutionCache: () => moduleResolutionCache,
        startRecordingFilesWithChangedResolutions,
        finishRecordingFilesWithChangedResolutions,
        // perDirectoryResolvedModuleNames and perDirectoryResolvedTypeReferenceDirectives could be non empty if there was exception during program update
        // (between startCachingPerDirectoryResolution and finishCachingPerDirectoryResolution)
        startCachingPerDirectoryResolution,
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
        createHasInvalidatedResolutions,
        isFileWithInvalidatedNonRelativeUnresolvedImports,
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

    function isInDirectoryPath(dir: ts.Path | undefined, file: ts.Path) {
        if (dir === undefined || file.length <= dir.length) {
            return false;
        }
        return ts.startsWith(file, dir) && file[dir.length] === ts.directorySeparator;
    }

    function clear() {
        ts.clearMap(directoryWatchesOfFailedLookups, ts.closeFileWatcherOf);
        ts.clearMap(fileWatchesOfAffectingLocations, ts.closeFileWatcherOf);
        customFailedLookupPaths.clear();
        nonRelativeExternalModuleResolutions.clear();
        closeTypeRootsWatch();
        resolvedModuleNames.clear();
        resolvedTypeReferenceDirectives.clear();
        resolvedFileToResolution.clear();
        resolutionsWithFailedLookups.length = 0;
        resolutionsWithOnlyAffectingLocations.length = 0;
        failedLookupChecks = undefined;
        startsWithPathChecks = undefined;
        isInDirectoryChecks = undefined;
        affectingPathChecks = undefined;
        affectingPathChecksForFile = undefined;
        moduleResolutionCache.clear();
        typeReferenceDirectiveResolutionCache.clear();
        impliedFormatPackageJsons.clear();
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

    function isFileWithInvalidatedNonRelativeUnresolvedImports(path: ts.Path): boolean {
        if (!filesWithInvalidatedNonRelativeUnresolvedImports) {
            return false;
        }

        // Invalidated if file has unresolved imports
        const value = filesWithInvalidatedNonRelativeUnresolvedImports.get(path);
        return !!value && !!value.length;
    }

    function createHasInvalidatedResolutions(customHasInvalidatedResolutions: ts.HasInvalidatedResolutions): ts.HasInvalidatedResolutions {
        // Ensure pending resolutions are applied
        invalidateResolutionsOfFailedLookupLocations();
        const collected = filesWithInvalidatedResolutions;
        filesWithInvalidatedResolutions = undefined;
        return path => customHasInvalidatedResolutions(path) ||
            !!collected?.has(path) ||
            isFileWithInvalidatedNonRelativeUnresolvedImports(path);
    }

    function startCachingPerDirectoryResolution() {
        moduleResolutionCache.clearAllExceptPackageJsonInfoCache();
        typeReferenceDirectiveResolutionCache.clearAllExceptPackageJsonInfoCache();
        // perDirectoryResolvedModuleNames and perDirectoryResolvedTypeReferenceDirectives could be non empty if there was exception during program update
        // (between startCachingPerDirectoryResolution and finishCachingPerDirectoryResolution)
        nonRelativeExternalModuleResolutions.forEach(watchFailedLookupLocationOfNonRelativeModuleResolutions);
        nonRelativeExternalModuleResolutions.clear();
    }

    function finishCachingPerDirectoryResolution(newProgram: ts.Program | undefined, oldProgram: ts.Program | undefined) {
        filesWithInvalidatedNonRelativeUnresolvedImports = undefined;
        nonRelativeExternalModuleResolutions.forEach(watchFailedLookupLocationOfNonRelativeModuleResolutions);
        nonRelativeExternalModuleResolutions.clear();
        // Update file watches
        if (newProgram !== oldProgram) {
            newProgram?.getSourceFiles().forEach(newFile => {
                const expected = ts.isExternalOrCommonJsModule(newFile) ? newFile.packageJsonLocations?.length ?? 0 : 0;
                const existing = impliedFormatPackageJsons.get(newFile.path) ?? ts.emptyArray;
                for (let i = existing.length; i < expected; i++) {
                    createFileWatcherOfAffectingLocation(newFile.packageJsonLocations![i], /*forResolution*/ false);
                }
                if (existing.length > expected) {
                    for (let i = expected; i < existing.length; i++) {
                        fileWatchesOfAffectingLocations.get(existing[i])!.files--;
                    }
                }
                if (expected) impliedFormatPackageJsons.set(newFile.path, newFile.packageJsonLocations!);
                else impliedFormatPackageJsons.delete(newFile.path);
            });
            impliedFormatPackageJsons.forEach((existing, path) => {
                if (!newProgram?.getSourceFileByPath(path)) {
                    existing.forEach(location => fileWatchesOfAffectingLocations.get(location)!.files--);
                    impliedFormatPackageJsons.delete(path);
                }
            });
        }
        directoryWatchesOfFailedLookups.forEach((watcher, path) => {
            if (watcher.refCount === 0) {
                directoryWatchesOfFailedLookups.delete(path);
                watcher.watcher.close();
            }
        });
        fileWatchesOfAffectingLocations.forEach((watcher, path) => {
            if (watcher.files === 0 && watcher.resolutions === 0) {
                fileWatchesOfAffectingLocations.delete(path);
                watcher.watcher.close();
            }
        });

        hasChangedAutomaticTypeDirectiveNames = false;
    }

    function resolveModuleName(moduleName: string, containingFile: string, compilerOptions: ts.CompilerOptions, host: ts.ModuleResolutionHost, redirectedReference?: ts.ResolvedProjectReference, _containingSourceFile?: never, mode?: ts.ModuleKind.CommonJS | ts.ModuleKind.ESNext | undefined): CachedResolvedModuleWithFailedLookupLocations {
        const primaryResult = ts.resolveModuleName(moduleName, containingFile, compilerOptions, host, moduleResolutionCache, redirectedReference, mode);
        // return result immediately only if global cache support is not enabled or if it is .ts, .tsx or .d.ts
        if (!resolutionHost.getGlobalCache) {
            return primaryResult;
        }

        // otherwise try to load typings from @types
        const globalCache = resolutionHost.getGlobalCache();
        if (globalCache !== undefined && !ts.isExternalModuleNameRelative(moduleName) && !(primaryResult.resolvedModule && ts.extensionIsTS(primaryResult.resolvedModule.extension))) {
            // create different collection of failed lookup locations for second pass
            // if it will fail and we've already found something during the first pass - we don't want to pollute its results
            const { resolvedModule, failedLookupLocations, affectingLocations } = ts.loadModuleFromGlobalCache(
                ts.Debug.checkDefined(resolutionHost.globalCacheResolutionModuleName)(moduleName),
                resolutionHost.projectName,
                compilerOptions,
                host,
                globalCache,
                moduleResolutionCache,
            );
            if (resolvedModule) {
                // Modify existing resolution so its saved in the directory cache as well
                (primaryResult.resolvedModule as any) = resolvedModule;
                primaryResult.failedLookupLocations.push(...failedLookupLocations);
                primaryResult.affectingLocations.push(...affectingLocations);
                return primaryResult;
            }
        }

        // Default return the result from the first pass
        return primaryResult;
    }

    function resolveTypeReferenceDirective(typeReferenceDirectiveName: string, containingFile: string | undefined, options: ts.CompilerOptions, host: ts.ModuleResolutionHost, redirectedReference?: ts.ResolvedProjectReference, _containingSourceFile?: ts.SourceFile, resolutionMode?: ts.SourceFile["impliedNodeFormat"] | undefined): CachedResolvedTypeReferenceDirectiveWithFailedLookupLocations {
        return ts.resolveTypeReferenceDirective(typeReferenceDirectiveName, containingFile, options, host, redirectedReference, typeReferenceDirectiveResolutionCache, resolutionMode);
    }

    interface ResolveNamesWithLocalCacheInput<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName> {
        names: readonly string[] | readonly ts.FileReference[];
        containingFile: string;
        redirectedReference: ts.ResolvedProjectReference | undefined;
        cache: ts.ESMap<ts.Path, ts.ModeAwareCache<T>>;
        perDirectoryCacheWithRedirects: ts.CacheWithRedirects<ts.ModeAwareCache<T>>;
        loader: (name: string, containingFile: string, options: ts.CompilerOptions, host: ts.ModuleResolutionHost, redirectedReference?: ts.ResolvedProjectReference, containingSourceFile?: ts.SourceFile, resolutionMode?: ts.ModuleKind.CommonJS | ts.ModuleKind.ESNext | undefined) => T;
        getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>;
        shouldRetryResolution: (t: T) => boolean;
        reusedNames?: readonly string[];
        logChanges?: boolean;
        containingSourceFile?: ts.SourceFile;
        containingSourceFileMode?: ts.SourceFile["impliedNodeFormat"];
    }
    function resolveNamesWithLocalCache<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>({
        names, containingFile, redirectedReference,
        cache, perDirectoryCacheWithRedirects,
        loader, getResolutionWithResolvedFileName,
        shouldRetryResolution, reusedNames, logChanges, containingSourceFile, containingSourceFileMode
    }: ResolveNamesWithLocalCacheInput<T, R>): (R | undefined)[] {
        const path = resolutionHost.toPath(containingFile);
        const resolutionsInFile = cache.get(path) || cache.set(path, ts.createModeAwareCache()).get(path)!;
        const dirPath = ts.getDirectoryPath(path);
        const perDirectoryCache = perDirectoryCacheWithRedirects.getOrCreateMapOfCacheRedirects(redirectedReference);
        let perDirectoryResolution = perDirectoryCache.get(dirPath);
        if (!perDirectoryResolution) {
            perDirectoryResolution = ts.createModeAwareCache();
            perDirectoryCache.set(dirPath, perDirectoryResolution);
        }
        const resolvedModules: (R | undefined)[] = [];
        const compilerOptions = resolutionHost.getCompilationSettings();
        const hasInvalidatedNonRelativeUnresolvedImport = logChanges && isFileWithInvalidatedNonRelativeUnresolvedImports(path);

        // All the resolutions in this file are invalidated if this file wasn't resolved using same redirect
        const program = resolutionHost.getCurrentProgram();
        const oldRedirect = program && program.getResolvedProjectReferenceToRedirect(containingFile);
        const unmatchedRedirects = oldRedirect ?
            !redirectedReference || redirectedReference.sourceFile.path !== oldRedirect.sourceFile.path :
            !!redirectedReference;

        const seenNamesInFile = ts.createModeAwareCache<true>();
        let i = 0;
        for (const entry of names) {
            const name = ts.isString(entry) ? entry : entry.fileName.toLowerCase();
            // Imports supply a `containingSourceFile` but no `containingSourceFileMode` - it would be redundant
            // they require calculating the mode for a given import from it's position in the resolution table, since a given
            // import's syntax may override the file's default mode.
            // Type references instead supply a `containingSourceFileMode` and a non-string entry which contains
            // a default file mode override if applicable.
            const mode = !ts.isString(entry) ? ts.getModeForFileReference(entry, containingSourceFileMode) :
                containingSourceFile ? ts.getModeForResolutionAtIndex(containingSourceFile, i) : undefined;
            i++;
            let resolution = resolutionsInFile.get(name, mode);
            // Resolution is valid if it is present and not invalidated
            if (!seenNamesInFile.has(name, mode) &&
                unmatchedRedirects || !resolution || resolution.isInvalidated ||
                // If the name is unresolved import that was invalidated, recalculate
                (hasInvalidatedNonRelativeUnresolvedImport && !ts.isExternalModuleNameRelative(name) && shouldRetryResolution(resolution))) {
                const existingResolution = resolution;
                const resolutionInDirectory = perDirectoryResolution.get(name, mode);
                if (resolutionInDirectory) {
                    resolution = resolutionInDirectory;
                    const host = resolutionHost.getCompilerHost?.() || resolutionHost;
                    if (ts.isTraceEnabled(compilerOptions, host)) {
                        const resolved = getResolutionWithResolvedFileName(resolution);
                        ts.trace(
                            host,
                            loader === resolveModuleName as unknown ?
                                resolved?.resolvedFileName ?
                                    resolved.packagetId ?
                                        ts.Diagnostics.Reusing_resolution_of_module_0_from_1_found_in_cache_from_location_2_it_was_successfully_resolved_to_3_with_Package_ID_4:
                                        ts.Diagnostics.Reusing_resolution_of_module_0_from_1_found_in_cache_from_location_2_it_was_successfully_resolved_to_3:
                                    ts.Diagnostics.Reusing_resolution_of_module_0_from_1_found_in_cache_from_location_2_it_was_not_resolved :
                                resolved?.resolvedFileName ?
                                    resolved.packagetId ?
                                        ts.Diagnostics.Reusing_resolution_of_type_reference_directive_0_from_1_found_in_cache_from_location_2_it_was_successfully_resolved_to_3_with_Package_ID_4 :
                                        ts.Diagnostics.Reusing_resolution_of_type_reference_directive_0_from_1_found_in_cache_from_location_2_it_was_successfully_resolved_to_3 :
                                    ts.Diagnostics.Reusing_resolution_of_type_reference_directive_0_from_1_found_in_cache_from_location_2_it_was_not_resolved,
                            name,
                            containingFile,
                            ts.getDirectoryPath(containingFile),
                            resolved?.resolvedFileName,
                            resolved?.packagetId && ts.packageIdToString(resolved.packagetId)
                        );
                    }
                }
                else {
                    resolution = loader(name, containingFile, compilerOptions, resolutionHost.getCompilerHost?.() || resolutionHost, redirectedReference, containingSourceFile, mode);
                    perDirectoryResolution.set(name, mode, resolution);
                    if (resolutionHost.onDiscoveredSymlink && resolutionIsSymlink(resolution)) {
                        resolutionHost.onDiscoveredSymlink();
                    }
                }
                resolutionsInFile.set(name, mode, resolution);
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
            else {
                const host = resolutionHost.getCompilerHost?.() || resolutionHost;
                if (ts.isTraceEnabled(compilerOptions, host) && !seenNamesInFile.has(name, mode)) {
                    const resolved = getResolutionWithResolvedFileName(resolution);
                    ts.trace(
                        host,
                        loader === resolveModuleName as unknown ?
                            resolved?.resolvedFileName ?
                                resolved.packagetId ?
                                    ts.Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2_with_Package_ID_3 :
                                    ts.Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2 :
                                ts.Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_not_resolved :
                            resolved?.resolvedFileName ?
                                resolved.packagetId ?
                                    ts.Diagnostics.Reusing_resolution_of_type_reference_directive_0_from_1_of_old_program_it_was_successfully_resolved_to_2_with_Package_ID_3 :
                                    ts.Diagnostics.Reusing_resolution_of_type_reference_directive_0_from_1_of_old_program_it_was_successfully_resolved_to_2 :
                                ts.Diagnostics.Reusing_resolution_of_type_reference_directive_0_from_1_of_old_program_it_was_not_resolved,
                        name,
                        containingFile,
                        resolved?.resolvedFileName,
                        resolved?.packagetId && ts.packageIdToString(resolved.packagetId)
                    );
                }
            }
            ts.Debug.assert(resolution !== undefined && !resolution.isInvalidated);
            seenNamesInFile.set(name, mode, true);
            resolvedModules.push(getResolutionWithResolvedFileName(resolution));
        }

        // Stop watching and remove the unused name
        resolutionsInFile.forEach((resolution, name, mode) => {
            if (!seenNamesInFile.has(name, mode) && !ts.contains(reusedNames, name)) {
                stopWatchFailedLookupLocationOfResolution(resolution, path, getResolutionWithResolvedFileName);
                resolutionsInFile.delete(name, mode);
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

    function resolveTypeReferenceDirectives(typeDirectiveNames: string[] | readonly ts.FileReference[], containingFile: string, redirectedReference?: ts.ResolvedProjectReference, containingFileMode?: ts.SourceFile["impliedNodeFormat"]): (ts.ResolvedTypeReferenceDirective | undefined)[] {
        return resolveNamesWithLocalCache<CachedResolvedTypeReferenceDirectiveWithFailedLookupLocations, ts.ResolvedTypeReferenceDirective>({
            names: typeDirectiveNames,
            containingFile,
            redirectedReference,
            cache: resolvedTypeReferenceDirectives,
            perDirectoryCacheWithRedirects: perDirectoryResolvedTypeReferenceDirectives,
            loader: resolveTypeReferenceDirective,
            getResolutionWithResolvedFileName: getResolvedTypeReferenceDirective,
            shouldRetryResolution: resolution => resolution.resolvedTypeReferenceDirective === undefined,
            containingSourceFileMode: containingFileMode
        });
    }

    function resolveModuleNames(moduleNames: string[], containingFile: string, reusedNames: string[] | undefined, redirectedReference?: ts.ResolvedProjectReference, containingSourceFile?: ts.SourceFile): (ts.ResolvedModuleFull | undefined)[] {
        return resolveNamesWithLocalCache<CachedResolvedModuleWithFailedLookupLocations, ts.ResolvedModuleFull>({
            names: moduleNames,
            containingFile,
            redirectedReference,
            cache: resolvedModuleNames,
            perDirectoryCacheWithRedirects: perDirectoryResolvedModuleNames,
            loader: resolveModuleName,
            getResolutionWithResolvedFileName: getResolvedModule,
            shouldRetryResolution: resolution => !resolution.resolvedModule || !ts.resolutionExtensionIsTSOrJson(resolution.resolvedModule.extension),
            reusedNames,
            logChanges: logChangesWhenResolvingModule,
            containingSourceFile,
        });
    }

    function getResolvedModuleWithFailedLookupLocationsFromCache(moduleName: string, containingFile: string, resolutionMode?: ts.ModuleKind.CommonJS | ts.ModuleKind.ESNext): CachedResolvedModuleWithFailedLookupLocations | undefined {
        const cache = resolvedModuleNames.get(resolutionHost.toPath(containingFile));
        if (!cache) return undefined;
        return cache.get(moduleName, resolutionMode);
    }

    function isNodeModulesAtTypesDirectory(dirPath: ts.Path) {
        return ts.endsWith(dirPath, "/node_modules/@types");
    }

    function getDirectoryToWatchFailedLookupLocation(failedLookupLocation: string, failedLookupLocationPath: ts.Path): DirectoryOfFailedLookupWatch | undefined {
        if (isInDirectoryPath(rootPath, failedLookupLocationPath)) {
            // Ensure failed look up is normalized path
            failedLookupLocation = ts.isRootedDiskPath(failedLookupLocation) ? ts.normalizePath(failedLookupLocation) : ts.getNormalizedAbsolutePath(failedLookupLocation, getCurrentDirectory());
            const failedLookupPathSplit = failedLookupLocationPath.split(ts.directorySeparator);
            const failedLookupSplit = failedLookupLocation.split(ts.directorySeparator);
            ts.Debug.assert(failedLookupSplit.length === failedLookupPathSplit.length, `FailedLookup: ${failedLookupLocation} failedLookupLocationPath: ${failedLookupLocationPath}`);
            if (failedLookupPathSplit.length > rootSplitLength + 1) {
                // Instead of watching root, watch directory in root to avoid watching excluded directories not needed for module resolution
                return {
                    dir: failedLookupSplit.slice(0, rootSplitLength + 1).join(ts.directorySeparator),
                    dirPath: failedLookupPathSplit.slice(0, rootSplitLength + 1).join(ts.directorySeparator) as ts.Path
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
            ts.getDirectoryPath(ts.getNormalizedAbsolutePath(failedLookupLocation, getCurrentDirectory())),
            ts.getDirectoryPath(failedLookupLocationPath)
        );
    }

    function getDirectoryToWatchFromFailedLookupLocationDirectory(dir: string, dirPath: ts.Path): DirectoryOfFailedLookupWatch | undefined {
        // If directory path contains node module, get the most parent node_modules directory for watching
        while (ts.pathContainsNodeModules(dirPath)) {
            dir = ts.getDirectoryPath(dir);
            dirPath = ts.getDirectoryPath(dirPath);
        }

        // If the directory is node_modules use it to watch, always watch it recursively
        if (ts.isNodeModulesDirectory(dirPath)) {
            return canWatchDirectoryOrFile(ts.getDirectoryPath(dirPath)) ? { dir, dirPath } : undefined;
        }

        let nonRecursive = true;
        // Use some ancestor of the root directory
        let subDirectoryPath: ts.Path | undefined, subDirectory: string | undefined;
        if (rootPath !== undefined) {
            while (!isInDirectoryPath(dirPath, rootPath)) {
                const parentPath = ts.getDirectoryPath(dirPath);
                if (parentPath === dirPath) {
                    break;
                }
                nonRecursive = false;
                subDirectoryPath = dirPath;
                subDirectory = dir;
                dirPath = parentPath;
                dir = ts.getDirectoryPath(dir);
            }
        }

        return canWatchDirectoryOrFile(dirPath) ? { dir: subDirectory || dir, dirPath: subDirectoryPath || dirPath, nonRecursive } : undefined;
    }

    function isPathWithDefaultFailedLookupExtension(path: ts.Path) {
        return ts.fileExtensionIsOneOf(path, failedLookupDefaultExtensions);
    }

    function watchFailedLookupLocationsOfExternalModuleResolutions<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>(
        name: string,
        resolution: T,
        filePath: ts.Path,
        getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>,
    ) {
        if (resolution.refCount) {
            resolution.refCount++;
            ts.Debug.assertIsDefined(resolution.files);
        }
        else {
            resolution.refCount = 1;
            ts.Debug.assert(ts.length(resolution.files) === 0); // This resolution shouldnt be referenced by any file yet
            if (ts.isExternalModuleNameRelative(name)) {
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
        ts.Debug.assert(!!resolution.refCount);

        const { failedLookupLocations, affectingLocations } = resolution;
        if (!failedLookupLocations.length && !affectingLocations.length) return;
        if (failedLookupLocations.length) resolutionsWithFailedLookups.push(resolution);

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
                    ts.Debug.assert(!nonRecursive);
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
        watchAffectingLocationsOfResolution(resolution, !failedLookupLocations.length);
    }

    function watchAffectingLocationsOfResolution(resolution: ResolutionWithFailedLookupLocations, addToResolutionsWithOnlyAffectingLocations: boolean) {
        ts.Debug.assert(!!resolution.refCount);
        const { affectingLocations } = resolution;
        if (!affectingLocations.length) return;
        if (addToResolutionsWithOnlyAffectingLocations) resolutionsWithOnlyAffectingLocations.push(resolution);
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
        const paths = new ts.Set<string>();
        paths.add(locationToWatch);
        let actualWatcher = canWatchDirectoryOrFile(resolutionHost.toPath(locationToWatch)) ?
            resolutionHost.watchAffectingFileLocation(locationToWatch, (fileName, eventKind) => {
                cachedDirectoryStructureHost?.addOrDeleteFile(fileName, resolutionHost.toPath(locationToWatch), eventKind);
                const packageJsonMap = moduleResolutionCache.getPackageJsonInfoCache().getInternalMap();
                paths.forEach(path => {
                    if (watcher.resolutions) (affectingPathChecks ??= new ts.Set()).add(path);
                    if (watcher.files) (affectingPathChecksForFile ??= new ts.Set()).add(path);
                    packageJsonMap?.delete(resolutionHost.toPath(path));
                });
                resolutionHost.scheduleInvalidateResolutionsOfFailedLookupLocations();
            }) : ts.noopFileWatcher;
        const watcher: FileWatcherOfAffectingLocation = {
            watcher: actualWatcher !== ts.noopFileWatcher ? {
                close: () => {
                    actualWatcher.close();
                    // Ensure when watching symlinked package.json, we can close the actual file watcher only once
                    actualWatcher = ts.noopFileWatcher;
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

    function watchFailedLookupLocationOfNonRelativeModuleResolutions(resolutions: ResolutionWithFailedLookupLocations[], name: string) {
        const program = resolutionHost.getCurrentProgram();
        if (!program || !program.getTypeChecker().tryFindAmbientModuleWithoutAugmentations(name)) {
            resolutions.forEach(watchFailedLookupLocationOfResolution);
        }
        else {
            resolutions.forEach(resolution => watchAffectingLocationsOfResolution(resolution, /*addToResolutionWithOnlyAffectingLocations*/ true));
        }
    }

    function setDirectoryWatcher(dir: string, dirPath: ts.Path, nonRecursive?: boolean) {
        const dirWatcher = directoryWatchesOfFailedLookups.get(dirPath);
        if (dirWatcher) {
            ts.Debug.assert(!!nonRecursive === !!dirWatcher.nonRecursive);
            dirWatcher.refCount++;
        }
        else {
            directoryWatchesOfFailedLookups.set(dirPath, { watcher: createDirectoryWatcher(dir, dirPath, nonRecursive), refCount: 1, nonRecursive });
        }
    }

    function stopWatchFailedLookupLocationOfResolution<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>(
        resolution: T,
        filePath: ts.Path,
        getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>,
    ) {
        ts.unorderedRemoveItem(ts.Debug.checkDefined(resolution.files), filePath);
        resolution.refCount!--;
        if (resolution.refCount) {
            return;
        }
        const resolved = getResolutionWithResolvedFileName(resolution);
        if (resolved && resolved.resolvedFileName) {
            resolvedFileToResolution.remove(resolutionHost.toPath(resolved.resolvedFileName), resolution);
        }

        const { failedLookupLocations, affectingLocations } = resolution;
        if (ts.unorderedRemoveItem(resolutionsWithFailedLookups, resolution)) {
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
                            ts.Debug.assert(refCount > 1);
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
        else if (affectingLocations.length) {
            ts.unorderedRemoveItem(resolutionsWithOnlyAffectingLocations, resolution);
        }

        for (const affectingLocation of affectingLocations) {
            const watcher = fileWatchesOfAffectingLocations.get(affectingLocation)!;
            watcher.resolutions--;
        }
    }

    function removeDirectoryWatcher(dirPath: string) {
        const dirWatcher = directoryWatchesOfFailedLookups.get(dirPath)!;
        // Do not close the watcher yet since it might be needed by other failed lookup locations.
        dirWatcher.refCount--;
    }

    function createDirectoryWatcher(directory: string, dirPath: ts.Path, nonRecursive: boolean | undefined) {
        return resolutionHost.watchDirectoryOfFailedLookupLocation(directory, fileOrDirectory => {
            const fileOrDirectoryPath = resolutionHost.toPath(fileOrDirectory);
            if (cachedDirectoryStructureHost) {
                // Since the file existence changed, update the sourceFiles cache
                cachedDirectoryStructureHost.addOrDeleteFileOrDirectory(fileOrDirectory, fileOrDirectoryPath);
            }

            scheduleInvalidateResolutionOfFailedLookupLocation(fileOrDirectoryPath, dirPath === fileOrDirectoryPath);
        }, nonRecursive ? ts.WatchDirectoryFlags.None : ts.WatchDirectoryFlags.Recursive);
    }

    function removeResolutionsOfFileFromCache<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>(
        cache: ts.ESMap<string, ts.ModeAwareCache<T>>,
        filePath: ts.Path,
        getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>,
    ) {
        // Deleted file, stop watching failed lookups for all the resolutions in the file
        const resolutions = cache.get(filePath);
        if (resolutions) {
            resolutions.forEach(resolution => stopWatchFailedLookupLocationOfResolution(resolution, filePath, getResolutionWithResolvedFileName));
            cache.delete(filePath);
        }
    }

    function removeResolutionsFromProjectReferenceRedirects(filePath: ts.Path) {
        if (!ts.fileExtensionIs(filePath, ts.Extension.Json)) return;

        const program = resolutionHost.getCurrentProgram();
        if (!program) return;

        // If this file is input file for the referenced project, get it
        const resolvedProjectReference = program.getResolvedProjectReferenceByPath(filePath);
        if (!resolvedProjectReference) return;

        // filePath is for the projectReference and the containing file is from this project reference, invalidate the resolution
        resolvedProjectReference.commandLine.fileNames.forEach(f => removeResolutionsOfFile(resolutionHost.toPath(f)));
    }

    function removeResolutionsOfFile(filePath: ts.Path) {
        removeResolutionsOfFileFromCache(resolvedModuleNames, filePath, getResolvedModule);
        removeResolutionsOfFileFromCache(resolvedTypeReferenceDirectives, filePath, getResolvedTypeReferenceDirective);
    }

    function invalidateResolutions(resolutions: ResolutionWithFailedLookupLocations[] | undefined, canInvalidate: (resolution: ResolutionWithFailedLookupLocations) => boolean) {
        if (!resolutions) return false;
        let invalidated = false;
        for (const resolution of resolutions) {
            if (resolution.isInvalidated || !canInvalidate(resolution)) continue;
            resolution.isInvalidated = invalidated = true;
            for (const containingFilePath of ts.Debug.checkDefined(resolution.files)) {
                (filesWithInvalidatedResolutions ??= new ts.Set()).add(containingFilePath);
                // When its a file with inferred types resolution, invalidate type reference directive resolution
                hasChangedAutomaticTypeDirectiveNames = hasChangedAutomaticTypeDirectiveNames || ts.endsWith(containingFilePath, ts.inferredTypesContainingFile);
            }
        }
        return invalidated;
    }

    function invalidateResolutionOfFile(filePath: ts.Path) {
        removeResolutionsOfFile(filePath);
        // Resolution is invalidated if the resulting file name is same as the deleted file path
        const prevHasChangedAutomaticTypeDirectiveNames = hasChangedAutomaticTypeDirectiveNames;
        if (invalidateResolutions(resolvedFileToResolution.get(filePath), ts.returnTrue) &&
            hasChangedAutomaticTypeDirectiveNames &&
            !prevHasChangedAutomaticTypeDirectiveNames) {
            resolutionHost.onChangedAutomaticTypeDirectiveNames();
        }
    }

    function setFilesWithInvalidatedNonRelativeUnresolvedImports(filesMap: ts.ReadonlyESMap<ts.Path, readonly string[]>) {
        ts.Debug.assert(filesWithInvalidatedNonRelativeUnresolvedImports === filesMap || filesWithInvalidatedNonRelativeUnresolvedImports === undefined);
        filesWithInvalidatedNonRelativeUnresolvedImports = filesMap;
    }

    function scheduleInvalidateResolutionOfFailedLookupLocation(fileOrDirectoryPath: ts.Path, isCreatingWatchedDirectory: boolean) {
        if (isCreatingWatchedDirectory) {
            // Watching directory is created
            // Invalidate any resolution has failed lookup in this directory
            (isInDirectoryChecks ||= new ts.Set()).add(fileOrDirectoryPath);
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
            const dirOfFileOrDirectory = ts.getDirectoryPath(fileOrDirectoryPath);
            if (isNodeModulesAtTypesDirectory(fileOrDirectoryPath) || ts.isNodeModulesDirectory(fileOrDirectoryPath) ||
                isNodeModulesAtTypesDirectory(dirOfFileOrDirectory) || ts.isNodeModulesDirectory(dirOfFileOrDirectory)) {
                // Invalidate any resolution from this directory
                (failedLookupChecks ||= new ts.Set()).add(fileOrDirectoryPath);
                (startsWithPathChecks ||= new ts.Set()).add(fileOrDirectoryPath);
            }
            else {
                if (!isPathWithDefaultFailedLookupExtension(fileOrDirectoryPath) && !customFailedLookupPaths.has(fileOrDirectoryPath)) {
                    return false;
                }
                // Ignore emits from the program
                if (ts.isEmittedFileOfProgram(resolutionHost.getCurrentProgram(), fileOrDirectoryPath)) {
                    return false;
                }
                // Resolution need to be invalidated if failed lookup location is same as the file or directory getting created
                (failedLookupChecks ||= new ts.Set()).add(fileOrDirectoryPath);

                // If the invalidated file is from a node_modules package, invalidate everything else
                // in the package since we might not get notifications for other files in the package.
                // This hardens our logic against unreliable file watchers.
                const packagePath = ts.parseNodeModuleFromPath(fileOrDirectoryPath);
                if (packagePath) (startsWithPathChecks ||= new ts.Set()).add(packagePath as ts.Path);
            }
        }
        resolutionHost.scheduleInvalidateResolutionsOfFailedLookupLocations();
    }

    function invalidateResolutionsOfFailedLookupLocations() {
        let invalidated = false;
        if (affectingPathChecksForFile) {
            resolutionHost.getCurrentProgram()?.getSourceFiles().forEach(f => {
                if (ts.some(f.packageJsonLocations, location => affectingPathChecksForFile!.has(location))) {
                    (filesWithInvalidatedResolutions ??= new ts.Set()).add(f.path);
                    invalidated = true;
                }
            });
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

    function isInvalidatedFailedLookup(locationPath: ts.Path) {
        return failedLookupChecks?.has(locationPath) ||
            ts.firstDefinedIterator(startsWithPathChecks?.keys() || ts.emptyIterator, fileOrDirectoryPath => ts.startsWith(locationPath, fileOrDirectoryPath) ? true : undefined) ||
            ts.firstDefinedIterator(isInDirectoryChecks?.keys() || ts.emptyIterator, fileOrDirectoryPath => isInDirectoryPath(fileOrDirectoryPath, locationPath) ? true : undefined);
    }

    function canInvalidatedFailedLookupResolutionWithAffectingLocation(resolution: ResolutionWithFailedLookupLocations) {
        return !!affectingPathChecks && resolution.affectingLocations.some(location => affectingPathChecks!.has(location));
    }

    function closeTypeRootsWatch() {
        ts.clearMap(typeRootsWatches, ts.closeFileWatcher);
    }

    function getDirectoryToWatchFailedLookupLocationFromTypeRoot(typeRoot: string, typeRootPath: ts.Path): ts.Path | undefined {
        if (isInDirectoryPath(rootPath, typeRootPath)) {
            return rootPath;
        }
        const toWatch = getDirectoryToWatchFromFailedLookupLocationDirectory(typeRoot, typeRootPath);
        return toWatch && directoryWatchesOfFailedLookups.has(toWatch.dirPath) ? toWatch.dirPath : undefined;
    }

    function createTypeRootsWatch(typeRootPath: ts.Path, typeRoot: string): ts.FileWatcher {
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
        }, ts.WatchDirectoryFlags.Recursive);
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
        const typeRoots = ts.getEffectiveTypeRoots(options, { directoryExists: directoryExistsForTypeRootWatch, getCurrentDirectory });
        if (typeRoots) {
            ts.mutateMap(
                typeRootsWatches,
                ts.arrayToMap(typeRoots, tr => resolutionHost.toPath(tr)),
                {
                    createNewValue: createTypeRootsWatch,
                    onDeleteValue: ts.closeFileWatcher
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
        const dir = ts.getDirectoryPath(ts.getDirectoryPath(nodeTypesDirectory));
        const dirPath = resolutionHost.toPath(dir);
        return dirPath === rootPath || canWatchDirectoryOrFile(dirPath);
    }
}

function resolutionIsSymlink(resolution: ResolutionWithFailedLookupLocations) {
    return !!(
        (resolution as ts.ResolvedModuleWithFailedLookupLocations).resolvedModule?.originalPath ||
        (resolution as ts.ResolvedTypeReferenceDirectiveWithFailedLookupLocations).resolvedTypeReferenceDirective?.originalPath
    );
}
