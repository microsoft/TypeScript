/// <reference path="core.ts" />
/// <reference path="diagnosticInformationMap.generated.ts" />

namespace ts {
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

    /* @internal */
    export function loadNodeModuleFromDirectory(extensions: string[], candidate: string, failedLookupLocation: string[], onlyRecordFailures: boolean, state: ModuleResolutionState): string {
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

    /* @internal */
    export function loadModuleFromNodeModules(moduleName: string, directory: string, failedLookupLocations: string[], state: ModuleResolutionState, checkOneLevel: boolean): string {
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
            if (parentPath === directory || checkOneLevel) {
                break;
            }

            directory = parentPath;
        }
        return undefined;
    }

    function moduleHasNonRelativeName(moduleName: string): boolean {
        return !(isRootedDiskPath(moduleName) || isExternalModuleNameRelative(moduleName));
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
                resolvedFileName = loadModuleFromNodeModules(moduleName, containingDirectory, failedLookupLocations, state, /*checkOneLevel*/ false);
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

    /* @internal */
    export function directoryProbablyExists(directoryName: string, host: { directoryExists?: (directoryName: string) => boolean }): boolean {
        // if host does not support 'directoryExists' assume that directory will exist
        return !host.directoryExists || host.directoryExists(directoryName);
    }

    /* @internal */
    export function pathToPackageJson(directory: string): string {
        return combinePaths(directory, "package.json");
    }
}