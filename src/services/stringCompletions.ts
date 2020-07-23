/* @internal */
namespace ts.Completions.StringCompletions {
    export function getStringLiteralCompletions(sourceFile: SourceFile, position: number, contextToken: Node | undefined, checker: TypeChecker, options: CompilerOptions, host: LanguageServiceHost, log: Log, preferences: UserPreferences): CompletionInfo | undefined {
        if (isInReferenceComment(sourceFile, position)) {
            const entries = getTripleSlashReferenceCompletion(sourceFile, position, options, host);
            return entries && convertPathCompletions(entries);
        }
        if (isInString(sourceFile, position, contextToken)) {
            if (!contextToken || !isStringLiteralLike(contextToken)) return undefined;
            const entries = getStringLiteralCompletionEntries(sourceFile, contextToken, position, checker, options, host);
            return convertStringLiteralCompletions(entries, contextToken, sourceFile, checker, log, preferences);
        }
    }

    function convertStringLiteralCompletions(completion: StringLiteralCompletion | undefined, contextToken: Node, sourceFile: SourceFile, checker: TypeChecker, log: Log, preferences: UserPreferences): CompletionInfo | undefined {
        if (completion === undefined) {
            return undefined;
        }
        switch (completion.kind) {
            case StringLiteralCompletionKind.Paths:
                return convertPathCompletions(completion.paths);
            case StringLiteralCompletionKind.Properties: {
                const entries: CompletionEntry[] = [];
                getCompletionEntriesFromSymbols(
                    completion.symbols,
                    entries,
                    contextToken,
                    sourceFile,
                    sourceFile,
                    checker,
                    ScriptTarget.ESNext,
                    log,
                    CompletionKind.String,
                    preferences
                ); // Target will not be used, so arbitrary
                return { isGlobalCompletion: false, isMemberCompletion: true, isNewIdentifierLocation: completion.hasIndexSignature, entries };
            }
            case StringLiteralCompletionKind.Types: {
                const entries = completion.types.map(type => ({
                    name: type.value,
                    kindModifiers: ScriptElementKindModifier.none,
                    kind: ScriptElementKind.string,
                    sortText: "0",
                    replacementSpan: getReplacementSpanForContextToken(contextToken)
                }));
                return { isGlobalCompletion: false, isMemberCompletion: false, isNewIdentifierLocation: completion.isNewIdentifier, entries };
            }
            default:
                return Debug.assertNever(completion);
        }
    }

    export function getStringLiteralCompletionDetails(name: string, sourceFile: SourceFile, position: number, contextToken: Node | undefined, checker: TypeChecker, options: CompilerOptions, host: LanguageServiceHost, cancellationToken: CancellationToken) {
        if (!contextToken || !isStringLiteralLike(contextToken)) return undefined;
        const completions = getStringLiteralCompletionEntries(sourceFile, contextToken, position, checker, options, host);
        return completions && stringLiteralCompletionDetails(name, contextToken, completions, sourceFile, checker, cancellationToken);
    }

    function stringLiteralCompletionDetails(name: string, location: Node, completion: StringLiteralCompletion, sourceFile: SourceFile, checker: TypeChecker, cancellationToken: CancellationToken): CompletionEntryDetails | undefined {
        switch (completion.kind) {
            case StringLiteralCompletionKind.Paths: {
                const match = find(completion.paths, p => p.name === name);
                return match && createCompletionDetails(name, kindModifiersFromExtension(match.extension), match.kind, [textPart(name)]);
            }
            case StringLiteralCompletionKind.Properties: {
                const match = find(completion.symbols, s => s.name === name);
                return match && createCompletionDetailsForSymbol(match, checker, sourceFile, location, cancellationToken);
            }
            case StringLiteralCompletionKind.Types:
                return find(completion.types, t => t.value === name) ? createCompletionDetails(name, ScriptElementKindModifier.none, ScriptElementKind.typeElement, [textPart(name)]) : undefined;
            default:
                return Debug.assertNever(completion);
        }
    }

    function convertPathCompletions(pathCompletions: readonly PathCompletion[]): CompletionInfo {
        const isGlobalCompletion = false; // We don't want the editor to offer any other completions, such as snippets, inside a comment.
        const isNewIdentifierLocation = true; // The user may type in a path that doesn't yet exist, creating a "new identifier" with respect to the collection of identifiers the server is aware of.
        const entries = pathCompletions.map(({ name, kind, span, extension }): CompletionEntry =>
            ({ name, kind, kindModifiers: kindModifiersFromExtension(extension), sortText: SortText.LocationPriority, replacementSpan: span }));
        return { isGlobalCompletion, isMemberCompletion: false, isNewIdentifierLocation, entries };
    }
    function kindModifiersFromExtension(extension: Extension | undefined): ScriptElementKindModifier {
        switch (extension) {
            case Extension.Dts: return ScriptElementKindModifier.dtsModifier;
            case Extension.Js: return ScriptElementKindModifier.jsModifier;
            case Extension.Json: return ScriptElementKindModifier.jsonModifier;
            case Extension.Jsx: return ScriptElementKindModifier.jsxModifier;
            case Extension.Ts: return ScriptElementKindModifier.tsModifier;
            case Extension.Tsx: return ScriptElementKindModifier.tsxModifier;
            case Extension.TsBuildInfo: return Debug.fail(`Extension ${Extension.TsBuildInfo} is unsupported.`);
            case undefined: return ScriptElementKindModifier.none;
            default:
                return Debug.assertNever(extension);
        }
    }

    const enum StringLiteralCompletionKind { Paths, Properties, Types }
    interface StringLiteralCompletionsFromProperties {
        readonly kind: StringLiteralCompletionKind.Properties;
        readonly symbols: readonly Symbol[];
        readonly hasIndexSignature: boolean;
    }
    interface StringLiteralCompletionsFromTypes {
        readonly kind: StringLiteralCompletionKind.Types;
        readonly types: readonly StringLiteralType[];
        readonly isNewIdentifier: boolean;
    }
    type StringLiteralCompletion = { readonly kind: StringLiteralCompletionKind.Paths, readonly paths: readonly PathCompletion[] } | StringLiteralCompletionsFromProperties | StringLiteralCompletionsFromTypes;
    function getStringLiteralCompletionEntries(sourceFile: SourceFile, node: StringLiteralLike, position: number, typeChecker: TypeChecker, compilerOptions: CompilerOptions, host: LanguageServiceHost): StringLiteralCompletion | undefined {
        const { parent } = node;
        switch (parent.kind) {
            case SyntaxKind.LiteralType:
                switch (parent.parent.kind) {
                    case SyntaxKind.TypeReference:
                        return { kind: StringLiteralCompletionKind.Types, types: getStringLiteralTypes(typeChecker.getTypeArgumentConstraint(parent as LiteralTypeNode)), isNewIdentifier: false };
                    case SyntaxKind.IndexedAccessType:
                        // Get all apparent property names
                        // i.e. interface Foo {
                        //          foo: string;
                        //          bar: string;
                        //      }
                        //      let x: Foo["/*completion position*/"]
                        return stringLiteralCompletionsFromProperties(typeChecker.getTypeFromTypeNode((parent.parent as IndexedAccessTypeNode).objectType));
                    case SyntaxKind.ImportType:
                        return { kind: StringLiteralCompletionKind.Paths, paths: getStringLiteralCompletionsFromModuleNames(sourceFile, node, compilerOptions, host, typeChecker) };
                    case SyntaxKind.UnionType: {
                        if (!isTypeReferenceNode(parent.parent.parent)) return undefined;
                        const alreadyUsedTypes = getAlreadyUsedTypesInStringLiteralUnion(parent.parent as UnionTypeNode, parent as LiteralTypeNode);
                        const types = getStringLiteralTypes(typeChecker.getTypeArgumentConstraint(parent.parent as UnionTypeNode)).filter(t => !contains(alreadyUsedTypes, t.value));
                        return { kind: StringLiteralCompletionKind.Types, types, isNewIdentifier: false };
                    }
                    default:
                        return undefined;
                }

            case SyntaxKind.PropertyAssignment:
                if (isObjectLiteralExpression(parent.parent) && (<PropertyAssignment>parent).name === node) {
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
                    return stringLiteralCompletionsFromProperties(typeChecker.getContextualType(parent.parent));
                }
                return fromContextualType();

            case SyntaxKind.ElementAccessExpression: {
                const { expression, argumentExpression } = parent as ElementAccessExpression;
                if (node === argumentExpression) {
                    // Get all names of properties on the expression
                    // i.e. interface A {
                    //      'prop1': string
                    // }
                    // let a: A;
                    // a['/*completion position*/']
                    return stringLiteralCompletionsFromProperties(typeChecker.getTypeAtLocation(expression));
                }
                return undefined;
            }

            case SyntaxKind.CallExpression:
            case SyntaxKind.NewExpression:
                if (!isRequireCall(parent, /*checkArgumentIsStringLiteralLike*/ false) && !isImportCall(parent)) {
                    const argumentInfo = SignatureHelp.getArgumentInfoForCompletions(node, position, sourceFile);
                    // Get string literal completions from specialized signatures of the target
                    // i.e. declare function f(a: 'A');
                    // f("/*completion position*/")
                    return argumentInfo ? getStringLiteralCompletionsFromSignature(argumentInfo, typeChecker) : fromContextualType();
                }
                // falls through (is `require("")` or `import("")`)

            case SyntaxKind.ImportDeclaration:
            case SyntaxKind.ExportDeclaration:
            case SyntaxKind.ExternalModuleReference:
                // Get all known external module names or complete a path to a module
                // i.e. import * as ns from "/*completion position*/";
                //      var y = import("/*completion position*/");
                //      import x = require("/*completion position*/");
                //      var y = require("/*completion position*/");
                //      export * from "/*completion position*/";
                return { kind: StringLiteralCompletionKind.Paths, paths: getStringLiteralCompletionsFromModuleNames(sourceFile, node, compilerOptions, host, typeChecker) };

            default:
                return fromContextualType();
        }

        function fromContextualType(): StringLiteralCompletion {
            // Get completion for string literal from string literal type
            // i.e. var x: "hi" | "hello" = "/*completion position*/"
            return { kind: StringLiteralCompletionKind.Types, types: getStringLiteralTypes(getContextualTypeFromParent(node, typeChecker)), isNewIdentifier: false };
        }
    }

    function getAlreadyUsedTypesInStringLiteralUnion(union: UnionTypeNode, current: LiteralTypeNode): readonly string[] {
        return mapDefined(union.types, type =>
            type !== current && isLiteralTypeNode(type) && isStringLiteral(type.literal) ? type.literal.text : undefined);
    }

    function getStringLiteralCompletionsFromSignature(argumentInfo: SignatureHelp.ArgumentInfoForCompletions, checker: TypeChecker): StringLiteralCompletionsFromTypes {
        let isNewIdentifier = false;

        const uniques = new Map<string, true>();
        const candidates: Signature[] = [];
        checker.getResolvedSignature(argumentInfo.invocation, candidates, argumentInfo.argumentCount);
        const types = flatMap(candidates, candidate => {
            if (!signatureHasRestParameter(candidate) && argumentInfo.argumentCount > candidate.parameters.length) return;
            const type = checker.getParameterType(candidate, argumentInfo.argumentIndex);
            isNewIdentifier = isNewIdentifier || !!(type.flags & TypeFlags.String);
            return getStringLiteralTypes(type, uniques);
        });

        return { kind: StringLiteralCompletionKind.Types, types, isNewIdentifier };
    }

    function stringLiteralCompletionsFromProperties(type: Type | undefined): StringLiteralCompletionsFromProperties | undefined {
        return type && {
            kind: StringLiteralCompletionKind.Properties,
            symbols: filter(type.getApparentProperties(), prop => !(prop.valueDeclaration && isPrivateIdentifierPropertyDeclaration(prop.valueDeclaration))),
            hasIndexSignature: hasIndexSignature(type)
        };
    }

    function getStringLiteralTypes(type: Type | undefined, uniques = new Map<string, true>()): readonly StringLiteralType[] {
        if (!type) return emptyArray;
        type = skipConstraint(type);
        return type.isUnion() ? flatMap(type.types, t => getStringLiteralTypes(t, uniques)) :
            type.isStringLiteral() && !(type.flags & TypeFlags.EnumLiteral) && addToSeen(uniques, type.value) ? [type] : emptyArray;
    }

    interface NameAndKind {
        readonly name: string;
        readonly kind: ScriptElementKind.scriptElement | ScriptElementKind.directory | ScriptElementKind.externalModuleName;
        readonly extension: Extension | undefined;
    }
    interface PathCompletion extends NameAndKind {
        readonly span: TextSpan | undefined;
    }

    function nameAndKind(name: string, kind: NameAndKind["kind"], extension: Extension | undefined): NameAndKind {
        return { name, kind, extension };
    }
    function directoryResult(name: string): NameAndKind {
        return nameAndKind(name, ScriptElementKind.directory, /*extension*/ undefined);
    }

    function addReplacementSpans(text: string, textStart: number, names: readonly NameAndKind[]): readonly PathCompletion[] {
        const span = getDirectoryFragmentTextSpan(text, textStart);
        return names.map(({ name, kind, extension }): PathCompletion => ({ name, kind, extension, span }));
    }

    function getStringLiteralCompletionsFromModuleNames(sourceFile: SourceFile, node: LiteralExpression, compilerOptions: CompilerOptions, host: LanguageServiceHost, typeChecker: TypeChecker): readonly PathCompletion[] {
        return addReplacementSpans(node.text, node.getStart(sourceFile) + 1, getStringLiteralCompletionsFromModuleNamesWorker(sourceFile, node, compilerOptions, host, typeChecker));
    }

    function getStringLiteralCompletionsFromModuleNamesWorker(sourceFile: SourceFile, node: LiteralExpression, compilerOptions: CompilerOptions, host: LanguageServiceHost, typeChecker: TypeChecker): readonly NameAndKind[] {
        const literalValue = normalizeSlashes(node.text);

        const scriptPath = sourceFile.path;
        const scriptDirectory = getDirectoryPath(scriptPath);

        return isPathRelativeToScript(literalValue) || !compilerOptions.baseUrl && (isRootedDiskPath(literalValue) || isUrl(literalValue))
            ? getCompletionEntriesForRelativeModules(literalValue, scriptDirectory, compilerOptions, host, scriptPath)
            : getCompletionEntriesForNonRelativeModules(literalValue, scriptDirectory, compilerOptions, host, typeChecker);
    }

    interface ExtensionOptions {
        readonly extensions: readonly Extension[];
        readonly includeExtensions: boolean;
    }
    function getExtensionOptions(compilerOptions: CompilerOptions, includeExtensions = false): ExtensionOptions {
        return { extensions: getSupportedExtensionsForModuleResolution(compilerOptions), includeExtensions };
    }
    function getCompletionEntriesForRelativeModules(literalValue: string, scriptDirectory: string, compilerOptions: CompilerOptions, host: LanguageServiceHost, scriptPath: Path) {
        const extensionOptions = getExtensionOptions(compilerOptions);
        if (compilerOptions.rootDirs) {
            return getCompletionEntriesForDirectoryFragmentWithRootDirs(
                compilerOptions.rootDirs, literalValue, scriptDirectory, extensionOptions, compilerOptions, host, scriptPath);
        }
        else {
            return getCompletionEntriesForDirectoryFragment(literalValue, scriptDirectory, extensionOptions, host, scriptPath);
        }
    }

    function getSupportedExtensionsForModuleResolution(compilerOptions: CompilerOptions): readonly Extension[] {
        const extensions = getSupportedExtensions(compilerOptions);
        return compilerOptions.resolveJsonModule && getEmitModuleResolutionKind(compilerOptions) === ModuleResolutionKind.NodeJs ?
            extensions.concat(Extension.Json) :
            extensions;
    }

    /**
     * Takes a script path and returns paths for all potential folders that could be merged with its
     * containing folder via the "rootDirs" compiler option
     */
    function getBaseDirectoriesFromRootDirs(rootDirs: string[], basePath: string, scriptDirectory: string, ignoreCase: boolean): readonly string[] {
        // Make all paths absolute/normalized if they are not already
        rootDirs = rootDirs.map(rootDirectory => normalizePath(isRootedDiskPath(rootDirectory) ? rootDirectory : combinePaths(basePath, rootDirectory)));

        // Determine the path to the directory containing the script relative to the root directory it is contained within
        const relativeDirectory = firstDefined(rootDirs, rootDirectory =>
            containsPath(rootDirectory, scriptDirectory, basePath, ignoreCase) ? scriptDirectory.substr(rootDirectory.length) : undefined)!; // TODO: GH#18217

        // Now find a path for each potential directory that is to be merged with the one containing the script
        return deduplicate<string>(
            [...rootDirs.map(rootDirectory => combinePaths(rootDirectory, relativeDirectory)), scriptDirectory],
            equateStringsCaseSensitive,
            compareStringsCaseSensitive);
    }

    function getCompletionEntriesForDirectoryFragmentWithRootDirs(rootDirs: string[], fragment: string, scriptDirectory: string, extensionOptions: ExtensionOptions, compilerOptions: CompilerOptions, host: LanguageServiceHost, exclude: string): readonly NameAndKind[] {
        const basePath = compilerOptions.project || host.getCurrentDirectory();
        const ignoreCase = !(host.useCaseSensitiveFileNames && host.useCaseSensitiveFileNames());
        const baseDirectories = getBaseDirectoriesFromRootDirs(rootDirs, basePath, scriptDirectory, ignoreCase);
        return flatMap(baseDirectories, baseDirectory => getCompletionEntriesForDirectoryFragment(fragment, baseDirectory, extensionOptions, host, exclude));
    }

    /**
     * Given a path ending at a directory, gets the completions for the path, and filters for those entries containing the basename.
     */
    function getCompletionEntriesForDirectoryFragment(fragment: string, scriptPath: string, { extensions, includeExtensions }: ExtensionOptions, host: LanguageServiceHost, exclude?: string, result: NameAndKind[] = []): NameAndKind[] {
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
        if (!tryDirectoryExists(host, baseDirectory)) return result;

        // Enumerate the available files if possible
        const files = tryReadDirectory(host, baseDirectory, extensions, /*exclude*/ undefined, /*include*/ ["./*"]);

        if (files) {
            /**
             * Multiple file entries might map to the same truncated name once we remove extensions
             * (happens iff includeExtensions === false)so we use a set-like data structure. Eg:
             *
             * both foo.ts and foo.tsx become foo
             */
            const foundFiles = new Map<string, Extension | undefined>(); // maps file to its extension
            for (let filePath of files) {
                filePath = normalizePath(filePath);
                if (exclude && comparePaths(filePath, exclude, scriptPath, ignoreCase) === Comparison.EqualTo) {
                    continue;
                }

                const foundFileName = includeExtensions || fileExtensionIs(filePath, Extension.Json) ? getBaseFileName(filePath) : removeFileExtension(getBaseFileName(filePath));
                foundFiles.set(foundFileName, tryGetExtensionFromPath(filePath));
            }

            foundFiles.forEach((ext, foundFile) => {
                result.push(nameAndKind(foundFile, ScriptElementKind.scriptElement, ext));
            });
        }

        // If possible, get folder completion as well
        const directories = tryGetDirectories(host, baseDirectory);

        if (directories) {
            for (const directory of directories) {
                const directoryName = getBaseFileName(normalizePath(directory));
                if (directoryName !== "@types") {
                    result.push(directoryResult(directoryName));
                }
            }
        }

        // check for a version redirect
        const packageJsonPath = findPackageJson(baseDirectory, host);
        if (packageJsonPath) {
            const packageJson = readJson(packageJsonPath, host as { readFile: (filename: string) => string | undefined });
            const typesVersions = (packageJson as any).typesVersions;
            if (typeof typesVersions === "object") {
                const versionResult = getPackageJsonTypesVersionsPaths(typesVersions);
                const versionPaths = versionResult && versionResult.paths;
                const rest = absolutePath.slice(ensureTrailingDirectorySeparator(baseDirectory).length);
                if (versionPaths) {
                    addCompletionEntriesFromPaths(result, rest, baseDirectory, extensions, versionPaths, host);
                }
            }
        }

        return result;
    }

    function addCompletionEntriesFromPaths(result: NameAndKind[], fragment: string, baseDirectory: string, fileExtensions: readonly string[], paths: MapLike<string[]>, host: LanguageServiceHost) {
        for (const path in paths) {
            if (!hasProperty(paths, path)) continue;
            const patterns = paths[path];
            if (patterns) {
                for (const { name, kind, extension } of getCompletionsForPathMapping(path, patterns, fragment, baseDirectory, fileExtensions, host)) {
                    // Path mappings may provide a duplicate way to get to something we've already added, so don't add again.
                    if (!result.some(entry => entry.name === name)) {
                        result.push(nameAndKind(name, kind, extension));
                    }
                }
            }
        }
    }

    /**
     * Check all of the declared modules and those in node modules. Possible sources of modules:
     *      Modules that are found by the type checker
     *      Modules found relative to "baseUrl" compliler options (including patterns from "paths" compiler option)
     *      Modules from node_modules (i.e. those listed in package.json)
     *          This includes all files that are found in node_modules/moduleName/ with acceptable file extensions
     */
    function getCompletionEntriesForNonRelativeModules(fragment: string, scriptPath: string, compilerOptions: CompilerOptions, host: LanguageServiceHost, typeChecker: TypeChecker): readonly NameAndKind[] {
        const { baseUrl, paths } = compilerOptions;

        const result: NameAndKind[] = [];

        const extensionOptions = getExtensionOptions(compilerOptions);
        if (baseUrl) {
            const projectDir = compilerOptions.project || host.getCurrentDirectory();
            const absolute = normalizePath(combinePaths(projectDir, baseUrl));
            getCompletionEntriesForDirectoryFragment(fragment, absolute, extensionOptions, host, /*exclude*/ undefined, result);
            if (paths) {
                addCompletionEntriesFromPaths(result, fragment, absolute, extensionOptions.extensions, paths, host);
            }
        }

        const fragmentDirectory = getFragmentDirectory(fragment);
        for (const ambientName of getAmbientModuleCompletions(fragment, fragmentDirectory, typeChecker)) {
            result.push(nameAndKind(ambientName, ScriptElementKind.externalModuleName, /*extension*/ undefined));
        }

        getCompletionEntriesFromTypings(host, compilerOptions, scriptPath, fragmentDirectory, extensionOptions, result);

        if (getEmitModuleResolutionKind(compilerOptions) === ModuleResolutionKind.NodeJs) {
            // If looking for a global package name, don't just include everything in `node_modules` because that includes dependencies' own dependencies.
            // (But do if we didn't find anything, e.g. 'package.json' missing.)
            let foundGlobal = false;
            if (fragmentDirectory === undefined) {
                for (const moduleName of enumerateNodeModulesVisibleToScript(host, scriptPath)) {
                    if (!result.some(entry => entry.name === moduleName)) {
                        foundGlobal = true;
                        result.push(nameAndKind(moduleName, ScriptElementKind.externalModuleName, /*extension*/ undefined));
                    }
                }
            }
            if (!foundGlobal) {
                forEachAncestorDirectory(scriptPath, ancestor => {
                    const nodeModules = combinePaths(ancestor, "node_modules");
                    if (tryDirectoryExists(host, nodeModules)) {
                        getCompletionEntriesForDirectoryFragment(fragment, nodeModules, extensionOptions, host, /*exclude*/ undefined, result);
                    }
                });
            }
        }

        return result;
    }

    function getFragmentDirectory(fragment: string): string | undefined {
        return containsSlash(fragment) ? hasTrailingDirectorySeparator(fragment) ? fragment : getDirectoryPath(fragment) : undefined;
    }

    function getCompletionsForPathMapping(
        path: string, patterns: readonly string[], fragment: string, baseUrl: string, fileExtensions: readonly string[], host: LanguageServiceHost,
    ): readonly NameAndKind[] {
        if (!endsWith(path, "*")) {
            // For a path mapping "foo": ["/x/y/z.ts"], add "foo" itself as a completion.
            return !stringContains(path, "*") ? justPathMappingName(path) : emptyArray;
        }

        const pathPrefix = path.slice(0, path.length - 1);
        const remainingFragment = tryRemovePrefix(fragment, pathPrefix);
        return remainingFragment === undefined ? justPathMappingName(pathPrefix) : flatMap(patterns, pattern =>
            getModulesForPathsPattern(remainingFragment, baseUrl, pattern, fileExtensions, host));

        function justPathMappingName(name: string): readonly NameAndKind[] {
            return startsWith(name, fragment) ? [directoryResult(name)] : emptyArray;
        }
    }

    function getModulesForPathsPattern(fragment: string, baseUrl: string, pattern: string, fileExtensions: readonly string[], host: LanguageServiceHost): readonly NameAndKind[] | undefined {
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

        const matches = mapDefined(tryReadDirectory(host, baseDirectory, fileExtensions, /*exclude*/ undefined, [includeGlob]), match => {
            const extension = tryGetExtensionFromPath(match);
            const name = trimPrefixAndSuffix(match);
            return name === undefined ? undefined : nameAndKind(removeFileExtension(name), ScriptElementKind.scriptElement, extension);
        });
        const directories = mapDefined(tryGetDirectories(host, baseDirectory).map(d => combinePaths(baseDirectory, d)), dir => {
            const name = trimPrefixAndSuffix(dir);
            return name === undefined ? undefined : directoryResult(name);
        });
        return [...matches, ...directories];

        function trimPrefixAndSuffix(path: string): string | undefined {
            const inner = withoutStartAndEnd(normalizePath(path), completePrefix, normalizedSuffix);
            return inner === undefined ? undefined : removeLeadingDirectorySeparator(inner);
        }
    }

    function withoutStartAndEnd(s: string, start: string, end: string): string | undefined {
        return startsWith(s, start) && endsWith(s, end) ? s.slice(start.length, s.length - end.length) : undefined;
    }

    function removeLeadingDirectorySeparator(path: string): string {
        return path[0] === directorySeparator ? path.slice(1) : path;
    }

    function getAmbientModuleCompletions(fragment: string, fragmentDirectory: string | undefined, checker: TypeChecker): readonly string[] {
        // Get modules that the type checker picked up
        const ambientModules = checker.getAmbientModules().map(sym => stripQuotes(sym.name));
        const nonRelativeModuleNames = ambientModules.filter(moduleName => startsWith(moduleName, fragment));

        // Nested modules of the form "module-name/sub" need to be adjusted to only return the string
        // after the last '/' that appears in the fragment because that's where the replacement span
        // starts
        if (fragmentDirectory !== undefined) {
            const moduleNameWithSeparator = ensureTrailingDirectorySeparator(fragmentDirectory);
            return nonRelativeModuleNames.map(nonRelativeModuleName => removePrefix(nonRelativeModuleName, moduleNameWithSeparator));
        }
        return nonRelativeModuleNames;
    }

    function getTripleSlashReferenceCompletion(sourceFile: SourceFile, position: number, compilerOptions: CompilerOptions, host: LanguageServiceHost): readonly PathCompletion[] | undefined {
        const token = getTokenAtPosition(sourceFile, position);
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
        const names = kind === "path" ? getCompletionEntriesForDirectoryFragment(toComplete, scriptPath, getExtensionOptions(compilerOptions, /*includeExtensions*/ true), host, sourceFile.path)
            : kind === "types" ? getCompletionEntriesFromTypings(host, compilerOptions, scriptPath, getFragmentDirectory(toComplete), getExtensionOptions(compilerOptions))
            : Debug.fail();
        return addReplacementSpans(toComplete, range.pos + prefix.length, names);
    }

    function getCompletionEntriesFromTypings(host: LanguageServiceHost, options: CompilerOptions, scriptPath: string, fragmentDirectory: string | undefined, extensionOptions: ExtensionOptions, result: NameAndKind[] = []): readonly NameAndKind[] {
        // Check for typings specified in compiler options
        const seen = new Map<string, true>();

        const typeRoots = tryAndIgnoreErrors(() => getEffectiveTypeRoots(options, host)) || emptyArray;

        for (const root of typeRoots) {
            getCompletionEntriesFromDirectories(root);
        }

        // Also get all @types typings installed in visible node_modules directories
        for (const packageJson of findPackageJsons(scriptPath, host)) {
            const typesDir = combinePaths(getDirectoryPath(packageJson), "node_modules/@types");
            getCompletionEntriesFromDirectories(typesDir);
        }

        return result;

        function getCompletionEntriesFromDirectories(directory: string): void {
            if (!tryDirectoryExists(host, directory)) return;

            for (const typeDirectoryName of tryGetDirectories(host, directory)) {
                const packageName = unmangleScopedPackageName(typeDirectoryName);
                if (options.types && !contains(options.types, packageName)) continue;

                if (fragmentDirectory === undefined) {
                    if (!seen.has(packageName)) {
                        result.push(nameAndKind(packageName, ScriptElementKind.externalModuleName, /*extension*/ undefined));
                        seen.set(packageName, true);
                    }
                }
                else {
                    const baseDirectory = combinePaths(directory, typeDirectoryName);
                    const remainingFragment = tryRemoveDirectoryPrefix(fragmentDirectory, packageName, hostGetCanonicalFileName(host));
                    if (remainingFragment !== undefined) {
                        getCompletionEntriesForDirectoryFragment(remainingFragment, baseDirectory, extensionOptions, host, /*exclude*/ undefined, result);
                    }
                }
            }
        }
    }

    function enumerateNodeModulesVisibleToScript(host: LanguageServiceHost, scriptPath: string): readonly string[] {
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

    // Replace everything after the last directory separator that appears
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

    const nodeModulesDependencyKeys: readonly string[] = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"];

    function containsSlash(fragment: string) {
        return stringContains(fragment, directorySeparator);
    }
}
