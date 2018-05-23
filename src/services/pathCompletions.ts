/* @internal */
namespace ts.Completions.PathCompletions {
    export interface NameAndKind {
        readonly name: string;
        readonly kind: ScriptElementKind.scriptElement | ScriptElementKind.directory | ScriptElementKind.externalModuleName;
    }
    export interface PathCompletion extends NameAndKind {
        readonly span: TextSpan | undefined;
    }

    function nameAndKind(name: string, kind: NameAndKind["kind"]): NameAndKind {
        return { name, kind };
    }
    function addReplacementSpans(text: string, textStart: number, names: ReadonlyArray<NameAndKind>): ReadonlyArray<PathCompletion> {
        const span = getDirectoryFragmentTextSpan(text, textStart);
        return names.map(({ name, kind }): PathCompletion => ({ name, kind, span }));
    }

    export function getStringLiteralCompletionsFromModuleNames(sourceFile: SourceFile, node: LiteralExpression, compilerOptions: CompilerOptions, host: LanguageServiceHost, typeChecker: TypeChecker): ReadonlyArray<PathCompletion> {
        return addReplacementSpans(node.text, node.getStart(sourceFile) + 1, getStringLiteralCompletionsFromModuleNamesWorker(node, compilerOptions, host, typeChecker));
    }

    function getStringLiteralCompletionsFromModuleNamesWorker(node: LiteralExpression, compilerOptions: CompilerOptions, host: LanguageServiceHost, typeChecker: TypeChecker): ReadonlyArray<NameAndKind> {
        const literalValue = normalizeSlashes(node.text);

        const scriptPath = node.getSourceFile().path;
        const scriptDirectory = getDirectoryPath(scriptPath);

        if (isPathRelativeToScript(literalValue) || isRootedDiskPath(literalValue)) {
            const extensions = getSupportedExtensionsForModuleResolution(compilerOptions);
            if (compilerOptions.rootDirs) {
                return getCompletionEntriesForDirectoryFragmentWithRootDirs(
                    compilerOptions.rootDirs, literalValue, scriptDirectory, extensions, /*includeExtensions*/ false, compilerOptions, host, scriptPath);
            }
            else {
                return getCompletionEntriesForDirectoryFragment(literalValue, scriptDirectory, extensions, /*includeExtensions*/ false, host, scriptPath);
            }
        }
        else {
            // Check for node modules
            return getCompletionEntriesForNonRelativeModules(literalValue, scriptDirectory, compilerOptions, host, typeChecker);
        }
    }

    function getSupportedExtensionsForModuleResolution(compilerOptions: CompilerOptions) {
        const extensions = getSupportedExtensions(compilerOptions);
        return compilerOptions.resolveJsonModule && getEmitModuleResolutionKind(compilerOptions) === ModuleResolutionKind.NodeJs ?
            extensions.concat(Extension.Json) :
            extensions;
    }

    /**
     * Takes a script path and returns paths for all potential folders that could be merged with its
     * containing folder via the "rootDirs" compiler option
     */
    function getBaseDirectoriesFromRootDirs(rootDirs: string[], basePath: string, scriptPath: string, ignoreCase: boolean): string[] {
        // Make all paths absolute/normalized if they are not already
        rootDirs = rootDirs.map(rootDirectory => normalizePath(isRootedDiskPath(rootDirectory) ? rootDirectory : combinePaths(basePath, rootDirectory)));

        // Determine the path to the directory containing the script relative to the root directory it is contained within
        const relativeDirectory = firstDefined(rootDirs, rootDirectory =>
            containsPath(rootDirectory, scriptPath, basePath, ignoreCase) ? scriptPath.substr(rootDirectory.length) : undefined);

        // Now find a path for each potential directory that is to be merged with the one containing the script
        return deduplicate(
            rootDirs.map(rootDirectory => combinePaths(rootDirectory, relativeDirectory)),
            equateStringsCaseSensitive,
            compareStringsCaseSensitive);
    }

    function getCompletionEntriesForDirectoryFragmentWithRootDirs(rootDirs: string[], fragment: string, scriptPath: string, extensions: ReadonlyArray<string>, includeExtensions: boolean, compilerOptions: CompilerOptions, host: LanguageServiceHost, exclude?: string): NameAndKind[] {
        const basePath = compilerOptions.project || host.getCurrentDirectory();
        const ignoreCase = !(host.useCaseSensitiveFileNames && host.useCaseSensitiveFileNames());
        const baseDirectories = getBaseDirectoriesFromRootDirs(rootDirs, basePath, scriptPath, ignoreCase);

        const result: NameAndKind[] = [];

        for (const baseDirectory of baseDirectories) {
            getCompletionEntriesForDirectoryFragment(fragment, baseDirectory, extensions, includeExtensions, host, exclude, result);
        }

        return result;
    }

    /**
     * Given a path ending at a directory, gets the completions for the path, and filters for those entries containing the basename.
     */
    function getCompletionEntriesForDirectoryFragment(fragment: string, scriptPath: string, extensions: ReadonlyArray<string>, includeExtensions: boolean, host: LanguageServiceHost, exclude?: string, result: NameAndKind[] = []): NameAndKind[] {
        if (fragment === undefined) {
            fragment = "";
        }

        fragment = normalizeSlashes(fragment);

        /**
         * Remove the basename from the path. Note that we don't use the basename to filter completions;
         * the client is responsible for refining completions.
         */
        if (!hasTrailingDirectorySeparator(fragment)) {
            fragment = getDirectoryPath(fragment);
        }

        if (fragment === "") {
            fragment = "." + directorySeparator;
        }

        fragment = ensureTrailingDirectorySeparator(fragment);

        // const absolutePath = normalizeAndPreserveTrailingSlash(isRootedDiskPath(fragment) ? fragment : combinePaths(scriptPath, fragment)); // TODO(rbuckton): should use resolvePaths
        const absolutePath = resolvePath(scriptPath, fragment);
        const baseDirectory = hasTrailingDirectorySeparator(absolutePath) ? absolutePath : getDirectoryPath(absolutePath);
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
                const foundFiles = createMap<true>();
                for (let filePath of files) {
                    filePath = normalizePath(filePath);
                    if (exclude && comparePaths(filePath, exclude, scriptPath, ignoreCase) === Comparison.EqualTo) {
                        continue;
                    }

                    const foundFileName = includeExtensions || fileExtensionIs(filePath, Extension.Json) ? getBaseFileName(filePath) : removeFileExtension(getBaseFileName(filePath));

                    if (!foundFiles.has(foundFileName)) {
                        foundFiles.set(foundFileName, true);
                    }
                }

                forEachKey(foundFiles, foundFile => {
                    result.push(nameAndKind(foundFile, ScriptElementKind.scriptElement));
                });
            }

            // If possible, get folder completion as well
            const directories = tryGetDirectories(host, baseDirectory);

            if (directories) {
                for (const directory of directories) {
                    const directoryName = getBaseFileName(normalizePath(directory));
                    if (directoryName !== "@types") {
                        result.push(nameAndKind(directoryName, ScriptElementKind.directory));
                    }
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
    function getCompletionEntriesForNonRelativeModules(fragment: string, scriptPath: string, compilerOptions: CompilerOptions, host: LanguageServiceHost, typeChecker: TypeChecker): NameAndKind[] {
        const { baseUrl, paths } = compilerOptions;

        const result: NameAndKind[] = [];

        const fileExtensions = getSupportedExtensionsForModuleResolution(compilerOptions);
        if (baseUrl) {
            const projectDir = compilerOptions.project || host.getCurrentDirectory();
            const absolute = isRootedDiskPath(baseUrl) ? baseUrl : combinePaths(projectDir, baseUrl);
            getCompletionEntriesForDirectoryFragment(fragment, normalizePath(absolute), fileExtensions, /*includeExtensions*/ false, host, /*exclude*/ undefined, result);

            for (const path in paths) {
                const patterns = paths[path];
                if (paths.hasOwnProperty(path) && patterns) {
                    for (const { name, kind } of getCompletionsForPathMapping(path, patterns, fragment, baseUrl, fileExtensions, host)) {
                        // Path mappings may provide a duplicate way to get to something we've already added, so don't add again.
                        if (!result.some(entry => entry.name === name)) {
                            result.push(nameAndKind(name, kind));
                        }
                    }
                }
            }
        }

        const fragmentDirectory = containsSlash(fragment) ? hasTrailingDirectorySeparator(fragment) ? fragment : getDirectoryPath(fragment) : undefined;
        for (const ambientName of getAmbientModuleCompletions(fragment, fragmentDirectory, typeChecker)) {
            result.push(nameAndKind(ambientName, ScriptElementKind.externalModuleName));
        }

        getCompletionEntriesFromTypings(host, compilerOptions, scriptPath, result);

        if (getEmitModuleResolutionKind(compilerOptions) === ModuleResolutionKind.NodeJs) {
            // If looking for a global package name, don't just include everything in `node_modules` because that includes dependencies' own dependencies.
            // (But do if we didn't find anything, e.g. 'package.json' missing.)
            let foundGlobal = false;
            if (fragmentDirectory === undefined) {
                for (const moduleName of enumerateNodeModulesVisibleToScript(host, scriptPath)) {
                    if (!result.some(entry => entry.name === moduleName)) {
                        foundGlobal = true;
                        result.push(nameAndKind(moduleName, ScriptElementKind.externalModuleName));
                    }
                }
            }
            if (!foundGlobal) {
                forEachAncestorDirectory(scriptPath, ancestor => {
                    const nodeModules = combinePaths(ancestor, "node_modules");
                    if (tryDirectoryExists(host, nodeModules)) {
                        getCompletionEntriesForDirectoryFragment(fragment, nodeModules, fileExtensions, /*includeExtensions*/ false, host, /*exclude*/ undefined, result);
                    }
                });
            }
        }

        return result;
    }

    function getCompletionsForPathMapping(
        path: string, patterns: ReadonlyArray<string>, fragment: string, baseUrl: string, fileExtensions: ReadonlyArray<string>, host: LanguageServiceHost,
    ): ReadonlyArray<NameAndKind> {
        if (!endsWith(path, "*")) {
            // For a path mapping "foo": ["/x/y/z.ts"], add "foo" itself as a completion.
            return !stringContains(path, "*") && startsWith(path, fragment) ? [{ name: path, kind: ScriptElementKind.directory }] : emptyArray;
        }

        const pathPrefix = path.slice(0, path.length - 1);
        if (!startsWith(fragment, pathPrefix)) {
            return [{ name: pathPrefix, kind: ScriptElementKind.directory }];
        }

        const remainingFragment = fragment.slice(pathPrefix.length);
        return flatMap(patterns, pattern => getModulesForPathsPattern(remainingFragment, baseUrl, pattern, fileExtensions, host));
    }

    function getModulesForPathsPattern(fragment: string, baseUrl: string, pattern: string, fileExtensions: ReadonlyArray<string>, host: LanguageServiceHost): ReadonlyArray<NameAndKind> | undefined {
        if (!host.readDirectory) {
            return undefined;
        }

        const parsed = hasZeroOrOneAsteriskCharacter(pattern) ? tryParsePattern(pattern) : undefined;
        if (!parsed) {
            return undefined;
        }

        // The prefix has two effective parts: the directory path and the base component after the filepath that is not a
        // full directory component. For example: directory/path/of/prefix/base*
        const normalizedPrefix = resolvePath(parsed.prefix);
        const normalizedPrefixDirectory = hasTrailingDirectorySeparator(parsed.prefix) ? normalizedPrefix : getDirectoryPath(normalizedPrefix);
        const normalizedPrefixBase = hasTrailingDirectorySeparator(parsed.prefix) ? "" : getBaseFileName(normalizedPrefix);

        const fragmentHasPath = containsSlash(fragment);
        const fragmentDirectory = fragmentHasPath ? hasTrailingDirectorySeparator(fragment) ? fragment : getDirectoryPath(fragment) : undefined;

        // Try and expand the prefix to include any path from the fragment so that we can limit the readDirectory call
        const expandedPrefixDirectory = fragmentHasPath ? combinePaths(normalizedPrefixDirectory, normalizedPrefixBase + fragmentDirectory) : normalizedPrefixDirectory;

        const normalizedSuffix = normalizePath(parsed.suffix);
        // Need to normalize after combining: If we combinePaths("a", "../b"), we want "b" and not "a/../b".
        const baseDirectory = normalizePath(combinePaths(baseUrl, expandedPrefixDirectory));
        const completePrefix = fragmentHasPath ? baseDirectory : ensureTrailingDirectorySeparator(baseDirectory) + normalizedPrefixBase;

        // If we have a suffix, then we need to read the directory all the way down. We could create a glob
        // that encodes the suffix, but we would have to escape the character "?" which readDirectory
        // doesn't support. For now, this is safer but slower
        const includeGlob = normalizedSuffix ? "**/*" : "./*";

        const matches = tryReadDirectory(host, baseDirectory, fileExtensions, /*exclude*/ undefined, [includeGlob]).map<NameAndKind>(name => ({ name, kind: ScriptElementKind.scriptElement }));
        const directories = tryGetDirectories(host, baseDirectory).map(d => combinePaths(baseDirectory, d)).map<NameAndKind>(name => ({ name, kind: ScriptElementKind.directory }));

        // Trim away prefix and suffix
        return mapDefined<NameAndKind, NameAndKind>(concatenate(matches, directories), ({ name, kind }) => {
            const normalizedMatch = normalizePath(name);
            const inner = withoutStartAndEnd(normalizedMatch, completePrefix, normalizedSuffix);
            return inner !== undefined ? { name: removeLeadingDirectorySeparator(removeFileExtension(inner)), kind } : undefined;
        });
    }

    function withoutStartAndEnd(s: string, start: string, end: string): string | undefined {
        return startsWith(s, start) && endsWith(s, end) ? s.slice(start.length, s.length - end.length) : undefined;
    }

    function removeLeadingDirectorySeparator(path: string): string {
        return path[0] === directorySeparator ? path.slice(1) : path;
    }

    function getAmbientModuleCompletions(fragment: string, fragmentDirectory: string | undefined, checker: TypeChecker): ReadonlyArray<string> {
        // Get modules that the type checker picked up
        const ambientModules = checker.getAmbientModules().map(sym => stripQuotes(sym.name));
        const nonRelativeModuleNames = ambientModules.filter(moduleName => startsWith(moduleName, fragment));

        // Nested modules of the form "module-name/sub" need to be adjusted to only return the string
        // after the last '/' that appears in the fragment because that's where the replacement span
        // starts
        if (fragmentDirectory !== undefined) {
            const moduleNameWithSeperator = ensureTrailingDirectorySeparator(fragmentDirectory);
            return nonRelativeModuleNames.map(nonRelativeModuleName => removePrefix(nonRelativeModuleName, moduleNameWithSeperator));
        }
        return nonRelativeModuleNames;
    }

    export function getTripleSlashReferenceCompletion(sourceFile: SourceFile, position: number, compilerOptions: CompilerOptions, host: LanguageServiceHost): ReadonlyArray<PathCompletion> | undefined {
        const token = getTokenAtPosition(sourceFile, position, /*includeJsDocComment*/ false);
        const commentRanges = getLeadingCommentRanges(sourceFile.text, token.pos);
        const range = commentRanges && find(commentRanges, commentRange => position >= commentRange.pos && position <= commentRange.end);
        if (!range) {
            return undefined;
        }
        const text = sourceFile.text.slice(range.pos, position);
        const match = tripleSlashDirectiveFragmentRegex.exec(text);
        if (!match) {
            return undefined;
        }

        const [, prefix, kind, toComplete] = match;
        const scriptPath = getDirectoryPath(sourceFile.path);
        const names = kind === "path" ? getCompletionEntriesForDirectoryFragment(toComplete, scriptPath, getSupportedExtensions(compilerOptions), /*includeExtensions*/ true, host, sourceFile.path)
            : kind === "types" ? getCompletionEntriesFromTypings(host, compilerOptions, scriptPath)
            : undefined;
        return names && addReplacementSpans(toComplete, range.pos + prefix.length, names);
    }

    function getCompletionEntriesFromTypings(host: LanguageServiceHost, options: CompilerOptions, scriptPath: string, result: NameAndKind[] = []): NameAndKind[] {
        // Check for typings specified in compiler options
        const seen = createMap<true>();
        if (options.types) {
            for (const typesName of options.types) {
                const moduleName = getUnmangledNameForScopedPackage(typesName);
                pushResult(moduleName);
            }
        }
        else if (host.getDirectories) {
            let typeRoots: ReadonlyArray<string>;
            try {
                typeRoots = getEffectiveTypeRoots(options, host);
            }
            catch { /* Wrap in try catch because getEffectiveTypeRoots touches the filesystem */ }

            if (typeRoots) {
                for (const root of typeRoots) {
                    getCompletionEntriesFromDirectories(root);
                }
            }

            // Also get all @types typings installed in visible node_modules directories
            for (const packageJson of findPackageJsons(scriptPath, host)) {
                const typesDir = combinePaths(getDirectoryPath(packageJson), "node_modules/@types");
                getCompletionEntriesFromDirectories(typesDir);
            }
        }

        return result;

        function getCompletionEntriesFromDirectories(directory: string) {
            Debug.assert(!!host.getDirectories);
            if (tryDirectoryExists(host, directory)) {
                const directories = tryGetDirectories(host, directory);
                if (directories) {
                    for (let typeDirectory of directories) {
                        typeDirectory = normalizePath(typeDirectory);
                        const directoryName = getBaseFileName(typeDirectory);
                        const moduleName = getUnmangledNameForScopedPackage(directoryName);
                        pushResult(moduleName);
                    }
                }
            }
        }

        function pushResult(moduleName: string) {
            if (!seen.has(moduleName)) {
                result.push(nameAndKind(moduleName, ScriptElementKind.externalModuleName));
                seen.set(moduleName, true);
            }
        }
    }

    function findPackageJsons(directory: string, host: LanguageServiceHost): string[] {
        const paths: string[] = [];
        forEachAncestorDirectory(directory, ancestor => {
            const currentConfigPath = findConfigFile(ancestor, (f) => tryFileExists(host, f), "package.json");
            if (!currentConfigPath) {
                return true; // break out
            }
            paths.push(currentConfigPath);
        });
        return paths;
    }

    function enumerateNodeModulesVisibleToScript(host: LanguageServiceHost, scriptPath: string): ReadonlyArray<string> {
        if (!host.readFile || !host.fileExists) return emptyArray;

        const result: string[] = [];
        for (const packageJson of findPackageJsons(scriptPath, host)) {
            const contents = readJson(packageJson, host as { readFile: (filename: string) => string | undefined }); // Cast to assert that readFile is defined
            // Provide completions for all non @types dependencies
            for (const key of nodeModulesDependencyKeys) {
                const dependencies: object | undefined = (contents as any)[key];
                if (!dependencies) continue;
                for (const dep in dependencies) {
                    if (dependencies.hasOwnProperty(dep) && !startsWith(dep, "@types/")) {
                        result.push(dep);
                    }
                }
            }
        }
        return result;
    }

    // Replace everything after the last directory seperator that appears
    function getDirectoryFragmentTextSpan(text: string, textStart: number): TextSpan | undefined {
        const index = Math.max(text.lastIndexOf(directorySeparator), text.lastIndexOf("\\"));
        const offset = index !== -1 ? index + 1 : 0;
        // If the range is an identifier, span is unnecessary.
        const length = text.length - offset;
        return length === 0 || isIdentifierText(text.substr(offset, length), ScriptTarget.ESNext) ? undefined : createTextSpan(textStart + offset, length);
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

    const nodeModulesDependencyKeys = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"];

    function tryGetDirectories(host: LanguageServiceHost, directoryName: string): string[] {
        return tryIOAndConsumeErrors(host, host.getDirectories, directoryName) || [];
    }

    function tryReadDirectory(host: LanguageServiceHost, path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>): ReadonlyArray<string> {
        return tryIOAndConsumeErrors(host, host.readDirectory, path, extensions, exclude, include) || emptyArray;
    }

    function tryFileExists(host: LanguageServiceHost, path: string): boolean {
        return tryIOAndConsumeErrors(host, host.fileExists, path);
    }

    function tryDirectoryExists(host: LanguageServiceHost, path: string): boolean {
        try {
            return directoryProbablyExists(path, host);
        }
        catch { /*ignore*/ }
        return undefined;
    }

    function tryIOAndConsumeErrors<T>(host: LanguageServiceHost, toApply: (...a: any[]) => T, ...args: any[]) {
        try {
            return toApply && toApply.apply(host, args);
        }
        catch { /*ignore*/ }
        return undefined;
    }

    function containsSlash(fragment: string) {
        return stringContains(fragment, directorySeparator);
    }
}
