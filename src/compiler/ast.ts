/* eslint-disable local/jsdoc-format -- need @internal to work around issue with dtsBundler */
import {
    __String,
    AbstractKeyword,
    AccessorDeclaration,
    AccessorKeyword,
    AmdDependency,
    AmpersandAmpersandEqualsToken,
    ArrayBindingElement,
    ArrayBindingPattern,
    ArrayLiteralExpression,
    ArrayTypeNode,
    ArrowFunction,
    AsExpression,
    AssertClause,
    AssertionKey,
    AssertKeyword,
    AssertsKeyword,
    AsteriskToken,
    astHasJSDocNodes,
    AsyncKeyword,
    AwaitExpression,
    AwaitKeyword,
    BarBarEqualsToken,
    BigIntLiteral,
    BinaryExpression,
    BinaryOperatorToken,
    BindingElement,
    BindingName,
    BindingPattern,
    Block,
    BooleanLiteral,
    BreakOrContinueStatement,
    BreakStatement,
    Bundle,
    CallChain,
    CallChainRoot,
    CallExpression,
    CallSignatureDeclaration,
    CaseBlock,
    CaseClause,
    CaseKeyword,
    CaseOrDefaultClause,
    CatchClause,
    CheckJsDirective,
    ClassDeclaration,
    ClassElement,
    ClassExpression,
    ClassLikeDeclaration,
    ClassStaticBlockDeclaration,
    ColonToken,
    CommaListExpression,
    CommentDirective,
    ComputedPropertyName,
    ConciseBody,
    ConditionalExpression,
    ConditionalTypeNode,
    ConfigFileSpecs,
    ConstKeyword,
    ConstructorDeclaration,
    ConstructorTypeNode,
    ConstructSignatureDeclaration,
    containsObjectRestOrSpread,
    ContinueStatement,
    Debug,
    DebuggerStatement,
    Declaration,
    DeclarationName,
    DeclarationWithTypeParameterChildren,
    DeclareKeyword,
    Decorator,
    DefaultClause,
    DefaultKeyword,
    DeleteExpression,
    DestructuringAssignment,
    DiagnosticWithLocation,
    DoStatement,
    DotDotDotToken,
    DotToken,
    ElementAccessChain,
    ElementAccessChainRoot,
    ElementAccessExpression,
    EmitFlags,
    EmitNode,
    EmptyStatement,
    EndOfFileToken,
    EntityName,
    EntityNameExpression,
    EnumDeclaration,
    EnumMember,
    EqualsGreaterThanToken,
    EqualsToken,
    ExclamationToken,
    ExportAssignment,
    ExportDeclaration,
    ExportKeyword,
    ExportSpecifier,
    Expression,
    ExpressionStatement,
    ExpressionWithTypeArguments,
    ExternalModuleReference,
    FalseLiteral,
    FileReference,
    FlowNode,
    ForEachChildNodes,
    ForInitializer,
    ForInOrOfStatement,
    ForInStatement,
    ForOfStatement,
    ForStatement,
    FunctionBody,
    FunctionDeclaration,
    FunctionExpression,
    FunctionOrConstructorTypeNode,
    FunctionTypeNode,
    GetAccessorDeclaration,
    getJSDocTypeTag,
    getTransformFlagsSubtreeExclusions,
    HasChildren,
    HasDecorators,
    HasJSDoc,
    HasLocals,
    HasModifiers,
    HasName,
    hasProperty,
    HeritageClause,
    Identifier,
    IfStatement,
    ImportAttribute,
    ImportAttributeName,
    ImportAttributes,
    ImportClause,
    ImportDeclaration,
    ImportEqualsDeclaration,
    ImportExpression,
    ImportSpecifier,
    ImportTypeAssertionContainer,
    ImportTypeNode,
    IndexedAccessTypeNode,
    IndexSignatureDeclaration,
    InferTypeNode,
    InKeyword,
    InterfaceDeclaration,
    IntersectionTypeNode,
    isAstParenthesizedExpression,
    IScriptSnapshot,
    isLogicalOrCoalescingAssignmentOperator,
    isParseTreeNode,
    IterationStatement,
    JSDoc,
    JSDocAllType,
    JSDocArray,
    JSDocAugmentsTag,
    JSDocAuthorTag,
    JSDocCallbackTag,
    JSDocClassReference,
    JSDocClassTag,
    JSDocComment,
    JSDocDeprecatedTag,
    JSDocEnumTag,
    JSDocFunctionType,
    JSDocImplementsTag,
    JSDocImportTag,
    JSDocLink,
    JSDocLinkCode,
    JSDocLinkPlain,
    JSDocMemberName,
    JSDocNamepathType,
    JSDocNameReference,
    JSDocNamespaceBody,
    JSDocNamespaceDeclaration,
    JSDocNonNullableType,
    JSDocNullableType,
    JSDocOptionalType,
    JSDocOverloadTag,
    JSDocOverrideTag,
    JSDocParameterTag,
    JSDocParsingMode,
    JSDocPrivateTag,
    JSDocPropertyLikeTag,
    JSDocPropertyTag,
    JSDocProtectedTag,
    JSDocPublicTag,
    JSDocReadonlyTag,
    JSDocReturnTag,
    JSDocSatisfiesTag,
    JSDocSeeTag,
    JSDocSignature,
    JSDocTag,
    JSDocTemplateTag,
    JSDocText,
    JSDocThisTag,
    JSDocThrowsTag,
    JSDocType,
    JSDocTypeAssertion,
    JSDocTypedefTag,
    JSDocTypeExpression,
    JSDocTypeLiteral,
    JSDocTypeTag,
    JSDocUnknownTag,
    JSDocUnknownType,
    JSDocVariadicType,
    JsonMinusNumericLiteral,
    JsonObjectExpression,
    JsonObjectExpressionStatement,
    JsonSourceFile,
    JsxAttribute,
    JsxAttributeLike,
    JsxAttributeName,
    JsxAttributes,
    JsxAttributeValue,
    JsxChild,
    JsxClosingElement,
    JsxClosingFragment,
    JsxElement,
    JsxExpression,
    JsxFragment,
    JsxNamespacedName,
    JsxOpeningElement,
    JsxOpeningFragment,
    JsxOpeningLikeElement,
    JsxSelfClosingElement,
    JsxSpreadAttribute,
    JsxTagNameExpression,
    JsxTagNamePropertyAccess,
    JsxText,
    KeywordExpression,
    KeywordSyntaxKind,
    KeywordToken,
    KeywordTypeNode,
    KeywordTypeSyntaxKind,
    LabeledStatement,
    LanguageVariant,
    LeftHandSideExpression,
    LiteralExpression,
    LiteralLikeNode,
    LiteralToken,
    LiteralTypeNode,
    MappedTypeNode,
    MatchingKeys,
    MemberExpression,
    MemberName,
    MetaProperty,
    MethodDeclaration,
    MethodSignature,
    MinusToken,
    MissingDeclaration,
    Modifier,
    ModifierFlags,
    ModifierLike,
    ModifierSyntaxKind,
    modifierToFlag,
    ModifierToken,
    ModuleBlock,
    ModuleBody,
    ModuleDeclaration,
    ModuleExportName,
    ModuleName,
    ModuleReference,
    NamedDeclaration,
    NamedExportBindings,
    NamedExports,
    NamedImportBindings,
    NamedImports,
    NamedTupleMember,
    NamespaceBody,
    NamespaceDeclaration,
    NamespaceExport,
    NamespaceExportDeclaration,
    NamespaceImport,
    NewExpression,
    Node,
    NodeArray,
    NodeConstructor,
    NodeFlags,
    NodeId,
    NonNullChain,
    NonNullExpression,
    NoSubstitutionTemplateLiteral,
    NotEmittedStatement,
    NotEmittedTypeElement,
    NullLiteral,
    NumericLiteral,
    ObjectBindingPattern,
    ObjectLiteralElement,
    ObjectLiteralElementLike,
    ObjectLiteralExpression,
    ObjectTypeDeclaration,
    OmittedExpression,
    OptionalChainRoot,
    OptionalTypeNode,
    OuterExpression,
    OuterExpressionKinds,
    OutKeyword,
    OverrideKeyword,
    PackageJsonInfo,
    ParameterDeclaration,
    ParenthesizedExpression,
    ParenthesizedTypeNode,
    PartiallyEmittedExpression,
    Path,
    PatternAmbientModule,
    PlusToken,
    PostfixUnaryExpression,
    PostfixUnaryOperator,
    PrefixUnaryExpression,
    PrefixUnaryOperator,
    PrimaryExpression,
    PrivateIdentifier,
    PrivateKeyword,
    PropertyAccessChain,
    PropertyAccessChainRoot,
    PropertyAccessEntityNameExpression,
    PropertyAccessExpression,
    PropertyAssignment,
    PropertyDeclaration,
    PropertyName,
    PropertyNameLiteral,
    PropertySignature,
    ProtectedKeyword,
    PseudoLiteralToken,
    PublicKeyword,
    PunctuationSyntaxKind,
    PunctuationToken,
    QualifiedName,
    QuestionDotToken,
    QuestionQuestionEqualsToken,
    QuestionToken,
    ReadonlyKeyword,
    ReadonlyPragmaMap,
    RedirectInfo,
    RegularExpressionLiteral,
    ResolutionMode,
    RestTypeNode,
    ReturnStatement,
    SatisfiesExpression,
    ScriptKind,
    ScriptTarget,
    SemicolonClassElement,
    SetAccessorDeclaration,
    ShorthandPropertyAssignment,
    SignatureDeclaration,
    SourceFile,
    SpreadAssignment,
    SpreadElement,
    Statement,
    StaticKeyword,
    StringLiteral,
    StringLiteralLike,
    StringLiteralLikeNode,
    SuperExpression,
    SwitchStatement,
    Symbol,
    SymbolTable,
    SyntaxKind,
    SyntaxList,
    SyntheticExpression,
    SyntheticReferenceExpression,
    TaggedTemplateExpression,
    TemplateExpression,
    TemplateHead,
    TemplateLiteral,
    TemplateLiteralLikeNode,
    TemplateLiteralToken,
    TemplateLiteralTypeNode,
    TemplateLiteralTypeSpan,
    TemplateMiddle,
    TemplateSpan,
    TemplateTail,
    ThisExpression,
    ThisTypeNode,
    ThrowStatement,
    Token,
    TokenFlags,
    TokenSyntaxKind,
    TransformFlags,
    TrueLiteral,
    TryStatement,
    TupleTypeNode,
    Type,
    TypeAliasDeclaration,
    TypeAssertionExpression,
    TypeElement,
    TypeLiteralNode,
    TypeNode,
    TypeNodeSyntaxKind,
    TypeOfExpression,
    TypeOperatorNode,
    TypeParameterDeclaration,
    TypePredicateNode,
    TypeQueryNode,
    TypeReferenceNode,
    UnaryExpression,
    UnionOrIntersectionTypeNode,
    UnionTypeNode,
    UpdateExpression,
    VariableDeclaration,
    VariableDeclarationList,
    VariableStatement,
    VoidExpression,
    WhileStatement,
    WithStatement,
    YieldExpression
} from "./_namespaces/ts.js";

// dprint-ignore
class AstNodeArrayExtraFields<N extends AstNode> {
    /** @internal */ nodes: NodeArray<N["node"]> | undefined = undefined;
    /** @internal */ hasTrailingComma: boolean = false;
    /** @internal */ transformFlags: TransformFlags = (-1 as TransformFlags); // Flags for transforms
    /** @internal */ __pos: number = -1;
    /** @internal */ __end: number = -1;
}

// dprint-ignore
export class AstNodeArray<N extends AstNode> {
    readonly items: readonly N[] = undefined!;

    pos = -1;
    end = -1;

    private _extra: AstNodeArrayExtraFields<N> | undefined = undefined;

    constructor(items: readonly N[], hasTrailingComma = false) {
        // catch any excess properties assigned to the NodeArray
        Object.preventExtensions(this);

        this.items = items;
        this.hasTrailingComma = hasTrailingComma;
    }

    private get extra(): AstNodeArrayExtraFields<N> {
        return this._extra ??= new AstNodeArrayExtraFields();
    }

    get nodes(): NodeArray<N["node"]> {
        return this.extra.nodes ??= new NodeArray(this);
    }
    get hasTrailingComma(): boolean {
        return this._extra?.hasTrailingComma ?? false;
    }
    set hasTrailingComma(value) {
        if (value !== this.hasTrailingComma) {
            this.extra.hasTrailingComma = value;
        }
    }

    /** @internal */ get transformFlags(): TransformFlags {
        const extra = this.extra;
        if (extra.transformFlags === (-1 as TransformFlags)) {
            let transformFlags = TransformFlags.None;
            for (const child of this.items) {
                transformFlags |= propagateChildFlags(child);
            }
            extra.transformFlags = transformFlags;
        }
        return extra.transformFlags;
    }
    /** @internal */ set transformFlags(value) {
        this.extra.transformFlags = value;
    }

    /** @internal */ get __pos(): number | undefined { // eslint-disable-line @typescript-eslint/naming-convention
        const pos = this._extra?.__pos;
        return pos === -1 ? undefined : pos;
    }
    /** @internal */ set __pos(value) { // eslint-disable-line @typescript-eslint/naming-convention
        if (value === undefined) {
            if (this._extra !== undefined) {
                this._extra.__pos = -1;
            }
        }
        else {
            if (value < 0) throw new RangeError();
            this.extra.__pos = value;
        }
    }
    /** @internal */ get __end(): number | undefined { // eslint-disable-line @typescript-eslint/naming-convention
        const end = this._extra?.__end;
        return end === -1 ? undefined : end;
    }
    /** @internal */ set __end(value) { // eslint-disable-line @typescript-eslint/naming-convention
        if (value === undefined) {
            if (this._extra !== undefined) {
                this._extra.__end = -1;
            }
        }
        else {
            if (value < 0) throw new RangeError();
            this.extra.__end = value;
        }
    }
}

/**
 * Holds the id for a `Node`. The id is held by another object to support
 * source file redirection.
 */
class AstNodeId {
    /** @internal */ id: NodeId = 0; // Unique id (used to look up NodeLinks)
}

// dprint-ignore
class AstNodeExtraFields {
    /** @internal */ id: AstNodeId = new AstNodeId();
    /** @internal */ original: AstNode | undefined = undefined; // The original node if this is an updated node.
    /** @internal */ emitNode: EmitNode | undefined = undefined; // Associated EmitNode (initialized by transforms)
    /** @internal */ modifierFlagsCache: ModifierFlags = ModifierFlags.None;
    /** @internal */ transformFlags: TransformFlags = (-1 as TransformFlags); // Flags for transforms
    /** @internal */ __pos: number = -1;
    /** @internal */ __end: number = -1;
}

let astNodeCloneCore: (node: AstNode) => AstNode;
let astNodeShadowCore: (node: AstNode) => AstNode;

// dprint-ignore
export class AstNode<N extends Node<SyntaxKind, AstData> = Node<SyntaxKind, AstData>> {
    static {
        astNodeCloneCore = node => node.cloneCore();
        astNodeShadowCore = node => node.shadowCore();
    }

    private _node: N | undefined = undefined;
    private _nodeConstructor: NodeConstructor<N> = undefined!;
    private _extra: AstNodeExtraFields | undefined = undefined;

    readonly kind: N["kind"] = 0;
    readonly data: N["data"] = undefined!;

    parent: AstNode<NonNullable<N["parent"]>> | undefined = undefined; // Parent node (initialized by binding)
    flags: NodeFlags = NodeFlags.None;
    pos = -1;
    end = -1;

    constructor(kind: N["kind"], data: N["data"], nodeConstructor: NodeConstructor<N>, flags: NodeFlags = NodeFlags.None) {
        // catch any excess properties assigned to the Node
        Object.preventExtensions(this);

        this.kind = kind;
        this.data = data;
        this.flags = flags;
        this._nodeConstructor = nodeConstructor;
    }

    get node(): N {
        return this._node ??= new this._nodeConstructor(this);
    }

    /** @internal */ get id(): number { return this._extra?.id.id ?? 0; }
    /** @internal */ set id(value) { this.extra.id.id = value; }
    /** @internal */ get original(): AstNode<Node<SyntaxKind, AstData>> | undefined { return this._extra?.original; }
    /** @internal */ set original(value) { this.extra.original = value; }
    /** @internal */ get emitNode(): EmitNode | undefined { return this._extra?.emitNode; }
    /** @internal */ set emitNode(value) { this.extra.emitNode = value; }
    /** @internal */ get transformFlags(): TransformFlags {
        const extra = this.extra;
        if (extra.transformFlags === (-1 as TransformFlags)) {
            extra.transformFlags = computeTransformFlags(this);
        }
        return extra.transformFlags;
    }
    /** @internal */ set transformFlags(value) { this.extra.transformFlags = value; }
    /** @internal */ get modifierFlagsCache(): ModifierFlags { return this._extra?.modifierFlagsCache ?? ModifierFlags.None; }
    /** @internal */ set modifierFlagsCache(value) { this.extra.modifierFlagsCache = value; }
    /** @internal */ get __pos(): number | undefined { // eslint-disable-line @typescript-eslint/naming-convention
        const pos = this._extra?.__pos;
        return pos === -1 ? undefined : pos;
    }
    /** @internal */ set __pos(value) { // eslint-disable-line @typescript-eslint/naming-convention
        if (value === undefined) {
            if (this._extra !== undefined) {
                this._extra.__pos = -1;
            }
        }
        else {
            if (value < 0) throw new RangeError();
            this.extra.__pos = value;
        }
    }
    /** @internal */ get __end(): number | undefined { // eslint-disable-line @typescript-eslint/naming-convention
        const end = this._extra?.__end;
        return end === -1 ? undefined : end;
    }
    /** @internal */ set __end(value) { // eslint-disable-line @typescript-eslint/naming-convention
        if (value === undefined) {
            if (this._extra !== undefined) {
                this._extra.__end = -1;
            }
        }
        else {
            if (value < 0) throw new RangeError();
            this.extra.__end = value;
        }
    }

    /** @internal */ get extra(): AstNodeExtraFields {
        return this._extra ??= new AstNodeExtraFields();
    }

    /**
     * Creates a shallow data-only clone of this node.
     *
     * Note to implementors: This method should not be overridden.
     * @sealed
     * @internal
     */
    clone(): AstNode {
        return this.data.cloneNode(this);
    }

    /**
     * Creates a shallow data-only clone of this node.
     *
     * @virtual
     * @internal
     */
    protected cloneCore(): AstNode {
        const clone = new AstNode(this.kind, this.data.clone(), this._nodeConstructor, this.flags);
        if (this._extra?.transformFlags !== undefined) clone.transformFlags = this.transformFlags;
        return clone;
    }

    /**
     * Creates a new data object using this object as the prototype.
     * This is primarily used for the purpose of redirecting source files.
     *
     * Note to implementors: This method should not be overridden.
     * @sealed
     * @internal
     */
    shadow(): AstNode {
        return this.data.shadowNode(this);
    }

    /**
     * Creates a new data object using this object as the prototype.
     * This is primarily used for the purpose of redirecting source files.
     *
     * @virtual
     * @internal
     */
    protected shadowCore(): AstNode {
        const clone = new AstNode(this.kind, this.data.shadow(), this._nodeConstructor, this.flags);
        clone._extra = Object.create(this.extra);
        clone.parent = this.parent;
        clone.pos = this.pos;
        clone.end = this.end;
        return clone;
    }

    static Token<K extends TokenSyntaxKind>(kind: K) {
        const makeToken = AstNode._tokenFactoryMap.get(kind);
        return (makeToken ? makeToken() : new AstNode(kind, new AstTokenData(), Token<K>)) as AstToken<K>;
    }

    private static _tokenFactoryMap = new Map<SyntaxKind, () => AstToken>([
        [SyntaxKind.NumericLiteral, this.NumericLiteral],
        [SyntaxKind.BigIntLiteral, this.BigIntLiteral],
        [SyntaxKind.StringLiteral, this.StringLiteral],
        [SyntaxKind.JsxText, this.JsxText],
        [SyntaxKind.RegularExpressionLiteral, this.RegularExpressionLiteral],
        [SyntaxKind.NoSubstitutionTemplateLiteral, this.NoSubstitutionTemplateLiteral],
        [SyntaxKind.TemplateHead, this.TemplateHead],
        [SyntaxKind.TemplateMiddle, this.TemplateMiddle],
        [SyntaxKind.TemplateTail, this.TemplateTail],
        [SyntaxKind.Identifier, this.Identifier],
        [SyntaxKind.PrivateIdentifier, this.PrivateIdentifier],
        [SyntaxKind.EndOfFileToken, this.EndOfFileToken],
        [SyntaxKind.ThisKeyword, this.ThisExpression],
        [SyntaxKind.SuperKeyword, this.SuperExpression],
        [SyntaxKind.ImportKeyword, this.ImportExpression],
        [SyntaxKind.NullKeyword, this.NullLiteral],
        [SyntaxKind.TrueKeyword, this.TrueLiteral],
        [SyntaxKind.FalseKeyword, this.FalseLiteral],
    ]);

    static EndOfFileToken(): AstEndOfFileToken {
        return new AstNode(SyntaxKind.EndOfFileToken, new AstEndOfFileTokenData(), EndOfFileToken);
    }
    static ThisExpression(): AstThisExpression {
        return new AstNode(SyntaxKind.ThisKeyword, new AstThisExpressionData(), ThisExpression);
    }
    static SuperExpression(): AstSuperExpression {
        return new AstNode(SyntaxKind.SuperKeyword, new AstSuperExpressionData(), SuperExpression);
    }
    static ImportExpression(): AstImportExpression {
        return new AstNode(SyntaxKind.ImportKeyword, new AstTokenData(), ImportExpression);
    }
    static NullLiteral(): AstNullLiteral {
        return new AstNode(SyntaxKind.NullKeyword, new AstTokenData(), NullLiteral);
    }
    static TrueLiteral(): AstTrueLiteral {
        return new AstNode(SyntaxKind.TrueKeyword, new AstTokenData(), TrueLiteral);
    }
    static FalseLiteral(): AstFalseLiteral {
        return new AstNode(SyntaxKind.FalseKeyword, new AstTokenData(), FalseLiteral);
    }
    static Identifier(): AstIdentifier {
        return new AstNode(SyntaxKind.Identifier, new AstIdentifierData(), Identifier);
    }
    static PrivateIdentifier(): AstPrivateIdentifier {
        return new AstNode(SyntaxKind.PrivateIdentifier, new AstPrivateIdentifierData(), PrivateIdentifier);
    }
    static QualifiedName(): AstQualifiedName {
        return new AstNode(SyntaxKind.QualifiedName, new AstQualifiedNameData(), QualifiedName);
    }
    static ComputedPropertyName(): AstComputedPropertyName {
        return new AstNode(SyntaxKind.ComputedPropertyName, new AstComputedPropertyNameData(), ComputedPropertyName);
    }
    static TypeParameterDeclaration(): AstTypeParameterDeclaration {
        return new AstNode(SyntaxKind.TypeParameter, new AstTypeParameterDeclarationData(), TypeParameterDeclaration);
    }
    static ParameterDeclaration(): AstParameterDeclaration {
        return new AstNode(SyntaxKind.Parameter, new AstParameterDeclarationData(), ParameterDeclaration);
    }
    static Decorator(): AstDecorator {
        return new AstNode(SyntaxKind.Decorator, new AstDecoratorData(), Decorator);
    }
    static PropertySignature(): AstPropertySignature {
        return new AstNode(SyntaxKind.PropertySignature, new AstPropertySignatureData(), PropertySignature);
    }
    static CallSignatureDeclaration(): AstCallSignatureDeclaration {
        return new AstNode(SyntaxKind.CallSignature, new AstCallSignatureDeclarationData(), CallSignatureDeclaration);
    }
    static ConstructSignatureDeclaration(): AstConstructSignatureDeclaration {
        return new AstNode(SyntaxKind.ConstructSignature, new AstConstructSignatureDeclarationData(), ConstructSignatureDeclaration);
    }
    static VariableDeclaration(): AstVariableDeclaration {
        return new AstNode(SyntaxKind.VariableDeclaration, new AstVariableDeclarationData(), VariableDeclaration);
    }
    static VariableDeclarationList(): AstVariableDeclarationList {
        return new AstNode(SyntaxKind.VariableDeclarationList, new AstVariableDeclarationListData(), VariableDeclarationList);
    }
    static BindingElement(): AstBindingElement {
        return new AstNode(SyntaxKind.BindingElement, new AstBindingElementData(), BindingElement);
    }
    static PropertyDeclaration(): AstPropertyDeclaration {
        return new AstNode(SyntaxKind.PropertyDeclaration, new AstPropertyDeclarationData(), PropertyDeclaration);
    }
    static PropertyAssignment(): AstPropertyAssignment {
        return new AstNode(SyntaxKind.PropertyAssignment, new AstPropertyAssignmentData(), PropertyAssignment);
    }
    static ShorthandPropertyAssignment(): AstShorthandPropertyAssignment {
        return new AstNode(SyntaxKind.ShorthandPropertyAssignment, new AstShorthandPropertyAssignmentData(), ShorthandPropertyAssignment);
    }
    static SpreadAssignment(): AstSpreadAssignment {
        return new AstNode(SyntaxKind.SpreadAssignment, new AstSpreadAssignmentData(), SpreadAssignment);
    }
    static ObjectBindingPattern(): AstObjectBindingPattern {
        return new AstNode(SyntaxKind.ObjectBindingPattern, new AstObjectBindingPatternData(), ObjectBindingPattern);
    }
    static ArrayBindingPattern(): AstArrayBindingPattern {
        return new AstNode(SyntaxKind.ArrayBindingPattern, new AstArrayBindingPatternData(), ArrayBindingPattern);
    }
    static FunctionDeclaration(): AstFunctionDeclaration {
        return new AstNode(SyntaxKind.FunctionDeclaration, new AstFunctionDeclarationData(), FunctionDeclaration);
    }
    static MethodSignature(): AstMethodSignature {
        return new AstNode(SyntaxKind.MethodSignature, new AstMethodSignatureData(), MethodSignature);
    }
    static MethodDeclaration(): AstMethodDeclaration {
        return new AstNode(SyntaxKind.MethodDeclaration, new AstMethodDeclarationData(), MethodDeclaration);
    }
    static ConstructorDeclaration(): AstConstructorDeclaration {
        return new AstNode(SyntaxKind.Constructor, new AstConstructorDeclarationData(), ConstructorDeclaration);
    }
    static SemicolonClassElement(): AstSemicolonClassElement {
        return new AstNode(SyntaxKind.SemicolonClassElement, new AstSemicolonClassElementData(), SemicolonClassElement);
    }
    static GetAccessorDeclaration(): AstGetAccessorDeclaration {
        return new AstNode(SyntaxKind.GetAccessor, new AstGetAccessorDeclarationData(), GetAccessorDeclaration);
    }
    static SetAccessorDeclaration(): AstSetAccessorDeclaration {
        return new AstNode(SyntaxKind.SetAccessor, new AstSetAccessorDeclarationData(), SetAccessorDeclaration);
    }
    static IndexSignatureDeclaration(): AstIndexSignatureDeclaration {
        return new AstNode(SyntaxKind.IndexSignature, new AstIndexSignatureDeclarationData(), IndexSignatureDeclaration);
    }
    static ClassStaticBlockDeclaration(): AstClassStaticBlockDeclaration {
        return new AstNode(SyntaxKind.ClassStaticBlockDeclaration, new AstClassStaticBlockDeclarationData(), ClassStaticBlockDeclaration);
    }
    /** @deprecated */
    static ImportTypeAssertionContainer(): AstImportTypeAssertionContainer {
        return new AstNode(SyntaxKind.ImportTypeAssertionContainer, new AstImportTypeAssertionContainerData(), ImportTypeAssertionContainer);
    }
    static ImportTypeNode(): AstImportTypeNode {
        return new AstNode(SyntaxKind.ImportType, new AstImportTypeNodeData(), ImportTypeNode);
    }
    static ThisTypeNode(): AstThisTypeNode {
        return new AstNode(SyntaxKind.ThisType, new AstThisTypeNodeData(), ThisTypeNode);
    }
    static FunctionTypeNode(): AstFunctionTypeNode {
        return new AstNode(SyntaxKind.FunctionType, new AstFunctionTypeNodeData(), FunctionTypeNode);
    }
    static ConstructorTypeNode(): AstConstructorTypeNode {
        return new AstNode(SyntaxKind.ConstructorType, new AstConstructorTypeNodeData(), ConstructorTypeNode);
    }
    static TypeReferenceNode(): AstTypeReferenceNode {
        return new AstNode(SyntaxKind.TypeReference, new AstTypeReferenceNodeData(), TypeReferenceNode);
    }
    static TypePredicateNode(): AstTypePredicateNode {
        return new AstNode(SyntaxKind.TypePredicate, new AstTypePredicateNodeData(), TypePredicateNode);
    }
    static TypeQueryNode(): AstTypeQueryNode {
        return new AstNode(SyntaxKind.TypeQuery, new AstTypeQueryNodeData(), TypeQueryNode);
    }
    static TypeLiteralNode(): AstTypeLiteralNode {
        return new AstNode(SyntaxKind.TypeLiteral, new AstTypeLiteralNodeData(), TypeLiteralNode);
    }
    static ArrayTypeNode(): AstArrayTypeNode {
        return new AstNode(SyntaxKind.ArrayType, new AstArrayTypeNodeData(), ArrayTypeNode);
    }
    static TupleTypeNode(): AstTupleTypeNode {
        return new AstNode(SyntaxKind.TupleType, new AstTupleTypeNodeData(), TupleTypeNode);
    }
    static NamedTupleMember(): AstNamedTupleMember {
        return new AstNode(SyntaxKind.NamedTupleMember, new AstNamedTupleMemberData(), NamedTupleMember);
    }
    static OptionalTypeNode(): AstOptionalTypeNode {
        return new AstNode(SyntaxKind.OptionalType, new AstOptionalTypeNodeData(), OptionalTypeNode);
    }
    static RestTypeNode(): AstRestTypeNode {
        return new AstNode(SyntaxKind.RestType, new AstRestTypeNodeData(), RestTypeNode);
    }
    static UnionTypeNode(): AstUnionTypeNode {
        return new AstNode(SyntaxKind.UnionType, new AstUnionTypeNodeData(), UnionTypeNode);
    }
    static IntersectionTypeNode(): AstIntersectionTypeNode {
        return new AstNode(SyntaxKind.IntersectionType, new AstIntersectionTypeNodeData(), IntersectionTypeNode);
    }
    static ConditionalTypeNode(): AstConditionalTypeNode {
        return new AstNode(SyntaxKind.ConditionalType, new AstConditionalTypeNodeData(), ConditionalTypeNode);
    }
    static InferTypeNode(): AstInferTypeNode {
        return new AstNode(SyntaxKind.InferType, new AstInferTypeNodeData(), InferTypeNode);
    }
    static ParenthesizedTypeNode(): AstParenthesizedTypeNode {
        return new AstNode(SyntaxKind.ParenthesizedType, new AstParenthesizedTypeNodeData(), ParenthesizedTypeNode);
    }
    static TypeOperatorNode(): AstTypeOperatorNode {
        return new AstNode(SyntaxKind.TypeOperator, new AstTypeOperatorNodeData(), TypeOperatorNode);
    }
    static IndexedAccessTypeNode(): AstIndexedAccessTypeNode {
        return new AstNode(SyntaxKind.IndexedAccessType, new AstIndexedAccessTypeNodeData(), IndexedAccessTypeNode);
    }
    static MappedTypeNode(): AstMappedTypeNode {
        return new AstNode(SyntaxKind.MappedType, new AstMappedTypeNodeData(), MappedTypeNode);
    }
    static LiteralTypeNode(): AstLiteralTypeNode {
        return new AstNode(SyntaxKind.LiteralType, new AstLiteralTypeNodeData(), LiteralTypeNode);
    }
    static StringLiteral(): AstStringLiteral {
        return new AstNode(SyntaxKind.StringLiteral, new AstStringLiteralData(), StringLiteral);
    }
    static TemplateLiteralTypeNode(): AstTemplateLiteralTypeNode {
        return new AstNode(SyntaxKind.TemplateLiteralType, new AstTemplateLiteralTypeNodeData(), TemplateLiteralTypeNode);
    }
    static TemplateLiteralTypeSpan(): AstTemplateLiteralTypeSpan {
        return new AstNode(SyntaxKind.TemplateLiteralTypeSpan, new AstTemplateLiteralTypeSpanData(), TemplateLiteralTypeSpan);
    }
    static OmittedExpression(): AstOmittedExpression {
        return new AstNode(SyntaxKind.OmittedExpression, new AstOmittedExpressionData(), OmittedExpression);
    }
    static PrefixUnaryExpression(): AstPrefixUnaryExpression {
        return new AstNode(SyntaxKind.PrefixUnaryExpression, new AstPrefixUnaryExpressionData(), PrefixUnaryExpression);
    }
    static PostfixUnaryExpression(): AstPostfixUnaryExpression {
        return new AstNode(SyntaxKind.PostfixUnaryExpression, new AstPostfixUnaryExpressionData(), PostfixUnaryExpression);
    }
    static DeleteExpression(): AstDeleteExpression {
        return new AstNode(SyntaxKind.DeleteExpression, new AstDeleteExpressionData(), DeleteExpression);
    }
    static TypeOfExpression(): AstTypeOfExpression {
        return new AstNode(SyntaxKind.TypeOfExpression, new AstTypeOfExpressionData(), TypeOfExpression);
    }
    static VoidExpression(): AstVoidExpression {
        return new AstNode(SyntaxKind.VoidExpression, new AstVoidExpressionData(), VoidExpression);
    }
    static AwaitExpression(): AstAwaitExpression {
        return new AstNode(SyntaxKind.AwaitExpression, new AstAwaitExpressionData(), AwaitExpression);
    }
    static YieldExpression(): AstYieldExpression {
        return new AstNode(SyntaxKind.YieldExpression, new AstYieldExpressionData(), YieldExpression);
    }
    static BinaryExpression(): AstBinaryExpression {
        return new AstNode(SyntaxKind.BinaryExpression, new AstBinaryExpressionData(), BinaryExpression);
    }
    static ConditionalExpression(): AstConditionalExpression {
        return new AstNode(SyntaxKind.ConditionalExpression, new AstConditionalExpressionData(), ConditionalExpression);
    }
    static FunctionExpression(): AstFunctionExpression {
        return new AstNode(SyntaxKind.FunctionExpression, new AstFunctionExpressionData(), FunctionExpression);
    }
    static ArrowFunction(): AstArrowFunction {
        return new AstNode(SyntaxKind.ArrowFunction, new AstArrowFunctionData(), ArrowFunction);
    }
    static RegularExpressionLiteral(): AstRegularExpressionLiteral {
        return new AstNode(SyntaxKind.RegularExpressionLiteral, new AstRegularExpressionLiteralData(), RegularExpressionLiteral);
    }
    static NoSubstitutionTemplateLiteral(): AstNoSubstitutionTemplateLiteral {
        return new AstNode(SyntaxKind.NoSubstitutionTemplateLiteral, new AstNoSubstitutionTemplateLiteralData(), NoSubstitutionTemplateLiteral);
    }
    static NumericLiteral(): AstNumericLiteral {
        return new AstNode(SyntaxKind.NumericLiteral, new AstNumericLiteralData(), NumericLiteral);
    }
    static BigIntLiteral(): AstBigIntLiteral {
        return new AstNode(SyntaxKind.BigIntLiteral, new AstBigIntLiteralData(), BigIntLiteral);
    }
    static TemplateHead(): AstTemplateHead {
        return new AstNode(SyntaxKind.TemplateHead, new AstTemplateHeadData(), TemplateHead);
    }
    static TemplateMiddle(): AstTemplateMiddle {
        return new AstNode(SyntaxKind.TemplateMiddle, new AstTemplateMiddleData(), TemplateMiddle);
    }
    static TemplateTail(): AstTemplateTail {
        return new AstNode(SyntaxKind.TemplateTail, new AstTemplateTailData(), TemplateTail);
    }
    static TemplateExpression(): AstTemplateExpression {
        return new AstNode(SyntaxKind.TemplateExpression, new AstTemplateExpressionData(), TemplateExpression);
    }
    static TemplateSpan(): AstTemplateSpan {
        return new AstNode(SyntaxKind.TemplateSpan, new AstTemplateSpanData(), TemplateSpan);
    }
    static ParenthesizedExpression(): AstParenthesizedExpression {
        return new AstNode(SyntaxKind.ParenthesizedExpression, new AstParenthesizedExpressionData(), ParenthesizedExpression);
    }
    static ArrayLiteralExpression(): AstArrayLiteralExpression {
        return new AstNode(SyntaxKind.ArrayLiteralExpression, new AstArrayLiteralExpressionData(), ArrayLiteralExpression);
    }
    static SpreadElement(): AstSpreadElement {
        return new AstNode(SyntaxKind.SpreadElement, new AstSpreadElementData(), SpreadElement);
    }
    static ObjectLiteralExpression(): AstObjectLiteralExpression {
        return new AstNode(SyntaxKind.ObjectLiteralExpression, new AstObjectLiteralExpressionData(), ObjectLiteralExpression);
    }
    static PropertyAccessExpression(): AstPropertyAccessExpression {
        return new AstNode(SyntaxKind.PropertyAccessExpression, new AstPropertyAccessExpressionData(), PropertyAccessExpression);
    }
    static PropertyAccessChain(): AstPropertyAccessChain {
        return new AstNode(SyntaxKind.PropertyAccessExpression, new AstPropertyAccessExpressionData(), PropertyAccessExpression, NodeFlags.OptionalChain) as AstPropertyAccessChain;
    }
    static ElementAccessExpression(): AstElementAccessExpression {
        return new AstNode(SyntaxKind.ElementAccessExpression, new AstElementAccessExpressionData(), ElementAccessExpression);
    }
    static ElementAccessChain(): AstElementAccessChain {
        return new AstNode(SyntaxKind.ElementAccessExpression, new AstElementAccessExpressionData(), ElementAccessExpression, NodeFlags.OptionalChain) as AstElementAccessChain;
    }
    static CallExpression(): AstCallExpression {
        return new AstNode(SyntaxKind.CallExpression, new AstCallExpressionData(), CallExpression);
    }
    static CallChain(): AstCallChain {
        return new AstNode(SyntaxKind.CallExpression, new AstCallExpressionData(), CallExpression, NodeFlags.OptionalChain) as AstCallChain;
    }
    static ExpressionWithTypeArguments(): AstExpressionWithTypeArguments {
        return new AstNode(SyntaxKind.ExpressionWithTypeArguments, new AstExpressionWithTypeArgumentsData(), ExpressionWithTypeArguments);
    }
    static NewExpression(): AstNewExpression {
        return new AstNode(SyntaxKind.NewExpression, new AstNewExpressionData(), NewExpression);
    }
    static TaggedTemplateExpression(): AstTaggedTemplateExpression {
        return new AstNode(SyntaxKind.TaggedTemplateExpression, new AstTaggedTemplateExpressionData(), TaggedTemplateExpression);
    }
    static AsExpression(): AstAsExpression {
        return new AstNode(SyntaxKind.AsExpression, new AstAsExpressionData(), AsExpression);
    }
    static TypeAssertion(): AstTypeAssertion {
        return new AstNode(SyntaxKind.TypeAssertionExpression, new AstTypeAssertionData(), TypeAssertionExpression);
    }
    static SatisfiesExpression(): AstSatisfiesExpression {
        return new AstNode(SyntaxKind.SatisfiesExpression, new AstSatisfiesExpressionData(), SatisfiesExpression);
    }
    static NonNullExpression(): AstNonNullExpression {
        return new AstNode(SyntaxKind.NonNullExpression, new AstNonNullExpressionData(), NonNullExpression);
    }
    static NonNullChain(): AstNonNullChain {
        return new AstNode(SyntaxKind.NonNullExpression, new AstNonNullExpressionData(), NonNullExpression, NodeFlags.OptionalChain) as AstNonNullChain;
    }
    static MetaProperty(): AstMetaProperty {
        return new AstNode(SyntaxKind.MetaProperty, new AstMetaPropertyData(), MetaProperty);
    }
    static JsxElement(): AstJsxElement {
        return new AstNode(SyntaxKind.JsxElement, new AstJsxElementData(), JsxElement);
    }
    static JsxAttributes(): AstJsxAttributes {
        return new AstNode(SyntaxKind.JsxAttributes, new AstJsxAttributesData(), JsxAttributes);
    }
    static JsxNamespacedName(): AstJsxNamespacedName {
        return new AstNode(SyntaxKind.JsxNamespacedName, new AstJsxNamespacedNameData(), JsxNamespacedName);
    }
    static JsxOpeningElement(): AstJsxOpeningElement {
        return new AstNode(SyntaxKind.JsxOpeningElement, new AstJsxOpeningElementData(), JsxOpeningElement);
    }
    static JsxSelfClosingElement(): AstJsxSelfClosingElement {
        return new AstNode(SyntaxKind.JsxSelfClosingElement, new AstJsxSelfClosingElementData(), JsxSelfClosingElement);
    }
    static JsxFragment(): AstJsxFragment {
        return new AstNode(SyntaxKind.JsxFragment, new AstJsxFragmentData(), JsxFragment);
    }
    static JsxOpeningFragment(): AstJsxOpeningFragment {
        return new AstNode(SyntaxKind.JsxOpeningFragment, new AstJsxOpeningFragmentData(), JsxOpeningFragment);
    }
    static JsxClosingFragment(): AstJsxClosingFragment {
        return new AstNode(SyntaxKind.JsxClosingFragment, new AstJsxClosingFragmentData(), JsxClosingFragment);
    }
    static JsxAttribute(): AstJsxAttribute {
        return new AstNode(SyntaxKind.JsxAttribute, new AstJsxAttributeData(), JsxAttribute);
    }
    static JsxSpreadAttribute(): AstJsxSpreadAttribute {
        return new AstNode(SyntaxKind.JsxSpreadAttribute, new AstJsxSpreadAttributeData(), JsxSpreadAttribute);
    }
    static JsxClosingElement(): AstJsxClosingElement {
        return new AstNode(SyntaxKind.JsxClosingElement, new AstJsxClosingElementData(), JsxClosingElement);
    }
    static JsxExpression(): AstJsxExpression {
        return new AstNode(SyntaxKind.JsxExpression, new AstJsxExpressionData(), JsxExpression);
    }
    static JsxText(): AstJsxText {
        return new AstNode(SyntaxKind.JsxText, new AstJsxTextData(), JsxText);
    }
    static EmptyStatement(): AstEmptyStatement {
        return new AstNode(SyntaxKind.EmptyStatement, new AstEmptyStatementData(), EmptyStatement);
    }
    static DebuggerStatement(): AstDebuggerStatement {
        return new AstNode(SyntaxKind.DebuggerStatement, new AstDebuggerStatementData(), DebuggerStatement);
    }
    static MissingDeclaration(): AstMissingDeclaration {
        return new AstNode(SyntaxKind.MissingDeclaration, new AstMissingDeclarationData(), MissingDeclaration);
    }
    static Block(): AstBlock {
        return new AstNode(SyntaxKind.Block, new AstBlockData(), Block);
    }
    static VariableStatement(): AstVariableStatement {
        return new AstNode(SyntaxKind.VariableStatement, new AstVariableStatementData(), VariableStatement);
    }
    static ExpressionStatement(): AstExpressionStatement {
        return new AstNode(SyntaxKind.ExpressionStatement, new AstExpressionStatementData(), ExpressionStatement);
    }
    static IfStatement(): AstIfStatement {
        return new AstNode(SyntaxKind.IfStatement, new AstIfStatementData(), IfStatement);
    }
    static DoStatement(): AstDoStatement {
        return new AstNode(SyntaxKind.DoStatement, new AstDoStatementData(), DoStatement);
    }
    static WhileStatement(): AstWhileStatement {
        return new AstNode(SyntaxKind.WhileStatement, new AstWhileStatementData(), WhileStatement);
    }
    static ForStatement(): AstForStatement {
        return new AstNode(SyntaxKind.ForStatement, new AstForStatementData(), ForStatement);
    }
    static ForInStatement(): AstForInStatement {
        return new AstNode(SyntaxKind.ForInStatement, new AstForInStatementData(), ForInStatement);
    }
    static ForOfStatement(): AstForOfStatement {
        return new AstNode(SyntaxKind.ForOfStatement, new AstForOfStatementData(), ForOfStatement);
    }
    static BreakStatement(): AstBreakStatement {
        return new AstNode(SyntaxKind.BreakStatement, new AstBreakStatementData(), BreakStatement);
    }
    static ContinueStatement(): AstContinueStatement {
        return new AstNode(SyntaxKind.ContinueStatement, new AstContinueStatementData(), ContinueStatement);
    }
    static ReturnStatement(): AstReturnStatement {
        return new AstNode(SyntaxKind.ReturnStatement, new AstReturnStatementData(), ReturnStatement);
    }
    static WithStatement(): AstWithStatement {
        return new AstNode(SyntaxKind.WithStatement, new AstWithStatementData(), WithStatement);
    }
    static SwitchStatement(): AstSwitchStatement {
        return new AstNode(SyntaxKind.SwitchStatement, new AstSwitchStatementData(), SwitchStatement);
    }
    static CaseBlock(): AstCaseBlock {
        return new AstNode(SyntaxKind.CaseBlock, new AstCaseBlockData(), CaseBlock);
    }
    static CaseClause(): AstCaseClause {
        return new AstNode(SyntaxKind.CaseClause, new AstCaseClauseData(), CaseClause);
    }
    static DefaultClause(): AstDefaultClause {
        return new AstNode(SyntaxKind.DefaultClause, new AstDefaultClauseData(), DefaultClause);
    }
    static LabeledStatement(): AstLabeledStatement {
        return new AstNode(SyntaxKind.LabeledStatement, new AstLabeledStatementData(), LabeledStatement);
    }
    static ThrowStatement(): AstThrowStatement {
        return new AstNode(SyntaxKind.ThrowStatement, new AstThrowStatementData(), ThrowStatement);
    }
    static TryStatement(): AstTryStatement {
        return new AstNode(SyntaxKind.TryStatement, new AstTryStatementData(), TryStatement);
    }
    static CatchClause(): AstCatchClause {
        return new AstNode(SyntaxKind.CatchClause, new AstCatchClauseData(), CatchClause);
    }
    static ClassDeclaration(): AstClassDeclaration {
        return new AstNode(SyntaxKind.ClassDeclaration, new AstClassDeclarationData(), ClassDeclaration);
    }
    static ClassExpression(): AstClassExpression {
        return new AstNode(SyntaxKind.ClassExpression, new AstClassExpressionData(), ClassExpression);
    }
    static InterfaceDeclaration(): AstInterfaceDeclaration {
        return new AstNode(SyntaxKind.InterfaceDeclaration, new AstInterfaceDeclarationData(), InterfaceDeclaration);
    }
    static HeritageClause(): AstHeritageClause {
        return new AstNode(SyntaxKind.HeritageClause, new AstHeritageClauseData(), HeritageClause);
    }
    static TypeAliasDeclaration(): AstTypeAliasDeclaration {
        return new AstNode(SyntaxKind.TypeAliasDeclaration, new AstTypeAliasDeclarationData(), TypeAliasDeclaration);
    }
    static EnumMember(): AstEnumMember {
        return new AstNode(SyntaxKind.EnumMember, new AstEnumMemberData(), EnumMember);
    }
    static EnumDeclaration(): AstEnumDeclaration {
        return new AstNode(SyntaxKind.EnumDeclaration, new AstEnumDeclarationData(), EnumDeclaration);
    }
    static ModuleDeclaration(): AstModuleDeclaration {
        return new AstNode(SyntaxKind.ModuleDeclaration, new AstModuleDeclarationData(), ModuleDeclaration);
    }
    static ModuleBlock(): AstModuleBlock {
        return new AstNode(SyntaxKind.ModuleBlock, new AstModuleBlockData(), ModuleBlock);
    }
    static ImportEqualsDeclaration(): AstImportEqualsDeclaration {
        return new AstNode(SyntaxKind.ImportEqualsDeclaration, new AstImportEqualsDeclarationData(), ImportEqualsDeclaration);
    }
    static ExternalModuleReference(): AstExternalModuleReference {
        return new AstNode(SyntaxKind.ExternalModuleReference, new AstExternalModuleReferenceData(), ExternalModuleReference);
    }
    static ImportDeclaration(): AstImportDeclaration {
        return new AstNode(SyntaxKind.ImportDeclaration, new AstImportDeclarationData(), ImportDeclaration);
    }
    static ImportClause(): AstImportClause {
        return new AstNode(SyntaxKind.ImportClause, new AstImportClauseData(), ImportClause);
    }
    static ImportAttribute(): AstImportAttribute {
        return new AstNode(SyntaxKind.ImportAttribute, new AstImportAttributeData(), ImportAttribute);
    }
    static ImportAttributes(): AstImportAttributes {
        return new AstNode(SyntaxKind.ImportAttributes, new AstImportAttributesData(), ImportAttributes);
    }
    static NamespaceImport(): AstNamespaceImport {
        return new AstNode(SyntaxKind.NamespaceImport, new AstNamespaceImportData(), NamespaceImport);
    }
    static NamespaceExport(): AstNamespaceExport {
        return new AstNode(SyntaxKind.NamespaceExport, new AstNamespaceExportData(), NamespaceExport);
    }
    static NamespaceExportDeclaration(): AstNamespaceExportDeclaration {
        return new AstNode(SyntaxKind.NamespaceExportDeclaration, new AstNamespaceExportDeclarationData(), NamespaceExportDeclaration);
    }
    static ExportDeclaration(): AstExportDeclaration {
        return new AstNode(SyntaxKind.ExportDeclaration, new AstExportDeclarationData(), ExportDeclaration);
    }
    static NamedImports(): AstNamedImports {
        return new AstNode(SyntaxKind.NamedImports, new AstNamedImportsData(), NamedImports);
    }
    static NamedExports(): AstNamedExports {
        return new AstNode(SyntaxKind.NamedExports, new AstNamedExportsData(), NamedExports);
    }
    static ImportSpecifier(): AstImportSpecifier {
        return new AstNode(SyntaxKind.ImportSpecifier, new AstImportSpecifierData(), ImportSpecifier);
    }
    static ExportSpecifier(): AstExportSpecifier {
        return new AstNode(SyntaxKind.ExportSpecifier, new AstExportSpecifierData(), ExportSpecifier);
    }
    static ExportAssignment(): AstExportAssignment {
        return new AstNode(SyntaxKind.ExportAssignment, new AstExportAssignmentData(), ExportAssignment);
    }
    static JSDocTypeExpression(): AstJSDocTypeExpression {
        return new AstNode(SyntaxKind.JSDocTypeExpression, new AstJSDocTypeExpressionData(), JSDocTypeExpression);
    }
    static JSDocNameReference(): AstJSDocNameReference {
        return new AstNode(SyntaxKind.JSDocNameReference, new AstJSDocNameReferenceData(), JSDocNameReference);
    }
    static JSDocMemberName(): AstJSDocMemberName {
        return new AstNode(SyntaxKind.JSDocMemberName, new AstJSDocMemberNameData(), JSDocMemberName);
    }
    static JSDocAllType(): AstJSDocAllType {
        return new AstNode(SyntaxKind.JSDocAllType, new AstJSDocAllTypeData(), JSDocAllType);
    }
    static JSDocUnknownType(): AstJSDocUnknownType {
        return new AstNode(SyntaxKind.JSDocUnknownType, new AstJSDocUnknownTypeData(), JSDocUnknownType);
    }
    static JSDocNonNullableType(): AstJSDocNonNullableType {
        return new AstNode(SyntaxKind.JSDocNonNullableType, new AstJSDocNonNullableTypeData(), JSDocNonNullableType);
    }
    static JSDocNullableType(): AstJSDocNullableType {
        return new AstNode(SyntaxKind.JSDocNullableType, new AstJSDocNullableTypeData(), JSDocNullableType);
    }
    static JSDocOptionalType(): AstJSDocOptionalType {
        return new AstNode(SyntaxKind.JSDocOptionalType, new AstJSDocOptionalTypeData(), JSDocOptionalType);
    }
    static JSDocFunctionType(): AstJSDocFunctionType {
        return new AstNode(SyntaxKind.JSDocFunctionType, new AstJSDocFunctionTypeData(), JSDocFunctionType);
    }
    static JSDocVariadicType(): AstJSDocVariadicType {
        return new AstNode(SyntaxKind.JSDocVariadicType, new AstJSDocVariadicTypeData(), JSDocVariadicType);
    }
    static JSDocNamepathType(): AstJSDocNamepathType {
        return new AstNode(SyntaxKind.JSDocNamepathType, new AstJSDocNamepathTypeData(), JSDocNamepathType);
    }
    static JSDocNode(): AstJSDoc {
        return new AstNode(SyntaxKind.JSDoc, new AstJSDocData(), JSDoc);
    }
    static JSDocLink(): AstJSDocLink {
        return new AstNode(SyntaxKind.JSDocLink, new AstJSDocLinkData(), JSDocLink);
    }
    static JSDocLinkCode(): AstJSDocLinkCode {
        return new AstNode(SyntaxKind.JSDocLinkCode, new AstJSDocLinkCodeData(), JSDocLinkCode);
    }
    static JSDocLinkPlain(): AstJSDocLinkPlain {
        return new AstNode(SyntaxKind.JSDocLinkPlain, new AstJSDocLinkPlainData(), JSDocLinkPlain);
    }
    static JSDocText(): AstJSDocText {
        return new AstNode(SyntaxKind.JSDocText, new AstJSDocTextData(), JSDocText);
    }
    static JSDocUnknownTag(): AstJSDocUnknownTag {
        return new AstNode(SyntaxKind.JSDocTag, new AstJSDocUnknownTagData(), JSDocUnknownTag);
    }
    static JSDocAugmentsTag(): AstJSDocAugmentsTag {
        return new AstNode(SyntaxKind.JSDocAugmentsTag, new AstJSDocAugmentsTagData(), JSDocAugmentsTag);
    }
    static JSDocImplementsTag(): AstJSDocImplementsTag {
        return new AstNode(SyntaxKind.JSDocImplementsTag, new AstJSDocImplementsTagData(), JSDocImplementsTag);
    }
    static JSDocAuthorTag(): AstJSDocAuthorTag {
        return new AstNode(SyntaxKind.JSDocAuthorTag, new AstJSDocAuthorTagData(), JSDocAuthorTag);
    }
    static JSDocDeprecatedTag(): AstJSDocDeprecatedTag {
        return new AstNode(SyntaxKind.JSDocDeprecatedTag, new AstJSDocDeprecatedTagData(), JSDocDeprecatedTag);
    }
    static JSDocClassTag(): AstJSDocClassTag {
        return new AstNode(SyntaxKind.JSDocClassTag, new AstJSDocClassTagData(), JSDocClassTag);
    }
    static JSDocPublicTag(): AstJSDocPublicTag {
        return new AstNode(SyntaxKind.JSDocPublicTag, new AstJSDocPublicTagData(), JSDocPublicTag);
    }
    static JSDocPrivateTag(): AstJSDocPrivateTag {
        return new AstNode(SyntaxKind.JSDocPrivateTag, new AstJSDocPrivateTagData(), JSDocPrivateTag);
    }
    static JSDocProtectedTag(): AstJSDocProtectedTag {
        return new AstNode(SyntaxKind.JSDocProtectedTag, new AstJSDocProtectedTagData(), JSDocProtectedTag);
    }
    static JSDocReadonlyTag(): AstJSDocReadonlyTag {
        return new AstNode(SyntaxKind.JSDocReadonlyTag, new AstJSDocReadonlyTagData(), JSDocReadonlyTag);
    }
    static JSDocOverrideTag(): AstJSDocOverrideTag {
        return new AstNode(SyntaxKind.JSDocOverrideTag, new AstJSDocOverrideTagData(), JSDocOverrideTag);
    }
    static JSDocEnumTag(): AstJSDocEnumTag {
        return new AstNode(SyntaxKind.JSDocEnumTag, new AstJSDocEnumTagData(), JSDocEnumTag);
    }
    static JSDocThisTag(): AstJSDocThisTag {
        return new AstNode(SyntaxKind.JSDocThisTag, new AstJSDocThisTagData(), JSDocThisTag);
    }
    static JSDocTemplateTag(): AstJSDocTemplateTag {
        return new AstNode(SyntaxKind.JSDocTemplateTag, new AstJSDocTemplateTagData(), JSDocTemplateTag);
    }
    static JSDocSeeTag(): AstJSDocSeeTag {
        return new AstNode(SyntaxKind.JSDocSeeTag, new AstJSDocSeeTagData(), JSDocSeeTag);
    }
    static JSDocReturnTag(): AstJSDocReturnTag {
        return new AstNode(SyntaxKind.JSDocReturnTag, new AstJSDocReturnTagData(), JSDocReturnTag);
    }
    static JSDocTypeTag(): AstJSDocTypeTag {
        return new AstNode(SyntaxKind.JSDocTypeTag, new AstJSDocTypeTagData(), JSDocTypeTag);
    }
    static JSDocTypedefTag(): AstJSDocTypedefTag {
        return new AstNode(SyntaxKind.JSDocTypedefTag, new AstJSDocTypedefTagData(), JSDocTypedefTag);
    }
    static JSDocCallbackTag(): AstJSDocCallbackTag {
        return new AstNode(SyntaxKind.JSDocCallbackTag, new AstJSDocCallbackTagData(), JSDocCallbackTag);
    }
    static JSDocOverloadTag(): AstJSDocOverloadTag {
        return new AstNode(SyntaxKind.JSDocOverloadTag, new AstJSDocOverloadTagData(), JSDocOverloadTag);
    }
    static JSDocThrowsTag(): AstJSDocThrowsTag {
        return new AstNode(SyntaxKind.JSDocThrowsTag, new AstJSDocThrowsTagData(), JSDocThrowsTag);
    }
    static JSDocSignature(): AstJSDocSignature {
        return new AstNode(SyntaxKind.JSDocSignature, new AstJSDocSignatureData(), JSDocSignature);
    }
    static JSDocPropertyTag(): AstJSDocPropertyTag {
        return new AstNode(SyntaxKind.JSDocPropertyTag, new AstJSDocPropertyTagData(), JSDocPropertyTag);
    }
    static JSDocParameterTag(): AstJSDocParameterTag {
        return new AstNode(SyntaxKind.JSDocParameterTag, new AstJSDocParameterTagData(), JSDocParameterTag);
    }
    static JSDocTypeLiteral(): AstJSDocTypeLiteral {
        return new AstNode(SyntaxKind.JSDocTypeLiteral, new AstJSDocTypeLiteralData(), JSDocTypeLiteral);
    }
    static JSDocSatisfiesTag(): AstJSDocSatisfiesTag {
        return new AstNode(SyntaxKind.JSDocSatisfiesTag, new AstJSDocSatisfiesTagData(), JSDocSatisfiesTag);
    }
    static JSDocImportTag(): AstJSDocImportTag {
        return new AstNode(SyntaxKind.JSDocImportTag, new AstJSDocImportTagData(), JSDocImportTag);
    }
    static SourceFile(): AstSourceFile {
        return new AstNode(SyntaxKind.SourceFile, new AstSourceFileData(), SourceFile);
    }
    static SyntheticExpression(): AstSyntheticExpression {
        return new AstNode(SyntaxKind.SyntheticExpression, new AstSyntheticExpressionData(), SyntheticExpression);
    }
    static Bundle(): AstBundle {
        return new AstNode(SyntaxKind.Bundle, new AstBundleData(), Bundle);
    }
    static SyntaxList(): AstSyntaxList {
        return new AstNode(SyntaxKind.SyntaxList, new AstSyntaxListData(), SyntaxList);
    }
    static NotEmittedStatement(): AstNotEmittedStatement {
        return new AstNode(SyntaxKind.NotEmittedStatement, new AstNotEmittedStatementData(), NotEmittedStatement);
    }
    static NotEmittedTypeElement(): AstNotEmittedTypeElement {
        return new AstNode(SyntaxKind.NotEmittedTypeElement, new AstNotEmittedTypeElementData(), NotEmittedTypeElement);
    }
    static PartiallyEmittedExpression(): AstPartiallyEmittedExpression {
        return new AstNode(SyntaxKind.PartiallyEmittedExpression, new AstPartiallyEmittedExpressionData(), PartiallyEmittedExpression);
    }
    static CommaListExpression(): AstCommaListExpression {
        return new AstNode(SyntaxKind.CommaListExpression, new AstCommaListExpressionData(), CommaListExpression);
    }
    /** @internal */ static SyntheticReferenceExpression(): AstSyntheticReferenceExpression {
        return new AstNode(SyntaxKind.SyntheticReferenceExpression, new AstSyntheticReferenceExpressionData(), SyntheticReferenceExpression);
    }
}

export type AstNodeOneOf<N extends Node> = N extends unknown ? AstNode<N> : never;

// dprint-ignore
export class AstData {
    /** @internal */ computeTransformFlags(node: AstNode): TransformFlags {
        void node;
        return TransformFlags.None;
    }

    /**
     * Controls cloning the provided node.
     * @internal
     */
    cloneNode(node: AstNode): AstNode {
        return astNodeCloneCore(node);
    }

    /**
     * Creates a shallow, member-wise clone of this data object.
     * @internal
     */
    clone(): AstData {
        const clone = this.createInstance();
        this.copyProperties(clone);
        return clone;
    }

    /**
     * Creates a new instance of a data object with the same prototype as this object.
     * @internal
     */
    protected createInstance(): AstData {
        return Object.create(Object.getPrototypeOf(this));
    }

    /**
     * Copies the properties of this object to the provided object.
     * @internal
     */
    protected copyProperties(clone: AstData): void {
        for (const key in this) {
            if (hasProperty(this, key)) {
                (clone as any)[key] = (this as any)[key];
            }
        }
    }

    /**
     * Controls creation of a shadow node for the provided node.
     * This is primarily used for the purpose of redirecting source files.
     * @internal
     */
    shadowNode(node: AstNode): AstNode {
        return astNodeShadowCore(node);
    }

    /**
     * Creates a new data object using this object as the prototype.
     * This is primarily used for the purpose of redirecting source files.
     * @internal
     */
    shadow(): AstData {
        return Object.create(this);
    }
}

// dprint-ignore
export class AstTypeScriptNodeData extends AstData {
    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.ContainsTypeScript;
    }
}

/** @internal */
export type AstHasLocals = AstNodeOneOf<HasLocals>;
export type AstHasDecorators = AstNodeOneOf<HasDecorators>;
export type AstHasModifiers = AstNodeOneOf<HasModifiers>;
/** @internal */
export type AstHasChildren = AstNodeOneOf<HasChildren>;
/** @internal */
export type AstForEachChildNodes = AstNodeOneOf<ForEachChildNodes>;
export type AstDeclaration = AstNode<Declaration>;
export type AstTypeNode<TKind extends TypeNodeSyntaxKind = TypeNodeSyntaxKind> = AstNode<TypeNode<TKind>>;
export type AstStatement = AstNode<Statement>;
export type AstExpression = AstNode<Expression>;
export type AstUnaryExpression = AstNode<UnaryExpression>;
export type AstUpdateExpression = AstNode<UpdateExpression>;
export type AstLeftHandSideExpression = AstNode<LeftHandSideExpression>;
export type AstMemberExpression = AstNode<MemberExpression>;
export type AstPrimaryExpression = AstNode<PrimaryExpression>;
export type AstKeywordExpression<TKind extends KeywordSyntaxKind = KeywordSyntaxKind> = AstNode<KeywordExpression<TKind>>;
export type AstLiteralLikeNode = AstNode<LiteralLikeNode>;

export interface AstLiteralLikeNodeData extends AstData {
    text: string;
}

export type AstStringLiteralLikeNode = AstNode<StringLiteralLikeNode>;

export interface AstStringLiteralLikeNodeData extends AstLiteralLikeNodeData {
    isUnterminated: boolean | undefined;
    hasExtendedUnicodeEscape: boolean | undefined;
}

export interface AstTemplateLiteralLikeNodeData extends AstStringLiteralLikeNodeData {
    rawText: string | undefined;
    /** @internal */ templateFlags: TokenFlags | undefined;
}

export type AstTemplateLiteralLikeNode = AstNode<TemplateLiteralLikeNode>;

export type AstLiteralExpression = AstNode<LiteralExpression>;

export interface AstLiteralExpressionData extends AstLiteralLikeNodeData {
}

export type AstToken<K extends TokenSyntaxKind = TokenSyntaxKind> = AstNode<Token<K>>;

// dprint-ignore
export class AstTokenData extends AstData {
    /** @internal */ override computeTransformFlags(node: AstNode): TransformFlags {
        switch (node.kind) {
            case SyntaxKind.AsyncKeyword:
                // 'async' modifier is ES2017 (async functions) or ES2018 (async generators)
                return TransformFlags.ContainsES2017 | TransformFlags.ContainsES2018;
            case SyntaxKind.UsingKeyword:
                return TransformFlags.ContainsESNext;
            case SyntaxKind.PublicKeyword:
            case SyntaxKind.PrivateKeyword:
            case SyntaxKind.ProtectedKeyword:
            case SyntaxKind.ReadonlyKeyword:
            case SyntaxKind.AbstractKeyword:
            case SyntaxKind.DeclareKeyword:
            case SyntaxKind.ConstKeyword:
            case SyntaxKind.AnyKeyword:
            case SyntaxKind.NumberKeyword:
            case SyntaxKind.BigIntKeyword:
            case SyntaxKind.NeverKeyword:
            case SyntaxKind.ObjectKeyword:
            case SyntaxKind.InKeyword:
            case SyntaxKind.OutKeyword:
            case SyntaxKind.OverrideKeyword:
            case SyntaxKind.StringKeyword:
            case SyntaxKind.BooleanKeyword:
            case SyntaxKind.SymbolKeyword:
            case SyntaxKind.VoidKeyword:
            case SyntaxKind.UnknownKeyword:
            case SyntaxKind.UndefinedKeyword: // `undefined` is an Identifier in the expression case.
                return TransformFlags.ContainsTypeScript;
            case SyntaxKind.SuperKeyword:
                return TransformFlags.ContainsES2015 | TransformFlags.ContainsLexicalSuper;
            case SyntaxKind.StaticKeyword:
                return TransformFlags.ContainsES2015;
            case SyntaxKind.AccessorKeyword:
                return TransformFlags.ContainsClassFields;
            case SyntaxKind.ThisKeyword:
                // 'this' indicates a lexical 'this'
                return TransformFlags.ContainsLexicalThis;
        }
        return TransformFlags.None;
    }
}

export type AstEndOfFileToken = AstNode<EndOfFileToken>;

// dprint-ignore
export class AstEndOfFileTokenData extends AstTokenData {
    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
}

export type AstThisExpression = AstNode<ThisExpression>;

// dprint-ignore
export class AstThisExpressionData extends AstTokenData {
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
}

export type AstSuperExpression = AstNode<SuperExpression>;

// dprint-ignore
export class AstSuperExpressionData extends AstTokenData {
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
}

export type AstImportExpression = AstNode<ImportExpression>;
export type AstNullLiteral = AstNode<NullLiteral>;
export type AstTrueLiteral = AstNode<TrueLiteral>;
export type AstFalseLiteral = AstNode<FalseLiteral>;
export type AstBooleanLiteral = AstNodeOneOf<BooleanLiteral>;

// Punctuation

export type AstPunctuationToken<TKind extends PunctuationSyntaxKind> = AstNode<PunctuationToken<TKind>>;
export type AstDotToken = AstNode<DotToken>;
export type AstDotDotDotToken = AstNode<DotDotDotToken>;
export type AstQuestionToken = AstNode<QuestionToken>;
export type AstExclamationToken = AstNode<ExclamationToken>;
export type AstColonToken = AstNode<ColonToken>;
export type AstEqualsToken = AstNode<EqualsToken>;
export type AstAmpersandAmpersandEqualsToken = AstNode<AmpersandAmpersandEqualsToken>;
export type AstBarBarEqualsToken = AstNode<BarBarEqualsToken>;
export type AstQuestionQuestionEqualsToken = AstNode<QuestionQuestionEqualsToken>;
export type AstAsteriskToken = AstNode<AsteriskToken>;
export type AstEqualsGreaterThanToken = AstNode<EqualsGreaterThanToken>;
export type AstPlusToken = AstNode<PlusToken>;
export type AstMinusToken = AstNode<MinusToken>;
export type AstQuestionDotToken = AstNode<QuestionDotToken>;

// Keywords

export type AstKeywordToken<TKind extends KeywordSyntaxKind> = AstNode<KeywordToken<TKind>>;
export type AstAssertsKeyword = AstNode<AssertsKeyword>;
export type AstAssertKeyword = AstNode<AssertKeyword>;
export type AstAwaitKeyword = AstNode<AwaitKeyword>;
export type AstCaseKeyword = AstNode<CaseKeyword>;

// Modifiers

export type AstModifierToken<TKind extends ModifierSyntaxKind> = AstNode<ModifierToken<TKind>>;
export type AstAbstractKeyword = AstNode<AbstractKeyword>;
export type AstAccessorKeyword = AstNode<AccessorKeyword>;
export type AstAsyncKeyword = AstNode<AsyncKeyword>;
export type AstConstKeyword = AstNode<ConstKeyword>;
export type AstDeclareKeyword = AstNode<DeclareKeyword>;
export type AstDefaultKeyword = AstNode<DefaultKeyword>;
export type AstExportKeyword = AstNode<ExportKeyword>;
export type AstInKeyword = AstNode<InKeyword>;
export type AstPrivateKeyword = AstNode<PrivateKeyword>;
export type AstProtectedKeyword = AstNode<ProtectedKeyword>;
export type AstPublicKeyword = AstNode<PublicKeyword>;
export type AstReadonlyKeyword = AstNode<ReadonlyKeyword>;
export type AstOutKeyword = AstNode<OutKeyword>;
export type AstOverrideKeyword = AstNode<OverrideKeyword>;
export type AstStaticKeyword = AstNode<StaticKeyword>;
export type AstModifier = AstNodeOneOf<Modifier>;
export type AstModifierLike = AstNodeOneOf<ModifierLike>;

export type AstIdentifier = AstNode<Identifier>;

// dprint-ignore
export class AstIdentifierData extends AstTokenData {
    escapedText: __String = undefined!;

    /** @internal */ resolvedSymbol: Symbol = undefined!; // TransientIdentifier
    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(node: AstNode): TransformFlags {
        let transformFlags = TransformFlags.None;
        if (this.escapedText === "await") {
            transformFlags |= TransformFlags.ContainsPossibleTopLevelAwait;
        }
        if (node.flags & NodeFlags.IdentifierHasExtendedUnicodeEscape) {
            transformFlags |= TransformFlags.ContainsES2015;
        }
        return transformFlags;
    }
}

export type AstQualifiedName = AstNode<QualifiedName>;

// dprint-ignore
export class AstQualifiedNameData extends AstData {
    left: AstEntityName = undefined!;
    right: AstIdentifier = undefined!;

    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.left) |
            propagateIdentifierNameFlags(this.right);
    }
}

export type AstEntityName = AstNodeOneOf<EntityName>;
export type AstBindingName = AstNodeOneOf<BindingName>;
export type AstPropertyName = AstNodeOneOf<PropertyName>;
export type AstMemberName = AstNodeOneOf<MemberName>;
export type AstDeclarationName = AstNodeOneOf<DeclarationName>;
export type AstComputedPropertyName = AstNode<ComputedPropertyName>;

// dprint-ignore
export class AstComputedPropertyNameData extends AstData {
    expression: AstExpression = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            TransformFlags.ContainsES2015 |
            TransformFlags.ContainsComputedPropertyName;
    }
}

export type AstPrivateIdentifier = AstNode<PrivateIdentifier>;

// dprint-ignore
export class AstPrivateIdentifierData extends AstTokenData {
    escapedText: __String = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.ContainsClassFields;
    }
}

export type AstTypeParameterDeclaration = AstNode<TypeParameterDeclaration>;

// dprint-ignore
export class AstTypeParameterDeclarationData extends AstTypeScriptNodeData {
    modifiers: AstNodeArray<AstModifier> | undefined = undefined;
    name: AstIdentifier = undefined!;
    constraint: AstTypeNode | undefined = undefined;
    default: AstTypeNode | undefined = undefined;
    expression: AstExpression | undefined = undefined; // For error recovery purposes (see `isGrammarError` in utilities.ts).

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
}

export type AstParameterDeclaration = AstNode<ParameterDeclaration>;

// dprint-ignore
export class AstParameterDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    dotDotDotToken: AstDotDotDotToken | undefined = undefined;  // Present on rest parameter
    // TODO(rbuckton): `name` can be undefined for JSDoc signature parameters
    name: AstBindingName = undefined!;                          // Declared parameter name.
    questionToken: AstQuestionToken | undefined = undefined;    // Present on optional parameter
    type: AstTypeNode | undefined = undefined;                  // Optional type annotation
    initializer: AstExpression | undefined = undefined;         // Optional initializer

    /** @internal */ symbol: Symbol = undefined!;                                // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined;                // initialized by binder (Declaration)
    /** @internal */ jsDoc: JSDocArray | undefined = undefined;                  // initialized by parser (JSDocContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        const name = this.name;
        if (name?.kind === SyntaxKind.Identifier && name.data.escapedText === "this") {
            return TransformFlags.ContainsTypeScript;
        }
        return propagateChildrenFlags(this.modifiers) |
            propagateChildFlags(this.dotDotDotToken) |
            propagateNameFlags(this.name) |
            propagateChildFlags(this.questionToken) |
            propagateChildFlags(this.initializer) |
            (this.questionToken ?? this.type ? TransformFlags.ContainsTypeScript : TransformFlags.None) |
            (this.dotDotDotToken ?? this.initializer ? TransformFlags.ContainsES2015 : TransformFlags.None) |
            (modifiersToFlags(this.modifiers?.items) & ModifierFlags.ParameterPropertyModifier ? TransformFlags.ContainsTypeScriptClassSyntax : TransformFlags.None);
    }
}

export type AstDecorator = AstNode<Decorator>;

// dprint-ignore
export class AstDecoratorData extends AstData {
    expression: AstLeftHandSideExpression = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            TransformFlags.ContainsTypeScript |
            TransformFlags.ContainsTypeScriptClassSyntax |
            TransformFlags.ContainsDecorators;
    }
}

export type AstPropertySignature = AstNode<PropertySignature>;

// dprint-ignore
export class AstPropertySignatureData extends AstTypeScriptNodeData {
    modifiers: AstNodeArray<AstModifier> | undefined = undefined;
    name: AstPropertyName = undefined!;                                     // Declared property name.
    questionToken: AstQuestionToken | undefined = undefined;                // Present on optional property
    type: AstTypeNode | undefined = undefined;                              // Optional type annotation

    /** @internal */ initializer: AstExpression | undefined = undefined;    // initialized by parser (grammar error, see see `isGrammarError` in utilities.ts)
    /** @internal */ symbol: Symbol = undefined!;                           // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined;           // initialized by binder (Declaration)
    /** @internal */ jsDoc: JSDocArray | undefined = undefined;             // initialized by parser (JSDocContainer)
}

export type AstSignatureDeclaration = AstNodeOneOf<SignatureDeclaration>;
export type AstCallSignatureDeclaration = AstNode<CallSignatureDeclaration>;

// dprint-ignore
export class AstCallSignatureDeclarationData extends AstTypeScriptNodeData {
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    parameters: AstNodeArray<AstParameterDeclaration> = undefined!;
    type: AstTypeNode | undefined = undefined;

    /** @internal */ typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined; // quick info
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
    /** @internal */ symbol: Symbol = undefined!;                   // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined;   // initialized by binder (Declaration)
    /** @internal */ jsDoc: JSDocArray | undefined = undefined;     // initialized by parser (JSDocContainer)
}

export type AstConstructSignatureDeclaration = AstNode<ConstructSignatureDeclaration>;

// dprint-ignore
export class AstConstructSignatureDeclarationData extends AstTypeScriptNodeData {
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    parameters: AstNodeArray<AstParameterDeclaration> = undefined!;
    type: AstTypeNode | undefined = undefined;

    /** @internal */ typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined; // quick info
    /** @internal */ jsDoc: JSDocArray | undefined = undefined;     // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!;                   // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined;   // initialized by binder (Declaration)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
}

export type AstVariableDeclaration = AstNode<VariableDeclaration>;

// dprint-ignore
export class AstVariableDeclarationData extends AstData {
    name: AstBindingName = undefined!;                              // Declared variable name
    exclamationToken: AstExclamationToken | undefined = undefined;  // Optional definite assignment assertion
    type: AstTypeNode | undefined = undefined;                      // Optional type annotation
    initializer: AstExpression | undefined = undefined;             // Optional initializer

    /** @internal */ jsDoc: JSDocArray | undefined = undefined;     // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!;                   // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined;   // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateNameFlags(this.name) |
            propagateChildFlags(this.initializer) |
            (this.exclamationToken ?? this.type ? TransformFlags.ContainsTypeScript : TransformFlags.None);
    }
}

export type AstVariableDeclarationList = AstNode<VariableDeclarationList>;

// dprint-ignore
export class AstVariableDeclarationListData extends AstData {
    declarations: AstNodeArray<AstVariableDeclaration> = undefined!;

    /** @internal */ override computeTransformFlags(node: AstNode): TransformFlags {
        let transformFlags = propagateChildrenFlags(this.declarations) |
            TransformFlags.ContainsHoistedDeclarationOrCompletion;
        if (node.flags & NodeFlags.BlockScoped) {
            transformFlags |= TransformFlags.ContainsES2015 |
                TransformFlags.ContainsBlockScopedBinding;
        }
        if (node.flags & NodeFlags.Using) {
            transformFlags |= TransformFlags.ContainsESNext;
        }
        return transformFlags;
    }
}

export type AstBindingElement = AstNode<BindingElement>;

// dprint-ignore
export class AstBindingElementData extends AstData {
    propertyName: AstPropertyName | undefined = undefined;          // Binding property name (in object binding pattern)
    dotDotDotToken: AstDotDotDotToken | undefined = undefined;      // Present on rest element (in object binding pattern)
    name: AstBindingName = undefined!;                              // Declared binding element name
    initializer: AstExpression | undefined = undefined;             // Optional initializer

    /** @internal */ symbol: Symbol = undefined!;                   // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined;   // initialized by binder (Declaration)
    /** @internal */ flowNode: FlowNode | undefined = undefined;    // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.dotDotDotToken) |
            propagateNameFlags(this.propertyName) |
            propagateNameFlags(this.name) |
            propagateChildFlags(this.initializer) |
            (this.dotDotDotToken ? TransformFlags.ContainsRestOrSpread : TransformFlags.None) |
            TransformFlags.ContainsES2015;
    }
}

export type AstPropertyDeclaration = AstNode<PropertyDeclaration>;

// dprint-ignore
export class AstPropertyDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    name: AstPropertyName = undefined!;
    questionToken: AstQuestionToken | undefined = undefined;        // Optional field. indicates grammar error for auto-accessor generation (see `isGrammarError` in utilities.ts)
    exclamationToken: AstExclamationToken | undefined = undefined;
    type: AstTypeNode | undefined = undefined;                      // Optional type annotation
    initializer: AstExpression | undefined = undefined;             // Optional initializer

    /** @internal */ jsDoc: JSDocArray | undefined = undefined;                      // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!;                                    // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined;                    // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(node: AstNode): TransformFlags {
        const modifierFlags = modifiersToFlags(this.modifiers?.items);
        const isAmbient = node.flags & NodeFlags.Ambient || modifierFlags & ModifierFlags.Ambient;

        return propagateChildrenFlags(this.modifiers) |
            propagateNameFlags(this.name) |
            propagateChildFlags(this.initializer) |
            (isAmbient || this.questionToken || this.exclamationToken || this.type ? TransformFlags.ContainsTypeScript : TransformFlags.None) |
            (this.name.kind === SyntaxKind.ComputedPropertyName || modifierFlags & ModifierFlags.Static && this.initializer ? TransformFlags.ContainsTypeScriptClassSyntax : TransformFlags.None) |
            TransformFlags.ContainsClassFields;
    }
}

export type AstPropertyAssignment = AstNode<PropertyAssignment>;

// dprint-ignore
export class AstPropertyAssignmentData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;   // initialized by parser (grammar error)
    name: AstPropertyName = undefined!;
    questionToken: AstQuestionToken | undefined = undefined;            // initialized by parser (grammar error)
    exclamationToken: AstExclamationToken | undefined = undefined;      // initialized by parser (grammar error)
    initializer: AstExpression = undefined!;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined;         // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!;                       // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined;       // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateNameFlags(this.name) |
            propagateChildFlags(this.initializer);
    }
}

export type AstShorthandPropertyAssignment = AstNode<ShorthandPropertyAssignment>;

// dprint-ignore
export class AstShorthandPropertyAssignmentData extends AstData {
    name: AstIdentifier = undefined!;
    // used when ObjectLiteralExpression is used in ObjectAssignmentPattern
    // it is a grammar error to appear in actual object initializer (see `isGrammarError` in utilities.ts):
    equalsToken: AstEqualsToken | undefined = undefined;                    // initialized by parser (grammar error)
    objectAssignmentInitializer: AstExpression | undefined = undefined;
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;       // initialized by parser (grammar error)
    questionToken: AstQuestionToken | undefined = undefined;                // initialized by parser (grammar error)
    exclamationToken: AstExclamationToken | undefined = undefined;          // initialized by parser (grammar error)

    /** @internal */ jsDoc: JSDocArray | undefined = undefined;             // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!;                           // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined;           // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateIdentifierNameFlags(this.name) |
            propagateChildFlags(this.objectAssignmentInitializer) |
            TransformFlags.ContainsES2015;
    }
}

export type AstSpreadAssignment = AstNode<SpreadAssignment>;

// dprint-ignore
export class AstSpreadAssignmentData extends AstData {
    expression: AstExpression = undefined!;

    /** @internal */ symbol: Symbol = undefined!;                   // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined;   // initialized by binder (Declaration)
    /** @internal */ jsDoc: JSDocArray | undefined = undefined;     // initialized by parser (JSDocContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            TransformFlags.ContainsES2018 |
            TransformFlags.ContainsObjectRestOrSpread;
    }
}

export type AstBindingPattern = AstNodeOneOf<BindingPattern>;
export type AstObjectBindingPattern = AstNode<ObjectBindingPattern>;

// dprint-ignore
export class AstObjectBindingPatternData extends AstData {
    elements: AstNodeArray<AstBindingElement> = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildrenFlags(this.elements) |
            TransformFlags.ContainsES2015 |
            TransformFlags.ContainsBindingPattern;
        if (transformFlags & TransformFlags.ContainsRestOrSpread) {
            transformFlags |= TransformFlags.ContainsES2018 | TransformFlags.ContainsObjectRestOrSpread;
        }
        return transformFlags;
    }
}

export type AstArrayBindingElement = AstNodeOneOf<ArrayBindingElement>;
export type AstArrayBindingPattern = AstNode<ArrayBindingPattern>;

// dprint-ignore
export class AstArrayBindingPatternData extends AstData {
    elements: AstNodeArray<AstArrayBindingElement> = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildrenFlags(this.elements) |
            TransformFlags.ContainsES2015 |
            TransformFlags.ContainsBindingPattern;
    }
}

export type AstFunctionDeclaration = AstNode<FunctionDeclaration>;

// dprint-ignore
export class AstFunctionDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    asteriskToken: AstAsteriskToken | undefined = undefined;
    name: AstIdentifier | undefined = undefined;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    parameters: AstNodeArray<AstParameterDeclaration> = undefined!;
    type: AstTypeNode | undefined = undefined;
    body: AstFunctionBody | undefined = undefined;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined;             // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!;                           // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined;           // initialized by binder (Declaration)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
    /** @internal */ endFlowNode: FlowNode | undefined = undefined;         // initialized by checker (FlowContainer)
    /** @internal */ returnFlowNode: FlowNode | undefined = undefined;      // initialized by checker (FlowContainer)
    /** @internal */ typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined; // Used for quick info, replaces typeParameters for instantiated signatures

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        if (!this.body || modifiersToFlags(this.modifiers?.items) & ModifierFlags.Ambient) {
            return TransformFlags.ContainsTypeScript;
        }
        else {
            const isAsync = modifiersToFlags(this.modifiers?.items) & ModifierFlags.Async;
            const isGenerator = !!this.asteriskToken;
            const isAsyncGenerator = isAsync && isGenerator;

            return propagateChildrenFlags(this.modifiers) |
                propagateChildFlags(this.asteriskToken) |
                propagateNameFlags(this.name) |
                propagateChildrenFlags(this.typeParameters) |
                propagateChildrenFlags(this.parameters) |
                propagateChildFlags(this.type) |
                (propagateChildFlags(this.body) & ~TransformFlags.ContainsPossibleTopLevelAwait) |
                (isAsyncGenerator ? TransformFlags.ContainsES2018 :
                    isAsync ? TransformFlags.ContainsES2017 :
                    isGenerator ? TransformFlags.ContainsGenerator :
                    TransformFlags.None) |
                (this.typeParameters || this.type ? TransformFlags.ContainsTypeScript : TransformFlags.None) |
                TransformFlags.ContainsHoistedDeclarationOrCompletion;
        }
    }
}

// dprint-ignore
export class AstMethodSignatureData extends AstTypeScriptNodeData {
    modifiers: AstNodeArray<AstModifier> | undefined = undefined;
    name: AstPropertyName = undefined!;
    questionToken: AstQuestionToken | undefined = undefined;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    parameters: AstNodeArray<AstParameterDeclaration> = undefined!;
    type: AstTypeNode | undefined = undefined;

    /** @internal */ typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined; // quick info
    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
}

// dprint-ignore
export class AstMethodDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    asteriskToken: AstAsteriskToken | undefined = undefined;
    name: AstPropertyName = undefined!;
    questionToken: AstQuestionToken | undefined = undefined;
    exclamationToken: AstExclamationToken | undefined = undefined; // initialized by parser (grammar error)
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    parameters: AstNodeArray<AstParameterDeclaration> = undefined!;
    type: AstTypeNode | undefined = undefined;
    body: AstFunctionBody | undefined = undefined;

    /** @internal */ typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined;
    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    /** @internal */ endFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    /** @internal */ returnFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        if (!this.body) {
            return TransformFlags.ContainsTypeScript;
        }
        else {
            const isAsync = modifiersToFlags(this.modifiers?.items) & ModifierFlags.Async;
            const isGenerator = !!this.asteriskToken;
            const isAsyncGenerator = isAsync && isGenerator;

            return propagateChildrenFlags(this.modifiers) |
                propagateChildFlags(this.asteriskToken) |
                propagateNameFlags(this.name) |
                propagateChildFlags(this.questionToken) |
                propagateChildrenFlags(this.typeParameters) |
                propagateChildrenFlags(this.parameters) |
                propagateChildFlags(this.type) |
                (propagateChildFlags(this.body) & ~TransformFlags.ContainsPossibleTopLevelAwait) |
                (isAsyncGenerator ? TransformFlags.ContainsES2018 :
                    isAsync ? TransformFlags.ContainsES2017 :
                    isGenerator ? TransformFlags.ContainsGenerator :
                    TransformFlags.None) |
                (this.questionToken || this.typeParameters || this.type ? TransformFlags.ContainsTypeScript : TransformFlags.None) |
                TransformFlags.ContainsES2015;
        }
    }
}

// dprint-ignore
export class AstConstructorDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    body: AstFunctionBody | undefined = undefined;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined; // initialized by parser (grammar error)
    parameters: AstNodeArray<AstParameterDeclaration> = undefined!;
    type: AstTypeNode | undefined = undefined; // initialized by parser (grammar error)

    /** @internal */ typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined; // quick info
    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
    /** @internal */ endFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    /** @internal */ returnFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        if (!this.body) {
            return TransformFlags.ContainsTypeScript;
        }
        else {
            return propagateChildrenFlags(this.modifiers) |
                propagateChildrenFlags(this.parameters) |
                (propagateChildFlags(this.body) & ~TransformFlags.ContainsPossibleTopLevelAwait) |
                TransformFlags.ContainsES2015;
        }
    }
}

// dprint-ignore
export class AstSemicolonClassElementData extends AstData {
    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.None;
    }
}

// dprint-ignore
export class AstGetAccessorDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    name: AstPropertyName = undefined!;
    body: AstFunctionBody | undefined = undefined;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined; // initialized by parser (grammar error)
    parameters: AstNodeArray<AstParameterDeclaration> = undefined!;
    type: AstTypeNode | undefined = undefined;

    /** @internal */ typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined; // quick info
    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    /** @internal */ endFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    /** @internal */ returnFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        if (!this.body) {
            return TransformFlags.ContainsTypeScript;
        }
        else {
            return propagateChildrenFlags(this.modifiers) |
                propagateNameFlags(this.name) |
                propagateChildrenFlags(this.parameters) |
                propagateChildFlags(this.type) |
                (propagateChildFlags(this.body) & ~TransformFlags.ContainsPossibleTopLevelAwait) |
                (this.type ? TransformFlags.ContainsTypeScript : TransformFlags.None);
        }
    }
}

// dprint-ignore
export class AstSetAccessorDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    name: AstPropertyName = undefined!;
    body: AstFunctionBody | undefined = undefined;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined; // initialized by parser (grammar error)
    parameters: AstNodeArray<AstParameterDeclaration> = undefined!;
    type: AstTypeNode | undefined = undefined; // initialized by parser (grammar error)

    /** @internal */ typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined; // quick info
    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    /** @internal */ endFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    /** @internal */ returnFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        if (!this.body) {
            return TransformFlags.ContainsTypeScript;
        }
        else {
            return propagateChildrenFlags(this.modifiers) |
                propagateNameFlags(this.name) |
                propagateChildrenFlags(this.parameters) |
                (propagateChildFlags(this.body) & ~TransformFlags.ContainsPossibleTopLevelAwait) |
                (this.type ? TransformFlags.ContainsTypeScript : TransformFlags.None);
        }
    }
}

export type AstAccessorDeclaration = AstNodeOneOf<AccessorDeclaration>;

// dprint-ignore
export class AstIndexSignatureDeclarationData extends AstTypeScriptNodeData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    parameters: AstNodeArray<AstParameterDeclaration> = undefined!;
    type: AstTypeNode | undefined = undefined;

    /** @internal */ typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined; // quick info
    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
}

// dprint-ignore
export class AstClassStaticBlockDeclarationData extends AstData {
    body: AstBlock = undefined!;
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined; // initialized by parser (grammar error)

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
    /** @internal */ endFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    /** @internal */ returnFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.body) | TransformFlags.ContainsClassFields;
    }
}

/**
 * @deprecated
 */
export type AstImportTypeAssertionContainer = AstNode<ImportTypeAssertionContainer>;

/**
 * @deprecated
 */
export class AstImportTypeAssertionContainerData extends AstTypeScriptNodeData {
    assertClause: AstImportAttributes = undefined!;
    multiLine: boolean = false;
}

// dprint-ignore
export class AstImportTypeNodeData extends AstTypeScriptNodeData {
    isTypeOf: boolean = false;
    argument: AstTypeNode = undefined!;
    assertions: AstImportTypeAssertionContainer | undefined = undefined;
    attributes: AstImportAttributes | undefined = undefined;
    qualifier: AstEntityName | undefined = undefined;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined;
}

export type AstKeywordTypeNode<TKind extends KeywordTypeSyntaxKind = KeywordTypeSyntaxKind> = AstNode<KeywordTypeNode<TKind>>;

// dprint-ignore
export class AstThisTypeNodeData extends AstTypeScriptNodeData {
}

export type AstFunctionOrConstructorTypeNode = AstNodeOneOf<FunctionOrConstructorTypeNode>;

// dprint-ignore
export class AstFunctionTypeNodeData extends AstTypeScriptNodeData {
    modifiers: AstNodeArray<AstModifier> | undefined = undefined; // initialized by parser (grammar error)
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    parameters: AstNodeArray<AstParameterDeclaration> = undefined!;
    type: AstTypeNode = undefined!;

    /** @internal */ typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined; // quick info
    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
}

// dprint-ignore
export class AstConstructorTypeNodeData extends AstTypeScriptNodeData {
    modifiers: AstNodeArray<AstModifier> | undefined = undefined;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    parameters: AstNodeArray<AstParameterDeclaration> = undefined!;
    type: AstTypeNode = undefined!;

    /** @internal */ typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined; // quick info
    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
}

// dprint-ignore
export class AstTypeReferenceNodeData extends AstTypeScriptNodeData {
    typeName: AstEntityName = undefined!;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined;
}

// dprint-ignore
export class AstTypePredicateNodeData extends AstTypeScriptNodeData {
    assertsModifier: AstAssertsKeyword | undefined = undefined;
    parameterName: AstIdentifier | AstThisTypeNode = undefined!;
    type: AstTypeNode | undefined = undefined;
}

// dprint-ignore
export class AstTypeQueryNodeData extends AstTypeScriptNodeData {
    exprName: AstEntityName = undefined!;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined;
}

// dprint-ignore
export class AstTypeLiteralNodeData extends AstTypeScriptNodeData {
    members: AstNodeArray<AstTypeElement> = undefined!;

    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
}

// dprint-ignore
export class AstArrayTypeNodeData extends AstTypeScriptNodeData {
    elementType: AstTypeNode = undefined!;
}

// dprint-ignore
export class AstTupleTypeNodeData extends AstTypeScriptNodeData {
    elements: AstNodeArray<AstTypeNode | AstNamedTupleMember> = undefined!;
}

// dprint-ignore
export class AstNamedTupleMemberData extends AstTypeScriptNodeData {
    dotDotDotToken: AstDotDotDotToken | undefined = undefined;
    name: AstIdentifier = undefined!;
    questionToken: AstQuestionToken | undefined = undefined;
    type: AstTypeNode = undefined!;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
}

// dprint-ignore
export class AstOptionalTypeNodeData extends AstTypeScriptNodeData {
    type: AstTypeNode = undefined!;
}

// dprint-ignore
export class AstRestTypeNodeData extends AstTypeScriptNodeData {
    type: AstTypeNode = undefined!;
}

export type AstUnionOrIntersectionTypeNode = AstNodeOneOf<UnionOrIntersectionTypeNode>;

// dprint-ignore
export class AstUnionTypeNodeData extends AstTypeScriptNodeData {
    types: AstNodeArray<AstTypeNode> = undefined!;
}

// dprint-ignore
export class AstIntersectionTypeNodeData extends AstTypeScriptNodeData {
    types: AstNodeArray<AstTypeNode> = undefined!;
}

// dprint-ignore
export class AstConditionalTypeNodeData extends AstTypeScriptNodeData {
    checkType: AstTypeNode = undefined!;
    extendsType: AstTypeNode = undefined!;
    trueType: AstTypeNode = undefined!;
    falseType: AstTypeNode = undefined!;

    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
}

// dprint-ignore
export class AstInferTypeNodeData extends AstTypeScriptNodeData {
    typeParameter: AstTypeParameterDeclaration = undefined!;
}

// dprint-ignore
export class AstParenthesizedTypeNodeData extends AstTypeScriptNodeData {
    type: AstTypeNode = undefined!;
}

// dprint-ignore
export class AstTypeOperatorNodeData extends AstTypeScriptNodeData {
    operator: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword = undefined!;
    type: AstTypeNode = undefined!;
}

// dprint-ignore
export class AstIndexedAccessTypeNodeData extends AstTypeScriptNodeData {
    objectType: AstTypeNode = undefined!;
    indexType: AstTypeNode = undefined!;
}

// dprint-ignore
export class AstMappedTypeNodeData extends AstTypeScriptNodeData {
    readonlyToken: AstReadonlyKeyword | AstPlusToken | AstMinusToken | undefined = undefined;
    typeParameter: AstTypeParameterDeclaration = undefined!;
    nameType: AstTypeNode | undefined = undefined;
    questionToken: AstQuestionToken | AstPlusToken | AstMinusToken | undefined = undefined;
    type: AstTypeNode | undefined = undefined;
    members: AstNodeArray<AstTypeElement> | undefined = undefined;

    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
}

// dprint-ignore
export class AstLiteralTypeNodeData extends AstTypeScriptNodeData {
    literal: AstNullLiteral | AstBooleanLiteral | AstLiteralExpression | AstPrefixUnaryExpression = undefined!;
}

export type AstPropertyNameLiteral = AstNodeOneOf<PropertyNameLiteral>;

// dprint-ignore
export class AstTemplateLiteralTypeNodeData extends AstTypeScriptNodeData {
    head: AstTemplateHead = undefined!;
    templateSpans: AstNodeArray<AstTemplateLiteralTypeSpan> = undefined!;
}

// dprint-ignore
export class AstTemplateLiteralTypeSpanData extends AstTypeScriptNodeData {
    type: AstTypeNode = undefined!;
    literal: AstTemplateMiddle | AstTemplateTail = undefined!;
}

// dprint-ignore
export class AstOmittedExpressionData extends AstData {
    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.None;
    }
}

// dprint-ignore
export class AstPrefixUnaryExpressionData extends AstData {
    operator: PrefixUnaryOperator = undefined!;
    operand: AstUnaryExpression = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildFlags(this.operand);
        // Only set this flag for non-generated identifiers and non-"local" names. See the
        // comment in `visitPreOrPostfixUnaryExpression` in module.ts
        if (
            (this.operator === SyntaxKind.PlusPlusToken || this.operator === SyntaxKind.MinusMinusToken) &&
            this.operand.kind === SyntaxKind.Identifier &&
            (!this.operand.emitNode ||
                !this.operand.emitNode.autoGenerate &&
                    !(this.operand.emitNode.flags & EmitFlags.LocalName))
        ) {
            transformFlags |= TransformFlags.ContainsUpdateExpressionForIdentifier;
        }
        return transformFlags;
    }
}

// dprint-ignore
export class AstPostfixUnaryExpressionData extends AstData {
    operand: AstLeftHandSideExpression = undefined!;
    operator: PostfixUnaryOperator = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildFlags(this.operand);
        // Only set this flag for non-generated identifiers and non-"local" names. See the
        // comment in `visitPreOrPostfixUnaryExpression` in module.ts
        if (
            this.operand.kind === SyntaxKind.Identifier &&
            (!this.operand.emitNode ||
                !this.operand.emitNode.autoGenerate &&
                    !(this.operand.emitNode.flags & EmitFlags.LocalName))
        ) {
            transformFlags |= TransformFlags.ContainsUpdateExpressionForIdentifier;
        }
        return transformFlags;
    }
}

// dprint-ignore
export class AstDeleteExpressionData extends AstData {
    expression: AstUnaryExpression = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression);
    }
}

// dprint-ignore
export class AstTypeOfExpressionData extends AstData {
    expression: AstUnaryExpression = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression);
    }
}

// dprint-ignore
export class AstVoidExpressionData extends AstData {
    expression: AstUnaryExpression = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression);
    }
}

// dprint-ignore
export class AstAwaitExpressionData extends AstData {
    expression: AstUnaryExpression = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            TransformFlags.ContainsES2017 |
            TransformFlags.ContainsES2018 |
            TransformFlags.ContainsAwait;
    }
}

// dprint-ignore
export class AstYieldExpressionData extends AstData {
    asteriskToken: AstAsteriskToken | undefined = undefined;
    expression: AstExpression | undefined = undefined;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            propagateChildFlags(this.asteriskToken) |
            TransformFlags.ContainsES2015 |
            TransformFlags.ContainsES2018 |
            TransformFlags.ContainsYield;
    }
}

export type AstBinaryOperatorToken = AstNode<BinaryOperatorToken>;

// dprint-ignore
export class AstBinaryExpressionData extends AstData {
    left: AstExpression = undefined!;
    operatorToken: AstBinaryOperatorToken = undefined!;
    right: AstExpression = undefined!;

    /** @internal */ cachedLiteralKind: SyntaxKind | undefined = undefined;
    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        const operatorKind = this.operatorToken.kind;
        let transformFlags = propagateChildFlags(this.left) |
            propagateChildFlags(this.operatorToken) |
            propagateChildFlags(this.right);
        if (operatorKind === SyntaxKind.QuestionQuestionToken) {
            transformFlags |= TransformFlags.ContainsES2020;
        }
        else if (operatorKind === SyntaxKind.EqualsToken) {
            if (this.left.kind === SyntaxKind.ObjectLiteralExpression) {
                transformFlags |= TransformFlags.ContainsES2015 |
                    TransformFlags.ContainsES2018 |
                    TransformFlags.ContainsDestructuringAssignment |
                    propagateAssignmentPatternFlags(this.left as AstObjectLiteralExpression);
            }
            else if (this.left.kind === SyntaxKind.ArrayLiteralExpression) {
                transformFlags |= TransformFlags.ContainsES2015 |
                    TransformFlags.ContainsDestructuringAssignment |
                    propagateAssignmentPatternFlags(this.left as AstArrayLiteralExpression);
            }
        }
        else if (operatorKind === SyntaxKind.AsteriskAsteriskToken || operatorKind === SyntaxKind.AsteriskAsteriskEqualsToken) {
            transformFlags |= TransformFlags.ContainsES2016;
        }
        else if (isLogicalOrCoalescingAssignmentOperator(operatorKind)) {
            transformFlags |= TransformFlags.ContainsES2021;
        }
        if (operatorKind === SyntaxKind.InKeyword && this.left.kind === SyntaxKind.PrivateIdentifier) {
            transformFlags |= TransformFlags.ContainsPrivateIdentifierInExpression;
        }
        return transformFlags;
    }
}

export type AstDestructuringAssignment = AstNodeOneOf<DestructuringAssignment>;

// dprint-ignore
export class AstConditionalExpressionData extends AstData {
    condition: AstExpression = undefined!;
    questionToken: AstQuestionToken = undefined!;
    whenTrue: AstExpression = undefined!;
    colonToken: AstColonToken = undefined!;
    whenFalse: AstExpression = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.condition) |
            propagateChildFlags(this.questionToken) |
            propagateChildFlags(this.whenTrue) |
            propagateChildFlags(this.colonToken) |
            propagateChildFlags(this.whenFalse);
    }
}

export type AstFunctionBody = AstNodeOneOf<FunctionBody>;
export type AstConciseBody = AstNodeOneOf<ConciseBody>;

// dprint-ignore
export class AstFunctionExpressionData extends AstData {
    modifiers: AstNodeArray<AstModifier> | undefined = undefined;
    asteriskToken: AstAsteriskToken | undefined = undefined;
    name: AstIdentifier | undefined = undefined;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    parameters: AstNodeArray<AstParameterDeclaration> = undefined!;
    type: AstTypeNode | undefined = undefined;
    body: AstFunctionBody = undefined!; // Required, whereas the member inherited from FunctionDeclaration is optional

    /** @internal */ typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined; // Used for quick info, replaces typeParameters for instantiated signatures
    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    /** @internal */ endFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    /** @internal */ returnFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        const isAsync = modifiersToFlags(this.modifiers?.items) & ModifierFlags.Async;
        const isGenerator = !!this.asteriskToken;
        const isAsyncGenerator = isAsync && isGenerator;
        return propagateChildrenFlags(this.modifiers) |
            propagateChildFlags(this.asteriskToken) |
            propagateNameFlags(this.name) |
            propagateChildrenFlags(this.typeParameters) |
            propagateChildrenFlags(this.parameters) |
            propagateChildFlags(this.type) |
            (propagateChildFlags(this.body) & ~TransformFlags.ContainsPossibleTopLevelAwait) |
            (isAsyncGenerator ? TransformFlags.ContainsES2018 :
                isAsync ? TransformFlags.ContainsES2017 :
                isGenerator ? TransformFlags.ContainsGenerator :
                TransformFlags.None) |
            (this.typeParameters || this.type ? TransformFlags.ContainsTypeScript : TransformFlags.None) |
            TransformFlags.ContainsHoistedDeclarationOrCompletion;
    }
}

// dprint-ignore
export class AstArrowFunctionData extends AstData {
    modifiers: AstNodeArray<AstModifier> | undefined = undefined;
    equalsGreaterThanToken: AstEqualsGreaterThanToken = undefined!;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    parameters: AstNodeArray<AstParameterDeclaration> = undefined!;
    type: AstTypeNode | undefined = undefined;
    body: AstConciseBody = undefined!;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    /** @internal */ endFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    /** @internal */ returnFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        const isAsync = modifiersToFlags(this.modifiers?.items) & ModifierFlags.Async;
        return propagateChildrenFlags(this.modifiers) |
            propagateChildrenFlags(this.typeParameters) |
            propagateChildrenFlags(this.parameters) |
            propagateChildFlags(this.type) |
            propagateChildFlags(this.equalsGreaterThanToken) |
            (propagateChildFlags(this.body) & ~TransformFlags.ContainsPossibleTopLevelAwait) |
            (this.typeParameters || this.type ? TransformFlags.ContainsTypeScript : TransformFlags.None) |
            (isAsync ? TransformFlags.ContainsES2017 | TransformFlags.ContainsLexicalThis : TransformFlags.None) |
            TransformFlags.ContainsES2015;
    }
}

// dprint-ignore
export class AstRegularExpressionLiteralData extends AstTokenData {
    text: string = "";
    isUnterminated: boolean | undefined = undefined;
    hasExtendedUnicodeEscape: boolean | undefined = undefined;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.None;
    }
}

// dprint-ignore
export class AstStringLiteralData extends AstTokenData {
    text: string = "";
    singleQuote: boolean | undefined = undefined;
    isUnterminated: boolean = false;
    hasExtendedUnicodeEscape: boolean = false;

    /** @internal */ textSourceNode?: AstNode<Identifier | StringLiteralLike | NumericLiteral | PrivateIdentifier | JsxNamespacedName | BigIntLiteral> | undefined;
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return this.hasExtendedUnicodeEscape ? TransformFlags.ContainsES2015 : TransformFlags.None;
    }
}

// dprint-ignore
export class AstNoSubstitutionTemplateLiteralData extends AstTokenData {
    text: string = "";
    rawText: string | undefined = undefined;
    isUnterminated: boolean | undefined = undefined;
    hasExtendedUnicodeEscape: boolean | undefined = undefined;

    /** @internal */ templateFlags: TokenFlags = TokenFlags.None;
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return getTransformFlagsOfTemplateLiteralLike(this.templateFlags);
    }
}

export type AstPseudoLiteralToken = AstNodeOneOf<PseudoLiteralToken>;
export type AstTemplateLiteralToken = AstNodeOneOf<TemplateLiteralToken>;
export type AstStringLiteralLike = AstNodeOneOf<StringLiteralLike>;

// dprint-ignore
export class AstNumericLiteralData extends AstTokenData {
    text: string = "";

    /** @internal */ numericLiteralFlags: TokenFlags = TokenFlags.None;
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return this.numericLiteralFlags & TokenFlags.BinaryOrOctalSpecifier ? TransformFlags.ContainsES2015 : TransformFlags.None;
    }
}

// dprint-ignore
export class AstBigIntLiteralData extends AstTokenData {
    text: string = "";

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.ContainsES2020;
    }
}

export type AstLiteralToken = AstNodeOneOf<LiteralToken>;

// dprint-ignore
export class AstTemplateHeadData extends AstTokenData {
    text = "";
    isUnterminated: boolean | undefined = undefined;
    hasExtendedUnicodeEscape: boolean | undefined = undefined;
    rawText: string | undefined = undefined;

    /** @internal */ templateFlags: TokenFlags = TokenFlags.None;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return getTransformFlagsOfTemplateLiteralLike(this.templateFlags);
    }
}

// dprint-ignore
export class AstTemplateMiddleData extends AstTokenData {
    text = "";
    isUnterminated: boolean | undefined = undefined;
    hasExtendedUnicodeEscape: boolean | undefined = undefined;
    rawText: string | undefined = undefined;

    /** @internal */ templateFlags: TokenFlags = TokenFlags.None;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return getTransformFlagsOfTemplateLiteralLike(this.templateFlags);
    }
}

// dprint-ignore
export class AstTemplateTailData extends AstTokenData {
    text = "";
    isUnterminated: boolean | undefined = undefined;
    hasExtendedUnicodeEscape: boolean | undefined = undefined;
    rawText: string | undefined = undefined;

    /** @internal */ templateFlags: TokenFlags = TokenFlags.None;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return getTransformFlagsOfTemplateLiteralLike(this.templateFlags);
    }
}

// dprint-ignore
export class AstTemplateExpressionData extends AstData {
    head: AstTemplateHead = undefined!;
    templateSpans: AstNodeArray<AstTemplateSpan> = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.head) |
            propagateChildrenFlags(this.templateSpans) |
            TransformFlags.ContainsES2015;
    }
}

// dprint-ignore
export class AstTemplateSpanData extends AstData {
    expression: AstExpression = undefined!;
    literal: AstTemplateMiddle | AstTemplateTail = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            propagateChildFlags(this.literal) |
            TransformFlags.ContainsES2015;
    }
}

// dprint-ignore
export class AstParenthesizedExpressionData extends AstData {
    expression: AstExpression = undefined!;
    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression);
    }
}

/** @internal */
export type AstJSDocTypeAssertion = AstNode<JSDocTypeAssertion>;

// dprint-ignore
export class AstArrayLiteralExpressionData extends AstData {
    elements: AstNodeArray<AstExpression> = undefined!;

    /** @internal */ multiLine: boolean | undefined = undefined;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildrenFlags(this.elements);
    }
}

// dprint-ignore
export class AstSpreadElementData extends AstData {
    expression: AstExpression = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            TransformFlags.ContainsES2015 |
            TransformFlags.ContainsRestOrSpread;
    }
}

export type AstObjectLiteralElement = AstNode<ObjectLiteralElement>;
export type AstObjectLiteralElementLike = AstNodeOneOf<ObjectLiteralElementLike>;

// dprint-ignore
export class AstObjectLiteralExpressionData extends AstData {
    properties: AstNodeArray<AstObjectLiteralElementLike> = undefined!;

    /** @internal */ multiLine: boolean | undefined = undefined;
    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildrenFlags(this.properties);
    }
}

export type AstPropertyAccessExpression = AstNode<PropertyAccessExpression>;

// dprint-ignore
export class AstPropertyAccessExpressionData extends AstData {
    expression: AstLeftHandSideExpression = undefined!;
    questionDotToken: AstQuestionDotToken | undefined = undefined;
    name: AstMemberName = undefined!;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(node: AstNode): TransformFlags {
        let transformFlags = propagateChildFlags(this.expression) |
            propagateChildFlags(this.questionDotToken) |
            (this.name.kind === SyntaxKind.Identifier ?
                propagateIdentifierNameFlags(this.name as AstIdentifier) :
                propagateChildFlags(this.name) | TransformFlags.ContainsPrivateIdentifierInExpression);
        if (node.flags & NodeFlags.OptionalChain) {
            transformFlags |= TransformFlags.ContainsES2020;
        }
        else if (this.expression.kind === SyntaxKind.SuperKeyword) {
            // super method calls require a lexical 'this'
            // super method calls require 'super' hoisting in ES2017 and ES2018 async functions and async generators
            transformFlags |= TransformFlags.ContainsES2017 |
                TransformFlags.ContainsES2018;
        }
        return transformFlags;
    }
}

export type AstPropertyAccessEntityNameExpression = AstNode<PropertyAccessEntityNameExpression>;
export type AstEntityNameExpression = AstNodeOneOf<EntityNameExpression>;
export type AstPropertyAccessChain = AstNode<PropertyAccessChain>;
/** @internal */
export type AstPropertyAccessChainRoot = AstNode<PropertyAccessChainRoot>;

// dprint-ignore
export class AstElementAccessExpressionData extends AstData {
    expression: AstLeftHandSideExpression = undefined!;
    questionDotToken: AstQuestionDotToken | undefined = undefined;
    argumentExpression: AstExpression = undefined!;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(node: AstNode): TransformFlags {
        let transformFlags = propagateChildFlags(this.expression) |
            propagateChildFlags(this.questionDotToken) |
            propagateChildFlags(this.argumentExpression);
        if (node.flags & NodeFlags.OptionalChain) {
            transformFlags |= TransformFlags.ContainsES2020;
        }
        else if (this.expression.kind === SyntaxKind.SuperKeyword) {
            // super method calls require a lexical 'this'
            // super method calls require 'super' hoisting in ES2017 and ES2018 async functions and async generators
            transformFlags |= TransformFlags.ContainsES2017 |
                TransformFlags.ContainsES2018;
        }
        return transformFlags;
    }
}

export type AstElementAccessChain = AstNode<ElementAccessChain>;
/** @internal */
export type AstElementAccessChainRoot = AstNode<ElementAccessChainRoot>;

// dprint-ignore
export class AstCallExpressionData extends AstData {
    expression: AstLeftHandSideExpression = undefined!;
    questionDotToken: AstQuestionDotToken | undefined = undefined;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined;
    arguments: AstNodeArray<AstExpression> = undefined!;

    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(node: AstNode): TransformFlags {
        let transformFlags = propagateChildFlags(this.expression) |
            propagateChildFlags(this.questionDotToken) |
            propagateChildrenFlags(this.typeArguments) |
            propagateChildrenFlags(this.arguments);
        if (this.typeArguments) {
            transformFlags |= TransformFlags.ContainsTypeScript;
        }
        if (
            (this.expression.kind === SyntaxKind.PropertyAccessExpression ||
                this.expression.kind === SyntaxKind.ElementAccessExpression) &&
            (this.expression as AstNode<PropertyAccessExpression | ElementAccessExpression>).data.expression.kind === SyntaxKind.SuperKeyword
        ) {
            transformFlags |= TransformFlags.ContainsLexicalThis;
        }
        if (node.flags & NodeFlags.OptionalChain) {
            transformFlags |= TransformFlags.ContainsES2020;
        }
        else if (this.expression.kind === SyntaxKind.ImportKeyword) {
            transformFlags |= TransformFlags.ContainsDynamicImport;
        }
        return transformFlags;
    }
}

export type AstCallChain = AstNode<CallChain>;
/** @internal */
export type AstCallChainRoot = AstNode<CallChainRoot>;
/** @internal */
export type AstOptionalChainRoot = AstNodeOneOf<OptionalChainRoot>;

// dprint-ignore
export class AstExpressionWithTypeArgumentsData extends AstData {
    expression: AstLeftHandSideExpression = undefined!;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            propagateChildrenFlags(this.typeArguments) |
            TransformFlags.ContainsES2015;
    }
}

// dprint-ignore
export class AstNewExpressionData extends AstData {
    expression: AstLeftHandSideExpression = undefined!;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined;
    arguments: AstNodeArray<AstExpression> | undefined = undefined;

    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildFlags(this.expression) |
            propagateChildrenFlags(this.typeArguments) |
            propagateChildrenFlags(this.arguments) |
            TransformFlags.ContainsES2020;
        if (this.typeArguments) {
            transformFlags |= TransformFlags.ContainsTypeScript;
        }
        return transformFlags;
    }
}

export type AstTemplateLiteral = AstNodeOneOf<TemplateLiteral>;

// dprint-ignore
export class AstTaggedTemplateExpressionData extends AstData {
    tag: AstLeftHandSideExpression = undefined!;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined;
    template: AstTemplateLiteral = undefined!;
    questionDotToken: AstQuestionDotToken | undefined = undefined;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildFlags(this.tag) |
            propagateChildrenFlags(this.typeArguments) |
            propagateChildFlags(this.template) |
            TransformFlags.ContainsES2015;
        if (this.typeArguments) {
            transformFlags |= TransformFlags.ContainsTypeScript;
        }
        if (hasInvalidEscape(this.template)) {
            transformFlags |= TransformFlags.ContainsES2018;
        }
        return transformFlags;
    }
}

// dprint-ignore
export class AstAsExpressionData extends AstData {
    expression: AstExpression = undefined!;
    type: AstTypeNode = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            propagateChildFlags(this.type) |
            TransformFlags.ContainsTypeScript;
    }
}

// dprint-ignore
export class AstTypeAssertionData extends AstData {
    type: AstTypeNode = undefined!;
    expression: AstUnaryExpression = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            propagateChildFlags(this.type) |
            TransformFlags.ContainsTypeScript;
    }
}

// dprint-ignore
export class AstSatisfiesExpressionData extends AstData {
    expression: AstExpression = undefined!;
    type: AstTypeNode = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            propagateChildFlags(this.type) |
            TransformFlags.ContainsTypeScript;
    }
}

// dprint-ignore
export class AstNonNullExpressionData extends AstData {
    expression: AstExpression = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            TransformFlags.ContainsTypeScript;
    }
}

export type AstNonNullChain = AstNode<NonNullChain>;

// dprint-ignore
export class AstMetaPropertyData extends AstData {
    keywordToken: SyntaxKind.NewKeyword | SyntaxKind.ImportKeyword = undefined!;
    name: AstIdentifier = undefined!;

    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildFlags(this.name);
        switch (this.keywordToken) {
            case SyntaxKind.NewKeyword:
                transformFlags |= TransformFlags.ContainsES2015;
                break;
            case SyntaxKind.ImportKeyword:
                transformFlags |= TransformFlags.ContainsES2020;
                break;
            default:
                return Debug.assertNever(this.keywordToken);
        }
        return transformFlags;
    }
}

// dprint-ignore
export class AstJsxElementData extends AstData {
    openingElement: AstJsxOpeningElement = undefined!;
    children: AstNodeArray<AstJsxChild> = undefined!;
    closingElement: AstJsxClosingElement = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.openingElement) |
            propagateChildrenFlags(this.children) |
            propagateChildFlags(this.closingElement) |
            TransformFlags.ContainsJsx;
    }
}

export type AstJsxOpeningLikeElement = AstNodeOneOf<JsxOpeningLikeElement>;
export type AstJsxAttributeLike = AstNodeOneOf<JsxAttributeLike>;
export type AstJsxAttributeName = AstNodeOneOf<JsxAttributeName>;
export type AstJsxTagNameExpression = AstNodeOneOf<JsxTagNameExpression>;
export type AstJsxTagNamePropertyAccess = AstNode<JsxTagNamePropertyAccess>;

export interface AstJsxTagNamePropertyAccessData extends AstPropertyAccessExpressionData {
    expression: AstIdentifier | AstThisExpression | AstJsxTagNamePropertyAccess;
}

// dprint-ignore
export class AstJsxAttributesData extends AstData {
    properties: AstNodeArray<AstJsxAttributeLike> = undefined!;

    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildrenFlags(this.properties) |
            TransformFlags.ContainsJsx;
    }
}

// dprint-ignore
export class AstJsxNamespacedNameData extends AstData {
    name: AstIdentifier = undefined!;
    namespace: AstIdentifier = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.namespace) |
            propagateChildFlags(this.name) |
            TransformFlags.ContainsJsx;
    }
}

// dprint-ignore
export class AstJsxOpeningElementData extends AstData {
    tagName: AstJsxTagNameExpression = undefined!;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined;
    attributes: AstJsxAttributes = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildFlags(this.tagName) |
            propagateChildrenFlags(this.typeArguments) |
            propagateChildFlags(this.attributes) |
            TransformFlags.ContainsJsx;
        if (this.typeArguments) {
            transformFlags |= TransformFlags.ContainsTypeScript;
        }
        return transformFlags;
    }
}

// dprint-ignore
export class AstJsxClosingElementData extends AstData {
    tagName: AstJsxTagNameExpression = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.tagName) |
            TransformFlags.ContainsJsx;
    }
}

// dprint-ignore
export class AstJsxSelfClosingElementData extends AstData {
    tagName: AstJsxTagNameExpression = undefined!;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined;
    attributes: AstJsxAttributes = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildFlags(this.tagName) |
            propagateChildrenFlags(this.typeArguments) |
            propagateChildFlags(this.attributes) |
            TransformFlags.ContainsJsx;
        if (this.typeArguments) {
            transformFlags |= TransformFlags.ContainsTypeScript;
        }
        return transformFlags;
    }
}

// dprint-ignore
export class AstJsxFragmentData extends AstData {
    openingFragment: AstJsxOpeningFragment = undefined!;
    children: AstNodeArray<AstJsxChild> = undefined!;
    closingFragment: AstJsxClosingFragment = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.openingFragment) |
            propagateChildrenFlags(this.children) |
            propagateChildFlags(this.closingFragment) |
            TransformFlags.ContainsJsx;
    }
}

// dprint-ignore
export class AstJsxOpeningFragmentData extends AstData {
    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.ContainsJsx;
    }
}

// dprint-ignore
export class AstJsxClosingFragmentData extends AstData {
    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.ContainsJsx;
    }
}

// dprint-ignore
export class AstJsxAttributeData extends AstData {
    name: AstJsxAttributeName = undefined!;
    initializer: AstJsxAttributeValue | undefined = undefined;

    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.name) |
            propagateChildFlags(this.initializer) |
            TransformFlags.ContainsJsx;
    }
}

export type AstJsxAttributeValue = AstNodeOneOf<JsxAttributeValue>;

// dprint-ignore
export class AstJsxSpreadAttributeData extends AstData {
    expression: AstExpression = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            TransformFlags.ContainsJsx;
    }
}

// dprint-ignore
export class AstJsxExpressionData extends AstData {
    dotDotDotToken: AstDotDotDotToken | undefined = undefined;
    expression: AstExpression | undefined = undefined;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.dotDotDotToken) |
            propagateChildFlags(this.expression) |
            TransformFlags.ContainsJsx;
    }
}

// dprint-ignore
export class AstJsxTextData extends AstData {
    text = "";
    isUnterminated: boolean | undefined = undefined;
    hasExtendedUnicodeEscape: boolean | undefined = undefined;
    containsOnlyTriviaWhiteSpaces: boolean = false;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.ContainsJsx;
    }
}

export type AstJsxChild = AstNodeOneOf<JsxChild>;
export type AstIterationStatement = AstNodeOneOf<IterationStatement>;

// dprint-ignore
export class AstEmptyStatementData extends AstData {
    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.None;
    }
}

// dprint-ignore
export class AstDebuggerStatementData extends AstData {
    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.None;
    }
}

// dprint-ignore
export class AstMissingDeclarationData extends AstData {
    name: AstIdentifier | undefined = undefined;
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.None;
    }
}

// dprint-ignore
export class AstBlockData extends AstData {
    statements: AstNodeArray<AstStatement> = undefined!;

    /** @internal */ multiLine: boolean | undefined = undefined;
    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildrenFlags(this.statements);
    }
}

// dprint-ignore
export class AstVariableStatementData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    declarationList: AstVariableDeclarationList = undefined!;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildrenFlags(this.modifiers) |
            propagateChildFlags(this.declarationList);
        if (modifiersToFlags(this.modifiers?.items) & ModifierFlags.Ambient) {
            transformFlags = TransformFlags.ContainsTypeScript;
        }
        return transformFlags;
    }
}

// dprint-ignore
export class AstExpressionStatementData extends AstData {
    expression: AstExpression = undefined!;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression);
    }
}

// dprint-ignore
export class AstIfStatementData extends AstData {
    expression: AstExpression = undefined!;
    thenStatement: AstStatement = undefined!;
    elseStatement: AstStatement | undefined = undefined;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            propagateChildFlags(this.thenStatement) |
            propagateChildFlags(this.elseStatement);
    }
}

// dprint-ignore
export class AstDoStatementData extends AstData {
    statement: AstStatement = undefined!;
    expression: AstExpression = undefined!;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.statement) |
            propagateChildFlags(this.expression);
    }
}

// dprint-ignore
export class AstWhileStatementData extends AstData {
    expression: AstExpression = undefined!;
    statement: AstStatement = undefined!;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            propagateChildFlags(this.statement);
    }
}

export type AstForInitializer = AstNodeOneOf<ForInitializer>;

// dprint-ignore
export class AstForStatementData extends AstData {
    initializer: AstForInitializer | undefined = undefined;
    condition: AstExpression | undefined = undefined;
    incrementor: AstExpression | undefined = undefined;
    statement: AstStatement = undefined!;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.initializer) |
            propagateChildFlags(this.condition) |
            propagateChildFlags(this.incrementor) |
            propagateChildFlags(this.statement);
    }
}

export type AstForInOrOfStatement = AstNodeOneOf<ForInOrOfStatement>;

// dprint-ignore
export class AstForInStatementData extends AstData {
    initializer: AstForInitializer = undefined!;
    expression: AstExpression = undefined!;
    statement: AstStatement = undefined!;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.initializer) |
            propagateChildFlags(this.expression) |
            propagateChildFlags(this.statement);
    }
}

// dprint-ignore
export class AstForOfStatementData extends AstData {
    awaitModifier: AstAwaitKeyword | undefined = undefined;
    initializer: AstForInitializer = undefined!;
    expression: AstExpression = undefined!;
    statement: AstStatement = undefined!;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildFlags(this.awaitModifier) |
            propagateChildFlags(this.initializer) |
            propagateChildFlags(this.expression) |
            propagateChildFlags(this.statement) |
            TransformFlags.ContainsES2015;
        if (this.awaitModifier) {
            transformFlags |= TransformFlags.ContainsES2018;
        }
        return transformFlags;
    }
}

// dprint-ignore
export class AstBreakStatementData extends AstData {
    label: AstIdentifier | undefined = undefined;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.label) |
            TransformFlags.ContainsHoistedDeclarationOrCompletion;
    }
}

export type AstBreakOrContinueStatement = AstNodeOneOf<BreakOrContinueStatement>;

// dprint-ignore
export class AstContinueStatementData extends AstData {
    label: AstIdentifier | undefined = undefined;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.label) |
            TransformFlags.ContainsHoistedDeclarationOrCompletion;
    }
}

// dprint-ignore
export class AstReturnStatementData extends AstData {
    expression: AstExpression | undefined = undefined;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        // return in an ES2018 async generator must be awaited
        return propagateChildFlags(this.expression) |
            TransformFlags.ContainsES2018 |
            TransformFlags.ContainsHoistedDeclarationOrCompletion;
    }
}

// dprint-ignore
export class AstWithStatementData extends AstData {
    expression: AstExpression = undefined!;
    statement: AstStatement = undefined!;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            propagateChildFlags(this.statement);
    }
}

// dprint-ignore
export class AstSwitchStatementData extends AstData {
    expression: AstExpression = undefined!;
    caseBlock: AstCaseBlock = undefined!;
    possiblyExhaustive: boolean | undefined = undefined;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            propagateChildFlags(this.caseBlock);
    }
}

// dprint-ignore
export class AstCaseBlockData extends AstData {
    clauses: AstNodeArray<AstCaseOrDefaultClause> = undefined!;

    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildrenFlags(this.clauses);
    }
}

// dprint-ignore
export class AstCaseClauseData extends AstData {
    expression: AstExpression = undefined!;
    statements: AstNodeArray<AstStatement> = undefined!;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ fallthroughFlowNode?: FlowNode | undefined; // initialized by binding

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            propagateChildrenFlags(this.statements);
    }
}

// dprint-ignore
export class AstDefaultClauseData extends AstData {
    statements: AstNodeArray<AstStatement> = undefined!;

    /** @internal */ fallthroughFlowNode?: FlowNode | undefined = undefined; // initialized by binding

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildrenFlags(this.statements);
    }
}

export type AstCaseOrDefaultClause = AstNodeOneOf<CaseOrDefaultClause>;

// dprint-ignore
export class AstLabeledStatementData extends AstData {
    label: AstIdentifier = undefined!;
    statement: AstStatement = undefined!;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.label) |
            propagateChildFlags(this.statement);
    }
}

// dprint-ignore
export class AstThrowStatementData extends AstData {
    expression: AstExpression = undefined!;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression);
    }
}

// dprint-ignore
export class AstTryStatementData extends AstData {
    tryBlock: AstBlock = undefined!;
    catchClause: AstCatchClause | undefined = undefined;
    finallyBlock: AstBlock | undefined = undefined;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.tryBlock) |
            propagateChildFlags(this.catchClause) |
            propagateChildFlags(this.finallyBlock);
    }
}

// dprint-ignore
export class AstCatchClauseData extends AstData {
    variableDeclaration: AstVariableDeclaration | undefined = undefined;
    block: AstBlock = undefined!;

    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.variableDeclaration) |
            propagateChildFlags(this.block) |
            (!this.variableDeclaration ? TransformFlags.ContainsES2019 : TransformFlags.None);
    }
}

export type AstObjectTypeDeclaration = AstNodeOneOf<ObjectTypeDeclaration>;
export type AstDeclarationWithTypeParameterChildren = AstNodeOneOf<DeclarationWithTypeParameterChildren>;
export type AstClassElement = AstNodeOneOf<ClassElement>;
export type AstClassLikeDeclaration = AstNodeOneOf<ClassLikeDeclaration>;

// dprint-ignore
export class AstClassDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    /** May be undefined in `export default class { ... }`. */
    name: AstIdentifier | undefined = undefined;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    heritageClauses: AstNodeArray<AstHeritageClause> | undefined = undefined;
    members: AstNodeArray<AstClassElement> = undefined!;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        if (modifiersToFlags(this.modifiers?.items) & ModifierFlags.Ambient) {
            return TransformFlags.ContainsTypeScript;
        }
        else {
            let transformFlags = propagateChildrenFlags(this.modifiers) |
                propagateNameFlags(this.name) |
                propagateChildrenFlags(this.typeParameters) |
                propagateChildrenFlags(this.heritageClauses) |
                propagateChildrenFlags(this.members) |
                (this.typeParameters ? TransformFlags.ContainsTypeScript : TransformFlags.None) |
                TransformFlags.ContainsES2015;
            if (transformFlags & TransformFlags.ContainsTypeScriptClassSyntax) {
                transformFlags |= TransformFlags.ContainsTypeScript;
            }
            return transformFlags;
        }
    }
}

// dprint-ignore
export class AstClassExpressionData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    name: AstIdentifier | undefined = undefined;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    heritageClauses: AstNodeArray<AstHeritageClause> | undefined = undefined;
    members: AstNodeArray<AstClassElement> = undefined!;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildrenFlags(this.modifiers) |
            propagateNameFlags(this.name) |
            propagateChildrenFlags(this.typeParameters) |
            propagateChildrenFlags(this.heritageClauses) |
            propagateChildrenFlags(this.members) |
            (this.typeParameters ? TransformFlags.ContainsTypeScript : TransformFlags.None) |
            TransformFlags.ContainsES2015;
    }
}

export type AstTypeElement = AstNode<TypeElement>;

// dprint-ignore
export class AstInterfaceDeclarationData extends AstTypeScriptNodeData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    name: AstIdentifier = undefined!;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    heritageClauses: AstNodeArray<AstHeritageClause> | undefined = undefined;
    members: AstNodeArray<AstTypeElement> = undefined!;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
}

// dprint-ignore
export class AstHeritageClauseData extends AstData {
    token: SyntaxKind.ExtendsKeyword | SyntaxKind.ImplementsKeyword = undefined!;
    types: AstNodeArray<AstExpressionWithTypeArguments> = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        switch (this.token) {
            case SyntaxKind.ExtendsKeyword:
                return propagateChildrenFlags(this.types) | TransformFlags.ContainsES2015;
            case SyntaxKind.ImplementsKeyword:
                return propagateChildrenFlags(this.types) | TransformFlags.ContainsTypeScript;
            default:
                return Debug.assertNever(this.token);
        }
    }
}

// dprint-ignore
export class AstTypeAliasDeclarationData extends AstTypeScriptNodeData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    name: AstIdentifier = undefined!;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    type: AstTypeNode = undefined!;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
}

// dprint-ignore
export class AstEnumDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    name: AstIdentifier = undefined!;
    members: AstNodeArray<AstEnumMember> = undefined!;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildrenFlags(this.modifiers) |
            propagateChildFlags(this.name) |
            propagateChildrenFlags(this.members) |
            TransformFlags.ContainsTypeScript;
        transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // Enum declarations cannot contain `await`
        return transformFlags;
    }
}

// dprint-ignore
export class AstEnumMemberData extends AstData {
    name: AstPropertyName = undefined!;
    initializer: AstExpression | undefined = undefined;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.name) |
            propagateChildFlags(this.initializer) |
            TransformFlags.ContainsTypeScript;
    }
}

export type AstModuleName = AstNodeOneOf<ModuleName>;
export type AstModuleBody = AstNodeOneOf<ModuleBody>;

// dprint-ignore
export class AstModuleDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    name: AstModuleName = undefined!;
    body: AstModuleBody | AstJSDocNamespaceDeclaration | undefined = undefined;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        if (modifiersToFlags(this.modifiers?.items) & ModifierFlags.Ambient) {
            return TransformFlags.ContainsTypeScript;
        }
        else {
            let transformFlags = propagateChildrenFlags(this.modifiers) |
                propagateChildFlags(this.name) |
                propagateChildFlags(this.body) |
                TransformFlags.ContainsTypeScript;
            transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // Module declarations cannot contain `await`.
            return transformFlags;
        }
    }
}

export type AstNamespaceBody = AstNodeOneOf<NamespaceBody>;

export type AstNamespaceDeclaration = AstNode<NamespaceDeclaration>;

export interface AstNamespaceDeclarationData extends AstModuleDeclarationData {
    name: AstIdentifier;
    body: AstNamespaceBody;
}

export type AstJSDocNamespaceBody = AstNodeOneOf<JSDocNamespaceBody>;

export type AstJSDocNamespaceDeclaration = AstNode<JSDocNamespaceDeclaration>;

export interface AstJSDocNamespaceDeclarationData extends AstModuleDeclarationData {
    name: AstIdentifier;
    body: AstJSDocNamespaceBody | undefined;
}

// dprint-ignore
export class AstModuleBlockData extends AstData {
    statements: AstNodeArray<AstStatement> = undefined!;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildrenFlags(this.statements);
    }
}

export type AstModuleReference = AstNodeOneOf<ModuleReference>;

// dprint-ignore
export class AstImportEqualsDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    name: AstIdentifier = undefined!;
    isTypeOnly: boolean = undefined!;
    moduleReference: AstModuleReference = undefined!;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildrenFlags(this.modifiers) |
            propagateIdentifierNameFlags(this.name) |
            propagateChildFlags(this.moduleReference);

        if (this.moduleReference.kind !== SyntaxKind.ExternalModuleReference) {
            transformFlags |= TransformFlags.ContainsTypeScript;
        }

        return transformFlags & ~TransformFlags.ContainsPossibleTopLevelAwait; // Import= declaration is always parsed in an Await context
    }
}

// dprint-ignore
export class AstExternalModuleReferenceData extends AstData {
    expression: AstExpression = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        // always parsed in an Await context
        return propagateChildFlags(this.expression) & ~TransformFlags.ContainsPossibleTopLevelAwait;
    }
}

// dprint-ignore
export class AstImportDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    importClause: AstImportClause | undefined = undefined;
    /** If this is not a StringLiteral it will be a grammar error. */
    moduleSpecifier: AstExpression = undefined!;
    attributes: AstImportAttributes | undefined = undefined;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildFlags(this.importClause) |
            propagateChildFlags(this.moduleSpecifier);
        transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return transformFlags;
    }
}

export type AstNamedImportBindings = AstNodeOneOf<NamedImportBindings>;
export type AstNamedExportBindings = AstNodeOneOf<NamedExportBindings>;

// dprint-ignore
export class AstImportClauseData extends AstData {
    isTypeOnly: boolean = false;
    name: AstIdentifier | undefined = undefined; // Default binding
    namedBindings: AstNamedImportBindings | undefined = undefined;

    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildFlags(this.name) |
            propagateChildFlags(this.namedBindings);
        if (this.isTypeOnly) {
            transformFlags |= TransformFlags.ContainsTypeScript;
        }
        transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return transformFlags;
    }
}

export type AstAssertionKey = AstNodeOneOf<AssertionKey>;
/** @deprecated */
export type AstAssertEntry = AstImportAttribute;
export type AstImportAttributeName = AstNodeOneOf<ImportAttributeName>;

// dprint-ignore
export class AstImportAttributeData extends AstData {
    name: AstImportAttributeName = undefined!;
    value: AstExpression = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.ContainsESNext;
    }
}

/** @deprecated */
export type AstAssertClause = AstNode<AssertClause>;

// dprint-ignore
export class AstImportAttributesData extends AstData {
    token: SyntaxKind.WithKeyword | SyntaxKind.AssertKeyword = SyntaxKind.WithKeyword;
    elements: AstNodeArray<AstImportAttribute> = undefined!;
    multiLine: boolean | undefined = undefined;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.ContainsESNext;
    }
}

// dprint-ignore
export class AstNamespaceImportData extends AstData {
    name: AstIdentifier = undefined!;

    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildFlags(this.name);
        transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return transformFlags;
    }
}

// dprint-ignore
export class AstNamespaceExportData extends AstData {
    name: AstModuleExportName = undefined!;

    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildFlags(this.name) |
            TransformFlags.ContainsES2020;
        transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return transformFlags;
    }
}

// dprint-ignore
export class AstNamespaceExportDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined; // initialized by parser (grammar error)
    name: AstIdentifier = undefined!;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateIdentifierNameFlags(this.name) |
            TransformFlags.ContainsTypeScript;
    }
}

// dprint-ignore
export class AstExportDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    isTypeOnly = false;
    exportClause: AstNamedExportBindings | undefined = undefined;
    moduleSpecifier: AstExpression | undefined = undefined;
    attributes: AstImportAttributes | undefined = undefined;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildrenFlags(this.modifiers) |
            propagateChildFlags(this.exportClause) |
            propagateChildFlags(this.moduleSpecifier);
        transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return transformFlags;
    }
}

// dprint-ignore
export class AstNamedImportsData extends AstData {
    elements: AstNodeArray<AstImportSpecifier> = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildrenFlags(this.elements);
        transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return transformFlags;
    }
}

// dprint-ignore
export class AstNamedExportsData extends AstData {
    elements: AstNodeArray<AstExportSpecifier> = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildrenFlags(this.elements);
        transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return transformFlags;
    }
}

// dprint-ignore
export class AstImportSpecifierData extends AstData {
    propertyName: AstModuleExportName | undefined = undefined;
    name: AstIdentifier = undefined!;
    isTypeOnly = false;

    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildFlags(this.propertyName) |
            propagateChildFlags(this.name);
        transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return transformFlags;
    }
}

// dprint-ignore
export class AstExportSpecifierData extends AstData {
    isTypeOnly = false;
    propertyName: AstModuleExportName | undefined = undefined;
    name: AstModuleExportName = undefined!;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildFlags(this.propertyName) |
            propagateChildFlags(this.name);
        transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return transformFlags;
    }
}

export type AstModuleExportName = AstNodeOneOf<ModuleExportName>;

// dprint-ignore
export class AstExportAssignmentData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    isExportEquals: boolean | undefined = undefined;
    expression: AstExpression = undefined!;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildrenFlags(this.modifiers) | propagateChildFlags(this.expression);
        transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return transformFlags;
    }
}

// dprint-ignore
export class AstJSDocTypeExpressionData extends AstData {
    type: AstTypeNode = undefined!;
}

// dprint-ignore
export class AstJSDocNameReferenceData extends AstData {
    name: AstEntityName | AstJSDocMemberName = undefined!;
}

// dprint-ignore
export class AstJSDocMemberNameData extends AstData {
    left: AstEntityName | AstJSDocMemberName = undefined!;
    right: AstIdentifier = undefined!;
}

export type AstJSDocType = AstNodeOneOf<JSDocType>;

// dprint-ignore
export class AstJSDocAllTypeData extends AstData {
}

// dprint-ignore
export class AstJSDocUnknownTypeData extends AstData {
}

// dprint-ignore
export class AstJSDocNonNullableTypeData extends AstData {
    type: AstTypeNode = undefined!;
    postfix = false;
}

// dprint-ignore
export class AstJSDocNullableTypeData extends AstData {
    type: AstTypeNode = undefined!;
    postfix = false;
}

// dprint-ignore
export class AstJSDocOptionalTypeData extends AstData {
    type: AstTypeNode = undefined!;
}

// dprint-ignore
export class AstJSDocFunctionTypeData extends AstData {
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    parameters: AstNodeArray<AstParameterDeclaration> = undefined!;
    type: AstTypeNode | undefined = undefined;

    /** @internal */ typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined; // quick info
    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
}

// dprint-ignore
export class AstJSDocVariadicTypeData extends AstData {
    type: AstTypeNode = undefined!;
}

// dprint-ignore
export class AstJSDocNamepathTypeData extends AstData {
    type: AstTypeNode = undefined!;
}

// dprint-ignore
export class AstJSDocData extends AstData {
    comment: string | AstNodeArray<AstJSDocComment> | undefined = undefined;
    tags: AstNodeArray<AstBaseJSDocTag> | undefined = undefined;
}

export type AstHasJSDoc = AstNodeOneOf<HasJSDoc>;
export type AstJSDocTag = AstNodeOneOf<JSDocTag>;

// dprint-ignore
export class AstJSDocLinkData extends AstData {
    name: AstEntityName | AstJSDocMemberName | undefined = undefined;
    text = "";
}

// dprint-ignore
export class AstJSDocLinkCodeData extends AstData {
    name: AstEntityName | AstJSDocMemberName | undefined = undefined;
    text = "";
}

// dprint-ignore
export class AstJSDocLinkPlainData extends AstData {
    name: AstEntityName | AstJSDocMemberName | undefined = undefined;
    text = "";
}

export type AstJSDocComment = AstNodeOneOf<JSDocComment>;

// dprint-ignore
export class AstJSDocTextData extends AstData {
    text = "";
}

export type AstBaseJSDocTag<TKind extends SyntaxKind = SyntaxKind, T extends AstJSDocTagData = AstJSDocTagData> = AstNode<JSDocTag<TKind, T>>;

// dprint-ignore
export class AstJSDocTagData extends AstData {
    tagName: AstIdentifier = undefined!;
    comment: string | AstNodeArray<AstJSDocComment> | undefined = undefined;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.None;
    }
}

// dprint-ignore
export class AstJSDocUnknownTagData extends AstJSDocTagData {
}

export type AstJSDocClassReference = AstNode<JSDocClassReference>;

export interface AstJSDocClassReferenceData extends AstExpressionWithTypeArgumentsData {
    expression: AstIdentifier | AstPropertyAccessEntityNameExpression;
}

// dprint-ignore
export class AstJSDocAugmentsTagData extends AstJSDocTagData {
    class: AstJSDocClassReference = undefined!;
}

// dprint-ignore
export class AstJSDocImplementsTagData extends AstJSDocTagData {
    class: AstJSDocClassReference = undefined!;
}

// dprint-ignore
export class AstJSDocAuthorTagData extends AstJSDocTagData {
}

// dprint-ignore
export class AstJSDocDeprecatedTagData extends AstJSDocTagData {
}

// dprint-ignore
export class AstJSDocClassTagData extends AstJSDocTagData {
}

// dprint-ignore
export class AstJSDocPublicTagData extends AstJSDocTagData {
}

// dprint-ignore
export class AstJSDocPrivateTagData extends AstJSDocTagData {
}

// dprint-ignore
export class AstJSDocProtectedTagData extends AstJSDocTagData {
}

// dprint-ignore
export class AstJSDocReadonlyTagData extends AstJSDocTagData {
}

// dprint-ignore
export class AstJSDocOverrideTagData extends AstJSDocTagData {
}

// dprint-ignore
export class AstJSDocEnumTagData extends AstJSDocTagData {
    typeExpression: AstJSDocTypeExpression = undefined!;

    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
}

// dprint-ignore
export class AstJSDocThisTagData extends AstJSDocTagData {
    typeExpression: AstJSDocTypeExpression = undefined!;
}

// dprint-ignore
export class AstJSDocTemplateTagData extends AstJSDocTagData {
    constraint: AstJSDocTypeExpression | undefined = undefined;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> = undefined!;
}

// dprint-ignore
export class AstJSDocSeeTagData extends AstJSDocTagData {
    name: AstJSDocNameReference | undefined = undefined;
}

// dprint-ignore
export class AstJSDocReturnTagData extends AstJSDocTagData {
    typeExpression: AstJSDocTypeExpression | undefined = undefined;
}

// dprint-ignore
export class AstJSDocTypeTagData extends AstJSDocTagData {
    typeExpression: AstJSDocTypeExpression = undefined!;
}

// dprint-ignore
export class AstJSDocTypedefTagData extends AstJSDocTagData {
    typeExpression: AstJSDocTypeExpression | AstJSDocTypeLiteral | undefined = undefined;
    fullName: AstJSDocNamespaceDeclaration | AstIdentifier | undefined = undefined;
    name: AstIdentifier | undefined = undefined;

    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
}

// dprint-ignore
export class AstJSDocCallbackTagData extends AstJSDocTagData {
    fullName: AstJSDocNamespaceDeclaration | AstIdentifier | undefined = undefined;
    name: AstIdentifier | undefined = undefined;
    typeExpression: AstJSDocSignature = undefined!;

    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
}

// dprint-ignore
export class AstJSDocOverloadTagData extends AstJSDocTagData {
    typeExpression: AstJSDocSignature = undefined!;
}

// dprint-ignore
export class AstJSDocThrowsTagData extends AstJSDocTagData {
    typeExpression: AstJSDocTypeExpression | undefined = undefined;
}

// dprint-ignore
export class AstJSDocSignatureData extends AstData {
    typeParameters: AstNodeArray<AstJSDocTemplateTag> | undefined = undefined;
    parameters: AstNodeArray<AstJSDocParameterTag> = undefined!;
    type: AstJSDocReturnTag | undefined = undefined;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
}

// dprint-ignore
export class AstJSDocPropertyTagData extends AstJSDocTagData {
    typeExpression: AstJSDocTypeExpression | undefined = undefined;
    name: AstEntityName = undefined!;
    /** Whether the property name came before the type -- non-standard for JSDoc, but Typescript-like */
    isNameFirst = false;
    isBracketed = false;

    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
}

// dprint-ignore
export class AstJSDocParameterTagData extends AstJSDocTagData {
    typeExpression: AstJSDocTypeExpression | undefined = undefined;
    name: AstEntityName = undefined!;
    /** Whether the property name came before the type -- non-standard for JSDoc, but Typescript-like */
    isNameFirst = false;
    isBracketed = false;

    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
}

export type AstJSDocPropertyLikeTag = AstNodeOneOf<JSDocPropertyLikeTag>;

// dprint-ignore
export class AstJSDocTypeLiteralData extends AstData {
    jsDocPropertyTags: AstNodeArray<AstJSDocPropertyLikeTag> | undefined = undefined;
    /** If true, then this type literal represents an *array* of its type. */
    isArrayType = false;

    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
}

// dprint-ignore
export class AstJSDocSatisfiesTagData extends AstJSDocTagData {
    typeExpression: AstJSDocTypeExpression = undefined!;
}

// dprint-ignore
export class AstJSDocImportTagData extends AstJSDocTagData {
    importClause: AstImportClause | undefined = undefined;
    moduleSpecifier: AstExpression = undefined!;
    attributes: AstImportAttributes | undefined = undefined;
}

// dprint-ignore
export class AstSyntheticExpressionData extends AstData {
    isSpread = false;
    type: Type = undefined!;
    tupleNameSource: AstParameterDeclaration | AstNamedTupleMember | undefined = undefined;
}

// dprint-ignore
export class AstBundleData extends AstData {
    sourceFiles: readonly SourceFile[] = undefined!;
    /** @internal */ syntheticFileReferences?: readonly FileReference[];
    /** @internal */ syntheticTypeReferences?: readonly FileReference[];
    /** @internal */ syntheticLibReferences?: readonly FileReference[];
    /** @internal */ hasNoDefaultLib?: boolean;
}

// dprint-ignore
export class AstSyntaxListData extends AstData {
    /** @internal */ _children!: readonly Node[];
}

// dprint-ignore
export class AstNotEmittedStatementData extends AstData {
    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
}

// dprint-ignore
export class AstNotEmittedTypeElementData extends AstData {
    /** @internal */ symbol: Symbol = undefined!;
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
}

// dprint-ignore
export class AstPartiallyEmittedExpressionData extends AstData {
    expression: AstExpression = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression);
    }
}

// dprint-ignore
export class AstCommaListExpressionData extends AstData {
    elements: AstNodeArray<AstExpression> = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildrenFlags(this.elements);
    }
}

/** @internal */
// dprint-ignore
export class AstSyntheticReferenceExpressionData extends AstData {
    expression: AstExpression = undefined!;
    thisArg: AstExpression = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            propagateChildFlags(this.thisArg);
    }
}

// dprint-ignore
export class AstDeclarationData {
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
}

// dprint-ignore
export class AstSourceFileData extends AstData {
    declaration: AstDeclarationData = new AstDeclarationData();
    statements: AstNodeArray<AstStatement> = undefined!;
    endOfFileToken: AstEndOfFileToken = undefined!;
    text = "";
    fileName = "";
    /** @internal */ path = "" as Path;
    /**
     * Resolved path can be different from path property,
     * when file is included through project reference is mapped to its output instead of source
     * in that case resolvedPath = path to output file
     * path = input file's path
     *
     * @internal
     */
    resolvedPath = "" as Path;
    /**
     * Original file name that can be different from fileName,
     * when file is included through project reference is mapped to its output instead of source
     * in that case originalFileName = name of input file
     * fileName = output file's name
     *
     * @internal
     */
    originalFileName = "";
    languageVersion: ScriptTarget = ScriptTarget.ES5;
    languageVariant: LanguageVariant = 0;
    /** @internal */ scriptKind: ScriptKind = 0;
    isDeclarationFile = false;
    /**
     * lib.d.ts should have a reference comment like
     *
     *  /// <reference no-default-lib="true"/>
     *
     * If any other file has this comment, it signals not to include lib.d.ts
     * because this containing file is intended to act as a default library.
     */
    hasNoDefaultLib = false;
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
    /** @internal */ endFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    /** @internal */ nodeCount = 0;
    /** @internal */ identifierCount = 0;
    /** @internal */ symbolCount = 0;
    /**
     * File-level diagnostics reported by the parser (includes diagnostics about /// references
     * as well as code diagnostics).
     * @internal
     */
    parseDiagnostics: DiagnosticWithLocation[] = undefined!;
    /**
     * File-level diagnostics reported by the binder.
     * @internal
     */
    bindDiagnostics: DiagnosticWithLocation[] = undefined!;
    /** @internal */ bindSuggestionDiagnostics: DiagnosticWithLocation[] | undefined = undefined;
    // Stores a line map for the file.
    // This field should never be used directly to obtain line map, use getLineMap function instead.
    /** @internal */ lineMap: readonly number[] = undefined!;
    /**
     * The first "most obvious" node that makes a file an external module.
     * This is intended to be the first top-level import/export,
     * but could be arbitrarily nested (e.g. `import.meta`).
     *
     * @internal
     */
    externalModuleIndicator: Node | true | undefined = undefined;
    /**
     * The callback used to set the external module indicator - this is saved to
     * be later reused during incremental reparsing, which otherwise lacks the information
     * to set this field
     *
     * @internal
     */
    setExternalModuleIndicator?: ((file: SourceFile) => void) | undefined = undefined;
    /** @internal */ pragmas: ReadonlyPragmaMap = undefined!;
    /** @internal */ checkJsDirective: CheckJsDirective | undefined = undefined;
    referencedFiles: readonly FileReference[] = undefined!;
    typeReferenceDirectives: readonly FileReference[] = undefined!;
    libReferenceDirectives: readonly FileReference[] = undefined!;
    amdDependencies: AmdDependency[] = undefined!;
    // Comments containing @ts-* directives, in order.
    /** @internal */ commentDirectives: CommentDirective[] | undefined = undefined;
    /**
     * Map from a string to an interned string
     * @internal
     */
    identifiers: Map<string, string> = undefined!;
    /** @internal */ packageJsonLocations?: readonly string[] | undefined = undefined;
    /** @internal */ packageJsonScope?: PackageJsonInfo | undefined = undefined;
    /** @internal */ imports: readonly StringLiteralLike[] = undefined!;
    // Identifier only if `declare global`
    /** @internal */ moduleAugmentations: readonly (Identifier | StringLiteral)[] = undefined!;
    /** @internal */ ambientModuleNames: readonly string[] = undefined!;
    /** @internal */ classifiableNames?: ReadonlySet<__String> | undefined = undefined;
    /**
     * When `module` is `Node16` or `NodeNext`, this field controls whether the
     * source file in question is an ESNext-output-format file, or a CommonJS-output-format
     * module. This is derived by the module resolver as it looks up the file, since
     * it is derived from either the file extension of the module, or the containing
     * `package.json` context, and affects both checking and emit.
     *
     * It is _public_ so that (pre)transformers can set this field,
     * since it switches the builtin `node` module transform. Generally speaking, if unset,
     * the field is treated as though it is `ModuleKind.CommonJS`.
     *
     * Note that this field is only set by the module resolution process when
     * `moduleResolution` is `Node16` or `NodeNext`, which is implied by the `module` setting
     * of `Node16` or `NodeNext`, respectively, but may be overriden (eg, by a `moduleResolution`
     * of `node`). If so, this field will be unset and source files will be considered to be
     * CommonJS-output-format by the node module transformer and type checker, regardless of extension or context.
     */
    impliedNodeFormat: ResolutionMode | undefined = undefined;
    moduleName: string | undefined = undefined;
    /**
     * this map is used by transpiler to supply alternative names for dependencies (i.e. in case of bundling)
     * @internal
     */
    renamedDependencies: Map<string, string> = undefined!;
    /**
     * The first node that causes this file to be a CommonJS module
     * @internal
     */
    commonJsModuleIndicator: Node | undefined = undefined;
    /** @internal */ version: string = undefined!;
    /**
     * If two source files are for the same version of the same package, one will redirect to the other.
     * (See `createRedirectSourceFile` in program.ts.)
     * The redirect will have this set. The redirected-to source file will be in `redirectTargetsMap`.
     *
     * @internal
     */
    redirectInfo?: RedirectInfo | undefined = undefined;
    /**
     * JS identifier-declarations that are intended to merge with globals
     * @internal
     */
    jsGlobalAugmentations?: SymbolTable | undefined = undefined;
    // Stores additional file-level diagnostics reported by the program
    /** @internal */ additionalSyntacticDiagnostics?: readonly DiagnosticWithLocation[] | undefined = undefined;
    /** @internal */ patternAmbientModules?: PatternAmbientModule[] | undefined = undefined;
    /** @internal */ localJsxNamespace?: __String | undefined = undefined;
    /** @internal */ localJsxFragmentNamespace?: __String | undefined = undefined;
    /** @internal */ localJsxFactory?: EntityName | undefined = undefined;
    /** @internal */ localJsxFragmentFactory?: EntityName | undefined = undefined;
    /** @internal */ jsDocParsingMode?: JSDocParsingMode | undefined = undefined;
    /**
     * File-level JSDoc diagnostics reported by the JSDoc parser
     * @internal
     */
    jsDocDiagnostics: DiagnosticWithLocation[] | undefined = undefined;
    namedDeclarations: Map<string, Declaration[]> | undefined = undefined;

    /** @internal */ scriptSnapshot: IScriptSnapshot | undefined = undefined;
    /** @internal */ nameTable: Map<__String, number> | undefined = undefined;

    // TsConfigSourceFile
    /** @internal */ extendedSourceFiles?: string[];
    /** @internal */ configFileSpecs?: ConfigFileSpecs;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildrenFlags(this.statements) |
            propagateChildFlags(this.endOfFileToken);
    }

    override cloneNode(node: AstNode): AstNode {
        if (this.redirectInfo) {
            const clone = this.redirectInfo.redirectTarget.ast.shadow() as AstSourceFile;
            this.copyProperties(clone.data);
            clone.emitNode = undefined;
            return clone;
        }
        return super.cloneNode(node);
    }
}

// TODO(rbuckton): Move these closer to their associated data properties
export type AstMethodSignature = AstNode<MethodSignature>;
export type AstMethodDeclaration = AstNode<MethodDeclaration>;
export type AstConstructorDeclaration = AstNode<ConstructorDeclaration>;
export type AstSemicolonClassElement = AstNode<SemicolonClassElement>;
export type AstGetAccessorDeclaration = AstNode<GetAccessorDeclaration>;
export type AstSetAccessorDeclaration = AstNode<SetAccessorDeclaration>;
export type AstIndexSignatureDeclaration = AstNode<IndexSignatureDeclaration>;
export type AstClassStaticBlockDeclaration = AstNode<ClassStaticBlockDeclaration>;
export type AstImportTypeNode = AstNode<ImportTypeNode>;
export type AstThisTypeNode = AstNode<ThisTypeNode>;
export type AstFunctionTypeNode = AstNode<FunctionTypeNode>;
export type AstConstructorTypeNode = AstNode<ConstructorTypeNode>;
export type AstTypeReferenceNode = AstNode<TypeReferenceNode>;
export type AstTypePredicateNode = AstNode<TypePredicateNode>;
export type AstTypeQueryNode = AstNode<TypeQueryNode>;
export type AstTypeLiteralNode = AstNode<TypeLiteralNode>;
export type AstArrayTypeNode = AstNode<ArrayTypeNode>;
export type AstTupleTypeNode = AstNode<TupleTypeNode>;
export type AstNamedTupleMember = AstNode<NamedTupleMember>;
export type AstOptionalTypeNode = AstNode<OptionalTypeNode>;
export type AstRestTypeNode = AstNode<RestTypeNode>;
export type AstUnionTypeNode = AstNode<UnionTypeNode>;
export type AstIntersectionTypeNode = AstNode<IntersectionTypeNode>;
export type AstConditionalTypeNode = AstNode<ConditionalTypeNode>;
export type AstInferTypeNode = AstNode<InferTypeNode>;
export type AstParenthesizedTypeNode = AstNode<ParenthesizedTypeNode>;
export type AstTypeOperatorNode = AstNode<TypeOperatorNode>;
export type AstIndexedAccessTypeNode = AstNode<IndexedAccessTypeNode>;
export type AstMappedTypeNode = AstNode<MappedTypeNode>;
export type AstLiteralTypeNode = AstNode<LiteralTypeNode>;
export type AstStringLiteral = AstNode<StringLiteral>;
export type AstTemplateLiteralTypeNode = AstNode<TemplateLiteralTypeNode>;
export type AstTemplateLiteralTypeSpan = AstNode<TemplateLiteralTypeSpan>;
export type AstOmittedExpression = AstNode<OmittedExpression>;
export type AstPrefixUnaryExpression = AstNode<PrefixUnaryExpression>;
export type AstPostfixUnaryExpression = AstNode<PostfixUnaryExpression>;
export type AstDeleteExpression = AstNode<DeleteExpression>;
export type AstTypeOfExpression = AstNode<TypeOfExpression>;
export type AstVoidExpression = AstNode<VoidExpression>;
export type AstAwaitExpression = AstNode<AwaitExpression>;
export type AstYieldExpression = AstNode<YieldExpression>;
export type AstBinaryExpression = AstNode<BinaryExpression>;
export type AstConditionalExpression = AstNode<ConditionalExpression>;
export type AstFunctionExpression = AstNode<FunctionExpression>;
export type AstArrowFunction = AstNode<ArrowFunction>;
export type AstRegularExpressionLiteral = AstNode<RegularExpressionLiteral>;
export type AstNoSubstitutionTemplateLiteral = AstNode<NoSubstitutionTemplateLiteral>;
export type AstNumericLiteral = AstNode<NumericLiteral>;
export type AstBigIntLiteral = AstNode<BigIntLiteral>;
export type AstTemplateHead = AstNode<TemplateHead>;
export type AstTemplateMiddle = AstNode<TemplateMiddle>;
export type AstTemplateTail = AstNode<TemplateTail>;
export type AstTemplateExpression = AstNode<TemplateExpression>;
export type AstTemplateSpan = AstNode<TemplateSpan>;
export type AstParenthesizedExpression = AstNode<ParenthesizedExpression>;
export type AstArrayLiteralExpression = AstNode<ArrayLiteralExpression>;
export type AstSpreadElement = AstNode<SpreadElement>;
export type AstObjectLiteralExpression = AstNode<ObjectLiteralExpression>;
export type AstElementAccessExpression = AstNode<ElementAccessExpression>;
export type AstCallExpression = AstNode<CallExpression>;
export type AstExpressionWithTypeArguments = AstNode<ExpressionWithTypeArguments>;
export type AstNewExpression = AstNode<NewExpression>;
export type AstTaggedTemplateExpression = AstNode<TaggedTemplateExpression>;
export type AstAsExpression = AstNode<AsExpression>;
export type AstTypeAssertion = AstNode<TypeAssertionExpression>;
export type AstSatisfiesExpression = AstNode<SatisfiesExpression>;
export type AstNonNullExpression = AstNode<NonNullExpression>;
export type AstMetaProperty = AstNode<MetaProperty>;
export type AstJsxElement = AstNode<JsxElement>;
export type AstJsxAttributes = AstNode<JsxAttributes>;
export type AstJsxNamespacedName = AstNode<JsxNamespacedName>;
export type AstJsxOpeningElement = AstNode<JsxOpeningElement>;
export type AstJsxSelfClosingElement = AstNode<JsxSelfClosingElement>;
export type AstJsxFragment = AstNode<JsxFragment>;
export type AstJsxOpeningFragment = AstNode<JsxOpeningFragment>;
export type AstJsxClosingFragment = AstNode<JsxClosingFragment>;
export type AstJsxAttribute = AstNode<JsxAttribute>;
export type AstJsxSpreadAttribute = AstNode<JsxSpreadAttribute>;
export type AstJsxClosingElement = AstNode<JsxClosingElement>;
export type AstJsxExpression = AstNode<JsxExpression>;
export type AstJsxText = AstNode<JsxText>;
export type AstEmptyStatement = AstNode<EmptyStatement>;
export type AstDebuggerStatement = AstNode<DebuggerStatement>;
export type AstMissingDeclaration = AstNode<MissingDeclaration>;
export type AstBlock = AstNode<Block>;
export type AstVariableStatement = AstNode<VariableStatement>;
export type AstExpressionStatement = AstNode<ExpressionStatement>;
export type AstIfStatement = AstNode<IfStatement>;
export type AstDoStatement = AstNode<DoStatement>;
export type AstWhileStatement = AstNode<WhileStatement>;
export type AstForStatement = AstNode<ForStatement>;
export type AstForInStatement = AstNode<ForInStatement>;
export type AstForOfStatement = AstNode<ForOfStatement>;
export type AstBreakStatement = AstNode<BreakStatement>;
export type AstContinueStatement = AstNode<ContinueStatement>;
export type AstReturnStatement = AstNode<ReturnStatement>;
export type AstWithStatement = AstNode<WithStatement>;
export type AstSwitchStatement = AstNode<SwitchStatement>;
export type AstCaseBlock = AstNode<CaseBlock>;
export type AstCaseClause = AstNode<CaseClause>;
export type AstDefaultClause = AstNode<DefaultClause>;
export type AstLabeledStatement = AstNode<LabeledStatement>;
export type AstThrowStatement = AstNode<ThrowStatement>;
export type AstTryStatement = AstNode<TryStatement>;
export type AstCatchClause = AstNode<CatchClause>;
export type AstClassDeclaration = AstNode<ClassDeclaration>;
export type AstClassExpression = AstNode<ClassExpression>;
export type AstInterfaceDeclaration = AstNode<InterfaceDeclaration>;
export type AstHeritageClause = AstNode<HeritageClause>;
export type AstTypeAliasDeclaration = AstNode<TypeAliasDeclaration>;
export type AstEnumMember = AstNode<EnumMember>;
export type AstEnumDeclaration = AstNode<EnumDeclaration>;
export type AstModuleDeclaration = AstNode<ModuleDeclaration>;
export type AstModuleBlock = AstNode<ModuleBlock>;
export type AstImportEqualsDeclaration = AstNode<ImportEqualsDeclaration>;
export type AstExternalModuleReference = AstNode<ExternalModuleReference>;
export type AstImportDeclaration = AstNode<ImportDeclaration>;
export type AstImportClause = AstNode<ImportClause>;
export type AstImportAttribute = AstNode<ImportAttribute>;
export type AstImportAttributes = AstNode<ImportAttributes>;
export type AstNamespaceImport = AstNode<NamespaceImport>;
export type AstNamespaceExport = AstNode<NamespaceExport>;
export type AstNamespaceExportDeclaration = AstNode<NamespaceExportDeclaration>;
export type AstExportDeclaration = AstNode<ExportDeclaration>;
export type AstNamedImports = AstNode<NamedImports>;
export type AstNamedExports = AstNode<NamedExports>;
export type AstImportSpecifier = AstNode<ImportSpecifier>;
export type AstExportSpecifier = AstNode<ExportSpecifier>;
export type AstExportAssignment = AstNode<ExportAssignment>;
export type AstJSDocTypeExpression = AstNode<JSDocTypeExpression>;
export type AstJSDocNameReference = AstNode<JSDocNameReference>;
export type AstJSDocMemberName = AstNode<JSDocMemberName>;
export type AstJSDocAllType = AstNode<JSDocAllType>;
export type AstJSDocUnknownType = AstNode<JSDocUnknownType>;
export type AstJSDocNonNullableType = AstNode<JSDocNonNullableType>;
export type AstJSDocNullableType = AstNode<JSDocNullableType>;
export type AstJSDocOptionalType = AstNode<JSDocOptionalType>;
export type AstJSDocFunctionType = AstNode<JSDocFunctionType>;
export type AstJSDocVariadicType = AstNode<JSDocVariadicType>;
export type AstJSDocNamepathType = AstNode<JSDocNamepathType>;
export type AstJSDoc = AstNode<JSDoc>;
export type AstJSDocLink = AstNode<JSDocLink>;
export type AstJSDocLinkCode = AstNode<JSDocLinkCode>;
export type AstJSDocLinkPlain = AstNode<JSDocLinkPlain>;
export type AstJSDocText = AstNode<JSDocText>;
export type AstJSDocUnknownTag = AstNode<JSDocUnknownTag>;
export type AstJSDocAugmentsTag = AstNode<JSDocAugmentsTag>;
export type AstJSDocImplementsTag = AstNode<JSDocImplementsTag>;
export type AstJSDocAuthorTag = AstNode<JSDocAuthorTag>;
export type AstJSDocDeprecatedTag = AstNode<JSDocDeprecatedTag>;
export type AstJSDocClassTag = AstNode<JSDocClassTag>;
export type AstJSDocPublicTag = AstNode<JSDocPublicTag>;
export type AstJSDocPrivateTag = AstNode<JSDocPrivateTag>;
export type AstJSDocProtectedTag = AstNode<JSDocProtectedTag>;
export type AstJSDocReadonlyTag = AstNode<JSDocReadonlyTag>;
export type AstJSDocOverrideTag = AstNode<JSDocOverrideTag>;
export type AstJSDocEnumTag = AstNode<JSDocEnumTag>;
export type AstJSDocThisTag = AstNode<JSDocThisTag>;
export type AstJSDocTemplateTag = AstNode<JSDocTemplateTag>;
export type AstJSDocSeeTag = AstNode<JSDocSeeTag>;
export type AstJSDocReturnTag = AstNode<JSDocReturnTag>;
export type AstJSDocTypeTag = AstNode<JSDocTypeTag>;
export type AstJSDocTypedefTag = AstNode<JSDocTypedefTag>;
export type AstJSDocCallbackTag = AstNode<JSDocCallbackTag>;
export type AstJSDocOverloadTag = AstNode<JSDocOverloadTag>;
export type AstJSDocThrowsTag = AstNode<JSDocThrowsTag>;
export type AstJSDocSignature = AstNode<JSDocSignature>;
export type AstJSDocPropertyTag = AstNode<JSDocPropertyTag>;
export type AstJSDocParameterTag = AstNode<JSDocParameterTag>;
export type AstJSDocTypeLiteral = AstNode<JSDocTypeLiteral>;
export type AstJSDocSatisfiesTag = AstNode<JSDocSatisfiesTag>;
export type AstJSDocImportTag = AstNode<JSDocImportTag>;
export type AstSourceFile = AstNode<SourceFile>;
export type AstSyntheticExpression = AstNode<SyntheticExpression>;
export type AstBundle = AstNode<Bundle>;
export type AstSyntaxList = AstNode<SyntaxList>;
export type AstNotEmittedStatement = AstNode<NotEmittedStatement>;
export type AstNotEmittedTypeElement = AstNode<NotEmittedTypeElement>;
export type AstPartiallyEmittedExpression = AstNode<PartiallyEmittedExpression>;
export type AstCommaListExpression = AstNode<CommaListExpression>;
/** @internal */
export type AstSyntheticReferenceExpression = AstNode<SyntheticReferenceExpression>;

// JSON

export interface AstJsonMinusNumericLiteralData extends AstPrefixUnaryExpressionData {
    operator: SyntaxKind.MinusToken;
    operand: AstNumericLiteral;
}

export type AstJsonMinusNumericLiteral = AstNode<JsonMinusNumericLiteral>;

export type AstJsonObjectExpression = AstNodeOneOf<JsonObjectExpression>;

export type AstJsonObjectExpressionStatement = AstNode<JsonObjectExpressionStatement>;

export interface AstJsonObjectExpressionStatementData extends AstExpressionStatementData {
    expression: AstJsonObjectExpression;
}

export type AstJsonSourceFile = AstNode<JsonSourceFile>;

export interface AstJsonSourceFileData extends AstSourceFileData {
    statements: AstNodeArray<AstJsonObjectExpressionStatement>;
}

// /**
//  * Constraint used to pick out keys of an `AstData` subtype that match the constraint.
//  */
// type AstDataValue = AstNode | { readonly items: readonly AstNode[] } | JSDocArray | FlowNode | string | number | boolean | null | undefined;

// /**
//  * Constraint limiting what props can be applied to an AstNode refinement.
//  * For ease of use, tuples can be used to constrain `AstNodeArray` without needing to also specify `{ items: [] }`.
//  */
// type AstDataProps<A extends AstNode> = {
//     [K in keyof A["data"] & keyof A["node"] as A["data"][K] extends AstDataValue ? K : never]?:
//         A["data"][K] extends AstNodeArray<infer C> ? { readonly items: readonly C[] } | readonly C[] :
//         A["data"][K];
// };

// /**
//  * Converts `AstDataProps` into an actual `AstData` refinement.
//  */
// type RefinedDataProps<A extends AstNode, D extends AstDataProps<A>> = {
//     [K in keyof D & keyof A["data"] & keyof A["node"]]:
//         D[K] extends infer C extends readonly AstNode[] ? { readonly items: C } :
//         D[K];
// };

// /**
//  * Converts `AstDataProps` into an actual `Node` refinement.
//  */
// type RefinedNodeProps<A extends AstNode, D extends AstDataProps<A>> = {
//     [K in keyof D & keyof A["data"] & keyof A["node"]]:
//         D[K] extends AstNode<infer N> ? N : // Convert AstNode to Node
//         D[K] extends infer C extends readonly AstNode[] ? RefinedNodeArray<C> : // Convert AstNode[] to Node[]
//         D[K] extends { readonly items: infer C extends readonly AstNode[] } ? RefinedNodeArray<C> : // Convert AstNodeArray to Node[]
//         D[K]; // primitive value
// };

// /**
//  * Converts `AstNode[]` to `Node[]`
//  */
// type RefinedNodeArray<A extends readonly AstNode[]> = { [P in keyof A]: A[P]["node"] };

// /**
//  * Subset of `Node` into which to inject refinements for `ast` and `data`.
//  */
// interface RefinedNode<A extends AstNode, D extends AstDataProps<A>> {
//     readonly ast: AstNode<A["node"] & this>;
//     readonly data: A["data"] & RefinedDataProps<A, D>;
// }

// /**
//  * Refines an `AstNode` based on a set of specific data properties.
//  */
// export type RefineAstNode<A extends AstNode, D extends AstDataProps<A>, Brand extends string = never> = Branded<
//     & A["node"]
//     & RefinedNode<A, D>
//     & RefinedNodeProps<A, D>,
//     Brand>;

/**
 * Constraint limiting what props can be applied to a Node refinement.
 */
export type NodeProps<N extends Node> = {
    [K in keyof N["data"] & keyof N as Exclude<K, keyof AstData>]?:
        N["data"][K] extends infer P ?
            P extends AstNodeArray<infer C> ? readonly C["node"][] :
            P extends AstNode<infer C> ? C :
            P :
        never;
};

/**
 * Converts `Node[]` to `AstNodeArray`
 */
export type RefineAstNodeArray<A extends readonly Node[]> =
    & AstNodeArray<A[number]["ast"]>
    // only intersect with elements if `A` is a tuple (i.e., has a more specific `length` than `number`)
    & (number extends A["length"] ? unknown : { readonly items: { +readonly [P in keyof A]-?: A[P]["ast"] } });

/**
 * Converts the supplied node properties to AST form.
 */
export type RefineNodeData<N extends Node, D extends NodeProps<N>> = {
    [K in keyof D]:
        // Convert arrays/tuples to AstNodeArray
        D[K] extends infer C extends readonly Node[] ? RefineAstNodeArray<C> :
        // Convert nodes to their ast form
        D[K] extends Node ? D[K]["ast"] :
        // Use primitives as-is
        D[K];
};

/**
 * Refines a `Node` based on a set of specific node properties.
 */
export type RefineNode<N extends Node, D extends NodeProps<N>> =
    N & D & { readonly data: RefineNodeData<N, D>; };

/**
 * Refines a `Node` with specific required properties.
 */
export type RequiredNodeProp<N extends Node, K extends keyof any> =
    N extends Node ?
        RefineNode<N, Extract<{ readonly [P in K & keyof NodeProps<N>]-?: NonNullable<NodeProps<N>[P]> }, NodeProps<N>>> :
    never;

function propagateNameFlags(node: AstPropertyName | AstBindingPattern | AstNoSubstitutionTemplateLiteral | undefined) {
    return node?.kind === SyntaxKind.Identifier ? propagateIdentifierNameFlags(node) : propagateChildFlags(node);
}

function propagateIdentifierNameFlags(node: AstIdentifier) {
    // An IdentifierName is allowed to be `await`
    return propagateChildFlags(node) & ~TransformFlags.ContainsPossibleTopLevelAwait;
}

function propagatePropertyNameFlagsOfChild(node: AstPropertyName, transformFlags: TransformFlags) {
    return transformFlags | (node.transformFlags & TransformFlags.PropertyNamePropagatingFlags);
}

function propagateChildFlags(child: AstNode | undefined): TransformFlags {
    if (!child) return TransformFlags.None;
    const childFlags = child.transformFlags & ~getTransformFlagsSubtreeExclusions(child.kind);
    const name = astGetName(child);
    return name && isAstPropertyName(name) ? propagatePropertyNameFlagsOfChild(name, childFlags) : childFlags;
}

function propagateChildrenFlags(children: AstNodeArray<AstNode> | undefined): TransformFlags {
    return children ? children.transformFlags : TransformFlags.None;
}

function propagateAssignmentPatternFlags(node: AstObjectLiteralExpression | AstArrayLiteralExpression): TransformFlags {
    // TODO: use algorithm that does not instantiate Node
    return containsObjectRestOrSpread(node.node) ? TransformFlags.ContainsObjectRestOrSpread : TransformFlags.None;
}

function getTransformFlagsOfTemplateLiteralLike(templateFlags: TokenFlags) {
    let transformFlags = TransformFlags.ContainsES2015;
    if (templateFlags) {
        transformFlags |= TransformFlags.ContainsES2018;
    }
    return transformFlags;
}

/** @internal */
export type AstNamedDeclaration = AstNodeOneOf<NamedDeclaration>;

/** @internal */
export type AstHasName = AstNodeOneOf<HasName>;

/** @internal */
export function astCanHaveName(node: AstNode): node is AstHasName {
    switch (node.kind) {
        case SyntaxKind.BindingElement:
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.ClassExpression:
        case SyntaxKind.EnumDeclaration:
        case SyntaxKind.EnumMember:
        case SyntaxKind.ExportSpecifier:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.ImportAttribute:
        case SyntaxKind.ImportClause:
        case SyntaxKind.ImportEqualsDeclaration:
        case SyntaxKind.ImportSpecifier:
        case SyntaxKind.InterfaceDeclaration:
        case SyntaxKind.JSDocCallbackTag:
        case SyntaxKind.JSDocLink:
        case SyntaxKind.JSDocLinkCode:
        case SyntaxKind.JSDocLinkPlain:
        case SyntaxKind.JSDocNameReference:
        case SyntaxKind.JSDocParameterTag:
        case SyntaxKind.JSDocPropertyTag:
        case SyntaxKind.JSDocSeeTag:
        case SyntaxKind.JSDocTypedefTag:
        case SyntaxKind.JsxAttribute:
        case SyntaxKind.JsxNamespacedName:
        case SyntaxKind.MetaProperty:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.MethodSignature:
        case SyntaxKind.MissingDeclaration:
        case SyntaxKind.ModuleDeclaration:
        case SyntaxKind.NamedTupleMember:
        case SyntaxKind.NamespaceExport:
        case SyntaxKind.NamespaceExportDeclaration:
        case SyntaxKind.NamespaceImport:
        case SyntaxKind.Parameter:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.PropertyAssignment:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertySignature:
        case SyntaxKind.SetAccessor:
        case SyntaxKind.ShorthandPropertyAssignment:
        case SyntaxKind.TypeAliasDeclaration:
        case SyntaxKind.TypeParameter:
        case SyntaxKind.VariableDeclaration:
            return true;
    }
    return false;
}

/** @internal */
export function astHasName(node: AstNode): node is AstNodeOneOf<RequiredNodeProp<HasName, "name">> {
    return !!astGetName(node);
}

/** @internal */
export function astGetName<T extends AstNode>(node: T): T extends AstHasName ? T["data"]["name"] : undefined;
export function astGetName(node: AstNode) {
    Debug.type<AstHasName>(node);
    // NOTE: each branch is monomorphic
    switch (node.kind) {
        case SyntaxKind.BindingElement: return node.data.name;
        case SyntaxKind.ClassDeclaration: return node.data.name;
        case SyntaxKind.ClassExpression: return node.data.name;
        case SyntaxKind.EnumDeclaration: return node.data.name;
        case SyntaxKind.EnumMember: return node.data.name;
        case SyntaxKind.ExportSpecifier: return node.data.name;
        case SyntaxKind.FunctionDeclaration: return node.data.name;
        case SyntaxKind.FunctionExpression: return node.data.name;
        case SyntaxKind.GetAccessor: return node.data.name;
        case SyntaxKind.ImportAttribute: return node.data.name;
        case SyntaxKind.ImportClause: return node.data.name;
        case SyntaxKind.ImportEqualsDeclaration: return node.data.name;
        case SyntaxKind.ImportSpecifier: return node.data.name;
        case SyntaxKind.InterfaceDeclaration: return node.data.name;
        case SyntaxKind.JSDocCallbackTag: return node.data.name;
        case SyntaxKind.JSDocLink: return node.data.name;
        case SyntaxKind.JSDocLinkCode: return node.data.name;
        case SyntaxKind.JSDocLinkPlain: return node.data.name;
        case SyntaxKind.JSDocNameReference: return node.data.name;
        case SyntaxKind.JSDocParameterTag: return node.data.name;
        case SyntaxKind.JSDocPropertyTag: return node.data.name;
        case SyntaxKind.JSDocSeeTag: return node.data.name;
        case SyntaxKind.JSDocTypedefTag: return node.data.name;
        case SyntaxKind.JsxAttribute: return node.data.name;
        case SyntaxKind.JsxNamespacedName: return node.data.name;
        case SyntaxKind.MetaProperty: return node.data.name;
        case SyntaxKind.MethodDeclaration: return node.data.name;
        case SyntaxKind.MethodSignature: return node.data.name;
        case SyntaxKind.MissingDeclaration: return node.data.name;
        case SyntaxKind.ModuleDeclaration: return node.data.name;
        case SyntaxKind.NamedTupleMember: return node.data.name;
        case SyntaxKind.NamespaceExport: return node.data.name;
        case SyntaxKind.NamespaceExportDeclaration: return node.data.name;
        case SyntaxKind.NamespaceImport: return node.data.name;
        case SyntaxKind.Parameter: return node.data.name;
        case SyntaxKind.PropertyAccessExpression: return node.data.name;
        case SyntaxKind.PropertyAssignment: return node.data.name;
        case SyntaxKind.PropertyDeclaration: return node.data.name;
        case SyntaxKind.PropertySignature: return node.data.name;
        case SyntaxKind.SetAccessor: return node.data.name;
        case SyntaxKind.ShorthandPropertyAssignment: return node.data.name;
        case SyntaxKind.TypeAliasDeclaration: return node.data.name;
        case SyntaxKind.TypeParameter: return node.data.name;
        case SyntaxKind.VariableDeclaration: return node.data.name;
        default: return undefined;
    }
}

/** @internal */
export function astCanHaveJSDoc(node: AstNode): node is AstHasJSDoc {
    switch (node.kind) {
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.BinaryExpression:
        case SyntaxKind.Block:
        case SyntaxKind.BreakStatement:
        case SyntaxKind.CallSignature:
        case SyntaxKind.CaseClause:
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.ClassExpression:
        case SyntaxKind.ClassStaticBlockDeclaration:
        case SyntaxKind.Constructor:
        case SyntaxKind.ConstructorType:
        case SyntaxKind.ConstructSignature:
        case SyntaxKind.ContinueStatement:
        case SyntaxKind.DebuggerStatement:
        case SyntaxKind.DoStatement:
        case SyntaxKind.ElementAccessExpression:
        case SyntaxKind.EmptyStatement:
        case SyntaxKind.EndOfFileToken:
        case SyntaxKind.EnumDeclaration:
        case SyntaxKind.EnumMember:
        case SyntaxKind.ExportAssignment:
        case SyntaxKind.ExportDeclaration:
        case SyntaxKind.ExportSpecifier:
        case SyntaxKind.ExpressionStatement:
        case SyntaxKind.ForInStatement:
        case SyntaxKind.ForOfStatement:
        case SyntaxKind.ForStatement:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.FunctionType:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.Identifier:
        case SyntaxKind.IfStatement:
        case SyntaxKind.ImportDeclaration:
        case SyntaxKind.ImportEqualsDeclaration:
        case SyntaxKind.IndexSignature:
        case SyntaxKind.InterfaceDeclaration:
        case SyntaxKind.JSDocFunctionType:
        case SyntaxKind.JSDocSignature:
        case SyntaxKind.LabeledStatement:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.MethodSignature:
        case SyntaxKind.ModuleDeclaration:
        case SyntaxKind.NamedTupleMember:
        case SyntaxKind.NamespaceExportDeclaration:
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.Parameter:
        case SyntaxKind.ParenthesizedExpression:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.PropertyAssignment:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertySignature:
        case SyntaxKind.ReturnStatement:
        case SyntaxKind.SemicolonClassElement:
        case SyntaxKind.SetAccessor:
        case SyntaxKind.ShorthandPropertyAssignment:
        case SyntaxKind.SpreadAssignment:
        case SyntaxKind.SwitchStatement:
        case SyntaxKind.ThrowStatement:
        case SyntaxKind.TryStatement:
        case SyntaxKind.TypeAliasDeclaration:
        case SyntaxKind.TypeParameter:
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.VariableStatement:
        case SyntaxKind.WhileStatement:
        case SyntaxKind.WithStatement:
        case SyntaxKind.ModuleBlock:
        case SyntaxKind.MissingDeclaration:
        case SyntaxKind.NotEmittedStatement:
            return true;
        default:
            return false;
    }
}

/** @internal */
export function astHasJSDoc(node: AstNode): node is AstNodeOneOf<RequiredNodeProp<HasJSDoc, "jsDoc">> {
    return !!astGetJSDoc(node);
}

/** @internal */
export function astGetJSDoc(node: AstNode): JSDocArray | undefined {
    // each branch is monomorphic
    Debug.type<AstHasJSDoc>(node);
    switch (node.kind) {
        case SyntaxKind.ArrowFunction: return node.data.jsDoc;
        case SyntaxKind.BinaryExpression: return node.data.jsDoc;
        case SyntaxKind.Block: return node.data.jsDoc;
        case SyntaxKind.BreakStatement: return node.data.jsDoc;
        case SyntaxKind.CallSignature: return node.data.jsDoc;
        case SyntaxKind.CaseClause: return node.data.jsDoc;
        case SyntaxKind.ClassDeclaration: return node.data.jsDoc;
        case SyntaxKind.ClassExpression: return node.data.jsDoc;
        case SyntaxKind.ClassStaticBlockDeclaration: return node.data.jsDoc;
        case SyntaxKind.Constructor: return node.data.jsDoc;
        case SyntaxKind.ConstructorType: return node.data.jsDoc;
        case SyntaxKind.ConstructSignature: return node.data.jsDoc;
        case SyntaxKind.ContinueStatement: return node.data.jsDoc;
        case SyntaxKind.DebuggerStatement: return node.data.jsDoc;
        case SyntaxKind.DoStatement: return node.data.jsDoc;
        case SyntaxKind.ElementAccessExpression: return node.data.jsDoc;
        case SyntaxKind.EmptyStatement: return node.data.jsDoc;
        case SyntaxKind.EndOfFileToken: return node.data.jsDoc;
        case SyntaxKind.EnumDeclaration: return node.data.jsDoc;
        case SyntaxKind.EnumMember: return node.data.jsDoc;
        case SyntaxKind.ExportAssignment: return node.data.jsDoc;
        case SyntaxKind.ExportDeclaration: return node.data.jsDoc;
        case SyntaxKind.ExportSpecifier: return node.data.jsDoc;
        case SyntaxKind.ExpressionStatement: return node.data.jsDoc;
        case SyntaxKind.ForInStatement: return node.data.jsDoc;
        case SyntaxKind.ForOfStatement: return node.data.jsDoc;
        case SyntaxKind.ForStatement: return node.data.jsDoc;
        case SyntaxKind.FunctionDeclaration: return node.data.jsDoc;
        case SyntaxKind.FunctionExpression: return node.data.jsDoc;
        case SyntaxKind.FunctionType: return node.data.jsDoc;
        case SyntaxKind.GetAccessor: return node.data.jsDoc;
        case SyntaxKind.Identifier: return node.data.jsDoc;
        case SyntaxKind.IfStatement: return node.data.jsDoc;
        case SyntaxKind.ImportDeclaration: return node.data.jsDoc;
        case SyntaxKind.ImportEqualsDeclaration: return node.data.jsDoc;
        case SyntaxKind.IndexSignature: return node.data.jsDoc;
        case SyntaxKind.InterfaceDeclaration: return node.data.jsDoc;
        case SyntaxKind.JSDocFunctionType: return node.data.jsDoc;
        case SyntaxKind.JSDocSignature: return node.data.jsDoc;
        case SyntaxKind.LabeledStatement: return node.data.jsDoc;
        case SyntaxKind.MethodDeclaration: return node.data.jsDoc;
        case SyntaxKind.MethodSignature: return node.data.jsDoc;
        case SyntaxKind.ModuleDeclaration: return node.data.jsDoc;
        case SyntaxKind.NamedTupleMember: return node.data.jsDoc;
        case SyntaxKind.NamespaceExportDeclaration: return node.data.jsDoc;
        case SyntaxKind.ObjectLiteralExpression: return node.data.jsDoc;
        case SyntaxKind.Parameter: return node.data.jsDoc;
        case SyntaxKind.ParenthesizedExpression: return node.data.jsDoc;
        case SyntaxKind.PropertyAccessExpression: return node.data.jsDoc;
        case SyntaxKind.PropertyAssignment: return node.data.jsDoc;
        case SyntaxKind.PropertyDeclaration: return node.data.jsDoc;
        case SyntaxKind.PropertySignature: return node.data.jsDoc;
        case SyntaxKind.ReturnStatement: return node.data.jsDoc;
        case SyntaxKind.SemicolonClassElement: return node.data.jsDoc;
        case SyntaxKind.SetAccessor: return node.data.jsDoc;
        case SyntaxKind.ShorthandPropertyAssignment: return node.data.jsDoc;
        case SyntaxKind.SpreadAssignment: return node.data.jsDoc;
        case SyntaxKind.SwitchStatement: return node.data.jsDoc;
        case SyntaxKind.ThrowStatement: return node.data.jsDoc;
        case SyntaxKind.TryStatement: return node.data.jsDoc;
        case SyntaxKind.TypeAliasDeclaration: return node.data.jsDoc;
        case SyntaxKind.TypeParameter: return node.data.jsDoc;
        case SyntaxKind.VariableDeclaration: return node.data.jsDoc;
        case SyntaxKind.VariableStatement: return node.data.jsDoc;
        case SyntaxKind.WhileStatement: return node.data.jsDoc;
        case SyntaxKind.WithStatement: return node.data.jsDoc;
        case SyntaxKind.ModuleBlock: return node.data.jsDoc;
        case SyntaxKind.MissingDeclaration: return node.data.jsDoc;
        case SyntaxKind.NotEmittedStatement: return node.data.jsDoc;
        default: Debug.assertNever(node);
    }
}

/** @internal */
export function astSetJSDoc(node: AstHasJSDoc, value: JSDocArray | undefined): void {
    // each branch is monomorphic
    switch (node.kind) {
        case SyntaxKind.ArrowFunction:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.BinaryExpression:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.Block:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.BreakStatement:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.CallSignature:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.CaseClause:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.ClassDeclaration:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.ClassExpression:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.ClassStaticBlockDeclaration:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.Constructor:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.ConstructorType:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.ConstructSignature:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.ContinueStatement:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.DebuggerStatement:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.DoStatement:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.ElementAccessExpression:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.EmptyStatement:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.EndOfFileToken:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.EnumDeclaration:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.EnumMember:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.ExportAssignment:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.ExportDeclaration:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.ExportSpecifier:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.ExpressionStatement:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.ForInStatement:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.ForOfStatement:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.ForStatement:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.FunctionDeclaration:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.FunctionExpression:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.FunctionType:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.GetAccessor:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.Identifier:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.IfStatement:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.ImportDeclaration:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.ImportEqualsDeclaration:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.IndexSignature:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.InterfaceDeclaration:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.JSDocFunctionType:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.JSDocSignature:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.LabeledStatement:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.MethodDeclaration:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.MethodSignature:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.ModuleDeclaration:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.NamedTupleMember:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.NamespaceExportDeclaration:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.ObjectLiteralExpression:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.Parameter:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.ParenthesizedExpression:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.PropertyAccessExpression:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.PropertyAssignment:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.PropertyDeclaration:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.PropertySignature:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.ReturnStatement:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.SemicolonClassElement:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.SetAccessor:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.ShorthandPropertyAssignment:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.SpreadAssignment:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.SwitchStatement:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.ThrowStatement:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.TryStatement:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.TypeAliasDeclaration:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.TypeParameter:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.VariableDeclaration:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.VariableStatement:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.WhileStatement:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.WithStatement:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.ModuleBlock:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.MissingDeclaration:
            node.data.jsDoc = value;
            break;
        case SyntaxKind.NotEmittedStatement:
            node.data.jsDoc = value;
            break;
        default: Debug.assertNever(node);
    }
}

// NOTE: each branch is monomorphic
const computeTransformFlagsMap: Partial<Record<SyntaxKind, (node: AstNode) => TransformFlags>> = {
    [SyntaxKind.EndOfFileToken]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ThisKeyword]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.SuperKeyword]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.Identifier]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.PrivateIdentifier]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.QualifiedName]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ComputedPropertyName]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.TypeParameter]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.Parameter]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.Decorator]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.PropertySignature]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.CallSignature]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ConstructSignature]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.VariableDeclaration]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.VariableDeclarationList]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.BindingElement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.PropertyDeclaration]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.PropertyAssignment]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ShorthandPropertyAssignment]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.SpreadAssignment]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ObjectBindingPattern]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ArrayBindingPattern]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.FunctionDeclaration]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.MethodSignature]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.MethodDeclaration]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.Constructor]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.SemicolonClassElement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.GetAccessor]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.SetAccessor]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.IndexSignature]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ClassStaticBlockDeclaration]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ImportTypeAssertionContainer]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ImportType]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ThisType]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.FunctionType]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ConstructorType]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.TypeReference]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.TypePredicate]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.TypeQuery]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.TypeLiteral]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ArrayType]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.TupleType]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.NamedTupleMember]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.OptionalType]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.RestType]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.UnionType]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.IntersectionType]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ConditionalType]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.InferType]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ParenthesizedType]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.TypeOperator]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.IndexedAccessType]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.MappedType]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.LiteralType]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.StringLiteral]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.TemplateLiteralType]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.TemplateLiteralTypeSpan]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.OmittedExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.PrefixUnaryExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.PostfixUnaryExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.DeleteExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.TypeOfExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.VoidExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.AwaitExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.YieldExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.BinaryExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ConditionalExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.FunctionExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ArrowFunction]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.RegularExpressionLiteral]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.NoSubstitutionTemplateLiteral]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.NumericLiteral]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.BigIntLiteral]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.TemplateHead]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.TemplateMiddle]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.TemplateTail]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.TemplateExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.TemplateSpan]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ParenthesizedExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ArrayLiteralExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.SpreadElement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ObjectLiteralExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.PropertyAccessExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ElementAccessExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.CallExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ExpressionWithTypeArguments]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.NewExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.TaggedTemplateExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.AsExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.TypeAssertionExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.SatisfiesExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.NonNullExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.MetaProperty]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.JsxElement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.JsxAttributes]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.JsxNamespacedName]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.JsxOpeningElement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.JsxSelfClosingElement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.JsxFragment]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.JsxOpeningFragment]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.JsxClosingFragment]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.JsxAttribute]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.JsxSpreadAttribute]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.JsxClosingElement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.JsxExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.JsxText]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.EmptyStatement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.DebuggerStatement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.MissingDeclaration]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.Block]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.VariableStatement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ExpressionStatement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.IfStatement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.DoStatement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.WhileStatement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ForStatement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ForInStatement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ForOfStatement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.BreakStatement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ContinueStatement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ReturnStatement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.WithStatement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.SwitchStatement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.CaseBlock]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.CaseClause]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.DefaultClause]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.LabeledStatement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ThrowStatement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.TryStatement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.CatchClause]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ClassDeclaration]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ClassExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.InterfaceDeclaration]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.HeritageClause]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.TypeAliasDeclaration]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.EnumMember]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.EnumDeclaration]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ModuleDeclaration]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ModuleBlock]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ImportEqualsDeclaration]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ExternalModuleReference]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ImportDeclaration]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ImportClause]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ImportAttribute]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ImportAttributes]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.NamespaceImport]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.NamespaceExport]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.NamespaceExportDeclaration]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ExportDeclaration]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.NamedImports]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.NamedExports]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ImportSpecifier]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ExportSpecifier]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.ExportAssignment]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.SourceFile]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.SyntheticExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.Bundle]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.SyntaxList]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.NotEmittedStatement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.NotEmittedTypeElement]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.PartiallyEmittedExpression]: node => node.data.computeTransformFlags(node),
    [SyntaxKind.CommaListExpression]: node => node.data.computeTransformFlags(node),
};

function computeTransformFlags(node: AstNode) {
    const fn = computeTransformFlagsMap[node.kind];
    return fn !== undefined ? fn(node) : node.data.computeTransformFlags(node);
}

function isAstPropertyName(node: AstNode): node is AstPropertyName {
    const kind = node.kind;
    return kind === SyntaxKind.Identifier
        || kind === SyntaxKind.PrivateIdentifier
        || kind === SyntaxKind.StringLiteral
        || kind === SyntaxKind.NumericLiteral
        || kind === SyntaxKind.ComputedPropertyName;
}

function modifiersToFlags(modifiers: readonly AstModifierLike[] | undefined) {
    let flags = ModifierFlags.None;
    if (modifiers) {
        for (const modifier of modifiers) {
            flags |= modifierToFlag(modifier.kind);
        }
    }
    return flags;
}

// copied from utilities.ts
function containsInvalidEscapeFlag(node: AstTemplateLiteralToken): boolean {
    return !!(node.data.templateFlags & TokenFlags.ContainsInvalidEscape);
}

// copied from utilities.ts
function hasInvalidEscape(template: AstTemplateLiteral): boolean {
    return template && !!(isNoSubstitutionTemplateLiteral(template)
        ? containsInvalidEscapeFlag(template)
        : (containsInvalidEscapeFlag(template.data.head) || template.data.templateSpans?.items.some(span => containsInvalidEscapeFlag(span.data.literal))));
}

function isNoSubstitutionTemplateLiteral(template: AstTemplateLiteral): template is AstNoSubstitutionTemplateLiteral {
    return template.kind === SyntaxKind.NoSubstitutionTemplateLiteral;
}

/** @internal */
export function getAstSourceFileNodeOfNode(node: AstNode | undefined): AstSourceFile | undefined {
    while (node && node.kind !== SyntaxKind.SourceFile) {
        node = node.parent;
    }
    return node as AstSourceFile | undefined;
}

/** @internal */
export function getAstParseTreeNode(node: AstNode | undefined, nodeTest?: (node: AstNode) => boolean): AstNode | undefined {
    if (node === undefined) {
        return node;
    }
    while (node) {
        if (isParseTreeNode(node)) {
            return !nodeTest || nodeTest(node) ? node : undefined;
        }
        node = node.original;
    }
    return undefined;
}

/** @internal */
export function isAstJSDocTypeAssertion(node: AstNode): node is AstJSDocTypeAssertion {
    return isAstParenthesizedExpression(node)
        && !!(node.flags & NodeFlags.JavaScriptFile)
        && !!getJSDocTypeTag(node.node); // TODO: don't invoke node
}

/** @internal */
export type AstOuterExpression = AstNodeOneOf<OuterExpression>;

/** @internal */
export function isAstOuterExpression(node: AstNode, kinds: OuterExpressionKinds = OuterExpressionKinds.All): node is AstOuterExpression {
    switch (node.kind) {
        case SyntaxKind.ParenthesizedExpression:
            if (kinds & OuterExpressionKinds.ExcludeJSDocTypeAssertion && isAstJSDocTypeAssertion(node)) {
                return false;
            }
            return (kinds & OuterExpressionKinds.Parentheses) !== 0;
        case SyntaxKind.TypeAssertionExpression:
        case SyntaxKind.AsExpression:
        case SyntaxKind.SatisfiesExpression:
            return (kinds & OuterExpressionKinds.TypeAssertions) !== 0;
        case SyntaxKind.ExpressionWithTypeArguments:
            return (kinds & OuterExpressionKinds.ExpressionsWithTypeArguments) !== 0;
        case SyntaxKind.NonNullExpression:
            return (kinds & OuterExpressionKinds.NonNullAssertions) !== 0;
        case SyntaxKind.PartiallyEmittedExpression:
            return (kinds & OuterExpressionKinds.PartiallyEmittedExpressions) !== 0;
    }
    return false;
}

/** @internal */
export function skipAstOuterExpressions(node: AstNode, kinds: OuterExpressionKinds = OuterExpressionKinds.All): AstNode {
    while (isAstOuterExpression(node, kinds)) {
        node = node.data.expression;
    }
    return node;
}
