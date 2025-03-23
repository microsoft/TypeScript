package ast

import (
	"slices"
	"strings"
	"sync"
	"sync/atomic"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tspath"
)

// Atomic ids

var (
	nextNodeId   atomic.Uint64
	nextSymbolId atomic.Uint64
)

func GetNodeId(node *Node) NodeId {
	id := node.id.Load()
	if id == 0 {
		// Worst case, we burn a few ids if we have to CAS.
		id = nextNodeId.Add(1)
		if !node.id.CompareAndSwap(0, id) {
			id = node.id.Load()
		}
	}
	return NodeId(id)
}

func GetSymbolId(symbol *Symbol) SymbolId {
	id := symbol.id.Load()
	if id == 0 {
		// Worst case, we burn a few ids if we have to CAS.
		id = nextSymbolId.Add(1)
		if !symbol.id.CompareAndSwap(0, id) {
			id = symbol.id.Load()
		}
	}
	return SymbolId(id)
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

func FindLastVisibleNode(nodes []*Node) *Node {
	fromEnd := 1
	for fromEnd <= len(nodes) && nodes[len(nodes)-fromEnd].Flags&NodeFlagsReparsed != 0 {
		fromEnd++
	}
	if fromEnd <= len(nodes) {
		return nodes[len(nodes)-fromEnd]
	}
	return nil
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

func IsLogicalBinaryOperator(token Kind) bool {
	return token == KindBarBarToken || token == KindAmpersandAmpersandToken
}

func IsLogicalOrCoalescingBinaryOperator(token Kind) bool {
	return IsLogicalBinaryOperator(token) || token == KindQuestionQuestionToken
}

func IsLogicalOrCoalescingBinaryExpression(expr *Node) bool {
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
			return IsLogicalOrCoalescingBinaryExpression(node)
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
		KindJSDocNullableType,
		KindJSDocNonNullableType,
		KindJSDocOptionalType,
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
	case KindPartiallyEmittedExpression:
		return kinds&OEKPartiallyEmittedExpressions != 0
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
	for node != nil {
		if node.Kind == KindSourceFile {
			return node.AsSourceFile()
		}
		node = node.Parent
	}
	return nil
}

var setParentInChildrenPool = sync.Pool{
	New: func() any {
		return newParentInChildrenSetter()
	},
}

func newParentInChildrenSetter() func(node *Node) bool {
	// Consolidate state into one allocation.
	// Similar to https://go.dev/cl/552375.
	var state struct {
		parent *Node
		visit  func(*Node) bool
	}

	state.visit = func(node *Node) bool {
		if state.parent != nil {
			node.Parent = state.parent
		}
		saveParent := state.parent
		state.parent = node
		node.ForEachChild(state.visit)
		state.parent = saveParent
		return false
	}

	return state.visit
}

func SetParentInChildren(node *Node) {
	fn := setParentInChildrenPool.Get().(func(node *Node) bool)
	defer setParentInChildrenPool.Put(fn)
	fn(node)
}

// Walks up the parents of a node to find the ancestor that matches the callback
func FindAncestor(node *Node, callback func(*Node) bool) *Node {
	for node != nil {
		if callback(node) {
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

func IsNodeDescendantOf(node *Node, ancestor *Node) bool {
	for node != nil {
		if node == ancestor {
			return true
		}
		node = node.Parent
	}
	return false
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
	return !IsSourceFile(name) && !IsBindingPattern(name) && IsDeclaration(name.Parent) && name.Parent.Name() == name
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

func IsThisIdentifier(node *Node) bool {
	return IsIdentifier(node) && node.Text() == "this"
}

func IsThisParameter(node *Node) bool {
	return IsParameter(node) && node.Name() != nil && IsThisIdentifier(node.Name())
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

func GetElementOrPropertyAccessName(node *Node) string {
	name := getElementOrPropertyAccessArgumentExpressionOrName(node)
	if name == nil {
		return ""
	}
	return name.Text()
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
	nonAssignedName := GetNonAssignedNameOfDeclaration(declaration)
	if nonAssignedName != nil {
		return nonAssignedName
	}
	if IsFunctionExpression(declaration) || IsArrowFunction(declaration) || IsClassExpression(declaration) {
		return getAssignedName(declaration)
	}
	return nil
}

func GetNonAssignedNameOfDeclaration(declaration *Node) *Node {
	// !!!
	switch declaration.Kind {
	case KindBinaryExpression:
		if IsFunctionPropertyAssignment(declaration) {
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

func IsFunctionPropertyAssignment(node *Node) bool {
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

// TODO: Should we deprecate `IsExternalOrCommonJsModule` in favor of this function?
func IsEffectiveExternalModule(node *SourceFile, compilerOptions *core.CompilerOptions) bool {
	return IsExternalModule(node) || (isCommonJSContainingModuleKind(compilerOptions.GetEmitModuleKind()) && node.CommonJsModuleIndicator != nil)
}

func IsEffectiveExternalModuleWorker(node *SourceFile, moduleKind core.ModuleKind) bool {
	return IsExternalModule(node) || (isCommonJSContainingModuleKind(moduleKind) && node.CommonJsModuleIndicator != nil)
}

func isCommonJSContainingModuleKind(kind core.ModuleKind) bool {
	return kind == core.ModuleKindCommonJS || kind == core.ModuleKindNode16 || kind == core.ModuleKindNodeNext
}

func IsExternalModuleIndicator(node *Statement) bool {
	return HasSyntacticModifier(node, ModifierFlagsExport) ||
		IsImportEqualsDeclaration(node) && IsExternalModuleReference(node.AsImportEqualsDeclaration().ModuleReference) ||
		IsImportDeclaration(node) || IsExportAssignment(node) || IsExportDeclaration(node)
}

func IsExportNamespaceAsDefaultDeclaration(node *Node) bool {
	if IsExportDeclaration(node) {
		decl := node.AsExportDeclaration()
		return IsNamespaceExport(decl.ExportClause) && ModuleExportNameIsDefault(decl.ExportClause.Name())
	}
	return false
}

func IsGlobalScopeAugmentation(node *Node) bool {
	return IsModuleDeclaration(node) && node.AsModuleDeclaration().Keyword == KindGlobalKeyword
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

func GetExtendsHeritageClauseElement(node *Node) *ExpressionWithTypeArgumentsNode {
	return core.FirstOrNil(GetExtendsHeritageClauseElements(node))
}

func GetExtendsHeritageClauseElements(node *Node) []*ExpressionWithTypeArgumentsNode {
	return getHeritageElements(node, KindExtendsKeyword)
}

func GetImplementsHeritageClauseElements(node *Node) []*ExpressionWithTypeArgumentsNode {
	return getHeritageElements(node, KindImplementsKeyword)
}

func getHeritageElements(node *Node, kind Kind) []*Node {
	clause := getHeritageClause(node, kind)
	if clause != nil {
		return clause.AsHeritageClause().Types.Nodes
	}
	return nil
}

func getHeritageClause(node *Node, kind Kind) *Node {
	clauses := getHeritageClauses(node)
	if clauses != nil {
		for _, clause := range clauses.Nodes {
			if clause.AsHeritageClause().Token == kind {
				return clause
			}
		}
	}
	return nil
}

func getHeritageClauses(node *Node) *NodeList {
	switch node.Kind {
	case KindClassDeclaration:
		return node.AsClassDeclaration().HeritageClauses
	case KindClassExpression:
		return node.AsClassExpression().HeritageClauses
	case KindInterfaceDeclaration:
		return node.AsInterfaceDeclaration().HeritageClauses
	}
	return nil
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

func IsInstanceOfExpression(node *Node) bool {
	return IsBinaryExpression(node) && node.AsBinaryExpression().OperatorToken.Kind == KindInstanceOfKeyword
}

func IsAnyImportOrReExport(node *Node) bool {
	return IsAnyImportSyntax(node) || IsExportDeclaration(node)
}

func IsAnyImportSyntax(node *Node) bool {
	return NodeKindIs(node, KindImportDeclaration, KindImportEqualsDeclaration)
}

func IsJsonSourceFile(file *SourceFile) bool {
	return file.ScriptKind == core.ScriptKindJSON
}

func GetExternalModuleName(node *Node) *Expression {
	switch node.Kind {
	case KindImportDeclaration:
		return node.AsImportDeclaration().ModuleSpecifier
	case KindExportDeclaration:
		return node.AsExportDeclaration().ModuleSpecifier
	case KindJSDocImportTag:
		return node.AsJSDocImportTag().ModuleSpecifier
	case KindImportEqualsDeclaration:
		if node.AsImportEqualsDeclaration().ModuleReference.Kind == KindExternalModuleReference {
			return node.AsImportEqualsDeclaration().ModuleReference.AsExternalModuleReference().Expression
		}
		return nil
	case KindImportType:
		return getImportTypeNodeLiteral(node)
	case KindCallExpression:
		return core.FirstOrNil(node.AsCallExpression().Arguments.Nodes)
	case KindModuleDeclaration:
		if IsStringLiteral(node.AsModuleDeclaration().Name()) {
			return node.AsModuleDeclaration().Name()
		}
		return nil
	}
	panic("Unhandled case in getExternalModuleName")
}

func GetImportAttributes(node *Node) *Node {
	switch node.Kind {
	case KindImportDeclaration:
		return node.AsImportDeclaration().Attributes
	case KindExportDeclaration:
		return node.AsExportDeclaration().Attributes
	}
	panic("Unhandled case in getImportAttributes")
}

func getImportTypeNodeLiteral(node *Node) *Node {
	if IsImportTypeNode(node) {
		importTypeNode := node.AsImportTypeNode()
		if IsLiteralTypeNode(importTypeNode.Argument) {
			literalTypeNode := importTypeNode.Argument.AsLiteralTypeNode()
			if IsStringLiteral(literalTypeNode.Literal) {
				return literalTypeNode.Literal
			}
		}
	}
	return nil
}

func IsExpressionNode(node *Node) bool {
	switch node.Kind {
	case KindSuperKeyword, KindNullKeyword, KindTrueKeyword, KindFalseKeyword, KindRegularExpressionLiteral,
		KindArrayLiteralExpression, KindObjectLiteralExpression, KindPropertyAccessExpression, KindElementAccessExpression,
		KindCallExpression, KindNewExpression, KindTaggedTemplateExpression, KindAsExpression, KindTypeAssertionExpression,
		KindSatisfiesExpression, KindNonNullExpression, KindParenthesizedExpression, KindFunctionExpression,
		KindClassExpression, KindArrowFunction, KindVoidExpression, KindDeleteExpression, KindTypeOfExpression,
		KindPrefixUnaryExpression, KindPostfixUnaryExpression, KindBinaryExpression, KindConditionalExpression,
		KindSpreadElement, KindTemplateExpression, KindOmittedExpression, KindJsxElement, KindJsxSelfClosingElement,
		KindJsxFragment, KindYieldExpression, KindAwaitExpression, KindMetaProperty:
		return true
	case KindExpressionWithTypeArguments:
		return !IsHeritageClause(node.Parent)
	case KindQualifiedName:
		for node.Parent.Kind == KindQualifiedName {
			node = node.Parent
		}
		return IsTypeQueryNode(node.Parent) || isJSDocLinkLike(node.Parent) || isJSXTagName(node)
	case KindJSDocMemberName:
		return IsTypeQueryNode(node.Parent) || isJSDocLinkLike(node.Parent) || isJSXTagName(node)
	case KindPrivateIdentifier:
		return IsBinaryExpression(node.Parent) && node.Parent.AsBinaryExpression().Left == node && node.Parent.AsBinaryExpression().OperatorToken.Kind == KindInKeyword
	case KindIdentifier:
		if IsTypeQueryNode(node.Parent) || isJSDocLinkLike(node.Parent) || isJSXTagName(node) {
			return true
		}
		fallthrough
	case KindNumericLiteral, KindBigIntLiteral, KindStringLiteral, KindNoSubstitutionTemplateLiteral, KindThisKeyword:
		return IsInExpressionContext(node)
	default:
		return false
	}
}

func IsInExpressionContext(node *Node) bool {
	parent := node.Parent
	switch parent.Kind {
	case KindVariableDeclaration:
		return parent.AsVariableDeclaration().Initializer == node
	case KindParameter:
		return parent.AsParameterDeclaration().Initializer == node
	case KindPropertyDeclaration:
		return parent.AsPropertyDeclaration().Initializer == node
	case KindPropertySignature:
		return parent.AsPropertySignatureDeclaration().Initializer == node
	case KindEnumMember:
		return parent.AsEnumMember().Initializer == node
	case KindPropertyAssignment:
		return parent.AsPropertyAssignment().Initializer == node
	case KindBindingElement:
		return parent.AsBindingElement().Initializer == node
	case KindExpressionStatement:
		return parent.AsExpressionStatement().Expression == node
	case KindIfStatement:
		return parent.AsIfStatement().Expression == node
	case KindDoStatement:
		return parent.AsDoStatement().Expression == node
	case KindWhileStatement:
		return parent.AsWhileStatement().Expression == node
	case KindReturnStatement:
		return parent.AsReturnStatement().Expression == node
	case KindWithStatement:
		return parent.AsWithStatement().Expression == node
	case KindSwitchStatement:
		return parent.AsSwitchStatement().Expression == node
	case KindCaseClause, KindDefaultClause:
		return parent.AsCaseOrDefaultClause().Expression == node
	case KindThrowStatement:
		return parent.AsThrowStatement().Expression == node
	case KindForStatement:
		s := parent.AsForStatement()
		return s.Initializer == node && s.Initializer.Kind != KindVariableDeclarationList || s.Condition == node || s.Incrementor == node
	case KindForInStatement, KindForOfStatement:
		s := parent.AsForInOrOfStatement()
		return s.Initializer == node && s.Initializer.Kind != KindVariableDeclarationList || s.Expression == node
	case KindTypeAssertionExpression:
		return parent.AsTypeAssertion().Expression == node
	case KindAsExpression:
		return parent.AsAsExpression().Expression == node
	case KindTemplateSpan:
		return parent.AsTemplateSpan().Expression == node
	case KindComputedPropertyName:
		return parent.AsComputedPropertyName().Expression == node
	case KindDecorator, KindJsxExpression, KindJsxSpreadAttribute, KindSpreadAssignment:
		return true
	case KindExpressionWithTypeArguments:
		return parent.AsExpressionWithTypeArguments().Expression == node && !IsPartOfTypeNode(parent)
	case KindShorthandPropertyAssignment:
		return parent.AsShorthandPropertyAssignment().ObjectAssignmentInitializer == node
	case KindSatisfiesExpression:
		return parent.AsSatisfiesExpression().Expression == node
	default:
		return IsExpressionNode(parent)
	}
}

func IsPartOfTypeNode(node *Node) bool {
	kind := node.Kind
	if kind >= KindFirstTypeNode && kind <= KindLastTypeNode {
		return true
	}
	switch node.Kind {
	case KindAnyKeyword, KindUnknownKeyword, KindNumberKeyword, KindBigIntKeyword, KindStringKeyword,
		KindBooleanKeyword, KindSymbolKeyword, KindObjectKeyword, KindUndefinedKeyword, KindNullKeyword,
		KindNeverKeyword:
		return true
	case KindExpressionWithTypeArguments:
		return isPartOfTypeExpressionWithTypeArguments(node)
	case KindTypeParameter:
		return node.Parent.Kind == KindMappedType || node.Parent.Kind == KindInferType
	case KindIdentifier:
		parent := node.Parent
		if IsQualifiedName(parent) && parent.AsQualifiedName().Right == node {
			return isPartOfTypeNodeInParent(parent)
		}
		if IsPropertyAccessExpression(parent) && parent.AsPropertyAccessExpression().Name() == node {
			return isPartOfTypeNodeInParent(parent)
		}
		return isPartOfTypeNodeInParent(node)
	case KindQualifiedName, KindPropertyAccessExpression, KindThisKeyword:
		return isPartOfTypeNodeInParent(node)
	}
	return false
}

func isPartOfTypeNodeInParent(node *Node) bool {
	parent := node.Parent
	if parent.Kind == KindTypeQuery {
		return false
	}
	if parent.Kind == KindImportType {
		return !parent.AsImportTypeNode().IsTypeOf
	}

	// Do not recursively call isPartOfTypeNode on the parent. In the example:
	//
	//     let a: A.B.C;
	//
	// Calling isPartOfTypeNode would consider the qualified name A.B a type node.
	// Only C and A.B.C are type nodes.
	if parent.Kind >= KindFirstTypeNode && parent.Kind <= KindLastTypeNode {
		return true
	}
	switch parent.Kind {
	case KindExpressionWithTypeArguments:
		return isPartOfTypeExpressionWithTypeArguments(parent)
	case KindTypeParameter:
		return node == parent.AsTypeParameter().Constraint
	case KindVariableDeclaration, KindParameter, KindPropertyDeclaration, KindPropertySignature, KindFunctionDeclaration,
		KindFunctionExpression, KindArrowFunction, KindConstructor, KindMethodDeclaration, KindMethodSignature,
		KindGetAccessor, KindSetAccessor, KindCallSignature, KindConstructSignature, KindIndexSignature,
		KindTypeAssertionExpression:
		return node == parent.Type()
	case KindCallExpression, KindNewExpression, KindTaggedTemplateExpression:
		return slices.Contains(parent.TypeArguments(), node)
	}
	return false
}

func isPartOfTypeExpressionWithTypeArguments(node *Node) bool {
	parent := node.Parent
	return IsHeritageClause(parent) && (!IsClassLike(parent.Parent) || parent.AsHeritageClause().Token == KindImplementsKeyword)
}

func isJSDocLinkLike(node *Node) bool {
	return NodeKindIs(node, KindJSDocLink, KindJSDocLinkCode, KindJSDocLinkPlain)
}

func IsJSDocTag(node *Node) bool {
	return node.Kind >= KindFirstJSDocTagNode && node.Kind <= KindLastJSDocTagNode
}

func isJSXTagName(node *Node) bool {
	parent := node.Parent
	switch parent.Kind {
	case KindJsxOpeningElement:
		return parent.AsJsxOpeningElement().TagName == node
	case KindJsxSelfClosingElement:
		return parent.AsJsxSelfClosingElement().TagName == node
	case KindJsxClosingElement:
		return parent.AsJsxClosingElement().TagName == node
	}
	return false
}

func IsSuperCall(node *Node) bool {
	return IsCallExpression(node) && node.AsCallExpression().Expression.Kind == KindSuperKeyword
}

func IsImportCall(node *Node) bool {
	return IsCallExpression(node) && node.AsCallExpression().Expression.Kind == KindImportKeyword
}

func IsComputedNonLiteralName(name *Node) bool {
	return IsComputedPropertyName(name) && !IsStringOrNumericLiteralLike(name.Expression())
}

func IsQuestionToken(node *Node) bool {
	return node != nil && node.Kind == KindQuestionToken
}

func GetTextOfPropertyName(name *Node) string {
	text, _ := TryGetTextOfPropertyName(name)
	return text
}

func TryGetTextOfPropertyName(name *Node) (string, bool) {
	switch name.Kind {
	case KindIdentifier, KindPrivateIdentifier, KindStringLiteral, KindNumericLiteral, KindBigIntLiteral,
		KindNoSubstitutionTemplateLiteral:
		return name.Text(), true
	case KindComputedPropertyName:
		if IsStringOrNumericLiteralLike(name.Expression()) {
			return name.Expression().Text(), true
		}
	case KindJsxNamespacedName:
		return name.AsJsxNamespacedName().Namespace.Text() + ":" + name.Name().Text(), true
	}
	return "", false
}

func IsJSDocCommentContainingNode(node *Node) bool {
	return node.Kind == KindJSDoc ||
		node.Kind == KindJSDocText ||
		node.Kind == KindJSDocTypeLiteral ||
		node.Kind == KindJSDocSignature ||
		isJSDocLinkLike(node) ||
		IsJSDocTag(node)
}

func IsJSDocNode(node *Node) bool {
	return node.Kind >= KindFirstJSDocNode && node.Kind <= KindLastJSDocNode
}

func IsNonWhitespaceToken(node *Node) bool {
	return IsTokenKind(node.Kind) && !IsWhitespaceOnlyJsxText(node)
}

func IsWhitespaceOnlyJsxText(node *Node) bool {
	return node.Kind == KindJsxText && node.AsJsxText().ContainsOnlyTriviaWhiteSpaces
}

func GetNewTargetContainer(node *Node) *Node {
	container := GetThisContainer(node, false /*includeArrowFunctions*/, false /*includeClassComputedPropertyName*/)
	if container != nil {
		switch container.Kind {
		case KindConstructor, KindFunctionDeclaration, KindFunctionExpression:
			return container
		}
	}
	return nil
}

func GetEnclosingBlockScopeContainer(node *Node) *Node {
	return FindAncestor(node.Parent, func(current *Node) bool {
		return IsBlockScope(current, current.Parent)
	})
}

func IsBlockScope(node *Node, parentNode *Node) bool {
	switch node.Kind {
	case KindSourceFile, KindCaseBlock, KindCatchClause, KindModuleDeclaration, KindForStatement, KindForInStatement, KindForOfStatement,
		KindConstructor, KindMethodDeclaration, KindGetAccessor, KindSetAccessor, KindFunctionDeclaration, KindFunctionExpression,
		KindArrowFunction, KindPropertyDeclaration, KindClassStaticBlockDeclaration:
		return true
	case KindBlock:
		// function block is not considered block-scope container
		// see comment in binder.ts: bind(...), case for SyntaxKind.Block
		return !IsFunctionLikeOrClassStaticBlockDeclaration(parentNode)
	}
	return false
}

type SemanticMeaning int32

const (
	SemanticMeaningNone      SemanticMeaning = 0
	SemanticMeaningValue     SemanticMeaning = 1 << 0
	SemanticMeaningType      SemanticMeaning = 1 << 1
	SemanticMeaningNamespace SemanticMeaning = 1 << 2
	SemanticMeaningAll       SemanticMeaning = SemanticMeaningValue | SemanticMeaningType | SemanticMeaningNamespace
)

func GetMeaningFromDeclaration(node *Node) SemanticMeaning {
	switch node.Kind {
	case KindVariableDeclaration:
		return SemanticMeaningValue
	case KindParameter,
		KindBindingElement,
		KindPropertyDeclaration,
		KindPropertySignature,
		KindPropertyAssignment,
		KindShorthandPropertyAssignment,
		KindMethodDeclaration,
		KindMethodSignature,
		KindConstructor,
		KindGetAccessor,
		KindSetAccessor,
		KindFunctionDeclaration,
		KindFunctionExpression,
		KindArrowFunction,
		KindCatchClause,
		KindJsxAttribute:
		return SemanticMeaningValue

	case KindTypeParameter,
		KindInterfaceDeclaration,
		KindTypeAliasDeclaration,
		KindTypeLiteral:
		return SemanticMeaningType
	case KindEnumMember, KindClassDeclaration:
		return SemanticMeaningValue | SemanticMeaningType

	case KindModuleDeclaration:
		if IsAmbientModule(node) {
			return SemanticMeaningNamespace | SemanticMeaningValue
		} else if GetModuleInstanceState(node) == ModuleInstanceStateInstantiated {
			return SemanticMeaningNamespace | SemanticMeaningValue
		} else {
			return SemanticMeaningNamespace
		}

	case KindEnumDeclaration,
		KindNamedImports,
		KindImportSpecifier,
		KindImportEqualsDeclaration,
		KindImportDeclaration,
		KindExportAssignment,
		KindExportDeclaration:
		return SemanticMeaningAll

	// An external module can be a Value
	case KindSourceFile:
		return SemanticMeaningNamespace | SemanticMeaningValue
	}

	return SemanticMeaningAll
}

func IsPropertyAccessOrQualifiedName(node *Node) bool {
	return node.Kind == KindPropertyAccessExpression || node.Kind == KindQualifiedName
}

func IsLabelName(node *Node) bool {
	return IsLabelOfLabeledStatement(node) || IsJumpStatementTarget(node)
}

func IsLabelOfLabeledStatement(node *Node) bool {
	if !IsIdentifier(node) {
		return false
	}
	if !IsLabeledStatement(node.Parent) {
		return false
	}
	return node == node.Parent.Label()
}

func IsJumpStatementTarget(node *Node) bool {
	if !IsIdentifier(node) {
		return false
	}
	if !IsBreakOrContinueStatement(node.Parent) {
		return false
	}
	return node == node.Parent.Label()
}

func IsBreakOrContinueStatement(node *Node) bool {
	return NodeKindIs(node, KindBreakStatement, KindContinueStatement)
}

// GetModuleInstanceState is used during binding as well as in transformations and tests, and therefore may be invoked
// with a node that does not yet have its `Parent` pointer set. In this case, an `ancestors` represents a stack of
// virtual `Parent` pointers that can be used to walk up the tree. Since `getModuleInstanceStateForAliasTarget` may
// potentially walk up out of the provided `Node`, merely setting the parent pointers for a given `ModuleDeclaration`
// prior to invoking `GetModuleInstanceState` is not sufficient. It is, however, necessary that the `Parent` pointers
// for all ancestors of the `Node` provided to `GetModuleInstanceState` have been set.

// Push a virtual parent pointer onto `ancestors` and return it.
func pushAncestor(ancestors []*Node, parent *Node) []*Node {
	return append(ancestors, parent)
}

// If a virtual `Parent` exists on the stack, returns the previous stack entry and the virtual `Parent“.
// Otherwise, we return `nil` and the value of `node.Parent`.
func popAncestor(ancestors []*Node, node *Node) ([]*Node, *Node) {
	if len(ancestors) == 0 {
		return nil, node.Parent
	}
	n := len(ancestors) - 1
	return ancestors[:n], ancestors[n]
}

type ModuleInstanceState int32

const (
	ModuleInstanceStateUnknown ModuleInstanceState = iota
	ModuleInstanceStateNonInstantiated
	ModuleInstanceStateInstantiated
	ModuleInstanceStateConstEnumOnly
)

func GetModuleInstanceState(node *Node) ModuleInstanceState {
	return getModuleInstanceState(node, nil, nil)
}

func getModuleInstanceState(node *Node, ancestors []*Node, visited map[NodeId]ModuleInstanceState) ModuleInstanceState {
	module := node.AsModuleDeclaration()
	if module.Body != nil {
		return getModuleInstanceStateCached(module.Body, pushAncestor(ancestors, node), visited)
	} else {
		return ModuleInstanceStateInstantiated
	}
}

func getModuleInstanceStateCached(node *Node, ancestors []*Node, visited map[NodeId]ModuleInstanceState) ModuleInstanceState {
	if visited == nil {
		visited = make(map[NodeId]ModuleInstanceState)
	}
	nodeId := GetNodeId(node)
	if cached, ok := visited[nodeId]; ok {
		if cached != ModuleInstanceStateUnknown {
			return cached
		}
		return ModuleInstanceStateNonInstantiated
	}
	visited[nodeId] = ModuleInstanceStateUnknown
	result := getModuleInstanceStateWorker(node, ancestors, visited)
	visited[nodeId] = result
	return result
}

func getModuleInstanceStateWorker(node *Node, ancestors []*Node, visited map[NodeId]ModuleInstanceState) ModuleInstanceState {
	// A module is uninstantiated if it contains only
	switch node.Kind {
	case KindInterfaceDeclaration, KindTypeAliasDeclaration:
		return ModuleInstanceStateNonInstantiated
	case KindEnumDeclaration:
		if IsEnumConst(node) {
			return ModuleInstanceStateConstEnumOnly
		}
	case KindImportDeclaration, KindImportEqualsDeclaration:
		if !HasSyntacticModifier(node, ModifierFlagsExport) {
			return ModuleInstanceStateNonInstantiated
		}
	case KindExportDeclaration:
		decl := node.AsExportDeclaration()
		if decl.ModuleSpecifier == nil && decl.ExportClause != nil && decl.ExportClause.Kind == KindNamedExports {
			state := ModuleInstanceStateNonInstantiated
			ancestors = pushAncestor(ancestors, node)
			ancestors = pushAncestor(ancestors, decl.ExportClause)
			for _, specifier := range decl.ExportClause.AsNamedExports().Elements.Nodes {
				specifierState := getModuleInstanceStateForAliasTarget(specifier, ancestors, visited)
				if specifierState > state {
					state = specifierState
				}
				if state == ModuleInstanceStateInstantiated {
					return state
				}
			}
			return state
		}
	case KindModuleBlock:
		state := ModuleInstanceStateNonInstantiated
		ancestors = pushAncestor(ancestors, node)
		node.ForEachChild(func(n *Node) bool {
			childState := getModuleInstanceStateCached(n, ancestors, visited)
			switch childState {
			case ModuleInstanceStateNonInstantiated:
				return false
			case ModuleInstanceStateConstEnumOnly:
				state = ModuleInstanceStateConstEnumOnly
				return false
			case ModuleInstanceStateInstantiated:
				state = ModuleInstanceStateInstantiated
				return true
			}
			panic("Unhandled case in getModuleInstanceStateWorker")
		})
		return state
	case KindModuleDeclaration:
		return getModuleInstanceState(node, ancestors, visited)
	}
	return ModuleInstanceStateInstantiated
}

func getModuleInstanceStateForAliasTarget(node *Node, ancestors []*Node, visited map[NodeId]ModuleInstanceState) ModuleInstanceState {
	spec := node.AsExportSpecifier()
	name := spec.PropertyName
	if name == nil {
		name = spec.Name()
	}
	if name.Kind != KindIdentifier {
		// Skip for invalid syntax like this: export { "x" }
		return ModuleInstanceStateInstantiated
	}
	for ancestors, p := popAncestor(ancestors, node); p != nil; ancestors, p = popAncestor(ancestors, p) {
		if IsBlock(p) || IsModuleBlock(p) || IsSourceFile(p) {
			statements := GetStatementsOfBlock(p)
			found := ModuleInstanceStateUnknown
			statementsAncestors := pushAncestor(ancestors, p)
			for _, statement := range statements.Nodes {
				if NodeHasName(statement, name) {
					state := getModuleInstanceStateCached(statement, statementsAncestors, visited)
					if found == ModuleInstanceStateUnknown || state > found {
						found = state
					}
					if found == ModuleInstanceStateInstantiated {
						return found
					}
					if statement.Kind == KindImportEqualsDeclaration {
						// Treat re-exports of import aliases as instantiated since they're ambiguous. This is consistent
						// with `export import x = mod.x` being treated as instantiated:
						//   import x = mod.x;
						//   export { x };
						found = ModuleInstanceStateInstantiated
					}
				}
			}
			if found != ModuleInstanceStateUnknown {
				return found
			}
		}
	}
	// Couldn't locate, assume could refer to a value
	return ModuleInstanceStateInstantiated
}

func NodeHasName(statement *Node, id *Node) bool {
	name := statement.Name()
	if name != nil {
		return IsIdentifier(name) && name.AsIdentifier().Text == id.AsIdentifier().Text
	}
	if IsVariableStatement(statement) {
		declarations := statement.AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes
		return core.Some(declarations, func(d *Node) bool { return NodeHasName(d, id) })
	}
	return false
}

func IsInternalModuleImportEqualsDeclaration(node *Node) bool {
	return IsImportEqualsDeclaration(node) && node.AsImportEqualsDeclaration().ModuleReference.Kind != KindExternalModuleReference
}

func GetAssertedTypeNode(node *Node) *Node {
	switch node.Kind {
	case KindAsExpression:
		return node.AsAsExpression().Type
	case KindSatisfiesExpression:
		return node.AsSatisfiesExpression().Type
	case KindTypeAssertionExpression:
		return node.AsTypeAssertion().Type
	}
	panic("Unhandled case in getAssertedTypeNode")
}

func IsConstAssertion(node *Node) bool {
	switch node.Kind {
	case KindAsExpression, KindTypeAssertionExpression:
		return IsConstTypeReference(GetAssertedTypeNode(node))
	}
	return false
}

func IsConstTypeReference(node *Node) bool {
	return IsTypeReferenceNode(node) && len(node.TypeArguments()) == 0 && IsIdentifier(node.AsTypeReferenceNode().TypeName) && node.AsTypeReferenceNode().TypeName.Text() == "const"
}

func IsGlobalSourceFile(node *Node) bool {
	return node.Kind == KindSourceFile && !IsExternalOrCommonJsModule(node.AsSourceFile())
}

func IsParameterLikeOrReturnTag(node *Node) bool {
	switch node.Kind {
	case KindParameter, KindTypeParameter, KindJSDocParameterTag, KindJSDocReturnTag:
		return true
	}
	return false
}

func GetDeclarationOfKind(symbol *Symbol, kind Kind) *Node {
	for _, declaration := range symbol.Declarations {
		if declaration.Kind == kind {
			return declaration
		}
	}
	return nil
}

func FindConstructorDeclaration(node *ClassLikeDeclaration) *Node {
	for _, member := range node.ClassLikeData().Members.Nodes {
		if IsConstructorDeclaration(member) && NodeIsPresent(member.AsConstructorDeclaration().Body) {
			return member
		}
	}
	return nil
}

func GetFirstIdentifier(node *Node) *Node {
	switch node.Kind {
	case KindIdentifier:
		return node
	case KindQualifiedName:
		return GetFirstIdentifier(node.AsQualifiedName().Left)
	case KindPropertyAccessExpression:
		return GetFirstIdentifier(node.AsPropertyAccessExpression().Expression)
	}
	panic("Unhandled case in GetFirstIdentifier")
}

func GetNamespaceDeclarationNode(node *Node) *Node {
	switch node.Kind {
	case KindImportDeclaration:
		importClause := node.AsImportDeclaration().ImportClause
		if importClause != nil && importClause.AsImportClause().NamedBindings != nil && IsNamespaceImport(importClause.AsImportClause().NamedBindings) {
			return importClause.AsImportClause().NamedBindings
		}
	case KindImportEqualsDeclaration:
		return node
	case KindExportDeclaration:
		exportClause := node.AsExportDeclaration().ExportClause
		if exportClause != nil && IsNamespaceExport(exportClause) {
			return exportClause
		}
	default:
		panic("Unhandled case in getNamespaceDeclarationNode")
	}
	return nil
}

func ModuleExportNameIsDefault(node *Node) bool {
	return node.Text() == InternalSymbolNameDefault
}

func IsDefaultImport(node *Node /*ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration | JSDocImportTag*/) bool {
	var importClause *Node
	switch node.Kind {
	case KindImportDeclaration:
		importClause = node.AsImportDeclaration().ImportClause
	case KindJSDocImportTag:
		importClause = node.AsJSDocImportTag().ImportClause
	}
	return importClause != nil && importClause.AsImportClause().name != nil
}

func GetImpliedNodeFormatForFile(path string, packageJsonType string) core.ModuleKind {
	impliedNodeFormat := core.ResolutionModeNone
	if tspath.FileExtensionIsOneOf(path, []string{tspath.ExtensionDmts, tspath.ExtensionMts, tspath.ExtensionMjs}) {
		impliedNodeFormat = core.ResolutionModeESM
	} else if tspath.FileExtensionIsOneOf(path, []string{tspath.ExtensionDcts, tspath.ExtensionCts, tspath.ExtensionCjs}) {
		impliedNodeFormat = core.ResolutionModeCommonJS
	} else if packageJsonType != "" && tspath.FileExtensionIsOneOf(path, []string{tspath.ExtensionDts, tspath.ExtensionTs, tspath.ExtensionTsx, tspath.ExtensionJs, tspath.ExtensionJsx}) {
		impliedNodeFormat = core.IfElse(packageJsonType == "module", core.ResolutionModeESM, core.ResolutionModeCommonJS)
	}

	return impliedNodeFormat
}

func GetEmitModuleFormatOfFileWorker(sourceFile *SourceFile, options *core.CompilerOptions, sourceFileMetaData *SourceFileMetaData) core.ModuleKind {
	result := GetImpliedNodeFormatForEmitWorker(sourceFile.FileName(), options, sourceFileMetaData)
	if result != core.ModuleKindNone {
		return result
	}
	return options.GetEmitModuleKind()
}

func GetImpliedNodeFormatForEmitWorker(fileName string, options *core.CompilerOptions, sourceFileMetaData *SourceFileMetaData) core.ModuleKind {
	moduleKind := options.GetEmitModuleKind()
	if core.ModuleKindNode16 <= moduleKind && moduleKind <= core.ModuleKindNodeNext {
		if sourceFileMetaData == nil {
			return core.ModuleKindNone
		}
		return sourceFileMetaData.ImpliedNodeFormat
	}
	if sourceFileMetaData != nil && sourceFileMetaData.ImpliedNodeFormat == core.ModuleKindCommonJS &&
		(sourceFileMetaData.PackageJsonType == "commonjs" ||
			tspath.FileExtensionIsOneOf(fileName, []string{tspath.ExtensionCjs, tspath.ExtensionCts})) {
		return core.ModuleKindCommonJS
	}
	if sourceFileMetaData != nil && sourceFileMetaData.ImpliedNodeFormat == core.ModuleKindESNext &&
		(sourceFileMetaData.PackageJsonType == "module" ||
			tspath.FileExtensionIsOneOf(fileName, []string{tspath.ExtensionMjs, tspath.ExtensionMts})) {
		return core.ModuleKindESNext
	}
	return core.ModuleKindNone
}

func GetDeclarationContainer(node *Node) *Node {
	return FindAncestor(GetRootDeclaration(node), func(node *Node) bool {
		switch node.Kind {
		case KindVariableDeclaration,
			KindVariableDeclarationList,
			KindImportSpecifier,
			KindNamedImports,
			KindNamespaceImport,
			KindImportClause:
			return false
		default:
			return true
		}
	}).Parent
}

// Indicates that a symbol is an alias that does not merge with a local declaration.
// OR Is a JSContainer which may merge an alias with a local declaration
func IsNonLocalAlias(symbol *Symbol, excludes SymbolFlags) bool {
	if symbol == nil {
		return false
	}
	return symbol.Flags&(SymbolFlagsAlias|excludes) == SymbolFlagsAlias ||
		symbol.Flags&SymbolFlagsAlias != 0 && symbol.Flags&SymbolFlagsAssignment != 0
}

// An alias symbol is created by one of the following declarations:
//
//	import <symbol> = ...
//	import <symbol> from ...
//	import * as <symbol> from ...
//	import { x as <symbol> } from ...
//	export { x as <symbol> } from ...
//	export * as ns <symbol> from ...
//	export = <EntityNameExpression>
//	export default <EntityNameExpression>
func IsAliasSymbolDeclaration(node *Node) bool {
	switch node.Kind {
	case KindImportEqualsDeclaration, KindNamespaceExportDeclaration, KindNamespaceImport, KindNamespaceExport,
		KindImportSpecifier, KindExportSpecifier:
		return true
	case KindImportClause:
		return node.AsImportClause().Name() != nil
	case KindExportAssignment:
		return ExportAssignmentIsAlias(node)
	}
	return false
}

func IsParseTreeNode(node *Node) bool {
	return node.Flags&NodeFlagsSynthesized == 0
}

// Returns a token if position is in [start-of-leading-trivia, end), includes JSDoc only in JS files
func GetNodeAtPosition(file *SourceFile, position int, isJavaScriptFile bool) *Node {
	current := file.AsNode()
	for {
		var child *Node
		if isJavaScriptFile {
			for _, jsDoc := range current.JSDoc(file) {
				if nodeContainsPosition(jsDoc, position) {
					child = jsDoc
					break
				}
			}
		}
		if child == nil {
			current.ForEachChild(func(node *Node) bool {
				if nodeContainsPosition(node, position) {
					child = node
					return true
				}
				return false
			})
		}
		if child == nil {
			return current
		}
		current = child
	}
}

func nodeContainsPosition(node *Node, position int) bool {
	return node.Kind >= KindFirstNode && node.Pos() <= position && (position < node.End() || position == node.End() && node.Kind == KindEndOfFile)
}

func findImportOrRequire(text string, start int) (index int, size int) {
	index = max(start, 0)
	n := len(text)
	for index < n {
		next := strings.IndexAny(text[index:], "ir")
		if next < 0 {
			break
		}
		index += next

		var expected string
		if text[index] == 'i' {
			size = 6
			expected = "import"
		} else {
			size = 7
			expected = "require"
		}
		if index+size <= n && text[index:index+size] == expected {
			return
		}
		index++
	}

	return -1, 0
}

func ForEachDynamicImportOrRequireCall(
	file *SourceFile,
	includeTypeSpaceImports bool,
	requireStringLiteralLikeArgument bool,
	cb func(node *Node, argument *Expression) bool,
) bool {
	isJavaScriptFile := IsInJSFile(file.AsNode())
	lastIndex, size := findImportOrRequire(file.Text, 0)
	for lastIndex >= 0 {
		node := GetNodeAtPosition(file, lastIndex, isJavaScriptFile && includeTypeSpaceImports)
		if isJavaScriptFile && IsRequireCall(node, requireStringLiteralLikeArgument) {
			if cb(node, node.Arguments()[0]) {
				return true
			}
		} else if IsImportCall(node) && len(node.Arguments()) > 0 && (!requireStringLiteralLikeArgument || IsStringLiteralLike(node.Arguments()[0])) {
			if cb(node, node.Arguments()[0]) {
				return true
			}
		} else if includeTypeSpaceImports && IsLiteralImportTypeNode(node) {
			if cb(node, node.AsImportTypeNode().Argument.AsLiteralTypeNode().Literal) {
				return true
			}
		} else if includeTypeSpaceImports && node.Kind == KindJSDocImportTag {
			moduleNameExpr := GetExternalModuleName(node)
			if moduleNameExpr != nil && IsStringLiteral(moduleNameExpr) && moduleNameExpr.Text() != "" {
				if cb(node, moduleNameExpr) {
					return true
				}
			}
		}
		// skip past import/require
		lastIndex += size
		lastIndex, size = findImportOrRequire(file.Text, lastIndex)
	}
	return false
}

func IsRequireCall(node *Node, requireStringLiteralLikeArgument bool) bool {
	if !IsCallExpression(node) {
		return false
	}
	call := node.AsCallExpression()
	if !IsIdentifier(call.Expression) || call.Expression.Text() != "require" {
		return false
	}
	if len(call.Arguments.Nodes) != 1 {
		return false
	}
	return !requireStringLiteralLikeArgument || IsStringLiteralLike(call.Arguments.Nodes[0])
}
