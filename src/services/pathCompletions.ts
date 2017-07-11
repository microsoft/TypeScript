/* @internal */
namespace ts.Completions.PathCompletions {
    export function getStringLiteralCompletionEntriesFromModuleNames(node: StringLiteral, compilerOptions: CompilerOptions, host: LanguageServiceHost, typeChecker: TypeChecker): CompletionInfo {
        const literalValue = normalizeSlashes(node.text);

        const scriptPath = node.getSourceFile().path;
        const scriptDirectory = getDirectoryPath(scriptPath);

        const span = getDirectoryFragmentTextSpan((<StringLiteral>node).text, node.getStart() + 1);
        let entries: CompletionEntry[];
        if (isPathRelativeToScript(literalValue) || isRootedDiskPath(literalValue)) {
            const extensions = getSupportedExtensions(compilerOptions);
            if (compilerOptions.rootDirs) {
                entries = getCompletionEntriesForDirectoryFragmentWithRootDirs(
                    compilerOptions.rootDirs, literalValue, scriptDirectory, extensions, /*includeExtensions*/ false, span, compilerOptions, host, scriptPath);
            }
            else {
                entries = getCompletionEntriesForDirectoryFragment(
                    literalValue, scriptDirectory, extensions, /*includeExtensions*/ false, span, host, scriptPath);
            }
        }
        else {
            // Check for node modules
            entries = getCompletionEntriesForNonRelativeModules(literalValue, scriptDirectory, span, compilerOptions, host, typeChecker);
        }
        return {
            isGlobalCompletion: false,
            isMemberCompletion: false,
            isNewIdentifierLocation: true,
            entries
        };
    }

    /**
     * Takes a script path and returns paths for all potential folders that could be merged with its
     * containing folder via the "rootDirs" compiler option
     */
    function getBaseDirectoriesFromRootDirs(rootDirs: string[], basePath: string, scriptPath: string, ignoreCase: boolean): string[] {
        // Make all paths absolute/normalized if they are not already
        rootDirs = map(rootDirs, rootDirectory => normalizePath(isRootedDiskPath(rootDirectory) ? rootDirectory : combinePaths(basePath, rootDirectory)));

        // Determine the path to the directory containing the script relative to the root directory it is contained within
        const relativeDirectory = forEach(rootDirs, rootDirectory =>
            containsPath(rootDirectory, scriptPath, basePath, ignoreCase) ? scriptPath.substr(rootDirectory.length) : undefined);

        // Now find a path for each potential directory that is to be merged with the one containing the script
        return deduplicate(map(rootDirs, rootDirectory => combinePaths(rootDirectory, relativeDirectory)));
    }

    function getCompletionEntriesForDirectoryFragmentWithRootDirs(rootDirs: string[], fragment: string, scriptPath: string, extensions: string[], includeExtensions: boolean, span: TextSpan, compilerOptions: CompilerOptions, host: LanguageServiceHost, exclude?: string): CompletionEntry[] {
        const basePath = compilerOptions.project || host.getCurrentDirectory();
        const ignoreCase = !(host.useCaseSensitiveFileNames && host.useCaseSensitiveFileNames());
        const baseDirectories = getBaseDirectoriesFromRootDirs(rootDirs, basePath, scriptPath, ignoreCase);

        const result: CompletionEntry[] = [];

        for (const baseDirectory of baseDirectories) {
            getCompletionEntriesForDirectoryFragment(fragment, baseDirectory, extensions, includeExtensions, span, host, exclude, result);
        }

        return result;
    }

    /**
     * Given a path ending at a directory, gets the completions for the path, and filters for those entries containing the basename.
     */
    function getCompletionEntriesForDirectoryFragment(fragment: string, scriptPath: string, extensions: string[], includeExtensions: boolean, span: TextSpan, host: LanguageServiceHost, exclude?: string, result: CompletionEntry[] = []): CompletionEntry[] {
        if (fragment === undefined) {
            fragment = "";
        }

        fragment = normalizeSlashes(fragment);

        /**
         * Remove the basename from the path. Note that we don't use the basename to filter completions;
         * the client is responsible for refining completions.
         */
        fragment = getDirectoryPath(fragment);

        if (fragment === "") {
            fragment = "." + directorySeparator;
        }

        fragment = ensureTrailingDirectorySeparator(fragment);

        const absolutePath = normalizeAndPreserveTrailingSlash(isRootedDiskPath(fragment) ? fragment : combinePaths(scriptPath, fragment));
        const baseDirectory = getDirectoryPath(absolutePath);
        const ignoreCase = !(host.useCaseSensitiveFileNames && host.useCaseSensitiveFileNames());

        if (tryDirectoryExists(host, baseDirectory)) {
            // Enumerate the available files if possible
            const files = tryReadDirectory(host, baseDirectory, extensions, /*exclude*/ undefined, /*include*/ ["./*"]);

            if (files) {
                /**
                 * Multiple file entries might map to the same truncated name once we remove extensions
                 * (happens iff includeExtensions === false)so we use a set-like data structure. Eg:
                 *
                 * both foo.ts and foo.tsx become foo
                 */
                const foundFiles = createMap<boolean>();
                for (let filePath of files) {
                    filePath = normalizePath(filePath);
                    if (exclude && comparePaths(filePath, exclude, scriptPath, ignoreCase) === Comparison.EqualTo) {
                        continue;
                    }

                    const foundFileName = includeExtensions ? getBaseFileName(filePath) : removeFileExtension(getBaseFileName(filePath));

                    if (!foundFiles.get(foundFileName)) {
                        foundFiles.set(foundFileName, true);
                    }
                }

                forEachKey(foundFiles, foundFile => {
                    result.push(createCompletionEntryForModule(foundFile, ScriptElementKind.scriptElement, span));
                });
            }

            // If possible, get folder completion as well
            const directories = tryGetDirectories(host, baseDirectory);

            if (directories) {
                for (const directory of directories) {
                    const directoryName = getBaseFileName(normalizePath(directory));

                    result.push(createCompletionEntryForModule(directoryName, ScriptElementKind.directory, span));
                }
            }
        }

        return result;
    }

    /**
     * Check all of the declared modules and those in node modules. Possible sources of modules:
     *      Modules that are found by the type checker
     *      Modules found relative to "baseUrl" compliler options (including patterns from "paths" compiler option)
     *      Modules from node_modules (i.e. those listed in package.json)
     *          This includes all files that are found in node_modules/moduleName/ with acceptable file extensions
     */
    function getCompletionEntriesForNonRelativeModules(fragment: string, scriptPath: string, span: TextSpan, compilerOptions: CompilerOptions, host: LanguageServiceHost, typeChecker: TypeChecker): CompletionEntry[] {
        const { baseUrl, paths } = compilerOptions;

        let result: CompletionEntry[];

        if (baseUrl) {
            const fileExtensions = getSupportedExtensions(compilerOptions);
            const projectDir = compilerOptions.project || host.getCurrentDirectory();
            const absolute = isRootedDiskPath(baseUrl) ? baseUrl : combinePaths(projectDir, baseUrl);
            result = getCompletionEntriesForDirectoryFragment(fragment, normalizePath(absolute), fileExtensions, /*includeExtensions*/ false, span, host);

            if (paths) {
                for (const path in paths) {
                    if (paths.hasOwnProperty(path)) {
                        if (path === "*") {
                            if (paths[path]) {
                                for (const pattern of paths[path]) {
                                    for (const match of getModulesForPathsPattern(fragment, baseUrl, pattern, fileExtensions, host)) {
                                        result.push(createCompletionEntryForModule(match, ScriptElementKind.externalModuleName, span));
                                    }
                                }
                            }
                        }
                        else if (startsWith(path, fragment)) {
                            const entry = paths[path] && paths[path].length === 1 && paths[path][0];
                            if (entry) {
                                result.push(createCompletionEntryForModule(path, ScriptElementKind.externalModuleName, span));
                            }
                        }
                    }
                }
            }
        }
        else {
            result = [];
        }

        getCompletionEntriesFromTypings(host, compilerOptions, scriptPath, span, result);

        for (const moduleName of enumeratePotentialNonRelativeModules(fragment, scriptPath, compilerOptions, typeChecker, host)) {
            result.push(createCompletionEntryForModule(moduleName, ScriptElementKind.externalModuleName, span));
        }

        return result;
    }

    function getModulesForPathsPattern(fragment: string, baseUrl: string, pattern: string, fileExtensions: string[], host: LanguageServiceHost): string[] {
        if (host.readDirectory) {
            const parsed = hasZeroOrOneAsteriskCharacter(pattern) ? tryParsePattern(pattern) : undefined;
            if (parsed) {
                // The prefix has two effective parts: the directory path and the base component after the filepath that is not a
                // full directory component. For example: directory/path/of/prefix/base*
                const normalizedPrefix = normalizeAndPreserveTrailingSlash(parsed.prefix);
                const normalizedPrefixDirectory = getDirectoryPath(normalizedPrefix);
                const normalizedPrefixBase = getBaseFileName(normalizedPrefix);

                const fragmentHasPath = fragment.indexOf(directorySeparator) !== -1;

                // Try and expand the prefix to include any path from the fragment so that we can limit the readDirectory call
                const expandedPrefixDirectory = fragmentHasPath ? combinePaths(normalizedPrefixDirectory, normalizedPrefixBase + getDirectoryPath(fragment)) : normalizedPrefixDirectory;

                const normalizedSuffix = normalizePath(parsed.suffix);
                const baseDirectory = combinePaths(baseUrl, expandedPrefixDirectory);
                const completePrefix = fragmentHasPath ? baseDirectory : ensureTrailingDirectorySeparator(baseDirectory) + normalizedPrefixBase;

                // If we have a suffix, then we need to read the directory all the way down. We could create a glob
                // that encodes the suffix, but we would have to escape the character "?" which readDirectory
                // doesn't support. For now, this is safer but slower
                const includeGlob = normalizedSuffix ? "**/*" : "./*";

                const matches = tryReadDirectory(host, baseDirectory, fileExtensions, /*exclude*/ undefined, [includeGlob]);
                if (matches) {
                    const result: string[] = [];

                    // Trim away prefix and suffix
                    for (const match of matches) {
                        const normalizedMatch = normalizePath(match);
                        if (!endsWith(normalizedMatch, normalizedSuffix) || !startsWith(normalizedMatch, completePrefix)) {
                            continue;
                        }

                        const start = completePrefix.length;
                        const length = normalizedMatch.length - start - normalizedSuffix.length;

                        result.push(removeFileExtension(normalizedMatch.substr(start, length)));
                    }
                    return result;
                }
            }
        }

        return undefined;
    }

    function enumeratePotentialNonRelativeModules(fragment: string, scriptPath: string, options: CompilerOptions, typeChecker: TypeChecker, host: LanguageServiceHost): string[] {
        // Check If this is a nested module
        const isNestedModule = fragment.indexOf(directorySeparator) !== -1;
        const moduleNameFragment = isNestedModule ? fragment.substr(0, fragment.lastIndexOf(directorySeparator)) : undefined;

        // Get modules that the type checker picked up
        const ambientModules = map(typeChecker.getAmbientModules(), sym => stripQuotes(unescapeLeadingUnderscores(sym.name)));
        let nonRelativeModuleNames = filter(ambientModules, moduleName => startsWith(moduleName, fragment));

        // Nested modules of the form "module-name/sub" need to be adjusted to only return the string
        // after the last '/' that appears in the fragment because that's where the replacement span
        // starts
        if (isNestedModule) {
            const moduleNameWithSeperator = ensureTrailingDirectorySeparator(moduleNameFragment);
            nonRelativeModuleNames = map(nonRelativeModuleNames, nonRelativeModuleName => {
                return removePrefix(nonRelativeModuleName, moduleNameWithSeperator);
            });
        }


        if (!options.moduleResolution || options.moduleResolution === ModuleResolutionKind.NodeJs) {
            for (const visibleModule of enumerateNodeModulesVisibleToScript(host, scriptPath)) {
                if (!isNestedModule) {
                    nonRelativeModuleNames.push(visibleModule.moduleName);
                }
                else if (startsWith(visibleModule.moduleName, moduleNameFragment)) {
                    const nestedFiles = tryReadDirectory(host, visibleModule.moduleDir, supportedTypeScriptExtensions, /*exclude*/ undefined, /*include*/ ["./*"]);
                    if (nestedFiles) {
                        for (let f of nestedFiles) {
                            f = normalizePath(f);
                            const nestedModule = removeFileExtension(getBaseFileName(f));
                            nonRelativeModuleNames.push(nestedModule);
                        }
                    }
                }
            }
        }

        return deduplicate(nonRelativeModuleNames);
    }

    export function getTripleSlashReferenceCompletion(sourceFile: SourceFile, position: number, compilerOptions: CompilerOptions, host: LanguageServiceHost): CompletionInfo {
        const token = getTokenAtPosition(sourceFile, position, /*includeJsDocComment*/ false);
        if (!token) {
            return undefined;
        }
        const commentRanges: CommentRange[] = getLeadingCommentRanges(sourceFile.text, token.pos);

        if (!commentRanges || !commentRanges.length) {
            return undefined;
        }

        const range = forEach(commentRanges, commentRange => position >= commentRange.pos && position <= commentRange.end && commentRange);

        if (!range) {
            return undefined;
        }

        const completionInfo: CompletionInfo = {
            /**
             * We don't want the editor to offer any other completions, such as snippets, inside a comment.
             */
            isGlobalCompletion: false,
            isMemberCompletion: false,
            /**
             * The user may type in a path that doesn't yet exist, creating a "new identifier"
             * with respect to the collection of identifiers the server is aware of.
             */
            isNewIdentifierLocation: true,

            entries: []
        };

        const text = sourceFile.text.substr(range.pos, position - range.pos);

        const match = tripleSlashDirectiveFragmentRegex.exec(text);

        if (match) {
            const prefix = match[1];
            const kind = match[2];
            const toComplete = match[3];

            const scriptPath = getDirectoryPath(sourceFile.path);
            if (kind === "path") {
                // Give completions for a relative path
                const span: TextSpan = getDirectoryFragmentTextSpan(toComplete, range.pos + prefix.length);
                completionInfo.entries = getCompletionEntriesForDirectoryFragment(toComplete, scriptPath, getSupportedExtensions(compilerOptions), /*includeExtensions*/ true, span, host, sourceFile.path);
            }
            else {
                // Give completions based on the typings available
                const span: TextSpan = { start: range.pos + prefix.length, length: match[0].length - prefix.length };
                completionInfo.entries = getCompletionEntriesFromTypings(host, compilerOptions, scriptPath, span);
            }
        }

        return completionInfo;
    }

    function getCompletionEntriesFromTypings(host: LanguageServiceHost, options: CompilerOptions, scriptPath: string, span: TextSpan, result: CompletionEntry[] = []): CompletionEntry[] {
        // Check for typings specified in compiler options
        if (options.types) {
            for (const moduleName of options.types) {
                result.push(createCompletionEntryForModule(moduleName, ScriptElementKind.externalModuleName, span));
            }
        }
        else if (host.getDirectories) {
            let typeRoots: string[];
            try {
                // Wrap in try catch because getEffectiveTypeRoots touches the filesystem
                typeRoots = getEffectiveTypeRoots(options, host);
            }
            catch (e) {}

            if (typeRoots) {
                for (const root of typeRoots) {
                    getCompletionEntriesFromDirectories(host, root, span, result);
                }
            }
        }

        if (host.getDirectories) {
            // Also get all @types typings installed in visible node_modules directories
            for (const packageJson of findPackageJsons(scriptPath, host)) {
                const typesDir = combinePaths(getDirectoryPath(packageJson), "node_modules/@types");
                getCompletionEntriesFromDirectories(host, typesDir, span, result);
            }
        }

        return result;
    }

    function getCompletionEntriesFromDirectories(host: LanguageServiceHost, directory: string, span: TextSpan, result: Push<CompletionEntry>) {
        if (host.getDirectories && tryDirectoryExists(host, directory)) {
            const directories = tryGetDirectories(host, directory);
            if (directories) {
                for (let typeDirectory of directories) {
                    typeDirectory = normalizePath(typeDirectory);
                    result.push(createCompletionEntryForModule(getBaseFileName(typeDirectory), ScriptElementKind.externalModuleName, span));
                }
            }
        }
    }

    function findPackageJsons(currentDir: string, host: LanguageServiceHost): string[] {
        const paths: string[] = [];
        let currentConfigPath: string;
        while (true) {
            currentConfigPath = findConfigFile(currentDir, (f) => tryFileExists(host, f), "package.json");
            if (currentConfigPath) {
                paths.push(currentConfigPath);

                currentDir = getDirectoryPath(currentConfigPath);
                const parent = getDirectoryPath(currentDir);
                if (currentDir === parent) {
                    break;
                }
                currentDir = parent;
            }
            else {
                break;
            }
        }

        return paths;
    }

    function enumerateNodeModulesVisibleToScript(host: LanguageServiceHost, scriptPath: string) {
        const result: VisibleModuleInfo[] = [];

        if (host.readFile && host.fileExists) {
            for (const packageJson of findPackageJsons(scriptPath, host)) {
                const contents = tryReadingPackageJson(packageJson);
                if (!contents) {
                    return;
                }

                const nodeModulesDir = combinePaths(getDirectoryPath(packageJson), "node_modules");
                const foundModuleNames: string[] = [];

                // Provide completions for all non @types dependencies
                for (const key of nodeModulesDependencyKeys) {
                    addPotentialPackageNames(contents[key], foundModuleNames);
                }

                for (const moduleName of foundModuleNames) {
                    const moduleDir = combinePaths(nodeModulesDir, moduleName);
                    result.push({
                        moduleName,
                        moduleDir
                    });
                }
            }
        }

        return result;

        function tryReadingPackageJson(filePath: string) {
            try {
                const fileText = tryReadFile(host, filePath);
                return fileText ? JSON.parse(fileText) : undefined;
            }
            catch (e) {
                return undefined;
            }
        }

        function addPotentialPackageNames(dependencies: any, result: string[]) {
            if (dependencies) {
                for (const dep in dependencies) {
                    if (dependencies.hasOwnProperty(dep) && !startsWith(dep, "@types/")) {
                        result.push(dep);
                    }
                }
            }
        }
    }

    function createCompletionEntryForModule(name: string, kind: ScriptElementKind, replacementSpan: TextSpan): CompletionEntry {
        return { name, kind, kindModifiers: ScriptElementKindModifier.none, sortText: name, replacementSpan };
    }

    // Replace everything after the last directory seperator that appears
    function getDirectoryFragmentTextSpan(text: string, textStart: number): TextSpan {
        const index = text.lastIndexOf(directorySeparator);
        const offset = index !== -1 ? index + 1 : 0;
        return { start: textStart + offset, length: text.length - offset };
    }

    // Returns true if the path is explicitly relative to the script (i.e. relative to . or ..)
    function isPathRelativeToScript(path: string) {
        if (path && path.length >= 2 && path.charCodeAt(0) === CharacterCodes.dot) {
            const slashIndex = path.length >= 3 && path.charCodeAt(1) === CharacterCodes.dot ? 2 : 1;
            const slashCharCode = path.charCodeAt(slashIndex);
            return slashCharCode === CharacterCodes.slash || slashCharCode === CharacterCodes.backslash;
        }
        return false;
    }

    function normalizeAndPreserveTrailingSlash(path: string) {
        return hasTrailingDirectorySeparator(path) ? ensureTrailingDirectorySeparator(normalizePath(path)) : normalizePath(path);
    }

    /**
     * Matches a triple slash reference directive with an incomplete string literal for its path. Used
     * to determine if the caret is currently within the string literal and capture the literal fragment
     * for completions.
     * For example, this matches
     *
     * /// <reference path="fragment
     *
     * but not
     *
     * /// <reference path="fragment"
     */
    const tripleSlashDirectiveFragmentRegex = /^(\/\/\/\s*<reference\s+(path|types)\s*=\s*(?:'|"))([^\3"]*)$/;

    interface VisibleModuleInfo {
        moduleName: string;
        moduleDir: string;
    }

    const nodeModulesDependencyKeys = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"];

    function tryGetDirectories(host: LanguageServiceHost, directoryName: string): string[] {
        return tryIOAndConsumeErrors(host, host.getDirectories, directoryName);
    }

    function tryReadDirectory(host: LanguageServiceHost, path: string, extensions?: string[], exclude?: string[], include?: string[]): string[] {
        return tryIOAndConsumeErrors(host, host.readDirectory, path, extensions, exclude, include);
    }

    function tryReadFile(host: LanguageServiceHost, path: string): string {
        return tryIOAndConsumeErrors(host, host.readFile, path);
    }

    function tryFileExists(host: LanguageServiceHost, path: string): boolean {
        return tryIOAndConsumeErrors(host, host.fileExists, path);
    }

    function tryDirectoryExists(host: LanguageServiceHost, path: string): boolean {
        try {
            return directoryProbablyExists(path, host);
        }
        catch (e) {}
        return undefined;
    }

    function tryIOAndConsumeErrors<T>(host: LanguageServiceHost, toApply: (...a: any[]) => T, ...args: any[]) {
        try {
            return toApply && toApply.apply(host, args);
        }
        catch (e) {}
        return undefined;
    }
}
