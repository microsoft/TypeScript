/* @internal */
namespace ts.Completions {
    export enum SortText {
        LocationPriority = "0",
        OptionalMember = "1",
        MemberDeclaredBySpreadAssignment = "2",
        SuggestedClassMembers = "3",
        GlobalsOrKeywords = "4",
        AutoImportSuggestions = "5",
        JavascriptIdentifiers = "6"
    }
    export type Log = (message: string) => void;

    const enum SymbolOriginInfoKind {
        ThisType            = 1 << 0,
        SymbolMember        = 1 << 1,
        Export              = 1 << 2,
        Promise             = 1 << 3,
        Nullable            = 1 << 4,

        SymbolMemberNoExport = SymbolMember,
        SymbolMemberExport   = SymbolMember | Export,
    }

    interface SymbolOriginInfo {
        kind: SymbolOriginInfoKind;
    }

    interface SymbolOriginInfoExport extends SymbolOriginInfo {
        kind: SymbolOriginInfoKind;
        moduleSymbol: Symbol;
        isDefaultExport: boolean;
    }

    function originIsThisType(origin: SymbolOriginInfo): boolean {
        return !!(origin.kind & SymbolOriginInfoKind.ThisType);
    }

    function originIsSymbolMember(origin: SymbolOriginInfo): boolean {
        return !!(origin.kind & SymbolOriginInfoKind.SymbolMember);
    }

    function originIsExport(origin: SymbolOriginInfo): origin is SymbolOriginInfoExport {
        return !!(origin.kind & SymbolOriginInfoKind.Export);
    }

    function originIsPromise(origin: SymbolOriginInfo): boolean {
        return !!(origin.kind & SymbolOriginInfoKind.Promise);
    }

    function originIsNullableMember(origin: SymbolOriginInfo): boolean {
        return !!(origin.kind & SymbolOriginInfoKind.Nullable);
    }

    /**
     * Map from symbol id -> SymbolOriginInfo.
     * Only populated for symbols that come from other modules.
     */
    type SymbolOriginInfoMap = (SymbolOriginInfo | SymbolOriginInfoExport | undefined)[];

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
        Last = TypeKeywords
    }

    const enum GlobalsSearch { Continue, Success, Fail }

    export interface AutoImportSuggestion {
        symbol: Symbol;
        symbolName: string;
        skipFilter: boolean;
        origin: SymbolOriginInfoExport;
    }
    export interface ImportSuggestionsForFileCache {
        clear(): void;
        get(fileName: string, checker: TypeChecker, projectVersion?: string): readonly AutoImportSuggestion[] | undefined;
        set(fileName: string, suggestions: readonly AutoImportSuggestion[], projectVersion?: string): void;
        isEmpty(): boolean;
    }
    export function createImportSuggestionsForFileCache(): ImportSuggestionsForFileCache {
        let cache: readonly AutoImportSuggestion[] | undefined;
        let projectVersion: string | undefined;
        let fileName: string | undefined;
        return {
            isEmpty() {
                return !cache;
            },
            clear: () => {
                cache = undefined;
                fileName = undefined;
                projectVersion = undefined;
            },
            set: (file, suggestions, version) => {
                cache = suggestions;
                fileName = file;
                if (version) {
                    projectVersion = version;
                }
            },
            get: (file, checker, version) => {
                if (file !== fileName) {
                    return undefined;
                }
                if (version) {
                    return projectVersion === version ? cache : undefined;
                }
                forEach(cache, suggestion => {
                    // If the symbol/moduleSymbol was a merged symbol, it will have a new identity
                    // in the checker, even though the symbols to merge are the same (guaranteed by
                    // cache invalidation in synchronizeHostData).
                    if (suggestion.symbol.declarations?.length) {
                        suggestion.symbol = checker.getMergedSymbol(suggestion.origin.isDefaultExport
                            ? suggestion.symbol.declarations[0].localSymbol ?? suggestion.symbol.declarations[0].symbol
                            : suggestion.symbol.declarations[0].symbol);
                    }
                    if (suggestion.origin.moduleSymbol.declarations?.length) {
                        suggestion.origin.moduleSymbol = checker.getMergedSymbol(suggestion.origin.moduleSymbol.declarations[0].symbol);
                    }
                });
                return cache;
            },
        };
    }

    export function getCompletionsAtPosition(
        host: LanguageServiceHost,
        program: Program,
        log: Log,
        sourceFile: SourceFile,
        position: number,
        preferences: UserPreferences,
        triggerCharacter: CompletionsTriggerCharacter | undefined,
    ): CompletionInfo | undefined {
        const typeChecker = program.getTypeChecker();
        const compilerOptions = program.getCompilerOptions();

        const contextToken = findPrecedingToken(position, sourceFile);
        if (triggerCharacter && !isInString(sourceFile, position, contextToken) && !isValidTrigger(sourceFile, triggerCharacter, contextToken, position)) {
            return undefined;
        }

        const stringCompletions = StringCompletions.getStringLiteralCompletions(sourceFile, position, contextToken, typeChecker, compilerOptions, host, log, preferences);
        if (stringCompletions) {
            return stringCompletions;
        }

        if (contextToken && isBreakOrContinueStatement(contextToken.parent)
            && (contextToken.kind === SyntaxKind.BreakKeyword || contextToken.kind === SyntaxKind.ContinueKeyword || contextToken.kind === SyntaxKind.Identifier)) {
            return getLabelCompletionAtPosition(contextToken.parent);
        }

        const completionData = getCompletionData(program, log, sourceFile, isUncheckedFile(sourceFile, compilerOptions), position, preferences, /*detailsEntryId*/ undefined, host);
        if (!completionData) {
            return undefined;
        }

        switch (completionData.kind) {
            case CompletionDataKind.Data:
                return completionInfoFromData(sourceFile, typeChecker, compilerOptions, log, completionData, preferences);
            case CompletionDataKind.JsDocTagName:
                // If the current position is a jsDoc tag name, only tag names should be provided for completion
                return jsdocCompletionInfo(JsDoc.getJSDocTagNameCompletions());
            case CompletionDataKind.JsDocTag:
                // If the current position is a jsDoc tag, only tags should be provided for completion
                return jsdocCompletionInfo(JsDoc.getJSDocTagCompletions());
            case CompletionDataKind.JsDocParameterName:
                return jsdocCompletionInfo(JsDoc.getJSDocParameterNameCompletions(completionData.tag));
            default:
                return Debug.assertNever(completionData);
        }
    }

    function jsdocCompletionInfo(entries: CompletionEntry[]): CompletionInfo {
        return { isGlobalCompletion: false, isMemberCompletion: false, isNewIdentifierLocation: false, entries };
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
            insideJsDocTagTypeExpression,
            symbolToSortTextMap,
        } = completionData;

        if (location && location.parent && isJsxClosingElement(location.parent)) {
            // In the TypeScript JSX element, if such element is not defined. When users query for completion at closing tag,
            // instead of simply giving unknown value, the completion will return the tag-name of an associated opening-element.
            // For example:
            //     var x = <div> </ /*1*/
            // The completion list at "1" will contain "div>" with type any
            // And at `<div> </ /*1*/ >` (with a closing `>`), the completion list will contain "div".
            const tagName = location.parent.parent.openingElement.tagName;
            const hasClosingAngleBracket = !!findChildOfKind(location.parent, SyntaxKind.GreaterThanToken, sourceFile);
            const entry: CompletionEntry = {
                name: tagName.getFullText(sourceFile) + (hasClosingAngleBracket ? "" : ">"),
                kind: ScriptElementKind.classElement,
                kindModifiers: undefined,
                sortText: SortText.LocationPriority,
            };
            return { isGlobalCompletion: false, isMemberCompletion: true, isNewIdentifierLocation: false, entries: [entry] };
        }

        const entries: CompletionEntry[] = [];

        if (isUncheckedFile(sourceFile, compilerOptions)) {
            const uniqueNames = getCompletionEntriesFromSymbols(
                symbols,
                entries,
                location,
                sourceFile,
                typeChecker,
                compilerOptions.target!,
                log,
                completionKind,
                preferences,
                propertyAccessToConvert,
                isJsxInitializer,
                recommendedCompletion,
                symbolToOriginInfoMap,
                symbolToSortTextMap
            );
            getJSCompletionEntries(sourceFile, location!.pos, uniqueNames, compilerOptions.target!, entries); // TODO: GH#18217
        }
        else {
            if (!isNewIdentifierLocation && (!symbols || symbols.length === 0) && keywordFilters === KeywordCompletionFilters.None) {
                return undefined;
            }

            getCompletionEntriesFromSymbols(
                symbols,
                entries,
                location,
                sourceFile,
                typeChecker,
                compilerOptions.target!,
                log,
                completionKind,
                preferences,
                propertyAccessToConvert,
                isJsxInitializer,
                recommendedCompletion,
                symbolToOriginInfoMap,
                symbolToSortTextMap
            );
        }

        if (keywordFilters !== KeywordCompletionFilters.None) {
            const entryNames = arrayToSet(entries, e => e.name);
            for (const keywordEntry of getKeywordCompletions(keywordFilters, !insideJsDocTagTypeExpression && isSourceFileJS(sourceFile))) {
                if (!entryNames.has(keywordEntry.name)) {
                    entries.push(keywordEntry);
                }
            }
        }

        for (const literal of literals) {
            entries.push(createCompletionEntryForLiteral(literal));
        }

        return { isGlobalCompletion: isInSnippetScope, isMemberCompletion: isMemberCompletionKind(completionKind), isNewIdentifierLocation, entries };
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

    function getJSCompletionEntries(
        sourceFile: SourceFile,
        position: number,
        uniqueNames: Map<true>,
        target: ScriptTarget,
        entries: Push<CompletionEntry>): void {
        getNameTable(sourceFile).forEach((pos, name) => {
            // Skip identifiers produced only from the current location
            if (pos === position) {
                return;
            }
            const realName = unescapeLeadingUnderscores(name);
            if (addToSeen(uniqueNames, realName) && isIdentifierText(realName, target)) {
                entries.push({
                    name: realName,
                    kind: ScriptElementKind.warning,
                    kindModifiers: "",
                    sortText: SortText.JavascriptIdentifiers
                });
            }
        });
    }

    const completionNameForLiteral = (literal: string | number | PseudoBigInt) =>
        typeof literal === "object" ? pseudoBigIntToString(literal) + "n" : JSON.stringify(literal);
    function createCompletionEntryForLiteral(literal: string | number | PseudoBigInt): CompletionEntry {
        return { name: completionNameForLiteral(literal), kind: ScriptElementKind.string, kindModifiers: ScriptElementKindModifier.none, sortText: SortText.LocationPriority };
    }

    function createCompletionEntry(
        symbol: Symbol,
        sortText: SortText,
        location: Node | undefined,
        sourceFile: SourceFile,
        typeChecker: TypeChecker,
        name: string,
        needsConvertPropertyAccess: boolean,
        origin: SymbolOriginInfo | undefined,
        recommendedCompletion: Symbol | undefined,
        propertyAccessToConvert: PropertyAccessExpression | undefined,
        isJsxInitializer: IsJsxInitializer | undefined,
        preferences: UserPreferences,
    ): CompletionEntry | undefined {
        let insertText: string | undefined;
        let replacementSpan: TextSpan | undefined;

        const insertQuestionDot = origin && originIsNullableMember(origin);
        const useBraces = origin && originIsSymbolMember(origin) || needsConvertPropertyAccess;
        if (origin && originIsThisType(origin)) {
            insertText = needsConvertPropertyAccess
                ? `this${insertQuestionDot ? "?." : ""}[${quote(name, preferences)}]`
                : `this${insertQuestionDot ? "?." : "."}${name}`;
        }
        // We should only have needsConvertPropertyAccess if there's a property access to convert. But see #21790.
        // Somehow there was a global with a non-identifier name. Hopefully someone will complain about getting a "foo bar" global completion and provide a repro.
        else if ((useBraces || insertQuestionDot) && propertyAccessToConvert) {
            insertText = useBraces ? needsConvertPropertyAccess ? `[${quote(name, preferences)}]` : `[${name}]` : name;
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

        if (insertText !== undefined && !preferences.includeCompletionsWithInsertText) {
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
            name,
            kind: SymbolDisplay.getSymbolKind(typeChecker, symbol, location!), // TODO: GH#18217
            kindModifiers: SymbolDisplay.getSymbolModifiers(symbol),
            sortText,
            source: getSourceFromOrigin(origin),
            hasAction: trueOrUndefined(!!origin && originIsExport(origin)),
            isRecommended: trueOrUndefined(isRecommendedCompletionMatch(symbol, recommendedCompletion, typeChecker)),
            insertText,
            replacementSpan,
        };
    }

    function isRecommendedCompletionMatch(localSymbol: Symbol, recommendedCompletion: Symbol | undefined, checker: TypeChecker): boolean {
        return localSymbol === recommendedCompletion ||
            !!(localSymbol.flags & SymbolFlags.ExportValue) && checker.getExportSymbolOfSymbol(localSymbol) === recommendedCompletion;
    }

    function trueOrUndefined(b: boolean): true | undefined {
        return b ? true : undefined;
    }

    function getSourceFromOrigin(origin: SymbolOriginInfo | undefined): string | undefined {
        return origin && originIsExport(origin) ? stripQuotes(origin.moduleSymbol.name) : undefined;
    }

    export function getCompletionEntriesFromSymbols(
        symbols: readonly Symbol[],
        entries: Push<CompletionEntry>,
        location: Node | undefined,
        sourceFile: SourceFile,
        typeChecker: TypeChecker,
        target: ScriptTarget,
        log: Log,
        kind: CompletionKind,
        preferences: UserPreferences,
        propertyAccessToConvert?: PropertyAccessExpression,
        isJsxInitializer?: IsJsxInitializer,
        recommendedCompletion?: Symbol,
        symbolToOriginInfoMap?: SymbolOriginInfoMap,
        symbolToSortTextMap?: SymbolSortTextMap,
    ): Map<true> {
        const start = timestamp();
        // Tracks unique names.
        // We don't set this for global variables or completions from external module exports, because we can have multiple of those.
        // Based on the order we add things we will always see locals first, then globals, then module exports.
        // So adding a completion for a local will prevent us from adding completions for external module exports sharing the same name.
        const uniques = createMap<true>();
        for (const symbol of symbols) {
            const origin = symbolToOriginInfoMap ? symbolToOriginInfoMap[getSymbolId(symbol)] : undefined;
            const info = getCompletionEntryDisplayNameForSymbol(symbol, target, origin, kind);
            if (!info) {
                continue;
            }
            const { name, needsConvertPropertyAccess } = info;
            if (uniques.has(name)) {
                continue;
            }

            const entry = createCompletionEntry(
                symbol,
                symbolToSortTextMap && symbolToSortTextMap[getSymbolId(symbol)] || SortText.LocationPriority,
                location,
                sourceFile,
                typeChecker,
                name,
                needsConvertPropertyAccess,
                origin,
                recommendedCompletion,
                propertyAccessToConvert,
                isJsxInitializer,
                preferences
            );
            if (!entry) {
                continue;
            }

            // Latter case tests whether this is a global variable.
            if (!origin && !(symbol.parent === undefined && !some(symbol.declarations, d => d.getSourceFile() === location!.getSourceFile()))) { // TODO: GH#18217
                uniques.set(name, true);
            }

            entries.push(entry);
        }

        log("getCompletionsAtPosition: getCompletionEntriesFromSymbols: " + (timestamp() - start));
        return uniques;
    }

    function getLabelCompletionAtPosition(node: BreakOrContinueStatement): CompletionInfo | undefined {
        const entries = getLabelStatementCompletions(node);
        if (entries.length) {
            return { isGlobalCompletion: false, isMemberCompletion: false, isNewIdentifierLocation: false, entries };
        }
    }

    function getLabelStatementCompletions(node: Node): CompletionEntry[] {
        const entries: CompletionEntry[] = [];
        const uniques = createMap<true>();
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
        location: Node | undefined;
        symbolToOriginInfoMap: SymbolOriginInfoMap;
        previousToken: Node | undefined;
        readonly isJsxInitializer: IsJsxInitializer;
    }
    function getSymbolCompletionFromEntryId(
        program: Program,
        log: Log,
        sourceFile: SourceFile,
        position: number,
        entryId: CompletionEntryIdentifier,
        host: LanguageServiceHost,
    ): SymbolCompletion | { type: "request", request: Request } | { type: "literal", literal: string | number | PseudoBigInt } | { type: "none" } {
        const compilerOptions = program.getCompilerOptions();
        const completionData = getCompletionData(program, log, sourceFile, isUncheckedFile(sourceFile, compilerOptions), position, { includeCompletionsForModuleExports: true, includeCompletionsWithInsertText: true }, entryId, host);
        if (!completionData) {
            return { type: "none" };
        }
        if (completionData.kind !== CompletionDataKind.Data) {
            return { type: "request", request: completionData };
        }

        const { symbols, literals, location, completionKind, symbolToOriginInfoMap, previousToken, isJsxInitializer } = completionData;

        const literal = find(literals, l => completionNameForLiteral(l) === entryId.name);
        if (literal !== undefined) return { type: "literal", literal };

        // Find the symbol with the matching entry name.
        // We don't need to perform character checks here because we're only comparing the
        // name against 'entryName' (which is known to be good), not building a new
        // completion entry.
        return firstDefined(symbols, (symbol): SymbolCompletion | undefined => {
            const origin = symbolToOriginInfoMap[getSymbolId(symbol)];
            const info = getCompletionEntryDisplayNameForSymbol(symbol, compilerOptions.target!, origin, completionKind);
            return info && info.name === entryId.name && getSourceFromOrigin(origin) === entryId.source
                ? { type: "symbol" as const, symbol, location, symbolToOriginInfoMap, previousToken, isJsxInitializer }
                : undefined;
        }) || { type: "none" };
    }

    function getSymbolName(symbol: Symbol, origin: SymbolOriginInfo | undefined, target: ScriptTarget): string {
        return origin && originIsExport(origin) && (
            (origin.isDefaultExport && symbol.escapedName === InternalSymbolName.Default) ||
            (symbol.escapedName === InternalSymbolName.ExportEquals))
            // Name of "export default foo;" is "foo". Name of "export default 0" is the filename converted to camelCase.
            ? firstDefined(symbol.declarations, d => isExportAssignment(d) && isIdentifier(d.expression) ? d.expression.text : undefined)
            || codefix.moduleSymbolToValidIdentifier(origin.moduleSymbol, target)
            : symbol.name;
    }

    export interface CompletionEntryIdentifier {
        name: string;
        source?: string;
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
            return StringCompletions.getStringLiteralCompletionDetails(name, sourceFile, position, contextToken, typeChecker, compilerOptions, host, cancellationToken);
        }

        // Compute all the completion symbols again.
        const symbolCompletion = getSymbolCompletionFromEntryId(program, log, sourceFile, position, entryId, host);
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
                    default:
                        return Debug.assertNever(request);
                }
            }
            case "symbol": {
                const { symbol, location, symbolToOriginInfoMap, previousToken } = symbolCompletion;
                const { codeActions, sourceDisplay } = getCompletionEntryCodeActionsAndSourceDisplay(symbolToOriginInfoMap, symbol, program, typeChecker, host, compilerOptions, sourceFile, position, previousToken, formatContext, preferences);
                return createCompletionDetailsForSymbol(symbol, typeChecker, sourceFile, location!, cancellationToken, codeActions, sourceDisplay); // TODO: GH#18217
            }
            case "literal": {
                const { literal } = symbolCompletion;
                return createSimpleDetails(completionNameForLiteral(literal), ScriptElementKind.string, typeof literal === "string" ? SymbolDisplayPartKind.stringLiteral : SymbolDisplayPartKind.numericLiteral);
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
        return createCompletionDetails(symbol.name, SymbolDisplay.getSymbolModifiers(symbol), symbolKind, displayParts, documentation, tags, codeActions, sourceDisplay);
    }

    export function createCompletionDetails(name: string, kindModifiers: string, kind: ScriptElementKind, displayParts: SymbolDisplayPart[], documentation?: SymbolDisplayPart[], tags?: JSDocTagInfo[], codeActions?: CodeAction[], source?: SymbolDisplayPart[]): CompletionEntryDetails {
        return { name, kindModifiers, kind, displayParts, documentation, tags, codeActions, source };
    }

    interface CodeActionsAndSourceDisplay {
        readonly codeActions: CodeAction[] | undefined;
        readonly sourceDisplay: SymbolDisplayPart[] | undefined;
    }
    function getCompletionEntryCodeActionsAndSourceDisplay(
        symbolToOriginInfoMap: SymbolOriginInfoMap,
        symbol: Symbol,
        program: Program,
        checker: TypeChecker,
        host: LanguageServiceHost,
        compilerOptions: CompilerOptions,
        sourceFile: SourceFile,
        position: number,
        previousToken: Node | undefined,
        formatContext: formatting.FormatContext,
        preferences: UserPreferences,
    ): CodeActionsAndSourceDisplay {
        const symbolOriginInfo = symbolToOriginInfoMap[getSymbolId(symbol)];
        if (!symbolOriginInfo || !originIsExport(symbolOriginInfo)) {
            return { codeActions: undefined, sourceDisplay: undefined };
        }

        const { moduleSymbol } = symbolOriginInfo;
        const exportedSymbol = checker.getMergedSymbol(skipAlias(symbol.exportSymbol || symbol, checker));
        const { moduleSpecifier, codeAction } = codefix.getImportCompletionAction(
            exportedSymbol,
            moduleSymbol,
            sourceFile,
            getSymbolName(symbol, symbolOriginInfo, compilerOptions.target!),
            host,
            program,
            formatContext,
            previousToken && isIdentifier(previousToken) ? previousToken.getStart(sourceFile) : position,
            preferences);
        return { sourceDisplay: [textPart(moduleSpecifier)], codeActions: [codeAction] };
    }

    export function getCompletionEntrySymbol(
        program: Program,
        log: Log,
        sourceFile: SourceFile,
        position: number,
        entryId: CompletionEntryIdentifier,
        host: LanguageServiceHost,
    ): Symbol | undefined {
        const completion = getSymbolCompletionFromEntryId(program, log, sourceFile, position, entryId, host);
        return completion.type === "symbol" ? completion.symbol : undefined;
    }

    const enum CompletionDataKind { Data, JsDocTagName, JsDocTag, JsDocParameterName }
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
        readonly location: Node | undefined;
        readonly keywordFilters: KeywordCompletionFilters;
        readonly literals: readonly (string | number | PseudoBigInt)[];
        readonly symbolToOriginInfoMap: SymbolOriginInfoMap;
        readonly recommendedCompletion: Symbol | undefined;
        readonly previousToken: Node | undefined;
        readonly isJsxInitializer: IsJsxInitializer;
        readonly insideJsDocTagTypeExpression: boolean;
        readonly symbolToSortTextMap: SymbolSortTextMap;
    }
    type Request = { readonly kind: CompletionDataKind.JsDocTagName | CompletionDataKind.JsDocTag } | { readonly kind: CompletionDataKind.JsDocParameterName, tag: JSDocParameterTag };

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
        return symbol.declarations.some(d => d.kind === SyntaxKind.SourceFile);
    }

    function getCompletionData(
        program: Program,
        log: (message: string) => void,
        sourceFile: SourceFile,
        isUncheckedFile: boolean,
        position: number,
        preferences: Pick<UserPreferences, "includeCompletionsForModuleExports" | "includeCompletionsWithInsertText" | "includeAutomaticOptionalChainCompletions">,
        detailsEntryId: CompletionEntryIdentifier | undefined,
        host: LanguageServiceHost,
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
                    if (!(sourceFile.text.substring(lineStart, position).match(/[^\*|\s|(/\*\*)]/))) {
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
                                (<JSDocPropertyTag>currentToken.parent).name !== currentToken))) {
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
        const previousToken = findPrecedingToken(position, sourceFile, /*startNode*/ undefined)!; // TODO: GH#18217
        log("getCompletionData: Get previous token 1: " + (timestamp() - start));

        // The decision to provide completion depends on the contextToken, which is determined through the previousToken.
        // Note: 'previousToken' (and thus 'contextToken') can be undefined if we are the beginning of the file
        let contextToken = previousToken;

        // Check if the caret is at the end of an identifier; this is a partial identifier that we want to complete: e.g. a.toS|
        // Skip this partial identifier and adjust the contextToken to the token that precedes it.
        if (contextToken && position <= contextToken.end && (isIdentifier(contextToken) || isKeyword(contextToken.kind))) {
            const start = timestamp();
            contextToken = findPrecedingToken(contextToken.getFullStart(), sourceFile, /*startNode*/ undefined)!; // TODO: GH#18217
            log("getCompletionData: Get previous token 2: " + (timestamp() - start));
        }

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

        let location = getTouchingPropertyName(sourceFile, position);
        if (contextToken) {
            // Bail out if this is a known invalid completion location
            if (isCompletionListBlocker(contextToken)) {
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
                        if (node.end === contextToken.pos &&
                            isCallExpression(node) &&
                            node.getChildCount(sourceFile) &&
                            last(node.getChildren(sourceFile)).kind !== SyntaxKind.CloseParenToken) {
                            // This is likely dot from incorrectly parsed call expression and user is starting to write spread
                            // eg: Math.min(./**/)
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
            else if (sourceFile.languageVariant === LanguageVariant.JSX) {
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
                        if (contextToken.kind === SyntaxKind.LessThanToken) {
                            isRightOfOpenTag = true;
                            location = contextToken;
                        }
                        break;

                    case SyntaxKind.JsxAttribute:
                        switch (previousToken.kind) {
                            case SyntaxKind.EqualsToken:
                                isJsxInitializer = true;
                                break;
                            case SyntaxKind.Identifier:
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
        let keywordFilters = KeywordCompletionFilters.None;
        // This also gets mutated in nested-functions after the return
        let symbols: Symbol[] = [];
        const symbolToOriginInfoMap: SymbolOriginInfoMap = [];
        const symbolToSortTextMap: SymbolSortTextMap = [];
        const importSuggestionsCache = host.getImportSuggestionsCache && host.getImportSuggestionsCache();

        if (isRightOfDot || isRightOfQuestionDot) {
            getTypeScriptMemberSymbols();
        }
        else if (isRightOfOpenTag) {
            const tagSymbols = Debug.assertEachDefined(typeChecker.getJsxIntrinsicTagNamesAt(location), "getJsxIntrinsicTagNames() should all be defined");
            tryGetGlobalSymbols();
            symbols = tagSymbols.concat(symbols);
            completionKind = CompletionKind.MemberLike;
            keywordFilters = KeywordCompletionFilters.None;
        }
        else if (isStartingCloseTag) {
            const tagName = (<JsxElement>contextToken.parent.parent).openingElement.tagName;
            const tagSymbol = typeChecker.getSymbolAtLocation(tagName);
            if (tagSymbol) {
                symbols = [tagSymbol];
            }
            completionKind = CompletionKind.MemberLike;
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
            symbolToSortTextMap
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
            if (isEntityName(node) || isImportType) {
                const isNamespaceName = isModuleDeclaration(node.parent);
                if (isNamespaceName) isNewIdentifierLocation = true;
                let symbol = typeChecker.getSymbolAtLocation(node);
                if (symbol) {
                    symbol = skipAlias(symbol, typeChecker);

                    if (symbol.flags & (SymbolFlags.Module | SymbolFlags.Enum)) {
                        // Extract module or enum members
                        const exportedSymbols = Debug.assertEachDefined(typeChecker.getExportsOfModule(symbol), "getExportsOfModule() should all be defined");
                        const isValidValueAccess = (symbol: Symbol) => typeChecker.isValidPropertyAccess(isImportType ? <ImportTypeNode>node : <PropertyAccessExpression>(node.parent), symbol.name);
                        const isValidTypeAccess = (symbol: Symbol) => symbolCanBeReferencedAtTypeLocation(symbol);
                        const isValidAccess: (symbol: Symbol) => boolean =
                            isNamespaceName
                                // At `namespace N.M/**/`, if this is the only declaration of `M`, don't include `M` as a completion.
                                ? symbol => !!(symbol.flags & SymbolFlags.Namespace) && !symbol.declarations.every(d => d.parent === node.parent)
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

            if (isMetaProperty(node) && (node.keywordToken === SyntaxKind.NewKeyword || node.keywordToken === SyntaxKind.ImportKeyword)) {
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

            const propertyAccess = node.kind === SyntaxKind.ImportType ? <ImportTypeNode>node : <PropertyAccessExpression | QualifiedName>node.parent;
            if (isUncheckedFile) {
                // In javascript files, for union types, we don't just get the members that
                // the individual types have in common, we also include all the members that
                // each individual type has. This is because we're going to add all identifiers
                // anyways. So we might as well elevate the members that were at least part
                // of the individual types to a higher status since we know what they are.
                symbols.push(...getPropertiesForCompletion(type, typeChecker));
            }
            else {
                for (const symbol of type.getApparentProperties()) {
                    if (typeChecker.isValidPropertyAccessForCompletions(propertyAccess, type, symbol)) {
                        addPropertySymbol(symbol, /*insertAwait*/ false, insertQuestionDot);
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
                if (firstAccessibleSymbol && !symbolToOriginInfoMap[getSymbolId(firstAccessibleSymbol)]) {
                    symbols.push(firstAccessibleSymbol);
                    const moduleSymbol = firstAccessibleSymbol.parent;
                    symbolToOriginInfoMap[getSymbolId(firstAccessibleSymbol)] =
                        !moduleSymbol || !isExternalModuleSymbol(moduleSymbol)
                            ? { kind: getNullableSymbolOriginInfoKind(SymbolOriginInfoKind.SymbolMemberNoExport) }
                            : { kind: getNullableSymbolOriginInfoKind(SymbolOriginInfoKind.SymbolMemberExport), moduleSymbol, isDefaultExport: false };
                }
                else if (preferences.includeCompletionsWithInsertText) {
                    addSymbolOriginInfo(symbol);
                    symbols.push(symbol);
                }
            }
            else {
                addSymbolOriginInfo(symbol);
                symbols.push(symbol);
            }

            function addSymbolOriginInfo(symbol: Symbol) {
                if (preferences.includeCompletionsWithInsertText) {
                    if (insertAwait && !symbolToOriginInfoMap[getSymbolId(symbol)]) {
                        symbolToOriginInfoMap[getSymbolId(symbol)] = { kind: getNullableSymbolOriginInfoKind(SymbolOriginInfoKind.Promise) };
                    }
                    else if (insertQuestionDot) {
                        symbolToOriginInfoMap[getSymbolId(symbol)] = { kind: SymbolOriginInfoKind.Nullable };
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
            const result: GlobalsSearch = tryGetObjectLikeCompletionSymbols()
                || tryGetImportOrExportClauseCompletionSymbols()
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
            const baseType = jsxContainer && typeChecker.getContextualType(jsxContainer.attributes, ContextFlags.BaseConstraint);
            symbols = filterJsxAttributes(getPropertiesForObjectExpression(attrsType, baseType, jsxContainer!.attributes, typeChecker), jsxContainer!.attributes.properties);
            setSortTextToOptionalMember();
            completionKind = CompletionKind.MemberLike;
            isNewIdentifierLocation = false;
            return GlobalsSearch.Success;
        }

        function getGlobalCompletions(): void {
            keywordFilters = tryGetFunctionLikeBodyCompletionContainer(contextToken) ? KeywordCompletionFilters.FunctionLikeBodyKeywords : KeywordCompletionFilters.All;

            // Get all entities in the current scope.
            completionKind = CompletionKind.Global;
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
            isInSnippetScope = isSnippetScope(scopeNode);

            const isTypeOnly = isTypeOnlyCompletion();
            const symbolMeanings = (isTypeOnly ? SymbolFlags.None : SymbolFlags.Value) | SymbolFlags.Type | SymbolFlags.Namespace | SymbolFlags.Alias;

            symbols = Debug.assertEachDefined(typeChecker.getSymbolsInScope(scopeNode, symbolMeanings), "getSymbolsInScope() should all be defined");
            for (const symbol of symbols) {
                if (!typeChecker.isArgumentsSymbol(symbol) &&
                    !some(symbol.declarations, d => d.getSourceFile() === sourceFile)) {
                    symbolToSortTextMap[getSymbolId(symbol)] = SortText.GlobalsOrKeywords;
                }
            }

            // Need to insert 'this.' before properties of `this` type, so only do that if `includeInsertTextCompletions`
            if (preferences.includeCompletionsWithInsertText && scopeNode.kind !== SyntaxKind.SourceFile) {
                const thisType = typeChecker.tryGetThisTypeAt(scopeNode, /*includeGlobalThis*/ false);
                if (thisType) {
                    for (const symbol of getPropertiesForCompletion(thisType, typeChecker)) {
                        symbolToOriginInfoMap[getSymbolId(symbol)] = { kind: SymbolOriginInfoKind.ThisType };
                        symbols.push(symbol);
                        symbolToSortTextMap[getSymbolId(symbol)] = SortText.SuggestedClassMembers;
                    }
                }
            }

            if (shouldOfferImportCompletions()) {
                const lowerCaseTokenText = previousToken && isIdentifier(previousToken) ? previousToken.text.toLowerCase() : "";
                const autoImportSuggestions = getSymbolsFromOtherSourceFileExports(program.getCompilerOptions().target!, host);
                if (!detailsEntryId && importSuggestionsCache) {
                    importSuggestionsCache.set(sourceFile.fileName, autoImportSuggestions, host.getProjectVersion && host.getProjectVersion());
                }
                autoImportSuggestions.forEach(({ symbol, symbolName, skipFilter, origin }) => {
                    if (detailsEntryId) {
                        if (detailsEntryId.source && stripQuotes(origin.moduleSymbol.name) !== detailsEntryId.source) {
                            return;
                        }
                    }
                    else if (!skipFilter && !stringContainsCharactersInOrder(symbolName.toLowerCase(), lowerCaseTokenText)) {
                        return;
                    }

                    const symbolId = getSymbolId(symbol);
                    symbols.push(symbol);
                    symbolToOriginInfoMap[symbolId] = origin;
                    symbolToSortTextMap[symbolId] = SortText.AutoImportSuggestions;
                });
            }
            filterGlobalCompletion(symbols);
        }

        function shouldOfferImportCompletions(): boolean {
            // If not already a module, must have modules enabled and not currently be in a commonjs module. (TODO: import completions for commonjs)
            if (!preferences.includeCompletionsForModuleExports) return false;
            // If already using ES6 modules, OK to continue using them.
            if (sourceFile.externalModuleIndicator) return true;
            // If already using commonjs, don't introduce ES6.
            if (sourceFile.commonJsModuleIndicator) return false;
            // If module transpilation is enabled or we're targeting es6 or above, or not emitting, OK.
            if (compilerOptionsIndicateEs6Modules(program.getCompilerOptions())) return true;
            // If some file is using ES6 modules, assume that it's OK to add more.
            return programContainsEs6Modules(program);
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

        function filterGlobalCompletion(symbols: Symbol[]): void {
            const isTypeOnly = isTypeOnlyCompletion();
            if (isTypeOnly) {
                keywordFilters = isTypeAssertion()
                    ? KeywordCompletionFilters.TypeAssertionKeywords
                    : KeywordCompletionFilters.TypeKeywords;
            }

            filterMutate(symbols, symbol => {
                if (!isSourceFile(location)) {
                    // export = /**/ here we want to get all meanings, so any symbol is ok
                    if (isExportAssignment(location.parent)) {
                        return true;
                    }

                    symbol = skipAlias(symbol, typeChecker);

                    // import m = /**/ <-- It can only access namespace (if typing import = x. this would get member symbols and not namespace)
                    if (isInRightSideOfInternalImportEqualsDeclaration(location)) {
                        return !!(symbol.flags & SymbolFlags.Namespace);
                    }

                    if (isTypeOnly) {
                        // It's a type, but you can reach it by namespace.type as well
                        return symbolCanBeReferencedAtTypeLocation(symbol);
                    }
                }

                // expressions are value space (which includes the value namespaces)
                return !!(getCombinedLocalAndExportSymbolFlags(symbol) & SymbolFlags.Value);
            });
        }

        function isTypeAssertion(): boolean {
            return isAssertionExpression(contextToken.parent);
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
                contextToken.kind === SyntaxKind.TypeOfKeyword &&
                (contextToken.parent.kind === SyntaxKind.TypeQuery || isTypeOfExpression(contextToken.parent));
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

        /** True if symbol is a type or a module containing at least one type. */
        function symbolCanBeReferencedAtTypeLocation(symbol: Symbol, seenModules = createMap<true>()): boolean {
            const sym = skipAlias(symbol.exportSymbol || symbol, typeChecker);
            return !!(sym.flags & SymbolFlags.Type) ||
                !!(sym.flags & SymbolFlags.Module) &&
                addToSeen(seenModules, getSymbolId(sym)) &&
                typeChecker.getExportsOfModule(sym).some(e => symbolCanBeReferencedAtTypeLocation(e, seenModules));
        }

        /**
         * Gathers symbols that can be imported from other files, de-duplicating along the way. Symbols can be "duplicates"
         * if re-exported from another module, e.g. `export { foo } from "./a"`. That syntax creates a fresh symbol, but
         * it’s just an alias to the first, and both have the same name, so we generally want to filter those aliases out,
         * if and only if the the first can be imported (it may be excluded due to package.json filtering in
         * `codefix.forEachExternalModuleToImportFrom`).
         *
         * Example. Imagine a chain of node_modules re-exporting one original symbol:
         *
         * ```js
         *  node_modules/x/index.js         node_modules/y/index.js           node_modules/z/index.js
         * +-----------------------+      +--------------------------+      +--------------------------+
         * |                       |      |                          |      |                          |
         * | export const foo = 0; | <--- | export { foo } from 'x'; | <--- | export { foo } from 'y'; |
         * |                       |      |                          |      |                          |
         * +-----------------------+      +--------------------------+      +--------------------------+
         * ```
         *
         * Also imagine three buckets, which we’ll reference soon:
         *
         * ```md
         * |                  |      |                      |      |                   |
         * |   **Bucket A**   |      |    **Bucket B**      |      |    **Bucket C**   |
         * |    Symbols to    |      | Aliases to symbols   |      | Symbols to return |
         * |    definitely    |      | in Buckets A or C    |      | if nothing better |
         * |      return      |      | (don’t return these) |      |    comes along    |
         * |__________________|      |______________________|      |___________________|
         * ```
         *
         * We _probably_ want to show `foo` from 'x', but not from 'y' or 'z'. However, if 'x' is not in a package.json, it
         * will not appear in a `forEachExternalModuleToImportFrom` iteration. Furthermore, the order of iterations is not
         * guaranteed, as it is host-dependent. Therefore, when presented with the symbol `foo` from module 'y' alone, we
         * may not be sure whether or not it should go in the list. So, we’ll take the following steps:
         *
         * 1. Resolve alias `foo` from 'y' to the export declaration in 'x', get the symbol there, and see if that symbol is
         *    already in Bucket A (symbols we already know will be returned). If it is, put `foo` from 'y' in Bucket B
         *    (symbols that are aliases to symbols in Bucket A). If it’s not, put it in Bucket C.
         * 2. Next, imagine we see `foo` from module 'z'. Again, we resolve the alias to the nearest export, which is in 'y'.
         *    At this point, if that nearest export from 'y' is in _any_ of the three buckets, we know the symbol in 'z'
         *    should never be returned in the final list, so put it in Bucket B.
         * 3. Next, imagine we see `foo` from module 'x', the original. Syntactically, it doesn’t look like a re-export, so
         *    we can just check Bucket C to see if we put any aliases to the original in there. If they exist, throw them out.
         *    Put this symbol in Bucket A.
         * 4. After we’ve iterated through every symbol of every module, any symbol left in Bucket C means that step 3 didn’t
         *    occur for that symbol---that is, the original symbol is not in Bucket A, so we should include the alias. Move
         *    everything from Bucket C to Bucket A.
         */
        function getSymbolsFromOtherSourceFileExports(target: ScriptTarget, host: LanguageServiceHost): readonly AutoImportSuggestion[] {
            const cached = importSuggestionsCache && importSuggestionsCache.get(
                sourceFile.fileName,
                typeChecker,
                detailsEntryId && host.getProjectVersion ? host.getProjectVersion() : undefined);

            if (cached) {
                log("getSymbolsFromOtherSourceFileExports: Using cached list");
                return cached;
            }

            const startTime = timestamp();
            log(`getSymbolsFromOtherSourceFileExports: Recomputing list${detailsEntryId ? " for details entry" : ""}`);
            const seenResolvedModules = createMap<true>();
            /** Bucket B */
            const aliasesToAlreadyIncludedSymbols = createMap<true>();
            /** Bucket C */
            const aliasesToReturnIfOriginalsAreMissing = createMap<{ alias: Symbol, moduleSymbol: Symbol }>();
            /** Bucket A */
            const results: AutoImportSuggestion[] = [];
            /** Ids present in `results` for faster lookup */
            const resultSymbolIds = createMap<true>();

            codefix.forEachExternalModuleToImportFrom(program, host, sourceFile, !detailsEntryId, moduleSymbol => {
                // Perf -- ignore other modules if this is a request for details
                if (detailsEntryId && detailsEntryId.source && stripQuotes(moduleSymbol.name) !== detailsEntryId.source) {
                    return;
                }

                const resolvedModuleSymbol = typeChecker.resolveExternalModuleSymbol(moduleSymbol);
                // resolvedModuleSymbol may be a namespace. A namespace may be `export =` by multiple module declarations, but only keep the first one.
                if (!addToSeen(seenResolvedModules, getSymbolId(resolvedModuleSymbol))) {
                    return;
                }

                // Don't add another completion for `export =` of a symbol that's already global.
                // So in `declare namespace foo {} declare module "foo" { export = foo; }`, there will just be the global completion for `foo`.
                if (resolvedModuleSymbol !== moduleSymbol &&
                    every(resolvedModuleSymbol.declarations, d => !!d.getSourceFile().externalModuleIndicator && !findAncestor(d, isGlobalScopeAugmentation))) {
                    pushSymbol(resolvedModuleSymbol, moduleSymbol, /*skipFilter*/ true);
                }

                for (const symbol of typeChecker.getExportsOfModule(moduleSymbol)) {
                    // If this is `export { _break as break };` (a keyword) -- skip this and prefer the keyword completion.
                    if (some(symbol.declarations, d => isExportSpecifier(d) && !!d.propertyName && isIdentifierANonContextualKeyword(d.name))) {
                        continue;
                    }

                    const symbolId = getSymbolId(symbol).toString();
                    // If `symbol.parent !== moduleSymbol`, this is an `export * from "foo"` re-export. Those don't create new symbols.
                    const isExportStarFromReExport = typeChecker.getMergedSymbol(symbol.parent!) !== resolvedModuleSymbol;
                    // If `!!d.parent.parent.moduleSpecifier`, this is `export { foo } from "foo"` re-export, which creates a new symbol (thus isn't caught by the first check).
                    if (isExportStarFromReExport || some(symbol.declarations, d => isExportSpecifier(d) && !d.propertyName && !!d.parent.parent.moduleSpecifier)) {
                        // Walk the export chain back one module (step 1 or 2 in diagrammed example).
                        // Or, in the case of `export * from "foo"`, `symbol` already points to the original export, so just use that.
                        const nearestExportSymbol = isExportStarFromReExport ? symbol : getNearestExportSymbol(symbol);
                        if (!nearestExportSymbol) continue;
                        const nearestExportSymbolId = getSymbolId(nearestExportSymbol).toString();
                        const symbolHasBeenSeen = resultSymbolIds.has(nearestExportSymbolId) || aliasesToAlreadyIncludedSymbols.has(nearestExportSymbolId);
                        if (!symbolHasBeenSeen) {
                            aliasesToReturnIfOriginalsAreMissing.set(nearestExportSymbolId, { alias: symbol, moduleSymbol });
                            aliasesToAlreadyIncludedSymbols.set(symbolId, true);
                        }
                        else {
                            // Perf - we know this symbol is an alias to one that’s already covered in `symbols`, so store it here
                            // in case another symbol re-exports this one; that way we can short-circuit as soon as we see this symbol id.
                            addToSeen(aliasesToAlreadyIncludedSymbols, symbolId);
                        }
                    }
                    else {
                        // This is not a re-export, so see if we have any aliases pending and remove them (step 3 in diagrammed example)
                        aliasesToReturnIfOriginalsAreMissing.delete(symbolId);
                        pushSymbol(symbol, moduleSymbol);
                    }
                }
            });

            // By this point, any potential duplicates that were actually duplicates have been
            // removed, so the rest need to be added. (Step 4 in diagrammed example)
            aliasesToReturnIfOriginalsAreMissing.forEach(({ alias, moduleSymbol }) => pushSymbol(alias, moduleSymbol));
            log(`getSymbolsFromOtherSourceFileExports: ${timestamp() - startTime}`);
            return results;

            function pushSymbol(symbol: Symbol, moduleSymbol: Symbol, skipFilter = false) {
                const isDefaultExport = symbol.escapedName === InternalSymbolName.Default;
                if (isDefaultExport) {
                    symbol = getLocalSymbolForExportDefault(symbol) || symbol;
                }
                if (typeChecker.isUndefinedSymbol(symbol)) {
                    return;
                }
                addToSeen(resultSymbolIds, getSymbolId(symbol));
                const origin: SymbolOriginInfoExport = { kind: SymbolOriginInfoKind.Export, moduleSymbol, isDefaultExport };
                results.push({
                    symbol,
                    symbolName: getSymbolName(symbol, origin, target),
                    origin,
                    skipFilter,
                });
            }
        }

        function getNearestExportSymbol(fromSymbol: Symbol) {
            return findAlias(typeChecker, fromSymbol, alias => {
                return some(alias.declarations, d => isExportSpecifier(d) || !!d.localSymbol);
            });
        }

        /**
         * True if you could remove some characters in `a` to get `b`.
         * E.g., true for "abcdef" and "bdf".
         * But not true for "abcdef" and "dbf".
         */
        function stringContainsCharactersInOrder(str: string, characters: string): boolean {
            if (characters.length === 0) {
                return true;
            }

            let characterIndex = 0;
            for (let strIndex = 0; strIndex < str.length; strIndex++) {
                if (str.charCodeAt(strIndex) === characters.charCodeAt(characterIndex)) {
                    characterIndex++;
                    if (characterIndex === characters.length) {
                        return true;
                    }
                }
            }

            // Did not find all characters
            return false;
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

        function isNewIdentifierDefinitionLocation(previousToken: Node | undefined): boolean {
            if (previousToken) {
                const containingNodeKind = previousToken.parent.kind;
                // Previous token may have been a keyword that was converted to an identifier.
                switch (keywordForNode(previousToken)) {
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
                const instantiatedType = typeChecker.getContextualType(objectLikeContainer);
                const baseType = instantiatedType && typeChecker.getContextualType(objectLikeContainer, ContextFlags.BaseConstraint);
                if (!instantiatedType || !baseType) return GlobalsSearch.Fail;
                isNewIdentifierLocation = hasIndexSignature(instantiatedType || baseType);
                typeMembers = getPropertiesForObjectExpression(instantiatedType, baseType, objectLikeContainer, typeChecker);
                existingMembers = objectLikeContainer.properties;
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
                        canGetType = !!typeChecker.getContextualType(<Expression>rootDeclaration.parent);
                    }
                    else if (rootDeclaration.parent.kind === SyntaxKind.MethodDeclaration || rootDeclaration.parent.kind === SyntaxKind.SetAccessor) {
                        canGetType = isExpression(rootDeclaration.parent.parent) && !!typeChecker.getContextualType(<Expression>rootDeclaration.parent.parent);
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
                symbols = filterObjectMembersList(typeMembers, Debug.assertDefined(existingMembers));
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
         *
         * @returns true if 'symbols' was successfully populated; false otherwise.
         */
        function tryGetImportOrExportClauseCompletionSymbols(): GlobalsSearch {
            // `import { |` or `import { a as 0, | }`
            const namedImportsOrExports = contextToken && (contextToken.kind === SyntaxKind.OpenBraceToken || contextToken.kind === SyntaxKind.CommaToken)
                ? tryCast(contextToken.parent, isNamedImportsOrExports) : undefined;
            if (!namedImportsOrExports) return GlobalsSearch.Continue;

            // cursor is in an import clause
            // try to show exported member for imported module
            const { moduleSpecifier } = namedImportsOrExports.kind === SyntaxKind.NamedImports ? namedImportsOrExports.parent.parent : namedImportsOrExports.parent;
            const moduleSpecifierSymbol = typeChecker.getSymbolAtLocation(moduleSpecifier!); // TODO: GH#18217
            if (!moduleSpecifierSymbol) return GlobalsSearch.Fail;

            completionKind = CompletionKind.MemberLike;
            isNewIdentifierLocation = false;
            const exports = typeChecker.getExportsAndPropertiesOfModule(moduleSpecifierSymbol);
            const existing = arrayToSet<ImportOrExportSpecifier>(namedImportsOrExports.elements, n => isCurrentlyEditingNode(n) ? undefined : (n.propertyName || n.name).escapedText);
            symbols = exports.filter(e => e.escapedName !== InternalSymbolName.Default && !existing.get(e.escapedName));
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
            let classElementModifierFlags = isClassElement(classElement) ? getModifierFlags(classElement) : ModifierFlags.None;
            // If this is context token is not something we are editing now, consider if this would lead to be modifier
            if (contextToken.kind === SyntaxKind.Identifier && !isCurrentlyEditingNode(contextToken)) {
                switch (contextToken.getText()) {
                    case "private":
                        classElementModifierFlags = classElementModifierFlags | ModifierFlags.Private;
                        break;
                    case "static":
                        classElementModifierFlags = classElementModifierFlags | ModifierFlags.Static;
                        break;
                }
            }

            // No member list for private methods
            if (!(classElementModifierFlags & ModifierFlags.Private)) {
                // List of property symbols of base type that are not private and already implemented
                const baseSymbols = flatMap(getAllSuperTypeNodes(decl), baseTypeNode => {
                    const type = typeChecker.getTypeAtLocation(baseTypeNode);
                    return type && typeChecker.getPropertiesOfType(classElementModifierFlags & ModifierFlags.Static ? typeChecker.getTypeOfSymbolAtLocation(type.symbol, decl) : type);
                });
                symbols = filterClassMembersList(baseSymbols, decl.members, classElementModifierFlags);
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
                            return <JsxOpeningLikeElement>parent;
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
                case SyntaxKind.YieldKeyword:
                case SyntaxKind.TypeKeyword:  // type htm|
                    return true;

                case SyntaxKind.AsteriskToken:
                    return isFunctionLike(contextToken.parent) && !isMethodDeclaration(contextToken.parent);
            }

            // If the previous token is keyword correspoding to class member completion keyword
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
                case SyntaxKind.YieldKeyword:
                    return true;
                case SyntaxKind.AsyncKeyword:
                    return isPropertyDeclaration(contextToken.parent);
            }

            return isDeclarationName(contextToken)
                && !isJsxAttribute(contextToken.parent)
                // Don't block completions if we're in `class C /**/`, because we're *past* the end of the identifier and might want to complete `extends`.
                // If `contextToken !== previousToken`, this is `class C ex/**/`.
                && !(isClassLike(contextToken.parent) && (contextToken !== previousToken || position > previousToken.end));
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

            const membersDeclaredBySpreadAssignment = createMap<true>();
            const existingMemberNames = createUnderscoreEscapedMap<boolean>();
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

                existingMemberNames.set(existingName!, true); // TODO: GH#18217
            }

            const filteredSymbols = contextualMemberSymbols.filter(m => !existingMemberNames.get(m.escapedName));
            setSortTextToMemberDeclaredBySpreadAssignment(membersDeclaredBySpreadAssignment, filteredSymbols);

            return filteredSymbols;
        }

        function setMembersDeclaredBySpreadAssignment(declaration: SpreadAssignment | JsxSpreadAttribute, membersDeclaredBySpreadAssignment: Map<true>) {
            const expression = declaration.expression;
            const symbol = typeChecker.getSymbolAtLocation(expression);
            const type = symbol && typeChecker.getTypeOfSymbolAtLocation(symbol, expression);
            const properties = type && (<ObjectType>type).properties;
            if (properties) {
                properties.forEach(property => {
                    membersDeclaredBySpreadAssignment.set(property.name, true);
                });
            }
        }

        // Set SortText to OptionalMember if it is an optinoal member
        function setSortTextToOptionalMember() {
            symbols.forEach(m => {
                if (m.flags & SymbolFlags.Optional) {
                    symbolToSortTextMap[getSymbolId(m)] = symbolToSortTextMap[getSymbolId(m)] || SortText.OptionalMember;
                }
            });
        }

        // Set SortText to MemberDeclaredBySpreadAssignment if it is fulfilled by spread assignment
        function setSortTextToMemberDeclaredBySpreadAssignment(membersDeclaredBySpreadAssignment: Map<true>, contextualMemberSymbols: Symbol[]): void {
            if (membersDeclaredBySpreadAssignment.size === 0) {
                return;
            }
            for (const contextualMemberSymbol of contextualMemberSymbols) {
                if (membersDeclaredBySpreadAssignment.has(contextualMemberSymbol.name)) {
                    symbolToSortTextMap[getSymbolId(contextualMemberSymbol)] = SortText.MemberDeclaredBySpreadAssignment;
                }
            }
        }

        /**
         * Filters out completion suggestions for class elements.
         *
         * @returns Symbols to be suggested in an class element depending on existing memebers and symbol flags
         */
        function filterClassMembersList(baseSymbols: readonly Symbol[], existingMembers: readonly ClassElement[], currentClassElementModifierFlags: ModifierFlags): Symbol[] {
            const existingMemberNames = createUnderscoreEscapedMap<true>();
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
                if (hasModifier(m, ModifierFlags.Private)) {
                    continue;
                }

                // do not filter it out if the static presence doesnt match
                if (hasModifier(m, ModifierFlags.Static) !== !!(currentClassElementModifierFlags & ModifierFlags.Static)) {
                    continue;
                }

                const existingName = getPropertyNameForPropertyNameNode(m.name!);
                if (existingName) {
                    existingMemberNames.set(existingName, true);
                }
            }

            return baseSymbols.filter(propertySymbol =>
                !existingMemberNames.has(propertySymbol.escapedName) &&
                !!propertySymbol.declarations &&
                !(getDeclarationModifierFlagsFromSymbol(propertySymbol) & ModifierFlags.Private));
        }

        /**
         * Filters out completion suggestions from 'symbols' according to existing JSX attributes.
         *
         * @returns Symbols to be suggested in a JSX element, barring those whose attributes
         *          do not occur at the current position and have not otherwise been typed.
         */
        function filterJsxAttributes(symbols: Symbol[], attributes: NodeArray<JsxAttribute | JsxSpreadAttribute>): Symbol[] {
            const seenNames = createUnderscoreEscapedMap<boolean>();
            const membersDeclaredBySpreadAssignment = createMap<true>();
            for (const attr of attributes) {
                // If this is the current item we are editing right now, do not filter it out
                if (isCurrentlyEditingNode(attr)) {
                    continue;
                }

                if (attr.kind === SyntaxKind.JsxAttribute) {
                    seenNames.set(attr.name.escapedText, true);
                }
                else if (isJsxSpreadAttribute(attr)) {
                    setMembersDeclaredBySpreadAssignment(attr, membersDeclaredBySpreadAssignment);
                }
            }
            const filteredSymbols = symbols.filter(a => !seenNames.get(a.escapedName));

            setSortTextToMemberDeclaredBySpreadAssignment(membersDeclaredBySpreadAssignment, filteredSymbols);

            return filteredSymbols;
        }

        function isCurrentlyEditingNode(node: Node): boolean {
            return node.getStart(sourceFile) <= position && position <= node.getEnd();
        }
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
    ): CompletionEntryDisplayNameForSymbol | undefined {
        const name = getSymbolName(symbol, origin, target);
        if (name === undefined
            // If the symbol is external module, don't show it in the completion list
            // (i.e declare module "http" { const x; } | // <= request completion here, "http" should not be there)
            || symbol.flags & SymbolFlags.Module && isSingleOrDoubleQuote(name.charCodeAt(0))
            // If the symbol is the internal name of an ES symbol, it is not a valid entry. Internal names for ES symbols start with "__@"
            || isKnownSymbol(symbol)) {
            return undefined;
        }

        const validNameResult: CompletionEntryDisplayNameForSymbol = { name, needsConvertPropertyAccess: false };
        if (isIdentifierText(name, target) || symbol.valueDeclaration && isPrivateIdentifierPropertyDeclaration(symbol.valueDeclaration)) {
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
                return true;
            default:
                return isClassMemberModifier(kind);
        }
    }

    function isFunctionLikeBodyKeyword(kind: SyntaxKind) {
        return kind === SyntaxKind.AsyncKeyword
            || kind === SyntaxKind.AwaitKeyword
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

    function getPropertiesForObjectExpression(contextualType: Type, baseConstrainedType: Type | undefined, obj: ObjectLiteralExpression | JsxAttributes, checker: TypeChecker): Symbol[] {
        const hasBaseType = baseConstrainedType && baseConstrainedType !== contextualType;
        const type = hasBaseType && !(baseConstrainedType!.flags & TypeFlags.AnyOrUnknown)
            ? checker.getUnionType([contextualType, baseConstrainedType!])
            : contextualType;

        const properties = type.isUnion()
            ? checker.getAllPossiblePropertiesOfTypes(type.types.filter(memberType =>
                // If we're providing completions for an object literal, skip primitive, array-like, or callable types since those shouldn't be implemented by object literals.
                !(memberType.flags & TypeFlags.Primitive ||
                    checker.isArrayLikeType(memberType) ||
                    typeHasCallOrConstructSignatures(memberType, checker) ||
                    checker.isTypeInvalidDueToUnionDiscriminant(memberType, obj))))
            : type.getApparentProperties();

        return hasBaseType ? properties.filter(hasDeclarationOtherThanSelf) : properties;

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
            ? Debug.assertEachDefined(checker.getAllPossiblePropertiesOfTypes(type.types), "getAllPossiblePropertiesOfTypes() should all be defined")
            : Debug.assertEachDefined(type.getApparentProperties(), "getApparentProperties() should all be defined");
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
            case SyntaxKind.Identifier: // class c extends React.Component { a: () => 1\n compon| }
                if (isFromObjectTypeDeclaration(location)) {
                    return findAncestor(location, isObjectTypeDeclaration);
                }
        }

        if (!contextToken) return undefined;

        switch (contextToken.kind) {
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
            case "<":
                // Opening JSX tag
                return !!contextToken && contextToken.kind === SyntaxKind.LessThanToken && (!isBinaryExpression(contextToken.parent) || binaryExpressionMayBeOpenTag(contextToken.parent));
            case "/":
                return !!contextToken && (isStringLiteralLike(contextToken)
                    ? !!tryGetImportFromModuleSpecifier(contextToken)
                    : contextToken.kind === SyntaxKind.SlashToken && isJsxClosingElement(contextToken.parent));
            default:
                return Debug.assertNever(triggerCharacter);
        }
    }

    function binaryExpressionMayBeOpenTag({ left }: BinaryExpression): boolean {
        return nodeIsMissing(left);
    }

    function findAlias(typeChecker: TypeChecker, symbol: Symbol, predicate: (symbol: Symbol) => boolean): Symbol | undefined {
        let currentAlias: Symbol | undefined = symbol;
        while (currentAlias.flags & SymbolFlags.Alias && (currentAlias = typeChecker.getImmediateAliasedSymbol(currentAlias))) {
            if (predicate(currentAlias)) {
                return currentAlias;
            }
        }
    }
}
