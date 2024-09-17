import * as ts from "./_namespaces/ts.js";
import {
    __String,
    AmdDependency,
    AssignmentOperator,
    BinaryOperator,
    CheckJsDirective,
    CommentDirective,
    computePositionOfLineAndCharacter,
    containsObjectRestOrSpread,
    createMultiMap,
    createScanner,
    Debug,
    DiagnosticWithLocation,
    EmitFlags,
    EmitNode,
    emptyArray,
    FileReference,
    find,
    FlowNode,
    forEach,
    forEachChild,
    getAssignmentDeclarationKind,
    getLineAndCharacterOfPosition,
    getLineStarts,
    getNodeChildren,
    getNonAssignedNameOfDeclaration,
    getSourceFileOfNode,
    getTextOfIdentifierOrLiteral,
    getTokenPosOfNode,
    getTransformFlagsSubtreeExclusions,
    hasProperty,
    hasSyntacticModifier,
    hasTabstop,
    idText,
    isBindingPattern,
    isComputedPropertyName,
    isJSDocCommentContainingNode,
    isLogicalOrCoalescingAssignmentOperator,
    isNamedExports,
    isPrivateIdentifier,
    isPropertyAccessExpression,
    isPropertyName,
    isStringOrNumericLiteralLike,
    JSDocArray,
    KeywordSyntaxKind,
    LanguageVariant,
    lastOrUndefined,
    ModifierFlags,
    ModifierSyntaxKind,
    modifierToFlag,
    NodeFlags,
    NodeId,
    PackageJsonInfo,
    Path,
    positionIsSynthesized,
    PostfixUnaryOperator,
    PrefixUnaryOperator,
    PunctuationSyntaxKind,
    ReadonlyPragmaMap,
    ResolutionMode,
    Scanner,
    ScriptKind,
    ScriptTarget,
    setNodeChildren,
    Symbol,
    SymbolTable,
    SyntaxKind,
    TokenFlags,
    TokenSyntaxKind,
    TransformFlags,
    Type,
    TypeNodeSyntaxKind,
    updateSourceFile,
} from "./_namespaces/ts.js";
import { isAstParenthesizedExpression } from "./_namespaces/ts.ast.js";

/** @internal */
export type NextContainer = AstNode<HasLocals>;

/** @internal */
export class AstNodeId {
    id: NodeId = 0;
}

// TODO: This shouldn't be exported but not exporting breaks dtsBundler
/** @internal */
export class AstNodeExtraFields {
    id = new AstNodeId();
    original: AstNode | undefined = undefined;
    emitNode: EmitNode | undefined = undefined;
    modifierFlagsCache = ModifierFlags.None;
    transformFlags: TransformFlags | undefined = undefined;
    __pos: number | undefined = undefined;
    __end: number | undefined = undefined;
}

let astNodeCloneCore: (node: AstNode) => AstNode;
let astNodeShadowCore: (node: AstNode) => AstNode;
let astNodeMaybeExtra: (node: AstNode) => AstNodeExtraFields | undefined;

/** @internal */
export class AstNode<N extends Node<SyntaxKind, AstData> = Node<SyntaxKind, AstData>> {
    static {
        astNodeCloneCore = node => node.cloneCore();
        astNodeShadowCore = node => node.shadowCore();
        astNodeMaybeExtra = node => node._extra;
    }

    private _node: N | undefined = undefined;
    private _nodeConstructor: NodeConstructor<N> = undefined!;
    private _extra: AstNodeExtraFields | undefined = undefined;

    readonly kind: N["kind"] = 0;
    readonly data: N["data"] = undefined!;

    parent: AstNode<NonNullable<N["parent"]>> | undefined = undefined;
    flags: NodeFlags;
    pos = -1;
    end = -1;

    constructor(kind: N["kind"], data: N["data"], nodeConstructor: NodeConstructor<N>, flags = NodeFlags.None) {
        this.kind = kind;
        this.data = data;
        this.flags = flags;
        this._nodeConstructor = nodeConstructor;
    }

    get node() { return this._node ??= new this._nodeConstructor(this); }

    get id() { return this._extra?.id.id ?? 0; }
    set id(value) { this.extra.id.id = value; }
    get original() { return this._extra?.original; }
    set original(value) { this.extra.original = value; }
    get emitNode() { return this._extra?.emitNode; }
    set emitNode(value) { this.extra.emitNode = value; }
    get transformFlags() {
        const transformFlags = this._extra?.transformFlags;
        if (transformFlags === undefined) {
            this.extra.transformFlags = TransformFlags.None;
            return this.extra.transformFlags = this.data.computeTransformFlags(this);
        }
        return transformFlags;
    }
    set transformFlags(value) { this.extra.transformFlags = value; }

    get modifierFlagsCache() { return this._extra?.modifierFlagsCache ?? ModifierFlags.None; }
    set modifierFlagsCache(value) { this.extra.modifierFlagsCache = value; }

    /*private*/ get extra() { return this._extra ??= new AstNodeExtraFields(); }

    /**
     * Creates a shallow data-only clone of this node.
     *
     * Note to implementors: This method should not be overridden.
     * @sealed
     */
    clone(): AstNode {
        return this.data.cloneNode(this);
    }

    /**
     * Creates a shallow data-only clone of this node.
     *
     * @virtual
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
     */
    shadow(): AstNode {
        return this.data.shadowNode(this);
    }

    /**
     * Creates a new data object using this object as the prototype.
     * This is primarily used for the purpose of redirecting source files.
     *
     * @virtual
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

    static EndOfFileToken() { return new AstNode(SyntaxKind.EndOfFileToken, new AstEndOfFileTokenData(), EndOfFileToken); }
    static ThisExpression() { return new AstNode(SyntaxKind.ThisKeyword, new AstThisExpressionData(), ThisExpression); }
    static SuperExpression() { return new AstNode(SyntaxKind.SuperKeyword, new AstSuperExpressionData(), SuperExpression); }
    static ImportExpression() { return new AstNode(SyntaxKind.ImportKeyword, new AstTokenData(), ImportExpression); }
    static NullLiteral() { return new AstNode(SyntaxKind.NullKeyword, new AstTokenData(), NullLiteral); }
    static TrueLiteral() { return new AstNode(SyntaxKind.TrueKeyword, new AstTokenData(), TrueLiteral); }
    static FalseLiteral() { return new AstNode(SyntaxKind.FalseKeyword, new AstTokenData(), FalseLiteral); }
    static Identifier() { return new AstNode(SyntaxKind.Identifier, new AstIdentifierData(), Identifier); }
    static QualifiedName() { return new AstNode(SyntaxKind.QualifiedName, new AstQualifiedNameData(), QualifiedName); }
    static ComputedPropertyName() { return new AstNode(SyntaxKind.ComputedPropertyName, new AstComputedPropertyNameData(), ComputedPropertyName); }
    static PrivateIdentifier() { return new AstNode(SyntaxKind.PrivateIdentifier, new AstPrivateIdentifierData(), PrivateIdentifier); }
    static TypeParameterDeclaration() { return new AstNode(SyntaxKind.TypeParameter, new AstTypeParameterDeclarationData(), TypeParameterDeclaration); }
    static ParameterDeclaration() { return new AstNode(SyntaxKind.Parameter, new AstParameterDeclarationData(), ParameterDeclaration); }
    static Decorator() { return new AstNode(SyntaxKind.Decorator, new AstDecoratorData(), Decorator); }
    static PropertySignature() { return new AstNode(SyntaxKind.PropertySignature, new AstPropertySignatureData(), PropertySignature); }
    static CallSignatureDeclaration() { return new AstNode(SyntaxKind.CallSignature, new AstCallSignatureDeclarationData(), CallSignatureDeclaration); }
    static ConstructSignatureDeclaration() { return new AstNode(SyntaxKind.ConstructSignature, new AstConstructSignatureDeclarationData(), ConstructSignatureDeclaration); }
    static VariableDeclaration() { return new AstNode(SyntaxKind.VariableDeclaration, new AstVariableDeclarationData(), VariableDeclaration); }
    static VariableDeclarationList() { return new AstNode(SyntaxKind.VariableDeclarationList, new AstVariableDeclarationListData(), VariableDeclarationList); }
    static BindingElement() { return new AstNode(SyntaxKind.BindingElement, new AstBindingElementData(), BindingElement); }
    static PropertyDeclaration() { return new AstNode(SyntaxKind.PropertyDeclaration, new AstPropertyDeclarationData(), PropertyDeclaration); }
    static PropertyAssignment() { return new AstNode(SyntaxKind.PropertyAssignment, new AstPropertyAssignmentData(), PropertyAssignment); }
    static ShorthandPropertyAssignment() { return new AstNode(SyntaxKind.ShorthandPropertyAssignment, new AstShorthandPropertyAssignmentData(), ShorthandPropertyAssignment); }
    static SpreadAssignment() { return new AstNode(SyntaxKind.SpreadAssignment, new AstSpreadAssignmentData(), SpreadAssignment); }
    static ObjectBindingPattern() { return new AstNode(SyntaxKind.ObjectBindingPattern, new AstObjectBindingPatternData(), ObjectBindingPattern); }
    static ArrayBindingPattern() { return new AstNode(SyntaxKind.ArrayBindingPattern, new AstArrayBindingPatternData(), ArrayBindingPattern); }
    static FunctionDeclaration() { return new AstNode(SyntaxKind.FunctionDeclaration, new AstFunctionDeclarationData(), FunctionDeclaration); }
    static MethodSignature() { return new AstNode(SyntaxKind.MethodSignature, new AstMethodSignatureData(), MethodSignature); }
    static MethodDeclaration() { return new AstNode(SyntaxKind.MethodDeclaration, new AstMethodDeclarationData(), MethodDeclaration); }
    static ConstructorDeclaration() { return new AstNode(SyntaxKind.Constructor, new AstConstructorDeclarationData(), ConstructorDeclaration); }
    static SemicolonClassElement() { return new AstNode(SyntaxKind.SemicolonClassElement, new AstSemicolonClassElementData(), SemicolonClassElement); }
    static GetAccessorDeclaration() { return new AstNode(SyntaxKind.GetAccessor, new AstGetAccessorDeclarationData(), GetAccessorDeclaration); }
    static SetAccessorDeclaration() { return new AstNode(SyntaxKind.SetAccessor, new AstSetAccessorDeclarationData(), SetAccessorDeclaration); }
    static IndexSignatureDeclaration() { return new AstNode(SyntaxKind.IndexSignature, new AstIndexSignatureDeclarationData(), IndexSignatureDeclaration); }
    static ClassStaticBlockDeclaration() { return new AstNode(SyntaxKind.ClassStaticBlockDeclaration, new AstClassStaticBlockDeclarationData(), ClassStaticBlockDeclaration); }
    /** @deprecated */
    static ImportTypeAssertionContainer() { return new AstNode(SyntaxKind.ImportTypeAssertionContainer, new AstImportTypeAssertionContainerData(), ImportTypeAssertionContainer); }
    static ImportTypeNode() { return new AstNode(SyntaxKind.ImportType, new AstImportTypeNodeData(), ImportTypeNode); }
    static ThisTypeNode() { return new AstNode(SyntaxKind.ThisType, new AstThisTypeNodeData(), ThisTypeNode); }
    static FunctionTypeNode() { return new AstNode(SyntaxKind.FunctionType, new AstFunctionTypeNodeData(), FunctionTypeNode); }
    static ConstructorTypeNode() { return new AstNode(SyntaxKind.ConstructorType, new AstConstructorTypeNodeData(), ConstructorTypeNode); }
    static TypeReferenceNode() { return new AstNode(SyntaxKind.TypeReference, new AstTypeReferenceNodeData(), TypeReferenceNode); }
    static TypePredicateNode() { return new AstNode(SyntaxKind.TypePredicate, new AstTypePredicateNodeData(), TypePredicateNode); }
    static TypeQueryNode() { return new AstNode(SyntaxKind.TypeQuery, new AstTypeQueryNodeData(), TypeQueryNode); }
    static TypeLiteralNode() { return new AstNode(SyntaxKind.TypeLiteral, new AstTypeLiteralNodeData(), TypeLiteralNode); }
    static ArrayTypeNode() { return new AstNode(SyntaxKind.ArrayType, new AstArrayTypeNodeData(), ArrayTypeNode); }
    static TupleTypeNode() { return new AstNode(SyntaxKind.TupleType, new AstTupleTypeNodeData(), TupleTypeNode); }
    static NamedTupleMember() { return new AstNode(SyntaxKind.NamedTupleMember, new AstNamedTupleMemberData(), NamedTupleMember); }
    static OptionalTypeNode() { return new AstNode(SyntaxKind.OptionalType, new AstOptionalTypeNodeData(), OptionalTypeNode); }
    static RestTypeNode() { return new AstNode(SyntaxKind.RestType, new AstRestTypeNodeData(), RestTypeNode); }
    static UnionTypeNode() { return new AstNode(SyntaxKind.UnionType, new AstUnionTypeNodeData(), UnionTypeNode); }
    static IntersectionTypeNode() { return new AstNode(SyntaxKind.IntersectionType, new AstIntersectionTypeNodeData(), IntersectionTypeNode); }
    static ConditionalTypeNode() { return new AstNode(SyntaxKind.ConditionalType, new AstConditionalTypeNodeData(), ConditionalTypeNode); }
    static InferTypeNode() { return new AstNode(SyntaxKind.InferType, new AstInferTypeNodeData(), InferTypeNode); }
    static ParenthesizedTypeNode() { return new AstNode(SyntaxKind.ParenthesizedType, new AstParenthesizedTypeNodeData(), ParenthesizedTypeNode); }
    static TypeOperatorNode() { return new AstNode(SyntaxKind.TypeOperator, new AstTypeOperatorNodeData(), TypeOperatorNode); }
    static IndexedAccessTypeNode() { return new AstNode(SyntaxKind.IndexedAccessType, new AstIndexedAccessTypeNodeData(), IndexedAccessTypeNode); }
    static MappedTypeNode() { return new AstNode(SyntaxKind.MappedType, new AstMappedTypeNodeData(), MappedTypeNode); }
    static LiteralTypeNode() { return new AstNode(SyntaxKind.LiteralType, new AstLiteralTypeNodeData(), LiteralTypeNode); }
    static StringLiteral() { return new AstNode(SyntaxKind.StringLiteral, new AstStringLiteralData(), StringLiteral); }
    static TemplateLiteralTypeNode() { return new AstNode(SyntaxKind.TemplateLiteralType, new AstTemplateLiteralTypeNodeData(), TemplateLiteralTypeNode); }
    static TemplateLiteralTypeSpan() { return new AstNode(SyntaxKind.TemplateLiteralTypeSpan, new AstTemplateLiteralTypeSpanData(), TemplateLiteralTypeSpan); }
    static OmittedExpression() { return new AstNode(SyntaxKind.OmittedExpression, new AstOmittedExpressionData(), OmittedExpression); }
    static PrefixUnaryExpression() { return new AstNode(SyntaxKind.PrefixUnaryExpression, new AstPrefixUnaryExpressionData(), PrefixUnaryExpression); }
    static PostfixUnaryExpression() { return new AstNode(SyntaxKind.PostfixUnaryExpression, new AstPostfixUnaryExpressionData(), PostfixUnaryExpression); }
    static DeleteExpression() { return new AstNode(SyntaxKind.DeleteExpression, new AstDeleteExpressionData(), DeleteExpression); }
    static TypeOfExpression() { return new AstNode(SyntaxKind.TypeOfExpression, new AstTypeOfExpressionData(), TypeOfExpression); }
    static VoidExpression() { return new AstNode(SyntaxKind.VoidExpression, new AstVoidExpressionData(), VoidExpression); }
    static AwaitExpression() { return new AstNode(SyntaxKind.AwaitExpression, new AstAwaitExpressionData(), AwaitExpression); }
    static YieldExpression() { return new AstNode(SyntaxKind.YieldExpression, new AstYieldExpressionData(), YieldExpression); }
    static BinaryExpression() { return new AstNode(SyntaxKind.BinaryExpression, new AstBinaryExpressionData(), BinaryExpression); }
    static ConditionalExpression() { return new AstNode(SyntaxKind.ConditionalExpression, new AstConditionalExpressionData(), ConditionalExpression); }
    static FunctionExpression() { return new AstNode(SyntaxKind.FunctionExpression, new AstFunctionExpressionData(), FunctionExpression); }
    static ArrowFunction() { return new AstNode(SyntaxKind.ArrowFunction, new AstArrowFunctionData(), ArrowFunction); }
    static RegularExpressionLiteral() { return new AstNode(SyntaxKind.RegularExpressionLiteral, new AstRegularExpressionLiteralData(), RegularExpressionLiteral); }
    static NoSubstitutionTemplateLiteral() { return new AstNode(SyntaxKind.NoSubstitutionTemplateLiteral, new AstNoSubstitutionTemplateLiteralData(), NoSubstitutionTemplateLiteral); }
    static NumericLiteral() { return new AstNode(SyntaxKind.NumericLiteral, new AstNumericLiteralData(), NumericLiteral); }
    static BigIntLiteral() { return new AstNode(SyntaxKind.BigIntLiteral, new AstBigIntLiteralData(), BigIntLiteral); }
    static TemplateHead() { return new AstNode(SyntaxKind.TemplateHead, new AstTemplateHeadData(), TemplateHead); }
    static TemplateMiddle() { return new AstNode(SyntaxKind.TemplateMiddle, new AstTemplateMiddleData(), TemplateMiddle); }
    static TemplateTail() { return new AstNode(SyntaxKind.TemplateTail, new AstTemplateTailData(), TemplateTail); }
    static TemplateExpression() { return new AstNode(SyntaxKind.TemplateExpression, new AstTemplateExpressionData(), TemplateExpression); }
    static TemplateSpan() { return new AstNode(SyntaxKind.TemplateSpan, new AstTemplateSpanData(), TemplateSpan); }
    static ParenthesizedExpression() { return new AstNode(SyntaxKind.ParenthesizedExpression, new AstParenthesizedExpressionData(), ParenthesizedExpression); }
    static ArrayLiteralExpression() { return new AstNode(SyntaxKind.ArrayLiteralExpression, new AstArrayLiteralExpressionData(), ArrayLiteralExpression); }
    static SpreadElement() { return new AstNode(SyntaxKind.SpreadElement, new AstSpreadElementData(), SpreadElement); }
    static ObjectLiteralExpression() { return new AstNode(SyntaxKind.ObjectLiteralExpression, new AstObjectLiteralExpressionData(), ObjectLiteralExpression); }
    static PropertyAccessExpression() { return new AstNode(SyntaxKind.PropertyAccessExpression, new AstPropertyAccessExpressionData(), PropertyAccessExpression); }
    static PropertyAccessChain() { return new AstNode(SyntaxKind.PropertyAccessExpression, new AstPropertyAccessExpressionData(), PropertyAccessExpression, NodeFlags.OptionalChain) as AstPropertyAccessChain; }
    static ElementAccessExpression() { return new AstNode(SyntaxKind.ElementAccessExpression, new AstElementAccessExpressionData(), ElementAccessExpression); }
    static ElementAccessChain() { return new AstNode(SyntaxKind.ElementAccessExpression, new AstElementAccessExpressionData(), ElementAccessExpression, NodeFlags.OptionalChain) as AstElementAccessChain; }
    static CallExpression() { return new AstNode(SyntaxKind.CallExpression, new AstCallExpressionData(), CallExpression); }
    static CallChain() { return new AstNode(SyntaxKind.CallExpression, new AstCallExpressionData(), CallExpression, NodeFlags.OptionalChain) as AstCallChain; }
    static ExpressionWithTypeArguments() { return new AstNode(SyntaxKind.ExpressionWithTypeArguments, new AstExpressionWithTypeArgumentsData(), ExpressionWithTypeArguments); }
    static NewExpression() { return new AstNode(SyntaxKind.NewExpression, new AstNewExpressionData(), NewExpression); }
    static TaggedTemplateExpression() { return new AstNode(SyntaxKind.TaggedTemplateExpression, new AstTaggedTemplateExpressionData(), TaggedTemplateExpression); }
    static AsExpression() { return new AstNode(SyntaxKind.AsExpression, new AstAsExpressionData(), AsExpression); }
    static TypeAssertion() { return new AstNode(SyntaxKind.TypeAssertionExpression, new AstTypeAssertionData(), TypeAssertion); }
    static SatisfiesExpression() { return new AstNode(SyntaxKind.SatisfiesExpression, new AstSatisfiesExpressionData(), SatisfiesExpression); }
    static NonNullExpression() { return new AstNode(SyntaxKind.NonNullExpression, new AstNonNullExpressionData(), NonNullExpression); }
    static NonNullChain() { return new AstNode(SyntaxKind.NonNullExpression, new AstNonNullExpressionData(), NonNullExpression, NodeFlags.OptionalChain) as AstNonNullChain; }
    static MetaProperty() { return new AstNode(SyntaxKind.MetaProperty, new AstMetaPropertyData(), MetaProperty); }
    static JsxElement() { return new AstNode(SyntaxKind.JsxElement, new AstJsxElementData(), JsxElement); }
    static JsxAttributes() { return new AstNode(SyntaxKind.JsxAttributes, new AstJsxAttributesData(), JsxAttributes); }
    static JsxNamespacedName() { return new AstNode(SyntaxKind.JsxNamespacedName, new AstJsxNamespacedNameData(), JsxNamespacedName); }
    static JsxOpeningElement() { return new AstNode(SyntaxKind.JsxOpeningElement, new AstJsxOpeningElementData(), JsxOpeningElement); }
    static JsxSelfClosingElement() { return new AstNode(SyntaxKind.JsxSelfClosingElement, new AstJsxSelfClosingElementData(), JsxSelfClosingElement); }
    static JsxFragment() { return new AstNode(SyntaxKind.JsxFragment, new AstJsxFragmentData(), JsxFragment); }
    static JsxOpeningFragment() { return new AstNode(SyntaxKind.JsxOpeningFragment, new AstJsxOpeningFragmentData(), JsxOpeningFragment); }
    static JsxClosingFragment() { return new AstNode(SyntaxKind.JsxClosingFragment, new AstJsxClosingFragmentData(), JsxClosingFragment); }
    static JsxAttribute() { return new AstNode(SyntaxKind.JsxAttribute, new AstJsxAttributeData(), JsxAttribute); }
    static JsxSpreadAttribute() { return new AstNode(SyntaxKind.JsxSpreadAttribute, new AstJsxSpreadAttributeData(), JsxSpreadAttribute); }
    static JsxClosingElement() { return new AstNode(SyntaxKind.JsxClosingElement, new AstJsxClosingElementData(), JsxClosingElement); }
    static JsxExpression() { return new AstNode(SyntaxKind.JsxExpression, new AstJsxExpressionData(), JsxExpression); }
    static JsxText() { return new AstNode(SyntaxKind.JsxText, new AstJsxTextData(), JsxText); }
    static EmptyStatement() { return new AstNode(SyntaxKind.EmptyStatement, new AstEmptyStatementData(), EmptyStatement); }
    static DebuggerStatement() { return new AstNode(SyntaxKind.DebuggerStatement, new AstDebuggerStatementData(), DebuggerStatement); }
    static MissingDeclaration() { return new AstNode(SyntaxKind.MissingDeclaration, new AstMissingDeclarationData(), MissingDeclaration); }
    static Block() { return new AstNode(SyntaxKind.Block, new AstBlockData(), Block); }
    static VariableStatement() { return new AstNode(SyntaxKind.VariableStatement, new AstVariableStatementData(), VariableStatement); }
    static ExpressionStatement() { return new AstNode(SyntaxKind.ExpressionStatement, new AstExpressionStatementData(), ExpressionStatement); }
    static IfStatement() { return new AstNode(SyntaxKind.IfStatement, new AstIfStatementData(), IfStatement); }
    static DoStatement() { return new AstNode(SyntaxKind.DoStatement, new AstDoStatementData(), DoStatement); }
    static WhileStatement() { return new AstNode(SyntaxKind.WhileStatement, new AstWhileStatementData(), WhileStatement); }
    static ForStatement() { return new AstNode(SyntaxKind.ForStatement, new AstForStatementData(), ForStatement); }
    static ForInStatement() { return new AstNode(SyntaxKind.ForInStatement, new AstForInStatementData(), ForInStatement); }
    static ForOfStatement() { return new AstNode(SyntaxKind.ForOfStatement, new AstForOfStatementData(), ForOfStatement); }
    static BreakStatement() { return new AstNode(SyntaxKind.BreakStatement, new AstBreakStatementData(), BreakStatement); }
    static ContinueStatement() { return new AstNode(SyntaxKind.ContinueStatement, new AstContinueStatementData(), ContinueStatement); }
    static ReturnStatement() { return new AstNode(SyntaxKind.ReturnStatement, new AstReturnStatementData(), ReturnStatement); }
    static WithStatement() { return new AstNode(SyntaxKind.WithStatement, new AstWithStatementData(), WithStatement); }
    static SwitchStatement() { return new AstNode(SyntaxKind.SwitchStatement, new AstSwitchStatementData(), SwitchStatement); }
    static CaseBlock() { return new AstNode(SyntaxKind.CaseBlock, new AstCaseBlockData(), CaseBlock); }
    static CaseClause() { return new AstNode(SyntaxKind.CaseClause, new AstCaseClauseData(), CaseClause); }
    static DefaultClause() { return new AstNode(SyntaxKind.DefaultClause, new AstDefaultClauseData(), DefaultClause); }
    static LabeledStatement() { return new AstNode(SyntaxKind.LabeledStatement, new AstLabeledStatementData(), LabeledStatement); }
    static ThrowStatement() { return new AstNode(SyntaxKind.ThrowStatement, new AstThrowStatementData(), ThrowStatement); }
    static TryStatement() { return new AstNode(SyntaxKind.TryStatement, new AstTryStatementData(), TryStatement); }
    static CatchClause() { return new AstNode(SyntaxKind.CatchClause, new AstCatchClauseData(), CatchClause); }
    static ClassDeclaration() { return new AstNode(SyntaxKind.ClassDeclaration, new AstClassDeclarationData(), ClassDeclaration); }
    static ClassExpression() { return new AstNode(SyntaxKind.ClassExpression, new AstClassExpressionData(), ClassExpression); }
    static InterfaceDeclaration() { return new AstNode(SyntaxKind.InterfaceDeclaration, new AstInterfaceDeclarationData(), InterfaceDeclaration); }
    static HeritageClause() { return new AstNode(SyntaxKind.HeritageClause, new AstHeritageClauseData(), HeritageClause); }
    static TypeAliasDeclaration() { return new AstNode(SyntaxKind.TypeAliasDeclaration, new AstTypeAliasDeclarationData(), TypeAliasDeclaration); }
    static EnumMember() { return new AstNode(SyntaxKind.EnumMember, new AstEnumMemberData(), EnumMember); }
    static EnumDeclaration() { return new AstNode(SyntaxKind.EnumDeclaration, new AstEnumDeclarationData(), EnumDeclaration); }
    static ModuleDeclaration() { return new AstNode(SyntaxKind.ModuleDeclaration, new AstModuleDeclarationData(), ModuleDeclaration); }
    static ModuleBlock() { return new AstNode(SyntaxKind.ModuleBlock, new AstModuleBlockData(), ModuleBlock); }
    static ImportEqualsDeclaration() { return new AstNode(SyntaxKind.ImportEqualsDeclaration, new AstImportEqualsDeclarationData(), ImportEqualsDeclaration); }
    static ExternalModuleReference() { return new AstNode(SyntaxKind.ExternalModuleReference, new AstExternalModuleReferenceData(), ExternalModuleReference); }
    static ImportDeclaration() { return new AstNode(SyntaxKind.ImportDeclaration, new AstImportDeclarationData(), ImportDeclaration); }
    static ImportClause() { return new AstNode(SyntaxKind.ImportClause, new AstImportClauseData(), ImportClause); }
    static ImportAttribute() { return new AstNode(SyntaxKind.ImportAttribute, new AstImportAttributeData(), ImportAttribute); }
    static ImportAttributes() { return new AstNode(SyntaxKind.ImportAttributes, new AstImportAttributesData(), ImportAttributes); }
    static NamespaceImport() { return new AstNode(SyntaxKind.NamespaceImport, new AstNamespaceImportData(), NamespaceImport); }
    static NamespaceExport() { return new AstNode(SyntaxKind.NamespaceExport, new AstNamespaceExportData(), NamespaceExport); }
    static NamespaceExportDeclaration() { return new AstNode(SyntaxKind.NamespaceExportDeclaration, new AstNamespaceExportDeclarationData(), NamespaceExportDeclaration); }
    static ExportDeclaration() { return new AstNode(SyntaxKind.ExportDeclaration, new AstExportDeclarationData(), ExportDeclaration); }
    static NamedImports() { return new AstNode(SyntaxKind.NamedImports, new AstNamedImportsData(), NamedImports); }
    static NamedExports() { return new AstNode(SyntaxKind.NamedExports, new AstNamedExportsData(), NamedExports); }
    static ImportSpecifier() { return new AstNode(SyntaxKind.ImportSpecifier, new AstImportSpecifierData(), ImportSpecifier); }
    static ExportSpecifier() { return new AstNode(SyntaxKind.ExportSpecifier, new AstExportSpecifierData(), ExportSpecifier); }
    static ExportAssignment() { return new AstNode(SyntaxKind.ExportAssignment, new AstExportAssignmentData(), ExportAssignment); }
    static JSDocTypeExpression() { return new AstNode(SyntaxKind.JSDocTypeExpression, new AstJSDocTypeExpressionData(), JSDocTypeExpression); }
    static JSDocNameReference() { return new AstNode(SyntaxKind.JSDocNameReference, new AstJSDocNameReferenceData(), JSDocNameReference); }
    static JSDocMemberName() { return new AstNode(SyntaxKind.JSDocMemberName, new AstJSDocMemberNameData(), JSDocMemberName); }
    static JSDocAllType() { return new AstNode(SyntaxKind.JSDocAllType, new AstJSDocAllTypeData(), JSDocAllType); }
    static JSDocUnknownType() { return new AstNode(SyntaxKind.JSDocUnknownType, new AstJSDocUnknownTypeData(), JSDocUnknownType); }
    static JSDocNonNullableType() { return new AstNode(SyntaxKind.JSDocNonNullableType, new AstJSDocNonNullableTypeData(), JSDocNonNullableType); }
    static JSDocNullableType() { return new AstNode(SyntaxKind.JSDocNullableType, new AstJSDocNullableTypeData(), JSDocNullableType); }
    static JSDocOptionalType() { return new AstNode(SyntaxKind.JSDocOptionalType, new AstJSDocOptionalTypeData(), JSDocOptionalType); }
    static JSDocFunctionType() { return new AstNode(SyntaxKind.JSDocFunctionType, new AstJSDocFunctionTypeData(), JSDocFunctionType); }
    static JSDocVariadicType() { return new AstNode(SyntaxKind.JSDocVariadicType, new AstJSDocVariadicTypeData(), JSDocVariadicType); }
    static JSDocNamepathType() { return new AstNode(SyntaxKind.JSDocNamepathType, new AstJSDocNamepathTypeData(), JSDocNamepathType); }
    static JSDocNode() { return new AstNode(SyntaxKind.JSDoc, new AstJSDocNodeData(), JSDocNode); }
    static JSDocLink() { return new AstNode(SyntaxKind.JSDocLink, new AstJSDocLinkData(), JSDocLink); }
    static JSDocLinkCode() { return new AstNode(SyntaxKind.JSDocLinkCode, new AstJSDocLinkCodeData(), JSDocLinkCode); }
    static JSDocLinkPlain() { return new AstNode(SyntaxKind.JSDocLinkPlain, new AstJSDocLinkPlainData(), JSDocLinkPlain); }
    static JSDocText() { return new AstNode(SyntaxKind.JSDocText, new AstJSDocTextData(), JSDocText); }
    static JSDocUnknownTag() { return new AstNode(SyntaxKind.JSDocTag, new AstJSDocUnknownTagData(), JSDocUnknownTag); }
    static JSDocAugmentsTag() { return new AstNode(SyntaxKind.JSDocAugmentsTag, new AstJSDocAugmentsTagData(), JSDocAugmentsTag); }
    static JSDocImplementsTag() { return new AstNode(SyntaxKind.JSDocImplementsTag, new AstJSDocImplementsTagData(), JSDocImplementsTag); }
    static JSDocAuthorTag() { return new AstNode(SyntaxKind.JSDocAuthorTag, new AstJSDocAuthorTagData(), JSDocAuthorTag); }
    static JSDocDeprecatedTag() { return new AstNode(SyntaxKind.JSDocDeprecatedTag, new AstJSDocDeprecatedTagData(), JSDocDeprecatedTag); }
    static JSDocClassTag() { return new AstNode(SyntaxKind.JSDocClassTag, new AstJSDocClassTagData(), JSDocClassTag); }
    static JSDocPublicTag() { return new AstNode(SyntaxKind.JSDocPublicTag, new AstJSDocPublicTagData(), JSDocPublicTag); }
    static JSDocPrivateTag() { return new AstNode(SyntaxKind.JSDocPrivateTag, new AstJSDocPrivateTagData(), JSDocPrivateTag); }
    static JSDocProtectedTag() { return new AstNode(SyntaxKind.JSDocProtectedTag, new AstJSDocProtectedTagData(), JSDocProtectedTag); }
    static JSDocReadonlyTag() { return new AstNode(SyntaxKind.JSDocReadonlyTag, new AstJSDocReadonlyTagData(), JSDocReadonlyTag); }
    static JSDocOverrideTag() { return new AstNode(SyntaxKind.JSDocOverrideTag, new AstJSDocOverrideTagData(), JSDocOverrideTag); }
    static JSDocEnumTag() { return new AstNode(SyntaxKind.JSDocEnumTag, new AstJSDocEnumTagData(), JSDocEnumTag); }
    static JSDocThisTag() { return new AstNode(SyntaxKind.JSDocThisTag, new AstJSDocThisTagData(), JSDocThisTag); }
    static JSDocTemplateTag() { return new AstNode(SyntaxKind.JSDocTemplateTag, new AstJSDocTemplateTagData(), JSDocTemplateTag); }
    static JSDocSeeTag() { return new AstNode(SyntaxKind.JSDocSeeTag, new AstJSDocSeeTagData(), JSDocSeeTag); }
    static JSDocReturnTag() { return new AstNode(SyntaxKind.JSDocReturnTag, new AstJSDocReturnTagData(), JSDocReturnTag); }
    static JSDocTypeTag() { return new AstNode(SyntaxKind.JSDocTypeTag, new AstJSDocTypeTagData(), JSDocTypeTag); }
    static JSDocTypedefTag() { return new AstNode(SyntaxKind.JSDocTypedefTag, new AstJSDocTypedefTagData(), JSDocTypedefTag); }
    static JSDocCallbackTag() { return new AstNode(SyntaxKind.JSDocCallbackTag, new AstJSDocCallbackTagData(), JSDocCallbackTag); }
    static JSDocOverloadTag() { return new AstNode(SyntaxKind.JSDocOverloadTag, new AstJSDocOverloadTagData(), JSDocOverloadTag); }
    static JSDocThrowsTag() { return new AstNode(SyntaxKind.JSDocThrowsTag, new AstJSDocThrowsTagData(), JSDocThrowsTag); }
    static JSDocSignature() { return new AstNode(SyntaxKind.JSDocSignature, new AstJSDocSignatureData(), JSDocSignature); }
    static JSDocPropertyTag() { return new AstNode(SyntaxKind.JSDocPropertyTag, new AstJSDocPropertyTagData(), JSDocPropertyTag); }
    static JSDocParameterTag() { return new AstNode(SyntaxKind.JSDocParameterTag, new AstJSDocParameterTagData(), JSDocParameterTag); }
    static JSDocTypeLiteral() { return new AstNode(SyntaxKind.JSDocTypeLiteral, new AstJSDocTypeLiteralData(), JSDocTypeLiteral); }
    static JSDocSatisfiesTag() { return new AstNode(SyntaxKind.JSDocSatisfiesTag, new AstJSDocSatisfiesTagData(), JSDocSatisfiesTag); }
    static JSDocImportTag() { return new AstNode(SyntaxKind.JSDocImportTag, new AstJSDocImportTagData(), JSDocImportTag); }
    static SourceFile() { return new AstNode(SyntaxKind.SourceFile, new AstSourceFileData(), SourceFile); }
    static SyntheticExpression() { return new AstNode(SyntaxKind.SyntheticExpression, new AstSyntheticExpressionData(), SyntheticExpression); }
    static Bundle() { return new AstNode(SyntaxKind.Bundle, new AstBundleData(), Bundle); }
    static SyntaxList() { return new AstNode(SyntaxKind.SyntaxList, new AstSyntaxListData(), SyntaxList); }
    static NotEmittedStatement() { return new AstNode(SyntaxKind.NotEmittedStatement, new AstNotEmittedStatementData(), NotEmittedStatement); }
    static NotEmittedTypeElement() { return new AstNode(SyntaxKind.NotEmittedTypeElement, new AstNotEmittedTypeElementData(), NotEmittedTypeElement); }
    static PartiallyEmittedExpression() { return new AstNode(SyntaxKind.PartiallyEmittedExpression, new AstPartiallyEmittedExpressionData(), PartiallyEmittedExpression); }
    static CommaListExpression() { return new AstNode(SyntaxKind.CommaListExpression, new AstCommaListExpressionData(), CommaListExpression); }
    static SyntheticReferenceExpression() { return new AstNode(SyntaxKind.SyntheticReferenceExpression, new AstSyntheticReferenceExpressionData(), SyntheticReferenceExpression); }
}

type AstNodeOneOf<N extends Node> = N extends unknown ? AstNode<N> : never;

/** @internal */
export class AstData {
    computeTransformFlags(node: AstNode): TransformFlags {
        void node;
        return TransformFlags.None;
    }

    /**
     * Controls cloning the provided node.
     */
    cloneNode(node: AstNode): AstNode {
        return astNodeCloneCore(node);
    }

    /**
     * Creates a shallow, member-wise clone of this data object.
     */
    clone(): AstData {
        const clone = this.createInstance();
        this.copyProperties(clone);
        return clone;
    }

    /**
     * Creates a new instance of a data object with the same prototype as this object.
     */
    protected createInstance(): AstData {
        return Object.create(Object.getPrototypeOf(this));
    }

    /**
     * Copies the properties of this object to the provided object.
     */
    protected copyProperties(clone: AstData) {
        for (const key in this) {
            if (hasProperty(this, key)) {
                (clone as any)[key] = (this as any)[key];
            }
        }
    }

    /**
     * Controls creation of a shadow node for the provided node.
     * This is primarily used for the purpose of redirecting source files.
     */
    shadowNode(node: AstNode): AstNode {
        return astNodeShadowCore(node);
    }

    /**
     * Creates a new data object using this object as the prototype.
     * This is primarily used for the purpose of redirecting source files.
     */
    shadow(): AstData {
        return Object.create(this);
    }
}

/** @internal */
export class AstTypeScriptNodeData extends AstData {
    override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.ContainsTypeScript;
    }
}

/** @internal */
export class Node<K extends SyntaxKind = SyntaxKind, T extends AstData = AstData> implements ts.Node {
    readonly ast: AstNode<Node<K, T>>;

    constructor(ast: AstNode<Node<K, T>>) {
        this.ast = ast;

        // catch any excess properties assigned to the Node
        Object.preventExtensions(this);
    }

    get kind(): K { return this.ast.kind; }
    get data(): T { return this.ast.data; }
    get pos(): number { return this.ast.pos; }
    set pos(value) { this.ast.pos = value; }
    get end(): number { return this.ast.end; }
    set end(value) { this.ast.end = value; }
    get flags(): NodeFlags { return this.ast.flags; }
    set flags(value) { this.ast.flags = value; }
    get modifierFlagsCache(): ModifierFlags { return this.ast.modifierFlagsCache; }
    set modifierFlagsCache(value) { this.ast.modifierFlagsCache = value; }
    get transformFlags(): TransformFlags { return this.ast.transformFlags; }
    set transformFlags(value) { this.ast.transformFlags = value; }
    get parent(): Node { return this.ast.parent?.node!; } // TODO: remove `!`
    set parent(value) { this.ast.parent = value?.ast; }
    get id(): number { return this.ast.id; }
    set id(value) { this.ast.id = value; }
    get original(): Node | undefined { return this.ast.original?.node; }
    set original(value) { this.ast.original = value?.ast; }
    get emitNode(): EmitNode | undefined { return this.ast.emitNode; }
    set emitNode(value) { this.ast.emitNode = value; }
    get __pos(): number | undefined { return astNodeMaybeExtra(this.ast)?.__pos; } // eslint-disable-line @typescript-eslint/naming-convention
    set __pos(value) { this.ast.extra.__pos = value; } // eslint-disable-line @typescript-eslint/naming-convention
    get __end(): number | undefined { return astNodeMaybeExtra(this.ast)?.__end; } // eslint-disable-line @typescript-eslint/naming-convention
    set __end(value) { this.ast.extra.__end = value; } // eslint-disable-line @typescript-eslint/naming-convention

    // TODO: remove
    validate() {
        if (this.pos >= 0 && this.end >= 0) Debug.assert(this.pos <= this.end, "pos and end are out of order", () => `node.kind: ${Debug.formatSyntaxKind(this.kind)}`);

        let pos = this.pos;
        this.forEachChild(child => {
            (child as Node).validate();
            Debug.assert(child.pos === -1 || child.pos >= this.pos && child.pos <= this.end, `child.pos out of range`, () => `child.kind: ${Debug.formatSyntaxKind(child.kind)}`);
            Debug.assert(child.end === -1 || child.end >= this.pos && child.end <= this.end, `child.end out of range`, () => `child.kind: ${Debug.formatSyntaxKind(child.kind)}`);
            Debug.assert(child.pos === -1 || child.pos >= pos, `child.pos out of order`, () => `child.kind: ${Debug.formatSyntaxKind(child.kind)}`);
            if (child.flags & NodeFlags.Synthesized) Debug.assert(this.flags & NodeFlags.Synthesized, "synthetic child in non-synthetic parent", () => `child.kind: ${Debug.formatSyntaxKind(child.kind)}`);
            pos = child.end;
        }, children => {
            Debug.assert(children.pos === -1 || children.pos >= this.pos && children.pos <= this.end, `children.pos out of range`, () => `parent.kind: ${Debug.formatSyntaxKind(this.kind)}`);
            Debug.assert(children.end === -1 || children.end >= this.pos && children.end <= this.end, `children.end out of range`, () => `parent.kind: ${Debug.formatSyntaxKind(this.kind)}`);
            for (const child of children) {
                (child as Node).validate();
                Debug.assert(child.pos === -1 || child.pos >= children.pos && child.pos <= children.end, `child.pos out of range`, () => `child.kind: ${Debug.formatSyntaxKind(child.kind)}`);
                Debug.assert(child.end === -1 || child.end >= children.pos && child.end <= children.end, `child.end out of range`, () => `child.kind: ${Debug.formatSyntaxKind(child.kind)}`);
                Debug.assert(child.pos === -1 || child.pos >= pos, `child.pos out of order`, () => `child.kind: ${Debug.formatSyntaxKind(child.kind)}`);
                if (child.flags & NodeFlags.Synthesized) Debug.assert(this.flags & NodeFlags.Synthesized, "synthetic child in non-synthetic parent", () => `child.kind: ${Debug.formatSyntaxKind(child.kind)}`);
                pos = child.end;
            }
        });
        Debug.assert(pos <= this.end, "children extend past end of parent", () => `parent.kind: ${Debug.formatSyntaxKind(this.kind)}`);
    }

    private assertHasRealPosition(message?: string) {
        // eslint-disable-next-line local/debug-assert
        Debug.assert(!positionIsSynthesized(this.pos) && !positionIsSynthesized(this.end), message || "Node must have a real position for this operation");
    }

    public getSourceFile(): ts.SourceFile {
        return getSourceFileOfNode(this);
    }

    public getStart(sourceFile?: ts.SourceFileLike, includeJsDocComment?: boolean): number {
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

    public getWidth(sourceFile?: ts.SourceFile): number {
        this.assertHasRealPosition();
        return this.getEnd() - this.getStart(sourceFile);
    }

    public getFullWidth(): number {
        this.assertHasRealPosition();
        return this.end - this.pos;
    }

    public getLeadingTriviaWidth(sourceFile?: ts.SourceFile): number {
        this.assertHasRealPosition();
        return this.getStart(sourceFile) - this.pos;
    }

    public getFullText(sourceFile?: ts.SourceFile): string {
        this.assertHasRealPosition();
        return (sourceFile || this.getSourceFile()).text.substring(this.pos, this.end);
    }

    public getText(sourceFile?: ts.SourceFile): string {
        this.assertHasRealPosition();
        if (!sourceFile) {
            sourceFile = this.getSourceFile();
        }
        return sourceFile.text.substring(this.getStart(sourceFile), this.getEnd());
    }

    public getChildCount(sourceFile?: ts.SourceFile): number {
        return this.getChildren(sourceFile).length;
    }

    public getChildAt(index: number, sourceFile?: ts.SourceFile): ts.Node {
        return this.getChildren(sourceFile)[index];
    }

    public getChildren(sourceFile: ts.SourceFileLike = getSourceFileOfNode(this)): readonly ts.Node[] {
        this.assertHasRealPosition("Node without a real position cannot be scanned and thus has no token nodes - use forEachChild and collect the result if that's fine");
        return getNodeChildren(this, sourceFile) ?? setNodeChildren(this, sourceFile, createChildren(this, sourceFile));
    }

    public getFirstToken(sourceFile?: ts.SourceFileLike): ts.Node | undefined {
        this.assertHasRealPosition();
        const children = this.getChildren(sourceFile) as readonly Node[];
        if (!children.length) {
            return undefined;
        }

        const child = find(children, kid => kid.kind < SyntaxKind.FirstJSDocNode || kid.kind > SyntaxKind.LastJSDocNode)!;
        return child.kind < SyntaxKind.FirstNode ?
            child :
            child.getFirstToken(sourceFile);
    }

    public getLastToken(sourceFile?: ts.SourceFileLike): ts.Node | undefined {
        this.assertHasRealPosition();
        const children = this.getChildren(sourceFile) as readonly Node[];

        const child = lastOrUndefined(children);
        if (!child) {
            return undefined;
        }

        return child.kind < SyntaxKind.FirstNode ? child : child.getLastToken(sourceFile);
    }

    public forEachChild<T>(cbNode: (node: ts.Node) => T, cbNodeArray?: (nodes: ts.NodeArray<ts.Node>) => T): T | undefined {
        return forEachChild(this, cbNode, cbNodeArray);
    }
}

Debug.registerDebugInfo(() => {
    if (!ts.hasProperty(Node.prototype, "__debugKind")) {
        const weakNodeTextMap = new WeakMap<Node, string>();

        Object.defineProperties(Node.prototype, {
            // for use with vscode-js-debug's new customDescriptionGenerator in launch.json
            __tsDebuggerDisplay: {
                value(this: Node) {
                    const nodeHeader =
                        ts.isGeneratedIdentifier(this) ? "GeneratedIdentifier" :
                        ts.isIdentifier(this) ? `Identifier '${idText(this)}'` :
                        ts.isPrivateIdentifier(this) ? `PrivateIdentifier '${idText(this)}'` :
                        ts.isStringLiteral(this) ? `StringLiteral ${JSON.stringify(this.text.length < 10 ? this.text : this.text.slice(10) + "...")}` :
                        ts.isNumericLiteral(this) ? `NumericLiteral ${this.text}` :
                        ts.isBigIntLiteral(this) ? `BigIntLiteral ${this.text}n` :
                        ts.isTypeParameterDeclaration(this) ? "TypeParameterDeclaration" :
                        ts.isParameter(this) ? "ParameterDeclaration" :
                        ts.isConstructorDeclaration(this) ? "ConstructorDeclaration" :
                        ts.isGetAccessorDeclaration(this) ? "GetAccessorDeclaration" :
                        ts.isSetAccessorDeclaration(this) ? "SetAccessorDeclaration" :
                        ts.isCallSignatureDeclaration(this) ? "CallSignatureDeclaration" :
                        ts.isConstructSignatureDeclaration(this) ? "ConstructSignatureDeclaration" :
                        ts.isIndexSignatureDeclaration(this) ? "IndexSignatureDeclaration" :
                        ts.isTypePredicateNode(this) ? "TypePredicateNode" :
                        ts.isTypeReferenceNode(this) ? "TypeReferenceNode" :
                        ts.isFunctionTypeNode(this) ? "FunctionTypeNode" :
                        ts.isConstructorTypeNode(this) ? "ConstructorTypeNode" :
                        ts.isTypeQueryNode(this) ? "TypeQueryNode" :
                        ts.isTypeLiteralNode(this) ? "TypeLiteralNode" :
                        ts.isArrayTypeNode(this) ? "ArrayTypeNode" :
                        ts.isTupleTypeNode(this) ? "TupleTypeNode" :
                        ts.isOptionalTypeNode(this) ? "OptionalTypeNode" :
                        ts.isRestTypeNode(this) ? "RestTypeNode" :
                        ts.isUnionTypeNode(this) ? "UnionTypeNode" :
                        ts.isIntersectionTypeNode(this) ? "IntersectionTypeNode" :
                        ts.isConditionalTypeNode(this) ? "ConditionalTypeNode" :
                        ts.isInferTypeNode(this) ? "InferTypeNode" :
                        ts.isParenthesizedTypeNode(this) ? "ParenthesizedTypeNode" :
                        ts.isThisTypeNode(this) ? "ThisTypeNode" :
                        ts.isTypeOperatorNode(this) ? "TypeOperatorNode" :
                        ts.isIndexedAccessTypeNode(this) ? "IndexedAccessTypeNode" :
                        ts.isMappedTypeNode(this) ? "MappedTypeNode" :
                        ts.isLiteralTypeNode(this) ? "LiteralTypeNode" :
                        ts.isNamedTupleMember(this) ? "NamedTupleMember" :
                        ts.isImportTypeNode(this) ? "ImportTypeNode" :
                        Debug.formatSyntaxKind(this.kind);
                    return `${nodeHeader}${this.flags ? ` (${Debug.formatNodeFlags(this.flags)})` : ""}`;
                },
            },
            __debugKind: {
                get(this: Node) {
                    return Debug.formatSyntaxKind(this.kind);
                },
            },
            __debugNodeFlags: {
                get(this: Node) {
                    return Debug.formatNodeFlags(this.flags);
                },
            },
            __debugModifierFlags: {
                get(this: Node) {
                    return Debug.formatModifierFlags(ts.getEffectiveModifierFlagsNoCache(this));
                },
            },
            __debugTransformFlags: {
                get(this: Node) {
                    return Debug.formatTransformFlags(this.transformFlags);
                },
            },
            __debugIsParseTreeNode: {
                get(this: Node) {
                    return ts.isParseTreeNode(this);
                },
            },
            __debugEmitFlags: {
                get(this: Node) {
                    return Debug.formatEmitFlags(ts.getEmitFlags(this));
                },
            },
            __debugGetText: {
                value(this: Node, includeTrivia?: boolean) {
                    if (ts.nodeIsSynthesized(this)) return "";
                    // avoid recomputing
                    let text = weakNodeTextMap.get(this);
                    if (text === undefined) {
                        const parseNode = ts.getParseTreeNode(this);
                        const sourceFile = parseNode && getSourceFileOfNode(parseNode);
                        text = sourceFile ? ts.getSourceTextOfNodeFromSourceFile(sourceFile, parseNode, includeTrivia) : "";
                        weakNodeTextMap.set(this, text);
                    }
                    return text;
                },
            },
        });
    }
});

/** @internal */
export type NodeConstructor<N extends Node> = new (ast: AstNode<Node<N["kind"], N["data"]>>) => N;

/** @internal */
export class AstNodeArrayExtraFields<N extends AstNode> {
    nodes: NodeArray<N["node"]> | undefined = undefined;
    hasTrailingComma: boolean = false;
    transformFlags: TransformFlags | undefined = undefined;
    __pos: number | undefined = undefined;
    __end: number | undefined = undefined;
}

let astNodeArrayMaybeExtra: <N extends AstNode>(nodes: AstNodeArray<N>) => AstNodeArrayExtraFields<N> | undefined;

/** @internal */
export class AstNodeArray<N extends AstNode> {
    static {
        astNodeArrayMaybeExtra = nodes => nodes._extra;
    }

    readonly items: readonly N[] = undefined!;
    pos = -1;
    end = -1;

    private _extra: AstNodeArrayExtraFields<N> | undefined = undefined;

    constructor(items: readonly N[], hasTrailingComma = false) {
        this.items = items;
        this.hasTrailingComma = hasTrailingComma;
    }

    /** @private */ get extra() { return this._extra ??= new AstNodeArrayExtraFields(); }

    get nodes() { return this.extra.nodes ??= new NodeArray(this); }
    get hasTrailingComma() { return this._extra?.hasTrailingComma ?? false; }
    set hasTrailingComma(value) { this.extra.hasTrailingComma = value; }

    get transformFlags() {
        let transformFlags = this._extra?.transformFlags;
        if (transformFlags === undefined) {
            transformFlags = TransformFlags.None;
            for (const child of this.items) {
                transformFlags |= propagateChildFlags(child);
            }
            this.extra.transformFlags = transformFlags;
        }
        return transformFlags;
    }
    set transformFlags(value) { this.extra.transformFlags = value; }
}

/** @internal */
export class NodeArray<N extends Node> extends Array<N> implements ts.NodeArray<N> {
    readonly ast: AstNodeArray<N["ast"]>;

    constructor(ast: AstNodeArray<N["ast"]>) {
        super(...ast.items.map(item => item.node as N));
        this.ast = ast;

        // catch any excess properties assigned to the array
        Object.preventExtensions(this);
    }

    static override get [globalThis.Symbol.species]() { return Array; }

    get pos() { return this.ast.pos; }
    set pos(value) { this.ast.pos = value; }
    get end() { return this.ast.end; }
    set end(value) { this.ast.end = value; }
    get hasTrailingComma() { return this.ast.hasTrailingComma; }
    set hasTrailingComma(value) { this.ast.hasTrailingComma = value; }
    get transformFlags() { return this.ast.transformFlags; }
    set transformFlags(value) { this.ast.transformFlags = value; }

    get __pos() { return astNodeArrayMaybeExtra(this.ast)?.__pos; } // eslint-disable-line @typescript-eslint/naming-convention
    set __pos(value) { this.ast.extra.__pos = value; } // eslint-disable-line @typescript-eslint/naming-convention
    get __end() { return astNodeArrayMaybeExtra(this.ast)?.__end; } // eslint-disable-line @typescript-eslint/naming-convention
    set __end(value) { this.ast.extra.__end = value; } // eslint-disable-line @typescript-eslint/naming-convention
}

Debug.registerDebugInfo(() => {
    if (!("__tsDebuggerDisplay" in NodeArray.prototype)) { // eslint-disable-line local/no-in-operator
        Object.defineProperties(NodeArray.prototype, {
            __tsDebuggerDisplay: {
                value(this: NodeArray<Node>, defaultValue: string) {
                    // An `Array` with extra properties is rendered as `[A, B, prop1: 1, prop2: 2]`. Most of
                    // these aren't immediately useful so we trim off the `prop1: ..., prop2: ...` part from the
                    // formatted string.
                    // This regex can trigger slow backtracking because of overlapping potential captures.
                    // We don't care, this is debug code that's only enabled with a debugger attached -
                    // we're just taking note of it for anyone checking regex performance in the future.
                    defaultValue = String(defaultValue).replace(/(?:,[\s\w]+:[^,]+)+\]$/, "]");
                    return `NodeArray ${defaultValue}`;
                },
            },
        });
    }
});

/** @internal */
export interface JSDocContainer extends Node {
    _jsdocContainerBrand: any;

    get jsDoc(): JSDocArray | undefined;
    set jsDoc(value: JSDocArray | undefined);
}

/** @internal */
export interface FlowContainer extends Node {
    _flowContainerBrand: any;

    get flowNode(): FlowNode | undefined;
    set flowNode(value: FlowNode | undefined);
}

/** @internal */
export interface LocalsContainer extends Node {
    _localsContainerBrand: any;

    get locals(): SymbolTable | undefined;
    set locals(value: SymbolTable | undefined);
    get nextContainer(): HasLocals | undefined;
    set nextContainer(value: HasLocals | undefined);
}

/** @internal */
export type HasLocals =
    | ArrowFunction
    | Block
    | CallSignatureDeclaration
    | CaseBlock
    | CatchClause
    | ClassStaticBlockDeclaration
    | ConditionalTypeNode
    | ConstructorDeclaration
    | ConstructorTypeNode
    | ConstructSignatureDeclaration
    | ForStatement
    | ForInStatement
    | ForOfStatement
    | FunctionDeclaration
    | FunctionExpression
    | FunctionTypeNode
    | GetAccessorDeclaration
    | IndexSignatureDeclaration
    | JSDocCallbackTag
    | JSDocEnumTag
    | JSDocFunctionType
    | JSDocSignature
    | JSDocTypedefTag
    | MappedTypeNode
    | MethodDeclaration
    | MethodSignature
    | ModuleDeclaration
    | SetAccessorDeclaration
    | SourceFile
    | TypeAliasDeclaration;

/** @internal */
export type AstHasLocals = AstNodeOneOf<HasLocals>;

// NOTE: Changing the following list requires changes to:
// - `canHaveDecorators` in factory/utilities.ts
// - `updateModifiers` in factory/nodeFactory.ts
/** @internal */
export type HasDecorators =
    | ParameterDeclaration
    | PropertyDeclaration
    | MethodDeclaration
    | GetAccessorDeclaration
    | SetAccessorDeclaration
    | ClassExpression
    | ClassDeclaration;

/** @internal */
export type AstHasDecorators = AstNodeOneOf<HasDecorators>;

// NOTE: Changing the following list requires changes to:
// - `canHaveModifiers` in factory/utilitiesPublic.ts
// - `updateModifiers` in factory/nodeFactory.ts
/** @internal */
export type HasModifiers =
    | TypeParameterDeclaration
    | ParameterDeclaration
    | ConstructorTypeNode
    | PropertySignature
    | PropertyDeclaration
    | MethodSignature
    | MethodDeclaration
    | ConstructorDeclaration
    | GetAccessorDeclaration
    | SetAccessorDeclaration
    | IndexSignatureDeclaration
    | FunctionExpression
    | ArrowFunction
    | ClassExpression
    | VariableStatement
    | FunctionDeclaration
    | ClassDeclaration
    | InterfaceDeclaration
    | TypeAliasDeclaration
    | EnumDeclaration
    | ModuleDeclaration
    | ImportEqualsDeclaration
    | ImportDeclaration
    | ExportAssignment
    | ExportDeclaration;

/** @internal */
export type AstHasModifiers = AstNodeOneOf<HasModifiers>;

/** @internal */
export interface Declaration extends Node {
    readonly ast: AstDeclaration;
    _declarationBrand: any;

    get symbol(): Symbol;
    set symbol(value: Symbol);
    get localSymbol(): Symbol | undefined;
    set localSymbol(value: Symbol | undefined);
}

/** @internal */
export type AstDeclaration = AstNode<Declaration>;

/** @internal */
export interface TypeNode<TKind extends TypeNodeSyntaxKind = TypeNodeSyntaxKind> extends Node<TKind> {
    readonly ast: AstTypeNode<TKind>;
    _typeNodeBrand: any;
}

/** @internal */
export type AstTypeNode<TKind extends TypeNodeSyntaxKind = TypeNodeSyntaxKind> = AstNode<TypeNode<TKind>>;

/** @internal */
export interface Statement extends JSDocContainer {
    readonly ast: AstStatement;
    _statementBrand: any;
}

/** @internal */
export type AstStatement = AstNode<Statement>;

/** @internal */
export interface Expression extends Node {
    readonly ast: AstExpression;
    _expressionBrand: any;
}

/** @internal */
export type AstExpression = AstNode<Expression>;

/** @internal */
export interface UnaryExpression extends Expression {
    readonly ast: AstUnaryExpression;
    _unaryExpressionBrand: any;
}

/** @internal */
export type AstUnaryExpression = AstNode<UnaryExpression>;

/** @internal */
export interface UpdateExpression extends UnaryExpression {
    readonly ast: AstUpdateExpression;
    _updateExpressionBrand: any;
}

/** @internal */
export type AstUpdateExpression = AstNode<UpdateExpression>;

/** @internal */
export interface LeftHandSideExpression extends UpdateExpression {
    readonly ast: AstLeftHandSideExpression;
    _leftHandSideExpressionBrand: any;
}

/** @internal */
export type AstLeftHandSideExpression = AstNode<LeftHandSideExpression>;

/** @internal */
export interface MemberExpression extends LeftHandSideExpression {
    readonly ast: AstMemberExpression;
    _memberExpressionBrand: any;
}

/** @internal */
export type AstMemberExpression = AstNode<MemberExpression>;

/** @internal */
export interface PrimaryExpression extends MemberExpression {
    readonly ast: AstPrimaryExpression;
    _primaryExpressionBrand: any;
}

/** @internal */
export type AstPrimaryExpression = AstNode<PrimaryExpression>;

/** @internal */
export interface LiteralExpression extends PrimaryExpression {
    readonly ast: AstLiteralExpression;
    _literalExpressionBrand: any;

    get text(): string;
    set text(value: string);
}

/** @internal */
export type AstLiteralExpression = AstNode<LiteralExpression>;

/** @internal */
export class Token<K extends TokenSyntaxKind = TokenSyntaxKind, T extends AstTokenData = AstTokenData> extends Node<K, T> implements ts.Token<K> {
    public override getChildCount(_sourceFile?: ts.SourceFile): number {
        return this.getChildren().length;
    }

    public override getChildAt(index: number, _sourceFile?: ts.SourceFile): ts.Node {
        return this.getChildren()[index];
    }

    public override getChildren(_sourceFile?: ts.SourceFileLike): readonly ts.Node[] {
        return this.kind === SyntaxKind.EndOfFileToken ? (this as Node as EndOfFileToken).jsDoc || emptyArray : emptyArray;
    }

    public override getFirstToken(_sourceFile?: ts.SourceFileLike): ts.Node | undefined {
        return undefined;
    }

    public override getLastToken(_sourceFile?: ts.SourceFileLike): ts.Node | undefined {
        return undefined;
    }

    public override forEachChild<T>(_cbNode: (node: ts.Node) => T, _cbNodeArray?: (nodes: ts.NodeArray<ts.Node>) => T): T | undefined {
        return undefined;
    }
}

/** @internal */
export class AstTokenData extends AstData {
    override computeTransformFlags(node: AstNode): TransformFlags {
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

/** @internal */
export class EndOfFileToken extends Token<SyntaxKind.EndOfFileToken, AstEndOfFileTokenData> implements JSDocContainer, ts.EndOfFileToken {
    declare readonly ast: AstEndOfFileToken;

    declare _jsdocContainerBrand: any;

    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
}

/** @internal */
export class AstEndOfFileTokenData extends AstTokenData {
    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
}

/** @internal */
export class ThisExpression extends Token<SyntaxKind.ThisKeyword, AstThisExpressionData> implements PrimaryExpression, FlowContainer, ts.ThisExpression {
    declare readonly ast: AstThisExpression;

    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
    declare _flowContainerBrand: any;

    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
}

/** @internal */
export class AstThisExpressionData extends AstTokenData {
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
}

/** @internal */
export class SuperExpression extends Token<SyntaxKind.SuperKeyword, AstSuperExpressionData> implements PrimaryExpression, FlowContainer, ts.SuperExpression {
    declare readonly ast: AstSuperExpression;

    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
    declare _flowContainerBrand: any;

    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
}

/** @internal */
export class AstSuperExpressionData extends AstTokenData {
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
}

/** @internal */
export class ImportExpression extends Token<SyntaxKind.ImportKeyword> implements PrimaryExpression, ts.ImportExpression {
    declare readonly ast: AstImportExpression;

    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
}

/** @internal */
export class NullLiteral extends Token<SyntaxKind.NullKeyword> implements PrimaryExpression, ts.NullLiteral {
    declare readonly ast: AstNullLiteral;

    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
}

/** @internal */
export class TrueLiteral extends Token<SyntaxKind.TrueKeyword> implements PrimaryExpression, ts.TrueLiteral {
    declare readonly ast: AstTrueLiteral;

    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
}

/** @internal */
export class FalseLiteral extends Token<SyntaxKind.FalseKeyword> implements PrimaryExpression, ts.FalseLiteral {
    declare readonly ast: AstFalseLiteral;

    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
}

/** @internal */
export type BooleanLiteral =
    | TrueLiteral
    | FalseLiteral
    ;

/** @internal */
export type AstBooleanLiteral = AstNodeOneOf<BooleanLiteral>;

// Punctuation

/** @internal */
export interface PunctuationToken<TKind extends PunctuationSyntaxKind> extends Token<TKind> { }

/** @internal */
export type DotToken = PunctuationToken<SyntaxKind.DotToken>;
/** @internal */
export type DotDotDotToken = PunctuationToken<SyntaxKind.DotDotDotToken>;
/** @internal */
export type QuestionToken = PunctuationToken<SyntaxKind.QuestionToken>;
/** @internal */
export type ExclamationToken = PunctuationToken<SyntaxKind.ExclamationToken>;
/** @internal */
export type ColonToken = PunctuationToken<SyntaxKind.ColonToken>;
/** @internal */
export type EqualsToken = PunctuationToken<SyntaxKind.EqualsToken>;
/** @internal */
export type AmpersandAmpersandEqualsToken = PunctuationToken<SyntaxKind.AmpersandAmpersandEqualsToken>;
/** @internal */
export type BarBarEqualsToken = PunctuationToken<SyntaxKind.BarBarEqualsToken>;
/** @internal */
export type QuestionQuestionEqualsToken = PunctuationToken<SyntaxKind.QuestionQuestionEqualsToken>;
/** @internal */
export type AsteriskToken = PunctuationToken<SyntaxKind.AsteriskToken>;
/** @internal */
export type EqualsGreaterThanToken = PunctuationToken<SyntaxKind.EqualsGreaterThanToken>;
/** @internal */
export type PlusToken = PunctuationToken<SyntaxKind.PlusToken>;
/** @internal */
export type MinusToken = PunctuationToken<SyntaxKind.MinusToken>;
/** @internal */
export type QuestionDotToken = PunctuationToken<SyntaxKind.QuestionDotToken>;

/** @internal */
export type AstPunctuationToken<TKind extends PunctuationSyntaxKind> = AstNode<PunctuationToken<TKind>>;

/** @internal */
export type AstDotToken = AstNode<DotToken>;
/** @internal */
export type AstDotDotDotToken = AstNode<DotDotDotToken>;
/** @internal */
export type AstQuestionToken = AstNode<QuestionToken>;
/** @internal */
export type AstExclamationToken = AstNode<ExclamationToken>;
/** @internal */
export type AstColonToken = AstNode<ColonToken>;
/** @internal */
export type AstEqualsToken = AstNode<EqualsToken>;
/** @internal */
export type AstAmpersandAmpersandEqualsToken = AstNode<AmpersandAmpersandEqualsToken>;
/** @internal */
export type AstBarBarEqualsToken = AstNode<BarBarEqualsToken>;
/** @internal */
export type AstQuestionQuestionEqualsToken = AstNode<QuestionQuestionEqualsToken>;
/** @internal */
export type AstAsteriskToken = AstNode<AsteriskToken>;
/** @internal */
export type AstEqualsGreaterThanToken = AstNode<EqualsGreaterThanToken>;
/** @internal */
export type AstPlusToken = AstNode<PlusToken>;
/** @internal */
export type AstMinusToken = AstNode<MinusToken>;
/** @internal */
export type AstQuestionDotToken = AstNode<QuestionDotToken>;

// Keywords

/** @internal */
export interface KeywordToken<TKind extends KeywordSyntaxKind> extends Token<TKind> { }

/** @internal */
export type AssertsKeyword = KeywordToken<SyntaxKind.AssertsKeyword>;
/** @internal */
export type AssertKeyword = KeywordToken<SyntaxKind.AssertKeyword>;
/** @internal */
export type AwaitKeyword = KeywordToken<SyntaxKind.AwaitKeyword>;
/** @internal */
export type CaseKeyword = KeywordToken<SyntaxKind.CaseKeyword>;

/** @internal */
export type AstKeywordToken<TKind extends KeywordSyntaxKind> = AstNode<KeywordToken<TKind>>;

/** @internal */
export type AstAssertsKeyword = AstNode<AssertsKeyword>;
/** @internal */
export type AstAssertKeyword = AstNode<AssertKeyword>;
/** @internal */
export type AstAwaitKeyword = AstNode<AwaitKeyword>;
/** @internal */
export type AstCaseKeyword = AstNode<CaseKeyword>;

// Modifiers

/** @internal */
export interface ModifierToken<TKind extends ModifierSyntaxKind> extends KeywordToken<TKind> { }

/** @internal */
export type AbstractKeyword = ModifierToken<SyntaxKind.AbstractKeyword>;
/** @internal */
export type AccessorKeyword = ModifierToken<SyntaxKind.AccessorKeyword>;
/** @internal */
export type AsyncKeyword = ModifierToken<SyntaxKind.AsyncKeyword>;
/** @internal */
export type ConstKeyword = ModifierToken<SyntaxKind.ConstKeyword>;
/** @internal */
export type DeclareKeyword = ModifierToken<SyntaxKind.DeclareKeyword>;
/** @internal */
export type DefaultKeyword = ModifierToken<SyntaxKind.DefaultKeyword>;
/** @internal */
export type ExportKeyword = ModifierToken<SyntaxKind.ExportKeyword>;
/** @internal */
export type InKeyword = ModifierToken<SyntaxKind.InKeyword>;
/** @internal */
export type PrivateKeyword = ModifierToken<SyntaxKind.PrivateKeyword>;
/** @internal */
export type ProtectedKeyword = ModifierToken<SyntaxKind.ProtectedKeyword>;
/** @internal */
export type PublicKeyword = ModifierToken<SyntaxKind.PublicKeyword>;
/** @internal */
export type ReadonlyKeyword = ModifierToken<SyntaxKind.ReadonlyKeyword>;
/** @internal */
export type OutKeyword = ModifierToken<SyntaxKind.OutKeyword>;
/** @internal */
export type OverrideKeyword = ModifierToken<SyntaxKind.OverrideKeyword>;
/** @internal */
export type StaticKeyword = ModifierToken<SyntaxKind.StaticKeyword>;

/** @internal */
export type AstModifierToken<TKind extends ModifierSyntaxKind> = AstNode<ModifierToken<TKind>>;

/** @internal */
export type AstAbstractKeyword = AstNode<AbstractKeyword>;
/** @internal */
export type AstAccessorKeyword = AstNode<AccessorKeyword>;
/** @internal */
export type AstAsyncKeyword = AstNode<AsyncKeyword>;
/** @internal */
export type AstConstKeyword = AstNode<ConstKeyword>;
/** @internal */
export type AstDeclareKeyword = AstNode<DeclareKeyword>;
/** @internal */
export type AstDefaultKeyword = AstNode<DefaultKeyword>;
/** @internal */
export type AstExportKeyword = AstNode<ExportKeyword>;
/** @internal */
export type AstInKeyword = AstNode<InKeyword>;
/** @internal */
export type AstPrivateKeyword = AstNode<PrivateKeyword>;
/** @internal */
export type AstProtectedKeyword = AstNode<ProtectedKeyword>;
/** @internal */
export type AstPublicKeyword = AstNode<PublicKeyword>;
/** @internal */
export type AstReadonlyKeyword = AstNode<ReadonlyKeyword>;
/** @internal */
export type AstOutKeyword = AstNode<OutKeyword>;
/** @internal */
export type AstOverrideKeyword = AstNode<OverrideKeyword>;
/** @internal */
export type AstStaticKeyword = AstNode<StaticKeyword>;

/** @internal */
export type Modifier =
    | AbstractKeyword
    | AccessorKeyword
    | AsyncKeyword
    | ConstKeyword
    | DeclareKeyword
    | DefaultKeyword
    | ExportKeyword
    | InKeyword
    | PrivateKeyword
    | ProtectedKeyword
    | PublicKeyword
    | OutKeyword
    | OverrideKeyword
    | ReadonlyKeyword
    | StaticKeyword;

/** @internal */
export type AstModifier = AstNodeOneOf<Modifier>;

/** @internal */
export type ModifierLike =
    | Modifier
    | Decorator;

/** @internal */
export type AstModifierLike = AstNodeOneOf<ModifierLike>;

/** @internal */
export class Identifier extends Token<SyntaxKind.Identifier, AstIdentifierData> implements PrimaryExpression, JSDocContainer, FlowContainer, Declaration, ts.Identifier {
    declare readonly ast: AstIdentifier;

    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;
    declare _flowContainerBrand: any;

    get escapedText(): __String { return this.ast.data.escapedText; }
    set escapedText(value: __String) { this.ast.data.escapedText = value; }
    get resolvedSymbol(): Symbol { return this.ast.data.resolvedSymbol; }
    set resolvedSymbol(value: Symbol) { this.ast.data.resolvedSymbol = value; }
    get symbol(): Symbol { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol(): Symbol | undefined { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value) { this.ast.data.flowNode = value; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value) { this.ast.data.jsDoc = value; }

    get text() { return idText(this); }
}

/** @internal */
export class AstIdentifierData extends AstTokenData {
    escapedText: __String = undefined!;
    resolvedSymbol: Symbol = undefined!; // TransientIdentifier
    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(node: AstNode): TransformFlags {
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

/** @internal */
export class QualifiedName extends Node<SyntaxKind.QualifiedName, AstQualifiedNameData> implements FlowContainer, ts.QualifiedName {
    declare readonly ast: AstQualifiedName;

    declare _flowContainerBrand: any;

    get left(): EntityName { return this.ast.data.left?.node; }
    set left(value: EntityName) { this.ast.data.left = value?.ast; }
    get right(): Identifier { return this.ast.data.right?.node; }
    set right(value: Identifier) { this.ast.data.right = value?.ast; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value) { this.ast.data.flowNode = value; }
}

/** @internal */
export class AstQualifiedNameData extends AstData {
    left: AstEntityName = undefined!;
    right: AstIdentifier = undefined!;
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.left) |
            propagateIdentifierNameFlags(this.right);
    }
}

/** @internal */
export type EntityName =
    | Identifier
    | QualifiedName;

/** @internal */
export type AstEntityName = AstNodeOneOf<EntityName>;

/** @internal */
export type BindingName =
    | Identifier
    | BindingPattern;

/** @internal */
export type AstBindingName = AstNodeOneOf<BindingName>;

/** @internal */
export type PropertyName =
    | Identifier
    | StringLiteral
    | NoSubstitutionTemplateLiteral
    | NumericLiteral
    | ComputedPropertyName
    | PrivateIdentifier
    | BigIntLiteral;

/** @internal */
export type AstPropertyName = AstNodeOneOf<PropertyName>;

/** @internal */
export type MemberName =
    | Identifier
    | PrivateIdentifier;

/** @internal */
export type AstMemberName = AstNodeOneOf<MemberName>;

/** @internal */
export type DeclarationName =
    | PropertyName
    | JsxAttributeName
    | StringLiteralLike
    | ElementAccessExpression
    | BindingPattern
    | EntityNameExpression;

/** @internal */
export type AstDeclarationName = AstNodeOneOf<DeclarationName>;

/** @internal */
export class ComputedPropertyName extends Node<SyntaxKind.ComputedPropertyName, AstComputedPropertyNameData> implements ts.ComputedPropertyName {
    declare readonly ast: AstComputedPropertyName;

    override get parent() { return super.parent as Declaration; }
    override set parent(value) { super.parent = value; }

    get expression(): Expression { return this.ast.data.expression?.node; }
    set expression(value: Expression) { this.ast.data.expression = value?.ast; }
}

/** @internal */
export class AstComputedPropertyNameData extends AstData {
    expression: AstExpression = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            TransformFlags.ContainsES2015 |
            TransformFlags.ContainsComputedPropertyName;
    }
}

/** @internal */
export class PrivateIdentifier extends Token<SyntaxKind.PrivateIdentifier, AstPrivateIdentifierData> implements ts.PrivateIdentifier {
    declare readonly ast: AstPrivateIdentifier;

    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;

    get escapedText(): __String { return this.ast.data.escapedText; }
    set escapedText(value: __String) { this.ast.data.escapedText = value; }

    get text() { return idText(this); }
}

/** @internal */
export class AstPrivateIdentifierData extends AstTokenData {
    escapedText: __String = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.ContainsClassFields;
    }
}

/** @internal */
export class TypeParameterDeclaration extends Node<SyntaxKind.TypeParameter, AstTypeParameterDeclarationData> implements JSDocContainer, Declaration, ts.TypeParameterDeclaration {
    declare readonly ast: AstTypeParameterDeclaration;

    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;

    override get parent() { return super.parent as DeclarationWithTypeParameterChildren | InferTypeNode; }
    override set parent(value) { super.parent = value; }

    get modifiers(): NodeArray<Modifier> | undefined { return this.ast.data.modifiers?.nodes; }
    set modifiers(value: NodeArray<Modifier> | undefined) { this.ast.data.modifiers = value?.ast; }
    get name(): Identifier { return this.ast.data.name?.node; }
    set name(value: Identifier) { this.ast.data.name = value?.ast; }
    get constraint(): TypeNode | undefined { return this.ast.data.constraint?.node; }
    set constraint(value: TypeNode | undefined) { this.ast.data.constraint = value?.ast; }
    get default(): TypeNode | undefined { return this.ast.data.default?.node; }
    set default(value: TypeNode | undefined) { this.ast.data.default = value?.ast; }
    get expression(): Expression | undefined { return this.ast.data.expression?.node; }
    set expression(value: Expression | undefined) { this.ast.data.expression = value?.ast; }
    get symbol(): Symbol { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol(): Symbol | undefined { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value) { this.ast.data.jsDoc = value; }
}

/** @internal */
export class AstTypeParameterDeclarationData extends AstTypeScriptNodeData {
    modifiers: AstNodeArray<AstModifier> | undefined = undefined;
    name: AstIdentifier = undefined!;
    constraint: AstTypeNode | undefined = undefined;
    default: AstTypeNode | undefined = undefined;
    expression: AstExpression | undefined = undefined;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
}

/** @internal */
export class ParameterDeclaration extends Node<SyntaxKind.Parameter, AstParameterDeclarationData> implements Declaration, JSDocContainer, ts.ParameterDeclaration {
    declare readonly ast: AstParameterDeclaration;

    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;

    override get parent() { return super.parent as SignatureDeclaration; }
    override set parent(value) { super.parent = value; }

    get modifiers(): NodeArray<ModifierLike> | undefined { return this.ast.data.modifiers?.nodes; }
    set modifiers(value: NodeArray<ModifierLike> | undefined) { this.ast.data.modifiers = value?.ast; }
    get dotDotDotToken(): DotDotDotToken | undefined { return this.ast.data.dotDotDotToken?.node; }
    set dotDotDotToken(value: DotDotDotToken | undefined) { this.ast.data.dotDotDotToken = value?.ast; }
    get name(): BindingName { return this.ast.data.name?.node; }
    set name(value: BindingName) { this.ast.data.name = value?.ast; }
    get questionToken(): QuestionToken | undefined { return this.ast.data.questionToken?.node; }
    set questionToken(value: QuestionToken | undefined) { this.ast.data.questionToken = value?.ast; }
    get type(): TypeNode | undefined { return this.ast.data.type?.node; }
    set type(value: TypeNode | undefined) { this.ast.data.type = value?.ast; }
    get initializer(): Expression | undefined { return this.ast.data.initializer?.node; }
    set initializer(value: Expression | undefined) { this.ast.data.initializer = value?.ast; }
    get symbol(): Symbol { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol(): Symbol | undefined { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value) { this.ast.data.jsDoc = value; }
}

/** @internal */
export class AstParameterDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    dotDotDotToken: AstDotDotDotToken | undefined = undefined;
    name: AstBindingName = undefined!;
    questionToken: AstQuestionToken | undefined = undefined;
    type: AstTypeNode | undefined = undefined;
    initializer: AstExpression | undefined = undefined;

    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
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

/** @internal */
export class Decorator extends Node<SyntaxKind.Decorator, AstDecoratorData> implements ts.Decorator {
    declare readonly ast: AstDecorator;

    override get parent() { return super.parent as Declaration; }
    override set parent(value) { super.parent = value; }

    get expression(): LeftHandSideExpression { return this.ast.data.expression?.node; }
    set expression(value: LeftHandSideExpression) { this.ast.data.expression = value?.ast; }
}

/** @internal */
export class AstDecoratorData extends AstData {
    expression: AstLeftHandSideExpression = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            TransformFlags.ContainsTypeScript |
            TransformFlags.ContainsTypeScriptClassSyntax |
            TransformFlags.ContainsDecorators;
    }
}

/** @internal */
export class PropertySignature extends Node<SyntaxKind.PropertySignature, AstPropertySignatureData> implements Declaration, JSDocContainer, ts.PropertySignature {
    declare readonly ast: AstPropertySignature;

    declare _typeElementBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;

    override get parent() { return super.parent as TypeLiteralNode | InterfaceDeclaration; }
    override set parent(value) { super.parent = value; }

    get modifiers(): NodeArray<Modifier> | undefined { return this.ast.data.modifiers?.nodes; }
    set modifiers(value: NodeArray<Modifier> | undefined) { this.ast.data.modifiers = value?.ast; }
    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get questionToken() { return this.ast.data.questionToken?.node; }
    set questionToken(value) { this.ast.data.questionToken = value?.ast; }
    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
    get initializer() { return this.ast.data.initializer?.node; }
    set initializer(value) { this.ast.data.initializer = value?.ast; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
}

/** @internal */
export class AstPropertySignatureData extends AstTypeScriptNodeData {
    modifiers: AstNodeArray<AstModifier> | undefined = undefined;
    name: AstPropertyName = undefined!;
    questionToken: AstQuestionToken | undefined = undefined;
    type: AstTypeNode | undefined = undefined;
    initializer: AstExpression | undefined = undefined; // initialized by parser (grammar error)

    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
}

/** @internal */
export type SignatureDeclaration =
    | CallSignatureDeclaration
    | ConstructSignatureDeclaration
    | MethodSignature
    | IndexSignatureDeclaration
    | FunctionTypeNode
    | ConstructorTypeNode
    | JSDocFunctionType
    | FunctionDeclaration
    | MethodDeclaration
    | ConstructorDeclaration
    | AccessorDeclaration
    | FunctionExpression
    | ArrowFunction;

/** @internal */
export type AstSignatureDeclaration = AstNodeOneOf<SignatureDeclaration>;

/** @internal */
export class CallSignatureDeclaration extends Node<SyntaxKind.CallSignature, AstCallSignatureDeclarationData> implements LocalsContainer, Declaration, JSDocContainer, TypeElement, ts.CallSignatureDeclaration {
    declare readonly ast: AstCallSignatureDeclaration;

    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;
    declare _typeElementBrand: any;
    declare _localsContainerBrand: any;

    get typeParameters() { return this.ast.data.typeParameters?.nodes; }
    set typeParameters(value) { this.ast.data.typeParameters = value?.ast; }
    get parameters() { return this.ast.data.parameters?.nodes!; } // TODO: remove `!`
    set parameters(value) { this.ast.data.parameters = value?.ast; }
    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
    get typeArguments() { return this.ast.data.typeArguments?.nodes; }
    set typeArguments(value) { this.ast.data.typeArguments = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
}

/** @internal */
export class AstCallSignatureDeclarationData extends AstTypeScriptNodeData {
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    parameters: AstNodeArray<AstParameterDeclaration> | undefined = undefined;
    type: AstTypeNode | undefined = undefined;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined; // quick info
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
}

/** @internal */
export class ConstructSignatureDeclaration extends Node<SyntaxKind.ConstructSignature, AstConstructSignatureDeclarationData> implements JSDocContainer, Declaration, LocalsContainer, ts.ConstructSignatureDeclaration {
    declare readonly ast: AstConstructSignatureDeclaration;

    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;
    declare _typeElementBrand: any;
    declare _localsContainerBrand: any;

    get typeParameters() { return this.ast.data.typeParameters?.nodes; }
    set typeParameters(value) { this.ast.data.typeParameters = value?.ast; }
    get parameters() { return this.ast.data.parameters?.nodes!; } // TODO: remove `!`
    set parameters(value) { this.ast.data.parameters = value?.ast; }
    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
    get typeArguments() { return this.ast.data.typeArguments?.nodes; }
    set typeArguments(value) { this.ast.data.typeArguments = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
}

/** @internal */
export class AstConstructSignatureDeclarationData extends AstTypeScriptNodeData {
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    parameters: AstNodeArray<AstParameterDeclaration> | undefined = undefined;
    type: AstTypeNode | undefined = undefined;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined; // quick info
    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;
}

/** @internal */
export class VariableDeclaration extends Node<SyntaxKind.VariableDeclaration, AstVariableDeclarationData> implements JSDocContainer, Declaration, ts.VariableDeclaration {
    declare readonly ast: AstVariableDeclaration;

    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;

    override get parent() { return super.parent as VariableDeclarationList | CatchClause; }
    override set parent(value) { super.parent = value; }

    get name(): BindingName { return this.ast.data.name?.node; }
    set name(value: BindingName) { this.ast.data.name = value?.ast; }
    get exclamationToken(): ExclamationToken | undefined { return this.ast.data.exclamationToken?.node; }
    set exclamationToken(value: ExclamationToken | undefined) { this.ast.data.exclamationToken = value?.ast; }
    get type(): TypeNode | undefined { return this.ast.data.type?.node; }
    set type(value: TypeNode | undefined) { this.ast.data.type = value?.ast; }
    get initializer(): Expression | undefined { return this.ast.data.initializer?.node; }
    set initializer(value: Expression | undefined) { this.ast.data.initializer = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstVariableDeclarationData extends AstData {
    name: AstBindingName = undefined!;
    exclamationToken: AstExclamationToken | undefined = undefined;
    type: AstTypeNode | undefined = undefined;
    initializer: AstExpression | undefined = undefined;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateNameFlags(this.name) |
            propagateChildFlags(this.initializer) |
            (this.exclamationToken ?? this.type ? TransformFlags.ContainsTypeScript : TransformFlags.None);
    }
}

/** @internal */
export class VariableDeclarationList extends Node<SyntaxKind.VariableDeclarationList, AstVariableDeclarationListData> implements ts.VariableDeclarationList {
    declare readonly ast: AstVariableDeclarationList;

    override get parent() { return super.parent as VariableStatement | ForStatement | ForOfStatement | ForInStatement; }
    override set parent(value) { super.parent = value; }

    get declarations() { return this.ast.data.declarations.nodes; }
    set declarations(value) { this.ast.data.declarations = value?.ast; }
}

/** @internal */
export class AstVariableDeclarationListData extends AstData {
    declarations: AstNodeArray<AstVariableDeclaration> = undefined!;

    override computeTransformFlags(node: AstNode): TransformFlags {
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

/** @internal */
export class BindingElement extends Node<SyntaxKind.BindingElement, AstBindingElementData> implements Declaration, FlowContainer, ts.BindingElement {
    declare readonly ast: AstBindingElement;

    declare _declarationBrand: any;
    declare _flowContainerBrand: any;

    override get parent() { return super.parent as BindingPattern; }
    override set parent(value) { super.parent = value; }

    get propertyName() { return this.ast.data.propertyName?.node; }
    set propertyName(value) { this.ast.data.propertyName = value?.ast; }
    get dotDotDotToken() { return this.ast.data.dotDotDotToken?.node; }
    set dotDotDotToken(value) { this.ast.data.dotDotDotToken = value?.ast; }
    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get initializer() { return this.ast.data.initializer?.node; }
    set initializer(value) { this.ast.data.initializer = value?.ast; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
}

/** @internal */
export class AstBindingElementData extends AstData {
    propertyName: AstPropertyName | undefined = undefined;
    dotDotDotToken: AstDotDotDotToken | undefined = undefined;
    name: AstBindingName = undefined!;
    initializer: AstExpression | undefined = undefined;

    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.dotDotDotToken) |
            propagateNameFlags(this.propertyName) |
            propagateNameFlags(this.name) |
            propagateChildFlags(this.initializer) |
            (this.dotDotDotToken ? TransformFlags.ContainsRestOrSpread : TransformFlags.None) |
            TransformFlags.ContainsES2015;
    }
}

/** @internal */
export class PropertyDeclaration extends Node<SyntaxKind.PropertyDeclaration, AstPropertyDeclarationData> implements JSDocContainer, Declaration, ts.PropertyDeclaration {
    declare readonly ast: AstPropertyDeclaration;

    declare _classElementBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;

    override get parent() { return super.parent as ClassLikeDeclaration; }
    override set parent(value) { super.parent = value; }

    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get questionToken() { return this.ast.data.questionToken?.node; }
    set questionToken(value) { this.ast.data.questionToken = value?.ast; }
    get exclamationToken() { return this.ast.data.exclamationToken?.node; }
    set exclamationToken(value) { this.ast.data.exclamationToken = value?.ast; }
    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
    get initializer() { return this.ast.data.initializer?.node; }
    set initializer(value) { this.ast.data.initializer = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstPropertyDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    name: AstPropertyName = undefined!;
    questionToken: AstQuestionToken | undefined = undefined;
    exclamationToken: AstExclamationToken | undefined = undefined;
    type: AstTypeNode | undefined = undefined;
    initializer: AstExpression | undefined = undefined;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(node: AstNode): TransformFlags {
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

/** @internal */
export class PropertyAssignment extends Node<SyntaxKind.PropertyAssignment, AstPropertyAssignmentData> implements ObjectLiteralElement, JSDocContainer, Declaration, ts.PropertyAssignment {
    declare readonly ast: AstPropertyAssignment;

    declare _objectLiteralBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;

    override get parent() { return super.parent as ObjectLiteralExpression; }
    override set parent(value) { super.parent = value; }

    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get initializer() { return this.ast.data.initializer?.node; }
    set initializer(value) { this.ast.data.initializer = value?.ast; }
    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get questionToken() { return this.ast.data.questionToken?.node; }
    set questionToken(value) { this.ast.data.questionToken = value?.ast; }
    get exclamationToken() { return this.ast.data.exclamationToken?.node; }
    set exclamationToken(value) { this.ast.data.exclamationToken = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstPropertyAssignmentData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined; // initialized by parser (grammar error)
    name: AstPropertyName = undefined!;
    questionToken: AstQuestionToken | undefined = undefined; // initialized by parser (grammar error)
    exclamationToken: AstExclamationToken | undefined = undefined; // initialized by parser (grammar error)
    initializer: AstExpression = undefined!;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateNameFlags(this.name) |
            propagateChildFlags(this.initializer);
    }
}

/** @internal */
export class ShorthandPropertyAssignment extends Node<SyntaxKind.ShorthandPropertyAssignment, AstShorthandPropertyAssignmentData> implements ObjectLiteralElement, JSDocContainer, Declaration, ts.ShorthandPropertyAssignment {
    declare readonly ast: AstShorthandPropertyAssignment;

    declare _objectLiteralBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;

    override get parent() { return super.parent as ObjectLiteralExpression; }
    override set parent(value) { super.parent = value; }

    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get equalsToken() { return this.ast.data.equalsToken?.node; }
    set equalsToken(value) { this.ast.data.equalsToken = value?.ast; }
    get objectAssignmentInitializer() { return this.ast.data.objectAssignmentInitializer?.node; }
    set objectAssignmentInitializer(value) { this.ast.data.objectAssignmentInitializer = value?.ast; }
    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get questionToken() { return this.ast.data.questionToken?.node; }
    set questionToken(value) { this.ast.data.questionToken = value?.ast; }
    get exclamationToken() { return this.ast.data.exclamationToken?.node; }
    set exclamationToken(value) { this.ast.data.exclamationToken = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstShorthandPropertyAssignmentData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined; // initialized by parser (grammar error)
    name: AstIdentifier = undefined!;
    questionToken: AstQuestionToken | undefined = undefined; // initialized by parser (grammar error)
    exclamationToken: AstExclamationToken | undefined = undefined; // initialized by parser (grammar error)
    equalsToken: AstEqualsToken | undefined = undefined; // initialized by parser (grammar error)
    objectAssignmentInitializer: AstExpression | undefined = undefined;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateIdentifierNameFlags(this.name) |
            propagateChildFlags(this.objectAssignmentInitializer) |
            TransformFlags.ContainsES2015;
    }
}

/** @internal */
export class SpreadAssignment extends Node<SyntaxKind.SpreadAssignment, AstSpreadAssignmentData> implements ObjectLiteralElement, JSDocContainer, Declaration, ts.SpreadAssignment {
    declare readonly ast: AstSpreadAssignment;

    declare _objectLiteralBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;

    override get parent() { return super.parent as ObjectLiteralExpression; }
    override set parent(value) { super.parent = value; }

    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstSpreadAssignmentData extends AstData {
    expression: AstExpression = undefined!;

    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            TransformFlags.ContainsES2018 |
            TransformFlags.ContainsObjectRestOrSpread;
    }
}

/** @internal */
export type BindingPattern =
    | ObjectBindingPattern
    | ArrayBindingPattern
    ;

/** @internal */
export type AstBindingPattern = AstNodeOneOf<BindingPattern>;

/** @internal */
export type ArrayBindingElement =
    | BindingElement
    | OmittedExpression
    ;

/** @internal */
export type AstArrayBindingElement = AstNodeOneOf<ArrayBindingElement>;

/** @internal */
export class ObjectBindingPattern extends Node<SyntaxKind.ObjectBindingPattern, AstObjectBindingPatternData> implements ts.ObjectBindingPattern {
    declare readonly ast: AstObjectBindingPattern;

    override get parent() { return super.parent as VariableDeclaration | ParameterDeclaration | BindingElement; }
    override set parent(value) { super.parent = value; }

    get elements() { return this.ast.data.elements?.nodes!; } // TODO: remove `!`
    set elements(value) { this.ast.data.elements = value?.ast; }
}

/** @internal */
export class AstObjectBindingPatternData extends AstData {
    elements: AstNodeArray<AstBindingElement> | undefined = undefined;

    override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildrenFlags(this.elements) |
            TransformFlags.ContainsES2015 |
            TransformFlags.ContainsBindingPattern;
        if (transformFlags & TransformFlags.ContainsRestOrSpread) {
            transformFlags |= TransformFlags.ContainsES2018 | TransformFlags.ContainsObjectRestOrSpread;
        }
        return transformFlags;
    }
}

/** @internal */
export class ArrayBindingPattern extends Node<SyntaxKind.ArrayBindingPattern, AstArrayBindingPatternData> implements ts.ArrayBindingPattern {
    declare readonly ast: AstArrayBindingPattern;

    override get parent() { return super.parent as VariableDeclaration | ParameterDeclaration | BindingElement; }
    override set parent(value) { super.parent = value; }

    get elements() { return this.ast.data.elements?.nodes!; } // TODO: remove `!`
    set elements(value) { this.ast.data.elements = value?.ast; }
}

/** @internal */
export class AstArrayBindingPatternData extends AstData {
    elements: AstNodeArray<AstArrayBindingElement> | undefined = undefined;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildrenFlags(this.elements) |
            TransformFlags.ContainsES2015 |
            TransformFlags.ContainsBindingPattern;
    }
}

/** @internal */
export class FunctionDeclaration extends Node<SyntaxKind.FunctionDeclaration, AstFunctionDeclarationData> implements JSDocContainer, Declaration, LocalsContainer, ts.FunctionDeclaration {
    declare readonly ast: AstFunctionDeclaration;

    declare _functionLikeDeclarationBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;
    declare _statementBrand: any;
    declare _localsContainerBrand: any;

    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get asteriskToken() { return this.ast.data.asteriskToken?.node; }
    set asteriskToken(value) { this.ast.data.asteriskToken = value?.ast; }
    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get typeParameters() { return this.ast.data.typeParameters?.nodes; }
    set typeParameters(value) { this.ast.data.typeParameters = value?.ast; }
    get parameters() { return this.ast.data.parameters?.nodes!; } // TODO: remove `!`
    set parameters(value) { this.ast.data.parameters = value?.ast; }
    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
    get body() { return this.ast.data.body?.node; }
    set body(value) { this.ast.data.body = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
    get endFlowNode() { return this.ast.data.endFlowNode; }
    set endFlowNode(value) { this.ast.data.endFlowNode = value; }
    get returnFlowNode() { return this.ast.data.returnFlowNode; }
    set returnFlowNode(value) { this.ast.data.returnFlowNode = value; }

    get typeArguments() { return this.ast.data.typeArguments?.nodes; } // Used for quick info, replaces typeParameters for instantiated signatures
    set typeArguments(value) { this.ast.data.typeArguments = value?.ast; }
}

/** @internal */
export class AstFunctionDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    asteriskToken: AstAsteriskToken | undefined = undefined;
    name: AstIdentifier | undefined = undefined;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    parameters: AstNodeArray<AstParameterDeclaration> | undefined = undefined;
    type: AstTypeNode | undefined = undefined;
    body: AstFunctionBody | undefined = undefined;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;
    endFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    returnFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    /** @internal */ typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined; // Used for quick info, replaces typeParameters for instantiated signatures

    override computeTransformFlags(_: AstNode): TransformFlags {
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

/** @internal */
export class MethodSignature extends Node<SyntaxKind.MethodSignature, AstMethodSignatureData> implements JSDocContainer, Declaration, LocalsContainer, ts.MethodSignature {
    declare readonly ast: AstMethodSignature;

    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;
    declare _typeElementBrand: any;
    declare _localsContainerBrand: any;

    override get parent() { return super.parent as TypeLiteralNode | InterfaceDeclaration; }
    override set parent(value) { super.parent = value; }

    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get questionToken() { return this.ast.data.questionToken?.node; }
    set questionToken(value) { this.ast.data.questionToken = value?.ast; }
    get typeParameters() { return this.ast.data.typeParameters?.nodes; }
    set typeParameters(value) { this.ast.data.typeParameters = value?.ast; }
    get parameters() { return this.ast.data.parameters?.nodes!; } // TODO: remove `!`
    set parameters(value) { this.ast.data.parameters = value?.ast; }
    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
    get typeArguments() { return this.ast.data.typeArguments?.nodes; }
    set typeArguments(value) { this.ast.data.typeArguments = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
}

/** @internal */
export class AstMethodSignatureData extends AstTypeScriptNodeData {
    modifiers: AstNodeArray<AstModifier> | undefined = undefined;
    name: AstPropertyName = undefined!;
    questionToken: AstQuestionToken | undefined = undefined;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    parameters: AstNodeArray<AstParameterDeclaration> | undefined = undefined;
    type: AstTypeNode | undefined = undefined;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined; // quick info

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;
}

/** @internal */
export class MethodDeclaration extends Node<SyntaxKind.MethodDeclaration, AstMethodDeclarationData> implements JSDocContainer, Declaration, LocalsContainer, FlowContainer, ts.MethodDeclaration {
    declare readonly ast: AstMethodDeclaration;

    declare _functionLikeDeclarationBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;
    declare _classElementBrand: any;
    declare _objectLiteralBrand: any;
    declare _localsContainerBrand: any;
    declare _flowContainerBrand: any;

    override get parent() { return super.parent as ClassLikeDeclaration | ObjectLiteralExpression; }
    override set parent(value) { super.parent = value; }

    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get asteriskToken() { return this.ast.data.asteriskToken?.node; }
    set asteriskToken(value) { this.ast.data.asteriskToken = value?.ast; }
    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get questionToken() { return this.ast.data.questionToken?.node; }
    set questionToken(value) { this.ast.data.questionToken = value?.ast; }
    get exclamationToken() { return this.ast.data.exclamationToken?.node; }
    set exclamationToken(value) { this.ast.data.exclamationToken = value?.ast; }
    get typeParameters() { return this.ast.data.typeParameters?.nodes; }
    set typeParameters(value) { this.ast.data.typeParameters = value?.ast; }
    get parameters() { return this.ast.data.parameters?.nodes!; } // TODO: remove `!`
    set parameters(value) { this.ast.data.parameters = value?.ast; }
    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
    get body() { return this.ast.data.body?.node; }
    set body(value) { this.ast.data.body = value?.ast; }
    get typeArguments() { return this.ast.data.typeArguments?.nodes; }
    set typeArguments(value) { this.ast.data.typeArguments = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
    get endFlowNode() { return this.ast.data.endFlowNode; }
    set endFlowNode(value) { this.ast.data.endFlowNode = value; }
    get returnFlowNode() { return this.ast.data.returnFlowNode; }
    set returnFlowNode(value) { this.ast.data.returnFlowNode = value; }
}

/** @internal */
export class AstMethodDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    asteriskToken: AstAsteriskToken | undefined = undefined;
    name: AstPropertyName = undefined!;
    questionToken: AstQuestionToken | undefined = undefined;
    exclamationToken: AstExclamationToken | undefined = undefined; // initialized by parser (grammar error)
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    parameters: AstNodeArray<AstParameterDeclaration> | undefined = undefined;
    type: AstTypeNode | undefined = undefined;
    body: AstFunctionBody | undefined = undefined;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    endFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    returnFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
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

/** @internal */
export class ConstructorDeclaration extends Node<SyntaxKind.Constructor, AstConstructorDeclarationData> implements JSDocContainer, Declaration, LocalsContainer, ts.ConstructorDeclaration {
    declare readonly ast: AstConstructorDeclaration;

    declare _functionLikeDeclarationBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;
    declare _classElementBrand: any;
    declare _localsContainerBrand: any;

    override get parent() { return super.parent as ClassLikeDeclaration; }
    override set parent(value) { super.parent = value; }

    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get body() { return this.ast.data.body?.node; }
    set body(value) { this.ast.data.body = value?.ast; }
    get typeParameters() { return this.ast.data.typeParameters?.nodes; }
    set typeParameters(value) { this.ast.data.typeParameters = value?.ast; }
    get parameters() { return this.ast.data.parameters?.nodes!; } // TODO: remove `!`
    set parameters(value) { this.ast.data.parameters = value?.ast; }
    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
    get typeArguments() { return this.ast.data.typeArguments?.nodes; }
    set typeArguments(value) { this.ast.data.typeArguments = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
    get endFlowNode() { return this.ast.data.endFlowNode; }
    set endFlowNode(value) { this.ast.data.endFlowNode = value; }
    get returnFlowNode() { return this.ast.data.returnFlowNode; }
    set returnFlowNode(value) { this.ast.data.returnFlowNode = value; }
}

/** @internal */
export class AstConstructorDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    body: AstFunctionBody | undefined = undefined;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined; // initialized by parser (grammar error)
    parameters: AstNodeArray<AstParameterDeclaration> | undefined = undefined;
    type: AstTypeNode | undefined = undefined; // initialized by parser (grammar error)
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined; // quick info

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;
    endFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    returnFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
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

/** @internal */
export class SemicolonClassElement extends Node<SyntaxKind.SemicolonClassElement, AstSemicolonClassElementData> implements JSDocContainer, ts.SemicolonClassElement {
    declare readonly ast: AstSemicolonClassElement;

    declare _classElementBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;
    declare symbol: never;
    declare localSymbol: never;

    override get parent() { return super.parent as ClassLikeDeclaration; }
    override set parent(value) { super.parent = value; }

    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
}

/** @internal */
export class AstSemicolonClassElementData extends AstData {
    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.None;
    }
}

/** @internal */
export class GetAccessorDeclaration extends Node<SyntaxKind.GetAccessor, AstGetAccessorDeclarationData> implements JSDocContainer, Declaration, LocalsContainer, FlowContainer, ts.GetAccessorDeclaration {
    declare readonly ast: AstGetAccessorDeclaration;

    declare _functionLikeDeclarationBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;
    declare _classElementBrand: any;
    declare _typeElementBrand: any;
    declare _objectLiteralBrand: any;
    declare _localsContainerBrand: any;
    declare _flowContainerBrand: any;

    override get parent() { return super.parent as ClassLikeDeclaration | ObjectLiteralExpression; }
    override set parent(value) { super.parent = value; }

    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get body() { return this.ast.data.body?.node; }
    set body(value) { this.ast.data.body = value?.ast; }
    get typeParameters() { return this.ast.data.typeParameters?.nodes; }
    set typeParameters(value) { this.ast.data.typeParameters = value?.ast; }
    get parameters() { return this.ast.data.parameters?.nodes!; } // TODO: remove `!`
    set parameters(value) { this.ast.data.parameters = value?.ast; }
    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
    get typeArguments() { return this.ast.data.typeArguments?.nodes; }
    set typeArguments(value) { this.ast.data.typeArguments = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
    get endFlowNode() { return this.ast.data.endFlowNode; }
    set endFlowNode(value) { this.ast.data.endFlowNode = value; }
    get returnFlowNode() { return this.ast.data.returnFlowNode; }
    set returnFlowNode(value) { this.ast.data.returnFlowNode = value; }
}

/** @internal */
export class AstGetAccessorDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    name: AstPropertyName = undefined!;
    body: AstFunctionBody | undefined = undefined;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined; // initialized by parser (grammar error)
    parameters: AstNodeArray<AstParameterDeclaration> | undefined = undefined;
    type: AstTypeNode | undefined = undefined;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined; // quick info

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    endFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    returnFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
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

/** @internal */
export class SetAccessorDeclaration extends Node<SyntaxKind.SetAccessor, AstSetAccessorDeclarationData> implements JSDocContainer, Declaration, LocalsContainer, FlowContainer, ts.SetAccessorDeclaration {
    declare readonly ast: AstSetAccessorDeclaration;

    declare _functionLikeDeclarationBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;
    declare _classElementBrand: any;
    declare _typeElementBrand: any;
    declare _objectLiteralBrand: any;
    declare _localsContainerBrand: any;
    declare _flowContainerBrand: any;

    override get parent() { return super.parent as ClassLikeDeclaration | ObjectLiteralExpression; }
    override set parent(value) { super.parent = value; }

    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get body() { return this.ast.data.body?.node; }
    set body(value) { this.ast.data.body = value?.ast; }
    get typeParameters() { return this.ast.data.typeParameters?.nodes; }
    set typeParameters(value) { this.ast.data.typeParameters = value?.ast; }
    get parameters() { return this.ast.data.parameters?.nodes!; } // TODO: remove `!`
    set parameters(value) { this.ast.data.parameters = value?.ast; }
    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
    get typeArguments() { return this.ast.data.typeArguments?.nodes; }
    set typeArguments(value) { this.ast.data.typeArguments = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
    get endFlowNode() { return this.ast.data.endFlowNode; }
    set endFlowNode(value) { this.ast.data.endFlowNode = value; }
    get returnFlowNode() { return this.ast.data.returnFlowNode; }
    set returnFlowNode(value) { this.ast.data.returnFlowNode = value; }
}

/** @internal */
export class AstSetAccessorDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    name: AstPropertyName = undefined!;
    body: AstFunctionBody | undefined = undefined;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined; // initialized by parser (grammar error)
    parameters: AstNodeArray<AstParameterDeclaration> | undefined = undefined;
    type: AstTypeNode | undefined = undefined; // initialized by parser (grammar error)
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined; // quick info

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    endFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    returnFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
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

/** @internal */
export type AccessorDeclaration =
    | GetAccessorDeclaration
    | SetAccessorDeclaration
    ;

/** @internal */
export type AstAccessorDeclaration = AstNodeOneOf<AccessorDeclaration>;

/** @internal */
export class IndexSignatureDeclaration extends Node<SyntaxKind.IndexSignature, AstIndexSignatureDeclarationData> implements JSDocContainer, Declaration, LocalsContainer, ts.IndexSignatureDeclaration {
    declare readonly ast: AstIndexSignatureDeclaration;

    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;
    declare _classElementBrand: any;
    declare _typeElementBrand: any;
    declare _localsContainerBrand: any;

    override get parent() { return super.parent as ObjectTypeDeclaration; }
    override set parent(value) { super.parent = value; }

    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get typeParameters() { return this.ast.data.typeParameters?.nodes; }
    set typeParameters(value) { this.ast.data.typeParameters = value?.ast; }
    get parameters() { return this.ast.data.parameters?.nodes!; } // TODO: remove `!`
    set parameters(value) { this.ast.data.parameters = value?.ast; }
    get type() { return this.ast.data.type?.node!; }
    set type(value) { this.ast.data.type = value?.ast; }
    get typeArguments() { return this.ast.data.typeArguments?.nodes; }
    set typeArguments(value) { this.ast.data.typeArguments = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
}

/** @internal */
export class AstIndexSignatureDeclarationData extends AstTypeScriptNodeData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    parameters: AstNodeArray<AstParameterDeclaration> | undefined = undefined;
    type: AstTypeNode | undefined = undefined;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined; // quick info

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;
}

/** @internal */
export class ClassStaticBlockDeclaration extends Node<SyntaxKind.ClassStaticBlockDeclaration, AstClassStaticBlockDeclarationData> implements JSDocContainer, Declaration, LocalsContainer, ts.ClassStaticBlockDeclaration {
    declare readonly ast: AstClassStaticBlockDeclaration;

    declare _classElementBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;
    declare _localsContainerBrand: any;

    override get parent() { return super.parent as ClassLikeDeclaration; }
    override set parent(value) { super.parent = value; }

    get body() { return this.ast.data.body?.node; }
    set body(value) { this.ast.data.body = value?.ast; }
    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
    get endFlowNode() { return this.ast.data.endFlowNode; }
    set endFlowNode(value) { this.ast.data.endFlowNode = value; }
    get returnFlowNode() { return this.ast.data.returnFlowNode; }
    set returnFlowNode(value) { this.ast.data.returnFlowNode = value; }
}

/** @internal */
export class AstClassStaticBlockDeclarationData extends AstData {
    body: AstBlock = undefined!;
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined; // initialized by parser (grammar error)
    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)

    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;
    endFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    returnFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.body) | TransformFlags.ContainsClassFields;
    }
}

/**
 * @deprecated
 * @internal
 */
export class ImportTypeAssertionContainer extends Node<SyntaxKind.ImportTypeAssertionContainer, AstImportTypeAssertionContainerData> implements ts.ImportTypeAssertionContainer {
    declare readonly ast: AstImportTypeAssertionContainer;

    override get parent() { return super.parent as ImportTypeNode; }
    override set parent(value) { super.parent = value; }

    /** @deprecated */
    get assertClause() { return this.ast.data.assertClause?.node; }
    set assertClause(value) { this.ast.data.assertClause = value?.ast; }
    get multiLine() { return this.ast.data.multiLine; }
    set multiLine(value) { this.ast.data.multiLine = value; }
}

/**
 * @deprecated
 * @internal
 */
export type AstImportTypeAssertionContainer = AstNode<ImportTypeAssertionContainer>;

/**
 * @deprecated
 * @internal
 */
export class AstImportTypeAssertionContainerData extends AstTypeScriptNodeData {
    assertClause: AstImportAttributes = undefined!;
    multiLine: boolean = false;
}

/** @internal */
export class ImportTypeNode extends Node<SyntaxKind.ImportType, AstImportTypeNodeData> implements ts.ImportTypeNode {
    declare readonly ast: AstImportTypeNode;

    declare _typeNodeBrand: any;

    get isTypeOf() { return this.ast.data.isTypeOf; }
    set isTypeOf(value) { this.ast.data.isTypeOf = value; }
    get argument() { return this.ast.data.argument?.node; }
    set argument(value) { this.ast.data.argument = value?.ast; }
    /** @deprecated */
    get attributes() { return this.ast.data.attributes?.node; }
    set attributes(value) { this.ast.data.attributes = value?.ast; }
    get assertions() { return this.ast.data.assertions?.node; }
    set assertions(value) { this.ast.data.assertions = value?.ast; }
    get qualifier() { return this.ast.data.qualifier?.node; }
    set qualifier(value) { this.ast.data.qualifier = value?.ast; }
    get typeArguments() { return this.ast.data.typeArguments?.nodes; }
    set typeArguments(value) { this.ast.data.typeArguments = value?.ast; }
}

/** @internal */
export class AstImportTypeNodeData extends AstTypeScriptNodeData {
    isTypeOf: boolean = false;
    argument: AstTypeNode = undefined!;
    assertions: AstImportTypeAssertionContainer | undefined = undefined;
    attributes: AstImportAttributes | undefined = undefined;
    qualifier: AstEntityName | undefined = undefined;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined;
}

/** @internal */
export interface KeywordTypeNode<TKind extends ts.KeywordTypeSyntaxKind = ts.KeywordTypeSyntaxKind> extends KeywordToken<TKind>, TypeNode<TKind> {
    readonly ast: AstKeywordTypeNode<TKind>;
    readonly kind: TKind;
    _typeNodeBrand: any;
}

/** @internal */
export type AstKeywordTypeNode<TKind extends ts.KeywordTypeSyntaxKind = ts.KeywordTypeSyntaxKind> = AstNode<KeywordTypeNode<TKind>>;

/** @internal */
export class ThisTypeNode extends Node<SyntaxKind.ThisType, AstThisTypeNodeData> implements ts.ThisTypeNode {
    declare readonly ast: AstThisTypeNode;

    declare _typeNodeBrand: any;
}

/** @internal */
export class AstThisTypeNodeData extends AstTypeScriptNodeData {
}

/** @internal */
export class FunctionTypeNode extends Node<SyntaxKind.FunctionType, AstFunctionTypeNodeData> implements JSDocContainer, Declaration, LocalsContainer, ts.FunctionTypeNode {
    declare readonly ast: AstFunctionTypeNode;

    declare _typeNodeBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;
    declare _localsContainerBrand: any;

    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get typeParameters() { return this.ast.data.typeParameters?.nodes; }
    set typeParameters(value) { this.ast.data.typeParameters = value?.ast; }
    get parameters() { return this.ast.data.parameters?.nodes!; } // TODO: remove `!`
    set parameters(value) { this.ast.data.parameters = value?.ast; }
    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
    get typeArguments() { return this.ast.data.typeArguments?.nodes; }
    set typeArguments(value) { this.ast.data.typeArguments = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
}

/** @internal */
export class AstFunctionTypeNodeData extends AstTypeScriptNodeData {
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    parameters: AstNodeArray<AstParameterDeclaration> | undefined = undefined;
    type: AstTypeNode = undefined!;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined; // quick info
    modifiers: AstNodeArray<AstModifier> | undefined = undefined; // initialized by parser (grammar error)

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;
}

/** @internal */
export class ConstructorTypeNode extends Node<SyntaxKind.ConstructorType, AstConstructorTypeNodeData> implements JSDocContainer, Declaration, LocalsContainer, ts.ConstructorTypeNode {
    declare readonly ast: AstConstructorTypeNode;

    declare _typeNodeBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;
    declare _localsContainerBrand: any;

    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get typeParameters() { return this.ast.data.typeParameters?.nodes; }
    set typeParameters(value) { this.ast.data.typeParameters = value?.ast; }
    get parameters() { return this.ast.data.parameters?.nodes!; } // TODO: remove `!`
    set parameters(value) { this.ast.data.parameters = value?.ast; }
    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
    get typeArguments() { return this.ast.data.typeArguments?.nodes; }
    set typeArguments(value) { this.ast.data.typeArguments = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
}

/** @internal */
export class AstConstructorTypeNodeData extends AstTypeScriptNodeData {
    modifiers: AstNodeArray<AstModifier> | undefined = undefined;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    parameters: AstNodeArray<AstParameterDeclaration> | undefined = undefined;
    type: AstTypeNode = undefined!;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined; // quick info

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;
}

/** @internal */
export class TypeReferenceNode extends Node<SyntaxKind.TypeReference, AstTypeReferenceNodeData> implements ts.TypeReferenceNode {
    declare readonly ast: AstTypeReferenceNode;

    declare _typeNodeBrand: any;

    get typeName() { return this.ast.data.typeName?.node; }
    set typeName(value) { this.ast.data.typeName = value?.ast; }
    get typeArguments() { return this.ast.data.typeArguments?.nodes; }
    set typeArguments(value) { this.ast.data.typeArguments = value?.ast; }
}

/** @internal */
export class AstTypeReferenceNodeData extends AstTypeScriptNodeData {
    typeName: AstEntityName = undefined!;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined;
}

/** @internal */
export class TypePredicateNode extends Node<SyntaxKind.TypePredicate, AstTypePredicateNodeData> implements ts.TypePredicateNode {
    declare readonly ast: AstTypePredicateNode;

    declare _typeNodeBrand: any;

    override get parent() { return super.parent as SignatureDeclaration | JSDocTypeExpression; }
    override set parent(value) { super.parent = value; }

    get assertsModifier() { return this.ast.data.assertsModifier?.node; }
    set assertsModifier(value) { this.ast.data.assertsModifier = value?.ast; }
    get parameterName() { return this.ast.data.parameterName?.node; }
    set parameterName(value) { this.ast.data.parameterName = value?.ast; }
    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
}

/** @internal */
export class AstTypePredicateNodeData extends AstTypeScriptNodeData {
    assertsModifier: AstAssertsKeyword | undefined = undefined;
    parameterName: AstIdentifier | AstThisTypeNode = undefined!;
    type: AstTypeNode | undefined = undefined;
}

/** @internal */
export class TypeQueryNode extends Node<SyntaxKind.TypeQuery, AstTypeQueryNodeData> implements ts.TypeQueryNode {
    declare readonly ast: AstTypeQueryNode;

    declare _typeNodeBrand: any;

    get exprName() { return this.ast.data.exprName?.node; }
    set exprName(value) { this.ast.data.exprName = value?.ast; }
    get typeArguments() { return this.ast.data.typeArguments?.nodes; }
    set typeArguments(value) { this.ast.data.typeArguments = value?.ast; }
}

/** @internal */
export class AstTypeQueryNodeData extends AstTypeScriptNodeData {
    exprName: AstEntityName = undefined!;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined;
}

/** @internal */
export class TypeLiteralNode extends Node<SyntaxKind.TypeLiteral, AstTypeLiteralNodeData> implements Declaration, ts.TypeLiteralNode {
    declare readonly ast: AstTypeLiteralNode;

    declare _typeNodeBrand: any;
    declare _declarationBrand: any;

    get members() { return this.ast.data.members?.nodes!; } // TODO: remove '!'
    set members(value) { this.ast.data.members = value?.ast; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstTypeLiteralNodeData extends AstTypeScriptNodeData {
    members: AstNodeArray<AstTypeElement> | undefined = undefined;
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
}

/** @internal */
export class ArrayTypeNode extends Node<SyntaxKind.ArrayType, AstArrayTypeNodeData> implements ts.ArrayTypeNode {
    declare readonly ast: AstArrayTypeNode;

    declare _typeNodeBrand: any;

    get elementType() { return this.ast.data.elementType?.node; }
    set elementType(value) { this.ast.data.elementType = value?.ast; }
}

/** @internal */
export class AstArrayTypeNodeData extends AstTypeScriptNodeData {
    elementType: AstTypeNode = undefined!;
}

/** @internal */
export class TupleTypeNode extends Node<SyntaxKind.TupleType, AstTupleTypeNodeData> implements ts.TupleTypeNode {
    declare readonly ast: AstTupleTypeNode;

    declare _typeNodeBrand: any;

    get elements(): NodeArray<TypeNode | NamedTupleMember> { return this.ast.data.elements?.nodes!; } // TODO: remove '!'
    set elements(value: NodeArray<TypeNode | NamedTupleMember>) { this.ast.data.elements = value?.ast; }
}

/** @internal */
export class AstTupleTypeNodeData extends AstTypeScriptNodeData {
    elements: AstNodeArray<AstTypeNode | AstNamedTupleMember> | undefined = undefined;
}

/** @internal */
export class NamedTupleMember extends Node<SyntaxKind.NamedTupleMember, AstNamedTupleMemberData> implements JSDocContainer, Declaration, ts.NamedTupleMember {
    declare readonly ast: AstNamedTupleMember;

    declare _typeNodeBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;

    get dotDotDotToken() { return this.ast.data.dotDotDotToken?.node; }
    set dotDotDotToken(value) { this.ast.data.dotDotDotToken = value?.ast; }
    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get questionToken() { return this.ast.data.questionToken?.node; }
    set questionToken(value) { this.ast.data.questionToken = value?.ast; }
    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstNamedTupleMemberData extends AstTypeScriptNodeData {
    dotDotDotToken: AstDotDotDotToken | undefined = undefined;
    name: AstIdentifier = undefined!;
    questionToken: AstQuestionToken | undefined = undefined;
    type: AstTypeNode = undefined!;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
}

/** @internal */
export class OptionalTypeNode extends Node<SyntaxKind.OptionalType, AstOptionalTypeNodeData> implements ts.OptionalTypeNode {
    declare readonly ast: AstOptionalTypeNode;

    declare _typeNodeBrand: any;

    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
}

/** @internal */
export class AstOptionalTypeNodeData extends AstTypeScriptNodeData {
    type: AstTypeNode = undefined!;
}

/** @internal */
export class RestTypeNode extends Node<SyntaxKind.RestType, AstRestTypeNodeData> implements ts.RestTypeNode {
    declare readonly ast: AstRestTypeNode;

    declare _typeNodeBrand: any;

    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
}

/** @internal */
export class AstRestTypeNodeData extends AstTypeScriptNodeData {
    type: AstTypeNode = undefined!;
}

/** @internal */
export class UnionTypeNode extends Node<SyntaxKind.UnionType, AstUnionTypeNodeData> implements ts.UnionTypeNode {
    declare readonly ast: AstUnionTypeNode;

    declare _typeNodeBrand: any;

    get types() { return this.ast.data.types?.nodes!; } // TODO: remove '!'
    set types(value) { this.ast.data.types = value?.ast; }
}

/** @internal */
export class AstUnionTypeNodeData extends AstTypeScriptNodeData {
    types: AstNodeArray<AstTypeNode> | undefined = undefined;
}

/** @internal */
export class IntersectionTypeNode extends Node<SyntaxKind.IntersectionType, AstIntersectionTypeNodeData> implements ts.IntersectionTypeNode {
    declare readonly ast: AstIntersectionTypeNode;

    declare _typeNodeBrand: any;

    get types() { return this.ast.data.types?.nodes!; } // TODO: remove '!'
    set types(value) { this.ast.data.types = value?.ast; }
}

/** @internal */
export class AstIntersectionTypeNodeData extends AstTypeScriptNodeData {
    types: AstNodeArray<AstTypeNode> | undefined = undefined;
}

/** @internal */
export class ConditionalTypeNode extends Node<SyntaxKind.ConditionalType, AstConditionalTypeNodeData> implements LocalsContainer, ts.ConditionalTypeNode {
    declare readonly ast: AstConditionalTypeNode;

    declare _typeNodeBrand: any;
    declare _localsContainerBrand: any;

    get checkType() { return this.ast.data.checkType?.node; }
    set checkType(value) { this.ast.data.checkType = value?.ast; }
    get extendsType() { return this.ast.data.extendsType?.node; }
    set extendsType(value) { this.ast.data.extendsType = value?.ast; }
    get trueType() { return this.ast.data.trueType?.node; }
    set trueType(value) { this.ast.data.trueType = value?.ast; }
    get falseType() { return this.ast.data.falseType?.node; }
    set falseType(value) { this.ast.data.falseType = value?.ast; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
}

/** @internal */
export class AstConditionalTypeNodeData extends AstTypeScriptNodeData {
    checkType: AstTypeNode = undefined!;
    extendsType: AstTypeNode = undefined!;
    trueType: AstTypeNode = undefined!;
    falseType: AstTypeNode = undefined!;
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;
}

/** @internal */
export class InferTypeNode extends Node<SyntaxKind.InferType, AstInferTypeNodeData> implements ts.InferTypeNode {
    declare readonly ast: AstInferTypeNode;

    declare _typeNodeBrand: any;

    get typeParameter() { return this.ast.data.typeParameter?.node; }
    set typeParameter(value) { this.ast.data.typeParameter = value?.ast; }
}

/** @internal */
export class AstInferTypeNodeData extends AstTypeScriptNodeData {
    typeParameter: AstTypeParameterDeclaration = undefined!;
}

/** @internal */
export class ParenthesizedTypeNode extends Node<SyntaxKind.ParenthesizedType, AstParenthesizedTypeNodeData> implements ts.ParenthesizedTypeNode {
    declare readonly ast: AstParenthesizedTypeNode;

    declare _typeNodeBrand: any;

    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
}

/** @internal */
export class AstParenthesizedTypeNodeData extends AstTypeScriptNodeData {
    type: AstTypeNode = undefined!;
}

/** @internal */
export class TypeOperatorNode extends Node<SyntaxKind.TypeOperator, AstTypeOperatorNodeData> implements ts.TypeOperatorNode {
    declare readonly ast: AstTypeOperatorNode;

    declare _typeNodeBrand: any;

    get operator() { return this.ast.data.operator; }
    set operator(value) { this.ast.data.operator = value; }
    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
}

/** @internal */
export class AstTypeOperatorNodeData extends AstTypeScriptNodeData {
    operator: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword = undefined!;
    type: AstTypeNode = undefined!;
}

/** @internal */
export class IndexedAccessTypeNode extends Node<SyntaxKind.IndexedAccessType, AstIndexedAccessTypeNodeData> implements ts.IndexedAccessTypeNode {
    declare readonly ast: AstIndexedAccessTypeNode;

    declare _typeNodeBrand: any;

    get objectType() { return this.ast.data.objectType?.node; }
    set objectType(value) { this.ast.data.objectType = value?.ast; }
    get indexType() { return this.ast.data.indexType?.node; }
    set indexType(value) { this.ast.data.indexType = value?.ast; }
}

/** @internal */
export class AstIndexedAccessTypeNodeData extends AstTypeScriptNodeData {
    objectType: AstTypeNode = undefined!;
    indexType: AstTypeNode = undefined!;
}

/** @internal */
export class MappedTypeNode extends Node<SyntaxKind.MappedType, AstMappedTypeNodeData> implements Declaration, LocalsContainer, ts.MappedTypeNode {
    declare readonly ast: AstMappedTypeNode;

    declare _typeNodeBrand: any;
    declare _declarationBrand: any;
    declare _localsContainerBrand: any;

    get readonlyToken() { return this.ast.data.readonlyToken?.node; }
    set readonlyToken(value) { this.ast.data.readonlyToken = value?.ast; }
    get typeParameter() { return this.ast.data.typeParameter?.node; }
    set typeParameter(value) { this.ast.data.typeParameter = value?.ast; }
    get nameType() { return this.ast.data.nameType?.node; }
    set nameType(value) { this.ast.data.nameType = value?.ast; }
    get questionToken() { return this.ast.data.questionToken?.node; }
    set questionToken(value) { this.ast.data.questionToken = value?.ast; }
    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
    get members() { return this.ast.data.members?.nodes; }
    set members(value) { this.ast.data.members = value?.ast; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
}

/** @internal */
export class AstMappedTypeNodeData extends AstTypeScriptNodeData {
    readonlyToken: AstReadonlyKeyword | AstPlusToken | AstMinusToken | undefined = undefined;
    typeParameter: AstTypeParameterDeclaration = undefined!;
    nameType: AstTypeNode | undefined = undefined;
    questionToken: AstQuestionToken | AstPlusToken | AstMinusToken | undefined = undefined;
    type: AstTypeNode | undefined = undefined;
    members: AstNodeArray<AstTypeElement> | undefined = undefined;
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;
}

/** @internal */
export class LiteralTypeNode extends Node<SyntaxKind.LiteralType, AstLiteralTypeNodeData> implements ts.LiteralTypeNode {
    declare readonly ast: AstLiteralTypeNode;

    declare _typeNodeBrand: any;

    get literal() { return this.ast.data.literal?.node; }
    set literal(value) { this.ast.data.literal = value?.ast; }
}

/** @internal */
export class AstLiteralTypeNodeData extends AstTypeScriptNodeData {
    literal: AstNullLiteral | AstBooleanLiteral | AstLiteralExpression | AstPrefixUnaryExpression = undefined!;
}

/** @internal */
export type PropertyNameLiteral =
    | Identifier
    | StringLiteralLike
    | NumericLiteral
    | JsxNamespacedName
    | BigIntLiteral;

/** @internal */
export type AstPropertyNameLiteral = AstNodeOneOf<PropertyNameLiteral>;

/** @internal */
export class TemplateLiteralTypeNode extends Node<SyntaxKind.TemplateLiteralType, AstTemplateLiteralTypeNodeData> implements ts.TemplateLiteralTypeNode {
    declare readonly ast: AstTemplateLiteralTypeNode;

    declare _typeNodeBrand: any;

    get head() { return this.ast.data.head?.node; }
    set head(value) { this.ast.data.head = value?.ast; }
    get templateSpans() { return this.ast.data.templateSpans?.nodes!; } // TODO: remove '!'
    set templateSpans(value) { this.ast.data.templateSpans = value?.ast; }
}

/** @internal */
export class AstTemplateLiteralTypeNodeData extends AstTypeScriptNodeData {
    head: AstTemplateHead = undefined!;
    templateSpans: AstNodeArray<AstTemplateLiteralTypeSpan> | undefined = undefined;
}

/** @internal */
export class TemplateLiteralTypeSpan extends Node<SyntaxKind.TemplateLiteralTypeSpan, AstTemplateLiteralTypeSpanData> implements ts.TemplateLiteralTypeSpan {
    declare readonly ast: AstTemplateLiteralTypeSpan;

    declare _typeNodeBrand: any;

    override get parent() { return super.parent as TemplateLiteralTypeNode; }
    override set parent(value) { super.parent = value; }

    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
    get literal() { return this.ast.data.literal?.node; }
    set literal(value) { this.ast.data.literal = value?.ast; }
}

/** @internal */
export class AstTemplateLiteralTypeSpanData extends AstTypeScriptNodeData {
    type: AstTypeNode = undefined!;
    literal: AstTemplateMiddle | AstTemplateTail = undefined!;
}

/** @internal */
export type Literal =
    | NumericLiteral
    | BigIntLiteral
    | StringLiteral
    | JsxText
    | RegularExpressionLiteral
    | NoSubstitutionTemplateLiteral
    ;

/** @internal */
export type AstLiteral = AstNodeOneOf<Literal>;

/** @internal */
export class OmittedExpression extends Node<SyntaxKind.OmittedExpression, AstOmittedExpressionData> implements ts.OmittedExpression {
    declare readonly ast: AstOmittedExpression;

    declare _expressionBrand: any;
}

/** @internal */
export class AstOmittedExpressionData extends AstData {
    override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.None;
    }
}

/** @internal */
export class PrefixUnaryExpression extends Node<SyntaxKind.PrefixUnaryExpression, AstPrefixUnaryExpressionData> implements ts.PrefixUnaryExpression {
    declare readonly ast: AstPrefixUnaryExpression;

    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;

    get operator() { return this.ast.data.operator; }
    set operator(value) { this.ast.data.operator = value; }
    get operand() { return this.ast.data.operand?.node; }
    set operand(value) { this.ast.data.operand = value?.ast; }
}

/** @internal */
export class AstPrefixUnaryExpressionData extends AstData {
    operator: PrefixUnaryOperator = undefined!;
    operand: AstUnaryExpression = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
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

/** @internal */
export class PostfixUnaryExpression extends Node<SyntaxKind.PostfixUnaryExpression, AstPostfixUnaryExpressionData> implements ts.PostfixUnaryExpression {
    declare readonly ast: AstPostfixUnaryExpression;

    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;

    get operand() { return this.ast.data.operand?.node; }
    set operand(value) { this.ast.data.operand = value?.ast; }
    get operator() { return this.ast.data.operator; }
    set operator(value) { this.ast.data.operator = value; }
}

/** @internal */
export class AstPostfixUnaryExpressionData extends AstData {
    operand: AstLeftHandSideExpression = undefined!;
    operator: PostfixUnaryOperator = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
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

/** @internal */
export class DeleteExpression extends Node<SyntaxKind.DeleteExpression, AstDeleteExpressionData> implements ts.DeleteExpression {
    declare readonly ast: AstDeleteExpression;

    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;

    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
}

/** @internal */
export class AstDeleteExpressionData extends AstData {
    expression: AstUnaryExpression = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression);
    }
}

/** @internal */
export class TypeOfExpression extends Node<SyntaxKind.TypeOfExpression, AstTypeOfExpressionData> implements ts.TypeOfExpression {
    declare readonly ast: AstTypeOfExpression;

    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;

    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
}

/** @internal */
export class AstTypeOfExpressionData extends AstData {
    expression: AstUnaryExpression = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression);
    }
}

/** @internal */
export class VoidExpression extends Node<SyntaxKind.VoidExpression, AstVoidExpressionData> implements ts.VoidExpression {
    declare readonly ast: AstVoidExpression;

    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;

    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
}

/** @internal */
export class AstVoidExpressionData extends AstData {
    expression: AstUnaryExpression = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression);
    }
}

/** @internal */
export class AwaitExpression extends Node<SyntaxKind.AwaitExpression, AstAwaitExpressionData> implements ts.AwaitExpression {
    declare readonly ast: AstAwaitExpression;

    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;

    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
}

/** @internal */
export class AstAwaitExpressionData extends AstData {
    expression: AstUnaryExpression = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            TransformFlags.ContainsES2017 |
            TransformFlags.ContainsES2018 |
            TransformFlags.ContainsAwait;
    }
}

/** @internal */
export class YieldExpression extends Node<SyntaxKind.YieldExpression, AstYieldExpressionData> implements ts.YieldExpression {
    declare readonly ast: AstYieldExpression;

    declare _expressionBrand: any;

    get asteriskToken() { return this.ast.data.asteriskToken?.node; }
    set asteriskToken(value) { this.ast.data.asteriskToken = value?.ast; }
    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
}

/** @internal */
export class AstYieldExpressionData extends AstData {
    asteriskToken: AstAsteriskToken | undefined = undefined;
    expression: AstExpression | undefined = undefined;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            propagateChildFlags(this.asteriskToken) |
            TransformFlags.ContainsES2015 |
            TransformFlags.ContainsES2018 |
            TransformFlags.ContainsYield;
    }
}

/** @internal */
export type BinaryOperatorToken = Token<BinaryOperator>;

/** @internal */
export type AstBinaryOperatorToken = AstNode<BinaryOperatorToken>;

/** @internal */
export class BinaryExpression extends Node<SyntaxKind.BinaryExpression, AstBinaryExpressionData> implements JSDocContainer, Declaration, ts.BinaryExpression {
    declare readonly ast: AstBinaryExpression;

    declare _expressionBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;

    get left() { return this.ast.data.left?.node; }
    set left(value) { this.ast.data.left = value?.ast; }
    get operatorToken() { return this.ast.data.operatorToken?.node; }
    set operatorToken(value) { this.ast.data.operatorToken = value?.ast; }
    get right() { return this.ast.data.right?.node; }
    set right(value) { this.ast.data.right = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstBinaryExpressionData extends AstData {
    left: AstExpression = undefined!;
    operatorToken: AstBinaryOperatorToken = undefined!;
    right: AstExpression = undefined!;
    cachedLiteralKind: SyntaxKind | undefined = undefined;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(_: AstNode): TransformFlags {
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

/** @internal */
export type AssignmentOperatorToken = Token<AssignmentOperator>;

/** @internal */
export interface AssignmentExpression<TOperator extends AssignmentOperatorToken> extends BinaryExpression {
    readonly left: LeftHandSideExpression;
    readonly operatorToken: TOperator;
}

/** @internal */
export interface ObjectDestructuringAssignment extends AssignmentExpression<EqualsToken> {
    readonly left: ObjectLiteralExpression;
}

/** @internal */
export interface ArrayDestructuringAssignment extends AssignmentExpression<EqualsToken> {
    readonly left: ArrayLiteralExpression;
}

/** @internal */
export type DestructuringAssignment =
    | ObjectDestructuringAssignment
    | ArrayDestructuringAssignment;

/** @internal */
export type AstDestructuringAssignment = AstNodeOneOf<DestructuringAssignment>;

/** @internal */
export class ConditionalExpression extends Node<SyntaxKind.ConditionalExpression, AstConditionalExpressionData> implements ts.ConditionalExpression {
    declare readonly ast: AstConditionalExpression;

    declare _expressionBrand: any;

    get condition() { return this.ast.data.condition?.node; }
    set condition(value) { this.ast.data.condition = value?.ast; }
    get questionToken() { return this.ast.data.questionToken?.node; }
    set questionToken(value) { this.ast.data.questionToken = value?.ast; }
    get whenTrue() { return this.ast.data.whenTrue?.node; }
    set whenTrue(value) { this.ast.data.whenTrue = value?.ast; }
    get colonToken() { return this.ast.data.colonToken?.node; }
    set colonToken(value) { this.ast.data.colonToken = value?.ast; }
    get whenFalse() { return this.ast.data.whenFalse?.node; }
    set whenFalse(value) { this.ast.data.whenFalse = value?.ast; }
}

/** @internal */
export class AstConditionalExpressionData extends AstData {
    condition: AstExpression = undefined!;
    questionToken: AstQuestionToken = undefined!;
    whenTrue: AstExpression = undefined!;
    colonToken: AstToken<SyntaxKind.ColonToken> = undefined!;
    whenFalse: AstExpression = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.condition) |
            propagateChildFlags(this.questionToken) |
            propagateChildFlags(this.whenTrue) |
            propagateChildFlags(this.colonToken) |
            propagateChildFlags(this.whenFalse);
    }
}

/** @internal */
export type FunctionBody =
    | Block;

/** @internal */
export type AstFunctionBody = AstNodeOneOf<FunctionBody>;

/** @internal */
export type ConciseBody =
    | FunctionBody
    | Expression;

/** @internal */
export type AstConciseBody = AstNodeOneOf<ConciseBody>;

/** @internal */
export class FunctionExpression extends Node<SyntaxKind.FunctionExpression, AstFunctionExpressionData> implements JSDocContainer, Declaration, LocalsContainer, FlowContainer, ts.FunctionExpression {
    declare readonly ast: AstFunctionExpression;

    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
    declare _functionLikeDeclarationBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;
    declare _localsContainerBrand: any;
    declare _flowContainerBrand: any;

    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get asteriskToken() { return this.ast.data.asteriskToken?.node; }
    set asteriskToken(value) { this.ast.data.asteriskToken = value?.ast; }
    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get typeParameters() { return this.ast.data.typeParameters?.nodes; }
    set typeParameters(value) { this.ast.data.typeParameters = value?.ast; }
    /** @internal */ get typeArguments() { return this.ast.data.typeArguments?.nodes; }
    /** @internal */ set typeArguments(value) { this.ast.data.typeArguments = value?.ast; }
    get parameters() { return this.ast.data.parameters?.nodes!; } // TODO: remove `!`
    set parameters(value) { this.ast.data.parameters = value?.ast; }
    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
    get body() { return this.ast.data.body?.node; }
    set body(value) { this.ast.data.body = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
    get endFlowNode() { return this.ast.data.endFlowNode; }
    set endFlowNode(value) { this.ast.data.endFlowNode = value; }
    get returnFlowNode() { return this.ast.data.returnFlowNode; }
    set returnFlowNode(value) { this.ast.data.returnFlowNode = value; }
}

/** @internal */
export class AstFunctionExpressionData extends AstData {
    modifiers: AstNodeArray<AstModifier> | undefined = undefined;
    asteriskToken: AstAsteriskToken | undefined = undefined;
    name: AstIdentifier | undefined = undefined;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    parameters: AstNodeArray<AstParameterDeclaration> | undefined = undefined;
    type: AstTypeNode | undefined = undefined;
    body: AstFunctionBody = undefined!;
    /** @internal */ typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined; // Used for quick info, replaces typeParameters for instantiated signatures

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    endFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    returnFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
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

/** @internal */
export type ImmediatelyInvokedFunctionExpression = CallExpression & { readonly expression: FunctionExpression; };

/** @internal */
export class ArrowFunction extends Node<SyntaxKind.ArrowFunction, AstArrowFunctionData> implements JSDocContainer, Declaration, LocalsContainer, FlowContainer, ts.ArrowFunction {
    declare readonly ast: AstArrowFunction;

    declare _expressionBrand: any;
    declare _functionLikeDeclarationBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;
    declare _localsContainerBrand: any;
    declare _flowContainerBrand: any;
    declare name: never;

    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get equalsGreaterThanToken() { return this.ast.data.equalsGreaterThanToken?.node; }
    set equalsGreaterThanToken(value) { this.ast.data.equalsGreaterThanToken = value?.ast; }
    get typeParameters() { return this.ast.data.typeParameters?.nodes; }
    set typeParameters(value) { this.ast.data.typeParameters = value?.ast; }
    get parameters() { return this.ast.data.parameters?.nodes!; } // TODO: remove `!`
    set parameters(value) { this.ast.data.parameters = value?.ast; }
    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
    get body() { return this.ast.data.body?.node; }
    set body(value) { this.ast.data.body = value?.ast; }
    get typeArguments() { return this.ast.data.typeArguments?.nodes; }
    set typeArguments(value) { this.ast.data.typeArguments = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
    get endFlowNode() { return this.ast.data.endFlowNode; }
    set endFlowNode(value) { this.ast.data.endFlowNode = value; }
    get returnFlowNode() { return this.ast.data.returnFlowNode; }
    set returnFlowNode(value) { this.ast.data.returnFlowNode = value; }
}

/** @internal */
export class AstArrowFunctionData extends AstData {
    modifiers: AstNodeArray<AstModifier> | undefined = undefined;
    equalsGreaterThanToken: AstToken<SyntaxKind.EqualsGreaterThanToken> = undefined!;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    parameters: AstNodeArray<AstParameterDeclaration> | undefined = undefined;
    type: AstTypeNode | undefined = undefined;
    body: AstConciseBody = undefined!;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    endFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    returnFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
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

/** @internal */
export type ImmediatelyInvokedArrowFunction = CallExpression & { readonly expression: ParenthesizedExpression & { readonly expression: ArrowFunction; }; };

/** @internal */
export class RegularExpressionLiteral extends Token<SyntaxKind.RegularExpressionLiteral, AstRegularExpressionLiteralData> implements ts.RegularExpressionLiteral {
    declare readonly ast: AstRegularExpressionLiteral;

    declare _literalExpressionBrand: any;
    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;

    get text() { return this.ast.data.text; }
    set text(value) { this.ast.data.text = value; }
    get isUnterminated() { return this.ast.data.isUnterminated; }
    set isUnterminated(value) { this.ast.data.isUnterminated = value; }
    get hasExtendedUnicodeEscape() { return this.ast.data.hasExtendedUnicodeEscape; }
    set hasExtendedUnicodeEscape(value) { this.ast.data.hasExtendedUnicodeEscape = value; }
}

/** @internal */
export class AstRegularExpressionLiteralData extends AstTokenData {
    text: string = "";
    isUnterminated: boolean | undefined = undefined;
    hasExtendedUnicodeEscape: boolean | undefined = undefined;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.None;
    }
}

/** @internal */
export class StringLiteral extends Token<SyntaxKind.StringLiteral, AstStringLiteralData> implements LiteralExpression, Declaration, ts.StringLiteral {
    declare readonly ast: AstStringLiteral;

    declare _literalExpressionBrand: any;
    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
    declare _declarationBrand: any;

    get text() { return this.ast.data.text; }
    set text(value) { this.ast.data.text = value; }
    get singleQuote() { return this.ast.data.singleQuote; }
    set singleQuote(value) { this.ast.data.singleQuote = value; }
    get isUnterminated() { return this.ast.data.isUnterminated; }
    set isUnterminated(value) { this.ast.data.isUnterminated = value; }
    get hasExtendedUnicodeEscape() { return this.ast.data.hasExtendedUnicodeEscape; }
    set hasExtendedUnicodeEscape(value) { this.ast.data.hasExtendedUnicodeEscape = value; }
    get textSourceNode() { return this.ast.data.textSourceNode?.node; }
    set textSourceNode(value) { this.ast.data.textSourceNode = value?.ast; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstStringLiteralData extends AstTokenData {
    text: string = "";
    singleQuote: boolean | undefined = undefined;
    isUnterminated: boolean = false;
    hasExtendedUnicodeEscape: boolean = false;

    textSourceNode?: AstNode<Identifier | StringLiteralLike | NumericLiteral | PrivateIdentifier | JsxNamespacedName | BigIntLiteral> | undefined;
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return this.hasExtendedUnicodeEscape ? TransformFlags.ContainsES2015 : TransformFlags.None;
    }
}

/** @internal */
export class NoSubstitutionTemplateLiteral extends Token<SyntaxKind.NoSubstitutionTemplateLiteral, AstNoSubstitutionTemplateLiteralData> implements Declaration, ts.NoSubstitutionTemplateLiteral {
    declare readonly ast: AstNoSubstitutionTemplateLiteral;

    declare _literalExpressionBrand: any;
    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
    declare _declarationBrand: any;

    get text() { return this.ast.data.text; }
    set text(value) { this.ast.data.text = value; }
    get rawText() { return this.ast.data.rawText; }
    set rawText(value) { this.ast.data.rawText = value; }
    get isUnterminated() { return this.ast.data.isUnterminated; }
    set isUnterminated(value) { this.ast.data.isUnterminated = value; }
    get hasExtendedUnicodeEscape() { return this.ast.data.hasExtendedUnicodeEscape; }
    set hasExtendedUnicodeEscape(value) { this.ast.data.hasExtendedUnicodeEscape = value; }
    get templateFlags() { return this.ast.data.templateFlags; }
    set templateFlags(value) { this.ast.data.templateFlags = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstNoSubstitutionTemplateLiteralData extends AstTokenData {
    text: string = "";
    rawText: string | undefined = undefined;
    isUnterminated: boolean | undefined = undefined;
    hasExtendedUnicodeEscape: boolean | undefined = undefined;
    templateFlags = TokenFlags.None;

    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return getTransformFlagsOfTemplateLiteralLike(this.templateFlags);
    }
}

/** @internal */
export type PseudoLiteralToken =
    | TemplateHead
    | TemplateMiddle
    | TemplateTail;

/** @internal */
export type AstPseudoLiteralToken = AstNodeOneOf<PseudoLiteralToken>;

/** @internal */
export type TemplateLiteralToken =
    | NoSubstitutionTemplateLiteral
    | PseudoLiteralToken;

/** @internal */
export type AstTemplateLiteralToken = AstNodeOneOf<TemplateLiteralToken>;

/** @internal */
export type StringLiteralLike =
    | StringLiteral
    | NoSubstitutionTemplateLiteral;

/** @internal */
export type AstStringLiteralLike = AstNodeOneOf<StringLiteralLike>;

/** @internal */
export class NumericLiteral extends Token<SyntaxKind.NumericLiteral, AstNumericLiteralData> implements Declaration, ts.NumericLiteral {
    declare readonly ast: AstNumericLiteral;

    declare _literalExpressionBrand: any;
    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
    declare _declarationBrand: any;

    get text() { return this.ast.data.text; }
    set text(value) { this.ast.data.text = value; }
    get numericLiteralFlags() { return this.ast.data.numericLiteralFlags; }
    set numericLiteralFlags(value) { this.ast.data.numericLiteralFlags = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstNumericLiteralData extends AstTokenData {
    text: string = "";
    numericLiteralFlags = TokenFlags.None;
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return this.numericLiteralFlags & TokenFlags.BinaryOrOctalSpecifier ? TransformFlags.ContainsES2015 : TransformFlags.None;
    }
}

/** @internal */
export class BigIntLiteral extends Token<SyntaxKind.BigIntLiteral, AstBigIntLiteralData> implements ts.BigIntLiteral {
    declare readonly ast: AstBigIntLiteral;

    declare _literalExpressionBrand: any;
    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;

    get text() { return this.ast.data.text; }
    set text(value) { this.ast.data.text = value; }
}

/** @internal */
export class AstBigIntLiteralData extends AstTokenData {
    text: string = "";

    override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.ContainsES2020;
    }
}

/** @internal */
export type LiteralToken =
    | NumericLiteral
    | BigIntLiteral
    | StringLiteral
    | JsxText
    | RegularExpressionLiteral
    | NoSubstitutionTemplateLiteral;

/** @internal */
export type AstLiteralToken = AstNodeOneOf<LiteralToken>;

/** @internal */
export class TemplateHead extends Token<SyntaxKind.TemplateHead, AstTemplateHeadData> implements ts.TemplateHead {
    declare readonly ast: AstTemplateHead;

    override get parent() { return super.parent as TemplateExpression | TemplateLiteralTypeNode; }
    override set parent(value) { super.parent = value; }

    get text() { return this.ast.data.text; }
    set text(value) { this.ast.data.text = value; }
    get isUnterminated() { return this.ast.data.isUnterminated; }
    set isUnterminated(value) { this.ast.data.isUnterminated = value; }
    get hasExtendedUnicodeEscape() { return this.ast.data.hasExtendedUnicodeEscape; }
    set hasExtendedUnicodeEscape(value) { this.ast.data.hasExtendedUnicodeEscape = value; }
    get rawText() { return this.ast.data.rawText; }
    set rawText(value) { this.ast.data.rawText = value; }
    get templateFlags() { return this.ast.data.templateFlags; }
    set templateFlags(value) { this.ast.data.templateFlags = value; }
}

/** @internal */
export class AstTemplateHeadData extends AstTokenData {
    text = "";
    isUnterminated: boolean | undefined = undefined;
    hasExtendedUnicodeEscape: boolean | undefined = undefined;
    rawText: string | undefined = undefined;
    templateFlags = TokenFlags.None;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return getTransformFlagsOfTemplateLiteralLike(this.templateFlags);
    }
}

/** @internal */
export class TemplateMiddle extends Token<SyntaxKind.TemplateMiddle, AstTemplateMiddleData> implements ts.TemplateMiddle {
    declare readonly ast: AstTemplateMiddle;

    override get parent() { return super.parent as TemplateSpan | TemplateLiteralTypeSpan; }
    override set parent(value) { super.parent = value; }

    get text() { return this.ast.data.text; }
    set text(value) { this.ast.data.text = value; }
    get isUnterminated() { return this.ast.data.isUnterminated; }
    set isUnterminated(value) { this.ast.data.isUnterminated = value; }
    get hasExtendedUnicodeEscape() { return this.ast.data.hasExtendedUnicodeEscape; }
    set hasExtendedUnicodeEscape(value) { this.ast.data.hasExtendedUnicodeEscape = value; }
    get rawText() { return this.ast.data.rawText; }
    set rawText(value) { this.ast.data.rawText = value; }
    get templateFlags() { return this.ast.data.templateFlags; }
    set templateFlags(value) { this.ast.data.templateFlags = value; }
}

/** @internal */
export class AstTemplateMiddleData extends AstTokenData {
    text = "";
    isUnterminated: boolean | undefined = undefined;
    hasExtendedUnicodeEscape: boolean | undefined = undefined;
    rawText: string | undefined = undefined;
    templateFlags = TokenFlags.None;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return getTransformFlagsOfTemplateLiteralLike(this.templateFlags);
    }
}

/** @internal */
export class TemplateTail extends Token<SyntaxKind.TemplateTail, AstTemplateTailData> implements ts.TemplateTail {
    declare readonly ast: AstTemplateTail;

    override get parent() { return super.parent as TemplateSpan | TemplateLiteralTypeSpan; }
    override set parent(value) { super.parent = value; }

    get text() { return this.ast.data.text; }
    set text(value) { this.ast.data.text = value; }
    get isUnterminated() { return this.ast.data.isUnterminated; }
    set isUnterminated(value) { this.ast.data.isUnterminated = value; }
    get hasExtendedUnicodeEscape() { return this.ast.data.hasExtendedUnicodeEscape; }
    set hasExtendedUnicodeEscape(value) { this.ast.data.hasExtendedUnicodeEscape = value; }
    get rawText() { return this.ast.data.rawText; }
    set rawText(value) { this.ast.data.rawText = value; }
    get templateFlags() { return this.ast.data.templateFlags; }
    set templateFlags(value) { this.ast.data.templateFlags = value; }
}

/** @internal */
export class AstTemplateTailData extends AstTokenData {
    text = "";
    isUnterminated: boolean | undefined = undefined;
    hasExtendedUnicodeEscape: boolean | undefined = undefined;
    rawText: string | undefined = undefined;
    templateFlags = TokenFlags.None;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return getTransformFlagsOfTemplateLiteralLike(this.templateFlags);
    }
}

/** @internal */
export class TemplateExpression extends Node<SyntaxKind.TemplateExpression, AstTemplateExpressionData> implements ts.TemplateExpression {
    declare readonly ast: AstTemplateExpression;

    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;

    get head() { return this.ast.data.head?.node; }
    set head(value) { this.ast.data.head = value?.ast; }
    get templateSpans() { return this.ast.data.templateSpans?.nodes!; } // TODO: remove `!`
    set templateSpans(value) { this.ast.data.templateSpans = value?.ast; }
}

/** @internal */
export class AstTemplateExpressionData extends AstData {
    head: AstTemplateHead = undefined!;
    templateSpans: AstNodeArray<AstTemplateSpan> | undefined = undefined;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.head) |
            propagateChildrenFlags(this.templateSpans) |
            TransformFlags.ContainsES2015;
    }
}

/** @internal */
export class TemplateSpan extends Node<SyntaxKind.TemplateSpan, AstTemplateSpanData> implements ts.TemplateSpan {
    declare readonly ast: AstTemplateSpan;

    override get parent() { return super.parent as TemplateExpression; }
    override set parent(value) { super.parent = value; }

    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
    get literal() { return this.ast.data.literal?.node; }
    set literal(value) { this.ast.data.literal = value?.ast; }
}

/** @internal */
export class AstTemplateSpanData extends AstData {
    expression: AstExpression = undefined!;
    literal: AstTemplateMiddle | AstTemplateTail = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            propagateChildFlags(this.literal) |
            TransformFlags.ContainsES2015;
    }
}

/** @internal */
export class ParenthesizedExpression extends Node<SyntaxKind.ParenthesizedExpression, AstParenthesizedExpressionData> implements JSDocContainer, ts.ParenthesizedExpression {
    declare readonly ast: AstParenthesizedExpression;

    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
    declare _jsdocContainerBrand: any;

    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
}

/** @internal */
export class AstParenthesizedExpressionData extends AstData {
    expression: AstExpression = undefined!;
    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression);
    }
}

/** @internal */
export interface JSDocTypeAssertion extends ParenthesizedExpression {
    readonly ast: AstJSDocTypeAssertion;
    readonly _jsDocTypeAssertionBrand: never;
}

/** @internal */
export type AstJSDocTypeAssertion = AstNode<JSDocTypeAssertion>;

/** @internal */
export class ArrayLiteralExpression extends Node<SyntaxKind.ArrayLiteralExpression, AstArrayLiteralExpressionData> implements ts.ArrayLiteralExpression {
    declare readonly ast: AstArrayLiteralExpression;

    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;

    get elements(): NodeArray<Expression> { return this.ast.data.elements?.nodes!; } // TODO: remove '!'
    set elements(value: NodeArray<Expression>) { this.ast.data.elements = value?.ast; }
    get multiLine() { return this.ast.data.multiLine; }
    set multiLine(value) { this.ast.data.multiLine = value; }
}

/** @internal */
export class AstArrayLiteralExpressionData extends AstData {
    elements: AstNodeArray<AstExpression> | undefined = undefined;
    multiLine: boolean | undefined = undefined;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildrenFlags(this.elements);
    }
}

/** @internal */
export class SpreadElement extends Node<SyntaxKind.SpreadElement, AstSpreadElementData> implements ts.SpreadElement {
    declare readonly ast: AstSpreadElement;

    declare _expressionBrand: any;

    override get parent() { return super.parent as ArrayLiteralExpression | CallExpression | NewExpression; }
    override set parent(value) { super.parent = value; }

    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
}

/** @internal */
export class AstSpreadElementData extends AstData {
    expression: AstExpression = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            TransformFlags.ContainsES2015 |
            TransformFlags.ContainsRestOrSpread;
    }
}

/** @internal */
export interface ObjectLiteralElement extends Declaration {
    /** @internal */ readonly ast: AstObjectLiteralElement;
    _objectLiteralBrand: any;
}

/** @internal */
export type AstObjectLiteralElement = AstNode<ObjectLiteralElement>;

/** @internal */
export type ObjectLiteralElementLike =
    | PropertyAssignment
    | ShorthandPropertyAssignment
    | SpreadAssignment
    | MethodDeclaration
    | AccessorDeclaration
    ;

/** @internal */
export type AstObjectLiteralElementLike = AstNodeOneOf<ObjectLiteralElementLike>;

/** @internal */
export class ObjectLiteralExpression extends Node<SyntaxKind.ObjectLiteralExpression, AstObjectLiteralExpressionData> implements JSDocContainer, Declaration, ts.ObjectLiteralExpression {
    declare readonly ast: AstObjectLiteralExpression;

    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;

    get properties() { return this.ast.data.properties?.nodes!; } // TODO: remove '!'
    set properties(value) { this.ast.data.properties = value?.ast; }
    get multiLine() { return this.ast.data.multiLine; }
    set multiLine(value) { this.ast.data.multiLine = value; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstObjectLiteralExpressionData extends AstData {
    properties: AstNodeArray<AstObjectLiteralElementLike> | undefined = undefined;
    multiLine: boolean | undefined = undefined;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildrenFlags(this.properties);
    }
}

/** @internal */
export class PropertyAccessExpression extends Node<SyntaxKind.PropertyAccessExpression, AstPropertyAccessExpressionData> implements JSDocContainer, Declaration, FlowContainer, ts.PropertyAccessExpression {
    declare readonly ast: AstPropertyAccessExpression;

    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;
    declare _flowContainerBrand: any;

    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
    get questionDotToken() { return this.ast.data.questionDotToken?.node; }
    set questionDotToken(value) { this.ast.data.questionDotToken = value?.ast; }
    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
}

/** @internal */
export class AstPropertyAccessExpressionData extends AstData {
    expression: AstLeftHandSideExpression = undefined!;
    questionDotToken: AstToken<SyntaxKind.QuestionDotToken> | undefined = undefined;
    name: AstMemberName = undefined!;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(node: AstNode): TransformFlags {
        let transformFlags = propagateChildFlags(this.expression) |
            propagateChildFlags(this.questionDotToken) |
            (this.name.kind === SyntaxKind.Identifier ?
                propagateIdentifierNameFlags(this.name as AstIdentifier) :
                propagateChildFlags(this.name) | TransformFlags.ContainsPrivateIdentifierInExpression);
        if (node.flags & NodeFlags.OptionalChain) {
            transformFlags |= TransformFlags.ContainsES2020;;
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

/** @internal */
export interface PropertyAccessEntityNameExpression extends PropertyAccessExpression {
    _propertyAccessExpressionLikeQualifiedNameBrand?: any;
    readonly ast: AstPropertyAccessEntityNameExpression;
    readonly data: AstPropertyAccessEntityNameExpressionData;
    readonly expression: EntityNameExpression;
    readonly name: Identifier;
}

/** @internal */
export type AstPropertyAccessEntityNameExpression = AstNode<PropertyAccessEntityNameExpression>;

/** @internal */
export interface AstPropertyAccessEntityNameExpressionData extends AstPropertyAccessExpressionData {
    expression: AstEntityNameExpression;
    name: AstIdentifier;
}

/** @internal */
export type EntityNameExpression =
    | Identifier
    | PropertyAccessEntityNameExpression;

/** @internal */
export type AstEntityNameExpression = AstNodeOneOf<EntityNameExpression>;

/** @internal */
export interface PropertyAccessChain extends PropertyAccessExpression {
    _optionalChainBrand: any;
    readonly ast: AstPropertyAccessChain;
    readonly name: MemberName;
}

/** @internal */
export type AstPropertyAccessChain = AstNode<PropertyAccessChain>;

/** @internal */
export interface PropertyAccessChainRoot extends PropertyAccessChain {
    readonly questionDotToken: QuestionDotToken;
}

/** @internal */
export type AstPropertyAccessChainRoot = AstNode<PropertyAccessChainRoot>;

/** @internal */
export class ElementAccessExpression extends Node<SyntaxKind.ElementAccessExpression, AstElementAccessExpressionData> implements JSDocContainer, Declaration, FlowContainer, ts.ElementAccessExpression {
    declare readonly ast: AstElementAccessExpression;

    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;
    declare _flowContainerBrand: any;

    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
    get questionDotToken() { return this.ast.data.questionDotToken?.node; }
    set questionDotToken(value) { this.ast.data.questionDotToken = value?.ast; }
    get argumentExpression() { return this.ast.data.argumentExpression?.node; }
    set argumentExpression(value) { this.ast.data.argumentExpression = value?.ast; }

    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
}

/** @internal */
export class AstElementAccessExpressionData extends AstData {
    expression: AstLeftHandSideExpression = undefined!;
    questionDotToken: AstToken<SyntaxKind.QuestionDotToken> | undefined = undefined;
    argumentExpression: AstExpression = undefined!;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(node: AstNode): TransformFlags {
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

/** @internal */
export interface ElementAccessChain extends ElementAccessExpression {
    readonly ast: AstElementAccessChain;
    _optionalChainBrand: any;
}

/** @internal */
export type AstElementAccessChain = AstNode<ElementAccessChain>;

/** @internal */
export interface ElementAccessChainRoot extends ElementAccessChain {
    readonly questionDotToken: QuestionDotToken;
}

/** @internal */
export type AstElementAccessChainRoot = AstNode<ElementAccessChainRoot>;

/** @internal */
export class CallExpression extends Node<SyntaxKind.CallExpression, AstCallExpressionData> implements Declaration, ts.CallExpression {
    declare readonly ast: AstCallExpression;

    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
    declare _declarationBrand: any;

    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
    get questionDotToken() { return this.ast.data.questionDotToken?.node; }
    set questionDotToken(value) { this.ast.data.questionDotToken = value?.ast; }
    get typeArguments() { return this.ast.data.typeArguments?.nodes; }
    set typeArguments(value) { this.ast.data.typeArguments = value?.ast; }
    get arguments() { return this.ast.data.arguments?.nodes!; } // TODO: remove `!`
    set arguments(value) { this.ast.data.arguments = value?.ast; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstCallExpressionData extends AstData {
    expression: AstLeftHandSideExpression = undefined!;
    questionDotToken: AstQuestionDotToken | undefined = undefined;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined;
    arguments: AstNodeArray<AstExpression> | undefined = undefined;

    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(node: AstNode): TransformFlags {
        let transformFlags = propagateChildFlags(this.expression) |
            propagateChildFlags(this.questionDotToken) |
            propagateChildrenFlags(this.typeArguments) |
            propagateChildrenFlags(this.arguments);
        if (this.typeArguments) {
            transformFlags |= TransformFlags.ContainsTypeScript;
        }
        if ((this.expression.kind === SyntaxKind.PropertyAccessExpression ||
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

/** @internal */
export interface CallChain extends CallExpression {
    readonly ast: AstCallChain;
    _optionalChainBrand: any;
}

/** @internal */
export type AstCallChain = AstNode<CallChain>;

/** @internal */
export interface CallChainRoot extends CallChain {
    readonly questionDotToken: QuestionDotToken;
}

/** @internal */
export type AstCallChainRoot = AstNode<CallChainRoot>;

/** @internal */
export type OptionalChainRoot =
    | PropertyAccessChainRoot
    | ElementAccessChainRoot
    | CallChainRoot;

/** @internal */
export type AstOptionalChainRoot = AstNodeOneOf<OptionalChainRoot>;

/** @internal */
export class ExpressionWithTypeArguments extends Node<SyntaxKind.ExpressionWithTypeArguments, AstExpressionWithTypeArgumentsData> implements ts.ExpressionWithTypeArguments {
    declare readonly ast: AstExpressionWithTypeArguments;

    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
    declare _typeNodeBrand: any;

    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
    get typeArguments() { return this.ast.data.typeArguments?.nodes; }
    set typeArguments(value) { this.ast.data.typeArguments = value?.ast; }
}

/** @internal */
export class AstExpressionWithTypeArgumentsData extends AstData {
    expression: AstLeftHandSideExpression = undefined!;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            propagateChildrenFlags(this.typeArguments) |
            TransformFlags.ContainsES2015;
    }
}

/** @internal */
export class NewExpression extends Node<SyntaxKind.NewExpression, AstNewExpressionData> implements Declaration, ts.NewExpression {
    declare readonly ast: AstNewExpression;

    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
    declare _declarationBrand: any;

    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
    get typeArguments() { return this.ast.data.typeArguments?.nodes; }
    set typeArguments(value) { this.ast.data.typeArguments = value?.ast; }
    get arguments() { return this.ast.data.arguments?.nodes; }
    set arguments(value) { this.ast.data.arguments = value?.ast; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstNewExpressionData extends AstData {
    expression: AstLeftHandSideExpression = undefined!;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined;
    arguments: AstNodeArray<AstExpression> | undefined = undefined;

    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(_: AstNode): TransformFlags {
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

/** @internal */
export type TemplateLiteral =
    | TemplateExpression
    | NoSubstitutionTemplateLiteral
    ;

/** @internal */
export type AstTemplateLiteral = AstNodeOneOf<TemplateLiteral>;

/** @internal */
export class TaggedTemplateExpression extends Node<SyntaxKind.TaggedTemplateExpression, AstTaggedTemplateExpressionData> implements ts.TaggedTemplateExpression {
    declare readonly ast: AstTaggedTemplateExpression;

    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;

    get tag() { return this.ast.data.tag?.node; }
    set tag(value) { this.ast.data.tag = value?.ast; }
    get typeArguments() { return this.ast.data.typeArguments?.nodes; }
    set typeArguments(value) { this.ast.data.typeArguments = value?.ast; }
    get template() { return this.ast.data.template?.node; }
    set template(value) { this.ast.data.template = value?.ast; }
    get questionDotToken() { return this.ast.data.questionDotToken?.node; }
    set questionDotToken(value) { this.ast.data.questionDotToken = value?.ast; }
}

/** @internal */
export class AstTaggedTemplateExpressionData extends AstData {
    tag: AstLeftHandSideExpression = undefined!;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined;
    template: AstTemplateLiteral = undefined!;
    questionDotToken: AstToken<SyntaxKind.QuestionDotToken> | undefined = undefined;

    override computeTransformFlags(_: AstNode): TransformFlags {
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

/** @internal */
export class AsExpression extends Node<SyntaxKind.AsExpression, AstAsExpressionData> implements ts.AsExpression {
    declare readonly ast: AstAsExpression;

    declare _expressionBrand: any;

    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
}

/** @internal */
export class AstAsExpressionData extends AstData {
    expression: AstExpression = undefined!;
    type: AstTypeNode = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            propagateChildFlags(this.type) |
            TransformFlags.ContainsTypeScript;
    }
}

/** @internal */
export class TypeAssertion extends Node<SyntaxKind.TypeAssertionExpression, AstTypeAssertionData> implements ts.TypeAssertion {
    declare readonly ast: AstTypeAssertion;

    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;

    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
}

/** @internal */
export class AstTypeAssertionData extends AstData {
    type: AstTypeNode = undefined!;
    expression: AstUnaryExpression = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            propagateChildFlags(this.type) |
            TransformFlags.ContainsTypeScript;
    }
}

/** @internal */
export class SatisfiesExpression extends Node<SyntaxKind.SatisfiesExpression, AstSatisfiesExpressionData> implements ts.SatisfiesExpression {
    declare readonly ast: AstSatisfiesExpression;

    declare _expressionBrand: any;

    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
}

/** @internal */
export class AstSatisfiesExpressionData extends AstData {
    expression: AstExpression = undefined!;
    type: AstTypeNode = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            propagateChildFlags(this.type) |
            TransformFlags.ContainsTypeScript;
    }
}

/** @internal */
export class NonNullExpression extends Node<SyntaxKind.NonNullExpression, AstNonNullExpressionData> implements ts.NonNullExpression {
    declare readonly ast: AstNonNullExpression;

    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;

    get expression(): Expression { return this.ast.data.expression?.node; }
    set expression(value: Expression) { this.ast.data.expression = value?.ast; }
}

/** @internal */
export class AstNonNullExpressionData extends AstData {
    expression: AstExpression = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            TransformFlags.ContainsTypeScript;
    }
}

/** @internal */
export interface NonNullChain extends NonNullExpression {
    readonly ast: AstNonNullChain;
    _optionalChainBrand: any;
}

/** @internal */
export type AstNonNullChain = AstNode<NonNullChain>;

/** @internal */
export class MetaProperty extends Node<SyntaxKind.MetaProperty, AstMetaPropertyData> implements FlowContainer, ts.MetaProperty {
    declare readonly ast: AstMetaProperty;

    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
    declare _flowContainerBrand: any;

    get keywordToken(): SyntaxKind.ImportKeyword | SyntaxKind.NewKeyword { return this.ast.data.keywordToken; }
    set keywordToken(value: SyntaxKind.ImportKeyword | SyntaxKind.NewKeyword) { this.ast.data.keywordToken = value; }
    get name(): Identifier { return this.ast.data.name?.node; }
    set name(value: Identifier) { this.ast.data.name = value?.ast; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value) { this.ast.data.flowNode = value; }
}

/** @internal */
export class AstMetaPropertyData extends AstData {
    keywordToken: SyntaxKind.NewKeyword | SyntaxKind.ImportKeyword = undefined!;
    name: AstIdentifier = undefined!;

    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
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

/** @internal */
export class JsxElement extends Node<SyntaxKind.JsxElement, AstJsxElementData> implements ts.JsxElement {
    declare readonly ast: AstJsxElement;

    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;

    get openingElement(): JsxOpeningElement { return this.ast.data.openingElement?.node; }
    set openingElement(value: JsxOpeningElement) { this.ast.data.openingElement = value?.ast; }
    get children(): NodeArray<JsxChild> { return this.ast.data.children.nodes; }
    set children(value: NodeArray<JsxChild>) { this.ast.data.children = value?.ast; }
    get closingElement(): JsxClosingElement { return this.ast.data.closingElement?.node; }
    set closingElement(value: JsxClosingElement) { this.ast.data.closingElement = value?.ast; }
}

/** @internal */
export class AstJsxElementData extends AstData {
    openingElement: AstJsxOpeningElement = undefined!;
    children: AstNodeArray<AstJsxChild> = undefined!;
    closingElement: AstJsxClosingElement = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.openingElement) |
            propagateChildrenFlags(this.children) |
            propagateChildFlags(this.closingElement) |
            TransformFlags.ContainsJsx;
    }
}

/** @internal */
export type JsxOpeningLikeElement =
    | JsxSelfClosingElement
    | JsxOpeningElement
    ;

/** @internal */
export type AstJsxOpeningLikeElement = AstNodeOneOf<JsxOpeningLikeElement>;

/** @internal */
export type JsxAttributeLike =
    | JsxAttribute
    | JsxSpreadAttribute;

/** @internal */
export type AstJsxAttributeLike = AstNodeOneOf<JsxAttributeLike>;

/** @internal */
export type JsxAttributeName =
    | Identifier
    | JsxNamespacedName;

/** @internal */
export type AstJsxAttributeName = AstNodeOneOf<JsxAttributeName>;

/** @internal */
export type JsxTagNameExpression =
    | Identifier
    | ThisExpression
    | JsxTagNamePropertyAccess
    | JsxNamespacedName;

/** @internal */
export type AstJsxTagNameExpression = AstNodeOneOf<JsxTagNameExpression>;

/** @internal */
export interface JsxTagNamePropertyAccess extends PropertyAccessExpression {
    readonly ast: AstJsxTagNamePropertyAccess;
    readonly data: AstJsxTagNamePropertyAccessData;
    readonly expression: Identifier | ThisExpression | JsxTagNamePropertyAccess;
}

/** @internal */
export type AstJsxTagNamePropertyAccess = AstNode<JsxTagNamePropertyAccess>;

/** @internal */
export interface AstJsxTagNamePropertyAccessData extends AstPropertyAccessExpressionData {
    expression: AstIdentifier | AstThisExpression | AstJsxTagNamePropertyAccess;
}

/** @internal */
export class JsxAttributes extends Node<SyntaxKind.JsxAttributes, AstJsxAttributesData> implements Declaration, ts.JsxAttributes {
    declare readonly ast: AstJsxAttributes;

    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
    declare _declarationBrand: any;

    override get parent() { return super.parent as JsxOpeningLikeElement; }
    override set parent(value) { super.parent = value; }

    get properties() { return this.ast.data.properties.nodes; }
    set properties(value) { this.ast.data.properties = value?.ast; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstJsxAttributesData extends AstData {
    properties: AstNodeArray<AstJsxAttributeLike> = undefined!;

    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildrenFlags(this.properties) |
            TransformFlags.ContainsJsx;
    }
}

/** @internal */
export class JsxNamespacedName extends Node<SyntaxKind.JsxNamespacedName, AstJsxNamespacedNameData> implements ts.JsxNamespacedName {
    declare readonly ast: AstJsxNamespacedName;

    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get namespace() { return this.ast.data.namespace?.node; }
    set namespace(value) { this.ast.data.namespace = value?.ast; }
}

/** @internal */
export class AstJsxNamespacedNameData extends AstData {
    name: AstIdentifier = undefined!;
    namespace: AstIdentifier = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.namespace) |
            propagateChildFlags(this.name) |
            TransformFlags.ContainsJsx;
    }
}

/** @internal */
export class JsxOpeningElement extends Node<SyntaxKind.JsxOpeningElement, AstJsxOpeningElementData> implements ts.JsxOpeningElement {
    declare readonly ast: AstJsxOpeningElement;

    declare _expressionBrand: any;

    override get parent() { return super.parent as JsxElement; }
    override set parent(value) { super.parent = value; }

    get tagName() { return this.ast.data.tagName?.node; }
    set tagName(value) { this.ast.data.tagName = value.ast; }
    get typeArguments() { return this.ast.data.typeArguments?.nodes; }
    set typeArguments(value) { this.ast.data.typeArguments = value?.ast; }
    get attributes() { return this.ast.data.attributes?.node; }
    set attributes(value) { this.ast.data.attributes = value?.ast; }
}

/** @internal */
export class AstJsxOpeningElementData extends AstData {
    tagName: AstJsxTagNameExpression = undefined!;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined;
    attributes: AstJsxAttributes = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
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

/** @internal */
export class JsxClosingElement extends Node<SyntaxKind.JsxClosingElement, AstJsxClosingElementData> implements ts.JsxClosingElement {
    declare readonly ast: AstJsxClosingElement;

    override get parent() { return super.parent as JsxElement; }
    override set parent(value) { super.parent = value; }

    get tagName() { return this.ast.data.tagName?.node; }
    set tagName(value) { this.ast.data.tagName = value.ast; }
}

/** @internal */
export class AstJsxClosingElementData extends AstData {
    tagName: AstJsxTagNameExpression = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.tagName) |
            TransformFlags.ContainsJsx;
    }
}

/** @internal */
export class JsxSelfClosingElement extends Node<SyntaxKind.JsxSelfClosingElement, AstJsxSelfClosingElementData> implements ts.JsxSelfClosingElement {
    declare readonly ast: AstJsxSelfClosingElement;

    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;

    get tagName() { return this.ast.data.tagName?.node; }
    set tagName(value) { this.ast.data.tagName = value.ast; }
    get typeArguments() { return this.ast.data.typeArguments?.nodes; }
    set typeArguments(value) { this.ast.data.typeArguments = value?.ast; }
    get attributes() { return this.ast.data.attributes?.node; }
    set attributes(value) { this.ast.data.attributes = value?.ast; }
}

/** @internal */
export class AstJsxSelfClosingElementData extends AstData {
    tagName: AstJsxTagNameExpression = undefined!;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined;
    attributes: AstJsxAttributes = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
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

/** @internal */
export class JsxFragment extends Node<SyntaxKind.JsxFragment, AstJsxFragmentData> implements ts.JsxFragment {
    declare readonly ast: AstJsxFragment;

    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;

    get openingFragment(): JsxOpeningFragment { return this.ast.data.openingFragment?.node; }
    set openingFragment(value: JsxOpeningFragment) { this.ast.data.openingFragment = value?.ast; }
    get children(): NodeArray<JsxChild> { return this.ast.data.children.nodes; }
    set children(value: NodeArray<JsxChild>) { this.ast.data.children = value?.ast; }
    get closingFragment(): JsxClosingFragment { return this.ast.data.closingFragment?.node; }
    set closingFragment(value: JsxClosingFragment) { this.ast.data.closingFragment = value?.ast; }
}

/** @internal */
export class AstJsxFragmentData extends AstData {
    openingFragment: AstJsxOpeningFragment = undefined!;
    children: AstNodeArray<AstJsxChild> = undefined!;
    closingFragment: AstJsxClosingFragment = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.openingFragment) |
            propagateChildrenFlags(this.children) |
            propagateChildFlags(this.closingFragment) |
            TransformFlags.ContainsJsx;
    }
}

/** @internal */
export class JsxOpeningFragment extends Node<SyntaxKind.JsxOpeningFragment, AstJsxOpeningFragmentData> implements ts.JsxOpeningFragment {
    declare readonly ast: AstJsxOpeningFragment;

    declare _expressionBrand: any; // TODO: is this accurate?

    override get parent() { return super.parent as JsxFragment; }
    override set parent(value) { super.parent = value; }
}

/** @internal */
export class AstJsxOpeningFragmentData extends AstData {
    override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.ContainsJsx;
    }
}

/** @internal */
export class JsxClosingFragment extends Node<SyntaxKind.JsxClosingFragment, AstJsxClosingFragmentData> implements ts.JsxClosingFragment {
    declare readonly ast: AstJsxClosingFragment;

    declare _expressionBrand: any; // TODO: is this accurate?

    override get parent() { return super.parent as JsxFragment; }
    override set parent(value) { super.parent = value; }
}

/** @internal */
export class AstJsxClosingFragmentData extends AstData {
    override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.ContainsJsx;
    }
}

/** @internal */
export class JsxAttribute extends Node<SyntaxKind.JsxAttribute, AstJsxAttributeData> implements Declaration, ts.JsxAttribute {
    declare readonly ast: AstJsxAttribute;

    declare _declarationBrand: any;

    override get parent() { return super.parent as JsxAttributes; }
    override set parent(value) { super.parent = value; }

    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get initializer() { return this.ast.data.initializer?.node; }
    set initializer(value) { this.ast.data.initializer = value?.ast; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstJsxAttributeData extends AstData {
    name: AstJsxAttributeName = undefined!;
    initializer: AstJsxAttributeValue | undefined = undefined;

    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.name) |
            propagateChildFlags(this.initializer) |
            TransformFlags.ContainsJsx;
    }
}

/** @internal */
export type JsxAttributeValue =
    | StringLiteral
    | JsxExpression
    | JsxElement
    | JsxSelfClosingElement
    | JsxFragment;

/** @internal */
export type AstJsxAttributeValue = AstNodeOneOf<JsxAttributeValue>;

/** @internal */
export class JsxSpreadAttribute extends Node<SyntaxKind.JsxSpreadAttribute, AstJsxSpreadAttributeData> implements ts.JsxSpreadAttribute {
    declare readonly ast: AstJsxSpreadAttribute;

    declare _objectLiteralBrand: any;
    declare _declarationBrand: any;
    declare symbol: never;
    declare localSymbol: never;

    override get parent() { return super.parent as JsxAttributes; }
    override set parent(value) { super.parent = value; }

    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
}

/** @internal */
export class AstJsxSpreadAttributeData extends AstData {
    expression: AstExpression = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            TransformFlags.ContainsJsx;
    }
}

/** @internal */
export class JsxExpression extends Node<SyntaxKind.JsxExpression, AstJsxExpressionData> implements ts.JsxExpression {
    declare readonly ast: AstJsxExpression;

    declare _expressionBrand: any; // TODO: is this accurate?

    override get parent() { return super.parent as JsxElement | JsxFragment | JsxAttributeLike; }
    override set parent(value) { super.parent = value; }

    get dotDotDotToken() { return this.ast.data.dotDotDotToken?.node; }
    set dotDotDotToken(value) { this.ast.data.dotDotDotToken = value?.ast; }
    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
}

/** @internal */
export class AstJsxExpressionData extends AstData {
    dotDotDotToken: AstDotDotDotToken | undefined = undefined;
    expression: AstExpression | undefined = undefined;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.dotDotDotToken) |
            propagateChildFlags(this.expression) |
            TransformFlags.ContainsJsx;
    }
}

/** @internal */
export class JsxText extends Token<SyntaxKind.JsxText, AstJsxTextData> implements ts.JsxText {
    declare readonly ast: AstJsxText;

    override get parent() { return super.parent as JsxElement | JsxFragment; }
    override set parent(value) { super.parent = value; }

    get text() { return this.ast.data.text; }
    set text(value) { this.ast.data.text = value; }
    get isUnterminated() { return this.ast.data.isUnterminated; }
    set isUnterminated(value) { this.ast.data.isUnterminated = value; }
    get hasExtendedUnicodeEscape() { return this.ast.data.hasExtendedUnicodeEscape; }
    set hasExtendedUnicodeEscape(value) { this.ast.data.hasExtendedUnicodeEscape = value; }
    get containsOnlyTriviaWhiteSpaces() { return this.ast.data.containsOnlyTriviaWhiteSpaces; }
    set containsOnlyTriviaWhiteSpaces(value) { this.ast.data.containsOnlyTriviaWhiteSpaces = value; }
}

/** @internal */
export class AstJsxTextData extends AstData {
    text = "";
    isUnterminated: boolean | undefined = undefined;
    hasExtendedUnicodeEscape: boolean | undefined = undefined;
    containsOnlyTriviaWhiteSpaces: boolean = false;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.ContainsJsx;
    }
}

/** @internal */
export type JsxChild =
    | JsxText
    | JsxExpression
    | JsxElement
    | JsxSelfClosingElement
    | JsxFragment
    ;

/** @internal */
export type AstJsxChild = AstNodeOneOf<JsxChild>;


/** @internal */
export type IterationStatement =
    | DoStatement
    | WhileStatement
    | ForStatement
    | ForInOrOfStatement
    ;

/** @internal */
export type AstIterationStatement = AstNodeOneOf<IterationStatement>;

/** @internal */
export class EmptyStatement extends Node<SyntaxKind.EmptyStatement, AstEmptyStatementData> implements JSDocContainer, ts.EmptyStatement {
    declare readonly ast: AstEmptyStatement;

    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;

    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
}

/** @internal */
export class AstEmptyStatementData extends AstData {
    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.None;
    }
}

/** @internal */
export class DebuggerStatement extends Node<SyntaxKind.DebuggerStatement, AstDebuggerStatementData> implements JSDocContainer, FlowContainer, ts.DebuggerStatement {
    declare readonly ast: AstDebuggerStatement;

    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;
    declare _flowContainerBrand: any;

    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
}

/** @internal */
export class AstDebuggerStatementData extends AstData {
    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.None;
    }
}

/** @internal */
export class MissingDeclaration extends Node<SyntaxKind.MissingDeclaration, AstMissingDeclarationData> implements JSDocContainer, Declaration, ts.MissingDeclaration {
    declare readonly ast: AstMissingDeclaration;

    declare _declarationBrand: any;
    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;
    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;

    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstMissingDeclarationData extends AstData {
    name: AstIdentifier | undefined = undefined;
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.None;
    }
}

/** @internal */
export class Block extends Node<SyntaxKind.Block, AstBlockData> implements JSDocContainer, LocalsContainer, ts.Block {
    declare readonly ast: AstBlock;

    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;
    declare _localsContainerBrand: any;

    get statements() { return this.ast.data.statements?.nodes!; } // TODO: remove `!`
    set statements(value) { this.ast.data.statements = value?.ast; }
    get multiLine() { return this.ast.data.multiLine; }
    set multiLine(value) { this.ast.data.multiLine = value; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
}

/** @internal */
export class AstBlockData extends AstData {
    statements: AstNodeArray<AstStatement> | undefined = undefined;
    multiLine: boolean | undefined = undefined;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildrenFlags(this.statements);
    }
}

/** @internal */
export class VariableStatement extends Node<SyntaxKind.VariableStatement, AstVariableStatementData> implements JSDocContainer, FlowContainer, ts.VariableStatement {
    declare readonly ast: AstVariableStatement;

    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;
    declare _flowContainerBrand: any;

    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get declarationList() { return this.ast.data.declarationList?.node; }
    set declarationList(value) { this.ast.data.declarationList = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
}

/** @internal */
export class AstVariableStatementData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    declarationList: AstVariableDeclarationList = undefined!;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildrenFlags(this.modifiers) |
            propagateChildFlags(this.declarationList);
        if (modifiersToFlags(this.modifiers?.items) & ModifierFlags.Ambient) {
            transformFlags = TransformFlags.ContainsTypeScript;
        }
        return transformFlags;
    }
}

/** @internal */
export class ExpressionStatement extends Node<SyntaxKind.ExpressionStatement, AstExpressionStatementData> implements JSDocContainer, FlowContainer, ts.ExpressionStatement {
    declare readonly ast: AstExpressionStatement;

    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;
    declare _flowContainerBrand: any;

    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
}

/** @internal */
export class AstExpressionStatementData extends AstData {
    expression: AstExpression = undefined!;
    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression);
    }
}

/** @internal */
export interface PrologueDirective extends ExpressionStatement {
    readonly expression: StringLiteral;
}

/** @internal */
export class IfStatement extends Node<SyntaxKind.IfStatement, AstIfStatementData> implements JSDocContainer, FlowContainer, ts.IfStatement {
    declare readonly ast: AstIfStatement;

    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;
    declare _flowContainerBrand: any;

    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
    get thenStatement() { return this.ast.data.thenStatement?.node; }
    set thenStatement(value) { this.ast.data.thenStatement = value?.ast; }
    get elseStatement() { return this.ast.data.elseStatement?.node; }
    set elseStatement(value) { this.ast.data.elseStatement = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
}

/** @internal */
export class AstIfStatementData extends AstData {
    expression: AstExpression = undefined!;
    thenStatement: AstStatement = undefined!;
    elseStatement: AstStatement | undefined = undefined;
    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            propagateChildFlags(this.thenStatement) |
            propagateChildFlags(this.elseStatement);
    }
}

/** @internal */
export class DoStatement extends Node<SyntaxKind.DoStatement, AstDoStatementData> implements JSDocContainer, FlowContainer, ts.DoStatement {
    declare readonly ast: AstDoStatement;

    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;
    declare _flowContainerBrand: any;

    get statement() { return this.ast.data.statement?.node; }
    set statement(value) { this.ast.data.statement = value?.ast; }
    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
}

/** @internal */
export class AstDoStatementData extends AstData {
    statement: AstStatement = undefined!;
    expression: AstExpression = undefined!;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.statement) |
            propagateChildFlags(this.expression);
    }
}

/** @internal */
export class WhileStatement extends Node<SyntaxKind.WhileStatement, AstWhileStatementData> implements JSDocContainer, FlowContainer, ts.WhileStatement {
    declare readonly ast: AstWhileStatement;

    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;
    declare _flowContainerBrand: any;

    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
    get statement() { return this.ast.data.statement?.node; }
    set statement(value) { this.ast.data.statement = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
}

/** @internal */
export class AstWhileStatementData extends AstData {
    expression: AstExpression = undefined!;
    statement: AstStatement = undefined!;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            propagateChildFlags(this.statement);
    }
}

/** @internal */
export type ForInitializer =
    | VariableDeclarationList
    | Expression
    ;

/** @internal */
export type AstForInitializer = AstNodeOneOf<ForInitializer>;


/** @internal */
export class ForStatement extends Node<SyntaxKind.ForStatement, AstForStatementData> implements JSDocContainer, LocalsContainer, FlowContainer, ts.ForStatement {
    declare readonly ast: AstForStatement;

    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;
    declare _localsContainerBrand: any;
    declare _flowContainerBrand: any;

    get initializer() { return this.ast.data.initializer?.node; }
    set initializer(value) { this.ast.data.initializer = value?.ast; }
    get condition() { return this.ast.data.condition?.node; }
    set condition(value) { this.ast.data.condition = value?.ast; }
    get incrementor() { return this.ast.data.incrementor?.node; }
    set incrementor(value) { this.ast.data.incrementor = value?.ast; }
    get statement() { return this.ast.data.statement?.node; }
    set statement(value) { this.ast.data.statement = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
}

/** @internal */
export class AstForStatementData extends AstData {
    initializer: AstForInitializer | undefined = undefined;
    condition: AstExpression | undefined = undefined;
    incrementor: AstExpression | undefined = undefined;
    statement: AstStatement = undefined!;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.initializer) |
            propagateChildFlags(this.condition) |
            propagateChildFlags(this.incrementor) |
            propagateChildFlags(this.statement);
    }
}

/** @internal */
export type ForInOrOfStatement =
    | ForInStatement
    | ForOfStatement
    ;

/** @internal */
export type AstForInOrOfStatement = AstNodeOneOf<ForInOrOfStatement>;

/** @internal */
export class ForInStatement extends Node<SyntaxKind.ForInStatement, AstForInStatementData> implements JSDocContainer, LocalsContainer, FlowContainer, ts.ForInStatement {
    declare readonly ast: AstForInStatement;

    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;
    declare _localsContainerBrand: any;
    declare _flowContainerBrand: any;

    get initializer() { return this.ast.data.initializer?.node; }
    set initializer(value) { this.ast.data.initializer = value?.ast; }
    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
    get statement() { return this.ast.data.statement?.node; }
    set statement(value) { this.ast.data.statement = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
}

/** @internal */
export class AstForInStatementData extends AstData {
    initializer: AstForInitializer = undefined!;
    expression: AstExpression = undefined!;
    statement: AstStatement = undefined!;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.initializer) |
            propagateChildFlags(this.expression) |
            propagateChildFlags(this.statement);
    }
}

/** @internal */
export class ForOfStatement extends Node<SyntaxKind.ForOfStatement, AstForOfStatementData> implements JSDocContainer, LocalsContainer, FlowContainer, ts.ForOfStatement {
    declare readonly ast: AstForOfStatement;

    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;
    declare _localsContainerBrand: any;
    declare _flowContainerBrand: any;

    get awaitModifier() { return this.ast.data.awaitModifier?.node; }
    set awaitModifier(value) { this.ast.data.awaitModifier = value?.ast; }
    get initializer() { return this.ast.data.initializer?.node; }
    set initializer(value) { this.ast.data.initializer = value?.ast; }
    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
    get statement() { return this.ast.data.statement?.node; }
    set statement(value) { this.ast.data.statement = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
}

/** @internal */
export class AstForOfStatementData extends AstData {
    awaitModifier: AstToken<SyntaxKind.AwaitKeyword> | undefined = undefined;
    initializer: AstForInitializer = undefined!;
    expression: AstExpression = undefined!;
    statement: AstStatement = undefined!;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
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

/** @internal */
export class BreakStatement extends Node<SyntaxKind.BreakStatement, AstBreakStatementData> implements JSDocContainer, FlowContainer, ts.BreakStatement {
    declare readonly ast: AstBreakStatement;

    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;
    declare _flowContainerBrand: any;

    get label() { return this.ast.data.label?.node; }
    set label(value) { this.ast.data.label = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
}

/** @internal */
export class AstBreakStatementData extends AstData {
    label: AstIdentifier | undefined = undefined;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.label) |
            TransformFlags.ContainsHoistedDeclarationOrCompletion;
    }
}

/** @internal */
export class ContinueStatement extends Node<SyntaxKind.ContinueStatement, AstContinueStatementData> implements JSDocContainer, FlowContainer, ts.ContinueStatement {
    declare readonly ast: AstContinueStatement;

    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;
    declare _flowContainerBrand: any;

    get label() { return this.ast.data.label?.node; }
    set label(value) { this.ast.data.label = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
}

/** @internal */
export type BreakOrContinueStatement =
    | BreakStatement
    | ContinueStatement;

/** @internal */
export type AstBreakOrContinueStatement = AstNodeOneOf<BreakOrContinueStatement>;

/** @internal */
export class AstContinueStatementData extends AstData {
    label: AstIdentifier | undefined = undefined;
    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.label) |
            TransformFlags.ContainsHoistedDeclarationOrCompletion;
    }
}

/** @internal */
export class ReturnStatement extends Node<SyntaxKind.ReturnStatement, AstReturnStatementData> implements JSDocContainer, FlowContainer, ts.ReturnStatement {
    declare readonly ast: AstReturnStatement;

    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;
    declare _flowContainerBrand: any;

    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
}

/** @internal */
export class AstReturnStatementData extends AstData {
    expression: AstExpression | undefined = undefined;
    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
        // return in an ES2018 async generator must be awaited
        return propagateChildFlags(this.expression) |
            TransformFlags.ContainsES2018 |
            TransformFlags.ContainsHoistedDeclarationOrCompletion;
    }
}

/** @internal */
export class WithStatement extends Node<SyntaxKind.WithStatement, AstWithStatementData> implements JSDocContainer, FlowContainer, ts.WithStatement {
    declare readonly ast: AstWithStatement;

    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;
    declare _flowContainerBrand: any;

    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
    get statement() { return this.ast.data.statement?.node; }
    set statement(value) { this.ast.data.statement = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
}

/** @internal */
export class AstWithStatementData extends AstData {
    expression: AstExpression = undefined!;
    statement: AstStatement = undefined!;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            propagateChildFlags(this.statement);
    }
}

/** @internal */
export class SwitchStatement extends Node<SyntaxKind.SwitchStatement, AstSwitchStatementData> implements JSDocContainer, FlowContainer, ts.SwitchStatement {
    declare readonly ast: AstSwitchStatement;

    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;
    declare _flowContainerBrand: any;

    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
    get caseBlock() { return this.ast.data.caseBlock?.node; }
    set caseBlock(value) { this.ast.data.caseBlock = value?.ast; }
    get possiblyExhaustive() { return this.ast.data.possiblyExhaustive; }
    set possiblyExhaustive(value) { this.ast.data.possiblyExhaustive = value; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
}

/** @internal */
export class AstSwitchStatementData extends AstData {
    expression: AstExpression = undefined!;
    caseBlock: AstCaseBlock = undefined!;
    possiblyExhaustive: boolean = false;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            propagateChildFlags(this.caseBlock);
    }
}

/** @internal */
export class CaseBlock extends Node<SyntaxKind.CaseBlock, AstCaseBlockData> implements LocalsContainer, ts.CaseBlock {
    declare readonly ast: AstCaseBlock;

    declare _localsContainerBrand: any;

    override get parent() { return super.parent as SwitchStatement; }
    override set parent(value) { super.parent = value; }

    get clauses() { return this.ast.data.clauses?.nodes!; } // TODO: remove '!'
    set clauses(value) { this.ast.data.clauses = value?.ast; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
}

/** @internal */
export class AstCaseBlockData extends AstData {
    clauses: AstNodeArray<AstCaseOrDefaultClause> | undefined = undefined;

    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildrenFlags(this.clauses);
    }
}

/** @internal */
export class CaseClause extends Node<SyntaxKind.CaseClause, AstCaseClauseData> implements JSDocContainer, ts.CaseClause {
    declare readonly ast: AstCaseClause;

    declare _jsdocContainerBrand: any;

    override get parent() { return super.parent as CaseBlock; }
    override set parent(value) { super.parent = value; }

    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
    get statements() { return this.ast.data.statements?.nodes!; } // TODO: remove `!`
    set statements(value) { this.ast.data.statements = value?.ast; }
    get fallthroughFlowNode() { return this.ast.data.fallthroughFlowNode; }
    set fallthroughFlowNode(value) { this.ast.data.fallthroughFlowNode = value; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
}

/** @internal */
export class AstCaseClauseData extends AstData {
    expression: AstExpression = undefined!;
    statements: AstNodeArray<AstStatement> | undefined = undefined;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    fallthroughFlowNode?: FlowNode | undefined;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            propagateChildrenFlags(this.statements);
    }
}

/** @internal */
export class DefaultClause extends Node<SyntaxKind.DefaultClause, AstDefaultClauseData> implements ts.DefaultClause {
    declare readonly ast: AstDefaultClause;

    override get parent() { return super.parent as CaseBlock; }
    override set parent(value) { super.parent = value; }

    get statements() { return this.ast.data.statements?.nodes!; } // TODO: remove `!`
    set statements(value) { this.ast.data.statements = value?.ast; }
    get fallthroughFlowNode() { return this.ast.data.fallthroughFlowNode; }
    set fallthroughFlowNode(value) { this.ast.data.fallthroughFlowNode = value; }
}

/** @internal */
export class AstDefaultClauseData extends AstData {
    statements: AstNodeArray<AstStatement> | undefined = undefined;

    fallthroughFlowNode?: FlowNode | undefined = undefined;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildrenFlags(this.statements);
    }
}

/** @internal */
export type CaseOrDefaultClause =
    | CaseClause
    | DefaultClause
    ;

/** @internal */
export type AstCaseOrDefaultClause = AstNodeOneOf<CaseOrDefaultClause>;

/** @internal */
export class LabeledStatement extends Node<SyntaxKind.LabeledStatement, AstLabeledStatementData> implements JSDocContainer, FlowContainer, ts.LabeledStatement {
    declare readonly ast: AstLabeledStatement;

    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;
    declare _flowContainerBrand: any;

    get label() { return this.ast.data.label?.node; }
    set label(value) { this.ast.data.label = value?.ast; }
    get statement() { return this.ast.data.statement?.node; }
    set statement(value) { this.ast.data.statement = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
}

/** @internal */
export class AstLabeledStatementData extends AstData {
    label: AstIdentifier = undefined!;
    statement: AstStatement = undefined!;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.label) |
            propagateChildFlags(this.statement);
    }
}

/** @internal */
export class ThrowStatement extends Node<SyntaxKind.ThrowStatement, AstThrowStatementData> implements JSDocContainer, FlowContainer, ts.ThrowStatement {
    declare readonly ast: AstThrowStatement;

    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;
    declare _flowContainerBrand: any;

    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
}

/** @internal */
export class AstThrowStatementData extends AstData {
    expression: AstExpression = undefined!;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression);
    }
}

/** @internal */
export class TryStatement extends Node<SyntaxKind.TryStatement, AstTryStatementData> implements JSDocContainer, FlowContainer, ts.TryStatement {
    declare readonly ast: AstTryStatement;

    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;
    declare _flowContainerBrand: any;

    get tryBlock() { return this.ast.data.tryBlock?.node; }
    set tryBlock(value) { this.ast.data.tryBlock = value?.ast; }
    get catchClause() { return this.ast.data.catchClause?.node; }
    set catchClause(value) { this.ast.data.catchClause = value?.ast; }
    get finallyBlock() { return this.ast.data.finallyBlock?.node; }
    set finallyBlock(value) { this.ast.data.finallyBlock = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get flowNode(): FlowNode | undefined { return this.ast.data.flowNode; }
    set flowNode(value: FlowNode | undefined) { this.ast.data.flowNode = value; }
}

/** @internal */
export class AstTryStatementData extends AstData {
    tryBlock: AstBlock = undefined!;
    catchClause: AstCatchClause | undefined = undefined;
    finallyBlock: AstBlock | undefined = undefined;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    flowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.tryBlock) |
            propagateChildFlags(this.catchClause) |
            propagateChildFlags(this.finallyBlock);
    }
}

/** @internal */
export class CatchClause extends Node<SyntaxKind.CatchClause, AstCatchClauseData> implements LocalsContainer, ts.CatchClause {
    declare readonly ast: AstCatchClause;

    declare _localsContainerBrand: any;

    override get parent() { return super.parent as TryStatement; }
    override set parent(value) { super.parent = value; }

    get variableDeclaration() { return this.ast.data.variableDeclaration?.node; }
    set variableDeclaration(value) { this.ast.data.variableDeclaration = value?.ast; }
    get block() { return this.ast.data.block?.node; }
    set block(value) { this.ast.data.block = value?.ast; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
}

/** @internal */
export class AstCatchClauseData extends AstData {
    variableDeclaration: AstVariableDeclaration | undefined = undefined;
    block: AstBlock = undefined!;

    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.variableDeclaration) |
            propagateChildFlags(this.block) |
            (!this.variableDeclaration ? TransformFlags.ContainsES2019 : TransformFlags.None);
    }
}

/** @internal */
export type ObjectTypeDeclaration =
    | ClassLikeDeclaration
    | InterfaceDeclaration
    | TypeLiteralNode;

/** @internal */
export type AstObjectTypeDeclaration = AstNodeOneOf<ObjectTypeDeclaration>;

/** @internal */
export type DeclarationWithTypeParameterChildren =
    | SignatureDeclaration
    | ClassLikeDeclaration
    | InterfaceDeclaration
    | TypeAliasDeclaration
    | JSDocTemplateTag;

/** @internal */
export type AstDeclarationWithTypeParameterChildren = AstNodeOneOf<DeclarationWithTypeParameterChildren>;

/** @internal */
export type ClassElement =
    | PropertyDeclaration
    | MethodDeclaration
    | ConstructorDeclaration
    | SemicolonClassElement
    | AccessorDeclaration
    | IndexSignatureDeclaration
    | ClassStaticBlockDeclaration
    ;

/** @internal */
export type AstClassElement = AstNodeOneOf<ClassElement>;

/** @internal */
export type ClassLikeDeclaration =
    | ClassDeclaration
    | ClassExpression;

/** @internal */
export type AstClassLikeDeclaration = AstNodeOneOf<ClassLikeDeclaration>;

/** @internal */
export class ClassDeclaration extends Node<SyntaxKind.ClassDeclaration, AstClassDeclarationData> implements JSDocContainer, Declaration, ts.ClassDeclaration {
    declare readonly ast: AstClassDeclaration;

    declare _declarationBrand: any;
    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;

    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get typeParameters() { return this.ast.data.typeParameters?.nodes; }
    set typeParameters(value) { this.ast.data.typeParameters = value?.ast; }
    get heritageClauses() { return this.ast.data.heritageClauses?.nodes; }
    set heritageClauses(value) { this.ast.data.heritageClauses = value?.ast; }
    get members(): NodeArray<ClassElement> { return this.ast.data.members?.nodes!; } // TODO: remove `!`
    set members(value: NodeArray<ClassElement>) { this.ast.data.members = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstClassDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    name: AstIdentifier | undefined = undefined;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    heritageClauses: AstNodeArray<AstHeritageClause> | undefined = undefined;
    members: AstNodeArray<AstClassElement> | undefined = undefined;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(_: AstNode): TransformFlags {
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

/** @internal */
export class ClassExpression extends Node<SyntaxKind.ClassExpression, AstClassExpressionData> implements JSDocContainer, Declaration, ts.ClassExpression {
    declare readonly ast: AstClassExpression;

    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;
    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;

    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get typeParameters() { return this.ast.data.typeParameters?.nodes; }
    set typeParameters(value) { this.ast.data.typeParameters = value?.ast; }
    get heritageClauses() { return this.ast.data.heritageClauses?.nodes; }
    set heritageClauses(value) { this.ast.data.heritageClauses = value?.ast; }
    get members() { return this.ast.data.members?.nodes!; } // TODO: remove `!`
    set members(value) { this.ast.data.members = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstClassExpressionData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    name: AstIdentifier | undefined = undefined;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    heritageClauses: AstNodeArray<AstHeritageClause> | undefined = undefined;
    members: AstNodeArray<AstClassElement> | undefined = undefined;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildrenFlags(this.modifiers) |
            propagateNameFlags(this.name) |
            propagateChildrenFlags(this.typeParameters) |
            propagateChildrenFlags(this.heritageClauses) |
            propagateChildrenFlags(this.members) |
            (this.typeParameters ? TransformFlags.ContainsTypeScript : TransformFlags.None) |
            TransformFlags.ContainsES2015;
    }
}

/** @internal */
export interface TypeElement extends Declaration {
    readonly ast: AstTypeElement;
    _typeElementBrand: any;
}

/** @internal */
export type AstTypeElement = AstNode<TypeElement>;

// type TypeElement =
//     | CallSignatureDeclaration
//     | ConstructSignatureDeclaration
//     | MethodSignature
//     | IndexSignatureDeclaration
//     | PropertySignature
//     | AccessorDeclaration
//     ;

/** @internal */
export class InterfaceDeclaration extends Node<SyntaxKind.InterfaceDeclaration, AstInterfaceDeclarationData> implements JSDocContainer, Declaration, ts.InterfaceDeclaration {
    declare readonly ast: AstInterfaceDeclaration;

    declare _declarationBrand: any;
    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;

    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get typeParameters() { return this.ast.data.typeParameters?.nodes; }
    set typeParameters(value) { this.ast.data.typeParameters = value?.ast; }
    get heritageClauses() { return this.ast.data.heritageClauses?.nodes; }
    set heritageClauses(value) { this.ast.data.heritageClauses = value?.ast; }
    get members() { return this.ast.data.members?.nodes!; } // TODO: remove '!'
    set members(value) { this.ast.data.members = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstInterfaceDeclarationData extends AstTypeScriptNodeData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    name: AstIdentifier = undefined!;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    heritageClauses: AstNodeArray<AstHeritageClause> | undefined = undefined;
    members: AstNodeArray<AstTypeElement> | undefined = undefined;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
}

/** @internal */
export class HeritageClause extends Node<SyntaxKind.HeritageClause, AstHeritageClauseData> implements ts.HeritageClause {
    declare readonly ast: AstHeritageClause;

    override get parent() { return super.parent as InterfaceDeclaration | ClassLikeDeclaration; }
    override set parent(value) { super.parent = value; }

    get token() { return this.ast.data.token; }
    set token(value) { this.ast.data.token = value; }
    get types() { return this.ast.data.types?.nodes!; } // TODO: remove '!'
    set types(value) { this.ast.data.types = value?.ast; }
}

/** @internal */
export class AstHeritageClauseData extends AstData {
    token: SyntaxKind.ExtendsKeyword | SyntaxKind.ImplementsKeyword = undefined!;
    types: AstNodeArray<AstExpressionWithTypeArguments> | undefined = undefined;

    override computeTransformFlags(_: AstNode): TransformFlags {
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

/** @internal */
export class TypeAliasDeclaration extends Node<SyntaxKind.TypeAliasDeclaration, AstTypeAliasDeclarationData> implements JSDocContainer, Declaration, LocalsContainer, ts.TypeAliasDeclaration {
    declare readonly ast: AstTypeAliasDeclaration;

    declare _declarationBrand: any;
    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;
    declare _localsContainerBrand: any;

    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get typeParameters() { return this.ast.data.typeParameters?.nodes; }
    set typeParameters(value) { this.ast.data.typeParameters = value?.ast; }
    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
}

/** @internal */
export class AstTypeAliasDeclarationData extends AstTypeScriptNodeData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    name: AstIdentifier = undefined!;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    type: AstTypeNode = undefined!;
    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)

    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;
}

/** @internal */
export class EnumDeclaration extends Node<SyntaxKind.EnumDeclaration, AstEnumDeclarationData> implements JSDocContainer, Declaration, ts.EnumDeclaration {
    declare readonly ast: AstEnumDeclaration;

    declare _declarationBrand: any;
    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;

    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get members() { return this.ast.data.members?.nodes!; } // TODO: remove '!'
    set members(value) { this.ast.data.members = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstEnumDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    name: AstIdentifier = undefined!;
    members: AstNodeArray<AstEnumMember> | undefined = undefined;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildrenFlags(this.modifiers) |
            propagateChildFlags(this.name) |
            propagateChildrenFlags(this.members) |
            TransformFlags.ContainsTypeScript;
        transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // Enum declarations cannot contain `await`
        return transformFlags;
    }
}

/** @internal */
export class EnumMember extends Node<SyntaxKind.EnumMember, AstEnumMemberData> implements JSDocContainer, Declaration, ts.EnumMember {
    declare readonly ast: AstEnumMember;

    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;

    override get parent() { return super.parent as EnumDeclaration; }
    override set parent(value) { super.parent = value; }

    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get initializer() { return this.ast.data.initializer?.node; }
    set initializer(value) { this.ast.data.initializer = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstEnumMemberData extends AstData {
    name: AstPropertyName = undefined!;
    initializer: AstExpression | undefined = undefined;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.name) |
            propagateChildFlags(this.initializer) |
            TransformFlags.ContainsTypeScript;
    }
}

/** @internal */
export type ModuleName =
    | Identifier
    | StringLiteral
    ;

/** @internal */
export type AstModuleName = AstNodeOneOf<ModuleName>;

/** @internal */
export type ModuleBody =
    | NamespaceBody
    | JSDocNamespaceBody
    ;

/** @internal */
export type AstModuleBody = AstNodeOneOf<ModuleBody>;

/** @internal */
export class ModuleDeclaration extends Node<SyntaxKind.ModuleDeclaration, AstModuleDeclarationData> implements JSDocContainer, Declaration, LocalsContainer, ts.ModuleDeclaration {
    declare readonly ast: AstModuleDeclaration;

    declare _declarationBrand: any;
    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;
    declare _localsContainerBrand: any;

    override get parent() { return super.parent as ModuleBlock | SourceFile; }
    override set parent(value) { super.parent = value; }

    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get body() { return this.ast.data.body?.node; }
    set body(value) { this.ast.data.body = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
}

/** @internal */
export class AstModuleDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    name: AstModuleName = undefined!;
    body: AstModuleBody | AstJSDocNamespaceDeclaration | undefined = undefined;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;

    override computeTransformFlags(_: AstNode): TransformFlags {
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

/** @internal */
export type NamespaceBody =
    | ModuleBlock
    | NamespaceDeclaration
    ;

/** @internal */
export type AstNamespaceBody = AstNodeOneOf<NamespaceBody>;

/** @internal */
export interface NamespaceDeclaration extends ModuleDeclaration {
    readonly ast: AstNamespaceDeclaration;
    readonly data: AstNamespaceDeclarationData;
    readonly name: Identifier;
    readonly body: NamespaceBody;
}

/** @internal */
export type AstNamespaceDeclaration = AstNode<NamespaceDeclaration>;

/** @internal */
export interface AstNamespaceDeclarationData extends AstModuleDeclarationData {
    name: AstIdentifier;
    body: AstNamespaceBody;
}

/** @internal */
export type JSDocNamespaceBody =
    | Identifier
    | JSDocNamespaceDeclaration
    ;

/** @internal */
export type AstJSDocNamespaceBody = AstNodeOneOf<JSDocNamespaceBody>;

/** @internal */
export interface JSDocNamespaceDeclaration extends ModuleDeclaration {
    readonly ast: AstJSDocNamespaceDeclaration;
    readonly data: AstJSDocNamespaceDeclarationData;
    readonly name: Identifier;
    readonly body: JSDocNamespaceBody | undefined;
}

/** @internal */
export type AstJSDocNamespaceDeclaration = AstNode<JSDocNamespaceDeclaration>;

/** @internal */
export interface AstJSDocNamespaceDeclarationData extends AstModuleDeclarationData {
    name: AstIdentifier;
    body: AstJSDocNamespaceBody | undefined;
}

/** @internal */
export class ModuleBlock extends Node<SyntaxKind.ModuleBlock, AstModuleBlockData> implements JSDocContainer, ts.ModuleBlock {
    declare readonly ast: AstModuleBlock;

    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;

    override get parent() { return super.parent as ModuleDeclaration; }
    override set parent(value) { super.parent = value; }

    get statements() { return this.ast.data.statements?.nodes!; } // TODO: remove `!`
    set statements(value) { this.ast.data.statements = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
}

/** @internal */
export class AstModuleBlockData extends AstData {
    statements: AstNodeArray<AstStatement> | undefined = undefined;
    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildrenFlags(this.statements);
    }
}

/** @internal */
export type ModuleReference =
    | EntityName
    | ExternalModuleReference
    ;

/** @internal */
export type AstModuleReference = AstNodeOneOf<ModuleReference>;

/** @internal */
export class ImportEqualsDeclaration extends Node<SyntaxKind.ImportEqualsDeclaration, AstImportEqualsDeclarationData> implements JSDocContainer, Declaration, ts.ImportEqualsDeclaration {
    declare readonly ast: AstImportEqualsDeclaration;

    declare _declarationBrand: any;
    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;

    override get parent() { return super.parent as ModuleBlock | SourceFile; }
    override set parent(value) { super.parent = value; }

    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get isTypeOnly() { return this.ast.data.isTypeOnly; }
    set isTypeOnly(value) { this.ast.data.isTypeOnly = value; }
    get moduleReference() { return this.ast.data.moduleReference?.node; }
    set moduleReference(value) { this.ast.data.moduleReference = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstImportEqualsDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    name: AstIdentifier = undefined!;
    isTypeOnly: boolean = undefined!;
    moduleReference: AstModuleReference = undefined!;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildrenFlags(this.modifiers) |
            propagateIdentifierNameFlags(this.name) |
            propagateChildFlags(this.moduleReference);

        if (this.moduleReference.kind !== SyntaxKind.ExternalModuleReference) {
            transformFlags |= TransformFlags.ContainsTypeScript;
        }

        return transformFlags & ~TransformFlags.ContainsPossibleTopLevelAwait; // Import= declaration is always parsed in an Await context
    }
}

/** @internal */
export class ExternalModuleReference extends Node<SyntaxKind.ExternalModuleReference, AstExternalModuleReferenceData> implements ts.ExternalModuleReference {
    declare readonly ast: AstExternalModuleReference;

    override get parent() { return super.parent as ImportEqualsDeclaration; }
    override set parent(value) { super.parent = value; }

    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
}

/** @internal */
export class AstExternalModuleReferenceData extends AstData {
    expression: AstExpression = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
        // always parsed in an Await context
        return propagateChildFlags(this.expression) & ~TransformFlags.ContainsPossibleTopLevelAwait;
    }
}

/** @internal */
export class ImportDeclaration extends Node<SyntaxKind.ImportDeclaration, AstImportDeclarationData> implements JSDocContainer, Declaration, ts.ImportDeclaration {
    declare readonly ast: AstImportDeclaration;

    declare _declarationBrand: any;
    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;

    override get parent() { return super.parent as ModuleBlock | SourceFile; }
    override set parent(value) { super.parent = value; }

    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get importClause() { return this.ast.data.importClause?.node; }
    set importClause(value) { this.ast.data.importClause = value?.ast; }
    get moduleSpecifier() { return this.ast.data.moduleSpecifier?.node; }
    set moduleSpecifier(value) { this.ast.data.moduleSpecifier = value?.ast; }
    get attributes() { return this.ast.data.attributes?.node; }
    set attributes(value) { this.ast.data.attributes = value?.ast; }
    /** @deprecated */
    get assertClause() { return this.ast.data.attributes?.node; }
    set assertClause(value) { this.ast.data.attributes = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstImportDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    importClause: AstImportClause | undefined = undefined;
    moduleSpecifier: AstExpression = undefined!;
    attributes: AstImportAttributes | undefined = undefined;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildFlags(this.importClause) |
            propagateChildFlags(this.moduleSpecifier);
        transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return transformFlags;
    }
}

/** @internal */
export type NamedImportBindings =
    | NamespaceImport
    | NamedImports
    ;

/** @internal */
export type AstNamedImportBindings = AstNodeOneOf<NamedImportBindings>;

/** @internal */
export type NamedExportBindings =
    | NamespaceExport
    | NamedExports
    ;

/** @internal */
export type AstNamedExportBindings = AstNodeOneOf<NamedExportBindings>;

/** @internal */
export class ImportClause extends Node<SyntaxKind.ImportClause, AstImportClauseData> implements Declaration, ts.ImportClause {
    declare readonly ast: AstImportClause;

    declare _declarationBrand: any;

    override get parent() { return super.parent as ImportDeclaration | JSDocImportTag; }
    override set parent(value) { super.parent = value; }

    get isTypeOnly() { return this.ast.data.isTypeOnly; }
    set isTypeOnly(value) { this.ast.data.isTypeOnly = value; }
    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get namedBindings() { return this.ast.data.namedBindings?.node; }
    set namedBindings(value) { this.ast.data.namedBindings = value?.ast; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstImportClauseData extends AstData {
    isTypeOnly: boolean = false;
    name: AstIdentifier | undefined = undefined;
    namedBindings: AstNamedImportBindings | undefined = undefined;

    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildFlags(this.name) |
            propagateChildFlags(this.namedBindings);
        if (this.isTypeOnly) {
            transformFlags |= TransformFlags.ContainsTypeScript;
        }
        transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return transformFlags;
    }
}

/** @internal */
export type AssertionKey =
    | Identifier
    | StringLiteral
    ;

/** @internal */
export type AstAssertionKey = AstNodeOneOf<AssertionKey>;

/**
 * @deprecated
 * @internal
 */
export type AssertEntry = ImportAttribute;

/**
 * @deprecated
 * @internal
 */
export type AstAssertEntry = AstImportAttribute;

/** @internal */
export type ImportAttributeName =
    | Identifier
    | StringLiteral;

/** @internal */
export type AstImportAttributeName = AstNodeOneOf<ImportAttributeName>;

/** @internal */
export class ImportAttribute extends Node<SyntaxKind.ImportAttribute, AstImportAttributeData> implements ts.ImportAttribute {
    declare readonly ast: AstImportAttribute;

    override get parent() { return super.parent as ImportAttributes; }
    override set parent(value) { super.parent = value; }

    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get value() { return this.ast.data.value?.node; }
    set value(value) { this.ast.data.value = value?.ast; }
}

/** @internal */
export class AstImportAttributeData extends AstData {
    name: AstImportAttributeName = undefined!;
    value: AstExpression = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.ContainsESNext;
    }
}

/**
 * @deprecated
 * @internal
 */
export type AssertClause = ImportAttributes;

/**
 * @deprecated
 * @internal
 */
export type AstAssertClause = AstNode<AssertClause>;

/** @internal */
export class ImportAttributes extends Node<SyntaxKind.ImportAttributes, AstImportAttributesData> implements ts.ImportAttributes {
    declare readonly ast: AstImportAttributes;

    override get parent() { return super.parent as ImportDeclaration | ExportDeclaration; }
    override set parent(value) { super.parent = value; }

    get token() { return this.ast.data.token; }
    set token(value) { this.ast.data.token = value; }
    get elements() { return this.ast.data.elements?.nodes!; } // TODO: remove `!`
    set elements(value) { this.ast.data.elements = value?.ast; }
    get multiLine() { return this.ast.data.multiLine; }
    set multiLine(value) { this.ast.data.multiLine = value; }
}

/** @internal */
export class AstImportAttributesData extends AstData {
    token: SyntaxKind.WithKeyword | SyntaxKind.AssertKeyword = undefined!;
    elements: AstNodeArray<AstImportAttribute> | undefined = undefined;
    multiLine: boolean | undefined = undefined;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.ContainsESNext;
    }
}

/** @internal */
export class NamespaceImport extends Node<SyntaxKind.NamespaceImport, AstNamespaceImportData> implements Declaration, ts.NamespaceImport {
    declare readonly ast: AstNamespaceImport;

    declare _declarationBrand: any;

    override get parent() { return super.parent as ImportClause; }
    override set parent(value) { super.parent = value; }

    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstNamespaceImportData extends AstData {
    name: AstIdentifier = undefined!;
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildFlags(this.name);
        transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return transformFlags;
    }
}

/** @internal */
export class NamespaceExport extends Node<SyntaxKind.NamespaceExport, AstNamespaceExportData> implements Declaration, ts.NamespaceExport {
    declare readonly ast: AstNamespaceExport;

    declare _declarationBrand: any;

    override get parent() { return super.parent as ExportDeclaration; }
    override set parent(value) { super.parent = value; }

    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstNamespaceExportData extends AstData {
    name: AstModuleExportName = undefined!;

    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildFlags(this.name) |
            TransformFlags.ContainsES2020;
        transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return transformFlags;
    }
}

/** @internal */
export class NamespaceExportDeclaration extends Node<SyntaxKind.NamespaceExportDeclaration, AstNamespaceExportDeclarationData> implements JSDocContainer, Declaration, ts.NamespaceExportDeclaration {
    declare readonly ast: AstNamespaceExportDeclaration;

    declare _declarationBrand: any;
    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;

    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstNamespaceExportDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined; // initialized by parser (grammar error)
    name: AstIdentifier = undefined!;
    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateIdentifierNameFlags(this.name) |
            TransformFlags.ContainsTypeScript;
    }
}

/** @internal */
export class ExportDeclaration extends Node<SyntaxKind.ExportDeclaration, AstExportDeclarationData> implements JSDocContainer, Declaration, ts.ExportDeclaration {
    declare readonly ast: AstExportDeclaration;

    declare _declarationBrand: any;
    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;

    override get parent() { return super.parent as SourceFile | ModuleBlock; }
    override set parent(value) { super.parent = value; }

    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get isTypeOnly() { return this.ast.data.isTypeOnly; }
    set isTypeOnly(value) { this.ast.data.isTypeOnly = value; }
    get exportClause() { return this.ast.data.exportClause?.node; }
    set exportClause(value) { this.ast.data.exportClause = value?.ast; }
    get moduleSpecifier() { return this.ast.data.moduleSpecifier?.node; }
    set moduleSpecifier(value) { this.ast.data.moduleSpecifier = value?.ast; }
    get attributes() { return this.ast.data.attributes?.node; }
    set attributes(value) { this.ast.data.attributes = value?.ast; }
    /** @deprecated */
    get assertClause() { return this.ast.data.attributes?.node; }
    set assertClause(value) { this.ast.data.attributes = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstExportDeclarationData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    isTypeOnly = false;
    exportClause: AstNamedExportBindings | undefined = undefined;
    moduleSpecifier: AstExpression | undefined = undefined;
    attributes: AstImportAttributes | undefined = undefined;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildrenFlags(this.modifiers) |
            propagateChildFlags(this.exportClause) |
            propagateChildFlags(this.moduleSpecifier);
        transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return transformFlags;
    }
}

/** @internal */
export class NamedImports extends Node<SyntaxKind.NamedImports, AstNamedImportsData> implements ts.NamedImports {
    declare readonly ast: AstNamedImports;

    override get parent() { return super.parent as ImportClause; }
    override set parent(value) { super.parent = value; }

    get elements() { return this.ast.data.elements.nodes; }
    set elements(value) { this.ast.data.elements = value?.ast; }
}

/** @internal */
export class AstNamedImportsData extends AstData {
    elements: AstNodeArray<AstImportSpecifier> = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildrenFlags(this.elements);
        transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return transformFlags;
    }
}

/** @internal */
export class NamedExports extends Node<SyntaxKind.NamedExports, AstNamedExportsData> implements ts.NamedExports {
    declare readonly ast: AstNamedExports;

    override get parent() { return super.parent as ExportDeclaration; }
    override set parent(value) { super.parent = value; }

    get elements() { return this.ast.data.elements?.nodes!; } // TODO: remove '!'
    set elements(value) { this.ast.data.elements = value?.ast; }
}

/** @internal */
export class AstNamedExportsData extends AstData {
    elements: AstNodeArray<AstExportSpecifier> | undefined = undefined;

    override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildrenFlags(this.elements);
        transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return transformFlags;
    }
}

/** @internal */
export class ImportSpecifier extends Node<SyntaxKind.ImportSpecifier, AstImportSpecifierData> implements Declaration, ts.ImportSpecifier {
    declare readonly ast: AstImportSpecifier;

    declare _declarationBrand: any;

    override get parent() { return super.parent as NamedImports; }
    override set parent(value) { super.parent = value; }

    get propertyName() { return this.ast.data.propertyName?.node; }
    set propertyName(value) { this.ast.data.propertyName = value?.ast; }
    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get isTypeOnly() { return this.ast.data.isTypeOnly; }
    set isTypeOnly(value) { this.ast.data.isTypeOnly = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstImportSpecifierData extends AstData {
    propertyName: AstModuleExportName | undefined = undefined;
    name: AstIdentifier = undefined!;
    isTypeOnly = false;

    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildFlags(this.propertyName) |
            propagateChildFlags(this.name);
        transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return transformFlags;
    }
}

/** @internal */
export class ExportSpecifier extends Node<SyntaxKind.ExportSpecifier, AstExportSpecifierData> implements Declaration, JSDocContainer, ts.ExportSpecifier {
    declare readonly ast: AstExportSpecifier;

    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;

    override get parent() { return super.parent as NamedExports; }
    override set parent(value) { super.parent = value; }

    get isTypeOnly() { return this.ast.data.isTypeOnly; }
    set isTypeOnly(value) { this.ast.data.isTypeOnly = value; }
    get propertyName() { return this.ast.data.propertyName?.node; }
    set propertyName(value) { this.ast.data.propertyName = value?.ast; }
    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }

    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstExportSpecifierData extends AstData {
    isTypeOnly = false;
    propertyName: AstModuleExportName | undefined = undefined;
    name: AstModuleExportName = undefined!;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildFlags(this.propertyName) |
            propagateChildFlags(this.name);
        transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return transformFlags;
    }
}

/** @internal */
export type ModuleExportName =
    | Identifier
    | StringLiteral;

/** @internal */
export type AstModuleExportName = AstNodeOneOf<ModuleExportName>;

/** @internal */
export class ExportAssignment extends Node<SyntaxKind.ExportAssignment, AstExportAssignmentData> implements JSDocContainer, Declaration, ts.ExportAssignment {
    declare readonly ast: AstExportAssignment;

    declare _declarationBrand: any;
    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;
    declare name: never;

    override get parent() { return super.parent as SourceFile; }
    override set parent(value) { super.parent = value; }

    get modifiers() { return this.ast.data.modifiers?.nodes; }
    set modifiers(value) { this.ast.data.modifiers = value?.ast; }
    get isExportEquals() { return this.ast.data.isExportEquals; }
    set isExportEquals(value) { this.ast.data.isExportEquals = value; }
    get expression() { return this.ast.data.expression?.node; }
    set expression(value) { this.ast.data.expression = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstExportAssignmentData extends AstData {
    modifiers: AstNodeArray<AstModifierLike> | undefined = undefined;
    isExportEquals: boolean | undefined = undefined;
    expression: AstExpression = undefined!;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)

    override computeTransformFlags(_: AstNode): TransformFlags {
        let transformFlags = propagateChildrenFlags(this.modifiers) | propagateChildFlags(this.expression);
        transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return transformFlags;
    }
}

/** @internal */
export class JSDocTypeExpression extends Node<SyntaxKind.JSDocTypeExpression, AstJSDocTypeExpressionData> implements ts.JSDocTypeExpression {
    declare readonly ast: AstJSDocTypeExpression;

    declare _typeNodeBrand: any;

    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
}

/** @internal */
export class AstJSDocTypeExpressionData extends AstData {
    type: AstTypeNode = undefined!;
}

/** @internal */
export class JSDocNameReference extends Node<SyntaxKind.JSDocNameReference, AstJSDocNameReferenceData> implements ts.JSDocNameReference {
    declare readonly ast: AstJSDocNameReference;

    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
}

/** @internal */
export class AstJSDocNameReferenceData extends AstData {
    name: AstEntityName | AstJSDocMemberName = undefined!;
}

/** @internal */
export class JSDocMemberName extends Node<SyntaxKind.JSDocMemberName, AstJSDocMemberNameData> implements ts.JSDocMemberName {
    declare readonly ast: AstJSDocMemberName;

    get left() { return this.ast.data.left?.node; }
    set left(value) { this.ast.data.left = value?.ast; }
    get right() { return this.ast.data.right?.node; }
    set right(value) { this.ast.data.right = value?.ast; }
}

/** @internal */
export class AstJSDocMemberNameData extends AstData {
    left: AstEntityName | AstJSDocMemberName = undefined!;
    right: AstIdentifier = undefined!;
}

/** @internal */
export type JSDocType =
    | JSDocAllType
    | JSDocUnknownType
    | JSDocNonNullableType
    | JSDocNullableType
    | JSDocOptionalType
    | JSDocFunctionType
    | JSDocVariadicType
    | JSDocNamepathType;

/** @internal */
export type AstJSDocType = AstNodeOneOf<JSDocType>;

/** @internal */
export class JSDocAllType extends Node<SyntaxKind.JSDocAllType, AstJSDocAllTypeData> implements ts.JSDocAllType {
    declare readonly ast: AstJSDocAllType;

    declare _jsDocTypeBrand: any;
    declare _typeNodeBrand: any;
}

/** @internal */
export class AstJSDocAllTypeData extends AstData {
}

/** @internal */
export class JSDocUnknownType extends Node<SyntaxKind.JSDocUnknownType, AstJSDocUnknownTypeData> implements ts.JSDocUnknownType {
    declare readonly ast: AstJSDocUnknownType;

    declare _jsDocTypeBrand: any;
    declare _typeNodeBrand: any;
}

/** @internal */
export class AstJSDocUnknownTypeData extends AstData {
}

/** @internal */
export class JSDocNonNullableType extends Node<SyntaxKind.JSDocNonNullableType, AstJSDocNonNullableTypeData> implements ts.JSDocNonNullableType {
    declare readonly ast: AstJSDocNonNullableType;

    declare _jsDocTypeBrand: any;
    declare _typeNodeBrand: any;

    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
    get postfix() { return this.ast.data.postfix; }
    set postfix(value) { this.ast.data.postfix = value; }
}

/** @internal */
export class AstJSDocNonNullableTypeData extends AstData {
    type: AstTypeNode = undefined!;
    postfix = false;
}

/** @internal */
export class JSDocNullableType extends Node<SyntaxKind.JSDocNullableType, AstJSDocNullableTypeData> implements ts.JSDocNullableType {
    declare readonly ast: AstJSDocNullableType;

    declare _jsDocTypeBrand: any;
    declare _typeNodeBrand: any;

    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
    get postfix() { return this.ast.data.postfix; }
    set postfix(value) { this.ast.data.postfix = value; }
}

/** @internal */
export class AstJSDocNullableTypeData extends AstData {
    type: AstTypeNode = undefined!;
    postfix = false;
}

/** @internal */
export class JSDocOptionalType extends Node<SyntaxKind.JSDocOptionalType, AstJSDocOptionalTypeData> implements ts.JSDocOptionalType {
    declare readonly ast: AstJSDocOptionalType;

    declare _jsDocTypeBrand: any;
    declare _typeNodeBrand: any;

    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
}

/** @internal */
export class AstJSDocOptionalTypeData extends AstData {
    type: AstTypeNode = undefined!;
}

/** @internal */
export class JSDocFunctionType extends Node<SyntaxKind.JSDocFunctionType, AstJSDocFunctionTypeData> implements Declaration, LocalsContainer, ts.JSDocFunctionType {
    declare readonly ast: AstJSDocFunctionType;

    declare _jsDocTypeBrand: any;
    declare _typeNodeBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;
    declare _localsContainerBrand: any;
    declare name: never;

    get typeParameters() { return this.ast.data.typeParameters?.nodes; }
    set typeParameters(value) { this.ast.data.typeParameters = value?.ast; }
    get parameters() { return this.ast.data.parameters?.nodes!; } // TODO: remove `!`
    set parameters(value) { this.ast.data.parameters = value?.ast; }
    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
    get typeArguments() { return this.ast.data.typeArguments?.nodes; }
    set typeArguments(value) { this.ast.data.typeArguments = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
}

/** @internal */
export class AstJSDocFunctionTypeData extends AstData {
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
    parameters: AstNodeArray<AstParameterDeclaration> | undefined = undefined;
    type: AstTypeNode | undefined = undefined;
    typeArguments: AstNodeArray<AstTypeNode> | undefined = undefined; // quick info
    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;
}

/** @internal */
export class JSDocVariadicType extends Node<SyntaxKind.JSDocVariadicType, AstJSDocVariadicTypeData> implements ts.JSDocVariadicType {
    declare readonly ast: AstJSDocVariadicType;

    declare _jsDocTypeBrand: any;
    declare _typeNodeBrand: any;

    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
}

/** @internal */
export class AstJSDocVariadicTypeData extends AstData {
    type: AstTypeNode = undefined!;
}

/** @internal */
export class JSDocNamepathType extends Node<SyntaxKind.JSDocNamepathType, AstJSDocNamepathTypeData> implements ts.JSDocNamepathType {
    declare readonly ast: AstJSDocNamepathType;

    declare _jsDocTypeBrand: any;
    declare _typeNodeBrand: any;

    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
}

/** @internal */
export class AstJSDocNamepathTypeData extends AstData {
    type: AstTypeNode = undefined!;
}

/** @internal */
export class JSDocNode extends Node<SyntaxKind.JSDoc, AstJSDocNodeData> implements ts.JSDoc {
    declare readonly ast: AstJSDocNode;

    override get parent() { return super.parent as HasJSDoc; }
    override set parent(value) { super.parent = value; }

    get tags() { return this.ast.data.tags?.nodes; }
    set tags(value) { this.ast.data.tags = value?.ast; }
    get comment() {
        const comment = this.ast.data.comment;
        return typeof comment === "string" ? comment : comment?.nodes;
    }
    set comment(value) { this.ast.data.comment = typeof value === "string" ? value : value?.ast; }
}

/** @internal */
export class AstJSDocNodeData extends AstData {
    comment: string | AstNodeArray<AstJSDocComment> | undefined = undefined;
    tags: AstNodeArray<AstBaseJSDocTag> | undefined = undefined;
}

/** @internal */
export type HasJSDoc =
    | AccessorDeclaration
    | ArrowFunction
    | BinaryExpression
    | Block
    | BreakStatement
    | CallSignatureDeclaration
    | CaseClause
    | ClassLikeDeclaration
    | ClassStaticBlockDeclaration
    | ConstructorDeclaration
    | ConstructorTypeNode
    | ConstructSignatureDeclaration
    | ContinueStatement
    | DebuggerStatement
    | DoStatement
    | ElementAccessExpression
    | EmptyStatement
    | EndOfFileToken
    | EnumDeclaration
    | EnumMember
    | ExportAssignment
    | ExportDeclaration
    | ExportSpecifier
    | ExpressionStatement
    | ForInStatement
    | ForOfStatement
    | ForStatement
    | FunctionDeclaration
    | FunctionExpression
    | FunctionTypeNode
    | Identifier
    | IfStatement
    | ImportDeclaration
    | ImportEqualsDeclaration
    | IndexSignatureDeclaration
    | InterfaceDeclaration
    | JSDocFunctionType
    | JSDocSignature
    | LabeledStatement
    | MethodDeclaration
    | MethodSignature
    | ModuleDeclaration
    | NamedTupleMember
    | NamespaceExportDeclaration
    | ObjectLiteralExpression
    | ParameterDeclaration
    | ParenthesizedExpression
    | PropertyAccessExpression
    | PropertyAssignment
    | PropertyDeclaration
    | PropertySignature
    | ReturnStatement
    | SemicolonClassElement
    | ShorthandPropertyAssignment
    | SpreadAssignment
    | SwitchStatement
    | ThrowStatement
    | TryStatement
    | TypeAliasDeclaration
    | TypeParameterDeclaration
    | VariableDeclaration
    | VariableStatement
    | WhileStatement
    | WithStatement;

/** @internal */
export type AstHasJSDoc = AstNodeOneOf<HasJSDoc>;

/** @internal */
export type JSDocTag =
    | JSDocUnknownTag
    | JSDocAugmentsTag
    | JSDocImplementsTag
    | JSDocAuthorTag
    | JSDocDeprecatedTag
    | JSDocClassTag
    | JSDocPublicTag
    | JSDocPrivateTag
    | JSDocProtectedTag
    | JSDocReadonlyTag
    | JSDocOverrideTag
    | JSDocEnumTag
    | JSDocThisTag
    | JSDocTemplateTag
    | JSDocSeeTag
    | JSDocReturnTag
    | JSDocTypeTag
    | JSDocTypedefTag
    | JSDocCallbackTag
    | JSDocOverloadTag
    | JSDocThrowsTag
    | JSDocPropertyTag
    | JSDocParameterTag
    | JSDocSatisfiesTag
    | JSDocImportTag
    ;

/** @internal */
export type AstJSDocTag = AstNodeOneOf<JSDocTag>;

/** @internal */
export class JSDocLink extends Node<SyntaxKind.JSDocLink, AstJSDocLinkData> implements ts.JSDocLink {
    declare readonly ast: AstJSDocLink;

    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get text() { return this.ast.data.text; }
    set text(value) { this.ast.data.text = value; }
}

/** @internal */
export class AstJSDocLinkData extends AstData {
    name: AstEntityName | AstJSDocMemberName | undefined = undefined;
    text = "";
}

/** @internal */
export class JSDocLinkCode extends Node<SyntaxKind.JSDocLinkCode, AstJSDocLinkCodeData> implements ts.JSDocLinkCode {
    declare readonly ast: AstJSDocLinkCode;

    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get text() { return this.ast.data.text; }
    set text(value) { this.ast.data.text = value; }
}

/** @internal */
export class AstJSDocLinkCodeData extends AstData {
    name: AstEntityName | AstJSDocMemberName | undefined = undefined;
    text = "";
}

/** @internal */
export class JSDocLinkPlain extends Node<SyntaxKind.JSDocLinkPlain, AstJSDocLinkPlainData> implements ts.JSDocLinkPlain {
    declare readonly ast: AstJSDocLinkPlain;

    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get text() { return this.ast.data.text; }
    set text(value) { this.ast.data.text = value; }
}

/** @internal */
export class AstJSDocLinkPlainData extends AstData {
    name: AstEntityName | AstJSDocMemberName | undefined = undefined;
    text = "";
}

/** @internal */
export type JSDocComment =
    | JSDocText
    | JSDocLink
    | JSDocLinkCode
    | JSDocLinkPlain
    ;

/** @internal */
export type AstJSDocComment = AstNodeOneOf<JSDocComment>;

/** @internal */
export class JSDocText extends Node<SyntaxKind.JSDocText, AstJSDocTextData> implements ts.JSDocText {
    declare readonly ast: AstJSDocText;

    get text() { return this.ast.data.text; }
    set text(value) { this.ast.data.text = value; }
}

/** @internal */
export class AstJSDocTextData extends AstData {
    text = "";
}

/** @internal */
export class BaseJSDocTag<TKind extends SyntaxKind = SyntaxKind, T extends AstJSDocTagData = AstJSDocTagData> extends Node<TKind, T> implements ts.JSDocTag {
    declare readonly ast: AstBaseJSDocTag<TKind, T>;

    override get parent() { return super.parent as JSDocNode | JSDocTypeLiteral; }
    override set parent(value) { super.parent = value; }

    get tagName() { return this.ast.data.tagName?.node; }
    set tagName(value) { this.ast.data.tagName = value?.ast; }
    get comment() {
        const comment = this.ast.data.comment;
        return typeof comment === "string" ? comment : comment?.nodes;
    }
    set comment(value) { this.ast.data.comment = typeof value === "string" ? value : value?.ast; }
}

/** @internal */
export type AstBaseJSDocTag<TKind extends SyntaxKind = SyntaxKind, T extends AstJSDocTagData = AstJSDocTagData> = AstNode<BaseJSDocTag<TKind, T>>;

/** @internal */
export class AstJSDocTagData extends AstData {
    tagName: AstIdentifier = undefined!;
    comment: string | AstNodeArray<AstJSDocComment> | undefined = undefined;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return TransformFlags.None;
    }
}

/** @internal */
export class JSDocUnknownTag extends BaseJSDocTag<SyntaxKind.JSDocTag, AstJSDocUnknownTagData> implements ts.JSDocUnknownTag {
    declare readonly ast: AstJSDocUnknownTag;
}

/** @internal */
export class AstJSDocUnknownTagData extends AstJSDocTagData {
}

/** @internal */
export interface JSDocClassReference extends ExpressionWithTypeArguments {
    readonly ast: AstJSDocClassReference;
    readonly data: AstJSDocClassReferenceData;
    readonly expression: Identifier | PropertyAccessEntityNameExpression;
}

/** @internal */
export type AstJSDocClassReference = AstNode<JSDocClassReference>;

/** @internal */
export interface AstJSDocClassReferenceData extends AstExpressionWithTypeArgumentsData {
    expression: AstIdentifier | AstPropertyAccessEntityNameExpression;
}

/** @internal */
export class JSDocAugmentsTag extends BaseJSDocTag<SyntaxKind.JSDocAugmentsTag, AstJSDocAugmentsTagData> implements ts.JSDocAugmentsTag {
    declare readonly ast: AstJSDocAugmentsTag;
    get class() { return this.ast.data.class.node; }
    set class(value) { this.ast.data.class = value.ast; }
}

/** @internal */
export class AstJSDocAugmentsTagData extends AstJSDocTagData {
    class: AstJSDocClassReference = undefined!;
}

/** @internal */
export class JSDocImplementsTag extends BaseJSDocTag<SyntaxKind.JSDocImplementsTag, AstJSDocImplementsTagData> implements ts.JSDocImplementsTag {
    declare readonly ast: AstJSDocImplementsTag;
    get class() { return this.ast.data.class.node; }
    set class(value) { this.ast.data.class = value.ast; }
}

/** @internal */
export class AstJSDocImplementsTagData extends AstJSDocTagData {
    class: AstJSDocClassReference = undefined!;
}

/** @internal */
export class JSDocAuthorTag extends BaseJSDocTag<SyntaxKind.JSDocAuthorTag, AstJSDocAuthorTagData> implements ts.JSDocAuthorTag {
    declare readonly ast: AstJSDocAuthorTag;
}

/** @internal */
export class AstJSDocAuthorTagData extends AstJSDocTagData {
}

/** @internal */
export class JSDocDeprecatedTag extends BaseJSDocTag<SyntaxKind.JSDocDeprecatedTag, AstJSDocDeprecatedTagData> implements ts.JSDocDeprecatedTag {
    declare readonly ast: AstJSDocDeprecatedTag;
}

/** @internal */
export class AstJSDocDeprecatedTagData extends AstJSDocTagData {
}

/** @internal */
export class JSDocClassTag extends BaseJSDocTag<SyntaxKind.JSDocClassTag, AstJSDocClassTagData> implements ts.JSDocClassTag {
    declare readonly ast: AstJSDocClassTag;
}

/** @internal */
export class AstJSDocClassTagData extends AstJSDocTagData {
}

/** @internal */
export class JSDocPublicTag extends BaseJSDocTag<SyntaxKind.JSDocPublicTag, AstJSDocPublicTagData> implements ts.JSDocPublicTag {
    declare readonly ast: AstJSDocPublicTag;
}

/** @internal */
export class AstJSDocPublicTagData extends AstJSDocTagData {
}

/** @internal */
export class JSDocPrivateTag extends BaseJSDocTag<SyntaxKind.JSDocPrivateTag, AstJSDocPrivateTagData> implements ts.JSDocPrivateTag {
    declare readonly ast: AstJSDocPrivateTag;
}

/** @internal */
export class AstJSDocPrivateTagData extends AstJSDocTagData {
}

/** @internal */
export class JSDocProtectedTag extends BaseJSDocTag<SyntaxKind.JSDocProtectedTag, AstJSDocProtectedTagData> implements ts.JSDocProtectedTag {
    declare readonly ast: AstJSDocProtectedTag;
}

/** @internal */
export class AstJSDocProtectedTagData extends AstJSDocTagData {
}

/** @internal */
export class JSDocReadonlyTag extends BaseJSDocTag<SyntaxKind.JSDocReadonlyTag, AstJSDocReadonlyTagData> implements ts.JSDocReadonlyTag {
    declare readonly ast: AstJSDocReadonlyTag;
}

/** @internal */
export class AstJSDocReadonlyTagData extends AstJSDocTagData {
}

/** @internal */
export class JSDocOverrideTag extends BaseJSDocTag<SyntaxKind.JSDocOverrideTag, AstJSDocOverrideTagData> implements ts.JSDocOverrideTag {
    declare readonly ast: AstJSDocOverrideTag;
}

/** @internal */
export class AstJSDocOverrideTagData extends AstJSDocTagData {
}

/** @internal */
export class JSDocEnumTag extends BaseJSDocTag<SyntaxKind.JSDocEnumTag, AstJSDocEnumTagData> implements Declaration, LocalsContainer, ts.JSDocEnumTag {
    declare readonly ast: AstJSDocEnumTag;
    declare _declarationBrand: any;
    declare _localsContainerBrand: any;

    override get parent() { return super.parent as JSDocNode; }
    override set parent(value) { super.parent = value; }

    get typeExpression() { return this.ast.data.typeExpression?.node; }
    set typeExpression(value) { this.ast.data.typeExpression = value?.ast; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
}

/** @internal */
export class AstJSDocEnumTagData extends AstJSDocTagData {
    typeExpression: AstJSDocTypeExpression = undefined!;

    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;
}

/** @internal */
export class JSDocThisTag extends BaseJSDocTag<SyntaxKind.JSDocThisTag, AstJSDocThisTagData> implements ts.JSDocThisTag {
    declare readonly ast: AstJSDocThisTag;
    get typeExpression() { return this.ast.data.typeExpression?.node; }
    set typeExpression(value) { this.ast.data.typeExpression = value?.ast; }
}

/** @internal */
export class AstJSDocThisTagData extends AstJSDocTagData {
    typeExpression: AstJSDocTypeExpression = undefined!;
}

/** @internal */
export class JSDocTemplateTag extends BaseJSDocTag<SyntaxKind.JSDocTemplateTag, AstJSDocTemplateTagData> implements ts.JSDocTemplateTag {
    declare readonly ast: AstJSDocTemplateTag;
    get constraint() { return this.ast.data.constraint?.node; }
    set constraint(value) { this.ast.data.constraint = value?.ast; }
    get typeParameters() { return this.ast.data.typeParameters?.nodes!; } // TODO: remove `!`
    set typeParameters(value) { this.ast.data.typeParameters = value?.ast; }
}

/** @internal */
export class AstJSDocTemplateTagData extends AstJSDocTagData {
    constraint: AstJSDocTypeExpression | undefined = undefined;
    typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined = undefined;
}

/** @internal */
export class JSDocSeeTag extends BaseJSDocTag<SyntaxKind.JSDocSeeTag, AstJSDocSeeTagData> implements ts.JSDocSeeTag {
    declare readonly ast: AstJSDocSeeTag;
    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
}

/** @internal */
export class AstJSDocSeeTagData extends AstJSDocTagData {
    name: AstJSDocNameReference | undefined = undefined;
}

/** @internal */
export class JSDocReturnTag extends BaseJSDocTag<SyntaxKind.JSDocReturnTag, AstJSDocReturnTagData> implements ts.JSDocReturnTag {
    declare readonly ast: AstJSDocReturnTag;
    get typeExpression() { return this.ast.data.typeExpression?.node; }
    set typeExpression(value) { this.ast.data.typeExpression = value?.ast; }
}

/** @internal */
export class AstJSDocReturnTagData extends AstJSDocTagData {
    typeExpression: AstJSDocTypeExpression | undefined = undefined;
}

/** @internal */
export class JSDocTypeTag extends BaseJSDocTag<SyntaxKind.JSDocTypeTag, AstJSDocTypeTagData> implements ts.JSDocTypeTag {
    declare readonly ast: AstJSDocTypeTag;
    get typeExpression() { return this.ast.data.typeExpression?.node; }
    set typeExpression(value) { this.ast.data.typeExpression = value?.ast; }
}

/** @internal */
export class AstJSDocTypeTagData extends AstJSDocTagData {
    typeExpression: AstJSDocTypeExpression = undefined!;
}

/** @internal */
export class JSDocTypedefTag extends BaseJSDocTag<SyntaxKind.JSDocTypedefTag, AstJSDocTypedefTagData> implements Declaration, LocalsContainer, ts.JSDocTypedefTag {
    declare readonly ast: AstJSDocTypedefTag;
    declare _declarationBrand: any;
    declare _localsContainerBrand: any;

    override get parent() { return super.parent as JSDocNode; }
    override set parent(value) { super.parent = value; }

    get fullName() { return this.ast.data.fullName?.node; }
    set fullName(value) { this.ast.data.fullName = value?.ast; }
    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get typeExpression() { return this.ast.data.typeExpression?.node; }
    set typeExpression(value) { this.ast.data.typeExpression = value?.ast; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
}

/** @internal */
export class AstJSDocTypedefTagData extends AstJSDocTagData {
    typeExpression: AstJSDocTypeExpression | AstJSDocTypeLiteral | undefined = undefined;
    fullName: AstJSDocNamespaceDeclaration | AstIdentifier | undefined = undefined;
    name: AstIdentifier | undefined = undefined;

    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;
}

/** @internal */
export class JSDocCallbackTag extends BaseJSDocTag<SyntaxKind.JSDocCallbackTag, AstJSDocCallbackTagData> implements Declaration, LocalsContainer, ts.JSDocCallbackTag {
    declare readonly ast: AstJSDocCallbackTag;
    declare _declarationBrand: any;
    declare _localsContainerBrand: any;

    override get parent() { return super.parent as JSDocNode; }
    override set parent(value) { super.parent = value; }

    get fullName() { return this.ast.data.fullName?.node; }
    set fullName(value) { this.ast.data.fullName = value?.ast; }
    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get typeExpression() { return this.ast.data.typeExpression?.node; }
    set typeExpression(value) { this.ast.data.typeExpression = value?.ast; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
}

/** @internal */
export class AstJSDocCallbackTagData extends AstJSDocTagData {
    fullName: AstJSDocNamespaceDeclaration | AstIdentifier | undefined = undefined;
    name: AstIdentifier | undefined = undefined;
    typeExpression: AstJSDocSignature = undefined!;

    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;
}

/** @internal */
export class JSDocOverloadTag extends BaseJSDocTag<SyntaxKind.JSDocOverloadTag, AstJSDocOverloadTagData> implements ts.JSDocOverloadTag {
    declare readonly ast: AstJSDocOverloadTag;

    override get parent() { return super.parent as JSDocNode; }
    override set parent(value) { super.parent = value; }

    get typeExpression() { return this.ast.data.typeExpression?.node; }
    set typeExpression(value) { this.ast.data.typeExpression = value?.ast; }
}

/** @internal */
export class AstJSDocOverloadTagData extends AstJSDocTagData {
    typeExpression: AstJSDocSignature = undefined!;
}

/** @internal */
export class JSDocThrowsTag extends BaseJSDocTag<SyntaxKind.JSDocThrowsTag, AstJSDocThrowsTagData> implements ts.JSDocThrowsTag {
    declare readonly ast: AstJSDocThrowsTag;
    get typeExpression() { return this.ast.data.typeExpression?.node; }
    set typeExpression(value) { this.ast.data.typeExpression = value?.ast; }
}

/** @internal */
export class AstJSDocThrowsTagData extends AstJSDocTagData {
    typeExpression: AstJSDocTypeExpression | undefined = undefined;
}

/** @internal */
export class JSDocSignature extends Node<SyntaxKind.JSDocSignature, AstJSDocSignatureData> implements Declaration, LocalsContainer, ts.JSDocSignature {
    declare readonly ast: AstJSDocSignature;

    declare _jsDocTypeBrand: any;
    declare _typeNodeBrand: any;
    declare _declarationBrand: any;
    declare _jsdocContainerBrand: any;
    declare _localsContainerBrand: any;

    get typeParameters() { return this.ast.data.typeParameters?.nodes; }
    set typeParameters(value) { this.ast.data.typeParameters = value?.ast; }
    get parameters() { return this.ast.data.parameters.nodes; }
    set parameters(value) { this.ast.data.parameters = value?.ast; }
    get type() { return this.ast.data.type?.node; }
    set type(value) { this.ast.data.type = value?.ast; }
    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value) { this.ast.data.jsDoc = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }
}

/** @internal */
export class AstJSDocSignatureData extends AstData {
    typeParameters: AstNodeArray<AstJSDocTemplateTag> | undefined = undefined;
    parameters: AstNodeArray<AstJSDocParameterTag> = undefined!;
    type: AstJSDocReturnTag | undefined = undefined;

    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;
}

/** @internal */
export class JSDocPropertyTag extends BaseJSDocTag<SyntaxKind.JSDocPropertyTag, AstJSDocPropertyTagData> implements Declaration, ts.JSDocPropertyTag {
    declare readonly ast: AstJSDocPropertyTag;
    declare _declarationBrand: any;

    override get parent() { return super.parent as JSDocNode; }
    override set parent(value) { super.parent = value; }

    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get typeExpression() { return this.ast.data.typeExpression?.node; }
    set typeExpression(value) { this.ast.data.typeExpression = value?.ast; }
    get isNameFirst() { return this.ast.data.isNameFirst; }
    set isNameFirst(value) { this.ast.data.isNameFirst = value; }
    get isBracketed() { return this.ast.data.isBracketed; }
    set isBracketed(value) { this.ast.data.isBracketed = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstJSDocPropertyTagData extends AstJSDocTagData {
    typeExpression: AstJSDocTypeExpression | undefined = undefined;
    name: AstEntityName = undefined!;
    isNameFirst = false;
    isBracketed = false;

    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
}

/** @internal */
export class JSDocParameterTag extends BaseJSDocTag<SyntaxKind.JSDocParameterTag, AstJSDocParameterTagData> implements Declaration, ts.JSDocParameterTag {
    declare readonly ast: AstJSDocParameterTag;
    declare _declarationBrand: any;

    override get parent() { return super.parent as JSDocNode; }
    override set parent(value) { super.parent = value; }

    get name() { return this.ast.data.name?.node; }
    set name(value) { this.ast.data.name = value?.ast; }
    get typeExpression() { return this.ast.data.typeExpression?.node; }
    set typeExpression(value) { this.ast.data.typeExpression = value?.ast; }
    get isNameFirst() { return this.ast.data.isNameFirst; }
    set isNameFirst(value) { this.ast.data.isNameFirst = value; }
    get isBracketed() { return this.ast.data.isBracketed; }
    set isBracketed(value) { this.ast.data.isBracketed = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstJSDocParameterTagData extends AstJSDocTagData {
    typeExpression: AstJSDocTypeExpression | undefined = undefined;
    name: AstEntityName = undefined!;
    isNameFirst = false;
    isBracketed = false;

    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
}

/** @internal */
export type JSDocPropertyLikeTag =
    | JSDocPropertyTag
    | JSDocParameterTag
    ;

/** @internal */
export type AstJSDocPropertyLikeTag = AstNodeOneOf<JSDocPropertyLikeTag>;

/** @internal */
export class JSDocTypeLiteral extends Node<SyntaxKind.JSDocTypeLiteral, AstJSDocTypeLiteralData> implements Declaration, ts.JSDocTypeLiteral {
    declare readonly ast: AstJSDocTypeLiteral;

    declare _jsDocTypeBrand: any;
    declare _typeNodeBrand: any;
    declare _declarationBrand: any;

    get jsDocPropertyTags() { return this.ast.data.jsDocPropertyTags?.nodes; }
    set jsDocPropertyTags(value) { this.ast.data.jsDocPropertyTags = value?.ast; }
    get isArrayType() { return this.ast.data.isArrayType; }
    set isArrayType(value) { this.ast.data.isArrayType = value; }
    get symbol() { return this.ast.data.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.symbol = value; }
    get localSymbol() { return this.ast.data.localSymbol; }
    set localSymbol(value) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstJSDocTypeLiteralData extends AstData {
    jsDocPropertyTags: AstNodeArray<AstJSDocPropertyLikeTag> | undefined = undefined;
    isArrayType = false;
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
}

/** @internal */
export class JSDocSatisfiesTag extends BaseJSDocTag<SyntaxKind.JSDocSatisfiesTag, AstJSDocSatisfiesTagData> implements ts.JSDocSatisfiesTag {
    declare readonly ast: AstJSDocSatisfiesTag;
    get typeExpression() { return this.ast.data.typeExpression?.node; }
    set typeExpression(value) { this.ast.data.typeExpression = value?.ast; }
}

/** @internal */
export class AstJSDocSatisfiesTagData extends AstJSDocTagData {
    typeExpression: AstJSDocTypeExpression = undefined!;
}

/** @internal */
export class JSDocImportTag extends BaseJSDocTag<SyntaxKind.JSDocImportTag, AstJSDocImportTagData> implements ts.JSDocImportTag {
    declare readonly ast: AstJSDocImportTag;

    override get parent() { return super.parent as JSDocNode; }
    override set parent(value) { super.parent = value; }

    get importClause() { return this.ast.data.importClause?.node; }
    set importClause(value) { this.ast.data.importClause = value?.ast; }
    get moduleSpecifier() { return this.ast.data.moduleSpecifier?.node; }
    set moduleSpecifier(value) { this.ast.data.moduleSpecifier = value?.ast; }
    get attributes() { return this.ast.data.attributes?.node; }
    set attributes(value) { this.ast.data.attributes = value?.ast; }
}

/** @internal */
export class AstJSDocImportTagData extends AstJSDocTagData {
    importClause: AstImportClause | undefined = undefined;
    moduleSpecifier: AstExpression = undefined!;
    attributes: AstImportAttributes | undefined = undefined;
}

/** @internal */
export class SyntheticExpression extends Node<SyntaxKind.SyntheticExpression, AstSyntheticExpressionData> implements ts.SyntheticExpression {
    declare readonly ast: AstSyntheticExpression;
    declare _expressionBrand: any;

    get isSpread(): boolean { return this.ast.data.isSpread; }
    set isSpread(value: boolean) { this.ast.data.isSpread = value; }
    get type(): ts.Type { return this.ast.data.type; }
    set type(value: ts.Type) { this.ast.data.type = value; }
    get tupleNameSource(): ParameterDeclaration | NamedTupleMember | undefined { return this.ast.data.tupleNameSource?.node; }
    set tupleNameSource(value: ParameterDeclaration | NamedTupleMember | undefined) { this.ast.data.tupleNameSource = value?.ast; }
}

/** @internal */
export class AstSyntheticExpressionData extends AstData {
    isSpread = false;
    type: Type = undefined!;
    tupleNameSource: AstParameterDeclaration | AstNamedTupleMember | undefined = undefined;
}

/** @internal */
export class Bundle extends Node<SyntaxKind.Bundle, AstBundleData> implements ts.Bundle {
    declare readonly ast: AstBundle;

    get sourceFiles(): readonly SourceFile[] { return this.ast.data.sourceFiles; }
    set sourceFiles(value: readonly SourceFile[]) { this.ast.data.sourceFiles = value; }
    get syntheticFileReferences(): readonly FileReference[] | undefined { return this.ast.data.syntheticFileReferences; }
    set syntheticFileReferences(value: readonly FileReference[] | undefined) { this.ast.data.syntheticFileReferences = value; }
    get syntheticTypeReferences(): readonly FileReference[] | undefined { return this.ast.data.syntheticTypeReferences; }
    set syntheticTypeReferences(value: readonly FileReference[] | undefined) { this.ast.data.syntheticTypeReferences = value; }
    get syntheticLibReferences(): readonly FileReference[] | undefined { return this.ast.data.syntheticLibReferences; }
    set syntheticLibReferences(value: readonly FileReference[] | undefined) { this.ast.data.syntheticLibReferences = value; }
    get hasNoDefaultLib(): boolean | undefined { return this.ast.data.hasNoDefaultLib; }
    set hasNoDefaultLib(value: boolean | undefined) { this.ast.data.hasNoDefaultLib = value; }
}

/** @internal */
export class AstBundleData extends AstData {
    sourceFiles: readonly SourceFile[] = undefined!;
    syntheticFileReferences?: readonly FileReference[];
    syntheticTypeReferences?: readonly FileReference[];
    syntheticLibReferences?: readonly FileReference[];
    hasNoDefaultLib?: boolean;
}

/** @internal */
export class SyntaxList extends Node<SyntaxKind.SyntaxList, AstSyntaxListData> implements ts.SyntaxList {
    get _children(): readonly Node[] { return this.ast.data._children; }
    set _children(value: readonly Node[]) { this.ast.data._children = value; }
}

/** @internal */
export class AstSyntaxListData extends AstData {
    _children!: readonly Node[];
}

/** @internal */
export class NotEmittedStatement extends Node<SyntaxKind.NotEmittedStatement, AstNotEmittedStatementData> implements ts.NotEmittedStatement {
    declare readonly ast: AstNotEmittedStatement;

    declare _statementBrand: any;
    declare _jsdocContainerBrand: any;

    get jsDoc(): JSDocArray | undefined { return this.ast.data.jsDoc; }
    set jsDoc(value: JSDocArray | undefined) { this.ast.data.jsDoc = value; }
}

/** @internal */
export class AstNotEmittedStatementData extends AstData {
    jsDoc: JSDocArray | undefined = undefined; // initialized by parser (JSDocContainer)
}

/** @internal */
export class NotEmittedTypeElement extends Node<SyntaxKind.NotEmittedTypeElement, AstNotEmittedTypeElementData> implements ts.NotEmittedTypeElement {
    declare readonly ast: AstNotEmittedTypeElement;

    declare _typeElementBrand: any;
    declare _declarationBrand: any;

    get name(): PropertyName | undefined { return this.ast.data.name?.node; }
    set name(value: PropertyName | undefined) { this.ast.data.name = value?.ast; }
    get questionToken(): QuestionToken | undefined { return this.ast.data.questionToken?.node; }
    set questionToken(value: QuestionToken | undefined) { this.ast.data.questionToken = value?.ast; }
    get symbol(): Symbol { return this.ast.data.symbol; }
    set symbol(value: Symbol) { this.ast.data.symbol = value; }
    get localSymbol(): Symbol | undefined { return this.ast.data.localSymbol; }
    set localSymbol(value: Symbol | undefined) { this.ast.data.localSymbol = value; }
}

/** @internal */
export class AstNotEmittedTypeElementData extends AstData {
    name: AstPropertyName | undefined = undefined;
    questionToken: AstQuestionToken | undefined = undefined;
    symbol: Symbol = undefined!;
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
}

/** @internal */
export class PartiallyEmittedExpression extends Node<SyntaxKind.PartiallyEmittedExpression, AstPartiallyEmittedExpressionData> implements ts.PartiallyEmittedExpression {
    declare readonly ast: AstPartiallyEmittedExpression;

    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;

    get expression(): Expression { return this.ast.data.expression?.node; }
    set expression(value: Expression) { this.ast.data.expression = value?.ast; }
}

/** @internal */
export class AstPartiallyEmittedExpressionData extends AstData {
    expression: AstExpression = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression);
    }
}

/** @internal */
export class CommaListExpression extends Node<SyntaxKind.CommaListExpression, AstCommaListExpressionData> implements ts.CommaListExpression {
    declare readonly ast: AstCommaListExpression;

    declare _expressionBrand: any;

    get elements(): NodeArray<Expression> { return this.ast.data.elements.nodes; }
    set elements(value: NodeArray<Expression>) { this.ast.data.elements = value?.ast; }
}

/** @internal */
export class AstCommaListExpressionData extends AstData {
    elements: AstNodeArray<AstExpression> = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildrenFlags(this.elements);
    }
}

/** @internal */
export class SyntheticReferenceExpression extends Node<SyntaxKind.SyntheticReferenceExpression, AstSyntheticReferenceExpressionData> implements ts.SyntheticReferenceExpression {
    declare readonly ast: AstSyntheticReferenceExpression;

    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;

    get expression(): Expression { return this.ast.data.expression?.node; }
    set expression(value: Expression) { this.ast.data.expression = value?.ast; }
    get thisArg(): Expression { return this.ast.data.thisArg?.node; }
    set thisArg(value: Expression) { this.ast.data.thisArg = value?.ast; }
}

/** @internal */
export class AstSyntheticReferenceExpressionData extends AstData {
    expression: AstExpression = undefined!;
    thisArg: AstExpression = undefined!;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildFlags(this.expression) |
            propagateChildFlags(this.thisArg);
    }
}

/** @internal */
export class SourceFile extends Node<SyntaxKind.SourceFile, AstSourceFileData> implements Declaration, LocalsContainer, ts.SourceFile {
    declare readonly ast: AstSourceFile;

    declare _declarationBrand: any;
    declare _localsContainerBrand: any;

    get statements() { return this.ast.data.statements?.nodes!; } // TODO: remove `!`
    set statements(value) { this.ast.data.statements = value?.ast; }
    get endOfFileToken() { return this.ast.data.endOfFileToken?.node; }
    set endOfFileToken(value) { this.ast.data.endOfFileToken = value?.ast; }
    get fileName() { return this.ast.data.fileName; }
    set fileName(value) { this.ast.data.fileName = value; }

    get path() { return this.ast.data.path; }
    set path(value) { this.ast.data.path = value; }
    get text() { return this.ast.data.text; }
    set text(value) { this.ast.data.text = value; }
    get resolvedPath() { return this.ast.data.resolvedPath; }
    set resolvedPath(value) { this.ast.data.resolvedPath = value; }
    get originalFileName() { return this.ast.data.originalFileName; }
    set originalFileName(value) { this.ast.data.originalFileName = value; }
    get amdDependencies() { return this.ast.data.amdDependencies; }
    set amdDependencies(value) { this.ast.data.amdDependencies = value; }
    get moduleName() { return this.ast.data.moduleName; }
    set moduleName(value) { this.ast.data.moduleName = value; }
    get referencedFiles() { return this.ast.data.referencedFiles; }
    set referencedFiles(value) { this.ast.data.referencedFiles = value; }
    get typeReferenceDirectives() { return this.ast.data.typeReferenceDirectives; }
    set typeReferenceDirectives(value) { this.ast.data.typeReferenceDirectives = value; }
    get libReferenceDirectives() { return this.ast.data.libReferenceDirectives; }
    set libReferenceDirectives(value) { this.ast.data.libReferenceDirectives = value; }
    get languageVariant() { return this.ast.data.languageVariant; }
    set languageVariant(value) { this.ast.data.languageVariant = value; }
    get isDeclarationFile() { return this.ast.data.isDeclarationFile; }
    set isDeclarationFile(value) { this.ast.data.isDeclarationFile = value; }
    get renamedDependencies() { return this.ast.data.renamedDependencies; }
    set renamedDependencies(value) { this.ast.data.renamedDependencies = value; }
    get hasNoDefaultLib() { return this.ast.data.hasNoDefaultLib; }
    set hasNoDefaultLib(value) { this.ast.data.hasNoDefaultLib = value; }
    get languageVersion() { return this.ast.data.languageVersion; }
    set languageVersion(value) { this.ast.data.languageVersion = value; }
    get impliedNodeFormat() { return this.ast.data.impliedNodeFormat; }
    set impliedNodeFormat(value) { this.ast.data.impliedNodeFormat = value; }
    get scriptKind() { return this.ast.data.scriptKind; }
    set scriptKind(value) { this.ast.data.scriptKind = value; }
    get pragmas() { return this.ast.data.pragmas; }
    set pragmas(value) { this.ast.data.pragmas = value; }
    get externalModuleIndicator() { return this.ast.data.externalModuleIndicator; }
    set externalModuleIndicator(value) { this.ast.data.externalModuleIndicator = value; }
    get commonJsModuleIndicator() { return this.ast.data.commonJsModuleIndicator; }
    set commonJsModuleIndicator(value) { this.ast.data.commonJsModuleIndicator = value; }
    get identifiers() { return this.ast.data.identifiers; }
    set identifiers(value) { this.ast.data.identifiers = value; }
    get parseDiagnostics() { return this.ast.data.parseDiagnostics; }
    set parseDiagnostics(value) { this.ast.data.parseDiagnostics = value; }
    get bindDiagnostics() { return this.ast.data.bindDiagnostics; }
    set bindDiagnostics(value) { this.ast.data.bindDiagnostics = value; }
    get bindSuggestionDiagnostics() { return this.ast.data.bindSuggestionDiagnostics; }
    set bindSuggestionDiagnostics(value) { this.ast.data.bindSuggestionDiagnostics = value; }
    get lineMap() { return this.ast.data.lineMap; }
    set lineMap(value) { this.ast.data.lineMap = value; }
    get jsDocDiagnostics() { return this.ast.data.jsDocDiagnostics; }
    set jsDocDiagnostics(value) { this.ast.data.jsDocDiagnostics = value; }
    get commentDirectives() { return this.ast.data.commentDirectives; }
    set commentDirectives(value) { this.ast.data.commentDirectives = value; }
    get checkJsDirective() { return this.ast.data.checkJsDirective; }
    set checkJsDirective(value) { this.ast.data.checkJsDirective = value; }
    get version() { return this.ast.data.version; }
    set version(value) { this.ast.data.version = value; }

    get symbol() { return this.ast.data.declaration.symbol!; } // TODO: remove `!`
    set symbol(value) { this.ast.data.declaration.symbol = value; }
    get localSymbol() { return this.ast.data.declaration.localSymbol; }
    set localSymbol(value) { this.ast.data.declaration.localSymbol = value; }
    get locals() { return this.ast.data.locals; }
    set locals(value) { this.ast.data.locals = value; }
    get redirectInfo() { return this.ast.data.redirectInfo; }
    set redirectInfo(value) { this.ast.data.redirectInfo = value; }
    get packageJsonLocations() { return this.ast.data.packageJsonLocations; }
    set packageJsonLocations(value) { this.ast.data.packageJsonLocations = value; }
    get packageJsonScope() { return this.ast.data.packageJsonScope; }
    set packageJsonScope(value) { this.ast.data.packageJsonScope = value; }
    get setExternalModuleIndicator() { return this.ast.data.setExternalModuleIndicator; }
    set setExternalModuleIndicator(value) { this.ast.data.setExternalModuleIndicator = value; }
    get jsGlobalAugmentations() { return this.ast.data.jsGlobalAugmentations; }
    set jsGlobalAugmentations(value) { this.ast.data.jsGlobalAugmentations = value; }
    get nodeCount() { return this.ast.data.nodeCount; }
    set nodeCount(value) { this.ast.data.nodeCount = value; }
    get identifierCount() { return this.ast.data.identifierCount; }
    set identifierCount(value) { this.ast.data.identifierCount = value; }
    get symbolCount() { return this.ast.data.symbolCount; }
    set symbolCount(value) { this.ast.data.symbolCount = value; }
    get additionalSyntacticDiagnostics() { return this.ast.data.additionalSyntacticDiagnostics; }
    set additionalSyntacticDiagnostics(value) { this.ast.data.additionalSyntacticDiagnostics = value; }
    get classifiableNames() { return this.ast.data.classifiableNames; }
    set classifiableNames(value) { this.ast.data.classifiableNames = value; }
    get imports() { return this.ast.data.imports; }
    set imports(value) { this.ast.data.imports = value; }
    get moduleAugmentations() { return this.ast.data.moduleAugmentations; }
    set moduleAugmentations(value) { this.ast.data.moduleAugmentations = value; }
    get patternAmbientModules() { return this.ast.data.patternAmbientModules; }
    set patternAmbientModules(value) { this.ast.data.patternAmbientModules = value; }
    get ambientModuleNames() { return this.ast.data.ambientModuleNames; }
    set ambientModuleNames(value) { this.ast.data.ambientModuleNames = value; }
    get localJsxNamespace() { return this.ast.data.localJsxNamespace; }
    set localJsxNamespace(value) { this.ast.data.localJsxNamespace = value; }
    get localJsxFragmentNamespace() { return this.ast.data.localJsxFragmentNamespace; }
    set localJsxFragmentNamespace(value) { this.ast.data.localJsxFragmentNamespace = value; }
    get localJsxFactory() { return this.ast.data.localJsxFactory; }
    set localJsxFactory(value) { this.ast.data.localJsxFactory = value; }
    get localJsxFragmentFactory() { return this.ast.data.localJsxFragmentFactory; }
    set localJsxFragmentFactory(value) { this.ast.data.localJsxFragmentFactory = value; }
    get endFlowNode() { return this.ast.data.endFlowNode; }
    set endFlowNode(value) { this.ast.data.endFlowNode = value; }
    get jsDocParsingMode() { return this.ast.data.jsDocParsingMode; }
    set jsDocParsingMode(value) { this.ast.data.jsDocParsingMode = value; }

    get scriptSnapshot() { return this.ast.data.scriptSnapshot; }
    set scriptSnapshot(value) { this.ast.data.scriptSnapshot = value; }
    get nameTable() { return this.ast.data.nameTable; }
    set nameTable(value) { this.ast.data.nameTable = value; }

    get nextContainer() { return this.ast.data.nextContainer?.node; }
    set nextContainer(value) { this.ast.data.nextContainer = value?.ast as NextContainer | undefined; }

    get extendedSourceFiles() { return this.ast.data.extendedSourceFiles; }
    set extendedSourceFiles(value) { this.ast.data.extendedSourceFiles = value; }
    get configFileSpecs() { return this.ast.data.configFileSpecs; }
    set configFileSpecs(value) { this.ast.data.configFileSpecs = value; }

    public update(newText: string, textChangeRange: ts.TextChangeRange): ts.SourceFile {
        return updateSourceFile(this, newText, textChangeRange);
    }

    public getLineAndCharacterOfPosition(position: number): ts.LineAndCharacter {
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

    public getNamedDeclarations(): Map<string, ts.Declaration[]> {
        if (!this.ast.data.namedDeclarations) {
            this.ast.data.namedDeclarations = this.computeNamedDeclarations();
        }

        return this.ast.data.namedDeclarations;
    }

    private computeNamedDeclarations(): Map<string, ts.Declaration[]> {
        const result = createMultiMap<string, ts.Declaration>();

        this.forEachChild(visit);

        return result;

        function addDeclaration(declaration: ts.Declaration) {
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

        function getDeclarationName(declaration: ts.Declaration) {
            const name = getNonAssignedNameOfDeclaration(declaration);
            return name && (isComputedPropertyName(name) && isPropertyAccessExpression(name.expression) ? (name.expression.name as MemberName).text
                : isPropertyName(name) ? getNameFromPropertyName(name) : undefined);
        }

        function visit(node: ts.Node): void {
            switch (node.kind) {
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                    const functionDeclaration = node as ts.FunctionLikeDeclaration;
                    const declarationName = getDeclarationName(functionDeclaration);

                    if (declarationName) {
                        const declarations = getDeclarations(declarationName);
                        const lastDeclaration = lastOrUndefined(declarations);

                        // Check whether this declaration belongs to an "overload group".
                        if (lastDeclaration && functionDeclaration.parent === lastDeclaration.parent && functionDeclaration.symbol === lastDeclaration.symbol) {
                            // Overwrite the last declaration if it was an overload
                            // and this one is an implementation.
                            if (functionDeclaration.body && !(lastDeclaration as ts.FunctionLikeDeclaration).body) {
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
                    addDeclaration(node as ts.Declaration);
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
                    const decl = node as ts.VariableDeclaration;
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
                    addDeclaration(node as ts.Declaration);
                    break;

                case SyntaxKind.ExportDeclaration:
                    // Handle named exports case e.g.:
                    //    export {a, b as B} from "mod";
                    const exportDeclaration = node as ts.ExportDeclaration;
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
                    if (getAssignmentDeclarationKind(node as ts.BinaryExpression) !== ts.AssignmentDeclarationKind.None) {
                        addDeclaration(node as ts.BinaryExpression);
                    }
                // falls through

                default:
                    forEachChild(node, visit);
            }
        }
    }
}

/** @internal */
export class AstDeclarationData {
    symbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
    localSymbol: Symbol | undefined = undefined; // initialized by binder (Declaration)
}

/** @internal */
export class AstSourceFileData extends AstData {
    declaration = new AstDeclarationData();
    statements: AstNodeArray<AstStatement> | undefined = undefined;
    endOfFileToken: AstEndOfFileToken = undefined!;
    text = "";
    fileName = "";
    path = "" as Path;
    resolvedPath = "" as Path;
    originalFileName = "";
    languageVersion = ScriptTarget.ES5;
    languageVariant: LanguageVariant = 0;
    scriptKind: ScriptKind = 0;
    isDeclarationFile = false;
    hasNoDefaultLib = false;
    locals: SymbolTable | undefined = undefined;
    nextContainer: NextContainer | undefined = undefined;
    endFlowNode: FlowNode | undefined = undefined; // initialized by checker (FlowContainer)
    nodeCount = 0;
    identifierCount = 0;
    symbolCount = 0;
    parseDiagnostics: DiagnosticWithLocation[] = undefined!;
    bindDiagnostics: DiagnosticWithLocation[] = undefined!;
    bindSuggestionDiagnostics: DiagnosticWithLocation[] | undefined = undefined;
    lineMap: readonly number[] = undefined!;
    externalModuleIndicator: Node | true | undefined = undefined;
    setExternalModuleIndicator?: ((file: ts.SourceFile) => void) | undefined = undefined;
    pragmas: ReadonlyPragmaMap = undefined!;
    checkJsDirective: CheckJsDirective | undefined = undefined;
    referencedFiles: readonly FileReference[] = undefined!;
    typeReferenceDirectives: readonly FileReference[] = undefined!;
    libReferenceDirectives: readonly FileReference[] = undefined!;
    amdDependencies: AmdDependency[] = undefined!;
    commentDirectives: CommentDirective[] | undefined = undefined;
    identifiers: Map<string, string> = undefined!;
    packageJsonLocations?: readonly string[] | undefined = undefined;
    packageJsonScope?: PackageJsonInfo | undefined = undefined;
    imports: readonly ts.StringLiteralLike[] = undefined!;
    moduleAugmentations: readonly (ts.Identifier | ts.StringLiteral)[] = undefined!;
    ambientModuleNames: readonly string[] = undefined!;
    classifiableNames?: ReadonlySet<__String> | undefined = undefined;
    impliedNodeFormat: ResolutionMode | undefined = undefined;
    moduleName: string | undefined = undefined;
    renamedDependencies: Map<string, string> = undefined!;
    commonJsModuleIndicator: Node | undefined = undefined;
    version: string = undefined!;
    redirectInfo?: ts.RedirectInfo | undefined = undefined;
    jsGlobalAugmentations?: SymbolTable | undefined = undefined;
    additionalSyntacticDiagnostics?: readonly DiagnosticWithLocation[] | undefined = undefined;
    patternAmbientModules?: ts.PatternAmbientModule[] | undefined = undefined;
    localJsxNamespace?: __String | undefined = undefined;
    localJsxFragmentNamespace?: __String | undefined = undefined;
    localJsxFactory?: ts.EntityName | undefined = undefined;
    localJsxFragmentFactory?: ts.EntityName | undefined = undefined;
    jsDocParsingMode?: ts.JSDocParsingMode | undefined = undefined;
    jsDocDiagnostics: DiagnosticWithLocation[] | undefined = undefined;
    namedDeclarations: Map<string, ts.Declaration[]> | undefined = undefined;

    // TODO: fix type
    scriptSnapshot: any = undefined;
    nameTable: Map<__String, number> | undefined = undefined;

    // TsConfigSourceFile
    extendedSourceFiles?: string[];
    configFileSpecs?: ts.ConfigFileSpecs;

    override computeTransformFlags(_: AstNode): TransformFlags {
        return propagateChildrenFlags(this.statements) |
            propagateChildFlags(this.endOfFileToken);
    }

    override cloneNode(node: AstNode): AstNode {
        if (this.redirectInfo) {
            const clone = (this.redirectInfo.redirectTarget as SourceFile).ast.shadow() as AstSourceFile;
            this.copyProperties(clone.data);
            clone.emitNode = undefined;
            return clone;
        }
        return super.cloneNode(node);
    }
}

/** @internal */
export type AstToken<K extends TokenSyntaxKind = TokenSyntaxKind> = AstNode<Token<K>>;
/** @internal */
export type AstEndOfFileToken = AstNode<EndOfFileToken>;
/** @internal */
export type AstThisExpression = AstNode<ThisExpression>;
/** @internal */
export type AstSuperExpression = AstNode<SuperExpression>;
/** @internal */
export type AstImportExpression = AstNode<ImportExpression>;
/** @internal */
export type AstNullLiteral = AstNode<NullLiteral>;
/** @internal */
export type AstTrueLiteral = AstNode<TrueLiteral>;
/** @internal */
export type AstFalseLiteral = AstNode<FalseLiteral>;
/** @internal */
export type AstIdentifier = AstNode<Identifier>;
/** @internal */
export type AstQualifiedName = AstNode<QualifiedName>;
/** @internal */
export type AstComputedPropertyName = AstNode<ComputedPropertyName>;
/** @internal */
export type AstPrivateIdentifier = AstNode<PrivateIdentifier>;
/** @internal */
export type AstTypeParameterDeclaration = AstNode<TypeParameterDeclaration>;
/** @internal */
export type AstParameterDeclaration = AstNode<ParameterDeclaration>;
/** @internal */
export type AstDecorator = AstNode<Decorator>;
/** @internal */
export type AstPropertySignature = AstNode<PropertySignature>;
/** @internal */
export type AstCallSignatureDeclaration = AstNode<CallSignatureDeclaration>;
/** @internal */
export type AstConstructSignatureDeclaration = AstNode<ConstructSignatureDeclaration>;
/** @internal */
export type AstVariableDeclaration = AstNode<VariableDeclaration>;
/** @internal */
export type AstVariableDeclarationList = AstNode<VariableDeclarationList>;
/** @internal */
export type AstBindingElement = AstNode<BindingElement>;
/** @internal */
export type AstPropertyDeclaration = AstNode<PropertyDeclaration>;
/** @internal */
export type AstPropertyAssignment = AstNode<PropertyAssignment>;
/** @internal */
export type AstShorthandPropertyAssignment = AstNode<ShorthandPropertyAssignment>;
/** @internal */
export type AstSpreadAssignment = AstNode<SpreadAssignment>;
/** @internal */
export type AstObjectBindingPattern = AstNode<ObjectBindingPattern>;
/** @internal */
export type AstArrayBindingPattern = AstNode<ArrayBindingPattern>;
/** @internal */
export type AstFunctionDeclaration = AstNode<FunctionDeclaration>;
/** @internal */
export type AstMethodSignature = AstNode<MethodSignature>;
/** @internal */
export type AstMethodDeclaration = AstNode<MethodDeclaration>;
/** @internal */
export type AstConstructorDeclaration = AstNode<ConstructorDeclaration>;
/** @internal */
export type AstSemicolonClassElement = AstNode<SemicolonClassElement>;
/** @internal */
export type AstGetAccessorDeclaration = AstNode<GetAccessorDeclaration>;
/** @internal */
export type AstSetAccessorDeclaration = AstNode<SetAccessorDeclaration>;
/** @internal */
export type AstIndexSignatureDeclaration = AstNode<IndexSignatureDeclaration>;
/** @internal */
export type AstClassStaticBlockDeclaration = AstNode<ClassStaticBlockDeclaration>;
/** @internal */
export type AstImportTypeNode = AstNode<ImportTypeNode>;
/** @internal */
export type AstThisTypeNode = AstNode<ThisTypeNode>;
/** @internal */
export type AstFunctionTypeNode = AstNode<FunctionTypeNode>;
/** @internal */
export type AstConstructorTypeNode = AstNode<ConstructorTypeNode>;
/** @internal */
export type AstTypeReferenceNode = AstNode<TypeReferenceNode>;
/** @internal */
export type AstTypePredicateNode = AstNode<TypePredicateNode>;
/** @internal */
export type AstTypeQueryNode = AstNode<TypeQueryNode>;
/** @internal */
export type AstTypeLiteralNode = AstNode<TypeLiteralNode>;
/** @internal */
export type AstArrayTypeNode = AstNode<ArrayTypeNode>;
/** @internal */
export type AstTupleTypeNode = AstNode<TupleTypeNode>;
/** @internal */
export type AstNamedTupleMember = AstNode<NamedTupleMember>;
/** @internal */
export type AstOptionalTypeNode = AstNode<OptionalTypeNode>;
/** @internal */
export type AstRestTypeNode = AstNode<RestTypeNode>;
/** @internal */
export type AstUnionTypeNode = AstNode<UnionTypeNode>;
/** @internal */
export type AstIntersectionTypeNode = AstNode<IntersectionTypeNode>;
/** @internal */
export type AstConditionalTypeNode = AstNode<ConditionalTypeNode>;
/** @internal */
export type AstInferTypeNode = AstNode<InferTypeNode>;
/** @internal */
export type AstParenthesizedTypeNode = AstNode<ParenthesizedTypeNode>;
/** @internal */
export type AstTypeOperatorNode = AstNode<TypeOperatorNode>;
/** @internal */
export type AstIndexedAccessTypeNode = AstNode<IndexedAccessTypeNode>;
/** @internal */
export type AstMappedTypeNode = AstNode<MappedTypeNode>;
/** @internal */
export type AstLiteralTypeNode = AstNode<LiteralTypeNode>;
/** @internal */
export type AstStringLiteral = AstNode<StringLiteral>;
/** @internal */
export type AstTemplateLiteralTypeNode = AstNode<TemplateLiteralTypeNode>;
/** @internal */
export type AstTemplateLiteralTypeSpan = AstNode<TemplateLiteralTypeSpan>;
/** @internal */
export type AstOmittedExpression = AstNode<OmittedExpression>;
/** @internal */
export type AstPrefixUnaryExpression = AstNode<PrefixUnaryExpression>;
/** @internal */
export type AstPostfixUnaryExpression = AstNode<PostfixUnaryExpression>;
/** @internal */
export type AstDeleteExpression = AstNode<DeleteExpression>;
/** @internal */
export type AstTypeOfExpression = AstNode<TypeOfExpression>;
/** @internal */
export type AstVoidExpression = AstNode<VoidExpression>;
/** @internal */
export type AstAwaitExpression = AstNode<AwaitExpression>;
/** @internal */
export type AstYieldExpression = AstNode<YieldExpression>;
/** @internal */
export type AstBinaryExpression = AstNode<BinaryExpression>;
/** @internal */
export type AstConditionalExpression = AstNode<ConditionalExpression>;
/** @internal */
export type AstFunctionExpression = AstNode<FunctionExpression>;
/** @internal */
export type AstArrowFunction = AstNode<ArrowFunction>;
/** @internal */
export type AstRegularExpressionLiteral = AstNode<RegularExpressionLiteral>;
/** @internal */
export type AstNoSubstitutionTemplateLiteral = AstNode<NoSubstitutionTemplateLiteral>;
/** @internal */
export type AstNumericLiteral = AstNode<NumericLiteral>;
/** @internal */
export type AstBigIntLiteral = AstNode<BigIntLiteral>;
/** @internal */
export type AstTemplateHead = AstNode<TemplateHead>;
/** @internal */
export type AstTemplateMiddle = AstNode<TemplateMiddle>;
/** @internal */
export type AstTemplateTail = AstNode<TemplateTail>;
/** @internal */
export type AstTemplateExpression = AstNode<TemplateExpression>;
/** @internal */
export type AstTemplateSpan = AstNode<TemplateSpan>;
/** @internal */
export type AstParenthesizedExpression = AstNode<ParenthesizedExpression>;
/** @internal */
export type AstArrayLiteralExpression = AstNode<ArrayLiteralExpression>;
/** @internal */
export type AstSpreadElement = AstNode<SpreadElement>;
/** @internal */
export type AstObjectLiteralExpression = AstNode<ObjectLiteralExpression>;
/** @internal */
export type AstPropertyAccessExpression = AstNode<PropertyAccessExpression>;
/** @internal */
export type AstElementAccessExpression = AstNode<ElementAccessExpression>;
/** @internal */
export type AstCallExpression = AstNode<CallExpression>;
/** @internal */
export type AstExpressionWithTypeArguments = AstNode<ExpressionWithTypeArguments>;
/** @internal */
export type AstNewExpression = AstNode<NewExpression>;
/** @internal */
export type AstTaggedTemplateExpression = AstNode<TaggedTemplateExpression>;
/** @internal */
export type AstAsExpression = AstNode<AsExpression>;
/** @internal */
export type AstTypeAssertion = AstNode<TypeAssertion>;
/** @internal */
export type AstSatisfiesExpression = AstNode<SatisfiesExpression>;
/** @internal */
export type AstNonNullExpression = AstNode<NonNullExpression>;
/** @internal */
export type AstMetaProperty = AstNode<MetaProperty>;
/** @internal */
export type AstJsxElement = AstNode<JsxElement>;
/** @internal */
export type AstJsxAttributes = AstNode<JsxAttributes>;
/** @internal */
export type AstJsxNamespacedName = AstNode<JsxNamespacedName>;
/** @internal */
export type AstJsxOpeningElement = AstNode<JsxOpeningElement>;
/** @internal */
export type AstJsxSelfClosingElement = AstNode<JsxSelfClosingElement>;
/** @internal */
export type AstJsxFragment = AstNode<JsxFragment>;
/** @internal */
export type AstJsxOpeningFragment = AstNode<JsxOpeningFragment>;
/** @internal */
export type AstJsxClosingFragment = AstNode<JsxClosingFragment>;
/** @internal */
export type AstJsxAttribute = AstNode<JsxAttribute>;
/** @internal */
export type AstJsxSpreadAttribute = AstNode<JsxSpreadAttribute>;
/** @internal */
export type AstJsxClosingElement = AstNode<JsxClosingElement>;
/** @internal */
export type AstJsxExpression = AstNode<JsxExpression>;
/** @internal */
export type AstJsxText = AstNode<JsxText>;
/** @internal */
export type AstEmptyStatement = AstNode<EmptyStatement>;
/** @internal */
export type AstDebuggerStatement = AstNode<DebuggerStatement>;
/** @internal */
export type AstMissingDeclaration = AstNode<MissingDeclaration>;
/** @internal */
export type AstBlock = AstNode<Block>;
/** @internal */
export type AstVariableStatement = AstNode<VariableStatement>;
/** @internal */
export type AstExpressionStatement = AstNode<ExpressionStatement>;
/** @internal */
export type AstIfStatement = AstNode<IfStatement>;
/** @internal */
export type AstDoStatement = AstNode<DoStatement>;
/** @internal */
export type AstWhileStatement = AstNode<WhileStatement>;
/** @internal */
export type AstForStatement = AstNode<ForStatement>;
/** @internal */
export type AstForInStatement = AstNode<ForInStatement>;
/** @internal */
export type AstForOfStatement = AstNode<ForOfStatement>;
/** @internal */
export type AstBreakStatement = AstNode<BreakStatement>;
/** @internal */
export type AstContinueStatement = AstNode<ContinueStatement>;
/** @internal */
export type AstReturnStatement = AstNode<ReturnStatement>;
/** @internal */
export type AstWithStatement = AstNode<WithStatement>;
/** @internal */
export type AstSwitchStatement = AstNode<SwitchStatement>;
/** @internal */
export type AstCaseBlock = AstNode<CaseBlock>;
/** @internal */
export type AstCaseClause = AstNode<CaseClause>;
/** @internal */
export type AstDefaultClause = AstNode<DefaultClause>;
/** @internal */
export type AstLabeledStatement = AstNode<LabeledStatement>;
/** @internal */
export type AstThrowStatement = AstNode<ThrowStatement>;
/** @internal */
export type AstTryStatement = AstNode<TryStatement>;
/** @internal */
export type AstCatchClause = AstNode<CatchClause>;
/** @internal */
export type AstClassDeclaration = AstNode<ClassDeclaration>;
/** @internal */
export type AstClassExpression = AstNode<ClassExpression>;
/** @internal */
export type AstInterfaceDeclaration = AstNode<InterfaceDeclaration>;
/** @internal */
export type AstHeritageClause = AstNode<HeritageClause>;
/** @internal */
export type AstTypeAliasDeclaration = AstNode<TypeAliasDeclaration>;
/** @internal */
export type AstEnumMember = AstNode<EnumMember>;
/** @internal */
export type AstEnumDeclaration = AstNode<EnumDeclaration>;
/** @internal */
export type AstModuleDeclaration = AstNode<ModuleDeclaration>;
/** @internal */
export type AstModuleBlock = AstNode<ModuleBlock>;
/** @internal */
export type AstImportEqualsDeclaration = AstNode<ImportEqualsDeclaration>;
/** @internal */
export type AstExternalModuleReference = AstNode<ExternalModuleReference>;
/** @internal */
export type AstImportDeclaration = AstNode<ImportDeclaration>;
/** @internal */
export type AstImportClause = AstNode<ImportClause>;
/** @internal */
export type AstImportAttribute = AstNode<ImportAttribute>;
/** @internal */
export type AstImportAttributes = AstNode<ImportAttributes>;
/** @internal */
export type AstNamespaceImport = AstNode<NamespaceImport>;
/** @internal */
export type AstNamespaceExport = AstNode<NamespaceExport>;
/** @internal */
export type AstNamespaceExportDeclaration = AstNode<NamespaceExportDeclaration>;
/** @internal */
export type AstExportDeclaration = AstNode<ExportDeclaration>;
/** @internal */
export type AstNamedImports = AstNode<NamedImports>;
/** @internal */
export type AstNamedExports = AstNode<NamedExports>;
/** @internal */
export type AstImportSpecifier = AstNode<ImportSpecifier>;
/** @internal */
export type AstExportSpecifier = AstNode<ExportSpecifier>;
/** @internal */
export type AstExportAssignment = AstNode<ExportAssignment>;
/** @internal */
export type AstJSDocTypeExpression = AstNode<JSDocTypeExpression>;
/** @internal */
export type AstJSDocNameReference = AstNode<JSDocNameReference>;
/** @internal */
export type AstJSDocMemberName = AstNode<JSDocMemberName>;
/** @internal */
export type AstJSDocAllType = AstNode<JSDocAllType>;
/** @internal */
export type AstJSDocUnknownType = AstNode<JSDocUnknownType>;
/** @internal */
export type AstJSDocNonNullableType = AstNode<JSDocNonNullableType>;
/** @internal */
export type AstJSDocNullableType = AstNode<JSDocNullableType>;
/** @internal */
export type AstJSDocOptionalType = AstNode<JSDocOptionalType>;
/** @internal */
export type AstJSDocFunctionType = AstNode<JSDocFunctionType>;
/** @internal */
export type AstJSDocVariadicType = AstNode<JSDocVariadicType>;
/** @internal */
export type AstJSDocNamepathType = AstNode<JSDocNamepathType>;
/** @internal */
export type AstJSDocNode = AstNode<JSDocNode>;
/** @internal */
export type AstJSDocLink = AstNode<JSDocLink>;
/** @internal */
export type AstJSDocLinkCode = AstNode<JSDocLinkCode>;
/** @internal */
export type AstJSDocLinkPlain = AstNode<JSDocLinkPlain>;
/** @internal */
export type AstJSDocText = AstNode<JSDocText>;
/** @internal */
export type AstJSDocUnknownTag = AstNode<JSDocUnknownTag>;
/** @internal */
export type AstJSDocAugmentsTag = AstNode<JSDocAugmentsTag>;
/** @internal */
export type AstJSDocImplementsTag = AstNode<JSDocImplementsTag>;
/** @internal */
export type AstJSDocAuthorTag = AstNode<JSDocAuthorTag>;
/** @internal */
export type AstJSDocDeprecatedTag = AstNode<JSDocDeprecatedTag>;
/** @internal */
export type AstJSDocClassTag = AstNode<JSDocClassTag>;
/** @internal */
export type AstJSDocPublicTag = AstNode<JSDocPublicTag>;
/** @internal */
export type AstJSDocPrivateTag = AstNode<JSDocPrivateTag>;
/** @internal */
export type AstJSDocProtectedTag = AstNode<JSDocProtectedTag>;
/** @internal */
export type AstJSDocReadonlyTag = AstNode<JSDocReadonlyTag>;
/** @internal */
export type AstJSDocOverrideTag = AstNode<JSDocOverrideTag>;
/** @internal */
export type AstJSDocEnumTag = AstNode<JSDocEnumTag>;
/** @internal */
export type AstJSDocThisTag = AstNode<JSDocThisTag>;
/** @internal */
export type AstJSDocTemplateTag = AstNode<JSDocTemplateTag>;
/** @internal */
export type AstJSDocSeeTag = AstNode<JSDocSeeTag>;
/** @internal */
export type AstJSDocReturnTag = AstNode<JSDocReturnTag>;
/** @internal */
export type AstJSDocTypeTag = AstNode<JSDocTypeTag>;
/** @internal */
export type AstJSDocTypedefTag = AstNode<JSDocTypedefTag>;
/** @internal */
export type AstJSDocCallbackTag = AstNode<JSDocCallbackTag>;
/** @internal */
export type AstJSDocOverloadTag = AstNode<JSDocOverloadTag>;
/** @internal */
export type AstJSDocThrowsTag = AstNode<JSDocThrowsTag>;
/** @internal */
export type AstJSDocSignature = AstNode<JSDocSignature>;
/** @internal */
export type AstJSDocPropertyTag = AstNode<JSDocPropertyTag>;
/** @internal */
export type AstJSDocParameterTag = AstNode<JSDocParameterTag>;
/** @internal */
export type AstJSDocTypeLiteral = AstNode<JSDocTypeLiteral>;
/** @internal */
export type AstJSDocSatisfiesTag = AstNode<JSDocSatisfiesTag>;
/** @internal */
export type AstJSDocImportTag = AstNode<JSDocImportTag>;
/** @internal */
export type AstSourceFile = AstNode<SourceFile>;
/** @internal */
export type AstSyntheticExpression = AstNode<SyntheticExpression>;
/** @internal */
export type AstBundle = AstNode<Bundle>;
/** @internal */
export type AstSyntaxList = AstNode<SyntaxList>;
/** @internal */
export type AstNotEmittedStatement = AstNode<NotEmittedStatement>;
/** @internal */
export type AstNotEmittedTypeElement = AstNode<NotEmittedTypeElement>;
/** @internal */
export type AstPartiallyEmittedExpression = AstNode<PartiallyEmittedExpression>;
/** @internal */
export type AstCommaListExpression = AstNode<CommaListExpression>;
/** @internal */
export type AstSyntheticReferenceExpression = AstNode<SyntheticReferenceExpression>;

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
    return isNamedDeclaration(child) && child.data.name && isAstPropertyName(child.data.name) ? propagatePropertyNameFlagsOfChild(child.data.name, childFlags) : childFlags;
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
export type NamedDeclaration =
    | FunctionDeclaration
    | FunctionExpression
    | ClassExpression
    | ClassDeclaration
    | MethodDeclaration
    | GetAccessorDeclaration
    | SetAccessorDeclaration
    | PropertyDeclaration
    | InterfaceDeclaration
    | MethodSignature
    | PropertySignature
    | TypeAliasDeclaration
    | EnumDeclaration
    | EnumMember
    | ModuleDeclaration
    | VariableDeclaration
    | ParameterDeclaration
    | BindingElement
    | TypeParameterDeclaration
    | ImportEqualsDeclaration
    | NamespaceExportDeclaration
    | ImportClause
    | NamespaceImport
    | NamespaceExport
    | ImportSpecifier
    | ExportSpecifier
    | JSDocTypedefTag
    | JSDocCallbackTag;

/** @internal */
export type AstNamedDeclaration = AstNodeOneOf<NamedDeclaration>;

function isNamedDeclaration(node: AstNode): node is AstNamedDeclaration {
    switch (node.kind) {
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ClassExpression:
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.InterfaceDeclaration:
        case SyntaxKind.MethodSignature:
        case SyntaxKind.PropertySignature:
        case SyntaxKind.TypeAliasDeclaration:
        case SyntaxKind.EnumDeclaration:
        case SyntaxKind.EnumMember:
        case SyntaxKind.ModuleDeclaration:
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.Parameter:
        case SyntaxKind.BindingElement:
        case SyntaxKind.TypeParameter:
        case SyntaxKind.ImportEqualsDeclaration:
        case SyntaxKind.NamespaceExportDeclaration:
        case SyntaxKind.ImportClause:
        case SyntaxKind.NamespaceImport:
        case SyntaxKind.NamespaceExport:
        case SyntaxKind.ImportSpecifier:
        case SyntaxKind.ExportSpecifier:
        case SyntaxKind.JSDocTypedefTag:
        case SyntaxKind.JSDocCallbackTag:
            return true;
    }
    return false;
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
    return template.kind ===  SyntaxKind.NoSubstitutionTemplateLiteral;
}

// copied from services/utilities.ts
function getNameFromPropertyName(name: ts.PropertyName): string | undefined {
    return name.kind === SyntaxKind.ComputedPropertyName
        // treat computed property names where expression is string/numeric literal as just string/numeric literal
        ? isStringOrNumericLiteralLike(name.expression) ? name.expression.text : undefined
        : isPrivateIdentifier(name) ? idText(name) : getTextOfIdentifierOrLiteral(name);
}

// copied form services/services.ts
let _scanner: Scanner | undefined;

function scanner() {
    _scanner ??= createScanner(ScriptTarget.Latest, /*skipTrivia*/ true);
    return _scanner;
}

function createChildren(node: Node, sourceFile: ts.SourceFileLike | undefined): readonly ts.Node[] {
    const children: ts.Node[] = [];

    if (isJSDocCommentContainingNode(node)) {
        /** Don't add trivia for "tokens" since this is in a comment. */
        node.forEachChild(child => {
            children.push(child);
        });
        return children;
    }

    scanner().setText((sourceFile || node.getSourceFile()).text);
    let pos = node.pos;
    const processNode = (child: ts.Node) => {
        addSyntheticNodes(children, pos, child.pos, node);
        children.push(child);
        pos = child.end;
    };
    const processNodes = (nodes: ts.NodeArray<ts.Node>) => {
        addSyntheticNodes(children, pos, nodes.pos, node);
        children.push(createSyntaxList(nodes, node));
        pos = nodes.end;
    };
    // jsDocComments need to be the first children
    forEach((node as ts.Node as ts.JSDocContainer).jsDoc, processNode);
    // For syntactic classifications, all trivia are classified together, including jsdoc comments.
    // For that to work, the jsdoc comments should still be the leading trivia of the first child.
    // Restoring the scanner position ensures that.
    pos = node.pos;
    node.forEachChild(processNode, processNodes);
    addSyntheticNodes(children, pos, node.end, node);
    scanner().setText(undefined);
    return children;
}

function createNode<TKind extends TokenSyntaxKind>(kind: TKind, pos: number, end: number, parent: ts.Node): ts.Node {
    const astNode = kind === SyntaxKind.StringLiteral ? AstNode.StringLiteral() : AstNode.Token(kind);
    astNode.pos = pos;
    astNode.end = end;
    astNode.parent = (parent as Node).ast;
    astNode.flags = parent.flags & NodeFlags.ContextFlags;
    return astNode.node;
}

function addSyntheticNodes(nodes: ts.Node[], pos: number, end: number, parent: ts.Node): void {
    scanner().resetTokenState(pos);
    while (pos < end) {
        const token = scanner().scan();
        const textPos = scanner().getTokenEnd();
        if (textPos <= end) {
            Debug.assert(ts.isTokenKind(token));
            if (token === SyntaxKind.Identifier) {
                if (hasTabstop(parent)) {
                    continue;
                }
                Debug.fail(`Did not expect ${Debug.formatSyntaxKind(parent.kind)} to have an ${Debug.formatSyntaxKind(token)} in its trivia`);
            }
            nodes.push(createNode(token as TokenSyntaxKind, pos, textPos, parent));
        }
        pos = textPos;
        if (token === SyntaxKind.EndOfFileToken) {
            break;
        }
    }
}

function createSyntaxList(nodes: ts.NodeArray<ts.Node>, parent: ts.Node): ts.Node {
    const list = AstNode.SyntaxList();
    list.pos = nodes.pos;
    list.end = nodes.end;
    list.parent = (parent as Node).ast;
    const children: ts.Node[] = [];
    let pos = nodes.pos;
    for (const node of nodes) {
        addSyntheticNodes(children, pos, node.pos, parent);
        children.push(node);
        pos = node.end;
    }
    addSyntheticNodes(children, pos, nodes.end, parent);
    list.data._children = children as Node[];
    return list.node;
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
        if (ts.isParseTreeNode(node)) {
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
        && !!ts.getJSDocTypeTag(node.node); // TODO: don't invoke node
}

/** @internal */
export type OuterExpression =
    | ParenthesizedExpression
    | TypeAssertion
    | SatisfiesExpression
    | AsExpression
    | NonNullExpression
    | ExpressionWithTypeArguments
    | PartiallyEmittedExpression;

/** @internal */
export type AstOuterExpression = AstNodeOneOf<OuterExpression>;

/** @internal */
export function isAstOuterExpression(node: AstNode, kinds = ts.OuterExpressionKinds.All): node is AstOuterExpression {
    switch (node.kind) {
        case SyntaxKind.ParenthesizedExpression:
            if (kinds & ts.OuterExpressionKinds.ExcludeJSDocTypeAssertion && isAstJSDocTypeAssertion(node)) {
                return false;
            }
            return (kinds & ts.OuterExpressionKinds.Parentheses) !== 0;
        case SyntaxKind.TypeAssertionExpression:
        case SyntaxKind.AsExpression:
        case SyntaxKind.SatisfiesExpression:
            return (kinds & ts.OuterExpressionKinds.TypeAssertions) !== 0;
        case SyntaxKind.ExpressionWithTypeArguments:
            return (kinds & ts.OuterExpressionKinds.ExpressionsWithTypeArguments) !== 0;
        case SyntaxKind.NonNullExpression:
            return (kinds & ts.OuterExpressionKinds.NonNullAssertions) !== 0;
        case SyntaxKind.PartiallyEmittedExpression:
            return (kinds & ts.OuterExpressionKinds.PartiallyEmittedExpressions) !== 0;
    }
    return false;
}

/** @internal */
export function skipAstOuterExpressions(node: AstNode, kinds = ts.OuterExpressionKinds.All) {
    while (isAstOuterExpression(node, kinds)) {
        node = node.data.expression;
    }
    return node;
}

/** @internal */
export interface NodeType {
    [SyntaxKind.Unknown]: Token<SyntaxKind.Unknown, AstTokenData>,
    [SyntaxKind.EndOfFileToken]: EndOfFileToken,
    [SyntaxKind.SingleLineCommentTrivia]: Token<SyntaxKind.SingleLineCommentTrivia, AstTokenData>,
    [SyntaxKind.MultiLineCommentTrivia]: Token<SyntaxKind.MultiLineCommentTrivia, AstTokenData>,
    [SyntaxKind.NewLineTrivia]: Token<SyntaxKind.NewLineTrivia, AstTokenData>,
    [SyntaxKind.WhitespaceTrivia]: Token<SyntaxKind.WhitespaceTrivia, AstTokenData>,
    [SyntaxKind.ShebangTrivia]: Token<SyntaxKind.ShebangTrivia, AstTokenData>,
    [SyntaxKind.ConflictMarkerTrivia]: Token<SyntaxKind.ConflictMarkerTrivia, AstTokenData>,
    [SyntaxKind.NonTextFileMarkerTrivia]: never,
    [SyntaxKind.NumericLiteral]: NumericLiteral,
    [SyntaxKind.BigIntLiteral]: BigIntLiteral,
    [SyntaxKind.StringLiteral]: StringLiteral,
    [SyntaxKind.JsxText]: JsxText,
    [SyntaxKind.JsxTextAllWhiteSpaces]: never,
    [SyntaxKind.RegularExpressionLiteral]: RegularExpressionLiteral,
    [SyntaxKind.NoSubstitutionTemplateLiteral]: NoSubstitutionTemplateLiteral,
    [SyntaxKind.TemplateHead]: TemplateHead,
    [SyntaxKind.TemplateMiddle]: TemplateMiddle,
    [SyntaxKind.TemplateTail]: TemplateTail,
    [SyntaxKind.OpenBraceToken]: Token<SyntaxKind.OpenBraceToken, AstTokenData>,
    [SyntaxKind.CloseBraceToken]: Token<SyntaxKind.CloseBraceToken, AstTokenData>,
    [SyntaxKind.OpenParenToken]: Token<SyntaxKind.OpenParenToken, AstTokenData>,
    [SyntaxKind.CloseParenToken]: Token<SyntaxKind.CloseParenToken, AstTokenData>,
    [SyntaxKind.OpenBracketToken]: Token<SyntaxKind.OpenBracketToken, AstTokenData>,
    [SyntaxKind.CloseBracketToken]: Token<SyntaxKind.CloseBracketToken, AstTokenData>,
    [SyntaxKind.DotToken]: Token<SyntaxKind.DotToken, AstTokenData>,
    [SyntaxKind.DotDotDotToken]: Token<SyntaxKind.DotDotDotToken, AstTokenData>,
    [SyntaxKind.SemicolonToken]: Token<SyntaxKind.SemicolonToken, AstTokenData>,
    [SyntaxKind.CommaToken]: Token<SyntaxKind.CommaToken, AstTokenData>,
    [SyntaxKind.QuestionDotToken]: Token<SyntaxKind.QuestionDotToken, AstTokenData>,
    [SyntaxKind.LessThanToken]: Token<SyntaxKind.LessThanToken, AstTokenData>,
    [SyntaxKind.LessThanSlashToken]: Token<SyntaxKind.LessThanSlashToken, AstTokenData>,
    [SyntaxKind.GreaterThanToken]: Token<SyntaxKind.GreaterThanToken, AstTokenData>,
    [SyntaxKind.LessThanEqualsToken]: Token<SyntaxKind.LessThanEqualsToken, AstTokenData>,
    [SyntaxKind.GreaterThanEqualsToken]: Token<SyntaxKind.GreaterThanEqualsToken, AstTokenData>,
    [SyntaxKind.EqualsEqualsToken]: Token<SyntaxKind.EqualsEqualsToken, AstTokenData>,
    [SyntaxKind.ExclamationEqualsToken]: Token<SyntaxKind.ExclamationEqualsToken, AstTokenData>,
    [SyntaxKind.EqualsEqualsEqualsToken]: Token<SyntaxKind.EqualsEqualsEqualsToken, AstTokenData>,
    [SyntaxKind.ExclamationEqualsEqualsToken]: Token<SyntaxKind.ExclamationEqualsEqualsToken, AstTokenData>,
    [SyntaxKind.EqualsGreaterThanToken]: Token<SyntaxKind.EqualsGreaterThanToken, AstTokenData>,
    [SyntaxKind.PlusToken]: Token<SyntaxKind.PlusToken, AstTokenData>,
    [SyntaxKind.MinusToken]: Token<SyntaxKind.MinusToken, AstTokenData>,
    [SyntaxKind.AsteriskToken]: Token<SyntaxKind.AsteriskToken, AstTokenData>,
    [SyntaxKind.AsteriskAsteriskToken]: Token<SyntaxKind.AsteriskAsteriskToken, AstTokenData>,
    [SyntaxKind.SlashToken]: Token<SyntaxKind.SlashToken, AstTokenData>,
    [SyntaxKind.PercentToken]: Token<SyntaxKind.PercentToken, AstTokenData>,
    [SyntaxKind.PlusPlusToken]: Token<SyntaxKind.PlusPlusToken, AstTokenData>,
    [SyntaxKind.MinusMinusToken]: Token<SyntaxKind.MinusMinusToken, AstTokenData>,
    [SyntaxKind.LessThanLessThanToken]: Token<SyntaxKind.LessThanLessThanToken, AstTokenData>,
    [SyntaxKind.GreaterThanGreaterThanToken]: Token<SyntaxKind.GreaterThanGreaterThanToken, AstTokenData>,
    [SyntaxKind.GreaterThanGreaterThanGreaterThanToken]: Token<SyntaxKind.GreaterThanGreaterThanGreaterThanToken, AstTokenData>,
    [SyntaxKind.AmpersandToken]: Token<SyntaxKind.AmpersandToken, AstTokenData>,
    [SyntaxKind.BarToken]: Token<SyntaxKind.BarToken, AstTokenData>,
    [SyntaxKind.CaretToken]: Token<SyntaxKind.CaretToken, AstTokenData>,
    [SyntaxKind.ExclamationToken]: Token<SyntaxKind.ExclamationToken, AstTokenData>,
    [SyntaxKind.TildeToken]: Token<SyntaxKind.TildeToken, AstTokenData>,
    [SyntaxKind.AmpersandAmpersandToken]: Token<SyntaxKind.AmpersandAmpersandToken, AstTokenData>,
    [SyntaxKind.BarBarToken]: Token<SyntaxKind.BarBarToken, AstTokenData>,
    [SyntaxKind.QuestionToken]: Token<SyntaxKind.QuestionToken, AstTokenData>,
    [SyntaxKind.ColonToken]: Token<SyntaxKind.ColonToken, AstTokenData>,
    [SyntaxKind.AtToken]: Token<SyntaxKind.AtToken, AstTokenData>,
    [SyntaxKind.QuestionQuestionToken]: Token<SyntaxKind.QuestionQuestionToken, AstTokenData>,
    [SyntaxKind.BacktickToken]: Token<SyntaxKind.BacktickToken, AstTokenData>,
    [SyntaxKind.HashToken]: Token<SyntaxKind.HashToken, AstTokenData>,
    [SyntaxKind.EqualsToken]: Token<SyntaxKind.EqualsToken, AstTokenData>,
    [SyntaxKind.PlusEqualsToken]: Token<SyntaxKind.PlusEqualsToken, AstTokenData>,
    [SyntaxKind.MinusEqualsToken]: Token<SyntaxKind.MinusEqualsToken, AstTokenData>,
    [SyntaxKind.AsteriskEqualsToken]: Token<SyntaxKind.AsteriskEqualsToken, AstTokenData>,
    [SyntaxKind.AsteriskAsteriskEqualsToken]: Token<SyntaxKind.AsteriskAsteriskEqualsToken, AstTokenData>,
    [SyntaxKind.SlashEqualsToken]: Token<SyntaxKind.SlashEqualsToken, AstTokenData>,
    [SyntaxKind.PercentEqualsToken]: Token<SyntaxKind.PercentEqualsToken, AstTokenData>,
    [SyntaxKind.LessThanLessThanEqualsToken]: Token<SyntaxKind.LessThanLessThanEqualsToken, AstTokenData>,
    [SyntaxKind.GreaterThanGreaterThanEqualsToken]: Token<SyntaxKind.GreaterThanGreaterThanEqualsToken, AstTokenData>,
    [SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken]: Token<SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken, AstTokenData>,
    [SyntaxKind.AmpersandEqualsToken]: Token<SyntaxKind.AmpersandEqualsToken, AstTokenData>,
    [SyntaxKind.BarEqualsToken]: Token<SyntaxKind.BarEqualsToken, AstTokenData>,
    [SyntaxKind.BarBarEqualsToken]: Token<SyntaxKind.BarBarEqualsToken, AstTokenData>,
    [SyntaxKind.AmpersandAmpersandEqualsToken]: Token<SyntaxKind.AmpersandAmpersandEqualsToken, AstTokenData>,
    [SyntaxKind.QuestionQuestionEqualsToken]: Token<SyntaxKind.QuestionQuestionEqualsToken, AstTokenData>,
    [SyntaxKind.CaretEqualsToken]: Token<SyntaxKind.CaretEqualsToken, AstTokenData>,
    [SyntaxKind.Identifier]: Identifier,
    [SyntaxKind.PrivateIdentifier]: PrivateIdentifier,
    [SyntaxKind.JSDocCommentTextToken]: never,
    [SyntaxKind.BreakKeyword]: Token<SyntaxKind.BreakKeyword, AstTokenData>,
    [SyntaxKind.CaseKeyword]: Token<SyntaxKind.CaseKeyword, AstTokenData>,
    [SyntaxKind.CatchKeyword]: Token<SyntaxKind.CatchKeyword, AstTokenData>,
    [SyntaxKind.ClassKeyword]: Token<SyntaxKind.ClassKeyword, AstTokenData>,
    [SyntaxKind.ConstKeyword]: Token<SyntaxKind.ConstKeyword, AstTokenData>,
    [SyntaxKind.ContinueKeyword]: Token<SyntaxKind.ContinueKeyword, AstTokenData>,
    [SyntaxKind.DebuggerKeyword]: Token<SyntaxKind.DebuggerKeyword, AstTokenData>,
    [SyntaxKind.DefaultKeyword]: Token<SyntaxKind.DefaultKeyword, AstTokenData>,
    [SyntaxKind.DeleteKeyword]: Token<SyntaxKind.DeleteKeyword, AstTokenData>,
    [SyntaxKind.DoKeyword]: Token<SyntaxKind.DoKeyword, AstTokenData>,
    [SyntaxKind.ElseKeyword]: Token<SyntaxKind.ElseKeyword, AstTokenData>,
    [SyntaxKind.EnumKeyword]: Token<SyntaxKind.EnumKeyword, AstTokenData>,
    [SyntaxKind.ExportKeyword]: Token<SyntaxKind.ExportKeyword, AstTokenData>,
    [SyntaxKind.ExtendsKeyword]: Token<SyntaxKind.ExtendsKeyword, AstTokenData>,
    [SyntaxKind.FalseKeyword]: FalseLiteral,
    [SyntaxKind.FinallyKeyword]: Token<SyntaxKind.FinallyKeyword, AstTokenData>,
    [SyntaxKind.ForKeyword]: Token<SyntaxKind.ForKeyword, AstTokenData>,
    [SyntaxKind.FunctionKeyword]: Token<SyntaxKind.FunctionKeyword, AstTokenData>,
    [SyntaxKind.IfKeyword]: Token<SyntaxKind.IfKeyword, AstTokenData>,
    [SyntaxKind.ImportKeyword]: ImportExpression,
    [SyntaxKind.InKeyword]: Token<SyntaxKind.InKeyword, AstTokenData>,
    [SyntaxKind.InstanceOfKeyword]: Token<SyntaxKind.InstanceOfKeyword, AstTokenData>,
    [SyntaxKind.NewKeyword]: Token<SyntaxKind.NewKeyword, AstTokenData>,
    [SyntaxKind.NullKeyword]: NullLiteral,
    [SyntaxKind.ReturnKeyword]: Token<SyntaxKind.ReturnKeyword, AstTokenData>,
    [SyntaxKind.SuperKeyword]: SuperExpression,
    [SyntaxKind.SwitchKeyword]: Token<SyntaxKind.SwitchKeyword, AstTokenData>,
    [SyntaxKind.ThisKeyword]: ThisExpression,
    [SyntaxKind.ThrowKeyword]: Token<SyntaxKind.ThrowKeyword, AstTokenData>,
    [SyntaxKind.TrueKeyword]: TrueLiteral,
    [SyntaxKind.TryKeyword]: Token<SyntaxKind.TryKeyword, AstTokenData>,
    [SyntaxKind.TypeOfKeyword]: Token<SyntaxKind.TypeOfKeyword, AstTokenData>,
    [SyntaxKind.VarKeyword]: Token<SyntaxKind.VarKeyword, AstTokenData>,
    [SyntaxKind.VoidKeyword]: Token<SyntaxKind.VoidKeyword, AstTokenData>,
    [SyntaxKind.WhileKeyword]: Token<SyntaxKind.WhileKeyword, AstTokenData>,
    [SyntaxKind.WithKeyword]: Token<SyntaxKind.WithKeyword, AstTokenData>,
    [SyntaxKind.ImplementsKeyword]: Token<SyntaxKind.ImplementsKeyword, AstTokenData>,
    [SyntaxKind.InterfaceKeyword]: Token<SyntaxKind.InterfaceKeyword, AstTokenData>,
    [SyntaxKind.LetKeyword]: Token<SyntaxKind.LetKeyword, AstTokenData>,
    [SyntaxKind.PackageKeyword]: Token<SyntaxKind.PackageKeyword, AstTokenData>,
    [SyntaxKind.PrivateKeyword]: Token<SyntaxKind.PrivateKeyword, AstTokenData>,
    [SyntaxKind.ProtectedKeyword]: Token<SyntaxKind.ProtectedKeyword, AstTokenData>,
    [SyntaxKind.PublicKeyword]: Token<SyntaxKind.PublicKeyword, AstTokenData>,
    [SyntaxKind.StaticKeyword]: Token<SyntaxKind.StaticKeyword, AstTokenData>,
    [SyntaxKind.YieldKeyword]: Token<SyntaxKind.YieldKeyword, AstTokenData>,
    [SyntaxKind.AbstractKeyword]: Token<SyntaxKind.AbstractKeyword, AstTokenData>,
    [SyntaxKind.AccessorKeyword]: Token<SyntaxKind.AccessorKeyword, AstTokenData>,
    [SyntaxKind.AsKeyword]: Token<SyntaxKind.AsKeyword, AstTokenData>,
    [SyntaxKind.AssertsKeyword]: Token<SyntaxKind.AssertsKeyword, AstTokenData>,
    [SyntaxKind.AssertKeyword]: Token<SyntaxKind.AssertKeyword, AstTokenData>,
    [SyntaxKind.AnyKeyword]: Token<SyntaxKind.AnyKeyword, AstTokenData>,
    [SyntaxKind.AsyncKeyword]: Token<SyntaxKind.AsyncKeyword, AstTokenData>,
    [SyntaxKind.AwaitKeyword]: Token<SyntaxKind.AwaitKeyword, AstTokenData>,
    [SyntaxKind.BooleanKeyword]: Token<SyntaxKind.BooleanKeyword, AstTokenData>,
    [SyntaxKind.ConstructorKeyword]: Token<SyntaxKind.ConstructorKeyword, AstTokenData>,
    [SyntaxKind.DeclareKeyword]: Token<SyntaxKind.DeclareKeyword, AstTokenData>,
    [SyntaxKind.GetKeyword]: Token<SyntaxKind.GetKeyword, AstTokenData>,
    [SyntaxKind.InferKeyword]: Token<SyntaxKind.InferKeyword, AstTokenData>,
    [SyntaxKind.IntrinsicKeyword]: Token<SyntaxKind.IntrinsicKeyword, AstTokenData>,
    [SyntaxKind.IsKeyword]: Token<SyntaxKind.IsKeyword, AstTokenData>,
    [SyntaxKind.KeyOfKeyword]: Token<SyntaxKind.KeyOfKeyword, AstTokenData>,
    [SyntaxKind.ModuleKeyword]: Token<SyntaxKind.ModuleKeyword, AstTokenData>,
    [SyntaxKind.NamespaceKeyword]: Token<SyntaxKind.NamespaceKeyword, AstTokenData>,
    [SyntaxKind.NeverKeyword]: Token<SyntaxKind.NeverKeyword, AstTokenData>,
    [SyntaxKind.OutKeyword]: Token<SyntaxKind.OutKeyword, AstTokenData>,
    [SyntaxKind.ReadonlyKeyword]: Token<SyntaxKind.ReadonlyKeyword, AstTokenData>,
    [SyntaxKind.RequireKeyword]: Token<SyntaxKind.RequireKeyword, AstTokenData>,
    [SyntaxKind.NumberKeyword]: Token<SyntaxKind.NumberKeyword, AstTokenData>,
    [SyntaxKind.ObjectKeyword]: Token<SyntaxKind.ObjectKeyword, AstTokenData>,
    [SyntaxKind.SatisfiesKeyword]: Token<SyntaxKind.SatisfiesKeyword, AstTokenData>,
    [SyntaxKind.SetKeyword]: Token<SyntaxKind.SetKeyword, AstTokenData>,
    [SyntaxKind.StringKeyword]: Token<SyntaxKind.StringKeyword, AstTokenData>,
    [SyntaxKind.SymbolKeyword]: Token<SyntaxKind.SymbolKeyword, AstTokenData>,
    [SyntaxKind.TypeKeyword]: Token<SyntaxKind.TypeKeyword, AstTokenData>,
    [SyntaxKind.UndefinedKeyword]: Token<SyntaxKind.UndefinedKeyword, AstTokenData>,
    [SyntaxKind.UniqueKeyword]: Token<SyntaxKind.UniqueKeyword, AstTokenData>,
    [SyntaxKind.UnknownKeyword]: Token<SyntaxKind.UnknownKeyword, AstTokenData>,
    [SyntaxKind.UsingKeyword]: Token<SyntaxKind.UsingKeyword, AstTokenData>,
    [SyntaxKind.FromKeyword]: Token<SyntaxKind.FromKeyword, AstTokenData>,
    [SyntaxKind.GlobalKeyword]: Token<SyntaxKind.GlobalKeyword, AstTokenData>,
    [SyntaxKind.BigIntKeyword]: Token<SyntaxKind.BigIntKeyword, AstTokenData>,
    [SyntaxKind.OverrideKeyword]: Token<SyntaxKind.OverrideKeyword, AstTokenData>,
    [SyntaxKind.OfKeyword]: Token<SyntaxKind.OfKeyword, AstTokenData>,
    [SyntaxKind.QualifiedName]: QualifiedName,
    [SyntaxKind.ComputedPropertyName]: ComputedPropertyName,
    [SyntaxKind.Decorator]: Decorator,
    [SyntaxKind.TypeParameter]: TypeParameterDeclaration,
    [SyntaxKind.CallSignature]: CallSignatureDeclaration,
    [SyntaxKind.ConstructSignature]: ConstructSignatureDeclaration,
    [SyntaxKind.VariableDeclaration]: VariableDeclaration,
    [SyntaxKind.VariableDeclarationList]: VariableDeclarationList,
    [SyntaxKind.Parameter]: ParameterDeclaration,
    [SyntaxKind.BindingElement]: BindingElement,
    [SyntaxKind.PropertySignature]: PropertySignature,
    [SyntaxKind.PropertyDeclaration]: PropertyDeclaration,
    [SyntaxKind.PropertyAssignment]: PropertyAssignment,
    [SyntaxKind.ShorthandPropertyAssignment]: ShorthandPropertyAssignment,
    [SyntaxKind.SpreadAssignment]: SpreadAssignment,
    [SyntaxKind.ObjectBindingPattern]: ObjectBindingPattern,
    [SyntaxKind.ArrayBindingPattern]: ArrayBindingPattern,
    [SyntaxKind.FunctionDeclaration]: FunctionDeclaration,
    [SyntaxKind.MethodSignature]: MethodSignature,
    [SyntaxKind.MethodDeclaration]: MethodDeclaration,
    [SyntaxKind.Constructor]: ConstructorDeclaration,
    [SyntaxKind.SemicolonClassElement]: SemicolonClassElement,
    [SyntaxKind.GetAccessor]: GetAccessorDeclaration,
    [SyntaxKind.SetAccessor]: SetAccessorDeclaration,
    [SyntaxKind.IndexSignature]: IndexSignatureDeclaration,
    [SyntaxKind.ClassStaticBlockDeclaration]: ClassStaticBlockDeclaration,
    [SyntaxKind.ImportTypeAssertionContainer]: ImportTypeAssertionContainer,
    [SyntaxKind.ImportType]: ImportTypeNode,
    [SyntaxKind.ThisType]: ThisTypeNode,
    [SyntaxKind.FunctionType]: FunctionTypeNode,
    [SyntaxKind.ConstructorType]: ConstructorTypeNode,
    [SyntaxKind.TypeReference]: TypeReferenceNode,
    [SyntaxKind.TypePredicate]: TypePredicateNode,
    [SyntaxKind.TypeQuery]: TypeQueryNode,
    [SyntaxKind.TypeLiteral]: TypeLiteralNode,
    [SyntaxKind.ArrayType]: ArrayTypeNode,
    [SyntaxKind.TupleType]: TupleTypeNode,
    [SyntaxKind.NamedTupleMember]: NamedTupleMember,
    [SyntaxKind.OptionalType]: OptionalTypeNode,
    [SyntaxKind.RestType]: RestTypeNode,
    [SyntaxKind.UnionType]: UnionTypeNode,
    [SyntaxKind.IntersectionType]: IntersectionTypeNode,
    [SyntaxKind.ConditionalType]: ConditionalTypeNode,
    [SyntaxKind.InferType]: InferTypeNode,
    [SyntaxKind.ParenthesizedType]: ParenthesizedTypeNode,
    [SyntaxKind.TypeOperator]: TypeOperatorNode,
    [SyntaxKind.IndexedAccessType]: IndexedAccessTypeNode,
    [SyntaxKind.MappedType]: MappedTypeNode,
    [SyntaxKind.LiteralType]: LiteralTypeNode,
    [SyntaxKind.TemplateLiteralType]: TemplateLiteralTypeNode,
    [SyntaxKind.TemplateLiteralTypeSpan]: TemplateLiteralTypeSpan,
    [SyntaxKind.OmittedExpression]: OmittedExpression,
    [SyntaxKind.PrefixUnaryExpression]: PrefixUnaryExpression,
    [SyntaxKind.PostfixUnaryExpression]: PostfixUnaryExpression,
    [SyntaxKind.DeleteExpression]: DeleteExpression,
    [SyntaxKind.TypeOfExpression]: TypeOfExpression,
    [SyntaxKind.VoidExpression]: VoidExpression,
    [SyntaxKind.AwaitExpression]: AwaitExpression,
    [SyntaxKind.YieldExpression]: YieldExpression,
    [SyntaxKind.BinaryExpression]: BinaryExpression,
    [SyntaxKind.ConditionalExpression]: ConditionalExpression,
    [SyntaxKind.FunctionExpression]: FunctionExpression,
    [SyntaxKind.ArrowFunction]: ArrowFunction,
    [SyntaxKind.TemplateExpression]: TemplateExpression,
    [SyntaxKind.TemplateSpan]: TemplateSpan,
    [SyntaxKind.ParenthesizedExpression]: ParenthesizedExpression,
    [SyntaxKind.ArrayLiteralExpression]: ArrayLiteralExpression,
    [SyntaxKind.SpreadElement]: SpreadElement,
    [SyntaxKind.ObjectLiteralExpression]: ObjectLiteralExpression,
    [SyntaxKind.PropertyAccessExpression]: PropertyAccessExpression,
    [SyntaxKind.ElementAccessExpression]: ElementAccessExpression,
    [SyntaxKind.CallExpression]: CallExpression,
    [SyntaxKind.ExpressionWithTypeArguments]: ExpressionWithTypeArguments,
    [SyntaxKind.NewExpression]: NewExpression,
    [SyntaxKind.TaggedTemplateExpression]: TaggedTemplateExpression,
    [SyntaxKind.AsExpression]: AsExpression,
    [SyntaxKind.TypeAssertionExpression]: TypeAssertion,
    [SyntaxKind.SyntheticExpression]: SyntheticExpression,
    [SyntaxKind.SatisfiesExpression]: SatisfiesExpression,
    [SyntaxKind.NonNullExpression]: NonNullExpression,
    [SyntaxKind.MetaProperty]: MetaProperty,
    [SyntaxKind.JsxElement]: JsxElement,
    [SyntaxKind.JsxAttributes]: JsxAttributes,
    [SyntaxKind.JsxNamespacedName]: JsxNamespacedName,
    [SyntaxKind.JsxOpeningElement]: JsxOpeningElement,
    [SyntaxKind.JsxSelfClosingElement]: JsxSelfClosingElement,
    [SyntaxKind.JsxFragment]: JsxFragment,
    [SyntaxKind.JsxOpeningFragment]: JsxOpeningFragment,
    [SyntaxKind.JsxClosingFragment]: JsxClosingFragment,
    [SyntaxKind.JsxAttribute]: JsxAttribute,
    [SyntaxKind.JsxSpreadAttribute]: JsxSpreadAttribute,
    [SyntaxKind.JsxClosingElement]: JsxClosingElement,
    [SyntaxKind.JsxExpression]: JsxExpression,
    [SyntaxKind.EmptyStatement]: EmptyStatement,
    [SyntaxKind.DebuggerStatement]: DebuggerStatement,
    [SyntaxKind.MissingDeclaration]: MissingDeclaration,
    [SyntaxKind.Block]: Block,
    [SyntaxKind.VariableStatement]: VariableStatement,
    [SyntaxKind.ExpressionStatement]: ExpressionStatement,
    [SyntaxKind.IfStatement]: IfStatement,
    [SyntaxKind.DoStatement]: DoStatement,
    [SyntaxKind.WhileStatement]: WhileStatement,
    [SyntaxKind.ForStatement]: ForStatement,
    [SyntaxKind.ForInStatement]: ForInStatement,
    [SyntaxKind.ForOfStatement]: ForOfStatement,
    [SyntaxKind.BreakStatement]: BreakStatement,
    [SyntaxKind.ContinueStatement]: ContinueStatement,
    [SyntaxKind.ReturnStatement]: ReturnStatement,
    [SyntaxKind.WithStatement]: WithStatement,
    [SyntaxKind.SwitchStatement]: SwitchStatement,
    [SyntaxKind.CaseBlock]: CaseBlock,
    [SyntaxKind.CaseClause]: CaseClause,
    [SyntaxKind.DefaultClause]: DefaultClause,
    [SyntaxKind.LabeledStatement]: LabeledStatement,
    [SyntaxKind.ThrowStatement]: ThrowStatement,
    [SyntaxKind.TryStatement]: TryStatement,
    [SyntaxKind.CatchClause]: CatchClause,
    [SyntaxKind.ClassDeclaration]: ClassDeclaration,
    [SyntaxKind.ClassExpression]: ClassExpression,
    [SyntaxKind.InterfaceDeclaration]: InterfaceDeclaration,
    [SyntaxKind.HeritageClause]: HeritageClause,
    [SyntaxKind.TypeAliasDeclaration]: TypeAliasDeclaration,
    [SyntaxKind.EnumMember]: EnumMember,
    [SyntaxKind.EnumDeclaration]: EnumDeclaration,
    [SyntaxKind.ModuleDeclaration]: ModuleDeclaration,
    [SyntaxKind.ModuleBlock]: ModuleBlock,
    [SyntaxKind.ImportEqualsDeclaration]: ImportEqualsDeclaration,
    [SyntaxKind.ExternalModuleReference]: ExternalModuleReference,
    [SyntaxKind.ImportDeclaration]: ImportDeclaration,
    [SyntaxKind.ImportClause]: ImportClause,
    [SyntaxKind.ImportAttribute]: ImportAttribute,
    [SyntaxKind.ImportAttributes]: ImportAttributes,
    [SyntaxKind.NamespaceImport]: NamespaceImport,
    [SyntaxKind.NamespaceExport]: NamespaceExport,
    [SyntaxKind.NamespaceExportDeclaration]: NamespaceExportDeclaration,
    [SyntaxKind.ExportDeclaration]: ExportDeclaration,
    [SyntaxKind.NamedImports]: NamedImports,
    [SyntaxKind.NamedExports]: NamedExports,
    [SyntaxKind.ImportSpecifier]: ImportSpecifier,
    [SyntaxKind.ExportSpecifier]: ExportSpecifier,
    [SyntaxKind.ExportAssignment]: ExportAssignment,
    [SyntaxKind.JSDocTypeExpression]: JSDocTypeExpression,
    [SyntaxKind.JSDocNameReference]: JSDocNameReference,
    [SyntaxKind.JSDocMemberName]: JSDocMemberName,
    [SyntaxKind.JSDocAllType]: JSDocAllType,
    [SyntaxKind.JSDocUnknownType]: JSDocUnknownType,
    [SyntaxKind.JSDocNonNullableType]: JSDocNonNullableType,
    [SyntaxKind.JSDocNullableType]: JSDocNullableType,
    [SyntaxKind.JSDocOptionalType]: JSDocOptionalType,
    [SyntaxKind.JSDocFunctionType]: JSDocFunctionType,
    [SyntaxKind.JSDocVariadicType]: JSDocVariadicType,
    [SyntaxKind.JSDocNamepathType]: JSDocNamepathType,
    [SyntaxKind.JSDoc]: JSDocNode,
    [SyntaxKind.JSDocLink]: JSDocLink,
    [SyntaxKind.JSDocLinkCode]: JSDocLinkCode,
    [SyntaxKind.JSDocLinkPlain]: JSDocLinkPlain,
    [SyntaxKind.JSDocText]: JSDocText,
    [SyntaxKind.JSDocTag]: JSDocUnknownTag,
    [SyntaxKind.JSDocAugmentsTag]: JSDocAugmentsTag,
    [SyntaxKind.JSDocImplementsTag]: JSDocImplementsTag,
    [SyntaxKind.JSDocAuthorTag]: JSDocAuthorTag,
    [SyntaxKind.JSDocDeprecatedTag]: JSDocDeprecatedTag,
    [SyntaxKind.JSDocClassTag]: JSDocClassTag,
    [SyntaxKind.JSDocPublicTag]: JSDocPublicTag,
    [SyntaxKind.JSDocPrivateTag]: JSDocPrivateTag,
    [SyntaxKind.JSDocProtectedTag]: JSDocProtectedTag,
    [SyntaxKind.JSDocReadonlyTag]: JSDocReadonlyTag,
    [SyntaxKind.JSDocOverrideTag]: JSDocOverrideTag,
    [SyntaxKind.JSDocEnumTag]: JSDocEnumTag,
    [SyntaxKind.JSDocThisTag]: JSDocThisTag,
    [SyntaxKind.JSDocTemplateTag]: JSDocTemplateTag,
    [SyntaxKind.JSDocSeeTag]: JSDocSeeTag,
    [SyntaxKind.JSDocReturnTag]: JSDocReturnTag,
    [SyntaxKind.JSDocTypeTag]: JSDocTypeTag,
    [SyntaxKind.JSDocTypedefTag]: JSDocTypedefTag,
    [SyntaxKind.JSDocCallbackTag]: JSDocCallbackTag,
    [SyntaxKind.JSDocOverloadTag]: JSDocOverloadTag,
    [SyntaxKind.JSDocThrowsTag]: JSDocThrowsTag,
    [SyntaxKind.JSDocSignature]: JSDocSignature,
    [SyntaxKind.JSDocPropertyTag]: JSDocPropertyTag,
    [SyntaxKind.JSDocParameterTag]: JSDocParameterTag,
    [SyntaxKind.JSDocTypeLiteral]: JSDocTypeLiteral,
    [SyntaxKind.JSDocSatisfiesTag]: JSDocSatisfiesTag,
    [SyntaxKind.JSDocImportTag]: JSDocImportTag,
    [SyntaxKind.SourceFile]: SourceFile,
    [SyntaxKind.Bundle]: Bundle,
    [SyntaxKind.SyntaxList]: SyntaxList,
    [SyntaxKind.NotEmittedStatement]: NotEmittedStatement,
    [SyntaxKind.NotEmittedTypeElement]: NotEmittedTypeElement,
    [SyntaxKind.PartiallyEmittedExpression]: PartiallyEmittedExpression,
    [SyntaxKind.CommaListExpression]: CommaListExpression,
    [SyntaxKind.SyntheticReferenceExpression]: SyntheticReferenceExpression,
    [SyntaxKind.Count]: never,
    [SyntaxKind.NonTextFileMarkerTrivia]: never,
}

/** @internal */
export interface AstNodeType {
    [SyntaxKind.Unknown]: AstToken<SyntaxKind.Unknown>,
    [SyntaxKind.EndOfFileToken]: AstEndOfFileToken,
    [SyntaxKind.SingleLineCommentTrivia]: AstToken<SyntaxKind.SingleLineCommentTrivia>,
    [SyntaxKind.MultiLineCommentTrivia]: AstToken<SyntaxKind.MultiLineCommentTrivia>,
    [SyntaxKind.NewLineTrivia]: AstToken<SyntaxKind.NewLineTrivia>,
    [SyntaxKind.WhitespaceTrivia]: AstToken<SyntaxKind.WhitespaceTrivia>,
    [SyntaxKind.ShebangTrivia]: AstToken<SyntaxKind.ShebangTrivia>,
    [SyntaxKind.ConflictMarkerTrivia]: AstToken<SyntaxKind.ConflictMarkerTrivia>,
    [SyntaxKind.NonTextFileMarkerTrivia]: never,
    [SyntaxKind.NumericLiteral]: AstNumericLiteral,
    [SyntaxKind.BigIntLiteral]: AstBigIntLiteral,
    [SyntaxKind.StringLiteral]: AstStringLiteral,
    [SyntaxKind.JsxText]: AstJsxText,
    [SyntaxKind.JsxTextAllWhiteSpaces]: never,
    [SyntaxKind.RegularExpressionLiteral]: AstRegularExpressionLiteral,
    [SyntaxKind.NoSubstitutionTemplateLiteral]: AstNoSubstitutionTemplateLiteral,
    [SyntaxKind.TemplateHead]: AstTemplateHead,
    [SyntaxKind.TemplateMiddle]: AstTemplateMiddle,
    [SyntaxKind.TemplateTail]: AstTemplateTail,
    [SyntaxKind.OpenBraceToken]: AstToken<SyntaxKind.OpenBraceToken>,
    [SyntaxKind.CloseBraceToken]: AstToken<SyntaxKind.CloseBraceToken>,
    [SyntaxKind.OpenParenToken]: AstToken<SyntaxKind.OpenParenToken>,
    [SyntaxKind.CloseParenToken]: AstToken<SyntaxKind.CloseParenToken>,
    [SyntaxKind.OpenBracketToken]: AstToken<SyntaxKind.OpenBracketToken>,
    [SyntaxKind.CloseBracketToken]: AstToken<SyntaxKind.CloseBracketToken>,
    [SyntaxKind.DotToken]: AstToken<SyntaxKind.DotToken>,
    [SyntaxKind.DotDotDotToken]: AstToken<SyntaxKind.DotDotDotToken>,
    [SyntaxKind.SemicolonToken]: AstToken<SyntaxKind.SemicolonToken>,
    [SyntaxKind.CommaToken]: AstToken<SyntaxKind.CommaToken>,
    [SyntaxKind.QuestionDotToken]: AstToken<SyntaxKind.QuestionDotToken>,
    [SyntaxKind.LessThanToken]: AstToken<SyntaxKind.LessThanToken>,
    [SyntaxKind.LessThanSlashToken]: AstToken<SyntaxKind.LessThanSlashToken>,
    [SyntaxKind.GreaterThanToken]: AstToken<SyntaxKind.GreaterThanToken>,
    [SyntaxKind.LessThanEqualsToken]: AstToken<SyntaxKind.LessThanEqualsToken>,
    [SyntaxKind.GreaterThanEqualsToken]: AstToken<SyntaxKind.GreaterThanEqualsToken>,
    [SyntaxKind.EqualsEqualsToken]: AstToken<SyntaxKind.EqualsEqualsToken>,
    [SyntaxKind.ExclamationEqualsToken]: AstToken<SyntaxKind.ExclamationEqualsToken>,
    [SyntaxKind.EqualsEqualsEqualsToken]: AstToken<SyntaxKind.EqualsEqualsEqualsToken>,
    [SyntaxKind.ExclamationEqualsEqualsToken]: AstToken<SyntaxKind.ExclamationEqualsEqualsToken>,
    [SyntaxKind.EqualsGreaterThanToken]: AstToken<SyntaxKind.EqualsGreaterThanToken>,
    [SyntaxKind.PlusToken]: AstToken<SyntaxKind.PlusToken>,
    [SyntaxKind.MinusToken]: AstToken<SyntaxKind.MinusToken>,
    [SyntaxKind.AsteriskToken]: AstToken<SyntaxKind.AsteriskToken>,
    [SyntaxKind.AsteriskAsteriskToken]: AstToken<SyntaxKind.AsteriskAsteriskToken>,
    [SyntaxKind.SlashToken]: AstToken<SyntaxKind.SlashToken>,
    [SyntaxKind.PercentToken]: AstToken<SyntaxKind.PercentToken>,
    [SyntaxKind.PlusPlusToken]: AstToken<SyntaxKind.PlusPlusToken>,
    [SyntaxKind.MinusMinusToken]: AstToken<SyntaxKind.MinusMinusToken>,
    [SyntaxKind.LessThanLessThanToken]: AstToken<SyntaxKind.LessThanLessThanToken>,
    [SyntaxKind.GreaterThanGreaterThanToken]: AstToken<SyntaxKind.GreaterThanGreaterThanToken>,
    [SyntaxKind.GreaterThanGreaterThanGreaterThanToken]: AstToken<SyntaxKind.GreaterThanGreaterThanGreaterThanToken>,
    [SyntaxKind.AmpersandToken]: AstToken<SyntaxKind.AmpersandToken>,
    [SyntaxKind.BarToken]: AstToken<SyntaxKind.BarToken>,
    [SyntaxKind.CaretToken]: AstToken<SyntaxKind.CaretToken>,
    [SyntaxKind.ExclamationToken]: AstToken<SyntaxKind.ExclamationToken>,
    [SyntaxKind.TildeToken]: AstToken<SyntaxKind.TildeToken>,
    [SyntaxKind.AmpersandAmpersandToken]: AstToken<SyntaxKind.AmpersandAmpersandToken>,
    [SyntaxKind.BarBarToken]: AstToken<SyntaxKind.BarBarToken>,
    [SyntaxKind.QuestionToken]: AstToken<SyntaxKind.QuestionToken>,
    [SyntaxKind.ColonToken]: AstToken<SyntaxKind.ColonToken>,
    [SyntaxKind.AtToken]: AstToken<SyntaxKind.AtToken>,
    [SyntaxKind.QuestionQuestionToken]: AstToken<SyntaxKind.QuestionQuestionToken>,
    [SyntaxKind.BacktickToken]: AstToken<SyntaxKind.BacktickToken>,
    [SyntaxKind.HashToken]: AstToken<SyntaxKind.HashToken>,
    [SyntaxKind.EqualsToken]: AstToken<SyntaxKind.EqualsToken>,
    [SyntaxKind.PlusEqualsToken]: AstToken<SyntaxKind.PlusEqualsToken>,
    [SyntaxKind.MinusEqualsToken]: AstToken<SyntaxKind.MinusEqualsToken>,
    [SyntaxKind.AsteriskEqualsToken]: AstToken<SyntaxKind.AsteriskEqualsToken>,
    [SyntaxKind.AsteriskAsteriskEqualsToken]: AstToken<SyntaxKind.AsteriskAsteriskEqualsToken>,
    [SyntaxKind.SlashEqualsToken]: AstToken<SyntaxKind.SlashEqualsToken>,
    [SyntaxKind.PercentEqualsToken]: AstToken<SyntaxKind.PercentEqualsToken>,
    [SyntaxKind.LessThanLessThanEqualsToken]: AstToken<SyntaxKind.LessThanLessThanEqualsToken>,
    [SyntaxKind.GreaterThanGreaterThanEqualsToken]: AstToken<SyntaxKind.GreaterThanGreaterThanEqualsToken>,
    [SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken]: AstToken<SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken>,
    [SyntaxKind.AmpersandEqualsToken]: AstToken<SyntaxKind.AmpersandEqualsToken>,
    [SyntaxKind.BarEqualsToken]: AstToken<SyntaxKind.BarEqualsToken>,
    [SyntaxKind.BarBarEqualsToken]: AstToken<SyntaxKind.BarBarEqualsToken>,
    [SyntaxKind.AmpersandAmpersandEqualsToken]: AstToken<SyntaxKind.AmpersandAmpersandEqualsToken>,
    [SyntaxKind.QuestionQuestionEqualsToken]: AstToken<SyntaxKind.QuestionQuestionEqualsToken>,
    [SyntaxKind.CaretEqualsToken]: AstToken<SyntaxKind.CaretEqualsToken>,
    [SyntaxKind.Identifier]: AstIdentifier,
    [SyntaxKind.PrivateIdentifier]: AstPrivateIdentifier,
    [SyntaxKind.JSDocCommentTextToken]: never,
    [SyntaxKind.BreakKeyword]: AstToken<SyntaxKind.BreakKeyword>,
    [SyntaxKind.CaseKeyword]: AstToken<SyntaxKind.CaseKeyword>,
    [SyntaxKind.CatchKeyword]: AstToken<SyntaxKind.CatchKeyword>,
    [SyntaxKind.ClassKeyword]: AstToken<SyntaxKind.ClassKeyword>,
    [SyntaxKind.ConstKeyword]: AstToken<SyntaxKind.ConstKeyword>,
    [SyntaxKind.ContinueKeyword]: AstToken<SyntaxKind.ContinueKeyword>,
    [SyntaxKind.DebuggerKeyword]: AstToken<SyntaxKind.DebuggerKeyword>,
    [SyntaxKind.DefaultKeyword]: AstToken<SyntaxKind.DefaultKeyword>,
    [SyntaxKind.DeleteKeyword]: AstToken<SyntaxKind.DeleteKeyword>,
    [SyntaxKind.DoKeyword]: AstToken<SyntaxKind.DoKeyword>,
    [SyntaxKind.ElseKeyword]: AstToken<SyntaxKind.ElseKeyword>,
    [SyntaxKind.EnumKeyword]: AstToken<SyntaxKind.EnumKeyword>,
    [SyntaxKind.ExportKeyword]: AstToken<SyntaxKind.ExportKeyword>,
    [SyntaxKind.ExtendsKeyword]: AstToken<SyntaxKind.ExtendsKeyword>,
    [SyntaxKind.FalseKeyword]: AstFalseLiteral,
    [SyntaxKind.FinallyKeyword]: AstToken<SyntaxKind.FinallyKeyword>,
    [SyntaxKind.ForKeyword]: AstToken<SyntaxKind.ForKeyword>,
    [SyntaxKind.FunctionKeyword]: AstToken<SyntaxKind.FunctionKeyword>,
    [SyntaxKind.IfKeyword]: AstToken<SyntaxKind.IfKeyword>,
    [SyntaxKind.ImportKeyword]: AstImportExpression,
    [SyntaxKind.InKeyword]: AstToken<SyntaxKind.InKeyword>,
    [SyntaxKind.InstanceOfKeyword]: AstToken<SyntaxKind.InstanceOfKeyword>,
    [SyntaxKind.NewKeyword]: AstToken<SyntaxKind.NewKeyword>,
    [SyntaxKind.NullKeyword]: AstNullLiteral,
    [SyntaxKind.ReturnKeyword]: AstToken<SyntaxKind.ReturnKeyword>,
    [SyntaxKind.SuperKeyword]: AstSuperExpression,
    [SyntaxKind.SwitchKeyword]: AstToken<SyntaxKind.SwitchKeyword>,
    [SyntaxKind.ThisKeyword]: AstThisExpression,
    [SyntaxKind.ThrowKeyword]: AstToken<SyntaxKind.ThrowKeyword>,
    [SyntaxKind.TrueKeyword]: AstTrueLiteral,
    [SyntaxKind.TryKeyword]: AstToken<SyntaxKind.TryKeyword>,
    [SyntaxKind.TypeOfKeyword]: AstToken<SyntaxKind.TypeOfKeyword>,
    [SyntaxKind.VarKeyword]: AstToken<SyntaxKind.VarKeyword>,
    [SyntaxKind.VoidKeyword]: AstToken<SyntaxKind.VoidKeyword>,
    [SyntaxKind.WhileKeyword]: AstToken<SyntaxKind.WhileKeyword>,
    [SyntaxKind.WithKeyword]: AstToken<SyntaxKind.WithKeyword>,
    [SyntaxKind.ImplementsKeyword]: AstToken<SyntaxKind.ImplementsKeyword>,
    [SyntaxKind.InterfaceKeyword]: AstToken<SyntaxKind.InterfaceKeyword>,
    [SyntaxKind.LetKeyword]: AstToken<SyntaxKind.LetKeyword>,
    [SyntaxKind.PackageKeyword]: AstToken<SyntaxKind.PackageKeyword>,
    [SyntaxKind.PrivateKeyword]: AstToken<SyntaxKind.PrivateKeyword>,
    [SyntaxKind.ProtectedKeyword]: AstToken<SyntaxKind.ProtectedKeyword>,
    [SyntaxKind.PublicKeyword]: AstToken<SyntaxKind.PublicKeyword>,
    [SyntaxKind.StaticKeyword]: AstToken<SyntaxKind.StaticKeyword>,
    [SyntaxKind.YieldKeyword]: AstToken<SyntaxKind.YieldKeyword>,
    [SyntaxKind.AbstractKeyword]: AstToken<SyntaxKind.AbstractKeyword>,
    [SyntaxKind.AccessorKeyword]: AstToken<SyntaxKind.AccessorKeyword>,
    [SyntaxKind.AsKeyword]: AstToken<SyntaxKind.AsKeyword>,
    [SyntaxKind.AssertsKeyword]: AstToken<SyntaxKind.AssertsKeyword>,
    [SyntaxKind.AssertKeyword]: AstToken<SyntaxKind.AssertKeyword>,
    [SyntaxKind.AnyKeyword]: AstToken<SyntaxKind.AnyKeyword>,
    [SyntaxKind.AsyncKeyword]: AstToken<SyntaxKind.AsyncKeyword>,
    [SyntaxKind.AwaitKeyword]: AstToken<SyntaxKind.AwaitKeyword>,
    [SyntaxKind.BooleanKeyword]: AstToken<SyntaxKind.BooleanKeyword>,
    [SyntaxKind.ConstructorKeyword]: AstToken<SyntaxKind.ConstructorKeyword>,
    [SyntaxKind.DeclareKeyword]: AstToken<SyntaxKind.DeclareKeyword>,
    [SyntaxKind.GetKeyword]: AstToken<SyntaxKind.GetKeyword>,
    [SyntaxKind.InferKeyword]: AstToken<SyntaxKind.InferKeyword>,
    [SyntaxKind.IntrinsicKeyword]: AstToken<SyntaxKind.IntrinsicKeyword>,
    [SyntaxKind.IsKeyword]: AstToken<SyntaxKind.IsKeyword>,
    [SyntaxKind.KeyOfKeyword]: AstToken<SyntaxKind.KeyOfKeyword>,
    [SyntaxKind.ModuleKeyword]: AstToken<SyntaxKind.ModuleKeyword>,
    [SyntaxKind.NamespaceKeyword]: AstToken<SyntaxKind.NamespaceKeyword>,
    [SyntaxKind.NeverKeyword]: AstToken<SyntaxKind.NeverKeyword>,
    [SyntaxKind.OutKeyword]: AstToken<SyntaxKind.OutKeyword>,
    [SyntaxKind.ReadonlyKeyword]: AstToken<SyntaxKind.ReadonlyKeyword>,
    [SyntaxKind.RequireKeyword]: AstToken<SyntaxKind.RequireKeyword>,
    [SyntaxKind.NumberKeyword]: AstToken<SyntaxKind.NumberKeyword>,
    [SyntaxKind.ObjectKeyword]: AstToken<SyntaxKind.ObjectKeyword>,
    [SyntaxKind.SatisfiesKeyword]: AstToken<SyntaxKind.SatisfiesKeyword>,
    [SyntaxKind.SetKeyword]: AstToken<SyntaxKind.SetKeyword>,
    [SyntaxKind.StringKeyword]: AstToken<SyntaxKind.StringKeyword>,
    [SyntaxKind.SymbolKeyword]: AstToken<SyntaxKind.SymbolKeyword>,
    [SyntaxKind.TypeKeyword]: AstToken<SyntaxKind.TypeKeyword>,
    [SyntaxKind.UndefinedKeyword]: AstToken<SyntaxKind.UndefinedKeyword>,
    [SyntaxKind.UniqueKeyword]: AstToken<SyntaxKind.UniqueKeyword>,
    [SyntaxKind.UnknownKeyword]: AstToken<SyntaxKind.UnknownKeyword>,
    [SyntaxKind.UsingKeyword]: AstToken<SyntaxKind.UsingKeyword>,
    [SyntaxKind.FromKeyword]: AstToken<SyntaxKind.FromKeyword>,
    [SyntaxKind.GlobalKeyword]: AstToken<SyntaxKind.GlobalKeyword>,
    [SyntaxKind.BigIntKeyword]: AstToken<SyntaxKind.BigIntKeyword>,
    [SyntaxKind.OverrideKeyword]: AstToken<SyntaxKind.OverrideKeyword>,
    [SyntaxKind.OfKeyword]: AstToken<SyntaxKind.OfKeyword>,
    [SyntaxKind.QualifiedName]: AstQualifiedName,
    [SyntaxKind.ComputedPropertyName]: AstComputedPropertyName,
    [SyntaxKind.Decorator]: AstDecorator,
    [SyntaxKind.TypeParameter]: AstTypeParameterDeclaration,
    [SyntaxKind.CallSignature]: AstCallSignatureDeclaration,
    [SyntaxKind.ConstructSignature]: AstConstructSignatureDeclaration,
    [SyntaxKind.VariableDeclaration]: AstVariableDeclaration,
    [SyntaxKind.VariableDeclarationList]: AstVariableDeclarationList,
    [SyntaxKind.Parameter]: AstParameterDeclaration,
    [SyntaxKind.BindingElement]: AstBindingElement,
    [SyntaxKind.PropertySignature]: AstPropertySignature,
    [SyntaxKind.PropertyDeclaration]: AstPropertyDeclaration,
    [SyntaxKind.PropertyAssignment]: AstPropertyAssignment,
    [SyntaxKind.ShorthandPropertyAssignment]: AstShorthandPropertyAssignment,
    [SyntaxKind.SpreadAssignment]: AstSpreadAssignment,
    [SyntaxKind.ObjectBindingPattern]: AstObjectBindingPattern,
    [SyntaxKind.ArrayBindingPattern]: AstArrayBindingPattern,
    [SyntaxKind.FunctionDeclaration]: AstFunctionDeclaration,
    [SyntaxKind.MethodSignature]: AstMethodSignature,
    [SyntaxKind.MethodDeclaration]: AstMethodDeclaration,
    [SyntaxKind.Constructor]: AstConstructorDeclaration,
    [SyntaxKind.SemicolonClassElement]: AstSemicolonClassElement,
    [SyntaxKind.GetAccessor]: AstGetAccessorDeclaration,
    [SyntaxKind.SetAccessor]: AstSetAccessorDeclaration,
    [SyntaxKind.IndexSignature]: AstIndexSignatureDeclaration,
    [SyntaxKind.ClassStaticBlockDeclaration]: AstClassStaticBlockDeclaration,
    [SyntaxKind.ImportTypeAssertionContainer]: AstImportTypeAssertionContainer,
    [SyntaxKind.ImportType]: AstImportTypeNode,
    [SyntaxKind.ThisType]: AstThisTypeNode,
    [SyntaxKind.FunctionType]: AstFunctionTypeNode,
    [SyntaxKind.ConstructorType]: AstConstructorTypeNode,
    [SyntaxKind.TypeReference]: AstTypeReferenceNode,
    [SyntaxKind.TypePredicate]: AstTypePredicateNode,
    [SyntaxKind.TypeQuery]: AstTypeQueryNode,
    [SyntaxKind.TypeLiteral]: AstTypeLiteralNode,
    [SyntaxKind.ArrayType]: AstArrayTypeNode,
    [SyntaxKind.TupleType]: AstTupleTypeNode,
    [SyntaxKind.NamedTupleMember]: AstNamedTupleMember,
    [SyntaxKind.OptionalType]: AstOptionalTypeNode,
    [SyntaxKind.RestType]: AstRestTypeNode,
    [SyntaxKind.UnionType]: AstUnionTypeNode,
    [SyntaxKind.IntersectionType]: AstIntersectionTypeNode,
    [SyntaxKind.ConditionalType]: AstConditionalTypeNode,
    [SyntaxKind.InferType]: AstInferTypeNode,
    [SyntaxKind.ParenthesizedType]: AstParenthesizedTypeNode,
    [SyntaxKind.TypeOperator]: AstTypeOperatorNode,
    [SyntaxKind.IndexedAccessType]: AstIndexedAccessTypeNode,
    [SyntaxKind.MappedType]: AstMappedTypeNode,
    [SyntaxKind.LiteralType]: AstLiteralTypeNode,
    [SyntaxKind.TemplateLiteralType]: AstTemplateLiteralTypeNode,
    [SyntaxKind.TemplateLiteralTypeSpan]: AstTemplateLiteralTypeSpan,
    [SyntaxKind.OmittedExpression]: AstOmittedExpression,
    [SyntaxKind.PrefixUnaryExpression]: AstPrefixUnaryExpression,
    [SyntaxKind.PostfixUnaryExpression]: AstPostfixUnaryExpression,
    [SyntaxKind.DeleteExpression]: AstDeleteExpression,
    [SyntaxKind.TypeOfExpression]: AstTypeOfExpression,
    [SyntaxKind.VoidExpression]: AstVoidExpression,
    [SyntaxKind.AwaitExpression]: AstAwaitExpression,
    [SyntaxKind.YieldExpression]: AstYieldExpression,
    [SyntaxKind.BinaryExpression]: AstBinaryExpression,
    [SyntaxKind.ConditionalExpression]: AstConditionalExpression,
    [SyntaxKind.FunctionExpression]: AstFunctionExpression,
    [SyntaxKind.ArrowFunction]: AstArrowFunction,
    [SyntaxKind.TemplateExpression]: AstTemplateExpression,
    [SyntaxKind.TemplateSpan]: AstTemplateSpan,
    [SyntaxKind.ParenthesizedExpression]: AstParenthesizedExpression,
    [SyntaxKind.ArrayLiteralExpression]: AstArrayLiteralExpression,
    [SyntaxKind.SpreadElement]: AstSpreadElement,
    [SyntaxKind.ObjectLiteralExpression]: AstObjectLiteralExpression,
    [SyntaxKind.PropertyAccessExpression]: AstPropertyAccessExpression,
    [SyntaxKind.ElementAccessExpression]: AstElementAccessExpression,
    [SyntaxKind.CallExpression]: AstCallExpression,
    [SyntaxKind.ExpressionWithTypeArguments]: AstExpressionWithTypeArguments,
    [SyntaxKind.NewExpression]: AstNewExpression,
    [SyntaxKind.TaggedTemplateExpression]: AstTaggedTemplateExpression,
    [SyntaxKind.AsExpression]: AstAsExpression,
    [SyntaxKind.TypeAssertionExpression]: AstTypeAssertion,
    [SyntaxKind.SyntheticExpression]: AstSyntheticExpression,
    [SyntaxKind.SatisfiesExpression]: AstSatisfiesExpression,
    [SyntaxKind.NonNullExpression]: AstNonNullExpression,
    [SyntaxKind.MetaProperty]: AstMetaProperty,
    [SyntaxKind.JsxElement]: AstJsxElement,
    [SyntaxKind.JsxAttributes]: AstJsxAttributes,
    [SyntaxKind.JsxNamespacedName]: AstJsxNamespacedName,
    [SyntaxKind.JsxOpeningElement]: AstJsxOpeningElement,
    [SyntaxKind.JsxSelfClosingElement]: AstJsxSelfClosingElement,
    [SyntaxKind.JsxFragment]: AstJsxFragment,
    [SyntaxKind.JsxOpeningFragment]: AstJsxOpeningFragment,
    [SyntaxKind.JsxClosingFragment]: AstJsxClosingFragment,
    [SyntaxKind.JsxAttribute]: AstJsxAttribute,
    [SyntaxKind.JsxSpreadAttribute]: AstJsxSpreadAttribute,
    [SyntaxKind.JsxClosingElement]: AstJsxClosingElement,
    [SyntaxKind.JsxExpression]: AstJsxExpression,
    [SyntaxKind.EmptyStatement]: AstEmptyStatement,
    [SyntaxKind.DebuggerStatement]: AstDebuggerStatement,
    [SyntaxKind.MissingDeclaration]: AstMissingDeclaration,
    [SyntaxKind.Block]: AstBlock,
    [SyntaxKind.VariableStatement]: AstVariableStatement,
    [SyntaxKind.ExpressionStatement]: AstExpressionStatement,
    [SyntaxKind.IfStatement]: AstIfStatement,
    [SyntaxKind.DoStatement]: AstDoStatement,
    [SyntaxKind.WhileStatement]: AstWhileStatement,
    [SyntaxKind.ForStatement]: AstForStatement,
    [SyntaxKind.ForInStatement]: AstForInStatement,
    [SyntaxKind.ForOfStatement]: AstForOfStatement,
    [SyntaxKind.BreakStatement]: AstBreakStatement,
    [SyntaxKind.ContinueStatement]: AstContinueStatement,
    [SyntaxKind.ReturnStatement]: AstReturnStatement,
    [SyntaxKind.WithStatement]: AstWithStatement,
    [SyntaxKind.SwitchStatement]: AstSwitchStatement,
    [SyntaxKind.CaseBlock]: AstCaseBlock,
    [SyntaxKind.CaseClause]: AstCaseClause,
    [SyntaxKind.DefaultClause]: AstDefaultClause,
    [SyntaxKind.LabeledStatement]: AstLabeledStatement,
    [SyntaxKind.ThrowStatement]: AstThrowStatement,
    [SyntaxKind.TryStatement]: AstTryStatement,
    [SyntaxKind.CatchClause]: AstCatchClause,
    [SyntaxKind.ClassDeclaration]: AstClassDeclaration,
    [SyntaxKind.ClassExpression]: AstClassExpression,
    [SyntaxKind.InterfaceDeclaration]: AstInterfaceDeclaration,
    [SyntaxKind.HeritageClause]: AstHeritageClause,
    [SyntaxKind.TypeAliasDeclaration]: AstTypeAliasDeclaration,
    [SyntaxKind.EnumMember]: AstEnumMember,
    [SyntaxKind.EnumDeclaration]: AstEnumDeclaration,
    [SyntaxKind.ModuleDeclaration]: AstModuleDeclaration,
    [SyntaxKind.ModuleBlock]: AstModuleBlock,
    [SyntaxKind.ImportEqualsDeclaration]: AstImportEqualsDeclaration,
    [SyntaxKind.ExternalModuleReference]: AstExternalModuleReference,
    [SyntaxKind.ImportDeclaration]: AstImportDeclaration,
    [SyntaxKind.ImportClause]: AstImportClause,
    [SyntaxKind.ImportAttribute]: AstImportAttribute,
    [SyntaxKind.ImportAttributes]: AstImportAttributes,
    [SyntaxKind.NamespaceImport]: AstNamespaceImport,
    [SyntaxKind.NamespaceExport]: AstNamespaceExport,
    [SyntaxKind.NamespaceExportDeclaration]: AstNamespaceExportDeclaration,
    [SyntaxKind.ExportDeclaration]: AstExportDeclaration,
    [SyntaxKind.NamedImports]: AstNamedImports,
    [SyntaxKind.NamedExports]: AstNamedExports,
    [SyntaxKind.ImportSpecifier]: AstImportSpecifier,
    [SyntaxKind.ExportSpecifier]: AstExportSpecifier,
    [SyntaxKind.ExportAssignment]: AstExportAssignment,
    [SyntaxKind.JSDocTypeExpression]: AstJSDocTypeExpression,
    [SyntaxKind.JSDocNameReference]: AstJSDocNameReference,
    [SyntaxKind.JSDocMemberName]: AstJSDocMemberName,
    [SyntaxKind.JSDocAllType]: AstJSDocAllType,
    [SyntaxKind.JSDocUnknownType]: AstJSDocUnknownType,
    [SyntaxKind.JSDocNonNullableType]: AstJSDocNonNullableType,
    [SyntaxKind.JSDocNullableType]: AstJSDocNullableType,
    [SyntaxKind.JSDocOptionalType]: AstJSDocOptionalType,
    [SyntaxKind.JSDocFunctionType]: AstJSDocFunctionType,
    [SyntaxKind.JSDocVariadicType]: AstJSDocVariadicType,
    [SyntaxKind.JSDocNamepathType]: AstJSDocNamepathType,
    [SyntaxKind.JSDoc]: AstJSDocNode,
    [SyntaxKind.JSDocLink]: AstJSDocLink,
    [SyntaxKind.JSDocLinkCode]: AstJSDocLinkCode,
    [SyntaxKind.JSDocLinkPlain]: AstJSDocLinkPlain,
    [SyntaxKind.JSDocText]: AstJSDocText,
    [SyntaxKind.JSDocTag]: AstJSDocUnknownTag,
    [SyntaxKind.JSDocAugmentsTag]: AstJSDocAugmentsTag,
    [SyntaxKind.JSDocImplementsTag]: AstJSDocImplementsTag,
    [SyntaxKind.JSDocAuthorTag]: AstJSDocAuthorTag,
    [SyntaxKind.JSDocDeprecatedTag]: AstJSDocDeprecatedTag,
    [SyntaxKind.JSDocClassTag]: AstJSDocClassTag,
    [SyntaxKind.JSDocPublicTag]: AstJSDocPublicTag,
    [SyntaxKind.JSDocPrivateTag]: AstJSDocPrivateTag,
    [SyntaxKind.JSDocProtectedTag]: AstJSDocProtectedTag,
    [SyntaxKind.JSDocReadonlyTag]: AstJSDocReadonlyTag,
    [SyntaxKind.JSDocOverrideTag]: AstJSDocOverrideTag,
    [SyntaxKind.JSDocEnumTag]: AstJSDocEnumTag,
    [SyntaxKind.JSDocThisTag]: AstJSDocThisTag,
    [SyntaxKind.JSDocTemplateTag]: AstJSDocTemplateTag,
    [SyntaxKind.JSDocSeeTag]: AstJSDocSeeTag,
    [SyntaxKind.JSDocReturnTag]: AstJSDocReturnTag,
    [SyntaxKind.JSDocTypeTag]: AstJSDocTypeTag,
    [SyntaxKind.JSDocTypedefTag]: AstJSDocTypedefTag,
    [SyntaxKind.JSDocCallbackTag]: AstJSDocCallbackTag,
    [SyntaxKind.JSDocOverloadTag]: AstJSDocOverloadTag,
    [SyntaxKind.JSDocThrowsTag]: AstJSDocThrowsTag,
    [SyntaxKind.JSDocSignature]: AstJSDocSignature,
    [SyntaxKind.JSDocPropertyTag]: AstJSDocPropertyTag,
    [SyntaxKind.JSDocParameterTag]: AstJSDocParameterTag,
    [SyntaxKind.JSDocTypeLiteral]: AstJSDocTypeLiteral,
    [SyntaxKind.JSDocSatisfiesTag]: AstJSDocSatisfiesTag,
    [SyntaxKind.JSDocImportTag]: AstJSDocImportTag,
    [SyntaxKind.SourceFile]: AstSourceFile,
    [SyntaxKind.Bundle]: AstBundle,
    [SyntaxKind.SyntaxList]: AstSyntaxList,
    [SyntaxKind.NotEmittedStatement]: AstNotEmittedStatement,
    [SyntaxKind.NotEmittedTypeElement]: AstNotEmittedTypeElement,
    [SyntaxKind.PartiallyEmittedExpression]: AstPartiallyEmittedExpression,
    [SyntaxKind.CommaListExpression]: AstCommaListExpression,
    [SyntaxKind.SyntheticReferenceExpression]: AstSyntheticReferenceExpression,
    [SyntaxKind.Count]: never,
    [SyntaxKind.NonTextFileMarkerTrivia]: never,
}
