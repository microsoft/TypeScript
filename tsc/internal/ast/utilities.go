package ast

import (
	"slices"
	"sync/atomic"
)

// Atomic ids

var nextNodeId atomic.Uint32
var nextSymbolId atomic.Uint32

func GetNodeId(node *Node) NodeId {
	if node.Id == 0 {
		node.Id = NodeId(nextNodeId.Add(1))
	}
	return node.Id
}

func GetSymbolId(symbol *Symbol) SymbolId {
	if symbol.Id == 0 {
		symbol.Id = SymbolId(nextSymbolId.Add(1))
	}
	return symbol.Id
}

func GetSymbolTable(data *SymbolTable) SymbolTable {
	if *data == nil {
		*data = make(SymbolTable)
	}
	return *data
}

func GetMembers(symbol *Symbol) SymbolTable {
	return GetSymbolTable(&symbol.Members)
}

func GetExports(symbol *Symbol) SymbolTable {
	return GetSymbolTable(&symbol.Exports)
}

func GetLocals(container *Node) SymbolTable {
	return GetSymbolTable(&container.LocalsContainerData().Locals)
}

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

func IsModifierKind(token Kind) bool {
	switch token {
	case KindAbstractKeyword,
		KindAccessorKeyword,
		KindAsyncKeyword,
		KindConstKeyword,
		KindDeclareKeyword,
		KindDefaultKeyword,
		KindExportKeyword,
		KindInKeyword,
		KindPublicKeyword,
		KindPrivateKeyword,
		KindProtectedKeyword,
		KindReadonlyKeyword,
		KindStaticKeyword,
		KindOutKeyword,
		KindOverrideKeyword:
		return true
	}
	return false
}

func IsModifier(node *Node) bool {
	return IsModifierKind(node.Kind)
}

func IsKeywordKind(token Kind) bool {
	return KindFirstKeyword <= token && token <= KindLastKeyword
}

func IsPunctuationKind(token Kind) bool {
	return KindFirstPunctuation <= token && token <= KindLastPunctuation
}

func IsAssignmentOperator(token Kind) bool {
	return token >= KindFirstAssignment && token <= KindLastAssignment
}

func IsAssignmentExpression(node *Node, excludeCompoundAssignment bool) bool {
	if node.Kind == KindBinaryExpression {
		expr := node.AsBinaryExpression()
		return (expr.OperatorToken.Kind == KindEqualsToken || !excludeCompoundAssignment && IsAssignmentOperator(expr.OperatorToken.Kind)) &&
			IsLeftHandSideExpression(expr.Left)
	}
	return false
}

func GetRightMostAssignedExpression(node *Node) *Node {
	for IsAssignmentExpression(node, true /*excludeCompoundAssignment*/) {
		node = node.AsBinaryExpression().Right
	}
	return node
}

func IsDestructuringAssignment(node *Node) bool {
	if IsAssignmentExpression(node, true /*excludeCompoundAssignment*/) {
		kind := node.AsBinaryExpression().Left.Kind
		return kind == KindObjectLiteralExpression || kind == KindArrayLiteralExpression
	}
	return false
}

// A node is an assignment target if it is on the left hand side of an '=' token, if it is parented by a property
// assignment in an object literal that is an assignment target, or if it is parented by an array literal that is
// an assignment target. Examples include 'a = xxx', '{ p: a } = xxx', '[{ a }] = xxx'.
// (Note that `p` is not a target in the above examples, only `a`.)
func IsAssignmentTarget(node *Node) bool {
	return GetAssignmentTarget(node) != nil
}

// Returns the BinaryExpression, PrefixUnaryExpression, PostfixUnaryExpression, or ForInOrOfStatement that references
// the given node as an assignment target
func GetAssignmentTarget(node *Node) *Node {
	for {
		parent := node.Parent
		switch parent.Kind {
		case KindBinaryExpression:
			if IsAssignmentOperator(parent.AsBinaryExpression().OperatorToken.Kind) && parent.AsBinaryExpression().Left == node {
				return parent
			}
			return nil
		case KindPrefixUnaryExpression:
			if parent.AsPrefixUnaryExpression().Operator == KindPlusPlusToken || parent.AsPrefixUnaryExpression().Operator == KindMinusMinusToken {
				return parent
			}
			return nil
		case KindPostfixUnaryExpression:
			if parent.AsPostfixUnaryExpression().Operator == KindPlusPlusToken || parent.AsPostfixUnaryExpression().Operator == KindMinusMinusToken {
				return parent
			}
			return nil
		case KindForInStatement, KindForOfStatement:
			if parent.AsForInOrOfStatement().Initializer == node {
				return parent
			}
			return nil
		case KindParenthesizedExpression, KindArrayLiteralExpression, KindSpreadElement, KindNonNullExpression:
			node = parent
		case KindSpreadAssignment:
			node = parent.Parent
		case KindShorthandPropertyAssignment:
			if parent.AsShorthandPropertyAssignment().Name() != node {
				return nil
			}
			node = parent.Parent
		case KindPropertyAssignment:
			if parent.AsPropertyAssignment().Name() == node {
				return nil
			}
			node = parent.Parent
		default:
			return nil
		}
	}
}

func isLogicalBinaryOperator(token Kind) bool {
	return token == KindBarBarToken || token == KindAmpersandAmpersandToken
}

func IsLogicalOrCoalescingBinaryOperator(token Kind) bool {
	return isLogicalBinaryOperator(token) || token == KindQuestionQuestionToken
}

func isLogicalOrCoalescingBinaryExpression(expr *Node) bool {
	return IsBinaryExpression(expr) && IsLogicalOrCoalescingBinaryOperator(expr.AsBinaryExpression().OperatorToken.Kind)
}

func IsLogicalOrCoalescingAssignmentOperator(token Kind) bool {
	return token == KindBarBarEqualsToken || token == KindAmpersandAmpersandEqualsToken || token == KindQuestionQuestionEqualsToken
}

func IsLogicalOrCoalescingAssignmentExpression(expr *Node) bool {
	return IsBinaryExpression(expr) && IsLogicalOrCoalescingAssignmentOperator(expr.AsBinaryExpression().OperatorToken.Kind)
}

func IsLogicalExpression(node *Node) bool {
	for {
		if node.Kind == KindParenthesizedExpression {
			node = node.AsParenthesizedExpression().Expression
		} else if node.Kind == KindPrefixUnaryExpression && node.AsPrefixUnaryExpression().Operator == KindExclamationToken {
			node = node.AsPrefixUnaryExpression().Operand
		} else {
			return isLogicalOrCoalescingBinaryExpression(node)
		}
	}
}

func IsTokenKind(token Kind) bool {
	return KindFirstToken <= token && token <= KindLastToken
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

// Return true if the given identifier is classified as an IdentifierName by inspecting the parent of the node
func IsIdentifierName(node *Node) bool {
	parent := node.Parent
	switch parent.Kind {
	case KindPropertyDeclaration, KindPropertySignature, KindMethodDeclaration, KindMethodSignature, KindGetAccessor,
		KindSetAccessor, KindEnumMember, KindPropertyAssignment, KindPropertyAccessExpression:
		return parent.Name() == node
	case KindQualifiedName:
		return parent.AsQualifiedName().Right == node
	case KindBindingElement:
		return parent.AsBindingElement().PropertyName == node
	case KindImportSpecifier:
		return parent.AsImportSpecifier().PropertyName == node
	case KindExportSpecifier, KindJsxAttribute, KindJsxSelfClosingElement, KindJsxOpeningElement, KindJsxClosingElement:
		return true
	}
	return false
}

func IsPushOrUnshiftIdentifier(node *Node) bool {
	text := node.Text()
	return text == "push" || text == "unshift"
}

func IsBooleanLiteral(node *Node) bool {
	return node.Kind == KindTrueKeyword || node.Kind == KindFalseKeyword
}

func IsLiteralKind(kind Kind) bool {
	return KindFirstLiteralToken <= kind && kind <= KindLastLiteralToken
}

func IsLiteralExpression(node *Node) bool {
	return IsLiteralKind(node.Kind)
}

func IsStringLiteralLike(node *Node) bool {
	switch node.Kind {
	case KindStringLiteral, KindNoSubstitutionTemplateLiteral:
		return true
	}
	return false
}

func IsStringOrNumericLiteralLike(node *Node) bool {
	return IsStringLiteralLike(node) || IsNumericLiteral(node)
}

func IsSignedNumericLiteral(node *Node) bool {
	if node.Kind == KindPrefixUnaryExpression {
		node := node.AsPrefixUnaryExpression()
		return (node.Operator == KindPlusToken || node.Operator == KindMinusToken) && IsNumericLiteral(node.Operand)
	}
	return false
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

func IsNullishCoalesce(node *Node) bool {
	return node.Kind == KindBinaryExpression && node.AsBinaryExpression().OperatorToken.Kind == KindQuestionQuestionToken
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

func IsFunctionLikeOrClassStaticBlockDeclaration(node *Node) bool {
	return node != nil && (IsFunctionLike(node) || IsClassStaticBlockDeclaration(node))
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

func isMethodOrAccessor(node *Node) bool {
	switch node.Kind {
	case KindMethodDeclaration, KindGetAccessor, KindSetAccessor:
		return true
	}
	return false
}

func IsPrivateIdentifierClassElementDeclaration(node *Node) bool {
	return (IsPropertyDeclaration(node) || isMethodOrAccessor(node)) && IsPrivateIdentifier(node.Name())
}

func IsObjectLiteralOrClassExpressionMethodOrAccessor(node *Node) bool {
	kind := node.Kind
	return (kind == KindMethodDeclaration || kind == KindGetAccessor || kind == KindSetAccessor) &&
		(node.Parent.Kind == KindObjectLiteralExpression || node.Parent.Kind == KindClassExpression)
}

func IsTypeElement(node *Node) bool {
	switch node.Kind {
	case KindConstructSignature,
		KindCallSignature,
		KindPropertySignature,
		KindMethodSignature,
		KindIndexSignature,
		KindGetAccessor,
		KindSetAccessor:
		// !!! KindNotEmittedTypeElement
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

func IsObjectLiteralMethod(node *Node) bool {
	return node != nil && node.Kind == KindMethodDeclaration && node.Parent.Kind == KindObjectLiteralExpression
}

func IsAutoAccessorPropertyDeclaration(node *Node) bool {
	return IsPropertyDeclaration(node) && HasAccessorModifier(node)
}

func IsParameterPropertyDeclaration(node *Node, parent *Node) bool {
	return IsParameter(node) && HasSyntacticModifier(node, ModifierFlagsParameterPropertyModifier) && parent.Kind == KindConstructor
}

func IsJsxChild(node *Node) bool {
	switch node.Kind {
	case KindJsxElement,
		KindJsxExpression,
		KindJsxSelfClosingElement,
		KindJsxText,
		KindJsxFragment:
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

func GetStatementsOfBlock(block *Node) *StatementList {
	switch block.Kind {
	case KindBlock:
		return block.AsBlock().Statements
	case KindModuleBlock:
		return block.AsModuleBlock().Statements
	case KindSourceFile:
		return block.AsSourceFile().Statements
	}
	panic("Unhandled case in getStatementsOfBlock")
}

func IsBlockOrCatchScoped(declaration *Node) bool {
	return GetCombinedNodeFlags(declaration)&NodeFlagsBlockScoped != 0 || IsCatchClauseVariableDeclarationOrBindingElement(declaration)
}

func IsCatchClauseVariableDeclarationOrBindingElement(declaration *Node) bool {
	node := GetRootDeclaration(declaration)
	return node.Kind == KindVariableDeclaration && node.Parent.Kind == KindCatchClause
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

func IsJSDocKind(kind Kind) bool {
	return KindFirstJSDocNode <= kind && kind <= KindLastJSDocNode
}

func isJSDocTypeAssertion(_ *Node) bool {
	return false // !!!
}

func IsPrologueDirective(node *Node) bool {
	return node.Kind == KindExpressionStatement &&
		node.AsExpressionStatement().Expression.Kind == KindStringLiteral
}

type OuterExpressionKinds int16

const (
	OEKParentheses                  OuterExpressionKinds = 1 << 0
	OEKTypeAssertions               OuterExpressionKinds = 1 << 1
	OEKNonNullAssertions            OuterExpressionKinds = 1 << 2
	OEKPartiallyEmittedExpressions  OuterExpressionKinds = 1 << 3
	OEKExpressionsWithTypeArguments OuterExpressionKinds = 1 << 4
	OEKExcludeJSDocTypeAssertion                         = 1 << 5
	OEKAssertions                                        = OEKTypeAssertions | OEKNonNullAssertions
	OEKAll                                               = OEKParentheses | OEKAssertions | OEKPartiallyEmittedExpressions | OEKExpressionsWithTypeArguments
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

func SkipTypeParentheses(node *Node) *Node {
	for IsParenthesizedTypeNode(node) {
		node = node.AsParenthesizedTypeNode().Type
	}
	return node
}

func SkipPartiallyEmittedExpressions(node *Expression) *Expression {
	return SkipOuterExpressions(node, OEKPartiallyEmittedExpressions)
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

func HasSyntacticModifier(node *Node, flags ModifierFlags) bool {
	return node.ModifierFlags()&flags != 0
}

func HasAccessorModifier(node *Node) bool {
	return HasSyntacticModifier(node, ModifierFlagsAccessor)
}

func HasStaticModifier(node *Node) bool {
	return HasSyntacticModifier(node, ModifierFlagsStatic)
}

func IsStatic(node *Node) bool {
	// https://tc39.es/ecma262/#sec-static-semantics-isstatic
	return IsClassElement(node) && HasStaticModifier(node) || IsClassStaticBlockDeclaration(node)
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

// Warning: This has the same semantics as the forEach family of functions in that traversal terminates
// in the event that 'visitor' returns true.
func ForEachReturnStatement(body *Node, visitor func(stmt *Node) bool) bool {
	var traverse func(*Node) bool
	traverse = func(node *Node) bool {
		switch node.Kind {
		case KindReturnStatement:
			return visitor(node)
		case KindCaseBlock, KindBlock, KindIfStatement, KindDoStatement, KindWhileStatement, KindForStatement, KindForInStatement,
			KindForOfStatement, KindWithStatement, KindSwitchStatement, KindCaseClause, KindDefaultClause, KindLabeledStatement,
			KindTryStatement, KindCatchClause:
			return node.ForEachChild(traverse)
		}
		return false
	}
	return traverse(body)
}

func GetRootDeclaration(node *Node) *Node {
	for node.Kind == KindBindingElement {
		node = node.Parent.Parent
	}
	return node
}

func getCombinedFlags[T ~uint32](node *Node, getFlags func(*Node) T) T {
	node = GetRootDeclaration(node)
	flags := getFlags(node)
	if node.Kind == KindVariableDeclaration {
		node = node.Parent
	}
	if node != nil && node.Kind == KindVariableDeclarationList {
		flags |= getFlags(node)
		node = node.Parent
	}
	if node != nil && node.Kind == KindVariableStatement {
		flags |= getFlags(node)
	}
	return flags
}

func GetCombinedModifierFlags(node *Node) ModifierFlags {
	return getCombinedFlags(node, (*Node).ModifierFlags)
}

func GetCombinedNodeFlags(node *Node) NodeFlags {
	return getCombinedFlags(node, getNodeFlags)
}

func getNodeFlags(node *Node) NodeFlags {
	return node.Flags
}

// Gets whether a bound `VariableDeclaration` or `VariableDeclarationList` is part of an `await using` declaration.
func IsVarAwaitUsing(node *Node) bool {
	return GetCombinedNodeFlags(node)&NodeFlagsBlockScoped == NodeFlagsAwaitUsing
}

// Gets whether a bound `VariableDeclaration` or `VariableDeclarationList` is part of a `using` declaration.
func IsVarUsing(node *Node) bool {
	return GetCombinedNodeFlags(node)&NodeFlagsBlockScoped == NodeFlagsUsing
}

// Gets whether a bound `VariableDeclaration` or `VariableDeclarationList` is part of a `const` declaration.
func IsVarConst(node *Node) bool {
	return GetCombinedNodeFlags(node)&NodeFlagsBlockScoped == NodeFlagsConst
}

// Gets whether a bound `VariableDeclaration` or `VariableDeclarationList` is part of a `const`, `using` or `await using` declaration.
func IsVarConstLike(node *Node) bool {
	switch GetCombinedNodeFlags(node) & NodeFlagsBlockScoped {
	case NodeFlagsConst, NodeFlagsUsing, NodeFlagsAwaitUsing:
		return true
	}
	return false
}

// Gets whether a bound `VariableDeclaration` or `VariableDeclarationList` is part of a `let` declaration.
func IsVarLet(node *Node) bool {
	return GetCombinedNodeFlags(node)&NodeFlagsBlockScoped == NodeFlagsLet
}

func IsImportMeta(node *Node) bool {
	if node.Kind == KindMetaProperty {
		return node.AsMetaProperty().KeywordToken == KindImportKeyword && node.AsMetaProperty().Name().AsIdentifier().Text == "meta"
	}
	return false
}

func WalkUpBindingElementsAndPatterns(binding *Node) *Node {
	node := binding.Parent
	for IsBindingElement(node.Parent) {
		node = node.Parent.Parent
	}
	return node.Parent
}

func IsInJSFile(node *Node) bool {
	return node != nil && node.Flags&NodeFlagsJavaScriptFile != 0
}

func IsDeclaration(node *Node) bool {
	if node.Kind == KindTypeParameter {
		return node.Parent != nil
	}
	return IsDeclarationNode(node)
}

// True if `name` is the name of a declaration node
func IsDeclarationName(name *Node) bool {
	return !IsSourceFile(name) && !IsBindingPattern(name) && IsDeclaration(name.Parent)
}

// Like 'isDeclarationName', but returns true for LHS of `import { x as y }` or `export { x as y }`.
func IsDeclarationNameOrImportPropertyName(name *Node) bool {
	switch name.Parent.Kind {
	case KindImportSpecifier, KindExportSpecifier:
		return IsIdentifier(name) || name.Kind == KindStringLiteral
	default:
		return IsDeclarationName(name)
	}
}

func IsLiteralComputedPropertyDeclarationName(node *Node) bool {
	return IsStringOrNumericLiteralLike(node) &&
		node.Parent.Kind == KindComputedPropertyName &&
		IsDeclaration(node.Parent.Parent)
}

func IsExternalModuleImportEqualsDeclaration(node *Node) bool {
	return node.Kind == KindImportEqualsDeclaration && node.AsImportEqualsDeclaration().ModuleReference.Kind == KindExternalModuleReference
}

func IsLiteralImportTypeNode(node *Node) bool {
	return IsImportTypeNode(node) && IsLiteralTypeNode(node.AsImportTypeNode().Argument) && IsStringLiteral(node.AsImportTypeNode().Argument.AsLiteralTypeNode().Literal)
}

func IsJsxTagName(node *Node) bool {
	parent := node.Parent
	switch parent.Kind {
	case KindJsxOpeningElement, KindJsxClosingElement, KindJsxSelfClosingElement:
		return parent.TagName() == node
	}
	return false
}

func IsImportOrExportSpecifier(node *Node) bool {
	return IsImportSpecifier(node) || IsExportSpecifier(node)
}

func isVoidZero(node *Node) bool {
	return IsVoidExpression(node) && IsNumericLiteral(node.Expression()) && node.Expression().Text() == "0"
}

func IsVoidExpression(node *Node) bool {
	return node.Kind == KindVoidExpression
}

func IsExportsIdentifier(node *Node) bool {
	return IsIdentifier(node) && node.Text() == "exports"
}

func IsModuleIdentifier(node *Node) bool {
	return IsIdentifier(node) && node.Text() == "module"
}

// Does not handle signed numeric names like `a[+0]` - handling those would require handling prefix unary expressions
// throughout late binding handling as well, which is awkward (but ultimately probably doable if there is demand)
func GetElementOrPropertyAccessArgumentExpressionOrName(node *Node) *Node {
	switch node.Kind {
	case KindPropertyAccessExpression:
		return node.Name()
	case KindElementAccessExpression:
		arg := SkipParentheses(node.AsElementAccessExpression().ArgumentExpression)
		if IsStringOrNumericLiteralLike(arg) {
			return arg
		}
		return node
	}
	panic("Unhandled case in GetElementOrPropertyAccessArgumentExpressionOrName")
}

func IsExpressionWithTypeArgumentsInClassExtendsClause(node *Node) bool {
	return TryGetClassExtendingExpressionWithTypeArguments(node) != nil
}

func TryGetClassExtendingExpressionWithTypeArguments(node *Node) *ClassLikeDeclaration {
	cls, isImplements := TryGetClassImplementingOrExtendingExpressionWithTypeArguments(node)
	if cls != nil && !isImplements {
		return cls
	}
	return nil
}

func TryGetClassImplementingOrExtendingExpressionWithTypeArguments(node *Node) (class *ClassLikeDeclaration, isImplements bool) {
	if IsExpressionWithTypeArguments(node) {
		if IsHeritageClause(node.Parent) && IsClassLike(node.Parent.Parent) {
			return node.Parent.Parent, node.Parent.AsHeritageClause().Token == KindImplementsKeyword
		}
	}
	return nil, false
}

func GetNameOfDeclaration(declaration *Node) *Node {
	if declaration == nil {
		return nil
	}
	nonAssignedName := getNonAssignedNameOfDeclaration(declaration)
	if nonAssignedName != nil {
		return nonAssignedName
	}
	if IsFunctionExpression(declaration) || IsArrowFunction(declaration) || IsClassExpression(declaration) {
		return getAssignedName(declaration)
	}
	return nil
}

func getNonAssignedNameOfDeclaration(declaration *Node) *Node {
	switch declaration.Kind {
	case KindBinaryExpression:
		if isFunctionPropertyAssignment(declaration) {
			return getElementOrPropertyAccessArgumentExpressionOrName(declaration.AsBinaryExpression().Left)
		}
		return nil
	case KindExportAssignment:
		expr := declaration.AsExportAssignment().Expression
		if IsIdentifier(expr) {
			return expr
		}
		return nil
	}
	return declaration.Name()
}

func getAssignedName(node *Node) *Node {
	parent := node.Parent
	if parent != nil {
		switch parent.Kind {
		case KindPropertyAssignment:
			return parent.AsPropertyAssignment().Name()
		case KindBindingElement:
			return parent.AsBindingElement().Name()
		case KindBinaryExpression:
			if node == parent.AsBinaryExpression().Right {
				left := parent.AsBinaryExpression().Left
				switch left.Kind {
				case KindIdentifier:
					return left
				case KindPropertyAccessExpression:
					return left.AsPropertyAccessExpression().Name()
				case KindElementAccessExpression:
					arg := SkipParentheses(left.AsElementAccessExpression().ArgumentExpression)
					if IsStringOrNumericLiteralLike(arg) {
						return arg
					}
				}
			}
		case KindVariableDeclaration:
			name := parent.AsVariableDeclaration().Name()
			if IsIdentifier(name) {
				return name
			}
		}
	}
	return nil
}

func isFunctionPropertyAssignment(node *Node) bool {
	if node.Kind == KindBinaryExpression {
		expr := node.AsBinaryExpression()
		if expr.OperatorToken.Kind == KindEqualsToken {
			switch expr.Left.Kind {
			case KindPropertyAccessExpression:
				// F.id = expr
				return IsIdentifier(expr.Left.Expression()) && IsIdentifier(expr.Left.Name())
			case KindElementAccessExpression:
				// F[xxx] = expr
				return IsIdentifier(expr.Left.Expression())
			}
		}
	}
	return false
}

// Does not handle signed numeric names like `a[+0]` - handling those would require handling prefix unary expressions
// throughout late binding handling as well, which is awkward (but ultimately probably doable if there is demand)
func getElementOrPropertyAccessArgumentExpressionOrName(node *Node) *Node {
	switch node.Kind {
	case KindPropertyAccessExpression:
		return node.Name()
	case KindElementAccessExpression:
		arg := SkipParentheses(node.AsElementAccessExpression().ArgumentExpression)
		if IsStringOrNumericLiteralLike(arg) {
			return arg
		}
		return node
	}
	panic("Unhandled case in getElementOrPropertyAccessArgumentExpressionOrName")
}

/**
 * A declaration has a dynamic name if all of the following are true:
 *   1. The declaration has a computed property name.
 *   2. The computed name is *not* expressed as a StringLiteral.
 *   3. The computed name is *not* expressed as a NumericLiteral.
 *   4. The computed name is *not* expressed as a PlusToken or MinusToken
 *      immediately followed by a NumericLiteral.
 */
func HasDynamicName(declaration *Node) bool {
	name := GetNameOfDeclaration(declaration)
	return name != nil && IsDynamicName(name)
}

func IsDynamicName(name *Node) bool {
	var expr *Node
	switch name.Kind {
	case KindComputedPropertyName:
		expr = name.AsComputedPropertyName().Expression
	case KindElementAccessExpression:
		expr = SkipParentheses(name.AsElementAccessExpression().ArgumentExpression)
	default:
		return false
	}
	return !IsStringOrNumericLiteralLike(expr) && !IsSignedNumericLiteral(expr)
}

func IsEntityNameExpression(node *Node) bool {
	return node.Kind == KindIdentifier || isPropertyAccessEntityNameExpression(node)
}

func isPropertyAccessEntityNameExpression(node *Node) bool {
	if node.Kind == KindPropertyAccessExpression {
		expr := node.AsPropertyAccessExpression()
		return expr.Name().Kind == KindIdentifier && IsEntityNameExpression(expr.Expression)
	}
	return false
}

func IsDottedName(node *Node) bool {
	switch node.Kind {
	case KindIdentifier, KindThisKeyword, KindSuperKeyword, KindMetaProperty:
		return true
	case KindPropertyAccessExpression, KindParenthesizedExpression:
		return IsDottedName(node.Expression())
	}
	return false
}

func IsAmbientModule(node *Node) bool {
	return IsModuleDeclaration(node) && (node.AsModuleDeclaration().Name().Kind == KindStringLiteral || IsGlobalScopeAugmentation(node))
}

func IsExternalModule(file *SourceFile) bool {
	return file.ExternalModuleIndicator != nil
}

func IsExternalOrCommonJsModule(file *SourceFile) bool {
	return file.ExternalModuleIndicator != nil || file.CommonJsModuleIndicator != nil
}

func IsGlobalScopeAugmentation(node *Node) bool {
	return node.Flags&NodeFlagsGlobalAugmentation != 0
}

func IsModuleAugmentationExternal(node *Node) bool {
	// external module augmentation is a ambient module declaration that is either:
	// - defined in the top level scope and source file is an external module
	// - defined inside ambient module declaration located in the top level scope and source file not an external module
	switch node.Parent.Kind {
	case KindSourceFile:
		return IsExternalModule(node.Parent.AsSourceFile())
	case KindModuleBlock:
		grandParent := node.Parent.Parent
		return IsAmbientModule(grandParent) && IsSourceFile(grandParent.Parent) && !IsExternalModule(grandParent.Parent.AsSourceFile())
	}
	return false
}

func GetContainingClass(node *Node) *Node {
	return FindAncestor(node.Parent, IsClassLike)
}

func IsPartOfTypeQuery(node *Node) bool {
	for node.Kind == KindQualifiedName || node.Kind == KindIdentifier {
		node = node.Parent
	}
	return node.Kind == KindTypeQuery
}

/**
 * This function returns true if the this node's root declaration is a parameter.
 * For example, passing a `ParameterDeclaration` will return true, as will passing a
 * binding element that is a child of a `ParameterDeclaration`.
 *
 * If you are looking to test that a `Node` is a `ParameterDeclaration`, use `isParameter`.
 */
func IsPartOfParameterDeclaration(node *Node) bool {
	return GetRootDeclaration(node).Kind == KindParameter
}

func IsInTopLevelContext(node *Node) bool {
	// The name of a class or function declaration is a BindingIdentifier in its surrounding scope.
	if IsIdentifier(node) {
		parent := node.Parent
		if (IsClassDeclaration(parent) || IsFunctionDeclaration(parent)) && parent.Name() == node {
			node = parent
		}
	}
	container := GetThisContainer(node, true /*includeArrowFunctions*/, false /*includeClassComputedPropertyName*/)
	return IsSourceFile(container)
}

func GetThisContainer(node *Node, includeArrowFunctions bool, includeClassComputedPropertyName bool) *Node {
	for {
		node = node.Parent
		if node == nil {
			panic("nil parent in getThisContainer")
		}
		switch node.Kind {
		case KindComputedPropertyName:
			if includeClassComputedPropertyName && IsClassLike(node.Parent.Parent) {
				return node
			}
			node = node.Parent.Parent
		case KindDecorator:
			if node.Parent.Kind == KindParameter && IsClassElement(node.Parent.Parent) {
				// If the decorator's parent is a Parameter, we resolve the this container from
				// the grandparent class declaration.
				node = node.Parent.Parent
			} else if IsClassElement(node.Parent) {
				// If the decorator's parent is a class element, we resolve the 'this' container
				// from the parent class declaration.
				node = node.Parent
			}
		case KindArrowFunction:
			if includeArrowFunctions {
				return node
			}
		case KindFunctionDeclaration, KindFunctionExpression, KindModuleDeclaration, KindClassStaticBlockDeclaration,
			KindPropertyDeclaration, KindPropertySignature, KindMethodDeclaration, KindMethodSignature, KindConstructor,
			KindGetAccessor, KindSetAccessor, KindCallSignature, KindConstructSignature, KindIndexSignature,
			KindEnumDeclaration, KindSourceFile:
			return node
		}
	}
}

func GetImmediatelyInvokedFunctionExpression(fn *Node) *Node {
	if IsFunctionExpressionOrArrowFunction(fn) {
		prev := fn
		parent := fn.Parent
		for IsParenthesizedExpression(parent) {
			prev = parent
			parent = parent.Parent
		}
		if IsCallExpression(parent) && parent.AsCallExpression().Expression == prev {
			return parent
		}
	}
	return nil
}

func IsEnumConst(node *Node) bool {
	return GetCombinedModifierFlags(node)&ModifierFlagsConst != 0
}

func ExportAssignmentIsAlias(node *Node) bool {
	return isAliasableExpression(getExportAssignmentExpression(node))
}

func getExportAssignmentExpression(node *Node) *Node {
	switch node.Kind {
	case KindExportAssignment:
		return node.AsExportAssignment().Expression
	case KindBinaryExpression:
		return node.AsBinaryExpression().Right
	}
	panic("Unhandled case in getExportAssignmentExpression")
}

func isAliasableExpression(e *Node) bool {
	return IsEntityNameExpression(e) || IsClassExpression(e)
}
