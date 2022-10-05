namespace ts {
// Literals

export function isNumericLiteral(node: ts.Node): node is ts.NumericLiteral {
    return node.kind === ts.SyntaxKind.NumericLiteral;
}

export function isBigIntLiteral(node: ts.Node): node is ts.BigIntLiteral {
    return node.kind === ts.SyntaxKind.BigIntLiteral;
}

export function isStringLiteral(node: ts.Node): node is ts.StringLiteral {
    return node.kind === ts.SyntaxKind.StringLiteral;
}

export function isJsxText(node: ts.Node): node is ts.JsxText {
    return node.kind === ts.SyntaxKind.JsxText;
}

export function isRegularExpressionLiteral(node: ts.Node): node is ts.RegularExpressionLiteral {
    return node.kind === ts.SyntaxKind.RegularExpressionLiteral;
}

export function isNoSubstitutionTemplateLiteral(node: ts.Node): node is ts.NoSubstitutionTemplateLiteral {
    return node.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral;
}

// Pseudo-literals

export function isTemplateHead(node: ts.Node): node is ts.TemplateHead {
    return node.kind === ts.SyntaxKind.TemplateHead;
}

export function isTemplateMiddle(node: ts.Node): node is ts.TemplateMiddle {
    return node.kind === ts.SyntaxKind.TemplateMiddle;
}

export function isTemplateTail(node: ts.Node): node is ts.TemplateTail {
    return node.kind === ts.SyntaxKind.TemplateTail;
}

// Punctuation

export function isDotDotDotToken(node: ts.Node): node is ts.DotDotDotToken {
    return node.kind === ts.SyntaxKind.DotDotDotToken;
}

/*@internal*/
export function isCommaToken(node: ts.Node): node is ts.Token<ts.SyntaxKind.CommaToken> {
    return node.kind === ts.SyntaxKind.CommaToken;
}

export function isPlusToken(node: ts.Node): node is ts.PlusToken {
    return node.kind === ts.SyntaxKind.PlusToken;
}

export function isMinusToken(node: ts.Node): node is ts.MinusToken {
    return node.kind === ts.SyntaxKind.MinusToken;
}

export function isAsteriskToken(node: ts.Node): node is ts.AsteriskToken {
    return node.kind === ts.SyntaxKind.AsteriskToken;
}

/*@internal*/
export function isExclamationToken(node: ts.Node): node is ts.ExclamationToken {
    return node.kind === ts.SyntaxKind.ExclamationToken;
}

/*@internal*/
export function isQuestionToken(node: ts.Node): node is ts.QuestionToken {
    return node.kind === ts.SyntaxKind.QuestionToken;
}

/*@internal*/
export function isColonToken(node: ts.Node): node is ts.ColonToken {
    return node.kind === ts.SyntaxKind.ColonToken;
}

/*@internal*/
export function isQuestionDotToken(node: ts.Node): node is ts.QuestionDotToken {
    return node.kind === ts.SyntaxKind.QuestionDotToken;
}

/*@internal*/
export function isEqualsGreaterThanToken(node: ts.Node): node is ts.EqualsGreaterThanToken {
    return node.kind === ts.SyntaxKind.EqualsGreaterThanToken;
}

// Identifiers

export function isIdentifier(node: ts.Node): node is ts.Identifier {
    return node.kind === ts.SyntaxKind.Identifier;
}

export function isPrivateIdentifier(node: ts.Node): node is ts.PrivateIdentifier {
    return node.kind === ts.SyntaxKind.PrivateIdentifier;
}

// Reserved Words

/* @internal */
export function isExportModifier(node: ts.Node): node is ts.ExportKeyword {
    return node.kind === ts.SyntaxKind.ExportKeyword;
}

/* @internal */
export function isAsyncModifier(node: ts.Node): node is ts.AsyncKeyword {
    return node.kind === ts.SyntaxKind.AsyncKeyword;
}

/* @internal */
export function isAssertsKeyword(node: ts.Node): node is ts.AssertsKeyword {
    return node.kind === ts.SyntaxKind.AssertsKeyword;
}

/* @internal */
export function isAwaitKeyword(node: ts.Node): node is ts.AwaitKeyword {
    return node.kind === ts.SyntaxKind.AwaitKeyword;
}

/* @internal */
export function isReadonlyKeyword(node: ts.Node): node is ts.ReadonlyKeyword {
    return node.kind === ts.SyntaxKind.ReadonlyKeyword;
}

/* @internal */
export function isStaticModifier(node: ts.Node): node is ts.StaticKeyword {
    return node.kind === ts.SyntaxKind.StaticKeyword;
}

/* @internal */
export function isAbstractModifier(node: ts.Node): node is ts.AbstractKeyword {
    return node.kind === ts.SyntaxKind.AbstractKeyword;
}

/* @internal */
export function isOverrideModifier(node: ts.Node): node is ts.OverrideKeyword {
    return node.kind === ts.SyntaxKind.OverrideKeyword;
}

/* @internal */
export function isAccessorModifier(node: ts.Node): node is ts.AccessorKeyword {
    return node.kind === ts.SyntaxKind.AccessorKeyword;
}

/*@internal*/
export function isSuperKeyword(node: ts.Node): node is ts.SuperExpression {
    return node.kind === ts.SyntaxKind.SuperKeyword;
}

/*@internal*/
export function isImportKeyword(node: ts.Node): node is ts.ImportExpression {
    return node.kind === ts.SyntaxKind.ImportKeyword;
}

// Names

export function isQualifiedName(node: ts.Node): node is ts.QualifiedName {
    return node.kind === ts.SyntaxKind.QualifiedName;
}

export function isComputedPropertyName(node: ts.Node): node is ts.ComputedPropertyName {
    return node.kind === ts.SyntaxKind.ComputedPropertyName;
}

// Signature elements

export function isTypeParameterDeclaration(node: ts.Node): node is ts.TypeParameterDeclaration {
    return node.kind === ts.SyntaxKind.TypeParameter;
}

// TODO(rbuckton): Rename to 'isParameterDeclaration'
export function isParameter(node: ts.Node): node is ts.ParameterDeclaration {
    return node.kind === ts.SyntaxKind.Parameter;
}

export function isDecorator(node: ts.Node): node is ts.Decorator {
    return node.kind === ts.SyntaxKind.Decorator;
}

// TypeMember

export function isPropertySignature(node: ts.Node): node is ts.PropertySignature {
    return node.kind === ts.SyntaxKind.PropertySignature;
}

export function isPropertyDeclaration(node: ts.Node): node is ts.PropertyDeclaration {
    return node.kind === ts.SyntaxKind.PropertyDeclaration;
}

export function isMethodSignature(node: ts.Node): node is ts.MethodSignature {
    return node.kind === ts.SyntaxKind.MethodSignature;
}

export function isMethodDeclaration(node: ts.Node): node is ts.MethodDeclaration {
    return node.kind === ts.SyntaxKind.MethodDeclaration;
}

export function isClassStaticBlockDeclaration(node: ts.Node): node is ts.ClassStaticBlockDeclaration {
    return node.kind === ts.SyntaxKind.ClassStaticBlockDeclaration;
}

export function isConstructorDeclaration(node: ts.Node): node is ts.ConstructorDeclaration {
    return node.kind === ts.SyntaxKind.Constructor;
}

export function isGetAccessorDeclaration(node: ts.Node): node is ts.GetAccessorDeclaration {
    return node.kind === ts.SyntaxKind.GetAccessor;
}

export function isSetAccessorDeclaration(node: ts.Node): node is ts.SetAccessorDeclaration {
    return node.kind === ts.SyntaxKind.SetAccessor;
}

export function isCallSignatureDeclaration(node: ts.Node): node is ts.CallSignatureDeclaration {
    return node.kind === ts.SyntaxKind.CallSignature;
}

export function isConstructSignatureDeclaration(node: ts.Node): node is ts.ConstructSignatureDeclaration {
    return node.kind === ts.SyntaxKind.ConstructSignature;
}

export function isIndexSignatureDeclaration(node: ts.Node): node is ts.IndexSignatureDeclaration {
    return node.kind === ts.SyntaxKind.IndexSignature;
}

// Type

export function isTypePredicateNode(node: ts.Node): node is ts.TypePredicateNode {
    return node.kind === ts.SyntaxKind.TypePredicate;
}

export function isTypeReferenceNode(node: ts.Node): node is ts.TypeReferenceNode {
    return node.kind === ts.SyntaxKind.TypeReference;
}

export function isFunctionTypeNode(node: ts.Node): node is ts.FunctionTypeNode {
    return node.kind === ts.SyntaxKind.FunctionType;
}

export function isConstructorTypeNode(node: ts.Node): node is ts.ConstructorTypeNode {
    return node.kind === ts.SyntaxKind.ConstructorType;
}

export function isTypeQueryNode(node: ts.Node): node is ts.TypeQueryNode {
    return node.kind === ts.SyntaxKind.TypeQuery;
}

export function isTypeLiteralNode(node: ts.Node): node is ts.TypeLiteralNode {
    return node.kind === ts.SyntaxKind.TypeLiteral;
}

export function isArrayTypeNode(node: ts.Node): node is ts.ArrayTypeNode {
    return node.kind === ts.SyntaxKind.ArrayType;
}

export function isTupleTypeNode(node: ts.Node): node is ts.TupleTypeNode {
    return node.kind === ts.SyntaxKind.TupleType;
}

export function isNamedTupleMember(node: ts.Node): node is ts.NamedTupleMember {
    return node.kind === ts.SyntaxKind.NamedTupleMember;
}

export function isOptionalTypeNode(node: ts.Node): node is ts.OptionalTypeNode {
    return node.kind === ts.SyntaxKind.OptionalType;
}

export function isRestTypeNode(node: ts.Node): node is ts.RestTypeNode {
    return node.kind === ts.SyntaxKind.RestType;
}

export function isUnionTypeNode(node: ts.Node): node is ts.UnionTypeNode {
    return node.kind === ts.SyntaxKind.UnionType;
}

export function isIntersectionTypeNode(node: ts.Node): node is ts.IntersectionTypeNode {
    return node.kind === ts.SyntaxKind.IntersectionType;
}

export function isConditionalTypeNode(node: ts.Node): node is ts.ConditionalTypeNode {
    return node.kind === ts.SyntaxKind.ConditionalType;
}

export function isInferTypeNode(node: ts.Node): node is ts.InferTypeNode {
    return node.kind === ts.SyntaxKind.InferType;
}

export function isParenthesizedTypeNode(node: ts.Node): node is ts.ParenthesizedTypeNode {
    return node.kind === ts.SyntaxKind.ParenthesizedType;
}

export function isThisTypeNode(node: ts.Node): node is ts.ThisTypeNode {
    return node.kind === ts.SyntaxKind.ThisType;
}

export function isTypeOperatorNode(node: ts.Node): node is ts.TypeOperatorNode {
    return node.kind === ts.SyntaxKind.TypeOperator;
}

export function isIndexedAccessTypeNode(node: ts.Node): node is ts.IndexedAccessTypeNode {
    return node.kind === ts.SyntaxKind.IndexedAccessType;
}

export function isMappedTypeNode(node: ts.Node): node is ts.MappedTypeNode {
    return node.kind === ts.SyntaxKind.MappedType;
}

export function isLiteralTypeNode(node: ts.Node): node is ts.LiteralTypeNode {
    return node.kind === ts.SyntaxKind.LiteralType;
}

export function isImportTypeNode(node: ts.Node): node is ts.ImportTypeNode {
    return node.kind === ts.SyntaxKind.ImportType;
}

export function isTemplateLiteralTypeSpan(node: ts.Node): node is ts.TemplateLiteralTypeSpan {
    return node.kind === ts.SyntaxKind.TemplateLiteralTypeSpan;
}

export function isTemplateLiteralTypeNode(node: ts.Node): node is ts.TemplateLiteralTypeNode {
    return node.kind === ts.SyntaxKind.TemplateLiteralType;
}

// Binding patterns

export function isObjectBindingPattern(node: ts.Node): node is ts.ObjectBindingPattern {
    return node.kind === ts.SyntaxKind.ObjectBindingPattern;
}

export function isArrayBindingPattern(node: ts.Node): node is ts.ArrayBindingPattern {
    return node.kind === ts.SyntaxKind.ArrayBindingPattern;
}

export function isBindingElement(node: ts.Node): node is ts.BindingElement {
    return node.kind === ts.SyntaxKind.BindingElement;
}

// Expression

export function isArrayLiteralExpression(node: ts.Node): node is ts.ArrayLiteralExpression {
    return node.kind === ts.SyntaxKind.ArrayLiteralExpression;
}

export function isObjectLiteralExpression(node: ts.Node): node is ts.ObjectLiteralExpression {
    return node.kind === ts.SyntaxKind.ObjectLiteralExpression;
}

export function isPropertyAccessExpression(node: ts.Node): node is ts.PropertyAccessExpression {
    return node.kind === ts.SyntaxKind.PropertyAccessExpression;
}

export function isElementAccessExpression(node: ts.Node): node is ts.ElementAccessExpression {
    return node.kind === ts.SyntaxKind.ElementAccessExpression;
}

export function isCallExpression(node: ts.Node): node is ts.CallExpression {
    return node.kind === ts.SyntaxKind.CallExpression;
}

export function isNewExpression(node: ts.Node): node is ts.NewExpression {
    return node.kind === ts.SyntaxKind.NewExpression;
}

export function isTaggedTemplateExpression(node: ts.Node): node is ts.TaggedTemplateExpression {
    return node.kind === ts.SyntaxKind.TaggedTemplateExpression;
}

export function isTypeAssertionExpression(node: ts.Node): node is ts.TypeAssertion {
    return node.kind === ts.SyntaxKind.TypeAssertionExpression;
}

export function isParenthesizedExpression(node: ts.Node): node is ts.ParenthesizedExpression {
    return node.kind === ts.SyntaxKind.ParenthesizedExpression;
}

export function isFunctionExpression(node: ts.Node): node is ts.FunctionExpression {
    return node.kind === ts.SyntaxKind.FunctionExpression;
}

export function isArrowFunction(node: ts.Node): node is ts.ArrowFunction {
    return node.kind === ts.SyntaxKind.ArrowFunction;
}

export function isDeleteExpression(node: ts.Node): node is ts.DeleteExpression {
    return node.kind === ts.SyntaxKind.DeleteExpression;
}

export function isTypeOfExpression(node: ts.Node): node is ts.TypeOfExpression {
    return node.kind === ts.SyntaxKind.TypeOfExpression;
}

export function isVoidExpression(node: ts.Node): node is ts.VoidExpression {
    return node.kind === ts.SyntaxKind.VoidExpression;
}

export function isAwaitExpression(node: ts.Node): node is ts.AwaitExpression {
    return node.kind === ts.SyntaxKind.AwaitExpression;
}

export function isPrefixUnaryExpression(node: ts.Node): node is ts.PrefixUnaryExpression {
    return node.kind === ts.SyntaxKind.PrefixUnaryExpression;
}

export function isPostfixUnaryExpression(node: ts.Node): node is ts.PostfixUnaryExpression {
    return node.kind === ts.SyntaxKind.PostfixUnaryExpression;
}

export function isBinaryExpression(node: ts.Node): node is ts.BinaryExpression {
    return node.kind === ts.SyntaxKind.BinaryExpression;
}

export function isConditionalExpression(node: ts.Node): node is ts.ConditionalExpression {
    return node.kind === ts.SyntaxKind.ConditionalExpression;
}

export function isTemplateExpression(node: ts.Node): node is ts.TemplateExpression {
    return node.kind === ts.SyntaxKind.TemplateExpression;
}

export function isYieldExpression(node: ts.Node): node is ts.YieldExpression {
    return node.kind === ts.SyntaxKind.YieldExpression;
}

export function isSpreadElement(node: ts.Node): node is ts.SpreadElement {
    return node.kind === ts.SyntaxKind.SpreadElement;
}

export function isClassExpression(node: ts.Node): node is ts.ClassExpression {
    return node.kind === ts.SyntaxKind.ClassExpression;
}

export function isOmittedExpression(node: ts.Node): node is ts.OmittedExpression {
    return node.kind === ts.SyntaxKind.OmittedExpression;
}

export function isExpressionWithTypeArguments(node: ts.Node): node is ts.ExpressionWithTypeArguments {
    return node.kind === ts.SyntaxKind.ExpressionWithTypeArguments;
}

export function isAsExpression(node: ts.Node): node is ts.AsExpression {
    return node.kind === ts.SyntaxKind.AsExpression;
}

export function isSatisfiesExpression(node: ts.Node): node is ts.SatisfiesExpression {
    return node.kind === ts.SyntaxKind.SatisfiesExpression;
}

export function isNonNullExpression(node: ts.Node): node is ts.NonNullExpression {
    return node.kind === ts.SyntaxKind.NonNullExpression;
}

export function isMetaProperty(node: ts.Node): node is ts.MetaProperty {
    return node.kind === ts.SyntaxKind.MetaProperty;
}

export function isSyntheticExpression(node: ts.Node): node is ts.SyntheticExpression {
    return node.kind === ts.SyntaxKind.SyntheticExpression;
}

export function isPartiallyEmittedExpression(node: ts.Node): node is ts.PartiallyEmittedExpression {
    return node.kind === ts.SyntaxKind.PartiallyEmittedExpression;
}

export function isCommaListExpression(node: ts.Node): node is ts.CommaListExpression {
    return node.kind === ts.SyntaxKind.CommaListExpression;
}

// Misc

export function isTemplateSpan(node: ts.Node): node is ts.TemplateSpan {
    return node.kind === ts.SyntaxKind.TemplateSpan;
}

export function isSemicolonClassElement(node: ts.Node): node is ts.SemicolonClassElement {
    return node.kind === ts.SyntaxKind.SemicolonClassElement;
}

// Elements

export function isBlock(node: ts.Node): node is ts.Block {
    return node.kind === ts.SyntaxKind.Block;
}

export function isVariableStatement(node: ts.Node): node is ts.VariableStatement {
    return node.kind === ts.SyntaxKind.VariableStatement;
}

export function isEmptyStatement(node: ts.Node): node is ts.EmptyStatement {
    return node.kind === ts.SyntaxKind.EmptyStatement;
}

export function isExpressionStatement(node: ts.Node): node is ts.ExpressionStatement {
    return node.kind === ts.SyntaxKind.ExpressionStatement;
}

export function isIfStatement(node: ts.Node): node is ts.IfStatement {
    return node.kind === ts.SyntaxKind.IfStatement;
}

export function isDoStatement(node: ts.Node): node is ts.DoStatement {
    return node.kind === ts.SyntaxKind.DoStatement;
}

export function isWhileStatement(node: ts.Node): node is ts.WhileStatement {
    return node.kind === ts.SyntaxKind.WhileStatement;
}

export function isForStatement(node: ts.Node): node is ts.ForStatement {
    return node.kind === ts.SyntaxKind.ForStatement;
}

export function isForInStatement(node: ts.Node): node is ts.ForInStatement {
    return node.kind === ts.SyntaxKind.ForInStatement;
}

export function isForOfStatement(node: ts.Node): node is ts.ForOfStatement {
    return node.kind === ts.SyntaxKind.ForOfStatement;
}

export function isContinueStatement(node: ts.Node): node is ts.ContinueStatement {
    return node.kind === ts.SyntaxKind.ContinueStatement;
}

export function isBreakStatement(node: ts.Node): node is ts.BreakStatement {
    return node.kind === ts.SyntaxKind.BreakStatement;
}

export function isReturnStatement(node: ts.Node): node is ts.ReturnStatement {
    return node.kind === ts.SyntaxKind.ReturnStatement;
}

export function isWithStatement(node: ts.Node): node is ts.WithStatement {
    return node.kind === ts.SyntaxKind.WithStatement;
}

export function isSwitchStatement(node: ts.Node): node is ts.SwitchStatement {
    return node.kind === ts.SyntaxKind.SwitchStatement;
}

export function isLabeledStatement(node: ts.Node): node is ts.LabeledStatement {
    return node.kind === ts.SyntaxKind.LabeledStatement;
}

export function isThrowStatement(node: ts.Node): node is ts.ThrowStatement {
    return node.kind === ts.SyntaxKind.ThrowStatement;
}

export function isTryStatement(node: ts.Node): node is ts.TryStatement {
    return node.kind === ts.SyntaxKind.TryStatement;
}

export function isDebuggerStatement(node: ts.Node): node is ts.DebuggerStatement {
    return node.kind === ts.SyntaxKind.DebuggerStatement;
}

export function isVariableDeclaration(node: ts.Node): node is ts.VariableDeclaration {
    return node.kind === ts.SyntaxKind.VariableDeclaration;
}

export function isVariableDeclarationList(node: ts.Node): node is ts.VariableDeclarationList {
    return node.kind === ts.SyntaxKind.VariableDeclarationList;
}

export function isFunctionDeclaration(node: ts.Node): node is ts.FunctionDeclaration {
    return node.kind === ts.SyntaxKind.FunctionDeclaration;
}

export function isClassDeclaration(node: ts.Node): node is ts.ClassDeclaration {
    return node.kind === ts.SyntaxKind.ClassDeclaration;
}

export function isInterfaceDeclaration(node: ts.Node): node is ts.InterfaceDeclaration {
    return node.kind === ts.SyntaxKind.InterfaceDeclaration;
}

export function isTypeAliasDeclaration(node: ts.Node): node is ts.TypeAliasDeclaration {
    return node.kind === ts.SyntaxKind.TypeAliasDeclaration;
}

export function isEnumDeclaration(node: ts.Node): node is ts.EnumDeclaration {
    return node.kind === ts.SyntaxKind.EnumDeclaration;
}

export function isModuleDeclaration(node: ts.Node): node is ts.ModuleDeclaration {
    return node.kind === ts.SyntaxKind.ModuleDeclaration;
}

export function isModuleBlock(node: ts.Node): node is ts.ModuleBlock {
    return node.kind === ts.SyntaxKind.ModuleBlock;
}

export function isCaseBlock(node: ts.Node): node is ts.CaseBlock {
    return node.kind === ts.SyntaxKind.CaseBlock;
}

export function isNamespaceExportDeclaration(node: ts.Node): node is ts.NamespaceExportDeclaration {
    return node.kind === ts.SyntaxKind.NamespaceExportDeclaration;
}

export function isImportEqualsDeclaration(node: ts.Node): node is ts.ImportEqualsDeclaration {
    return node.kind === ts.SyntaxKind.ImportEqualsDeclaration;
}

export function isImportDeclaration(node: ts.Node): node is ts.ImportDeclaration {
    return node.kind === ts.SyntaxKind.ImportDeclaration;
}

export function isImportClause(node: ts.Node): node is ts.ImportClause {
    return node.kind === ts.SyntaxKind.ImportClause;
}

export function isImportTypeAssertionContainer(node: ts.Node): node is ts.ImportTypeAssertionContainer {
    return node.kind === ts.SyntaxKind.ImportTypeAssertionContainer;
}

export function isAssertClause(node: ts.Node): node is ts.AssertClause {
    return node.kind === ts.SyntaxKind.AssertClause;
}

export function isAssertEntry(node: ts.Node): node is ts.AssertEntry {
    return node.kind === ts.SyntaxKind.AssertEntry;
}

export function isNamespaceImport(node: ts.Node): node is ts.NamespaceImport {
    return node.kind === ts.SyntaxKind.NamespaceImport;
}

export function isNamespaceExport(node: ts.Node): node is ts.NamespaceExport {
    return node.kind === ts.SyntaxKind.NamespaceExport;
}

export function isNamedImports(node: ts.Node): node is ts.NamedImports {
    return node.kind === ts.SyntaxKind.NamedImports;
}

export function isImportSpecifier(node: ts.Node): node is ts.ImportSpecifier {
    return node.kind === ts.SyntaxKind.ImportSpecifier;
}

export function isExportAssignment(node: ts.Node): node is ts.ExportAssignment {
    return node.kind === ts.SyntaxKind.ExportAssignment;
}

export function isExportDeclaration(node: ts.Node): node is ts.ExportDeclaration {
    return node.kind === ts.SyntaxKind.ExportDeclaration;
}

export function isNamedExports(node: ts.Node): node is ts.NamedExports {
    return node.kind === ts.SyntaxKind.NamedExports;
}

export function isExportSpecifier(node: ts.Node): node is ts.ExportSpecifier {
    return node.kind === ts.SyntaxKind.ExportSpecifier;
}

export function isMissingDeclaration(node: ts.Node): node is ts.MissingDeclaration {
    return node.kind === ts.SyntaxKind.MissingDeclaration;
}

export function isNotEmittedStatement(node: ts.Node): node is ts.NotEmittedStatement {
    return node.kind === ts.SyntaxKind.NotEmittedStatement;
}

/* @internal */
export function isSyntheticReference(node: ts.Node): node is ts.SyntheticReferenceExpression {
    return node.kind === ts.SyntaxKind.SyntheticReferenceExpression;
}

/* @internal */
export function isMergeDeclarationMarker(node: ts.Node): node is ts.MergeDeclarationMarker {
    return node.kind === ts.SyntaxKind.MergeDeclarationMarker;
}

/* @internal */
export function isEndOfDeclarationMarker(node: ts.Node): node is ts.EndOfDeclarationMarker {
    return node.kind === ts.SyntaxKind.EndOfDeclarationMarker;
}

// Module References

export function isExternalModuleReference(node: ts.Node): node is ts.ExternalModuleReference {
    return node.kind === ts.SyntaxKind.ExternalModuleReference;
}

// JSX

export function isJsxElement(node: ts.Node): node is ts.JsxElement {
    return node.kind === ts.SyntaxKind.JsxElement;
}

export function isJsxSelfClosingElement(node: ts.Node): node is ts.JsxSelfClosingElement {
    return node.kind === ts.SyntaxKind.JsxSelfClosingElement;
}

export function isJsxOpeningElement(node: ts.Node): node is ts.JsxOpeningElement {
    return node.kind === ts.SyntaxKind.JsxOpeningElement;
}

export function isJsxClosingElement(node: ts.Node): node is ts.JsxClosingElement {
    return node.kind === ts.SyntaxKind.JsxClosingElement;
}

export function isJsxFragment(node: ts.Node): node is ts.JsxFragment {
    return node.kind === ts.SyntaxKind.JsxFragment;
}

export function isJsxOpeningFragment(node: ts.Node): node is ts.JsxOpeningFragment {
    return node.kind === ts.SyntaxKind.JsxOpeningFragment;
}

export function isJsxClosingFragment(node: ts.Node): node is ts.JsxClosingFragment {
    return node.kind === ts.SyntaxKind.JsxClosingFragment;
}

export function isJsxAttribute(node: ts.Node): node is ts.JsxAttribute {
    return node.kind === ts.SyntaxKind.JsxAttribute;
}

export function isJsxAttributes(node: ts.Node): node is ts.JsxAttributes {
    return node.kind === ts.SyntaxKind.JsxAttributes;
}

export function isJsxSpreadAttribute(node: ts.Node): node is ts.JsxSpreadAttribute {
    return node.kind === ts.SyntaxKind.JsxSpreadAttribute;
}

export function isJsxExpression(node: ts.Node): node is ts.JsxExpression {
    return node.kind === ts.SyntaxKind.JsxExpression;
}

// Clauses

export function isCaseClause(node: ts.Node): node is ts.CaseClause {
    return node.kind === ts.SyntaxKind.CaseClause;
}

export function isDefaultClause(node: ts.Node): node is ts.DefaultClause {
    return node.kind === ts.SyntaxKind.DefaultClause;
}

export function isHeritageClause(node: ts.Node): node is ts.HeritageClause {
    return node.kind === ts.SyntaxKind.HeritageClause;
}

export function isCatchClause(node: ts.Node): node is ts.CatchClause {
    return node.kind === ts.SyntaxKind.CatchClause;
}

// Property assignments

export function isPropertyAssignment(node: ts.Node): node is ts.PropertyAssignment {
    return node.kind === ts.SyntaxKind.PropertyAssignment;
}

export function isShorthandPropertyAssignment(node: ts.Node): node is ts.ShorthandPropertyAssignment {
    return node.kind === ts.SyntaxKind.ShorthandPropertyAssignment;
}

export function isSpreadAssignment(node: ts.Node): node is ts.SpreadAssignment {
    return node.kind === ts.SyntaxKind.SpreadAssignment;
}

// Enum

export function isEnumMember(node: ts.Node): node is ts.EnumMember {
    return node.kind === ts.SyntaxKind.EnumMember;
}

// Unparsed

// TODO(rbuckton): isUnparsedPrologue

export function isUnparsedPrepend(node: ts.Node): node is ts.UnparsedPrepend {
    return node.kind === ts.SyntaxKind.UnparsedPrepend;
}

// TODO(rbuckton): isUnparsedText
// TODO(rbuckton): isUnparsedInternalText
// TODO(rbuckton): isUnparsedSyntheticReference

// Top-level nodes
export function isSourceFile(node: ts.Node): node is ts.SourceFile {
    return node.kind === ts.SyntaxKind.SourceFile;
}

export function isBundle(node: ts.Node): node is ts.Bundle {
    return node.kind === ts.SyntaxKind.Bundle;
}

export function isUnparsedSource(node: ts.Node): node is ts.UnparsedSource {
    return node.kind === ts.SyntaxKind.UnparsedSource;
}

// TODO(rbuckton): isInputFiles

// JSDoc Elements

export function isJSDocTypeExpression(node: ts.Node): node is ts.JSDocTypeExpression {
    return node.kind === ts.SyntaxKind.JSDocTypeExpression;
}

export function isJSDocNameReference(node: ts.Node): node is ts.JSDocNameReference {
    return node.kind === ts.SyntaxKind.JSDocNameReference;
}

export function isJSDocMemberName(node: ts.Node): node is ts.JSDocMemberName {
    return node.kind === ts.SyntaxKind.JSDocMemberName;
}

export function isJSDocLink(node: ts.Node): node is ts.JSDocLink {
    return node.kind === ts.SyntaxKind.JSDocLink;
}

export function isJSDocLinkCode(node: ts.Node): node is ts.JSDocLinkCode {
    return node.kind === ts.SyntaxKind.JSDocLinkCode;
}

export function isJSDocLinkPlain(node: ts.Node): node is ts.JSDocLinkPlain {
    return node.kind === ts.SyntaxKind.JSDocLinkPlain;
}

export function isJSDocAllType(node: ts.Node): node is ts.JSDocAllType {
    return node.kind === ts.SyntaxKind.JSDocAllType;
}

export function isJSDocUnknownType(node: ts.Node): node is ts.JSDocUnknownType {
    return node.kind === ts.SyntaxKind.JSDocUnknownType;
}

export function isJSDocNullableType(node: ts.Node): node is ts.JSDocNullableType {
    return node.kind === ts.SyntaxKind.JSDocNullableType;
}

export function isJSDocNonNullableType(node: ts.Node): node is ts.JSDocNonNullableType {
    return node.kind === ts.SyntaxKind.JSDocNonNullableType;
}

export function isJSDocOptionalType(node: ts.Node): node is ts.JSDocOptionalType {
    return node.kind === ts.SyntaxKind.JSDocOptionalType;
}

export function isJSDocFunctionType(node: ts.Node): node is ts.JSDocFunctionType {
    return node.kind === ts.SyntaxKind.JSDocFunctionType;
}

export function isJSDocVariadicType(node: ts.Node): node is ts.JSDocVariadicType {
    return node.kind === ts.SyntaxKind.JSDocVariadicType;
}

export function isJSDocNamepathType(node: ts.Node): node is ts.JSDocNamepathType {
    return node.kind === ts.SyntaxKind.JSDocNamepathType;
}

export function isJSDoc(node: ts.Node): node is ts.JSDoc {
    return node.kind === ts.SyntaxKind.JSDoc;
}

export function isJSDocTypeLiteral(node: ts.Node): node is ts.JSDocTypeLiteral {
    return node.kind === ts.SyntaxKind.JSDocTypeLiteral;
}

export function isJSDocSignature(node: ts.Node): node is ts.JSDocSignature {
    return node.kind === ts.SyntaxKind.JSDocSignature;
}

// JSDoc Tags

export function isJSDocAugmentsTag(node: ts.Node): node is ts.JSDocAugmentsTag {
    return node.kind === ts.SyntaxKind.JSDocAugmentsTag;
}

export function isJSDocAuthorTag(node: ts.Node): node is ts.JSDocAuthorTag {
    return node.kind === ts.SyntaxKind.JSDocAuthorTag;
}

export function isJSDocClassTag(node: ts.Node): node is ts.JSDocClassTag {
    return node.kind === ts.SyntaxKind.JSDocClassTag;
}

export function isJSDocCallbackTag(node: ts.Node): node is ts.JSDocCallbackTag {
    return node.kind === ts.SyntaxKind.JSDocCallbackTag;
}

export function isJSDocPublicTag(node: ts.Node): node is ts.JSDocPublicTag {
    return node.kind === ts.SyntaxKind.JSDocPublicTag;
}

export function isJSDocPrivateTag(node: ts.Node): node is ts.JSDocPrivateTag {
    return node.kind === ts.SyntaxKind.JSDocPrivateTag;
}

export function isJSDocProtectedTag(node: ts.Node): node is ts.JSDocProtectedTag {
    return node.kind === ts.SyntaxKind.JSDocProtectedTag;
}

export function isJSDocReadonlyTag(node: ts.Node): node is ts.JSDocReadonlyTag {
    return node.kind === ts.SyntaxKind.JSDocReadonlyTag;
}

export function isJSDocOverrideTag(node: ts.Node): node is ts.JSDocOverrideTag {
    return node.kind === ts.SyntaxKind.JSDocOverrideTag;
}

export function isJSDocDeprecatedTag(node: ts.Node): node is ts.JSDocDeprecatedTag {
    return node.kind === ts.SyntaxKind.JSDocDeprecatedTag;
}

export function isJSDocSeeTag(node: ts.Node): node is ts.JSDocSeeTag {
    return node.kind === ts.SyntaxKind.JSDocSeeTag;
}

export function isJSDocEnumTag(node: ts.Node): node is ts.JSDocEnumTag {
    return node.kind === ts.SyntaxKind.JSDocEnumTag;
}

export function isJSDocParameterTag(node: ts.Node): node is ts.JSDocParameterTag {
    return node.kind === ts.SyntaxKind.JSDocParameterTag;
}

export function isJSDocReturnTag(node: ts.Node): node is ts.JSDocReturnTag {
    return node.kind === ts.SyntaxKind.JSDocReturnTag;
}

export function isJSDocThisTag(node: ts.Node): node is ts.JSDocThisTag {
    return node.kind === ts.SyntaxKind.JSDocThisTag;
}

export function isJSDocTypeTag(node: ts.Node): node is ts.JSDocTypeTag {
    return node.kind === ts.SyntaxKind.JSDocTypeTag;
}

export function isJSDocTemplateTag(node: ts.Node): node is ts.JSDocTemplateTag {
    return node.kind === ts.SyntaxKind.JSDocTemplateTag;
}

export function isJSDocTypedefTag(node: ts.Node): node is ts.JSDocTypedefTag {
    return node.kind === ts.SyntaxKind.JSDocTypedefTag;
}

export function isJSDocUnknownTag(node: ts.Node): node is ts.JSDocUnknownTag {
    return node.kind === ts.SyntaxKind.JSDocTag;
}

export function isJSDocPropertyTag(node: ts.Node): node is ts.JSDocPropertyTag {
    return node.kind === ts.SyntaxKind.JSDocPropertyTag;
}

export function isJSDocImplementsTag(node: ts.Node): node is ts.JSDocImplementsTag {
    return node.kind === ts.SyntaxKind.JSDocImplementsTag;
}

// Synthesized list

/* @internal */
export function isSyntaxList(n: ts.Node): n is ts.SyntaxList {
    return n.kind === ts.SyntaxKind.SyntaxList;
}
}
