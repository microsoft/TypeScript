/// <reference path="core.ts" />
/// <reference path="diagnosticInformationMap.generated.ts" />

namespace ts {
    /* @internal */
    export function trace(host: ModuleResolutionHost, message: DiagnosticMessage, ...args: any[]): void;
    export function trace(host: ModuleResolutionHost): void {
        host.trace(formatMessage.apply(undefined, arguments));
    }

    /* @internal */
    export function isTraceEnabled(compilerOptions: CompilerOptions, host: ModuleResolutionHost): boolean {
        return compilerOptions.traceResolution && host.trace !== undefined;
    }

    /** Array that is only intended to be pushed to, never read. */
    /* @internal */
    export interface Push<T> {
        push(value: T): void;
    }

    /**
     * Result of trying to resolve a module.
     * At least one of `ts` and `js` should be defined, or the whole thing should be `undefined`.
     */
    interface Resolved {
        path: string;
        extension: Extension;
    }

    /**
     * Kinds of file that we are currently looking for.
     * Typically there is one pass with Extensions.TypeScript, then a second pass with Extensions.JavaScript.
     */
    enum Extensions {
        TypeScript, /** '.ts', '.tsx', or '.d.ts' */
        JavaScript, /** '.js' or '.jsx' */
        DtsOnly /** Only '.d.ts' */
    }

    /** Used with `Extensions.DtsOnly` to extract the path from TypeScript results. */
    function resolvedTypeScriptOnly(resolved: Resolved | undefined): string | undefined {
        if (!resolved) {
            return undefined;
        }
        Debug.assert(extensionIsTypeScript(resolved.extension));
        return resolved.path;
    }

    function createResolvedModuleWithFailedLookupLocations(resolved: Resolved | undefined, isExternalLibraryImport: boolean, failedLookupLocations: string[]): ResolvedModuleWithFailedLookupLocations {
        return {
            resolvedModule: resolved && { resolvedFileName: resolved.path, extension: resolved.extension, isExternalLibraryImport },
            failedLookupLocations
        };
    }

    export function moduleHasNonRelativeName(moduleName: string): boolean {
        return !(isRootedDiskPath(moduleName) || isExternalModuleNameRelative(moduleName));
    }

    interface ModuleResolutionState {
        host: ModuleResolutionHost;
        compilerOptions: CompilerOptions;
        traceEnabled: boolean;
    }

    /** Reads from "main" or "types"/"typings" depending on `extensions`. */
    function tryReadPackageJsonFields(readTypes: boolean, packageJsonPath: string, baseDirectory: string, state: ModuleResolutionState): string | undefined {
        const jsonContent = readJson(packageJsonPath, state.host);
        return readTypes ? tryReadFromField("typings") || tryReadFromField("types") : tryReadFromField("main");

        function tryReadFromField(fieldName: "typings" | "types" | "main"): string | undefined {
            if (!hasProperty(jsonContent, fieldName)) {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.package_json_does_not_have_a_0_field, fieldName);
                }
                return;
            }

            const fileName = jsonContent[fieldName];
            if (typeof fileName !== "string") {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.Expected_type_of_0_field_in_package_json_to_be_string_got_1, fieldName, typeof fileName);
                }
                return;
            }

            const path = normalizePath(combinePaths(baseDirectory, fileName));
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.package_json_has_0_field_1_that_references_2, fieldName, fileName, path);
            }
            return path;
        }
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

        let typeRoots: string[];
        forEachAncestorDirectory(ts.normalizePath(currentDirectory), directory => {
            const atTypes = combinePaths(directory, nodeModulesAtTypes);
            if (host.directoryExists(atTypes)) {
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

        let resolved = primaryLookup();
        let primary = true;
        if (!resolved) {
            resolved = secondaryLookup();
            primary = false;
        }

        let resolvedTypeReferenceDirective: ResolvedTypeReferenceDirective | undefined;
        if (resolved) {
            resolved = realpath(resolved, host, traceEnabled);
            if (traceEnabled) {
                trace(host, Diagnostics.Type_reference_directive_0_was_successfully_resolved_to_1_primary_Colon_2, typeReferenceDirectiveName, resolved, primary);
            }
            resolvedTypeReferenceDirective = { primary, resolvedFileName: resolved };
        }

        return { resolvedTypeReferenceDirective, failedLookupLocations };

        function primaryLookup(): string | undefined {
            // Check primary library paths
            if (typeRoots && typeRoots.length) {
                if (traceEnabled) {
                    trace(host, Diagnostics.Resolving_with_primary_search_path_0, typeRoots.join(", "));
                }
                return forEach(typeRoots, typeRoot => {
                    const candidate = combinePaths(typeRoot, typeReferenceDirectiveName);
                    const candidateDirectory = getDirectoryPath(candidate);
                    const directoryExists = directoryProbablyExists(candidateDirectory, host);
                    if (!directoryExists && traceEnabled) {
                        trace(host, Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, candidateDirectory);
                    }
                    return resolvedTypeScriptOnly(
                        loadNodeModuleFromDirectory(Extensions.DtsOnly, candidate, failedLookupLocations,
                            !directoryExists, moduleResolutionState));
                });
            }
            else {
                if (traceEnabled) {
                    trace(host, Diagnostics.Root_directory_cannot_be_determined_skipping_primary_search_paths);
                }
            }
        }

        function secondaryLookup(): string | undefined {
            let resolvedFile: string;
            const initialLocationForSecondaryLookup = containingFile && getDirectoryPath(containingFile);

            if (initialLocationForSecondaryLookup !== undefined) {
                // check secondary locations
                if (traceEnabled) {
                    trace(host, Diagnostics.Looking_up_in_node_modules_folder_initial_location_0, initialLocationForSecondaryLookup);
                }
                const result = loadModuleFromNodeModules(Extensions.DtsOnly, typeReferenceDirectiveName, initialLocationForSecondaryLookup, failedLookupLocations, moduleResolutionState, /*cache*/ undefined);
                resolvedFile = resolvedTypeScriptOnly(result && result.value);
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

    /**
     * Cached module resolutions per containing directory.
     * This assumes that any module id will have the same resolution for sibling files located in the same folder.
     */
    export interface ModuleResolutionCache extends NonRelativeModuleNameResolutionCache {
        getOrCreateCacheForDirectory(directoryName: string): Map<ResolvedModuleWithFailedLookupLocations>;
    }

    /**
     * Stored map from non-relative module name to a table: directory -> result of module lookup in this directory
     * We support only non-relative module names because resolution of relative module names is usually more deterministic and thus less expensive.
     */
    export interface NonRelativeModuleNameResolutionCache {
        getOrCreateCacheForModuleName(nonRelativeModuleName: string): PerModuleNameCache;
    }

    export interface PerModuleNameCache {
        get(directory: string): ResolvedModuleWithFailedLookupLocations;
        set(directory: string, result: ResolvedModuleWithFailedLookupLocations): void;
    }

    export function createModuleResolutionCache(currentDirectory: string, getCanonicalFileName: (s: string) => string): ModuleResolutionCache {
        const directoryToModuleNameMap = createFileMap<Map<ResolvedModuleWithFailedLookupLocations>>();
        const moduleNameToDirectoryMap = createMap<PerModuleNameCache>();

        return { getOrCreateCacheForDirectory, getOrCreateCacheForModuleName };

        function getOrCreateCacheForDirectory(directoryName: string) {
            const path = toPath(directoryName, currentDirectory, getCanonicalFileName);
            let perFolderCache = directoryToModuleNameMap.get(path);
            if (!perFolderCache) {
                perFolderCache = createMap<ResolvedModuleWithFailedLookupLocations>();
                directoryToModuleNameMap.set(path, perFolderCache);
            }
            return perFolderCache;
        }

        function getOrCreateCacheForModuleName(nonRelativeModuleName: string) {
            if (!moduleHasNonRelativeName(nonRelativeModuleName)) {
                return undefined;
            }
            let perModuleNameCache = moduleNameToDirectoryMap.get(nonRelativeModuleName);
            if (!perModuleNameCache) {
                perModuleNameCache = createPerModuleNameCache();
                moduleNameToDirectoryMap.set(nonRelativeModuleName, perModuleNameCache);
            }
            return perModuleNameCache;
        }

        function createPerModuleNameCache(): PerModuleNameCache {
            const directoryPathMap = createFileMap<ResolvedModuleWithFailedLookupLocations>();

            return { get, set };

            function get(directory: string): ResolvedModuleWithFailedLookupLocations {
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
                if (directoryPathMap.contains(path)) {
                    return;
                }
                directoryPathMap.set(path, result);

                const resolvedFileName = result.resolvedModule && result.resolvedModule.resolvedFileName;
                // find common prefix between directory and resolved file name
                // this common prefix should be the shorted path that has the same resolution
                // directory: /a/b/c/d/e
                // resolvedFileName: /a/b/foo.d.ts
                const commonPrefix = getCommonPrefix(path, resolvedFileName);
                let current = path;
                while (true) {
                    const parent = getDirectoryPath(current);
                    if (parent === current || directoryPathMap.contains(parent)) {
                        break;
                    }
                    directoryPathMap.set(parent, result);
                    current = parent;

                    if (current === commonPrefix) {
                        break;
                    }
                }
            }

            function getCommonPrefix(directory: Path, resolution: string) {
                if (resolution === undefined) {
                    return undefined;
                }
                const resolutionDirectory = toPath(getDirectoryPath(resolution), currentDirectory, getCanonicalFileName);

                // find first position where directory and resolution differs
                let i = 0;
                while (i < Math.min(directory.length, resolutionDirectory.length) && directory.charCodeAt(i) === resolutionDirectory.charCodeAt(i)) {
                    i++;
                }

                // find last directory separator before position i
                const sep = directory.lastIndexOf(directorySeparator, i);
                if (sep < 0) {
                    return undefined;
                }

                return directory.substr(0, sep);
            }
        }
    }

    export function resolveModuleName(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache?: ModuleResolutionCache): ResolvedModuleWithFailedLookupLocations {
        const traceEnabled = isTraceEnabled(compilerOptions, host);
        if (traceEnabled) {
            trace(host, Diagnostics.Resolving_module_0_from_1, moduleName, containingFile);
        }
        const containingDirectory = getDirectoryPath(containingFile);
        const perFolderCache = cache && cache.getOrCreateCacheForDirectory(containingDirectory);
        let result = perFolderCache && perFolderCache.get(moduleName);

        if (result) {
            if (traceEnabled) {
                trace(host, Diagnostics.Resolution_for_module_0_was_found_in_cache, moduleName);
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

            switch (moduleResolution) {
                case ModuleResolutionKind.NodeJs:
                    result = nodeModuleNameResolver(moduleName, containingFile, compilerOptions, host, cache);
                    break;
                case ModuleResolutionKind.Classic:
                    result = classicNameResolver(moduleName, containingFile, compilerOptions, host, cache);
                    break;
                default:
                    Debug.fail(`Unexpected moduleResolution: ${moduleResolution}`);
            }

            if (perFolderCache) {
                perFolderCache.set(moduleName, result);
                // put result in per-module name cache
                const perModuleNameCache = cache.getOrCreateCacheForModuleName(moduleName);
                if (perModuleNameCache) {
                    perModuleNameCache.set(containingDirectory, result);
                }
            }
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
    type ResolutionKindSpecificLoader = (extensions: Extensions, candidate: string, failedLookupLocations: Push<string>, onlyRecordFailures: boolean, state: ModuleResolutionState) => Resolved | undefined;

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
        failedLookupLocations: Push<string>, state: ModuleResolutionState): Resolved | undefined {

        if (moduleHasNonRelativeName(moduleName)) {
            return tryLoadModuleUsingBaseUrl(extensions, moduleName, loader, failedLookupLocations, state);
        }
        else {
            return tryLoadModuleUsingRootDirs(extensions, moduleName, containingDirectory, loader, failedLookupLocations, state);
        }
    }

    function tryLoadModuleUsingRootDirs(extensions: Extensions, moduleName: string, containingDirectory: string, loader: ResolutionKindSpecificLoader,
        failedLookupLocations: Push<string>, state: ModuleResolutionState): Resolved | undefined {

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
            const resolvedFileName = loader(extensions, candidate, failedLookupLocations, !directoryProbablyExists(containingDirectory, state.host), state);
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
                const resolvedFileName = loader(extensions, candidate, failedLookupLocations, !directoryProbablyExists(baseDirectory, state.host), state);
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

    function tryLoadModuleUsingBaseUrl(extensions: Extensions, moduleName: string, loader: ResolutionKindSpecificLoader, failedLookupLocations: Push<string>, state: ModuleResolutionState): Resolved | undefined {
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
            return forEach(state.compilerOptions.paths[matchedPatternText], subst => {
                const path = matchedStar ? subst.replace("*", matchedStar) : subst;
                const candidate = normalizePath(combinePaths(state.compilerOptions.baseUrl, path));
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.Trying_substitution_0_candidate_module_location_Colon_1, subst, path);
                }
                // A path mapping may have a ".ts" extension; in contrast to an import, which should omit it.
                const tsExtension = tryGetExtensionFromPath(candidate);
                if (tsExtension !== undefined) {
                    const path = tryFile(candidate, failedLookupLocations, /*onlyRecordFailures*/ false, state);
                    return path && { path, extension: tsExtension };
                }

                return loader(extensions, candidate, failedLookupLocations, !directoryProbablyExists(getDirectoryPath(candidate), state.host), state);
            });
        }
        else {
            const candidate = normalizePath(combinePaths(state.compilerOptions.baseUrl, moduleName));

            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Resolving_module_name_0_relative_to_base_url_1_2, moduleName, state.compilerOptions.baseUrl, candidate);
            }

            return loader(extensions, candidate, failedLookupLocations, !directoryProbablyExists(getDirectoryPath(candidate), state.host), state);
        }
    }

    export function nodeModuleNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache?: ModuleResolutionCache): ResolvedModuleWithFailedLookupLocations {
        return nodeModuleNameResolverWorker(moduleName, getDirectoryPath(containingFile), compilerOptions, host, cache, /*jsOnly*/ false);
    }

    /**
     * Expose resolution logic to allow us to use Node module resolution logic from arbitrary locations.
     * No way to do this with `require()`: https://github.com/nodejs/node/issues/5963
     * Throws an error if the module can't be resolved.
     */
    /* @internal */
    export function resolveJavaScriptModule(moduleName: string, initialDir: string, host: ModuleResolutionHost): string {
        const { resolvedModule, failedLookupLocations } =
            nodeModuleNameResolverWorker(moduleName, initialDir, { moduleResolution: ts.ModuleResolutionKind.NodeJs, allowJs: true }, host, /*cache*/ undefined, /*jsOnly*/ true);
        if (!resolvedModule) {
            throw new Error(`Could not resolve JS module ${moduleName} starting at ${initialDir}. Looked in: ${failedLookupLocations.join(", ")}`);
        }
        return resolvedModule.resolvedFileName;
    }

    function nodeModuleNameResolverWorker(moduleName: string, containingDirectory: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache: ModuleResolutionCache | undefined, jsOnly: boolean): ResolvedModuleWithFailedLookupLocations {
        const traceEnabled = isTraceEnabled(compilerOptions, host);

        const failedLookupLocations: string[] = [];
        const state: ModuleResolutionState = { compilerOptions, host, traceEnabled };

        const result = jsOnly ? tryResolve(Extensions.JavaScript) : (tryResolve(Extensions.TypeScript) || tryResolve(Extensions.JavaScript));
        if (result && result.value) {
            const { resolved, isExternalLibraryImport } = result.value;
            return createResolvedModuleWithFailedLookupLocations(resolved, isExternalLibraryImport, failedLookupLocations);
        }
        return { resolvedModule: undefined, failedLookupLocations };

        function tryResolve(extensions: Extensions): SearchResult<{ resolved: Resolved, isExternalLibraryImport: boolean }> {
            const loader: ResolutionKindSpecificLoader = (extensions, candidate, failedLookupLocations, onlyRecordFailures, state) => nodeLoadModuleByRelativeName(extensions, candidate, failedLookupLocations, onlyRecordFailures, state, /*considerPackageJson*/ true);
            const resolved = tryLoadModuleUsingOptionalResolutionSettings(extensions, moduleName, containingDirectory, loader, failedLookupLocations, state);
            if (resolved) {
                return toSearchResult({ resolved, isExternalLibraryImport: false });
            }

            if (moduleHasNonRelativeName(moduleName)) {
                if (traceEnabled) {
                    trace(host, Diagnostics.Loading_module_0_from_node_modules_folder_target_file_type_1, moduleName, Extensions[extensions]);
                }
                const resolved = loadModuleFromNodeModules(extensions, moduleName, containingDirectory, failedLookupLocations, state, cache);
                // For node_modules lookups, get the real path so that multiple accesses to an `npm link`-ed module do not create duplicate files.
                return resolved && { value: resolved.value && { resolved: { path: realpath(resolved.value.path, host, traceEnabled), extension: resolved.value.extension }, isExternalLibraryImport: true } };
            }
            else {
                const candidate = normalizePath(combinePaths(containingDirectory, moduleName));
                const resolved = nodeLoadModuleByRelativeName(extensions, candidate, failedLookupLocations, /*onlyRecordFailures*/ false, state, /*considerPackageJson*/ true);
                return resolved && toSearchResult({ resolved, isExternalLibraryImport: false });
            }
        }
    }

    function realpath(path: string, host: ModuleResolutionHost, traceEnabled: boolean): string {
        if (!host.realpath) {
            return path;
        }

        const real = normalizePath(host.realpath(path));
        if (traceEnabled) {
            trace(host, Diagnostics.Resolving_real_path_for_0_result_1, path, real);
        }
        return real;
    }

    function nodeLoadModuleByRelativeName(extensions: Extensions, candidate: string, failedLookupLocations: Push<string>, onlyRecordFailures: boolean, state: ModuleResolutionState, considerPackageJson: boolean): Resolved | undefined {
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.Loading_module_as_file_Slash_folder_candidate_module_location_0_target_file_type_1, candidate, Extensions[extensions]);
        }
        if (!pathEndsWithDirectorySeparator(candidate)) {
            if (!onlyRecordFailures) {
                const parentOfCandidate = getDirectoryPath(candidate);
                if (!directoryProbablyExists(parentOfCandidate, state.host)) {
                    if (state.traceEnabled) {
                        trace(state.host, Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, parentOfCandidate);
                    }
                    onlyRecordFailures = true;
                }
            }
            const resolvedFromFile = loadModuleFromFile(extensions, candidate, failedLookupLocations, onlyRecordFailures, state);
            if (resolvedFromFile) {
                return resolvedFromFile;
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
        return loadNodeModuleFromDirectory(extensions, candidate, failedLookupLocations, onlyRecordFailures, state, considerPackageJson);
    }

    /* @internal */
    export function directoryProbablyExists(directoryName: string, host: { directoryExists?: (directoryName: string) => boolean }): boolean {
        // if host does not support 'directoryExists' assume that directory will exist
        return !host.directoryExists || host.directoryExists(directoryName);
    }

    /**
     * @param {boolean} onlyRecordFailures - if true then function won't try to actually load files but instead record all attempts as failures. This flag is necessary
     * in cases when we know upfront that all load attempts will fail (because containing folder does not exists) however we still need to record all failed lookup locations.
     */
    function loadModuleFromFile(extensions: Extensions, candidate: string, failedLookupLocations: Push<string>, onlyRecordFailures: boolean, state: ModuleResolutionState): Resolved | undefined {
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
            return tryAddingExtensions(extensionless, extensions, failedLookupLocations, onlyRecordFailures, state);
        }
    }

    /** Try to return an existing file that adds one of the `extensions` to `candidate`. */
    function tryAddingExtensions(candidate: string, extensions: Extensions, failedLookupLocations: Push<string>, onlyRecordFailures: boolean, state: ModuleResolutionState): Resolved | undefined {
        if (!onlyRecordFailures) {
            // check if containing folder exists - if it doesn't then just record failures for all supported extensions without disk probing
            const directory = getDirectoryPath(candidate);
            if (directory) {
                onlyRecordFailures = !directoryProbablyExists(directory, state.host);
            }
        }

        switch (extensions) {
            case Extensions.DtsOnly:
                return tryExtension(".d.ts", Extension.Dts);
            case Extensions.TypeScript:
                return tryExtension(".ts", Extension.Ts) || tryExtension(".tsx", Extension.Tsx) || tryExtension(".d.ts", Extension.Dts);
            case Extensions.JavaScript:
                return tryExtension(".js", Extension.Js) || tryExtension(".jsx", Extension.Jsx);
        }

        function tryExtension(ext: string, extension: Extension): Resolved | undefined {
            const path = tryFile(candidate + ext, failedLookupLocations, onlyRecordFailures, state);
            return path && { path, extension };
        }
    }

    /** Return the file if it exists. */
    function tryFile(fileName: string, failedLookupLocations: Push<string>, onlyRecordFailures: boolean, state: ModuleResolutionState): string | undefined {
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
        failedLookupLocations.push(fileName);
        return undefined;
    }

    function loadNodeModuleFromDirectory(extensions: Extensions, candidate: string, failedLookupLocations: Push<string>, onlyRecordFailures: boolean, state: ModuleResolutionState, considerPackageJson = true): Resolved | undefined {
        const directoryExists = !onlyRecordFailures && directoryProbablyExists(candidate, state.host);

        if (considerPackageJson) {
            const packageJsonPath = pathToPackageJson(candidate);
            if (directoryExists && state.host.fileExists(packageJsonPath)) {
                const fromPackageJson = loadModuleFromPackageJson(packageJsonPath, extensions, candidate, failedLookupLocations, state);
                if (fromPackageJson) {
                    return fromPackageJson;
                }
            }
            else {
                if (directoryExists && state.traceEnabled) {
                    trace(state.host, Diagnostics.File_0_does_not_exist, packageJsonPath);
                }
                // record package json as one of failed lookup locations - in the future if this file will appear it will invalidate resolution results
                failedLookupLocations.push(packageJsonPath);
            }
        }

        return loadModuleFromFile(extensions, combinePaths(candidate, "index"), failedLookupLocations, !directoryExists, state);
    }

    function loadModuleFromPackageJson(packageJsonPath: string, extensions: Extensions, candidate: string, failedLookupLocations: Push<string>, state: ModuleResolutionState): Resolved | undefined {
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.Found_package_json_at_0, packageJsonPath);
        }

        const file = tryReadPackageJsonFields(extensions !== Extensions.JavaScript, packageJsonPath, candidate, state);
        if (!file) {
            return undefined;
        }

        const onlyRecordFailures = !directoryProbablyExists(getDirectoryPath(file), state.host);
        const fromFile = tryFile(file, failedLookupLocations, onlyRecordFailures, state);
        if (fromFile) {
            const resolved = fromFile && resolvedIfExtensionMatches(extensions, fromFile);
            if (resolved) {
                return resolved;
            }
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.File_0_has_an_unsupported_extension_so_skipping_it, fromFile);
            }
        }

        // Even if extensions is DtsOnly, we can still look up a .ts file as a result of package.json "types"
        const nextExtensions = extensions === Extensions.DtsOnly ? Extensions.TypeScript : extensions;
        // Don't do package.json lookup recursively, because Node.js' package lookup doesn't.
        return nodeLoadModuleByRelativeName(nextExtensions, file, failedLookupLocations, onlyRecordFailures, state, /*considerPackageJson*/ false);
    }

    /** Resolve from an arbitrarily specified file. Return `undefined` if it has an unsupported extension. */
    function resolvedIfExtensionMatches(extensions: Extensions, path: string): Resolved | undefined {
        const extension = tryGetExtensionFromPath(path);
        return extension !== undefined && extensionIsOk(extensions, extension) ? { path, extension } : undefined;
    }

    /** True if `extension` is one of the supported `extensions`. */
    function extensionIsOk(extensions: Extensions, extension: Extension): boolean {
        switch (extensions) {
            case Extensions.JavaScript:
                return extension === Extension.Js || extension === Extension.Jsx;
            case Extensions.TypeScript:
                return extension === Extension.Ts || extension === Extension.Tsx || extension === Extension.Dts;
            case Extensions.DtsOnly:
                return extension === Extension.Dts;
        }
    }

    function pathToPackageJson(directory: string): string {
        return combinePaths(directory, "package.json");
    }

    function loadModuleFromNodeModulesFolder(extensions: Extensions, moduleName: string, nodeModulesFolder: string, nodeModulesFolderExists: boolean, failedLookupLocations: Push<string>, state: ModuleResolutionState): Resolved | undefined {
        const candidate = normalizePath(combinePaths(nodeModulesFolder, moduleName));

        return loadModuleFromFile(extensions, candidate, failedLookupLocations, !nodeModulesFolderExists, state) ||
            loadNodeModuleFromDirectory(extensions, candidate, failedLookupLocations, !nodeModulesFolderExists, state);
    }

    function loadModuleFromNodeModules(extensions: Extensions, moduleName: string, directory: string, failedLookupLocations: Push<string>, state: ModuleResolutionState, cache: NonRelativeModuleNameResolutionCache): SearchResult<Resolved> {
        return loadModuleFromNodeModulesWorker(extensions, moduleName, directory, failedLookupLocations, state, /*typesOnly*/ false, cache);
    }
    function loadModuleFromNodeModulesAtTypes(moduleName: string, directory: string, failedLookupLocations: Push<string>, state: ModuleResolutionState): SearchResult<Resolved> {
        // Extensions parameter here doesn't actually matter, because typesOnly ensures we're just doing @types lookup, which is always DtsOnly.
        return loadModuleFromNodeModulesWorker(Extensions.DtsOnly, moduleName, directory, failedLookupLocations, state, /*typesOnly*/ true, /*cache*/ undefined);
    }

    function loadModuleFromNodeModulesWorker(extensions: Extensions, moduleName: string, directory: string, failedLookupLocations: Push<string>, state: ModuleResolutionState, typesOnly: boolean, cache: NonRelativeModuleNameResolutionCache): SearchResult<Resolved> {
        const perModuleNameCache = cache && cache.getOrCreateCacheForModuleName(moduleName);
        return forEachAncestorDirectory(normalizeSlashes(directory), ancestorDirectory => {
            if (getBaseFileName(ancestorDirectory) !== "node_modules") {
                const resolutionFromCache = tryFindNonRelativeModuleNameInCache(perModuleNameCache, moduleName, ancestorDirectory, state.traceEnabled, state.host);
                if (resolutionFromCache) {
                    return resolutionFromCache;
                }
                return toSearchResult(loadModuleFromNodeModulesOneLevel(extensions, moduleName, ancestorDirectory, failedLookupLocations, state, typesOnly));
            }
        });
    }

    /** Load a module from a single node_modules directory, but not from any ancestors' node_modules directories. */
    function loadModuleFromNodeModulesOneLevel(extensions: Extensions, moduleName: string, directory: string, failedLookupLocations: Push<string>, state: ModuleResolutionState, typesOnly = false): Resolved | undefined {
        const nodeModulesFolder = combinePaths(directory, "node_modules");
        const nodeModulesFolderExists = directoryProbablyExists(nodeModulesFolder, state.host);
        if (!nodeModulesFolderExists && state.traceEnabled) {
            trace(state.host, Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, nodeModulesFolder);
        }

        const packageResult = typesOnly ? undefined : loadModuleFromNodeModulesFolder(extensions, moduleName, nodeModulesFolder, nodeModulesFolderExists, failedLookupLocations, state);
        if (packageResult) {
            return packageResult;
        }
        if (extensions !== Extensions.JavaScript) {
            const nodeModulesAtTypes = combinePaths(nodeModulesFolder, "@types");
            let nodeModulesAtTypesExists = nodeModulesFolderExists;
            if (nodeModulesFolderExists && !directoryProbablyExists(nodeModulesAtTypes, state.host)) {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, nodeModulesAtTypes);
                }
                nodeModulesAtTypesExists = false;
            }
            return loadModuleFromNodeModulesFolder(Extensions.DtsOnly, mangleScopedPackage(moduleName, state), nodeModulesAtTypes, nodeModulesAtTypesExists, failedLookupLocations, state);
        }
    }

    /** For a scoped package, we must look in `@types/foo__bar` instead of `@types/@foo/bar`. */
    function mangleScopedPackage(moduleName: string, state: ModuleResolutionState): string {
        if (startsWith(moduleName, "@")) {
            const replaceSlash = moduleName.replace(ts.directorySeparator, "__");
            if (replaceSlash !== moduleName) {
                const mangled = replaceSlash.slice(1); // Take off the "@"
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.Scoped_package_detected_looking_in_0, mangled);
                }
                return mangled;
            }
        }
        return moduleName;
    }

    function tryFindNonRelativeModuleNameInCache(cache: PerModuleNameCache | undefined, moduleName: string, containingDirectory: string, traceEnabled: boolean, host: ModuleResolutionHost): SearchResult<Resolved> {
        const result = cache && cache.get(containingDirectory);
        if (result) {
            if (traceEnabled) {
                trace(host, Diagnostics.Resolution_for_module_0_was_found_in_cache, moduleName);
            }
            return { value: result.resolvedModule && { path: result.resolvedModule.resolvedFileName, extension: result.resolvedModule.extension } };
        }
    }

    export function classicNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache?: NonRelativeModuleNameResolutionCache): ResolvedModuleWithFailedLookupLocations {
        const traceEnabled = isTraceEnabled(compilerOptions, host);
        const state: ModuleResolutionState = { compilerOptions, host, traceEnabled };
        const failedLookupLocations: string[] = [];
        const containingDirectory = getDirectoryPath(containingFile);

        const resolved = tryResolve(Extensions.TypeScript) || tryResolve(Extensions.JavaScript);
        return createResolvedModuleWithFailedLookupLocations(resolved && resolved.value, /*isExternalLibraryImport*/ false, failedLookupLocations);

        function tryResolve(extensions: Extensions): SearchResult<Resolved> {
            const resolvedUsingSettings = tryLoadModuleUsingOptionalResolutionSettings(extensions, moduleName, containingDirectory, loadModuleFromFile, failedLookupLocations, state);
            if (resolvedUsingSettings) {
                return { value: resolvedUsingSettings };
            }
            const perModuleNameCache = cache && cache.getOrCreateCacheForModuleName(moduleName);

            if (moduleHasNonRelativeName(moduleName)) {
                // Climb up parent directories looking for a module.
                const resolved = forEachAncestorDirectory(containingDirectory, directory => {
                    const resolutionFromCache = tryFindNonRelativeModuleNameInCache(perModuleNameCache, moduleName, directory, traceEnabled, host);
                    if (resolutionFromCache) {
                        return resolutionFromCache;
                    }
                    const searchName = normalizePath(combinePaths(directory, moduleName));
                    return toSearchResult(loadModuleFromFile(extensions, searchName, failedLookupLocations, /*onlyRecordFailures*/ false, state));
                });
                if (resolved) {
                    return resolved;
                }
                if (extensions === Extensions.TypeScript) {
                    // If we didn't find the file normally, look it up in @types.
                    return loadModuleFromNodeModulesAtTypes(moduleName, containingDirectory, failedLookupLocations, state);
                }
            }
            else {
                const candidate = normalizePath(combinePaths(containingDirectory, moduleName));
                return toSearchResult(loadModuleFromFile(extensions, candidate, failedLookupLocations, /*onlyRecordFailures*/ false, state));
            }
        }
    }

    /**
     * LSHost may load a module from a global cache of typings.
     * This is the minumum code needed to expose that functionality; the rest is in LSHost.
     */
    /* @internal */
    export function loadModuleFromGlobalCache(moduleName: string, projectName: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, globalCache: string): ResolvedModuleWithFailedLookupLocations {
        const traceEnabled = isTraceEnabled(compilerOptions, host);
        if (traceEnabled) {
            trace(host, Diagnostics.Auto_discovery_for_typings_is_enabled_in_project_0_Running_extra_resolution_pass_for_module_1_using_cache_location_2, projectName, moduleName, globalCache);
        }
        const state: ModuleResolutionState = { compilerOptions, host, traceEnabled };
        const failedLookupLocations: string[] = [];
        const resolved = loadModuleFromNodeModulesOneLevel(Extensions.DtsOnly, moduleName, globalCache, failedLookupLocations, state);
        return createResolvedModuleWithFailedLookupLocations(resolved, /*isExternalLibraryImport*/ true, failedLookupLocations);
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

    /** Calls `callback` on `directory` and every ancestor directory it has, returning the first defined result. */
    function forEachAncestorDirectory<T>(directory: string, callback: (directory: string) => SearchResult<T>): SearchResult<T> {
        while (true) {
            const result = callback(directory);
            if (result !== undefined) {
                return result;
            }

            const parentPath = getDirectoryPath(directory);
            if (parentPath === directory) {
                return undefined;
            }

            directory = parentPath;
        }
    }
}
