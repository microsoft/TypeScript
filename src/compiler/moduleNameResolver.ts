/// <reference path="core.ts" />
/// <reference path="diagnosticInformationMap.generated.ts" />

namespace ts {
    function trace(host: ModuleResolutionHost, message: DiagnosticMessage, ...args: any[]): void;
    function trace(host: ModuleResolutionHost, message: DiagnosticMessage): void {
        host.trace(formatMessage.apply(undefined, arguments));
    }

    /* @internal */
    export function isTraceEnabled(compilerOptions: CompilerOptions, host: ModuleResolutionHost): boolean {
        return compilerOptions.traceResolution && host.trace !== undefined;
    }

    /**
     * Result of trying to resolve a module.
     * At least one of `ts` and `js` should be defined, or the whole thing should be `undefined`.
     */
    interface Resolved {
        ts: string | undefined;
        js: string | undefined;
    }

    /**
     * Given a resolution result which does not have a resolvedTsFileName, combine it with second attempt.
     * This should be used in the following pattern:
     *
     * const attemptA = foo();
     * return attemptA && attemptA.ts ? attemptA : combineAttempts(attemptA, bar());
     *
     * Meaning, we stop early if we found a typed result.
     */
    function combineAttempts(firstAttempt: Resolved | undefined, secondAttempt: Resolved | undefined): Resolved | undefined {
        Debug.assert(!(firstAttempt && firstAttempt.ts));
        return firstAttempt && secondAttempt
            ? { ts: secondAttempt.ts, js: firstAttempt.js }
            : (firstAttempt || secondAttempt);
    }

    /**
     * Whether we are looking for all supported extensions or only `.d.ts` files.
     * We look for tsx/jsx/js files even if the compiler settings do not allow them -- this will be a checker error.
     */
    enum Extensions { All, DtsOnly }

    /** Used with `Extensions.DtsOnly` to use just the `ts` component, since `js` can't possibly be defined. */
    function resolvedTsOnly(resolved: Resolved | undefined): string | undefined {
        Debug.assert(!(resolved && resolved.js));
        return resolved && resolved.ts;
    }

    /** Create Resolved from a file with unknown extension. */
    function resolvedFromAnyFile(path: string): Resolved | undefined {
        return fileExtensionIsAny(path, supportedTypeScriptExtensions) ? { ts: path, js: undefined } : { ts: undefined, js: path };
    }

    /* @internal */
    export function resolvedModuleFromAnyFile(fileName: string, isExternalLibraryImport: boolean): ResolvedModule {
        return resolvedModuleFromResolved(resolvedFromAnyFile(fileName), isExternalLibraryImport);
    }

    /** Adds `isExernalLibraryImport` to a Resolved to get a ResolvedModule. */
    function resolvedModuleFromResolved({ ts, js }: Resolved, isExternalLibraryImport: boolean): ResolvedModule {
        return { resolvedFileName: ts || js, resolvedTsFileName: ts, resolvedJsFileName: js, isExternalLibraryImport };
    }

    function createResolvedModuleWithFailedLookupLocations(resolved: Resolved | undefined, isExternalLibraryImport: boolean, failedLookupLocations: string[]): ResolvedModuleWithFailedLookupLocations {
        return { resolvedModule: resolved && resolvedModuleFromResolved(resolved, isExternalLibraryImport), failedLookupLocations };
    }

    function moduleHasNonRelativeName(moduleName: string): boolean {
        return !(isRootedDiskPath(moduleName) || isExternalModuleNameRelative(moduleName));
    }

    interface ModuleResolutionState {
        host: ModuleResolutionHost;
        // We only use this subset of the compiler options.
        compilerOptions: { rootDirs?: string[], baseUrl?: string, paths?: MapLike<string[]>; };
        traceEnabled: boolean;
    }

    /** LsHost uses a global cache of automatically-installed typings to help it resolve modules. */
    /* @internal */
    export function resolveModuleNameForLsHost(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, globalCache: string | undefined, projectName: string): ResolvedModuleWithFailedLookupLocations {
        const primaryResult = resolveModuleName(moduleName, containingFile, compilerOptions, host);
        if (primaryResult.resolvedModule && primaryResult.resolvedModule.resolvedTsFileName) {
            // return result immediately only if it is .ts, .tsx or .d.ts
            // otherwise try to load typings from @types
            return primaryResult;
        }

        // create different collection of failed lookup locations for second pass
        // if it will fail and we've already found something during the first pass - we don't want to pollute its results
        const secondaryLookupFailedLookupLocations: string[] = [];
        if (globalCache !== undefined) {
            const traceEnabled = isTraceEnabled(compilerOptions, host);
            if (traceEnabled) {
                trace(host, Diagnostics.Auto_discovery_for_typings_is_enabled_in_project_0_Running_extra_resolution_pass_for_module_1_using_cache_location_2, projectName, moduleName, globalCache);
            }
            const state: ModuleResolutionState = { compilerOptions, host, traceEnabled };
            const resolved = loadModuleFromNodeModules(Extensions.All, moduleName, globalCache, secondaryLookupFailedLookupLocations, state, /*checkOneLevel*/ true);
            if (resolved) {
                return createResolvedModuleWithFailedLookupLocations(resolved, /*isExternalLibraryImport*/ true, primaryResult.failedLookupLocations.concat(secondaryLookupFailedLookupLocations));
            }
        }

        if (!primaryResult.resolvedModule && secondaryLookupFailedLookupLocations.length) {
            primaryResult.failedLookupLocations = primaryResult.failedLookupLocations.concat(secondaryLookupFailedLookupLocations);
        }
        return primaryResult;
    }

    function tryReadTypesSection(packageJsonPath: string, baseDirectory: string, state: ModuleResolutionState): string {
        const jsonContent = readJson(packageJsonPath, state.host);

        function tryReadFromField(fieldName: string) {
            if (hasProperty(jsonContent, fieldName)) {
                const typesFile = (<any>jsonContent)[fieldName];
                if (typeof typesFile === "string") {
                    const typesFilePath = normalizePath(combinePaths(baseDirectory, typesFile));
                    if (state.traceEnabled) {
                        trace(state.host, Diagnostics.package_json_has_0_field_1_that_references_2, fieldName, typesFile, typesFilePath);
                    }
                    return typesFilePath;
                }
                else {
                    if (state.traceEnabled) {
                        trace(state.host, Diagnostics.Expected_type_of_0_field_in_package_json_to_be_string_got_1, fieldName, typeof typesFile);
                    }
                }
            }
        }

        const typesFilePath = tryReadFromField("typings") || tryReadFromField("types");
        if (typesFilePath) {
            return typesFilePath;
        }

        // Use the main module for inferring types if no types package specified and the allowJs is set
        if (typeof jsonContent.main === "string") {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.No_types_specified_in_package_json_so_returning_main_value_of_0, jsonContent.main);
            }
            return normalizePath(combinePaths(baseDirectory, jsonContent.main));
        }
        return undefined;
    }

    function readJson(path: string, host: ModuleResolutionHost): { typings?: string, types?: string, main?: string } {
        try {
            const jsonText = host.readFile(path);
            return jsonText ? JSON.parse(jsonText) : {};
        }
        catch (e) {
            // gracefully handle if readFile fails or returns not JSON
            return {};
        }
    }

    export function getEffectiveTypeRoots(options: CompilerOptions, host: { directoryExists?: (directoryName: string) => boolean, getCurrentDirectory?: () => string }): string[] | undefined {
        if (options.typeRoots) {
            return options.typeRoots;
        }

        let currentDirectory: string;
        if (options.configFilePath) {
            currentDirectory = getDirectoryPath(options.configFilePath);
        }
        else if (host.getCurrentDirectory) {
            currentDirectory = host.getCurrentDirectory();
        }

        return currentDirectory !== undefined && getDefaultTypeRoots(currentDirectory, host);
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

        let typeRoots: string[];

        while (true) {
            const atTypes = combinePaths(currentDirectory, nodeModulesAtTypes);
            if (host.directoryExists(atTypes)) {
                (typeRoots || (typeRoots = [])).push(atTypes);
            }

            const parent = getDirectoryPath(currentDirectory);
            if (parent === currentDirectory) {
                break;
            }
            currentDirectory = parent;
        }

        return typeRoots;
    }
    const nodeModulesAtTypes = combinePaths("node_modules", "@types");

    /**
     * @param {string | undefined} containingFile - file that contains type reference directive, can be undefined if containing file is unknown.
     * This is possible in case if resolution is performed for directives specified via 'types' parameter. In this case initial path for secondary lookups
     * is assumed to be the same as root directory of the project.
     */
    export function resolveTypeReferenceDirective(typeReferenceDirectiveName: string, containingFile: string | undefined, options: CompilerOptions, host: ModuleResolutionHost): ResolvedTypeReferenceDirectiveWithFailedLookupLocations {
        const traceEnabled = isTraceEnabled(options, host);
        const moduleResolutionState: ModuleResolutionState = {
            compilerOptions: options,
            host: host,
            traceEnabled
        };

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
        }

        const failedLookupLocations: string[] = [];

        // Check primary library paths
        if (typeRoots && typeRoots.length) {
            if (traceEnabled) {
                trace(host, Diagnostics.Resolving_with_primary_search_path_0, typeRoots.join(", "));
            }
            for (const typeRoot of typeRoots) {
                const candidate = combinePaths(typeRoot, typeReferenceDirectiveName);
                const candidateDirectory = getDirectoryPath(candidate);

                const resolved = resolvedTsOnly(
                    loadNodeModuleFromDirectory(Extensions.DtsOnly, candidate, failedLookupLocations,
                        !directoryProbablyExists(candidateDirectory, host), moduleResolutionState));

                if (resolved) {
                    if (traceEnabled) {
                        trace(host, Diagnostics.Type_reference_directive_0_was_successfully_resolved_to_1_primary_Colon_2, typeReferenceDirectiveName, resolved, true);
                    }
                    return {
                        resolvedTypeReferenceDirective: { primary: true, resolvedFileName: resolved },
                        failedLookupLocations
                    };
                }
            }
        }
        else {
            if (traceEnabled) {
                trace(host, Diagnostics.Root_directory_cannot_be_determined_skipping_primary_search_paths);
            }
        }

        let resolvedFile: string;
        const initialLocationForSecondaryLookup = containingFile && getDirectoryPath(containingFile);

        if (initialLocationForSecondaryLookup !== undefined) {
            // check secondary locations
            if (traceEnabled) {
                trace(host, Diagnostics.Looking_up_in_node_modules_folder_initial_location_0, initialLocationForSecondaryLookup);
            }
            resolvedFile = resolvedTsOnly(loadModuleFromNodeModules(Extensions.DtsOnly, typeReferenceDirectiveName, initialLocationForSecondaryLookup, failedLookupLocations, moduleResolutionState, /*checkOneLevel*/ false));
            if (traceEnabled) {
                if (resolvedFile) {
                    trace(host, Diagnostics.Type_reference_directive_0_was_successfully_resolved_to_1_primary_Colon_2, typeReferenceDirectiveName, resolvedFile, false);
                }
                else {
                    trace(host, Diagnostics.Type_reference_directive_0_was_not_resolved, typeReferenceDirectiveName);
                }
            }
        }
        else {
            if (traceEnabled) {
                trace(host, Diagnostics.Containing_file_is_not_specified_and_root_directory_cannot_be_determined_skipping_lookup_in_node_modules_folder);
            }
        }
        return {
            resolvedTypeReferenceDirective: resolvedFile ? { primary: false, resolvedFileName: resolvedFile } : undefined,
            failedLookupLocations
        };
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
                            const packageJsonPath = pathToPackageJson(combinePaths(root, normalized));
                            // tslint:disable-next-line:no-null-keyword
                            const isNotNeededPackage = host.fileExists(packageJsonPath) && readJson(packageJsonPath, host).typings === null;
                            if (!isNotNeededPackage) {
                                // Return just the type directive names
                                result.push(getBaseFileName(normalized));
                            }
                        }
                    }
                }
            }
        }
        return result;
    }

    export function resolveModuleName(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost): ResolvedModuleWithFailedLookupLocations {
        const traceEnabled = isTraceEnabled(compilerOptions, host);
        if (traceEnabled) {
            trace(host, Diagnostics.Resolving_module_0_from_1, moduleName, containingFile);
        }

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

        let result: ResolvedModuleWithFailedLookupLocations;
        switch (moduleResolution) {
            case ModuleResolutionKind.NodeJs:
                result = nodeModuleNameResolver(moduleName, containingFile, compilerOptions, host);
                break;
            case ModuleResolutionKind.Classic:
                result = classicNameResolver(moduleName, containingFile, compilerOptions, host);
                break;
        }

        if (traceEnabled) {
            if (result.resolvedModule) {
                trace(host, Diagnostics.Module_name_0_was_successfully_resolved_to_1, moduleName, result.resolvedModule.resolvedFileName);
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
    type ResolutionKindSpecificLoader = (candidate: string, failedLookupLocations: string[], onlyRecordFailures: boolean, state: ModuleResolutionState) => Resolved | undefined;

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
    function tryLoadModuleUsingOptionalResolutionSettings(moduleName: string, containingDirectory: string, loader: ResolutionKindSpecificLoader,
        failedLookupLocations: string[], state: ModuleResolutionState): Resolved | undefined {

        if (moduleHasNonRelativeName(moduleName)) {
            return tryLoadModuleUsingBaseUrl(moduleName, loader, failedLookupLocations, state);
        }
        else {
            return tryLoadModuleUsingRootDirs(moduleName, containingDirectory, loader, failedLookupLocations, state);
        }
    }

    function tryLoadModuleUsingRootDirs(moduleName: string, containingDirectory: string, loader: ResolutionKindSpecificLoader,
        failedLookupLocations: string[], state: ModuleResolutionState): Resolved | undefined {

        if (!state.compilerOptions.rootDirs) {
            return undefined;
        }

        if (state.traceEnabled) {
            trace(state.host, Diagnostics.rootDirs_option_is_set_using_it_to_resolve_relative_module_name_0, moduleName);
        }

        const candidate = normalizePath(combinePaths(containingDirectory, moduleName));

        let matchedRootDir: string;
        let matchedNormalizedPrefix: string;
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
            const resolvedFileName = loader(candidate, failedLookupLocations, !directoryProbablyExists(containingDirectory, state.host), state);
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
                const resolvedFileName = loader(candidate, failedLookupLocations, !directoryProbablyExists(baseDirectory, state.host), state);
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

    function tryLoadModuleUsingBaseUrl(moduleName: string, loader: ResolutionKindSpecificLoader, failedLookupLocations: string[], state: ModuleResolutionState): Resolved | undefined {
        if (!state.compilerOptions.baseUrl) {
            return undefined;
        }
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.baseUrl_option_is_set_to_0_using_this_value_to_resolve_non_relative_module_name_1, state.compilerOptions.baseUrl, moduleName);
        }

        // string is for exact match
        let matchedPattern: Pattern | string | undefined = undefined;
        if (state.compilerOptions.paths) {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.paths_option_is_specified_looking_for_a_pattern_to_match_module_name_0, moduleName);
            }
            matchedPattern = matchPatternOrExact(getOwnKeys(state.compilerOptions.paths), moduleName);
        }

        if (matchedPattern) {
            const matchedStar = typeof matchedPattern === "string" ? undefined : matchedText(matchedPattern, moduleName);
            const matchedPatternText = typeof matchedPattern === "string" ? matchedPattern : patternText(matchedPattern);
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Module_name_0_matched_pattern_1, moduleName, matchedPatternText);
            }
            for (const subst of state.compilerOptions.paths[matchedPatternText]) {
                const path = matchedStar ? subst.replace("*", matchedStar) : subst;
                const candidate = normalizePath(combinePaths(state.compilerOptions.baseUrl, path));
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.Trying_substitution_0_candidate_module_location_Colon_1, subst, path);
                }
                const resolved = loader(candidate, failedLookupLocations, !directoryProbablyExists(getDirectoryPath(candidate), state.host), state);
                if (resolved) {
                    return resolved;
                }
            }
            return undefined;
        }
        else {
            const candidate = normalizePath(combinePaths(state.compilerOptions.baseUrl, moduleName));

            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Resolving_module_name_0_relative_to_base_url_1_2, moduleName, state.compilerOptions.baseUrl, candidate);
            }

            return loader(candidate, failedLookupLocations, !directoryProbablyExists(getDirectoryPath(candidate), state.host), state);
        }
    }

    export function nodeModuleNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost): ResolvedModuleWithFailedLookupLocations {
        const containingDirectory = getDirectoryPath(containingFile);
        const traceEnabled = isTraceEnabled(compilerOptions, host);

        const failedLookupLocations: string[] = [];
        const state: ModuleResolutionState = { compilerOptions, host, traceEnabled };
        let resolved = tryLoadModuleUsingOptionalResolutionSettings(moduleName, containingDirectory, nodeLoadModuleByRelativeName, failedLookupLocations, state);

        let isExternalLibraryImport = false;
        if (!resolved) {
            if (moduleHasNonRelativeName(moduleName)) {
                if (traceEnabled) {
                    trace(host, Diagnostics.Loading_module_0_from_node_modules_folder, moduleName);
                }
                resolved = loadModuleFromNodeModules(Extensions.All, moduleName, containingDirectory, failedLookupLocations, state, /*checkOneLevel*/ false);
                isExternalLibraryImport = resolved !== undefined;
            }
            else {
                const candidate = normalizePath(combinePaths(containingDirectory, moduleName));
                resolved = nodeLoadModuleByRelativeName(candidate, failedLookupLocations, /*onlyRecordFailures*/ false, state);
            }
        }

        return createResolvedModuleWithFailedLookupLocations(resolved && resolvedWithRealpath(resolved, host, traceEnabled), isExternalLibraryImport, failedLookupLocations);
    }

    function resolvedWithRealpath(resolved: Resolved, host: ModuleResolutionHost, traceEnabled: boolean): Resolved {
        return host.realpath ? { ts: resolved.ts && realpath(resolved.ts), js: resolved.js && realpath(resolved.js) } : resolved;

        function realpath(path: string): string {
            const real = normalizePath(host.realpath(path));
            if (traceEnabled) {
                trace(host, Diagnostics.Resolving_real_path_for_0_result_1, path, real);
            }
            return real;
        }
    }

    function nodeLoadModuleByRelativeName(candidate: string, failedLookupLocations: string[], onlyRecordFailures: boolean, state: ModuleResolutionState): Resolved | undefined {
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.Loading_module_as_file_Slash_folder_candidate_module_location_0, candidate);
        }

        const resolvedFromFile = !pathEndsWithDirectorySeparator(candidate) && loadModuleFromFile(Extensions.All, candidate, failedLookupLocations, onlyRecordFailures, state);
        return resolvedFromFile && resolvedFromFile.ts
            ? resolvedFromFile
            : combineAttempts(resolvedFromFile,
                loadNodeModuleFromDirectory(Extensions.All, candidate, failedLookupLocations, onlyRecordFailures, state));
    }

    /* @internal */
    export function directoryProbablyExists(directoryName: string, host: { directoryExists?: (directoryName: string) => boolean }): boolean {
        // if host does not support 'directoryExists' assume that directory will exist
        return !host.directoryExists || host.directoryExists(directoryName);
    }

    function loadModuleFromFileAnyExtension(candidate: string, failedLookupLocations: string[], onlyRecordFailures: boolean, state: ModuleResolutionState): Resolved | undefined {
        return loadModuleFromFile(Extensions.All, candidate, failedLookupLocations, onlyRecordFailures, state);
    }

    /**
     * @param {boolean} onlyRecordFailures - if true then function won't try to actually load files but instead record all attempts as failures. This flag is necessary
     * in cases when we know upfront that all load attempts will fail (because containing folder does not exists) however we still need to record all failed lookup locations.
     */
    function loadModuleFromFile(extensions: Extensions, candidate: string, failedLookupLocations: string[], onlyRecordFailures: boolean, state: ModuleResolutionState): Resolved | undefined {
        // First, try adding an extension. An import of "foo" could be matched by a file "foo.ts", or "foo.js" by "foo.js.ts"
        const resolvedByAddingExtension = tryAddingExtensions(candidate, extensions, failedLookupLocations, onlyRecordFailures, state);
        if (resolvedByAddingExtension) {
            return resolvedByAddingExtension;
        }

        // If that didn't work, try stripping a ".js" or ".jsx" extension and replacing it with a TypeScript one;
        // e.g. "./foo.js" can be matched by "./foo.ts" or "./foo.d.ts"
        if (hasJavaScriptFileExtension(candidate)) {
            const extensionless = removeFileExtension(candidate);
            if (state.traceEnabled) {
                const extension = candidate.substring(extensionless.length);
                trace(state.host, Diagnostics.File_name_0_has_a_1_extension_stripping_it, candidate, extension);
            }
            return tryAddingExtensions(extensionless, Extensions.All, failedLookupLocations, onlyRecordFailures, state);
        }
    }

    /** Try to return an existing file that adds one of the `extensions` to `candidate`. */
    function tryAddingExtensions(candidate: string, extensions: Extensions, failedLookupLocations: string[], onlyRecordFailures: boolean, state: ModuleResolutionState): Resolved | undefined {
        if (!onlyRecordFailures) {
            // check if containing folder exists - if it doesn't then just record failures for all supported extensions without disk probing
            const directory = getDirectoryPath(candidate);
            if (directory) {
                onlyRecordFailures = !directoryProbablyExists(directory, state.host);
            }
        }

        switch (extensions) {
            case Extensions.DtsOnly: {
                const dts = tryExtension(".d.ts");
                return dts && { ts: dts, js: undefined };
            }
            case Extensions.All: {
                const ts = forEach(supportedTypeScriptExtensions, tryExtension);
                if (ts) {
                    return { ts, js: undefined };
                }

                const js = forEach(supportedJavascriptExtensions, tryExtension);
                return js && { ts: undefined, js };
            }
        }

        function tryExtension(ext: string): string | undefined {
            return tryFile(candidate + ext, failedLookupLocations, onlyRecordFailures, state);
        }
    }

    /** Return the file if it exists. */
    function tryFile(fileName: string, failedLookupLocation: string[], onlyRecordFailures: boolean, state: ModuleResolutionState): string | undefined {
        if (!onlyRecordFailures && state.host.fileExists(fileName)) {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.File_0_exist_use_it_as_a_name_resolution_result, fileName);
            }
            return fileName;
        }
        else {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.File_0_does_not_exist, fileName);
            }
            failedLookupLocation.push(fileName);
            return undefined;
        }
    }

    function loadNodeModuleFromDirectory(extensions: Extensions, candidate: string, failedLookupLocation: string[], onlyRecordFailures: boolean, state: ModuleResolutionState): Resolved | undefined {
        const packageJsonPath = pathToPackageJson(candidate);
        const directoryExists = !onlyRecordFailures && directoryProbablyExists(candidate, state.host);

        let fromPackageJson: Resolved | undefined;

        if (directoryExists && state.host.fileExists(packageJsonPath)) {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Found_package_json_at_0, packageJsonPath);
            }
            const typesFile = tryReadTypesSection(packageJsonPath, candidate, state);
            if (typesFile) {
                const onlyRecordFailures = !directoryProbablyExists(getDirectoryPath(typesFile), state.host);
                // A package.json "typings" may specify an exact filename, or may choose to omit an extension.
                const fromFile = tryFile(typesFile, failedLookupLocation, onlyRecordFailures, state);
                if (fromFile) {
                    return resolvedFromAnyFile(fromFile);
                }
                fromPackageJson = tryAddingExtensions(typesFile, Extensions.All, failedLookupLocation, onlyRecordFailures, state);
                if (fromPackageJson && fromPackageJson.ts) {
                    return fromPackageJson;
                }
            }
            else {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.package_json_does_not_have_a_types_or_main_field);
                }
            }
        }
        else {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.File_0_does_not_exist, packageJsonPath);
            }
            // record package json as one of failed lookup locations - in the future if this file will appear it will invalidate resolution results
            failedLookupLocation.push(packageJsonPath);
        }

        return combineAttempts(fromPackageJson, loadModuleFromFile(extensions, combinePaths(candidate, "index"), failedLookupLocation, !directoryExists, state));
    }

    function pathToPackageJson(directory: string): string {
        return combinePaths(directory, "package.json");
    }

    function loadModuleFromNodeModulesFolder(extensions: Extensions, moduleName: string, directory: string, failedLookupLocations: string[], state: ModuleResolutionState): Resolved | undefined {
        const nodeModulesFolder = combinePaths(directory, "node_modules");
        const nodeModulesFolderExists = directoryProbablyExists(nodeModulesFolder, state.host);
        const candidate = normalizePath(combinePaths(nodeModulesFolder, moduleName));

        let result = loadModuleFromFile(extensions, candidate, failedLookupLocations, !nodeModulesFolderExists, state);
        if (result) {
            return result;
        }
        result = loadNodeModuleFromDirectory(extensions, candidate, failedLookupLocations, !nodeModulesFolderExists, state);
        if (result) {
            return result;
        }
    }

    function loadModuleFromNodeModules(extensions: Extensions, moduleName: string, directory: string, failedLookupLocations: string[], state: ModuleResolutionState, checkOneLevel: boolean): Resolved | undefined {
        return loadModuleFromNodeModulesWorker(extensions, moduleName, directory, failedLookupLocations, state, checkOneLevel, /*typesOnly*/ false);
    }
    function loadModuleFromNodeModulesAtTypes(moduleName: string, directory: string, failedLookupLocations: string[], state: ModuleResolutionState): Resolved | undefined {
        return loadModuleFromNodeModulesWorker(Extensions.All, moduleName, directory, failedLookupLocations, state, /*checkOneLevel*/ false, /*typesOnly*/ true);
    }

    function loadModuleFromNodeModulesWorker(extensions: Extensions, moduleName: string, directory: string, failedLookupLocations: string[], state: ModuleResolutionState, checkOneLevel: boolean, typesOnly: boolean): Resolved | undefined {
        directory = normalizeSlashes(directory);
        while (true) {
            const baseName = getBaseFileName(directory);
            if (baseName !== "node_modules") {
                let packageResult: Resolved | undefined;
                if (!typesOnly) {
                    // Try to load source from the package
                    packageResult = loadModuleFromNodeModulesFolder(extensions, moduleName, directory, failedLookupLocations, state);
                    if (packageResult && packageResult.ts) {
                        // Always prefer a TypeScript (.ts, .tsx, .d.ts) file shipped with the package
                        return packageResult;
                    }
                }

                // Else prefer a types package over non-TypeScript results (e.g. JavaScript files)
                const typesResult = loadModuleFromNodeModulesFolder(extensions, combinePaths("@types", moduleName), directory, failedLookupLocations, state);
                if (typesResult || packageResult) {
                    return combineAttempts(packageResult, typesResult);
                }
                // TODO (anhans): We should remember JS results and use them for untyped results.
            }

            const parentPath = getDirectoryPath(directory);
            if (parentPath === directory || checkOneLevel) {
                break;
            }

            directory = parentPath;
        }
        return undefined;
    }

    export function classicNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost): ResolvedModuleWithFailedLookupLocations {
        const traceEnabled = isTraceEnabled(compilerOptions, host);
        const state: ModuleResolutionState = { compilerOptions, host, traceEnabled };
        const failedLookupLocations: string[] = [];
        const containingDirectory = getDirectoryPath(containingFile);

        const resolvedUsingSettings = tryLoadModuleUsingOptionalResolutionSettings(moduleName, containingDirectory, loadModuleFromFileAnyExtension, failedLookupLocations, state);
        if (resolvedUsingSettings) {
            return createResolvedModuleWithFailedLookupLocations(resolvedUsingSettings, /*isExternalLibraryImport*/ false, failedLookupLocations);
        }

        let resolved: Resolved | undefined;
        if (moduleHasNonRelativeName(moduleName)) {
            resolved = loadModuleFromAncestorDirectories(moduleName, containingDirectory, failedLookupLocations, state) ||
                // If we didn't find the file normally, look it up in @types.
                loadModuleFromNodeModulesAtTypes(moduleName, containingDirectory, failedLookupLocations, state);
        }
        else {
            const candidate = normalizePath(combinePaths(containingDirectory, moduleName));
            resolved = loadModuleFromFileAnyExtension(candidate, failedLookupLocations, /*onlyRecordFailures*/ false, state);
        }

        return createResolvedModuleWithFailedLookupLocations(resolved, /*isExternalLibraryImport*/ false, failedLookupLocations);
    }

    /** Climb up parent directories looking for a module. */
    function loadModuleFromAncestorDirectories(moduleName: string, containingDirectory: string, failedLookupLocations: string[], state: ModuleResolutionState): Resolved | undefined {
        while (true) {
            const searchName = normalizePath(combinePaths(containingDirectory, moduleName));
            const referencedSourceFile = loadModuleFromFileAnyExtension(searchName, failedLookupLocations, /*onlyRecordFailures*/ false, state);
            if (referencedSourceFile) {
                return referencedSourceFile;
            }
            const parentPath = getDirectoryPath(containingDirectory);
            if (parentPath === containingDirectory) {
                return undefined;
            }
            containingDirectory = parentPath;
        }
    }
}