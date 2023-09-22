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
    Node,
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

export function isNumericLiteral(node: Node): node is NumericLiteral {
    return node.kind === SyntaxKind.NumericLiteral;
}

export function isBigIntLiteral(node: Node): node is BigIntLiteral {
    return node.kind === SyntaxKind.BigIntLiteral;
}

export function isStringLiteral(node: Node): node is StringLiteral {
    return node.kind === SyntaxKind.StringLiteral;
}

export function isJsxText(node: Node): node is JsxText {
    return node.kind === SyntaxKind.JsxText;
}

export function isRegularExpressionLiteral(node: Node): node is RegularExpressionLiteral {
    return node.kind === SyntaxKind.RegularExpressionLiteral;
}

export function isNoSubstitutionTemplateLiteral(node: Node): node is NoSubstitutionTemplateLiteral {
    return node.kind === SyntaxKind.NoSubstitutionTemplateLiteral;
}

// Pseudo-literals

export function isTemplateHead(node: Node): node is TemplateHead {
    return node.kind === SyntaxKind.TemplateHead;
}

export function isTemplateMiddle(node: Node): node is TemplateMiddle {
    return node.kind === SyntaxKind.TemplateMiddle;
}

export function isTemplateTail(node: Node): node is TemplateTail {
    return node.kind === SyntaxKind.TemplateTail;
}

// Punctuation

export function isDotDotDotToken(node: Node): node is DotDotDotToken {
    return node.kind === SyntaxKind.DotDotDotToken;
}

/** @internal */
export function isCommaToken(node: Node): node is Token<SyntaxKind.CommaToken> {
    return node.kind === SyntaxKind.CommaToken;
}

export function isPlusToken(node: Node): node is PlusToken {
    return node.kind === SyntaxKind.PlusToken;
}

export function isMinusToken(node: Node): node is MinusToken {
    return node.kind === SyntaxKind.MinusToken;
}

export function isAsteriskToken(node: Node): node is AsteriskToken {
    return node.kind === SyntaxKind.AsteriskToken;
}

export function isExclamationToken(node: Node): node is ExclamationToken {
    return node.kind === SyntaxKind.ExclamationToken;
}

export function isQuestionToken(node: Node): node is QuestionToken {
    return node.kind === SyntaxKind.QuestionToken;
}

export function isColonToken(node: Node): node is ColonToken {
    return node.kind === SyntaxKind.ColonToken;
}

export function isQuestionDotToken(node: Node): node is QuestionDotToken {
    return node.kind === SyntaxKind.QuestionDotToken;
}

export function isEqualsGreaterThanToken(node: Node): node is EqualsGreaterThanToken {
    return node.kind === SyntaxKind.EqualsGreaterThanToken;
}

// Identifiers

export function isIdentifier(node: Node): node is Identifier {
    return node.kind === SyntaxKind.Identifier;
}

export function isPrivateIdentifier(node: Node): node is PrivateIdentifier {
    return node.kind === SyntaxKind.PrivateIdentifier;
}

// Reserved Words

/** @internal */
export function isExportModifier(node: Node): node is ExportKeyword {
    return node.kind === SyntaxKind.ExportKeyword;
}

/** @internal */
export function isDefaultModifier(node: Node): node is DefaultKeyword {
    return node.kind === SyntaxKind.DefaultKeyword;
}

/** @internal */
export function isAsyncModifier(node: Node): node is AsyncKeyword {
    return node.kind === SyntaxKind.AsyncKeyword;
}

export function isAssertsKeyword(node: Node): node is AssertsKeyword {
    return node.kind === SyntaxKind.AssertsKeyword;
}

export function isAwaitKeyword(node: Node): node is AwaitKeyword {
    return node.kind === SyntaxKind.AwaitKeyword;
}

/** @internal */
export function isReadonlyKeyword(node: Node): node is ReadonlyKeyword {
    return node.kind === SyntaxKind.ReadonlyKeyword;
}

/** @internal */
export function isStaticModifier(node: Node): node is StaticKeyword {
    return node.kind === SyntaxKind.StaticKeyword;
}

/** @internal */
export function isAbstractModifier(node: Node): node is AbstractKeyword {
    return node.kind === SyntaxKind.AbstractKeyword;
}

/** @internal */
export function isOverrideModifier(node: Node): node is OverrideKeyword {
    return node.kind === SyntaxKind.OverrideKeyword;
}

/** @internal */
export function isAccessorModifier(node: Node): node is AccessorKeyword {
    return node.kind === SyntaxKind.AccessorKeyword;
}

/** @internal */
export function isSuperKeyword(node: Node): node is SuperExpression {
    return node.kind === SyntaxKind.SuperKeyword;
}

/** @internal */
export function isImportKeyword(node: Node): node is ImportExpression {
    return node.kind === SyntaxKind.ImportKeyword;
}

/** @internal */
export function isCaseKeyword(node: Node): node is CaseKeyword {
    return node.kind === SyntaxKind.CaseKeyword;
}

// Names

export function isQualifiedName(node: Node): node is QualifiedName {
    return node.kind === SyntaxKind.QualifiedName;
}

export function isComputedPropertyName(node: Node): node is ComputedPropertyName {
    return node.kind === SyntaxKind.ComputedPropertyName;
}

// Signature elements

export function isTypeParameterDeclaration(node: Node): node is TypeParameterDeclaration {
    return node.kind === SyntaxKind.TypeParameter;
}

// TODO(rbuckton): Rename to 'isParameterDeclaration'
export function isParameter(node: Node): node is ParameterDeclaration {
    return node.kind === SyntaxKind.Parameter;
}

export function isDecorator(node: Node): node is Decorator {
    return node.kind === SyntaxKind.Decorator;
}

// TypeMember

export function isPropertySignature(node: Node): node is PropertySignature {
    return node.kind === SyntaxKind.PropertySignature;
}

export function isPropertyDeclaration(node: Node): node is PropertyDeclaration {
    return node.kind === SyntaxKind.PropertyDeclaration;
}

export function isMethodSignature(node: Node): node is MethodSignature {
    return node.kind === SyntaxKind.MethodSignature;
}

export function isMethodDeclaration(node: Node): node is MethodDeclaration {
    return node.kind === SyntaxKind.MethodDeclaration;
}

export function isClassStaticBlockDeclaration(node: Node): node is ClassStaticBlockDeclaration {
    return node.kind === SyntaxKind.ClassStaticBlockDeclaration;
}

export function isConstructorDeclaration(node: Node): node is ConstructorDeclaration {
    return node.kind === SyntaxKind.Constructor;
}

export function isGetAccessorDeclaration(node: Node): node is GetAccessorDeclaration {
    return node.kind === SyntaxKind.GetAccessor;
}

export function isSetAccessorDeclaration(node: Node): node is SetAccessorDeclaration {
    return node.kind === SyntaxKind.SetAccessor;
}

export function isCallSignatureDeclaration(node: Node): node is CallSignatureDeclaration {
    return node.kind === SyntaxKind.CallSignature;
}

export function isConstructSignatureDeclaration(node: Node): node is ConstructSignatureDeclaration {
    return node.kind === SyntaxKind.ConstructSignature;
}

export function isIndexSignatureDeclaration(node: Node): node is IndexSignatureDeclaration {
    return node.kind === SyntaxKind.IndexSignature;
}

// Type

export function isTypePredicateNode(node: Node): node is TypePredicateNode {
    return node.kind === SyntaxKind.TypePredicate;
}

export function isTypeReferenceNode(node: Node): node is TypeReferenceNode {
    return node.kind === SyntaxKind.TypeReference;
}

export function isFunctionTypeNode(node: Node): node is FunctionTypeNode {
    return node.kind === SyntaxKind.FunctionType;
}

export function isConstructorTypeNode(node: Node): node is ConstructorTypeNode {
    return node.kind === SyntaxKind.ConstructorType;
}

export function isTypeQueryNode(node: Node): node is TypeQueryNode {
    return node.kind === SyntaxKind.TypeQuery;
}

export function isTypeLiteralNode(node: Node): node is TypeLiteralNode {
    return node.kind === SyntaxKind.TypeLiteral;
}

export function isArrayTypeNode(node: Node): node is ArrayTypeNode {
    return node.kind === SyntaxKind.ArrayType;
}

export function isTupleTypeNode(node: Node): node is TupleTypeNode {
    return node.kind === SyntaxKind.TupleType;
}

export function isNamedTupleMember(node: Node): node is NamedTupleMember {
    return node.kind === SyntaxKind.NamedTupleMember;
}

export function isOptionalTypeNode(node: Node): node is OptionalTypeNode {
    return node.kind === SyntaxKind.OptionalType;
}

export function isRestTypeNode(node: Node): node is RestTypeNode {
    return node.kind === SyntaxKind.RestType;
}

export function isUnionTypeNode(node: Node): node is UnionTypeNode {
    return node.kind === SyntaxKind.UnionType;
}

export function isIntersectionTypeNode(node: Node): node is IntersectionTypeNode {
    return node.kind === SyntaxKind.IntersectionType;
}

export function isConditionalTypeNode(node: Node): node is ConditionalTypeNode {
    return node.kind === SyntaxKind.ConditionalType;
}

export function isInferTypeNode(node: Node): node is InferTypeNode {
    return node.kind === SyntaxKind.InferType;
}

export function isParenthesizedTypeNode(node: Node): node is ParenthesizedTypeNode {
    return node.kind === SyntaxKind.ParenthesizedType;
}

export function isThisTypeNode(node: Node): node is ThisTypeNode {
    return node.kind === SyntaxKind.ThisType;
}

export function isTypeOperatorNode(node: Node): node is TypeOperatorNode {
    return node.kind === SyntaxKind.TypeOperator;
}

export function isIndexedAccessTypeNode(node: Node): node is IndexedAccessTypeNode {
    return node.kind === SyntaxKind.IndexedAccessType;
}

export function isMappedTypeNode(node: Node): node is MappedTypeNode {
    return node.kind === SyntaxKind.MappedType;
}

export function isLiteralTypeNode(node: Node): node is LiteralTypeNode {
    return node.kind === SyntaxKind.LiteralType;
}

export function isImportTypeNode(node: Node): node is ImportTypeNode {
    return node.kind === SyntaxKind.ImportType;
}

export function isTemplateLiteralTypeSpan(node: Node): node is TemplateLiteralTypeSpan {
    return node.kind === SyntaxKind.TemplateLiteralTypeSpan;
}

export function isTemplateLiteralTypeNode(node: Node): node is TemplateLiteralTypeNode {
    return node.kind === SyntaxKind.TemplateLiteralType;
}

// Binding patterns

export function isObjectBindingPattern(node: Node): node is ObjectBindingPattern {
    return node.kind === SyntaxKind.ObjectBindingPattern;
}

export function isArrayBindingPattern(node: Node): node is ArrayBindingPattern {
    return node.kind === SyntaxKind.ArrayBindingPattern;
}

export function isBindingElement(node: Node): node is BindingElement {
    return node.kind === SyntaxKind.BindingElement;
}

// Expression

export function isArrayLiteralExpression(node: Node): node is ArrayLiteralExpression {
    return node.kind === SyntaxKind.ArrayLiteralExpression;
}

export function isObjectLiteralExpression(node: Node): node is ObjectLiteralExpression {
    return node.kind === SyntaxKind.ObjectLiteralExpression;
}

export function isPropertyAccessExpression(node: Node): node is PropertyAccessExpression {
    return node.kind === SyntaxKind.PropertyAccessExpression;
}

export function isElementAccessExpression(node: Node): node is ElementAccessExpression {
    return node.kind === SyntaxKind.ElementAccessExpression;
}

export function isCallExpression(node: Node): node is CallExpression {
    return node.kind === SyntaxKind.CallExpression;
}

export function isNewExpression(node: Node): node is NewExpression {
    return node.kind === SyntaxKind.NewExpression;
}

export function isTaggedTemplateExpression(node: Node): node is TaggedTemplateExpression {
    return node.kind === SyntaxKind.TaggedTemplateExpression;
}

export function isTypeAssertionExpression(node: Node): node is TypeAssertion {
    return node.kind === SyntaxKind.TypeAssertionExpression;
}

export function isParenthesizedExpression(node: Node): node is ParenthesizedExpression {
    return node.kind === SyntaxKind.ParenthesizedExpression;
}

export function isFunctionExpression(node: Node): node is FunctionExpression {
    return node.kind === SyntaxKind.FunctionExpression;
}

export function isArrowFunction(node: Node): node is ArrowFunction {
    return node.kind === SyntaxKind.ArrowFunction;
}

export function isDeleteExpression(node: Node): node is DeleteExpression {
    return node.kind === SyntaxKind.DeleteExpression;
}

export function isTypeOfExpression(node: Node): node is TypeOfExpression {
    return node.kind === SyntaxKind.TypeOfExpression;
}

export function isVoidExpression(node: Node): node is VoidExpression {
    return node.kind === SyntaxKind.VoidExpression;
}

export function isAwaitExpression(node: Node): node is AwaitExpression {
    return node.kind === SyntaxKind.AwaitExpression;
}

export function isPrefixUnaryExpression(node: Node): node is PrefixUnaryExpression {
    return node.kind === SyntaxKind.PrefixUnaryExpression;
}

export function isPostfixUnaryExpression(node: Node): node is PostfixUnaryExpression {
    return node.kind === SyntaxKind.PostfixUnaryExpression;
}

export function isBinaryExpression(node: Node): node is BinaryExpression {
    return node.kind === SyntaxKind.BinaryExpression;
}

export function isConditionalExpression(node: Node): node is ConditionalExpression {
    return node.kind === SyntaxKind.ConditionalExpression;
}

export function isTemplateExpression(node: Node): node is TemplateExpression {
    return node.kind === SyntaxKind.TemplateExpression;
}

export function isYieldExpression(node: Node): node is YieldExpression {
    return node.kind === SyntaxKind.YieldExpression;
}

export function isSpreadElement(node: Node): node is SpreadElement {
    return node.kind === SyntaxKind.SpreadElement;
}

export function isClassExpression(node: Node): node is ClassExpression {
    return node.kind === SyntaxKind.ClassExpression;
}

export function isOmittedExpression(node: Node): node is OmittedExpression {
    return node.kind === SyntaxKind.OmittedExpression;
}

export function isExpressionWithTypeArguments(node: Node): node is ExpressionWithTypeArguments {
    return node.kind === SyntaxKind.ExpressionWithTypeArguments;
}

export function isAsExpression(node: Node): node is AsExpression {
    return node.kind === SyntaxKind.AsExpression;
}

export function isSatisfiesExpression(node: Node): node is SatisfiesExpression {
    return node.kind === SyntaxKind.SatisfiesExpression;
}

export function isNonNullExpression(node: Node): node is NonNullExpression {
    return node.kind === SyntaxKind.NonNullExpression;
}

export function isMetaProperty(node: Node): node is MetaProperty {
    return node.kind === SyntaxKind.MetaProperty;
}

export function isSyntheticExpression(node: Node): node is SyntheticExpression {
    return node.kind === SyntaxKind.SyntheticExpression;
}

export function isPartiallyEmittedExpression(node: Node): node is PartiallyEmittedExpression {
    return node.kind === SyntaxKind.PartiallyEmittedExpression;
}

export function isCommaListExpression(node: Node): node is CommaListExpression {
    return node.kind === SyntaxKind.CommaListExpression;
}

// Misc

export function isTemplateSpan(node: Node): node is TemplateSpan {
    return node.kind === SyntaxKind.TemplateSpan;
}

export function isSemicolonClassElement(node: Node): node is SemicolonClassElement {
    return node.kind === SyntaxKind.SemicolonClassElement;
}

// Elements

export function isBlock(node: Node): node is Block {
    return node.kind === SyntaxKind.Block;
}

export function isVariableStatement(node: Node): node is VariableStatement {
    return node.kind === SyntaxKind.VariableStatement;
}

export function isEmptyStatement(node: Node): node is EmptyStatement {
    return node.kind === SyntaxKind.EmptyStatement;
}

export function isExpressionStatement(node: Node): node is ExpressionStatement {
    return node.kind === SyntaxKind.ExpressionStatement;
}

export function isIfStatement(node: Node): node is IfStatement {
    return node.kind === SyntaxKind.IfStatement;
}

export function isDoStatement(node: Node): node is DoStatement {
    return node.kind === SyntaxKind.DoStatement;
}

export function isWhileStatement(node: Node): node is WhileStatement {
    return node.kind === SyntaxKind.WhileStatement;
}

export function isForStatement(node: Node): node is ForStatement {
    return node.kind === SyntaxKind.ForStatement;
}

export function isForInStatement(node: Node): node is ForInStatement {
    return node.kind === SyntaxKind.ForInStatement;
}

export function isForOfStatement(node: Node): node is ForOfStatement {
    return node.kind === SyntaxKind.ForOfStatement;
}

export function isContinueStatement(node: Node): node is ContinueStatement {
    return node.kind === SyntaxKind.ContinueStatement;
}

export function isBreakStatement(node: Node): node is BreakStatement {
    return node.kind === SyntaxKind.BreakStatement;
}

export function isReturnStatement(node: Node): node is ReturnStatement {
    return node.kind === SyntaxKind.ReturnStatement;
}

export function isWithStatement(node: Node): node is WithStatement {
    return node.kind === SyntaxKind.WithStatement;
}

export function isSwitchStatement(node: Node): node is SwitchStatement {
    return node.kind === SyntaxKind.SwitchStatement;
}

export function isLabeledStatement(node: Node): node is LabeledStatement {
    return node.kind === SyntaxKind.LabeledStatement;
}

export function isThrowStatement(node: Node): node is ThrowStatement {
    return node.kind === SyntaxKind.ThrowStatement;
}

export function isTryStatement(node: Node): node is TryStatement {
    return node.kind === SyntaxKind.TryStatement;
}

export function isDebuggerStatement(node: Node): node is DebuggerStatement {
    return node.kind === SyntaxKind.DebuggerStatement;
}

export function isVariableDeclaration(node: Node): node is VariableDeclaration {
    return node.kind === SyntaxKind.VariableDeclaration;
}

export function isVariableDeclarationList(node: Node): node is VariableDeclarationList {
    return node.kind === SyntaxKind.VariableDeclarationList;
}

export function isFunctionDeclaration(node: Node): node is FunctionDeclaration {
    return node.kind === SyntaxKind.FunctionDeclaration;
}

export function isClassDeclaration(node: Node): node is ClassDeclaration {
    return node.kind === SyntaxKind.ClassDeclaration;
}

export function isInterfaceDeclaration(node: Node): node is InterfaceDeclaration {
    return node.kind === SyntaxKind.InterfaceDeclaration;
}

export function isTypeAliasDeclaration(node: Node): node is TypeAliasDeclaration {
    return node.kind === SyntaxKind.TypeAliasDeclaration;
}

export function isEnumDeclaration(node: Node): node is EnumDeclaration {
    return node.kind === SyntaxKind.EnumDeclaration;
}

export function isModuleDeclaration(node: Node): node is ModuleDeclaration {
    return node.kind === SyntaxKind.ModuleDeclaration;
}

export function isModuleBlock(node: Node): node is ModuleBlock {
    return node.kind === SyntaxKind.ModuleBlock;
}

export function isCaseBlock(node: Node): node is CaseBlock {
    return node.kind === SyntaxKind.CaseBlock;
}

export function isNamespaceExportDeclaration(node: Node): node is NamespaceExportDeclaration {
    return node.kind === SyntaxKind.NamespaceExportDeclaration;
}

export function isImportEqualsDeclaration(node: Node): node is ImportEqualsDeclaration {
    return node.kind === SyntaxKind.ImportEqualsDeclaration;
}

export function isImportDeclaration(node: Node): node is ImportDeclaration {
    return node.kind === SyntaxKind.ImportDeclaration;
}

export function isImportClause(node: Node): node is ImportClause {
    return node.kind === SyntaxKind.ImportClause;
}

export function isImportTypeAssertionContainer(node: Node): node is ImportTypeAssertionContainer {
    return node.kind === SyntaxKind.ImportTypeAssertionContainer;
}

/** @deprecated */
export function isAssertClause(node: Node): node is AssertClause {
    return node.kind === SyntaxKind.AssertClause;
}

/** @deprecated */
export function isAssertEntry(node: Node): node is AssertEntry {
    return node.kind === SyntaxKind.AssertEntry;
}

export function isImportAttributes(node: Node): node is ImportAttributes {
    return node.kind === SyntaxKind.ImportAttributes;
}

export function isImportAttribute(node: Node): node is ImportAttribute {
    return node.kind === SyntaxKind.ImportAttribute;
}

export function isNamespaceImport(node: Node): node is NamespaceImport {
    return node.kind === SyntaxKind.NamespaceImport;
}

export function isNamespaceExport(node: Node): node is NamespaceExport {
    return node.kind === SyntaxKind.NamespaceExport;
}

export function isNamedImports(node: Node): node is NamedImports {
    return node.kind === SyntaxKind.NamedImports;
}

export function isImportSpecifier(node: Node): node is ImportSpecifier {
    return node.kind === SyntaxKind.ImportSpecifier;
}

export function isExportAssignment(node: Node): node is ExportAssignment {
    return node.kind === SyntaxKind.ExportAssignment;
}

export function isExportDeclaration(node: Node): node is ExportDeclaration {
    return node.kind === SyntaxKind.ExportDeclaration;
}

export function isNamedExports(node: Node): node is NamedExports {
    return node.kind === SyntaxKind.NamedExports;
}

export function isExportSpecifier(node: Node): node is ExportSpecifier {
    return node.kind === SyntaxKind.ExportSpecifier;
}

export function isMissingDeclaration(node: Node): node is MissingDeclaration {
    return node.kind === SyntaxKind.MissingDeclaration;
}

export function isNotEmittedStatement(node: Node): node is NotEmittedStatement {
    return node.kind === SyntaxKind.NotEmittedStatement;
}

/** @internal */
export function isSyntheticReference(node: Node): node is SyntheticReferenceExpression {
    return node.kind === SyntaxKind.SyntheticReferenceExpression;
}

// Module References

export function isExternalModuleReference(node: Node): node is ExternalModuleReference {
    return node.kind === SyntaxKind.ExternalModuleReference;
}

// JSX

export function isJsxElement(node: Node): node is JsxElement {
    return node.kind === SyntaxKind.JsxElement;
}

export function isJsxSelfClosingElement(node: Node): node is JsxSelfClosingElement {
    return node.kind === SyntaxKind.JsxSelfClosingElement;
}

export function isJsxOpeningElement(node: Node): node is JsxOpeningElement {
    return node.kind === SyntaxKind.JsxOpeningElement;
}

export function isJsxClosingElement(node: Node): node is JsxClosingElement {
    return node.kind === SyntaxKind.JsxClosingElement;
}

export function isJsxFragment(node: Node): node is JsxFragment {
    return node.kind === SyntaxKind.JsxFragment;
}

export function isJsxOpeningFragment(node: Node): node is JsxOpeningFragment {
    return node.kind === SyntaxKind.JsxOpeningFragment;
}

export function isJsxClosingFragment(node: Node): node is JsxClosingFragment {
    return node.kind === SyntaxKind.JsxClosingFragment;
}

export function isJsxAttribute(node: Node): node is JsxAttribute {
    return node.kind === SyntaxKind.JsxAttribute;
}

export function isJsxAttributes(node: Node): node is JsxAttributes {
    return node.kind === SyntaxKind.JsxAttributes;
}

export function isJsxSpreadAttribute(node: Node): node is JsxSpreadAttribute {
    return node.kind === SyntaxKind.JsxSpreadAttribute;
}

export function isJsxExpression(node: Node): node is JsxExpression {
    return node.kind === SyntaxKind.JsxExpression;
}

export function isJsxNamespacedName(node: Node): node is JsxNamespacedName {
    return node.kind === SyntaxKind.JsxNamespacedName;
}

// Clauses

export function isCaseClause(node: Node): node is CaseClause {
    return node.kind === SyntaxKind.CaseClause;
}

export function isDefaultClause(node: Node): node is DefaultClause {
    return node.kind === SyntaxKind.DefaultClause;
}

export function isHeritageClause(node: Node): node is HeritageClause {
    return node.kind === SyntaxKind.HeritageClause;
}

export function isCatchClause(node: Node): node is CatchClause {
    return node.kind === SyntaxKind.CatchClause;
}

// Property assignments

export function isPropertyAssignment(node: Node): node is PropertyAssignment {
    return node.kind === SyntaxKind.PropertyAssignment;
}

export function isShorthandPropertyAssignment(node: Node): node is ShorthandPropertyAssignment {
    return node.kind === SyntaxKind.ShorthandPropertyAssignment;
}

export function isSpreadAssignment(node: Node): node is SpreadAssignment {
    return node.kind === SyntaxKind.SpreadAssignment;
}

// Enum

export function isEnumMember(node: Node): node is EnumMember {
    return node.kind === SyntaxKind.EnumMember;
}

// Unparsed

// TODO(rbuckton): isUnparsedPrologue
/** @deprecated */
export function isUnparsedPrepend(node: Node): node is UnparsedPrepend {
    return node.kind === SyntaxKind.UnparsedPrepend;
}

// TODO(rbuckton): isUnparsedText
// TODO(rbuckton): isUnparsedInternalText
// TODO(rbuckton): isUnparsedSyntheticReference

// Top-level nodes
export function isSourceFile(node: Node): node is SourceFile {
    return node.kind === SyntaxKind.SourceFile;
}

export function isBundle(node: Node): node is Bundle {
    return node.kind === SyntaxKind.Bundle;
}

/** @deprecated */
export function isUnparsedSource(node: Node): node is UnparsedSource {
    return node.kind === SyntaxKind.UnparsedSource;
}

// TODO(rbuckton): isInputFiles

// JSDoc Elements

export function isJSDocTypeExpression(node: Node): node is JSDocTypeExpression {
    return node.kind === SyntaxKind.JSDocTypeExpression;
}

export function isJSDocNameReference(node: Node): node is JSDocNameReference {
    return node.kind === SyntaxKind.JSDocNameReference;
}

export function isJSDocMemberName(node: Node): node is JSDocMemberName {
    return node.kind === SyntaxKind.JSDocMemberName;
}

export function isJSDocLink(node: Node): node is JSDocLink {
    return node.kind === SyntaxKind.JSDocLink;
}

export function isJSDocLinkCode(node: Node): node is JSDocLinkCode {
    return node.kind === SyntaxKind.JSDocLinkCode;
}

export function isJSDocLinkPlain(node: Node): node is JSDocLinkPlain {
    return node.kind === SyntaxKind.JSDocLinkPlain;
}

export function isJSDocAllType(node: Node): node is JSDocAllType {
    return node.kind === SyntaxKind.JSDocAllType;
}

export function isJSDocUnknownType(node: Node): node is JSDocUnknownType {
    return node.kind === SyntaxKind.JSDocUnknownType;
}

export function isJSDocNullableType(node: Node): node is JSDocNullableType {
    return node.kind === SyntaxKind.JSDocNullableType;
}

export function isJSDocNonNullableType(node: Node): node is JSDocNonNullableType {
    return node.kind === SyntaxKind.JSDocNonNullableType;
}

export function isJSDocOptionalType(node: Node): node is JSDocOptionalType {
    return node.kind === SyntaxKind.JSDocOptionalType;
}

export function isJSDocFunctionType(node: Node): node is JSDocFunctionType {
    return node.kind === SyntaxKind.JSDocFunctionType;
}

export function isJSDocVariadicType(node: Node): node is JSDocVariadicType {
    return node.kind === SyntaxKind.JSDocVariadicType;
}

export function isJSDocNamepathType(node: Node): node is JSDocNamepathType {
    return node.kind === SyntaxKind.JSDocNamepathType;
}

export function isJSDoc(node: Node): node is JSDoc {
    return node.kind === SyntaxKind.JSDoc;
}

export function isJSDocTypeLiteral(node: Node): node is JSDocTypeLiteral {
    return node.kind === SyntaxKind.JSDocTypeLiteral;
}

export function isJSDocSignature(node: Node): node is JSDocSignature {
    return node.kind === SyntaxKind.JSDocSignature;
}

// JSDoc Tags

export function isJSDocAugmentsTag(node: Node): node is JSDocAugmentsTag {
    return node.kind === SyntaxKind.JSDocAugmentsTag;
}

export function isJSDocAuthorTag(node: Node): node is JSDocAuthorTag {
    return node.kind === SyntaxKind.JSDocAuthorTag;
}

export function isJSDocClassTag(node: Node): node is JSDocClassTag {
    return node.kind === SyntaxKind.JSDocClassTag;
}

export function isJSDocCallbackTag(node: Node): node is JSDocCallbackTag {
    return node.kind === SyntaxKind.JSDocCallbackTag;
}

export function isJSDocPublicTag(node: Node): node is JSDocPublicTag {
    return node.kind === SyntaxKind.JSDocPublicTag;
}

export function isJSDocPrivateTag(node: Node): node is JSDocPrivateTag {
    return node.kind === SyntaxKind.JSDocPrivateTag;
}

export function isJSDocProtectedTag(node: Node): node is JSDocProtectedTag {
    return node.kind === SyntaxKind.JSDocProtectedTag;
}

export function isJSDocReadonlyTag(node: Node): node is JSDocReadonlyTag {
    return node.kind === SyntaxKind.JSDocReadonlyTag;
}

export function isJSDocOverrideTag(node: Node): node is JSDocOverrideTag {
    return node.kind === SyntaxKind.JSDocOverrideTag;
}

export function isJSDocOverloadTag(node: Node): node is JSDocOverloadTag {
    return node.kind === SyntaxKind.JSDocOverloadTag;
}

export function isJSDocDeprecatedTag(node: Node): node is JSDocDeprecatedTag {
    return node.kind === SyntaxKind.JSDocDeprecatedTag;
}

export function isJSDocSeeTag(node: Node): node is JSDocSeeTag {
    return node.kind === SyntaxKind.JSDocSeeTag;
}

export function isJSDocEnumTag(node: Node): node is JSDocEnumTag {
    return node.kind === SyntaxKind.JSDocEnumTag;
}

export function isJSDocParameterTag(node: Node): node is JSDocParameterTag {
    return node.kind === SyntaxKind.JSDocParameterTag;
}

export function isJSDocReturnTag(node: Node): node is JSDocReturnTag {
    return node.kind === SyntaxKind.JSDocReturnTag;
}

export function isJSDocThisTag(node: Node): node is JSDocThisTag {
    return node.kind === SyntaxKind.JSDocThisTag;
}

export function isJSDocTypeTag(node: Node): node is JSDocTypeTag {
    return node.kind === SyntaxKind.JSDocTypeTag;
}

export function isJSDocTemplateTag(node: Node): node is JSDocTemplateTag {
    return node.kind === SyntaxKind.JSDocTemplateTag;
}

export function isJSDocTypedefTag(node: Node): node is JSDocTypedefTag {
    return node.kind === SyntaxKind.JSDocTypedefTag;
}

export function isJSDocUnknownTag(node: Node): node is JSDocUnknownTag {
    return node.kind === SyntaxKind.JSDocTag;
}

export function isJSDocPropertyTag(node: Node): node is JSDocPropertyTag {
    return node.kind === SyntaxKind.JSDocPropertyTag;
}

export function isJSDocImplementsTag(node: Node): node is JSDocImplementsTag {
    return node.kind === SyntaxKind.JSDocImplementsTag;
}

export function isJSDocSatisfiesTag(node: Node): node is JSDocSatisfiesTag {
    return node.kind === SyntaxKind.JSDocSatisfiesTag;
}

export function isJSDocThrowsTag(node: Node): node is JSDocThrowsTag {
    return node.kind === SyntaxKind.JSDocThrowsTag;
}

// Synthesized list

/** @internal */
export function isSyntaxList(n: Node): n is SyntaxList {
    return n.kind === SyntaxKind.SyntaxList;
}
