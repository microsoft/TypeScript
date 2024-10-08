import {
    AbstractKeyword,
    AccessorKeyword,
    ArrayBindingPattern,
    ArrayLiteralExpression,
    ArrayTypeNode,
    ArrowFunction,
    AsExpression,
    AssertClause,
    AssertEntry,
    AssertsKeyword,
    AstCallChain,
    AstDeclareKeyword,
    AstElementAccessChain,
    AsteriskToken,
    AstExpression,
    AstHasJSDoc,
    AstLeftHandSideExpression,
    AstNode,
    AstNonNullChain,
    AstNumericLiteral,
    AstOptionalChainRoot,
    AstPropertyAccessChain,
    AstPropertyName,
    AstStringLiteralLike,
    AsyncKeyword,
    AwaitExpression,
    AwaitKeyword,
    BigIntLiteral,
    BinaryExpression,
    BindingElement,
    Block,
    BreakStatement,
    Bundle,
    CallExpression,
    CallSignatureDeclaration,
    canHaveJSDoc,
    CaseBlock,
    CaseClause,
    CaseKeyword,
    CatchClause,
    ClassDeclaration,
    ClassExpression,
    ClassStaticBlockDeclaration,
    ColonToken,
    CommaListExpression,
    ComputedPropertyName,
    ConditionalExpression,
    ConditionalTypeNode,
    ConstructorDeclaration,
    ConstructorTypeNode,
    ConstructSignatureDeclaration,
    ContinueStatement,
    DebuggerStatement,
    Decorator,
    DefaultClause,
    DefaultKeyword,
    DeleteExpression,
    DoStatement,
    DotDotDotToken,
    ElementAccessExpression,
    EmptyStatement,
    EnumDeclaration,
    EnumMember,
    EqualsGreaterThanToken,
    ExclamationToken,
    ExportAssignment,
    ExportDeclaration,
    ExportKeyword,
    ExportSpecifier,
    ExpressionStatement,
    ExpressionWithTypeArguments,
    ExternalModuleReference,
    ForInStatement,
    ForOfStatement,
    ForStatement,
    FunctionDeclaration,
    FunctionExpression,
    FunctionTypeNode,
    GetAccessorDeclaration,
    HeritageClause,
    Identifier,
    IfStatement,
    ImportAttribute,
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
    InterfaceDeclaration,
    IntersectionTypeNode,
    isExpressionKind,
    isLeftHandSideExpressionKind,
    JSDoc,
    JSDocAllType,
    JSDocAugmentsTag,
    JSDocAuthorTag,
    JSDocCallbackTag,
    JSDocClassTag,
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
    JSDocNonNullableType,
    JSDocNullableType,
    JSDocOptionalType,
    JSDocOverloadTag,
    JSDocOverrideTag,
    JSDocParameterTag,
    JSDocPrivateTag,
    JSDocPropertyTag,
    JSDocProtectedTag,
    JSDocPublicTag,
    JSDocReadonlyTag,
    JSDocReturnTag,
    JSDocSatisfiesTag,
    JSDocSeeTag,
    JSDocSignature,
    JSDocTemplateTag,
    JSDocThisTag,
    JSDocThrowsTag,
    JSDocTypedefTag,
    JSDocTypeExpression,
    JSDocTypeLiteral,
    JSDocTypeTag,
    JSDocUnknownTag,
    JSDocUnknownType,
    JSDocVariadicType,
    JsxAttribute,
    JsxAttributes,
    JsxClosingElement,
    JsxClosingFragment,
    JsxElement,
    JsxExpression,
    JsxFragment,
    JsxNamespacedName,
    JsxOpeningElement,
    JsxOpeningFragment,
    JsxSelfClosingElement,
    JsxSpreadAttribute,
    JsxText,
    LabeledStatement,
    LiteralTypeNode,
    MappedTypeNode,
    MetaProperty,
    MethodDeclaration,
    MethodSignature,
    MinusToken,
    MissingDeclaration,
    ModuleBlock,
    ModuleDeclaration,
    ModuleExportName,
    NamedExports,
    NamedImports,
    NamedTupleMember,
    NamespaceExport,
    NamespaceExportDeclaration,
    NamespaceImport,
    NewExpression,
    Node,
    NodeFlags,
    NonNullExpression,
    NoSubstitutionTemplateLiteral,
    NotEmittedStatement,
    NumericLiteral,
    ObjectBindingPattern,
    ObjectLiteralExpression,
    OmittedExpression,
    OptionalTypeNode,
    OuterExpressionKinds,
    OverrideKeyword,
    ParameterDeclaration,
    ParenthesizedExpression,
    ParenthesizedTypeNode,
    PartiallyEmittedExpression,
    PlusToken,
    PostfixUnaryExpression,
    PrefixUnaryExpression,
    PrivateIdentifier,
    PropertyAccessExpression,
    PropertyAssignment,
    PropertyDeclaration,
    PropertySignature,
    QualifiedName,
    QuestionDotToken,
    QuestionToken,
    ReadonlyKeyword,
    RegularExpressionLiteral,
    RestTypeNode,
    ReturnStatement,
    SatisfiesExpression,
    SemicolonClassElement,
    SetAccessorDeclaration,
    ShorthandPropertyAssignment,
    astSkipOuterExpressions,
    SourceFile,
    SpreadAssignment,
    SpreadElement,
    StaticKeyword,
    StringLiteral,
    SuperExpression,
    SwitchStatement,
    SyntaxKind,
    SyntaxList,
    SyntheticExpression,
    SyntheticReferenceExpression,
    TaggedTemplateExpression,
    TemplateExpression,
    TemplateHead,
    TemplateLiteralTypeNode,
    TemplateLiteralTypeSpan,
    TemplateMiddle,
    TemplateSpan,
    TemplateTail,
    ThisTypeNode,
    ThrowStatement,
    Token,
    TryStatement,
    TupleTypeNode,
    TypeAliasDeclaration,
    TypeAssertionExpression,
    TypeLiteralNode,
    TypeOfExpression,
    TypeOperatorNode,
    TypeParameterDeclaration,
    TypePredicateNode,
    TypeQueryNode,
    TypeReferenceNode,
    UnionTypeNode,
    VariableDeclaration,
    VariableDeclarationList,
    VariableStatement,
    VoidExpression,
    WhileStatement,
    WithStatement,
    YieldExpression,
} from "../_namespaces/ts.js";

// Literals

/** @internal */
export function astIsNumericLiteral(node: AstNode): node is AstNode<NumericLiteral> {
    return node.kind === SyntaxKind.NumericLiteral;
}

/** @internal */
export function astIsBigIntLiteral(node: AstNode): node is AstNode<BigIntLiteral> {
    return node.kind === SyntaxKind.BigIntLiteral;
}

/** @internal */
export function astIsStringLiteral(node: AstNode): node is AstNode<StringLiteral> {
    return node.kind === SyntaxKind.StringLiteral;
}

/** @internal */
export function astIsJsxText(node: AstNode): node is AstNode<JsxText> {
    return node.kind === SyntaxKind.JsxText;
}

/** @internal */
export function astIsRegularExpressionLiteral(node: AstNode): node is AstNode<RegularExpressionLiteral> {
    return node.kind === SyntaxKind.RegularExpressionLiteral;
}

/** @internal */
export function astIsNoSubstitutionTemplateLiteral(node: AstNode): node is AstNode<NoSubstitutionTemplateLiteral> {
    return node.kind === SyntaxKind.NoSubstitutionTemplateLiteral;
}

// Pseudo-literals

/** @internal */
export function astIsTemplateHead(node: AstNode): node is AstNode<TemplateHead> {
    return node.kind === SyntaxKind.TemplateHead;
}

/** @internal */
export function astIsTemplateMiddle(node: AstNode): node is AstNode<TemplateMiddle> {
    return node.kind === SyntaxKind.TemplateMiddle;
}

/** @internal */
export function astIsTemplateTail(node: AstNode): node is AstNode<TemplateTail> {
    return node.kind === SyntaxKind.TemplateTail;
}

// Punctuation

/** @internal */
export function astIsDotDotDotToken(node: AstNode): node is AstNode<DotDotDotToken> {
    return node.kind === SyntaxKind.DotDotDotToken;
}

/** @internal */
export function astIsCommaToken(node: AstNode): node is AstNode<Token<SyntaxKind.CommaToken>> {
    return node.kind === SyntaxKind.CommaToken;
}

/** @internal */
export function astIsPlusToken(node: AstNode): node is AstNode<PlusToken> {
    return node.kind === SyntaxKind.PlusToken;
}

/** @internal */
export function astIsMinusToken(node: AstNode): node is AstNode<MinusToken> {
    return node.kind === SyntaxKind.MinusToken;
}

/** @internal */
export function astIsAsteriskToken(node: AstNode): node is AstNode<AsteriskToken> {
    return node.kind === SyntaxKind.AsteriskToken;
}

/** @internal */
export function astIsExclamationToken(node: AstNode): node is AstNode<ExclamationToken> {
    return node.kind === SyntaxKind.ExclamationToken;
}

/** @internal */
export function astIsQuestionToken(node: AstNode): node is AstNode<QuestionToken> {
    return node.kind === SyntaxKind.QuestionToken;
}

/** @internal */
export function astIsColonToken(node: AstNode): node is AstNode<ColonToken> {
    return node.kind === SyntaxKind.ColonToken;
}

/** @internal */
export function astIsQuestionDotToken(node: AstNode): node is AstNode<QuestionDotToken> {
    return node.kind === SyntaxKind.QuestionDotToken;
}

/** @internal */
export function astIsEqualsGreaterThanToken(node: AstNode): node is AstNode<EqualsGreaterThanToken> {
    return node.kind === SyntaxKind.EqualsGreaterThanToken;
}

// Identifiers

/** @internal */
export function astIsIdentifier(node: AstNode): node is AstNode<Identifier> {
    return node.kind === SyntaxKind.Identifier;
}

/** @internal */
export function astIsPrivateIdentifier(node: AstNode): node is AstNode<PrivateIdentifier> {
    return node.kind === SyntaxKind.PrivateIdentifier;
}

// Reserved Words

/** @internal */
export function astIsExportModifier(node: AstNode): node is AstNode<ExportKeyword> {
    return node.kind === SyntaxKind.ExportKeyword;
}

/** @internal */
export function astIsDefaultModifier(node: AstNode): node is AstNode<DefaultKeyword> {
    return node.kind === SyntaxKind.DefaultKeyword;
}

/** @internal */
export function astIsAsyncModifier(node: AstNode): node is AstNode<AsyncKeyword> {
    return node.kind === SyntaxKind.AsyncKeyword;
}

/** @internal */
export function astIsAssertsKeyword(node: AstNode): node is AstNode<AssertsKeyword> {
    return node.kind === SyntaxKind.AssertsKeyword;
}

/** @internal */
export function astIsAwaitKeyword(node: AstNode): node is AstNode<AwaitKeyword> {
    return node.kind === SyntaxKind.AwaitKeyword;
}

/** @internal */
export function astIsReadonlyKeyword(node: AstNode): node is AstNode<ReadonlyKeyword> {
    return node.kind === SyntaxKind.ReadonlyKeyword;
}

/** @internal */
export function astIsStaticModifier(node: AstNode): node is AstNode<StaticKeyword> {
    return node.kind === SyntaxKind.StaticKeyword;
}

/** @internal */
export function astIsAbstractModifier(node: AstNode): node is AstNode<AbstractKeyword> {
    return node.kind === SyntaxKind.AbstractKeyword;
}

/** @internal */
export function astIsOverrideModifier(node: AstNode): node is AstNode<OverrideKeyword> {
    return node.kind === SyntaxKind.OverrideKeyword;
}

/** @internal */
export function astIsAccessorModifier(node: AstNode): node is AstNode<AccessorKeyword> {
    return node.kind === SyntaxKind.AccessorKeyword;
}

/** @internal */
export function astIsSuperKeyword(node: AstNode): node is AstNode<SuperExpression> {
    return node.kind === SyntaxKind.SuperKeyword;
}

/** @internal */
export function astIsImportKeyword(node: AstNode): node is AstNode<ImportExpression> {
    return node.kind === SyntaxKind.ImportKeyword;
}

/** @internal */
export function astIsCaseKeyword(node: AstNode): node is AstNode<CaseKeyword> {
    return node.kind === SyntaxKind.CaseKeyword;
}

/** @internal */
export function astIsDeclareKeyword(node: AstNode): node is AstDeclareKeyword {
    return node.kind === SyntaxKind.DeclareKeyword;
}

// Names

/** @internal */
export function astIsQualifiedName(node: AstNode): node is AstNode<QualifiedName> {
    return node.kind === SyntaxKind.QualifiedName;
}

/** @internal */
export function astIsComputedPropertyName(node: AstNode): node is AstNode<ComputedPropertyName> {
    return node.kind === SyntaxKind.ComputedPropertyName;
}

// Signature elements

/** @internal */
export function astIsTypeParameterDeclaration(node: AstNode): node is AstNode<TypeParameterDeclaration> {
    return node.kind === SyntaxKind.TypeParameter;
}

/** @internal */
// TODO(rbuckton): Rename to 'isParameterDeclaration'
export function astIsParameter(node: AstNode): node is AstNode<ParameterDeclaration> {
    return node.kind === SyntaxKind.Parameter;
}

/** @internal */
export function astIsDecorator(node: AstNode): node is AstNode<Decorator> {
    return node.kind === SyntaxKind.Decorator;
}

// TypeMember

/** @internal */
export function astIsPropertySignature(node: AstNode): node is AstNode<PropertySignature> {
    return node.kind === SyntaxKind.PropertySignature;
}

/** @internal */
export function astIsPropertyDeclaration(node: AstNode): node is AstNode<PropertyDeclaration> {
    return node.kind === SyntaxKind.PropertyDeclaration;
}

/** @internal */
export function astIsMethodSignature(node: AstNode): node is AstNode<MethodSignature> {
    return node.kind === SyntaxKind.MethodSignature;
}

/** @internal */
export function astIsMethodDeclaration(node: AstNode): node is AstNode<MethodDeclaration> {
    return node.kind === SyntaxKind.MethodDeclaration;
}

/** @internal */
export function astIsClassStaticBlockDeclaration(node: AstNode): node is AstNode<ClassStaticBlockDeclaration> {
    return node.kind === SyntaxKind.ClassStaticBlockDeclaration;
}

/** @internal */
export function astIsConstructorDeclaration(node: AstNode): node is AstNode<ConstructorDeclaration> {
    return node.kind === SyntaxKind.Constructor;
}

/** @internal */
export function astIsGetAccessorDeclaration(node: AstNode): node is AstNode<GetAccessorDeclaration> {
    return node.kind === SyntaxKind.GetAccessor;
}

/** @internal */
export function astIsSetAccessorDeclaration(node: AstNode): node is AstNode<SetAccessorDeclaration> {
    return node.kind === SyntaxKind.SetAccessor;
}

/** @internal */
export function astIsCallSignatureDeclaration(node: AstNode): node is AstNode<CallSignatureDeclaration> {
    return node.kind === SyntaxKind.CallSignature;
}

/** @internal */
export function astIsConstructSignatureDeclaration(node: AstNode): node is AstNode<ConstructSignatureDeclaration> {
    return node.kind === SyntaxKind.ConstructSignature;
}

/** @internal */
export function astIsIndexSignatureDeclaration(node: AstNode): node is AstNode<IndexSignatureDeclaration> {
    return node.kind === SyntaxKind.IndexSignature;
}

// Type

/** @internal */
export function astIsTypePredicateNode(node: AstNode): node is AstNode<TypePredicateNode> {
    return node.kind === SyntaxKind.TypePredicate;
}

/** @internal */
export function astIsTypeReferenceNode(node: AstNode): node is AstNode<TypeReferenceNode> {
    return node.kind === SyntaxKind.TypeReference;
}

/** @internal */
export function astIsFunctionTypeNode(node: AstNode): node is AstNode<FunctionTypeNode> {
    return node.kind === SyntaxKind.FunctionType;
}

/** @internal */
export function astIsConstructorTypeNode(node: AstNode): node is AstNode<ConstructorTypeNode> {
    return node.kind === SyntaxKind.ConstructorType;
}

/** @internal */
export function astIsTypeQueryNode(node: AstNode): node is AstNode<TypeQueryNode> {
    return node.kind === SyntaxKind.TypeQuery;
}

/** @internal */
export function astIsTypeLiteralNode(node: AstNode): node is AstNode<TypeLiteralNode> {
    return node.kind === SyntaxKind.TypeLiteral;
}

/** @internal */
export function astIsArrayTypeNode(node: AstNode): node is AstNode<ArrayTypeNode> {
    return node.kind === SyntaxKind.ArrayType;
}

/** @internal */
export function astIsTupleTypeNode(node: AstNode): node is AstNode<TupleTypeNode> {
    return node.kind === SyntaxKind.TupleType;
}

/** @internal */
export function astIsNamedTupleMember(node: AstNode): node is AstNode<NamedTupleMember> {
    return node.kind === SyntaxKind.NamedTupleMember;
}

/** @internal */
export function astIsOptionalTypeNode(node: AstNode): node is AstNode<OptionalTypeNode> {
    return node.kind === SyntaxKind.OptionalType;
}

/** @internal */
export function astIsRestTypeNode(node: AstNode): node is AstNode<RestTypeNode> {
    return node.kind === SyntaxKind.RestType;
}

/** @internal */
export function astIsUnionTypeNode(node: AstNode): node is AstNode<UnionTypeNode> {
    return node.kind === SyntaxKind.UnionType;
}

/** @internal */
export function astIsIntersectionTypeNode(node: AstNode): node is AstNode<IntersectionTypeNode> {
    return node.kind === SyntaxKind.IntersectionType;
}

/** @internal */
export function astIsConditionalTypeNode(node: AstNode): node is AstNode<ConditionalTypeNode> {
    return node.kind === SyntaxKind.ConditionalType;
}

/** @internal */
export function astIsInferTypeNode(node: AstNode): node is AstNode<InferTypeNode> {
    return node.kind === SyntaxKind.InferType;
}

/** @internal */
export function astIsParenthesizedTypeNode(node: AstNode): node is AstNode<ParenthesizedTypeNode> {
    return node.kind === SyntaxKind.ParenthesizedType;
}

/** @internal */
export function astIsThisTypeNode(node: AstNode): node is AstNode<ThisTypeNode> {
    return node.kind === SyntaxKind.ThisType;
}

/** @internal */
export function astIsTypeOperatorNode(node: AstNode): node is AstNode<TypeOperatorNode> {
    return node.kind === SyntaxKind.TypeOperator;
}

/** @internal */
export function astIsIndexedAccessTypeNode(node: AstNode): node is AstNode<IndexedAccessTypeNode> {
    return node.kind === SyntaxKind.IndexedAccessType;
}

/** @internal */
export function astIsMappedTypeNode(node: AstNode): node is AstNode<MappedTypeNode> {
    return node.kind === SyntaxKind.MappedType;
}

/** @internal */
export function astIsLiteralTypeNode(node: AstNode): node is AstNode<LiteralTypeNode> {
    return node.kind === SyntaxKind.LiteralType;
}

/** @internal */
export function astIsImportTypeNode(node: AstNode): node is AstNode<ImportTypeNode> {
    return node.kind === SyntaxKind.ImportType;
}

/** @internal */
export function astIsTemplateLiteralTypeSpan(node: AstNode): node is AstNode<TemplateLiteralTypeSpan> {
    return node.kind === SyntaxKind.TemplateLiteralTypeSpan;
}

/** @internal */
export function astIsTemplateLiteralTypeNode(node: AstNode): node is AstNode<TemplateLiteralTypeNode> {
    return node.kind === SyntaxKind.TemplateLiteralType;
}

// Binding patterns

/** @internal */
export function astIsObjectBindingPattern(node: AstNode): node is AstNode<ObjectBindingPattern> {
    return node.kind === SyntaxKind.ObjectBindingPattern;
}

/** @internal */
export function astIsArrayBindingPattern(node: AstNode): node is AstNode<ArrayBindingPattern> {
    return node.kind === SyntaxKind.ArrayBindingPattern;
}

/** @internal */
export function astIsBindingElement(node: AstNode): node is AstNode<BindingElement> {
    return node.kind === SyntaxKind.BindingElement;
}

// Expression

/** @internal */
export function astIsArrayLiteralExpression(node: AstNode): node is AstNode<ArrayLiteralExpression> {
    return node.kind === SyntaxKind.ArrayLiteralExpression;
}

/** @internal */
export function astIsObjectLiteralExpression(node: AstNode): node is AstNode<ObjectLiteralExpression> {
    return node.kind === SyntaxKind.ObjectLiteralExpression;
}

/** @internal */
export function astIsPropertyAccessExpression(node: AstNode): node is AstNode<PropertyAccessExpression> {
    return node.kind === SyntaxKind.PropertyAccessExpression;
}

/** @internal */
export function astIsElementAccessExpression(node: AstNode): node is AstNode<ElementAccessExpression> {
    return node.kind === SyntaxKind.ElementAccessExpression;
}

/** @internal */
export function astIsCallExpression(node: AstNode): node is AstNode<CallExpression> {
    return node.kind === SyntaxKind.CallExpression;
}

/** @internal */
export function astIsNewExpression(node: AstNode): node is AstNode<NewExpression> {
    return node.kind === SyntaxKind.NewExpression;
}

/** @internal */
export function astIsTaggedTemplateExpression(node: AstNode): node is AstNode<TaggedTemplateExpression> {
    return node.kind === SyntaxKind.TaggedTemplateExpression;
}

/** @internal */
export function astIsTypeAssertionExpression(node: AstNode): node is AstNode<TypeAssertionExpression> {
    return node.kind === SyntaxKind.TypeAssertionExpression;
}

/** @internal */
export function astIsParenthesizedExpression(node: AstNode): node is AstNode<ParenthesizedExpression> {
    return node.kind === SyntaxKind.ParenthesizedExpression;
}

/** @internal */
export function astIsFunctionExpression(node: AstNode): node is AstNode<FunctionExpression> {
    return node.kind === SyntaxKind.FunctionExpression;
}

/** @internal */
export function astIsArrowFunction(node: AstNode): node is AstNode<ArrowFunction> {
    return node.kind === SyntaxKind.ArrowFunction;
}

/** @internal */
export function astIsDeleteExpression(node: AstNode): node is AstNode<DeleteExpression> {
    return node.kind === SyntaxKind.DeleteExpression;
}

/** @internal */
export function astIsTypeOfExpression(node: AstNode): node is AstNode<TypeOfExpression> {
    return node.kind === SyntaxKind.TypeOfExpression;
}

/** @internal */
export function astIsVoidExpression(node: AstNode): node is AstNode<VoidExpression> {
    return node.kind === SyntaxKind.VoidExpression;
}

/** @internal */
export function astIsAwaitExpression(node: AstNode): node is AstNode<AwaitExpression> {
    return node.kind === SyntaxKind.AwaitExpression;
}

/** @internal */
export function astIsPrefixUnaryExpression(node: AstNode): node is AstNode<PrefixUnaryExpression> {
    return node.kind === SyntaxKind.PrefixUnaryExpression;
}

/** @internal */
export function astIsPostfixUnaryExpression(node: AstNode): node is AstNode<PostfixUnaryExpression> {
    return node.kind === SyntaxKind.PostfixUnaryExpression;
}

/** @internal */
export function astIsBinaryExpression(node: AstNode): node is AstNode<BinaryExpression> {
    return node.kind === SyntaxKind.BinaryExpression;
}

/** @internal */
export function astIsConditionalExpression(node: AstNode): node is AstNode<ConditionalExpression> {
    return node.kind === SyntaxKind.ConditionalExpression;
}

/** @internal */
export function astIsTemplateExpression(node: AstNode): node is AstNode<TemplateExpression> {
    return node.kind === SyntaxKind.TemplateExpression;
}

/** @internal */
export function astIsYieldExpression(node: AstNode): node is AstNode<YieldExpression> {
    return node.kind === SyntaxKind.YieldExpression;
}

/** @internal */
export function astIsSpreadElement(node: AstNode): node is AstNode<SpreadElement> {
    return node.kind === SyntaxKind.SpreadElement;
}

/** @internal */
export function astIsClassExpression(node: AstNode): node is AstNode<ClassExpression> {
    return node.kind === SyntaxKind.ClassExpression;
}

/** @internal */
export function astIsOmittedExpression(node: AstNode): node is AstNode<OmittedExpression> {
    return node.kind === SyntaxKind.OmittedExpression;
}

/** @internal */
export function astIsExpressionWithTypeArguments(node: AstNode): node is AstNode<ExpressionWithTypeArguments> {
    return node.kind === SyntaxKind.ExpressionWithTypeArguments;
}

/** @internal */
export function astIsAsExpression(node: AstNode): node is AstNode<AsExpression> {
    return node.kind === SyntaxKind.AsExpression;
}

/** @internal */
export function astIsSatisfiesExpression(node: AstNode): node is AstNode<SatisfiesExpression> {
    return node.kind === SyntaxKind.SatisfiesExpression;
}

/** @internal */
export function astIsNonNullExpression(node: AstNode): node is AstNode<NonNullExpression> {
    return node.kind === SyntaxKind.NonNullExpression;
}

/** @internal */
export function astIsMetaProperty(node: AstNode): node is AstNode<MetaProperty> {
    return node.kind === SyntaxKind.MetaProperty;
}

/** @internal */
export function astIsSyntheticExpression(node: AstNode): node is AstNode<SyntheticExpression> {
    return node.kind === SyntaxKind.SyntheticExpression;
}

/** @internal */
export function astIsPartiallyEmittedExpression(node: AstNode): node is AstNode<PartiallyEmittedExpression> {
    return node.kind === SyntaxKind.PartiallyEmittedExpression;
}

/** @internal */
export function astIsCommaListExpression(node: AstNode): node is AstNode<CommaListExpression> {
    return node.kind === SyntaxKind.CommaListExpression;
}

// Misc

/** @internal */
export function astIsTemplateSpan(node: AstNode): node is AstNode<TemplateSpan> {
    return node.kind === SyntaxKind.TemplateSpan;
}

/** @internal */
export function astIsSemicolonClassElement(node: AstNode): node is AstNode<SemicolonClassElement> {
    return node.kind === SyntaxKind.SemicolonClassElement;
}

// Elements

/** @internal */
export function astIsBlock(node: AstNode): node is AstNode<Block> {
    return node.kind === SyntaxKind.Block;
}

/** @internal */
export function astIsVariableStatement(node: AstNode): node is AstNode<VariableStatement> {
    return node.kind === SyntaxKind.VariableStatement;
}

/** @internal */
export function astIsEmptyStatement(node: AstNode): node is AstNode<EmptyStatement> {
    return node.kind === SyntaxKind.EmptyStatement;
}

/** @internal */
export function astIsExpressionStatement(node: AstNode): node is AstNode<ExpressionStatement> {
    return node.kind === SyntaxKind.ExpressionStatement;
}

/** @internal */
export function astIsIfStatement(node: AstNode): node is AstNode<IfStatement> {
    return node.kind === SyntaxKind.IfStatement;
}

/** @internal */
export function astIsDoStatement(node: AstNode): node is AstNode<DoStatement> {
    return node.kind === SyntaxKind.DoStatement;
}

/** @internal */
export function astIsWhileStatement(node: AstNode): node is AstNode<WhileStatement> {
    return node.kind === SyntaxKind.WhileStatement;
}

/** @internal */
export function astIsForStatement(node: AstNode): node is AstNode<ForStatement> {
    return node.kind === SyntaxKind.ForStatement;
}

/** @internal */
export function astIsForInStatement(node: AstNode): node is AstNode<ForInStatement> {
    return node.kind === SyntaxKind.ForInStatement;
}

/** @internal */
export function astIsForOfStatement(node: AstNode): node is AstNode<ForOfStatement> {
    return node.kind === SyntaxKind.ForOfStatement;
}

/** @internal */
export function astIsContinueStatement(node: AstNode): node is AstNode<ContinueStatement> {
    return node.kind === SyntaxKind.ContinueStatement;
}

/** @internal */
export function astIsBreakStatement(node: AstNode): node is AstNode<BreakStatement> {
    return node.kind === SyntaxKind.BreakStatement;
}

/** @internal */
export function astIsReturnStatement(node: AstNode): node is AstNode<ReturnStatement> {
    return node.kind === SyntaxKind.ReturnStatement;
}

/** @internal */
export function astIsWithStatement(node: AstNode): node is AstNode<WithStatement> {
    return node.kind === SyntaxKind.WithStatement;
}

/** @internal */
export function astIsSwitchStatement(node: AstNode): node is AstNode<SwitchStatement> {
    return node.kind === SyntaxKind.SwitchStatement;
}

/** @internal */
export function astIsLabeledStatement(node: AstNode): node is AstNode<LabeledStatement> {
    return node.kind === SyntaxKind.LabeledStatement;
}

/** @internal */
export function astIsThrowStatement(node: AstNode): node is AstNode<ThrowStatement> {
    return node.kind === SyntaxKind.ThrowStatement;
}

/** @internal */
export function astIsTryStatement(node: AstNode): node is AstNode<TryStatement> {
    return node.kind === SyntaxKind.TryStatement;
}

/** @internal */
export function astIsDebuggerStatement(node: AstNode): node is AstNode<DebuggerStatement> {
    return node.kind === SyntaxKind.DebuggerStatement;
}

/** @internal */
export function astIsVariableDeclaration(node: AstNode): node is AstNode<VariableDeclaration> {
    return node.kind === SyntaxKind.VariableDeclaration;
}

/** @internal */
export function astIsVariableDeclarationList(node: AstNode): node is AstNode<VariableDeclarationList> {
    return node.kind === SyntaxKind.VariableDeclarationList;
}

/** @internal */
export function astIsFunctionDeclaration(node: AstNode): node is AstNode<FunctionDeclaration> {
    return node.kind === SyntaxKind.FunctionDeclaration;
}

/** @internal */
export function astIsClassDeclaration(node: AstNode): node is AstNode<ClassDeclaration> {
    return node.kind === SyntaxKind.ClassDeclaration;
}

/** @internal */
export function astIsInterfaceDeclaration(node: AstNode): node is AstNode<InterfaceDeclaration> {
    return node.kind === SyntaxKind.InterfaceDeclaration;
}

/** @internal */
export function astIsTypeAliasDeclaration(node: AstNode): node is AstNode<TypeAliasDeclaration> {
    return node.kind === SyntaxKind.TypeAliasDeclaration;
}

/** @internal */
export function astIsEnumDeclaration(node: AstNode): node is AstNode<EnumDeclaration> {
    return node.kind === SyntaxKind.EnumDeclaration;
}

/** @internal */
export function astIsModuleDeclaration(node: AstNode): node is AstNode<ModuleDeclaration> {
    return node.kind === SyntaxKind.ModuleDeclaration;
}

/** @internal */
export function astIsModuleBlock(node: AstNode): node is AstNode<ModuleBlock> {
    return node.kind === SyntaxKind.ModuleBlock;
}

/** @internal */
export function astIsCaseBlock(node: AstNode): node is AstNode<CaseBlock> {
    return node.kind === SyntaxKind.CaseBlock;
}

/** @internal */
export function astIsNamespaceExportDeclaration(node: AstNode): node is AstNode<NamespaceExportDeclaration> {
    return node.kind === SyntaxKind.NamespaceExportDeclaration;
}

/** @internal */
export function astIsImportEqualsDeclaration(node: AstNode): node is AstNode<ImportEqualsDeclaration> {
    return node.kind === SyntaxKind.ImportEqualsDeclaration;
}

/** @internal */
export function astIsImportDeclaration(node: AstNode): node is AstNode<ImportDeclaration> {
    return node.kind === SyntaxKind.ImportDeclaration;
}

/** @internal */
export function astIsImportClause(node: AstNode): node is AstNode<ImportClause> {
    return node.kind === SyntaxKind.ImportClause;
}

/** @internal */
export function astIsImportTypeAssertionContainer(node: AstNode): node is AstNode<ImportTypeAssertionContainer> {
    return node.kind === SyntaxKind.ImportTypeAssertionContainer;
}

/**
 * @deprecated
 * @internal
 */
export function astIsAssertClause(node: AstNode): node is AstNode<AssertClause> {
    return node.kind === SyntaxKind.AssertClause;
}

/**
 * @deprecated
 * @internal
 */
export function astIsAssertEntry(node: AstNode): node is AstNode<AssertEntry> {
    return node.kind === SyntaxKind.AssertEntry;
}

/** @internal */
export function astIsImportAttributes(node: AstNode): node is AstNode<ImportAttributes> {
    return node.kind === SyntaxKind.ImportAttributes;
}

/** @internal */
export function astIsImportAttribute(node: AstNode): node is AstNode<ImportAttribute> {
    return node.kind === SyntaxKind.ImportAttribute;
}

/** @internal */
export function astIsNamespaceImport(node: AstNode): node is AstNode<NamespaceImport> {
    return node.kind === SyntaxKind.NamespaceImport;
}

/** @internal */
export function astIsNamespaceExport(node: AstNode): node is AstNode<NamespaceExport> {
    return node.kind === SyntaxKind.NamespaceExport;
}

/** @internal */
export function astIsNamedImports(node: AstNode): node is AstNode<NamedImports> {
    return node.kind === SyntaxKind.NamedImports;
}

/** @internal */
export function astIsImportSpecifier(node: AstNode): node is AstNode<ImportSpecifier> {
    return node.kind === SyntaxKind.ImportSpecifier;
}

/** @internal */
export function astIsExportAssignment(node: AstNode): node is AstNode<ExportAssignment> {
    return node.kind === SyntaxKind.ExportAssignment;
}

/** @internal */
export function astIsExportDeclaration(node: AstNode): node is AstNode<ExportDeclaration> {
    return node.kind === SyntaxKind.ExportDeclaration;
}

/** @internal */
export function astIsNamedExports(node: AstNode): node is AstNode<NamedExports> {
    return node.kind === SyntaxKind.NamedExports;
}

/** @internal */
export function astIsExportSpecifier(node: AstNode): node is AstNode<ExportSpecifier> {
    return node.kind === SyntaxKind.ExportSpecifier;
}

/** @internal */
export function astIsModuleExportName(node: AstNode): node is AstNode<ModuleExportName> {
    return node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.StringLiteral;
}

/** @internal */
export function astIsMissingDeclaration(node: AstNode): node is AstNode<MissingDeclaration> {
    return node.kind === SyntaxKind.MissingDeclaration;
}

/** @internal */
export function astIsNotEmittedStatement(node: AstNode): node is AstNode<NotEmittedStatement> {
    return node.kind === SyntaxKind.NotEmittedStatement;
}

/** @internal */
export function astIsSyntheticReference(node: AstNode): node is AstNode<SyntheticReferenceExpression> {
    return node.kind === SyntaxKind.SyntheticReferenceExpression;
}

// Module References

/** @internal */
export function astIsExternalModuleReference(node: AstNode): node is AstNode<ExternalModuleReference> {
    return node.kind === SyntaxKind.ExternalModuleReference;
}

// JSX

/** @internal */
export function astIsJsxElement(node: AstNode): node is AstNode<JsxElement> {
    return node.kind === SyntaxKind.JsxElement;
}

/** @internal */
export function astIsJsxSelfClosingElement(node: AstNode): node is AstNode<JsxSelfClosingElement> {
    return node.kind === SyntaxKind.JsxSelfClosingElement;
}

/** @internal */
export function astIsJsxOpeningElement(node: AstNode): node is AstNode<JsxOpeningElement> {
    return node.kind === SyntaxKind.JsxOpeningElement;
}

/** @internal */
export function astIsJsxClosingElement(node: AstNode): node is AstNode<JsxClosingElement> {
    return node.kind === SyntaxKind.JsxClosingElement;
}

/** @internal */
export function astIsJsxFragment(node: AstNode): node is AstNode<JsxFragment> {
    return node.kind === SyntaxKind.JsxFragment;
}

/** @internal */
export function astIsJsxOpeningFragment(node: AstNode): node is AstNode<JsxOpeningFragment> {
    return node.kind === SyntaxKind.JsxOpeningFragment;
}

/** @internal */
export function astIsJsxClosingFragment(node: AstNode): node is AstNode<JsxClosingFragment> {
    return node.kind === SyntaxKind.JsxClosingFragment;
}

/** @internal */
export function astIsJsxAttribute(node: AstNode): node is AstNode<JsxAttribute> {
    return node.kind === SyntaxKind.JsxAttribute;
}

/** @internal */
export function astIsJsxAttributes(node: AstNode): node is AstNode<JsxAttributes> {
    return node.kind === SyntaxKind.JsxAttributes;
}

/** @internal */
export function astIsJsxSpreadAttribute(node: AstNode): node is AstNode<JsxSpreadAttribute> {
    return node.kind === SyntaxKind.JsxSpreadAttribute;
}

/** @internal */
export function astIsJsxExpression(node: AstNode): node is AstNode<JsxExpression> {
    return node.kind === SyntaxKind.JsxExpression;
}

/** @internal */
export function astIsJsxNamespacedName(node: AstNode): node is AstNode<JsxNamespacedName> {
    return node.kind === SyntaxKind.JsxNamespacedName;
}

// Clauses

/** @internal */
export function astIsCaseClause(node: AstNode): node is AstNode<CaseClause> {
    return node.kind === SyntaxKind.CaseClause;
}

/** @internal */
export function astIsDefaultClause(node: AstNode): node is AstNode<DefaultClause> {
    return node.kind === SyntaxKind.DefaultClause;
}

/** @internal */
export function astIsHeritageClause(node: AstNode): node is AstNode<HeritageClause> {
    return node.kind === SyntaxKind.HeritageClause;
}

/** @internal */
export function astIsCatchClause(node: AstNode): node is AstNode<CatchClause> {
    return node.kind === SyntaxKind.CatchClause;
}

// Property assignments

/** @internal */
export function astIsPropertyAssignment(node: AstNode): node is AstNode<PropertyAssignment> {
    return node.kind === SyntaxKind.PropertyAssignment;
}

/** @internal */
export function astIsShorthandPropertyAssignment(node: AstNode): node is AstNode<ShorthandPropertyAssignment> {
    return node.kind === SyntaxKind.ShorthandPropertyAssignment;
}

/** @internal */
export function astIsSpreadAssignment(node: AstNode): node is AstNode<SpreadAssignment> {
    return node.kind === SyntaxKind.SpreadAssignment;
}

// Enum

/** @internal */
export function astIsEnumMember(node: AstNode): node is AstNode<EnumMember> {
    return node.kind === SyntaxKind.EnumMember;
}

/** @internal */
// Top-level nodes
export function astIsSourceFile(node: AstNode): node is AstNode<SourceFile> {
    return node.kind === SyntaxKind.SourceFile;
}

/** @internal */
export function astIsBundle(node: AstNode): node is AstNode<Bundle> {
    return node.kind === SyntaxKind.Bundle;
}

// TODO(rbuckton): isInputFiles

// JSDoc Elements

/** @internal */
export function astIsJSDocTypeExpression(node: AstNode): node is AstNode<JSDocTypeExpression> {
    return node.kind === SyntaxKind.JSDocTypeExpression;
}

/** @internal */
export function astIsJSDocNameReference(node: AstNode): node is AstNode<JSDocNameReference> {
    return node.kind === SyntaxKind.JSDocNameReference;
}

/** @internal */
export function astIsJSDocMemberName(node: AstNode): node is AstNode<JSDocMemberName> {
    return node.kind === SyntaxKind.JSDocMemberName;
}

/** @internal */
export function astIsJSDocLink(node: AstNode): node is AstNode<JSDocLink> {
    return node.kind === SyntaxKind.JSDocLink;
}

/** @internal */
export function astIsJSDocLinkCode(node: AstNode): node is AstNode<JSDocLinkCode> {
    return node.kind === SyntaxKind.JSDocLinkCode;
}

/** @internal */
export function astIsJSDocLinkPlain(node: AstNode): node is AstNode<JSDocLinkPlain> {
    return node.kind === SyntaxKind.JSDocLinkPlain;
}

/** @internal */
export function astIsJSDocAllType(node: AstNode): node is AstNode<JSDocAllType> {
    return node.kind === SyntaxKind.JSDocAllType;
}

/** @internal */
export function astIsJSDocUnknownType(node: AstNode): node is AstNode<JSDocUnknownType> {
    return node.kind === SyntaxKind.JSDocUnknownType;
}

/** @internal */
export function astIsJSDocNullableType(node: AstNode): node is AstNode<JSDocNullableType> {
    return node.kind === SyntaxKind.JSDocNullableType;
}

/** @internal */
export function astIsJSDocNonNullableType(node: AstNode): node is AstNode<JSDocNonNullableType> {
    return node.kind === SyntaxKind.JSDocNonNullableType;
}

/** @internal */
export function astIsJSDocOptionalType(node: AstNode): node is AstNode<JSDocOptionalType> {
    return node.kind === SyntaxKind.JSDocOptionalType;
}

/** @internal */
export function astIsJSDocFunctionType(node: AstNode): node is AstNode<JSDocFunctionType> {
    return node.kind === SyntaxKind.JSDocFunctionType;
}

/** @internal */
export function astIsJSDocVariadicType(node: AstNode): node is AstNode<JSDocVariadicType> {
    return node.kind === SyntaxKind.JSDocVariadicType;
}

/** @internal */
export function astIsJSDocNamepathType(node: AstNode): node is AstNode<JSDocNamepathType> {
    return node.kind === SyntaxKind.JSDocNamepathType;
}

/** @internal */
export function astIsJSDoc(node: AstNode): node is AstNode<JSDoc> {
    return node.kind === SyntaxKind.JSDoc;
}

/** @internal */
export function astIsJSDocTypeLiteral(node: AstNode): node is AstNode<JSDocTypeLiteral> {
    return node.kind === SyntaxKind.JSDocTypeLiteral;
}

/** @internal */
export function astIsJSDocSignature(node: AstNode): node is AstNode<JSDocSignature> {
    return node.kind === SyntaxKind.JSDocSignature;
}

// JSDoc Tags

/** @internal */
export function astIsJSDocAugmentsTag(node: AstNode): node is AstNode<JSDocAugmentsTag> {
    return node.kind === SyntaxKind.JSDocAugmentsTag;
}

/** @internal */
export function astIsJSDocAuthorTag(node: AstNode): node is AstNode<JSDocAuthorTag> {
    return node.kind === SyntaxKind.JSDocAuthorTag;
}

/** @internal */
export function astIsJSDocClassTag(node: AstNode): node is AstNode<JSDocClassTag> {
    return node.kind === SyntaxKind.JSDocClassTag;
}

/** @internal */
export function astIsJSDocCallbackTag(node: AstNode): node is AstNode<JSDocCallbackTag> {
    return node.kind === SyntaxKind.JSDocCallbackTag;
}

/** @internal */
export function astIsJSDocPublicTag(node: AstNode): node is AstNode<JSDocPublicTag> {
    return node.kind === SyntaxKind.JSDocPublicTag;
}

/** @internal */
export function astIsJSDocPrivateTag(node: AstNode): node is AstNode<JSDocPrivateTag> {
    return node.kind === SyntaxKind.JSDocPrivateTag;
}

/** @internal */
export function astIsJSDocProtectedTag(node: AstNode): node is AstNode<JSDocProtectedTag> {
    return node.kind === SyntaxKind.JSDocProtectedTag;
}

/** @internal */
export function astIsJSDocReadonlyTag(node: AstNode): node is AstNode<JSDocReadonlyTag> {
    return node.kind === SyntaxKind.JSDocReadonlyTag;
}

/** @internal */
export function astIsJSDocOverrideTag(node: AstNode): node is AstNode<JSDocOverrideTag> {
    return node.kind === SyntaxKind.JSDocOverrideTag;
}

/** @internal */
export function astIsJSDocOverloadTag(node: AstNode): node is AstNode<JSDocOverloadTag> {
    return node.kind === SyntaxKind.JSDocOverloadTag;
}

/** @internal */
export function astIsJSDocDeprecatedTag(node: AstNode): node is AstNode<JSDocDeprecatedTag> {
    return node.kind === SyntaxKind.JSDocDeprecatedTag;
}

/** @internal */
export function astIsJSDocSeeTag(node: AstNode): node is AstNode<JSDocSeeTag> {
    return node.kind === SyntaxKind.JSDocSeeTag;
}

/** @internal */
export function astIsJSDocEnumTag(node: AstNode): node is AstNode<JSDocEnumTag> {
    return node.kind === SyntaxKind.JSDocEnumTag;
}

/** @internal */
export function astIsJSDocParameterTag(node: AstNode): node is AstNode<JSDocParameterTag> {
    return node.kind === SyntaxKind.JSDocParameterTag;
}

/** @internal */
export function astIsJSDocReturnTag(node: AstNode): node is AstNode<JSDocReturnTag> {
    return node.kind === SyntaxKind.JSDocReturnTag;
}

/** @internal */
export function astIsJSDocThisTag(node: AstNode): node is AstNode<JSDocThisTag> {
    return node.kind === SyntaxKind.JSDocThisTag;
}

/** @internal */
export function astIsJSDocTypeTag(node: AstNode): node is AstNode<JSDocTypeTag> {
    return node.kind === SyntaxKind.JSDocTypeTag;
}

/** @internal */
export function astIsJSDocTemplateTag(node: AstNode): node is AstNode<JSDocTemplateTag> {
    return node.kind === SyntaxKind.JSDocTemplateTag;
}

/** @internal */
export function astIsJSDocTypedefTag(node: AstNode): node is AstNode<JSDocTypedefTag> {
    return node.kind === SyntaxKind.JSDocTypedefTag;
}

/** @internal */
export function astIsJSDocUnknownTag(node: AstNode): node is AstNode<JSDocUnknownTag> {
    return node.kind === SyntaxKind.JSDocTag;
}

/** @internal */
export function astIsJSDocPropertyTag(node: AstNode): node is AstNode<JSDocPropertyTag> {
    return node.kind === SyntaxKind.JSDocPropertyTag;
}

/** @internal */
export function astIsJSDocImplementsTag(node: AstNode): node is AstNode<JSDocImplementsTag> {
    return node.kind === SyntaxKind.JSDocImplementsTag;
}

/** @internal */
export function astIsJSDocSatisfiesTag(node: AstNode): node is AstNode<JSDocSatisfiesTag> {
    return node.kind === SyntaxKind.JSDocSatisfiesTag;
}

/** @internal */
export function astIsJSDocThrowsTag(node: AstNode): node is AstNode<JSDocThrowsTag> {
    return node.kind === SyntaxKind.JSDocThrowsTag;
}

/** @internal */
export function astIsJSDocImportTag(node: AstNode): node is AstNode<JSDocImportTag> {
    return node.kind === SyntaxKind.JSDocImportTag;
}

// Synthesized list

/** @internal */
export function astIsSyntaxList(n: Node): n is SyntaxList {
    return n.kind === SyntaxKind.SyntaxList;
}

// Unions

/** @internal */
export function astIsPropertyName(node: AstNode): node is AstPropertyName {
    const kind = node.kind;
    return kind === SyntaxKind.Identifier
        || kind === SyntaxKind.PrivateIdentifier
        || kind === SyntaxKind.StringLiteral
        || kind === SyntaxKind.NumericLiteral
        || kind === SyntaxKind.ComputedPropertyName;
}

/** @internal */
export function astIsPropertyAccessChain(node: AstNode): node is AstPropertyAccessChain {
    return astIsPropertyAccessExpression(node) && !!(node.flags & NodeFlags.OptionalChain);
}

/** @internal */
export function astIsElementAccessChain(node: AstNode): node is AstElementAccessChain {
    return astIsElementAccessExpression(node) && !!(node.flags & NodeFlags.OptionalChain);
}

/** @internal */
export function astIsCallChain(node: AstNode): node is AstCallChain {
    return astIsCallExpression(node) && !!(node.flags & NodeFlags.OptionalChain);
}

/** @internal */
export function astIsNonNullChain(node: AstNode): node is AstNonNullChain {
    return astIsNonNullExpression(node) && !!(node.flags & NodeFlags.OptionalChain);
}

/** @internal */
export function astIsOptionalChain(node: AstNode): node is AstPropertyAccessChain | AstElementAccessChain | AstCallChain | AstNonNullChain {
    const kind = node.kind;
    return !!(node.flags & NodeFlags.OptionalChain) &&
        (kind === SyntaxKind.PropertyAccessExpression
            || kind === SyntaxKind.ElementAccessExpression
            || kind === SyntaxKind.CallExpression
            || kind === SyntaxKind.NonNullExpression);
}

/** @internal */
export function astIsOptionalChainRoot(node: AstNode): node is AstOptionalChainRoot {
    return astIsOptionalChain(node) && !astIsNonNullExpression(node) && !!node.data.questionDotToken;
}

/** @internal */
export function astIsLeftHandSideExpression(node: AstNode): node is AstLeftHandSideExpression {
    return isLeftHandSideExpressionKind(astSkipOuterExpressions(node, OuterExpressionKinds.PartiallyEmittedExpressions).kind);
}

/** @internal */
export function astIsStringOrNumericLiteralLike(node: AstNode): node is AstStringLiteralLike | AstNumericLiteral {
    return astIsStringLiteralLike(node) || astIsNumericLiteral(node);
}

/** @internal */
export function astIsStringLiteralLike(node: AstNode): node is AstStringLiteralLike {
    return node.kind === SyntaxKind.StringLiteral || node.kind === SyntaxKind.NoSubstitutionTemplateLiteral;
}

/**
 * True if has jsdoc nodes attached to it.
 *
 * @internal
 */
export function astHasJSDocNodes(node: AstNode): node is AstHasJSDoc {
    if (!canHaveJSDoc(node)) return false;

    const { data: { jsDoc } } = node;
    return !!jsDoc && jsDoc.length > 0;
}

/** @internal */
export function astIsExpression(node: AstNode): node is AstExpression {
    return isExpressionKind(astSkipOuterExpressions(node, OuterExpressionKinds.PartiallyEmittedExpressions).kind);
}
