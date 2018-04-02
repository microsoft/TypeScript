/// <reference path="./importTracker.ts" />

/* @internal */
namespace ts.FindAllReferences {
    export interface SymbolAndEntries {
        definition: Definition | undefined;
        references: Entry[];
    }

    export type Definition =
        | { type: "symbol"; symbol: Symbol }
        | { type: "label"; node: Identifier }
        | { type: "keyword"; node: Node }
        | { type: "this"; node: Node }
        | { type: "string"; node: StringLiteral };

    export type Entry = NodeEntry | SpanEntry;
    export interface NodeEntry {
        type: "node";
        node: Node;
        isInString?: true;
    }
    export interface SpanEntry {
        type: "span";
        fileName: string;
        textSpan: TextSpan;
    }
    export function nodeEntry(node: Node, isInString?: true): NodeEntry {
        return { type: "node", node, isInString };
    }

    export interface Options {
        readonly findInStrings?: boolean;
        readonly findInComments?: boolean;
        /**
         * True if we are renaming the symbol.
         * If so, we will find fewer references -- if it is referenced by several different names, we sill only find references for the original name.
         */
        readonly isForRename?: boolean;
        /** True if we are searching for implementations. We will have a different method of adding references if so. */
        readonly implementations?: boolean;
    }

    export function findReferencedSymbols(program: Program, cancellationToken: CancellationToken, sourceFiles: ReadonlyArray<SourceFile>, sourceFile: SourceFile, position: number): ReferencedSymbol[] | undefined {
        const node = getTouchingPropertyName(sourceFile, position, /*includeJsDocComment*/ true);
        const referencedSymbols = Core.getReferencedSymbolsForNode(position, node, program, sourceFiles, cancellationToken, /*options*/ {});
        const checker = program.getTypeChecker();
        return !referencedSymbols || !referencedSymbols.length ? undefined : mapDefined<SymbolAndEntries, ReferencedSymbol>(referencedSymbols, ({ definition, references }) =>
            // Only include referenced symbols that have a valid definition.
            definition && { definition: definitionToReferencedSymbolDefinitionInfo(definition, checker, node), references: references.map(toReferenceEntry) });
    }

    export function getImplementationsAtPosition(program: Program, cancellationToken: CancellationToken, sourceFiles: ReadonlyArray<SourceFile>, sourceFile: SourceFile, position: number): ImplementationLocation[] {
        // A node in a JSDoc comment can't have an implementation anyway.
        const node = getTouchingPropertyName(sourceFile, position, /*includeJsDocComment*/ false);
        const referenceEntries = getImplementationReferenceEntries(program, cancellationToken, sourceFiles, node, position);
        const checker = program.getTypeChecker();
        return map(referenceEntries, entry => toImplementationLocation(entry, checker));
    }

    function getImplementationReferenceEntries(program: Program, cancellationToken: CancellationToken, sourceFiles: ReadonlyArray<SourceFile>, node: Node, position: number): Entry[] | undefined {
        if (node.kind === SyntaxKind.SourceFile) {
            return undefined;
        }

        const checker = program.getTypeChecker();
        // If invoked directly on a shorthand property assignment, then return
        // the declaration of the symbol being assigned (not the symbol being assigned to).
        if (node.parent.kind === SyntaxKind.ShorthandPropertyAssignment) {
            const result: NodeEntry[] = [];
            Core.getReferenceEntriesForShorthandPropertyAssignment(node, checker, node => result.push(nodeEntry(node)));
            return result;
        }
        else if (node.kind === SyntaxKind.SuperKeyword || isSuperProperty(node.parent)) {
            // References to and accesses on the super keyword only have one possible implementation, so no
            // need to "Find all References"
            const symbol = checker.getSymbolAtLocation(node);
            return symbol.valueDeclaration && [nodeEntry(symbol.valueDeclaration)];
        }
        else {
            // Perform "Find all References" and retrieve only those that are implementations
            return getReferenceEntriesForNode(position, node, program, sourceFiles, cancellationToken, { implementations: true });
        }
    }

    export function findReferencedEntries(program: Program, cancellationToken: CancellationToken, sourceFiles: ReadonlyArray<SourceFile>, sourceFile: SourceFile, position: number, options?: Options): ReferenceEntry[] | undefined {
        const node = getTouchingPropertyName(sourceFile, position, /*includeJsDocComment*/ true);
        return map(flattenEntries(Core.getReferencedSymbolsForNode(position, node, program, sourceFiles, cancellationToken, options)), toReferenceEntry);
    }

    export function getReferenceEntriesForNode(position: number, node: Node, program: Program, sourceFiles: ReadonlyArray<SourceFile>, cancellationToken: CancellationToken, options: Options = {}): Entry[] | undefined {
        return flattenEntries(Core.getReferencedSymbolsForNode(position, node, program, sourceFiles, cancellationToken, options));
    }

    function flattenEntries(referenceSymbols: SymbolAndEntries[]): Entry[] {
        return referenceSymbols && flatMap(referenceSymbols, r => r.references);
    }

    function definitionToReferencedSymbolDefinitionInfo(def: Definition, checker: TypeChecker, originalNode: Node): ReferencedSymbolDefinitionInfo | undefined {
        const info = (() => {
            switch (def.type) {
                case "symbol": {
                    const { symbol } = def;
                    const { displayParts, kind } = getDefinitionKindAndDisplayParts(symbol, checker, originalNode);
                    const name = displayParts.map(p => p.text).join("");
                    return { node: symbol.declarations ? getNameOfDeclaration(first(symbol.declarations)) || first(symbol.declarations) : originalNode, name, kind, displayParts };
                }
                case "label": {
                    const { node } = def;
                    return { node, name: node.text, kind: ScriptElementKind.label, displayParts: [displayPart(node.text, SymbolDisplayPartKind.text)] };
                }
                case "keyword": {
                    const { node } = def;
                    const name = tokenToString(node.kind);
                    return { node, name, kind: ScriptElementKind.keyword, displayParts: [{ text: name, kind: ScriptElementKind.keyword }] };
                }
                case "this": {
                    const { node } = def;
                    const symbol = checker.getSymbolAtLocation(node);
                    const displayParts = symbol && SymbolDisplay.getSymbolDisplayPartsDocumentationAndSymbolKind(
                        checker, symbol, node.getSourceFile(), getContainerNode(node), node).displayParts;
                    return { node, name: "this", kind: ScriptElementKind.variableElement, displayParts };
                }
                case "string": {
                    const { node } = def;
                    return { node, name: node.text, kind: ScriptElementKind.variableElement, displayParts: [displayPart(getTextOfNode(node), SymbolDisplayPartKind.stringLiteral)] };
                }
                default:
                    return Debug.assertNever(def);
            }
        })();

        const { node, name, kind, displayParts } = info;
        const sourceFile = node.getSourceFile();
        const textSpan = getTextSpan(isComputedPropertyName(node) ? node.expression : node, sourceFile);
        return { containerKind: ScriptElementKind.unknown, containerName: "", fileName: sourceFile.fileName, kind, name, textSpan, displayParts };
    }

    function getDefinitionKindAndDisplayParts(symbol: Symbol, checker: TypeChecker, node: Node): { displayParts: SymbolDisplayPart[], kind: ScriptElementKind } {
        const meaning = Core.getIntersectingMeaningFromDeclarations(node, symbol);
        const enclosingDeclaration = firstOrUndefined(symbol.declarations) || node;
        const { displayParts, symbolKind } =
            SymbolDisplay.getSymbolDisplayPartsDocumentationAndSymbolKind(checker, symbol, enclosingDeclaration.getSourceFile(), enclosingDeclaration, enclosingDeclaration, meaning);
        return { displayParts, kind: symbolKind };
    }

    function toReferenceEntry(entry: Entry): ReferenceEntry {
        if (entry.type === "span") {
            return { textSpan: entry.textSpan, fileName: entry.fileName, isWriteAccess: false, isDefinition: false };
        }

        const { node, isInString } = entry;
        return {
            fileName: node.getSourceFile().fileName,
            textSpan: getTextSpan(node),
            isWriteAccess: isWriteAccessForReference(node),
            isDefinition: node.kind === SyntaxKind.DefaultKeyword
                || isAnyDeclarationName(node)
                || isLiteralComputedPropertyDeclarationName(node),
            isInString
        };
    }

    function toImplementationLocation(entry: Entry, checker: TypeChecker): ImplementationLocation {
        if (entry.type === "node") {
            const { node } = entry;
            return { textSpan: getTextSpan(node), fileName: node.getSourceFile().fileName, ...implementationKindDisplayParts(node, checker) };
        }
        else {
            const { textSpan, fileName } = entry;
            return { textSpan, fileName, kind: ScriptElementKind.unknown, displayParts: [] };
        }
    }

    function implementationKindDisplayParts(node: Node, checker: TypeChecker): { kind: ScriptElementKind, displayParts: SymbolDisplayPart[] } {
        const symbol = checker.getSymbolAtLocation(isDeclaration(node) && node.name ? node.name : node);
        if (symbol) {
            return getDefinitionKindAndDisplayParts(symbol, checker, node);
        }
        else if (node.kind === SyntaxKind.ObjectLiteralExpression) {
            return {
                kind: ScriptElementKind.interfaceElement,
                displayParts: [punctuationPart(SyntaxKind.OpenParenToken), textPart("object literal"), punctuationPart(SyntaxKind.CloseParenToken)]
            };
        }
        else if (node.kind === SyntaxKind.ClassExpression) {
            return {
                kind: ScriptElementKind.localClassElement,
                displayParts: [punctuationPart(SyntaxKind.OpenParenToken), textPart("anonymous local class"), punctuationPart(SyntaxKind.CloseParenToken)]
            };
        }
        else {
            return { kind: getNodeKind(node), displayParts: [] };
        }
    }

    export function toHighlightSpan(entry: Entry): { fileName: string, span: HighlightSpan } {
        if (entry.type === "span") {
            const { fileName, textSpan } = entry;
            return { fileName, span: { textSpan, kind: HighlightSpanKind.reference } };
        }

        const { node, isInString } = entry;
        const fileName = entry.node.getSourceFile().fileName;
        const writeAccess = isWriteAccessForReference(node);
        const span: HighlightSpan = {
            textSpan: getTextSpan(node),
            kind: writeAccess ? HighlightSpanKind.writtenReference : HighlightSpanKind.reference,
            isInString
        };
        return { fileName, span };
    }

    function getTextSpan(node: Node, sourceFile?: SourceFile): TextSpan {
        let start = node.getStart(sourceFile);
        let end = node.getEnd();
        if (node.kind === SyntaxKind.StringLiteral) {
            start += 1;
            end -= 1;
        }
        return createTextSpanFromBounds(start, end);
    }

    /** A node is considered a writeAccess iff it is a name of a declaration or a target of an assignment */
    function isWriteAccessForReference(node: Node): boolean {
        return node.kind === SyntaxKind.DefaultKeyword || isAnyDeclarationName(node) || isWriteAccess(node);
    }
}

/** Encapsulates the core find-all-references algorithm. */
/* @internal */
namespace ts.FindAllReferences.Core {
    /** Core find-all-references algorithm. Handles special cases before delegating to `getReferencedSymbolsForSymbol`. */
    export function getReferencedSymbolsForNode(position: number, node: Node, program: Program, sourceFiles: ReadonlyArray<SourceFile>, cancellationToken: CancellationToken, options: Options = {}): SymbolAndEntries[] | undefined {
        if (isSourceFile(node)) {
            const reference = GoToDefinition.getReferenceAtPosition(node, position, program);
            return reference && getReferencedSymbolsForModule(program, program.getTypeChecker().getMergedSymbol(reference.file.symbol), sourceFiles);
        }

        if (!options.implementations) {
            const special = getReferencedSymbolsSpecial(node, sourceFiles, cancellationToken);
            if (special) {
                return special;
            }
        }

        const checker = program.getTypeChecker();
        const symbol = checker.getSymbolAtLocation(node);

        // Could not find a symbol e.g. unknown identifier
        if (!symbol) {
            // String literal might be a property (and thus have a symbol), so do this here rather than in getReferencedSymbolsSpecial.
            return !options.implementations && isStringLiteral(node) ? getReferencesForStringLiteral(node, sourceFiles, cancellationToken) : undefined;
        }

        if (symbol.flags & SymbolFlags.Module && isModuleReferenceLocation(node)) {
            return getReferencedSymbolsForModule(program, symbol, sourceFiles);
        }

        return getReferencedSymbolsForSymbol(symbol, node, sourceFiles, checker, cancellationToken, options);
    }

    function isModuleReferenceLocation(node: Node): boolean {
        if (!isStringLiteralLike(node)) {
            return false;
        }
        switch (node.parent.kind) {
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.ExternalModuleReference:
            case SyntaxKind.ImportDeclaration:
            case SyntaxKind.ExportDeclaration:
                return true;
            case SyntaxKind.CallExpression:
                return isRequireCall(node.parent as CallExpression, /*checkArgumentIsStringLiteralLike*/ false) || isImportCall(node.parent as CallExpression);
            default:
                return false;
        }
    }

    function getReferencedSymbolsForModule(program: Program, symbol: Symbol, sourceFiles: ReadonlyArray<SourceFile>): SymbolAndEntries[] {
        Debug.assert(!!symbol.valueDeclaration);

        const references = findModuleReferences(program, sourceFiles, symbol).map<Entry>(reference => {
            if (reference.kind === "import") {
                return { type: "node", node: reference.literal };
            }
            else {
                return {
                    type: "span",
                    fileName: reference.referencingFile.fileName,
                    textSpan: createTextSpanFromRange(reference.ref),
                };
            }
        });

        for (const decl of symbol.declarations) {
            switch (decl.kind) {
                case SyntaxKind.SourceFile:
                    // Don't include the source file itself. (This may not be ideal behavior, but awkward to include an entire file as a reference.)
                    break;
                case SyntaxKind.ModuleDeclaration:
                    references.push({ type: "node", node: (decl as ModuleDeclaration).name });
                    break;
                default:
                    Debug.fail("Expected a module symbol to be declared by a SourceFile or ModuleDeclaration.");
            }
        }

        return [{ definition: { type: "symbol", symbol }, references }];
    }

    /** getReferencedSymbols for special node kinds. */
    function getReferencedSymbolsSpecial(node: Node, sourceFiles: ReadonlyArray<SourceFile>, cancellationToken: CancellationToken): SymbolAndEntries[] | undefined {
        if (isTypeKeyword(node.kind)) {
            return getAllReferencesForKeyword(sourceFiles, node.kind, cancellationToken);
        }

        // Labels
        if (isJumpStatementTarget(node)) {
            const labelDefinition = getTargetLabel(node.parent, node.text);
            // if we have a label definition, look within its statement for references, if not, then
            // the label is undefined and we have no results..
            return labelDefinition && getLabelReferencesInNode(labelDefinition.parent, labelDefinition);
        }
        else if (isLabelOfLabeledStatement(node)) {
            // it is a label definition and not a target, search within the parent labeledStatement
            return getLabelReferencesInNode(node.parent, node);
        }

        if (isThis(node)) {
            return getReferencesForThisKeyword(node, sourceFiles, cancellationToken);
        }

        if (node.kind === SyntaxKind.SuperKeyword) {
            return getReferencesForSuperKeyword(node);
        }

        return undefined;
    }

    /** Core find-all-references algorithm for a normal symbol. */
    function getReferencedSymbolsForSymbol(symbol: Symbol, node: Node, sourceFiles: ReadonlyArray<SourceFile>, checker: TypeChecker, cancellationToken: CancellationToken, options: Options): SymbolAndEntries[] {
        symbol = skipPastExportOrImportSpecifierOrUnion(symbol, node, checker) || symbol;

        // Compute the meaning from the location and the symbol it references
        const searchMeaning = getIntersectingMeaningFromDeclarations(node, symbol);

        const result: SymbolAndEntries[] = [];
        const state = new State(sourceFiles, getSpecialSearchKind(node), checker, cancellationToken, searchMeaning, options, result);

        if (node.kind === SyntaxKind.DefaultKeyword) {
            addReference(node, symbol, state);
            searchForImportsOfExport(node, symbol, { exportingModuleSymbol: Debug.assertDefined(symbol.parent, "Expected export symbol to have a parent"), exportKind: ExportKind.Default }, state);
        }
        else {
            const search = state.createSearch(node, symbol, /*comingFrom*/ undefined, { allSearchSymbols: populateSearchSymbolSet(symbol, node, checker, options.implementations) });

            // Try to get the smallest valid scope that we can limit our search to;
            // otherwise we'll need to search globally (i.e. include each file).
            const scope = getSymbolScope(symbol);
            if (scope) {
                getReferencesInContainer(scope, scope.getSourceFile(), search, state, /*addReferencesHere*/ !(isSourceFile(scope) && !contains(sourceFiles, scope)));
            }
            else {
                // Global search
                for (const sourceFile of state.sourceFiles) {
                    state.cancellationToken.throwIfCancellationRequested();
                    searchForName(sourceFile, search, state);
                }
            }
        }

        return result;
    }

    function getSpecialSearchKind(node: Node): SpecialSearchKind {
        switch (node.kind) {
            case SyntaxKind.ConstructorKeyword:
                return SpecialSearchKind.Constructor;
            case SyntaxKind.Identifier:
                if (isClassLike(node.parent)) {
                    Debug.assert(node.parent.name === node);
                    return SpecialSearchKind.Class;
                }
                // falls through
            default:
                return SpecialSearchKind.None;
        }
    }

    /** Handle a few special cases relating to export/import specifiers. */
    function skipPastExportOrImportSpecifierOrUnion(symbol: Symbol, node: Node, checker: TypeChecker): Symbol | undefined {
        const { parent } = node;
        if (isExportSpecifier(parent)) {
            return getLocalSymbolForExportSpecifier(node as Identifier, symbol, parent, checker);
        }
        if (isImportSpecifier(parent) && parent.propertyName === node) {
            // We're at `foo` in `import { foo as bar }`. Probably intended to find all refs on the original, not just on the import.
            return checker.getImmediateAliasedSymbol(symbol);
        }

        // If the symbol is declared as part of a declaration like `{ type: "a" } | { type: "b" }`, use the property on the union type to get more references.
        return firstDefined(symbol.declarations, decl => {
            if (!decl.parent) {
                // Assertions for GH#21814. We should be handling SourceFile symbols in `getReferencedSymbolsForModule` instead of getting here.
                Debug.assert(decl.kind === SyntaxKind.SourceFile);
                Debug.fail(`Unexpected symbol at ${Debug.showSyntaxKind(node)}: ${Debug.showSymbol(symbol)}`);
            }
            return isTypeLiteralNode(decl.parent) && isUnionTypeNode(decl.parent.parent)
                ? checker.getPropertyOfType(checker.getTypeFromTypeNode(decl.parent.parent), symbol.name)
                : undefined;
        });
    }

    /**
     * Symbol that is currently being searched for.
     * This will be replaced if we find an alias for the symbol.
     */
    interface Search {
        /** If coming from an export, we will not recursively search for the imported symbol (since that's where we came from). */
        readonly comingFrom?: ImportExport;

        readonly symbol: Symbol;
        readonly text: string;
        readonly escapedText: __String;
        /** Only set if `options.implementations` is true. These are the symbols checked to get the implementations of a property access. */
        readonly parents: Symbol[] | undefined;

        /**
         * Whether a symbol is in the search set.
         * Do not compare directly to `symbol` because there may be related symbols to search for. See `populateSearchSymbolSet`.
         */
        includes(symbol: Symbol): boolean;
    }

    const enum SpecialSearchKind {
        None,
        Constructor,
        Class,
    }

    /**
     * Holds all state needed for the finding references.
     * Unlike `Search`, there is only one `State`.
     */
    class State {
        /** Cache for `explicitlyinheritsFrom`. */
        readonly inheritsFromCache = createMap<boolean>();

        /**
         * Type nodes can contain multiple references to the same type. For example:
         *      let x: Foo & (Foo & Bar) = ...
         * Because we are returning the implementation locations and not the identifier locations,
         * duplicate entries would be returned here as each of the type references is part of
         * the same implementation. For that reason, check before we add a new entry.
         */
        readonly markSeenContainingTypeReference = nodeSeenTracker();

        /**
         * It's possible that we will encounter the right side of `export { foo as bar } from "x";` more than once.
         * For example:
         *     // b.ts
         *     export { foo as bar } from "./a";
         *     import { bar } from "./b";
         *
         * Normally at `foo as bar` we directly add `foo` and do not locally search for it (since it doesn't declare a local).
         * But another reference to it may appear in the same source file.
         * See `tests/cases/fourslash/transitiveExportImports3.ts`.
         */
        readonly markSeenReExportRHS = nodeSeenTracker();

        private readonly includedSourceFiles: Map<true>;

        constructor(
            readonly sourceFiles: ReadonlyArray<SourceFile>,
            /** True if we're searching for constructor references. */
            readonly specialSearchKind: SpecialSearchKind,
            readonly checker: TypeChecker,
            readonly cancellationToken: CancellationToken,
            readonly searchMeaning: SemanticMeaning,
            readonly options: Options,
            private readonly result: Push<SymbolAndEntries>) {
            this.includedSourceFiles = arrayToSet(sourceFiles, s => s.fileName);
        }

        includesSourceFile(sourceFile: SourceFile): boolean {
            return this.includedSourceFiles.has(sourceFile.fileName);
        }

        private importTracker: ImportTracker | undefined;
        /** Gets every place to look for references of an exported symbols. See `ImportsResult` in `importTracker.ts` for more documentation. */
        getImportSearches(exportSymbol: Symbol, exportInfo: ExportInfo): ImportsResult {
            if (!this.importTracker) this.importTracker = createImportTracker(this.sourceFiles, this.checker, this.cancellationToken);
            return this.importTracker(exportSymbol, exportInfo, this.options.isForRename);
        }

        /** @param allSearchSymbols set of additinal symbols for use by `includes`. */
        createSearch(location: Node, symbol: Symbol, comingFrom: ImportExport | undefined, searchOptions: { text?: string, allSearchSymbols?: Symbol[] } = {}): Search {
            // Note: if this is an external module symbol, the name doesn't include quotes.
            // Note: getLocalSymbolForExportDefault handles `export default class C {}`, but not `export default C` or `export { C as default }`.
            // The other two forms seem to be handled downstream (e.g. in `skipPastExportOrImportSpecifier`), so special-casing the first form
            // here appears to be intentional).
            const {
                text = stripQuotes(unescapeLeadingUnderscores((getLocalSymbolForExportDefault(symbol) || symbol).escapedName)),
                allSearchSymbols,
            } = searchOptions;
            const escapedText = escapeLeadingUnderscores(text);
            const parents = this.options.implementations && getParentSymbolsOfPropertyAccess(location, symbol, this.checker);
            return {
                symbol, comingFrom, text, escapedText, parents,
                includes: referenceSymbol => allSearchSymbols ? contains(allSearchSymbols, referenceSymbol) : referenceSymbol === symbol,
            };
        }

        private readonly symbolIdToReferences: Entry[][] = [];
        /**
         * Callback to add references for a particular searched symbol.
         * This initializes a reference group, so only call this if you will add at least one reference.
         */
        referenceAdder(searchSymbol: Symbol): (node: Node) => void {
            const symbolId = getSymbolId(searchSymbol);
            let references = this.symbolIdToReferences[symbolId];
            if (!references) {
                references = this.symbolIdToReferences[symbolId] = [];
                this.result.push({ definition: { type: "symbol", symbol: searchSymbol }, references });
            }
            return node => references.push(nodeEntry(node));
        }

        /** Add a reference with no associated definition. */
        addStringOrCommentReference(fileName: string, textSpan: TextSpan): void {
            this.result.push({
                definition: undefined,
                references: [{ type: "span", fileName, textSpan }]
            });
        }

        // Source file ID → symbol ID → Whether the symbol has been searched for in the source file.
        private readonly sourceFileToSeenSymbols: true[][] = [];
        /** Returns `true` the first time we search for a symbol in a file and `false` afterwards. */
        markSearchedSymbol(sourceFile: SourceFile, symbol: Symbol): boolean {
            const sourceId = getNodeId(sourceFile);
            const symbolId = getSymbolId(symbol);
            const seenSymbols = this.sourceFileToSeenSymbols[sourceId] || (this.sourceFileToSeenSymbols[sourceId] = []);
            return !seenSymbols[symbolId] && (seenSymbols[symbolId] = true);
        }
    }

    /** Search for all imports of a given exported symbol using `State.getImportSearches`. */
    function searchForImportsOfExport(exportLocation: Node, exportSymbol: Symbol, exportInfo: ExportInfo, state: State): void {
        const { importSearches, singleReferences, indirectUsers } = state.getImportSearches(exportSymbol, exportInfo);

        // For `import { foo as bar }` just add the reference to `foo`, and don't otherwise search in the file.
        if (singleReferences.length) {
            const addRef = state.referenceAdder(exportSymbol);
            for (const singleRef of singleReferences) {
                addRef(singleRef);
            }
        }

        // For each import, find all references to that import in its source file.
        for (const [importLocation, importSymbol] of importSearches) {
            getReferencesInSourceFile(importLocation.getSourceFile(), state.createSearch(importLocation, importSymbol, ImportExport.Export), state);
        }

        if (indirectUsers.length) {
            let indirectSearch: Search | undefined;
            switch (exportInfo.exportKind) {
                case ExportKind.Named:
                    indirectSearch = state.createSearch(exportLocation, exportSymbol, ImportExport.Export);
                    break;
                case ExportKind.Default:
                    // Search for a property access to '.default'. This can't be renamed.
                    indirectSearch = state.options.isForRename ? undefined : state.createSearch(exportLocation, exportSymbol, ImportExport.Export, { text: "default" });
                    break;
                case ExportKind.ExportEquals:
                    break;
            }
            if (indirectSearch) {
                for (const indirectUser of indirectUsers) {
                    searchForName(indirectUser, indirectSearch, state);
                }
            }
        }
    }

    // Go to the symbol we imported from and find references for it.
    function searchForImportedSymbol(symbol: Symbol, state: State): void {
        for (const declaration of symbol.declarations) {
            const exportingFile = declaration.getSourceFile();
            // Need to search in the file even if it's not in the search-file set, because it might export the symbol.
            getReferencesInSourceFile(exportingFile, state.createSearch(declaration, symbol, ImportExport.Import), state, state.includesSourceFile(exportingFile));
        }
    }

    /** Search for all occurences of an identifier in a source file (and filter out the ones that match). */
    function searchForName(sourceFile: SourceFile, search: Search, state: State): void {
        if (getNameTable(sourceFile).get(search.escapedText) !== undefined) {
            getReferencesInSourceFile(sourceFile, search, state);
        }
    }

    function getPropertySymbolOfDestructuringAssignment(location: Node, checker: TypeChecker): Symbol | undefined {
        return isArrayLiteralOrObjectLiteralDestructuringPattern(location.parent.parent) &&
            checker.getPropertySymbolOfDestructuringAssignment(<Identifier>location);
    }

    function getObjectBindingElementWithoutPropertyName(symbol: Symbol): BindingElement | undefined {
        const bindingElement = getDeclarationOfKind<BindingElement>(symbol, SyntaxKind.BindingElement);
        if (bindingElement &&
            bindingElement.parent.kind === SyntaxKind.ObjectBindingPattern &&
            !bindingElement.propertyName) {
            return bindingElement;
        }
    }

    function getPropertySymbolOfObjectBindingPatternWithoutPropertyName(symbol: Symbol, checker: TypeChecker): Symbol | undefined {
        const bindingElement = getObjectBindingElementWithoutPropertyName(symbol);
        if (!bindingElement) return undefined;

        const typeOfPattern = checker.getTypeAtLocation(bindingElement.parent);
        const propSymbol = typeOfPattern && checker.getPropertyOfType(typeOfPattern, (<Identifier>bindingElement.name).text);
        if (propSymbol && propSymbol.flags & SymbolFlags.Accessor) {
            // See GH#16922
            Debug.assert(!!(propSymbol.flags & SymbolFlags.Transient));
            return (propSymbol as TransientSymbol).target;
        }
        return propSymbol;
    }

    /**
     * Determines the smallest scope in which a symbol may have named references.
     * Note that not every construct has been accounted for. This function can
     * probably be improved.
     *
     * @returns undefined if the scope cannot be determined, implying that
     * a reference to a symbol can occur anywhere.
     */
    function getSymbolScope(symbol: Symbol): Node | undefined {
        // If this is the symbol of a named function expression or named class expression,
        // then named references are limited to its own scope.
        const { declarations, flags, parent, valueDeclaration } = symbol;
        if (valueDeclaration && (valueDeclaration.kind === SyntaxKind.FunctionExpression || valueDeclaration.kind === SyntaxKind.ClassExpression)) {
            return valueDeclaration;
        }

        if (!declarations) {
            return undefined;
        }

        // If this is private property or method, the scope is the containing class
        if (flags & (SymbolFlags.Property | SymbolFlags.Method)) {
            const privateDeclaration = find(declarations, d => hasModifier(d, ModifierFlags.Private));
            if (privateDeclaration) {
                return getAncestor(privateDeclaration, SyntaxKind.ClassDeclaration);
            }
            // Else this is a public property and could be accessed from anywhere.
            return undefined;
        }

        // If symbol is of object binding pattern element without property name we would want to
        // look for property too and that could be anywhere
        if (getObjectBindingElementWithoutPropertyName(symbol)) {
            return undefined;
        }

        /*
        If the symbol has a parent, it's globally visible unless:
        - It's a private property (handled above).
        - It's a type parameter.
        - The parent is an external module: then we should only search in the module (and recurse on the export later).
          - But if the parent has `export as namespace`, the symbol is globally visible through that namespace.
        */
        const exposedByParent = parent && !(symbol.flags & SymbolFlags.TypeParameter);
        if (exposedByParent && !((parent.flags & SymbolFlags.Module) && isExternalModuleSymbol(parent) && !parent.globalExports)) {
            return undefined;
        }

        let scope: Node | undefined;
        for (const declaration of declarations) {
            const container = getContainerNode(declaration);
            if (scope && scope !== container) {
                // Different declarations have different containers, bail out
                return undefined;
            }

            if (!container || container.kind === SyntaxKind.SourceFile && !isExternalOrCommonJsModule(<SourceFile>container)) {
                // This is a global variable and not an external module, any declaration defined
                // within this scope is visible outside the file
                return undefined;
            }

            // The search scope is the container node
            scope = container;
        }

        // If symbol.parent, this means we are in an export of an external module. (Otherwise we would have returned `undefined` above.)
        // For an export of a module, we may be in a declaration file, and it may be accessed elsewhere. E.g.:
        //     declare module "a" { export type T = number; }
        //     declare module "b" { import { T } from "a"; export const x: T; }
        // So we must search the whole source file. (Because we will mark the source file as seen, we we won't return to it when searching for imports.)
        return exposedByParent ? scope.getSourceFile() : scope;
    }

    /** Used as a quick check for whether a symbol is used at all in a file (besides its definition). */
    export function isSymbolReferencedInFile(definition: Identifier, checker: TypeChecker, sourceFile: SourceFile) {
        const symbol = checker.getSymbolAtLocation(definition);
        if (!symbol) return true; // Be lenient with invalid code.
        return getPossibleSymbolReferencePositions(sourceFile, symbol.name).some(position => {
            const token = tryCast(getTouchingPropertyName(sourceFile, position, /*includeJsDocComment*/ true), isIdentifier);
            return token && token !== definition && token.escapedText === definition.escapedText && checker.getSymbolAtLocation(token) === symbol;
        });
    }

    function getPossibleSymbolReferencePositions(sourceFile: SourceFile, symbolName: string, container: Node = sourceFile): ReadonlyArray<number> {
        const positions: number[] = [];

        /// TODO: Cache symbol existence for files to save text search
        // Also, need to make this work for unicode escapes.

        // Be resilient in the face of a symbol with no name or zero length name
        if (!symbolName || !symbolName.length) {
            return positions;
        }

        const text = sourceFile.text;
        const sourceLength = text.length;
        const symbolNameLength = symbolName.length;

        let position = text.indexOf(symbolName, container.pos);
        while (position >= 0) {
            // If we are past the end, stop looking
            if (position > container.end) break;

            // We found a match.  Make sure it's not part of a larger word (i.e. the char
            // before and after it have to be a non-identifier char).
            const endPosition = position + symbolNameLength;

            if ((position === 0 || !isIdentifierPart(text.charCodeAt(position - 1), ScriptTarget.Latest)) &&
                (endPosition === sourceLength || !isIdentifierPart(text.charCodeAt(endPosition), ScriptTarget.Latest))) {
                // Found a real match.  Keep searching.
                positions.push(position);
            }
            position = text.indexOf(symbolName, position + symbolNameLength + 1);
        }

        return positions;
    }

    function getLabelReferencesInNode(container: Node, targetLabel: Identifier): SymbolAndEntries[] {
        const sourceFile = container.getSourceFile();
        const labelName = targetLabel.text;
        const references = mapDefined(getPossibleSymbolReferencePositions(sourceFile, labelName, container), position => {
            const node = getTouchingWord(sourceFile, position, /*includeJsDocComment*/ false);
            // Only pick labels that are either the target label, or have a target that is the target label
            return node && (node === targetLabel || (isJumpStatementTarget(node) && getTargetLabel(node, labelName) === targetLabel)) ? nodeEntry(node) : undefined;
        });
        return [{ definition: { type: "label", node: targetLabel }, references }];
    }

    function isValidReferencePosition(node: Node, searchSymbolName: string): boolean {
        // Compare the length so we filter out strict superstrings of the symbol we are looking for
        switch (node.kind) {
            case SyntaxKind.Identifier:
                return (node as Identifier).text.length === searchSymbolName.length;

            case SyntaxKind.StringLiteral: {
                const str = node as StringLiteral;
                return (isLiteralNameOfPropertyDeclarationOrIndexAccess(str) || isNameOfModuleDeclaration(node) || isExpressionOfExternalModuleImportEqualsDeclaration(node)) &&
                    str.text.length === searchSymbolName.length;
            }

            case SyntaxKind.NumericLiteral:
                return isLiteralNameOfPropertyDeclarationOrIndexAccess(node as NumericLiteral) && (node as NumericLiteral).text.length === searchSymbolName.length;

            case SyntaxKind.DefaultKeyword:
                return "default".length === searchSymbolName.length;

            default:
                return false;
        }
    }

    function getAllReferencesForKeyword(sourceFiles: ReadonlyArray<SourceFile>, keywordKind: SyntaxKind, cancellationToken: CancellationToken): SymbolAndEntries[] {
        const references = flatMap(sourceFiles, sourceFile => {
            cancellationToken.throwIfCancellationRequested();
            return mapDefined(getPossibleSymbolReferencePositions(sourceFile, tokenToString(keywordKind), sourceFile), position => {
                const referenceLocation = getTouchingPropertyName(sourceFile, position, /*includeJsDocComment*/ true);
                return referenceLocation.kind === keywordKind ? nodeEntry(referenceLocation) : undefined;
            });
        });
        return references.length ? [{ definition: { type: "keyword", node: references[0].node }, references }] : undefined;
    }

    function getReferencesInSourceFile(sourceFile: SourceFile, search: Search, state: State, addReferencesHere = true): void {
        state.cancellationToken.throwIfCancellationRequested();
        return getReferencesInContainer(sourceFile, sourceFile, search, state, addReferencesHere);
    }

    /**
     * Search within node "container" for references for a search value, where the search value is defined as a
     * tuple of(searchSymbol, searchText, searchLocation, and searchMeaning).
     * searchLocation: a node where the search value
     */
    function getReferencesInContainer(container: Node, sourceFile: SourceFile, search: Search, state: State, addReferencesHere: boolean): void {
        if (!state.markSearchedSymbol(sourceFile, search.symbol)) {
            return;
        }

        for (const position of getPossibleSymbolReferencePositions(sourceFile, search.text, container)) {
            getReferencesAtLocation(sourceFile, position, search, state, addReferencesHere);
        }
    }

    function getReferencesAtLocation(sourceFile: SourceFile, position: number, search: Search, state: State, addReferencesHere: boolean): void {
        const referenceLocation = getTouchingPropertyName(sourceFile, position, /*includeJsDocComment*/ true);

        if (!isValidReferencePosition(referenceLocation, search.text)) {
            // This wasn't the start of a token.  Check to see if it might be a
            // match in a comment or string if that's what the caller is asking
            // for.
            if (!state.options.implementations && (state.options.findInStrings && isInString(sourceFile, position) || state.options.findInComments && isInNonReferenceComment(sourceFile, position))) {
                // In the case where we're looking inside comments/strings, we don't have
                // an actual definition.  So just use 'undefined' here.  Features like
                // 'Rename' won't care (as they ignore the definitions), and features like
                // 'FindReferences' will just filter out these results.
                state.addStringOrCommentReference(sourceFile.fileName, createTextSpan(position, search.text.length));
            }

            return;
        }

        if (!(getMeaningFromLocation(referenceLocation) & state.searchMeaning)) {
            return;
        }

        const referenceSymbol = state.checker.getSymbolAtLocation(referenceLocation);
        if (!referenceSymbol) {
            return;
        }

        const { parent } = referenceLocation;
        if (isImportSpecifier(parent) && parent.propertyName === referenceLocation) {
            // This is added through `singleReferences` in ImportsResult. If we happen to see it again, don't add it again.
            return;
        }

        if (isExportSpecifier(parent)) {
            Debug.assert(referenceLocation.kind === SyntaxKind.Identifier);
            getReferencesAtExportSpecifier(referenceLocation as Identifier, referenceSymbol, parent, search, state, addReferencesHere);
            return;
        }

        const relatedSymbol = getRelatedSymbol(search, referenceSymbol, referenceLocation, state);
        if (!relatedSymbol) {
            getReferenceForShorthandProperty(referenceSymbol, search, state);
            return;
        }

        switch (state.specialSearchKind) {
            case SpecialSearchKind.None:
                if (addReferencesHere) addReference(referenceLocation, relatedSymbol, state);
                break;
            case SpecialSearchKind.Constructor:
                addConstructorReferences(referenceLocation, sourceFile, search, state);
                break;
            case SpecialSearchKind.Class:
                addClassStaticThisReferences(referenceLocation, search, state);
                break;
            default:
                Debug.assertNever(state.specialSearchKind);
        }

        getImportOrExportReferences(referenceLocation, referenceSymbol, search, state);
    }

    function getReferencesAtExportSpecifier(referenceLocation: Identifier, referenceSymbol: Symbol, exportSpecifier: ExportSpecifier, search: Search, state: State, addReferencesHere: boolean): void {
        const { parent, propertyName, name } = exportSpecifier;
        const exportDeclaration = parent.parent;
        const localSymbol = getLocalSymbolForExportSpecifier(referenceLocation, referenceSymbol, exportSpecifier, state.checker);
        if (!search.includes(localSymbol)) {
            return;
        }

        if (!propertyName) {
            addRef();
        }
        else if (referenceLocation === propertyName) {
            // For `export { foo as bar } from "baz"`, "`foo`" will be added from the singleReferences for import searches of the original export.
            // For `export { foo as bar };`, where `foo` is a local, so add it now.
            if (!exportDeclaration.moduleSpecifier) {
                addRef();
            }

            if (addReferencesHere && !state.options.isForRename && state.markSeenReExportRHS(name)) {
                addReference(name, referenceSymbol, state);
            }
        }
        else {
            if (state.markSeenReExportRHS(referenceLocation)) {
                addRef();
            }
        }

        // For `export { foo as bar }`, rename `foo`, but not `bar`.
        if (!(referenceLocation === propertyName && state.options.isForRename)) {
            const exportKind = referenceLocation.originalKeywordKind === SyntaxKind.DefaultKeyword ? ExportKind.Default : ExportKind.Named;
            const exportInfo = getExportInfo(referenceSymbol, exportKind, state.checker);
            Debug.assert(!!exportInfo);
            searchForImportsOfExport(referenceLocation, referenceSymbol, exportInfo, state);
        }

        // At `export { x } from "foo"`, also search for the imported symbol `"foo".x`.
        if (search.comingFrom !== ImportExport.Export && exportDeclaration.moduleSpecifier && !propertyName) {
            const imported = state.checker.getExportSpecifierLocalTargetSymbol(exportSpecifier);
            if (imported) searchForImportedSymbol(imported, state);
        }

        function addRef() {
            if (addReferencesHere) addReference(referenceLocation, localSymbol, state);
        }
    }

    function getLocalSymbolForExportSpecifier(referenceLocation: Identifier, referenceSymbol: Symbol, exportSpecifier: ExportSpecifier, checker: TypeChecker): Symbol {
        return isExportSpecifierAlias(referenceLocation, exportSpecifier) && checker.getExportSpecifierLocalTargetSymbol(exportSpecifier) || referenceSymbol;
    }

    function isExportSpecifierAlias(referenceLocation: Identifier, exportSpecifier: ExportSpecifier): boolean {
        const { parent, propertyName, name } = exportSpecifier;
        Debug.assert(propertyName === referenceLocation || name === referenceLocation);
        if (propertyName) {
            // Given `export { foo as bar } [from "someModule"]`: It's an alias at `foo`, but at `bar` it's a new symbol.
            return propertyName === referenceLocation;
        }
        else {
            // `export { foo } from "foo"` is a re-export.
            // `export { foo };` is not a re-export, it creates an alias for the local variable `foo`.
            return !parent.parent.moduleSpecifier;
        }
    }

    function getImportOrExportReferences(referenceLocation: Node, referenceSymbol: Symbol, search: Search, state: State): void {
        const importOrExport = getImportOrExportSymbol(referenceLocation, referenceSymbol, state.checker, search.comingFrom === ImportExport.Export);
        if (!importOrExport) return;

        const { symbol } = importOrExport;

        if (importOrExport.kind === ImportExport.Import) {
            if (!state.options.isForRename || importOrExport.isNamedImport) {
                searchForImportedSymbol(symbol, state);
            }
        }
        else {
            // We don't check for `state.isForRename`, even for default exports, because importers that previously matched the export name should be updated to continue matching.
            searchForImportsOfExport(referenceLocation, symbol, importOrExport.exportInfo, state);
        }
    }

    function getReferenceForShorthandProperty({ flags, valueDeclaration }: Symbol, search: Search, state: State): void {
        const shorthandValueSymbol = state.checker.getShorthandAssignmentValueSymbol(valueDeclaration);
        /*
         * Because in short-hand property assignment, an identifier which stored as name of the short-hand property assignment
         * has two meanings: property name and property value. Therefore when we do findAllReference at the position where
         * an identifier is declared, the language service should return the position of the variable declaration as well as
         * the position in short-hand property assignment excluding property accessing. However, if we do findAllReference at the
         * position of property accessing, the referenceEntry of such position will be handled in the first case.
         */
        if (!(flags & SymbolFlags.Transient) && search.includes(shorthandValueSymbol)) {
            addReference(getNameOfDeclaration(valueDeclaration), shorthandValueSymbol, state);
        }
    }

    function addReference(referenceLocation: Node, relatedSymbol: Symbol, state: State): void {
        const addRef = state.referenceAdder(relatedSymbol);
        if (state.options.implementations) {
            addImplementationReferences(referenceLocation, addRef, state);
        }
        else {
            addRef(referenceLocation);
        }
    }

    /** Adds references when a constructor is used with `new this()` in its own class and `super()` calls in subclasses.  */
    function addConstructorReferences(referenceLocation: Node, sourceFile: SourceFile, search: Search, state: State): void {
        if (isNewExpressionTarget(referenceLocation)) {
            addReference(referenceLocation, search.symbol, state);
        }

        const pusher = () => state.referenceAdder(search.symbol);

        if (isClassLike(referenceLocation.parent)) {
            Debug.assert(referenceLocation.kind === SyntaxKind.DefaultKeyword || referenceLocation.parent.name === referenceLocation);
            // This is the class declaration containing the constructor.
            findOwnConstructorReferences(search.symbol, sourceFile, pusher());
        }
        else {
            // If this class appears in `extends C`, then the extending class' "super" calls are references.
            const classExtending = tryGetClassByExtendingIdentifier(referenceLocation);
            if (classExtending) {
                findSuperConstructorAccesses(classExtending, pusher());
            }
        }
    }

    function addClassStaticThisReferences(referenceLocation: Node, search: Search, state: State): void {
        addReference(referenceLocation, search.symbol, state);
        if (!state.options.isForRename && isClassLike(referenceLocation.parent)) {
            Debug.assert(referenceLocation.parent.name === referenceLocation);
            // This is the class declaration.
            addStaticThisReferences(referenceLocation.parent, state.referenceAdder(search.symbol));
        }
    }

    function addStaticThisReferences(classLike: ClassLikeDeclaration, pusher: (node: Node) => void): void {
        for (const member of classLike.members) {
            if (!(isMethodOrAccessor(member) && hasModifier(member, ModifierFlags.Static))) {
                continue;
            }
            member.body.forEachChild(function cb(node) {
                if (node.kind === SyntaxKind.ThisKeyword) {
                    pusher(node);
                }
                else if (!isFunctionLike(node)) {
                    node.forEachChild(cb);
                }
            });
        }
    }

    function getPropertyAccessExpressionFromRightHandSide(node: Node): PropertyAccessExpression {
        return isRightSideOfPropertyAccess(node) && <PropertyAccessExpression>node.parent;
    }

    /**
     * `classSymbol` is the class where the constructor was defined.
     * Reference the constructor and all calls to `new this()`.
     */
    function findOwnConstructorReferences(classSymbol: Symbol, sourceFile: SourceFile, addNode: (node: Node) => void): void {
        for (const decl of classSymbol.members.get(InternalSymbolName.Constructor).declarations) {
            const ctrKeyword = findChildOfKind(decl, SyntaxKind.ConstructorKeyword, sourceFile)!;
            Debug.assert(decl.kind === SyntaxKind.Constructor && !!ctrKeyword);
            addNode(ctrKeyword);
        }

        classSymbol.exports.forEach(member => {
            const decl = member.valueDeclaration;
            if (decl && decl.kind === SyntaxKind.MethodDeclaration) {
                const body = (<MethodDeclaration>decl).body;
                if (body) {
                    forEachDescendantOfKind(body, SyntaxKind.ThisKeyword, thisKeyword => {
                        if (isNewExpressionTarget(thisKeyword)) {
                            addNode(thisKeyword);
                        }
                    });
                }
            }
        });
    }

    /** Find references to `super` in the constructor of an extending class.  */
    function findSuperConstructorAccesses(cls: ClassLikeDeclaration, addNode: (node: Node) => void): void {
        const symbol = cls.symbol;
        const ctr = symbol.members.get(InternalSymbolName.Constructor);
        if (!ctr) {
            return;
        }

        for (const decl of ctr.declarations) {
            Debug.assert(decl.kind === SyntaxKind.Constructor);
            const body = (<ConstructorDeclaration>decl).body;
            if (body) {
                forEachDescendantOfKind(body, SyntaxKind.SuperKeyword, node => {
                    if (isCallExpressionTarget(node)) {
                        addNode(node);
                    }
                });
            }
        }
    }

    function addImplementationReferences(refNode: Node, addReference: (node: Node) => void, state: State): void {
        // Check if we found a function/propertyAssignment/method with an implementation or initializer
        if (isDeclarationName(refNode) && isImplementation(refNode.parent)) {
            addReference(refNode.parent);
            return;
        }

        if (refNode.kind !== SyntaxKind.Identifier) {
            return;
        }

        if (refNode.parent.kind === SyntaxKind.ShorthandPropertyAssignment) {
            // Go ahead and dereference the shorthand assignment by going to its definition
            getReferenceEntriesForShorthandPropertyAssignment(refNode, state.checker, addReference);
        }

        // Check if the node is within an extends or implements clause
        const containingClass = getContainingClassIfInHeritageClause(refNode);
        if (containingClass) {
            addReference(containingClass);
            return;
        }

        // If we got a type reference, try and see if the reference applies to any expressions that can implement an interface
        const containingTypeReference = getContainingTypeReference(refNode);
        if (containingTypeReference && state.markSeenContainingTypeReference(containingTypeReference)) {
            const parent = containingTypeReference.parent;
            if (hasType(parent) && parent.type === containingTypeReference && hasInitializer(parent) && isImplementationExpression(parent.initializer)) {
                addReference(parent.initializer);
            }
            else if (isFunctionLike(parent) && parent.type === containingTypeReference && (parent as FunctionLikeDeclaration).body) {
                const body = (parent as FunctionLikeDeclaration).body;
                if (body.kind === SyntaxKind.Block) {
                    forEachReturnStatement(<Block>body, returnStatement => {
                        if (returnStatement.expression && isImplementationExpression(returnStatement.expression)) {
                            addReference(returnStatement.expression);
                        }
                    });
                }
                else if (isImplementationExpression(body)) {
                    addReference(body);
                }
            }
            else if (isAssertionExpression(parent) && isImplementationExpression(parent.expression)) {
                addReference(parent.expression);
            }
        }
    }

    function getSymbolsForClassAndInterfaceComponents(type: UnionOrIntersectionType, result: Symbol[] = []): Symbol[] {
        for (const componentType of type.types) {
            if (componentType.symbol && componentType.symbol.getFlags() & (SymbolFlags.Class | SymbolFlags.Interface)) {
                result.push(componentType.symbol);
            }
            if (componentType.isUnionOrIntersection()) {
                getSymbolsForClassAndInterfaceComponents(componentType, result);
            }
        }
        return result;
    }

    function getContainingTypeReference(node: Node): Node {
        let topLevelTypeReference: Node;

        while (node) {
            if (isTypeNode(node)) {
                topLevelTypeReference = node;
            }
            node = node.parent;
        }

        return topLevelTypeReference;
    }

    function getContainingClassIfInHeritageClause(node: Node): ClassLikeDeclaration {
        if (node && node.parent) {
            if (node.kind === SyntaxKind.ExpressionWithTypeArguments
                && node.parent.kind === SyntaxKind.HeritageClause
                && isClassLike(node.parent.parent)) {
                return node.parent.parent;
            }

            else if (node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.PropertyAccessExpression) {
                return getContainingClassIfInHeritageClause(node.parent);
            }
        }
        return undefined;
    }

    /**
     * Returns true if this is an expression that can be considered an implementation
     */
    function isImplementationExpression(node: Expression): boolean {
        switch (node.kind) {
            case SyntaxKind.ParenthesizedExpression:
                return isImplementationExpression((<ParenthesizedExpression>node).expression);
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ObjectLiteralExpression:
            case SyntaxKind.ClassExpression:
            case SyntaxKind.ArrayLiteralExpression:
                return true;
            default:
                return false;
        }
    }

    /**
     * Determines if the parent symbol occurs somewhere in the child's ancestry. If the parent symbol
     * is an interface, determines if some ancestor of the child symbol extends or inherits from it.
     * Also takes in a cache of previous results which makes this slightly more efficient and is
     * necessary to avoid potential loops like so:
     *     class A extends B { }
     *     class B extends A { }
     *
     * We traverse the AST rather than using the type checker because users are typically only interested
     * in explicit implementations of an interface/class when calling "Go to Implementation". Sibling
     * implementations of types that share a common ancestor with the type whose implementation we are
     * searching for need to be filtered out of the results. The type checker doesn't let us make the
     * distinction between structurally compatible implementations and explicit implementations, so we
     * must use the AST.
     *
     * @param symbol         A class or interface Symbol
     * @param parent        Another class or interface Symbol
     * @param cachedResults A map of symbol id pairs (i.e. "child,parent") to booleans indicating previous results
     */
    function explicitlyInheritsFrom(symbol: Symbol, parent: Symbol, cachedResults: Map<boolean>, checker: TypeChecker): boolean {
        if (symbol === parent) {
            return true;
        }

        const key = getSymbolId(symbol) + "," + getSymbolId(parent);
        const cached = cachedResults.get(key);
        if (cached !== undefined) {
            return cached;
        }

        // Set the key so that we don't infinitely recurse
        cachedResults.set(key, false);

        const inherits = symbol.declarations.some(declaration =>
            getAllSuperTypeNodes(declaration).some(typeReference => {
                const type = checker.getTypeAtLocation(typeReference);
                return !!type && !!type.symbol && explicitlyInheritsFrom(type.symbol, parent, cachedResults, checker);
            }));
        cachedResults.set(key, inherits);
        return inherits;
    }

    function getReferencesForSuperKeyword(superKeyword: Node): SymbolAndEntries[] {
        let searchSpaceNode = getSuperContainer(superKeyword, /*stopOnFunctions*/ false);
        if (!searchSpaceNode) {
            return undefined;
        }
        // Whether 'super' occurs in a static context within a class.
        let staticFlag = ModifierFlags.Static;

        switch (searchSpaceNode.kind) {
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.Constructor:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
                staticFlag &= getModifierFlags(searchSpaceNode);
                searchSpaceNode = searchSpaceNode.parent; // re-assign to be the owning class
                break;
            default:
                return undefined;
        }

        const sourceFile = searchSpaceNode.getSourceFile();
        const references = mapDefined(getPossibleSymbolReferencePositions(sourceFile, "super", searchSpaceNode), position => {
            const node = getTouchingWord(sourceFile, position, /*includeJsDocComment*/ false);
            if (!node || node.kind !== SyntaxKind.SuperKeyword) {
                return;
            }

            const container = getSuperContainer(node, /*stopOnFunctions*/ false);

            // If we have a 'super' container, we must have an enclosing class.
            // Now make sure the owning class is the same as the search-space
            // and has the same static qualifier as the original 'super's owner.
            return container && (ModifierFlags.Static & getModifierFlags(container)) === staticFlag && container.parent.symbol === searchSpaceNode.symbol ? nodeEntry(node) : undefined;
        });

        return [{ definition: { type: "symbol", symbol: searchSpaceNode.symbol }, references }];
    }

    function getReferencesForThisKeyword(thisOrSuperKeyword: Node, sourceFiles: ReadonlyArray<SourceFile>, cancellationToken: CancellationToken): SymbolAndEntries[] {
        let searchSpaceNode = getThisContainer(thisOrSuperKeyword, /* includeArrowFunctions */ false);

        // Whether 'this' occurs in a static context within a class.
        let staticFlag = ModifierFlags.Static;

        switch (searchSpaceNode.kind) {
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
                if (isObjectLiteralMethod(searchSpaceNode)) {
                    break;
                }
                // falls through
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.Constructor:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
                staticFlag &= getModifierFlags(searchSpaceNode);
                searchSpaceNode = searchSpaceNode.parent; // re-assign to be the owning class
                break;
            case SyntaxKind.SourceFile:
                if (isExternalModule(<SourceFile>searchSpaceNode)) {
                    return undefined;
                }
                // falls through
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
                break;
            // Computed properties in classes are not handled here because references to this are illegal,
            // so there is no point finding references to them.
            default:
                return undefined;
        }

        const references: Entry[] = [];
        for (const sourceFile of searchSpaceNode.kind === SyntaxKind.SourceFile ? sourceFiles : [searchSpaceNode.getSourceFile()]) {
            cancellationToken.throwIfCancellationRequested();
            const positions = getPossibleSymbolReferencePositions(sourceFile, "this", isSourceFile(searchSpaceNode) ? sourceFile : searchSpaceNode);
            getThisReferencesInFile(sourceFile, searchSpaceNode.kind === SyntaxKind.SourceFile ? sourceFile : searchSpaceNode, positions, staticFlag, references);
        }

        return [{
            definition: { type: "this", node: thisOrSuperKeyword },
            references
        }];
    }

    function getThisReferencesInFile(sourceFile: SourceFile, searchSpaceNode: Node, possiblePositions: ReadonlyArray<number>, staticFlag: ModifierFlags, result: Push<Entry>): void {
        forEach(possiblePositions, position => {
            const node = getTouchingWord(sourceFile, position, /*includeJsDocComment*/ false);
            if (!node || !isThis(node)) {
                return;
            }

            const container = getThisContainer(node, /* includeArrowFunctions */ false);

            switch (searchSpaceNode.kind) {
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.FunctionDeclaration:
                    if (searchSpaceNode.symbol === container.symbol) {
                        result.push(nodeEntry(node));
                    }
                    break;
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                    if (isObjectLiteralMethod(searchSpaceNode) && searchSpaceNode.symbol === container.symbol) {
                        result.push(nodeEntry(node));
                    }
                    break;
                case SyntaxKind.ClassExpression:
                case SyntaxKind.ClassDeclaration:
                    // Make sure the container belongs to the same class
                    // and has the appropriate static modifier from the original container.
                    if (container.parent && searchSpaceNode.symbol === container.parent.symbol && (getModifierFlags(container) & ModifierFlags.Static) === staticFlag) {
                        result.push(nodeEntry(node));
                    }
                    break;
                case SyntaxKind.SourceFile:
                    if (container.kind === SyntaxKind.SourceFile && !isExternalModule(<SourceFile>container)) {
                        result.push(nodeEntry(node));
                    }
                    break;
            }
        });
    }

    function getReferencesForStringLiteral(node: StringLiteral, sourceFiles: ReadonlyArray<SourceFile>, cancellationToken: CancellationToken): SymbolAndEntries[] {
        const references = flatMap(sourceFiles, sourceFile => {
            cancellationToken.throwIfCancellationRequested();
            return mapDefined(getPossibleSymbolReferencePositions(sourceFile, node.text), position => {
                const ref = tryCast(getTouchingWord(sourceFile, position, /*includeJsDocComment*/ false), isStringLiteral);
                return ref && ref.text === node.text ? nodeEntry(ref, /*isInString*/ true) : undefined;
            });
        });

        return [{
            definition: { type: "string", node },
            references
        }];
    }

    // For certain symbol kinds, we need to include other symbols in the search set.
    // This is not needed when searching for re-exports.
    function populateSearchSymbolSet(symbol: Symbol, location: Node, checker: TypeChecker, implementations: boolean): Symbol[] {
        // The search set contains at least the current symbol
        const result: Symbol[] = [];

        const containingObjectLiteralElement = getContainingObjectLiteralElement(location);
        if (containingObjectLiteralElement) {
            // If the location is name of property symbol from object literal destructuring pattern
            // Search the property symbol
            //      for ( { property: p2 } of elems) { }
            if (containingObjectLiteralElement.kind !== SyntaxKind.ShorthandPropertyAssignment) {
                const propertySymbol = getPropertySymbolOfDestructuringAssignment(location, checker);
                if (propertySymbol) {
                    result.push(propertySymbol);
                }
            }

            // If the location is in a context sensitive location (i.e. in an object literal) try
            // to get a contextual type for it, and add the property symbol from the contextual
            // type to the search set
            for (const contextualSymbol of getPropertySymbolsFromContextualType(containingObjectLiteralElement, checker)) {
                addRootSymbols(contextualSymbol);
            }

            /* Because in short-hand property assignment, location has two meaning : property name and as value of the property
             * When we do findAllReference at the position of the short-hand property assignment, we would want to have references to position of
             * property name and variable declaration of the identifier.
             * Like in below example, when querying for all references for an identifier 'name', of the property assignment, the language service
             * should show both 'name' in 'obj' and 'name' in variable declaration
             *      const name = "Foo";
             *      const obj = { name };
             * In order to do that, we will populate the search set with the value symbol of the identifier as a value of the property assignment
             * so that when matching with potential reference symbol, both symbols from property declaration and variable declaration
             * will be included correctly.
             */
            const shorthandValueSymbol = checker.getShorthandAssignmentValueSymbol(location.parent);
            if (shorthandValueSymbol) {
                result.push(shorthandValueSymbol);
            }
        }

        // If the symbol.valueDeclaration is a property parameter declaration,
        // we should include both parameter declaration symbol and property declaration symbol
        // Parameter Declaration symbol is only visible within function scope, so the symbol is stored in constructor.locals.
        // Property Declaration symbol is a member of the class, so the symbol is stored in its class Declaration.symbol.members
        addRange(result, getParameterPropertySymbols(symbol, checker));

        // If this is symbol of binding element without propertyName declaration in Object binding pattern
        // Include the property in the search
        const bindingElementPropertySymbol = getPropertySymbolOfObjectBindingPatternWithoutPropertyName(symbol, checker);
        if (bindingElementPropertySymbol) {
            result.push(bindingElementPropertySymbol);
            addRootSymbols(bindingElementPropertySymbol);
        }

        addRootSymbols(symbol);

        return result;

        function addRootSymbols(sym: Symbol): void {
            // If this is a union property, add all the symbols from all its source symbols in all unioned types.
            // If the symbol is an instantiation from a another symbol (e.g. widened symbol) , add the root the list
            for (const rootSymbol of checker.getRootSymbols(sym)) {
                result.push(rootSymbol);

                // Add symbol of properties/methods of the same name in base classes and implemented interfaces definitions
                if (!implementations && rootSymbol.parent && rootSymbol.parent.flags & (SymbolFlags.Class | SymbolFlags.Interface)) {
                    getPropertySymbolsFromBaseTypes(rootSymbol.parent, rootSymbol.name, checker, result);
                }
            }
        }
    }

    function getParameterPropertySymbols(symbol: Symbol, checker: TypeChecker): Symbol[] {
        return symbol.valueDeclaration && isParameter(symbol.valueDeclaration) && isParameterPropertyDeclaration(symbol.valueDeclaration)
            ? checker.getSymbolsOfParameterPropertyDeclaration(symbol.valueDeclaration, symbol.name)
            : undefined;
    }

    /**
     * Find symbol of the given property-name and add the symbol to the given result array
     * @param symbol a symbol to start searching for the given propertyName
     * @param propertyName a name of property to search for
     * @param result an array of symbol of found property symbols
     * @param previousIterationSymbolsCache a cache of symbol from previous iterations of calling this function to prevent infinite revisiting of the same symbol.
     *                                The value of previousIterationSymbol is undefined when the function is first called.
     */
    function getPropertySymbolsFromBaseTypes(symbol: Symbol, propertyName: string, checker: TypeChecker, result: Symbol[] = []): Symbol[] {
        const seen = createMap<true>();
        recur(symbol);
        return result;

        function recur(symbol: Symbol): void {
            // Use `addToSeen` to ensure we don't infinitely recurse in this situation:
            //      interface C extends C {
            //          /*findRef*/propName: string;
            //      }
            if (!(symbol.flags & (SymbolFlags.Class | SymbolFlags.Interface)) || !addToSeen(seen, getSymbolId(symbol))) return;

            for (const declaration of symbol.declarations) {
                for (const typeReference of getAllSuperTypeNodes(declaration)) {
                    const type = checker.getTypeAtLocation(typeReference);
                    if (!(type && type.symbol)) continue;

                    const propertySymbol = checker.getPropertyOfType(type, propertyName);
                    if (propertySymbol) {
                        result.push(...checker.getRootSymbols(propertySymbol));
                    }

                    // Visit the typeReference as well to see if it directly or indirectly use that property
                    recur(type.symbol);
                }
            }
        }
    }

    function getRelatedSymbol(search: Search, referenceSymbol: Symbol, referenceLocation: Node, state: State): Symbol | undefined {
        const { checker } = state;
        if (search.includes(referenceSymbol)) {
            return referenceSymbol;
        }

        if (referenceSymbol.flags & SymbolFlags.FunctionScopedVariable) {
            Debug.assert(!(referenceSymbol.flags & SymbolFlags.Property));
            const paramProps = getParameterPropertySymbols(referenceSymbol, checker);
            if (paramProps) {
                return getRelatedSymbol(search, find(paramProps, x => !!(x.flags & SymbolFlags.Property))!, referenceLocation, state);
            }
        }

        // If the reference location is in an object literal, try to get the contextual type for the
        // object literal, lookup the property symbol in the contextual type, and use this symbol to
        // compare to our searchSymbol
        const containingObjectLiteralElement = getContainingObjectLiteralElement(referenceLocation);
        if (containingObjectLiteralElement) {
            const contextualSymbol = firstDefined(getPropertySymbolsFromContextualType(containingObjectLiteralElement, checker), findRootSymbol);
            if (contextualSymbol) {
                return contextualSymbol;
            }

            // If the reference location is the name of property from object literal destructuring pattern
            // Get the property symbol from the object literal's type and look if thats the search symbol
            // In below eg. get 'property' from type of elems iterating type
            //      for ( { property: p2 } of elems) { }
            const propertySymbol = getPropertySymbolOfDestructuringAssignment(referenceLocation, checker);
            if (propertySymbol && search.includes(propertySymbol)) {
                return propertySymbol;
            }
        }

        // If the reference location is the binding element and doesn't have property name
        // then include the binding element in the related symbols
        //      let { a } : { a };
        const bindingElementPropertySymbol = getPropertySymbolOfObjectBindingPatternWithoutPropertyName(referenceSymbol, checker);
        if (bindingElementPropertySymbol) {
            const fromBindingElement = findRootSymbol(bindingElementPropertySymbol);
            if (fromBindingElement) return fromBindingElement;
        }

        return findRootSymbol(referenceSymbol);

        function findRootSymbol(sym: Symbol): Symbol | undefined {
            // Unwrap symbols to get to the root (e.g. transient symbols as a result of widening)
            // Or a union property, use its underlying unioned symbols
            return firstDefined(checker.getRootSymbols(sym), rootSymbol => {
                // if it is in the list, then we are done
                if (search.includes(rootSymbol)) {
                    // For a root symbol that is a component of a union or intersection, use the original (union/intersection) symbol.
                    // That we when a symbol references the whole union we avoid claiming it references some particular member of the union.
                    // For a transient symbol we want to use the root symbol instead.
                    return getCheckFlags(sym) & CheckFlags.Synthetic ? sym : rootSymbol;
                }

                // Finally, try all properties with the same name in any type the containing type extended or implemented, and
                // see if any is in the list. If we were passed a parent symbol, only include types that are subtypes of the
                // parent symbol
                if (rootSymbol.parent && rootSymbol.parent.flags & (SymbolFlags.Class | SymbolFlags.Interface)) {
                    // Parents will only be defined if implementations is true
                    if (search.parents && !some(search.parents, parent => explicitlyInheritsFrom(rootSymbol.parent, parent, state.inheritsFromCache, checker))) {
                        return undefined;
                    }

                    return getPropertySymbolsFromBaseTypes(rootSymbol.parent, rootSymbol.name, checker).some(search.includes) ? rootSymbol : undefined;
                }

                return undefined;
            });
        }
    }

    /** Gets all symbols for one property. Does not get symbols for every property. */
    function getPropertySymbolsFromContextualType(node: ObjectLiteralElement, checker: TypeChecker): ReadonlyArray<Symbol> {
        const contextualType = checker.getContextualType(<ObjectLiteralExpression>node.parent);
        const name = getNameFromPropertyName(node.name);
        const symbol = contextualType && name && contextualType.getProperty(name);
        return symbol ? [symbol] :
            contextualType && contextualType.isUnion() ? mapDefined(contextualType.types, t => t.getProperty(name)) : emptyArray;
    }

    /**
     * Given an initial searchMeaning, extracted from a location, widen the search scope based on the declarations
     * of the corresponding symbol. e.g. if we are searching for "Foo" in value position, but "Foo" references a class
     * then we need to widen the search to include type positions as well.
     * On the contrary, if we are searching for "Bar" in type position and we trace bar to an interface, and an uninstantiated
     * module, we want to keep the search limited to only types, as the two declarations (interface and uninstantiated module)
     * do not intersect in any of the three spaces.
     */
    export function getIntersectingMeaningFromDeclarations(node: Node, symbol: Symbol): SemanticMeaning {
        let meaning = getMeaningFromLocation(node);
        const { declarations } = symbol;
        if (declarations) {
            let lastIterationMeaning: SemanticMeaning;
            do {
                // The result is order-sensitive, for instance if initialMeaning === Namespace, and declarations = [class, instantiated module]
                // we need to consider both as they initialMeaning intersects with the module in the namespace space, and the module
                // intersects with the class in the value space.
                // To achieve that we will keep iterating until the result stabilizes.

                // Remember the last meaning
                lastIterationMeaning = meaning;

                for (const declaration of declarations) {
                    const declarationMeaning = getMeaningFromDeclaration(declaration);

                    if (declarationMeaning & meaning) {
                        meaning |= declarationMeaning;
                    }
                }
            }
            while (meaning !== lastIterationMeaning);
        }
        return meaning;
    }

    function isImplementation(node: Node): boolean {
        return !!(node.flags & NodeFlags.Ambient)
            || (isVariableLike(node) ? hasInitializer(node)
                : isFunctionLikeDeclaration(node) ? !!node.body
                : isClassLike(node) || isModuleOrEnumDeclaration(node));
    }

    export function getReferenceEntriesForShorthandPropertyAssignment(node: Node, checker: TypeChecker, addReference: (node: Node) => void): void {
        const refSymbol = checker.getSymbolAtLocation(node);
        const shorthandSymbol = checker.getShorthandAssignmentValueSymbol(refSymbol.valueDeclaration);

        if (shorthandSymbol) {
            for (const declaration of shorthandSymbol.getDeclarations()) {
                if (getMeaningFromDeclaration(declaration) & SemanticMeaning.Value) {
                    addReference(declaration);
                }
            }
        }
    }

    function forEachDescendantOfKind(node: Node, kind: SyntaxKind, action: (node: Node) => void): void {
        forEachChild(node, child => {
            if (child.kind === kind) {
                action(child);
            }
            forEachDescendantOfKind(child, kind, action);
        });
    }

    /** Get `C` given `N` if `N` is in the position `class C extends N` or `class C extends foo.N` where `N` is an identifier. */
    function tryGetClassByExtendingIdentifier(node: Node): ClassLikeDeclaration | undefined {
        return tryGetClassExtendingExpressionWithTypeArguments(climbPastPropertyAccess(node).parent);
    }

    /**
     * If we are just looking for implementations and this is a property access expression, we need to get the
     * symbol of the local type of the symbol the property is being accessed on. This is because our search
     * symbol may have a different parent symbol if the local type's symbol does not declare the property
     * being accessed (i.e. it is declared in some parent class or interface)
     */
    function getParentSymbolsOfPropertyAccess(location: Node, symbol: Symbol, checker: TypeChecker): Symbol[] | undefined {
        const propertyAccessExpression = getPropertyAccessExpressionFromRightHandSide(location);
        const localParentType = propertyAccessExpression && checker.getTypeAtLocation(propertyAccessExpression.expression);
        return localParentType && localParentType.symbol && localParentType.symbol.flags & (SymbolFlags.Class | SymbolFlags.Interface) && localParentType.symbol !== symbol.parent
            ? [localParentType.symbol]
            : localParentType && localParentType.isUnionOrIntersection()
            ? getSymbolsForClassAndInterfaceComponents(localParentType)
            : undefined;
    }
}
