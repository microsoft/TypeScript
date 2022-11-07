import * as ts from "./_namespaces/ts";

// Exported only for tests
/** @internal */
export const moduleSpecifierResolutionLimit = 100;
/** @internal */
export const moduleSpecifierResolutionCacheAttemptLimit = 1000;

/** @internal */
export type Log = (message: string) => void;

/** @internal */
export type SortText = string & { __sortText: any };
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

/** @internal */
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
}

const enum SymbolOriginInfoKind {
    ThisType            = 1 << 0,
    SymbolMember        = 1 << 1,
    Export              = 1 << 2,
    Promise             = 1 << 3,
    Nullable            = 1 << 4,
    ResolvedExport      = 1 << 5,
    TypeOnlyAlias       = 1 << 6,
    ObjectLiteralMethod = 1 << 7,

    SymbolMemberNoExport = SymbolMember,
    SymbolMemberExport   = SymbolMember | Export,
}

interface SymbolOriginInfo {
    kind: SymbolOriginInfoKind;
    isDefaultExport?: boolean;
    isFromPackageJson?: boolean;
    fileName?: string;
}

interface SymbolOriginInfoExport extends SymbolOriginInfo {
    symbolName: string;
    moduleSymbol: ts.Symbol;
    isDefaultExport: boolean;
    exportName: string;
    exportMapKey: string;
}

interface SymbolOriginInfoResolvedExport extends SymbolOriginInfo {
    symbolName: string;
    moduleSymbol: ts.Symbol;
    exportName: string;
    moduleSpecifier: string;
}

interface SymbolOriginInfoTypeOnlyAlias extends SymbolOriginInfo {
    declaration: ts.TypeOnlyAliasDeclaration;
}

interface SymbolOriginInfoObjectLiteralMethod extends SymbolOriginInfo {
    insertText: string,
    labelDetails: ts.CompletionEntryLabelDetails,
    isSnippet?: true,
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

function originIncludesSymbolName(origin: SymbolOriginInfo | undefined): origin is SymbolOriginInfoExport | SymbolOriginInfoResolvedExport {
    return originIsExport(origin) || originIsResolvedExport(origin);
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

function originIsTypeOnlyAlias(origin: SymbolOriginInfo | undefined): origin is SymbolOriginInfoTypeOnlyAlias {
    return !!(origin && origin.kind & SymbolOriginInfoKind.TypeOnlyAlias);
}

function originIsObjectLiteralMethod(origin: SymbolOriginInfo | undefined): origin is SymbolOriginInfoObjectLiteralMethod {
    return !!(origin && origin.kind & SymbolOriginInfoKind.ObjectLiteralMethod);
}

interface UniqueNameSet {
    add(name: string): void;
    has(name: string): boolean;
}

/**
 * Map from symbol index in `symbols` -> SymbolOriginInfo.
 */
type SymbolOriginInfoMap = Record<number, SymbolOriginInfo>;

/** Map from symbol id -> SortText. */
type SymbolSortTextMap = (SortText | undefined)[];

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
    Last = TypeKeyword
}

const enum GlobalsSearch { Continue, Success, Fail }

interface ModuleSpecifierResolutioContext {
    tryResolve: (exportInfo: readonly ts.SymbolExportInfo[], symbolName: string, isFromAmbientModule: boolean) => ModuleSpecifierResolutionResult;
    resolvedAny: () => boolean;
    skippedAny: () => boolean;
    resolvedBeyondLimit: () => boolean;
}

type ModuleSpecifierResolutionResult = "skipped" | "failed" | {
    exportInfo?: ts.SymbolExportInfo;
    moduleSpecifier: string;
};

function resolvingModuleSpecifiers<TReturn>(
    logPrefix: string,
    host: ts.LanguageServiceHost,
    resolver: ts.codefix.ImportSpecifierResolver,
    program: ts.Program,
    position: number,
    preferences: ts.UserPreferences,
    isForImportStatementCompletion: boolean,
    isValidTypeOnlyUseSite: boolean,
    cb: (context: ModuleSpecifierResolutioContext) => TReturn,
): TReturn {
    const start = ts.timestamp();
    // Under `--moduleResolution nodenext`, we have to resolve module specifiers up front, because
    // package.json exports can mean we *can't* resolve a module specifier (that doesn't include a
    // relative path into node_modules), and we want to filter those completions out entirely.
    // Import statement completions always need specifier resolution because the module specifier is
    // part of their `insertText`, not the `codeActions` creating edits away from the cursor.
    const needsFullResolution = isForImportStatementCompletion || ts.moduleResolutionRespectsExports(ts.getEmitModuleResolutionKind(program.getCompilerOptions()));
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
    host.log?.(`${logPrefix}: ${ts.timestamp() - start}`);
    return result;

    function tryResolve(exportInfo: readonly ts.SymbolExportInfo[], symbolName: string, isFromAmbientModule: boolean): ModuleSpecifierResolutionResult {
        if (isFromAmbientModule) {
            const result = resolver.getModuleSpecifierForBestExportInfo(exportInfo, symbolName, position, isValidTypeOnlyUseSite);
            if (result) {
                ambientCount++;
            }
            return result || "failed";
        }
        const shouldResolveModuleSpecifier = needsFullResolution || preferences.allowIncompleteCompletions && resolvedCount < moduleSpecifierResolutionLimit;
        const shouldGetModuleSpecifierFromCache = !shouldResolveModuleSpecifier && preferences.allowIncompleteCompletions && cacheAttemptCount < moduleSpecifierResolutionCacheAttemptLimit;
        const result = (shouldResolveModuleSpecifier || shouldGetModuleSpecifierFromCache)
            ? resolver.getModuleSpecifierForBestExportInfo(exportInfo, symbolName, position, isValidTypeOnlyUseSite, shouldGetModuleSpecifierFromCache)
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
export function getCompletionsAtPosition(
    host: ts.LanguageServiceHost,
    program: ts.Program,
    log: Log,
    sourceFile: ts.SourceFile,
    position: number,
    preferences: ts.UserPreferences,
    triggerCharacter: ts.CompletionsTriggerCharacter | undefined,
    completionKind: ts.CompletionTriggerKind | undefined,
    cancellationToken: ts.CancellationToken,
    formatContext?: ts.formatting.FormatContext,
): ts.CompletionInfo | undefined {
    const { previousToken } = getRelevantTokens(position, sourceFile);
    if (triggerCharacter && !ts.isInString(sourceFile, position, previousToken) && !isValidTrigger(sourceFile, triggerCharacter, previousToken, position)) {
        return undefined;
    }

    if (triggerCharacter === " ") {
        // `isValidTrigger` ensures we are at `import |`
        if (preferences.includeCompletionsForImportStatements && preferences.includeCompletionsWithInsertText) {
            return { isGlobalCompletion: true, isMemberCompletion: false, isNewIdentifierLocation: true, isIncomplete: true, entries: [] };
        }
        return undefined;

    }

    // If the request is a continuation of an earlier `isIncomplete` response,
    // we can continue it from the cached previous response.
    const compilerOptions = program.getCompilerOptions();
    const incompleteCompletionsCache = preferences.allowIncompleteCompletions ? host.getIncompleteCompletionsCache?.() : undefined;
    if (incompleteCompletionsCache && completionKind === ts.CompletionTriggerKind.TriggerForIncompleteCompletions && previousToken && ts.isIdentifier(previousToken)) {
        const incompleteContinuation = continuePreviousIncompleteResponse(incompleteCompletionsCache, sourceFile, previousToken, program, host, preferences, cancellationToken);
        if (incompleteContinuation) {
            return incompleteContinuation;
        }
    }
    else {
        incompleteCompletionsCache?.clear();
    }

    const stringCompletions = ts.Completions.StringCompletions.getStringLiteralCompletions(sourceFile, position, previousToken, compilerOptions, host, program, log, preferences);
    if (stringCompletions) {
        return stringCompletions;
    }

    if (previousToken && ts.isBreakOrContinueStatement(previousToken.parent)
        && (previousToken.kind === ts.SyntaxKind.BreakKeyword || previousToken.kind === ts.SyntaxKind.ContinueKeyword || previousToken.kind === ts.SyntaxKind.Identifier)) {
        return getLabelCompletionAtPosition(previousToken.parent);
    }

    const completionData = getCompletionData(program, log, sourceFile, compilerOptions, position, preferences, /*detailsEntryId*/ undefined, host, formatContext, cancellationToken);
    if (!completionData) {
        return undefined;
    }

    switch (completionData.kind) {
        case CompletionDataKind.Data:
            const response = completionInfoFromData(sourceFile, host, program, compilerOptions, log, completionData, preferences, formatContext, position);
            if (response?.isIncomplete) {
                incompleteCompletionsCache?.set(response);
            }
            return response;
        case CompletionDataKind.JsDocTagName:
            // If the current position is a jsDoc tag name, only tag names should be provided for completion
            return jsdocCompletionInfo(ts.JsDoc.getJSDocTagNameCompletions());
        case CompletionDataKind.JsDocTag:
            // If the current position is a jsDoc tag, only tags should be provided for completion
            return jsdocCompletionInfo(ts.JsDoc.getJSDocTagCompletions());
        case CompletionDataKind.JsDocParameterName:
            return jsdocCompletionInfo(ts.JsDoc.getJSDocParameterNameCompletions(completionData.tag));
        case CompletionDataKind.Keywords:
            return specificKeywordCompletionInfo(completionData.keywordCompletions, completionData.isNewIdentifierLocation);
        default:
            return ts.Debug.assertNever(completionData);
    }
}

// Editors will use the `sortText` and then fall back to `name` for sorting, but leave ties in response order.
// So, it's important that we sort those ties in the order we want them displayed if it matters. We don't
// strictly need to sort by name or SortText here since clients are going to do it anyway, but we have to
// do the work of comparing them so we can sort those ties appropriately; plus, it makes the order returned
// by the language service consistent with what TS Server does and what editors typically do. This also makes
// completions tests make more sense. We used to sort only alphabetically and only in the server layer, but
// this made tests really weird, since most fourslash tests don't use the server.
function compareCompletionEntries(entryInArray: ts.CompletionEntry, entryToInsert: ts.CompletionEntry): ts.Comparison {
    let result = ts.compareStringsCaseSensitiveUI(entryInArray.sortText, entryToInsert.sortText);
    if (result === ts.Comparison.EqualTo) {
        result = ts.compareStringsCaseSensitiveUI(entryInArray.name, entryToInsert.name);
    }
    if (result === ts.Comparison.EqualTo && entryInArray.data?.moduleSpecifier && entryToInsert.data?.moduleSpecifier) {
        // Sort same-named auto-imports by module specifier
        result = ts.compareNumberOfDirectorySeparators(
            (entryInArray.data as ts.CompletionEntryDataResolved).moduleSpecifier,
            (entryToInsert.data as ts.CompletionEntryDataResolved).moduleSpecifier,
        );
    }
    if (result === ts.Comparison.EqualTo) {
        // Fall back to symbol order - if we return `EqualTo`, `insertSorted` will put later symbols first.
        return ts.Comparison.LessThan;
    }
    return result;
}

function completionEntryDataIsResolved(data: ts.CompletionEntryDataAutoImport | undefined): data is ts.CompletionEntryDataResolved {
    return !!data?.moduleSpecifier;
}

function continuePreviousIncompleteResponse(
    cache: ts.IncompleteCompletionsCache,
    file: ts.SourceFile,
    location: ts.Identifier,
    program: ts.Program,
    host: ts.LanguageServiceHost,
    preferences: ts.UserPreferences,
    cancellationToken: ts.CancellationToken,
): ts.CompletionInfo | undefined {
    const previousResponse = cache.get();
    if (!previousResponse) return undefined;

    const lowerCaseTokenText = location.text.toLowerCase();
    const exportMap = ts.getExportInfoMap(file, host, program, preferences, cancellationToken);
    const newEntries = resolvingModuleSpecifiers(
        "continuePreviousIncompleteResponse",
        host,
        ts.codefix.createImportSpecifierResolver(file, program, host, preferences),
        program,
        location.getStart(),
        preferences,
        /*isForImportStatementCompletion*/ false,
        ts.isValidTypeOnlyAliasUseSite(location),
        context => {
            const entries = ts.mapDefined(previousResponse.entries, entry => {
                if (!entry.hasAction || !entry.source || !entry.data || completionEntryDataIsResolved(entry.data)) {
                    // Not an auto import or already resolved; keep as is
                    return entry;
                }
                if (!charactersFuzzyMatchInString(entry.name, lowerCaseTokenText)) {
                    // No longer matches typed characters; filter out
                    return undefined;
                }

                const { origin } = ts.Debug.checkDefined(getAutoImportSymbolFromCompletionEntryData(entry.name, entry.data, program, host));
                const info = exportMap.get(file.path, entry.data.exportMapKey);

                const result = info && context.tryResolve(info, entry.name, !ts.isExternalModuleNameRelative(ts.stripQuotes(origin.moduleSymbol.name)));
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
                entry.sourceDisplay = [ts.textPart(newOrigin.moduleSpecifier)];
                return entry;
            });

            if (!context.skippedAny()) {
                previousResponse.isIncomplete = undefined;
            }

            return entries;
        },
    );

    previousResponse.entries = newEntries;
    previousResponse.flags = (previousResponse.flags || 0) | ts.CompletionInfoFlags.IsContinuation;
    return previousResponse;
}

function jsdocCompletionInfo(entries: ts.CompletionEntry[]): ts.CompletionInfo {
    return { isGlobalCompletion: false, isMemberCompletion: false, isNewIdentifierLocation: false, entries };
}

function keywordToCompletionEntry(keyword: ts.TokenSyntaxKind) {
    return {
        name: ts.tokenToString(keyword)!,
        kind: ts.ScriptElementKind.keyword,
        kindModifiers: ts.ScriptElementKindModifier.none,
        sortText: SortText.GlobalsOrKeywords,
    };
}

function specificKeywordCompletionInfo(entries: readonly ts.CompletionEntry[], isNewIdentifierLocation: boolean): ts.CompletionInfo {
    return {
        isGlobalCompletion: false,
        isMemberCompletion: false,
        isNewIdentifierLocation,
        entries: entries.slice(),
    };
}

function keywordCompletionData(keywordFilters: KeywordCompletionFilters, filterOutTsOnlyKeywords: boolean, isNewIdentifierLocation: boolean): Request {
    return {
        kind: CompletionDataKind.Keywords,
        keywordCompletions: getKeywordCompletions(keywordFilters, filterOutTsOnlyKeywords),
        isNewIdentifierLocation,
    };
}

function keywordFiltersFromSyntaxKind(keywordCompletion: ts.TokenSyntaxKind): KeywordCompletionFilters {
    switch (keywordCompletion) {
        case ts.SyntaxKind.TypeKeyword: return KeywordCompletionFilters.TypeKeyword;
        default: ts.Debug.fail("Unknown mapping from SyntaxKind to KeywordCompletionFilters");
    }
}

function getOptionalReplacementSpan(location: ts.Node | undefined) {
    // StringLiteralLike locations are handled separately in stringCompletions.ts
    return location?.kind === ts.SyntaxKind.Identifier ? ts.createTextSpanFromNode(location) : undefined;
}

function completionInfoFromData(
    sourceFile: ts.SourceFile,
    host: ts.LanguageServiceHost,
    program: ts.Program,
    compilerOptions: ts.CompilerOptions,
    log: Log,
    completionData: CompletionData,
    preferences: ts.UserPreferences,
    formatContext: ts.formatting.FormatContext | undefined,
    position: number
): ts.CompletionInfo | undefined {
    const {
        symbols,
        contextToken,
        completionKind,
        isInSnippetScope,
        isNewIdentifierLocation,
        location,
        propertyAccessToConvert,
        keywordFilters,
        literals,
        symbolToOriginInfoMap,
        recommendedCompletion,
        isJsxInitializer,
        isTypeOnlyLocation,
        isJsxIdentifierExpected,
        isRightOfOpenTag,
        importStatementCompletion,
        insideJsDocTagTypeExpression,
        symbolToSortTextMap: symbolToSortTextMap,
        hasUnresolvedAutoImports,
    } = completionData;

    // Verify if the file is JSX language variant
    if (ts.getLanguageVariant(sourceFile.scriptKind) === ts.LanguageVariant.JSX) {
        const completionInfo = getJsxClosingTagCompletion(location, sourceFile);
        if (completionInfo) {
            return completionInfo;
        }
    }

    const entries = ts.createSortedArray<ts.CompletionEntry>();
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
        sourceFile,
        host,
        program,
        ts.getEmitScriptTarget(compilerOptions),
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
    );

    if (keywordFilters !== KeywordCompletionFilters.None) {
        for (const keywordEntry of getKeywordCompletions(keywordFilters, !insideJsDocTagTypeExpression && ts.isSourceFileJS(sourceFile))) {
            if (isTypeOnlyLocation && ts.isTypeKeyword(ts.stringToToken(keywordEntry.name)!) || !uniqueNames.has(keywordEntry.name)) {
                uniqueNames.add(keywordEntry.name);
                ts.insertSorted(entries, keywordEntry, compareCompletionEntries, /*allowDuplicates*/ true);
            }
        }
    }

    for (const keywordEntry of getContextualKeywords(contextToken, position)) {
        if (!uniqueNames.has(keywordEntry.name)) {
            uniqueNames.add(keywordEntry.name);
            ts.insertSorted(entries, keywordEntry, compareCompletionEntries, /*allowDuplicates*/ true);
        }
    }

    for (const literal of literals) {
        const literalEntry = createCompletionEntryForLiteral(sourceFile, preferences, literal);
        uniqueNames.add(literalEntry.name);
        ts.insertSorted(entries, literalEntry, compareCompletionEntries, /*allowDuplicates*/ true);
    }

    if (!isChecked) {
        getJSCompletionEntries(sourceFile, location.pos, uniqueNames, ts.getEmitScriptTarget(compilerOptions), entries);
    }

    return {
        flags: completionData.flags,
        isGlobalCompletion: isInSnippetScope,
        isIncomplete: preferences.allowIncompleteCompletions && hasUnresolvedAutoImports ? true : undefined,
        isMemberCompletion: isMemberCompletionKind(completionKind),
        isNewIdentifierLocation,
        optionalReplacementSpan: getOptionalReplacementSpan(location),
        entries,
    };
}

function isCheckedFile(sourceFile: ts.SourceFile, compilerOptions: ts.CompilerOptions): boolean {
    return !ts.isSourceFileJS(sourceFile) || !!ts.isCheckJsEnabledForFile(sourceFile, compilerOptions);
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

function getJsxClosingTagCompletion(location: ts.Node | undefined, sourceFile: ts.SourceFile): ts.CompletionInfo | undefined {
    // We wanna walk up the tree till we find a JSX closing element
    const jsxClosingElement = ts.findAncestor(location, node => {
        switch (node.kind) {
            case ts.SyntaxKind.JsxClosingElement:
                return true;
            case ts.SyntaxKind.SlashToken:
            case ts.SyntaxKind.GreaterThanToken:
            case ts.SyntaxKind.Identifier:
            case ts.SyntaxKind.PropertyAccessExpression:
                return false;
            default:
                return "quit";
        }
    }) as ts.JsxClosingElement | undefined;

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
        const hasClosingAngleBracket = !!ts.findChildOfKind(jsxClosingElement, ts.SyntaxKind.GreaterThanToken, sourceFile);
        const tagName = jsxClosingElement.parent.openingElement.tagName;
        const closingTag = tagName.getText(sourceFile);
        const fullClosingTag = closingTag + (hasClosingAngleBracket ? "" : ">");
        const replacementSpan = ts.createTextSpanFromNode(jsxClosingElement.tagName);

        const entry: ts.CompletionEntry = {
            name: fullClosingTag,
            kind: ts.ScriptElementKind.classElement,
            kindModifiers: undefined,
            sortText: SortText.LocationPriority,
        };
        return { isGlobalCompletion: false, isMemberCompletion: true, isNewIdentifierLocation: false, optionalReplacementSpan: replacementSpan, entries: [entry] };
    }
    return;
}

function getJSCompletionEntries(
    sourceFile: ts.SourceFile,
    position: number,
    uniqueNames: UniqueNameSet,
    target: ts.ScriptTarget,
    entries: ts.SortedArray<ts.CompletionEntry>): void {
    ts.getNameTable(sourceFile).forEach((pos, name) => {
        // Skip identifiers produced only from the current location
        if (pos === position) {
            return;
        }
        const realName = ts.unescapeLeadingUnderscores(name);
        if (!uniqueNames.has(realName) && ts.isIdentifierText(realName, target)) {
            uniqueNames.add(realName);
            ts.insertSorted(entries, {
                name: realName,
                kind: ts.ScriptElementKind.warning,
                kindModifiers: "",
                sortText: SortText.JavascriptIdentifiers,
                isFromUncheckedFile: true
            }, compareCompletionEntries);
        }
    });
}

function completionNameForLiteral(sourceFile: ts.SourceFile, preferences: ts.UserPreferences, literal: string | number | ts.PseudoBigInt): string {
    return typeof literal === "object" ? ts.pseudoBigIntToString(literal) + "n" :
        ts.isString(literal) ? ts.quote(sourceFile, preferences, literal) : JSON.stringify(literal);
}

function createCompletionEntryForLiteral(sourceFile: ts.SourceFile, preferences: ts.UserPreferences, literal: string | number | ts.PseudoBigInt): ts.CompletionEntry {
    return { name: completionNameForLiteral(sourceFile, preferences, literal), kind: ts.ScriptElementKind.string, kindModifiers: ts.ScriptElementKindModifier.none, sortText: SortText.LocationPriority };
}

function createCompletionEntry(
    symbol: ts.Symbol,
    sortText: SortText,
    replacementToken: ts.Node | undefined,
    contextToken: ts.Node | undefined,
    location: ts.Node,
    sourceFile: ts.SourceFile,
    host: ts.LanguageServiceHost,
    program: ts.Program,
    name: string,
    needsConvertPropertyAccess: boolean,
    origin: SymbolOriginInfo | undefined,
    recommendedCompletion: ts.Symbol | undefined,
    propertyAccessToConvert: ts.PropertyAccessExpression | undefined,
    isJsxInitializer: IsJsxInitializer | undefined,
    importStatementCompletion: ImportStatementCompletionInfo | undefined,
    useSemicolons: boolean,
    options: ts.CompilerOptions,
    preferences: ts.UserPreferences,
    completionKind: CompletionKind,
    formatContext: ts.formatting.FormatContext | undefined,
    isJsxIdentifierExpected: boolean | undefined,
    isRightOfOpenTag: boolean | undefined,
): ts.CompletionEntry | undefined {
    let insertText: string | undefined;
    let replacementSpan = ts.getReplacementSpanForContextToken(replacementToken);
    let data: ts.CompletionEntryData | undefined;
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

        const dot = ts.findChildOfKind(propertyAccessToConvert, ts.SyntaxKind.DotToken, sourceFile) ||
            ts.findChildOfKind(propertyAccessToConvert, ts.SyntaxKind.QuestionDotToken, sourceFile);
        if (!dot) {
            return undefined;
        }
        // If the text after the '.' starts with this name, write over it. Else, add new text.
        const end = ts.startsWith(name, propertyAccessToConvert.name.text) ? propertyAccessToConvert.name.end : dot.end;
        replacementSpan = ts.createTextSpanFromBounds(dot.getStart(sourceFile), end);
    }

    if (isJsxInitializer) {
        if (insertText === undefined) insertText = name;
        insertText = `{${insertText}}`;
        if (typeof isJsxInitializer !== "boolean") {
            replacementSpan = ts.createTextSpanFromNode(isJsxInitializer, sourceFile);
        }
    }
    if (origin && originIsPromise(origin) && propertyAccessToConvert) {
        if (insertText === undefined) insertText = name;
        const precedingToken = ts.findPrecedingToken(propertyAccessToConvert.pos, sourceFile);
        let awaitText = "";
        if (precedingToken && ts.positionIsASICandidate(precedingToken.end, precedingToken.parent, sourceFile)) {
            awaitText = ";";
        }

        awaitText += `(await ${propertyAccessToConvert.expression.getText()})`;
        insertText = needsConvertPropertyAccess ? `${awaitText}${insertText}` : `${awaitText}${insertQuestionDot ? "?." : "."}${insertText}`;
        replacementSpan = ts.createTextSpanFromBounds(propertyAccessToConvert.getStart(sourceFile), propertyAccessToConvert.end);
    }

    if (originIsResolvedExport(origin)) {
        sourceDisplay = [ts.textPart(origin.moduleSpecifier)];
        if (importStatementCompletion) {
            ({ insertText, replacementSpan } = getInsertTextAndReplacementSpanForImportCompletion(name, importStatementCompletion, origin, useSemicolons, sourceFile, options, preferences));
            isSnippet = preferences.includeCompletionsWithSnippetText ? true : undefined;
        }
    }

    if (origin?.kind === SymbolOriginInfoKind.TypeOnlyAlias) {
        hasAction = true;
    }

    if (preferences.includeCompletionsWithClassMemberSnippets &&
        preferences.includeCompletionsWithInsertText &&
        completionKind === CompletionKind.MemberLike &&
        isClassLikeMemberCompletion(symbol, location, sourceFile)) {
        let importAdder;
        ({ insertText, isSnippet, importAdder, replacementSpan } = getEntryForMemberCompletion(host, program, options, preferences, name, symbol, location, contextToken, formatContext));
        sortText = SortText.ClassMemberSnippets; // sortText has to be lower priority than the sortText for keywords. See #47852.
        if (importAdder?.hasFixes()) {
            hasAction = true;
            source = CompletionSource.ClassMemberSnippet;
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

    if (isJsxIdentifierExpected && !isRightOfOpenTag && preferences.includeCompletionsWithSnippetText && preferences.jsxAttributeCompletionStyle && preferences.jsxAttributeCompletionStyle !== "none") {
        let useBraces = preferences.jsxAttributeCompletionStyle === "braces";
        const type = typeChecker.getTypeOfSymbolAtLocation(symbol, location);

        // If is boolean like or undefined, don't return a snippet we want just to return the completion.
        if (preferences.jsxAttributeCompletionStyle === "auto"
            && !(type.flags & ts.TypeFlags.BooleanLike)
            && !(type.flags & ts.TypeFlags.Union && ts.find((type as ts.UnionType).types, type => !!(type.flags & ts.TypeFlags.BooleanLike)))
        ) {
            if (type.flags & ts.TypeFlags.StringLike || (type.flags & ts.TypeFlags.Union && ts.every((type as ts.UnionType).types, type => !!(type.flags & (ts.TypeFlags.StringLike | ts.TypeFlags.Undefined))))) {
                // If is string like or undefined use quotes
                insertText = `${ts.escapeSnippetText(name)}=${ts.quote(sourceFile, preferences, "$1")}`;
                isSnippet = true;
            }
            else {
                // Use braces for everything else
                useBraces = true;
            }
        }

        if (useBraces) {
            insertText = `${ts.escapeSnippetText(name)}={$1}`;
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

    // TODO(drosen): Right now we just permit *all* semantic meanings when calling
    // 'getSymbolKind' which is permissible given that it is backwards compatible; but
    // really we should consider passing the meaning for the node so that we don't report
    // that a suggestion for a value is an interface.  We COULD also just do what
    // 'getSymbolModifiers' does, which is to use the first declaration.

    // Use a 'sortText' of 0' so that all symbol completion entries come before any other
    // entries (like JavaScript identifier entries).
    return {
        name,
        kind: ts.SymbolDisplay.getSymbolKind(typeChecker, symbol, location),
        kindModifiers: ts.SymbolDisplay.getSymbolModifiers(typeChecker, symbol),
        sortText,
        source,
        hasAction: hasAction ? true : undefined,
        isRecommended: isRecommendedCompletionMatch(symbol, recommendedCompletion, typeChecker) || undefined,
        insertText,
        replacementSpan,
        sourceDisplay,
        labelDetails,
        isSnippet,
        isPackageJsonImport: originIsPackageJsonImport(origin) || undefined,
        isImportStatementCompletion: !!importStatementCompletion || undefined,
        data,
    };
}

function isClassLikeMemberCompletion(symbol: ts.Symbol, location: ts.Node, sourceFile: ts.SourceFile): boolean {
    // TODO: support JS files.
    if (ts.isInJSFile(location)) {
        return false;
    }

    // Completion symbol must be for a class member.
    const memberFlags =
        ts.SymbolFlags.ClassMember
        & ts.SymbolFlags.EnumMemberExcludes;
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
            ts.isClassLike(location) ||
            (
                location.parent &&
                location.parent.parent &&
                ts.isClassElement(location.parent) &&
                location === location.parent.name &&
                location.parent.getLastToken(sourceFile) === location.parent.name &&
                ts.isClassLike(location.parent.parent)
            ) ||
            (
                location.parent &&
                ts.isSyntaxList(location) &&
                ts.isClassLike(location.parent)
            )
        );
}

function getEntryForMemberCompletion(
    host: ts.LanguageServiceHost,
    program: ts.Program,
    options: ts.CompilerOptions,
    preferences: ts.UserPreferences,
    name: string,
    symbol: ts.Symbol,
    location: ts.Node,
    contextToken: ts.Node | undefined,
    formatContext: ts.formatting.FormatContext | undefined,
): { insertText: string, isSnippet?: true, importAdder?: ts.codefix.ImportAdder, replacementSpan?: ts.TextSpan } {
    const classLikeDeclaration = ts.findAncestor(location, ts.isClassLike);
    if (!classLikeDeclaration) {
        return { insertText: name };
    }

    let isSnippet: true | undefined;
    let replacementSpan: ts.TextSpan | undefined;
    let insertText: string = name;

    const checker = program.getTypeChecker();
    const sourceFile = location.getSourceFile();
    const printer = createSnippetPrinter({
        removeComments: true,
        module: options.module,
        target: options.target,
        omitTrailingSemicolon: false,
        newLine: ts.getNewLineKind(ts.getNewLineCharacter(options, ts.maybeBind(host, host.getNewLine))),
    });
    const importAdder = ts.codefix.createImportAdder(sourceFile, program, preferences, host);

    // Create empty body for possible method implementation.
    let body;
    if (preferences.includeCompletionsWithSnippetText) {
        isSnippet = true;
        // We are adding a tabstop (i.e. `$0`) in the body of the suggested member,
        // if it has one, so that the cursor ends up in the body once the completion is inserted.
        // Note: this assumes we won't have more than one body in the completion nodes, which should be the case.
        const emptyStmt = ts.factory.createEmptyStatement();
        body = ts.factory.createBlock([emptyStmt], /* multiline */ true);
        ts.setSnippetElement(emptyStmt, { kind: ts.SnippetKind.TabStop, order: 0 });
    }
    else {
        body = ts.factory.createBlock([], /* multiline */ true);
    }

    let modifiers = ts.ModifierFlags.None;
    // Whether the suggested member should be abstract.
    // e.g. in `abstract class C { abstract | }`, we should offer abstract method signatures at position `|`.
    const { modifiers: presentModifiers, span: modifiersSpan } = getPresentModifiers(contextToken);
    const isAbstract = !!(presentModifiers & ts.ModifierFlags.Abstract);
    const completionNodes: ts.Node[] = [];
    ts.codefix.addNewNodeForMemberSymbol(
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
            let requiredModifiers = ts.ModifierFlags.None;
            if (isAbstract) {
                requiredModifiers |= ts.ModifierFlags.Abstract;
            }
            if (ts.isClassElement(node)
                && checker.getMemberOverrideModifierStatus(classLikeDeclaration, node) === ts.MemberOverrideStatus.NeedsOverride) {
                requiredModifiers |= ts.ModifierFlags.Override;
            }

            if (!completionNodes.length) {
                // Keep track of added missing required modifiers and modifiers already present.
                // This is needed when we have overloaded signatures,
                // so this callback will be called for multiple nodes/signatures,
                // and we need to make sure the modifiers are uniform for all nodes/signatures.
                modifiers = node.modifierFlagsCache | requiredModifiers | presentModifiers;
            }
            node = ts.factory.updateModifiers(node, modifiers);
            completionNodes.push(node);
        },
        body,
        ts.codefix.PreserveOptionalFlags.Property,
        isAbstract);

    if (completionNodes.length) {
        const format = ts.ListFormat.MultiLine | ts.ListFormat.NoTrailingNewLine;
        replacementSpan = modifiersSpan;
         // If we have access to formatting settings, we print the nodes using the emitter,
         // and then format the printed text.
        if (formatContext) {
            insertText = printer.printAndFormatSnippetList(
                format,
                ts.factory.createNodeArray(completionNodes),
                sourceFile,
                formatContext);
        }
        else { // Otherwise, just use emitter to print the new nodes.
            insertText = printer.printSnippetList(
                format,
                ts.factory.createNodeArray(completionNodes),
                sourceFile);
        }
    }

    return { insertText, isSnippet, importAdder, replacementSpan };
}

function getPresentModifiers(contextToken: ts.Node | undefined): { modifiers: ts.ModifierFlags, span?: ts.TextSpan } {
    if (!contextToken) {
        return { modifiers: ts.ModifierFlags.None };
    }
    let modifiers = ts.ModifierFlags.None;
    let span;
    let contextMod;
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
    `location` is identifier ``m``,
    `location.parent` is property declaration ``protected override m``,
    `location.parent.parent` is class declaration ``class C { ... }``.
    */
    if (contextMod = isModifierLike(contextToken)) {
        modifiers |= ts.modifierToFlag(contextMod);
        span = ts.createTextSpanFromNode(contextToken);
    }
    if (ts.isPropertyDeclaration(contextToken.parent)) {
        modifiers |= ts.modifiersToFlags(contextToken.parent.modifiers) & ts.ModifierFlags.Modifier;
        span = ts.createTextSpanFromNode(contextToken.parent);
    }
    return { modifiers, span };
}

function isModifierLike(node: ts.Node): ts.ModifierSyntaxKind | undefined {
    if (ts.isModifier(node)) {
        return node.kind;
    }
    if (ts.isIdentifier(node) && node.originalKeywordKind && ts.isModifierKind(node.originalKeywordKind)) {
        return node.originalKeywordKind;
    }
    return undefined;
}

function getEntryForObjectLiteralMethodCompletion(
    symbol: ts.Symbol,
    name: string,
    enclosingDeclaration: ts.ObjectLiteralExpression,
    program: ts.Program,
    host: ts.LanguageServiceHost,
    options: ts.CompilerOptions,
    preferences: ts.UserPreferences,
    formatContext: ts.formatting.FormatContext | undefined,
): { insertText: string, isSnippet?: true, labelDetails: ts.CompletionEntryLabelDetails } | undefined {
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
        target: options.target,
        omitTrailingSemicolon: false,
        newLine: ts.getNewLineKind(ts.getNewLineCharacter(options, ts.maybeBind(host, host.getNewLine))),
    });
    if (formatContext) {
        insertText = printer.printAndFormatSnippetList(ts.ListFormat.CommaDelimited | ts.ListFormat.AllowTrailingComma, ts.factory.createNodeArray([method], /*hasTrailingComma*/ true), sourceFile, formatContext);
    }
    else {
        insertText = printer.printSnippetList(ts.ListFormat.CommaDelimited | ts.ListFormat.AllowTrailingComma, ts.factory.createNodeArray([method], /*hasTrailingComma*/ true), sourceFile);
    }

    const signaturePrinter = ts.createPrinter({
        removeComments: true,
        module: options.module,
        target: options.target,
        omitTrailingSemicolon: true,
    });
    // The `labelDetails.detail` will be displayed right beside the method name,
    // so we drop the name (and modifiers) from the signature.
    const methodSignature = ts.factory.createMethodSignature(
        /*modifiers*/ undefined,
        /*name*/ "",
        method.questionToken,
        method.typeParameters,
        method.parameters,
        method.type);
    const labelDetails = { detail: signaturePrinter.printNode(ts.EmitHint.Unspecified, methodSignature, sourceFile) };

    return { isSnippet, insertText, labelDetails };

}

function createObjectLiteralMethod(
    symbol: ts.Symbol,
    enclosingDeclaration: ts.ObjectLiteralExpression,
    sourceFile: ts.SourceFile,
    program: ts.Program,
    host: ts.LanguageServiceHost,
    preferences: ts.UserPreferences,
): ts.MethodDeclaration | undefined {
    const declarations = symbol.getDeclarations();
    if (!(declarations && declarations.length)) {
        return undefined;
    }
    const checker = program.getTypeChecker();
    const declaration = declarations[0];
    const name = ts.getSynthesizedDeepClone(ts.getNameOfDeclaration(declaration), /*includeTrivia*/ false) as ts.PropertyName;
    const type = checker.getWidenedType(checker.getTypeOfSymbolAtLocation(symbol, enclosingDeclaration));
    const quotePreference = ts.getQuotePreference(sourceFile, preferences);
    const builderFlags = ts.NodeBuilderFlags.OmitThisParameter | (quotePreference === ts.QuotePreference.Single ? ts.NodeBuilderFlags.UseSingleQuotesForStringLiteralType : ts.NodeBuilderFlags.None);

    switch (declaration.kind) {
        case ts.SyntaxKind.PropertySignature:
        case ts.SyntaxKind.PropertyDeclaration:
        case ts.SyntaxKind.MethodSignature:
        case ts.SyntaxKind.MethodDeclaration: {
            let effectiveType = type.flags & ts.TypeFlags.Union && (type as ts.UnionType).types.length < 10
                ? checker.getUnionType((type as ts.UnionType).types, ts.UnionReduction.Subtype)
                : type;
            if (effectiveType.flags & ts.TypeFlags.Union) {
                // Only offer the completion if there's a single function type component.
                const functionTypes = ts.filter((effectiveType as ts.UnionType).types, type => checker.getSignaturesOfType(type, ts.SignatureKind.Call).length > 0);
                if (functionTypes.length === 1) {
                    effectiveType = functionTypes[0];
                }
                else {
                    return undefined;
                }
            }
            const signatures = checker.getSignaturesOfType(effectiveType, ts.SignatureKind.Call);
            if (signatures.length !== 1) {
                // We don't support overloads in object literals.
                return undefined;
            }
            const typeNode = checker.typeToTypeNode(effectiveType, enclosingDeclaration, builderFlags, ts.codefix.getNoopSymbolTrackerWithResolver({ program, host }));
            if (!typeNode || !ts.isFunctionTypeNode(typeNode)) {
                return undefined;
            }

            let body;
            if (preferences.includeCompletionsWithSnippetText) {
                const emptyStmt = ts.factory.createEmptyStatement();
                body = ts.factory.createBlock([emptyStmt], /* multiline */ true);
                ts.setSnippetElement(emptyStmt, { kind: ts.SnippetKind.TabStop, order: 0 });
            }
            else {
                body = ts.factory.createBlock([], /* multiline */ true);
            }

            const parameters = typeNode.parameters.map(typedParam =>
                ts.factory.createParameterDeclaration(
                    /*modifiers*/ undefined,
                    typedParam.dotDotDotToken,
                    typedParam.name,
                    /*questionToken*/ undefined,
                    /*type*/ undefined,
                    typedParam.initializer,
                ));
            return ts.factory.createMethodDeclaration(
                /*modifiers*/ undefined,
                /*asteriskToken*/ undefined,
                name,
                /*questionToken*/ undefined,
                /*typeParameters*/ undefined,
                parameters,
                /*type*/ undefined,
                body);
            }
        default:
            return undefined;
    }
}

function createSnippetPrinter(
    printerOptions: ts.PrinterOptions,
) {
    let escapes: ts.TextChange[] | undefined;
    const baseWriter = ts.textChanges.createWriter(ts.getNewLineCharacter(printerOptions));
    const printer = ts.createPrinter(printerOptions, baseWriter);
    const writer: ts.EmitTextWriter = {
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
    };

    // The formatter/scanner will have issues with snippet-escaped text,
    // so instead of writing the escaped text directly to the writer,
    // generate a set of changes that can be applied to the unescaped text
    // to escape it post-formatting.
    function escapingWrite(s: string, write: () => void) {
        const escaped = ts.escapeSnippetText(s);
        if (escaped !== s) {
            const start = baseWriter.getTextPos();
            write();
            const end = baseWriter.getTextPos();
            escapes = ts.append(escapes ||= [], { newText: escaped, span: { start, length: end - start } });
        }
        else {
            write();
        }
    }

    /* Snippet-escaping version of `printer.printList`. */
    function printSnippetList(
        format: ts.ListFormat,
        list: ts.NodeArray<ts.Node>,
        sourceFile: ts.SourceFile | undefined,
    ): string {
        const unescaped = printUnescapedSnippetList(format, list, sourceFile);
        return escapes ? ts.textChanges.applyChanges(unescaped, escapes) : unescaped;
    }

    function printUnescapedSnippetList(
        format: ts.ListFormat,
        list: ts.NodeArray<ts.Node>,
        sourceFile: ts.SourceFile | undefined,
    ): string {
        escapes = undefined;
        writer.clear();
        printer.writeList(format, list, sourceFile, writer);
        return writer.getText();
    }

    function printAndFormatSnippetList(
        format: ts.ListFormat,
        list: ts.NodeArray<ts.Node>,
        sourceFile: ts.SourceFile,
        formatContext: ts.formatting.FormatContext,
    ): string {
        const syntheticFile = {
            text: printUnescapedSnippetList(
                format,
                list,
                sourceFile),
            getLineAndCharacterOfPosition(pos: number) {
                return ts.getLineAndCharacterOfPosition(this, pos);
            },
        };

        const formatOptions = ts.getFormatCodeSettingsForWriting(formatContext, sourceFile);
        const changes = ts.flatMap(list, node => {
            const nodeWithPos = ts.textChanges.assignPositionsToNode(node);
            return ts.formatting.formatNodeGivenIndentation(
                nodeWithPos,
                syntheticFile,
                sourceFile.languageVariant,
                /* indentation */ 0,
                /* delta */ 0,
                { ...formatContext, options: formatOptions });
        });

        const allChanges = escapes
            ? ts.stableSort(ts.concatenate(changes, escapes), (a, b) => ts.compareTextSpans(a.span, b.span))
            : changes;
        return ts.textChanges.applyChanges(syntheticFile.text, allChanges);
    }
}

function originToCompletionEntryData(origin: SymbolOriginInfoExport | SymbolOriginInfoResolvedExport): ts.CompletionEntryData | undefined {
    const ambientModuleName = origin.fileName ? undefined : ts.stripQuotes(origin.moduleSymbol.name);
    const isPackageJsonImport = origin.isFromPackageJson ? true : undefined;
    if (originIsResolvedExport(origin)) {
        const resolvedData: ts.CompletionEntryDataResolved = {
            exportName: origin.exportName,
            moduleSpecifier: origin.moduleSpecifier,
            ambientModuleName,
            fileName: origin.fileName,
            isPackageJsonImport,
        };
        return resolvedData;
    }
    const unresolvedData: ts.CompletionEntryDataUnresolved = {
        exportName: origin.exportName,
        exportMapKey: origin.exportMapKey,
        fileName: origin.fileName,
        ambientModuleName: origin.fileName ? undefined : ts.stripQuotes(origin.moduleSymbol.name),
        isPackageJsonImport: origin.isFromPackageJson ? true : undefined,
    };
    return unresolvedData;
}

function completionEntryDataToSymbolOriginInfo(data: ts.CompletionEntryData, completionName: string, moduleSymbol: ts.Symbol): SymbolOriginInfoExport | SymbolOriginInfoResolvedExport {
    const isDefaultExport = data.exportName === ts.InternalSymbolName.Default;
    const isFromPackageJson = !!data.isPackageJsonImport;
    if (completionEntryDataIsResolved(data)) {
        const resolvedOrigin: SymbolOriginInfoResolvedExport = {
            kind: SymbolOriginInfoKind.ResolvedExport,
            exportName: data.exportName,
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

function getInsertTextAndReplacementSpanForImportCompletion(name: string, importStatementCompletion: ImportStatementCompletionInfo, origin: SymbolOriginInfoResolvedExport, useSemicolons: boolean, sourceFile: ts.SourceFile, options: ts.CompilerOptions, preferences: ts.UserPreferences) {
    const replacementSpan = importStatementCompletion.replacementSpan;
    const quotedModuleSpecifier = ts.quote(sourceFile, preferences, origin.moduleSpecifier);
    const exportKind =
        origin.isDefaultExport ? ts.ExportKind.Default :
        origin.exportName === ts.InternalSymbolName.ExportEquals ? ts.ExportKind.ExportEquals :
        ts.ExportKind.Named;
    const tabStop = preferences.includeCompletionsWithSnippetText ? "$1" : "";
    const importKind = ts.codefix.getImportKind(sourceFile, exportKind, options, /*forceImportKeyword*/ true);
    const isImportSpecifierTypeOnly = importStatementCompletion.couldBeTypeOnlyImportSpecifier;
    const topLevelTypeOnlyText = importStatementCompletion.isTopLevelTypeOnly ? ` ${ts.tokenToString(ts.SyntaxKind.TypeKeyword)} ` : " ";
    const importSpecifierTypeOnlyText = isImportSpecifierTypeOnly ? `${ts.tokenToString(ts.SyntaxKind.TypeKeyword)} ` : "";
    const suffix = useSemicolons ? ";" : "";
    switch (importKind) {
        case ts.ImportKind.CommonJS: return { replacementSpan, insertText: `import${topLevelTypeOnlyText}${ts.escapeSnippetText(name)}${tabStop} = require(${quotedModuleSpecifier})${suffix}` };
        case ts.ImportKind.Default: return { replacementSpan, insertText: `import${topLevelTypeOnlyText}${ts.escapeSnippetText(name)}${tabStop} from ${quotedModuleSpecifier}${suffix}` };
        case ts.ImportKind.Namespace: return { replacementSpan, insertText: `import${topLevelTypeOnlyText}* as ${ts.escapeSnippetText(name)} from ${quotedModuleSpecifier}${suffix}` };
        case ts.ImportKind.Named: return { replacementSpan, insertText: `import${topLevelTypeOnlyText}{ ${importSpecifierTypeOnlyText}${ts.escapeSnippetText(name)}${tabStop} } from ${quotedModuleSpecifier}${suffix}` };
    }
}

function quotePropertyName(sourceFile: ts.SourceFile, preferences: ts.UserPreferences, name: string,): string {
    if (/^\d+$/.test(name)) {
        return name;
    }

    return ts.quote(sourceFile, preferences, name);
}

function isRecommendedCompletionMatch(localSymbol: ts.Symbol, recommendedCompletion: ts.Symbol | undefined, checker: ts.TypeChecker): boolean {
    return localSymbol === recommendedCompletion ||
        !!(localSymbol.flags & ts.SymbolFlags.ExportValue) && checker.getExportSymbolOfSymbol(localSymbol) === recommendedCompletion;
}

function getSourceFromOrigin(origin: SymbolOriginInfo | undefined): string | undefined {
    if (originIsExport(origin)) {
        return ts.stripQuotes(origin.moduleSymbol.name);
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
    symbols: readonly ts.Symbol[],
    entries: ts.SortedArray<ts.CompletionEntry>,
    replacementToken: ts.Node | undefined,
    contextToken: ts.Node | undefined,
    location: ts.Node,
    sourceFile: ts.SourceFile,
    host: ts.LanguageServiceHost,
    program: ts.Program,
    target: ts.ScriptTarget,
    log: Log,
    kind: CompletionKind,
    preferences: ts.UserPreferences,
    compilerOptions: ts.CompilerOptions,
    formatContext: ts.formatting.FormatContext | undefined,
    isTypeOnlyLocation?: boolean,
    propertyAccessToConvert?: ts.PropertyAccessExpression,
    jsxIdentifierExpected?: boolean,
    isJsxInitializer?: IsJsxInitializer,
    importStatementCompletion?: ImportStatementCompletionInfo,
    recommendedCompletion?: ts.Symbol,
    symbolToOriginInfoMap?: SymbolOriginInfoMap,
    symbolToSortTextMap?: SymbolSortTextMap,
    isJsxIdentifierExpected?: boolean,
    isRightOfOpenTag?: boolean,
): UniqueNameSet {
    const start = ts.timestamp();
    const variableDeclaration = getVariableDeclaration(location);
    const useSemicolons = ts.probablyUsesSemicolons(sourceFile);
    const typeChecker = program.getTypeChecker();
    // Tracks unique names.
    // Value is set to false for global variables or completions from external module exports, because we can have multiple of those;
    // true otherwise. Based on the order we add things we will always see locals first, then globals, then module exports.
    // So adding a completion for a local will prevent us from adding completions for external module exports sharing the same name.
    const uniques = new ts.Map<string, boolean>();
    for (let i = 0; i < symbols.length; i++) {
        const symbol = symbols[i];
        const origin = symbolToOriginInfoMap?.[i];
        const info = getCompletionEntryDisplayNameForSymbol(symbol, target, origin, kind, !!jsxIdentifierExpected);
        if (!info || (uniques.get(info.name) && (!origin || !originIsObjectLiteralMethod(origin))) || kind === CompletionKind.Global && symbolToSortTextMap && !shouldIncludeSymbol(symbol, symbolToSortTextMap)) {
            continue;
        }

        const { name, needsConvertPropertyAccess } = info;
        const originalSortText = symbolToSortTextMap?.[ts.getSymbolId(symbol)] ?? SortText.LocationPriority;
        const sortText = (isDeprecated(symbol, typeChecker) ? SortText.Deprecated(originalSortText) : originalSortText);
        const entry = createCompletionEntry(
            symbol,
            sortText,
            replacementToken,
            contextToken,
            location,
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
        );
        if (!entry) {
            continue;
        }

        /** True for locals; false for globals, module exports from other files, `this.` completions. */
        const shouldShadowLaterSymbols = (!origin || originIsTypeOnlyAlias(origin)) && !(symbol.parent === undefined && !ts.some(symbol.declarations, d => d.getSourceFile() === location.getSourceFile()));
        uniques.set(name, shouldShadowLaterSymbols);
        ts.insertSorted(entries, entry, compareCompletionEntries, /*allowDuplicates*/ true);
    }

    log("getCompletionsAtPosition: getCompletionEntriesFromSymbols: " + (ts.timestamp() - start));

    // Prevent consumers of this map from having to worry about
    // the boolean value. Externally, it should be seen as the
    // set of all names.
    return {
        has: name => uniques.has(name),
        add: name => uniques.set(name, true),
    };

    function shouldIncludeSymbol(symbol: ts.Symbol, symbolToSortTextMap: SymbolSortTextMap): boolean {
        let allFlags = symbol.flags;
        if (!ts.isSourceFile(location)) {
            // export = /**/ here we want to get all meanings, so any symbol is ok
            if (ts.isExportAssignment(location.parent)) {
                return true;
            }
            // Filter out variables from their own initializers
            // `const a = /* no 'a' here */`
            if (variableDeclaration && symbol.valueDeclaration === variableDeclaration) {
                return false;
            }

            // External modules can have global export declarations that will be
            // available as global keywords in all scopes. But if the external module
            // already has an explicit export and user only wants to user explicit
            // module imports then the global keywords will be filtered out so auto
            // import suggestions will win in the completion
            const symbolOrigin = ts.skipAlias(symbol, typeChecker);
            // We only want to filter out the global keywords
            // Auto Imports are not available for scripts so this conditional is always false
            if (!!sourceFile.externalModuleIndicator
                && !compilerOptions.allowUmdGlobalAccess
                && symbolToSortTextMap[ts.getSymbolId(symbol)] === SortText.GlobalsOrKeywords
                && (symbolToSortTextMap[ts.getSymbolId(symbolOrigin)] === SortText.AutoImportSuggestions
                    || symbolToSortTextMap[ts.getSymbolId(symbolOrigin)] === SortText.LocationPriority)) {
                return false;
            }

            allFlags |= ts.getCombinedLocalAndExportSymbolFlags(symbolOrigin);

            // import m = /**/ <-- It can only access namespace (if typing import = x. this would get member symbols and not namespace)
            if (ts.isInRightSideOfInternalImportEqualsDeclaration(location)) {
                return !!(allFlags & ts.SymbolFlags.Namespace);
            }

            if (isTypeOnlyLocation) {
                // It's a type, but you can reach it by namespace.type as well
                return symbolCanBeReferencedAtTypeLocation(symbol, typeChecker);
            }
        }

        // expressions are value space (which includes the value namespaces)
        return !!(allFlags & ts.SymbolFlags.Value);
    }
}

function getLabelCompletionAtPosition(node: ts.BreakOrContinueStatement): ts.CompletionInfo | undefined {
    const entries = getLabelStatementCompletions(node);
    if (entries.length) {
        return { isGlobalCompletion: false, isMemberCompletion: false, isNewIdentifierLocation: false, entries };
    }
}

function getLabelStatementCompletions(node: ts.Node): ts.CompletionEntry[] {
    const entries: ts.CompletionEntry[] = [];
    const uniques = new ts.Map<string, true>();
    let current = node;

    while (current) {
        if (ts.isFunctionLike(current)) {
            break;
        }
        if (ts.isLabeledStatement(current)) {
            const name = current.label.text;
            if (!uniques.has(name)) {
                uniques.set(name, true);
                entries.push({
                    name,
                    kindModifiers: ts.ScriptElementKindModifier.none,
                    kind: ts.ScriptElementKind.label,
                    sortText: SortText.LocationPriority
                });
            }
        }
        current = current.parent;
    }
    return entries;
}

interface SymbolCompletion {
    type: "symbol";
    symbol: ts.Symbol;
    location: ts.Node;
    origin: SymbolOriginInfo | SymbolOriginInfoExport | SymbolOriginInfoResolvedExport | undefined;
    previousToken: ts.Node | undefined;
    contextToken: ts.Node | undefined;
    readonly isJsxInitializer: IsJsxInitializer;
    readonly isTypeOnlyLocation: boolean;
}
function getSymbolCompletionFromEntryId(
    program: ts.Program,
    log: Log,
    sourceFile: ts.SourceFile,
    position: number,
    entryId: CompletionEntryIdentifier,
    host: ts.LanguageServiceHost,
    preferences: ts.UserPreferences,
): SymbolCompletion | { type: "request", request: Request } | { type: "literal", literal: string | number | ts.PseudoBigInt } | { type: "none" } {
    if (entryId.data) {
        const autoImport = getAutoImportSymbolFromCompletionEntryData(entryId.name, entryId.data, program, host);
        if (autoImport) {
            const { contextToken, previousToken } = getRelevantTokens(position, sourceFile);
            return {
                type: "symbol",
                symbol: autoImport.symbol,
                location: ts.getTouchingPropertyName(sourceFile, position),
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

    const literal = ts.find(literals, l => completionNameForLiteral(sourceFile, preferences, l) === entryId.name);
    if (literal !== undefined) return { type: "literal", literal };

    // Find the symbol with the matching entry name.
    // We don't need to perform character checks here because we're only comparing the
    // name against 'entryName' (which is known to be good), not building a new
    // completion entry.
    return ts.firstDefined(symbols, (symbol, index): SymbolCompletion | undefined => {
        const origin = symbolToOriginInfoMap[index];
        const info = getCompletionEntryDisplayNameForSymbol(symbol, ts.getEmitScriptTarget(compilerOptions), origin, completionKind, completionData.isJsxIdentifierExpected);
        return info && info.name === entryId.name && (
            entryId.source === CompletionSource.ClassMemberSnippet && symbol.flags & ts.SymbolFlags.ClassMember
            || entryId.source === CompletionSource.ObjectLiteralMethodSnippet && symbol.flags & (ts.SymbolFlags.Property | ts.SymbolFlags.Method)
            || getSourceFromOrigin(origin) === entryId.source)
            ? { type: "symbol" as const, symbol, location, origin, contextToken, previousToken, isJsxInitializer, isTypeOnlyLocation }
            : undefined;
    }) || { type: "none" };
}

/** @internal */
export interface CompletionEntryIdentifier {
    name: string;
    source?: string;
    data?: ts.CompletionEntryData;
}

/** @internal */
export function getCompletionEntryDetails(
    program: ts.Program,
    log: Log,
    sourceFile: ts.SourceFile,
    position: number,
    entryId: CompletionEntryIdentifier,
    host: ts.LanguageServiceHost,
    formatContext: ts.formatting.FormatContext,
    preferences: ts.UserPreferences,
    cancellationToken: ts.CancellationToken,
): ts.CompletionEntryDetails | undefined {
    const typeChecker = program.getTypeChecker();
    const compilerOptions = program.getCompilerOptions();
    const { name, source, data } = entryId;

    const contextToken = ts.findPrecedingToken(position, sourceFile);
    if (ts.isInString(sourceFile, position, contextToken)) {
        return ts.Completions.StringCompletions.getStringLiteralCompletionDetails(name, sourceFile, position, contextToken, typeChecker, compilerOptions, host, cancellationToken, preferences);
    }

    // Compute all the completion symbols again.
    const symbolCompletion = getSymbolCompletionFromEntryId(program, log, sourceFile, position, entryId, host, preferences);
    switch (symbolCompletion.type) {
        case "request": {
            const { request } = symbolCompletion;
            switch (request.kind) {
                case CompletionDataKind.JsDocTagName:
                    return ts.JsDoc.getJSDocTagNameCompletionDetails(name);
                case CompletionDataKind.JsDocTag:
                    return ts.JsDoc.getJSDocTagCompletionDetails(name);
                case CompletionDataKind.JsDocParameterName:
                    return ts.JsDoc.getJSDocParameterNameCompletionDetails(name);
                case CompletionDataKind.Keywords:
                    return ts.some(request.keywordCompletions, c => c.name === name) ? createSimpleDetails(name, ts.ScriptElementKind.keyword, ts.SymbolDisplayPartKind.keyword) : undefined;
                default:
                    return ts.Debug.assertNever(request);
            }
        }
        case "symbol": {
            const { symbol, location, contextToken, origin, previousToken } = symbolCompletion;
            const { codeActions, sourceDisplay } = getCompletionEntryCodeActionsAndSourceDisplay(name, location, contextToken, origin, symbol, program, host, compilerOptions, sourceFile, position, previousToken, formatContext, preferences, data, source, cancellationToken);
            return createCompletionDetailsForSymbol(symbol, typeChecker, sourceFile, location, cancellationToken, codeActions, sourceDisplay); // TODO: GH#18217
        }
        case "literal": {
            const { literal } = symbolCompletion;
            return createSimpleDetails(completionNameForLiteral(sourceFile, preferences, literal), ts.ScriptElementKind.string, typeof literal === "string" ? ts.SymbolDisplayPartKind.stringLiteral : ts.SymbolDisplayPartKind.numericLiteral);
        }
        case "none":
            // Didn't find a symbol with this name.  See if we can find a keyword instead.
            return allKeywordsCompletions().some(c => c.name === name) ? createSimpleDetails(name, ts.ScriptElementKind.keyword, ts.SymbolDisplayPartKind.keyword) : undefined;
        default:
            ts.Debug.assertNever(symbolCompletion);
    }
}

function createSimpleDetails(name: string, kind: ts.ScriptElementKind, kind2: ts.SymbolDisplayPartKind): ts.CompletionEntryDetails {
    return createCompletionDetails(name, ts.ScriptElementKindModifier.none, kind, [ts.displayPart(name, kind2)]);
}

/** @internal */
export function createCompletionDetailsForSymbol(symbol: ts.Symbol, checker: ts.TypeChecker, sourceFile: ts.SourceFile, location: ts.Node, cancellationToken: ts.CancellationToken, codeActions?: ts.CodeAction[], sourceDisplay?: ts.SymbolDisplayPart[]): ts.CompletionEntryDetails {
    const { displayParts, documentation, symbolKind, tags } =
        checker.runWithCancellationToken(cancellationToken, checker =>
            ts.SymbolDisplay.getSymbolDisplayPartsDocumentationAndSymbolKind(checker, symbol, sourceFile, location, location, ts.SemanticMeaning.All)
        );
    return createCompletionDetails(symbol.name, ts.SymbolDisplay.getSymbolModifiers(checker, symbol), symbolKind, displayParts, documentation, tags, codeActions, sourceDisplay);
}

/** @internal */
export function createCompletionDetails(name: string, kindModifiers: string, kind: ts.ScriptElementKind, displayParts: ts.SymbolDisplayPart[], documentation?: ts.SymbolDisplayPart[], tags?: ts.JSDocTagInfo[], codeActions?: ts.CodeAction[], source?: ts.SymbolDisplayPart[]): ts.CompletionEntryDetails {
    return { name, kindModifiers, kind, displayParts, documentation, tags, codeActions, source, sourceDisplay: source };
}

interface CodeActionsAndSourceDisplay {
    readonly codeActions: ts.CodeAction[] | undefined;
    readonly sourceDisplay: ts.SymbolDisplayPart[] | undefined;
}
function getCompletionEntryCodeActionsAndSourceDisplay(
    name: string,
    location: ts.Node,
    contextToken: ts.Node | undefined,
    origin: SymbolOriginInfo | SymbolOriginInfoExport | SymbolOriginInfoResolvedExport | undefined,
    symbol: ts.Symbol,
    program: ts.Program,
    host: ts.LanguageServiceHost,
    compilerOptions: ts.CompilerOptions,
    sourceFile: ts.SourceFile,
    position: number,
    previousToken: ts.Node | undefined,
    formatContext: ts.formatting.FormatContext,
    preferences: ts.UserPreferences,
    data: ts.CompletionEntryData | undefined,
    source: string | undefined,
    cancellationToken: ts.CancellationToken,
): CodeActionsAndSourceDisplay {
    if (data?.moduleSpecifier) {
        if (previousToken && getImportStatementCompletionInfo(contextToken || previousToken).replacementSpan) {
            // Import statement completion: 'import c|'
            return { codeActions: undefined, sourceDisplay: [ts.textPart(data.moduleSpecifier)] };
        }
    }

    if (source === CompletionSource.ClassMemberSnippet) {
        const { importAdder } = getEntryForMemberCompletion(
            host,
            program,
            compilerOptions,
            preferences,
            name,
            symbol,
            location,
            contextToken,
            formatContext);
        if (importAdder) {
            const changes = ts.textChanges.ChangeTracker.with(
                { host, formatContext, preferences },
                importAdder.writeFixes);
            return {
                sourceDisplay: undefined,
                codeActions: [{
                    changes,
                    description: ts.diagnosticToString([ts.Diagnostics.Includes_imports_of_types_referenced_by_0, name]),
                }],
            };
        }
    }

    if (originIsTypeOnlyAlias(origin)) {
        const codeAction = ts.codefix.getPromoteTypeOnlyCompletionAction(
            sourceFile,
            origin.declaration.name,
            program,
            host,
            formatContext,
            preferences);

        ts.Debug.assertIsDefined(codeAction, "Expected to have a code action for promoting type-only alias");
        return { codeActions: [codeAction], sourceDisplay: undefined };
    }

    if (!origin || !(originIsExport(origin) || originIsResolvedExport(origin))) {
        return { codeActions: undefined, sourceDisplay: undefined };
    }

    const checker = origin.isFromPackageJson ? host.getPackageJsonAutoImportProvider!()!.getTypeChecker() : program.getTypeChecker();
    const { moduleSymbol } = origin;
    const targetSymbol = checker.getMergedSymbol(ts.skipAlias(symbol.exportSymbol || symbol, checker));
    const isJsxOpeningTagName = contextToken?.kind === ts.SyntaxKind.LessThanToken && ts.isJsxOpeningLikeElement(contextToken.parent);
    const { moduleSpecifier, codeAction } = ts.codefix.getImportCompletionAction(
        targetSymbol,
        moduleSymbol,
        sourceFile,
        ts.getNameForExportedSymbol(symbol, ts.getEmitScriptTarget(compilerOptions), isJsxOpeningTagName),
        isJsxOpeningTagName,
        host,
        program,
        formatContext,
        previousToken && ts.isIdentifier(previousToken) ? previousToken.getStart(sourceFile) : position,
        preferences,
        cancellationToken);
    ts.Debug.assert(!data?.moduleSpecifier || moduleSpecifier === data.moduleSpecifier);
    return { sourceDisplay: [ts.textPart(moduleSpecifier)], codeActions: [codeAction] };
}

/** @internal */
export function getCompletionEntrySymbol(
    program: ts.Program,
    log: Log,
    sourceFile: ts.SourceFile,
    position: number,
    entryId: CompletionEntryIdentifier,
    host: ts.LanguageServiceHost,
    preferences: ts.UserPreferences,
): ts.Symbol | undefined {
    const completion = getSymbolCompletionFromEntryId(program, log, sourceFile, position, entryId, host, preferences);
    return completion.type === "symbol" ? completion.symbol : undefined;
}

const enum CompletionDataKind { Data, JsDocTagName, JsDocTag, JsDocParameterName, Keywords }
/** true: after the `=` sign but no identifier has been typed yet. Else is the Identifier after the initializer. */
type IsJsxInitializer = boolean | ts.Identifier;
interface CompletionData {
    readonly kind: CompletionDataKind.Data;
    readonly symbols: readonly ts.Symbol[];
    readonly completionKind: CompletionKind;
    readonly isInSnippetScope: boolean;
    /** Note that the presence of this alone doesn't mean that we need a conversion. Only do that if the completion is not an ordinary identifier. */
    readonly propertyAccessToConvert: ts.PropertyAccessExpression | undefined;
    readonly isNewIdentifierLocation: boolean;
    readonly location: ts.Node;
    readonly keywordFilters: KeywordCompletionFilters;
    readonly literals: readonly (string | number | ts.PseudoBigInt)[];
    readonly symbolToOriginInfoMap: SymbolOriginInfoMap;
    readonly recommendedCompletion: ts.Symbol | undefined;
    readonly previousToken: ts.Node | undefined;
    readonly contextToken: ts.Node | undefined;
    readonly isJsxInitializer: IsJsxInitializer;
    readonly insideJsDocTagTypeExpression: boolean;
    readonly symbolToSortTextMap: SymbolSortTextMap;
    readonly isTypeOnlyLocation: boolean;
    /** In JSX tag name and attribute names, identifiers like "my-tag" or "aria-name" is valid identifier. */
    readonly isJsxIdentifierExpected: boolean;
    readonly isRightOfOpenTag: boolean;
    readonly importStatementCompletion?: ImportStatementCompletionInfo;
    readonly hasUnresolvedAutoImports?: boolean;
    readonly flags: ts.CompletionInfoFlags;
}
type Request =
    | { readonly kind: CompletionDataKind.JsDocTagName | CompletionDataKind.JsDocTag }
    | { readonly kind: CompletionDataKind.JsDocParameterName, tag: ts.JSDocParameterTag }
    | { readonly kind: CompletionDataKind.Keywords, keywordCompletions: readonly ts.CompletionEntry[], isNewIdentifierLocation: boolean };

/** @internal */
export const enum CompletionKind {
    ObjectPropertyDeclaration,
    Global,
    PropertyAccess,
    MemberLike,
    String,
    None,
}

function getRecommendedCompletion(previousToken: ts.Node, contextualType: ts.Type, checker: ts.TypeChecker): ts.Symbol | undefined {
    // For a union, return the first one with a recommended completion.
    return ts.firstDefined(contextualType && (contextualType.isUnion() ? contextualType.types : [contextualType]), type => {
        const symbol = type && type.symbol;
        // Don't include make a recommended completion for an abstract class
        return symbol && (symbol.flags & (ts.SymbolFlags.EnumMember | ts.SymbolFlags.Enum | ts.SymbolFlags.Class) && !ts.isAbstractConstructorSymbol(symbol))
            ? getFirstSymbolInChain(symbol, previousToken, checker)
            : undefined;
    });
}

function getContextualType(previousToken: ts.Node, position: number, sourceFile: ts.SourceFile, checker: ts.TypeChecker): ts.Type | undefined {
    const { parent } = previousToken;
    switch (previousToken.kind) {
        case ts.SyntaxKind.Identifier:
            return ts.getContextualTypeFromParent(previousToken as ts.Identifier, checker);
        case ts.SyntaxKind.EqualsToken:
            switch (parent.kind) {
                case ts.SyntaxKind.VariableDeclaration:
                    return checker.getContextualType((parent as ts.VariableDeclaration).initializer!); // TODO: GH#18217
                case ts.SyntaxKind.BinaryExpression:
                    return checker.getTypeAtLocation((parent as ts.BinaryExpression).left);
                case ts.SyntaxKind.JsxAttribute:
                    return checker.getContextualTypeForJsxAttribute(parent as ts.JsxAttribute);
                default:
                    return undefined;
            }
        case ts.SyntaxKind.NewKeyword:
            return checker.getContextualType(parent as ts.Expression);
        case ts.SyntaxKind.CaseKeyword:
            const caseClause = ts.tryCast(parent, ts.isCaseClause);
            return caseClause ? ts.getSwitchedType(caseClause, checker) : undefined;
        case ts.SyntaxKind.OpenBraceToken:
            return ts.isJsxExpression(parent) && !ts.isJsxElement(parent.parent) && !ts.isJsxFragment(parent.parent) ? checker.getContextualTypeForJsxAttribute(parent.parent) : undefined;
        default:
            const argInfo = ts.SignatureHelp.getArgumentInfoForCompletions(previousToken, position, sourceFile);
            return argInfo ?
                // At `,`, treat this as the next argument after the comma.
                checker.getContextualTypeForArgumentAtIndex(argInfo.invocation, argInfo.argumentIndex + (previousToken.kind === ts.SyntaxKind.CommaToken ? 1 : 0)) :
                ts.isEqualityOperatorKind(previousToken.kind) && ts.isBinaryExpression(parent) && ts.isEqualityOperatorKind(parent.operatorToken.kind) ?
                    // completion at `x ===/**/` should be for the right side
                    checker.getTypeAtLocation(parent.left) :
                    checker.getContextualType(previousToken as ts.Expression);
    }
}

function getFirstSymbolInChain(symbol: ts.Symbol, enclosingDeclaration: ts.Node, checker: ts.TypeChecker): ts.Symbol | undefined {
    const chain = checker.getAccessibleSymbolChain(symbol, enclosingDeclaration, /*meaning*/ ts.SymbolFlags.All, /*useOnlyExternalAliasing*/ false);
    if (chain) return ts.first(chain);
    return symbol.parent && (isModuleSymbol(symbol.parent) ? symbol : getFirstSymbolInChain(symbol.parent, enclosingDeclaration, checker));
}

function isModuleSymbol(symbol: ts.Symbol): boolean {
    return !!symbol.declarations?.some(d => d.kind === ts.SyntaxKind.SourceFile);
}

function getCompletionData(
    program: ts.Program,
    log: (message: string) => void,
    sourceFile: ts.SourceFile,
    compilerOptions: ts.CompilerOptions,
    position: number,
    preferences: ts.UserPreferences,
    detailsEntryId: CompletionEntryIdentifier | undefined,
    host: ts.LanguageServiceHost,
    formatContext: ts.formatting.FormatContext | undefined,
    cancellationToken?: ts.CancellationToken,
): CompletionData | Request | undefined {
    const typeChecker = program.getTypeChecker();
    const inCheckedFile = isCheckedFile(sourceFile, compilerOptions);
    let start = ts.timestamp();
    let currentToken = ts.getTokenAtPosition(sourceFile, position); // TODO: GH#15853
    // We will check for jsdoc comments with insideComment and getJsDocTagAtPosition. (TODO: that seems rather inefficient to check the same thing so many times.)

    log("getCompletionData: Get current token: " + (ts.timestamp() - start));

    start = ts.timestamp();
    const insideComment = ts.isInComment(sourceFile, position, currentToken);
    log("getCompletionData: Is inside comment: " + (ts.timestamp() - start));

    let insideJsDocTagTypeExpression = false;
    let isInSnippetScope = false;
    if (insideComment) {
        if (ts.hasDocComment(sourceFile, position)) {
            if (sourceFile.text.charCodeAt(position - 1) === ts.CharacterCodes.at) {
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
                const lineStart = ts.getLineStartPositionForPosition(position, sourceFile);
                if (!/[^\*|\s(/)]/.test(sourceFile.text.substring(lineStart, position))) {
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
            const typeExpression = tryGetTypeExpressionFromTag(tag);
            if (typeExpression) {
                currentToken = ts.getTokenAtPosition(sourceFile, position);
                if (!currentToken ||
                    (!ts.isDeclarationName(currentToken) &&
                        (currentToken.parent.kind !== ts.SyntaxKind.JSDocPropertyTag ||
                            (currentToken.parent as ts.JSDocPropertyTag).name !== currentToken))) {
                    // Use as type location if inside tag's type expression
                    insideJsDocTagTypeExpression = isCurrentlyEditingNode(typeExpression);
                }
            }
            if (!insideJsDocTagTypeExpression && ts.isJSDocParameterTag(tag) && (ts.nodeIsMissing(tag.name) || tag.name.pos <= position && position <= tag.name.end)) {
                return { kind: CompletionDataKind.JsDocParameterName, tag };
            }
        }

        if (!insideJsDocTagTypeExpression) {
            // Proceed if the current position is in jsDoc tag expression; otherwise it is a normal
            // comment or the plain text part of a jsDoc comment, so no completion should be available
            log("Returning an empty list because completion was inside a regular comment or plain text part of a JsDoc comment.");
            return undefined;
        }
    }

    start = ts.timestamp();
    // The decision to provide completion depends on the contextToken, which is determined through the previousToken.
    // Note: 'previousToken' (and thus 'contextToken') can be undefined if we are the beginning of the file
    const isJsOnlyLocation = !insideJsDocTagTypeExpression && ts.isSourceFileJS(sourceFile);
    const tokens = getRelevantTokens(position, sourceFile);
    const previousToken = tokens.previousToken!;
    let contextToken = tokens.contextToken!;
    log("getCompletionData: Get previous token: " + (ts.timestamp() - start));

    // Find the node where completion is requested on.
    // Also determine whether we are trying to complete with members of that node
    // or attributes of a JSX tag.
    let node = currentToken;
    let propertyAccessToConvert: ts.PropertyAccessExpression | undefined;
    let isRightOfDot = false;
    let isRightOfQuestionDot = false;
    let isRightOfOpenTag = false;
    let isStartingCloseTag = false;
    let isJsxInitializer: IsJsxInitializer = false;
    let isJsxIdentifierExpected = false;
    let importStatementCompletion: ImportStatementCompletionInfo | undefined;
    let location = ts.getTouchingPropertyName(sourceFile, position);
    let keywordFilters = KeywordCompletionFilters.None;
    let isNewIdentifierLocation = false;
    let flags = ts.CompletionInfoFlags.None;

    if (contextToken) {
        const importStatementCompletionInfo = getImportStatementCompletionInfo(contextToken);
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
            flags |= ts.CompletionInfoFlags.IsImportStatementCompletion;
            importStatementCompletion = importStatementCompletionInfo;
            isNewIdentifierLocation = importStatementCompletionInfo.isNewIdentifierLocation;
        }
        // Bail out if this is a known invalid completion location
        if (!importStatementCompletionInfo.replacementSpan && isCompletionListBlocker(contextToken)) {
            log("Returning an empty list because completion was requested in an invalid position.");
            return keywordFilters
                ? keywordCompletionData(keywordFilters, isJsOnlyLocation, isNewIdentifierDefinitionLocation())
                : undefined;
        }

        let parent = contextToken.parent;
        if (contextToken.kind === ts.SyntaxKind.DotToken || contextToken.kind === ts.SyntaxKind.QuestionDotToken) {
            isRightOfDot = contextToken.kind === ts.SyntaxKind.DotToken;
            isRightOfQuestionDot = contextToken.kind === ts.SyntaxKind.QuestionDotToken;
            switch (parent.kind) {
                case ts.SyntaxKind.PropertyAccessExpression:
                    propertyAccessToConvert = parent as ts.PropertyAccessExpression;
                    node = propertyAccessToConvert.expression;
                    const leftmostAccessExpression = ts.getLeftmostAccessExpression(propertyAccessToConvert);
                    if (ts.nodeIsMissing(leftmostAccessExpression) ||
                        ((ts.isCallExpression(node) || ts.isFunctionLike(node)) &&
                            node.end === contextToken.pos &&
                            node.getChildCount(sourceFile) &&
                            ts.last(node.getChildren(sourceFile)).kind !== ts.SyntaxKind.CloseParenToken)) {
                        // This is likely dot from incorrectly parsed expression and user is starting to write spread
                        // eg: Math.min(./**/)
                        // const x = function (./**/) {}
                        // ({./**/})
                        return undefined;
                    }
                    break;
                case ts.SyntaxKind.QualifiedName:
                    node = (parent as ts.QualifiedName).left;
                    break;
                case ts.SyntaxKind.ModuleDeclaration:
                    node = (parent as ts.ModuleDeclaration).name;
                    break;
                case ts.SyntaxKind.ImportType:
                    node = parent;
                    break;
                case ts.SyntaxKind.MetaProperty:
                    node = parent.getFirstToken(sourceFile)!;
                    ts.Debug.assert(node.kind === ts.SyntaxKind.ImportKeyword || node.kind === ts.SyntaxKind.NewKeyword);
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
            if (parent && parent.kind === ts.SyntaxKind.PropertyAccessExpression) {
                contextToken = parent;
                parent = parent.parent;
            }

            // Fix location
            if (currentToken.parent === location) {
                switch (currentToken.kind) {
                    case ts.SyntaxKind.GreaterThanToken:
                        if (currentToken.parent.kind === ts.SyntaxKind.JsxElement || currentToken.parent.kind === ts.SyntaxKind.JsxOpeningElement) {
                            location = currentToken;
                        }
                        break;

                    case ts.SyntaxKind.SlashToken:
                        if (currentToken.parent.kind === ts.SyntaxKind.JsxSelfClosingElement) {
                            location = currentToken;
                        }
                        break;
                }
            }

            switch (parent.kind) {
                case ts.SyntaxKind.JsxClosingElement:
                    if (contextToken.kind === ts.SyntaxKind.SlashToken) {
                        isStartingCloseTag = true;
                        location = contextToken;
                    }
                    break;

                case ts.SyntaxKind.BinaryExpression:
                    if (!binaryExpressionMayBeOpenTag(parent as ts.BinaryExpression)) {
                        break;
                    }
                // falls through

                case ts.SyntaxKind.JsxSelfClosingElement:
                case ts.SyntaxKind.JsxElement:
                case ts.SyntaxKind.JsxOpeningElement:
                    isJsxIdentifierExpected = true;
                    if (contextToken.kind === ts.SyntaxKind.LessThanToken) {
                        isRightOfOpenTag = true;
                        location = contextToken;
                    }
                    break;

                case ts.SyntaxKind.JsxExpression:
                case ts.SyntaxKind.JsxSpreadAttribute:
                    // For `<div foo={true} [||] ></div>`, `parent` will be `{true}` and `previousToken` will be `}`
                    if (previousToken.kind === ts.SyntaxKind.CloseBraceToken && currentToken.kind === ts.SyntaxKind.GreaterThanToken) {
                        isJsxIdentifierExpected = true;
                    }
                    break;

                case ts.SyntaxKind.JsxAttribute:
                    // For `<div className="x" [||] ></div>`, `parent` will be JsxAttribute and `previousToken` will be its initializer
                    if ((parent as ts.JsxAttribute).initializer === previousToken &&
                        previousToken.end < position) {
                        isJsxIdentifierExpected = true;
                        break;
                    }
                    switch (previousToken.kind) {
                        case ts.SyntaxKind.EqualsToken:
                            isJsxInitializer = true;
                            break;
                        case ts.SyntaxKind.Identifier:
                            isJsxIdentifierExpected = true;
                            // For `<div x=[|f/**/|]`, `parent` will be `x` and `previousToken.parent` will be `f` (which is its own JsxAttribute)
                            // Note for `<div someBool f>` we don't want to treat this as a jsx inializer, instead it's the attribute name.
                            if (parent !== previousToken.parent &&
                                !(parent as ts.JsxAttribute).initializer &&
                                ts.findChildOfKind(parent, ts.SyntaxKind.EqualsToken, sourceFile)) {
                                isJsxInitializer = previousToken as ts.Identifier;
                            }
                    }
                    break;
            }
        }
    }

    const semanticStart = ts.timestamp();
    let completionKind = CompletionKind.None;
    let isNonContextualObjectLiteral = false;
    let hasUnresolvedAutoImports = false;
    // This also gets mutated in nested-functions after the return
    let symbols: ts.Symbol[] = [];
    let importSpecifierResolver: ts.codefix.ImportSpecifierResolver | undefined;
    const symbolToOriginInfoMap: SymbolOriginInfoMap = [];
    const symbolToSortTextMap: SymbolSortTextMap = [];
    const seenPropertySymbols = new ts.Map<ts.SymbolId, true>();
    const isTypeOnlyLocation = isTypeOnlyCompletion();
    const getModuleSpecifierResolutionHost = ts.memoizeOne((isFromPackageJson: boolean) => {
        return ts.createModuleSpecifierResolutionHost(isFromPackageJson ? host.getPackageJsonAutoImportProvider!()! : program, host);
    });

    if (isRightOfDot || isRightOfQuestionDot) {
        getTypeScriptMemberSymbols();
    }
    else if (isRightOfOpenTag) {
        symbols = typeChecker.getJsxIntrinsicTagNamesAt(location);
        ts.Debug.assertEachIsDefined(symbols, "getJsxIntrinsicTagNames() should all be defined");
        tryGetGlobalSymbols();
        completionKind = CompletionKind.Global;
        keywordFilters = KeywordCompletionFilters.None;
    }
    else if (isStartingCloseTag) {
        const tagName = (contextToken.parent.parent as ts.JsxElement).openingElement.tagName;
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

    log("getCompletionData: Semantic work: " + (ts.timestamp() - semanticStart));
    const contextualType = previousToken && getContextualType(previousToken, position, sourceFile, typeChecker);

    const literals = ts.mapDefined(
        contextualType && (contextualType.isUnion() ? contextualType.types : [contextualType]),
        t => t.isLiteral() && !(t.flags & ts.TypeFlags.EnumLiteral) ? t.value : undefined);

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
        importStatementCompletion,
        hasUnresolvedAutoImports,
        flags,
    };

    type JSDocTagWithTypeExpression = ts.JSDocParameterTag | ts.JSDocPropertyTag | ts.JSDocReturnTag | ts.JSDocTypeTag | ts.JSDocTypedefTag | ts.JSDocTemplateTag;

    function isTagWithTypeExpression(tag: ts.JSDocTag): tag is JSDocTagWithTypeExpression {
        switch (tag.kind) {
            case ts.SyntaxKind.JSDocParameterTag:
            case ts.SyntaxKind.JSDocPropertyTag:
            case ts.SyntaxKind.JSDocReturnTag:
            case ts.SyntaxKind.JSDocTypeTag:
            case ts.SyntaxKind.JSDocTypedefTag:
                return true;
            case ts.SyntaxKind.JSDocTemplateTag:
                return !!(tag as ts.JSDocTemplateTag).constraint;
            default:
                return false;
        }
    }

    function tryGetTypeExpressionFromTag(tag: ts.JSDocTag): ts.JSDocTypeExpression | undefined {
        if (isTagWithTypeExpression(tag)) {
            const typeExpression = ts.isJSDocTemplateTag(tag) ? tag.constraint : tag.typeExpression;
            return typeExpression && typeExpression.kind === ts.SyntaxKind.JSDocTypeExpression ? typeExpression : undefined;
        }
        return undefined;
    }

    function getTypeScriptMemberSymbols(): void {
        // Right of dot member completion list
        completionKind = CompletionKind.PropertyAccess;

        // Since this is qualified name check it's a type node location
        const isImportType = ts.isLiteralImportTypeNode(node);
        const isTypeLocation = insideJsDocTagTypeExpression
            || (isImportType && !(node as ts.ImportTypeNode).isTypeOf)
            || ts.isPartOfTypeNode(node.parent)
            || ts.isPossiblyTypeArgumentPosition(contextToken, sourceFile, typeChecker);
        const isRhsOfImportDeclaration = ts.isInRightSideOfInternalImportEqualsDeclaration(node);
        if (ts.isEntityName(node) || isImportType || ts.isPropertyAccessExpression(node)) {
            const isNamespaceName = ts.isModuleDeclaration(node.parent);
            if (isNamespaceName) isNewIdentifierLocation = true;
            let symbol = typeChecker.getSymbolAtLocation(node);
            if (symbol) {
                symbol = ts.skipAlias(symbol, typeChecker);
                if (symbol.flags & (ts.SymbolFlags.Module | ts.SymbolFlags.Enum)) {
                    // Extract module or enum members
                    const exportedSymbols = typeChecker.getExportsOfModule(symbol);
                    ts.Debug.assertEachIsDefined(exportedSymbols, "getExportsOfModule() should all be defined");
                    const isValidValueAccess = (symbol: ts.Symbol) => typeChecker.isValidPropertyAccess(isImportType ? node as ts.ImportTypeNode : (node.parent as ts.PropertyAccessExpression), symbol.name);
                    const isValidTypeAccess = (symbol: ts.Symbol) => symbolCanBeReferencedAtTypeLocation(symbol, typeChecker);
                    const isValidAccess: (symbol: ts.Symbol) => boolean =
                        isNamespaceName
                            // At `namespace N.M/**/`, if this is the only declaration of `M`, don't include `M` as a completion.
                            ? symbol => !!(symbol.flags & ts.SymbolFlags.Namespace) && !symbol.declarations?.every(d => d.parent === node.parent)
                            : isRhsOfImportDeclaration ?
                                // Any kind is allowed when dotting off namespace in internal import equals declaration
                                symbol => isValidTypeAccess(symbol) || isValidValueAccess(symbol) :
                                isTypeLocation ? isValidTypeAccess : isValidValueAccess;
                    for (const exportedSymbol of exportedSymbols) {
                        if (isValidAccess(exportedSymbol)) {
                            symbols.push(exportedSymbol);
                        }
                    }

                    // If the module is merged with a value, we must get the type of the class and add its propertes (for inherited static methods).
                    if (!isTypeLocation &&
                        symbol.declarations &&
                        symbol.declarations.some(d => d.kind !== ts.SyntaxKind.SourceFile && d.kind !== ts.SyntaxKind.ModuleDeclaration && d.kind !== ts.SyntaxKind.EnumDeclaration)) {
                        let type = typeChecker.getTypeOfSymbolAtLocation(symbol, node).getNonOptionalType();
                        let insertQuestionDot = false;
                        if (type.isNullableType()) {
                            const canCorrectToQuestionDot =
                                isRightOfDot &&
                                !isRightOfQuestionDot &&
                                preferences.includeAutomaticOptionalChainCompletions !== false;

                            if (canCorrectToQuestionDot || isRightOfQuestionDot) {
                                type = type.getNonNullableType();
                                if (canCorrectToQuestionDot) {
                                    insertQuestionDot = true;
                                }
                            }
                        }
                        addTypeProperties(type, !!(node.flags & ts.NodeFlags.AwaitContext), insertQuestionDot);
                    }

                    return;
                }
            }
        }

        if (!isTypeLocation) {
            // GH#39946. Pulling on the type of a node inside of a function with a contextual `this` parameter can result in a circularity
            // if the `node` is part of the exprssion of a `yield` or `return`. This circularity doesn't exist at compile time because
            // we will check (and cache) the type of `this` *before* checking the type of the node.
            typeChecker.tryGetThisTypeAt(node, /*includeGlobalThis*/ false);

            let type = typeChecker.getTypeAtLocation(node).getNonOptionalType();
            let insertQuestionDot = false;
            if (type.isNullableType()) {
                const canCorrectToQuestionDot =
                    isRightOfDot &&
                    !isRightOfQuestionDot &&
                    preferences.includeAutomaticOptionalChainCompletions !== false;

                if (canCorrectToQuestionDot || isRightOfQuestionDot) {
                    type = type.getNonNullableType();
                    if (canCorrectToQuestionDot) {
                        insertQuestionDot = true;
                    }
                }
            }
            addTypeProperties(type, !!(node.flags & ts.NodeFlags.AwaitContext), insertQuestionDot);
        }
    }

    function addTypeProperties(type: ts.Type, insertAwait: boolean, insertQuestionDot: boolean): void {
        isNewIdentifierLocation = !!type.getStringIndexType();
        if (isRightOfQuestionDot && ts.some(type.getCallSignatures())) {
            isNewIdentifierLocation = true;
        }

        const propertyAccess = node.kind === ts.SyntaxKind.ImportType ? node as ts.ImportTypeNode : node.parent as ts.PropertyAccessExpression | ts.QualifiedName;
        if (inCheckedFile) {
            for (const symbol of type.getApparentProperties()) {
                if (typeChecker.isValidPropertyAccessForCompletions(propertyAccess, type, symbol)) {
                    addPropertySymbol(symbol, /* insertAwait */ false, insertQuestionDot);
                }
            }
        }
        else {
            // In javascript files, for union types, we don't just get the members that
            // the individual types have in common, we also include all the members that
            // each individual type has. This is because we're going to add all identifiers
            // anyways. So we might as well elevate the members that were at least part
            // of the individual types to a higher status since we know what they are.
            symbols.push(...ts.filter(getPropertiesForCompletion(type, typeChecker), s => typeChecker.isValidPropertyAccessForCompletions(propertyAccess, type, s)));
        }

        if (insertAwait && preferences.includeCompletionsWithInsertText) {
            const promiseType = typeChecker.getPromisedTypeOfPromise(type);
            if (promiseType) {
                for (const symbol of promiseType.getApparentProperties()) {
                    if (typeChecker.isValidPropertyAccessForCompletions(propertyAccess, promiseType, symbol)) {
                        addPropertySymbol(symbol, /* insertAwait */ true, insertQuestionDot);
                    }
                }
            }
        }
    }

    function addPropertySymbol(symbol: ts.Symbol, insertAwait: boolean, insertQuestionDot: boolean) {
        // For a computed property with an accessible name like `Symbol.iterator`,
        // we'll add a completion for the *name* `Symbol` instead of for the property.
        // If this is e.g. [Symbol.iterator], add a completion for `Symbol`.
        const computedPropertyName = ts.firstDefined(symbol.declarations, decl => ts.tryCast(ts.getNameOfDeclaration(decl), ts.isComputedPropertyName));
        if (computedPropertyName) {
            const leftMostName = getLeftMostName(computedPropertyName.expression); // The completion is for `Symbol`, not `iterator`.
            const nameSymbol = leftMostName && typeChecker.getSymbolAtLocation(leftMostName);
            // If this is nested like for `namespace N { export const sym = Symbol(); }`, we'll add the completion for `N`.
            const firstAccessibleSymbol = nameSymbol && getFirstSymbolInChain(nameSymbol, contextToken, typeChecker);
            if (firstAccessibleSymbol && ts.addToSeen(seenPropertySymbols, ts.getSymbolId(firstAccessibleSymbol))) {
                const index = symbols.length;
                symbols.push(firstAccessibleSymbol);
                const moduleSymbol = firstAccessibleSymbol.parent;
                if (!moduleSymbol ||
                    !ts.isExternalModuleSymbol(moduleSymbol) ||
                    typeChecker.tryGetMemberInModuleExportsAndProperties(firstAccessibleSymbol.name, moduleSymbol) !== firstAccessibleSymbol
                ) {
                    symbolToOriginInfoMap[index] = { kind: getNullableSymbolOriginInfoKind(SymbolOriginInfoKind.SymbolMemberNoExport) };
                }
                else {
                    const fileName = ts.isExternalModuleNameRelative(ts.stripQuotes(moduleSymbol.name)) ? ts.getSourceFileOfModule(moduleSymbol)?.fileName : undefined;
                    const { moduleSpecifier } = (importSpecifierResolver ||= ts.codefix.createImportSpecifierResolver(sourceFile, program, host, preferences)).getModuleSpecifierForBestExportInfo([{
                        exportKind: ts.ExportKind.Named,
                        moduleFileName: fileName,
                        isFromPackageJson: false,
                        moduleSymbol,
                        symbol: firstAccessibleSymbol,
                        targetFlags: ts.skipAlias(firstAccessibleSymbol, typeChecker).flags,
                    }], firstAccessibleSymbol.name, position, ts.isValidTypeOnlyAliasUseSite(location)) || {};

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

        function addSymbolSortInfo(symbol: ts.Symbol) {
            if (isStaticProperty(symbol)) {
                symbolToSortTextMap[ts.getSymbolId(symbol)] = SortText.LocalDeclarationPriority;
            }
        }

        function addSymbolOriginInfo(symbol: ts.Symbol) {
            if (preferences.includeCompletionsWithInsertText) {
                if (insertAwait && ts.addToSeen(seenPropertySymbols, ts.getSymbolId(symbol))) {
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
    function getLeftMostName(e: ts.Expression): ts.Identifier | undefined {
        return ts.isIdentifier(e) ? e : ts.isPropertyAccessExpression(e) ? getLeftMostName(e.expression) : undefined;
    }

    function tryGetGlobalSymbols(): boolean {
        const result: GlobalsSearch = tryGetObjectTypeLiteralInTypeArgumentCompletionSymbols()
            || tryGetObjectLikeCompletionSymbols()
            || tryGetImportCompletionSymbols()
            || tryGetImportOrExportClauseCompletionSymbols()
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
        const completionsType = jsxContainer && typeChecker.getContextualType(jsxContainer.attributes, ts.ContextFlags.Completions);
        symbols = ts.concatenate(symbols, filterJsxAttributes(getPropertiesForObjectExpression(attrsType, completionsType, jsxContainer.attributes, typeChecker), jsxContainer.attributes.properties));
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
        isNewIdentifierLocation = isNewIdentifierDefinitionLocation();

        if (previousToken !== contextToken) {
            ts.Debug.assert(!!previousToken, "Expected 'contextToken' to be defined when different from 'previousToken'.");
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

        const symbolMeanings = (isTypeOnlyLocation ? ts.SymbolFlags.None : ts.SymbolFlags.Value) | ts.SymbolFlags.Type | ts.SymbolFlags.Namespace | ts.SymbolFlags.Alias;
        const typeOnlyAliasNeedsPromotion = previousToken && !ts.isValidTypeOnlyAliasUseSite(previousToken);

        symbols = ts.concatenate(symbols, typeChecker.getSymbolsInScope(scopeNode, symbolMeanings));
        ts.Debug.assertEachIsDefined(symbols, "getSymbolsInScope() should all be defined");
        for (let i = 0; i < symbols.length; i++) {
            const symbol = symbols[i];
            if (!typeChecker.isArgumentsSymbol(symbol) &&
                !ts.some(symbol.declarations, d => d.getSourceFile() === sourceFile)) {
                symbolToSortTextMap[ts.getSymbolId(symbol)] = SortText.GlobalsOrKeywords;
            }
            if (typeOnlyAliasNeedsPromotion && !(symbol.flags & ts.SymbolFlags.Value)) {
                const typeOnlyAliasDeclaration = symbol.declarations && ts.find(symbol.declarations, ts.isTypeOnlyImportOrExportDeclaration);
                if (typeOnlyAliasDeclaration) {
                    const origin: SymbolOriginInfoTypeOnlyAlias = { kind: SymbolOriginInfoKind.TypeOnlyAlias, declaration: typeOnlyAliasDeclaration };
                    symbolToOriginInfoMap[i] = origin;
                }
            }
        }

        // Need to insert 'this.' before properties of `this` type, so only do that if `includeInsertTextCompletions`
        if (preferences.includeCompletionsWithInsertText && scopeNode.kind !== ts.SyntaxKind.SourceFile) {
            const thisType = typeChecker.tryGetThisTypeAt(scopeNode, /*includeGlobalThis*/ false, ts.isClassLike(scopeNode.parent) ? scopeNode : undefined);
            if (thisType && !isProbablyGlobalType(thisType, sourceFile, typeChecker)) {
                for (const symbol of getPropertiesForCompletion(thisType, typeChecker)) {
                    symbolToOriginInfoMap[symbols.length] = { kind: SymbolOriginInfoKind.ThisType };
                    symbols.push(symbol);
                    symbolToSortTextMap[ts.getSymbolId(symbol)] = SortText.SuggestedClassMembers;
                }
            }
        }
        collectAutoImports();
        if (isTypeOnlyLocation) {
            keywordFilters = contextToken && ts.isAssertionExpression(contextToken.parent)
                ? KeywordCompletionFilters.TypeAssertionKeywords
                : KeywordCompletionFilters.TypeKeywords;
        }
    }

    function shouldOfferImportCompletions(): boolean {
        // If already typing an import statement, provide completions for it.
        if (importStatementCompletion) return true;
        // If current completion is for non-contextual Object literal shortahands, ignore auto-import symbols
        if (isNonContextualObjectLiteral) return false;
        // If not already a module, must have modules enabled.
        if (!preferences.includeCompletionsForModuleExports) return false;
        // If already using ES modules, OK to continue using them.
        if (sourceFile.externalModuleIndicator || sourceFile.commonJsModuleIndicator) return true;
        // If module transpilation is enabled or we're targeting es6 or above, or not emitting, OK.
        if (ts.compilerOptionsIndicateEsModules(program.getCompilerOptions())) return true;
        // If some file is using ES6 modules, assume that it's OK to add more.
        return ts.programContainsModules(program);
    }

    function isSnippetScope(scopeNode: ts.Node): boolean {
        switch (scopeNode.kind) {
            case ts.SyntaxKind.SourceFile:
            case ts.SyntaxKind.TemplateExpression:
            case ts.SyntaxKind.JsxExpression:
            case ts.SyntaxKind.Block:
                return true;
            default:
                return ts.isStatement(scopeNode);
        }
    }

    function isTypeOnlyCompletion(): boolean {
        return insideJsDocTagTypeExpression
            || !!importStatementCompletion && ts.isTypeOnlyImportOrExportDeclaration(location.parent)
            || !isContextTokenValueLocation(contextToken) &&
            (ts.isPossiblyTypeArgumentPosition(contextToken, sourceFile, typeChecker)
                || ts.isPartOfTypeNode(location)
                || isContextTokenTypeLocation(contextToken));
    }

    function isContextTokenValueLocation(contextToken: ts.Node) {
        return contextToken &&
            ((contextToken.kind === ts.SyntaxKind.TypeOfKeyword &&
                (contextToken.parent.kind === ts.SyntaxKind.TypeQuery || ts.isTypeOfExpression(contextToken.parent))) ||
            (contextToken.kind === ts.SyntaxKind.AssertsKeyword && contextToken.parent.kind === ts.SyntaxKind.TypePredicate));
    }

    function isContextTokenTypeLocation(contextToken: ts.Node): boolean {
        if (contextToken) {
            const parentKind = contextToken.parent.kind;
            switch (contextToken.kind) {
                case ts.SyntaxKind.ColonToken:
                    return parentKind === ts.SyntaxKind.PropertyDeclaration ||
                        parentKind === ts.SyntaxKind.PropertySignature ||
                        parentKind === ts.SyntaxKind.Parameter ||
                        parentKind === ts.SyntaxKind.VariableDeclaration ||
                        ts.isFunctionLikeKind(parentKind);

                case ts.SyntaxKind.EqualsToken:
                    return parentKind === ts.SyntaxKind.TypeAliasDeclaration;

                case ts.SyntaxKind.AsKeyword:
                    return parentKind === ts.SyntaxKind.AsExpression;

                case ts.SyntaxKind.LessThanToken:
                    return parentKind === ts.SyntaxKind.TypeReference ||
                        parentKind === ts.SyntaxKind.TypeAssertionExpression;

                case ts.SyntaxKind.ExtendsKeyword:
                    return parentKind === ts.SyntaxKind.TypeParameter;

                case ts.SyntaxKind.SatisfiesKeyword:
                    return parentKind === ts.SyntaxKind.SatisfiesExpression;
            }
        }
        return false;
    }

    /** Mutates `symbols`, `symbolToOriginInfoMap`, and `symbolToSortTextMap` */
    function collectAutoImports() {
        if (!shouldOfferImportCompletions()) return;
        ts.Debug.assert(!detailsEntryId?.data, "Should not run 'collectAutoImports' when faster path is available via `data`");
        if (detailsEntryId && !detailsEntryId.source) {
            // Asking for completion details for an item that is not an auto-import
            return;
        }

        flags |= ts.CompletionInfoFlags.MayIncludeAutoImports;
        // import { type | -> token text should be blank
        const isAfterTypeOnlyImportSpecifierModifier = previousToken === contextToken
            && importStatementCompletion;

        const lowerCaseTokenText =
            isAfterTypeOnlyImportSpecifierModifier ? "" :
            previousToken && ts.isIdentifier(previousToken) ? previousToken.text.toLowerCase() :
            "";

        const moduleSpecifierCache = host.getModuleSpecifierCache?.();
        const exportInfo = ts.getExportInfoMap(sourceFile, host, program, preferences, cancellationToken);
        const packageJsonAutoImportProvider = host.getPackageJsonAutoImportProvider?.();
        const packageJsonFilter = detailsEntryId ? undefined : ts.createPackageJsonImportFilter(sourceFile, preferences, host);
        resolvingModuleSpecifiers(
            "collectAutoImports",
            host,
            importSpecifierResolver ||= ts.codefix.createImportSpecifierResolver(sourceFile, program, host, preferences),
            program,
            position,
            preferences,
            !!importStatementCompletion,
            ts.isValidTypeOnlyAliasUseSite(location),
            context => {
                exportInfo.search(
                    sourceFile.path,
                    /*preferCapitalized*/ isRightOfOpenTag,
                    (symbolName, targetFlags) => {
                        if (!ts.isIdentifierText(symbolName, ts.getEmitScriptTarget(host.getCompilationSettings()))) return false;
                        if (!detailsEntryId && ts.isStringANonContextualKeyword(symbolName)) return false;
                        if (!isTypeOnlyLocation && !importStatementCompletion && !(targetFlags & ts.SymbolFlags.Value)) return false;
                        if (isTypeOnlyLocation && !(targetFlags & (ts.SymbolFlags.Module | ts.SymbolFlags.Type))) return false;
                        // Do not try to auto-import something with a lowercase first letter for a JSX tag
                        const firstChar = symbolName.charCodeAt(0);
                        if (isRightOfOpenTag && (firstChar < ts.CharacterCodes.A || firstChar > ts.CharacterCodes.Z)) return false;

                        if (detailsEntryId) return true;
                        return charactersFuzzyMatchInString(symbolName, lowerCaseTokenText);
                    },
                    (info, symbolName, isFromAmbientModule, exportMapKey) => {
                        if (detailsEntryId && !ts.some(info, i => detailsEntryId.source === ts.stripQuotes(i.moduleSymbol.name))) {
                            return;
                        }

                        // Do a relatively cheap check to bail early if all re-exports are non-importable
                        // due to file location or package.json dependency filtering. For non-node16+
                        // module resolution modes, getting past this point guarantees that we'll be
                        // able to generate a suitable module specifier, so we can safely show a completion,
                        // even if we defer computing the module specifier.
                        const firstImportableExportInfo = ts.find(info, isImportableExportInfo);
                        if (!firstImportableExportInfo) {
                            return;
                        }

                        // In node16+, module specifier resolution can fail due to modules being blocked
                        // by package.json `exports`. If that happens, don't show a completion item.
                        // N.B. in this resolution mode we always try to resolve module specifiers here,
                        // because we have to know now if it's going to fail so we can omit the completion
                        // from the list.
                        const result = context.tryResolve(info, symbolName, isFromAmbientModule) || {};
                        if (result === "failed") return;

                        // If we skipped resolving module specifiers, our selection of which ExportInfo
                        // to use here is arbitrary, since the info shown in the completion list derived from
                        // it should be identical regardless of which one is used. During the subsequent
                        // `CompletionEntryDetails` request, we'll get all the ExportInfos again and pick
                        // the best one based on the module specifier it produces.
                        let exportInfo = firstImportableExportInfo, moduleSpecifier;
                        if (result !== "skipped") {
                            ({ exportInfo = firstImportableExportInfo, moduleSpecifier } = result);
                        }

                        const isDefaultExport = exportInfo.exportKind === ts.ExportKind.Default;
                        const symbol = isDefaultExport && ts.getLocalSymbolForExportDefault(exportInfo.symbol) || exportInfo.symbol;

                        pushAutoImportSymbol(symbol, {
                            kind: moduleSpecifier ? SymbolOriginInfoKind.ResolvedExport : SymbolOriginInfoKind.Export,
                            moduleSpecifier,
                            symbolName,
                            exportMapKey,
                            exportName: exportInfo.exportKind === ts.ExportKind.ExportEquals ? ts.InternalSymbolName.ExportEquals : exportInfo.symbol.name,
                            fileName: exportInfo.moduleFileName,
                            isDefaultExport,
                            moduleSymbol: exportInfo.moduleSymbol,
                            isFromPackageJson: exportInfo.isFromPackageJson,
                        });
                    }
                );

                hasUnresolvedAutoImports = context.skippedAny();
                flags |= context.resolvedAny() ? ts.CompletionInfoFlags.ResolvedModuleSpecifiers : 0;
                flags |= context.resolvedBeyondLimit() ? ts.CompletionInfoFlags.ResolvedModuleSpecifiersBeyondLimit : 0;
            }
        );

        function isImportableExportInfo(info: ts.SymbolExportInfo) {
            const moduleFile = ts.tryCast(info.moduleSymbol.valueDeclaration, ts.isSourceFile);
            if (!moduleFile) {
                const moduleName = ts.stripQuotes(info.moduleSymbol.name);
                if (ts.JsTyping.nodeCoreModules.has(moduleName) && ts.startsWith(moduleName, "node:") !== ts.shouldUseUriStyleNodeCoreModules(sourceFile, program)) {
                    return false;
                }
                return packageJsonFilter
                    ? packageJsonFilter.allowsImportingAmbientModule(info.moduleSymbol, getModuleSpecifierResolutionHost(info.isFromPackageJson))
                    : true;
            }
            return ts.isImportableFile(
                info.isFromPackageJson ? packageJsonAutoImportProvider! : program,
                sourceFile,
                moduleFile,
                preferences,
                packageJsonFilter,
                getModuleSpecifierResolutionHost(info.isFromPackageJson),
                moduleSpecifierCache);
        }
    }

    function pushAutoImportSymbol(symbol: ts.Symbol, origin: SymbolOriginInfoResolvedExport | SymbolOriginInfoExport) {
        const symbolId = ts.getSymbolId(symbol);
        if (symbolToSortTextMap[symbolId] === SortText.GlobalsOrKeywords) {
            // If an auto-importable symbol is available as a global, don't add the auto import
            return;
        }
        symbolToOriginInfoMap[symbols.length] = origin;
        symbolToSortTextMap[symbolId] = importStatementCompletion ? SortText.LocationPriority : SortText.AutoImportSuggestions;
        symbols.push(symbol);
    }

    /* Mutates `symbols` and `symbolToOriginInfoMap`. */
    function collectObjectLiteralMethodSymbols(members: ts.Symbol[], enclosingDeclaration: ts.ObjectLiteralExpression): void {
        // TODO: support JS files.
        if (ts.isInJSFile(location)) {
            return;
        }
        members.forEach(member => {
            if (!isObjectLiteralMethodSymbol(member)) {
                return;
            }
            const displayName = getCompletionEntryDisplayNameForSymbol(
                member,
                ts.getEmitScriptTarget(compilerOptions),
                /*origin*/ undefined,
                CompletionKind.ObjectPropertyDeclaration,
                /*jsxIdentifierExpected*/ false);
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
                formatContext);
            if (!entryProps) {
                return;
            }
            const origin: SymbolOriginInfoObjectLiteralMethod = { kind: SymbolOriginInfoKind.ObjectLiteralMethod, ...entryProps };
            flags |= ts.CompletionInfoFlags.MayIncludeMethodSnippets;
            symbolToOriginInfoMap[symbols.length] = origin;
            symbols.push(member);
        });
    }

    function isObjectLiteralMethodSymbol(symbol: ts.Symbol): boolean {
        /*
            For an object type
            `type Foo = {
                bar(x: number): void;
                foo: (x: string) => string;
            }`,
            `bar` will have symbol flag `Method`,
            `foo` will have symbol flag `Property`.
        */
        if (!(symbol.flags & (ts.SymbolFlags.Property | ts.SymbolFlags.Method))) {
            return false;
        }
        return true;
    }

    /**
     * Finds the first node that "embraces" the position, so that one may
     * accurately aggregate locals from the closest containing scope.
     */
    function getScopeNode(initialToken: ts.Node | undefined, position: number, sourceFile: ts.SourceFile) {
        let scope: ts.Node | undefined = initialToken;
        while (scope && !ts.positionBelongsToNode(scope, position, sourceFile)) {
            scope = scope.parent;
        }
        return scope;
    }

    function isCompletionListBlocker(contextToken: ts.Node): boolean {
        const start = ts.timestamp();
        const result = isInStringOrRegularExpressionOrTemplateLiteral(contextToken) ||
            isSolelyIdentifierDefinitionLocation(contextToken) ||
            isDotOfNumericLiteral(contextToken) ||
            isInJsxText(contextToken) ||
            ts.isBigIntLiteral(contextToken);
        log("getCompletionsAtPosition: isCompletionListBlocker: " + (ts.timestamp() - start));
        return result;
    }

    function isInJsxText(contextToken: ts.Node): boolean {
        if (contextToken.kind === ts.SyntaxKind.JsxText) {
            return true;
        }

        if (contextToken.kind === ts.SyntaxKind.GreaterThanToken && contextToken.parent) {
            // <Component<string> /**/ />
            // <Component<string> /**/ ><Component>
            // - contextToken: GreaterThanToken (before cursor)
            // - location: JsxSelfClosingElement or JsxOpeningElement
            // - contextToken.parent === location
            if (location === contextToken.parent && (location.kind === ts.SyntaxKind.JsxOpeningElement || location.kind === ts.SyntaxKind.JsxSelfClosingElement)) {
                return false;
            }

            if (contextToken.parent.kind === ts.SyntaxKind.JsxOpeningElement) {
                // <div>/**/
                // - contextToken: GreaterThanToken (before cursor)
                // - location: JSXElement
                // - different parents (JSXOpeningElement, JSXElement)
                return location.parent.kind !== ts.SyntaxKind.JsxOpeningElement;
            }

            if (contextToken.parent.kind === ts.SyntaxKind.JsxClosingElement || contextToken.parent.kind === ts.SyntaxKind.JsxSelfClosingElement) {
                return !!contextToken.parent.parent && contextToken.parent.parent.kind === ts.SyntaxKind.JsxElement;
            }
        }
        return false;
    }

    function isNewIdentifierDefinitionLocation(): boolean {
        if (contextToken) {
            const containingNodeKind = contextToken.parent.kind;
            const tokenKind = keywordForNode(contextToken);
            // Previous token may have been a keyword that was converted to an identifier.
            switch (tokenKind) {
                case ts.SyntaxKind.CommaToken:
                    return containingNodeKind === ts.SyntaxKind.CallExpression               // func( a, |
                        || containingNodeKind === ts.SyntaxKind.Constructor                  // constructor( a, |   /* public, protected, private keywords are allowed here, so show completion */
                        || containingNodeKind === ts.SyntaxKind.NewExpression                // new C(a, |
                        || containingNodeKind === ts.SyntaxKind.ArrayLiteralExpression       // [a, |
                        || containingNodeKind === ts.SyntaxKind.BinaryExpression             // const x = (a, |
                        || containingNodeKind === ts.SyntaxKind.FunctionType                 // var x: (s: string, list|
                        || containingNodeKind === ts.SyntaxKind.ObjectLiteralExpression;     // const obj = { x, |

                case ts.SyntaxKind.OpenParenToken:
                    return containingNodeKind === ts.SyntaxKind.CallExpression               // func( |
                        || containingNodeKind === ts.SyntaxKind.Constructor                  // constructor( |
                        || containingNodeKind === ts.SyntaxKind.NewExpression                // new C(a|
                        || containingNodeKind === ts.SyntaxKind.ParenthesizedExpression      // const x = (a|
                        || containingNodeKind === ts.SyntaxKind.ParenthesizedType;           // function F(pred: (a| /* this can become an arrow function, where 'a' is the argument */

                case ts.SyntaxKind.OpenBracketToken:
                    return containingNodeKind === ts.SyntaxKind.ArrayLiteralExpression       // [ |
                        || containingNodeKind === ts.SyntaxKind.IndexSignature               // [ | : string ]
                        || containingNodeKind === ts.SyntaxKind.ComputedPropertyName;         // [ |    /* this can become an index signature */

                case ts.SyntaxKind.ModuleKeyword:                                            // module |
                case ts.SyntaxKind.NamespaceKeyword:                                         // namespace |
                case ts.SyntaxKind.ImportKeyword:                                            // import |
                    return true;

                case ts.SyntaxKind.DotToken:
                    return containingNodeKind === ts.SyntaxKind.ModuleDeclaration;           // module A.|

                case ts.SyntaxKind.OpenBraceToken:
                    return containingNodeKind === ts.SyntaxKind.ClassDeclaration             // class A { |
                        || containingNodeKind === ts.SyntaxKind.ObjectLiteralExpression;     // const obj = { |

                case ts.SyntaxKind.EqualsToken:
                    return containingNodeKind === ts.SyntaxKind.VariableDeclaration          // const x = a|
                        || containingNodeKind === ts.SyntaxKind.BinaryExpression;            // x = a|

                case ts.SyntaxKind.TemplateHead:
                    return containingNodeKind === ts.SyntaxKind.TemplateExpression;          // `aa ${|

                case ts.SyntaxKind.TemplateMiddle:
                    return containingNodeKind === ts.SyntaxKind.TemplateSpan;                // `aa ${10} dd ${|

                case ts.SyntaxKind.AsyncKeyword:
                    return containingNodeKind === ts.SyntaxKind.MethodDeclaration            // const obj = { async c|()
                        || containingNodeKind === ts.SyntaxKind.ShorthandPropertyAssignment; // const obj = { async c|

                case ts.SyntaxKind.AsteriskToken:
                    return containingNodeKind === ts.SyntaxKind.MethodDeclaration;           // const obj = { * c|
            }

            if (isClassMemberCompletionKeyword(tokenKind)) {
                return true;
            }
        }

        return false;
    }

    function isInStringOrRegularExpressionOrTemplateLiteral(contextToken: ts.Node): boolean {
        // To be "in" one of these literals, the position has to be:
        //   1. entirely within the token text.
        //   2. at the end position of an unterminated token.
        //   3. at the end of a regular expression (due to trailing flags like '/foo/g').
        return (ts.isRegularExpressionLiteral(contextToken) || ts.isStringTextContainingNode(contextToken)) && (
            ts.rangeContainsPositionExclusive(ts.createTextRangeFromSpan(ts.createTextSpanFromNode(contextToken)), position) ||
            position === contextToken.end && (!!contextToken.isUnterminated || ts.isRegularExpressionLiteral(contextToken)));
    }

    function tryGetObjectTypeLiteralInTypeArgumentCompletionSymbols(): GlobalsSearch | undefined {
        const typeLiteralNode = tryGetTypeLiteralNode(contextToken);
        if (!typeLiteralNode) return GlobalsSearch.Continue;

        const intersectionTypeNode = ts.isIntersectionTypeNode(typeLiteralNode.parent) ? typeLiteralNode.parent : undefined;
        const containerTypeNode = intersectionTypeNode || typeLiteralNode;

        const containerExpectedType = getConstraintOfTypeArgumentProperty(containerTypeNode, typeChecker);
        if (!containerExpectedType) return GlobalsSearch.Continue;

        const containerActualType = typeChecker.getTypeFromTypeNode(containerTypeNode);

        const members = getPropertiesForCompletion(containerExpectedType, typeChecker);
        const existingMembers = getPropertiesForCompletion(containerActualType, typeChecker);

        const existingMemberEscapedNames: ts.Set<ts.__String> = new ts.Set();
        existingMembers.forEach(s => existingMemberEscapedNames.add(s.escapedName));

        symbols = ts.concatenate(symbols, ts.filter(members, s => !existingMemberEscapedNames.has(s.escapedName)));

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
        const symbolsStartIndex = symbols.length;
        const objectLikeContainer = tryGetObjectLikeCompletionContainer(contextToken);
        if (!objectLikeContainer) return GlobalsSearch.Continue;

        // We're looking up possible property names from contextual/inferred/declared type.
        completionKind = CompletionKind.ObjectPropertyDeclaration;

        let typeMembers: ts.Symbol[] | undefined;
        let existingMembers: readonly ts.Declaration[] | undefined;

        if (objectLikeContainer.kind === ts.SyntaxKind.ObjectLiteralExpression) {
            const instantiatedType = tryGetObjectLiteralContextualType(objectLikeContainer, typeChecker);

            // Check completions for Object property value shorthand
            if (instantiatedType === undefined) {
                if (objectLikeContainer.flags & ts.NodeFlags.InWithStatement) {
                    return GlobalsSearch.Fail;
                }
                isNonContextualObjectLiteral = true;
                return GlobalsSearch.Continue;
            }
            const completionsType = typeChecker.getContextualType(objectLikeContainer, ts.ContextFlags.Completions);
            const hasStringIndexType = (completionsType || instantiatedType).getStringIndexType();
            const hasNumberIndextype = (completionsType || instantiatedType).getNumberIndexType();
            isNewIdentifierLocation = !!hasStringIndexType || !!hasNumberIndextype;
            typeMembers = getPropertiesForObjectExpression(instantiatedType, completionsType, objectLikeContainer, typeChecker);
            existingMembers = objectLikeContainer.properties;

            if (typeMembers.length === 0) {
                // Edge case: If NumberIndexType exists
                if (!hasNumberIndextype) {
                    isNonContextualObjectLiteral = true;
                    return GlobalsSearch.Continue;
                }
            }
        }
        else {
            ts.Debug.assert(objectLikeContainer.kind === ts.SyntaxKind.ObjectBindingPattern);
            // We are *only* completing on properties from the type being destructured.
            isNewIdentifierLocation = false;

            const rootDeclaration = ts.getRootDeclaration(objectLikeContainer.parent);
            if (!ts.isVariableLike(rootDeclaration)) return ts.Debug.fail("Root declaration is not variable-like.");

            // We don't want to complete using the type acquired by the shape
            // of the binding pattern; we are only interested in types acquired
            // through type declaration or inference.
            // Also proceed if rootDeclaration is a parameter and if its containing function expression/arrow function is contextually typed -
            // type of parameter will flow in from the contextual type of the function
            let canGetType = ts.hasInitializer(rootDeclaration) || !!ts.getEffectiveTypeAnnotationNode(rootDeclaration) || rootDeclaration.parent.parent.kind === ts.SyntaxKind.ForOfStatement;
            if (!canGetType && rootDeclaration.kind === ts.SyntaxKind.Parameter) {
                if (ts.isExpression(rootDeclaration.parent)) {
                    canGetType = !!typeChecker.getContextualType(rootDeclaration.parent as ts.Expression);
                }
                else if (rootDeclaration.parent.kind === ts.SyntaxKind.MethodDeclaration || rootDeclaration.parent.kind === ts.SyntaxKind.SetAccessor) {
                    canGetType = ts.isExpression(rootDeclaration.parent.parent) && !!typeChecker.getContextualType(rootDeclaration.parent.parent as ts.Expression);
                }
            }
            if (canGetType) {
                const typeForObject = typeChecker.getTypeAtLocation(objectLikeContainer);
                if (!typeForObject) return GlobalsSearch.Fail;
                typeMembers = typeChecker.getPropertiesOfType(typeForObject).filter(propertySymbol => {
                    return typeChecker.isPropertyAccessible(objectLikeContainer, /*isSuper*/ false, /*writing*/ false, typeForObject, propertySymbol);
                });
                existingMembers = objectLikeContainer.elements;
            }
        }

        if (typeMembers && typeMembers.length > 0) {
            // Add filtered items to the completion list
            const filteredMembers = filterObjectMembersList(typeMembers, ts.Debug.checkDefined(existingMembers));
            symbols = ts.concatenate(symbols, filteredMembers);
            setSortTextToOptionalMember();
            if (objectLikeContainer.kind === ts.SyntaxKind.ObjectLiteralExpression
                && preferences.includeCompletionsWithObjectLiteralMethodSnippets
                && preferences.includeCompletionsWithInsertText) {
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
        const namedImportsOrExports =
            contextToken.kind === ts.SyntaxKind.OpenBraceToken || contextToken.kind === ts.SyntaxKind.CommaToken ? ts.tryCast(contextToken.parent, ts.isNamedImportsOrExports) :
            ts.isTypeKeywordTokenOrIdentifier(contextToken) ? ts.tryCast(contextToken.parent.parent, ts.isNamedImportsOrExports) : undefined;

        if (!namedImportsOrExports) return GlobalsSearch.Continue;

        // We can at least offer `type` at `import { |`
        if (!ts.isTypeKeywordTokenOrIdentifier(contextToken)) {
            keywordFilters = KeywordCompletionFilters.TypeKeyword;
        }

        // try to show exported member for imported/re-exported module
        const { moduleSpecifier } = namedImportsOrExports.kind === ts.SyntaxKind.NamedImports ? namedImportsOrExports.parent.parent : namedImportsOrExports.parent;
        if (!moduleSpecifier) {
            isNewIdentifierLocation = true;
            return namedImportsOrExports.kind === ts.SyntaxKind.NamedImports ? GlobalsSearch.Fail : GlobalsSearch.Continue;
        }
        const moduleSpecifierSymbol = typeChecker.getSymbolAtLocation(moduleSpecifier); // TODO: GH#18217
        if (!moduleSpecifierSymbol) {
            isNewIdentifierLocation = true;
            return GlobalsSearch.Fail;
        }

        completionKind = CompletionKind.MemberLike;
        isNewIdentifierLocation = false;
        const exports = typeChecker.getExportsAndPropertiesOfModule(moduleSpecifierSymbol);
        const existing = new ts.Set((namedImportsOrExports.elements as ts.NodeArray<ts.ImportOrExportSpecifier>).filter(n => !isCurrentlyEditingNode(n)).map(n => (n.propertyName || n.name).escapedText));
        const uniques = exports.filter(e => e.escapedName !== ts.InternalSymbolName.Default && !existing.has(e.escapedName));
        symbols = ts.concatenate(symbols, uniques);
        if (!uniques.length) {
            // If there's nothing else to import, don't offer `type` either
            keywordFilters = KeywordCompletionFilters.None;
        }
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
        const namedExports = contextToken && (contextToken.kind === ts.SyntaxKind.OpenBraceToken || contextToken.kind === ts.SyntaxKind.CommaToken)
            ? ts.tryCast(contextToken.parent, ts.isNamedExports)
            : undefined;

        if (!namedExports) {
            return GlobalsSearch.Continue;
        }

        const localsContainer = ts.findAncestor(namedExports, ts.or(ts.isSourceFile, ts.isModuleDeclaration))!;
        completionKind = CompletionKind.None;
        isNewIdentifierLocation = false;
        localsContainer.locals?.forEach((symbol, name) => {
            symbols.push(symbol);
            if (localsContainer.symbol?.exports?.has(name)) {
                symbolToSortTextMap[ts.getSymbolId(symbol)] = SortText.OptionalMember;
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
        keywordFilters = contextToken.kind === ts.SyntaxKind.AsteriskToken ? KeywordCompletionFilters.None :
            ts.isClassLike(decl) ? KeywordCompletionFilters.ClassElementKeywords : KeywordCompletionFilters.InterfaceElementKeywords;

        // If you're in an interface you don't want to repeat things from super-interface. So just stop here.
        if (!ts.isClassLike(decl)) return GlobalsSearch.Success;

        const classElement = contextToken.kind === ts.SyntaxKind.SemicolonToken ? contextToken.parent.parent : contextToken.parent;
        let classElementModifierFlags = ts.isClassElement(classElement) ? ts.getEffectiveModifierFlags(classElement) : ts.ModifierFlags.None;
        // If this is context token is not something we are editing now, consider if this would lead to be modifier
        if (contextToken.kind === ts.SyntaxKind.Identifier && !isCurrentlyEditingNode(contextToken)) {
            switch (contextToken.getText()) {
                case "private":
                    classElementModifierFlags = classElementModifierFlags | ts.ModifierFlags.Private;
                    break;
                case "static":
                    classElementModifierFlags = classElementModifierFlags | ts.ModifierFlags.Static;
                    break;
                case "override":
                    classElementModifierFlags = classElementModifierFlags | ts.ModifierFlags.Override;
                    break;
            }
        }
        if (ts.isClassStaticBlockDeclaration(classElement)) {
            classElementModifierFlags |= ts.ModifierFlags.Static;
        }

        // No member list for private methods
        if (!(classElementModifierFlags & ts.ModifierFlags.Private)) {
            // List of property symbols of base type that are not private and already implemented
            const baseTypeNodes = ts.isClassLike(decl) && classElementModifierFlags & ts.ModifierFlags.Override ? ts.singleElementArray(ts.getEffectiveBaseTypeNode(decl)) : ts.getAllSuperTypeNodes(decl);
            const baseSymbols = ts.flatMap(baseTypeNodes, baseTypeNode => {
                const type = typeChecker.getTypeAtLocation(baseTypeNode);
                return classElementModifierFlags & ts.ModifierFlags.Static ?
                    type?.symbol && typeChecker.getPropertiesOfType(typeChecker.getTypeOfSymbolAtLocation(type.symbol, decl)) :
                    type && typeChecker.getPropertiesOfType(type);
            });
            symbols = ts.concatenate(symbols, filterClassMembersList(baseSymbols, decl.members, classElementModifierFlags));
        }

        return GlobalsSearch.Success;
    }

    function isConstructorParameterCompletion(node: ts.Node): boolean {
        return !!node.parent && ts.isParameter(node.parent) && ts.isConstructorDeclaration(node.parent.parent)
            && (ts.isParameterPropertyModifier(node.kind) || ts.isDeclarationName(node));
    }

    /**
     * Returns the immediate owning class declaration of a context token,
     * on the condition that one exists and that the context implies completion should be given.
     */
    function tryGetConstructorLikeCompletionContainer(contextToken: ts.Node): ts.ConstructorDeclaration | undefined {
        if (contextToken) {
            const parent = contextToken.parent;
            switch (contextToken.kind) {
                case ts.SyntaxKind.OpenParenToken:
                case ts.SyntaxKind.CommaToken:
                    return ts.isConstructorDeclaration(contextToken.parent) ? contextToken.parent : undefined;

                default:
                    if (isConstructorParameterCompletion(contextToken)) {
                        return parent.parent as ts.ConstructorDeclaration;
                    }
            }
        }
        return undefined;
    }

    function tryGetFunctionLikeBodyCompletionContainer(contextToken: ts.Node): ts.FunctionLikeDeclaration | undefined {
        if (contextToken) {
            let prev: ts.Node;
            const container = ts.findAncestor(contextToken.parent, (node: ts.Node) => {
                if (ts.isClassLike(node)) {
                    return "quit";
                }
                if (ts.isFunctionLikeDeclaration(node) && prev === node.body) {
                    return true;
                }
                prev = node;
                return false;
            });
            return container && container as ts.FunctionLikeDeclaration;
        }
    }

    function tryGetContainingJsxElement(contextToken: ts.Node): ts.JsxOpeningLikeElement | undefined {
        if (contextToken) {
            const parent = contextToken.parent;
            switch (contextToken.kind) {
                case ts.SyntaxKind.GreaterThanToken: // End of a type argument list
                case ts.SyntaxKind.LessThanSlashToken:
                case ts.SyntaxKind.SlashToken:
                case ts.SyntaxKind.Identifier:
                case ts.SyntaxKind.PropertyAccessExpression:
                case ts.SyntaxKind.JsxAttributes:
                case ts.SyntaxKind.JsxAttribute:
                case ts.SyntaxKind.JsxSpreadAttribute:
                    if (parent && (parent.kind === ts.SyntaxKind.JsxSelfClosingElement || parent.kind === ts.SyntaxKind.JsxOpeningElement)) {
                        if (contextToken.kind === ts.SyntaxKind.GreaterThanToken) {
                            const precedingToken = ts.findPrecedingToken(contextToken.pos, sourceFile, /*startNode*/ undefined);
                            if (!(parent as ts.JsxOpeningLikeElement).typeArguments || (precedingToken && precedingToken.kind === ts.SyntaxKind.SlashToken)) break;
                        }
                        return parent as ts.JsxOpeningLikeElement;
                    }
                    else if (parent.kind === ts.SyntaxKind.JsxAttribute) {
                        // Currently we parse JsxOpeningLikeElement as:
                        //      JsxOpeningLikeElement
                        //          attributes: JsxAttributes
                        //             properties: NodeArray<JsxAttributeLike>
                        return parent.parent.parent as ts.JsxOpeningLikeElement;
                    }
                    break;

                // The context token is the closing } or " of an attribute, which means
                // its parent is a JsxExpression, whose parent is a JsxAttribute,
                // whose parent is a JsxOpeningLikeElement
                case ts.SyntaxKind.StringLiteral:
                    if (parent && ((parent.kind === ts.SyntaxKind.JsxAttribute) || (parent.kind === ts.SyntaxKind.JsxSpreadAttribute))) {
                        // Currently we parse JsxOpeningLikeElement as:
                        //      JsxOpeningLikeElement
                        //          attributes: JsxAttributes
                        //             properties: NodeArray<JsxAttributeLike>
                        return parent.parent.parent as ts.JsxOpeningLikeElement;
                    }

                    break;

                case ts.SyntaxKind.CloseBraceToken:
                    if (parent &&
                        parent.kind === ts.SyntaxKind.JsxExpression &&
                        parent.parent && parent.parent.kind === ts.SyntaxKind.JsxAttribute) {
                        // Currently we parse JsxOpeningLikeElement as:
                        //      JsxOpeningLikeElement
                        //          attributes: JsxAttributes
                        //             properties: NodeArray<JsxAttributeLike>
                        //                  each JsxAttribute can have initializer as JsxExpression
                        return parent.parent.parent.parent as ts.JsxOpeningLikeElement;
                    }

                    if (parent && parent.kind === ts.SyntaxKind.JsxSpreadAttribute) {
                        // Currently we parse JsxOpeningLikeElement as:
                        //      JsxOpeningLikeElement
                        //          attributes: JsxAttributes
                        //             properties: NodeArray<JsxAttributeLike>
                        return parent.parent.parent as ts.JsxOpeningLikeElement;
                    }

                    break;
            }
        }
        return undefined;
    }

    /**
     * @returns true if we are certain that the currently edited location must define a new location; false otherwise.
     */
    function isSolelyIdentifierDefinitionLocation(contextToken: ts.Node): boolean {
        const parent = contextToken.parent;
        const containingNodeKind = parent.kind;
        switch (contextToken.kind) {
            case ts.SyntaxKind.CommaToken:
                return containingNodeKind === ts.SyntaxKind.VariableDeclaration ||
                    isVariableDeclarationListButNotTypeArgument(contextToken) ||
                    containingNodeKind === ts.SyntaxKind.VariableStatement ||
                    containingNodeKind === ts.SyntaxKind.EnumDeclaration ||                        // enum a { foo, |
                    isFunctionLikeButNotConstructor(containingNodeKind) ||
                    containingNodeKind === ts.SyntaxKind.InterfaceDeclaration ||                   // interface A<T, |
                    containingNodeKind === ts.SyntaxKind.ArrayBindingPattern ||                    // var [x, y|
                    containingNodeKind === ts.SyntaxKind.TypeAliasDeclaration ||                   // type Map, K, |
                    // class A<T, |
                    // var C = class D<T, |
                    (ts.isClassLike(parent) &&
                        !!parent.typeParameters &&
                        parent.typeParameters.end >= contextToken.pos);

            case ts.SyntaxKind.DotToken:
                return containingNodeKind === ts.SyntaxKind.ArrayBindingPattern;                   // var [.|

            case ts.SyntaxKind.ColonToken:
                return containingNodeKind === ts.SyntaxKind.BindingElement;                        // var {x :html|

            case ts.SyntaxKind.OpenBracketToken:
                return containingNodeKind === ts.SyntaxKind.ArrayBindingPattern;                   // var [x|

            case ts.SyntaxKind.OpenParenToken:
                return containingNodeKind === ts.SyntaxKind.CatchClause ||
                    isFunctionLikeButNotConstructor(containingNodeKind);

            case ts.SyntaxKind.OpenBraceToken:
                return containingNodeKind === ts.SyntaxKind.EnumDeclaration;                       // enum a { |

            case ts.SyntaxKind.LessThanToken:
                return containingNodeKind === ts.SyntaxKind.ClassDeclaration ||                    // class A< |
                    containingNodeKind === ts.SyntaxKind.ClassExpression ||                        // var C = class D< |
                    containingNodeKind === ts.SyntaxKind.InterfaceDeclaration ||                   // interface A< |
                    containingNodeKind === ts.SyntaxKind.TypeAliasDeclaration ||                   // type List< |
                    ts.isFunctionLikeKind(containingNodeKind);

            case ts.SyntaxKind.StaticKeyword:
                return containingNodeKind === ts.SyntaxKind.PropertyDeclaration && !ts.isClassLike(parent.parent);

            case ts.SyntaxKind.DotDotDotToken:
                return containingNodeKind === ts.SyntaxKind.Parameter ||
                    (!!parent.parent && parent.parent.kind === ts.SyntaxKind.ArrayBindingPattern);  // var [...z|

            case ts.SyntaxKind.PublicKeyword:
            case ts.SyntaxKind.PrivateKeyword:
            case ts.SyntaxKind.ProtectedKeyword:
                return containingNodeKind === ts.SyntaxKind.Parameter && !ts.isConstructorDeclaration(parent.parent);

            case ts.SyntaxKind.AsKeyword:
                return containingNodeKind === ts.SyntaxKind.ImportSpecifier ||
                    containingNodeKind === ts.SyntaxKind.ExportSpecifier ||
                    containingNodeKind === ts.SyntaxKind.NamespaceImport;

            case ts.SyntaxKind.GetKeyword:
            case ts.SyntaxKind.SetKeyword:
                return !isFromObjectTypeDeclaration(contextToken);

            case ts.SyntaxKind.Identifier:
                if (containingNodeKind === ts.SyntaxKind.ImportSpecifier &&
                    contextToken === (parent as ts.ImportSpecifier).name &&
                    (contextToken as ts.Identifier).text === "type"
                ) {
                    // import { type | }
                    return false;
                }
                break;

            case ts.SyntaxKind.ClassKeyword:
            case ts.SyntaxKind.EnumKeyword:
            case ts.SyntaxKind.InterfaceKeyword:
            case ts.SyntaxKind.FunctionKeyword:
            case ts.SyntaxKind.VarKeyword:
            case ts.SyntaxKind.ImportKeyword:
            case ts.SyntaxKind.LetKeyword:
            case ts.SyntaxKind.ConstKeyword:
            case ts.SyntaxKind.InferKeyword:
                return true;

            case ts.SyntaxKind.TypeKeyword:
                // import { type foo| }
                return containingNodeKind !== ts.SyntaxKind.ImportSpecifier;

            case ts.SyntaxKind.AsteriskToken:
                return ts.isFunctionLike(contextToken.parent) && !ts.isMethodDeclaration(contextToken.parent);
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
            if (!ts.isIdentifier(contextToken) ||
                ts.isParameterPropertyModifier(keywordForNode(contextToken)) ||
                isCurrentlyEditingNode(contextToken)) {
                return false;
            }
        }

        // Previous token may have been a keyword that was converted to an identifier.
        switch (keywordForNode(contextToken)) {
            case ts.SyntaxKind.AbstractKeyword:
            case ts.SyntaxKind.ClassKeyword:
            case ts.SyntaxKind.ConstKeyword:
            case ts.SyntaxKind.DeclareKeyword:
            case ts.SyntaxKind.EnumKeyword:
            case ts.SyntaxKind.FunctionKeyword:
            case ts.SyntaxKind.InterfaceKeyword:
            case ts.SyntaxKind.LetKeyword:
            case ts.SyntaxKind.PrivateKeyword:
            case ts.SyntaxKind.ProtectedKeyword:
            case ts.SyntaxKind.PublicKeyword:
            case ts.SyntaxKind.StaticKeyword:
            case ts.SyntaxKind.VarKeyword:
                return true;
            case ts.SyntaxKind.AsyncKeyword:
                return ts.isPropertyDeclaration(contextToken.parent);
        }

        // If we are inside a class declaration, and `constructor` is totally not present,
        // but we request a completion manually at a whitespace...
        const ancestorClassLike = ts.findAncestor(contextToken.parent, ts.isClassLike);
        if (ancestorClassLike && contextToken === previousToken && isPreviousPropertyDeclarationTerminated(contextToken, position)) {
            return false; // Don't block completions.
        }

        const ancestorPropertyDeclaraion = ts.getAncestor(contextToken.parent, ts.SyntaxKind.PropertyDeclaration);
        // If we are inside a class declaration and typing `constructor` after property declaration...
        if (ancestorPropertyDeclaraion
            && contextToken !== previousToken
            && ts.isClassLike(previousToken.parent.parent)
            // And the cursor is at the token...
            && position <= previousToken.end) {
            // If we are sure that the previous property declaration is terminated according to newline or semicolon...
            if (isPreviousPropertyDeclarationTerminated(contextToken, previousToken.end)) {
                return false; // Don't block completions.
            }
            else if (contextToken.kind !== ts.SyntaxKind.EqualsToken
                // Should not block: `class C { blah = c/**/ }`
                // But should block: `class C { blah = somewhat c/**/ }` and `class C { blah: SomeType c/**/ }`
                && (ts.isInitializedProperty(ancestorPropertyDeclaraion as ts.PropertyDeclaration)
                || ts.hasType(ancestorPropertyDeclaraion))) {
                return true;
            }
        }

        return ts.isDeclarationName(contextToken)
            && !ts.isShorthandPropertyAssignment(contextToken.parent)
            && !ts.isJsxAttribute(contextToken.parent)
            // Don't block completions if we're in `class C /**/`, because we're *past* the end of the identifier and might want to complete `extends`.
            // If `contextToken !== previousToken`, this is `class C ex/**/`.
            && !(ts.isClassLike(contextToken.parent) && (contextToken !== previousToken || position > previousToken.end));
    }

    function isPreviousPropertyDeclarationTerminated(contextToken: ts.Node, position: number) {
        return contextToken.kind !== ts.SyntaxKind.EqualsToken &&
            (contextToken.kind === ts.SyntaxKind.SemicolonToken
            || !ts.positionsAreOnSameLine(contextToken.end, position, sourceFile));
    }

    function isFunctionLikeButNotConstructor(kind: ts.SyntaxKind) {
        return ts.isFunctionLikeKind(kind) && kind !== ts.SyntaxKind.Constructor;
    }

    function isDotOfNumericLiteral(contextToken: ts.Node): boolean {
        if (contextToken.kind === ts.SyntaxKind.NumericLiteral) {
            const text = contextToken.getFullText();
            return text.charAt(text.length - 1) === ".";
        }

        return false;
    }

    function isVariableDeclarationListButNotTypeArgument(node: ts.Node): boolean {
        return node.parent.kind === ts.SyntaxKind.VariableDeclarationList
            && !ts.isPossiblyTypeArgumentPosition(node, sourceFile, typeChecker);
    }

    /**
     * Filters out completion suggestions for named imports or exports.
     *
     * @returns Symbols to be suggested in an object binding pattern or object literal expression, barring those whose declarations
     *          do not occur at the current position and have not otherwise been typed.
     */
    function filterObjectMembersList(contextualMemberSymbols: ts.Symbol[], existingMembers: readonly ts.Declaration[]): ts.Symbol[] {
        if (existingMembers.length === 0) {
            return contextualMemberSymbols;
        }

        const membersDeclaredBySpreadAssignment = new ts.Set<string>();
        const existingMemberNames = new ts.Set<ts.__String>();
        for (const m of existingMembers) {
            // Ignore omitted expressions for missing members
            if (m.kind !== ts.SyntaxKind.PropertyAssignment &&
                m.kind !== ts.SyntaxKind.ShorthandPropertyAssignment &&
                m.kind !== ts.SyntaxKind.BindingElement &&
                m.kind !== ts.SyntaxKind.MethodDeclaration &&
                m.kind !== ts.SyntaxKind.GetAccessor &&
                m.kind !== ts.SyntaxKind.SetAccessor &&
                m.kind !== ts.SyntaxKind.SpreadAssignment) {
                continue;
            }

            // If this is the current item we are editing right now, do not filter it out
            if (isCurrentlyEditingNode(m)) {
                continue;
            }

            let existingName: ts.__String | undefined;

            if (ts.isSpreadAssignment(m)) {
                setMembersDeclaredBySpreadAssignment(m, membersDeclaredBySpreadAssignment);
            }
            else if (ts.isBindingElement(m) && m.propertyName) {
                // include only identifiers in completion list
                if (m.propertyName.kind === ts.SyntaxKind.Identifier) {
                    existingName = m.propertyName.escapedText;
                }
            }
            else {
                // TODO: Account for computed property name
                // NOTE: if one only performs this step when m.name is an identifier,
                // things like '__proto__' are not filtered out.
                const name = ts.getNameOfDeclaration(m);
                existingName = name && ts.isPropertyNameLiteral(name) ? ts.getEscapedTextOfIdentifierOrLiteral(name) : undefined;
            }

            if (existingName !== undefined) {
                existingMemberNames.add(existingName);
            }
        }

        const filteredSymbols = contextualMemberSymbols.filter(m => !existingMemberNames.has(m.escapedName));
        setSortTextToMemberDeclaredBySpreadAssignment(membersDeclaredBySpreadAssignment, filteredSymbols);

        return filteredSymbols;
    }

    function setMembersDeclaredBySpreadAssignment(declaration: ts.SpreadAssignment | ts.JsxSpreadAttribute, membersDeclaredBySpreadAssignment: ts.Set<string>) {
        const expression = declaration.expression;
        const symbol = typeChecker.getSymbolAtLocation(expression);
        const type = symbol && typeChecker.getTypeOfSymbolAtLocation(symbol, expression);
        const properties = type && (type as ts.ObjectType).properties;
        if (properties) {
            properties.forEach(property => {
                membersDeclaredBySpreadAssignment.add(property.name);
            });
        }
    }

    // Set SortText to OptionalMember if it is an optional member
    function setSortTextToOptionalMember() {
        symbols.forEach(m => {
            if (m.flags & ts.SymbolFlags.Optional) {
                const symbolId = ts.getSymbolId(m);
                symbolToSortTextMap[symbolId] = symbolToSortTextMap[symbolId] ?? SortText.OptionalMember;
            }
        });
    }

    // Set SortText to MemberDeclaredBySpreadAssignment if it is fulfilled by spread assignment
    function setSortTextToMemberDeclaredBySpreadAssignment(membersDeclaredBySpreadAssignment: ts.Set<string>, contextualMemberSymbols: ts.Symbol[]): void {
        if (membersDeclaredBySpreadAssignment.size === 0) {
            return;
        }
        for (const contextualMemberSymbol of contextualMemberSymbols) {
            if (membersDeclaredBySpreadAssignment.has(contextualMemberSymbol.name)) {
                symbolToSortTextMap[ts.getSymbolId(contextualMemberSymbol)] = SortText.MemberDeclaredBySpreadAssignment;
            }
        }
    }

    function transformObjectLiteralMembersSortText(start: number): void {
        for (let i = start; i < symbols.length; i++) {
            const symbol = symbols[i];
            const symbolId = ts.getSymbolId(symbol);
            const origin = symbolToOriginInfoMap?.[i];
            const target = ts.getEmitScriptTarget(compilerOptions);
            const displayName = getCompletionEntryDisplayNameForSymbol(
                symbol,
                target,
                origin,
                CompletionKind.ObjectPropertyDeclaration,
                /*jsxIdentifierExpected*/ false);
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
    function filterClassMembersList(baseSymbols: readonly ts.Symbol[], existingMembers: readonly ts.ClassElement[], currentClassElementModifierFlags: ts.ModifierFlags): ts.Symbol[] {
        const existingMemberNames = new ts.Set<ts.__String>();
        for (const m of existingMembers) {
            // Ignore omitted expressions for missing members
            if (m.kind !== ts.SyntaxKind.PropertyDeclaration &&
                m.kind !== ts.SyntaxKind.MethodDeclaration &&
                m.kind !== ts.SyntaxKind.GetAccessor &&
                m.kind !== ts.SyntaxKind.SetAccessor) {
                continue;
            }

            // If this is the current item we are editing right now, do not filter it out
            if (isCurrentlyEditingNode(m)) {
                continue;
            }

            // Dont filter member even if the name matches if it is declared private in the list
            if (ts.hasEffectiveModifier(m, ts.ModifierFlags.Private)) {
                continue;
            }

            // do not filter it out if the static presence doesnt match
            if (ts.isStatic(m) !== !!(currentClassElementModifierFlags & ts.ModifierFlags.Static)) {
                continue;
            }

            const existingName = ts.getPropertyNameForPropertyNameNode(m.name!);
            if (existingName) {
                existingMemberNames.add(existingName);
            }
        }

        return baseSymbols.filter(propertySymbol =>
            !existingMemberNames.has(propertySymbol.escapedName) &&
            !!propertySymbol.declarations &&
            !(ts.getDeclarationModifierFlagsFromSymbol(propertySymbol) & ts.ModifierFlags.Private) &&
            !(propertySymbol.valueDeclaration && ts.isPrivateIdentifierClassElementDeclaration(propertySymbol.valueDeclaration)));
    }

    /**
     * Filters out completion suggestions from 'symbols' according to existing JSX attributes.
     *
     * @returns Symbols to be suggested in a JSX element, barring those whose attributes
     *          do not occur at the current position and have not otherwise been typed.
     */
    function filterJsxAttributes(symbols: ts.Symbol[], attributes: ts.NodeArray<ts.JsxAttribute | ts.JsxSpreadAttribute>): ts.Symbol[] {
        const seenNames = new ts.Set<ts.__String>();
        const membersDeclaredBySpreadAssignment = new ts.Set<string>();
        for (const attr of attributes) {
            // If this is the current item we are editing right now, do not filter it out
            if (isCurrentlyEditingNode(attr)) {
                continue;
            }

            if (attr.kind === ts.SyntaxKind.JsxAttribute) {
                seenNames.add(attr.name.escapedText);
            }
            else if (ts.isJsxSpreadAttribute(attr)) {
                setMembersDeclaredBySpreadAssignment(attr, membersDeclaredBySpreadAssignment);
            }
        }
        const filteredSymbols = symbols.filter(a => !seenNames.has(a.escapedName));

        setSortTextToMemberDeclaredBySpreadAssignment(membersDeclaredBySpreadAssignment, filteredSymbols);

        return filteredSymbols;
    }

    function isCurrentlyEditingNode(node: ts.Node): boolean {
        return node.getStart(sourceFile) <= position && position <= node.getEnd();
    }
}

/**
 * Returns the immediate owning object literal or binding pattern of a context token,
 * on the condition that one exists and that the context implies completion should be given.
 */
function tryGetObjectLikeCompletionContainer(contextToken: ts.Node | undefined): ts.ObjectLiteralExpression | ts.ObjectBindingPattern | undefined {
    if (contextToken) {
        const { parent } = contextToken;
        switch (contextToken.kind) {
            case ts.SyntaxKind.OpenBraceToken:  // const x = { |
            case ts.SyntaxKind.CommaToken:      // const x = { a: 0, |
                if (ts.isObjectLiteralExpression(parent) || ts.isObjectBindingPattern(parent)) {
                    return parent;
                }
                break;
            case ts.SyntaxKind.AsteriskToken:
                return ts.isMethodDeclaration(parent) ? ts.tryCast(parent.parent, ts.isObjectLiteralExpression) : undefined;
            case ts.SyntaxKind.Identifier:
                return (contextToken as ts.Identifier).text === "async" && ts.isShorthandPropertyAssignment(contextToken.parent)
                    ? contextToken.parent.parent : undefined;
        }
    }

    return undefined;
}

function getRelevantTokens(position: number, sourceFile: ts.SourceFile): { contextToken: ts.Node, previousToken: ts.Node } | { contextToken: undefined, previousToken: undefined } {
    const previousToken = ts.findPrecedingToken(position, sourceFile);
    if (previousToken && position <= previousToken.end && (ts.isMemberName(previousToken) || ts.isKeyword(previousToken.kind))) {
        const contextToken = ts.findPrecedingToken(previousToken.getFullStart(), sourceFile, /*startNode*/ undefined)!; // TODO: GH#18217
        return { contextToken, previousToken };
    }
    return { contextToken: previousToken as ts.Node, previousToken: previousToken as ts.Node };
}

function getAutoImportSymbolFromCompletionEntryData(name: string, data: ts.CompletionEntryData, program: ts.Program, host: ts.LanguageServiceHost): { symbol: ts.Symbol, origin: SymbolOriginInfoExport | SymbolOriginInfoResolvedExport } | undefined {
    const containingProgram = data.isPackageJsonImport ? host.getPackageJsonAutoImportProvider!()! : program;
    const checker = containingProgram.getTypeChecker();
    const moduleSymbol =
        data.ambientModuleName ? checker.tryFindAmbientModule(data.ambientModuleName) :
        data.fileName ? checker.getMergedSymbol(ts.Debug.checkDefined(containingProgram.getSourceFile(data.fileName)).symbol) :
        undefined;

    if (!moduleSymbol) return undefined;
    let symbol = data.exportName === ts.InternalSymbolName.ExportEquals
        ? checker.resolveExternalModuleSymbol(moduleSymbol)
        : checker.tryGetMemberInModuleExportsAndProperties(data.exportName, moduleSymbol);
    if (!symbol) return undefined;
    const isDefaultExport = data.exportName === ts.InternalSymbolName.Default;
    symbol = isDefaultExport && ts.getLocalSymbolForExportDefault(symbol) || symbol;
    return { symbol, origin: completionEntryDataToSymbolOriginInfo(data, name, moduleSymbol) };
}

interface CompletionEntryDisplayNameForSymbol {
    readonly name: string;
    readonly needsConvertPropertyAccess: boolean;
}
function getCompletionEntryDisplayNameForSymbol(
    symbol: ts.Symbol,
    target: ts.ScriptTarget,
    origin: SymbolOriginInfo | undefined,
    kind: CompletionKind,
    jsxIdentifierExpected: boolean,
): CompletionEntryDisplayNameForSymbol | undefined {
    const name = originIncludesSymbolName(origin) ? origin.symbolName : symbol.name;
    if (name === undefined
        // If the symbol is external module, don't show it in the completion list
        // (i.e declare module "http" { const x; } | // <= request completion here, "http" should not be there)
        || symbol.flags & ts.SymbolFlags.Module && ts.isSingleOrDoubleQuote(name.charCodeAt(0))
        // If the symbol is the internal name of an ES symbol, it is not a valid entry. Internal names for ES symbols start with "__@"
        || ts.isKnownSymbol(symbol)) {
        return undefined;
    }

    const validNameResult: CompletionEntryDisplayNameForSymbol = { name, needsConvertPropertyAccess: false };
    if (ts.isIdentifierText(name, target, jsxIdentifierExpected ? ts.LanguageVariant.JSX : ts.LanguageVariant.Standard) || symbol.valueDeclaration && ts.isPrivateIdentifierClassElementDeclaration(symbol.valueDeclaration)) {
        return validNameResult;
    }
    switch (kind) {
        case CompletionKind.MemberLike:
            return undefined;
        case CompletionKind.ObjectPropertyDeclaration:
            // TODO: GH#18169
            return { name: JSON.stringify(name), needsConvertPropertyAccess: false };
        case CompletionKind.PropertyAccess:
        case CompletionKind.Global: // For a 'this.' completion it will be in a global context, but may have a non-identifier name.
            // Don't add a completion for a name starting with a space. See https://github.com/Microsoft/TypeScript/pull/20547
            return name.charCodeAt(0) === ts.CharacterCodes.space ? undefined : { name, needsConvertPropertyAccess: true };
        case CompletionKind.None:
        case CompletionKind.String:
            return validNameResult;
        default:
            ts.Debug.assertNever(kind);
    }
}

// A cache of completion entries for keywords, these do not change between sessions
const _keywordCompletions: ts.CompletionEntry[][] = [];
const allKeywordsCompletions: () => readonly ts.CompletionEntry[] = ts.memoize(() => {
    const res: ts.CompletionEntry[] = [];
    for (let i = ts.SyntaxKind.FirstKeyword; i <= ts.SyntaxKind.LastKeyword; i++) {
        res.push({
            name: ts.tokenToString(i)!,
            kind: ts.ScriptElementKind.keyword,
            kindModifiers: ts.ScriptElementKindModifier.none,
            sortText: SortText.GlobalsOrKeywords
        });
    }
    return res;
});

function getKeywordCompletions(keywordFilter: KeywordCompletionFilters, filterOutTsOnlyKeywords: boolean): readonly ts.CompletionEntry[] {
    if (!filterOutTsOnlyKeywords) return getTypescriptKeywordCompletions(keywordFilter);

    const index = keywordFilter + KeywordCompletionFilters.Last + 1;
    return _keywordCompletions[index] ||
        (_keywordCompletions[index] = getTypescriptKeywordCompletions(keywordFilter)
            .filter(entry => !isTypeScriptOnlyKeyword(ts.stringToToken(entry.name)!))
        );
}

function getTypescriptKeywordCompletions(keywordFilter: KeywordCompletionFilters): readonly ts.CompletionEntry[] {
    return _keywordCompletions[keywordFilter] || (_keywordCompletions[keywordFilter] = allKeywordsCompletions().filter(entry => {
        const kind = ts.stringToToken(entry.name)!;
        switch (keywordFilter) {
            case KeywordCompletionFilters.None:
                return false;
            case KeywordCompletionFilters.All:
                return isFunctionLikeBodyKeyword(kind)
                    || kind === ts.SyntaxKind.DeclareKeyword
                    || kind === ts.SyntaxKind.ModuleKeyword
                    || kind === ts.SyntaxKind.TypeKeyword
                    || kind === ts.SyntaxKind.NamespaceKeyword
                    || kind === ts.SyntaxKind.AbstractKeyword
                    || ts.isTypeKeyword(kind) && kind !== ts.SyntaxKind.UndefinedKeyword;
            case KeywordCompletionFilters.FunctionLikeBodyKeywords:
                return isFunctionLikeBodyKeyword(kind);
            case KeywordCompletionFilters.ClassElementKeywords:
                return isClassMemberCompletionKeyword(kind);
            case KeywordCompletionFilters.InterfaceElementKeywords:
                return isInterfaceOrTypeLiteralCompletionKeyword(kind);
            case KeywordCompletionFilters.ConstructorParameterKeywords:
                return ts.isParameterPropertyModifier(kind);
            case KeywordCompletionFilters.TypeAssertionKeywords:
                return ts.isTypeKeyword(kind) || kind === ts.SyntaxKind.ConstKeyword;
            case KeywordCompletionFilters.TypeKeywords:
                return ts.isTypeKeyword(kind);
            case KeywordCompletionFilters.TypeKeyword:
                return kind === ts.SyntaxKind.TypeKeyword;
            default:
                return ts.Debug.assertNever(keywordFilter);
        }
    }));
}

function isTypeScriptOnlyKeyword(kind: ts.SyntaxKind) {
    switch (kind) {
        case ts.SyntaxKind.AbstractKeyword:
        case ts.SyntaxKind.AnyKeyword:
        case ts.SyntaxKind.BigIntKeyword:
        case ts.SyntaxKind.BooleanKeyword:
        case ts.SyntaxKind.DeclareKeyword:
        case ts.SyntaxKind.EnumKeyword:
        case ts.SyntaxKind.GlobalKeyword:
        case ts.SyntaxKind.ImplementsKeyword:
        case ts.SyntaxKind.InferKeyword:
        case ts.SyntaxKind.InterfaceKeyword:
        case ts.SyntaxKind.IsKeyword:
        case ts.SyntaxKind.KeyOfKeyword:
        case ts.SyntaxKind.ModuleKeyword:
        case ts.SyntaxKind.NamespaceKeyword:
        case ts.SyntaxKind.NeverKeyword:
        case ts.SyntaxKind.NumberKeyword:
        case ts.SyntaxKind.ObjectKeyword:
        case ts.SyntaxKind.OverrideKeyword:
        case ts.SyntaxKind.PrivateKeyword:
        case ts.SyntaxKind.ProtectedKeyword:
        case ts.SyntaxKind.PublicKeyword:
        case ts.SyntaxKind.ReadonlyKeyword:
        case ts.SyntaxKind.StringKeyword:
        case ts.SyntaxKind.SymbolKeyword:
        case ts.SyntaxKind.TypeKeyword:
        case ts.SyntaxKind.UniqueKeyword:
        case ts.SyntaxKind.UnknownKeyword:
            return true;
        default:
            return false;
    }
}

function isInterfaceOrTypeLiteralCompletionKeyword(kind: ts.SyntaxKind): boolean {
    return kind === ts.SyntaxKind.ReadonlyKeyword;
}

function isClassMemberCompletionKeyword(kind: ts.SyntaxKind) {
    switch (kind) {
        case ts.SyntaxKind.AbstractKeyword:
        case ts.SyntaxKind.AccessorKeyword:
        case ts.SyntaxKind.ConstructorKeyword:
        case ts.SyntaxKind.GetKeyword:
        case ts.SyntaxKind.SetKeyword:
        case ts.SyntaxKind.AsyncKeyword:
        case ts.SyntaxKind.DeclareKeyword:
        case ts.SyntaxKind.OverrideKeyword:
            return true;
        default:
            return ts.isClassMemberModifier(kind);
    }
}

function isFunctionLikeBodyKeyword(kind: ts.SyntaxKind) {
    return kind === ts.SyntaxKind.AsyncKeyword
        || kind === ts.SyntaxKind.AwaitKeyword
        || kind === ts.SyntaxKind.AsKeyword
        || kind === ts.SyntaxKind.SatisfiesKeyword
        || kind === ts.SyntaxKind.TypeKeyword
        || !ts.isContextualKeyword(kind) && !isClassMemberCompletionKeyword(kind);
}

function keywordForNode(node: ts.Node): ts.SyntaxKind {
    return ts.isIdentifier(node) ? node.originalKeywordKind || ts.SyntaxKind.Unknown : node.kind;
}

function getContextualKeywords(
    contextToken: ts.Node | undefined,
    position: number,
): readonly ts.CompletionEntry[] {
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
        if ((ts.isImportDeclaration(parent) || ts.isExportDeclaration(parent) && parent.moduleSpecifier)
            && contextToken === parent.moduleSpecifier
            && tokenLine === currentLine) {
            entries.push({
                name: ts.tokenToString(ts.SyntaxKind.AssertKeyword)!,
                kind: ts.ScriptElementKind.keyword,
                kindModifiers: ts.ScriptElementKindModifier.none,
                sortText: SortText.GlobalsOrKeywords,
            });
        }
    }
    return entries;
}

/** Get the corresponding JSDocTag node if the position is in a jsDoc comment */
function getJsDocTagAtPosition(node: ts.Node, position: number): ts.JSDocTag | undefined {
    return ts.findAncestor(node, n =>
        ts.isJSDocTag(n) && ts.rangeContainsPosition(n, position) ? true :
            ts.isJSDoc(n) ? "quit" : false) as ts.JSDocTag | undefined;
}

/** @internal */
export function getPropertiesForObjectExpression(contextualType: ts.Type, completionsType: ts.Type | undefined, obj: ts.ObjectLiteralExpression | ts.JsxAttributes, checker: ts.TypeChecker): ts.Symbol[] {
    const hasCompletionsType = completionsType && completionsType !== contextualType;
    const type = hasCompletionsType && !(completionsType.flags & ts.TypeFlags.AnyOrUnknown)
        ? checker.getUnionType([contextualType, completionsType])
        : contextualType;

    const properties = getApparentProperties(type, obj, checker);
    return type.isClass() && containsNonPublicProperties(properties) ? [] :
        hasCompletionsType ? ts.filter(properties, hasDeclarationOtherThanSelf) : properties;

    // Filter out members whose only declaration is the object literal itself to avoid
    // self-fulfilling completions like:
    //
    // function f<T>(x: T) {}
    // f({ abc/**/: "" }) // `abc` is a member of `T` but only because it declares itself
    function hasDeclarationOtherThanSelf(member: ts.Symbol) {
        if (!ts.length(member.declarations)) return true;
        return ts.some(member.declarations, decl => decl.parent !== obj);
    }
}

function getApparentProperties(type: ts.Type, node: ts.ObjectLiteralExpression | ts.JsxAttributes, checker: ts.TypeChecker) {
    if (!type.isUnion()) return type.getApparentProperties();
    return checker.getAllPossiblePropertiesOfTypes(ts.filter(type.types, memberType =>
        !(memberType.flags & ts.TypeFlags.Primitive
            || checker.isArrayLikeType(memberType)
            || checker.isTypeInvalidDueToUnionDiscriminant(memberType, node)
            || ts.typeHasCallOrConstructSignatures(memberType, checker)
            || memberType.isClass() && containsNonPublicProperties(memberType.getApparentProperties()))));
}

function containsNonPublicProperties(props: ts.Symbol[]) {
    return ts.some(props, p => !!(ts.getDeclarationModifierFlagsFromSymbol(p) & ts.ModifierFlags.NonPublicAccessibilityModifier));
}

/**
 * Gets all properties on a type, but if that type is a union of several types,
 * excludes array-like types or callable/constructable types.
 */
function getPropertiesForCompletion(type: ts.Type, checker: ts.TypeChecker): ts.Symbol[] {
    return type.isUnion()
        ? ts.Debug.checkEachDefined(checker.getAllPossiblePropertiesOfTypes(type.types), "getAllPossiblePropertiesOfTypes() should all be defined")
        : ts.Debug.checkEachDefined(type.getApparentProperties(), "getApparentProperties() should all be defined");
}

/**
 * Returns the immediate owning class declaration of a context token,
 * on the condition that one exists and that the context implies completion should be given.
 */
function tryGetObjectTypeDeclarationCompletionContainer(sourceFile: ts.SourceFile, contextToken: ts.Node | undefined, location: ts.Node, position: number): ts.ObjectTypeDeclaration | undefined {
    // class c { method() { } | method2() { } }
    switch (location.kind) {
        case ts.SyntaxKind.SyntaxList:
            return ts.tryCast(location.parent, ts.isObjectTypeDeclaration);
        case ts.SyntaxKind.EndOfFileToken:
            const cls = ts.tryCast(ts.lastOrUndefined(ts.cast(location.parent, ts.isSourceFile).statements), ts.isObjectTypeDeclaration);
            if (cls && !ts.findChildOfKind(cls, ts.SyntaxKind.CloseBraceToken, sourceFile)) {
                return cls;
            }
            break;
       case ts.SyntaxKind.Identifier: {
            const originalKeywordKind = (location as ts.Identifier).originalKeywordKind;
            if (originalKeywordKind && ts.isKeyword(originalKeywordKind)) {
                return undefined;
            }
            // class c { public prop = c| }
            if (ts.isPropertyDeclaration(location.parent) && location.parent.initializer === location) {
                return undefined;
            }
            // class c extends React.Component { a: () => 1\n compon| }
            if (isFromObjectTypeDeclaration(location)) {
                return ts.findAncestor(location, ts.isObjectTypeDeclaration);
            }
        }
    }

    if (!contextToken) return undefined;

    // class C { blah; constructor/**/ } and so on
    if (location.kind === ts.SyntaxKind.ConstructorKeyword
        // class C { blah \n constructor/**/ }
        || (ts.isIdentifier(contextToken) && ts.isPropertyDeclaration(contextToken.parent) && ts.isClassLike(location))) {
        return ts.findAncestor(contextToken, ts.isClassLike) as ts.ObjectTypeDeclaration;
    }

    switch (contextToken.kind) {
        case ts.SyntaxKind.EqualsToken: // class c { public prop = | /* global completions */ }
            return undefined;

        case ts.SyntaxKind.SemicolonToken: // class c {getValue(): number; | }
        case ts.SyntaxKind.CloseBraceToken: // class c { method() { } | }
            // class c { method() { } b| }
            return isFromObjectTypeDeclaration(location) && (location.parent as ts.ClassElement | ts.TypeElement).name === location
                ? location.parent.parent as ts.ObjectTypeDeclaration
                : ts.tryCast(location, ts.isObjectTypeDeclaration);
        case ts.SyntaxKind.OpenBraceToken: // class c { |
        case ts.SyntaxKind.CommaToken: // class c {getValue(): number, | }
            return ts.tryCast(contextToken.parent, ts.isObjectTypeDeclaration);
        default:
            if (!isFromObjectTypeDeclaration(contextToken)) {
                // class c extends React.Component { a: () => 1\n| }
                if (ts.getLineAndCharacterOfPosition(sourceFile, contextToken.getEnd()).line !== ts.getLineAndCharacterOfPosition(sourceFile, position).line && ts.isObjectTypeDeclaration(location)) {
                    return location;
                }
                return undefined;
            }
            const isValidKeyword = ts.isClassLike(contextToken.parent.parent) ? isClassMemberCompletionKeyword : isInterfaceOrTypeLiteralCompletionKeyword;
            return (isValidKeyword(contextToken.kind) || contextToken.kind === ts.SyntaxKind.AsteriskToken || ts.isIdentifier(contextToken) && isValidKeyword(ts.stringToToken(contextToken.text)!)) // TODO: GH#18217
                ? contextToken.parent.parent as ts.ObjectTypeDeclaration : undefined;
    }
}

function tryGetTypeLiteralNode(node: ts.Node): ts.TypeLiteralNode | undefined {
    if (!node) return undefined;

    const parent = node.parent;

    switch (node.kind) {
        case ts.SyntaxKind.OpenBraceToken:
            if (ts.isTypeLiteralNode(parent)) {
                return parent;
            }
            break;
        case ts.SyntaxKind.SemicolonToken:
        case ts.SyntaxKind.CommaToken:
        case ts.SyntaxKind.Identifier:
            if (parent.kind === ts.SyntaxKind.PropertySignature && ts.isTypeLiteralNode(parent.parent)) {
                return parent.parent;
            }
            break;
    }

    return undefined;
}

function getConstraintOfTypeArgumentProperty(node: ts.Node, checker: ts.TypeChecker): ts.Type | undefined {
    if (!node) return undefined;

    if (ts.isTypeNode(node) && ts.isTypeReferenceType(node.parent)) {
        return checker.getTypeArgumentConstraint(node);
    }

    const t = getConstraintOfTypeArgumentProperty(node.parent, checker);
    if (!t) return undefined;

    switch (node.kind) {
        case ts.SyntaxKind.PropertySignature:
            return checker.getTypeOfPropertyOfContextualType(t, node.symbol.escapedName);
        case ts.SyntaxKind.IntersectionType:
        case ts.SyntaxKind.TypeLiteral:
        case ts.SyntaxKind.UnionType:
            return t;
    }
}

// TODO: GH#19856 Would like to return `node is Node & { parent: (ClassElement | TypeElement) & { parent: ObjectTypeDeclaration } }` but then compilation takes > 10 minutes
function isFromObjectTypeDeclaration(node: ts.Node): boolean {
    return node.parent && ts.isClassOrTypeElement(node.parent) && ts.isObjectTypeDeclaration(node.parent.parent);
}

function isValidTrigger(sourceFile: ts.SourceFile, triggerCharacter: ts.CompletionsTriggerCharacter, contextToken: ts.Node | undefined, position: number): boolean {
    switch (triggerCharacter) {
        case ".":
        case "@":
            return true;
        case '"':
        case "'":
        case "`":
            // Only automatically bring up completions if this is an opening quote.
            return !!contextToken && ts.isStringLiteralOrTemplate(contextToken) && position === contextToken.getStart(sourceFile) + 1;
        case "#":
            return !!contextToken && ts.isPrivateIdentifier(contextToken) && !!ts.getContainingClass(contextToken);
        case "<":
            // Opening JSX tag
            return !!contextToken && contextToken.kind === ts.SyntaxKind.LessThanToken && (!ts.isBinaryExpression(contextToken.parent) || binaryExpressionMayBeOpenTag(contextToken.parent));
        case "/":
            return !!contextToken && (ts.isStringLiteralLike(contextToken)
                ? !!ts.tryGetImportFromModuleSpecifier(contextToken)
                : contextToken.kind === ts.SyntaxKind.SlashToken && ts.isJsxClosingElement(contextToken.parent));
        case " ":
            return !!contextToken && ts.isImportKeyword(contextToken) && contextToken.parent.kind === ts.SyntaxKind.SourceFile;
        default:
            return ts.Debug.assertNever(triggerCharacter);
    }
}

function binaryExpressionMayBeOpenTag({ left }: ts.BinaryExpression): boolean {
    return ts.nodeIsMissing(left);
}

/** Determines if a type is exactly the same type resolved by the global 'self', 'global', or 'globalThis'. */
function isProbablyGlobalType(type: ts.Type, sourceFile: ts.SourceFile, checker: ts.TypeChecker) {
    // The type of `self` and `window` is the same in lib.dom.d.ts, but `window` does not exist in
    // lib.webworker.d.ts, so checking against `self` is also a check against `window` when it exists.
    const selfSymbol = checker.resolveName("self", /*location*/ undefined, ts.SymbolFlags.Value, /*excludeGlobals*/ false);
    if (selfSymbol && checker.getTypeOfSymbolAtLocation(selfSymbol, sourceFile) === type) {
        return true;
    }
    const globalSymbol = checker.resolveName("global", /*location*/ undefined, ts.SymbolFlags.Value, /*excludeGlobals*/ false);
    if (globalSymbol && checker.getTypeOfSymbolAtLocation(globalSymbol, sourceFile) === type) {
        return true;
    }
    const globalThisSymbol = checker.resolveName("globalThis", /*location*/ undefined, ts.SymbolFlags.Value, /*excludeGlobals*/ false);
    if (globalThisSymbol && checker.getTypeOfSymbolAtLocation(globalThisSymbol, sourceFile) === type) {
        return true;
    }
    return false;
}

function isStaticProperty(symbol: ts.Symbol) {
    return !!(symbol.valueDeclaration && ts.getEffectiveModifierFlags(symbol.valueDeclaration) & ts.ModifierFlags.Static && ts.isClassLike(symbol.valueDeclaration.parent));
}

function tryGetObjectLiteralContextualType(node: ts.ObjectLiteralExpression, typeChecker: ts.TypeChecker) {
    const type = typeChecker.getContextualType(node);
    if (type) {
        return type;
    }
    const parent = ts.walkUpParenthesizedExpressions(node.parent);
    if (ts.isBinaryExpression(parent) && parent.operatorToken.kind === ts.SyntaxKind.EqualsToken && node === parent.left) {
        // Object literal is assignment pattern: ({ | } = x)
        return typeChecker.getTypeAtLocation(parent);
    }
    if (ts.isExpression(parent)) {
        // f(() => (({ | })));
        return typeChecker.getContextualType(parent);
    }
    return undefined;
}

interface ImportStatementCompletionInfo {
    isKeywordOnlyCompletion: boolean;
    keywordCompletion: ts.TokenSyntaxKind | undefined;
    isNewIdentifierLocation: boolean;
    isTopLevelTypeOnly: boolean;
    couldBeTypeOnlyImportSpecifier: boolean;
    replacementSpan: ts.TextSpan | undefined;
}

function getImportStatementCompletionInfo(contextToken: ts.Node): ImportStatementCompletionInfo {
    let keywordCompletion: ts.TokenSyntaxKind | undefined;
    let isKeywordOnlyCompletion = false;
    const candidate = getCandidate();
    return {
        isKeywordOnlyCompletion,
        keywordCompletion,
        isNewIdentifierLocation: !!(candidate || keywordCompletion === ts.SyntaxKind.TypeKeyword),
        isTopLevelTypeOnly: !!ts.tryCast(candidate, ts.isImportDeclaration)?.importClause?.isTypeOnly || !!ts.tryCast(candidate, ts.isImportEqualsDeclaration)?.isTypeOnly,
        couldBeTypeOnlyImportSpecifier: !!candidate && couldBeTypeOnlyImportSpecifier(candidate, contextToken),
        replacementSpan: getSingleLineReplacementSpanForImportCompletionNode(candidate),
    };

    function getCandidate() {
        const parent = contextToken.parent;
        if (ts.isImportEqualsDeclaration(parent)) {
            keywordCompletion = contextToken.kind === ts.SyntaxKind.TypeKeyword ? undefined : ts.SyntaxKind.TypeKeyword;
            return isModuleSpecifierMissingOrEmpty(parent.moduleReference) ? parent : undefined;
        }
        if (couldBeTypeOnlyImportSpecifier(parent, contextToken) && canCompleteFromNamedBindings(parent.parent)) {
            return parent;
        }
        if (ts.isNamedImports(parent) || ts.isNamespaceImport(parent)) {
            if (!parent.parent.isTypeOnly && (
                contextToken.kind === ts.SyntaxKind.OpenBraceToken ||
                contextToken.kind === ts.SyntaxKind.ImportKeyword ||
                contextToken.kind === ts.SyntaxKind.CommaToken
            )) {
                keywordCompletion = ts.SyntaxKind.TypeKeyword;
            }

            if (canCompleteFromNamedBindings(parent)) {
                // At `import { ... } |` or `import * as Foo |`, the only possible completion is `from`
                if (contextToken.kind === ts.SyntaxKind.CloseBraceToken || contextToken.kind === ts.SyntaxKind.Identifier) {
                    isKeywordOnlyCompletion = true;
                    keywordCompletion = ts.SyntaxKind.FromKeyword;
                }
                else {
                    return parent.parent.parent;
                }
            }
            return undefined;
        }
        if (ts.isImportKeyword(contextToken) && ts.isSourceFile(parent)) {
            // A lone import keyword with nothing following it does not parse as a statement at all
            keywordCompletion = ts.SyntaxKind.TypeKeyword;
            return contextToken as ts.Token<ts.SyntaxKind.ImportKeyword>;
        }
        if (ts.isImportKeyword(contextToken) && ts.isImportDeclaration(parent)) {
            // `import s| from`
            keywordCompletion = ts.SyntaxKind.TypeKeyword;
            return isModuleSpecifierMissingOrEmpty(parent.moduleSpecifier) ? parent : undefined;
        }
        return undefined;
    }
}

function getSingleLineReplacementSpanForImportCompletionNode(node: ts.ImportDeclaration | ts.ImportEqualsDeclaration | ts.ImportSpecifier | ts.Token<ts.SyntaxKind.ImportKeyword> | undefined) {
    if (!node) return undefined;
    const top = ts.findAncestor(node, ts.or(ts.isImportDeclaration, ts.isImportEqualsDeclaration)) ?? node;
    const sourceFile = top.getSourceFile();
    if (ts.rangeIsOnSingleLine(top, sourceFile)) {
        return ts.createTextSpanFromNode(top, sourceFile);
    }
    // ImportKeyword was necessarily on one line; ImportSpecifier was necessarily parented in an ImportDeclaration
    ts.Debug.assert(top.kind !== ts.SyntaxKind.ImportKeyword && top.kind !== ts.SyntaxKind.ImportSpecifier);
    // Guess which point in the import might actually be a later statement parsed as part of the import
    // during parser recovery - either in the middle of named imports, or the module specifier.
    const potentialSplitPoint = top.kind === ts.SyntaxKind.ImportDeclaration
        ? getPotentiallyInvalidImportSpecifier(top.importClause?.namedBindings) ?? top.moduleSpecifier
        : top.moduleReference;
    const withoutModuleSpecifier: ts.TextRange = {
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
    if (ts.rangeIsOnSingleLine(withoutModuleSpecifier, sourceFile)) {
        return ts.createTextSpanFromRange(withoutModuleSpecifier);
    }
}

// Tries to identify the first named import that is not really a named import, but rather
// just parser recovery for a situation like:
//   import { Foo|
//   interface Bar {}
// in which `Foo`, `interface`, and `Bar` are all parsed as import specifiers. The caller
// will also check if this token is on a separate line from the rest of the import.
function getPotentiallyInvalidImportSpecifier(namedBindings: ts.NamedImportBindings | undefined) {
    return ts.find(
        ts.tryCast(namedBindings, ts.isNamedImports)?.elements,
        e => !e.propertyName &&
            ts.isStringANonContextualKeyword(e.name.text) &&
            ts.findPrecedingToken(e.name.pos, namedBindings!.getSourceFile(), namedBindings)?.kind !== ts.SyntaxKind.CommaToken);
}

function couldBeTypeOnlyImportSpecifier(importSpecifier: ts.Node, contextToken: ts.Node | undefined): importSpecifier is ts.ImportSpecifier {
    return ts.isImportSpecifier(importSpecifier)
        && (importSpecifier.isTypeOnly || contextToken === importSpecifier.name && ts.isTypeKeywordTokenOrIdentifier(contextToken));
}

function canCompleteFromNamedBindings(namedBindings: ts.NamedImportBindings) {
    if (!isModuleSpecifierMissingOrEmpty(namedBindings.parent.parent.moduleSpecifier) || namedBindings.parent.name) {
        return false;
    }
    if (ts.isNamedImports(namedBindings)) {
        // We can only complete on named imports if there are no other named imports already,
        // but parser recovery sometimes puts later statements in the named imports list, so
        // we try to only consider the probably-valid ones.
        const invalidNamedImport = getPotentiallyInvalidImportSpecifier(namedBindings);
        const validImports = invalidNamedImport ? namedBindings.elements.indexOf(invalidNamedImport) : namedBindings.elements.length;
        return validImports < 2;
    }
    return true;
}

function isModuleSpecifierMissingOrEmpty(specifier: ts.ModuleReference | ts.Expression) {
    if (ts.nodeIsMissing(specifier)) return true;
    return !ts.tryCast(ts.isExternalModuleReference(specifier) ? specifier.expression : specifier, ts.isStringLiteralLike)?.text;
}

function getVariableDeclaration(property: ts.Node): ts.VariableDeclaration | undefined {
    const variableDeclaration = ts.findAncestor(property, node =>
        ts.isFunctionBlock(node) || isArrowFunctionBody(node) || ts.isBindingPattern(node)
            ? "quit"
            : ts.isVariableDeclaration(node));

    return variableDeclaration as ts.VariableDeclaration | undefined;
}

function isArrowFunctionBody(node: ts.Node) {
    return node.parent && ts.isArrowFunction(node.parent) && node.parent.body === node;
}

/** True if symbol is a type or a module containing at least one type. */
function symbolCanBeReferencedAtTypeLocation(symbol: ts.Symbol, checker: ts.TypeChecker, seenModules = new ts.Map<ts.SymbolId, true>()): boolean {
    // Since an alias can be merged with a local declaration, we need to test both the alias and its target.
    // This code used to just test the result of `skipAlias`, but that would ignore any locally introduced meanings.
    return nonAliasCanBeReferencedAtTypeLocation(symbol) || nonAliasCanBeReferencedAtTypeLocation(ts.skipAlias(symbol.exportSymbol || symbol, checker));

    function nonAliasCanBeReferencedAtTypeLocation(symbol: ts.Symbol): boolean {
        return !!(symbol.flags & ts.SymbolFlags.Type) || checker.isUnknownSymbol(symbol) ||
            !!(symbol.flags & ts.SymbolFlags.Module) && ts.addToSeen(seenModules, ts.getSymbolId(symbol)) &&
            checker.getExportsOfModule(symbol).some(e => symbolCanBeReferencedAtTypeLocation(e, checker, seenModules));
    }
}

function isDeprecated(symbol: ts.Symbol, checker: ts.TypeChecker) {
    const declarations = ts.skipAlias(symbol, checker).declarations;
    return !!ts.length(declarations) && ts.every(declarations, ts.isDeprecatedDeclaration);
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
            matchedFirstCharacter ||=
                prevChar === undefined || // Beginning of word
                ts.CharacterCodes.a <= prevChar && prevChar <= ts.CharacterCodes.z && ts.CharacterCodes.A <= strChar && strChar <= ts.CharacterCodes.Z || // camelCase transition
                prevChar === ts.CharacterCodes._ && strChar !== ts.CharacterCodes._; // snake_case transition
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
    if (ts.CharacterCodes.a <= charCode && charCode <= ts.CharacterCodes.z) {
        return charCode - 32;
    }
    return charCode;
}

