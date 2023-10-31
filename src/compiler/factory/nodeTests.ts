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
    AsteriskToken,
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
    NamedExports,
    NamedImports,
    NamedTupleMember,
    NamespaceExport,
    NamespaceExportDeclaration,
    NamespaceImport,
    NewExpression,
    NodeBase,
    NonNullExpression,
    NoSubstitutionTemplateLiteral,
    NotEmittedStatement,
    NumericLiteral,
    ObjectBindingPattern,
    ObjectLiteralExpression,
    OmittedExpression,
    OptionalTypeNode,
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
    TypeAssertion,
    TypeLiteralNode,
    TypeOfExpression,
    TypeOperatorNode,
    TypeParameterDeclaration,
    TypePredicateNode,
    TypeQueryNode,
    TypeReferenceNode,
    UnionTypeNode,
    UnparsedPrepend,
    UnparsedSource,
    VariableDeclaration,
    VariableDeclarationList,
    VariableStatement,
    VoidExpression,
    WhileStatement,
    WithStatement,
    YieldExpression,
} from "../_namespaces/ts";

// Literals

export function isNumericLiteral(node: NodeBase): node is NumericLiteral {
    return node.kind === SyntaxKind.NumericLiteral;
}

export function isBigIntLiteral(node: NodeBase): node is BigIntLiteral {
    return node.kind === SyntaxKind.BigIntLiteral;
}

export function isStringLiteral(node: NodeBase): node is StringLiteral {
    return node.kind === SyntaxKind.StringLiteral;
}

export function isJsxText(node: NodeBase): node is JsxText {
    return node.kind === SyntaxKind.JsxText;
}

export function isRegularExpressionLiteral(node: NodeBase): node is RegularExpressionLiteral {
    return node.kind === SyntaxKind.RegularExpressionLiteral;
}

export function isNoSubstitutionTemplateLiteral(node: NodeBase): node is NoSubstitutionTemplateLiteral {
    return node.kind === SyntaxKind.NoSubstitutionTemplateLiteral;
}

// Pseudo-literals

export function isTemplateHead(node: NodeBase): node is TemplateHead {
    return node.kind === SyntaxKind.TemplateHead;
}

export function isTemplateMiddle(node: NodeBase): node is TemplateMiddle {
    return node.kind === SyntaxKind.TemplateMiddle;
}

export function isTemplateTail(node: NodeBase): node is TemplateTail {
    return node.kind === SyntaxKind.TemplateTail;
}

// Punctuation

export function isDotDotDotToken(node: NodeBase): node is DotDotDotToken {
    return node.kind === SyntaxKind.DotDotDotToken;
}

/** @internal */
export function isCommaToken(node: NodeBase): node is Token<SyntaxKind.CommaToken> {
    return node.kind === SyntaxKind.CommaToken;
}

export function isPlusToken(node: NodeBase): node is PlusToken {
    return node.kind === SyntaxKind.PlusToken;
}

export function isMinusToken(node: NodeBase): node is MinusToken {
    return node.kind === SyntaxKind.MinusToken;
}

export function isAsteriskToken(node: NodeBase): node is AsteriskToken {
    return node.kind === SyntaxKind.AsteriskToken;
}

export function isExclamationToken(node: NodeBase): node is ExclamationToken {
    return node.kind === SyntaxKind.ExclamationToken;
}

export function isQuestionToken(node: NodeBase): node is QuestionToken {
    return node.kind === SyntaxKind.QuestionToken;
}

export function isColonToken(node: NodeBase): node is ColonToken {
    return node.kind === SyntaxKind.ColonToken;
}

export function isQuestionDotToken(node: NodeBase): node is QuestionDotToken {
    return node.kind === SyntaxKind.QuestionDotToken;
}

export function isEqualsGreaterThanToken(node: NodeBase): node is EqualsGreaterThanToken {
    return node.kind === SyntaxKind.EqualsGreaterThanToken;
}

// Identifiers

export function isIdentifier(node: NodeBase): node is Identifier {
    return node.kind === SyntaxKind.Identifier;
}

export function isPrivateIdentifier(node: NodeBase): node is PrivateIdentifier {
    return node.kind === SyntaxKind.PrivateIdentifier;
}

// Reserved Words

/** @internal */
export function isExportModifier(node: NodeBase): node is ExportKeyword {
    return node.kind === SyntaxKind.ExportKeyword;
}

/** @internal */
export function isDefaultModifier(node: NodeBase): node is DefaultKeyword {
    return node.kind === SyntaxKind.DefaultKeyword;
}

/** @internal */
export function isAsyncModifier(node: NodeBase): node is AsyncKeyword {
    return node.kind === SyntaxKind.AsyncKeyword;
}

export function isAssertsKeyword(node: NodeBase): node is AssertsKeyword {
    return node.kind === SyntaxKind.AssertsKeyword;
}

export function isAwaitKeyword(node: NodeBase): node is AwaitKeyword {
    return node.kind === SyntaxKind.AwaitKeyword;
}

/** @internal */
export function isReadonlyKeyword(node: NodeBase): node is ReadonlyKeyword {
    return node.kind === SyntaxKind.ReadonlyKeyword;
}

/** @internal */
export function isStaticModifier(node: NodeBase): node is StaticKeyword {
    return node.kind === SyntaxKind.StaticKeyword;
}

/** @internal */
export function isAbstractModifier(node: NodeBase): node is AbstractKeyword {
    return node.kind === SyntaxKind.AbstractKeyword;
}

/** @internal */
export function isOverrideModifier(node: NodeBase): node is OverrideKeyword {
    return node.kind === SyntaxKind.OverrideKeyword;
}

/** @internal */
export function isAccessorModifier(node: NodeBase): node is AccessorKeyword {
    return node.kind === SyntaxKind.AccessorKeyword;
}

/** @internal */
export function isSuperKeyword(node: NodeBase): node is SuperExpression {
    return node.kind === SyntaxKind.SuperKeyword;
}

/** @internal */
export function isImportKeyword(node: NodeBase): node is ImportExpression {
    return node.kind === SyntaxKind.ImportKeyword;
}

/** @internal */
export function isCaseKeyword(node: NodeBase): node is CaseKeyword {
    return node.kind === SyntaxKind.CaseKeyword;
}

// Names

export function isQualifiedName(node: NodeBase): node is QualifiedName {
    return node.kind === SyntaxKind.QualifiedName;
}

export function isComputedPropertyName(node: NodeBase): node is ComputedPropertyName {
    return node.kind === SyntaxKind.ComputedPropertyName;
}

// Signature elements

export function isTypeParameterDeclaration(node: NodeBase): node is TypeParameterDeclaration {
    return node.kind === SyntaxKind.TypeParameter;
}

// TODO(rbuckton): Rename to 'isParameterDeclaration'
export function isParameter(node: NodeBase): node is ParameterDeclaration {
    return node.kind === SyntaxKind.Parameter;
}

export function isDecorator(node: NodeBase): node is Decorator {
    return node.kind === SyntaxKind.Decorator;
}

// TypeMember

export function isPropertySignature(node: NodeBase): node is PropertySignature {
    return node.kind === SyntaxKind.PropertySignature;
}

export function isPropertyDeclaration(node: NodeBase): node is PropertyDeclaration {
    return node.kind === SyntaxKind.PropertyDeclaration;
}

export function isMethodSignature(node: NodeBase): node is MethodSignature {
    return node.kind === SyntaxKind.MethodSignature;
}

export function isMethodDeclaration(node: NodeBase): node is MethodDeclaration {
    return node.kind === SyntaxKind.MethodDeclaration;
}

export function isClassStaticBlockDeclaration(node: NodeBase): node is ClassStaticBlockDeclaration {
    return node.kind === SyntaxKind.ClassStaticBlockDeclaration;
}

export function isConstructorDeclaration(node: NodeBase): node is ConstructorDeclaration {
    return node.kind === SyntaxKind.Constructor;
}

export function isGetAccessorDeclaration(node: NodeBase): node is GetAccessorDeclaration {
    return node.kind === SyntaxKind.GetAccessor;
}

export function isSetAccessorDeclaration(node: NodeBase): node is SetAccessorDeclaration {
    return node.kind === SyntaxKind.SetAccessor;
}

export function isCallSignatureDeclaration(node: NodeBase): node is CallSignatureDeclaration {
    return node.kind === SyntaxKind.CallSignature;
}

export function isConstructSignatureDeclaration(node: NodeBase): node is ConstructSignatureDeclaration {
    return node.kind === SyntaxKind.ConstructSignature;
}

export function isIndexSignatureDeclaration(node: NodeBase): node is IndexSignatureDeclaration {
    return node.kind === SyntaxKind.IndexSignature;
}

// Type

export function isTypePredicateNode(node: NodeBase): node is TypePredicateNode {
    return node.kind === SyntaxKind.TypePredicate;
}

export function isTypeReferenceNode(node: NodeBase): node is TypeReferenceNode {
    return node.kind === SyntaxKind.TypeReference;
}

export function isFunctionTypeNode(node: NodeBase): node is FunctionTypeNode {
    return node.kind === SyntaxKind.FunctionType;
}

export function isConstructorTypeNode(node: NodeBase): node is ConstructorTypeNode {
    return node.kind === SyntaxKind.ConstructorType;
}

export function isTypeQueryNode(node: NodeBase): node is TypeQueryNode {
    return node.kind === SyntaxKind.TypeQuery;
}

export function isTypeLiteralNode(node: NodeBase): node is TypeLiteralNode {
    return node.kind === SyntaxKind.TypeLiteral;
}

export function isArrayTypeNode(node: NodeBase): node is ArrayTypeNode {
    return node.kind === SyntaxKind.ArrayType;
}

export function isTupleTypeNode(node: NodeBase): node is TupleTypeNode {
    return node.kind === SyntaxKind.TupleType;
}

export function isNamedTupleMember(node: NodeBase): node is NamedTupleMember {
    return node.kind === SyntaxKind.NamedTupleMember;
}

export function isOptionalTypeNode(node: NodeBase): node is OptionalTypeNode {
    return node.kind === SyntaxKind.OptionalType;
}

export function isRestTypeNode(node: NodeBase): node is RestTypeNode {
    return node.kind === SyntaxKind.RestType;
}

export function isUnionTypeNode(node: NodeBase): node is UnionTypeNode {
    return node.kind === SyntaxKind.UnionType;
}

export function isIntersectionTypeNode(node: NodeBase): node is IntersectionTypeNode {
    return node.kind === SyntaxKind.IntersectionType;
}

export function isConditionalTypeNode(node: NodeBase): node is ConditionalTypeNode {
    return node.kind === SyntaxKind.ConditionalType;
}

export function isInferTypeNode(node: NodeBase): node is InferTypeNode {
    return node.kind === SyntaxKind.InferType;
}

export function isParenthesizedTypeNode(node: NodeBase): node is ParenthesizedTypeNode {
    return node.kind === SyntaxKind.ParenthesizedType;
}

export function isThisTypeNode(node: NodeBase): node is ThisTypeNode {
    return node.kind === SyntaxKind.ThisType;
}

export function isTypeOperatorNode(node: NodeBase): node is TypeOperatorNode {
    return node.kind === SyntaxKind.TypeOperator;
}

export function isIndexedAccessTypeNode(node: NodeBase): node is IndexedAccessTypeNode {
    return node.kind === SyntaxKind.IndexedAccessType;
}

export function isMappedTypeNode(node: NodeBase): node is MappedTypeNode {
    return node.kind === SyntaxKind.MappedType;
}

export function isLiteralTypeNode(node: NodeBase): node is LiteralTypeNode {
    return node.kind === SyntaxKind.LiteralType;
}

export function isImportTypeNode(node: NodeBase): node is ImportTypeNode {
    return node.kind === SyntaxKind.ImportType;
}

export function isTemplateLiteralTypeSpan(node: NodeBase): node is TemplateLiteralTypeSpan {
    return node.kind === SyntaxKind.TemplateLiteralTypeSpan;
}

export function isTemplateLiteralTypeNode(node: NodeBase): node is TemplateLiteralTypeNode {
    return node.kind === SyntaxKind.TemplateLiteralType;
}

// Binding patterns

export function isObjectBindingPattern(node: NodeBase): node is ObjectBindingPattern {
    return node.kind === SyntaxKind.ObjectBindingPattern;
}

export function isArrayBindingPattern(node: NodeBase): node is ArrayBindingPattern {
    return node.kind === SyntaxKind.ArrayBindingPattern;
}

export function isBindingElement(node: NodeBase): node is BindingElement {
    return node.kind === SyntaxKind.BindingElement;
}

// Expression

export function isArrayLiteralExpression(node: NodeBase): node is ArrayLiteralExpression {
    return node.kind === SyntaxKind.ArrayLiteralExpression;
}

export function isObjectLiteralExpression(node: NodeBase): node is ObjectLiteralExpression {
    return node.kind === SyntaxKind.ObjectLiteralExpression;
}

export function isPropertyAccessExpression(node: NodeBase): node is PropertyAccessExpression {
    return node.kind === SyntaxKind.PropertyAccessExpression;
}

export function isElementAccessExpression(node: NodeBase): node is ElementAccessExpression {
    return node.kind === SyntaxKind.ElementAccessExpression;
}

export function isCallExpression(node: NodeBase): node is CallExpression {
    return node.kind === SyntaxKind.CallExpression;
}

export function isNewExpression(node: NodeBase): node is NewExpression {
    return node.kind === SyntaxKind.NewExpression;
}

export function isTaggedTemplateExpression(node: NodeBase): node is TaggedTemplateExpression {
    return node.kind === SyntaxKind.TaggedTemplateExpression;
}

export function isTypeAssertionExpression(node: NodeBase): node is TypeAssertion {
    return node.kind === SyntaxKind.TypeAssertionExpression;
}

export function isParenthesizedExpression(node: NodeBase): node is ParenthesizedExpression {
    return node.kind === SyntaxKind.ParenthesizedExpression;
}

export function isFunctionExpression(node: NodeBase): node is FunctionExpression {
    return node.kind === SyntaxKind.FunctionExpression;
}

export function isArrowFunction(node: NodeBase): node is ArrowFunction {
    return node.kind === SyntaxKind.ArrowFunction;
}

export function isDeleteExpression(node: NodeBase): node is DeleteExpression {
    return node.kind === SyntaxKind.DeleteExpression;
}

export function isTypeOfExpression(node: NodeBase): node is TypeOfExpression {
    return node.kind === SyntaxKind.TypeOfExpression;
}

export function isVoidExpression(node: NodeBase): node is VoidExpression {
    return node.kind === SyntaxKind.VoidExpression;
}

export function isAwaitExpression(node: NodeBase): node is AwaitExpression {
    return node.kind === SyntaxKind.AwaitExpression;
}

export function isPrefixUnaryExpression(node: NodeBase): node is PrefixUnaryExpression {
    return node.kind === SyntaxKind.PrefixUnaryExpression;
}

export function isPostfixUnaryExpression(node: NodeBase): node is PostfixUnaryExpression {
    return node.kind === SyntaxKind.PostfixUnaryExpression;
}

export function isBinaryExpression(node: NodeBase): node is BinaryExpression {
    return node.kind === SyntaxKind.BinaryExpression;
}

export function isConditionalExpression(node: NodeBase): node is ConditionalExpression {
    return node.kind === SyntaxKind.ConditionalExpression;
}

export function isTemplateExpression(node: NodeBase): node is TemplateExpression {
    return node.kind === SyntaxKind.TemplateExpression;
}

export function isYieldExpression(node: NodeBase): node is YieldExpression {
    return node.kind === SyntaxKind.YieldExpression;
}

export function isSpreadElement(node: NodeBase): node is SpreadElement {
    return node.kind === SyntaxKind.SpreadElement;
}

export function isClassExpression(node: NodeBase): node is ClassExpression {
    return node.kind === SyntaxKind.ClassExpression;
}

export function isOmittedExpression(node: NodeBase): node is OmittedExpression {
    return node.kind === SyntaxKind.OmittedExpression;
}

export function isExpressionWithTypeArguments(node: NodeBase): node is ExpressionWithTypeArguments {
    return node.kind === SyntaxKind.ExpressionWithTypeArguments;
}

export function isAsExpression(node: NodeBase): node is AsExpression {
    return node.kind === SyntaxKind.AsExpression;
}

export function isSatisfiesExpression(node: NodeBase): node is SatisfiesExpression {
    return node.kind === SyntaxKind.SatisfiesExpression;
}

export function isNonNullExpression(node: NodeBase): node is NonNullExpression {
    return node.kind === SyntaxKind.NonNullExpression;
}

export function isMetaProperty(node: NodeBase): node is MetaProperty {
    return node.kind === SyntaxKind.MetaProperty;
}

export function isSyntheticExpression(node: NodeBase): node is SyntheticExpression {
    return node.kind === SyntaxKind.SyntheticExpression;
}

export function isPartiallyEmittedExpression(node: NodeBase): node is PartiallyEmittedExpression {
    return node.kind === SyntaxKind.PartiallyEmittedExpression;
}

export function isCommaListExpression(node: NodeBase): node is CommaListExpression {
    return node.kind === SyntaxKind.CommaListExpression;
}

// Misc

export function isTemplateSpan(node: NodeBase): node is TemplateSpan {
    return node.kind === SyntaxKind.TemplateSpan;
}

export function isSemicolonClassElement(node: NodeBase): node is SemicolonClassElement {
    return node.kind === SyntaxKind.SemicolonClassElement;
}

// Elements

export function isBlock(node: NodeBase): node is Block {
    return node.kind === SyntaxKind.Block;
}

export function isVariableStatement(node: NodeBase): node is VariableStatement {
    return node.kind === SyntaxKind.VariableStatement;
}

export function isEmptyStatement(node: NodeBase): node is EmptyStatement {
    return node.kind === SyntaxKind.EmptyStatement;
}

export function isExpressionStatement(node: NodeBase): node is ExpressionStatement {
    return node.kind === SyntaxKind.ExpressionStatement;
}

export function isIfStatement(node: NodeBase): node is IfStatement {
    return node.kind === SyntaxKind.IfStatement;
}

export function isDoStatement(node: NodeBase): node is DoStatement {
    return node.kind === SyntaxKind.DoStatement;
}

export function isWhileStatement(node: NodeBase): node is WhileStatement {
    return node.kind === SyntaxKind.WhileStatement;
}

export function isForStatement(node: NodeBase): node is ForStatement {
    return node.kind === SyntaxKind.ForStatement;
}

export function isForInStatement(node: NodeBase): node is ForInStatement {
    return node.kind === SyntaxKind.ForInStatement;
}

export function isForOfStatement(node: NodeBase): node is ForOfStatement {
    return node.kind === SyntaxKind.ForOfStatement;
}

export function isContinueStatement(node: NodeBase): node is ContinueStatement {
    return node.kind === SyntaxKind.ContinueStatement;
}

export function isBreakStatement(node: NodeBase): node is BreakStatement {
    return node.kind === SyntaxKind.BreakStatement;
}

export function isReturnStatement(node: NodeBase): node is ReturnStatement {
    return node.kind === SyntaxKind.ReturnStatement;
}

export function isWithStatement(node: NodeBase): node is WithStatement {
    return node.kind === SyntaxKind.WithStatement;
}

export function isSwitchStatement(node: NodeBase): node is SwitchStatement {
    return node.kind === SyntaxKind.SwitchStatement;
}

export function isLabeledStatement(node: NodeBase): node is LabeledStatement {
    return node.kind === SyntaxKind.LabeledStatement;
}

export function isThrowStatement(node: NodeBase): node is ThrowStatement {
    return node.kind === SyntaxKind.ThrowStatement;
}

export function isTryStatement(node: NodeBase): node is TryStatement {
    return node.kind === SyntaxKind.TryStatement;
}

export function isDebuggerStatement(node: NodeBase): node is DebuggerStatement {
    return node.kind === SyntaxKind.DebuggerStatement;
}

export function isVariableDeclaration(node: NodeBase): node is VariableDeclaration {
    return node.kind === SyntaxKind.VariableDeclaration;
}

export function isVariableDeclarationList(node: NodeBase): node is VariableDeclarationList {
    return node.kind === SyntaxKind.VariableDeclarationList;
}

export function isFunctionDeclaration(node: NodeBase): node is FunctionDeclaration {
    return node.kind === SyntaxKind.FunctionDeclaration;
}

export function isClassDeclaration(node: NodeBase): node is ClassDeclaration {
    return node.kind === SyntaxKind.ClassDeclaration;
}

export function isInterfaceDeclaration(node: NodeBase): node is InterfaceDeclaration {
    return node.kind === SyntaxKind.InterfaceDeclaration;
}

export function isTypeAliasDeclaration(node: NodeBase): node is TypeAliasDeclaration {
    return node.kind === SyntaxKind.TypeAliasDeclaration;
}

export function isEnumDeclaration(node: NodeBase): node is EnumDeclaration {
    return node.kind === SyntaxKind.EnumDeclaration;
}

export function isModuleDeclaration(node: NodeBase): node is ModuleDeclaration {
    return node.kind === SyntaxKind.ModuleDeclaration;
}

export function isModuleBlock(node: NodeBase): node is ModuleBlock {
    return node.kind === SyntaxKind.ModuleBlock;
}

export function isCaseBlock(node: NodeBase): node is CaseBlock {
    return node.kind === SyntaxKind.CaseBlock;
}

export function isNamespaceExportDeclaration(node: NodeBase): node is NamespaceExportDeclaration {
    return node.kind === SyntaxKind.NamespaceExportDeclaration;
}

export function isImportEqualsDeclaration(node: NodeBase): node is ImportEqualsDeclaration {
    return node.kind === SyntaxKind.ImportEqualsDeclaration;
}

export function isImportDeclaration(node: NodeBase): node is ImportDeclaration {
    return node.kind === SyntaxKind.ImportDeclaration;
}

export function isImportClause(node: NodeBase): node is ImportClause {
    return node.kind === SyntaxKind.ImportClause;
}

export function isImportTypeAssertionContainer(node: NodeBase): node is ImportTypeAssertionContainer {
    return node.kind === SyntaxKind.ImportTypeAssertionContainer;
}

/** @deprecated */
export function isAssertClause(node: NodeBase): node is AssertClause {
    return node.kind === SyntaxKind.AssertClause;
}

/** @deprecated */
export function isAssertEntry(node: NodeBase): node is AssertEntry {
    return node.kind === SyntaxKind.AssertEntry;
}

export function isImportAttributes(node: NodeBase): node is ImportAttributes {
    return node.kind === SyntaxKind.ImportAttributes;
}

export function isImportAttribute(node: NodeBase): node is ImportAttribute {
    return node.kind === SyntaxKind.ImportAttribute;
}

export function isNamespaceImport(node: NodeBase): node is NamespaceImport {
    return node.kind === SyntaxKind.NamespaceImport;
}

export function isNamespaceExport(node: NodeBase): node is NamespaceExport {
    return node.kind === SyntaxKind.NamespaceExport;
}

export function isNamedImports(node: NodeBase): node is NamedImports {
    return node.kind === SyntaxKind.NamedImports;
}

export function isImportSpecifier(node: NodeBase): node is ImportSpecifier {
    return node.kind === SyntaxKind.ImportSpecifier;
}

export function isExportAssignment(node: NodeBase): node is ExportAssignment {
    return node.kind === SyntaxKind.ExportAssignment;
}

export function isExportDeclaration(node: NodeBase): node is ExportDeclaration {
    return node.kind === SyntaxKind.ExportDeclaration;
}

export function isNamedExports(node: NodeBase): node is NamedExports {
    return node.kind === SyntaxKind.NamedExports;
}

export function isExportSpecifier(node: NodeBase): node is ExportSpecifier {
    return node.kind === SyntaxKind.ExportSpecifier;
}

export function isMissingDeclaration(node: NodeBase): node is MissingDeclaration {
    return node.kind === SyntaxKind.MissingDeclaration;
}

export function isNotEmittedStatement(node: NodeBase): node is NotEmittedStatement {
    return node.kind === SyntaxKind.NotEmittedStatement;
}

/** @internal */
export function isSyntheticReference(node: NodeBase): node is SyntheticReferenceExpression {
    return node.kind === SyntaxKind.SyntheticReferenceExpression;
}

// Module References

export function isExternalModuleReference(node: NodeBase): node is ExternalModuleReference {
    return node.kind === SyntaxKind.ExternalModuleReference;
}

// JSX

export function isJsxElement(node: NodeBase): node is JsxElement {
    return node.kind === SyntaxKind.JsxElement;
}

export function isJsxSelfClosingElement(node: NodeBase): node is JsxSelfClosingElement {
    return node.kind === SyntaxKind.JsxSelfClosingElement;
}

export function isJsxOpeningElement(node: NodeBase): node is JsxOpeningElement {
    return node.kind === SyntaxKind.JsxOpeningElement;
}

export function isJsxClosingElement(node: NodeBase): node is JsxClosingElement {
    return node.kind === SyntaxKind.JsxClosingElement;
}

export function isJsxFragment(node: NodeBase): node is JsxFragment {
    return node.kind === SyntaxKind.JsxFragment;
}

export function isJsxOpeningFragment(node: NodeBase): node is JsxOpeningFragment {
    return node.kind === SyntaxKind.JsxOpeningFragment;
}

export function isJsxClosingFragment(node: NodeBase): node is JsxClosingFragment {
    return node.kind === SyntaxKind.JsxClosingFragment;
}

export function isJsxAttribute(node: NodeBase): node is JsxAttribute {
    return node.kind === SyntaxKind.JsxAttribute;
}

export function isJsxAttributes(node: NodeBase): node is JsxAttributes {
    return node.kind === SyntaxKind.JsxAttributes;
}

export function isJsxSpreadAttribute(node: NodeBase): node is JsxSpreadAttribute {
    return node.kind === SyntaxKind.JsxSpreadAttribute;
}

export function isJsxExpression(node: NodeBase): node is JsxExpression {
    return node.kind === SyntaxKind.JsxExpression;
}

export function isJsxNamespacedName(node: NodeBase): node is JsxNamespacedName {
    return node.kind === SyntaxKind.JsxNamespacedName;
}

// Clauses

export function isCaseClause(node: NodeBase): node is CaseClause {
    return node.kind === SyntaxKind.CaseClause;
}

export function isDefaultClause(node: NodeBase): node is DefaultClause {
    return node.kind === SyntaxKind.DefaultClause;
}

export function isHeritageClause(node: NodeBase): node is HeritageClause {
    return node.kind === SyntaxKind.HeritageClause;
}

export function isCatchClause(node: NodeBase): node is CatchClause {
    return node.kind === SyntaxKind.CatchClause;
}

// Property assignments

export function isPropertyAssignment(node: NodeBase): node is PropertyAssignment {
    return node.kind === SyntaxKind.PropertyAssignment;
}

export function isShorthandPropertyAssignment(node: NodeBase): node is ShorthandPropertyAssignment {
    return node.kind === SyntaxKind.ShorthandPropertyAssignment;
}

export function isSpreadAssignment(node: NodeBase): node is SpreadAssignment {
    return node.kind === SyntaxKind.SpreadAssignment;
}

// Enum

export function isEnumMember(node: NodeBase): node is EnumMember {
    return node.kind === SyntaxKind.EnumMember;
}

// Unparsed

// TODO(rbuckton): isUnparsedPrologue
/** @deprecated */
export function isUnparsedPrepend(node: NodeBase): node is UnparsedPrepend {
    return node.kind === SyntaxKind.UnparsedPrepend;
}

// TODO(rbuckton): isUnparsedText
// TODO(rbuckton): isUnparsedInternalText
// TODO(rbuckton): isUnparsedSyntheticReference

// Top-level nodes
export function isSourceFile(node: NodeBase): node is SourceFile {
    return node.kind === SyntaxKind.SourceFile;
}

export function isBundle(node: NodeBase): node is Bundle {
    return node.kind === SyntaxKind.Bundle;
}

/** @deprecated */
export function isUnparsedSource(node: NodeBase): node is UnparsedSource {
    return node.kind === SyntaxKind.UnparsedSource;
}

// TODO(rbuckton): isInputFiles

// JSDoc Elements

export function isJSDocTypeExpression(node: NodeBase): node is JSDocTypeExpression {
    return node.kind === SyntaxKind.JSDocTypeExpression;
}

export function isJSDocNameReference(node: NodeBase): node is JSDocNameReference {
    return node.kind === SyntaxKind.JSDocNameReference;
}

export function isJSDocMemberName(node: NodeBase): node is JSDocMemberName {
    return node.kind === SyntaxKind.JSDocMemberName;
}

export function isJSDocLink(node: NodeBase): node is JSDocLink {
    return node.kind === SyntaxKind.JSDocLink;
}

export function isJSDocLinkCode(node: NodeBase): node is JSDocLinkCode {
    return node.kind === SyntaxKind.JSDocLinkCode;
}

export function isJSDocLinkPlain(node: NodeBase): node is JSDocLinkPlain {
    return node.kind === SyntaxKind.JSDocLinkPlain;
}

export function isJSDocAllType(node: NodeBase): node is JSDocAllType {
    return node.kind === SyntaxKind.JSDocAllType;
}

export function isJSDocUnknownType(node: NodeBase): node is JSDocUnknownType {
    return node.kind === SyntaxKind.JSDocUnknownType;
}

export function isJSDocNullableType(node: NodeBase): node is JSDocNullableType {
    return node.kind === SyntaxKind.JSDocNullableType;
}

export function isJSDocNonNullableType(node: NodeBase): node is JSDocNonNullableType {
    return node.kind === SyntaxKind.JSDocNonNullableType;
}

export function isJSDocOptionalType(node: NodeBase): node is JSDocOptionalType {
    return node.kind === SyntaxKind.JSDocOptionalType;
}

export function isJSDocFunctionType(node: NodeBase): node is JSDocFunctionType {
    return node.kind === SyntaxKind.JSDocFunctionType;
}

export function isJSDocVariadicType(node: NodeBase): node is JSDocVariadicType {
    return node.kind === SyntaxKind.JSDocVariadicType;
}

export function isJSDocNamepathType(node: NodeBase): node is JSDocNamepathType {
    return node.kind === SyntaxKind.JSDocNamepathType;
}

export function isJSDoc(node: NodeBase): node is JSDoc {
    return node.kind === SyntaxKind.JSDoc;
}

export function isJSDocTypeLiteral(node: NodeBase): node is JSDocTypeLiteral {
    return node.kind === SyntaxKind.JSDocTypeLiteral;
}

export function isJSDocSignature(node: NodeBase): node is JSDocSignature {
    return node.kind === SyntaxKind.JSDocSignature;
}

// JSDoc Tags

export function isJSDocAugmentsTag(node: NodeBase): node is JSDocAugmentsTag {
    return node.kind === SyntaxKind.JSDocAugmentsTag;
}

export function isJSDocAuthorTag(node: NodeBase): node is JSDocAuthorTag {
    return node.kind === SyntaxKind.JSDocAuthorTag;
}

export function isJSDocClassTag(node: NodeBase): node is JSDocClassTag {
    return node.kind === SyntaxKind.JSDocClassTag;
}

export function isJSDocCallbackTag(node: NodeBase): node is JSDocCallbackTag {
    return node.kind === SyntaxKind.JSDocCallbackTag;
}

export function isJSDocPublicTag(node: NodeBase): node is JSDocPublicTag {
    return node.kind === SyntaxKind.JSDocPublicTag;
}

export function isJSDocPrivateTag(node: NodeBase): node is JSDocPrivateTag {
    return node.kind === SyntaxKind.JSDocPrivateTag;
}

export function isJSDocProtectedTag(node: NodeBase): node is JSDocProtectedTag {
    return node.kind === SyntaxKind.JSDocProtectedTag;
}

export function isJSDocReadonlyTag(node: NodeBase): node is JSDocReadonlyTag {
    return node.kind === SyntaxKind.JSDocReadonlyTag;
}

export function isJSDocOverrideTag(node: NodeBase): node is JSDocOverrideTag {
    return node.kind === SyntaxKind.JSDocOverrideTag;
}

export function isJSDocOverloadTag(node: NodeBase): node is JSDocOverloadTag {
    return node.kind === SyntaxKind.JSDocOverloadTag;
}

export function isJSDocDeprecatedTag(node: NodeBase): node is JSDocDeprecatedTag {
    return node.kind === SyntaxKind.JSDocDeprecatedTag;
}

export function isJSDocSeeTag(node: NodeBase): node is JSDocSeeTag {
    return node.kind === SyntaxKind.JSDocSeeTag;
}

export function isJSDocEnumTag(node: NodeBase): node is JSDocEnumTag {
    return node.kind === SyntaxKind.JSDocEnumTag;
}

export function isJSDocParameterTag(node: NodeBase): node is JSDocParameterTag {
    return node.kind === SyntaxKind.JSDocParameterTag;
}

export function isJSDocReturnTag(node: NodeBase): node is JSDocReturnTag {
    return node.kind === SyntaxKind.JSDocReturnTag;
}

export function isJSDocThisTag(node: NodeBase): node is JSDocThisTag {
    return node.kind === SyntaxKind.JSDocThisTag;
}

export function isJSDocTypeTag(node: NodeBase): node is JSDocTypeTag {
    return node.kind === SyntaxKind.JSDocTypeTag;
}

export function isJSDocTemplateTag(node: NodeBase): node is JSDocTemplateTag {
    return node.kind === SyntaxKind.JSDocTemplateTag;
}

export function isJSDocTypedefTag(node: NodeBase): node is JSDocTypedefTag {
    return node.kind === SyntaxKind.JSDocTypedefTag;
}

export function isJSDocUnknownTag(node: NodeBase): node is JSDocUnknownTag {
    return node.kind === SyntaxKind.JSDocTag;
}

export function isJSDocPropertyTag(node: NodeBase): node is JSDocPropertyTag {
    return node.kind === SyntaxKind.JSDocPropertyTag;
}

export function isJSDocImplementsTag(node: NodeBase): node is JSDocImplementsTag {
    return node.kind === SyntaxKind.JSDocImplementsTag;
}

export function isJSDocSatisfiesTag(node: NodeBase): node is JSDocSatisfiesTag {
    return node.kind === SyntaxKind.JSDocSatisfiesTag;
}

export function isJSDocThrowsTag(node: NodeBase): node is JSDocThrowsTag {
    return node.kind === SyntaxKind.JSDocThrowsTag;
}

// Synthesized list

/** @internal */
export function isSyntaxList(node: NodeBase): node is SyntaxList {
    return node.kind === SyntaxKind.SyntaxList;
}
