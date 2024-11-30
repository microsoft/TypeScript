package ast

import (
	"slices"
)

// Determines if a node is missing (either `nil` or empty)
func NodeIsMissing(node *Node) bool {
	return node == nil || node.Loc.Pos() == node.Loc.End() && node.Loc.Pos() >= 0 && node.Kind != KindEndOfFile
}

// Determines if a node is present
func NodeIsPresent(node *Node) bool {
	return !NodeIsMissing(node)
}

// Determines if a node contains synthetic positions
func NodeIsSynthesized(node *Node) bool {
	return PositionIsSynthesized(node.Loc.Pos()) || PositionIsSynthesized(node.Loc.End())
}

// Determines whether a position is synthetic
func PositionIsSynthesized(pos int) bool {
	return pos < 0
}

func NodeKindIs(node *Node, kinds ...Kind) bool {
	return slices.Contains(kinds, node.Kind)
}

func IsAccessor(node *Node) bool {
	return node.Kind == KindGetAccessor || node.Kind == KindSetAccessor
}

func IsPropertyNameLiteral(node *Node) bool {
	switch node.Kind {
	case KindIdentifier,
		KindStringLiteral,
		KindNoSubstitutionTemplateLiteral,
		KindNumericLiteral:
		return true
	}
	return false
}

func IsMemberName(node *Node) bool {
	return node.Kind == KindIdentifier || node.Kind == KindPrivateIdentifier
}

func IsEntityName(node *Node) bool {
	return node.Kind == KindIdentifier || node.Kind == KindQualifiedName
}

func IsPropertyName(node *Node) bool {
	switch node.Kind {
	case KindIdentifier,
		KindPrivateIdentifier,
		KindStringLiteral,
		KindNumericLiteral,
		KindComputedPropertyName:
		return true
	}
	return false
}

func IsBooleanLiteral(node *Node) bool {
	return node.Kind == KindTrueKeyword || node.Kind == KindFalseKeyword
}

// Determines if a node is part of an OptionalChain
func IsOptionalChain(node *Node) bool {
	if node.Flags&NodeFlagsOptionalChain != 0 {
		switch node.Kind {
		case KindPropertyAccessExpression,
			KindElementAccessExpression,
			KindCallExpression,
			KindNonNullExpression:
			return true
		}
	}
	return false
}

func getQuestionDotToken(node *Expression) *TokenNode {
	switch node.Kind {
	case KindPropertyAccessExpression:
		return node.AsPropertyAccessExpression().QuestionDotToken
	case KindElementAccessExpression:
		return node.AsElementAccessExpression().QuestionDotToken
	case KindCallExpression:
		return node.AsCallExpression().QuestionDotToken
	}
	panic("Unhandled case in getQuestionDotToken")
}

// Determines if node is the root expression of an OptionalChain
func IsOptionalChainRoot(node *Expression) bool {
	return IsOptionalChain(node) && !IsNonNullExpression(node) && getQuestionDotToken(node) != nil
}

// Determines whether a node is the outermost `OptionalChain` in an ECMAScript `OptionalExpression`:
//
//  1. For `a?.b.c`, the outermost chain is `a?.b.c` (`c` is the end of the chain starting at `a?.`)
//  2. For `a?.b!`, the outermost chain is `a?.b` (`b` is the end of the chain starting at `a?.`)
//  3. For `(a?.b.c).d`, the outermost chain is `a?.b.c` (`c` is the end of the chain starting at `a?.` since parens end the chain)
//  4. For `a?.b.c?.d`, both `a?.b.c` and `a?.b.c?.d` are outermost (`c` is the end of the chain starting at `a?.`, and `d` is
//     the end of the chain starting at `c?.`)
//  5. For `a?.(b?.c).d`, both `b?.c` and `a?.(b?.c)d` are outermost (`c` is the end of the chain starting at `b`, and `d` is
//     the end of the chain starting at `a?.`)
func IsOutermostOptionalChain(node *Expression) bool {
	parent := node.Parent
	return !IsOptionalChain(parent) || // cases 1, 2, and 3
		IsOptionalChainRoot(parent) || // case 4
		node != parent.Expression() // case 5
}

// Determines whether a node is the expression preceding an optional chain (i.e. `a` in `a?.b`).
func IsExpressionOfOptionalChainRoot(node *Node) bool {
	return IsOptionalChainRoot(node.Parent) && node.Parent.Expression() == node
}

func IsAssertionExpression(node *Node) bool {
	kind := node.Kind
	return kind == KindTypeAssertionExpression || kind == KindAsExpression
}

func isLeftHandSideExpressionKind(kind Kind) bool {
	switch kind {
	case KindPropertyAccessExpression, KindElementAccessExpression, KindNewExpression, KindCallExpression,
		KindJsxElement, KindJsxSelfClosingElement, KindJsxFragment, KindTaggedTemplateExpression, KindArrayLiteralExpression,
		KindParenthesizedExpression, KindObjectLiteralExpression, KindClassExpression, KindFunctionExpression, KindIdentifier,
		KindPrivateIdentifier, KindRegularExpressionLiteral, KindNumericLiteral, KindBigIntLiteral, KindStringLiteral,
		KindNoSubstitutionTemplateLiteral, KindTemplateExpression, KindFalseKeyword, KindNullKeyword, KindThisKeyword,
		KindTrueKeyword, KindSuperKeyword, KindNonNullExpression, KindExpressionWithTypeArguments, KindMetaProperty,
		KindImportKeyword, KindMissingDeclaration:
		return true
	}
	return false
}

// Determines whether a node is a LeftHandSideExpression based only on its kind.
func IsLeftHandSideExpression(node *Node) bool {
	return isLeftHandSideExpressionKind(node.Kind)
}

func isUnaryExpressionKind(kind Kind) bool {
	switch kind {
	case KindPrefixUnaryExpression,
		KindPostfixUnaryExpression,
		KindDeleteExpression,
		KindTypeOfExpression,
		KindVoidExpression,
		KindAwaitExpression,
		KindTypeAssertionExpression:
		return true
	}
	return isLeftHandSideExpressionKind(kind)
}

// Determines whether a node is a UnaryExpression based only on its kind.
func IsUnaryExpression(node *Node) bool {
	return isUnaryExpressionKind(node.Kind)
}

func isExpressionKind(kind Kind) bool {
	switch kind {
	case KindConditionalExpression,
		KindYieldExpression,
		KindArrowFunction,
		KindBinaryExpression,
		KindSpreadElement,
		KindAsExpression,
		KindOmittedExpression,
		KindCommaListExpression,
		KindPartiallyEmittedExpression,
		KindSatisfiesExpression:
		return true
	}
	return isUnaryExpressionKind(kind)
}

// Determines whether a node is an expression based only on its kind.
func IsExpression(node *Node) bool {
	return isExpressionKind(node.Kind)
}

func IsCommaExpression(node *Node) bool {
	return node.Kind == KindBinaryExpression && node.AsBinaryExpression().OperatorToken.Kind == KindCommaToken
}

func IsCommaSequence(node *Node) bool {
	// !!!
	// New compiler just has binary expressinons.
	// Maybe this should consider KindCommaListExpression even though we don't generate them.
	return IsCommaExpression(node)
}

func IsIterationStatement(node *Node, lookInLabeledStatements bool) bool {
	switch node.Kind {
	case KindForStatement,
		KindForInStatement,
		KindForOfStatement,
		KindDoStatement,
		KindWhileStatement:
		return true
	case KindLabeledStatement:
		return lookInLabeledStatements && IsIterationStatement((node.AsLabeledStatement()).Statement, lookInLabeledStatements)
	}

	return false
}

// Determines if a node is a property or element access expression
func IsAccessExpression(node *Node) bool {
	return node.Kind == KindPropertyAccessExpression || node.Kind == KindElementAccessExpression
}

func isFunctionLikeDeclarationKind(kind Kind) bool {
	switch kind {
	case KindFunctionDeclaration,
		KindMethodDeclaration,
		KindConstructor,
		KindGetAccessor,
		KindSetAccessor,
		KindFunctionExpression,
		KindArrowFunction:
		return true
	}
	return false
}

// Determines if a node is function-like (but is not a signature declaration)
func IsFunctionLikeDeclaration(node *Node) bool {
	// TODO(rbuckton): Move `node != nil` test to call sites
	return node != nil && isFunctionLikeDeclarationKind(node.Kind)
}

func isFunctionLikeKind(kind Kind) bool {
	switch kind {
	case KindMethodSignature,
		KindCallSignature,
		KindJSDocSignature,
		KindConstructSignature,
		KindIndexSignature,
		KindFunctionType,
		KindJSDocFunctionType,
		KindConstructorType:
		return true
	}
	return isFunctionLikeDeclarationKind(kind)
}

// Determines if a node is function- or signature-like.
func IsFunctionLike(node *Node) bool {
	// TODO(rbuckton): Move `node != nil` test to call sites
	return node != nil && isFunctionLikeKind(node.Kind)
}

func IsFunctionOrSourceFile(node *Node) bool {
	return IsFunctionLike(node) || IsSourceFile(node)
}

func IsClassLike(node *Node) bool {
	return node.Kind == KindClassDeclaration || node.Kind == KindClassExpression
}

func IsClassElement(node *Node) bool {
	switch node.Kind {
	case KindConstructor,
		KindPropertyDeclaration,
		KindMethodDeclaration,
		KindGetAccessor,
		KindSetAccessor,
		KindIndexSignature,
		KindClassStaticBlockDeclaration,
		KindSemicolonClassElement:
		return true
	}
	return false
}

func IsObjectLiteralElement(node *Node) bool {
	switch node.Kind {
	case KindPropertyAssignment,
		KindShorthandPropertyAssignment,
		KindSpreadAssignment,
		KindMethodDeclaration,
		KindGetAccessor,
		KindSetAccessor:
		return true
	}
	return false
}

func isDeclarationStatementKind(kind Kind) bool {
	switch kind {
	case KindFunctionDeclaration,
		KindMissingDeclaration,
		KindClassDeclaration,
		KindInterfaceDeclaration,
		KindTypeAliasDeclaration,
		KindEnumDeclaration,
		KindModuleDeclaration,
		KindImportDeclaration,
		KindImportEqualsDeclaration,
		KindExportDeclaration,
		KindExportAssignment,
		KindNamespaceExportDeclaration:
		return true
	}
	return false
}

// Determines whether a node is a DeclarationStatement. Ideally this does not use Parent pointers, but it may use them
// to rule out a Block node that is part of `try` or `catch` or is the Block-like body of a function.
//
// NOTE: ECMA262 would just call this a Declaration
func IsDeclarationStatement(node *Node) bool {
	return isDeclarationStatementKind(node.Kind)
}

func isStatementKindButNotDeclarationKind(kind Kind) bool {
	switch kind {
	case KindBreakStatement,
		KindContinueStatement,
		KindDebuggerStatement,
		KindDoStatement,
		KindExpressionStatement,
		KindEmptyStatement,
		KindForInStatement,
		KindForOfStatement,
		KindForStatement,
		KindIfStatement,
		KindLabeledStatement,
		KindReturnStatement,
		KindSwitchStatement,
		KindThrowStatement,
		KindTryStatement,
		KindVariableStatement,
		KindWhileStatement,
		KindWithStatement,
		KindNotEmittedStatement:
		return true
	}
	return false
}

// Determines whether a node is a Statement that is not also a Declaration. Ideally this does not use Parent pointers,
// but it may use them to rule out a Block node that is part of `try` or `catch` or is the Block-like body of a function.
//
// NOTE: ECMA262 would just call this a Statement
func IsStatementButNotDeclaration(node *Node) bool {
	return isStatementKindButNotDeclarationKind(node.Kind)
}

// Determines whether a node is a Statement. Ideally this does not use Parent pointers, but it may use
// them to rule out a Block node that is part of `try` or `catch` or is the Block-like body of a function.
//
// NOTE: ECMA262 would call this either a StatementListItem or ModuleListItem
func IsStatement(node *Node) bool {
	kind := node.Kind
	return isStatementKindButNotDeclarationKind(kind) || isDeclarationStatementKind(kind) || isBlockStatement(node)
}

// Determines whether a node is a BlockStatement. If parents are available, this ensures the Block is
// not part of a `try` statement, `catch` clause, or the Block-like body of a function
func isBlockStatement(node *Node) bool {
	if node.Kind != KindBlock {
		return false
	}
	if node.Parent != nil && (node.Parent.Kind == KindTryStatement || node.Parent.Kind == KindCatchClause) {
		return false
	}
	return !IsFunctionBlock(node)
}

// Determines whether a node is the Block-like body of a function by walking the parent of the node
func IsFunctionBlock(node *Node) bool {
	return node != nil && node.Kind == KindBlock && node.Parent != nil && IsFunctionLike(node.Parent)
}

func IsTypeNodeKind(kind Kind) bool {
	switch kind {
	case KindAnyKeyword,
		KindUnknownKeyword,
		KindNumberKeyword,
		KindBigIntKeyword,
		KindObjectKeyword,
		KindBooleanKeyword,
		KindStringKeyword,
		KindSymbolKeyword,
		KindVoidKeyword,
		KindUndefinedKeyword,
		KindNeverKeyword,
		KindIntrinsicKeyword,
		KindExpressionWithTypeArguments,
		KindJSDocAllType,
		KindJSDocUnknownType,
		KindJSDocNullableType,
		KindJSDocNonNullableType,
		KindJSDocOptionalType,
		KindJSDocFunctionType,
		KindJSDocVariadicType:
		return true
	}
	return kind >= KindFirstTypeNode && kind <= KindLastTypeNode
}

func IsTypeNode(node *Node) bool {
	return IsTypeNodeKind(node.Kind)
}

func isJSDocTypeAssertion(_ *Node) bool {
	return false // !!!
}

type OuterExpressionKinds int16

const (
	OEKParentheses                  OuterExpressionKinds = 1 << 0
	OEKTypeAssertions               OuterExpressionKinds = 1 << 1
	OEKNonNullAssertions            OuterExpressionKinds = 1 << 2
	OEKExpressionsWithTypeArguments OuterExpressionKinds = 1 << 3
	OEKExcludeJSDocTypeAssertion                         = 1 << 4
	OEKAssertions                                        = OEKTypeAssertions | OEKNonNullAssertions
	OEKAll                                               = OEKParentheses | OEKAssertions | OEKExpressionsWithTypeArguments
)

// Determines whether node is an "outer expression" of the provided kinds
func IsOuterExpression(node *Expression, kinds OuterExpressionKinds) bool {
	switch node.Kind {
	case KindParenthesizedExpression:
		return kinds&OEKParentheses != 0 && !(kinds&OEKExcludeJSDocTypeAssertion != 0 && isJSDocTypeAssertion(node))
	case KindTypeAssertionExpression, KindAsExpression, KindSatisfiesExpression:
		return kinds&OEKTypeAssertions != 0
	case KindExpressionWithTypeArguments:
		return kinds&OEKExpressionsWithTypeArguments != 0
	case KindNonNullExpression:
		return kinds&OEKNonNullAssertions != 0
	}
	return false
}

// Descends into an expression, skipping past "outer expressions" of the provided kinds
func SkipOuterExpressions(node *Expression, kinds OuterExpressionKinds) *Expression {
	for IsOuterExpression(node, kinds) {
		node = node.Expression()
	}
	return node
}

// Skips past the parentheses of an expression
func SkipParentheses(node *Expression) *Expression {
	return SkipOuterExpressions(node, OEKParentheses)
}

// Walks up the parents of a parenthesized expression to find the containing node
func WalkUpParenthesizedExpressions(node *Expression) *Node {
	for node != nil && node.Kind == KindParenthesizedExpression {
		node = node.Parent
	}
	return node
}

// Walks up the parents of a parenthesized type to find the containing node
func WalkUpParenthesizedTypes(node *TypeNode) *Node {
	for node != nil && node.Kind == KindParenthesizedType {
		node = node.Parent
	}
	return node
}

// Walks up the parents of a node to find the containing SourceFile
func GetSourceFileOfNode(node *Node) *SourceFile {
	for {
		if node == nil {
			return nil
		}
		if node.Kind == KindSourceFile {
			return node.AsSourceFile()
		}
		node = node.Parent
	}
}

// Walks up the parents of a node to find the ancestor that matches the callback
func FindAncestor(node *Node, callback func(*Node) bool) *Node {
	for node != nil {
		result := callback(node)
		if result {
			return node
		}
		node = node.Parent
	}
	return nil
}

type FindAncestorResult int32

const (
	FindAncestorFalse FindAncestorResult = iota
	FindAncestorTrue
	FindAncestorQuit
)

// Walks up the parents of a node to find the ancestor that matches the callback
func FindAncestorOrQuit(node *Node, callback func(*Node) FindAncestorResult) *Node {
	for node != nil {
		switch callback(node) {
		case FindAncestorQuit:
			return nil
		case FindAncestorTrue:
			return node
		}
		node = node.Parent
	}
	return nil
}

func ModifierToFlag(token Kind) ModifierFlags {
	switch token {
	case KindStaticKeyword:
		return ModifierFlagsStatic
	case KindPublicKeyword:
		return ModifierFlagsPublic
	case KindProtectedKeyword:
		return ModifierFlagsProtected
	case KindPrivateKeyword:
		return ModifierFlagsPrivate
	case KindAbstractKeyword:
		return ModifierFlagsAbstract
	case KindAccessorKeyword:
		return ModifierFlagsAccessor
	case KindExportKeyword:
		return ModifierFlagsExport
	case KindDeclareKeyword:
		return ModifierFlagsAmbient
	case KindConstKeyword:
		return ModifierFlagsConst
	case KindDefaultKeyword:
		return ModifierFlagsDefault
	case KindAsyncKeyword:
		return ModifierFlagsAsync
	case KindReadonlyKeyword:
		return ModifierFlagsReadonly
	case KindOverrideKeyword:
		return ModifierFlagsOverride
	case KindInKeyword:
		return ModifierFlagsIn
	case KindOutKeyword:
		return ModifierFlagsOut
	case KindImmediateKeyword:
		return ModifierFlagsImmediate
	case KindDecorator:
		return ModifierFlagsDecorator
	}
	return ModifierFlagsNone
}

func ModifiersToFlags(modifiers []*Node) ModifierFlags {
	var flags ModifierFlags
	for _, modifier := range modifiers {
		flags |= ModifierToFlag(modifier.Kind)
	}
	return flags
}

func CanHaveIllegalDecorators(node *Node) bool {
	switch node.Kind {
	case KindPropertyAssignment, KindShorthandPropertyAssignment,
		KindFunctionDeclaration, KindConstructor,
		KindIndexSignature, KindClassStaticBlockDeclaration,
		KindMissingDeclaration, KindVariableStatement,
		KindInterfaceDeclaration, KindTypeAliasDeclaration,
		KindEnumDeclaration, KindModuleDeclaration,
		KindImportEqualsDeclaration, KindImportDeclaration,
		KindNamespaceExportDeclaration, KindExportDeclaration,
		KindExportAssignment:
		return true
	}
	return false
}

func CanHaveIllegalModifiers(node *Node) bool {
	switch node.Kind {
	case KindClassStaticBlockDeclaration,
		KindPropertyAssignment,
		KindShorthandPropertyAssignment,
		KindMissingDeclaration,
		KindNamespaceExportDeclaration:
		return true
	}
	return false
}

func CanHaveModifiers(node *Node) bool {
	switch node.Kind {
	case KindTypeParameter,
		KindParameter,
		KindPropertySignature,
		KindPropertyDeclaration,
		KindMethodSignature,
		KindMethodDeclaration,
		KindConstructor,
		KindGetAccessor,
		KindSetAccessor,
		KindIndexSignature,
		KindConstructorType,
		KindFunctionExpression,
		KindArrowFunction,
		KindClassExpression,
		KindVariableStatement,
		KindFunctionDeclaration,
		KindClassDeclaration,
		KindInterfaceDeclaration,
		KindTypeAliasDeclaration,
		KindEnumDeclaration,
		KindModuleDeclaration,
		KindImportEqualsDeclaration,
		KindImportDeclaration,
		KindExportAssignment,
		KindExportDeclaration:
		return true
	}
	return false
}

func CanHaveDecorators(node *Node) bool {
	switch node.Kind {
	case KindParameter,
		KindPropertyDeclaration,
		KindMethodDeclaration,
		KindGetAccessor,
		KindSetAccessor,
		KindClassExpression,
		KindClassDeclaration:
		return true
	}
	return false
}

func IsFunctionOrModuleBlock(node *Node) bool {
	return IsSourceFile(node) || IsModuleBlock(node) || IsBlock(node) && IsFunctionLike(node.Parent)
}

func IsFunctionExpressionOrArrowFunction(node *Node) bool {
	return IsFunctionExpression(node) || IsArrowFunction(node)
}
