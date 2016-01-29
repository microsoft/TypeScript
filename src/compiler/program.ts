/// <reference path="sys.ts" />
/// <reference path="emitter.ts" />
/// <reference path="core.ts" />

namespace ts {
    /* @internal */ export let programTime = 0;
    /* @internal */ export let emitTime = 0;
    /* @internal */ export let ioReadTime = 0;
    /* @internal */ export let ioWriteTime = 0;

    /** The version of the TypeScript compiler release */

    const emptyArray: any[] = [];

    export const version = "1.9.0";

    export function findConfigFile(searchPath: string, fileExists: (fileName: string) => boolean): string {
        let fileName = "tsconfig.json";
        while (true) {
            if (fileExists(fileName)) {
                return fileName;
            }
            const parentPath = getDirectoryPath(searchPath);
            if (parentPath === searchPath) {
                break;
            }
            searchPath = parentPath;
            fileName = "../" + fileName;
        }
        return undefined;
    }

    export function resolveTripleslashReference(moduleName: string, containingFile: string): string {
        const basePath = getDirectoryPath(containingFile);
        const referencedFileName = isRootedDiskPath(moduleName) ? moduleName : combinePaths(basePath, moduleName);
        return normalizePath(referencedFileName);
    }

    function trace(host: ModuleResolutionHost, message: DiagnosticMessage, ...args: any[]): void;
    function trace(host: ModuleResolutionHost, message: DiagnosticMessage): void {
        host.trace(formatMessage.apply(undefined, arguments));
    }

    function isTraceEnabled(compilerOptions: CompilerOptions, host: ModuleResolutionHost): boolean {
        return compilerOptions.traceModuleResolution && host.trace !== undefined;
    }

    function startsWith(str: string, prefix: string): boolean {
        return str.lastIndexOf(prefix, 0) === 0;
    }

    function endsWith(str: string, suffix: string): boolean {
        const expectedPos = str.length - suffix.length;
        return str.indexOf(suffix, expectedPos) === expectedPos;
    }

    function hasZeroOrOneAsteriskCharacter(str: string): boolean {
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
        if (isRootedDiskPath(moduleName)) {
            return false;
        }

        const i = moduleName.lastIndexOf("./", 1);
        const startsWithDotSlashOrDotDotSlash = i === 0 || (i === 1 && moduleName.charCodeAt(0) === CharacterCodes.dot);
        return !startsWithDotSlashOrDotDotSlash;
    }

    interface ModuleResolutionState {
        host: ModuleResolutionHost;
        compilerOptions: CompilerOptions;
        traceEnabled: boolean;
    }

    export function resolveModuleName(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost): ResolvedModuleWithFailedLookupLocations {
        const traceEnabled = isTraceEnabled(compilerOptions, host);
        if (traceEnabled) {
            trace(host, Diagnostics.Resolving_module_0_from_1, moduleName, containingFile);
        }

        let moduleResolution = compilerOptions.moduleResolution;
        if (moduleResolution === undefined) {
            moduleResolution = compilerOptions.module === ModuleKind.CommonJS ? ModuleResolutionKind.NodeJs : ModuleResolutionKind.Classic;
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
    type ResolutionKindSpecificLoader = (candidate: string, extensions: string[], failedLookupLocations: string[], onlyRecordFalures: boolean, state: ModuleResolutionState) => string;

    /**
     * Any module resolution kind can be augmented with optional settings: 'baseUrl', 'paths' and 'rootDirs' - they are used to 
     * mitigate differences between design time structure of the project and its runtime counterpart so the same import name 
     * can be resolved successfully by TypeScript compiler and runtime module loader. 
     * If these settings are set then loading procedure will try to use them to resolve module name and it can of failure it will
     * fallback to standard resolution routine.
     * 
     * - baseUrl - this setting controls how non-relative module names are resolved. If this setting is specified then non-relative
     * names will be resolved relative to baseUrl: i.e. if baseUrl is '/a/b' then canditate location to resolve module name 'c/d' will
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
     * Substitiution is a string that can contain zero or one '*'. To get candidate location from substitution we'll pick every 
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
     * Compiler wil first convert './protocols/file2' into absolute path relative to the location of containing file:
     * '/local/src/content/protocols/file2' and try to load it - failure.
     * Then it will search 'rootDirs' looking for a longest matching prefix of this absolute path and if such prefix is found - absolute path will
     * be converted to a path relative to found rootDir entry './content/protocols/file2' (*). As a last step compiler will check all remainining
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
            // using locaton of tsconfig.json as base location
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

        let longestMatchPrefixLength = -1;
        let matchedPattern: string;
        let matchedStar: string;

        if (state.compilerOptions.paths) {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.paths_option_is_specified_looking_for_a_pattern_to_match_module_name_0, moduleName);
            }

            for (const key in state.compilerOptions.paths) {
                const pattern: string = key;
                const indexOfStar = pattern.indexOf("*");
                if (indexOfStar !== -1) {
                    const prefix = pattern.substr(0, indexOfStar);
                    const suffix = pattern.substr(indexOfStar + 1);
                    if (moduleName.length >= prefix.length + suffix.length &&
                        startsWith(moduleName, prefix) &&
                        endsWith(moduleName, suffix)) {

                        // use length of prefix as betterness criteria
                        if (prefix.length > longestMatchPrefixLength) {
                            longestMatchPrefixLength = prefix.length;
                            matchedPattern = pattern;
                            matchedStar = moduleName.substr(prefix.length, moduleName.length - suffix.length);
                        }
                    }
                }
                else if (pattern === moduleName) {
                    // pattern was matched as is - no need to seatch further
                    matchedPattern = pattern;
                    matchedStar = undefined;
                    break;
                }
            }
        }

        if (matchedPattern) {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Module_name_0_matched_pattern_1, moduleName, matchedPattern);
            }
            for (const subst of state.compilerOptions.paths[matchedPattern]) {
                const path = matchedStar ? subst.replace("\*", matchedStar) : subst;
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

    export function nodeModuleNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost): ResolvedModuleWithFailedLookupLocations {
        const containingDirectory = getDirectoryPath(containingFile);
        const supportedExtensions = getSupportedExtensions(compilerOptions);
        const traceEnabled = isTraceEnabled(compilerOptions, host);

        const failedLookupLocations: string[] = [];
        const state = {compilerOptions, host, traceEnabled};
        let resolvedFileName = tryLoadModuleUsingOptionalResolutionSettings(moduleName, containingDirectory, nodeLoadModuleByRelativeName,
            failedLookupLocations, supportedExtensions, state);

        if (resolvedFileName) {
            return createResolvedModule(resolvedFileName, /*isExternalLibraryImport*/false, failedLookupLocations);
        }

        let isExternalLibraryImport = false;
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
    export function directoryProbablyExists(directoryName: string, host: { directoryExists?: (directoryName: string) => boolean } ): boolean {
        // if host does not support 'directoryExists' assume that directory will exist
        return !host.directoryExists || host.directoryExists(directoryName);
    }

    /**
     * @param {boolean} onlyRecordFailures - if true then function won't try to actually load files but instead record all attempts as failures. This flag is necessary
     * in cases when we know upfront that all load attempts will fail (because containing folder does not exists) however we still need to record all failed lookup locations. 
     */
    function loadModuleFromFile(candidate: string, extensions: string[], failedLookupLocation: string[], onlyRecordFailures: boolean, state: ModuleResolutionState): string {
        return forEach(extensions, tryLoad);

        function tryLoad(ext: string): string {
            const fileName = fileExtensionIs(candidate, ext) ? candidate : candidate + ext;
            if (!onlyRecordFailures && state.host.fileExists(fileName)) {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.File_0_exist_use_it_as_a_module_resolution_result, fileName);
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
    }

    function loadNodeModuleFromDirectory(extensions: string[], candidate: string, failedLookupLocation: string[], onlyRecordFailures: boolean, state: ModuleResolutionState): string {
        const packageJsonPath = combinePaths(candidate, "package.json");
        const directoryExists = !onlyRecordFailures && directoryProbablyExists(candidate, state.host);
        if (directoryExists && state.host.fileExists(packageJsonPath)) {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Found_package_json_at_0, packageJsonPath);
            }

            let jsonContent: { typings?: string };

            try {
                const jsonText = state.host.readFile(packageJsonPath);
                jsonContent = jsonText ? <{ typings?: string }>JSON.parse(jsonText) : { typings: undefined };
            }
            catch (e) {
                // gracefully handle if readFile fails or returns not JSON 
                jsonContent = { typings: undefined };
            }

            if (jsonContent.typings) {
                if (typeof jsonContent.typings === "string") {
                    const typingsFile = normalizePath(combinePaths(candidate, jsonContent.typings));
                    if (state.traceEnabled) {
                        trace(state.host, Diagnostics.package_json_has_typings_field_0_that_references_1, jsonContent.typings, typingsFile);
                    }
                    const result = loadModuleFromFile(typingsFile, extensions, failedLookupLocation, !directoryProbablyExists(getDirectoryPath(typingsFile), state.host), state);
                    if (result) {
                        return result;
                    }
                }
                else if (state.traceEnabled) {
                    trace(state.host, Diagnostics.Expected_type_of_typings_field_in_package_json_to_be_string_got_0, typeof jsonContent.typings);
                }
            }
            else {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.package_json_does_not_have_typings_field);
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

    function loadModuleFromNodeModules(moduleName: string, directory: string, failedLookupLocations: string[], state: ModuleResolutionState): string {
        directory = normalizeSlashes(directory);
        while (true) {
            const baseName = getBaseFileName(directory);
            if (baseName !== "node_modules") {
                const nodeModulesFolder = combinePaths(directory, "node_modules");
                const nodeModulesFolderExists = directoryProbablyExists(nodeModulesFolder, state.host);
                const candidate = normalizePath(combinePaths(nodeModulesFolder, moduleName));
                // Load only typescript files irrespective of allowJs option if loading from node modules
                let result = loadModuleFromFile(candidate, supportedTypeScriptExtensions, failedLookupLocations, !nodeModulesFolderExists, state);
                if (result) {
                    return result;
                }
                result = loadNodeModuleFromDirectory(supportedTypeScriptExtensions, candidate, failedLookupLocations, !nodeModulesFolderExists, state);
                if (result) {
                    return result;
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
        const state = { compilerOptions, host, traceEnabled };
        const failedLookupLocations: string[] = [];
        const supportedExtensions = getSupportedExtensions(compilerOptions);
        let containingDirectory = getDirectoryPath(containingFile);

        const resolvedFileName = tryLoadModuleUsingOptionalResolutionSettings(moduleName, containingDirectory, loadModuleFromFile, failedLookupLocations, supportedExtensions, state);
        if (resolvedFileName) {
            return createResolvedModule(resolvedFileName, /*isExternalLibraryImport*/false, failedLookupLocations);
        }

        let referencedSourceFile: string;
        while (true) {
            const searchName = normalizePath(combinePaths(containingDirectory, moduleName));
            const directoryName = getDirectoryPath(searchName);
            referencedSourceFile = loadModuleFromFile(searchName, supportedExtensions, failedLookupLocations, !directoryProbablyExists(directoryName, host), state);
            if (referencedSourceFile) {
                break;
            }
            const parentPath = getDirectoryPath(containingDirectory);
            if (parentPath === containingDirectory) {
                break;
            }
            containingDirectory = parentPath;
        }

        return referencedSourceFile
            ? { resolvedModule: { resolvedFileName: referencedSourceFile  }, failedLookupLocations }
            : { resolvedModule: undefined, failedLookupLocations };
    }

    /* @internal */
    export const defaultInitCompilerOptions: CompilerOptions = {
        module: ModuleKind.CommonJS,
        target: ScriptTarget.ES5,
        noImplicitAny: false,
        sourceMap: false,
    };

    export function createCompilerHost(options: CompilerOptions, setParentNodes?: boolean): CompilerHost {
        const existingDirectories: Map<boolean> = {};

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
                const start = new Date().getTime();
                text = sys.readFile(fileName, options.charset);
                ioReadTime += new Date().getTime() - start;
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
            if (hasProperty(existingDirectories, directoryPath)) {
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

        function writeFile(fileName: string, data: string, writeByteOrderMark: boolean, onError?: (message: string) => void) {
            try {
                const start = new Date().getTime();
                ensureDirectoriesExist(getDirectoryPath(normalizePath(fileName)));
                sys.writeFile(fileName, data, writeByteOrderMark);
                ioWriteTime += new Date().getTime() - start;
            }
            catch (e) {
                if (onError) {
                    onError(e.message);
                }
            }
        }

        const newLine = getNewLineCharacter(options);

        return {
            getSourceFile,
            getDefaultLibFileName: options => combinePaths(getDirectoryPath(normalizePath(sys.getExecutingFilePath())), getDefaultLibFileName(options)),
            writeFile,
            getCurrentDirectory: memoize(() => sys.getCurrentDirectory()),
            useCaseSensitiveFileNames: () => sys.useCaseSensitiveFileNames,
            getCanonicalFileName,
            getNewLine: () => newLine,
            fileExists: fileName => sys.fileExists(fileName),
            readFile: fileName => sys.readFile(fileName),
            trace: (s: string) => sys.write(s + newLine),
            directoryExists: directoryName => sys.directoryExists(directoryName)
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

    export function createProgram(rootNames: string[], options: CompilerOptions, host?: CompilerHost, oldProgram?: Program): Program {
        let program: Program;
        let files: SourceFile[] = [];
        let fileProcessingDiagnostics = createDiagnosticCollection();
        const programDiagnostics = createDiagnosticCollection();

        let commonSourceDirectory: string;
        let diagnosticsProducingTypeChecker: TypeChecker;
        let noDiagnosticsTypeChecker: TypeChecker;
        let classifiableNames: Map<string>;

        let skipDefaultLib = options.noLib;
        const supportedExtensions = getSupportedExtensions(options);

        const start = new Date().getTime();

        host = host || createCompilerHost(options);
        // Map storing if there is emit blocking diagnostics for given input
        const hasEmitBlockingDiagnostics = createFileMap<boolean>(getCanonicalFileName);

        const currentDirectory = host.getCurrentDirectory();
        const resolveModuleNamesWorker = host.resolveModuleNames
            ? ((moduleNames: string[], containingFile: string) => host.resolveModuleNames(moduleNames, containingFile))
            : ((moduleNames: string[], containingFile: string) => {
                const resolvedModuleNames: ResolvedModule[] = [];
                // resolveModuleName does not store any results between calls.
                // lookup is a local cache to avoid resolving the same module name several times
                const lookup: Map<ResolvedModule> = {};
                for (const moduleName of moduleNames) {
                    let resolvedName: ResolvedModule;
                    if (hasProperty(lookup, moduleName)) {
                        resolvedName = lookup[moduleName];
                    }
                    else {
                        resolvedName = resolveModuleName(moduleName, containingFile, options, host).resolvedModule;
                        lookup[moduleName] = resolvedName;
                    }
                    resolvedModuleNames.push(resolvedName);
                }
                return resolvedModuleNames;
            });

        const filesByName = createFileMap<SourceFile>();
        // stores 'filename -> file association' ignoring case
        // used to track cases when two file names differ only in casing 
        const filesByNameIgnoreCase = host.useCaseSensitiveFileNames() ? createFileMap<SourceFile>(fileName => fileName.toLowerCase()) : undefined;

        if (oldProgram) {
            // check properties that can affect structure of the program or module resolution strategy
            // if any of these properties has changed - structure cannot be reused
            const oldOptions = oldProgram.getCompilerOptions();
            if ((oldOptions.module !== options.module) ||
                (oldOptions.noResolve !== options.noResolve) ||
                (oldOptions.target !== options.target) ||
                (oldOptions.noLib !== options.noLib) ||
                (oldOptions.jsx !== options.jsx) ||
                (oldOptions.allowJs !== options.allowJs)) {
                oldProgram = undefined;
            }
        }

        if (!tryReuseStructureFromOldProgram()) {
            forEach(rootNames, name => processRootFile(name, /*isDefaultLib*/ false));
            // Do not process the default library if:
            //  - The '--noLib' flag is used.
            //  - A 'no-default-lib' reference comment is encountered in
            //      processing the root files.
            if (!skipDefaultLib) {
                processRootFile(host.getDefaultLibFileName(options), /*isDefaultLib*/ true);
            }
        }

        // unconditionally set oldProgram to undefined to prevent it from being captured in closure
        oldProgram = undefined;

        program = {
            getRootFileNames: () => rootNames,
            getSourceFile,
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
            getFileProcessingDiagnostics: () => fileProcessingDiagnostics
        };

        verifyCompilerOptions();

        programTime += new Date().getTime() - start;

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
                classifiableNames = {};

                for (const sourceFile of files) {
                    copyMap(sourceFile.classifiableNames, classifiableNames);
                }
            }

            return classifiableNames;
        }

        function tryReuseStructureFromOldProgram(): boolean {
            if (!oldProgram) {
                return false;
            }

            Debug.assert(!oldProgram.structureIsReused);

            // there is an old program, check if we can reuse its structure
            const oldRootNames = oldProgram.getRootFileNames();
            if (!arrayIsEqualTo(oldRootNames, rootNames)) {
                return false;
            }

            // check if program source files has changed in the way that can affect structure of the program
            const newSourceFiles: SourceFile[] = [];
            const filePaths: Path[] = [];
            const modifiedSourceFiles: SourceFile[] = [];

            for (const oldSourceFile of oldProgram.getSourceFiles()) {
                let newSourceFile = host.getSourceFile(oldSourceFile.fileName, options.target);
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

                    if (resolveModuleNamesWorker) {
                        const moduleNames = map(concatenate(newSourceFile.imports, newSourceFile.moduleAugmentations), getTextOfLiteral);
                        const resolutions = resolveModuleNamesWorker(moduleNames, getNormalizedAbsolutePath(newSourceFile.fileName, currentDirectory));
                        // ensure that module resolution results are still correct
                        for (let i = 0; i < moduleNames.length; i++) {
                            const newResolution = resolutions[i];
                            const oldResolution = getResolvedModule(oldSourceFile, moduleNames[i]);
                            const resolutionChanged = oldResolution
                                ? !newResolution ||
                                  oldResolution.resolvedFileName !== newResolution.resolvedFileName ||
                                  !!oldResolution.isExternalLibraryImport !== !!newResolution.isExternalLibraryImport
                                : newResolution;

                            if (resolutionChanged) {
                                return false;
                            }
                        }
                    }
                    // pass the cache of module resolutions from the old source file
                    newSourceFile.resolvedModules = oldSourceFile.resolvedModules;
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
                getSourceFiles: program.getSourceFiles,
                writeFile: writeFileCallback || (
                    (fileName, data, writeByteOrderMark, onError) => host.writeFile(fileName, data, writeByteOrderMark, onError)),
                isEmitBlocked,
            };
        }

        function getDiagnosticsProducingTypeChecker() {
            return diagnosticsProducingTypeChecker || (diagnosticsProducingTypeChecker = createTypeChecker(program, /*produceDiagnostics:*/ true));
        }

        function getTypeChecker() {
            return noDiagnosticsTypeChecker || (noDiagnosticsTypeChecker = createTypeChecker(program, /*produceDiagnostics:*/ false));
        }

        // TODO: needs to have this: Program
        function emit(sourceFile?: SourceFile, writeFileCallback?: WriteFileCallback, cancellationToken?: CancellationToken): EmitResult {
            return runWithCancellationToken(() => emitWorker((<any>this), sourceFile, writeFileCallback, cancellationToken));
        }

        function isEmitBlocked(emitFileName: string): boolean {
            return hasEmitBlockingDiagnostics.contains(toPath(emitFileName, currentDirectory, getCanonicalFileName));
        }

        function emitWorker(program: Program, sourceFile: SourceFile, writeFileCallback: WriteFileCallback, cancellationToken: CancellationToken): EmitResult {
            // If the noEmitOnError flag is set, then check if we have any errors so far.  If so,
            // immediately bail out.  Note that we pass 'undefined' for 'sourceFile' so that we
            // get any preEmit diagnostics, not just the ones
            if (options.noEmitOnError) {
                const preEmitDiagnostics = getPreEmitDiagnostics(program, /*sourceFile:*/ undefined, cancellationToken);
                if (preEmitDiagnostics.length > 0) {
                    return { diagnostics: preEmitDiagnostics, sourceMaps: undefined, emitSkipped: true };
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

            const start = new Date().getTime();

            const emitResult = emitFiles(
                emitResolver,
                getEmitHost(writeFileCallback),
                sourceFile);

            emitTime += new Date().getTime() - start;
            return emitResult;
        }

        function getSourceFile(fileName: string): SourceFile {
            return filesByName.get(toPath(fileName, currentDirectory, getCanonicalFileName));
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
            return getDiagnosticsHelper(sourceFile, getDeclarationDiagnosticsForFile, cancellationToken);
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
                    // Note: we are overly agressive here.  We do not actually *have* to throw away
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
                            diagnostics.push(createDiagnosticForNode(node, Diagnostics.export_can_only_be_used_in_a_ts_file));
                            return true;
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
                            diagnostics.push(createDiagnosticForNode(node, Diagnostics.property_declarations_can_only_be_used_in_a_ts_file));
                            return true;
                        case SyntaxKind.EnumDeclaration:
                            diagnostics.push(createDiagnosticForNode(node, Diagnostics.enum_declarations_can_only_be_used_in_a_ts_file));
                            return true;
                        case SyntaxKind.TypeAssertionExpression:
                            let typeAssertionExpression = <TypeAssertion>node;
                            diagnostics.push(createDiagnosticForNode(typeAssertionExpression.type, Diagnostics.type_assertion_expressions_can_only_be_used_in_a_ts_file));
                            return true;
                        case SyntaxKind.Decorator:
                            diagnostics.push(createDiagnosticForNode(node, Diagnostics.decorators_can_only_be_used_in_a_ts_file));
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

        function getDeclarationDiagnosticsForFile(sourceFile: SourceFile, cancellationToken: CancellationToken): Diagnostic[] {
            return runWithCancellationToken(() => {
                if (!isDeclarationFile(sourceFile)) {
                    const resolver = getDiagnosticsProducingTypeChecker().getEmitResolver(sourceFile, cancellationToken);
                    // Don't actually write any files since we're just getting diagnostics.
                    const writeFile: WriteFileCallback = () => { };
                    return ts.getDeclarationDiagnostics(getEmitHost(writeFile), resolver, sourceFile);
                }
            });
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
            processSourceFile(normalizePath(fileName), isDefaultLib);
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

                                // NOTE: body of ambient module is always a module block
                                for (const statement of (<ModuleBlock>(<ModuleDeclaration>node).body).statements) {
                                    collectModuleReferences(statement, /*inAmbientModule*/ true);
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

        function processSourceFile(fileName: string, isDefaultLib: boolean, refFile?: SourceFile, refPos?: number, refEnd?: number) {
            let diagnosticArgument: string[];
            let diagnostic: DiagnosticMessage;
            if (hasExtension(fileName)) {
                if (!options.allowNonTsExtensions && !forEach(supportedExtensions, extension => fileExtensionIs(host.getCanonicalFileName(fileName), extension))) {
                    diagnostic = Diagnostics.File_0_has_unsupported_extension_The_only_supported_extensions_are_1;
                    diagnosticArgument = [fileName, "'" + supportedExtensions.join("', '") + "'"];
                }
                else if (!findSourceFile(fileName, toPath(fileName, currentDirectory, getCanonicalFileName), isDefaultLib, refFile, refPos, refEnd)) {
                    diagnostic = Diagnostics.File_0_not_found;
                    diagnosticArgument = [fileName];
                }
                else if (refFile && host.getCanonicalFileName(fileName) === host.getCanonicalFileName(refFile.fileName)) {
                    diagnostic = Diagnostics.A_file_cannot_have_a_reference_to_itself;
                    diagnosticArgument = [fileName];
                }
            }
            else {
                const nonTsFile: SourceFile = options.allowNonTsExtensions && findSourceFile(fileName, toPath(fileName, currentDirectory, getCanonicalFileName), isDefaultLib, refFile, refPos, refEnd);
                if (!nonTsFile) {
                    if (options.allowNonTsExtensions) {
                        diagnostic = Diagnostics.File_0_not_found;
                        diagnosticArgument = [fileName];
                    }
                    else if (!forEach(supportedExtensions, extension => findSourceFile(fileName + extension, toPath(fileName + extension, currentDirectory, getCanonicalFileName), isDefaultLib, refFile, refPos, refEnd))) {
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
        function findSourceFile(fileName: string, path: Path, isDefaultLib: boolean, refFile?: SourceFile, refPos?: number, refEnd?: number): SourceFile {
            if (filesByName.contains(path)) {
                const file = filesByName.get(path);
                // try to check if we've already seen this file but with a different casing in path
                // NOTE: this only makes sense for case-insensitive file systems
                if (file && options.forceConsistentCasingInFileNames && getNormalizedAbsolutePath(file.fileName, currentDirectory) !== getNormalizedAbsolutePath(fileName, currentDirectory)) {
                    reportFileNamesDifferOnlyInCasingError(fileName, file.fileName, refFile, refPos, refEnd);
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
                    processReferencedFiles(file, basePath);
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

        function processReferencedFiles(file: SourceFile, basePath: string) {
            forEach(file.referencedFiles, ref => {
                const referencedFileName = resolveTripleslashReference(ref.fileName, file.fileName);
                processSourceFile(referencedFileName, /*isDefaultLib*/ false, file, ref.pos, ref.end);
            });
        }

        function getCanonicalFileName(fileName: string): string {
            return host.getCanonicalFileName(fileName);
        }

        function processImportedModules(file: SourceFile, basePath: string) {
            collectExternalModuleReferences(file);
            if (file.imports.length || file.moduleAugmentations.length) {
                file.resolvedModules = {};
                const moduleNames = map(concatenate(file.imports, file.moduleAugmentations), getTextOfLiteral);
                const resolutions = resolveModuleNamesWorker(moduleNames, getNormalizedAbsolutePath(file.fileName, currentDirectory));
                for (let i = 0; i < moduleNames.length; i++) {
                    const resolution = resolutions[i];
                    setResolvedModule(file, moduleNames[i], resolution);
                    // add file to program only if:
                    // - resolution was successfull
                    // - noResolve is falsy
                    // - module name come from the list fo imports
                    const shouldAddFile = resolution &&
                        !options.noResolve &&
                        i < file.imports.length;

                    if (shouldAddFile) {
                        const importedFile = findSourceFile(resolution.resolvedFileName, toPath(resolution.resolvedFileName, currentDirectory, getCanonicalFileName), /*isDefaultLib*/ false, file, skipTrivia(file.text, file.imports[i].pos), file.imports[i].end);

                        if (importedFile && resolution.isExternalLibraryImport) {
                            // Since currently irrespective of allowJs, we only look for supportedTypeScript extension external module files,
                            // this check is ok. Otherwise this would be never true for javascript file
                            if (!isExternalModule(importedFile)) {
                                const start = getTokenPosOfNode(file.imports[i], file);
                                fileProcessingDiagnostics.add(createFileDiagnostic(file, start, file.imports[i].end - start, Diagnostics.Exported_external_package_typings_file_0_is_not_a_module_Please_contact_the_package_author_to_update_the_package_definition, importedFile.fileName));
                            }
                            else if (importedFile.referencedFiles.length) {
                                const firstRef = importedFile.referencedFiles[0];
                                fileProcessingDiagnostics.add(createFileDiagnostic(importedFile, firstRef.pos, firstRef.end - firstRef.pos, Diagnostics.Exported_external_package_typings_file_cannot_contain_tripleslash_references_Please_contact_the_package_author_to_update_the_package_definition));
                            }
                        }
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
            let commonPathComponents: string[];
            const failed = forEach(files, sourceFile => {
                // Each file contributes into common source file path
                if (isDeclarationFile(sourceFile)) {
                    return;
                }

                const sourcePathComponents = getNormalizedPathComponents(sourceFile.fileName, currentDirectory);
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
                    for (const subst of options.paths[key]) {
                        if (!hasZeroOrOneAsteriskCharacter(subst)) {
                            programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Substitution_0_in_pattern_1_in_can_have_at_most_one_Asterisk_character, subst, key));
                        }
                    }
                }
            }

            if (options.inlineSources) {
                if (!options.sourceMap && !options.inlineSourceMap) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_inlineSources_can_only_be_used_when_either_option_inlineSourceMap_or_option_sourceMap_is_provided));
                }
                if (options.sourceRoot) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "sourceRoot", "inlineSources"));
                }
            }

            if (options.out && options.outFile) {
                programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "out", "outFile"));
            }

            if (!options.sourceMap && (options.mapRoot || options.sourceRoot)) {
                // Error to specify --mapRoot or --sourceRoot without mapSourceFiles
                if (options.mapRoot) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "mapRoot", "sourceMap"));
                }
                if (options.sourceRoot && !options.inlineSourceMap) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "sourceRoot", "sourceMap"));
                }
            }

            const languageVersion = options.target || ScriptTarget.ES3;
            const outFile = options.outFile || options.out;

            const firstExternalModuleSourceFile = forEach(files, f => isExternalModule(f) ? f : undefined);
            if (options.isolatedModules) {
                if (!options.module && languageVersion < ScriptTarget.ES6) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_isolatedModules_can_only_be_used_when_either_option_module_is_provided_or_option_target_is_ES2015_or_higher));
                }

                const firstNonExternalModuleSourceFile = forEach(files, f => !isExternalModule(f) && !isDeclarationFile(f) ? f : undefined);
                if (firstNonExternalModuleSourceFile) {
                    const span = getErrorSpanForNode(firstNonExternalModuleSourceFile, firstNonExternalModuleSourceFile);
                    programDiagnostics.add(createFileDiagnostic(firstNonExternalModuleSourceFile, span.start, span.length, Diagnostics.Cannot_compile_namespaces_when_the_isolatedModules_flag_is_provided));
                }
            }
            else if (firstExternalModuleSourceFile && languageVersion < ScriptTarget.ES6 && !options.module) {
                // We cannot use createDiagnosticFromNode because nodes do not have parents yet
                const span = getErrorSpanForNode(firstExternalModuleSourceFile, firstExternalModuleSourceFile.externalModuleIndicator);
                programDiagnostics.add(createFileDiagnostic(firstExternalModuleSourceFile, span.start, span.length, Diagnostics.Cannot_compile_modules_unless_the_module_flag_is_provided_Consider_setting_the_module_compiler_option_in_a_tsconfig_json_file));
            }

            // Cannot specify module gen target of es6 when below es6
            if (options.module === ModuleKind.ES6 && languageVersion < ScriptTarget.ES6) {
                programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Cannot_compile_modules_into_es2015_when_targeting_ES5_or_lower));
            }

            // Cannot specify module gen that isn't amd or system with --out
            if (outFile && options.module && !(options.module === ModuleKind.AMD || options.module === ModuleKind.System)) {
                programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Only_amd_and_system_modules_are_supported_alongside_0, options.out ? "out" : "outFile"));
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

            if (options.noEmit) {
                if (options.out) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "noEmit", "out"));
                }

                if (options.outFile) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "noEmit", "outFile"));
                }

                if (options.outDir) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "noEmit", "outDir"));
                }

                if (options.declaration) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "noEmit", "declaration"));
                }
            }
            else if (options.allowJs && options.declaration) {
                programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "allowJs", "declaration"));
            }

            if (options.emitDecoratorMetadata &&
                !options.experimentalDecorators) {
                programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "emitDecoratorMetadata", "experimentalDecorators"));
            }

            if (options.reactNamespace && !isIdentifier(options.reactNamespace, languageVersion)) {
                programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Invalide_value_for_reactNamespace_0_is_not_a_valid_identifier, options.reactNamespace));
            }

            // If the emit is enabled make sure that every output file is unique and not overwriting any of the input files
            if (!options.noEmit) {
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
