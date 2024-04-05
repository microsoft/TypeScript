import {
    __String,
    AmdDependency,
    AssignmentDeclarationKind,
    AutoGenerateInfo,
    BinaryExpression,
    CheckJsDirective,
    CommentDirective,
    computePositionOfLineAndCharacter,
    createMultiMap,
    Debug,
    Declaration,
    DiagnosticWithLocation,
    EmitNode,
    EntityName,
    ExportDeclaration,
    FileReference,
    FlowNode,
    forEach,
    forEachChild,
    FunctionLikeDeclaration,
    getAssignmentDeclarationKind,
    getLineAndCharacterOfPosition,
    getLineStarts,
    getNameFromPropertyName,
    getNonAssignedNameOfDeclaration,
    getSourceFileOfNode,
    getTokenPosOfNode,
    HasLocals,
    hasSyntacticModifier,
    Identifier,
    idText,
    ImportDeclaration,
    ImportSpecifier,
    isBindingPattern,
    isComputedPropertyName,
    IScriptSnapshot,
    isNamedExports,
    isPropertyAccessExpression,
    isPropertyName,
    JSDoc,
    JSDocTag,
    LanguageVariant,
    lastOrUndefined,
    LineAndCharacter,
    ModeAwareCache,
    ModifierFlags,
    Node,
    NodeArray,
    NodeFlags,
    PackageJsonInfo,
    Path,
    PatternAmbientModule,
    positionIsSynthesized,
    PrivateIdentifier,
    ReadonlyPragmaMap,
    RedirectInfo,
    ResolutionMode,
    ResolvedModuleWithFailedLookupLocations,
    ResolvedTypeReferenceDirectiveWithFailedLookupLocations,
    ScriptKind,
    ScriptTarget,
    ServicesOnlyType,
    SourceFile,
    SourceFileLike,
    Statement,
    StringLiteral,
    StringLiteralLike,
    Symbol,
    SymbolTable,
    SyntaxKind,
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
export class NodeObject<TKind extends SyntaxKind> implements Node {
    declare kind: TKind;
    declare flags: NodeFlags;
    declare modifierFlagsCache: ModifierFlags;
    declare transformFlags: TransformFlags;
    declare id?: number | undefined;
    declare parent: Node;
    declare original?: Node | undefined;
    declare emitNode?: EmitNode | undefined;
    declare pos: number;
    declare end: number;

    constructor(kind: TKind) {
        this.pos = -1;
        this.end = -1;
        this.kind = kind;
        this.id = 0;
        this.flags = NodeFlags.None;
        this.modifierFlagsCache = ModifierFlags.None;
        this.transformFlags = TransformFlags.None;
        this.parent = undefined!;
        this.original = undefined;
        this.emitNode = undefined;
    }

    private assertHasRealPosition(message?: string) {
        // eslint-disable-next-line local/debug-assert
        Debug.assert(!positionIsSynthesized(this.pos) && !positionIsSynthesized(this.end), message || "Node must have a real position for this operation");
    }

    public getSourceFile(): SourceFile {
        return getSourceFileOfNode(this);
    }

    public getStart(sourceFile?: SourceFileLike, includeJsDocComment?: boolean): number {
        this.assertHasRealPosition();
        return getTokenPosOfNode(this, sourceFile, includeJsDocComment);
    }

    public getFullStart(): number {
        this.assertHasRealPosition();
        return this.pos;
    }

    public getEnd(): number {
        this.assertHasRealPosition();
        return this.end;
    }

    public getWidth(sourceFile?: SourceFile): number {
        this.assertHasRealPosition();
        return this.getEnd() - this.getStart(sourceFile);
    }

    public getFullWidth(): number {
        this.assertHasRealPosition();
        return this.end - this.pos;
    }

    public getLeadingTriviaWidth(sourceFile?: SourceFile): number {
        this.assertHasRealPosition();
        return this.getStart(sourceFile) - this.pos;
    }

    public getFullText(sourceFile?: SourceFile): string {
        this.assertHasRealPosition();
        return (sourceFile || this.getSourceFile()).text.substring(this.pos, this.end);
    }

    public getText(sourceFile?: SourceFile): string {
        this.assertHasRealPosition();
        if (!sourceFile) {
            sourceFile = this.getSourceFile();
        }
        return sourceFile.text.substring(this.getStart(sourceFile), this.getEnd());
    }

    public getChildCount(_sourceFile?: SourceFile): ServicesOnlyType<number> {
        throw new TypeError("Not implemented");
    }

    public getChildAt(_index: number, _sourceFile?: SourceFile): ServicesOnlyType<Node> {
        throw new TypeError("Not implemented");
    }

    public getChildren(_sourceFile?: SourceFileLike): ServicesOnlyType<Node[]> {
        throw new TypeError("Not implemented");
    }

    public getFirstToken(_sourceFile?: SourceFileLike): ServicesOnlyType<Node | undefined> {
        throw new TypeError("Not implemented");
    }

    public getLastToken(_sourceFile?: SourceFileLike): ServicesOnlyType<Node | undefined> {
        throw new TypeError("Not implemented");
    }

    public forEachChild<T>(cbNode: (node: Node) => T, cbNodeArray?: (nodes: NodeArray<Node>) => T): T | undefined {
        return forEachChild(this, cbNode, cbNodeArray);
    }
}

/** @internal */
export class TokenObject<Kind extends SyntaxKind> implements Token<Kind> {
    declare kind: Kind;
    declare flags: NodeFlags;
    declare modifierFlagsCache: ModifierFlags;
    declare transformFlags: TransformFlags;
    declare id?: number | undefined;
    declare parent: Node;
    declare original?: Node | undefined;
    declare emitNode?: EmitNode | undefined;
    declare pos: number;
    declare end: number;

    constructor(kind: Kind) {
        this.pos = -1;
        this.end = -1;
        this.kind = kind;
        this.id = 0;
        this.flags = NodeFlags.None;
        this.transformFlags = TransformFlags.None;
        this.parent = undefined!;
        this.emitNode = undefined;
    }

    public getSourceFile(): SourceFile {
        return getSourceFileOfNode(this);
    }

    public getStart(sourceFile?: SourceFileLike, includeJsDocComment?: boolean): number {
        return getTokenPosOfNode(this, sourceFile, includeJsDocComment);
    }

    public getFullStart(): number {
        return this.pos;
    }

    public getEnd(): number {
        return this.end;
    }

    public getWidth(sourceFile?: SourceFile): number {
        return this.getEnd() - this.getStart(sourceFile);
    }

    public getFullWidth(): number {
        return this.end - this.pos;
    }

    public getLeadingTriviaWidth(sourceFile?: SourceFile): number {
        return this.getStart(sourceFile) - this.pos;
    }

    public getFullText(sourceFile?: SourceFile): string {
        return (sourceFile || this.getSourceFile()).text.substring(this.pos, this.end);
    }

    public getText(sourceFile?: SourceFile): string {
        if (!sourceFile) {
            sourceFile = this.getSourceFile();
        }
        return sourceFile.text.substring(this.getStart(sourceFile), this.getEnd());
    }

    public getChildCount(_sourceFile?: SourceFile): ServicesOnlyType<number> {
        throw new TypeError("Not implemented");
    }

    public getChildAt(_index: number, _sourceFile?: SourceFile): ServicesOnlyType<Node> {
        throw new TypeError("Not implemented");
    }

    public getChildren(_sourceFile?: SourceFileLike): ServicesOnlyType<Node[]> {
        throw new TypeError("Not implemented");
    }

    public getFirstToken(_sourceFile?: SourceFileLike): ServicesOnlyType<Node | undefined> {
        throw new TypeError("Not implemented");
    }

    public getLastToken(_sourceFile?: SourceFileLike): ServicesOnlyType<Node | undefined> {
        throw new TypeError("Not implemented");
    }

    public forEachChild<T>(): T | undefined {
        return undefined;
    }
}

/** @internal */
export class IdentifierObject implements Identifier {
    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;
    declare _flowContainerBrand: any;

    declare kind: SyntaxKind.Identifier;
    declare escapedText: __String;
    declare originalKeywordKind?: SyntaxKind | undefined;
    declare autoGenerate: AutoGenerateInfo | undefined;
    declare generatedImportReference?: ImportSpecifier | undefined;
    declare isInJSDocNamespace?: boolean | undefined;
    declare typeArguments?: NodeArray<TypeNode | TypeParameterDeclaration> | undefined;
    declare jsdocDotPos?: number | undefined;
    declare hasExtendedUnicodeEscape?: boolean | undefined;
    declare flags: NodeFlags;
    declare modifierFlagsCache: ModifierFlags;
    declare transformFlags: TransformFlags;
    declare id?: number | undefined;
    declare parent: Node;
    declare original?: Node | undefined;
    declare emitNode?: EmitNode | undefined;
    declare pos: number;
    declare end: number;
    declare symbol: Symbol;
    declare localSymbol?: Symbol | undefined;
    declare jsDoc?: JSDoc[] | undefined;
    declare jsDocCache?: readonly JSDocTag[] | undefined;
    declare flowNode?: FlowNode | undefined;

    constructor() {
        this.pos = -1;
        this.end = -1;
        this.kind = SyntaxKind.Identifier;
        this.id = 0;
        this.flags = NodeFlags.None;
        this.transformFlags = TransformFlags.None;
        this.parent = undefined!;
        this.original = undefined;
        this.emitNode = undefined;
    }

    get text(): string {
        return idText(this);
    }

    public getSourceFile(): SourceFile {
        return getSourceFileOfNode(this);
    }

    public getStart(sourceFile?: SourceFileLike, includeJsDocComment?: boolean): number {
        return getTokenPosOfNode(this, sourceFile, includeJsDocComment);
    }

    public getFullStart(): number {
        return this.pos;
    }

    public getEnd(): number {
        return this.end;
    }

    public getWidth(sourceFile?: SourceFile): number {
        return this.getEnd() - this.getStart(sourceFile);
    }

    public getFullWidth(): number {
        return this.end - this.pos;
    }

    public getLeadingTriviaWidth(sourceFile?: SourceFile): number {
        return this.getStart(sourceFile) - this.pos;
    }

    public getFullText(sourceFile?: SourceFile): string {
        return (sourceFile || this.getSourceFile()).text.substring(this.pos, this.end);
    }

    public getText(sourceFile?: SourceFile): string {
        if (!sourceFile) {
            sourceFile = this.getSourceFile();
        }
        return sourceFile.text.substring(this.getStart(sourceFile), this.getEnd());
    }

    public getChildCount(_sourceFile?: SourceFile): ServicesOnlyType<number> {
        throw new TypeError("Not implemented");
    }

    public getChildAt(_index: number, _sourceFile?: SourceFile): ServicesOnlyType<Node> {
        throw new TypeError("Not implemented");
    }

    public getChildren(_sourceFile?: SourceFileLike): ServicesOnlyType<Node[]> {
        throw new TypeError("Not implemented");
    }

    public getFirstToken(_sourceFile?: SourceFileLike): ServicesOnlyType<Node | undefined> {
        throw new TypeError("Not implemented");
    }

    public getLastToken(_sourceFile?: SourceFileLike): ServicesOnlyType<Node | undefined> {
        throw new TypeError("Not implemented");
    }

    public forEachChild<T>(): T | undefined {
        return undefined;
    }

    static { this.prototype.kind = SyntaxKind.Identifier; }
}

/** @internal */
export class PrivateIdentifierObject implements PrivateIdentifier {
    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
    declare kind: SyntaxKind.PrivateIdentifier;
    declare escapedText: __String;
    declare autoGenerate: AutoGenerateInfo | undefined;
    declare flags: NodeFlags;
    declare modifierFlagsCache: ModifierFlags;
    declare transformFlags: TransformFlags;
    declare id?: number | undefined;
    declare parent: Node;
    declare original?: Node | undefined;
    declare emitNode?: EmitNode | undefined;
    declare pos: number;
    declare end: number;

    constructor() {
        this.pos = -1;
        this.end = -1;
        this.kind = SyntaxKind.PrivateIdentifier;
        this.id = 0;
        this.flags = NodeFlags.None;
        this.transformFlags = TransformFlags.None;
        this.parent = undefined!;
        this.original = undefined;
        this.emitNode = undefined;
    }

    get text(): string {
        return idText(this);
    }

    public getSourceFile(): SourceFile {
        return getSourceFileOfNode(this);
    }

    public getStart(sourceFile?: SourceFileLike, includeJsDocComment?: boolean): number {
        return getTokenPosOfNode(this, sourceFile, includeJsDocComment);
    }

    public getFullStart(): number {
        return this.pos;
    }

    public getEnd(): number {
        return this.end;
    }

    public getWidth(sourceFile?: SourceFile): number {
        return this.getEnd() - this.getStart(sourceFile);
    }

    public getFullWidth(): number {
        return this.end - this.pos;
    }

    public getLeadingTriviaWidth(sourceFile?: SourceFile): number {
        return this.getStart(sourceFile) - this.pos;
    }

    public getFullText(sourceFile?: SourceFile): string {
        return (sourceFile || this.getSourceFile()).text.substring(this.pos, this.end);
    }

    public getText(sourceFile?: SourceFile): string {
        if (!sourceFile) {
            sourceFile = this.getSourceFile();
        }
        return sourceFile.text.substring(this.getStart(sourceFile), this.getEnd());
    }

    public getChildCount(_sourceFile?: SourceFile): ServicesOnlyType<number> {
        throw new TypeError("Not implemented");
    }

    public getChildAt(_index: number, _sourceFile?: SourceFile): ServicesOnlyType<Node> {
        throw new TypeError("Not implemented");
    }

    public getChildren(_sourceFile?: SourceFileLike): ServicesOnlyType<Node[]> {
        throw new TypeError("Not implemented");
    }

    public getFirstToken(_sourceFile?: SourceFileLike): ServicesOnlyType<Node | undefined> {
        throw new TypeError("Not implemented");
    }

    public getLastToken(_sourceFile?: SourceFileLike): ServicesOnlyType<Node | undefined> {
        throw new TypeError("Not implemented");
    }

    public forEachChild<T>(): T | undefined {
        return undefined;
    }

    static { this.prototype.kind = SyntaxKind.PrivateIdentifier; }
}

/** @internal */
export class SourceFileObject extends NodeObject<SyntaxKind.SourceFile> implements SourceFile {
    declare _declarationBrand: any;
    declare _localsContainerBrand: any;
    declare kind: SyntaxKind.SourceFile;
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

    static { this.prototype.kind = SyntaxKind.SourceFile; }
}
