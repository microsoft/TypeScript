namespace ts {
    /* @internal */
    export function trace(host: ModuleResolutionHost, message: DiagnosticMessage, ...args: any[]): void;
    export function trace(host: ModuleResolutionHost): void {
        host.trace!(formatMessage.apply(undefined, arguments));
    }

    /* @internal */
    export function isTraceEnabled(compilerOptions: CompilerOptions, host: ModuleResolutionHost): boolean {
        return !!compilerOptions.traceResolution && host.trace !== undefined;
    }

    function withPackageId(packageInfo: PackageJsonInfo | undefined, r: PathAndExtension | undefined): Resolved | undefined {
        let packageId: PackageId | undefined;
        if (r && packageInfo) {
            const packageJsonContent = packageInfo.packageJsonContent as PackageJson;
            if (typeof packageJsonContent.name === "string" && typeof packageJsonContent.version === "string") {
                packageId = {
                    name: packageJsonContent.name,
                    subModuleName: r.path.slice(packageInfo.packageDirectory.length + directorySeparator.length),
                    version: packageJsonContent.version
                };
            }
        }
        return r && { path: r.path, extension: r.ext, packageId };
    }

    function noPackageId(r: PathAndExtension | undefined): Resolved | undefined {
        return withPackageId(/*packageInfo*/ undefined, r);
    }

    function removeIgnoredPackageId(r: Resolved | undefined): PathAndExtension | undefined {
        if (r) {
            Debug.assert(r.packageId === undefined);
            return { path: r.path, ext: r.extension };
        }
    }

    /** Result of trying to resolve a module. */
    interface Resolved {
        path: string;
        extension: Extension;
        packageId: PackageId | undefined;
        /**
         * When the resolved is not created from cache, the value is
         *  - string if original Path if it is symbolic link to the resolved path
         *  - undefined if path is not a symbolic link
         * When the resolved is created using value from cache of ResolvedModuleWithFailedLookupLocations, the value is:
         *  - string if original Path if it is symbolic link to the resolved path
         *  - true if path is not a symbolic link - this indicates that the originalPath calculation is already done and needs to be skipped
         */
        originalPath?: string | true;
    }

    /** Result of trying to resolve a module at a file. Needs to have 'packageId' added later. */
    interface PathAndExtension {
        path: string;
        // (Use a different name than `extension` to make sure Resolved isn't assignable to PathAndExtension.)
        ext: Extension;
    }

    /**
     * Kinds of file that we are currently looking for.
     * Typically there is one pass with Extensions.TypeScript, then a second pass with Extensions.JavaScript.
     */
    enum Extensions {
        TypeScript, /** '.ts', '.tsx', or '.d.ts' */
        JavaScript, /** '.js' or '.jsx' */
        Json,       /** '.json' */
        TSConfig,   /** '.json' with `tsconfig` used instead of `index` */
        DtsOnly /** Only '.d.ts' */
    }

    interface PathAndPackageId {
        readonly fileName: string;
        readonly packageId: PackageId | undefined;
    }
    /** Used with `Extensions.DtsOnly` to extract the path from TypeScript results. */
    function resolvedTypeScriptOnly(resolved: Resolved | undefined): PathAndPackageId | undefined {
        if (!resolved) {
            return undefined;
        }
        Debug.assert(extensionIsTS(resolved.extension));
        return { fileName: resolved.path, packageId: resolved.packageId };
    }

    function createResolvedModuleWithFailedLookupLocations(resolved: Resolved | undefined, isExternalLibraryImport: boolean | undefined, failedLookupLocations: string[], resultFromCache: ResolvedModuleWithFailedLookupLocations | undefined): ResolvedModuleWithFailedLookupLocations {
        if (resultFromCache) {
            resultFromCache.failedLookupLocations.push(...failedLookupLocations);
            return resultFromCache;
        }
        return {
            resolvedModule: resolved && { resolvedFileName: resolved.path, originalPath: resolved.originalPath === true ? undefined : resolved.originalPath, extension: resolved.extension, isExternalLibraryImport, packageId: resolved.packageId },
            failedLookupLocations
        };
    }

    interface ModuleResolutionState {
        host: ModuleResolutionHost;
        compilerOptions: CompilerOptions;
        traceEnabled: boolean;
        failedLookupLocations: Push<string>;
        resultFromCache?: ResolvedModuleWithFailedLookupLocations;
    }

    /** Just the fields that we use for module resolution. */
    interface PackageJsonPathFields {
        typings?: string;
        types?: string;
        typesVersions?: MapLike<MapLike<string[]>>;
        main?: string;
        tsconfig?: string;
    }

    interface PackageJson extends PackageJsonPathFields {
        name?: string;
        version?: string;
    }

    function readPackageJsonField<TMatch, K extends MatchingKeys<PackageJson, string | undefined>>(jsonContent: PackageJson, fieldName: K, typeOfTag: "string", state: ModuleResolutionState): PackageJson[K] | undefined;
    function readPackageJsonField<K extends MatchingKeys<PackageJson, object | undefined>>(jsonContent: PackageJson, fieldName: K, typeOfTag: "object", state: ModuleResolutionState): PackageJson[K] | undefined;
    function readPackageJsonField<K extends keyof PackageJson>(jsonContent: PackageJson, fieldName: K, typeOfTag: "string" | "object", state: ModuleResolutionState): PackageJson[K] | undefined {
        if (!hasProperty(jsonContent, fieldName)) {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.package_json_does_not_have_a_0_field, fieldName);
            }
            return;
        }
        const value = jsonContent[fieldName];
        if (typeof value !== typeOfTag || value === null) { // eslint-disable-line no-null/no-null
            if (state.traceEnabled) {
                // eslint-disable-next-line no-null/no-null
                trace(state.host, Diagnostics.Expected_type_of_0_field_in_package_json_to_be_1_got_2, fieldName, typeOfTag, value === null ? "null" : typeof value);
            }
            return;
        }
        return value;
    }

    function readPackageJsonPathField<K extends "typings" | "types" | "main" | "tsconfig">(jsonContent: PackageJson, fieldName: K, baseDirectory: string, state: ModuleResolutionState): PackageJson[K] | undefined {
        const fileName = readPackageJsonField(jsonContent, fieldName, "string", state);
        if (fileName === undefined) {
            return;
        }
        if (!fileName) {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.package_json_had_a_falsy_0_field, fieldName);
            }
            return;
        }
        const path = normalizePath(combinePaths(baseDirectory, fileName));
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.package_json_has_0_field_1_that_references_2, fieldName, fileName, path);
        }
        return path;
    }

    function readPackageJsonTypesFields(jsonContent: PackageJson, baseDirectory: string, state: ModuleResolutionState) {
        return readPackageJsonPathField(jsonContent, "typings", baseDirectory, state)
            || readPackageJsonPathField(jsonContent, "types", baseDirectory, state);
    }

    function readPackageJsonTSConfigField(jsonContent: PackageJson, baseDirectory: string, state: ModuleResolutionState) {
        return readPackageJsonPathField(jsonContent, "tsconfig", baseDirectory, state);
    }

    function readPackageJsonMainField(jsonContent: PackageJson, baseDirectory: string, state: ModuleResolutionState) {
        return readPackageJsonPathField(jsonContent, "main", baseDirectory, state);
    }

    function readPackageJsonTypesVersionsField(jsonContent: PackageJson, state: ModuleResolutionState) {
        const typesVersions = readPackageJsonField(jsonContent, "typesVersions", "object", state);
        if (typesVersions === undefined) return;

        if (state.traceEnabled) {
            trace(state.host, Diagnostics.package_json_has_a_typesVersions_field_with_version_specific_path_mappings);
        }

        return typesVersions;
    }

    interface VersionPaths {
        version: string;
        paths: MapLike<string[]>;
    }

    function readPackageJsonTypesVersionPaths(jsonContent: PackageJson, state: ModuleResolutionState): VersionPaths | undefined {
        const typesVersions = readPackageJsonTypesVersionsField(jsonContent, state);
        if (typesVersions === undefined) return;

        if (state.traceEnabled) {
            for (const key in typesVersions) {
                if (hasProperty(typesVersions, key) && !VersionRange.tryParse(key)) {
                    trace(state.host, Diagnostics.package_json_has_a_typesVersions_entry_0_that_is_not_a_valid_semver_range, key);
                }
            }
        }

        const result = getPackageJsonTypesVersionsPaths(typesVersions);
        if (!result) {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.package_json_does_not_have_a_typesVersions_entry_that_matches_version_0, versionMajorMinor);
            }
            return;
        }

        const { version: bestVersionKey, paths: bestVersionPaths } = result;
        if (typeof bestVersionPaths !== "object") {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Expected_type_of_0_field_in_package_json_to_be_1_got_2, `typesVersions['${bestVersionKey}']`, "object", typeof bestVersionPaths);
            }
            return;
        }

        return result;
    }

    let typeScriptVersion: Version | undefined;

    /* @internal */
    export function getPackageJsonTypesVersionsPaths(typesVersions: MapLike<MapLike<string[]>>) {
        if (!typeScriptVersion) typeScriptVersion = new Version(version);

        for (const key in typesVersions) {
            if (!hasProperty(typesVersions, key)) continue;

            const keyRange = VersionRange.tryParse(key);
            if (keyRange === undefined) {
                continue;
            }

            // return the first entry whose range matches the current compiler version.
            if (keyRange.test(typeScriptVersion)) {
                return { version: key, paths: typesVersions[key] };
            }
        }
    }

    export function getEffectiveTypeRoots(options: CompilerOptions, host: GetEffectiveTypeRootsHost): string[] | undefined {
        if (options.typeRoots) {
            return options.typeRoots;
        }

        let currentDirectory: string | undefined;
        if (options.configFilePath) {
            currentDirectory = getDirectoryPath(options.configFilePath);
        }
        else if (host.getCurrentDirectory) {
            currentDirectory = host.getCurrentDirectory();
        }

        if (currentDirectory !== undefined) {
            return getDefaultTypeRoots(currentDirectory, host);
        }
    }

    /**
     * Returns the path to every node_modules/@types directory from some ancestor directory.
     * Returns undefined if there are none.
     */
    function getDefaultTypeRoots(currentDirectory: string, host: { directoryExists?: (directoryName: string) => boolean }): string[] | undefined {
        if (!host.directoryExists) {
            return [combinePaths(currentDirectory, nodeModulesAtTypes)];
            // And if it doesn't exist, tough.
        }

        let typeRoots: string[] | undefined;
        forEachAncestorDirectory(normalizePath(currentDirectory), directory => {
            const atTypes = combinePaths(directory, nodeModulesAtTypes);
            if (host.directoryExists!(atTypes)) {
                (typeRoots || (typeRoots = [])).push(atTypes);
            }
            return undefined;
        });
        return typeRoots;
    }
    const nodeModulesAtTypes = combinePaths("node_modules", "@types");

    /**
     * @param {string | undefined} containingFile - file that contains type reference directive, can be undefined if containing file is unknown.
     * This is possible in case if resolution is performed for directives specified via 'types' parameter. In this case initial path for secondary lookups
     * is assumed to be the same as root directory of the project.
     */
    export function resolveTypeReferenceDirective(typeReferenceDirectiveName: string, containingFile: string | undefined, options: CompilerOptions, host: ModuleResolutionHost, redirectedReference?: ResolvedProjectReference): ResolvedTypeReferenceDirectiveWithFailedLookupLocations {
        const traceEnabled = isTraceEnabled(options, host);
        if (redirectedReference) {
            options = redirectedReference.commandLine.options;
        }
        const failedLookupLocations: string[] = [];
        const moduleResolutionState: ModuleResolutionState = { compilerOptions: options, host, traceEnabled, failedLookupLocations };

        const typeRoots = getEffectiveTypeRoots(options, host);
        if (traceEnabled) {
            if (containingFile === undefined) {
                if (typeRoots === undefined) {
                    trace(host, Diagnostics.Resolving_type_reference_directive_0_containing_file_not_set_root_directory_not_set, typeReferenceDirectiveName);
                }
                else {
                    trace(host, Diagnostics.Resolving_type_reference_directive_0_containing_file_not_set_root_directory_1, typeReferenceDirectiveName, typeRoots);
                }
            }
            else {
                if (typeRoots === undefined) {
                    trace(host, Diagnostics.Resolving_type_reference_directive_0_containing_file_1_root_directory_not_set, typeReferenceDirectiveName, containingFile);
                }
                else {
                    trace(host, Diagnostics.Resolving_type_reference_directive_0_containing_file_1_root_directory_2, typeReferenceDirectiveName, containingFile, typeRoots);
                }
            }
            if (redirectedReference) {
                trace(host, Diagnostics.Using_compiler_options_of_project_reference_redirect_0, redirectedReference.sourceFile.fileName);
            }
        }

        let resolved = primaryLookup();
        let primary = true;
        if (!resolved) {
            resolved = secondaryLookup();
            primary = false;
        }

        let resolvedTypeReferenceDirective: ResolvedTypeReferenceDirective | undefined;
        if (resolved) {
            const { fileName, packageId } = resolved;
            const resolvedFileName = options.preserveSymlinks ? fileName : realPath(fileName, host, traceEnabled);
            if (traceEnabled) {
                if (packageId) {
                    trace(host, Diagnostics.Type_reference_directive_0_was_successfully_resolved_to_1_with_Package_ID_2_primary_Colon_3, typeReferenceDirectiveName, resolvedFileName, packageIdToString(packageId), primary);
                }
                else {
                    trace(host, Diagnostics.Type_reference_directive_0_was_successfully_resolved_to_1_primary_Colon_2, typeReferenceDirectiveName, resolvedFileName, primary);
                }
            }
            resolvedTypeReferenceDirective = { primary, resolvedFileName, packageId, isExternalLibraryImport: pathContainsNodeModules(fileName) };
        }

        return { resolvedTypeReferenceDirective, failedLookupLocations };

        function primaryLookup(): PathAndPackageId | undefined {
            // Check primary library paths
            if (typeRoots && typeRoots.length) {
                if (traceEnabled) {
                    trace(host, Diagnostics.Resolving_with_primary_search_path_0, typeRoots.join(", "));
                }
                return firstDefined(typeRoots, typeRoot => {
                    const candidate = combinePaths(typeRoot, typeReferenceDirectiveName);
                    const candidateDirectory = getDirectoryPath(candidate);
                    const directoryExists = directoryProbablyExists(candidateDirectory, host);
                    if (!directoryExists && traceEnabled) {
                        trace(host, Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, candidateDirectory);
                    }
                    return resolvedTypeScriptOnly(
                        loadNodeModuleFromDirectory(Extensions.DtsOnly, candidate,
                            !directoryExists, moduleResolutionState));
                });
            }
            else {
                if (traceEnabled) {
                    trace(host, Diagnostics.Root_directory_cannot_be_determined_skipping_primary_search_paths);
                }
            }
        }

        function secondaryLookup(): PathAndPackageId | undefined {
            const initialLocationForSecondaryLookup = containingFile && getDirectoryPath(containingFile);

            if (initialLocationForSecondaryLookup !== undefined) {
                // check secondary locations
                if (traceEnabled) {
                    trace(host, Diagnostics.Looking_up_in_node_modules_folder_initial_location_0, initialLocationForSecondaryLookup);
                }
                let result: Resolved | undefined;
                if (!isExternalModuleNameRelative(typeReferenceDirectiveName)) {
                    const searchResult = loadModuleFromNearestNodeModulesDirectory(Extensions.DtsOnly, typeReferenceDirectiveName, initialLocationForSecondaryLookup, moduleResolutionState, /*cache*/ undefined, /*redirectedReference*/ undefined);
                    result = searchResult && searchResult.value;
                }
                else {
                    const { path: candidate } = normalizePathAndParts(combinePaths(initialLocationForSecondaryLookup, typeReferenceDirectiveName));
                    result = nodeLoadModuleByRelativeName(Extensions.DtsOnly, candidate, /*onlyRecordFailures*/ false, moduleResolutionState, /*considerPackageJson*/ true);
                }
                const resolvedFile = resolvedTypeScriptOnly(result);
                if (!resolvedFile && traceEnabled) {
                    trace(host, Diagnostics.Type_reference_directive_0_was_not_resolved, typeReferenceDirectiveName);
                }
                return resolvedFile;
            }
            else {
                if (traceEnabled) {
                    trace(host, Diagnostics.Containing_file_is_not_specified_and_root_directory_cannot_be_determined_skipping_lookup_in_node_modules_folder);
                }
            }
        }
    }

    /**
     * Given a set of options, returns the set of type directive names
     *   that should be included for this program automatically.
     * This list could either come from the config file,
     *   or from enumerating the types root + initial secondary types lookup location.
     * More type directives might appear in the program later as a result of loading actual source files;
     *   this list is only the set of defaults that are implicitly included.
     */
    export function getAutomaticTypeDirectiveNames(options: CompilerOptions, host: ModuleResolutionHost): string[] {
        // Use explicit type list from tsconfig.json
        if (options.types) {
            return options.types;
        }

        // Walk the primary type lookup locations
        const result: string[] = [];
        if (host.directoryExists && host.getDirectories) {
            const typeRoots = getEffectiveTypeRoots(options, host);
            if (typeRoots) {
                for (const root of typeRoots) {
                    if (host.directoryExists(root)) {
                        for (const typeDirectivePath of host.getDirectories(root)) {
                            const normalized = normalizePath(typeDirectivePath);
                            const packageJsonPath = combinePaths(root, normalized, "package.json");
                            // `types-publisher` sometimes creates packages with `"typings": null` for packages that don't provide their own types.
                            // See `createNotNeededPackageJSON` in the types-publisher` repo.
                            // eslint-disable-next-line no-null/no-null
                            const isNotNeededPackage = host.fileExists(packageJsonPath) && (readJson(packageJsonPath, host) as PackageJson).typings === null;
                            if (!isNotNeededPackage) {
                                const baseFileName = getBaseFileName(normalized);

                                // At this stage, skip results with leading dot.
                                if (baseFileName.charCodeAt(0) !== CharacterCodes.dot) {
                                    // Return just the type directive names
                                    result.push(baseFileName);
                                }
                            }
                        }
                    }
                }
            }
        }
        return result;
    }

    /**
     * Cached module resolutions per containing directory.
     * This assumes that any module id will have the same resolution for sibling files located in the same folder.
     */
    export interface ModuleResolutionCache extends NonRelativeModuleNameResolutionCache {
        getOrCreateCacheForDirectory(directoryName: string, redirectedReference?: ResolvedProjectReference): Map<string, ResolvedModuleWithFailedLookupLocations>;
        /*@internal*/ directoryToModuleNameMap: CacheWithRedirects<Map<string, ResolvedModuleWithFailedLookupLocations>>;
    }

    /**
     * Stored map from non-relative module name to a table: directory -> result of module lookup in this directory
     * We support only non-relative module names because resolution of relative module names is usually more deterministic and thus less expensive.
     */
    export interface NonRelativeModuleNameResolutionCache {
        getOrCreateCacheForModuleName(nonRelativeModuleName: string, redirectedReference?: ResolvedProjectReference): PerModuleNameCache;
        /*@internal*/ moduleNameToDirectoryMap: CacheWithRedirects<PerModuleNameCache>;
    }

    export interface PerModuleNameCache {
        get(directory: string): ResolvedModuleWithFailedLookupLocations | undefined;
        set(directory: string, result: ResolvedModuleWithFailedLookupLocations): void;
    }

    export function createModuleResolutionCache(currentDirectory: string, getCanonicalFileName: (s: string) => string, options?: CompilerOptions): ModuleResolutionCache {
        return createModuleResolutionCacheWithMaps(
            createCacheWithRedirects(options),
            createCacheWithRedirects(options),
            currentDirectory,
            getCanonicalFileName
        );
    }


    /*@internal*/
    export interface CacheWithRedirects<T> {
        ownMap: Map<string, T>;
        redirectsMap: Map<Path, Map<string, T>>;
        getOrCreateMapOfCacheRedirects(redirectedReference: ResolvedProjectReference | undefined): Map<string, T>;
        clear(): void;
        setOwnOptions(newOptions: CompilerOptions): void;
        setOwnMap(newOwnMap: Map<string, T>): void;
    }

    /*@internal*/
    export function createCacheWithRedirects<T>(options?: CompilerOptions): CacheWithRedirects<T> {
        let ownMap: Map<string, T> = new Map();
        const redirectsMap = new Map<Path, Map<string, T>>();
        return {
            ownMap,
            redirectsMap,
            getOrCreateMapOfCacheRedirects,
            clear,
            setOwnOptions,
            setOwnMap
        };

        function setOwnOptions(newOptions: CompilerOptions) {
            options = newOptions;
        }

        function setOwnMap(newOwnMap: Map<string, T>) {
            ownMap = newOwnMap;
        }

        function getOrCreateMapOfCacheRedirects(redirectedReference: ResolvedProjectReference | undefined) {
            if (!redirectedReference) {
                return ownMap;
            }
            const path = redirectedReference.sourceFile.path;
            let redirects = redirectsMap.get(path);
            if (!redirects) {
                // Reuse map if redirected reference map uses same resolution
                redirects = !options || optionsHaveModuleResolutionChanges(options, redirectedReference.commandLine.options) ? new Map() : ownMap;
                redirectsMap.set(path, redirects);
            }
            return redirects;
        }

        function clear() {
            ownMap.clear();
            redirectsMap.clear();
        }
    }

    /*@internal*/
    export function createModuleResolutionCacheWithMaps(
        directoryToModuleNameMap: CacheWithRedirects<Map<string, ResolvedModuleWithFailedLookupLocations>>,
        moduleNameToDirectoryMap: CacheWithRedirects<PerModuleNameCache>,
        currentDirectory: string,
        getCanonicalFileName: GetCanonicalFileName): ModuleResolutionCache {

        return { getOrCreateCacheForDirectory, getOrCreateCacheForModuleName, directoryToModuleNameMap, moduleNameToDirectoryMap };

        function getOrCreateCacheForDirectory(directoryName: string, redirectedReference?: ResolvedProjectReference) {
            const path = toPath(directoryName, currentDirectory, getCanonicalFileName);
            return getOrCreateCache<Map<string, ResolvedModuleWithFailedLookupLocations>>(directoryToModuleNameMap, redirectedReference, path, () => new Map());
        }

        function getOrCreateCacheForModuleName(nonRelativeModuleName: string, redirectedReference?: ResolvedProjectReference): PerModuleNameCache {
            Debug.assert(!isExternalModuleNameRelative(nonRelativeModuleName));
            return getOrCreateCache(moduleNameToDirectoryMap, redirectedReference, nonRelativeModuleName, createPerModuleNameCache);
        }

        function getOrCreateCache<T>(cacheWithRedirects: CacheWithRedirects<T>, redirectedReference: ResolvedProjectReference | undefined, key: string, create: () => T): T {
            const cache = cacheWithRedirects.getOrCreateMapOfCacheRedirects(redirectedReference);
            let result = cache.get(key);
            if (!result) {
                result = create();
                cache.set(key, result);
            }
            return result;
        }

        function createPerModuleNameCache(): PerModuleNameCache {
            const directoryPathMap = new Map<string, ResolvedModuleWithFailedLookupLocations>();

            return { get, set };

            function get(directory: string): ResolvedModuleWithFailedLookupLocations | undefined {
                return directoryPathMap.get(toPath(directory, currentDirectory, getCanonicalFileName));
            }

            /**
             * At first this function add entry directory -> module resolution result to the table.
             * Then it computes the set of parent folders for 'directory' that should have the same module resolution result
             * and for every parent folder in set it adds entry: parent -> module resolution. .
             * Lets say we first directory name: /a/b/c/d/e and resolution result is: /a/b/bar.ts.
             * Set of parent folders that should have the same result will be:
             * [
             *     /a/b/c/d, /a/b/c, /a/b
             * ]
             * this means that request for module resolution from file in any of these folder will be immediately found in cache.
             */
            function set(directory: string, result: ResolvedModuleWithFailedLookupLocations): void {
                const path = toPath(directory, currentDirectory, getCanonicalFileName);
                // if entry is already in cache do nothing
                if (directoryPathMap.has(path)) {
                    return;
                }
                directoryPathMap.set(path, result);

                const resolvedFileName = result.resolvedModule &&
                    (result.resolvedModule.originalPath || result.resolvedModule.resolvedFileName);
                // find common prefix between directory and resolved file name
                // this common prefix should be the shortest path that has the same resolution
                // directory: /a/b/c/d/e
                // resolvedFileName: /a/b/foo.d.ts
                // commonPrefix: /a/b
                // for failed lookups cache the result for every directory up to root
                const commonPrefix = resolvedFileName && getCommonPrefix(path, resolvedFileName);
                let current = path;
                while (current !== commonPrefix) {
                    const parent = getDirectoryPath(current);
                    if (parent === current || directoryPathMap.has(parent)) {
                        break;
                    }
                    directoryPathMap.set(parent, result);
                    current = parent;
                }
            }

            function getCommonPrefix(directory: Path, resolution: string) {
                const resolutionDirectory = toPath(getDirectoryPath(resolution), currentDirectory, getCanonicalFileName);

                // find first position where directory and resolution differs
                let i = 0;
                const limit = Math.min(directory.length, resolutionDirectory.length);
                while (i < limit && directory.charCodeAt(i) === resolutionDirectory.charCodeAt(i)) {
                    i++;
                }
                if (i === directory.length && (resolutionDirectory.length === i || resolutionDirectory[i] === directorySeparator)) {
                    return directory;
                }
                const rootLength = getRootLength(directory);
                if (i < rootLength) {
                    return undefined;
                }
                const sep = directory.lastIndexOf(directorySeparator, i - 1);
                if (sep === -1) {
                    return undefined;
                }
                return directory.substr(0, Math.max(sep, rootLength));
            }
        }
    }

    export function resolveModuleNameFromCache(moduleName: string, containingFile: string, cache: ModuleResolutionCache): ResolvedModuleWithFailedLookupLocations | undefined {
        const containingDirectory = getDirectoryPath(containingFile);
        const perFolderCache = cache && cache.getOrCreateCacheForDirectory(containingDirectory);
        return perFolderCache && perFolderCache.get(moduleName);
    }

    export function resolveModuleName(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache?: ModuleResolutionCache, redirectedReference?: ResolvedProjectReference): ResolvedModuleWithFailedLookupLocations {
        const traceEnabled = isTraceEnabled(compilerOptions, host);
        if (redirectedReference) {
            compilerOptions = redirectedReference.commandLine.options;
        }
        if (traceEnabled) {
            trace(host, Diagnostics.Resolving_module_0_from_1, moduleName, containingFile);
            if (redirectedReference) {
                trace(host, Diagnostics.Using_compiler_options_of_project_reference_redirect_0, redirectedReference.sourceFile.fileName);
            }
        }
        const containingDirectory = getDirectoryPath(containingFile);
        const perFolderCache = cache && cache.getOrCreateCacheForDirectory(containingDirectory, redirectedReference);
        let result = perFolderCache && perFolderCache.get(moduleName);

        if (result) {
            if (traceEnabled) {
                trace(host, Diagnostics.Resolution_for_module_0_was_found_in_cache_from_location_1, moduleName, containingDirectory);
            }
        }
        else {
            let moduleResolution = compilerOptions.moduleResolution;
            if (moduleResolution === undefined) {
                moduleResolution = getEmitModuleKind(compilerOptions) === ModuleKind.CommonJS ? ModuleResolutionKind.NodeJs : ModuleResolutionKind.Classic;
                if (traceEnabled) {
                    trace(host, Diagnostics.Module_resolution_kind_is_not_specified_using_0, ModuleResolutionKind[moduleResolution]);
                }
            }
            else {
                if (traceEnabled) {
                    trace(host, Diagnostics.Explicitly_specified_module_resolution_kind_Colon_0, ModuleResolutionKind[moduleResolution]);
                }
            }

            perfLogger.logStartResolveModule(moduleName /* , containingFile, ModuleResolutionKind[moduleResolution]*/);
            switch (moduleResolution) {
                case ModuleResolutionKind.NodeJs:
                    result = nodeModuleNameResolver(moduleName, containingFile, compilerOptions, host, cache, redirectedReference);
                    break;
                case ModuleResolutionKind.Classic:
                    result = classicNameResolver(moduleName, containingFile, compilerOptions, host, cache, redirectedReference);
                    break;
                default:
                    return Debug.fail(`Unexpected moduleResolution: ${moduleResolution}`);
            }
            if (result && result.resolvedModule) perfLogger.logInfoEvent(`Module "${moduleName}" resolved to "${result.resolvedModule.resolvedFileName}"`);
            perfLogger.logStopResolveModule((result && result.resolvedModule) ? "" + result.resolvedModule.resolvedFileName : "null");

            if (perFolderCache) {
                perFolderCache.set(moduleName, result);
                if (!isExternalModuleNameRelative(moduleName)) {
                    // put result in per-module name cache
                    cache!.getOrCreateCacheForModuleName(moduleName, redirectedReference).set(containingDirectory, result);
                }
            }
        }

        if (traceEnabled) {
            if (result.resolvedModule) {
                if (result.resolvedModule.packageId) {
                    trace(host, Diagnostics.Module_name_0_was_successfully_resolved_to_1_with_Package_ID_2, moduleName, result.resolvedModule.resolvedFileName, packageIdToString(result.resolvedModule.packageId));
                }
                else {
                    trace(host, Diagnostics.Module_name_0_was_successfully_resolved_to_1, moduleName, result.resolvedModule.resolvedFileName);
                }
            }
            else {
                trace(host, Diagnostics.Module_name_0_was_not_resolved, moduleName);
            }
        }

        return result;
    }

    /*
     * Every module resolution kind can has its specific understanding how to load module from a specific path on disk
     * I.e. for path '/a/b/c':
     * - Node loader will first to try to check if '/a/b/c' points to a file with some supported extension and if this fails
     * it will try to load module from directory: directory '/a/b/c' should exist and it should have either 'package.json' with
     * 'typings' entry or file 'index' with some supported extension
     * - Classic loader will only try to interpret '/a/b/c' as file.
     */
    type ResolutionKindSpecificLoader = (extensions: Extensions, candidate: string, onlyRecordFailures: boolean, state: ModuleResolutionState) => Resolved | undefined;

    /**
     * Any module resolution kind can be augmented with optional settings: 'baseUrl', 'paths' and 'rootDirs' - they are used to
     * mitigate differences between design time structure of the project and its runtime counterpart so the same import name
     * can be resolved successfully by TypeScript compiler and runtime module loader.
     * If these settings are set then loading procedure will try to use them to resolve module name and it can of failure it will
     * fallback to standard resolution routine.
     *
     * - baseUrl - this setting controls how non-relative module names are resolved. If this setting is specified then non-relative
     * names will be resolved relative to baseUrl: i.e. if baseUrl is '/a/b' then candidate location to resolve module name 'c/d' will
     * be '/a/b/c/d'
     * - paths - this setting can only be used when baseUrl is specified. allows to tune how non-relative module names
     * will be resolved based on the content of the module name.
     * Structure of 'paths' compiler options
     * 'paths': {
     *    pattern-1: [...substitutions],
     *    pattern-2: [...substitutions],
     *    ...
     *    pattern-n: [...substitutions]
     * }
     * Pattern here is a string that can contain zero or one '*' character. During module resolution module name will be matched against
     * all patterns in the list. Matching for patterns that don't contain '*' means that module name must be equal to pattern respecting the case.
     * If pattern contains '*' then to match pattern "<prefix>*<suffix>" module name must start with the <prefix> and end with <suffix>.
     * <MatchedStar> denotes part of the module name between <prefix> and <suffix>.
     * If module name can be matches with multiple patterns then pattern with the longest prefix will be picked.
     * After selecting pattern we'll use list of substitutions to get candidate locations of the module and the try to load module
     * from the candidate location.
     * Substitution is a string that can contain zero or one '*'. To get candidate location from substitution we'll pick every
     * substitution in the list and replace '*' with <MatchedStar> string. If candidate location is not rooted it
     * will be converted to absolute using baseUrl.
     * For example:
     * baseUrl: /a/b/c
     * "paths": {
     *     // match all module names
     *     "*": [
     *         "*",        // use matched name as is,
     *                     // <matched name> will be looked as /a/b/c/<matched name>
     *
     *         "folder1/*" // substitution will convert matched name to 'folder1/<matched name>',
     *                     // since it is not rooted then final candidate location will be /a/b/c/folder1/<matched name>
     *     ],
     *     // match module names that start with 'components/'
     *     "components/*": [ "/root/components/*" ] // substitution will convert /components/folder1/<matched name> to '/root/components/folder1/<matched name>',
     *                                              // it is rooted so it will be final candidate location
     * }
     *
     * 'rootDirs' allows the project to be spreaded across multiple locations and resolve modules with relative names as if
     * they were in the same location. For example lets say there are two files
     * '/local/src/content/file1.ts'
     * '/shared/components/contracts/src/content/protocols/file2.ts'
     * After bundling content of '/shared/components/contracts/src' will be merged with '/local/src' so
     * if file1 has the following import 'import {x} from "./protocols/file2"' it will be resolved successfully in runtime.
     * 'rootDirs' provides the way to tell compiler that in order to get the whole project it should behave as if content of all
     * root dirs were merged together.
     * I.e. for the example above 'rootDirs' will have two entries: [ '/local/src', '/shared/components/contracts/src' ].
     * Compiler will first convert './protocols/file2' into absolute path relative to the location of containing file:
     * '/local/src/content/protocols/file2' and try to load it - failure.
     * Then it will search 'rootDirs' looking for a longest matching prefix of this absolute path and if such prefix is found - absolute path will
     * be converted to a path relative to found rootDir entry './content/protocols/file2' (*). As a last step compiler will check all remaining
     * entries in 'rootDirs', use them to build absolute path out of (*) and try to resolve module from this location.
     */
    function tryLoadModuleUsingOptionalResolutionSettings(extensions: Extensions, moduleName: string, containingDirectory: string, loader: ResolutionKindSpecificLoader,
        state: ModuleResolutionState): Resolved | undefined {

        const resolved = tryLoadModuleUsingPathsIfEligible(extensions, moduleName, loader, state);
        if (resolved) return resolved.value;

        if (!isExternalModuleNameRelative(moduleName)) {
            return tryLoadModuleUsingBaseUrl(extensions, moduleName, loader, state);
        }
        else {
            return tryLoadModuleUsingRootDirs(extensions, moduleName, containingDirectory, loader, state);
        }
    }

    function tryLoadModuleUsingPathsIfEligible(extensions: Extensions, moduleName: string, loader: ResolutionKindSpecificLoader, state: ModuleResolutionState) {
        const { baseUrl, paths } = state.compilerOptions;
        if (baseUrl && paths && !pathIsRelative(moduleName)) {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.baseUrl_option_is_set_to_0_using_this_value_to_resolve_non_relative_module_name_1, baseUrl, moduleName);
                trace(state.host, Diagnostics.paths_option_is_specified_looking_for_a_pattern_to_match_module_name_0, moduleName);
            }
            return tryLoadModuleUsingPaths(extensions, moduleName, baseUrl, paths, loader, /*onlyRecordFailures*/ false, state);
        }
    }

    function tryLoadModuleUsingRootDirs(extensions: Extensions, moduleName: string, containingDirectory: string, loader: ResolutionKindSpecificLoader,
        state: ModuleResolutionState): Resolved | undefined {

        if (!state.compilerOptions.rootDirs) {
            return undefined;
        }

        if (state.traceEnabled) {
            trace(state.host, Diagnostics.rootDirs_option_is_set_using_it_to_resolve_relative_module_name_0, moduleName);
        }

        const candidate = normalizePath(combinePaths(containingDirectory, moduleName));

        let matchedRootDir: string | undefined;
        let matchedNormalizedPrefix: string | undefined;
        for (const rootDir of state.compilerOptions.rootDirs) {
            // rootDirs are expected to be absolute
            // in case of tsconfig.json this will happen automatically - compiler will expand relative names
            // using location of tsconfig.json as base location
            let normalizedRoot = normalizePath(rootDir);
            if (!endsWith(normalizedRoot, directorySeparator)) {
                normalizedRoot += directorySeparator;
            }
            const isLongestMatchingPrefix =
                startsWith(candidate, normalizedRoot) &&
                (matchedNormalizedPrefix === undefined || matchedNormalizedPrefix.length < normalizedRoot.length);

            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Checking_if_0_is_the_longest_matching_prefix_for_1_2, normalizedRoot, candidate, isLongestMatchingPrefix);
            }

            if (isLongestMatchingPrefix) {
                matchedNormalizedPrefix = normalizedRoot;
                matchedRootDir = rootDir;
            }
        }
        if (matchedNormalizedPrefix) {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Longest_matching_prefix_for_0_is_1, candidate, matchedNormalizedPrefix);
            }
            const suffix = candidate.substr(matchedNormalizedPrefix.length);

            // first - try to load from a initial location
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Loading_0_from_the_root_dir_1_candidate_location_2, suffix, matchedNormalizedPrefix, candidate);
            }
            const resolvedFileName = loader(extensions, candidate, !directoryProbablyExists(containingDirectory, state.host), state);
            if (resolvedFileName) {
                return resolvedFileName;
            }

            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Trying_other_entries_in_rootDirs);
            }
            // then try to resolve using remaining entries in rootDirs
            for (const rootDir of state.compilerOptions.rootDirs) {
                if (rootDir === matchedRootDir) {
                    // skip the initially matched entry
                    continue;
                }
                const candidate = combinePaths(normalizePath(rootDir), suffix);
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.Loading_0_from_the_root_dir_1_candidate_location_2, suffix, rootDir, candidate);
                }
                const baseDirectory = getDirectoryPath(candidate);
                const resolvedFileName = loader(extensions, candidate, !directoryProbablyExists(baseDirectory, state.host), state);
                if (resolvedFileName) {
                    return resolvedFileName;
                }
            }
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Module_resolution_using_rootDirs_has_failed);
            }
        }
        return undefined;
    }

    function tryLoadModuleUsingBaseUrl(extensions: Extensions, moduleName: string, loader: ResolutionKindSpecificLoader, state: ModuleResolutionState): Resolved | undefined {
        const { baseUrl } = state.compilerOptions;
        if (!baseUrl) {
            return undefined;
        }
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.baseUrl_option_is_set_to_0_using_this_value_to_resolve_non_relative_module_name_1, baseUrl, moduleName);
        }
        const candidate = normalizePath(combinePaths(baseUrl, moduleName));
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.Resolving_module_name_0_relative_to_base_url_1_2, moduleName, baseUrl, candidate);
        }
        return loader(extensions, candidate, !directoryProbablyExists(getDirectoryPath(candidate), state.host), state);
    }

    /**
     * Expose resolution logic to allow us to use Node module resolution logic from arbitrary locations.
     * No way to do this with `require()`: https://github.com/nodejs/node/issues/5963
     * Throws an error if the module can't be resolved.
     */
    /* @internal */
    export function resolveJSModule(moduleName: string, initialDir: string, host: ModuleResolutionHost): string {
        const { resolvedModule, failedLookupLocations } = tryResolveJSModuleWorker(moduleName, initialDir, host);
        if (!resolvedModule) {
            throw new Error(`Could not resolve JS module '${moduleName}' starting at '${initialDir}'. Looked in: ${failedLookupLocations.join(", ")}`);
        }
        return resolvedModule.resolvedFileName;
    }

    /* @internal */
    export function tryResolveJSModule(moduleName: string, initialDir: string, host: ModuleResolutionHost): string | undefined {
        const { resolvedModule } = tryResolveJSModuleWorker(moduleName, initialDir, host);
        return resolvedModule && resolvedModule.resolvedFileName;
    }

    const jsOnlyExtensions = [Extensions.JavaScript];
    const tsExtensions = [Extensions.TypeScript, Extensions.JavaScript];
    const tsPlusJsonExtensions = [...tsExtensions, Extensions.Json];
    const tsconfigExtensions = [Extensions.TSConfig];
    function tryResolveJSModuleWorker(moduleName: string, initialDir: string, host: ModuleResolutionHost): ResolvedModuleWithFailedLookupLocations {
        return nodeModuleNameResolverWorker(moduleName, initialDir, { moduleResolution: ModuleResolutionKind.NodeJs, allowJs: true }, host, /*cache*/ undefined, jsOnlyExtensions, /*redirectedReferences*/ undefined);
    }

    export function nodeModuleNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache?: ModuleResolutionCache, redirectedReference?: ResolvedProjectReference): ResolvedModuleWithFailedLookupLocations;
    /* @internal */ export function nodeModuleNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache?: ModuleResolutionCache, redirectedReference?: ResolvedProjectReference, lookupConfig?: boolean): ResolvedModuleWithFailedLookupLocations; // eslint-disable-line @typescript-eslint/unified-signatures
    export function nodeModuleNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache?: ModuleResolutionCache, redirectedReference?: ResolvedProjectReference, lookupConfig?: boolean): ResolvedModuleWithFailedLookupLocations {
        return nodeModuleNameResolverWorker(moduleName, getDirectoryPath(containingFile), compilerOptions, host, cache, lookupConfig ? tsconfigExtensions : (compilerOptions.resolveJsonModule ? tsPlusJsonExtensions : tsExtensions), redirectedReference);
    }

    function nodeModuleNameResolverWorker(moduleName: string, containingDirectory: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache: ModuleResolutionCache | undefined, extensions: Extensions[], redirectedReference: ResolvedProjectReference | undefined): ResolvedModuleWithFailedLookupLocations {
        const traceEnabled = isTraceEnabled(compilerOptions, host);

        const failedLookupLocations: string[] = [];
        const state: ModuleResolutionState = { compilerOptions, host, traceEnabled, failedLookupLocations };

        const result = forEach(extensions, ext => tryResolve(ext));
        return createResolvedModuleWithFailedLookupLocations(result?.value?.resolved, result?.value?.isExternalLibraryImport, failedLookupLocations, state.resultFromCache);

        function tryResolve(extensions: Extensions): SearchResult<{ resolved: Resolved, isExternalLibraryImport: boolean }> {
            const loader: ResolutionKindSpecificLoader = (extensions, candidate, onlyRecordFailures, state) => nodeLoadModuleByRelativeName(extensions, candidate, onlyRecordFailures, state, /*considerPackageJson*/ true);
            const resolved = tryLoadModuleUsingOptionalResolutionSettings(extensions, moduleName, containingDirectory, loader, state);
            if (resolved) {
                return toSearchResult({ resolved, isExternalLibraryImport: pathContainsNodeModules(resolved.path) });
            }

            if (!isExternalModuleNameRelative(moduleName)) {
                if (traceEnabled) {
                    trace(host, Diagnostics.Loading_module_0_from_node_modules_folder_target_file_type_1, moduleName, Extensions[extensions]);
                }
                const resolved = loadModuleFromNearestNodeModulesDirectory(extensions, moduleName, containingDirectory, state, cache, redirectedReference);
                if (!resolved) return undefined;

                let resolvedValue = resolved.value;
                if (!compilerOptions.preserveSymlinks && resolvedValue && !resolvedValue.originalPath) {
                    const path = realPath(resolvedValue.path, host, traceEnabled);
                    const originalPath = path === resolvedValue.path ? undefined : resolvedValue.path;
                    resolvedValue = { ...resolvedValue, path, originalPath };
                }
                // For node_modules lookups, get the real path so that multiple accesses to an `npm link`-ed module do not create duplicate files.
                return { value: resolvedValue && { resolved: resolvedValue, isExternalLibraryImport: true } };
            }
            else {
                const { path: candidate, parts } = normalizePathAndParts(combinePaths(containingDirectory, moduleName));
                const resolved = nodeLoadModuleByRelativeName(extensions, candidate, /*onlyRecordFailures*/ false, state, /*considerPackageJson*/ true);
                // Treat explicit "node_modules" import as an external library import.
                return resolved && toSearchResult({ resolved, isExternalLibraryImport: contains(parts, "node_modules") });
            }
        }
    }

    function realPath(path: string, host: ModuleResolutionHost, traceEnabled: boolean): string {
        if (!host.realpath) {
            return path;
        }

        const real = normalizePath(host.realpath(path));
        if (traceEnabled) {
            trace(host, Diagnostics.Resolving_real_path_for_0_result_1, path, real);
        }
        Debug.assert(host.fileExists(real), `${path} linked to nonexistent file ${real}`);
        return real;
    }

    function nodeLoadModuleByRelativeName(extensions: Extensions, candidate: string, onlyRecordFailures: boolean, state: ModuleResolutionState, considerPackageJson: boolean): Resolved | undefined {
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.Loading_module_as_file_Slash_folder_candidate_module_location_0_target_file_type_1, candidate, Extensions[extensions]);
        }
        if (!hasTrailingDirectorySeparator(candidate)) {
            if (!onlyRecordFailures) {
                const parentOfCandidate = getDirectoryPath(candidate);
                if (!directoryProbablyExists(parentOfCandidate, state.host)) {
                    if (state.traceEnabled) {
                        trace(state.host, Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, parentOfCandidate);
                    }
                    onlyRecordFailures = true;
                }
            }
            const resolvedFromFile = loadModuleFromFile(extensions, candidate, onlyRecordFailures, state);
            if (resolvedFromFile) {
                const packageDirectory = considerPackageJson ? parseNodeModuleFromPath(resolvedFromFile) : undefined;
                const packageInfo = packageDirectory ? getPackageJsonInfo(packageDirectory, /*onlyRecordFailures*/ false, state) : undefined;
                return withPackageId(packageInfo, resolvedFromFile);
            }
        }
        if (!onlyRecordFailures) {
            const candidateExists = directoryProbablyExists(candidate, state.host);
            if (!candidateExists) {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, candidate);
                }
                onlyRecordFailures = true;
            }
        }
        return loadNodeModuleFromDirectory(extensions, candidate, onlyRecordFailures, state, considerPackageJson);
    }

    /*@internal*/
    export const nodeModulesPathPart = "/node_modules/";
    /*@internal*/
    export function pathContainsNodeModules(path: string): boolean {
        return stringContains(path, nodeModulesPathPart);
    }

    /**
     * This will be called on the successfully resolved path from `loadModuleFromFile`.
     * (Not neeeded for `loadModuleFromNodeModules` as that looks up the `package.json` as part of resolution.)
     *
     * packageDirectory is the directory of the package itself.
     *   For `blah/node_modules/foo/index.d.ts` this is packageDirectory: "foo"
     *   For `/node_modules/foo/bar.d.ts` this is packageDirectory: "foo"
     *   For `/node_modules/@types/foo/bar/index.d.ts` this is packageDirectory: "@types/foo"
     *   For `/node_modules/foo/bar/index.d.ts` this is packageDirectory: "foo"
     */
    function parseNodeModuleFromPath(resolved: PathAndExtension): string | undefined {
        const path = normalizePath(resolved.path);
        const idx = path.lastIndexOf(nodeModulesPathPart);
        if (idx === -1) {
            return undefined;
        }

        const indexAfterNodeModules = idx + nodeModulesPathPart.length;
        let indexAfterPackageName = moveToNextDirectorySeparatorIfAvailable(path, indexAfterNodeModules);
        if (path.charCodeAt(indexAfterNodeModules) === CharacterCodes.at) {
            indexAfterPackageName = moveToNextDirectorySeparatorIfAvailable(path, indexAfterPackageName);
        }
        return path.slice(0, indexAfterPackageName);
    }

    function moveToNextDirectorySeparatorIfAvailable(path: string, prevSeparatorIndex: number): number {
        const nextSeparatorIndex = path.indexOf(directorySeparator, prevSeparatorIndex + 1);
        return nextSeparatorIndex === -1 ? prevSeparatorIndex : nextSeparatorIndex;
    }

    function loadModuleFromFileNoPackageId(extensions: Extensions, candidate: string, onlyRecordFailures: boolean, state: ModuleResolutionState): Resolved | undefined {
        return noPackageId(loadModuleFromFile(extensions, candidate, onlyRecordFailures, state));
    }

    /**
     * @param {boolean} onlyRecordFailures - if true then function won't try to actually load files but instead record all attempts as failures. This flag is necessary
     * in cases when we know upfront that all load attempts will fail (because containing folder does not exists) however we still need to record all failed lookup locations.
     */
    function loadModuleFromFile(extensions: Extensions, candidate: string, onlyRecordFailures: boolean, state: ModuleResolutionState): PathAndExtension | undefined {
        if (extensions === Extensions.Json || extensions === Extensions.TSConfig) {
            const extensionLess = tryRemoveExtension(candidate, Extension.Json);
            return (extensionLess === undefined && extensions === Extensions.Json) ? undefined : tryAddingExtensions(extensionLess || candidate, extensions, onlyRecordFailures, state);
        }

        // First, try adding an extension. An import of "foo" could be matched by a file "foo.ts", or "foo.js" by "foo.js.ts"
        const resolvedByAddingExtension = tryAddingExtensions(candidate, extensions, onlyRecordFailures, state);
        if (resolvedByAddingExtension) {
            return resolvedByAddingExtension;
        }

        // If that didn't work, try stripping a ".js" or ".jsx" extension and replacing it with a TypeScript one;
        // e.g. "./foo.js" can be matched by "./foo.ts" or "./foo.d.ts"
        if (hasJSFileExtension(candidate)) {
            const extensionless = removeFileExtension(candidate);
            if (state.traceEnabled) {
                const extension = candidate.substring(extensionless.length);
                trace(state.host, Diagnostics.File_name_0_has_a_1_extension_stripping_it, candidate, extension);
            }
            return tryAddingExtensions(extensionless, extensions, onlyRecordFailures, state);
        }
    }

    /** Try to return an existing file that adds one of the `extensions` to `candidate`. */
    function tryAddingExtensions(candidate: string, extensions: Extensions, onlyRecordFailures: boolean, state: ModuleResolutionState): PathAndExtension | undefined {
        if (!onlyRecordFailures) {
            // check if containing folder exists - if it doesn't then just record failures for all supported extensions without disk probing
            const directory = getDirectoryPath(candidate);
            if (directory) {
                onlyRecordFailures = !directoryProbablyExists(directory, state.host);
            }
        }

        switch (extensions) {
            case Extensions.DtsOnly:
                return tryExtension(Extension.Dts);
            case Extensions.TypeScript:
                return tryExtension(Extension.Ts) || tryExtension(Extension.Tsx) || tryExtension(Extension.Dts);
            case Extensions.JavaScript:
                return tryExtension(Extension.Js) || tryExtension(Extension.Jsx);
            case Extensions.TSConfig:
            case Extensions.Json:
                return tryExtension(Extension.Json);
        }

        function tryExtension(ext: Extension): PathAndExtension | undefined {
            const path = tryFile(candidate + ext, onlyRecordFailures, state);
            return path === undefined ? undefined : { path, ext };
        }
    }

    /** Return the file if it exists. */
    function tryFile(fileName: string, onlyRecordFailures: boolean, state: ModuleResolutionState): string | undefined {
        if (!onlyRecordFailures) {
            if (state.host.fileExists(fileName)) {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.File_0_exist_use_it_as_a_name_resolution_result, fileName);
                }
                return fileName;
            }
            else {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.File_0_does_not_exist, fileName);
                }
            }
        }
        state.failedLookupLocations.push(fileName);
        return undefined;
    }

    function loadNodeModuleFromDirectory(extensions: Extensions, candidate: string, onlyRecordFailures: boolean, state: ModuleResolutionState, considerPackageJson = true) {
        const packageInfo = considerPackageJson ? getPackageJsonInfo(candidate, onlyRecordFailures, state) : undefined;
        const packageJsonContent = packageInfo && packageInfo.packageJsonContent;
        const versionPaths = packageInfo && packageInfo.versionPaths;
        return withPackageId(packageInfo, loadNodeModuleFromDirectoryWorker(extensions, candidate, onlyRecordFailures, state, packageJsonContent, versionPaths));
    }

    interface PackageJsonInfo {
        packageDirectory: string;
        packageJsonContent: PackageJsonPathFields;
        versionPaths: VersionPaths | undefined;
    }

    function getPackageJsonInfo(packageDirectory: string, onlyRecordFailures: boolean, state: ModuleResolutionState): PackageJsonInfo | undefined {
        const { host, traceEnabled } = state;
        const directoryExists = !onlyRecordFailures && directoryProbablyExists(packageDirectory, host);
        const packageJsonPath = combinePaths(packageDirectory, "package.json");
        if (directoryExists && host.fileExists(packageJsonPath)) {
            const packageJsonContent = readJson(packageJsonPath, host) as PackageJson;
            if (traceEnabled) {
                trace(host, Diagnostics.Found_package_json_at_0, packageJsonPath);
            }
            const versionPaths = readPackageJsonTypesVersionPaths(packageJsonContent, state);
            return { packageDirectory, packageJsonContent, versionPaths };
        }
        else {
            if (directoryExists && traceEnabled) {
                trace(host, Diagnostics.File_0_does_not_exist, packageJsonPath);
            }

            // record package json as one of failed lookup locations - in the future if this file will appear it will invalidate resolution results
            state.failedLookupLocations.push(packageJsonPath);
        }
    }

    function loadNodeModuleFromDirectoryWorker(extensions: Extensions, candidate: string, onlyRecordFailures: boolean, state: ModuleResolutionState, jsonContent: PackageJsonPathFields | undefined, versionPaths: VersionPaths | undefined): PathAndExtension | undefined {
        let packageFile: string | undefined;
        if (jsonContent) {
            switch (extensions) {
                case Extensions.JavaScript:
                case Extensions.Json:
                    packageFile = readPackageJsonMainField(jsonContent, candidate, state);
                    break;
                case Extensions.TypeScript:
                    // When resolving typescript modules, try resolving using main field as well
                    packageFile = readPackageJsonTypesFields(jsonContent, candidate, state) || readPackageJsonMainField(jsonContent, candidate, state);
                    break;
                case Extensions.DtsOnly:
                    packageFile = readPackageJsonTypesFields(jsonContent, candidate, state);
                    break;
                case Extensions.TSConfig:
                    packageFile = readPackageJsonTSConfigField(jsonContent, candidate, state);
                    break;
                default:
                    return Debug.assertNever(extensions);
            }
        }

        const loader: ResolutionKindSpecificLoader = (extensions, candidate, onlyRecordFailures, state) => {
            const fromFile = tryFile(candidate, onlyRecordFailures, state);
            if (fromFile) {
                const resolved = resolvedIfExtensionMatches(extensions, fromFile);
                if (resolved) {
                    return noPackageId(resolved);
                }
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.File_0_has_an_unsupported_extension_so_skipping_it, fromFile);
                }
            }

            // Even if extensions is DtsOnly, we can still look up a .ts file as a result of package.json "types"
            const nextExtensions = extensions === Extensions.DtsOnly ? Extensions.TypeScript : extensions;
            // Don't do package.json lookup recursively, because Node.js' package lookup doesn't.
            return nodeLoadModuleByRelativeName(nextExtensions, candidate, onlyRecordFailures, state, /*considerPackageJson*/ false);
        };

        const onlyRecordFailuresForPackageFile = packageFile ? !directoryProbablyExists(getDirectoryPath(packageFile), state.host) : undefined;
        const onlyRecordFailuresForIndex = onlyRecordFailures || !directoryProbablyExists(candidate, state.host);
        const indexPath = combinePaths(candidate, extensions === Extensions.TSConfig ? "tsconfig" : "index");

        if (versionPaths && (!packageFile || containsPath(candidate, packageFile))) {
            const moduleName = getRelativePathFromDirectory(candidate, packageFile || indexPath, /*ignoreCase*/ false);
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.package_json_has_a_typesVersions_entry_0_that_matches_compiler_version_1_looking_for_a_pattern_to_match_module_name_2, versionPaths.version, version, moduleName);
            }
            const result = tryLoadModuleUsingPaths(extensions, moduleName, candidate, versionPaths.paths, loader, onlyRecordFailuresForPackageFile || onlyRecordFailuresForIndex, state);
            if (result) {
                return removeIgnoredPackageId(result.value);
            }
        }

        // It won't have a `packageId` set, because we disabled `considerPackageJson`.
        const packageFileResult = packageFile && removeIgnoredPackageId(loader(extensions, packageFile, onlyRecordFailuresForPackageFile!, state));
        if (packageFileResult) return packageFileResult;

        return loadModuleFromFile(extensions, indexPath, onlyRecordFailuresForIndex, state);
    }

    /** Resolve from an arbitrarily specified file. Return `undefined` if it has an unsupported extension. */
    function resolvedIfExtensionMatches(extensions: Extensions, path: string): PathAndExtension | undefined {
        const ext = tryGetExtensionFromPath(path);
        return ext !== undefined && extensionIsOk(extensions, ext) ? { path, ext } : undefined;
    }

    /** True if `extension` is one of the supported `extensions`. */
    function extensionIsOk(extensions: Extensions, extension: Extension): boolean {
        switch (extensions) {
            case Extensions.JavaScript:
                return extension === Extension.Js || extension === Extension.Jsx;
            case Extensions.TSConfig:
            case Extensions.Json:
                return extension === Extension.Json;
            case Extensions.TypeScript:
                return extension === Extension.Ts || extension === Extension.Tsx || extension === Extension.Dts;
            case Extensions.DtsOnly:
                return extension === Extension.Dts;
        }
    }

    /* @internal */
    export function parsePackageName(moduleName: string): { packageName: string, rest: string } {
        let idx = moduleName.indexOf(directorySeparator);
        if (moduleName[0] === "@") {
            idx = moduleName.indexOf(directorySeparator, idx + 1);
        }
        return idx === -1 ? { packageName: moduleName, rest: "" } : { packageName: moduleName.slice(0, idx), rest: moduleName.slice(idx + 1) };
    }

    function loadModuleFromNearestNodeModulesDirectory(extensions: Extensions, moduleName: string, directory: string, state: ModuleResolutionState, cache: NonRelativeModuleNameResolutionCache | undefined, redirectedReference: ResolvedProjectReference | undefined): SearchResult<Resolved> {
        return loadModuleFromNearestNodeModulesDirectoryWorker(extensions, moduleName, directory, state, /*typesScopeOnly*/ false, cache, redirectedReference);
    }

    function loadModuleFromNearestNodeModulesDirectoryTypesScope(moduleName: string, directory: string, state: ModuleResolutionState): SearchResult<Resolved> {
        // Extensions parameter here doesn't actually matter, because typesOnly ensures we're just doing @types lookup, which is always DtsOnly.
        return loadModuleFromNearestNodeModulesDirectoryWorker(Extensions.DtsOnly, moduleName, directory, state, /*typesScopeOnly*/ true, /*cache*/ undefined, /*redirectedReference*/ undefined);
    }

    function loadModuleFromNearestNodeModulesDirectoryWorker(extensions: Extensions, moduleName: string, directory: string, state: ModuleResolutionState, typesScopeOnly: boolean, cache: NonRelativeModuleNameResolutionCache | undefined, redirectedReference: ResolvedProjectReference | undefined): SearchResult<Resolved> {
        const perModuleNameCache = cache && cache.getOrCreateCacheForModuleName(moduleName, redirectedReference);
        return forEachAncestorDirectory(normalizeSlashes(directory), ancestorDirectory => {
            if (getBaseFileName(ancestorDirectory) !== "node_modules") {
                const resolutionFromCache = tryFindNonRelativeModuleNameInCache(perModuleNameCache, moduleName, ancestorDirectory, state);
                if (resolutionFromCache) {
                    return resolutionFromCache;
                }
                return toSearchResult(loadModuleFromImmediateNodeModulesDirectory(extensions, moduleName, ancestorDirectory, state, typesScopeOnly));
            }
        });
    }

    function loadModuleFromImmediateNodeModulesDirectory(extensions: Extensions, moduleName: string, directory: string, state: ModuleResolutionState, typesScopeOnly: boolean): Resolved | undefined {
        const nodeModulesFolder = combinePaths(directory, "node_modules");
        const nodeModulesFolderExists = directoryProbablyExists(nodeModulesFolder, state.host);
        if (!nodeModulesFolderExists && state.traceEnabled) {
            trace(state.host, Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, nodeModulesFolder);
        }

        const packageResult = typesScopeOnly ? undefined : loadModuleFromSpecificNodeModulesDirectory(extensions, moduleName, nodeModulesFolder, nodeModulesFolderExists, state);
        if (packageResult) {
            return packageResult;
        }
        if (extensions === Extensions.TypeScript || extensions === Extensions.DtsOnly) {
            const nodeModulesAtTypes = combinePaths(nodeModulesFolder, "@types");
            let nodeModulesAtTypesExists = nodeModulesFolderExists;
            if (nodeModulesFolderExists && !directoryProbablyExists(nodeModulesAtTypes, state.host)) {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, nodeModulesAtTypes);
                }
                nodeModulesAtTypesExists = false;
            }
            return loadModuleFromSpecificNodeModulesDirectory(Extensions.DtsOnly, mangleScopedPackageNameWithTrace(moduleName, state), nodeModulesAtTypes, nodeModulesAtTypesExists, state);
        }
    }

    function loadModuleFromSpecificNodeModulesDirectory(extensions: Extensions, moduleName: string, nodeModulesDirectory: string, nodeModulesDirectoryExists: boolean, state: ModuleResolutionState): Resolved | undefined {
        const candidate = normalizePath(combinePaths(nodeModulesDirectory, moduleName));

        // First look for a nested package.json, as in `node_modules/foo/bar/package.json`.
        let packageInfo = getPackageJsonInfo(candidate, !nodeModulesDirectoryExists, state);
        if (packageInfo) {
            const fromFile = loadModuleFromFile(extensions, candidate, !nodeModulesDirectoryExists, state);
            if (fromFile) {
                return noPackageId(fromFile);
            }

            const fromDirectory = loadNodeModuleFromDirectoryWorker(
                extensions,
                candidate,
                !nodeModulesDirectoryExists,
                state,
                packageInfo.packageJsonContent,
                packageInfo.versionPaths
            );
            return withPackageId(packageInfo, fromDirectory);
        }

        const loader: ResolutionKindSpecificLoader = (extensions, candidate, onlyRecordFailures, state) => {
            const pathAndExtension =
                loadModuleFromFile(extensions, candidate, onlyRecordFailures, state) ||
                loadNodeModuleFromDirectoryWorker(
                    extensions,
                    candidate,
                    onlyRecordFailures,
                    state,
                    packageInfo && packageInfo.packageJsonContent,
                    packageInfo && packageInfo.versionPaths
                );
            return withPackageId(packageInfo, pathAndExtension);
        };

        const { packageName, rest } = parsePackageName(moduleName);
        if (rest !== "") { // If "rest" is empty, we just did this search above.
            const packageDirectory = combinePaths(nodeModulesDirectory, packageName);

            // Don't use a "types" or "main" from here because we're not loading the root, but a subdirectory -- just here for the packageId and path mappings.
            packageInfo = getPackageJsonInfo(packageDirectory, !nodeModulesDirectoryExists, state);
            if (packageInfo && packageInfo.versionPaths) {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.package_json_has_a_typesVersions_entry_0_that_matches_compiler_version_1_looking_for_a_pattern_to_match_module_name_2, packageInfo.versionPaths.version, version, rest);
                }
                const packageDirectoryExists = nodeModulesDirectoryExists && directoryProbablyExists(packageDirectory, state.host);
                const fromPaths = tryLoadModuleUsingPaths(extensions, rest, packageDirectory, packageInfo.versionPaths.paths, loader, !packageDirectoryExists, state);
                if (fromPaths) {
                    return fromPaths.value;
                }
            }
        }

        return loader(extensions, candidate, !nodeModulesDirectoryExists, state);
    }

    function tryLoadModuleUsingPaths(extensions: Extensions, moduleName: string, baseDirectory: string, paths: MapLike<string[]>, loader: ResolutionKindSpecificLoader, onlyRecordFailures: boolean, state: ModuleResolutionState): SearchResult<Resolved> {
        const matchedPattern = matchPatternOrExact(getOwnKeys(paths), moduleName);
        if (matchedPattern) {
            const matchedStar = isString(matchedPattern) ? undefined : matchedText(matchedPattern, moduleName);
            const matchedPatternText = isString(matchedPattern) ? matchedPattern : patternText(matchedPattern);
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Module_name_0_matched_pattern_1, moduleName, matchedPatternText);
            }
            const resolved = forEach(paths[matchedPatternText], subst => {
                const path = matchedStar ? subst.replace("*", matchedStar) : subst;
                const candidate = normalizePath(combinePaths(baseDirectory, path));
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.Trying_substitution_0_candidate_module_location_Colon_1, subst, path);
                }
                // A path mapping may have an extension, in contrast to an import, which should omit it.
                const extension = tryGetExtensionFromPath(candidate);
                if (extension !== undefined) {
                    const path = tryFile(candidate, onlyRecordFailures, state);
                    if (path !== undefined) {
                        return noPackageId({ path, ext: extension });
                    }
                }
                return loader(extensions, candidate, onlyRecordFailures || !directoryProbablyExists(getDirectoryPath(candidate), state.host), state);
            });
            return { value: resolved };
        }
    }

    /** Double underscores are used in DefinitelyTyped to delimit scoped packages. */
    const mangledScopedPackageSeparator = "__";

    /** For a scoped package, we must look in `@types/foo__bar` instead of `@types/@foo/bar`. */
    function mangleScopedPackageNameWithTrace(packageName: string, state: ModuleResolutionState): string {
        const mangled = mangleScopedPackageName(packageName);
        if (state.traceEnabled && mangled !== packageName) {
            trace(state.host, Diagnostics.Scoped_package_detected_looking_in_0, mangled);
        }
        return mangled;
    }

    /* @internal */
    export function getTypesPackageName(packageName: string): string {
        return `@types/${mangleScopedPackageName(packageName)}`;
    }

    /* @internal */
    export function mangleScopedPackageName(packageName: string): string {
        if (startsWith(packageName, "@")) {
            const replaceSlash = packageName.replace(directorySeparator, mangledScopedPackageSeparator);
            if (replaceSlash !== packageName) {
                return replaceSlash.slice(1); // Take off the "@"
            }
        }
        return packageName;
    }

    /* @internal */
    export function getPackageNameFromTypesPackageName(mangledName: string): string {
        const withoutAtTypePrefix = removePrefix(mangledName, "@types/");
        if (withoutAtTypePrefix !== mangledName) {
            return unmangleScopedPackageName(withoutAtTypePrefix);
        }
        return mangledName;
    }

    /* @internal */
    export function unmangleScopedPackageName(typesPackageName: string): string {
        return stringContains(typesPackageName, mangledScopedPackageSeparator) ?
            "@" + typesPackageName.replace(mangledScopedPackageSeparator, directorySeparator) :
            typesPackageName;
    }

    function tryFindNonRelativeModuleNameInCache(cache: PerModuleNameCache | undefined, moduleName: string, containingDirectory: string, state: ModuleResolutionState): SearchResult<Resolved> {
        const result = cache && cache.get(containingDirectory);
        if (result) {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Resolution_for_module_0_was_found_in_cache_from_location_1, moduleName, containingDirectory);
            }
            state.resultFromCache = result;
            return { value: result.resolvedModule && { path: result.resolvedModule.resolvedFileName, originalPath: result.resolvedModule.originalPath || true, extension: result.resolvedModule.extension, packageId: result.resolvedModule.packageId } };
        }
    }

    export function classicNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache?: NonRelativeModuleNameResolutionCache, redirectedReference?: ResolvedProjectReference): ResolvedModuleWithFailedLookupLocations {
        const traceEnabled = isTraceEnabled(compilerOptions, host);
        const failedLookupLocations: string[] = [];
        const state: ModuleResolutionState = { compilerOptions, host, traceEnabled, failedLookupLocations };
        const containingDirectory = getDirectoryPath(containingFile);

        const resolved = tryResolve(Extensions.TypeScript) || tryResolve(Extensions.JavaScript);
        // No originalPath because classic resolution doesn't resolve realPath
        return createResolvedModuleWithFailedLookupLocations(resolved && resolved.value, /*isExternalLibraryImport*/ false, failedLookupLocations, state.resultFromCache);

        function tryResolve(extensions: Extensions): SearchResult<Resolved> {
            const resolvedUsingSettings = tryLoadModuleUsingOptionalResolutionSettings(extensions, moduleName, containingDirectory, loadModuleFromFileNoPackageId, state);
            if (resolvedUsingSettings) {
                return { value: resolvedUsingSettings };
            }

            if (!isExternalModuleNameRelative(moduleName)) {
                const perModuleNameCache = cache && cache.getOrCreateCacheForModuleName(moduleName, redirectedReference);
                // Climb up parent directories looking for a module.
                const resolved = forEachAncestorDirectory(containingDirectory, directory => {
                    const resolutionFromCache = tryFindNonRelativeModuleNameInCache(perModuleNameCache, moduleName, directory, state);
                    if (resolutionFromCache) {
                        return resolutionFromCache;
                    }
                    const searchName = normalizePath(combinePaths(directory, moduleName));
                    return toSearchResult(loadModuleFromFileNoPackageId(extensions, searchName, /*onlyRecordFailures*/ false, state));
                });
                if (resolved) {
                    return resolved;
                }
                if (extensions === Extensions.TypeScript) {
                    // If we didn't find the file normally, look it up in @types.
                    return loadModuleFromNearestNodeModulesDirectoryTypesScope(moduleName, containingDirectory, state);
                }
            }
            else {
                const candidate = normalizePath(combinePaths(containingDirectory, moduleName));
                return toSearchResult(loadModuleFromFileNoPackageId(extensions, candidate, /*onlyRecordFailures*/ false, state));
            }
        }
    }

    /**
     * A host may load a module from a global cache of typings.
     * This is the minumum code needed to expose that functionality; the rest is in the host.
     */
    /* @internal */
    export function loadModuleFromGlobalCache(moduleName: string, projectName: string | undefined, compilerOptions: CompilerOptions, host: ModuleResolutionHost, globalCache: string): ResolvedModuleWithFailedLookupLocations {
        const traceEnabled = isTraceEnabled(compilerOptions, host);
        if (traceEnabled) {
            trace(host, Diagnostics.Auto_discovery_for_typings_is_enabled_in_project_0_Running_extra_resolution_pass_for_module_1_using_cache_location_2, projectName, moduleName, globalCache);
        }
        const failedLookupLocations: string[] = [];
        const state: ModuleResolutionState = { compilerOptions, host, traceEnabled, failedLookupLocations };
        const resolved = loadModuleFromImmediateNodeModulesDirectory(Extensions.DtsOnly, moduleName, globalCache, state, /*typesScopeOnly*/ false);
        return createResolvedModuleWithFailedLookupLocations(resolved, /*isExternalLibraryImport*/ true, failedLookupLocations, state.resultFromCache);
    }

    /**
     * Represents result of search. Normally when searching among several alternatives we treat value `undefined` as indicator
     * that search fails and we should try another option.
     * However this does not allow us to represent final result that should be used instead of further searching (i.e. a final result that was found in cache).
     * SearchResult is used to deal with this issue, its values represents following outcomes:
     * - undefined - not found, continue searching
     * - { value: undefined } - not found - stop searching
     * - { value: <some-value> } - found - stop searching
     */
    type SearchResult<T> = { value: T | undefined } | undefined;

    /**
     * Wraps value to SearchResult.
     * @returns undefined if value is undefined or { value } otherwise
     */
    function toSearchResult<T>(value: T | undefined): SearchResult<T> {
        return value !== undefined ? { value } : undefined;
    }
}
