/// <reference path='../compiler/utilities.ts' />

/* @internal */
namespace ts.Completions {
    export function getCompletionsAtPosition(host: LanguageServiceHost, typeChecker: TypeChecker, log: (message: string) => void, compilerOptions: CompilerOptions, sourceFile: SourceFile, position: number): CompletionInfo {
        if (isInReferenceComment(sourceFile, position)) {
            return getTripleSlashReferenceCompletion(sourceFile, position);
        }

        if (isInString(sourceFile, position)) {
            return getStringLiteralCompletionEntries(sourceFile, position);
        }

        const completionData = getCompletionData(typeChecker, log, sourceFile, position);
        if (!completionData) {
            return undefined;
        }

        const { symbols, isGlobalCompletion, isMemberCompletion, isNewIdentifierLocation, location, isJsDocTagName } = completionData;

        if (isJsDocTagName) {
            // If the current position is a jsDoc tag name, only tag names should be provided for completion
            return { isGlobalCompletion: false, isMemberCompletion: false, isNewIdentifierLocation: false, entries: JsDoc.getAllJsDocCompletionEntries() };
        }

        const entries: CompletionEntry[] = [];

        if (isSourceFileJavaScript(sourceFile)) {
            const uniqueNames = getCompletionEntriesFromSymbols(symbols, entries, location, /*performCharacterChecks*/ true);
            addRange(entries, getJavaScriptCompletionEntries(sourceFile, location.pos, uniqueNames));
        }
        else {
            if (!symbols || symbols.length === 0) {
                if (sourceFile.languageVariant === LanguageVariant.JSX &&
                    location.parent && location.parent.kind === SyntaxKind.JsxClosingElement) {
                    // In the TypeScript JSX element, if such element is not defined. When users query for completion at closing tag,
                    // instead of simply giving unknown value, the completion will return the tag-name of an associated opening-element.
                    // For example:
                    //     var x = <div> </ /*1*/>  completion list at "1" will contain "div" with type any
                    const tagName = (<JsxElement>location.parent.parent).openingElement.tagName;
                    entries.push({
                        name: (<Identifier>tagName).text,
                        kind: undefined,
                        kindModifiers: undefined,
                        sortText: "0",
                    });
                }
                else {
                    return undefined;
                }
            }

            getCompletionEntriesFromSymbols(symbols, entries, location, /*performCharacterChecks*/ true);
        }

        // Add keywords if this is not a member completion list
        if (!isMemberCompletion && !isJsDocTagName) {
            addRange(entries, keywordCompletions);
        }

        return { isGlobalCompletion, isMemberCompletion, isNewIdentifierLocation: isNewIdentifierLocation, entries };

        function getJavaScriptCompletionEntries(sourceFile: SourceFile, position: number, uniqueNames: Map<string>): CompletionEntry[] {
            const entries: CompletionEntry[] = [];

            const nameTable = getNameTable(sourceFile);
            for (const name in nameTable) {
                // Skip identifiers produced only from the current location
                if (nameTable[name] === position) {
                    continue;
                }

                if (!uniqueNames[name]) {
                    uniqueNames[name] = name;
                    const displayName = getCompletionEntryDisplayName(unescapeIdentifier(name), compilerOptions.target, /*performCharacterChecks*/ true);
                    if (displayName) {
                        const entry = {
                            name: displayName,
                            kind: ScriptElementKind.warning,
                            kindModifiers: "",
                            sortText: "1"
                        };
                        entries.push(entry);
                    }
                }
            }

            return entries;
        }

        function createCompletionEntry(symbol: Symbol, location: Node, performCharacterChecks: boolean): CompletionEntry {
            // Try to get a valid display name for this symbol, if we could not find one, then ignore it.
            // We would like to only show things that can be added after a dot, so for instance numeric properties can
            // not be accessed with a dot (a.1 <- invalid)
            const displayName = getCompletionEntryDisplayNameForSymbol(typeChecker, symbol, compilerOptions.target, performCharacterChecks, location);
            if (!displayName) {
                return undefined;
            }

            // TODO(drosen): Right now we just permit *all* semantic meanings when calling
            // 'getSymbolKind' which is permissible given that it is backwards compatible; but
            // really we should consider passing the meaning for the node so that we don't report
            // that a suggestion for a value is an interface.  We COULD also just do what
            // 'getSymbolModifiers' does, which is to use the first declaration.

            // Use a 'sortText' of 0' so that all symbol completion entries come before any other
            // entries (like JavaScript identifier entries).
            return {
                name: displayName,
                kind: SymbolDisplay.getSymbolKind(typeChecker, symbol, location),
                kindModifiers: SymbolDisplay.getSymbolModifiers(symbol),
                sortText: "0",
            };

        }

        function getCompletionEntriesFromSymbols(symbols: Symbol[], entries: CompletionEntry[], location: Node, performCharacterChecks: boolean): Map<string> {
            const start = timestamp();
            const uniqueNames = createMap<string>();
            if (symbols) {
                for (const symbol of symbols) {
                    const entry = createCompletionEntry(symbol, location, performCharacterChecks);
                    if (entry) {
                        const id = escapeIdentifier(entry.name);
                        if (!uniqueNames[id]) {
                            entries.push(entry);
                            uniqueNames[id] = id;
                        }
                    }
                }
            }

            log("getCompletionsAtPosition: getCompletionEntriesFromSymbols: " + (timestamp() - start));
            return uniqueNames;
        }

        function getStringLiteralCompletionEntries(sourceFile: SourceFile, position: number) {
            const node = findPrecedingToken(position, sourceFile);
            if (!node || node.kind !== SyntaxKind.StringLiteral) {
                return undefined;
            }

            if (node.parent.kind === SyntaxKind.PropertyAssignment &&
                node.parent.parent.kind === SyntaxKind.ObjectLiteralExpression &&
                (<PropertyAssignment>node.parent).name === node) {
                // Get quoted name of properties of the object literal expression
                // i.e. interface ConfigFiles {
                //          'jspm:dev': string
                //      }
                //      let files: ConfigFiles = {
                //          '/*completion position*/'
                //      }
                //
                //      function foo(c: ConfigFiles) {}
                //      foo({
                //          '/*completion position*/'
                //      });
                return getStringLiteralCompletionEntriesFromPropertyAssignment(<ObjectLiteralElement>node.parent);
            }
            else if (isElementAccessExpression(node.parent) && node.parent.argumentExpression === node) {
                // Get all names of properties on the expression
                // i.e. interface A {
                //      'prop1': string
                // }
                // let a: A;
                // a['/*completion position*/']
                return getStringLiteralCompletionEntriesFromElementAccess(node.parent);
            }
            else if (node.parent.kind === SyntaxKind.ImportDeclaration || isExpressionOfExternalModuleImportEqualsDeclaration(node) || isRequireCall(node.parent, false)) {
                // Get all known external module names or complete a path to a module
                // i.e. import * as ns from "/*completion position*/";
                //      import x = require("/*completion position*/");
                //      var y = require("/*completion position*/");
                return getStringLiteralCompletionEntriesFromModuleNames(<StringLiteral>node);
            }
            else {
                const argumentInfo = SignatureHelp.getContainingArgumentInfo(node, position, sourceFile);
                if (argumentInfo) {
                    // Get string literal completions from specialized signatures of the target
                    // i.e. declare function f(a: 'A');
                    // f("/*completion position*/")
                    return getStringLiteralCompletionEntriesFromCallExpression(argumentInfo);
                }

                // Get completion for string literal from string literal type
                // i.e. var x: "hi" | "hello" = "/*completion position*/"
                return getStringLiteralCompletionEntriesFromContextualType(<StringLiteral>node);
            }
        }

        function getStringLiteralCompletionEntriesFromPropertyAssignment(element: ObjectLiteralElement) {
            const type = typeChecker.getContextualType((<ObjectLiteralExpression>element.parent));
            const entries: CompletionEntry[] = [];
            if (type) {
                getCompletionEntriesFromSymbols(type.getApparentProperties(), entries, element, /*performCharacterChecks*/false);
                if (entries.length) {
                    return { isGlobalCompletion: false, isMemberCompletion: true, isNewIdentifierLocation: true, entries };
                }
            }
        }

        function getStringLiteralCompletionEntriesFromCallExpression(argumentInfo: SignatureHelp.ArgumentListInfo) {
            const candidates: Signature[] = [];
            const entries: CompletionEntry[] = [];

            typeChecker.getResolvedSignature(argumentInfo.invocation, candidates);

            for (const candidate of candidates) {
                if (candidate.parameters.length > argumentInfo.argumentIndex) {
                    const parameter = candidate.parameters[argumentInfo.argumentIndex];
                    addStringLiteralCompletionsFromType(typeChecker.getTypeAtLocation(parameter.valueDeclaration), entries);
                }
            }

            if (entries.length) {
                return { isGlobalCompletion: false, isMemberCompletion: false, isNewIdentifierLocation: true, entries };
            }

            return undefined;
        }

        function getStringLiteralCompletionEntriesFromElementAccess(node: ElementAccessExpression) {
            const type = typeChecker.getTypeAtLocation(node.expression);
            const entries: CompletionEntry[] = [];
            if (type) {
                getCompletionEntriesFromSymbols(type.getApparentProperties(), entries, node, /*performCharacterChecks*/false);
                if (entries.length) {
                    return { isGlobalCompletion: false, isMemberCompletion: true, isNewIdentifierLocation: true, entries };
                }
            }
            return undefined;
        }

        function getStringLiteralCompletionEntriesFromContextualType(node: StringLiteral) {
            const type = typeChecker.getContextualType(node);
            if (type) {
                const entries: CompletionEntry[] = [];
                addStringLiteralCompletionsFromType(type, entries);
                if (entries.length) {
                    return { isGlobalCompletion: false, isMemberCompletion: false, isNewIdentifierLocation: false, entries };
                }
            }
            return undefined;
        }

        function addStringLiteralCompletionsFromType(type: Type, result: CompletionEntry[]): void {
            if (!type) {
                return;
            }
            if (type.flags & TypeFlags.Union) {
                forEach((<UnionType>type).types, t => addStringLiteralCompletionsFromType(t, result));
            }
            else {
                if (type.flags & TypeFlags.StringLiteral) {
                    result.push({
                        name: (<LiteralType>type).text,
                        kindModifiers: ScriptElementKindModifier.none,
                        kind: ScriptElementKind.variableElement,
                        sortText: "0"
                    });
                }
            }
        }

        function getStringLiteralCompletionEntriesFromModuleNames(node: StringLiteral): CompletionInfo {
            const literalValue = normalizeSlashes(node.text);

            const scriptPath = node.getSourceFile().path;
            const scriptDirectory = getDirectoryPath(scriptPath);

            const span = getDirectoryFragmentTextSpan((<StringLiteral>node).text, node.getStart() + 1);
            let entries: CompletionEntry[];
            if (isPathRelativeToScript(literalValue) || isRootedDiskPath(literalValue)) {
                if (compilerOptions.rootDirs) {
                    entries = getCompletionEntriesForDirectoryFragmentWithRootDirs(
                        compilerOptions.rootDirs, literalValue, scriptDirectory, getSupportedExtensions(compilerOptions), /*includeExtensions*/false, span, scriptPath);
                }
                else {
                    entries = getCompletionEntriesForDirectoryFragment(
                        literalValue, scriptDirectory, getSupportedExtensions(compilerOptions), /*includeExtensions*/false, span, scriptPath);
                }
            }
            else {
                // Check for node modules
                entries = getCompletionEntriesForNonRelativeModules(literalValue, scriptDirectory, span);
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
            let relativeDirectory: string;
            for (const rootDirectory of rootDirs) {
                if (containsPath(rootDirectory, scriptPath, basePath, ignoreCase)) {
                    relativeDirectory = scriptPath.substr(rootDirectory.length);
                    break;
                }
            }

            // Now find a path for each potential directory that is to be merged with the one containing the script
            return deduplicate(map(rootDirs, rootDirectory => combinePaths(rootDirectory, relativeDirectory)));
        }

        function getCompletionEntriesForDirectoryFragmentWithRootDirs(rootDirs: string[], fragment: string, scriptPath: string, extensions: string[], includeExtensions: boolean, span: TextSpan, exclude?: string): CompletionEntry[] {
            const basePath = compilerOptions.project || host.getCurrentDirectory();
            const ignoreCase = !(host.useCaseSensitiveFileNames && host.useCaseSensitiveFileNames());
            const baseDirectories = getBaseDirectoriesFromRootDirs(rootDirs, basePath, scriptPath, ignoreCase);

            const result: CompletionEntry[] = [];

            for (const baseDirectory of baseDirectories) {
                getCompletionEntriesForDirectoryFragment(fragment, baseDirectory, extensions, includeExtensions, span, exclude, result);
            }

            return result;
        }

        /**
         * Given a path ending at a directory, gets the completions for the path, and filters for those entries containing the basename.
         */
        function getCompletionEntriesForDirectoryFragment(fragment: string, scriptPath: string, extensions: string[], includeExtensions: boolean, span: TextSpan, exclude?: string, result: CompletionEntry[] = []): CompletionEntry[] {
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
                const files = tryReadDirectory(host, baseDirectory, extensions, /*exclude*/undefined, /*include*/["./*"]);

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

                        if (!foundFiles[foundFileName]) {
                            foundFiles[foundFileName] = true;
                        }
                    }

                    for (const foundFile in foundFiles) {
                        result.push(createCompletionEntryForModule(foundFile, ScriptElementKind.scriptElement, span));
                    }
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
        function getCompletionEntriesForNonRelativeModules(fragment: string, scriptPath: string, span: TextSpan): CompletionEntry[] {
            const { baseUrl, paths } = compilerOptions;

            let result: CompletionEntry[];

            if (baseUrl) {
                const fileExtensions = getSupportedExtensions(compilerOptions);
                const projectDir = compilerOptions.project || host.getCurrentDirectory();
                const absolute = isRootedDiskPath(baseUrl) ? baseUrl : combinePaths(projectDir, baseUrl);
                result = getCompletionEntriesForDirectoryFragment(fragment, normalizePath(absolute), fileExtensions, /*includeExtensions*/false, span);

                if (paths) {
                    for (const path in paths) {
                        if (paths.hasOwnProperty(path)) {
                            if (path === "*") {
                                if (paths[path]) {
                                    for (const pattern of paths[path]) {
                                        for (const match of getModulesForPathsPattern(fragment, baseUrl, pattern, fileExtensions)) {
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

            for (const moduleName of enumeratePotentialNonRelativeModules(fragment, scriptPath, compilerOptions)) {
                result.push(createCompletionEntryForModule(moduleName, ScriptElementKind.externalModuleName, span));
            }

            return result;
        }

        function getModulesForPathsPattern(fragment: string, baseUrl: string, pattern: string, fileExtensions: string[]): string[] {
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

                    const matches = tryReadDirectory(host, baseDirectory, fileExtensions, undefined, [includeGlob]);
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

        function enumeratePotentialNonRelativeModules(fragment: string, scriptPath: string, options: CompilerOptions): string[] {
            // Check If this is a nested module
            const isNestedModule = fragment.indexOf(directorySeparator) !== -1;
            const moduleNameFragment = isNestedModule ? fragment.substr(0, fragment.lastIndexOf(directorySeparator)) : undefined;

            // Get modules that the type checker picked up
            const ambientModules = map(typeChecker.getAmbientModules(), sym => stripQuotes(sym.name));
            let nonRelativeModules = filter(ambientModules, moduleName => startsWith(moduleName, fragment));

            // Nested modules of the form "module-name/sub" need to be adjusted to only return the string
            // after the last '/' that appears in the fragment because that's where the replacement span
            // starts
            if (isNestedModule) {
                const moduleNameWithSeperator = ensureTrailingDirectorySeparator(moduleNameFragment);
                nonRelativeModules = map(nonRelativeModules, moduleName => {
                    if (startsWith(fragment, moduleNameWithSeperator)) {
                        return moduleName.substr(moduleNameWithSeperator.length);
                    }
                    return moduleName;
                });
            }


            if (!options.moduleResolution || options.moduleResolution === ModuleResolutionKind.NodeJs) {
                for (const visibleModule of enumerateNodeModulesVisibleToScript(host, scriptPath)) {
                    if (!isNestedModule) {
                        nonRelativeModules.push(visibleModule.moduleName);
                    }
                    else if (startsWith(visibleModule.moduleName, moduleNameFragment)) {
                        const nestedFiles = tryReadDirectory(host, visibleModule.moduleDir, supportedTypeScriptExtensions, /*exclude*/undefined, /*include*/["./*"]);
                        if (nestedFiles) {
                            for (let f of nestedFiles) {
                                f = normalizePath(f);
                                const nestedModule = removeFileExtension(getBaseFileName(f));
                                nonRelativeModules.push(nestedModule);
                            }
                        }
                    }
                }
            }

            return deduplicate(nonRelativeModules);
        }

        function getTripleSlashReferenceCompletion(sourceFile: SourceFile, position: number): CompletionInfo {
            const token = getTokenAtPosition(sourceFile, position);
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
                    completionInfo.entries = getCompletionEntriesForDirectoryFragment(toComplete, scriptPath, getSupportedExtensions(compilerOptions), /*includeExtensions*/true, span, sourceFile.path);
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
                for (const packageJson of findPackageJsons(scriptPath)) {
                    const typesDir = combinePaths(getDirectoryPath(packageJson), "node_modules/@types");
                    getCompletionEntriesFromDirectories(host, typesDir, span, result);
                }
            }

            return result;
        }

        function getCompletionEntriesFromDirectories(host: LanguageServiceHost, directory: string, span: TextSpan, result: CompletionEntry[]) {
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

        function findPackageJsons(currentDir: string): string[] {
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
                for (const packageJson of findPackageJsons(scriptPath)) {
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

        function createCompletionEntryForModule(name: string, kind: string, replacementSpan: TextSpan): CompletionEntry {
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
    }

    export function getCompletionEntryDetails(typeChecker: TypeChecker, log: (message: string) => void, compilerOptions: CompilerOptions, sourceFile: SourceFile, position: number, entryName: string): CompletionEntryDetails {
        // Compute all the completion symbols again.
        const completionData = getCompletionData(typeChecker, log, sourceFile, position);
        if (completionData) {
            const { symbols, location } = completionData;

            // Find the symbol with the matching entry name.
            // We don't need to perform character checks here because we're only comparing the
            // name against 'entryName' (which is known to be good), not building a new
            // completion entry.
            const symbol = forEach(symbols, s => getCompletionEntryDisplayNameForSymbol(typeChecker, s, compilerOptions.target, /*performCharacterChecks*/ false, location) === entryName ? s : undefined);

            if (symbol) {
                const { displayParts, documentation, symbolKind } = SymbolDisplay.getSymbolDisplayPartsDocumentationAndSymbolKind(typeChecker, symbol, sourceFile, location, location, SemanticMeaning.All);
                return {
                    name: entryName,
                    kindModifiers: SymbolDisplay.getSymbolModifiers(symbol),
                    kind: symbolKind,
                    displayParts,
                    documentation
                };
            }
        }

        // Didn't find a symbol with this name.  See if we can find a keyword instead.
        const keywordCompletion = forEach(keywordCompletions, c => c.name === entryName);
        if (keywordCompletion) {
            return {
                name: entryName,
                kind: ScriptElementKind.keyword,
                kindModifiers: ScriptElementKindModifier.none,
                displayParts: [displayPart(entryName, SymbolDisplayPartKind.keyword)],
                documentation: undefined
            };
        }

        return undefined;
    }

    export function getCompletionEntrySymbol(typeChecker: TypeChecker, log: (message: string) => void, compilerOptions: CompilerOptions, sourceFile: SourceFile, position: number, entryName: string): Symbol {
        // Compute all the completion symbols again.
        const completionData = getCompletionData(typeChecker, log, sourceFile, position);
        if (completionData) {
            const { symbols, location } = completionData;

            // Find the symbol with the matching entry name.
            // We don't need to perform character checks here because we're only comparing the
            // name against 'entryName' (which is known to be good), not building a new
            // completion entry.
            return forEach(symbols, s => getCompletionEntryDisplayNameForSymbol(typeChecker, s, compilerOptions.target, /*performCharacterChecks*/ false, location) === entryName ? s : undefined);
        }

        return undefined;
    }

    function getCompletionData(typeChecker: TypeChecker, log: (message: string) => void, sourceFile: SourceFile, position: number) {
        const isJavaScriptFile = isSourceFileJavaScript(sourceFile);

        let isJsDocTagName = false;

        let start = timestamp();
        const currentToken = getTokenAtPosition(sourceFile, position);
        log("getCompletionData: Get current token: " + (timestamp() - start));

        start = timestamp();
        // Completion not allowed inside comments, bail out if this is the case
        const insideComment = isInsideComment(sourceFile, currentToken, position);
        log("getCompletionData: Is inside comment: " + (timestamp() - start));

        if (insideComment) {
            // The current position is next to the '@' sign, when no tag name being provided yet.
            // Provide a full list of tag names
            if (hasDocComment(sourceFile, position) && sourceFile.text.charCodeAt(position - 1) === CharacterCodes.at) {
                isJsDocTagName = true;
            }

            // Completion should work inside certain JsDoc tags. For example:
            //     /** @type {number | string} */
            // Completion should work in the brackets
            let insideJsDocTagExpression = false;
            const tag = getJsDocTagAtPosition(sourceFile, position);
            if (tag) {
                if (tag.tagName.pos <= position && position <= tag.tagName.end) {
                    isJsDocTagName = true;
                }

                switch (tag.kind) {
                    case SyntaxKind.JSDocTypeTag:
                    case SyntaxKind.JSDocParameterTag:
                    case SyntaxKind.JSDocReturnTag:
                        const tagWithExpression = <JSDocTypeTag | JSDocParameterTag | JSDocReturnTag>tag;
                        if (tagWithExpression.typeExpression) {
                            insideJsDocTagExpression = tagWithExpression.typeExpression.pos < position && position < tagWithExpression.typeExpression.end;
                        }
                        break;
                }
            }

            if (isJsDocTagName) {
                return { symbols: undefined, isGlobalCompletion: false, isMemberCompletion: false, isNewIdentifierLocation: false, location: undefined, isRightOfDot: false, isJsDocTagName };
            }

            if (!insideJsDocTagExpression) {
                // Proceed if the current position is in jsDoc tag expression; otherwise it is a normal
                // comment or the plain text part of a jsDoc comment, so no completion should be available
                log("Returning an empty list because completion was inside a regular comment or plain text part of a JsDoc comment.");
                return undefined;
            }
        }

        start = timestamp();
        const previousToken = findPrecedingToken(position, sourceFile);
        log("getCompletionData: Get previous token 1: " + (timestamp() - start));

        // The decision to provide completion depends on the contextToken, which is determined through the previousToken.
        // Note: 'previousToken' (and thus 'contextToken') can be undefined if we are the beginning of the file
        let contextToken = previousToken;

        // Check if the caret is at the end of an identifier; this is a partial identifier that we want to complete: e.g. a.toS|
        // Skip this partial identifier and adjust the contextToken to the token that precedes it.
        if (contextToken && position <= contextToken.end && isWord(contextToken.kind)) {
            const start = timestamp();
            contextToken = findPrecedingToken(contextToken.getFullStart(), sourceFile);
            log("getCompletionData: Get previous token 2: " + (timestamp() - start));
        }

        // Find the node where completion is requested on.
        // Also determine whether we are trying to complete with members of that node
        // or attributes of a JSX tag.
        let node = currentToken;
        let isRightOfDot = false;
        let isRightOfOpenTag = false;
        let isStartingCloseTag = false;

        let location = getTouchingPropertyName(sourceFile, position);
        if (contextToken) {
            // Bail out if this is a known invalid completion location
            if (isCompletionListBlocker(contextToken)) {
                log("Returning an empty list because completion was requested in an invalid position.");
                return undefined;
            }

            const { parent, kind } = contextToken;
            if (kind === SyntaxKind.DotToken) {
                if (parent.kind === SyntaxKind.PropertyAccessExpression) {
                    node = (<PropertyAccessExpression>contextToken.parent).expression;
                    isRightOfDot = true;
                }
                else if (parent.kind === SyntaxKind.QualifiedName) {
                    node = (<QualifiedName>contextToken.parent).left;
                    isRightOfDot = true;
                }
                else {
                    // There is nothing that precedes the dot, so this likely just a stray character
                    // or leading into a '...' token. Just bail out instead.
                    return undefined;
                }
            }
            else if (sourceFile.languageVariant === LanguageVariant.JSX) {
                if (kind === SyntaxKind.LessThanToken) {
                    isRightOfOpenTag = true;
                    location = contextToken;
                }
                else if (kind === SyntaxKind.SlashToken && contextToken.parent.kind === SyntaxKind.JsxClosingElement) {
                    isStartingCloseTag = true;
                    location = contextToken;
                }
            }
        }

        const semanticStart = timestamp();
        let isGlobalCompletion = false;
        let isMemberCompletion: boolean;
        let isNewIdentifierLocation: boolean;
        let symbols: Symbol[] = [];

        if (isRightOfDot) {
            getTypeScriptMemberSymbols();
        }
        else if (isRightOfOpenTag) {
            const tagSymbols = typeChecker.getJsxIntrinsicTagNames();
            if (tryGetGlobalSymbols()) {
                symbols = tagSymbols.concat(symbols.filter(s => !!(s.flags & (SymbolFlags.Value | SymbolFlags.Alias))));
            }
            else {
                symbols = tagSymbols;
            }
            isMemberCompletion = true;
            isNewIdentifierLocation = false;
        }
        else if (isStartingCloseTag) {
            const tagName = (<JsxElement>contextToken.parent.parent).openingElement.tagName;
            const tagSymbol = typeChecker.getSymbolAtLocation(tagName);

            if (!typeChecker.isUnknownSymbol(tagSymbol)) {
                symbols = [tagSymbol];
            }
            isMemberCompletion = true;
            isNewIdentifierLocation = false;
        }
        else {
            // For JavaScript or TypeScript, if we're not after a dot, then just try to get the
            // global symbols in scope.  These results should be valid for either language as
            // the set of symbols that can be referenced from this location.
            if (!tryGetGlobalSymbols()) {
                return undefined;
            }
        }

        log("getCompletionData: Semantic work: " + (timestamp() - semanticStart));

        return { symbols, isGlobalCompletion, isMemberCompletion, isNewIdentifierLocation, location, isRightOfDot: (isRightOfDot || isRightOfOpenTag), isJsDocTagName };

        function getTypeScriptMemberSymbols(): void {
            // Right of dot member completion list
            isGlobalCompletion = false;
            isMemberCompletion = true;
            isNewIdentifierLocation = false;

            if (node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.QualifiedName || node.kind === SyntaxKind.PropertyAccessExpression) {
                let symbol = typeChecker.getSymbolAtLocation(node);

                // This is an alias, follow what it aliases
                if (symbol && symbol.flags & SymbolFlags.Alias) {
                    symbol = typeChecker.getAliasedSymbol(symbol);
                }

                if (symbol && symbol.flags & SymbolFlags.HasExports) {
                    // Extract module or enum members
                    const exportedSymbols = typeChecker.getExportsOfModule(symbol);
                    forEach(exportedSymbols, symbol => {
                        if (typeChecker.isValidPropertyAccess(<PropertyAccessExpression>(node.parent), symbol.name)) {
                            symbols.push(symbol);
                        }
                    });
                }
            }

            const type = typeChecker.getTypeAtLocation(node);
            addTypeProperties(type);
        }

        function addTypeProperties(type: Type) {
            if (type) {
                // Filter private properties
                for (const symbol of type.getApparentProperties()) {
                    if (typeChecker.isValidPropertyAccess(<PropertyAccessExpression>(node.parent), symbol.name)) {
                        symbols.push(symbol);
                    }
                }

                if (isJavaScriptFile && type.flags & TypeFlags.Union) {
                    // In javascript files, for union types, we don't just get the members that
                    // the individual types have in common, we also include all the members that
                    // each individual type has.  This is because we're going to add all identifiers
                    // anyways.  So we might as well elevate the members that were at least part
                    // of the individual types to a higher status since we know what they are.
                    const unionType = <UnionType>type;
                    for (const elementType of unionType.types) {
                        addTypeProperties(elementType);
                    }
                }
            }
        }

        function tryGetGlobalSymbols(): boolean {
            let objectLikeContainer: ObjectLiteralExpression | BindingPattern;
            let namedImportsOrExports: NamedImportsOrExports;
            let jsxContainer: JsxOpeningLikeElement;

            if (objectLikeContainer = tryGetObjectLikeCompletionContainer(contextToken)) {
                return tryGetObjectLikeCompletionSymbols(objectLikeContainer);
            }

            if (namedImportsOrExports = tryGetNamedImportsOrExportsForCompletion(contextToken)) {
                // cursor is in an import clause
                // try to show exported member for imported module
                return tryGetImportOrExportClauseCompletionSymbols(namedImportsOrExports);
            }

            if (jsxContainer = tryGetContainingJsxElement(contextToken)) {
                let attrsType: Type;
                if ((jsxContainer.kind === SyntaxKind.JsxSelfClosingElement) || (jsxContainer.kind === SyntaxKind.JsxOpeningElement)) {
                    // Cursor is inside a JSX self-closing element or opening element
                    attrsType = typeChecker.getJsxElementAttributesType(<JsxOpeningLikeElement>jsxContainer);

                    if (attrsType) {
                        symbols = filterJsxAttributes(typeChecker.getPropertiesOfType(attrsType), (<JsxOpeningLikeElement>jsxContainer).attributes);
                        isMemberCompletion = true;
                        isNewIdentifierLocation = false;
                        return true;
                    }
                }
            }

            // Get all entities in the current scope.
            isMemberCompletion = false;
            isNewIdentifierLocation = isNewIdentifierDefinitionLocation(contextToken);

            if (previousToken !== contextToken) {
                Debug.assert(!!previousToken, "Expected 'contextToken' to be defined when different from 'previousToken'.");
            }
            // We need to find the node that will give us an appropriate scope to begin
            // aggregating completion candidates. This is achieved in 'getScopeNode'
            // by finding the first node that encompasses a position, accounting for whether a node
            // is "complete" to decide whether a position belongs to the node.
            //
            // However, at the end of an identifier, we are interested in the scope of the identifier
            // itself, but fall outside of the identifier. For instance:
            //
            //      xyz => x$
            //
            // the cursor is outside of both the 'x' and the arrow function 'xyz => x',
            // so 'xyz' is not returned in our results.
            //
            // We define 'adjustedPosition' so that we may appropriately account for
            // being at the end of an identifier. The intention is that if requesting completion
            // at the end of an identifier, it should be effectively equivalent to requesting completion
            // anywhere inside/at the beginning of the identifier. So in the previous case, the
            // 'adjustedPosition' will work as if requesting completion in the following:
            //
            //      xyz => $x
            //
            // If previousToken !== contextToken, then
            //   - 'contextToken' was adjusted to the token prior to 'previousToken'
            //      because we were at the end of an identifier.
            //   - 'previousToken' is defined.
            const adjustedPosition = previousToken !== contextToken ?
                previousToken.getStart() :
                position;

            const scopeNode = getScopeNode(contextToken, adjustedPosition, sourceFile) || sourceFile;
            if (scopeNode) {
                isGlobalCompletion =
                    scopeNode.kind === SyntaxKind.SourceFile ||
                    scopeNode.kind === SyntaxKind.TemplateExpression ||
                    scopeNode.kind === SyntaxKind.JsxExpression ||
                    isStatement(scopeNode);
            }

            /// TODO filter meaning based on the current context
            const symbolMeanings = SymbolFlags.Type | SymbolFlags.Value | SymbolFlags.Namespace | SymbolFlags.Alias;
            symbols = typeChecker.getSymbolsInScope(scopeNode, symbolMeanings);

            return true;
        }

        /**
         * Finds the first node that "embraces" the position, so that one may
         * accurately aggregate locals from the closest containing scope.
         */
        function getScopeNode(initialToken: Node, position: number, sourceFile: SourceFile) {
            let scope = initialToken;
            while (scope && !positionBelongsToNode(scope, position, sourceFile)) {
                scope = scope.parent;
            }
            return scope;
        }

        function isCompletionListBlocker(contextToken: Node): boolean {
            const start = timestamp();
            const result = isInStringOrRegularExpressionOrTemplateLiteral(contextToken) ||
                isSolelyIdentifierDefinitionLocation(contextToken) ||
                isDotOfNumericLiteral(contextToken) ||
                isInJsxText(contextToken);
            log("getCompletionsAtPosition: isCompletionListBlocker: " + (timestamp() - start));
            return result;
        }

        function isInJsxText(contextToken: Node): boolean {
            if (contextToken.kind === SyntaxKind.JsxText) {
                return true;
            }

            if (contextToken.kind === SyntaxKind.GreaterThanToken && contextToken.parent) {
                if (contextToken.parent.kind === SyntaxKind.JsxOpeningElement) {
                    return true;
                }

                if (contextToken.parent.kind === SyntaxKind.JsxClosingElement || contextToken.parent.kind === SyntaxKind.JsxSelfClosingElement) {
                    return contextToken.parent.parent && contextToken.parent.parent.kind === SyntaxKind.JsxElement;
                }
            }
            return false;
        }

        function isNewIdentifierDefinitionLocation(previousToken: Node): boolean {
            if (previousToken) {
                const containingNodeKind = previousToken.parent.kind;
                switch (previousToken.kind) {
                    case SyntaxKind.CommaToken:
                        return containingNodeKind === SyntaxKind.CallExpression               // func( a, |
                            || containingNodeKind === SyntaxKind.Constructor                  // constructor( a, |   /* public, protected, private keywords are allowed here, so show completion */
                            || containingNodeKind === SyntaxKind.NewExpression                // new C(a, |
                            || containingNodeKind === SyntaxKind.ArrayLiteralExpression       // [a, |
                            || containingNodeKind === SyntaxKind.BinaryExpression             // const x = (a, |
                            || containingNodeKind === SyntaxKind.FunctionType;                // var x: (s: string, list|

                    case SyntaxKind.OpenParenToken:
                        return containingNodeKind === SyntaxKind.CallExpression               // func( |
                            || containingNodeKind === SyntaxKind.Constructor                  // constructor( |
                            || containingNodeKind === SyntaxKind.NewExpression                // new C(a|
                            || containingNodeKind === SyntaxKind.ParenthesizedExpression      // const x = (a|
                            || containingNodeKind === SyntaxKind.ParenthesizedType;           // function F(pred: (a| /* this can become an arrow function, where 'a' is the argument */

                    case SyntaxKind.OpenBracketToken:
                        return containingNodeKind === SyntaxKind.ArrayLiteralExpression       // [ |
                            || containingNodeKind === SyntaxKind.IndexSignature               // [ | : string ]
                            || containingNodeKind === SyntaxKind.ComputedPropertyName;         // [ |    /* this can become an index signature */

                    case SyntaxKind.ModuleKeyword:                                            // module |
                    case SyntaxKind.NamespaceKeyword:                                         // namespace |
                        return true;

                    case SyntaxKind.DotToken:
                        return containingNodeKind === SyntaxKind.ModuleDeclaration;           // module A.|

                    case SyntaxKind.OpenBraceToken:
                        return containingNodeKind === SyntaxKind.ClassDeclaration;            // class A{ |

                    case SyntaxKind.EqualsToken:
                        return containingNodeKind === SyntaxKind.VariableDeclaration          // const x = a|
                            || containingNodeKind === SyntaxKind.BinaryExpression;            // x = a|

                    case SyntaxKind.TemplateHead:
                        return containingNodeKind === SyntaxKind.TemplateExpression;          // `aa ${|

                    case SyntaxKind.TemplateMiddle:
                        return containingNodeKind === SyntaxKind.TemplateSpan;                // `aa ${10} dd ${|

                    case SyntaxKind.PublicKeyword:
                    case SyntaxKind.PrivateKeyword:
                    case SyntaxKind.ProtectedKeyword:
                        return containingNodeKind === SyntaxKind.PropertyDeclaration;         // class A{ public |
                }

                // Previous token may have been a keyword that was converted to an identifier.
                switch (previousToken.getText()) {
                    case "public":
                    case "protected":
                    case "private":
                        return true;
                }
            }

            return false;
        }

        function isInStringOrRegularExpressionOrTemplateLiteral(contextToken: Node): boolean {
            if (contextToken.kind === SyntaxKind.StringLiteral
                || contextToken.kind === SyntaxKind.RegularExpressionLiteral
                || isTemplateLiteralKind(contextToken.kind)) {
                const start = contextToken.getStart();
                const end = contextToken.getEnd();

                // To be "in" one of these literals, the position has to be:
                //   1. entirely within the token text.
                //   2. at the end position of an unterminated token.
                //   3. at the end of a regular expression (due to trailing flags like '/foo/g').
                if (start < position && position < end) {
                    return true;
                }

                if (position === end) {
                    return !!(<LiteralExpression>contextToken).isUnterminated
                        || contextToken.kind === SyntaxKind.RegularExpressionLiteral;
                }
            }

            return false;
        }

        /**
         * Aggregates relevant symbols for completion in object literals and object binding patterns.
         * Relevant symbols are stored in the captured 'symbols' variable.
         *
         * @returns true if 'symbols' was successfully populated; false otherwise.
         */
        function tryGetObjectLikeCompletionSymbols(objectLikeContainer: ObjectLiteralExpression | BindingPattern): boolean {
            // We're looking up possible property names from contextual/inferred/declared type.
            isMemberCompletion = true;

            let typeForObject: Type;
            let existingMembers: Declaration[];

            if (objectLikeContainer.kind === SyntaxKind.ObjectLiteralExpression) {
                // We are completing on contextual types, but may also include properties
                // other than those within the declared type.
                isNewIdentifierLocation = true;

                // If the object literal is being assigned to something of type 'null | { hello: string }',
                // it clearly isn't trying to satisfy the 'null' type. So we grab the non-nullable type if possible.
                typeForObject = typeChecker.getContextualType(<ObjectLiteralExpression>objectLikeContainer);
                typeForObject = typeForObject && typeForObject.getNonNullableType();

                existingMembers = (<ObjectLiteralExpression>objectLikeContainer).properties;
            }
            else if (objectLikeContainer.kind === SyntaxKind.ObjectBindingPattern) {
                // We are *only* completing on properties from the type being destructured.
                isNewIdentifierLocation = false;

                const rootDeclaration = getRootDeclaration(objectLikeContainer.parent);
                if (isVariableLike(rootDeclaration)) {
                    // We don't want to complete using the type acquired by the shape
                    // of the binding pattern; we are only interested in types acquired
                    // through type declaration or inference.
                    // Also proceed if rootDeclaration is a parameter and if its containing function expression/arrow function is contextually typed -
                    // type of parameter will flow in from the contextual type of the function
                    let canGetType = !!(rootDeclaration.initializer || rootDeclaration.type);
                    if (!canGetType && rootDeclaration.kind === SyntaxKind.Parameter) {
                        if (isExpression(rootDeclaration.parent)) {
                            canGetType = !!typeChecker.getContextualType(<Expression>rootDeclaration.parent);
                        }
                        else if (rootDeclaration.parent.kind === SyntaxKind.MethodDeclaration || rootDeclaration.parent.kind === SyntaxKind.SetAccessor) {
                            canGetType = isExpression(rootDeclaration.parent.parent) && !!typeChecker.getContextualType(<Expression>rootDeclaration.parent.parent);
                        }
                    }
                    if (canGetType) {
                        typeForObject = typeChecker.getTypeAtLocation(objectLikeContainer);
                        existingMembers = (<ObjectBindingPattern>objectLikeContainer).elements;
                    }
                }
                else {
                    Debug.fail("Root declaration is not variable-like.");
                }
            }
            else {
                Debug.fail("Expected object literal or binding pattern, got " + objectLikeContainer.kind);
            }

            if (!typeForObject) {
                return false;
            }

            const typeMembers = typeChecker.getPropertiesOfType(typeForObject);
            if (typeMembers && typeMembers.length > 0) {
                // Add filtered items to the completion list
                symbols = filterObjectMembersList(typeMembers, existingMembers);
            }
            return true;
        }

        /**
         * Aggregates relevant symbols for completion in import clauses and export clauses
         * whose declarations have a module specifier; for instance, symbols will be aggregated for
         *
         *      import { | } from "moduleName";
         *      export { a as foo, | } from "moduleName";
         *
         * but not for
         *
         *      export { | };
         *
         * Relevant symbols are stored in the captured 'symbols' variable.
         *
         * @returns true if 'symbols' was successfully populated; false otherwise.
         */
        function tryGetImportOrExportClauseCompletionSymbols(namedImportsOrExports: NamedImportsOrExports): boolean {
            const declarationKind = namedImportsOrExports.kind === SyntaxKind.NamedImports ?
                SyntaxKind.ImportDeclaration :
                SyntaxKind.ExportDeclaration;
            const importOrExportDeclaration = <ImportDeclaration | ExportDeclaration>getAncestor(namedImportsOrExports, declarationKind);
            const moduleSpecifier = importOrExportDeclaration.moduleSpecifier;

            if (!moduleSpecifier) {
                return false;
            }

            isMemberCompletion = true;
            isNewIdentifierLocation = false;

            let exports: Symbol[];
            const moduleSpecifierSymbol = typeChecker.getSymbolAtLocation(importOrExportDeclaration.moduleSpecifier);
            if (moduleSpecifierSymbol) {
                exports = typeChecker.getExportsOfModule(moduleSpecifierSymbol);
            }

            symbols = exports ? filterNamedImportOrExportCompletionItems(exports, namedImportsOrExports.elements) : emptyArray;

            return true;
        }

        /**
         * Returns the immediate owning object literal or binding pattern of a context token,
         * on the condition that one exists and that the context implies completion should be given.
         */
        function tryGetObjectLikeCompletionContainer(contextToken: Node): ObjectLiteralExpression | BindingPattern {
            if (contextToken) {
                switch (contextToken.kind) {
                    case SyntaxKind.OpenBraceToken:  // const x = { |
                    case SyntaxKind.CommaToken:      // const x = { a: 0, |
                        const parent = contextToken.parent;
                        if (parent && (parent.kind === SyntaxKind.ObjectLiteralExpression || parent.kind === SyntaxKind.ObjectBindingPattern)) {
                            return <ObjectLiteralExpression | BindingPattern>parent;
                        }
                        break;
                }
            }

            return undefined;
        }

        /**
         * Returns the containing list of named imports or exports of a context token,
         * on the condition that one exists and that the context implies completion should be given.
         */
        function tryGetNamedImportsOrExportsForCompletion(contextToken: Node): NamedImportsOrExports {
            if (contextToken) {
                switch (contextToken.kind) {
                    case SyntaxKind.OpenBraceToken:  // import { |
                    case SyntaxKind.CommaToken:      // import { a as 0, |
                        switch (contextToken.parent.kind) {
                            case SyntaxKind.NamedImports:
                            case SyntaxKind.NamedExports:
                                return <NamedImportsOrExports>contextToken.parent;
                        }
                }
            }

            return undefined;
        }

        function tryGetContainingJsxElement(contextToken: Node): JsxOpeningLikeElement {
            if (contextToken) {
                const parent = contextToken.parent;
                switch (contextToken.kind) {
                    case SyntaxKind.LessThanSlashToken:
                    case SyntaxKind.SlashToken:
                    case SyntaxKind.Identifier:
                    case SyntaxKind.JsxAttribute:
                    case SyntaxKind.JsxSpreadAttribute:
                        if (parent && (parent.kind === SyntaxKind.JsxSelfClosingElement || parent.kind === SyntaxKind.JsxOpeningElement)) {
                            return <JsxOpeningLikeElement>parent;
                        }
                        else if (parent.kind === SyntaxKind.JsxAttribute) {
                            return <JsxOpeningLikeElement>parent.parent;
                        }
                        break;

                    // The context token is the closing } or " of an attribute, which means
                    // its parent is a JsxExpression, whose parent is a JsxAttribute,
                    // whose parent is a JsxOpeningLikeElement
                    case SyntaxKind.StringLiteral:
                        if (parent && ((parent.kind === SyntaxKind.JsxAttribute) || (parent.kind === SyntaxKind.JsxSpreadAttribute))) {
                            return <JsxOpeningLikeElement>parent.parent;
                        }

                        break;

                    case SyntaxKind.CloseBraceToken:
                        if (parent &&
                            parent.kind === SyntaxKind.JsxExpression &&
                            parent.parent &&
                            (parent.parent.kind === SyntaxKind.JsxAttribute)) {
                            return <JsxOpeningLikeElement>parent.parent.parent;
                        }

                        if (parent && parent.kind === SyntaxKind.JsxSpreadAttribute) {
                            return <JsxOpeningLikeElement>parent.parent;
                        }

                        break;
                }
            }
            return undefined;
        }

        function isFunction(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.CallSignature:
                case SyntaxKind.ConstructSignature:
                case SyntaxKind.IndexSignature:
                    return true;
            }
            return false;
        }

        /**
         * @returns true if we are certain that the currently edited location must define a new location; false otherwise.
         */
        function isSolelyIdentifierDefinitionLocation(contextToken: Node): boolean {
            const containingNodeKind = contextToken.parent.kind;
            switch (contextToken.kind) {
                case SyntaxKind.CommaToken:
                    return containingNodeKind === SyntaxKind.VariableDeclaration ||
                        containingNodeKind === SyntaxKind.VariableDeclarationList ||
                        containingNodeKind === SyntaxKind.VariableStatement ||
                        containingNodeKind === SyntaxKind.EnumDeclaration ||                        // enum a { foo, |
                        isFunction(containingNodeKind) ||
                        containingNodeKind === SyntaxKind.ClassDeclaration ||                       // class A<T, |
                        containingNodeKind === SyntaxKind.ClassExpression ||                        // var C = class D<T, |
                        containingNodeKind === SyntaxKind.InterfaceDeclaration ||                   // interface A<T, |
                        containingNodeKind === SyntaxKind.ArrayBindingPattern ||                    // var [x, y|
                        containingNodeKind === SyntaxKind.TypeAliasDeclaration;                     // type Map, K, |

                case SyntaxKind.DotToken:
                    return containingNodeKind === SyntaxKind.ArrayBindingPattern;                   // var [.|

                case SyntaxKind.ColonToken:
                    return containingNodeKind === SyntaxKind.BindingElement;                        // var {x :html|

                case SyntaxKind.OpenBracketToken:
                    return containingNodeKind === SyntaxKind.ArrayBindingPattern;                   // var [x|

                case SyntaxKind.OpenParenToken:
                    return containingNodeKind === SyntaxKind.CatchClause ||
                        isFunction(containingNodeKind);

                case SyntaxKind.OpenBraceToken:
                    return containingNodeKind === SyntaxKind.EnumDeclaration ||                     // enum a { |
                        containingNodeKind === SyntaxKind.InterfaceDeclaration ||                   // interface a { |
                        containingNodeKind === SyntaxKind.TypeLiteral;                              // const x : { |

                case SyntaxKind.SemicolonToken:
                    return containingNodeKind === SyntaxKind.PropertySignature &&
                        contextToken.parent && contextToken.parent.parent &&
                        (contextToken.parent.parent.kind === SyntaxKind.InterfaceDeclaration ||    // interface a { f; |
                            contextToken.parent.parent.kind === SyntaxKind.TypeLiteral);           // const x : { a; |

                case SyntaxKind.LessThanToken:
                    return containingNodeKind === SyntaxKind.ClassDeclaration ||                    // class A< |
                        containingNodeKind === SyntaxKind.ClassExpression ||                        // var C = class D< |
                        containingNodeKind === SyntaxKind.InterfaceDeclaration ||                   // interface A< |
                        containingNodeKind === SyntaxKind.TypeAliasDeclaration ||                   // type List< |
                        isFunction(containingNodeKind);

                case SyntaxKind.StaticKeyword:
                    return containingNodeKind === SyntaxKind.PropertyDeclaration;

                case SyntaxKind.DotDotDotToken:
                    return containingNodeKind === SyntaxKind.Parameter ||
                        (contextToken.parent && contextToken.parent.parent &&
                            contextToken.parent.parent.kind === SyntaxKind.ArrayBindingPattern);  // var [...z|

                case SyntaxKind.PublicKeyword:
                case SyntaxKind.PrivateKeyword:
                case SyntaxKind.ProtectedKeyword:
                    return containingNodeKind === SyntaxKind.Parameter;

                case SyntaxKind.AsKeyword:
                    return containingNodeKind === SyntaxKind.ImportSpecifier ||
                        containingNodeKind === SyntaxKind.ExportSpecifier ||
                        containingNodeKind === SyntaxKind.NamespaceImport;

                case SyntaxKind.ClassKeyword:
                case SyntaxKind.EnumKeyword:
                case SyntaxKind.InterfaceKeyword:
                case SyntaxKind.FunctionKeyword:
                case SyntaxKind.VarKeyword:
                case SyntaxKind.GetKeyword:
                case SyntaxKind.SetKeyword:
                case SyntaxKind.ImportKeyword:
                case SyntaxKind.LetKeyword:
                case SyntaxKind.ConstKeyword:
                case SyntaxKind.YieldKeyword:
                case SyntaxKind.TypeKeyword:  // type htm|
                    return true;
            }

            // Previous token may have been a keyword that was converted to an identifier.
            switch (contextToken.getText()) {
                case "abstract":
                case "async":
                case "class":
                case "const":
                case "declare":
                case "enum":
                case "function":
                case "interface":
                case "let":
                case "private":
                case "protected":
                case "public":
                case "static":
                case "var":
                case "yield":
                    return true;
            }

            return false;
        }

        function isDotOfNumericLiteral(contextToken: Node): boolean {
            if (contextToken.kind === SyntaxKind.NumericLiteral) {
                const text = contextToken.getFullText();
                return text.charAt(text.length - 1) === ".";
            }

            return false;
        }

        /**
         * Filters out completion suggestions for named imports or exports.
         *
         * @param exportsOfModule          The list of symbols which a module exposes.
         * @param namedImportsOrExports    The list of existing import/export specifiers in the import/export clause.
         *
         * @returns Symbols to be suggested at an import/export clause, barring those whose named imports/exports
         *          do not occur at the current position and have not otherwise been typed.
         */
        function filterNamedImportOrExportCompletionItems(exportsOfModule: Symbol[], namedImportsOrExports: ImportOrExportSpecifier[]): Symbol[] {
            const existingImportsOrExports = createMap<boolean>();

            for (const element of namedImportsOrExports) {
                // If this is the current item we are editing right now, do not filter it out
                if (element.getStart() <= position && position <= element.getEnd()) {
                    continue;
                }

                const name = element.propertyName || element.name;
                existingImportsOrExports[name.text] = true;
            }

            if (!someProperties(existingImportsOrExports)) {
                return filter(exportsOfModule, e => e.name !== "default");
            }

            return filter(exportsOfModule, e => e.name !== "default" && !existingImportsOrExports[e.name]);
        }

        /**
         * Filters out completion suggestions for named imports or exports.
         *
         * @returns Symbols to be suggested in an object binding pattern or object literal expression, barring those whose declarations
         *          do not occur at the current position and have not otherwise been typed.
         */
        function filterObjectMembersList(contextualMemberSymbols: Symbol[], existingMembers: Declaration[]): Symbol[] {
            if (!existingMembers || existingMembers.length === 0) {
                return contextualMemberSymbols;
            }

            const existingMemberNames = createMap<boolean>();
            for (const m of existingMembers) {
                // Ignore omitted expressions for missing members
                if (m.kind !== SyntaxKind.PropertyAssignment &&
                    m.kind !== SyntaxKind.ShorthandPropertyAssignment &&
                    m.kind !== SyntaxKind.BindingElement &&
                    m.kind !== SyntaxKind.MethodDeclaration &&
                    m.kind !== SyntaxKind.GetAccessor &&
                    m.kind !== SyntaxKind.SetAccessor) {
                    continue;
                }

                // If this is the current item we are editing right now, do not filter it out
                if (m.getStart() <= position && position <= m.getEnd()) {
                    continue;
                }

                let existingName: string;

                if (m.kind === SyntaxKind.BindingElement && (<BindingElement>m).propertyName) {
                    // include only identifiers in completion list
                    if ((<BindingElement>m).propertyName.kind === SyntaxKind.Identifier) {
                        existingName = (<Identifier>(<BindingElement>m).propertyName).text;
                    }
                }
                else {
                    // TODO(jfreeman): Account for computed property name
                    // NOTE: if one only performs this step when m.name is an identifier,
                    // things like '__proto__' are not filtered out.
                    existingName = (<Identifier>m.name).text;
                }

                existingMemberNames[existingName] = true;
            }

            return filter(contextualMemberSymbols, m => !existingMemberNames[m.name]);
        }

        /**
         * Filters out completion suggestions from 'symbols' according to existing JSX attributes.
         *
         * @returns Symbols to be suggested in a JSX element, barring those whose attributes
         *          do not occur at the current position and have not otherwise been typed.
         */
        function filterJsxAttributes(symbols: Symbol[], attributes: NodeArray<JsxAttribute | JsxSpreadAttribute>): Symbol[] {
            const seenNames = createMap<boolean>();
            for (const attr of attributes) {
                // If this is the current item we are editing right now, do not filter it out
                if (attr.getStart() <= position && position <= attr.getEnd()) {
                    continue;
                }

                if (attr.kind === SyntaxKind.JsxAttribute) {
                    seenNames[(<JsxAttribute>attr).name.text] = true;
                }
            }

            return filter(symbols, a => !seenNames[a.name]);
        }
    }

    /**
     * Get the name to be display in completion from a given symbol.
     *
     * @return undefined if the name is of external module otherwise a name with striped of any quote
     */
    function getCompletionEntryDisplayNameForSymbol(typeChecker: TypeChecker, symbol: Symbol, target: ScriptTarget, performCharacterChecks: boolean, location: Node): string {
        const displayName: string = getDeclaredName(typeChecker, symbol, location);

        if (displayName) {
            const firstCharCode = displayName.charCodeAt(0);
            // First check of the displayName is not external module; if it is an external module, it is not valid entry
            if ((symbol.flags & SymbolFlags.Namespace) && (firstCharCode === CharacterCodes.singleQuote || firstCharCode === CharacterCodes.doubleQuote)) {
                // If the symbol is external module, don't show it in the completion list
                // (i.e declare module "http" { const x; } | // <= request completion here, "http" should not be there)
                return undefined;
            }
        }

        return getCompletionEntryDisplayName(displayName, target, performCharacterChecks);
    }

    /**
     * Get a displayName from a given for completion list, performing any necessary quotes stripping
     * and checking whether the name is valid identifier name.
     */
    function getCompletionEntryDisplayName(name: string, target: ScriptTarget, performCharacterChecks: boolean): string {
        if (!name) {
            return undefined;
        }

        name = stripQuotes(name);

        if (!name) {
            return undefined;
        }

        // If the user entered name for the symbol was quoted, removing the quotes is not enough, as the name could be an
        // invalid identifier name. We need to check if whatever was inside the quotes is actually a valid identifier name.
        // e.g "b a" is valid quoted name but when we strip off the quotes, it is invalid.
        // We, thus, need to check if whatever was inside the quotes is actually a valid identifier name.
        if (performCharacterChecks) {
            if (!isIdentifierText(name, target)) {
                return undefined;
            }
        }

        return name;
    }

    // A cache of completion entries for keywords, these do not change between sessions
    const keywordCompletions: CompletionEntry[] = [];
    for (let i = SyntaxKind.FirstKeyword; i <= SyntaxKind.LastKeyword; i++) {
        keywordCompletions.push({
            name: tokenToString(i),
            kind: ScriptElementKind.keyword,
            kindModifiers: ScriptElementKindModifier.none,
            sortText: "0"
        });
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
