import * as ts from "./_namespaces/ts";

/** @internal */
export interface SymbolAndEntries {
    readonly definition: Definition | undefined;
    readonly references: readonly Entry[];
}

/** @internal */
export const enum DefinitionKind { Symbol, Label, Keyword, This, String, TripleSlashReference }
/** @internal */
export type Definition =
    | { readonly type: DefinitionKind.Symbol; readonly symbol: ts.Symbol }
    | { readonly type: DefinitionKind.Label; readonly node: ts.Identifier }
    | { readonly type: DefinitionKind.Keyword; readonly node: ts.Node }
    | { readonly type: DefinitionKind.This; readonly node: ts.Node }
    | { readonly type: DefinitionKind.String; readonly node: ts.StringLiteralLike }
    | { readonly type: DefinitionKind.TripleSlashReference; readonly reference: ts.FileReference, readonly file: ts.SourceFile };

/** @internal */
export const enum EntryKind { Span, Node, StringLiteral, SearchedLocalFoundProperty, SearchedPropertyFoundLocal }
/** @internal */
export type NodeEntryKind = EntryKind.Node | EntryKind.StringLiteral | EntryKind.SearchedLocalFoundProperty | EntryKind.SearchedPropertyFoundLocal;
/** @internal */
export type Entry = NodeEntry | SpanEntry;
/** @internal */
export interface ContextWithStartAndEndNode {
    start: ts.Node;
    end: ts.Node;
}
/** @internal */
export type ContextNode = ts.Node | ContextWithStartAndEndNode;
/** @internal */
export interface NodeEntry {
    readonly kind: NodeEntryKind;
    readonly node: ts.Node;
    readonly context?: ContextNode;
}
/** @internal */
export interface SpanEntry {
    readonly kind: EntryKind.Span;
    readonly fileName: string;
    readonly textSpan: ts.TextSpan;
}
/** @internal */
export function nodeEntry(node: ts.Node, kind: NodeEntryKind = EntryKind.Node): NodeEntry {
    return {
        kind,
        node: (node as ts.NamedDeclaration).name || node,
        context: getContextNodeForNodeEntry(node)
    };
}

/** @internal */
export function isContextWithStartAndEndNode(node: ContextNode): node is ContextWithStartAndEndNode {
    return node && (node as ts.Node).kind === undefined;
}

function getContextNodeForNodeEntry(node: ts.Node): ContextNode | undefined {
    if (ts.isDeclaration(node)) {
        return getContextNode(node);
    }

    if (!node.parent) return undefined;

    if (!ts.isDeclaration(node.parent) && !ts.isExportAssignment(node.parent)) {
        // Special property assignment in javascript
        if (ts.isInJSFile(node)) {
            const binaryExpression = ts.isBinaryExpression(node.parent) ?
                node.parent :
                ts.isAccessExpression(node.parent) &&
                    ts.isBinaryExpression(node.parent.parent) &&
                    node.parent.parent.left === node.parent ?
                    node.parent.parent :
                    undefined;
            if (binaryExpression && ts.getAssignmentDeclarationKind(binaryExpression) !== ts.AssignmentDeclarationKind.None) {
                return getContextNode(binaryExpression);
            }
        }

        // Jsx Tags
        if (ts.isJsxOpeningElement(node.parent) || ts.isJsxClosingElement(node.parent)) {
            return node.parent.parent;
        }
        else if (ts.isJsxSelfClosingElement(node.parent) ||
            ts.isLabeledStatement(node.parent) ||
            ts.isBreakOrContinueStatement(node.parent)) {
            return node.parent;
        }
        else if (ts.isStringLiteralLike(node)) {
            const validImport = ts.tryGetImportFromModuleSpecifier(node);
            if (validImport) {
                const declOrStatement = ts.findAncestor(validImport, node =>
                    ts.isDeclaration(node) ||
                    ts.isStatement(node) ||
                    ts.isJSDocTag(node)
                )! as ts.NamedDeclaration | ts.Statement | ts.JSDocTag;
                return ts.isDeclaration(declOrStatement) ?
                    getContextNode(declOrStatement) :
                    declOrStatement;
            }
        }

        // Handle computed property name
        const propertyName = ts.findAncestor(node, ts.isComputedPropertyName);
        return propertyName ?
            getContextNode(propertyName.parent) :
            undefined;
    }

    if (node.parent.name === node || // node is name of declaration, use parent
        ts.isConstructorDeclaration(node.parent) ||
        ts.isExportAssignment(node.parent) ||
        // Property name of the import export specifier or binding pattern, use parent
        ((ts.isImportOrExportSpecifier(node.parent) || ts.isBindingElement(node.parent))
            && node.parent.propertyName === node) ||
        // Is default export
        (node.kind === ts.SyntaxKind.DefaultKeyword && ts.hasSyntacticModifier(node.parent, ts.ModifierFlags.ExportDefault))) {
        return getContextNode(node.parent);
    }

    return undefined;
}

/** @internal */
export function getContextNode(node: ts.NamedDeclaration | ts.BinaryExpression | ts.ForInOrOfStatement | undefined): ContextNode | undefined {
    if (!node) return undefined;
    switch (node.kind) {
        case ts.SyntaxKind.VariableDeclaration:
            return !ts.isVariableDeclarationList(node.parent) || node.parent.declarations.length !== 1 ?
                node :
                ts.isVariableStatement(node.parent.parent) ?
                    node.parent.parent :
                    ts.isForInOrOfStatement(node.parent.parent) ?
                        getContextNode(node.parent.parent) :
                        node.parent;

        case ts.SyntaxKind.BindingElement:
            return getContextNode(node.parent.parent as ts.NamedDeclaration);

        case ts.SyntaxKind.ImportSpecifier:
            return node.parent.parent.parent;

        case ts.SyntaxKind.ExportSpecifier:
        case ts.SyntaxKind.NamespaceImport:
            return node.parent.parent;

        case ts.SyntaxKind.ImportClause:
        case ts.SyntaxKind.NamespaceExport:
            return node.parent;

        case ts.SyntaxKind.BinaryExpression:
            return ts.isExpressionStatement(node.parent) ?
                node.parent :
                node;

        case ts.SyntaxKind.ForOfStatement:
        case ts.SyntaxKind.ForInStatement:
            return {
                start: (node as ts.ForInOrOfStatement).initializer,
                end: (node as ts.ForInOrOfStatement).expression
            };

        case ts.SyntaxKind.PropertyAssignment:
        case ts.SyntaxKind.ShorthandPropertyAssignment:
            return ts.isArrayLiteralOrObjectLiteralDestructuringPattern(node.parent) ?
                getContextNode(
                    ts.findAncestor(node.parent, node =>
                        ts.isBinaryExpression(node) || ts.isForInOrOfStatement(node)
                    ) as ts.BinaryExpression | ts.ForInOrOfStatement
                ) :
                node;

        default:
            return node;
    }
}

/** @internal */
export function toContextSpan(textSpan: ts.TextSpan, sourceFile: ts.SourceFile, context?: ContextNode): { contextSpan: ts.TextSpan } | undefined {
    if (!context) return undefined;
    const contextSpan = isContextWithStartAndEndNode(context) ?
        getTextSpan(context.start, sourceFile, context.end) :
        getTextSpan(context, sourceFile);
    return contextSpan.start !== textSpan.start || contextSpan.length !== textSpan.length ?
        { contextSpan } :
        undefined;
}

/** @internal */
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

/** @internal */
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

/** @internal */
export function findReferencedSymbols(program: ts.Program, cancellationToken: ts.CancellationToken, sourceFiles: readonly ts.SourceFile[], sourceFile: ts.SourceFile, position: number): ts.ReferencedSymbol[] | undefined {
    const node = ts.getTouchingPropertyName(sourceFile, position);
    const options = { use: FindReferencesUse.References };
    const referencedSymbols = Core.getReferencedSymbolsForNode(position, node, program, sourceFiles, cancellationToken, options);
    const checker = program.getTypeChecker();
    // Unless the starting node is a declaration (vs e.g. JSDoc), don't attempt to compute isDefinition
    const adjustedNode = Core.getAdjustedNode(node, options);
    const symbol = isDefinitionForReference(adjustedNode) ? checker.getSymbolAtLocation(adjustedNode) : undefined;
    return !referencedSymbols || !referencedSymbols.length ? undefined : ts.mapDefined<SymbolAndEntries, ts.ReferencedSymbol>(referencedSymbols, ({ definition, references }) =>
        // Only include referenced symbols that have a valid definition.
        definition && {
            definition: checker.runWithCancellationToken(cancellationToken, checker => definitionToReferencedSymbolDefinitionInfo(definition, checker, node)),
            references: references.map(r => toReferencedSymbolEntry(r, symbol))
        });
}

function isDefinitionForReference(node: ts.Node): boolean {
    return node.kind === ts.SyntaxKind.DefaultKeyword
        || !!ts.getDeclarationFromName(node)
        || ts.isLiteralComputedPropertyDeclarationName(node)
        || (node.kind === ts.SyntaxKind.ConstructorKeyword && ts.isConstructorDeclaration(node.parent));
}

/** @internal */
export function getImplementationsAtPosition(program: ts.Program, cancellationToken: ts.CancellationToken, sourceFiles: readonly ts.SourceFile[], sourceFile: ts.SourceFile, position: number): ts.ImplementationLocation[] | undefined {
    const node = ts.getTouchingPropertyName(sourceFile, position);
    let referenceEntries: Entry[] | undefined;
    const entries = getImplementationReferenceEntries(program, cancellationToken, sourceFiles, node, position);

    if (
        node.parent.kind === ts.SyntaxKind.PropertyAccessExpression
        || node.parent.kind === ts.SyntaxKind.BindingElement
        || node.parent.kind === ts.SyntaxKind.ElementAccessExpression
        || node.kind === ts.SyntaxKind.SuperKeyword
    ) {
        referenceEntries = entries && [...entries];
    }
    else if (entries) {
        const queue = ts.createQueue(entries);
        const seenNodes = new ts.Map<number, true>();
        while (!queue.isEmpty()) {
            const entry = queue.dequeue() as NodeEntry;
            if (!ts.addToSeen(seenNodes, ts.getNodeId(entry.node))) {
                continue;
            }
            referenceEntries = ts.append(referenceEntries, entry);
            const entries = getImplementationReferenceEntries(program, cancellationToken, sourceFiles, entry.node, entry.node.pos);
            if (entries) {
                queue.enqueue(...entries);
            }
        }
    }
    const checker = program.getTypeChecker();
    return ts.map(referenceEntries, entry => toImplementationLocation(entry, checker));
}

function getImplementationReferenceEntries(program: ts.Program, cancellationToken: ts.CancellationToken, sourceFiles: readonly ts.SourceFile[], node: ts.Node, position: number): readonly Entry[] | undefined {
    if (node.kind === ts.SyntaxKind.SourceFile) {
        return undefined;
    }

    const checker = program.getTypeChecker();
    // If invoked directly on a shorthand property assignment, then return
    // the declaration of the symbol being assigned (not the symbol being assigned to).
    if (node.parent.kind === ts.SyntaxKind.ShorthandPropertyAssignment) {
        const result: NodeEntry[] = [];
        Core.getReferenceEntriesForShorthandPropertyAssignment(node, checker, node => result.push(nodeEntry(node)));
        return result;
    }
    else if (node.kind === ts.SyntaxKind.SuperKeyword || ts.isSuperProperty(node.parent)) {
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

/** @internal */
export function findReferenceOrRenameEntries<T>(
    program: ts.Program, cancellationToken: ts.CancellationToken, sourceFiles: readonly ts.SourceFile[], node: ts.Node, position: number, options: Options | undefined,
    convertEntry: ToReferenceOrRenameEntry<T>,
): T[] | undefined {
    return ts.map(flattenEntries(Core.getReferencedSymbolsForNode(position, node, program, sourceFiles, cancellationToken, options)), entry => convertEntry(entry, node, program.getTypeChecker()));
}

/** @internal */
export type ToReferenceOrRenameEntry<T> = (entry: Entry, originalNode: ts.Node, checker: ts.TypeChecker) => T;

/** @internal */
export function getReferenceEntriesForNode(
    position: number,
    node: ts.Node,
    program: ts.Program,
    sourceFiles: readonly ts.SourceFile[],
    cancellationToken: ts.CancellationToken,
    options: Options = {},
    sourceFilesSet: ts.ReadonlySet<string> = new ts.Set(sourceFiles.map(f => f.fileName)),
): readonly Entry[] | undefined {
    return flattenEntries(Core.getReferencedSymbolsForNode(position, node, program, sourceFiles, cancellationToken, options, sourceFilesSet));
}

function flattenEntries(referenceSymbols: readonly SymbolAndEntries[] | undefined): readonly Entry[] | undefined {
    return referenceSymbols && ts.flatMap(referenceSymbols, r => r.references);
}

function definitionToReferencedSymbolDefinitionInfo(def: Definition, checker: ts.TypeChecker, originalNode: ts.Node): ts.ReferencedSymbolDefinitionInfo {
    const info = ((): { sourceFile: ts.SourceFile, textSpan: ts.TextSpan, name: string, kind: ts.ScriptElementKind, displayParts: ts.SymbolDisplayPart[], context?: ts.Node | ContextWithStartAndEndNode } => {
        switch (def.type) {
            case DefinitionKind.Symbol: {
                const { symbol } = def;
                const { displayParts, kind } = getDefinitionKindAndDisplayParts(symbol, checker, originalNode);
                const name = displayParts.map(p => p.text).join("");
                const declaration = symbol.declarations && ts.firstOrUndefined(symbol.declarations);
                const node = declaration ? (ts.getNameOfDeclaration(declaration) || declaration) : originalNode;
                return {
                    ...getFileAndTextSpanFromNode(node),
                    name,
                    kind,
                    displayParts,
                    context: getContextNode(declaration)
                };
            }
            case DefinitionKind.Label: {
                const { node } = def;
                return { ...getFileAndTextSpanFromNode(node), name: node.text, kind: ts.ScriptElementKind.label, displayParts: [ts.displayPart(node.text, ts.SymbolDisplayPartKind.text)] };
            }
            case DefinitionKind.Keyword: {
                const { node } = def;
                const name = ts.tokenToString(node.kind)!;
                return { ...getFileAndTextSpanFromNode(node), name, kind: ts.ScriptElementKind.keyword, displayParts: [{ text: name, kind: ts.ScriptElementKind.keyword }] };
            }
            case DefinitionKind.This: {
                const { node } = def;
                const symbol = checker.getSymbolAtLocation(node);
                const displayParts = symbol && ts.SymbolDisplay.getSymbolDisplayPartsDocumentationAndSymbolKind(
                    checker, symbol, node.getSourceFile(), ts.getContainerNode(node), node).displayParts || [ts.textPart("this")];
                return { ...getFileAndTextSpanFromNode(node), name: "this", kind: ts.ScriptElementKind.variableElement, displayParts };
            }
            case DefinitionKind.String: {
                const { node } = def;
                return {
                    ...getFileAndTextSpanFromNode(node),
                    name: node.text,
                    kind: ts.ScriptElementKind.variableElement,
                    displayParts: [ts.displayPart(ts.getTextOfNode(node), ts.SymbolDisplayPartKind.stringLiteral)]
                };
            }
            case DefinitionKind.TripleSlashReference: {
                return {
                    textSpan: ts.createTextSpanFromRange(def.reference),
                    sourceFile: def.file,
                    name: def.reference.fileName,
                    kind: ts.ScriptElementKind.string,
                    displayParts: [ts.displayPart(`"${def.reference.fileName}"`, ts.SymbolDisplayPartKind.stringLiteral)]
                };
            }
            default:
                return ts.Debug.assertNever(def);
        }
    })();

    const { sourceFile, textSpan, name, kind, displayParts, context } = info;
    return {
        containerKind: ts.ScriptElementKind.unknown,
        containerName: "",
        fileName: sourceFile.fileName,
        kind,
        name,
        textSpan,
        displayParts,
        ...toContextSpan(textSpan, sourceFile, context)
    };
}

function getFileAndTextSpanFromNode(node: ts.Node) {
    const sourceFile = node.getSourceFile();
    return {
        sourceFile,
        textSpan: getTextSpan(ts.isComputedPropertyName(node) ? node.expression : node, sourceFile)
    };
}

function getDefinitionKindAndDisplayParts(symbol: ts.Symbol, checker: ts.TypeChecker, node: ts.Node): { displayParts: ts.SymbolDisplayPart[], kind: ts.ScriptElementKind } {
    const meaning = Core.getIntersectingMeaningFromDeclarations(node, symbol);
    const enclosingDeclaration = symbol.declarations && ts.firstOrUndefined(symbol.declarations) || node;
    const { displayParts, symbolKind } =
        ts.SymbolDisplay.getSymbolDisplayPartsDocumentationAndSymbolKind(checker, symbol, enclosingDeclaration.getSourceFile(), enclosingDeclaration, enclosingDeclaration, meaning);
    return { displayParts, kind: symbolKind };
}

/** @internal */
export function toRenameLocation(entry: Entry, originalNode: ts.Node, checker: ts.TypeChecker, providePrefixAndSuffixText: boolean): ts.RenameLocation {
    return { ...entryToDocumentSpan(entry), ...(providePrefixAndSuffixText && getPrefixAndSuffixText(entry, originalNode, checker)) };
}

function toReferencedSymbolEntry(entry: Entry, symbol: ts.Symbol | undefined): ts.ReferencedSymbolEntry {
    const referenceEntry = toReferenceEntry(entry);
    if (!symbol) return referenceEntry;
    return {
        ...referenceEntry,
        isDefinition: entry.kind !== EntryKind.Span && isDeclarationOfSymbol(entry.node, symbol)
    };
}

/** @internal */
export function toReferenceEntry(entry: Entry): ts.ReferenceEntry {
    const documentSpan = entryToDocumentSpan(entry);
    if (entry.kind === EntryKind.Span) {
        return { ...documentSpan, isWriteAccess: false };
    }
    const { kind, node } = entry;
    return {
        ...documentSpan,
        isWriteAccess: isWriteAccessForReference(node),
        isInString: kind === EntryKind.StringLiteral ? true : undefined,
    };
}

function entryToDocumentSpan(entry: Entry): ts.DocumentSpan {
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
function getPrefixAndSuffixText(entry: Entry, originalNode: ts.Node, checker: ts.TypeChecker): PrefixAndSuffix {
    if (entry.kind !== EntryKind.Span && ts.isIdentifier(originalNode)) {
        const { node, kind } = entry;
        const parent = node.parent;
        const name = originalNode.text;
        const isShorthandAssignment = ts.isShorthandPropertyAssignment(parent);
        if (isShorthandAssignment || (ts.isObjectBindingElementWithoutPropertyName(parent) && parent.name === node && parent.dotDotDotToken === undefined)) {
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
                if (ts.isObjectLiteralExpression(grandParent) &&
                    ts.isBinaryExpression(grandParent.parent) &&
                    ts.isModuleExportsAccessExpression(grandParent.parent.left)) {
                    return prefixColon;
                }
                return suffixColon;
            }
            else {
                return prefixColon;
            }
        }
        else if (ts.isImportSpecifier(parent) && !parent.propertyName) {
            // If the original symbol was using this alias, just rename the alias.
            const originalSymbol = ts.isExportSpecifier(originalNode.parent) ? checker.getExportSpecifierLocalTargetSymbol(originalNode.parent) : checker.getSymbolAtLocation(originalNode);
            return ts.contains(originalSymbol!.declarations, parent) ? { prefixText: name + " as " } : ts.emptyOptions;
        }
        else if (ts.isExportSpecifier(parent) && !parent.propertyName) {
            // If the symbol for the node is same as declared node symbol use prefix text
            return originalNode === entry.node || checker.getSymbolAtLocation(originalNode) === checker.getSymbolAtLocation(entry.node) ?
                { prefixText: name + " as " } :
                { suffixText: " as " + name };
        }
    }

    return ts.emptyOptions;
}

function toImplementationLocation(entry: Entry, checker: ts.TypeChecker): ts.ImplementationLocation {
    const documentSpan = entryToDocumentSpan(entry);
    if (entry.kind !== EntryKind.Span) {
        const { node } = entry;
        return {
            ...documentSpan,
            ...implementationKindDisplayParts(node, checker)
        };
    }
    else {
        return { ...documentSpan, kind: ts.ScriptElementKind.unknown, displayParts: [] };
    }
}

function implementationKindDisplayParts(node: ts.Node, checker: ts.TypeChecker): { kind: ts.ScriptElementKind, displayParts: ts.SymbolDisplayPart[] } {
    const symbol = checker.getSymbolAtLocation(ts.isDeclaration(node) && node.name ? node.name : node);
    if (symbol) {
        return getDefinitionKindAndDisplayParts(symbol, checker, node);
    }
    else if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {
        return {
            kind: ts.ScriptElementKind.interfaceElement,
            displayParts: [ts.punctuationPart(ts.SyntaxKind.OpenParenToken), ts.textPart("object literal"), ts.punctuationPart(ts.SyntaxKind.CloseParenToken)]
        };
    }
    else if (node.kind === ts.SyntaxKind.ClassExpression) {
        return {
            kind: ts.ScriptElementKind.localClassElement,
            displayParts: [ts.punctuationPart(ts.SyntaxKind.OpenParenToken), ts.textPart("anonymous local class"), ts.punctuationPart(ts.SyntaxKind.CloseParenToken)]
        };
    }
    else {
        return { kind: ts.getNodeKind(node), displayParts: [] };
    }
}

/** @internal */
export function toHighlightSpan(entry: Entry): { fileName: string, span: ts.HighlightSpan } {
    const documentSpan = entryToDocumentSpan(entry);
    if (entry.kind === EntryKind.Span) {
        return {
            fileName: documentSpan.fileName,
            span: {
                textSpan: documentSpan.textSpan,
                kind: ts.HighlightSpanKind.reference
            }
        };
    }

    const writeAccess = isWriteAccessForReference(entry.node);
    const span: ts.HighlightSpan = {
        textSpan: documentSpan.textSpan,
        kind: writeAccess ? ts.HighlightSpanKind.writtenReference : ts.HighlightSpanKind.reference,
        isInString: entry.kind === EntryKind.StringLiteral ? true : undefined,
        ...documentSpan.contextSpan && { contextSpan: documentSpan.contextSpan }
    };
    return { fileName: documentSpan.fileName, span };
}

function getTextSpan(node: ts.Node, sourceFile: ts.SourceFile, endNode?: ts.Node): ts.TextSpan {
    let start = node.getStart(sourceFile);
    let end = (endNode || node).getEnd();
    if (ts.isStringLiteralLike(node) && (end - start) > 2) {
        ts.Debug.assert(endNode === undefined);
        start += 1;
        end -= 1;
    }
    return ts.createTextSpanFromBounds(start, end);
}

/** @internal */
export function getTextSpanOfEntry(entry: Entry) {
    return entry.kind === EntryKind.Span ? entry.textSpan :
        getTextSpan(entry.node, entry.node.getSourceFile());
}

/** A node is considered a writeAccess iff it is a name of a declaration or a target of an assignment */
function isWriteAccessForReference(node: ts.Node): boolean {
    const decl = ts.getDeclarationFromName(node);
    return !!decl && declarationIsWriteAccess(decl) || node.kind === ts.SyntaxKind.DefaultKeyword || ts.isWriteAccess(node);
}

/** @internal */
/** Whether a reference, `node`, is a definition of the `target` symbol */
export function isDeclarationOfSymbol(node: ts.Node, target: ts.Symbol | undefined): boolean {
    if (!target) return false;
    const source = ts.getDeclarationFromName(node) ||
        (node.kind === ts.SyntaxKind.DefaultKeyword ? node.parent
        : ts.isLiteralComputedPropertyDeclarationName(node) ? node.parent.parent
        : node.kind === ts.SyntaxKind.ConstructorKeyword && ts.isConstructorDeclaration(node.parent) ? node.parent.parent
        : undefined);
    const commonjsSource = source && ts.isBinaryExpression(source) ? source.left as unknown as ts.Declaration : undefined;
    return !!(source && target.declarations?.some(d => d === source || d === commonjsSource));
}

/**
 * True if 'decl' provides a value, as in `function f() {}`;
 * false if 'decl' is just a location for a future write, as in 'let x;'
 */
function declarationIsWriteAccess(decl: ts.Declaration): boolean {
    // Consider anything in an ambient declaration to be a write access since it may be coming from JS.
    if (!!(decl.flags & ts.NodeFlags.Ambient)) return true;

    switch (decl.kind) {
        case ts.SyntaxKind.BinaryExpression:
        case ts.SyntaxKind.BindingElement:
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.ClassExpression:
        case ts.SyntaxKind.DefaultKeyword:
        case ts.SyntaxKind.EnumDeclaration:
        case ts.SyntaxKind.EnumMember:
        case ts.SyntaxKind.ExportSpecifier:
        case ts.SyntaxKind.ImportClause: // default import
        case ts.SyntaxKind.ImportEqualsDeclaration:
        case ts.SyntaxKind.ImportSpecifier:
        case ts.SyntaxKind.InterfaceDeclaration:
        case ts.SyntaxKind.JSDocCallbackTag:
        case ts.SyntaxKind.JSDocTypedefTag:
        case ts.SyntaxKind.JsxAttribute:
        case ts.SyntaxKind.ModuleDeclaration:
        case ts.SyntaxKind.NamespaceExportDeclaration:
        case ts.SyntaxKind.NamespaceImport:
        case ts.SyntaxKind.NamespaceExport:
        case ts.SyntaxKind.Parameter:
        case ts.SyntaxKind.ShorthandPropertyAssignment:
        case ts.SyntaxKind.TypeAliasDeclaration:
        case ts.SyntaxKind.TypeParameter:
            return true;

        case ts.SyntaxKind.PropertyAssignment:
            // In `({ x: y } = 0);`, `x` is not a write access. (Won't call this function for `y`.)
            return !ts.isArrayLiteralOrObjectLiteralDestructuringPattern((decl as ts.PropertyAssignment).parent);

        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.Constructor:
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
            return !!(decl as ts.FunctionDeclaration | ts.FunctionExpression | ts.ConstructorDeclaration | ts.MethodDeclaration | ts.GetAccessorDeclaration | ts.SetAccessorDeclaration).body;

        case ts.SyntaxKind.VariableDeclaration:
        case ts.SyntaxKind.PropertyDeclaration:
            return !!(decl as ts.VariableDeclaration | ts.PropertyDeclaration).initializer || ts.isCatchClause(decl.parent);

        case ts.SyntaxKind.MethodSignature:
        case ts.SyntaxKind.PropertySignature:
        case ts.SyntaxKind.JSDocPropertyTag:
        case ts.SyntaxKind.JSDocParameterTag:
            return false;

        default:
            return ts.Debug.failBadSyntaxKind(decl);
    }
}

/** @internal */
/** Encapsulates the core find-all-references algorithm. */
export namespace Core {
    /** Core find-all-references algorithm. Handles special cases before delegating to `getReferencedSymbolsForSymbol`. */
    export function getReferencedSymbolsForNode(position: number, node: ts.Node, program: ts.Program, sourceFiles: readonly ts.SourceFile[], cancellationToken: ts.CancellationToken, options: Options = {}, sourceFilesSet: ts.ReadonlySet<string> = new ts.Set(sourceFiles.map(f => f.fileName))): readonly SymbolAndEntries[] | undefined {
        node = getAdjustedNode(node, options);
        if (ts.isSourceFile(node)) {
            const resolvedRef = ts.GoToDefinition.getReferenceAtPosition(node, position, program);
            if (!resolvedRef?.file) {
                return undefined;
            }
            const moduleSymbol = program.getTypeChecker().getMergedSymbol(resolvedRef.file.symbol);
            if (moduleSymbol) {
                return getReferencedSymbolsForModule(program, moduleSymbol, /*excludeImportTypeOfExportEquals*/ false, sourceFiles, sourceFilesSet);
            }
            const fileIncludeReasons = program.getFileIncludeReasons();
            if (!fileIncludeReasons) {
                return undefined;
            }
            return [{
                definition: { type: DefinitionKind.TripleSlashReference, reference: resolvedRef.reference, file: node },
                references: getReferencesForNonModule(resolvedRef.file, fileIncludeReasons, program) || ts.emptyArray
            }];
        }

        if (!options.implementations) {
            const special = getReferencedSymbolsSpecial(node, sourceFiles, cancellationToken);
            if (special) {
                return special;
            }
        }

        const checker = program.getTypeChecker();
        // constructors should use the class symbol, detected by name, if present
        const symbol = checker.getSymbolAtLocation(ts.isConstructorDeclaration(node) && node.parent.name || node);

        // Could not find a symbol e.g. unknown identifier
        if (!symbol) {
            // String literal might be a property (and thus have a symbol), so do this here rather than in getReferencedSymbolsSpecial.
            if (!options.implementations && ts.isStringLiteralLike(node)) {
                if (ts.isModuleSpecifierLike(node)) {
                    const fileIncludeReasons = program.getFileIncludeReasons();
                    const referencedFileName = node.getSourceFile().resolvedModules?.get(node.text, ts.getModeForUsageLocation(node.getSourceFile(), node))?.resolvedFileName;
                    const referencedFile = referencedFileName ? program.getSourceFile(referencedFileName) : undefined;
                    if (referencedFile) {
                        return [{ definition: { type: DefinitionKind.String, node }, references: getReferencesForNonModule(referencedFile, fileIncludeReasons, program) || ts.emptyArray }];
                    }
                    // Fall through to string literal references. This is not very likely to return
                    // anything useful, but I guess it's better than nothing, and there's an existing
                    // test that expects this to happen (fourslash/cases/untypedModuleImport.ts).
                }
                return getReferencesForStringLiteral(node, sourceFiles, checker, cancellationToken);
            }
            return undefined;
        }

        if (symbol.escapedName === ts.InternalSymbolName.ExportEquals) {
            return getReferencedSymbolsForModule(program, symbol.parent!, /*excludeImportTypeOfExportEquals*/ false, sourceFiles, sourceFilesSet);
        }

        const moduleReferences = getReferencedSymbolsForModuleIfDeclaredBySourceFile(symbol, program, sourceFiles, cancellationToken, options, sourceFilesSet);
        if (moduleReferences && !(symbol.flags & ts.SymbolFlags.Transient)) {
            return moduleReferences;
        }

        const aliasedSymbol = getMergedAliasedSymbolOfNamespaceExportDeclaration(node, symbol, checker);
        const moduleReferencesOfExportTarget = aliasedSymbol &&
            getReferencedSymbolsForModuleIfDeclaredBySourceFile(aliasedSymbol, program, sourceFiles, cancellationToken, options, sourceFilesSet);

        const references = getReferencedSymbolsForSymbol(symbol, node, sourceFiles, sourceFilesSet, checker, cancellationToken, options);
        return mergeReferences(program, moduleReferences, references, moduleReferencesOfExportTarget);
    }

    export function getAdjustedNode(node: ts.Node, options: Options) {
        if (options.use === FindReferencesUse.References) {
            node = ts.getAdjustedReferenceLocation(node);
        }
        else if (options.use === FindReferencesUse.Rename) {
            node = ts.getAdjustedRenameLocation(node);
        }
        return node;
    }

    export function getReferencesForFileName(fileName: string, program: ts.Program, sourceFiles: readonly ts.SourceFile[], sourceFilesSet: ts.ReadonlySet<string> = new ts.Set(sourceFiles.map(f => f.fileName))): readonly Entry[] {
        const moduleSymbol = program.getSourceFile(fileName)?.symbol;
        if (moduleSymbol) {
            return getReferencedSymbolsForModule(program, moduleSymbol, /*excludeImportTypeOfExportEquals*/ false, sourceFiles, sourceFilesSet)[0]?.references || ts.emptyArray;
        }
        const fileIncludeReasons = program.getFileIncludeReasons();
        const referencedFile = program.getSourceFile(fileName);
        return referencedFile && fileIncludeReasons && getReferencesForNonModule(referencedFile, fileIncludeReasons, program) || ts.emptyArray;
    }

    function getReferencesForNonModule(referencedFile: ts.SourceFile, refFileMap: ts.MultiMap<ts.Path, ts.FileIncludeReason>, program: ts.Program): readonly SpanEntry[] | undefined {
        let entries: SpanEntry[] | undefined;
        const references = refFileMap.get(referencedFile.path) || ts.emptyArray;
        for (const ref of references) {
            if (ts.isReferencedFile(ref)) {
                const referencingFile = program.getSourceFileByPath(ref.file)!;
                const location = ts.getReferencedFileLocation(program.getSourceFileByPath, ref);
                if (ts.isReferenceFileLocation(location)) {
                    entries = ts.append(entries, {
                        kind: EntryKind.Span,
                        fileName: referencingFile.fileName,
                        textSpan: ts.createTextSpanFromRange(location)
                    });
                }
            }
        }
        return entries;
    }

    function getMergedAliasedSymbolOfNamespaceExportDeclaration(node: ts.Node, symbol: ts.Symbol, checker: ts.TypeChecker) {
        if (node.parent && ts.isNamespaceExportDeclaration(node.parent)) {
            const aliasedSymbol = checker.getAliasedSymbol(symbol);
            const targetSymbol = checker.getMergedSymbol(aliasedSymbol);
            if (aliasedSymbol !== targetSymbol) {
                return targetSymbol;
            }
        }
        return undefined;
    }

    function getReferencedSymbolsForModuleIfDeclaredBySourceFile(symbol: ts.Symbol, program: ts.Program, sourceFiles: readonly ts.SourceFile[], cancellationToken: ts.CancellationToken, options: Options, sourceFilesSet: ts.ReadonlySet<string>) {
        const moduleSourceFile = (symbol.flags & ts.SymbolFlags.Module) && symbol.declarations && ts.find(symbol.declarations, ts.isSourceFile);
        if (!moduleSourceFile) return undefined;
        const exportEquals = symbol.exports!.get(ts.InternalSymbolName.ExportEquals);
        // If !!exportEquals, we're about to add references to `import("mod")` anyway, so don't double-count them.
        const moduleReferences = getReferencedSymbolsForModule(program, symbol, !!exportEquals, sourceFiles, sourceFilesSet);
        if (!exportEquals || !sourceFilesSet.has(moduleSourceFile.fileName)) return moduleReferences;
        // Continue to get references to 'export ='.
        const checker = program.getTypeChecker();
        symbol = ts.skipAlias(exportEquals, checker);
        return mergeReferences(program, moduleReferences, getReferencedSymbolsForSymbol(symbol, /*node*/ undefined, sourceFiles, sourceFilesSet, checker, cancellationToken, options));
    }

    /**
     * Merges the references by sorting them (by file index in sourceFiles and their location in it) that point to same definition symbol
     */
    function mergeReferences(program: ts.Program, ...referencesToMerge: (SymbolAndEntries[] | undefined)[]): SymbolAndEntries[] | undefined {
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
                const refIndex = ts.findIndex(result, ref => !!ref.definition &&
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
                            return ts.compareValues(entry1File, entry2File);
                        }

                        const entry1Span = getTextSpanOfEntry(entry1);
                        const entry2Span = getTextSpanOfEntry(entry2);
                        return entry1Span.start !== entry2Span.start ?
                            ts.compareValues(entry1Span.start, entry2Span.start) :
                            ts.compareValues(entry1Span.length, entry2Span.length);
                    })
                };
            }
        }
        return result;
    }

    function getSourceFileIndexOfEntry(program: ts.Program, entry: Entry) {
        const sourceFile = entry.kind === EntryKind.Span ?
            program.getSourceFile(entry.fileName)! :
            entry.node.getSourceFile();
        return program.getSourceFiles().indexOf(sourceFile);
    }

    function getReferencedSymbolsForModule(program: ts.Program, symbol: ts.Symbol, excludeImportTypeOfExportEquals: boolean, sourceFiles: readonly ts.SourceFile[], sourceFilesSet: ts.ReadonlySet<string>): SymbolAndEntries[] {
        ts.Debug.assert(!!symbol.valueDeclaration);

        const references = ts.mapDefined<ts.FindAllReferences.ModuleReference, Entry>(ts.FindAllReferences.findModuleReferences(program, sourceFiles, symbol), reference => {
            if (reference.kind === "import") {
                const parent = reference.literal.parent;
                if (ts.isLiteralTypeNode(parent)) {
                    const importType = ts.cast(parent.parent, ts.isImportTypeNode);
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
                    textSpan: ts.createTextSpanFromRange(reference.ref),
                };
            }
        });

        if (symbol.declarations) {
            for (const decl of symbol.declarations) {
                switch (decl.kind) {
                    case ts.SyntaxKind.SourceFile:
                        // Don't include the source file itself. (This may not be ideal behavior, but awkward to include an entire file as a reference.)
                        break;
                    case ts.SyntaxKind.ModuleDeclaration:
                        if (sourceFilesSet.has(decl.getSourceFile().fileName)) {
                            references.push(nodeEntry((decl as ts.ModuleDeclaration).name));
                        }
                        break;
                    default:
                        // This may be merged with something.
                        ts.Debug.assert(!!(symbol.flags & ts.SymbolFlags.Transient), "Expected a module symbol to be declared by a SourceFile or ModuleDeclaration.");
                }
            }
        }

        const exported = symbol.exports!.get(ts.InternalSymbolName.ExportEquals);
        if (exported?.declarations) {
            for (const decl of exported.declarations) {
                const sourceFile = decl.getSourceFile();
                if (sourceFilesSet.has(sourceFile.fileName)) {
                    // At `module.exports = ...`, reference node is `module`
                    const node = ts.isBinaryExpression(decl) && ts.isPropertyAccessExpression(decl.left) ? decl.left.expression :
                        ts.isExportAssignment(decl) ? ts.Debug.checkDefined(ts.findChildOfKind(decl, ts.SyntaxKind.ExportKeyword, sourceFile)) :
                        ts.getNameOfDeclaration(decl) || decl;
                    references.push(nodeEntry(node));
                }
            }
        }

        return references.length ? [{ definition: { type: DefinitionKind.Symbol, symbol }, references }] : ts.emptyArray;
    }

    /** As in a `readonly prop: any` or `constructor(readonly prop: any)`, not a `readonly any[]`. */
    function isReadonlyTypeOperator(node: ts.Node): boolean {
        return node.kind === ts.SyntaxKind.ReadonlyKeyword
            && ts.isTypeOperatorNode(node.parent)
            && node.parent.operator === ts.SyntaxKind.ReadonlyKeyword;
    }

    /** getReferencedSymbols for special node kinds. */
    function getReferencedSymbolsSpecial(node: ts.Node, sourceFiles: readonly ts.SourceFile[], cancellationToken: ts.CancellationToken): SymbolAndEntries[] | undefined {
        if (ts.isTypeKeyword(node.kind)) {
            // A void expression (i.e., `void foo()`) is not special, but the `void` type is.
            if (node.kind === ts.SyntaxKind.VoidKeyword && ts.isVoidExpression(node.parent)) {
                return undefined;
            }

            // A modifier readonly (like on a property declaration) is not special;
            // a readonly type keyword (like `readonly string[]`) is.
            if (node.kind === ts.SyntaxKind.ReadonlyKeyword && !isReadonlyTypeOperator(node)) {
                return undefined;
            }
            // Likewise, when we *are* looking for a special keyword, make sure we
            // *don’t* include readonly member modifiers.
            return getAllReferencesForKeyword(
                sourceFiles,
                node.kind,
                cancellationToken,
                node.kind === ts.SyntaxKind.ReadonlyKeyword ? isReadonlyTypeOperator : undefined);
        }

        if (ts.isImportMeta(node.parent) && node.parent.name === node) {
            return getAllReferencesForImportMeta(sourceFiles, cancellationToken);
        }

        if (ts.isStaticModifier(node) && ts.isClassStaticBlockDeclaration(node.parent)) {
            return [{ definition: { type: DefinitionKind.Keyword, node }, references: [nodeEntry(node)] }];
        }

        // Labels
        if (ts.isJumpStatementTarget(node)) {
            const labelDefinition = ts.getTargetLabel(node.parent, node.text);
            // if we have a label definition, look within its statement for references, if not, then
            // the label is undefined and we have no results..
            return labelDefinition && getLabelReferencesInNode(labelDefinition.parent, labelDefinition);
        }
        else if (ts.isLabelOfLabeledStatement(node)) {
            // it is a label definition and not a target, search within the parent labeledStatement
            return getLabelReferencesInNode(node.parent, node);
        }

        if (ts.isThis(node)) {
            return getReferencesForThisKeyword(node, sourceFiles, cancellationToken);
        }

        if (node.kind === ts.SyntaxKind.SuperKeyword) {
            return getReferencesForSuperKeyword(node);
        }

        return undefined;
    }

    /** Core find-all-references algorithm for a normal symbol. */
    function getReferencedSymbolsForSymbol(originalSymbol: ts.Symbol, node: ts.Node | undefined, sourceFiles: readonly ts.SourceFile[], sourceFilesSet: ts.ReadonlySet<string>, checker: ts.TypeChecker, cancellationToken: ts.CancellationToken, options: Options): SymbolAndEntries[] {
        const symbol = node && skipPastExportOrImportSpecifierOrUnion(originalSymbol, node, checker, /*useLocalSymbolForExportSpecifier*/ !isForRenameWithPrefixAndSuffixText(options)) || originalSymbol;

        // Compute the meaning from the location and the symbol it references
        const searchMeaning = node ? getIntersectingMeaningFromDeclarations(node, symbol) : ts.SemanticMeaning.All;
        const result: SymbolAndEntries[] = [];
        const state = new State(sourceFiles, sourceFilesSet, node ? getSpecialSearchKind(node) : SpecialSearchKind.None, checker, cancellationToken, searchMeaning, options, result);

        const exportSpecifier = !isForRenameWithPrefixAndSuffixText(options) || !symbol.declarations ? undefined : ts.find(symbol.declarations, ts.isExportSpecifier);
        if (exportSpecifier) {
            // When renaming at an export specifier, rename the export and not the thing being exported.
            getReferencesAtExportSpecifier(exportSpecifier.name, symbol, exportSpecifier, state.createSearch(node, originalSymbol, /*comingFrom*/ undefined), state, /*addReferencesHere*/ true, /*alwaysGetReferences*/ true);
        }
        else if (node && node.kind === ts.SyntaxKind.DefaultKeyword && symbol.escapedName === ts.InternalSymbolName.Default && symbol.parent) {
            addReference(node, symbol, state);
            searchForImportsOfExport(node, symbol, { exportingModuleSymbol: symbol.parent, exportKind: ts.FindAllReferences.ExportKind.Default }, state);
        }
        else {
            const search = state.createSearch(node, symbol, /*comingFrom*/ undefined, { allSearchSymbols: node ? populateSearchSymbolSet(symbol, node, checker, options.use === FindReferencesUse.Rename, !!options.providePrefixAndSuffixTextForRename, !!options.implementations) : [symbol] });
            getReferencesInContainerOrFiles(symbol, state, search);
        }

        return result;
    }

    function getReferencesInContainerOrFiles(symbol: ts.Symbol, state: State, search: Search): void {
        // Try to get the smallest valid scope that we can limit our search to;
        // otherwise we'll need to search globally (i.e. include each file).
        const scope = getSymbolScope(symbol);
        if (scope) {
            getReferencesInContainer(scope, scope.getSourceFile(), search, state, /*addReferencesHere*/ !(ts.isSourceFile(scope) && !ts.contains(state.sourceFiles, scope)));
        }
        else {
            // Global search
            for (const sourceFile of state.sourceFiles) {
                state.cancellationToken.throwIfCancellationRequested();
                searchForName(sourceFile, search, state);
            }
        }
    }

    function getSpecialSearchKind(node: ts.Node): SpecialSearchKind {
        switch (node.kind) {
            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.ConstructorKeyword:
                return SpecialSearchKind.Constructor;
            case ts.SyntaxKind.Identifier:
                if (ts.isClassLike(node.parent)) {
                    ts.Debug.assert(node.parent.name === node);
                    return SpecialSearchKind.Class;
                }
                // falls through
            default:
                return SpecialSearchKind.None;
        }
    }

    /** Handle a few special cases relating to export/import specifiers. */
    function skipPastExportOrImportSpecifierOrUnion(symbol: ts.Symbol, node: ts.Node, checker: ts.TypeChecker, useLocalSymbolForExportSpecifier: boolean): ts.Symbol | undefined {
        const { parent } = node;
        if (ts.isExportSpecifier(parent) && useLocalSymbolForExportSpecifier) {
            return getLocalSymbolForExportSpecifier(node as ts.Identifier, symbol, parent, checker);
        }
        // If the symbol is declared as part of a declaration like `{ type: "a" } | { type: "b" }`, use the property on the union type to get more references.
        return ts.firstDefined(symbol.declarations, decl => {
            if (!decl.parent) {
                // Ignore UMD module and global merge
                if (symbol.flags & ts.SymbolFlags.Transient) return undefined;
                // Assertions for GH#21814. We should be handling SourceFile symbols in `getReferencedSymbolsForModule` instead of getting here.
                ts.Debug.fail(`Unexpected symbol at ${ts.Debug.formatSyntaxKind(node.kind)}: ${ts.Debug.formatSymbol(symbol)}`);
            }
            return ts.isTypeLiteralNode(decl.parent) && ts.isUnionTypeNode(decl.parent.parent)
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
        readonly comingFrom?: ts.FindAllReferences.ImportExport;

        readonly symbol: ts.Symbol;
        readonly text: string;
        readonly escapedText: ts.__String;
        /** Only set if `options.implementations` is true. These are the symbols checked to get the implementations of a property access. */
        readonly parents: readonly ts.Symbol[] | undefined;
        readonly allSearchSymbols: readonly ts.Symbol[];

        /**
         * Whether a symbol is in the search set.
         * Do not compare directly to `symbol` because there may be related symbols to search for. See `populateSearchSymbolSet`.
         */
        includes(symbol: ts.Symbol): boolean;
    }

    const enum SpecialSearchKind {
        None,
        Constructor,
        Class,
    }

    function getNonModuleSymbolOfMergedModuleSymbol(symbol: ts.Symbol) {
        if (!(symbol.flags & (ts.SymbolFlags.Module | ts.SymbolFlags.Transient))) return undefined;
        const decl = symbol.declarations && ts.find(symbol.declarations, d => !ts.isSourceFile(d) && !ts.isModuleDeclaration(d));
        return decl && decl.symbol;
    }

    /**
     * Holds all state needed for the finding references.
     * Unlike `Search`, there is only one `State`.
     */
    class State {
        /** Cache for `explicitlyinheritsFrom`. */
        readonly inheritsFromCache = new ts.Map<string, boolean>();

        /**
         * Type nodes can contain multiple references to the same type. For example:
         *      let x: Foo & (Foo & Bar) = ...
         * Because we are returning the implementation locations and not the identifier locations,
         * duplicate entries would be returned here as each of the type references is part of
         * the same implementation. For that reason, check before we add a new entry.
         */
        readonly markSeenContainingTypeReference = ts.nodeSeenTracker();

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
        readonly markSeenReExportRHS = ts.nodeSeenTracker();

        constructor(
            readonly sourceFiles: readonly ts.SourceFile[],
            readonly sourceFilesSet: ts.ReadonlySet<string>,
            readonly specialSearchKind: SpecialSearchKind,
            readonly checker: ts.TypeChecker,
            readonly cancellationToken: ts.CancellationToken,
            readonly searchMeaning: ts.SemanticMeaning,
            readonly options: Options,
            private readonly result: ts.Push<SymbolAndEntries>) {
        }

        includesSourceFile(sourceFile: ts.SourceFile): boolean {
            return this.sourceFilesSet.has(sourceFile.fileName);
        }

        private importTracker: ts.FindAllReferences.ImportTracker | undefined;
        /** Gets every place to look for references of an exported symbols. See `ImportsResult` in `importTracker.ts` for more documentation. */
        getImportSearches(exportSymbol: ts.Symbol, exportInfo: ts.FindAllReferences.ExportInfo): ts.FindAllReferences.ImportsResult {
            if (!this.importTracker) this.importTracker = ts.FindAllReferences.createImportTracker(this.sourceFiles, this.sourceFilesSet, this.checker, this.cancellationToken);
            return this.importTracker(exportSymbol, exportInfo, this.options.use === FindReferencesUse.Rename);
        }

        /** @param allSearchSymbols set of additional symbols for use by `includes`. */
        createSearch(location: ts.Node | undefined, symbol: ts.Symbol, comingFrom: ts.FindAllReferences.ImportExport | undefined, searchOptions: { text?: string, allSearchSymbols?: ts.Symbol[] } = {}): Search {
            // Note: if this is an external module symbol, the name doesn't include quotes.
            // Note: getLocalSymbolForExportDefault handles `export default class C {}`, but not `export default C` or `export { C as default }`.
            // The other two forms seem to be handled downstream (e.g. in `skipPastExportOrImportSpecifier`), so special-casing the first form
            // here appears to be intentional).
            const {
                text = ts.stripQuotes(ts.symbolName(ts.getLocalSymbolForExportDefault(symbol) || getNonModuleSymbolOfMergedModuleSymbol(symbol) || symbol)),
                allSearchSymbols = [symbol],
            } = searchOptions;
            const escapedText = ts.escapeLeadingUnderscores(text);
            const parents = this.options.implementations && location ? getParentSymbolsOfPropertyAccess(location, symbol, this.checker) : undefined;
            return { symbol, comingFrom, text, escapedText, parents, allSearchSymbols, includes: sym => ts.contains(allSearchSymbols, sym) };
        }

        private readonly symbolIdToReferences: Entry[][] = [];
        /**
         * Callback to add references for a particular searched symbol.
         * This initializes a reference group, so only call this if you will add at least one reference.
         */
        referenceAdder(searchSymbol: ts.Symbol): (node: ts.Node, kind?: NodeEntryKind) => void {
            const symbolId = ts.getSymbolId(searchSymbol);
            let references = this.symbolIdToReferences[symbolId];
            if (!references) {
                references = this.symbolIdToReferences[symbolId] = [];
                this.result.push({ definition: { type: DefinitionKind.Symbol, symbol: searchSymbol }, references });
            }
            return (node, kind) => references.push(nodeEntry(node, kind));
        }

        /** Add a reference with no associated definition. */
        addStringOrCommentReference(fileName: string, textSpan: ts.TextSpan): void {
            this.result.push({
                definition: undefined,
                references: [{ kind: EntryKind.Span, fileName, textSpan }]
            });
        }

        // Source file ID → symbol ID → Whether the symbol has been searched for in the source file.
        private readonly sourceFileToSeenSymbols: ts.Set<number>[] = [];
        /** Returns `true` the first time we search for a symbol in a file and `false` afterwards. */
        markSearchedSymbols(sourceFile: ts.SourceFile, symbols: readonly ts.Symbol[]): boolean {
            const sourceId = ts.getNodeId(sourceFile);
            const seenSymbols = this.sourceFileToSeenSymbols[sourceId] || (this.sourceFileToSeenSymbols[sourceId] = new ts.Set<number>());

            let anyNewSymbols = false;
            for (const sym of symbols) {
                anyNewSymbols = ts.tryAddToSet(seenSymbols, ts.getSymbolId(sym)) || anyNewSymbols;
            }
            return anyNewSymbols;
        }
    }

    /** Search for all imports of a given exported symbol using `State.getImportSearches`. */
    function searchForImportsOfExport(exportLocation: ts.Node, exportSymbol: ts.Symbol, exportInfo: ts.FindAllReferences.ExportInfo, state: State): void {
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
            getReferencesInSourceFile(importLocation.getSourceFile(), state.createSearch(importLocation, importSymbol, ts.FindAllReferences.ImportExport.Export), state);
        }

        if (indirectUsers.length) {
            let indirectSearch: Search | undefined;
            switch (exportInfo.exportKind) {
                case ts.FindAllReferences.ExportKind.Named:
                    indirectSearch = state.createSearch(exportLocation, exportSymbol, ts.FindAllReferences.ImportExport.Export);
                    break;
                case ts.FindAllReferences.ExportKind.Default:
                    // Search for a property access to '.default'. This can't be renamed.
                    indirectSearch = state.options.use === FindReferencesUse.Rename ? undefined : state.createSearch(exportLocation, exportSymbol, ts.FindAllReferences.ImportExport.Export, { text: "default" });
                    break;
                case ts.FindAllReferences.ExportKind.ExportEquals:
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
        sourceFiles: readonly ts.SourceFile[],
        checker: ts.TypeChecker,
        cancellationToken: ts.CancellationToken | undefined,
        exportSymbol: ts.Symbol,
        exportingModuleSymbol: ts.Symbol,
        exportName: string,
        isDefaultExport: boolean,
        cb: (ref: ts.Identifier) => void,
    ): void {
        const importTracker = ts.FindAllReferences.createImportTracker(sourceFiles, new ts.Set(sourceFiles.map(f => f.fileName)), checker, cancellationToken);
        const { importSearches, indirectUsers, singleReferences } = importTracker(exportSymbol, { exportKind: isDefaultExport ? ts.FindAllReferences.ExportKind.Default : ts.FindAllReferences.ExportKind.Named, exportingModuleSymbol }, /*isForRename*/ false);
        for (const [importLocation] of importSearches) {
            cb(importLocation);
        }
        for (const singleReference of singleReferences) {
            if (ts.isIdentifier(singleReference) && ts.isImportTypeNode(singleReference.parent)) {
                cb(singleReference);
            }
        }
        for (const indirectUser of indirectUsers) {
            for (const node of getPossibleSymbolReferenceNodes(indirectUser, isDefaultExport ? "default" : exportName)) {
                // Import specifiers should be handled by importSearches
                const symbol = checker.getSymbolAtLocation(node);
                const hasExportAssignmentDeclaration = ts.some(symbol?.declarations, d => ts.tryCast(d, ts.isExportAssignment) ? true : false);
                if (ts.isIdentifier(node) && !ts.isImportOrExportSpecifier(node.parent) && (symbol === exportSymbol || hasExportAssignmentDeclaration)) {
                    cb(node);
                }
            }
        }
    }

    function shouldAddSingleReference(singleRef: ts.Identifier | ts.StringLiteral, state: State): boolean {
        if (!hasMatchingMeaning(singleRef, state)) return false;
        if (state.options.use !== FindReferencesUse.Rename) return true;
        // Don't rename an import type `import("./module-name")` when renaming `name` in `export = name;`
        if (!ts.isIdentifier(singleRef)) return false;
        // At `default` in `import { default as x }` or `export { default as x }`, do add a reference, but do not rename.
        return !(ts.isImportOrExportSpecifier(singleRef.parent) && singleRef.escapedText === ts.InternalSymbolName.Default);
    }

    // Go to the symbol we imported from and find references for it.
    function searchForImportedSymbol(symbol: ts.Symbol, state: State): void {
        if (!symbol.declarations) return;

        for (const declaration of symbol.declarations) {
            const exportingFile = declaration.getSourceFile();
            // Need to search in the file even if it's not in the search-file set, because it might export the symbol.
            getReferencesInSourceFile(exportingFile, state.createSearch(declaration, symbol, ts.FindAllReferences.ImportExport.Import), state, state.includesSourceFile(exportingFile));
        }
    }

    /** Search for all occurrences of an identifier in a source file (and filter out the ones that match). */
    function searchForName(sourceFile: ts.SourceFile, search: Search, state: State): void {
        if (ts.getNameTable(sourceFile).get(search.escapedText) !== undefined) {
            getReferencesInSourceFile(sourceFile, search, state);
        }
    }

    function getPropertySymbolOfDestructuringAssignment(location: ts.Node, checker: ts.TypeChecker): ts.Symbol | undefined {
        return ts.isArrayLiteralOrObjectLiteralDestructuringPattern(location.parent.parent)
            ? checker.getPropertySymbolOfDestructuringAssignment(location as ts.Identifier)
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
    function getSymbolScope(symbol: ts.Symbol): ts.Node | undefined {
        // If this is the symbol of a named function expression or named class expression,
        // then named references are limited to its own scope.
        const { declarations, flags, parent, valueDeclaration } = symbol;
        if (valueDeclaration && (valueDeclaration.kind === ts.SyntaxKind.FunctionExpression || valueDeclaration.kind === ts.SyntaxKind.ClassExpression)) {
            return valueDeclaration;
        }

        if (!declarations) {
            return undefined;
        }

        // If this is private property or method, the scope is the containing class
        if (flags & (ts.SymbolFlags.Property | ts.SymbolFlags.Method)) {
            const privateDeclaration = ts.find(declarations, d => ts.hasEffectiveModifier(d, ts.ModifierFlags.Private) || ts.isPrivateIdentifierClassElementDeclaration(d));
            if (privateDeclaration) {
                return ts.getAncestor(privateDeclaration, ts.SyntaxKind.ClassDeclaration);
            }
            // Else this is a public property and could be accessed from anywhere.
            return undefined;
        }

        // If symbol is of object binding pattern element without property name we would want to
        // look for property too and that could be anywhere
        if (declarations.some(ts.isObjectBindingElementWithoutPropertyName)) {
            return undefined;
        }

        /*
        If the symbol has a parent, it's globally visible unless:
        - It's a private property (handled above).
        - It's a type parameter.
        - The parent is an external module: then we should only search in the module (and recurse on the export later).
        - But if the parent has `export as namespace`, the symbol is globally visible through that namespace.
        */
        const exposedByParent = parent && !(symbol.flags & ts.SymbolFlags.TypeParameter);
        if (exposedByParent && !(ts.isExternalModuleSymbol(parent) && !parent.globalExports)) {
            return undefined;
        }

        let scope: ts.Node | undefined;
        for (const declaration of declarations) {
            const container = ts.getContainerNode(declaration);
            if (scope && scope !== container) {
                // Different declarations have different containers, bail out
                return undefined;
            }

            if (!container || container.kind === ts.SyntaxKind.SourceFile && !ts.isExternalOrCommonJsModule(container as ts.SourceFile)) {
                // This is a global variable and not an external module, any declaration defined
                // within this scope is visible outside the file
                return undefined;
            }

            scope = container;
            if (ts.isFunctionExpression(scope)) {
                let next: ts.Node | undefined;
                while (next = ts.getNextJSDocCommentLocation(scope)) {
                    scope = next;
                }
            }
        }

        // If symbol.parent, this means we are in an export of an external module. (Otherwise we would have returned `undefined` above.)
        // For an export of a module, we may be in a declaration file, and it may be accessed elsewhere. E.g.:
        //     declare module "a" { export type T = number; }
        //     declare module "b" { import { T } from "a"; export const x: T; }
        // So we must search the whole source file. (Because we will mark the source file as seen, we we won't return to it when searching for imports.)
        return exposedByParent ? scope!.getSourceFile() : scope; // TODO: GH#18217
    }

    /** Used as a quick check for whether a symbol is used at all in a file (besides its definition). */
    export function isSymbolReferencedInFile(definition: ts.Identifier, checker: ts.TypeChecker, sourceFile: ts.SourceFile, searchContainer: ts.Node = sourceFile): boolean {
        return eachSymbolReferenceInFile(definition, checker, sourceFile, () => true, searchContainer) || false;
    }

    export function eachSymbolReferenceInFile<T>(definition: ts.Identifier, checker: ts.TypeChecker, sourceFile: ts.SourceFile, cb: (token: ts.Identifier) => T, searchContainer: ts.Node = sourceFile): T | undefined {
        const symbol = ts.isParameterPropertyDeclaration(definition.parent, definition.parent.parent)
            ? ts.first(checker.getSymbolsOfParameterPropertyDeclaration(definition.parent, definition.text))
            : checker.getSymbolAtLocation(definition);
        if (!symbol) return undefined;
        for (const token of getPossibleSymbolReferenceNodes(sourceFile, symbol.name, searchContainer)) {
            if (!ts.isIdentifier(token) || token === definition || token.escapedText !== definition.escapedText) continue;
            const referenceSymbol = checker.getSymbolAtLocation(token)!;
            if (referenceSymbol === symbol
                || checker.getShorthandAssignmentValueSymbol(token.parent) === symbol
                || ts.isExportSpecifier(token.parent) && getLocalSymbolForExportSpecifier(token, referenceSymbol, token.parent, checker) === symbol) {
                const res = cb(token);
                if (res) return res;
            }
        }
    }

    export function getTopMostDeclarationNamesInFile(declarationName: string, sourceFile: ts.SourceFile): readonly ts.Node[] {
        const candidates = ts.filter(getPossibleSymbolReferenceNodes(sourceFile, declarationName), name => !!ts.getDeclarationFromName(name));
        return candidates.reduce((topMost, decl) => {
            const depth = getDepth(decl);
            if (!ts.some(topMost.declarationNames) || depth === topMost.depth) {
                topMost.declarationNames.push(decl);
                topMost.depth = depth;
            }
            else if (depth < topMost.depth) {
                topMost.declarationNames = [decl];
                topMost.depth = depth;
            }
            return topMost;
        }, { depth: Infinity, declarationNames: [] as ts.Node[] }).declarationNames;

        function getDepth(declaration: ts.Node | undefined) {
            let depth = 0;
            while (declaration) {
                declaration = ts.getContainerNode(declaration);
                depth++;
            }
            return depth;
        }
    }

    export function someSignatureUsage(
        signature: ts.SignatureDeclaration,
        sourceFiles: readonly ts.SourceFile[],
        checker: ts.TypeChecker,
        cb: (name: ts.Identifier, call?: ts.CallExpression) => boolean
    ): boolean {
        if (!signature.name || !ts.isIdentifier(signature.name)) return false;

        const symbol = ts.Debug.checkDefined(checker.getSymbolAtLocation(signature.name));

        for (const sourceFile of sourceFiles) {
            for (const name of getPossibleSymbolReferenceNodes(sourceFile, symbol.name)) {
                if (!ts.isIdentifier(name) || name === signature.name || name.escapedText !== signature.name.escapedText) continue;
                const called = ts.climbPastPropertyAccess(name);
                const call = ts.isCallExpression(called.parent) && called.parent.expression === called ? called.parent : undefined;
                const referenceSymbol = checker.getSymbolAtLocation(name);
                if (referenceSymbol && checker.getRootSymbols(referenceSymbol).some(s => s === symbol)) {
                    if (cb(name, call)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function getPossibleSymbolReferenceNodes(sourceFile: ts.SourceFile, symbolName: string, container: ts.Node = sourceFile): readonly ts.Node[] {
        return getPossibleSymbolReferencePositions(sourceFile, symbolName, container).map(pos => ts.getTouchingPropertyName(sourceFile, pos));
    }

    function getPossibleSymbolReferencePositions(sourceFile: ts.SourceFile, symbolName: string, container: ts.Node = sourceFile): readonly number[] {
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

            if ((position === 0 || !ts.isIdentifierPart(text.charCodeAt(position - 1), ts.ScriptTarget.Latest)) &&
                (endPosition === sourceLength || !ts.isIdentifierPart(text.charCodeAt(endPosition), ts.ScriptTarget.Latest))) {
                // Found a real match.  Keep searching.
                positions.push(position);
            }
            position = text.indexOf(symbolName, position + symbolNameLength + 1);
        }

        return positions;
    }

    function getLabelReferencesInNode(container: ts.Node, targetLabel: ts.Identifier): SymbolAndEntries[] {
        const sourceFile = container.getSourceFile();
        const labelName = targetLabel.text;
        const references = ts.mapDefined(getPossibleSymbolReferenceNodes(sourceFile, labelName, container), node =>
            // Only pick labels that are either the target label, or have a target that is the target label
            node === targetLabel || (ts.isJumpStatementTarget(node) && ts.getTargetLabel(node, labelName) === targetLabel) ? nodeEntry(node) : undefined);
        return [{ definition: { type: DefinitionKind.Label, node: targetLabel }, references }];
    }

    function isValidReferencePosition(node: ts.Node, searchSymbolName: string): boolean {
        // Compare the length so we filter out strict superstrings of the symbol we are looking for
        switch (node.kind) {
            case ts.SyntaxKind.PrivateIdentifier:
                if (ts.isJSDocMemberName(node.parent)) {
                    return true;
                }
                // falls through I guess
            case ts.SyntaxKind.Identifier:
                return (node as ts.PrivateIdentifier | ts.Identifier).text.length === searchSymbolName.length;
            case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
            case ts.SyntaxKind.StringLiteral: {
                const str = node as ts.StringLiteralLike;
                return (ts.isLiteralNameOfPropertyDeclarationOrIndexAccess(str) || ts.isNameOfModuleDeclaration(node) || ts.isExpressionOfExternalModuleImportEqualsDeclaration(node) || (ts.isCallExpression(node.parent) && ts.isBindableObjectDefinePropertyCall(node.parent) && node.parent.arguments[1] === node)) &&
                    str.text.length === searchSymbolName.length;
            }

            case ts.SyntaxKind.NumericLiteral:
                return ts.isLiteralNameOfPropertyDeclarationOrIndexAccess(node as ts.NumericLiteral) && (node as ts.NumericLiteral).text.length === searchSymbolName.length;

            case ts.SyntaxKind.DefaultKeyword:
                return "default".length === searchSymbolName.length;

            default:
                return false;
        }
    }

    function getAllReferencesForImportMeta(sourceFiles: readonly ts.SourceFile[], cancellationToken: ts.CancellationToken): SymbolAndEntries[] | undefined {
        const references = ts.flatMap(sourceFiles, sourceFile => {
            cancellationToken.throwIfCancellationRequested();
            return ts.mapDefined(getPossibleSymbolReferenceNodes(sourceFile, "meta", sourceFile), node => {
                const parent = node.parent;
                if (ts.isImportMeta(parent)) {
                    return nodeEntry(parent);
                }
            });
        });
        return references.length ? [{ definition: { type: DefinitionKind.Keyword, node: references[0].node }, references }] : undefined;
    }

    function getAllReferencesForKeyword(sourceFiles: readonly ts.SourceFile[], keywordKind: ts.SyntaxKind, cancellationToken: ts.CancellationToken, filter?: (node: ts.Node) => boolean): SymbolAndEntries[] | undefined {
        const references = ts.flatMap(sourceFiles, sourceFile => {
            cancellationToken.throwIfCancellationRequested();
            return ts.mapDefined(getPossibleSymbolReferenceNodes(sourceFile, ts.tokenToString(keywordKind)!, sourceFile), referenceLocation => {
                if (referenceLocation.kind === keywordKind && (!filter || filter(referenceLocation))) {
                    return nodeEntry(referenceLocation);
                }
            });
        });
        return references.length ? [{ definition: { type: DefinitionKind.Keyword, node: references[0].node }, references }] : undefined;
    }

    function getReferencesInSourceFile(sourceFile: ts.SourceFile, search: Search, state: State, addReferencesHere = true): void {
        state.cancellationToken.throwIfCancellationRequested();
        return getReferencesInContainer(sourceFile, sourceFile, search, state, addReferencesHere);
    }

    /**
     * Search within node "container" for references for a search value, where the search value is defined as a
     * tuple of(searchSymbol, searchText, searchLocation, and searchMeaning).
     * searchLocation: a node where the search value
     */
    function getReferencesInContainer(container: ts.Node, sourceFile: ts.SourceFile, search: Search, state: State, addReferencesHere: boolean): void {
        if (!state.markSearchedSymbols(sourceFile, search.allSearchSymbols)) {
            return;
        }

        for (const position of getPossibleSymbolReferencePositions(sourceFile, search.text, container)) {
            getReferencesAtLocation(sourceFile, position, search, state, addReferencesHere);
        }
    }

    function hasMatchingMeaning(referenceLocation: ts.Node, state: State): boolean {
        return !!(ts.getMeaningFromLocation(referenceLocation) & state.searchMeaning);
    }

    function getReferencesAtLocation(sourceFile: ts.SourceFile, position: number, search: Search, state: State, addReferencesHere: boolean): void {
        const referenceLocation = ts.getTouchingPropertyName(sourceFile, position);

        if (!isValidReferencePosition(referenceLocation, search.text)) {
            // This wasn't the start of a token.  Check to see if it might be a
            // match in a comment or string if that's what the caller is asking
            // for.
            if (!state.options.implementations && (state.options.findInStrings && ts.isInString(sourceFile, position) || state.options.findInComments && ts.isInNonReferenceComment(sourceFile, position))) {
                // In the case where we're looking inside comments/strings, we don't have
                // an actual definition.  So just use 'undefined' here.  Features like
                // 'Rename' won't care (as they ignore the definitions), and features like
                // 'FindReferences' will just filter out these results.
                state.addStringOrCommentReference(sourceFile.fileName, ts.createTextSpan(position, search.text.length));
            }

            return;
        }

        if (!hasMatchingMeaning(referenceLocation, state)) return;

        let referenceSymbol = state.checker.getSymbolAtLocation(referenceLocation);
        if (!referenceSymbol) {
            return;
        }

        const parent = referenceLocation.parent;
        if (ts.isImportSpecifier(parent) && parent.propertyName === referenceLocation) {
            // This is added through `singleReferences` in ImportsResult. If we happen to see it again, don't add it again.
            return;
        }

        if (ts.isExportSpecifier(parent)) {
            ts.Debug.assert(referenceLocation.kind === ts.SyntaxKind.Identifier);
            getReferencesAtExportSpecifier(referenceLocation as ts.Identifier, referenceSymbol, parent, search, state, addReferencesHere);
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
                ts.Debug.assertNever(state.specialSearchKind);
        }

        // Use the parent symbol if the location is commonjs require syntax on javascript files only.
        if (ts.isInJSFile(referenceLocation)
            && referenceLocation.parent.kind === ts.SyntaxKind.BindingElement
            && ts.isVariableDeclarationInitializedToBareOrAccessedRequire(referenceLocation.parent.parent.parent)) {
            referenceSymbol = referenceLocation.parent.symbol;
            // The parent will not have a symbol if it's an ObjectBindingPattern (when destructuring is used).  In
            // this case, just skip it, since the bound identifiers are not an alias of the import.
            if (!referenceSymbol) return;
        }

        getImportOrExportReferences(referenceLocation, referenceSymbol, search, state);
    }

    function getReferencesAtExportSpecifier(
        referenceLocation: ts.Identifier,
        referenceSymbol: ts.Symbol,
        exportSpecifier: ts.ExportSpecifier,
        search: Search,
        state: State,
        addReferencesHere: boolean,
        alwaysGetReferences?: boolean,
    ): void {
        ts.Debug.assert(!alwaysGetReferences || !!state.options.providePrefixAndSuffixTextForRename, "If alwaysGetReferences is true, then prefix/suffix text must be enabled");

        const { parent, propertyName, name } = exportSpecifier;
        const exportDeclaration = parent.parent;
        const localSymbol = getLocalSymbolForExportSpecifier(referenceLocation, referenceSymbol, exportSpecifier, state.checker);
        if (!alwaysGetReferences && !search.includes(localSymbol)) {
            return;
        }

        if (!propertyName) {
            // Don't rename at `export { default } from "m";`. (but do continue to search for imports of the re-export)
            if (!(state.options.use === FindReferencesUse.Rename && (name.escapedText === ts.InternalSymbolName.Default))) {
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
                addReference(name, ts.Debug.checkDefined(exportSpecifier.symbol), state);
            }
        }
        else {
            if (state.markSeenReExportRHS(referenceLocation)) {
                addRef();
            }
        }

        // For `export { foo as bar }`, rename `foo`, but not `bar`.
        if (!isForRenameWithPrefixAndSuffixText(state.options) || alwaysGetReferences) {
            const isDefaultExport = referenceLocation.originalKeywordKind === ts.SyntaxKind.DefaultKeyword
                || exportSpecifier.name.originalKeywordKind === ts.SyntaxKind.DefaultKeyword;
            const exportKind = isDefaultExport ? ts.FindAllReferences.ExportKind.Default : ts.FindAllReferences.ExportKind.Named;
            const exportSymbol = ts.Debug.checkDefined(exportSpecifier.symbol);
            const exportInfo = ts.FindAllReferences.getExportInfo(exportSymbol, exportKind, state.checker);
            if (exportInfo) {
                searchForImportsOfExport(referenceLocation, exportSymbol, exportInfo, state);
            }
        }

        // At `export { x } from "foo"`, also search for the imported symbol `"foo".x`.
        if (search.comingFrom !== ts.FindAllReferences.ImportExport.Export && exportDeclaration.moduleSpecifier && !propertyName && !isForRenameWithPrefixAndSuffixText(state.options)) {
            const imported = state.checker.getExportSpecifierLocalTargetSymbol(exportSpecifier);
            if (imported) searchForImportedSymbol(imported, state);
        }

        function addRef() {
            if (addReferencesHere) addReference(referenceLocation, localSymbol, state);
        }
    }

    function getLocalSymbolForExportSpecifier(referenceLocation: ts.Identifier, referenceSymbol: ts.Symbol, exportSpecifier: ts.ExportSpecifier, checker: ts.TypeChecker): ts.Symbol {
        return isExportSpecifierAlias(referenceLocation, exportSpecifier) && checker.getExportSpecifierLocalTargetSymbol(exportSpecifier) || referenceSymbol;
    }

    function isExportSpecifierAlias(referenceLocation: ts.Identifier, exportSpecifier: ts.ExportSpecifier): boolean {
        const { parent, propertyName, name } = exportSpecifier;
        ts.Debug.assert(propertyName === referenceLocation || name === referenceLocation);
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

    function getImportOrExportReferences(referenceLocation: ts.Node, referenceSymbol: ts.Symbol, search: Search, state: State): void {
        const importOrExport = ts.FindAllReferences.getImportOrExportSymbol(referenceLocation, referenceSymbol, state.checker, search.comingFrom === ts.FindAllReferences.ImportExport.Export);
        if (!importOrExport) return;

        const { symbol } = importOrExport;

        if (importOrExport.kind === ts.FindAllReferences.ImportExport.Import) {
            if (!(isForRenameWithPrefixAndSuffixText(state.options))) {
                searchForImportedSymbol(symbol, state);
            }
        }
        else {
            searchForImportsOfExport(referenceLocation, symbol, importOrExport.exportInfo, state);
        }
    }

    function getReferenceForShorthandProperty({ flags, valueDeclaration }: ts.Symbol, search: Search, state: State): void {
        const shorthandValueSymbol = state.checker.getShorthandAssignmentValueSymbol(valueDeclaration)!;
        const name = valueDeclaration && ts.getNameOfDeclaration(valueDeclaration);
        /*
        * Because in short-hand property assignment, an identifier which stored as name of the short-hand property assignment
        * has two meanings: property name and property value. Therefore when we do findAllReference at the position where
        * an identifier is declared, the language service should return the position of the variable declaration as well as
        * the position in short-hand property assignment excluding property accessing. However, if we do findAllReference at the
        * position of property accessing, the referenceEntry of such position will be handled in the first case.
        */
        if (!(flags & ts.SymbolFlags.Transient) && name && search.includes(shorthandValueSymbol)) {
            addReference(name, shorthandValueSymbol, state);
        }
    }

    function addReference(referenceLocation: ts.Node, relatedSymbol: ts.Symbol | RelatedSymbol, state: State): void {
        const { kind, symbol } = "kind" in relatedSymbol ? relatedSymbol : { kind: undefined, symbol: relatedSymbol }; // eslint-disable-line local/no-in-operator

        // if rename symbol from default export anonymous function, for example `export default function() {}`, we do not need to add reference
        if (state.options.use === FindReferencesUse.Rename && referenceLocation.kind === ts.SyntaxKind.DefaultKeyword) {
            return;
        }

        const addRef = state.referenceAdder(symbol);
        if (state.options.implementations) {
            addImplementationReferences(referenceLocation, addRef, state);
        }
        else {
            addRef(referenceLocation, kind);
        }
    }

    /** Adds references when a constructor is used with `new this()` in its own class and `super()` calls in subclasses.  */
    function addConstructorReferences(referenceLocation: ts.Node, sourceFile: ts.SourceFile, search: Search, state: State): void {
        if (ts.isNewExpressionTarget(referenceLocation)) {
            addReference(referenceLocation, search.symbol, state);
        }

        const pusher = () => state.referenceAdder(search.symbol);

        if (ts.isClassLike(referenceLocation.parent)) {
            ts.Debug.assert(referenceLocation.kind === ts.SyntaxKind.DefaultKeyword || referenceLocation.parent.name === referenceLocation);
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

    function addClassStaticThisReferences(referenceLocation: ts.Node, search: Search, state: State): void {
        addReference(referenceLocation, search.symbol, state);
        const classLike = referenceLocation.parent;
        if (state.options.use === FindReferencesUse.Rename || !ts.isClassLike(classLike)) return;
        ts.Debug.assert(classLike.name === referenceLocation);
        const addRef = state.referenceAdder(search.symbol);
        for (const member of classLike.members) {
            if (!(ts.isMethodOrAccessor(member) && ts.isStatic(member))) {
                continue;
            }
            if (member.body) {
                member.body.forEachChild(function cb(node) {
                    if (node.kind === ts.SyntaxKind.ThisKeyword) {
                        addRef(node);
                    }
                    else if (!ts.isFunctionLike(node) && !ts.isClassLike(node)) {
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
    function findOwnConstructorReferences(classSymbol: ts.Symbol, sourceFile: ts.SourceFile, addNode: (node: ts.Node) => void): void {
        const constructorSymbol = getClassConstructorSymbol(classSymbol);
        if (constructorSymbol && constructorSymbol.declarations) {
            for (const decl of constructorSymbol.declarations) {
                const ctrKeyword = ts.findChildOfKind(decl, ts.SyntaxKind.ConstructorKeyword, sourceFile)!;
                ts.Debug.assert(decl.kind === ts.SyntaxKind.Constructor && !!ctrKeyword);
                addNode(ctrKeyword);
            }
        }

        if (classSymbol.exports) {
            classSymbol.exports.forEach(member => {
                const decl = member.valueDeclaration;
                if (decl && decl.kind === ts.SyntaxKind.MethodDeclaration) {
                    const body = (decl as ts.MethodDeclaration).body;
                    if (body) {
                        forEachDescendantOfKind(body, ts.SyntaxKind.ThisKeyword, thisKeyword => {
                            if (ts.isNewExpressionTarget(thisKeyword)) {
                                addNode(thisKeyword);
                            }
                        });
                    }
                }
            });
        }
    }

    function getClassConstructorSymbol(classSymbol: ts.Symbol): ts.Symbol | undefined {
        return classSymbol.members && classSymbol.members.get(ts.InternalSymbolName.Constructor);
    }

    /** Find references to `super` in the constructor of an extending class.  */
    function findSuperConstructorAccesses(classDeclaration: ts.ClassLikeDeclaration, addNode: (node: ts.Node) => void): void {
        const constructor = getClassConstructorSymbol(classDeclaration.symbol);
        if (!(constructor && constructor.declarations)) {
            return;
        }

        for (const decl of constructor.declarations) {
            ts.Debug.assert(decl.kind === ts.SyntaxKind.Constructor);
            const body = (decl as ts.ConstructorDeclaration).body;
            if (body) {
                forEachDescendantOfKind(body, ts.SyntaxKind.SuperKeyword, node => {
                    if (ts.isCallExpressionTarget(node)) {
                        addNode(node);
                    }
                });
            }
        }
    }

    function hasOwnConstructor(classDeclaration: ts.ClassLikeDeclaration): boolean {
        return !!getClassConstructorSymbol(classDeclaration.symbol);
    }

    function findInheritedConstructorReferences(classDeclaration: ts.ClassLikeDeclaration, state: State): void {
        if (hasOwnConstructor(classDeclaration)) return;
        const classSymbol = classDeclaration.symbol;
        const search = state.createSearch(/*location*/ undefined, classSymbol, /*comingFrom*/ undefined);
        getReferencesInContainerOrFiles(classSymbol, state, search);
    }

    function addImplementationReferences(refNode: ts.Node, addReference: (node: ts.Node) => void, state: State): void {
        // Check if we found a function/propertyAssignment/method with an implementation or initializer
        if (ts.isDeclarationName(refNode) && isImplementation(refNode.parent)) {
            addReference(refNode);
            return;
        }

        if (refNode.kind !== ts.SyntaxKind.Identifier) {
            return;
        }

        if (refNode.parent.kind === ts.SyntaxKind.ShorthandPropertyAssignment) {
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
        const typeNode = ts.findAncestor(refNode, a => !ts.isQualifiedName(a.parent) && !ts.isTypeNode(a.parent) && !ts.isTypeElement(a.parent))!;
        const typeHavingNode = typeNode.parent;
        if (ts.hasType(typeHavingNode) && typeHavingNode.type === typeNode && state.markSeenContainingTypeReference(typeHavingNode)) {
            if (ts.hasInitializer(typeHavingNode)) {
                addIfImplementation(typeHavingNode.initializer!);
            }
            else if (ts.isFunctionLike(typeHavingNode) && (typeHavingNode as ts.FunctionLikeDeclaration).body) {
                const body = (typeHavingNode as ts.FunctionLikeDeclaration).body!;
                if (body.kind === ts.SyntaxKind.Block) {
                    ts.forEachReturnStatement(body as ts.Block, returnStatement => {
                        if (returnStatement.expression) addIfImplementation(returnStatement.expression);
                    });
                }
                else {
                    addIfImplementation(body);
                }
            }
            else if (ts.isAssertionExpression(typeHavingNode)) {
                addIfImplementation(typeHavingNode.expression);
            }
        }

        function addIfImplementation(e: ts.Expression): void {
            if (isImplementationExpression(e)) addReference(e);
        }
    }

    function getContainingClassIfInHeritageClause(node: ts.Node): ts.ClassLikeDeclaration | ts.InterfaceDeclaration | undefined {
        return ts.isIdentifier(node) || ts.isPropertyAccessExpression(node) ? getContainingClassIfInHeritageClause(node.parent)
            : ts.isExpressionWithTypeArguments(node) ? ts.tryCast(node.parent.parent, ts.isClassLike) : undefined;
    }

    /**
     * Returns true if this is an expression that can be considered an implementation
     */
    function isImplementationExpression(node: ts.Expression): boolean {
        switch (node.kind) {
            case ts.SyntaxKind.ParenthesizedExpression:
                return isImplementationExpression((node as ts.ParenthesizedExpression).expression);
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.ObjectLiteralExpression:
            case ts.SyntaxKind.ClassExpression:
            case ts.SyntaxKind.ArrayLiteralExpression:
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
    function explicitlyInheritsFrom(symbol: ts.Symbol, parent: ts.Symbol, cachedResults: ts.ESMap<string, boolean>, checker: ts.TypeChecker): boolean {
        if (symbol === parent) {
            return true;
        }

        const key = ts.getSymbolId(symbol) + "," + ts.getSymbolId(parent);
        const cached = cachedResults.get(key);
        if (cached !== undefined) {
            return cached;
        }

        // Set the key so that we don't infinitely recurse
        cachedResults.set(key, false);

        const inherits = !!symbol.declarations && symbol.declarations.some(declaration =>
            ts.getAllSuperTypeNodes(declaration).some(typeReference => {
                const type = checker.getTypeAtLocation(typeReference);
                return !!type && !!type.symbol && explicitlyInheritsFrom(type.symbol, parent, cachedResults, checker);
            }));
        cachedResults.set(key, inherits);
        return inherits;
    }

    function getReferencesForSuperKeyword(superKeyword: ts.Node): SymbolAndEntries[] | undefined {
        let searchSpaceNode = ts.getSuperContainer(superKeyword, /*stopOnFunctions*/ false);
        if (!searchSpaceNode) {
            return undefined;
        }
        // Whether 'super' occurs in a static context within a class.
        let staticFlag = ts.ModifierFlags.Static;

        switch (searchSpaceNode.kind) {
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.PropertySignature:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.MethodSignature:
            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
                staticFlag &= ts.getSyntacticModifierFlags(searchSpaceNode);
                searchSpaceNode = searchSpaceNode.parent; // re-assign to be the owning class
                break;
            default:
                return undefined;
        }

        const sourceFile = searchSpaceNode.getSourceFile();
        const references = ts.mapDefined(getPossibleSymbolReferenceNodes(sourceFile, "super", searchSpaceNode), node => {
            if (node.kind !== ts.SyntaxKind.SuperKeyword) {
                return;
            }

            const container = ts.getSuperContainer(node, /*stopOnFunctions*/ false);

            // If we have a 'super' container, we must have an enclosing class.
            // Now make sure the owning class is the same as the search-space
            // and has the same static qualifier as the original 'super's owner.
            return container && ts.isStatic(container) === !!staticFlag && container.parent.symbol === searchSpaceNode.symbol ? nodeEntry(node) : undefined;
        });

        return [{ definition: { type: DefinitionKind.Symbol, symbol: searchSpaceNode.symbol }, references }];
    }

    function isParameterName(node: ts.Node) {
        return node.kind === ts.SyntaxKind.Identifier && node.parent.kind === ts.SyntaxKind.Parameter && (node.parent as ts.ParameterDeclaration).name === node;
    }

    function getReferencesForThisKeyword(thisOrSuperKeyword: ts.Node, sourceFiles: readonly ts.SourceFile[], cancellationToken: ts.CancellationToken): SymbolAndEntries[] | undefined {
        let searchSpaceNode = ts.getThisContainer(thisOrSuperKeyword, /* includeArrowFunctions */ false);

        // Whether 'this' occurs in a static context within a class.
        let staticFlag = ts.ModifierFlags.Static;

        switch (searchSpaceNode.kind) {
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.MethodSignature:
                if (ts.isObjectLiteralMethod(searchSpaceNode)) {
                    staticFlag &= ts.getSyntacticModifierFlags(searchSpaceNode);
                    searchSpaceNode = searchSpaceNode.parent; // re-assign to be the owning object literals
                    break;
                }
                // falls through
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.PropertySignature:
            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
                staticFlag &= ts.getSyntacticModifierFlags(searchSpaceNode);
                searchSpaceNode = searchSpaceNode.parent; // re-assign to be the owning class
                break;
            case ts.SyntaxKind.SourceFile:
                if (ts.isExternalModule(searchSpaceNode as ts.SourceFile) || isParameterName(thisOrSuperKeyword)) {
                    return undefined;
                }
                // falls through
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.FunctionExpression:
                break;
            // Computed properties in classes are not handled here because references to this are illegal,
            // so there is no point finding references to them.
            default:
                return undefined;
        }

        const references = ts.flatMap(searchSpaceNode.kind === ts.SyntaxKind.SourceFile ? sourceFiles : [searchSpaceNode.getSourceFile()], sourceFile => {
            cancellationToken.throwIfCancellationRequested();
            return getPossibleSymbolReferenceNodes(sourceFile, "this", ts.isSourceFile(searchSpaceNode) ? sourceFile : searchSpaceNode).filter(node => {
                if (!ts.isThis(node)) {
                    return false;
                }
                const container = ts.getThisContainer(node, /* includeArrowFunctions */ false);
                switch (searchSpaceNode.kind) {
                    case ts.SyntaxKind.FunctionExpression:
                    case ts.SyntaxKind.FunctionDeclaration:
                        return searchSpaceNode.symbol === container.symbol;
                    case ts.SyntaxKind.MethodDeclaration:
                    case ts.SyntaxKind.MethodSignature:
                        return ts.isObjectLiteralMethod(searchSpaceNode) && searchSpaceNode.symbol === container.symbol;
                    case ts.SyntaxKind.ClassExpression:
                    case ts.SyntaxKind.ClassDeclaration:
                    case ts.SyntaxKind.ObjectLiteralExpression:
                        // Make sure the container belongs to the same class/object literals
                        // and has the appropriate static modifier from the original container.
                        return container.parent && searchSpaceNode.symbol === container.parent.symbol && ts.isStatic(container) === !!staticFlag;
                    case ts.SyntaxKind.SourceFile:
                        return container.kind === ts.SyntaxKind.SourceFile && !ts.isExternalModule(container as ts.SourceFile) && !isParameterName(node);
                }
            });
        }).map(n => nodeEntry(n));

        const thisParameter = ts.firstDefined(references, r => ts.isParameter(r.node.parent) ? r.node : undefined);
        return [{
            definition: { type: DefinitionKind.This, node: thisParameter || thisOrSuperKeyword },
            references
        }];
    }

    function getReferencesForStringLiteral(node: ts.StringLiteralLike, sourceFiles: readonly ts.SourceFile[], checker: ts.TypeChecker, cancellationToken: ts.CancellationToken): SymbolAndEntries[] {
        const type = ts.getContextualTypeFromParentOrAncestorTypeNode(node, checker);
        const references = ts.flatMap(sourceFiles, sourceFile => {
            cancellationToken.throwIfCancellationRequested();
            return ts.mapDefined(getPossibleSymbolReferenceNodes(sourceFile, node.text), ref => {
                if (ts.isStringLiteralLike(ref) && ref.text === node.text) {
                    if (type) {
                        const refType = ts.getContextualTypeFromParentOrAncestorTypeNode(ref, checker);
                        if (type !== checker.getStringType() && type === refType) {
                            return nodeEntry(ref, EntryKind.StringLiteral);
                        }
                    }
                    else {
                        return ts.isNoSubstitutionTemplateLiteral(ref) && !ts.rangeIsOnSingleLine(ref, sourceFile) ? undefined :
                            nodeEntry(ref, EntryKind.StringLiteral);
                    }
                }
            });
        });

        return [{
            definition: { type: DefinitionKind.String, node },
            references
        }];
    }

    // For certain symbol kinds, we need to include other symbols in the search set.
    // This is not needed when searching for re-exports.
    function populateSearchSymbolSet(symbol: ts.Symbol, location: ts.Node, checker: ts.TypeChecker, isForRename: boolean, providePrefixAndSuffixText: boolean, implementations: boolean): ts.Symbol[] {
        const result: ts.Symbol[] = [];
        forEachRelatedSymbol<void>(symbol, location, checker, isForRename, !(isForRename && providePrefixAndSuffixText),
            (sym, root, base) => {
                // static method/property and instance method/property might have the same name. Only include static or only include instance.
                if (base) {
                    if (isStaticSymbol(symbol) !== isStaticSymbol(base)) {
                        base = undefined;
                    }
                }
                result.push(base || root || sym);
            },
            // when try to find implementation, implementations is true, and not allowed to find base class
            /*allowBaseTypes*/() => !implementations);
        return result;
    }

    /**
     * @param allowBaseTypes return true means it would try to find in base class or interface.
     */
    function forEachRelatedSymbol<T>(
        symbol: ts.Symbol, location: ts.Node, checker: ts.TypeChecker, isForRenamePopulateSearchSymbolSet: boolean, onlyIncludeBindingElementAtReferenceLocation: boolean,
        /**
         * @param baseSymbol This symbol means one property/mehtod from base class or interface when it is not null or undefined,
         */
        cbSymbol: (symbol: ts.Symbol, rootSymbol?: ts.Symbol, baseSymbol?: ts.Symbol, kind?: NodeEntryKind) => T | undefined,
        allowBaseTypes: (rootSymbol: ts.Symbol) => boolean,
    ): T | undefined {
        const containingObjectLiteralElement = ts.getContainingObjectLiteralElement(location);
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
            const res = contextualType && ts.firstDefined(
                ts.getPropertySymbolsFromContextualType(containingObjectLiteralElement, checker, contextualType, /*unionSymbolOk*/ true),
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

        if (symbol.valueDeclaration && ts.isParameterPropertyDeclaration(symbol.valueDeclaration, symbol.valueDeclaration.parent)) {
            // For a parameter property, now try on the other symbol (property if this was a parameter, parameter if this was a property).
            const paramProps = checker.getSymbolsOfParameterPropertyDeclaration(ts.cast(symbol.valueDeclaration, ts.isParameter), symbol.name);
            ts.Debug.assert(paramProps.length === 2 && !!(paramProps[0].flags & ts.SymbolFlags.FunctionScopedVariable) && !!(paramProps[1].flags & ts.SymbolFlags.Property)); // is [parameter, property]
            return fromRoot(symbol.flags & ts.SymbolFlags.FunctionScopedVariable ? paramProps[1] : paramProps[0]);
        }

        const exportSpecifier = ts.getDeclarationOfKind<ts.ExportSpecifier>(symbol, ts.SyntaxKind.ExportSpecifier);
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
            let bindingElementPropertySymbol: ts.Symbol | undefined;
            if (onlyIncludeBindingElementAtReferenceLocation) {
                bindingElementPropertySymbol = ts.isObjectBindingElementWithoutPropertyName(location.parent) ? ts.getPropertySymbolFromBindingElement(checker, location.parent) : undefined;
            }
            else {
                bindingElementPropertySymbol = getPropertySymbolOfObjectBindingPatternWithoutPropertyName(symbol, checker);
            }
            return bindingElementPropertySymbol && fromRoot(bindingElementPropertySymbol, EntryKind.SearchedPropertyFoundLocal);
        }

        ts.Debug.assert(isForRenamePopulateSearchSymbolSet);
        // due to the above assert and the arguments at the uses of this function,
        // (onlyIncludeBindingElementAtReferenceLocation <=> !providePrefixAndSuffixTextForRename) holds
        const includeOriginalSymbolOfBindingElement = onlyIncludeBindingElementAtReferenceLocation;

        if (includeOriginalSymbolOfBindingElement) {
            const bindingElementPropertySymbol = getPropertySymbolOfObjectBindingPatternWithoutPropertyName(symbol, checker);
            return bindingElementPropertySymbol && fromRoot(bindingElementPropertySymbol, EntryKind.SearchedPropertyFoundLocal);
        }

        function fromRoot(sym: ts.Symbol, kind?: NodeEntryKind): T | undefined {
            // If this is a union property:
            //   - In populateSearchSymbolsSet we will add all the symbols from all its source symbols in all unioned types.
            //   - In findRelatedSymbol, we will just use the union symbol if any source symbol is included in the search.
            // If the symbol is an instantiation from a another symbol (e.g. widened symbol):
            //   - In populateSearchSymbolsSet, add the root the list
            //   - In findRelatedSymbol, return the source symbol if that is in the search. (Do not return the instantiation symbol.)
            return ts.firstDefined(checker.getRootSymbols(sym), rootSymbol =>
                cbSymbol(sym, rootSymbol, /*baseSymbol*/ undefined, kind)
                // Add symbol of properties/methods of the same name in base classes and implemented interfaces definitions
                || (rootSymbol.parent && rootSymbol.parent.flags & (ts.SymbolFlags.Class | ts.SymbolFlags.Interface) && allowBaseTypes(rootSymbol)
                    ? getPropertySymbolsFromBaseTypes(rootSymbol.parent, rootSymbol.name, checker, base => cbSymbol(sym, rootSymbol, base, kind))
                    : undefined));
        }

        function getPropertySymbolOfObjectBindingPatternWithoutPropertyName(symbol: ts.Symbol, checker: ts.TypeChecker): ts.Symbol | undefined {
            const bindingElement = ts.getDeclarationOfKind<ts.BindingElement>(symbol, ts.SyntaxKind.BindingElement);
            if (bindingElement && ts.isObjectBindingElementWithoutPropertyName(bindingElement)) {
                return ts.getPropertySymbolFromBindingElement(checker, bindingElement);
            }
        }
    }

    /**
     * Find symbol of the given property-name and add the symbol to the given result array
     * @param symbol a symbol to start searching for the given propertyName
     * @param propertyName a name of property to search for
     * @param result an array of symbol of found property symbols
     * @param previousIterationSymbolsCache a cache of symbol from previous iterations of calling this function to prevent infinite revisiting of the same symbol.
     *                                The value of previousIterationSymbol is undefined when the function is first called.
     */
    function getPropertySymbolsFromBaseTypes<T>(symbol: ts.Symbol, propertyName: string, checker: ts.TypeChecker, cb: (symbol: ts.Symbol) => T | undefined): T | undefined {
        const seen = new ts.Map<ts.SymbolId, true>();
        return recur(symbol);

        function recur(symbol: ts.Symbol): T | undefined {
            // Use `addToSeen` to ensure we don't infinitely recurse in this situation:
            //      interface C extends C {
            //          /*findRef*/propName: string;
            //      }
            if (!(symbol.flags & (ts.SymbolFlags.Class | ts.SymbolFlags.Interface)) || !ts.addToSeen(seen, ts.getSymbolId(symbol))) return;

            return ts.firstDefined(symbol.declarations, declaration => ts.firstDefined(ts.getAllSuperTypeNodes(declaration), typeReference => {
                const type = checker.getTypeAtLocation(typeReference);
                const propertySymbol = type && type.symbol && checker.getPropertyOfType(type, propertyName);
                // Visit the typeReference as well to see if it directly or indirectly uses that property
                return type && propertySymbol && (ts.firstDefined(checker.getRootSymbols(propertySymbol), cb) || recur(type.symbol));
            }));
        }
    }

    interface RelatedSymbol {
        readonly symbol: ts.Symbol;
        readonly kind: NodeEntryKind | undefined;
    }

    function isStaticSymbol(symbol: ts.Symbol): boolean {
        if (!symbol.valueDeclaration) return false;
        const modifierFlags = ts.getEffectiveModifierFlags(symbol.valueDeclaration);
        return !!(modifierFlags & ts.ModifierFlags.Static);
    }

    function getRelatedSymbol(search: Search, referenceSymbol: ts.Symbol, referenceLocation: ts.Node, state: State): RelatedSymbol | undefined {
        const { checker } = state;
        return forEachRelatedSymbol(referenceSymbol, referenceLocation, checker, /*isForRenamePopulateSearchSymbolSet*/ false,
            /*onlyIncludeBindingElementAtReferenceLocation*/ state.options.use !== FindReferencesUse.Rename || !!state.options.providePrefixAndSuffixTextForRename,
            (sym, rootSymbol, baseSymbol, kind): RelatedSymbol | undefined => {
                // check whether the symbol used to search itself is just the searched one.
                if (baseSymbol) {
                    // static method/property and instance method/property might have the same name. Only check static or only check instance.
                    if (isStaticSymbol(referenceSymbol) !== isStaticSymbol(baseSymbol)) {
                        baseSymbol = undefined;
                    }
                }
                return search.includes(baseSymbol || rootSymbol || sym)
                    // For a base type, use the symbol for the derived type. For a synthetic (e.g. union) property, use the union symbol.
                    ? { symbol: rootSymbol && !(ts.getCheckFlags(sym) & ts.CheckFlags.Synthetic) ? rootSymbol : sym, kind }
                    : undefined;
            },
            /*allowBaseTypes*/ rootSymbol =>
                !(search.parents && !search.parents.some(parent => explicitlyInheritsFrom(rootSymbol.parent!, parent, state.inheritsFromCache, checker)))
        );
    }

    /**
     * Given an initial searchMeaning, extracted from a location, widen the search scope based on the declarations
     * of the corresponding symbol. e.g. if we are searching for "Foo" in value position, but "Foo" references a class
     * then we need to widen the search to include type positions as well.
     * On the contrary, if we are searching for "Bar" in type position and we trace bar to an interface, and an uninstantiated
     * module, we want to keep the search limited to only types, as the two declarations (interface and uninstantiated module)
     * do not intersect in any of the three spaces.
     */
    export function getIntersectingMeaningFromDeclarations(node: ts.Node, symbol: ts.Symbol): ts.SemanticMeaning {
        let meaning = ts.getMeaningFromLocation(node);
        const { declarations } = symbol;
        if (declarations) {
            let lastIterationMeaning: ts.SemanticMeaning;
            do {
                // The result is order-sensitive, for instance if initialMeaning === Namespace, and declarations = [class, instantiated module]
                // we need to consider both as they initialMeaning intersects with the module in the namespace space, and the module
                // intersects with the class in the value space.
                // To achieve that we will keep iterating until the result stabilizes.

                // Remember the last meaning
                lastIterationMeaning = meaning;

                for (const declaration of declarations) {
                    const declarationMeaning = ts.getMeaningFromDeclaration(declaration);

                    if (declarationMeaning & meaning) {
                        meaning |= declarationMeaning;
                    }
                }
            }
            while (meaning !== lastIterationMeaning);
        }
        return meaning;
    }

    function isImplementation(node: ts.Node): boolean {
        return !!(node.flags & ts.NodeFlags.Ambient) ? !(ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) :
            (ts.isVariableLike(node) ? ts.hasInitializer(node) :
            ts.isFunctionLikeDeclaration(node) ? !!node.body :
            ts.isClassLike(node) || ts.isModuleOrEnumDeclaration(node));
    }

    export function getReferenceEntriesForShorthandPropertyAssignment(node: ts.Node, checker: ts.TypeChecker, addReference: (node: ts.Node) => void): void {
        const refSymbol = checker.getSymbolAtLocation(node)!;
        const shorthandSymbol = checker.getShorthandAssignmentValueSymbol(refSymbol.valueDeclaration);

        if (shorthandSymbol) {
            for (const declaration of shorthandSymbol.getDeclarations()!) {
                if (ts.getMeaningFromDeclaration(declaration) & ts.SemanticMeaning.Value) {
                    addReference(declaration);
                }
            }
        }
    }

    function forEachDescendantOfKind(node: ts.Node, kind: ts.SyntaxKind, action: (node: ts.Node) => void): void {
        ts.forEachChild(node, child => {
            if (child.kind === kind) {
                action(child);
            }
            forEachDescendantOfKind(child, kind, action);
        });
    }

    /** Get `C` given `N` if `N` is in the position `class C extends N` or `class C extends foo.N` where `N` is an identifier. */
    function tryGetClassByExtendingIdentifier(node: ts.Node): ts.ClassLikeDeclaration | undefined {
        return ts.tryGetClassExtendingExpressionWithTypeArguments(ts.climbPastPropertyAccess(node).parent);
    }

    /**
     * If we are just looking for implementations and this is a property access expression, we need to get the
     * symbol of the local type of the symbol the property is being accessed on. This is because our search
     * symbol may have a different parent symbol if the local type's symbol does not declare the property
     * being accessed (i.e. it is declared in some parent class or interface)
     */
    function getParentSymbolsOfPropertyAccess(location: ts.Node, symbol: ts.Symbol, checker: ts.TypeChecker): readonly ts.Symbol[] | undefined {
        const propertyAccessExpression = ts.isRightSideOfPropertyAccess(location) ? location.parent as ts.PropertyAccessExpression : undefined;
        const lhsType = propertyAccessExpression && checker.getTypeAtLocation(propertyAccessExpression.expression);
        const res = ts.mapDefined(lhsType && (lhsType.isUnionOrIntersection() ? lhsType.types : lhsType.symbol === symbol.parent ? undefined : [lhsType]), t =>
            t.symbol && t.symbol.flags & (ts.SymbolFlags.Class | ts.SymbolFlags.Interface) ? t.symbol : undefined);
        return res.length === 0 ? undefined : res;
    }

    function isForRenameWithPrefixAndSuffixText(options: Options) {
        return options.use === FindReferencesUse.Rename && options.providePrefixAndSuffixTextForRename;
    }
}
