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
    emptyArray,
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
    HasExpression,
    HasJSDoc,
    HasLocals,
    HasModifiers,
    HasName,
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
    astIsElementAccessExpression,
    astIsParenthesizedExpression,
    astIsPropertyAccessExpression,
    IScriptSnapshot,
    isLogicalOrCoalescingAssignmentOperator,
    isParseTreeNode,
    isTokenKind,
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
    SourceFileLike,
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
    YieldExpression,
    HasFlowNode,
    BindableStaticNameExpression,
    BindableObjectDefinePropertyCall,
    BindableStaticAccessExpression,
    BindableStaticElementAccessExpression,
    LiteralLikeElementAccessExpression,
    AccessExpression,
    WrappedExpression,
    AssignmentExpression,
    AssignmentOperatorToken,
    BindableStaticPropertyAssignmentExpression,
    BindablePropertyAssignmentExpression,
    ThisContainer,
    DynamicNamedDeclaration,
    DynamicNamedBinaryExpression,
    VariableLikeDeclaration,
    HasInitializer,
    AutoAccessorPropertyDeclaration,
    PrologueDirective,
    HasText,
    AmbientModuleDeclaration,
    NonGlobalAmbientModuleDeclaration,
    HasSymbol,
    HasType,
    HasTypeParameters,
    HasParameters,
    HasBody,
    HasQuestionToken,
    HasEndFlowNode,
    HasTypeArguments,
    InternalHasTypeArguments,
    HasElements,
    HasMembers,
    HasStatement,
    HasExclamationToken,
    HasAsteriskToken,
    HasQuestionDotToken,
    HasComment,
    HasStatements,
    astIdText,
    HasTypes,
    HasTagName,
    HasIsTypeOnly,
    InternalHasModifiers,
} from "./_namespaces/ts.js";

const cloneNodeMap: Partial<Record<SyntaxKind, (node: AstNode) => AstNode>> = {};
const createDataInstanceMap: Partial<Record<SyntaxKind, (data: AstData) => AstData>> = {};
const copyDataPropertiesMap: Partial<Record<SyntaxKind, (data: AstData, clone: AstData) => void>> = {};
const shadowNodeMap: Partial<Record<SyntaxKind, (node: AstNode) => AstNode>> = {};
const shadowDataMap: Partial<Record<SyntaxKind, (data: AstData) => AstData>> = {};

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

let cloneNodeCore: (node: AstNode) => AstNode;
let shadowCore: (node: AstNode) => AstNode;

// dprint-ignore
export class AstNode<N extends Node<SyntaxKind, AstData> = Node<SyntaxKind, AstData>> {
    static {
        cloneNodeCore = node => node.cloneCore();
        shadowCore = node => node.shadowCore();
    }

    private _node: N | undefined = undefined;
    private _nodeConstructor: NodeConstructor<N> = undefined!;
    private _extra: AstNodeExtraFields | undefined = undefined;

    readonly kind: N["kind"] = 0;
    readonly data: N["data"] = undefined!;

    parent: AstNodeOneOf<N["parent"]> = undefined!; // Parent node (initialized by binding)
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
        return cloneNode(this);
    }

    /**
     * Creates a shallow data-only clone of this node.
     *
     * @virtual
     * @internal
     */
    protected cloneCore(): AstNode {
        const clone = new AstNode(this.kind, cloneData(this), this._nodeConstructor, this.flags);
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
        return shadowNode(this);
    }

    /**
     * Creates a new data object using this object as the prototype.
     * This is primarily used for the purpose of redirecting source files.
     *
     * @virtual
     * @internal
     */
    protected shadowCore(): AstNode {
        const clone = new AstNode(this.kind, shadowData(this), this._nodeConstructor, this.flags);
        clone._extra = Object.create(this.extra);
        clone.parent = this.parent;
        clone.pos = this.pos;
        clone.end = this.end;
        return clone;
    }

    static Token<K extends TokenSyntaxKind>(kind: K): AstToken<K> {
        const makeToken = AstNode._tokenFactoryMap.get(kind);
        return (makeToken ? makeToken() : new AstNode(kind, new AstTokenData(), AnyNode /*Token<K>*/)) as AstToken<K>;
    }

    private static _tokenFactoryMap = new Map<SyntaxKind, () => AstToken>([
        // [SyntaxKind.NumericLiteral, this.NumericLiteral],
        // [SyntaxKind.BigIntLiteral, this.BigIntLiteral],
        // [SyntaxKind.StringLiteral, this.StringLiteral],
        // [SyntaxKind.JsxText, this.JsxText],
        // [SyntaxKind.RegularExpressionLiteral, this.RegularExpressionLiteral],
        // [SyntaxKind.NoSubstitutionTemplateLiteral, this.NoSubstitutionTemplateLiteral],
        // [SyntaxKind.TemplateHead, this.TemplateHead],
        // [SyntaxKind.TemplateMiddle, this.TemplateMiddle],
        // [SyntaxKind.TemplateTail, this.TemplateTail],
        // [SyntaxKind.Identifier, this.Identifier],
        // [SyntaxKind.PrivateIdentifier, this.PrivateIdentifier],
        // [SyntaxKind.EndOfFileToken, this.EndOfFileToken],
        // [SyntaxKind.ThisKeyword, this.ThisExpression],
        // [SyntaxKind.SuperKeyword, this.SuperExpression],
        // [SyntaxKind.ImportKeyword, this.ImportExpression],
        // [SyntaxKind.NullKeyword, this.NullLiteral],
        // [SyntaxKind.TrueKeyword, this.TrueLiteral],
        // [SyntaxKind.FalseKeyword, this.FalseLiteral],
    ]);

    static EndOfFileToken(): AstEndOfFileToken {
        return new AstNode(SyntaxKind.EndOfFileToken, new AstEndOfFileTokenData(), AnyNode /* EndOfFileToken */);
    }
    static ThisExpression(): AstThisExpression {
        return new AstNode(SyntaxKind.ThisKeyword, new AstThisExpressionData(), AnyNode /* ThisExpression */);
    }
    static SuperExpression(): AstSuperExpression {
        return new AstNode(SyntaxKind.SuperKeyword, new AstSuperExpressionData(), AnyNode /* SuperExpression */);
    }
    static ImportExpression(): AstImportExpression {
        return new AstNode(SyntaxKind.ImportKeyword, new AstTokenData(), AnyNode /* ImportExpression */);
    }
    static NullLiteral(): AstNullLiteral {
        return new AstNode(SyntaxKind.NullKeyword, new AstTokenData(), AnyNode /* NullLiteral */);
    }
    static TrueLiteral(): AstTrueLiteral {
        return new AstNode(SyntaxKind.TrueKeyword, new AstTokenData(), AnyNode /* TrueLiteral */);
    }
    static FalseLiteral(): AstFalseLiteral {
        return new AstNode(SyntaxKind.FalseKeyword, new AstTokenData(), AnyNode /* FalseLiteral */);
    }
    static Identifier(): AstIdentifier {
        return new AstNode(SyntaxKind.Identifier, new AstIdentifierData(), AnyNode /* Identifier */);
    }
    static PrivateIdentifier(): AstPrivateIdentifier {
        return new AstNode(SyntaxKind.PrivateIdentifier, new AstPrivateIdentifierData(), AnyNode /* PrivateIdentifier */);
    }
    static QualifiedName(): AstQualifiedName {
        return new AstNode(SyntaxKind.QualifiedName, new AstQualifiedNameData(), AnyNode /* QualifiedName */);
    }
    static ComputedPropertyName(): AstComputedPropertyName {
        return new AstNode(SyntaxKind.ComputedPropertyName, new AstComputedPropertyNameData(), AnyNode /* ComputedPropertyName */);
    }
    static TypeParameterDeclaration(): AstTypeParameterDeclaration {
        return new AstNode(SyntaxKind.TypeParameter, new AstTypeParameterDeclarationData(), AnyNode /* TypeParameterDeclaration */);
    }
    static ParameterDeclaration(): AstParameterDeclaration {
        return new AstNode(SyntaxKind.Parameter, new AstParameterDeclarationData(), AnyNode /* ParameterDeclaration */);
    }
    static Decorator(): AstDecorator {
        return new AstNode(SyntaxKind.Decorator, new AstDecoratorData(), AnyNode /* Decorator */);
    }
    static PropertySignature(): AstPropertySignature {
        return new AstNode(SyntaxKind.PropertySignature, new AstPropertySignatureData(), AnyNode /* PropertySignature */);
    }
    static CallSignatureDeclaration(): AstCallSignatureDeclaration {
        return new AstNode(SyntaxKind.CallSignature, new AstCallSignatureDeclarationData(), AnyNode /* CallSignatureDeclaration */);
    }
    static ConstructSignatureDeclaration(): AstConstructSignatureDeclaration {
        return new AstNode(SyntaxKind.ConstructSignature, new AstConstructSignatureDeclarationData(), AnyNode /* ConstructSignatureDeclaration */);
    }
    static VariableDeclaration(): AstVariableDeclaration {
        return new AstNode(SyntaxKind.VariableDeclaration, new AstVariableDeclarationData(), AnyNode /* VariableDeclaration */);
    }
    static VariableDeclarationList(): AstVariableDeclarationList {
        return new AstNode(SyntaxKind.VariableDeclarationList, new AstVariableDeclarationListData(), AnyNode /* VariableDeclarationList */);
    }
    static BindingElement(): AstBindingElement {
        return new AstNode(SyntaxKind.BindingElement, new AstBindingElementData(), AnyNode /* BindingElement */);
    }
    static PropertyDeclaration(): AstPropertyDeclaration {
        return new AstNode(SyntaxKind.PropertyDeclaration, new AstPropertyDeclarationData(), AnyNode /* PropertyDeclaration */);
    }
    static PropertyAssignment(): AstPropertyAssignment {
        return new AstNode(SyntaxKind.PropertyAssignment, new AstPropertyAssignmentData(), AnyNode /* PropertyAssignment */);
    }
    static ShorthandPropertyAssignment(): AstShorthandPropertyAssignment {
        return new AstNode(SyntaxKind.ShorthandPropertyAssignment, new AstShorthandPropertyAssignmentData(), AnyNode /* ShorthandPropertyAssignment */);
    }
    static SpreadAssignment(): AstSpreadAssignment {
        return new AstNode(SyntaxKind.SpreadAssignment, new AstSpreadAssignmentData(), AnyNode /* SpreadAssignment */);
    }
    static ObjectBindingPattern(): AstObjectBindingPattern {
        return new AstNode(SyntaxKind.ObjectBindingPattern, new AstObjectBindingPatternData(), AnyNode /* ObjectBindingPattern */);
    }
    static ArrayBindingPattern(): AstArrayBindingPattern {
        return new AstNode(SyntaxKind.ArrayBindingPattern, new AstArrayBindingPatternData(), AnyNode /* ArrayBindingPattern */);
    }
    static FunctionDeclaration(): AstFunctionDeclaration {
        return new AstNode(SyntaxKind.FunctionDeclaration, new AstFunctionDeclarationData(), AnyNode /* FunctionDeclaration */);
    }
    static MethodSignature(): AstMethodSignature {
        return new AstNode(SyntaxKind.MethodSignature, new AstMethodSignatureData(), AnyNode /* MethodSignature */);
    }
    static MethodDeclaration(): AstMethodDeclaration {
        return new AstNode(SyntaxKind.MethodDeclaration, new AstMethodDeclarationData(), AnyNode /* MethodDeclaration */);
    }
    static ConstructorDeclaration(): AstConstructorDeclaration {
        return new AstNode(SyntaxKind.Constructor, new AstConstructorDeclarationData(), AnyNode /* ConstructorDeclaration */);
    }
    static SemicolonClassElement(): AstSemicolonClassElement {
        return new AstNode(SyntaxKind.SemicolonClassElement, new AstSemicolonClassElementData(), AnyNode as any /* SemicolonClassElement */);
    }
    static GetAccessorDeclaration(): AstGetAccessorDeclaration {
        return new AstNode(SyntaxKind.GetAccessor, new AstGetAccessorDeclarationData(), AnyNode /* GetAccessorDeclaration */);
    }
    static SetAccessorDeclaration(): AstSetAccessorDeclaration {
        return new AstNode(SyntaxKind.SetAccessor, new AstSetAccessorDeclarationData(), AnyNode /* SetAccessorDeclaration */);
    }
    static IndexSignatureDeclaration(): AstIndexSignatureDeclaration {
        return new AstNode(SyntaxKind.IndexSignature, new AstIndexSignatureDeclarationData(), AnyNode /* IndexSignatureDeclaration */);
    }
    static ClassStaticBlockDeclaration(): AstClassStaticBlockDeclaration {
        return new AstNode(SyntaxKind.ClassStaticBlockDeclaration, new AstClassStaticBlockDeclarationData(), AnyNode /* ClassStaticBlockDeclaration */);
    }
    /** @deprecated */
    static ImportTypeAssertionContainer(): AstImportTypeAssertionContainer {
        return new AstNode(SyntaxKind.ImportTypeAssertionContainer, new AstImportTypeAssertionContainerData(), AnyNode /* ImportTypeAssertionContainer */);
    }
    static ImportTypeNode(): AstImportTypeNode {
        return new AstNode(SyntaxKind.ImportType, new AstImportTypeNodeData(), AnyNode /* ImportTypeNode */);
    }
    static ThisTypeNode(): AstThisTypeNode {
        return new AstNode(SyntaxKind.ThisType, new AstThisTypeNodeData(), AnyNode /* ThisTypeNode */);
    }
    static FunctionTypeNode(): AstFunctionTypeNode {
        return new AstNode(SyntaxKind.FunctionType, new AstFunctionTypeNodeData(), AnyNode /* FunctionTypeNode */);
    }
    static ConstructorTypeNode(): AstConstructorTypeNode {
        return new AstNode(SyntaxKind.ConstructorType, new AstConstructorTypeNodeData(), AnyNode /* ConstructorTypeNode */);
    }
    static TypeReferenceNode(): AstTypeReferenceNode {
        return new AstNode(SyntaxKind.TypeReference, new AstTypeReferenceNodeData(), AnyNode /* TypeReferenceNode */);
    }
    static TypePredicateNode(): AstTypePredicateNode {
        return new AstNode(SyntaxKind.TypePredicate, new AstTypePredicateNodeData(), AnyNode /* TypePredicateNode */);
    }
    static TypeQueryNode(): AstTypeQueryNode {
        return new AstNode(SyntaxKind.TypeQuery, new AstTypeQueryNodeData(), AnyNode /* TypeQueryNode */);
    }
    static TypeLiteralNode(): AstTypeLiteralNode {
        return new AstNode(SyntaxKind.TypeLiteral, new AstTypeLiteralNodeData(), AnyNode /* TypeLiteralNode */);
    }
    static ArrayTypeNode(): AstArrayTypeNode {
        return new AstNode(SyntaxKind.ArrayType, new AstArrayTypeNodeData(), AnyNode /* ArrayTypeNode */);
    }
    static TupleTypeNode(): AstTupleTypeNode {
        return new AstNode(SyntaxKind.TupleType, new AstTupleTypeNodeData(), AnyNode /* TupleTypeNode */);
    }
    static NamedTupleMember(): AstNamedTupleMember {
        return new AstNode(SyntaxKind.NamedTupleMember, new AstNamedTupleMemberData(), AnyNode /* NamedTupleMember */);
    }
    static OptionalTypeNode(): AstOptionalTypeNode {
        return new AstNode(SyntaxKind.OptionalType, new AstOptionalTypeNodeData(), AnyNode /* OptionalTypeNode */);
    }
    static RestTypeNode(): AstRestTypeNode {
        return new AstNode(SyntaxKind.RestType, new AstRestTypeNodeData(), AnyNode /* RestTypeNode */);
    }
    static UnionTypeNode(): AstUnionTypeNode {
        return new AstNode(SyntaxKind.UnionType, new AstUnionTypeNodeData(), AnyNode /* UnionTypeNode */);
    }
    static IntersectionTypeNode(): AstIntersectionTypeNode {
        return new AstNode(SyntaxKind.IntersectionType, new AstIntersectionTypeNodeData(), AnyNode /* IntersectionTypeNode */);
    }
    static ConditionalTypeNode(): AstConditionalTypeNode {
        return new AstNode(SyntaxKind.ConditionalType, new AstConditionalTypeNodeData(), AnyNode /* ConditionalTypeNode */);
    }
    static InferTypeNode(): AstInferTypeNode {
        return new AstNode(SyntaxKind.InferType, new AstInferTypeNodeData(), AnyNode /* InferTypeNode */);
    }
    static ParenthesizedTypeNode(): AstParenthesizedTypeNode {
        return new AstNode(SyntaxKind.ParenthesizedType, new AstParenthesizedTypeNodeData(), AnyNode /* ParenthesizedTypeNode */);
    }
    static TypeOperatorNode(): AstTypeOperatorNode {
        return new AstNode(SyntaxKind.TypeOperator, new AstTypeOperatorNodeData(), AnyNode /* TypeOperatorNode */);
    }
    static IndexedAccessTypeNode(): AstIndexedAccessTypeNode {
        return new AstNode(SyntaxKind.IndexedAccessType, new AstIndexedAccessTypeNodeData(), AnyNode /* IndexedAccessTypeNode */);
    }
    static MappedTypeNode(): AstMappedTypeNode {
        return new AstNode(SyntaxKind.MappedType, new AstMappedTypeNodeData(), AnyNode /* MappedTypeNode */);
    }
    static LiteralTypeNode(): AstLiteralTypeNode {
        return new AstNode(SyntaxKind.LiteralType, new AstLiteralTypeNodeData(), AnyNode /* LiteralTypeNode */);
    }
    static StringLiteral(): AstStringLiteral {
        return new AstNode(SyntaxKind.StringLiteral, new AstStringLiteralData(), AnyNode /* StringLiteral */);
    }
    static TemplateLiteralTypeNode(): AstTemplateLiteralTypeNode {
        return new AstNode(SyntaxKind.TemplateLiteralType, new AstTemplateLiteralTypeNodeData(), AnyNode /* TemplateLiteralTypeNode */);
    }
    static TemplateLiteralTypeSpan(): AstTemplateLiteralTypeSpan {
        return new AstNode(SyntaxKind.TemplateLiteralTypeSpan, new AstTemplateLiteralTypeSpanData(), AnyNode /* TemplateLiteralTypeSpan */);
    }
    static OmittedExpression(): AstOmittedExpression {
        return new AstNode(SyntaxKind.OmittedExpression, new AstOmittedExpressionData(), AnyNode /* OmittedExpression */);
    }
    static PrefixUnaryExpression(): AstPrefixUnaryExpression {
        return new AstNode(SyntaxKind.PrefixUnaryExpression, new AstPrefixUnaryExpressionData(), AnyNode /* PrefixUnaryExpression */);
    }
    static PostfixUnaryExpression(): AstPostfixUnaryExpression {
        return new AstNode(SyntaxKind.PostfixUnaryExpression, new AstPostfixUnaryExpressionData(), AnyNode /* PostfixUnaryExpression */);
    }
    static DeleteExpression(): AstDeleteExpression {
        return new AstNode(SyntaxKind.DeleteExpression, new AstDeleteExpressionData(), AnyNode /* DeleteExpression */);
    }
    static TypeOfExpression(): AstTypeOfExpression {
        return new AstNode(SyntaxKind.TypeOfExpression, new AstTypeOfExpressionData(), AnyNode /* TypeOfExpression */);
    }
    static VoidExpression(): AstVoidExpression {
        return new AstNode(SyntaxKind.VoidExpression, new AstVoidExpressionData(), AnyNode /* VoidExpression */);
    }
    static AwaitExpression(): AstAwaitExpression {
        return new AstNode(SyntaxKind.AwaitExpression, new AstAwaitExpressionData(), AnyNode /* AwaitExpression */);
    }
    static YieldExpression(): AstYieldExpression {
        return new AstNode(SyntaxKind.YieldExpression, new AstYieldExpressionData(), AnyNode /* YieldExpression */);
    }
    static BinaryExpression(): AstBinaryExpression {
        return new AstNode(SyntaxKind.BinaryExpression, new AstBinaryExpressionData(), AnyNode /* BinaryExpression */);
    }
    static ConditionalExpression(): AstConditionalExpression {
        return new AstNode(SyntaxKind.ConditionalExpression, new AstConditionalExpressionData(), AnyNode /* ConditionalExpression */);
    }
    static FunctionExpression(): AstFunctionExpression {
        return new AstNode(SyntaxKind.FunctionExpression, new AstFunctionExpressionData(), AnyNode /* FunctionExpression */);
    }
    static ArrowFunction(): AstArrowFunction {
        return new AstNode(SyntaxKind.ArrowFunction, new AstArrowFunctionData(), AnyNode /* ArrowFunction */);
    }
    static RegularExpressionLiteral(): AstRegularExpressionLiteral {
        return new AstNode(SyntaxKind.RegularExpressionLiteral, new AstRegularExpressionLiteralData(), AnyNode /* RegularExpressionLiteral */);
    }
    static NoSubstitutionTemplateLiteral(): AstNoSubstitutionTemplateLiteral {
        return new AstNode(SyntaxKind.NoSubstitutionTemplateLiteral, new AstNoSubstitutionTemplateLiteralData(), AnyNode /* NoSubstitutionTemplateLiteral */);
    }
    static NumericLiteral(): AstNumericLiteral {
        return new AstNode(SyntaxKind.NumericLiteral, new AstNumericLiteralData(), AnyNode /* NumericLiteral */);
    }
    static BigIntLiteral(): AstBigIntLiteral {
        return new AstNode(SyntaxKind.BigIntLiteral, new AstBigIntLiteralData(), AnyNode /* BigIntLiteral */);
    }
    static TemplateHead(): AstTemplateHead {
        return new AstNode(SyntaxKind.TemplateHead, new AstTemplateHeadData(), AnyNode /* TemplateHead */);
    }
    static TemplateMiddle(): AstTemplateMiddle {
        return new AstNode(SyntaxKind.TemplateMiddle, new AstTemplateMiddleData(), AnyNode /* TemplateMiddle */);
    }
    static TemplateTail(): AstTemplateTail {
        return new AstNode(SyntaxKind.TemplateTail, new AstTemplateTailData(), AnyNode /* TemplateTail */);
    }
    static TemplateExpression(): AstTemplateExpression {
        return new AstNode(SyntaxKind.TemplateExpression, new AstTemplateExpressionData(), AnyNode /* TemplateExpression */);
    }
    static TemplateSpan(): AstTemplateSpan {
        return new AstNode(SyntaxKind.TemplateSpan, new AstTemplateSpanData(), AnyNode /* TemplateSpan */);
    }
    static ParenthesizedExpression(): AstParenthesizedExpression {
        return new AstNode(SyntaxKind.ParenthesizedExpression, new AstParenthesizedExpressionData(), AnyNode /* ParenthesizedExpression */);
    }
    static ArrayLiteralExpression(): AstArrayLiteralExpression {
        return new AstNode(SyntaxKind.ArrayLiteralExpression, new AstArrayLiteralExpressionData(), AnyNode /* ArrayLiteralExpression */);
    }
    static SpreadElement(): AstSpreadElement {
        return new AstNode(SyntaxKind.SpreadElement, new AstSpreadElementData(), AnyNode /* SpreadElement */);
    }
    static ObjectLiteralExpression(): AstObjectLiteralExpression {
        return new AstNode(SyntaxKind.ObjectLiteralExpression, new AstObjectLiteralExpressionData(), AnyNode /* ObjectLiteralExpression */);
    }
    static PropertyAccessExpression(): AstPropertyAccessExpression {
        return new AstNode(SyntaxKind.PropertyAccessExpression, new AstPropertyAccessExpressionData(), AnyNode /* PropertyAccessExpression */);
    }
    static PropertyAccessChain(): AstPropertyAccessChain {
        return new AstNode(SyntaxKind.PropertyAccessExpression, new AstPropertyAccessExpressionData(), AnyNode as any /* PropertyAccessExpression */, NodeFlags.OptionalChain) as AstPropertyAccessChain;
    }
    static ElementAccessExpression(): AstElementAccessExpression {
        return new AstNode(SyntaxKind.ElementAccessExpression, new AstElementAccessExpressionData(), AnyNode /* ElementAccessExpression */);
    }
    static ElementAccessChain(): AstElementAccessChain {
        return new AstNode(SyntaxKind.ElementAccessExpression, new AstElementAccessExpressionData(), AnyNode as any /* ElementAccessExpression */, NodeFlags.OptionalChain) as AstElementAccessChain;
    }
    static CallExpression(): AstCallExpression {
        return new AstNode(SyntaxKind.CallExpression, new AstCallExpressionData(), AnyNode /* CallExpression */);
    }
    static CallChain(): AstCallChain {
        return new AstNode(SyntaxKind.CallExpression, new AstCallExpressionData(), AnyNode as any /*CallExpression*/, NodeFlags.OptionalChain) as AstCallChain;
    }
    static ExpressionWithTypeArguments(): AstExpressionWithTypeArguments {
        return new AstNode(SyntaxKind.ExpressionWithTypeArguments, new AstExpressionWithTypeArgumentsData(), AnyNode /* ExpressionWithTypeArguments */);
    }
    static NewExpression(): AstNewExpression {
        return new AstNode(SyntaxKind.NewExpression, new AstNewExpressionData(), AnyNode /* NewExpression */);
    }
    static TaggedTemplateExpression(): AstTaggedTemplateExpression {
        return new AstNode(SyntaxKind.TaggedTemplateExpression, new AstTaggedTemplateExpressionData(), AnyNode /* TaggedTemplateExpression */);
    }
    static AsExpression(): AstAsExpression {
        return new AstNode(SyntaxKind.AsExpression, new AstAsExpressionData(), AnyNode /* AsExpression */);
    }
    static TypeAssertion(): AstTypeAssertion {
        return new AstNode(SyntaxKind.TypeAssertionExpression, new AstTypeAssertionExpressionData(), AnyNode /* TypeAssertionExpression */);
    }
    static SatisfiesExpression(): AstSatisfiesExpression {
        return new AstNode(SyntaxKind.SatisfiesExpression, new AstSatisfiesExpressionData(), AnyNode /* SatisfiesExpression */);
    }
    static NonNullExpression(): AstNonNullExpression {
        return new AstNode(SyntaxKind.NonNullExpression, new AstNonNullExpressionData(), AnyNode /* NonNullExpression */);
    }
    static NonNullChain(): AstNonNullChain {
        return new AstNode(SyntaxKind.NonNullExpression, new AstNonNullExpressionData(), AnyNode as any /* NonNullExpression */, NodeFlags.OptionalChain) as AstNonNullChain;
    }
    static MetaProperty(): AstMetaProperty {
        return new AstNode(SyntaxKind.MetaProperty, new AstMetaPropertyData(), AnyNode /* MetaProperty */);
    }
    static JsxElement(): AstJsxElement {
        return new AstNode(SyntaxKind.JsxElement, new AstJsxElementData(), AnyNode /* JsxElement */);
    }
    static JsxAttributes(): AstJsxAttributes {
        return new AstNode(SyntaxKind.JsxAttributes, new AstJsxAttributesData(), AnyNode /* JsxAttributes */);
    }
    static JsxNamespacedName(): AstJsxNamespacedName {
        return new AstNode(SyntaxKind.JsxNamespacedName, new AstJsxNamespacedNameData(), AnyNode /* JsxNamespacedName */);
    }
    static JsxOpeningElement(): AstJsxOpeningElement {
        return new AstNode(SyntaxKind.JsxOpeningElement, new AstJsxOpeningElementData(), AnyNode /* JsxOpeningElement */);
    }
    static JsxSelfClosingElement(): AstJsxSelfClosingElement {
        return new AstNode(SyntaxKind.JsxSelfClosingElement, new AstJsxSelfClosingElementData(), AnyNode /* JsxSelfClosingElement */);
    }
    static JsxFragment(): AstJsxFragment {
        return new AstNode(SyntaxKind.JsxFragment, new AstJsxFragmentData(), AnyNode /* JsxFragment */);
    }
    static JsxOpeningFragment(): AstJsxOpeningFragment {
        return new AstNode(SyntaxKind.JsxOpeningFragment, new AstJsxOpeningFragmentData(), AnyNode /* JsxOpeningFragment */);
    }
    static JsxClosingFragment(): AstJsxClosingFragment {
        return new AstNode(SyntaxKind.JsxClosingFragment, new AstJsxClosingFragmentData(), AnyNode /* JsxClosingFragment */);
    }
    static JsxAttribute(): AstJsxAttribute {
        return new AstNode(SyntaxKind.JsxAttribute, new AstJsxAttributeData(), AnyNode /* JsxAttribute */);
    }
    static JsxSpreadAttribute(): AstJsxSpreadAttribute {
        return new AstNode(SyntaxKind.JsxSpreadAttribute, new AstJsxSpreadAttributeData(), AnyNode as any /* JsxSpreadAttribute */);
    }
    static JsxClosingElement(): AstJsxClosingElement {
        return new AstNode(SyntaxKind.JsxClosingElement, new AstJsxClosingElementData(), AnyNode /* JsxClosingElement */);
    }
    static JsxExpression(): AstJsxExpression {
        return new AstNode(SyntaxKind.JsxExpression, new AstJsxExpressionData(), AnyNode /* JsxExpression */);
    }
    static JsxText(): AstJsxText {
        return new AstNode(SyntaxKind.JsxText, new AstJsxTextData(), AnyNode /* JsxText */);
    }
    static EmptyStatement(): AstEmptyStatement {
        return new AstNode(SyntaxKind.EmptyStatement, new AstEmptyStatementData(), AnyNode /* EmptyStatement */);
    }
    static DebuggerStatement(): AstDebuggerStatement {
        return new AstNode(SyntaxKind.DebuggerStatement, new AstDebuggerStatementData(), AnyNode /* DebuggerStatement */);
    }
    static MissingDeclaration(): AstMissingDeclaration {
        return new AstNode(SyntaxKind.MissingDeclaration, new AstMissingDeclarationData(), AnyNode /* MissingDeclaration */);
    }
    static Block(): AstBlock {
        return new AstNode(SyntaxKind.Block, new AstBlockData(), AnyNode /* Block */);
    }
    static VariableStatement(): AstVariableStatement {
        return new AstNode(SyntaxKind.VariableStatement, new AstVariableStatementData(), AnyNode /* VariableStatement */);
    }
    static ExpressionStatement(): AstExpressionStatement {
        return new AstNode(SyntaxKind.ExpressionStatement, new AstExpressionStatementData(), AnyNode /* ExpressionStatement */);
    }
    static IfStatement(): AstIfStatement {
        return new AstNode(SyntaxKind.IfStatement, new AstIfStatementData(), AnyNode /* IfStatement */);
    }
    static DoStatement(): AstDoStatement {
        return new AstNode(SyntaxKind.DoStatement, new AstDoStatementData(), AnyNode /* DoStatement */);
    }
    static WhileStatement(): AstWhileStatement {
        return new AstNode(SyntaxKind.WhileStatement, new AstWhileStatementData(), AnyNode /* WhileStatement */);
    }
    static ForStatement(): AstForStatement {
        return new AstNode(SyntaxKind.ForStatement, new AstForStatementData(), AnyNode /* ForStatement */);
    }
    static ForInStatement(): AstForInStatement {
        return new AstNode(SyntaxKind.ForInStatement, new AstForInStatementData(), AnyNode /* ForInStatement */);
    }
    static ForOfStatement(): AstForOfStatement {
        return new AstNode(SyntaxKind.ForOfStatement, new AstForOfStatementData(), AnyNode /* ForOfStatement */);
    }
    static BreakStatement(): AstBreakStatement {
        return new AstNode(SyntaxKind.BreakStatement, new AstBreakStatementData(), AnyNode /* BreakStatement */);
    }
    static ContinueStatement(): AstContinueStatement {
        return new AstNode(SyntaxKind.ContinueStatement, new AstContinueStatementData(), AnyNode /* ContinueStatement */);
    }
    static ReturnStatement(): AstReturnStatement {
        return new AstNode(SyntaxKind.ReturnStatement, new AstReturnStatementData(), AnyNode /* ReturnStatement */);
    }
    static WithStatement(): AstWithStatement {
        return new AstNode(SyntaxKind.WithStatement, new AstWithStatementData(), AnyNode /* WithStatement */);
    }
    static SwitchStatement(): AstSwitchStatement {
        return new AstNode(SyntaxKind.SwitchStatement, new AstSwitchStatementData(), AnyNode /* SwitchStatement */);
    }
    static CaseBlock(): AstCaseBlock {
        return new AstNode(SyntaxKind.CaseBlock, new AstCaseBlockData(), AnyNode /* CaseBlock */);
    }
    static CaseClause(): AstCaseClause {
        return new AstNode(SyntaxKind.CaseClause, new AstCaseClauseData(), AnyNode /* CaseClause */);
    }
    static DefaultClause(): AstDefaultClause {
        return new AstNode(SyntaxKind.DefaultClause, new AstDefaultClauseData(), AnyNode /* DefaultClause */);
    }
    static LabeledStatement(): AstLabeledStatement {
        return new AstNode(SyntaxKind.LabeledStatement, new AstLabeledStatementData(), AnyNode /* LabeledStatement */);
    }
    static ThrowStatement(): AstThrowStatement {
        return new AstNode(SyntaxKind.ThrowStatement, new AstThrowStatementData(), AnyNode /* ThrowStatement */);
    }
    static TryStatement(): AstTryStatement {
        return new AstNode(SyntaxKind.TryStatement, new AstTryStatementData(), AnyNode /* TryStatement */);
    }
    static CatchClause(): AstCatchClause {
        return new AstNode(SyntaxKind.CatchClause, new AstCatchClauseData(), AnyNode /* CatchClause */);
    }
    static ClassDeclaration(): AstClassDeclaration {
        return new AstNode(SyntaxKind.ClassDeclaration, new AstClassDeclarationData(), AnyNode /* ClassDeclaration */);
    }
    static ClassExpression(): AstClassExpression {
        return new AstNode(SyntaxKind.ClassExpression, new AstClassExpressionData(), AnyNode /* ClassExpression */);
    }
    static InterfaceDeclaration(): AstInterfaceDeclaration {
        return new AstNode(SyntaxKind.InterfaceDeclaration, new AstInterfaceDeclarationData(), AnyNode /* InterfaceDeclaration */);
    }
    static HeritageClause(): AstHeritageClause {
        return new AstNode(SyntaxKind.HeritageClause, new AstHeritageClauseData(), AnyNode /* HeritageClause */);
    }
    static TypeAliasDeclaration(): AstTypeAliasDeclaration {
        return new AstNode(SyntaxKind.TypeAliasDeclaration, new AstTypeAliasDeclarationData(), AnyNode /* TypeAliasDeclaration */);
    }
    static EnumMember(): AstEnumMember {
        return new AstNode(SyntaxKind.EnumMember, new AstEnumMemberData(), AnyNode /* EnumMember */);
    }
    static EnumDeclaration(): AstEnumDeclaration {
        return new AstNode(SyntaxKind.EnumDeclaration, new AstEnumDeclarationData(), AnyNode /* EnumDeclaration */);
    }
    static ModuleDeclaration(): AstModuleDeclaration {
        return new AstNode(SyntaxKind.ModuleDeclaration, new AstModuleDeclarationData(), AnyNode /* ModuleDeclaration */);
    }
    static ModuleBlock(): AstModuleBlock {
        return new AstNode(SyntaxKind.ModuleBlock, new AstModuleBlockData(), AnyNode /* ModuleBlock */);
    }
    static ImportEqualsDeclaration(): AstImportEqualsDeclaration {
        return new AstNode(SyntaxKind.ImportEqualsDeclaration, new AstImportEqualsDeclarationData(), AnyNode /* ImportEqualsDeclaration */);
    }
    static ExternalModuleReference(): AstExternalModuleReference {
        return new AstNode(SyntaxKind.ExternalModuleReference, new AstExternalModuleReferenceData(), AnyNode /* ExternalModuleReference */);
    }
    static ImportDeclaration(): AstImportDeclaration {
        return new AstNode(SyntaxKind.ImportDeclaration, new AstImportDeclarationData(), AnyNode /* ImportDeclaration */);
    }
    static ImportClause(): AstImportClause {
        return new AstNode(SyntaxKind.ImportClause, new AstImportClauseData(), AnyNode /* ImportClause */);
    }
    static ImportAttribute(): AstImportAttribute {
        return new AstNode(SyntaxKind.ImportAttribute, new AstImportAttributeData(), AnyNode /* ImportAttribute */);
    }
    static ImportAttributes(): AstImportAttributes {
        return new AstNode(SyntaxKind.ImportAttributes, new AstImportAttributesData(), AnyNode /* ImportAttributes */);
    }
    static NamespaceImport(): AstNamespaceImport {
        return new AstNode(SyntaxKind.NamespaceImport, new AstNamespaceImportData(), AnyNode /* NamespaceImport */);
    }
    static NamespaceExport(): AstNamespaceExport {
        return new AstNode(SyntaxKind.NamespaceExport, new AstNamespaceExportData(), AnyNode /* NamespaceExport */);
    }
    static NamespaceExportDeclaration(): AstNamespaceExportDeclaration {
        return new AstNode(SyntaxKind.NamespaceExportDeclaration, new AstNamespaceExportDeclarationData(), AnyNode /* NamespaceExportDeclaration */);
    }
    static ExportDeclaration(): AstExportDeclaration {
        return new AstNode(SyntaxKind.ExportDeclaration, new AstExportDeclarationData(), AnyNode /* ExportDeclaration */);
    }
    static NamedImports(): AstNamedImports {
        return new AstNode(SyntaxKind.NamedImports, new AstNamedImportsData(), AnyNode /* NamedImports */);
    }
    static NamedExports(): AstNamedExports {
        return new AstNode(SyntaxKind.NamedExports, new AstNamedExportsData(), AnyNode /* NamedExports */);
    }
    static ImportSpecifier(): AstImportSpecifier {
        return new AstNode(SyntaxKind.ImportSpecifier, new AstImportSpecifierData(), AnyNode /* ImportSpecifier */);
    }
    static ExportSpecifier(): AstExportSpecifier {
        return new AstNode(SyntaxKind.ExportSpecifier, new AstExportSpecifierData(), AnyNode /* ExportSpecifier */);
    }
    static ExportAssignment(): AstExportAssignment {
        return new AstNode(SyntaxKind.ExportAssignment, new AstExportAssignmentData(), AnyNode /* ExportAssignment */);
    }
    static JSDocTypeExpression(): AstJSDocTypeExpression {
        return new AstNode(SyntaxKind.JSDocTypeExpression, new AstJSDocTypeExpressionData(), AnyNode /* JSDocTypeExpression */);
    }
    static JSDocNameReference(): AstJSDocNameReference {
        return new AstNode(SyntaxKind.JSDocNameReference, new AstJSDocNameReferenceData(), AnyNode /* JSDocNameReference */);
    }
    static JSDocMemberName(): AstJSDocMemberName {
        return new AstNode(SyntaxKind.JSDocMemberName, new AstJSDocMemberNameData(), AnyNode /* JSDocMemberName */);
    }
    static JSDocAllType(): AstJSDocAllType {
        return new AstNode(SyntaxKind.JSDocAllType, new AstJSDocAllTypeData(), AnyNode /* JSDocAllType */);
    }
    static JSDocUnknownType(): AstJSDocUnknownType {
        return new AstNode(SyntaxKind.JSDocUnknownType, new AstJSDocUnknownTypeData(), AnyNode /* JSDocUnknownType */);
    }
    static JSDocNonNullableType(): AstJSDocNonNullableType {
        return new AstNode(SyntaxKind.JSDocNonNullableType, new AstJSDocNonNullableTypeData(), AnyNode /* JSDocNonNullableType */);
    }
    static JSDocNullableType(): AstJSDocNullableType {
        return new AstNode(SyntaxKind.JSDocNullableType, new AstJSDocNullableTypeData(), AnyNode /* JSDocNullableType */);
    }
    static JSDocOptionalType(): AstJSDocOptionalType {
        return new AstNode(SyntaxKind.JSDocOptionalType, new AstJSDocOptionalTypeData(), AnyNode /* JSDocOptionalType */);
    }
    static JSDocFunctionType(): AstJSDocFunctionType {
        return new AstNode(SyntaxKind.JSDocFunctionType, new AstJSDocFunctionTypeData(), AnyNode /* JSDocFunctionType */);
    }
    static JSDocVariadicType(): AstJSDocVariadicType {
        return new AstNode(SyntaxKind.JSDocVariadicType, new AstJSDocVariadicTypeData(), AnyNode /* JSDocVariadicType */);
    }
    static JSDocNamepathType(): AstJSDocNamepathType {
        return new AstNode(SyntaxKind.JSDocNamepathType, new AstJSDocNamepathTypeData(), AnyNode /* JSDocNamepathType */);
    }
    static JSDocNode(): AstJSDoc {
        return new AstNode(SyntaxKind.JSDoc, new AstJSDocData(), AnyNode /* JSDoc */);
    }
    static JSDocLink(): AstJSDocLink {
        return new AstNode(SyntaxKind.JSDocLink, new AstJSDocLinkData(), AnyNode /* JSDocLink */);
    }
    static JSDocLinkCode(): AstJSDocLinkCode {
        return new AstNode(SyntaxKind.JSDocLinkCode, new AstJSDocLinkCodeData(), AnyNode /* JSDocLinkCode */);
    }
    static JSDocLinkPlain(): AstJSDocLinkPlain {
        return new AstNode(SyntaxKind.JSDocLinkPlain, new AstJSDocLinkPlainData(), AnyNode /* JSDocLinkPlain */);
    }
    static JSDocText(): AstJSDocText {
        return new AstNode(SyntaxKind.JSDocText, new AstJSDocTextData(), AnyNode /* JSDocText */);
    }
    static JSDocUnknownTag(): AstJSDocUnknownTag {
        return new AstNode(SyntaxKind.JSDocTag, new AstJSDocUnknownTagData(), AnyNode /* JSDocUnknownTag */);
    }
    static JSDocAugmentsTag(): AstJSDocAugmentsTag {
        return new AstNode(SyntaxKind.JSDocAugmentsTag, new AstJSDocAugmentsTagData(), AnyNode /* JSDocAugmentsTag */);
    }
    static JSDocImplementsTag(): AstJSDocImplementsTag {
        return new AstNode(SyntaxKind.JSDocImplementsTag, new AstJSDocImplementsTagData(), AnyNode /* JSDocImplementsTag */);
    }
    static JSDocAuthorTag(): AstJSDocAuthorTag {
        return new AstNode(SyntaxKind.JSDocAuthorTag, new AstJSDocAuthorTagData(), AnyNode /* JSDocAuthorTag */);
    }
    static JSDocDeprecatedTag(): AstJSDocDeprecatedTag {
        return new AstNode(SyntaxKind.JSDocDeprecatedTag, new AstJSDocDeprecatedTagData(), AnyNode /* JSDocDeprecatedTag */);
    }
    static JSDocClassTag(): AstJSDocClassTag {
        return new AstNode(SyntaxKind.JSDocClassTag, new AstJSDocClassTagData(), AnyNode /* JSDocClassTag */);
    }
    static JSDocPublicTag(): AstJSDocPublicTag {
        return new AstNode(SyntaxKind.JSDocPublicTag, new AstJSDocPublicTagData(), AnyNode /* JSDocPublicTag */);
    }
    static JSDocPrivateTag(): AstJSDocPrivateTag {
        return new AstNode(SyntaxKind.JSDocPrivateTag, new AstJSDocPrivateTagData(), AnyNode /* JSDocPrivateTag */);
    }
    static JSDocProtectedTag(): AstJSDocProtectedTag {
        return new AstNode(SyntaxKind.JSDocProtectedTag, new AstJSDocProtectedTagData(), AnyNode /* JSDocProtectedTag */);
    }
    static JSDocReadonlyTag(): AstJSDocReadonlyTag {
        return new AstNode(SyntaxKind.JSDocReadonlyTag, new AstJSDocReadonlyTagData(), AnyNode /* JSDocReadonlyTag */);
    }
    static JSDocOverrideTag(): AstJSDocOverrideTag {
        return new AstNode(SyntaxKind.JSDocOverrideTag, new AstJSDocOverrideTagData(), AnyNode /* JSDocOverrideTag */);
    }
    static JSDocEnumTag(): AstJSDocEnumTag {
        return new AstNode(SyntaxKind.JSDocEnumTag, new AstJSDocEnumTagData(), AnyNode /* JSDocEnumTag */);
    }
    static JSDocThisTag(): AstJSDocThisTag {
        return new AstNode(SyntaxKind.JSDocThisTag, new AstJSDocThisTagData(), AnyNode /* JSDocThisTag */);
    }
    static JSDocTemplateTag(): AstJSDocTemplateTag {
        return new AstNode(SyntaxKind.JSDocTemplateTag, new AstJSDocTemplateTagData(), AnyNode /* JSDocTemplateTag */);
    }
    static JSDocSeeTag(): AstJSDocSeeTag {
        return new AstNode(SyntaxKind.JSDocSeeTag, new AstJSDocSeeTagData(), AnyNode /* JSDocSeeTag */);
    }
    static JSDocReturnTag(): AstJSDocReturnTag {
        return new AstNode(SyntaxKind.JSDocReturnTag, new AstJSDocReturnTagData(), AnyNode /* JSDocReturnTag */);
    }
    static JSDocTypeTag(): AstJSDocTypeTag {
        return new AstNode(SyntaxKind.JSDocTypeTag, new AstJSDocTypeTagData(), AnyNode /* JSDocTypeTag */);
    }
    static JSDocTypedefTag(): AstJSDocTypedefTag {
        return new AstNode(SyntaxKind.JSDocTypedefTag, new AstJSDocTypedefTagData(), AnyNode /* JSDocTypedefTag */);
    }
    static JSDocCallbackTag(): AstJSDocCallbackTag {
        return new AstNode(SyntaxKind.JSDocCallbackTag, new AstJSDocCallbackTagData(), AnyNode /* JSDocCallbackTag */);
    }
    static JSDocOverloadTag(): AstJSDocOverloadTag {
        return new AstNode(SyntaxKind.JSDocOverloadTag, new AstJSDocOverloadTagData(), AnyNode /* JSDocOverloadTag */);
    }
    static JSDocThrowsTag(): AstJSDocThrowsTag {
        return new AstNode(SyntaxKind.JSDocThrowsTag, new AstJSDocThrowsTagData(), AnyNode /* JSDocThrowsTag */);
    }
    static JSDocSignature(): AstJSDocSignature {
        return new AstNode(SyntaxKind.JSDocSignature, new AstJSDocSignatureData(), AnyNode /* JSDocSignature */);
    }
    static JSDocPropertyTag(): AstJSDocPropertyTag {
        return new AstNode(SyntaxKind.JSDocPropertyTag, new AstJSDocPropertyTagData(), AnyNode /* JSDocPropertyTag */);
    }
    static JSDocParameterTag(): AstJSDocParameterTag {
        return new AstNode(SyntaxKind.JSDocParameterTag, new AstJSDocParameterTagData(), AnyNode /* JSDocParameterTag */);
    }
    static JSDocTypeLiteral(): AstJSDocTypeLiteral {
        return new AstNode(SyntaxKind.JSDocTypeLiteral, new AstJSDocTypeLiteralData(), AnyNode /* JSDocTypeLiteral */);
    }
    static JSDocSatisfiesTag(): AstJSDocSatisfiesTag {
        return new AstNode(SyntaxKind.JSDocSatisfiesTag, new AstJSDocSatisfiesTagData(), AnyNode /* JSDocSatisfiesTag */);
    }
    static JSDocImportTag(): AstJSDocImportTag {
        return new AstNode(SyntaxKind.JSDocImportTag, new AstJSDocImportTagData(), AnyNode /* JSDocImportTag */);
    }
    static SourceFile(): AstSourceFile {
        return new AstNode(SyntaxKind.SourceFile, new AstSourceFileData(), SourceFile);
    }
    static SyntheticExpression(): AstSyntheticExpression {
        return new AstNode(SyntaxKind.SyntheticExpression, new AstSyntheticExpressionData(), AnyNode /* SyntheticExpression */);
    }
    static Bundle(): AstBundle {
        return new AstNode(SyntaxKind.Bundle, new AstBundleData(), Bundle);
    }
    static SyntaxList(): AstSyntaxList {
        return new AstNode(SyntaxKind.SyntaxList, new AstSyntaxListData(), SyntaxList);
    }
    static NotEmittedStatement(): AstNotEmittedStatement {
        return new AstNode(SyntaxKind.NotEmittedStatement, new AstNotEmittedStatementData(), AnyNode /* NotEmittedStatement */);
    }
    static NotEmittedTypeElement(): AstNotEmittedTypeElement {
        return new AstNode(SyntaxKind.NotEmittedTypeElement, new AstNotEmittedTypeElementData(), AnyNode /* NotEmittedTypeElement */);
    }
    static PartiallyEmittedExpression(): AstPartiallyEmittedExpression {
        return new AstNode(SyntaxKind.PartiallyEmittedExpression, new AstPartiallyEmittedExpressionData(), AnyNode /* PartiallyEmittedExpression */);
    }
    static CommaListExpression(): AstCommaListExpression {
        return new AstNode(SyntaxKind.CommaListExpression, new AstCommaListExpressionData(), AnyNode /* CommaListExpression */);
    }
    /** @internal */ static SyntheticReferenceExpression(): AstSyntheticReferenceExpression {
        return new AstNode(SyntaxKind.SyntheticReferenceExpression, new AstSyntheticReferenceExpressionData(), AnyNode /* SyntheticReferenceExpression */);
    }
}

export type AstNodeOneOf<N extends Node> = N extends unknown ? AstNode<N> : never;

// dprint-ignore
export class AstData {
    /** @internal */ computeTransformFlags(node: AstNode): TransformFlags {
        void node;
        return TransformFlags.None;
    }
}

// dprint-ignore
export class AstTypeScriptNodeData extends AstData {
    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.ContainsTypeScript;
    }
}

/** @internal */
export type AstHasFlowNode = AstNodeOneOf<HasFlowNode>;
/** @internal */
export type AstHasEndFlowNode = AstNodeOneOf<HasEndFlowNode>;
/** @internal */
export type AstHasLocals = AstNodeOneOf<HasLocals>;
export type AstHasDecorators = AstNodeOneOf<HasDecorators>;
export type AstHasModifiers = AstNodeOneOf<HasModifiers>;
/** @internal */
export type AstInternalHasModifiers = AstNodeOneOf<InternalHasModifiers>;
/** @internal */
export type AstHasChildren = AstNodeOneOf<HasChildren>;
/** @internal */
export type AstHasSymbol = AstNodeOneOf<HasSymbol>;
/** @internal */
export type AstHasType = AstNodeOneOf<HasType>;
/** @internal */
export type AstHasTypes = AstNodeOneOf<HasTypes>;
/** @internal */
export type AstHasTypeParameters = AstNodeOneOf<HasTypeParameters>;
/** @internal */
export type AstHasTypeArguments = AstNodeOneOf<HasTypeArguments>;
/** @internal */
export type AstInternalHasTypeArguments = AstNodeOneOf<InternalHasTypeArguments>;
/** @internal */
export type AstHasParameters = AstNodeOneOf<HasParameters>;
/** @internal */
export type AstHasBody = AstNodeOneOf<HasBody>;
/** @internal */
export type AstHasQuestionToken = AstNodeOneOf<HasQuestionToken>;
/** @internal */
export type AstHasElements = AstNodeOneOf<HasElements>;
/** @internal */
export type AstHasMembers = AstNodeOneOf<HasMembers>;
/** @internal */
export type AstHasStatement = AstNodeOneOf<HasStatement>;
/** @internal */
export type AstHasStatements = AstNodeOneOf<HasStatements>;
/** @internal */
export type AstHasExclamationToken = AstNodeOneOf<HasExclamationToken>;
/** @internal */
export type AstHasAsteriskToken = AstNodeOneOf<HasAsteriskToken>;
/** @internal */
export type AstHasQuestionDotToken = AstNodeOneOf<HasQuestionDotToken>;
/** @internal */
export type AstHasIsTypeOnly = AstNodeOneOf<HasIsTypeOnly>;
/** @internal */
export type AstHasTagName = AstNodeOneOf<HasTagName>;
/** @internal */
export type AstHasComment = AstNodeOneOf<HasComment>;
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

    static {
        createDataInstanceMap[SyntaxKind.EndOfFileToken] = _ => new this();
    }
}

export type AstThisExpression = AstNode<ThisExpression>;

// dprint-ignore
export class AstThisExpressionData extends AstTokenData {
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    static {
        createDataInstanceMap[SyntaxKind.ThisKeyword] = _ => new this();
    }
}

export type AstSuperExpression = AstNode<SuperExpression>;

// dprint-ignore
export class AstSuperExpressionData extends AstTokenData {
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    static {
        createDataInstanceMap[SyntaxKind.SuperKeyword] = _ => new this();
    }
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

    static {
        createDataInstanceMap[SyntaxKind.Identifier] = _ => new AstIdentifierData();
        copyDataPropertiesMap[SyntaxKind.Identifier] = (data, clone) => {
            Debug.assert(data instanceof this);
            Debug.assert(clone instanceof this);
            clone.escapedText = data.escapedText;
            clone.resolvedSymbol = data.resolvedSymbol;
            clone.jsDoc = data.jsDoc;
            clone.symbol = data.symbol;
            clone.localSymbol = data.localSymbol;
            clone.flowNode = data.flowNode;
        }
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

    static {
        createDataInstanceMap[SyntaxKind.QualifiedName] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.ComputedPropertyName] = _ => new this();
    }
}

export type AstPrivateIdentifier = AstNode<PrivateIdentifier>;

// dprint-ignore
export class AstPrivateIdentifierData extends AstTokenData {
    escapedText: __String = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.ContainsClassFields;
    }

    static {
        createDataInstanceMap[SyntaxKind.PrivateIdentifier] = _ => new this();
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


    static {
        createDataInstanceMap[SyntaxKind.TypeParameter] = _ => new this();
    }
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


    static {
        createDataInstanceMap[SyntaxKind.Parameter] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.Decorator] = _ => new this();
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


    static {
        createDataInstanceMap[SyntaxKind.PropertySignature] = _ => new this();
    }
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


    static {
        createDataInstanceMap[SyntaxKind.CallSignature] = _ => new this();
    }
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


    static {
        createDataInstanceMap[SyntaxKind.ConstructSignature] = _ => new this();
    }
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


    static {
        createDataInstanceMap[SyntaxKind.VariableDeclaration] = _ => new this();
    }
}

export type AstVariableLikeDeclaration = AstNodeOneOf<VariableLikeDeclaration>;

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


    static {
        createDataInstanceMap[SyntaxKind.VariableDeclarationList] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.BindingElement] = _ => new this();
    }
}

export type AstPropertyDeclaration = AstNode<PropertyDeclaration>;
export type AstAutoAccessorPropertyDeclaration = AstNode<AutoAccessorPropertyDeclaration>;

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

    static {
        createDataInstanceMap[SyntaxKind.PropertyDeclaration] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.PropertyAssignment] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.ShorthandPropertyAssignment] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.SpreadAssignment] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.ObjectBindingPattern] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.ArrayBindingPattern] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.FunctionDeclaration] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.MethodSignature] = _ => new this();
    }
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

    static {
        createDataInstanceMap[SyntaxKind.MethodDeclaration] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.Constructor] = _ => new this();
    }
}

// dprint-ignore
export class AstSemicolonClassElementData extends AstData {
    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.None;
    }

    static {
        createDataInstanceMap[SyntaxKind.SemicolonClassElement] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.GetAccessor] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.SetAccessor] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.IndexSignature] = _ => new this();
    }
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

    static {
        createDataInstanceMap[SyntaxKind.ClassStaticBlockDeclaration] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.ImportTypeAssertionContainer] = _ => new this();
    }
}

// dprint-ignore
export class AstImportTypeNodeData extends AstTypeScriptNodeData {
    isTypeOf: boolean = false;
    argument: AstTypeNode = undefined!;
    assertions: AstImportTypeAssertionContainer | undefined = undefined;
    attributes: AstImportAttributes | undefined = undefined;
    qualifier: AstEntityName | undefined = undefined;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined;

    static {
        createDataInstanceMap[SyntaxKind.ImportType] = _ => new this();
    }
}

export type AstKeywordTypeNode<TKind extends KeywordTypeSyntaxKind = KeywordTypeSyntaxKind> = AstNode<KeywordTypeNode<TKind>>;

// dprint-ignore
export class AstThisTypeNodeData extends AstTypeScriptNodeData {

    static {
        createDataInstanceMap[SyntaxKind.ThisType] = _ => new this();
    }
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

    static {
        createDataInstanceMap[SyntaxKind.FunctionType] = _ => new this();
    }
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

    static {
        createDataInstanceMap[SyntaxKind.ConstructorType] = _ => new this();
    }
}

// dprint-ignore
export class AstTypeReferenceNodeData extends AstTypeScriptNodeData {
    typeName: AstEntityName = undefined!;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined;

    static {
        createDataInstanceMap[SyntaxKind.TypeReference] = _ => new this();
    }
}

// dprint-ignore
export class AstTypePredicateNodeData extends AstTypeScriptNodeData {
    assertsModifier: AstAssertsKeyword | undefined = undefined;
    parameterName: AstIdentifier | AstThisTypeNode = undefined!;
    type: AstTypeNode | undefined = undefined;

    static {
        createDataInstanceMap[SyntaxKind.TypePredicate] = _ => new this();
    }
}

// dprint-ignore
export class AstTypeQueryNodeData extends AstTypeScriptNodeData {
    exprName: AstEntityName = undefined!;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined;

    static {
        createDataInstanceMap[SyntaxKind.TypeQuery] = _ => new this();
    }
}

// dprint-ignore
export class AstTypeLiteralNodeData extends AstTypeScriptNodeData {
    members: AstNodeArray<AstTypeElement> = undefined!;

    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    static {
        createDataInstanceMap[SyntaxKind.TypeLiteral] = _ => new this();
    }
}

// dprint-ignore
export class AstArrayTypeNodeData extends AstTypeScriptNodeData {
    elementType: AstTypeNode = undefined!;

    static {
        createDataInstanceMap[SyntaxKind.ArrayType] = _ => new this();
    }
}

// dprint-ignore
export class AstTupleTypeNodeData extends AstTypeScriptNodeData {
    elements: AstNodeArray<AstTypeNode | AstNamedTupleMember> = undefined!;

    static {
        createDataInstanceMap[SyntaxKind.TupleType] = _ => new this();
    }
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

    static {
        createDataInstanceMap[SyntaxKind.NamedTupleMember] = _ => new this();
    }
}

// dprint-ignore
export class AstOptionalTypeNodeData extends AstTypeScriptNodeData {
    type: AstTypeNode = undefined!;

    static {
        createDataInstanceMap[SyntaxKind.OptionalType] = _ => new this();
    }
}

// dprint-ignore
export class AstRestTypeNodeData extends AstTypeScriptNodeData {
    type: AstTypeNode = undefined!;

    static {
        createDataInstanceMap[SyntaxKind.RestType] = _ => new this();
    }
}

export type AstUnionOrIntersectionTypeNode = AstNodeOneOf<UnionOrIntersectionTypeNode>;

// dprint-ignore
export class AstUnionTypeNodeData extends AstTypeScriptNodeData {
    types: AstNodeArray<AstTypeNode> = undefined!;

    static {
        createDataInstanceMap[SyntaxKind.UnionType] = _ => new this();
    }
}

// dprint-ignore
export class AstIntersectionTypeNodeData extends AstTypeScriptNodeData {
    types: AstNodeArray<AstTypeNode> = undefined!;

    static {
        createDataInstanceMap[SyntaxKind.IntersectionType] = _ => new this();
    }
}

// dprint-ignore
export class AstConditionalTypeNodeData extends AstTypeScriptNodeData {
    checkType: AstTypeNode = undefined!;
    extendsType: AstTypeNode = undefined!;
    trueType: AstTypeNode = undefined!;
    falseType: AstTypeNode = undefined!;

    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;

    static {
        createDataInstanceMap[SyntaxKind.ConditionalType] = _ => new this();
    }
}

// dprint-ignore
export class AstInferTypeNodeData extends AstTypeScriptNodeData {
    typeParameter: AstTypeParameterDeclaration = undefined!;

    static {
        createDataInstanceMap[SyntaxKind.InferType] = _ => new this();
    }
}

// dprint-ignore
export class AstParenthesizedTypeNodeData extends AstTypeScriptNodeData {
    type: AstTypeNode = undefined!;

    static {
        createDataInstanceMap[SyntaxKind.ParenthesizedType] = _ => new this();
    }
}

// dprint-ignore
export class AstTypeOperatorNodeData extends AstTypeScriptNodeData {
    operator: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword = undefined!;
    type: AstTypeNode = undefined!;

    static {
        createDataInstanceMap[SyntaxKind.TypeOperator] = _ => new this();
    }
}

// dprint-ignore
export class AstIndexedAccessTypeNodeData extends AstTypeScriptNodeData {
    objectType: AstTypeNode = undefined!;
    indexType: AstTypeNode = undefined!;

    static {
        createDataInstanceMap[SyntaxKind.IndexedAccessType] = _ => new this();
    }
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

    static {
        createDataInstanceMap[SyntaxKind.MappedType] = _ => new this();
    }
}

// dprint-ignore
export class AstLiteralTypeNodeData extends AstTypeScriptNodeData {
    literal: AstNullLiteral | AstBooleanLiteral | AstLiteralExpression | AstPrefixUnaryExpression = undefined!;

    static {
        createDataInstanceMap[SyntaxKind.LiteralType] = _ => new this();
    }
}

export type AstPropertyNameLiteral = AstNodeOneOf<PropertyNameLiteral>;

// dprint-ignore
export class AstTemplateLiteralTypeNodeData extends AstTypeScriptNodeData {
    head: AstTemplateHead = undefined!;
    templateSpans: AstNodeArray<AstTemplateLiteralTypeSpan> = undefined!;

    static {
        createDataInstanceMap[SyntaxKind.TemplateLiteralType] = _ => new this();
    }
}

// dprint-ignore
export class AstTemplateLiteralTypeSpanData extends AstTypeScriptNodeData {
    type: AstTypeNode = undefined!;
    literal: AstTemplateMiddle | AstTemplateTail = undefined!;

    static {
        createDataInstanceMap[SyntaxKind.TemplateLiteralTypeSpan] = _ => new this();
    }
}

// dprint-ignore
export class AstOmittedExpressionData extends AstData {
    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.None;
    }

    static {
        createDataInstanceMap[SyntaxKind.OmittedExpression] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.PrefixUnaryExpression] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.PostfixUnaryExpression] = _ => new this();
    }
}

// dprint-ignore
export class AstDeleteExpressionData extends AstData {
    expression: AstUnaryExpression = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression);
    }

    static {
        createDataInstanceMap[SyntaxKind.DeleteExpression] = _ => new this();
    }
}

// dprint-ignore
export class AstTypeOfExpressionData extends AstData {
    expression: AstUnaryExpression = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression);
    }

    static {
        createDataInstanceMap[SyntaxKind.TypeOfExpression] = _ => new this();
    }
}

// dprint-ignore
export class AstVoidExpressionData extends AstData {
    expression: AstUnaryExpression = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression);
    }

    static {
        createDataInstanceMap[SyntaxKind.VoidExpression] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.AwaitExpression] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.YieldExpression] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.BinaryExpression] = _ => new this();
    }
}

export type AstAssignmentExpression<TOperator extends AssignmentOperatorToken> = AstNodeOneOf<AssignmentExpression<TOperator>>;
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

    static {
        createDataInstanceMap[SyntaxKind.ConditionalExpression] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.FunctionExpression] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.ArrowFunction] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.RegularExpressionLiteral] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.StringLiteral] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.NoSubstitutionTemplateLiteral] = _ => new this();
    }
}

export type AstPseudoLiteralToken = AstNodeOneOf<PseudoLiteralToken>;
export type AstTemplateLiteralToken = AstNodeOneOf<TemplateLiteralToken>;
export type AstStringLiteralLike = AstNodeOneOf<StringLiteralLike>;
/** @internal */
export type AstHasText = AstNodeOneOf<HasText>;

// dprint-ignore
export class AstNumericLiteralData extends AstTokenData {
    text: string = "";

    /** @internal */ numericLiteralFlags: TokenFlags = TokenFlags.None;
    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return this.numericLiteralFlags & TokenFlags.BinaryOrOctalSpecifier ? TransformFlags.ContainsES2015 : TransformFlags.None;
    }

    static {
        createDataInstanceMap[SyntaxKind.NumericLiteral] = _ => new this();
    }
}

// dprint-ignore
export class AstBigIntLiteralData extends AstTokenData {
    text: string = "";

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.ContainsES2020;
    }

    static {
        createDataInstanceMap[SyntaxKind.BigIntLiteral] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.TemplateHead] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.TemplateMiddle] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.TemplateTail] = _ => new this();
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
    static {
        createDataInstanceMap[SyntaxKind.TemplateExpression] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.TemplateSpan] = _ => new this();
    }
}

// dprint-ignore
export class AstParenthesizedExpressionData extends AstData {
    expression: AstExpression = undefined!;
    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression);
    }

    static {
        createDataInstanceMap[SyntaxKind.ParenthesizedExpression] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.ArrayLiteralExpression] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.SpreadElement] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.ObjectLiteralExpression] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.PropertyAccessExpression] = _ => new this();
    }
}

export type AstPropertyAccessEntityNameExpression = AstNode<PropertyAccessEntityNameExpression>;
export type AstAccessExpression = AstNodeOneOf<AccessExpression>;
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

    static {
        createDataInstanceMap[SyntaxKind.ElementAccessExpression] = _ => new this();
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
            (astIsPropertyAccessExpression(this.expression) ||
                astIsElementAccessExpression(this.expression)) &&
            astGetExpression(this.expression).kind === SyntaxKind.SuperKeyword
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

    static {
        createDataInstanceMap[SyntaxKind.CallExpression] = _ => new this();
    }
}

export type AstCallChain = AstNode<CallChain>;
/** @internal */
export type AstCallChainRoot = AstNode<CallChainRoot>;
/** @internal */
export type AstOptionalChainRoot = AstNodeOneOf<OptionalChainRoot>;
/** @internal */
export type AstLiteralLikeElementAccessExpression = AstNodeOneOf<LiteralLikeElementAccessExpression>;
/** @internal */
export type AstBindableStaticNameExpression = AstNodeOneOf<BindableStaticNameExpression>;
/** @internal */
export type AstBindableStaticAccessExpression = AstNodeOneOf<BindableStaticAccessExpression>;
/** @internal */
export type AstBindableStaticPropertyAssignmentExpression = AstNodeOneOf<BindableStaticPropertyAssignmentExpression>;
/** @internal */
export type AstBindableStaticElementAccessExpression = AstNodeOneOf<BindableStaticElementAccessExpression>;
/** @internal */
export type AstBindablePropertyAssignmentExpression = AstNodeOneOf<BindablePropertyAssignmentExpression>;
/** @internal */
export type AstBindableObjectDefinePropertyCall = AstNodeOneOf<BindableObjectDefinePropertyCall>;

// dprint-ignore
export class AstExpressionWithTypeArgumentsData extends AstData {
    expression: AstLeftHandSideExpression = undefined!;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            propagateChildrenFlags(this.typeArguments) |
            TransformFlags.ContainsES2015;
    }

    static {
        createDataInstanceMap[SyntaxKind.ExpressionWithTypeArguments] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.NewExpression] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.TaggedTemplateExpression] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.AsExpression] = _ => new this();
    }
}

// dprint-ignore
export class AstTypeAssertionExpressionData extends AstData {
    type: AstTypeNode = undefined!;
    expression: AstUnaryExpression = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            propagateChildFlags(this.type) |
            TransformFlags.ContainsTypeScript;
    }

    static {
        createDataInstanceMap[SyntaxKind.TypeAssertionExpression] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.SatisfiesExpression] = _ => new this();
    }
}

// dprint-ignore
export class AstNonNullExpressionData extends AstData {
    expression: AstExpression = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            TransformFlags.ContainsTypeScript;
    }

    static {
        createDataInstanceMap[SyntaxKind.NonNullExpression] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.MetaProperty] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.JsxElement] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.JsxAttributes] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.JsxNamespacedName] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.JsxOpeningElement] = _ => new this();
    }
}

// dprint-ignore
export class AstJsxClosingElementData extends AstData {
    tagName: AstJsxTagNameExpression = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.tagName) |
            TransformFlags.ContainsJsx;
    }

    static {
        createDataInstanceMap[SyntaxKind.JsxClosingElement] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.JsxSelfClosingElement] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.JsxFragment] = _ => new this();
    }
}

// dprint-ignore
export class AstJsxOpeningFragmentData extends AstData {
    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.ContainsJsx;
    }

    static {
        createDataInstanceMap[SyntaxKind.JsxOpeningFragment] = _ => new this();
    }
}

// dprint-ignore
export class AstJsxClosingFragmentData extends AstData {
    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.ContainsJsx;
    }

    static {
        createDataInstanceMap[SyntaxKind.JsxClosingFragment] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.JsxAttribute] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.JsxSpreadAttribute] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.JsxExpression] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.JsxText] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.EmptyStatement] = _ => new this();
    }
}

// dprint-ignore
export class AstDebuggerStatementData extends AstData {
    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.None;
    }

    static {
        createDataInstanceMap[SyntaxKind.DebuggerStatement] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.MissingDeclaration] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.Block] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.VariableStatement] = _ => new this();
    }
}

/** @internal */
export type AstPrologueDirective = AstNodeOneOf<PrologueDirective>;

// dprint-ignore
export class AstExpressionStatementData extends AstData {
    expression: AstExpression = undefined!;

    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    /** @internal */ flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression);
    }

    static {
        createDataInstanceMap[SyntaxKind.ExpressionStatement] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.IfStatement] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.DoStatement] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.WhileStatement] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.ForStatement] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.ForInStatement] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.ForOfStatement] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.BreakStatement] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.ContinueStatement] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.ReturnStatement] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.WithStatement] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.SwitchStatement] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.CaseBlock] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.CaseClause] = _ => new this();
    }
}

// dprint-ignore
export class AstDefaultClauseData extends AstData {
    statements: AstNodeArray<AstStatement> = undefined!;

    /** @internal */ fallthroughFlowNode?: FlowNode | undefined = undefined; // initialized by binding

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildrenFlags(this.statements);
    }

    static {
        createDataInstanceMap[SyntaxKind.DefaultClause] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.LabeledStatement] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.ThrowStatement] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.TryStatement] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.CatchClause] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.ClassDeclaration] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.ClassExpression] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.InterfaceDeclaration] = _ => new this();
    }
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

    static {
        createDataInstanceMap[SyntaxKind.HeritageClause] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.TypeAliasDeclaration] = _ => new this();
    }
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

    static {
        createDataInstanceMap[SyntaxKind.EnumDeclaration] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.EnumMember] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.ModuleDeclaration] = _ => new this();
    }
}

/** @internal */
export type AstAmbientModuleDeclaration = AstNodeOneOf<AmbientModuleDeclaration>;
/** @internal */
export type AstNonGlobalAmbientModuleDeclaration = AstNodeOneOf<NonGlobalAmbientModuleDeclaration>;

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

    static {
        createDataInstanceMap[SyntaxKind.ModuleBlock] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.ImportEqualsDeclaration] = _ => new this();
    }
}

// dprint-ignore
export class AstExternalModuleReferenceData extends AstData {
    expression: AstExpression = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        // always parsed in an Await context
        return propagateChildFlags(this.expression) & ~TransformFlags.ContainsPossibleTopLevelAwait;
    }

    static {
        createDataInstanceMap[SyntaxKind.ExternalModuleReference] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.ImportDeclaration] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.ImportClause] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.ImportAttribute] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.ImportAttributes] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.NamespaceImport] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.NamespaceExport] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.NamespaceExportDeclaration] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.ExportDeclaration] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.NamedImports] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.NamedExports] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.ImportSpecifier] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.ExportSpecifier] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.ExportAssignment] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocTypeExpressionData extends AstData {
    type: AstTypeNode = undefined!;

    static {
        createDataInstanceMap[SyntaxKind.JSDocTypeExpression] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocNameReferenceData extends AstData {
    name: AstEntityName | AstJSDocMemberName = undefined!;

    static {
        createDataInstanceMap[SyntaxKind.JSDocNameReference] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocMemberNameData extends AstData {
    left: AstEntityName | AstJSDocMemberName = undefined!;
    right: AstIdentifier = undefined!;

    static {
        createDataInstanceMap[SyntaxKind.JSDocMemberName] = _ => new this();
    }
}

export type AstJSDocType = AstNodeOneOf<JSDocType>;

// dprint-ignore
export class AstJSDocAllTypeData extends AstData {

    static {
        createDataInstanceMap[SyntaxKind.JSDocAllType] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocUnknownTypeData extends AstData {

    static {
        createDataInstanceMap[SyntaxKind.JSDocUnknownType] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocNonNullableTypeData extends AstData {
    type: AstTypeNode = undefined!;
    postfix = false;

    static {
        createDataInstanceMap[SyntaxKind.JSDocNonNullableType] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocNullableTypeData extends AstData {
    type: AstTypeNode = undefined!;
    postfix = false;

    static {
        createDataInstanceMap[SyntaxKind.JSDocNullableType] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocOptionalTypeData extends AstData {
    type: AstTypeNode = undefined!;

    static {
        createDataInstanceMap[SyntaxKind.JSDocOptionalType] = _ => new this();
    }
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

    static {
        createDataInstanceMap[SyntaxKind.JSDocFunctionType] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocVariadicTypeData extends AstData {
    type: AstTypeNode = undefined!;

    static {
        createDataInstanceMap[SyntaxKind.JSDocVariadicType] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocNamepathTypeData extends AstData {
    type: AstTypeNode = undefined!;

    static {
        createDataInstanceMap[SyntaxKind.JSDocNamepathType] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocData extends AstData {
    comment: string | undefined = undefined;
    commentArray: AstNodeArray<AstJSDocComment> | undefined = undefined;
    tags: AstNodeArray<AstBaseJSDocTag> | undefined = undefined;

    static {
        createDataInstanceMap[SyntaxKind.JSDoc] = _ => new this();
    }
}

export type AstHasJSDoc = AstNodeOneOf<HasJSDoc>;
export type AstJSDocTag = AstNodeOneOf<JSDocTag>;

// dprint-ignore
export class AstJSDocLinkData extends AstData {
    name: AstEntityName | AstJSDocMemberName | undefined = undefined;
    text = "";

    static {
        createDataInstanceMap[SyntaxKind.JSDocLink] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocLinkCodeData extends AstData {
    name: AstEntityName | AstJSDocMemberName | undefined = undefined;
    text = "";

    static {
        createDataInstanceMap[SyntaxKind.JSDocLinkCode] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocLinkPlainData extends AstData {
    name: AstEntityName | AstJSDocMemberName | undefined = undefined;
    text = "";

    static {
        createDataInstanceMap[SyntaxKind.JSDocLinkPlain] = _ => new this();
    }
}

export type AstJSDocComment = AstNodeOneOf<JSDocComment>;

// dprint-ignore
export class AstJSDocTextData extends AstData {
    text = "";

    static {
        createDataInstanceMap[SyntaxKind.JSDocText] = _ => new this();
    }
}

export type AstBaseJSDocTag<TKind extends SyntaxKind = SyntaxKind, T extends AstJSDocTagData = AstJSDocTagData> = AstNode<JSDocTag<TKind, T>>;

// dprint-ignore
export abstract class AstJSDocTagData extends AstData {
    abstract tagName: AstIdentifier;
    abstract comment: string | undefined;
    abstract commentArray: AstNodeArray<AstJSDocComment> | undefined;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.None;
    }
}

// dprint-ignore
export class AstJSDocUnknownTagData extends AstJSDocTagData {
    tagName: AstIdentifier = undefined!;
    comment: string | undefined = undefined;
    commentArray: AstNodeArray<AstJSDocComment> | undefined = undefined;

    static {
        createDataInstanceMap[SyntaxKind.JSDocTag] = _ => new this();
    }
}

export type AstJSDocClassReference = AstNode<JSDocClassReference>;

export interface AstJSDocClassReferenceData extends AstExpressionWithTypeArgumentsData {
    expression: AstIdentifier | AstPropertyAccessEntityNameExpression;
}

// dprint-ignore
export class AstJSDocAugmentsTagData extends AstJSDocTagData {
    tagName: AstIdentifier = undefined!;
    comment: string | undefined = undefined;
    commentArray: AstNodeArray<AstJSDocComment> | undefined = undefined;
    class: AstJSDocClassReference = undefined!;

    static {
        createDataInstanceMap[SyntaxKind.JSDocAugmentsTag] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocImplementsTagData extends AstJSDocTagData {
    tagName: AstIdentifier = undefined!;
    comment: string | undefined = undefined;
    commentArray: AstNodeArray<AstJSDocComment> | undefined = undefined;
    class: AstJSDocClassReference = undefined!;

    static {
        createDataInstanceMap[SyntaxKind.JSDocImplementsTag] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocAuthorTagData extends AstJSDocTagData {
    tagName: AstIdentifier = undefined!;
    comment: string | undefined = undefined;
    commentArray: AstNodeArray<AstJSDocComment> | undefined = undefined;

    static {
        createDataInstanceMap[SyntaxKind.JSDocAuthorTag] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocDeprecatedTagData extends AstJSDocTagData {
    tagName: AstIdentifier = undefined!;
    comment: string | undefined = undefined;
    commentArray: AstNodeArray<AstJSDocComment> | undefined = undefined;

    static {
        createDataInstanceMap[SyntaxKind.JSDocDeprecatedTag] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocClassTagData extends AstJSDocTagData {
    tagName: AstIdentifier = undefined!;
    comment: string | undefined = undefined;
    commentArray: AstNodeArray<AstJSDocComment> | undefined = undefined;

    static {
        createDataInstanceMap[SyntaxKind.JSDocClassTag] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocPublicTagData extends AstJSDocTagData {
    tagName: AstIdentifier = undefined!;
    comment: string | undefined = undefined;
    commentArray: AstNodeArray<AstJSDocComment> | undefined = undefined;

    static {
        createDataInstanceMap[SyntaxKind.JSDocPublicTag] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocPrivateTagData extends AstJSDocTagData {
    tagName: AstIdentifier = undefined!;
    comment: string | undefined = undefined;
    commentArray: AstNodeArray<AstJSDocComment> | undefined = undefined;

    static {
        createDataInstanceMap[SyntaxKind.JSDocPrivateTag] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocProtectedTagData extends AstJSDocTagData {
    tagName: AstIdentifier = undefined!;
    comment: string | undefined = undefined;
    commentArray: AstNodeArray<AstJSDocComment> | undefined = undefined;

    static {
        createDataInstanceMap[SyntaxKind.JSDocProtectedTag] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocReadonlyTagData extends AstJSDocTagData {
    tagName: AstIdentifier = undefined!;
    comment: string | undefined = undefined;
    commentArray: AstNodeArray<AstJSDocComment> | undefined = undefined;

    static {
        createDataInstanceMap[SyntaxKind.JSDocReadonlyTag] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocOverrideTagData extends AstJSDocTagData {
    tagName: AstIdentifier = undefined!;
    comment: string | undefined = undefined;
    commentArray: AstNodeArray<AstJSDocComment> | undefined = undefined;

    static {
        createDataInstanceMap[SyntaxKind.JSDocOverrideTag] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocEnumTagData extends AstJSDocTagData {
    tagName: AstIdentifier = undefined!;
    comment: string | undefined = undefined;
    commentArray: AstNodeArray<AstJSDocComment> | undefined = undefined;
    typeExpression: AstJSDocTypeExpression = undefined!;

    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
    static {
        createDataInstanceMap[SyntaxKind.JSDocEnumTag] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocThisTagData extends AstJSDocTagData {
    tagName: AstIdentifier = undefined!;
    comment: string | undefined = undefined;
    commentArray: AstNodeArray<AstJSDocComment> | undefined = undefined;
    typeExpression: AstJSDocTypeExpression = undefined!;
    static {
        createDataInstanceMap[SyntaxKind.JSDocThisTag] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocTemplateTagData extends AstJSDocTagData {
    tagName: AstIdentifier = undefined!;
    comment: string | undefined = undefined;
    commentArray: AstNodeArray<AstJSDocComment> | undefined = undefined;
    constraint: AstJSDocTypeExpression | undefined = undefined;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> = undefined!;
    static {
        createDataInstanceMap[SyntaxKind.JSDocTemplateTag] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocSeeTagData extends AstJSDocTagData {
    tagName: AstIdentifier = undefined!;
    comment: string | undefined = undefined;
    commentArray: AstNodeArray<AstJSDocComment> | undefined = undefined;
    name: AstJSDocNameReference | undefined = undefined;
    static {
        createDataInstanceMap[SyntaxKind.JSDocSeeTag] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocReturnTagData extends AstJSDocTagData {
    tagName: AstIdentifier = undefined!;
    comment: string | undefined = undefined;
    commentArray: AstNodeArray<AstJSDocComment> | undefined = undefined;
    typeExpression: AstJSDocTypeExpression | undefined = undefined;
    static {
        createDataInstanceMap[SyntaxKind.JSDocReturnTag] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocTypeTagData extends AstJSDocTagData {
    tagName: AstIdentifier = undefined!;
    comment: string | undefined = undefined;
    commentArray: AstNodeArray<AstJSDocComment> | undefined = undefined;
    typeExpression: AstJSDocTypeExpression = undefined!;
    static {
        createDataInstanceMap[SyntaxKind.JSDocTypeTag] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocTypedefTagData extends AstJSDocTagData {
    tagName: AstIdentifier = undefined!;
    comment: string | undefined = undefined;
    commentArray: AstNodeArray<AstJSDocComment> | undefined = undefined;
    typeExpression: AstJSDocTypeExpression | AstJSDocTypeLiteral | undefined = undefined;
    fullName: AstJSDocNamespaceDeclaration | AstIdentifier | undefined = undefined;
    name: AstIdentifier | undefined = undefined;

    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
    static {
        createDataInstanceMap[SyntaxKind.JSDocTypedefTag] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocCallbackTagData extends AstJSDocTagData {
    tagName: AstIdentifier = undefined!;
    comment: string | undefined = undefined;
    commentArray: AstNodeArray<AstJSDocComment> | undefined = undefined;
    fullName: AstJSDocNamespaceDeclaration | AstIdentifier | undefined = undefined;
    name: AstIdentifier | undefined = undefined;
    typeExpression: AstJSDocSignature = undefined!;

    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    /** @internal */ locals: SymbolTable | undefined = undefined;
    /** @internal */ nextContainer: AstHasLocals | undefined = undefined;
    static {
        createDataInstanceMap[SyntaxKind.JSDocCallbackTag] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocOverloadTagData extends AstJSDocTagData {
    tagName: AstIdentifier = undefined!;
    comment: string | undefined = undefined;
    commentArray: AstNodeArray<AstJSDocComment> | undefined = undefined;
    typeExpression: AstJSDocSignature = undefined!;
    static {
        createDataInstanceMap[SyntaxKind.JSDocOverloadTag] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocThrowsTagData extends AstJSDocTagData {
    tagName: AstIdentifier = undefined!;
    comment: string | undefined = undefined;
    commentArray: AstNodeArray<AstJSDocComment> | undefined = undefined;
    typeExpression: AstJSDocTypeExpression | undefined = undefined;
    static {
        createDataInstanceMap[SyntaxKind.JSDocThrowsTag] = _ => new this();
    }
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

    static {
        createDataInstanceMap[SyntaxKind.JSDocSignature] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocPropertyTagData extends AstJSDocTagData {
    tagName: AstIdentifier = undefined!;
    comment: string | undefined = undefined;
    commentArray: AstNodeArray<AstJSDocComment> | undefined = undefined;
    typeExpression: AstJSDocTypeExpression | undefined = undefined;
    name: AstEntityName = undefined!;
    /** Whether the property name came before the type -- non-standard for JSDoc, but Typescript-like */
    isNameFirst = false;
    isBracketed = false;

    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    static {
        createDataInstanceMap[SyntaxKind.JSDocPropertyTag] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocParameterTagData extends AstJSDocTagData {
    tagName: AstIdentifier = undefined!;
    comment: string | undefined = undefined;
    commentArray: AstNodeArray<AstJSDocComment> | undefined = undefined;
    typeExpression: AstJSDocTypeExpression | undefined = undefined;
    name: AstEntityName = undefined!;
    /** Whether the property name came before the type -- non-standard for JSDoc, but Typescript-like */
    isNameFirst = false;
    isBracketed = false;

    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    static {
        createDataInstanceMap[SyntaxKind.JSDocParameterTag] = _ => new this();
    }
}

export type AstJSDocPropertyLikeTag = AstNodeOneOf<JSDocPropertyLikeTag>;

// dprint-ignore
export class AstJSDocTypeLiteralData extends AstData {
    jsDocPropertyTags: AstNodeArray<AstJSDocPropertyLikeTag> | undefined = undefined;
    /** If true, then this type literal represents an *array* of its type. */
    isArrayType = false;

    /** @internal */ symbol: Symbol = undefined!; // initialized by binder (Declaration)
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    static {
        createDataInstanceMap[SyntaxKind.JSDocTypeLiteral] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocSatisfiesTagData extends AstJSDocTagData {
    tagName: AstIdentifier = undefined!;
    comment: string | undefined = undefined;
    commentArray: AstNodeArray<AstJSDocComment> | undefined = undefined;
    typeExpression: AstJSDocTypeExpression = undefined!;
    static {
        createDataInstanceMap[SyntaxKind.JSDocSatisfiesTag] = _ => new this();
    }
}

// dprint-ignore
export class AstJSDocImportTagData extends AstJSDocTagData {
    tagName: AstIdentifier = undefined!;
    comment: string | undefined = undefined;
    commentArray: AstNodeArray<AstJSDocComment> | undefined = undefined;
    importClause: AstImportClause | undefined = undefined;
    moduleSpecifier: AstExpression = undefined!;
    attributes: AstImportAttributes | undefined = undefined;
    static {
        createDataInstanceMap[SyntaxKind.JSDocImportTag] = _ => new this();
    }
}

// dprint-ignore
export class AstSyntheticExpressionData extends AstData {
    isSpread = false;
    type: Type = undefined!;
    tupleNameSource: AstParameterDeclaration | AstNamedTupleMember | undefined = undefined;

    static {
        createDataInstanceMap[SyntaxKind.SyntheticExpression] = _ => new this();
    }
}

// dprint-ignore
export class AstBundleData extends AstData {
    sourceFiles: readonly SourceFile[] = undefined!;
    /** @internal */ syntheticFileReferences?: readonly FileReference[];
    /** @internal */ syntheticTypeReferences?: readonly FileReference[];
    /** @internal */ syntheticLibReferences?: readonly FileReference[];
    /** @internal */ hasNoDefaultLib?: boolean;

    static {
        createDataInstanceMap[SyntaxKind.Bundle] = _ => new this();
    }
}

// dprint-ignore
export class AstSyntaxListData extends AstData {
    /** @internal */ _children!: readonly Node[];

    static {
        createDataInstanceMap[SyntaxKind.SyntaxList] = _ => new this();
    }
}

// dprint-ignore
export class AstNotEmittedStatementData extends AstData {
    /** @internal */ jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)

    static {
        createDataInstanceMap[SyntaxKind.NotEmittedStatement] = _ => new this();
    }
}

// dprint-ignore
export class AstNotEmittedTypeElementData extends AstData {
    /** @internal */ symbol: Symbol = undefined!;
    /** @internal */ localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    static {
        createDataInstanceMap[SyntaxKind.NotEmittedTypeElement] = _ => new this();
    }
}

// dprint-ignore
export class AstPartiallyEmittedExpressionData extends AstData {
    expression: AstExpression = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression);
    }

    static {
        createDataInstanceMap[SyntaxKind.PartiallyEmittedExpression] = _ => new this();
    }
}

// dprint-ignore
export class AstCommaListExpressionData extends AstData {
    elements: AstNodeArray<AstExpression> = undefined!;

    /** @internal */ override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildrenFlags(this.elements);
    }

    static {
        createDataInstanceMap[SyntaxKind.CommaListExpression] = _ => new this();
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

    static {
        createDataInstanceMap[SyntaxKind.SyntheticReferenceExpression] = _ => new this();
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

    static {
        cloneNodeMap[SyntaxKind.SourceFile] = (node: AstNode) => {
            Debug.assert(node.data instanceof this);
            if (node.data.redirectInfo) {
                const clone = node.data.redirectInfo.redirectTarget.ast.shadow() as AstSourceFile;
                copyDataProperties(node, clone.data);
                clone.emitNode = undefined;
                return clone;
            }
            return cloneNodeCore(node);
        };
    }

    static {
        createDataInstanceMap[SyntaxKind.SourceFile] = _ => new this();
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
    return name && astIsPropertyName(name) ? propagatePropertyNameFlagsOfChild(name, childFlags) : childFlags;
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

export type AstNamedDeclaration = AstNodeOneOf<NamedDeclaration>;

/** @internal */
export type AstDynamicNamedDeclaration = AstNodeOneOf<DynamicNamedDeclaration>;

/** @internal */
export type AstDynamicNamedBinaryExpression = AstNodeOneOf<DynamicNamedBinaryExpression>;

/** @internal */
export type AstHasName = AstNodeOneOf<HasName>;

/** @internal */
export type AstHasExpression = AstNodeOneOf<HasExpression>;

/** @internal */
export type AstHasInitializer = AstNodeOneOf<HasInitializer>;

/** @internal */
export type AstThisContainer = AstNodeOneOf<ThisContainer>;

/** @internal */
export type AstGetResult<T extends AstNode, Base extends AstNode, K extends keyof Base["data"]> = T extends Base ? T["data"][K] : Base["data"][K] | undefined;

/** @internal */
export function astCanHaveName(node: AstNode): node is AstHasName {
    Debug.type<AstHasName>(node); // ensures `astCanHaveName` is up-to-date with `AstHasName`/`HasName`
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
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astCanHaveName` is up-to-date with `AstHasName`/`HasName`
            return false;
    }
}

/** @internal */
export function astHasName(node: AstNode): node is AstNodeOneOf<RequiredNodeProp<HasName, "name">> {
    return !!astGetName(node);
}

/** @internal */
export function astGetName<T extends AstNode>(node: T): AstGetResult<T, AstHasName, "name">;
export function astGetName(node: AstNode) {
    Debug.type<AstHasName>(node); // ensures `astGetName` is up-to-date with `AstHasName`/`HasName`
    // NOTE: each branch is duplicated to remain monomorphic
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
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetName` is up-to-date with `AstHasName`/`HasName`
            return undefined;
    }
}

/** @internal */
export function astCanHaveJSDoc(node: AstNode): node is AstHasJSDoc {
    Debug.type<AstHasJSDoc>(node); // ensures `astCanHaveJSDoc` is up-to-date with `AstHasJSDoc`/`HasJSDoc`
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
            Debug.assertNeverTypeOnly(node); // ensures `astCanHaveJSDoc` is up-to-date with `AstHasJSDoc`/`HasJSDoc`
            return false;
    }
}

/** @internal */
export function astHasJSDoc(node: AstNode): node is AstNodeOneOf<RequiredNodeProp<HasJSDoc, "jsDoc">> {
    return !!astGetJSDoc(node);
}

/** @internal */
export function astGetJSDoc(node: AstNode): JSDocArray | undefined {
    Debug.type<AstHasJSDoc>(node); // ensures `astGetJSDoc` is up-to-date with `AstHasJSDoc`/`HasJSDoc`
    // NOTE: each branch is duplicated to remain monomorphic
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
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetJSDoc` is up-to-date with `AstHasJSDoc`/`HasJSDoc`
            return undefined;
    }
}

/** @internal */
export function astSetJSDoc(node: AstHasJSDoc, value: JSDocArray | undefined): JSDocArray | undefined {
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.ArrowFunction: return node.data.jsDoc = value;
        case SyntaxKind.BinaryExpression: return node.data.jsDoc = value;
        case SyntaxKind.Block: return node.data.jsDoc = value;
        case SyntaxKind.BreakStatement: return node.data.jsDoc = value;
        case SyntaxKind.CallSignature: return node.data.jsDoc = value;
        case SyntaxKind.CaseClause: return node.data.jsDoc = value;
        case SyntaxKind.ClassDeclaration: return node.data.jsDoc = value;
        case SyntaxKind.ClassExpression: return node.data.jsDoc = value;
        case SyntaxKind.ClassStaticBlockDeclaration: return node.data.jsDoc = value;
        case SyntaxKind.Constructor: return node.data.jsDoc = value;
        case SyntaxKind.ConstructorType: return node.data.jsDoc = value;
        case SyntaxKind.ConstructSignature: return node.data.jsDoc = value;
        case SyntaxKind.ContinueStatement: return node.data.jsDoc = value;
        case SyntaxKind.DebuggerStatement: return node.data.jsDoc = value;
        case SyntaxKind.DoStatement: return node.data.jsDoc = value;
        case SyntaxKind.ElementAccessExpression: return node.data.jsDoc = value;
        case SyntaxKind.EmptyStatement: return node.data.jsDoc = value;
        case SyntaxKind.EndOfFileToken: return node.data.jsDoc = value;
        case SyntaxKind.EnumDeclaration: return node.data.jsDoc = value;
        case SyntaxKind.EnumMember: return node.data.jsDoc = value;
        case SyntaxKind.ExportAssignment: return node.data.jsDoc = value;
        case SyntaxKind.ExportDeclaration: return node.data.jsDoc = value;
        case SyntaxKind.ExportSpecifier: return node.data.jsDoc = value;
        case SyntaxKind.ExpressionStatement: return node.data.jsDoc = value;
        case SyntaxKind.ForInStatement: return node.data.jsDoc = value;
        case SyntaxKind.ForOfStatement: return node.data.jsDoc = value;
        case SyntaxKind.ForStatement: return node.data.jsDoc = value;
        case SyntaxKind.FunctionDeclaration: return node.data.jsDoc = value;
        case SyntaxKind.FunctionExpression: return node.data.jsDoc = value;
        case SyntaxKind.FunctionType: return node.data.jsDoc = value;
        case SyntaxKind.GetAccessor: return node.data.jsDoc = value;
        case SyntaxKind.Identifier: return node.data.jsDoc = value;
        case SyntaxKind.IfStatement: return node.data.jsDoc = value;
        case SyntaxKind.ImportDeclaration: return node.data.jsDoc = value;
        case SyntaxKind.ImportEqualsDeclaration: return node.data.jsDoc = value;
        case SyntaxKind.IndexSignature: return node.data.jsDoc = value;
        case SyntaxKind.InterfaceDeclaration: return node.data.jsDoc = value;
        case SyntaxKind.JSDocFunctionType: return node.data.jsDoc = value;
        case SyntaxKind.JSDocSignature: return node.data.jsDoc = value;
        case SyntaxKind.LabeledStatement: return node.data.jsDoc = value;
        case SyntaxKind.MethodDeclaration: return node.data.jsDoc = value;
        case SyntaxKind.MethodSignature: return node.data.jsDoc = value;
        case SyntaxKind.ModuleDeclaration: return node.data.jsDoc = value;
        case SyntaxKind.NamedTupleMember: return node.data.jsDoc = value;
        case SyntaxKind.NamespaceExportDeclaration: return node.data.jsDoc = value;
        case SyntaxKind.ObjectLiteralExpression: return node.data.jsDoc = value;
        case SyntaxKind.Parameter: return node.data.jsDoc = value;
        case SyntaxKind.ParenthesizedExpression: return node.data.jsDoc = value;
        case SyntaxKind.PropertyAccessExpression: return node.data.jsDoc = value;
        case SyntaxKind.PropertyAssignment: return node.data.jsDoc = value;
        case SyntaxKind.PropertyDeclaration: return node.data.jsDoc = value;
        case SyntaxKind.PropertySignature: return node.data.jsDoc = value;
        case SyntaxKind.ReturnStatement: return node.data.jsDoc = value;
        case SyntaxKind.SemicolonClassElement: return node.data.jsDoc = value;
        case SyntaxKind.SetAccessor: return node.data.jsDoc = value;
        case SyntaxKind.ShorthandPropertyAssignment: return node.data.jsDoc = value;
        case SyntaxKind.SpreadAssignment: return node.data.jsDoc = value;
        case SyntaxKind.SwitchStatement: return node.data.jsDoc = value;
        case SyntaxKind.ThrowStatement: return node.data.jsDoc = value;
        case SyntaxKind.TryStatement: return node.data.jsDoc = value;
        case SyntaxKind.TypeAliasDeclaration: return node.data.jsDoc = value;
        case SyntaxKind.TypeParameter: return node.data.jsDoc = value;
        case SyntaxKind.VariableDeclaration: return node.data.jsDoc = value;
        case SyntaxKind.VariableStatement: return node.data.jsDoc = value;
        case SyntaxKind.WhileStatement: return node.data.jsDoc = value;
        case SyntaxKind.WithStatement: return node.data.jsDoc = value;
        case SyntaxKind.ModuleBlock: return node.data.jsDoc = value;
        case SyntaxKind.MissingDeclaration: return node.data.jsDoc = value;
        case SyntaxKind.NotEmittedStatement: return node.data.jsDoc = value;
        default:
            Debug.assertNever(node); // ensures `astSetJSDoc` is up-to-date with `AstHasJSDoc`/`HasJSDoc`
    }
}

/** @internal */
export function astCanHaveExpression(node: AstNode): node is AstHasExpression {
    Debug.type<AstHasExpression>(node); // ensures `astCanHaveExpression` is up-to-date with `AstHasExpression`/`HasExpression`
    switch (node.kind) {
        case SyntaxKind.ComputedPropertyName:
        case SyntaxKind.TypeParameter:
        case SyntaxKind.Decorator:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.ElementAccessExpression:
        case SyntaxKind.CallExpression:
        case SyntaxKind.NewExpression:
        case SyntaxKind.TypeAssertionExpression:
        case SyntaxKind.ParenthesizedExpression:
        case SyntaxKind.DeleteExpression:
        case SyntaxKind.TypeOfExpression:
        case SyntaxKind.VoidExpression:
        case SyntaxKind.AwaitExpression:
        case SyntaxKind.ForInStatement:
        case SyntaxKind.ForOfStatement:
        case SyntaxKind.ExpressionStatement:
        case SyntaxKind.IfStatement:
        case SyntaxKind.DoStatement:
        case SyntaxKind.WhileStatement:
        case SyntaxKind.YieldExpression:
        case SyntaxKind.SpreadElement:
        case SyntaxKind.ExpressionWithTypeArguments:
        case SyntaxKind.AsExpression:
        case SyntaxKind.NonNullExpression:
        case SyntaxKind.SatisfiesExpression:
        case SyntaxKind.TemplateSpan:
        case SyntaxKind.ReturnStatement:
        case SyntaxKind.WithStatement:
        case SyntaxKind.SwitchStatement:
        case SyntaxKind.ThrowStatement:
        case SyntaxKind.ExportAssignment:
        case SyntaxKind.ExternalModuleReference:
        case SyntaxKind.JsxSpreadAttribute:
        case SyntaxKind.JsxExpression:
        case SyntaxKind.CaseClause:
        case SyntaxKind.SpreadAssignment:
        case SyntaxKind.PartiallyEmittedExpression:
        case SyntaxKind.SyntheticReferenceExpression:
            return true;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astCanHaveExpression` is up-to-date with `AstHasExpression`/`HasExpression`
            return false;
    }
}

/** @internal */
export function astGetExpression<T extends AstNode>(node: T): AstGetResult<T, AstHasExpression, "expression">;
export function astGetExpression(node: AstNode) {
    Debug.type<AstHasExpression>(node); // ensures `astGetExpression` is up-to-date with `AstHasExpression`/`HasExpression`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.ComputedPropertyName: return node.data.expression;
        case SyntaxKind.TypeParameter: return node.data.expression;
        case SyntaxKind.Decorator: return node.data.expression;
        case SyntaxKind.PropertyAccessExpression: return node.data.expression;
        case SyntaxKind.ElementAccessExpression: return node.data.expression;
        case SyntaxKind.CallExpression: return node.data.expression;
        case SyntaxKind.NewExpression: return node.data.expression;
        case SyntaxKind.TypeAssertionExpression: return node.data.expression;
        case SyntaxKind.ParenthesizedExpression: return node.data.expression;
        case SyntaxKind.DeleteExpression: return node.data.expression;
        case SyntaxKind.TypeOfExpression: return node.data.expression;
        case SyntaxKind.VoidExpression: return node.data.expression;
        case SyntaxKind.AwaitExpression: return node.data.expression;
        case SyntaxKind.ForInStatement: return node.data.expression;
        case SyntaxKind.ForOfStatement: return node.data.expression;
        case SyntaxKind.ExpressionStatement: return node.data.expression;
        case SyntaxKind.IfStatement: return node.data.expression;
        case SyntaxKind.DoStatement: return node.data.expression;
        case SyntaxKind.WhileStatement: return node.data.expression;
        case SyntaxKind.YieldExpression: return node.data.expression;
        case SyntaxKind.SpreadElement: return node.data.expression;
        case SyntaxKind.ExpressionWithTypeArguments: return node.data.expression;
        case SyntaxKind.AsExpression: return node.data.expression;
        case SyntaxKind.NonNullExpression: return node.data.expression;
        case SyntaxKind.SatisfiesExpression: return node.data.expression;
        case SyntaxKind.TemplateSpan: return node.data.expression;
        case SyntaxKind.ReturnStatement: return node.data.expression;
        case SyntaxKind.WithStatement: return node.data.expression;
        case SyntaxKind.SwitchStatement: return node.data.expression;
        case SyntaxKind.ThrowStatement: return node.data.expression;
        case SyntaxKind.ExportAssignment: return node.data.expression;
        case SyntaxKind.ExternalModuleReference: return node.data.expression;
        case SyntaxKind.JsxSpreadAttribute: return node.data.expression;
        case SyntaxKind.JsxExpression: return node.data.expression;
        case SyntaxKind.CaseClause: return node.data.expression;
        case SyntaxKind.SpreadAssignment: return node.data.expression;
        case SyntaxKind.PartiallyEmittedExpression: return node.data.expression;
        case SyntaxKind.SyntheticReferenceExpression: return node.data.expression;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetExpression` is up-to-date with `AstHasExpression`/`HasExpression`
            return undefined;
    }
}

/** @internal */
export function astCanHaveFlowNode(node: AstNode): node is AstHasFlowNode {
    Debug.type<AstHasFlowNode>(node); // ensures `astCanHaveFlowNode` is up-to-date with `AstHasFlowNode`/`HasFlowNode`
    switch (node.kind) {
        case SyntaxKind.VariableStatement:
        case SyntaxKind.ExpressionStatement:
        case SyntaxKind.IfStatement:
        case SyntaxKind.DoStatement:
        case SyntaxKind.WhileStatement:
        case SyntaxKind.ForStatement:
        case SyntaxKind.ForInStatement:
        case SyntaxKind.ForOfStatement:
        case SyntaxKind.ContinueStatement:
        case SyntaxKind.BreakStatement:
        case SyntaxKind.ReturnStatement:
        case SyntaxKind.WithStatement:
        case SyntaxKind.SwitchStatement:
        case SyntaxKind.LabeledStatement:
        case SyntaxKind.ThrowStatement:
        case SyntaxKind.TryStatement:
        case SyntaxKind.DebuggerStatement:
        case SyntaxKind.Identifier:
        case SyntaxKind.ThisKeyword:
        case SyntaxKind.SuperKeyword:
        case SyntaxKind.QualifiedName:
        case SyntaxKind.MetaProperty:
        case SyntaxKind.ElementAccessExpression:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.BindingElement:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
            return true;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astCanHaveFlowNode` is up-to-date with `AstHasFlowNode`/`HasFlowNode`
            return false;
    }
}

/** @internal */
export function astGetFlowNode(node: AstNode): FlowNode | undefined {
    Debug.type<AstHasFlowNode>(node); // ensures `astGetFlowNode` is up-to-date with `AstHasFlowNode`/`HasFlowNode`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.VariableStatement: return node.data.flowNode;
        case SyntaxKind.ExpressionStatement: return node.data.flowNode;
        case SyntaxKind.IfStatement: return node.data.flowNode;
        case SyntaxKind.DoStatement: return node.data.flowNode;
        case SyntaxKind.WhileStatement: return node.data.flowNode;
        case SyntaxKind.ForStatement: return node.data.flowNode;
        case SyntaxKind.ForInStatement: return node.data.flowNode;
        case SyntaxKind.ForOfStatement: return node.data.flowNode;
        case SyntaxKind.ContinueStatement: return node.data.flowNode;
        case SyntaxKind.BreakStatement: return node.data.flowNode;
        case SyntaxKind.ReturnStatement: return node.data.flowNode;
        case SyntaxKind.WithStatement: return node.data.flowNode;
        case SyntaxKind.SwitchStatement: return node.data.flowNode;
        case SyntaxKind.LabeledStatement: return node.data.flowNode;
        case SyntaxKind.ThrowStatement: return node.data.flowNode;
        case SyntaxKind.TryStatement: return node.data.flowNode;
        case SyntaxKind.DebuggerStatement: return node.data.flowNode;
        case SyntaxKind.Identifier: return node.data.flowNode;
        case SyntaxKind.ThisKeyword: return node.data.flowNode;
        case SyntaxKind.SuperKeyword: return node.data.flowNode;
        case SyntaxKind.QualifiedName: return node.data.flowNode;
        case SyntaxKind.MetaProperty: return node.data.flowNode;
        case SyntaxKind.ElementAccessExpression: return node.data.flowNode;
        case SyntaxKind.PropertyAccessExpression: return node.data.flowNode;
        case SyntaxKind.BindingElement: return node.data.flowNode;
        case SyntaxKind.FunctionExpression: return node.data.flowNode;
        case SyntaxKind.ArrowFunction: return node.data.flowNode;
        case SyntaxKind.MethodDeclaration: return node.data.flowNode;
        case SyntaxKind.GetAccessor: return node.data.flowNode;
        case SyntaxKind.SetAccessor: return node.data.flowNode;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetFlowNode` is up-to-date with `AstHasFlowNode`/`HasFlowNode`
            return undefined;
    }
}

/** @internal */
export function astSetFlowNode(node: AstHasFlowNode, value: FlowNode | undefined): FlowNode | undefined {
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.VariableStatement: return node.data.flowNode = value;
        case SyntaxKind.ExpressionStatement: return node.data.flowNode = value;
        case SyntaxKind.IfStatement: return node.data.flowNode = value;
        case SyntaxKind.DoStatement: return node.data.flowNode = value;
        case SyntaxKind.WhileStatement: return node.data.flowNode = value;
        case SyntaxKind.ForStatement: return node.data.flowNode = value;
        case SyntaxKind.ForInStatement: return node.data.flowNode = value;
        case SyntaxKind.ForOfStatement: return node.data.flowNode = value;
        case SyntaxKind.ContinueStatement: return node.data.flowNode = value;
        case SyntaxKind.BreakStatement: return node.data.flowNode = value;
        case SyntaxKind.ReturnStatement: return node.data.flowNode = value;
        case SyntaxKind.WithStatement: return node.data.flowNode = value;
        case SyntaxKind.SwitchStatement: return node.data.flowNode = value;
        case SyntaxKind.LabeledStatement: return node.data.flowNode = value;
        case SyntaxKind.ThrowStatement: return node.data.flowNode = value;
        case SyntaxKind.TryStatement: return node.data.flowNode = value;
        case SyntaxKind.DebuggerStatement: return node.data.flowNode = value;
        case SyntaxKind.Identifier: return node.data.flowNode = value;
        case SyntaxKind.ThisKeyword: return node.data.flowNode = value;
        case SyntaxKind.SuperKeyword: return node.data.flowNode = value;
        case SyntaxKind.QualifiedName: return node.data.flowNode = value;
        case SyntaxKind.MetaProperty: return node.data.flowNode = value;
        case SyntaxKind.ElementAccessExpression: return node.data.flowNode = value;
        case SyntaxKind.PropertyAccessExpression: return node.data.flowNode = value;
        case SyntaxKind.BindingElement: return node.data.flowNode = value;
        case SyntaxKind.FunctionExpression: return node.data.flowNode = value;
        case SyntaxKind.ArrowFunction: return node.data.flowNode = value;
        case SyntaxKind.MethodDeclaration: return node.data.flowNode = value;
        case SyntaxKind.GetAccessor: return node.data.flowNode = value;
        case SyntaxKind.SetAccessor: return node.data.flowNode = value;
        default:
            return Debug.assertNever(node); // ensures `astSetFlowNode` is up-to-date with `AstHasFlowNode`/`HasFlowNode`
    }
}

/** @internal */
export function astGetEndFlowNode(node: AstNode): FlowNode | undefined {
    Debug.type<AstHasEndFlowNode>(node); // ensures `astGetEndFlowNode` is up-to-date with `AstHasEndFlowNode`/`HasEndFlowNode`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.MethodDeclaration: return node.data.endFlowNode;
        case SyntaxKind.ClassStaticBlockDeclaration: return node.data.endFlowNode;
        case SyntaxKind.Constructor: return node.data.endFlowNode;
        case SyntaxKind.GetAccessor: return node.data.endFlowNode;
        case SyntaxKind.SetAccessor: return node.data.endFlowNode;
        case SyntaxKind.FunctionExpression: return node.data.endFlowNode;
        case SyntaxKind.ArrowFunction: return node.data.endFlowNode;
        case SyntaxKind.FunctionDeclaration: return node.data.endFlowNode;
        case SyntaxKind.SourceFile: return node.data.endFlowNode;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetEndFlowNode` is up-to-date with `AstHasEndFlowNode`/`HasEndFlowNode`
            return undefined;
    }
}

/** @internal */
export function astSetEndFlowNode(node: AstHasEndFlowNode, value: FlowNode | undefined): FlowNode | undefined {
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.MethodDeclaration: return node.data.endFlowNode = value;
        case SyntaxKind.ClassStaticBlockDeclaration: return node.data.endFlowNode = value;
        case SyntaxKind.Constructor: return node.data.endFlowNode = value;
        case SyntaxKind.GetAccessor: return node.data.endFlowNode = value;
        case SyntaxKind.SetAccessor: return node.data.endFlowNode = value;
        case SyntaxKind.FunctionExpression: return node.data.endFlowNode = value;
        case SyntaxKind.ArrowFunction: return node.data.endFlowNode = value;
        case SyntaxKind.FunctionDeclaration: return node.data.endFlowNode = value;
        case SyntaxKind.SourceFile: return node.data.endFlowNode = value;
        default:
            return Debug.assertNever(node); // ensures `astSetEndFlowNode` is up-to-date with `AstHasEndFlowNode`/`HasEndFlowNode`
    }
}

/** @internal */
export function astCanHaveInitializer(node: AstNode): node is AstHasInitializer {
    Debug.type<AstHasInitializer>(node); // ensures `astCanHaveInitializer` is up-to-date with `AstHasInitializer`/`HasInitializer`
    switch (node.kind) {
        case SyntaxKind.Parameter:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.BindingElement:
        case SyntaxKind.ForStatement:
        case SyntaxKind.ForInStatement:
        case SyntaxKind.ForOfStatement:
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.JsxAttribute:
        case SyntaxKind.PropertyAssignment:
        case SyntaxKind.PropertySignature:
        case SyntaxKind.EnumMember:
            return true;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astCanHaveInitializer` is up-to-date with `AstHasInitializer`/`HasInitializer`
            return false;
    }
}

/** @internal */
export function astGetInitializer<T extends AstNode>(node: T): AstGetResult<T, AstHasInitializer, "initializer">;
export function astGetInitializer(node: AstNode) {
    Debug.type<AstHasInitializer>(node); // ensures `astGetInitializer` is up-to-date with `AstHasInitializer`/`HasInitializer`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.Parameter: return node.data.initializer;
        case SyntaxKind.PropertyDeclaration: return node.data.initializer;
        case SyntaxKind.BindingElement: return node.data.initializer;
        case SyntaxKind.ForStatement: return node.data.initializer;
        case SyntaxKind.ForInStatement: return node.data.initializer;
        case SyntaxKind.ForOfStatement: return node.data.initializer;
        case SyntaxKind.VariableDeclaration: return node.data.initializer;
        case SyntaxKind.JsxAttribute: return node.data.initializer;
        case SyntaxKind.PropertyAssignment: return node.data.initializer;
        case SyntaxKind.PropertySignature: return node.data.initializer;
        case SyntaxKind.EnumMember: return node.data.initializer;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetInitializer` is up-to-date with `AstHasInitializer`/`HasInitializer`
            return undefined;
    }
}

/** @internal */
export function astCanHaveModifiers(node: AstNode): node is AstHasModifiers {
    Debug.type<AstHasModifiers>(node); // ensures `astCanHaveModifiers` is up-to-date with `AstHasModifiers`/`HasModifiers`
    switch (node.kind) {
        case SyntaxKind.TypeParameter:
        case SyntaxKind.Parameter:
        case SyntaxKind.PropertySignature:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.MethodSignature:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.Constructor:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
        case SyntaxKind.IndexSignature:
        case SyntaxKind.ConstructorType:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.ClassExpression:
        case SyntaxKind.VariableStatement:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.InterfaceDeclaration:
        case SyntaxKind.TypeAliasDeclaration:
        case SyntaxKind.EnumDeclaration:
        case SyntaxKind.ModuleDeclaration:
        case SyntaxKind.ImportEqualsDeclaration:
        case SyntaxKind.ImportDeclaration:
        case SyntaxKind.ExportAssignment:
        case SyntaxKind.ExportDeclaration:
            return true;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astCanHaveModifiers` is up-to-date with `AstHasModifiers`/`HasModifiers`
            return false;
    }
}

/** @internal */
export function astGetModifiers<T extends AstNode>(node: T): AstGetResult<T, AstInternalHasModifiers, "modifiers">;
export function astGetModifiers(node: AstNode) {
    Debug.type<AstInternalHasModifiers>(node); // ensures `astGetModifiers` is up-to-date with `AstHasModifiers`/`HasModifiers`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.TypeParameter: return node.data.modifiers;
        case SyntaxKind.Parameter: return node.data.modifiers;
        case SyntaxKind.PropertySignature: return node.data.modifiers;
        case SyntaxKind.PropertyDeclaration: return node.data.modifiers;
        case SyntaxKind.MethodSignature: return node.data.modifiers;
        case SyntaxKind.MethodDeclaration: return node.data.modifiers;
        case SyntaxKind.Constructor: return node.data.modifiers;
        case SyntaxKind.GetAccessor: return node.data.modifiers;
        case SyntaxKind.SetAccessor: return node.data.modifiers;
        case SyntaxKind.IndexSignature: return node.data.modifiers;
        case SyntaxKind.ConstructorType: return node.data.modifiers;
        case SyntaxKind.FunctionExpression: return node.data.modifiers;
        case SyntaxKind.ArrowFunction: return node.data.modifiers;
        case SyntaxKind.ClassExpression: return node.data.modifiers;
        case SyntaxKind.VariableStatement: return node.data.modifiers;
        case SyntaxKind.FunctionDeclaration: return node.data.modifiers;
        case SyntaxKind.ClassDeclaration: return node.data.modifiers;
        case SyntaxKind.InterfaceDeclaration: return node.data.modifiers;
        case SyntaxKind.TypeAliasDeclaration: return node.data.modifiers;
        case SyntaxKind.EnumDeclaration: return node.data.modifiers;
        case SyntaxKind.ModuleDeclaration: return node.data.modifiers;
        case SyntaxKind.ImportEqualsDeclaration: return node.data.modifiers;
        case SyntaxKind.ImportDeclaration: return node.data.modifiers;
        case SyntaxKind.ExportAssignment: return node.data.modifiers;
        case SyntaxKind.ExportDeclaration: return node.data.modifiers;
        case SyntaxKind.MissingDeclaration: return node.data.modifiers;
        case SyntaxKind.ClassStaticBlockDeclaration: return node.data.modifiers;
        case SyntaxKind.NamespaceExportDeclaration: return node.data.modifiers;
        case SyntaxKind.PropertyAssignment: return node.data.modifiers;
        case SyntaxKind.ShorthandPropertyAssignment: return node.data.modifiers;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetModifiers` is up-to-date with `AstHasModifiers`/`HasModifiers`
            return undefined;
    }
}

/** @internal */
export function astCanHaveDecorators(node: AstNode): node is AstHasDecorators {
    Debug.type<AstHasDecorators>(node); // ensures `astCanHaveDecorators` is up-to-date with `AstHasDecorators`/`HasDecorators`
    switch (node.kind) {
        case SyntaxKind.Parameter:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
        case SyntaxKind.ClassExpression:
        case SyntaxKind.ClassDeclaration:
            return true;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astCanHaveDecorators` is up-to-date with `AstHasDecorators`/`HasDecorators`
            return false;
    }
}

/** @internal */
export function astGetRawText(node: AstNode): string | undefined {
    Debug.type<AstTemplateLiteralToken>(node); // ensures `astGetRawText` is up-to-date with `AstTemplateLiteralToken`/`TemplateLiteralToken`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.NoSubstitutionTemplateLiteral: return node.data.rawText;
        case SyntaxKind.TemplateHead: return node.data.rawText;
        case SyntaxKind.TemplateMiddle: return node.data.rawText;
        case SyntaxKind.TemplateTail: return node.data.rawText;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetRawText` is up-to-date with `AstTemplateLiteralToken`/`TemplateLiteralToken`
            return undefined;
    }
}

/** @internal */
export function astGetText<T extends AstNode>(node: T): AstGetResult<T, AstHasText | AstLiteralLikeNode & { escapedText?: never }, "text">;
export function astGetText(node: AstNode): string | undefined {
    Debug.type<AstHasText>(node); // ensures `astGetText` is up-to-date with `AstHasText`/`HasText`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.NumericLiteral: return node.data.text;
        case SyntaxKind.BigIntLiteral: return node.data.text;
        case SyntaxKind.StringLiteral: return node.data.text;
        case SyntaxKind.RegularExpressionLiteral: return node.data.text;
        case SyntaxKind.NoSubstitutionTemplateLiteral: return node.data.text;
        case SyntaxKind.TemplateHead: return node.data.text;
        case SyntaxKind.TemplateMiddle: return node.data.text;
        case SyntaxKind.TemplateTail: return node.data.text;
        case SyntaxKind.JsxText: return node.data.text;
        case SyntaxKind.JSDocText: return node.data.text;
        case SyntaxKind.JSDocLink: return node.data.text;
        case SyntaxKind.JSDocLinkCode: return node.data.text;
        case SyntaxKind.JSDocLinkPlain: return node.data.text;
        case SyntaxKind.SourceFile: return node.data.text;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetText` is up-to-date with `AstHasText`/`HasText`
            return undefined;
    }
}

/** @internal */
export function astCanHaveSymbol(node: AstNode): node is AstHasSymbol {
    Debug.type<AstHasSymbol>(node); // ensures `astCanHaveSymbol` is up-to-date with `AstHasSymbol`/`HasSymbol`
    switch (node.kind) {
        case SyntaxKind.NumericLiteral:
        case SyntaxKind.StringLiteral:
        case SyntaxKind.NoSubstitutionTemplateLiteral:
        case SyntaxKind.Identifier:
        case SyntaxKind.TypeParameter:
        case SyntaxKind.Parameter:
        case SyntaxKind.PropertySignature:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.MethodSignature:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.ClassStaticBlockDeclaration:
        case SyntaxKind.Constructor:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
        case SyntaxKind.CallSignature:
        case SyntaxKind.ConstructSignature:
        case SyntaxKind.IndexSignature:
        case SyntaxKind.FunctionType:
        case SyntaxKind.ConstructorType:
        case SyntaxKind.TypeLiteral:
        case SyntaxKind.MappedType:
        case SyntaxKind.NamedTupleMember:
        case SyntaxKind.BindingElement:
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.ElementAccessExpression:
        case SyntaxKind.CallExpression:
        case SyntaxKind.NewExpression:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.BinaryExpression:
        case SyntaxKind.ClassExpression:
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.InterfaceDeclaration:
        case SyntaxKind.TypeAliasDeclaration:
        case SyntaxKind.EnumDeclaration:
        case SyntaxKind.ModuleDeclaration:
        case SyntaxKind.NamespaceExportDeclaration:
        case SyntaxKind.ImportEqualsDeclaration:
        case SyntaxKind.ImportDeclaration:
        case SyntaxKind.ImportClause:
        case SyntaxKind.NamespaceImport:
        case SyntaxKind.ImportSpecifier:
        case SyntaxKind.ExportAssignment:
        case SyntaxKind.ExportDeclaration:
        case SyntaxKind.NamespaceExport:
        case SyntaxKind.ExportSpecifier:
        case SyntaxKind.MissingDeclaration:
        case SyntaxKind.JsxAttribute:
        case SyntaxKind.JsxAttributes:
        case SyntaxKind.PropertyAssignment:
        case SyntaxKind.ShorthandPropertyAssignment:
        case SyntaxKind.SpreadAssignment:
        case SyntaxKind.EnumMember:
        case SyntaxKind.SourceFile:
        case SyntaxKind.JSDocFunctionType:
        case SyntaxKind.JSDocTypeLiteral:
        case SyntaxKind.JSDocSignature:
        case SyntaxKind.JSDocCallbackTag:
        case SyntaxKind.JSDocEnumTag:
        case SyntaxKind.JSDocParameterTag:
        case SyntaxKind.JSDocTypedefTag:
        case SyntaxKind.JSDocPropertyTag:
        case SyntaxKind.NotEmittedTypeElement:
            return true;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astCanHaveSymbol` is up-to-date with `AstHasSymbol`/`HasSymbol`
            return false;
    }
}

/** @internal */
export function astGetSymbol<T extends AstNode>(node: T): T extends AstHasSymbol ? Symbol : Symbol | undefined;
export function astGetSymbol<T extends AstNode>(node: T) {
    Debug.type<AstHasSymbol>(node); // ensures `astGetSymbol` is up-to-date with `AstHasSymbol`/`HasSymbol`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.NumericLiteral: return node.data.symbol;
        case SyntaxKind.StringLiteral: return node.data.symbol;
        case SyntaxKind.NoSubstitutionTemplateLiteral: return node.data.symbol;
        case SyntaxKind.Identifier: return node.data.symbol;
        case SyntaxKind.TypeParameter: return node.data.symbol;
        case SyntaxKind.Parameter: return node.data.symbol;
        case SyntaxKind.PropertySignature: return node.data.symbol;
        case SyntaxKind.PropertyDeclaration: return node.data.symbol;
        case SyntaxKind.MethodSignature: return node.data.symbol;
        case SyntaxKind.MethodDeclaration: return node.data.symbol;
        case SyntaxKind.ClassStaticBlockDeclaration: return node.data.symbol;
        case SyntaxKind.Constructor: return node.data.symbol;
        case SyntaxKind.GetAccessor: return node.data.symbol;
        case SyntaxKind.SetAccessor: return node.data.symbol;
        case SyntaxKind.CallSignature: return node.data.symbol;
        case SyntaxKind.ConstructSignature: return node.data.symbol;
        case SyntaxKind.IndexSignature: return node.data.symbol;
        case SyntaxKind.FunctionType: return node.data.symbol;
        case SyntaxKind.ConstructorType: return node.data.symbol;
        case SyntaxKind.TypeLiteral: return node.data.symbol;
        case SyntaxKind.MappedType: return node.data.symbol;
        case SyntaxKind.NamedTupleMember: return node.data.symbol;
        case SyntaxKind.BindingElement: return node.data.symbol;
        case SyntaxKind.ObjectLiteralExpression: return node.data.symbol;
        case SyntaxKind.PropertyAccessExpression: return node.data.symbol;
        case SyntaxKind.ElementAccessExpression: return node.data.symbol;
        case SyntaxKind.CallExpression: return node.data.symbol;
        case SyntaxKind.NewExpression: return node.data.symbol;
        case SyntaxKind.FunctionExpression: return node.data.symbol;
        case SyntaxKind.ArrowFunction: return node.data.symbol;
        case SyntaxKind.BinaryExpression: return node.data.symbol;
        case SyntaxKind.ClassExpression: return node.data.symbol;
        case SyntaxKind.VariableDeclaration: return node.data.symbol;
        case SyntaxKind.FunctionDeclaration: return node.data.symbol;
        case SyntaxKind.ClassDeclaration: return node.data.symbol;
        case SyntaxKind.InterfaceDeclaration: return node.data.symbol;
        case SyntaxKind.TypeAliasDeclaration: return node.data.symbol;
        case SyntaxKind.EnumDeclaration: return node.data.symbol;
        case SyntaxKind.ModuleDeclaration: return node.data.symbol;
        case SyntaxKind.NamespaceExportDeclaration: return node.data.symbol;
        case SyntaxKind.ImportEqualsDeclaration: return node.data.symbol;
        case SyntaxKind.ImportDeclaration: return node.data.symbol;
        case SyntaxKind.ImportClause: return node.data.symbol;
        case SyntaxKind.NamespaceImport: return node.data.symbol;
        case SyntaxKind.ImportSpecifier: return node.data.symbol;
        case SyntaxKind.ExportAssignment: return node.data.symbol;
        case SyntaxKind.ExportDeclaration: return node.data.symbol;
        case SyntaxKind.NamespaceExport: return node.data.symbol;
        case SyntaxKind.ExportSpecifier: return node.data.symbol;
        case SyntaxKind.MissingDeclaration: return node.data.symbol;
        case SyntaxKind.JsxAttribute: return node.data.symbol;
        case SyntaxKind.JsxAttributes: return node.data.symbol;
        case SyntaxKind.PropertyAssignment: return node.data.symbol;
        case SyntaxKind.ShorthandPropertyAssignment: return node.data.symbol;
        case SyntaxKind.SpreadAssignment: return node.data.symbol;
        case SyntaxKind.EnumMember: return node.data.symbol;
        case SyntaxKind.SourceFile: return node.data.declaration.symbol;
        case SyntaxKind.JSDocFunctionType: return node.data.symbol;
        case SyntaxKind.JSDocTypeLiteral: return node.data.symbol;
        case SyntaxKind.JSDocSignature: return node.data.symbol;
        case SyntaxKind.JSDocCallbackTag: return node.data.symbol;
        case SyntaxKind.JSDocEnumTag: return node.data.symbol;
        case SyntaxKind.JSDocParameterTag: return node.data.symbol;
        case SyntaxKind.JSDocTypedefTag: return node.data.symbol;
        case SyntaxKind.JSDocPropertyTag: return node.data.symbol;
        case SyntaxKind.NotEmittedTypeElement: return node.data.symbol;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetSymbol` is up-to-date with `AstHasSymbol`/`HasSymbol`
            return undefined;
    }
}

/** @internal */
export function astSetSymbol(node: AstHasSymbol, value: Symbol): Symbol {
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.NumericLiteral: return node.data.symbol = value;
        case SyntaxKind.StringLiteral: return node.data.symbol = value;
        case SyntaxKind.NoSubstitutionTemplateLiteral: return node.data.symbol = value;
        case SyntaxKind.Identifier: return node.data.symbol = value;
        case SyntaxKind.TypeParameter: return node.data.symbol = value;
        case SyntaxKind.Parameter: return node.data.symbol = value;
        case SyntaxKind.PropertySignature: return node.data.symbol = value;
        case SyntaxKind.PropertyDeclaration: return node.data.symbol = value;
        case SyntaxKind.MethodSignature: return node.data.symbol = value;
        case SyntaxKind.MethodDeclaration: return node.data.symbol = value;
        case SyntaxKind.ClassStaticBlockDeclaration: return node.data.symbol = value;
        case SyntaxKind.Constructor: return node.data.symbol = value;
        case SyntaxKind.GetAccessor: return node.data.symbol = value;
        case SyntaxKind.SetAccessor: return node.data.symbol = value;
        case SyntaxKind.CallSignature: return node.data.symbol = value;
        case SyntaxKind.ConstructSignature: return node.data.symbol = value;
        case SyntaxKind.IndexSignature: return node.data.symbol = value;
        case SyntaxKind.FunctionType: return node.data.symbol = value;
        case SyntaxKind.ConstructorType: return node.data.symbol = value;
        case SyntaxKind.TypeLiteral: return node.data.symbol = value;
        case SyntaxKind.MappedType: return node.data.symbol = value;
        case SyntaxKind.NamedTupleMember: return node.data.symbol = value;
        case SyntaxKind.BindingElement: return node.data.symbol = value;
        case SyntaxKind.ObjectLiteralExpression: return node.data.symbol = value;
        case SyntaxKind.PropertyAccessExpression: return node.data.symbol = value;
        case SyntaxKind.ElementAccessExpression: return node.data.symbol = value;
        case SyntaxKind.CallExpression: return node.data.symbol = value;
        case SyntaxKind.NewExpression: return node.data.symbol = value;
        case SyntaxKind.FunctionExpression: return node.data.symbol = value;
        case SyntaxKind.ArrowFunction: return node.data.symbol = value;
        case SyntaxKind.BinaryExpression: return node.data.symbol = value;
        case SyntaxKind.ClassExpression: return node.data.symbol = value;
        case SyntaxKind.VariableDeclaration: return node.data.symbol = value;
        case SyntaxKind.FunctionDeclaration: return node.data.symbol = value;
        case SyntaxKind.ClassDeclaration: return node.data.symbol = value;
        case SyntaxKind.InterfaceDeclaration: return node.data.symbol = value;
        case SyntaxKind.TypeAliasDeclaration: return node.data.symbol = value;
        case SyntaxKind.EnumDeclaration: return node.data.symbol = value;
        case SyntaxKind.ModuleDeclaration: return node.data.symbol = value;
        case SyntaxKind.NamespaceExportDeclaration: return node.data.symbol = value;
        case SyntaxKind.ImportEqualsDeclaration: return node.data.symbol = value;
        case SyntaxKind.ImportDeclaration: return node.data.symbol = value;
        case SyntaxKind.ImportClause: return node.data.symbol = value;
        case SyntaxKind.NamespaceImport: return node.data.symbol = value;
        case SyntaxKind.ImportSpecifier: return node.data.symbol = value;
        case SyntaxKind.ExportAssignment: return node.data.symbol = value;
        case SyntaxKind.ExportDeclaration: return node.data.symbol = value;
        case SyntaxKind.NamespaceExport: return node.data.symbol = value;
        case SyntaxKind.ExportSpecifier: return node.data.symbol = value;
        case SyntaxKind.MissingDeclaration: return node.data.symbol = value;
        case SyntaxKind.JsxAttribute: return node.data.symbol = value;
        case SyntaxKind.JsxAttributes: return node.data.symbol = value;
        case SyntaxKind.PropertyAssignment: return node.data.symbol = value;
        case SyntaxKind.ShorthandPropertyAssignment: return node.data.symbol = value;
        case SyntaxKind.SpreadAssignment: return node.data.symbol = value;
        case SyntaxKind.EnumMember: return node.data.symbol = value;
        case SyntaxKind.SourceFile: return node.data.declaration.symbol = value;
        case SyntaxKind.JSDocFunctionType: return node.data.symbol = value;
        case SyntaxKind.JSDocTypeLiteral: return node.data.symbol = value;
        case SyntaxKind.JSDocSignature: return node.data.symbol = value;
        case SyntaxKind.JSDocCallbackTag: return node.data.symbol = value;
        case SyntaxKind.JSDocEnumTag: return node.data.symbol = value;
        case SyntaxKind.JSDocParameterTag: return node.data.symbol = value;
        case SyntaxKind.JSDocTypedefTag: return node.data.symbol = value;
        case SyntaxKind.JSDocPropertyTag: return node.data.symbol = value;
        case SyntaxKind.NotEmittedTypeElement: return node.data.symbol = value;
        default:
            Debug.assertNever(node); // ensures `astSetSymbol` is up-to-date with `AstHasSymbol`/`HasSymbol`
    }
}

/** @internal */
export function astGetLocalSymbol(node: AstNode): Symbol | undefined;
export function astGetLocalSymbol(node: AstNode) {
    Debug.type<AstHasSymbol>(node); // ensures `astGetLocalSymbol` is up-to-date with `AstHasSymbol`/`HasSymbol`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.NumericLiteral: return node.data.localSymbol;
        case SyntaxKind.StringLiteral: return node.data.localSymbol;
        case SyntaxKind.NoSubstitutionTemplateLiteral: return node.data.localSymbol;
        case SyntaxKind.Identifier: return node.data.localSymbol;
        case SyntaxKind.TypeParameter: return node.data.localSymbol;
        case SyntaxKind.Parameter: return node.data.localSymbol;
        case SyntaxKind.PropertySignature: return node.data.localSymbol;
        case SyntaxKind.PropertyDeclaration: return node.data.localSymbol;
        case SyntaxKind.MethodSignature: return node.data.localSymbol;
        case SyntaxKind.MethodDeclaration: return node.data.localSymbol;
        case SyntaxKind.ClassStaticBlockDeclaration: return node.data.localSymbol;
        case SyntaxKind.Constructor: return node.data.localSymbol;
        case SyntaxKind.GetAccessor: return node.data.localSymbol;
        case SyntaxKind.SetAccessor: return node.data.localSymbol;
        case SyntaxKind.CallSignature: return node.data.localSymbol;
        case SyntaxKind.ConstructSignature: return node.data.localSymbol;
        case SyntaxKind.IndexSignature: return node.data.localSymbol;
        case SyntaxKind.FunctionType: return node.data.localSymbol;
        case SyntaxKind.ConstructorType: return node.data.localSymbol;
        case SyntaxKind.TypeLiteral: return node.data.localSymbol;
        case SyntaxKind.MappedType: return node.data.localSymbol;
        case SyntaxKind.NamedTupleMember: return node.data.localSymbol;
        case SyntaxKind.BindingElement: return node.data.localSymbol;
        case SyntaxKind.ObjectLiteralExpression: return node.data.localSymbol;
        case SyntaxKind.PropertyAccessExpression: return node.data.localSymbol;
        case SyntaxKind.ElementAccessExpression: return node.data.localSymbol;
        case SyntaxKind.CallExpression: return node.data.localSymbol;
        case SyntaxKind.NewExpression: return node.data.localSymbol;
        case SyntaxKind.FunctionExpression: return node.data.localSymbol;
        case SyntaxKind.ArrowFunction: return node.data.localSymbol;
        case SyntaxKind.BinaryExpression: return node.data.localSymbol;
        case SyntaxKind.ClassExpression: return node.data.localSymbol;
        case SyntaxKind.VariableDeclaration: return node.data.localSymbol;
        case SyntaxKind.FunctionDeclaration: return node.data.localSymbol;
        case SyntaxKind.ClassDeclaration: return node.data.localSymbol;
        case SyntaxKind.InterfaceDeclaration: return node.data.localSymbol;
        case SyntaxKind.TypeAliasDeclaration: return node.data.localSymbol;
        case SyntaxKind.EnumDeclaration: return node.data.localSymbol;
        case SyntaxKind.ModuleDeclaration: return node.data.localSymbol;
        case SyntaxKind.NamespaceExportDeclaration: return node.data.localSymbol;
        case SyntaxKind.ImportEqualsDeclaration: return node.data.localSymbol;
        case SyntaxKind.ImportDeclaration: return node.data.localSymbol;
        case SyntaxKind.ImportClause: return node.data.localSymbol;
        case SyntaxKind.NamespaceImport: return node.data.localSymbol;
        case SyntaxKind.ImportSpecifier: return node.data.localSymbol;
        case SyntaxKind.ExportAssignment: return node.data.localSymbol;
        case SyntaxKind.ExportDeclaration: return node.data.localSymbol;
        case SyntaxKind.NamespaceExport: return node.data.localSymbol;
        case SyntaxKind.ExportSpecifier: return node.data.localSymbol;
        case SyntaxKind.MissingDeclaration: return node.data.localSymbol;
        case SyntaxKind.JsxAttribute: return node.data.localSymbol;
        case SyntaxKind.JsxAttributes: return node.data.localSymbol;
        case SyntaxKind.PropertyAssignment: return node.data.localSymbol;
        case SyntaxKind.ShorthandPropertyAssignment: return node.data.localSymbol;
        case SyntaxKind.SpreadAssignment: return node.data.localSymbol;
        case SyntaxKind.EnumMember: return node.data.localSymbol;
        case SyntaxKind.SourceFile: return node.data.declaration.localSymbol;
        case SyntaxKind.JSDocFunctionType: return node.data.localSymbol;
        case SyntaxKind.JSDocTypeLiteral: return node.data.localSymbol;
        case SyntaxKind.JSDocSignature: return node.data.localSymbol;
        case SyntaxKind.JSDocCallbackTag: return node.data.localSymbol;
        case SyntaxKind.JSDocEnumTag: return node.data.localSymbol;
        case SyntaxKind.JSDocParameterTag: return node.data.localSymbol;
        case SyntaxKind.JSDocTypedefTag: return node.data.localSymbol;
        case SyntaxKind.JSDocPropertyTag: return node.data.localSymbol;
        case SyntaxKind.NotEmittedTypeElement: return node.data.localSymbol;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetLocalSymbol` is up-to-date with `AstHasSymbol`/`HasSymbol`
            return undefined;
    }
}

/** @internal */
export function astSetLocalSymbol(node: AstHasSymbol, value: Symbol | undefined): Symbol | undefined {
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.NumericLiteral: return node.data.localSymbol = value;
        case SyntaxKind.StringLiteral: return node.data.localSymbol = value;
        case SyntaxKind.NoSubstitutionTemplateLiteral: return node.data.localSymbol = value;
        case SyntaxKind.Identifier: return node.data.localSymbol = value;
        case SyntaxKind.TypeParameter: return node.data.localSymbol = value;
        case SyntaxKind.Parameter: return node.data.localSymbol = value;
        case SyntaxKind.PropertySignature: return node.data.localSymbol = value;
        case SyntaxKind.PropertyDeclaration: return node.data.localSymbol = value;
        case SyntaxKind.MethodSignature: return node.data.localSymbol = value;
        case SyntaxKind.MethodDeclaration: return node.data.localSymbol = value;
        case SyntaxKind.ClassStaticBlockDeclaration: return node.data.localSymbol = value;
        case SyntaxKind.Constructor: return node.data.localSymbol = value;
        case SyntaxKind.GetAccessor: return node.data.localSymbol = value;
        case SyntaxKind.SetAccessor: return node.data.localSymbol = value;
        case SyntaxKind.CallSignature: return node.data.localSymbol = value;
        case SyntaxKind.ConstructSignature: return node.data.localSymbol = value;
        case SyntaxKind.IndexSignature: return node.data.localSymbol = value;
        case SyntaxKind.FunctionType: return node.data.localSymbol = value;
        case SyntaxKind.ConstructorType: return node.data.localSymbol = value;
        case SyntaxKind.TypeLiteral: return node.data.localSymbol = value;
        case SyntaxKind.MappedType: return node.data.localSymbol = value;
        case SyntaxKind.NamedTupleMember: return node.data.localSymbol = value;
        case SyntaxKind.BindingElement: return node.data.localSymbol = value;
        case SyntaxKind.ObjectLiteralExpression: return node.data.localSymbol = value;
        case SyntaxKind.PropertyAccessExpression: return node.data.localSymbol = value;
        case SyntaxKind.ElementAccessExpression: return node.data.localSymbol = value;
        case SyntaxKind.CallExpression: return node.data.localSymbol = value;
        case SyntaxKind.NewExpression: return node.data.localSymbol = value;
        case SyntaxKind.FunctionExpression: return node.data.localSymbol = value;
        case SyntaxKind.ArrowFunction: return node.data.localSymbol = value;
        case SyntaxKind.BinaryExpression: return node.data.localSymbol = value;
        case SyntaxKind.ClassExpression: return node.data.localSymbol = value;
        case SyntaxKind.VariableDeclaration: return node.data.localSymbol = value;
        case SyntaxKind.FunctionDeclaration: return node.data.localSymbol = value;
        case SyntaxKind.ClassDeclaration: return node.data.localSymbol = value;
        case SyntaxKind.InterfaceDeclaration: return node.data.localSymbol = value;
        case SyntaxKind.TypeAliasDeclaration: return node.data.localSymbol = value;
        case SyntaxKind.EnumDeclaration: return node.data.localSymbol = value;
        case SyntaxKind.ModuleDeclaration: return node.data.localSymbol = value;
        case SyntaxKind.NamespaceExportDeclaration: return node.data.localSymbol = value;
        case SyntaxKind.ImportEqualsDeclaration: return node.data.localSymbol = value;
        case SyntaxKind.ImportDeclaration: return node.data.localSymbol = value;
        case SyntaxKind.ImportClause: return node.data.localSymbol = value;
        case SyntaxKind.NamespaceImport: return node.data.localSymbol = value;
        case SyntaxKind.ImportSpecifier: return node.data.localSymbol = value;
        case SyntaxKind.ExportAssignment: return node.data.localSymbol = value;
        case SyntaxKind.ExportDeclaration: return node.data.localSymbol = value;
        case SyntaxKind.NamespaceExport: return node.data.localSymbol = value;
        case SyntaxKind.ExportSpecifier: return node.data.localSymbol = value;
        case SyntaxKind.MissingDeclaration: return node.data.localSymbol = value;
        case SyntaxKind.JsxAttribute: return node.data.localSymbol = value;
        case SyntaxKind.JsxAttributes: return node.data.localSymbol = value;
        case SyntaxKind.PropertyAssignment: return node.data.localSymbol = value;
        case SyntaxKind.ShorthandPropertyAssignment: return node.data.localSymbol = value;
        case SyntaxKind.SpreadAssignment: return node.data.localSymbol = value;
        case SyntaxKind.EnumMember: return node.data.localSymbol = value;
        case SyntaxKind.SourceFile: return node.data.declaration.localSymbol = value;
        case SyntaxKind.JSDocFunctionType: return node.data.localSymbol = value;
        case SyntaxKind.JSDocTypeLiteral: return node.data.localSymbol = value;
        case SyntaxKind.JSDocSignature: return node.data.localSymbol = value;
        case SyntaxKind.JSDocCallbackTag: return node.data.localSymbol = value;
        case SyntaxKind.JSDocEnumTag: return node.data.localSymbol = value;
        case SyntaxKind.JSDocParameterTag: return node.data.localSymbol = value;
        case SyntaxKind.JSDocTypedefTag: return node.data.localSymbol = value;
        case SyntaxKind.JSDocPropertyTag: return node.data.localSymbol = value;
        case SyntaxKind.NotEmittedTypeElement: return node.data.localSymbol = value;
        default:
            Debug.assertNever(node); // ensures `astSetLocalSymbol` is up-to-date with `AstHasSymbol`/`HasSymbol`
    }
}

/** @internal */
export function astGetLocals(node: AstNode): SymbolTable | undefined {
    Debug.type<AstHasLocals>(node); // ensures `astGetLocals` is up-to-date with `AstHasLocals`/`HasLocals`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.MethodSignature: return node.data.locals;
        case SyntaxKind.MethodDeclaration: return node.data.locals;
        case SyntaxKind.ClassStaticBlockDeclaration: return node.data.locals;
        case SyntaxKind.Constructor: return node.data.locals;
        case SyntaxKind.GetAccessor: return node.data.locals;
        case SyntaxKind.SetAccessor: return node.data.locals;
        case SyntaxKind.CallSignature: return node.data.locals;
        case SyntaxKind.ConstructSignature: return node.data.locals;
        case SyntaxKind.IndexSignature: return node.data.locals;
        case SyntaxKind.FunctionType: return node.data.locals;
        case SyntaxKind.ConstructorType: return node.data.locals;
        case SyntaxKind.ConditionalType: return node.data.locals;
        case SyntaxKind.MappedType: return node.data.locals;
        case SyntaxKind.FunctionExpression: return node.data.locals;
        case SyntaxKind.ArrowFunction: return node.data.locals;
        case SyntaxKind.Block: return node.data.locals;
        case SyntaxKind.ForStatement: return node.data.locals;
        case SyntaxKind.ForInStatement: return node.data.locals;
        case SyntaxKind.ForOfStatement: return node.data.locals;
        case SyntaxKind.FunctionDeclaration: return node.data.locals;
        case SyntaxKind.TypeAliasDeclaration: return node.data.locals;
        case SyntaxKind.ModuleDeclaration: return node.data.locals;
        case SyntaxKind.CaseBlock: return node.data.locals;
        case SyntaxKind.CatchClause: return node.data.locals;
        case SyntaxKind.SourceFile: return node.data.locals;
        case SyntaxKind.JSDocFunctionType: return node.data.locals;
        case SyntaxKind.JSDocSignature: return node.data.locals;
        case SyntaxKind.JSDocCallbackTag: return node.data.locals;
        case SyntaxKind.JSDocEnumTag: return node.data.locals;
        case SyntaxKind.JSDocTypedefTag: return node.data.locals;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetLocals` is up-to-date with `AstHasLocals`/`HasLocals`
            return undefined;
    }
}

/** @internal */
export function astSetLocals(node: AstHasLocals, value: SymbolTable | undefined): SymbolTable | undefined {
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.MethodSignature: return node.data.locals = value;
        case SyntaxKind.MethodDeclaration: return node.data.locals = value;
        case SyntaxKind.ClassStaticBlockDeclaration: return node.data.locals = value;
        case SyntaxKind.Constructor: return node.data.locals = value;
        case SyntaxKind.GetAccessor: return node.data.locals = value;
        case SyntaxKind.SetAccessor: return node.data.locals = value;
        case SyntaxKind.CallSignature: return node.data.locals = value;
        case SyntaxKind.ConstructSignature: return node.data.locals = value;
        case SyntaxKind.IndexSignature: return node.data.locals = value;
        case SyntaxKind.FunctionType: return node.data.locals = value;
        case SyntaxKind.ConstructorType: return node.data.locals = value;
        case SyntaxKind.ConditionalType: return node.data.locals = value;
        case SyntaxKind.MappedType: return node.data.locals = value;
        case SyntaxKind.FunctionExpression: return node.data.locals = value;
        case SyntaxKind.ArrowFunction: return node.data.locals = value;
        case SyntaxKind.Block: return node.data.locals = value;
        case SyntaxKind.ForStatement: return node.data.locals = value;
        case SyntaxKind.ForInStatement: return node.data.locals = value;
        case SyntaxKind.ForOfStatement: return node.data.locals = value;
        case SyntaxKind.FunctionDeclaration: return node.data.locals = value;
        case SyntaxKind.TypeAliasDeclaration: return node.data.locals = value;
        case SyntaxKind.ModuleDeclaration: return node.data.locals = value;
        case SyntaxKind.CaseBlock: return node.data.locals = value;
        case SyntaxKind.CatchClause: return node.data.locals = value;
        case SyntaxKind.SourceFile: return node.data.locals = value;
        case SyntaxKind.JSDocFunctionType: return node.data.locals = value;
        case SyntaxKind.JSDocSignature: return node.data.locals = value;
        case SyntaxKind.JSDocCallbackTag: return node.data.locals = value;
        case SyntaxKind.JSDocEnumTag: return node.data.locals = value;
        case SyntaxKind.JSDocTypedefTag: return node.data.locals = value;
        default:
            Debug.assertNever(node); // ensures `astSetLocals` is up-to-date with `AstHasLocals`/`HasLocals`
    }
}

/** @internal */
export function astGetNextContainer(node: AstNode): AstHasLocals | undefined {
    Debug.type<AstHasLocals>(node); // ensures `astGetNextContainer` is up-to-date with `AstHasLocals`/`HasLocals`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.MethodSignature: return node.data.nextContainer;
        case SyntaxKind.MethodDeclaration: return node.data.nextContainer;
        case SyntaxKind.ClassStaticBlockDeclaration: return node.data.nextContainer;
        case SyntaxKind.Constructor: return node.data.nextContainer;
        case SyntaxKind.GetAccessor: return node.data.nextContainer;
        case SyntaxKind.SetAccessor: return node.data.nextContainer;
        case SyntaxKind.CallSignature: return node.data.nextContainer;
        case SyntaxKind.ConstructSignature: return node.data.nextContainer;
        case SyntaxKind.IndexSignature: return node.data.nextContainer;
        case SyntaxKind.FunctionType: return node.data.nextContainer;
        case SyntaxKind.ConstructorType: return node.data.nextContainer;
        case SyntaxKind.ConditionalType: return node.data.nextContainer;
        case SyntaxKind.MappedType: return node.data.nextContainer;
        case SyntaxKind.FunctionExpression: return node.data.nextContainer;
        case SyntaxKind.ArrowFunction: return node.data.nextContainer;
        case SyntaxKind.Block: return node.data.nextContainer;
        case SyntaxKind.ForStatement: return node.data.nextContainer;
        case SyntaxKind.ForInStatement: return node.data.nextContainer;
        case SyntaxKind.ForOfStatement: return node.data.nextContainer;
        case SyntaxKind.FunctionDeclaration: return node.data.nextContainer;
        case SyntaxKind.TypeAliasDeclaration: return node.data.nextContainer;
        case SyntaxKind.ModuleDeclaration: return node.data.nextContainer;
        case SyntaxKind.CaseBlock: return node.data.nextContainer;
        case SyntaxKind.CatchClause: return node.data.nextContainer;
        case SyntaxKind.SourceFile: return node.data.nextContainer;
        case SyntaxKind.JSDocFunctionType: return node.data.nextContainer;
        case SyntaxKind.JSDocSignature: return node.data.nextContainer;
        case SyntaxKind.JSDocCallbackTag: return node.data.nextContainer;
        case SyntaxKind.JSDocEnumTag: return node.data.nextContainer;
        case SyntaxKind.JSDocTypedefTag: return node.data.nextContainer;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetNextContainer` is up-to-date with `AstHasLocals`/`HasLocals`
            return undefined;
    }
}

/** @internal */
export function astSetNextContainer(node: AstHasLocals, value: AstHasLocals | undefined): AstHasLocals | undefined {
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.MethodSignature: return node.data.nextContainer = value;
        case SyntaxKind.MethodDeclaration: return node.data.nextContainer = value;
        case SyntaxKind.ClassStaticBlockDeclaration: return node.data.nextContainer = value;
        case SyntaxKind.Constructor: return node.data.nextContainer = value;
        case SyntaxKind.GetAccessor: return node.data.nextContainer = value;
        case SyntaxKind.SetAccessor: return node.data.nextContainer = value;
        case SyntaxKind.CallSignature: return node.data.nextContainer = value;
        case SyntaxKind.ConstructSignature: return node.data.nextContainer = value;
        case SyntaxKind.IndexSignature: return node.data.nextContainer = value;
        case SyntaxKind.FunctionType: return node.data.nextContainer = value;
        case SyntaxKind.ConstructorType: return node.data.nextContainer = value;
        case SyntaxKind.ConditionalType: return node.data.nextContainer = value;
        case SyntaxKind.MappedType: return node.data.nextContainer = value;
        case SyntaxKind.FunctionExpression: return node.data.nextContainer = value;
        case SyntaxKind.ArrowFunction: return node.data.nextContainer = value;
        case SyntaxKind.Block: return node.data.nextContainer = value;
        case SyntaxKind.ForStatement: return node.data.nextContainer = value;
        case SyntaxKind.ForInStatement: return node.data.nextContainer = value;
        case SyntaxKind.ForOfStatement: return node.data.nextContainer = value;
        case SyntaxKind.FunctionDeclaration: return node.data.nextContainer = value;
        case SyntaxKind.TypeAliasDeclaration: return node.data.nextContainer = value;
        case SyntaxKind.ModuleDeclaration: return node.data.nextContainer = value;
        case SyntaxKind.CaseBlock: return node.data.nextContainer = value;
        case SyntaxKind.CatchClause: return node.data.nextContainer = value;
        case SyntaxKind.SourceFile: return node.data.nextContainer = value;
        case SyntaxKind.JSDocFunctionType: return node.data.nextContainer = value;
        case SyntaxKind.JSDocSignature: return node.data.nextContainer = value;
        case SyntaxKind.JSDocCallbackTag: return node.data.nextContainer = value;
        case SyntaxKind.JSDocEnumTag: return node.data.nextContainer = value;
        case SyntaxKind.JSDocTypedefTag: return node.data.nextContainer = value;
        default:
            Debug.assertNever(node); // ensures `astSetNextContainer` is up-to-date with `AstHasLocals`/`HasLocals`
    }
}

/** @internal */
export function astGetType<T extends AstNode>(node: T): AstGetResult<T, AstHasType, "type">;
export function astGetType<T extends AstNode>(node: T) {
    Debug.type<AstHasType>(node); // ensures `astGetType` is up-to-date with `AstHasType`/`HasType`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.Parameter: return node.data.type;
        case SyntaxKind.PropertySignature: return node.data.type;
        case SyntaxKind.PropertyDeclaration: return node.data.type;
        case SyntaxKind.MethodSignature: return node.data.type;
        case SyntaxKind.MethodDeclaration: return node.data.type;
        case SyntaxKind.Constructor: return node.data.type;
        case SyntaxKind.GetAccessor: return node.data.type;
        case SyntaxKind.SetAccessor: return node.data.type;
        case SyntaxKind.CallSignature: return node.data.type;
        case SyntaxKind.ConstructSignature: return node.data.type;
        case SyntaxKind.IndexSignature: return node.data.type;
        case SyntaxKind.TypePredicate: return node.data.type;
        case SyntaxKind.FunctionType: return node.data.type;
        case SyntaxKind.ConstructorType: return node.data.type;
        case SyntaxKind.ParenthesizedType: return node.data.type;
        case SyntaxKind.TypeOperator: return node.data.type;
        case SyntaxKind.MappedType: return node.data.type;
        case SyntaxKind.TypeAssertionExpression: return node.data.type;
        case SyntaxKind.FunctionExpression: return node.data.type;
        case SyntaxKind.ArrowFunction: return node.data.type;
        case SyntaxKind.AsExpression: return node.data.type;
        case SyntaxKind.VariableDeclaration: return node.data.type;
        case SyntaxKind.FunctionDeclaration: return node.data.type;
        case SyntaxKind.TypeAliasDeclaration: return node.data.type;
        case SyntaxKind.JSDocTypeExpression: return node.data.type;
        case SyntaxKind.JSDocNullableType: return node.data.type;
        case SyntaxKind.JSDocNonNullableType: return node.data.type;
        case SyntaxKind.JSDocOptionalType: return node.data.type;
        case SyntaxKind.JSDocFunctionType: return node.data.type;
        case SyntaxKind.JSDocVariadicType: return node.data.type;
        case SyntaxKind.OptionalType: return node.data.type;
        case SyntaxKind.RestType: return node.data.type;
        case SyntaxKind.NamedTupleMember: return node.data.type;
        case SyntaxKind.TemplateLiteralTypeSpan: return node.data.type;
        case SyntaxKind.SatisfiesExpression: return node.data.type;
        case SyntaxKind.JSDocNamepathType: return node.data.type;
        case SyntaxKind.JSDocSignature: return node.data.type;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetType` is up-to-date with `AstHasType`/`HasType`
            return undefined;
    }
}

/** @internal */
export function astGetTypes<T extends AstNode>(node: T): AstGetResult<T, AstHasTypes, "types">;
export function astGetTypes(node: AstNode) {
    Debug.type<AstHasTypes>(node); // ensures `astGetTypes` is up-to-date with `AstHasTypes`/`HasTypes`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.UnionType: return node.data.types;
        case SyntaxKind.IntersectionType: return node.data.types;
        case SyntaxKind.HeritageClause: return node.data.types;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetTypes` is up-to-date with `AstHasTypes`/`HasTypes`
            return undefined;
    }
}

/** @internal */
export function astGetTypeParameters<T extends AstNode>(node: T): AstGetResult<T, AstHasTypeParameters, "typeParameters">;
export function astGetTypeParameters(node: AstNode) {
    Debug.type<AstHasTypeParameters>(node); // ensures `astGetTypeParameters` is up-to-date with `AstHasTypeParameters`/`HasTypeParameters`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.MethodSignature: return node.data.typeParameters;
        case SyntaxKind.MethodDeclaration: return node.data.typeParameters;
        case SyntaxKind.Constructor: return node.data.typeParameters;
        case SyntaxKind.GetAccessor: return node.data.typeParameters;
        case SyntaxKind.SetAccessor: return node.data.typeParameters;
        case SyntaxKind.CallSignature: return node.data.typeParameters;
        case SyntaxKind.ConstructSignature: return node.data.typeParameters;
        case SyntaxKind.IndexSignature: return node.data.typeParameters;
        case SyntaxKind.FunctionType: return node.data.typeParameters;
        case SyntaxKind.ConstructorType: return node.data.typeParameters;
        case SyntaxKind.FunctionExpression: return node.data.typeParameters;
        case SyntaxKind.ArrowFunction: return node.data.typeParameters;
        case SyntaxKind.ClassExpression: return node.data.typeParameters;
        case SyntaxKind.FunctionDeclaration: return node.data.typeParameters;
        case SyntaxKind.ClassDeclaration: return node.data.typeParameters;
        case SyntaxKind.InterfaceDeclaration: return node.data.typeParameters;
        case SyntaxKind.TypeAliasDeclaration: return node.data.typeParameters;
        case SyntaxKind.JSDocFunctionType: return node.data.typeParameters;
        case SyntaxKind.JSDocSignature: return node.data.typeParameters;
        case SyntaxKind.JSDocTemplateTag: return node.data.typeParameters;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetTypeParameters` is up-to-date with `AstHasTypeParameters`/`HasTypeParameters`
            return undefined;
    }
}

/** @internal */
export function astGetParameters<T extends AstNode>(node: T): AstGetResult<T, AstHasParameters, "parameters">;
export function astGetParameters(node: AstNode) {
    Debug.type<AstHasParameters>(node); // ensures `astGetParameters` is up-to-date with `AstHasParameters`/`HasParameters`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.MethodSignature: return node.data.parameters;
        case SyntaxKind.MethodDeclaration: return node.data.parameters;
        case SyntaxKind.Constructor: return node.data.parameters;
        case SyntaxKind.GetAccessor: return node.data.parameters;
        case SyntaxKind.SetAccessor: return node.data.parameters;
        case SyntaxKind.CallSignature: return node.data.parameters;
        case SyntaxKind.ConstructSignature: return node.data.parameters;
        case SyntaxKind.IndexSignature: return node.data.parameters;
        case SyntaxKind.FunctionType: return node.data.parameters;
        case SyntaxKind.ConstructorType: return node.data.parameters;
        case SyntaxKind.FunctionExpression: return node.data.parameters;
        case SyntaxKind.ArrowFunction: return node.data.parameters;
        case SyntaxKind.FunctionDeclaration: return node.data.parameters;
        case SyntaxKind.JSDocFunctionType: return node.data.parameters;
        case SyntaxKind.JSDocSignature: return node.data.parameters;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetParameters` is up-to-date with `AstHasParameters`/`HasParameters`
            return undefined;
    }
}

/** @internal */
export function astGetBody<T extends AstNode>(node: T): AstGetResult<T, AstHasBody, "body">;
export function astGetBody(node: AstNode) {
    Debug.type<AstHasBody>(node); // ensures `astGetBody` is up-to-date with `AstHasBody`/`HasBody`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.MethodDeclaration: return node.data.body;
        case SyntaxKind.ClassStaticBlockDeclaration: return node.data.body;
        case SyntaxKind.Constructor: return node.data.body;
        case SyntaxKind.GetAccessor: return node.data.body;
        case SyntaxKind.SetAccessor: return node.data.body;
        case SyntaxKind.FunctionExpression: return node.data.body;
        case SyntaxKind.ArrowFunction: return node.data.body;
        case SyntaxKind.FunctionDeclaration: return node.data.body;
        case SyntaxKind.ModuleDeclaration: return node.data.body;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetBody` is up-to-date with `AstHasBody`/`HasBody`
            return undefined;
    }
}

/** @internal */
export function astGetQuestionToken<T extends AstNode>(node: T): AstGetResult<T, AstHasQuestionToken, "questionToken">;
export function astGetQuestionToken(node: AstNode) {
    Debug.type<AstHasQuestionToken>(node); // ensures `astGetQuestionToken` is up-to-date with `AstHasQuestionToken`/`HasQuestionToken`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.Parameter: return node.data.questionToken;
        case SyntaxKind.PropertySignature: return node.data.questionToken;
        case SyntaxKind.PropertyDeclaration: return node.data.questionToken;
        case SyntaxKind.MethodSignature: return node.data.questionToken;
        case SyntaxKind.MethodDeclaration: return node.data.questionToken;
        case SyntaxKind.MappedType: return node.data.questionToken;
        case SyntaxKind.NamedTupleMember: return node.data.questionToken;
        case SyntaxKind.ConditionalExpression: return node.data.questionToken;
        case SyntaxKind.PropertyAssignment: return node.data.questionToken;
        case SyntaxKind.ShorthandPropertyAssignment: return node.data.questionToken;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetQuestionToken` is up-to-date with `AstHasQuestionToken`/`HasQuestionToken`
            return undefined;
    }
}

/** @internal */
export function astGetTypeArguments<T extends AstNode>(node: T): AstGetResult<T, AstInternalHasTypeArguments, "typeArguments">;
export function astGetTypeArguments(node: AstNode) {
    Debug.type<AstInternalHasTypeArguments>(node); // ensures `astGetTypeArguments` is up-to-date with `AstInternalHasTypeArguments`/`InternalHasTypeArguments`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.MethodSignature: return node.data.typeArguments;
        case SyntaxKind.MethodDeclaration: return node.data.typeArguments;
        case SyntaxKind.Constructor: return node.data.typeArguments;
        case SyntaxKind.GetAccessor: return node.data.typeArguments;
        case SyntaxKind.SetAccessor: return node.data.typeArguments;
        case SyntaxKind.CallSignature: return node.data.typeArguments;
        case SyntaxKind.ConstructSignature: return node.data.typeArguments;
        case SyntaxKind.IndexSignature: return node.data.typeArguments;
        case SyntaxKind.TypeReference: return node.data.typeArguments;
        case SyntaxKind.FunctionType: return node.data.typeArguments;
        case SyntaxKind.ConstructorType: return node.data.typeArguments;
        case SyntaxKind.TypeQuery: return node.data.typeArguments;
        case SyntaxKind.ImportType: return node.data.typeArguments;
        case SyntaxKind.CallExpression: return node.data.typeArguments;
        case SyntaxKind.NewExpression: return node.data.typeArguments;
        case SyntaxKind.TaggedTemplateExpression: return node.data.typeArguments;
        case SyntaxKind.FunctionExpression: return node.data.typeArguments;
        case SyntaxKind.ArrowFunction: return node.data.typeArguments;
        case SyntaxKind.ExpressionWithTypeArguments: return node.data.typeArguments;
        case SyntaxKind.FunctionDeclaration: return node.data.typeArguments;
        case SyntaxKind.JsxSelfClosingElement: return node.data.typeArguments;
        case SyntaxKind.JsxOpeningElement: return node.data.typeArguments;
        case SyntaxKind.JSDocFunctionType: return node.data.typeArguments;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetTypeArguments` is up-to-date with `AstInternalHasTypeArguments`/`InternalHasTypeArguments`
            return undefined;
    }
}

/** @internal */
export function astGetElements<T extends AstNode>(node: T): AstGetResult<T, AstHasElements, "elements">;
export function astGetElements(node: AstNode) {
    Debug.type<AstHasElements>(node); // ensures `astGetElements` is up-to-date with `AstHasElements`/`HasElements`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.TupleType: return node.data.elements;
        case SyntaxKind.ObjectBindingPattern: return node.data.elements;
        case SyntaxKind.ArrayBindingPattern: return node.data.elements;
        case SyntaxKind.ArrayLiteralExpression: return node.data.elements;
        case SyntaxKind.NamedImports: return node.data.elements;
        case SyntaxKind.NamedExports: return node.data.elements;
        case SyntaxKind.CommaListExpression: return node.data.elements;
        case SyntaxKind.ImportAttributes: return node.data.elements;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetElements` is up-to-date with `AstHasElements`/`HasElements`
            return undefined;
    }
}

/** @internal */
export function astGetMembers<T extends AstNode>(node: T): AstGetResult<T, AstHasMembers, "members">;
export function astGetMembers(node: AstNode) {
    Debug.type<AstHasMembers>(node); // ensures `astGetMembers` is up-to-date with `AstHasMembers`/`HasMembers`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.TypeLiteral: return node.data.members;
        case SyntaxKind.MappedType: return node.data.members;
        case SyntaxKind.ClassExpression: return node.data.members;
        case SyntaxKind.ClassDeclaration: return node.data.members;
        case SyntaxKind.InterfaceDeclaration: return node.data.members;
        case SyntaxKind.EnumDeclaration: return node.data.members;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetMembers` is up-to-date with `AstHasMembers`/`HasMembers`
            return undefined;
    }
}

/** @internal */
export function astGetStatement<T extends AstNode>(node: T): AstGetResult<T, AstHasStatement, "statement">;
export function astGetStatement(node: AstNode) {
    Debug.type<AstHasStatement>(node); // ensures `astGetStatement` is up-to-date with `AstHasStatement`/`HasStatement`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.DoStatement: return node.data.statement;
        case SyntaxKind.WhileStatement: return node.data.statement;
        case SyntaxKind.ForStatement: return node.data.statement;
        case SyntaxKind.ForInStatement: return node.data.statement;
        case SyntaxKind.ForOfStatement: return node.data.statement;
        case SyntaxKind.WithStatement: return node.data.statement;
        case SyntaxKind.LabeledStatement: return node.data.statement;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetStatement` is up-to-date with `AstHasStatement`/`HasStatement`
            return undefined;
    }
}

/** @internal */
export function astGetStatements<T extends AstNode>(node: T): AstGetResult<T, AstHasStatements, "statements">;
export function astGetStatements(node: AstNode) {
    Debug.type<AstHasStatements>(node); // ensures `astGetStatements` is up-to-date with `AstHasStatements`/`HasStatements`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.Block: return node.data.statements;
        case SyntaxKind.ModuleBlock: return node.data.statements;
        case SyntaxKind.CaseClause: return node.data.statements;
        case SyntaxKind.DefaultClause: return node.data.statements;
        case SyntaxKind.SourceFile: return node.data.statements;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetStatements` is up-to-date with `AstHasStatements`/`HasStatements`
            return undefined;
    }
}

/** @internal */
export function astGetExclamationToken<T extends AstNode>(node: T): AstGetResult<T, AstHasExclamationToken, "exclamationToken">;
export function astGetExclamationToken(node: AstNode) {
    Debug.type<AstHasExclamationToken>(node); // ensures `astGetExclamationToken` is up-to-date with `AstHasExclamationToken`/`HasExclamationToken`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.PropertyDeclaration: return node.data.exclamationToken;
        case SyntaxKind.MethodDeclaration: return node.data.exclamationToken;
        case SyntaxKind.VariableDeclaration: return node.data.exclamationToken;
        case SyntaxKind.PropertyAssignment: return node.data.exclamationToken;
        case SyntaxKind.ShorthandPropertyAssignment: return node.data.exclamationToken;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetExclamationToken` is up-to-date with `AstHasExclamationToken`/`HasExclamationToken`
            return undefined;
    }
}

/** @internal */
export function astGetAsteriskToken<T extends AstNode>(node: T): AstGetResult<T, AstHasAsteriskToken, "asteriskToken">;
export function astGetAsteriskToken(node: AstNode) {
    Debug.type<AstHasAsteriskToken>(node); // ensures `astGetAsteriskToken` is up-to-date with `AstHasAsteriskToken`/`HasAsteriskToken`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.MethodDeclaration: return node.data.asteriskToken;
        case SyntaxKind.FunctionExpression: return node.data.asteriskToken;
        case SyntaxKind.YieldExpression: return node.data.asteriskToken;
        case SyntaxKind.FunctionDeclaration: return node.data.asteriskToken;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetAsteriskToken` is up-to-date with `AstHasAsteriskToken`/`HasAsteriskToken`
            return undefined;
    }
}

/** @internal */
export function astGetQuestionDotToken<T extends AstNode>(node: T): AstGetResult<T, AstHasQuestionDotToken, "questionDotToken">;
export function astGetQuestionDotToken(node: AstNode) {
    Debug.type<AstHasQuestionDotToken>(node); // ensures `astGetQuestionDotToken` is up-to-date with `AstHasQuestionDotToken`/`HasQuestionDotToken`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.PropertyAccessExpression: return node.data.questionDotToken;
        case SyntaxKind.ElementAccessExpression: return node.data.questionDotToken;
        case SyntaxKind.CallExpression: return node.data.questionDotToken;
        case SyntaxKind.TaggedTemplateExpression: return node.data.questionDotToken;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetQuestionDotToken` is up-to-date with `AstHasQuestionDotToken`/`HasQuestionDotToken`
            return undefined;
    }
}

/** @internal */
export function astGetIsTypeOnly<T extends AstNode>(node: T): AstGetResult<T, AstHasIsTypeOnly, "isTypeOnly">;
export function astGetIsTypeOnly(node: AstNode) {
    Debug.type<AstHasIsTypeOnly>(node); // ensures `astGetIsTypeOnly` is up-to-date with `AstHasIsTypeOnly`/`HasIsTypeOnly`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.ImportEqualsDeclaration: return node.data.isTypeOnly;
        case SyntaxKind.ImportClause: return node.data.isTypeOnly;
        case SyntaxKind.ImportSpecifier: return node.data.isTypeOnly;
        case SyntaxKind.ExportDeclaration: return node.data.isTypeOnly;
        case SyntaxKind.ExportSpecifier: return node.data.isTypeOnly;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetIsTypeOnly` is up-to-date with `AstHasIsTypeOnly`/`HasIsTypeOnly`
            return undefined;
    }
}

/** @internal */
export function astGetTagName<T extends AstNode>(node: T): AstGetResult<T, AstHasTagName, "tagName">;
export function astGetTagName(node: AstNode) {
    Debug.type<AstHasTagName>(node); // ensures `astGetTagName` is up-to-date with `AstHasTagName`/`HasTagName`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.JsxSelfClosingElement: return node.data.tagName;
        case SyntaxKind.JsxOpeningElement: return node.data.tagName;
        case SyntaxKind.JsxClosingElement: return node.data.tagName;
        case SyntaxKind.JSDocTag: return node.data.tagName;
        case SyntaxKind.JSDocAugmentsTag: return node.data.tagName;
        case SyntaxKind.JSDocImplementsTag: return node.data.tagName;
        case SyntaxKind.JSDocAuthorTag: return node.data.tagName;
        case SyntaxKind.JSDocDeprecatedTag: return node.data.tagName;
        case SyntaxKind.JSDocClassTag: return node.data.tagName;
        case SyntaxKind.JSDocPublicTag: return node.data.tagName;
        case SyntaxKind.JSDocPrivateTag: return node.data.tagName;
        case SyntaxKind.JSDocProtectedTag: return node.data.tagName;
        case SyntaxKind.JSDocReadonlyTag: return node.data.tagName;
        case SyntaxKind.JSDocOverrideTag: return node.data.tagName;
        case SyntaxKind.JSDocCallbackTag: return node.data.tagName;
        case SyntaxKind.JSDocOverloadTag: return node.data.tagName;
        case SyntaxKind.JSDocEnumTag: return node.data.tagName;
        case SyntaxKind.JSDocParameterTag: return node.data.tagName;
        case SyntaxKind.JSDocReturnTag: return node.data.tagName;
        case SyntaxKind.JSDocThisTag: return node.data.tagName;
        case SyntaxKind.JSDocTypeTag: return node.data.tagName;
        case SyntaxKind.JSDocTemplateTag: return node.data.tagName;
        case SyntaxKind.JSDocTypedefTag: return node.data.tagName;
        case SyntaxKind.JSDocSeeTag: return node.data.tagName;
        case SyntaxKind.JSDocPropertyTag: return node.data.tagName;
        case SyntaxKind.JSDocThrowsTag: return node.data.tagName;
        case SyntaxKind.JSDocSatisfiesTag: return node.data.tagName;
        case SyntaxKind.JSDocImportTag: return node.data.tagName;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetTagName` is up-to-date with `AstHasTagName`/`HasTagName`
            return undefined;
    }
}

/** @internal */
export function astGetComment<T extends AstNode>(node: T): AstGetResult<T, AstHasComment, "comment" | "commentArray">;
export function astGetComment(node: AstNode) {
    Debug.type<AstHasComment>(node); // ensures `astGetComment` is up-to-date with `AstHasComment`/`HasComment`
    // NOTE: each branch is duplicated to remain monomorphic
    switch (node.kind) {
        case SyntaxKind.JSDoc: return node.data.comment ?? node.data.commentArray;
        case SyntaxKind.JSDocTag: return node.data.comment ?? node.data.commentArray;
        case SyntaxKind.JSDocAugmentsTag: return node.data.comment ?? node.data.commentArray;
        case SyntaxKind.JSDocImplementsTag: return node.data.comment ?? node.data.commentArray;
        case SyntaxKind.JSDocAuthorTag: return node.data.comment ?? node.data.commentArray;
        case SyntaxKind.JSDocDeprecatedTag: return node.data.comment ?? node.data.commentArray;
        case SyntaxKind.JSDocClassTag: return node.data.comment ?? node.data.commentArray;
        case SyntaxKind.JSDocPublicTag: return node.data.comment ?? node.data.commentArray;
        case SyntaxKind.JSDocPrivateTag: return node.data.comment ?? node.data.commentArray;
        case SyntaxKind.JSDocProtectedTag: return node.data.comment ?? node.data.commentArray;
        case SyntaxKind.JSDocReadonlyTag: return node.data.comment ?? node.data.commentArray;
        case SyntaxKind.JSDocOverrideTag: return node.data.comment ?? node.data.commentArray;
        case SyntaxKind.JSDocCallbackTag: return node.data.comment ?? node.data.commentArray;
        case SyntaxKind.JSDocOverloadTag: return node.data.comment ?? node.data.commentArray;
        case SyntaxKind.JSDocEnumTag: return node.data.comment ?? node.data.commentArray;
        case SyntaxKind.JSDocParameterTag: return node.data.comment ?? node.data.commentArray;
        case SyntaxKind.JSDocReturnTag: return node.data.comment ?? node.data.commentArray;
        case SyntaxKind.JSDocThisTag: return node.data.comment ?? node.data.commentArray;
        case SyntaxKind.JSDocTypeTag: return node.data.comment ?? node.data.commentArray;
        case SyntaxKind.JSDocTemplateTag: return node.data.comment ?? node.data.commentArray;
        case SyntaxKind.JSDocTypedefTag: return node.data.comment ?? node.data.commentArray;
        case SyntaxKind.JSDocSeeTag: return node.data.comment ?? node.data.commentArray;
        case SyntaxKind.JSDocPropertyTag: return node.data.comment ?? node.data.commentArray;
        case SyntaxKind.JSDocThrowsTag: return node.data.comment ?? node.data.commentArray;
        case SyntaxKind.JSDocSatisfiesTag: return node.data.comment ?? node.data.commentArray;
        case SyntaxKind.JSDocImportTag: return node.data.comment ?? node.data.commentArray;
        default:
            Debug.assertNeverTypeOnly(node); // ensures `astGetComment` is up-to-date with `AstHasComment`/`HasComment`
            return undefined;
    }
}

/** @internal */
export function astSetComment<T extends AstHasComment>(node: T, value: string | AstNodeArray<AstJSDocComment> | undefined): string | AstNodeArray<AstJSDocComment> | undefined {
    if (typeof value === "string") {
        // NOTE: each branch is duplicated to remain monomorphic
        switch (node.kind) {
            case SyntaxKind.JSDoc: return node.data.comment = value;
            case SyntaxKind.JSDocTag: return node.data.comment = value;
            case SyntaxKind.JSDocAugmentsTag: return node.data.comment = value;
            case SyntaxKind.JSDocImplementsTag: return node.data.comment = value;
            case SyntaxKind.JSDocAuthorTag: return node.data.comment = value;
            case SyntaxKind.JSDocDeprecatedTag: return node.data.comment = value;
            case SyntaxKind.JSDocClassTag: return node.data.comment = value;
            case SyntaxKind.JSDocPublicTag: return node.data.comment = value;
            case SyntaxKind.JSDocPrivateTag: return node.data.comment = value;
            case SyntaxKind.JSDocProtectedTag: return node.data.comment = value;
            case SyntaxKind.JSDocReadonlyTag: return node.data.comment = value;
            case SyntaxKind.JSDocOverrideTag: return node.data.comment = value;
            case SyntaxKind.JSDocCallbackTag: return node.data.comment = value;
            case SyntaxKind.JSDocOverloadTag: return node.data.comment = value;
            case SyntaxKind.JSDocEnumTag: return node.data.comment = value;
            case SyntaxKind.JSDocParameterTag: return node.data.comment = value;
            case SyntaxKind.JSDocReturnTag: return node.data.comment = value;
            case SyntaxKind.JSDocThisTag: return node.data.comment = value;
            case SyntaxKind.JSDocTypeTag: return node.data.comment = value;
            case SyntaxKind.JSDocTemplateTag: return node.data.comment = value;
            case SyntaxKind.JSDocTypedefTag: return node.data.comment = value;
            case SyntaxKind.JSDocSeeTag: return node.data.comment = value;
            case SyntaxKind.JSDocPropertyTag: return node.data.comment = value;
            case SyntaxKind.JSDocThrowsTag: return node.data.comment = value;
            case SyntaxKind.JSDocSatisfiesTag: return node.data.comment = value;
            case SyntaxKind.JSDocImportTag: return node.data.comment = value;
            default:
                Debug.assertNever(node); // ensures `astSetComment` is up-to-date with `AstHasComment`/`HasComment`
        }
    }
    else {
        // NOTE: each branch is duplicated to remain monomorphic
        switch (node.kind) {
            case SyntaxKind.JSDoc: return node.data.commentArray = value;
            case SyntaxKind.JSDocTag: return node.data.commentArray = value;
            case SyntaxKind.JSDocAugmentsTag: return node.data.commentArray = value;
            case SyntaxKind.JSDocImplementsTag: return node.data.commentArray = value;
            case SyntaxKind.JSDocAuthorTag: return node.data.commentArray = value;
            case SyntaxKind.JSDocDeprecatedTag: return node.data.commentArray = value;
            case SyntaxKind.JSDocClassTag: return node.data.commentArray = value;
            case SyntaxKind.JSDocPublicTag: return node.data.commentArray = value;
            case SyntaxKind.JSDocPrivateTag: return node.data.commentArray = value;
            case SyntaxKind.JSDocProtectedTag: return node.data.commentArray = value;
            case SyntaxKind.JSDocReadonlyTag: return node.data.commentArray = value;
            case SyntaxKind.JSDocOverrideTag: return node.data.commentArray = value;
            case SyntaxKind.JSDocCallbackTag: return node.data.commentArray = value;
            case SyntaxKind.JSDocOverloadTag: return node.data.commentArray = value;
            case SyntaxKind.JSDocEnumTag: return node.data.commentArray = value;
            case SyntaxKind.JSDocParameterTag: return node.data.commentArray = value;
            case SyntaxKind.JSDocReturnTag: return node.data.commentArray = value;
            case SyntaxKind.JSDocThisTag: return node.data.commentArray = value;
            case SyntaxKind.JSDocTypeTag: return node.data.commentArray = value;
            case SyntaxKind.JSDocTemplateTag: return node.data.commentArray = value;
            case SyntaxKind.JSDocTypedefTag: return node.data.commentArray = value;
            case SyntaxKind.JSDocSeeTag: return node.data.commentArray = value;
            case SyntaxKind.JSDocPropertyTag: return node.data.commentArray = value;
            case SyntaxKind.JSDocThrowsTag: return node.data.commentArray = value;
            case SyntaxKind.JSDocSatisfiesTag: return node.data.commentArray = value;
            case SyntaxKind.JSDocImportTag: return node.data.commentArray = value;
            default:
                Debug.assertNever(node); // ensures `astSetComment` is up-to-date with `AstHasComment`/`HasComment`
        }
    }
}

// NOTE: each branch is duplicated to remain monomorphic
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

function copyDataPropertiesCore(data: AstData, clone: AstData) {
    Object.assign(clone, data);
}

function copyDataProperties(node: AstNode, clone: AstData) {
    const fn = copyDataPropertiesMap[node.kind];
    return fn !== undefined ? fn(node.data, clone) : copyDataPropertiesCore(node.data, clone);
}

function createDataInstanceCore(data: AstData) {
    return Object.create(Object.getPrototypeOf(data));
}

function createDataInstance(node: AstNode) {
    const fn = createDataInstanceMap[node.kind];
    return fn !== undefined ? fn(node.data) :
        isTokenKind(node.kind) ? new AstTokenData() :
        createDataInstanceCore(node.data);
}

function cloneData(node: AstNode) {
    const clone = createDataInstance(node);
    copyDataProperties(node, clone);
    return clone;
}

function cloneNode(node: AstNode) {
    const fn = cloneNodeMap[node.kind];
    return fn !== undefined ? fn(node) : cloneNodeCore(node);
}

function shadowDataCore(data: AstData) {
    return Object.create(data);
}

function shadowData(node: AstNode) {
    const fn = shadowDataMap[node.kind];
    return fn !== undefined ? fn(node.data) : shadowDataCore(node.data);
}

function shadowNode(node: AstNode) {
    const fn = shadowNodeMap[node.kind];
    return fn !== undefined ? fn(node) : shadowCore(node);
}

function astIsPropertyName(node: AstNode): node is AstPropertyName {
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
export function astIsJSDocTypeAssertion(node: AstNode): node is AstJSDocTypeAssertion {
    return astIsParenthesizedExpression(node)
        && !!(node.flags & NodeFlags.JavaScriptFile)
        && !!getJSDocTypeTag(node.node); // TODO: don't invoke node
}

/** @internal */
export type AstOuterExpression = AstNodeOneOf<OuterExpression>;

/** @internal */
export type AstWrappedExpression<T extends AstExpression> = AstNodeOneOf<WrappedExpression<T["node"]>>;

// Temporary `Node` implementation representing every possible `Node` shape.
// This is only used for testing and will be removed in favor of the node classes in types.ts
class AnyNode<TKind extends SyntaxKind> extends Node<TKind, any> {
    declare _literalExpressionBrand: any;
    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
    declare _declarationBrand: any;
    declare _signatureDeclarationBrand: any;
    declare _typeElementBrand: any;
    declare _jsdocContainerBrand: any;
    declare _localsContainerBrand: any;
    declare _flowContainerBrand: any;
    declare _classElementBrand: any;
    declare _objectLiteralBrand: any;
    declare _functionLikeDeclarationBrand: any;
    declare _typeNodeBrand: any;
    declare _statementBrand: any;
    declare _jsDocTypeBrand: any;

    override getChildCount(sourceFile?: SourceFileLike): number {
        if (isTokenKind(this.kind)) {
            return this.getChildren().length;
        }
        return super.getChildCount(sourceFile);
    }

    override getChildAt(index: number, sourceFile?: SourceFileLike): Node {
        if (isTokenKind(this.kind)) {
            return this.getChildren()[index];
        }
        return super.getChildAt(index, sourceFile);
    }

    override getChildren(sourceFile?: SourceFileLike): readonly Node[] {
        if (isTokenKind(this.kind)) {
            return this.kind === SyntaxKind.EndOfFileToken ? (this as Node as EndOfFileToken).jsDoc ?? emptyArray : emptyArray;
        }
        return super.getChildren(sourceFile);
    }

    override getFirstToken(sourceFile?: SourceFileLike): Node | undefined {
        if (isTokenKind(this.kind)) {
            return undefined;
        }
        return super.getFirstToken(sourceFile);
    }

    override getLastToken(sourceFile?: SourceFileLike): Node | undefined {
        if (isTokenKind(this.kind)) {
            return undefined;
        }
        return super.getLastToken(sourceFile);
    }

    override forEachChild<T>(cbNode: (node: Node) => T | undefined, cbNodeArray?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        if (isTokenKind(this.kind)) {
            return undefined;
        }
        return super.forEachChild(cbNode, cbNodeArray);
    }

    override get parent(): any { return super.parent; }
    override set parent(value) { super.parent = value; }

    get left() { return this.ast.data.left?.node; }
    set left(value) { this.ast.data.left = value?.ast; }
    get right() { return this.ast.data.right?.node; }
    set right(value) { this.ast.data.right = value?.ast; }
    get expression() { return astGetExpression(this.ast)?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
    get modifiers() { return astGetModifiers(this.ast)?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get name() { return astGetName(this.ast)?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get constraint() { return this.ast.data.constraint?.node; }
    set constraint(value) { this.ast.data.constraint = value?.ast; }
    get default() { return this.ast.data.default?.node; }
    set default(value) { this.ast.data.default = value?.ast; }
    get typeParameters(): any { return astGetTypeParameters(this.ast)?.nodes; }
    set typeParameters(value) { this.ast.data.typeParameters = value?.ast; }
    get parameters() { return astGetParameters(this.ast)?.nodes; }
    set parameters(value) { this.ast.data.parameters = value?.ast; }
    get type() {
        if (this.kind === SyntaxKind.SyntheticExpression) {
            return this.ast.data.type;
        }
        return astGetType(this.ast)?.node;
    }
    set type(value) {
        if (this.kind === SyntaxKind.SyntheticExpression) {
            this.ast.data.type = value;
        }
        else {
            this.ast.data.type = value?.ast;
        }
    }
    get typeArguments() { return astGetTypeArguments(this.ast)?.nodes; }
    set typeArguments(value) { this.ast.data.typeArguments = value?.ast; }
    get exclamationToken() { return astGetExclamationToken(this.ast)?.node; }
    set exclamationToken(value) { this.ast.data.exclamationToken = value?.ast; }
    get initializer() { return astGetInitializer(this.ast)?.node; }
    set initializer(value) { this.ast.data.initializer = value?.ast; }
    get declarations() { return this.ast.data.declarations.nodes; }
    set declarations(value) { this.ast.data.declarations = value.ast; }
    get dotDotDotToken() { return this.ast.data.dotDotDotToken?.node; }
    set dotDotDotToken(value) { this.ast.data.dotDotDotToken = value?.ast; }
    get questionToken() { return astGetQuestionToken(this.ast)?.node; }
    set questionToken(value) { this.ast.data.questionToken = value?.ast; }
    get propertyName() { return this.ast.data.propertyName?.node; }
    set propertyName(value) { this.ast.data.propertyName = value?.ast; }
    get equalsToken() { return this.ast.data.equalsToken?.node; }
    set equalsToken(value) { this.ast.data.equalsToken = value?.ast; }
    get objectAssignmentInitializer() { return this.ast.data.objectAssignmentInitializer?.node; }
    set objectAssignmentInitializer(value) { this.ast.data.objectAssignmentInitializer = value?.ast; }
    get elements(): any { return astGetElements(this.ast)?.nodes; }
    set elements(value) { this.ast.data.elements = value.ast; }
    get asteriskToken() { return astGetAsteriskToken(this.ast)?.node; }
    set asteriskToken(value) { this.ast.data.asteriskToken = value?.ast; }
    get body() { return astGetBody(this.ast)?.node; }
    set body(value) { this.ast.data.body = value?.ast; }
    get assertClause() { return this.ast.data.assertClause?.node; }
    set assertClause(value) { this.ast.data.assertClause = value?.ast; }
    get multiLine() { return this.ast.data.multiLine; }
    set multiLine(value) { this.ast.data.multiLine = value; }
    get isTypeOf() { return this.ast.data.isTypeOf; }
    set isTypeOf(value) { this.ast.data.isTypeOf = value; }
    get argument() { return this.ast.data.argument.node; }
    set argument(value) { this.ast.data.argument = value.ast; }
    get attributes() { return this.ast.data.attributes?.node; }
    set attributes(value) { this.ast.data.attributes = value?.ast; }
    get assertions() { return this.ast.data.assertions?.node; }
    set assertions(value) { this.ast.data.assertions = value?.ast; }
    get qualifier() { return this.ast.data.qualifier?.node; }
    set qualifier(value) { this.ast.data.qualifier = value?.ast; }
    get typeName() { return this.ast.data.typeName.node; }
    set typeName(value) { this.ast.data.typeName = value.ast; }
    get assertsModifier() { return this.ast.data.assertsModifier?.node; }
    set assertsModifier(value) { this.ast.data.assertsModifier = value?.ast; }
    get parameterName() { return this.ast.data.parameterName.node; }
    set parameterName(value) { this.ast.data.parameterName = value.ast; }
    get exprName() { return this.ast.data.exprName.node; }
    set exprName(value) { this.ast.data.exprName = value.ast; }
    get members() { return astGetMembers(this.ast)?.nodes; }
    set members(value) { this.ast.data.members = value?.ast; }
    get elementType() { return this.ast.data.elementType.node; }
    set elementType(value) { this.ast.data.elementType = value.ast; }
    get types() { return astGetTypes(this.ast).nodes; }
    set types(value) { this.ast.data.types = value.ast; }
    get checkType() { return this.ast.data.checkType.node; }
    set checkType(value) { this.ast.data.checkType = value.ast; }
    get extendsType() { return this.ast.data.extendsType.node; }
    set extendsType(value) { this.ast.data.extendsType = value.ast; }
    get trueType() { return this.ast.data.trueType.node; }
    set trueType(value) { this.ast.data.trueType = value.ast; }
    get falseType() { return this.ast.data.falseType.node; }
    set falseType(value) { this.ast.data.falseType = value.ast; }
    get typeParameter() { return this.ast.data.typeParameter.node; }
    set typeParameter(value) { this.ast.data.typeParameter = value.ast; }
    get operator() { return this.ast.data.operator; }
    set operator(value) { this.ast.data.operator = value; }
    get objectType() { return this.ast.data.objectType.node; }
    set objectType(value) { this.ast.data.objectType = value.ast; }
    get indexType() { return this.ast.data.indexType.node; }
    set indexType(value) { this.ast.data.indexType = value.ast; }
    get readonlyToken() { return this.ast.data.readonlyToken?.node; }
    set readonlyToken(value) { this.ast.data.readonlyToken = value?.ast; }
    get nameType() { return this.ast.data.nameType?.node; }
    set nameType(value) { this.ast.data.nameType = value?.ast; }
    get literal() { return this.ast.data.literal.node; }
    set literal(value) { this.ast.data.literal = value.ast; }
    get head() { return this.ast.data.head.node; }
    set head(value) { this.ast.data.head = value.ast; }
    get templateSpans() { return this.ast.data.templateSpans.nodes; }
    set templateSpans(value) { this.ast.data.templateSpans = value.ast; }
    get operand() { return this.ast.data.operand.node; }
    set operand(value) { this.ast.data.operand = value.ast; }
    get isSpread() { return this.ast.data.isSpread; }
    set isSpread(value) { this.ast.data.isSpread = value; }
    get tupleNameSource() { return this.ast.data.tupleNameSource?.node; }
    set tupleNameSource(value) { this.ast.data.tupleNameSource = value?.ast; }
    get operatorToken() { return this.ast.data.operatorToken.node; }
    set operatorToken(value) { this.ast.data.operatorToken = value.ast; }
    get condition() { return this.ast.data.condition?.node; }
    set condition(value) { this.ast.data.condition = value?.ast; }
    get whenTrue() { return this.ast.data.whenTrue.node; }
    set whenTrue(value) { this.ast.data.whenTrue = value.ast; }
    get colonToken() { return this.ast.data.colonToken.node; }
    set colonToken(value) { this.ast.data.colonToken = value.ast; }
    get whenFalse() { return this.ast.data.whenFalse.node; }
    set whenFalse(value) { this.ast.data.whenFalse = value.ast; }
    get equalsGreaterThanToken() { return this.ast.data.equalsGreaterThanToken.node; }
    set equalsGreaterThanToken(value) { this.ast.data.equalsGreaterThanToken = value.ast; }
    get properties() { return this.ast.data.properties?.nodes; }
    set properties(value) { this.ast.data.properties = value?.ast; }
    get questionDotToken() { return astGetQuestionDotToken(this.ast)?.node; }
    set questionDotToken(value) { this.ast.data.questionDotToken = value?.ast; }
    get argumentExpression() { return this.ast.data.argumentExpression.node; }
    set argumentExpression(value) { this.ast.data.argumentExpression = value.ast; }
    get arguments() { return this.ast.data.arguments?.nodes; }
    set arguments(value) { this.ast.data.arguments = value?.ast; }
    get tag() { return this.ast.data.tag.node; }
    set tag(value) { this.ast.data.tag = value.ast; }
    get template() { return this.ast.data.template.node; }
    set template(value) { this.ast.data.template = value.ast; }
    get keywordToken() { return this.ast.data.keywordToken; }
    set keywordToken(value) { this.ast.data.keywordToken = value; }
    get openingElement() { return this.ast.data.openingElement.node; }
    set openingElement(value) { this.ast.data.openingElement = value.ast; }
    get children() { return this.ast.data.children.nodes; }
    set children(value) { this.ast.data.children = value.ast; }
    get closingElement() { return this.ast.data.closingElement.node; }
    set closingElement(value) { this.ast.data.closingElement = value.ast; }
    get namespace() { return this.ast.data.namespace.node; }
    set namespace(value) { this.ast.data.namespace = value.ast; }
    get tagName() { return astGetTagName(this.ast).node; }
    set tagName(value) { this.ast.data.tagName = value.ast; }
    get openingFragment() { return this.ast.data.openingFragment.node; }
    set openingFragment(value) { this.ast.data.openingFragment = value.ast; }
    get closingFragment() { return this.ast.data.closingFragment.node; }
    set closingFragment(value) { this.ast.data.closingFragment = value.ast; }
    get thisArg() { return this.ast.data.thisArg.node; }
    set thisArg(value) { this.ast.data.thisArg = value.ast; }
    get statements() { return astGetStatements(this.ast).nodes; }
    set statements(value) { this.ast.data.statements = value.ast; }
    get declarationList() { return this.ast.data.declarationList.node; }
    set declarationList(value) { this.ast.data.declarationList = value.ast; }
    get thenStatement() { return this.ast.data.thenStatement.node; }
    set thenStatement(value) { this.ast.data.thenStatement = value.ast; }
    get elseStatement() { return this.ast.data.elseStatement?.node; }
    set elseStatement(value) { this.ast.data.elseStatement = value?.ast; }
    get statement() { return astGetStatement(this.ast).node; }
    set statement(value) { this.ast.data.statement = value.ast; }
    get incrementor() { return this.ast.data.incrementor?.node; }
    set incrementor(value) { this.ast.data.incrementor = value?.ast; }
    get awaitModifier() { return this.ast.data.awaitModifier?.node; }
    set awaitModifier(value) { this.ast.data.awaitModifier = value?.ast; }
    get label() { return this.ast.data.label?.node; }
    set label(value) { this.ast.data.label = value?.ast; }
    get caseBlock() { return this.ast.data.caseBlock.node; }
    set caseBlock(value) { this.ast.data.caseBlock = value.ast; }
    get possiblyExhaustive() { return this.ast.data.possiblyExhaustive; }
    set possiblyExhaustive(value) { this.ast.data.possiblyExhaustive = value; }
    get clauses() { return this.ast.data.clauses?.nodes; }
    set clauses(value) { this.ast.data.clauses = value?.ast; }
    get tryBlock() { return this.ast.data.tryBlock.node; }
    set tryBlock(value) { this.ast.data.tryBlock = value.ast; }
    get catchClause() { return this.ast.data.catchClause?.node; }
    set catchClause(value) { this.ast.data.catchClause = value?.ast; }
    get finallyBlock() { return this.ast.data.finallyBlock?.node; }
    set finallyBlock(value) { this.ast.data.finallyBlock = value?.ast; }
    get variableDeclaration() { return this.ast.data.variableDeclaration?.node; }
    set variableDeclaration(value) { this.ast.data.variableDeclaration = value?.ast; }
    get block() { return this.ast.data.block?.node; }
    set block(value) { this.ast.data.block = value?.ast; }
    get heritageClauses() { return this.ast.data.heritageClauses?.nodes; }
    set heritageClauses(value) { this.ast.data.heritageClauses = value?.ast; }
    get token() { return this.ast.data.token; }
    set token(value) { this.ast.data.token = value; }
    get isTypeOnly(): any { return astGetIsTypeOnly(this.ast); }
    set isTypeOnly(value) { this.ast.data.isTypeOnly = value; }
    get moduleReference() { return this.ast.data.moduleReference.node; }
    set moduleReference(value) { this.ast.data.moduleReference = value.ast; }
    get importClause() { return this.ast.data.importClause?.node; }
    set importClause(value) { this.ast.data.importClause = value?.ast; }
    get moduleSpecifier() { return this.ast.data.moduleSpecifier?.node; }
    set moduleSpecifier(value) { this.ast.data.moduleSpecifier = value?.ast; }
    get namedBindings() { return this.ast.data.namedBindings?.node; }
    set namedBindings(value) { this.ast.data.namedBindings = value?.ast; }
    get value() { return this.ast.data.value.node; }
    set value(value) { this.ast.data.value = value.ast; }
    get exportClause() { return this.ast.data.exportClause?.node; }
    set exportClause(value) { this.ast.data.exportClause = value?.ast; }
    get isExportEquals() { return this.ast.data.isExportEquals; }
    set isExportEquals(value) { this.ast.data.isExportEquals = value; }
    get postfix() { return this.ast.data.postfix; }
    set postfix(value) { this.ast.data.postfix = value; }
    get tags() { return this.ast.data.tags?.nodes; }
    set tags(value) { this.ast.data.tags = value?.ast; }
    get comment() {
        const comment = astGetComment(this.ast);
        return typeof comment === "string" ? comment : comment?.nodes;
    }
    set comment(value) { this.ast.data.comment = typeof value === "string" ? value : value?.ast; }
    get class() { return this.ast.data.class.node; }
    set class(value) { this.ast.data.class = value.ast; }
    get typeExpression() { return this.ast.data.typeExpression?.node; }
    set typeExpression(value) { this.ast.data.typeExpression = value?.ast; }
    get fullName() { return this.ast.data.fullName?.node; }
    set fullName(value) { this.ast.data.fullName = value?.ast; }
    get isNameFirst() { return this.ast.data.isNameFirst; }
    set isNameFirst(value) { this.ast.data.isNameFirst = value; }
    get isBracketed() { return this.ast.data.isBracketed; }
    set isBracketed(value) { this.ast.data.isBracketed = value; }
    get jsDocPropertyTags() { return this.ast.data.jsDocPropertyTags?.nodes; }
    set jsDocPropertyTags(value) { this.ast.data.jsDocPropertyTags = value?.ast; }
    get isArrayType() { return this.ast.data.isArrayType; }
    set isArrayType(value) { this.ast.data.isArrayType = value; }
    get escapedText() { return this.ast.data.escapedText; }
    set escapedText(value) { this.ast.data.escapedText = value; }
    get text(): any {
        switch (this.kind) {
            case SyntaxKind.Identifier:
            case SyntaxKind.PrivateIdentifier:
                return astIdText(this.ast as unknown as AstIdentifier | AstPrivateIdentifier);
            default:
                return astGetText(this.ast);
        }
    }
    set text(value) { this.ast.data.text = value; }
    get isUnterminated() { return this.ast.data.isUnterminated; }
    set isUnterminated(value) { this.ast.data.isUnterminated = value; }
    get hasExtendedUnicodeEscape() { return this.ast.data.hasExtendedUnicodeEscape; }
    set hasExtendedUnicodeEscape(value) { this.ast.data.hasExtendedUnicodeEscape = value; }
    get singleQuote() { return this.ast.data.singleQuote; }
    set singleQuote(value) { this.ast.data.singleQuote = value; }
    get textSourceNode() { return this.ast.data.textSourceNode?.node; }
    set textSourceNode(value) { this.ast.data.textSourceNode = value?.ast; }
    get rawText() { return this.ast.data.rawText; }
    set rawText(value) { this.ast.data.rawText = value; }
    get templateFlags() { return this.ast.data.templateFlags; }
    set templateFlags(value) { this.ast.data.templateFlags = value; }
    get numericLiteralFlags() { return this.ast.data.numericLiteralFlags; }
    set numericLiteralFlags(value) { this.ast.data.numericLiteralFlags = value; }
    get containsOnlyTriviaWhiteSpaces() { return this.ast.data.containsOnlyTriviaWhiteSpaces; }
    set containsOnlyTriviaWhiteSpaces(value) { this.ast.data.containsOnlyTriviaWhiteSpaces = value; }
    get resolvedSymbol() { return this.ast.data.resolvedSymbol; }
    set resolvedSymbol(value) { this.ast.data.resolvedSymbol = value; }
    get symbol(): any { return astGetSymbol(this.ast); }
    set symbol(value) { astSetSymbol(this.ast as AstHasSymbol, value); }
    get localSymbol(): any { return astGetLocalSymbol(this.ast); }
    set localSymbol(value) { astSetLocalSymbol(this.ast as AstHasSymbol, value); }
    get jsDoc() { return astGetJSDoc(this.ast); }
    set jsDoc(value) { astSetJSDoc(this.ast as AstHasJSDoc, value); }
    get flowNode() { return astGetFlowNode(this.ast); }
    set flowNode(value) { astSetFlowNode(this.ast as AstHasFlowNode, value); }
    get locals(): any { return astGetLocals(this.ast); }
    set locals(value) { astSetLocals(this.ast as AstHasLocals, value); }
    get nextContainer(): any { return astGetNextContainer(this.ast)?.node; }
    set nextContainer(value) { astSetNextContainer(this.ast as AstHasLocals, value?.ast); }
    get endFlowNode() { return astGetEndFlowNode(this.ast); }
    set endFlowNode(value) { astSetEndFlowNode(this.ast as AstHasEndFlowNode, value); }
    get returnFlowNode() { return this.ast.data.returnFlowNode; }
    set returnFlowNode(value) { this.ast.data.returnFlowNode = value; }
    get fallthroughFlowNode() { return this.ast.data.fallthroughFlowNode; }
    set fallthroughFlowNode(value) { this.ast.data.fallthroughFlowNode = value; }
}