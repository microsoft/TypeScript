/* @internal */
namespace ts.Completions.StringCompletions {
interface NameAndKindSet {
    add(value: NameAndKind): void;
    has(name: string): boolean;
    values(): ts.Iterator<NameAndKind>;
}
const kindPrecedence = {
    [ts.ScriptElementKind.directory]: 0,
    [ts.ScriptElementKind.scriptElement]: 1,
    [ts.ScriptElementKind.externalModuleName]: 2,
};
function createNameAndKindSet(): NameAndKindSet {
    const map = new ts.Map<string, NameAndKind>();
    function add(value: NameAndKind) {
        const existing = map.get(value.name);
        if (!existing || kindPrecedence[existing.kind] < kindPrecedence[value.kind]) {
            map.set(value.name, value);
        }
    }
    return {
        add,
        has: map.has.bind(map),
        values: map.values.bind(map),
    };
}

export function getStringLiteralCompletions(
    sourceFile: ts.SourceFile,
    position: number,
    contextToken: ts.Node | undefined,
    options: ts.CompilerOptions,
    host: ts.LanguageServiceHost,
    program: ts.Program,
    log: ts.Completions.Log,
    preferences: ts.UserPreferences): ts.CompletionInfo | undefined {
    if (ts.isInReferenceComment(sourceFile, position)) {
        const entries = getTripleSlashReferenceCompletion(sourceFile, position, options, host);
        return entries && convertPathCompletions(entries);
    }
    if (ts.isInString(sourceFile, position, contextToken)) {
        if (!contextToken || !ts.isStringLiteralLike(contextToken)) return undefined;
        const entries = getStringLiteralCompletionEntries(sourceFile, contextToken, position, program.getTypeChecker(), options, host, preferences);
        return convertStringLiteralCompletions(entries, contextToken, sourceFile, host, program, log, options, preferences);
    }
}

function convertStringLiteralCompletions(
    completion: StringLiteralCompletion | undefined,
    contextToken: ts.StringLiteralLike,
    sourceFile: ts.SourceFile,
    host: ts.LanguageServiceHost,
    program: ts.Program,
    log: ts.Completions.Log,
    options: ts.CompilerOptions,
    preferences: ts.UserPreferences,
): ts.CompletionInfo | undefined {
    if (completion === undefined) {
        return undefined;
    }

    const optionalReplacementSpan = ts.createTextSpanFromStringLiteralLikeContent(contextToken);
    switch (completion.kind) {
        case StringLiteralCompletionKind.Paths:
            return convertPathCompletions(completion.paths);
        case StringLiteralCompletionKind.Properties: {
            const entries = ts.createSortedArray<ts.CompletionEntry>();
            ts.Completions.getCompletionEntriesFromSymbols(
                completion.symbols,
                entries,
                contextToken,
                contextToken,
                sourceFile,
                sourceFile,
                host,
                program,
                ts.ScriptTarget.ESNext,
                log,
                ts.Completions.CompletionKind.String,
                preferences,
                options,
                /*formatContext*/ undefined,
            ); // Target will not be used, so arbitrary
            return { isGlobalCompletion: false, isMemberCompletion: true, isNewIdentifierLocation: completion.hasIndexSignature, optionalReplacementSpan, entries };
        }
        case StringLiteralCompletionKind.Types: {
            const entries = completion.types.map(type => ({
                name: type.value,
                kindModifiers: ts.ScriptElementKindModifier.none,
                kind: ts.ScriptElementKind.string,
                sortText: ts.Completions.SortText.LocationPriority,
                replacementSpan: ts.getReplacementSpanForContextToken(contextToken)
            }));
            return { isGlobalCompletion: false, isMemberCompletion: false, isNewIdentifierLocation: completion.isNewIdentifier, optionalReplacementSpan, entries };
        }
        default:
            return ts.Debug.assertNever(completion);
    }
}

export function getStringLiteralCompletionDetails(name: string, sourceFile: ts.SourceFile, position: number, contextToken: ts.Node | undefined, checker: ts.TypeChecker, options: ts.CompilerOptions, host: ts.LanguageServiceHost, cancellationToken: ts.CancellationToken, preferences: ts.UserPreferences) {
    if (!contextToken || !ts.isStringLiteralLike(contextToken)) return undefined;
    const completions = getStringLiteralCompletionEntries(sourceFile, contextToken, position, checker, options, host, preferences);
    return completions && stringLiteralCompletionDetails(name, contextToken, completions, sourceFile, checker, cancellationToken);
}

function stringLiteralCompletionDetails(name: string, location: ts.Node, completion: StringLiteralCompletion, sourceFile: ts.SourceFile, checker: ts.TypeChecker, cancellationToken: ts.CancellationToken): ts.CompletionEntryDetails | undefined {
    switch (completion.kind) {
        case StringLiteralCompletionKind.Paths: {
            const match = ts.find(completion.paths, p => p.name === name);
            return match && ts.Completions.createCompletionDetails(name, kindModifiersFromExtension(match.extension), match.kind, [ts.textPart(name)]);
        }
        case StringLiteralCompletionKind.Properties: {
            const match = ts.find(completion.symbols, s => s.name === name);
            return match && ts.Completions.createCompletionDetailsForSymbol(match, checker, sourceFile, location, cancellationToken);
        }
        case StringLiteralCompletionKind.Types:
            return ts.find(completion.types, t => t.value === name) ? ts.Completions.createCompletionDetails(name, ts.ScriptElementKindModifier.none, ts.ScriptElementKind.typeElement, [ts.textPart(name)]) : undefined;
        default:
            return ts.Debug.assertNever(completion);
    }
}

function convertPathCompletions(pathCompletions: readonly PathCompletion[]): ts.CompletionInfo {
    const isGlobalCompletion = false; // We don't want the editor to offer any other completions, such as snippets, inside a comment.
    const isNewIdentifierLocation = true; // The user may type in a path that doesn't yet exist, creating a "new identifier" with respect to the collection of identifiers the server is aware of.
    const entries = pathCompletions.map(({ name, kind, span, extension }): ts.CompletionEntry =>
        ({ name, kind, kindModifiers: kindModifiersFromExtension(extension), sortText: ts.Completions.SortText.LocationPriority, replacementSpan: span }));
    return { isGlobalCompletion, isMemberCompletion: false, isNewIdentifierLocation, entries };
}
function kindModifiersFromExtension(extension: ts.Extension | undefined): ts.ScriptElementKindModifier {
    switch (extension) {
        case ts.Extension.Dts: return ts.ScriptElementKindModifier.dtsModifier;
        case ts.Extension.Js: return ts.ScriptElementKindModifier.jsModifier;
        case ts.Extension.Json: return ts.ScriptElementKindModifier.jsonModifier;
        case ts.Extension.Jsx: return ts.ScriptElementKindModifier.jsxModifier;
        case ts.Extension.Ts: return ts.ScriptElementKindModifier.tsModifier;
        case ts.Extension.Tsx: return ts.ScriptElementKindModifier.tsxModifier;
        case ts.Extension.Dmts: return ts.ScriptElementKindModifier.dmtsModifier;
        case ts.Extension.Mjs: return ts.ScriptElementKindModifier.mjsModifier;
        case ts.Extension.Mts: return ts.ScriptElementKindModifier.mtsModifier;
        case ts.Extension.Dcts: return ts.ScriptElementKindModifier.dctsModifier;
        case ts.Extension.Cjs: return ts.ScriptElementKindModifier.cjsModifier;
        case ts.Extension.Cts: return ts.ScriptElementKindModifier.ctsModifier;
        case ts.Extension.TsBuildInfo: return ts.Debug.fail(`Extension ${ts.Extension.TsBuildInfo} is unsupported.`);
        case undefined: return ts.ScriptElementKindModifier.none;
        default:
            return ts.Debug.assertNever(extension);
    }
}

const enum StringLiteralCompletionKind { Paths, Properties, Types }
interface StringLiteralCompletionsFromProperties {
    readonly kind: StringLiteralCompletionKind.Properties;
    readonly symbols: readonly ts.Symbol[];
    readonly hasIndexSignature: boolean;
}
interface StringLiteralCompletionsFromTypes {
    readonly kind: StringLiteralCompletionKind.Types;
    readonly types: readonly ts.StringLiteralType[];
    readonly isNewIdentifier: boolean;
}
type StringLiteralCompletion = { readonly kind: StringLiteralCompletionKind.Paths, readonly paths: readonly PathCompletion[] } | StringLiteralCompletionsFromProperties | StringLiteralCompletionsFromTypes;
function getStringLiteralCompletionEntries(sourceFile: ts.SourceFile, node: ts.StringLiteralLike, position: number, typeChecker: ts.TypeChecker, compilerOptions: ts.CompilerOptions, host: ts.LanguageServiceHost, preferences: ts.UserPreferences): StringLiteralCompletion | undefined {
    const parent = walkUpParentheses(node.parent);
    switch (parent.kind) {
        case ts.SyntaxKind.LiteralType: {
            const grandParent = walkUpParentheses(parent.parent);
            switch (grandParent.kind) {
                case ts.SyntaxKind.ExpressionWithTypeArguments:
                case ts.SyntaxKind.TypeReference: {
                    const typeArgument = ts.findAncestor(parent, n => n.parent === grandParent) as ts.LiteralTypeNode;
                    if (typeArgument) {
                        return { kind: StringLiteralCompletionKind.Types, types: getStringLiteralTypes(typeChecker.getTypeArgumentConstraint(typeArgument)), isNewIdentifier: false };
                    }
                    return undefined;
                }
                case ts.SyntaxKind.IndexedAccessType:
                    // Get all apparent property names
                    // i.e. interface Foo {
                    //          foo: string;
                    //          bar: string;
                    //      }
                    //      let x: Foo["/*completion position*/"]
                    const { indexType, objectType } = grandParent as ts.IndexedAccessTypeNode;
                    if (!ts.rangeContainsPosition(indexType, position)) {
                        return undefined;
                    }
                    return stringLiteralCompletionsFromProperties(typeChecker.getTypeFromTypeNode(objectType));
                case ts.SyntaxKind.ImportType:
                    return { kind: StringLiteralCompletionKind.Paths, paths: getStringLiteralCompletionsFromModuleNames(sourceFile, node, compilerOptions, host, typeChecker, preferences) };
                case ts.SyntaxKind.UnionType: {
                    if (!ts.isTypeReferenceNode(grandParent.parent)) {
                        return undefined;
                    }
                    const alreadyUsedTypes = getAlreadyUsedTypesInStringLiteralUnion(grandParent as ts.UnionTypeNode, parent as ts.LiteralTypeNode);
                    const types = getStringLiteralTypes(typeChecker.getTypeArgumentConstraint(grandParent as ts.UnionTypeNode)).filter(t => !ts.contains(alreadyUsedTypes, t.value));
                    return { kind: StringLiteralCompletionKind.Types, types, isNewIdentifier: false };
                }
                default:
                    return undefined;
            }
        }
        case ts.SyntaxKind.PropertyAssignment:
            if (ts.isObjectLiteralExpression(parent.parent) && (parent as ts.PropertyAssignment).name === node) {
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
                return stringLiteralCompletionsForObjectLiteral(typeChecker, parent.parent);
            }
            return fromContextualType();

        case ts.SyntaxKind.ElementAccessExpression: {
            const { expression, argumentExpression } = parent as ts.ElementAccessExpression;
            if (node === ts.skipParentheses(argumentExpression)) {
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

        case ts.SyntaxKind.CallExpression:
        case ts.SyntaxKind.NewExpression:
        case ts.SyntaxKind.JsxAttribute:
            if (!isRequireCallArgument(node) && !ts.isImportCall(parent)) {
                const argumentInfo = ts.SignatureHelp.getArgumentInfoForCompletions(parent.kind === ts.SyntaxKind.JsxAttribute ? parent.parent : node, position, sourceFile);
                // Get string literal completions from specialized signatures of the target
                // i.e. declare function f(a: 'A');
                // f("/*completion position*/")
                return argumentInfo && getStringLiteralCompletionsFromSignature(argumentInfo.invocation, node, argumentInfo, typeChecker) || fromContextualType();
            }
            // falls through (is `require("")` or `require(""` or `import("")`)

        case ts.SyntaxKind.ImportDeclaration:
        case ts.SyntaxKind.ExportDeclaration:
        case ts.SyntaxKind.ExternalModuleReference:
            // Get all known external module names or complete a path to a module
            // i.e. import * as ns from "/*completion position*/";
            //      var y = import("/*completion position*/");
            //      import x = require("/*completion position*/");
            //      var y = require("/*completion position*/");
            //      export * from "/*completion position*/";
            return { kind: StringLiteralCompletionKind.Paths, paths: getStringLiteralCompletionsFromModuleNames(sourceFile, node, compilerOptions, host, typeChecker, preferences) };

        default:
            return fromContextualType();
    }

    function fromContextualType(): StringLiteralCompletion {
        // Get completion for string literal from string literal type
        // i.e. var x: "hi" | "hello" = "/*completion position*/"
        return { kind: StringLiteralCompletionKind.Types, types: getStringLiteralTypes(ts.getContextualTypeFromParent(node, typeChecker)), isNewIdentifier: false };
    }
}

function walkUpParentheses(node: ts.Node) {
    switch (node.kind) {
        case ts.SyntaxKind.ParenthesizedType:
            return ts.walkUpParenthesizedTypes(node);
        case ts.SyntaxKind.ParenthesizedExpression:
            return ts.walkUpParenthesizedExpressions(node);
        default:
            return node;
    }
}

function getAlreadyUsedTypesInStringLiteralUnion(union: ts.UnionTypeNode, current: ts.LiteralTypeNode): readonly string[] {
    return ts.mapDefined(union.types, type =>
        type !== current && ts.isLiteralTypeNode(type) && ts.isStringLiteral(type.literal) ? type.literal.text : undefined);
}

function getStringLiteralCompletionsFromSignature(call: ts.CallLikeExpression, arg: ts.StringLiteralLike, argumentInfo: ts.SignatureHelp.ArgumentInfoForCompletions, checker: ts.TypeChecker): StringLiteralCompletionsFromTypes | undefined {
    let isNewIdentifier = false;
    const uniques = new ts.Map<string, true>();
    const candidates: ts.Signature[] = [];
    const editingArgument = ts.isJsxOpeningLikeElement(call) ? ts.Debug.checkDefined(ts.findAncestor(arg.parent, ts.isJsxAttribute)) : arg;
    checker.getResolvedSignatureForStringLiteralCompletions(call, editingArgument, candidates);
    const types = ts.flatMap(candidates, candidate => {
        if (!ts.signatureHasRestParameter(candidate) && argumentInfo.argumentCount > candidate.parameters.length) return;
        let type = candidate.getTypeParameterAtPosition(argumentInfo.argumentIndex);
        if (ts.isJsxOpeningLikeElement(call)) {
            const propType = checker.getTypeOfPropertyOfType(type, (editingArgument as ts.JsxAttribute).name.text);
            if (propType) {
                type = propType;
            }
        }
        isNewIdentifier = isNewIdentifier || !!(type.flags & ts.TypeFlags.String);
        return getStringLiteralTypes(type, uniques);
    });
    return ts.length(types) ? { kind: StringLiteralCompletionKind.Types, types, isNewIdentifier } : undefined;
}

function stringLiteralCompletionsFromProperties(type: ts.Type | undefined): StringLiteralCompletionsFromProperties | undefined {
    return type && {
        kind: StringLiteralCompletionKind.Properties,
        symbols: ts.filter(type.getApparentProperties(), prop => !(prop.valueDeclaration && ts.isPrivateIdentifierClassElementDeclaration(prop.valueDeclaration))),
        hasIndexSignature: ts.hasIndexSignature(type)
    };
}

function stringLiteralCompletionsForObjectLiteral(checker: ts.TypeChecker, objectLiteralExpression: ts.ObjectLiteralExpression): StringLiteralCompletionsFromProperties | undefined {
    const contextualType = checker.getContextualType(objectLiteralExpression);
    if (!contextualType) return undefined;

    const completionsType = checker.getContextualType(objectLiteralExpression, ts.ContextFlags.Completions);
    const symbols = ts.Completions.getPropertiesForObjectExpression(
        contextualType,
        completionsType,
        objectLiteralExpression,
        checker
    );

    return {
        kind: StringLiteralCompletionKind.Properties,
        symbols,
        hasIndexSignature: ts.hasIndexSignature(contextualType)
    };
}

function getStringLiteralTypes(type: ts.Type | undefined, uniques = new ts.Map<string, true>()): readonly ts.StringLiteralType[] {
    if (!type) return ts.emptyArray;
    type = ts.skipConstraint(type);
    return type.isUnion() ? ts.flatMap(type.types, t => getStringLiteralTypes(t, uniques)) :
        type.isStringLiteral() && !(type.flags & ts.TypeFlags.EnumLiteral) && ts.addToSeen(uniques, type.value) ? [type] : ts.emptyArray;
}

interface NameAndKind {
    readonly name: string;
    readonly kind: ts.ScriptElementKind.scriptElement | ts.ScriptElementKind.directory | ts.ScriptElementKind.externalModuleName;
    readonly extension: ts.Extension | undefined;
}
interface PathCompletion extends NameAndKind {
    readonly span: ts.TextSpan | undefined;
}

function nameAndKind(name: string, kind: NameAndKind["kind"], extension: ts.Extension | undefined): NameAndKind {
    return { name, kind, extension };
}
function directoryResult(name: string): NameAndKind {
    return nameAndKind(name, ts.ScriptElementKind.directory, /*extension*/ undefined);
}

function addReplacementSpans(text: string, textStart: number, names: readonly NameAndKind[]): readonly PathCompletion[] {
    const span = getDirectoryFragmentTextSpan(text, textStart);
    const wholeSpan = text.length === 0 ? undefined : ts.createTextSpan(textStart, text.length);
    return names.map(({ name, kind, extension }): PathCompletion =>
        Math.max(name.indexOf(ts.directorySeparator), name.indexOf(ts.altDirectorySeparator)) !== -1 ? { name, kind, extension, span: wholeSpan } : { name, kind, extension, span });
}

function getStringLiteralCompletionsFromModuleNames(sourceFile: ts.SourceFile, node: ts.LiteralExpression, compilerOptions: ts.CompilerOptions, host: ts.LanguageServiceHost, typeChecker: ts.TypeChecker, preferences: ts.UserPreferences): readonly PathCompletion[] {
    return addReplacementSpans(node.text, node.getStart(sourceFile) + 1, getStringLiteralCompletionsFromModuleNamesWorker(sourceFile, node, compilerOptions, host, typeChecker, preferences));
}

function getStringLiteralCompletionsFromModuleNamesWorker(sourceFile: ts.SourceFile, node: ts.LiteralExpression, compilerOptions: ts.CompilerOptions, host: ts.LanguageServiceHost, typeChecker: ts.TypeChecker, preferences: ts.UserPreferences): readonly NameAndKind[] {
    const literalValue = ts.normalizeSlashes(node.text);
    const mode = ts.isStringLiteralLike(node) ? ts.getModeForUsageLocation(sourceFile, node) : undefined;

    const scriptPath = sourceFile.path;
    const scriptDirectory = ts.getDirectoryPath(scriptPath);

    return isPathRelativeToScript(literalValue) || !compilerOptions.baseUrl && (ts.isRootedDiskPath(literalValue) || ts.isUrl(literalValue))
        ? getCompletionEntriesForRelativeModules(literalValue, scriptDirectory, compilerOptions, host, scriptPath, getIncludeExtensionOption())
        : getCompletionEntriesForNonRelativeModules(literalValue, scriptDirectory, mode, compilerOptions, host, getIncludeExtensionOption(), typeChecker);

    function getIncludeExtensionOption() {
        const mode = ts.isStringLiteralLike(node) ? ts.getModeForUsageLocation(sourceFile, node) : undefined;
        return preferences.importModuleSpecifierEnding === "js" || mode === ts.ModuleKind.ESNext ? IncludeExtensionsOption.ModuleSpecifierCompletion : IncludeExtensionsOption.Exclude;
    }
}

interface ExtensionOptions {
    readonly extensions: readonly ts.Extension[];
    readonly includeExtensionsOption: IncludeExtensionsOption;
}
function getExtensionOptions(compilerOptions: ts.CompilerOptions, includeExtensionsOption = IncludeExtensionsOption.Exclude): ExtensionOptions {
    return { extensions: ts.flatten(getSupportedExtensionsForModuleResolution(compilerOptions)), includeExtensionsOption };
}
function getCompletionEntriesForRelativeModules(literalValue: string, scriptDirectory: string, compilerOptions: ts.CompilerOptions, host: ts.LanguageServiceHost, scriptPath: ts.Path, includeExtensions: IncludeExtensionsOption) {
    const extensionOptions = getExtensionOptions(compilerOptions, includeExtensions);
    if (compilerOptions.rootDirs) {
        return getCompletionEntriesForDirectoryFragmentWithRootDirs(
            compilerOptions.rootDirs, literalValue, scriptDirectory, extensionOptions, compilerOptions, host, scriptPath);
    }
    else {
        return ts.arrayFrom(getCompletionEntriesForDirectoryFragment(literalValue, scriptDirectory, extensionOptions, host, scriptPath).values());
    }
}

function isEmitResolutionKindUsingNodeModules(compilerOptions: ts.CompilerOptions): boolean {
    return ts.getEmitModuleResolutionKind(compilerOptions) === ts.ModuleResolutionKind.NodeJs ||
        ts.getEmitModuleResolutionKind(compilerOptions) === ts.ModuleResolutionKind.Node16 ||
        ts.getEmitModuleResolutionKind(compilerOptions) === ts.ModuleResolutionKind.NodeNext;
}

function isEmitModuleResolutionRespectingExportMaps(compilerOptions: ts.CompilerOptions) {
    return ts.getEmitModuleResolutionKind(compilerOptions) === ts.ModuleResolutionKind.Node16 ||
    ts.getEmitModuleResolutionKind(compilerOptions) === ts.ModuleResolutionKind.NodeNext;
}

function getSupportedExtensionsForModuleResolution(compilerOptions: ts.CompilerOptions): readonly ts.Extension[][] {
    const extensions = ts.getSupportedExtensions(compilerOptions);
    return isEmitResolutionKindUsingNodeModules(compilerOptions) ?
        ts.getSupportedExtensionsWithJsonIfResolveJsonModule(compilerOptions, extensions) :
        extensions;
}

/**
 * Takes a script path and returns paths for all potential folders that could be merged with its
 * containing folder via the "rootDirs" compiler option
 */
function getBaseDirectoriesFromRootDirs(rootDirs: string[], basePath: string, scriptDirectory: string, ignoreCase: boolean): readonly string[] {
    // Make all paths absolute/normalized if they are not already
    rootDirs = rootDirs.map(rootDirectory => ts.normalizePath(ts.isRootedDiskPath(rootDirectory) ? rootDirectory : ts.combinePaths(basePath, rootDirectory)));

    // Determine the path to the directory containing the script relative to the root directory it is contained within
    const relativeDirectory = ts.firstDefined(rootDirs, rootDirectory =>
        ts.containsPath(rootDirectory, scriptDirectory, basePath, ignoreCase) ? scriptDirectory.substr(rootDirectory.length) : undefined)!; // TODO: GH#18217

    // Now find a path for each potential directory that is to be merged with the one containing the script
    return ts.deduplicate<string>(
        [...rootDirs.map(rootDirectory => ts.combinePaths(rootDirectory, relativeDirectory)), scriptDirectory],
        ts.equateStringsCaseSensitive,
        ts.compareStringsCaseSensitive);
}

function getCompletionEntriesForDirectoryFragmentWithRootDirs(rootDirs: string[], fragment: string, scriptDirectory: string, extensionOptions: ExtensionOptions, compilerOptions: ts.CompilerOptions, host: ts.LanguageServiceHost, exclude: string): readonly NameAndKind[] {
    const basePath = compilerOptions.project || host.getCurrentDirectory();
    const ignoreCase = !(host.useCaseSensitiveFileNames && host.useCaseSensitiveFileNames());
    const baseDirectories = getBaseDirectoriesFromRootDirs(rootDirs, basePath, scriptDirectory, ignoreCase);
    return ts.flatMap(baseDirectories, baseDirectory => ts.arrayFrom(getCompletionEntriesForDirectoryFragment(fragment, baseDirectory, extensionOptions, host, exclude).values()));
}

const enum IncludeExtensionsOption {
    Exclude,
    Include,
    ModuleSpecifierCompletion,
}
/**
 * Given a path ending at a directory, gets the completions for the path, and filters for those entries containing the basename.
 */
function getCompletionEntriesForDirectoryFragment(
    fragment: string,
    scriptPath: string,
    extensionOptions: ExtensionOptions,
    host: ts.LanguageServiceHost,
    exclude?: string,
    result = createNameAndKindSet()
): NameAndKindSet {
    if (fragment === undefined) {
        fragment = "";
    }

    fragment = ts.normalizeSlashes(fragment);

    /**
     * Remove the basename from the path. Note that we don't use the basename to filter completions;
     * the client is responsible for refining completions.
     */
    if (!ts.hasTrailingDirectorySeparator(fragment)) {
        fragment = ts.getDirectoryPath(fragment);
    }

    if (fragment === "") {
        fragment = "." + ts.directorySeparator;
    }

    fragment = ts.ensureTrailingDirectorySeparator(fragment);

    const absolutePath = ts.resolvePath(scriptPath, fragment);
    const baseDirectory = ts.hasTrailingDirectorySeparator(absolutePath) ? absolutePath : ts.getDirectoryPath(absolutePath);

    // check for a version redirect
    const packageJsonPath = ts.findPackageJson(baseDirectory, host);
    if (packageJsonPath) {
        const packageJson = ts.readJson(packageJsonPath, host as { readFile: (filename: string) => string | undefined });
        const typesVersions = (packageJson as any).typesVersions;
        if (typeof typesVersions === "object") {
            const versionPaths = ts.getPackageJsonTypesVersionsPaths(typesVersions)?.paths;
            if (versionPaths) {
                const packageDirectory = ts.getDirectoryPath(packageJsonPath);
                const pathInPackage = absolutePath.slice(ts.ensureTrailingDirectorySeparator(packageDirectory).length);
                if (addCompletionEntriesFromPaths(result, pathInPackage, packageDirectory, extensionOptions, host, versionPaths)) {
                    // A true result means one of the `versionPaths` was matched, which will block relative resolution
                    // to files and folders from here. All reachable paths given the pattern match are already added.
                    return result;
                }
            }
        }
    }

    const ignoreCase = !(host.useCaseSensitiveFileNames && host.useCaseSensitiveFileNames());
    if (!ts.tryDirectoryExists(host, baseDirectory)) return result;

    // Enumerate the available files if possible
    const files = ts.tryReadDirectory(host, baseDirectory, extensionOptions.extensions, /*exclude*/ undefined, /*include*/ ["./*"]);

    if (files) {
        for (let filePath of files) {
            filePath = ts.normalizePath(filePath);
            if (exclude && ts.comparePaths(filePath, exclude, scriptPath, ignoreCase) === ts.Comparison.EqualTo) {
                continue;
            }

            const { name, extension } = getFilenameWithExtensionOption(ts.getBaseFileName(filePath), host.getCompilationSettings(), extensionOptions.includeExtensionsOption);
            result.add(nameAndKind(name, ts.ScriptElementKind.scriptElement, extension));
        }
    }

    // If possible, get folder completion as well
    const directories = ts.tryGetDirectories(host, baseDirectory);

    if (directories) {
        for (const directory of directories) {
            const directoryName = ts.getBaseFileName(ts.normalizePath(directory));
            if (directoryName !== "@types") {
                result.add(directoryResult(directoryName));
            }
        }
    }

    return result;
}

function getFilenameWithExtensionOption(name: string, compilerOptions: ts.CompilerOptions, includeExtensionsOption: IncludeExtensionsOption): { name: string, extension: ts.Extension | undefined } {
    const outputExtension = ts.moduleSpecifiers.tryGetJSExtensionForFile(name, compilerOptions);
    if (includeExtensionsOption === IncludeExtensionsOption.Exclude && !ts.fileExtensionIsOneOf(name, [ts.Extension.Json, ts.Extension.Mts, ts.Extension.Cts, ts.Extension.Dmts, ts.Extension.Dcts, ts.Extension.Mjs, ts.Extension.Cjs])) {
        return { name: ts.removeFileExtension(name), extension: ts.tryGetExtensionFromPath(name) };
    }
    else if ((ts.fileExtensionIsOneOf(name, [ts.Extension.Mts, ts.Extension.Cts, ts.Extension.Dmts, ts.Extension.Dcts, ts.Extension.Mjs, ts.Extension.Cjs]) || includeExtensionsOption === IncludeExtensionsOption.ModuleSpecifierCompletion) && outputExtension) {
        return { name: ts.changeExtension(name, outputExtension), extension: outputExtension };
    }
    else {
        return { name, extension: ts.tryGetExtensionFromPath(name) };
    }
}

/** @returns whether `fragment` was a match for any `paths` (which should indicate whether any other path completions should be offered) */
function addCompletionEntriesFromPaths(
    result: NameAndKindSet,
    fragment: string,
    baseDirectory: string,
    extensionOptions: ExtensionOptions,
    host: ts.LanguageServiceHost,
    paths: ts.MapLike<string[]>
) {
    const getPatternsForKey = (key: string) => paths[key];
    const comparePaths = (a: string, b: string): ts.Comparison => {
        const patternA = ts.tryParsePattern(a);
        const patternB = ts.tryParsePattern(b);
        const lengthA = typeof patternA === "object" ? patternA.prefix.length : a.length;
        const lengthB = typeof patternB === "object" ? patternB.prefix.length : b.length;
        return ts.compareValues(lengthB, lengthA);
    };
    return addCompletionEntriesFromPathsOrExports(result, fragment, baseDirectory, extensionOptions, host, ts.getOwnKeys(paths), getPatternsForKey, comparePaths);
}

/** @returns whether `fragment` was a match for any `paths` (which should indicate whether any other path completions should be offered) */
function addCompletionEntriesFromPathsOrExports(
    result: NameAndKindSet,
    fragment: string,
    baseDirectory: string,
    extensionOptions: ExtensionOptions,
    host: ts.LanguageServiceHost,
    keys: readonly string[],
    getPatternsForKey: (key: string) => string[] | undefined,
    comparePaths: (a: string, b: string) => ts.Comparison,
) {
    let pathResults: { results: NameAndKind[], matchedPattern: boolean }[] = [];
    let matchedPath: string | undefined;
    for (const key of keys) {
        if (key === ".") continue;
        const keyWithoutLeadingDotSlash = key.replace(/^\.\//, ""); // remove leading "./"
        const patterns = getPatternsForKey(key);
        if (patterns) {
            const pathPattern = ts.tryParsePattern(keyWithoutLeadingDotSlash);
            if (!pathPattern) continue;
            const isMatch = typeof pathPattern === "object" && ts.isPatternMatch(pathPattern, fragment);
            const isLongestMatch = isMatch && (matchedPath === undefined || comparePaths(key, matchedPath) === ts.Comparison.LessThan);
            if (isLongestMatch) {
                // If this is a higher priority match than anything we've seen so far, previous results from matches are invalid, e.g.
                // for `import {} from "some-package/|"` with a typesVersions:
                // {
                //   "bar/*": ["bar/*"], // <-- 1. We add 'bar', but 'bar/*' doesn't match yet.
                //   "*": ["dist/*"],    // <-- 2. We match here and add files from dist. 'bar' is still ok because it didn't come from a match.
                //   "foo/*": ["foo/*"]  // <-- 3. We matched '*' earlier and added results from dist, but if 'foo/*' also matched,
                // }                               results in dist would not be visible. 'bar' still stands because it didn't come from a match.
                //                                 This is especially important if `dist/foo` is a folder, because if we fail to clear results
                //                                 added by the '*' match, after typing `"some-package/foo/|"` we would get file results from both
                //                                 ./dist/foo and ./foo, when only the latter will actually be resolvable.
                //                                 See pathCompletionsTypesVersionsWildcard6.ts.
                matchedPath = key;
                pathResults = pathResults.filter(r => !r.matchedPattern);
            }
            if (typeof pathPattern === "string" || matchedPath === undefined || comparePaths(key, matchedPath) !== ts.Comparison.GreaterThan) {
                pathResults.push({
                    matchedPattern: isMatch,
                    results: getCompletionsForPathMapping(keyWithoutLeadingDotSlash, patterns, fragment, baseDirectory, extensionOptions, host)
                        .map(({ name, kind, extension }) => nameAndKind(name, kind, extension)),
                });
            }
        }
    }

    pathResults.forEach(pathResult => pathResult.results.forEach(r => result.add(r)));
    return matchedPath !== undefined;
}

/**
 * Check all of the declared modules and those in node modules. Possible sources of modules:
 *      Modules that are found by the type checker
 *      Modules found relative to "baseUrl" compliler options (including patterns from "paths" compiler option)
 *      Modules from node_modules (i.e. those listed in package.json)
 *          This includes all files that are found in node_modules/moduleName/ with acceptable file extensions
 */
function getCompletionEntriesForNonRelativeModules(
    fragment: string,
    scriptPath: string,
    mode: ts.SourceFile["impliedNodeFormat"],
    compilerOptions: ts.CompilerOptions,
    host: ts.LanguageServiceHost,
    includeExtensionsOption: IncludeExtensionsOption,
    typeChecker: ts.TypeChecker,
): readonly NameAndKind[] {
    const { baseUrl, paths } = compilerOptions;

    const result = createNameAndKindSet();
    const extensionOptions = getExtensionOptions(compilerOptions, includeExtensionsOption);
    if (baseUrl) {
        const projectDir = compilerOptions.project || host.getCurrentDirectory();
        const absolute = ts.normalizePath(ts.combinePaths(projectDir, baseUrl));
        getCompletionEntriesForDirectoryFragment(fragment, absolute, extensionOptions, host, /*exclude*/ undefined, result);
        if (paths) {
            addCompletionEntriesFromPaths(result, fragment, absolute, extensionOptions, host, paths);
        }
    }

    const fragmentDirectory = getFragmentDirectory(fragment);
    for (const ambientName of getAmbientModuleCompletions(fragment, fragmentDirectory, typeChecker)) {
        result.add(nameAndKind(ambientName, ts.ScriptElementKind.externalModuleName, /*extension*/ undefined));
    }

    getCompletionEntriesFromTypings(host, compilerOptions, scriptPath, fragmentDirectory, extensionOptions, result);

    if (isEmitResolutionKindUsingNodeModules(compilerOptions)) {
        // If looking for a global package name, don't just include everything in `node_modules` because that includes dependencies' own dependencies.
        // (But do if we didn't find anything, e.g. 'package.json' missing.)
        let foundGlobal = false;
        if (fragmentDirectory === undefined) {
            for (const moduleName of enumerateNodeModulesVisibleToScript(host, scriptPath)) {
                const moduleResult = nameAndKind(moduleName, ts.ScriptElementKind.externalModuleName, /*extension*/ undefined);
                if (!result.has(moduleResult.name)) {
                    foundGlobal = true;
                    result.add(moduleResult);
                }
            }
        }
        if (!foundGlobal) {
            let ancestorLookup: (directory: string) => void | undefined = ancestor => {
                const nodeModules = ts.combinePaths(ancestor, "node_modules");
                if (ts.tryDirectoryExists(host, nodeModules)) {
                    getCompletionEntriesForDirectoryFragment(fragment, nodeModules, extensionOptions, host, /*exclude*/ undefined, result);
                }
            };
            if (fragmentDirectory && isEmitModuleResolutionRespectingExportMaps(compilerOptions)) {
                const nodeModulesDirectoryLookup = ancestorLookup;
                ancestorLookup = ancestor => {
                    const components = ts.getPathComponents(fragment);
                    components.shift(); // shift off empty root
                    let packagePath = components.shift();
                    if (!packagePath) {
                        return nodeModulesDirectoryLookup(ancestor);
                    }
                    if (ts.startsWith(packagePath, "@")) {
                        const subName = components.shift();
                        if (!subName) {
                            return nodeModulesDirectoryLookup(ancestor);
                        }
                        packagePath = ts.combinePaths(packagePath, subName);
                    }
                    const packageDirectory = ts.combinePaths(ancestor, "node_modules", packagePath);
                    const packageFile = ts.combinePaths(packageDirectory, "package.json");
                    if (ts.tryFileExists(host, packageFile)) {
                        const packageJson = ts.readJson(packageFile, host);
                        const exports = (packageJson as any).exports;
                        if (exports) {
                            if (typeof exports !== "object" || exports === null) { // eslint-disable-line no-null/no-null
                                return; // null exports or entrypoint only, no sub-modules available
                            }
                            const keys = ts.getOwnKeys(exports);
                            const fragmentSubpath = components.join("/") + (components.length && ts.hasTrailingDirectorySeparator(fragment) ? "/" : "");
                            const conditions = mode === ts.ModuleKind.ESNext ? ["node", "import", "types"] : ["node", "require", "types"];
                            addCompletionEntriesFromPathsOrExports(
                                result,
                                fragmentSubpath,
                                packageDirectory,
                                extensionOptions,
                                host,
                                keys,
                                key => ts.singleElementArray(getPatternFromFirstMatchingCondition(exports[key], conditions)),
                                ts.comparePatternKeys);
                            return;
                        }
                    }
                    return nodeModulesDirectoryLookup(ancestor);
                };
            }
            ts.forEachAncestorDirectory(scriptPath, ancestorLookup);
        }
    }

    return ts.arrayFrom(result.values());
}

function getPatternFromFirstMatchingCondition(target: unknown, conditions: readonly string[]): string | undefined {
    if (typeof target === "string") {
        return target;
    }
    if (target && typeof target === "object" && !ts.isArray(target)) {
        for (const condition in target) {
            if (condition === "default" || conditions.indexOf(condition) > -1 || ts.isApplicableVersionedTypesKey(conditions, condition)) {
                const pattern = (target as ts.MapLike<unknown>)[condition];
                return getPatternFromFirstMatchingCondition(pattern, conditions);
            }
        }
    }
}

function getFragmentDirectory(fragment: string): string | undefined {
    return containsSlash(fragment) ? ts.hasTrailingDirectorySeparator(fragment) ? fragment : ts.getDirectoryPath(fragment) : undefined;
}

function getCompletionsForPathMapping(
    path: string,
    patterns: readonly string[],
    fragment: string,
    packageDirectory: string,
    extensionOptions: ExtensionOptions,
    host: ts.LanguageServiceHost,
): readonly NameAndKind[] {
    if (!ts.endsWith(path, "*")) {
        // For a path mapping "foo": ["/x/y/z.ts"], add "foo" itself as a completion.
        return !ts.stringContains(path, "*") ? justPathMappingName(path, ts.ScriptElementKind.scriptElement) : ts.emptyArray;
    }

    const pathPrefix = path.slice(0, path.length - 1);
    const remainingFragment = ts.tryRemovePrefix(fragment, pathPrefix);
    if (remainingFragment === undefined) {
        const starIsFullPathComponent = path[path.length - 2] === "/";
        return starIsFullPathComponent ? justPathMappingName(pathPrefix, ts.ScriptElementKind.directory) : ts.flatMap(patterns, pattern =>
            getModulesForPathsPattern("", packageDirectory, pattern, extensionOptions, host)?.map(({ name, ...rest }) => ({ name: pathPrefix + name, ...rest })));
    }
    return ts.flatMap(patterns, pattern => getModulesForPathsPattern(remainingFragment, packageDirectory, pattern, extensionOptions, host));

    function justPathMappingName(name: string, kind: ts.ScriptElementKind.directory | ts.ScriptElementKind.scriptElement): readonly NameAndKind[] {
        return ts.startsWith(name, fragment) ? [{ name: ts.removeTrailingDirectorySeparator(name), kind, extension: undefined }] : ts.emptyArray;
    }
}

function getModulesForPathsPattern(
    fragment: string,
    packageDirectory: string,
    pattern: string,
    extensionOptions: ExtensionOptions,
    host: ts.LanguageServiceHost,
): readonly NameAndKind[] | undefined {
    if (!host.readDirectory) {
        return undefined;
    }

    const parsed = ts.tryParsePattern(pattern);
    if (parsed === undefined || ts.isString(parsed)) {
        return undefined;
    }

    // The prefix has two effective parts: the directory path and the base component after the filepath that is not a
    // full directory component. For example: directory/path/of/prefix/base*
    const normalizedPrefix = ts.resolvePath(parsed.prefix);
    const normalizedPrefixDirectory = ts.hasTrailingDirectorySeparator(parsed.prefix) ? normalizedPrefix : ts.getDirectoryPath(normalizedPrefix);
    const normalizedPrefixBase = ts.hasTrailingDirectorySeparator(parsed.prefix) ? "" : ts.getBaseFileName(normalizedPrefix);

    const fragmentHasPath = containsSlash(fragment);
    const fragmentDirectory = fragmentHasPath ? ts.hasTrailingDirectorySeparator(fragment) ? fragment : ts.getDirectoryPath(fragment) : undefined;

    // Try and expand the prefix to include any path from the fragment so that we can limit the readDirectory call
    const expandedPrefixDirectory = fragmentHasPath ? ts.combinePaths(normalizedPrefixDirectory, normalizedPrefixBase + fragmentDirectory) : normalizedPrefixDirectory;

    const normalizedSuffix = ts.normalizePath(parsed.suffix);
    // Need to normalize after combining: If we combinePaths("a", "../b"), we want "b" and not "a/../b".
    const baseDirectory = ts.normalizePath(ts.combinePaths(packageDirectory, expandedPrefixDirectory));
    const completePrefix = fragmentHasPath ? baseDirectory : ts.ensureTrailingDirectorySeparator(baseDirectory) + normalizedPrefixBase;

    // If we have a suffix, then we read the directory all the way down to avoid returning completions for
    // directories that don't contain files that would match the suffix. A previous comment here was concerned
    // about the case where `normalizedSuffix` includes a `?` character, which should be interpreted literally,
    // but will match any single character as part of the `include` pattern in `tryReadDirectory`. This is not
    // a problem, because (in the extremely unusual circumstance where the suffix has a `?` in it) a `?`
    // interpreted as "any character" can only return *too many* results as compared to the literal
    // interpretation, so we can filter those superfluous results out via `trimPrefixAndSuffix` as we've always
    // done.
    const includeGlob = normalizedSuffix ? "**/*" + normalizedSuffix : "./*";

    const matches = ts.mapDefined(ts.tryReadDirectory(host, baseDirectory, extensionOptions.extensions, /*exclude*/ undefined, [includeGlob]), match => {
        const trimmedWithPattern = trimPrefixAndSuffix(match);
        if (trimmedWithPattern) {
            if (containsSlash(trimmedWithPattern)) {
                return directoryResult(ts.getPathComponents(removeLeadingDirectorySeparator(trimmedWithPattern))[1]);
            }
            const { name, extension } = getFilenameWithExtensionOption(trimmedWithPattern, host.getCompilationSettings(), extensionOptions.includeExtensionsOption);
            return nameAndKind(name, ts.ScriptElementKind.scriptElement, extension);
        }
    });

    // If we had a suffix, we already recursively searched for all possible files that could match
    // it and returned the directories leading to those files. Otherwise, assume any directory could
    // have something valid to import.
    const directories = normalizedSuffix
        ? ts.emptyArray
        : ts.mapDefined(ts.tryGetDirectories(host, baseDirectory), dir => dir === "node_modules" ? undefined : directoryResult(dir));
    return [...matches, ...directories];

    function trimPrefixAndSuffix(path: string): string | undefined {
        const inner = withoutStartAndEnd(ts.normalizePath(path), completePrefix, normalizedSuffix);
        return inner === undefined ? undefined : removeLeadingDirectorySeparator(inner);
    }
}

function withoutStartAndEnd(s: string, start: string, end: string): string | undefined {
    return ts.startsWith(s, start) && ts.endsWith(s, end) ? s.slice(start.length, s.length - end.length) : undefined;
}

function removeLeadingDirectorySeparator(path: string): string {
    return path[0] === ts.directorySeparator ? path.slice(1) : path;
}

function getAmbientModuleCompletions(fragment: string, fragmentDirectory: string | undefined, checker: ts.TypeChecker): readonly string[] {
    // Get modules that the type checker picked up
    const ambientModules = checker.getAmbientModules().map(sym => ts.stripQuotes(sym.name));
    const nonRelativeModuleNames = ambientModules.filter(moduleName => ts.startsWith(moduleName, fragment));

    // Nested modules of the form "module-name/sub" need to be adjusted to only return the string
    // after the last '/' that appears in the fragment because that's where the replacement span
    // starts
    if (fragmentDirectory !== undefined) {
        const moduleNameWithSeparator = ts.ensureTrailingDirectorySeparator(fragmentDirectory);
        return nonRelativeModuleNames.map(nonRelativeModuleName => ts.removePrefix(nonRelativeModuleName, moduleNameWithSeparator));
    }
    return nonRelativeModuleNames;
}

function getTripleSlashReferenceCompletion(sourceFile: ts.SourceFile, position: number, compilerOptions: ts.CompilerOptions, host: ts.LanguageServiceHost): readonly PathCompletion[] | undefined {
    const token = ts.getTokenAtPosition(sourceFile, position);
    const commentRanges = ts.getLeadingCommentRanges(sourceFile.text, token.pos);
    const range = commentRanges && ts.find(commentRanges, commentRange => position >= commentRange.pos && position <= commentRange.end);
    if (!range) {
        return undefined;
    }
    const text = sourceFile.text.slice(range.pos, position);
    const match = tripleSlashDirectiveFragmentRegex.exec(text);
    if (!match) {
        return undefined;
    }

    const [, prefix, kind, toComplete] = match;
    const scriptPath = ts.getDirectoryPath(sourceFile.path);
    const names = kind === "path" ? getCompletionEntriesForDirectoryFragment(toComplete, scriptPath, getExtensionOptions(compilerOptions, IncludeExtensionsOption.Include), host, sourceFile.path)
        : kind === "types" ? getCompletionEntriesFromTypings(host, compilerOptions, scriptPath, getFragmentDirectory(toComplete), getExtensionOptions(compilerOptions))
        : ts.Debug.fail();
    return addReplacementSpans(toComplete, range.pos + prefix.length, ts.arrayFrom(names.values()));
}

function getCompletionEntriesFromTypings(host: ts.LanguageServiceHost, options: ts.CompilerOptions, scriptPath: string, fragmentDirectory: string | undefined, extensionOptions: ExtensionOptions, result = createNameAndKindSet()): NameAndKindSet {
    // Check for typings specified in compiler options
    const seen = new ts.Map<string, true>();

    const typeRoots = ts.tryAndIgnoreErrors(() => ts.getEffectiveTypeRoots(options, host)) || ts.emptyArray;

    for (const root of typeRoots) {
        getCompletionEntriesFromDirectories(root);
    }

    // Also get all @types typings installed in visible node_modules directories
    for (const packageJson of ts.findPackageJsons(scriptPath, host)) {
        const typesDir = ts.combinePaths(ts.getDirectoryPath(packageJson), "node_modules/@types");
        getCompletionEntriesFromDirectories(typesDir);
    }

    return result;

    function getCompletionEntriesFromDirectories(directory: string): void {
        if (!ts.tryDirectoryExists(host, directory)) return;

        for (const typeDirectoryName of ts.tryGetDirectories(host, directory)) {
            const packageName = ts.unmangleScopedPackageName(typeDirectoryName);
            if (options.types && !ts.contains(options.types, packageName)) continue;

            if (fragmentDirectory === undefined) {
                if (!seen.has(packageName)) {
                    result.add(nameAndKind(packageName, ts.ScriptElementKind.externalModuleName, /*extension*/ undefined));
                    seen.set(packageName, true);
                }
            }
            else {
                const baseDirectory = ts.combinePaths(directory, typeDirectoryName);
                const remainingFragment = ts.tryRemoveDirectoryPrefix(fragmentDirectory, packageName, ts.hostGetCanonicalFileName(host));
                if (remainingFragment !== undefined) {
                    getCompletionEntriesForDirectoryFragment(remainingFragment, baseDirectory, extensionOptions, host, /*exclude*/ undefined, result);
                }
            }
        }
    }
}

function enumerateNodeModulesVisibleToScript(host: ts.LanguageServiceHost, scriptPath: string): readonly string[] {
    if (!host.readFile || !host.fileExists) return ts.emptyArray;

    const result: string[] = [];
    for (const packageJson of ts.findPackageJsons(scriptPath, host)) {
        const contents = ts.readJson(packageJson, host as { readFile: (filename: string) => string | undefined }); // Cast to assert that readFile is defined
        // Provide completions for all non @types dependencies
        for (const key of nodeModulesDependencyKeys) {
            const dependencies: object | undefined = (contents as any)[key];
            if (!dependencies) continue;
            for (const dep in dependencies) {
                if (ts.hasProperty(dependencies, dep) && !ts.startsWith(dep, "@types/")) {
                    result.push(dep);
                }
            }
        }
    }
    return result;
}

// Replace everything after the last directory separator that appears
function getDirectoryFragmentTextSpan(text: string, textStart: number): ts.TextSpan | undefined {
    const index = Math.max(text.lastIndexOf(ts.directorySeparator), text.lastIndexOf(ts.altDirectorySeparator));
    const offset = index !== -1 ? index + 1 : 0;
    // If the range is an identifier, span is unnecessary.
    const length = text.length - offset;
    return length === 0 || ts.isIdentifierText(text.substr(offset, length), ts.ScriptTarget.ESNext) ? undefined : ts.createTextSpan(textStart + offset, length);
}

// Returns true if the path is explicitly relative to the script (i.e. relative to . or ..)
function isPathRelativeToScript(path: string) {
    if (path && path.length >= 2 && path.charCodeAt(0) === ts.CharacterCodes.dot) {
        const slashIndex = path.length >= 3 && path.charCodeAt(1) === ts.CharacterCodes.dot ? 2 : 1;
        const slashCharCode = path.charCodeAt(slashIndex);
        return slashCharCode === ts.CharacterCodes.slash || slashCharCode === ts.CharacterCodes.backslash;
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
    return ts.stringContains(fragment, ts.directorySeparator);
}

/**
 * Matches
 *   require(""
 *   require("")
 */
function isRequireCallArgument(node: ts.Node) {
    return ts.isCallExpression(node.parent) && ts.firstOrUndefined(node.parent.arguments) === node
        && ts.isIdentifier(node.parent.expression) && node.parent.expression.escapedText === "require";
}
}
