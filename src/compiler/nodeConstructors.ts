import {
    __String,
    AmdDependency,
    append,
    AssignmentDeclarationKind,
    AutoGenerateInfo,
    BinaryExpression,
    canHaveJSDoc,
    CheckJsDirective,
    CommentDirective,
    computePositionOfLineAndCharacter,
    createMultiMap,
    createScanner,
    Debug,
    Declaration,
    DiagnosticWithLocation,
    EmitNode,
    emptyArray,
    EndOfFileToken,
    EntityName,
    ExportDeclaration,
    factory,
    FileReference,
    find,
    findLast,
    FlowNode,
    forEach,
    forEachChild,
    FunctionLikeDeclaration,
    getAssignmentDeclarationKind,
    getLineAndCharacterOfPosition,
    getLineStarts,
    getNameFromPropertyName,
    getNodeChildren,
    getNonAssignedNameOfDeclaration,
    getSourceFileOfNode,
    getTokenPosOfNode,
    HasLocals,
    hasSyntacticModifier,
    hasTabstop,
    Identifier,
    idText,
    ImportDeclaration,
    ImportSpecifier,
    isBindingPattern,
    isComputedPropertyName,
    IScriptSnapshot,
    isJSDocCommentContainingNode,
    isNamedExports,
    isNodeKind,
    isPropertyAccessExpression,
    isPropertyName,
    isTokenKind,
    JSDoc,
    JSDocTag,
    LanguageVariant,
    lastOrUndefined,
    LineAndCharacter,
    ModeAwareCache,
    ModifierFlags,
    Mutable,
    Node,
    NodeArray,
    NodeFlags,
    PackageJsonInfo,
    Path,
    PatternAmbientModule,
    PrivateIdentifier,
    ReadonlyPragmaMap,
    RedirectInfo,
    ResolutionMode,
    ResolvedModuleWithFailedLookupLocations,
    ResolvedTypeReferenceDirectiveWithFailedLookupLocations,
    ScriptKind,
    ScriptTarget,
    ServicesOnlyType,
    setNodeChildren,
    SourceFile,
    SourceFileLike,
    Statement,
    StringLiteral,
    StringLiteralLike,
    Symbol,
    SymbolTable,
    SyntaxKind,
    SyntaxList,
    TextChangeRange,
    Token,
    TransformFlags,
    TypeNode,
    TypeParameterDeclaration,
    UnderscoreEscapedMap,
    updateSourceFile,
    VariableDeclaration,
} from "./_namespaces/ts";

/** @internal */
export abstract class BaseSyntaxObject implements Node {
    static { this.prototype.kind = SyntaxKind.Unknown; }
    declare kind: SyntaxKind;

    pos: number = -1;
    end: number = -1;
    id: number = 0;
    flags: NodeFlags = NodeFlags.None;
    modifierFlagsCache: ModifierFlags = ModifierFlags.None; // TODO: move this off `Node`
    transformFlags: TransformFlags = TransformFlags.None;
    parent: Node = undefined!;
    original: Node | undefined = undefined;

    abstract emitNode: EmitNode | undefined;

    getSourceFile(): SourceFile {
        return getSourceFileOfNode(this);
    }

    getStart(sourceFile?: SourceFileLike, includeJsDocComment?: boolean): number {
        Debug.assertValidTextRange(this);
        return getTokenPosOfNode(this, sourceFile, includeJsDocComment);
    }

    getFullStart(): number {
        Debug.assertValidTextRange(this);
        return this.pos;
    }

    getEnd(): number {
        Debug.assertValidTextRange(this);
        return this.end;
    }

    getWidth(sourceFile?: SourceFile): number {
        Debug.assertValidTextRange(this);
        return this.getEnd() - this.getStart(sourceFile);
    }

    getFullWidth(): number {
        Debug.assertValidTextRange(this);
        return this.end - this.pos;
    }

    getLeadingTriviaWidth(sourceFile?: SourceFile): number {
        return this.getStart(sourceFile) - this.pos;
    }

    getFullText(sourceFile?: SourceFile): string {
        Debug.assertValidTextRange(this);
        sourceFile ??= this.getSourceFile();
        return sourceFile.text.substring(this.pos, this.end);
    }

    getText(sourceFile?: SourceFile): string {
        Debug.assertValidTextRange(this);
        sourceFile ??= this.getSourceFile();
        return sourceFile.text.substring(this.getStart(sourceFile), this.getEnd());
    }

    getChildCount(sourceFile?: SourceFile): number {
        return this.getChildren(sourceFile).length;
    }

    getChildAt(index: number, sourceFile?: SourceFile): Node {
        return this.getChildren(sourceFile)[index];
    }

    abstract forEachChild<T>(cbNode: (node: Node) => T, cbNodeArray?: (nodes: NodeArray<Node>) => T): T | undefined;
    abstract getChildren(sourceFile?: SourceFileLike): readonly Node[];
    abstract getFirstToken(sourceFile?: SourceFileLike): Node | undefined;
    abstract getLastToken(sourceFile?: SourceFileLike): Node | undefined;
}

/** @internal */
export abstract class BaseTokenObject extends BaseSyntaxObject {
    // NOTE: Tokens generally do not have or need emitNode entries, so they are declared and not defined to reduce
    // memory footprint.
    declare emitNode: EmitNode | undefined;

    override forEachChild<T>(_cbNode: (node: Node) => T, _cbNodeArray?: (nodes: NodeArray<Node>) => T): T | undefined {
        // Tokens cannot have source element children
        return undefined;
    }

    override getChildren(_sourceFile?: SourceFileLike): readonly Node[] {
        return this.kind === SyntaxKind.EndOfFileToken ? (this as Node as EndOfFileToken).jsDoc ?? emptyArray : emptyArray;
    }

    override getFirstToken(_sourceFile?: SourceFileLike): Node | undefined {
        // Tokens cannot have source element children
        return undefined!;
    }

    override getLastToken(_sourceFile?: SourceFileLike): Node | undefined {
        // Tokens cannot have source element children
        return undefined!;
    }
}

/** @internal */
export class TokenObject<TKind extends SyntaxKind> extends BaseTokenObject implements Token<TKind> {
    override kind: TKind;

    constructor(kind: TKind) {
        super();
        this.kind = kind;
    }
}

/** @internal */
export class IdentifierObject extends BaseTokenObject implements Identifier {
    static { this.prototype.kind = SyntaxKind.Identifier; }
    declare kind: SyntaxKind.Identifier;

    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;
    declare _flowContainerBrand: any;

    // NOTE: Though tokens, Identifiers often need emitNode
    override emitNode: EmitNode | undefined = undefined;

    escapedText: __String = "" as __String;
    symbol: Symbol = undefined!; // initialized by checker
    jsDoc: JSDoc[] | undefined = undefined; // initialized by parser (JsDocContainer)
    flowNode: FlowNode | undefined = undefined; // initialized by binder (FlowContainer)

    get text(): string {
        return idText(this);
    }
}

/** @internal */
export class PrivateIdentifierObject extends BaseTokenObject implements PrivateIdentifier {
    static { PrivateIdentifierObject.prototype.kind = SyntaxKind.PrivateIdentifier; }
    declare kind: SyntaxKind.PrivateIdentifier;

    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;

    // NOTE: Though tokens, PrivateIdentifiers often need emitNode
    override emitNode: EmitNode | undefined = undefined;

    escapedText: __String = "" as __String;

    get text(): string {
        return idText(this);
    }
}

/** @internal */
export abstract class BaseNodeObject extends BaseSyntaxObject {
    // NOTE: Non-token nodes often need emitNode entries, so they are defined to reduce polymorphism.
    override emitNode: EmitNode | undefined = undefined;

    override forEachChild<T>(cbNode: (node: Node) => T, cbNodeArray?: (nodes: NodeArray<Node>) => T): T | undefined {
        return forEachChild(this, cbNode, cbNodeArray);
    }

    override getChildren(sourceFile?: SourceFileLike): readonly Node[] {
        Debug.assertValidTextRange(this, "Node without a real position cannot be scanned and thus has no token nodes - use forEachChild and collect the result if that's fine");
        return getNodeChildren(this) ?? setNodeChildren(this, createChildren(this, sourceFile));
    }

    override getFirstToken(sourceFile?: SourceFileLike): Node | undefined {
        Debug.assertValidTextRange(this);
        const children = this.getChildren(sourceFile);
        if (!children.length) {
            return undefined;
        }

        const child = find(children, child => child.kind < SyntaxKind.FirstJSDocNode || child.kind > SyntaxKind.LastJSDocNode);
        if (!child) {
            return undefined;
        }

        return child.kind < SyntaxKind.FirstNode ? child : (child as BaseSyntaxObject).getFirstToken(sourceFile);
    }

    override getLastToken(sourceFile?: SourceFileLike): Node | undefined {
        Debug.assertValidTextRange(this);
        const children = this.getChildren(sourceFile);
        if (!children.length) {
            return undefined;
        }

        const child = findLast(children, child => child.kind < SyntaxKind.FirstJSDocNode || child.kind > SyntaxKind.LastJSDocNode);
        if (!child) {
            return undefined;
        }

        return child.kind < SyntaxKind.FirstNode ? child : (child as BaseSyntaxObject).getLastToken(sourceFile);
    }
}

/** @internal */
export class NodeObject<TKind extends SyntaxKind> extends BaseNodeObject implements Node {
    override kind: TKind;

    constructor(kind: TKind) {
        super();
        this.kind = kind;
    }
}

/** @internal */
export class SourceFileObject extends BaseNodeObject implements SourceFile {
    static { this.prototype.kind = SyntaxKind.SourceFile; }
    declare kind: SyntaxKind.SourceFile;

    declare _declarationBrand: any;
    declare _localsContainerBrand: any;

    declare statements: NodeArray<Statement>;
    declare endOfFileToken: Token<SyntaxKind.EndOfFileToken>;
    declare fileName: string;
    declare path: Path;
    declare text: string;
    declare resolvedPath: Path;
    declare originalFileName: string;
    declare redirectInfo?: RedirectInfo | undefined;
    declare amdDependencies: readonly AmdDependency[];
    declare moduleName?: string | undefined;
    declare referencedFiles: readonly FileReference[];
    declare typeReferenceDirectives: readonly FileReference[];
    declare libReferenceDirectives: readonly FileReference[];
    declare languageVariant: LanguageVariant;
    declare isDeclarationFile: boolean;
    declare renamedDependencies?: ReadonlyMap<string, string> | undefined;
    declare hasNoDefaultLib: boolean;
    declare languageVersion: ScriptTarget;
    declare impliedNodeFormat?: ResolutionMode;
    declare packageJsonLocations?: readonly string[] | undefined;
    declare packageJsonScope?: PackageJsonInfo | undefined;
    declare scriptKind: ScriptKind;
    declare externalModuleIndicator?: true | Node | undefined;
    declare setExternalModuleIndicator?: ((file: SourceFile) => void) | undefined;
    declare commonJsModuleIndicator?: Node | undefined;
    declare jsGlobalAugmentations?: SymbolTable | undefined;
    declare identifiers: ReadonlyMap<string, string>;
    declare nodeCount: number;
    declare identifierCount: number;
    declare symbolCount: number;
    declare parseDiagnostics: DiagnosticWithLocation[];
    declare bindDiagnostics: DiagnosticWithLocation[];
    declare bindSuggestionDiagnostics?: DiagnosticWithLocation[] | undefined;
    declare jsDocDiagnostics?: DiagnosticWithLocation[] | undefined;
    declare additionalSyntacticDiagnostics?: readonly DiagnosticWithLocation[] | undefined;
    declare lineMap: readonly number[];
    declare classifiableNames?: ReadonlySet<__String> | undefined;
    declare commentDirectives?: CommentDirective[] | undefined;
    declare resolvedModules?: ModeAwareCache<ResolvedModuleWithFailedLookupLocations> | undefined;
    declare resolvedTypeReferenceDirectiveNames?: ModeAwareCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations> | undefined;
    declare imports: readonly StringLiteralLike[];
    declare moduleAugmentations: readonly (Identifier | StringLiteral)[];
    declare patternAmbientModules?: PatternAmbientModule[] | undefined;
    declare ambientModuleNames: readonly string[];
    declare checkJsDirective?: CheckJsDirective | undefined;
    declare version: string;
    declare pragmas: ReadonlyPragmaMap;
    declare localJsxNamespace?: __String | undefined;
    declare localJsxFragmentNamespace?: __String | undefined;
    declare localJsxFactory?: EntityName | undefined;
    declare localJsxFragmentFactory?: EntityName | undefined;
    declare endFlowNode?: FlowNode | undefined;
    declare symbol: Symbol;
    declare localSymbol?: Symbol | undefined;
    declare modifierFlagsCache: ModifierFlags;
    declare transformFlags: TransformFlags;
    declare locals?: SymbolTable | undefined;
    declare nextContainer?: HasLocals | undefined;
    declare scriptSnapshot: IScriptSnapshot;
    declare nameTable: UnderscoreEscapedMap<number> | undefined;

    private declare namedDeclarations: Map<string, Declaration[]> | undefined;

    public update(newText: string, textChangeRange: TextChangeRange): SourceFile {
        return updateSourceFile(this, newText, textChangeRange);
    }

    public getLineAndCharacterOfPosition(position: number): LineAndCharacter {
        return getLineAndCharacterOfPosition(this, position);
    }

    public getLineStarts(): readonly number[] {
        return getLineStarts(this);
    }

    public getPositionOfLineAndCharacter(line: number, character: number, allowEdits?: true): number {
        return computePositionOfLineAndCharacter(getLineStarts(this), line, character, this.text, allowEdits);
    }

    public getLineEndOfPosition(pos: number): number {
        const { line } = this.getLineAndCharacterOfPosition(pos);
        const lineStarts = this.getLineStarts();

        let lastCharPos: number | undefined;
        if (line + 1 >= lineStarts.length) {
            lastCharPos = this.getEnd();
        }
        if (!lastCharPos) {
            lastCharPos = lineStarts[line + 1] - 1;
        }

        const fullText = this.getFullText();
        // if the new line is "\r\n", we should return the last non-new-line-character position
        return fullText[lastCharPos] === "\n" && fullText[lastCharPos - 1] === "\r" ? lastCharPos - 1 : lastCharPos;
    }

    public getNamedDeclarations(): Map<string, Declaration[]> {
        if (!this.namedDeclarations) {
            this.namedDeclarations = this.computeNamedDeclarations();
        }

        return this.namedDeclarations;
    }

    private computeNamedDeclarations(): Map<string, Declaration[]> {
        const result = createMultiMap<string, Declaration>();

        this.forEachChild(visit);

        return result;

        function addDeclaration(declaration: Declaration) {
            const name = getDeclarationName(declaration);
            if (name) {
                result.add(name, declaration);
            }
        }

        function getDeclarations(name: string) {
            let declarations = result.get(name);
            if (!declarations) {
                result.set(name, declarations = []);
            }
            return declarations;
        }

        function getDeclarationName(declaration: Declaration) {
            const name = getNonAssignedNameOfDeclaration(declaration);
            return name && (isComputedPropertyName(name) && isPropertyAccessExpression(name.expression) ? idText(name.expression.name)
                : isPropertyName(name) ? getNameFromPropertyName(name) : undefined);
        }

        function visit(node: Node): void {
            switch (node.kind) {
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                    const functionDeclaration = node as FunctionLikeDeclaration;
                    const declarationName = getDeclarationName(functionDeclaration);

                    if (declarationName) {
                        const declarations = getDeclarations(declarationName);
                        const lastDeclaration = lastOrUndefined(declarations);

                        // Check whether this declaration belongs to an "overload group".
                        if (lastDeclaration && functionDeclaration.parent === lastDeclaration.parent && functionDeclaration.symbol === lastDeclaration.symbol) {
                            // Overwrite the last declaration if it was an overload
                            // and this one is an implementation.
                            if (functionDeclaration.body && !(lastDeclaration as FunctionLikeDeclaration).body) {
                                declarations[declarations.length - 1] = functionDeclaration;
                            }
                        }
                        else {
                            declarations.push(functionDeclaration);
                        }
                    }
                    forEachChild(node, visit);
                    break;

                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.ClassExpression:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.TypeAliasDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.ImportEqualsDeclaration:
                case SyntaxKind.ExportSpecifier:
                case SyntaxKind.ImportSpecifier:
                case SyntaxKind.ImportClause:
                case SyntaxKind.NamespaceImport:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.TypeLiteral:
                    addDeclaration(node as Declaration);
                    forEachChild(node, visit);
                    break;

                case SyntaxKind.Parameter:
                    // Only consider parameter properties
                    if (!hasSyntacticModifier(node, ModifierFlags.ParameterPropertyModifier)) {
                        break;
                    }
                // falls through

                case SyntaxKind.VariableDeclaration:
                case SyntaxKind.BindingElement: {
                    const decl = node as VariableDeclaration;
                    if (isBindingPattern(decl.name)) {
                        forEachChild(decl.name, visit);
                        break;
                    }
                    if (decl.initializer) {
                        visit(decl.initializer);
                    }
                }
                // falls through
                case SyntaxKind.EnumMember:
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                    addDeclaration(node as Declaration);
                    break;

                case SyntaxKind.ExportDeclaration:
                    // Handle named exports case e.g.:
                    //    export {a, b as B} from "mod";
                    const exportDeclaration = node as ExportDeclaration;
                    if (exportDeclaration.exportClause) {
                        if (isNamedExports(exportDeclaration.exportClause)) {
                            forEach(exportDeclaration.exportClause.elements, visit);
                        }
                        else {
                            visit(exportDeclaration.exportClause.name);
                        }
                    }
                    break;

                case SyntaxKind.ImportDeclaration:
                    const importClause = (node as ImportDeclaration).importClause;
                    if (importClause) {
                        // Handle default import case e.g.:
                        //    import d from "mod";
                        if (importClause.name) {
                            addDeclaration(importClause.name);
                        }

                        // Handle named bindings in imports e.g.:
                        //    import * as NS from "mod";
                        //    import {a, b as B} from "mod";
                        if (importClause.namedBindings) {
                            if (importClause.namedBindings.kind === SyntaxKind.NamespaceImport) {
                                addDeclaration(importClause.namedBindings);
                            }
                            else {
                                forEach(importClause.namedBindings.elements, visit);
                            }
                        }
                    }
                    break;

                case SyntaxKind.BinaryExpression:
                    if (getAssignmentDeclarationKind(node as BinaryExpression) !== AssignmentDeclarationKind.None) {
                        addDeclaration(node as BinaryExpression);
                    }
                // falls through

                default:
                    forEachChild(node, visit);
            }
        }
    }
}

const scanner = createScanner(ScriptTarget.Latest, /*skipTrivia*/ true);

function createChildren(node: Node, sourceFile: SourceFileLike | undefined): readonly Node[] {
    if (!isNodeKind(node.kind)) {
        return emptyArray;
    }

    let children: Node[] | undefined;

    if (isJSDocCommentContainingNode(node)) {
        /** Don't add trivia for "tokens" since this is in a comment. */
        forEachChild(node, child => { children = append(children, child); });
        return children ?? emptyArray;
    }

    scanner.setText((sourceFile || getSourceFileOfNode(node)).text);

    let pos = node.pos;
    const processNode = (child: Node) => {
        children = addSyntheticNodes(children, pos, child.pos, node);
        children = append(children, child);
        pos = child.end;
    };
    const processNodes = (nodes: NodeArray<Node>) => {
        children = addSyntheticNodes(children, pos, nodes.pos, node);
        children = append(children, createSyntaxList(nodes, node));
        pos = nodes.end;
    };

    // jsDocComments need to be the first children
    if (canHaveJSDoc(node)) {
        forEach(node.jsDoc, processNode);
    }

    // For syntactic classifications, all trivia are classified together, including jsdoc comments.
    // For that to work, the jsdoc comments should still be the leading trivia of the first child.
    // Restoring the scanner position ensures that.
    pos = node.pos;
    forEachChild(node, processNode, processNodes);
    children = addSyntheticNodes(children, pos, node.end, node);
    scanner.setText(undefined);
    return children ?? emptyArray;
}

function addSyntheticNodes(nodes: Node[] | undefined, pos: number, end: number, parent: Node): Node[] | undefined {
    scanner.resetTokenState(pos);
    while (pos < end) {
        const kind = scanner.scan();
        const textPos = scanner.getTokenEnd();
        if (textPos <= end) {
            if (kind === SyntaxKind.Identifier) {
                if (hasTabstop(parent)) {
                    continue;
                }
                Debug.fail(`Did not expect ${Debug.formatSyntaxKind(parent.kind)} to have an Identifier in its trivia`);
            }
            Debug.assert(isTokenKind(kind));
            const token = factory.createToken(kind) as Mutable<Token<SyntaxKind>>;
            token.pos = pos;
            token.end = textPos;
            token.parent = parent;
            token.flags = parent.flags & NodeFlags.ContextFlags;
            nodes = append(nodes, token);
        }
        pos = textPos;
        if (kind === SyntaxKind.EndOfFileToken) {
            break;
        }
    }
    return nodes;
}

function createSyntaxList(nodes: NodeArray<Node>, parent: Node): Node {
    let children: Node[] | undefined;
    let pos = nodes.pos;
    for (const node of nodes) {
        children = addSyntheticNodes(children, pos, node.pos, parent);
        pos = node.end;
    }
    children = addSyntheticNodes(children, pos, nodes.end, parent);
    const list = factory.createSyntaxList(children ?? emptyArray) as Mutable<SyntaxList>;
    list.pos = nodes.pos;
    list.end = nodes.end;
    list.parent = parent;
    list.flags = parent.flags & NodeFlags.ContextFlags;
    return list;
}
