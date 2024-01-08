import {
    __String,
    AccessExpression,
    AccessorDeclaration,
    addRange,
    affectsDeclarationPathOptionDeclarations,
    affectsEmitOptionDeclarations,
    AliasDeclarationNode,
    AllAccessorDeclarations,
    AmbientModuleDeclaration,
    AmpersandAmpersandEqualsToken,
    AnyImportOrBareOrAccessedRequire,
    AnyImportOrReExport,
    AnyImportSyntax,
    AnyValidImportOrReExport,
    append,
    arrayFrom,
    ArrayLiteralExpression,
    ArrayTypeNode,
    ArrowFunction,
    AsExpression,
    AssertionExpression,
    assertType,
    AssignmentDeclarationKind,
    AssignmentExpression,
    AssignmentOperatorToken,
    BarBarEqualsToken,
    BinaryExpression,
    binarySearch,
    BindableObjectDefinePropertyCall,
    BindableStaticAccessExpression,
    BindableStaticElementAccessExpression,
    BindableStaticNameExpression,
    BindingElement,
    BindingElementOfBareOrAccessedRequire,
    Block,
    BundleFileSection,
    BundleFileSectionKind,
    BundleFileTextLike,
    CallExpression,
    CallLikeExpression,
    CallSignatureDeclaration,
    canHaveDecorators,
    canHaveModifiers,
    CaseBlock,
    CaseClause,
    CaseOrDefaultClause,
    CatchClause,
    changeAnyExtension,
    CharacterCodes,
    CheckFlags,
    ClassDeclaration,
    ClassElement,
    ClassExpression,
    classHasDeclaredOrExplicitlyAssignedName,
    ClassLikeDeclaration,
    ClassStaticBlockDeclaration,
    combinePaths,
    CommaListExpression,
    CommandLineOption,
    CommentDirective,
    CommentDirectivesMap,
    CommentDirectiveType,
    CommentRange,
    comparePaths,
    compareStringsCaseSensitive,
    compareValues,
    Comparison,
    CompilerOptions,
    ComputedPropertyName,
    computeLineAndCharacterOfPosition,
    computeLineOfPosition,
    computeLineStarts,
    concatenate,
    ConditionalExpression,
    ConstructorDeclaration,
    ConstructSignatureDeclaration,
    ContainerFlags,
    contains,
    containsPath,
    createGetCanonicalFileName,
    createMultiMap,
    createScanner,
    createTextSpan,
    createTextSpanFromBounds,
    Debug,
    Declaration,
    DeclarationName,
    DeclarationWithTypeParameterChildren,
    DeclarationWithTypeParameters,
    Decorator,
    DefaultClause,
    DestructuringAssignment,
    Diagnostic,
    DiagnosticArguments,
    DiagnosticCollection,
    DiagnosticMessage,
    DiagnosticMessageChain,
    DiagnosticRelatedInformation,
    Diagnostics,
    DiagnosticWithDetachedLocation,
    DiagnosticWithLocation,
    directorySeparator,
    DoStatement,
    DynamicNamedBinaryExpression,
    DynamicNamedDeclaration,
    ElementAccessExpression,
    EmitFlags,
    EmitHost,
    EmitResolver,
    EmitTextWriter,
    emptyArray,
    endsWith,
    ensurePathIsNonModuleName,
    ensureTrailingDirectorySeparator,
    EntityName,
    EntityNameExpression,
    EntityNameOrEntityNameExpression,
    EnumDeclaration,
    EqualityComparer,
    equalOwnProperties,
    EqualsToken,
    equateValues,
    escapeLeadingUnderscores,
    every,
    ExportAssignment,
    ExportDeclaration,
    ExportSpecifier,
    Expression,
    ExpressionStatement,
    ExpressionWithTypeArguments,
    Extension,
    ExternalModuleReference,
    factory,
    FileExtensionInfo,
    fileExtensionIs,
    fileExtensionIsOneOf,
    FileWatcher,
    filter,
    find,
    findAncestor,
    findBestPatternMatch,
    findIndex,
    findLast,
    firstDefined,
    firstOrUndefined,
    flatMap,
    flatMapToMutable,
    flatten,
    forEach,
    forEachAncestorDirectory,
    forEachChild,
    forEachChildRecursively,
    ForInOrOfStatement,
    ForStatement,
    FunctionBody,
    FunctionDeclaration,
    FunctionExpression,
    FunctionLikeDeclaration,
    GetAccessorDeclaration,
    getAllJSDocTags,
    getBaseFileName,
    GetCanonicalFileName,
    getCombinedModifierFlags,
    getCombinedNodeFlags,
    getCommonSourceDirectory,
    getContainerFlags,
    getDirectoryPath,
    getJSDocAugmentsTag,
    getJSDocDeprecatedTagNoCache,
    getJSDocImplementsTags,
    getJSDocOverrideTagNoCache,
    getJSDocParameterTags,
    getJSDocParameterTagsNoCache,
    getJSDocPrivateTagNoCache,
    getJSDocProtectedTagNoCache,
    getJSDocPublicTagNoCache,
    getJSDocReadonlyTagNoCache,
    getJSDocReturnType,
    getJSDocSatisfiesTag,
    getJSDocTags,
    getJSDocType,
    getJSDocTypeParameterTags,
    getJSDocTypeParameterTagsNoCache,
    getJSDocTypeTag,
    getLeadingCommentRanges,
    getLineAndCharacterOfPosition,
    getLinesBetweenPositions,
    getLineStarts,
    getNameOfDeclaration,
    getNormalizedAbsolutePath,
    getNormalizedPathComponents,
    getOwnKeys,
    getParseTreeNode,
    getPathComponents,
    getPathFromPathComponents,
    getRelativePathToDirectoryOrUrl,
    getResolutionModeOverride,
    getRootLength,
    getSnippetElement,
    getStringComparer,
    getSymbolId,
    getTrailingCommentRanges,
    HasExpressionInitializer,
    hasExtension,
    HasFlowNode,
    HasInitializer,
    hasInitializer,
    HasJSDoc,
    hasJSDocNodes,
    HasModifiers,
    hasProperty,
    HasType,
    HasTypeArguments,
    HeritageClause,
    Identifier,
    identifierToKeywordKind,
    IdentifierTypePredicate,
    identity,
    idText,
    IfStatement,
    ignoredPaths,
    ImportCall,
    ImportClause,
    ImportDeclaration,
    ImportEqualsDeclaration,
    ImportMetaProperty,
    ImportSpecifier,
    ImportTypeNode,
    IndexInfo,
    indexOfAnyCharCode,
    IndexSignatureDeclaration,
    InitializedVariableDeclaration,
    insertSorted,
    InstanceofExpression,
    InterfaceDeclaration,
    InternalEmitFlags,
    isAccessor,
    isAnyDirectorySeparator,
    isArray,
    isArrayLiteralExpression,
    isArrowFunction,
    isAutoAccessorPropertyDeclaration,
    isBigIntLiteral,
    isBinaryExpression,
    isBindingElement,
    isBindingPattern,
    isCallExpression,
    isClassDeclaration,
    isClassElement,
    isClassExpression,
    isClassLike,
    isClassStaticBlockDeclaration,
    isCommaListExpression,
    isComputedPropertyName,
    isConstructorDeclaration,
    isDeclaration,
    isDecorator,
    isElementAccessExpression,
    isEnumDeclaration,
    isEnumMember,
    isExportAssignment,
    isExportDeclaration,
    isExpressionStatement,
    isExpressionWithTypeArguments,
    isExternalModule,
    isExternalModuleReference,
    isFileProbablyExternalModule,
    isForStatement,
    isFunctionDeclaration,
    isFunctionExpression,
    isFunctionLike,
    isFunctionLikeDeclaration,
    isFunctionLikeOrClassStaticBlockDeclaration,
    isGetAccessorDeclaration,
    isHeritageClause,
    isIdentifier,
    isIdentifierStart,
    isIdentifierText,
    isImportTypeNode,
    isInterfaceDeclaration,
    isJSDoc,
    isJSDocAugmentsTag,
    isJSDocFunctionType,
    isJSDocLinkLike,
    isJSDocMemberName,
    isJSDocNameReference,
    isJSDocNode,
    isJSDocOverloadTag,
    isJSDocParameterTag,
    isJSDocPropertyLikeTag,
    isJSDocSatisfiesTag,
    isJSDocSignature,
    isJSDocTag,
    isJSDocTemplateTag,
    isJSDocTypeExpression,
    isJSDocTypeLiteral,
    isJSDocTypeTag,
    isJsxChild,
    isJsxFragment,
    isJsxNamespacedName,
    isJsxOpeningLikeElement,
    isJsxText,
    isLeftHandSideExpression,
    isLineBreak,
    isLiteralTypeNode,
    isMemberName,
    isMetaProperty,
    isMethodDeclaration,
    isMethodOrAccessor,
    isModifierLike,
    isModuleDeclaration,
    isNamedDeclaration,
    isNamespaceExport,
    isNamespaceExportDeclaration,
    isNamespaceImport,
    isNonNullExpression,
    isNoSubstitutionTemplateLiteral,
    isNumericLiteral,
    isObjectLiteralExpression,
    isOmittedExpression,
    isParameter,
    isParameterPropertyDeclaration,
    isParenthesizedExpression,
    isParenthesizedTypeNode,
    isPrefixUnaryExpression,
    isPrivateIdentifier,
    isPropertyAccessExpression,
    isPropertyAssignment,
    isPropertyDeclaration,
    isPropertyName,
    isPropertySignature,
    isQualifiedName,
    isRootedDiskPath,
    isSetAccessorDeclaration,
    isShiftOperatorOrHigher,
    isShorthandPropertyAssignment,
    isSourceFile,
    isString,
    isStringLiteral,
    isStringLiteralLike,
    isTypeAliasDeclaration,
    isTypeElement,
    isTypeLiteralNode,
    isTypeNode,
    isTypeParameterDeclaration,
    isTypeReferenceNode,
    isVariableDeclaration,
    isVariableStatement,
    isVoidExpression,
    isWhiteSpaceLike,
    isWhiteSpaceSingleLine,
    JSDoc,
    JSDocArray,
    JSDocCallbackTag,
    JSDocEnumTag,
    JSDocMemberName,
    JSDocOverloadTag,
    JSDocParameterTag,
    JSDocPropertyLikeTag,
    JSDocSatisfiesExpression,
    JSDocSatisfiesTag,
    JSDocSignature,
    JSDocTag,
    JSDocTemplateTag,
    JSDocTypedefTag,
    JsonSourceFile,
    JsxAttributeName,
    JsxChild,
    JsxElement,
    JsxEmit,
    JsxFragment,
    JsxNamespacedName,
    JsxOpeningElement,
    JsxOpeningLikeElement,
    JsxSelfClosingElement,
    JsxTagNameExpression,
    KeywordSyntaxKind,
    LabeledStatement,
    LanguageVariant,
    last,
    lastOrUndefined,
    LateVisibilityPaintedStatement,
    length,
    LiteralImportTypeNode,
    LiteralLikeElementAccessExpression,
    LiteralLikeNode,
    LogicalOperator,
    LogicalOrCoalescingAssignmentOperator,
    mangleScopedPackageName,
    map,
    mapDefined,
    MapLike,
    MemberName,
    memoize,
    MetaProperty,
    MethodDeclaration,
    MethodSignature,
    ModeAwareCache,
    ModifierFlags,
    ModifierLike,
    ModuleBlock,
    ModuleDeclaration,
    ModuleDetectionKind,
    ModuleKind,
    ModuleResolutionKind,
    moduleResolutionOptionDeclarations,
    MultiMap,
    NamedDeclaration,
    NamedExports,
    NamedImports,
    NamedImportsOrExports,
    NamespaceExport,
    NamespaceImport,
    NewExpression,
    NewLineKind,
    Node,
    NodeArray,
    NodeFlags,
    nodeModulesPathPart,
    NonNullExpression,
    noop,
    normalizePath,
    NoSubstitutionTemplateLiteral,
    NumberLiteralType,
    NumericLiteral,
    ObjectFlags,
    ObjectFlagsType,
    ObjectLiteralElement,
    ObjectLiteralExpression,
    ObjectLiteralExpressionBase,
    ObjectTypeDeclaration,
    optionsAffectingProgramStructure,
    or,
    OuterExpressionKinds,
    PackageId,
    ParameterDeclaration,
    ParenthesizedExpression,
    ParenthesizedTypeNode,
    parseConfigFileTextToJson,
    PartiallyEmittedExpression,
    Path,
    pathIsRelative,
    Pattern,
    PostfixUnaryExpression,
    PrefixUnaryExpression,
    PrinterOptions,
    PrintHandlers,
    PrivateIdentifier,
    ProjectReference,
    PrologueDirective,
    PropertyAccessEntityNameExpression,
    PropertyAccessExpression,
    PropertyAssignment,
    PropertyDeclaration,
    PropertyName,
    PropertyNameLiteral,
    PropertySignature,
    PseudoBigInt,
    PunctuationOrKeywordSyntaxKind,
    PunctuationSyntaxKind,
    QualifiedName,
    QuestionQuestionEqualsToken,
    ReadonlyCollection,
    ReadonlyTextRange,
    removeTrailingDirectorySeparator,
    RequireOrImportCall,
    RequireVariableStatement,
    ResolutionMode,
    ResolutionNameAndModeGetter,
    ResolvedModuleFull,
    ResolvedModuleWithFailedLookupLocations,
    ResolvedTypeReferenceDirective,
    ResolvedTypeReferenceDirectiveWithFailedLookupLocations,
    ReturnStatement,
    SatisfiesExpression,
    ScriptKind,
    ScriptTarget,
    semanticDiagnosticsOptionDeclarations,
    SetAccessorDeclaration,
    ShorthandPropertyAssignment,
    shouldAllowImportingTsExtension,
    Signature,
    SignatureDeclaration,
    SignatureFlags,
    singleElementArray,
    singleOrUndefined,
    skipOuterExpressions,
    skipTrivia,
    SnippetKind,
    some,
    sort,
    SortedArray,
    SourceFile,
    SourceFileLike,
    SourceFileMayBeEmittedHost,
    SourceMapSource,
    startsWith,
    startsWithUseStrict,
    Statement,
    StringLiteral,
    StringLiteralLike,
    StringLiteralType,
    stringToToken,
    SuperCall,
    SuperExpression,
    SuperProperty,
    SwitchStatement,
    Symbol,
    SymbolFlags,
    SymbolTable,
    SyntaxKind,
    SyntaxList,
    TaggedTemplateExpression,
    TemplateLiteral,
    TemplateLiteralLikeNode,
    TemplateLiteralToken,
    TemplateLiteralTypeSpan,
    TemplateSpan,
    TextRange,
    TextSpan,
    ThisTypePredicate,
    Token,
    TokenFlags,
    tokenToString,
    toPath,
    tracing,
    TransformFlags,
    TransientSymbol,
    TriviaSyntaxKind,
    tryCast,
    tryRemovePrefix,
    TryStatement,
    TsConfigSourceFile,
    TupleTypeNode,
    Type,
    TypeAliasDeclaration,
    TypeAssertion,
    TypeChecker,
    TypeCheckerHost,
    TypeElement,
    TypeFlags,
    TypeLiteralNode,
    TypeNode,
    TypeNodeSyntaxKind,
    TypeParameter,
    TypeParameterDeclaration,
    TypePredicate,
    TypePredicateKind,
    TypeReferenceNode,
    unescapeLeadingUnderscores,
    UnionOrIntersectionTypeNode,
    UniqueESSymbolType,
    UserPreferences,
    ValidImportTypeNode,
    VariableDeclaration,
    VariableDeclarationInitializedTo,
    VariableDeclarationList,
    VariableLikeDeclaration,
    VariableStatement,
    WhileStatement,
    WithStatement,
    WrappedExpression,
    WriteFileCallback,
    WriteFileCallbackData,
    YieldExpression,
} from "./_namespaces/ts";

/** @internal */
export const resolvingEmptyArray: never[] = [];

/** @internal */
export const externalHelpersModuleNameText = "tslib";

/** @internal */
export const defaultMaximumTruncationLength = 160;
/** @internal */
export const noTruncationMaximumTruncationLength = 1_000_000;

/** @internal */
export function getDeclarationOfKind<T extends Declaration>(symbol: Symbol, kind: T["kind"]): T | undefined {
    const declarations = symbol.declarations;
    if (declarations) {
        for (const declaration of declarations) {
            if (declaration.kind === kind) {
                return declaration as T;
            }
        }
    }

    return undefined;
}

/** @internal */
export function getDeclarationsOfKind<T extends Declaration>(symbol: Symbol, kind: T["kind"]): T[] {
    return filter(symbol.declarations || emptyArray, d => d.kind === kind) as T[];
}

/** @internal */
export function createSymbolTable(symbols?: readonly Symbol[]): SymbolTable {
    const result = new Map<__String, Symbol>();
    if (symbols) {
        for (const symbol of symbols) {
            result.set(symbol.escapedName, symbol);
        }
    }
    return result;
}

/** @internal */
export function isTransientSymbol(symbol: Symbol): symbol is TransientSymbol {
    return (symbol.flags & SymbolFlags.Transient) !== 0;
}

const stringWriter = createSingleLineStringWriter();

function createSingleLineStringWriter(): EmitTextWriter {
    // Why var? It avoids TDZ checks in the runtime which can be costly.
    // See: https://github.com/microsoft/TypeScript/issues/52924
    /* eslint-disable no-var */
    var str = "";
    /* eslint-enable no-var */
    const writeText: (text: string) => void = text => str += text;
    return {
        getText: () => str,
        write: writeText,
        rawWrite: writeText,
        writeKeyword: writeText,
        writeOperator: writeText,
        writePunctuation: writeText,
        writeSpace: writeText,
        writeStringLiteral: writeText,
        writeLiteral: writeText,
        writeParameter: writeText,
        writeProperty: writeText,
        writeSymbol: (s, _) => writeText(s),
        writeTrailingSemicolon: writeText,
        writeComment: writeText,
        getTextPos: () => str.length,
        getLine: () => 0,
        getColumn: () => 0,
        getIndent: () => 0,
        isAtStartOfLine: () => false,
        hasTrailingComment: () => false,
        hasTrailingWhitespace: () => !!str.length && isWhiteSpaceLike(str.charCodeAt(str.length - 1)),

        // Completely ignore indentation for string writers.  And map newlines to
        // a single space.
        writeLine: () => str += " ",
        increaseIndent: noop,
        decreaseIndent: noop,
        clear: () => str = "",
    };
}

/** @internal */
export function changesAffectModuleResolution(oldOptions: CompilerOptions, newOptions: CompilerOptions): boolean {
    return oldOptions.configFilePath !== newOptions.configFilePath ||
        optionsHaveModuleResolutionChanges(oldOptions, newOptions);
}

/** @internal */
export function optionsHaveModuleResolutionChanges(oldOptions: CompilerOptions, newOptions: CompilerOptions) {
    return optionsHaveChanges(oldOptions, newOptions, moduleResolutionOptionDeclarations);
}

/** @internal */
export function changesAffectingProgramStructure(oldOptions: CompilerOptions, newOptions: CompilerOptions) {
    return optionsHaveChanges(oldOptions, newOptions, optionsAffectingProgramStructure);
}

/** @internal */
export function optionsHaveChanges(oldOptions: CompilerOptions, newOptions: CompilerOptions, optionDeclarations: readonly CommandLineOption[]) {
    return oldOptions !== newOptions && optionDeclarations.some(o => !isJsonEqual(getCompilerOptionValue(oldOptions, o), getCompilerOptionValue(newOptions, o)));
}

/** @internal */
export function forEachAncestor<T>(node: Node, callback: (n: Node) => T | undefined | "quit"): T | undefined {
    while (true) {
        const res = callback(node);
        if (res === "quit") return undefined;
        if (res !== undefined) return res;
        if (isSourceFile(node)) return undefined;
        node = node.parent;
    }
}

/**
 * Calls `callback` for each entry in the map, returning the first truthy result.
 * Use `map.forEach` instead for normal iteration.
 *
 * @internal
 */
export function forEachEntry<K, V, U>(map: ReadonlyMap<K, V>, callback: (value: V, key: K) => U | undefined): U | undefined {
    const iterator = map.entries();
    for (const [key, value] of iterator) {
        const result = callback(value, key);
        if (result) {
            return result;
        }
    }
    return undefined;
}

/**
 * `forEachEntry` for just keys.
 *
 * @internal
 */
export function forEachKey<K, T>(map: ReadonlyCollection<K>, callback: (key: K) => T | undefined): T | undefined {
    const iterator = map.keys();
    for (const key of iterator) {
        const result = callback(key);
        if (result) {
            return result;
        }
    }
    return undefined;
}

/**
 * Copy entries from `source` to `target`.
 *
 * @internal
 */
export function copyEntries<K, V>(source: ReadonlyMap<K, V>, target: Map<K, V>): void {
    source.forEach((value, key) => {
        target.set(key, value);
    });
}

/** @internal */
export function usingSingleLineStringWriter(action: (writer: EmitTextWriter) => void): string {
    const oldString = stringWriter.getText();
    try {
        action(stringWriter);
        return stringWriter.getText();
    }
    finally {
        stringWriter.clear();
        stringWriter.writeKeyword(oldString);
    }
}

/** @internal */
export function getFullWidth(node: Node) {
    return node.end - node.pos;
}

/** @internal */
export function projectReferenceIsEqualTo(oldRef: ProjectReference, newRef: ProjectReference) {
    return oldRef.path === newRef.path &&
        !oldRef.prepend === !newRef.prepend &&
        !oldRef.circular === !newRef.circular;
}

/** @internal */
export function moduleResolutionIsEqualTo(oldResolution: ResolvedModuleWithFailedLookupLocations, newResolution: ResolvedModuleWithFailedLookupLocations): boolean {
    return oldResolution === newResolution ||
        oldResolution.resolvedModule === newResolution.resolvedModule ||
        !!oldResolution.resolvedModule &&
            !!newResolution.resolvedModule &&
            oldResolution.resolvedModule.isExternalLibraryImport === newResolution.resolvedModule.isExternalLibraryImport &&
            oldResolution.resolvedModule.extension === newResolution.resolvedModule.extension &&
            oldResolution.resolvedModule.resolvedFileName === newResolution.resolvedModule.resolvedFileName &&
            oldResolution.resolvedModule.originalPath === newResolution.resolvedModule.originalPath &&
            packageIdIsEqual(oldResolution.resolvedModule.packageId, newResolution.resolvedModule.packageId) &&
            oldResolution.node10Result === newResolution.node10Result;
}

/** @internal */
export function createModuleNotFoundChain(sourceFile: SourceFile, host: TypeCheckerHost, moduleReference: string, mode: ResolutionMode, packageName: string) {
    const node10Result = host.getResolvedModule(sourceFile, moduleReference, mode)?.node10Result;
    const result = node10Result
        ? chainDiagnosticMessages(
            /*details*/ undefined,
            Diagnostics.There_are_types_at_0_but_this_result_could_not_be_resolved_when_respecting_package_json_exports_The_1_library_may_need_to_update_its_package_json_or_typings,
            node10Result,
            node10Result.includes(nodeModulesPathPart + "@types/") ? `@types/${mangleScopedPackageName(packageName)}` : packageName,
        )
        : host.typesPackageExists(packageName)
        ? chainDiagnosticMessages(
            /*details*/ undefined,
            Diagnostics.If_the_0_package_actually_exposes_this_module_consider_sending_a_pull_request_to_amend_https_Colon_Slash_Slashgithub_com_SlashDefinitelyTyped_SlashDefinitelyTyped_Slashtree_Slashmaster_Slashtypes_Slash_1,
            packageName,
            mangleScopedPackageName(packageName),
        )
        : host.packageBundlesTypes(packageName)
        ? chainDiagnosticMessages(
            /*details*/ undefined,
            Diagnostics.If_the_0_package_actually_exposes_this_module_try_adding_a_new_declaration_d_ts_file_containing_declare_module_1,
            packageName,
            moduleReference,
        )
        : chainDiagnosticMessages(
            /*details*/ undefined,
            Diagnostics.Try_npm_i_save_dev_types_Slash_1_if_it_exists_or_add_a_new_declaration_d_ts_file_containing_declare_module_0,
            moduleReference,
            mangleScopedPackageName(packageName),
        );
    if (result) result.repopulateInfo = () => ({ moduleReference, mode, packageName: packageName === moduleReference ? undefined : packageName });
    return result;
}

function packageIdIsEqual(a: PackageId | undefined, b: PackageId | undefined): boolean {
    return a === b || !!a && !!b && a.name === b.name && a.subModuleName === b.subModuleName && a.version === b.version;
}

/** @internal */
export function packageIdToPackageName({ name, subModuleName }: PackageId): string {
    return subModuleName ? `${name}/${subModuleName}` : name;
}

/** @internal */
export function packageIdToString(packageId: PackageId): string {
    return `${packageIdToPackageName(packageId)}@${packageId.version}`;
}

/** @internal */
export function typeDirectiveIsEqualTo(oldResolution: ResolvedTypeReferenceDirectiveWithFailedLookupLocations, newResolution: ResolvedTypeReferenceDirectiveWithFailedLookupLocations): boolean {
    return oldResolution === newResolution ||
        oldResolution.resolvedTypeReferenceDirective === newResolution.resolvedTypeReferenceDirective ||
        !!oldResolution.resolvedTypeReferenceDirective &&
            !!newResolution.resolvedTypeReferenceDirective &&
            oldResolution.resolvedTypeReferenceDirective.resolvedFileName === newResolution.resolvedTypeReferenceDirective.resolvedFileName &&
            !!oldResolution.resolvedTypeReferenceDirective.primary === !!newResolution.resolvedTypeReferenceDirective.primary &&
            oldResolution.resolvedTypeReferenceDirective.originalPath === newResolution.resolvedTypeReferenceDirective.originalPath;
}

/** @internal */
export function hasChangesInResolutions<K, V>(
    names: readonly K[],
    newSourceFile: SourceFile,
    newResolutions: readonly V[],
    getOldResolution: (name: string, mode: ResolutionMode) => V | undefined,
    comparer: (oldResolution: V, newResolution: V) => boolean,
    nameAndModeGetter: ResolutionNameAndModeGetter<K, SourceFile>,
): boolean {
    Debug.assert(names.length === newResolutions.length);

    for (let i = 0; i < names.length; i++) {
        const newResolution = newResolutions[i];
        const entry = names[i];
        const name = nameAndModeGetter.getName(entry);
        const mode = nameAndModeGetter.getMode(entry, newSourceFile);
        const oldResolution = getOldResolution(name, mode);
        const changed = oldResolution
            ? !newResolution || !comparer(oldResolution, newResolution)
            : newResolution;
        if (changed) {
            return true;
        }
    }
    return false;
}

// Returns true if this node contains a parse error anywhere underneath it.
/** @internal */
export function containsParseError(node: Node): boolean {
    aggregateChildData(node);
    return (node.flags & NodeFlags.ThisNodeOrAnySubNodesHasError) !== 0;
}

function aggregateChildData(node: Node): void {
    if (!(node.flags & NodeFlags.HasAggregatedChildData)) {
        // A node is considered to contain a parse error if:
        //  a) the parser explicitly marked that it had an error
        //  b) any of it's children reported that it had an error.
        const thisNodeOrAnySubNodesHasError = ((node.flags & NodeFlags.ThisNodeHasError) !== 0) ||
            forEachChild(node, containsParseError);

        // If so, mark ourselves accordingly.
        if (thisNodeOrAnySubNodesHasError) {
            (node as Mutable<Node>).flags |= NodeFlags.ThisNodeOrAnySubNodesHasError;
        }

        // Also mark that we've propagated the child information to this node.  This way we can
        // always consult the bit directly on this node without needing to check its children
        // again.
        (node as Mutable<Node>).flags |= NodeFlags.HasAggregatedChildData;
    }
}

/** @internal */
export function getSourceFileOfNode(node: Node): SourceFile;
/** @internal */
export function getSourceFileOfNode(node: Node | undefined): SourceFile | undefined;
/** @internal */
export function getSourceFileOfNode(node: Node | undefined): SourceFile | undefined {
    while (node && node.kind !== SyntaxKind.SourceFile) {
        node = node.parent;
    }
    return node as SourceFile;
}

/** @internal */
export function getSourceFileOfModule(module: Symbol) {
    return getSourceFileOfNode(module.valueDeclaration || getNonAugmentationDeclaration(module));
}

/** @internal */
export function isPlainJsFile(file: SourceFile | undefined, checkJs: boolean | undefined): boolean {
    return !!file && (file.scriptKind === ScriptKind.JS || file.scriptKind === ScriptKind.JSX) && !file.checkJsDirective && checkJs === undefined;
}

/** @internal */
export function isStatementWithLocals(node: Node) {
    switch (node.kind) {
        case SyntaxKind.Block:
        case SyntaxKind.CaseBlock:
        case SyntaxKind.ForStatement:
        case SyntaxKind.ForInStatement:
        case SyntaxKind.ForOfStatement:
            return true;
    }
    return false;
}

/** @internal */
export function getStartPositionOfLine(line: number, sourceFile: SourceFileLike): number {
    Debug.assert(line >= 0);
    return getLineStarts(sourceFile)[line];
}

// This is a useful function for debugging purposes.
/** @internal */
export function nodePosToString(node: Node): string {
    const file = getSourceFileOfNode(node);
    const loc = getLineAndCharacterOfPosition(file, node.pos);
    return `${file.fileName}(${loc.line + 1},${loc.character + 1})`;
}

/** @internal */
export function getEndLinePosition(line: number, sourceFile: SourceFileLike): number {
    Debug.assert(line >= 0);
    const lineStarts = getLineStarts(sourceFile);

    const lineIndex = line;
    const sourceText = sourceFile.text;
    if (lineIndex + 1 === lineStarts.length) {
        // last line - return EOF
        return sourceText.length - 1;
    }
    else {
        // current line start
        const start = lineStarts[lineIndex];
        // take the start position of the next line - 1 = it should be some line break
        let pos = lineStarts[lineIndex + 1] - 1;
        Debug.assert(isLineBreak(sourceText.charCodeAt(pos)));
        // walk backwards skipping line breaks, stop the the beginning of current line.
        // i.e:
        // <some text>
        // $ <- end of line for this position should match the start position
        while (start <= pos && isLineBreak(sourceText.charCodeAt(pos))) {
            pos--;
        }
        return pos;
    }
}

/**
 * Returns a value indicating whether a name is unique globally or within the current file.
 * Note: This does not consider whether a name appears as a free identifier or not, so at the expression `x.y` this includes both `x` and `y`.
 *
 * @internal
 */
export function isFileLevelUniqueName(sourceFile: SourceFile, name: string, hasGlobalName?: PrintHandlers["hasGlobalName"]): boolean {
    return !(hasGlobalName && hasGlobalName(name)) && !sourceFile.identifiers.has(name);
}

// Returns true if this node is missing from the actual source code. A 'missing' node is different
// from 'undefined/defined'. When a node is undefined (which can happen for optional nodes
// in the tree), it is definitely missing. However, a node may be defined, but still be
// missing.  This happens whenever the parser knows it needs to parse something, but can't
// get anything in the source code that it expects at that location. For example:
//
//          let a: ;
//
// Here, the Type in the Type-Annotation is not-optional (as there is a colon in the source
// code). So the parser will attempt to parse out a type, and will create an actual node.
// However, this node will be 'missing' in the sense that no actual source-code/tokens are
// contained within it.
/** @internal */
export function nodeIsMissing(node: Node | undefined): boolean {
    if (node === undefined) {
        return true;
    }

    return node.pos === node.end && node.pos >= 0 && node.kind !== SyntaxKind.EndOfFileToken;
}

/** @internal */
export function nodeIsPresent(node: Node | undefined): boolean {
    return !nodeIsMissing(node);
}

/**
 * Tests whether `child` is a grammar error on `parent`.
 * @internal
 */
export function isGrammarError(parent: Node, child: Node | NodeArray<Node>) {
    if (isTypeParameterDeclaration(parent)) return child === parent.expression;
    if (isClassStaticBlockDeclaration(parent)) return child === parent.modifiers;
    if (isPropertySignature(parent)) return child === parent.initializer;
    if (isPropertyDeclaration(parent)) return child === parent.questionToken && isAutoAccessorPropertyDeclaration(parent);
    if (isPropertyAssignment(parent)) return child === parent.modifiers || child === parent.questionToken || child === parent.exclamationToken || isGrammarErrorElement(parent.modifiers, child, isModifierLike);
    if (isShorthandPropertyAssignment(parent)) return child === parent.equalsToken || child === parent.modifiers || child === parent.questionToken || child === parent.exclamationToken || isGrammarErrorElement(parent.modifiers, child, isModifierLike);
    if (isMethodDeclaration(parent)) return child === parent.exclamationToken;
    if (isConstructorDeclaration(parent)) return child === parent.typeParameters || child === parent.type || isGrammarErrorElement(parent.typeParameters, child, isTypeParameterDeclaration);
    if (isGetAccessorDeclaration(parent)) return child === parent.typeParameters || isGrammarErrorElement(parent.typeParameters, child, isTypeParameterDeclaration);
    if (isSetAccessorDeclaration(parent)) return child === parent.typeParameters || child === parent.type || isGrammarErrorElement(parent.typeParameters, child, isTypeParameterDeclaration);
    if (isNamespaceExportDeclaration(parent)) return child === parent.modifiers || isGrammarErrorElement(parent.modifiers, child, isModifierLike);
    return false;
}

function isGrammarErrorElement<T extends Node>(nodeArray: NodeArray<T> | undefined, child: Node | NodeArray<Node>, isElement: (node: Node) => node is T) {
    if (!nodeArray || isArray(child) || !isElement(child)) return false;
    return contains(nodeArray, child);
}

function insertStatementsAfterPrologue<T extends Statement>(to: T[], from: readonly T[] | undefined, isPrologueDirective: (node: Node) => boolean): T[] {
    if (from === undefined || from.length === 0) return to;
    let statementIndex = 0;
    // skip all prologue directives to insert at the correct position
    for (; statementIndex < to.length; ++statementIndex) {
        if (!isPrologueDirective(to[statementIndex])) {
            break;
        }
    }
    to.splice(statementIndex, 0, ...from);
    return to;
}

function insertStatementAfterPrologue<T extends Statement>(to: T[], statement: T | undefined, isPrologueDirective: (node: Node) => boolean): T[] {
    if (statement === undefined) return to;
    let statementIndex = 0;
    // skip all prologue directives to insert at the correct position
    for (; statementIndex < to.length; ++statementIndex) {
        if (!isPrologueDirective(to[statementIndex])) {
            break;
        }
    }
    to.splice(statementIndex, 0, statement);
    return to;
}

function isAnyPrologueDirective(node: Node) {
    return isPrologueDirective(node) || !!(getEmitFlags(node) & EmitFlags.CustomPrologue);
}

/**
 * Prepends statements to an array while taking care of prologue directives.
 *
 * @internal
 */
export function insertStatementsAfterStandardPrologue<T extends Statement>(to: T[], from: readonly T[] | undefined): T[] {
    return insertStatementsAfterPrologue(to, from, isPrologueDirective);
}

/** @internal */
export function insertStatementsAfterCustomPrologue<T extends Statement>(to: T[], from: readonly T[] | undefined): T[] {
    return insertStatementsAfterPrologue(to, from, isAnyPrologueDirective);
}

/**
 * Prepends statements to an array while taking care of prologue directives.
 *
 * @internal
 */
export function insertStatementAfterStandardPrologue<T extends Statement>(to: T[], statement: T | undefined): T[] {
    return insertStatementAfterPrologue(to, statement, isPrologueDirective);
}

/** @internal */
export function insertStatementAfterCustomPrologue<T extends Statement>(to: T[], statement: T | undefined): T[] {
    return insertStatementAfterPrologue(to, statement, isAnyPrologueDirective);
}

/**
 * Determine if the given comment is a triple-slash
 *
 * @return true if the comment is a triple-slash comment else false
 *
 * @internal
 */
export function isRecognizedTripleSlashComment(text: string, commentPos: number, commentEnd: number) {
    // Verify this is /// comment, but do the regexp match only when we first can find /// in the comment text
    // so that we don't end up computing comment string and doing match for all // comments
    if (
        text.charCodeAt(commentPos + 1) === CharacterCodes.slash &&
        commentPos + 2 < commentEnd &&
        text.charCodeAt(commentPos + 2) === CharacterCodes.slash
    ) {
        const textSubStr = text.substring(commentPos, commentEnd);
        return fullTripleSlashReferencePathRegEx.test(textSubStr) ||
                fullTripleSlashAMDReferencePathRegEx.test(textSubStr) ||
                fullTripleSlashAMDModuleRegEx.test(textSubStr) ||
                fullTripleSlashReferenceTypeReferenceDirectiveRegEx.test(textSubStr) ||
                fullTripleSlashLibReferenceRegEx.test(textSubStr) ||
                defaultLibReferenceRegEx.test(textSubStr) ?
            true : false;
    }
    return false;
}

/** @internal */
export function isPinnedComment(text: string, start: number) {
    return text.charCodeAt(start + 1) === CharacterCodes.asterisk &&
        text.charCodeAt(start + 2) === CharacterCodes.exclamation;
}

/** @internal */
export function createCommentDirectivesMap(sourceFile: SourceFile, commentDirectives: CommentDirective[]): CommentDirectivesMap {
    const directivesByLine = new Map(
        commentDirectives.map(commentDirective => [
            `${getLineAndCharacterOfPosition(sourceFile, commentDirective.range.end).line}`,
            commentDirective,
        ]),
    );

    const usedLines = new Map<string, boolean>();

    return { getUnusedExpectations, markUsed };

    function getUnusedExpectations() {
        return arrayFrom(directivesByLine.entries())
            .filter(([line, directive]) => directive.type === CommentDirectiveType.ExpectError && !usedLines.get(line))
            .map(([_, directive]) => directive);
    }

    function markUsed(line: number) {
        if (!directivesByLine.has(`${line}`)) {
            return false;
        }

        usedLines.set(`${line}`, true);
        return true;
    }
}

/** @internal */
export function getTokenPosOfNode(node: Node, sourceFile?: SourceFileLike, includeJsDoc?: boolean): number {
    // With nodes that have no width (i.e. 'Missing' nodes), we actually *don't*
    // want to skip trivia because this will launch us forward to the next token.
    if (nodeIsMissing(node)) {
        return node.pos;
    }

    if (isJSDocNode(node) || node.kind === SyntaxKind.JsxText) {
        // JsxText cannot actually contain comments, even though the scanner will think it sees comments
        return skipTrivia((sourceFile || getSourceFileOfNode(node)).text, node.pos, /*stopAfterLineBreak*/ false, /*stopAtComments*/ true);
    }

    if (includeJsDoc && hasJSDocNodes(node)) {
        return getTokenPosOfNode(node.jsDoc![0], sourceFile);
    }

    // For a syntax list, it is possible that one of its children has JSDocComment nodes, while
    // the syntax list itself considers them as normal trivia. Therefore if we simply skip
    // trivia for the list, we may have skipped the JSDocComment as well. So we should process its
    // first child to determine the actual position of its first token.
    if (node.kind === SyntaxKind.SyntaxList && (node as SyntaxList)._children.length > 0) {
        return getTokenPosOfNode((node as SyntaxList)._children[0], sourceFile, includeJsDoc);
    }

    return skipTrivia(
        (sourceFile || getSourceFileOfNode(node)).text,
        node.pos,
        /*stopAfterLineBreak*/ false,
        /*stopAtComments*/ false,
        isInJSDoc(node),
    );
}

/** @internal */
export function getNonDecoratorTokenPosOfNode(node: Node, sourceFile?: SourceFileLike): number {
    const lastDecorator = !nodeIsMissing(node) && canHaveModifiers(node) ? findLast(node.modifiers, isDecorator) : undefined;
    if (!lastDecorator) {
        return getTokenPosOfNode(node, sourceFile);
    }

    return skipTrivia((sourceFile || getSourceFileOfNode(node)).text, lastDecorator.end);
}

/** @internal */
export function getSourceTextOfNodeFromSourceFile(sourceFile: SourceFile, node: Node, includeTrivia = false): string {
    return getTextOfNodeFromSourceText(sourceFile.text, node, includeTrivia);
}

function isJSDocTypeExpressionOrChild(node: Node): boolean {
    return !!findAncestor(node, isJSDocTypeExpression);
}

/** @internal */
export function isExportNamespaceAsDefaultDeclaration(node: Node): boolean {
    return !!(isExportDeclaration(node) && node.exportClause && isNamespaceExport(node.exportClause) && node.exportClause.name.escapedText === "default");
}

/** @internal */
export function getTextOfNodeFromSourceText(sourceText: string, node: Node, includeTrivia = false): string {
    if (nodeIsMissing(node)) {
        return "";
    }

    let text = sourceText.substring(includeTrivia ? node.pos : skipTrivia(sourceText, node.pos), node.end);

    if (isJSDocTypeExpressionOrChild(node)) {
        // strip space + asterisk at line start
        text = text.split(/\r\n|\n|\r/).map(line => line.replace(/^\s*\*/, "").trimStart()).join("\n");
    }

    return text;
}

/** @internal */
export function getTextOfNode(node: Node, includeTrivia = false): string {
    return getSourceTextOfNodeFromSourceFile(getSourceFileOfNode(node), node, includeTrivia);
}

function getPos(range: Node) {
    return range.pos;
}

/**
 * Note: it is expected that the `nodeArray` and the `node` are within the same file.
 * For example, searching for a `SourceFile` in a `SourceFile[]` wouldn't work.
 *
 * @internal
 */
export function indexOfNode(nodeArray: readonly Node[], node: Node) {
    return binarySearch(nodeArray, node, getPos, compareValues);
}

/**
 * Gets flags that control emit behavior of a node.
 *
 * @internal
 */
export function getEmitFlags(node: Node): EmitFlags {
    const emitNode = node.emitNode;
    return emitNode && emitNode.flags || 0;
}

/**
 * Gets flags that control emit behavior of a node.
 *
 * @internal
 */
export function getInternalEmitFlags(node: Node): InternalEmitFlags {
    const emitNode = node.emitNode;
    return emitNode && emitNode.internalFlags || 0;
}

// Map from a type name, to a map of targets to array of features introduced to the type at that target.
/** @internal */
export type ScriptTargetFeatures = ReadonlyMap<string, ReadonlyMap<string, string[]>>;

/** @internal */
export const getScriptTargetFeatures = /* @__PURE__ */ memoize((): ScriptTargetFeatures =>
    new Map(Object.entries({
        Array: new Map(Object.entries({
            es2015: [
                "find",
                "findIndex",
                "fill",
                "copyWithin",
                "entries",
                "keys",
                "values",
            ],
            es2016: [
                "includes",
            ],
            es2019: [
                "flat",
                "flatMap",
            ],
            es2022: [
                "at",
            ],
            es2023: [
                "findLastIndex",
                "findLast",
            ],
        })),
        Iterator: new Map(Object.entries({
            es2015: emptyArray,
        })),
        AsyncIterator: new Map(Object.entries({
            es2015: emptyArray,
        })),
        Atomics: new Map(Object.entries({
            es2017: emptyArray,
        })),
        SharedArrayBuffer: new Map(Object.entries({
            es2017: emptyArray,
        })),
        AsyncIterable: new Map(Object.entries({
            es2018: emptyArray,
        })),
        AsyncIterableIterator: new Map(Object.entries({
            es2018: emptyArray,
        })),
        AsyncGenerator: new Map(Object.entries({
            es2018: emptyArray,
        })),
        AsyncGeneratorFunction: new Map(Object.entries({
            es2018: emptyArray,
        })),
        RegExp: new Map(Object.entries({
            es2015: [
                "flags",
                "sticky",
                "unicode",
            ],
            es2018: [
                "dotAll",
            ],
        })),
        Reflect: new Map(Object.entries({
            es2015: [
                "apply",
                "construct",
                "defineProperty",
                "deleteProperty",
                "get",
                "getOwnPropertyDescriptor",
                "getPrototypeOf",
                "has",
                "isExtensible",
                "ownKeys",
                "preventExtensions",
                "set",
                "setPrototypeOf",
            ],
        })),
        ArrayConstructor: new Map(Object.entries({
            es2015: [
                "from",
                "of",
            ],
        })),
        ObjectConstructor: new Map(Object.entries({
            es2015: [
                "assign",
                "getOwnPropertySymbols",
                "keys",
                "is",
                "setPrototypeOf",
            ],
            es2017: [
                "values",
                "entries",
                "getOwnPropertyDescriptors",
            ],
            es2019: [
                "fromEntries",
            ],
            es2022: [
                "hasOwn",
            ],
        })),
        NumberConstructor: new Map(Object.entries({
            es2015: [
                "isFinite",
                "isInteger",
                "isNaN",
                "isSafeInteger",
                "parseFloat",
                "parseInt",
            ],
        })),
        Math: new Map(Object.entries({
            es2015: [
                "clz32",
                "imul",
                "sign",
                "log10",
                "log2",
                "log1p",
                "expm1",
                "cosh",
                "sinh",
                "tanh",
                "acosh",
                "asinh",
                "atanh",
                "hypot",
                "trunc",
                "fround",
                "cbrt",
            ],
        })),
        Map: new Map(Object.entries({
            es2015: [
                "entries",
                "keys",
                "values",
            ],
        })),
        Set: new Map(Object.entries({
            es2015: [
                "entries",
                "keys",
                "values",
            ],
        })),
        PromiseConstructor: new Map(Object.entries({
            es2015: [
                "all",
                "race",
                "reject",
                "resolve",
            ],
            es2020: [
                "allSettled",
            ],
            es2021: [
                "any",
            ],
        })),
        Symbol: new Map(Object.entries({
            es2015: [
                "for",
                "keyFor",
            ],
            es2019: [
                "description",
            ],
        })),
        WeakMap: new Map(Object.entries({
            es2015: [
                "entries",
                "keys",
                "values",
            ],
        })),
        WeakSet: new Map(Object.entries({
            es2015: [
                "entries",
                "keys",
                "values",
            ],
        })),
        String: new Map(Object.entries({
            es2015: [
                "codePointAt",
                "includes",
                "endsWith",
                "normalize",
                "repeat",
                "startsWith",
                "anchor",
                "big",
                "blink",
                "bold",
                "fixed",
                "fontcolor",
                "fontsize",
                "italics",
                "link",
                "small",
                "strike",
                "sub",
                "sup",
            ],
            es2017: [
                "padStart",
                "padEnd",
            ],
            es2019: [
                "trimStart",
                "trimEnd",
                "trimLeft",
                "trimRight",
            ],
            es2020: [
                "matchAll",
            ],
            es2021: [
                "replaceAll",
            ],
            es2022: [
                "at",
            ],
        })),
        StringConstructor: new Map(Object.entries({
            es2015: [
                "fromCodePoint",
                "raw",
            ],
        })),
        DateTimeFormat: new Map(Object.entries({
            es2017: [
                "formatToParts",
            ],
        })),
        Promise: new Map(Object.entries({
            es2015: emptyArray,
            es2018: [
                "finally",
            ],
        })),
        RegExpMatchArray: new Map(Object.entries({
            es2018: [
                "groups",
            ],
        })),
        RegExpExecArray: new Map(Object.entries({
            es2018: [
                "groups",
            ],
        })),
        Intl: new Map(Object.entries({
            es2018: [
                "PluralRules",
            ],
        })),
        NumberFormat: new Map(Object.entries({
            es2018: [
                "formatToParts",
            ],
        })),
        SymbolConstructor: new Map(Object.entries({
            es2020: [
                "matchAll",
            ],
        })),
        DataView: new Map(Object.entries({
            es2020: [
                "setBigInt64",
                "setBigUint64",
                "getBigInt64",
                "getBigUint64",
            ],
        })),
        BigInt: new Map(Object.entries({
            es2020: emptyArray,
        })),
        RelativeTimeFormat: new Map(Object.entries({
            es2020: [
                "format",
                "formatToParts",
                "resolvedOptions",
            ],
        })),
        Int8Array: new Map(Object.entries({
            es2022: [
                "at",
            ],
            es2023: [
                "findLastIndex",
                "findLast",
            ],
        })),
        Uint8Array: new Map(Object.entries({
            es2022: [
                "at",
            ],
            es2023: [
                "findLastIndex",
                "findLast",
            ],
        })),
        Uint8ClampedArray: new Map(Object.entries({
            es2022: [
                "at",
            ],
            es2023: [
                "findLastIndex",
                "findLast",
            ],
        })),
        Int16Array: new Map(Object.entries({
            es2022: [
                "at",
            ],
            es2023: [
                "findLastIndex",
                "findLast",
            ],
        })),
        Uint16Array: new Map(Object.entries({
            es2022: [
                "at",
            ],
            es2023: [
                "findLastIndex",
                "findLast",
            ],
        })),
        Int32Array: new Map(Object.entries({
            es2022: [
                "at",
            ],
            es2023: [
                "findLastIndex",
                "findLast",
            ],
        })),
        Uint32Array: new Map(Object.entries({
            es2022: [
                "at",
            ],
            es2023: [
                "findLastIndex",
                "findLast",
            ],
        })),
        Float32Array: new Map(Object.entries({
            es2022: [
                "at",
            ],
            es2023: [
                "findLastIndex",
                "findLast",
            ],
        })),
        Float64Array: new Map(Object.entries({
            es2022: [
                "at",
            ],
            es2023: [
                "findLastIndex",
                "findLast",
            ],
        })),
        BigInt64Array: new Map(Object.entries({
            es2020: emptyArray,
            es2022: [
                "at",
            ],
            es2023: [
                "findLastIndex",
                "findLast",
            ],
        })),
        BigUint64Array: new Map(Object.entries({
            es2020: emptyArray,
            es2022: [
                "at",
            ],
            es2023: [
                "findLastIndex",
                "findLast",
            ],
        })),
        Error: new Map(Object.entries({
            es2022: [
                "cause",
            ],
        })),
    }))
);

/** @internal */
export const enum GetLiteralTextFlags {
    None = 0,
    NeverAsciiEscape = 1 << 0,
    JsxAttributeEscape = 1 << 1,
    TerminateUnterminatedLiterals = 1 << 2,
    AllowNumericSeparator = 1 << 3,
}

/** @internal */
export function getLiteralText(node: LiteralLikeNode, sourceFile: SourceFile | undefined, flags: GetLiteralTextFlags) {
    // If we don't need to downlevel and we can reach the original source text using
    // the node's parent reference, then simply get the text as it was originally written.
    if (sourceFile && canUseOriginalText(node, flags)) {
        return getSourceTextOfNodeFromSourceFile(sourceFile, node);
    }

    // If we can't reach the original source text, use the canonical form if it's a number,
    // or a (possibly escaped) quoted form of the original text if it's string-like.
    switch (node.kind) {
        case SyntaxKind.StringLiteral: {
            const escapeText = flags & GetLiteralTextFlags.JsxAttributeEscape ? escapeJsxAttributeString :
                flags & GetLiteralTextFlags.NeverAsciiEscape || (getEmitFlags(node) & EmitFlags.NoAsciiEscaping) ? escapeString :
                escapeNonAsciiString;
            if ((node as StringLiteral).singleQuote) {
                return "'" + escapeText(node.text, CharacterCodes.singleQuote) + "'";
            }
            else {
                return '"' + escapeText(node.text, CharacterCodes.doubleQuote) + '"';
            }
        }
        case SyntaxKind.NoSubstitutionTemplateLiteral:
        case SyntaxKind.TemplateHead:
        case SyntaxKind.TemplateMiddle:
        case SyntaxKind.TemplateTail: {
            // If a NoSubstitutionTemplateLiteral appears to have a substitution in it, the original text
            // had to include a backslash: `not \${a} substitution`.
            const escapeText = flags & GetLiteralTextFlags.NeverAsciiEscape || (getEmitFlags(node) & EmitFlags.NoAsciiEscaping) ? escapeString :
                escapeNonAsciiString;

            const rawText = (node as TemplateLiteralLikeNode).rawText ?? escapeTemplateSubstitution(escapeText(node.text, CharacterCodes.backtick));
            switch (node.kind) {
                case SyntaxKind.NoSubstitutionTemplateLiteral:
                    return "`" + rawText + "`";
                case SyntaxKind.TemplateHead:
                    return "`" + rawText + "${";
                case SyntaxKind.TemplateMiddle:
                    return "}" + rawText + "${";
                case SyntaxKind.TemplateTail:
                    return "}" + rawText + "`";
            }
            break;
        }
        case SyntaxKind.NumericLiteral:
        case SyntaxKind.BigIntLiteral:
            return node.text;
        case SyntaxKind.RegularExpressionLiteral:
            if (flags & GetLiteralTextFlags.TerminateUnterminatedLiterals && node.isUnterminated) {
                return node.text + (node.text.charCodeAt(node.text.length - 1) === CharacterCodes.backslash ? " /" : "/");
            }
            return node.text;
    }

    return Debug.fail(`Literal kind '${node.kind}' not accounted for.`);
}

function canUseOriginalText(node: LiteralLikeNode, flags: GetLiteralTextFlags): boolean {
    if (nodeIsSynthesized(node) || !node.parent || (flags & GetLiteralTextFlags.TerminateUnterminatedLiterals && node.isUnterminated)) {
        return false;
    }

    if (isNumericLiteral(node)) {
        if (node.numericLiteralFlags & TokenFlags.IsInvalid) {
            return false;
        }
        if (node.numericLiteralFlags & TokenFlags.ContainsSeparator) {
            return !!(flags & GetLiteralTextFlags.AllowNumericSeparator);
        }
    }

    return !isBigIntLiteral(node);
}

/** @internal */
export function getTextOfConstantValue(value: string | number) {
    return isString(value) ? '"' + escapeNonAsciiString(value) + '"' : "" + value;
}

// Make an identifier from an external module name by extracting the string after the last "/" and replacing
// all non-alphanumeric characters with underscores
/** @internal */
export function makeIdentifierFromModuleName(moduleName: string): string {
    return getBaseFileName(moduleName).replace(/^(\d)/, "_$1").replace(/\W/g, "_");
}

/** @internal */
export function isBlockOrCatchScoped(declaration: Declaration) {
    return (getCombinedNodeFlags(declaration) & NodeFlags.BlockScoped) !== 0 ||
        isCatchClauseVariableDeclarationOrBindingElement(declaration);
}

/** @internal */
export function isCatchClauseVariableDeclarationOrBindingElement(declaration: Declaration) {
    const node = getRootDeclaration(declaration);
    return node.kind === SyntaxKind.VariableDeclaration && node.parent.kind === SyntaxKind.CatchClause;
}

/** @internal */
export function isAmbientModule(node: Node): node is AmbientModuleDeclaration {
    return isModuleDeclaration(node) && (node.name.kind === SyntaxKind.StringLiteral || isGlobalScopeAugmentation(node));
}

/** @internal */
export function isModuleWithStringLiteralName(node: Node): node is ModuleDeclaration {
    return isModuleDeclaration(node) && node.name.kind === SyntaxKind.StringLiteral;
}

/** @internal */
export function isNonGlobalAmbientModule(node: Node): node is ModuleDeclaration & { name: StringLiteral; } {
    return isModuleDeclaration(node) && isStringLiteral(node.name);
}

/**
 * An effective module (namespace) declaration is either
 * 1. An actual declaration: namespace X { ... }
 * 2. A Javascript declaration, which is:
 *    An identifier in a nested property access expression: Y in `X.Y.Z = { ... }`
 *
 * @internal
 */
export function isEffectiveModuleDeclaration(node: Node) {
    return isModuleDeclaration(node) || isIdentifier(node);
}

/**
 * Given a symbol for a module, checks that it is a shorthand ambient module.
 *
 * @internal
 */
export function isShorthandAmbientModuleSymbol(moduleSymbol: Symbol): boolean {
    return isShorthandAmbientModule(moduleSymbol.valueDeclaration);
}

function isShorthandAmbientModule(node: Node | undefined): boolean {
    // The only kind of module that can be missing a body is a shorthand ambient module.
    return !!node && node.kind === SyntaxKind.ModuleDeclaration && (!(node as ModuleDeclaration).body);
}

/** @internal */
export function isBlockScopedContainerTopLevel(node: Node): boolean {
    return node.kind === SyntaxKind.SourceFile ||
        node.kind === SyntaxKind.ModuleDeclaration ||
        isFunctionLikeOrClassStaticBlockDeclaration(node);
}

/** @internal */
export function isGlobalScopeAugmentation(module: ModuleDeclaration): boolean {
    return !!(module.flags & NodeFlags.GlobalAugmentation);
}

/** @internal */
export function isExternalModuleAugmentation(node: Node): node is AmbientModuleDeclaration {
    return isAmbientModule(node) && isModuleAugmentationExternal(node);
}

/** @internal */
export function isModuleAugmentationExternal(node: AmbientModuleDeclaration) {
    // external module augmentation is a ambient module declaration that is either:
    // - defined in the top level scope and source file is an external module
    // - defined inside ambient module declaration located in the top level scope and source file not an external module
    switch (node.parent.kind) {
        case SyntaxKind.SourceFile:
            return isExternalModule(node.parent);
        case SyntaxKind.ModuleBlock:
            return isAmbientModule(node.parent.parent) && isSourceFile(node.parent.parent.parent) && !isExternalModule(node.parent.parent.parent);
    }
    return false;
}

/** @internal */
export function getNonAugmentationDeclaration(symbol: Symbol) {
    return symbol.declarations?.find(d => !isExternalModuleAugmentation(d) && !(isModuleDeclaration(d) && isGlobalScopeAugmentation(d)));
}

function isCommonJSContainingModuleKind(kind: ModuleKind) {
    return kind === ModuleKind.CommonJS || kind === ModuleKind.Node16 || kind === ModuleKind.NodeNext;
}

/** @internal */
export function isEffectiveExternalModule(node: SourceFile, compilerOptions: CompilerOptions) {
    return isExternalModule(node) || (isCommonJSContainingModuleKind(getEmitModuleKind(compilerOptions)) && !!node.commonJsModuleIndicator);
}

/**
 * Returns whether the source file will be treated as if it were in strict mode at runtime.
 *
 * @internal
 */
export function isEffectiveStrictModeSourceFile(node: SourceFile, compilerOptions: CompilerOptions) {
    // We can only verify strict mode for JS/TS files
    switch (node.scriptKind) {
        case ScriptKind.JS:
        case ScriptKind.TS:
        case ScriptKind.JSX:
        case ScriptKind.TSX:
            break;
        default:
            return false;
    }
    // Strict mode does not matter for declaration files.
    if (node.isDeclarationFile) {
        return false;
    }
    // If `alwaysStrict` is set, then treat the file as strict.
    if (getStrictOptionValue(compilerOptions, "alwaysStrict")) {
        return true;
    }
    // Starting with a "use strict" directive indicates the file is strict.
    if (startsWithUseStrict(node.statements)) {
        return true;
    }
    if (isExternalModule(node) || getIsolatedModules(compilerOptions)) {
        // ECMAScript Modules are always strict.
        if (getEmitModuleKind(compilerOptions) >= ModuleKind.ES2015) {
            return true;
        }
        // Other modules are strict unless otherwise specified.
        return !compilerOptions.noImplicitUseStrict;
    }
    return false;
}

/** @internal */
export function isAmbientPropertyDeclaration(node: PropertyDeclaration) {
    return !!(node.flags & NodeFlags.Ambient) || hasSyntacticModifier(node, ModifierFlags.Ambient);
}

/** @internal */
export function isBlockScope(node: Node, parentNode: Node | undefined): boolean {
    switch (node.kind) {
        case SyntaxKind.SourceFile:
        case SyntaxKind.CaseBlock:
        case SyntaxKind.CatchClause:
        case SyntaxKind.ModuleDeclaration:
        case SyntaxKind.ForStatement:
        case SyntaxKind.ForInStatement:
        case SyntaxKind.ForOfStatement:
        case SyntaxKind.Constructor:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.ClassStaticBlockDeclaration:
            return true;

        case SyntaxKind.Block:
            // function block is not considered block-scope container
            // see comment in binder.ts: bind(...), case for SyntaxKind.Block
            return !isFunctionLikeOrClassStaticBlockDeclaration(parentNode);
    }

    return false;
}

/** @internal */
export function isDeclarationWithTypeParameters(node: Node): node is DeclarationWithTypeParameters {
    Debug.type<DeclarationWithTypeParameters>(node);
    switch (node.kind) {
        case SyntaxKind.JSDocCallbackTag:
        case SyntaxKind.JSDocTypedefTag:
        case SyntaxKind.JSDocSignature:
            return true;
        default:
            assertType<DeclarationWithTypeParameterChildren>(node);
            return isDeclarationWithTypeParameterChildren(node);
    }
}

/** @internal */
export function isDeclarationWithTypeParameterChildren(node: Node): node is DeclarationWithTypeParameterChildren {
    Debug.type<DeclarationWithTypeParameterChildren>(node);
    switch (node.kind) {
        case SyntaxKind.CallSignature:
        case SyntaxKind.ConstructSignature:
        case SyntaxKind.MethodSignature:
        case SyntaxKind.IndexSignature:
        case SyntaxKind.FunctionType:
        case SyntaxKind.ConstructorType:
        case SyntaxKind.JSDocFunctionType:
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.ClassExpression:
        case SyntaxKind.InterfaceDeclaration:
        case SyntaxKind.TypeAliasDeclaration:
        case SyntaxKind.JSDocTemplateTag:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.Constructor:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ArrowFunction:
            return true;
        default:
            assertType<never>(node);
            return false;
    }
}

/** @internal */
export function isAnyImportSyntax(node: Node): node is AnyImportSyntax {
    switch (node.kind) {
        case SyntaxKind.ImportDeclaration:
        case SyntaxKind.ImportEqualsDeclaration:
            return true;
        default:
            return false;
    }
}

/** @internal */
export function isAnyImportOrBareOrAccessedRequire(node: Node): node is AnyImportOrBareOrAccessedRequire {
    return isAnyImportSyntax(node) || isVariableDeclarationInitializedToBareOrAccessedRequire(node);
}

/** @internal */
export function isLateVisibilityPaintedStatement(node: Node): node is LateVisibilityPaintedStatement {
    switch (node.kind) {
        case SyntaxKind.ImportDeclaration:
        case SyntaxKind.ImportEqualsDeclaration:
        case SyntaxKind.VariableStatement:
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.ModuleDeclaration:
        case SyntaxKind.TypeAliasDeclaration:
        case SyntaxKind.InterfaceDeclaration:
        case SyntaxKind.EnumDeclaration:
            return true;
        default:
            return false;
    }
}

/** @internal */
export function hasPossibleExternalModuleReference(node: Node): node is AnyImportOrReExport | ModuleDeclaration | ImportTypeNode | ImportCall {
    return isAnyImportOrReExport(node) || isModuleDeclaration(node) || isImportTypeNode(node) || isImportCall(node);
}

/** @internal */
export function isAnyImportOrReExport(node: Node): node is AnyImportOrReExport {
    return isAnyImportSyntax(node) || isExportDeclaration(node);
}

/** @internal */
export function getEnclosingContainer(node: Node): Node | undefined {
    return findAncestor(node.parent, n => !!(getContainerFlags(n) & ContainerFlags.IsContainer));
}

// Gets the nearest enclosing block scope container that has the provided node
// as a descendant, that is not the provided node.
/** @internal */
export function getEnclosingBlockScopeContainer(node: Node): Node {
    return findAncestor(node.parent, current => isBlockScope(current, current.parent))!;
}

/** @internal */
export function forEachEnclosingBlockScopeContainer(node: Node, cb: (container: Node) => void): void {
    let container = getEnclosingBlockScopeContainer(node);
    while (container) {
        cb(container);
        container = getEnclosingBlockScopeContainer(container);
    }
}

// Return display name of an identifier
// Computed property names will just be emitted as "[<expr>]", where <expr> is the source
// text of the expression in the computed property.
/** @internal */
export function declarationNameToString(name: DeclarationName | QualifiedName | undefined) {
    return !name || getFullWidth(name) === 0 ? "(Missing)" : getTextOfNode(name);
}

/** @internal */
export function getNameFromIndexInfo(info: IndexInfo): string | undefined {
    return info.declaration ? declarationNameToString(info.declaration.parameters[0].name) : undefined;
}

/** @internal */
export function isComputedNonLiteralName(name: PropertyName): boolean {
    return name.kind === SyntaxKind.ComputedPropertyName && !isStringOrNumericLiteralLike(name.expression);
}

/** @internal */
export function tryGetTextOfPropertyName(name: PropertyName | NoSubstitutionTemplateLiteral | JsxAttributeName): __String | undefined {
    switch (name.kind) {
        case SyntaxKind.Identifier:
        case SyntaxKind.PrivateIdentifier:
            return name.emitNode?.autoGenerate ? undefined : name.escapedText;
        case SyntaxKind.StringLiteral:
        case SyntaxKind.NumericLiteral:
        case SyntaxKind.NoSubstitutionTemplateLiteral:
            return escapeLeadingUnderscores(name.text);
        case SyntaxKind.ComputedPropertyName:
            if (isStringOrNumericLiteralLike(name.expression)) return escapeLeadingUnderscores(name.expression.text);
            return undefined;
        case SyntaxKind.JsxNamespacedName:
            return getEscapedTextOfJsxNamespacedName(name);
        default:
            return Debug.assertNever(name);
    }
}

/** @internal */
export function getTextOfPropertyName(name: PropertyName | NoSubstitutionTemplateLiteral | JsxAttributeName): __String {
    return Debug.checkDefined(tryGetTextOfPropertyName(name));
}

/** @internal */
export function entityNameToString(name: EntityNameOrEntityNameExpression | JSDocMemberName | JsxTagNameExpression | PrivateIdentifier): string {
    switch (name.kind) {
        case SyntaxKind.ThisKeyword:
            return "this";
        case SyntaxKind.PrivateIdentifier:
        case SyntaxKind.Identifier:
            return getFullWidth(name) === 0 ? idText(name) : getTextOfNode(name);
        case SyntaxKind.QualifiedName:
            return entityNameToString(name.left) + "." + entityNameToString(name.right);
        case SyntaxKind.PropertyAccessExpression:
            if (isIdentifier(name.name) || isPrivateIdentifier(name.name)) {
                return entityNameToString(name.expression) + "." + entityNameToString(name.name);
            }
            else {
                return Debug.assertNever(name.name);
            }
        case SyntaxKind.JSDocMemberName:
            return entityNameToString(name.left) + entityNameToString(name.right);
        case SyntaxKind.JsxNamespacedName:
            return entityNameToString(name.namespace) + ":" + entityNameToString(name.name);
        default:
            return Debug.assertNever(name);
    }
}

/** @internal */
export function createDiagnosticForNode(node: Node, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithLocation {
    const sourceFile = getSourceFileOfNode(node);
    return createDiagnosticForNodeInSourceFile(sourceFile, node, message, ...args);
}

/** @internal */
export function createDiagnosticForNodeArray(sourceFile: SourceFile, nodes: NodeArray<Node>, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithLocation {
    const start = skipTrivia(sourceFile.text, nodes.pos);
    return createFileDiagnostic(sourceFile, start, nodes.end - start, message, ...args);
}

/** @internal */
export function createDiagnosticForNodeInSourceFile(sourceFile: SourceFile, node: Node, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithLocation {
    const span = getErrorSpanForNode(sourceFile, node);
    return createFileDiagnostic(sourceFile, span.start, span.length, message, ...args);
}

/** @internal */
export function createDiagnosticForNodeFromMessageChain(sourceFile: SourceFile, node: Node, messageChain: DiagnosticMessageChain, relatedInformation?: DiagnosticRelatedInformation[]): DiagnosticWithLocation {
    const span = getErrorSpanForNode(sourceFile, node);
    return createFileDiagnosticFromMessageChain(sourceFile, span.start, span.length, messageChain, relatedInformation);
}

/** @internal */
export function createDiagnosticForNodeArrayFromMessageChain(sourceFile: SourceFile, nodes: NodeArray<Node>, messageChain: DiagnosticMessageChain, relatedInformation?: DiagnosticRelatedInformation[]): DiagnosticWithLocation {
    const start = skipTrivia(sourceFile.text, nodes.pos);
    return createFileDiagnosticFromMessageChain(sourceFile, start, nodes.end - start, messageChain, relatedInformation);
}

function assertDiagnosticLocation(sourceText: string, start: number, length: number) {
    Debug.assertGreaterThanOrEqual(start, 0);
    Debug.assertGreaterThanOrEqual(length, 0);
    Debug.assertLessThanOrEqual(start, sourceText.length);
    Debug.assertLessThanOrEqual(start + length, sourceText.length);
}

/** @internal */
export function createFileDiagnosticFromMessageChain(file: SourceFile, start: number, length: number, messageChain: DiagnosticMessageChain, relatedInformation?: DiagnosticRelatedInformation[]): DiagnosticWithLocation {
    assertDiagnosticLocation(file.text, start, length);
    return {
        file,
        start,
        length,
        code: messageChain.code,
        category: messageChain.category,
        messageText: messageChain.next ? messageChain : messageChain.messageText,
        relatedInformation,
    };
}

/** @internal */
export function createDiagnosticForFileFromMessageChain(sourceFile: SourceFile, messageChain: DiagnosticMessageChain, relatedInformation?: DiagnosticRelatedInformation[]): DiagnosticWithLocation {
    return {
        file: sourceFile,
        start: 0,
        length: 0,
        code: messageChain.code,
        category: messageChain.category,
        messageText: messageChain.next ? messageChain : messageChain.messageText,
        relatedInformation,
    };
}

/** @internal */
export function createDiagnosticMessageChainFromDiagnostic(diagnostic: DiagnosticRelatedInformation): DiagnosticMessageChain {
    return typeof diagnostic.messageText === "string" ? {
        code: diagnostic.code,
        category: diagnostic.category,
        messageText: diagnostic.messageText,
        next: (diagnostic as DiagnosticMessageChain).next,
    } : diagnostic.messageText;
}

/** @internal */
export function createDiagnosticForRange(sourceFile: SourceFile, range: TextRange, message: DiagnosticMessage): DiagnosticWithLocation {
    return {
        file: sourceFile,
        start: range.pos,
        length: range.end - range.pos,
        code: message.code,
        category: message.category,
        messageText: message.message,
    };
}

/** @internal */
export function getSpanOfTokenAtPosition(sourceFile: SourceFile, pos: number): TextSpan {
    const scanner = createScanner(sourceFile.languageVersion, /*skipTrivia*/ true, sourceFile.languageVariant, sourceFile.text, /*onError*/ undefined, pos);
    scanner.scan();
    const start = scanner.getTokenStart();
    return createTextSpanFromBounds(start, scanner.getTokenEnd());
}

/** @internal */
export function scanTokenAtPosition(sourceFile: SourceFile, pos: number) {
    const scanner = createScanner(sourceFile.languageVersion, /*skipTrivia*/ true, sourceFile.languageVariant, sourceFile.text, /*onError*/ undefined, pos);
    scanner.scan();
    return scanner.getToken();
}

function getErrorSpanForArrowFunction(sourceFile: SourceFile, node: ArrowFunction): TextSpan {
    const pos = skipTrivia(sourceFile.text, node.pos);
    if (node.body && node.body.kind === SyntaxKind.Block) {
        const { line: startLine } = getLineAndCharacterOfPosition(sourceFile, node.body.pos);
        const { line: endLine } = getLineAndCharacterOfPosition(sourceFile, node.body.end);
        if (startLine < endLine) {
            // The arrow function spans multiple lines,
            // make the error span be the first line, inclusive.
            return createTextSpan(pos, getEndLinePosition(startLine, sourceFile) - pos + 1);
        }
    }
    return createTextSpanFromBounds(pos, node.end);
}

/** @internal */
export function getErrorSpanForNode(sourceFile: SourceFile, node: Node): TextSpan {
    let errorNode: Node | undefined = node;
    switch (node.kind) {
        case SyntaxKind.SourceFile: {
            const pos = skipTrivia(sourceFile.text, 0, /*stopAfterLineBreak*/ false);
            if (pos === sourceFile.text.length) {
                // file is empty - return span for the beginning of the file
                return createTextSpan(0, 0);
            }
            return getSpanOfTokenAtPosition(sourceFile, pos);
        }
        // This list is a work in progress. Add missing node kinds to improve their error
        // spans.
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.BindingElement:
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.ClassExpression:
        case SyntaxKind.InterfaceDeclaration:
        case SyntaxKind.ModuleDeclaration:
        case SyntaxKind.EnumDeclaration:
        case SyntaxKind.EnumMember:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
        case SyntaxKind.TypeAliasDeclaration:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertySignature:
        case SyntaxKind.NamespaceImport:
            errorNode = (node as NamedDeclaration).name;
            break;
        case SyntaxKind.ArrowFunction:
            return getErrorSpanForArrowFunction(sourceFile, node as ArrowFunction);
        case SyntaxKind.CaseClause:
        case SyntaxKind.DefaultClause: {
            const start = skipTrivia(sourceFile.text, (node as CaseOrDefaultClause).pos);
            const end = (node as CaseOrDefaultClause).statements.length > 0 ? (node as CaseOrDefaultClause).statements[0].pos : (node as CaseOrDefaultClause).end;
            return createTextSpanFromBounds(start, end);
        }
        case SyntaxKind.ReturnStatement:
        case SyntaxKind.YieldExpression: {
            const pos = skipTrivia(sourceFile.text, (node as ReturnStatement | YieldExpression).pos);
            return getSpanOfTokenAtPosition(sourceFile, pos);
        }
        case SyntaxKind.SatisfiesExpression: {
            const pos = skipTrivia(sourceFile.text, (node as SatisfiesExpression).expression.end);
            return getSpanOfTokenAtPosition(sourceFile, pos);
        }
        case SyntaxKind.JSDocSatisfiesTag: {
            const pos = skipTrivia(sourceFile.text, (node as JSDocSatisfiesTag).tagName.pos);
            return getSpanOfTokenAtPosition(sourceFile, pos);
        }
    }

    if (errorNode === undefined) {
        // If we don't have a better node, then just set the error on the first token of
        // construct.
        return getSpanOfTokenAtPosition(sourceFile, node.pos);
    }

    Debug.assert(!isJSDoc(errorNode));

    const isMissing = nodeIsMissing(errorNode);
    const pos = isMissing || isJsxText(node)
        ? errorNode.pos
        : skipTrivia(sourceFile.text, errorNode.pos);

    // These asserts should all be satisfied for a properly constructed `errorNode`.
    if (isMissing) {
        Debug.assert(pos === errorNode.pos, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
        Debug.assert(pos === errorNode.end, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
    }
    else {
        Debug.assert(pos >= errorNode.pos, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
        Debug.assert(pos <= errorNode.end, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
    }

    return createTextSpanFromBounds(pos, errorNode.end);
}

/** @internal */
export function isExternalOrCommonJsModule(file: SourceFile): boolean {
    return (file.externalModuleIndicator || file.commonJsModuleIndicator) !== undefined;
}

/** @internal */
export function isJsonSourceFile(file: SourceFile): file is JsonSourceFile {
    return file.scriptKind === ScriptKind.JSON;
}

/** @internal */
export function isEnumConst(node: EnumDeclaration): boolean {
    return !!(getCombinedModifierFlags(node) & ModifierFlags.Const);
}

/** @internal */
export function isDeclarationReadonly(declaration: Declaration): boolean {
    return !!(getCombinedModifierFlags(declaration) & ModifierFlags.Readonly && !isParameterPropertyDeclaration(declaration, declaration.parent));
}

/**
 * Gets whether a bound `VariableDeclaration` or `VariableDeclarationList` is part of an `await using` declaration.
 * @internal
 */
export function isVarAwaitUsing(node: VariableDeclaration | VariableDeclarationList): boolean {
    return (getCombinedNodeFlags(node) & NodeFlags.BlockScoped) === NodeFlags.AwaitUsing;
}

/**
 * Gets whether a bound `VariableDeclaration` or `VariableDeclarationList` is part of a `using` declaration.
 * @internal
 */
export function isVarUsing(node: VariableDeclaration | VariableDeclarationList): boolean {
    return (getCombinedNodeFlags(node) & NodeFlags.BlockScoped) === NodeFlags.Using;
}

/**
 * Gets whether a bound `VariableDeclaration` or `VariableDeclarationList` is part of a `const` declaration.
 * @internal
 */
export function isVarConst(node: VariableDeclaration | VariableDeclarationList): boolean {
    return (getCombinedNodeFlags(node) & NodeFlags.BlockScoped) === NodeFlags.Const;
}

/**
 * Gets whether a bound `VariableDeclaration` or `VariableDeclarationList` is part of a `let` declaration.
 * @internal
 */
export function isLet(node: Node): boolean {
    return (getCombinedNodeFlags(node) & NodeFlags.BlockScoped) === NodeFlags.Let;
}

/** @internal */
export function isSuperCall(n: Node): n is SuperCall {
    return n.kind === SyntaxKind.CallExpression && (n as CallExpression).expression.kind === SyntaxKind.SuperKeyword;
}

/** @internal */
export function isImportCall(n: Node): n is ImportCall {
    return n.kind === SyntaxKind.CallExpression && (n as CallExpression).expression.kind === SyntaxKind.ImportKeyword;
}

/** @internal */
export function isImportMeta(n: Node): n is ImportMetaProperty {
    return isMetaProperty(n)
        && n.keywordToken === SyntaxKind.ImportKeyword
        && n.name.escapedText === "meta";
}

/** @internal */
export function isLiteralImportTypeNode(n: Node): n is LiteralImportTypeNode {
    return isImportTypeNode(n) && isLiteralTypeNode(n.argument) && isStringLiteral(n.argument.literal);
}

/** @internal */
export function isPrologueDirective(node: Node): node is PrologueDirective {
    return node.kind === SyntaxKind.ExpressionStatement
        && (node as ExpressionStatement).expression.kind === SyntaxKind.StringLiteral;
}

/** @internal */
export function isCustomPrologue(node: Statement) {
    return !!(getEmitFlags(node) & EmitFlags.CustomPrologue);
}

/** @internal */
export function isHoistedFunction(node: Statement) {
    return isCustomPrologue(node)
        && isFunctionDeclaration(node);
}

function isHoistedVariable(node: VariableDeclaration) {
    return isIdentifier(node.name)
        && !node.initializer;
}

/** @internal */
export function isHoistedVariableStatement(node: Statement) {
    return isCustomPrologue(node)
        && isVariableStatement(node)
        && every(node.declarationList.declarations, isHoistedVariable);
}

/** @internal */
export function getLeadingCommentRangesOfNode(node: Node, sourceFileOfNode: SourceFile) {
    return node.kind !== SyntaxKind.JsxText ? getLeadingCommentRanges(sourceFileOfNode.text, node.pos) : undefined;
}

/** @internal */
export function getJSDocCommentRanges(node: Node, text: string) {
    const commentRanges = (node.kind === SyntaxKind.Parameter ||
            node.kind === SyntaxKind.TypeParameter ||
            node.kind === SyntaxKind.FunctionExpression ||
            node.kind === SyntaxKind.ArrowFunction ||
            node.kind === SyntaxKind.ParenthesizedExpression ||
            node.kind === SyntaxKind.VariableDeclaration ||
            node.kind === SyntaxKind.ExportSpecifier) ?
        concatenate(getTrailingCommentRanges(text, node.pos), getLeadingCommentRanges(text, node.pos)) :
        getLeadingCommentRanges(text, node.pos);
    // True if the comment starts with '/**' but not if it is '/**/'
    return filter(commentRanges, comment =>
        text.charCodeAt(comment.pos + 1) === CharacterCodes.asterisk &&
        text.charCodeAt(comment.pos + 2) === CharacterCodes.asterisk &&
        text.charCodeAt(comment.pos + 3) !== CharacterCodes.slash);
}

/** @internal */
export const fullTripleSlashReferencePathRegEx = /^(\/\/\/\s*<reference\s+path\s*=\s*)(('[^']*')|("[^"]*")).*?\/>/;
const fullTripleSlashReferenceTypeReferenceDirectiveRegEx = /^(\/\/\/\s*<reference\s+types\s*=\s*)(('[^']*')|("[^"]*")).*?\/>/;
const fullTripleSlashLibReferenceRegEx = /^(\/\/\/\s*<reference\s+lib\s*=\s*)(('[^']*')|("[^"]*")).*?\/>/;
/** @internal */
export const fullTripleSlashAMDReferencePathRegEx = /^(\/\/\/\s*<amd-dependency\s+path\s*=\s*)(('[^']*')|("[^"]*")).*?\/>/;
const fullTripleSlashAMDModuleRegEx = /^\/\/\/\s*<amd-module\s+.*?\/>/;
const defaultLibReferenceRegEx = /^(\/\/\/\s*<reference\s+no-default-lib\s*=\s*)(('[^']*')|("[^"]*"))\s*\/>/;

/** @internal */
export function isPartOfTypeNode(node: Node): boolean {
    if (SyntaxKind.FirstTypeNode <= node.kind && node.kind <= SyntaxKind.LastTypeNode) {
        return true;
    }

    switch (node.kind) {
        case SyntaxKind.AnyKeyword:
        case SyntaxKind.UnknownKeyword:
        case SyntaxKind.NumberKeyword:
        case SyntaxKind.BigIntKeyword:
        case SyntaxKind.StringKeyword:
        case SyntaxKind.BooleanKeyword:
        case SyntaxKind.SymbolKeyword:
        case SyntaxKind.ObjectKeyword:
        case SyntaxKind.UndefinedKeyword:
        case SyntaxKind.NullKeyword:
        case SyntaxKind.NeverKeyword:
            return true;
        case SyntaxKind.VoidKeyword:
            return node.parent.kind !== SyntaxKind.VoidExpression;
        case SyntaxKind.ExpressionWithTypeArguments:
            return isHeritageClause(node.parent) && !isExpressionWithTypeArgumentsInClassExtendsClause(node);
        case SyntaxKind.TypeParameter:
            return node.parent.kind === SyntaxKind.MappedType || node.parent.kind === SyntaxKind.InferType;

        // Identifiers and qualified names may be type nodes, depending on their context. Climb
        // above them to find the lowest container
        case SyntaxKind.Identifier:
            // If the identifier is the RHS of a qualified name, then it's a type iff its parent is.
            if (node.parent.kind === SyntaxKind.QualifiedName && (node.parent as QualifiedName).right === node) {
                node = node.parent;
            }
            else if (node.parent.kind === SyntaxKind.PropertyAccessExpression && (node.parent as PropertyAccessExpression).name === node) {
                node = node.parent;
            }
            // At this point, node is either a qualified name or an identifier
            Debug.assert(node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.QualifiedName || node.kind === SyntaxKind.PropertyAccessExpression, "'node' was expected to be a qualified name, identifier or property access in 'isPartOfTypeNode'.");
            // falls through

        case SyntaxKind.QualifiedName:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.ThisKeyword: {
            const { parent } = node;
            if (parent.kind === SyntaxKind.TypeQuery) {
                return false;
            }
            if (parent.kind === SyntaxKind.ImportType) {
                return !(parent as ImportTypeNode).isTypeOf;
            }
            // Do not recursively call isPartOfTypeNode on the parent. In the example:
            //
            //     let a: A.B.C;
            //
            // Calling isPartOfTypeNode would consider the qualified name A.B a type node.
            // Only C and A.B.C are type nodes.
            if (SyntaxKind.FirstTypeNode <= parent.kind && parent.kind <= SyntaxKind.LastTypeNode) {
                return true;
            }
            switch (parent.kind) {
                case SyntaxKind.ExpressionWithTypeArguments:
                    return isHeritageClause(parent.parent) && !isExpressionWithTypeArgumentsInClassExtendsClause(parent);
                case SyntaxKind.TypeParameter:
                    return node === (parent as TypeParameterDeclaration).constraint;
                case SyntaxKind.JSDocTemplateTag:
                    return node === (parent as JSDocTemplateTag).constraint;
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                case SyntaxKind.Parameter:
                case SyntaxKind.VariableDeclaration:
                    return node === (parent as HasType).type;
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                case SyntaxKind.Constructor:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    return node === (parent as FunctionLikeDeclaration).type;
                case SyntaxKind.CallSignature:
                case SyntaxKind.ConstructSignature:
                case SyntaxKind.IndexSignature:
                    return node === (parent as SignatureDeclaration).type;
                case SyntaxKind.TypeAssertionExpression:
                    return node === (parent as TypeAssertion).type;
                case SyntaxKind.CallExpression:
                case SyntaxKind.NewExpression:
                case SyntaxKind.TaggedTemplateExpression:
                    return contains((parent as CallExpression | TaggedTemplateExpression).typeArguments, node);
            }
        }
    }

    return false;
}

/** @internal */
export function isChildOfNodeWithKind(node: Node, kind: SyntaxKind): boolean {
    while (node) {
        if (node.kind === kind) {
            return true;
        }
        node = node.parent;
    }
    return false;
}

// Warning: This has the same semantics as the forEach family of functions,
//          in that traversal terminates in the event that 'visitor' supplies a truthy value.
/** @internal */
export function forEachReturnStatement<T>(body: Block | Statement, visitor: (stmt: ReturnStatement) => T): T | undefined {
    return traverse(body);

    function traverse(node: Node): T | undefined {
        switch (node.kind) {
            case SyntaxKind.ReturnStatement:
                return visitor(node as ReturnStatement);
            case SyntaxKind.CaseBlock:
            case SyntaxKind.Block:
            case SyntaxKind.IfStatement:
            case SyntaxKind.DoStatement:
            case SyntaxKind.WhileStatement:
            case SyntaxKind.ForStatement:
            case SyntaxKind.ForInStatement:
            case SyntaxKind.ForOfStatement:
            case SyntaxKind.WithStatement:
            case SyntaxKind.SwitchStatement:
            case SyntaxKind.CaseClause:
            case SyntaxKind.DefaultClause:
            case SyntaxKind.LabeledStatement:
            case SyntaxKind.TryStatement:
            case SyntaxKind.CatchClause:
                return forEachChild(node, traverse);
        }
    }
}

/** @internal */
export function forEachYieldExpression(body: Block, visitor: (expr: YieldExpression) => void): void {
    return traverse(body);

    function traverse(node: Node): void {
        switch (node.kind) {
            case SyntaxKind.YieldExpression:
                visitor(node as YieldExpression);
                const operand = (node as YieldExpression).expression;
                if (operand) {
                    traverse(operand);
                }
                return;
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
                // These are not allowed inside a generator now, but eventually they may be allowed
                // as local types. Regardless, skip them to avoid the work.
                return;
            default:
                if (isFunctionLike(node)) {
                    if (node.name && node.name.kind === SyntaxKind.ComputedPropertyName) {
                        // Note that we will not include methods/accessors of a class because they would require
                        // first descending into the class. This is by design.
                        traverse(node.name.expression);
                        return;
                    }
                }
                else if (!isPartOfTypeNode(node)) {
                    // This is the general case, which should include mostly expressions and statements.
                    // Also includes NodeArrays.
                    forEachChild(node, traverse);
                }
        }
    }
}

/**
 * Gets the most likely element type for a TypeNode. This is not an exhaustive test
 * as it assumes a rest argument can only be an array type (either T[], or Array<T>).
 *
 * @param node The type node.
 *
 * @internal
 */
export function getRestParameterElementType(node: TypeNode | undefined) {
    if (node && node.kind === SyntaxKind.ArrayType) {
        return (node as ArrayTypeNode).elementType;
    }
    else if (node && node.kind === SyntaxKind.TypeReference) {
        return singleOrUndefined((node as TypeReferenceNode).typeArguments);
    }
    else {
        return undefined;
    }
}

/** @internal */
export function getMembersOfDeclaration(node: Declaration): NodeArray<ClassElement | TypeElement | ObjectLiteralElement> | undefined {
    switch (node.kind) {
        case SyntaxKind.InterfaceDeclaration:
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.ClassExpression:
        case SyntaxKind.TypeLiteral:
            return (node as ObjectTypeDeclaration).members;
        case SyntaxKind.ObjectLiteralExpression:
            return (node as ObjectLiteralExpression).properties;
    }
}

/** @internal */
export function isVariableLike(node: Node): node is VariableLikeDeclaration {
    if (node) {
        switch (node.kind) {
            case SyntaxKind.BindingElement:
            case SyntaxKind.EnumMember:
            case SyntaxKind.Parameter:
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.ShorthandPropertyAssignment:
            case SyntaxKind.VariableDeclaration:
                return true;
        }
    }
    return false;
}

/** @internal */
export function isVariableLikeOrAccessor(node: Node): node is AccessorDeclaration | VariableLikeDeclaration {
    return isVariableLike(node) || isAccessor(node);
}

/** @internal */
export function isVariableDeclarationInVariableStatement(node: VariableDeclaration) {
    return node.parent.kind === SyntaxKind.VariableDeclarationList
        && node.parent.parent.kind === SyntaxKind.VariableStatement;
}

/** @internal */
export function isCommonJsExportedExpression(node: Node) {
    if (!isInJSFile(node)) return false;
    return (isObjectLiteralExpression(node.parent) && isBinaryExpression(node.parent.parent) && getAssignmentDeclarationKind(node.parent.parent) === AssignmentDeclarationKind.ModuleExports) ||
        isCommonJsExportPropertyAssignment(node.parent);
}

/** @internal */
export function isCommonJsExportPropertyAssignment(node: Node) {
    if (!isInJSFile(node)) return false;
    return (isBinaryExpression(node) && getAssignmentDeclarationKind(node) === AssignmentDeclarationKind.ExportsProperty);
}

/** @internal */
export function isValidESSymbolDeclaration(node: Node): boolean {
    return (isVariableDeclaration(node) ? isVarConst(node) && isIdentifier(node.name) && isVariableDeclarationInVariableStatement(node) :
        isPropertyDeclaration(node) ? hasEffectiveReadonlyModifier(node) && hasStaticModifier(node) :
        isPropertySignature(node) && hasEffectiveReadonlyModifier(node)) || isCommonJsExportPropertyAssignment(node);
}

/** @internal */
export function introducesArgumentsExoticObject(node: Node) {
    switch (node.kind) {
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.MethodSignature:
        case SyntaxKind.Constructor:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
            return true;
    }
    return false;
}

/** @internal */
export function unwrapInnermostStatementOfLabel(node: LabeledStatement, beforeUnwrapLabelCallback?: (node: LabeledStatement) => void): Statement {
    while (true) {
        if (beforeUnwrapLabelCallback) {
            beforeUnwrapLabelCallback(node);
        }
        if (node.statement.kind !== SyntaxKind.LabeledStatement) {
            return node.statement;
        }
        node = node.statement as LabeledStatement;
    }
}

/** @internal */
export function isFunctionBlock(node: Node): boolean {
    return node && node.kind === SyntaxKind.Block && isFunctionLike(node.parent);
}

/** @internal */
export function isObjectLiteralMethod(node: Node): node is MethodDeclaration {
    return node && node.kind === SyntaxKind.MethodDeclaration && node.parent.kind === SyntaxKind.ObjectLiteralExpression;
}

/** @internal */
export function isObjectLiteralOrClassExpressionMethodOrAccessor(node: Node): node is MethodDeclaration | AccessorDeclaration {
    return (node.kind === SyntaxKind.MethodDeclaration || node.kind === SyntaxKind.GetAccessor || node.kind === SyntaxKind.SetAccessor) &&
        (node.parent.kind === SyntaxKind.ObjectLiteralExpression ||
            node.parent.kind === SyntaxKind.ClassExpression);
}

/** @internal */
export function isIdentifierTypePredicate(predicate: TypePredicate): predicate is IdentifierTypePredicate {
    return predicate && predicate.kind === TypePredicateKind.Identifier;
}

/** @internal */
export function isThisTypePredicate(predicate: TypePredicate): predicate is ThisTypePredicate {
    return predicate && predicate.kind === TypePredicateKind.This;
}

/** @internal */
export function forEachPropertyAssignment<T>(objectLiteral: ObjectLiteralExpression | undefined, key: string, callback: (property: PropertyAssignment) => T | undefined, key2?: string) {
    return forEach(objectLiteral?.properties, property => {
        if (!isPropertyAssignment(property)) return undefined;
        const propName = tryGetTextOfPropertyName(property.name);
        return key === propName || (key2 && key2 === propName) ?
            callback(property) :
            undefined;
    });
}

/** @internal */
export function getPropertyArrayElementValue(objectLiteral: ObjectLiteralExpression, propKey: string, elementValue: string): StringLiteral | undefined {
    return forEachPropertyAssignment(objectLiteral, propKey, property =>
        isArrayLiteralExpression(property.initializer) ?
            find(property.initializer.elements, (element): element is StringLiteral => isStringLiteral(element) && element.text === elementValue) :
            undefined);
}

/** @internal */
export function getTsConfigObjectLiteralExpression(tsConfigSourceFile: TsConfigSourceFile | undefined): ObjectLiteralExpression | undefined {
    if (tsConfigSourceFile && tsConfigSourceFile.statements.length) {
        const expression = tsConfigSourceFile.statements[0].expression;
        return tryCast(expression, isObjectLiteralExpression);
    }
}

/** @internal */
export function getTsConfigPropArrayElementValue(tsConfigSourceFile: TsConfigSourceFile | undefined, propKey: string, elementValue: string): StringLiteral | undefined {
    return forEachTsConfigPropArray(tsConfigSourceFile, propKey, property =>
        isArrayLiteralExpression(property.initializer) ?
            find(property.initializer.elements, (element): element is StringLiteral => isStringLiteral(element) && element.text === elementValue) :
            undefined);
}

/** @internal */
export function forEachTsConfigPropArray<T>(tsConfigSourceFile: TsConfigSourceFile | undefined, propKey: string, callback: (property: PropertyAssignment) => T | undefined) {
    return forEachPropertyAssignment(getTsConfigObjectLiteralExpression(tsConfigSourceFile), propKey, callback);
}

/** @internal */
export function getContainingFunction(node: Node): SignatureDeclaration | undefined {
    return findAncestor(node.parent, isFunctionLike);
}

/** @internal */
export function getContainingFunctionDeclaration(node: Node): FunctionLikeDeclaration | undefined {
    return findAncestor(node.parent, isFunctionLikeDeclaration);
}

/** @internal */
export function getContainingClass(node: Node): ClassLikeDeclaration | undefined {
    return findAncestor(node.parent, isClassLike);
}

/** @internal */
export function getContainingClassStaticBlock(node: Node): Node | undefined {
    return findAncestor(node.parent, n => {
        if (isClassLike(n) || isFunctionLike(n)) {
            return "quit";
        }
        return isClassStaticBlockDeclaration(n);
    });
}

/** @internal */
export function getContainingFunctionOrClassStaticBlock(node: Node): SignatureDeclaration | ClassStaticBlockDeclaration | undefined {
    return findAncestor(node.parent, isFunctionLikeOrClassStaticBlockDeclaration);
}

/** @internal */
export function getContainingClassExcludingClassDecorators(node: Node): ClassLikeDeclaration | undefined {
    const decorator = findAncestor(node.parent, n => isClassLike(n) ? "quit" : isDecorator(n));
    return decorator && isClassLike(decorator.parent) ? getContainingClass(decorator.parent) : getContainingClass(decorator ?? node);
}

/** @internal */
export type ThisContainer =
    | FunctionDeclaration
    | FunctionExpression
    | ModuleDeclaration
    | ClassStaticBlockDeclaration
    | PropertyDeclaration
    | PropertySignature
    | MethodDeclaration
    | MethodSignature
    | ConstructorDeclaration
    | GetAccessorDeclaration
    | SetAccessorDeclaration
    | CallSignatureDeclaration
    | ConstructSignatureDeclaration
    | IndexSignatureDeclaration
    | EnumDeclaration
    | SourceFile;

/** @internal */
export function getThisContainer(node: Node, includeArrowFunctions: false, includeClassComputedPropertyName: false): ThisContainer;
/** @internal */
export function getThisContainer(node: Node, includeArrowFunctions: false, includeClassComputedPropertyName: boolean): ThisContainer | ComputedPropertyName;
/** @internal */
export function getThisContainer(node: Node, includeArrowFunctions: boolean, includeClassComputedPropertyName: false): ThisContainer | ArrowFunction;
/** @internal */
export function getThisContainer(node: Node, includeArrowFunctions: boolean, includeClassComputedPropertyName: boolean): ThisContainer | ArrowFunction | ComputedPropertyName;
export function getThisContainer(node: Node, includeArrowFunctions: boolean, includeClassComputedPropertyName: boolean) {
    Debug.assert(node.kind !== SyntaxKind.SourceFile);
    while (true) {
        node = node.parent;
        if (!node) {
            return Debug.fail(); // If we never pass in a SourceFile, this should be unreachable, since we'll stop when we reach that.
        }
        switch (node.kind) {
            case SyntaxKind.ComputedPropertyName:
                // If the grandparent node is an object literal (as opposed to a class),
                // then the computed property is not a 'this' container.
                // A computed property name in a class needs to be a this container
                // so that we can error on it.
                if (includeClassComputedPropertyName && isClassLike(node.parent.parent)) {
                    return node as ComputedPropertyName;
                }
                // If this is a computed property, then the parent should not
                // make it a this container. The parent might be a property
                // in an object literal, like a method or accessor. But in order for
                // such a parent to be a this container, the reference must be in
                // the *body* of the container.
                node = node.parent.parent;
                break;
            case SyntaxKind.Decorator:
                // Decorators are always applied outside of the body of a class or method.
                if (node.parent.kind === SyntaxKind.Parameter && isClassElement(node.parent.parent)) {
                    // If the decorator's parent is a Parameter, we resolve the this container from
                    // the grandparent class declaration.
                    node = node.parent.parent;
                }
                else if (isClassElement(node.parent)) {
                    // If the decorator's parent is a class element, we resolve the 'this' container
                    // from the parent class declaration.
                    node = node.parent;
                }
                break;
            case SyntaxKind.ArrowFunction:
                if (!includeArrowFunctions) {
                    continue;
                }
                // falls through

            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.ClassStaticBlockDeclaration:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.Constructor:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.CallSignature:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.IndexSignature:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.SourceFile:
                return node as ThisContainer | ArrowFunction;
        }
    }
}

/**
 * @returns Whether the node creates a new 'this' scope for its children.
 *
 * @internal
 */
export function isThisContainerOrFunctionBlock(node: Node): boolean {
    switch (node.kind) {
        // Arrow functions use the same scope, but may do so in a "delayed" manner
        // For example, `const getThis = () => this` may be before a super() call in a derived constructor
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.PropertyDeclaration:
            return true;
        case SyntaxKind.Block:
            switch (node.parent.kind) {
                case SyntaxKind.Constructor:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    // Object properties can have computed names; only method-like bodies start a new scope
                    return true;
                default:
                    return false;
            }
        default:
            return false;
    }
}

/** @internal */
export function isInTopLevelContext(node: Node) {
    // The name of a class or function declaration is a BindingIdentifier in its surrounding scope.
    if (isIdentifier(node) && (isClassDeclaration(node.parent) || isFunctionDeclaration(node.parent)) && node.parent.name === node) {
        node = node.parent;
    }
    const container = getThisContainer(node, /*includeArrowFunctions*/ true, /*includeClassComputedPropertyName*/ false);
    return isSourceFile(container);
}

/** @internal */
export function getNewTargetContainer(node: Node) {
    const container = getThisContainer(node, /*includeArrowFunctions*/ false, /*includeClassComputedPropertyName*/ false);
    if (container) {
        switch (container.kind) {
            case SyntaxKind.Constructor:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
                return container;
        }
    }

    return undefined;
}

/** @internal */
export type SuperContainer =
    | PropertyDeclaration
    | PropertySignature
    | MethodDeclaration
    | MethodSignature
    | ConstructorDeclaration
    | GetAccessorDeclaration
    | SetAccessorDeclaration
    | ClassStaticBlockDeclaration;

/** @internal */
export type SuperContainerOrFunctions =
    | SuperContainer
    | FunctionDeclaration
    | FunctionExpression
    | ArrowFunction;

/**
 * Given an super call/property node, returns the closest node where
 * - a super call/property access is legal in the node and not legal in the parent node the node.
 *   i.e. super call is legal in constructor but not legal in the class body.
 * - the container is an arrow function (so caller might need to call getSuperContainer again in case it needs to climb higher)
 * - a super call/property is definitely illegal in the container (but might be legal in some subnode)
 *   i.e. super property access is illegal in function declaration but can be legal in the statement list
 *
 * @internal
 */
export function getSuperContainer(node: Node, stopOnFunctions: false): SuperContainer | undefined;
/** @internal */
export function getSuperContainer(node: Node, stopOnFunctions: boolean): SuperContainerOrFunctions | undefined;
export function getSuperContainer(node: Node, stopOnFunctions: boolean) {
    while (true) {
        node = node.parent;
        if (!node) {
            return undefined;
        }
        switch (node.kind) {
            case SyntaxKind.ComputedPropertyName:
                node = node.parent;
                break;
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
                if (!stopOnFunctions) {
                    continue;
                }
                // falls through

            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.Constructor:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.ClassStaticBlockDeclaration:
                return node as SuperContainerOrFunctions;
            case SyntaxKind.Decorator:
                // Decorators are always applied outside of the body of a class or method.
                if (node.parent.kind === SyntaxKind.Parameter && isClassElement(node.parent.parent)) {
                    // If the decorator's parent is a Parameter, we resolve the this container from
                    // the grandparent class declaration.
                    node = node.parent.parent;
                }
                else if (isClassElement(node.parent)) {
                    // If the decorator's parent is a class element, we resolve the 'this' container
                    // from the parent class declaration.
                    node = node.parent;
                }
                break;
        }
    }
}

/** @internal */
export function getImmediatelyInvokedFunctionExpression(func: Node): CallExpression | undefined {
    if (func.kind === SyntaxKind.FunctionExpression || func.kind === SyntaxKind.ArrowFunction) {
        let prev = func;
        let parent = func.parent;
        while (parent.kind === SyntaxKind.ParenthesizedExpression) {
            prev = parent;
            parent = parent.parent;
        }
        if (parent.kind === SyntaxKind.CallExpression && (parent as CallExpression).expression === prev) {
            return parent as CallExpression;
        }
    }
}

/** @internal */
export function isSuperOrSuperProperty(node: Node): node is SuperExpression | SuperProperty {
    return node.kind === SyntaxKind.SuperKeyword
        || isSuperProperty(node);
}

/**
 * Determines whether a node is a property or element access expression for `super`.
 *
 * @internal
 */
export function isSuperProperty(node: Node): node is SuperProperty {
    const kind = node.kind;
    return (kind === SyntaxKind.PropertyAccessExpression || kind === SyntaxKind.ElementAccessExpression)
        && (node as PropertyAccessExpression | ElementAccessExpression).expression.kind === SyntaxKind.SuperKeyword;
}

/**
 * Determines whether a node is a property or element access expression for `this`.
 *
 * @internal
 */
export function isThisProperty(node: Node): boolean {
    const kind = node.kind;
    return (kind === SyntaxKind.PropertyAccessExpression || kind === SyntaxKind.ElementAccessExpression)
        && (node as PropertyAccessExpression | ElementAccessExpression).expression.kind === SyntaxKind.ThisKeyword;
}

/** @internal */
export function isThisInitializedDeclaration(node: Node | undefined): boolean {
    return !!node && isVariableDeclaration(node) && node.initializer?.kind === SyntaxKind.ThisKeyword;
}

/** @internal */
export function isThisInitializedObjectBindingExpression(node: Node | undefined): boolean {
    return !!node
        && (isShorthandPropertyAssignment(node) || isPropertyAssignment(node))
        && isBinaryExpression(node.parent.parent)
        && node.parent.parent.operatorToken.kind === SyntaxKind.EqualsToken
        && node.parent.parent.right.kind === SyntaxKind.ThisKeyword;
}

/** @internal */
export function getEntityNameFromTypeNode(node: TypeNode): EntityNameOrEntityNameExpression | undefined {
    switch (node.kind) {
        case SyntaxKind.TypeReference:
            return (node as TypeReferenceNode).typeName;

        case SyntaxKind.ExpressionWithTypeArguments:
            return isEntityNameExpression((node as ExpressionWithTypeArguments).expression)
                ? (node as ExpressionWithTypeArguments).expression as EntityNameExpression
                : undefined;

        // TODO(rbuckton): These aren't valid TypeNodes, but we treat them as such because of `isPartOfTypeNode`, which returns `true` for things that aren't `TypeNode`s.
        case SyntaxKind.Identifier as TypeNodeSyntaxKind:
        case SyntaxKind.QualifiedName as TypeNodeSyntaxKind:
            return (node as Node as EntityName);
    }

    return undefined;
}

/** @internal */
export function getInvokedExpression(node: CallLikeExpression): Expression | JsxTagNameExpression {
    switch (node.kind) {
        case SyntaxKind.TaggedTemplateExpression:
            return node.tag;
        case SyntaxKind.JsxOpeningElement:
        case SyntaxKind.JsxSelfClosingElement:
            return node.tagName;
        case SyntaxKind.BinaryExpression:
            return node.right;
        default:
            return node.expression;
    }
}

/** @internal */
export function nodeCanBeDecorated(useLegacyDecorators: boolean, node: ClassDeclaration): true;
/** @internal */
export function nodeCanBeDecorated(useLegacyDecorators: boolean, node: ClassExpression): boolean;
/** @internal */
export function nodeCanBeDecorated(useLegacyDecorators: boolean, node: ClassElement, parent: Node): boolean;
/** @internal */
export function nodeCanBeDecorated(useLegacyDecorators: boolean, node: Node, parent: Node, grandparent: Node): boolean;
/** @internal */
export function nodeCanBeDecorated(useLegacyDecorators: boolean, node: Node, parent?: Node, grandparent?: Node): boolean {
    // private names cannot be used with decorators yet
    if (useLegacyDecorators && isNamedDeclaration(node) && isPrivateIdentifier(node.name)) {
        return false;
    }

    switch (node.kind) {
        case SyntaxKind.ClassDeclaration:
            // class declarations are valid targets
            return true;

        case SyntaxKind.ClassExpression:
            // class expressions are valid targets for native decorators
            return !useLegacyDecorators;

        case SyntaxKind.PropertyDeclaration:
            // property declarations are valid if their parent is a class declaration.
            return parent !== undefined
                && (useLegacyDecorators ? isClassDeclaration(parent) : isClassLike(parent) && !hasAbstractModifier(node) && !hasAmbientModifier(node));

        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
        case SyntaxKind.MethodDeclaration:
            // if this method has a body and its parent is a class declaration, this is a valid target.
            return (node as FunctionLikeDeclaration).body !== undefined
                && parent !== undefined
                && (useLegacyDecorators ? isClassDeclaration(parent) : isClassLike(parent));

        case SyntaxKind.Parameter:
            // TODO(rbuckton): Parameter decorator support for ES decorators must wait until it is standardized
            if (!useLegacyDecorators) return false;
            // if the parameter's parent has a body and its grandparent is a class declaration, this is a valid target.
            return parent !== undefined
                && (parent as FunctionLikeDeclaration).body !== undefined
                && (parent.kind === SyntaxKind.Constructor
                    || parent.kind === SyntaxKind.MethodDeclaration
                    || parent.kind === SyntaxKind.SetAccessor)
                && getThisParameter(parent as FunctionLikeDeclaration) !== node
                && grandparent !== undefined
                && grandparent.kind === SyntaxKind.ClassDeclaration;
    }

    return false;
}

/** @internal */
export function nodeIsDecorated(useLegacyDecorators: boolean, node: ClassDeclaration | ClassExpression): boolean;
/** @internal */
export function nodeIsDecorated(useLegacyDecorators: boolean, node: ClassElement, parent: Node): boolean;
/** @internal */
export function nodeIsDecorated(useLegacyDecorators: boolean, node: Node, parent: Node, grandparent: Node): boolean;
/** @internal */
export function nodeIsDecorated(useLegacyDecorators: boolean, node: Node, parent?: Node, grandparent?: Node): boolean {
    return hasDecorators(node)
        && nodeCanBeDecorated(useLegacyDecorators, node, parent!, grandparent!);
}

/** @internal */
export function nodeOrChildIsDecorated(useLegacyDecorators: boolean, node: ClassDeclaration | ClassExpression): boolean;
/** @internal */
export function nodeOrChildIsDecorated(useLegacyDecorators: boolean, node: ClassElement, parent: Node): boolean;
/** @internal */
export function nodeOrChildIsDecorated(useLegacyDecorators: boolean, node: Node, parent: Node, grandparent: Node): boolean;
/** @internal */
export function nodeOrChildIsDecorated(useLegacyDecorators: boolean, node: Node, parent?: Node, grandparent?: Node): boolean {
    return nodeIsDecorated(useLegacyDecorators, node, parent!, grandparent!)
        || childIsDecorated(useLegacyDecorators, node, parent!);
}

/** @internal */
export function childIsDecorated(useLegacyDecorators: boolean, node: ClassDeclaration | ClassExpression): boolean;
/** @internal */
export function childIsDecorated(useLegacyDecorators: boolean, node: Node, parent: Node): boolean;
/** @internal */
export function childIsDecorated(useLegacyDecorators: boolean, node: Node, parent?: Node): boolean {
    switch (node.kind) {
        case SyntaxKind.ClassDeclaration:
            return some((node as ClassDeclaration).members, m => nodeOrChildIsDecorated(useLegacyDecorators, m, node, parent!));
        case SyntaxKind.ClassExpression:
            return !useLegacyDecorators && some((node as ClassExpression).members, m => nodeOrChildIsDecorated(useLegacyDecorators, m, node, parent!));
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.SetAccessor:
        case SyntaxKind.Constructor:
            return some((node as FunctionLikeDeclaration).parameters, p => nodeIsDecorated(useLegacyDecorators, p, node, parent!));
        default:
            return false;
    }
}

/** @internal */
export function classOrConstructorParameterIsDecorated(useLegacyDecorators: boolean, node: ClassDeclaration | ClassExpression): boolean {
    if (nodeIsDecorated(useLegacyDecorators, node)) return true;
    const constructor = getFirstConstructorWithBody(node);
    return !!constructor && childIsDecorated(useLegacyDecorators, constructor, node);
}

/** @internal */
export function classElementOrClassElementParameterIsDecorated(useLegacyDecorators: boolean, node: ClassElement, parent: ClassDeclaration | ClassExpression): boolean {
    let parameters: NodeArray<ParameterDeclaration> | undefined;
    if (isAccessor(node)) {
        const { firstAccessor, secondAccessor, setAccessor } = getAllAccessorDeclarations(parent.members, node);
        const firstAccessorWithDecorators = hasDecorators(firstAccessor) ? firstAccessor :
            secondAccessor && hasDecorators(secondAccessor) ? secondAccessor :
            undefined;
        if (!firstAccessorWithDecorators || node !== firstAccessorWithDecorators) {
            return false;
        }
        parameters = setAccessor?.parameters;
    }
    else if (isMethodDeclaration(node)) {
        parameters = node.parameters;
    }
    if (nodeIsDecorated(useLegacyDecorators, node, parent)) {
        return true;
    }
    if (parameters) {
        for (const parameter of parameters) {
            if (parameterIsThisKeyword(parameter)) continue;
            if (nodeIsDecorated(useLegacyDecorators, parameter, node, parent)) return true;
        }
    }
    return false;
}

/** @internal */
export function isEmptyStringLiteral(node: StringLiteral): boolean {
    if (node.textSourceNode) {
        switch (node.textSourceNode.kind) {
            case SyntaxKind.StringLiteral:
                return isEmptyStringLiteral(node.textSourceNode);
            case SyntaxKind.NoSubstitutionTemplateLiteral:
                return node.text === "";
        }
        return false;
    }
    return node.text === "";
}

/** @internal */
export function isJSXTagName(node: Node) {
    const { parent } = node;
    if (
        parent.kind === SyntaxKind.JsxOpeningElement ||
        parent.kind === SyntaxKind.JsxSelfClosingElement ||
        parent.kind === SyntaxKind.JsxClosingElement
    ) {
        return (parent as JsxOpeningLikeElement).tagName === node;
    }
    return false;
}

/** @internal */
export function isExpressionNode(node: Node): boolean {
    switch (node.kind) {
        case SyntaxKind.SuperKeyword:
        case SyntaxKind.NullKeyword:
        case SyntaxKind.TrueKeyword:
        case SyntaxKind.FalseKeyword:
        case SyntaxKind.RegularExpressionLiteral:
        case SyntaxKind.ArrayLiteralExpression:
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.ElementAccessExpression:
        case SyntaxKind.CallExpression:
        case SyntaxKind.NewExpression:
        case SyntaxKind.TaggedTemplateExpression:
        case SyntaxKind.AsExpression:
        case SyntaxKind.TypeAssertionExpression:
        case SyntaxKind.SatisfiesExpression:
        case SyntaxKind.NonNullExpression:
        case SyntaxKind.ParenthesizedExpression:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ClassExpression:
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.VoidExpression:
        case SyntaxKind.DeleteExpression:
        case SyntaxKind.TypeOfExpression:
        case SyntaxKind.PrefixUnaryExpression:
        case SyntaxKind.PostfixUnaryExpression:
        case SyntaxKind.BinaryExpression:
        case SyntaxKind.ConditionalExpression:
        case SyntaxKind.SpreadElement:
        case SyntaxKind.TemplateExpression:
        case SyntaxKind.OmittedExpression:
        case SyntaxKind.JsxElement:
        case SyntaxKind.JsxSelfClosingElement:
        case SyntaxKind.JsxFragment:
        case SyntaxKind.YieldExpression:
        case SyntaxKind.AwaitExpression:
        case SyntaxKind.MetaProperty:
            return true;
        case SyntaxKind.ExpressionWithTypeArguments:
            return !isHeritageClause(node.parent) && !isJSDocAugmentsTag(node.parent);
        case SyntaxKind.QualifiedName:
            while (node.parent.kind === SyntaxKind.QualifiedName) {
                node = node.parent;
            }
            return node.parent.kind === SyntaxKind.TypeQuery || isJSDocLinkLike(node.parent) || isJSDocNameReference(node.parent) || isJSDocMemberName(node.parent) || isJSXTagName(node);
        case SyntaxKind.JSDocMemberName:
            while (isJSDocMemberName(node.parent)) {
                node = node.parent;
            }
            return node.parent.kind === SyntaxKind.TypeQuery || isJSDocLinkLike(node.parent) || isJSDocNameReference(node.parent) || isJSDocMemberName(node.parent) || isJSXTagName(node);
        case SyntaxKind.PrivateIdentifier:
            return isBinaryExpression(node.parent) && node.parent.left === node && node.parent.operatorToken.kind === SyntaxKind.InKeyword;
        case SyntaxKind.Identifier:
            if (node.parent.kind === SyntaxKind.TypeQuery || isJSDocLinkLike(node.parent) || isJSDocNameReference(node.parent) || isJSDocMemberName(node.parent) || isJSXTagName(node)) {
                return true;
            }
            // falls through

        case SyntaxKind.NumericLiteral:
        case SyntaxKind.BigIntLiteral:
        case SyntaxKind.StringLiteral:
        case SyntaxKind.NoSubstitutionTemplateLiteral:
        case SyntaxKind.ThisKeyword:
            return isInExpressionContext(node);
        default:
            return false;
    }
}

/** @internal */
export function isInExpressionContext(node: Node): boolean {
    const { parent } = node;
    switch (parent.kind) {
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.Parameter:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertySignature:
        case SyntaxKind.EnumMember:
        case SyntaxKind.PropertyAssignment:
        case SyntaxKind.BindingElement:
            return (parent as HasInitializer).initializer === node;
        case SyntaxKind.ExpressionStatement:
        case SyntaxKind.IfStatement:
        case SyntaxKind.DoStatement:
        case SyntaxKind.WhileStatement:
        case SyntaxKind.ReturnStatement:
        case SyntaxKind.WithStatement:
        case SyntaxKind.SwitchStatement:
        case SyntaxKind.CaseClause:
        case SyntaxKind.ThrowStatement:
            return (parent as ExpressionStatement).expression === node;
        case SyntaxKind.ForStatement:
            const forStatement = parent as ForStatement;
            return (forStatement.initializer === node && forStatement.initializer.kind !== SyntaxKind.VariableDeclarationList) ||
                forStatement.condition === node ||
                forStatement.incrementor === node;
        case SyntaxKind.ForInStatement:
        case SyntaxKind.ForOfStatement:
            const forInOrOfStatement = parent as ForInOrOfStatement;
            return (forInOrOfStatement.initializer === node && forInOrOfStatement.initializer.kind !== SyntaxKind.VariableDeclarationList) ||
                forInOrOfStatement.expression === node;
        case SyntaxKind.TypeAssertionExpression:
        case SyntaxKind.AsExpression:
            return node === (parent as AssertionExpression).expression;
        case SyntaxKind.TemplateSpan:
            return node === (parent as TemplateSpan).expression;
        case SyntaxKind.ComputedPropertyName:
            return node === (parent as ComputedPropertyName).expression;
        case SyntaxKind.Decorator:
        case SyntaxKind.JsxExpression:
        case SyntaxKind.JsxSpreadAttribute:
        case SyntaxKind.SpreadAssignment:
            return true;
        case SyntaxKind.ExpressionWithTypeArguments:
            return (parent as ExpressionWithTypeArguments).expression === node && !isPartOfTypeNode(parent);
        case SyntaxKind.ShorthandPropertyAssignment:
            return (parent as ShorthandPropertyAssignment).objectAssignmentInitializer === node;
        case SyntaxKind.SatisfiesExpression:
            return node === (parent as SatisfiesExpression).expression;
        default:
            return isExpressionNode(parent);
    }
}

/** @internal */
export function isPartOfTypeQuery(node: Node) {
    while (node.kind === SyntaxKind.QualifiedName || node.kind === SyntaxKind.Identifier) {
        node = node.parent;
    }
    return node.kind === SyntaxKind.TypeQuery;
}

/** @internal */
export function isNamespaceReexportDeclaration(node: Node): boolean {
    return isNamespaceExport(node) && !!node.parent.moduleSpecifier;
}

/** @internal */
export function isExternalModuleImportEqualsDeclaration(node: Node): node is ImportEqualsDeclaration & { moduleReference: ExternalModuleReference; } {
    return node.kind === SyntaxKind.ImportEqualsDeclaration && (node as ImportEqualsDeclaration).moduleReference.kind === SyntaxKind.ExternalModuleReference;
}

/** @internal */
export function getExternalModuleImportEqualsDeclarationExpression(node: Node) {
    Debug.assert(isExternalModuleImportEqualsDeclaration(node));
    return ((node as ImportEqualsDeclaration).moduleReference as ExternalModuleReference).expression;
}

/** @internal */
export function getExternalModuleRequireArgument(node: Node) {
    return isVariableDeclarationInitializedToBareOrAccessedRequire(node) && (getLeftmostAccessExpression(node.initializer) as CallExpression).arguments[0] as StringLiteral;
}

/** @internal */
export function isInternalModuleImportEqualsDeclaration(node: Node): node is ImportEqualsDeclaration {
    return node.kind === SyntaxKind.ImportEqualsDeclaration && (node as ImportEqualsDeclaration).moduleReference.kind !== SyntaxKind.ExternalModuleReference;
}

/** @internal */
export function isSourceFileJS(file: SourceFile): boolean {
    return isInJSFile(file);
}

/** @internal */
export function isSourceFileNotJS(file: SourceFile): boolean {
    return !isInJSFile(file);
}

/** @internal */
export function isInJSFile(node: Node | undefined): boolean {
    return !!node && !!(node.flags & NodeFlags.JavaScriptFile);
}

/** @internal */
export function isInJsonFile(node: Node | undefined): boolean {
    return !!node && !!(node.flags & NodeFlags.JsonFile);
}

/** @internal */
export function isSourceFileNotJson(file: SourceFile) {
    return !isJsonSourceFile(file);
}

/** @internal */
export function isInJSDoc(node: Node | undefined): boolean {
    return !!node && !!(node.flags & NodeFlags.JSDoc);
}

/** @internal */
export function isJSDocIndexSignature(node: TypeReferenceNode | ExpressionWithTypeArguments) {
    return isTypeReferenceNode(node) &&
        isIdentifier(node.typeName) &&
        node.typeName.escapedText === "Object" &&
        node.typeArguments && node.typeArguments.length === 2 &&
        (node.typeArguments[0].kind === SyntaxKind.StringKeyword || node.typeArguments[0].kind === SyntaxKind.NumberKeyword);
}

/**
 * Returns true if the node is a CallExpression to the identifier 'require' with
 * exactly one argument (of the form 'require("name")').
 * This function does not test if the node is in a JavaScript file or not.
 *
 * @internal
 */
export function isRequireCall(callExpression: Node, requireStringLiteralLikeArgument: true): callExpression is RequireOrImportCall & { expression: Identifier; arguments: [StringLiteralLike]; };
/** @internal */
export function isRequireCall(callExpression: Node, requireStringLiteralLikeArgument: boolean): callExpression is CallExpression;
/** @internal */
export function isRequireCall(callExpression: Node, requireStringLiteralLikeArgument: boolean): callExpression is CallExpression {
    if (callExpression.kind !== SyntaxKind.CallExpression) {
        return false;
    }
    const { expression, arguments: args } = callExpression as CallExpression;

    if (expression.kind !== SyntaxKind.Identifier || (expression as Identifier).escapedText !== "require") {
        return false;
    }

    if (args.length !== 1) {
        return false;
    }
    const arg = args[0];
    return !requireStringLiteralLikeArgument || isStringLiteralLike(arg);
}

/**
 * Returns true if the node is a VariableDeclaration initialized to a require call (see `isRequireCall`).
 * This function does not test if the node is in a JavaScript file or not.
 *
 * @internal
 */
export function isVariableDeclarationInitializedToRequire(node: Node): node is VariableDeclarationInitializedTo<RequireOrImportCall> {
    return isVariableDeclarationInitializedWithRequireHelper(node, /*allowAccessedRequire*/ false);
}

/**
 * Like {@link isVariableDeclarationInitializedToRequire} but allows things like `require("...").foo.bar` or `require("...")["baz"]`.
 *
 * @internal
 */
export function isVariableDeclarationInitializedToBareOrAccessedRequire(node: Node): node is VariableDeclarationInitializedTo<RequireOrImportCall | AccessExpression> {
    return isVariableDeclarationInitializedWithRequireHelper(node, /*allowAccessedRequire*/ true);
}

/** @internal */
export function isBindingElementOfBareOrAccessedRequire(node: Node): node is BindingElementOfBareOrAccessedRequire {
    return isBindingElement(node) && isVariableDeclarationInitializedToBareOrAccessedRequire(node.parent.parent);
}

function isVariableDeclarationInitializedWithRequireHelper(node: Node, allowAccessedRequire: boolean) {
    return isVariableDeclaration(node) &&
        !!node.initializer &&
        isRequireCall(allowAccessedRequire ? getLeftmostAccessExpression(node.initializer) : node.initializer, /*requireStringLiteralLikeArgument*/ true);
}

/** @internal */
export function isRequireVariableStatement(node: Node): node is RequireVariableStatement {
    return isVariableStatement(node)
        && node.declarationList.declarations.length > 0
        && every(node.declarationList.declarations, decl => isVariableDeclarationInitializedToRequire(decl));
}

/** @internal */
export function isSingleOrDoubleQuote(charCode: number) {
    return charCode === CharacterCodes.singleQuote || charCode === CharacterCodes.doubleQuote;
}

/** @internal */
export function isStringDoubleQuoted(str: StringLiteralLike, sourceFile: SourceFile): boolean {
    return getSourceTextOfNodeFromSourceFile(sourceFile, str).charCodeAt(0) === CharacterCodes.doubleQuote;
}

/** @internal */
export function isAssignmentDeclaration(decl: Declaration) {
    return isBinaryExpression(decl) || isAccessExpression(decl) || isIdentifier(decl) || isCallExpression(decl);
}

/**
 * Get the initializer, taking into account defaulted Javascript initializers
 *
 * @internal
 */
export function getEffectiveInitializer(node: HasExpressionInitializer) {
    if (
        isInJSFile(node) && node.initializer &&
        isBinaryExpression(node.initializer) &&
        (node.initializer.operatorToken.kind === SyntaxKind.BarBarToken || node.initializer.operatorToken.kind === SyntaxKind.QuestionQuestionToken) &&
        node.name && isEntityNameExpression(node.name) && isSameEntityName(node.name, node.initializer.left)
    ) {
        return node.initializer.right;
    }
    return node.initializer;
}

/**
 * Get the declaration initializer when it is container-like (See getExpandoInitializer).
 *
 * @internal
 */
export function getDeclaredExpandoInitializer(node: HasExpressionInitializer) {
    const init = getEffectiveInitializer(node);
    return init && getExpandoInitializer(init, isPrototypeAccess(node.name));
}

function hasExpandoValueProperty(node: ObjectLiteralExpression, isPrototypeAssignment: boolean) {
    return forEach(node.properties, p =>
        isPropertyAssignment(p) &&
        isIdentifier(p.name) &&
        p.name.escapedText === "value" &&
        p.initializer &&
        getExpandoInitializer(p.initializer, isPrototypeAssignment));
}

/**
 * Get the assignment 'initializer' -- the righthand side-- when the initializer is container-like (See getExpandoInitializer).
 * We treat the right hand side of assignments with container-like initializers as declarations.
 *
 * @internal
 */
export function getAssignedExpandoInitializer(node: Node | undefined): Expression | undefined {
    if (node && node.parent && isBinaryExpression(node.parent) && node.parent.operatorToken.kind === SyntaxKind.EqualsToken) {
        const isPrototypeAssignment = isPrototypeAccess(node.parent.left);
        return getExpandoInitializer(node.parent.right, isPrototypeAssignment) ||
            getDefaultedExpandoInitializer(node.parent.left, node.parent.right, isPrototypeAssignment);
    }
    if (node && isCallExpression(node) && isBindableObjectDefinePropertyCall(node)) {
        const result = hasExpandoValueProperty(node.arguments[2], node.arguments[1].text === "prototype");
        if (result) {
            return result;
        }
    }
}

/**
 * Recognized expando initializers are:
 * 1. (function() {})() -- IIFEs
 * 2. function() { } -- Function expressions
 * 3. class { } -- Class expressions
 * 4. {} -- Empty object literals
 * 5. { ... } -- Non-empty object literals, when used to initialize a prototype, like `C.prototype = { m() { } }`
 *
 * This function returns the provided initializer, or undefined if it is not valid.
 *
 * @internal
 */
export function getExpandoInitializer(initializer: Node, isPrototypeAssignment: boolean): Expression | undefined {
    if (isCallExpression(initializer)) {
        const e = skipParentheses(initializer.expression);
        return e.kind === SyntaxKind.FunctionExpression || e.kind === SyntaxKind.ArrowFunction ? initializer : undefined;
    }
    if (
        initializer.kind === SyntaxKind.FunctionExpression ||
        initializer.kind === SyntaxKind.ClassExpression ||
        initializer.kind === SyntaxKind.ArrowFunction
    ) {
        return initializer as Expression;
    }
    if (isObjectLiteralExpression(initializer) && (initializer.properties.length === 0 || isPrototypeAssignment)) {
        return initializer;
    }
}

/**
 * A defaulted expando initializer matches the pattern
 * `Lhs = Lhs || ExpandoInitializer`
 * or `var Lhs = Lhs || ExpandoInitializer`
 *
 * The second Lhs is required to be the same as the first except that it may be prefixed with
 * 'window.', 'global.' or 'self.' The second Lhs is otherwise ignored by the binder and checker.
 */
function getDefaultedExpandoInitializer(name: Expression, initializer: Expression, isPrototypeAssignment: boolean) {
    const e = isBinaryExpression(initializer)
        && (initializer.operatorToken.kind === SyntaxKind.BarBarToken || initializer.operatorToken.kind === SyntaxKind.QuestionQuestionToken)
        && getExpandoInitializer(initializer.right, isPrototypeAssignment);
    if (e && isSameEntityName(name, initializer.left)) {
        return e;
    }
}

/** @internal */
export function isDefaultedExpandoInitializer(node: BinaryExpression) {
    const name = isVariableDeclaration(node.parent) ? node.parent.name :
        isBinaryExpression(node.parent) && node.parent.operatorToken.kind === SyntaxKind.EqualsToken ? node.parent.left :
        undefined;
    return name && getExpandoInitializer(node.right, isPrototypeAccess(name)) && isEntityNameExpression(name) && isSameEntityName(name, node.left);
}

/**
 * Given an expando initializer, return its declaration name, or the left-hand side of the assignment if it's part of an assignment declaration.
 *
 * @internal
 */
export function getNameOfExpando(node: Declaration): DeclarationName | undefined {
    if (isBinaryExpression(node.parent)) {
        const parent = ((node.parent.operatorToken.kind === SyntaxKind.BarBarToken || node.parent.operatorToken.kind === SyntaxKind.QuestionQuestionToken) && isBinaryExpression(node.parent.parent)) ? node.parent.parent : node.parent;
        if (parent.operatorToken.kind === SyntaxKind.EqualsToken && isIdentifier(parent.left)) {
            return parent.left;
        }
    }
    else if (isVariableDeclaration(node.parent)) {
        return node.parent.name;
    }
}

/**
 * Is the 'declared' name the same as the one in the initializer?
 * @return true for identical entity names, as well as ones where the initializer is prefixed with
 * 'window', 'self' or 'global'. For example:
 *
 * var my = my || {}
 * var min = window.min || {}
 * my.app = self.my.app || class { }
 *
 * @internal
 */
export function isSameEntityName(name: Expression, initializer: Expression): boolean {
    if (isPropertyNameLiteral(name) && isPropertyNameLiteral(initializer)) {
        return getTextOfIdentifierOrLiteral(name) === getTextOfIdentifierOrLiteral(initializer);
    }
    if (
        isMemberName(name) && isLiteralLikeAccess(initializer) &&
        (initializer.expression.kind === SyntaxKind.ThisKeyword ||
            isIdentifier(initializer.expression) &&
                (initializer.expression.escapedText === "window" ||
                    initializer.expression.escapedText === "self" ||
                    initializer.expression.escapedText === "global"))
    ) {
        return isSameEntityName(name, getNameOrArgument(initializer));
    }
    if (isLiteralLikeAccess(name) && isLiteralLikeAccess(initializer)) {
        return getElementOrPropertyAccessName(name) === getElementOrPropertyAccessName(initializer)
            && isSameEntityName(name.expression, initializer.expression);
    }
    return false;
}

/** @internal */
export function getRightMostAssignedExpression(node: Expression): Expression {
    while (isAssignmentExpression(node, /*excludeCompoundAssignment*/ true)) {
        node = node.right;
    }
    return node;
}

/** @internal */
export function isExportsIdentifier(node: Node) {
    return isIdentifier(node) && node.escapedText === "exports";
}

/** @internal */
export function isModuleIdentifier(node: Node) {
    return isIdentifier(node) && node.escapedText === "module";
}

/** @internal */
export function isModuleExportsAccessExpression(node: Node): node is LiteralLikeElementAccessExpression & { expression: Identifier; } {
    return (isPropertyAccessExpression(node) || isLiteralLikeElementAccess(node))
        && isModuleIdentifier(node.expression)
        && getElementOrPropertyAccessName(node) === "exports";
}

/// Given a BinaryExpression, returns SpecialPropertyAssignmentKind for the various kinds of property
/// assignments we treat as special in the binder
/** @internal */
export function getAssignmentDeclarationKind(expr: BinaryExpression | CallExpression): AssignmentDeclarationKind {
    const special = getAssignmentDeclarationKindWorker(expr);
    return special === AssignmentDeclarationKind.Property || isInJSFile(expr) ? special : AssignmentDeclarationKind.None;
}

/** @internal */
export function isBindableObjectDefinePropertyCall(expr: CallExpression): expr is BindableObjectDefinePropertyCall {
    return length(expr.arguments) === 3 &&
        isPropertyAccessExpression(expr.expression) &&
        isIdentifier(expr.expression.expression) &&
        idText(expr.expression.expression) === "Object" &&
        idText(expr.expression.name) === "defineProperty" &&
        isStringOrNumericLiteralLike(expr.arguments[1]) &&
        isBindableStaticNameExpression(expr.arguments[0], /*excludeThisKeyword*/ true);
}

/**
 * x.y OR x[0]
 *
 * @internal
 */
export function isLiteralLikeAccess(node: Node): node is LiteralLikeElementAccessExpression | PropertyAccessExpression {
    return isPropertyAccessExpression(node) || isLiteralLikeElementAccess(node);
}

/**
 * x[0] OR x['a'] OR x[Symbol.y]
 *
 * @internal
 */
export function isLiteralLikeElementAccess(node: Node): node is LiteralLikeElementAccessExpression {
    return isElementAccessExpression(node) && isStringOrNumericLiteralLike(node.argumentExpression);
}

/**
 * Any series of property and element accesses.
 *
 * @internal
 */
export function isBindableStaticAccessExpression(node: Node, excludeThisKeyword?: boolean): node is BindableStaticAccessExpression {
    return isPropertyAccessExpression(node) && (!excludeThisKeyword && node.expression.kind === SyntaxKind.ThisKeyword || isIdentifier(node.name) && isBindableStaticNameExpression(node.expression, /*excludeThisKeyword*/ true))
        || isBindableStaticElementAccessExpression(node, excludeThisKeyword);
}

/**
 * Any series of property and element accesses, ending in a literal element access
 *
 * @internal
 */
export function isBindableStaticElementAccessExpression(node: Node, excludeThisKeyword?: boolean): node is BindableStaticElementAccessExpression {
    return isLiteralLikeElementAccess(node)
        && ((!excludeThisKeyword && node.expression.kind === SyntaxKind.ThisKeyword) ||
            isEntityNameExpression(node.expression) ||
            isBindableStaticAccessExpression(node.expression, /*excludeThisKeyword*/ true));
}

/** @internal */
export function isBindableStaticNameExpression(node: Node, excludeThisKeyword?: boolean): node is BindableStaticNameExpression {
    return isEntityNameExpression(node) || isBindableStaticAccessExpression(node, excludeThisKeyword);
}

/** @internal */
export function getNameOrArgument(expr: PropertyAccessExpression | LiteralLikeElementAccessExpression) {
    if (isPropertyAccessExpression(expr)) {
        return expr.name;
    }
    return expr.argumentExpression;
}

function getAssignmentDeclarationKindWorker(expr: BinaryExpression | CallExpression): AssignmentDeclarationKind {
    if (isCallExpression(expr)) {
        if (!isBindableObjectDefinePropertyCall(expr)) {
            return AssignmentDeclarationKind.None;
        }
        const entityName = expr.arguments[0];
        if (isExportsIdentifier(entityName) || isModuleExportsAccessExpression(entityName)) {
            return AssignmentDeclarationKind.ObjectDefinePropertyExports;
        }
        if (isBindableStaticAccessExpression(entityName) && getElementOrPropertyAccessName(entityName) === "prototype") {
            return AssignmentDeclarationKind.ObjectDefinePrototypeProperty;
        }
        return AssignmentDeclarationKind.ObjectDefinePropertyValue;
    }
    if (expr.operatorToken.kind !== SyntaxKind.EqualsToken || !isAccessExpression(expr.left) || isVoidZero(getRightMostAssignedExpression(expr))) {
        return AssignmentDeclarationKind.None;
    }
    if (isBindableStaticNameExpression(expr.left.expression, /*excludeThisKeyword*/ true) && getElementOrPropertyAccessName(expr.left) === "prototype" && isObjectLiteralExpression(getInitializerOfBinaryExpression(expr))) {
        // F.prototype = { ... }
        return AssignmentDeclarationKind.Prototype;
    }
    return getAssignmentDeclarationPropertyAccessKind(expr.left);
}

function isVoidZero(node: Node) {
    return isVoidExpression(node) && isNumericLiteral(node.expression) && node.expression.text === "0";
}

/**
 * Does not handle signed numeric names like `a[+0]` - handling those would require handling prefix unary expressions
 * throughout late binding handling as well, which is awkward (but ultimately probably doable if there is demand)
 *
 * @internal
 */
export function getElementOrPropertyAccessArgumentExpressionOrName(node: AccessExpression): Identifier | PrivateIdentifier | StringLiteralLike | NumericLiteral | ElementAccessExpression | undefined {
    if (isPropertyAccessExpression(node)) {
        return node.name;
    }
    const arg = skipParentheses(node.argumentExpression);
    if (isNumericLiteral(arg) || isStringLiteralLike(arg)) {
        return arg;
    }
    return node;
}

/** @internal */
export function getElementOrPropertyAccessName(node: LiteralLikeElementAccessExpression | PropertyAccessExpression): __String;
/** @internal */
export function getElementOrPropertyAccessName(node: AccessExpression): __String | undefined;
/** @internal */
export function getElementOrPropertyAccessName(node: AccessExpression): __String | undefined {
    const name = getElementOrPropertyAccessArgumentExpressionOrName(node);
    if (name) {
        if (isIdentifier(name)) {
            return name.escapedText;
        }
        if (isStringLiteralLike(name) || isNumericLiteral(name)) {
            return escapeLeadingUnderscores(name.text);
        }
    }
    return undefined;
}

/** @internal */
export function getAssignmentDeclarationPropertyAccessKind(lhs: AccessExpression): AssignmentDeclarationKind {
    if (lhs.expression.kind === SyntaxKind.ThisKeyword) {
        return AssignmentDeclarationKind.ThisProperty;
    }
    else if (isModuleExportsAccessExpression(lhs)) {
        // module.exports = expr
        return AssignmentDeclarationKind.ModuleExports;
    }
    else if (isBindableStaticNameExpression(lhs.expression, /*excludeThisKeyword*/ true)) {
        if (isPrototypeAccess(lhs.expression)) {
            // F.G....prototype.x = expr
            return AssignmentDeclarationKind.PrototypeProperty;
        }

        let nextToLast = lhs;
        while (!isIdentifier(nextToLast.expression)) {
            nextToLast = nextToLast.expression as Exclude<BindableStaticNameExpression, Identifier>;
        }
        const id = nextToLast.expression;
        if (
            (id.escapedText === "exports" ||
                id.escapedText === "module" && getElementOrPropertyAccessName(nextToLast) === "exports") &&
            // ExportsProperty does not support binding with computed names
            isBindableStaticAccessExpression(lhs)
        ) {
            // exports.name = expr OR module.exports.name = expr OR exports["name"] = expr ...
            return AssignmentDeclarationKind.ExportsProperty;
        }
        if (isBindableStaticNameExpression(lhs, /*excludeThisKeyword*/ true) || (isElementAccessExpression(lhs) && isDynamicName(lhs))) {
            // F.G...x = expr
            return AssignmentDeclarationKind.Property;
        }
    }

    return AssignmentDeclarationKind.None;
}

/** @internal */
export function getInitializerOfBinaryExpression(expr: BinaryExpression) {
    while (isBinaryExpression(expr.right)) {
        expr = expr.right;
    }
    return expr.right;
}

/** @internal */
export interface PrototypePropertyAssignment extends AssignmentExpression<EqualsToken> {
    _prototypePropertyAssignmentBrand: any;
    readonly left: AccessExpression;
}

/** @internal */
export function isPrototypePropertyAssignment(node: Node): node is PrototypePropertyAssignment {
    return isBinaryExpression(node) && getAssignmentDeclarationKind(node) === AssignmentDeclarationKind.PrototypeProperty;
}

/** @internal */
export function isSpecialPropertyDeclaration(expr: PropertyAccessExpression | ElementAccessExpression): expr is PropertyAccessExpression | LiteralLikeElementAccessExpression {
    return isInJSFile(expr) &&
        expr.parent && expr.parent.kind === SyntaxKind.ExpressionStatement &&
        (!isElementAccessExpression(expr) || isLiteralLikeElementAccess(expr)) &&
        !!getJSDocTypeTag(expr.parent);
}

/** @internal */
export function setValueDeclaration(symbol: Symbol, node: Declaration): void {
    const { valueDeclaration } = symbol;
    if (
        !valueDeclaration ||
        !(node.flags & NodeFlags.Ambient && !isInJSFile(node) && !(valueDeclaration.flags & NodeFlags.Ambient)) &&
            (isAssignmentDeclaration(valueDeclaration) && !isAssignmentDeclaration(node)) ||
        (valueDeclaration.kind !== node.kind && isEffectiveModuleDeclaration(valueDeclaration))
    ) {
        // other kinds of value declarations take precedence over modules and assignment declarations
        symbol.valueDeclaration = node;
    }
}

/** @internal */
export function isFunctionSymbol(symbol: Symbol | undefined) {
    if (!symbol || !symbol.valueDeclaration) {
        return false;
    }
    const decl = symbol.valueDeclaration;
    return decl.kind === SyntaxKind.FunctionDeclaration || isVariableDeclaration(decl) && decl.initializer && isFunctionLike(decl.initializer);
}

/** @internal */
export function tryGetModuleSpecifierFromDeclaration(node: AnyImportOrBareOrAccessedRequire | AliasDeclarationNode | ExportDeclaration | ImportTypeNode): StringLiteralLike | undefined {
    switch (node.kind) {
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.BindingElement:
            return findAncestor(node.initializer, (node): node is RequireOrImportCall => isRequireCall(node, /*requireStringLiteralLikeArgument*/ true))?.arguments[0];
        case SyntaxKind.ImportDeclaration:
        case SyntaxKind.ExportDeclaration:
            return tryCast(node.moduleSpecifier, isStringLiteralLike);
        case SyntaxKind.ImportEqualsDeclaration:
            return tryCast(tryCast(node.moduleReference, isExternalModuleReference)?.expression, isStringLiteralLike);
        case SyntaxKind.ImportClause:
        case SyntaxKind.NamespaceExport:
            return tryCast(node.parent.moduleSpecifier, isStringLiteralLike);
        case SyntaxKind.NamespaceImport:
        case SyntaxKind.ExportSpecifier:
            return tryCast(node.parent.parent.moduleSpecifier, isStringLiteralLike);
        case SyntaxKind.ImportSpecifier:
            return tryCast(node.parent.parent.parent.moduleSpecifier, isStringLiteralLike);
        case SyntaxKind.ImportType:
            return isLiteralImportTypeNode(node) ? node.argument.literal : undefined;
        default:
            Debug.assertNever(node);
    }
}

/** @internal */
export function importFromModuleSpecifier(node: StringLiteralLike): AnyValidImportOrReExport {
    return tryGetImportFromModuleSpecifier(node) || Debug.failBadSyntaxKind(node.parent);
}

/** @internal */
export function tryGetImportFromModuleSpecifier(node: StringLiteralLike): AnyValidImportOrReExport | undefined {
    switch (node.parent.kind) {
        case SyntaxKind.ImportDeclaration:
        case SyntaxKind.ExportDeclaration:
            return node.parent as AnyValidImportOrReExport;
        case SyntaxKind.ExternalModuleReference:
            return (node.parent as ExternalModuleReference).parent as AnyValidImportOrReExport;
        case SyntaxKind.CallExpression:
            return isImportCall(node.parent) || isRequireCall(node.parent, /*requireStringLiteralLikeArgument*/ false) ? node.parent as RequireOrImportCall : undefined;
        case SyntaxKind.LiteralType:
            Debug.assert(isStringLiteral(node));
            return tryCast(node.parent.parent, isImportTypeNode) as ValidImportTypeNode | undefined;
        default:
            return undefined;
    }
}

/** @internal */
export function getExternalModuleName(node: AnyImportOrReExport | ImportTypeNode | ImportCall | ModuleDeclaration): Expression | undefined {
    switch (node.kind) {
        case SyntaxKind.ImportDeclaration:
        case SyntaxKind.ExportDeclaration:
            return node.moduleSpecifier;
        case SyntaxKind.ImportEqualsDeclaration:
            return node.moduleReference.kind === SyntaxKind.ExternalModuleReference ? node.moduleReference.expression : undefined;
        case SyntaxKind.ImportType:
            return isLiteralImportTypeNode(node) ? node.argument.literal : undefined;
        case SyntaxKind.CallExpression:
            return node.arguments[0];
        case SyntaxKind.ModuleDeclaration:
            return node.name.kind === SyntaxKind.StringLiteral ? node.name : undefined;
        default:
            return Debug.assertNever(node);
    }
}

/** @internal */
export function getNamespaceDeclarationNode(node: ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration): ImportEqualsDeclaration | NamespaceImport | NamespaceExport | undefined {
    switch (node.kind) {
        case SyntaxKind.ImportDeclaration:
            return node.importClause && tryCast(node.importClause.namedBindings, isNamespaceImport);
        case SyntaxKind.ImportEqualsDeclaration:
            return node;
        case SyntaxKind.ExportDeclaration:
            return node.exportClause && tryCast(node.exportClause, isNamespaceExport);
        default:
            return Debug.assertNever(node);
    }
}

/** @internal */
export function isDefaultImport(node: ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration): boolean {
    return node.kind === SyntaxKind.ImportDeclaration && !!node.importClause && !!node.importClause.name;
}

/** @internal */
export function forEachImportClauseDeclaration<T>(node: ImportClause, action: (declaration: ImportClause | NamespaceImport | ImportSpecifier) => T | undefined): T | undefined {
    if (node.name) {
        const result = action(node);
        if (result) return result;
    }
    if (node.namedBindings) {
        const result = isNamespaceImport(node.namedBindings)
            ? action(node.namedBindings)
            : forEach(node.namedBindings.elements, action);
        if (result) return result;
    }
}

/** @internal */
export function hasQuestionToken(node: Node) {
    if (node) {
        switch (node.kind) {
            case SyntaxKind.Parameter:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.ShorthandPropertyAssignment:
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
                return (node as ParameterDeclaration | MethodDeclaration | PropertyDeclaration).questionToken !== undefined;
        }
    }

    return false;
}

/** @internal */
export function isJSDocConstructSignature(node: Node) {
    const param = isJSDocFunctionType(node) ? firstOrUndefined(node.parameters) : undefined;
    const name = tryCast(param && param.name, isIdentifier);
    return !!name && name.escapedText === "new";
}

/** @internal */
export function isJSDocTypeAlias(node: Node): node is JSDocTypedefTag | JSDocCallbackTag | JSDocEnumTag {
    return node.kind === SyntaxKind.JSDocTypedefTag || node.kind === SyntaxKind.JSDocCallbackTag || node.kind === SyntaxKind.JSDocEnumTag;
}

/** @internal */
export function isTypeAlias(node: Node): node is JSDocTypedefTag | JSDocCallbackTag | JSDocEnumTag | TypeAliasDeclaration {
    return isJSDocTypeAlias(node) || isTypeAliasDeclaration(node);
}

function getSourceOfAssignment(node: Node): Node | undefined {
    return isExpressionStatement(node) &&
            isBinaryExpression(node.expression) &&
            node.expression.operatorToken.kind === SyntaxKind.EqualsToken
        ? getRightMostAssignedExpression(node.expression)
        : undefined;
}

function getSourceOfDefaultedAssignment(node: Node): Node | undefined {
    return isExpressionStatement(node) &&
            isBinaryExpression(node.expression) &&
            getAssignmentDeclarationKind(node.expression) !== AssignmentDeclarationKind.None &&
            isBinaryExpression(node.expression.right) &&
            (node.expression.right.operatorToken.kind === SyntaxKind.BarBarToken || node.expression.right.operatorToken.kind === SyntaxKind.QuestionQuestionToken)
        ? node.expression.right.right
        : undefined;
}

/** @internal */
export function getSingleInitializerOfVariableStatementOrPropertyDeclaration(node: Node): Expression | undefined {
    switch (node.kind) {
        case SyntaxKind.VariableStatement:
            const v = getSingleVariableOfVariableStatement(node);
            return v && v.initializer;
        case SyntaxKind.PropertyDeclaration:
            return (node as PropertyDeclaration).initializer;
        case SyntaxKind.PropertyAssignment:
            return (node as PropertyAssignment).initializer;
    }
}

/** @internal */
export function getSingleVariableOfVariableStatement(node: Node): VariableDeclaration | undefined {
    return isVariableStatement(node) ? firstOrUndefined(node.declarationList.declarations) : undefined;
}

function getNestedModuleDeclaration(node: Node): Node | undefined {
    return isModuleDeclaration(node) &&
            node.body &&
            node.body.kind === SyntaxKind.ModuleDeclaration
        ? node.body
        : undefined;
}

/** @internal */
export function canHaveFlowNode(node: Node): node is HasFlowNode {
    if (node.kind >= SyntaxKind.FirstStatement && node.kind <= SyntaxKind.LastStatement) {
        return true;
    }

    switch (node.kind) {
        case SyntaxKind.Identifier:
        case SyntaxKind.ThisKeyword:
        case SyntaxKind.SuperKeyword:
        case SyntaxKind.QualifiedName:
        case SyntaxKind.MetaProperty:
        case SyntaxKind.ElementAccessExpression:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.BindingElement:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
            return true;
        default:
            return false;
    }
}

/** @internal */
export function canHaveJSDoc(node: Node): node is HasJSDoc {
    switch (node.kind) {
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.BinaryExpression:
        case SyntaxKind.Block:
        case SyntaxKind.BreakStatement:
        case SyntaxKind.CallSignature:
        case SyntaxKind.CaseClause:
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.ClassExpression:
        case SyntaxKind.ClassStaticBlockDeclaration:
        case SyntaxKind.Constructor:
        case SyntaxKind.ConstructorType:
        case SyntaxKind.ConstructSignature:
        case SyntaxKind.ContinueStatement:
        case SyntaxKind.DebuggerStatement:
        case SyntaxKind.DoStatement:
        case SyntaxKind.ElementAccessExpression:
        case SyntaxKind.EmptyStatement:
        case SyntaxKind.EndOfFileToken:
        case SyntaxKind.EnumDeclaration:
        case SyntaxKind.EnumMember:
        case SyntaxKind.ExportAssignment:
        case SyntaxKind.ExportDeclaration:
        case SyntaxKind.ExportSpecifier:
        case SyntaxKind.ExpressionStatement:
        case SyntaxKind.ForInStatement:
        case SyntaxKind.ForOfStatement:
        case SyntaxKind.ForStatement:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.FunctionType:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.Identifier:
        case SyntaxKind.IfStatement:
        case SyntaxKind.ImportDeclaration:
        case SyntaxKind.ImportEqualsDeclaration:
        case SyntaxKind.IndexSignature:
        case SyntaxKind.InterfaceDeclaration:
        case SyntaxKind.JSDocFunctionType:
        case SyntaxKind.JSDocSignature:
        case SyntaxKind.LabeledStatement:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.MethodSignature:
        case SyntaxKind.ModuleDeclaration:
        case SyntaxKind.NamedTupleMember:
        case SyntaxKind.NamespaceExportDeclaration:
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.Parameter:
        case SyntaxKind.ParenthesizedExpression:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.PropertyAssignment:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertySignature:
        case SyntaxKind.ReturnStatement:
        case SyntaxKind.SemicolonClassElement:
        case SyntaxKind.SetAccessor:
        case SyntaxKind.ShorthandPropertyAssignment:
        case SyntaxKind.SpreadAssignment:
        case SyntaxKind.SwitchStatement:
        case SyntaxKind.ThrowStatement:
        case SyntaxKind.TryStatement:
        case SyntaxKind.TypeAliasDeclaration:
        case SyntaxKind.TypeParameter:
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.VariableStatement:
        case SyntaxKind.WhileStatement:
        case SyntaxKind.WithStatement:
            return true;
        default:
            return false;
    }
}

/**
 * This function checks multiple locations for JSDoc comments that apply to a host node.
 * At each location, the whole comment may apply to the node, or only a specific tag in
 * the comment. In the first case, location adds the entire {@link JSDoc} object. In the
 * second case, it adds the applicable {@link JSDocTag}.
 *
 * For example, a JSDoc comment before a parameter adds the entire {@link JSDoc}. But a
 * `@param` tag on the parent function only adds the {@link JSDocTag} for the `@param`.
 *
 * ```ts
 * /** JSDoc will be returned for `a` *\/
 * const a = 0
 * /**
 *  * Entire JSDoc will be returned for `b`
 *  * @param c JSDocTag will be returned for `c`
 *  *\/
 * function b(/** JSDoc will be returned for `c` *\/ c) {}
 * ```
 */
export function getJSDocCommentsAndTags(hostNode: Node): readonly (JSDoc | JSDocTag)[];
/** @internal separate signature so that stripInternal can remove noCache from the public API */
// eslint-disable-next-line @typescript-eslint/unified-signatures
export function getJSDocCommentsAndTags(hostNode: Node, noCache?: boolean): readonly (JSDoc | JSDocTag)[];
export function getJSDocCommentsAndTags(hostNode: Node, noCache?: boolean): readonly (JSDoc | JSDocTag)[] {
    let result: (JSDoc | JSDocTag)[] | undefined;
    // Pull parameter comments from declaring function as well
    if (isVariableLike(hostNode) && hasInitializer(hostNode) && hasJSDocNodes(hostNode.initializer!)) {
        result = addRange(result, filterOwnedJSDocTags(hostNode, hostNode.initializer.jsDoc!));
    }

    let node: Node | undefined = hostNode;
    while (node && node.parent) {
        if (hasJSDocNodes(node)) {
            result = addRange(result, filterOwnedJSDocTags(hostNode, node.jsDoc!));
        }

        if (node.kind === SyntaxKind.Parameter) {
            result = addRange(result, (noCache ? getJSDocParameterTagsNoCache : getJSDocParameterTags)(node as ParameterDeclaration));
            break;
        }
        if (node.kind === SyntaxKind.TypeParameter) {
            result = addRange(result, (noCache ? getJSDocTypeParameterTagsNoCache : getJSDocTypeParameterTags)(node as TypeParameterDeclaration));
            break;
        }
        node = getNextJSDocCommentLocation(node);
    }
    return result || emptyArray;
}

function filterOwnedJSDocTags(hostNode: Node, comments: JSDocArray) {
    const lastJsDoc = last(comments);
    return flatMap<JSDoc, JSDoc | JSDocTag>(comments, jsDoc => {
        if (jsDoc === lastJsDoc) {
            const ownedTags = filter(jsDoc.tags, tag => ownsJSDocTag(hostNode, tag));
            return jsDoc.tags === ownedTags ? [jsDoc] : ownedTags;
        }
        else {
            return filter(jsDoc.tags, isJSDocOverloadTag);
        }
    });
}

/**
 * Determines whether a host node owns a jsDoc tag. A `@type`/`@satisfies` tag attached to a
 * a ParenthesizedExpression belongs only to the ParenthesizedExpression.
 */
function ownsJSDocTag(hostNode: Node, tag: JSDocTag) {
    return !(isJSDocTypeTag(tag) || isJSDocSatisfiesTag(tag))
        || !tag.parent
        || !isJSDoc(tag.parent)
        || !isParenthesizedExpression(tag.parent.parent)
        || tag.parent.parent === hostNode;
}

/** @internal */
export function getNextJSDocCommentLocation(node: Node) {
    const parent = node.parent;
    if (
        parent.kind === SyntaxKind.PropertyAssignment ||
        parent.kind === SyntaxKind.ExportAssignment ||
        parent.kind === SyntaxKind.PropertyDeclaration ||
        parent.kind === SyntaxKind.ExpressionStatement && node.kind === SyntaxKind.PropertyAccessExpression ||
        parent.kind === SyntaxKind.ReturnStatement ||
        getNestedModuleDeclaration(parent) ||
        isAssignmentExpression(node)
    ) {
        return parent;
    }
    // Try to recognize this pattern when node is initializer of variable declaration and JSDoc comments are on containing variable statement.
    // /**
    //   * @param {number} name
    //   * @returns {number}
    //   */
    // var x = function(name) { return name.length; }
    else if (
        parent.parent &&
        (getSingleVariableOfVariableStatement(parent.parent) === node || isAssignmentExpression(parent))
    ) {
        return parent.parent;
    }
    else if (
        parent.parent && parent.parent.parent &&
        (getSingleVariableOfVariableStatement(parent.parent.parent) ||
            getSingleInitializerOfVariableStatementOrPropertyDeclaration(parent.parent.parent) === node ||
            getSourceOfDefaultedAssignment(parent.parent.parent))
    ) {
        return parent.parent.parent;
    }
}

/**
 * Does the opposite of `getJSDocParameterTags`: given a JSDoc parameter, finds the parameter corresponding to it.
 *
 * @internal
 */
export function getParameterSymbolFromJSDoc(node: JSDocParameterTag): Symbol | undefined {
    if (node.symbol) {
        return node.symbol;
    }
    if (!isIdentifier(node.name)) {
        return undefined;
    }
    const name = node.name.escapedText;
    const decl = getHostSignatureFromJSDoc(node);
    if (!decl) {
        return undefined;
    }
    const parameter = find(decl.parameters, p => p.name.kind === SyntaxKind.Identifier && p.name.escapedText === name);
    return parameter && parameter.symbol;
}

/** @internal */
export function getEffectiveContainerForJSDocTemplateTag(node: JSDocTemplateTag) {
    if (isJSDoc(node.parent) && node.parent.tags) {
        // A @template tag belongs to any @typedef, @callback, or @enum tags in the same comment block, if they exist.
        const typeAlias = find(node.parent.tags, isJSDocTypeAlias);
        if (typeAlias) {
            return typeAlias;
        }
    }
    // otherwise it belongs to the host it annotates
    return getHostSignatureFromJSDoc(node);
}

/** @internal */
export function getJSDocOverloadTags(node: Node): readonly JSDocOverloadTag[] {
    return getAllJSDocTags(node, isJSDocOverloadTag);
}

/** @internal */
export function getHostSignatureFromJSDoc(node: Node): SignatureDeclaration | undefined {
    const host = getEffectiveJSDocHost(node);
    if (host) {
        return isPropertySignature(host) && host.type && isFunctionLike(host.type) ? host.type :
            isFunctionLike(host) ? host : undefined;
    }
    return undefined;
}

/** @internal */
export function getEffectiveJSDocHost(node: Node): Node | undefined {
    const host = getJSDocHost(node);
    if (host) {
        return getSourceOfDefaultedAssignment(host)
            || getSourceOfAssignment(host)
            || getSingleInitializerOfVariableStatementOrPropertyDeclaration(host)
            || getSingleVariableOfVariableStatement(host)
            || getNestedModuleDeclaration(host)
            || host;
    }
}

/**
 * Use getEffectiveJSDocHost if you additionally need to look for jsdoc on parent nodes, like assignments.
 *
 * @internal
 */
export function getJSDocHost(node: Node): HasJSDoc | undefined {
    const jsDoc = getJSDocRoot(node);
    if (!jsDoc) {
        return undefined;
    }

    const host = jsDoc.parent;
    if (host && host.jsDoc && jsDoc === lastOrUndefined(host.jsDoc)) {
        return host;
    }
}

/** @internal */
export function getJSDocRoot(node: Node): JSDoc | undefined {
    return findAncestor(node.parent, isJSDoc);
}

/** @internal */
export function getTypeParameterFromJsDoc(node: TypeParameterDeclaration & { parent: JSDocTemplateTag; }): TypeParameterDeclaration | undefined {
    const name = node.name.escapedText;
    const { typeParameters } = node.parent.parent.parent as SignatureDeclaration | InterfaceDeclaration | ClassDeclaration;
    return typeParameters && find(typeParameters, p => p.name.escapedText === name);
}

/** @internal */
export function hasTypeArguments(node: Node): node is HasTypeArguments {
    return !!(node as HasTypeArguments).typeArguments;
}

/** @internal */
export const enum AssignmentKind {
    None,
    Definite,
    Compound,
}

type AssignmentTarget =
    | BinaryExpression
    | PrefixUnaryExpression
    | PostfixUnaryExpression
    | ForInOrOfStatement;

function getAssignmentTarget(node: Node): AssignmentTarget | undefined {
    let parent = node.parent;
    while (true) {
        switch (parent.kind) {
            case SyntaxKind.BinaryExpression:
                const binaryExpression = parent as BinaryExpression;
                const binaryOperator = binaryExpression.operatorToken.kind;
                return isAssignmentOperator(binaryOperator) && binaryExpression.left === node ? binaryExpression : undefined;
            case SyntaxKind.PrefixUnaryExpression:
            case SyntaxKind.PostfixUnaryExpression:
                const unaryExpression = parent as PrefixUnaryExpression | PostfixUnaryExpression;
                const unaryOperator = unaryExpression.operator;
                return unaryOperator === SyntaxKind.PlusPlusToken || unaryOperator === SyntaxKind.MinusMinusToken ? unaryExpression : undefined;
            case SyntaxKind.ForInStatement:
            case SyntaxKind.ForOfStatement:
                const forInOrOfStatement = parent as ForInOrOfStatement;
                return forInOrOfStatement.initializer === node ? forInOrOfStatement : undefined;
            case SyntaxKind.ParenthesizedExpression:
            case SyntaxKind.ArrayLiteralExpression:
            case SyntaxKind.SpreadElement:
            case SyntaxKind.NonNullExpression:
                node = parent;
                break;
            case SyntaxKind.SpreadAssignment:
                node = parent.parent;
                break;
            case SyntaxKind.ShorthandPropertyAssignment:
                if ((parent as ShorthandPropertyAssignment).name !== node) {
                    return undefined;
                }
                node = parent.parent;
                break;
            case SyntaxKind.PropertyAssignment:
                if ((parent as PropertyAssignment).name === node) {
                    return undefined;
                }
                node = parent.parent;
                break;
            default:
                return undefined;
        }
        parent = node.parent;
    }
}

/** @internal */
export function getAssignmentTargetKind(node: Node): AssignmentKind {
    const target = getAssignmentTarget(node);
    if (!target) {
        return AssignmentKind.None;
    }
    switch (target.kind) {
        case SyntaxKind.BinaryExpression:
            const binaryOperator = target.operatorToken.kind;
            return binaryOperator === SyntaxKind.EqualsToken || isLogicalOrCoalescingAssignmentOperator(binaryOperator) ?
                AssignmentKind.Definite :
                AssignmentKind.Compound;
        case SyntaxKind.PrefixUnaryExpression:
        case SyntaxKind.PostfixUnaryExpression:
            return AssignmentKind.Compound;
        case SyntaxKind.ForInStatement:
        case SyntaxKind.ForOfStatement:
            return AssignmentKind.Definite;
    }
}

// A node is an assignment target if it is on the left hand side of an '=' token, if it is parented by a property
// assignment in an object literal that is an assignment target, or if it is parented by an array literal that is
// an assignment target. Examples include 'a = xxx', '{ p: a } = xxx', '[{ a }] = xxx'.
// (Note that `p` is not a target in the above examples, only `a`.)
/** @internal */
export function isAssignmentTarget(node: Node): boolean {
    return !!getAssignmentTarget(node);
}

function isCompoundLikeAssignment(assignment: AssignmentExpression<EqualsToken>): boolean {
    const right = skipParentheses(assignment.right);
    return right.kind === SyntaxKind.BinaryExpression && isShiftOperatorOrHigher((right as BinaryExpression).operatorToken.kind);
}

/** @internal */
export function isInCompoundLikeAssignment(node: Node): boolean {
    const target = getAssignmentTarget(node);
    return !!target && isAssignmentExpression(target, /*excludeCompoundAssignment*/ true) && isCompoundLikeAssignment(target);
}

/** @internal */
export type NodeWithPossibleHoistedDeclaration =
    | Block
    | VariableStatement
    | WithStatement
    | IfStatement
    | SwitchStatement
    | CaseBlock
    | CaseClause
    | DefaultClause
    | LabeledStatement
    | ForStatement
    | ForInOrOfStatement
    | DoStatement
    | WhileStatement
    | TryStatement
    | CatchClause;

/**
 * Indicates whether a node could contain a `var` VariableDeclarationList that contributes to
 * the same `var` declaration scope as the node's parent.
 *
 * @internal
 */
export function isNodeWithPossibleHoistedDeclaration(node: Node): node is NodeWithPossibleHoistedDeclaration {
    switch (node.kind) {
        case SyntaxKind.Block:
        case SyntaxKind.VariableStatement:
        case SyntaxKind.WithStatement:
        case SyntaxKind.IfStatement:
        case SyntaxKind.SwitchStatement:
        case SyntaxKind.CaseBlock:
        case SyntaxKind.CaseClause:
        case SyntaxKind.DefaultClause:
        case SyntaxKind.LabeledStatement:
        case SyntaxKind.ForStatement:
        case SyntaxKind.ForInStatement:
        case SyntaxKind.ForOfStatement:
        case SyntaxKind.DoStatement:
        case SyntaxKind.WhileStatement:
        case SyntaxKind.TryStatement:
        case SyntaxKind.CatchClause:
            return true;
    }
    return false;
}

/** @internal */
export type ValueSignatureDeclaration =
    | FunctionDeclaration
    | MethodDeclaration
    | ConstructorDeclaration
    | AccessorDeclaration
    | FunctionExpression
    | ArrowFunction;

/** @internal */
export function isValueSignatureDeclaration(node: Node): node is ValueSignatureDeclaration {
    return isFunctionExpression(node) || isArrowFunction(node) || isMethodOrAccessor(node) || isFunctionDeclaration(node) || isConstructorDeclaration(node);
}

function walkUp(node: Node, kind: SyntaxKind) {
    while (node && node.kind === kind) {
        node = node.parent;
    }
    return node;
}

/** @internal */
export function walkUpParenthesizedTypes(node: Node) {
    return walkUp(node, SyntaxKind.ParenthesizedType);
}

/** @internal */
export function walkUpParenthesizedExpressions(node: Node) {
    return walkUp(node, SyntaxKind.ParenthesizedExpression);
}

/**
 * Walks up parenthesized types.
 * It returns both the outermost parenthesized type and its parent.
 * If given node is not a parenthesiezd type, undefined is return as the former.
 *
 * @internal
 */
export function walkUpParenthesizedTypesAndGetParentAndChild(node: Node): [ParenthesizedTypeNode | undefined, Node] {
    let child: ParenthesizedTypeNode | undefined;
    while (node && node.kind === SyntaxKind.ParenthesizedType) {
        child = node as ParenthesizedTypeNode;
        node = node.parent;
    }
    return [child, node];
}

/** @internal */
export function skipTypeParentheses(node: TypeNode): TypeNode {
    while (isParenthesizedTypeNode(node)) node = node.type;
    return node;
}

/** @internal */
export function skipParentheses(node: Expression, excludeJSDocTypeAssertions?: boolean): Expression;
/** @internal */
export function skipParentheses(node: Node, excludeJSDocTypeAssertions?: boolean): Node;
/** @internal */
export function skipParentheses(node: Node, excludeJSDocTypeAssertions?: boolean): Node {
    const flags = excludeJSDocTypeAssertions ?
        OuterExpressionKinds.Parentheses | OuterExpressionKinds.ExcludeJSDocTypeAssertion :
        OuterExpressionKinds.Parentheses;
    return skipOuterExpressions(node, flags);
}

// a node is delete target iff. it is PropertyAccessExpression/ElementAccessExpression with parentheses skipped
/** @internal */
export function isDeleteTarget(node: Node): boolean {
    if (node.kind !== SyntaxKind.PropertyAccessExpression && node.kind !== SyntaxKind.ElementAccessExpression) {
        return false;
    }
    node = walkUpParenthesizedExpressions(node.parent);
    return node && node.kind === SyntaxKind.DeleteExpression;
}

/** @internal */
export function isNodeDescendantOf(node: Node, ancestor: Node | undefined): boolean {
    while (node) {
        if (node === ancestor) return true;
        node = node.parent;
    }
    return false;
}

// True if `name` is the name of a declaration node
/** @internal */
export function isDeclarationName(name: Node): boolean {
    return !isSourceFile(name) && !isBindingPattern(name) && isDeclaration(name.parent) && name.parent.name === name;
}

// See GH#16030
/** @internal */
export function getDeclarationFromName(name: Node): Declaration | undefined {
    const parent = name.parent;
    switch (name.kind) {
        case SyntaxKind.StringLiteral:
        case SyntaxKind.NoSubstitutionTemplateLiteral:
        case SyntaxKind.NumericLiteral:
            if (isComputedPropertyName(parent)) return parent.parent;
            // falls through
        case SyntaxKind.Identifier:
            if (isDeclaration(parent)) {
                return parent.name === name ? parent : undefined;
            }
            else if (isQualifiedName(parent)) {
                const tag = parent.parent;
                return isJSDocParameterTag(tag) && tag.name === parent ? tag : undefined;
            }
            else {
                const binExp = parent.parent;
                return isBinaryExpression(binExp) &&
                        getAssignmentDeclarationKind(binExp) !== AssignmentDeclarationKind.None &&
                        ((binExp.left as BindableStaticNameExpression).symbol || binExp.symbol) &&
                        getNameOfDeclaration(binExp) === name
                    ? binExp
                    : undefined;
            }
        case SyntaxKind.PrivateIdentifier:
            return isDeclaration(parent) && parent.name === name ? parent : undefined;
        default:
            return undefined;
    }
}

/** @internal */
export function isLiteralComputedPropertyDeclarationName(node: Node) {
    return isStringOrNumericLiteralLike(node) &&
        node.parent.kind === SyntaxKind.ComputedPropertyName &&
        isDeclaration(node.parent.parent);
}

// Return true if the given identifier is classified as an IdentifierName
/** @internal */
export function isIdentifierName(node: Identifier): boolean {
    const parent = node.parent;
    switch (parent.kind) {
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertySignature:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.MethodSignature:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
        case SyntaxKind.EnumMember:
        case SyntaxKind.PropertyAssignment:
        case SyntaxKind.PropertyAccessExpression:
            // Name in member declaration or property name in property access
            return (parent as NamedDeclaration | PropertyAccessExpression).name === node;
        case SyntaxKind.QualifiedName:
            // Name on right hand side of dot in a type query or type reference
            return (parent as QualifiedName).right === node;
        case SyntaxKind.BindingElement:
        case SyntaxKind.ImportSpecifier:
            // Property name in binding element or import specifier
            return (parent as BindingElement | ImportSpecifier).propertyName === node;
        case SyntaxKind.ExportSpecifier:
        case SyntaxKind.JsxAttribute:
        case SyntaxKind.JsxSelfClosingElement:
        case SyntaxKind.JsxOpeningElement:
        case SyntaxKind.JsxClosingElement:
            // Any name in an export specifier or JSX Attribute or Jsx Element
            return true;
    }
    return false;
}

// An alias symbol is created by one of the following declarations:
// import <symbol> = ...
// import <symbol> from ...
// import * as <symbol> from ...
// import { x as <symbol> } from ...
// export { x as <symbol> } from ...
// export * as ns <symbol> from ...
// export = <EntityNameExpression>
// export default <EntityNameExpression>
// module.exports = <EntityNameExpression>
// module.exports.x = <EntityNameExpression>
// const x = require("...")
// const { x } = require("...")
// const x = require("...").y
// const { x } = require("...").y
/** @internal */
export function isAliasSymbolDeclaration(node: Node): boolean {
    if (
        node.kind === SyntaxKind.ImportEqualsDeclaration ||
        node.kind === SyntaxKind.NamespaceExportDeclaration ||
        node.kind === SyntaxKind.ImportClause && !!(node as ImportClause).name ||
        node.kind === SyntaxKind.NamespaceImport ||
        node.kind === SyntaxKind.NamespaceExport ||
        node.kind === SyntaxKind.ImportSpecifier ||
        node.kind === SyntaxKind.ExportSpecifier ||
        node.kind === SyntaxKind.ExportAssignment && exportAssignmentIsAlias(node as ExportAssignment)
    ) {
        return true;
    }

    return isInJSFile(node) && (
        isBinaryExpression(node) && getAssignmentDeclarationKind(node) === AssignmentDeclarationKind.ModuleExports && exportAssignmentIsAlias(node) ||
        isPropertyAccessExpression(node)
            && isBinaryExpression(node.parent)
            && node.parent.left === node
            && node.parent.operatorToken.kind === SyntaxKind.EqualsToken
            && isAliasableExpression(node.parent.right)
    );
}

/** @internal */
export function getAliasDeclarationFromName(node: EntityName): Declaration | undefined {
    switch (node.parent.kind) {
        case SyntaxKind.ImportClause:
        case SyntaxKind.ImportSpecifier:
        case SyntaxKind.NamespaceImport:
        case SyntaxKind.ExportSpecifier:
        case SyntaxKind.ExportAssignment:
        case SyntaxKind.ImportEqualsDeclaration:
        case SyntaxKind.NamespaceExport:
            return node.parent as Declaration;
        case SyntaxKind.QualifiedName:
            do {
                node = node.parent as QualifiedName;
            }
            while (node.parent.kind === SyntaxKind.QualifiedName);
            return getAliasDeclarationFromName(node);
    }
}

/** @internal */
export function isAliasableExpression(e: Expression) {
    return isEntityNameExpression(e) || isClassExpression(e);
}

/** @internal */
export function exportAssignmentIsAlias(node: ExportAssignment | BinaryExpression): boolean {
    const e = getExportAssignmentExpression(node);
    return isAliasableExpression(e);
}

/** @internal */
export function getExportAssignmentExpression(node: ExportAssignment | BinaryExpression): Expression {
    return isExportAssignment(node) ? node.expression : node.right;
}

/** @internal */
export function getPropertyAssignmentAliasLikeExpression(node: PropertyAssignment | ShorthandPropertyAssignment | PropertyAccessExpression): Expression {
    return node.kind === SyntaxKind.ShorthandPropertyAssignment ? node.name : node.kind === SyntaxKind.PropertyAssignment ? node.initializer :
        (node.parent as BinaryExpression).right;
}

/** @internal */
export function getEffectiveBaseTypeNode(node: ClassLikeDeclaration | InterfaceDeclaration) {
    const baseType = getClassExtendsHeritageElement(node);
    if (baseType && isInJSFile(node)) {
        // Prefer an @augments tag because it may have type parameters.
        const tag = getJSDocAugmentsTag(node);
        if (tag) {
            return tag.class;
        }
    }
    return baseType;
}

/** @internal */
export function getClassExtendsHeritageElement(node: ClassLikeDeclaration | InterfaceDeclaration) {
    const heritageClause = getHeritageClause(node.heritageClauses, SyntaxKind.ExtendsKeyword);
    return heritageClause && heritageClause.types.length > 0 ? heritageClause.types[0] : undefined;
}

/** @internal */
export function getEffectiveImplementsTypeNodes(node: ClassLikeDeclaration): undefined | readonly ExpressionWithTypeArguments[] {
    if (isInJSFile(node)) {
        return getJSDocImplementsTags(node).map(n => n.class);
    }
    else {
        const heritageClause = getHeritageClause(node.heritageClauses, SyntaxKind.ImplementsKeyword);
        return heritageClause?.types;
    }
}

/**
 * Returns the node in an `extends` or `implements` clause of a class or interface.
 *
 * @internal
 */
export function getAllSuperTypeNodes(node: Node): readonly TypeNode[] {
    return isInterfaceDeclaration(node) ? getInterfaceBaseTypeNodes(node) || emptyArray :
        isClassLike(node) ? concatenate(singleElementArray(getEffectiveBaseTypeNode(node)), getEffectiveImplementsTypeNodes(node)) || emptyArray :
        emptyArray;
}

/** @internal */
export function getInterfaceBaseTypeNodes(node: InterfaceDeclaration) {
    const heritageClause = getHeritageClause(node.heritageClauses, SyntaxKind.ExtendsKeyword);
    return heritageClause ? heritageClause.types : undefined;
}

/** @internal */
export function getHeritageClause(clauses: NodeArray<HeritageClause> | undefined, kind: SyntaxKind) {
    if (clauses) {
        for (const clause of clauses) {
            if (clause.token === kind) {
                return clause;
            }
        }
    }

    return undefined;
}

/** @internal */
export function getAncestor(node: Node | undefined, kind: SyntaxKind): Node | undefined {
    while (node) {
        if (node.kind === kind) {
            return node;
        }
        node = node.parent;
    }
    return undefined;
}

/** @internal */
export function isKeyword(token: SyntaxKind): token is KeywordSyntaxKind {
    return SyntaxKind.FirstKeyword <= token && token <= SyntaxKind.LastKeyword;
}

/** @internal */
export function isPunctuation(token: SyntaxKind): token is PunctuationSyntaxKind {
    return SyntaxKind.FirstPunctuation <= token && token <= SyntaxKind.LastPunctuation;
}

/** @internal */
export function isKeywordOrPunctuation(token: SyntaxKind): token is PunctuationOrKeywordSyntaxKind {
    return isKeyword(token) || isPunctuation(token);
}

/** @internal */
export function isContextualKeyword(token: SyntaxKind): boolean {
    return SyntaxKind.FirstContextualKeyword <= token && token <= SyntaxKind.LastContextualKeyword;
}

/** @internal */
export function isNonContextualKeyword(token: SyntaxKind): boolean {
    return isKeyword(token) && !isContextualKeyword(token);
}

/** @internal */
export function isFutureReservedKeyword(token: SyntaxKind): boolean {
    return SyntaxKind.FirstFutureReservedWord <= token && token <= SyntaxKind.LastFutureReservedWord;
}

/** @internal */
export function isStringANonContextualKeyword(name: string) {
    const token = stringToToken(name);
    return token !== undefined && isNonContextualKeyword(token);
}

/** @internal */
export function isStringAKeyword(name: string) {
    const token = stringToToken(name);
    return token !== undefined && isKeyword(token);
}

/** @internal */
export function isIdentifierANonContextualKeyword(node: Identifier): boolean {
    const originalKeywordKind = identifierToKeywordKind(node);
    return !!originalKeywordKind && !isContextualKeyword(originalKeywordKind);
}

/** @internal */
export function isTrivia(token: SyntaxKind): token is TriviaSyntaxKind {
    return SyntaxKind.FirstTriviaToken <= token && token <= SyntaxKind.LastTriviaToken;
}

// dprint-ignore
/** @internal */
export const enum FunctionFlags {
    Normal = 0,             // Function is a normal function
    Generator = 1 << 0,     // Function is a generator function or async generator function
    Async = 1 << 1,         // Function is an async function or an async generator function
    Invalid = 1 << 2,       // Function is a signature or overload and does not have a body.
    AsyncGenerator = Async | Generator, // Function is an async generator function
}

/** @internal */
export function getFunctionFlags(node: SignatureDeclaration | undefined) {
    if (!node) {
        return FunctionFlags.Invalid;
    }

    let flags = FunctionFlags.Normal;
    switch (node.kind) {
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.MethodDeclaration:
            if (node.asteriskToken) {
                flags |= FunctionFlags.Generator;
            }
            // falls through

        case SyntaxKind.ArrowFunction:
            if (hasSyntacticModifier(node, ModifierFlags.Async)) {
                flags |= FunctionFlags.Async;
            }
            break;
    }

    if (!(node as FunctionLikeDeclaration).body) {
        flags |= FunctionFlags.Invalid;
    }

    return flags;
}

/** @internal */
export function isAsyncFunction(node: Node): boolean {
    switch (node.kind) {
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.MethodDeclaration:
            return (node as FunctionLikeDeclaration).body !== undefined
                && (node as FunctionLikeDeclaration).asteriskToken === undefined
                && hasSyntacticModifier(node, ModifierFlags.Async);
    }
    return false;
}

/** @internal */
export function isStringOrNumericLiteralLike(node: Node): node is StringLiteralLike | NumericLiteral {
    return isStringLiteralLike(node) || isNumericLiteral(node);
}

/** @internal */
export function isSignedNumericLiteral(node: Node): node is PrefixUnaryExpression & { operand: NumericLiteral; } {
    return isPrefixUnaryExpression(node) && (node.operator === SyntaxKind.PlusToken || node.operator === SyntaxKind.MinusToken) && isNumericLiteral(node.operand);
}

/**
 * A declaration has a dynamic name if all of the following are true:
 *   1. The declaration has a computed property name.
 *   2. The computed name is *not* expressed as a StringLiteral.
 *   3. The computed name is *not* expressed as a NumericLiteral.
 *   4. The computed name is *not* expressed as a PlusToken or MinusToken
 *      immediately followed by a NumericLiteral.
 *
 * @internal
 */
export function hasDynamicName(declaration: Declaration): declaration is DynamicNamedDeclaration | DynamicNamedBinaryExpression {
    const name = getNameOfDeclaration(declaration);
    return !!name && isDynamicName(name);
}

/** @internal */
export function isDynamicName(name: DeclarationName): boolean {
    if (!(name.kind === SyntaxKind.ComputedPropertyName || name.kind === SyntaxKind.ElementAccessExpression)) {
        return false;
    }
    const expr = isElementAccessExpression(name) ? skipParentheses(name.argumentExpression) : name.expression;
    return !isStringOrNumericLiteralLike(expr) &&
        !isSignedNumericLiteral(expr);
}

/** @internal */
export function getPropertyNameForPropertyNameNode(name: PropertyName | JsxAttributeName): __String | undefined {
    switch (name.kind) {
        case SyntaxKind.Identifier:
        case SyntaxKind.PrivateIdentifier:
            return name.escapedText;
        case SyntaxKind.StringLiteral:
        case SyntaxKind.NoSubstitutionTemplateLiteral:
        case SyntaxKind.NumericLiteral:
            return escapeLeadingUnderscores(name.text);
        case SyntaxKind.ComputedPropertyName:
            const nameExpression = name.expression;
            if (isStringOrNumericLiteralLike(nameExpression)) {
                return escapeLeadingUnderscores(nameExpression.text);
            }
            else if (isSignedNumericLiteral(nameExpression)) {
                if (nameExpression.operator === SyntaxKind.MinusToken) {
                    return tokenToString(nameExpression.operator) + nameExpression.operand.text as __String;
                }
                return nameExpression.operand.text as __String;
            }
            return undefined;
        case SyntaxKind.JsxNamespacedName:
            return getEscapedTextOfJsxNamespacedName(name);
        default:
            return Debug.assertNever(name);
    }
}

/** @internal */
export function isPropertyNameLiteral(node: Node): node is PropertyNameLiteral {
    switch (node.kind) {
        case SyntaxKind.Identifier:
        case SyntaxKind.StringLiteral:
        case SyntaxKind.NoSubstitutionTemplateLiteral:
        case SyntaxKind.NumericLiteral:
            return true;
        default:
            return false;
    }
}
/** @internal */
export function getTextOfIdentifierOrLiteral(node: PropertyNameLiteral | PrivateIdentifier): string {
    return isMemberName(node) ? idText(node) : isJsxNamespacedName(node) ? getTextOfJsxNamespacedName(node) : node.text;
}

/** @internal */
export function getEscapedTextOfIdentifierOrLiteral(node: PropertyNameLiteral): __String {
    return isMemberName(node) ? node.escapedText : isJsxNamespacedName(node) ? getEscapedTextOfJsxNamespacedName(node) : escapeLeadingUnderscores(node.text);
}

/** @internal */
export function getPropertyNameForUniqueESSymbol(symbol: Symbol): __String {
    return `__@${getSymbolId(symbol)}@${symbol.escapedName}` as __String;
}

/** @internal */
export function getSymbolNameForPrivateIdentifier(containingClassSymbol: Symbol, description: __String): __String {
    return `__#${getSymbolId(containingClassSymbol)}@${description}` as __String;
}

/** @internal */
export function isKnownSymbol(symbol: Symbol): boolean {
    return startsWith(symbol.escapedName as string, "__@");
}

/** @internal */
export function isPrivateIdentifierSymbol(symbol: Symbol): boolean {
    return startsWith(symbol.escapedName as string, "__#");
}

/**
 * Includes the word "Symbol" with unicode escapes
 *
 * @internal
 */
export function isESSymbolIdentifier(node: Node): boolean {
    return node.kind === SyntaxKind.Identifier && (node as Identifier).escapedText === "Symbol";
}

/**
 * Indicates whether a property name is the special `__proto__` property.
 * Per the ECMA-262 spec, this only matters for property assignments whose name is
 * the Identifier `__proto__`, or the string literal `"__proto__"`, but not for
 * computed property names.
 *
 * @internal
 */
export function isProtoSetter(node: PropertyName) {
    return isIdentifier(node) ? idText(node) === "__proto__" :
        isStringLiteral(node) && node.text === "__proto__";
}

/** @internal */
export type AnonymousFunctionDefinition =
    | ClassExpression & { readonly name?: undefined; }
    | FunctionExpression & { readonly name?: undefined; }
    | ArrowFunction;

/**
 * Indicates whether an expression is an anonymous function definition.
 *
 * @see https://tc39.es/ecma262/#sec-isanonymousfunctiondefinition
 * @internal
 */
export function isAnonymousFunctionDefinition(node: Expression, cb?: (node: AnonymousFunctionDefinition) => boolean): node is WrappedExpression<AnonymousFunctionDefinition> {
    node = skipOuterExpressions(node);
    switch (node.kind) {
        case SyntaxKind.ClassExpression:
            if (classHasDeclaredOrExplicitlyAssignedName(node as ClassExpression)) {
                return false;
            }
            break;
        case SyntaxKind.FunctionExpression:
            if ((node as FunctionExpression).name) {
                return false;
            }
            break;
        case SyntaxKind.ArrowFunction:
            break;
        default:
            return false;
    }
    return typeof cb === "function" ? cb(node as AnonymousFunctionDefinition) : true;
}

/** @internal */
export type NamedEvaluationSource =
    | PropertyAssignment & { readonly name: Identifier; }
    | ShorthandPropertyAssignment & { readonly objectAssignmentInitializer: Expression; }
    | VariableDeclaration & { readonly name: Identifier; readonly initializer: Expression; }
    | ParameterDeclaration & { readonly name: Identifier; readonly initializer: Expression; readonly dotDotDotToken: undefined; }
    | BindingElement & { readonly name: Identifier; readonly initializer: Expression; readonly dotDotDotToken: undefined; }
    | PropertyDeclaration & { readonly initializer: Expression; }
    | AssignmentExpression<EqualsToken | AmpersandAmpersandEqualsToken | BarBarEqualsToken | QuestionQuestionEqualsToken> & { readonly left: Identifier; }
    | ExportAssignment;

/**
 * Indicates whether a node is a potential source of an assigned name for a class, function, or arrow function.
 *
 * @internal
 */
export function isNamedEvaluationSource(node: Node): node is NamedEvaluationSource {
    switch (node.kind) {
        case SyntaxKind.PropertyAssignment:
            return !isProtoSetter((node as PropertyAssignment).name);
        case SyntaxKind.ShorthandPropertyAssignment:
            return !!(node as ShorthandPropertyAssignment).objectAssignmentInitializer;
        case SyntaxKind.VariableDeclaration:
            return isIdentifier((node as VariableDeclaration).name) && !!(node as VariableDeclaration).initializer;
        case SyntaxKind.Parameter:
            return isIdentifier((node as ParameterDeclaration).name) && !!(node as VariableDeclaration).initializer && !(node as BindingElement).dotDotDotToken;
        case SyntaxKind.BindingElement:
            return isIdentifier((node as BindingElement).name) && !!(node as VariableDeclaration).initializer && !(node as BindingElement).dotDotDotToken;
        case SyntaxKind.PropertyDeclaration:
            return !!(node as PropertyDeclaration).initializer;
        case SyntaxKind.BinaryExpression:
            switch ((node as BinaryExpression).operatorToken.kind) {
                case SyntaxKind.EqualsToken:
                case SyntaxKind.AmpersandAmpersandEqualsToken:
                case SyntaxKind.BarBarEqualsToken:
                case SyntaxKind.QuestionQuestionEqualsToken:
                    return isIdentifier((node as BinaryExpression).left);
            }
            break;
        case SyntaxKind.ExportAssignment:
            return true;
    }
    return false;
}

/** @internal */
export type NamedEvaluation =
    | PropertyAssignment & { readonly name: Identifier; readonly initializer: WrappedExpression<AnonymousFunctionDefinition>; }
    | ShorthandPropertyAssignment & { readonly objectAssignmentInitializer: WrappedExpression<AnonymousFunctionDefinition>; }
    | VariableDeclaration & { readonly name: Identifier; readonly initializer: WrappedExpression<AnonymousFunctionDefinition>; }
    | ParameterDeclaration & { readonly name: Identifier; readonly dotDotDotToken: undefined; readonly initializer: WrappedExpression<AnonymousFunctionDefinition>; }
    | BindingElement & { readonly name: Identifier; readonly dotDotDotToken: undefined; readonly initializer: WrappedExpression<AnonymousFunctionDefinition>; }
    | PropertyDeclaration & { readonly initializer: WrappedExpression<AnonymousFunctionDefinition>; }
    | AssignmentExpression<EqualsToken> & { readonly left: Identifier; readonly right: WrappedExpression<AnonymousFunctionDefinition>; }
    | AssignmentExpression<AmpersandAmpersandEqualsToken | BarBarEqualsToken | QuestionQuestionEqualsToken> & { readonly left: Identifier; readonly right: WrappedExpression<AnonymousFunctionDefinition>; }
    | ExportAssignment & { readonly expression: WrappedExpression<AnonymousFunctionDefinition>; };

/** @internal */
export function isNamedEvaluation(node: Node, cb?: (node: AnonymousFunctionDefinition) => boolean): node is NamedEvaluation {
    if (!isNamedEvaluationSource(node)) return false;
    switch (node.kind) {
        case SyntaxKind.PropertyAssignment:
            return isAnonymousFunctionDefinition(node.initializer, cb);
        case SyntaxKind.ShorthandPropertyAssignment:
            return isAnonymousFunctionDefinition(node.objectAssignmentInitializer, cb);
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.Parameter:
        case SyntaxKind.BindingElement:
        case SyntaxKind.PropertyDeclaration:
            return isAnonymousFunctionDefinition(node.initializer, cb);
        case SyntaxKind.BinaryExpression:
            return isAnonymousFunctionDefinition(node.right, cb);
        case SyntaxKind.ExportAssignment:
            return isAnonymousFunctionDefinition(node.expression, cb);
    }
}

/** @internal */
export function isPushOrUnshiftIdentifier(node: Identifier) {
    return node.escapedText === "push" || node.escapedText === "unshift";
}

// TODO(jakebailey): this function should not be named this. While it does technically
// return true if the argument is a ParameterDeclaration, it also returns true for nodes
// that are children of ParameterDeclarations inside binding elements.
// Probably, this should be called `rootDeclarationIsParameter`.
/**
 * This function returns true if the this node's root declaration is a parameter.
 * For example, passing a `ParameterDeclaration` will return true, as will passing a
 * binding element that is a child of a `ParameterDeclaration`.
 *
 * If you are looking to test that a `Node` is a `ParameterDeclaration`, use `isParameter`.
 *
 * @internal
 */
export function isParameterDeclaration(node: Declaration): boolean {
    const root = getRootDeclaration(node);
    return root.kind === SyntaxKind.Parameter;
}

/** @internal */
export function getRootDeclaration(node: Node): Node {
    while (node.kind === SyntaxKind.BindingElement) {
        node = node.parent.parent;
    }
    return node;
}

/** @internal */
export function nodeStartsNewLexicalEnvironment(node: Node): boolean {
    const kind = node.kind;
    return kind === SyntaxKind.Constructor
        || kind === SyntaxKind.FunctionExpression
        || kind === SyntaxKind.FunctionDeclaration
        || kind === SyntaxKind.ArrowFunction
        || kind === SyntaxKind.MethodDeclaration
        || kind === SyntaxKind.GetAccessor
        || kind === SyntaxKind.SetAccessor
        || kind === SyntaxKind.ModuleDeclaration
        || kind === SyntaxKind.SourceFile;
}

/** @internal */
export function nodeIsSynthesized(range: TextRange): boolean {
    return positionIsSynthesized(range.pos)
        || positionIsSynthesized(range.end);
}

/** @internal */
export function getOriginalSourceFile(sourceFile: SourceFile) {
    return getParseTreeNode(sourceFile, isSourceFile) || sourceFile;
}

/** @internal */
export const enum Associativity {
    Left,
    Right,
}

/** @internal */
export function getExpressionAssociativity(expression: Expression) {
    const operator = getOperator(expression);
    const hasArguments = expression.kind === SyntaxKind.NewExpression && (expression as NewExpression).arguments !== undefined;
    return getOperatorAssociativity(expression.kind, operator, hasArguments);
}

/** @internal */
export function getOperatorAssociativity(kind: SyntaxKind, operator: SyntaxKind, hasArguments?: boolean) {
    switch (kind) {
        case SyntaxKind.NewExpression:
            return hasArguments ? Associativity.Left : Associativity.Right;

        case SyntaxKind.PrefixUnaryExpression:
        case SyntaxKind.TypeOfExpression:
        case SyntaxKind.VoidExpression:
        case SyntaxKind.DeleteExpression:
        case SyntaxKind.AwaitExpression:
        case SyntaxKind.ConditionalExpression:
        case SyntaxKind.YieldExpression:
            return Associativity.Right;

        case SyntaxKind.BinaryExpression:
            switch (operator) {
                case SyntaxKind.AsteriskAsteriskToken:
                case SyntaxKind.EqualsToken:
                case SyntaxKind.PlusEqualsToken:
                case SyntaxKind.MinusEqualsToken:
                case SyntaxKind.AsteriskAsteriskEqualsToken:
                case SyntaxKind.AsteriskEqualsToken:
                case SyntaxKind.SlashEqualsToken:
                case SyntaxKind.PercentEqualsToken:
                case SyntaxKind.LessThanLessThanEqualsToken:
                case SyntaxKind.GreaterThanGreaterThanEqualsToken:
                case SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
                case SyntaxKind.AmpersandEqualsToken:
                case SyntaxKind.CaretEqualsToken:
                case SyntaxKind.BarEqualsToken:
                case SyntaxKind.BarBarEqualsToken:
                case SyntaxKind.AmpersandAmpersandEqualsToken:
                case SyntaxKind.QuestionQuestionEqualsToken:
                    return Associativity.Right;
            }
    }
    return Associativity.Left;
}

/** @internal */
export function getExpressionPrecedence(expression: Expression) {
    const operator = getOperator(expression);
    const hasArguments = expression.kind === SyntaxKind.NewExpression && (expression as NewExpression).arguments !== undefined;
    return getOperatorPrecedence(expression.kind, operator, hasArguments);
}

/** @internal */
export function getOperator(expression: Expression): SyntaxKind {
    if (expression.kind === SyntaxKind.BinaryExpression) {
        return (expression as BinaryExpression).operatorToken.kind;
    }
    else if (expression.kind === SyntaxKind.PrefixUnaryExpression || expression.kind === SyntaxKind.PostfixUnaryExpression) {
        return (expression as PrefixUnaryExpression | PostfixUnaryExpression).operator;
    }
    else {
        return expression.kind;
    }
}

/** @internal */
export const enum OperatorPrecedence {
    // Expression:
    //     AssignmentExpression
    //     Expression `,` AssignmentExpression
    Comma,

    // NOTE: `Spread` is higher than `Comma` due to how it is parsed in |ElementList|
    // SpreadElement:
    //     `...` AssignmentExpression
    Spread,

    // AssignmentExpression:
    //     ConditionalExpression
    //     YieldExpression
    //     ArrowFunction
    //     AsyncArrowFunction
    //     LeftHandSideExpression `=` AssignmentExpression
    //     LeftHandSideExpression AssignmentOperator AssignmentExpression
    //
    // NOTE: AssignmentExpression is broken down into several precedences due to the requirements
    //       of the parenthesizer rules.

    // AssignmentExpression: YieldExpression
    // YieldExpression:
    //     `yield`
    //     `yield` AssignmentExpression
    //     `yield` `*` AssignmentExpression
    Yield,

    // AssignmentExpression: LeftHandSideExpression `=` AssignmentExpression
    // AssignmentExpression: LeftHandSideExpression AssignmentOperator AssignmentExpression
    // AssignmentOperator: one of
    //     `*=` `/=` `%=` `+=` `-=` `<<=` `>>=` `>>>=` `&=` `^=` `|=` `**=`
    Assignment,

    // NOTE: `Conditional` is considered higher than `Assignment` here, but in reality they have
    //       the same precedence.
    // AssignmentExpression: ConditionalExpression
    // ConditionalExpression:
    //     ShortCircuitExpression
    //     ShortCircuitExpression `?` AssignmentExpression `:` AssignmentExpression
    // ShortCircuitExpression:
    //     LogicalORExpression
    //     CoalesceExpression
    Conditional,

    // CoalesceExpression:
    //     CoalesceExpressionHead `??` BitwiseORExpression
    // CoalesceExpressionHead:
    //     CoalesceExpression
    //     BitwiseORExpression
    Coalesce = Conditional, // NOTE: This is wrong

    // LogicalORExpression:
    //     LogicalANDExpression
    //     LogicalORExpression `||` LogicalANDExpression
    LogicalOR,

    // LogicalANDExpression:
    //     BitwiseORExpression
    //     LogicalANDExprerssion `&&` BitwiseORExpression
    LogicalAND,

    // BitwiseORExpression:
    //     BitwiseXORExpression
    //     BitwiseORExpression `^` BitwiseXORExpression
    BitwiseOR,

    // BitwiseXORExpression:
    //     BitwiseANDExpression
    //     BitwiseXORExpression `^` BitwiseANDExpression
    BitwiseXOR,

    // BitwiseANDExpression:
    //     EqualityExpression
    //     BitwiseANDExpression `^` EqualityExpression
    BitwiseAND,

    // EqualityExpression:
    //     RelationalExpression
    //     EqualityExpression `==` RelationalExpression
    //     EqualityExpression `!=` RelationalExpression
    //     EqualityExpression `===` RelationalExpression
    //     EqualityExpression `!==` RelationalExpression
    Equality,

    // RelationalExpression:
    //     ShiftExpression
    //     RelationalExpression `<` ShiftExpression
    //     RelationalExpression `>` ShiftExpression
    //     RelationalExpression `<=` ShiftExpression
    //     RelationalExpression `>=` ShiftExpression
    //     RelationalExpression `instanceof` ShiftExpression
    //     RelationalExpression `in` ShiftExpression
    //     [+TypeScript] RelationalExpression `as` Type
    Relational,

    // ShiftExpression:
    //     AdditiveExpression
    //     ShiftExpression `<<` AdditiveExpression
    //     ShiftExpression `>>` AdditiveExpression
    //     ShiftExpression `>>>` AdditiveExpression
    Shift,

    // AdditiveExpression:
    //     MultiplicativeExpression
    //     AdditiveExpression `+` MultiplicativeExpression
    //     AdditiveExpression `-` MultiplicativeExpression
    Additive,

    // MultiplicativeExpression:
    //     ExponentiationExpression
    //     MultiplicativeExpression MultiplicativeOperator ExponentiationExpression
    // MultiplicativeOperator: one of `*`, `/`, `%`
    Multiplicative,

    // ExponentiationExpression:
    //     UnaryExpression
    //     UpdateExpression `**` ExponentiationExpression
    Exponentiation,

    // UnaryExpression:
    //     UpdateExpression
    //     `delete` UnaryExpression
    //     `void` UnaryExpression
    //     `typeof` UnaryExpression
    //     `+` UnaryExpression
    //     `-` UnaryExpression
    //     `~` UnaryExpression
    //     `!` UnaryExpression
    //     AwaitExpression
    // UpdateExpression:            // TODO: Do we need to investigate the precedence here?
    //     `++` UnaryExpression
    //     `--` UnaryExpression
    Unary,

    // UpdateExpression:
    //     LeftHandSideExpression
    //     LeftHandSideExpression `++`
    //     LeftHandSideExpression `--`
    Update,

    // LeftHandSideExpression:
    //     NewExpression
    //     CallExpression
    // NewExpression:
    //     MemberExpression
    //     `new` NewExpression
    LeftHandSide,

    // CallExpression:
    //     CoverCallExpressionAndAsyncArrowHead
    //     SuperCall
    //     ImportCall
    //     CallExpression Arguments
    //     CallExpression `[` Expression `]`
    //     CallExpression `.` IdentifierName
    //     CallExpression TemplateLiteral
    // MemberExpression:
    //     PrimaryExpression
    //     MemberExpression `[` Expression `]`
    //     MemberExpression `.` IdentifierName
    //     MemberExpression TemplateLiteral
    //     SuperProperty
    //     MetaProperty
    //     `new` MemberExpression Arguments
    Member,

    // TODO: JSXElement?
    // PrimaryExpression:
    //     `this`
    //     IdentifierReference
    //     Literal
    //     ArrayLiteral
    //     ObjectLiteral
    //     FunctionExpression
    //     ClassExpression
    //     GeneratorExpression
    //     AsyncFunctionExpression
    //     AsyncGeneratorExpression
    //     RegularExpressionLiteral
    //     TemplateLiteral
    //     CoverParenthesizedExpressionAndArrowParameterList
    Primary,

    Highest = Primary,
    Lowest = Comma,
    // -1 is lower than all other precedences. Returning it will cause binary expression
    // parsing to stop.
    Invalid = -1,
}

/** @internal */
export function getOperatorPrecedence(nodeKind: SyntaxKind, operatorKind: SyntaxKind, hasArguments?: boolean) {
    switch (nodeKind) {
        case SyntaxKind.CommaListExpression:
            return OperatorPrecedence.Comma;

        case SyntaxKind.SpreadElement:
            return OperatorPrecedence.Spread;

        case SyntaxKind.YieldExpression:
            return OperatorPrecedence.Yield;

        case SyntaxKind.ConditionalExpression:
            return OperatorPrecedence.Conditional;

        case SyntaxKind.BinaryExpression:
            switch (operatorKind) {
                case SyntaxKind.CommaToken:
                    return OperatorPrecedence.Comma;

                case SyntaxKind.EqualsToken:
                case SyntaxKind.PlusEqualsToken:
                case SyntaxKind.MinusEqualsToken:
                case SyntaxKind.AsteriskAsteriskEqualsToken:
                case SyntaxKind.AsteriskEqualsToken:
                case SyntaxKind.SlashEqualsToken:
                case SyntaxKind.PercentEqualsToken:
                case SyntaxKind.LessThanLessThanEqualsToken:
                case SyntaxKind.GreaterThanGreaterThanEqualsToken:
                case SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
                case SyntaxKind.AmpersandEqualsToken:
                case SyntaxKind.CaretEqualsToken:
                case SyntaxKind.BarEqualsToken:
                case SyntaxKind.BarBarEqualsToken:
                case SyntaxKind.AmpersandAmpersandEqualsToken:
                case SyntaxKind.QuestionQuestionEqualsToken:
                    return OperatorPrecedence.Assignment;

                default:
                    return getBinaryOperatorPrecedence(operatorKind);
            }

        // TODO: Should prefix `++` and `--` be moved to the `Update` precedence?
        case SyntaxKind.TypeAssertionExpression:
        case SyntaxKind.NonNullExpression:
        case SyntaxKind.PrefixUnaryExpression:
        case SyntaxKind.TypeOfExpression:
        case SyntaxKind.VoidExpression:
        case SyntaxKind.DeleteExpression:
        case SyntaxKind.AwaitExpression:
            return OperatorPrecedence.Unary;

        case SyntaxKind.PostfixUnaryExpression:
            return OperatorPrecedence.Update;

        case SyntaxKind.CallExpression:
            return OperatorPrecedence.LeftHandSide;

        case SyntaxKind.NewExpression:
            return hasArguments ? OperatorPrecedence.Member : OperatorPrecedence.LeftHandSide;

        case SyntaxKind.TaggedTemplateExpression:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.ElementAccessExpression:
        case SyntaxKind.MetaProperty:
            return OperatorPrecedence.Member;

        case SyntaxKind.AsExpression:
        case SyntaxKind.SatisfiesExpression:
            return OperatorPrecedence.Relational;

        case SyntaxKind.ThisKeyword:
        case SyntaxKind.SuperKeyword:
        case SyntaxKind.Identifier:
        case SyntaxKind.PrivateIdentifier:
        case SyntaxKind.NullKeyword:
        case SyntaxKind.TrueKeyword:
        case SyntaxKind.FalseKeyword:
        case SyntaxKind.NumericLiteral:
        case SyntaxKind.BigIntLiteral:
        case SyntaxKind.StringLiteral:
        case SyntaxKind.ArrayLiteralExpression:
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.ClassExpression:
        case SyntaxKind.RegularExpressionLiteral:
        case SyntaxKind.NoSubstitutionTemplateLiteral:
        case SyntaxKind.TemplateExpression:
        case SyntaxKind.ParenthesizedExpression:
        case SyntaxKind.OmittedExpression:
        case SyntaxKind.JsxElement:
        case SyntaxKind.JsxSelfClosingElement:
        case SyntaxKind.JsxFragment:
            return OperatorPrecedence.Primary;

        default:
            return OperatorPrecedence.Invalid;
    }
}

/** @internal */
export function getBinaryOperatorPrecedence(kind: SyntaxKind): OperatorPrecedence {
    switch (kind) {
        case SyntaxKind.QuestionQuestionToken:
            return OperatorPrecedence.Coalesce;
        case SyntaxKind.BarBarToken:
            return OperatorPrecedence.LogicalOR;
        case SyntaxKind.AmpersandAmpersandToken:
            return OperatorPrecedence.LogicalAND;
        case SyntaxKind.BarToken:
            return OperatorPrecedence.BitwiseOR;
        case SyntaxKind.CaretToken:
            return OperatorPrecedence.BitwiseXOR;
        case SyntaxKind.AmpersandToken:
            return OperatorPrecedence.BitwiseAND;
        case SyntaxKind.EqualsEqualsToken:
        case SyntaxKind.ExclamationEqualsToken:
        case SyntaxKind.EqualsEqualsEqualsToken:
        case SyntaxKind.ExclamationEqualsEqualsToken:
            return OperatorPrecedence.Equality;
        case SyntaxKind.LessThanToken:
        case SyntaxKind.GreaterThanToken:
        case SyntaxKind.LessThanEqualsToken:
        case SyntaxKind.GreaterThanEqualsToken:
        case SyntaxKind.InstanceOfKeyword:
        case SyntaxKind.InKeyword:
        case SyntaxKind.AsKeyword:
        case SyntaxKind.SatisfiesKeyword:
            return OperatorPrecedence.Relational;
        case SyntaxKind.LessThanLessThanToken:
        case SyntaxKind.GreaterThanGreaterThanToken:
        case SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
            return OperatorPrecedence.Shift;
        case SyntaxKind.PlusToken:
        case SyntaxKind.MinusToken:
            return OperatorPrecedence.Additive;
        case SyntaxKind.AsteriskToken:
        case SyntaxKind.SlashToken:
        case SyntaxKind.PercentToken:
            return OperatorPrecedence.Multiplicative;
        case SyntaxKind.AsteriskAsteriskToken:
            return OperatorPrecedence.Exponentiation;
    }

    // -1 is lower than all other precedences.  Returning it will cause binary expression
    // parsing to stop.
    return -1;
}

/** @internal */
export function getSemanticJsxChildren(children: readonly JsxChild[]) {
    return filter(children, i => {
        switch (i.kind) {
            case SyntaxKind.JsxExpression:
                return !!i.expression;
            case SyntaxKind.JsxText:
                return !i.containsOnlyTriviaWhiteSpaces;
            default:
                return true;
        }
    });
}

/** @internal */
export function createDiagnosticCollection(): DiagnosticCollection {
    let nonFileDiagnostics = [] as Diagnostic[] as SortedArray<Diagnostic>; // See GH#19873
    const filesWithDiagnostics = [] as string[] as SortedArray<string>;
    const fileDiagnostics = new Map<string, SortedArray<DiagnosticWithLocation>>();
    let hasReadNonFileDiagnostics = false;

    return {
        add,
        lookup,
        getGlobalDiagnostics,
        getDiagnostics,
    };

    function lookup(diagnostic: Diagnostic): Diagnostic | undefined {
        let diagnostics: SortedArray<Diagnostic> | undefined;
        if (diagnostic.file) {
            diagnostics = fileDiagnostics.get(diagnostic.file.fileName);
        }
        else {
            diagnostics = nonFileDiagnostics;
        }
        if (!diagnostics) {
            return undefined;
        }
        const result = binarySearch(diagnostics, diagnostic, identity, compareDiagnosticsSkipRelatedInformation);
        if (result >= 0) {
            return diagnostics[result];
        }
        return undefined;
    }

    function add(diagnostic: Diagnostic): void {
        let diagnostics: SortedArray<Diagnostic> | undefined;
        if (diagnostic.file) {
            diagnostics = fileDiagnostics.get(diagnostic.file.fileName);
            if (!diagnostics) {
                diagnostics = [] as Diagnostic[] as SortedArray<DiagnosticWithLocation>; // See GH#19873
                fileDiagnostics.set(diagnostic.file.fileName, diagnostics as SortedArray<DiagnosticWithLocation>);
                insertSorted(filesWithDiagnostics, diagnostic.file.fileName, compareStringsCaseSensitive);
            }
        }
        else {
            // If we've already read the non-file diagnostics, do not modify the existing array.
            if (hasReadNonFileDiagnostics) {
                hasReadNonFileDiagnostics = false;
                nonFileDiagnostics = nonFileDiagnostics.slice() as SortedArray<Diagnostic>;
            }

            diagnostics = nonFileDiagnostics;
        }

        insertSorted(diagnostics, diagnostic, compareDiagnosticsSkipRelatedInformation);
    }

    function getGlobalDiagnostics(): Diagnostic[] {
        hasReadNonFileDiagnostics = true;
        return nonFileDiagnostics;
    }

    function getDiagnostics(fileName: string): DiagnosticWithLocation[];
    function getDiagnostics(): Diagnostic[];
    function getDiagnostics(fileName?: string): Diagnostic[] {
        if (fileName) {
            return fileDiagnostics.get(fileName) || [];
        }

        const fileDiags: Diagnostic[] = flatMapToMutable(filesWithDiagnostics, f => fileDiagnostics.get(f));
        if (!nonFileDiagnostics.length) {
            return fileDiags;
        }
        fileDiags.unshift(...nonFileDiagnostics);
        return fileDiags;
    }
}

const templateSubstitutionRegExp = /\$\{/g;
/** @internal */
export function escapeTemplateSubstitution(str: string): string {
    return str.replace(templateSubstitutionRegExp, "\\${");
}

function containsInvalidEscapeFlag(node: TemplateLiteralToken): boolean {
    return !!((node.templateFlags || 0) & TokenFlags.ContainsInvalidEscape);
}

/** @internal */
export function hasInvalidEscape(template: TemplateLiteral): boolean {
    return template && !!(isNoSubstitutionTemplateLiteral(template)
        ? containsInvalidEscapeFlag(template)
        : (containsInvalidEscapeFlag(template.head) || some(template.templateSpans, span => containsInvalidEscapeFlag(span.literal))));
}

// This consists of the first 19 unprintable ASCII characters, canonical escapes, lineSeparator,
// paragraphSeparator, and nextLine. The latter three are just desirable to suppress new lines in
// the language service. These characters should be escaped when printing, and if any characters are added,
// the map below must be updated. Note that this regexp *does not* include the 'delete' character.
// There is no reason for this other than that JSON.stringify does not handle it either.
const doubleQuoteEscapedCharsRegExp = /[\\"\u0000-\u001f\t\v\f\b\r\n\u2028\u2029\u0085]/g;
const singleQuoteEscapedCharsRegExp = /[\\'\u0000-\u001f\t\v\f\b\r\n\u2028\u2029\u0085]/g;
// Template strings preserve simple LF newlines, still encode CRLF (or CR)
const backtickQuoteEscapedCharsRegExp = /\r\n|[\\`\u0000-\u001f\t\v\f\b\r\u2028\u2029\u0085]/g;
const escapedCharsMap = new Map(Object.entries({
    "\t": "\\t",
    "\v": "\\v",
    "\f": "\\f",
    "\b": "\\b",
    "\r": "\\r",
    "\n": "\\n",
    "\\": "\\\\",
    '"': '\\"',
    "'": "\\'",
    "`": "\\`",
    "\u2028": "\\u2028", // lineSeparator
    "\u2029": "\\u2029", // paragraphSeparator
    "\u0085": "\\u0085", // nextLine
    "\r\n": "\\r\\n", // special case for CRLFs in backticks
}));

function encodeUtf16EscapeSequence(charCode: number): string {
    const hexCharCode = charCode.toString(16).toUpperCase();
    const paddedHexCode = ("0000" + hexCharCode).slice(-4);
    return "\\u" + paddedHexCode;
}

function getReplacement(c: string, offset: number, input: string) {
    if (c.charCodeAt(0) === CharacterCodes.nullCharacter) {
        const lookAhead = input.charCodeAt(offset + c.length);
        if (lookAhead >= CharacterCodes._0 && lookAhead <= CharacterCodes._9) {
            // If the null character is followed by digits, print as a hex escape to prevent the result from parsing as an octal (which is forbidden in strict mode)
            return "\\x00";
        }
        // Otherwise, keep printing a literal \0 for the null character
        return "\\0";
    }
    return escapedCharsMap.get(c) || encodeUtf16EscapeSequence(c.charCodeAt(0));
}

/**
 * Based heavily on the abstract 'Quote'/'QuoteJSONString' operation from ECMA-262 (24.3.2.2),
 * but augmented for a few select characters (e.g. lineSeparator, paragraphSeparator, nextLine)
 * Note that this doesn't actually wrap the input in double quotes.
 *
 * @internal
 */
export function escapeString(s: string, quoteChar?: CharacterCodes.doubleQuote | CharacterCodes.singleQuote | CharacterCodes.backtick): string {
    const escapedCharsRegExp = quoteChar === CharacterCodes.backtick ? backtickQuoteEscapedCharsRegExp :
        quoteChar === CharacterCodes.singleQuote ? singleQuoteEscapedCharsRegExp :
        doubleQuoteEscapedCharsRegExp;
    return s.replace(escapedCharsRegExp, getReplacement);
}

const nonAsciiCharacters = /[^\u0000-\u007F]/g;
/** @internal */
export function escapeNonAsciiString(s: string, quoteChar?: CharacterCodes.doubleQuote | CharacterCodes.singleQuote | CharacterCodes.backtick): string {
    s = escapeString(s, quoteChar);
    // Replace non-ASCII characters with '\uNNNN' escapes if any exist.
    // Otherwise just return the original string.
    return nonAsciiCharacters.test(s) ?
        s.replace(nonAsciiCharacters, c => encodeUtf16EscapeSequence(c.charCodeAt(0))) :
        s;
}

// This consists of the first 19 unprintable ASCII characters, JSX canonical escapes, lineSeparator,
// paragraphSeparator, and nextLine. The latter three are just desirable to suppress new lines in
// the language service. These characters should be escaped when printing, and if any characters are added,
// the map below must be updated.
const jsxDoubleQuoteEscapedCharsRegExp = /["\u0000-\u001f\u2028\u2029\u0085]/g;
const jsxSingleQuoteEscapedCharsRegExp = /['\u0000-\u001f\u2028\u2029\u0085]/g;
const jsxEscapedCharsMap = new Map(Object.entries({
    '"': "&quot;",
    "'": "&apos;",
}));

function encodeJsxCharacterEntity(charCode: number): string {
    const hexCharCode = charCode.toString(16).toUpperCase();
    return "&#x" + hexCharCode + ";";
}

function getJsxAttributeStringReplacement(c: string) {
    if (c.charCodeAt(0) === CharacterCodes.nullCharacter) {
        return "&#0;";
    }
    return jsxEscapedCharsMap.get(c) || encodeJsxCharacterEntity(c.charCodeAt(0));
}

/** @internal */
export function escapeJsxAttributeString(s: string, quoteChar?: CharacterCodes.doubleQuote | CharacterCodes.singleQuote) {
    const escapedCharsRegExp = quoteChar === CharacterCodes.singleQuote ? jsxSingleQuoteEscapedCharsRegExp :
        jsxDoubleQuoteEscapedCharsRegExp;
    return s.replace(escapedCharsRegExp, getJsxAttributeStringReplacement);
}

/**
 * Strip off existed surrounding single quotes, double quotes, or backticks from a given string
 *
 * @return non-quoted string
 *
 * @internal
 */
export function stripQuotes(name: string) {
    const length = name.length;
    if (length >= 2 && name.charCodeAt(0) === name.charCodeAt(length - 1) && isQuoteOrBacktick(name.charCodeAt(0))) {
        return name.substring(1, length - 1);
    }
    return name;
}

function isQuoteOrBacktick(charCode: number) {
    return charCode === CharacterCodes.singleQuote ||
        charCode === CharacterCodes.doubleQuote ||
        charCode === CharacterCodes.backtick;
}

/** @internal */
export function isIntrinsicJsxName(name: __String | string) {
    const ch = (name as string).charCodeAt(0);
    return (ch >= CharacterCodes.a && ch <= CharacterCodes.z) || (name as string).includes("-");
}

const indentStrings: string[] = ["", "    "];
/** @internal */
export function getIndentString(level: number) {
    // prepopulate cache
    const singleLevel = indentStrings[1];
    for (let current = indentStrings.length; current <= level; current++) {
        indentStrings.push(indentStrings[current - 1] + singleLevel);
    }
    return indentStrings[level];
}

/** @internal */
export function getIndentSize() {
    return indentStrings[1].length;
}

/** @internal */
export function createTextWriter(newLine: string): EmitTextWriter {
    // Why var? It avoids TDZ checks in the runtime which can be costly.
    // See: https://github.com/microsoft/TypeScript/issues/52924
    /* eslint-disable no-var */
    var output: string;
    var indent: number;
    var lineStart: boolean;
    var lineCount: number;
    var linePos: number;
    var hasTrailingComment = false;
    /* eslint-enable no-var */

    function updateLineCountAndPosFor(s: string) {
        const lineStartsOfS = computeLineStarts(s);
        if (lineStartsOfS.length > 1) {
            lineCount = lineCount + lineStartsOfS.length - 1;
            linePos = output.length - s.length + last(lineStartsOfS);
            lineStart = (linePos - output.length) === 0;
        }
        else {
            lineStart = false;
        }
    }

    function writeText(s: string) {
        if (s && s.length) {
            if (lineStart) {
                s = getIndentString(indent) + s;
                lineStart = false;
            }
            output += s;
            updateLineCountAndPosFor(s);
        }
    }

    function write(s: string) {
        if (s) hasTrailingComment = false;
        writeText(s);
    }

    function writeComment(s: string) {
        if (s) hasTrailingComment = true;
        writeText(s);
    }

    function reset(): void {
        output = "";
        indent = 0;
        lineStart = true;
        lineCount = 0;
        linePos = 0;
        hasTrailingComment = false;
    }

    function rawWrite(s: string) {
        if (s !== undefined) {
            output += s;
            updateLineCountAndPosFor(s);
            hasTrailingComment = false;
        }
    }

    function writeLiteral(s: string) {
        if (s && s.length) {
            write(s);
        }
    }

    function writeLine(force?: boolean) {
        if (!lineStart || force) {
            output += newLine;
            lineCount++;
            linePos = output.length;
            lineStart = true;
            hasTrailingComment = false;
        }
    }

    function getTextPosWithWriteLine() {
        return lineStart ? output.length : (output.length + newLine.length);
    }

    reset();

    return {
        write,
        rawWrite,
        writeLiteral,
        writeLine,
        increaseIndent: () => {
            indent++;
        },
        decreaseIndent: () => {
            indent--;
        },
        getIndent: () => indent,
        getTextPos: () => output.length,
        getLine: () => lineCount,
        getColumn: () => lineStart ? indent * getIndentSize() : output.length - linePos,
        getText: () => output,
        isAtStartOfLine: () => lineStart,
        hasTrailingComment: () => hasTrailingComment,
        hasTrailingWhitespace: () => !!output.length && isWhiteSpaceLike(output.charCodeAt(output.length - 1)),
        clear: reset,
        writeKeyword: write,
        writeOperator: write,
        writeParameter: write,
        writeProperty: write,
        writePunctuation: write,
        writeSpace: write,
        writeStringLiteral: write,
        writeSymbol: (s, _) => write(s),
        writeTrailingSemicolon: write,
        writeComment,
        getTextPosWithWriteLine,
    };
}

/** @internal */
export function getTrailingSemicolonDeferringWriter(writer: EmitTextWriter): EmitTextWriter {
    let pendingTrailingSemicolon = false;

    function commitPendingTrailingSemicolon() {
        if (pendingTrailingSemicolon) {
            writer.writeTrailingSemicolon(";");
            pendingTrailingSemicolon = false;
        }
    }

    return {
        ...writer,
        writeTrailingSemicolon() {
            pendingTrailingSemicolon = true;
        },
        writeLiteral(s) {
            commitPendingTrailingSemicolon();
            writer.writeLiteral(s);
        },
        writeStringLiteral(s) {
            commitPendingTrailingSemicolon();
            writer.writeStringLiteral(s);
        },
        writeSymbol(s, sym) {
            commitPendingTrailingSemicolon();
            writer.writeSymbol(s, sym);
        },
        writePunctuation(s) {
            commitPendingTrailingSemicolon();
            writer.writePunctuation(s);
        },
        writeKeyword(s) {
            commitPendingTrailingSemicolon();
            writer.writeKeyword(s);
        },
        writeOperator(s) {
            commitPendingTrailingSemicolon();
            writer.writeOperator(s);
        },
        writeParameter(s) {
            commitPendingTrailingSemicolon();
            writer.writeParameter(s);
        },
        writeSpace(s) {
            commitPendingTrailingSemicolon();
            writer.writeSpace(s);
        },
        writeProperty(s) {
            commitPendingTrailingSemicolon();
            writer.writeProperty(s);
        },
        writeComment(s) {
            commitPendingTrailingSemicolon();
            writer.writeComment(s);
        },
        writeLine() {
            commitPendingTrailingSemicolon();
            writer.writeLine();
        },
        increaseIndent() {
            commitPendingTrailingSemicolon();
            writer.increaseIndent();
        },
        decreaseIndent() {
            commitPendingTrailingSemicolon();
            writer.decreaseIndent();
        },
    };
}

/** @internal */
export function hostUsesCaseSensitiveFileNames(host: { useCaseSensitiveFileNames?(): boolean; }): boolean {
    return host.useCaseSensitiveFileNames ? host.useCaseSensitiveFileNames() : false;
}

/** @internal */
export function hostGetCanonicalFileName(host: { useCaseSensitiveFileNames?(): boolean; }): GetCanonicalFileName {
    return createGetCanonicalFileName(hostUsesCaseSensitiveFileNames(host));
}

/** @internal */
export interface ResolveModuleNameResolutionHost {
    getCanonicalFileName(p: string): string;
    getCommonSourceDirectory(): string;
    getCurrentDirectory(): string;
}

/** @internal */
export function getResolvedExternalModuleName(host: ResolveModuleNameResolutionHost, file: SourceFile, referenceFile?: SourceFile): string {
    return file.moduleName || getExternalModuleNameFromPath(host, file.fileName, referenceFile && referenceFile.fileName);
}

function getCanonicalAbsolutePath(host: ResolveModuleNameResolutionHost, path: string) {
    return host.getCanonicalFileName(getNormalizedAbsolutePath(path, host.getCurrentDirectory()));
}

/** @internal */
export function getExternalModuleNameFromDeclaration(host: ResolveModuleNameResolutionHost, resolver: EmitResolver, declaration: ImportEqualsDeclaration | ImportDeclaration | ExportDeclaration | ModuleDeclaration | ImportTypeNode): string | undefined {
    const file = resolver.getExternalModuleFileFromDeclaration(declaration);
    if (!file || file.isDeclarationFile) {
        return undefined;
    }
    // If the declaration already uses a non-relative name, and is outside the common source directory, continue to use it
    const specifier = getExternalModuleName(declaration);
    if (
        specifier && isStringLiteralLike(specifier) && !pathIsRelative(specifier.text) &&
        !getCanonicalAbsolutePath(host, file.path).includes(getCanonicalAbsolutePath(host, ensureTrailingDirectorySeparator(host.getCommonSourceDirectory())))
    ) {
        return undefined;
    }
    return getResolvedExternalModuleName(host, file);
}

/**
 * Resolves a local path to a path which is absolute to the base of the emit
 *
 * @internal
 */
export function getExternalModuleNameFromPath(host: ResolveModuleNameResolutionHost, fileName: string, referencePath?: string): string {
    const getCanonicalFileName = (f: string) => host.getCanonicalFileName(f);
    const dir = toPath(referencePath ? getDirectoryPath(referencePath) : host.getCommonSourceDirectory(), host.getCurrentDirectory(), getCanonicalFileName);
    const filePath = getNormalizedAbsolutePath(fileName, host.getCurrentDirectory());
    const relativePath = getRelativePathToDirectoryOrUrl(dir, filePath, dir, getCanonicalFileName, /*isAbsolutePathAnUrl*/ false);
    const extensionless = removeFileExtension(relativePath);
    return referencePath ? ensurePathIsNonModuleName(extensionless) : extensionless;
}

/** @internal */
export function getOwnEmitOutputFilePath(fileName: string, host: EmitHost, extension: string) {
    const compilerOptions = host.getCompilerOptions();
    let emitOutputFilePathWithoutExtension: string;
    if (compilerOptions.outDir) {
        emitOutputFilePathWithoutExtension = removeFileExtension(getSourceFilePathInNewDir(fileName, host, compilerOptions.outDir));
    }
    else {
        emitOutputFilePathWithoutExtension = removeFileExtension(fileName);
    }

    return emitOutputFilePathWithoutExtension + extension;
}

/** @internal */
export function getDeclarationEmitOutputFilePath(fileName: string, host: EmitHost) {
    return getDeclarationEmitOutputFilePathWorker(fileName, host.getCompilerOptions(), host.getCurrentDirectory(), host.getCommonSourceDirectory(), f => host.getCanonicalFileName(f));
}

/** @internal */
export function getDeclarationEmitOutputFilePathWorker(fileName: string, options: CompilerOptions, currentDirectory: string, commonSourceDirectory: string, getCanonicalFileName: GetCanonicalFileName): string {
    const outputDir = options.declarationDir || options.outDir; // Prefer declaration folder if specified

    const path = outputDir
        ? getSourceFilePathInNewDirWorker(fileName, outputDir, currentDirectory, commonSourceDirectory, getCanonicalFileName)
        : fileName;
    const declarationExtension = getDeclarationEmitExtensionForPath(path);
    return removeFileExtension(path) + declarationExtension;
}

/** @internal */
export function getDeclarationEmitExtensionForPath(path: string) {
    return fileExtensionIsOneOf(path, [Extension.Mjs, Extension.Mts]) ? Extension.Dmts :
        fileExtensionIsOneOf(path, [Extension.Cjs, Extension.Cts]) ? Extension.Dcts :
        fileExtensionIsOneOf(path, [Extension.Json]) ? `.d.json.ts` : // Drive-by redefinition of json declaration file output name so if it's ever enabled, it behaves well
        Extension.Dts;
}

/**
 * This function is an inverse of `getDeclarationEmitExtensionForPath`.
 *
 * @internal
 */
export function getPossibleOriginalInputExtensionForExtension(path: string) {
    return fileExtensionIsOneOf(path, [Extension.Dmts, Extension.Mjs, Extension.Mts]) ? [Extension.Mts, Extension.Mjs] :
        fileExtensionIsOneOf(path, [Extension.Dcts, Extension.Cjs, Extension.Cts]) ? [Extension.Cts, Extension.Cjs] :
        fileExtensionIsOneOf(path, [`.d.json.ts`]) ? [Extension.Json] :
        [Extension.Tsx, Extension.Ts, Extension.Jsx, Extension.Js];
}

/** @internal */
export function outFile(options: CompilerOptions) {
    return options.outFile || options.out;
}

/**
 * Returns 'undefined' if and only if 'options.paths' is undefined.
 *
 * @internal
 */
export function getPathsBasePath(options: CompilerOptions, host: { getCurrentDirectory?(): string; }) {
    if (!options.paths) return undefined;
    return options.baseUrl ?? Debug.checkDefined(options.pathsBasePath || host.getCurrentDirectory?.(), "Encountered 'paths' without a 'baseUrl', config file, or host 'getCurrentDirectory'.");
}

/** @internal */
export interface EmitFileNames {
    jsFilePath?: string | undefined;
    sourceMapFilePath?: string | undefined;
    declarationFilePath?: string | undefined;
    declarationMapPath?: string | undefined;
    buildInfoPath?: string | undefined;
}

/**
 * Gets the source files that are expected to have an emit output.
 *
 * Originally part of `forEachExpectedEmitFile`, this functionality was extracted to support
 * transformations.
 *
 * @param host An EmitHost.
 * @param targetSourceFile An optional target source file to emit.
 *
 * @internal
 */
export function getSourceFilesToEmit(host: EmitHost, targetSourceFile?: SourceFile, forceDtsEmit?: boolean): readonly SourceFile[] {
    const options = host.getCompilerOptions();
    if (outFile(options)) {
        const moduleKind = getEmitModuleKind(options);
        const moduleEmitEnabled = options.emitDeclarationOnly || moduleKind === ModuleKind.AMD || moduleKind === ModuleKind.System;
        // Can emit only sources that are not declaration file and are either non module code or module with --module or --target es6 specified
        return filter(
            host.getSourceFiles(),
            sourceFile =>
                (moduleEmitEnabled || !isExternalModule(sourceFile)) &&
                sourceFileMayBeEmitted(sourceFile, host, forceDtsEmit),
        );
    }
    else {
        const sourceFiles = targetSourceFile === undefined ? host.getSourceFiles() : [targetSourceFile];
        return filter(
            sourceFiles,
            sourceFile => sourceFileMayBeEmitted(sourceFile, host, forceDtsEmit),
        );
    }
}

/**
 * Don't call this for `--outFile`, just for `--outDir` or plain emit. `--outFile` needs additional checks.
 *
 * @internal
 */
export function sourceFileMayBeEmitted(sourceFile: SourceFile, host: SourceFileMayBeEmittedHost, forceDtsEmit?: boolean) {
    const options = host.getCompilerOptions();
    // Js files are emitted only if option is enabled
    if (options.noEmitForJsFiles && isSourceFileJS(sourceFile)) return false;
    // Declaration files are not emitted
    if (sourceFile.isDeclarationFile) return false;
    // Source file from node_modules are not emitted
    if (host.isSourceFileFromExternalLibrary(sourceFile)) return false;
    // forcing dts emit => file needs to be emitted
    if (forceDtsEmit) return true;
    // Check other conditions for file emit
    // Source files from referenced projects are not emitted
    if (host.isSourceOfProjectReferenceRedirect(sourceFile.fileName)) return false;
    // Any non json file should be emitted
    if (!isJsonSourceFile(sourceFile)) return true;
    if (host.getResolvedProjectReferenceToRedirect(sourceFile.fileName)) return false;
    // Emit json file if outFile is specified
    if (outFile(options)) return true;
    // Json file is not emitted if outDir is not specified
    if (!options.outDir) return false;
    // Otherwise if rootDir or composite config file, we know common sourceDir and can check if file would be emitted in same location
    if (options.rootDir || (options.composite && options.configFilePath)) {
        const commonDir = getNormalizedAbsolutePath(getCommonSourceDirectory(options, () => [], host.getCurrentDirectory(), host.getCanonicalFileName), host.getCurrentDirectory());
        const outputPath = getSourceFilePathInNewDirWorker(sourceFile.fileName, options.outDir, host.getCurrentDirectory(), commonDir, host.getCanonicalFileName);
        if (comparePaths(sourceFile.fileName, outputPath, host.getCurrentDirectory(), !host.useCaseSensitiveFileNames()) === Comparison.EqualTo) return false;
    }
    return true;
}

/** @internal */
export function getSourceFilePathInNewDir(fileName: string, host: EmitHost, newDirPath: string): string {
    return getSourceFilePathInNewDirWorker(fileName, newDirPath, host.getCurrentDirectory(), host.getCommonSourceDirectory(), f => host.getCanonicalFileName(f));
}

/** @internal */
export function getSourceFilePathInNewDirWorker(fileName: string, newDirPath: string, currentDirectory: string, commonSourceDirectory: string, getCanonicalFileName: GetCanonicalFileName): string {
    let sourceFilePath = getNormalizedAbsolutePath(fileName, currentDirectory);
    const isSourceFileInCommonSourceDirectory = getCanonicalFileName(sourceFilePath).indexOf(getCanonicalFileName(commonSourceDirectory)) === 0;
    sourceFilePath = isSourceFileInCommonSourceDirectory ? sourceFilePath.substring(commonSourceDirectory.length) : sourceFilePath;
    return combinePaths(newDirPath, sourceFilePath);
}

/** @internal */
export function writeFile(host: { writeFile: WriteFileCallback; }, diagnostics: DiagnosticCollection, fileName: string, text: string, writeByteOrderMark: boolean, sourceFiles?: readonly SourceFile[], data?: WriteFileCallbackData) {
    host.writeFile(
        fileName,
        text,
        writeByteOrderMark,
        hostErrorMessage => {
            diagnostics.add(createCompilerDiagnostic(Diagnostics.Could_not_write_file_0_Colon_1, fileName, hostErrorMessage));
        },
        sourceFiles,
        data,
    );
}

function ensureDirectoriesExist(
    directoryPath: string,
    createDirectory: (path: string) => void,
    directoryExists: (path: string) => boolean,
): void {
    if (directoryPath.length > getRootLength(directoryPath) && !directoryExists(directoryPath)) {
        const parentDirectory = getDirectoryPath(directoryPath);
        ensureDirectoriesExist(parentDirectory, createDirectory, directoryExists);
        createDirectory(directoryPath);
    }
}

/** @internal */
export function writeFileEnsuringDirectories(
    path: string,
    data: string,
    writeByteOrderMark: boolean,
    writeFile: (path: string, data: string, writeByteOrderMark: boolean) => void,
    createDirectory: (path: string) => void,
    directoryExists: (path: string) => boolean,
): void {
    // PERF: Checking for directory existence is expensive.  Instead, assume the directory exists
    // and fall back to creating it if the file write fails.
    try {
        writeFile(path, data, writeByteOrderMark);
    }
    catch {
        ensureDirectoriesExist(getDirectoryPath(normalizePath(path)), createDirectory, directoryExists);
        writeFile(path, data, writeByteOrderMark);
    }
}

/** @internal */
export function getLineOfLocalPosition(sourceFile: SourceFile, pos: number) {
    const lineStarts = getLineStarts(sourceFile);
    return computeLineOfPosition(lineStarts, pos);
}

/** @internal */
export function getLineOfLocalPositionFromLineMap(lineMap: readonly number[], pos: number) {
    return computeLineOfPosition(lineMap, pos);
}

/** @internal */
export function getFirstConstructorWithBody(node: ClassLikeDeclaration): ConstructorDeclaration & { body: FunctionBody; } | undefined {
    return find(node.members, (member): member is ConstructorDeclaration & { body: FunctionBody; } => isConstructorDeclaration(member) && nodeIsPresent(member.body));
}

/** @internal */
export function getSetAccessorValueParameter(accessor: SetAccessorDeclaration): ParameterDeclaration | undefined {
    if (accessor && accessor.parameters.length > 0) {
        const hasThis = accessor.parameters.length === 2 && parameterIsThisKeyword(accessor.parameters[0]);
        return accessor.parameters[hasThis ? 1 : 0];
    }
}

/**
 * Get the type annotation for the value parameter.
 *
 * @internal
 */
export function getSetAccessorTypeAnnotationNode(accessor: SetAccessorDeclaration): TypeNode | undefined {
    const parameter = getSetAccessorValueParameter(accessor);
    return parameter && parameter.type;
}

/** @internal */
export function getThisParameter(signature: SignatureDeclaration | JSDocSignature): ParameterDeclaration | undefined {
    // callback tags do not currently support this parameters
    if (signature.parameters.length && !isJSDocSignature(signature)) {
        const thisParameter = signature.parameters[0];
        if (parameterIsThisKeyword(thisParameter)) {
            return thisParameter;
        }
    }
}

/** @internal */
export function parameterIsThisKeyword(parameter: ParameterDeclaration): boolean {
    return isThisIdentifier(parameter.name);
}

/** @internal */
export function isThisIdentifier(node: Node | undefined): boolean {
    return !!node && node.kind === SyntaxKind.Identifier && identifierIsThisKeyword(node as Identifier);
}

/** @internal */
export function isInTypeQuery(node: Node): boolean {
    // TypeScript 1.0 spec (April 2014): 3.6.3
    // A type query consists of the keyword typeof followed by an expression.
    // The expression is restricted to a single identifier or a sequence of identifiers separated by periods
    return !!findAncestor(
        node,
        n => n.kind === SyntaxKind.TypeQuery ? true : n.kind === SyntaxKind.Identifier || n.kind === SyntaxKind.QualifiedName ? false : "quit",
    );
}

/** @internal */
export function isThisInTypeQuery(node: Node): boolean {
    if (!isThisIdentifier(node)) {
        return false;
    }

    while (isQualifiedName(node.parent) && node.parent.left === node) {
        node = node.parent;
    }

    return node.parent.kind === SyntaxKind.TypeQuery;
}

/** @internal */
export function identifierIsThisKeyword(id: Identifier): boolean {
    return id.escapedText === "this";
}

/** @internal */
export function getAllAccessorDeclarations(declarations: readonly Declaration[], accessor: AccessorDeclaration): AllAccessorDeclarations {
    // TODO: GH#18217
    let firstAccessor!: AccessorDeclaration;
    let secondAccessor!: AccessorDeclaration;
    let getAccessor!: GetAccessorDeclaration;
    let setAccessor!: SetAccessorDeclaration;
    if (hasDynamicName(accessor)) {
        firstAccessor = accessor;
        if (accessor.kind === SyntaxKind.GetAccessor) {
            getAccessor = accessor;
        }
        else if (accessor.kind === SyntaxKind.SetAccessor) {
            setAccessor = accessor;
        }
        else {
            Debug.fail("Accessor has wrong kind");
        }
    }
    else {
        forEach(declarations, member => {
            if (
                isAccessor(member)
                && isStatic(member) === isStatic(accessor)
            ) {
                const memberName = getPropertyNameForPropertyNameNode(member.name);
                const accessorName = getPropertyNameForPropertyNameNode(accessor.name);
                if (memberName === accessorName) {
                    if (!firstAccessor) {
                        firstAccessor = member;
                    }
                    else if (!secondAccessor) {
                        secondAccessor = member;
                    }

                    if (member.kind === SyntaxKind.GetAccessor && !getAccessor) {
                        getAccessor = member;
                    }

                    if (member.kind === SyntaxKind.SetAccessor && !setAccessor) {
                        setAccessor = member;
                    }
                }
            }
        });
    }
    return {
        firstAccessor,
        secondAccessor,
        getAccessor,
        setAccessor,
    };
}

/**
 * Gets the effective type annotation of a variable, parameter, or property. If the node was
 * parsed in a JavaScript file, gets the type annotation from JSDoc.  Also gets the type of
 * functions only the JSDoc case.
 *
 * @internal
 */
export function getEffectiveTypeAnnotationNode(node: Node): TypeNode | undefined {
    if (!isInJSFile(node) && isFunctionDeclaration(node)) return undefined;
    const type = (node as HasType).type;
    if (type || !isInJSFile(node)) return type;
    return isJSDocPropertyLikeTag(node) ? node.typeExpression && node.typeExpression.type : getJSDocType(node);
}

/** @internal */
export function getTypeAnnotationNode(node: Node): TypeNode | undefined {
    return (node as HasType).type;
}

/**
 * Gets the effective return type annotation of a signature. If the node was parsed in a
 * JavaScript file, gets the return type annotation from JSDoc.
 *
 * @internal
 */
export function getEffectiveReturnTypeNode(node: SignatureDeclaration | JSDocSignature): TypeNode | undefined {
    return isJSDocSignature(node) ?
        node.type && node.type.typeExpression && node.type.typeExpression.type :
        node.type || (isInJSFile(node) ? getJSDocReturnType(node) : undefined);
}

/** @internal */
export function getJSDocTypeParameterDeclarations(node: DeclarationWithTypeParameters): readonly TypeParameterDeclaration[] {
    return flatMap(getJSDocTags(node), tag => isNonTypeAliasTemplate(tag) ? tag.typeParameters : undefined);
}

/** template tags are only available when a typedef isn't already using them */
function isNonTypeAliasTemplate(tag: JSDocTag): tag is JSDocTemplateTag {
    return isJSDocTemplateTag(tag) && !(tag.parent.kind === SyntaxKind.JSDoc && (tag.parent.tags!.some(isJSDocTypeAlias) || tag.parent.tags!.some(isJSDocOverloadTag)));
}

/**
 * Gets the effective type annotation of the value parameter of a set accessor. If the node
 * was parsed in a JavaScript file, gets the type annotation from JSDoc.
 *
 * @internal
 */
export function getEffectiveSetAccessorTypeAnnotationNode(node: SetAccessorDeclaration): TypeNode | undefined {
    const parameter = getSetAccessorValueParameter(node);
    return parameter && getEffectiveTypeAnnotationNode(parameter);
}

/** @internal */
export function emitNewLineBeforeLeadingComments(lineMap: readonly number[], writer: EmitTextWriter, node: TextRange, leadingComments: readonly CommentRange[] | undefined) {
    emitNewLineBeforeLeadingCommentsOfPosition(lineMap, writer, node.pos, leadingComments);
}

/** @internal */
export function emitNewLineBeforeLeadingCommentsOfPosition(lineMap: readonly number[], writer: EmitTextWriter, pos: number, leadingComments: readonly CommentRange[] | undefined) {
    // If the leading comments start on different line than the start of node, write new line
    if (
        leadingComments && leadingComments.length && pos !== leadingComments[0].pos &&
        getLineOfLocalPositionFromLineMap(lineMap, pos) !== getLineOfLocalPositionFromLineMap(lineMap, leadingComments[0].pos)
    ) {
        writer.writeLine();
    }
}

/** @internal */
export function emitNewLineBeforeLeadingCommentOfPosition(lineMap: readonly number[], writer: EmitTextWriter, pos: number, commentPos: number) {
    // If the leading comments start on different line than the start of node, write new line
    if (
        pos !== commentPos &&
        getLineOfLocalPositionFromLineMap(lineMap, pos) !== getLineOfLocalPositionFromLineMap(lineMap, commentPos)
    ) {
        writer.writeLine();
    }
}

/** @internal */
export function emitComments(
    text: string,
    lineMap: readonly number[],
    writer: EmitTextWriter,
    comments: readonly CommentRange[] | undefined,
    leadingSeparator: boolean,
    trailingSeparator: boolean,
    newLine: string,
    writeComment: (text: string, lineMap: readonly number[], writer: EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) => void,
) {
    if (comments && comments.length > 0) {
        if (leadingSeparator) {
            writer.writeSpace(" ");
        }

        let emitInterveningSeparator = false;
        for (const comment of comments) {
            if (emitInterveningSeparator) {
                writer.writeSpace(" ");
                emitInterveningSeparator = false;
            }

            writeComment(text, lineMap, writer, comment.pos, comment.end, newLine);
            if (comment.hasTrailingNewLine) {
                writer.writeLine();
            }
            else {
                emitInterveningSeparator = true;
            }
        }

        if (emitInterveningSeparator && trailingSeparator) {
            writer.writeSpace(" ");
        }
    }
}

/**
 * Detached comment is a comment at the top of file or function body that is separated from
 * the next statement by space.
 *
 * @internal
 */
export function emitDetachedComments(text: string, lineMap: readonly number[], writer: EmitTextWriter, writeComment: (text: string, lineMap: readonly number[], writer: EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) => void, node: TextRange, newLine: string, removeComments: boolean) {
    let leadingComments: CommentRange[] | undefined;
    let currentDetachedCommentInfo: { nodePos: number; detachedCommentEndPos: number; } | undefined;
    if (removeComments) {
        // removeComments is true, only reserve pinned comment at the top of file
        // For example:
        //      /*! Pinned Comment */
        //
        //      var x = 10;
        if (node.pos === 0) {
            leadingComments = filter(getLeadingCommentRanges(text, node.pos), isPinnedCommentLocal);
        }
    }
    else {
        // removeComments is false, just get detached as normal and bypass the process to filter comment
        leadingComments = getLeadingCommentRanges(text, node.pos);
    }

    if (leadingComments) {
        const detachedComments: CommentRange[] = [];
        let lastComment: CommentRange | undefined;

        for (const comment of leadingComments) {
            if (lastComment) {
                const lastCommentLine = getLineOfLocalPositionFromLineMap(lineMap, lastComment.end);
                const commentLine = getLineOfLocalPositionFromLineMap(lineMap, comment.pos);

                if (commentLine >= lastCommentLine + 2) {
                    // There was a blank line between the last comment and this comment.  This
                    // comment is not part of the copyright comments.  Return what we have so
                    // far.
                    break;
                }
            }

            detachedComments.push(comment);
            lastComment = comment;
        }

        if (detachedComments.length) {
            // All comments look like they could have been part of the copyright header.  Make
            // sure there is at least one blank line between it and the node.  If not, it's not
            // a copyright header.
            const lastCommentLine = getLineOfLocalPositionFromLineMap(lineMap, last(detachedComments).end);
            const nodeLine = getLineOfLocalPositionFromLineMap(lineMap, skipTrivia(text, node.pos));
            if (nodeLine >= lastCommentLine + 2) {
                // Valid detachedComments
                emitNewLineBeforeLeadingComments(lineMap, writer, node, leadingComments);
                emitComments(text, lineMap, writer, detachedComments, /*leadingSeparator*/ false, /*trailingSeparator*/ true, newLine, writeComment);
                currentDetachedCommentInfo = { nodePos: node.pos, detachedCommentEndPos: last(detachedComments).end };
            }
        }
    }

    return currentDetachedCommentInfo;

    function isPinnedCommentLocal(comment: CommentRange) {
        return isPinnedComment(text, comment.pos);
    }
}

/** @internal */
export function writeCommentRange(text: string, lineMap: readonly number[], writer: EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) {
    if (text.charCodeAt(commentPos + 1) === CharacterCodes.asterisk) {
        const firstCommentLineAndCharacter = computeLineAndCharacterOfPosition(lineMap, commentPos);
        const lineCount = lineMap.length;
        let firstCommentLineIndent: number | undefined;
        for (let pos = commentPos, currentLine = firstCommentLineAndCharacter.line; pos < commentEnd; currentLine++) {
            const nextLineStart = (currentLine + 1) === lineCount
                ? text.length + 1
                : lineMap[currentLine + 1];

            if (pos !== commentPos) {
                // If we are not emitting first line, we need to write the spaces to adjust the alignment
                if (firstCommentLineIndent === undefined) {
                    firstCommentLineIndent = calculateIndent(text, lineMap[firstCommentLineAndCharacter.line], commentPos);
                }

                // These are number of spaces writer is going to write at current indent
                const currentWriterIndentSpacing = writer.getIndent() * getIndentSize();

                // Number of spaces we want to be writing
                // eg: Assume writer indent
                // module m {
                //         /* starts at character 9 this is line 1
                //    * starts at character pos 4 line                        --1  = 8 - 8 + 3
                //   More left indented comment */                            --2  = 8 - 8 + 2
                //     class c { }
                // }
                // module m {
                //     /* this is line 1 -- Assume current writer indent 8
                //      * line                                                --3 = 8 - 4 + 5
                //            More right indented comment */                  --4 = 8 - 4 + 11
                //     class c { }
                // }
                const spacesToEmit = currentWriterIndentSpacing - firstCommentLineIndent + calculateIndent(text, pos, nextLineStart);
                if (spacesToEmit > 0) {
                    let numberOfSingleSpacesToEmit = spacesToEmit % getIndentSize();
                    const indentSizeSpaceString = getIndentString((spacesToEmit - numberOfSingleSpacesToEmit) / getIndentSize());

                    // Write indent size string ( in eg 1: = "", 2: "" , 3: string with 8 spaces 4: string with 12 spaces
                    writer.rawWrite(indentSizeSpaceString);

                    // Emit the single spaces (in eg: 1: 3 spaces, 2: 2 spaces, 3: 1 space, 4: 3 spaces)
                    while (numberOfSingleSpacesToEmit) {
                        writer.rawWrite(" ");
                        numberOfSingleSpacesToEmit--;
                    }
                }
                else {
                    // No spaces to emit write empty string
                    writer.rawWrite("");
                }
            }

            // Write the comment line text
            writeTrimmedCurrentLine(text, commentEnd, writer, newLine, pos, nextLineStart);

            pos = nextLineStart;
        }
    }
    else {
        // Single line comment of style //....
        writer.writeComment(text.substring(commentPos, commentEnd));
    }
}

function writeTrimmedCurrentLine(text: string, commentEnd: number, writer: EmitTextWriter, newLine: string, pos: number, nextLineStart: number) {
    const end = Math.min(commentEnd, nextLineStart - 1);
    const currentLineText = text.substring(pos, end).trim();
    if (currentLineText) {
        // trimmed forward and ending spaces text
        writer.writeComment(currentLineText);
        if (end !== commentEnd) {
            writer.writeLine();
        }
    }
    else {
        // Empty string - make sure we write empty line
        writer.rawWrite(newLine);
    }
}

function calculateIndent(text: string, pos: number, end: number) {
    let currentLineIndent = 0;
    for (; pos < end && isWhiteSpaceSingleLine(text.charCodeAt(pos)); pos++) {
        if (text.charCodeAt(pos) === CharacterCodes.tab) {
            // Tabs = TabSize = indent size and go to next tabStop
            currentLineIndent += getIndentSize() - (currentLineIndent % getIndentSize());
        }
        else {
            // Single space
            currentLineIndent++;
        }
    }

    return currentLineIndent;
}

/** @internal */
export function hasEffectiveModifiers(node: Node) {
    return getEffectiveModifierFlags(node) !== ModifierFlags.None;
}

/** @internal */
export function hasSyntacticModifiers(node: Node) {
    return getSyntacticModifierFlags(node) !== ModifierFlags.None;
}

/** @internal */
export function hasEffectiveModifier(node: Node, flags: ModifierFlags): boolean {
    return !!getSelectedEffectiveModifierFlags(node, flags);
}

/** @internal */
export function hasSyntacticModifier(node: Node, flags: ModifierFlags): boolean {
    return !!getSelectedSyntacticModifierFlags(node, flags);
}

/** @internal */
export function isStatic(node: Node) {
    // https://tc39.es/ecma262/#sec-static-semantics-isstatic
    return isClassElement(node) && hasStaticModifier(node) || isClassStaticBlockDeclaration(node);
}

/** @internal */
export function hasStaticModifier(node: Node): boolean {
    return hasSyntacticModifier(node, ModifierFlags.Static);
}

/** @internal */
export function hasOverrideModifier(node: Node): boolean {
    return hasEffectiveModifier(node, ModifierFlags.Override);
}

/** @internal */
export function hasAbstractModifier(node: Node): boolean {
    return hasSyntacticModifier(node, ModifierFlags.Abstract);
}

/** @internal */
export function hasAmbientModifier(node: Node): boolean {
    return hasSyntacticModifier(node, ModifierFlags.Ambient);
}

/** @internal */
export function hasAccessorModifier(node: Node): boolean {
    return hasSyntacticModifier(node, ModifierFlags.Accessor);
}

/** @internal */
export function hasEffectiveReadonlyModifier(node: Node): boolean {
    return hasEffectiveModifier(node, ModifierFlags.Readonly);
}

/** @internal */
export function hasDecorators(node: Node): boolean {
    return hasSyntacticModifier(node, ModifierFlags.Decorator);
}

/** @internal */
export function getSelectedEffectiveModifierFlags(node: Node, flags: ModifierFlags): ModifierFlags {
    return getEffectiveModifierFlags(node) & flags;
}

/** @internal */
export function getSelectedSyntacticModifierFlags(node: Node, flags: ModifierFlags): ModifierFlags {
    return getSyntacticModifierFlags(node) & flags;
}

function getModifierFlagsWorker(node: Node, includeJSDoc: boolean, alwaysIncludeJSDoc?: boolean): ModifierFlags {
    if (node.kind >= SyntaxKind.FirstToken && node.kind <= SyntaxKind.LastToken) {
        return ModifierFlags.None;
    }

    if (!(node.modifierFlagsCache & ModifierFlags.HasComputedFlags)) {
        node.modifierFlagsCache = getSyntacticModifierFlagsNoCache(node) | ModifierFlags.HasComputedFlags;
    }

    if (alwaysIncludeJSDoc || includeJSDoc && isInJSFile(node)) {
        if (!(node.modifierFlagsCache & ModifierFlags.HasComputedJSDocModifiers) && node.parent) {
            node.modifierFlagsCache |= getRawJSDocModifierFlagsNoCache(node) | ModifierFlags.HasComputedJSDocModifiers;
        }
        return selectEffectiveModifierFlags(node.modifierFlagsCache);
    }

    return selectSyntacticModifierFlags(node.modifierFlagsCache);
}

/**
 * Gets the effective ModifierFlags for the provided node, including JSDoc modifiers. The modifiers will be cached on the node to improve performance.
 *
 * NOTE: This function may use `parent` pointers.
 *
 * @internal
 */
export function getEffectiveModifierFlags(node: Node): ModifierFlags {
    return getModifierFlagsWorker(node, /*includeJSDoc*/ true);
}

/** @internal */
export function getEffectiveModifierFlagsAlwaysIncludeJSDoc(node: Node): ModifierFlags {
    return getModifierFlagsWorker(node, /*includeJSDoc*/ true, /*alwaysIncludeJSDoc*/ true);
}

/**
 * Gets the ModifierFlags for syntactic modifiers on the provided node. The modifiers will be cached on the node to improve performance.
 *
 * NOTE: This function does not use `parent` pointers and will not include modifiers from JSDoc.
 *
 * @internal
 */
export function getSyntacticModifierFlags(node: Node): ModifierFlags {
    return getModifierFlagsWorker(node, /*includeJSDoc*/ false);
}

function getRawJSDocModifierFlagsNoCache(node: Node): ModifierFlags {
    let flags = ModifierFlags.None;
    if (!!node.parent && !isParameter(node)) {
        if (isInJSFile(node)) {
            if (getJSDocPublicTagNoCache(node)) flags |= ModifierFlags.JSDocPublic;
            if (getJSDocPrivateTagNoCache(node)) flags |= ModifierFlags.JSDocPrivate;
            if (getJSDocProtectedTagNoCache(node)) flags |= ModifierFlags.JSDocProtected;
            if (getJSDocReadonlyTagNoCache(node)) flags |= ModifierFlags.JSDocReadonly;
            if (getJSDocOverrideTagNoCache(node)) flags |= ModifierFlags.JSDocOverride;
        }
        if (getJSDocDeprecatedTagNoCache(node)) flags |= ModifierFlags.Deprecated;
    }

    return flags;
}

function selectSyntacticModifierFlags(flags: ModifierFlags) {
    return flags & ModifierFlags.SyntacticModifiers;
}

function selectEffectiveModifierFlags(flags: ModifierFlags) {
    return (flags & ModifierFlags.NonCacheOnlyModifiers) |
        ((flags & ModifierFlags.JSDocCacheOnlyModifiers) >>> 23); // shift ModifierFlags.JSDoc* to match ModifierFlags.*
}

function getJSDocModifierFlagsNoCache(node: Node): ModifierFlags {
    return selectEffectiveModifierFlags(getRawJSDocModifierFlagsNoCache(node));
}

/**
 * Gets the effective ModifierFlags for the provided node, including JSDoc modifiers. The modifier flags cache on the node is ignored.
 *
 * NOTE: This function may use `parent` pointers.
 *
 * @internal
 */
export function getEffectiveModifierFlagsNoCache(node: Node): ModifierFlags {
    return getSyntacticModifierFlagsNoCache(node) | getJSDocModifierFlagsNoCache(node);
}

/**
 * Gets the ModifierFlags for syntactic modifiers on the provided node. The modifier flags cache on the node is ignored.
 *
 * NOTE: This function does not use `parent` pointers and will not include modifiers from JSDoc.
 *
 * @internal
 */
export function getSyntacticModifierFlagsNoCache(node: Node): ModifierFlags {
    let flags = canHaveModifiers(node) ? modifiersToFlags(node.modifiers) : ModifierFlags.None;
    if (node.flags & NodeFlags.NestedNamespace || node.kind === SyntaxKind.Identifier && node.flags & NodeFlags.IdentifierIsInJSDocNamespace) {
        flags |= ModifierFlags.Export;
    }
    return flags;
}

/** @internal */
export function modifiersToFlags(modifiers: readonly ModifierLike[] | undefined) {
    let flags = ModifierFlags.None;
    if (modifiers) {
        for (const modifier of modifiers) {
            flags |= modifierToFlag(modifier.kind);
        }
    }
    return flags;
}

/** @internal */
export function modifierToFlag(token: SyntaxKind): ModifierFlags {
    switch (token) {
        case SyntaxKind.StaticKeyword:
            return ModifierFlags.Static;
        case SyntaxKind.PublicKeyword:
            return ModifierFlags.Public;
        case SyntaxKind.ProtectedKeyword:
            return ModifierFlags.Protected;
        case SyntaxKind.PrivateKeyword:
            return ModifierFlags.Private;
        case SyntaxKind.AbstractKeyword:
            return ModifierFlags.Abstract;
        case SyntaxKind.AccessorKeyword:
            return ModifierFlags.Accessor;
        case SyntaxKind.ExportKeyword:
            return ModifierFlags.Export;
        case SyntaxKind.DeclareKeyword:
            return ModifierFlags.Ambient;
        case SyntaxKind.ConstKeyword:
            return ModifierFlags.Const;
        case SyntaxKind.DefaultKeyword:
            return ModifierFlags.Default;
        case SyntaxKind.AsyncKeyword:
            return ModifierFlags.Async;
        case SyntaxKind.ReadonlyKeyword:
            return ModifierFlags.Readonly;
        case SyntaxKind.OverrideKeyword:
            return ModifierFlags.Override;
        case SyntaxKind.InKeyword:
            return ModifierFlags.In;
        case SyntaxKind.OutKeyword:
            return ModifierFlags.Out;
        case SyntaxKind.Decorator:
            return ModifierFlags.Decorator;
    }
    return ModifierFlags.None;
}

function isBinaryLogicalOperator(token: SyntaxKind): boolean {
    return token === SyntaxKind.BarBarToken || token === SyntaxKind.AmpersandAmpersandToken;
}

/** @internal */
export function isLogicalOperator(token: SyntaxKind): boolean {
    return isBinaryLogicalOperator(token) || token === SyntaxKind.ExclamationToken;
}

/** @internal */
export function isLogicalOrCoalescingAssignmentOperator(token: SyntaxKind): token is LogicalOrCoalescingAssignmentOperator {
    return token === SyntaxKind.BarBarEqualsToken
        || token === SyntaxKind.AmpersandAmpersandEqualsToken
        || token === SyntaxKind.QuestionQuestionEqualsToken;
}

/** @internal */
export function isLogicalOrCoalescingAssignmentExpression(expr: Node): expr is AssignmentExpression<Token<LogicalOrCoalescingAssignmentOperator>> {
    return isBinaryExpression(expr) && isLogicalOrCoalescingAssignmentOperator(expr.operatorToken.kind);
}

/** @internal */
export function isLogicalOrCoalescingBinaryOperator(token: SyntaxKind): token is LogicalOperator | SyntaxKind.QuestionQuestionToken {
    return isBinaryLogicalOperator(token) || token === SyntaxKind.QuestionQuestionToken;
}

/** @internal */
export function isLogicalOrCoalescingBinaryExpression(expr: Node): expr is BinaryExpression {
    return isBinaryExpression(expr) && isLogicalOrCoalescingBinaryOperator(expr.operatorToken.kind);
}

/** @internal */
export function isAssignmentOperator(token: SyntaxKind): boolean {
    return token >= SyntaxKind.FirstAssignment && token <= SyntaxKind.LastAssignment;
}

/**
 * Get `C` given `N` if `N` is in the position `class C extends N` where `N` is an ExpressionWithTypeArguments.
 *
 * @internal
 */
export function tryGetClassExtendingExpressionWithTypeArguments(node: Node): ClassLikeDeclaration | undefined {
    const cls = tryGetClassImplementingOrExtendingExpressionWithTypeArguments(node);
    return cls && !cls.isImplements ? cls.class : undefined;
}

/** @internal */
export interface ClassImplementingOrExtendingExpressionWithTypeArguments {
    readonly class: ClassLikeDeclaration;
    readonly isImplements: boolean;
}
/** @internal */
export function tryGetClassImplementingOrExtendingExpressionWithTypeArguments(node: Node): ClassImplementingOrExtendingExpressionWithTypeArguments | undefined {
    if (isExpressionWithTypeArguments(node)) {
        if (isHeritageClause(node.parent) && isClassLike(node.parent.parent)) {
            return { class: node.parent.parent, isImplements: node.parent.token === SyntaxKind.ImplementsKeyword };
        }
        if (isJSDocAugmentsTag(node.parent)) {
            const host = getEffectiveJSDocHost(node.parent);
            if (host && isClassLike(host)) {
                return { class: host, isImplements: false };
            }
        }
    }
    return undefined;
}

/** @internal */
export function isAssignmentExpression(node: Node, excludeCompoundAssignment: true): node is AssignmentExpression<EqualsToken>;
/** @internal */
export function isAssignmentExpression(node: Node, excludeCompoundAssignment?: false): node is AssignmentExpression<AssignmentOperatorToken>;
/** @internal */
export function isAssignmentExpression(node: Node, excludeCompoundAssignment?: boolean): node is AssignmentExpression<AssignmentOperatorToken> {
    return isBinaryExpression(node)
        && (excludeCompoundAssignment
            ? node.operatorToken.kind === SyntaxKind.EqualsToken
            : isAssignmentOperator(node.operatorToken.kind))
        && isLeftHandSideExpression(node.left);
}

/** @internal */
export function isLeftHandSideOfAssignment(node: Node) {
    return isAssignmentExpression(node.parent) && node.parent.left === node;
}
/** @internal */
export function isDestructuringAssignment(node: Node): node is DestructuringAssignment {
    if (isAssignmentExpression(node, /*excludeCompoundAssignment*/ true)) {
        const kind = node.left.kind;
        return kind === SyntaxKind.ObjectLiteralExpression
            || kind === SyntaxKind.ArrayLiteralExpression;
    }

    return false;
}

/** @internal */
export function isExpressionWithTypeArgumentsInClassExtendsClause(node: Node): node is ExpressionWithTypeArguments {
    return tryGetClassExtendingExpressionWithTypeArguments(node) !== undefined;
}

/** @internal */
export function isEntityNameExpression(node: Node): node is EntityNameExpression {
    return node.kind === SyntaxKind.Identifier || isPropertyAccessEntityNameExpression(node);
}

/** @internal */
export function getFirstIdentifier(node: EntityNameOrEntityNameExpression): Identifier {
    switch (node.kind) {
        case SyntaxKind.Identifier:
            return node;
        case SyntaxKind.QualifiedName:
            do {
                node = node.left;
            }
            while (node.kind !== SyntaxKind.Identifier);
            return node;
        case SyntaxKind.PropertyAccessExpression:
            do {
                node = node.expression;
            }
            while (node.kind !== SyntaxKind.Identifier);
            return node;
    }
}

/** @internal */
export function isDottedName(node: Expression): boolean {
    return node.kind === SyntaxKind.Identifier
        || node.kind === SyntaxKind.ThisKeyword
        || node.kind === SyntaxKind.SuperKeyword
        || node.kind === SyntaxKind.MetaProperty
        || node.kind === SyntaxKind.PropertyAccessExpression && isDottedName((node as PropertyAccessExpression).expression)
        || node.kind === SyntaxKind.ParenthesizedExpression && isDottedName((node as ParenthesizedExpression).expression);
}

/** @internal */
export function isPropertyAccessEntityNameExpression(node: Node): node is PropertyAccessEntityNameExpression {
    return isPropertyAccessExpression(node) && isIdentifier(node.name) && isEntityNameExpression(node.expression);
}

/** @internal */
export function tryGetPropertyAccessOrIdentifierToString(expr: Expression | JsxTagNameExpression): string | undefined {
    if (isPropertyAccessExpression(expr)) {
        const baseStr = tryGetPropertyAccessOrIdentifierToString(expr.expression);
        if (baseStr !== undefined) {
            return baseStr + "." + entityNameToString(expr.name);
        }
    }
    else if (isElementAccessExpression(expr)) {
        const baseStr = tryGetPropertyAccessOrIdentifierToString(expr.expression);
        if (baseStr !== undefined && isPropertyName(expr.argumentExpression)) {
            return baseStr + "." + getPropertyNameForPropertyNameNode(expr.argumentExpression);
        }
    }
    else if (isIdentifier(expr)) {
        return unescapeLeadingUnderscores(expr.escapedText);
    }
    else if (isJsxNamespacedName(expr)) {
        return getTextOfJsxNamespacedName(expr);
    }
    return undefined;
}

/** @internal */
export function isPrototypeAccess(node: Node): node is BindableStaticAccessExpression {
    return isBindableStaticAccessExpression(node) && getElementOrPropertyAccessName(node) === "prototype";
}

/** @internal */
export function isRightSideOfQualifiedNameOrPropertyAccess(node: Node) {
    return (node.parent.kind === SyntaxKind.QualifiedName && (node.parent as QualifiedName).right === node) ||
        (node.parent.kind === SyntaxKind.PropertyAccessExpression && (node.parent as PropertyAccessExpression).name === node) ||
        (node.parent.kind === SyntaxKind.MetaProperty && (node.parent as MetaProperty).name === node);
}

/** @internal */
export function isRightSideOfAccessExpression(node: Node) {
    return !!node.parent && (isPropertyAccessExpression(node.parent) && node.parent.name === node
        || isElementAccessExpression(node.parent) && node.parent.argumentExpression === node);
}

/** @internal */
export function isRightSideOfQualifiedNameOrPropertyAccessOrJSDocMemberName(node: Node) {
    return isQualifiedName(node.parent) && node.parent.right === node
        || isPropertyAccessExpression(node.parent) && node.parent.name === node
        || isJSDocMemberName(node.parent) && node.parent.right === node;
}
/** @internal */
export function isInstanceOfExpression(node: Node): node is InstanceofExpression {
    return isBinaryExpression(node) && node.operatorToken.kind === SyntaxKind.InstanceOfKeyword;
}

/** @internal */
export function isRightSideOfInstanceofExpression(node: Node) {
    return isInstanceOfExpression(node.parent) && node === node.parent.right;
}

/** @internal */
export function isEmptyObjectLiteral(expression: Node): boolean {
    return expression.kind === SyntaxKind.ObjectLiteralExpression &&
        (expression as ObjectLiteralExpression).properties.length === 0;
}

/** @internal */
export function isEmptyArrayLiteral(expression: Node): boolean {
    return expression.kind === SyntaxKind.ArrayLiteralExpression &&
        (expression as ArrayLiteralExpression).elements.length === 0;
}

/** @internal */
export function getLocalSymbolForExportDefault(symbol: Symbol) {
    if (!isExportDefaultSymbol(symbol) || !symbol.declarations) return undefined;
    for (const decl of symbol.declarations) {
        if (decl.localSymbol) return decl.localSymbol;
    }
    return undefined;
}

function isExportDefaultSymbol(symbol: Symbol): boolean {
    return symbol && length(symbol.declarations) > 0 && hasSyntacticModifier(symbol.declarations![0], ModifierFlags.Default);
}

/**
 * Return ".ts", ".d.ts", or ".tsx", if that is the extension.
 *
 * @internal
 */
export function tryExtractTSExtension(fileName: string): string | undefined {
    return find(supportedTSExtensionsForExtractExtension, extension => fileExtensionIs(fileName, extension));
}
/**
 * Replace each instance of non-ascii characters by one, two, three, or four escape sequences
 * representing the UTF-8 encoding of the character, and return the expanded char code list.
 */
function getExpandedCharCodes(input: string): number[] {
    const output: number[] = [];
    const length = input.length;

    for (let i = 0; i < length; i++) {
        const charCode = input.charCodeAt(i);

        // handle utf8
        if (charCode < 0x80) {
            output.push(charCode);
        }
        else if (charCode < 0x800) {
            output.push((charCode >> 6) | 0B11000000);
            output.push((charCode & 0B00111111) | 0B10000000);
        }
        else if (charCode < 0x10000) {
            output.push((charCode >> 12) | 0B11100000);
            output.push(((charCode >> 6) & 0B00111111) | 0B10000000);
            output.push((charCode & 0B00111111) | 0B10000000);
        }
        else if (charCode < 0x20000) {
            output.push((charCode >> 18) | 0B11110000);
            output.push(((charCode >> 12) & 0B00111111) | 0B10000000);
            output.push(((charCode >> 6) & 0B00111111) | 0B10000000);
            output.push((charCode & 0B00111111) | 0B10000000);
        }
        else {
            Debug.assert(false, "Unexpected code point");
        }
    }

    return output;
}

const base64Digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

/**
 * Converts a string to a base-64 encoded ASCII string.
 *
 * @internal
 */
export function convertToBase64(input: string): string {
    let result = "";
    const charCodes = getExpandedCharCodes(input);
    let i = 0;
    const length = charCodes.length;
    let byte1: number, byte2: number, byte3: number, byte4: number;

    while (i < length) {
        // Convert every 6-bits in the input 3 character points
        // into a base64 digit
        byte1 = charCodes[i] >> 2;
        byte2 = (charCodes[i] & 0B00000011) << 4 | charCodes[i + 1] >> 4;
        byte3 = (charCodes[i + 1] & 0B00001111) << 2 | charCodes[i + 2] >> 6;
        byte4 = charCodes[i + 2] & 0B00111111;

        // We are out of characters in the input, set the extra
        // digits to 64 (padding character).
        if (i + 1 >= length) {
            byte3 = byte4 = 64;
        }
        else if (i + 2 >= length) {
            byte4 = 64;
        }

        // Write to the output
        result += base64Digits.charAt(byte1) + base64Digits.charAt(byte2) + base64Digits.charAt(byte3) + base64Digits.charAt(byte4);

        i += 3;
    }

    return result;
}

function getStringFromExpandedCharCodes(codes: number[]): string {
    let output = "";
    let i = 0;
    const length = codes.length;
    while (i < length) {
        const charCode = codes[i];

        if (charCode < 0x80) {
            output += String.fromCharCode(charCode);
            i++;
        }
        else if ((charCode & 0B11000000) === 0B11000000) {
            let value = charCode & 0B00111111;
            i++;
            let nextCode: number = codes[i];
            while ((nextCode & 0B11000000) === 0B10000000) {
                value = (value << 6) | (nextCode & 0B00111111);
                i++;
                nextCode = codes[i];
            }
            // `value` may be greater than 10FFFF (the maximum unicode codepoint) - JS will just make this into an invalid character for us
            output += String.fromCharCode(value);
        }
        else {
            // We don't want to kill the process when decoding fails (due to a following char byte not
            // following a leading char), so we just print the (bad) value
            output += String.fromCharCode(charCode);
            i++;
        }
    }
    return output;
}

/** @internal */
export function base64encode(host: { base64encode?(input: string): string; } | undefined, input: string): string {
    if (host && host.base64encode) {
        return host.base64encode(input);
    }
    return convertToBase64(input);
}

/** @internal */
export function base64decode(host: { base64decode?(input: string): string; } | undefined, input: string): string {
    if (host && host.base64decode) {
        return host.base64decode(input);
    }
    const length = input.length;
    const expandedCharCodes: number[] = [];
    let i = 0;
    while (i < length) {
        // Stop decoding once padding characters are present
        if (input.charCodeAt(i) === base64Digits.charCodeAt(64)) {
            break;
        }
        // convert 4 input digits into three characters, ignoring padding characters at the end
        const ch1 = base64Digits.indexOf(input[i]);
        const ch2 = base64Digits.indexOf(input[i + 1]);
        const ch3 = base64Digits.indexOf(input[i + 2]);
        const ch4 = base64Digits.indexOf(input[i + 3]);

        const code1 = ((ch1 & 0B00111111) << 2) | ((ch2 >> 4) & 0B00000011);
        const code2 = ((ch2 & 0B00001111) << 4) | ((ch3 >> 2) & 0B00001111);
        const code3 = ((ch3 & 0B00000011) << 6) | (ch4 & 0B00111111);

        if (code2 === 0 && ch3 !== 0) { // code2 decoded to zero, but ch3 was padding - elide code2 and code3
            expandedCharCodes.push(code1);
        }
        else if (code3 === 0 && ch4 !== 0) { // code3 decoded to zero, but ch4 was padding, elide code3
            expandedCharCodes.push(code1, code2);
        }
        else {
            expandedCharCodes.push(code1, code2, code3);
        }
        i += 4;
    }
    return getStringFromExpandedCharCodes(expandedCharCodes);
}

/** @internal */
export function readJsonOrUndefined(path: string, hostOrText: { readFile(fileName: string): string | undefined; } | string): object | undefined {
    const jsonText = isString(hostOrText) ? hostOrText : hostOrText.readFile(path);
    if (!jsonText) return undefined;
    // gracefully handle if readFile fails or returns not JSON
    const result = parseConfigFileTextToJson(path, jsonText);
    return !result.error ? result.config : undefined;
}

/** @internal */
export function readJson(path: string, host: { readFile(fileName: string): string | undefined; }): object {
    return readJsonOrUndefined(path, host) || {};
}

/** @internal */
export function tryParseJson(text: string) {
    try {
        return JSON.parse(text);
    }
    catch {
        return undefined;
    }
}

/** @internal */
export function directoryProbablyExists(directoryName: string, host: { directoryExists?: (directoryName: string) => boolean; }): boolean {
    // if host does not support 'directoryExists' assume that directory will exist
    return !host.directoryExists || host.directoryExists(directoryName);
}

const carriageReturnLineFeed = "\r\n";
const lineFeed = "\n";
/** @internal */
export function getNewLineCharacter(options: CompilerOptions | PrinterOptions): string {
    switch (options.newLine) {
        case NewLineKind.CarriageReturnLineFeed:
            return carriageReturnLineFeed;
        case NewLineKind.LineFeed:
        case undefined:
            return lineFeed;
    }
}

/**
 * Creates a new TextRange from the provided pos and end.
 *
 * @param pos The start position.
 * @param end The end position.
 *
 * @internal
 */
export function createRange(pos: number, end: number = pos): TextRange {
    Debug.assert(end >= pos || end === -1);
    return { pos, end };
}

/**
 * Creates a new TextRange from a provided range with a new end position.
 *
 * @param range A TextRange.
 * @param end The new end position.
 *
 * @internal
 */
export function moveRangeEnd(range: TextRange, end: number): TextRange {
    return createRange(range.pos, end);
}

/**
 * Creates a new TextRange from a provided range with a new start position.
 *
 * @param range A TextRange.
 * @param pos The new Start position.
 *
 * @internal
 */
export function moveRangePos(range: TextRange, pos: number): TextRange {
    return createRange(pos, range.end);
}

/**
 * Moves the start position of a range past any decorators.
 *
 * @internal
 */
export function moveRangePastDecorators(node: Node): TextRange {
    const lastDecorator = canHaveModifiers(node) ? findLast(node.modifiers, isDecorator) : undefined;
    return lastDecorator && !positionIsSynthesized(lastDecorator.end)
        ? moveRangePos(node, lastDecorator.end)
        : node;
}

/**
 * Moves the start position of a range past any decorators or modifiers.
 *
 * @internal
 */
export function moveRangePastModifiers(node: Node): TextRange {
    if (isPropertyDeclaration(node) || isMethodDeclaration(node)) {
        return moveRangePos(node, node.name.pos);
    }

    const lastModifier = canHaveModifiers(node) ? lastOrUndefined(node.modifiers) : undefined;
    return lastModifier && !positionIsSynthesized(lastModifier.end)
        ? moveRangePos(node, lastModifier.end)
        : moveRangePastDecorators(node);
}

/**
 * Determines whether a TextRange has the same start and end positions.
 *
 * @param range A TextRange.
 *
 * @internal
 */
export function isCollapsedRange(range: TextRange) {
    return range.pos === range.end;
}

/**
 * Creates a new TextRange for a token at the provides start position.
 *
 * @param pos The start position.
 * @param token The token.
 *
 * @internal
 */
export function createTokenRange(pos: number, token: SyntaxKind): TextRange {
    return createRange(pos, pos + tokenToString(token)!.length);
}

/** @internal */
export function rangeIsOnSingleLine(range: TextRange, sourceFile: SourceFile) {
    return rangeStartIsOnSameLineAsRangeEnd(range, range, sourceFile);
}

/** @internal */
export function rangeStartPositionsAreOnSameLine(range1: TextRange, range2: TextRange, sourceFile: SourceFile) {
    return positionsAreOnSameLine(
        getStartPositionOfRange(range1, sourceFile, /*includeComments*/ false),
        getStartPositionOfRange(range2, sourceFile, /*includeComments*/ false),
        sourceFile,
    );
}

/** @internal */
export function rangeEndPositionsAreOnSameLine(range1: TextRange, range2: TextRange, sourceFile: SourceFile) {
    return positionsAreOnSameLine(range1.end, range2.end, sourceFile);
}

/** @internal */
export function rangeStartIsOnSameLineAsRangeEnd(range1: TextRange, range2: TextRange, sourceFile: SourceFile) {
    return positionsAreOnSameLine(getStartPositionOfRange(range1, sourceFile, /*includeComments*/ false), range2.end, sourceFile);
}

/** @internal */
export function rangeEndIsOnSameLineAsRangeStart(range1: TextRange, range2: TextRange, sourceFile: SourceFile) {
    return positionsAreOnSameLine(range1.end, getStartPositionOfRange(range2, sourceFile, /*includeComments*/ false), sourceFile);
}

/** @internal */
export function getLinesBetweenRangeEndAndRangeStart(range1: TextRange, range2: TextRange, sourceFile: SourceFile, includeSecondRangeComments: boolean) {
    const range2Start = getStartPositionOfRange(range2, sourceFile, includeSecondRangeComments);
    return getLinesBetweenPositions(sourceFile, range1.end, range2Start);
}

/** @internal */
export function getLinesBetweenRangeEndPositions(range1: TextRange, range2: TextRange, sourceFile: SourceFile) {
    return getLinesBetweenPositions(sourceFile, range1.end, range2.end);
}

/** @internal */
export function isNodeArrayMultiLine(list: NodeArray<Node>, sourceFile: SourceFile): boolean {
    return !positionsAreOnSameLine(list.pos, list.end, sourceFile);
}

/** @internal */
export function positionsAreOnSameLine(pos1: number, pos2: number, sourceFile: SourceFile) {
    return getLinesBetweenPositions(sourceFile, pos1, pos2) === 0;
}

/** @internal */
export function getStartPositionOfRange(range: TextRange, sourceFile: SourceFile, includeComments: boolean) {
    return positionIsSynthesized(range.pos) ? -1 : skipTrivia(sourceFile.text, range.pos, /*stopAfterLineBreak*/ false, includeComments);
}

/** @internal */
export function getLinesBetweenPositionAndPrecedingNonWhitespaceCharacter(pos: number, stopPos: number, sourceFile: SourceFile, includeComments?: boolean) {
    const startPos = skipTrivia(sourceFile.text, pos, /*stopAfterLineBreak*/ false, includeComments);
    const prevPos = getPreviousNonWhitespacePosition(startPos, stopPos, sourceFile);
    return getLinesBetweenPositions(sourceFile, prevPos ?? stopPos, startPos);
}

/** @internal */
export function getLinesBetweenPositionAndNextNonWhitespaceCharacter(pos: number, stopPos: number, sourceFile: SourceFile, includeComments?: boolean) {
    const nextPos = skipTrivia(sourceFile.text, pos, /*stopAfterLineBreak*/ false, includeComments);
    return getLinesBetweenPositions(sourceFile, pos, Math.min(stopPos, nextPos));
}

function getPreviousNonWhitespacePosition(pos: number, stopPos = 0, sourceFile: SourceFile) {
    while (pos-- > stopPos) {
        if (!isWhiteSpaceLike(sourceFile.text.charCodeAt(pos))) {
            return pos;
        }
    }
}

/**
 * Determines whether a name was originally the declaration name of an enum or namespace
 * declaration.
 *
 * @internal
 */
export function isDeclarationNameOfEnumOrNamespace(node: Identifier) {
    const parseNode = getParseTreeNode(node);
    if (parseNode) {
        switch (parseNode.parent.kind) {
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.ModuleDeclaration:
                return parseNode === (parseNode.parent as EnumDeclaration | ModuleDeclaration).name;
        }
    }
    return false;
}

/** @internal */
export function getInitializedVariables(node: VariableDeclarationList) {
    return filter(node.declarations, isInitializedVariable);
}

/** @internal */
export function isInitializedVariable(node: Node): node is InitializedVariableDeclaration {
    return isVariableDeclaration(node) && node.initializer !== undefined;
}

/** @internal */
export function isWatchSet(options: CompilerOptions) {
    // Firefox has Object.prototype.watch
    return options.watch && hasProperty(options, "watch");
}

/** @internal */
export function closeFileWatcher(watcher: FileWatcher) {
    watcher.close();
}

/** @internal */
export function getCheckFlags(symbol: Symbol): CheckFlags {
    return symbol.flags & SymbolFlags.Transient ? (symbol as TransientSymbol).links.checkFlags : 0;
}

/** @internal */
export function getDeclarationModifierFlagsFromSymbol(s: Symbol, isWrite = false): ModifierFlags {
    if (s.valueDeclaration) {
        const declaration = (isWrite && s.declarations && find(s.declarations, isSetAccessorDeclaration))
            || (s.flags & SymbolFlags.GetAccessor && find(s.declarations, isGetAccessorDeclaration)) || s.valueDeclaration;
        const flags = getCombinedModifierFlags(declaration);
        return s.parent && s.parent.flags & SymbolFlags.Class ? flags : flags & ~ModifierFlags.AccessibilityModifier;
    }
    if (getCheckFlags(s) & CheckFlags.Synthetic) {
        // NOTE: potentially unchecked cast to TransientSymbol
        const checkFlags = (s as TransientSymbol).links.checkFlags;
        const accessModifier = checkFlags & CheckFlags.ContainsPrivate ? ModifierFlags.Private :
            checkFlags & CheckFlags.ContainsPublic ? ModifierFlags.Public :
            ModifierFlags.Protected;
        const staticModifier = checkFlags & CheckFlags.ContainsStatic ? ModifierFlags.Static : 0;
        return accessModifier | staticModifier;
    }
    if (s.flags & SymbolFlags.Prototype) {
        return ModifierFlags.Public | ModifierFlags.Static;
    }
    return 0;
}

/** @internal */
export function skipAlias(symbol: Symbol, checker: TypeChecker) {
    return symbol.flags & SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
}

/**
 * See comment on `declareModuleMember` in `binder.ts`.
 *
 * @internal
 */
export function getCombinedLocalAndExportSymbolFlags(symbol: Symbol): SymbolFlags {
    return symbol.exportSymbol ? symbol.exportSymbol.flags | symbol.flags : symbol.flags;
}

/** @internal */
export function isWriteOnlyAccess(node: Node) {
    return accessKind(node) === AccessKind.Write;
}

/** @internal */
export function isWriteAccess(node: Node) {
    return accessKind(node) !== AccessKind.Read;
}

const enum AccessKind {
    /** Only reads from a variable. */
    Read,
    /** Only writes to a variable without ever reading it. E.g.: `x=1;`. */
    Write,
    /** Reads from and writes to a variable. E.g.: `f(x++);`, `x/=1`. */
    ReadWrite,
}
function accessKind(node: Node): AccessKind {
    const { parent } = node;

    switch (parent?.kind) {
        case SyntaxKind.ParenthesizedExpression:
            return accessKind(parent);
        case SyntaxKind.PostfixUnaryExpression:
        case SyntaxKind.PrefixUnaryExpression:
            const { operator } = parent as PrefixUnaryExpression | PostfixUnaryExpression;
            return operator === SyntaxKind.PlusPlusToken || operator === SyntaxKind.MinusMinusToken ? AccessKind.ReadWrite : AccessKind.Read;
        case SyntaxKind.BinaryExpression:
            const { left, operatorToken } = parent as BinaryExpression;
            return left === node && isAssignmentOperator(operatorToken.kind) ?
                operatorToken.kind === SyntaxKind.EqualsToken ? AccessKind.Write : AccessKind.ReadWrite
                : AccessKind.Read;
        case SyntaxKind.PropertyAccessExpression:
            return (parent as PropertyAccessExpression).name !== node ? AccessKind.Read : accessKind(parent);
        case SyntaxKind.PropertyAssignment: {
            const parentAccess = accessKind(parent.parent);
            // In `({ x: varname }) = { x: 1 }`, the left `x` is a read, the right `x` is a write.
            return node === (parent as PropertyAssignment).name ? reverseAccessKind(parentAccess) : parentAccess;
        }
        case SyntaxKind.ShorthandPropertyAssignment:
            // Assume it's the local variable being accessed, since we don't check public properties for --noUnusedLocals.
            return node === (parent as ShorthandPropertyAssignment).objectAssignmentInitializer ? AccessKind.Read : accessKind(parent.parent);
        case SyntaxKind.ArrayLiteralExpression:
            return accessKind(parent);
        default:
            return AccessKind.Read;
    }
}
function reverseAccessKind(a: AccessKind): AccessKind {
    switch (a) {
        case AccessKind.Read:
            return AccessKind.Write;
        case AccessKind.Write:
            return AccessKind.Read;
        case AccessKind.ReadWrite:
            return AccessKind.ReadWrite;
        default:
            return Debug.assertNever(a);
    }
}

/** @internal */
export function compareDataObjects(dst: any, src: any): boolean {
    if (!dst || !src || Object.keys(dst).length !== Object.keys(src).length) {
        return false;
    }

    for (const e in dst) {
        if (typeof dst[e] === "object") {
            if (!compareDataObjects(dst[e], src[e])) {
                return false;
            }
        }
        else if (typeof dst[e] !== "function") {
            if (dst[e] !== src[e]) {
                return false;
            }
        }
    }
    return true;
}

/**
 * clears already present map by calling onDeleteExistingValue callback before deleting that key/value
 *
 * @internal
 */
export function clearMap<K, T>(map: { forEach: Map<K, T>["forEach"]; clear: Map<K, T>["clear"]; }, onDeleteValue: (valueInMap: T, key: K) => void) {
    // Remove all
    map.forEach(onDeleteValue);
    map.clear();
}

/** @internal */
export interface MutateMapSkippingNewValuesDelete<K, T> {
    onDeleteValue(existingValue: T, key: K): void;
}

/** @internal */
export interface MutateMapSkippingNewValuesOptions<K, T, U> extends MutateMapSkippingNewValuesDelete<K, T> {
    /**
     * If present this is called with the key when there is value for that key both in new map as well as existing map provided
     * Caller can then decide to update or remove this key.
     * If the key is removed, caller will get callback of createNewValue for that key.
     * If this callback is not provided, the value of such keys is not updated.
     */
    onExistingValue?(existingValue: T, valueInNewMap: U, key: K): void;
}

/**
 * Mutates the map with newMap such that keys in map will be same as newMap.
 *
 * @internal
 */
export function mutateMapSkippingNewValues<K, T>(
    map: Map<K, T>,
    newMap: ReadonlySet<K> | undefined,
    options: MutateMapSkippingNewValuesDelete<K, T>,
): void;
/** @internal */
export function mutateMapSkippingNewValues<K, T, U>(
    map: Map<K, T>,
    newMap: ReadonlyMap<K, U> | undefined,
    options: MutateMapSkippingNewValuesOptions<K, T, U>,
): void;
export function mutateMapSkippingNewValues<K, T, U>(
    map: Map<K, T>,
    newMap: ReadonlyMap<K, U> | ReadonlySet<K> | undefined,
    options: MutateMapSkippingNewValuesOptions<K, T, U>,
) {
    const { onDeleteValue, onExistingValue } = options;
    // Needs update
    map.forEach((existingValue, key) => {
        // Not present any more in new map, remove it
        if (!newMap?.has(key)) {
            map.delete(key);
            onDeleteValue(existingValue, key);
        }
        // If present notify about existing values
        else if (onExistingValue) {
            onExistingValue(existingValue, (newMap as Map<K, U>).get?.(key)!, key);
        }
    });
}

/** @internal */
export interface MutateMapOptionsCreate<K, T, U> {
    createNewValue(key: K, valueInNewMap: U): T;
}

/** @internal */
export interface MutateMapWithNewSetOptions<K, T> extends MutateMapSkippingNewValuesDelete<K, T>, MutateMapOptionsCreate<K, T, K> {
}

/** @internal */
export interface MutateMapOptions<K, T, U> extends MutateMapSkippingNewValuesOptions<K, T, U>, MutateMapOptionsCreate<K, T, U> {
}

/**
 * Mutates the map with newMap such that keys in map will be same as newMap.
 *
 * @internal
 */
export function mutateMap<K, T>(map: Map<K, T>, newMap: ReadonlySet<K> | undefined, options: MutateMapWithNewSetOptions<K, T>): void;
/** @internal */
export function mutateMap<K, T, U>(map: Map<K, T>, newMap: ReadonlyMap<K, U> | undefined, options: MutateMapOptions<K, T, U>): void;
export function mutateMap<K, T, U>(map: Map<K, T>, newMap: ReadonlyMap<K, U> | ReadonlySet<K> | undefined, options: MutateMapOptions<K, T, U>) {
    // Needs update
    mutateMapSkippingNewValues(map, newMap as ReadonlyMap<K, U>, options);

    const { createNewValue } = options;
    // Add new values that are not already present
    newMap?.forEach((valueInNewMap, key) => {
        if (!map.has(key)) {
            // New values
            map.set(key, createNewValue(key, valueInNewMap as U & K));
        }
    });
}

/** @internal */
export function isAbstractConstructorSymbol(symbol: Symbol): boolean {
    if (symbol.flags & SymbolFlags.Class) {
        const declaration = getClassLikeDeclarationOfSymbol(symbol);
        return !!declaration && hasSyntacticModifier(declaration, ModifierFlags.Abstract);
    }
    return false;
}

/** @internal */
export function getClassLikeDeclarationOfSymbol(symbol: Symbol): ClassLikeDeclaration | undefined {
    return symbol.declarations?.find(isClassLike);
}

/** @internal */
export function getObjectFlags(type: Type): ObjectFlags {
    return type.flags & TypeFlags.ObjectFlagsType ? (type as ObjectFlagsType).objectFlags : 0;
}

/** @internal */
export function forSomeAncestorDirectory(directory: string, callback: (directory: string) => boolean): boolean {
    return !!forEachAncestorDirectory(directory, d => callback(d) ? true : undefined);
}

/** @internal */
export function isUMDExportSymbol(symbol: Symbol | undefined): boolean {
    return !!symbol && !!symbol.declarations && !!symbol.declarations[0] && isNamespaceExportDeclaration(symbol.declarations[0]);
}

/** @internal */
export function showModuleSpecifier({ moduleSpecifier }: ImportDeclaration): string {
    return isStringLiteral(moduleSpecifier) ? moduleSpecifier.text : getTextOfNode(moduleSpecifier);
}

/** @internal */
export function getLastChild(node: Node): Node | undefined {
    let lastChild: Node | undefined;
    forEachChild(node, child => {
        if (nodeIsPresent(child)) lastChild = child;
    }, children => {
        // As an optimization, jump straight to the end of the list.
        for (let i = children.length - 1; i >= 0; i--) {
            if (nodeIsPresent(children[i])) {
                lastChild = children[i];
                break;
            }
        }
    });
    return lastChild;
}

/**
 * Add a value to a set, and return true if it wasn't already present.
 *
 * @internal
 */
export function addToSeen<K>(seen: Map<K, true>, key: K): boolean;
/** @internal */
export function addToSeen<K, T>(seen: Map<K, T>, key: K, value: T): boolean;
/** @internal */
export function addToSeen<K, T>(seen: Map<K, T>, key: K, value: T = true as any): boolean {
    if (seen.has(key)) {
        return false;
    }
    seen.set(key, value);
    return true;
}

/** @internal */
export function isObjectTypeDeclaration(node: Node): node is ObjectTypeDeclaration {
    return isClassLike(node) || isInterfaceDeclaration(node) || isTypeLiteralNode(node);
}

/** @internal */
export function isTypeNodeKind(kind: SyntaxKind): kind is TypeNodeSyntaxKind {
    return (kind >= SyntaxKind.FirstTypeNode && kind <= SyntaxKind.LastTypeNode)
        || kind === SyntaxKind.AnyKeyword
        || kind === SyntaxKind.UnknownKeyword
        || kind === SyntaxKind.NumberKeyword
        || kind === SyntaxKind.BigIntKeyword
        || kind === SyntaxKind.ObjectKeyword
        || kind === SyntaxKind.BooleanKeyword
        || kind === SyntaxKind.StringKeyword
        || kind === SyntaxKind.SymbolKeyword
        || kind === SyntaxKind.VoidKeyword
        || kind === SyntaxKind.UndefinedKeyword
        || kind === SyntaxKind.NeverKeyword
        || kind === SyntaxKind.IntrinsicKeyword
        || kind === SyntaxKind.ExpressionWithTypeArguments
        || kind === SyntaxKind.JSDocAllType
        || kind === SyntaxKind.JSDocUnknownType
        || kind === SyntaxKind.JSDocNullableType
        || kind === SyntaxKind.JSDocNonNullableType
        || kind === SyntaxKind.JSDocOptionalType
        || kind === SyntaxKind.JSDocFunctionType
        || kind === SyntaxKind.JSDocVariadicType;
}

/** @internal */
export function isAccessExpression(node: Node): node is AccessExpression {
    return node.kind === SyntaxKind.PropertyAccessExpression || node.kind === SyntaxKind.ElementAccessExpression;
}

/** @internal */
export function getNameOfAccessExpression(node: AccessExpression) {
    if (node.kind === SyntaxKind.PropertyAccessExpression) {
        return node.name;
    }
    Debug.assert(node.kind === SyntaxKind.ElementAccessExpression);
    return node.argumentExpression;
}

/** @deprecated @internal */
export function isBundleFileTextLike(section: BundleFileSection): section is BundleFileTextLike {
    switch (section.kind) {
        case BundleFileSectionKind.Text:
        case BundleFileSectionKind.Internal:
            return true;
        default:
            return false;
    }
}

/** @internal */
export function isNamedImportsOrExports(node: Node): node is NamedImportsOrExports {
    return node.kind === SyntaxKind.NamedImports || node.kind === SyntaxKind.NamedExports;
}

/** @internal */
export function getLeftmostAccessExpression(expr: Expression): Expression {
    while (isAccessExpression(expr)) {
        expr = expr.expression;
    }
    return expr;
}

/** @internal */
export function forEachNameInAccessChainWalkingLeft<T>(name: MemberName | StringLiteralLike, action: (name: MemberName | StringLiteralLike) => T | undefined): T | undefined {
    if (isAccessExpression(name.parent) && isRightSideOfAccessExpression(name)) {
        return walkAccessExpression(name.parent);
    }

    function walkAccessExpression(access: AccessExpression): T | undefined {
        if (access.kind === SyntaxKind.PropertyAccessExpression) {
            const res = action(access.name);
            if (res !== undefined) {
                return res;
            }
        }
        else if (access.kind === SyntaxKind.ElementAccessExpression) {
            if (isIdentifier(access.argumentExpression) || isStringLiteralLike(access.argumentExpression)) {
                const res = action(access.argumentExpression);
                if (res !== undefined) {
                    return res;
                }
            }
            else {
                // Chain interrupted by non-static-name access 'x[expr()].y.z'
                return undefined;
            }
        }

        if (isAccessExpression(access.expression)) {
            return walkAccessExpression(access.expression);
        }
        if (isIdentifier(access.expression)) {
            // End of chain at Identifier 'x.y.z'
            return action(access.expression);
        }
        // End of chain at non-Identifier 'x().y.z'
        return undefined;
    }
}

/** @internal */
export function getLeftmostExpression(node: Expression, stopAtCallExpressions: boolean) {
    while (true) {
        switch (node.kind) {
            case SyntaxKind.PostfixUnaryExpression:
                node = (node as PostfixUnaryExpression).operand;
                continue;

            case SyntaxKind.BinaryExpression:
                node = (node as BinaryExpression).left;
                continue;

            case SyntaxKind.ConditionalExpression:
                node = (node as ConditionalExpression).condition;
                continue;

            case SyntaxKind.TaggedTemplateExpression:
                node = (node as TaggedTemplateExpression).tag;
                continue;

            case SyntaxKind.CallExpression:
                if (stopAtCallExpressions) {
                    return node;
                }
                // falls through
            case SyntaxKind.AsExpression:
            case SyntaxKind.ElementAccessExpression:
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.NonNullExpression:
            case SyntaxKind.PartiallyEmittedExpression:
            case SyntaxKind.SatisfiesExpression:
                node = (node as CallExpression | PropertyAccessExpression | ElementAccessExpression | AsExpression | NonNullExpression | PartiallyEmittedExpression | SatisfiesExpression).expression;
                continue;
        }

        return node;
    }
}

/** @internal */
export interface ObjectAllocator {
    getNodeConstructor(): new (kind: SyntaxKind, pos: number, end: number) => Node;
    getTokenConstructor(): new <TKind extends SyntaxKind>(kind: TKind, pos: number, end: number) => Token<TKind>;
    getIdentifierConstructor(): new (kind: SyntaxKind.Identifier, pos: number, end: number) => Identifier;
    getPrivateIdentifierConstructor(): new (kind: SyntaxKind.PrivateIdentifier, pos: number, end: number) => PrivateIdentifier;
    getSourceFileConstructor(): new (kind: SyntaxKind.SourceFile, pos: number, end: number) => SourceFile;
    getSymbolConstructor(): new (flags: SymbolFlags, name: __String) => Symbol;
    getTypeConstructor(): new (checker: TypeChecker, flags: TypeFlags) => Type;
    getSignatureConstructor(): new (checker: TypeChecker, flags: SignatureFlags) => Signature;
    getSourceMapSourceConstructor(): new (fileName: string, text: string, skipTrivia?: (pos: number) => number) => SourceMapSource;
}

function Symbol(this: Symbol, flags: SymbolFlags, name: __String) {
    this.flags = flags;
    this.escapedName = name;
    this.declarations = undefined;
    this.valueDeclaration = undefined;
    this.id = 0;
    this.mergeId = 0;
    this.parent = undefined;
    this.members = undefined;
    this.exports = undefined;
    this.exportSymbol = undefined;
    this.constEnumOnlyModule = undefined;
    this.isReferenced = undefined;
    this.isAssigned = undefined;
    (this as any).links = undefined; // used by TransientSymbol
}

function Type(this: Type, checker: TypeChecker, flags: TypeFlags) {
    this.flags = flags;
    if (Debug.isDebugging || tracing) {
        this.checker = checker;
    }
}

function Signature(this: Signature, checker: TypeChecker, flags: SignatureFlags) {
    this.flags = flags;
    if (Debug.isDebugging) {
        this.checker = checker;
    }
}

function Node(this: Mutable<Node>, kind: SyntaxKind, pos: number, end: number) {
    this.pos = pos;
    this.end = end;
    this.kind = kind;
    this.id = 0;
    this.flags = NodeFlags.None;
    this.modifierFlagsCache = ModifierFlags.None;
    this.transformFlags = TransformFlags.None;
    this.parent = undefined!;
    this.original = undefined;
    this.emitNode = undefined;
}

function Token(this: Mutable<Node>, kind: SyntaxKind, pos: number, end: number) {
    this.pos = pos;
    this.end = end;
    this.kind = kind;
    this.id = 0;
    this.flags = NodeFlags.None;
    this.transformFlags = TransformFlags.None;
    this.parent = undefined!;
    this.emitNode = undefined;
}

function Identifier(this: Mutable<Node>, kind: SyntaxKind, pos: number, end: number) {
    this.pos = pos;
    this.end = end;
    this.kind = kind;
    this.id = 0;
    this.flags = NodeFlags.None;
    this.transformFlags = TransformFlags.None;
    this.parent = undefined!;
    this.original = undefined;
    this.emitNode = undefined;
}

function SourceMapSource(this: SourceMapSource, fileName: string, text: string, skipTrivia?: (pos: number) => number) {
    this.fileName = fileName;
    this.text = text;
    this.skipTrivia = skipTrivia || (pos => pos);
}

/** @internal */
export const objectAllocator: ObjectAllocator = {
    getNodeConstructor: () => Node as any,
    getTokenConstructor: () => Token as any,
    getIdentifierConstructor: () => Identifier as any,
    getPrivateIdentifierConstructor: () => Node as any,
    getSourceFileConstructor: () => Node as any,
    getSymbolConstructor: () => Symbol as any,
    getTypeConstructor: () => Type as any,
    getSignatureConstructor: () => Signature as any,
    getSourceMapSourceConstructor: () => SourceMapSource as any,
};

const objectAllocatorPatchers: ((objectAllocator: ObjectAllocator) => void)[] = [];

/**
 * Used by `deprecatedCompat` to patch the object allocator to apply deprecations.
 * @internal
 */
export function addObjectAllocatorPatcher(fn: (objectAllocator: ObjectAllocator) => void) {
    objectAllocatorPatchers.push(fn);
    fn(objectAllocator);
}

/** @internal */
export function setObjectAllocator(alloc: ObjectAllocator) {
    Object.assign(objectAllocator, alloc);
    forEach(objectAllocatorPatchers, fn => fn(objectAllocator));
}

/** @internal */
export function formatStringFromArgs(text: string, args: DiagnosticArguments): string {
    return text.replace(/{(\d+)}/g, (_match, index: string) => "" + Debug.checkDefined(args[+index]));
}

let localizedDiagnosticMessages: MapLike<string> | undefined;

/** @internal */
export function setLocalizedDiagnosticMessages(messages: MapLike<string> | undefined) {
    localizedDiagnosticMessages = messages;
}

/** @internal */
// If the localized messages json is unset, and if given function use it to set the json

export function maybeSetLocalizedDiagnosticMessages(getMessages: undefined | (() => MapLike<string> | undefined)) {
    if (!localizedDiagnosticMessages && getMessages) {
        localizedDiagnosticMessages = getMessages();
    }
}

/** @internal */
export function getLocaleSpecificMessage(message: DiagnosticMessage) {
    return localizedDiagnosticMessages && localizedDiagnosticMessages[message.key] || message.message;
}

/** @internal */
export function createDetachedDiagnostic(fileName: string, sourceText: string, start: number, length: number, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithDetachedLocation {
    if ((start + length) > sourceText.length) {
        length = sourceText.length - start;
    }

    assertDiagnosticLocation(sourceText, start, length);
    let text = getLocaleSpecificMessage(message);

    if (some(args)) {
        text = formatStringFromArgs(text, args);
    }

    return {
        file: undefined,
        start,
        length,

        messageText: text,
        category: message.category,
        code: message.code,
        reportsUnnecessary: message.reportsUnnecessary,
        fileName,
    };
}

function isDiagnosticWithDetachedLocation(diagnostic: DiagnosticRelatedInformation | DiagnosticWithDetachedLocation): diagnostic is DiagnosticWithDetachedLocation {
    return diagnostic.file === undefined
        && diagnostic.start !== undefined
        && diagnostic.length !== undefined
        && typeof (diagnostic as DiagnosticWithDetachedLocation).fileName === "string";
}

function attachFileToDiagnostic(diagnostic: DiagnosticWithDetachedLocation, file: SourceFile): DiagnosticWithLocation {
    const fileName = file.fileName || "";
    const length = file.text.length;
    Debug.assertEqual(diagnostic.fileName, fileName);
    Debug.assertLessThanOrEqual(diagnostic.start, length);
    Debug.assertLessThanOrEqual(diagnostic.start + diagnostic.length, length);
    const diagnosticWithLocation: DiagnosticWithLocation = {
        file,
        start: diagnostic.start,
        length: diagnostic.length,
        messageText: diagnostic.messageText,
        category: diagnostic.category,
        code: diagnostic.code,
        reportsUnnecessary: diagnostic.reportsUnnecessary,
    };
    if (diagnostic.relatedInformation) {
        diagnosticWithLocation.relatedInformation = [];
        for (const related of diagnostic.relatedInformation) {
            if (isDiagnosticWithDetachedLocation(related) && related.fileName === fileName) {
                Debug.assertLessThanOrEqual(related.start, length);
                Debug.assertLessThanOrEqual(related.start + related.length, length);
                diagnosticWithLocation.relatedInformation.push(attachFileToDiagnostic(related, file));
            }
            else {
                diagnosticWithLocation.relatedInformation.push(related);
            }
        }
    }
    return diagnosticWithLocation;
}

/** @internal */
export function attachFileToDiagnostics(diagnostics: DiagnosticWithDetachedLocation[], file: SourceFile): DiagnosticWithLocation[] {
    const diagnosticsWithLocation: DiagnosticWithLocation[] = [];
    for (const diagnostic of diagnostics) {
        diagnosticsWithLocation.push(attachFileToDiagnostic(diagnostic, file));
    }
    return diagnosticsWithLocation;
}

/** @internal */
export function createFileDiagnostic(file: SourceFile, start: number, length: number, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithLocation {
    assertDiagnosticLocation(file.text, start, length);

    let text = getLocaleSpecificMessage(message);

    if (some(args)) {
        text = formatStringFromArgs(text, args);
    }

    return {
        file,
        start,
        length,

        messageText: text,
        category: message.category,
        code: message.code,
        reportsUnnecessary: message.reportsUnnecessary,
        reportsDeprecated: message.reportsDeprecated,
    };
}

/** @internal */
export function formatMessage(message: DiagnosticMessage, ...args: DiagnosticArguments): string {
    let text = getLocaleSpecificMessage(message);

    if (some(args)) {
        text = formatStringFromArgs(text, args);
    }

    return text;
}

/** @internal */
export function createCompilerDiagnostic(message: DiagnosticMessage, ...args: DiagnosticArguments): Diagnostic {
    let text = getLocaleSpecificMessage(message);

    if (some(args)) {
        text = formatStringFromArgs(text, args);
    }

    return {
        file: undefined,
        start: undefined,
        length: undefined,

        messageText: text,
        category: message.category,
        code: message.code,
        reportsUnnecessary: message.reportsUnnecessary,
        reportsDeprecated: message.reportsDeprecated,
    };
}

/** @internal */
export function createCompilerDiagnosticFromMessageChain(chain: DiagnosticMessageChain, relatedInformation?: DiagnosticRelatedInformation[]): Diagnostic {
    return {
        file: undefined,
        start: undefined,
        length: undefined,

        code: chain.code,
        category: chain.category,
        messageText: chain.next ? chain : chain.messageText,
        relatedInformation,
    };
}

/** @internal */
export function chainDiagnosticMessages(details: DiagnosticMessageChain | DiagnosticMessageChain[] | undefined, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticMessageChain {
    let text = getLocaleSpecificMessage(message);

    if (some(args)) {
        text = formatStringFromArgs(text, args);
    }
    return {
        messageText: text,
        category: message.category,
        code: message.code,

        next: details === undefined || Array.isArray(details) ? details : [details],
    };
}

/** @internal */
export function concatenateDiagnosticMessageChains(headChain: DiagnosticMessageChain, tailChain: DiagnosticMessageChain): void {
    let lastChain = headChain;
    while (lastChain.next) {
        lastChain = lastChain.next[0];
    }

    lastChain.next = [tailChain];
}

function getDiagnosticFilePath(diagnostic: Diagnostic): string | undefined {
    return diagnostic.file ? diagnostic.file.path : undefined;
}

/** @internal */
export function compareDiagnostics(d1: Diagnostic, d2: Diagnostic): Comparison {
    return compareDiagnosticsSkipRelatedInformation(d1, d2) ||
        compareRelatedInformation(d1, d2) ||
        Comparison.EqualTo;
}

/** @internal */
export function compareDiagnosticsSkipRelatedInformation(d1: Diagnostic, d2: Diagnostic): Comparison {
    return compareStringsCaseSensitive(getDiagnosticFilePath(d1), getDiagnosticFilePath(d2)) ||
        compareValues(d1.start, d2.start) ||
        compareValues(d1.length, d2.length) ||
        compareValues(d1.code, d2.code) ||
        compareMessageText(d1.messageText, d2.messageText) ||
        Comparison.EqualTo;
}

function compareRelatedInformation(d1: Diagnostic, d2: Diagnostic): Comparison {
    if (!d1.relatedInformation && !d2.relatedInformation) {
        return Comparison.EqualTo;
    }
    if (d1.relatedInformation && d2.relatedInformation) {
        return compareValues(d1.relatedInformation.length, d2.relatedInformation.length) || forEach(d1.relatedInformation, (d1i, index) => {
            const d2i = d2.relatedInformation![index];
            return compareDiagnostics(d1i, d2i); // EqualTo is 0, so falsy, and will cause the next item to be compared
        }) || Comparison.EqualTo;
    }
    return d1.relatedInformation ? Comparison.LessThan : Comparison.GreaterThan;
}

function compareMessageText(t1: string | DiagnosticMessageChain, t2: string | DiagnosticMessageChain): Comparison {
    if (typeof t1 === "string" && typeof t2 === "string") {
        return compareStringsCaseSensitive(t1, t2);
    }
    else if (typeof t1 === "string") {
        return Comparison.LessThan;
    }
    else if (typeof t2 === "string") {
        return Comparison.GreaterThan;
    }
    let res = compareStringsCaseSensitive(t1.messageText, t2.messageText);
    if (res) {
        return res;
    }
    if (!t1.next && !t2.next) {
        return Comparison.EqualTo;
    }
    if (!t1.next) {
        return Comparison.LessThan;
    }
    if (!t2.next) {
        return Comparison.GreaterThan;
    }
    const len = Math.min(t1.next.length, t2.next.length);
    for (let i = 0; i < len; i++) {
        res = compareMessageText(t1.next[i], t2.next[i]);
        if (res) {
            return res;
        }
    }
    if (t1.next.length < t2.next.length) {
        return Comparison.LessThan;
    }
    else if (t1.next.length > t2.next.length) {
        return Comparison.GreaterThan;
    }
    return Comparison.EqualTo;
}

/** @internal */
export function getLanguageVariant(scriptKind: ScriptKind) {
    // .tsx and .jsx files are treated as jsx language variant.
    return scriptKind === ScriptKind.TSX || scriptKind === ScriptKind.JSX || scriptKind === ScriptKind.JS || scriptKind === ScriptKind.JSON ? LanguageVariant.JSX : LanguageVariant.Standard;
}

/**
 * This is a somewhat unavoidable full tree walk to locate a JSX tag - `import.meta` requires the same,
 * but we avoid that walk (or parts of it) if at all possible using the `PossiblyContainsImportMeta` node flag.
 * Unfortunately, there's no `NodeFlag` space to do the same for JSX.
 */
function walkTreeForJSXTags(node: Node): Node | undefined {
    if (!(node.transformFlags & TransformFlags.ContainsJsx)) return undefined;
    return isJsxOpeningLikeElement(node) || isJsxFragment(node) ? node : forEachChild(node, walkTreeForJSXTags);
}

function isFileModuleFromUsingJSXTag(file: SourceFile): Node | undefined {
    // Excludes declaration files - they still require an explicit `export {}` or the like
    // for back compat purposes. (not that declaration files should contain JSX tags!)
    return !file.isDeclarationFile ? walkTreeForJSXTags(file) : undefined;
}

/**
 * Note that this requires file.impliedNodeFormat be set already; meaning it must be set very early on
 * in SourceFile construction.
 */
function isFileForcedToBeModuleByFormat(file: SourceFile): true | undefined {
    // Excludes declaration files - they still require an explicit `export {}` or the like
    // for back compat purposes. The only non-declaration files _not_ forced to be a module are `.js` files
    // that aren't esm-mode (meaning not in a `type: module` scope).
    return (file.impliedNodeFormat === ModuleKind.ESNext || (fileExtensionIsOneOf(file.fileName, [Extension.Cjs, Extension.Cts, Extension.Mjs, Extension.Mts]))) && !file.isDeclarationFile ? true : undefined;
}

/** @internal */
export function getSetExternalModuleIndicator(options: CompilerOptions): (file: SourceFile) => void {
    // TODO: Should this callback be cached?
    switch (getEmitModuleDetectionKind(options)) {
        case ModuleDetectionKind.Force:
            // All non-declaration files are modules, declaration files still do the usual isFileProbablyExternalModule
            return (file: SourceFile) => {
                file.externalModuleIndicator = isFileProbablyExternalModule(file) || !file.isDeclarationFile || undefined;
            };
        case ModuleDetectionKind.Legacy:
            // Files are modules if they have imports, exports, or import.meta
            return (file: SourceFile) => {
                file.externalModuleIndicator = isFileProbablyExternalModule(file);
            };
        case ModuleDetectionKind.Auto:
            // If module is nodenext or node16, all esm format files are modules
            // If jsx is react-jsx or react-jsxdev then jsx tags force module-ness
            // otherwise, the presence of import or export statments (or import.meta) implies module-ness
            const checks: ((file: SourceFile) => Node | true | undefined)[] = [isFileProbablyExternalModule];
            if (options.jsx === JsxEmit.ReactJSX || options.jsx === JsxEmit.ReactJSXDev) {
                checks.push(isFileModuleFromUsingJSXTag);
            }
            checks.push(isFileForcedToBeModuleByFormat);
            const combined = or(...checks);
            const callback = (file: SourceFile) => void (file.externalModuleIndicator = combined(file));
            return callback;
    }
}

type CompilerOptionKeys = keyof { [K in keyof CompilerOptions as string extends K ? never : K]: any; };
function createComputedCompilerOptions<T extends Record<string, CompilerOptionKeys[]>>(
    options: {
        [K in keyof T & CompilerOptionKeys | StrictOptionName]: {
            dependencies: T[K];
            computeValue: (compilerOptions: Pick<CompilerOptions, K | T[K][number]>) => Exclude<CompilerOptions[K], undefined>;
        };
    },
) {
    return options;
}

/** @internal */
export const computedOptions = createComputedCompilerOptions({
    target: {
        dependencies: ["module"],
        computeValue: compilerOptions => {
            return compilerOptions.target ??
                ((compilerOptions.module === ModuleKind.Node16 && ScriptTarget.ES2022) ||
                    (compilerOptions.module === ModuleKind.NodeNext && ScriptTarget.ESNext) ||
                    ScriptTarget.ES5);
        },
    },
    module: {
        dependencies: ["target"],
        computeValue: (compilerOptions): ModuleKind => {
            return typeof compilerOptions.module === "number" ?
                compilerOptions.module :
                computedOptions.target.computeValue(compilerOptions) >= ScriptTarget.ES2015 ? ModuleKind.ES2015 : ModuleKind.CommonJS;
        },
    },
    moduleResolution: {
        dependencies: ["module", "target"],
        computeValue: (compilerOptions): ModuleResolutionKind => {
            let moduleResolution = compilerOptions.moduleResolution;
            if (moduleResolution === undefined) {
                switch (computedOptions.module.computeValue(compilerOptions)) {
                    case ModuleKind.CommonJS:
                        moduleResolution = ModuleResolutionKind.Node10;
                        break;
                    case ModuleKind.Node16:
                        moduleResolution = ModuleResolutionKind.Node16;
                        break;
                    case ModuleKind.NodeNext:
                        moduleResolution = ModuleResolutionKind.NodeNext;
                        break;
                    default:
                        moduleResolution = ModuleResolutionKind.Classic;
                        break;
                }
            }
            return moduleResolution;
        },
    },
    moduleDetection: {
        dependencies: ["module", "target"],
        computeValue: (compilerOptions): ModuleDetectionKind => {
            return compilerOptions.moduleDetection ||
                (computedOptions.module.computeValue(compilerOptions) === ModuleKind.Node16 ||
                        computedOptions.module.computeValue(compilerOptions) === ModuleKind.NodeNext ? ModuleDetectionKind.Force : ModuleDetectionKind.Auto);
        },
    },
    isolatedModules: {
        dependencies: ["verbatimModuleSyntax"],
        computeValue: compilerOptions => {
            return !!(compilerOptions.isolatedModules || compilerOptions.verbatimModuleSyntax);
        },
    },
    esModuleInterop: {
        dependencies: ["module", "target"],
        computeValue: (compilerOptions): boolean => {
            if (compilerOptions.esModuleInterop !== undefined) {
                return compilerOptions.esModuleInterop;
            }
            switch (computedOptions.module.computeValue(compilerOptions)) {
                case ModuleKind.Node16:
                case ModuleKind.NodeNext:
                    return true;
            }
            return false;
        },
    },
    allowSyntheticDefaultImports: {
        dependencies: ["module", "target", "moduleResolution"],
        computeValue: (compilerOptions): boolean => {
            if (compilerOptions.allowSyntheticDefaultImports !== undefined) {
                return compilerOptions.allowSyntheticDefaultImports;
            }
            return computedOptions.esModuleInterop.computeValue(compilerOptions)
                || computedOptions.module.computeValue(compilerOptions) === ModuleKind.System
                || computedOptions.moduleResolution.computeValue(compilerOptions) === ModuleResolutionKind.Bundler;
        },
    },
    resolvePackageJsonExports: {
        dependencies: ["moduleResolution"],
        computeValue: (compilerOptions): boolean => {
            const moduleResolution = computedOptions.moduleResolution.computeValue(compilerOptions);
            if (!moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution)) {
                return false;
            }
            if (compilerOptions.resolvePackageJsonExports !== undefined) {
                return compilerOptions.resolvePackageJsonExports;
            }
            switch (moduleResolution) {
                case ModuleResolutionKind.Node16:
                case ModuleResolutionKind.NodeNext:
                case ModuleResolutionKind.Bundler:
                    return true;
            }
            return false;
        },
    },
    resolvePackageJsonImports: {
        dependencies: ["moduleResolution", "resolvePackageJsonExports"],
        computeValue: (compilerOptions): boolean => {
            const moduleResolution = computedOptions.moduleResolution.computeValue(compilerOptions);
            if (!moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution)) {
                return false;
            }
            if (compilerOptions.resolvePackageJsonExports !== undefined) {
                return compilerOptions.resolvePackageJsonExports;
            }
            switch (moduleResolution) {
                case ModuleResolutionKind.Node16:
                case ModuleResolutionKind.NodeNext:
                case ModuleResolutionKind.Bundler:
                    return true;
            }
            return false;
        },
    },
    resolveJsonModule: {
        dependencies: ["moduleResolution", "module", "target"],
        computeValue: (compilerOptions): boolean => {
            if (compilerOptions.resolveJsonModule !== undefined) {
                return compilerOptions.resolveJsonModule;
            }
            return computedOptions.moduleResolution.computeValue(compilerOptions) === ModuleResolutionKind.Bundler;
        },
    },
    declaration: {
        dependencies: ["composite"],
        computeValue: compilerOptions => {
            return !!(compilerOptions.declaration || compilerOptions.composite);
        },
    },
    preserveConstEnums: {
        dependencies: ["isolatedModules", "verbatimModuleSyntax"],
        computeValue: (compilerOptions): boolean => {
            return !!(compilerOptions.preserveConstEnums || computedOptions.isolatedModules.computeValue(compilerOptions));
        },
    },
    incremental: {
        dependencies: ["composite"],
        computeValue: compilerOptions => {
            return !!(compilerOptions.incremental || compilerOptions.composite);
        },
    },
    declarationMap: {
        dependencies: ["declaration", "composite"],
        computeValue: (compilerOptions): boolean => {
            return !!(compilerOptions.declarationMap && computedOptions.declaration.computeValue(compilerOptions));
        },
    },
    allowJs: {
        dependencies: ["checkJs"],
        computeValue: compilerOptions => {
            return compilerOptions.allowJs === undefined ? !!compilerOptions.checkJs : compilerOptions.allowJs;
        },
    },
    useDefineForClassFields: {
        dependencies: ["target", "module"],
        computeValue: (compilerOptions): boolean => {
            return compilerOptions.useDefineForClassFields === undefined
                ? computedOptions.target.computeValue(compilerOptions) >= ScriptTarget.ES2022
                : compilerOptions.useDefineForClassFields;
        },
    },
    noImplicitAny: {
        dependencies: ["strict"],
        computeValue: compilerOptions => {
            return getStrictOptionValue(compilerOptions, "noImplicitAny");
        },
    },
    noImplicitThis: {
        dependencies: ["strict"],
        computeValue: compilerOptions => {
            return getStrictOptionValue(compilerOptions, "noImplicitThis");
        },
    },
    strictNullChecks: {
        dependencies: ["strict"],
        computeValue: compilerOptions => {
            return getStrictOptionValue(compilerOptions, "strictNullChecks");
        },
    },
    strictFunctionTypes: {
        dependencies: ["strict"],
        computeValue: compilerOptions => {
            return getStrictOptionValue(compilerOptions, "strictFunctionTypes");
        },
    },
    strictBindCallApply: {
        dependencies: ["strict"],
        computeValue: compilerOptions => {
            return getStrictOptionValue(compilerOptions, "strictBindCallApply");
        },
    },
    strictPropertyInitialization: {
        dependencies: ["strict"],
        computeValue: compilerOptions => {
            return getStrictOptionValue(compilerOptions, "strictPropertyInitialization");
        },
    },
    alwaysStrict: {
        dependencies: ["strict"],
        computeValue: compilerOptions => {
            return getStrictOptionValue(compilerOptions, "alwaysStrict");
        },
    },
    useUnknownInCatchVariables: {
        dependencies: ["strict"],
        computeValue: compilerOptions => {
            return getStrictOptionValue(compilerOptions, "useUnknownInCatchVariables");
        },
    },
});

/** @internal */
export const getEmitScriptTarget = computedOptions.target.computeValue;
/** @internal */
export const getEmitModuleKind = computedOptions.module.computeValue;
/** @internal */
export const getEmitModuleResolutionKind = computedOptions.moduleResolution.computeValue;
/** @internal */
export const getEmitModuleDetectionKind = computedOptions.moduleDetection.computeValue;
/** @internal */
export const getIsolatedModules = computedOptions.isolatedModules.computeValue;
/** @internal */
export const getESModuleInterop = computedOptions.esModuleInterop.computeValue;
/** @internal */
export const getAllowSyntheticDefaultImports = computedOptions.allowSyntheticDefaultImports.computeValue;
/** @internal */
export const getResolvePackageJsonExports = computedOptions.resolvePackageJsonExports.computeValue;
/** @internal */
export const getResolvePackageJsonImports = computedOptions.resolvePackageJsonImports.computeValue;
/** @internal */
export const getResolveJsonModule = computedOptions.resolveJsonModule.computeValue;
/** @internal */
export const getEmitDeclarations = computedOptions.declaration.computeValue;
/** @internal */
export const shouldPreserveConstEnums = computedOptions.preserveConstEnums.computeValue;
/** @internal */
export const isIncrementalCompilation = computedOptions.incremental.computeValue;
/** @internal */
export const getAreDeclarationMapsEnabled = computedOptions.declarationMap.computeValue;
/** @internal */
export const getAllowJSCompilerOption = computedOptions.allowJs.computeValue;
/** @internal */
export const getUseDefineForClassFields = computedOptions.useDefineForClassFields.computeValue;

/** @internal */
export function emitModuleKindIsNonNodeESM(moduleKind: ModuleKind) {
    return moduleKind >= ModuleKind.ES2015 && moduleKind <= ModuleKind.ESNext;
}

/** @internal */
export function hasJsonModuleEmitEnabled(options: CompilerOptions) {
    switch (getEmitModuleKind(options)) {
        case ModuleKind.CommonJS:
        case ModuleKind.AMD:
        case ModuleKind.ES2015:
        case ModuleKind.ES2020:
        case ModuleKind.ES2022:
        case ModuleKind.ESNext:
        case ModuleKind.Node16:
        case ModuleKind.NodeNext:
            return true;
        default:
            return false;
    }
}

/** @internal */
export function importNameElisionDisabled(options: CompilerOptions) {
    return options.verbatimModuleSyntax || options.isolatedModules && options.preserveValueImports;
}

/** @internal */
export function unreachableCodeIsError(options: CompilerOptions): boolean {
    return options.allowUnreachableCode === false;
}

/** @internal */
export function unusedLabelIsError(options: CompilerOptions): boolean {
    return options.allowUnusedLabels === false;
}

/** @internal */
export function moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution: ModuleResolutionKind): boolean {
    return moduleResolution >= ModuleResolutionKind.Node16 && moduleResolution <= ModuleResolutionKind.NodeNext
        || moduleResolution === ModuleResolutionKind.Bundler;
}

/** @internal */
export function shouldResolveJsRequire(compilerOptions: CompilerOptions): boolean {
    // `bundler` doesn't support resolving `require`, but needs to in `noDtsResolution` to support Find Source Definition
    return !!compilerOptions.noDtsResolution || getEmitModuleResolutionKind(compilerOptions) !== ModuleResolutionKind.Bundler;
}

/** @internal */
export type StrictOptionName =
    | "noImplicitAny"
    | "noImplicitThis"
    | "strictNullChecks"
    | "strictFunctionTypes"
    | "strictBindCallApply"
    | "strictPropertyInitialization"
    | "alwaysStrict"
    | "useUnknownInCatchVariables";

/** @internal */
export function getStrictOptionValue(compilerOptions: CompilerOptions, flag: StrictOptionName): boolean {
    return compilerOptions[flag] === undefined ? !!compilerOptions.strict : !!compilerOptions[flag];
}

/** @internal */
export function getEmitStandardClassFields(compilerOptions: CompilerOptions) {
    return compilerOptions.useDefineForClassFields !== false && getEmitScriptTarget(compilerOptions) >= ScriptTarget.ES2022;
}

/** @internal */
export function compilerOptionsAffectSemanticDiagnostics(newOptions: CompilerOptions, oldOptions: CompilerOptions): boolean {
    return optionsHaveChanges(oldOptions, newOptions, semanticDiagnosticsOptionDeclarations);
}

/** @internal */
export function compilerOptionsAffectEmit(newOptions: CompilerOptions, oldOptions: CompilerOptions): boolean {
    return optionsHaveChanges(oldOptions, newOptions, affectsEmitOptionDeclarations);
}

/** @internal */
export function compilerOptionsAffectDeclarationPath(newOptions: CompilerOptions, oldOptions: CompilerOptions): boolean {
    return optionsHaveChanges(oldOptions, newOptions, affectsDeclarationPathOptionDeclarations);
}

/** @internal */
export function getCompilerOptionValue(options: CompilerOptions, option: CommandLineOption): unknown {
    return option.strictFlag ? getStrictOptionValue(options, option.name as StrictOptionName) :
        option.allowJsFlag ? getAllowJSCompilerOption(options) :
        options[option.name];
}

/** @internal */
export function getJSXTransformEnabled(options: CompilerOptions): boolean {
    const jsx = options.jsx;
    return jsx === JsxEmit.React || jsx === JsxEmit.ReactJSX || jsx === JsxEmit.ReactJSXDev;
}

/** @internal */
export function getJSXImplicitImportBase(compilerOptions: CompilerOptions, file?: SourceFile): string | undefined {
    const jsxImportSourcePragmas = file?.pragmas.get("jsximportsource");
    const jsxImportSourcePragma = isArray(jsxImportSourcePragmas) ? jsxImportSourcePragmas[jsxImportSourcePragmas.length - 1] : jsxImportSourcePragmas;
    return compilerOptions.jsx === JsxEmit.ReactJSX ||
            compilerOptions.jsx === JsxEmit.ReactJSXDev ||
            compilerOptions.jsxImportSource ||
            jsxImportSourcePragma ?
        jsxImportSourcePragma?.arguments.factory || compilerOptions.jsxImportSource || "react" :
        undefined;
}

/** @internal */
export function getJSXRuntimeImport(base: string | undefined, options: CompilerOptions) {
    return base ? `${base}/${options.jsx === JsxEmit.ReactJSXDev ? "jsx-dev-runtime" : "jsx-runtime"}` : undefined;
}

/** @internal */
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

/** @internal */
export interface SymlinkedDirectory {
    /**
     * Matches the casing returned by `realpath`.  Used to compute the `realpath` of children.
     * Always has trailing directory separator
     */
    real: string;
    /**
     * toPath(real).  Stored to avoid repeated recomputation.
     * Always has trailing directory separator
     */
    realPath: Path;
}

/** @internal */
export interface SymlinkCache {
    /** Gets a map from symlink to realpath. Keys have trailing directory separators. */
    getSymlinkedDirectories(): ReadonlyMap<Path, SymlinkedDirectory | false> | undefined;
    /** Gets a map from realpath to symlinks. Keys have trailing directory separators. */
    getSymlinkedDirectoriesByRealpath(): MultiMap<Path, string> | undefined;
    /** Gets a map from symlink to realpath */
    getSymlinkedFiles(): ReadonlyMap<Path, string> | undefined;
    setSymlinkedDirectory(symlink: string, real: SymlinkedDirectory | false): void;
    setSymlinkedFile(symlinkPath: Path, real: string): void;
    /**
     * @internal
     * Uses resolvedTypeReferenceDirectives from program instead of from files, since files
     * don't include automatic type reference directives. Must be called only when
     * `hasProcessedResolutions` returns false (once per cache instance).
     */
    setSymlinksFromResolutions(
        forEachResolvedModule: (
            callback: (resolution: ResolvedModuleWithFailedLookupLocations, moduleName: string, mode: ResolutionMode, filePath: Path) => void,
        ) => void,
        forEachResolvedTypeReferenceDirective: (
            callback: (resolution: ResolvedTypeReferenceDirectiveWithFailedLookupLocations, moduleName: string, mode: ResolutionMode, filePath: Path) => void,
        ) => void,
        typeReferenceDirectives: ModeAwareCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>,
    ): void;
    /**
     * @internal
     * Whether `setSymlinksFromResolutions` has already been called.
     */
    hasProcessedResolutions(): boolean;
}

/** @internal */
export function createSymlinkCache(cwd: string, getCanonicalFileName: GetCanonicalFileName): SymlinkCache {
    let symlinkedDirectories: Map<Path, SymlinkedDirectory | false> | undefined;
    let symlinkedDirectoriesByRealpath: MultiMap<Path, string> | undefined;
    let symlinkedFiles: Map<Path, string> | undefined;
    let hasProcessedResolutions = false;
    return {
        getSymlinkedFiles: () => symlinkedFiles,
        getSymlinkedDirectories: () => symlinkedDirectories,
        getSymlinkedDirectoriesByRealpath: () => symlinkedDirectoriesByRealpath,
        setSymlinkedFile: (path, real) => (symlinkedFiles || (symlinkedFiles = new Map())).set(path, real),
        setSymlinkedDirectory: (symlink, real) => {
            // Large, interconnected dependency graphs in pnpm will have a huge number of symlinks
            // where both the realpath and the symlink path are inside node_modules/.pnpm. Since
            // this path is never a candidate for a module specifier, we can ignore it entirely.
            let symlinkPath = toPath(symlink, cwd, getCanonicalFileName);
            if (!containsIgnoredPath(symlinkPath)) {
                symlinkPath = ensureTrailingDirectorySeparator(symlinkPath);
                if (real !== false && !symlinkedDirectories?.has(symlinkPath)) {
                    (symlinkedDirectoriesByRealpath ||= createMultiMap()).add(real.realPath, symlink);
                }
                (symlinkedDirectories || (symlinkedDirectories = new Map())).set(symlinkPath, real);
            }
        },
        setSymlinksFromResolutions(forEachResolvedModule, forEachResolvedTypeReferenceDirective, typeReferenceDirectives) {
            Debug.assert(!hasProcessedResolutions);
            hasProcessedResolutions = true;
            forEachResolvedModule(resolution => processResolution(this, resolution.resolvedModule));
            forEachResolvedTypeReferenceDirective(resolution => processResolution(this, resolution.resolvedTypeReferenceDirective));
            typeReferenceDirectives.forEach(resolution => processResolution(this, resolution.resolvedTypeReferenceDirective));
        },
        hasProcessedResolutions: () => hasProcessedResolutions,
    };

    function processResolution(cache: SymlinkCache, resolution: ResolvedModuleFull | ResolvedTypeReferenceDirective | undefined) {
        if (!resolution || !resolution.originalPath || !resolution.resolvedFileName) return;
        const { resolvedFileName, originalPath } = resolution;
        cache.setSymlinkedFile(toPath(originalPath, cwd, getCanonicalFileName), resolvedFileName);
        const [commonResolved, commonOriginal] = guessDirectorySymlink(resolvedFileName, originalPath, cwd, getCanonicalFileName) || emptyArray;
        if (commonResolved && commonOriginal) {
            cache.setSymlinkedDirectory(
                commonOriginal,
                {
                    real: ensureTrailingDirectorySeparator(commonResolved),
                    realPath: ensureTrailingDirectorySeparator(toPath(commonResolved, cwd, getCanonicalFileName)),
                },
            );
        }
    }
}

function guessDirectorySymlink(a: string, b: string, cwd: string, getCanonicalFileName: GetCanonicalFileName): [string, string] | undefined {
    const aParts = getPathComponents(getNormalizedAbsolutePath(a, cwd));
    const bParts = getPathComponents(getNormalizedAbsolutePath(b, cwd));
    let isDirectory = false;
    while (
        aParts.length >= 2 && bParts.length >= 2 &&
        !isNodeModulesOrScopedPackageDirectory(aParts[aParts.length - 2], getCanonicalFileName) &&
        !isNodeModulesOrScopedPackageDirectory(bParts[bParts.length - 2], getCanonicalFileName) &&
        getCanonicalFileName(aParts[aParts.length - 1]) === getCanonicalFileName(bParts[bParts.length - 1])
    ) {
        aParts.pop();
        bParts.pop();
        isDirectory = true;
    }
    return isDirectory ? [getPathFromPathComponents(aParts), getPathFromPathComponents(bParts)] : undefined;
}

// KLUDGE: Don't assume one 'node_modules' links to another. More likely a single directory inside the node_modules is the symlink.
// ALso, don't assume that an `@foo` directory is linked. More likely the contents of that are linked.
function isNodeModulesOrScopedPackageDirectory(s: string | undefined, getCanonicalFileName: GetCanonicalFileName): boolean {
    return s !== undefined && (getCanonicalFileName(s) === "node_modules" || startsWith(s, "@"));
}

function stripLeadingDirectorySeparator(s: string): string | undefined {
    return isAnyDirectorySeparator(s.charCodeAt(0)) ? s.slice(1) : undefined;
}

/** @internal */
export function tryRemoveDirectoryPrefix(path: string, dirPath: string, getCanonicalFileName: GetCanonicalFileName): string | undefined {
    const withoutPrefix = tryRemovePrefix(path, dirPath, getCanonicalFileName);
    return withoutPrefix === undefined ? undefined : stripLeadingDirectorySeparator(withoutPrefix);
}

// Reserved characters, forces escaping of any non-word (or digit), non-whitespace character.
// It may be inefficient (we could just match (/[-[\]{}()*+?.,\\^$|#\s]/g), but this is future
// proof.
const reservedCharacterPattern = /[^\w\s/]/g;

/** @internal */
export function regExpEscape(text: string) {
    return text.replace(reservedCharacterPattern, escapeRegExpCharacter);
}

function escapeRegExpCharacter(match: string) {
    return "\\" + match;
}

const wildcardCharCodes = [CharacterCodes.asterisk, CharacterCodes.question];

/** @internal */
export const commonPackageFolders: readonly string[] = ["node_modules", "bower_components", "jspm_packages"];

const implicitExcludePathRegexPattern = `(?!(${commonPackageFolders.join("|")})(/|$))`;

interface WildcardMatcher {
    singleAsteriskRegexFragment: string;
    doubleAsteriskRegexFragment: string;
    replaceWildcardCharacter: (match: string) => string;
}

const filesMatcher: WildcardMatcher = {
    /**
     * Matches any single directory segment unless it is the last segment and a .min.js file
     * Breakdown:
     *  [^./]                   # matches everything up to the first . character (excluding directory separators)
     *  (\\.(?!min\\.js$))?     # matches . characters but not if they are part of the .min.js file extension
     */
    singleAsteriskRegexFragment: "([^./]|(\\.(?!min\\.js$))?)*",
    /**
     * Regex for the ** wildcard. Matches any number of subdirectories. When used for including
     * files or directories, does not match subdirectories that start with a . character
     */
    doubleAsteriskRegexFragment: `(/${implicitExcludePathRegexPattern}[^/.][^/]*)*?`,
    replaceWildcardCharacter: match => replaceWildcardCharacter(match, filesMatcher.singleAsteriskRegexFragment),
};

const directoriesMatcher: WildcardMatcher = {
    singleAsteriskRegexFragment: "[^/]*",
    /**
     * Regex for the ** wildcard. Matches any number of subdirectories. When used for including
     * files or directories, does not match subdirectories that start with a . character
     */
    doubleAsteriskRegexFragment: `(/${implicitExcludePathRegexPattern}[^/.][^/]*)*?`,
    replaceWildcardCharacter: match => replaceWildcardCharacter(match, directoriesMatcher.singleAsteriskRegexFragment),
};

const excludeMatcher: WildcardMatcher = {
    singleAsteriskRegexFragment: "[^/]*",
    doubleAsteriskRegexFragment: "(/.+?)?",
    replaceWildcardCharacter: match => replaceWildcardCharacter(match, excludeMatcher.singleAsteriskRegexFragment),
};

const wildcardMatchers = {
    files: filesMatcher,
    directories: directoriesMatcher,
    exclude: excludeMatcher,
};

/** @internal */
export function getRegularExpressionForWildcard(specs: readonly string[] | undefined, basePath: string, usage: "files" | "directories" | "exclude"): string | undefined {
    const patterns = getRegularExpressionsForWildcards(specs, basePath, usage);
    if (!patterns || !patterns.length) {
        return undefined;
    }

    const pattern = patterns.map(pattern => `(${pattern})`).join("|");
    // If excluding, match "foo/bar/baz...", but if including, only allow "foo".
    const terminator = usage === "exclude" ? "($|/)" : "$";
    return `^(${pattern})${terminator}`;
}

/** @internal */
export function getRegularExpressionsForWildcards(specs: readonly string[] | undefined, basePath: string, usage: "files" | "directories" | "exclude"): readonly string[] | undefined {
    if (specs === undefined || specs.length === 0) {
        return undefined;
    }

    return flatMap(specs, spec => spec && getSubPatternFromSpec(spec, basePath, usage, wildcardMatchers[usage]));
}

/**
 * An "includes" path "foo" is implicitly a glob "foo/** /*" (without the space) if its last component has no extension,
 * and does not contain any glob characters itself.
 *
 * @internal
 */
export function isImplicitGlob(lastPathComponent: string): boolean {
    return !/[.*?]/.test(lastPathComponent);
}

/** @internal */
export function getPatternFromSpec(spec: string, basePath: string, usage: "files" | "directories" | "exclude") {
    const pattern = spec && getSubPatternFromSpec(spec, basePath, usage, wildcardMatchers[usage]);
    return pattern && `^(${pattern})${usage === "exclude" ? "($|/)" : "$"}`;
}

function getSubPatternFromSpec(spec: string, basePath: string, usage: "files" | "directories" | "exclude", { singleAsteriskRegexFragment, doubleAsteriskRegexFragment, replaceWildcardCharacter }: WildcardMatcher): string | undefined {
    let subpattern = "";
    let hasWrittenComponent = false;
    const components = getNormalizedPathComponents(spec, basePath);
    const lastComponent = last(components);
    if (usage !== "exclude" && lastComponent === "**") {
        return undefined;
    }

    // getNormalizedPathComponents includes the separator for the root component.
    // We need to remove to create our regex correctly.
    components[0] = removeTrailingDirectorySeparator(components[0]);

    if (isImplicitGlob(lastComponent)) {
        components.push("**", "*");
    }

    let optionalCount = 0;
    for (let component of components) {
        if (component === "**") {
            subpattern += doubleAsteriskRegexFragment;
        }
        else {
            if (usage === "directories") {
                subpattern += "(";
                optionalCount++;
            }

            if (hasWrittenComponent) {
                subpattern += directorySeparator;
            }

            if (usage !== "exclude") {
                let componentPattern = "";
                // The * and ? wildcards should not match directories or files that start with . if they
                // appear first in a component. Dotted directories and files can be included explicitly
                // like so: **/.*/.*
                if (component.charCodeAt(0) === CharacterCodes.asterisk) {
                    componentPattern += "([^./]" + singleAsteriskRegexFragment + ")?";
                    component = component.substr(1);
                }
                else if (component.charCodeAt(0) === CharacterCodes.question) {
                    componentPattern += "[^./]";
                    component = component.substr(1);
                }

                componentPattern += component.replace(reservedCharacterPattern, replaceWildcardCharacter);

                // Patterns should not include subfolders like node_modules unless they are
                // explicitly included as part of the path.
                //
                // As an optimization, if the component pattern is the same as the component,
                // then there definitely were no wildcard characters and we do not need to
                // add the exclusion pattern.
                if (componentPattern !== component) {
                    subpattern += implicitExcludePathRegexPattern;
                }

                subpattern += componentPattern;
            }
            else {
                subpattern += component.replace(reservedCharacterPattern, replaceWildcardCharacter);
            }
        }

        hasWrittenComponent = true;
    }

    while (optionalCount > 0) {
        subpattern += ")?";
        optionalCount--;
    }

    return subpattern;
}

function replaceWildcardCharacter(match: string, singleAsteriskRegexFragment: string) {
    return match === "*" ? singleAsteriskRegexFragment : match === "?" ? "[^/]" : "\\" + match;
}

/** @internal */
export interface FileSystemEntries {
    readonly files: readonly string[];
    readonly directories: readonly string[];
}

/** @internal */
export interface FileMatcherPatterns {
    /** One pattern for each "include" spec. */
    includeFilePatterns: readonly string[] | undefined;
    /** One pattern matching one of any of the "include" specs. */
    includeFilePattern: string | undefined;
    includeDirectoryPattern: string | undefined;
    excludePattern: string | undefined;
    basePaths: readonly string[];
}

/**
 * @param path directory of the tsconfig.json
 *
 * @internal
 */
export function getFileMatcherPatterns(path: string, excludes: readonly string[] | undefined, includes: readonly string[] | undefined, useCaseSensitiveFileNames: boolean, currentDirectory: string): FileMatcherPatterns {
    path = normalizePath(path);
    currentDirectory = normalizePath(currentDirectory);
    const absolutePath = combinePaths(currentDirectory, path);

    return {
        includeFilePatterns: map(getRegularExpressionsForWildcards(includes, absolutePath, "files"), pattern => `^${pattern}$`),
        includeFilePattern: getRegularExpressionForWildcard(includes, absolutePath, "files"),
        includeDirectoryPattern: getRegularExpressionForWildcard(includes, absolutePath, "directories"),
        excludePattern: getRegularExpressionForWildcard(excludes, absolutePath, "exclude"),
        basePaths: getBasePaths(path, includes, useCaseSensitiveFileNames),
    };
}

/** @internal */
export function getRegexFromPattern(pattern: string, useCaseSensitiveFileNames: boolean): RegExp {
    return new RegExp(pattern, useCaseSensitiveFileNames ? "" : "i");
}

/**
 * @param path directory of the tsconfig.json
 *
 * @internal
 */
export function matchFiles(path: string, extensions: readonly string[] | undefined, excludes: readonly string[] | undefined, includes: readonly string[] | undefined, useCaseSensitiveFileNames: boolean, currentDirectory: string, depth: number | undefined, getFileSystemEntries: (path: string) => FileSystemEntries, realpath: (path: string) => string): string[] {
    path = normalizePath(path);
    currentDirectory = normalizePath(currentDirectory);

    const patterns = getFileMatcherPatterns(path, excludes, includes, useCaseSensitiveFileNames, currentDirectory);

    const includeFileRegexes = patterns.includeFilePatterns && patterns.includeFilePatterns.map(pattern => getRegexFromPattern(pattern, useCaseSensitiveFileNames));
    const includeDirectoryRegex = patterns.includeDirectoryPattern && getRegexFromPattern(patterns.includeDirectoryPattern, useCaseSensitiveFileNames);
    const excludeRegex = patterns.excludePattern && getRegexFromPattern(patterns.excludePattern, useCaseSensitiveFileNames);

    // Associate an array of results with each include regex. This keeps results in order of the "include" order.
    // If there are no "includes", then just put everything in results[0].
    const results: string[][] = includeFileRegexes ? includeFileRegexes.map(() => []) : [[]];
    const visited = new Map<string, true>();
    const toCanonical = createGetCanonicalFileName(useCaseSensitiveFileNames);
    for (const basePath of patterns.basePaths) {
        visitDirectory(basePath, combinePaths(currentDirectory, basePath), depth);
    }

    return flatten(results);

    function visitDirectory(path: string, absolutePath: string, depth: number | undefined) {
        const canonicalPath = toCanonical(realpath(absolutePath));
        if (visited.has(canonicalPath)) return;
        visited.set(canonicalPath, true);
        const { files, directories } = getFileSystemEntries(path);

        for (const current of sort<string>(files, compareStringsCaseSensitive)) {
            const name = combinePaths(path, current);
            const absoluteName = combinePaths(absolutePath, current);
            if (extensions && !fileExtensionIsOneOf(name, extensions)) continue;
            if (excludeRegex && excludeRegex.test(absoluteName)) continue;
            if (!includeFileRegexes) {
                results[0].push(name);
            }
            else {
                const includeIndex = findIndex(includeFileRegexes, re => re.test(absoluteName));
                if (includeIndex !== -1) {
                    results[includeIndex].push(name);
                }
            }
        }

        if (depth !== undefined) {
            depth--;
            if (depth === 0) {
                return;
            }
        }

        for (const current of sort<string>(directories, compareStringsCaseSensitive)) {
            const name = combinePaths(path, current);
            const absoluteName = combinePaths(absolutePath, current);
            if (
                (!includeDirectoryRegex || includeDirectoryRegex.test(absoluteName)) &&
                (!excludeRegex || !excludeRegex.test(absoluteName))
            ) {
                visitDirectory(name, absoluteName, depth);
            }
        }
    }
}

/**
 * Computes the unique non-wildcard base paths amongst the provided include patterns.
 */
function getBasePaths(path: string, includes: readonly string[] | undefined, useCaseSensitiveFileNames: boolean): string[] {
    // Storage for our results in the form of literal paths (e.g. the paths as written by the user).
    const basePaths: string[] = [path];

    if (includes) {
        // Storage for literal base paths amongst the include patterns.
        const includeBasePaths: string[] = [];
        for (const include of includes) {
            // We also need to check the relative paths by converting them to absolute and normalizing
            // in case they escape the base path (e.g "..\somedirectory")
            const absolute: string = isRootedDiskPath(include) ? include : normalizePath(combinePaths(path, include));
            // Append the literal and canonical candidate base paths.
            includeBasePaths.push(getIncludeBasePath(absolute));
        }

        // Sort the offsets array using either the literal or canonical path representations.
        includeBasePaths.sort(getStringComparer(!useCaseSensitiveFileNames));

        // Iterate over each include base path and include unique base paths that are not a
        // subpath of an existing base path
        for (const includeBasePath of includeBasePaths) {
            if (every(basePaths, basePath => !containsPath(basePath, includeBasePath, path, !useCaseSensitiveFileNames))) {
                basePaths.push(includeBasePath);
            }
        }
    }

    return basePaths;
}

function getIncludeBasePath(absolute: string): string {
    const wildcardOffset = indexOfAnyCharCode(absolute, wildcardCharCodes);
    if (wildcardOffset < 0) {
        // No "*" or "?" in the path
        return !hasExtension(absolute)
            ? absolute
            : removeTrailingDirectorySeparator(getDirectoryPath(absolute));
    }
    return absolute.substring(0, absolute.lastIndexOf(directorySeparator, wildcardOffset));
}

/** @internal */
export function ensureScriptKind(fileName: string, scriptKind: ScriptKind | undefined): ScriptKind {
    // Using scriptKind as a condition handles both:
    // - 'scriptKind' is unspecified and thus it is `undefined`
    // - 'scriptKind' is set and it is `Unknown` (0)
    // If the 'scriptKind' is 'undefined' or 'Unknown' then we attempt
    // to get the ScriptKind from the file name. If it cannot be resolved
    // from the file name then the default 'TS' script kind is returned.
    return scriptKind || getScriptKindFromFileName(fileName) || ScriptKind.TS;
}

/** @internal */
export function getScriptKindFromFileName(fileName: string): ScriptKind {
    const ext = fileName.substr(fileName.lastIndexOf("."));
    switch (ext.toLowerCase()) {
        case Extension.Js:
        case Extension.Cjs:
        case Extension.Mjs:
            return ScriptKind.JS;
        case Extension.Jsx:
            return ScriptKind.JSX;
        case Extension.Ts:
        case Extension.Cts:
        case Extension.Mts:
            return ScriptKind.TS;
        case Extension.Tsx:
            return ScriptKind.TSX;
        case Extension.Json:
            return ScriptKind.JSON;
        default:
            return ScriptKind.Unknown;
    }
}

/**
 *  Groups of supported extensions in order of file resolution precedence. (eg, TS > TSX > DTS and seperately, CTS > DCTS)
 *
 * @internal
 */
export const supportedTSExtensions: readonly Extension[][] = [[Extension.Ts, Extension.Tsx, Extension.Dts], [Extension.Cts, Extension.Dcts], [Extension.Mts, Extension.Dmts]];
/** @internal */
export const supportedTSExtensionsFlat: readonly Extension[] = flatten(supportedTSExtensions);
const supportedTSExtensionsWithJson: readonly Extension[][] = [...supportedTSExtensions, [Extension.Json]];
/** Must have ".d.ts" first because if ".ts" goes first, that will be detected as the extension instead of ".d.ts". */
const supportedTSExtensionsForExtractExtension: readonly Extension[] = [Extension.Dts, Extension.Dcts, Extension.Dmts, Extension.Cts, Extension.Mts, Extension.Ts, Extension.Tsx];
/** @internal */
export const supportedJSExtensions: readonly Extension[][] = [[Extension.Js, Extension.Jsx], [Extension.Mjs], [Extension.Cjs]];
/** @internal */
export const supportedJSExtensionsFlat: readonly Extension[] = flatten(supportedJSExtensions);
const allSupportedExtensions: readonly Extension[][] = [[Extension.Ts, Extension.Tsx, Extension.Dts, Extension.Js, Extension.Jsx], [Extension.Cts, Extension.Dcts, Extension.Cjs], [Extension.Mts, Extension.Dmts, Extension.Mjs]];
const allSupportedExtensionsWithJson: readonly Extension[][] = [...allSupportedExtensions, [Extension.Json]];
/** @internal */
export const supportedDeclarationExtensions: readonly Extension[] = [Extension.Dts, Extension.Dcts, Extension.Dmts];
/** @internal */
export const supportedTSImplementationExtensions: readonly Extension[] = [Extension.Ts, Extension.Cts, Extension.Mts, Extension.Tsx];
/** @internal */
export const extensionsNotSupportingExtensionlessResolution: readonly Extension[] = [Extension.Mts, Extension.Dmts, Extension.Mjs, Extension.Cts, Extension.Dcts, Extension.Cjs];

/** @internal */
export function getSupportedExtensions(options?: CompilerOptions): readonly Extension[][];
/** @internal */
export function getSupportedExtensions(options?: CompilerOptions, extraFileExtensions?: readonly FileExtensionInfo[]): readonly string[][];
/** @internal */
export function getSupportedExtensions(options?: CompilerOptions, extraFileExtensions?: readonly FileExtensionInfo[]): readonly string[][] {
    const needJsExtensions = options && getAllowJSCompilerOption(options);

    if (!extraFileExtensions || extraFileExtensions.length === 0) {
        return needJsExtensions ? allSupportedExtensions : supportedTSExtensions;
    }

    const builtins = needJsExtensions ? allSupportedExtensions : supportedTSExtensions;
    const flatBuiltins = flatten(builtins);
    const extensions = [
        ...builtins,
        ...mapDefined(extraFileExtensions, x => x.scriptKind === ScriptKind.Deferred || needJsExtensions && isJSLike(x.scriptKind) && !flatBuiltins.includes(x.extension as Extension) ? [x.extension] : undefined),
    ];

    return extensions;
}

/** @internal */
export function getSupportedExtensionsWithJsonIfResolveJsonModule(options: CompilerOptions | undefined, supportedExtensions: readonly Extension[][]): readonly Extension[][];
/** @internal */
export function getSupportedExtensionsWithJsonIfResolveJsonModule(options: CompilerOptions | undefined, supportedExtensions: readonly string[][]): readonly string[][];
/** @internal */
export function getSupportedExtensionsWithJsonIfResolveJsonModule(options: CompilerOptions | undefined, supportedExtensions: readonly string[][]): readonly string[][] {
    if (!options || !getResolveJsonModule(options)) return supportedExtensions;
    if (supportedExtensions === allSupportedExtensions) return allSupportedExtensionsWithJson;
    if (supportedExtensions === supportedTSExtensions) return supportedTSExtensionsWithJson;
    return [...supportedExtensions, [Extension.Json]];
}

function isJSLike(scriptKind: ScriptKind | undefined): boolean {
    return scriptKind === ScriptKind.JS || scriptKind === ScriptKind.JSX;
}

/** @internal */
export function hasJSFileExtension(fileName: string): boolean {
    return some(supportedJSExtensionsFlat, extension => fileExtensionIs(fileName, extension));
}

/** @internal */
export function hasTSFileExtension(fileName: string): boolean {
    return some(supportedTSExtensionsFlat, extension => fileExtensionIs(fileName, extension));
}

/**
 * @internal
 * Corresponds to UserPreferences#importPathEnding
 */
export const enum ModuleSpecifierEnding {
    Minimal,
    Index,
    JsExtension,
    TsExtension,
}

/** @internal */
export function usesExtensionsOnImports({ imports }: SourceFile, hasExtension: (text: string) => boolean = or(hasJSFileExtension, hasTSFileExtension)): boolean {
    return firstDefined(imports, ({ text }) =>
        pathIsRelative(text) && !fileExtensionIsOneOf(text, extensionsNotSupportingExtensionlessResolution)
            ? hasExtension(text)
            : undefined) || false;
}

/** @internal */
export function getModuleSpecifierEndingPreference(preference: UserPreferences["importModuleSpecifierEnding"], resolutionMode: ResolutionMode, compilerOptions: CompilerOptions, sourceFile: SourceFile): ModuleSpecifierEnding {
    if (preference === "js" || resolutionMode === ModuleKind.ESNext) {
        // Extensions are explicitly requested or required. Now choose between .js and .ts.
        if (!shouldAllowImportingTsExtension(compilerOptions)) {
            return ModuleSpecifierEnding.JsExtension;
        }
        // `allowImportingTsExtensions` is a strong signal, so use .ts unless the file
        // already uses .js extensions and no .ts extensions.
        return inferPreference() !== ModuleSpecifierEnding.JsExtension
            ? ModuleSpecifierEnding.TsExtension
            : ModuleSpecifierEnding.JsExtension;
    }
    if (preference === "minimal") {
        return ModuleSpecifierEnding.Minimal;
    }
    if (preference === "index") {
        return ModuleSpecifierEnding.Index;
    }

    // No preference was specified.
    // Look at imports and/or requires to guess whether .js, .ts, or extensionless imports are preferred.
    // N.B. that `Index` detection is not supported since it would require file system probing to do
    // accurately, and more importantly, literally nobody wants `Index` and its existence is a mystery.
    if (!shouldAllowImportingTsExtension(compilerOptions)) {
        // If .ts imports are not valid, we only need to see one .js import to go with that.
        return usesExtensionsOnImports(sourceFile) ? ModuleSpecifierEnding.JsExtension : ModuleSpecifierEnding.Minimal;
    }

    return inferPreference();

    function inferPreference() {
        let usesJsExtensions = false;
        const specifiers = sourceFile.imports.length ? sourceFile.imports.map(i => i.text) :
            isSourceFileJS(sourceFile) ? getRequiresAtTopOfFile(sourceFile).map(r => r.arguments[0].text) :
            emptyArray;
        for (const specifier of specifiers) {
            if (pathIsRelative(specifier)) {
                if (fileExtensionIsOneOf(specifier, extensionsNotSupportingExtensionlessResolution)) {
                    // These extensions are not optional, so do not indicate a preference.
                    continue;
                }
                if (hasTSFileExtension(specifier)) {
                    return ModuleSpecifierEnding.TsExtension;
                }
                if (hasJSFileExtension(specifier)) {
                    usesJsExtensions = true;
                }
            }
        }
        return usesJsExtensions ? ModuleSpecifierEnding.JsExtension : ModuleSpecifierEnding.Minimal;
    }
}

function getRequiresAtTopOfFile(sourceFile: SourceFile): readonly RequireOrImportCall[] {
    let nonRequireStatementCount = 0;
    let requires: RequireOrImportCall[] | undefined;
    for (const statement of sourceFile.statements) {
        if (nonRequireStatementCount > 3) {
            break;
        }
        if (isRequireVariableStatement(statement)) {
            requires = concatenate(requires, statement.declarationList.declarations.map(d => d.initializer));
        }
        else if (isExpressionStatement(statement) && isRequireCall(statement.expression, /*requireStringLiteralLikeArgument*/ true)) {
            requires = append(requires, statement.expression);
        }
        else {
            nonRequireStatementCount++;
        }
    }
    return requires || emptyArray;
}

/** @internal */
export function isSupportedSourceFileName(fileName: string, compilerOptions?: CompilerOptions, extraFileExtensions?: readonly FileExtensionInfo[]) {
    if (!fileName) return false;

    const supportedExtensions = getSupportedExtensions(compilerOptions, extraFileExtensions);
    for (const extension of flatten(getSupportedExtensionsWithJsonIfResolveJsonModule(compilerOptions, supportedExtensions))) {
        if (fileExtensionIs(fileName, extension)) {
            return true;
        }
    }
    return false;
}

function numberOfDirectorySeparators(str: string) {
    const match = str.match(/\//g);
    return match ? match.length : 0;
}

/** @internal */
export function compareNumberOfDirectorySeparators(path1: string, path2: string) {
    return compareValues(
        numberOfDirectorySeparators(path1),
        numberOfDirectorySeparators(path2),
    );
}

const extensionsToRemove = [Extension.Dts, Extension.Dmts, Extension.Dcts, Extension.Mjs, Extension.Mts, Extension.Cjs, Extension.Cts, Extension.Ts, Extension.Js, Extension.Tsx, Extension.Jsx, Extension.Json];
/** @internal */
export function removeFileExtension(path: string): string {
    for (const ext of extensionsToRemove) {
        const extensionless = tryRemoveExtension(path, ext);
        if (extensionless !== undefined) {
            return extensionless;
        }
    }
    return path;
}

/** @internal */
export function tryRemoveExtension(path: string, extension: string): string | undefined {
    return fileExtensionIs(path, extension) ? removeExtension(path, extension) : undefined;
}

/** @internal */
export function removeExtension(path: string, extension: string): string {
    return path.substring(0, path.length - extension.length);
}

/** @internal */
export function changeExtension<T extends string | Path>(path: T, newExtension: string): T {
    return changeAnyExtension(path, newExtension, extensionsToRemove, /*ignoreCase*/ false) as T;
}

/**
 * Returns the input if there are no stars, a pattern if there is exactly one,
 * and undefined if there are more.
 *
 * @internal
 */
export function tryParsePattern(pattern: string): string | Pattern | undefined {
    const indexOfStar = pattern.indexOf("*");
    if (indexOfStar === -1) {
        return pattern;
    }
    return pattern.indexOf("*", indexOfStar + 1) !== -1
        ? undefined
        : {
            prefix: pattern.substr(0, indexOfStar),
            suffix: pattern.substr(indexOfStar + 1),
        };
}

/** @internal */
export function tryParsePatterns(paths: MapLike<string[]>): (string | Pattern)[] {
    return mapDefined(getOwnKeys(paths), path => tryParsePattern(path));
}

/** @internal */
export function positionIsSynthesized(pos: number): boolean {
    // This is a fast way of testing the following conditions:
    //  pos === undefined || pos === null || isNaN(pos) || pos < 0;
    return !(pos >= 0);
}

/**
 * True if an extension is one of the supported TypeScript extensions.
 *
 * @internal
 */
export function extensionIsTS(ext: string): boolean {
    return ext === Extension.Ts || ext === Extension.Tsx || ext === Extension.Dts || ext === Extension.Cts || ext === Extension.Mts || ext === Extension.Dmts || ext === Extension.Dcts || (startsWith(ext, ".d.") && endsWith(ext, ".ts"));
}

/** @internal */
export function resolutionExtensionIsTSOrJson(ext: string) {
    return extensionIsTS(ext) || ext === Extension.Json;
}

/**
 * Gets the extension from a path.
 * Path must have a valid extension.
 *
 * @internal
 */
export function extensionFromPath(path: string): Extension {
    const ext = tryGetExtensionFromPath(path);
    return ext !== undefined ? ext : Debug.fail(`File ${path} has unknown extension.`);
}

/** @internal */
export function isAnySupportedFileExtension(path: string): boolean {
    return tryGetExtensionFromPath(path) !== undefined;
}

/** @internal */
export function tryGetExtensionFromPath(path: string): Extension | undefined {
    return find(extensionsToRemove, e => fileExtensionIs(path, e));
}

/** @internal */
export function isCheckJsEnabledForFile(sourceFile: SourceFile, compilerOptions: CompilerOptions) {
    return sourceFile.checkJsDirective ? sourceFile.checkJsDirective.enabled : compilerOptions.checkJs;
}

/** @internal */
export const emptyFileSystemEntries: FileSystemEntries = {
    files: emptyArray,
    directories: emptyArray,
};

/**
 * patternOrStrings contains both patterns (containing "*") and regular strings.
 * Return an exact match if possible, or a pattern match, or undefined.
 * (These are verified by verifyCompilerOptions to have 0 or 1 "*" characters.)
 *
 * @internal
 */
export function matchPatternOrExact(patternOrStrings: readonly (string | Pattern)[], candidate: string): string | Pattern | undefined {
    const patterns: Pattern[] = [];
    for (const patternOrString of patternOrStrings) {
        if (patternOrString === candidate) {
            return candidate;
        }

        if (!isString(patternOrString)) {
            patterns.push(patternOrString);
        }
    }

    return findBestPatternMatch(patterns, _ => _, candidate);
}

/** @internal */
export type Mutable<T extends object> = { -readonly [K in keyof T]: T[K]; };

/** @internal */
export function sliceAfter<T>(arr: readonly T[], value: T): readonly T[] {
    const index = arr.indexOf(value);
    Debug.assert(index !== -1);
    return arr.slice(index);
}

/** @internal */
export function addRelatedInfo<T extends Diagnostic>(diagnostic: T, ...relatedInformation: DiagnosticRelatedInformation[]): T {
    if (!relatedInformation.length) {
        return diagnostic;
    }
    if (!diagnostic.relatedInformation) {
        diagnostic.relatedInformation = [];
    }
    Debug.assert(diagnostic.relatedInformation !== emptyArray, "Diagnostic had empty array singleton for related info, but is still being constructed!");
    diagnostic.relatedInformation.push(...relatedInformation);
    return diagnostic;
}

/** @internal */
export function minAndMax<T>(arr: readonly T[], getValue: (value: T) => number): { readonly min: number; readonly max: number; } {
    Debug.assert(arr.length !== 0);
    let min = getValue(arr[0]);
    let max = min;
    for (let i = 1; i < arr.length; i++) {
        const value = getValue(arr[i]);
        if (value < min) {
            min = value;
        }
        else if (value > max) {
            max = value;
        }
    }
    return { min, max };
}

/** @internal */
export function rangeOfNode(node: Node): TextRange {
    return { pos: getTokenPosOfNode(node), end: node.end };
}

/** @internal */
export function rangeOfTypeParameters(sourceFile: SourceFile, typeParameters: NodeArray<TypeParameterDeclaration>): TextRange {
    // Include the `<>`
    const pos = typeParameters.pos - 1;
    const end = Math.min(sourceFile.text.length, skipTrivia(sourceFile.text, typeParameters.end) + 1);
    return { pos, end };
}

/** @internal */
export interface HostWithIsSourceOfProjectReferenceRedirect {
    isSourceOfProjectReferenceRedirect(fileName: string): boolean;
}
/** @internal */
export function skipTypeChecking(sourceFile: SourceFile, options: CompilerOptions, host: HostWithIsSourceOfProjectReferenceRedirect) {
    // If skipLibCheck is enabled, skip reporting errors if file is a declaration file.
    // If skipDefaultLibCheck is enabled, skip reporting errors if file contains a
    // '/// <reference no-default-lib="true"/>' directive.
    return (options.skipLibCheck && sourceFile.isDeclarationFile ||
        options.skipDefaultLibCheck && sourceFile.hasNoDefaultLib) ||
        host.isSourceOfProjectReferenceRedirect(sourceFile.fileName);
}

/** @internal */
export function isJsonEqual(a: unknown, b: unknown): boolean {
    // eslint-disable-next-line no-null/no-null
    return a === b || typeof a === "object" && a !== null && typeof b === "object" && b !== null && equalOwnProperties(a as MapLike<unknown>, b as MapLike<unknown>, isJsonEqual);
}

/**
 * Converts a bigint literal string, e.g. `0x1234n`,
 * to its decimal string representation, e.g. `4660`.
 *
 * @internal
 */
export function parsePseudoBigInt(stringValue: string): string {
    let log2Base: number;
    switch (stringValue.charCodeAt(1)) { // "x" in "0x123"
        case CharacterCodes.b:
        case CharacterCodes.B: // 0b or 0B
            log2Base = 1;
            break;
        case CharacterCodes.o:
        case CharacterCodes.O: // 0o or 0O
            log2Base = 3;
            break;
        case CharacterCodes.x:
        case CharacterCodes.X: // 0x or 0X
            log2Base = 4;
            break;
        default: // already in decimal; omit trailing "n"
            const nIndex = stringValue.length - 1;
            // Skip leading 0s
            let nonZeroStart = 0;
            while (stringValue.charCodeAt(nonZeroStart) === CharacterCodes._0) {
                nonZeroStart++;
            }
            return stringValue.slice(nonZeroStart, nIndex) || "0";
    }

    // Omit leading "0b", "0o", or "0x", and trailing "n"
    const startIndex = 2, endIndex = stringValue.length - 1;
    const bitsNeeded = (endIndex - startIndex) * log2Base;
    // Stores the value specified by the string as a LE array of 16-bit integers
    // using Uint16 instead of Uint32 so combining steps can use bitwise operators
    const segments = new Uint16Array((bitsNeeded >>> 4) + (bitsNeeded & 15 ? 1 : 0));
    // Add the digits, one at a time
    for (let i = endIndex - 1, bitOffset = 0; i >= startIndex; i--, bitOffset += log2Base) {
        const segment = bitOffset >>> 4;
        const digitChar = stringValue.charCodeAt(i);
        // Find character range: 0-9 < A-F < a-f
        const digit = digitChar <= CharacterCodes._9
            ? digitChar - CharacterCodes._0
            : 10 + digitChar -
                (digitChar <= CharacterCodes.F ? CharacterCodes.A : CharacterCodes.a);
        const shiftedDigit = digit << (bitOffset & 15);
        segments[segment] |= shiftedDigit;
        const residual = shiftedDigit >>> 16;
        if (residual) segments[segment + 1] |= residual; // overflows segment
    }
    // Repeatedly divide segments by 10 and add remainder to base10Value
    let base10Value = "";
    let firstNonzeroSegment = segments.length - 1;
    let segmentsRemaining = true;
    while (segmentsRemaining) {
        let mod10 = 0;
        segmentsRemaining = false;
        for (let segment = firstNonzeroSegment; segment >= 0; segment--) {
            const newSegment = mod10 << 16 | segments[segment];
            const segmentValue = (newSegment / 10) | 0;
            segments[segment] = segmentValue;
            mod10 = newSegment - segmentValue * 10;
            if (segmentValue && !segmentsRemaining) {
                firstNonzeroSegment = segment;
                segmentsRemaining = true;
            }
        }
        base10Value = mod10 + base10Value;
    }
    return base10Value;
}

/** @internal */
export function pseudoBigIntToString({ negative, base10Value }: PseudoBigInt): string {
    return (negative && base10Value !== "0" ? "-" : "") + base10Value;
}

/** @internal */
export function parseBigInt(text: string): PseudoBigInt | undefined {
    if (!isValidBigIntString(text, /*roundTripOnly*/ false)) {
        return undefined;
    }
    return parseValidBigInt(text);
}

/**
 * @internal
 * @param text a valid bigint string excluding a trailing `n`, but including a possible prefix `-`. Use `isValidBigIntString(text, roundTripOnly)` before calling this function.
 */
export function parseValidBigInt(text: string): PseudoBigInt {
    const negative = text.startsWith("-");
    const base10Value = parsePseudoBigInt(`${negative ? text.slice(1) : text}n`);
    return { negative, base10Value };
}

/**
 * @internal
 * Tests whether the provided string can be parsed as a bigint.
 * @param s The string to test.
 * @param roundTripOnly Indicates the resulting bigint matches the input when converted back to a string.
 */
export function isValidBigIntString(s: string, roundTripOnly: boolean): boolean {
    if (s === "") return false;
    const scanner = createScanner(ScriptTarget.ESNext, /*skipTrivia*/ false);
    let success = true;
    scanner.setOnError(() => success = false);
    scanner.setText(s + "n");
    let result = scanner.scan();
    const negative = result === SyntaxKind.MinusToken;
    if (negative) {
        result = scanner.scan();
    }
    const flags = scanner.getTokenFlags();
    // validate that
    // * scanning proceeded without error
    // * a bigint can be scanned, and that when it is scanned, it is
    // * the full length of the input string (so the scanner is one character beyond the augmented input length)
    // * it does not contain a numeric seperator (the `BigInt` constructor does not accept a numeric seperator in its input)
    return success && result === SyntaxKind.BigIntLiteral && scanner.getTokenEnd() === (s.length + 1) && !(flags & TokenFlags.ContainsSeparator)
        && (!roundTripOnly || s === pseudoBigIntToString({ negative, base10Value: parsePseudoBigInt(scanner.getTokenValue()) }));
}

/** @internal */
export function isValidTypeOnlyAliasUseSite(useSite: Node): boolean {
    return !!(useSite.flags & NodeFlags.Ambient)
        || isPartOfTypeQuery(useSite)
        || isIdentifierInNonEmittingHeritageClause(useSite)
        || isPartOfPossiblyValidTypeOrAbstractComputedPropertyName(useSite)
        || !(isExpressionNode(useSite) || isShorthandPropertyNameUseSite(useSite));
}

function isShorthandPropertyNameUseSite(useSite: Node) {
    return isIdentifier(useSite) && isShorthandPropertyAssignment(useSite.parent) && useSite.parent.name === useSite;
}

function isPartOfPossiblyValidTypeOrAbstractComputedPropertyName(node: Node) {
    while (node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.PropertyAccessExpression) {
        node = node.parent;
    }
    if (node.kind !== SyntaxKind.ComputedPropertyName) {
        return false;
    }
    if (hasSyntacticModifier(node.parent, ModifierFlags.Abstract)) {
        return true;
    }
    const containerKind = node.parent.parent.kind;
    return containerKind === SyntaxKind.InterfaceDeclaration || containerKind === SyntaxKind.TypeLiteral;
}

/** Returns true for an identifier in 1) an `implements` clause, and 2) an `extends` clause of an interface. */
function isIdentifierInNonEmittingHeritageClause(node: Node): boolean {
    if (node.kind !== SyntaxKind.Identifier) return false;
    const heritageClause = findAncestor(node.parent, parent => {
        switch (parent.kind) {
            case SyntaxKind.HeritageClause:
                return true;
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.ExpressionWithTypeArguments:
                return false;
            default:
                return "quit";
        }
    }) as HeritageClause | undefined;
    return heritageClause?.token === SyntaxKind.ImplementsKeyword || heritageClause?.parent.kind === SyntaxKind.InterfaceDeclaration;
}

/** @internal */
export function isIdentifierTypeReference(node: Node): node is TypeReferenceNode & { typeName: Identifier; } {
    return isTypeReferenceNode(node) && isIdentifier(node.typeName);
}

/** @internal */
export function arrayIsHomogeneous<T>(array: readonly T[], comparer: EqualityComparer<T> = equateValues) {
    if (array.length < 2) return true;
    const first = array[0];
    for (let i = 1, length = array.length; i < length; i++) {
        const target = array[i];
        if (!comparer(first, target)) return false;
    }
    return true;
}

/**
 * Bypasses immutability and directly sets the `pos` property of a `TextRange` or `Node`.
 *
 * @internal
 */
export function setTextRangePos<T extends ReadonlyTextRange>(range: T, pos: number) {
    (range as TextRange).pos = pos;
    return range;
}

/**
 * Bypasses immutability and directly sets the `end` property of a `TextRange` or `Node`.
 *
 * @internal
 */
export function setTextRangeEnd<T extends ReadonlyTextRange>(range: T, end: number) {
    (range as TextRange).end = end;
    return range;
}

/**
 * Bypasses immutability and directly sets the `pos` and `end` properties of a `TextRange` or `Node`.
 *
 * @internal
 */
export function setTextRangePosEnd<T extends ReadonlyTextRange>(range: T, pos: number, end: number) {
    return setTextRangeEnd(setTextRangePos(range, pos), end);
}

/**
 * Bypasses immutability and directly sets the `pos` and `end` properties of a `TextRange` or `Node` from the
 * provided position and width.
 *
 * @internal
 */
export function setTextRangePosWidth<T extends ReadonlyTextRange>(range: T, pos: number, width: number) {
    return setTextRangePosEnd(range, pos, pos + width);
}

/**
 * Bypasses immutability and directly sets the `flags` property of a `Node`.
 *
 * @internal
 */
export function setNodeFlags<T extends Node>(node: T, newFlags: NodeFlags): T;
/** @internal */
export function setNodeFlags<T extends Node>(node: T | undefined, newFlags: NodeFlags): T | undefined;
/** @internal */
export function setNodeFlags<T extends Node>(node: T | undefined, newFlags: NodeFlags): T | undefined {
    if (node) {
        (node as Mutable<T>).flags = newFlags;
    }
    return node;
}

/**
 * Bypasses immutability and directly sets the `parent` property of a `Node`.
 *
 * @internal
 */
export function setParent<T extends Node>(child: T, parent: T["parent"] | undefined): T;
/** @internal */
export function setParent<T extends Node>(child: T | undefined, parent: T["parent"] | undefined): T | undefined;
/** @internal */
export function setParent<T extends Node>(child: T | undefined, parent: T["parent"] | undefined): T | undefined {
    if (child && parent) {
        (child as Mutable<T>).parent = parent;
    }
    return child;
}

/**
 * Bypasses immutability and directly sets the `parent` property of each `Node` in an array of nodes, if is not already set.
 *
 * @internal
 */
export function setEachParent<T extends readonly Node[]>(children: T, parent: T[number]["parent"]): T;
/** @internal */
export function setEachParent<T extends readonly Node[]>(children: T | undefined, parent: T[number]["parent"]): T | undefined;
/** @internal */
export function setEachParent<T extends readonly Node[]>(children: T | undefined, parent: T[number]["parent"]): T | undefined {
    if (children) {
        for (const child of children) {
            setParent(child, parent);
        }
    }
    return children;
}

/**
 * Bypasses immutability and directly sets the `parent` property of each `Node` recursively.
 * @param rootNode The root node from which to start the recursion.
 * @param incremental When `true`, only recursively descends through nodes whose `parent` pointers are incorrect.
 * This allows us to quickly bail out of setting `parent` for subtrees during incremental parsing.
 *
 * @internal
 */
export function setParentRecursive<T extends Node>(rootNode: T, incremental: boolean): T;
/** @internal */
export function setParentRecursive<T extends Node>(rootNode: T | undefined, incremental: boolean): T | undefined;
/** @internal */
export function setParentRecursive<T extends Node>(rootNode: T | undefined, incremental: boolean): T | undefined {
    if (!rootNode) return rootNode;
    forEachChildRecursively(rootNode, isJSDocNode(rootNode) ? bindParentToChildIgnoringJSDoc : bindParentToChild);
    return rootNode;

    function bindParentToChildIgnoringJSDoc(child: Node, parent: Node): void | "skip" {
        if (incremental && child.parent === parent) {
            return "skip";
        }
        setParent(child, parent);
    }

    function bindJSDoc(child: Node) {
        if (hasJSDocNodes(child)) {
            for (const doc of child.jsDoc!) {
                bindParentToChildIgnoringJSDoc(doc, child);
                forEachChildRecursively(doc, bindParentToChildIgnoringJSDoc);
            }
        }
    }

    function bindParentToChild(child: Node, parent: Node) {
        return bindParentToChildIgnoringJSDoc(child, parent) || bindJSDoc(child);
    }
}

function isPackedElement(node: Expression) {
    return !isOmittedExpression(node);
}

/**
 * Determines whether the provided node is an ArrayLiteralExpression that contains no missing elements.
 *
 * @internal
 */
export function isPackedArrayLiteral(node: Expression) {
    return isArrayLiteralExpression(node) && every(node.elements, isPackedElement);
}

/**
 * Indicates whether the result of an `Expression` will be unused.
 *
 * NOTE: This requires a node with a valid `parent` pointer.
 *
 * @internal
 */
export function expressionResultIsUnused(node: Expression): boolean {
    Debug.assertIsDefined(node.parent);
    while (true) {
        const parent: Node = node.parent;
        // walk up parenthesized expressions, but keep a pointer to the top-most parenthesized expression
        if (isParenthesizedExpression(parent)) {
            node = parent;
            continue;
        }
        // result is unused in an expression statement, `void` expression, or the initializer or incrementer of a `for` loop
        if (
            isExpressionStatement(parent) ||
            isVoidExpression(parent) ||
            isForStatement(parent) && (parent.initializer === node || parent.incrementor === node)
        ) {
            return true;
        }
        if (isCommaListExpression(parent)) {
            // left side of comma is always unused
            if (node !== last(parent.elements)) return true;
            // right side of comma is unused if parent is unused
            node = parent;
            continue;
        }
        if (isBinaryExpression(parent) && parent.operatorToken.kind === SyntaxKind.CommaToken) {
            // left side of comma is always unused
            if (node === parent.left) return true;
            // right side of comma is unused if parent is unused
            node = parent;
            continue;
        }
        return false;
    }
}

/** @internal */
export function containsIgnoredPath(path: string) {
    return some(ignoredPaths, p => path.includes(p));
}

/** @internal */
export function getContainingNodeArray(node: Node): NodeArray<Node> | undefined {
    if (!node.parent) return undefined;
    switch (node.kind) {
        case SyntaxKind.TypeParameter:
            const { parent } = node as TypeParameterDeclaration;
            return parent.kind === SyntaxKind.InferType ? undefined : parent.typeParameters;
        case SyntaxKind.Parameter:
            return (node as ParameterDeclaration).parent.parameters;
        case SyntaxKind.TemplateLiteralTypeSpan:
            return (node as TemplateLiteralTypeSpan).parent.templateSpans;
        case SyntaxKind.TemplateSpan:
            return (node as TemplateSpan).parent.templateSpans;
        case SyntaxKind.Decorator: {
            const { parent } = node as Decorator;
            return canHaveDecorators(parent) ? parent.modifiers :
                undefined;
        }
        case SyntaxKind.HeritageClause:
            return (node as HeritageClause).parent.heritageClauses;
    }

    const { parent } = node;
    if (isJSDocTag(node)) {
        return isJSDocTypeLiteral(node.parent) ? undefined : node.parent.tags;
    }

    switch (parent.kind) {
        case SyntaxKind.TypeLiteral:
        case SyntaxKind.InterfaceDeclaration:
            return isTypeElement(node) ? (parent as TypeLiteralNode | InterfaceDeclaration).members : undefined;
        case SyntaxKind.UnionType:
        case SyntaxKind.IntersectionType:
            return (parent as UnionOrIntersectionTypeNode).types;
        case SyntaxKind.TupleType:
        case SyntaxKind.ArrayLiteralExpression:
        case SyntaxKind.CommaListExpression:
        case SyntaxKind.NamedImports:
        case SyntaxKind.NamedExports:
            return (parent as TupleTypeNode | ArrayLiteralExpression | CommaListExpression | NamedImports | NamedExports).elements;
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.JsxAttributes:
            return (parent as ObjectLiteralExpressionBase<ObjectLiteralElement>).properties;
        case SyntaxKind.CallExpression:
        case SyntaxKind.NewExpression:
            return isTypeNode(node) ? (parent as CallExpression | NewExpression).typeArguments :
                (parent as CallExpression | NewExpression).expression === node ? undefined :
                (parent as CallExpression | NewExpression).arguments;
        case SyntaxKind.JsxElement:
        case SyntaxKind.JsxFragment:
            return isJsxChild(node) ? (parent as JsxElement | JsxFragment).children : undefined;
        case SyntaxKind.JsxOpeningElement:
        case SyntaxKind.JsxSelfClosingElement:
            return isTypeNode(node) ? (parent as JsxOpeningElement | JsxSelfClosingElement).typeArguments : undefined;
        case SyntaxKind.Block:
        case SyntaxKind.CaseClause:
        case SyntaxKind.DefaultClause:
        case SyntaxKind.ModuleBlock:
            return (parent as Block | CaseOrDefaultClause | ModuleBlock).statements;
        case SyntaxKind.CaseBlock:
            return (parent as CaseBlock).clauses;
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.ClassExpression:
            return isClassElement(node) ? (parent as ClassLikeDeclaration).members : undefined;
        case SyntaxKind.EnumDeclaration:
            return isEnumMember(node) ? (parent as EnumDeclaration).members : undefined;
        case SyntaxKind.SourceFile:
            return (parent as SourceFile).statements;
    }
}

/** @internal */
export function hasContextSensitiveParameters(node: FunctionLikeDeclaration) {
    // Functions with type parameters are not context sensitive.
    if (!node.typeParameters) {
        // Functions with any parameters that lack type annotations are context sensitive.
        if (some(node.parameters, p => !getEffectiveTypeAnnotationNode(p))) {
            return true;
        }
        if (node.kind !== SyntaxKind.ArrowFunction) {
            // If the first parameter is not an explicit 'this' parameter, then the function has
            // an implicit 'this' parameter which is subject to contextual typing.
            const parameter = firstOrUndefined(node.parameters);
            if (!(parameter && parameterIsThisKeyword(parameter))) {
                return true;
            }
        }
    }
    return false;
}

/** @internal */
export function isInfinityOrNaNString(name: string | __String): boolean {
    return name === "Infinity" || name === "-Infinity" || name === "NaN";
}

/** @internal */
export function isCatchClauseVariableDeclaration(node: Node) {
    return node.kind === SyntaxKind.VariableDeclaration && node.parent.kind === SyntaxKind.CatchClause;
}

/** @internal */
export function isParameterOrCatchClauseVariable(symbol: Symbol) {
    const declaration = symbol.valueDeclaration && getRootDeclaration(symbol.valueDeclaration);
    return !!declaration && (isParameter(declaration) || isCatchClauseVariableDeclaration(declaration));
}

/** @internal */
export function isFunctionExpressionOrArrowFunction(node: Node): node is FunctionExpression | ArrowFunction {
    return node.kind === SyntaxKind.FunctionExpression || node.kind === SyntaxKind.ArrowFunction;
}

/** @internal */
export function escapeSnippetText(text: string): string {
    return text.replace(/\$/gm, () => "\\$");
}

/** @internal */
export function isNumericLiteralName(name: string | __String) {
    // The intent of numeric names is that
    //     - they are names with text in a numeric form, and that
    //     - setting properties/indexing with them is always equivalent to doing so with the numeric literal 'numLit',
    //         acquired by applying the abstract 'ToNumber' operation on the name's text.
    //
    // The subtlety is in the latter portion, as we cannot reliably say that anything that looks like a numeric literal is a numeric name.
    // In fact, it is the case that the text of the name must be equal to 'ToString(numLit)' for this to hold.
    //
    // Consider the property name '"0xF00D"'. When one indexes with '0xF00D', they are actually indexing with the value of 'ToString(0xF00D)'
    // according to the ECMAScript specification, so it is actually as if the user indexed with the string '"61453"'.
    // Thus, the text of all numeric literals equivalent to '61543' such as '0xF00D', '0xf00D', '0170015', etc. are not valid numeric names
    // because their 'ToString' representation is not equal to their original text.
    // This is motivated by ECMA-262 sections 9.3.1, 9.8.1, 11.1.5, and 11.2.1.
    //
    // Here, we test whether 'ToString(ToNumber(name))' is exactly equal to 'name'.
    // The '+' prefix operator is equivalent here to applying the abstract ToNumber operation.
    // Applying the 'toString()' method on a number gives us the abstract ToString operation on a number.
    //
    // Note that this accepts the values 'Infinity', '-Infinity', and 'NaN', and that this is intentional.
    // This is desired behavior, because when indexing with them as numeric entities, you are indexing
    // with the strings '"Infinity"', '"-Infinity"', and '"NaN"' respectively.
    return (+name).toString() === name;
}

/** @internal */
export function createPropertyNameNodeForIdentifierOrLiteral(name: string, target: ScriptTarget, singleQuote: boolean, stringNamed: boolean, isMethod: boolean) {
    const isMethodNamedNew = isMethod && name === "new";
    return !isMethodNamedNew && isIdentifierText(name, target) ? factory.createIdentifier(name) :
        !stringNamed && !isMethodNamedNew && isNumericLiteralName(name) && +name >= 0 ? factory.createNumericLiteral(+name) :
        factory.createStringLiteral(name, !!singleQuote);
}

/** @internal */
export function isThisTypeParameter(type: Type): boolean {
    return !!(type.flags & TypeFlags.TypeParameter && (type as TypeParameter).isThisType);
}

/** @internal */
export interface NodeModulePathParts {
    readonly topLevelNodeModulesIndex: number;
    readonly topLevelPackageNameIndex: number;
    readonly packageRootIndex: number;
    readonly fileNameIndex: number;
}
/** @internal */
export function getNodeModulePathParts(fullPath: string): NodeModulePathParts | undefined {
    // If fullPath can't be valid module file within node_modules, returns undefined.
    // Example of expected pattern: /base/path/node_modules/[@scope/otherpackage/@otherscope/node_modules/]package/[subdirectory/]file.js
    // Returns indices:                       ^            ^                                                      ^             ^

    let topLevelNodeModulesIndex = 0;
    let topLevelPackageNameIndex = 0;
    let packageRootIndex = 0;
    let fileNameIndex = 0;

    const enum States {
        BeforeNodeModules,
        NodeModules,
        Scope,
        PackageContent,
    }

    let partStart = 0;
    let partEnd = 0;
    let state = States.BeforeNodeModules;

    while (partEnd >= 0) {
        partStart = partEnd;
        partEnd = fullPath.indexOf("/", partStart + 1);
        switch (state) {
            case States.BeforeNodeModules:
                if (fullPath.indexOf(nodeModulesPathPart, partStart) === partStart) {
                    topLevelNodeModulesIndex = partStart;
                    topLevelPackageNameIndex = partEnd;
                    state = States.NodeModules;
                }
                break;
            case States.NodeModules:
            case States.Scope:
                if (state === States.NodeModules && fullPath.charAt(partStart + 1) === "@") {
                    state = States.Scope;
                }
                else {
                    packageRootIndex = partEnd;
                    state = States.PackageContent;
                }
                break;
            case States.PackageContent:
                if (fullPath.indexOf(nodeModulesPathPart, partStart) === partStart) {
                    state = States.NodeModules;
                }
                else {
                    state = States.PackageContent;
                }
                break;
        }
    }

    fileNameIndex = partStart;

    return state > States.NodeModules ? { topLevelNodeModulesIndex, topLevelPackageNameIndex, packageRootIndex, fileNameIndex } : undefined;
}

/** @internal */
export function getParameterTypeNode(parameter: ParameterDeclaration | JSDocParameterTag) {
    return parameter.kind === SyntaxKind.JSDocParameterTag ? parameter.typeExpression?.type : parameter.type;
}

/** @internal */
export function isTypeDeclaration(node: Node): node is TypeParameterDeclaration | ClassDeclaration | InterfaceDeclaration | TypeAliasDeclaration | JSDocTypedefTag | JSDocCallbackTag | JSDocEnumTag | EnumDeclaration | ImportClause | ImportSpecifier | ExportSpecifier {
    switch (node.kind) {
        case SyntaxKind.TypeParameter:
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.InterfaceDeclaration:
        case SyntaxKind.TypeAliasDeclaration:
        case SyntaxKind.EnumDeclaration:
        case SyntaxKind.JSDocTypedefTag:
        case SyntaxKind.JSDocCallbackTag:
        case SyntaxKind.JSDocEnumTag:
            return true;
        case SyntaxKind.ImportClause:
            return (node as ImportClause).isTypeOnly;
        case SyntaxKind.ImportSpecifier:
        case SyntaxKind.ExportSpecifier:
            return (node as ImportSpecifier | ExportSpecifier).parent.parent.isTypeOnly;
        default:
            return false;
    }
}

/** @internal */
export function canHaveExportModifier(node: Node): node is Extract<HasModifiers, Statement> {
    return isEnumDeclaration(node) || isVariableStatement(node) || isFunctionDeclaration(node) || isClassDeclaration(node)
        || isInterfaceDeclaration(node) || isTypeDeclaration(node) || (isModuleDeclaration(node) && !isExternalModuleAugmentation(node) && !isGlobalScopeAugmentation(node));
}

/** @internal */
export function isOptionalJSDocPropertyLikeTag(node: Node): node is JSDocPropertyLikeTag {
    if (!isJSDocPropertyLikeTag(node)) {
        return false;
    }
    const { isBracketed, typeExpression } = node;
    return isBracketed || !!typeExpression && typeExpression.type.kind === SyntaxKind.JSDocOptionalType;
}

/** @internal */
export function canUsePropertyAccess(name: string, languageVersion: ScriptTarget): boolean {
    if (name.length === 0) {
        return false;
    }
    const firstChar = name.charCodeAt(0);
    return firstChar === CharacterCodes.hash ?
        name.length > 1 && isIdentifierStart(name.charCodeAt(1), languageVersion) :
        isIdentifierStart(firstChar, languageVersion);
}

/** @internal */
export function hasTabstop(node: Node): boolean {
    return getSnippetElement(node)?.kind === SnippetKind.TabStop;
}

/** @internal */
export function isJSDocOptionalParameter(node: ParameterDeclaration) {
    return isInJSFile(node) && (
        // node.type should only be a JSDocOptionalType when node is a parameter of a JSDocFunctionType
        node.type && node.type.kind === SyntaxKind.JSDocOptionalType
        || getJSDocParameterTags(node).some(({ isBracketed, typeExpression }) => isBracketed || !!typeExpression && typeExpression.type.kind === SyntaxKind.JSDocOptionalType)
    );
}

/** @internal */
export function isOptionalDeclaration(declaration: Declaration): boolean {
    switch (declaration.kind) {
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertySignature:
            return !!(declaration as PropertyDeclaration | PropertySignature).questionToken;
        case SyntaxKind.Parameter:
            return !!(declaration as ParameterDeclaration).questionToken || isJSDocOptionalParameter(declaration as ParameterDeclaration);
        case SyntaxKind.JSDocPropertyTag:
        case SyntaxKind.JSDocParameterTag:
            return isOptionalJSDocPropertyLikeTag(declaration);
        default:
            return false;
    }
}

/** @internal */
export function isNonNullAccess(node: Node): node is AccessExpression {
    const kind = node.kind;
    return (kind === SyntaxKind.PropertyAccessExpression
        || kind === SyntaxKind.ElementAccessExpression) && isNonNullExpression((node as AccessExpression).expression);
}

/** @internal */
export function isJSDocSatisfiesExpression(node: Node): node is JSDocSatisfiesExpression {
    return isInJSFile(node) && isParenthesizedExpression(node) && hasJSDocNodes(node) && !!getJSDocSatisfiesTag(node);
}

/** @internal */
export function getJSDocSatisfiesExpressionType(node: JSDocSatisfiesExpression) {
    return Debug.checkDefined(tryGetJSDocSatisfiesTypeNode(node));
}

/** @internal */
export function tryGetJSDocSatisfiesTypeNode(node: Node) {
    const tag = getJSDocSatisfiesTag(node);
    return tag && tag.typeExpression && tag.typeExpression.type;
}

/** @internal */
export function getEscapedTextOfJsxAttributeName(node: JsxAttributeName): __String {
    return isIdentifier(node) ? node.escapedText : getEscapedTextOfJsxNamespacedName(node);
}

/** @internal */
export function getTextOfJsxAttributeName(node: JsxAttributeName): string {
    return isIdentifier(node) ? idText(node) : getTextOfJsxNamespacedName(node);
}

/** @internal */
export function isJsxAttributeName(node: Node): node is JsxAttributeName {
    const kind = node.kind;
    return kind === SyntaxKind.Identifier
        || kind === SyntaxKind.JsxNamespacedName;
}

/** @internal */
export function getEscapedTextOfJsxNamespacedName(node: JsxNamespacedName): __String {
    return `${node.namespace.escapedText}:${idText(node.name)}` as __String;
}

/** @internal */
export function getTextOfJsxNamespacedName(node: JsxNamespacedName) {
    return `${idText(node.namespace)}:${idText(node.name)}`;
}

/** @internal */
export function intrinsicTagNameToString(node: Identifier | JsxNamespacedName) {
    return isIdentifier(node) ? idText(node) : getTextOfJsxNamespacedName(node);
}

/**
 * Indicates whether a type can be used as a property name.
 * @internal
 */
export function isTypeUsableAsPropertyName(type: Type): type is StringLiteralType | NumberLiteralType | UniqueESSymbolType {
    return !!(type.flags & TypeFlags.StringOrNumberLiteralOrUnique);
}

/**
 * Gets the symbolic name for a member from its type.
 * @internal
 */
export function getPropertyNameFromType(type: StringLiteralType | NumberLiteralType | UniqueESSymbolType): __String {
    if (type.flags & TypeFlags.UniqueESSymbol) {
        return (type as UniqueESSymbolType).escapedName;
    }
    if (type.flags & (TypeFlags.StringLiteral | TypeFlags.NumberLiteral)) {
        return escapeLeadingUnderscores("" + (type as StringLiteralType | NumberLiteralType).value);
    }
    return Debug.fail();
}

/** @internal */
export function isExpandoPropertyDeclaration(declaration: Declaration | undefined): declaration is PropertyAccessExpression | ElementAccessExpression | BinaryExpression {
    return !!declaration && (isPropertyAccessExpression(declaration) || isElementAccessExpression(declaration) || isBinaryExpression(declaration));
}

/** @internal */
export function hasResolutionModeOverride(node: ImportTypeNode | ImportDeclaration | ExportDeclaration | undefined) {
    if (node === undefined) {
        return false;
    }
    return !!getResolutionModeOverride(node.attributes);
}

const stringReplace = String.prototype.replace;

/** @internal */
export function replaceFirstStar(s: string, replacement: string): string {
    // `s.replace("*", replacement)` triggers CodeQL as they think it's a potentially incorrect string escaping.
    // See: https://codeql.github.com/codeql-query-help/javascript/js-incomplete-sanitization/
    // But, we really do want to replace only the first star.
    // Attempt to defeat this analysis by indirectly calling the method.
    return stringReplace.call(s, "*", replacement);
}
