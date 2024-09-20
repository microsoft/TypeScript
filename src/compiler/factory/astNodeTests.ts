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
    AstHasDecorators,
    AstHasJSDoc,
    AstHasModifiers,
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
    skipAstOuterExpressions,
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
export function isAstNumericLiteral(node: AstNode): node is AstNode<NumericLiteral> {
    return node.kind === SyntaxKind.NumericLiteral;
}

/** @internal */
export function isAstBigIntLiteral(node: AstNode): node is AstNode<BigIntLiteral> {
    return node.kind === SyntaxKind.BigIntLiteral;
}

/** @internal */
export function isAstStringLiteral(node: AstNode): node is AstNode<StringLiteral> {
    return node.kind === SyntaxKind.StringLiteral;
}

/** @internal */
export function isAstJsxText(node: AstNode): node is AstNode<JsxText> {
    return node.kind === SyntaxKind.JsxText;
}

/** @internal */
export function isAstRegularExpressionLiteral(node: AstNode): node is AstNode<RegularExpressionLiteral> {
    return node.kind === SyntaxKind.RegularExpressionLiteral;
}

/** @internal */
export function isAstNoSubstitutionTemplateLiteral(node: AstNode): node is AstNode<NoSubstitutionTemplateLiteral> {
    return node.kind === SyntaxKind.NoSubstitutionTemplateLiteral;
}

// Pseudo-literals

/** @internal */
export function isAstTemplateHead(node: AstNode): node is AstNode<TemplateHead> {
    return node.kind === SyntaxKind.TemplateHead;
}

/** @internal */
export function isAstTemplateMiddle(node: AstNode): node is AstNode<TemplateMiddle> {
    return node.kind === SyntaxKind.TemplateMiddle;
}

/** @internal */
export function isAstTemplateTail(node: AstNode): node is AstNode<TemplateTail> {
    return node.kind === SyntaxKind.TemplateTail;
}

// Punctuation

/** @internal */
export function isAstDotDotDotToken(node: AstNode): node is AstNode<DotDotDotToken> {
    return node.kind === SyntaxKind.DotDotDotToken;
}

/** @internal */
export function isAstCommaToken(node: AstNode): node is AstNode<Token<SyntaxKind.CommaToken>> {
    return node.kind === SyntaxKind.CommaToken;
}

/** @internal */
export function isAstPlusToken(node: AstNode): node is AstNode<PlusToken> {
    return node.kind === SyntaxKind.PlusToken;
}

/** @internal */
export function isAstMinusToken(node: AstNode): node is AstNode<MinusToken> {
    return node.kind === SyntaxKind.MinusToken;
}

/** @internal */
export function isAstAsteriskToken(node: AstNode): node is AstNode<AsteriskToken> {
    return node.kind === SyntaxKind.AsteriskToken;
}

/** @internal */
export function isAstExclamationToken(node: AstNode): node is AstNode<ExclamationToken> {
    return node.kind === SyntaxKind.ExclamationToken;
}

/** @internal */
export function isAstQuestionToken(node: AstNode): node is AstNode<QuestionToken> {
    return node.kind === SyntaxKind.QuestionToken;
}

/** @internal */
export function isAstColonToken(node: AstNode): node is AstNode<ColonToken> {
    return node.kind === SyntaxKind.ColonToken;
}

/** @internal */
export function isAstQuestionDotToken(node: AstNode): node is AstNode<QuestionDotToken> {
    return node.kind === SyntaxKind.QuestionDotToken;
}

/** @internal */
export function isAstEqualsGreaterThanToken(node: AstNode): node is AstNode<EqualsGreaterThanToken> {
    return node.kind === SyntaxKind.EqualsGreaterThanToken;
}

// Identifiers

/** @internal */
export function isAstIdentifier(node: AstNode): node is AstNode<Identifier> {
    return node.kind === SyntaxKind.Identifier;
}

/** @internal */
export function isAstPrivateIdentifier(node: AstNode): node is AstNode<PrivateIdentifier> {
    return node.kind === SyntaxKind.PrivateIdentifier;
}

// Reserved Words

/** @internal */
export function isAstExportModifier(node: AstNode): node is AstNode<ExportKeyword> {
    return node.kind === SyntaxKind.ExportKeyword;
}

/** @internal */
export function isAstDefaultModifier(node: AstNode): node is AstNode<DefaultKeyword> {
    return node.kind === SyntaxKind.DefaultKeyword;
}

/** @internal */
export function isAstAsyncModifier(node: AstNode): node is AstNode<AsyncKeyword> {
    return node.kind === SyntaxKind.AsyncKeyword;
}

/** @internal */
export function isAstAssertsKeyword(node: AstNode): node is AstNode<AssertsKeyword> {
    return node.kind === SyntaxKind.AssertsKeyword;
}

/** @internal */
export function isAstAwaitKeyword(node: AstNode): node is AstNode<AwaitKeyword> {
    return node.kind === SyntaxKind.AwaitKeyword;
}

/** @internal */
export function isAstReadonlyKeyword(node: AstNode): node is AstNode<ReadonlyKeyword> {
    return node.kind === SyntaxKind.ReadonlyKeyword;
}

/** @internal */
export function isAstStaticModifier(node: AstNode): node is AstNode<StaticKeyword> {
    return node.kind === SyntaxKind.StaticKeyword;
}

/** @internal */
export function isAstAbstractModifier(node: AstNode): node is AstNode<AbstractKeyword> {
    return node.kind === SyntaxKind.AbstractKeyword;
}

/** @internal */
export function isAstOverrideModifier(node: AstNode): node is AstNode<OverrideKeyword> {
    return node.kind === SyntaxKind.OverrideKeyword;
}

/** @internal */
export function isAstAccessorModifier(node: AstNode): node is AstNode<AccessorKeyword> {
    return node.kind === SyntaxKind.AccessorKeyword;
}

/** @internal */
export function isAstSuperKeyword(node: AstNode): node is AstNode<SuperExpression> {
    return node.kind === SyntaxKind.SuperKeyword;
}

/** @internal */
export function isAstImportKeyword(node: AstNode): node is AstNode<ImportExpression> {
    return node.kind === SyntaxKind.ImportKeyword;
}

/** @internal */
export function isAstCaseKeyword(node: AstNode): node is AstNode<CaseKeyword> {
    return node.kind === SyntaxKind.CaseKeyword;
}

/** @internal */
export function isAstDeclareKeyword(node: AstNode): node is AstDeclareKeyword {
    return node.kind === SyntaxKind.DeclareKeyword;
}

// Names

/** @internal */
export function isAstQualifiedName(node: AstNode): node is AstNode<QualifiedName> {
    return node.kind === SyntaxKind.QualifiedName;
}

/** @internal */
export function isAstComputedPropertyName(node: AstNode): node is AstNode<ComputedPropertyName> {
    return node.kind === SyntaxKind.ComputedPropertyName;
}

// Signature elements

/** @internal */
export function isAstTypeParameterDeclaration(node: AstNode): node is AstNode<TypeParameterDeclaration> {
    return node.kind === SyntaxKind.TypeParameter;
}

/** @internal */
// TODO(rbuckton): Rename to 'isParameterDeclaration'
export function isAstParameter(node: AstNode): node is AstNode<ParameterDeclaration> {
    return node.kind === SyntaxKind.Parameter;
}

/** @internal */
export function isAstDecorator(node: AstNode): node is AstNode<Decorator> {
    return node.kind === SyntaxKind.Decorator;
}

// TypeMember

/** @internal */
export function isAstPropertySignature(node: AstNode): node is AstNode<PropertySignature> {
    return node.kind === SyntaxKind.PropertySignature;
}

/** @internal */
export function isAstPropertyDeclaration(node: AstNode): node is AstNode<PropertyDeclaration> {
    return node.kind === SyntaxKind.PropertyDeclaration;
}

/** @internal */
export function isAstMethodSignature(node: AstNode): node is AstNode<MethodSignature> {
    return node.kind === SyntaxKind.MethodSignature;
}

/** @internal */
export function isAstMethodDeclaration(node: AstNode): node is AstNode<MethodDeclaration> {
    return node.kind === SyntaxKind.MethodDeclaration;
}

/** @internal */
export function isAstClassStaticBlockDeclaration(node: AstNode): node is AstNode<ClassStaticBlockDeclaration> {
    return node.kind === SyntaxKind.ClassStaticBlockDeclaration;
}

/** @internal */
export function isAstConstructorDeclaration(node: AstNode): node is AstNode<ConstructorDeclaration> {
    return node.kind === SyntaxKind.Constructor;
}

/** @internal */
export function isAstGetAccessorDeclaration(node: AstNode): node is AstNode<GetAccessorDeclaration> {
    return node.kind === SyntaxKind.GetAccessor;
}

/** @internal */
export function isAstSetAccessorDeclaration(node: AstNode): node is AstNode<SetAccessorDeclaration> {
    return node.kind === SyntaxKind.SetAccessor;
}

/** @internal */
export function isAstCallSignatureDeclaration(node: AstNode): node is AstNode<CallSignatureDeclaration> {
    return node.kind === SyntaxKind.CallSignature;
}

/** @internal */
export function isAstConstructSignatureDeclaration(node: AstNode): node is AstNode<ConstructSignatureDeclaration> {
    return node.kind === SyntaxKind.ConstructSignature;
}

/** @internal */
export function isAstIndexSignatureDeclaration(node: AstNode): node is AstNode<IndexSignatureDeclaration> {
    return node.kind === SyntaxKind.IndexSignature;
}

// Type

/** @internal */
export function isAstTypePredicateNode(node: AstNode): node is AstNode<TypePredicateNode> {
    return node.kind === SyntaxKind.TypePredicate;
}

/** @internal */
export function isAstTypeReferenceNode(node: AstNode): node is AstNode<TypeReferenceNode> {
    return node.kind === SyntaxKind.TypeReference;
}

/** @internal */
export function isAstFunctionTypeNode(node: AstNode): node is AstNode<FunctionTypeNode> {
    return node.kind === SyntaxKind.FunctionType;
}

/** @internal */
export function isAstConstructorTypeNode(node: AstNode): node is AstNode<ConstructorTypeNode> {
    return node.kind === SyntaxKind.ConstructorType;
}

/** @internal */
export function isAstTypeQueryNode(node: AstNode): node is AstNode<TypeQueryNode> {
    return node.kind === SyntaxKind.TypeQuery;
}

/** @internal */
export function isAstTypeLiteralNode(node: AstNode): node is AstNode<TypeLiteralNode> {
    return node.kind === SyntaxKind.TypeLiteral;
}

/** @internal */
export function isAstArrayTypeNode(node: AstNode): node is AstNode<ArrayTypeNode> {
    return node.kind === SyntaxKind.ArrayType;
}

/** @internal */
export function isAstTupleTypeNode(node: AstNode): node is AstNode<TupleTypeNode> {
    return node.kind === SyntaxKind.TupleType;
}

/** @internal */
export function isAstNamedTupleMember(node: AstNode): node is AstNode<NamedTupleMember> {
    return node.kind === SyntaxKind.NamedTupleMember;
}

/** @internal */
export function isAstOptionalTypeNode(node: AstNode): node is AstNode<OptionalTypeNode> {
    return node.kind === SyntaxKind.OptionalType;
}

/** @internal */
export function isAstRestTypeNode(node: AstNode): node is AstNode<RestTypeNode> {
    return node.kind === SyntaxKind.RestType;
}

/** @internal */
export function isAstUnionTypeNode(node: AstNode): node is AstNode<UnionTypeNode> {
    return node.kind === SyntaxKind.UnionType;
}

/** @internal */
export function isAstIntersectionTypeNode(node: AstNode): node is AstNode<IntersectionTypeNode> {
    return node.kind === SyntaxKind.IntersectionType;
}

/** @internal */
export function isAstConditionalTypeNode(node: AstNode): node is AstNode<ConditionalTypeNode> {
    return node.kind === SyntaxKind.ConditionalType;
}

/** @internal */
export function isAstInferTypeNode(node: AstNode): node is AstNode<InferTypeNode> {
    return node.kind === SyntaxKind.InferType;
}

/** @internal */
export function isAstParenthesizedTypeNode(node: AstNode): node is AstNode<ParenthesizedTypeNode> {
    return node.kind === SyntaxKind.ParenthesizedType;
}

/** @internal */
export function isAstThisTypeNode(node: AstNode): node is AstNode<ThisTypeNode> {
    return node.kind === SyntaxKind.ThisType;
}

/** @internal */
export function isAstTypeOperatorNode(node: AstNode): node is AstNode<TypeOperatorNode> {
    return node.kind === SyntaxKind.TypeOperator;
}

/** @internal */
export function isAstIndexedAccessTypeNode(node: AstNode): node is AstNode<IndexedAccessTypeNode> {
    return node.kind === SyntaxKind.IndexedAccessType;
}

/** @internal */
export function isAstMappedTypeNode(node: AstNode): node is AstNode<MappedTypeNode> {
    return node.kind === SyntaxKind.MappedType;
}

/** @internal */
export function isAstLiteralTypeNode(node: AstNode): node is AstNode<LiteralTypeNode> {
    return node.kind === SyntaxKind.LiteralType;
}

/** @internal */
export function isAstImportTypeNode(node: AstNode): node is AstNode<ImportTypeNode> {
    return node.kind === SyntaxKind.ImportType;
}

/** @internal */
export function isAstTemplateLiteralTypeSpan(node: AstNode): node is AstNode<TemplateLiteralTypeSpan> {
    return node.kind === SyntaxKind.TemplateLiteralTypeSpan;
}

/** @internal */
export function isAstTemplateLiteralTypeNode(node: AstNode): node is AstNode<TemplateLiteralTypeNode> {
    return node.kind === SyntaxKind.TemplateLiteralType;
}

// Binding patterns

/** @internal */
export function isAstObjectBindingPattern(node: AstNode): node is AstNode<ObjectBindingPattern> {
    return node.kind === SyntaxKind.ObjectBindingPattern;
}

/** @internal */
export function isAstArrayBindingPattern(node: AstNode): node is AstNode<ArrayBindingPattern> {
    return node.kind === SyntaxKind.ArrayBindingPattern;
}

/** @internal */
export function isAstBindingElement(node: AstNode): node is AstNode<BindingElement> {
    return node.kind === SyntaxKind.BindingElement;
}

// Expression

/** @internal */
export function isAstArrayLiteralExpression(node: AstNode): node is AstNode<ArrayLiteralExpression> {
    return node.kind === SyntaxKind.ArrayLiteralExpression;
}

/** @internal */
export function isAstObjectLiteralExpression(node: AstNode): node is AstNode<ObjectLiteralExpression> {
    return node.kind === SyntaxKind.ObjectLiteralExpression;
}

/** @internal */
export function isAstPropertyAccessExpression(node: AstNode): node is AstNode<PropertyAccessExpression> {
    return node.kind === SyntaxKind.PropertyAccessExpression;
}

/** @internal */
export function isAstElementAccessExpression(node: AstNode): node is AstNode<ElementAccessExpression> {
    return node.kind === SyntaxKind.ElementAccessExpression;
}

/** @internal */
export function isAstCallExpression(node: AstNode): node is AstNode<CallExpression> {
    return node.kind === SyntaxKind.CallExpression;
}

/** @internal */
export function isAstNewExpression(node: AstNode): node is AstNode<NewExpression> {
    return node.kind === SyntaxKind.NewExpression;
}

/** @internal */
export function isAstTaggedTemplateExpression(node: AstNode): node is AstNode<TaggedTemplateExpression> {
    return node.kind === SyntaxKind.TaggedTemplateExpression;
}

/** @internal */
export function isAstTypeAssertionExpression(node: AstNode): node is AstNode<TypeAssertionExpression> {
    return node.kind === SyntaxKind.TypeAssertionExpression;
}

/** @internal */
export function isAstParenthesizedExpression(node: AstNode): node is AstNode<ParenthesizedExpression> {
    return node.kind === SyntaxKind.ParenthesizedExpression;
}

/** @internal */
export function isAstFunctionExpression(node: AstNode): node is AstNode<FunctionExpression> {
    return node.kind === SyntaxKind.FunctionExpression;
}

/** @internal */
export function isAstArrowFunction(node: AstNode): node is AstNode<ArrowFunction> {
    return node.kind === SyntaxKind.ArrowFunction;
}

/** @internal */
export function isAstDeleteExpression(node: AstNode): node is AstNode<DeleteExpression> {
    return node.kind === SyntaxKind.DeleteExpression;
}

/** @internal */
export function isAstTypeOfExpression(node: AstNode): node is AstNode<TypeOfExpression> {
    return node.kind === SyntaxKind.TypeOfExpression;
}

/** @internal */
export function isAstVoidExpression(node: AstNode): node is AstNode<VoidExpression> {
    return node.kind === SyntaxKind.VoidExpression;
}

/** @internal */
export function isAstAwaitExpression(node: AstNode): node is AstNode<AwaitExpression> {
    return node.kind === SyntaxKind.AwaitExpression;
}

/** @internal */
export function isAstPrefixUnaryExpression(node: AstNode): node is AstNode<PrefixUnaryExpression> {
    return node.kind === SyntaxKind.PrefixUnaryExpression;
}

/** @internal */
export function isAstPostfixUnaryExpression(node: AstNode): node is AstNode<PostfixUnaryExpression> {
    return node.kind === SyntaxKind.PostfixUnaryExpression;
}

/** @internal */
export function isAstBinaryExpression(node: AstNode): node is AstNode<BinaryExpression> {
    return node.kind === SyntaxKind.BinaryExpression;
}

/** @internal */
export function isAstConditionalExpression(node: AstNode): node is AstNode<ConditionalExpression> {
    return node.kind === SyntaxKind.ConditionalExpression;
}

/** @internal */
export function isAstTemplateExpression(node: AstNode): node is AstNode<TemplateExpression> {
    return node.kind === SyntaxKind.TemplateExpression;
}

/** @internal */
export function isAstYieldExpression(node: AstNode): node is AstNode<YieldExpression> {
    return node.kind === SyntaxKind.YieldExpression;
}

/** @internal */
export function isAstSpreadElement(node: AstNode): node is AstNode<SpreadElement> {
    return node.kind === SyntaxKind.SpreadElement;
}

/** @internal */
export function isAstClassExpression(node: AstNode): node is AstNode<ClassExpression> {
    return node.kind === SyntaxKind.ClassExpression;
}

/** @internal */
export function isAstOmittedExpression(node: AstNode): node is AstNode<OmittedExpression> {
    return node.kind === SyntaxKind.OmittedExpression;
}

/** @internal */
export function isAstExpressionWithTypeArguments(node: AstNode): node is AstNode<ExpressionWithTypeArguments> {
    return node.kind === SyntaxKind.ExpressionWithTypeArguments;
}

/** @internal */
export function isAstAsExpression(node: AstNode): node is AstNode<AsExpression> {
    return node.kind === SyntaxKind.AsExpression;
}

/** @internal */
export function isAstSatisfiesExpression(node: AstNode): node is AstNode<SatisfiesExpression> {
    return node.kind === SyntaxKind.SatisfiesExpression;
}

/** @internal */
export function isAstNonNullExpression(node: AstNode): node is AstNode<NonNullExpression> {
    return node.kind === SyntaxKind.NonNullExpression;
}

/** @internal */
export function isAstMetaProperty(node: AstNode): node is AstNode<MetaProperty> {
    return node.kind === SyntaxKind.MetaProperty;
}

/** @internal */
export function isAstSyntheticExpression(node: AstNode): node is AstNode<SyntheticExpression> {
    return node.kind === SyntaxKind.SyntheticExpression;
}

/** @internal */
export function isAstPartiallyEmittedExpression(node: AstNode): node is AstNode<PartiallyEmittedExpression> {
    return node.kind === SyntaxKind.PartiallyEmittedExpression;
}

/** @internal */
export function isAstCommaListExpression(node: AstNode): node is AstNode<CommaListExpression> {
    return node.kind === SyntaxKind.CommaListExpression;
}

// Misc

/** @internal */
export function isAstTemplateSpan(node: AstNode): node is AstNode<TemplateSpan> {
    return node.kind === SyntaxKind.TemplateSpan;
}

/** @internal */
export function isAstSemicolonClassElement(node: AstNode): node is AstNode<SemicolonClassElement> {
    return node.kind === SyntaxKind.SemicolonClassElement;
}

// Elements

/** @internal */
export function isAstBlock(node: AstNode): node is AstNode<Block> {
    return node.kind === SyntaxKind.Block;
}

/** @internal */
export function isAstVariableStatement(node: AstNode): node is AstNode<VariableStatement> {
    return node.kind === SyntaxKind.VariableStatement;
}

/** @internal */
export function isAstEmptyStatement(node: AstNode): node is AstNode<EmptyStatement> {
    return node.kind === SyntaxKind.EmptyStatement;
}

/** @internal */
export function isAstExpressionStatement(node: AstNode): node is AstNode<ExpressionStatement> {
    return node.kind === SyntaxKind.ExpressionStatement;
}

/** @internal */
export function isAstIfStatement(node: AstNode): node is AstNode<IfStatement> {
    return node.kind === SyntaxKind.IfStatement;
}

/** @internal */
export function isAstDoStatement(node: AstNode): node is AstNode<DoStatement> {
    return node.kind === SyntaxKind.DoStatement;
}

/** @internal */
export function isAstWhileStatement(node: AstNode): node is AstNode<WhileStatement> {
    return node.kind === SyntaxKind.WhileStatement;
}

/** @internal */
export function isAstForStatement(node: AstNode): node is AstNode<ForStatement> {
    return node.kind === SyntaxKind.ForStatement;
}

/** @internal */
export function isAstForInStatement(node: AstNode): node is AstNode<ForInStatement> {
    return node.kind === SyntaxKind.ForInStatement;
}

/** @internal */
export function isAstForOfStatement(node: AstNode): node is AstNode<ForOfStatement> {
    return node.kind === SyntaxKind.ForOfStatement;
}

/** @internal */
export function isAstContinueStatement(node: AstNode): node is AstNode<ContinueStatement> {
    return node.kind === SyntaxKind.ContinueStatement;
}

/** @internal */
export function isAstBreakStatement(node: AstNode): node is AstNode<BreakStatement> {
    return node.kind === SyntaxKind.BreakStatement;
}

/** @internal */
export function isAstReturnStatement(node: AstNode): node is AstNode<ReturnStatement> {
    return node.kind === SyntaxKind.ReturnStatement;
}

/** @internal */
export function isAstWithStatement(node: AstNode): node is AstNode<WithStatement> {
    return node.kind === SyntaxKind.WithStatement;
}

/** @internal */
export function isAstSwitchStatement(node: AstNode): node is AstNode<SwitchStatement> {
    return node.kind === SyntaxKind.SwitchStatement;
}

/** @internal */
export function isAstLabeledStatement(node: AstNode): node is AstNode<LabeledStatement> {
    return node.kind === SyntaxKind.LabeledStatement;
}

/** @internal */
export function isAstThrowStatement(node: AstNode): node is AstNode<ThrowStatement> {
    return node.kind === SyntaxKind.ThrowStatement;
}

/** @internal */
export function isAstTryStatement(node: AstNode): node is AstNode<TryStatement> {
    return node.kind === SyntaxKind.TryStatement;
}

/** @internal */
export function isAstDebuggerStatement(node: AstNode): node is AstNode<DebuggerStatement> {
    return node.kind === SyntaxKind.DebuggerStatement;
}

/** @internal */
export function isAstVariableDeclaration(node: AstNode): node is AstNode<VariableDeclaration> {
    return node.kind === SyntaxKind.VariableDeclaration;
}

/** @internal */
export function isAstVariableDeclarationList(node: AstNode): node is AstNode<VariableDeclarationList> {
    return node.kind === SyntaxKind.VariableDeclarationList;
}

/** @internal */
export function isAstFunctionDeclaration(node: AstNode): node is AstNode<FunctionDeclaration> {
    return node.kind === SyntaxKind.FunctionDeclaration;
}

/** @internal */
export function isAstClassDeclaration(node: AstNode): node is AstNode<ClassDeclaration> {
    return node.kind === SyntaxKind.ClassDeclaration;
}

/** @internal */
export function isAstInterfaceDeclaration(node: AstNode): node is AstNode<InterfaceDeclaration> {
    return node.kind === SyntaxKind.InterfaceDeclaration;
}

/** @internal */
export function isAstTypeAliasDeclaration(node: AstNode): node is AstNode<TypeAliasDeclaration> {
    return node.kind === SyntaxKind.TypeAliasDeclaration;
}

/** @internal */
export function isAstEnumDeclaration(node: AstNode): node is AstNode<EnumDeclaration> {
    return node.kind === SyntaxKind.EnumDeclaration;
}

/** @internal */
export function isAstModuleDeclaration(node: AstNode): node is AstNode<ModuleDeclaration> {
    return node.kind === SyntaxKind.ModuleDeclaration;
}

/** @internal */
export function isAstModuleBlock(node: AstNode): node is AstNode<ModuleBlock> {
    return node.kind === SyntaxKind.ModuleBlock;
}

/** @internal */
export function isAstCaseBlock(node: AstNode): node is AstNode<CaseBlock> {
    return node.kind === SyntaxKind.CaseBlock;
}

/** @internal */
export function isAstNamespaceExportDeclaration(node: AstNode): node is AstNode<NamespaceExportDeclaration> {
    return node.kind === SyntaxKind.NamespaceExportDeclaration;
}

/** @internal */
export function isAstImportEqualsDeclaration(node: AstNode): node is AstNode<ImportEqualsDeclaration> {
    return node.kind === SyntaxKind.ImportEqualsDeclaration;
}

/** @internal */
export function isAstImportDeclaration(node: AstNode): node is AstNode<ImportDeclaration> {
    return node.kind === SyntaxKind.ImportDeclaration;
}

/** @internal */
export function isAstImportClause(node: AstNode): node is AstNode<ImportClause> {
    return node.kind === SyntaxKind.ImportClause;
}

/** @internal */
export function isAstImportTypeAssertionContainer(node: AstNode): node is AstNode<ImportTypeAssertionContainer> {
    return node.kind === SyntaxKind.ImportTypeAssertionContainer;
}

/**
 * @deprecated
 * @internal
 */
export function isAstAssertClause(node: AstNode): node is AstNode<AssertClause> {
    return node.kind === SyntaxKind.AssertClause;
}

/**
 * @deprecated
 * @internal
 */
export function isAstAssertEntry(node: AstNode): node is AstNode<AssertEntry> {
    return node.kind === SyntaxKind.AssertEntry;
}

/** @internal */
export function isAstImportAttributes(node: AstNode): node is AstNode<ImportAttributes> {
    return node.kind === SyntaxKind.ImportAttributes;
}

/** @internal */
export function isAstImportAttribute(node: AstNode): node is AstNode<ImportAttribute> {
    return node.kind === SyntaxKind.ImportAttribute;
}

/** @internal */
export function isAstNamespaceImport(node: AstNode): node is AstNode<NamespaceImport> {
    return node.kind === SyntaxKind.NamespaceImport;
}

/** @internal */
export function isAstNamespaceExport(node: AstNode): node is AstNode<NamespaceExport> {
    return node.kind === SyntaxKind.NamespaceExport;
}

/** @internal */
export function isAstNamedImports(node: AstNode): node is AstNode<NamedImports> {
    return node.kind === SyntaxKind.NamedImports;
}

/** @internal */
export function isAstImportSpecifier(node: AstNode): node is AstNode<ImportSpecifier> {
    return node.kind === SyntaxKind.ImportSpecifier;
}

/** @internal */
export function isAstExportAssignment(node: AstNode): node is AstNode<ExportAssignment> {
    return node.kind === SyntaxKind.ExportAssignment;
}

/** @internal */
export function isAstExportDeclaration(node: AstNode): node is AstNode<ExportDeclaration> {
    return node.kind === SyntaxKind.ExportDeclaration;
}

/** @internal */
export function isAstNamedExports(node: AstNode): node is AstNode<NamedExports> {
    return node.kind === SyntaxKind.NamedExports;
}

/** @internal */
export function isAstExportSpecifier(node: AstNode): node is AstNode<ExportSpecifier> {
    return node.kind === SyntaxKind.ExportSpecifier;
}

/** @internal */
export function isAstModuleExportName(node: AstNode): node is AstNode<ModuleExportName> {
    return node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.StringLiteral;
}

/** @internal */
export function isAstMissingDeclaration(node: AstNode): node is AstNode<MissingDeclaration> {
    return node.kind === SyntaxKind.MissingDeclaration;
}

/** @internal */
export function isAstNotEmittedStatement(node: AstNode): node is AstNode<NotEmittedStatement> {
    return node.kind === SyntaxKind.NotEmittedStatement;
}

/** @internal */
export function isAstSyntheticReference(node: AstNode): node is AstNode<SyntheticReferenceExpression> {
    return node.kind === SyntaxKind.SyntheticReferenceExpression;
}

// Module References

/** @internal */
export function isAstExternalModuleReference(node: AstNode): node is AstNode<ExternalModuleReference> {
    return node.kind === SyntaxKind.ExternalModuleReference;
}

// JSX

/** @internal */
export function isAstJsxElement(node: AstNode): node is AstNode<JsxElement> {
    return node.kind === SyntaxKind.JsxElement;
}

/** @internal */
export function isAstJsxSelfClosingElement(node: AstNode): node is AstNode<JsxSelfClosingElement> {
    return node.kind === SyntaxKind.JsxSelfClosingElement;
}

/** @internal */
export function isAstJsxOpeningElement(node: AstNode): node is AstNode<JsxOpeningElement> {
    return node.kind === SyntaxKind.JsxOpeningElement;
}

/** @internal */
export function isAstJsxClosingElement(node: AstNode): node is AstNode<JsxClosingElement> {
    return node.kind === SyntaxKind.JsxClosingElement;
}

/** @internal */
export function isAstJsxFragment(node: AstNode): node is AstNode<JsxFragment> {
    return node.kind === SyntaxKind.JsxFragment;
}

/** @internal */
export function isAstJsxOpeningFragment(node: AstNode): node is AstNode<JsxOpeningFragment> {
    return node.kind === SyntaxKind.JsxOpeningFragment;
}

/** @internal */
export function isAstJsxClosingFragment(node: AstNode): node is AstNode<JsxClosingFragment> {
    return node.kind === SyntaxKind.JsxClosingFragment;
}

/** @internal */
export function isAstJsxAttribute(node: AstNode): node is AstNode<JsxAttribute> {
    return node.kind === SyntaxKind.JsxAttribute;
}

/** @internal */
export function isAstJsxAttributes(node: AstNode): node is AstNode<JsxAttributes> {
    return node.kind === SyntaxKind.JsxAttributes;
}

/** @internal */
export function isAstJsxSpreadAttribute(node: AstNode): node is AstNode<JsxSpreadAttribute> {
    return node.kind === SyntaxKind.JsxSpreadAttribute;
}

/** @internal */
export function isAstJsxExpression(node: AstNode): node is AstNode<JsxExpression> {
    return node.kind === SyntaxKind.JsxExpression;
}

/** @internal */
export function isAstJsxNamespacedName(node: AstNode): node is AstNode<JsxNamespacedName> {
    return node.kind === SyntaxKind.JsxNamespacedName;
}

// Clauses

/** @internal */
export function isAstCaseClause(node: AstNode): node is AstNode<CaseClause> {
    return node.kind === SyntaxKind.CaseClause;
}

/** @internal */
export function isAstDefaultClause(node: AstNode): node is AstNode<DefaultClause> {
    return node.kind === SyntaxKind.DefaultClause;
}

/** @internal */
export function isAstHeritageClause(node: AstNode): node is AstNode<HeritageClause> {
    return node.kind === SyntaxKind.HeritageClause;
}

/** @internal */
export function isAstCatchClause(node: AstNode): node is AstNode<CatchClause> {
    return node.kind === SyntaxKind.CatchClause;
}

// Property assignments

/** @internal */
export function isAstPropertyAssignment(node: AstNode): node is AstNode<PropertyAssignment> {
    return node.kind === SyntaxKind.PropertyAssignment;
}

/** @internal */
export function isAstShorthandPropertyAssignment(node: AstNode): node is AstNode<ShorthandPropertyAssignment> {
    return node.kind === SyntaxKind.ShorthandPropertyAssignment;
}

/** @internal */
export function isAstSpreadAssignment(node: AstNode): node is AstNode<SpreadAssignment> {
    return node.kind === SyntaxKind.SpreadAssignment;
}

// Enum

/** @internal */
export function isAstEnumMember(node: AstNode): node is AstNode<EnumMember> {
    return node.kind === SyntaxKind.EnumMember;
}

/** @internal */
// Top-level nodes
export function isAstSourceFile(node: AstNode): node is AstNode<SourceFile> {
    return node.kind === SyntaxKind.SourceFile;
}

/** @internal */
export function isAstBundle(node: AstNode): node is AstNode<Bundle> {
    return node.kind === SyntaxKind.Bundle;
}

// TODO(rbuckton): isInputFiles

// JSDoc Elements

/** @internal */
export function isAstJSDocTypeExpression(node: AstNode): node is AstNode<JSDocTypeExpression> {
    return node.kind === SyntaxKind.JSDocTypeExpression;
}

/** @internal */
export function isAstJSDocNameReference(node: AstNode): node is AstNode<JSDocNameReference> {
    return node.kind === SyntaxKind.JSDocNameReference;
}

/** @internal */
export function isAstJSDocMemberName(node: AstNode): node is AstNode<JSDocMemberName> {
    return node.kind === SyntaxKind.JSDocMemberName;
}

/** @internal */
export function isAstJSDocLink(node: AstNode): node is AstNode<JSDocLink> {
    return node.kind === SyntaxKind.JSDocLink;
}

/** @internal */
export function isAstJSDocLinkCode(node: AstNode): node is AstNode<JSDocLinkCode> {
    return node.kind === SyntaxKind.JSDocLinkCode;
}

/** @internal */
export function isAstJSDocLinkPlain(node: AstNode): node is AstNode<JSDocLinkPlain> {
    return node.kind === SyntaxKind.JSDocLinkPlain;
}

/** @internal */
export function isAstJSDocAllType(node: AstNode): node is AstNode<JSDocAllType> {
    return node.kind === SyntaxKind.JSDocAllType;
}

/** @internal */
export function isAstJSDocUnknownType(node: AstNode): node is AstNode<JSDocUnknownType> {
    return node.kind === SyntaxKind.JSDocUnknownType;
}

/** @internal */
export function isAstJSDocNullableType(node: AstNode): node is AstNode<JSDocNullableType> {
    return node.kind === SyntaxKind.JSDocNullableType;
}

/** @internal */
export function isAstJSDocNonNullableType(node: AstNode): node is AstNode<JSDocNonNullableType> {
    return node.kind === SyntaxKind.JSDocNonNullableType;
}

/** @internal */
export function isAstJSDocOptionalType(node: AstNode): node is AstNode<JSDocOptionalType> {
    return node.kind === SyntaxKind.JSDocOptionalType;
}

/** @internal */
export function isAstJSDocFunctionType(node: AstNode): node is AstNode<JSDocFunctionType> {
    return node.kind === SyntaxKind.JSDocFunctionType;
}

/** @internal */
export function isAstJSDocVariadicType(node: AstNode): node is AstNode<JSDocVariadicType> {
    return node.kind === SyntaxKind.JSDocVariadicType;
}

/** @internal */
export function isAstJSDocNamepathType(node: AstNode): node is AstNode<JSDocNamepathType> {
    return node.kind === SyntaxKind.JSDocNamepathType;
}

/** @internal */
export function isAstJSDoc(node: AstNode): node is AstNode<JSDoc> {
    return node.kind === SyntaxKind.JSDoc;
}

/** @internal */
export function isAstJSDocTypeLiteral(node: AstNode): node is AstNode<JSDocTypeLiteral> {
    return node.kind === SyntaxKind.JSDocTypeLiteral;
}

/** @internal */
export function isAstJSDocSignature(node: AstNode): node is AstNode<JSDocSignature> {
    return node.kind === SyntaxKind.JSDocSignature;
}

// JSDoc Tags

/** @internal */
export function isAstJSDocAugmentsTag(node: AstNode): node is AstNode<JSDocAugmentsTag> {
    return node.kind === SyntaxKind.JSDocAugmentsTag;
}

/** @internal */
export function isAstJSDocAuthorTag(node: AstNode): node is AstNode<JSDocAuthorTag> {
    return node.kind === SyntaxKind.JSDocAuthorTag;
}

/** @internal */
export function isAstJSDocClassTag(node: AstNode): node is AstNode<JSDocClassTag> {
    return node.kind === SyntaxKind.JSDocClassTag;
}

/** @internal */
export function isAstJSDocCallbackTag(node: AstNode): node is AstNode<JSDocCallbackTag> {
    return node.kind === SyntaxKind.JSDocCallbackTag;
}

/** @internal */
export function isAstJSDocPublicTag(node: AstNode): node is AstNode<JSDocPublicTag> {
    return node.kind === SyntaxKind.JSDocPublicTag;
}

/** @internal */
export function isAstJSDocPrivateTag(node: AstNode): node is AstNode<JSDocPrivateTag> {
    return node.kind === SyntaxKind.JSDocPrivateTag;
}

/** @internal */
export function isAstJSDocProtectedTag(node: AstNode): node is AstNode<JSDocProtectedTag> {
    return node.kind === SyntaxKind.JSDocProtectedTag;
}

/** @internal */
export function isAstJSDocReadonlyTag(node: AstNode): node is AstNode<JSDocReadonlyTag> {
    return node.kind === SyntaxKind.JSDocReadonlyTag;
}

/** @internal */
export function isAstJSDocOverrideTag(node: AstNode): node is AstNode<JSDocOverrideTag> {
    return node.kind === SyntaxKind.JSDocOverrideTag;
}

/** @internal */
export function isAstJSDocOverloadTag(node: AstNode): node is AstNode<JSDocOverloadTag> {
    return node.kind === SyntaxKind.JSDocOverloadTag;
}

/** @internal */
export function isAstJSDocDeprecatedTag(node: AstNode): node is AstNode<JSDocDeprecatedTag> {
    return node.kind === SyntaxKind.JSDocDeprecatedTag;
}

/** @internal */
export function isAstJSDocSeeTag(node: AstNode): node is AstNode<JSDocSeeTag> {
    return node.kind === SyntaxKind.JSDocSeeTag;
}

/** @internal */
export function isAstJSDocEnumTag(node: AstNode): node is AstNode<JSDocEnumTag> {
    return node.kind === SyntaxKind.JSDocEnumTag;
}

/** @internal */
export function isAstJSDocParameterTag(node: AstNode): node is AstNode<JSDocParameterTag> {
    return node.kind === SyntaxKind.JSDocParameterTag;
}

/** @internal */
export function isAstJSDocReturnTag(node: AstNode): node is AstNode<JSDocReturnTag> {
    return node.kind === SyntaxKind.JSDocReturnTag;
}

/** @internal */
export function isAstJSDocThisTag(node: AstNode): node is AstNode<JSDocThisTag> {
    return node.kind === SyntaxKind.JSDocThisTag;
}

/** @internal */
export function isAstJSDocTypeTag(node: AstNode): node is AstNode<JSDocTypeTag> {
    return node.kind === SyntaxKind.JSDocTypeTag;
}

/** @internal */
export function isAstJSDocTemplateTag(node: AstNode): node is AstNode<JSDocTemplateTag> {
    return node.kind === SyntaxKind.JSDocTemplateTag;
}

/** @internal */
export function isAstJSDocTypedefTag(node: AstNode): node is AstNode<JSDocTypedefTag> {
    return node.kind === SyntaxKind.JSDocTypedefTag;
}

/** @internal */
export function isAstJSDocUnknownTag(node: AstNode): node is AstNode<JSDocUnknownTag> {
    return node.kind === SyntaxKind.JSDocTag;
}

/** @internal */
export function isAstJSDocPropertyTag(node: AstNode): node is AstNode<JSDocPropertyTag> {
    return node.kind === SyntaxKind.JSDocPropertyTag;
}

/** @internal */
export function isAstJSDocImplementsTag(node: AstNode): node is AstNode<JSDocImplementsTag> {
    return node.kind === SyntaxKind.JSDocImplementsTag;
}

/** @internal */
export function isAstJSDocSatisfiesTag(node: AstNode): node is AstNode<JSDocSatisfiesTag> {
    return node.kind === SyntaxKind.JSDocSatisfiesTag;
}

/** @internal */
export function isAstJSDocThrowsTag(node: AstNode): node is AstNode<JSDocThrowsTag> {
    return node.kind === SyntaxKind.JSDocThrowsTag;
}

/** @internal */
export function isAstJSDocImportTag(node: AstNode): node is AstNode<JSDocImportTag> {
    return node.kind === SyntaxKind.JSDocImportTag;
}

// Synthesized list

/** @internal */
export function isAstSyntaxList(n: Node): n is SyntaxList {
    return n.kind === SyntaxKind.SyntaxList;
}

// Unions

/** @internal */
export function isAstPropertyName(node: AstNode): node is AstPropertyName {
    const kind = node.kind;
    return kind === SyntaxKind.Identifier
        || kind === SyntaxKind.PrivateIdentifier
        || kind === SyntaxKind.StringLiteral
        || kind === SyntaxKind.NumericLiteral
        || kind === SyntaxKind.ComputedPropertyName;
}

/** @internal */
export function isAstPropertyAccessChain(node: AstNode): node is AstPropertyAccessChain {
    return isAstPropertyAccessExpression(node) && !!(node.flags & NodeFlags.OptionalChain);
}

/** @internal */
export function isAstElementAccessChain(node: AstNode): node is AstElementAccessChain {
    return isAstElementAccessExpression(node) && !!(node.flags & NodeFlags.OptionalChain);
}

/** @internal */
export function isAstCallChain(node: AstNode): node is AstCallChain {
    return isAstCallExpression(node) && !!(node.flags & NodeFlags.OptionalChain);
}

/** @internal */
export function isAstNonNullChain(node: AstNode): node is AstNonNullChain {
    return isAstNonNullExpression(node) && !!(node.flags & NodeFlags.OptionalChain);
}

/** @internal */
export function isAstOptionalChain(node: AstNode): node is AstPropertyAccessChain | AstElementAccessChain | AstCallChain | AstNonNullChain {
    const kind = node.kind;
    return !!(node.flags & NodeFlags.OptionalChain) &&
        (kind === SyntaxKind.PropertyAccessExpression
            || kind === SyntaxKind.ElementAccessExpression
            || kind === SyntaxKind.CallExpression
            || kind === SyntaxKind.NonNullExpression);
}

/** @internal */
export function isAstOptionalChainRoot(node: AstNode): node is AstOptionalChainRoot {
    return isAstOptionalChain(node) && !isAstNonNullExpression(node) && !!node.data.questionDotToken;
}

/** @internal */
export function isAstLeftHandSideExpression(node: AstNode): node is AstLeftHandSideExpression {
    return isLeftHandSideExpressionKind(skipAstOuterExpressions(node, OuterExpressionKinds.PartiallyEmittedExpressions).kind);
}

/** @internal */
export function isAstStringOrNumericLiteralLike(node: AstNode): node is AstStringLiteralLike | AstNumericLiteral {
    return isAstStringLiteralLike(node) || isAstNumericLiteral(node);
}

/** @internal */
export function isAstStringLiteralLike(node: AstNode): node is AstStringLiteralLike {
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
export function astCanHaveModifiers(node: AstNode): node is AstHasModifiers {
    const kind = node.kind;
    return kind === SyntaxKind.TypeParameter
        || kind === SyntaxKind.Parameter
        || kind === SyntaxKind.PropertySignature
        || kind === SyntaxKind.PropertyDeclaration
        || kind === SyntaxKind.MethodSignature
        || kind === SyntaxKind.MethodDeclaration
        || kind === SyntaxKind.Constructor
        || kind === SyntaxKind.GetAccessor
        || kind === SyntaxKind.SetAccessor
        || kind === SyntaxKind.IndexSignature
        || kind === SyntaxKind.ConstructorType
        || kind === SyntaxKind.FunctionExpression
        || kind === SyntaxKind.ArrowFunction
        || kind === SyntaxKind.ClassExpression
        || kind === SyntaxKind.VariableStatement
        || kind === SyntaxKind.FunctionDeclaration
        || kind === SyntaxKind.ClassDeclaration
        || kind === SyntaxKind.InterfaceDeclaration
        || kind === SyntaxKind.TypeAliasDeclaration
        || kind === SyntaxKind.EnumDeclaration
        || kind === SyntaxKind.ModuleDeclaration
        || kind === SyntaxKind.ImportEqualsDeclaration
        || kind === SyntaxKind.ImportDeclaration
        || kind === SyntaxKind.ExportAssignment
        || kind === SyntaxKind.ExportDeclaration;
}

/** @internal */
export function astCanHaveDecorators(node: AstNode): node is AstHasDecorators {
    const kind = node.kind;
    return kind === SyntaxKind.Parameter
        || kind === SyntaxKind.PropertyDeclaration
        || kind === SyntaxKind.MethodDeclaration
        || kind === SyntaxKind.GetAccessor
        || kind === SyntaxKind.SetAccessor
        || kind === SyntaxKind.ClassExpression
        || kind === SyntaxKind.ClassDeclaration;
}
