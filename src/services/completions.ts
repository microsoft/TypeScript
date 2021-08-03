/* @internal */
namespace ts.Completions {
    // Exported only for tests
    export const moduleSpecifierResolutionLimit = 100;
    export const moduleSpecifierResolutionCacheAttemptLimit = 1000;

    export type Log = (message: string) => void;

    // NOTE: Make sure that each entry has the exact same number of digits
    //       since many implementations will sort by string contents,
    //       where "10" is considered less than "2".
    export enum SortText {
        LocalDeclarationPriority = "10",
        LocationPriority = "11",
        OptionalMember = "12",
        MemberDeclaredBySpreadAssignment = "13",
        SuggestedClassMembers = "14",
        GlobalsOrKeywords = "15",
        AutoImportSuggestions = "16",
        JavascriptIdentifiers = "17",
        DeprecatedLocalDeclarationPriority = "18",
        DeprecatedLocationPriority = "19",
        DeprecatedOptionalMember = "20",
        DeprecatedMemberDeclaredBySpreadAssignment = "21",
        DeprecatedSuggestedClassMembers = "22",
        DeprecatedGlobalsOrKeywords = "23",
        DeprecatedAutoImportSuggestions = "24"
    }

    const enum SortTextId {
        LocalDeclarationPriority = 10,
        LocationPriority = 11,
        OptionalMember = 12,
        MemberDeclaredBySpreadAssignment = 13,
        SuggestedClassMembers = 14,
        GlobalsOrKeywords = 15,
        AutoImportSuggestions = 16,

        // Don't use these directly.
        _JavaScriptIdentifiers = 17,
        _DeprecatedStart = 18,
        _First = LocalDeclarationPriority,

        DeprecatedOffset = _DeprecatedStart - _First,
    }

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
        ThisProperty = "ThisProperty/"
    }

    const enum SymbolOriginInfoKind {
        ThisType            = 1 << 0,
        SymbolMember        = 1 << 1,
        Export              = 1 << 2,
        Promise             = 1 << 3,
        Nullable            = 1 << 4,
        ResolvedExport      = 1 << 5,

        SymbolMemberNoExport = SymbolMember,
        SymbolMemberExport   = SymbolMember | Export,
    }

    interface SymbolOriginInfo {
        kind: SymbolOriginInfoKind;
        symbolName?: string;
        moduleSymbol?: Symbol;
        isDefaultExport?: boolean;
        isFromPackageJson?: boolean;
        exportName?: string;
        fileName?: string;
        moduleSpecifier?: string;
    }

    interface SymbolOriginInfoExport extends SymbolOriginInfo {
        symbolName: string;
        moduleSymbol: Symbol;
        isDefaultExport: boolean;
        exportName: string;
    }

    interface SymbolOriginInfoResolvedExport extends SymbolOriginInfoExport {
        moduleSpecifier: string;
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

    interface UniqueNameSet {
        add(name: string): void;
        has(name: string): boolean;
    }

    /**
     * Map from symbol index in `symbols` -> SymbolOriginInfo.
     * Only populated for symbols that come from other modules.
     */
    type SymbolOriginInfoMap = Record<number, SymbolOriginInfo>;

    /** Map from symbol id -> SortTextId. */
    type SymbolSortTextIdMap = (SortTextId | undefined)[];

    const enum KeywordCompletionFilters {
        None,                           // No keywords
        All,                            // Every possible keyword (TODO: This is never appropriate)
        ClassElementKeywords,           // Keywords inside class body
        InterfaceElementKeywords,       // Keywords inside interface body
        ConstructorParameterKeywords,   // Keywords at constructor parameter
        FunctionLikeBodyKeywords,       // Keywords at function like body
        TypeAssertionKeywords,
        TypeKeywords,
        Last = TypeKeywords
    }

    const enum GlobalsSearch { Continue, Success, Fail }

    interface ModuleSpecifierResolutioContext {
        tryResolve: (exportInfo: readonly SymbolExportInfo[], isFromAmbientModule: boolean) => ModuleSpecifierResolutionResult | undefined;
        resolutionLimitExceeded: () => boolean;
    }

    interface ModuleSpecifierResolutionResult {
        exportInfo?: SymbolExportInfo;
        moduleSpecifier: string;
    }

    function resolvingModuleSpecifiers<TReturn>(
        logPrefix: string,
        host: LanguageServiceHost,
        program: Program,
        sourceFile: SourceFile,
        preferences: UserPreferences,
        isForImportStatementCompletion: boolean,
        cb: (context: ModuleSpecifierResolutioContext) => TReturn,
    ): TReturn {
        const start = timestamp();
        let resolutionLimitExceeded = false;
        let ambientCount = 0;
        let resolvedCount = 0;
        let resolvedFromCacheCount = 0;
        let cacheAttemptCount = 0;

        const result = cb({ tryResolve, resolutionLimitExceeded: () => resolutionLimitExceeded });

        const hitRateMessage = cacheAttemptCount ? ` (${(resolvedFromCacheCount / cacheAttemptCount * 100).toFixed(1)}% hit rate)` : "";
        host.log?.(`${logPrefix}: resolved ${resolvedCount} module specifiers, plus ${ambientCount} ambient and ${resolvedFromCacheCount} from cache${hitRateMessage}`);
        host.log?.(`${logPrefix}: response is ${resolutionLimitExceeded ? "incomplete" : "complete"}`);
        host.log?.(`${logPrefix}: ${timestamp() - start}`);
        return result;

        function tryResolve(exportInfo: readonly SymbolExportInfo[], isFromAmbientModule: boolean): ModuleSpecifierResolutionResult | undefined {
            if (isFromAmbientModule) {
                const result = codefix.getModuleSpecifierForBestExportInfo(exportInfo, sourceFile, program, host, preferences);
                if (result) {
                    ambientCount++;
                }
                return result;
            }
            const shouldResolveModuleSpecifier = isForImportStatementCompletion || preferences.allowIncompleteCompletions && resolvedCount < moduleSpecifierResolutionLimit;
            const shouldGetModuleSpecifierFromCache = !shouldResolveModuleSpecifier && preferences.allowIncompleteCompletions && cacheAttemptCount < moduleSpecifierResolutionCacheAttemptLimit;
            const result = (shouldResolveModuleSpecifier || shouldGetModuleSpecifierFromCache)
                ? codefix.getModuleSpecifierForBestExportInfo(exportInfo, sourceFile, program, host, preferences, shouldGetModuleSpecifierFromCache)
                : undefined;

            if (!shouldResolveModuleSpecifier && !shouldGetModuleSpecifierFromCache || shouldGetModuleSpecifierFromCache && !result) {
                resolutionLimitExceeded = true;
            }

            resolvedCount += result?.computedWithoutCacheCount || 0;
            resolvedFromCacheCount += exportInfo.length - resolvedCount;
            if (shouldGetModuleSpecifierFromCache) {
                cacheAttemptCount++;
            }

            return result;
        }
    }

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
    ): CompletionInfo | undefined {
        const { previousToken } = getRelevantTokens(position, sourceFile);
        if (triggerCharacter && !isInString(sourceFile, position, previousToken) && !isValidTrigger(sourceFile, triggerCharacter, previousToken, position)) {
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
        const typeChecker = program.getTypeChecker();
        const compilerOptions = program.getCompilerOptions();
        const incompleteCompletionsCache = preferences.allowIncompleteCompletions ? host.getIncompleteCompletionsCache?.() : undefined;
        if (incompleteCompletionsCache && completionKind === CompletionTriggerKind.TriggerForIncompleteCompletions && previousToken && isIdentifier(previousToken)) {
            const incompleteContinuation = continuePreviousIncompleteResponse(incompleteCompletionsCache, sourceFile, previousToken, program, host, preferences, cancellationToken);
            if (incompleteContinuation) {
                return incompleteContinuation;
            }
        }
        else {
            incompleteCompletionsCache?.clear();
        }

        const stringCompletions = StringCompletions.getStringLiteralCompletions(sourceFile, position, previousToken, typeChecker, compilerOptions, host, log, preferences);
        if (stringCompletions) {
            return stringCompletions;
        }

        if (previousToken && isBreakOrContinueStatement(previousToken.parent)
            && (previousToken.kind === SyntaxKind.BreakKeyword || previousToken.kind === SyntaxKind.ContinueKeyword || previousToken.kind === SyntaxKind.Identifier)) {
            return getLabelCompletionAtPosition(previousToken.parent);
        }

        const completionData = getCompletionData(program, log, sourceFile, isUncheckedFile(sourceFile, compilerOptions), position, preferences, /*detailsEntryId*/ undefined, host, cancellationToken);
        if (!completionData) {
            return undefined;
        }

        switch (completionData.kind) {
            case CompletionDataKind.Data:
                const response = completionInfoFromData(sourceFile, typeChecker, compilerOptions, log, completionData, preferences);
                if (response?.isIncomplete) {
                    incompleteCompletionsCache?.set(response);
                }
                return response;
            case CompletionDataKind.JsDocTagName:
                // If the current position is a jsDoc tag name, only tag names should be provided for completion
                return jsdocCompletionInfo(JsDoc.getJSDocTagNameCompletions());
            case CompletionDataKind.JsDocTag:
                // If the current position is a jsDoc tag, only tags should be provided for completion
                return jsdocCompletionInfo(JsDoc.getJSDocTagCompletions());
            case CompletionDataKind.JsDocParameterName:
                return jsdocCompletionInfo(JsDoc.getJSDocParameterNameCompletions(completionData.tag));
            case CompletionDataKind.Keywords:
                return specificKeywordCompletionInfo(completionData.keywords);
            default:
                return Debug.assertNever(completionData);
        }
    }

    function continuePreviousIncompleteResponse(
        cache: IncompleteCompletionsCache,
        file: SourceFile,
        location: Identifier,
        program: Program,
        host: LanguageServiceHost,
        preferences: UserPreferences,
        cancellationToken: CancellationToken,
    ): CompletionInfo | undefined {
        const previousResponse = cache.get();
        if (!previousResponse) return undefined;

        const lowerCaseTokenText = location.text.toLowerCase();
        const exportMap = getExportInfoMap(file, host, program, cancellationToken);
        const checker = program.getTypeChecker();
        const autoImportProvider = host.getPackageJsonAutoImportProvider?.();
        const autoImportProviderChecker = autoImportProvider?.getTypeChecker();
        const newEntries = resolvingModuleSpecifiers(
            "continuePreviousIncompleteResponse",
            host,
            program,
            file,
            preferences,
            /*isForImportStatementCompletion*/ false,
            context => {
                const entries = mapDefined(previousResponse.entries, entry => {
                    if (!entry.hasAction || !entry.source || !entry.data || entry.data.moduleSpecifier) {
                        // Not an auto import or already resolved; keep as is
                        return entry;
                    }
                    if (!charactersFuzzyMatchInString(entry.name, lowerCaseTokenText)) {
                        // No longer matches typed characters; filter out
                        return undefined;
                    }

                    const { symbol, origin } = Debug.checkDefined(getAutoImportSymbolFromCompletionEntryData(entry.name, entry.data, program, host));
                    const info = exportMap.get(
                        file.path,
                        entry.name,
                        symbol,
                        origin.moduleSymbol.name,
                        origin.isFromPackageJson ? autoImportProviderChecker! : checker);

                    const result = info && context.tryResolve(info, !isExternalModuleNameRelative(stripQuotes(origin.moduleSymbol.name)));
                    if (!result) return entry;

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

                if (!context.resolutionLimitExceeded()) {
                    previousResponse.isIncomplete = undefined;
                }

                return entries;
            },
        );

        previousResponse.entries = newEntries;
        return previousResponse;
    }

    function jsdocCompletionInfo(entries: CompletionEntry[]): CompletionInfo {
        return { isGlobalCompletion: false, isMemberCompletion: false, isNewIdentifierLocation: false, entries };
    }

    function specificKeywordCompletionInfo(keywords: readonly SyntaxKind[]): CompletionInfo {
        return {
            isGlobalCompletion: false,
            isMemberCompletion: false,
            isNewIdentifierLocation: false,
            entries: keywords.map(k => ({
                name: tokenToString(k)!,
                kind: ScriptElementKind.keyword,
                kindModifiers: ScriptElementKindModifier.none,
                sortText: SortText.GlobalsOrKeywords,
            })),
        };
    }

    function getOptionalReplacementSpan(location: Node | undefined) {
        // StringLiteralLike locations are handled separately in stringCompletions.ts
        return location?.kind === SyntaxKind.Identifier ? createTextSpanFromNode(location) : undefined;
    }

    function completionInfoFromData(sourceFile: SourceFile, typeChecker: TypeChecker, compilerOptions: CompilerOptions, log: Log, completionData: CompletionData, preferences: UserPreferences): CompletionInfo | undefined {
        const {
            symbols,
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
            importCompletionNode,
            insideJsDocTagTypeExpression,
            symbolToSortTextIdMap,
            hasUnresolvedAutoImports,
        } = completionData;

        // Verify if the file is JSX language variant
        if (getLanguageVariant(sourceFile.scriptKind) === LanguageVariant.JSX) {
            const completionInfo = getJsxClosingTagCompletion(location, sourceFile);
            if (completionInfo) {
                return completionInfo;
            }
        }

        const entries: CompletionEntry[] = [];

        if (isUncheckedFile(sourceFile, compilerOptions)) {
            const uniqueNames = getCompletionEntriesFromSymbols(
                symbols,
                entries,
                /* contextToken */ undefined,
                location,
                sourceFile,
                typeChecker,
                compilerOptions.target!,
                log,
                completionKind,
                preferences,
                compilerOptions,
                isTypeOnlyLocation,
                propertyAccessToConvert,
                isJsxIdentifierExpected,
                isJsxInitializer,
                importCompletionNode,
                recommendedCompletion,
                symbolToOriginInfoMap,
                symbolToSortTextIdMap
            );
            getJSCompletionEntries(sourceFile, location.pos, uniqueNames, compilerOptions.target!, entries); // TODO: GH#18217
        }
        else {
            if (!isNewIdentifierLocation && (!symbols || symbols.length === 0) && keywordFilters === KeywordCompletionFilters.None) {
                return undefined;
            }

            getCompletionEntriesFromSymbols(
                symbols,
                entries,
                /* contextToken */ undefined,
                location,
                sourceFile,
                typeChecker,
                compilerOptions.target!,
                log,
                completionKind,
                preferences,
                compilerOptions,
                isTypeOnlyLocation,
                propertyAccessToConvert,
                isJsxIdentifierExpected,
                isJsxInitializer,
                importCompletionNode,
                recommendedCompletion,
                symbolToOriginInfoMap,
                symbolToSortTextIdMap
            );
        }

        if (keywordFilters !== KeywordCompletionFilters.None) {
            const entryNames = new Set(entries.map(e => e.name));
            for (const keywordEntry of getKeywordCompletions(keywordFilters, !insideJsDocTagTypeExpression && isSourceFileJS(sourceFile))) {
                if (!entryNames.has(keywordEntry.name)) {
                    entries.push(keywordEntry);
                }
            }
        }

        for (const literal of literals) {
            entries.push(createCompletionEntryForLiteral(sourceFile, preferences, literal));
        }

        return {
            isGlobalCompletion: isInSnippetScope,
            isIncomplete: preferences.allowIncompleteCompletions && hasUnresolvedAutoImports ? true : undefined,
            isMemberCompletion: isMemberCompletionKind(completionKind),
            isNewIdentifierLocation,
            optionalReplacementSpan: getOptionalReplacementSpan(location),
            entries
        };
    }

    function isUncheckedFile(sourceFile: SourceFile, compilerOptions: CompilerOptions): boolean {
        return isSourceFileJS(sourceFile) && !isCheckJsEnabledForFile(sourceFile, compilerOptions);
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
            return { isGlobalCompletion: false, isMemberCompletion: true, isNewIdentifierLocation: false, optionalReplacementSpan: replacementSpan, entries: [entry] };
        }
        return;
    }

    function getJSCompletionEntries(
        sourceFile: SourceFile,
        position: number,
        uniqueNames: UniqueNameSet,
        target: ScriptTarget,
        entries: Push<CompletionEntry>): void {
        getNameTable(sourceFile).forEach((pos, name) => {
            // Skip identifiers produced only from the current location
            if (pos === position) {
                return;
            }
            const realName = unescapeLeadingUnderscores(name);
            if (!uniqueNames.has(realName) && isIdentifierText(realName, target)) {
                uniqueNames.add(realName);
                entries.push({
                    name: realName,
                    kind: ScriptElementKind.warning,
                    kindModifiers: "",
                    sortText: SortText.JavascriptIdentifiers,
                    isFromUncheckedFile: true
                });
            }
        });
    }

    function completionNameForLiteral(sourceFile: SourceFile, preferences: UserPreferences, literal: string | number | PseudoBigInt): string {
        return typeof literal === "object" ? pseudoBigIntToString(literal) + "n" :
            isString(literal) ? quote(sourceFile, preferences, literal) : JSON.stringify(literal);
    }

    function createCompletionEntryForLiteral(sourceFile: SourceFile, preferences: UserPreferences, literal: string | number | PseudoBigInt): CompletionEntry {
        return { name: completionNameForLiteral(sourceFile, preferences, literal), kind: ScriptElementKind.string, kindModifiers: ScriptElementKindModifier.none, sortText: SortText.LocationPriority };
    }

    function createCompletionEntry(
        symbol: Symbol,
        sortText: SortText,
        contextToken: Node | undefined,
        location: Node,
        sourceFile: SourceFile,
        typeChecker: TypeChecker,
        name: string,
        needsConvertPropertyAccess: boolean,
        origin: SymbolOriginInfo | undefined,
        recommendedCompletion: Symbol | undefined,
        propertyAccessToConvert: PropertyAccessExpression | undefined,
        isJsxInitializer: IsJsxInitializer | undefined,
        importCompletionNode: Node | undefined,
        useSemicolons: boolean,
        options: CompilerOptions,
        preferences: UserPreferences,
    ): CompletionEntry | undefined {
        let insertText: string | undefined;
        let replacementSpan = getReplacementSpanForContextToken(contextToken);
        let data: CompletionEntryData | undefined;
        let isSnippet: true | undefined;
        let sourceDisplay;
        let hasAction;

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
            replacementSpan = createTextSpanFromBounds(propertyAccessToConvert.getStart(sourceFile), propertyAccessToConvert.end);
        }

        if (originIsResolvedExport(origin)) {
            sourceDisplay = [textPart(origin.moduleSpecifier)];
            if (importCompletionNode) {
                ({ insertText, replacementSpan } = getInsertTextAndReplacementSpanForImportCompletion(name, importCompletionNode, origin, useSemicolons, options, preferences));
                isSnippet = preferences.includeCompletionsWithSnippetText ? true : undefined;
            }
        }

        if (insertText !== undefined && !preferences.includeCompletionsWithInsertText) {
            return undefined;
        }

        if (originIsExport(origin) || originIsResolvedExport(origin)) {
            data = originToCompletionEntryData(origin);
            hasAction = !importCompletionNode;
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
            kind: SymbolDisplay.getSymbolKind(typeChecker, symbol, location), // TODO: GH#18217
            kindModifiers: SymbolDisplay.getSymbolModifiers(typeChecker, symbol),
            sortText,
            source: getSourceFromOrigin(origin),
            hasAction: hasAction ? true : undefined,
            isRecommended: isRecommendedCompletionMatch(symbol, recommendedCompletion, typeChecker) || undefined,
            insertText,
            replacementSpan,
            sourceDisplay,
            isSnippet,
            isPackageJsonImport: originIsPackageJsonImport(origin) || undefined,
            isImportStatementCompletion: !!importCompletionNode || undefined,
            data,
        };
    }

    function originToCompletionEntryData(origin: SymbolOriginInfoExport): CompletionEntryData | undefined {
        return {
            exportName: origin.exportName,
            fileName: origin.fileName,
            ambientModuleName: origin.fileName ? undefined : stripQuotes(origin.moduleSymbol.name),
            isPackageJsonImport: origin.isFromPackageJson ? true : undefined,
            moduleSpecifier: originIsResolvedExport(origin) ? origin.moduleSpecifier : undefined,
        };
    }

    function getInsertTextAndReplacementSpanForImportCompletion(name: string, importCompletionNode: Node, origin: SymbolOriginInfoResolvedExport, useSemicolons: boolean, options: CompilerOptions, preferences: UserPreferences) {
        const sourceFile = importCompletionNode.getSourceFile();
        const replacementSpan = createTextSpanFromNode(importCompletionNode, sourceFile);
        const quotedModuleSpecifier = quote(sourceFile, preferences, origin.moduleSpecifier);
        const exportKind =
            origin.isDefaultExport ? ExportKind.Default :
            origin.exportName === InternalSymbolName.ExportEquals ? ExportKind.ExportEquals :
            ExportKind.Named;
        const tabStop = preferences.includeCompletionsWithSnippetText ? "$1" : "";
        const importKind = codefix.getImportKind(sourceFile, exportKind, options, /*forceImportKeyword*/ true);
        const suffix = useSemicolons ? ";" : "";
        switch (importKind) {
            case ImportKind.CommonJS: return { replacementSpan, insertText: `import ${name}${tabStop} = require(${quotedModuleSpecifier})${suffix}` };
            case ImportKind.Default: return { replacementSpan, insertText: `import ${name}${tabStop} from ${quotedModuleSpecifier}${suffix}` };
            case ImportKind.Namespace: return { replacementSpan, insertText: `import * as ${name} from ${quotedModuleSpecifier}${suffix}` };
            case ImportKind.Named: return { replacementSpan, insertText: `import { ${name}${tabStop} } from ${quotedModuleSpecifier}${suffix}` };
        }
    }

    function quotePropertyName(sourceFile: SourceFile, preferences: UserPreferences, name: string,): string {
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
    }

    export function getCompletionEntriesFromSymbols(
        symbols: readonly Symbol[],
        entries: Push<CompletionEntry>,
        contextToken: Node | undefined,
        location: Node,
        sourceFile: SourceFile,
        typeChecker: TypeChecker,
        target: ScriptTarget,
        log: Log,
        kind: CompletionKind,
        preferences: UserPreferences,
        compilerOptions: CompilerOptions,
        isTypeOnlyLocation?: boolean,
        propertyAccessToConvert?: PropertyAccessExpression,
        jsxIdentifierExpected?: boolean,
        isJsxInitializer?: IsJsxInitializer,
        importCompletionNode?: Node,
        recommendedCompletion?: Symbol,
        symbolToOriginInfoMap?: SymbolOriginInfoMap,
        symbolToSortTextIdMap?: SymbolSortTextIdMap,
    ): UniqueNameSet {
        const start = timestamp();
        const variableDeclaration = getVariableDeclaration(location);
        const useSemicolons = probablyUsesSemicolons(sourceFile);
        // Tracks unique names.
        // Value is set to false for global variables or completions from external module exports, because we can have multiple of those;
        // true otherwise. Based on the order we add things we will always see locals first, then globals, then module exports.
        // So adding a completion for a local will prevent us from adding completions for external module exports sharing the same name.
        const uniques = new Map<string, boolean>();
        for (let i = 0; i < symbols.length; i++) {
            const symbol = symbols[i];
            const origin = symbolToOriginInfoMap?.[i];
            const info = getCompletionEntryDisplayNameForSymbol(symbol, target, origin, kind, !!jsxIdentifierExpected);
            if (!info || uniques.get(info.name) || kind === CompletionKind.Global && symbolToSortTextIdMap && !shouldIncludeSymbol(symbol, symbolToSortTextIdMap)) {
                continue;
            }

            const { name, needsConvertPropertyAccess } = info;
            const sortTextId = symbolToSortTextIdMap?.[getSymbolId(symbol)] ?? SortTextId.LocationPriority;
            const sortText = (isDeprecated(symbol, typeChecker) ? SortTextId.DeprecatedOffset + sortTextId : sortTextId).toString() as SortText;
            const entry = createCompletionEntry(
                symbol,
                sortText,
                contextToken,
                location,
                sourceFile,
                typeChecker,
                name,
                needsConvertPropertyAccess,
                origin,
                recommendedCompletion,
                propertyAccessToConvert,
                isJsxInitializer,
                importCompletionNode,
                useSemicolons,
                compilerOptions,
                preferences
            );
            if (!entry) {
                continue;
            }

            /** True for locals; false for globals, module exports from other files, `this.` completions. */
            const shouldShadowLaterSymbols = !origin && !(symbol.parent === undefined && !some(symbol.declarations, d => d.getSourceFile() === location.getSourceFile()));
            uniques.set(name, shouldShadowLaterSymbols);
            entries.push(entry);
        }

        log("getCompletionsAtPosition: getCompletionEntriesFromSymbols: " + (timestamp() - start));

        // Prevent consumers of this map from having to worry about
        // the boolean value. Externally, it should be seen as the
        // set of all names.
        return {
            has: name => uniques.has(name),
            add: name => uniques.set(name, true),
        };

        function shouldIncludeSymbol(symbol: Symbol, symbolToSortTextIdMap: SymbolSortTextIdMap): boolean {
            if (!isSourceFile(location)) {
                // export = /**/ here we want to get all meanings, so any symbol is ok
                if (isExportAssignment(location.parent)) {
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
                const symbolOrigin = skipAlias(symbol, typeChecker);
                // We only want to filter out the global keywords
                // Auto Imports are not available for scripts so this conditional is always false
                if (!!sourceFile.externalModuleIndicator
                    && !compilerOptions.allowUmdGlobalAccess
                    && symbolToSortTextIdMap[getSymbolId(symbol)] === SortTextId.GlobalsOrKeywords
                    && (symbolToSortTextIdMap[getSymbolId(symbolOrigin)] === SortTextId.AutoImportSuggestions
                        || symbolToSortTextIdMap[getSymbolId(symbolOrigin)] === SortTextId.LocationPriority)) {
                    return false;
                }
                // Continue with origin symbol
                symbol = symbolOrigin;

                // import m = /**/ <-- It can only access namespace (if typing import = x. this would get member symbols and not namespace)
                if (isInRightSideOfInternalImportEqualsDeclaration(location)) {
                    return !!(symbol.flags & SymbolFlags.Namespace);
                }

                if (isTypeOnlyLocation) {
                    // It's a type, but you can reach it by namespace.type as well
                    return symbolCanBeReferencedAtTypeLocation(symbol, typeChecker);
                }
            }

            // expressions are value space (which includes the value namespaces)
            return !!(getCombinedLocalAndExportSymbolFlags(symbol) & SymbolFlags.Value);
        }
    }

    function getLabelCompletionAtPosition(node: BreakOrContinueStatement): CompletionInfo | undefined {
        const entries = getLabelStatementCompletions(node);
        if (entries.length) {
            return { isGlobalCompletion: false, isMemberCompletion: false, isNewIdentifierLocation: false, entries };
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
        symbol: Symbol;
        location: Node;
        origin: SymbolOriginInfo | SymbolOriginInfoExport | SymbolOriginInfoResolvedExport | undefined;
        previousToken: Node | undefined;
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
    ): SymbolCompletion | { type: "request", request: Request } | { type: "literal", literal: string | number | PseudoBigInt } | { type: "none" } {
        if (entryId.data) {
            const autoImport = getAutoImportSymbolFromCompletionEntryData(entryId.name, entryId.data, program, host);
            if (autoImport) {
                return {
                    type: "symbol",
                    symbol: autoImport.symbol,
                    location: getTouchingPropertyName(sourceFile, position),
                    previousToken: findPrecedingToken(position, sourceFile, /*startNode*/ undefined)!,
                    isJsxInitializer: false,
                    isTypeOnlyLocation: false,
                    origin: autoImport.origin,
                };
            }
        }

        const compilerOptions = program.getCompilerOptions();
        const completionData = getCompletionData(program, log, sourceFile, isUncheckedFile(sourceFile, compilerOptions), position, { includeCompletionsForModuleExports: true, includeCompletionsWithInsertText: true }, entryId, host);
        if (!completionData) {
            return { type: "none" };
        }
        if (completionData.kind !== CompletionDataKind.Data) {
            return { type: "request", request: completionData };
        }

        const { symbols, literals, location, completionKind, symbolToOriginInfoMap, previousToken, isJsxInitializer, isTypeOnlyLocation } = completionData;

        const literal = find(literals, l => completionNameForLiteral(sourceFile, preferences, l) === entryId.name);
        if (literal !== undefined) return { type: "literal", literal };

        // Find the symbol with the matching entry name.
        // We don't need to perform character checks here because we're only comparing the
        // name against 'entryName' (which is known to be good), not building a new
        // completion entry.
        return firstDefined(symbols, (symbol, index): SymbolCompletion | undefined => {
            const origin = symbolToOriginInfoMap[index];
            const info = getCompletionEntryDisplayNameForSymbol(symbol, compilerOptions.target!, origin, completionKind, completionData.isJsxIdentifierExpected);
            return info && info.name === entryId.name && getSourceFromOrigin(origin) === entryId.source
                ? { type: "symbol" as const, symbol, location, origin, previousToken, isJsxInitializer, isTypeOnlyLocation }
                : undefined;
        }) || { type: "none" };
    }

    export interface CompletionEntryIdentifier {
        name: string;
        source?: string;
        data?: CompletionEntryData;
    }

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
        const { name } = entryId;

        const contextToken = findPrecedingToken(position, sourceFile);
        if (isInString(sourceFile, position, contextToken)) {
            return StringCompletions.getStringLiteralCompletionDetails(name, sourceFile, position, contextToken, typeChecker, compilerOptions, host, cancellationToken, preferences);
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
                        return request.keywords.indexOf(stringToToken(name)!) > -1 ? createSimpleDetails(name, ScriptElementKind.keyword, SymbolDisplayPartKind.keyword) : undefined;
                    default:
                        return Debug.assertNever(request);
                }
            }
            case "symbol": {
                const { symbol, location, origin, previousToken } = symbolCompletion;
                const { codeActions, sourceDisplay } = getCompletionEntryCodeActionsAndSourceDisplay(origin, symbol, program, host, compilerOptions, sourceFile, position, previousToken, formatContext, preferences, entryId.data);
                return createCompletionDetailsForSymbol(symbol, typeChecker, sourceFile, location, cancellationToken, codeActions, sourceDisplay); // TODO: GH#18217
            }
            case "literal": {
                const { literal } = symbolCompletion;
                return createSimpleDetails(completionNameForLiteral(sourceFile, preferences, literal), ScriptElementKind.string, typeof literal === "string" ? SymbolDisplayPartKind.stringLiteral : SymbolDisplayPartKind.numericLiteral);
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

    export function createCompletionDetailsForSymbol(symbol: Symbol, checker: TypeChecker, sourceFile: SourceFile, location: Node, cancellationToken: CancellationToken, codeActions?: CodeAction[], sourceDisplay?: SymbolDisplayPart[]): CompletionEntryDetails {
        const { displayParts, documentation, symbolKind, tags } =
            checker.runWithCancellationToken(cancellationToken, checker =>
                SymbolDisplay.getSymbolDisplayPartsDocumentationAndSymbolKind(checker, symbol, sourceFile, location, location, SemanticMeaning.All)
            );
        return createCompletionDetails(symbol.name, SymbolDisplay.getSymbolModifiers(checker, symbol), symbolKind, displayParts, documentation, tags, codeActions, sourceDisplay);
    }

    export function createCompletionDetails(name: string, kindModifiers: string, kind: ScriptElementKind, displayParts: SymbolDisplayPart[], documentation?: SymbolDisplayPart[], tags?: JSDocTagInfo[], codeActions?: CodeAction[], source?: SymbolDisplayPart[]): CompletionEntryDetails {
        return { name, kindModifiers, kind, displayParts, documentation, tags, codeActions, source, sourceDisplay: source };
    }

    interface CodeActionsAndSourceDisplay {
        readonly codeActions: CodeAction[] | undefined;
        readonly sourceDisplay: SymbolDisplayPart[] | undefined;
    }
    function getCompletionEntryCodeActionsAndSourceDisplay(
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
    ): CodeActionsAndSourceDisplay {
        if (data?.moduleSpecifier) {
            const { contextToken, previousToken } = getRelevantTokens(position, sourceFile);
            if (previousToken && getImportCompletionNode(contextToken || previousToken)) {
                // Import statement completion: 'import c|'
                return { codeActions: undefined, sourceDisplay: [textPart(data.moduleSpecifier)] };
            }
        }

        if (!origin || !(originIsExport(origin) || originIsResolvedExport(origin))) {
            return { codeActions: undefined, sourceDisplay: undefined };
        }

        const checker = origin.isFromPackageJson ? host.getPackageJsonAutoImportProvider!()!.getTypeChecker() : program.getTypeChecker();
        const { moduleSymbol } = origin;
        const exportedSymbol = checker.getMergedSymbol(skipAlias(symbol.exportSymbol || symbol, checker));
        const { moduleSpecifier, codeAction } = codefix.getImportCompletionAction(
            exportedSymbol,
            moduleSymbol,
            sourceFile,
            getNameForExportedSymbol(symbol, compilerOptions.target),
            host,
            program,
            formatContext,
            previousToken && isIdentifier(previousToken) ? previousToken.getStart(sourceFile) : position,
            preferences);
        Debug.assert(!data?.moduleSpecifier || moduleSpecifier === data.moduleSpecifier);
        return { sourceDisplay: [textPart(moduleSpecifier)], codeActions: [codeAction] };
    }

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

    const enum CompletionDataKind { Data, JsDocTagName, JsDocTag, JsDocParameterName, Keywords }
    /** true: after the `=` sign but no identifier has been typed yet. Else is the Identifier after the initializer. */
    type IsJsxInitializer = boolean | Identifier;
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
        readonly isJsxInitializer: IsJsxInitializer;
        readonly insideJsDocTagTypeExpression: boolean;
        readonly symbolToSortTextIdMap: SymbolSortTextIdMap;
        readonly isTypeOnlyLocation: boolean;
        /** In JSX tag name and attribute names, identifiers like "my-tag" or "aria-name" is valid identifier. */
        readonly isJsxIdentifierExpected: boolean;
        readonly importCompletionNode?: Node;
        readonly hasUnresolvedAutoImports?: boolean;
    }
    type Request =
        | { readonly kind: CompletionDataKind.JsDocTagName | CompletionDataKind.JsDocTag }
        | { readonly kind: CompletionDataKind.JsDocParameterName, tag: JSDocParameterTag }
        | { readonly kind: CompletionDataKind.Keywords, keywords: readonly SyntaxKind[] };

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
                return getSwitchedType(cast(parent, isCaseClause), checker);
            case SyntaxKind.OpenBraceToken:
                return isJsxExpression(parent) && parent.parent.kind !== SyntaxKind.JsxElement ? checker.getContextualTypeForJsxAttribute(parent.parent) : undefined;
            default:
                const argInfo = SignatureHelp.getArgumentInfoForCompletions(previousToken, position, sourceFile);
                return argInfo ?
                    // At `,`, treat this as the next argument after the comma.
                    checker.getContextualTypeForArgumentAtIndex(argInfo.invocation, argInfo.argumentIndex + (previousToken.kind === SyntaxKind.CommaToken ? 1 : 0)) :
                    isEqualityOperatorKind(previousToken.kind) && isBinaryExpression(parent) && isEqualityOperatorKind(parent.operatorToken.kind) ?
                        // completion at `x ===/**/` should be for the right side
                        checker.getTypeAtLocation(parent.left) :
                        checker.getContextualType(previousToken as Expression);
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
        isUncheckedFile: boolean,
        position: number,
        preferences: UserPreferences,
        detailsEntryId: CompletionEntryIdentifier | undefined,
        host: LanguageServiceHost,
        cancellationToken?: CancellationToken,
    ): CompletionData | Request | undefined {
        const typeChecker = program.getTypeChecker();

        let start = timestamp();
        let currentToken = getTokenAtPosition(sourceFile, position); // TODO: GH#15853
        // We will check for jsdoc comments with insideComment and getJsDocTagAtPosition. (TODO: that seems rather inefficient to check the same thing so many times.)

        log("getCompletionData: Get current token: " + (timestamp() - start));

        start = timestamp();
        const insideComment = isInComment(sourceFile, position, currentToken);
        log("getCompletionData: Is inside comment: " + (timestamp() - start));

        let insideJsDocTagTypeExpression = false;
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
                if (isTagWithTypeExpression(tag) && tag.typeExpression && tag.typeExpression.kind === SyntaxKind.JSDocTypeExpression) {
                    currentToken = getTokenAtPosition(sourceFile, position);
                    if (!currentToken ||
                        (!isDeclarationName(currentToken) &&
                            (currentToken.parent.kind !== SyntaxKind.JSDocPropertyTag ||
                                (currentToken.parent as JSDocPropertyTag).name !== currentToken))) {
                        // Use as type location if inside tag's type expression
                        insideJsDocTagTypeExpression = isCurrentlyEditingNode(tag.typeExpression);
                    }
                }
                if (!insideJsDocTagTypeExpression && isJSDocParameterTag(tag) && (nodeIsMissing(tag.name) || tag.name.pos <= position && position <= tag.name.end)) {
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

        start = timestamp();
        // The decision to provide completion depends on the contextToken, which is determined through the previousToken.
        // Note: 'previousToken' (and thus 'contextToken') can be undefined if we are the beginning of the file
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
        let importCompletionNode: Node | undefined;
        let location = getTouchingPropertyName(sourceFile, position);

        if (contextToken) {
            const importCompletionCandidate = getImportCompletionNode(contextToken);
            if (importCompletionCandidate === SyntaxKind.FromKeyword) {
                return { kind: CompletionDataKind.Keywords, keywords: [SyntaxKind.FromKeyword] };
            }
            // Import statement completions use `insertText`, and also require the `data` property of `CompletionEntryIdentifier`
            // added in TypeScript 4.3 to be sent back from the client during `getCompletionEntryDetails`. Since this feature
            // is not backward compatible with older clients, the language service defaults to disabling it, allowing newer clients
            // to opt in with the `includeCompletionsForImportStatements` user preference.
            if (importCompletionCandidate && preferences.includeCompletionsForImportStatements && preferences.includeCompletionsWithInsertText) {
                importCompletionNode = importCompletionCandidate;
            }
            // Bail out if this is a known invalid completion location
            if (!importCompletionNode && isCompletionListBlocker(contextToken)) {
                log("Returning an empty list because completion was requested in an invalid position.");
                return undefined;
            }

            let parent = contextToken.parent;
            if (contextToken.kind === SyntaxKind.DotToken || contextToken.kind === SyntaxKind.QuestionDotToken) {
                isRightOfDot = contextToken.kind === SyntaxKind.DotToken;
                isRightOfQuestionDot = contextToken.kind === SyntaxKind.QuestionDotToken;
                switch (parent.kind) {
                    case SyntaxKind.PropertyAccessExpression:
                        propertyAccessToConvert = parent as PropertyAccessExpression;
                        node = propertyAccessToConvert.expression;
                        if ((isCallExpression(node) || isFunctionLike(node)) &&
                            node.end === contextToken.pos &&
                            node.getChildCount(sourceFile) &&
                            last(node.getChildren(sourceFile)).kind !== SyntaxKind.CloseParenToken) {
                            // This is likely dot from incorrectly parsed expression and user is starting to write spread
                            // eg: Math.min(./**/)
                            // const x = function (./**/) {}
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
                    case SyntaxKind.MetaProperty:
                        node = parent;
                        break;
                    default:
                        // There is nothing that precedes the dot, so this likely just a stray character
                        // or leading into a '...' token. Just bail out instead.
                        return undefined;
                }
            }
            else if (!importCompletionNode && sourceFile.languageVariant === LanguageVariant.JSX) {
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
                        // For `<div foo={true} [||] ></div>`, `parent` will be `{true}` and `previousToken` will be `}`
                        if (previousToken.kind === SyntaxKind.CloseBraceToken && currentToken.kind === SyntaxKind.GreaterThanToken) {
                            isJsxIdentifierExpected = true;
                        }
                        break;

                    case SyntaxKind.JsxAttribute:
                        // For `<div className="x" [||] ></div>`, `parent` will be JsxAttribute and `previousToken` will be its initializer
                        if ((parent as JsxAttribute).initializer === previousToken &&
                            previousToken.end < position) {
                            isJsxIdentifierExpected = true;
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
                                if (parent !== previousToken.parent &&
                                    !(parent as JsxAttribute).initializer &&
                                    findChildOfKind(parent, SyntaxKind.EqualsToken, sourceFile)) {
                                    isJsxInitializer = previousToken as Identifier;
                                }
                        }
                        break;
                }
            }
        }

        const semanticStart = timestamp();
        let completionKind = CompletionKind.None;
        let isNewIdentifierLocation = false;
        let isNonContextualObjectLiteral = false;
        let hasUnresolvedAutoImports = false;
        let keywordFilters = KeywordCompletionFilters.None;
        // This also gets mutated in nested-functions after the return
        let symbols: Symbol[] = [];
        const symbolToOriginInfoMap: SymbolOriginInfoMap = [];
        const symbolToSortTextIdMap: SymbolSortTextIdMap = [];
        const seenPropertySymbols = new Map<SymbolId, true>();
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
                return undefined;
            }
        }

        log("getCompletionData: Semantic work: " + (timestamp() - semanticStart));
        const contextualType = previousToken && getContextualType(previousToken, position, sourceFile, typeChecker);
        const literals = mapDefined(contextualType && (contextualType.isUnion() ? contextualType.types : [contextualType]), t => t.isLiteral() ? t.value : undefined);

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
            isJsxInitializer,
            insideJsDocTagTypeExpression,
            symbolToSortTextIdMap,
            isTypeOnlyLocation,
            isJsxIdentifierExpected,
            importCompletionNode,
            hasUnresolvedAutoImports,
        };

        type JSDocTagWithTypeExpression = JSDocParameterTag | JSDocPropertyTag | JSDocReturnTag | JSDocTypeTag | JSDocTypedefTag;

        function isTagWithTypeExpression(tag: JSDocTag): tag is JSDocTagWithTypeExpression {
            switch (tag.kind) {
                case SyntaxKind.JSDocParameterTag:
                case SyntaxKind.JSDocPropertyTag:
                case SyntaxKind.JSDocReturnTag:
                case SyntaxKind.JSDocTypeTag:
                case SyntaxKind.JSDocTypedefTag:
                    return true;
                default:
                    return false;
            }
        }

        function getTypeScriptMemberSymbols(): void {
            // Right of dot member completion list
            completionKind = CompletionKind.PropertyAccess;

            // Since this is qualified name check it's a type node location
            const isImportType = isLiteralImportTypeNode(node);
            const isTypeLocation = insideJsDocTagTypeExpression
                || (isImportType && !(node as ImportTypeNode).isTypeOf)
                || isPartOfTypeNode(node.parent)
                || isPossiblyTypeArgumentPosition(contextToken, sourceFile, typeChecker);
            const isRhsOfImportDeclaration = isInRightSideOfInternalImportEqualsDeclaration(node);
            if (isEntityName(node) || isImportType || isPropertyAccessExpression(node)) {
                const isNamespaceName = isModuleDeclaration(node.parent);
                if (isNamespaceName) isNewIdentifierLocation = true;
                let symbol = typeChecker.getSymbolAtLocation(node);
                if (symbol) {
                    symbol = skipAlias(symbol, typeChecker);
                    if (symbol.flags & (SymbolFlags.Module | SymbolFlags.Enum)) {
                        // Extract module or enum members
                        const exportedSymbols = typeChecker.getExportsOfModule(symbol);
                        Debug.assertEachIsDefined(exportedSymbols, "getExportsOfModule() should all be defined");
                        const isValidValueAccess = (symbol: Symbol) => typeChecker.isValidPropertyAccess(isImportType ? node as ImportTypeNode : (node.parent as PropertyAccessExpression), symbol.name);
                        const isValidTypeAccess = (symbol: Symbol) => symbolCanBeReferencedAtTypeLocation(symbol, typeChecker);
                        const isValidAccess: (symbol: Symbol) => boolean =
                            isNamespaceName
                                // At `namespace N.M/**/`, if this is the only declaration of `M`, don't include `M` as a completion.
                                ? symbol => !!(symbol.flags & SymbolFlags.Namespace) && !symbol.declarations?.every(d => d.parent === node.parent)
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
                            symbol.declarations.some(d => d.kind !== SyntaxKind.SourceFile && d.kind !== SyntaxKind.ModuleDeclaration && d.kind !== SyntaxKind.EnumDeclaration)) {
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
                            addTypeProperties(type, !!(node.flags & NodeFlags.AwaitContext), insertQuestionDot);
                        }

                        return;
                    }
                }
            }

            if (isMetaProperty(node) && (node.keywordToken === SyntaxKind.NewKeyword || node.keywordToken === SyntaxKind.ImportKeyword) && contextToken === node.getChildAt(1)) {
                const completion = (node.keywordToken === SyntaxKind.NewKeyword) ? "target" : "meta";
                symbols.push(typeChecker.createSymbol(SymbolFlags.Property, escapeLeadingUnderscores(completion)));
                return;
            }

            if (!isTypeLocation) {
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
                addTypeProperties(type, !!(node.flags & NodeFlags.AwaitContext), insertQuestionDot);
            }
        }

        function addTypeProperties(type: Type, insertAwait: boolean, insertQuestionDot: boolean): void {
            isNewIdentifierLocation = !!type.getStringIndexType();
            if (isRightOfQuestionDot && some(type.getCallSignatures())) {
                isNewIdentifierLocation = true;
            }

            const propertyAccess = node.kind === SyntaxKind.ImportType ? node as ImportTypeNode : node.parent as PropertyAccessExpression | QualifiedName;
            if (isUncheckedFile) {
                // In javascript files, for union types, we don't just get the members that
                // the individual types have in common, we also include all the members that
                // each individual type has. This is because we're going to add all identifiers
                // anyways. So we might as well elevate the members that were at least part
                // of the individual types to a higher status since we know what they are.
                symbols.push(...filter(getPropertiesForCompletion(type, typeChecker), s => typeChecker.isValidPropertyAccessForCompletions(propertyAccess, type, s)));
            }
            else {
                for (const symbol of type.getApparentProperties()) {
                    if (typeChecker.isValidPropertyAccessForCompletions(propertyAccess, type, symbol)) {
                        addPropertySymbol(symbol, /* insertAwait */ false, insertQuestionDot);
                    }
                }
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
                if (firstAccessibleSymbol && addToSeen(seenPropertySymbols, getSymbolId(firstAccessibleSymbol))) {
                    const index = symbols.length;
                    symbols.push(firstAccessibleSymbol);
                    const moduleSymbol = firstAccessibleSymbol.parent;
                    if (!moduleSymbol || !isExternalModuleSymbol(moduleSymbol)) {
                        symbolToOriginInfoMap[index] = { kind: getNullableSymbolOriginInfoKind(SymbolOriginInfoKind.SymbolMemberNoExport) };
                    }
                    else {
                        const origin: SymbolOriginInfoExport = {
                            kind: getNullableSymbolOriginInfoKind(SymbolOriginInfoKind.SymbolMemberExport),
                            moduleSymbol,
                            isDefaultExport: false,
                            symbolName: firstAccessibleSymbol.name,
                            exportName: firstAccessibleSymbol.name,
                            fileName: isExternalModuleNameRelative(stripQuotes(moduleSymbol.name)) ? cast(moduleSymbol.valueDeclaration, isSourceFile).fileName : undefined,
                        };
                        symbolToOriginInfoMap[index] = origin;
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

            function addSymbolSortInfo(symbol: Symbol) {
                if (isStaticProperty(symbol)) {
                    symbolToSortTextIdMap[getSymbolId(symbol)] = SortTextId.LocalDeclarationPriority;
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
            symbols = concatenate(symbols, filterJsxAttributes(getPropertiesForObjectExpression(attrsType, completionsType, jsxContainer!.attributes, typeChecker), jsxContainer!.attributes.properties));
            setSortTextToOptionalMember();
            completionKind = CompletionKind.MemberLike;
            isNewIdentifierLocation = false;
            return GlobalsSearch.Success;
        }

        function tryGetImportCompletionSymbols(): GlobalsSearch {
            if (!importCompletionNode) return GlobalsSearch.Continue;
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

            symbols = concatenate(symbols, typeChecker.getSymbolsInScope(scopeNode, symbolMeanings));
            Debug.assertEachIsDefined(symbols, "getSymbolsInScope() should all be defined");
            for (const symbol of symbols) {
                if (!typeChecker.isArgumentsSymbol(symbol) &&
                    !some(symbol.declarations, d => d.getSourceFile() === sourceFile)) {
                    symbolToSortTextIdMap[getSymbolId(symbol)] = SortTextId.GlobalsOrKeywords;
                }
            }

            // Need to insert 'this.' before properties of `this` type, so only do that if `includeInsertTextCompletions`
            if (preferences.includeCompletionsWithInsertText && scopeNode.kind !== SyntaxKind.SourceFile) {
                const thisType = typeChecker.tryGetThisTypeAt(scopeNode, /*includeGlobalThis*/ false);
                if (thisType && !isProbablyGlobalType(thisType, sourceFile, typeChecker)) {
                    for (const symbol of getPropertiesForCompletion(thisType, typeChecker)) {
                        symbolToOriginInfoMap[symbols.length] = { kind: SymbolOriginInfoKind.ThisType };
                        symbols.push(symbol);
                        symbolToSortTextIdMap[getSymbolId(symbol)] = SortTextId.SuggestedClassMembers;
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
            if (importCompletionNode) return true;
            // If current completion is for non-contextual Object literal shortahands, ignore auto-import symbols
            if (isNonContextualObjectLiteral) return false;
            // If not already a module, must have modules enabled.
            if (!preferences.includeCompletionsForModuleExports) return false;
            // If already using ES6 modules, OK to continue using them.
            if (sourceFile.externalModuleIndicator || sourceFile.commonJsModuleIndicator) return true;
            // If module transpilation is enabled or we're targeting es6 or above, or not emitting, OK.
            if (compilerOptionsIndicateEs6Modules(program.getCompilerOptions())) return true;
            // If some file is using ES6 modules, assume that it's OK to add more.
            return programContainsModules(program);
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
                        return parentKind === SyntaxKind.TypeAliasDeclaration;

                    case SyntaxKind.AsKeyword:
                        return parentKind === SyntaxKind.AsExpression;

                    case SyntaxKind.LessThanToken:
                        return parentKind === SyntaxKind.TypeReference ||
                            parentKind === SyntaxKind.TypeAssertionExpression;

                    case SyntaxKind.ExtendsKeyword:
                        return parentKind === SyntaxKind.TypeParameter;
                }
            }
            return false;
        }

        /** Mutates `symbols`, `symbolToOriginInfoMap`, and `symbolToSortTextIdMap` */
        function collectAutoImports() {
            if (!shouldOfferImportCompletions()) return;
            Debug.assert(!detailsEntryId?.data, "Should not run 'collectAutoImports' when faster path is available via `data`");
            if (detailsEntryId && !detailsEntryId.source) {
                // Asking for completion details for an item that is not an auto-import
                return;
            }

            const moduleSpecifierCache = host.getModuleSpecifierCache?.();
            const lowerCaseTokenText = previousToken && isIdentifier(previousToken) ? previousToken.text.toLowerCase() : "";
            const exportInfo = getExportInfoMap(sourceFile, host, program, cancellationToken);

            const packageJsonAutoImportProvider = host.getPackageJsonAutoImportProvider?.();
            const packageJsonFilter = detailsEntryId ? undefined : createPackageJsonImportFilter(sourceFile, preferences, host);
            resolvingModuleSpecifiers(
                "collectAutoImports",
                host,
                program,
                sourceFile,
                preferences,
                !!importCompletionNode,
                context => {
                    exportInfo.forEach(sourceFile.path, (info, symbolName, isFromAmbientModule) => {
                        if (!detailsEntryId && isStringANonContextualKeyword(symbolName)) return;
                        // `targetFlags` should be the same for each `info`
                        if (!isTypeOnlyLocation && !importCompletionNode && !(info[0].targetFlags & SymbolFlags.Value)) return;
                        if (isTypeOnlyLocation && !(info[0].targetFlags & (SymbolFlags.Module | SymbolFlags.Type))) return;
                        const isCompletionDetailsMatch = detailsEntryId && some(info, i => detailsEntryId.source === stripQuotes(i.moduleSymbol.name));
                        if (isCompletionDetailsMatch || !detailsEntryId && charactersFuzzyMatchInString(symbolName, lowerCaseTokenText)) {
                            const defaultExportInfo = find(info, isImportableExportInfo);
                            if (!defaultExportInfo) {
                                return;
                            }

                            // If we don't need to resolve module specifiers, we can use any re-export that is importable at all
                            // (We need to ensure that at least one is importable to show a completion.)
                            const { exportInfo = defaultExportInfo, moduleSpecifier } = context.tryResolve(info, isFromAmbientModule) || {};
                            const isDefaultExport = exportInfo.exportKind === ExportKind.Default;
                            const symbol = isDefaultExport && getLocalSymbolForExportDefault(exportInfo.symbol) || exportInfo.symbol;
                            pushAutoImportSymbol(symbol, {
                                kind: moduleSpecifier ? SymbolOriginInfoKind.ResolvedExport : SymbolOriginInfoKind.Export,
                                moduleSpecifier,
                                symbolName,
                                exportName: exportInfo.exportKind === ExportKind.ExportEquals ? InternalSymbolName.ExportEquals : exportInfo.symbol.name,
                                fileName: exportInfo.moduleFileName,
                                isDefaultExport,
                                moduleSymbol: exportInfo.moduleSymbol,
                                isFromPackageJson: exportInfo.isFromPackageJson,
                            });
                        }
                    });

                    hasUnresolvedAutoImports = context.resolutionLimitExceeded();
                }
            );

            function isImportableExportInfo(info: SymbolExportInfo) {
                const moduleFile = tryCast(info.moduleSymbol.valueDeclaration, isSourceFile);
                if (!moduleFile) {
                    const moduleName = stripQuotes(info.moduleSymbol.name);
                    if (JsTyping.nodeCoreModules.has(moduleName) && startsWith(moduleName, "node:") !== shouldUseUriStyleNodeCoreModules(sourceFile, program)) {
                        return false;
                    }
                    return packageJsonFilter
                        ? packageJsonFilter.allowsImportingAmbientModule(info.moduleSymbol, getModuleSpecifierResolutionHost(info.isFromPackageJson))
                        : true;
                }
                return isImportableFile(
                    info.isFromPackageJson ? packageJsonAutoImportProvider! : program,
                    sourceFile,
                    moduleFile,
                    preferences,
                    packageJsonFilter,
                    getModuleSpecifierResolutionHost(info.isFromPackageJson),
                    moduleSpecifierCache);
            }
        }

        function pushAutoImportSymbol(symbol: Symbol, origin: SymbolOriginInfoResolvedExport | SymbolOriginInfoExport) {
            const symbolId = getSymbolId(symbol);
            if (symbolToSortTextIdMap[symbolId] === SortTextId.GlobalsOrKeywords) {
                // If an auto-importable symbol is available as a global, don't add the auto import
                return;
            }
            symbolToOriginInfoMap[symbols.length] = origin;
            symbolToSortTextIdMap[symbolId] = importCompletionNode ? SortTextId.LocationPriority : SortTextId.AutoImportSuggestions;
            symbols.push(symbol);
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
                if (contextToken.parent.kind === SyntaxKind.JsxOpeningElement) {
                    // Two possibilities:
                    //   1. <div>/**/
                    //      - contextToken: GreaterThanToken (before cursor)
                    //      - location: JSXElement
                    //      - different parents (JSXOpeningElement, JSXElement)
                    //   2. <Component<string> /**/>
                    //      - contextToken: GreaterThanToken (before cursor)
                    //      - location: GreaterThanToken (after cursor)
                    //      - same parent (JSXOpeningElement)
                    return location.parent.kind !== SyntaxKind.JsxOpeningElement;
                }

                if (contextToken.parent.kind === SyntaxKind.JsxClosingElement || contextToken.parent.kind === SyntaxKind.JsxSelfClosingElement) {
                    return !!contextToken.parent.parent && contextToken.parent.parent.kind === SyntaxKind.JsxElement;
                }
            }
            return false;
        }

        function isNewIdentifierDefinitionLocation(): boolean {
            if (contextToken) {
                const containingNodeKind = contextToken.parent.kind;
                // Previous token may have been a keyword that was converted to an identifier.
                switch (keywordForNode(contextToken)) {
                    case SyntaxKind.CommaToken:
                        return containingNodeKind === SyntaxKind.CallExpression               // func( a, |
                            || containingNodeKind === SyntaxKind.Constructor                  // constructor( a, |   /* public, protected, private keywords are allowed here, so show completion */
                            || containingNodeKind === SyntaxKind.NewExpression                // new C(a, |
                            || containingNodeKind === SyntaxKind.ArrayLiteralExpression       // [a, |
                            || containingNodeKind === SyntaxKind.BinaryExpression             // const x = (a, |
                            || containingNodeKind === SyntaxKind.FunctionType                 // var x: (s: string, list|
                            || containingNodeKind === SyntaxKind.ObjectLiteralExpression;     // const obj = { x, |

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
                        return containingNodeKind === SyntaxKind.ClassDeclaration             // class A { |
                            || containingNodeKind === SyntaxKind.ObjectLiteralExpression;     // const obj = { |

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
            }

            return false;
        }

        function isInStringOrRegularExpressionOrTemplateLiteral(contextToken: Node): boolean {
            // To be "in" one of these literals, the position has to be:
            //   1. entirely within the token text.
            //   2. at the end position of an unterminated token.
            //   3. at the end of a regular expression (due to trailing flags like '/foo/g').
            return (isRegularExpressionLiteral(contextToken) || isStringTextContainingNode(contextToken)) && (
                rangeContainsPositionExclusive(createTextRangeFromSpan(createTextSpanFromNode(contextToken)), position) ||
                position === contextToken.end && (!!contextToken.isUnterminated || isRegularExpressionLiteral(contextToken)));
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

            const existingMemberEscapedNames: Set<__String> = new Set();
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
            const objectLikeContainer = tryGetObjectLikeCompletionContainer(contextToken);
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
                    isNonContextualObjectLiteral = true;
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
                        isNonContextualObjectLiteral = true;
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
                let canGetType = hasInitializer(rootDeclaration) || hasType(rootDeclaration) || rootDeclaration.parent.parent.kind === SyntaxKind.ForOfStatement;
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
                    // In a binding pattern, get only known properties (unless in the same scope).
                    // Everywhere else we will get all possible properties.
                    const containerClass = getContainingClass(objectLikeContainer);
                    typeMembers = typeChecker.getPropertiesOfType(typeForObject).filter(symbol =>
                        // either public
                        !(getDeclarationModifierFlagsFromSymbol(symbol) & ModifierFlags.NonPublicAccessibilityModifier)
                        // or we're in it
                        || containerClass && contains(typeForObject.symbol.declarations, containerClass));
                    existingMembers = objectLikeContainer.elements;
                }
            }

            if (typeMembers && typeMembers.length > 0) {
                // Add filtered items to the completion list
                symbols = concatenate(symbols, filterObjectMembersList(typeMembers, Debug.checkDefined(existingMembers)));
            }
            setSortTextToOptionalMember();

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
            // `import { |` or `import { a as 0, | }`
            const namedImportsOrExports = contextToken && (contextToken.kind === SyntaxKind.OpenBraceToken || contextToken.kind === SyntaxKind.CommaToken)
                ? tryCast(contextToken.parent, isNamedImportsOrExports) : undefined;
            if (!namedImportsOrExports) return GlobalsSearch.Continue;

            // try to show exported member for imported/re-exported module
            const { moduleSpecifier } = namedImportsOrExports.kind === SyntaxKind.NamedImports ? namedImportsOrExports.parent.parent : namedImportsOrExports.parent;
            if (!moduleSpecifier) return namedImportsOrExports.kind === SyntaxKind.NamedImports ? GlobalsSearch.Fail : GlobalsSearch.Continue;
            const moduleSpecifierSymbol = typeChecker.getSymbolAtLocation(moduleSpecifier); // TODO: GH#18217
            if (!moduleSpecifierSymbol) return GlobalsSearch.Fail;

            completionKind = CompletionKind.MemberLike;
            isNewIdentifierLocation = false;
            const exports = typeChecker.getExportsAndPropertiesOfModule(moduleSpecifierSymbol);
            const existing = new Set((namedImportsOrExports.elements as NodeArray<ImportOrExportSpecifier>).filter(n => !isCurrentlyEditingNode(n)).map(n => (n.propertyName || n.name).escapedText));
            symbols = concatenate(symbols, exports.filter(e => e.escapedName !== InternalSymbolName.Default && !existing.has(e.escapedName)));
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
                    symbolToSortTextIdMap[getSymbolId(symbol)] = SortTextId.OptionalMember;
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
            }

            return GlobalsSearch.Success;
        }

        /**
         * Returns the immediate owning object literal or binding pattern of a context token,
         * on the condition that one exists and that the context implies completion should be given.
         */
        function tryGetObjectLikeCompletionContainer(contextToken: Node): ObjectLiteralExpression | ObjectBindingPattern | undefined {
            if (contextToken) {
                const { parent } = contextToken;
                switch (contextToken.kind) {
                    case SyntaxKind.OpenBraceToken:  // const x = { |
                    case SyntaxKind.CommaToken:      // const x = { a: 0, |
                        if (isObjectLiteralExpression(parent) || isObjectBindingPattern(parent)) {
                            return parent;
                        }
                        break;
                    case SyntaxKind.AsteriskToken:
                        return isMethodDeclaration(parent) ? tryCast(parent.parent, isObjectLiteralExpression) : undefined;
                    case SyntaxKind.Identifier:
                        return (contextToken as Identifier).text === "async" && isShorthandPropertyAssignment(contextToken.parent)
                            ? contextToken.parent.parent : undefined;
                }
            }

            return undefined;
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
                        if (parent &&
                            parent.kind === SyntaxKind.JsxExpression &&
                            parent.parent && parent.parent.kind === SyntaxKind.JsxAttribute) {
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

        /**
         * @returns true if we are certain that the currently edited location must define a new location; false otherwise.
         */
        function isSolelyIdentifierDefinitionLocation(contextToken: Node): boolean {
            const parent = contextToken.parent;
            const containingNodeKind = parent.kind;
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

                case SyntaxKind.ClassKeyword:
                case SyntaxKind.EnumKeyword:
                case SyntaxKind.InterfaceKeyword:
                case SyntaxKind.FunctionKeyword:
                case SyntaxKind.VarKeyword:
                case SyntaxKind.ImportKeyword:
                case SyntaxKind.LetKeyword:
                case SyntaxKind.ConstKeyword:
                case SyntaxKind.InferKeyword:
                case SyntaxKind.TypeKeyword:  // type htm|
                    return true;

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
                if (!isIdentifier(contextToken) ||
                    isParameterPropertyModifier(keywordForNode(contextToken)) ||
                    isCurrentlyEditingNode(contextToken)) {
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
            if (ancestorPropertyDeclaraion
                && contextToken !== previousToken
                && isClassLike(previousToken.parent.parent)
                // And the cursor is at the token...
                && position <= previousToken.end) {
                // If we are sure that the previous property declaration is terminated according to newline or semicolon...
                if (isPreviousPropertyDeclarationTerminated(contextToken, previousToken.end)) {
                    return false; // Don't block completions.
                }
                else if (contextToken.kind !== SyntaxKind.EqualsToken
                    // Should not block: `class C { blah = c/**/ }`
                    // But should block: `class C { blah = somewhat c/**/ }` and `class C { blah: SomeType c/**/ }`
                    && (isInitializedProperty(ancestorPropertyDeclaraion as PropertyDeclaration)
                    || hasType(ancestorPropertyDeclaraion))) {
                    return true;
                }
            }

            return isDeclarationName(contextToken)
                && !isShorthandPropertyAssignment(contextToken.parent)
                && !isJsxAttribute(contextToken.parent)
                // Don't block completions if we're in `class C /**/`, because we're *past* the end of the identifier and might want to complete `extends`.
                // If `contextToken !== previousToken`, this is `class C ex/**/`.
                && !(isClassLike(contextToken.parent) && (contextToken !== previousToken || position > previousToken.end));
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
                if (m.kind !== SyntaxKind.PropertyAssignment &&
                    m.kind !== SyntaxKind.ShorthandPropertyAssignment &&
                    m.kind !== SyntaxKind.BindingElement &&
                    m.kind !== SyntaxKind.MethodDeclaration &&
                    m.kind !== SyntaxKind.GetAccessor &&
                    m.kind !== SyntaxKind.SetAccessor &&
                    m.kind !== SyntaxKind.SpreadAssignment) {
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
                    symbolToSortTextIdMap[symbolId] = symbolToSortTextIdMap[symbolId] ?? SortTextId.OptionalMember;
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
                    symbolToSortTextIdMap[getSymbolId(contextualMemberSymbol)] = SortTextId.MemberDeclaredBySpreadAssignment;
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
                if (m.kind !== SyntaxKind.PropertyDeclaration &&
                    m.kind !== SyntaxKind.MethodDeclaration &&
                    m.kind !== SyntaxKind.GetAccessor &&
                    m.kind !== SyntaxKind.SetAccessor) {
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
                !(propertySymbol.valueDeclaration && isPrivateIdentifierClassElementDeclaration(propertySymbol.valueDeclaration)));
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
                    seenNames.add(attr.name.escapedText);
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

    function getRelevantTokens(position: number, sourceFile: SourceFile): { contextToken: Node, previousToken: Node } | { contextToken: undefined, previousToken: undefined } {
        const previousToken = findPrecedingToken(position, sourceFile);
        if (previousToken && position <= previousToken.end && (isMemberName(previousToken) || isKeyword(previousToken.kind))) {
            const contextToken = findPrecedingToken(previousToken.getFullStart(), sourceFile, /*startNode*/ undefined)!; // TODO: GH#18217
            return { contextToken, previousToken };
        }
        return { contextToken: previousToken as Node, previousToken: previousToken as Node };
    }

    function getAutoImportSymbolFromCompletionEntryData(name: string, data: CompletionEntryData, program: Program, host: LanguageServiceHost): { symbol: Symbol, origin: SymbolOriginInfoExport } | undefined {
        const containingProgram = data.isPackageJsonImport ? host.getPackageJsonAutoImportProvider!()! : program;
        const checker = containingProgram.getTypeChecker();
        const moduleSymbol =
            data.ambientModuleName ? checker.tryFindAmbientModule(data.ambientModuleName) :
            data.fileName ? checker.getMergedSymbol(Debug.checkDefined(containingProgram.getSourceFile(data.fileName)).symbol) :
            undefined;

        if (!moduleSymbol) return undefined;
        let symbol = data.exportName === InternalSymbolName.ExportEquals
            ? checker.resolveExternalModuleSymbol(moduleSymbol)
            : checker.tryGetMemberInModuleExportsAndProperties(data.exportName, moduleSymbol);
        if (!symbol) return undefined;
        const isDefaultExport = data.exportName === InternalSymbolName.Default;
        symbol = isDefaultExport && getLocalSymbolForExportDefault(symbol) || symbol;
        return {
            symbol,
            origin: {
                kind: data.moduleSpecifier ? SymbolOriginInfoKind.ResolvedExport : SymbolOriginInfoKind.Export,
                moduleSymbol,
                symbolName: name,
                isDefaultExport,
                exportName: data.exportName,
                fileName: data.fileName,
                isFromPackageJson: !!data.isPackageJsonImport,
            }
        };
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
        const name = originIncludesSymbolName(origin) ? origin.symbolName : symbol.name;
        if (name === undefined
            // If the symbol is external module, don't show it in the completion list
            // (i.e declare module "http" { const x; } | // <= request completion here, "http" should not be there)
            || symbol.flags & SymbolFlags.Module && isSingleOrDoubleQuote(name.charCodeAt(0))
            // If the symbol is the internal name of an ES symbol, it is not a valid entry. Internal names for ES symbols start with "__@"
            || isKnownSymbol(symbol)) {
            return undefined;
        }

        const validNameResult: CompletionEntryDisplayNameForSymbol = { name, needsConvertPropertyAccess: false };
        if (isIdentifierText(name, target, jsxIdentifierExpected ? LanguageVariant.JSX : LanguageVariant.Standard) || symbol.valueDeclaration && isPrivateIdentifierClassElementDeclaration(symbol.valueDeclaration)) {
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
                sortText: SortText.GlobalsOrKeywords
            });
        }
        return res;
    });

    function getKeywordCompletions(keywordFilter: KeywordCompletionFilters, filterOutTsOnlyKeywords: boolean): readonly CompletionEntry[] {
        if (!filterOutTsOnlyKeywords) return getTypescriptKeywordCompletions(keywordFilter);

        const index = keywordFilter + KeywordCompletionFilters.Last + 1;
        return _keywordCompletions[index] ||
            (_keywordCompletions[index] = getTypescriptKeywordCompletions(keywordFilter)
                .filter(entry => !isTypeScriptOnlyKeyword(stringToToken(entry.name)!))
            );
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
            || kind === SyntaxKind.AsKeyword
            || !isContextualKeyword(kind) && !isClassMemberCompletionKeyword(kind);
    }

    function keywordForNode(node: Node): SyntaxKind {
        return isIdentifier(node) ? node.originalKeywordKind || SyntaxKind.Unknown : node.kind;
    }

    /** Get the corresponding JSDocTag node if the position is in a jsDoc comment */
    function getJsDocTagAtPosition(node: Node, position: number): JSDocTag | undefined {
        const jsdoc = findAncestor(node, isJSDoc);
        return jsdoc && jsdoc.tags && (rangeContainsPosition(jsdoc, position) ? findLast(jsdoc.tags, tag => tag.pos < position) : undefined);
    }

    export function getPropertiesForObjectExpression(contextualType: Type, completionsType: Type | undefined, obj: ObjectLiteralExpression | JsxAttributes, checker: TypeChecker): Symbol[] {
        const hasCompletionsType = completionsType && completionsType !== contextualType;
        const type = hasCompletionsType && !(completionsType!.flags & TypeFlags.AnyOrUnknown)
            ? checker.getUnionType([contextualType, completionsType!])
            : contextualType;

        const properties = type.isUnion()
            ? checker.getAllPossiblePropertiesOfTypes(type.types.filter(memberType =>
                // If we're providing completions for an object literal, skip primitive, array-like, or callable types since those shouldn't be implemented by object literals.
                !(memberType.flags & TypeFlags.Primitive ||
                    checker.isArrayLikeType(memberType) ||
                    typeHasCallOrConstructSignatures(memberType, checker) ||
                    checker.isTypeInvalidDueToUnionDiscriminant(memberType, obj))))
            : type.getApparentProperties();

        return hasCompletionsType ? properties.filter(hasDeclarationOtherThanSelf) : properties;

        // Filter out members whose only declaration is the object literal itself to avoid
        // self-fulfilling completions like:
        //
        // function f<T>(x: T) {}
        // f({ abc/**/: "" }) // `abc` is a member of `T` but only because it declares itself
        function hasDeclarationOtherThanSelf(member: Symbol) {
            return some(member.declarations, decl => decl.parent !== obj);
        }
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
           case SyntaxKind.Identifier: {
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
        if (location.kind === SyntaxKind.ConstructorKeyword
            // class C { blah \n constructor/**/ }
            || (isIdentifier(contextToken) && isPropertyDeclaration(contextToken.parent) && isClassLike(location))) {
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
                if (!isFromObjectTypeDeclaration(contextToken)) {
                    // class c extends React.Component { a: () => 1\n| }
                    if (getLineAndCharacterOfPosition(sourceFile, contextToken.getEnd()).line !== getLineAndCharacterOfPosition(sourceFile, position).line && isObjectTypeDeclaration(location)) {
                        return location;
                    }
                    return undefined;
                }
                const isValidKeyword = isClassLike(contextToken.parent.parent) ? isClassMemberCompletionKeyword : isInterfaceOrTypeLiteralCompletionKeyword;
                return (isValidKeyword(contextToken.kind) || contextToken.kind === SyntaxKind.AsteriskToken || isIdentifier(contextToken) && isValidKeyword(stringToToken(contextToken.text)!)) // TODO: GH#18217
                    ? contextToken.parent.parent as ObjectTypeDeclaration : undefined;
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
                return checker.getTypeOfPropertyOfContextualType(t, node.symbol.escapedName);
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
        if (isBinaryExpression(node.parent) && node.parent.operatorToken.kind === SyntaxKind.EqualsToken && node === node.parent.left) {
            // Object literal is assignment pattern: ({ | } = x)
            return typeChecker.getTypeAtLocation(node.parent);
        }
        return undefined;
    }

    function getImportCompletionNode(contextToken: Node) {
        const candidate = getCandidate();
        return candidate === SyntaxKind.FromKeyword || candidate && rangeIsOnSingleLine(candidate, candidate.getSourceFile()) ? candidate : undefined;

        function getCandidate() {
            const parent = contextToken.parent;
            if (isImportEqualsDeclaration(parent)) {
                return isModuleSpecifierMissingOrEmpty(parent.moduleReference) ? parent : undefined;
            }
            if (isNamedImports(parent) || isNamespaceImport(parent)) {
                if (isModuleSpecifierMissingOrEmpty(parent.parent.parent.moduleSpecifier) && (isNamespaceImport(parent) || parent.elements.length < 2) && !parent.parent.name) {
                    // At `import { ... } |` or `import * as Foo |`, the only possible completion is `from`
                    return contextToken.kind === SyntaxKind.CloseBraceToken || contextToken.kind === SyntaxKind.Identifier
                        ? SyntaxKind.FromKeyword
                        : parent.parent.parent;
                }
                return undefined;
            }
            if (isImportKeyword(contextToken) && isSourceFile(parent)) {
                // A lone import keyword with nothing following it does not parse as a statement at all
                return contextToken as Token<SyntaxKind.ImportKeyword>;
            }
            if (isImportKeyword(contextToken) && isImportDeclaration(parent)) {
                // `import s| from`
                return isModuleSpecifierMissingOrEmpty(parent.moduleSpecifier) ? parent : undefined;
            }
            return undefined;
        }
    }

    function isModuleSpecifierMissingOrEmpty(specifier: ModuleReference | Expression) {
        if (nodeIsMissing(specifier)) return true;
        return !tryCast(isExternalModuleReference(specifier) ? specifier.expression : specifier, isStringLiteralLike)?.text;
    }

    function getVariableDeclaration(property: Node): VariableDeclaration | undefined {
        const variableDeclaration = findAncestor(property, node =>
            isFunctionBlock(node) || isArrowFunctionBody(node) || isBindingPattern(node)
                ? "quit"
                : isVariableDeclaration(node));

        return variableDeclaration as VariableDeclaration | undefined;
    }

    function isArrowFunctionBody(node: Node) {
        return node.parent && isArrowFunction(node.parent) && node.parent.body === node;
    };

    /** True if symbol is a type or a module containing at least one type. */
    function symbolCanBeReferencedAtTypeLocation(symbol: Symbol, checker: TypeChecker, seenModules = new Map<SymbolId, true>()): boolean {
        const sym = skipAlias(symbol.exportSymbol || symbol, checker);
        return !!(sym.flags & SymbolFlags.Type) ||
            !!(sym.flags & SymbolFlags.Module) &&
            addToSeen(seenModules, getSymbolId(sym)) &&
            checker.getExportsOfModule(sym).some(e => symbolCanBeReferencedAtTypeLocation(e, checker, seenModules));
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
                matchedFirstCharacter ||=
                    prevChar === undefined || // Beginning of word
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
}
