import {
    __String,
    ApplicableRefactorInfo,
    ApplyCodeActionCommandResult,
    AssignmentDeclarationKind,
    BaseType,
    BinaryExpression,
    BreakpointResolver,
    CallHierarchy,
    CallHierarchyIncomingCall,
    CallHierarchyItem,
    CallHierarchyOutgoingCall,
    CancellationToken,
    changeCompilerHostLikeToUseCache,
    CharacterCodes,
    CheckJsDirective,
    Classifications,
    ClassifiedSpan,
    ClassifiedSpan2020,
    CodeActionCommand,
    codefix,
    CodeFixAction,
    CombinedCodeActions,
    CombinedCodeFixScope,
    combinePaths,
    compareValues,
    CompilerHost,
    CompilerOptions,
    CompletionEntryData,
    CompletionEntryDetails,
    CompletionInfo,
    Completions,
    computePositionOfLineAndCharacter,
    computeSuggestionDiagnostics,
    containsParseError,
    createDocumentRegistry,
    createGetCanonicalFileName,
    createMultiMap,
    createProgram,
    CreateProgramOptions,
    createSourceFile,
    CreateSourceFileOptions,
    createTextSpanFromBounds,
    createTextSpanFromNode,
    createTextSpanFromRange,
    Debug,
    Declaration,
    deduplicate,
    DefinitionInfo,
    DefinitionInfoAndBoundSpan,
    Diagnostic,
    DiagnosticWithLocation,
    directoryProbablyExists,
    DocCommentTemplateOptions,
    DocumentHighlights,
    DocumentRegistry,
    DocumentSpan,
    EditorOptions,
    EditorSettings,
    ElementAccessExpression,
    EmitTextWriter,
    emptyArray,
    emptyOptions,
    EndOfFileToken,
    EntityName,
    equateValues,
    ExportDeclaration,
    Extension,
    extensionFromPath,
    FileReference,
    FileTextChanges,
    filter,
    find,
    FindAllReferences,
    findAncestor,
    findChildOfKind,
    findPrecedingToken,
    first,
    firstDefined,
    firstOrOnly,
    flatMap,
    forEach,
    forEachChild,
    FormatCodeOptions,
    FormatCodeSettings,
    formatting,
    FunctionLikeDeclaration,
    getAdjustedRenameLocation,
    getAllSuperTypeNodes,
    getAssignmentDeclarationKind,
    getBaseFileName,
    GetCompletionsAtPositionOptions,
    getContainerNode,
    getDefaultLibFileName,
    getDirectoryPath,
    getEditsForFileRename as ts_getEditsForFileRename,
    getEmitDeclarations,
    getEscapedTextOfIdentifierOrLiteral,
    getFileEmitOutput,
    getImpliedNodeFormatForFile,
    getJSDocTags,
    getLineAndCharacterOfPosition,
    getLineStarts,
    getMappedDocumentSpan,
    getNameFromPropertyName,
    getNewLineCharacter,
    getNewLineOrDefaultFromHost,
    getNonAssignedNameOfDeclaration,
    getNormalizedAbsolutePath,
    getObjectFlags,
    getQuotePreference,
    getScriptKind,
    getSetExternalModuleIndicator,
    getSnapshotText,
    getSourceFileOfNode,
    getSourceMapper,
    getTokenPosOfNode,
    getTouchingPropertyName,
    getTouchingToken,
    GoToDefinition,
    HasInvalidatedResolutions,
    hasJSDocNodes,
    hasProperty,
    hasStaticModifier,
    hasSyntacticModifier,
    hasTabstop,
    HostCancellationToken,
    hostGetCanonicalFileName,
    hostUsesCaseSensitiveFileNames,
    Identifier,
    identity,
    idText,
    ImplementationLocation,
    ImportDeclaration,
    IndexKind,
    IndexType,
    InlayHint,
    InlayHints,
    InlayHintsContext,
    insertSorted,
    InteractiveRefactorArguments,
    InterfaceType,
    IntersectionType,
    isArray,
    isBindingPattern,
    isComputedPropertyName,
    isConstTypeReference,
    IScriptSnapshot,
    isDeclarationName,
    isGetAccessor,
    isIdentifier,
    isImportMeta,
    isInComment,
    isInsideJsxElement,
    isInsideJsxElementOrAttribute,
    isInString,
    isInTemplateString,
    isIntrinsicJsxName,
    isJSDocCommentContainingNode,
    isJsxAttributes,
    isJsxClosingElement,
    isJsxElement,
    isJsxFragment,
    isJsxNamespacedName,
    isJsxOpeningElement,
    isJsxOpeningFragment,
    isJsxText,
    isLabelName,
    isLiteralComputedPropertyDeclarationName,
    isNamedExports,
    isNamedTupleMember,
    isNameOfModuleDeclaration,
    isNewExpression,
    isNodeKind,
    isObjectLiteralElement,
    isObjectLiteralExpression,
    isPrivateIdentifier,
    isProgramUptoDate,
    isPropertyAccessExpression,
    isPropertyName,
    isRightSideOfPropertyAccess,
    isRightSideOfQualifiedName,
    isSetAccessor,
    isStringOrNumericLiteralLike,
    isTagName,
    isTextWhiteSpaceLike,
    isThisTypeParameter,
    isTransientSymbol,
    JSDoc,
    JsDoc,
    JSDocContainer,
    JSDocParsingMode,
    JSDocTagInfo,
    JsonSourceFile,
    JsxAttributes,
    JsxClosingTagInfo,
    JsxElement,
    JsxEmit,
    JsxFragment,
    LanguageService,
    LanguageServiceHost,
    LanguageServiceMode,
    LanguageVariant,
    lastOrUndefined,
    length,
    LineAndCharacter,
    lineBreakPart,
    LinkedEditingInfo,
    LiteralType,
    map,
    mapDefined,
    MapLike,
    mapOneOrMany,
    maybeBind,
    maybeSetLocalizedDiagnosticMessages,
    ModifierFlags,
    ModuleDeclaration,
    NavigateToItem,
    NavigationBarItem,
    NavigationTree,
    Node,
    NodeArray,
    NodeFlags,
    noop,
    normalizePath,
    NumberLiteralType,
    NumericLiteral,
    ObjectAllocator,
    ObjectFlags,
    ObjectLiteralElement,
    ObjectLiteralExpression,
    OperationCanceledException,
    OrganizeImports,
    OrganizeImportsArgs,
    OrganizeImportsMode,
    OutliningElementsCollector,
    OutliningSpan,
    ParseConfigFileHost,
    ParsedCommandLine,
    parseJsonSourceFileConfigFileContent,
    Path,
    positionIsSynthesized,
    PossibleProgramFileInfo,
    PragmaMap,
    PrivateIdentifier,
    Program,
    PropertyName,
    QuickInfo,
    refactor,
    RefactorContext,
    RefactorEditInfo,
    RefactorTriggerReason,
    ReferencedSymbol,
    ReferenceEntry,
    Rename,
    RenameInfo,
    RenameInfoOptions,
    RenameLocation,
    ResolvedProjectReference,
    returnFalse,
    scanner,
    ScriptElementKind,
    ScriptElementKindModifier,
    ScriptKind,
    ScriptTarget,
    SelectionRange,
    SemanticClassificationFormat,
    setObjectAllocator,
    Signature,
    SignatureDeclaration,
    SignatureFlags,
    SignatureHelp,
    SignatureHelpItems,
    SignatureHelpItemsOptions,
    SignatureKind,
    singleElementArray,
    SmartSelectionRange,
    SortedArray,
    SourceFile,
    SourceFileLike,
    SourceMapSource,
    startsWith,
    Statement,
    StringLiteral,
    StringLiteralLike,
    StringLiteralType,
    Symbol,
    SymbolDisplay,
    SymbolDisplayPart,
    SymbolFlags,
    symbolName,
    SyntaxKind,
    SyntaxList,
    sys,
    tagNamesAreEquivalent,
    TextChange,
    TextChangeRange,
    TextInsertion,
    TextRange,
    TextSpan,
    textSpanEnd,
    timestamp,
    TodoComment,
    TodoCommentDescriptor,
    Token,
    toPath,
    tracing,
    TransformFlags,
    Type,
    TypeChecker,
    TypeFlags,
    TypeNode,
    TypeParameter,
    TypePredicate,
    TypeReference,
    typeToDisplayParts,
    UnionOrIntersectionType,
    UnionType,
    updateSourceFile,
    UserPreferences,
    VariableDeclaration,
} from "./_namespaces/ts";
import * as NavigateTo from "./_namespaces/ts.NavigateTo";
import * as NavigationBar from "./_namespaces/ts.NavigationBar";
import {
    createNewFileName,
} from "./_namespaces/ts.refactor";
import * as classifier from "./classifier";
import * as classifier2020 from "./classifier2020";

/** The version of the language service API */
export const servicesVersion = "0.8";

function createNode<TKind extends SyntaxKind>(kind: TKind, pos: number, end: number, parent: Node): NodeObject | TokenObject<TKind> | IdentifierObject | PrivateIdentifierObject {
    const node = isNodeKind(kind) ? new NodeObject(kind, pos, end) :
        kind === SyntaxKind.Identifier ? new IdentifierObject(SyntaxKind.Identifier, pos, end) :
        kind === SyntaxKind.PrivateIdentifier ? new PrivateIdentifierObject(SyntaxKind.PrivateIdentifier, pos, end) :
        new TokenObject(kind, pos, end);
    node.parent = parent;
    node.flags = parent.flags & NodeFlags.ContextFlags;
    return node;
}

class NodeObject implements Node {
    public kind: SyntaxKind;
    public pos: number;
    public end: number;
    public flags: NodeFlags;
    public modifierFlagsCache: ModifierFlags;
    public transformFlags: TransformFlags;
    public parent: Node;
    public symbol!: Symbol; // Actually optional, but it was too annoying to access `node.symbol!` everywhere since in many cases we know it must be defined
    public jsDoc?: JSDoc[];
    public original?: Node;
    private _children: Node[] | undefined;

    constructor(kind: SyntaxKind, pos: number, end: number) {
        this.pos = pos;
        this.end = end;
        this.flags = NodeFlags.None;
        this.modifierFlagsCache = ModifierFlags.None;
        this.transformFlags = TransformFlags.None;
        this.parent = undefined!;
        this.kind = kind;
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

    public getChildCount(sourceFile?: SourceFile): number {
        return this.getChildren(sourceFile).length;
    }

    public getChildAt(index: number, sourceFile?: SourceFile): Node {
        return this.getChildren(sourceFile)[index];
    }

    public getChildren(sourceFile?: SourceFileLike): Node[] {
        this.assertHasRealPosition("Node without a real position cannot be scanned and thus has no token nodes - use forEachChild and collect the result if that's fine");
        return this._children || (this._children = createChildren(this, sourceFile));
    }

    public getFirstToken(sourceFile?: SourceFileLike): Node | undefined {
        this.assertHasRealPosition();
        const children = this.getChildren(sourceFile);
        if (!children.length) {
            return undefined;
        }

        const child = find(children, kid => kid.kind < SyntaxKind.FirstJSDocNode || kid.kind > SyntaxKind.LastJSDocNode)!;
        return child.kind < SyntaxKind.FirstNode ?
            child :
            child.getFirstToken(sourceFile);
    }

    public getLastToken(sourceFile?: SourceFileLike): Node | undefined {
        this.assertHasRealPosition();
        const children = this.getChildren(sourceFile);

        const child = lastOrUndefined(children);
        if (!child) {
            return undefined;
        }

        return child.kind < SyntaxKind.FirstNode ? child : child.getLastToken(sourceFile);
    }

    public forEachChild<T>(cbNode: (node: Node) => T, cbNodeArray?: (nodes: NodeArray<Node>) => T): T | undefined {
        return forEachChild(this, cbNode, cbNodeArray);
    }
}

function createChildren(node: Node, sourceFile: SourceFileLike | undefined): Node[] {
    if (!isNodeKind(node.kind)) {
        return emptyArray;
    }

    const children: Node[] = [];

    if (isJSDocCommentContainingNode(node)) {
        /** Don't add trivia for "tokens" since this is in a comment. */
        node.forEachChild(child => {
            children.push(child);
        });
        return children;
    }

    scanner.setText((sourceFile || node.getSourceFile()).text);
    let pos = node.pos;
    const processNode = (child: Node) => {
        addSyntheticNodes(children, pos, child.pos, node);
        children.push(child);
        pos = child.end;
    };
    const processNodes = (nodes: NodeArray<Node>) => {
        addSyntheticNodes(children, pos, nodes.pos, node);
        children.push(createSyntaxList(nodes, node));
        pos = nodes.end;
    };
    // jsDocComments need to be the first children
    forEach((node as JSDocContainer).jsDoc, processNode);
    // For syntactic classifications, all trivia are classified together, including jsdoc comments.
    // For that to work, the jsdoc comments should still be the leading trivia of the first child.
    // Restoring the scanner position ensures that.
    pos = node.pos;
    node.forEachChild(processNode, processNodes);
    addSyntheticNodes(children, pos, node.end, node);
    scanner.setText(undefined);
    return children;
}

function addSyntheticNodes(nodes: Node[], pos: number, end: number, parent: Node): void {
    scanner.resetTokenState(pos);
    while (pos < end) {
        const token = scanner.scan();
        const textPos = scanner.getTokenEnd();
        if (textPos <= end) {
            if (token === SyntaxKind.Identifier) {
                if (hasTabstop(parent)) {
                    continue;
                }
                Debug.fail(`Did not expect ${Debug.formatSyntaxKind(parent.kind)} to have an Identifier in its trivia`);
            }
            nodes.push(createNode(token, pos, textPos, parent));
        }
        pos = textPos;
        if (token === SyntaxKind.EndOfFileToken) {
            break;
        }
    }
}

function createSyntaxList(nodes: NodeArray<Node>, parent: Node): Node {
    const list = createNode(SyntaxKind.SyntaxList, nodes.pos, nodes.end, parent) as any as SyntaxList;
    list._children = [];
    let pos = nodes.pos;
    for (const node of nodes) {
        addSyntheticNodes(list._children, pos, node.pos, parent);
        list._children.push(node);
        pos = node.end;
    }
    addSyntheticNodes(list._children, pos, nodes.end, parent);
    return list;
}

class TokenOrIdentifierObject implements Node {
    public kind!: SyntaxKind;
    public pos: number;
    public end: number;
    public flags: NodeFlags;
    public modifierFlagsCache: ModifierFlags;
    public transformFlags: TransformFlags;
    public parent: Node;
    public symbol!: Symbol;
    public jsDocComments?: JSDoc[];

    constructor(pos: number, end: number) {
        // Set properties in same order as NodeObject
        this.pos = pos;
        this.end = end;
        this.flags = NodeFlags.None;
        this.modifierFlagsCache = ModifierFlags.None;
        this.transformFlags = TransformFlags.None;
        this.parent = undefined!;
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

    public getChildCount(): number {
        return this.getChildren().length;
    }

    public getChildAt(index: number): Node {
        return this.getChildren()[index];
    }

    public getChildren(): Node[] {
        return this.kind === SyntaxKind.EndOfFileToken ? (this as Node as EndOfFileToken).jsDoc || emptyArray : emptyArray;
    }

    public getFirstToken(): Node | undefined {
        return undefined;
    }

    public getLastToken(): Node | undefined {
        return undefined;
    }

    public forEachChild<T>(): T | undefined {
        return undefined;
    }
}

class SymbolObject implements Symbol {
    flags: SymbolFlags;
    escapedName: __String;
    declarations!: Declaration[];
    valueDeclaration!: Declaration;
    id = 0;
    mergeId = 0;
    constEnumOnlyModule: boolean | undefined;

    // Undefined is used to indicate the value has not been computed. If, after computing, the
    // symbol has no doc comment, then the empty array will be returned.
    documentationComment?: SymbolDisplayPart[];
    tags?: JSDocTagInfo[]; // same

    contextualGetAccessorDocumentationComment?: SymbolDisplayPart[];
    contextualSetAccessorDocumentationComment?: SymbolDisplayPart[];

    contextualGetAccessorTags?: JSDocTagInfo[];
    contextualSetAccessorTags?: JSDocTagInfo[];

    constructor(flags: SymbolFlags, name: __String) {
        this.flags = flags;
        this.escapedName = name;
    }

    getFlags(): SymbolFlags {
        return this.flags;
    }

    get name(): string {
        return symbolName(this);
    }

    getEscapedName(): __String {
        return this.escapedName;
    }

    getName(): string {
        return this.name;
    }

    getDeclarations(): Declaration[] | undefined {
        return this.declarations;
    }

    getDocumentationComment(checker: TypeChecker | undefined): SymbolDisplayPart[] {
        if (!this.documentationComment) {
            this.documentationComment = emptyArray; // Set temporarily to avoid an infinite loop finding inherited docs

            if (!this.declarations && isTransientSymbol(this) && this.links.target && isTransientSymbol(this.links.target) && this.links.target.links.tupleLabelDeclaration) {
                const labelDecl = this.links.target.links.tupleLabelDeclaration;
                this.documentationComment = getDocumentationComment([labelDecl], checker);
            }
            else {
                this.documentationComment = getDocumentationComment(this.declarations, checker);
            }
        }
        return this.documentationComment;
    }

    getContextualDocumentationComment(context: Node | undefined, checker: TypeChecker | undefined): SymbolDisplayPart[] {
        if (context) {
            if (isGetAccessor(context)) {
                if (!this.contextualGetAccessorDocumentationComment) {
                    this.contextualGetAccessorDocumentationComment = getDocumentationComment(filter(this.declarations, isGetAccessor), checker);
                }
                if (length(this.contextualGetAccessorDocumentationComment)) {
                    return this.contextualGetAccessorDocumentationComment;
                }
            }
            if (isSetAccessor(context)) {
                if (!this.contextualSetAccessorDocumentationComment) {
                    this.contextualSetAccessorDocumentationComment = getDocumentationComment(filter(this.declarations, isSetAccessor), checker);
                }
                if (length(this.contextualSetAccessorDocumentationComment)) {
                    return this.contextualSetAccessorDocumentationComment;
                }
            }
        }
        return this.getDocumentationComment(checker);
    }

    getJsDocTags(checker?: TypeChecker): JSDocTagInfo[] {
        if (this.tags === undefined) {
            this.tags = getJsDocTagsOfDeclarations(this.declarations, checker);
        }

        return this.tags;
    }

    getContextualJsDocTags(context: Node | undefined, checker: TypeChecker | undefined): JSDocTagInfo[] {
        if (context) {
            if (isGetAccessor(context)) {
                if (!this.contextualGetAccessorTags) {
                    this.contextualGetAccessorTags = getJsDocTagsOfDeclarations(filter(this.declarations, isGetAccessor), checker);
                }
                if (length(this.contextualGetAccessorTags)) {
                    return this.contextualGetAccessorTags;
                }
            }
            if (isSetAccessor(context)) {
                if (!this.contextualSetAccessorTags) {
                    this.contextualSetAccessorTags = getJsDocTagsOfDeclarations(filter(this.declarations, isSetAccessor), checker);
                }
                if (length(this.contextualSetAccessorTags)) {
                    return this.contextualSetAccessorTags;
                }
            }
        }
        return this.getJsDocTags(checker);
    }
}

class TokenObject<TKind extends SyntaxKind> extends TokenOrIdentifierObject implements Token<TKind> {
    public override kind: TKind;

    constructor(kind: TKind, pos: number, end: number) {
        super(pos, end);
        this.kind = kind;
    }
}

class IdentifierObject extends TokenOrIdentifierObject implements Identifier {
    public override kind: SyntaxKind.Identifier = SyntaxKind.Identifier;
    public escapedText!: __String;
    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;
    declare _flowContainerBrand: any;
    /** @internal */ typeArguments!: NodeArray<TypeNode>;
    constructor(_kind: SyntaxKind.Identifier, pos: number, end: number) {
        super(pos, end);
    }

    get text(): string {
        return idText(this);
    }
}
IdentifierObject.prototype.kind = SyntaxKind.Identifier;
class PrivateIdentifierObject extends TokenOrIdentifierObject implements PrivateIdentifier {
    public override kind: SyntaxKind.PrivateIdentifier = SyntaxKind.PrivateIdentifier;
    public escapedText!: __String;
    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
    constructor(_kind: SyntaxKind.PrivateIdentifier, pos: number, end: number) {
        super(pos, end);
    }

    get text(): string {
        return idText(this);
    }
}
PrivateIdentifierObject.prototype.kind = SyntaxKind.PrivateIdentifier;

class TypeObject implements Type {
    checker: TypeChecker;
    flags: TypeFlags;
    objectFlags?: ObjectFlags;
    id!: number;
    symbol!: Symbol;
    constructor(checker: TypeChecker, flags: TypeFlags) {
        this.checker = checker;
        this.flags = flags;
    }
    getFlags(): TypeFlags {
        return this.flags;
    }
    getSymbol(): Symbol | undefined {
        return this.symbol;
    }
    getProperties(): Symbol[] {
        return this.checker.getPropertiesOfType(this);
    }
    getProperty(propertyName: string): Symbol | undefined {
        return this.checker.getPropertyOfType(this, propertyName);
    }
    getApparentProperties(): Symbol[] {
        return this.checker.getAugmentedPropertiesOfType(this);
    }
    getCallSignatures(): readonly Signature[] {
        return this.checker.getSignaturesOfType(this, SignatureKind.Call);
    }
    getConstructSignatures(): readonly Signature[] {
        return this.checker.getSignaturesOfType(this, SignatureKind.Construct);
    }
    getStringIndexType(): Type | undefined {
        return this.checker.getIndexTypeOfType(this, IndexKind.String);
    }
    getNumberIndexType(): Type | undefined {
        return this.checker.getIndexTypeOfType(this, IndexKind.Number);
    }
    getBaseTypes(): BaseType[] | undefined {
        return this.isClassOrInterface() ? this.checker.getBaseTypes(this) : undefined;
    }
    isNullableType(): boolean {
        return this.checker.isNullableType(this);
    }
    getNonNullableType(): Type {
        return this.checker.getNonNullableType(this);
    }
    getNonOptionalType(): Type {
        return this.checker.getNonOptionalType(this);
    }
    getConstraint(): Type | undefined {
        return this.checker.getBaseConstraintOfType(this);
    }
    getDefault(): Type | undefined {
        return this.checker.getDefaultFromTypeParameter(this);
    }

    isUnion(): this is UnionType {
        return !!(this.flags & TypeFlags.Union);
    }
    isIntersection(): this is IntersectionType {
        return !!(this.flags & TypeFlags.Intersection);
    }
    isUnionOrIntersection(): this is UnionOrIntersectionType {
        return !!(this.flags & TypeFlags.UnionOrIntersection);
    }
    isLiteral(): this is LiteralType {
        return !!(this.flags & (TypeFlags.StringLiteral | TypeFlags.NumberLiteral | TypeFlags.BigIntLiteral));
    }
    isStringLiteral(): this is StringLiteralType {
        return !!(this.flags & TypeFlags.StringLiteral);
    }
    isNumberLiteral(): this is NumberLiteralType {
        return !!(this.flags & TypeFlags.NumberLiteral);
    }
    isTypeParameter(): this is TypeParameter {
        return !!(this.flags & TypeFlags.TypeParameter);
    }
    isClassOrInterface(): this is InterfaceType {
        return !!(getObjectFlags(this) & ObjectFlags.ClassOrInterface);
    }
    isClass(): this is InterfaceType {
        return !!(getObjectFlags(this) & ObjectFlags.Class);
    }
    isIndexType(): this is IndexType {
        return !!(this.flags & TypeFlags.Index);
    }
    /**
     * This polyfills `referenceType.typeArguments` for API consumers
     */
    get typeArguments() {
        if (getObjectFlags(this) & ObjectFlags.Reference) {
            return this.checker.getTypeArguments(this as Type as TypeReference);
        }
        return undefined;
    }
}

class SignatureObject implements Signature {
    flags: SignatureFlags;
    checker: TypeChecker;
    declaration!: SignatureDeclaration;
    typeParameters?: TypeParameter[];
    parameters!: Symbol[];
    thisParameter!: Symbol;
    resolvedReturnType!: Type;
    resolvedTypePredicate: TypePredicate | undefined;
    minTypeArgumentCount!: number;
    minArgumentCount!: number;

    // Undefined is used to indicate the value has not been computed. If, after computing, the
    // symbol has no doc comment, then the empty array will be returned.
    documentationComment?: SymbolDisplayPart[];
    jsDocTags?: JSDocTagInfo[]; // same

    constructor(checker: TypeChecker, flags: SignatureFlags) {
        this.checker = checker;
        this.flags = flags;
    }

    getDeclaration(): SignatureDeclaration {
        return this.declaration;
    }
    getTypeParameters(): TypeParameter[] | undefined {
        return this.typeParameters;
    }
    getParameters(): Symbol[] {
        return this.parameters;
    }
    getReturnType(): Type {
        return this.checker.getReturnTypeOfSignature(this);
    }
    getTypeParameterAtPosition(pos: number): Type {
        const type = this.checker.getParameterType(this, pos);
        if (type.isIndexType() && isThisTypeParameter(type.type)) {
            const constraint = type.type.getConstraint();
            if (constraint) {
                return this.checker.getIndexType(constraint);
            }
        }
        return type;
    }

    getDocumentationComment(): SymbolDisplayPart[] {
        return this.documentationComment || (this.documentationComment = getDocumentationComment(singleElementArray(this.declaration), this.checker));
    }

    getJsDocTags(): JSDocTagInfo[] {
        return this.jsDocTags || (this.jsDocTags = getJsDocTagsOfDeclarations(singleElementArray(this.declaration), this.checker));
    }
}

/**
 * Returns whether or not the given node has a JSDoc "inheritDoc" tag on it.
 * @param node the Node in question.
 * @returns `true` if `node` has a JSDoc "inheritDoc" tag on it, otherwise `false`.
 */
function hasJSDocInheritDocTag(node: Node) {
    return getJSDocTags(node).some(tag => tag.tagName.text === "inheritDoc" || tag.tagName.text === "inheritdoc");
}

function getJsDocTagsOfDeclarations(declarations: Declaration[] | undefined, checker: TypeChecker | undefined): JSDocTagInfo[] {
    if (!declarations) return emptyArray;

    let tags = JsDoc.getJsDocTagsFromDeclarations(declarations, checker);
    if (checker && (tags.length === 0 || declarations.some(hasJSDocInheritDocTag))) {
        const seenSymbols = new Set<Symbol>();
        for (const declaration of declarations) {
            const inheritedTags = findBaseOfDeclaration(checker, declaration, symbol => {
                if (!seenSymbols.has(symbol)) {
                    seenSymbols.add(symbol);
                    if (declaration.kind === SyntaxKind.GetAccessor || declaration.kind === SyntaxKind.SetAccessor) {
                        return symbol.getContextualJsDocTags(declaration, checker);
                    }
                    return symbol.declarations?.length === 1 ? symbol.getJsDocTags() : undefined;
                }
            });
            if (inheritedTags) {
                tags = [...inheritedTags, ...tags];
            }
        }
    }
    return tags;
}

function getDocumentationComment(declarations: readonly Declaration[] | undefined, checker: TypeChecker | undefined): SymbolDisplayPart[] {
    if (!declarations) return emptyArray;

    let doc = JsDoc.getJsDocCommentsFromDeclarations(declarations, checker);
    if (checker && (doc.length === 0 || declarations.some(hasJSDocInheritDocTag))) {
        const seenSymbols = new Set<Symbol>();
        for (const declaration of declarations) {
            const inheritedDocs = findBaseOfDeclaration(checker, declaration, symbol => {
                if (!seenSymbols.has(symbol)) {
                    seenSymbols.add(symbol);
                    if (declaration.kind === SyntaxKind.GetAccessor || declaration.kind === SyntaxKind.SetAccessor) {
                        return symbol.getContextualDocumentationComment(declaration, checker);
                    }
                    return symbol.getDocumentationComment(checker);
                }
            });
            // TODO: GH#16312 Return a ReadonlyArray, avoid copying inheritedDocs
            if (inheritedDocs) doc = doc.length === 0 ? inheritedDocs.slice() : inheritedDocs.concat(lineBreakPart(), doc);
        }
    }
    return doc;
}

function findBaseOfDeclaration<T>(checker: TypeChecker, declaration: Declaration, cb: (symbol: Symbol) => T[] | undefined): T[] | undefined {
    const classOrInterfaceDeclaration = declaration.parent?.kind === SyntaxKind.Constructor ? declaration.parent.parent : declaration.parent;
    if (!classOrInterfaceDeclaration) return;

    const isStaticMember = hasStaticModifier(declaration);
    return firstDefined(getAllSuperTypeNodes(classOrInterfaceDeclaration), superTypeNode => {
        const baseType = checker.getTypeAtLocation(superTypeNode);
        const type = isStaticMember && baseType.symbol ? checker.getTypeOfSymbol(baseType.symbol) : baseType;
        const symbol = checker.getPropertyOfType(type, declaration.symbol.name);
        return symbol ? cb(symbol) : undefined;
    });
}

class SourceFileObject extends NodeObject implements SourceFile {
    public override kind: SyntaxKind.SourceFile = SyntaxKind.SourceFile;
    declare _declarationBrand: any;
    declare _localsContainerBrand: any;
    public fileName!: string;
    public path!: Path;
    public resolvedPath!: Path;
    public originalFileName!: string;
    public text!: string;
    public scriptSnapshot!: IScriptSnapshot;
    public lineMap!: readonly number[];

    public statements!: NodeArray<Statement>;
    public endOfFileToken!: Token<SyntaxKind.EndOfFileToken>;

    public amdDependencies!: { name: string; path: string; }[];
    public moduleName!: string;
    public referencedFiles!: FileReference[];
    public typeReferenceDirectives!: FileReference[];
    public libReferenceDirectives!: FileReference[];

    public syntacticDiagnostics!: DiagnosticWithLocation[];
    public parseDiagnostics!: DiagnosticWithLocation[];
    public bindDiagnostics!: DiagnosticWithLocation[];
    public bindSuggestionDiagnostics?: DiagnosticWithLocation[];

    public isDeclarationFile!: boolean;
    public isDefaultLib!: boolean;
    public hasNoDefaultLib!: boolean;
    public externalModuleIndicator!: Node; // The first node that causes this file to be an external module
    public commonJsModuleIndicator!: Node; // The first node that causes this file to be a CommonJS module
    public nodeCount!: number;
    public identifierCount!: number;
    public symbolCount!: number;
    public version!: string;
    public scriptKind!: ScriptKind;
    public languageVersion!: ScriptTarget;
    public languageVariant!: LanguageVariant;
    public identifiers!: Map<string, string>;
    public nameTable: Map<__String, number> | undefined;
    public imports!: readonly StringLiteralLike[];
    public moduleAugmentations!: StringLiteral[];
    private namedDeclarations: Map<string, Declaration[]> | undefined;
    public ambientModuleNames!: string[];
    public checkJsDirective: CheckJsDirective | undefined;
    public errorExpectations: TextRange[] | undefined;
    public possiblyContainDynamicImport?: boolean;
    public pragmas!: PragmaMap;
    public localJsxFactory: EntityName | undefined;
    public localJsxNamespace: __String | undefined;

    constructor(kind: SyntaxKind, pos: number, end: number) {
        super(kind, pos, end);
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
            return name && (isComputedPropertyName(name) && isPropertyAccessExpression(name.expression) ? name.expression.name.text
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

class SourceMapSourceObject implements SourceMapSource {
    lineMap!: number[];
    constructor(public fileName: string, public text: string, public skipTrivia?: (pos: number) => number) {}

    public getLineAndCharacterOfPosition(pos: number): LineAndCharacter {
        return getLineAndCharacterOfPosition(this, pos);
    }
}

function getServicesObjectAllocator(): ObjectAllocator {
    return {
        getNodeConstructor: () => NodeObject,
        getTokenConstructor: () => TokenObject,

        getIdentifierConstructor: () => IdentifierObject,
        getPrivateIdentifierConstructor: () => PrivateIdentifierObject,
        getSourceFileConstructor: () => SourceFileObject,
        getSymbolConstructor: () => SymbolObject,
        getTypeConstructor: () => TypeObject,
        getSignatureConstructor: () => SignatureObject,
        getSourceMapSourceConstructor: () => SourceMapSourceObject,
    };
}

/// Language Service

/** @internal */
export interface DisplayPartsSymbolWriter extends EmitTextWriter {
    displayParts(): SymbolDisplayPart[];
}

/** @internal */
export function toEditorSettings(options: FormatCodeOptions | FormatCodeSettings): FormatCodeSettings;
export function toEditorSettings(options: EditorOptions | EditorSettings): EditorSettings;
export function toEditorSettings(optionsAsMap: MapLike<any>): MapLike<any> {
    let allPropertiesAreCamelCased = true;
    for (const key in optionsAsMap) {
        if (hasProperty(optionsAsMap, key) && !isCamelCase(key)) {
            allPropertiesAreCamelCased = false;
            break;
        }
    }
    if (allPropertiesAreCamelCased) {
        return optionsAsMap;
    }
    const settings: MapLike<any> = {};
    for (const key in optionsAsMap) {
        if (hasProperty(optionsAsMap, key)) {
            const newKey = isCamelCase(key) ? key : key.charAt(0).toLowerCase() + key.substr(1);
            settings[newKey] = optionsAsMap[key];
        }
    }
    return settings;
}

function isCamelCase(s: string) {
    return !s.length || s.charAt(0) === s.charAt(0).toLowerCase();
}

export function displayPartsToString(displayParts: SymbolDisplayPart[] | undefined) {
    if (displayParts) {
        return map(displayParts, displayPart => displayPart.text).join("");
    }

    return "";
}

export function getDefaultCompilerOptions(): CompilerOptions {
    // Always default to "ScriptTarget.ES5" for the language service
    return {
        target: ScriptTarget.ES5,
        jsx: JsxEmit.Preserve,
    };
}

export function getSupportedCodeFixes() {
    return codefix.getSupportedErrorCodes();
}

class SyntaxTreeCache {
    // For our syntactic only features, we also keep a cache of the syntax tree for the
    // currently edited file.
    private currentFileName: string | undefined;
    private currentFileVersion: string | undefined;
    private currentFileScriptSnapshot: IScriptSnapshot | undefined;
    private currentSourceFile: SourceFile | undefined;

    constructor(private host: LanguageServiceHost) {
    }

    public getCurrentSourceFile(fileName: string): SourceFile {
        const scriptSnapshot = this.host.getScriptSnapshot(fileName);
        if (!scriptSnapshot) {
            // The host does not know about this file.
            throw new Error("Could not find file: '" + fileName + "'.");
        }

        const scriptKind = getScriptKind(fileName, this.host);
        const version = this.host.getScriptVersion(fileName);
        let sourceFile: SourceFile | undefined;

        if (this.currentFileName !== fileName) {
            // This is a new file, just parse it
            const options: CreateSourceFileOptions = {
                languageVersion: ScriptTarget.Latest,
                impliedNodeFormat: getImpliedNodeFormatForFile(
                    toPath(fileName, this.host.getCurrentDirectory(), this.host.getCompilerHost?.()?.getCanonicalFileName || hostGetCanonicalFileName(this.host)),
                    this.host.getCompilerHost?.()?.getModuleResolutionCache?.()?.getPackageJsonInfoCache(),
                    this.host,
                    this.host.getCompilationSettings(),
                ),
                setExternalModuleIndicator: getSetExternalModuleIndicator(this.host.getCompilationSettings()),
                // These files are used to produce syntax-based highlighting, which reads JSDoc, so we must use ParseAll.
                jsDocParsingMode: JSDocParsingMode.ParseAll,
            };
            sourceFile = createLanguageServiceSourceFile(fileName, scriptSnapshot, options, version, /*setNodeParents*/ true, scriptKind);
        }
        else if (this.currentFileVersion !== version) {
            // This is the same file, just a newer version. Incrementally parse the file.
            const editRange = scriptSnapshot.getChangeRange(this.currentFileScriptSnapshot!);
            sourceFile = updateLanguageServiceSourceFile(this.currentSourceFile!, scriptSnapshot, version, editRange);
        }

        if (sourceFile) {
            // All done, ensure state is up to date
            this.currentFileVersion = version;
            this.currentFileName = fileName;
            this.currentFileScriptSnapshot = scriptSnapshot;
            this.currentSourceFile = sourceFile;
        }

        return this.currentSourceFile!;
    }
}

function setSourceFileFields(sourceFile: SourceFile, scriptSnapshot: IScriptSnapshot, version: string) {
    sourceFile.version = version;
    sourceFile.scriptSnapshot = scriptSnapshot;
}

export function createLanguageServiceSourceFile(
    fileName: string,
    scriptSnapshot: IScriptSnapshot,
    scriptTargetOrOptions: ScriptTarget | CreateSourceFileOptions,
    version: string,
    setNodeParents: boolean,
    scriptKind?: ScriptKind,
): SourceFile {
    const sourceFile = createSourceFile(fileName, getSnapshotText(scriptSnapshot), scriptTargetOrOptions, setNodeParents, scriptKind);
    setSourceFileFields(sourceFile, scriptSnapshot, version);
    return sourceFile;
}

export function updateLanguageServiceSourceFile(sourceFile: SourceFile, scriptSnapshot: IScriptSnapshot, version: string, textChangeRange: TextChangeRange | undefined, aggressiveChecks?: boolean): SourceFile {
    // If we were given a text change range, and our version or open-ness changed, then
    // incrementally parse this file.
    if (textChangeRange) {
        if (version !== sourceFile.version) {
            let newText: string;

            // grab the fragment from the beginning of the original text to the beginning of the span
            const prefix = textChangeRange.span.start !== 0
                ? sourceFile.text.substr(0, textChangeRange.span.start)
                : "";

            // grab the fragment from the end of the span till the end of the original text
            const suffix = textSpanEnd(textChangeRange.span) !== sourceFile.text.length
                ? sourceFile.text.substr(textSpanEnd(textChangeRange.span))
                : "";

            if (textChangeRange.newLength === 0) {
                // edit was a deletion - just combine prefix and suffix
                newText = prefix && suffix ? prefix + suffix : prefix || suffix;
            }
            else {
                // it was actual edit, fetch the fragment of new text that correspond to new span
                const changedText = scriptSnapshot.getText(textChangeRange.span.start, textChangeRange.span.start + textChangeRange.newLength);
                // combine prefix, changed text and suffix
                newText = prefix && suffix
                    ? prefix + changedText + suffix
                    : prefix
                    ? (prefix + changedText)
                    : (changedText + suffix);
            }

            const newSourceFile = updateSourceFile(sourceFile, newText, textChangeRange, aggressiveChecks);
            setSourceFileFields(newSourceFile, scriptSnapshot, version);
            // after incremental parsing nameTable might not be up-to-date
            // drop it so it can be lazily recreated later
            newSourceFile.nameTable = undefined;

            // dispose all resources held by old script snapshot
            if (sourceFile !== newSourceFile && sourceFile.scriptSnapshot) {
                if (sourceFile.scriptSnapshot.dispose) {
                    sourceFile.scriptSnapshot.dispose();
                }

                sourceFile.scriptSnapshot = undefined;
            }

            return newSourceFile;
        }
    }

    const options: CreateSourceFileOptions = {
        languageVersion: sourceFile.languageVersion,
        impliedNodeFormat: sourceFile.impliedNodeFormat,
        setExternalModuleIndicator: sourceFile.setExternalModuleIndicator,
        jsDocParsingMode: sourceFile.jsDocParsingMode,
    };
    // Otherwise, just create a new source file.
    return createLanguageServiceSourceFile(sourceFile.fileName, scriptSnapshot, options, version, /*setNodeParents*/ true, sourceFile.scriptKind);
}

const NoopCancellationToken: CancellationToken = {
    isCancellationRequested: returnFalse,
    throwIfCancellationRequested: noop,
};

class CancellationTokenObject implements CancellationToken {
    constructor(private cancellationToken: HostCancellationToken) {
    }

    public isCancellationRequested(): boolean {
        return this.cancellationToken.isCancellationRequested();
    }

    public throwIfCancellationRequested(): void {
        if (this.isCancellationRequested()) {
            tracing?.instant(tracing.Phase.Session, "cancellationThrown", { kind: "CancellationTokenObject" });
            throw new OperationCanceledException();
        }
    }
}

/**
 * A cancellation that throttles calls to the host
 *
 * @internal
 */
export class ThrottledCancellationToken implements CancellationToken {
    // Store when we last tried to cancel.  Checking cancellation can be expensive (as we have
    // to marshall over to the host layer).  So we only bother actually checking once enough
    // time has passed.
    private lastCancellationCheckTime = 0;

    constructor(private hostCancellationToken: HostCancellationToken, private readonly throttleWaitMilliseconds = 20) {
    }

    public isCancellationRequested(): boolean {
        const time = timestamp();
        const duration = Math.abs(time - this.lastCancellationCheckTime);
        if (duration >= this.throttleWaitMilliseconds) {
            // Check no more than once every throttle wait milliseconds
            this.lastCancellationCheckTime = time;
            return this.hostCancellationToken.isCancellationRequested();
        }

        return false;
    }

    public throwIfCancellationRequested(): void {
        if (this.isCancellationRequested()) {
            tracing?.instant(tracing.Phase.Session, "cancellationThrown", { kind: "ThrottledCancellationToken" });
            throw new OperationCanceledException();
        }
    }
}

const invalidOperationsInPartialSemanticMode: readonly (keyof LanguageService)[] = [
    "getSemanticDiagnostics",
    "getSuggestionDiagnostics",
    "getCompilerOptionsDiagnostics",
    "getSemanticClassifications",
    "getEncodedSemanticClassifications",
    "getCodeFixesAtPosition",
    "getCombinedCodeFix",
    "applyCodeActionCommand",
    "organizeImports",
    "getEditsForFileRename",
    "getEmitOutput",
    "getApplicableRefactors",
    "getEditsForRefactor",
    "prepareCallHierarchy",
    "provideCallHierarchyIncomingCalls",
    "provideCallHierarchyOutgoingCalls",
    "provideInlayHints",
    "getSupportedCodeFixes",
];

const invalidOperationsInSyntacticMode: readonly (keyof LanguageService)[] = [
    ...invalidOperationsInPartialSemanticMode,
    "getCompletionsAtPosition",
    "getCompletionEntryDetails",
    "getCompletionEntrySymbol",
    "getSignatureHelpItems",
    "getQuickInfoAtPosition",
    "getDefinitionAtPosition",
    "getDefinitionAndBoundSpan",
    "getImplementationAtPosition",
    "getTypeDefinitionAtPosition",
    "getReferencesAtPosition",
    "findReferences",
    "getDocumentHighlights",
    "getNavigateToItems",
    "getRenameInfo",
    "findRenameLocations",
    "getApplicableRefactors",
];
export function createLanguageService(
    host: LanguageServiceHost,
    documentRegistry: DocumentRegistry = createDocumentRegistry(host.useCaseSensitiveFileNames && host.useCaseSensitiveFileNames(), host.getCurrentDirectory()),
    syntaxOnlyOrLanguageServiceMode?: boolean | LanguageServiceMode,
): LanguageService {
    let languageServiceMode: LanguageServiceMode;
    if (syntaxOnlyOrLanguageServiceMode === undefined) {
        languageServiceMode = LanguageServiceMode.Semantic;
    }
    else if (typeof syntaxOnlyOrLanguageServiceMode === "boolean") {
        // languageServiceMode = SyntaxOnly
        languageServiceMode = syntaxOnlyOrLanguageServiceMode ? LanguageServiceMode.Syntactic : LanguageServiceMode.Semantic;
    }
    else {
        languageServiceMode = syntaxOnlyOrLanguageServiceMode;
    }

    const syntaxTreeCache: SyntaxTreeCache = new SyntaxTreeCache(host);
    let program: Program;
    let lastProjectVersion: string;
    let lastTypesRootVersion = 0;

    const cancellationToken = host.getCancellationToken
        ? new CancellationTokenObject(host.getCancellationToken())
        : NoopCancellationToken;

    const currentDirectory = host.getCurrentDirectory();

    // Checks if the localized messages json is set, and if not, query the host for it
    maybeSetLocalizedDiagnosticMessages(host.getLocalizedDiagnosticMessages?.bind(host));

    function log(message: string) {
        if (host.log) {
            host.log(message);
        }
    }

    const useCaseSensitiveFileNames = hostUsesCaseSensitiveFileNames(host);
    const getCanonicalFileName = createGetCanonicalFileName(useCaseSensitiveFileNames);

    const sourceMapper = getSourceMapper({
        useCaseSensitiveFileNames: () => useCaseSensitiveFileNames,
        getCurrentDirectory: () => currentDirectory,
        getProgram,
        fileExists: maybeBind(host, host.fileExists),
        readFile: maybeBind(host, host.readFile),
        getDocumentPositionMapper: maybeBind(host, host.getDocumentPositionMapper),
        getSourceFileLike: maybeBind(host, host.getSourceFileLike),
        log,
    });

    function getValidSourceFile(fileName: string): SourceFile {
        const sourceFile = program.getSourceFile(fileName);
        if (!sourceFile) {
            const error: Error & PossibleProgramFileInfo = new Error(`Could not find source file: '${fileName}'.`);

            // We've been having trouble debugging this, so attach sidecar data for the tsserver log.
            // See https://github.com/microsoft/TypeScript/issues/30180.
            error.ProgramFiles = program.getSourceFiles().map(f => f.fileName);

            throw error;
        }
        return sourceFile;
    }

    function synchronizeHostData(): void {
        if (host.updateFromProject && !host.updateFromProjectInProgress) {
            host.updateFromProject();
        }
        else {
            synchronizeHostDataWorker();
        }
    }

    function synchronizeHostDataWorker(): void {
        Debug.assert(languageServiceMode !== LanguageServiceMode.Syntactic);
        // perform fast check if host supports it
        if (host.getProjectVersion) {
            const hostProjectVersion = host.getProjectVersion();
            if (hostProjectVersion) {
                if (lastProjectVersion === hostProjectVersion && !host.hasChangedAutomaticTypeDirectiveNames?.()) {
                    return;
                }

                lastProjectVersion = hostProjectVersion;
            }
        }

        const typeRootsVersion = host.getTypeRootsVersion ? host.getTypeRootsVersion() : 0;
        if (lastTypesRootVersion !== typeRootsVersion) {
            log("TypeRoots version has changed; provide new program");
            program = undefined!; // TODO: GH#18217
            lastTypesRootVersion = typeRootsVersion;
        }

        // This array is retained by the program and will be used to determine if the program is up to date,
        // so we need to make a copy in case the host mutates the underlying array - otherwise it would look
        // like every program always has the host's current list of root files.
        const rootFileNames = host.getScriptFileNames().slice();

        // Get a fresh cache of the host information
        const newSettings = host.getCompilationSettings() || getDefaultCompilerOptions();
        const hasInvalidatedResolutions: HasInvalidatedResolutions = host.hasInvalidatedResolutions || returnFalse;
        const hasInvalidatedLibResolutions = maybeBind(host, host.hasInvalidatedLibResolutions) || returnFalse;
        const hasChangedAutomaticTypeDirectiveNames = maybeBind(host, host.hasChangedAutomaticTypeDirectiveNames);
        const projectReferences = host.getProjectReferences?.();
        let parsedCommandLines: Map<Path, ParsedCommandLine | false> | undefined;

        // Now create a new compiler
        let compilerHost: CompilerHost | undefined = {
            getSourceFile: getOrCreateSourceFile,
            getSourceFileByPath: getOrCreateSourceFileByPath,
            getCancellationToken: () => cancellationToken,
            getCanonicalFileName,
            useCaseSensitiveFileNames: () => useCaseSensitiveFileNames,
            getNewLine: () => getNewLineCharacter(newSettings),
            getDefaultLibFileName: options => host.getDefaultLibFileName(options),
            writeFile: noop,
            getCurrentDirectory: () => currentDirectory,
            fileExists: fileName => host.fileExists(fileName),
            readFile: fileName => host.readFile && host.readFile(fileName),
            getSymlinkCache: maybeBind(host, host.getSymlinkCache),
            realpath: maybeBind(host, host.realpath),
            directoryExists: directoryName => {
                return directoryProbablyExists(directoryName, host);
            },
            getDirectories: path => {
                return host.getDirectories ? host.getDirectories(path) : [];
            },
            readDirectory: (path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number) => {
                Debug.checkDefined(host.readDirectory, "'LanguageServiceHost.readDirectory' must be implemented to correctly process 'projectReferences'");
                return host.readDirectory!(path, extensions, exclude, include, depth);
            },
            onReleaseOldSourceFile,
            onReleaseParsedCommandLine,
            hasInvalidatedResolutions,
            hasInvalidatedLibResolutions,
            hasChangedAutomaticTypeDirectiveNames,
            trace: maybeBind(host, host.trace),
            resolveModuleNames: maybeBind(host, host.resolveModuleNames),
            getModuleResolutionCache: maybeBind(host, host.getModuleResolutionCache),
            createHash: maybeBind(host, host.createHash),
            resolveTypeReferenceDirectives: maybeBind(host, host.resolveTypeReferenceDirectives),
            resolveModuleNameLiterals: maybeBind(host, host.resolveModuleNameLiterals),
            resolveTypeReferenceDirectiveReferences: maybeBind(host, host.resolveTypeReferenceDirectiveReferences),
            resolveLibrary: maybeBind(host, host.resolveLibrary),
            useSourceOfProjectReferenceRedirect: maybeBind(host, host.useSourceOfProjectReferenceRedirect),
            getParsedCommandLine,
            jsDocParsingMode: host.jsDocParsingMode,
        };

        const originalGetSourceFile = compilerHost.getSourceFile;

        const { getSourceFileWithCache } = changeCompilerHostLikeToUseCache(
            compilerHost,
            fileName => toPath(fileName, currentDirectory, getCanonicalFileName),
            (...args) => originalGetSourceFile.call(compilerHost, ...args),
        );
        compilerHost.getSourceFile = getSourceFileWithCache!;

        host.setCompilerHost?.(compilerHost);

        const parseConfigHost: ParseConfigFileHost = {
            useCaseSensitiveFileNames,
            fileExists: fileName => compilerHost!.fileExists(fileName),
            readFile: fileName => compilerHost!.readFile(fileName),
            directoryExists: f => compilerHost!.directoryExists!(f),
            getDirectories: f => compilerHost!.getDirectories!(f),
            realpath: compilerHost.realpath,
            readDirectory: (...args) => compilerHost!.readDirectory!(...args),
            trace: compilerHost.trace,
            getCurrentDirectory: compilerHost.getCurrentDirectory,
            onUnRecoverableConfigFileDiagnostic: noop,
        };

        // The call to isProgramUptoDate below may refer back to documentRegistryBucketKey;
        // calculate this early so it's not undefined if downleveled to a var (or, if emitted
        // as a const variable without downleveling, doesn't crash).
        const documentRegistryBucketKey = documentRegistry.getKeyForCompilationSettings(newSettings);
        let releasedScriptKinds: Set<Path> | undefined = new Set();

        // If the program is already up-to-date, we can reuse it
        if (isProgramUptoDate(program, rootFileNames, newSettings, (_path, fileName) => host.getScriptVersion(fileName), fileName => compilerHost!.fileExists(fileName), hasInvalidatedResolutions, hasInvalidatedLibResolutions, hasChangedAutomaticTypeDirectiveNames, getParsedCommandLine, projectReferences)) {
            compilerHost = undefined;
            parsedCommandLines = undefined;
            releasedScriptKinds = undefined;
            return;
        }

        // IMPORTANT - It is critical from this moment onward that we do not check
        // cancellation tokens.  We are about to mutate source files from a previous program
        // instance.  If we cancel midway through, we may end up in an inconsistent state where
        // the program points to old source files that have been invalidated because of
        // incremental parsing.

        const options: CreateProgramOptions = {
            rootNames: rootFileNames,
            options: newSettings,
            host: compilerHost,
            oldProgram: program,
            projectReferences,
        };
        program = createProgram(options);

        // 'getOrCreateSourceFile' depends on caching but should be used past this point.
        // After this point, the cache needs to be cleared to allow all collected snapshots to be released
        compilerHost = undefined;
        parsedCommandLines = undefined;
        releasedScriptKinds = undefined;

        // We reset this cache on structure invalidation so we don't hold on to outdated files for long; however we can't use the `compilerHost` above,
        // Because it only functions until `hostCache` is cleared, while we'll potentially need the functionality to lazily read sourcemap files during
        // the course of whatever called `synchronizeHostData`
        sourceMapper.clearCache();

        // Make sure all the nodes in the program are both bound, and have their parent
        // pointers set property.
        program.getTypeChecker();
        return;

        function getParsedCommandLine(fileName: string): ParsedCommandLine | undefined {
            const path = toPath(fileName, currentDirectory, getCanonicalFileName);
            const existing = parsedCommandLines?.get(path);
            if (existing !== undefined) return existing || undefined;

            const result = host.getParsedCommandLine ?
                host.getParsedCommandLine(fileName) :
                getParsedCommandLineOfConfigFileUsingSourceFile(fileName);
            (parsedCommandLines ||= new Map()).set(path, result || false);
            return result;
        }

        function getParsedCommandLineOfConfigFileUsingSourceFile(configFileName: string): ParsedCommandLine | undefined {
            const result = getOrCreateSourceFile(configFileName, ScriptTarget.JSON) as JsonSourceFile | undefined;
            if (!result) return undefined;
            result.path = toPath(configFileName, currentDirectory, getCanonicalFileName);
            result.resolvedPath = result.path;
            result.originalFileName = result.fileName;
            return parseJsonSourceFileConfigFileContent(
                result,
                parseConfigHost,
                getNormalizedAbsolutePath(getDirectoryPath(configFileName), currentDirectory),
                /*existingOptions*/ undefined,
                getNormalizedAbsolutePath(configFileName, currentDirectory),
            );
        }

        function onReleaseParsedCommandLine(configFileName: string, oldResolvedRef: ResolvedProjectReference | undefined, oldOptions: CompilerOptions) {
            if (host.getParsedCommandLine) {
                host.onReleaseParsedCommandLine?.(configFileName, oldResolvedRef, oldOptions);
            }
            else if (oldResolvedRef) {
                onReleaseOldSourceFile(oldResolvedRef.sourceFile, oldOptions);
            }
        }

        // Release any files we have acquired in the old program but are
        // not part of the new program.
        function onReleaseOldSourceFile(oldSourceFile: SourceFile, oldOptions: CompilerOptions) {
            const oldSettingsKey = documentRegistry.getKeyForCompilationSettings(oldOptions);
            documentRegistry.releaseDocumentWithKey(oldSourceFile.resolvedPath, oldSettingsKey, oldSourceFile.scriptKind, oldSourceFile.impliedNodeFormat);
        }

        function getOrCreateSourceFile(fileName: string, languageVersionOrOptions: ScriptTarget | CreateSourceFileOptions, onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean): SourceFile | undefined {
            return getOrCreateSourceFileByPath(fileName, toPath(fileName, currentDirectory, getCanonicalFileName), languageVersionOrOptions, onError, shouldCreateNewSourceFile);
        }

        function getOrCreateSourceFileByPath(fileName: string, path: Path, languageVersionOrOptions: ScriptTarget | CreateSourceFileOptions, _onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean): SourceFile | undefined {
            Debug.assert(compilerHost, "getOrCreateSourceFileByPath called after typical CompilerHost lifetime, check the callstack something with a reference to an old host.");
            // The program is asking for this file, check first if the host can locate it.
            // If the host can not locate the file, then it does not exist. return undefined
            // to the program to allow reporting of errors for missing files.
            const scriptSnapshot = host.getScriptSnapshot(fileName);
            if (!scriptSnapshot) {
                return undefined;
            }

            const scriptKind = getScriptKind(fileName, host);
            const scriptVersion = host.getScriptVersion(fileName);

            // Check if the language version has changed since we last created a program; if they are the same,
            // it is safe to reuse the sourceFiles; if not, then the shape of the AST can change, and the oldSourceFile
            // can not be reused. we have to dump all syntax trees and create new ones.
            if (!shouldCreateNewSourceFile) {
                // Check if the old program had this file already
                const oldSourceFile = program && program.getSourceFileByPath(path);
                if (oldSourceFile) {
                    // We already had a source file for this file name.  Go to the registry to
                    // ensure that we get the right up to date version of it.  We need this to
                    // address the following race-condition.  Specifically, say we have the following:
                    //
                    //      LS1
                    //          \
                    //           DocumentRegistry
                    //          /
                    //      LS2
                    //
                    // Each LS has a reference to file 'foo.ts' at version 1.  LS2 then updates
                    // it's version of 'foo.ts' to version 2.  This will cause LS2 and the
                    // DocumentRegistry to have version 2 of the document.  However, LS1 will
                    // have version 1.  And *importantly* this source file will be *corrupt*.
                    // The act of creating version 2 of the file irrevocably damages the version
                    // 1 file.
                    //
                    // So, later when we call into LS1, we need to make sure that it doesn't use
                    // it's source file any more, and instead defers to DocumentRegistry to get
                    // either version 1, version 2 (or some other version) depending on what the
                    // host says should be used.

                    // We do not support the scenario where a host can modify a registered
                    // file's script kind, i.e. in one project some file is treated as ".ts"
                    // and in another as ".js"
                    if (scriptKind === oldSourceFile.scriptKind || releasedScriptKinds!.has(oldSourceFile.resolvedPath)) {
                        return documentRegistry.updateDocumentWithKey(fileName, path, host, documentRegistryBucketKey, scriptSnapshot, scriptVersion, scriptKind, languageVersionOrOptions);
                    }
                    else {
                        // Release old source file and fall through to aquire new file with new script kind
                        documentRegistry.releaseDocumentWithKey(oldSourceFile.resolvedPath, documentRegistry.getKeyForCompilationSettings(program.getCompilerOptions()), oldSourceFile.scriptKind, oldSourceFile.impliedNodeFormat);
                        releasedScriptKinds!.add(oldSourceFile.resolvedPath);
                    }
                }

                // We didn't already have the file.  Fall through and acquire it from the registry.
            }

            // Could not find this file in the old program, create a new SourceFile for it.
            return documentRegistry.acquireDocumentWithKey(fileName, path, host, documentRegistryBucketKey, scriptSnapshot, scriptVersion, scriptKind, languageVersionOrOptions);
        }
    }

    // TODO: GH#18217 frequently asserted as defined
    function getProgram(): Program | undefined {
        if (languageServiceMode === LanguageServiceMode.Syntactic) {
            Debug.assert(program === undefined);
            return undefined;
        }

        synchronizeHostData();

        return program;
    }

    function getAutoImportProvider(): Program | undefined {
        return host.getPackageJsonAutoImportProvider?.();
    }

    function updateIsDefinitionOfReferencedSymbols(referencedSymbols: readonly ReferencedSymbol[], knownSymbolSpans: Set<DocumentSpan>): boolean {
        const checker = program.getTypeChecker();
        const symbol = getSymbolForProgram();

        if (!symbol) return false;

        for (const referencedSymbol of referencedSymbols) {
            for (const ref of referencedSymbol.references) {
                const refNode = getNodeForSpan(ref);
                Debug.assertIsDefined(refNode);
                if (knownSymbolSpans.has(ref) || FindAllReferences.isDeclarationOfSymbol(refNode, symbol)) {
                    knownSymbolSpans.add(ref);
                    ref.isDefinition = true;
                    const mappedSpan = getMappedDocumentSpan(ref, sourceMapper, maybeBind(host, host.fileExists));
                    if (mappedSpan) {
                        knownSymbolSpans.add(mappedSpan);
                    }
                }
                else {
                    ref.isDefinition = false;
                }
            }
        }

        return true;

        function getSymbolForProgram(): Symbol | undefined {
            for (const referencedSymbol of referencedSymbols) {
                for (const ref of referencedSymbol.references) {
                    if (knownSymbolSpans.has(ref)) {
                        const refNode = getNodeForSpan(ref);
                        Debug.assertIsDefined(refNode);
                        return checker.getSymbolAtLocation(refNode);
                    }
                    const mappedSpan = getMappedDocumentSpan(ref, sourceMapper, maybeBind(host, host.fileExists));
                    if (mappedSpan && knownSymbolSpans.has(mappedSpan)) {
                        const refNode = getNodeForSpan(mappedSpan);
                        if (refNode) {
                            return checker.getSymbolAtLocation(refNode);
                        }
                    }
                }
            }

            return undefined;
        }

        function getNodeForSpan(docSpan: DocumentSpan): Node | undefined {
            const sourceFile = program.getSourceFile(docSpan.fileName);
            if (!sourceFile) return undefined;
            const rawNode = getTouchingPropertyName(sourceFile, docSpan.textSpan.start);
            const adjustedNode = FindAllReferences.Core.getAdjustedNode(rawNode, { use: FindAllReferences.FindReferencesUse.References });
            return adjustedNode;
        }
    }

    function cleanupSemanticCache(): void {
        if (program) {
            // Use paths to ensure we are using correct key and paths as document registry could be created with different current directory than host
            const key = documentRegistry.getKeyForCompilationSettings(program.getCompilerOptions());
            forEach(program.getSourceFiles(), f => documentRegistry.releaseDocumentWithKey(f.resolvedPath, key, f.scriptKind, f.impliedNodeFormat));
            program = undefined!; // TODO: GH#18217
        }
    }

    function dispose(): void {
        cleanupSemanticCache();
        host = undefined!;
    }

    /// Diagnostics
    function getSyntacticDiagnostics(fileName: string): DiagnosticWithLocation[] {
        synchronizeHostData();

        return program.getSyntacticDiagnostics(getValidSourceFile(fileName), cancellationToken).slice();
    }

    /**
     * getSemanticDiagnostics return array of Diagnostics. If '-d' is not enabled, only report semantic errors
     * If '-d' enabled, report both semantic and emitter errors
     */
    function getSemanticDiagnostics(fileName: string): Diagnostic[] {
        synchronizeHostData();

        const targetSourceFile = getValidSourceFile(fileName);

        // Only perform the action per file regardless of '-out' flag as LanguageServiceHost is expected to call this function per file.
        // Therefore only get diagnostics for given file.

        const semanticDiagnostics = program.getSemanticDiagnostics(targetSourceFile, cancellationToken);
        if (!getEmitDeclarations(program.getCompilerOptions())) {
            return semanticDiagnostics.slice();
        }

        // If '-d' is enabled, check for emitter error. One example of emitter error is export class implements non-export interface
        const declarationDiagnostics = program.getDeclarationDiagnostics(targetSourceFile, cancellationToken);
        return [...semanticDiagnostics, ...declarationDiagnostics];
    }

    function getSuggestionDiagnostics(fileName: string): DiagnosticWithLocation[] {
        synchronizeHostData();
        return computeSuggestionDiagnostics(getValidSourceFile(fileName), program, cancellationToken);
    }

    function getCompilerOptionsDiagnostics() {
        synchronizeHostData();
        return [...program.getOptionsDiagnostics(cancellationToken), ...program.getGlobalDiagnostics(cancellationToken)];
    }

    function getCompletionsAtPosition(fileName: string, position: number, options: GetCompletionsAtPositionOptions = emptyOptions, formattingSettings?: FormatCodeSettings): CompletionInfo | undefined {
        // Convert from deprecated options names to new names
        const fullPreferences: UserPreferences = {
            ...identity<UserPreferences>(options), // avoid excess property check
            includeCompletionsForModuleExports: options.includeCompletionsForModuleExports || options.includeExternalModuleExports,
            includeCompletionsWithInsertText: options.includeCompletionsWithInsertText || options.includeInsertTextCompletions,
        };
        synchronizeHostData();
        return Completions.getCompletionsAtPosition(
            host,
            program,
            log,
            getValidSourceFile(fileName),
            position,
            fullPreferences,
            options.triggerCharacter,
            options.triggerKind,
            cancellationToken,
            formattingSettings && formatting.getFormatContext(formattingSettings, host),
            options.includeSymbol,
        );
    }

    function getCompletionEntryDetails(fileName: string, position: number, name: string, formattingOptions: FormatCodeSettings | undefined, source: string | undefined, preferences: UserPreferences = emptyOptions, data?: CompletionEntryData): CompletionEntryDetails | undefined {
        synchronizeHostData();
        return Completions.getCompletionEntryDetails(
            program,
            log,
            getValidSourceFile(fileName),
            position,
            { name, source, data },
            host,
            (formattingOptions && formatting.getFormatContext(formattingOptions, host))!, // TODO: GH#18217
            preferences,
            cancellationToken,
        );
    }

    function getCompletionEntrySymbol(fileName: string, position: number, name: string, source?: string, preferences: UserPreferences = emptyOptions): Symbol | undefined {
        synchronizeHostData();
        return Completions.getCompletionEntrySymbol(program, log, getValidSourceFile(fileName), position, { name, source }, host, preferences);
    }

    function getQuickInfoAtPosition(fileName: string, position: number): QuickInfo | undefined {
        synchronizeHostData();

        const sourceFile = getValidSourceFile(fileName);
        const node = getTouchingPropertyName(sourceFile, position);
        if (node === sourceFile) {
            // Avoid giving quickInfo for the sourceFile as a whole.
            return undefined;
        }

        const typeChecker = program.getTypeChecker();
        const nodeForQuickInfo = getNodeForQuickInfo(node);
        const symbol = getSymbolAtLocationForQuickInfo(nodeForQuickInfo, typeChecker);

        if (!symbol || typeChecker.isUnknownSymbol(symbol)) {
            const type = shouldGetType(sourceFile, nodeForQuickInfo, position) ? typeChecker.getTypeAtLocation(nodeForQuickInfo) : undefined;
            return type && {
                kind: ScriptElementKind.unknown,
                kindModifiers: ScriptElementKindModifier.none,
                textSpan: createTextSpanFromNode(nodeForQuickInfo, sourceFile),
                displayParts: typeChecker.runWithCancellationToken(cancellationToken, typeChecker => typeToDisplayParts(typeChecker, type, getContainerNode(nodeForQuickInfo))),
                documentation: type.symbol ? type.symbol.getDocumentationComment(typeChecker) : undefined,
                tags: type.symbol ? type.symbol.getJsDocTags(typeChecker) : undefined,
            };
        }

        const { symbolKind, displayParts, documentation, tags } = typeChecker.runWithCancellationToken(cancellationToken, typeChecker => SymbolDisplay.getSymbolDisplayPartsDocumentationAndSymbolKind(typeChecker, symbol, sourceFile, getContainerNode(nodeForQuickInfo), nodeForQuickInfo));
        return {
            kind: symbolKind,
            kindModifiers: SymbolDisplay.getSymbolModifiers(typeChecker, symbol),
            textSpan: createTextSpanFromNode(nodeForQuickInfo, sourceFile),
            displayParts,
            documentation,
            tags,
        };
    }

    function getNodeForQuickInfo(node: Node): Node {
        if (isNewExpression(node.parent) && node.pos === node.parent.pos) {
            return node.parent.expression;
        }
        if (isNamedTupleMember(node.parent) && node.pos === node.parent.pos) {
            return node.parent;
        }
        if (isImportMeta(node.parent) && node.parent.name === node) {
            return node.parent;
        }
        if (isJsxNamespacedName(node.parent)) {
            return node.parent;
        }
        return node;
    }

    function shouldGetType(sourceFile: SourceFile, node: Node, position: number): boolean {
        switch (node.kind) {
            case SyntaxKind.Identifier:
                return !isLabelName(node) && !isTagName(node) && !isConstTypeReference(node.parent);
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.QualifiedName:
                // Don't return quickInfo if inside the comment in `a/**/.b`
                return !isInComment(sourceFile, position);
            case SyntaxKind.ThisKeyword:
            case SyntaxKind.ThisType:
            case SyntaxKind.SuperKeyword:
            case SyntaxKind.NamedTupleMember:
                return true;
            case SyntaxKind.MetaProperty:
                return isImportMeta(node);
            default:
                return false;
        }
    }

    /// Goto definition
    function getDefinitionAtPosition(fileName: string, position: number, searchOtherFilesOnly?: boolean, stopAtAlias?: boolean): readonly DefinitionInfo[] | undefined {
        synchronizeHostData();
        return GoToDefinition.getDefinitionAtPosition(program, getValidSourceFile(fileName), position, searchOtherFilesOnly, stopAtAlias);
    }

    function getDefinitionAndBoundSpan(fileName: string, position: number): DefinitionInfoAndBoundSpan | undefined {
        synchronizeHostData();
        return GoToDefinition.getDefinitionAndBoundSpan(program, getValidSourceFile(fileName), position);
    }

    function getTypeDefinitionAtPosition(fileName: string, position: number): readonly DefinitionInfo[] | undefined {
        synchronizeHostData();
        return GoToDefinition.getTypeDefinitionAtPosition(program.getTypeChecker(), getValidSourceFile(fileName), position);
    }

    /// Goto implementation

    function getImplementationAtPosition(fileName: string, position: number): ImplementationLocation[] | undefined {
        synchronizeHostData();
        return FindAllReferences.getImplementationsAtPosition(program, cancellationToken, program.getSourceFiles(), getValidSourceFile(fileName), position);
    }

    /// References and Occurrences

    function getDocumentHighlights(fileName: string, position: number, filesToSearch: readonly string[]): DocumentHighlights[] | undefined {
        const normalizedFileName = normalizePath(fileName);
        Debug.assert(filesToSearch.some(f => normalizePath(f) === normalizedFileName));
        synchronizeHostData();
        const sourceFilesToSearch = mapDefined(filesToSearch, fileName => program.getSourceFile(fileName));
        const sourceFile = getValidSourceFile(fileName);
        return DocumentHighlights.getDocumentHighlights(program, cancellationToken, sourceFile, position, sourceFilesToSearch);
    }

    function findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean, preferences?: UserPreferences | boolean): RenameLocation[] | undefined {
        synchronizeHostData();
        const sourceFile = getValidSourceFile(fileName);
        const node = getAdjustedRenameLocation(getTouchingPropertyName(sourceFile, position));
        if (!Rename.nodeIsEligibleForRename(node)) return undefined;
        if (isIdentifier(node) && (isJsxOpeningElement(node.parent) || isJsxClosingElement(node.parent)) && isIntrinsicJsxName(node.escapedText)) {
            const { openingElement, closingElement } = node.parent.parent;
            return [openingElement, closingElement].map((node): RenameLocation => {
                const textSpan = createTextSpanFromNode(node.tagName, sourceFile);
                return {
                    fileName: sourceFile.fileName,
                    textSpan,
                    ...FindAllReferences.toContextSpan(textSpan, sourceFile, node.parent),
                };
            });
        }
        else {
            const quotePreference = getQuotePreference(sourceFile, preferences ?? emptyOptions);
            const providePrefixAndSuffixTextForRename = typeof preferences === "boolean" ? preferences : preferences?.providePrefixAndSuffixTextForRename;
            return getReferencesWorker(node, position, { findInStrings, findInComments, providePrefixAndSuffixTextForRename, use: FindAllReferences.FindReferencesUse.Rename }, (entry, originalNode, checker) => FindAllReferences.toRenameLocation(entry, originalNode, checker, providePrefixAndSuffixTextForRename || false, quotePreference));
        }
    }

    function getReferencesAtPosition(fileName: string, position: number): ReferenceEntry[] | undefined {
        synchronizeHostData();
        return getReferencesWorker(getTouchingPropertyName(getValidSourceFile(fileName), position), position, { use: FindAllReferences.FindReferencesUse.References }, FindAllReferences.toReferenceEntry);
    }

    function getReferencesWorker<T>(node: Node, position: number, options: FindAllReferences.Options, cb: FindAllReferences.ToReferenceOrRenameEntry<T>): T[] | undefined {
        synchronizeHostData();

        // Exclude default library when renaming as commonly user don't want to change that file.
        const sourceFiles = options && options.use === FindAllReferences.FindReferencesUse.Rename
            ? program.getSourceFiles().filter(sourceFile => !program.isSourceFileDefaultLibrary(sourceFile))
            : program.getSourceFiles();

        return FindAllReferences.findReferenceOrRenameEntries(program, cancellationToken, sourceFiles, node, position, options, cb);
    }

    function findReferences(fileName: string, position: number): ReferencedSymbol[] | undefined {
        synchronizeHostData();
        return FindAllReferences.findReferencedSymbols(program, cancellationToken, program.getSourceFiles(), getValidSourceFile(fileName), position);
    }

    function getFileReferences(fileName: string): ReferenceEntry[] {
        synchronizeHostData();
        return FindAllReferences.Core.getReferencesForFileName(fileName, program, program.getSourceFiles()).map(FindAllReferences.toReferenceEntry);
    }

    function getNavigateToItems(searchValue: string, maxResultCount?: number, fileName?: string, excludeDtsFiles = false, excludeLibFiles = false): NavigateToItem[] {
        synchronizeHostData();
        const sourceFiles = fileName ? [getValidSourceFile(fileName)] : program.getSourceFiles();
        return NavigateTo.getNavigateToItems(sourceFiles, program.getTypeChecker(), cancellationToken, searchValue, maxResultCount, excludeDtsFiles, excludeLibFiles);
    }

    function getEmitOutput(fileName: string, emitOnlyDtsFiles?: boolean, forceDtsEmit?: boolean) {
        synchronizeHostData();

        const sourceFile = getValidSourceFile(fileName);
        const customTransformers = host.getCustomTransformers && host.getCustomTransformers();
        return getFileEmitOutput(program, sourceFile, !!emitOnlyDtsFiles, cancellationToken, customTransformers, forceDtsEmit);
    }

    // Signature help
    /**
     * This is a semantic operation.
     */
    function getSignatureHelpItems(fileName: string, position: number, { triggerReason }: SignatureHelpItemsOptions = emptyOptions): SignatureHelpItems | undefined {
        synchronizeHostData();

        const sourceFile = getValidSourceFile(fileName);

        return SignatureHelp.getSignatureHelpItems(program, sourceFile, position, triggerReason, cancellationToken);
    }

    /// Syntactic features
    function getNonBoundSourceFile(fileName: string): SourceFile {
        return syntaxTreeCache.getCurrentSourceFile(fileName);
    }

    function getNameOrDottedNameSpan(fileName: string, startPos: number, _endPos: number): TextSpan | undefined {
        const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);

        // Get node at the location
        const node = getTouchingPropertyName(sourceFile, startPos);

        if (node === sourceFile) {
            return undefined;
        }

        switch (node.kind) {
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.QualifiedName:
            case SyntaxKind.StringLiteral:
            case SyntaxKind.FalseKeyword:
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.NullKeyword:
            case SyntaxKind.SuperKeyword:
            case SyntaxKind.ThisKeyword:
            case SyntaxKind.ThisType:
            case SyntaxKind.Identifier:
                break;

            // Cant create the text span
            default:
                return undefined;
        }

        let nodeForStartPos = node;
        while (true) {
            if (isRightSideOfPropertyAccess(nodeForStartPos) || isRightSideOfQualifiedName(nodeForStartPos)) {
                // If on the span is in right side of the the property or qualified name, return the span from the qualified name pos to end of this node
                nodeForStartPos = nodeForStartPos.parent;
            }
            else if (isNameOfModuleDeclaration(nodeForStartPos)) {
                // If this is name of a module declarations, check if this is right side of dotted module name
                // If parent of the module declaration which is parent of this node is module declaration and its body is the module declaration that this node is name of
                // Then this name is name from dotted module
                if (
                    nodeForStartPos.parent.parent.kind === SyntaxKind.ModuleDeclaration &&
                    (nodeForStartPos.parent.parent as ModuleDeclaration).body === nodeForStartPos.parent
                ) {
                    // Use parent module declarations name for start pos
                    nodeForStartPos = (nodeForStartPos.parent.parent as ModuleDeclaration).name;
                }
                else {
                    // We have to use this name for start pos
                    break;
                }
            }
            else {
                // Is not a member expression so we have found the node for start pos
                break;
            }
        }

        return createTextSpanFromBounds(nodeForStartPos.getStart(), node.getEnd());
    }

    function getBreakpointStatementAtPosition(fileName: string, position: number): TextSpan | undefined {
        // doesn't use compiler - no need to synchronize with host
        const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);

        return BreakpointResolver.spanInSourceFileAtLocation(sourceFile, position);
    }

    function getNavigationBarItems(fileName: string): NavigationBarItem[] {
        return NavigationBar.getNavigationBarItems(syntaxTreeCache.getCurrentSourceFile(fileName), cancellationToken);
    }

    function getNavigationTree(fileName: string): NavigationTree {
        return NavigationBar.getNavigationTree(syntaxTreeCache.getCurrentSourceFile(fileName), cancellationToken);
    }

    function getSemanticClassifications(fileName: string, span: TextSpan): ClassifiedSpan[];
    function getSemanticClassifications(fileName: string, span: TextSpan, format?: SemanticClassificationFormat): ClassifiedSpan[] | ClassifiedSpan2020[] {
        synchronizeHostData();

        const responseFormat = format || SemanticClassificationFormat.Original;
        if (responseFormat === SemanticClassificationFormat.TwentyTwenty) {
            return classifier2020.getSemanticClassifications(program, cancellationToken, getValidSourceFile(fileName), span);
        }
        else {
            return classifier.getSemanticClassifications(program.getTypeChecker(), cancellationToken, getValidSourceFile(fileName), program.getClassifiableNames(), span);
        }
    }

    function getEncodedSemanticClassifications(fileName: string, span: TextSpan, format?: SemanticClassificationFormat): Classifications {
        synchronizeHostData();

        const responseFormat = format || SemanticClassificationFormat.Original;
        if (responseFormat === SemanticClassificationFormat.Original) {
            return classifier.getEncodedSemanticClassifications(program.getTypeChecker(), cancellationToken, getValidSourceFile(fileName), program.getClassifiableNames(), span);
        }
        else {
            return classifier2020.getEncodedSemanticClassifications(program, cancellationToken, getValidSourceFile(fileName), span);
        }
    }

    function getSyntacticClassifications(fileName: string, span: TextSpan): ClassifiedSpan[] {
        // doesn't use compiler - no need to synchronize with host
        return classifier.getSyntacticClassifications(cancellationToken, syntaxTreeCache.getCurrentSourceFile(fileName), span);
    }

    function getEncodedSyntacticClassifications(fileName: string, span: TextSpan): Classifications {
        // doesn't use compiler - no need to synchronize with host
        return classifier.getEncodedSyntacticClassifications(cancellationToken, syntaxTreeCache.getCurrentSourceFile(fileName), span);
    }

    function getOutliningSpans(fileName: string): OutliningSpan[] {
        // doesn't use compiler - no need to synchronize with host
        const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
        return OutliningElementsCollector.collectElements(sourceFile, cancellationToken);
    }

    const braceMatching = new Map(Object.entries({
        [SyntaxKind.OpenBraceToken]: SyntaxKind.CloseBraceToken,
        [SyntaxKind.OpenParenToken]: SyntaxKind.CloseParenToken,
        [SyntaxKind.OpenBracketToken]: SyntaxKind.CloseBracketToken,
        [SyntaxKind.GreaterThanToken]: SyntaxKind.LessThanToken,
    }));
    braceMatching.forEach((value, key) => braceMatching.set(value.toString(), Number(key) as SyntaxKind));

    function getBraceMatchingAtPosition(fileName: string, position: number): TextSpan[] {
        const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
        const token = getTouchingToken(sourceFile, position);
        const matchKind = token.getStart(sourceFile) === position ? braceMatching.get(token.kind.toString()) : undefined;
        const match = matchKind && findChildOfKind(token.parent, matchKind, sourceFile);
        // We want to order the braces when we return the result.
        return match ? [createTextSpanFromNode(token, sourceFile), createTextSpanFromNode(match, sourceFile)].sort((a, b) => a.start - b.start) : emptyArray;
    }

    function getIndentationAtPosition(fileName: string, position: number, editorOptions: EditorOptions | EditorSettings) {
        let start = timestamp();
        const settings = toEditorSettings(editorOptions);
        const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
        log("getIndentationAtPosition: getCurrentSourceFile: " + (timestamp() - start));

        start = timestamp();

        const result = formatting.SmartIndenter.getIndentation(position, sourceFile, settings);
        log("getIndentationAtPosition: computeIndentation  : " + (timestamp() - start));

        return result;
    }

    function getFormattingEditsForRange(fileName: string, start: number, end: number, options: FormatCodeOptions | FormatCodeSettings): TextChange[] {
        const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
        return formatting.formatSelection(start, end, sourceFile, formatting.getFormatContext(toEditorSettings(options), host));
    }

    function getFormattingEditsForDocument(fileName: string, options: FormatCodeOptions | FormatCodeSettings): TextChange[] {
        return formatting.formatDocument(syntaxTreeCache.getCurrentSourceFile(fileName), formatting.getFormatContext(toEditorSettings(options), host));
    }

    function getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: FormatCodeOptions | FormatCodeSettings): TextChange[] {
        const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
        const formatContext = formatting.getFormatContext(toEditorSettings(options), host);

        if (!isInComment(sourceFile, position)) {
            switch (key) {
                case "{":
                    return formatting.formatOnOpeningCurly(position, sourceFile, formatContext);
                case "}":
                    return formatting.formatOnClosingCurly(position, sourceFile, formatContext);
                case ";":
                    return formatting.formatOnSemicolon(position, sourceFile, formatContext);
                case "\n":
                    return formatting.formatOnEnter(position, sourceFile, formatContext);
            }
        }

        return [];
    }

    function getCodeFixesAtPosition(fileName: string, start: number, end: number, errorCodes: readonly number[], formatOptions: FormatCodeSettings, preferences: UserPreferences = emptyOptions): readonly CodeFixAction[] {
        synchronizeHostData();
        const sourceFile = getValidSourceFile(fileName);
        const span = createTextSpanFromBounds(start, end);
        const formatContext = formatting.getFormatContext(formatOptions, host);

        return flatMap(deduplicate<number>(errorCodes, equateValues, compareValues), errorCode => {
            cancellationToken.throwIfCancellationRequested();
            return codefix.getFixes({ errorCode, sourceFile, span, program, host, cancellationToken, formatContext, preferences });
        });
    }

    function getCombinedCodeFix(scope: CombinedCodeFixScope, fixId: {}, formatOptions: FormatCodeSettings, preferences: UserPreferences = emptyOptions): CombinedCodeActions {
        synchronizeHostData();
        Debug.assert(scope.type === "file");
        const sourceFile = getValidSourceFile(scope.fileName);
        const formatContext = formatting.getFormatContext(formatOptions, host);

        return codefix.getAllFixes({ fixId, sourceFile, program, host, cancellationToken, formatContext, preferences });
    }

    function organizeImports(args: OrganizeImportsArgs, formatOptions: FormatCodeSettings, preferences: UserPreferences = emptyOptions): readonly FileTextChanges[] {
        synchronizeHostData();
        Debug.assert(args.type === "file");
        const sourceFile = getValidSourceFile(args.fileName);
        const formatContext = formatting.getFormatContext(formatOptions, host);

        const mode = args.mode ?? (args.skipDestructiveCodeActions ? OrganizeImportsMode.SortAndCombine : OrganizeImportsMode.All);
        return OrganizeImports.organizeImports(sourceFile, formatContext, host, program, preferences, mode);
    }

    function getEditsForFileRename(oldFilePath: string, newFilePath: string, formatOptions: FormatCodeSettings, preferences: UserPreferences = emptyOptions): readonly FileTextChanges[] {
        return ts_getEditsForFileRename(getProgram()!, oldFilePath, newFilePath, host, formatting.getFormatContext(formatOptions, host), preferences, sourceMapper);
    }

    function applyCodeActionCommand(action: CodeActionCommand, formatSettings?: FormatCodeSettings): Promise<ApplyCodeActionCommandResult>;
    function applyCodeActionCommand(action: CodeActionCommand[], formatSettings?: FormatCodeSettings): Promise<ApplyCodeActionCommandResult[]>;
    function applyCodeActionCommand(action: CodeActionCommand | CodeActionCommand[], formatSettings?: FormatCodeSettings): Promise<ApplyCodeActionCommandResult | ApplyCodeActionCommandResult[]>;
    function applyCodeActionCommand(fileName: Path, action: CodeActionCommand): Promise<ApplyCodeActionCommandResult>;
    function applyCodeActionCommand(fileName: Path, action: CodeActionCommand[]): Promise<ApplyCodeActionCommandResult[]>;
    function applyCodeActionCommand(fileName: Path | CodeActionCommand | CodeActionCommand[], actionOrFormatSettingsOrUndefined?: CodeActionCommand | CodeActionCommand[] | FormatCodeSettings): Promise<ApplyCodeActionCommandResult | ApplyCodeActionCommandResult[]> {
        const action = typeof fileName === "string" ? actionOrFormatSettingsOrUndefined as CodeActionCommand | CodeActionCommand[] : fileName as CodeActionCommand[];
        return isArray(action) ? Promise.all(action.map(a => applySingleCodeActionCommand(a))) : applySingleCodeActionCommand(action);
    }

    function applySingleCodeActionCommand(action: CodeActionCommand): Promise<ApplyCodeActionCommandResult> {
        const getPath = (path: string): Path => toPath(path, currentDirectory, getCanonicalFileName);
        Debug.assertEqual(action.type, "install package");
        return host.installPackage
            ? host.installPackage({ fileName: getPath(action.file), packageName: action.packageName })
            : Promise.reject("Host does not implement `installPackage`");
    }

    function getDocCommentTemplateAtPosition(fileName: string, position: number, options?: DocCommentTemplateOptions, formatOptions?: FormatCodeSettings): TextInsertion | undefined {
        const formatSettings = formatOptions ? formatting.getFormatContext(formatOptions, host).options : undefined;
        return JsDoc.getDocCommentTemplateAtPosition(getNewLineOrDefaultFromHost(host, formatSettings), syntaxTreeCache.getCurrentSourceFile(fileName), position, options);
    }

    function isValidBraceCompletionAtPosition(fileName: string, position: number, openingBrace: number): boolean {
        // '<' is currently not supported, figuring out if we're in a Generic Type vs. a comparison is too
        // expensive to do during typing scenarios
        // i.e. whether we're dealing with:
        //      var x = new foo<| ( with class foo<T>{} )
        // or
        //      var y = 3 <|
        if (openingBrace === CharacterCodes.lessThan) {
            return false;
        }

        const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);

        // Check if in a context where we don't want to perform any insertion
        if (isInString(sourceFile, position)) {
            return false;
        }

        if (isInsideJsxElementOrAttribute(sourceFile, position)) {
            return openingBrace === CharacterCodes.openBrace;
        }

        if (isInTemplateString(sourceFile, position)) {
            return false;
        }

        switch (openingBrace) {
            case CharacterCodes.singleQuote:
            case CharacterCodes.doubleQuote:
            case CharacterCodes.backtick:
                return !isInComment(sourceFile, position);
        }

        return true;
    }

    function getJsxClosingTagAtPosition(fileName: string, position: number): JsxClosingTagInfo | undefined {
        const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
        const token = findPrecedingToken(position, sourceFile);
        if (!token) return undefined;
        const element = token.kind === SyntaxKind.GreaterThanToken && isJsxOpeningElement(token.parent) ? token.parent.parent
            : isJsxText(token) && isJsxElement(token.parent) ? token.parent : undefined;
        if (element && isUnclosedTag(element)) {
            return { newText: `</${element.openingElement.tagName.getText(sourceFile)}>` };
        }
        const fragment = token.kind === SyntaxKind.GreaterThanToken && isJsxOpeningFragment(token.parent) ? token.parent.parent
            : isJsxText(token) && isJsxFragment(token.parent) ? token.parent : undefined;
        if (fragment && isUnclosedFragment(fragment)) {
            return { newText: "</>" };
        }
    }

    function getLinkedEditingRangeAtPosition(fileName: string, position: number): LinkedEditingInfo | undefined {
        const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
        const token = findPrecedingToken(position, sourceFile);
        if (!token || token.parent.kind === SyntaxKind.SourceFile) return undefined;

        // matches more than valid tag names to allow linked editing when typing is in progress or tag name is incomplete
        const jsxTagWordPattern = "[a-zA-Z0-9:\\-\\._$]*";

        if (isJsxFragment(token.parent.parent)) {
            const openFragment = token.parent.parent.openingFragment;
            const closeFragment = token.parent.parent.closingFragment;
            if (containsParseError(openFragment) || containsParseError(closeFragment)) return undefined;

            const openPos = openFragment.getStart(sourceFile) + 1; // "<".length
            const closePos = closeFragment.getStart(sourceFile) + 2; // "</".length

            // only allows linked editing right after opening bracket: <| ></| >
            if ((position !== openPos) && (position !== closePos)) return undefined;

            return {
                ranges: [{ start: openPos, length: 0 }, { start: closePos, length: 0 }],
                wordPattern: jsxTagWordPattern,
            };
        }
        else {
            // determines if the cursor is in an element tag
            const tag = findAncestor(token.parent, n => {
                if (isJsxOpeningElement(n) || isJsxClosingElement(n)) {
                    return true;
                }
                return false;
            });
            if (!tag) return undefined;
            Debug.assert(isJsxOpeningElement(tag) || isJsxClosingElement(tag), "tag should be opening or closing element");

            const openTag = tag.parent.openingElement;
            const closeTag = tag.parent.closingElement;

            const openTagStart = openTag.tagName.getStart(sourceFile);
            const openTagEnd = openTag.tagName.end;
            const closeTagStart = closeTag.tagName.getStart(sourceFile);
            const closeTagEnd = closeTag.tagName.end;

            // only return linked cursors if the cursor is within a tag name
            if (!(openTagStart <= position && position <= openTagEnd || closeTagStart <= position && position <= closeTagEnd)) return undefined;

            // only return linked cursors if text in both tags is identical
            const openingTagText = openTag.tagName.getText(sourceFile);
            if (openingTagText !== closeTag.tagName.getText(sourceFile)) return undefined;

            return {
                ranges: [{ start: openTagStart, length: openTagEnd - openTagStart }, { start: closeTagStart, length: closeTagEnd - closeTagStart }],
                wordPattern: jsxTagWordPattern,
            };
        }
    }

    function getLinesForRange(sourceFile: SourceFile, textRange: TextRange) {
        return {
            lineStarts: sourceFile.getLineStarts(),
            firstLine: sourceFile.getLineAndCharacterOfPosition(textRange.pos).line,
            lastLine: sourceFile.getLineAndCharacterOfPosition(textRange.end).line,
        };
    }

    function toggleLineComment(fileName: string, textRange: TextRange, insertComment?: boolean): TextChange[] {
        const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
        const textChanges: TextChange[] = [];
        const { lineStarts, firstLine, lastLine } = getLinesForRange(sourceFile, textRange);

        let isCommenting = insertComment || false;
        let leftMostPosition = Number.MAX_VALUE;
        const lineTextStarts = new Map<string, number>();
        const firstNonWhitespaceCharacterRegex = new RegExp(/\S/);
        const isJsx = isInsideJsxElement(sourceFile, lineStarts[firstLine]);
        const openComment = isJsx ? "{/*" : "//";

        // Check each line before any text changes.
        for (let i = firstLine; i <= lastLine; i++) {
            const lineText = sourceFile.text.substring(lineStarts[i], sourceFile.getLineEndOfPosition(lineStarts[i]));

            // Find the start of text and the left-most character. No-op on empty lines.
            const regExec = firstNonWhitespaceCharacterRegex.exec(lineText);
            if (regExec) {
                leftMostPosition = Math.min(leftMostPosition, regExec.index);
                lineTextStarts.set(i.toString(), regExec.index);

                if (lineText.substr(regExec.index, openComment.length) !== openComment) {
                    isCommenting = insertComment === undefined || insertComment;
                }
            }
        }

        // Push all text changes.
        for (let i = firstLine; i <= lastLine; i++) {
            // If the range is multiline and ends on a beginning of a line, don't comment/uncomment.
            if (firstLine !== lastLine && lineStarts[i] === textRange.end) {
                continue;
            }

            const lineTextStart = lineTextStarts.get(i.toString());

            // If the line is not an empty line; otherwise no-op.
            if (lineTextStart !== undefined) {
                if (isJsx) {
                    textChanges.push(...toggleMultilineComment(fileName, { pos: lineStarts[i] + leftMostPosition, end: sourceFile.getLineEndOfPosition(lineStarts[i]) }, isCommenting, isJsx));
                }
                else if (isCommenting) {
                    textChanges.push({
                        newText: openComment,
                        span: {
                            length: 0,
                            start: lineStarts[i] + leftMostPosition,
                        },
                    });
                }
                else if (sourceFile.text.substr(lineStarts[i] + lineTextStart, openComment.length) === openComment) {
                    textChanges.push({
                        newText: "",
                        span: {
                            length: openComment.length,
                            start: lineStarts[i] + lineTextStart,
                        },
                    });
                }
            }
        }

        return textChanges;
    }

    function toggleMultilineComment(fileName: string, textRange: TextRange, insertComment?: boolean, isInsideJsx?: boolean): TextChange[] {
        const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
        const textChanges: TextChange[] = [];
        const { text } = sourceFile;

        let hasComment = false;
        let isCommenting = insertComment || false;
        const positions = [] as number[] as SortedArray<number>;

        let { pos } = textRange;
        const isJsx = isInsideJsx !== undefined ? isInsideJsx : isInsideJsxElement(sourceFile, pos);

        const openMultiline = isJsx ? "{/*" : "/*";
        const closeMultiline = isJsx ? "*/}" : "*/";
        const openMultilineRegex = isJsx ? "\\{\\/\\*" : "\\/\\*";
        const closeMultilineRegex = isJsx ? "\\*\\/\\}" : "\\*\\/";

        // Get all comment positions
        while (pos <= textRange.end) {
            // Start of comment is considered inside comment.
            const offset = text.substr(pos, openMultiline.length) === openMultiline ? openMultiline.length : 0;
            const commentRange = isInComment(sourceFile, pos + offset);

            // If position is in a comment add it to the positions array.
            if (commentRange) {
                // Comment range doesn't include the brace character. Increase it to include them.
                if (isJsx) {
                    commentRange.pos--;
                    commentRange.end++;
                }

                positions.push(commentRange.pos);
                if (commentRange.kind === SyntaxKind.MultiLineCommentTrivia) {
                    positions.push(commentRange.end);
                }

                hasComment = true;
                pos = commentRange.end + 1;
            }
            else { // If it's not in a comment range, then we need to comment the uncommented portions.
                const newPos = text.substring(pos, textRange.end).search(`(${openMultilineRegex})|(${closeMultilineRegex})`);

                isCommenting = insertComment !== undefined
                    ? insertComment
                    : isCommenting || !isTextWhiteSpaceLike(text, pos, newPos === -1 ? textRange.end : pos + newPos); // If isCommenting is already true we don't need to check whitespace again.
                pos = newPos === -1 ? textRange.end + 1 : pos + newPos + closeMultiline.length;
            }
        }

        // If it didn't found a comment and isCommenting is false means is only empty space.
        // We want to insert comment in this scenario.
        if (isCommenting || !hasComment) {
            if (isInComment(sourceFile, textRange.pos)?.kind !== SyntaxKind.SingleLineCommentTrivia) {
                insertSorted(positions, textRange.pos, compareValues);
            }
            insertSorted(positions, textRange.end, compareValues);

            // Insert open comment if the first position is not a comment already.
            const firstPos = positions[0];
            if (text.substr(firstPos, openMultiline.length) !== openMultiline) {
                textChanges.push({
                    newText: openMultiline,
                    span: {
                        length: 0,
                        start: firstPos,
                    },
                });
            }

            // Insert open and close comment to all positions between first and last. Exclusive.
            for (let i = 1; i < positions.length - 1; i++) {
                if (text.substr(positions[i] - closeMultiline.length, closeMultiline.length) !== closeMultiline) {
                    textChanges.push({
                        newText: closeMultiline,
                        span: {
                            length: 0,
                            start: positions[i],
                        },
                    });
                }

                if (text.substr(positions[i], openMultiline.length) !== openMultiline) {
                    textChanges.push({
                        newText: openMultiline,
                        span: {
                            length: 0,
                            start: positions[i],
                        },
                    });
                }
            }

            // Insert open comment if the last position is not a comment already.
            if (textChanges.length % 2 !== 0) {
                textChanges.push({
                    newText: closeMultiline,
                    span: {
                        length: 0,
                        start: positions[positions.length - 1],
                    },
                });
            }
        }
        else {
            // If is not commenting then remove all comments found.
            for (const pos of positions) {
                const from = pos - closeMultiline.length > 0 ? pos - closeMultiline.length : 0;
                const offset = text.substr(from, closeMultiline.length) === closeMultiline ? closeMultiline.length : 0;
                textChanges.push({
                    newText: "",
                    span: {
                        length: openMultiline.length,
                        start: pos - offset,
                    },
                });
            }
        }

        return textChanges;
    }

    function commentSelection(fileName: string, textRange: TextRange): TextChange[] {
        const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
        const { firstLine, lastLine } = getLinesForRange(sourceFile, textRange);

        // If there is a selection that is on the same line, add multiline.
        return firstLine === lastLine && textRange.pos !== textRange.end
            ? toggleMultilineComment(fileName, textRange, /*insertComment*/ true)
            : toggleLineComment(fileName, textRange, /*insertComment*/ true);
    }

    function uncommentSelection(fileName: string, textRange: TextRange): TextChange[] {
        const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
        const textChanges: TextChange[] = [];
        const { pos } = textRange;
        let { end } = textRange;

        // If cursor is not a selection we need to increase the end position
        // to include the start of the comment.
        if (pos === end) {
            end += isInsideJsxElement(sourceFile, pos) ? 2 : 1;
        }

        for (let i = pos; i <= end; i++) {
            const commentRange = isInComment(sourceFile, i);
            if (commentRange) {
                switch (commentRange.kind) {
                    case SyntaxKind.SingleLineCommentTrivia:
                        textChanges.push(...toggleLineComment(fileName, { end: commentRange.end, pos: commentRange.pos + 1 }, /*insertComment*/ false));
                        break;
                    case SyntaxKind.MultiLineCommentTrivia:
                        textChanges.push(...toggleMultilineComment(fileName, { end: commentRange.end, pos: commentRange.pos + 1 }, /*insertComment*/ false));
                }

                i = commentRange.end + 1;
            }
        }

        return textChanges;
    }

    function isUnclosedTag({ openingElement, closingElement, parent }: JsxElement): boolean {
        return !tagNamesAreEquivalent(openingElement.tagName, closingElement.tagName) ||
            isJsxElement(parent) && tagNamesAreEquivalent(openingElement.tagName, parent.openingElement.tagName) && isUnclosedTag(parent);
    }

    function isUnclosedFragment({ closingFragment, parent }: JsxFragment): boolean {
        return !!(closingFragment.flags & NodeFlags.ThisNodeHasError) || (isJsxFragment(parent) && isUnclosedFragment(parent));
    }

    function getSpanOfEnclosingComment(fileName: string, position: number, onlyMultiLine: boolean): TextSpan | undefined {
        const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
        const range = formatting.getRangeOfEnclosingComment(sourceFile, position);
        return range && (!onlyMultiLine || range.kind === SyntaxKind.MultiLineCommentTrivia) ? createTextSpanFromRange(range) : undefined;
    }

    function getTodoComments(fileName: string, descriptors: TodoCommentDescriptor[]): TodoComment[] {
        // Note: while getting todo comments seems like a syntactic operation, we actually
        // treat it as a semantic operation here.  This is because we expect our host to call
        // this on every single file.  If we treat this syntactically, then that will cause
        // us to populate and throw away the tree in our syntax tree cache for each file.  By
        // treating this as a semantic operation, we can access any tree without throwing
        // anything away.
        synchronizeHostData();

        const sourceFile = getValidSourceFile(fileName);

        cancellationToken.throwIfCancellationRequested();

        const fileContents = sourceFile.text;
        const result: TodoComment[] = [];

        // Exclude node_modules files as we don't want to show the todos of external libraries.
        if (descriptors.length > 0 && !isNodeModulesFile(sourceFile.fileName)) {
            const regExp = getTodoCommentsRegExp();

            let matchArray: RegExpExecArray | null;
            while (matchArray = regExp.exec(fileContents)) {
                cancellationToken.throwIfCancellationRequested();

                // If we got a match, here is what the match array will look like.  Say the source text is:
                //
                //      "    // hack   1"
                //
                // The result array with the regexp:    will be:
                //
                //      ["// hack   1", "// ", "hack   1", undefined, "hack"]
                //
                // Here are the relevant capture groups:
                //  0) The full match for the entire regexp.
                //  1) The preamble to the message portion.
                //  2) The message portion.
                //  3...N) The descriptor that was matched - by index.  'undefined' for each
                //         descriptor that didn't match.  an actual value if it did match.
                //
                //  i.e. 'undefined' in position 3 above means TODO(jason) didn't match.
                //       "hack"      in position 4 means HACK did match.
                const firstDescriptorCaptureIndex = 3;
                Debug.assert(matchArray.length === descriptors.length + firstDescriptorCaptureIndex);

                const preamble = matchArray[1];
                const matchPosition = matchArray.index + preamble.length;

                // OK, we have found a match in the file.  This is only an acceptable match if
                // it is contained within a comment.
                if (!isInComment(sourceFile, matchPosition)) {
                    continue;
                }

                let descriptor: TodoCommentDescriptor | undefined;
                for (let i = 0; i < descriptors.length; i++) {
                    if (matchArray[i + firstDescriptorCaptureIndex]) {
                        descriptor = descriptors[i];
                    }
                }
                if (descriptor === undefined) return Debug.fail();

                // We don't want to match something like 'TODOBY', so we make sure a non
                // letter/digit follows the match.
                if (isLetterOrDigit(fileContents.charCodeAt(matchPosition + descriptor.text.length))) {
                    continue;
                }

                const message = matchArray[2];
                result.push({ descriptor, message, position: matchPosition });
            }
        }

        return result;

        function escapeRegExp(str: string): string {
            return str.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
        }

        function getTodoCommentsRegExp(): RegExp {
            // NOTE: `?:` means 'non-capture group'.  It allows us to have groups without having to
            // filter them out later in the final result array.

            // TODO comments can appear in one of the following forms:
            //
            //  1)      // TODO     or  /////////// TODO
            //
            //  2)      /* TODO     or  /********** TODO
            //
            //  3)      /*
            //           *   TODO
            //           */
            //
            // The following three regexps are used to match the start of the text up to the TODO
            // comment portion.
            const singleLineCommentStart = /(?:\/\/+\s*)/.source;
            const multiLineCommentStart = /(?:\/\*+\s*)/.source;
            const anyNumberOfSpacesAndAsterisksAtStartOfLine = /(?:^(?:\s|\*)*)/.source;

            // Match any of the above three TODO comment start regexps.
            // Note that the outermost group *is* a capture group.  We want to capture the preamble
            // so that we can determine the starting position of the TODO comment match.
            const preamble = "(" + anyNumberOfSpacesAndAsterisksAtStartOfLine + "|" + singleLineCommentStart + "|" + multiLineCommentStart + ")";

            // Takes the descriptors and forms a regexp that matches them as if they were literals.
            // For example, if the descriptors are "TODO(jason)" and "HACK", then this will be:
            //
            //      (?:(TODO\(jason\))|(HACK))
            //
            // Note that the outermost group is *not* a capture group, but the innermost groups
            // *are* capture groups.  By capturing the inner literals we can determine after
            // matching which descriptor we are dealing with.
            const literals = "(?:" + map(descriptors, d => "(" + escapeRegExp(d.text) + ")").join("|") + ")";

            // After matching a descriptor literal, the following regexp matches the rest of the
            // text up to the end of the line (or */).
            const endOfLineOrEndOfComment = /(?:$|\*\/)/.source;
            const messageRemainder = /(?:.*?)/.source;

            // This is the portion of the match we'll return as part of the TODO comment result. We
            // match the literal portion up to the end of the line or end of comment.
            const messagePortion = "(" + literals + messageRemainder + ")";
            const regExpString = preamble + messagePortion + endOfLineOrEndOfComment;

            // The final regexp will look like this:
            // /((?:\/\/+\s*)|(?:\/\*+\s*)|(?:^(?:\s|\*)*))((?:(TODO\(jason\))|(HACK))(?:.*?))(?:$|\*\/)/gim

            // The flags of the regexp are important here.
            //  'g' is so that we are doing a global search and can find matches several times
            //  in the input.
            //
            //  'i' is for case insensitivity (We do this to match C# TODO comment code).
            //
            //  'm' is so we can find matches in a multi-line input.
            return new RegExp(regExpString, "gim");
        }

        function isLetterOrDigit(char: number): boolean {
            return (char >= CharacterCodes.a && char <= CharacterCodes.z) ||
                (char >= CharacterCodes.A && char <= CharacterCodes.Z) ||
                (char >= CharacterCodes._0 && char <= CharacterCodes._9);
        }

        function isNodeModulesFile(path: string): boolean {
            return path.includes("/node_modules/");
        }
    }

    function getRenameInfo(fileName: string, position: number, preferences: UserPreferences | RenameInfoOptions | undefined): RenameInfo {
        synchronizeHostData();
        return Rename.getRenameInfo(program, getValidSourceFile(fileName), position, preferences || {});
    }

    function getRefactorContext(file: SourceFile, positionOrRange: number | TextRange, preferences: UserPreferences, formatOptions?: FormatCodeSettings, triggerReason?: RefactorTriggerReason, kind?: string): RefactorContext {
        const [startPosition, endPosition] = typeof positionOrRange === "number" ? [positionOrRange, undefined] : [positionOrRange.pos, positionOrRange.end];
        return {
            file,
            startPosition,
            endPosition,
            program: getProgram()!,
            host,
            formatContext: formatting.getFormatContext(formatOptions!, host), // TODO: GH#18217
            cancellationToken,
            preferences,
            triggerReason,
            kind,
        };
    }

    function getInlayHintsContext(file: SourceFile, span: TextSpan, preferences: UserPreferences): InlayHintsContext {
        return {
            file,
            program: getProgram()!,
            host,
            span,
            preferences,
            cancellationToken,
        };
    }

    function getSmartSelectionRange(fileName: string, position: number): SelectionRange {
        return SmartSelectionRange.getSmartSelectionRange(position, syntaxTreeCache.getCurrentSourceFile(fileName));
    }

    function getApplicableRefactors(fileName: string, positionOrRange: number | TextRange, preferences: UserPreferences = emptyOptions, triggerReason: RefactorTriggerReason, kind: string, includeInteractiveActions?: boolean): ApplicableRefactorInfo[] {
        synchronizeHostData();
        const file = getValidSourceFile(fileName);
        return refactor.getApplicableRefactors(getRefactorContext(file, positionOrRange, preferences, emptyOptions, triggerReason, kind), includeInteractiveActions);
    }

    function getMoveToRefactoringFileSuggestions(fileName: string, positionOrRange: number | TextRange, preferences: UserPreferences = emptyOptions): { newFileName: string; files: string[]; } {
        synchronizeHostData();
        const sourceFile = getValidSourceFile(fileName);
        const allFiles = Debug.checkDefined(program.getSourceFiles());
        const extension = extensionFromPath(fileName);
        const files = mapDefined(allFiles, file =>
            !program?.isSourceFileFromExternalLibrary(sourceFile) &&
                !(sourceFile === getValidSourceFile(file.fileName) || extension === Extension.Ts && extensionFromPath(file.fileName) === Extension.Dts || extension === Extension.Dts && startsWith(getBaseFileName(file.fileName), "lib.") && extensionFromPath(file.fileName) === Extension.Dts)
                && extension === extensionFromPath(file.fileName) ? file.fileName : undefined);

        const newFileName = createNewFileName(sourceFile, program, getRefactorContext(sourceFile, positionOrRange, preferences, emptyOptions), host);
        return { newFileName, files };
    }

    function getEditsForRefactor(
        fileName: string,
        formatOptions: FormatCodeSettings,
        positionOrRange: number | TextRange,
        refactorName: string,
        actionName: string,
        preferences: UserPreferences = emptyOptions,
        interactiveRefactorArguments?: InteractiveRefactorArguments,
    ): RefactorEditInfo | undefined {
        synchronizeHostData();
        const file = getValidSourceFile(fileName);
        return refactor.getEditsForRefactor(getRefactorContext(file, positionOrRange, preferences, formatOptions), refactorName, actionName, interactiveRefactorArguments);
    }

    function toLineColumnOffset(fileName: string, position: number): LineAndCharacter {
        // Go to Definition supports returning a zero-length span at position 0 for
        // non-existent files. We need to special-case the conversion of position 0
        // to avoid a crash trying to get the text for that file, since this function
        // otherwise assumes that 'fileName' is the name of a file that exists.
        if (position === 0) {
            return { line: 0, character: 0 };
        }
        return sourceMapper.toLineColumnOffset(fileName, position);
    }

    function prepareCallHierarchy(fileName: string, position: number): CallHierarchyItem | CallHierarchyItem[] | undefined {
        synchronizeHostData();
        const declarations = CallHierarchy.resolveCallHierarchyDeclaration(program, getTouchingPropertyName(getValidSourceFile(fileName), position));
        return declarations && mapOneOrMany(declarations, declaration => CallHierarchy.createCallHierarchyItem(program, declaration));
    }

    function provideCallHierarchyIncomingCalls(fileName: string, position: number): CallHierarchyIncomingCall[] {
        synchronizeHostData();
        const sourceFile = getValidSourceFile(fileName);
        const declaration = firstOrOnly(CallHierarchy.resolveCallHierarchyDeclaration(program, position === 0 ? sourceFile : getTouchingPropertyName(sourceFile, position)));
        return declaration ? CallHierarchy.getIncomingCalls(program, declaration, cancellationToken) : [];
    }

    function provideCallHierarchyOutgoingCalls(fileName: string, position: number): CallHierarchyOutgoingCall[] {
        synchronizeHostData();
        const sourceFile = getValidSourceFile(fileName);
        const declaration = firstOrOnly(CallHierarchy.resolveCallHierarchyDeclaration(program, position === 0 ? sourceFile : getTouchingPropertyName(sourceFile, position)));
        return declaration ? CallHierarchy.getOutgoingCalls(program, declaration) : [];
    }

    function provideInlayHints(fileName: string, span: TextSpan, preferences: UserPreferences = emptyOptions): InlayHint[] {
        synchronizeHostData();
        const sourceFile = getValidSourceFile(fileName);
        return InlayHints.provideInlayHints(getInlayHintsContext(sourceFile, span, preferences));
    }

    const ls: LanguageService = {
        dispose,
        cleanupSemanticCache,
        getSyntacticDiagnostics,
        getSemanticDiagnostics,
        getSuggestionDiagnostics,
        getCompilerOptionsDiagnostics,
        getSyntacticClassifications,
        getSemanticClassifications,
        getEncodedSyntacticClassifications,
        getEncodedSemanticClassifications,
        getCompletionsAtPosition,
        getCompletionEntryDetails,
        getCompletionEntrySymbol,
        getSignatureHelpItems,
        getQuickInfoAtPosition,
        getDefinitionAtPosition,
        getDefinitionAndBoundSpan,
        getImplementationAtPosition,
        getTypeDefinitionAtPosition,
        getReferencesAtPosition,
        findReferences,
        getFileReferences,
        getDocumentHighlights,
        getNameOrDottedNameSpan,
        getBreakpointStatementAtPosition,
        getNavigateToItems,
        getRenameInfo,
        getSmartSelectionRange,
        findRenameLocations,
        getNavigationBarItems,
        getNavigationTree,
        getOutliningSpans,
        getTodoComments,
        getBraceMatchingAtPosition,
        getIndentationAtPosition,
        getFormattingEditsForRange,
        getFormattingEditsForDocument,
        getFormattingEditsAfterKeystroke,
        getDocCommentTemplateAtPosition,
        isValidBraceCompletionAtPosition,
        getJsxClosingTagAtPosition,
        getLinkedEditingRangeAtPosition,
        getSpanOfEnclosingComment,
        getCodeFixesAtPosition,
        getCombinedCodeFix,
        applyCodeActionCommand,
        organizeImports,
        getEditsForFileRename,
        getEmitOutput,
        getNonBoundSourceFile,
        getProgram,
        getCurrentProgram: () => program,
        getAutoImportProvider,
        updateIsDefinitionOfReferencedSymbols,
        getApplicableRefactors,
        getEditsForRefactor,
        getMoveToRefactoringFileSuggestions,
        toLineColumnOffset,
        getSourceMapper: () => sourceMapper,
        clearSourceMapperCache: () => sourceMapper.clearCache(),
        prepareCallHierarchy,
        provideCallHierarchyIncomingCalls,
        provideCallHierarchyOutgoingCalls,
        toggleLineComment,
        toggleMultilineComment,
        commentSelection,
        uncommentSelection,
        provideInlayHints,
        getSupportedCodeFixes,
    };

    switch (languageServiceMode) {
        case LanguageServiceMode.Semantic:
            break;
        case LanguageServiceMode.PartialSemantic:
            invalidOperationsInPartialSemanticMode.forEach(key =>
                ls[key] = () => {
                    throw new Error(`LanguageService Operation: ${key} not allowed in LanguageServiceMode.PartialSemantic`);
                }
            );
            break;
        case LanguageServiceMode.Syntactic:
            invalidOperationsInSyntacticMode.forEach(key =>
                ls[key] = () => {
                    throw new Error(`LanguageService Operation: ${key} not allowed in LanguageServiceMode.Syntactic`);
                }
            );
            break;
        default:
            Debug.assertNever(languageServiceMode);
    }
    return ls;
}

/**
 * Names in the name table are escaped, so an identifier `__foo` will have a name table entry `___foo`.
 *
 * @internal
 */
export function getNameTable(sourceFile: SourceFile): Map<__String, number> {
    if (!sourceFile.nameTable) {
        initializeNameTable(sourceFile);
    }

    return sourceFile.nameTable!; // TODO: GH#18217
}

function initializeNameTable(sourceFile: SourceFile): void {
    const nameTable = sourceFile.nameTable = new Map();
    sourceFile.forEachChild(function walk(node) {
        if (isIdentifier(node) && !isTagName(node) && node.escapedText || isStringOrNumericLiteralLike(node) && literalIsName(node)) {
            const text = getEscapedTextOfIdentifierOrLiteral(node);
            nameTable.set(text, nameTable.get(text) === undefined ? node.pos : -1);
        }
        else if (isPrivateIdentifier(node)) {
            const text = node.escapedText;
            nameTable.set(text, nameTable.get(text) === undefined ? node.pos : -1);
        }

        forEachChild(node, walk);
        if (hasJSDocNodes(node)) {
            for (const jsDoc of node.jsDoc!) {
                forEachChild(jsDoc, walk);
            }
        }
    });
}

/**
 * We want to store any numbers/strings if they were a name that could be
 * related to a declaration.  So, if we have 'import x = require("something")'
 * then we want 'something' to be in the name table.  Similarly, if we have
 * "a['propname']" then we want to store "propname" in the name table.
 */
function literalIsName(node: StringLiteralLike | NumericLiteral): boolean {
    return isDeclarationName(node) ||
        node.parent.kind === SyntaxKind.ExternalModuleReference ||
        isArgumentOfElementAccessExpression(node) ||
        isLiteralComputedPropertyDeclarationName(node);
}

/**
 * Returns the containing object literal property declaration given a possible name node, e.g. "a" in x = { "a": 1 }
 *
 * @internal
 */
export function getContainingObjectLiteralElement(node: Node): ObjectLiteralElementWithName | undefined {
    const element = getContainingObjectLiteralElementWorker(node);
    return element && (isObjectLiteralExpression(element.parent) || isJsxAttributes(element.parent)) ? element as ObjectLiteralElementWithName : undefined;
}
function getContainingObjectLiteralElementWorker(node: Node): ObjectLiteralElement | undefined {
    switch (node.kind) {
        case SyntaxKind.StringLiteral:
        case SyntaxKind.NoSubstitutionTemplateLiteral:
        case SyntaxKind.NumericLiteral:
            if (node.parent.kind === SyntaxKind.ComputedPropertyName) {
                return isObjectLiteralElement(node.parent.parent) ? node.parent.parent : undefined;
            }
        // falls through

        case SyntaxKind.Identifier:
            return isObjectLiteralElement(node.parent) &&
                    (node.parent.parent.kind === SyntaxKind.ObjectLiteralExpression || node.parent.parent.kind === SyntaxKind.JsxAttributes) &&
                    node.parent.name === node ? node.parent : undefined;
    }
    return undefined;
}

/** @internal */
export type ObjectLiteralElementWithName = ObjectLiteralElement & { name: PropertyName; parent: ObjectLiteralExpression | JsxAttributes; };

function getSymbolAtLocationForQuickInfo(node: Node, checker: TypeChecker): Symbol | undefined {
    const object = getContainingObjectLiteralElement(node);
    if (object) {
        const contextualType = checker.getContextualType(object.parent);
        const properties = contextualType && getPropertySymbolsFromContextualType(object, checker, contextualType, /*unionSymbolOk*/ false);
        if (properties && properties.length === 1) {
            return first(properties);
        }
    }
    return checker.getSymbolAtLocation(node);
}

/**
 * Gets all symbols for one property. Does not get symbols for every property.
 *
 * @internal
 */
export function getPropertySymbolsFromContextualType(node: ObjectLiteralElementWithName, checker: TypeChecker, contextualType: Type, unionSymbolOk: boolean): readonly Symbol[] {
    const name = getNameFromPropertyName(node.name);
    if (!name) return emptyArray;
    if (!contextualType.isUnion()) {
        const symbol = contextualType.getProperty(name);
        return symbol ? [symbol] : emptyArray;
    }

    const discriminatedPropertySymbols = mapDefined(contextualType.types, t => (isObjectLiteralExpression(node.parent) || isJsxAttributes(node.parent)) && checker.isTypeInvalidDueToUnionDiscriminant(t, node.parent) ? undefined : t.getProperty(name));
    if (unionSymbolOk && (discriminatedPropertySymbols.length === 0 || discriminatedPropertySymbols.length === contextualType.types.length)) {
        const symbol = contextualType.getProperty(name);
        if (symbol) return [symbol];
    }
    if (discriminatedPropertySymbols.length === 0) {
        // Bad discriminant -- do again without discriminating
        return mapDefined(contextualType.types, t => t.getProperty(name));
    }
    // by eliminating duplicates we might even end up with a single symbol
    // that helps with displaying better quick infos on properties of union types
    return deduplicate(discriminatedPropertySymbols, equateValues);
}

function isArgumentOfElementAccessExpression(node: Node) {
    return node &&
        node.parent &&
        node.parent.kind === SyntaxKind.ElementAccessExpression &&
        (node.parent as ElementAccessExpression).argumentExpression === node;
}

/**
 * Get the path of the default library files (lib.d.ts) as distributed with the typescript
 * node package.
 * The functionality is not supported if the ts module is consumed outside of a node module.
 */
export function getDefaultLibFilePath(options: CompilerOptions): string {
    if (sys) {
        return combinePaths(getDirectoryPath(normalizePath(sys.getExecutingFilePath())), getDefaultLibFileName(options));
    }

    throw new Error("getDefaultLibFilePath is only supported when consumed as a node module. ");
}

setObjectAllocator(getServicesObjectAllocator());
