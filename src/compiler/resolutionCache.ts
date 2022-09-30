/*@internal*/
namespace ts {
    /** This is the cache of module/typedirectives resolution that can be retained across program */
    export interface ResolutionCache {
        startRecordingFilesWithChangedResolutions(): void;
        finishRecordingFilesWithChangedResolutions(): Path[] | undefined;

        resolveModuleNames(moduleNames: string[], containingFile: string, reusedNames: string[] | undefined, redirectedReference?: ResolvedProjectReference, containingSourceFile?: SourceFile): (ResolvedModuleFull | undefined)[];
        getResolvedModuleWithFailedLookupLocationsFromCache(moduleName: string, containingFile: string, resolutionMode?: ModuleKind.CommonJS | ModuleKind.ESNext): CachedResolvedModuleWithFailedLookupLocations | undefined;
        resolveTypeReferenceDirectives(typeDirectiveNames: string[] | readonly FileReference[], containingFile: string, redirectedReference?: ResolvedProjectReference, containingFileMode?: SourceFile["impliedNodeFormat"]): (ResolvedTypeReferenceDirective | undefined)[];

        invalidateResolutionsOfFailedLookupLocations(): boolean;
        invalidateResolutionOfFile(filePath: Path): void;
        removeResolutionsOfFile(filePath: Path): void;
        removeResolutionsFromProjectReferenceRedirects(filePath: Path): void;
        setFilesWithInvalidatedNonRelativeUnresolvedImports(filesWithUnresolvedImports: ESMap<Path, readonly string[]>): void;
        createHasInvalidatedResolutions(customHasInvalidatedResolutions: HasInvalidatedResolutions): HasInvalidatedResolutions;
        hasChangedAutomaticTypeDirectiveNames(): boolean;
        isFileWithInvalidatedNonRelativeUnresolvedImports(path: Path): boolean;


        startCachingPerDirectoryResolution(): void;
        finishCachingPerDirectoryResolution(newProgram: Program | undefined, oldProgram: Program | undefined): void;

        updateTypeRootsWatch(): void;
        closeTypeRootsWatch(): void;

        getModuleResolutionCache(): ModuleResolutionCache;

        clear(): void;
    }

    interface ResolutionWithFailedLookupLocations {
        readonly failedLookupLocations: string[];
        readonly affectingLocations: string[];
        isInvalidated?: boolean;
        refCount?: number;
        // Files that have this resolution using
        files?: Path[];
    }

    interface ResolutionWithResolvedFileName {
        resolvedFileName: string | undefined;
        packagetId?: PackageId;
    }

    interface CachedResolvedModuleWithFailedLookupLocations extends ResolvedModuleWithFailedLookupLocations, ResolutionWithFailedLookupLocations {
    }

    interface CachedResolvedTypeReferenceDirectiveWithFailedLookupLocations extends ResolvedTypeReferenceDirectiveWithFailedLookupLocations, ResolutionWithFailedLookupLocations {
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

    type GetResolutionWithResolvedFileName<T extends ResolutionWithFailedLookupLocations = ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName = ResolutionWithResolvedFileName> =
        (resolution: T) => R | undefined;

    export function createResolutionCache(resolutionHost: ResolutionCacheHost, rootDirForResolution: string | undefined, logChangesWhenResolvingModule: boolean): ResolutionCache {
        let filesWithChangedSetOfUnresolvedImports: Path[] | undefined;
        let filesWithInvalidatedResolutions: Set<Path> | undefined;
        let filesWithInvalidatedNonRelativeUnresolvedImports: ReadonlyESMap<Path, readonly string[]> | undefined;
        const nonRelativeExternalModuleResolutions = createMultiMap<ResolutionWithFailedLookupLocations>();

        const resolutionsWithFailedLookups: ResolutionWithFailedLookupLocations[] = [];
        const resolutionsWithOnlyAffectingLocations: ResolutionWithFailedLookupLocations[] = [];
        const resolvedFileToResolution = createMultiMap<ResolutionWithFailedLookupLocations>();
        const impliedFormatPackageJsons = new Map<Path, readonly string[]>();

        let hasChangedAutomaticTypeDirectiveNames = false;
        let affectingPathChecksForFile: Set<string> | undefined;
        let affectingPathChecks: Set<string> | undefined;
        let failedLookupChecks: Set<Path> | undefined;
        let startsWithPathChecks: Set<Path> | undefined;
        let isInDirectoryChecks: Set<Path> | undefined;

        const getCurrentDirectory = memoize(() => resolutionHost.getCurrentDirectory!()); // TODO: GH#18217
        const cachedDirectoryStructureHost = resolutionHost.getCachedDirectoryStructureHost();

        // The resolvedModuleNames and resolvedTypeReferenceDirectives are the cache of resolutions per file.
        // The key in the map is source file's path.
        // The values are Map of resolutions with key being name lookedup.
        const resolvedModuleNames = new Map<Path, ModeAwareCache<CachedResolvedModuleWithFailedLookupLocations>>();
        const perDirectoryResolvedModuleNames: CacheWithRedirects<ModeAwareCache<CachedResolvedModuleWithFailedLookupLocations>> = createCacheWithRedirects();
        const nonRelativeModuleNameCache: CacheWithRedirects<PerModuleNameCache> = createCacheWithRedirects();
        const moduleResolutionCache = createModuleResolutionCache(
            getCurrentDirectory(),
            resolutionHost.getCanonicalFileName,
            /*options*/ undefined,
            perDirectoryResolvedModuleNames,
            nonRelativeModuleNameCache,
        );

        const resolvedTypeReferenceDirectives = new Map<Path, ModeAwareCache<CachedResolvedTypeReferenceDirectiveWithFailedLookupLocations>>();
        const perDirectoryResolvedTypeReferenceDirectives: CacheWithRedirects<ModeAwareCache<CachedResolvedTypeReferenceDirectiveWithFailedLookupLocations>> = createCacheWithRedirects();
        const typeReferenceDirectiveResolutionCache = createTypeReferenceDirectiveResolutionCache(
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

        function isFileWithInvalidatedNonRelativeUnresolvedImports(path: Path): boolean {
            if (!filesWithInvalidatedNonRelativeUnresolvedImports) {
                return false;
            }

            // Invalidated if file has unresolved imports
            const value = filesWithInvalidatedNonRelativeUnresolvedImports.get(path);
            return !!value && !!value.length;
        }

        function createHasInvalidatedResolutions(customHasInvalidatedResolutions: HasInvalidatedResolutions): HasInvalidatedResolutions {
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

        function finishCachingPerDirectoryResolution(newProgram: Program | undefined, oldProgram: Program | undefined) {
            filesWithInvalidatedNonRelativeUnresolvedImports = undefined;
            nonRelativeExternalModuleResolutions.forEach(watchFailedLookupLocationOfNonRelativeModuleResolutions);
            nonRelativeExternalModuleResolutions.clear();
            // Update file watches
            if (newProgram !== oldProgram) {
                newProgram?.getSourceFiles().forEach(newFile => {
                    const expected = isExternalOrCommonJsModule(newFile) ? newFile.packageJsonLocations?.length ?? 0 : 0;
                    const existing = impliedFormatPackageJsons.get(newFile.path) ?? emptyArray;
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

        function resolveModuleName(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, redirectedReference?: ResolvedProjectReference, _containingSourceFile?: never, mode?: ModuleKind.CommonJS | ModuleKind.ESNext | undefined): CachedResolvedModuleWithFailedLookupLocations {
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
                const { resolvedModule, failedLookupLocations, affectingLocations } = loadModuleFromGlobalCache(
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
                    primaryResult.failedLookupLocations.push(...failedLookupLocations);
                    primaryResult.affectingLocations.push(...affectingLocations);
                    return primaryResult;
                }
            }

            // Default return the result from the first pass
            return primaryResult;
        }

        function resolveTypeReferenceDirective(typeReferenceDirectiveName: string, containingFile: string | undefined, options: CompilerOptions, host: ModuleResolutionHost, redirectedReference?: ResolvedProjectReference, _containingSourceFile?: SourceFile, resolutionMode?: SourceFile["impliedNodeFormat"] | undefined): CachedResolvedTypeReferenceDirectiveWithFailedLookupLocations {
            return ts.resolveTypeReferenceDirective(typeReferenceDirectiveName, containingFile, options, host, redirectedReference, typeReferenceDirectiveResolutionCache, resolutionMode);
        }

        interface ResolveNamesWithLocalCacheInput<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName> {
            names: readonly string[] | readonly FileReference[];
            containingFile: string;
            redirectedReference: ResolvedProjectReference | undefined;
            cache: ESMap<Path, ModeAwareCache<T>>;
            perDirectoryCacheWithRedirects: CacheWithRedirects<ModeAwareCache<T>>;
            loader: (name: string, containingFile: string, options: CompilerOptions, host: ModuleResolutionHost, redirectedReference?: ResolvedProjectReference, containingSourceFile?: SourceFile, resolutionMode?: ModuleKind.CommonJS | ModuleKind.ESNext | undefined) => T;
            getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>;
            shouldRetryResolution: (t: T) => boolean;
            reusedNames?: readonly string[];
            logChanges?: boolean;
            containingSourceFile?: SourceFile;
            containingSourceFileMode?: SourceFile["impliedNodeFormat"];
        }
        function resolveNamesWithLocalCache<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>({
            names, containingFile, redirectedReference,
            cache, perDirectoryCacheWithRedirects,
            loader, getResolutionWithResolvedFileName,
            shouldRetryResolution, reusedNames, logChanges, containingSourceFile, containingSourceFileMode
        }: ResolveNamesWithLocalCacheInput<T, R>): (R | undefined)[] {
            const path = resolutionHost.toPath(containingFile);
            const resolutionsInFile = cache.get(path) || cache.set(path, createModeAwareCache()).get(path)!;
            const dirPath = getDirectoryPath(path);
            const perDirectoryCache = perDirectoryCacheWithRedirects.getOrCreateMapOfCacheRedirects(redirectedReference);
            let perDirectoryResolution = perDirectoryCache.get(dirPath);
            if (!perDirectoryResolution) {
                perDirectoryResolution = createModeAwareCache();
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

            const seenNamesInFile = createModeAwareCache<true>();
            let i = 0;
            for (const entry of names) {
                const name = isString(entry) ? entry : entry.fileName.toLowerCase();
                // Imports supply a `containingSourceFile` but no `containingSourceFileMode` - it would be redundant
                // they require calculating the mode for a given import from it's position in the resolution table, since a given
                // import's syntax may override the file's default mode.
                // Type references instead supply a `containingSourceFileMode` and a non-string entry which contains
                // a default file mode override if applicable.
                const mode = !isString(entry) ? getModeForFileReference(entry, containingSourceFileMode) :
                    containingSourceFile ? getModeForResolutionAtIndex(containingSourceFile, i) : undefined;
                i++;
                let resolution = resolutionsInFile.get(name, mode);
                // Resolution is valid if it is present and not invalidated
                if (!seenNamesInFile.has(name, mode) &&
                    unmatchedRedirects || !resolution || resolution.isInvalidated ||
                    // If the name is unresolved import that was invalidated, recalculate
                    (hasInvalidatedNonRelativeUnresolvedImport && !isExternalModuleNameRelative(name) && shouldRetryResolution(resolution))) {
                    const existingResolution = resolution;
                    const resolutionInDirectory = perDirectoryResolution.get(name, mode);
                    if (resolutionInDirectory) {
                        resolution = resolutionInDirectory;
                        const host = resolutionHost.getCompilerHost?.() || resolutionHost;
                        if (isTraceEnabled(compilerOptions, host)) {
                            const resolved = getResolutionWithResolvedFileName(resolution);
                            trace(
                                host,
                                loader === resolveModuleName as unknown ?
                                    resolved?.resolvedFileName ?
                                        resolved.packagetId ?
                                            Diagnostics.Reusing_resolution_of_module_0_from_1_found_in_cache_from_location_2_it_was_successfully_resolved_to_3_with_Package_ID_4:
                                            Diagnostics.Reusing_resolution_of_module_0_from_1_found_in_cache_from_location_2_it_was_successfully_resolved_to_3:
                                        Diagnostics.Reusing_resolution_of_module_0_from_1_found_in_cache_from_location_2_it_was_not_resolved :
                                    resolved?.resolvedFileName ?
                                        resolved.packagetId ?
                                            Diagnostics.Reusing_resolution_of_type_reference_directive_0_from_1_found_in_cache_from_location_2_it_was_successfully_resolved_to_3_with_Package_ID_4 :
                                            Diagnostics.Reusing_resolution_of_type_reference_directive_0_from_1_found_in_cache_from_location_2_it_was_successfully_resolved_to_3 :
                                        Diagnostics.Reusing_resolution_of_type_reference_directive_0_from_1_found_in_cache_from_location_2_it_was_not_resolved,
                                name,
                                containingFile,
                                getDirectoryPath(containingFile),
                                resolved?.resolvedFileName,
                                resolved?.packagetId && packageIdToString(resolved.packagetId)
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
                    if (isTraceEnabled(compilerOptions, host) && !seenNamesInFile.has(name, mode)) {
                        const resolved = getResolutionWithResolvedFileName(resolution);
                        trace(
                            host,
                            loader === resolveModuleName as unknown ?
                                resolved?.resolvedFileName ?
                                    resolved.packagetId ?
                                        Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2_with_Package_ID_3 :
                                        Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2 :
                                    Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_not_resolved :
                                resolved?.resolvedFileName ?
                                    resolved.packagetId ?
                                        Diagnostics.Reusing_resolution_of_type_reference_directive_0_from_1_of_old_program_it_was_successfully_resolved_to_2_with_Package_ID_3 :
                                        Diagnostics.Reusing_resolution_of_type_reference_directive_0_from_1_of_old_program_it_was_successfully_resolved_to_2 :
                                    Diagnostics.Reusing_resolution_of_type_reference_directive_0_from_1_of_old_program_it_was_not_resolved,
                            name,
                            containingFile,
                            resolved?.resolvedFileName,
                            resolved?.packagetId && packageIdToString(resolved.packagetId)
                        );
                    }
                }
                Debug.assert(resolution !== undefined && !resolution.isInvalidated);
                seenNamesInFile.set(name, mode, true);
                resolvedModules.push(getResolutionWithResolvedFileName(resolution));
            }

            // Stop watching and remove the unused name
            resolutionsInFile.forEach((resolution, name, mode) => {
                if (!seenNamesInFile.has(name, mode) && !contains(reusedNames, name)) {
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

        function resolveTypeReferenceDirectives(typeDirectiveNames: string[] | readonly FileReference[], containingFile: string, redirectedReference?: ResolvedProjectReference, containingFileMode?: SourceFile["impliedNodeFormat"]): (ResolvedTypeReferenceDirective | undefined)[] {
            return resolveNamesWithLocalCache<CachedResolvedTypeReferenceDirectiveWithFailedLookupLocations, ResolvedTypeReferenceDirective>({
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

        function resolveModuleNames(moduleNames: string[], containingFile: string, reusedNames: string[] | undefined, redirectedReference?: ResolvedProjectReference, containingSourceFile?: SourceFile): (ResolvedModuleFull | undefined)[] {
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
                logChanges: logChangesWhenResolvingModule,
                containingSourceFile,
            });
        }

        function getResolvedModuleWithFailedLookupLocationsFromCache(moduleName: string, containingFile: string, resolutionMode?: ModuleKind.CommonJS | ModuleKind.ESNext): CachedResolvedModuleWithFailedLookupLocations | undefined {
            const cache = resolvedModuleNames.get(resolutionHost.toPath(containingFile));
            if (!cache) return undefined;
            return cache.get(moduleName, resolutionMode);
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

        function watchFailedLookupLocationsOfExternalModuleResolutions<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>(
            name: string,
            resolution: T,
            filePath: Path,
            getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>,
        ) {
            if (resolution.refCount) {
                resolution.refCount++;
                Debug.assertIsDefined(resolution.files);
            }
            else {
                resolution.refCount = 1;
                Debug.assert(length(resolution.files) === 0); // This resolution shouldnt be referenced by any file yet
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
            watchAffectingLocationsOfResolution(resolution, !failedLookupLocations.length);
        }

        function watchAffectingLocationsOfResolution(resolution: ResolutionWithFailedLookupLocations, addToResolutionsWithOnlyAffectingLocations: boolean) {
            Debug.assert(!!resolution.refCount);
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

        function watchFailedLookupLocationOfNonRelativeModuleResolutions(resolutions: ResolutionWithFailedLookupLocations[], name: string) {
            const program = resolutionHost.getCurrentProgram();
            if (!program || !program.getTypeChecker().tryFindAmbientModuleWithoutAugmentations(name)) {
                resolutions.forEach(watchFailedLookupLocationOfResolution);
            }
            else {
                resolutions.forEach(resolution => watchAffectingLocationsOfResolution(resolution, /*addToResolutionWithOnlyAffectingLocations*/ true));
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
            unorderedRemoveItem(Debug.checkDefined(resolution.files), filePath);
            resolution.refCount!--;
            if (resolution.refCount) {
                return;
            }
            const resolved = getResolutionWithResolvedFileName(resolution);
            if (resolved && resolved.resolvedFileName) {
                resolvedFileToResolution.remove(resolutionHost.toPath(resolved.resolvedFileName), resolution);
            }

            const { failedLookupLocations, affectingLocations } = resolution;
            if (unorderedRemoveItem(resolutionsWithFailedLookups, resolution)) {
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
            else if (affectingLocations.length) {
                unorderedRemoveItem(resolutionsWithOnlyAffectingLocations, resolution);
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
            cache: ESMap<string, ModeAwareCache<T>>,
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
            removeResolutionsOfFileFromCache(resolvedModuleNames, filePath, getResolvedModule);
            removeResolutionsOfFileFromCache(resolvedTypeReferenceDirectives, filePath, getResolvedTypeReferenceDirective);
        }

        function invalidateResolutions(resolutions: ResolutionWithFailedLookupLocations[] | undefined, canInvalidate: (resolution: ResolutionWithFailedLookupLocations) => boolean) {
            if (!resolutions) return false;
            let invalidated = false;
            for (const resolution of resolutions) {
                if (resolution.isInvalidated || !canInvalidate(resolution)) continue;
                resolution.isInvalidated = invalidated = true;
                for (const containingFilePath of Debug.checkDefined(resolution.files)) {
                    (filesWithInvalidatedResolutions ??= new Set()).add(containingFilePath);
                    // When its a file with inferred types resolution, invalidate type reference directive resolution
                    hasChangedAutomaticTypeDirectiveNames = hasChangedAutomaticTypeDirectiveNames || endsWith(containingFilePath, inferredTypesContainingFile);
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

        function setFilesWithInvalidatedNonRelativeUnresolvedImports(filesMap: ReadonlyESMap<Path, readonly string[]>) {
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
            return !!affectingPathChecks && resolution.affectingLocations.some(location => affectingPathChecks!.has(location));
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
