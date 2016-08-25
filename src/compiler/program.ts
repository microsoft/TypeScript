/// <reference path="sys.ts" />
/// <reference path="emitter.ts" />
/// <reference path="core.ts" />

namespace ts {
    /** The version of the TypeScript compiler release */
    export const version = "2.1.0";

    const emptyArray: any[] = [];

    const defaultTypeRoots = ["node_modules/@types"];

    export function findConfigFile(searchPath: string, fileExists: (fileName: string) => boolean): string {
        while (true) {
            const fileName = combinePaths(searchPath, "tsconfig.json");
            if (fileExists(fileName)) {
                return fileName;
            }
            const parentPath = getDirectoryPath(searchPath);
            if (parentPath === searchPath) {
                break;
            }
            searchPath = parentPath;
        }
        return undefined;
    }

    export function resolveTripleslashReference(moduleName: string, containingFile: string): string {
        const basePath = getDirectoryPath(containingFile);
        const referencedFileName = isRootedDiskPath(moduleName) ? moduleName : combinePaths(basePath, moduleName);
        return normalizePath(referencedFileName);
    }

    /* @internal */
    export function computeCommonSourceDirectoryOfFilenames(fileNames: string[], currentDirectory: string, getCanonicalFileName: (fileName: string) => string): string {
        let commonPathComponents: string[];
        const failed = forEach(fileNames, sourceFile => {
            // Each file contributes into common source file path
            const sourcePathComponents = getNormalizedPathComponents(sourceFile, currentDirectory);
            sourcePathComponents.pop(); // The base file name is not part of the common directory path

            if (!commonPathComponents) {
                // first file
                commonPathComponents = sourcePathComponents;
                return;
            }

            for (let i = 0, n = Math.min(commonPathComponents.length, sourcePathComponents.length); i < n; i++) {
                if (getCanonicalFileName(commonPathComponents[i]) !== getCanonicalFileName(sourcePathComponents[i])) {
                    if (i === 0) {
                        // Failed to find any common path component
                        return true;
                    }

                    // New common path found that is 0 -> i-1
                    commonPathComponents.length = i;
                    break;
                }
            }

            // If the sourcePathComponents was shorter than the commonPathComponents, truncate to the sourcePathComponents
            if (sourcePathComponents.length < commonPathComponents.length) {
                commonPathComponents.length = sourcePathComponents.length;
            }
        });

        // A common path can not be found when paths span multiple drives on windows, for example
        if (failed) {
            return "";
        }

        if (!commonPathComponents) { // Can happen when all input files are .d.ts files
            return currentDirectory;
        }

        return getNormalizedPathFromPathComponents(commonPathComponents);
    }

    function trace(host: ModuleResolutionHost, message: DiagnosticMessage, ...args: any[]): void;
    function trace(host: ModuleResolutionHost, message: DiagnosticMessage): void {
        host.trace(formatMessage.apply(undefined, arguments));
    }

    function isTraceEnabled(compilerOptions: CompilerOptions, host: ModuleResolutionHost): boolean {
        return compilerOptions.traceResolution && host.trace !== undefined;
    }

    /* @internal */
    export function hasZeroOrOneAsteriskCharacter(str: string): boolean {
        let seenAsterisk = false;
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) === CharacterCodes.asterisk) {
                if (!seenAsterisk) {
                    seenAsterisk = true;
                }
                else {
                    // have already seen asterisk
                    return false;
                }
            }
        }
        return true;
    }

    function createResolvedModule(resolvedFileName: string, isExternalLibraryImport: boolean, failedLookupLocations: string[]): ResolvedModuleWithFailedLookupLocations {
        return { resolvedModule: resolvedFileName ? { resolvedFileName, isExternalLibraryImport } : undefined, failedLookupLocations };
    }

    function moduleHasNonRelativeName(moduleName: string): boolean {
        return !(isRootedDiskPath(moduleName) || isExternalModuleNameRelative(moduleName));
    }

    interface ModuleResolutionState {
        host: ModuleResolutionHost;
        compilerOptions: CompilerOptions;
        traceEnabled: boolean;
        // skip .tsx files if jsx is not enabled
        skipTsx: boolean;
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
        if (state.compilerOptions.allowJs && jsonContent.main && typeof jsonContent.main === "string") {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.No_types_specified_in_package_json_but_allowJs_is_set_so_returning_main_value_of_0, jsonContent.main);
            }
            const mainFilePath = normalizePath(combinePaths(baseDirectory, jsonContent.main));
            return mainFilePath;
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

    const typeReferenceExtensions = [".d.ts"];

    function getEffectiveTypeRoots(options: CompilerOptions, host: ModuleResolutionHost) {
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

        if (!currentDirectory) {
            return undefined;
        }
        return map(defaultTypeRoots, d => combinePaths(currentDirectory, d));
    }

    /**
     * @param {string | undefined} containingFile - file that contains type reference directive, can be undefined if containing file is unknown.
     * This is possible in case if resolution is performed for directives specified via 'types' parameter. In this case initial path for secondary lookups
     * is assumed to be the same as root directory of the project.
     */
    export function resolveTypeReferenceDirective(typeReferenceDirectiveName: string, containingFile: string, options: CompilerOptions, host: ModuleResolutionHost): ResolvedTypeReferenceDirectiveWithFailedLookupLocations {
        const traceEnabled = isTraceEnabled(options, host);
        const moduleResolutionState: ModuleResolutionState = {
            compilerOptions: options,
            host: host,
            skipTsx: true,
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
            const primarySearchPaths = typeRoots;
            for (const typeRoot of primarySearchPaths) {
                const candidate = combinePaths(typeRoot, typeReferenceDirectiveName);
                const candidateDirectory = getDirectoryPath(candidate);
                const resolvedFile = loadNodeModuleFromDirectory(typeReferenceExtensions, candidate, failedLookupLocations,
                    !directoryProbablyExists(candidateDirectory, host), moduleResolutionState);

                if (resolvedFile) {
                    if (traceEnabled) {
                        trace(host, Diagnostics.Type_reference_directive_0_was_successfully_resolved_to_1_primary_Colon_2, typeReferenceDirectiveName, resolvedFile, true);
                    }
                    return {
                        resolvedTypeReferenceDirective: { primary: true, resolvedFileName: resolvedFile },
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
        let initialLocationForSecondaryLookup: string;
        if (containingFile) {
            initialLocationForSecondaryLookup = getDirectoryPath(containingFile);
        }

        if (initialLocationForSecondaryLookup !== undefined) {
            // check secondary locations
            if (traceEnabled) {
                trace(host, Diagnostics.Looking_up_in_node_modules_folder_initial_location_0, initialLocationForSecondaryLookup);
            }
            resolvedFile = loadModuleFromNodeModules(typeReferenceDirectiveName, initialLocationForSecondaryLookup, failedLookupLocations, moduleResolutionState);
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
            resolvedTypeReferenceDirective: resolvedFile
                ? { primary: false, resolvedFileName: resolvedFile }
                : undefined,
            failedLookupLocations
        };
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
    type ResolutionKindSpecificLoader = (candidate: string, extensions: string[], failedLookupLocations: string[], onlyRecordFailures: boolean, state: ModuleResolutionState) => string;

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
        failedLookupLocations: string[], supportedExtensions: string[], state: ModuleResolutionState): string {

        if (moduleHasNonRelativeName(moduleName)) {
            return tryLoadModuleUsingBaseUrl(moduleName, loader, failedLookupLocations, supportedExtensions, state);
        }
        else {
            return tryLoadModuleUsingRootDirs(moduleName, containingDirectory, loader, failedLookupLocations, supportedExtensions, state);
        }
    }

    function tryLoadModuleUsingRootDirs(moduleName: string, containingDirectory: string, loader: ResolutionKindSpecificLoader,
        failedLookupLocations: string[], supportedExtensions: string[], state: ModuleResolutionState): string {

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
            const resolvedFileName = loader(candidate, supportedExtensions, failedLookupLocations, !directoryProbablyExists(containingDirectory, state.host), state);
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
                const resolvedFileName = loader(candidate, supportedExtensions, failedLookupLocations, !directoryProbablyExists(baseDirectory, state.host), state);
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

    function tryLoadModuleUsingBaseUrl(moduleName: string, loader: ResolutionKindSpecificLoader, failedLookupLocations: string[],
        supportedExtensions: string[], state: ModuleResolutionState): string {

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
                const resolvedFileName = loader(candidate, supportedExtensions, failedLookupLocations, !directoryProbablyExists(getDirectoryPath(candidate), state.host), state);
                if (resolvedFileName) {
                    return resolvedFileName;
                }
            }
            return undefined;
        }
        else {
            const candidate = normalizePath(combinePaths(state.compilerOptions.baseUrl, moduleName));

            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Resolving_module_name_0_relative_to_base_url_1_2, moduleName, state.compilerOptions.baseUrl, candidate);
            }

            return loader(candidate, supportedExtensions, failedLookupLocations, !directoryProbablyExists(getDirectoryPath(candidate), state.host), state);
        }
    }

    /**
     * patternStrings contains both pattern strings (containing "*") and regular strings.
     * Return an exact match if possible, or a pattern match, or undefined.
     * (These are verified by verifyCompilerOptions to have 0 or 1 "*" characters.)
     */
    function matchPatternOrExact(patternStrings: string[], candidate: string): string | Pattern | undefined {
        const patterns: Pattern[] = [];
        for (const patternString of patternStrings) {
            const pattern = tryParsePattern(patternString);
            if (pattern) {
                patterns.push(pattern);
            }
            else if (patternString === candidate) {
                // pattern was matched as is - no need to search further
                return patternString;
            }
        }

        return findBestPatternMatch(patterns, _ => _, candidate);
    }

    function patternText({prefix, suffix}: Pattern): string {
        return `${prefix}*${suffix}`;
    }

    /**
     * Given that candidate matches pattern, returns the text matching the '*'.
     * E.g.: matchedText(tryParsePattern("foo*baz"), "foobarbaz") === "bar"
     */
    function matchedText(pattern: Pattern, candidate: string): string {
        Debug.assert(isPatternMatch(pattern, candidate));
        return candidate.substr(pattern.prefix.length, candidate.length - pattern.suffix.length);
    }

    /** Return the object corresponding to the best pattern to match `candidate`. */
    /* @internal */
    export function findBestPatternMatch<T>(values: T[], getPattern: (value: T) => Pattern, candidate: string): T | undefined {
        let matchedValue: T | undefined = undefined;
        // use length of prefix as betterness criteria
        let longestMatchPrefixLength = -1;

        for (const v of values) {
            const pattern = getPattern(v);
            if (isPatternMatch(pattern, candidate) && pattern.prefix.length > longestMatchPrefixLength) {
                longestMatchPrefixLength = pattern.prefix.length;
                matchedValue = v;
            }
        }

        return matchedValue;
    }

    function isPatternMatch({prefix, suffix}: Pattern, candidate: string) {
        return candidate.length >= prefix.length + suffix.length &&
               startsWith(candidate, prefix) &&
               endsWith(candidate, suffix);
    }

    /* @internal */
    export function tryParsePattern(pattern: string): Pattern | undefined {
        // This should be verified outside of here and a proper error thrown.
        Debug.assert(hasZeroOrOneAsteriskCharacter(pattern));
        const indexOfStar = pattern.indexOf("*");
        return indexOfStar === -1 ? undefined : {
            prefix: pattern.substr(0, indexOfStar),
            suffix: pattern.substr(indexOfStar + 1)
        };
    }

    export function nodeModuleNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost): ResolvedModuleWithFailedLookupLocations {
        const containingDirectory = getDirectoryPath(containingFile);
        const supportedExtensions = getSupportedExtensions(compilerOptions);
        const traceEnabled = isTraceEnabled(compilerOptions, host);

        const failedLookupLocations: string[] = [];
        const state = { compilerOptions, host, traceEnabled, skipTsx: false };
        let resolvedFileName = tryLoadModuleUsingOptionalResolutionSettings(moduleName, containingDirectory, nodeLoadModuleByRelativeName,
            failedLookupLocations, supportedExtensions, state);

        let isExternalLibraryImport = false;
        if (!resolvedFileName) {
            if (moduleHasNonRelativeName(moduleName)) {
                if (traceEnabled) {
                    trace(host, Diagnostics.Loading_module_0_from_node_modules_folder, moduleName);
                }
                resolvedFileName = loadModuleFromNodeModules(moduleName, containingDirectory, failedLookupLocations, state);
                isExternalLibraryImport = resolvedFileName !== undefined;
            }
            else {
                const candidate = normalizePath(combinePaths(containingDirectory, moduleName));
                resolvedFileName = nodeLoadModuleByRelativeName(candidate, supportedExtensions, failedLookupLocations, /*onlyRecordFailures*/ false, state);
            }
        }

        if (resolvedFileName && host.realpath) {
            const originalFileName = resolvedFileName;
            resolvedFileName = normalizePath(host.realpath(resolvedFileName));
            if (traceEnabled) {
                trace(host, Diagnostics.Resolving_real_path_for_0_result_1, originalFileName, resolvedFileName);
            }
        }

        return createResolvedModule(resolvedFileName, isExternalLibraryImport, failedLookupLocations);
    }

    function nodeLoadModuleByRelativeName(candidate: string, supportedExtensions: string[], failedLookupLocations: string[],
        onlyRecordFailures: boolean, state: ModuleResolutionState): string {

        if (state.traceEnabled) {
            trace(state.host, Diagnostics.Loading_module_as_file_Slash_folder_candidate_module_location_0, candidate);
        }

        const resolvedFileName = loadModuleFromFile(candidate, supportedExtensions, failedLookupLocations, onlyRecordFailures, state);

        return resolvedFileName || loadNodeModuleFromDirectory(supportedExtensions, candidate, failedLookupLocations, onlyRecordFailures, state);
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
    function loadModuleFromFile(candidate: string, extensions: string[], failedLookupLocation: string[], onlyRecordFailures: boolean, state: ModuleResolutionState): string | undefined {
        // First, try adding an extension. An import of "foo" could be matched by a file "foo.ts", or "foo.js" by "foo.js.ts"
        const resolvedByAddingExtension = tryAddingExtensions(candidate, extensions, failedLookupLocation, onlyRecordFailures, state);
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
            return tryAddingExtensions(extensionless, extensions, failedLookupLocation, onlyRecordFailures, state);
        }
    }

    /** Try to return an existing file that adds one of the `extensions` to `candidate`. */
    function tryAddingExtensions(candidate: string, extensions: string[], failedLookupLocation: string[], onlyRecordFailures: boolean, state: ModuleResolutionState): string | undefined {
        if (!onlyRecordFailures) {
            // check if containing folder exists - if it doesn't then just record failures for all supported extensions without disk probing
            const directory = getDirectoryPath(candidate);
            if (directory) {
                onlyRecordFailures = !directoryProbablyExists(directory, state.host);
            }
        }
        return forEach(extensions, ext =>
            !(state.skipTsx && isJsxOrTsxExtension(ext)) && tryFile(candidate + ext, failedLookupLocation, onlyRecordFailures, state));
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

    function loadNodeModuleFromDirectory(extensions: string[], candidate: string, failedLookupLocation: string[], onlyRecordFailures: boolean, state: ModuleResolutionState): string {
        const packageJsonPath = pathToPackageJson(candidate);
        const directoryExists = !onlyRecordFailures && directoryProbablyExists(candidate, state.host);
        if (directoryExists && state.host.fileExists(packageJsonPath)) {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Found_package_json_at_0, packageJsonPath);
            }
            const typesFile = tryReadTypesSection(packageJsonPath, candidate, state);
            if (typesFile) {
                const onlyRecordFailures = !directoryProbablyExists(getDirectoryPath(typesFile), state.host);
                // A package.json "typings" may specify an exact filename, or may choose to omit an extension.
                const result = tryFile(typesFile, failedLookupLocation, onlyRecordFailures, state) ||
                    tryAddingExtensions(typesFile, extensions, failedLookupLocation, onlyRecordFailures, state);
                if (result) {
                    return result;
                }
            }
            else {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.package_json_does_not_have_types_field);
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

        return loadModuleFromFile(combinePaths(candidate, "index"), extensions, failedLookupLocation, !directoryExists, state);
    }

    function pathToPackageJson(directory: string): string {
        return combinePaths(directory, "package.json");
    }

    function loadModuleFromNodeModulesFolder(moduleName: string, directory: string, failedLookupLocations: string[], state: ModuleResolutionState): string {
        const nodeModulesFolder = combinePaths(directory, "node_modules");
        const nodeModulesFolderExists = directoryProbablyExists(nodeModulesFolder, state.host);
        const candidate = normalizePath(combinePaths(nodeModulesFolder, moduleName));
        const supportedExtensions = getSupportedExtensions(state.compilerOptions);

        let result = loadModuleFromFile(candidate, supportedExtensions, failedLookupLocations, !nodeModulesFolderExists, state);
        if (result) {
            return result;
        }
        result = loadNodeModuleFromDirectory(supportedExtensions, candidate, failedLookupLocations, !nodeModulesFolderExists, state);
        if (result) {
            return result;
        }
    }

    function loadModuleFromNodeModules(moduleName: string, directory: string, failedLookupLocations: string[], state: ModuleResolutionState): string {
        directory = normalizeSlashes(directory);
        while (true) {
            const baseName = getBaseFileName(directory);
            if (baseName !== "node_modules") {
                // Try to load source from the package
                const packageResult = loadModuleFromNodeModulesFolder(moduleName, directory, failedLookupLocations, state);
                if (packageResult && hasTypeScriptFileExtension(packageResult)) {
                    // Always prefer a TypeScript (.ts, .tsx, .d.ts) file shipped with the package
                    return packageResult;
                }
                else {
                    // Else prefer a types package over non-TypeScript results (e.g. JavaScript files)
                    const typesResult = loadModuleFromNodeModulesFolder(combinePaths("@types", moduleName), directory, failedLookupLocations, state);
                    if (typesResult || packageResult) {
                        return typesResult || packageResult;
                    }
                }
            }

            const parentPath = getDirectoryPath(directory);
            if (parentPath === directory) {
                break;
            }

            directory = parentPath;
        }
        return undefined;
    }

    export function classicNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost): ResolvedModuleWithFailedLookupLocations {
        const traceEnabled = isTraceEnabled(compilerOptions, host);
        const state = { compilerOptions, host, traceEnabled, skipTsx: !compilerOptions.jsx };
        const failedLookupLocations: string[] = [];
        const supportedExtensions = getSupportedExtensions(compilerOptions);
        let containingDirectory = getDirectoryPath(containingFile);

        const resolvedFileName = tryLoadModuleUsingOptionalResolutionSettings(moduleName, containingDirectory, loadModuleFromFile, failedLookupLocations, supportedExtensions, state);
        if (resolvedFileName) {
            return createResolvedModule(resolvedFileName, /*isExternalLibraryImport*/false, failedLookupLocations);
        }

        let referencedSourceFile: string;
        if (moduleHasNonRelativeName(moduleName)) {
            while (true) {
                const searchName = normalizePath(combinePaths(containingDirectory, moduleName));
                referencedSourceFile = loadModuleFromFile(searchName, supportedExtensions, failedLookupLocations, /*onlyRecordFailures*/ false, state);
                if (referencedSourceFile) {
                    break;
                }
                const parentPath = getDirectoryPath(containingDirectory);
                if (parentPath === containingDirectory) {
                    break;
                }
                containingDirectory = parentPath;
            }
        }
        else {
            const candidate = normalizePath(combinePaths(containingDirectory, moduleName));
            referencedSourceFile = loadModuleFromFile(candidate, supportedExtensions, failedLookupLocations, /*onlyRecordFailures*/ false, state);
        }


        return referencedSourceFile
            ? { resolvedModule: { resolvedFileName: referencedSourceFile }, failedLookupLocations }
            : { resolvedModule: undefined, failedLookupLocations };
    }

    interface OutputFingerprint {
        hash: string;
        byteOrderMark: boolean;
        mtime: Date;
    }

    export function createCompilerHost(options: CompilerOptions, setParentNodes?: boolean): CompilerHost {
        const existingDirectories = createMap<boolean>();

        function getCanonicalFileName(fileName: string): string {
            // if underlying system can distinguish between two files whose names differs only in cases then file name already in canonical form.
            // otherwise use toLowerCase as a canonical form.
            return sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
        }

        // returned by CScript sys environment
        const unsupportedFileEncodingErrorCode = -2147024809;

        function getSourceFile(fileName: string, languageVersion: ScriptTarget, onError?: (message: string) => void): SourceFile {
            let text: string;
            try {
                performance.mark("beforeIORead");
                text = sys.readFile(fileName, options.charset);
                performance.mark("afterIORead");
                performance.measure("I/O Read", "beforeIORead", "afterIORead");
            }
            catch (e) {
                if (onError) {
                    onError(e.number === unsupportedFileEncodingErrorCode
                        ? createCompilerDiagnostic(Diagnostics.Unsupported_file_encoding).messageText
                        : e.message);
                }
                text = "";
            }

            return text !== undefined ? createSourceFile(fileName, text, languageVersion, setParentNodes) : undefined;
        }

        function directoryExists(directoryPath: string): boolean {
            if (directoryPath in existingDirectories) {
                return true;
            }
            if (sys.directoryExists(directoryPath)) {
                existingDirectories[directoryPath] = true;
                return true;
            }
            return false;
        }

        function ensureDirectoriesExist(directoryPath: string) {
            if (directoryPath.length > getRootLength(directoryPath) && !directoryExists(directoryPath)) {
                const parentDirectory = getDirectoryPath(directoryPath);
                ensureDirectoriesExist(parentDirectory);
                sys.createDirectory(directoryPath);
            }
        }

        let outputFingerprints: Map<OutputFingerprint>;

        function writeFileIfUpdated(fileName: string, data: string, writeByteOrderMark: boolean): void {
            if (!outputFingerprints) {
                outputFingerprints = createMap<OutputFingerprint>();
            }

            const hash = sys.createHash(data);
            const mtimeBefore = sys.getModifiedTime(fileName);

            if (mtimeBefore && fileName in outputFingerprints) {
                const fingerprint = outputFingerprints[fileName];

                // If output has not been changed, and the file has no external modification
                if (fingerprint.byteOrderMark === writeByteOrderMark &&
                    fingerprint.hash === hash &&
                    fingerprint.mtime.getTime() === mtimeBefore.getTime()) {
                    return;
                }
            }

            sys.writeFile(fileName, data, writeByteOrderMark);

            const mtimeAfter = sys.getModifiedTime(fileName);

            outputFingerprints[fileName] = {
                hash,
                byteOrderMark: writeByteOrderMark,
                mtime: mtimeAfter
            };
        }

        function writeFile(fileName: string, data: string, writeByteOrderMark: boolean, onError?: (message: string) => void) {
            try {
                performance.mark("beforeIOWrite");
                ensureDirectoriesExist(getDirectoryPath(normalizePath(fileName)));

                if (isWatchSet(options) && sys.createHash && sys.getModifiedTime) {
                    writeFileIfUpdated(fileName, data, writeByteOrderMark);
                }
                else {
                    sys.writeFile(fileName, data, writeByteOrderMark);
                }

                performance.mark("afterIOWrite");
                performance.measure("I/O Write", "beforeIOWrite", "afterIOWrite");
            }
            catch (e) {
                if (onError) {
                    onError(e.message);
                }
            }
        }

        function getDefaultLibLocation(): string {
            return getDirectoryPath(normalizePath(sys.getExecutingFilePath()));
        }

        const newLine = getNewLineCharacter(options);
        const realpath = sys.realpath && ((path: string) => sys.realpath(path));

        return {
            getSourceFile,
            getDefaultLibLocation,
            getDefaultLibFileName: options => combinePaths(getDefaultLibLocation(), getDefaultLibFileName(options)),
            writeFile,
            getCurrentDirectory: memoize(() => sys.getCurrentDirectory()),
            useCaseSensitiveFileNames: () => sys.useCaseSensitiveFileNames,
            getCanonicalFileName,
            getNewLine: () => newLine,
            fileExists: fileName => sys.fileExists(fileName),
            readFile: fileName => sys.readFile(fileName),
            trace: (s: string) => sys.write(s + newLine),
            directoryExists: directoryName => sys.directoryExists(directoryName),
            getDirectories: (path: string) => sys.getDirectories(path),
            realpath
        };
    }

    export function getPreEmitDiagnostics(program: Program, sourceFile?: SourceFile, cancellationToken?: CancellationToken): Diagnostic[] {
        let diagnostics = program.getOptionsDiagnostics(cancellationToken).concat(
            program.getSyntacticDiagnostics(sourceFile, cancellationToken),
            program.getGlobalDiagnostics(cancellationToken),
            program.getSemanticDiagnostics(sourceFile, cancellationToken));

        if (program.getCompilerOptions().declaration) {
            diagnostics = diagnostics.concat(program.getDeclarationDiagnostics(sourceFile, cancellationToken));
        }

        return sortAndDeduplicateDiagnostics(diagnostics);
    }

    export interface FormatDiagnosticsHost {
        getCurrentDirectory(): string;
        getCanonicalFileName(fileName: string): string;
        getNewLine(): string;
    }

    export function formatDiagnostics(diagnostics: Diagnostic[], host: FormatDiagnosticsHost): string {
        let output = "";

        for (const diagnostic of diagnostics) {
            if (diagnostic.file) {
                const { line, character } = getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
                const fileName = diagnostic.file.fileName;
                const relativeFileName = convertToRelativePath(fileName, host.getCurrentDirectory(), fileName => host.getCanonicalFileName(fileName));
                output += `${ relativeFileName }(${ line + 1 },${ character + 1 }): `;
            }

            const category = DiagnosticCategory[diagnostic.category].toLowerCase();
            output += `${ category } TS${ diagnostic.code }: ${ flattenDiagnosticMessageText(diagnostic.messageText, host.getNewLine()) }${ host.getNewLine() }`;
        }
        return output;
    }

    export function flattenDiagnosticMessageText(messageText: string | DiagnosticMessageChain, newLine: string): string {
        if (typeof messageText === "string") {
            return messageText;
        }
        else {
            let diagnosticChain = messageText;
            let result = "";

            let indent = 0;
            while (diagnosticChain) {
                if (indent) {
                    result += newLine;

                    for (let i = 0; i < indent; i++) {
                        result += "  ";
                    }
                }
                result += diagnosticChain.messageText;
                indent++;
                diagnosticChain = diagnosticChain.next;
            }

            return result;
        }
    }

    function loadWithLocalCache<T>(names: string[], containingFile: string, loader: (name: string, containingFile: string) => T): T[] {
        if (names.length === 0) {
            return [];
        }
        const resolutions: T[] = [];
        const cache = createMap<T>();
        for (const name of names) {
            const result = name in cache
                ? cache[name]
                : cache[name] = loader(name, containingFile);
            resolutions.push(result);
        }
        return resolutions;
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

    export function createProgram(rootNames: string[], options: CompilerOptions, host?: CompilerHost, oldProgram?: Program): Program {
        let program: Program;
        let files: SourceFile[] = [];
        let commonSourceDirectory: string;
        let diagnosticsProducingTypeChecker: TypeChecker;
        let noDiagnosticsTypeChecker: TypeChecker;
        let classifiableNames: Map<string>;

        let resolvedTypeReferenceDirectives = createMap<ResolvedTypeReferenceDirective>();
        let fileProcessingDiagnostics = createDiagnosticCollection();

        // The below settings are to track if a .js file should be add to the program if loaded via searching under node_modules.
        // This works as imported modules are discovered recursively in a depth first manner, specifically:
        // - For each root file, findSourceFile is called.
        // - This calls processImportedModules for each module imported in the source file.
        // - This calls resolveModuleNames, and then calls findSourceFile for each resolved module.
        // As all these operations happen - and are nested - within the createProgram call, they close over the below variables.
        // The current resolution depth is tracked by incrementing/decrementing as the depth first search progresses.
        const maxNodeModulesJsDepth = typeof options.maxNodeModuleJsDepth === "number" ? options.maxNodeModuleJsDepth : 0;
        let currentNodeModulesDepth = 0;

        // If a module has some of its imports skipped due to being at the depth limit under node_modules, then track
        // this, as it may be imported at a shallower depth later, and then it will need its skipped imports processed.
        const modulesWithElidedImports = createMap<boolean>();

        // Track source files that are source files found by searching under node_modules, as these shouldn't be compiled.
        const sourceFilesFoundSearchingNodeModules = createMap<boolean>();

        performance.mark("beforeProgram");

        host = host || createCompilerHost(options);

        let skipDefaultLib = options.noLib;
        const programDiagnostics = createDiagnosticCollection();
        const currentDirectory = host.getCurrentDirectory();
        const supportedExtensions = getSupportedExtensions(options);

        // Map storing if there is emit blocking diagnostics for given input
        const hasEmitBlockingDiagnostics = createFileMap<boolean>(getCanonicalFileName);

        let resolveModuleNamesWorker: (moduleNames: string[], containingFile: string) => ResolvedModule[];
        if (host.resolveModuleNames) {
            resolveModuleNamesWorker = (moduleNames, containingFile) => host.resolveModuleNames(moduleNames, containingFile);
        }
        else {
            const loader = (moduleName: string, containingFile: string) => resolveModuleName(moduleName, containingFile, options, host).resolvedModule;
            resolveModuleNamesWorker = (moduleNames, containingFile) => loadWithLocalCache(moduleNames, containingFile, loader);
        }

        let resolveTypeReferenceDirectiveNamesWorker: (typeDirectiveNames: string[], containingFile: string) => ResolvedTypeReferenceDirective[];
        if (host.resolveTypeReferenceDirectives) {
            resolveTypeReferenceDirectiveNamesWorker = (typeDirectiveNames, containingFile) => host.resolveTypeReferenceDirectives(typeDirectiveNames, containingFile);
        }
        else {
            const loader = (typesRef: string, containingFile: string) => resolveTypeReferenceDirective(typesRef, containingFile, options, host).resolvedTypeReferenceDirective;
            resolveTypeReferenceDirectiveNamesWorker = (typeReferenceDirectiveNames, containingFile) => loadWithLocalCache(typeReferenceDirectiveNames, containingFile, loader);
        }

        const filesByName = createFileMap<SourceFile>();
        // stores 'filename -> file association' ignoring case
        // used to track cases when two file names differ only in casing
        const filesByNameIgnoreCase = host.useCaseSensitiveFileNames() ? createFileMap<SourceFile>(fileName => fileName.toLowerCase()) : undefined;

        if (!tryReuseStructureFromOldProgram()) {
            forEach(rootNames, name => processRootFile(name, /*isDefaultLib*/ false));

            // load type declarations specified via 'types' argument or implicitly from types/ and node_modules/@types folders
            const typeReferences: string[] = getAutomaticTypeDirectiveNames(options, host);

            if (typeReferences) {
                // This containingFilename needs to match with the one used in managed-side
                const containingFilename = combinePaths(host.getCurrentDirectory(), "__inferred type names__.ts");
                const resolutions = resolveTypeReferenceDirectiveNamesWorker(typeReferences, containingFilename);
                for (let i = 0; i < typeReferences.length; i++) {
                    processTypeReferenceDirective(typeReferences[i], resolutions[i]);
                }
            }

            // Do not process the default library if:
            //  - The '--noLib' flag is used.
            //  - A 'no-default-lib' reference comment is encountered in
            //      processing the root files.
            if (!skipDefaultLib) {
                // If '--lib' is not specified, include default library file according to '--target'
                // otherwise, using options specified in '--lib' instead of '--target' default library file
                if (!options.lib) {
                    processRootFile(host.getDefaultLibFileName(options), /*isDefaultLib*/ true);
                }
                else {
                    const libDirectory = host.getDefaultLibLocation ? host.getDefaultLibLocation() : getDirectoryPath(host.getDefaultLibFileName(options));
                    forEach(options.lib, libFileName => {
                        processRootFile(combinePaths(libDirectory, libFileName), /*isDefaultLib*/ true);
                    });
                }
            }
        }

        // unconditionally set oldProgram to undefined to prevent it from being captured in closure
        oldProgram = undefined;

        program = {
            getRootFileNames: () => rootNames,
            getSourceFile,
            getSourceFileByPath,
            getSourceFiles: () => files,
            getCompilerOptions: () => options,
            getSyntacticDiagnostics,
            getOptionsDiagnostics,
            getGlobalDiagnostics,
            getSemanticDiagnostics,
            getDeclarationDiagnostics,
            getTypeChecker,
            getClassifiableNames,
            getDiagnosticsProducingTypeChecker,
            getCommonSourceDirectory,
            emit,
            getCurrentDirectory: () => currentDirectory,
            getNodeCount: () => getDiagnosticsProducingTypeChecker().getNodeCount(),
            getIdentifierCount: () => getDiagnosticsProducingTypeChecker().getIdentifierCount(),
            getSymbolCount: () => getDiagnosticsProducingTypeChecker().getSymbolCount(),
            getTypeCount: () => getDiagnosticsProducingTypeChecker().getTypeCount(),
            getFileProcessingDiagnostics: () => fileProcessingDiagnostics,
            getResolvedTypeReferenceDirectives: () => resolvedTypeReferenceDirectives
        };

        verifyCompilerOptions();
        performance.mark("afterProgram");
        performance.measure("Program", "beforeProgram", "afterProgram");

        return program;

        function getCommonSourceDirectory() {
            if (typeof commonSourceDirectory === "undefined") {
                if (options.rootDir && checkSourceFilesBelongToPath(files, options.rootDir)) {
                    // If a rootDir is specified and is valid use it as the commonSourceDirectory
                    commonSourceDirectory = getNormalizedAbsolutePath(options.rootDir, currentDirectory);
                }
                else {
                    commonSourceDirectory = computeCommonSourceDirectory(files);
                }
                if (commonSourceDirectory && commonSourceDirectory[commonSourceDirectory.length - 1] !== directorySeparator) {
                    // Make sure directory path ends with directory separator so this string can directly
                    // used to replace with "" to get the relative path of the source file and the relative path doesn't
                    // start with / making it rooted path
                    commonSourceDirectory += directorySeparator;
                }
            }
            return commonSourceDirectory;
        }

        function getClassifiableNames() {
            if (!classifiableNames) {
                // Initialize a checker so that all our files are bound.
                getTypeChecker();
                classifiableNames = createMap<string>();

                for (const sourceFile of files) {
                    copyProperties(sourceFile.classifiableNames, classifiableNames);
                }
            }

            return classifiableNames;
        }

        function tryReuseStructureFromOldProgram(): boolean {
            if (!oldProgram) {
                return false;
            }

            // check properties that can affect structure of the program or module resolution strategy
            // if any of these properties has changed - structure cannot be reused
            const oldOptions = oldProgram.getCompilerOptions();
            if ((oldOptions.module !== options.module) ||
                (oldOptions.moduleResolution !== options.moduleResolution) ||
                (oldOptions.noResolve !== options.noResolve) ||
                (oldOptions.target !== options.target) ||
                (oldOptions.noLib !== options.noLib) ||
                (oldOptions.jsx !== options.jsx) ||
                (oldOptions.allowJs !== options.allowJs) ||
                (oldOptions.rootDir !== options.rootDir) ||
                (oldOptions.configFilePath !== options.configFilePath) ||
                (oldOptions.baseUrl !== options.baseUrl) ||
                (oldOptions.maxNodeModuleJsDepth !== options.maxNodeModuleJsDepth) ||
                !arrayIsEqualTo(oldOptions.typeRoots, oldOptions.typeRoots) ||
                !arrayIsEqualTo(oldOptions.rootDirs, options.rootDirs) ||
                !equalOwnProperties(oldOptions.paths, options.paths)) {
                return false;
            }

            Debug.assert(!oldProgram.structureIsReused);

            // there is an old program, check if we can reuse its structure
            const oldRootNames = oldProgram.getRootFileNames();
            if (!arrayIsEqualTo(oldRootNames, rootNames)) {
                return false;
            }

            if (!arrayIsEqualTo(options.types, oldOptions.types)) {
                return false;
            }

            // check if program source files has changed in the way that can affect structure of the program
            const newSourceFiles: SourceFile[] = [];
            const filePaths: Path[] = [];
            const modifiedSourceFiles: SourceFile[] = [];

            for (const oldSourceFile of oldProgram.getSourceFiles()) {
                let newSourceFile = host.getSourceFileByPath
                    ? host.getSourceFileByPath(oldSourceFile.fileName, oldSourceFile.path, options.target)
                    : host.getSourceFile(oldSourceFile.fileName, options.target);

                if (!newSourceFile) {
                    return false;
                }

                newSourceFile.path = oldSourceFile.path;
                filePaths.push(newSourceFile.path);

                if (oldSourceFile !== newSourceFile) {
                    if (oldSourceFile.hasNoDefaultLib !== newSourceFile.hasNoDefaultLib) {
                        // value of no-default-lib has changed
                        // this will affect if default library is injected into the list of files
                        return false;
                    }

                    // check tripleslash references
                    if (!arrayIsEqualTo(oldSourceFile.referencedFiles, newSourceFile.referencedFiles, fileReferenceIsEqualTo)) {
                        // tripleslash references has changed
                        return false;
                    }

                    // check imports and module augmentations
                    collectExternalModuleReferences(newSourceFile);
                    if (!arrayIsEqualTo(oldSourceFile.imports, newSourceFile.imports, moduleNameIsEqualTo)) {
                        // imports has changed
                        return false;
                    }
                    if (!arrayIsEqualTo(oldSourceFile.moduleAugmentations, newSourceFile.moduleAugmentations, moduleNameIsEqualTo)) {
                        // moduleAugmentations has changed
                        return false;
                    }

                    if (!arrayIsEqualTo(oldSourceFile.typeReferenceDirectives, newSourceFile.typeReferenceDirectives, fileReferenceIsEqualTo)) {
                        // 'types' references has changed
                        return false;
                    }

                    const newSourceFilePath = getNormalizedAbsolutePath(newSourceFile.fileName, currentDirectory);
                    if (resolveModuleNamesWorker) {
                        const moduleNames = map(concatenate(newSourceFile.imports, newSourceFile.moduleAugmentations), getTextOfLiteral);
                        const resolutions = resolveModuleNamesWorker(moduleNames, newSourceFilePath);
                        // ensure that module resolution results are still correct
                        const resolutionsChanged = hasChangesInResolutions(moduleNames, resolutions, oldSourceFile.resolvedModules, moduleResolutionIsEqualTo);
                        if (resolutionsChanged) {
                            return false;
                        }
                    }
                    if (resolveTypeReferenceDirectiveNamesWorker) {
                        const typesReferenceDirectives = map(newSourceFile.typeReferenceDirectives, x => x.fileName);
                        const resolutions = resolveTypeReferenceDirectiveNamesWorker(typesReferenceDirectives, newSourceFilePath);
                        // ensure that types resolutions are still correct
                        const resolutionsChanged = hasChangesInResolutions(typesReferenceDirectives, resolutions, oldSourceFile.resolvedTypeReferenceDirectiveNames, typeDirectiveIsEqualTo);
                        if (resolutionsChanged) {
                            return false;
                        }
                    }
                    // pass the cache of module/types resolutions from the old source file
                    newSourceFile.resolvedModules = oldSourceFile.resolvedModules;
                    newSourceFile.resolvedTypeReferenceDirectiveNames = oldSourceFile.resolvedTypeReferenceDirectiveNames;
                    modifiedSourceFiles.push(newSourceFile);
                }
                else {
                    // file has no changes - use it as is
                    newSourceFile = oldSourceFile;
                }

                // if file has passed all checks it should be safe to reuse it
                newSourceFiles.push(newSourceFile);
            }

            // update fileName -> file mapping
            for (let i = 0, len = newSourceFiles.length; i < len; i++) {
                filesByName.set(filePaths[i], newSourceFiles[i]);
            }

            files = newSourceFiles;
            fileProcessingDiagnostics = oldProgram.getFileProcessingDiagnostics();

            for (const modifiedFile of modifiedSourceFiles) {
                fileProcessingDiagnostics.reattachFileDiagnostics(modifiedFile);
            }
            resolvedTypeReferenceDirectives = oldProgram.getResolvedTypeReferenceDirectives();
            oldProgram.structureIsReused = true;

            return true;
        }

        function getEmitHost(writeFileCallback?: WriteFileCallback): EmitHost {
            return {
                getCanonicalFileName,
                getCommonSourceDirectory: program.getCommonSourceDirectory,
                getCompilerOptions: program.getCompilerOptions,
                getCurrentDirectory: () => currentDirectory,
                getNewLine: () => host.getNewLine(),
                getSourceFile: program.getSourceFile,
                getSourceFileByPath: program.getSourceFileByPath,
                getSourceFiles: program.getSourceFiles,
                isSourceFileFromExternalLibrary: (file: SourceFile) => !!sourceFilesFoundSearchingNodeModules[file.path],
                writeFile: writeFileCallback || (
                    (fileName, data, writeByteOrderMark, onError, sourceFiles) => host.writeFile(fileName, data, writeByteOrderMark, onError, sourceFiles)),
                isEmitBlocked,
            };
        }

        function getDiagnosticsProducingTypeChecker() {
            return diagnosticsProducingTypeChecker || (diagnosticsProducingTypeChecker = createTypeChecker(program, /*produceDiagnostics:*/ true));
        }

        function getTypeChecker() {
            return noDiagnosticsTypeChecker || (noDiagnosticsTypeChecker = createTypeChecker(program, /*produceDiagnostics:*/ false));
        }

        function emit(sourceFile?: SourceFile, writeFileCallback?: WriteFileCallback, cancellationToken?: CancellationToken): EmitResult {
            return runWithCancellationToken(() => emitWorker(program, sourceFile, writeFileCallback, cancellationToken));
        }

        function isEmitBlocked(emitFileName: string): boolean {
            return hasEmitBlockingDiagnostics.contains(toPath(emitFileName, currentDirectory, getCanonicalFileName));
        }

        function emitWorker(program: Program, sourceFile: SourceFile, writeFileCallback: WriteFileCallback, cancellationToken: CancellationToken): EmitResult {
            let declarationDiagnostics: Diagnostic[] = [];

            if (options.noEmit) {
                return { diagnostics: declarationDiagnostics, sourceMaps: undefined, emittedFiles: undefined, emitSkipped: true };
            }

            // If the noEmitOnError flag is set, then check if we have any errors so far.  If so,
            // immediately bail out.  Note that we pass 'undefined' for 'sourceFile' so that we
            // get any preEmit diagnostics, not just the ones
            if (options.noEmitOnError) {
                const diagnostics = program.getOptionsDiagnostics(cancellationToken).concat(
                    program.getSyntacticDiagnostics(sourceFile, cancellationToken),
                    program.getGlobalDiagnostics(cancellationToken),
                    program.getSemanticDiagnostics(sourceFile, cancellationToken));

                if (diagnostics.length === 0 && program.getCompilerOptions().declaration) {
                    declarationDiagnostics = program.getDeclarationDiagnostics(/*sourceFile*/ undefined, cancellationToken);
                }

                if (diagnostics.length > 0 || declarationDiagnostics.length > 0) {
                    return {
                        diagnostics: concatenate(diagnostics, declarationDiagnostics),
                        sourceMaps: undefined,
                        emittedFiles: undefined,
                        emitSkipped: true
                    };
                }
            }

            // Create the emit resolver outside of the "emitTime" tracking code below.  That way
            // any cost associated with it (like type checking) are appropriate associated with
            // the type-checking counter.
            //
            // If the -out option is specified, we should not pass the source file to getEmitResolver.
            // This is because in the -out scenario all files need to be emitted, and therefore all
            // files need to be type checked. And the way to specify that all files need to be type
            // checked is to not pass the file to getEmitResolver.
            const emitResolver = getDiagnosticsProducingTypeChecker().getEmitResolver((options.outFile || options.out) ? undefined : sourceFile);

            performance.mark("beforeEmit");

            const emitResult = emitFiles(
                emitResolver,
                getEmitHost(writeFileCallback),
                sourceFile);

            performance.mark("afterEmit");
            performance.measure("Emit", "beforeEmit", "afterEmit");
            return emitResult;
        }

        function getSourceFile(fileName: string): SourceFile {
            return getSourceFileByPath(toPath(fileName, currentDirectory, getCanonicalFileName));
        }

        function getSourceFileByPath(path: Path): SourceFile {
            return filesByName.get(path);
        }

        function getDiagnosticsHelper(
            sourceFile: SourceFile,
            getDiagnostics: (sourceFile: SourceFile, cancellationToken: CancellationToken) => Diagnostic[],
            cancellationToken: CancellationToken): Diagnostic[] {
            if (sourceFile) {
                return getDiagnostics(sourceFile, cancellationToken);
            }

            const allDiagnostics: Diagnostic[] = [];
            forEach(program.getSourceFiles(), sourceFile => {
                if (cancellationToken) {
                    cancellationToken.throwIfCancellationRequested();
                }
                addRange(allDiagnostics, getDiagnostics(sourceFile, cancellationToken));
            });

            return sortAndDeduplicateDiagnostics(allDiagnostics);
        }

        function getSyntacticDiagnostics(sourceFile: SourceFile, cancellationToken: CancellationToken): Diagnostic[] {
            return getDiagnosticsHelper(sourceFile, getSyntacticDiagnosticsForFile, cancellationToken);
        }

        function getSemanticDiagnostics(sourceFile: SourceFile, cancellationToken: CancellationToken): Diagnostic[] {
            return getDiagnosticsHelper(sourceFile, getSemanticDiagnosticsForFile, cancellationToken);
        }

        function getDeclarationDiagnostics(sourceFile: SourceFile, cancellationToken: CancellationToken): Diagnostic[] {
            const options = program.getCompilerOptions();
            // collect diagnostics from the program only once if either no source file was specified or out/outFile is set (bundled emit)
            if (!sourceFile || options.out || options.outFile) {
                return getDeclarationDiagnosticsWorker(sourceFile, cancellationToken);
            }
            else {
                return getDiagnosticsHelper(sourceFile, getDeclarationDiagnosticsForFile, cancellationToken);
            }
        }

        function getSyntacticDiagnosticsForFile(sourceFile: SourceFile, cancellationToken: CancellationToken): Diagnostic[] {
            return sourceFile.parseDiagnostics;
        }

        function runWithCancellationToken<T>(func: () => T): T {
            try {
                return func();
            }
            catch (e) {
                if (e instanceof OperationCanceledException) {
                    // We were canceled while performing the operation.  Because our type checker
                    // might be a bad state, we need to throw it away.
                    //
                    // Note: we are overly aggressive here.  We do not actually *have* to throw away
                    // the "noDiagnosticsTypeChecker".  However, for simplicity, i'd like to keep
                    // the lifetimes of these two TypeCheckers the same.  Also, we generally only
                    // cancel when the user has made a change anyways.  And, in that case, we (the
                    // program instance) will get thrown away anyways.  So trying to keep one of
                    // these type checkers alive doesn't serve much purpose.
                    noDiagnosticsTypeChecker = undefined;
                    diagnosticsProducingTypeChecker = undefined;
                }

                throw e;
            }
        }

        function getSemanticDiagnosticsForFile(sourceFile: SourceFile, cancellationToken: CancellationToken): Diagnostic[] {
            return runWithCancellationToken(() => {
                const typeChecker = getDiagnosticsProducingTypeChecker();

                Debug.assert(!!sourceFile.bindDiagnostics);
                const bindDiagnostics = sourceFile.bindDiagnostics;
                // For JavaScript files, we don't want to report the normal typescript semantic errors.
                // Instead, we just report errors for using TypeScript-only constructs from within a
                // JavaScript file.
                const checkDiagnostics = isSourceFileJavaScript(sourceFile) ?
                    getJavaScriptSemanticDiagnosticsForFile(sourceFile, cancellationToken) :
                    typeChecker.getDiagnostics(sourceFile, cancellationToken);
                const fileProcessingDiagnosticsInFile = fileProcessingDiagnostics.getDiagnostics(sourceFile.fileName);
                const programDiagnosticsInFile = programDiagnostics.getDiagnostics(sourceFile.fileName);

                return bindDiagnostics.concat(checkDiagnostics).concat(fileProcessingDiagnosticsInFile).concat(programDiagnosticsInFile);
            });
        }

        function getJavaScriptSemanticDiagnosticsForFile(sourceFile: SourceFile, cancellationToken: CancellationToken): Diagnostic[] {
            return runWithCancellationToken(() => {
                const diagnostics: Diagnostic[] = [];
                walk(sourceFile);

                return diagnostics;

                function walk(node: Node): boolean {
                    if (!node) {
                        return false;
                    }

                    switch (node.kind) {
                        case SyntaxKind.ImportEqualsDeclaration:
                            diagnostics.push(createDiagnosticForNode(node, Diagnostics.import_can_only_be_used_in_a_ts_file));
                            return true;
                        case SyntaxKind.ExportAssignment:
                            if ((<ExportAssignment>node).isExportEquals) {
                                diagnostics.push(createDiagnosticForNode(node, Diagnostics.export_can_only_be_used_in_a_ts_file));
                                return true;
                            }
                            break;
                        case SyntaxKind.ClassDeclaration:
                            let classDeclaration = <ClassDeclaration>node;
                            if (checkModifiers(classDeclaration.modifiers) ||
                                checkTypeParameters(classDeclaration.typeParameters)) {
                                return true;
                            }
                            break;
                        case SyntaxKind.HeritageClause:
                            let heritageClause = <HeritageClause>node;
                            if (heritageClause.token === SyntaxKind.ImplementsKeyword) {
                                diagnostics.push(createDiagnosticForNode(node, Diagnostics.implements_clauses_can_only_be_used_in_a_ts_file));
                                return true;
                            }
                            break;
                        case SyntaxKind.InterfaceDeclaration:
                            diagnostics.push(createDiagnosticForNode(node, Diagnostics.interface_declarations_can_only_be_used_in_a_ts_file));
                            return true;
                        case SyntaxKind.ModuleDeclaration:
                            diagnostics.push(createDiagnosticForNode(node, Diagnostics.module_declarations_can_only_be_used_in_a_ts_file));
                            return true;
                        case SyntaxKind.TypeAliasDeclaration:
                            diagnostics.push(createDiagnosticForNode(node, Diagnostics.type_aliases_can_only_be_used_in_a_ts_file));
                            return true;
                        case SyntaxKind.MethodDeclaration:
                        case SyntaxKind.MethodSignature:
                        case SyntaxKind.Constructor:
                        case SyntaxKind.GetAccessor:
                        case SyntaxKind.SetAccessor:
                        case SyntaxKind.FunctionExpression:
                        case SyntaxKind.FunctionDeclaration:
                        case SyntaxKind.ArrowFunction:
                        case SyntaxKind.FunctionDeclaration:
                            const functionDeclaration = <FunctionLikeDeclaration>node;
                            if (checkModifiers(functionDeclaration.modifiers) ||
                                checkTypeParameters(functionDeclaration.typeParameters) ||
                                checkTypeAnnotation(functionDeclaration.type)) {
                                return true;
                            }
                            break;
                        case SyntaxKind.VariableStatement:
                            const variableStatement = <VariableStatement>node;
                            if (checkModifiers(variableStatement.modifiers)) {
                                return true;
                            }
                            break;
                        case SyntaxKind.VariableDeclaration:
                            const variableDeclaration = <VariableDeclaration>node;
                            if (checkTypeAnnotation(variableDeclaration.type)) {
                                return true;
                            }
                            break;
                        case SyntaxKind.CallExpression:
                        case SyntaxKind.NewExpression:
                            const expression = <CallExpression>node;
                            if (expression.typeArguments && expression.typeArguments.length > 0) {
                                const start = expression.typeArguments.pos;
                                diagnostics.push(createFileDiagnostic(sourceFile, start, expression.typeArguments.end - start,
                                    Diagnostics.type_arguments_can_only_be_used_in_a_ts_file));
                                return true;
                            }
                            break;
                        case SyntaxKind.Parameter:
                            const parameter = <ParameterDeclaration>node;
                            if (parameter.modifiers) {
                                const start = parameter.modifiers.pos;
                                diagnostics.push(createFileDiagnostic(sourceFile, start, parameter.modifiers.end - start,
                                    Diagnostics.parameter_modifiers_can_only_be_used_in_a_ts_file));
                                return true;
                            }
                            if (parameter.questionToken) {
                                diagnostics.push(createDiagnosticForNode(parameter.questionToken, Diagnostics._0_can_only_be_used_in_a_ts_file, "?"));
                                return true;
                            }
                            if (parameter.type) {
                                diagnostics.push(createDiagnosticForNode(parameter.type, Diagnostics.types_can_only_be_used_in_a_ts_file));
                                return true;
                            }
                            break;
                        case SyntaxKind.PropertyDeclaration:
                            const propertyDeclaration = <PropertyDeclaration>node;
                            if (propertyDeclaration.modifiers) {
                                for (const modifier of propertyDeclaration.modifiers) {
                                    if (modifier.kind !== SyntaxKind.StaticKeyword) {
                                        diagnostics.push(createDiagnosticForNode(modifier, Diagnostics._0_can_only_be_used_in_a_ts_file, tokenToString(modifier.kind)));
                                        return true;
                                    }
                                }
                            }
                            if (checkTypeAnnotation((<PropertyDeclaration>node).type)) {
                                return true;
                            }
                            break;
                        case SyntaxKind.EnumDeclaration:
                            diagnostics.push(createDiagnosticForNode(node, Diagnostics.enum_declarations_can_only_be_used_in_a_ts_file));
                            return true;
                        case SyntaxKind.TypeAssertionExpression:
                            let typeAssertionExpression = <TypeAssertion>node;
                            diagnostics.push(createDiagnosticForNode(typeAssertionExpression.type, Diagnostics.type_assertion_expressions_can_only_be_used_in_a_ts_file));
                            return true;
                        case SyntaxKind.Decorator:
                            if (!options.experimentalDecorators) {
                                diagnostics.push(createDiagnosticForNode(node, Diagnostics.Experimental_support_for_decorators_is_a_feature_that_is_subject_to_change_in_a_future_release_Set_the_experimentalDecorators_option_to_remove_this_warning));
                            }
                            return true;
                    }

                    return forEachChild(node, walk);
                }

                function checkTypeParameters(typeParameters: NodeArray<TypeParameterDeclaration>): boolean {
                    if (typeParameters) {
                        const start = typeParameters.pos;
                        diagnostics.push(createFileDiagnostic(sourceFile, start, typeParameters.end - start, Diagnostics.type_parameter_declarations_can_only_be_used_in_a_ts_file));
                        return true;
                    }
                    return false;
                }

                function checkTypeAnnotation(type: TypeNode): boolean {
                    if (type) {
                        diagnostics.push(createDiagnosticForNode(type, Diagnostics.types_can_only_be_used_in_a_ts_file));
                        return true;
                    }

                    return false;
                }

                function checkModifiers(modifiers: ModifiersArray): boolean {
                    if (modifiers) {
                        for (const modifier of modifiers) {
                            switch (modifier.kind) {
                                case SyntaxKind.PublicKeyword:
                                case SyntaxKind.PrivateKeyword:
                                case SyntaxKind.ProtectedKeyword:
                                case SyntaxKind.ReadonlyKeyword:
                                case SyntaxKind.DeclareKeyword:
                                    diagnostics.push(createDiagnosticForNode(modifier, Diagnostics._0_can_only_be_used_in_a_ts_file, tokenToString(modifier.kind)));
                                    return true;

                                // These are all legal modifiers.
                                case SyntaxKind.StaticKeyword:
                                case SyntaxKind.ExportKeyword:
                                case SyntaxKind.ConstKeyword:
                                case SyntaxKind.DefaultKeyword:
                                case SyntaxKind.AbstractKeyword:
                            }
                        }
                    }

                    return false;
                }
            });
        }

        function getDeclarationDiagnosticsWorker(sourceFile: SourceFile, cancellationToken: CancellationToken): Diagnostic[] {
            return runWithCancellationToken(() => {
                const resolver = getDiagnosticsProducingTypeChecker().getEmitResolver(sourceFile, cancellationToken);
                // Don't actually write any files since we're just getting diagnostics.
                const writeFile: WriteFileCallback = () => { };
                return ts.getDeclarationDiagnostics(getEmitHost(writeFile), resolver, sourceFile);
            });
        }

        function getDeclarationDiagnosticsForFile(sourceFile: SourceFile, cancellationToken: CancellationToken): Diagnostic[] {
            return isDeclarationFile(sourceFile) ? [] : getDeclarationDiagnosticsWorker(sourceFile, cancellationToken);
        }

        function getOptionsDiagnostics(): Diagnostic[] {
            const allDiagnostics: Diagnostic[] = [];
            addRange(allDiagnostics, fileProcessingDiagnostics.getGlobalDiagnostics());
            addRange(allDiagnostics, programDiagnostics.getGlobalDiagnostics());
            return sortAndDeduplicateDiagnostics(allDiagnostics);
        }

        function getGlobalDiagnostics(): Diagnostic[] {
            const allDiagnostics: Diagnostic[] = [];
            addRange(allDiagnostics, getDiagnosticsProducingTypeChecker().getGlobalDiagnostics());
            return sortAndDeduplicateDiagnostics(allDiagnostics);
        }

        function hasExtension(fileName: string): boolean {
            return getBaseFileName(fileName).indexOf(".") >= 0;
        }

        function processRootFile(fileName: string, isDefaultLib: boolean) {
            processSourceFile(normalizePath(fileName), isDefaultLib, /*isReference*/ true);
        }

        function fileReferenceIsEqualTo(a: FileReference, b: FileReference): boolean {
            return a.fileName === b.fileName;
        }

        function moduleNameIsEqualTo(a: LiteralExpression, b: LiteralExpression): boolean {
            return a.text === b.text;
        }

        function getTextOfLiteral(literal: LiteralExpression): string {
            return literal.text;
        }

        function collectExternalModuleReferences(file: SourceFile): void {
            if (file.imports) {
                return;
            }

            const isJavaScriptFile = isSourceFileJavaScript(file);
            const isExternalModuleFile = isExternalModule(file);

            let imports: LiteralExpression[];
            let moduleAugmentations: LiteralExpression[];

            for (const node of file.statements) {
                collectModuleReferences(node, /*inAmbientModule*/ false);
                if (isJavaScriptFile) {
                    collectRequireCalls(node);
                }
            }

            file.imports = imports || emptyArray;
            file.moduleAugmentations = moduleAugmentations || emptyArray;

            return;

            function collectModuleReferences(node: Node, inAmbientModule: boolean): void {
                switch (node.kind) {
                    case SyntaxKind.ImportDeclaration:
                    case SyntaxKind.ImportEqualsDeclaration:
                    case SyntaxKind.ExportDeclaration:
                        let moduleNameExpr = getExternalModuleName(node);
                        if (!moduleNameExpr || moduleNameExpr.kind !== SyntaxKind.StringLiteral) {
                            break;
                        }
                        if (!(<LiteralExpression>moduleNameExpr).text) {
                            break;
                        }

                        // TypeScript 1.0 spec (April 2014): 12.1.6
                        // An ExternalImportDeclaration in an AmbientExternalModuleDeclaration may reference other external modules
                        // only through top - level external module names. Relative external module names are not permitted.
                        if (!inAmbientModule || !isExternalModuleNameRelative((<LiteralExpression>moduleNameExpr).text)) {
                            (imports || (imports = [])).push(<LiteralExpression>moduleNameExpr);
                        }
                        break;
                    case SyntaxKind.ModuleDeclaration:
                        if (isAmbientModule(<ModuleDeclaration>node) && (inAmbientModule || node.flags & NodeFlags.Ambient || isDeclarationFile(file))) {
                            const moduleName = <LiteralExpression>(<ModuleDeclaration>node).name;
                            // Ambient module declarations can be interpreted as augmentations for some existing external modules.
                            // This will happen in two cases:
                            // - if current file is external module then module augmentation is a ambient module declaration defined in the top level scope
                            // - if current file is not external module then module augmentation is an ambient module declaration with non-relative module name
                            //   immediately nested in top level ambient module declaration .
                            if (isExternalModuleFile || (inAmbientModule && !isExternalModuleNameRelative(moduleName.text))) {
                                (moduleAugmentations || (moduleAugmentations = [])).push(moduleName);
                            }
                            else if (!inAmbientModule) {
                                // An AmbientExternalModuleDeclaration declares an external module.
                                // This type of declaration is permitted only in the global module.
                                // The StringLiteral must specify a top - level external module name.
                                // Relative external module names are not permitted

                                // NOTE: body of ambient module is always a module block, if it exists
                                const body = <ModuleBlock>(<ModuleDeclaration>node).body;
                                if (body) {
                                    for (const statement of body.statements) {
                                        collectModuleReferences(statement, /*inAmbientModule*/ true);
                                    }
                                }
                            }
                        }
                }
            }

            function collectRequireCalls(node: Node): void {
                if (isRequireCall(node, /*checkArgumentIsStringLiteral*/true)) {
                    (imports || (imports = [])).push(<StringLiteral>(<CallExpression>node).arguments[0]);
                }
                else {
                    forEachChild(node, collectRequireCalls);
                }
            }
        }

        /**
          * 'isReference' indicates whether the file was brought in via a reference directive (rather than an import declaration)
          */
        function processSourceFile(fileName: string, isDefaultLib: boolean, isReference: boolean, refFile?: SourceFile, refPos?: number, refEnd?: number) {
            let diagnosticArgument: string[];
            let diagnostic: DiagnosticMessage;
            if (hasExtension(fileName)) {
                if (!options.allowNonTsExtensions && !forEach(supportedExtensions, extension => fileExtensionIs(host.getCanonicalFileName(fileName), extension))) {
                    diagnostic = Diagnostics.File_0_has_unsupported_extension_The_only_supported_extensions_are_1;
                    diagnosticArgument = [fileName, "'" + supportedExtensions.join("', '") + "'"];
                }
                else if (!findSourceFile(fileName, toPath(fileName, currentDirectory, getCanonicalFileName), isDefaultLib, isReference, refFile, refPos, refEnd)) {
                    diagnostic = Diagnostics.File_0_not_found;
                    diagnosticArgument = [fileName];
                }
                else if (refFile && host.getCanonicalFileName(fileName) === host.getCanonicalFileName(refFile.fileName)) {
                    diagnostic = Diagnostics.A_file_cannot_have_a_reference_to_itself;
                    diagnosticArgument = [fileName];
                }
            }
            else {
                const nonTsFile: SourceFile = options.allowNonTsExtensions && findSourceFile(fileName, toPath(fileName, currentDirectory, getCanonicalFileName), isDefaultLib, isReference, refFile, refPos, refEnd);
                if (!nonTsFile) {
                    if (options.allowNonTsExtensions) {
                        diagnostic = Diagnostics.File_0_not_found;
                        diagnosticArgument = [fileName];
                    }
                    else if (!forEach(supportedExtensions, extension => findSourceFile(fileName + extension, toPath(fileName + extension, currentDirectory, getCanonicalFileName), isDefaultLib, isReference, refFile, refPos, refEnd))) {
                        diagnostic = Diagnostics.File_0_not_found;
                        fileName += ".ts";
                        diagnosticArgument = [fileName];
                    }
                }
            }

            if (diagnostic) {
                if (refFile !== undefined && refEnd !== undefined && refPos !== undefined) {
                    fileProcessingDiagnostics.add(createFileDiagnostic(refFile, refPos, refEnd - refPos, diagnostic, ...diagnosticArgument));
                }
                else {
                    fileProcessingDiagnostics.add(createCompilerDiagnostic(diagnostic, ...diagnosticArgument));
                }
            }
        }

        function reportFileNamesDifferOnlyInCasingError(fileName: string, existingFileName: string, refFile: SourceFile, refPos: number, refEnd: number): void {
            if (refFile !== undefined && refPos !== undefined && refEnd !== undefined) {
                fileProcessingDiagnostics.add(createFileDiagnostic(refFile, refPos, refEnd - refPos,
                    Diagnostics.File_name_0_differs_from_already_included_file_name_1_only_in_casing, fileName, existingFileName));
            }
            else {
                fileProcessingDiagnostics.add(createCompilerDiagnostic(Diagnostics.File_name_0_differs_from_already_included_file_name_1_only_in_casing, fileName, existingFileName));
            }
        }

        // Get source file from normalized fileName
        function findSourceFile(fileName: string, path: Path, isDefaultLib: boolean, isReference: boolean, refFile?: SourceFile, refPos?: number, refEnd?: number): SourceFile {
            if (filesByName.contains(path)) {
                const file = filesByName.get(path);
                // try to check if we've already seen this file but with a different casing in path
                // NOTE: this only makes sense for case-insensitive file systems
                if (file && options.forceConsistentCasingInFileNames && getNormalizedAbsolutePath(file.fileName, currentDirectory) !== getNormalizedAbsolutePath(fileName, currentDirectory)) {
                    reportFileNamesDifferOnlyInCasingError(fileName, file.fileName, refFile, refPos, refEnd);
                }

                // If the file was previously found via a node_modules search, but is now being processed as a root file,
                // then everything it sucks in may also be marked incorrectly, and needs to be checked again.
                if (file && sourceFilesFoundSearchingNodeModules[file.path] && currentNodeModulesDepth == 0) {
                    sourceFilesFoundSearchingNodeModules[file.path] = false;
                    if (!options.noResolve) {
                        processReferencedFiles(file, getDirectoryPath(fileName), isDefaultLib);
                        processTypeReferenceDirectives(file);
                    }

                    modulesWithElidedImports[file.path] = false;
                    processImportedModules(file, getDirectoryPath(fileName));
                }
                // See if we need to reprocess the imports due to prior skipped imports
                else if (file && modulesWithElidedImports[file.path]) {
                    if (currentNodeModulesDepth < maxNodeModulesJsDepth) {
                        modulesWithElidedImports[file.path] = false;
                        processImportedModules(file, getDirectoryPath(fileName));
                    }
                }

                return file;
            }

            // We haven't looked for this file, do so now and cache result
            const file = host.getSourceFile(fileName, options.target, hostErrorMessage => {
                if (refFile !== undefined && refPos !== undefined && refEnd !== undefined) {
                    fileProcessingDiagnostics.add(createFileDiagnostic(refFile, refPos, refEnd - refPos,
                        Diagnostics.Cannot_read_file_0_Colon_1, fileName, hostErrorMessage));
                }
                else {
                    fileProcessingDiagnostics.add(createCompilerDiagnostic(Diagnostics.Cannot_read_file_0_Colon_1, fileName, hostErrorMessage));
                }
            });

            filesByName.set(path, file);
            if (file) {
                sourceFilesFoundSearchingNodeModules[path] = (currentNodeModulesDepth > 0);
                file.path = path;

                if (host.useCaseSensitiveFileNames()) {
                    // for case-sensitive file systems check if we've already seen some file with similar filename ignoring case
                    const existingFile = filesByNameIgnoreCase.get(path);
                    if (existingFile) {
                        reportFileNamesDifferOnlyInCasingError(fileName, existingFile.fileName, refFile, refPos, refEnd);
                    }
                    else {
                        filesByNameIgnoreCase.set(path, file);
                    }
                }

                skipDefaultLib = skipDefaultLib || file.hasNoDefaultLib;

                const basePath = getDirectoryPath(fileName);
                if (!options.noResolve) {
                    processReferencedFiles(file, basePath, isDefaultLib);
                    processTypeReferenceDirectives(file);
                }

                // always process imported modules to record module name resolutions
                processImportedModules(file, basePath);

                if (isDefaultLib) {
                    files.unshift(file);
                }
                else {
                    files.push(file);
                }
            }

            return file;
        }

        function processReferencedFiles(file: SourceFile, basePath: string, isDefaultLib: boolean) {
            forEach(file.referencedFiles, ref => {
                const referencedFileName = resolveTripleslashReference(ref.fileName, file.fileName);
                processSourceFile(referencedFileName, isDefaultLib, /*isReference*/ true, file, ref.pos, ref.end);
            });
        }

        function processTypeReferenceDirectives(file: SourceFile) {
            // We lower-case all type references because npm automatically lowercases all packages. See GH#9824.
            const typeDirectives = map(file.typeReferenceDirectives, ref => ref.fileName.toLocaleLowerCase());
            const resolutions = resolveTypeReferenceDirectiveNamesWorker(typeDirectives, file.fileName);

            for (let i = 0; i < typeDirectives.length; i++) {
                const ref = file.typeReferenceDirectives[i];
                const resolvedTypeReferenceDirective = resolutions[i];
                // store resolved type directive on the file
                const fileName = ref.fileName.toLocaleLowerCase();
                setResolvedTypeReferenceDirective(file, fileName, resolvedTypeReferenceDirective);
                processTypeReferenceDirective(fileName, resolvedTypeReferenceDirective, file, ref.pos, ref.end);
            }
        }

        function processTypeReferenceDirective(typeReferenceDirective: string, resolvedTypeReferenceDirective: ResolvedTypeReferenceDirective,
            refFile?: SourceFile, refPos?: number, refEnd?: number): void {

            // If we already found this library as a primary reference - nothing to do
            const previousResolution = resolvedTypeReferenceDirectives[typeReferenceDirective];
            if (previousResolution && previousResolution.primary) {
                return;
            }
            let saveResolution = true;
            if (resolvedTypeReferenceDirective) {
                if (resolvedTypeReferenceDirective.primary) {
                    // resolved from the primary path
                    processSourceFile(resolvedTypeReferenceDirective.resolvedFileName, /*isDefaultLib*/ false, /*isReference*/ true, refFile, refPos, refEnd);
                }
                else {
                    // If we already resolved to this file, it must have been a secondary reference. Check file contents
                    // for sameness and possibly issue an error
                    if (previousResolution) {
                        const otherFileText = host.readFile(resolvedTypeReferenceDirective.resolvedFileName);
                        if (otherFileText !== getSourceFile(previousResolution.resolvedFileName).text) {
                            fileProcessingDiagnostics.add(createDiagnostic(refFile, refPos, refEnd,
                                Diagnostics.Conflicting_definitions_for_0_found_at_1_and_2_Consider_installing_a_specific_version_of_this_library_to_resolve_the_conflict,
                                typeReferenceDirective,
                                resolvedTypeReferenceDirective.resolvedFileName,
                                previousResolution.resolvedFileName
                            ));
                        }
                        // don't overwrite previous resolution result
                        saveResolution = false;
                    }
                    else {
                        // First resolution of this library
                        processSourceFile(resolvedTypeReferenceDirective.resolvedFileName, /*isDefaultLib*/ false, /*isReference*/ true, refFile, refPos, refEnd);
                    }
                }
            }
            else {
                fileProcessingDiagnostics.add(createDiagnostic(refFile, refPos, refEnd, Diagnostics.Cannot_find_type_definition_file_for_0, typeReferenceDirective));
            }

            if (saveResolution) {
                resolvedTypeReferenceDirectives[typeReferenceDirective] = resolvedTypeReferenceDirective;
            }
        }

        function createDiagnostic(refFile: SourceFile, refPos: number, refEnd: number, message: DiagnosticMessage, ...args: any[]): Diagnostic {
            if (refFile === undefined || refPos === undefined || refEnd === undefined) {
                return createCompilerDiagnostic(message, ...args);
            }
            else {
                return createFileDiagnostic(refFile, refPos, refEnd - refPos, message, ...args);
            }
        }

        function getCanonicalFileName(fileName: string): string {
            return host.getCanonicalFileName(fileName);
        }

        function processImportedModules(file: SourceFile, basePath: string) {
            collectExternalModuleReferences(file);
            if (file.imports.length || file.moduleAugmentations.length) {
                file.resolvedModules = createMap<ResolvedModule>();
                const moduleNames = map(concatenate(file.imports, file.moduleAugmentations), getTextOfLiteral);
                const resolutions = resolveModuleNamesWorker(moduleNames, getNormalizedAbsolutePath(file.fileName, currentDirectory));
                for (let i = 0; i < moduleNames.length; i++) {
                    const resolution = resolutions[i];
                    setResolvedModule(file, moduleNames[i], resolution);
                    const resolvedPath = resolution ? toPath(resolution.resolvedFileName, currentDirectory, getCanonicalFileName) : undefined;

                    // add file to program only if:
                    // - resolution was successful
                    // - noResolve is falsy
                    // - module name comes from the list of imports
                    // - it's not a top level JavaScript module that exceeded the search max
                    const isFromNodeModulesSearch = resolution && resolution.isExternalLibraryImport;
                    const isJsFileFromNodeModules = isFromNodeModulesSearch && hasJavaScriptFileExtension(resolution.resolvedFileName);

                    if (isFromNodeModulesSearch) {
                        currentNodeModulesDepth++;
                    }

                    const elideImport = isJsFileFromNodeModules && currentNodeModulesDepth > maxNodeModulesJsDepth;
                    const shouldAddFile = resolution && !options.noResolve && i < file.imports.length && !elideImport;

                    if (elideImport) {
                        modulesWithElidedImports[file.path] = true;
                    }
                    else if (shouldAddFile) {
                        findSourceFile(resolution.resolvedFileName,
                                resolvedPath,
                                /*isDefaultLib*/ false, /*isReference*/ false,
                                file,
                                skipTrivia(file.text, file.imports[i].pos),
                                file.imports[i].end);
                    }

                    if (isFromNodeModulesSearch) {
                        currentNodeModulesDepth--;
                    }
                }
            }
            else {
                // no imports - drop cached module resolutions
                file.resolvedModules = undefined;
            }
            return;
        }

        function computeCommonSourceDirectory(sourceFiles: SourceFile[]): string {
            const fileNames: string[] = [];
            for (const file of sourceFiles) {
                if (!file.isDeclarationFile) {
                    fileNames.push(file.fileName);
                }
            }
            return computeCommonSourceDirectoryOfFilenames(fileNames, currentDirectory, getCanonicalFileName);
        }

        function checkSourceFilesBelongToPath(sourceFiles: SourceFile[], rootDirectory: string): boolean {
            let allFilesBelongToPath = true;
            if (sourceFiles) {
                const absoluteRootDirectoryPath = host.getCanonicalFileName(getNormalizedAbsolutePath(rootDirectory, currentDirectory));

                for (const sourceFile of sourceFiles) {
                    if (!isDeclarationFile(sourceFile)) {
                        const absoluteSourceFilePath = host.getCanonicalFileName(getNormalizedAbsolutePath(sourceFile.fileName, currentDirectory));
                        if (absoluteSourceFilePath.indexOf(absoluteRootDirectoryPath) !== 0) {
                            programDiagnostics.add(createCompilerDiagnostic(Diagnostics.File_0_is_not_under_rootDir_1_rootDir_is_expected_to_contain_all_source_files, sourceFile.fileName, options.rootDir));
                            allFilesBelongToPath = false;
                        }
                    }
                }
            }

            return allFilesBelongToPath;
        }

        function verifyCompilerOptions() {
            if (options.isolatedModules) {
                if (options.declaration) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "declaration", "isolatedModules"));
                }

                if (options.noEmitOnError) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "noEmitOnError", "isolatedModules"));
                }

                if (options.out) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "out", "isolatedModules"));
                }

                if (options.outFile) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "outFile", "isolatedModules"));
                }
            }

            if (options.inlineSourceMap) {
                if (options.sourceMap) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "sourceMap", "inlineSourceMap"));
                }
                if (options.mapRoot) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "mapRoot", "inlineSourceMap"));
                }
            }

            if (options.paths && options.baseUrl === undefined) {
                programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_paths_cannot_be_used_without_specifying_baseUrl_option));
            }

            if (options.paths) {
                for (const key in options.paths) {
                    if (!hasProperty(options.paths, key)) {
                        continue;
                    }
                    if (!hasZeroOrOneAsteriskCharacter(key)) {
                        programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Pattern_0_can_have_at_most_one_Asterisk_character, key));
                    }
                    if (isArray(options.paths[key])) {
                        if (options.paths[key].length === 0) {
                            programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Substitutions_for_pattern_0_shouldn_t_be_an_empty_array, key));
                        }
                        for (const subst of options.paths[key]) {
                            const typeOfSubst = typeof subst;
                            if (typeOfSubst === "string") {
                                if (!hasZeroOrOneAsteriskCharacter(subst)) {
                                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Substitution_0_in_pattern_1_in_can_have_at_most_one_Asterisk_character, subst, key));
                                }
                            }
                            else {
                                programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Substitution_0_for_pattern_1_has_incorrect_type_expected_string_got_2, subst, key, typeOfSubst));
                            }
                        }
                    }
                    else {
                        programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Substitutions_for_pattern_0_should_be_an_array, key));
                    }
                }
            }

            if (!options.sourceMap && !options.inlineSourceMap) {
                if (options.inlineSources) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_can_only_be_used_when_either_option_inlineSourceMap_or_option_sourceMap_is_provided, "inlineSources"));
                }
                if (options.sourceRoot) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_can_only_be_used_when_either_option_inlineSourceMap_or_option_sourceMap_is_provided, "sourceRoot"));
                }
            }

            if (options.out && options.outFile) {
                programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "out", "outFile"));
            }

            if (options.mapRoot && !options.sourceMap) {
                // Error to specify --mapRoot without --sourcemap
                programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "mapRoot", "sourceMap"));
            }

            if (options.declarationDir) {
                if (!options.declaration) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "declarationDir", "declaration"));
                }
                if (options.out || options.outFile) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "declarationDir", options.out ? "out" : "outFile"));
                }
            }

            if (options.lib && options.noLib) {
                programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "lib", "noLib"));
            }

            const languageVersion = options.target || ScriptTarget.ES3;
            const outFile = options.outFile || options.out;

            const firstNonAmbientExternalModuleSourceFile = forEach(files, f => isExternalModule(f) && !isDeclarationFile(f) ? f : undefined);
            if (options.isolatedModules) {
                if (options.module === ModuleKind.None && languageVersion < ScriptTarget.ES6) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_isolatedModules_can_only_be_used_when_either_option_module_is_provided_or_option_target_is_ES2015_or_higher));
                }

                const firstNonExternalModuleSourceFile = forEach(files, f => !isExternalModule(f) && !isDeclarationFile(f) ? f : undefined);
                if (firstNonExternalModuleSourceFile) {
                    const span = getErrorSpanForNode(firstNonExternalModuleSourceFile, firstNonExternalModuleSourceFile);
                    programDiagnostics.add(createFileDiagnostic(firstNonExternalModuleSourceFile, span.start, span.length, Diagnostics.Cannot_compile_namespaces_when_the_isolatedModules_flag_is_provided));
                }
            }
            else if (firstNonAmbientExternalModuleSourceFile && languageVersion < ScriptTarget.ES6 && options.module === ModuleKind.None) {
                // We cannot use createDiagnosticFromNode because nodes do not have parents yet
                const span = getErrorSpanForNode(firstNonAmbientExternalModuleSourceFile, firstNonAmbientExternalModuleSourceFile.externalModuleIndicator);
                programDiagnostics.add(createFileDiagnostic(firstNonAmbientExternalModuleSourceFile, span.start, span.length, Diagnostics.Cannot_use_imports_exports_or_module_augmentations_when_module_is_none));
            }

            // Cannot specify module gen that isn't amd or system with --out
            if (outFile) {
                if (options.module && !(options.module === ModuleKind.AMD || options.module === ModuleKind.System)) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Only_amd_and_system_modules_are_supported_alongside_0, options.out ? "out" : "outFile"));
                }
                else if (options.module === undefined && firstNonAmbientExternalModuleSourceFile) {
                    const span = getErrorSpanForNode(firstNonAmbientExternalModuleSourceFile, firstNonAmbientExternalModuleSourceFile.externalModuleIndicator);
                    programDiagnostics.add(createFileDiagnostic(firstNonAmbientExternalModuleSourceFile, span.start, span.length, Diagnostics.Cannot_compile_modules_using_option_0_unless_the_module_flag_is_amd_or_system, options.out ? "out" : "outFile"));
                }
            }

            // there has to be common source directory if user specified --outdir || --sourceRoot
            // if user specified --mapRoot, there needs to be common source directory if there would be multiple files being emitted
            if (options.outDir || // there is --outDir specified
                options.sourceRoot || // there is --sourceRoot specified
                options.mapRoot) { // there is --mapRoot specified

                // Precalculate and cache the common source directory
                const dir = getCommonSourceDirectory();

                // If we failed to find a good common directory, but outDir is specified and at least one of our files is on a windows drive/URL/other resource, add a failure
                if (options.outDir && dir === "" && forEach(files, file => getRootLength(file.fileName) > 1)) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Cannot_find_the_common_subdirectory_path_for_the_input_files));
                }
            }

            if (!options.noEmit && options.allowJs && options.declaration) {
                programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "allowJs", "declaration"));
            }

            if (options.emitDecoratorMetadata &&
                !options.experimentalDecorators) {
                programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "emitDecoratorMetadata", "experimentalDecorators"));
            }

            if (options.reactNamespace && !isIdentifier(options.reactNamespace, languageVersion)) {
                programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Invalid_value_for_reactNamespace_0_is_not_a_valid_identifier, options.reactNamespace));
            }

            // If the emit is enabled make sure that every output file is unique and not overwriting any of the input files
            if (!options.noEmit && !options.suppressOutputPathCheck) {
                const emitHost = getEmitHost();
                const emitFilesSeen = createFileMap<boolean>(!host.useCaseSensitiveFileNames() ? key => key.toLocaleLowerCase() : undefined);
                forEachExpectedEmitFile(emitHost, (emitFileNames, sourceFiles, isBundledEmit) => {
                    verifyEmitFilePath(emitFileNames.jsFilePath, emitFilesSeen);
                    verifyEmitFilePath(emitFileNames.declarationFilePath, emitFilesSeen);
                });
            }

            // Verify that all the emit files are unique and don't overwrite input files
            function verifyEmitFilePath(emitFileName: string, emitFilesSeen: FileMap<boolean>) {
                if (emitFileName) {
                    const emitFilePath = toPath(emitFileName, currentDirectory, getCanonicalFileName);
                    // Report error if the output overwrites input file
                    if (filesByName.contains(emitFilePath)) {
                        createEmitBlockingDiagnostics(emitFileName, emitFilePath, Diagnostics.Cannot_write_file_0_because_it_would_overwrite_input_file);
                    }

                    // Report error if multiple files write into same file
                    if (emitFilesSeen.contains(emitFilePath)) {
                        // Already seen the same emit file - report error
                        createEmitBlockingDiagnostics(emitFileName, emitFilePath, Diagnostics.Cannot_write_file_0_because_it_would_be_overwritten_by_multiple_input_files);
                    }
                    else {
                        emitFilesSeen.set(emitFilePath, true);
                    }
                }
            }
        }

        function createEmitBlockingDiagnostics(emitFileName: string, emitFilePath: Path, message: DiagnosticMessage) {
            hasEmitBlockingDiagnostics.set(toPath(emitFileName, currentDirectory, getCanonicalFileName), true);
            programDiagnostics.add(createCompilerDiagnostic(message, emitFileName));
        }
    }
}
