import {
    __String,
    AmdDependency,
    append,
    AssignmentDeclarationKind,
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
    Scanner,
    ScriptKind,
    ScriptTarget,
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
    UnderscoreEscapedMap,
    updateSourceFile,
    VariableDeclaration,
} from "./_namespaces/ts";

/** @internal */
export abstract class BaseSyntaxObject implements Node {
    kind = SyntaxKind.Unknown;
    pos = -1;
    end = -1;
    id = 0;
    flags: NodeFlags = NodeFlags.None;
    transformFlags: TransformFlags = TransformFlags.None;
    parent: Node = undefined!;
    original: Node | undefined = undefined;

    abstract modifierFlagsCache: ModifierFlags; // TODO: move this off `Node`
    abstract emitNode: EmitNode | undefined;

    constructor(kind: SyntaxKind) {
        this.kind = kind;
    }

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

    forEachChild<T>(cbNode: (node: Node) => T, cbNodeArray?: (nodes: NodeArray<Node>) => T): T | undefined {
        return forEachChild(this, cbNode, cbNodeArray);
    }

    getChildren(sourceFile?: SourceFileLike): readonly Node[] {
        Debug.assertValidTextRange(this, "Node without a real position cannot be scanned and thus has no token nodes - use forEachChild and collect the result if that's fine");
        return getNodeChildren(this) ?? setNodeChildren(this, createChildren(this, sourceFile));
    }

    getFirstToken(sourceFile?: SourceFileLike): Node | undefined {
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

    getLastToken(sourceFile?: SourceFileLike): Node | undefined {
        Debug.assertValidTextRange(this);
        const children = this.getChildren(sourceFile);
        if (!children.length) {
            return undefined;
        }

        const child = lastOrUndefined(children);
        if (!child) {
            return undefined;
        }

        return child.kind < SyntaxKind.FirstNode ? child : (child as BaseSyntaxObject).getLastToken(sourceFile);
    }
}

/** @internal */
export abstract class BaseTokenObject extends BaseSyntaxObject {
    // NOTE: Tokens generally do not have or need emitNode entries, so they are declared but not defined to reduce
    // memory footprint.
    declare emitNode: EmitNode | undefined;
    // NOTE: Tokens cannot have modifiers, so they are declared but not defined to reduce memory footprint
    declare modifierFlagsCache: ModifierFlags;

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
    declare kind: TKind;

    constructor(kind: TKind) {
        super(kind);
    }
}

/** @internal */
export class IdentifierObject extends BaseTokenObject implements Identifier {
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
    jsDoc?: JSDoc[] = undefined; // initialized by parser (JsDocContainer)
    flowNode?: FlowNode = undefined; // initialized by binder (FlowContainer)

    constructor() {
        super(SyntaxKind.Identifier);
    }

    get text(): string {
        return idText(this);
    }
}

/** @internal */
export class PrivateIdentifierObject extends BaseTokenObject implements PrivateIdentifier {
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

    constructor() {
        super(SyntaxKind.PrivateIdentifier);
    }

    get text(): string {
        return idText(this);
    }
}

/** @internal */
export abstract class BaseNodeObject extends BaseSyntaxObject {
    // NOTE: Non-token nodes often need emitNode entries, so they are defined to reduce polymorphism.
    override emitNode: EmitNode | undefined = undefined;
    // NOTE: Non-token nodes may have modifiers, so they are defined to reduce polymorphism
    override modifierFlagsCache: ModifierFlags = ModifierFlags.None; // TODO: move this off `Node`
}

/** @internal */
export class NodeObject<TKind extends SyntaxKind> extends BaseNodeObject implements Node {
    declare kind: TKind;

    constructor(kind: TKind) {
        super(kind);
    }
}

/** @internal */
export class SourceFileObject extends BaseSyntaxObject implements SourceFile {
    declare kind: SyntaxKind.SourceFile;

    // NOTE: Non-token nodes often need emitNode entries, so they are defined to reduce polymorphism.
    override emitNode: EmitNode | undefined = undefined;

    declare _declarationBrand: any;
    declare _localsContainerBrand: any;

    declare statements: NodeArray<Statement>;
    declare endOfFileToken: Token<SyntaxKind.EndOfFileToken>;
    declare fileName: string;
    declare path: Path;
    declare text: string;
    declare resolvedPath: Path;
    declare originalFileName: string;
    declare redirectInfo?: RedirectInfo;
    declare amdDependencies: readonly AmdDependency[];
    declare moduleName?: string;
    declare referencedFiles: readonly FileReference[];
    declare typeReferenceDirectives: readonly FileReference[];
    declare libReferenceDirectives: readonly FileReference[];
    declare languageVariant: LanguageVariant;
    declare isDeclarationFile: boolean;
    declare renamedDependencies?: ReadonlyMap<string, string>;
    declare hasNoDefaultLib: boolean;
    declare languageVersion: ScriptTarget;
    declare impliedNodeFormat?: ResolutionMode;
    declare packageJsonLocations?: readonly string[];
    declare packageJsonScope?: PackageJsonInfo;
    declare scriptKind: ScriptKind;
    declare externalModuleIndicator?: true | Node;
    declare setExternalModuleIndicator?: (file: SourceFile) => void;
    declare commonJsModuleIndicator?: Node;
    declare jsGlobalAugmentations?: SymbolTable;
    declare identifiers: ReadonlyMap<string, string>;
    declare nodeCount: number;
    declare identifierCount: number;
    declare symbolCount: number;
    declare parseDiagnostics: DiagnosticWithLocation[];
    declare bindDiagnostics: DiagnosticWithLocation[];
    declare bindSuggestionDiagnostics?: DiagnosticWithLocation[];
    declare jsDocDiagnostics?: DiagnosticWithLocation[];
    declare additionalSyntacticDiagnostics?: readonly DiagnosticWithLocation[];
    declare lineMap: readonly number[];
    declare classifiableNames?: ReadonlySet<__String>;
    declare commentDirectives?: CommentDirective[];
    declare resolvedModules?: ModeAwareCache<ResolvedModuleWithFailedLookupLocations>;
    declare resolvedTypeReferenceDirectiveNames?: ModeAwareCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>;
    declare imports: readonly StringLiteralLike[];
    declare moduleAugmentations: readonly (Identifier | StringLiteral)[];
    declare patternAmbientModules?: PatternAmbientModule[];
    declare ambientModuleNames: readonly string[];
    declare checkJsDirective?: CheckJsDirective;
    declare version: string;
    declare pragmas: ReadonlyPragmaMap;
    declare localJsxNamespace?: __String;
    declare localJsxFragmentNamespace?: __String;
    declare localJsxFactory?: EntityName;
    declare localJsxFragmentFactory?: EntityName;
    declare endFlowNode?: FlowNode;
    declare symbol: Symbol;
    declare localSymbol?: Symbol;
    declare modifierFlagsCache: ModifierFlags;
    declare transformFlags: TransformFlags;
    declare locals?: SymbolTable;
    declare nextContainer?: HasLocals;
    declare scriptSnapshot: IScriptSnapshot;
    declare nameTable: UnderscoreEscapedMap<number> | undefined;

    declare private namedDeclarations: Map<string, Declaration[]> | undefined;

    constructor() {
        super(SyntaxKind.SourceFile);
    }

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

let scanner: Scanner | undefined;

function createChildren(node: Node, sourceFile: SourceFileLike | undefined): readonly Node[] {
    if (!isNodeKind(node.kind)) {
        return emptyArray;
    }

    let children: Node[] | undefined;

    if (isJSDocCommentContainingNode(node)) {
        /** Don't add trivia for "tokens" since this is in a comment. */
        forEachChild(node, child => {
            children = append(children, child);
        });
        return children ?? emptyArray;
    }

    scanner ??= createScanner(ScriptTarget.Latest, /*skipTrivia*/ true);
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
    Debug.assertIsDefined(scanner);
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
        children = append(children, node);
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
