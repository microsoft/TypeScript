/* @internal */
namespace ts.FindAllReferences {
    export interface SymbolAndEntries {
        readonly definition: Definition | undefined;
        readonly references: readonly Entry[];
    }

    export const enum DefinitionKind { Symbol, Label, Keyword, This, String }
    export type Definition =
        | { readonly type: DefinitionKind.Symbol; readonly symbol: Symbol }
        | { readonly type: DefinitionKind.Label; readonly node: Identifier }
        | { readonly type: DefinitionKind.Keyword; readonly node: Node }
        | { readonly type: DefinitionKind.This; readonly node: Node }
        | { readonly type: DefinitionKind.String; readonly node: StringLiteral };

    export const enum EntryKind { Span, Node, StringLiteral, SearchedLocalFoundProperty, SearchedPropertyFoundLocal }
    export type NodeEntryKind = EntryKind.Node | EntryKind.StringLiteral | EntryKind.SearchedLocalFoundProperty | EntryKind.SearchedPropertyFoundLocal;
    export type Entry = NodeEntry | SpanEntry;
    export interface ContextWithStartAndEndNode {
        start: Node;
        end: Node;
    }
    export type ContextNode = Node | ContextWithStartAndEndNode;
    export interface NodeEntry {
        readonly kind: NodeEntryKind;
        readonly node: Node;
        readonly context?: ContextNode;
    }
    export interface SpanEntry {
        readonly kind: EntryKind.Span;
        readonly fileName: string;
        readonly textSpan: TextSpan;
    }
    export function nodeEntry(node: Node, kind: NodeEntryKind = EntryKind.Node): NodeEntry {
        return {
            kind,
            node: (node as NamedDeclaration).name || node,
            context: getContextNodeForNodeEntry(node)
        };
    }

    export function isContextWithStartAndEndNode(node: ContextNode): node is ContextWithStartAndEndNode {
        return node && (node as Node).kind === undefined;
    }

    function getContextNodeForNodeEntry(node: Node): ContextNode | undefined {
        if (isDeclaration(node)) {
            return getContextNode(node);
        }

        if (!node.parent) return undefined;

        if (!isDeclaration(node.parent) && !isExportAssignment(node.parent)) {
            // Special property assignment in javascript
            if (isInJSFile(node)) {
                const binaryExpression = isBinaryExpression(node.parent) ?
                    node.parent :
                    isAccessExpression(node.parent) &&
                        isBinaryExpression(node.parent.parent) &&
                        node.parent.parent.left === node.parent ?
                        node.parent.parent :
                        undefined;
                if (binaryExpression && getAssignmentDeclarationKind(binaryExpression) !== AssignmentDeclarationKind.None) {
                    return getContextNode(binaryExpression);
                }
            }

            // Jsx Tags
            if (isJsxOpeningElement(node.parent) || isJsxClosingElement(node.parent)) {
                return node.parent.parent;
            }
            else if (isJsxSelfClosingElement(node.parent) ||
                isLabeledStatement(node.parent) ||
                isBreakOrContinueStatement(node.parent)) {
                return node.parent;
            }
            else if (isStringLiteralLike(node)) {
                const validImport = tryGetImportFromModuleSpecifier(node);
                if (validImport) {
                    const declOrStatement = findAncestor(validImport, node =>
                        isDeclaration(node) ||
                        isStatement(node) ||
                        isJSDocTag(node)
                    )! as NamedDeclaration | Statement | JSDocTag;
                    return isDeclaration(declOrStatement) ?
                        getContextNode(declOrStatement) :
                        declOrStatement;
                }
            }

            // Handle computed property name
            const propertyName = findAncestor(node, isComputedPropertyName);
            return propertyName ?
                getContextNode(propertyName.parent) :
                undefined;
        }

        if (node.parent.name === node || // node is name of declaration, use parent
            isConstructorDeclaration(node.parent) ||
            isExportAssignment(node.parent) ||
            // Property name of the import export specifier or binding pattern, use parent
            ((isImportOrExportSpecifier(node.parent) || isBindingElement(node.parent))
                && node.parent.propertyName === node) ||
            // Is default export
            (node.kind === SyntaxKind.DefaultKeyword && hasSyntacticModifier(node.parent, ModifierFlags.ExportDefault))) {
            return getContextNode(node.parent);
        }

        return undefined;
    }

    export function getContextNode(node: NamedDeclaration | BinaryExpression | ForInOrOfStatement | undefined): ContextNode | undefined {
        if (!node) return undefined;
        switch (node.kind) {
            case SyntaxKind.VariableDeclaration:
                return !isVariableDeclarationList(node.parent) || node.parent.declarations.length !== 1 ?
                    node :
                    isVariableStatement(node.parent.parent) ?
                        node.parent.parent :
                        isForInOrOfStatement(node.parent.parent) ?
                            getContextNode(node.parent.parent) :
                            node.parent;

            case SyntaxKind.BindingElement:
                return getContextNode(node.parent.parent as NamedDeclaration);

            case SyntaxKind.ImportSpecifier:
                return node.parent.parent.parent;

            case SyntaxKind.ExportSpecifier:
            case SyntaxKind.NamespaceImport:
                return node.parent.parent;

            case SyntaxKind.ImportClause:
                return node.parent;

            case SyntaxKind.BinaryExpression:
                return isExpressionStatement(node.parent) ?
                    node.parent :
                    node;

            case SyntaxKind.ForOfStatement:
            case SyntaxKind.ForInStatement:
                return {
                    start: (node as ForInOrOfStatement).initializer,
                    end: (node as ForInOrOfStatement).expression
                };

            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.ShorthandPropertyAssignment:
                return isArrayLiteralOrObjectLiteralDestructuringPattern(node.parent) ?
                    getContextNode(
                        findAncestor(node.parent, node =>
                            isBinaryExpression(node) || isForInOrOfStatement(node)
                        ) as BinaryExpression | ForInOrOfStatement
                    ) :
                    node;

            default:
                return node;
        }
    }

    export function toContextSpan(textSpan: TextSpan, sourceFile: SourceFile, context?: ContextNode): { contextSpan: TextSpan } | undefined {
        if (!context) return undefined;
        const contextSpan = isContextWithStartAndEndNode(context) ?
            getTextSpan(context.start, sourceFile, context.end) :
            getTextSpan(context, sourceFile);
        return contextSpan.start !== textSpan.start || contextSpan.length !== textSpan.length ?
            { contextSpan } :
            undefined;
    }

    export const enum FindReferencesUse {
        /**
         * When searching for references to a symbol, the location will not be adjusted (this is the default behavior when not specified).
         */
        Other,
        /**
         * When searching for references to a symbol, the location will be adjusted if the cursor was on a keyword.
         */
        References,
        /**
         * When searching for references to a symbol, the location will be adjusted if the cursor was on a keyword.
         * Unlike `References`, the location will only be adjusted keyword belonged to a declaration with a valid name.
         * If set, we will find fewer references -- if it is referenced by several different names, we still only find references for the original name.
         */
        Rename,
    }

    export interface Options {
        readonly findInStrings?: boolean;
        readonly findInComments?: boolean;
        readonly use?: FindReferencesUse;
        /** True if we are searching for implementations. We will have a different method of adding references if so. */
        readonly implementations?: boolean;
        /**
         * True to opt in for enhanced renaming of shorthand properties and import/export specifiers.
         * The options controls the behavior for the whole rename operation; it cannot be changed on a per-file basis.
         * Default is false for backwards compatibility.
         */
        readonly providePrefixAndSuffixTextForRename?: boolean;
    }

    export function findReferencedSymbols(program: Program, cancellationToken: CancellationToken, sourceFiles: readonly SourceFile[], sourceFile: SourceFile, position: number): ReferencedSymbol[] | undefined {
        const node = getTouchingPropertyName(sourceFile, position);
        const referencedSymbols = Core.getReferencedSymbolsForNode(position, node, program, sourceFiles, cancellationToken, { use: FindReferencesUse.References });
        const checker = program.getTypeChecker();
        return !referencedSymbols || !referencedSymbols.length ? undefined : mapDefined<SymbolAndEntries, ReferencedSymbol>(referencedSymbols, ({ definition, references }) =>
            // Only include referenced symbols that have a valid definition.
            definition && {
                definition: checker.runWithCancellationToken(cancellationToken, checker => definitionToReferencedSymbolDefinitionInfo(definition, checker, node)),
                references: references.map(toReferenceEntry)
            });
    }

    export function getImplementationsAtPosition(program: Program, cancellationToken: CancellationToken, sourceFiles: readonly SourceFile[], sourceFile: SourceFile, position: number): ImplementationLocation[] | undefined {
        const node = getTouchingPropertyName(sourceFile, position);
        let referenceEntries: Entry[] | undefined;
        const entries = getImplementationReferenceEntries(program, cancellationToken, sourceFiles, node, position);

        if (
            node.parent.kind === SyntaxKind.PropertyAccessExpression
            || node.parent.kind === SyntaxKind.BindingElement
            || node.parent.kind === SyntaxKind.ElementAccessExpression
            || node.kind === SyntaxKind.SuperKeyword
        ) {
            referenceEntries = entries && [...entries];
        }
        else {
            const queue = entries && [...entries];
            const seenNodes = new Map<string, true>();
            while (queue && queue.length) {
                const entry = queue.shift() as NodeEntry;
                if (!addToSeen(seenNodes, getNodeId(entry.node))) {
                    continue;
                }
                referenceEntries = append(referenceEntries, entry);
                const entries = getImplementationReferenceEntries(program, cancellationToken, sourceFiles, entry.node, entry.node.pos);
                if (entries) {
                    queue.push(...entries);
                }
            }
        }
        const checker = program.getTypeChecker();
        return map(referenceEntries, entry => toImplementationLocation(entry, checker));
    }

    function getImplementationReferenceEntries(program: Program, cancellationToken: CancellationToken, sourceFiles: readonly SourceFile[], node: Node, position: number): readonly Entry[] | undefined {
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
            const symbol = checker.getSymbolAtLocation(node)!;
            return symbol.valueDeclaration && [nodeEntry(symbol.valueDeclaration)];
        }
        else {
            // Perform "Find all References" and retrieve only those that are implementations
            return getReferenceEntriesForNode(position, node, program, sourceFiles, cancellationToken, { implementations: true, use: FindReferencesUse.References });
        }
    }

    export function findReferenceOrRenameEntries<T>(
        program: Program, cancellationToken: CancellationToken, sourceFiles: readonly SourceFile[], node: Node, position: number, options: Options | undefined,
        convertEntry: ToReferenceOrRenameEntry<T>,
    ): T[] | undefined {
        return map(flattenEntries(Core.getReferencedSymbolsForNode(position, node, program, sourceFiles, cancellationToken, options)), entry => convertEntry(entry, node, program.getTypeChecker()));
    }

    export type ToReferenceOrRenameEntry<T> = (entry: Entry, originalNode: Node, checker: TypeChecker) => T;

    export function getReferenceEntriesForNode(
        position: number,
        node: Node,
        program: Program,
        sourceFiles: readonly SourceFile[],
        cancellationToken: CancellationToken,
        options: Options = {},
        sourceFilesSet: ReadonlySet<string> = new Set(sourceFiles.map(f => f.fileName)),
    ): readonly Entry[] | undefined {
        return flattenEntries(Core.getReferencedSymbolsForNode(position, node, program, sourceFiles, cancellationToken, options, sourceFilesSet));
    }

    function flattenEntries(referenceSymbols: readonly SymbolAndEntries[] | undefined): readonly Entry[] | undefined {
        return referenceSymbols && flatMap(referenceSymbols, r => r.references);
    }

    function definitionToReferencedSymbolDefinitionInfo(def: Definition, checker: TypeChecker, originalNode: Node): ReferencedSymbolDefinitionInfo {
        const info = (() => {
            switch (def.type) {
                case DefinitionKind.Symbol: {
                    const { symbol } = def;
                    const { displayParts, kind } = getDefinitionKindAndDisplayParts(symbol, checker, originalNode);
                    const name = displayParts.map(p => p.text).join("");
                    const declaration = symbol.declarations ? first(symbol.declarations) : undefined;
                    return {
                        node: declaration ?
                            getNameOfDeclaration(declaration) || declaration :
                            originalNode,
                        name,
                        kind,
                        displayParts,
                        context: getContextNode(declaration)
                    };
                }
                case DefinitionKind.Label: {
                    const { node } = def;
                    return { node, name: node.text, kind: ScriptElementKind.label, displayParts: [displayPart(node.text, SymbolDisplayPartKind.text)] };
                }
                case DefinitionKind.Keyword: {
                    const { node } = def;
                    const name = tokenToString(node.kind)!;
                    return { node, name, kind: ScriptElementKind.keyword, displayParts: [{ text: name, kind: ScriptElementKind.keyword }] };
                }
                case DefinitionKind.This: {
                    const { node } = def;
                    const symbol = checker.getSymbolAtLocation(node);
                    const displayParts = symbol && SymbolDisplay.getSymbolDisplayPartsDocumentationAndSymbolKind(
                        checker, symbol, node.getSourceFile(), getContainerNode(node), node).displayParts || [textPart("this")];
                    return { node, name: "this", kind: ScriptElementKind.variableElement, displayParts };
                }
                case DefinitionKind.String: {
                    const { node } = def;
                    return { node, name: node.text, kind: ScriptElementKind.variableElement, displayParts: [displayPart(getTextOfNode(node), SymbolDisplayPartKind.stringLiteral)] };
                }
                default:
                    return Debug.assertNever(def);
            }
        })();

        const { node, name, kind, displayParts, context } = info;
        const sourceFile = node.getSourceFile();
        const textSpan = getTextSpan(isComputedPropertyName(node) ? node.expression : node, sourceFile);
        return {
            containerKind: ScriptElementKind.unknown,
            containerName: "",
            fileName: sourceFile.fileName,
            kind,
            name,
            textSpan,
            displayParts,
            ...toContextSpan(textSpan, sourceFile, context)
        };
    }

    function getDefinitionKindAndDisplayParts(symbol: Symbol, checker: TypeChecker, node: Node): { displayParts: SymbolDisplayPart[], kind: ScriptElementKind } {
        const meaning = Core.getIntersectingMeaningFromDeclarations(node, symbol);
        const enclosingDeclaration = symbol.declarations && firstOrUndefined(symbol.declarations) || node;
        const { displayParts, symbolKind } =
            SymbolDisplay.getSymbolDisplayPartsDocumentationAndSymbolKind(checker, symbol, enclosingDeclaration.getSourceFile(), enclosingDeclaration, enclosingDeclaration, meaning);
        return { displayParts, kind: symbolKind };
    }

    export function toRenameLocation(entry: Entry, originalNode: Node, checker: TypeChecker, providePrefixAndSuffixText: boolean): RenameLocation {
        return { ...entryToDocumentSpan(entry), ...(providePrefixAndSuffixText && getPrefixAndSuffixText(entry, originalNode, checker)) };
    }

    export function toReferenceEntry(entry: Entry): ReferenceEntry {
        const documentSpan = entryToDocumentSpan(entry);
        if (entry.kind === EntryKind.Span) {
            return { ...documentSpan, isWriteAccess: false, isDefinition: false };
        }
        const { kind, node } = entry;
        return {
            ...documentSpan,
            isWriteAccess: isWriteAccessForReference(node),
            isDefinition: isDefinitionForReference(node),
            isInString: kind === EntryKind.StringLiteral ? true : undefined,
        };
    }

    function entryToDocumentSpan(entry: Entry): DocumentSpan {
        if (entry.kind === EntryKind.Span) {
            return { textSpan: entry.textSpan, fileName: entry.fileName };
        }
        else {
            const sourceFile = entry.node.getSourceFile();
            const textSpan = getTextSpan(entry.node, sourceFile);
            return {
                textSpan,
                fileName: sourceFile.fileName,
                ...toContextSpan(textSpan, sourceFile, entry.context)
            };
        }
    }

    interface PrefixAndSuffix { readonly prefixText?: string; readonly suffixText?: string; }
    function getPrefixAndSuffixText(entry: Entry, originalNode: Node, checker: TypeChecker): PrefixAndSuffix {
        if (entry.kind !== EntryKind.Span && isIdentifier(originalNode)) {
            const { node, kind } = entry;
            const parent = node.parent;
            const name = originalNode.text;
            const isShorthandAssignment = isShorthandPropertyAssignment(parent);
            if (isShorthandAssignment || isObjectBindingElementWithoutPropertyName(parent) && parent.name === node) {
                const prefixColon: PrefixAndSuffix = { prefixText: name + ": " };
                const suffixColon: PrefixAndSuffix = { suffixText: ": " + name };
                if (kind === EntryKind.SearchedLocalFoundProperty) {
                    return prefixColon;
                }
                if (kind === EntryKind.SearchedPropertyFoundLocal) {
                    return suffixColon;
                }

                // In `const o = { x }; o.x`, symbolAtLocation at `x` in `{ x }` is the property symbol.
                // For a binding element `const { x } = o;`, symbolAtLocation at `x` is the property symbol.
                if (isShorthandAssignment) {
                    const grandParent = parent.parent;
                    if (isObjectLiteralExpression(grandParent) &&
                        isBinaryExpression(grandParent.parent) &&
                        isModuleExportsAccessExpression(grandParent.parent.left)) {
                        return prefixColon;
                    }
                    return suffixColon;
                }
                else {
                    return prefixColon;
                }
            }
            else if (isImportSpecifier(parent) && !parent.propertyName) {
                // If the original symbol was using this alias, just rename the alias.
                const originalSymbol = isExportSpecifier(originalNode.parent) ? checker.getExportSpecifierLocalTargetSymbol(originalNode.parent) : checker.getSymbolAtLocation(originalNode);
                return contains(originalSymbol!.declarations, parent) ? { prefixText: name + " as " } : emptyOptions;
            }
            else if (isExportSpecifier(parent) && !parent.propertyName) {
                // If the symbol for the node is same as declared node symbol use prefix text
                return originalNode === entry.node || checker.getSymbolAtLocation(originalNode) === checker.getSymbolAtLocation(entry.node) ?
                    { prefixText: name + " as " } :
                    { suffixText: " as " + name };
            }
        }

        return emptyOptions;
    }

    function toImplementationLocation(entry: Entry, checker: TypeChecker): ImplementationLocation {
        const documentSpan = entryToDocumentSpan(entry);
        if (entry.kind !== EntryKind.Span) {
            const { node } = entry;
            return {
                ...documentSpan,
                ...implementationKindDisplayParts(node, checker)
            };
        }
        else {
            return { ...documentSpan, kind: ScriptElementKind.unknown, displayParts: [] };
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
        const documentSpan = entryToDocumentSpan(entry);
        if (entry.kind === EntryKind.Span) {
            return {
                fileName: documentSpan.fileName,
                span: {
                    textSpan: documentSpan.textSpan,
                    kind: HighlightSpanKind.reference
                }
            };
        }

        const writeAccess = isWriteAccessForReference(entry.node);
        const span: HighlightSpan = {
            textSpan: documentSpan.textSpan,
            kind: writeAccess ? HighlightSpanKind.writtenReference : HighlightSpanKind.reference,
            isInString: entry.kind === EntryKind.StringLiteral ? true : undefined,
            ...documentSpan.contextSpan && { contextSpan: documentSpan.contextSpan }
        };
        return { fileName: documentSpan.fileName, span };
    }

    function getTextSpan(node: Node, sourceFile: SourceFile, endNode?: Node): TextSpan {
        let start = node.getStart(sourceFile);
        let end = (endNode || node).getEnd();
        if (isStringLiteralLike(node)) {
            Debug.assert(endNode === undefined);
            start += 1;
            end -= 1;
        }
        return createTextSpanFromBounds(start, end);
    }

    export function getTextSpanOfEntry(entry: Entry) {
        return entry.kind === EntryKind.Span ? entry.textSpan :
            getTextSpan(entry.node, entry.node.getSourceFile());
    }

    /** A node is considered a writeAccess iff it is a name of a declaration or a target of an assignment */
    function isWriteAccessForReference(node: Node): boolean {
        const decl = getDeclarationFromName(node);
        return !!decl && declarationIsWriteAccess(decl) || node.kind === SyntaxKind.DefaultKeyword || isWriteAccess(node);
    }

    function isDefinitionForReference(node: Node): boolean {
        return node.kind === SyntaxKind.DefaultKeyword
            || !!getDeclarationFromName(node)
            || isLiteralComputedPropertyDeclarationName(node)
            || (node.kind === SyntaxKind.ConstructorKeyword && isConstructorDeclaration(node.parent));
    }

    /**
     * True if 'decl' provides a value, as in `function f() {}`;
     * false if 'decl' is just a location for a future write, as in 'let x;'
     */
    function declarationIsWriteAccess(decl: Declaration): boolean {
        // Consider anything in an ambient declaration to be a write access since it may be coming from JS.
        if (!!(decl.flags & NodeFlags.Ambient)) return true;

        switch (decl.kind) {
            case SyntaxKind.BinaryExpression:
            case SyntaxKind.BindingElement:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ClassExpression:
            case SyntaxKind.DefaultKeyword:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.EnumMember:
            case SyntaxKind.ExportSpecifier:
            case SyntaxKind.ImportClause: // default import
            case SyntaxKind.ImportEqualsDeclaration:
            case SyntaxKind.ImportSpecifier:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.JSDocCallbackTag:
            case SyntaxKind.JSDocTypedefTag:
            case SyntaxKind.JsxAttribute:
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.NamespaceExportDeclaration:
            case SyntaxKind.NamespaceImport:
            case SyntaxKind.NamespaceExport:
            case SyntaxKind.Parameter:
            case SyntaxKind.ShorthandPropertyAssignment:
            case SyntaxKind.TypeAliasDeclaration:
            case SyntaxKind.TypeParameter:
                return true;

            case SyntaxKind.PropertyAssignment:
                // In `({ x: y } = 0);`, `x` is not a write access. (Won't call this function for `y`.)
                return !isArrayLiteralOrObjectLiteralDestructuringPattern((decl as PropertyAssignment).parent);

            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.Constructor:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
                return !!(decl as FunctionDeclaration | FunctionExpression | ConstructorDeclaration | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration).body;

            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.PropertyDeclaration:
                return !!(decl as VariableDeclaration | PropertyDeclaration).initializer || isCatchClause(decl.parent);

            case SyntaxKind.MethodSignature:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.JSDocPropertyTag:
            case SyntaxKind.JSDocParameterTag:
                return false;

            default:
                return Debug.failBadSyntaxKind(decl);
        }
    }

    /** Encapsulates the core find-all-references algorithm. */
    export namespace Core {
        /** Core find-all-references algorithm. Handles special cases before delegating to `getReferencedSymbolsForSymbol`. */
        export function getReferencedSymbolsForNode(position: number, node: Node, program: Program, sourceFiles: readonly SourceFile[], cancellationToken: CancellationToken, options: Options = {}, sourceFilesSet: ReadonlySet<string> = new Set(sourceFiles.map(f => f.fileName))): readonly SymbolAndEntries[] | undefined {
            if (options.use === FindReferencesUse.References) {
                node = getAdjustedReferenceLocation(node);
            }
            else if (options.use === FindReferencesUse.Rename) {
                node = getAdjustedRenameLocation(node);
            }
            if (isSourceFile(node)) {
                const reference = GoToDefinition.getReferenceAtPosition(node, position, program);
                const moduleSymbol = reference && program.getTypeChecker().getMergedSymbol(reference.file.symbol);
                return moduleSymbol && getReferencedSymbolsForModule(program, moduleSymbol, /*excludeImportTypeOfExportEquals*/ false, sourceFiles, sourceFilesSet);
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

            if (symbol.escapedName === InternalSymbolName.ExportEquals) {
                return getReferencedSymbolsForModule(program, symbol.parent!, /*excludeImportTypeOfExportEquals*/ false, sourceFiles, sourceFilesSet);
            }

            const moduleReferences = getReferencedSymbolsForModuleIfDeclaredBySourceFile(symbol, program, sourceFiles, cancellationToken, options, sourceFilesSet);
            if (moduleReferences && !(symbol.flags & SymbolFlags.Transient)) {
                return moduleReferences;
            }

            const aliasedSymbol = getMergedAliasedSymbolOfNamespaceExportDeclaration(node, symbol, checker);
            const moduleReferencesOfExportTarget = aliasedSymbol &&
                getReferencedSymbolsForModuleIfDeclaredBySourceFile(aliasedSymbol, program, sourceFiles, cancellationToken, options, sourceFilesSet);

            const references = getReferencedSymbolsForSymbol(symbol, node, sourceFiles, sourceFilesSet, checker, cancellationToken, options);
            return mergeReferences(program, moduleReferences, references, moduleReferencesOfExportTarget);
        }

        function getMergedAliasedSymbolOfNamespaceExportDeclaration(node: Node, symbol: Symbol, checker: TypeChecker) {
            if (node.parent && isNamespaceExportDeclaration(node.parent)) {
                const aliasedSymbol = checker.getAliasedSymbol(symbol);
                const targetSymbol = checker.getMergedSymbol(aliasedSymbol);
                if (aliasedSymbol !== targetSymbol) {
                    return targetSymbol;
                }
            }
            return undefined;
        }

        function getReferencedSymbolsForModuleIfDeclaredBySourceFile(symbol: Symbol, program: Program, sourceFiles: readonly SourceFile[], cancellationToken: CancellationToken, options: Options, sourceFilesSet: ReadonlySet<string>) {
            const moduleSourceFile = (symbol.flags & SymbolFlags.Module) && symbol.declarations && find(symbol.declarations, isSourceFile);
            if (!moduleSourceFile) return undefined;
            const exportEquals = symbol.exports!.get(InternalSymbolName.ExportEquals);
            // If !!exportEquals, we're about to add references to `import("mod")` anyway, so don't double-count them.
            const moduleReferences = getReferencedSymbolsForModule(program, symbol, !!exportEquals, sourceFiles, sourceFilesSet);
            if (!exportEquals || !sourceFilesSet.has(moduleSourceFile.fileName)) return moduleReferences;
            // Continue to get references to 'export ='.
            const checker = program.getTypeChecker();
            symbol = skipAlias(exportEquals, checker);
            return mergeReferences(program, moduleReferences, getReferencedSymbolsForSymbol(symbol, /*node*/ undefined, sourceFiles, sourceFilesSet, checker, cancellationToken, options));
        }

        /**
         * Merges the references by sorting them (by file index in sourceFiles and their location in it) that point to same definition symbol
         */
        function mergeReferences(program: Program, ...referencesToMerge: (SymbolAndEntries[] | undefined)[]): SymbolAndEntries[] | undefined {
            let result: SymbolAndEntries[] | undefined;
            for (const references of referencesToMerge) {
                if (!references || !references.length) continue;
                if (!result) {
                    result = references;
                    continue;
                }
                for (const entry of references) {
                    if (!entry.definition || entry.definition.type !== DefinitionKind.Symbol) {
                        result.push(entry);
                        continue;
                    }
                    const symbol = entry.definition.symbol;
                    const refIndex = findIndex(result, ref => !!ref.definition &&
                        ref.definition.type === DefinitionKind.Symbol &&
                        ref.definition.symbol === symbol);
                    if (refIndex === -1) {
                        result.push(entry);
                        continue;
                    }

                    const reference = result[refIndex];
                    result[refIndex] = {
                        definition: reference.definition,
                        references: reference.references.concat(entry.references).sort((entry1, entry2) => {
                            const entry1File = getSourceFileIndexOfEntry(program, entry1);
                            const entry2File = getSourceFileIndexOfEntry(program, entry2);
                            if (entry1File !== entry2File) {
                                return compareValues(entry1File, entry2File);
                            }

                            const entry1Span = getTextSpanOfEntry(entry1);
                            const entry2Span = getTextSpanOfEntry(entry2);
                            return entry1Span.start !== entry2Span.start ?
                                compareValues(entry1Span.start, entry2Span.start) :
                                compareValues(entry1Span.length, entry2Span.length);
                        })
                    };
                }
            }
            return result;
        }

        function getSourceFileIndexOfEntry(program: Program, entry: Entry) {
            const sourceFile = entry.kind === EntryKind.Span ?
                program.getSourceFile(entry.fileName)! :
                entry.node.getSourceFile();
            return program.getSourceFiles().indexOf(sourceFile);
        }

        function getReferencedSymbolsForModule(program: Program, symbol: Symbol, excludeImportTypeOfExportEquals: boolean, sourceFiles: readonly SourceFile[], sourceFilesSet: ReadonlySet<string>): SymbolAndEntries[] {
            Debug.assert(!!symbol.valueDeclaration);

            const references = mapDefined<ModuleReference, Entry>(findModuleReferences(program, sourceFiles, symbol), reference => {
                if (reference.kind === "import") {
                    const parent = reference.literal.parent;
                    if (isLiteralTypeNode(parent)) {
                        const importType = cast(parent.parent, isImportTypeNode);
                        if (excludeImportTypeOfExportEquals && !importType.qualifier) {
                            return undefined;
                        }
                    }
                    // import("foo") with no qualifier will reference the `export =` of the module, which may be referenced anyway.
                    return nodeEntry(reference.literal);
                }
                else {
                    return {
                        kind: EntryKind.Span,
                        fileName: reference.referencingFile.fileName,
                        textSpan: createTextSpanFromRange(reference.ref),
                    };
                }
            });

            if (symbol.declarations) {
                for (const decl of symbol.declarations) {
                    switch (decl.kind) {
                        case SyntaxKind.SourceFile:
                            // Don't include the source file itself. (This may not be ideal behavior, but awkward to include an entire file as a reference.)
                            break;
                        case SyntaxKind.ModuleDeclaration:
                            if (sourceFilesSet.has(decl.getSourceFile().fileName)) {
                                references.push(nodeEntry((decl as ModuleDeclaration).name));
                            }
                            break;
                        default:
                            // This may be merged with something.
                            Debug.assert(!!(symbol.flags & SymbolFlags.Transient), "Expected a module symbol to be declared by a SourceFile or ModuleDeclaration.");
                    }
                }
            }

            const exported = symbol.exports!.get(InternalSymbolName.ExportEquals);
            if (exported) {
                for (const decl of exported.declarations) {
                    const sourceFile = decl.getSourceFile();
                    if (sourceFilesSet.has(sourceFile.fileName)) {
                        // At `module.exports = ...`, reference node is `module`
                        const node = isBinaryExpression(decl) && isPropertyAccessExpression(decl.left) ? decl.left.expression :
                            isExportAssignment(decl) ? Debug.checkDefined(findChildOfKind(decl, SyntaxKind.ExportKeyword, sourceFile)) :
                            getNameOfDeclaration(decl) || decl;
                        references.push(nodeEntry(node));
                    }
                }
            }

            return references.length ? [{ definition: { type: DefinitionKind.Symbol, symbol }, references }] : emptyArray;
        }

        /** As in a `readonly prop: any` or `constructor(readonly prop: any)`, not a `readonly any[]`. */
        function isReadonlyTypeOperator(node: Node): boolean {
            return node.kind === SyntaxKind.ReadonlyKeyword
                && isTypeOperatorNode(node.parent)
                && node.parent.operator === SyntaxKind.ReadonlyKeyword;
        }

        /** getReferencedSymbols for special node kinds. */
        function getReferencedSymbolsSpecial(node: Node, sourceFiles: readonly SourceFile[], cancellationToken: CancellationToken): SymbolAndEntries[] | undefined {
            if (isTypeKeyword(node.kind)) {
                // A void expression (i.e., `void foo()`) is not special, but the `void` type is.
                if (node.kind === SyntaxKind.VoidKeyword && isVoidExpression(node.parent)) {
                    return undefined;
                }

                // A modifier readonly (like on a property declaration) is not special;
                // a readonly type keyword (like `readonly string[]`) is.
                if (node.kind === SyntaxKind.ReadonlyKeyword && !isReadonlyTypeOperator(node)) {
                    return undefined;
                }
                // Likewise, when we *are* looking for a special keyword, make sure we
                // *don’t* include readonly member modifiers.
                return getAllReferencesForKeyword(
                    sourceFiles,
                    node.kind,
                    cancellationToken,
                    node.kind === SyntaxKind.ReadonlyKeyword ? isReadonlyTypeOperator : undefined);
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
        function getReferencedSymbolsForSymbol(originalSymbol: Symbol, node: Node | undefined, sourceFiles: readonly SourceFile[], sourceFilesSet: ReadonlySet<string>, checker: TypeChecker, cancellationToken: CancellationToken, options: Options): SymbolAndEntries[] {
            const symbol = node && skipPastExportOrImportSpecifierOrUnion(originalSymbol, node, checker, /*useLocalSymbolForExportSpecifier*/ !isForRenameWithPrefixAndSuffixText(options)) || originalSymbol;

            // Compute the meaning from the location and the symbol it references
            const searchMeaning = node ? getIntersectingMeaningFromDeclarations(node, symbol) : SemanticMeaning.All;
            const result: SymbolAndEntries[] = [];
            const state = new State(sourceFiles, sourceFilesSet, node ? getSpecialSearchKind(node) : SpecialSearchKind.None, checker, cancellationToken, searchMeaning, options, result);

            const exportSpecifier = !isForRenameWithPrefixAndSuffixText(options) ? undefined : find(symbol.declarations, isExportSpecifier);
            if (exportSpecifier) {
                // When renaming at an export specifier, rename the export and not the thing being exported.
                getReferencesAtExportSpecifier(exportSpecifier.name, symbol, exportSpecifier, state.createSearch(node, originalSymbol, /*comingFrom*/ undefined), state, /*addReferencesHere*/ true, /*alwaysGetReferences*/ true);
            }
            else if (node && node.kind === SyntaxKind.DefaultKeyword) {
                addReference(node, symbol, state);
                searchForImportsOfExport(node, symbol, { exportingModuleSymbol: Debug.checkDefined(symbol.parent, "Expected export symbol to have a parent"), exportKind: ExportKind.Default }, state);
            }
            else {
                const search = state.createSearch(node, symbol, /*comingFrom*/ undefined, { allSearchSymbols: node ? populateSearchSymbolSet(symbol, node, checker, options.use === FindReferencesUse.Rename, !!options.providePrefixAndSuffixTextForRename, !!options.implementations) : [symbol] });
                getReferencesInContainerOrFiles(symbol, state, search);
            }

            return result;
        }

        function getReferencesInContainerOrFiles(symbol: Symbol, state: State, search: Search): void {
            // Try to get the smallest valid scope that we can limit our search to;
            // otherwise we'll need to search globally (i.e. include each file).
            const scope = getSymbolScope(symbol);
            if (scope) {
                getReferencesInContainer(scope, scope.getSourceFile(), search, state, /*addReferencesHere*/ !(isSourceFile(scope) && !contains(state.sourceFiles, scope)));
            }
            else {
                // Global search
                for (const sourceFile of state.sourceFiles) {
                    state.cancellationToken.throwIfCancellationRequested();
                    searchForName(sourceFile, search, state);
                }
            }
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
        function skipPastExportOrImportSpecifierOrUnion(symbol: Symbol, node: Node, checker: TypeChecker, useLocalSymbolForExportSpecifier: boolean): Symbol | undefined {
            const { parent } = node;
            if (isExportSpecifier(parent) && useLocalSymbolForExportSpecifier) {
                return getLocalSymbolForExportSpecifier(node as Identifier, symbol, parent, checker);
            }
            // If the symbol is declared as part of a declaration like `{ type: "a" } | { type: "b" }`, use the property on the union type to get more references.
            return firstDefined(symbol.declarations, decl => {
                if (!decl.parent) {
                    // Ignore UMD module and global merge
                    if (symbol.flags & SymbolFlags.Transient) return undefined;
                    // Assertions for GH#21814. We should be handling SourceFile symbols in `getReferencedSymbolsForModule` instead of getting here.
                    Debug.fail(`Unexpected symbol at ${Debug.formatSyntaxKind(node.kind)}: ${Debug.formatSymbol(symbol)}`);
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
            readonly parents: readonly Symbol[] | undefined;
            readonly allSearchSymbols: readonly Symbol[];

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

        function getNonModuleSymbolOfMergedModuleSymbol(symbol: Symbol) {
            if (!(symbol.flags & (SymbolFlags.Module | SymbolFlags.Transient))) return undefined;
            const decl = symbol.declarations && find(symbol.declarations, d => !isSourceFile(d) && !isModuleDeclaration(d));
            return decl && decl.symbol;
        }

        /**
         * Holds all state needed for the finding references.
         * Unlike `Search`, there is only one `State`.
         */
        class State {
            /** Cache for `explicitlyinheritsFrom`. */
            readonly inheritsFromCache = new Map<string, boolean>();

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

            constructor(
                readonly sourceFiles: readonly SourceFile[],
                readonly sourceFilesSet: ReadonlySet<string>,
                readonly specialSearchKind: SpecialSearchKind,
                readonly checker: TypeChecker,
                readonly cancellationToken: CancellationToken,
                readonly searchMeaning: SemanticMeaning,
                readonly options: Options,
                private readonly result: Push<SymbolAndEntries>) {
            }

            includesSourceFile(sourceFile: SourceFile): boolean {
                return this.sourceFilesSet.has(sourceFile.fileName);
            }

            private importTracker: ImportTracker | undefined;
            /** Gets every place to look for references of an exported symbols. See `ImportsResult` in `importTracker.ts` for more documentation. */
            getImportSearches(exportSymbol: Symbol, exportInfo: ExportInfo): ImportsResult {
                if (!this.importTracker) this.importTracker = createImportTracker(this.sourceFiles, this.sourceFilesSet, this.checker, this.cancellationToken);
                return this.importTracker(exportSymbol, exportInfo, this.options.use === FindReferencesUse.Rename);
            }

            /** @param allSearchSymbols set of additional symbols for use by `includes`. */
            createSearch(location: Node | undefined, symbol: Symbol, comingFrom: ImportExport | undefined, searchOptions: { text?: string, allSearchSymbols?: Symbol[] } = {}): Search {
                // Note: if this is an external module symbol, the name doesn't include quotes.
                // Note: getLocalSymbolForExportDefault handles `export default class C {}`, but not `export default C` or `export { C as default }`.
                // The other two forms seem to be handled downstream (e.g. in `skipPastExportOrImportSpecifier`), so special-casing the first form
                // here appears to be intentional).
                const {
                    text = stripQuotes(symbolName(getLocalSymbolForExportDefault(symbol) || getNonModuleSymbolOfMergedModuleSymbol(symbol) || symbol)),
                    allSearchSymbols = [symbol],
                } = searchOptions;
                const escapedText = escapeLeadingUnderscores(text);
                const parents = this.options.implementations && location ? getParentSymbolsOfPropertyAccess(location, symbol, this.checker) : undefined;
                return { symbol, comingFrom, text, escapedText, parents, allSearchSymbols, includes: sym => contains(allSearchSymbols, sym) };
            }

            private readonly symbolIdToReferences: Entry[][] = [];
            /**
             * Callback to add references for a particular searched symbol.
             * This initializes a reference group, so only call this if you will add at least one reference.
             */
            referenceAdder(searchSymbol: Symbol): (node: Node, kind?: NodeEntryKind) => void {
                const symbolId = getSymbolId(searchSymbol);
                let references = this.symbolIdToReferences[symbolId];
                if (!references) {
                    references = this.symbolIdToReferences[symbolId] = [];
                    this.result.push({ definition: { type: DefinitionKind.Symbol, symbol: searchSymbol }, references });
                }
                return (node, kind) => references.push(nodeEntry(node, kind));
            }

            /** Add a reference with no associated definition. */
            addStringOrCommentReference(fileName: string, textSpan: TextSpan): void {
                this.result.push({
                    definition: undefined,
                    references: [{ kind: EntryKind.Span, fileName, textSpan }]
                });
            }

            // Source file ID → symbol ID → Whether the symbol has been searched for in the source file.
            private readonly sourceFileToSeenSymbols: Set<number>[] = [];
            /** Returns `true` the first time we search for a symbol in a file and `false` afterwards. */
            markSearchedSymbols(sourceFile: SourceFile, symbols: readonly Symbol[]): boolean {
                const sourceId = getNodeId(sourceFile);
                const seenSymbols = this.sourceFileToSeenSymbols[sourceId] || (this.sourceFileToSeenSymbols[sourceId] = new Set<number>());

                let anyNewSymbols = false;
                for (const sym of symbols) {
                    anyNewSymbols = tryAddToSet(seenSymbols, getSymbolId(sym)) || anyNewSymbols;
                }
                return anyNewSymbols;
            }
        }

        /** Search for all imports of a given exported symbol using `State.getImportSearches`. */
        function searchForImportsOfExport(exportLocation: Node, exportSymbol: Symbol, exportInfo: ExportInfo, state: State): void {
            const { importSearches, singleReferences, indirectUsers } = state.getImportSearches(exportSymbol, exportInfo);

            // For `import { foo as bar }` just add the reference to `foo`, and don't otherwise search in the file.
            if (singleReferences.length) {
                const addRef = state.referenceAdder(exportSymbol);
                for (const singleRef of singleReferences) {
                    if (shouldAddSingleReference(singleRef, state)) addRef(singleRef);
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
                        indirectSearch = state.options.use === FindReferencesUse.Rename ? undefined : state.createSearch(exportLocation, exportSymbol, ImportExport.Export, { text: "default" });
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

        export function eachExportReference(
            sourceFiles: readonly SourceFile[],
            checker: TypeChecker,
            cancellationToken: CancellationToken | undefined,
            exportSymbol: Symbol,
            exportingModuleSymbol: Symbol,
            exportName: string,
            isDefaultExport: boolean,
            cb: (ref: Identifier) => void,
        ): void {
            const importTracker = createImportTracker(sourceFiles, new Set(sourceFiles.map(f => f.fileName)), checker, cancellationToken);
            const { importSearches, indirectUsers } = importTracker(exportSymbol, { exportKind: isDefaultExport ? ExportKind.Default : ExportKind.Named, exportingModuleSymbol }, /*isForRename*/ false);
            for (const [importLocation] of importSearches) {
                cb(importLocation);
            }
            for (const indirectUser of indirectUsers) {
                for (const node of getPossibleSymbolReferenceNodes(indirectUser, isDefaultExport ? "default" : exportName)) {
                    // Import specifiers should be handled by importSearches
                    if (isIdentifier(node) && !isImportOrExportSpecifier(node.parent) && checker.getSymbolAtLocation(node) === exportSymbol) {
                        cb(node);
                    }
                }
            }
        }

        function shouldAddSingleReference(singleRef: Identifier | StringLiteral, state: State): boolean {
            if (!hasMatchingMeaning(singleRef, state)) return false;
            if (state.options.use !== FindReferencesUse.Rename) return true;
            // Don't rename an import type `import("./module-name")` when renaming `name` in `export = name;`
            if (!isIdentifier(singleRef)) return false;
            // At `default` in `import { default as x }` or `export { default as x }`, do add a reference, but do not rename.
            return !(isImportOrExportSpecifier(singleRef.parent) && singleRef.escapedText === InternalSymbolName.Default);
        }

        // Go to the symbol we imported from and find references for it.
        function searchForImportedSymbol(symbol: Symbol, state: State): void {
            if (!symbol.declarations) return;

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
            return isArrayLiteralOrObjectLiteralDestructuringPattern(location.parent.parent)
                ? checker.getPropertySymbolOfDestructuringAssignment(<Identifier>location)
                : undefined;
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
                const privateDeclaration = find(declarations, d => hasEffectiveModifier(d, ModifierFlags.Private) || isPrivateIdentifierPropertyDeclaration(d));
                if (privateDeclaration) {
                    return getAncestor(privateDeclaration, SyntaxKind.ClassDeclaration);
                }
                // Else this is a public property and could be accessed from anywhere.
                return undefined;
            }

            // If symbol is of object binding pattern element without property name we would want to
            // look for property too and that could be anywhere
            if (declarations.some(isObjectBindingElementWithoutPropertyName)) {
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
            if (exposedByParent && !(isExternalModuleSymbol(parent!) && !parent!.globalExports)) {
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
            return exposedByParent ? scope!.getSourceFile() : scope; // TODO: GH#18217
        }

        /** Used as a quick check for whether a symbol is used at all in a file (besides its definition). */
        export function isSymbolReferencedInFile(definition: Identifier, checker: TypeChecker, sourceFile: SourceFile, searchContainer: Node = sourceFile): boolean {
            return eachSymbolReferenceInFile(definition, checker, sourceFile, () => true, searchContainer) || false;
        }

        export function eachSymbolReferenceInFile<T>(definition: Identifier, checker: TypeChecker, sourceFile: SourceFile, cb: (token: Identifier) => T, searchContainer: Node = sourceFile): T | undefined {
            const symbol = isParameterPropertyDeclaration(definition.parent, definition.parent.parent)
                ? first(checker.getSymbolsOfParameterPropertyDeclaration(definition.parent, definition.text))
                : checker.getSymbolAtLocation(definition);
            if (!symbol) return undefined;
            for (const token of getPossibleSymbolReferenceNodes(sourceFile, symbol.name, searchContainer)) {
                if (!isIdentifier(token) || token === definition || token.escapedText !== definition.escapedText) continue;
                const referenceSymbol: Symbol = checker.getSymbolAtLocation(token)!; // See GH#19955 for why the type annotation is necessary
                if (referenceSymbol === symbol
                    || checker.getShorthandAssignmentValueSymbol(token.parent) === symbol
                    || isExportSpecifier(token.parent) && getLocalSymbolForExportSpecifier(token, referenceSymbol, token.parent, checker) === symbol) {
                    const res = cb(token);
                    if (res) return res;
                }
            }
        }

        export function eachSignatureCall(signature: SignatureDeclaration, sourceFiles: readonly SourceFile[], checker: TypeChecker, cb: (call: CallExpression) => void): void {
            if (!signature.name || !isIdentifier(signature.name)) return;

            const symbol = Debug.checkDefined(checker.getSymbolAtLocation(signature.name));

            for (const sourceFile of sourceFiles) {
                for (const name of getPossibleSymbolReferenceNodes(sourceFile, symbol.name)) {
                    if (!isIdentifier(name) || name === signature.name || name.escapedText !== signature.name.escapedText) continue;
                    const called = climbPastPropertyAccess(name);
                    const call = called.parent;
                    if (!isCallExpression(call) || call.expression !== called) continue;
                    const referenceSymbol = checker.getSymbolAtLocation(name);
                    if (referenceSymbol && checker.getRootSymbols(referenceSymbol).some(s => s === symbol)) {
                        cb(call);
                    }
                }
            }
        }

        function getPossibleSymbolReferenceNodes(sourceFile: SourceFile, symbolName: string, container: Node = sourceFile): readonly Node[] {
            return getPossibleSymbolReferencePositions(sourceFile, symbolName, container).map(pos => getTouchingPropertyName(sourceFile, pos));
        }

        function getPossibleSymbolReferencePositions(sourceFile: SourceFile, symbolName: string, container: Node = sourceFile): readonly number[] {
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
            const references = mapDefined(getPossibleSymbolReferenceNodes(sourceFile, labelName, container), node =>
                // Only pick labels that are either the target label, or have a target that is the target label
                node === targetLabel || (isJumpStatementTarget(node) && getTargetLabel(node, labelName) === targetLabel) ? nodeEntry(node) : undefined);
            return [{ definition: { type: DefinitionKind.Label, node: targetLabel }, references }];
        }

        function isValidReferencePosition(node: Node, searchSymbolName: string): boolean {
            // Compare the length so we filter out strict superstrings of the symbol we are looking for
            switch (node.kind) {
                case SyntaxKind.PrivateIdentifier:
                case SyntaxKind.Identifier:
                    return (node as PrivateIdentifier | Identifier).text.length === searchSymbolName.length;
                case SyntaxKind.NoSubstitutionTemplateLiteral:
                case SyntaxKind.StringLiteral: {
                    const str = node as StringLiteralLike;
                    return (isLiteralNameOfPropertyDeclarationOrIndexAccess(str) || isNameOfModuleDeclaration(node) || isExpressionOfExternalModuleImportEqualsDeclaration(node) || (isCallExpression(node.parent) && isBindableObjectDefinePropertyCall(node.parent) && node.parent.arguments[1] === node)) &&
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

        function getAllReferencesForKeyword(sourceFiles: readonly SourceFile[], keywordKind: SyntaxKind, cancellationToken: CancellationToken, filter?: (node: Node) => boolean): SymbolAndEntries[] | undefined {
            const references = flatMap(sourceFiles, sourceFile => {
                cancellationToken.throwIfCancellationRequested();
                return mapDefined(getPossibleSymbolReferenceNodes(sourceFile, tokenToString(keywordKind)!, sourceFile), referenceLocation => {
                    if (referenceLocation.kind === keywordKind && (!filter || filter(referenceLocation))) {
                        return nodeEntry(referenceLocation);
                    }
                });
            });
            return references.length ? [{ definition: { type: DefinitionKind.Keyword, node: references[0].node }, references }] : undefined;
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
            if (!state.markSearchedSymbols(sourceFile, search.allSearchSymbols)) {
                return;
            }

            for (const position of getPossibleSymbolReferencePositions(sourceFile, search.text, container)) {
                getReferencesAtLocation(sourceFile, position, search, state, addReferencesHere);
            }
        }

        function hasMatchingMeaning(referenceLocation: Node, state: State): boolean {
            return !!(getMeaningFromLocation(referenceLocation) & state.searchMeaning);
        }

        function getReferencesAtLocation(sourceFile: SourceFile, position: number, search: Search, state: State, addReferencesHere: boolean): void {
            const referenceLocation = getTouchingPropertyName(sourceFile, position);

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

            if (!hasMatchingMeaning(referenceLocation, state)) return;

            const referenceSymbol = state.checker.getSymbolAtLocation(referenceLocation);
            if (!referenceSymbol) {
                return;
            }

            const parent = referenceLocation.parent;
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

        function getReferencesAtExportSpecifier(
            referenceLocation: Identifier,
            referenceSymbol: Symbol,
            exportSpecifier: ExportSpecifier,
            search: Search,
            state: State,
            addReferencesHere: boolean,
            alwaysGetReferences?: boolean,
        ): void {
            Debug.assert(!alwaysGetReferences || !!state.options.providePrefixAndSuffixTextForRename, "If alwaysGetReferences is true, then prefix/suffix text must be enabled");

            const { parent, propertyName, name } = exportSpecifier;
            const exportDeclaration = parent.parent;
            const localSymbol = getLocalSymbolForExportSpecifier(referenceLocation, referenceSymbol, exportSpecifier, state.checker);
            if (!alwaysGetReferences && !search.includes(localSymbol)) {
                return;
            }

            if (!propertyName) {
                // Don't rename at `export { default } from "m";`. (but do continue to search for imports of the re-export)
                if (!(state.options.use === FindReferencesUse.Rename && (name.escapedText === InternalSymbolName.Default))) {
                    addRef();
                }
            }
            else if (referenceLocation === propertyName) {
                // For `export { foo as bar } from "baz"`, "`foo`" will be added from the singleReferences for import searches of the original export.
                // For `export { foo as bar };`, where `foo` is a local, so add it now.
                if (!exportDeclaration.moduleSpecifier) {
                    addRef();
                }

                if (addReferencesHere && state.options.use !== FindReferencesUse.Rename && state.markSeenReExportRHS(name)) {
                    addReference(name, Debug.checkDefined(exportSpecifier.symbol), state);
                }
            }
            else {
                if (state.markSeenReExportRHS(referenceLocation)) {
                    addRef();
                }
            }

            // For `export { foo as bar }`, rename `foo`, but not `bar`.
            if (!isForRenameWithPrefixAndSuffixText(state.options) || alwaysGetReferences) {
                const isDefaultExport = referenceLocation.originalKeywordKind === SyntaxKind.DefaultKeyword
                    || exportSpecifier.name.originalKeywordKind === SyntaxKind.DefaultKeyword;
                const exportKind = isDefaultExport ? ExportKind.Default : ExportKind.Named;
                const exportSymbol = Debug.checkDefined(exportSpecifier.symbol);
                const exportInfo = getExportInfo(exportSymbol, exportKind, state.checker);
                if (exportInfo) {
                    searchForImportsOfExport(referenceLocation, exportSymbol, exportInfo, state);
                }
            }

            // At `export { x } from "foo"`, also search for the imported symbol `"foo".x`.
            if (search.comingFrom !== ImportExport.Export && exportDeclaration.moduleSpecifier && !propertyName && !isForRenameWithPrefixAndSuffixText(state.options)) {
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
                if (!(isForRenameWithPrefixAndSuffixText(state.options))) {
                    searchForImportedSymbol(symbol, state);
                }
            }
            else {
                searchForImportsOfExport(referenceLocation, symbol, importOrExport.exportInfo, state);
            }
        }

        function getReferenceForShorthandProperty({ flags, valueDeclaration }: Symbol, search: Search, state: State): void {
            const shorthandValueSymbol = state.checker.getShorthandAssignmentValueSymbol(valueDeclaration)!;
            const name = valueDeclaration && getNameOfDeclaration(valueDeclaration);
            /*
            * Because in short-hand property assignment, an identifier which stored as name of the short-hand property assignment
            * has two meanings: property name and property value. Therefore when we do findAllReference at the position where
            * an identifier is declared, the language service should return the position of the variable declaration as well as
            * the position in short-hand property assignment excluding property accessing. However, if we do findAllReference at the
            * position of property accessing, the referenceEntry of such position will be handled in the first case.
            */
            if (!(flags & SymbolFlags.Transient) && name && search.includes(shorthandValueSymbol)) {
                addReference(name, shorthandValueSymbol, state);
            }
        }

        function addReference(referenceLocation: Node, relatedSymbol: Symbol | RelatedSymbol, state: State): void {
            const { kind, symbol } = "kind" in relatedSymbol ? relatedSymbol : { kind: undefined, symbol: relatedSymbol }; // eslint-disable-line no-in-operator
            const addRef = state.referenceAdder(symbol);
            if (state.options.implementations) {
                addImplementationReferences(referenceLocation, addRef, state);
            }
            else {
                addRef(referenceLocation, kind);
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
                    findInheritedConstructorReferences(classExtending, state);
                }
            }
        }

        function addClassStaticThisReferences(referenceLocation: Node, search: Search, state: State): void {
            addReference(referenceLocation, search.symbol, state);
            const classLike = referenceLocation.parent;
            if (state.options.use === FindReferencesUse.Rename || !isClassLike(classLike)) return;
            Debug.assert(classLike.name === referenceLocation);
            const addRef = state.referenceAdder(search.symbol);
            for (const member of classLike.members) {
                if (!(isMethodOrAccessor(member) && hasSyntacticModifier(member, ModifierFlags.Static))) {
                    continue;
                }
                if (member.body) {
                    member.body.forEachChild(function cb(node) {
                        if (node.kind === SyntaxKind.ThisKeyword) {
                            addRef(node);
                        }
                        else if (!isFunctionLike(node) && !isClassLike(node)) {
                            node.forEachChild(cb);
                        }
                    });
                }
            }
        }

        /**
         * `classSymbol` is the class where the constructor was defined.
         * Reference the constructor and all calls to `new this()`.
         */
        function findOwnConstructorReferences(classSymbol: Symbol, sourceFile: SourceFile, addNode: (node: Node) => void): void {
            const constructorSymbol = getClassConstructorSymbol(classSymbol);
            if (constructorSymbol && constructorSymbol.declarations) {
                for (const decl of constructorSymbol.declarations) {
                    const ctrKeyword = findChildOfKind(decl, SyntaxKind.ConstructorKeyword, sourceFile)!;
                    Debug.assert(decl.kind === SyntaxKind.Constructor && !!ctrKeyword);
                    addNode(ctrKeyword);
                }
            }

            if (classSymbol.exports) {
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
        }

        function getClassConstructorSymbol(classSymbol: Symbol): Symbol | undefined {
            return classSymbol.members && classSymbol.members.get(InternalSymbolName.Constructor);
        }

        /** Find references to `super` in the constructor of an extending class.  */
        function findSuperConstructorAccesses(classDeclaration: ClassLikeDeclaration, addNode: (node: Node) => void): void {
            const constructor = getClassConstructorSymbol(classDeclaration.symbol);
            if (!(constructor && constructor.declarations)) {
                return;
            }

            for (const decl of constructor.declarations) {
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

        function hasOwnConstructor(classDeclaration: ClassLikeDeclaration): boolean {
            return !!getClassConstructorSymbol(classDeclaration.symbol);
        }

        function findInheritedConstructorReferences(classDeclaration: ClassLikeDeclaration, state: State): void {
            if (hasOwnConstructor(classDeclaration)) return;
            const classSymbol = classDeclaration.symbol;
            const search = state.createSearch(/*location*/ undefined, classSymbol, /*comingFrom*/ undefined);
            getReferencesInContainerOrFiles(classSymbol, state, search);
        }

        function addImplementationReferences(refNode: Node, addReference: (node: Node) => void, state: State): void {
            // Check if we found a function/propertyAssignment/method with an implementation or initializer
            if (isDeclarationName(refNode) && isImplementation(refNode.parent)) {
                addReference(refNode);
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
            // Find the first node whose parent isn't a type node -- i.e., the highest type node.
            const typeNode = findAncestor(refNode, a => !isQualifiedName(a.parent) && !isTypeNode(a.parent) && !isTypeElement(a.parent))!;
            const typeHavingNode = typeNode.parent;
            if (hasType(typeHavingNode) && typeHavingNode.type === typeNode && state.markSeenContainingTypeReference(typeHavingNode)) {
                if (hasInitializer(typeHavingNode)) {
                    addIfImplementation(typeHavingNode.initializer!);
                }
                else if (isFunctionLike(typeHavingNode) && (typeHavingNode as FunctionLikeDeclaration).body) {
                    const body = (typeHavingNode as FunctionLikeDeclaration).body!;
                    if (body.kind === SyntaxKind.Block) {
                        forEachReturnStatement(<Block>body, returnStatement => {
                            if (returnStatement.expression) addIfImplementation(returnStatement.expression);
                        });
                    }
                    else {
                        addIfImplementation(body);
                    }
                }
                else if (isAssertionExpression(typeHavingNode)) {
                    addIfImplementation(typeHavingNode.expression);
                }
            }

            function addIfImplementation(e: Expression): void {
                if (isImplementationExpression(e)) addReference(e);
            }
        }

        function getContainingClassIfInHeritageClause(node: Node): ClassLikeDeclaration | InterfaceDeclaration | undefined {
            return isIdentifier(node) || isPropertyAccessExpression(node) ? getContainingClassIfInHeritageClause(node.parent)
                : isExpressionWithTypeArguments(node) ? tryCast(node.parent.parent, isClassLike) : undefined;
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
        function explicitlyInheritsFrom(symbol: Symbol, parent: Symbol, cachedResults: Map<string, boolean>, checker: TypeChecker): boolean {
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

            const inherits = !!symbol.declarations && symbol.declarations.some(declaration =>
                getAllSuperTypeNodes(declaration).some(typeReference => {
                    const type = checker.getTypeAtLocation(typeReference);
                    return !!type && !!type.symbol && explicitlyInheritsFrom(type.symbol, parent, cachedResults, checker);
                }));
            cachedResults.set(key, inherits);
            return inherits;
        }

        function getReferencesForSuperKeyword(superKeyword: Node): SymbolAndEntries[] | undefined {
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
                    staticFlag &= getSyntacticModifierFlags(searchSpaceNode);
                    searchSpaceNode = searchSpaceNode.parent; // re-assign to be the owning class
                    break;
                default:
                    return undefined;
            }

            const sourceFile = searchSpaceNode.getSourceFile();
            const references = mapDefined(getPossibleSymbolReferenceNodes(sourceFile, "super", searchSpaceNode), node => {
                if (node.kind !== SyntaxKind.SuperKeyword) {
                    return;
                }

                const container = getSuperContainer(node, /*stopOnFunctions*/ false);

                // If we have a 'super' container, we must have an enclosing class.
                // Now make sure the owning class is the same as the search-space
                // and has the same static qualifier as the original 'super's owner.
                return container && (ModifierFlags.Static & getSyntacticModifierFlags(container)) === staticFlag && container.parent.symbol === searchSpaceNode.symbol ? nodeEntry(node) : undefined;
            });

            return [{ definition: { type: DefinitionKind.Symbol, symbol: searchSpaceNode.symbol }, references }];
        }

        function isParameterName(node: Node) {
            return node.kind === SyntaxKind.Identifier && node.parent.kind === SyntaxKind.Parameter && (<ParameterDeclaration>node.parent).name === node;
        }

        function getReferencesForThisKeyword(thisOrSuperKeyword: Node, sourceFiles: readonly SourceFile[], cancellationToken: CancellationToken): SymbolAndEntries[] | undefined {
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
                    staticFlag &= getSyntacticModifierFlags(searchSpaceNode);
                    searchSpaceNode = searchSpaceNode.parent; // re-assign to be the owning class
                    break;
                case SyntaxKind.SourceFile:
                    if (isExternalModule(<SourceFile>searchSpaceNode) || isParameterName(thisOrSuperKeyword)) {
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

            const references = flatMap(searchSpaceNode.kind === SyntaxKind.SourceFile ? sourceFiles : [searchSpaceNode.getSourceFile()], sourceFile => {
                cancellationToken.throwIfCancellationRequested();
                return getPossibleSymbolReferenceNodes(sourceFile, "this", isSourceFile(searchSpaceNode) ? sourceFile : searchSpaceNode).filter(node => {
                    if (!isThis(node)) {
                        return false;
                    }
                    const container = getThisContainer(node, /* includeArrowFunctions */ false);
                    switch (searchSpaceNode.kind) {
                        case SyntaxKind.FunctionExpression:
                        case SyntaxKind.FunctionDeclaration:
                            return searchSpaceNode.symbol === container.symbol;
                        case SyntaxKind.MethodDeclaration:
                        case SyntaxKind.MethodSignature:
                            return isObjectLiteralMethod(searchSpaceNode) && searchSpaceNode.symbol === container.symbol;
                        case SyntaxKind.ClassExpression:
                        case SyntaxKind.ClassDeclaration:
                            // Make sure the container belongs to the same class
                            // and has the appropriate static modifier from the original container.
                            return container.parent && searchSpaceNode.symbol === container.parent.symbol && (getSyntacticModifierFlags(container) & ModifierFlags.Static) === staticFlag;
                        case SyntaxKind.SourceFile:
                            return container.kind === SyntaxKind.SourceFile && !isExternalModule(<SourceFile>container) && !isParameterName(node);
                    }
                });
            }).map(n => nodeEntry(n));

            const thisParameter = firstDefined(references, r => isParameter(r.node.parent) ? r.node : undefined);
            return [{
                definition: { type: DefinitionKind.This, node: thisParameter || thisOrSuperKeyword },
                references
            }];
        }

        function getReferencesForStringLiteral(node: StringLiteral, sourceFiles: readonly SourceFile[], cancellationToken: CancellationToken): SymbolAndEntries[] {
            const references = flatMap(sourceFiles, sourceFile => {
                cancellationToken.throwIfCancellationRequested();
                return mapDefined(getPossibleSymbolReferenceNodes(sourceFile, node.text), ref =>
                    isStringLiteral(ref) && ref.text === node.text ? nodeEntry(ref, EntryKind.StringLiteral) : undefined);
            });

            return [{
                definition: { type: DefinitionKind.String, node },
                references
            }];
        }

        // For certain symbol kinds, we need to include other symbols in the search set.
        // This is not needed when searching for re-exports.
        function populateSearchSymbolSet(symbol: Symbol, location: Node, checker: TypeChecker, isForRename: boolean, providePrefixAndSuffixText: boolean, implementations: boolean): Symbol[] {
            const result: Symbol[] = [];
            forEachRelatedSymbol<void>(symbol, location, checker, isForRename, !(isForRename && providePrefixAndSuffixText),
                (sym, root, base) => { result.push(base || root || sym); },
                /*allowBaseTypes*/ () => !implementations);
            return result;
        }

        function forEachRelatedSymbol<T>(
            symbol: Symbol, location: Node, checker: TypeChecker, isForRenamePopulateSearchSymbolSet: boolean, onlyIncludeBindingElementAtReferenceLocation: boolean,
            cbSymbol: (symbol: Symbol, rootSymbol?: Symbol, baseSymbol?: Symbol, kind?: NodeEntryKind) => T | undefined,
            allowBaseTypes: (rootSymbol: Symbol) => boolean,
        ): T | undefined {
            const containingObjectLiteralElement = getContainingObjectLiteralElement(location);
            if (containingObjectLiteralElement) {
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
                const shorthandValueSymbol = checker.getShorthandAssignmentValueSymbol(location.parent); // gets the local symbol
                if (shorthandValueSymbol && isForRenamePopulateSearchSymbolSet) {
                    // When renaming 'x' in `const o = { x }`, just rename the local variable, not the property.
                    return cbSymbol(shorthandValueSymbol, /*rootSymbol*/ undefined, /*baseSymbol*/ undefined, EntryKind.SearchedLocalFoundProperty);
                }

                // If the location is in a context sensitive location (i.e. in an object literal) try
                // to get a contextual type for it, and add the property symbol from the contextual
                // type to the search set
                const contextualType = checker.getContextualType(containingObjectLiteralElement.parent);
                const res = contextualType && firstDefined(
                    getPropertySymbolsFromContextualType(containingObjectLiteralElement, checker, contextualType, /*unionSymbolOk*/ true),
                    sym => fromRoot(sym, EntryKind.SearchedPropertyFoundLocal));
                if (res) return res;

                // If the location is name of property symbol from object literal destructuring pattern
                // Search the property symbol
                //      for ( { property: p2 } of elems) { }
                const propertySymbol = getPropertySymbolOfDestructuringAssignment(location, checker);
                const res1 = propertySymbol && cbSymbol(propertySymbol, /*rootSymbol*/ undefined, /*baseSymbol*/ undefined, EntryKind.SearchedPropertyFoundLocal);
                if (res1) return res1;

                const res2 = shorthandValueSymbol && cbSymbol(shorthandValueSymbol, /*rootSymbol*/ undefined, /*baseSymbol*/ undefined, EntryKind.SearchedLocalFoundProperty);
                if (res2) return res2;
            }

            const aliasedSymbol = getMergedAliasedSymbolOfNamespaceExportDeclaration(location, symbol, checker);
            if (aliasedSymbol) {
                // In case of UMD module and global merging, search for global as well
                const res = cbSymbol(aliasedSymbol, /*rootSymbol*/ undefined, /*baseSymbol*/ undefined, EntryKind.Node);
                if (res) return res;
            }

            const res = fromRoot(symbol);
            if (res) return res;

            if (symbol.valueDeclaration && isParameterPropertyDeclaration(symbol.valueDeclaration, symbol.valueDeclaration.parent)) {
                // For a parameter property, now try on the other symbol (property if this was a parameter, parameter if this was a property).
                const paramProps = checker.getSymbolsOfParameterPropertyDeclaration(cast(symbol.valueDeclaration, isParameter), symbol.name);
                Debug.assert(paramProps.length === 2 && !!(paramProps[0].flags & SymbolFlags.FunctionScopedVariable) && !!(paramProps[1].flags & SymbolFlags.Property)); // is [parameter, property]
                return fromRoot(symbol.flags & SymbolFlags.FunctionScopedVariable ? paramProps[1] : paramProps[0]);
            }

            const exportSpecifier = getDeclarationOfKind<ExportSpecifier>(symbol, SyntaxKind.ExportSpecifier);
            if (!isForRenamePopulateSearchSymbolSet || exportSpecifier && !exportSpecifier.propertyName) {
                const localSymbol = exportSpecifier && checker.getExportSpecifierLocalTargetSymbol(exportSpecifier);
                if (localSymbol) {
                    const res = cbSymbol(localSymbol, /*rootSymbol*/ undefined, /*baseSymbol*/ undefined, EntryKind.Node);
                    if (res) return res;
                }
            }

            // symbolAtLocation for a binding element is the local symbol. See if the search symbol is the property.
            // Don't do this when populating search set for a rename when prefix and suffix text will be provided -- just rename the local.
            if (!isForRenamePopulateSearchSymbolSet) {
                let bindingElementPropertySymbol: Symbol | undefined;
                if (onlyIncludeBindingElementAtReferenceLocation) {
                    bindingElementPropertySymbol = isObjectBindingElementWithoutPropertyName(location.parent) ? getPropertySymbolFromBindingElement(checker, location.parent) : undefined;
                }
                else {
                    bindingElementPropertySymbol = getPropertySymbolOfObjectBindingPatternWithoutPropertyName(symbol, checker);
                }
                return bindingElementPropertySymbol && fromRoot(bindingElementPropertySymbol, EntryKind.SearchedPropertyFoundLocal);
            }

            Debug.assert(isForRenamePopulateSearchSymbolSet);
            // due to the above assert and the arguments at the uses of this function,
            // (onlyIncludeBindingElementAtReferenceLocation <=> !providePrefixAndSuffixTextForRename) holds
            const includeOriginalSymbolOfBindingElement = onlyIncludeBindingElementAtReferenceLocation;

            if (includeOriginalSymbolOfBindingElement) {
                const bindingElementPropertySymbol = getPropertySymbolOfObjectBindingPatternWithoutPropertyName(symbol, checker);
                return bindingElementPropertySymbol && fromRoot(bindingElementPropertySymbol, EntryKind.SearchedPropertyFoundLocal);
            }

            function fromRoot(sym: Symbol, kind?: NodeEntryKind): T | undefined {
                // If this is a union property:
                //   - In populateSearchSymbolsSet we will add all the symbols from all its source symbols in all unioned types.
                //   - In findRelatedSymbol, we will just use the union symbol if any source symbol is included in the search.
                // If the symbol is an instantiation from a another symbol (e.g. widened symbol):
                //   - In populateSearchSymbolsSet, add the root the list
                //   - In findRelatedSymbol, return the source symbol if that is in the search. (Do not return the instantiation symbol.)
                return firstDefined(checker.getRootSymbols(sym), rootSymbol =>
                    cbSymbol(sym, rootSymbol, /*baseSymbol*/ undefined, kind)
                    // Add symbol of properties/methods of the same name in base classes and implemented interfaces definitions
                    || (rootSymbol.parent && rootSymbol.parent.flags & (SymbolFlags.Class | SymbolFlags.Interface) && allowBaseTypes(rootSymbol)
                        ? getPropertySymbolsFromBaseTypes(rootSymbol.parent, rootSymbol.name, checker, base => cbSymbol(sym, rootSymbol, base, kind))
                        : undefined));
            }

            function getPropertySymbolOfObjectBindingPatternWithoutPropertyName(symbol: Symbol, checker: TypeChecker): Symbol | undefined {
                const bindingElement = getDeclarationOfKind<BindingElement>(symbol, SyntaxKind.BindingElement);
                if (bindingElement && isObjectBindingElementWithoutPropertyName(bindingElement)) {
                    return getPropertySymbolFromBindingElement(checker, bindingElement);
                }
            }
        }

        interface RelatedSymbol {
            readonly symbol: Symbol;
            readonly kind: NodeEntryKind | undefined;
        }
        function getRelatedSymbol(search: Search, referenceSymbol: Symbol, referenceLocation: Node, state: State): RelatedSymbol | undefined {
            const { checker } = state;
            return forEachRelatedSymbol(referenceSymbol, referenceLocation, checker, /*isForRenamePopulateSearchSymbolSet*/ false,
                /*onlyIncludeBindingElementAtReferenceLocation*/ state.options.use !== FindReferencesUse.Rename || !!state.options.providePrefixAndSuffixTextForRename,
                (sym, rootSymbol, baseSymbol, kind): RelatedSymbol | undefined => search.includes(baseSymbol || rootSymbol || sym)
                    // For a base type, use the symbol for the derived type. For a synthetic (e.g. union) property, use the union symbol.
                    ? { symbol: rootSymbol && !(getCheckFlags(sym) & CheckFlags.Synthetic) ? rootSymbol : sym, kind }
                    : undefined,
                /*allowBaseTypes*/ rootSymbol =>
                    !(search.parents && !search.parents.some(parent => explicitlyInheritsFrom(rootSymbol.parent!, parent, state.inheritsFromCache, checker))));
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
            return !!(node.flags & NodeFlags.Ambient) ? !(isInterfaceDeclaration(node) || isTypeAliasDeclaration(node)) :
                (isVariableLike(node) ? hasInitializer(node) :
                isFunctionLikeDeclaration(node) ? !!node.body :
                isClassLike(node) || isModuleOrEnumDeclaration(node));
        }

        export function getReferenceEntriesForShorthandPropertyAssignment(node: Node, checker: TypeChecker, addReference: (node: Node) => void): void {
            const refSymbol = checker.getSymbolAtLocation(node)!;
            const shorthandSymbol = checker.getShorthandAssignmentValueSymbol(refSymbol.valueDeclaration);

            if (shorthandSymbol) {
                for (const declaration of shorthandSymbol.getDeclarations()!) {
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
        function getParentSymbolsOfPropertyAccess(location: Node, symbol: Symbol, checker: TypeChecker): readonly Symbol[] | undefined {
            const propertyAccessExpression = isRightSideOfPropertyAccess(location) ? <PropertyAccessExpression>location.parent : undefined;
            const lhsType = propertyAccessExpression && checker.getTypeAtLocation(propertyAccessExpression.expression);
            const res = mapDefined(lhsType && (lhsType.isUnionOrIntersection() ? lhsType.types : lhsType.symbol === symbol.parent ? undefined : [lhsType]), t =>
                t.symbol && t.symbol.flags & (SymbolFlags.Class | SymbolFlags.Interface) ? t.symbol : undefined);
            return res.length === 0 ? undefined : res;
        }

        function isForRenameWithPrefixAndSuffixText(options: Options) {
            return options.use === FindReferencesUse.Rename && options.providePrefixAndSuffixTextForRename;
        }
    }
}
