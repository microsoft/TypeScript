import { StringCompletions } from "./_namespaces/ts.Completions.js";
import {
    __String,
    addToSeen,
    append,
    BinaryExpression,
    BindingElement,
    BindingPattern,
    BreakOrContinueStatement,
    CallExpression,
    CancellationToken,
    canHaveDecorators,
    canUsePropertyAccess,
    CaseBlock,
    cast,
    CharacterCodes,
    ClassElement,
    CodeAction,
    codefix,
    compareNumberOfDirectorySeparators,
    compareStringsCaseSensitiveUI,
    compareTextSpans,
    Comparison,
    CompilerOptions,
    compilerOptionsIndicateEsModules,
    CompletionEntry,
    CompletionEntryData,
    CompletionEntryDataAutoImport,
    CompletionEntryDataResolved,
    CompletionEntryDataUnresolved,
    CompletionEntryDetails,
    CompletionEntryLabelDetails,
    CompletionInfo,
    CompletionInfoFlags,
    CompletionsTriggerCharacter,
    CompletionTriggerKind,
    concatenate,
    ConstructorDeclaration,
    ContextFlags,
    countWhere,
    createModuleSpecifierResolutionHost,
    createPackageJsonImportFilter,
    createPrinter,
    createSortedArray,
    createTextSpanFromBounds,
    createTextSpanFromNode,
    createTextSpanFromRange,
    Debug,
    Declaration,
    Decorator,
    Diagnostics,
    diagnosticToString,
    displayPart,
    DotDotDotToken,
    EmitFlags,
    EmitHint,
    EmitTextWriter,
    EntityName,
    EnumMember,
    escapeSnippetText,
    every,
    ExportKind,
    ExportMapInfoKey,
    Expression,
    ExpressionWithTypeArguments,
    factory,
    filter,
    find,
    findAncestor,
    findChildOfKind,
    findPrecedingToken,
    first,
    firstDefined,
    flatMap,
    forEach,
    formatting,
    FunctionLikeDeclaration,
    FutureSymbolExportInfo,
    getAllSuperTypeNodes,
    getAncestor,
    getCombinedLocalAndExportSymbolFlags,
    getContainingClass,
    getContextualTypeFromParent,
    getDeclarationModifierFlagsFromSymbol,
    getEffectiveBaseTypeNode,
    getEffectiveModifierFlags,
    getEffectiveTypeAnnotationNode,
    getEmitScriptTarget,
    getEscapedTextOfIdentifierOrLiteral,
    getEscapedTextOfJsxAttributeName,
    getExportInfoMap,
    getFormatCodeSettingsForWriting,
    getJSDocParameterTags,
    getLanguageVariant,
    getLeftmostAccessExpression,
    getLineAndCharacterOfPosition,
    getLineStartPositionForPosition,
    getLocalSymbolForExportDefault,
    getModifiers,
    getNameFromImportAttribute,
    getNameOfDeclaration,
    getNameTable,
    getNewLineCharacter,
    getNewLineKind,
    getNewLineOrDefaultFromHost,
    getPropertyNameForPropertyNameNode,
    getQuotePreference,
    getReplacementSpanForContextToken,
    getResolvePackageJsonExports,
    getRootDeclaration,
    getSourceFileOfModule,
    getSwitchedType,
    getSymbolId,
    getSynthesizedDeepClone,
    getTokenAtPosition,
    getTouchingPropertyName,
    hasDocComment,
    hasEffectiveModifier,
    hasInitializer,
    hasType,
    Identifier,
    identifierToKeywordKind,
    ImportDeclaration,
    ImportEqualsDeclaration,
    ImportKind,
    ImportOrExportSpecifier,
    ImportSpecifier,
    ImportTypeNode,
    IncompleteCompletionsCache,
    IndexedAccessTypeNode,
    insertSorted,
    InternalSymbolName,
    isAbstractConstructorSymbol,
    isArrowFunction,
    isAssertionExpression,
    isAwaitExpression,
    isBigIntLiteral,
    isBinaryExpression,
    isBindingElement,
    isBindingPattern,
    isBreakOrContinueStatement,
    isCallExpression,
    isCaseBlock,
    isCaseClause,
    isCaseKeyword,
    isCheckJsEnabledForFile,
    isClassElement,
    isClassLike,
    isClassMemberModifier,
    isClassOrTypeElement,
    isClassStaticBlockDeclaration,
    isComputedPropertyName,
    isConstructorDeclaration,
    isContextualKeyword,
    isDeclarationName,
    isDecorator,
    isDeprecatedDeclaration,
    isEntityName,
    isEnumMember,
    isEqualityOperatorKind,
    isExportAssignment,
    isExportDeclaration,
    isExpression,
    isExternalModuleNameRelative,
    isExternalModuleReference,
    isExternalModuleSymbol,
    isFunctionBlock,
    isFunctionLike,
    isFunctionLikeDeclaration,
    isFunctionLikeKind,
    isFunctionTypeNode,
    isGetAccessorDeclaration,
    isIdentifier,
    isIdentifierPart,
    isIdentifierStart,
    isIdentifierText,
    isImportable,
    isImportAttributes,
    isImportDeclaration,
    isImportEqualsDeclaration,
    isImportKeyword,
    isImportSpecifier,
    isInComment,
    isIndexSignatureDeclaration,
    isInferTypeNode,
    isInitializedProperty,
    isInJSFile,
    isInRightSideOfInternalImportEqualsDeclaration,
    isInString,
    isInterfaceDeclaration,
    isIntersectionTypeNode,
    isInTypeQuery,
    isJSDoc,
    isJSDocAugmentsTag,
    isJSDocImplementsTag,
    isJSDocImportTag,
    isJSDocParameterTag,
    isJSDocTag,
    isJSDocTemplateTag,
    isJsxAttribute,
    isJsxClosingElement,
    isJsxElement,
    isJsxExpression,
    isJsxFragment,
    isJsxOpeningLikeElement,
    isJsxSpreadAttribute,
    isKeyword,
    isKnownSymbol,
    isLabeledStatement,
    isLiteralImportTypeNode,
    isMemberName,
    isMethodDeclaration,
    isModifier,
    isModifierKind,
    isModuleDeclaration,
    isNamedExports,
    isNamedImports,
    isNamedImportsOrExports,
    isNamespaceImport,
    isNodeDescendantOf,
    isNonContextualKeyword,
    isObjectBindingPattern,
    isObjectLiteralExpression,
    isObjectTypeDeclaration,
    isParameter,
    isParameterPropertyModifier,
    isPartOfTypeNode,
    isPossiblyTypeArgumentPosition,
    isPrivateIdentifier,
    isPrivateIdentifierClassElementDeclaration,
    isPropertyAccessExpression,
    isPropertyAssignment,
    isPropertyDeclaration,
    isPropertyNameLiteral,
    isRegularExpressionLiteral,
    isSetAccessorDeclaration,
    isShorthandPropertyAssignment,
    isSingleOrDoubleQuote,
    isSourceFile,
    isSourceFileJS,
    isSpreadAssignment,
    isStatement,
    isStatic,
    isString,
    isStringAndEmptyAnonymousObjectIntersection,
    isStringANonContextualKeyword,
    isStringLiteralLike,
    isStringLiteralOrTemplate,
    isStringTextContainingNode,
    isSyntaxList,
    isTypeKeyword,
    isTypeKeywordTokenOrIdentifier,
    isTypeLiteralNode,
    isTypeNode,
    isTypeOfExpression,
    isTypeOnlyImportDeclaration,
    isTypeOnlyImportOrExportDeclaration,
    isTypeParameterDeclaration,
    isTypeReferenceType,
    isValidTypeOnlyAliasUseSite,
    isVariableDeclaration,
    isVariableLike,
    JsDoc,
    JSDocImportTag,
    JSDocParameterTag,
    JSDocPropertyTag,
    JSDocReturnTag,
    JSDocSatisfiesTag,
    JSDocTag,
    JSDocTagInfo,
    JSDocTemplateTag,
    JSDocThrowsTag,
    JSDocTypedefTag,
    JSDocTypeExpression,
    JSDocTypeTag,
    JsxAttribute,
    JsxAttributes,
    JsxClosingElement,
    JsxElement,
    JsxOpeningLikeElement,
    JsxSpreadAttribute,
    LanguageServiceHost,
    LanguageVariant,
    last,
    lastOrUndefined,
    length,
    ListFormat,
    LiteralType,
    LiteralTypeNode,
    map,
    mapDefined,
    MemberOverrideStatus,
    memoize,
    memoizeOne,
    MethodDeclaration,
    ModifierFlags,
    ModifierLike,
    modifiersToFlags,
    ModifierSyntaxKind,
    modifierToFlag,
    ModuleDeclaration,
    moduleExportNameTextEscaped,
    ModuleReference,
    NamedImportBindings,
    newCaseClauseTracker,
    NewExpression,
    Node,
    NodeArray,
    NodeBuilderFlags,
    NodeFlags,
    nodeIsMissing,
    NumericLiteral,
    ObjectBindingPattern,
    ObjectLiteralExpression,
    ObjectType,
    ObjectTypeDeclaration,
    or,
    ParameterDeclaration,
    ParenthesizedTypeNode,
    positionBelongsToNode,
    positionIsASICandidate,
    positionsAreOnSameLine,
    PrinterOptions,
    probablyUsesSemicolons,
    Program,
    programContainsModules,
    PropertyAccessExpression,
    PropertyDeclaration,
    PropertyName,
    PropertySignature,
    PseudoBigInt,
    pseudoBigIntToString,
    QualifiedName,
    quote,
    QuotePreference,
    rangeContainsPosition,
    rangeContainsPositionExclusive,
    rangeIsOnSingleLine,
    scanner,
    ScriptElementKind,
    ScriptElementKindModifier,
    ScriptTarget,
    SemanticMeaning,
    setEmitFlags,
    setSnippetElement,
    SignatureHelp,
    SignatureKind,
    singleElementArray,
    skipAlias,
    SnippetKind,
    some,
    SortedArray,
    SourceFile,
    SpreadAssignment,
    startsWith,
    stringToToken,
    stripQuotes,
    Symbol,
    SymbolDisplay,
    SymbolDisplayPart,
    SymbolDisplayPartKind,
    SymbolExportInfo,
    SymbolFlags,
    SymbolId,
    SyntaxKind,
    TextChange,
    textChanges,
    textPart,
    TextRange,
    TextSpan,
    ThisContainer,
    timestamp,
    Token,
    TokenSyntaxKind,
    tokenToString,
    toSorted,
    tryCast,
    tryGetImportFromModuleSpecifier,
    tryGetTextOfPropertyName,
    Type,
    TypeChecker,
    TypeElement,
    TypeFlags,
    TypeLiteralNode,
    TypeNode,
    TypeOnlyImportDeclaration,
    TypeParameterDeclaration,
    TypeQueryNode,
    TypeReferenceNode,
    unescapeLeadingUnderscores,
    UnionReduction,
    UnionType,
    UserPreferences,
    VariableDeclaration,
    walkUpParenthesizedExpressions,
} from "./_namespaces/ts.js";

// Exported only for tests
/** @internal */
export const moduleSpecifierResolutionLimit = 100;
/** @internal @knipignore */
export const moduleSpecifierResolutionCacheAttemptLimit = 1000;

/** @internal */
export type Log = (message: string) => void;

/** @internal */
export type SortText = string & { __sortText: any; };
/** @internal */
export const SortText = {
    // Presets
    LocalDeclarationPriority: "10" as SortText,
    LocationPriority: "11" as SortText,
    OptionalMember: "12" as SortText,
    MemberDeclaredBySpreadAssignment: "13" as SortText,
    SuggestedClassMembers: "14" as SortText,
    GlobalsOrKeywords: "15" as SortText,
    AutoImportSuggestions: "16" as SortText,
    ClassMemberSnippets: "17" as SortText,
    JavascriptIdentifiers: "18" as SortText,

    // Transformations
    Deprecated(sortText: SortText): SortText {
        return "z" + sortText as SortText;
    },

    ObjectLiteralProperty(presetSortText: SortText, symbolDisplayName: string): SortText {
        return `${presetSortText}\0${symbolDisplayName}\0` as SortText;
    },

    SortBelow(sortText: SortText): SortText {
        return sortText + "1" as SortText;
    },
};

/** All commit characters, valid when `isNewIdentifierLocation` is false. */
const allCommitCharacters = [".", ",", ";"];

/** Commit characters valid at expression positions where we could be inside a parameter list. */
const noCommaCommitCharacters = [".", ";"];

/**
 * Special values for `CompletionInfo['source']` used to disambiguate
 * completion items with the same `name`. (Each completion item must
 * have a unique name/source combination, because those two fields
 * comprise `CompletionEntryIdentifier` in `getCompletionEntryDetails`.
 *
 * When the completion item is an auto-import suggestion, the source
 * is the module specifier of the suggestion. To avoid collisions,
 * the values here should not be a module specifier we would ever
 * generate for an auto-import.
 *
 * @internal
 */
export enum CompletionSource {
    /** Completions that require `this.` insertion text */
    ThisProperty = "ThisProperty/",
    /** Auto-import that comes attached to a class member snippet */
    ClassMemberSnippet = "ClassMemberSnippet/",
    /** A type-only import that needs to be promoted in order to be used at the completion location */
    TypeOnlyAlias = "TypeOnlyAlias/",
    /** Auto-import that comes attached to an object literal method snippet */
    ObjectLiteralMethodSnippet = "ObjectLiteralMethodSnippet/",
    /** Case completions for switch statements */
    SwitchCases = "SwitchCases/",
    /** Completions for an Object literal expression */
    ObjectLiteralMemberWithComma = "ObjectLiteralMemberWithComma/",
}

// dprint-ignore
/** @internal */
export const enum SymbolOriginInfoKind {
    ThisType             = 1 << 0,
    SymbolMember         = 1 << 1,
    Export               = 1 << 2,
    Promise              = 1 << 3,
    Nullable             = 1 << 4,
    ResolvedExport       = 1 << 5,
    TypeOnlyAlias        = 1 << 6,
    ObjectLiteralMethod  = 1 << 7,
    Ignore               = 1 << 8,
    ComputedPropertyName = 1 << 9,

    SymbolMemberNoExport = SymbolMember,
    SymbolMemberExport   = SymbolMember | Export,
}

/** @internal */
export interface SymbolOriginInfo {
    kind: SymbolOriginInfoKind;
    isDefaultExport?: boolean;
    isFromPackageJson?: boolean;
    fileName?: string;
}

interface SymbolOriginInfoExport extends SymbolOriginInfo {
    symbolName: string;
    moduleSymbol: Symbol;
    isDefaultExport: boolean;
    exportName: string;
    exportMapKey: ExportMapInfoKey;
}

interface SymbolOriginInfoResolvedExport extends SymbolOriginInfo {
    symbolName: string;
    moduleSymbol: Symbol;
    exportName: string;
    exportMapKey?: ExportMapInfoKey;
    moduleSpecifier: string;
}

interface SymbolOriginInfoTypeOnlyImport extends SymbolOriginInfo {
    declaration: TypeOnlyImportDeclaration;
}

interface SymbolOriginInfoObjectLiteralMethod extends SymbolOriginInfo {
    insertText: string;
    labelDetails: CompletionEntryLabelDetails;
    isSnippet?: true;
}

interface SymbolOriginInfoComputedPropertyName extends SymbolOriginInfo {
    symbolName: string;
}

function originIsThisType(origin: SymbolOriginInfo): boolean {
    return !!(origin.kind & SymbolOriginInfoKind.ThisType);
}

function originIsSymbolMember(origin: SymbolOriginInfo): boolean {
    return !!(origin.kind & SymbolOriginInfoKind.SymbolMember);
}

function originIsExport(origin: SymbolOriginInfo | undefined): origin is SymbolOriginInfoExport {
    return !!(origin && origin.kind & SymbolOriginInfoKind.Export);
}

function originIsResolvedExport(origin: SymbolOriginInfo | undefined): origin is SymbolOriginInfoResolvedExport {
    return !!(origin && origin.kind === SymbolOriginInfoKind.ResolvedExport);
}

function originIncludesSymbolName(origin: SymbolOriginInfo | undefined): origin is SymbolOriginInfoExport | SymbolOriginInfoResolvedExport | SymbolOriginInfoComputedPropertyName {
    return originIsExport(origin) || originIsResolvedExport(origin) || originIsComputedPropertyName(origin);
}

function originIsPackageJsonImport(origin: SymbolOriginInfo | undefined): origin is SymbolOriginInfoExport {
    return (originIsExport(origin) || originIsResolvedExport(origin)) && !!origin.isFromPackageJson;
}

function originIsPromise(origin: SymbolOriginInfo): boolean {
    return !!(origin.kind & SymbolOriginInfoKind.Promise);
}

function originIsNullableMember(origin: SymbolOriginInfo): boolean {
    return !!(origin.kind & SymbolOriginInfoKind.Nullable);
}

function originIsTypeOnlyAlias(origin: SymbolOriginInfo | undefined): origin is SymbolOriginInfoTypeOnlyImport {
    return !!(origin && origin.kind & SymbolOriginInfoKind.TypeOnlyAlias);
}

function originIsObjectLiteralMethod(origin: SymbolOriginInfo | undefined): origin is SymbolOriginInfoObjectLiteralMethod {
    return !!(origin && origin.kind & SymbolOriginInfoKind.ObjectLiteralMethod);
}

function originIsIgnore(origin: SymbolOriginInfo | undefined): boolean {
    return !!(origin && origin.kind & SymbolOriginInfoKind.Ignore);
}

function originIsComputedPropertyName(origin: SymbolOriginInfo | undefined): origin is SymbolOriginInfoComputedPropertyName {
    return !!(origin && origin.kind & SymbolOriginInfoKind.ComputedPropertyName);
}

/** @internal */
export interface UniqueNameSet {
    add(name: string): void;
    has(name: string): boolean;
}

/**
 * Map from symbol index in `symbols` -> SymbolOriginInfo.
 *
 * @internal
 */
export type SymbolOriginInfoMap = Record<number, SymbolOriginInfo>;

/**
 * Map from symbol id -> SortText.
 *
 * @internal
 */
export type SymbolSortTextMap = (SortText | undefined)[];

// dprint-ignore
const enum KeywordCompletionFilters {
    None,                           // No keywords
    All,                            // Every possible keyword (TODO: This is never appropriate)
    ClassElementKeywords,           // Keywords inside class body
    InterfaceElementKeywords,       // Keywords inside interface body
    ConstructorParameterKeywords,   // Keywords at constructor parameter
    FunctionLikeBodyKeywords,       // Keywords at function like body
    TypeAssertionKeywords,
    TypeKeywords,
    TypeKeyword,                    // Literally just `type`
    Last = TypeKeyword,
}

const enum GlobalsSearch {
    Continue,
    Success,
    Fail,
}

interface ModuleSpecifierResolutionContext {
    tryResolve: (exportInfo: readonly SymbolExportInfo[], isFromAmbientModule: boolean) => ModuleSpecifierResolutionResult;
    resolvedAny: () => boolean;
    skippedAny: () => boolean;
    resolvedBeyondLimit: () => boolean;
}

type ModuleSpecifierResolutionResult = "skipped" | "failed" | {
    exportInfo?: SymbolExportInfo | FutureSymbolExportInfo;
    moduleSpecifier: string;
};

function resolvingModuleSpecifiers<TReturn>(
    logPrefix: string,
    host: LanguageServiceHost,
    resolver: codefix.ImportSpecifierResolver,
    program: Program,
    position: number,
    preferences: UserPreferences,
    isForImportStatementCompletion: boolean,
    isValidTypeOnlyUseSite: boolean,
    cb: (context: ModuleSpecifierResolutionContext) => TReturn,
): TReturn {
    const start = timestamp();
    // Under `--moduleResolution nodenext` or `bundler`, we have to resolve module specifiers up front, because
    // package.json exports can mean we *can't* resolve a module specifier (that doesn't include a
    // relative path into node_modules), and we want to filter those completions out entirely.
    // Import statement completions always need specifier resolution because the module specifier is
    // part of their `insertText`, not the `codeActions` creating edits away from the cursor.
    // Finally, `autoImportSpecifierExcludeRegexes` necessitates eagerly resolving module specifiers
    // because completion items are being explcitly filtered out by module specifier.
    const needsFullResolution = isForImportStatementCompletion
        || getResolvePackageJsonExports(program.getCompilerOptions())
        || preferences.autoImportSpecifierExcludeRegexes?.length;
    let skippedAny = false;
    let ambientCount = 0;
    let resolvedCount = 0;
    let resolvedFromCacheCount = 0;
    let cacheAttemptCount = 0;

    const result = cb({
        tryResolve,
        skippedAny: () => skippedAny,
        resolvedAny: () => resolvedCount > 0,
        resolvedBeyondLimit: () => resolvedCount > moduleSpecifierResolutionLimit,
    });

    const hitRateMessage = cacheAttemptCount ? ` (${(resolvedFromCacheCount / cacheAttemptCount * 100).toFixed(1)}% hit rate)` : "";
    host.log?.(`${logPrefix}: resolved ${resolvedCount} module specifiers, plus ${ambientCount} ambient and ${resolvedFromCacheCount} from cache${hitRateMessage}`);
    host.log?.(`${logPrefix}: response is ${skippedAny ? "incomplete" : "complete"}`);
    host.log?.(`${logPrefix}: ${timestamp() - start}`);
    return result;

    function tryResolve(exportInfo: readonly SymbolExportInfo[], isFromAmbientModule: boolean): ModuleSpecifierResolutionResult {
        if (isFromAmbientModule) {
            const result = resolver.getModuleSpecifierForBestExportInfo(exportInfo, position, isValidTypeOnlyUseSite);
            if (result) {
                ambientCount++;
            }
            return result || "failed";
        }
        const shouldResolveModuleSpecifier = needsFullResolution || preferences.allowIncompleteCompletions && resolvedCount < moduleSpecifierResolutionLimit;
        const shouldGetModuleSpecifierFromCache = !shouldResolveModuleSpecifier && preferences.allowIncompleteCompletions && cacheAttemptCount < moduleSpecifierResolutionCacheAttemptLimit;
        const result = (shouldResolveModuleSpecifier || shouldGetModuleSpecifierFromCache)
            ? resolver.getModuleSpecifierForBestExportInfo(exportInfo, position, isValidTypeOnlyUseSite, shouldGetModuleSpecifierFromCache)
            : undefined;

        if (!shouldResolveModuleSpecifier && !shouldGetModuleSpecifierFromCache || shouldGetModuleSpecifierFromCache && !result) {
            skippedAny = true;
        }

        resolvedCount += result?.computedWithoutCacheCount || 0;
        resolvedFromCacheCount += exportInfo.length - (result?.computedWithoutCacheCount || 0);
        if (shouldGetModuleSpecifierFromCache) {
            cacheAttemptCount++;
        }

        return result || (needsFullResolution ? "failed" : "skipped");
    }
}

/** @internal */
export function getDefaultCommitCharacters(isNewIdentifierLocation: boolean): string[] {
    if (isNewIdentifierLocation) {
        return [];
    }
    return allCommitCharacters;
}

/** @internal */
export function getCompletionsAtPosition(
    host: LanguageServiceHost,
    program: Program,
    log: Log,
    sourceFile: SourceFile,
    position: number,
    preferences: UserPreferences,
    triggerCharacter: CompletionsTriggerCharacter | undefined,
    completionKind: CompletionTriggerKind | undefined,
    cancellationToken: CancellationToken,
    formatContext?: formatting.FormatContext,
    includeSymbol = false,
): CompletionInfo | undefined {
    const { previousToken } = getRelevantTokens(position, sourceFile);
    if (triggerCharacter && !isInString(sourceFile, position, previousToken) && !isValidTrigger(sourceFile, triggerCharacter, previousToken, position)) {
        return undefined;
    }

    if (triggerCharacter === " ") {
        // `isValidTrigger` ensures we are at `import |`
        if (preferences.includeCompletionsForImportStatements && preferences.includeCompletionsWithInsertText) {
            return {
                isGlobalCompletion: true,
                isMemberCompletion: false,
                isNewIdentifierLocation: true,
                isIncomplete: true,
                entries: [],
                defaultCommitCharacters: getDefaultCommitCharacters(/*isNewIdentifierLocation*/ true),
            };
        }
        return undefined;
    }

    const compilerOptions = program.getCompilerOptions();
    const checker = program.getTypeChecker();
    // If the request is a continuation of an earlier `isIncomplete` response,
    // we can continue it from the cached previous response.
    const incompleteCompletionsCache = preferences.allowIncompleteCompletions ? host.getIncompleteCompletionsCache?.() : undefined;
    if (incompleteCompletionsCache && completionKind === CompletionTriggerKind.TriggerForIncompleteCompletions && previousToken && isIdentifier(previousToken)) {
        const incompleteContinuation = continuePreviousIncompleteResponse(incompleteCompletionsCache, sourceFile, previousToken, program, host, preferences, cancellationToken, position);
        if (incompleteContinuation) {
            return incompleteContinuation;
        }
    }
    else {
        incompleteCompletionsCache?.clear();
    }

    const stringCompletions = StringCompletions.getStringLiteralCompletions(sourceFile, position, previousToken, compilerOptions, host, program, log, preferences, includeSymbol);
    if (stringCompletions) {
        return stringCompletions;
    }

    if (
        previousToken && isBreakOrContinueStatement(previousToken.parent)
        && (previousToken.kind === SyntaxKind.BreakKeyword || previousToken.kind === SyntaxKind.ContinueKeyword || previousToken.kind === SyntaxKind.Identifier)
    ) {
        return getLabelCompletionAtPosition(previousToken.parent);
    }

    const completionData = getCompletionData(program, log, sourceFile, compilerOptions, position, preferences, /*detailsEntryId*/ undefined, host, formatContext, cancellationToken);
    if (!completionData) {
        return undefined;
    }

    switch (completionData.kind) {
        case CompletionDataKind.Data:
            const response = completionInfoFromData(sourceFile, host, program, compilerOptions, log, completionData, preferences, formatContext, position, includeSymbol);
            if (response?.isIncomplete) {
                incompleteCompletionsCache?.set(response);
            }
            return response;
        case CompletionDataKind.JsDocTagName:
            // If the current position is a jsDoc tag name, only tag names should be provided for completion
            return jsdocCompletionInfo([
                ...JsDoc.getJSDocTagNameCompletions(),
                ...getJSDocParameterCompletions(
                    sourceFile,
                    position,
                    checker,
                    compilerOptions,
                    preferences,
                    /*tagNameOnly*/ true,
                ),
            ]);
        case CompletionDataKind.JsDocTag:
            // If the current position is a jsDoc tag, only tags should be provided for completion
            return jsdocCompletionInfo([
                ...JsDoc.getJSDocTagCompletions(),
                ...getJSDocParameterCompletions(
                    sourceFile,
                    position,
                    checker,
                    compilerOptions,
                    preferences,
                    /*tagNameOnly*/ false,
                ),
            ]);
        case CompletionDataKind.JsDocParameterName:
            return jsdocCompletionInfo(JsDoc.getJSDocParameterNameCompletions(completionData.tag));
        case CompletionDataKind.Keywords:
            return specificKeywordCompletionInfo(completionData.keywordCompletions, completionData.isNewIdentifierLocation);
        default:
            return Debug.assertNever(completionData);
    }
}

// Editors will use the `sortText` and then fall back to `name` for sorting, but leave ties in response order.
// So, it's important that we sort those ties in the order we want them displayed if it matters. We don't
// strictly need to sort by name or SortText here since clients are going to do it anyway, but we have to
// do the work of comparing them so we can sort those ties appropriately; plus, it makes the order returned
// by the language service consistent with what TS Server does and what editors typically do. This also makes
// completions tests make more sense. We used to sort only alphabetically and only in the server layer, but
// this made tests really weird, since most fourslash tests don't use the server.
function compareCompletionEntries(entryInArray: CompletionEntry, entryToInsert: CompletionEntry): Comparison {
    let result = compareStringsCaseSensitiveUI(entryInArray.sortText, entryToInsert.sortText);
    if (result === Comparison.EqualTo) {
        result = compareStringsCaseSensitiveUI(entryInArray.name, entryToInsert.name);
    }
    if (result === Comparison.EqualTo && entryInArray.data?.moduleSpecifier && entryToInsert.data?.moduleSpecifier) {
        // Sort same-named auto-imports by module specifier
        result = compareNumberOfDirectorySeparators(
            (entryInArray.data as CompletionEntryDataResolved).moduleSpecifier,
            (entryToInsert.data as CompletionEntryDataResolved).moduleSpecifier,
        );
    }
    if (result === Comparison.EqualTo) {
        // Fall back to symbol order - if we return `EqualTo`, `insertSorted` will put later symbols first.
        return Comparison.LessThan;
    }
    return result;
}

function completionEntryDataIsResolved(data: CompletionEntryDataAutoImport | undefined): data is CompletionEntryDataResolved {
    return !!data?.moduleSpecifier;
}

function continuePreviousIncompleteResponse(
    cache: IncompleteCompletionsCache,
    file: SourceFile,
    location: Identifier,
    program: Program,
    host: LanguageServiceHost,
    preferences: UserPreferences,
    cancellationToken: CancellationToken,
    position: number,
): CompletionInfo | undefined {
    const previousResponse = cache.get();
    if (!previousResponse) return undefined;

    const touchNode = getTouchingPropertyName(file, position);
    const lowerCaseTokenText = location.text.toLowerCase();
    const exportMap = getExportInfoMap(file, host, program, preferences, cancellationToken);
    const newEntries = resolvingModuleSpecifiers(
        "continuePreviousIncompleteResponse",
        host,
        codefix.createImportSpecifierResolver(file, program, host, preferences),
        program,
        location.getStart(),
        preferences,
        /*isForImportStatementCompletion*/ false,
        isValidTypeOnlyAliasUseSite(location),
        context => {
            const entries = mapDefined(previousResponse.entries, entry => {
                if (!entry.hasAction || !entry.source || !entry.data || completionEntryDataIsResolved(entry.data)) {
                    // Not an auto import or already resolved; keep as is
                    return entry;
                }
                if (!charactersFuzzyMatchInString(entry.name, lowerCaseTokenText)) {
                    // No longer matches typed characters; filter out
                    return undefined;
                }

                const { origin } = Debug.checkDefined(getAutoImportSymbolFromCompletionEntryData(entry.name, entry.data, program, host));
                const info = exportMap.get(file.path, entry.data.exportMapKey);

                const result = info && context.tryResolve(info, !isExternalModuleNameRelative(stripQuotes(origin.moduleSymbol.name)));
                if (result === "skipped") return entry;
                if (!result || result === "failed") {
                    host.log?.(`Unexpected failure resolving auto import for '${entry.name}' from '${entry.source}'`);
                    return undefined;
                }

                const newOrigin: SymbolOriginInfoResolvedExport = {
                    ...origin,
                    kind: SymbolOriginInfoKind.ResolvedExport,
                    moduleSpecifier: result.moduleSpecifier,
                };
                // Mutating for performance... feels sketchy but nobody else uses the cache,
                // so why bother allocating a bunch of new objects?
                entry.data = originToCompletionEntryData(newOrigin);
                entry.source = getSourceFromOrigin(newOrigin);
                entry.sourceDisplay = [textPart(newOrigin.moduleSpecifier)];
                return entry;
            });

            if (!context.skippedAny()) {
                previousResponse.isIncomplete = undefined;
            }

            return entries;
        },
    );

    previousResponse.entries = newEntries;
    previousResponse.flags = (previousResponse.flags || 0) | CompletionInfoFlags.IsContinuation;
    previousResponse.optionalReplacementSpan = getOptionalReplacementSpan(touchNode);
    return previousResponse;
}

function jsdocCompletionInfo(entries: CompletionEntry[]): CompletionInfo {
    return {
        isGlobalCompletion: false,
        isMemberCompletion: false,
        isNewIdentifierLocation: false,
        entries,
        defaultCommitCharacters: getDefaultCommitCharacters(/*isNewIdentifierLocation*/ false),
    };
}

function getJSDocParameterCompletions(
    sourceFile: SourceFile,
    position: number,
    checker: TypeChecker,
    options: CompilerOptions,
    preferences: UserPreferences,
    tagNameOnly: boolean,
): CompletionEntry[] {
    const currentToken = getTokenAtPosition(sourceFile, position);
    if (!isJSDocTag(currentToken) && !isJSDoc(currentToken)) {
        return [];
    }
    const jsDoc = isJSDoc(currentToken) ? currentToken : currentToken.parent;
    if (!isJSDoc(jsDoc)) {
        return [];
    }
    const func = jsDoc.parent;
    if (!isFunctionLike(func)) {
        return [];
    }

    const isJs = isSourceFileJS(sourceFile);
    const isSnippet = preferences.includeCompletionsWithSnippetText || undefined;
    const paramTagCount = countWhere(jsDoc.tags, tag => isJSDocParameterTag(tag) && tag.getEnd() <= position);
    return mapDefined(func.parameters, param => {
        if (getJSDocParameterTags(param).length) {
            return undefined; // Parameter is already annotated.
        }
        if (isIdentifier(param.name)) { // Named parameter
            const tabstopCounter = { tabstop: 1 };
            const paramName = param.name.text;
            let displayText = getJSDocParamAnnotation(
                paramName,
                param.initializer,
                param.dotDotDotToken,
                isJs,
                /*isObject*/ false,
                /*isSnippet*/ false,
                checker,
                options,
                preferences,
            );
            let snippetText = isSnippet
                ? getJSDocParamAnnotation(
                    paramName,
                    param.initializer,
                    param.dotDotDotToken,
                    isJs,
                    /*isObject*/ false,
                    /*isSnippet*/ true,
                    checker,
                    options,
                    preferences,
                    tabstopCounter,
                )
                : undefined;
            if (tagNameOnly) { // Remove `@`
                displayText = displayText.slice(1);
                if (snippetText) snippetText = snippetText.slice(1);
            }
            return {
                name: displayText,
                kind: ScriptElementKind.parameterElement,
                sortText: SortText.LocationPriority,
                insertText: isSnippet ? snippetText : undefined,
                isSnippet,
            };
        }
        else if (param.parent.parameters.indexOf(param) === paramTagCount) { // Destructuring parameter; do it positionally
            const paramPath = `param${paramTagCount}`;
            const displayTextResult = generateJSDocParamTagsForDestructuring(
                paramPath,
                param.name,
                param.initializer,
                param.dotDotDotToken,
                isJs,
                /*isSnippet*/ false,
                checker,
                options,
                preferences,
            );
            const snippetTextResult = isSnippet
                ? generateJSDocParamTagsForDestructuring(
                    paramPath,
                    param.name,
                    param.initializer,
                    param.dotDotDotToken,
                    isJs,
                    /*isSnippet*/ true,
                    checker,
                    options,
                    preferences,
                )
                : undefined;
            let displayText = displayTextResult.join(getNewLineCharacter(options) + "* ");
            let snippetText = snippetTextResult?.join(getNewLineCharacter(options) + "* ");
            if (tagNameOnly) { // Remove `@`
                displayText = displayText.slice(1);
                if (snippetText) snippetText = snippetText.slice(1);
            }
            return {
                name: displayText,
                kind: ScriptElementKind.parameterElement,
                sortText: SortText.LocationPriority,
                insertText: isSnippet ? snippetText : undefined,
                isSnippet,
            };
        }
    });
}

function generateJSDocParamTagsForDestructuring(
    path: string,
    pattern: BindingPattern,
    initializer: Expression | undefined,
    dotDotDotToken: DotDotDotToken | undefined,
    isJs: boolean,
    isSnippet: boolean,
    checker: TypeChecker,
    options: CompilerOptions,
    preferences: UserPreferences,
): string[] {
    if (!isJs) {
        return [
            getJSDocParamAnnotation(
                path,
                initializer,
                dotDotDotToken,
                isJs,
                /*isObject*/ false,
                isSnippet,
                checker,
                options,
                preferences,
                { tabstop: 1 },
            ),
        ];
    }
    return patternWorker(path, pattern, initializer, dotDotDotToken, { tabstop: 1 });

    function patternWorker(
        path: string,
        pattern: BindingPattern,
        initializer: Expression | undefined,
        dotDotDotToken: DotDotDotToken | undefined,
        counter: TabStopCounter,
    ): string[] {
        if (isObjectBindingPattern(pattern) && !dotDotDotToken) {
            const oldTabstop = counter.tabstop;
            const childCounter = { tabstop: oldTabstop };
            const rootParam = getJSDocParamAnnotation(
                path,
                initializer,
                dotDotDotToken,
                isJs,
                /*isObject*/ true,
                isSnippet,
                checker,
                options,
                preferences,
                childCounter,
            );
            let childTags: string[] | undefined = [];
            for (const element of pattern.elements) {
                const elementTags = elementWorker(path, element, childCounter);
                if (!elementTags) {
                    childTags = undefined;
                    break;
                }
                else {
                    childTags.push(...elementTags);
                }
            }
            if (childTags) {
                counter.tabstop = childCounter.tabstop;
                return [rootParam, ...childTags];
            }
        }
        return [
            getJSDocParamAnnotation(
                path,
                initializer,
                dotDotDotToken,
                isJs,
                /*isObject*/ false,
                isSnippet,
                checker,
                options,
                preferences,
                counter,
            ),
        ];
    }

    // Assumes binding element is inside object binding pattern.
    // We can't really deeply annotate an array binding pattern.
    function elementWorker(path: string, element: BindingElement, counter: TabStopCounter): string[] | undefined {
        if ((!element.propertyName && isIdentifier(element.name)) || isIdentifier(element.name)) { // `{ b }` or `{ b: newB }`
            const propertyName = element.propertyName ? tryGetTextOfPropertyName(element.propertyName) : element.name.text;
            if (!propertyName) {
                return undefined;
            }
            const paramName = `${path}.${propertyName}`;
            return [
                getJSDocParamAnnotation(
                    paramName,
                    element.initializer,
                    element.dotDotDotToken,
                    isJs,
                    /*isObject*/ false,
                    isSnippet,
                    checker,
                    options,
                    preferences,
                    counter,
                ),
            ];
        }
        else if (element.propertyName) { // `{ b: {...} }` or `{ b: [...] }`
            const propertyName = tryGetTextOfPropertyName(element.propertyName);
            return propertyName
                && patternWorker(`${path}.${propertyName}`, element.name, element.initializer, element.dotDotDotToken, counter);
        }
        return undefined;
    }
}

interface TabStopCounter {
    tabstop: number;
}

function getJSDocParamAnnotation(
    paramName: string,
    initializer: Expression | undefined,
    dotDotDotToken: DotDotDotToken | undefined,
    isJs: boolean,
    isObject: boolean,
    isSnippet: boolean,
    checker: TypeChecker,
    options: CompilerOptions,
    preferences: UserPreferences,
    tabstopCounter?: TabStopCounter,
) {
    if (isSnippet) {
        Debug.assertIsDefined(tabstopCounter);
    }
    if (initializer) {
        paramName = getJSDocParamNameWithInitializer(paramName, initializer);
    }
    if (isSnippet) {
        paramName = escapeSnippetText(paramName);
    }
    if (isJs) {
        let type = "*";
        if (isObject) {
            Debug.assert(!dotDotDotToken, `Cannot annotate a rest parameter with type 'Object'.`);
            type = "Object";
        }
        else {
            if (initializer) {
                const inferredType = checker.getTypeAtLocation(initializer.parent);
                if (!(inferredType.flags & (TypeFlags.Any | TypeFlags.Void))) {
                    const sourceFile = initializer.getSourceFile();
                    const quotePreference = getQuotePreference(sourceFile, preferences);
                    const builderFlags = quotePreference === QuotePreference.Single ? NodeBuilderFlags.UseSingleQuotesForStringLiteralType : NodeBuilderFlags.None;
                    const typeNode = checker.typeToTypeNode(inferredType, findAncestor(initializer, isFunctionLike), builderFlags);
                    if (typeNode) {
                        const printer = isSnippet
                            ? createSnippetPrinter({
                                removeComments: true,
                                module: options.module,
                                moduleResolution: options.moduleResolution,
                                target: options.target,
                            })
                            : createPrinter({
                                removeComments: true,
                                module: options.module,
                                moduleResolution: options.moduleResolution,
                                target: options.target,
                            });
                        setEmitFlags(typeNode, EmitFlags.SingleLine);
                        type = printer.printNode(EmitHint.Unspecified, typeNode, sourceFile);
                    }
                }
            }
            if (isSnippet && type === "*") {
                type = `\${${tabstopCounter!.tabstop++}:${type}}`;
            }
        }
        const dotDotDot = !isObject && dotDotDotToken ? "..." : "";
        const description = isSnippet ? `\${${tabstopCounter!.tabstop++}}` : "";
        return `@param {${dotDotDot}${type}} ${paramName} ${description}`;
    }
    else {
        const description = isSnippet ? `\${${tabstopCounter!.tabstop++}}` : "";
        return `@param ${paramName} ${description}`;
    }
}

function getJSDocParamNameWithInitializer(paramName: string, initializer: Expression): string {
    const initializerText = initializer.getText().trim();
    if (initializerText.includes("\n") || initializerText.length > 80) {
        return `[${paramName}]`;
    }
    return `[${paramName}=${initializerText}]`;
}

function keywordToCompletionEntry(keyword: TokenSyntaxKind) {
    return {
        name: tokenToString(keyword)!,
        kind: ScriptElementKind.keyword,
        kindModifiers: ScriptElementKindModifier.none,
        sortText: SortText.GlobalsOrKeywords,
    };
}

function specificKeywordCompletionInfo(entries: readonly CompletionEntry[], isNewIdentifierLocation: boolean): CompletionInfo {
    return {
        isGlobalCompletion: false,
        isMemberCompletion: false,
        isNewIdentifierLocation,
        entries: entries.slice(),
        defaultCommitCharacters: getDefaultCommitCharacters(isNewIdentifierLocation),
    };
}

function keywordCompletionData(keywordFilters: KeywordCompletionFilters, filterOutTsOnlyKeywords: boolean, isNewIdentifierLocation: boolean): Request {
    return {
        kind: CompletionDataKind.Keywords,
        keywordCompletions: getKeywordCompletions(keywordFilters, filterOutTsOnlyKeywords),
        isNewIdentifierLocation,
    };
}

function keywordFiltersFromSyntaxKind(keywordCompletion: TokenSyntaxKind): KeywordCompletionFilters {
    switch (keywordCompletion) {
        case SyntaxKind.TypeKeyword:
            return KeywordCompletionFilters.TypeKeyword;
        default:
            Debug.fail("Unknown mapping from SyntaxKind to KeywordCompletionFilters");
    }
}

function getOptionalReplacementSpan(location: Node | undefined) {
    // StringLiteralLike locations are handled separately in stringCompletions.ts
    return location?.kind === SyntaxKind.Identifier ? createTextSpanFromNode(location) : undefined;
}

function completionInfoFromData(
    sourceFile: SourceFile,
    host: LanguageServiceHost,
    program: Program,
    compilerOptions: CompilerOptions,
    log: Log,
    completionData: CompletionData,
    preferences: UserPreferences,
    formatContext: formatting.FormatContext | undefined,
    position: number,
    includeSymbol: boolean | undefined,
): CompletionInfo | undefined {
    const {
        symbols,
        contextToken,
        completionKind,
        isInSnippetScope,
        isNewIdentifierLocation,
        location,
        propertyAccessToConvert,
        keywordFilters,
        symbolToOriginInfoMap,
        recommendedCompletion,
        isJsxInitializer,
        isTypeOnlyLocation,
        isJsxIdentifierExpected,
        isRightOfOpenTag,
        isRightOfDotOrQuestionDot,
        importStatementCompletion,
        insideJsDocTagTypeExpression,
        symbolToSortTextMap,
        hasUnresolvedAutoImports,
        defaultCommitCharacters,
    } = completionData;
    let literals = completionData.literals;

    const checker = program.getTypeChecker();

    // Verify if the file is JSX language variant
    if (getLanguageVariant(sourceFile.scriptKind) === LanguageVariant.JSX) {
        const completionInfo = getJsxClosingTagCompletion(location, sourceFile);
        if (completionInfo) {
            return completionInfo;
        }
    }

    // When the completion is for the expression of a case clause (e.g. `case |`),
    // filter literals & enum symbols whose values are already present in existing case clauses.
    const caseClause = findAncestor(contextToken, isCaseClause);
    if (caseClause && (isCaseKeyword(contextToken!) || isNodeDescendantOf(contextToken!, caseClause.expression))) {
        const tracker = newCaseClauseTracker(checker, caseClause.parent.clauses);
        literals = literals.filter(literal => !tracker.hasValue(literal));
        // The `symbols` array cannot be filtered directly, because to each symbol at position i in `symbols`,
        // there might be a corresponding origin at position i in `symbolToOriginInfoMap`.
        // So instead of filtering the `symbols` array, we mark symbols to be ignored.
        symbols.forEach((symbol, i) => {
            if (symbol.valueDeclaration && isEnumMember(symbol.valueDeclaration)) {
                const value = checker.getConstantValue(symbol.valueDeclaration);
                if (value !== undefined && tracker.hasValue(value)) {
                    symbolToOriginInfoMap[i] = { kind: SymbolOriginInfoKind.Ignore };
                }
            }
        });
    }

    const entries = createSortedArray<CompletionEntry>();
    const isChecked = isCheckedFile(sourceFile, compilerOptions);
    if (isChecked && !isNewIdentifierLocation && (!symbols || symbols.length === 0) && keywordFilters === KeywordCompletionFilters.None) {
        return undefined;
    }
    const uniqueNames = getCompletionEntriesFromSymbols(
        symbols,
        entries,
        /*replacementToken*/ undefined,
        contextToken,
        location,
        position,
        sourceFile,
        host,
        program,
        getEmitScriptTarget(compilerOptions),
        log,
        completionKind,
        preferences,
        compilerOptions,
        formatContext,
        isTypeOnlyLocation,
        propertyAccessToConvert,
        isJsxIdentifierExpected,
        isJsxInitializer,
        importStatementCompletion,
        recommendedCompletion,
        symbolToOriginInfoMap,
        symbolToSortTextMap,
        isJsxIdentifierExpected,
        isRightOfOpenTag,
        includeSymbol,
    );

    if (keywordFilters !== KeywordCompletionFilters.None) {
        for (const keywordEntry of getKeywordCompletions(keywordFilters, !insideJsDocTagTypeExpression && isSourceFileJS(sourceFile))) {
            if (
                isTypeOnlyLocation && isTypeKeyword(stringToToken(keywordEntry.name)!) ||
                !isTypeOnlyLocation && isContextualKeywordInAutoImportableExpressionSpace(keywordEntry.name) ||
                !uniqueNames.has(keywordEntry.name)
            ) {
                uniqueNames.add(keywordEntry.name);
                insertSorted(entries, keywordEntry, compareCompletionEntries, /*equalityComparer*/ undefined, /*allowDuplicates*/ true);
            }
        }
    }

    for (const keywordEntry of getContextualKeywords(contextToken, position)) {
        if (!uniqueNames.has(keywordEntry.name)) {
            uniqueNames.add(keywordEntry.name);
            insertSorted(entries, keywordEntry, compareCompletionEntries, /*equalityComparer*/ undefined, /*allowDuplicates*/ true);
        }
    }

    for (const literal of literals) {
        const literalEntry = createCompletionEntryForLiteral(sourceFile, preferences, literal);
        uniqueNames.add(literalEntry.name);
        insertSorted(entries, literalEntry, compareCompletionEntries, /*equalityComparer*/ undefined, /*allowDuplicates*/ true);
    }

    if (!isChecked) {
        getJSCompletionEntries(sourceFile, location.pos, uniqueNames, getEmitScriptTarget(compilerOptions), entries);
    }

    let caseBlock: CaseBlock | undefined;
    if (
        preferences.includeCompletionsWithInsertText
        && contextToken
        && !isRightOfOpenTag
        && !isRightOfDotOrQuestionDot
        && (caseBlock = findAncestor(contextToken, isCaseBlock))
    ) {
        const cases = getExhaustiveCaseSnippets(caseBlock, sourceFile, preferences, compilerOptions, host, program, formatContext);
        if (cases) {
            entries.push(cases.entry);
        }
    }

    return {
        flags: completionData.flags,
        isGlobalCompletion: isInSnippetScope,
        isIncomplete: preferences.allowIncompleteCompletions && hasUnresolvedAutoImports ? true : undefined,
        isMemberCompletion: isMemberCompletionKind(completionKind),
        isNewIdentifierLocation,
        optionalReplacementSpan: getOptionalReplacementSpan(location),
        entries,
        defaultCommitCharacters: defaultCommitCharacters ?? getDefaultCommitCharacters(isNewIdentifierLocation),
    };
}

function isCheckedFile(sourceFile: SourceFile, compilerOptions: CompilerOptions): boolean {
    return !isSourceFileJS(sourceFile) || !!isCheckJsEnabledForFile(sourceFile, compilerOptions);
}

function getExhaustiveCaseSnippets(
    caseBlock: CaseBlock,
    sourceFile: SourceFile,
    preferences: UserPreferences,
    options: CompilerOptions,
    host: LanguageServiceHost,
    program: Program,
    formatContext: formatting.FormatContext | undefined,
): { entry: CompletionEntry; importAdder: codefix.ImportAdder; } | undefined {
    const clauses = caseBlock.clauses;
    const checker = program.getTypeChecker();
    const switchType = checker.getTypeAtLocation(caseBlock.parent.expression);
    if (switchType && switchType.isUnion() && every(switchType.types, type => type.isLiteral())) {
        // Collect constant values in existing clauses.
        const tracker = newCaseClauseTracker(checker, clauses);

        const target = getEmitScriptTarget(options);
        const quotePreference = getQuotePreference(sourceFile, preferences);
        const importAdder = codefix.createImportAdder(sourceFile, program, preferences, host);
        const elements: Expression[] = [];
        for (const type of switchType.types as LiteralType[]) {
            // Enums
            if (type.flags & TypeFlags.EnumLiteral) {
                Debug.assert(type.symbol, "An enum member type should have a symbol");
                Debug.assert(type.symbol.parent, "An enum member type should have a parent symbol (the enum symbol)");
                // Filter existing enums by their values
                const enumValue = type.symbol.valueDeclaration && checker.getConstantValue(type.symbol.valueDeclaration as EnumMember);
                if (enumValue !== undefined) {
                    if (tracker.hasValue(enumValue)) {
                        continue;
                    }
                    tracker.addValue(enumValue);
                }
                const typeNode = codefix.typeToAutoImportableTypeNode(checker, importAdder, type, caseBlock, target);
                if (!typeNode) {
                    return undefined;
                }
                const expr = typeNodeToExpression(typeNode, target, quotePreference);
                if (!expr) {
                    return undefined;
                }
                elements.push(expr);
            }
            // Literals
            else if (!tracker.hasValue(type.value)) {
                switch (typeof type.value) {
                    case "object":
                        elements.push(type.value.negative ? factory.createPrefixUnaryExpression(SyntaxKind.MinusToken, factory.createBigIntLiteral({ negative: false, base10Value: type.value.base10Value })) : factory.createBigIntLiteral(type.value));
                        break;
                    case "number":
                        elements.push(type.value < 0 ? factory.createPrefixUnaryExpression(SyntaxKind.MinusToken, factory.createNumericLiteral(-type.value)) : factory.createNumericLiteral(type.value));
                        break;
                    case "string":
                        elements.push(factory.createStringLiteral(type.value, quotePreference === QuotePreference.Single));
                        break;
                }
            }
        }
        if (elements.length === 0) {
            return undefined;
        }

        const newClauses = map(elements, element => factory.createCaseClause(element, []));
        const newLineChar = getNewLineOrDefaultFromHost(host, formatContext?.options);
        const printer = createSnippetPrinter({
            removeComments: true,
            module: options.module,
            moduleResolution: options.moduleResolution,
            target: options.target,
            newLine: getNewLineKind(newLineChar),
        });
        const printNode = formatContext
            ? (node: Node) => printer.printAndFormatNode(EmitHint.Unspecified, node, sourceFile, formatContext)
            : (node: Node) => printer.printNode(EmitHint.Unspecified, node, sourceFile);
        const insertText = map(newClauses, (clause, i) => {
            if (preferences.includeCompletionsWithSnippetText) {
                return `${printNode(clause)}$${i + 1}`;
            }
            return `${printNode(clause)}`;
        }).join(newLineChar);

        const firstClause = printer.printNode(EmitHint.Unspecified, newClauses[0], sourceFile);
        return {
            entry: {
                name: `${firstClause} ...`,
                kind: ScriptElementKind.unknown,
                sortText: SortText.GlobalsOrKeywords,
                insertText,
                hasAction: importAdder.hasFixes() || undefined,
                source: CompletionSource.SwitchCases,
                isSnippet: preferences.includeCompletionsWithSnippetText ? true : undefined,
            },
            importAdder,
        };
    }

    return undefined;
}

function typeNodeToExpression(typeNode: TypeNode, languageVersion: ScriptTarget, quotePreference: QuotePreference): Expression | undefined {
    switch (typeNode.kind) {
        case SyntaxKind.TypeReference:
            const typeName = (typeNode as TypeReferenceNode).typeName;
            return entityNameToExpression(typeName, languageVersion, quotePreference);
        case SyntaxKind.IndexedAccessType:
            const objectExpression = typeNodeToExpression((typeNode as IndexedAccessTypeNode).objectType, languageVersion, quotePreference);
            const indexExpression = typeNodeToExpression((typeNode as IndexedAccessTypeNode).indexType, languageVersion, quotePreference);
            return objectExpression
                && indexExpression
                && factory.createElementAccessExpression(objectExpression, indexExpression);
        case SyntaxKind.LiteralType:
            const literal = (typeNode as LiteralTypeNode).literal;
            switch (literal.kind) {
                case SyntaxKind.StringLiteral:
                    return factory.createStringLiteral(literal.text, quotePreference === QuotePreference.Single);
                case SyntaxKind.NumericLiteral:
                    return factory.createNumericLiteral(literal.text, (literal as NumericLiteral).numericLiteralFlags);
            }
            return undefined;
        case SyntaxKind.ParenthesizedType:
            const exp = typeNodeToExpression((typeNode as ParenthesizedTypeNode).type, languageVersion, quotePreference);
            return exp && (isIdentifier(exp) ? exp : factory.createParenthesizedExpression(exp));
        case SyntaxKind.TypeQuery:
            return entityNameToExpression((typeNode as TypeQueryNode).exprName, languageVersion, quotePreference);
        case SyntaxKind.ImportType:
            Debug.fail(`We should not get an import type after calling 'codefix.typeToAutoImportableTypeNode'.`);
    }

    return undefined;
}

function entityNameToExpression(entityName: EntityName, languageVersion: ScriptTarget, quotePreference: QuotePreference): Expression {
    if (isIdentifier(entityName)) {
        return entityName;
    }
    const unescapedName = unescapeLeadingUnderscores(entityName.right.escapedText);
    if (canUsePropertyAccess(unescapedName, languageVersion)) {
        return factory.createPropertyAccessExpression(
            entityNameToExpression(entityName.left, languageVersion, quotePreference),
            unescapedName,
        );
    }
    else {
        return factory.createElementAccessExpression(
            entityNameToExpression(entityName.left, languageVersion, quotePreference),
            factory.createStringLiteral(unescapedName, quotePreference === QuotePreference.Single),
        );
    }
}

function isMemberCompletionKind(kind: CompletionKind): boolean {
    switch (kind) {
        case CompletionKind.ObjectPropertyDeclaration:
        case CompletionKind.MemberLike:
        case CompletionKind.PropertyAccess:
            return true;
        default:
            return false;
    }
}

function getJsxClosingTagCompletion(location: Node | undefined, sourceFile: SourceFile): CompletionInfo | undefined {
    // We wanna walk up the tree till we find a JSX closing element
    const jsxClosingElement = findAncestor(location, node => {
        switch (node.kind) {
            case SyntaxKind.JsxClosingElement:
                return true;
            case SyntaxKind.SlashToken:
            case SyntaxKind.GreaterThanToken:
            case SyntaxKind.Identifier:
            case SyntaxKind.PropertyAccessExpression:
                return false;
            default:
                return "quit";
        }
    }) as JsxClosingElement | undefined;

    if (jsxClosingElement) {
        // In the TypeScript JSX element, if such element is not defined. When users query for completion at closing tag,
        // instead of simply giving unknown value, the completion will return the tag-name of an associated opening-element.
        // For example:
        //     var x = <div> </ /*1*/
        // The completion list at "1" will contain "div>" with type any
        // And at `<div> </ /*1*/ >` (with a closing `>`), the completion list will contain "div".
        // And at property access expressions `<MainComponent.Child> </MainComponent. /*1*/ >` the completion will
        // return full closing tag with an optional replacement span
        // For example:
        //     var x = <MainComponent.Child> </     MainComponent /*1*/  >
        //     var y = <MainComponent.Child> </   /*2*/   MainComponent >
        // the completion list at "1" and "2" will contain "MainComponent.Child" with a replacement span of closing tag name
        const hasClosingAngleBracket = !!findChildOfKind(jsxClosingElement, SyntaxKind.GreaterThanToken, sourceFile);
        const tagName = jsxClosingElement.parent.openingElement.tagName;
        const closingTag = tagName.getText(sourceFile);
        const fullClosingTag = closingTag + (hasClosingAngleBracket ? "" : ">");
        const replacementSpan = createTextSpanFromNode(jsxClosingElement.tagName);

        const entry: CompletionEntry = {
            name: fullClosingTag,
            kind: ScriptElementKind.classElement,
            kindModifiers: undefined,
            sortText: SortText.LocationPriority,
        };
        return {
            isGlobalCompletion: false,
            isMemberCompletion: true,
            isNewIdentifierLocation: false,
            optionalReplacementSpan: replacementSpan,
            entries: [entry],
            defaultCommitCharacters: getDefaultCommitCharacters(/*isNewIdentifierLocation*/ false),
        };
    }
    return;
}

function getJSCompletionEntries(
    sourceFile: SourceFile,
    position: number,
    uniqueNames: UniqueNameSet,
    target: ScriptTarget,
    entries: SortedArray<CompletionEntry>,
): void {
    getNameTable(sourceFile).forEach((pos, name) => {
        // Skip identifiers produced only from the current location
        if (pos === position) {
            return;
        }
        const realName = unescapeLeadingUnderscores(name);
        if (!uniqueNames.has(realName) && isIdentifierText(realName, target)) {
            uniqueNames.add(realName);
            insertSorted(entries, {
                name: realName,
                kind: ScriptElementKind.warning,
                kindModifiers: "",
                sortText: SortText.JavascriptIdentifiers,
                isFromUncheckedFile: true,
                commitCharacters: [],
            }, compareCompletionEntries);
        }
    });
}

function completionNameForLiteral(sourceFile: SourceFile, preferences: UserPreferences, literal: string | number | PseudoBigInt): string {
    return typeof literal === "object" ? pseudoBigIntToString(literal) + "n" :
        isString(literal) ? quote(sourceFile, preferences, literal) : JSON.stringify(literal);
}

function createCompletionEntryForLiteral(sourceFile: SourceFile, preferences: UserPreferences, literal: string | number | PseudoBigInt): CompletionEntry {
    return {
        name: completionNameForLiteral(sourceFile, preferences, literal),
        kind: ScriptElementKind.string,
        kindModifiers: ScriptElementKindModifier.none,
        sortText: SortText.LocationPriority,
        commitCharacters: [],
    };
}

function createCompletionEntry(
    symbol: Symbol,
    sortText: SortText,
    replacementToken: Node | undefined,
    contextToken: Node | undefined,
    location: Node,
    position: number,
    sourceFile: SourceFile,
    host: LanguageServiceHost,
    program: Program,
    name: string,
    needsConvertPropertyAccess: boolean,
    origin: SymbolOriginInfo | undefined,
    recommendedCompletion: Symbol | undefined,
    propertyAccessToConvert: PropertyAccessExpression | undefined,
    isJsxInitializer: IsJsxInitializer | undefined,
    importStatementCompletion: ImportStatementCompletionInfo | undefined,
    useSemicolons: boolean,
    options: CompilerOptions,
    preferences: UserPreferences,
    completionKind: CompletionKind,
    formatContext: formatting.FormatContext | undefined,
    isJsxIdentifierExpected: boolean | undefined,
    isRightOfOpenTag: boolean | undefined,
    includeSymbol: boolean,
): CompletionEntry | undefined {
    let insertText: string | undefined;
    let filterText: string | undefined;
    let replacementSpan = getReplacementSpanForContextToken(replacementToken, position);
    let data: CompletionEntryData | undefined;
    let isSnippet: true | undefined;
    let source = getSourceFromOrigin(origin);
    let sourceDisplay;
    let hasAction;
    let labelDetails;

    const typeChecker = program.getTypeChecker();
    const insertQuestionDot = origin && originIsNullableMember(origin);
    const useBraces = origin && originIsSymbolMember(origin) || needsConvertPropertyAccess;
    if (origin && originIsThisType(origin)) {
        insertText = needsConvertPropertyAccess
            ? `this${insertQuestionDot ? "?." : ""}[${quotePropertyName(sourceFile, preferences, name)}]`
            : `this${insertQuestionDot ? "?." : "."}${name}`;
    }
    // We should only have needsConvertPropertyAccess if there's a property access to convert. But see #21790.
    // Somehow there was a global with a non-identifier name. Hopefully someone will complain about getting a "foo bar" global completion and provide a repro.
    else if ((useBraces || insertQuestionDot) && propertyAccessToConvert) {
        insertText = useBraces ? needsConvertPropertyAccess ? `[${quotePropertyName(sourceFile, preferences, name)}]` : `[${name}]` : name;
        if (insertQuestionDot || propertyAccessToConvert.questionDotToken) {
            insertText = `?.${insertText}`;
        }

        const dot = findChildOfKind(propertyAccessToConvert, SyntaxKind.DotToken, sourceFile) ||
            findChildOfKind(propertyAccessToConvert, SyntaxKind.QuestionDotToken, sourceFile);
        if (!dot) {
            return undefined;
        }
        // If the text after the '.' starts with this name, write over it. Else, add new text.
        const end = startsWith(name, propertyAccessToConvert.name.text) ? propertyAccessToConvert.name.end : dot.end;
        replacementSpan = createTextSpanFromBounds(dot.getStart(sourceFile), end);
    }

    if (isJsxInitializer) {
        if (insertText === undefined) insertText = name;
        insertText = `{${insertText}}`;
        if (typeof isJsxInitializer !== "boolean") {
            replacementSpan = createTextSpanFromNode(isJsxInitializer, sourceFile);
        }
    }
    if (origin && originIsPromise(origin) && propertyAccessToConvert) {
        if (insertText === undefined) insertText = name;
        const precedingToken = findPrecedingToken(propertyAccessToConvert.pos, sourceFile);
        let awaitText = "";
        if (precedingToken && positionIsASICandidate(precedingToken.end, precedingToken.parent, sourceFile)) {
            awaitText = ";";
        }

        awaitText += `(await ${propertyAccessToConvert.expression.getText()})`;
        insertText = needsConvertPropertyAccess ? `${awaitText}${insertText}` : `${awaitText}${insertQuestionDot ? "?." : "."}${insertText}`;
        const isInAwaitExpression = tryCast(propertyAccessToConvert.parent, isAwaitExpression);
        const wrapNode = isInAwaitExpression ? propertyAccessToConvert.parent : propertyAccessToConvert.expression;
        replacementSpan = createTextSpanFromBounds(wrapNode.getStart(sourceFile), propertyAccessToConvert.end);
    }

    if (originIsResolvedExport(origin)) {
        sourceDisplay = [textPart(origin.moduleSpecifier)];
        if (importStatementCompletion) {
            ({ insertText, replacementSpan } = getInsertTextAndReplacementSpanForImportCompletion(name, importStatementCompletion, origin, useSemicolons, sourceFile, program, preferences));
            isSnippet = preferences.includeCompletionsWithSnippetText ? true : undefined;
        }
    }

    if (origin?.kind === SymbolOriginInfoKind.TypeOnlyAlias) {
        hasAction = true;
    }

    // Provide object member completions when missing commas, and insert missing commas.
    // For example:
    //
    //    interface I {
    //        a: string;
    //        b: number
    //     }
    //
    //     const cc: I = { a: "red" | }
    //
    // Completion should add a comma after "red" and provide completions for b
    if (completionKind === CompletionKind.ObjectPropertyDeclaration && contextToken && findPrecedingToken(contextToken.pos, sourceFile, contextToken)?.kind !== SyntaxKind.CommaToken) {
        if (
            isMethodDeclaration(contextToken.parent.parent) ||
            isGetAccessorDeclaration(contextToken.parent.parent) ||
            isSetAccessorDeclaration(contextToken.parent.parent) ||
            isSpreadAssignment(contextToken.parent) ||
            findAncestor(contextToken.parent, isPropertyAssignment)?.getLastToken(sourceFile) === contextToken ||
            isShorthandPropertyAssignment(contextToken.parent) && getLineAndCharacterOfPosition(sourceFile, contextToken.getEnd()).line !== getLineAndCharacterOfPosition(sourceFile, position).line
        ) {
            source = CompletionSource.ObjectLiteralMemberWithComma;
            hasAction = true;
        }
    }

    if (
        preferences.includeCompletionsWithClassMemberSnippets &&
        preferences.includeCompletionsWithInsertText &&
        completionKind === CompletionKind.MemberLike &&
        isClassLikeMemberCompletion(symbol, location, sourceFile)
    ) {
        let importAdder;
        const memberCompletionEntry = getEntryForMemberCompletion(
            host,
            program,
            options,
            preferences,
            name,
            symbol,
            location,
            position,
            contextToken,
            formatContext,
        );
        if (memberCompletionEntry) {
            ({ insertText, filterText, isSnippet, importAdder } = memberCompletionEntry);
            if (importAdder?.hasFixes() || memberCompletionEntry.eraseRange) {
                hasAction = true;
                source = CompletionSource.ClassMemberSnippet;
            }
        }
        else {
            return undefined; // Skip this entry
        }
    }

    if (origin && originIsObjectLiteralMethod(origin)) {
        ({ insertText, isSnippet, labelDetails } = origin);
        if (!preferences.useLabelDetailsInCompletionEntries) {
            name = name + labelDetails.detail;
            labelDetails = undefined;
        }
        source = CompletionSource.ObjectLiteralMethodSnippet;
        sortText = SortText.SortBelow(sortText);
    }

    if (
        isJsxIdentifierExpected && !isRightOfOpenTag
        && preferences.includeCompletionsWithSnippetText && preferences.jsxAttributeCompletionStyle
        && preferences.jsxAttributeCompletionStyle !== "none" && !(isJsxAttribute(location.parent) && location.parent.initializer)
    ) {
        let useBraces = preferences.jsxAttributeCompletionStyle === "braces";
        const type = typeChecker.getTypeOfSymbolAtLocation(symbol, location);

        // If is boolean like or undefined, don't return a snippet we want just to return the completion.
        if (
            preferences.jsxAttributeCompletionStyle === "auto"
            && !(type.flags & TypeFlags.BooleanLike)
            && !(type.flags & TypeFlags.Union && find((type as UnionType).types, type => !!(type.flags & TypeFlags.BooleanLike)))
        ) {
            if (type.flags & TypeFlags.StringLike || (type.flags & TypeFlags.Union && every((type as UnionType).types, type => !!(type.flags & (TypeFlags.StringLike | TypeFlags.Undefined) || isStringAndEmptyAnonymousObjectIntersection(type))))) {
                // If is string like or undefined use quotes
                insertText = `${escapeSnippetText(name)}=${quote(sourceFile, preferences, "$1")}`;
                isSnippet = true;
            }
            else {
                // Use braces for everything else
                useBraces = true;
            }
        }

        if (useBraces) {
            insertText = `${escapeSnippetText(name)}={$1}`;
            isSnippet = true;
        }
    }

    if (insertText !== undefined && !preferences.includeCompletionsWithInsertText) {
        return undefined;
    }

    if (originIsExport(origin) || originIsResolvedExport(origin)) {
        data = originToCompletionEntryData(origin);
        hasAction = !importStatementCompletion;
    }

    const parentNamedImportOrExport = findAncestor(location, isNamedImportsOrExports);
    if (parentNamedImportOrExport) {
        const languageVersion = getEmitScriptTarget(host.getCompilationSettings());
        if (!isIdentifierText(name, languageVersion)) {
            insertText = quotePropertyName(sourceFile, preferences, name);

            if (parentNamedImportOrExport.kind === SyntaxKind.NamedImports) {
                // check if it is import { ^here as name } from '...'
                // we have to access the scanner here to check if it is { ^here as name } or { ^here, as, name }.
                scanner.setText(sourceFile.text);
                scanner.resetTokenState(position);
                if (!(scanner.scan() === SyntaxKind.AsKeyword && scanner.scan() === SyntaxKind.Identifier)) {
                    insertText += " as " + generateIdentifierForArbitraryString(name, languageVersion);
                }
            }
        }
        else if (parentNamedImportOrExport.kind === SyntaxKind.NamedImports) {
            const possibleToken = stringToToken(name);
            if (possibleToken && (possibleToken === SyntaxKind.AwaitKeyword || isNonContextualKeyword(possibleToken))) {
                insertText = `${name} as ${name}_`;
            }
        }
    }

    // TODO(drosen): Right now we just permit *all* semantic meanings when calling
    // 'getSymbolKind' which is permissible given that it is backwards compatible; but
    // really we should consider passing the meaning for the node so that we don't report
    // that a suggestion for a value is an interface.  We COULD also just do what
    // 'getSymbolModifiers' does, which is to use the first declaration.

    // Use a 'sortText' of 0' so that all symbol completion entries come before any other
    // entries (like JavaScript identifier entries).
    const kind = SymbolDisplay.getSymbolKind(typeChecker, symbol, location);
    const commitCharacters = (kind === ScriptElementKind.warning || kind === ScriptElementKind.string) ? [] : undefined;
    return {
        name,
        kind,
        kindModifiers: SymbolDisplay.getSymbolModifiers(typeChecker, symbol),
        sortText,
        source,
        hasAction: hasAction ? true : undefined,
        isRecommended: isRecommendedCompletionMatch(symbol, recommendedCompletion, typeChecker) || undefined,
        insertText,
        filterText,
        replacementSpan,
        sourceDisplay,
        labelDetails,
        isSnippet,
        isPackageJsonImport: originIsPackageJsonImport(origin) || undefined,
        isImportStatementCompletion: !!importStatementCompletion || undefined,
        data,
        commitCharacters,
        ...includeSymbol ? { symbol } : undefined,
    };
}

function generateIdentifierForArbitraryString(text: string, languageVersion: ScriptTarget | undefined): string {
    let needsUnderscore = false;
    let identifier = "";
    let ch: number | undefined;

    // Convert "(example, text)" into "_example_text_"
    for (let i = 0; i < text.length; i += ch !== undefined && ch >= 0x10000 ? 2 : 1) {
        ch = text.codePointAt(i);
        if (ch !== undefined && (i === 0 ? isIdentifierStart(ch, languageVersion) : isIdentifierPart(ch, languageVersion))) {
            if (needsUnderscore) identifier += "_";
            identifier += String.fromCodePoint(ch);
            needsUnderscore = false;
        }
        else {
            needsUnderscore = true;
        }
    }
    if (needsUnderscore) identifier += "_";

    // Default to "_" if the provided text was empty
    return identifier || "_";
}

function isClassLikeMemberCompletion(symbol: Symbol, location: Node, sourceFile: SourceFile): boolean {
    // TODO: support JS files.
    if (isInJSFile(location)) {
        return false;
    }

    // Completion symbol must be for a class member.
    const memberFlags = SymbolFlags.ClassMember
        & SymbolFlags.EnumMemberExcludes;
    /* In
    `class C {
        |
    }`
    `location` is a class-like declaration.
    In
    `class C {
        m|
    }`
    `location` is an identifier,
    `location.parent` is a class element declaration,
    and `location.parent.parent` is a class-like declaration.
    In
    `abstract class C {
        abstract
        abstract m|
    }`
    `location` is a syntax list (with modifiers as children),
    and `location.parent` is a class-like declaration.
    */
    return !!(symbol.flags & memberFlags) &&
        (
            isClassLike(location) ||
            (
                location.parent &&
                location.parent.parent &&
                isClassElement(location.parent) &&
                location === location.parent.name &&
                location.parent.getLastToken(sourceFile) === location.parent.name &&
                isClassLike(location.parent.parent)
            ) ||
            (
                location.parent &&
                isSyntaxList(location) &&
                isClassLike(location.parent)
            )
        );
}

function getEntryForMemberCompletion(
    host: LanguageServiceHost,
    program: Program,
    options: CompilerOptions,
    preferences: UserPreferences,
    name: string,
    symbol: Symbol,
    location: Node,
    position: number,
    contextToken: Node | undefined,
    formatContext: formatting.FormatContext | undefined,
): { insertText: string; filterText?: string; isSnippet?: true; importAdder?: codefix.ImportAdder; eraseRange?: TextRange; } | undefined {
    const classLikeDeclaration = findAncestor(location, isClassLike);
    if (!classLikeDeclaration) {
        return undefined; // This should never happen.
    }

    let isSnippet: true | undefined;
    let insertText: string = name;
    const filterText: string = name;

    const checker = program.getTypeChecker();
    const sourceFile = location.getSourceFile();
    const printer = createSnippetPrinter({
        removeComments: true,
        module: options.module,
        moduleResolution: options.moduleResolution,
        target: options.target,
        omitTrailingSemicolon: false,
        newLine: getNewLineKind(getNewLineOrDefaultFromHost(host, formatContext?.options)),
    });
    const importAdder = codefix.createImportAdder(sourceFile, program, preferences, host);

    // Create empty body for possible method implementation.
    let body;
    if (preferences.includeCompletionsWithSnippetText) {
        isSnippet = true;
        // We are adding a tabstop (i.e. `$0`) in the body of the suggested member,
        // if it has one, so that the cursor ends up in the body once the completion is inserted.
        // Note: this assumes we won't have more than one body in the completion nodes, which should be the case.
        const emptyStmt = factory.createEmptyStatement();
        body = factory.createBlock([emptyStmt], /*multiLine*/ true);
        setSnippetElement(emptyStmt, { kind: SnippetKind.TabStop, order: 0 });
    }
    else {
        body = factory.createBlock([], /*multiLine*/ true);
    }

    let modifiers = ModifierFlags.None;
    const { modifiers: presentModifiers, range: eraseRange, decorators: presentDecorators } = getPresentModifiers(contextToken, sourceFile, position);
    // Whether the suggested member should be abstract.
    // e.g. in `abstract class C { abstract | }`, we should offer abstract method signatures at position `|`.
    const isAbstract = presentModifiers & ModifierFlags.Abstract && classLikeDeclaration.modifierFlagsCache & ModifierFlags.Abstract;
    let completionNodes: codefix.AddNode[] = [];
    codefix.addNewNodeForMemberSymbol(
        symbol,
        classLikeDeclaration,
        sourceFile,
        { program, host },
        preferences,
        importAdder,
        // `addNewNodeForMemberSymbol` calls this callback function for each new member node
        // it adds for the given member symbol.
        // We store these member nodes in the `completionNodes` array.
        // Note: there might be:
        //  - No nodes if `addNewNodeForMemberSymbol` cannot figure out a node for the member;
        //  - One node;
        //  - More than one node if the member is overloaded (e.g. a method with overload signatures).
        node => {
            let requiredModifiers = ModifierFlags.None;
            if (isAbstract) {
                requiredModifiers |= ModifierFlags.Abstract;
            }
            if (
                isClassElement(node)
                && checker.getMemberOverrideModifierStatus(classLikeDeclaration, node, symbol) === MemberOverrideStatus.NeedsOverride
            ) {
                requiredModifiers |= ModifierFlags.Override;
            }
            if (!completionNodes.length) {
                // Keep track of added missing required modifiers and modifiers already present.
                // This is needed when we have overloaded signatures,
                // so this callback will be called for multiple nodes/signatures,
                // and we need to make sure the modifiers are uniform for all nodes/signatures.
                modifiers = node.modifierFlagsCache | requiredModifiers;
            }
            node = factory.replaceModifiers(node, modifiers);
            completionNodes.push(node);
        },
        body,
        codefix.PreserveOptionalFlags.Property,
        !!isAbstract,
    );

    if (completionNodes.length) {
        const isMethod = symbol.flags & SymbolFlags.Method;
        let allowedModifiers = modifiers | ModifierFlags.Override | ModifierFlags.Public;
        if (!isMethod) {
            allowedModifiers |= ModifierFlags.Ambient | ModifierFlags.Readonly;
        }
        else {
            allowedModifiers |= ModifierFlags.Async;
        }
        const allowedAndPresent = presentModifiers & allowedModifiers;
        if (presentModifiers & (~allowedModifiers)) {
            return undefined; // This completion entry will be filtered out.
        }
        // If the original member is protected, we allow it to change to public.
        if (modifiers & ModifierFlags.Protected && allowedAndPresent & ModifierFlags.Public) {
            modifiers &= ~ModifierFlags.Protected;
        }
        // `public` modifier is optional and can be dropped.
        if (allowedAndPresent !== ModifierFlags.None && !(allowedAndPresent & ModifierFlags.Public)) {
            modifiers &= ~ModifierFlags.Public;
        }
        modifiers |= allowedAndPresent;
        completionNodes = completionNodes.map(node => factory.replaceModifiers(node, modifiers));
        // Add back the decorators that were already present.
        if (presentDecorators?.length) {
            const lastNode = completionNodes[completionNodes.length - 1];
            if (canHaveDecorators(lastNode)) {
                completionNodes[completionNodes.length - 1] = factory.replaceDecoratorsAndModifiers(lastNode, (presentDecorators as ModifierLike[]).concat(getModifiers(lastNode) || []));
            }
        }

        const format = ListFormat.MultiLine | ListFormat.NoTrailingNewLine;
        // If we have access to formatting settings, we print the nodes using the emitter,
        // and then format the printed text.
        if (formatContext) {
            insertText = printer.printAndFormatSnippetList(
                format,
                factory.createNodeArray(completionNodes),
                sourceFile,
                formatContext,
            );
        }
        else { // Otherwise, just use emitter to print the new nodes.
            insertText = printer.printSnippetList(
                format,
                factory.createNodeArray(completionNodes),
                sourceFile,
            );
        }
    }

    return { insertText, filterText, isSnippet, importAdder, eraseRange };
}

function getPresentModifiers(
    contextToken: Node | undefined,
    sourceFile: SourceFile,
    position: number,
): { modifiers: ModifierFlags; decorators?: Decorator[]; range?: TextRange; } {
    if (
        !contextToken ||
        getLineAndCharacterOfPosition(sourceFile, position).line
            > getLineAndCharacterOfPosition(sourceFile, contextToken.getEnd()).line
    ) {
        return { modifiers: ModifierFlags.None };
    }
    let modifiers = ModifierFlags.None;
    let decorators: Decorator[] | undefined;
    let contextMod;
    const range: TextRange = { pos: position, end: position };

    /*
    Cases supported:
    In
    `class C {
        public abstract |
    }`
    `contextToken` is ``abstract`` (as an identifier),
    `contextToken.parent` is property declaration,
    `location` is class declaration ``class C { ... }``.
    In
    `class C {
        protected override m|
    }`
        `contextToken` is ``override`` (as a keyword),
    `contextToken.parent` is property declaration,
    `location` is identifier ``m``.
    */
    if (isPropertyDeclaration(contextToken.parent) && (contextMod = isModifierLike(contextToken))) {
        if (contextToken.parent.modifiers) {
            modifiers |= modifiersToFlags(contextToken.parent.modifiers) & ModifierFlags.Modifier;
            decorators = contextToken.parent.modifiers.filter(isDecorator) || [];
            range.pos = Math.min(...contextToken.parent.modifiers.map(n => n.getStart(sourceFile)));
        }
        const contextModifierFlag = modifierToFlag(contextMod);
        if (!(modifiers & contextModifierFlag)) {
            modifiers |= contextModifierFlag;
            range.pos = Math.min(range.pos, contextToken.getStart(sourceFile));
        }
        /*
        We have two cases:
        1.
        `class C {
            modifier |
        }`
        `contextToken` is `modifier`,
        and the range should be `modifier |`, ending at `position`,
        and
        2.
        `class C {
            modifier otherToken|
        }`
        `contextToken` is `modifier`,
        `contextToken.parent.name` is `otherToken`,
        and the range should be `modifier `, ending at the start of `otherToken`.
        */
        if (contextToken.parent.name !== contextToken) {
            range.end = contextToken.parent.name.getStart(sourceFile);
        }
    }
    return { modifiers, decorators, range: range.pos < range.end ? range : undefined };
}

function isModifierLike(node: Node): ModifierSyntaxKind | undefined {
    if (isModifier(node)) {
        return node.kind;
    }
    if (isIdentifier(node)) {
        const originalKeywordKind = identifierToKeywordKind(node);
        if (originalKeywordKind && isModifierKind(originalKeywordKind)) {
            return originalKeywordKind;
        }
    }
    return undefined;
}

function getEntryForObjectLiteralMethodCompletion(
    symbol: Symbol,
    name: string,
    enclosingDeclaration: ObjectLiteralExpression,
    program: Program,
    host: LanguageServiceHost,
    options: CompilerOptions,
    preferences: UserPreferences,
    formatContext: formatting.FormatContext | undefined,
): { insertText: string; isSnippet?: true; labelDetails: CompletionEntryLabelDetails; } | undefined {
    const isSnippet = preferences.includeCompletionsWithSnippetText || undefined;
    let insertText: string = name;

    const sourceFile = enclosingDeclaration.getSourceFile();

    const method = createObjectLiteralMethod(symbol, enclosingDeclaration, sourceFile, program, host, preferences);
    if (!method) {
        return undefined;
    }

    const printer = createSnippetPrinter({
        removeComments: true,
        module: options.module,
        moduleResolution: options.moduleResolution,
        target: options.target,
        omitTrailingSemicolon: false,
        newLine: getNewLineKind(getNewLineOrDefaultFromHost(host, formatContext?.options)),
    });
    if (formatContext) {
        insertText = printer.printAndFormatSnippetList(ListFormat.CommaDelimited | ListFormat.AllowTrailingComma, factory.createNodeArray([method], /*hasTrailingComma*/ true), sourceFile, formatContext);
    }
    else {
        insertText = printer.printSnippetList(ListFormat.CommaDelimited | ListFormat.AllowTrailingComma, factory.createNodeArray([method], /*hasTrailingComma*/ true), sourceFile);
    }

    const signaturePrinter = createPrinter({
        removeComments: true,
        module: options.module,
        moduleResolution: options.moduleResolution,
        target: options.target,
        omitTrailingSemicolon: true,
    });
    // The `labelDetails.detail` will be displayed right beside the method name,
    // so we drop the name (and modifiers) from the signature.
    const methodSignature = factory.createMethodSignature(
        /*modifiers*/ undefined,
        /*name*/ "",
        method.questionToken,
        method.typeParameters,
        method.parameters,
        method.type,
    );
    const labelDetails = { detail: signaturePrinter.printNode(EmitHint.Unspecified, methodSignature, sourceFile) };

    return { isSnippet, insertText, labelDetails };
}

function createObjectLiteralMethod(
    symbol: Symbol,
    enclosingDeclaration: ObjectLiteralExpression,
    sourceFile: SourceFile,
    program: Program,
    host: LanguageServiceHost,
    preferences: UserPreferences,
): MethodDeclaration | undefined {
    const declarations = symbol.getDeclarations();
    if (!(declarations && declarations.length)) {
        return undefined;
    }
    const checker = program.getTypeChecker();
    const declaration = declarations[0];
    const name = getSynthesizedDeepClone(getNameOfDeclaration(declaration), /*includeTrivia*/ false) as PropertyName;
    const type = checker.getWidenedType(checker.getTypeOfSymbolAtLocation(symbol, enclosingDeclaration));
    const quotePreference = getQuotePreference(sourceFile, preferences);
    const builderFlags = NodeBuilderFlags.OmitThisParameter | (quotePreference === QuotePreference.Single ? NodeBuilderFlags.UseSingleQuotesForStringLiteralType : NodeBuilderFlags.None);

    switch (declaration.kind) {
        case SyntaxKind.PropertySignature:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.MethodSignature:
        case SyntaxKind.MethodDeclaration: {
            let effectiveType = type.flags & TypeFlags.Union && (type as UnionType).types.length < 10
                ? checker.getUnionType((type as UnionType).types, UnionReduction.Subtype)
                : type;
            if (effectiveType.flags & TypeFlags.Union) {
                // Only offer the completion if there's a single function type component.
                const functionTypes = filter((effectiveType as UnionType).types, type => checker.getSignaturesOfType(type, SignatureKind.Call).length > 0);
                if (functionTypes.length === 1) {
                    effectiveType = functionTypes[0];
                }
                else {
                    return undefined;
                }
            }
            const signatures = checker.getSignaturesOfType(effectiveType, SignatureKind.Call);
            if (signatures.length !== 1) {
                // We don't support overloads in object literals.
                return undefined;
            }
            const typeNode = checker.typeToTypeNode(effectiveType, enclosingDeclaration, builderFlags, /*internalFlags*/ undefined, codefix.getNoopSymbolTrackerWithResolver({ program, host }));
            if (!typeNode || !isFunctionTypeNode(typeNode)) {
                return undefined;
            }

            let body;
            if (preferences.includeCompletionsWithSnippetText) {
                const emptyStmt = factory.createEmptyStatement();
                body = factory.createBlock([emptyStmt], /*multiLine*/ true);
                setSnippetElement(emptyStmt, { kind: SnippetKind.TabStop, order: 0 });
            }
            else {
                body = factory.createBlock([], /*multiLine*/ true);
            }

            const parameters = typeNode.parameters.map(typedParam =>
                factory.createParameterDeclaration(
                    /*modifiers*/ undefined,
                    typedParam.dotDotDotToken,
                    typedParam.name,
                    /*questionToken*/ undefined,
                    /*type*/ undefined,
                    typedParam.initializer,
                )
            );
            return factory.createMethodDeclaration(
                /*modifiers*/ undefined,
                /*asteriskToken*/ undefined,
                name,
                /*questionToken*/ undefined,
                /*typeParameters*/ undefined,
                parameters,
                /*type*/ undefined,
                body,
            );
        }
        default:
            return undefined;
    }
}

function createSnippetPrinter(
    printerOptions: PrinterOptions,
) {
    let escapes: TextChange[] | undefined;
    const baseWriter = textChanges.createWriter(getNewLineCharacter(printerOptions));
    const printer = createPrinter(printerOptions, baseWriter);
    const writer: EmitTextWriter = {
        ...baseWriter,
        write: s => escapingWrite(s, () => baseWriter.write(s)),
        nonEscapingWrite: baseWriter.write,
        writeLiteral: s => escapingWrite(s, () => baseWriter.writeLiteral(s)),
        writeStringLiteral: s => escapingWrite(s, () => baseWriter.writeStringLiteral(s)),
        writeSymbol: (s, symbol) => escapingWrite(s, () => baseWriter.writeSymbol(s, symbol)),
        writeParameter: s => escapingWrite(s, () => baseWriter.writeParameter(s)),
        writeComment: s => escapingWrite(s, () => baseWriter.writeComment(s)),
        writeProperty: s => escapingWrite(s, () => baseWriter.writeProperty(s)),
    };

    return {
        printSnippetList,
        printAndFormatSnippetList,
        printNode,
        printAndFormatNode,
    };

    // The formatter/scanner will have issues with snippet-escaped text,
    // so instead of writing the escaped text directly to the writer,
    // generate a set of changes that can be applied to the unescaped text
    // to escape it post-formatting.
    function escapingWrite(s: string, write: () => void) {
        const escaped = escapeSnippetText(s);
        if (escaped !== s) {
            const start = baseWriter.getTextPos();
            write();
            const end = baseWriter.getTextPos();
            escapes = append(escapes ||= [], { newText: escaped, span: { start, length: end - start } });
        }
        else {
            write();
        }
    }

    /** Snippet-escaping version of `printer.printList`. */
    function printSnippetList(
        format: ListFormat,
        list: NodeArray<Node>,
        sourceFile: SourceFile | undefined,
    ): string {
        const unescaped = printUnescapedSnippetList(format, list, sourceFile);
        return escapes ? textChanges.applyChanges(unescaped, escapes) : unescaped;
    }

    function printUnescapedSnippetList(
        format: ListFormat,
        list: NodeArray<Node>,
        sourceFile: SourceFile | undefined,
    ): string {
        escapes = undefined;
        writer.clear();
        printer.writeList(format, list, sourceFile, writer);
        return writer.getText();
    }

    function printAndFormatSnippetList(
        format: ListFormat,
        list: NodeArray<Node>,
        sourceFile: SourceFile,
        formatContext: formatting.FormatContext,
    ): string {
        const syntheticFile = {
            text: printUnescapedSnippetList(
                format,
                list,
                sourceFile,
            ),
            getLineAndCharacterOfPosition(pos: number) {
                return getLineAndCharacterOfPosition(this, pos);
            },
        };

        const formatOptions = getFormatCodeSettingsForWriting(formatContext, sourceFile);
        const changes = flatMap(list, node => {
            const nodeWithPos = textChanges.assignPositionsToNode(node);
            return formatting.formatNodeGivenIndentation(
                nodeWithPos,
                syntheticFile,
                sourceFile.languageVariant,
                /* indentation */ 0,
                /* delta */ 0,
                { ...formatContext, options: formatOptions },
            );
        });

        const allChanges = escapes
            ? toSorted(concatenate(changes, escapes), (a, b) => compareTextSpans(a.span, b.span))
            : changes;
        return textChanges.applyChanges(syntheticFile.text, allChanges);
    }

    /** Snippet-escaping version of `printer.printNode`. */
    function printNode(hint: EmitHint, node: Node, sourceFile: SourceFile): string {
        const unescaped = printUnescapedNode(hint, node, sourceFile);
        return escapes ? textChanges.applyChanges(unescaped, escapes) : unescaped;
    }

    function printUnescapedNode(hint: EmitHint, node: Node, sourceFile: SourceFile): string {
        escapes = undefined;
        writer.clear();
        printer.writeNode(hint, node, sourceFile, writer);
        return writer.getText();
    }

    function printAndFormatNode(
        hint: EmitHint,
        node: Node,
        sourceFile: SourceFile,
        formatContext: formatting.FormatContext,
    ): string {
        const syntheticFile = {
            text: printUnescapedNode(
                hint,
                node,
                sourceFile,
            ),
            getLineAndCharacterOfPosition(pos: number) {
                return getLineAndCharacterOfPosition(this, pos);
            },
        };

        const formatOptions = getFormatCodeSettingsForWriting(formatContext, sourceFile);
        const nodeWithPos = textChanges.assignPositionsToNode(node);
        const changes = formatting.formatNodeGivenIndentation(
            nodeWithPos,
            syntheticFile,
            sourceFile.languageVariant,
            /* indentation */ 0,
            /* delta */ 0,
            { ...formatContext, options: formatOptions },
        );

        const allChanges = escapes
            ? toSorted(concatenate(changes, escapes), (a, b) => compareTextSpans(a.span, b.span))
            : changes;
        return textChanges.applyChanges(syntheticFile.text, allChanges);
    }
}

function originToCompletionEntryData(origin: SymbolOriginInfoExport | SymbolOriginInfoResolvedExport): CompletionEntryData | undefined {
    const ambientModuleName = origin.fileName ? undefined : stripQuotes(origin.moduleSymbol.name);
    const isPackageJsonImport = origin.isFromPackageJson ? true : undefined;
    if (originIsResolvedExport(origin)) {
        const resolvedData: CompletionEntryDataResolved = {
            exportName: origin.exportName,
            exportMapKey: origin.exportMapKey,
            moduleSpecifier: origin.moduleSpecifier,
            ambientModuleName,
            fileName: origin.fileName,
            isPackageJsonImport,
        };
        return resolvedData;
    }
    const unresolvedData: CompletionEntryDataUnresolved = {
        exportName: origin.exportName,
        exportMapKey: origin.exportMapKey,
        fileName: origin.fileName,
        ambientModuleName: origin.fileName ? undefined : stripQuotes(origin.moduleSymbol.name),
        isPackageJsonImport: origin.isFromPackageJson ? true : undefined,
    };
    return unresolvedData;
}

function completionEntryDataToSymbolOriginInfo(data: CompletionEntryData, completionName: string, moduleSymbol: Symbol): SymbolOriginInfoExport | SymbolOriginInfoResolvedExport {
    const isDefaultExport = data.exportName === InternalSymbolName.Default;
    const isFromPackageJson = !!data.isPackageJsonImport;
    if (completionEntryDataIsResolved(data)) {
        const resolvedOrigin: SymbolOriginInfoResolvedExport = {
            kind: SymbolOriginInfoKind.ResolvedExport,
            exportName: data.exportName,
            exportMapKey: data.exportMapKey,
            moduleSpecifier: data.moduleSpecifier,
            symbolName: completionName,
            fileName: data.fileName,
            moduleSymbol,
            isDefaultExport,
            isFromPackageJson,
        };
        return resolvedOrigin;
    }
    const unresolvedOrigin: SymbolOriginInfoExport = {
        kind: SymbolOriginInfoKind.Export,
        exportName: data.exportName,
        exportMapKey: data.exportMapKey,
        symbolName: completionName,
        fileName: data.fileName,
        moduleSymbol,
        isDefaultExport,
        isFromPackageJson,
    };
    return unresolvedOrigin;
}

function getInsertTextAndReplacementSpanForImportCompletion(name: string, importStatementCompletion: ImportStatementCompletionInfo, origin: SymbolOriginInfoResolvedExport, useSemicolons: boolean, sourceFile: SourceFile, program: Program, preferences: UserPreferences) {
    const replacementSpan = importStatementCompletion.replacementSpan;
    const quotedModuleSpecifier = escapeSnippetText(quote(sourceFile, preferences, origin.moduleSpecifier));
    const exportKind = origin.isDefaultExport ? ExportKind.Default :
        origin.exportName === InternalSymbolName.ExportEquals ? ExportKind.ExportEquals :
        ExportKind.Named;
    const tabStop = preferences.includeCompletionsWithSnippetText ? "$1" : "";
    const importKind = codefix.getImportKind(sourceFile, exportKind, program, /*forceImportKeyword*/ true);
    const isImportSpecifierTypeOnly = importStatementCompletion.couldBeTypeOnlyImportSpecifier;
    const topLevelTypeOnlyText = importStatementCompletion.isTopLevelTypeOnly ? ` ${tokenToString(SyntaxKind.TypeKeyword)} ` : " ";
    const importSpecifierTypeOnlyText = isImportSpecifierTypeOnly ? `${tokenToString(SyntaxKind.TypeKeyword)} ` : "";
    const suffix = useSemicolons ? ";" : "";
    switch (importKind) {
        case ImportKind.CommonJS:
            return { replacementSpan, insertText: `import${topLevelTypeOnlyText}${escapeSnippetText(name)}${tabStop} = require(${quotedModuleSpecifier})${suffix}` };
        case ImportKind.Default:
            return { replacementSpan, insertText: `import${topLevelTypeOnlyText}${escapeSnippetText(name)}${tabStop} from ${quotedModuleSpecifier}${suffix}` };
        case ImportKind.Namespace:
            return { replacementSpan, insertText: `import${topLevelTypeOnlyText}* as ${escapeSnippetText(name)} from ${quotedModuleSpecifier}${suffix}` };
        case ImportKind.Named:
            return { replacementSpan, insertText: `import${topLevelTypeOnlyText}{ ${importSpecifierTypeOnlyText}${escapeSnippetText(name)}${tabStop} } from ${quotedModuleSpecifier}${suffix}` };
    }
}

function quotePropertyName(sourceFile: SourceFile, preferences: UserPreferences, name: string): string {
    if (/^\d+$/.test(name)) {
        return name;
    }

    return quote(sourceFile, preferences, name);
}

function isRecommendedCompletionMatch(localSymbol: Symbol, recommendedCompletion: Symbol | undefined, checker: TypeChecker): boolean {
    return localSymbol === recommendedCompletion ||
        !!(localSymbol.flags & SymbolFlags.ExportValue) && checker.getExportSymbolOfSymbol(localSymbol) === recommendedCompletion;
}

function getSourceFromOrigin(origin: SymbolOriginInfo | undefined): string | undefined {
    if (originIsExport(origin)) {
        return stripQuotes(origin.moduleSymbol.name);
    }
    if (originIsResolvedExport(origin)) {
        return origin.moduleSpecifier;
    }
    if (origin?.kind === SymbolOriginInfoKind.ThisType) {
        return CompletionSource.ThisProperty;
    }
    if (origin?.kind === SymbolOriginInfoKind.TypeOnlyAlias) {
        return CompletionSource.TypeOnlyAlias;
    }
}

/** @internal */
export function getCompletionEntriesFromSymbols(
    symbols: readonly Symbol[],
    entries: SortedArray<CompletionEntry>,
    replacementToken: Node | undefined,
    contextToken: Node | undefined,
    location: Node,
    position: number,
    sourceFile: SourceFile,
    host: LanguageServiceHost,
    program: Program,
    target: ScriptTarget,
    log: Log,
    kind: CompletionKind,
    preferences: UserPreferences,
    compilerOptions: CompilerOptions,
    formatContext: formatting.FormatContext | undefined,
    isTypeOnlyLocation?: boolean,
    propertyAccessToConvert?: PropertyAccessExpression,
    jsxIdentifierExpected?: boolean,
    isJsxInitializer?: IsJsxInitializer,
    importStatementCompletion?: ImportStatementCompletionInfo,
    recommendedCompletion?: Symbol,
    symbolToOriginInfoMap?: SymbolOriginInfoMap,
    symbolToSortTextMap?: SymbolSortTextMap,
    isJsxIdentifierExpected?: boolean,
    isRightOfOpenTag?: boolean,
    includeSymbol = false,
): UniqueNameSet {
    const start = timestamp();
    const closestSymbolDeclaration = getClosestSymbolDeclaration(contextToken, location);
    const useSemicolons = probablyUsesSemicolons(sourceFile);
    const typeChecker = program.getTypeChecker();
    // Tracks unique names.
    // Value is set to false for global variables or completions from external module exports, because we can have multiple of those;
    // true otherwise. Based on the order we add things we will always see locals first, then globals, then module exports.
    // So adding a completion for a local will prevent us from adding completions for external module exports sharing the same name.
    const uniques = new Map<string, boolean>();
    for (let i = 0; i < symbols.length; i++) {
        const symbol = symbols[i];
        const origin = symbolToOriginInfoMap?.[i];
        const info = getCompletionEntryDisplayNameForSymbol(symbol, target, origin, kind, !!jsxIdentifierExpected);
        if (!info || (uniques.get(info.name) && (!origin || !originIsObjectLiteralMethod(origin))) || kind === CompletionKind.Global && symbolToSortTextMap && !shouldIncludeSymbol(symbol, symbolToSortTextMap)) {
            continue;
        }

        // When in a value location in a JS file, ignore symbols that definitely seem to be type-only
        if (!isTypeOnlyLocation && isInJSFile(sourceFile) && symbolAppearsToBeTypeOnly(symbol)) {
            continue;
        }

        const { name, needsConvertPropertyAccess } = info;
        const originalSortText = symbolToSortTextMap?.[getSymbolId(symbol)] ?? SortText.LocationPriority;
        const sortText = isDeprecated(symbol, typeChecker) ? SortText.Deprecated(originalSortText) : originalSortText;
        const entry = createCompletionEntry(
            symbol,
            sortText,
            replacementToken,
            contextToken,
            location,
            position,
            sourceFile,
            host,
            program,
            name,
            needsConvertPropertyAccess,
            origin,
            recommendedCompletion,
            propertyAccessToConvert,
            isJsxInitializer,
            importStatementCompletion,
            useSemicolons,
            compilerOptions,
            preferences,
            kind,
            formatContext,
            isJsxIdentifierExpected,
            isRightOfOpenTag,
            includeSymbol,
        );
        if (!entry) {
            continue;
        }

        /** True for locals; false for globals, module exports from other files, `this.` completions. */
        const shouldShadowLaterSymbols = (!origin || originIsTypeOnlyAlias(origin)) && !(symbol.parent === undefined && !some(symbol.declarations, d => d.getSourceFile() === location.getSourceFile()));
        uniques.set(name, shouldShadowLaterSymbols);
        insertSorted(entries, entry, compareCompletionEntries, /*equalityComparer*/ undefined, /*allowDuplicates*/ true);
    }

    log("getCompletionsAtPosition: getCompletionEntriesFromSymbols: " + (timestamp() - start));

    // Prevent consumers of this map from having to worry about
    // the boolean value. Externally, it should be seen as the
    // set of all names.
    return {
        has: name => uniques.has(name),
        add: name => uniques.set(name, true),
    };

    function shouldIncludeSymbol(symbol: Symbol, symbolToSortTextMap: SymbolSortTextMap): boolean {
        let allFlags = symbol.flags;
        if (!isSourceFile(location)) {
            // export = /**/ here we want to get all meanings, so any symbol is ok
            if (isExportAssignment(location.parent)) {
                return true;
            }
            // Filter out variables from their own initializers
            // `const a = /* no 'a' here */`
            if (tryCast(closestSymbolDeclaration, isVariableDeclaration) && symbol.valueDeclaration === closestSymbolDeclaration) {
                return false;
            }

            // Filter out current and latter parameters from defaults
            // `function f(a = /* no 'a' and 'b' here */, b) { }` or
            // `function f<T = /* no 'T' and 'T2' here */>(a: T, b: T2) { }`
            const symbolDeclaration = symbol.valueDeclaration ?? symbol.declarations?.[0];
            if (closestSymbolDeclaration && symbolDeclaration) {
                if (isParameter(closestSymbolDeclaration) && isParameter(symbolDeclaration)) {
                    const parameters = closestSymbolDeclaration.parent.parameters;
                    if (symbolDeclaration.pos >= closestSymbolDeclaration.pos && symbolDeclaration.pos < parameters.end) {
                        return false;
                    }
                }
                else if (isTypeParameterDeclaration(closestSymbolDeclaration) && isTypeParameterDeclaration(symbolDeclaration)) {
                    if (closestSymbolDeclaration === symbolDeclaration && contextToken?.kind === SyntaxKind.ExtendsKeyword) {
                        // filter out the directly self-recursive type parameters
                        // `type A<K extends /* no 'K' here*/> = K`
                        return false;
                    }
                    if (isInTypeParameterDefault(contextToken) && !isInferTypeNode(closestSymbolDeclaration.parent)) {
                        const typeParameters = closestSymbolDeclaration.parent.typeParameters;
                        if (typeParameters && symbolDeclaration.pos >= closestSymbolDeclaration.pos && symbolDeclaration.pos < typeParameters.end) {
                            return false;
                        }
                    }
                }
            }

            // External modules can have global export declarations that will be
            // available as global keywords in all scopes. But if the external module
            // already has an explicit export and user only wants to user explicit
            // module imports then the global keywords will be filtered out so auto
            // import suggestions will win in the completion
            const symbolOrigin = skipAlias(symbol, typeChecker);
            // We only want to filter out the global keywords
            // Auto Imports are not available for scripts so this conditional is always false
            if (
                !!sourceFile.externalModuleIndicator
                && !compilerOptions.allowUmdGlobalAccess
                && symbolToSortTextMap[getSymbolId(symbol)] === SortText.GlobalsOrKeywords
                && (symbolToSortTextMap[getSymbolId(symbolOrigin)] === SortText.AutoImportSuggestions
                    || symbolToSortTextMap[getSymbolId(symbolOrigin)] === SortText.LocationPriority)
            ) {
                return false;
            }

            allFlags |= getCombinedLocalAndExportSymbolFlags(symbolOrigin);

            // import m = /**/ <-- It can only access namespace (if typing import = x. this would get member symbols and not namespace)
            if (isInRightSideOfInternalImportEqualsDeclaration(location)) {
                return !!(allFlags & SymbolFlags.Namespace);
            }

            if (isTypeOnlyLocation) {
                // It's a type, but you can reach it by namespace.type as well
                return symbolCanBeReferencedAtTypeLocation(symbol, typeChecker);
            }
        }

        // expressions are value space (which includes the value namespaces)
        return !!(allFlags & SymbolFlags.Value);
    }

    function symbolAppearsToBeTypeOnly(symbol: Symbol): boolean {
        const flags = getCombinedLocalAndExportSymbolFlags(skipAlias(symbol, typeChecker));
        return !(flags & SymbolFlags.Value) && (!isInJSFile(symbol.declarations?.[0]) || !!(flags & SymbolFlags.Type));
    }
}

function getLabelCompletionAtPosition(node: BreakOrContinueStatement): CompletionInfo | undefined {
    const entries = getLabelStatementCompletions(node);
    if (entries.length) {
        return {
            isGlobalCompletion: false,
            isMemberCompletion: false,
            isNewIdentifierLocation: false,
            entries,
            defaultCommitCharacters: getDefaultCommitCharacters(/*isNewIdentifierLocation*/ false),
        };
    }
}

function getLabelStatementCompletions(node: Node): CompletionEntry[] {
    const entries: CompletionEntry[] = [];
    const uniques = new Map<string, true>();
    let current = node;

    while (current) {
        if (isFunctionLike(current)) {
            break;
        }
        if (isLabeledStatement(current)) {
            const name = current.label.text;
            if (!uniques.has(name)) {
                uniques.set(name, true);
                entries.push({
                    name,
                    kindModifiers: ScriptElementKindModifier.none,
                    kind: ScriptElementKind.label,
                    sortText: SortText.LocationPriority,
                });
            }
        }
        current = current.parent;
    }
    return entries;
}

interface SymbolCompletion {
    type: "symbol";
    symbol: Symbol;
    location: Node;
    origin: SymbolOriginInfo | SymbolOriginInfoExport | SymbolOriginInfoResolvedExport | undefined;
    previousToken: Node | undefined;
    contextToken: Node | undefined;
    readonly isJsxInitializer: IsJsxInitializer;
    readonly isTypeOnlyLocation: boolean;
}
function getSymbolCompletionFromEntryId(
    program: Program,
    log: Log,
    sourceFile: SourceFile,
    position: number,
    entryId: CompletionEntryIdentifier,
    host: LanguageServiceHost,
    preferences: UserPreferences,
): SymbolCompletion | { type: "request"; request: Request; } | { type: "literal"; literal: string | number | PseudoBigInt; } | { type: "cases"; } | { type: "none"; } {
    if (entryId.source === CompletionSource.SwitchCases) {
        return { type: "cases" };
    }
    if (entryId.data) {
        const autoImport = getAutoImportSymbolFromCompletionEntryData(entryId.name, entryId.data, program, host);
        if (autoImport) {
            const { contextToken, previousToken } = getRelevantTokens(position, sourceFile);
            return {
                type: "symbol",
                symbol: autoImport.symbol,
                location: getTouchingPropertyName(sourceFile, position),
                previousToken,
                contextToken,
                isJsxInitializer: false,
                isTypeOnlyLocation: false,
                origin: autoImport.origin,
            };
        }
    }

    const compilerOptions = program.getCompilerOptions();
    const completionData = getCompletionData(program, log, sourceFile, compilerOptions, position, { includeCompletionsForModuleExports: true, includeCompletionsWithInsertText: true }, entryId, host, /*formatContext*/ undefined);
    if (!completionData) {
        return { type: "none" };
    }
    if (completionData.kind !== CompletionDataKind.Data) {
        return { type: "request", request: completionData };
    }

    const { symbols, literals, location, completionKind, symbolToOriginInfoMap, contextToken, previousToken, isJsxInitializer, isTypeOnlyLocation } = completionData;

    const literal = find(literals, l => completionNameForLiteral(sourceFile, preferences, l) === entryId.name);
    if (literal !== undefined) return { type: "literal", literal };

    // Find the symbol with the matching entry name.
    // We don't need to perform character checks here because we're only comparing the
    // name against 'entryName' (which is known to be good), not building a new
    // completion entry.
    return firstDefined(symbols, (symbol, index): SymbolCompletion | undefined => {
        const origin = symbolToOriginInfoMap[index];
        const info = getCompletionEntryDisplayNameForSymbol(symbol, getEmitScriptTarget(compilerOptions), origin, completionKind, completionData.isJsxIdentifierExpected);
        return info && info.name === entryId.name && (
                entryId.source === CompletionSource.ClassMemberSnippet && symbol.flags & SymbolFlags.ClassMember
                || entryId.source === CompletionSource.ObjectLiteralMethodSnippet && symbol.flags & (SymbolFlags.Property | SymbolFlags.Method)
                || getSourceFromOrigin(origin) === entryId.source
                || entryId.source === CompletionSource.ObjectLiteralMemberWithComma
            )
            ? { type: "symbol" as const, symbol, location, origin, contextToken, previousToken, isJsxInitializer, isTypeOnlyLocation }
            : undefined;
    }) || { type: "none" };
}

/** @internal */
export interface CompletionEntryIdentifier {
    name: string;
    source?: string;
    data?: CompletionEntryData;
}

/** @internal */
export function getCompletionEntryDetails(
    program: Program,
    log: Log,
    sourceFile: SourceFile,
    position: number,
    entryId: CompletionEntryIdentifier,
    host: LanguageServiceHost,
    formatContext: formatting.FormatContext,
    preferences: UserPreferences,
    cancellationToken: CancellationToken,
): CompletionEntryDetails | undefined {
    const typeChecker = program.getTypeChecker();
    const compilerOptions = program.getCompilerOptions();
    const { name, source, data } = entryId;

    const { previousToken, contextToken } = getRelevantTokens(position, sourceFile);
    if (isInString(sourceFile, position, previousToken)) {
        return StringCompletions.getStringLiteralCompletionDetails(name, sourceFile, position, previousToken, program, host, cancellationToken, preferences);
    }

    // Compute all the completion symbols again.
    const symbolCompletion = getSymbolCompletionFromEntryId(program, log, sourceFile, position, entryId, host, preferences);
    switch (symbolCompletion.type) {
        case "request": {
            const { request } = symbolCompletion;
            switch (request.kind) {
                case CompletionDataKind.JsDocTagName:
                    return JsDoc.getJSDocTagNameCompletionDetails(name);
                case CompletionDataKind.JsDocTag:
                    return JsDoc.getJSDocTagCompletionDetails(name);
                case CompletionDataKind.JsDocParameterName:
                    return JsDoc.getJSDocParameterNameCompletionDetails(name);
                case CompletionDataKind.Keywords:
                    return some(request.keywordCompletions, c => c.name === name) ? createSimpleDetails(name, ScriptElementKind.keyword, SymbolDisplayPartKind.keyword) : undefined;
                default:
                    return Debug.assertNever(request);
            }
        }
        case "symbol": {
            const { symbol, location, contextToken, origin, previousToken } = symbolCompletion;
            const { codeActions, sourceDisplay } = getCompletionEntryCodeActionsAndSourceDisplay(name, location, contextToken, origin, symbol, program, host, compilerOptions, sourceFile, position, previousToken, formatContext, preferences, data, source, cancellationToken);
            const symbolName = originIsComputedPropertyName(origin) ? origin.symbolName : symbol.name;
            return createCompletionDetailsForSymbol(symbol, symbolName, typeChecker, sourceFile, location, cancellationToken, codeActions, sourceDisplay); // TODO: GH#18217
        }
        case "literal": {
            const { literal } = symbolCompletion;
            return createSimpleDetails(completionNameForLiteral(sourceFile, preferences, literal), ScriptElementKind.string, typeof literal === "string" ? SymbolDisplayPartKind.stringLiteral : SymbolDisplayPartKind.numericLiteral);
        }
        case "cases": {
            const snippets = getExhaustiveCaseSnippets(
                contextToken!.parent as CaseBlock,
                sourceFile,
                preferences,
                program.getCompilerOptions(),
                host,
                program,
                /*formatContext*/ undefined,
            );

            if (snippets?.importAdder.hasFixes()) {
                const { entry, importAdder } = snippets;
                const changes = textChanges.ChangeTracker.with(
                    { host, formatContext, preferences },
                    importAdder.writeFixes,
                );
                return {
                    name: entry.name,
                    kind: ScriptElementKind.unknown,
                    kindModifiers: "",
                    displayParts: [],
                    sourceDisplay: undefined,
                    codeActions: [{
                        changes,
                        description: diagnosticToString([Diagnostics.Includes_imports_of_types_referenced_by_0, name]),
                    }],
                };
            }

            return {
                name,
                kind: ScriptElementKind.unknown,
                kindModifiers: "",
                displayParts: [],
                sourceDisplay: undefined,
            };
        }
        case "none":
            // Didn't find a symbol with this name.  See if we can find a keyword instead.
            return allKeywordsCompletions().some(c => c.name === name) ? createSimpleDetails(name, ScriptElementKind.keyword, SymbolDisplayPartKind.keyword) : undefined;
        default:
            Debug.assertNever(symbolCompletion);
    }
}

function createSimpleDetails(name: string, kind: ScriptElementKind, kind2: SymbolDisplayPartKind): CompletionEntryDetails {
    return createCompletionDetails(name, ScriptElementKindModifier.none, kind, [displayPart(name, kind2)]);
}

/** @internal */
export function createCompletionDetailsForSymbol(symbol: Symbol, name: string, checker: TypeChecker, sourceFile: SourceFile, location: Node, cancellationToken: CancellationToken, codeActions?: CodeAction[], sourceDisplay?: SymbolDisplayPart[]): CompletionEntryDetails {
    const { displayParts, documentation, symbolKind, tags } = checker.runWithCancellationToken(cancellationToken, checker => SymbolDisplay.getSymbolDisplayPartsDocumentationAndSymbolKind(checker, symbol, sourceFile, location, location, SemanticMeaning.All));
    return createCompletionDetails(name, SymbolDisplay.getSymbolModifiers(checker, symbol), symbolKind, displayParts, documentation, tags, codeActions, sourceDisplay);
}

/** @internal */
export function createCompletionDetails(name: string, kindModifiers: string, kind: ScriptElementKind, displayParts: SymbolDisplayPart[], documentation?: SymbolDisplayPart[], tags?: JSDocTagInfo[], codeActions?: CodeAction[], source?: SymbolDisplayPart[]): CompletionEntryDetails {
    return { name, kindModifiers, kind, displayParts, documentation, tags, codeActions, source, sourceDisplay: source };
}

interface CodeActionsAndSourceDisplay {
    readonly codeActions: CodeAction[] | undefined;
    readonly sourceDisplay: SymbolDisplayPart[] | undefined;
}
function getCompletionEntryCodeActionsAndSourceDisplay(
    name: string,
    location: Node,
    contextToken: Node | undefined,
    origin: SymbolOriginInfo | SymbolOriginInfoExport | SymbolOriginInfoResolvedExport | undefined,
    symbol: Symbol,
    program: Program,
    host: LanguageServiceHost,
    compilerOptions: CompilerOptions,
    sourceFile: SourceFile,
    position: number,
    previousToken: Node | undefined,
    formatContext: formatting.FormatContext,
    preferences: UserPreferences,
    data: CompletionEntryData | undefined,
    source: string | undefined,
    cancellationToken: CancellationToken,
): CodeActionsAndSourceDisplay {
    if (data?.moduleSpecifier) {
        if (previousToken && getImportStatementCompletionInfo(contextToken || previousToken, sourceFile).replacementSpan) {
            // Import statement completion: 'import c|'
            return { codeActions: undefined, sourceDisplay: [textPart(data.moduleSpecifier)] };
        }
    }

    if (source === CompletionSource.ClassMemberSnippet) {
        const { importAdder, eraseRange } = getEntryForMemberCompletion(
            host,
            program,
            compilerOptions,
            preferences,
            name,
            symbol,
            location,
            position,
            contextToken,
            formatContext,
        )!;
        if (importAdder?.hasFixes() || eraseRange) {
            const changes = textChanges.ChangeTracker.with(
                { host, formatContext, preferences },
                tracker => {
                    if (importAdder) {
                        importAdder.writeFixes(tracker);
                    }
                    if (eraseRange) {
                        tracker.deleteRange(sourceFile, eraseRange);
                    }
                },
            );
            return {
                sourceDisplay: undefined,
                codeActions: [{
                    changes,
                    description: importAdder?.hasFixes() ?
                        diagnosticToString([Diagnostics.Includes_imports_of_types_referenced_by_0, name]) :
                        diagnosticToString([Diagnostics.Update_modifiers_of_0, name]),
                }],
            };
        }
    }

    if (originIsTypeOnlyAlias(origin)) {
        const codeAction = codefix.getPromoteTypeOnlyCompletionAction(
            sourceFile,
            origin.declaration.name,
            program,
            host,
            formatContext,
            preferences,
        );

        Debug.assertIsDefined(codeAction, "Expected to have a code action for promoting type-only alias");
        return { codeActions: [codeAction], sourceDisplay: undefined };
    }

    if (source === CompletionSource.ObjectLiteralMemberWithComma && contextToken) {
        const changes = textChanges.ChangeTracker.with(
            { host, formatContext, preferences },
            tracker => tracker.insertText(sourceFile, contextToken.end, ","),
        );

        if (changes) {
            return {
                sourceDisplay: undefined,
                codeActions: [{
                    changes,
                    description: diagnosticToString([Diagnostics.Add_missing_comma_for_object_member_completion_0, name]),
                }],
            };
        }
    }

    if (!origin || !(originIsExport(origin) || originIsResolvedExport(origin))) {
        return { codeActions: undefined, sourceDisplay: undefined };
    }

    const checker = origin.isFromPackageJson ? host.getPackageJsonAutoImportProvider!()!.getTypeChecker() : program.getTypeChecker();
    const { moduleSymbol } = origin;
    const targetSymbol = checker.getMergedSymbol(skipAlias(symbol.exportSymbol || symbol, checker));
    const isJsxOpeningTagName = contextToken?.kind === SyntaxKind.LessThanToken && isJsxOpeningLikeElement(contextToken.parent);
    const { moduleSpecifier, codeAction } = codefix.getImportCompletionAction(
        targetSymbol,
        moduleSymbol,
        data?.exportMapKey,
        sourceFile,
        name,
        isJsxOpeningTagName,
        host,
        program,
        formatContext,
        previousToken && isIdentifier(previousToken) ? previousToken.getStart(sourceFile) : position,
        preferences,
        cancellationToken,
    );
    Debug.assert(!data?.moduleSpecifier || moduleSpecifier === data.moduleSpecifier);
    return { sourceDisplay: [textPart(moduleSpecifier)], codeActions: [codeAction] };
}

/** @internal */
export function getCompletionEntrySymbol(
    program: Program,
    log: Log,
    sourceFile: SourceFile,
    position: number,
    entryId: CompletionEntryIdentifier,
    host: LanguageServiceHost,
    preferences: UserPreferences,
): Symbol | undefined {
    const completion = getSymbolCompletionFromEntryId(program, log, sourceFile, position, entryId, host, preferences);
    return completion.type === "symbol" ? completion.symbol : undefined;
}

const enum CompletionDataKind {
    Data,
    JsDocTagName,
    JsDocTag,
    JsDocParameterName,
    Keywords,
}
/**
 * true: after the `=` sign but no identifier has been typed yet. Else is the Identifier after the initializer.
 *
 * @internal
 */
export type IsJsxInitializer = boolean | Identifier;
interface CompletionData {
    readonly kind: CompletionDataKind.Data;
    readonly symbols: readonly Symbol[];
    readonly completionKind: CompletionKind;
    readonly isInSnippetScope: boolean;
    /** Note that the presence of this alone doesn't mean that we need a conversion. Only do that if the completion is not an ordinary identifier. */
    readonly propertyAccessToConvert: PropertyAccessExpression | undefined;
    readonly isNewIdentifierLocation: boolean;
    readonly location: Node;
    readonly keywordFilters: KeywordCompletionFilters;
    readonly literals: readonly (string | number | PseudoBigInt)[];
    readonly symbolToOriginInfoMap: SymbolOriginInfoMap;
    readonly recommendedCompletion: Symbol | undefined;
    readonly previousToken: Node | undefined;
    readonly contextToken: Node | undefined;
    readonly isJsxInitializer: IsJsxInitializer;
    readonly insideJsDocTagTypeExpression: boolean;
    readonly symbolToSortTextMap: SymbolSortTextMap;
    readonly isTypeOnlyLocation: boolean;
    /** In JSX tag name and attribute names, identifiers like "my-tag" or "aria-name" is valid identifier. */
    readonly isJsxIdentifierExpected: boolean;
    readonly isRightOfOpenTag: boolean;
    readonly isRightOfDotOrQuestionDot: boolean;
    readonly importStatementCompletion?: ImportStatementCompletionInfo;
    readonly hasUnresolvedAutoImports?: boolean;
    readonly flags: CompletionInfoFlags;
    readonly defaultCommitCharacters: string[] | undefined;
}
type Request =
    | { readonly kind: CompletionDataKind.JsDocTagName | CompletionDataKind.JsDocTag; }
    | { readonly kind: CompletionDataKind.JsDocParameterName; tag: JSDocParameterTag; }
    | { readonly kind: CompletionDataKind.Keywords; keywordCompletions: readonly CompletionEntry[]; isNewIdentifierLocation: boolean; };

/** @internal */
export const enum CompletionKind {
    ObjectPropertyDeclaration,
    Global,
    PropertyAccess,
    MemberLike,
    String,
    None,
}

function getRecommendedCompletion(previousToken: Node, contextualType: Type, checker: TypeChecker): Symbol | undefined {
    // For a union, return the first one with a recommended completion.
    return firstDefined(contextualType && (contextualType.isUnion() ? contextualType.types : [contextualType]), type => {
        const symbol = type && type.symbol;
        // Don't include make a recommended completion for an abstract class
        return symbol && (symbol.flags & (SymbolFlags.EnumMember | SymbolFlags.Enum | SymbolFlags.Class) && !isAbstractConstructorSymbol(symbol))
            ? getFirstSymbolInChain(symbol, previousToken, checker)
            : undefined;
    });
}

function getContextualType(previousToken: Node, position: number, sourceFile: SourceFile, checker: TypeChecker): Type | undefined {
    const { parent } = previousToken;
    switch (previousToken.kind) {
        case SyntaxKind.Identifier:
            return getContextualTypeFromParent(previousToken as Identifier, checker);
        case SyntaxKind.EqualsToken:
            switch (parent.kind) {
                case SyntaxKind.VariableDeclaration:
                    return checker.getContextualType((parent as VariableDeclaration).initializer!); // TODO: GH#18217
                case SyntaxKind.BinaryExpression:
                    return checker.getTypeAtLocation((parent as BinaryExpression).left);
                case SyntaxKind.JsxAttribute:
                    return checker.getContextualTypeForJsxAttribute(parent as JsxAttribute);
                default:
                    return undefined;
            }
        case SyntaxKind.NewKeyword:
            return checker.getContextualType(parent as Expression);
        case SyntaxKind.CaseKeyword:
            const caseClause = tryCast(parent, isCaseClause);
            return caseClause ? getSwitchedType(caseClause, checker) : undefined;
        case SyntaxKind.OpenBraceToken:
            return isJsxExpression(parent) && !isJsxElement(parent.parent) && !isJsxFragment(parent.parent) ? checker.getContextualTypeForJsxAttribute(parent.parent) : undefined;
        default:
            const argInfo = SignatureHelp.getArgumentInfoForCompletions(previousToken, position, sourceFile, checker);
            return argInfo ?
                checker.getContextualTypeForArgumentAtIndex(argInfo.invocation, argInfo.argumentIndex) :
                isEqualityOperatorKind(previousToken.kind) && isBinaryExpression(parent) && isEqualityOperatorKind(parent.operatorToken.kind) ?
                // completion at `x ===/**/` should be for the right side
                checker.getTypeAtLocation(parent.left) :
                checker.getContextualType(previousToken as Expression, ContextFlags.Completions) || checker.getContextualType(previousToken as Expression);
    }
}

function getFirstSymbolInChain(symbol: Symbol, enclosingDeclaration: Node, checker: TypeChecker): Symbol | undefined {
    const chain = checker.getAccessibleSymbolChain(symbol, enclosingDeclaration, /*meaning*/ SymbolFlags.All, /*useOnlyExternalAliasing*/ false);
    if (chain) return first(chain);
    return symbol.parent && (isModuleSymbol(symbol.parent) ? symbol : getFirstSymbolInChain(symbol.parent, enclosingDeclaration, checker));
}

function isModuleSymbol(symbol: Symbol): boolean {
    return !!symbol.declarations?.some(d => d.kind === SyntaxKind.SourceFile);
}

function getCompletionData(
    program: Program,
    log: (message: string) => void,
    sourceFile: SourceFile,
    compilerOptions: CompilerOptions,
    position: number,
    preferences: UserPreferences,
    detailsEntryId: CompletionEntryIdentifier | undefined,
    host: LanguageServiceHost,
    formatContext: formatting.FormatContext | undefined,
    cancellationToken?: CancellationToken,
): CompletionData | Request | undefined {
    const typeChecker = program.getTypeChecker();
    const inCheckedFile = isCheckedFile(sourceFile, compilerOptions);
    let start = timestamp();
    let currentToken = getTokenAtPosition(sourceFile, position); // TODO: GH#15853
    // We will check for jsdoc comments with insideComment and getJsDocTagAtPosition. (TODO: that seems rather inefficient to check the same thing so many times.)

    log("getCompletionData: Get current token: " + (timestamp() - start));

    start = timestamp();
    const insideComment = isInComment(sourceFile, position, currentToken);
    log("getCompletionData: Is inside comment: " + (timestamp() - start));

    let insideJsDocTagTypeExpression = false;
    let insideJsDocImportTag = false;
    let isInSnippetScope = false;
    if (insideComment) {
        if (hasDocComment(sourceFile, position)) {
            if (sourceFile.text.charCodeAt(position - 1) === CharacterCodes.at) {
                // The current position is next to the '@' sign, when no tag name being provided yet.
                // Provide a full list of tag names
                return { kind: CompletionDataKind.JsDocTagName };
            }
            else {
                // When completion is requested without "@", we will have check to make sure that
                // there are no comments prefix the request position. We will only allow "*" and space.
                // e.g
                //   /** |c| /*
                //
                //   /**
                //     |c|
                //    */
                //
                //   /**
                //    * |c|
                //    */
                //
                //   /**
                //    *         |c|
                //    */
                const lineStart = getLineStartPositionForPosition(position, sourceFile);
                if (!/[^*|\s(/)]/.test(sourceFile.text.substring(lineStart, position))) {
                    return { kind: CompletionDataKind.JsDocTag };
                }
            }
        }

        // Completion should work inside certain JsDoc tags. For example:
        //     /** @type {number | string} */
        // Completion should work in the brackets
        const tag = getJsDocTagAtPosition(currentToken, position);
        if (tag) {
            if (tag.tagName.pos <= position && position <= tag.tagName.end) {
                return { kind: CompletionDataKind.JsDocTagName };
            }
            if (isJSDocImportTag(tag)) {
                insideJsDocImportTag = true;
            }
            else {
                const typeExpression = tryGetTypeExpressionFromTag(tag);
                if (typeExpression) {
                    currentToken = getTokenAtPosition(sourceFile, position);
                    if (
                        !currentToken ||
                        (!isDeclarationName(currentToken) &&
                            (currentToken.parent.kind !== SyntaxKind.JSDocPropertyTag ||
                                (currentToken.parent as JSDocPropertyTag).name !== currentToken))
                    ) {
                        // Use as type location if inside tag's type expression
                        insideJsDocTagTypeExpression = isCurrentlyEditingNode(typeExpression);
                    }
                }
                if (!insideJsDocTagTypeExpression && isJSDocParameterTag(tag) && (nodeIsMissing(tag.name) || tag.name.pos <= position && position <= tag.name.end)) {
                    return { kind: CompletionDataKind.JsDocParameterName, tag };
                }
            }
        }

        if (!insideJsDocTagTypeExpression && !insideJsDocImportTag) {
            // Proceed if the current position is in jsDoc tag expression; otherwise it is a normal
            // comment or the plain text part of a jsDoc comment, so no completion should be available
            log("Returning an empty list because completion was inside a regular comment or plain text part of a JsDoc comment.");
            return undefined;
        }
    }

    start = timestamp();
    // The decision to provide completion depends on the contextToken, which is determined through the previousToken.
    // Note: 'previousToken' (and thus 'contextToken') can be undefined if we are the beginning of the file
    const isJsOnlyLocation = !insideJsDocTagTypeExpression && !insideJsDocImportTag && isSourceFileJS(sourceFile);
    const tokens = getRelevantTokens(position, sourceFile);
    const previousToken = tokens.previousToken!;
    let contextToken = tokens.contextToken!;
    log("getCompletionData: Get previous token: " + (timestamp() - start));

    // Find the node where completion is requested on.
    // Also determine whether we are trying to complete with members of that node
    // or attributes of a JSX tag.
    let node = currentToken;
    let propertyAccessToConvert: PropertyAccessExpression | undefined;
    let isRightOfDot = false;
    let isRightOfQuestionDot = false;
    let isRightOfOpenTag = false;
    let isStartingCloseTag = false;
    let isJsxInitializer: IsJsxInitializer = false;
    let isJsxIdentifierExpected = false;
    let importStatementCompletion: ImportStatementCompletionInfo | undefined;
    let location = getTouchingPropertyName(sourceFile, position);
    let keywordFilters = KeywordCompletionFilters.None;
    let isNewIdentifierLocation = false;
    let flags = CompletionInfoFlags.None;
    let defaultCommitCharacters: string[] | undefined;

    if (contextToken) {
        const importStatementCompletionInfo = getImportStatementCompletionInfo(contextToken, sourceFile);
        if (importStatementCompletionInfo.keywordCompletion) {
            if (importStatementCompletionInfo.isKeywordOnlyCompletion) {
                return {
                    kind: CompletionDataKind.Keywords,
                    keywordCompletions: [keywordToCompletionEntry(importStatementCompletionInfo.keywordCompletion)],
                    isNewIdentifierLocation: importStatementCompletionInfo.isNewIdentifierLocation,
                };
            }
            keywordFilters = keywordFiltersFromSyntaxKind(importStatementCompletionInfo.keywordCompletion);
        }
        if (importStatementCompletionInfo.replacementSpan && preferences.includeCompletionsForImportStatements && preferences.includeCompletionsWithInsertText) {
            // Import statement completions use `insertText`, and also require the `data` property of `CompletionEntryIdentifier`
            // added in TypeScript 4.3 to be sent back from the client during `getCompletionEntryDetails`. Since this feature
            // is not backward compatible with older clients, the language service defaults to disabling it, allowing newer clients
            // to opt in with the `includeCompletionsForImportStatements` user preference.
            flags |= CompletionInfoFlags.IsImportStatementCompletion;
            importStatementCompletion = importStatementCompletionInfo;
            isNewIdentifierLocation = importStatementCompletionInfo.isNewIdentifierLocation;
        }
        // Bail out if this is a known invalid completion location
        if (!importStatementCompletionInfo.replacementSpan && isCompletionListBlocker(contextToken)) {
            log("Returning an empty list because completion was requested in an invalid position.");
            return keywordFilters
                ? keywordCompletionData(keywordFilters, isJsOnlyLocation, computeCommitCharactersAndIsNewIdentifier().isNewIdentifierLocation)
                : undefined;
        }

        let parent = contextToken.parent;
        if (contextToken.kind === SyntaxKind.DotToken || contextToken.kind === SyntaxKind.QuestionDotToken) {
            isRightOfDot = contextToken.kind === SyntaxKind.DotToken;
            isRightOfQuestionDot = contextToken.kind === SyntaxKind.QuestionDotToken;
            switch (parent.kind) {
                case SyntaxKind.PropertyAccessExpression:
                    propertyAccessToConvert = parent as PropertyAccessExpression;
                    node = propertyAccessToConvert.expression;
                    const leftmostAccessExpression = getLeftmostAccessExpression(propertyAccessToConvert);
                    if (
                        nodeIsMissing(leftmostAccessExpression) ||
                        ((isCallExpression(node) || isFunctionLike(node)) &&
                            node.end === contextToken.pos &&
                            node.getChildCount(sourceFile) &&
                            last(node.getChildren(sourceFile)).kind !== SyntaxKind.CloseParenToken)
                    ) {
                        // This is likely dot from incorrectly parsed expression and user is starting to write spread
                        // eg: Math.min(./**/)
                        // const x = function (./**/) {}
                        // ({./**/})
                        return undefined;
                    }
                    break;
                case SyntaxKind.QualifiedName:
                    node = (parent as QualifiedName).left;
                    break;
                case SyntaxKind.ModuleDeclaration:
                    node = (parent as ModuleDeclaration).name;
                    break;
                case SyntaxKind.ImportType:
                    node = parent;
                    break;
                case SyntaxKind.MetaProperty:
                    node = parent.getFirstToken(sourceFile)!;
                    Debug.assert(node.kind === SyntaxKind.ImportKeyword || node.kind === SyntaxKind.NewKeyword);
                    break;
                default:
                    // There is nothing that precedes the dot, so this likely just a stray character
                    // or leading into a '...' token. Just bail out instead.
                    return undefined;
            }
        }
        else if (!importStatementCompletion) {
            // <UI.Test /* completion position */ />
            // If the tagname is a property access expression, we will then walk up to the top most of property access expression.
            // Then, try to get a JSX container and its associated attributes type.
            if (parent && parent.kind === SyntaxKind.PropertyAccessExpression) {
                contextToken = parent;
                parent = parent.parent;
            }

            // Fix location
            if (currentToken.parent === location) {
                switch (currentToken.kind) {
                    case SyntaxKind.GreaterThanToken:
                        if (currentToken.parent.kind === SyntaxKind.JsxElement || currentToken.parent.kind === SyntaxKind.JsxOpeningElement) {
                            location = currentToken;
                        }
                        break;

                    case SyntaxKind.SlashToken:
                        if (currentToken.parent.kind === SyntaxKind.JsxSelfClosingElement) {
                            location = currentToken;
                        }
                        break;
                }
            }

            switch (parent.kind) {
                case SyntaxKind.JsxClosingElement:
                    if (contextToken.kind === SyntaxKind.SlashToken) {
                        isStartingCloseTag = true;
                        location = contextToken;
                    }
                    break;

                case SyntaxKind.BinaryExpression:
                    if (!binaryExpressionMayBeOpenTag(parent as BinaryExpression)) {
                        break;
                    }
                // falls through

                case SyntaxKind.JsxSelfClosingElement:
                case SyntaxKind.JsxElement:
                case SyntaxKind.JsxOpeningElement:
                    isJsxIdentifierExpected = true;
                    if (contextToken.kind === SyntaxKind.LessThanToken) {
                        isRightOfOpenTag = true;
                        location = contextToken;
                    }
                    break;

                case SyntaxKind.JsxExpression:
                case SyntaxKind.JsxSpreadAttribute:
                    // First case is for `<div foo={true} [||] />` or `<div foo={true} [||] ></div>`,
                    // `parent` will be `{true}` and `previousToken` will be `}`
                    // Second case is for `<div foo={true} t[||] ></div>`
                    // Second case must not match for `<div foo={undefine[||]}></div>`
                    if (previousToken.kind === SyntaxKind.CloseBraceToken || (previousToken.kind === SyntaxKind.Identifier && previousToken.parent.kind === SyntaxKind.JsxAttribute)) {
                        isJsxIdentifierExpected = true;
                    }
                    break;

                case SyntaxKind.JsxAttribute:
                    // For `<div className="x" [||] ></div>`, `parent` will be JsxAttribute and `previousToken` will be its initializer
                    if (
                        (parent as JsxAttribute).initializer === previousToken &&
                        previousToken.end < position
                    ) {
                        isJsxIdentifierExpected = true;
                        break;
                    }
                    switch (previousToken.kind) {
                        case SyntaxKind.EqualsToken:
                            isJsxInitializer = true;
                            break;
                        case SyntaxKind.Identifier:
                            isJsxIdentifierExpected = true;
                            // For `<div x=[|f/**/|]`, `parent` will be `x` and `previousToken.parent` will be `f` (which is its own JsxAttribute)
                            // Note for `<div someBool f>` we don't want to treat this as a jsx inializer, instead it's the attribute name.
                            if (
                                parent !== previousToken.parent &&
                                !(parent as JsxAttribute).initializer &&
                                findChildOfKind(parent, SyntaxKind.EqualsToken, sourceFile)
                            ) {
                                isJsxInitializer = previousToken as Identifier;
                            }
                    }
                    break;
            }
        }
    }

    const semanticStart = timestamp();
    let completionKind = CompletionKind.None;
    let hasUnresolvedAutoImports = false;
    // This also gets mutated in nested-functions after the return
    let symbols: Symbol[] = [];
    let importSpecifierResolver: codefix.ImportSpecifierResolver | undefined;
    const symbolToOriginInfoMap: SymbolOriginInfoMap = [];
    const symbolToSortTextMap: SymbolSortTextMap = [];
    const seenPropertySymbols = new Set<SymbolId>();
    const isTypeOnlyLocation = isTypeOnlyCompletion();
    const getModuleSpecifierResolutionHost = memoizeOne((isFromPackageJson: boolean) => {
        return createModuleSpecifierResolutionHost(isFromPackageJson ? host.getPackageJsonAutoImportProvider!()! : program, host);
    });

    if (isRightOfDot || isRightOfQuestionDot) {
        getTypeScriptMemberSymbols();
    }
    else if (isRightOfOpenTag) {
        symbols = typeChecker.getJsxIntrinsicTagNamesAt(location);
        Debug.assertEachIsDefined(symbols, "getJsxIntrinsicTagNames() should all be defined");
        tryGetGlobalSymbols();
        completionKind = CompletionKind.Global;
        keywordFilters = KeywordCompletionFilters.None;
    }
    else if (isStartingCloseTag) {
        const tagName = (contextToken.parent.parent as JsxElement).openingElement.tagName;
        const tagSymbol = typeChecker.getSymbolAtLocation(tagName);
        if (tagSymbol) {
            symbols = [tagSymbol];
        }
        completionKind = CompletionKind.Global;
        keywordFilters = KeywordCompletionFilters.None;
    }
    else {
        // For JavaScript or TypeScript, if we're not after a dot, then just try to get the
        // global symbols in scope.  These results should be valid for either language as
        // the set of symbols that can be referenced from this location.
        if (!tryGetGlobalSymbols()) {
            return keywordFilters
                ? keywordCompletionData(keywordFilters, isJsOnlyLocation, isNewIdentifierLocation)
                : undefined;
        }
    }

    log("getCompletionData: Semantic work: " + (timestamp() - semanticStart));
    const contextualType = previousToken && getContextualType(previousToken, position, sourceFile, typeChecker);

    // exclude literal suggestions after <input type="text" [||] /> (#51667) and after closing quote (#52675)
    // for strings getStringLiteralCompletions handles completions
    const isLiteralExpected = !tryCast(previousToken, isStringLiteralLike) && !isJsxIdentifierExpected;
    const literals = !isLiteralExpected ? [] : mapDefined(
        contextualType && (contextualType.isUnion() ? contextualType.types : [contextualType]),
        t => t.isLiteral() && !(t.flags & TypeFlags.EnumLiteral) ? t.value : undefined,
    );

    const recommendedCompletion = previousToken && contextualType && getRecommendedCompletion(previousToken, contextualType, typeChecker);
    return {
        kind: CompletionDataKind.Data,
        symbols,
        completionKind,
        isInSnippetScope,
        propertyAccessToConvert,
        isNewIdentifierLocation,
        location,
        keywordFilters,
        literals,
        symbolToOriginInfoMap,
        recommendedCompletion,
        previousToken,
        contextToken,
        isJsxInitializer,
        insideJsDocTagTypeExpression,
        symbolToSortTextMap,
        isTypeOnlyLocation,
        isJsxIdentifierExpected,
        isRightOfOpenTag,
        isRightOfDotOrQuestionDot: isRightOfDot || isRightOfQuestionDot,
        importStatementCompletion,
        hasUnresolvedAutoImports,
        flags,
        defaultCommitCharacters,
    };

    type JSDocTagWithTypeExpression =
        | JSDocParameterTag
        | JSDocPropertyTag
        | JSDocReturnTag
        | JSDocTypeTag
        | JSDocTypedefTag
        | JSDocTemplateTag
        | JSDocThrowsTag
        | JSDocSatisfiesTag;

    function isTagWithTypeExpression(tag: JSDocTag): tag is JSDocTagWithTypeExpression {
        switch (tag.kind) {
            case SyntaxKind.JSDocParameterTag:
            case SyntaxKind.JSDocPropertyTag:
            case SyntaxKind.JSDocReturnTag:
            case SyntaxKind.JSDocTypeTag:
            case SyntaxKind.JSDocTypedefTag:
            case SyntaxKind.JSDocThrowsTag:
            case SyntaxKind.JSDocSatisfiesTag:
                return true;
            case SyntaxKind.JSDocTemplateTag:
                return !!(tag as JSDocTemplateTag).constraint;
            default:
                return false;
        }
    }

    function tryGetTypeExpressionFromTag(tag: JSDocTag): JSDocTypeExpression | ExpressionWithTypeArguments | undefined {
        if (isTagWithTypeExpression(tag)) {
            const typeExpression = isJSDocTemplateTag(tag) ? tag.constraint : tag.typeExpression;
            return typeExpression && typeExpression.kind === SyntaxKind.JSDocTypeExpression ? typeExpression : undefined;
        }
        if (isJSDocAugmentsTag(tag) || isJSDocImplementsTag(tag)) {
            return tag.class;
        }
        return undefined;
    }

    function getTypeScriptMemberSymbols(): void {
        // Right of dot member completion list
        completionKind = CompletionKind.PropertyAccess;

        // Since this is qualified name check it's a type node location
        const isImportType = isLiteralImportTypeNode(node);
        const isTypeLocation = (isImportType && !(node as ImportTypeNode).isTypeOf)
            || isPartOfTypeNode(node.parent)
            || isPossiblyTypeArgumentPosition(contextToken, sourceFile, typeChecker);
        const isRhsOfImportDeclaration = isInRightSideOfInternalImportEqualsDeclaration(node);
        if (isEntityName(node) || isImportType || isPropertyAccessExpression(node)) {
            const isNamespaceName = isModuleDeclaration(node.parent);
            if (isNamespaceName) {
                isNewIdentifierLocation = true;
                defaultCommitCharacters = [];
            }
            let symbol = typeChecker.getSymbolAtLocation(node);
            if (symbol) {
                symbol = skipAlias(symbol, typeChecker);
                if (symbol.flags & (SymbolFlags.Module | SymbolFlags.Enum)) {
                    // Extract module or enum members
                    const exportedSymbols = typeChecker.getExportsOfModule(symbol);
                    Debug.assertEachIsDefined(exportedSymbols, "getExportsOfModule() should all be defined");
                    const isValidValueAccess = (symbol: Symbol) => typeChecker.isValidPropertyAccess(isImportType ? node as ImportTypeNode : (node.parent as PropertyAccessExpression), symbol.name);
                    const isValidTypeAccess = (symbol: Symbol) => symbolCanBeReferencedAtTypeLocation(symbol, typeChecker);
                    const isValidAccess: (symbol: Symbol) => boolean = isNamespaceName
                        // At `namespace N.M/**/`, if this is the only declaration of `M`, don't include `M` as a completion.
                        ? symbol => !!(symbol.flags & SymbolFlags.Namespace) && !symbol.declarations?.every(d => d.parent === node.parent)
                        : isRhsOfImportDeclaration ?
                        // Any kind is allowed when dotting off namespace in internal import equals declaration
                        symbol => isValidTypeAccess(symbol) || isValidValueAccess(symbol) :
                        isTypeLocation || insideJsDocTagTypeExpression ? isValidTypeAccess : isValidValueAccess;
                    for (const exportedSymbol of exportedSymbols) {
                        if (isValidAccess(exportedSymbol)) {
                            symbols.push(exportedSymbol);
                        }
                    }

                    // If the module is merged with a value, we must get the type of the class and add its propertes (for inherited static methods).
                    if (
                        !isTypeLocation &&
                        !insideJsDocTagTypeExpression &&
                        symbol.declarations &&
                        symbol.declarations.some(d => d.kind !== SyntaxKind.SourceFile && d.kind !== SyntaxKind.ModuleDeclaration && d.kind !== SyntaxKind.EnumDeclaration)
                    ) {
                        let type = typeChecker.getTypeOfSymbolAtLocation(symbol, node).getNonOptionalType();
                        let insertQuestionDot = false;
                        if (type.isNullableType()) {
                            const canCorrectToQuestionDot = isRightOfDot &&
                                !isRightOfQuestionDot &&
                                preferences.includeAutomaticOptionalChainCompletions !== false;

                            if (canCorrectToQuestionDot || isRightOfQuestionDot) {
                                type = type.getNonNullableType();
                                if (canCorrectToQuestionDot) {
                                    insertQuestionDot = true;
                                }
                            }
                        }
                        addTypeProperties(type, !!(node.flags & NodeFlags.AwaitContext), insertQuestionDot);
                    }

                    return;
                }
            }
        }

        if (!isTypeLocation || isInTypeQuery(node)) {
            // GH#39946. Pulling on the type of a node inside of a function with a contextual `this` parameter can result in a circularity
            // if the `node` is part of the exprssion of a `yield` or `return`. This circularity doesn't exist at compile time because
            // we will check (and cache) the type of `this` *before* checking the type of the node.
            typeChecker.tryGetThisTypeAt(node, /*includeGlobalThis*/ false);
            let type = typeChecker.getTypeAtLocation(node).getNonOptionalType();

            if (!isTypeLocation) {
                let insertQuestionDot = false;
                if (type.isNullableType()) {
                    const canCorrectToQuestionDot = isRightOfDot &&
                        !isRightOfQuestionDot &&
                        preferences.includeAutomaticOptionalChainCompletions !== false;

                    if (canCorrectToQuestionDot || isRightOfQuestionDot) {
                        type = type.getNonNullableType();
                        if (canCorrectToQuestionDot) {
                            insertQuestionDot = true;
                        }
                    }
                }
                addTypeProperties(type, !!(node.flags & NodeFlags.AwaitContext), insertQuestionDot);
            }
            else {
                addTypeProperties(type.getNonNullableType(), /*insertAwait*/ false, /*insertQuestionDot*/ false);
            }
        }
    }

    function addTypeProperties(type: Type, insertAwait: boolean, insertQuestionDot: boolean): void {
        if (type.getStringIndexType()) {
            isNewIdentifierLocation = true;
            defaultCommitCharacters = [];
        }
        if (isRightOfQuestionDot && some(type.getCallSignatures())) {
            isNewIdentifierLocation = true;
            defaultCommitCharacters ??= allCommitCharacters; // Only invalid commit character here would be `(`.
        }

        const propertyAccess = node.kind === SyntaxKind.ImportType ? node as ImportTypeNode : node.parent as PropertyAccessExpression | QualifiedName;
        if (inCheckedFile) {
            for (const symbol of type.getApparentProperties()) {
                if (typeChecker.isValidPropertyAccessForCompletions(propertyAccess, type, symbol)) {
                    addPropertySymbol(symbol, /*insertAwait*/ false, insertQuestionDot);
                }
            }
        }
        else {
            // In javascript files, for union types, we don't just get the members that
            // the individual types have in common, we also include all the members that
            // each individual type has. This is because we're going to add all identifiers
            // anyways. So we might as well elevate the members that were at least part
            // of the individual types to a higher status since we know what they are.
            symbols.push(...filter(getPropertiesForCompletion(type, typeChecker), s => typeChecker.isValidPropertyAccessForCompletions(propertyAccess, type, s)));
        }

        if (insertAwait && preferences.includeCompletionsWithInsertText) {
            const promiseType = typeChecker.getPromisedTypeOfPromise(type);
            if (promiseType) {
                for (const symbol of promiseType.getApparentProperties()) {
                    if (typeChecker.isValidPropertyAccessForCompletions(propertyAccess, promiseType, symbol)) {
                        addPropertySymbol(symbol, /*insertAwait*/ true, insertQuestionDot);
                    }
                }
            }
        }
    }

    function addPropertySymbol(symbol: Symbol, insertAwait: boolean, insertQuestionDot: boolean) {
        // For a computed property with an accessible name like `Symbol.iterator`,
        // we'll add a completion for the *name* `Symbol` instead of for the property.
        // If this is e.g. [Symbol.iterator], add a completion for `Symbol`.
        const computedPropertyName = firstDefined(symbol.declarations, decl => tryCast(getNameOfDeclaration(decl), isComputedPropertyName));
        if (computedPropertyName) {
            const leftMostName = getLeftMostName(computedPropertyName.expression); // The completion is for `Symbol`, not `iterator`.
            const nameSymbol = leftMostName && typeChecker.getSymbolAtLocation(leftMostName);
            // If this is nested like for `namespace N { export const sym = Symbol(); }`, we'll add the completion for `N`.
            const firstAccessibleSymbol = nameSymbol && getFirstSymbolInChain(nameSymbol, contextToken, typeChecker);
            const firstAccessibleSymbolId = firstAccessibleSymbol && getSymbolId(firstAccessibleSymbol);
            if (firstAccessibleSymbolId && addToSeen(seenPropertySymbols, firstAccessibleSymbolId)) {
                const index = symbols.length;
                symbols.push(firstAccessibleSymbol);
                const moduleSymbol = firstAccessibleSymbol.parent;
                if (
                    !moduleSymbol ||
                    !isExternalModuleSymbol(moduleSymbol) ||
                    typeChecker.tryGetMemberInModuleExportsAndProperties(firstAccessibleSymbol.name, moduleSymbol) !== firstAccessibleSymbol
                ) {
                    symbolToOriginInfoMap[index] = { kind: getNullableSymbolOriginInfoKind(SymbolOriginInfoKind.SymbolMemberNoExport) };
                }
                else {
                    const fileName = isExternalModuleNameRelative(stripQuotes(moduleSymbol.name)) ? getSourceFileOfModule(moduleSymbol)?.fileName : undefined;
                    const { moduleSpecifier } = (importSpecifierResolver ||= codefix.createImportSpecifierResolver(sourceFile, program, host, preferences)).getModuleSpecifierForBestExportInfo(
                        [{
                            exportKind: ExportKind.Named,
                            moduleFileName: fileName,
                            isFromPackageJson: false,
                            moduleSymbol,
                            symbol: firstAccessibleSymbol,
                            targetFlags: skipAlias(firstAccessibleSymbol, typeChecker).flags,
                        }],
                        position,
                        isValidTypeOnlyAliasUseSite(location),
                    ) || {};

                    if (moduleSpecifier) {
                        const origin: SymbolOriginInfoResolvedExport = {
                            kind: getNullableSymbolOriginInfoKind(SymbolOriginInfoKind.SymbolMemberExport),
                            moduleSymbol,
                            isDefaultExport: false,
                            symbolName: firstAccessibleSymbol.name,
                            exportName: firstAccessibleSymbol.name,
                            fileName,
                            moduleSpecifier,
                        };
                        symbolToOriginInfoMap[index] = origin;
                    }
                }
            }
            else if (preferences.includeCompletionsWithInsertText) {
                if (firstAccessibleSymbolId && seenPropertySymbols.has(firstAccessibleSymbolId)) {
                    return;
                }
                addSymbolOriginInfo(symbol);
                addSymbolSortInfo(symbol);
                symbols.push(symbol);
            }
        }
        else {
            addSymbolOriginInfo(symbol);
            addSymbolSortInfo(symbol);
            symbols.push(symbol);
        }

        function addSymbolSortInfo(symbol: Symbol) {
            if (isStaticProperty(symbol)) {
                symbolToSortTextMap[getSymbolId(symbol)] = SortText.LocalDeclarationPriority;
            }
        }

        function addSymbolOriginInfo(symbol: Symbol) {
            if (preferences.includeCompletionsWithInsertText) {
                if (insertAwait && addToSeen(seenPropertySymbols, getSymbolId(symbol))) {
                    symbolToOriginInfoMap[symbols.length] = { kind: getNullableSymbolOriginInfoKind(SymbolOriginInfoKind.Promise) };
                }
                else if (insertQuestionDot) {
                    symbolToOriginInfoMap[symbols.length] = { kind: SymbolOriginInfoKind.Nullable };
                }
            }
        }

        function getNullableSymbolOriginInfoKind(kind: SymbolOriginInfoKind) {
            return insertQuestionDot ? kind | SymbolOriginInfoKind.Nullable : kind;
        }
    }

    /** Given 'a.b.c', returns 'a'. */
    function getLeftMostName(e: Expression): Identifier | undefined {
        return isIdentifier(e) ? e : isPropertyAccessExpression(e) ? getLeftMostName(e.expression) : undefined;
    }

    function tryGetGlobalSymbols(): boolean {
        const result: GlobalsSearch = tryGetObjectTypeLiteralInTypeArgumentCompletionSymbols()
            || tryGetObjectLikeCompletionSymbols()
            || tryGetImportCompletionSymbols()
            || tryGetImportOrExportClauseCompletionSymbols()
            || tryGetImportAttributesCompletionSymbols()
            || tryGetLocalNamedExportCompletionSymbols()
            || tryGetConstructorCompletion()
            || tryGetClassLikeCompletionSymbols()
            || tryGetJsxCompletionSymbols()
            || (getGlobalCompletions(), GlobalsSearch.Success);
        return result === GlobalsSearch.Success;
    }

    function tryGetConstructorCompletion(): GlobalsSearch {
        if (!tryGetConstructorLikeCompletionContainer(contextToken)) return GlobalsSearch.Continue;
        // no members, only keywords
        completionKind = CompletionKind.None;
        // Declaring new property/method/accessor
        isNewIdentifierLocation = true;
        // Has keywords for constructor parameter
        keywordFilters = KeywordCompletionFilters.ConstructorParameterKeywords;
        return GlobalsSearch.Success;
    }

    function tryGetJsxCompletionSymbols(): GlobalsSearch {
        const jsxContainer = tryGetContainingJsxElement(contextToken);
        // Cursor is inside a JSX self-closing element or opening element
        const attrsType = jsxContainer && typeChecker.getContextualType(jsxContainer.attributes);
        if (!attrsType) return GlobalsSearch.Continue;
        const completionsType = jsxContainer && typeChecker.getContextualType(jsxContainer.attributes, ContextFlags.Completions);
        symbols = concatenate(symbols, filterJsxAttributes(getPropertiesForObjectExpression(attrsType, completionsType, jsxContainer.attributes, typeChecker), jsxContainer.attributes.properties));
        setSortTextToOptionalMember();
        completionKind = CompletionKind.MemberLike;
        isNewIdentifierLocation = false;
        return GlobalsSearch.Success;
    }

    function tryGetImportCompletionSymbols(): GlobalsSearch {
        if (!importStatementCompletion) return GlobalsSearch.Continue;
        isNewIdentifierLocation = true;
        collectAutoImports();
        return GlobalsSearch.Success;
    }

    function getGlobalCompletions(): void {
        keywordFilters = tryGetFunctionLikeBodyCompletionContainer(contextToken) ? KeywordCompletionFilters.FunctionLikeBodyKeywords : KeywordCompletionFilters.All;

        // Get all entities in the current scope.
        completionKind = CompletionKind.Global;
        ({ isNewIdentifierLocation, defaultCommitCharacters } = computeCommitCharactersAndIsNewIdentifier());

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
        isInSnippetScope = isSnippetScope(scopeNode);

        const symbolMeanings = (isTypeOnlyLocation ? SymbolFlags.None : SymbolFlags.Value) | SymbolFlags.Type | SymbolFlags.Namespace | SymbolFlags.Alias;
        const typeOnlyAliasNeedsPromotion = previousToken && !isValidTypeOnlyAliasUseSite(previousToken);

        symbols = concatenate(symbols, typeChecker.getSymbolsInScope(scopeNode, symbolMeanings));
        Debug.assertEachIsDefined(symbols, "getSymbolsInScope() should all be defined");
        for (let i = 0; i < symbols.length; i++) {
            const symbol = symbols[i];
            if (
                !typeChecker.isArgumentsSymbol(symbol) &&
                !some(symbol.declarations, d => d.getSourceFile() === sourceFile)
            ) {
                symbolToSortTextMap[getSymbolId(symbol)] = SortText.GlobalsOrKeywords;
            }
            if (typeOnlyAliasNeedsPromotion && !(symbol.flags & SymbolFlags.Value)) {
                const typeOnlyAliasDeclaration = symbol.declarations && find(symbol.declarations, isTypeOnlyImportDeclaration);
                if (typeOnlyAliasDeclaration) {
                    const origin: SymbolOriginInfoTypeOnlyImport = { kind: SymbolOriginInfoKind.TypeOnlyAlias, declaration: typeOnlyAliasDeclaration };
                    symbolToOriginInfoMap[i] = origin;
                }
            }
        }

        // Need to insert 'this.' before properties of `this` type, so only do that if `includeInsertTextCompletions`
        if (preferences.includeCompletionsWithInsertText && scopeNode.kind !== SyntaxKind.SourceFile) {
            const thisType = typeChecker.tryGetThisTypeAt(scopeNode, /*includeGlobalThis*/ false, isClassLike(scopeNode.parent) ? scopeNode as ThisContainer : undefined);
            if (thisType && !isProbablyGlobalType(thisType, sourceFile, typeChecker)) {
                for (const symbol of getPropertiesForCompletion(thisType, typeChecker)) {
                    symbolToOriginInfoMap[symbols.length] = { kind: SymbolOriginInfoKind.ThisType };
                    symbols.push(symbol);
                    symbolToSortTextMap[getSymbolId(symbol)] = SortText.SuggestedClassMembers;
                }
            }
        }
        collectAutoImports();
        if (isTypeOnlyLocation) {
            keywordFilters = contextToken && isAssertionExpression(contextToken.parent)
                ? KeywordCompletionFilters.TypeAssertionKeywords
                : KeywordCompletionFilters.TypeKeywords;
        }
    }

    function shouldOfferImportCompletions(): boolean {
        // If already typing an import statement, provide completions for it.
        if (importStatementCompletion) return true;
        // If not already a module, must have modules enabled.
        if (!preferences.includeCompletionsForModuleExports) return false;
        // If already using ES modules, OK to continue using them.
        if (sourceFile.externalModuleIndicator || sourceFile.commonJsModuleIndicator) return true;
        // If module transpilation is enabled or we're targeting es6 or above, or not emitting, OK.
        if (compilerOptionsIndicateEsModules(program.getCompilerOptions())) return true;
        // If some file is using ES6 modules, assume that it's OK to add more.
        return program.getSymlinkCache?.().hasAnySymlinks() ||
            !!program.getCompilerOptions().paths ||
            programContainsModules(program);
    }

    function isSnippetScope(scopeNode: Node): boolean {
        switch (scopeNode.kind) {
            case SyntaxKind.SourceFile:
            case SyntaxKind.TemplateExpression:
            case SyntaxKind.JsxExpression:
            case SyntaxKind.Block:
                return true;
            default:
                return isStatement(scopeNode);
        }
    }

    function isTypeOnlyCompletion(): boolean {
        return insideJsDocTagTypeExpression
            || insideJsDocImportTag
            || !!importStatementCompletion && isTypeOnlyImportOrExportDeclaration(location.parent)
            || !isContextTokenValueLocation(contextToken) &&
                (isPossiblyTypeArgumentPosition(contextToken, sourceFile, typeChecker)
                    || isPartOfTypeNode(location)
                    || isContextTokenTypeLocation(contextToken));
    }

    function isContextTokenValueLocation(contextToken: Node) {
        return contextToken &&
            ((contextToken.kind === SyntaxKind.TypeOfKeyword &&
                (contextToken.parent.kind === SyntaxKind.TypeQuery || isTypeOfExpression(contextToken.parent))) ||
                (contextToken.kind === SyntaxKind.AssertsKeyword && contextToken.parent.kind === SyntaxKind.TypePredicate));
    }

    function isContextTokenTypeLocation(contextToken: Node): boolean {
        if (contextToken) {
            const parentKind = contextToken.parent.kind;
            switch (contextToken.kind) {
                case SyntaxKind.ColonToken:
                    return parentKind === SyntaxKind.PropertyDeclaration ||
                        parentKind === SyntaxKind.PropertySignature ||
                        parentKind === SyntaxKind.Parameter ||
                        parentKind === SyntaxKind.VariableDeclaration ||
                        isFunctionLikeKind(parentKind);

                case SyntaxKind.EqualsToken:
                    return parentKind === SyntaxKind.TypeAliasDeclaration || parentKind === SyntaxKind.TypeParameter;

                case SyntaxKind.AsKeyword:
                    return parentKind === SyntaxKind.AsExpression;

                case SyntaxKind.LessThanToken:
                    return parentKind === SyntaxKind.TypeReference ||
                        parentKind === SyntaxKind.TypeAssertionExpression;

                case SyntaxKind.ExtendsKeyword:
                    return parentKind === SyntaxKind.TypeParameter;

                case SyntaxKind.SatisfiesKeyword:
                    return parentKind === SyntaxKind.SatisfiesExpression;
            }
        }
        return false;
    }

    /** Mutates `symbols`, `symbolToOriginInfoMap`, and `symbolToSortTextMap` */
    function collectAutoImports() {
        if (!shouldOfferImportCompletions()) return;
        Debug.assert(!detailsEntryId?.data, "Should not run 'collectAutoImports' when faster path is available via `data`");
        if (detailsEntryId && !detailsEntryId.source) {
            // Asking for completion details for an item that is not an auto-import
            return;
        }

        flags |= CompletionInfoFlags.MayIncludeAutoImports;
        // import { type | -> token text should be blank
        const isAfterTypeOnlyImportSpecifierModifier = previousToken === contextToken
            && importStatementCompletion;

        const lowerCaseTokenText = isAfterTypeOnlyImportSpecifierModifier ? "" :
            previousToken && isIdentifier(previousToken) ? previousToken.text.toLowerCase() :
            "";

        const moduleSpecifierCache = host.getModuleSpecifierCache?.();
        const exportInfo = getExportInfoMap(sourceFile, host, program, preferences, cancellationToken);
        const packageJsonAutoImportProvider = host.getPackageJsonAutoImportProvider?.();
        const packageJsonFilter = detailsEntryId ? undefined : createPackageJsonImportFilter(sourceFile, preferences, host);
        resolvingModuleSpecifiers(
            "collectAutoImports",
            host,
            importSpecifierResolver ||= codefix.createImportSpecifierResolver(sourceFile, program, host, preferences),
            program,
            position,
            preferences,
            !!importStatementCompletion,
            isValidTypeOnlyAliasUseSite(location),
            context => {
                exportInfo.search(
                    sourceFile.path,
                    /*preferCapitalized*/ isRightOfOpenTag,
                    (symbolName, targetFlags) => {
                        if (!isIdentifierText(symbolName, getEmitScriptTarget(host.getCompilationSettings()))) return false;
                        if (!detailsEntryId && isStringANonContextualKeyword(symbolName)) return false;
                        if (!isTypeOnlyLocation && !importStatementCompletion && !(targetFlags & SymbolFlags.Value)) return false;
                        if (isTypeOnlyLocation && !(targetFlags & (SymbolFlags.Module | SymbolFlags.Type))) return false;
                        // Do not try to auto-import something with a lowercase first letter for a JSX tag
                        const firstChar = symbolName.charCodeAt(0);
                        if (isRightOfOpenTag && (firstChar < CharacterCodes.A || firstChar > CharacterCodes.Z)) return false;

                        if (detailsEntryId) return true;
                        return charactersFuzzyMatchInString(symbolName, lowerCaseTokenText);
                    },
                    (info, symbolName, isFromAmbientModule, exportMapKey) => {
                        if (detailsEntryId && !some(info, i => detailsEntryId.source === stripQuotes(i.moduleSymbol.name))) {
                            return;
                        }

                        // Do a relatively cheap check to bail early if all re-exports are non-importable
                        // due to file location or package.json dependency filtering. For non-node16+
                        // module resolution modes, getting past this point guarantees that we'll be
                        // able to generate a suitable module specifier, so we can safely show a completion,
                        // even if we defer computing the module specifier.
                        info = filter(info, isImportableExportInfo);
                        if (!info.length) {
                            return;
                        }

                        // In node16+, module specifier resolution can fail due to modules being blocked
                        // by package.json `exports`. If that happens, don't show a completion item.
                        // N.B. in this resolution mode we always try to resolve module specifiers here,
                        // because we have to know now if it's going to fail so we can omit the completion
                        // from the list.
                        const result = context.tryResolve(info, isFromAmbientModule) || {};
                        if (result === "failed") return;

                        // If we skipped resolving module specifiers, our selection of which ExportInfo
                        // to use here is arbitrary, since the info shown in the completion list derived from
                        // it should be identical regardless of which one is used. During the subsequent
                        // `CompletionEntryDetails` request, we'll get all the ExportInfos again and pick
                        // the best one based on the module specifier it produces.
                        let exportInfo: SymbolExportInfo | FutureSymbolExportInfo = info[0], moduleSpecifier;
                        if (result !== "skipped") {
                            ({ exportInfo = info[0], moduleSpecifier } = result);
                        }

                        const isDefaultExport = exportInfo.exportKind === ExportKind.Default;
                        const symbol = isDefaultExport && getLocalSymbolForExportDefault(Debug.checkDefined(exportInfo.symbol)) || Debug.checkDefined(exportInfo.symbol);

                        pushAutoImportSymbol(symbol, {
                            kind: moduleSpecifier ? SymbolOriginInfoKind.ResolvedExport : SymbolOriginInfoKind.Export,
                            moduleSpecifier,
                            symbolName,
                            exportMapKey,
                            exportName: exportInfo.exportKind === ExportKind.ExportEquals ? InternalSymbolName.ExportEquals : Debug.checkDefined(exportInfo.symbol).name,
                            fileName: exportInfo.moduleFileName,
                            isDefaultExport,
                            moduleSymbol: exportInfo.moduleSymbol,
                            isFromPackageJson: exportInfo.isFromPackageJson,
                        });
                    },
                );

                hasUnresolvedAutoImports = context.skippedAny();
                flags |= context.resolvedAny() ? CompletionInfoFlags.ResolvedModuleSpecifiers : 0;
                flags |= context.resolvedBeyondLimit() ? CompletionInfoFlags.ResolvedModuleSpecifiersBeyondLimit : 0;
            },
        );

        function isImportableExportInfo(info: SymbolExportInfo) {
            return isImportable(
                info.isFromPackageJson ? packageJsonAutoImportProvider! : program,
                sourceFile,
                tryCast(info.moduleSymbol.valueDeclaration, isSourceFile),
                info.moduleSymbol,
                preferences,
                packageJsonFilter,
                getModuleSpecifierResolutionHost(info.isFromPackageJson),
                moduleSpecifierCache,
            );
        }
    }

    function pushAutoImportSymbol(symbol: Symbol, origin: SymbolOriginInfoResolvedExport | SymbolOriginInfoExport) {
        const symbolId = getSymbolId(symbol);
        if (symbolToSortTextMap[symbolId] === SortText.GlobalsOrKeywords) {
            // If an auto-importable symbol is available as a global, don't add the auto import
            return;
        }
        symbolToOriginInfoMap[symbols.length] = origin;
        symbolToSortTextMap[symbolId] = importStatementCompletion ? SortText.LocationPriority : SortText.AutoImportSuggestions;
        symbols.push(symbol);
    }

    /* Mutates `symbols` and `symbolToOriginInfoMap`. */
    function collectObjectLiteralMethodSymbols(members: Symbol[], enclosingDeclaration: ObjectLiteralExpression): void {
        // TODO: support JS files.
        if (isInJSFile(location)) {
            return;
        }
        members.forEach(member => {
            if (!isObjectLiteralMethodSymbol(member)) {
                return;
            }
            const displayName = getCompletionEntryDisplayNameForSymbol(
                member,
                getEmitScriptTarget(compilerOptions),
                /*origin*/ undefined,
                CompletionKind.ObjectPropertyDeclaration,
                /*jsxIdentifierExpected*/ false,
            );
            if (!displayName) {
                return;
            }
            const { name } = displayName;
            const entryProps = getEntryForObjectLiteralMethodCompletion(
                member,
                name,
                enclosingDeclaration,
                program,
                host,
                compilerOptions,
                preferences,
                formatContext,
            );
            if (!entryProps) {
                return;
            }
            const origin: SymbolOriginInfoObjectLiteralMethod = { kind: SymbolOriginInfoKind.ObjectLiteralMethod, ...entryProps };
            flags |= CompletionInfoFlags.MayIncludeMethodSnippets;
            symbolToOriginInfoMap[symbols.length] = origin;
            symbols.push(member);
        });
    }

    function isObjectLiteralMethodSymbol(symbol: Symbol): boolean {
        /*
            For an object type
            `type Foo = {
                bar(x: number): void;
                foo: (x: string) => string;
            }`,
            `bar` will have symbol flag `Method`,
            `foo` will have symbol flag `Property`.
        */
        if (!(symbol.flags & (SymbolFlags.Property | SymbolFlags.Method))) {
            return false;
        }
        return true;
    }

    /**
     * Finds the first node that "embraces" the position, so that one may
     * accurately aggregate locals from the closest containing scope.
     */
    function getScopeNode(initialToken: Node | undefined, position: number, sourceFile: SourceFile) {
        let scope: Node | undefined = initialToken;
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
            isInJsxText(contextToken) ||
            isBigIntLiteral(contextToken);
        log("getCompletionsAtPosition: isCompletionListBlocker: " + (timestamp() - start));
        return result;
    }

    function isInJsxText(contextToken: Node): boolean {
        if (contextToken.kind === SyntaxKind.JsxText) {
            return true;
        }

        if (contextToken.kind === SyntaxKind.GreaterThanToken && contextToken.parent) {
            // <Component<string> /**/ />
            // <Component<string> /**/ ><Component>
            // - contextToken: GreaterThanToken (before cursor)
            // - location: JsxSelfClosingElement or JsxOpeningElement
            // - contextToken.parent === location
            if (location === contextToken.parent && (location.kind === SyntaxKind.JsxOpeningElement || location.kind === SyntaxKind.JsxSelfClosingElement)) {
                return false;
            }

            if (contextToken.parent.kind === SyntaxKind.JsxOpeningElement) {
                // <div>/**/
                // - contextToken: GreaterThanToken (before cursor)
                // - location: JSXElement
                // - different parents (JSXOpeningElement, JSXElement)
                return location.parent.kind !== SyntaxKind.JsxOpeningElement;
            }

            if (contextToken.parent.kind === SyntaxKind.JsxClosingElement || contextToken.parent.kind === SyntaxKind.JsxSelfClosingElement) {
                return !!contextToken.parent.parent && contextToken.parent.parent.kind === SyntaxKind.JsxElement;
            }
        }
        return false;
    }

    function computeCommitCharactersAndIsNewIdentifier(): { defaultCommitCharacters: string[]; isNewIdentifierLocation: boolean; } {
        if (contextToken) {
            const containingNodeKind = contextToken.parent.kind;
            const tokenKind = keywordForNode(contextToken);
            // Previous token may have been a keyword that was converted to an identifier.
            // dprint-ignore
            switch (tokenKind) {
                case SyntaxKind.CommaToken:
                    switch (containingNodeKind) {
                        case SyntaxKind.CallExpression:                                               // func( a, |
                        case SyntaxKind.NewExpression: {                                              // new C(a, |
                            const expression = (contextToken.parent as CallExpression | NewExpression).expression;
                            if (getLineAndCharacterOfPosition(sourceFile, expression.end).line !==
                                getLineAndCharacterOfPosition(sourceFile, position).line) {           // func\n(a, |
                                return { defaultCommitCharacters: noCommaCommitCharacters, isNewIdentifierLocation: true };
                            }
                            return { defaultCommitCharacters: allCommitCharacters, isNewIdentifierLocation: true };
                        }
                        case SyntaxKind.BinaryExpression:                                             // const x = (a, |
                            return { defaultCommitCharacters: noCommaCommitCharacters, isNewIdentifierLocation: true };
                        case SyntaxKind.Constructor:                                                  // constructor( a, | /* public, protected, private keywords are allowed here, so show completion */
                        case SyntaxKind.FunctionType:                                                 // var x: (s: string, list|
                        case SyntaxKind.ObjectLiteralExpression:                                      // const obj = { x, |
                        return { defaultCommitCharacters: [], isNewIdentifierLocation: true };
                        case SyntaxKind.ArrayLiteralExpression:                                       // [a, |
                            return { defaultCommitCharacters: allCommitCharacters, isNewIdentifierLocation: true };
                        default:
                            return { defaultCommitCharacters: allCommitCharacters, isNewIdentifierLocation: false };
                    }
                case SyntaxKind.OpenParenToken:
                    switch (containingNodeKind) {
                        case SyntaxKind.CallExpression:                                               // func( |
                        case SyntaxKind.NewExpression: {                                              // new C(a|
                            const expression = (contextToken.parent as CallExpression | NewExpression).expression;
                            if (getLineAndCharacterOfPosition(sourceFile, expression.end).line !==
                                getLineAndCharacterOfPosition(sourceFile, position).line) {           // func\n( |
                                return { defaultCommitCharacters: noCommaCommitCharacters, isNewIdentifierLocation: true };
                            }
                            return { defaultCommitCharacters: allCommitCharacters, isNewIdentifierLocation: true };
                        }
                        case SyntaxKind.ParenthesizedExpression:                                      // const x = (a|
                            return { defaultCommitCharacters: noCommaCommitCharacters, isNewIdentifierLocation: true };
                        case SyntaxKind.Constructor:                                                  // constructor( |
                        case SyntaxKind.ParenthesizedType:                                            // function F(pred: (a| /* this can become an arrow function, where 'a' is the argument */
                            return { defaultCommitCharacters: [], isNewIdentifierLocation: true };
                        default:
                            return { defaultCommitCharacters: allCommitCharacters, isNewIdentifierLocation: false };
                    }
                case SyntaxKind.OpenBracketToken:
                    switch (containingNodeKind) {
                        case SyntaxKind.ArrayLiteralExpression:                                       // [ |
                        case SyntaxKind.IndexSignature:                                               // [ | : string ]
                        case SyntaxKind.TupleType:                                                    // [ | : string ]
                        case SyntaxKind.ComputedPropertyName:                                         // [ |    /* this can become an index signature */
                            return { defaultCommitCharacters: allCommitCharacters, isNewIdentifierLocation: true };
                        default:
                            return { defaultCommitCharacters: allCommitCharacters, isNewIdentifierLocation: false };
                    }

                case SyntaxKind.ModuleKeyword:                                                        // module |
                case SyntaxKind.NamespaceKeyword:                                                     // namespace |
                case SyntaxKind.ImportKeyword:                                                        // import |
                    return { defaultCommitCharacters: [], isNewIdentifierLocation: true };

                case SyntaxKind.DotToken:
                    switch (containingNodeKind) {
                        case SyntaxKind.ModuleDeclaration:                                            // module A.|
                            return { defaultCommitCharacters: [], isNewIdentifierLocation: true };
                        default:
                            return { defaultCommitCharacters: allCommitCharacters, isNewIdentifierLocation: false };
                    }

                case SyntaxKind.OpenBraceToken:
                    switch (containingNodeKind) {
                        case SyntaxKind.ClassDeclaration:                                             // class A { |
                        case SyntaxKind.ObjectLiteralExpression:                                      // const obj = { |
                            return { defaultCommitCharacters: [], isNewIdentifierLocation: true };
                        default:
                            return { defaultCommitCharacters: allCommitCharacters, isNewIdentifierLocation: false };
                    }

                case SyntaxKind.EqualsToken:
                    switch (containingNodeKind) {
                        case SyntaxKind.VariableDeclaration:                                          // const x = a|
                        case SyntaxKind.BinaryExpression:                                             // x = a|
                            return { defaultCommitCharacters: allCommitCharacters, isNewIdentifierLocation: true };
                        default:
                            return { defaultCommitCharacters: allCommitCharacters, isNewIdentifierLocation: false };
                    }

                case SyntaxKind.TemplateHead:
                    return {
                        defaultCommitCharacters: allCommitCharacters,
                        isNewIdentifierLocation: containingNodeKind === SyntaxKind.TemplateExpression // `aa ${|
                    };

                case SyntaxKind.TemplateMiddle:
                    return  {
                        defaultCommitCharacters: allCommitCharacters,
                        isNewIdentifierLocation: containingNodeKind === SyntaxKind.TemplateSpan       // `aa ${10} dd ${|
                    };

                case SyntaxKind.AsyncKeyword:
                    return (containingNodeKind === SyntaxKind.MethodDeclaration                       // const obj = { async c|()
                        || containingNodeKind === SyntaxKind.ShorthandPropertyAssignment)             // const obj = { async c|
                        ? { defaultCommitCharacters: [], isNewIdentifierLocation: true }
                        : { defaultCommitCharacters: allCommitCharacters, isNewIdentifierLocation: false };

                case SyntaxKind.AsteriskToken:
                    return containingNodeKind === SyntaxKind.MethodDeclaration                        // const obj = { * c|
                        ? { defaultCommitCharacters: [], isNewIdentifierLocation: true }
                        : { defaultCommitCharacters: allCommitCharacters, isNewIdentifierLocation: false };
            }

            if (isClassMemberCompletionKeyword(tokenKind)) {
                return { defaultCommitCharacters: [], isNewIdentifierLocation: true };
            }
        }

        return { defaultCommitCharacters: allCommitCharacters, isNewIdentifierLocation: false };
    }

    function isInStringOrRegularExpressionOrTemplateLiteral(contextToken: Node): boolean {
        // To be "in" one of these literals, the position has to be:
        //   1. entirely within the token text.
        //   2. at the end position of an unterminated token.
        //   3. at the end of a regular expression (due to trailing flags like '/foo/g').
        return (isRegularExpressionLiteral(contextToken) || isStringTextContainingNode(contextToken)) && (
            rangeContainsPositionExclusive(contextToken, position) ||
            position === contextToken.end && (!!contextToken.isUnterminated || isRegularExpressionLiteral(contextToken))
        );
    }

    function tryGetObjectTypeLiteralInTypeArgumentCompletionSymbols(): GlobalsSearch | undefined {
        const typeLiteralNode = tryGetTypeLiteralNode(contextToken);
        if (!typeLiteralNode) return GlobalsSearch.Continue;

        const intersectionTypeNode = isIntersectionTypeNode(typeLiteralNode.parent) ? typeLiteralNode.parent : undefined;
        const containerTypeNode = intersectionTypeNode || typeLiteralNode;

        const containerExpectedType = getConstraintOfTypeArgumentProperty(containerTypeNode, typeChecker);
        if (!containerExpectedType) return GlobalsSearch.Continue;

        const containerActualType = typeChecker.getTypeFromTypeNode(containerTypeNode);

        const members = getPropertiesForCompletion(containerExpectedType, typeChecker);
        const existingMembers = getPropertiesForCompletion(containerActualType, typeChecker);

        const existingMemberEscapedNames = new Set<__String>();
        existingMembers.forEach(s => existingMemberEscapedNames.add(s.escapedName));

        symbols = concatenate(symbols, filter(members, s => !existingMemberEscapedNames.has(s.escapedName)));

        completionKind = CompletionKind.ObjectPropertyDeclaration;
        isNewIdentifierLocation = true;

        return GlobalsSearch.Success;
    }

    /**
     * Aggregates relevant symbols for completion in object literals and object binding patterns.
     * Relevant symbols are stored in the captured 'symbols' variable.
     *
     * @returns true if 'symbols' was successfully populated; false otherwise.
     */
    function tryGetObjectLikeCompletionSymbols(): GlobalsSearch | undefined {
        if (contextToken?.kind === SyntaxKind.DotDotDotToken) return GlobalsSearch.Continue;
        const symbolsStartIndex = symbols.length;
        const objectLikeContainer = tryGetObjectLikeCompletionContainer(contextToken, position, sourceFile);
        if (!objectLikeContainer) return GlobalsSearch.Continue;

        // We're looking up possible property names from contextual/inferred/declared type.
        completionKind = CompletionKind.ObjectPropertyDeclaration;

        let typeMembers: Symbol[] | undefined;
        let existingMembers: readonly Declaration[] | undefined;

        if (objectLikeContainer.kind === SyntaxKind.ObjectLiteralExpression) {
            const instantiatedType = tryGetObjectLiteralContextualType(objectLikeContainer, typeChecker);

            // Check completions for Object property value shorthand
            if (instantiatedType === undefined) {
                if (objectLikeContainer.flags & NodeFlags.InWithStatement) {
                    return GlobalsSearch.Fail;
                }
                return GlobalsSearch.Continue;
            }
            const completionsType = typeChecker.getContextualType(objectLikeContainer, ContextFlags.Completions);
            const hasStringIndexType = (completionsType || instantiatedType).getStringIndexType();
            const hasNumberIndextype = (completionsType || instantiatedType).getNumberIndexType();
            isNewIdentifierLocation = !!hasStringIndexType || !!hasNumberIndextype;
            typeMembers = getPropertiesForObjectExpression(instantiatedType, completionsType, objectLikeContainer, typeChecker);
            existingMembers = objectLikeContainer.properties;

            if (typeMembers.length === 0) {
                // Edge case: If NumberIndexType exists
                if (!hasNumberIndextype) {
                    return GlobalsSearch.Continue;
                }
            }
        }
        else {
            Debug.assert(objectLikeContainer.kind === SyntaxKind.ObjectBindingPattern);
            // We are *only* completing on properties from the type being destructured.
            isNewIdentifierLocation = false;

            const rootDeclaration = getRootDeclaration(objectLikeContainer.parent);
            if (!isVariableLike(rootDeclaration)) return Debug.fail("Root declaration is not variable-like.");

            // We don't want to complete using the type acquired by the shape
            // of the binding pattern; we are only interested in types acquired
            // through type declaration or inference.
            // Also proceed if rootDeclaration is a parameter and if its containing function expression/arrow function is contextually typed -
            // type of parameter will flow in from the contextual type of the function
            let canGetType = hasInitializer(rootDeclaration) || !!getEffectiveTypeAnnotationNode(rootDeclaration) || rootDeclaration.parent.parent.kind === SyntaxKind.ForOfStatement;
            if (!canGetType && rootDeclaration.kind === SyntaxKind.Parameter) {
                if (isExpression(rootDeclaration.parent)) {
                    canGetType = !!typeChecker.getContextualType(rootDeclaration.parent as Expression);
                }
                else if (rootDeclaration.parent.kind === SyntaxKind.MethodDeclaration || rootDeclaration.parent.kind === SyntaxKind.SetAccessor) {
                    canGetType = isExpression(rootDeclaration.parent.parent) && !!typeChecker.getContextualType(rootDeclaration.parent.parent as Expression);
                }
            }
            if (canGetType) {
                const typeForObject = typeChecker.getTypeAtLocation(objectLikeContainer);
                if (!typeForObject) return GlobalsSearch.Fail;
                typeMembers = typeChecker.getPropertiesOfType(typeForObject).filter(propertySymbol => {
                    return typeChecker.isPropertyAccessible(objectLikeContainer, /*isSuper*/ false, /*isWrite*/ false, typeForObject, propertySymbol);
                });
                existingMembers = objectLikeContainer.elements;
            }
        }

        if (typeMembers && typeMembers.length > 0) {
            // Add filtered items to the completion list
            const filteredMembers = filterObjectMembersList(typeMembers, Debug.checkDefined(existingMembers));
            symbols = concatenate(symbols, filteredMembers);
            setSortTextToOptionalMember();
            if (
                objectLikeContainer.kind === SyntaxKind.ObjectLiteralExpression
                && preferences.includeCompletionsWithObjectLiteralMethodSnippets
                && preferences.includeCompletionsWithInsertText
            ) {
                transformObjectLiteralMembersSortText(symbolsStartIndex);
                collectObjectLiteralMethodSymbols(filteredMembers, objectLikeContainer);
            }
        }

        return GlobalsSearch.Success;
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
     */
    function tryGetImportOrExportClauseCompletionSymbols(): GlobalsSearch {
        if (!contextToken) return GlobalsSearch.Continue;

        // `import { |` or `import { a as 0, | }` or `import { type | }`
        const namedImportsOrExports = contextToken.kind === SyntaxKind.OpenBraceToken || contextToken.kind === SyntaxKind.CommaToken ? tryCast(contextToken.parent, isNamedImportsOrExports) :
            isTypeKeywordTokenOrIdentifier(contextToken) ? tryCast(contextToken.parent.parent, isNamedImportsOrExports) : undefined;

        if (!namedImportsOrExports) return GlobalsSearch.Continue;

        // We can at least offer `type` at `import { |`
        if (!isTypeKeywordTokenOrIdentifier(contextToken)) {
            keywordFilters = KeywordCompletionFilters.TypeKeyword;
        }

        // try to show exported member for imported/re-exported module
        const { moduleSpecifier } = namedImportsOrExports.kind === SyntaxKind.NamedImports ? namedImportsOrExports.parent.parent : namedImportsOrExports.parent;
        if (!moduleSpecifier) {
            isNewIdentifierLocation = true;
            return namedImportsOrExports.kind === SyntaxKind.NamedImports ? GlobalsSearch.Fail : GlobalsSearch.Continue;
        }
        const moduleSpecifierSymbol = typeChecker.getSymbolAtLocation(moduleSpecifier); // TODO: GH#18217
        if (!moduleSpecifierSymbol) {
            isNewIdentifierLocation = true;
            return GlobalsSearch.Fail;
        }

        completionKind = CompletionKind.MemberLike;
        isNewIdentifierLocation = false;
        const exports = typeChecker.getExportsAndPropertiesOfModule(moduleSpecifierSymbol);
        const existing = new Set((namedImportsOrExports.elements as NodeArray<ImportOrExportSpecifier>).filter(n => !isCurrentlyEditingNode(n)).map(n => moduleExportNameTextEscaped(n.propertyName || n.name)));
        const uniques = exports.filter(e => e.escapedName !== InternalSymbolName.Default && !existing.has(e.escapedName));
        symbols = concatenate(symbols, uniques);
        if (!uniques.length) {
            // If there's nothing else to import, don't offer `type` either
            keywordFilters = KeywordCompletionFilters.None;
        }
        return GlobalsSearch.Success;
    }

    /**
     * import { x } from "foo" with { | }
     */
    function tryGetImportAttributesCompletionSymbols(): GlobalsSearch {
        if (contextToken === undefined) return GlobalsSearch.Continue;

        const importAttributes = contextToken.kind === SyntaxKind.OpenBraceToken || contextToken.kind === SyntaxKind.CommaToken ? tryCast(contextToken.parent, isImportAttributes) :
            contextToken.kind === SyntaxKind.ColonToken ? tryCast(contextToken.parent.parent, isImportAttributes) : undefined;
        if (importAttributes === undefined) return GlobalsSearch.Continue;

        const existing = new Set(importAttributes.elements.map(getNameFromImportAttribute));
        symbols = filter(typeChecker.getTypeAtLocation(importAttributes).getApparentProperties(), attr => !existing.has(attr.escapedName));
        return GlobalsSearch.Success;
    }

    /**
     * Adds local declarations for completions in named exports:
     *
     *   export { | };
     *
     * Does not check for the absence of a module specifier (`export {} from "./other"`)
     * because `tryGetImportOrExportClauseCompletionSymbols` runs first and handles that,
     * preventing this function from running.
     */
    function tryGetLocalNamedExportCompletionSymbols(): GlobalsSearch {
        const namedExports = contextToken && (contextToken.kind === SyntaxKind.OpenBraceToken || contextToken.kind === SyntaxKind.CommaToken)
            ? tryCast(contextToken.parent, isNamedExports)
            : undefined;

        if (!namedExports) {
            return GlobalsSearch.Continue;
        }

        const localsContainer = findAncestor(namedExports, or(isSourceFile, isModuleDeclaration))!;
        completionKind = CompletionKind.None;
        isNewIdentifierLocation = false;
        localsContainer.locals?.forEach((symbol, name) => {
            symbols.push(symbol);
            if (localsContainer.symbol?.exports?.has(name)) {
                symbolToSortTextMap[getSymbolId(symbol)] = SortText.OptionalMember;
            }
        });
        return GlobalsSearch.Success;
    }

    /**
     * Aggregates relevant symbols for completion in class declaration
     * Relevant symbols are stored in the captured 'symbols' variable.
     */
    function tryGetClassLikeCompletionSymbols(): GlobalsSearch {
        const decl = tryGetObjectTypeDeclarationCompletionContainer(sourceFile, contextToken, location, position);
        if (!decl) return GlobalsSearch.Continue;

        // We're looking up possible property names from parent type.
        completionKind = CompletionKind.MemberLike;
        // Declaring new property/method/accessor
        isNewIdentifierLocation = true;
        keywordFilters = contextToken.kind === SyntaxKind.AsteriskToken ? KeywordCompletionFilters.None :
            isClassLike(decl) ? KeywordCompletionFilters.ClassElementKeywords : KeywordCompletionFilters.InterfaceElementKeywords;

        // If you're in an interface you don't want to repeat things from super-interface. So just stop here.
        if (!isClassLike(decl)) return GlobalsSearch.Success;

        const classElement = contextToken.kind === SyntaxKind.SemicolonToken ? contextToken.parent.parent : contextToken.parent;
        let classElementModifierFlags = isClassElement(classElement) ? getEffectiveModifierFlags(classElement) : ModifierFlags.None;
        // If this is context token is not something we are editing now, consider if this would lead to be modifier
        if (contextToken.kind === SyntaxKind.Identifier && !isCurrentlyEditingNode(contextToken)) {
            switch (contextToken.getText()) {
                case "private":
                    classElementModifierFlags = classElementModifierFlags | ModifierFlags.Private;
                    break;
                case "static":
                    classElementModifierFlags = classElementModifierFlags | ModifierFlags.Static;
                    break;
                case "override":
                    classElementModifierFlags = classElementModifierFlags | ModifierFlags.Override;
                    break;
            }
        }
        if (isClassStaticBlockDeclaration(classElement)) {
            classElementModifierFlags |= ModifierFlags.Static;
        }

        // No member list for private methods
        if (!(classElementModifierFlags & ModifierFlags.Private)) {
            // List of property symbols of base type that are not private and already implemented
            const baseTypeNodes = isClassLike(decl) && classElementModifierFlags & ModifierFlags.Override ? singleElementArray(getEffectiveBaseTypeNode(decl)) : getAllSuperTypeNodes(decl);
            const baseSymbols = flatMap(baseTypeNodes, baseTypeNode => {
                const type = typeChecker.getTypeAtLocation(baseTypeNode);
                return classElementModifierFlags & ModifierFlags.Static ?
                    type?.symbol && typeChecker.getPropertiesOfType(typeChecker.getTypeOfSymbolAtLocation(type.symbol, decl)) :
                    type && typeChecker.getPropertiesOfType(type);
            });
            symbols = concatenate(symbols, filterClassMembersList(baseSymbols, decl.members, classElementModifierFlags));
            forEach(symbols, (symbol, index) => {
                const declaration = symbol?.valueDeclaration;
                if (declaration && isClassElement(declaration) && declaration.name && isComputedPropertyName(declaration.name)) {
                    const origin: SymbolOriginInfoComputedPropertyName = {
                        kind: SymbolOriginInfoKind.ComputedPropertyName,
                        symbolName: typeChecker.symbolToString(symbol),
                    };
                    symbolToOriginInfoMap[index] = origin;
                }
            });
        }
        return GlobalsSearch.Success;
    }

    function isConstructorParameterCompletion(node: Node): boolean {
        return !!node.parent && isParameter(node.parent) && isConstructorDeclaration(node.parent.parent)
            && (isParameterPropertyModifier(node.kind) || isDeclarationName(node));
    }

    /**
     * Returns the immediate owning class declaration of a context token,
     * on the condition that one exists and that the context implies completion should be given.
     */
    function tryGetConstructorLikeCompletionContainer(contextToken: Node): ConstructorDeclaration | undefined {
        if (contextToken) {
            const parent = contextToken.parent;
            switch (contextToken.kind) {
                case SyntaxKind.OpenParenToken:
                case SyntaxKind.CommaToken:
                    return isConstructorDeclaration(contextToken.parent) ? contextToken.parent : undefined;

                default:
                    if (isConstructorParameterCompletion(contextToken)) {
                        return parent.parent as ConstructorDeclaration;
                    }
            }
        }
        return undefined;
    }

    function tryGetFunctionLikeBodyCompletionContainer(contextToken: Node): FunctionLikeDeclaration | undefined {
        if (contextToken) {
            let prev: Node;
            const container = findAncestor(contextToken.parent, (node: Node) => {
                if (isClassLike(node)) {
                    return "quit";
                }
                if (isFunctionLikeDeclaration(node) && prev === node.body) {
                    return true;
                }
                prev = node;
                return false;
            });
            return container && container as FunctionLikeDeclaration;
        }
    }

    function tryGetContainingJsxElement(contextToken: Node): JsxOpeningLikeElement | undefined {
        if (contextToken) {
            const parent = contextToken.parent;
            switch (contextToken.kind) {
                case SyntaxKind.GreaterThanToken: // End of a type argument list
                case SyntaxKind.LessThanSlashToken:
                case SyntaxKind.SlashToken:
                case SyntaxKind.Identifier:
                case SyntaxKind.PropertyAccessExpression:
                case SyntaxKind.JsxAttributes:
                case SyntaxKind.JsxAttribute:
                case SyntaxKind.JsxSpreadAttribute:
                    if (parent && (parent.kind === SyntaxKind.JsxSelfClosingElement || parent.kind === SyntaxKind.JsxOpeningElement)) {
                        if (contextToken.kind === SyntaxKind.GreaterThanToken) {
                            const precedingToken = findPrecedingToken(contextToken.pos, sourceFile, /*startNode*/ undefined);
                            if (!(parent as JsxOpeningLikeElement).typeArguments || (precedingToken && precedingToken.kind === SyntaxKind.SlashToken)) break;
                        }
                        return parent as JsxOpeningLikeElement;
                    }
                    else if (parent.kind === SyntaxKind.JsxAttribute) {
                        // Currently we parse JsxOpeningLikeElement as:
                        //      JsxOpeningLikeElement
                        //          attributes: JsxAttributes
                        //             properties: NodeArray<JsxAttributeLike>
                        return parent.parent.parent as JsxOpeningLikeElement;
                    }
                    break;

                // The context token is the closing } or " of an attribute, which means
                // its parent is a JsxExpression, whose parent is a JsxAttribute,
                // whose parent is a JsxOpeningLikeElement
                case SyntaxKind.StringLiteral:
                    if (parent && ((parent.kind === SyntaxKind.JsxAttribute) || (parent.kind === SyntaxKind.JsxSpreadAttribute))) {
                        // Currently we parse JsxOpeningLikeElement as:
                        //      JsxOpeningLikeElement
                        //          attributes: JsxAttributes
                        //             properties: NodeArray<JsxAttributeLike>
                        return parent.parent.parent as JsxOpeningLikeElement;
                    }

                    break;

                case SyntaxKind.CloseBraceToken:
                    if (
                        parent &&
                        parent.kind === SyntaxKind.JsxExpression &&
                        parent.parent && parent.parent.kind === SyntaxKind.JsxAttribute
                    ) {
                        // Currently we parse JsxOpeningLikeElement as:
                        //      JsxOpeningLikeElement
                        //          attributes: JsxAttributes
                        //             properties: NodeArray<JsxAttributeLike>
                        //                  each JsxAttribute can have initializer as JsxExpression
                        return parent.parent.parent.parent as JsxOpeningLikeElement;
                    }

                    if (parent && parent.kind === SyntaxKind.JsxSpreadAttribute) {
                        // Currently we parse JsxOpeningLikeElement as:
                        //      JsxOpeningLikeElement
                        //          attributes: JsxAttributes
                        //             properties: NodeArray<JsxAttributeLike>
                        return parent.parent.parent as JsxOpeningLikeElement;
                    }

                    break;
            }
        }
        return undefined;
    }

    function isInDifferentLineThanContextToken(contextToken: Node, position: number): boolean {
        return sourceFile.getLineEndOfPosition(contextToken.getEnd()) < position;
    }

    /**
     * @returns true if we are certain that the currently edited location must define a new location; false otherwise.
     */
    function isSolelyIdentifierDefinitionLocation(contextToken: Node): boolean {
        const parent = contextToken.parent;
        const containingNodeKind = parent.kind;
        // dprint-ignore
        switch (contextToken.kind) {
            case SyntaxKind.CommaToken:
                return containingNodeKind === SyntaxKind.VariableDeclaration ||
                    isVariableDeclarationListButNotTypeArgument(contextToken) ||
                    containingNodeKind === SyntaxKind.VariableStatement ||
                    containingNodeKind === SyntaxKind.EnumDeclaration ||                        // enum a { foo, |
                    isFunctionLikeButNotConstructor(containingNodeKind) ||
                    containingNodeKind === SyntaxKind.InterfaceDeclaration ||                   // interface A<T, |
                    containingNodeKind === SyntaxKind.ArrayBindingPattern ||                    // var [x, y|
                    containingNodeKind === SyntaxKind.TypeAliasDeclaration ||                   // type Map, K, |
                    // class A<T, |
                    // var C = class D<T, |
                    (isClassLike(parent) &&
                        !!parent.typeParameters &&
                        parent.typeParameters.end >= contextToken.pos);

            case SyntaxKind.DotToken:
                return containingNodeKind === SyntaxKind.ArrayBindingPattern;                   // var [.|

            case SyntaxKind.ColonToken:
                return containingNodeKind === SyntaxKind.BindingElement;                        // var {x :html|

            case SyntaxKind.OpenBracketToken:
                return containingNodeKind === SyntaxKind.ArrayBindingPattern;                   // var [x|

            case SyntaxKind.OpenParenToken:
                return containingNodeKind === SyntaxKind.CatchClause ||
                    isFunctionLikeButNotConstructor(containingNodeKind);

            case SyntaxKind.OpenBraceToken:
                return containingNodeKind === SyntaxKind.EnumDeclaration;                       // enum a { |

            case SyntaxKind.LessThanToken:
                return containingNodeKind === SyntaxKind.ClassDeclaration ||                    // class A< |
                    containingNodeKind === SyntaxKind.ClassExpression ||                        // var C = class D< |
                    containingNodeKind === SyntaxKind.InterfaceDeclaration ||                   // interface A< |
                    containingNodeKind === SyntaxKind.TypeAliasDeclaration ||                   // type List< |
                    isFunctionLikeKind(containingNodeKind);

            case SyntaxKind.StaticKeyword:
                return containingNodeKind === SyntaxKind.PropertyDeclaration && !isClassLike(parent.parent);

            case SyntaxKind.DotDotDotToken:
                return containingNodeKind === SyntaxKind.Parameter ||
                    (!!parent.parent && parent.parent.kind === SyntaxKind.ArrayBindingPattern);  // var [...z|

            case SyntaxKind.PublicKeyword:
            case SyntaxKind.PrivateKeyword:
            case SyntaxKind.ProtectedKeyword:
                return containingNodeKind === SyntaxKind.Parameter && !isConstructorDeclaration(parent.parent);

            case SyntaxKind.AsKeyword:
                return containingNodeKind === SyntaxKind.ImportSpecifier ||
                    containingNodeKind === SyntaxKind.ExportSpecifier ||
                    containingNodeKind === SyntaxKind.NamespaceImport;

            case SyntaxKind.GetKeyword:
            case SyntaxKind.SetKeyword:
                return !isFromObjectTypeDeclaration(contextToken);

            case SyntaxKind.Identifier: {
                if ((
                    containingNodeKind === SyntaxKind.ImportSpecifier ||
                    containingNodeKind === SyntaxKind.ExportSpecifier
                ) &&
                    contextToken === (parent as ImportSpecifier).name &&
                    (contextToken as Identifier).text === "type"
                ) {
                    // import { type | }
                    return false;
                }
                const ancestorVariableDeclaration = findAncestor(
                    contextToken.parent, isVariableDeclaration);
                if (ancestorVariableDeclaration
                    && isInDifferentLineThanContextToken(contextToken, position)) {
                    // let a
                    // |
                    return false;
                }
                break;
            }

            case SyntaxKind.ClassKeyword:
            case SyntaxKind.EnumKeyword:
            case SyntaxKind.InterfaceKeyword:
            case SyntaxKind.FunctionKeyword:
            case SyntaxKind.VarKeyword:
            case SyntaxKind.ImportKeyword:
            case SyntaxKind.LetKeyword:
            case SyntaxKind.ConstKeyword:
            case SyntaxKind.InferKeyword:
                return true;

            case SyntaxKind.TypeKeyword:
                // import { type foo| }
                return containingNodeKind !== SyntaxKind.ImportSpecifier;

            case SyntaxKind.AsteriskToken:
                return isFunctionLike(contextToken.parent) && !isMethodDeclaration(contextToken.parent);
        }

        // If the previous token is keyword corresponding to class member completion keyword
        // there will be completion available here
        if (isClassMemberCompletionKeyword(keywordForNode(contextToken)) && isFromObjectTypeDeclaration(contextToken)) {
            return false;
        }

        if (isConstructorParameterCompletion(contextToken)) {
            // constructor parameter completion is available only if
            // - its modifier of the constructor parameter or
            // - its name of the parameter and not being edited
            // eg. constructor(a |<- this shouldnt show completion
            if (
                !isIdentifier(contextToken) ||
                isParameterPropertyModifier(keywordForNode(contextToken)) ||
                isCurrentlyEditingNode(contextToken)
            ) {
                return false;
            }
        }

        // Previous token may have been a keyword that was converted to an identifier.
        switch (keywordForNode(contextToken)) {
            case SyntaxKind.AbstractKeyword:
            case SyntaxKind.ClassKeyword:
            case SyntaxKind.ConstKeyword:
            case SyntaxKind.DeclareKeyword:
            case SyntaxKind.EnumKeyword:
            case SyntaxKind.FunctionKeyword:
            case SyntaxKind.InterfaceKeyword:
            case SyntaxKind.LetKeyword:
            case SyntaxKind.PrivateKeyword:
            case SyntaxKind.ProtectedKeyword:
            case SyntaxKind.PublicKeyword:
            case SyntaxKind.StaticKeyword:
            case SyntaxKind.VarKeyword:
                return true;
            case SyntaxKind.AsyncKeyword:
                return isPropertyDeclaration(contextToken.parent);
        }

        // If we are inside a class declaration, and `constructor` is totally not present,
        // but we request a completion manually at a whitespace...
        const ancestorClassLike = findAncestor(contextToken.parent, isClassLike);
        if (ancestorClassLike && contextToken === previousToken && isPreviousPropertyDeclarationTerminated(contextToken, position)) {
            return false; // Don't block completions.
        }

        const ancestorPropertyDeclaraion = getAncestor(contextToken.parent, SyntaxKind.PropertyDeclaration);
        // If we are inside a class declaration and typing `constructor` after property declaration...
        if (
            ancestorPropertyDeclaraion
            && contextToken !== previousToken
            && isClassLike(previousToken.parent.parent)
            // And the cursor is at the token...
            && position <= previousToken.end
        ) {
            // If we are sure that the previous property declaration is terminated according to newline or semicolon...
            if (isPreviousPropertyDeclarationTerminated(contextToken, previousToken.end)) {
                return false; // Don't block completions.
            }
            else if (
                contextToken.kind !== SyntaxKind.EqualsToken
                // Should not block: `class C { blah = c/**/ }`
                // But should block: `class C { blah = somewhat c/**/ }` and `class C { blah: SomeType c/**/ }`
                && (isInitializedProperty(ancestorPropertyDeclaraion as PropertyDeclaration)
                    || hasType(ancestorPropertyDeclaraion))
            ) {
                return true;
            }
        }

        return isDeclarationName(contextToken)
            && !isShorthandPropertyAssignment(contextToken.parent)
            && !isJsxAttribute(contextToken.parent)
            // Don't block completions if we're in `class C /**/`, `interface I /**/` or `<T /**/>` , because we're *past* the end of the identifier and might want to complete `extends`.
            // If `contextToken !== previousToken`, this is `class C ex/**/`, `interface I ex/**/` or `<T ex/**/>`.
            && !((isClassLike(contextToken.parent) || isInterfaceDeclaration(contextToken.parent) || isTypeParameterDeclaration(contextToken.parent)) && (contextToken !== previousToken || position > previousToken.end));
    }

    function isPreviousPropertyDeclarationTerminated(contextToken: Node, position: number) {
        return contextToken.kind !== SyntaxKind.EqualsToken &&
            (contextToken.kind === SyntaxKind.SemicolonToken
                || !positionsAreOnSameLine(contextToken.end, position, sourceFile));
    }

    function isFunctionLikeButNotConstructor(kind: SyntaxKind) {
        return isFunctionLikeKind(kind) && kind !== SyntaxKind.Constructor;
    }

    function isDotOfNumericLiteral(contextToken: Node): boolean {
        if (contextToken.kind === SyntaxKind.NumericLiteral) {
            const text = contextToken.getFullText();
            return text.charAt(text.length - 1) === ".";
        }

        return false;
    }

    function isVariableDeclarationListButNotTypeArgument(node: Node): boolean {
        return node.parent.kind === SyntaxKind.VariableDeclarationList
            && !isPossiblyTypeArgumentPosition(node, sourceFile, typeChecker);
    }

    /**
     * Filters out completion suggestions for named imports or exports.
     *
     * @returns Symbols to be suggested in an object binding pattern or object literal expression, barring those whose declarations
     *          do not occur at the current position and have not otherwise been typed.
     */
    function filterObjectMembersList(contextualMemberSymbols: Symbol[], existingMembers: readonly Declaration[]): Symbol[] {
        if (existingMembers.length === 0) {
            return contextualMemberSymbols;
        }

        const membersDeclaredBySpreadAssignment = new Set<string>();
        const existingMemberNames = new Set<__String>();
        for (const m of existingMembers) {
            // Ignore omitted expressions for missing members
            if (
                m.kind !== SyntaxKind.PropertyAssignment &&
                m.kind !== SyntaxKind.ShorthandPropertyAssignment &&
                m.kind !== SyntaxKind.BindingElement &&
                m.kind !== SyntaxKind.MethodDeclaration &&
                m.kind !== SyntaxKind.GetAccessor &&
                m.kind !== SyntaxKind.SetAccessor &&
                m.kind !== SyntaxKind.SpreadAssignment
            ) {
                continue;
            }

            // If this is the current item we are editing right now, do not filter it out
            if (isCurrentlyEditingNode(m)) {
                continue;
            }

            let existingName: __String | undefined;

            if (isSpreadAssignment(m)) {
                setMembersDeclaredBySpreadAssignment(m, membersDeclaredBySpreadAssignment);
            }
            else if (isBindingElement(m) && m.propertyName) {
                // include only identifiers in completion list
                if (m.propertyName.kind === SyntaxKind.Identifier) {
                    existingName = m.propertyName.escapedText;
                }
            }
            else {
                // TODO: Account for computed property name
                // NOTE: if one only performs this step when m.name is an identifier,
                // things like '__proto__' are not filtered out.
                const name = getNameOfDeclaration(m);
                existingName = name && isPropertyNameLiteral(name) ? getEscapedTextOfIdentifierOrLiteral(name) : undefined;
            }

            if (existingName !== undefined) {
                existingMemberNames.add(existingName);
            }
        }

        const filteredSymbols = contextualMemberSymbols.filter(m => !existingMemberNames.has(m.escapedName));
        setSortTextToMemberDeclaredBySpreadAssignment(membersDeclaredBySpreadAssignment, filteredSymbols);

        return filteredSymbols;
    }

    function setMembersDeclaredBySpreadAssignment(declaration: SpreadAssignment | JsxSpreadAttribute, membersDeclaredBySpreadAssignment: Set<string>) {
        const expression = declaration.expression;
        const symbol = typeChecker.getSymbolAtLocation(expression);
        const type = symbol && typeChecker.getTypeOfSymbolAtLocation(symbol, expression);
        const properties = type && (type as ObjectType).properties;
        if (properties) {
            properties.forEach(property => {
                membersDeclaredBySpreadAssignment.add(property.name);
            });
        }
    }

    // Set SortText to OptionalMember if it is an optional member
    function setSortTextToOptionalMember() {
        symbols.forEach(m => {
            if (m.flags & SymbolFlags.Optional) {
                const symbolId = getSymbolId(m);
                symbolToSortTextMap[symbolId] = symbolToSortTextMap[symbolId] ?? SortText.OptionalMember;
            }
        });
    }

    // Set SortText to MemberDeclaredBySpreadAssignment if it is fulfilled by spread assignment
    function setSortTextToMemberDeclaredBySpreadAssignment(membersDeclaredBySpreadAssignment: Set<string>, contextualMemberSymbols: Symbol[]): void {
        if (membersDeclaredBySpreadAssignment.size === 0) {
            return;
        }
        for (const contextualMemberSymbol of contextualMemberSymbols) {
            if (membersDeclaredBySpreadAssignment.has(contextualMemberSymbol.name)) {
                symbolToSortTextMap[getSymbolId(contextualMemberSymbol)] = SortText.MemberDeclaredBySpreadAssignment;
            }
        }
    }

    function transformObjectLiteralMembersSortText(start: number): void {
        for (let i = start; i < symbols.length; i++) {
            const symbol = symbols[i];
            const symbolId = getSymbolId(symbol);
            const origin = symbolToOriginInfoMap?.[i];
            const target = getEmitScriptTarget(compilerOptions);
            const displayName = getCompletionEntryDisplayNameForSymbol(
                symbol,
                target,
                origin,
                CompletionKind.ObjectPropertyDeclaration,
                /*jsxIdentifierExpected*/ false,
            );
            if (displayName) {
                const originalSortText = symbolToSortTextMap[symbolId] ?? SortText.LocationPriority;
                const { name } = displayName;
                symbolToSortTextMap[symbolId] = SortText.ObjectLiteralProperty(originalSortText, name);
            }
        }
    }

    /**
     * Filters out completion suggestions for class elements.
     *
     * @returns Symbols to be suggested in an class element depending on existing memebers and symbol flags
     */
    function filterClassMembersList(baseSymbols: readonly Symbol[], existingMembers: readonly ClassElement[], currentClassElementModifierFlags: ModifierFlags): Symbol[] {
        const existingMemberNames = new Set<__String>();
        for (const m of existingMembers) {
            // Ignore omitted expressions for missing members
            if (
                m.kind !== SyntaxKind.PropertyDeclaration &&
                m.kind !== SyntaxKind.MethodDeclaration &&
                m.kind !== SyntaxKind.GetAccessor &&
                m.kind !== SyntaxKind.SetAccessor
            ) {
                continue;
            }

            // If this is the current item we are editing right now, do not filter it out
            if (isCurrentlyEditingNode(m)) {
                continue;
            }

            // Dont filter member even if the name matches if it is declared private in the list
            if (hasEffectiveModifier(m, ModifierFlags.Private)) {
                continue;
            }

            // do not filter it out if the static presence doesnt match
            if (isStatic(m) !== !!(currentClassElementModifierFlags & ModifierFlags.Static)) {
                continue;
            }

            const existingName = getPropertyNameForPropertyNameNode(m.name!);
            if (existingName) {
                existingMemberNames.add(existingName);
            }
        }

        return baseSymbols.filter(propertySymbol =>
            !existingMemberNames.has(propertySymbol.escapedName) &&
            !!propertySymbol.declarations &&
            !(getDeclarationModifierFlagsFromSymbol(propertySymbol) & ModifierFlags.Private) &&
            !(propertySymbol.valueDeclaration && isPrivateIdentifierClassElementDeclaration(propertySymbol.valueDeclaration))
        );
    }

    /**
     * Filters out completion suggestions from 'symbols' according to existing JSX attributes.
     *
     * @returns Symbols to be suggested in a JSX element, barring those whose attributes
     *          do not occur at the current position and have not otherwise been typed.
     */
    function filterJsxAttributes(symbols: Symbol[], attributes: NodeArray<JsxAttribute | JsxSpreadAttribute>): Symbol[] {
        const seenNames = new Set<__String>();
        const membersDeclaredBySpreadAssignment = new Set<string>();
        for (const attr of attributes) {
            // If this is the current item we are editing right now, do not filter it out
            if (isCurrentlyEditingNode(attr)) {
                continue;
            }

            if (attr.kind === SyntaxKind.JsxAttribute) {
                seenNames.add(getEscapedTextOfJsxAttributeName(attr.name));
            }
            else if (isJsxSpreadAttribute(attr)) {
                setMembersDeclaredBySpreadAssignment(attr, membersDeclaredBySpreadAssignment);
            }
        }
        const filteredSymbols = symbols.filter(a => !seenNames.has(a.escapedName));

        setSortTextToMemberDeclaredBySpreadAssignment(membersDeclaredBySpreadAssignment, filteredSymbols);

        return filteredSymbols;
    }

    function isCurrentlyEditingNode(node: Node): boolean {
        return node.getStart(sourceFile) <= position && position <= node.getEnd();
    }
}

/**
 * Returns the immediate owning object literal or binding pattern of a context token,
 * on the condition that one exists and that the context implies completion should be given.
 */
function tryGetObjectLikeCompletionContainer(contextToken: Node | undefined, position: number, sourceFile: SourceFile): ObjectLiteralExpression | ObjectBindingPattern | undefined {
    if (contextToken) {
        const { parent } = contextToken;
        switch (contextToken.kind) {
            case SyntaxKind.OpenBraceToken: // const x = { |
            case SyntaxKind.CommaToken: // const x = { a: 0, |
                if (isObjectLiteralExpression(parent) || isObjectBindingPattern(parent)) {
                    return parent;
                }
                break;
            case SyntaxKind.AsteriskToken:
                return isMethodDeclaration(parent) ? tryCast(parent.parent, isObjectLiteralExpression) : undefined;
            case SyntaxKind.AsyncKeyword:
                return tryCast(parent.parent, isObjectLiteralExpression);
            case SyntaxKind.Identifier:
                if ((contextToken as Identifier).text === "async" && isShorthandPropertyAssignment(contextToken.parent)) {
                    return contextToken.parent.parent;
                }
                else {
                    if (
                        isObjectLiteralExpression(contextToken.parent.parent) &&
                        (isSpreadAssignment(contextToken.parent) || isShorthandPropertyAssignment(contextToken.parent) &&
                                (getLineAndCharacterOfPosition(sourceFile, contextToken.getEnd()).line !== getLineAndCharacterOfPosition(sourceFile, position).line))
                    ) {
                        return contextToken.parent.parent;
                    }
                    const ancestorNode = findAncestor(parent, isPropertyAssignment);
                    if (ancestorNode?.getLastToken(sourceFile) === contextToken && isObjectLiteralExpression(ancestorNode.parent)) {
                        return ancestorNode.parent;
                    }
                }
                break;
            default:
                if (parent.parent?.parent && (isMethodDeclaration(parent.parent) || isGetAccessorDeclaration(parent.parent) || isSetAccessorDeclaration(parent.parent)) && isObjectLiteralExpression(parent.parent.parent)) {
                    return parent.parent.parent;
                }
                if (isSpreadAssignment(parent) && isObjectLiteralExpression(parent.parent)) {
                    return parent.parent;
                }
                const ancestorNode = findAncestor(parent, isPropertyAssignment);
                if (
                    contextToken.kind !== SyntaxKind.ColonToken && ancestorNode?.getLastToken(sourceFile) === contextToken &&
                    isObjectLiteralExpression(ancestorNode.parent)
                ) {
                    return ancestorNode.parent;
                }
        }
    }

    return undefined;
}

function getRelevantTokens(position: number, sourceFile: SourceFile): { contextToken: Node; previousToken: Node; } | { contextToken: undefined; previousToken: undefined; } {
    const previousToken = findPrecedingToken(position, sourceFile);
    if (previousToken && position <= previousToken.end && (isMemberName(previousToken) || isKeyword(previousToken.kind))) {
        const contextToken = findPrecedingToken(previousToken.getFullStart(), sourceFile, /*startNode*/ undefined)!; // TODO: GH#18217
        return { contextToken, previousToken };
    }
    return { contextToken: previousToken as Node, previousToken: previousToken as Node };
}

function getAutoImportSymbolFromCompletionEntryData(name: string, data: CompletionEntryData, program: Program, host: LanguageServiceHost): { symbol: Symbol; origin: SymbolOriginInfoExport | SymbolOriginInfoResolvedExport; } | undefined {
    const containingProgram = data.isPackageJsonImport ? host.getPackageJsonAutoImportProvider!()! : program;
    const checker = containingProgram.getTypeChecker();
    const moduleSymbol = data.ambientModuleName ? checker.tryFindAmbientModule(data.ambientModuleName) :
        data.fileName ? checker.getMergedSymbol(Debug.checkDefined(containingProgram.getSourceFile(data.fileName)).symbol) :
        undefined;

    if (!moduleSymbol) return undefined;
    let symbol = data.exportName === InternalSymbolName.ExportEquals
        ? checker.resolveExternalModuleSymbol(moduleSymbol)
        : checker.tryGetMemberInModuleExportsAndProperties(data.exportName, moduleSymbol);
    if (!symbol) return undefined;
    const isDefaultExport = data.exportName === InternalSymbolName.Default;
    symbol = isDefaultExport && getLocalSymbolForExportDefault(symbol) || symbol;
    return { symbol, origin: completionEntryDataToSymbolOriginInfo(data, name, moduleSymbol) };
}

interface CompletionEntryDisplayNameForSymbol {
    readonly name: string;
    readonly needsConvertPropertyAccess: boolean;
}
function getCompletionEntryDisplayNameForSymbol(
    symbol: Symbol,
    target: ScriptTarget,
    origin: SymbolOriginInfo | undefined,
    kind: CompletionKind,
    jsxIdentifierExpected: boolean,
): CompletionEntryDisplayNameForSymbol | undefined {
    if (originIsIgnore(origin)) {
        return undefined;
    }
    const name = originIncludesSymbolName(origin) ? origin.symbolName : symbol.name;
    if (
        name === undefined
        // If the symbol is external module, don't show it in the completion list
        // (i.e declare module "http" { const x; } | // <= request completion here, "http" should not be there)
        || symbol.flags & SymbolFlags.Module && isSingleOrDoubleQuote(name.charCodeAt(0))
        // If the symbol is the internal name of an ES symbol, it is not a valid entry. Internal names for ES symbols start with "__@"
        || isKnownSymbol(symbol)
    ) {
        return undefined;
    }

    const validNameResult: CompletionEntryDisplayNameForSymbol = { name, needsConvertPropertyAccess: false };
    if (isIdentifierText(name, target, jsxIdentifierExpected ? LanguageVariant.JSX : LanguageVariant.Standard) || symbol.valueDeclaration && isPrivateIdentifierClassElementDeclaration(symbol.valueDeclaration)) {
        return validNameResult;
    }
    if (symbol.flags & SymbolFlags.Alias) {
        // Allow non-identifier import/export aliases since we can insert them as string literals
        return { name, needsConvertPropertyAccess: true };
    }
    switch (kind) {
        case CompletionKind.MemberLike:
            return originIsComputedPropertyName(origin) ? { name: origin.symbolName, needsConvertPropertyAccess: false } : undefined;
        case CompletionKind.ObjectPropertyDeclaration:
            // TODO: GH#18169
            return { name: JSON.stringify(name), needsConvertPropertyAccess: false };
        case CompletionKind.PropertyAccess:
        case CompletionKind.Global: // For a 'this.' completion it will be in a global context, but may have a non-identifier name.
            // Don't add a completion for a name starting with a space. See https://github.com/Microsoft/TypeScript/pull/20547
            return name.charCodeAt(0) === CharacterCodes.space ? undefined : { name, needsConvertPropertyAccess: true };
        case CompletionKind.None:
        case CompletionKind.String:
            return validNameResult;
        default:
            Debug.assertNever(kind);
    }
}

// A cache of completion entries for keywords, these do not change between sessions
const _keywordCompletions: CompletionEntry[][] = [];
const allKeywordsCompletions: () => readonly CompletionEntry[] = memoize(() => {
    const res: CompletionEntry[] = [];
    for (let i = SyntaxKind.FirstKeyword; i <= SyntaxKind.LastKeyword; i++) {
        res.push({
            name: tokenToString(i)!,
            kind: ScriptElementKind.keyword,
            kindModifiers: ScriptElementKindModifier.none,
            sortText: SortText.GlobalsOrKeywords,
        });
    }
    return res;
});

function getKeywordCompletions(keywordFilter: KeywordCompletionFilters, filterOutTsOnlyKeywords: boolean): readonly CompletionEntry[] {
    if (!filterOutTsOnlyKeywords) return getTypescriptKeywordCompletions(keywordFilter);

    const index = keywordFilter + KeywordCompletionFilters.Last + 1;
    return _keywordCompletions[index] ||
        (_keywordCompletions[index] = getTypescriptKeywordCompletions(keywordFilter)
            .filter(entry => !isTypeScriptOnlyKeyword(stringToToken(entry.name)!)));
}

function getTypescriptKeywordCompletions(keywordFilter: KeywordCompletionFilters): readonly CompletionEntry[] {
    return _keywordCompletions[keywordFilter] || (_keywordCompletions[keywordFilter] = allKeywordsCompletions().filter(entry => {
        const kind = stringToToken(entry.name)!;
        switch (keywordFilter) {
            case KeywordCompletionFilters.None:
                return false;
            case KeywordCompletionFilters.All:
                return isFunctionLikeBodyKeyword(kind)
                    || kind === SyntaxKind.DeclareKeyword
                    || kind === SyntaxKind.ModuleKeyword
                    || kind === SyntaxKind.TypeKeyword
                    || kind === SyntaxKind.NamespaceKeyword
                    || kind === SyntaxKind.AbstractKeyword
                    || isTypeKeyword(kind) && kind !== SyntaxKind.UndefinedKeyword;
            case KeywordCompletionFilters.FunctionLikeBodyKeywords:
                return isFunctionLikeBodyKeyword(kind);
            case KeywordCompletionFilters.ClassElementKeywords:
                return isClassMemberCompletionKeyword(kind);
            case KeywordCompletionFilters.InterfaceElementKeywords:
                return isInterfaceOrTypeLiteralCompletionKeyword(kind);
            case KeywordCompletionFilters.ConstructorParameterKeywords:
                return isParameterPropertyModifier(kind);
            case KeywordCompletionFilters.TypeAssertionKeywords:
                return isTypeKeyword(kind) || kind === SyntaxKind.ConstKeyword;
            case KeywordCompletionFilters.TypeKeywords:
                return isTypeKeyword(kind);
            case KeywordCompletionFilters.TypeKeyword:
                return kind === SyntaxKind.TypeKeyword;
            default:
                return Debug.assertNever(keywordFilter);
        }
    }));
}

function isTypeScriptOnlyKeyword(kind: SyntaxKind) {
    switch (kind) {
        case SyntaxKind.AbstractKeyword:
        case SyntaxKind.AnyKeyword:
        case SyntaxKind.BigIntKeyword:
        case SyntaxKind.BooleanKeyword:
        case SyntaxKind.DeclareKeyword:
        case SyntaxKind.EnumKeyword:
        case SyntaxKind.GlobalKeyword:
        case SyntaxKind.ImplementsKeyword:
        case SyntaxKind.InferKeyword:
        case SyntaxKind.InterfaceKeyword:
        case SyntaxKind.IsKeyword:
        case SyntaxKind.KeyOfKeyword:
        case SyntaxKind.ModuleKeyword:
        case SyntaxKind.NamespaceKeyword:
        case SyntaxKind.NeverKeyword:
        case SyntaxKind.NumberKeyword:
        case SyntaxKind.ObjectKeyword:
        case SyntaxKind.OverrideKeyword:
        case SyntaxKind.PrivateKeyword:
        case SyntaxKind.ProtectedKeyword:
        case SyntaxKind.PublicKeyword:
        case SyntaxKind.ReadonlyKeyword:
        case SyntaxKind.StringKeyword:
        case SyntaxKind.SymbolKeyword:
        case SyntaxKind.TypeKeyword:
        case SyntaxKind.UniqueKeyword:
        case SyntaxKind.UnknownKeyword:
            return true;
        default:
            return false;
    }
}

function isInterfaceOrTypeLiteralCompletionKeyword(kind: SyntaxKind): boolean {
    return kind === SyntaxKind.ReadonlyKeyword;
}

function isClassMemberCompletionKeyword(kind: SyntaxKind) {
    switch (kind) {
        case SyntaxKind.AbstractKeyword:
        case SyntaxKind.AccessorKeyword:
        case SyntaxKind.ConstructorKeyword:
        case SyntaxKind.GetKeyword:
        case SyntaxKind.SetKeyword:
        case SyntaxKind.AsyncKeyword:
        case SyntaxKind.DeclareKeyword:
        case SyntaxKind.OverrideKeyword:
            return true;
        default:
            return isClassMemberModifier(kind);
    }
}

function isFunctionLikeBodyKeyword(kind: SyntaxKind) {
    return kind === SyntaxKind.AsyncKeyword
        || kind === SyntaxKind.AwaitKeyword
        || kind === SyntaxKind.UsingKeyword
        || kind === SyntaxKind.AsKeyword
        || kind === SyntaxKind.SatisfiesKeyword
        || kind === SyntaxKind.TypeKeyword
        || !isContextualKeyword(kind) && !isClassMemberCompletionKeyword(kind);
}

function keywordForNode(node: Node): SyntaxKind {
    return isIdentifier(node) ? identifierToKeywordKind(node) ?? SyntaxKind.Unknown : node.kind;
}

function getContextualKeywords(
    contextToken: Node | undefined,
    position: number,
): readonly CompletionEntry[] {
    const entries = [];
    /**
     * An `AssertClause` can come after an import declaration:
     *  import * from "foo" |
     *  import "foo" |
     * or after a re-export declaration that has a module specifier:
     *  export { foo } from "foo" |
     * Source: https://tc39.es/proposal-import-assertions/
     */
    if (contextToken) {
        const file = contextToken.getSourceFile();
        const parent = contextToken.parent;
        const tokenLine = file.getLineAndCharacterOfPosition(contextToken.end).line;
        const currentLine = file.getLineAndCharacterOfPosition(position).line;
        if (
            (isImportDeclaration(parent) || isExportDeclaration(parent) && parent.moduleSpecifier)
            && contextToken === parent.moduleSpecifier
            && tokenLine === currentLine
        ) {
            entries.push({
                name: tokenToString(SyntaxKind.AssertKeyword),
                kind: ScriptElementKind.keyword,
                kindModifiers: ScriptElementKindModifier.none,
                sortText: SortText.GlobalsOrKeywords,
            });
        }
    }
    return entries;
}

/** Get the corresponding JSDocTag node if the position is in a jsDoc comment */
function getJsDocTagAtPosition(node: Node, position: number): JSDocTag | undefined {
    return findAncestor(node, n =>
        isJSDocTag(n) && rangeContainsPosition(n, position) ? true :
            isJSDoc(n) ? "quit" : false) as JSDocTag | undefined;
}

/** @internal */
export function getPropertiesForObjectExpression(contextualType: Type, completionsType: Type | undefined, obj: ObjectLiteralExpression | JsxAttributes, checker: TypeChecker): Symbol[] {
    const hasCompletionsType = completionsType && completionsType !== contextualType;
    const promiseFilteredContextualType = checker.getUnionType(
        filter(
            contextualType.flags & TypeFlags.Union ?
                (contextualType as UnionType).types :
                [contextualType],
            t => !checker.getPromisedTypeOfPromise(t),
        ),
    );
    const type = hasCompletionsType && !(completionsType.flags & TypeFlags.AnyOrUnknown)
        ? checker.getUnionType([promiseFilteredContextualType, completionsType])
        : promiseFilteredContextualType;

    const properties = getApparentProperties(type, obj, checker);
    return type.isClass() && containsNonPublicProperties(properties) ? [] :
        hasCompletionsType ? filter(properties, hasDeclarationOtherThanSelf) : properties;

    // Filter out members whose only declaration is the object literal itself to avoid
    // self-fulfilling completions like:
    //
    // function f<T>(x: T) {}
    // f({ abc/**/: "" }) // `abc` is a member of `T` but only because it declares itself
    function hasDeclarationOtherThanSelf(member: Symbol) {
        if (!length(member.declarations)) return true;
        return some(member.declarations, decl => decl.parent !== obj);
    }
}

function getApparentProperties(type: Type, node: ObjectLiteralExpression | JsxAttributes, checker: TypeChecker) {
    if (!type.isUnion()) return type.getApparentProperties();
    return checker.getAllPossiblePropertiesOfTypes(filter(type.types, memberType =>
        !(memberType.flags & TypeFlags.Primitive
            || checker.isArrayLikeType(memberType)
            || checker.isTypeInvalidDueToUnionDiscriminant(memberType, node)
            || checker.typeHasCallOrConstructSignatures(memberType)
            || memberType.isClass() && containsNonPublicProperties(memberType.getApparentProperties()))));
}

function containsNonPublicProperties(props: Symbol[]) {
    return some(props, p => !!(getDeclarationModifierFlagsFromSymbol(p) & ModifierFlags.NonPublicAccessibilityModifier));
}

/**
 * Gets all properties on a type, but if that type is a union of several types,
 * excludes array-like types or callable/constructable types.
 */
function getPropertiesForCompletion(type: Type, checker: TypeChecker): Symbol[] {
    return type.isUnion()
        ? Debug.checkEachDefined(checker.getAllPossiblePropertiesOfTypes(type.types), "getAllPossiblePropertiesOfTypes() should all be defined")
        : Debug.checkEachDefined(type.getApparentProperties(), "getApparentProperties() should all be defined");
}

/**
 * Returns the immediate owning class declaration of a context token,
 * on the condition that one exists and that the context implies completion should be given.
 */
function tryGetObjectTypeDeclarationCompletionContainer(sourceFile: SourceFile, contextToken: Node | undefined, location: Node, position: number): ObjectTypeDeclaration | undefined {
    // class c { method() { } | method2() { } }
    switch (location.kind) {
        case SyntaxKind.SyntaxList:
            return tryCast(location.parent, isObjectTypeDeclaration);
        case SyntaxKind.EndOfFileToken:
            const cls = tryCast(lastOrUndefined(cast(location.parent, isSourceFile).statements), isObjectTypeDeclaration);
            if (cls && !findChildOfKind(cls, SyntaxKind.CloseBraceToken, sourceFile)) {
                return cls;
            }
            break;
        case SyntaxKind.PrivateIdentifier:
            if (tryCast(location.parent, isPropertyDeclaration)) {
                return findAncestor(location, isClassLike);
            }
            break;
        case SyntaxKind.Identifier: {
            const originalKeywordKind = identifierToKeywordKind(location as Identifier);
            if (originalKeywordKind) {
                return undefined;
            }
            // class c { public prop = c| }
            if (isPropertyDeclaration(location.parent) && location.parent.initializer === location) {
                return undefined;
            }
            // class c extends React.Component { a: () => 1\n compon| }
            if (isFromObjectTypeDeclaration(location)) {
                return findAncestor(location, isObjectTypeDeclaration);
            }
        }
    }

    if (!contextToken) return undefined;

    // class C { blah; constructor/**/ } and so on
    if (
        location.kind === SyntaxKind.ConstructorKeyword
        // class C { blah \n constructor/**/ }
        || (isIdentifier(contextToken) && isPropertyDeclaration(contextToken.parent) && isClassLike(location))
    ) {
        return findAncestor(contextToken, isClassLike) as ObjectTypeDeclaration;
    }

    switch (contextToken.kind) {
        case SyntaxKind.EqualsToken: // class c { public prop = | /* global completions */ }
            return undefined;

        case SyntaxKind.SemicolonToken: // class c {getValue(): number; | }
        case SyntaxKind.CloseBraceToken: // class c { method() { } | }
            // class c { method() { } b| }
            return isFromObjectTypeDeclaration(location) && (location.parent as ClassElement | TypeElement).name === location
                ? location.parent.parent as ObjectTypeDeclaration
                : tryCast(location, isObjectTypeDeclaration);
        case SyntaxKind.OpenBraceToken: // class c { |
        case SyntaxKind.CommaToken: // class c {getValue(): number, | }
            return tryCast(contextToken.parent, isObjectTypeDeclaration);
        default:
            if (isObjectTypeDeclaration(location)) {
                // class C extends React.Component { a: () => 1\n| }
                // class C { prop = ""\n | }
                if (getLineAndCharacterOfPosition(sourceFile, contextToken.getEnd()).line !== getLineAndCharacterOfPosition(sourceFile, position).line) {
                    return location;
                }
                const isValidKeyword = isClassLike(contextToken.parent.parent) ? isClassMemberCompletionKeyword : isInterfaceOrTypeLiteralCompletionKeyword;
                return (isValidKeyword(contextToken.kind) || contextToken.kind === SyntaxKind.AsteriskToken || isIdentifier(contextToken) && isValidKeyword(identifierToKeywordKind(contextToken) ?? SyntaxKind.Unknown))
                    ? contextToken.parent.parent as ObjectTypeDeclaration : undefined;
            }
            return undefined;
    }
}

function tryGetTypeLiteralNode(node: Node): TypeLiteralNode | undefined {
    if (!node) return undefined;

    const parent = node.parent;

    switch (node.kind) {
        case SyntaxKind.OpenBraceToken:
            if (isTypeLiteralNode(parent)) {
                return parent;
            }
            break;
        case SyntaxKind.SemicolonToken:
        case SyntaxKind.CommaToken:
        case SyntaxKind.Identifier:
            if (parent.kind === SyntaxKind.PropertySignature && isTypeLiteralNode(parent.parent)) {
                return parent.parent;
            }
            break;
    }

    return undefined;
}

function getConstraintOfTypeArgumentProperty(node: Node, checker: TypeChecker): Type | undefined {
    if (!node) return undefined;

    if (isTypeNode(node) && isTypeReferenceType(node.parent)) {
        return checker.getTypeArgumentConstraint(node);
    }

    const t = getConstraintOfTypeArgumentProperty(node.parent, checker);
    if (!t) return undefined;

    switch (node.kind) {
        case SyntaxKind.PropertySignature:
            return checker.getTypeOfPropertyOfContextualType(t, (node as PropertySignature).symbol.escapedName);
        case SyntaxKind.IntersectionType:
        case SyntaxKind.TypeLiteral:
        case SyntaxKind.UnionType:
            return t;
    }
}

// TODO: GH#19856 Would like to return `node is Node & { parent: (ClassElement | TypeElement) & { parent: ObjectTypeDeclaration } }` but then compilation takes > 10 minutes
function isFromObjectTypeDeclaration(node: Node): boolean {
    return node.parent && isClassOrTypeElement(node.parent) && isObjectTypeDeclaration(node.parent.parent);
}

function isValidTrigger(sourceFile: SourceFile, triggerCharacter: CompletionsTriggerCharacter, contextToken: Node | undefined, position: number): boolean {
    switch (triggerCharacter) {
        case ".":
        case "@":
            return true;
        case '"':
        case "'":
        case "`":
            // Only automatically bring up completions if this is an opening quote.
            return !!contextToken && isStringLiteralOrTemplate(contextToken) && position === contextToken.getStart(sourceFile) + 1;
        case "#":
            return !!contextToken && isPrivateIdentifier(contextToken) && !!getContainingClass(contextToken);
        case "<":
            // Opening JSX tag
            return !!contextToken && contextToken.kind === SyntaxKind.LessThanToken && (!isBinaryExpression(contextToken.parent) || binaryExpressionMayBeOpenTag(contextToken.parent));
        case "/":
            return !!contextToken && (isStringLiteralLike(contextToken)
                ? !!tryGetImportFromModuleSpecifier(contextToken)
                : contextToken.kind === SyntaxKind.SlashToken && isJsxClosingElement(contextToken.parent));
        case " ":
            return !!contextToken && isImportKeyword(contextToken) && contextToken.parent.kind === SyntaxKind.SourceFile;
        default:
            return Debug.assertNever(triggerCharacter);
    }
}

function binaryExpressionMayBeOpenTag({ left }: BinaryExpression): boolean {
    return nodeIsMissing(left);
}

/** Determines if a type is exactly the same type resolved by the global 'self', 'global', or 'globalThis'. */
function isProbablyGlobalType(type: Type, sourceFile: SourceFile, checker: TypeChecker) {
    // The type of `self` and `window` is the same in lib.dom.d.ts, but `window` does not exist in
    // lib.webworker.d.ts, so checking against `self` is also a check against `window` when it exists.
    const selfSymbol = checker.resolveName("self", /*location*/ undefined, SymbolFlags.Value, /*excludeGlobals*/ false);
    if (selfSymbol && checker.getTypeOfSymbolAtLocation(selfSymbol, sourceFile) === type) {
        return true;
    }
    const globalSymbol = checker.resolveName("global", /*location*/ undefined, SymbolFlags.Value, /*excludeGlobals*/ false);
    if (globalSymbol && checker.getTypeOfSymbolAtLocation(globalSymbol, sourceFile) === type) {
        return true;
    }
    const globalThisSymbol = checker.resolveName("globalThis", /*location*/ undefined, SymbolFlags.Value, /*excludeGlobals*/ false);
    if (globalThisSymbol && checker.getTypeOfSymbolAtLocation(globalThisSymbol, sourceFile) === type) {
        return true;
    }
    return false;
}

function isStaticProperty(symbol: Symbol) {
    return !!(symbol.valueDeclaration && getEffectiveModifierFlags(symbol.valueDeclaration) & ModifierFlags.Static && isClassLike(symbol.valueDeclaration.parent));
}

function tryGetObjectLiteralContextualType(node: ObjectLiteralExpression, typeChecker: TypeChecker) {
    const type = typeChecker.getContextualType(node);
    if (type) {
        return type;
    }
    const parent = walkUpParenthesizedExpressions(node.parent);
    if (isBinaryExpression(parent) && parent.operatorToken.kind === SyntaxKind.EqualsToken && node === parent.left) {
        // Object literal is assignment pattern: ({ | } = x)
        return typeChecker.getTypeAtLocation(parent);
    }
    if (isExpression(parent)) {
        // f(() => (({ | })));
        return typeChecker.getContextualType(parent);
    }
    return undefined;
}

/** @internal */
export interface ImportStatementCompletionInfo {
    isKeywordOnlyCompletion: boolean;
    keywordCompletion: TokenSyntaxKind | undefined;
    isNewIdentifierLocation: boolean;
    isTopLevelTypeOnly: boolean;
    couldBeTypeOnlyImportSpecifier: boolean;
    replacementSpan: TextSpan | undefined;
}

function getImportStatementCompletionInfo(contextToken: Node, sourceFile: SourceFile): ImportStatementCompletionInfo {
    let keywordCompletion: TokenSyntaxKind | undefined;
    let isKeywordOnlyCompletion = false;
    const candidate = getCandidate();
    return {
        isKeywordOnlyCompletion,
        keywordCompletion,
        isNewIdentifierLocation: !!(candidate || keywordCompletion === SyntaxKind.TypeKeyword),
        isTopLevelTypeOnly: !!tryCast(candidate, isImportDeclaration)?.importClause?.isTypeOnly || !!tryCast(candidate, isImportEqualsDeclaration)?.isTypeOnly,
        couldBeTypeOnlyImportSpecifier: !!candidate && couldBeTypeOnlyImportSpecifier(candidate, contextToken),
        replacementSpan: getSingleLineReplacementSpanForImportCompletionNode(candidate),
    };

    function getCandidate() {
        const parent = contextToken.parent;
        if (isImportEqualsDeclaration(parent)) {
            // import Foo |
            // import Foo f|
            const lastToken = parent.getLastToken(sourceFile);
            if (isIdentifier(contextToken) && lastToken !== contextToken) {
                keywordCompletion = SyntaxKind.FromKeyword;
                isKeywordOnlyCompletion = true;
                return undefined;
            }

            keywordCompletion = contextToken.kind === SyntaxKind.TypeKeyword ? undefined : SyntaxKind.TypeKeyword;
            return isModuleSpecifierMissingOrEmpty(parent.moduleReference) ? parent : undefined;
        }
        if (couldBeTypeOnlyImportSpecifier(parent, contextToken) && canCompleteFromNamedBindings(parent.parent)) {
            return parent;
        }
        if (isNamedImports(parent) || isNamespaceImport(parent)) {
            if (
                !parent.parent.isTypeOnly && (
                    contextToken.kind === SyntaxKind.OpenBraceToken ||
                    contextToken.kind === SyntaxKind.ImportKeyword ||
                    contextToken.kind === SyntaxKind.CommaToken
                )
            ) {
                keywordCompletion = SyntaxKind.TypeKeyword;
            }

            if (canCompleteFromNamedBindings(parent)) {
                // At `import { ... } |` or `import * as Foo |`, the only possible completion is `from`
                if (contextToken.kind === SyntaxKind.CloseBraceToken || contextToken.kind === SyntaxKind.Identifier) {
                    isKeywordOnlyCompletion = true;
                    keywordCompletion = SyntaxKind.FromKeyword;
                }
                else {
                    return parent.parent.parent;
                }
            }
            return undefined;
        }
        if (isExportDeclaration(parent) && contextToken.kind === SyntaxKind.AsteriskToken || isNamedExports(parent) && contextToken.kind === SyntaxKind.CloseBraceToken) {
            isKeywordOnlyCompletion = true;
            keywordCompletion = SyntaxKind.FromKeyword;
            return undefined;
        }
        if (isImportKeyword(contextToken) && isSourceFile(parent)) {
            // A lone import keyword with nothing following it does not parse as a statement at all
            keywordCompletion = SyntaxKind.TypeKeyword;
            return contextToken as Token<SyntaxKind.ImportKeyword>;
        }
        if (isImportKeyword(contextToken) && isImportDeclaration(parent)) {
            // `import s| from`
            keywordCompletion = SyntaxKind.TypeKeyword;
            return isModuleSpecifierMissingOrEmpty(parent.moduleSpecifier) ? parent : undefined;
        }
        return undefined;
    }
}

function getSingleLineReplacementSpanForImportCompletionNode(node: ImportDeclaration | ImportEqualsDeclaration | ImportSpecifier | JSDocImportTag | Token<SyntaxKind.ImportKeyword> | undefined) {
    if (!node) return undefined;
    const top = findAncestor(node, or(isImportDeclaration, isImportEqualsDeclaration, isJSDocImportTag)) ?? node;
    const sourceFile = top.getSourceFile();
    if (rangeIsOnSingleLine(top, sourceFile)) {
        return createTextSpanFromNode(top, sourceFile);
    }
    // ImportKeyword was necessarily on one line; ImportSpecifier was necessarily parented in an ImportDeclaration
    Debug.assert(top.kind !== SyntaxKind.ImportKeyword && top.kind !== SyntaxKind.ImportSpecifier);
    // Guess which point in the import might actually be a later statement parsed as part of the import
    // during parser recovery - either in the middle of named imports, or the module specifier.
    const potentialSplitPoint = top.kind === SyntaxKind.ImportDeclaration || top.kind === SyntaxKind.JSDocImportTag
        ? getPotentiallyInvalidImportSpecifier(top.importClause?.namedBindings) ?? top.moduleSpecifier
        : top.moduleReference;
    const withoutModuleSpecifier: TextRange = {
        pos: top.getFirstToken()!.getStart(),
        end: potentialSplitPoint.pos,
    };
    // The module specifier/reference was previously found to be missing, empty, or
    // not a string literal - in this last case, it's likely that statement on a following
    // line was parsed as the module specifier of a partially-typed import, e.g.
    //   import Foo|
    //   interface Blah {}
    // This appears to be a multiline-import, and editors can't replace multiple lines.
    // But if everything but the "module specifier" is on one line, by this point we can
    // assume that the "module specifier" is actually just another statement, and return
    // the single-line range of the import excluding that probable statement.
    if (rangeIsOnSingleLine(withoutModuleSpecifier, sourceFile)) {
        return createTextSpanFromRange(withoutModuleSpecifier);
    }
}

// Tries to identify the first named import that is not really a named import, but rather
// just parser recovery for a situation like:
//   import { Foo|
//   interface Bar {}
// in which `Foo`, `interface`, and `Bar` are all parsed as import specifiers. The caller
// will also check if this token is on a separate line from the rest of the import.
function getPotentiallyInvalidImportSpecifier(namedBindings: NamedImportBindings | undefined) {
    return find(
        tryCast(namedBindings, isNamedImports)?.elements,
        e => !e.propertyName &&
            isStringANonContextualKeyword(e.name.text) &&
            findPrecedingToken(e.name.pos, namedBindings!.getSourceFile(), namedBindings)?.kind !== SyntaxKind.CommaToken,
    );
}

function couldBeTypeOnlyImportSpecifier(importSpecifier: Node, contextToken: Node | undefined): importSpecifier is ImportSpecifier {
    return isImportSpecifier(importSpecifier)
        && (importSpecifier.isTypeOnly || contextToken === importSpecifier.name && isTypeKeywordTokenOrIdentifier(contextToken));
}

function canCompleteFromNamedBindings(namedBindings: NamedImportBindings) {
    if (!isModuleSpecifierMissingOrEmpty(namedBindings.parent.parent.moduleSpecifier) || namedBindings.parent.name) {
        return false;
    }
    if (isNamedImports(namedBindings)) {
        // We can only complete on named imports if there are no other named imports already,
        // but parser recovery sometimes puts later statements in the named imports list, so
        // we try to only consider the probably-valid ones.
        const invalidNamedImport = getPotentiallyInvalidImportSpecifier(namedBindings);
        const validImports = invalidNamedImport ? namedBindings.elements.indexOf(invalidNamedImport) : namedBindings.elements.length;
        return validImports < 2;
    }
    return true;
}

function isModuleSpecifierMissingOrEmpty(specifier: ModuleReference | Expression) {
    if (nodeIsMissing(specifier)) return true;
    return !tryCast(isExternalModuleReference(specifier) ? specifier.expression : specifier, isStringLiteralLike)?.text;
}

function getClosestSymbolDeclaration(contextToken: Node | undefined, location: Node) {
    if (!contextToken) return;

    let closestDeclaration = findAncestor(contextToken, node =>
        isFunctionBlock(node) || isArrowFunctionBody(node) || isBindingPattern(node)
            ? "quit"
            : ((isParameter(node) || isTypeParameterDeclaration(node)) && !isIndexSignatureDeclaration(node.parent)));

    if (!closestDeclaration) {
        closestDeclaration = findAncestor(location, node =>
            isFunctionBlock(node) || isArrowFunctionBody(node) || isBindingPattern(node)
                ? "quit"
                : isVariableDeclaration(node));
    }
    return closestDeclaration as ParameterDeclaration | TypeParameterDeclaration | VariableDeclaration | undefined;
}

function isInTypeParameterDefault(contextToken: Node | undefined) {
    if (!contextToken) {
        return false;
    }

    let node = contextToken;
    let parent = contextToken.parent;
    while (parent) {
        if (isTypeParameterDeclaration(parent)) {
            return parent.default === node || node.kind === SyntaxKind.EqualsToken;
        }
        node = parent;
        parent = parent.parent;
    }

    return false;
}

function isArrowFunctionBody(node: Node) {
    return node.parent && isArrowFunction(node.parent) &&
        (node.parent.body === node ||
            // const a = () => /**/;
            node.kind === SyntaxKind.EqualsGreaterThanToken);
}

/** True if symbol is a type or a module containing at least one type. */
function symbolCanBeReferencedAtTypeLocation(symbol: Symbol, checker: TypeChecker, seenModules = new Set<Symbol>()): boolean {
    // Since an alias can be merged with a local declaration, we need to test both the alias and its target.
    // This code used to just test the result of `skipAlias`, but that would ignore any locally introduced meanings.
    return nonAliasCanBeReferencedAtTypeLocation(symbol) || nonAliasCanBeReferencedAtTypeLocation(skipAlias(symbol.exportSymbol || symbol, checker));

    function nonAliasCanBeReferencedAtTypeLocation(symbol: Symbol): boolean {
        return !!(symbol.flags & SymbolFlags.Type) || checker.isUnknownSymbol(symbol) ||
            !!(symbol.flags & SymbolFlags.Module) && addToSeen(seenModules, symbol) &&
                checker.getExportsOfModule(symbol).some(e => symbolCanBeReferencedAtTypeLocation(e, checker, seenModules));
    }
}

function isDeprecated(symbol: Symbol, checker: TypeChecker) {
    const declarations = skipAlias(symbol, checker).declarations;
    return !!length(declarations) && every(declarations, isDeprecatedDeclaration);
}

/**
 * True if the first character of `lowercaseCharacters` is the first character
 * of some "word" in `identiferString` (where the string is split into "words"
 * by camelCase and snake_case segments), then if the remaining characters of
 * `lowercaseCharacters` appear, in order, in the rest of `identifierString`.
 *
 * True:
 * 'state' in 'useState'
 * 'sae' in 'useState'
 * 'viable' in 'ENVIRONMENT_VARIABLE'
 *
 * False:
 * 'staet' in 'useState'
 * 'tate' in 'useState'
 * 'ment' in 'ENVIRONMENT_VARIABLE'
 */
function charactersFuzzyMatchInString(identifierString: string, lowercaseCharacters: string): boolean {
    if (lowercaseCharacters.length === 0) {
        return true;
    }

    let matchedFirstCharacter = false;
    let prevChar: number | undefined;
    let characterIndex = 0;
    const len = identifierString.length;
    for (let strIndex = 0; strIndex < len; strIndex++) {
        const strChar = identifierString.charCodeAt(strIndex);
        const testChar = lowercaseCharacters.charCodeAt(characterIndex);
        if (strChar === testChar || strChar === toUpperCharCode(testChar)) {
            matchedFirstCharacter ||= prevChar === undefined || // Beginning of word
                CharacterCodes.a <= prevChar && prevChar <= CharacterCodes.z && CharacterCodes.A <= strChar && strChar <= CharacterCodes.Z || // camelCase transition
                prevChar === CharacterCodes._ && strChar !== CharacterCodes._; // snake_case transition
            if (matchedFirstCharacter) {
                characterIndex++;
            }
            if (characterIndex === lowercaseCharacters.length) {
                return true;
            }
        }
        prevChar = strChar;
    }

    // Did not find all characters
    return false;
}

function toUpperCharCode(charCode: number) {
    if (CharacterCodes.a <= charCode && charCode <= CharacterCodes.z) {
        return charCode - 32;
    }
    return charCode;
}

/**
 * These are all the contextual keywords that would be valid to auto-import
 * in expression space and also a valid keyword in the same location, depending
 * on what gets typed afterwards. In these cases, we want to offer both the
 * auto-import and the keyword completion. For example,
 *
 * ```ts
 * type
 * ```
 *
 * may be the beginning of a type alias declaration (keyword completion), or
 * it may be the beginning of
 *
 * ```ts
 * import { type } from "os";
 * type() === "Darwin" ? doSomething() : doSomethingElse();
 * ```
 */
function isContextualKeywordInAutoImportableExpressionSpace(keyword: string) {
    return keyword === "abstract" ||
        keyword === "async" ||
        keyword === "await" ||
        keyword === "declare" ||
        keyword === "module" ||
        keyword === "namespace" ||
        keyword === "type" ||
        keyword === "satisfies" ||
        keyword === "as";
}
