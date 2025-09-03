package ast

import (
	"fmt"
	"slices"
	"strings"
	"sync"
	"sync/atomic"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
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

func RangeIsSynthesized(loc core.TextRange) bool {
	return PositionIsSynthesized(loc.Pos()) || PositionIsSynthesized(loc.End())
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

func IsModifierLike(node *Node) bool {
	return IsModifier(node) || IsDecorator(node)
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

func IsFunctionLikeKind(kind Kind) bool {
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
	return node != nil && IsFunctionLikeKind(node.Kind)
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
		KindSetAccessor,
		KindNotEmittedTypeElement:
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

func IsJsxAttributeLike(node *Node) bool {
	return IsJsxAttribute(node) || IsJsxSpreadAttribute(node)
}

func isDeclarationStatementKind(kind Kind) bool {
	switch kind {
	case KindFunctionDeclaration,
		KindMissingDeclaration,
		KindClassDeclaration,
		KindInterfaceDeclaration,
		KindTypeAliasDeclaration,
		KindJSTypeAliasDeclaration,
		KindEnumDeclaration,
		KindModuleDeclaration,
		KindImportDeclaration,
		KindJSImportDeclaration,
		KindImportEqualsDeclaration,
		KindExportDeclaration,
		KindExportAssignment,
		KindJSExportAssignment,
		KindCommonJSExport,
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
	OEKSatisfies                    OuterExpressionKinds = 1 << 5
	OEKExcludeJSDocTypeAssertion                         = 1 << 6
	OEKAssertions                                        = OEKTypeAssertions | OEKNonNullAssertions | OEKSatisfies
	OEKAll                                               = OEKParentheses | OEKAssertions | OEKPartiallyEmittedExpressions | OEKExpressionsWithTypeArguments
)

// Determines whether node is an "outer expression" of the provided kinds
func IsOuterExpression(node *Expression, kinds OuterExpressionKinds) bool {
	switch node.Kind {
	case KindParenthesizedExpression:
		return kinds&OEKParentheses != 0 && !(kinds&OEKExcludeJSDocTypeAssertion != 0 && isJSDocTypeAssertion(node))
	case KindTypeAssertionExpression, KindAsExpression:
		return kinds&OEKTypeAssertions != 0
	case KindSatisfiesExpression:
		return kinds&(OEKExpressionsWithTypeArguments|OEKSatisfies) != 0
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

// This should never be called outside the parser
func SetImportsOfSourceFile(node *SourceFile, imports []*LiteralLikeNode) {
	node.imports = imports
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

// Walks up the parents of a node to find the ancestor that matches the kind
func FindAncestorKind(node *Node, kind Kind) *Node {
	for node != nil {
		if node.Kind == kind {
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

func ToFindAncestorResult(b bool) FindAncestorResult {
	if b {
		return FindAncestorTrue
	}
	return FindAncestorFalse
}

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

func CanHaveSymbol(node *Node) bool {
	switch node.Kind {
	case KindArrowFunction, KindBinaryExpression, KindBindingElement, KindCallExpression, KindCallSignature,
		KindClassDeclaration, KindClassExpression, KindClassStaticBlockDeclaration, KindConstructor, KindConstructorType,
		KindConstructSignature, KindElementAccessExpression, KindEnumDeclaration, KindEnumMember, KindExportAssignment,
		KindExportDeclaration, KindExportSpecifier, KindFunctionDeclaration, KindFunctionExpression, KindFunctionType,
		KindGetAccessor, KindImportClause, KindImportEqualsDeclaration, KindImportSpecifier, KindIndexSignature,
		KindInterfaceDeclaration, KindJSExportAssignment, KindJSTypeAliasDeclaration, KindCommonJSExport,
		KindJsxAttribute, KindJsxAttributes, KindJsxSpreadAttribute, KindMappedType, KindMethodDeclaration,
		KindMethodSignature, KindModuleDeclaration, KindNamedTupleMember, KindNamespaceExport, KindNamespaceExportDeclaration,
		KindNamespaceImport, KindNewExpression, KindNoSubstitutionTemplateLiteral, KindNumericLiteral, KindObjectLiteralExpression,
		KindParameter, KindPropertyAccessExpression, KindPropertyAssignment, KindPropertyDeclaration, KindPropertySignature,
		KindSetAccessor, KindShorthandPropertyAssignment, KindSourceFile, KindSpreadAssignment, KindStringLiteral,
		KindTypeAliasDeclaration, KindTypeLiteral, KindTypeParameter, KindVariableDeclaration:
		return true
	}
	return false
}

func CanHaveIllegalDecorators(node *Node) bool {
	switch node.Kind {
	case KindPropertyAssignment, KindShorthandPropertyAssignment,
		KindFunctionDeclaration, KindConstructor,
		KindIndexSignature, KindClassStaticBlockDeclaration,
		KindMissingDeclaration, KindVariableStatement,
		KindInterfaceDeclaration, KindTypeAliasDeclaration,
		KindEnumDeclaration, KindModuleDeclaration,
		KindImportEqualsDeclaration, KindImportDeclaration, KindJSImportDeclaration,
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
		KindJSImportDeclaration,
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

func IsSourceFileJS(file *SourceFile) bool {
	return file.ScriptKind == core.ScriptKindJS || file.ScriptKind == core.ScriptKindJSX
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

func IsModuleOrEnumDeclaration(node *Node) bool {
	return node.Kind == KindModuleDeclaration || node.Kind == KindEnumDeclaration
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

func IsBindableStaticAccessExpression(node *Node, excludeThisKeyword bool) bool {
	return IsPropertyAccessExpression(node) &&
		(!excludeThisKeyword && node.Expression().Kind == KindThisKeyword || IsIdentifier(node.Name()) && IsBindableStaticNameExpression(node.Expression() /*excludeThisKeyword*/, true)) ||
		IsBindableStaticElementAccessExpression(node, excludeThisKeyword)
}

func IsBindableStaticElementAccessExpression(node *Node, excludeThisKeyword bool) bool {
	return IsLiteralLikeElementAccess(node) &&
		((!excludeThisKeyword && node.Expression().Kind == KindThisKeyword) ||
			IsEntityNameExpression(node.Expression()) ||
			IsBindableStaticAccessExpression(node.Expression() /*excludeThisKeyword*/, true))
}

func IsLiteralLikeElementAccess(node *Node) bool {
	return IsElementAccessExpression(node) && IsStringOrNumericLiteralLike(node.AsElementAccessExpression().ArgumentExpression)
}

func IsBindableStaticNameExpression(node *Node, excludeThisKeyword bool) bool {
	return IsEntityNameExpression(node) || IsBindableStaticAccessExpression(node, excludeThisKeyword)
}

// Does not handle signed numeric names like `a[+0]` - handling those would require handling prefix unary expressions
// throughout late binding handling as well, which is awkward (but ultimately probably doable if there is demand)
func GetElementOrPropertyAccessName(node *Node) *Node {
	switch node.Kind {
	case KindPropertyAccessExpression:
		if IsIdentifier(node.Name()) {
			return node.Name()
		}
		return nil
	case KindElementAccessExpression:
		if arg := SkipParentheses(node.AsElementAccessExpression().ArgumentExpression); IsStringOrNumericLiteralLike(arg) {
			return arg
		}
		return nil
	}
	panic("Unhandled case in GetElementOrPropertyAccessName")
}

func GetInitializerOfBinaryExpression(expr *BinaryExpression) *Expression {
	for IsBinaryExpression(expr.Right) {
		expr = expr.Right.AsBinaryExpression()
	}
	return expr.Right.Expression()
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

func GetImportClauseOfDeclaration(declaration *Declaration) *ImportClause {
	switch declaration.Kind {
	case KindImportDeclaration:
		return declaration.AsImportDeclaration().ImportClause.AsImportClause()
	case KindJSDocImportTag:
		return declaration.AsJSDocImportTag().ImportClause.AsImportClause()
	}
	return nil
}

func GetNonAssignedNameOfDeclaration(declaration *Node) *Node {
	// !!!
	switch declaration.Kind {
	case KindBinaryExpression:
		bin := declaration.AsBinaryExpression()
		kind := GetAssignmentDeclarationKind(bin)
		if kind == JSDeclarationKindProperty || kind == JSDeclarationKindThisProperty {
			if name := GetElementOrPropertyAccessName(bin.Left); name != nil {
				return name
			} else {
				return bin.Left
			}
		}
		return nil
	case KindExportAssignment, KindJSExportAssignment:
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
		case KindCommonJSExport:
			return parent.AsCommonJSExport().Name()
		case KindVariableDeclaration:
			name := parent.AsVariableDeclaration().Name()
			if IsIdentifier(name) {
				return name
			}
		}
	}
	return nil
}

type JSDeclarationKind int

const (
	JSDeclarationKindNone JSDeclarationKind = iota
	/// module.exports = expr
	JSDeclarationKindModuleExports
	/// exports.name = expr
	/// module.exports.name = expr
	JSDeclarationKindExportsProperty
	/// className.prototype.name = expr
	JSDeclarationKindPrototypeProperty
	/// this.name = expr
	JSDeclarationKindThisProperty
	/// F.name = expr, F[name] = expr
	JSDeclarationKindProperty
)

func GetAssignmentDeclarationKind(bin *BinaryExpression) JSDeclarationKind {
	if bin.OperatorToken.Kind != KindEqualsToken || !IsAccessExpression(bin.Left) {
		return JSDeclarationKindNone
	}
	if IsInJSFile(bin.Left) && IsModuleExportsAccessExpression(bin.Left) {
		return JSDeclarationKindModuleExports
	} else if IsInJSFile(bin.Left) &&
		(IsModuleExportsAccessExpression(bin.Left.Expression()) || IsExportsIdentifier(bin.Left.Expression())) &&
		GetElementOrPropertyAccessName(bin.Left) != nil {
		return JSDeclarationKindExportsProperty
	}
	if IsInJSFile(bin.Left) && bin.Left.Expression().Kind == KindThisKeyword {
		return JSDeclarationKindThisProperty
	}
	if bin.Left.Kind == KindPropertyAccessExpression && IsEntityNameExpressionEx(bin.Left.Expression(), IsInJSFile(bin.Left)) && IsIdentifier(bin.Left.Name()) ||
		bin.Left.Kind == KindElementAccessExpression && IsEntityNameExpressionEx(bin.Left.Expression(), IsInJSFile(bin.Left)) {
		return JSDeclarationKindProperty
	}
	return JSDeclarationKindNone
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
	return IsEntityNameExpressionEx(node, false /*allowJS*/)
}

func IsEntityNameExpressionEx(node *Node, allowJS bool) bool {
	if node.Kind == KindIdentifier || IsPropertyAccessEntityNameExpression(node, allowJS) {
		return true
	}
	if allowJS {
		return node.Kind == KindThisKeyword || isElementAccessEntityNameExpression(node, allowJS)
	}
	return false
}

func IsPropertyAccessEntityNameExpression(node *Node, allowJS bool) bool {
	if node.Kind == KindPropertyAccessExpression {
		expr := node.AsPropertyAccessExpression()
		return expr.Name().Kind == KindIdentifier && IsEntityNameExpressionEx(expr.Expression, allowJS)
	}
	return false
}

func isElementAccessEntityNameExpression(node *Node, allowJS bool) bool {
	if node.Kind == KindElementAccessExpression {
		expr := node.AsElementAccessExpression()
		if IsStringOrNumericLiteralLike(SkipParentheses(expr.ArgumentExpression)) {
			return IsEntityNameExpressionEx(expr.Expression, allowJS)
		}
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

func HasSamePropertyAccessName(node1, node2 *Node) bool {
	if node1.Kind == KindIdentifier && node2.Kind == KindIdentifier {
		return node1.Text() == node2.Text()
	} else if node1.Kind == KindPropertyAccessExpression && node2.Kind == KindPropertyAccessExpression {
		return node1.AsPropertyAccessExpression().Name().Text() == node2.AsPropertyAccessExpression().Name().Text() &&
			HasSamePropertyAccessName(node1.AsPropertyAccessExpression().Expression, node2.AsPropertyAccessExpression().Expression)
	}
	return false
}

func IsAmbientModule(node *Node) bool {
	return IsModuleDeclaration(node) && (node.AsModuleDeclaration().Name().Kind == KindStringLiteral || IsGlobalScopeAugmentation(node))
}

func IsExternalModule(file *SourceFile) bool {
	return file.ExternalModuleIndicator != nil
}

func IsExternalOrCommonJSModule(file *SourceFile) bool {
	return file.ExternalModuleIndicator != nil || file.CommonJSModuleIndicator != nil
}

// TODO: Should we deprecate `IsExternalOrCommonJSModule` in favor of this function?
func IsEffectiveExternalModule(node *SourceFile, compilerOptions *core.CompilerOptions) bool {
	return IsExternalModule(node) || (isCommonJSContainingModuleKind(compilerOptions.GetEmitModuleKind()) && node.CommonJSModuleIndicator != nil)
}

func isCommonJSContainingModuleKind(kind core.ModuleKind) bool {
	return kind == core.ModuleKindCommonJS || core.ModuleKindNode16 <= kind && kind <= core.ModuleKindNodeNext
}

func IsExternalModuleIndicator(node *Statement) bool {
	// Exported top-level member indicates moduleness
	return IsAnyImportOrReExport(node) || IsExportAssignment(node) || HasSyntacticModifier(node, ModifierFlagsExport)
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

func IsModuleWithStringLiteralName(node *Node) bool {
	return IsModuleDeclaration(node) && node.Name().Kind == KindStringLiteral
}

func GetContainingClass(node *Node) *Node {
	return FindAncestor(node.Parent, IsClassLike)
}

func GetExtendsHeritageClauseElement(node *Node) *ExpressionWithTypeArgumentsNode {
	return core.FirstOrNil(GetExtendsHeritageClauseElements(node))
}

func GetExtendsHeritageClauseElements(node *Node) []*ExpressionWithTypeArgumentsNode {
	return GetHeritageElements(node, KindExtendsKeyword)
}

func GetImplementsHeritageClauseElements(node *Node) []*ExpressionWithTypeArgumentsNode {
	return GetHeritageElements(node, KindImplementsKeyword)
}

func GetHeritageElements(node *Node, kind Kind) []*Node {
	clause := GetHeritageClause(node, kind)
	if clause != nil {
		return clause.AsHeritageClause().Types.Nodes
	}
	return nil
}

func GetHeritageClause(node *Node, kind Kind) *Node {
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

func GetSuperContainer(node *Node, stopOnFunctions bool) *Node {
	for node = node.Parent; node != nil; node = node.Parent {
		switch node.Kind {
		case KindComputedPropertyName:
			node = node.Parent
		case KindFunctionDeclaration, KindFunctionExpression, KindArrowFunction:
			if !stopOnFunctions {
				continue
			}
			return node
		case KindPropertyDeclaration, KindPropertySignature, KindMethodDeclaration, KindMethodSignature, KindConstructor, KindGetAccessor, KindSetAccessor, KindClassStaticBlockDeclaration:
			return node
		case KindDecorator:
			// Decorators are always applied outside of the body of a class or method.
			if node.Parent.Kind == KindParameter && IsClassElement(node.Parent.Parent) {
				// If the decorator's parent is a Parameter, we resolve the this container from
				// the grandparent class declaration.
				node = node.Parent.Parent
			} else if IsClassElement(node.Parent) {
				// If the decorator's parent is a class element, we resolve the 'this' container
				// from the parent class declaration.
				node = node.Parent
			}
		}
	}
	return nil
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
	e := node.AsExportAssignment().Expression
	return IsEntityNameExpression(e) || IsClassExpression(e)
}

func IsInstanceOfExpression(node *Node) bool {
	return IsBinaryExpression(node) && node.AsBinaryExpression().OperatorToken.Kind == KindInstanceOfKeyword
}

func IsAnyImportOrReExport(node *Node) bool {
	return IsAnyImportSyntax(node) || IsExportDeclaration(node)
}

func IsAnyImportSyntax(node *Node) bool {
	return NodeKindIs(node, KindImportDeclaration, KindJSImportDeclaration, KindImportEqualsDeclaration)
}

func IsJsonSourceFile(file *SourceFile) bool {
	return file.ScriptKind == core.ScriptKindJSON
}

func IsInJsonFile(node *Node) bool {
	return node.Flags&NodeFlagsJsonFile != 0
}

func GetExternalModuleName(node *Node) *Expression {
	switch node.Kind {
	case KindImportDeclaration, KindJSImportDeclaration:
		return node.AsImportDeclaration().ModuleSpecifier
	case KindExportDeclaration:
		return node.AsExportDeclaration().ModuleSpecifier
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
	case KindImportDeclaration, KindJSImportDeclaration:
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
		return IsTypeQueryNode(node.Parent) || IsJSDocLinkLike(node.Parent) || isJSXTagName(node)
	case KindJSDocMemberName:
		return IsTypeQueryNode(node.Parent) || IsJSDocLinkLike(node.Parent) || isJSXTagName(node)
	case KindPrivateIdentifier:
		return IsBinaryExpression(node.Parent) && node.Parent.AsBinaryExpression().Left == node && node.Parent.AsBinaryExpression().OperatorToken.Kind == KindInKeyword
	case KindIdentifier:
		if IsTypeQueryNode(node.Parent) || IsJSDocLinkLike(node.Parent) || isJSXTagName(node) {
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
	case KindVoidKeyword:
		return node.Parent.Kind != KindVoidExpression
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

func IsJSDocLinkLike(node *Node) bool {
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
	if node == nil {
		return false
	}
	return node.Kind == KindQuestionToken
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
		KindJSTypeAliasDeclaration,
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
		KindJSImportDeclaration,
		KindExportAssignment,
		KindJSExportAssignment,
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
	case KindInterfaceDeclaration, KindTypeAliasDeclaration, KindJSTypeAliasDeclaration:
		return ModuleInstanceStateNonInstantiated
	case KindEnumDeclaration:
		if IsEnumConst(node) {
			return ModuleInstanceStateConstEnumOnly
		}
	case KindImportDeclaration, KindJSImportDeclaration, KindImportEqualsDeclaration:
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
	return node.Kind == KindSourceFile && !IsExternalOrCommonJSModule(node.AsSourceFile())
}

func IsParameterLike(node *Node) bool {
	switch node.Kind {
	case KindParameter, KindTypeParameter:
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
	case KindImportDeclaration, KindJSImportDeclaration:
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

func IsDefaultImport(node *Node /*ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration*/) bool {
	switch node.Kind {
	case KindImportDeclaration, KindJSImportDeclaration:
		importClause := node.AsImportDeclaration().ImportClause
		return importClause != nil && importClause.AsImportClause().name != nil
	}
	return false
}

func GetImpliedNodeFormatForFile(path string, packageJsonType string) core.ModuleKind {
	impliedNodeFormat := core.ResolutionModeNone
	if tspath.FileExtensionIsOneOf(path, []string{tspath.ExtensionDmts, tspath.ExtensionMts, tspath.ExtensionMjs}) {
		impliedNodeFormat = core.ResolutionModeESM
	} else if tspath.FileExtensionIsOneOf(path, []string{tspath.ExtensionDcts, tspath.ExtensionCts, tspath.ExtensionCjs}) {
		impliedNodeFormat = core.ResolutionModeCommonJS
	} else if tspath.FileExtensionIsOneOf(path, []string{tspath.ExtensionDts, tspath.ExtensionTs, tspath.ExtensionTsx, tspath.ExtensionJs, tspath.ExtensionJsx}) {
		impliedNodeFormat = core.IfElse(packageJsonType == "module", core.ResolutionModeESM, core.ResolutionModeCommonJS)
	}

	return impliedNodeFormat
}

func GetEmitModuleFormatOfFileWorker(fileName string, options *core.CompilerOptions, sourceFileMetaData SourceFileMetaData) core.ModuleKind {
	result := GetImpliedNodeFormatForEmitWorker(fileName, options.GetEmitModuleKind(), sourceFileMetaData)
	if result != core.ModuleKindNone {
		return result
	}
	return options.GetEmitModuleKind()
}

func GetImpliedNodeFormatForEmitWorker(fileName string, emitModuleKind core.ModuleKind, sourceFileMetaData SourceFileMetaData) core.ResolutionMode {
	if core.ModuleKindNode16 <= emitModuleKind && emitModuleKind <= core.ModuleKindNodeNext {
		return sourceFileMetaData.ImpliedNodeFormat
	}
	if sourceFileMetaData.ImpliedNodeFormat == core.ModuleKindCommonJS &&
		(sourceFileMetaData.PackageJsonType == "commonjs" ||
			tspath.FileExtensionIsOneOf(fileName, []string{tspath.ExtensionCjs, tspath.ExtensionCts})) {
		return core.ModuleKindCommonJS
	}
	if sourceFileMetaData.ImpliedNodeFormat == core.ModuleKindESNext &&
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
//	const <symbol> = ... (JS only)
//	const { <symbol>, ... } = ... (JS only)
//	import <symbol> from ...
//	import * as <symbol> from ...
//	import { x as <symbol> } from ...
//	export { x as <symbol> } from ...
//	export * as ns <symbol> from ...
//	export = <EntityNameExpression>
//	export default <EntityNameExpression>
//	module.exports = <EntityNameExpression> (JS only)
func IsAliasSymbolDeclaration(node *Node) bool {
	switch node.Kind {
	case KindImportEqualsDeclaration, KindNamespaceExportDeclaration, KindNamespaceImport, KindNamespaceExport,
		KindImportSpecifier, KindExportSpecifier:
		return true
	case KindImportClause:
		return node.AsImportClause().Name() != nil
	case KindExportAssignment, KindJSExportAssignment:
		return ExportAssignmentIsAlias(node)
	case KindVariableDeclaration, KindBindingElement:
		return IsVariableDeclarationInitializedToRequire(node)
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
			for _, jsdoc := range current.JSDoc(file) {
				if nodeContainsPosition(jsdoc, position) {
					child = jsdoc
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
	lastIndex, size := findImportOrRequire(file.Text(), 0)
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
		}
		// skip past import/require
		lastIndex += size
		lastIndex, size = findImportOrRequire(file.Text(), lastIndex)
	}
	return false
}

// Returns true if the node is a CallExpression to the identifier 'require' with
// exactly one argument (of the form 'require("name")').
// This function does not test if the node is in a JavaScript file or not.
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

func IsRequireVariableStatement(node *Node) bool {
	if IsVariableStatement(node) {
		if declarations := node.AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes; len(declarations) > 0 {
			return core.Every(declarations, IsVariableDeclarationInitializedToRequire)
		}
	}
	return false
}

func GetJSXImplicitImportBase(compilerOptions *core.CompilerOptions, file *SourceFile) string {
	jsxImportSourcePragma := GetPragmaFromSourceFile(file, "jsximportsource")
	jsxRuntimePragma := GetPragmaFromSourceFile(file, "jsxruntime")
	if GetPragmaArgument(jsxRuntimePragma, "factory") == "classic" {
		return ""
	}
	if compilerOptions.Jsx == core.JsxEmitReactJSX ||
		compilerOptions.Jsx == core.JsxEmitReactJSXDev ||
		compilerOptions.JsxImportSource != "" ||
		jsxImportSourcePragma != nil ||
		GetPragmaArgument(jsxRuntimePragma, "factory") == "automatic" {
		result := GetPragmaArgument(jsxImportSourcePragma, "factory")
		if result == "" {
			result = compilerOptions.JsxImportSource
		}
		if result == "" {
			result = "react"
		}
		return result
	}
	return ""
}

func GetJSXRuntimeImport(base string, options *core.CompilerOptions) string {
	if base == "" {
		return base
	}
	return base + "/" + core.IfElse(options.Jsx == core.JsxEmitReactJSXDev, "jsx-dev-runtime", "jsx-runtime")
}

func GetPragmaFromSourceFile(file *SourceFile, name string) *Pragma {
	var result *Pragma
	if file != nil {
		for i := range file.Pragmas {
			if file.Pragmas[i].Name == name {
				result = &file.Pragmas[i] // Last one wins
			}
		}
	}
	return result
}

func GetPragmaArgument(pragma *Pragma, name string) string {
	if pragma != nil {
		if arg, ok := pragma.Args[name]; ok {
			return arg.Value
		}
	}
	return ""
}

// Of the form: `const x = require("x")` or `const { x } = require("x")` or with `var` or `let`
// The variable must not be exported and must not have a type annotation, even a jsdoc one.
// The initializer must be a call to `require` with a string literal or a string literal-like argument.
func IsVariableDeclarationInitializedToRequire(node *Node) bool {
	if !IsInJSFile(node) {
		return false
	}
	if node.Kind == KindBindingElement {
		node = node.Parent.Parent
	}
	if node.Kind != KindVariableDeclaration {
		return false
	}

	return node.Parent.Parent.ModifierFlags()&ModifierFlagsExport == 0 &&
		node.AsVariableDeclaration().Initializer != nil &&
		node.Type() == nil &&
		IsRequireCall(node.AsVariableDeclaration().Initializer, true /*requireStringLiteralLikeArgument*/)
}

func IsModuleExportsAccessExpression(node *Node) bool {
	if IsAccessExpression(node) && IsModuleIdentifier(node.Expression()) {
		if name := GetElementOrPropertyAccessName(node); name != nil {
			return name.Text() == "exports"
		}
	}
	return false
}

func isLiteralLikeElementAccess(node *Node) bool {
	return node.Kind == KindElementAccessExpression && IsStringOrNumericLiteralLike(node.AsElementAccessExpression().ArgumentExpression)
}

func IsCheckJSEnabledForFile(sourceFile *SourceFile, compilerOptions *core.CompilerOptions) bool {
	if sourceFile.CheckJsDirective != nil {
		return sourceFile.CheckJsDirective.Enabled
	}
	return compilerOptions.CheckJs == core.TSTrue
}

func IsPlainJSFile(file *SourceFile, checkJs core.Tristate) bool {
	return file != nil && (file.ScriptKind == core.ScriptKindJS || file.ScriptKind == core.ScriptKindJSX) && file.CheckJsDirective == nil && checkJs == core.TSUnknown
}

func GetLeftmostAccessExpression(expr *Node) *Node {
	for IsAccessExpression(expr) {
		expr = expr.Expression()
	}
	return expr
}

func IsTypeOnlyImportDeclaration(node *Node) bool {
	switch node.Kind {
	case KindImportSpecifier:
		return node.AsImportSpecifier().IsTypeOnly || node.Parent.Parent.AsImportClause().IsTypeOnly
	case KindNamespaceImport:
		return node.Parent.AsImportClause().IsTypeOnly
	case KindImportClause:
		return node.AsImportClause().IsTypeOnly
	case KindImportEqualsDeclaration:
		return node.AsImportEqualsDeclaration().IsTypeOnly
	}
	return false
}

func isTypeOnlyExportDeclaration(node *Node) bool {
	switch node.Kind {
	case KindExportSpecifier:
		return node.AsExportSpecifier().IsTypeOnly || node.Parent.Parent.AsExportDeclaration().IsTypeOnly
	case KindExportDeclaration:
		d := node.AsExportDeclaration()
		return d.IsTypeOnly && d.ModuleSpecifier != nil && d.ExportClause == nil
	case KindNamespaceExport:
		return node.Parent.AsExportDeclaration().IsTypeOnly
	}
	return false
}

func IsTypeOnlyImportOrExportDeclaration(node *Node) bool {
	return IsTypeOnlyImportDeclaration(node) || isTypeOnlyExportDeclaration(node)
}

func IsExclusivelyTypeOnlyImportOrExport(node *Node) bool {
	switch node.Kind {
	case KindExportDeclaration:
		return node.AsExportDeclaration().IsTypeOnly
	case KindImportDeclaration, KindJSImportDeclaration:
		if importClause := node.AsImportDeclaration().ImportClause; importClause != nil {
			return importClause.AsImportClause().IsTypeOnly
		}
	case KindJSDocImportTag:
		if importClause := node.AsJSDocImportTag().ImportClause; importClause != nil {
			return importClause.AsImportClause().IsTypeOnly
		}
	}
	return false
}

func GetClassLikeDeclarationOfSymbol(symbol *Symbol) *Node {
	return core.Find(symbol.Declarations, IsClassLike)
}

func IsCallLikeExpression(node *Node) bool {
	switch node.Kind {
	case KindJsxOpeningElement, KindJsxSelfClosingElement, KindJsxOpeningFragment, KindCallExpression, KindNewExpression,
		KindTaggedTemplateExpression, KindDecorator:
		return true
	case KindBinaryExpression:
		return node.AsBinaryExpression().OperatorToken.Kind == KindInstanceOfKeyword
	}
	return false
}

func IsJsxCallLike(node *Node) bool {
	switch node.Kind {
	case KindJsxOpeningElement, KindJsxSelfClosingElement, KindJsxOpeningFragment:
		return true
	}
	return false
}

func IsCallLikeOrFunctionLikeExpression(node *Node) bool {
	return IsCallLikeExpression(node) || IsFunctionExpressionOrArrowFunction(node)
}

func NodeHasKind(node *Node, kind Kind) bool {
	if node == nil {
		return false
	}
	return node.Kind == kind
}

func IsContextualKeyword(token Kind) bool {
	return KindFirstContextualKeyword <= token && token <= KindLastContextualKeyword
}

func IsThisInTypeQuery(node *Node) bool {
	if !IsThisIdentifier(node) {
		return false
	}
	for IsQualifiedName(node.Parent) && node.Parent.AsQualifiedName().Left == node {
		node = node.Parent
	}
	return node.Parent.Kind == KindTypeQuery
}

// Gets whether a bound `VariableDeclaration` or `VariableDeclarationList` is part of a `let` declaration.
func IsLet(node *Node) bool {
	return GetCombinedNodeFlags(node)&NodeFlagsBlockScoped == NodeFlagsLet
}

func IsClassMemberModifier(token Kind) bool {
	return IsParameterPropertyModifier(token) || token == KindStaticKeyword ||
		token == KindOverrideKeyword || token == KindAccessorKeyword
}

func IsParameterPropertyModifier(kind Kind) bool {
	return ModifierToFlag(kind)&ModifierFlagsParameterPropertyModifier != 0
}

func ForEachChildAndJSDoc(node *Node, sourceFile *SourceFile, v Visitor) bool {
	if node.Flags&NodeFlagsHasJSDoc != 0 {
		if visitNodes(v, node.JSDoc(sourceFile)) {
			return true
		}
	}
	return node.ForEachChild(v)
}

func IsTypeReferenceType(node *Node) bool {
	return node.Kind == KindTypeReference || node.Kind == KindExpressionWithTypeArguments
}

func IsVariableLike(node *Node) bool {
	switch node.Kind {
	case KindBindingElement, KindEnumMember, KindParameter, KindPropertyAssignment, KindPropertyDeclaration,
		KindPropertySignature, KindShorthandPropertyAssignment, KindVariableDeclaration:
		return true
	}
	return false
}

func HasInitializer(node *Node) bool {
	switch node.Kind {
	case KindVariableDeclaration, KindParameter, KindBindingElement, KindPropertyDeclaration,
		KindPropertyAssignment, KindEnumMember, KindForStatement, KindForInStatement, KindForOfStatement,
		KindJsxAttribute:
		return node.Initializer() != nil
	default:
		return false
	}
}

func GetTypeAnnotationNode(node *Node) *TypeNode {
	switch node.Kind {
	case KindVariableDeclaration, KindParameter, KindPropertySignature, KindPropertyDeclaration,
		KindTypePredicate, KindParenthesizedType, KindTypeOperator, KindMappedType, KindTypeAssertionExpression,
		KindAsExpression, KindSatisfiesExpression, KindTypeAliasDeclaration, KindJSTypeAliasDeclaration,
		KindNamedTupleMember, KindOptionalType, KindRestType, KindTemplateLiteralTypeSpan, KindJSDocTypeExpression,
		KindJSDocPropertyTag, KindJSDocNullableType, KindJSDocNonNullableType, KindJSDocOptionalType:
		return node.Type()
	default:
		funcLike := node.FunctionLikeData()
		if funcLike != nil {
			return funcLike.Type
		}
		return nil
	}
}

func IsObjectTypeDeclaration(node *Node) bool {
	return IsClassLike(node) || IsInterfaceDeclaration(node) || IsTypeLiteralNode(node)
}

func IsClassOrTypeElement(node *Node) bool {
	return IsClassElement(node) || IsTypeElement(node)
}

func GetClassExtendsHeritageElement(node *Node) *ExpressionWithTypeArgumentsNode {
	heritageElements := GetHeritageElements(node, KindExtendsKeyword)
	if len(heritageElements) > 0 {
		return heritageElements[0]
	}
	return nil
}

func GetImplementsTypeNodes(node *Node) []*ExpressionWithTypeArgumentsNode {
	return GetHeritageElements(node, KindImplementsKeyword)
}

func IsTypeKeywordToken(node *Node) bool {
	return node.Kind == KindTypeKeyword
}

// See `IsJSDocSingleCommentNode`.
func IsJSDocSingleCommentNodeList(nodeList *NodeList) bool {
	if nodeList == nil || len(nodeList.Nodes) == 0 {
		return false
	}
	parent := nodeList.Nodes[0].Parent
	return IsJSDocSingleCommentNode(parent) && nodeList == parent.CommentList()
}

// See `IsJSDocSingleCommentNode`.
func IsJSDocSingleCommentNodeComment(node *Node) bool {
	if node == nil || node.Parent == nil {
		return false
	}
	return IsJSDocSingleCommentNode(node.Parent) && node == node.Parent.CommentList().Nodes[0]
}

// In Strada, if a JSDoc node has a single comment, that comment is represented as a string property
// as a simplification, and therefore that comment is not visited by `forEachChild`.
func IsJSDocSingleCommentNode(node *Node) bool {
	return hasComment(node.Kind) && node.CommentList() != nil && len(node.CommentList().Nodes) == 1
}

func IsValidTypeOnlyAliasUseSite(useSite *Node) bool {
	return useSite.Flags&(NodeFlagsAmbient|NodeFlagsJSDoc) != 0 ||
		IsPartOfTypeQuery(useSite) ||
		isIdentifierInNonEmittingHeritageClause(useSite) ||
		isPartOfPossiblyValidTypeOrAbstractComputedPropertyName(useSite) ||
		!(IsExpressionNode(useSite) || isShorthandPropertyNameUseSite(useSite))
}

func isIdentifierInNonEmittingHeritageClause(node *Node) bool {
	if !IsIdentifier(node) {
		return false
	}
	parent := node.Parent
	for IsPropertyAccessExpression(parent) || IsExpressionWithTypeArguments(parent) {
		parent = parent.Parent
	}
	return IsHeritageClause(parent) && (parent.AsHeritageClause().Token == KindImplementsKeyword || IsInterfaceDeclaration(parent.Parent))
}

func isPartOfPossiblyValidTypeOrAbstractComputedPropertyName(node *Node) bool {
	for NodeKindIs(node, KindIdentifier, KindPropertyAccessExpression) {
		node = node.Parent
	}
	if node.Kind != KindComputedPropertyName {
		return false
	}
	if HasSyntacticModifier(node.Parent, ModifierFlagsAbstract) {
		return true
	}
	return NodeKindIs(node.Parent.Parent, KindInterfaceDeclaration, KindTypeLiteral)
}

func isShorthandPropertyNameUseSite(useSite *Node) bool {
	return IsIdentifier(useSite) && IsShorthandPropertyAssignment(useSite.Parent) && useSite.Parent.AsShorthandPropertyAssignment().Name() == useSite
}

func GetPropertyNameForPropertyNameNode(name *Node) string {
	switch name.Kind {
	case KindIdentifier, KindPrivateIdentifier, KindStringLiteral, KindNoSubstitutionTemplateLiteral,
		KindNumericLiteral, KindBigIntLiteral, KindJsxNamespacedName:
		return name.Text()
	case KindComputedPropertyName:
		nameExpression := name.AsComputedPropertyName().Expression
		if IsStringOrNumericLiteralLike(nameExpression) {
			return nameExpression.Text()
		}
		if IsSignedNumericLiteral(nameExpression) {
			text := nameExpression.AsPrefixUnaryExpression().Operand.Text()
			if nameExpression.AsPrefixUnaryExpression().Operator == KindMinusToken {
				text = "-" + text
			}
			return text
		}
		return InternalSymbolNameMissing
	}
	panic("Unhandled case in getPropertyNameForPropertyNameNode")
}

func IsPartOfTypeOnlyImportOrExportDeclaration(node *Node) bool {
	return FindAncestor(node, IsTypeOnlyImportOrExportDeclaration) != nil
}

func IsPartOfExclusivelyTypeOnlyImportOrExportDeclaration(node *Node) bool {
	return FindAncestor(node, IsExclusivelyTypeOnlyImportOrExport) != nil
}

func IsEmittableImport(node *Node) bool {
	switch node.Kind {
	case KindImportDeclaration:
		return node.AsImportDeclaration().ImportClause != nil && !node.AsImportDeclaration().ImportClause.IsTypeOnly()
	case KindExportDeclaration:
		return !node.AsExportDeclaration().IsTypeOnly
	case KindImportEqualsDeclaration:
		return !node.AsImportEqualsDeclaration().IsTypeOnly
	case KindCallExpression:
		return IsImportCall(node)
	}
	return false
}

func IsResolutionModeOverrideHost(node *Node) bool {
	if node == nil {
		return false
	}
	switch node.Kind {
	case KindImportType, KindExportDeclaration, KindImportDeclaration, KindJSImportDeclaration:
		return true
	}
	return false
}

func HasResolutionModeOverride(node *Node) bool {
	if node == nil {
		return false
	}
	var attributes *ImportAttributesNode
	switch node.Kind {
	case KindImportType:
		attributes = node.AsImportTypeNode().Attributes
	case KindImportDeclaration, KindJSImportDeclaration:
		attributes = node.AsImportDeclaration().Attributes
	case KindExportDeclaration:
		attributes = node.AsExportDeclaration().Attributes
	}
	if attributes != nil {
		_, ok := attributes.GetResolutionModeOverride()
		return ok
	}
	return false
}

func IsStringTextContainingNode(node *Node) bool {
	return node.Kind == KindStringLiteral || IsTemplateLiteralKind(node.Kind)
}

func IsTemplateLiteralKind(kind Kind) bool {
	return KindFirstTemplateToken <= kind && kind <= KindLastTemplateToken
}

func IsTemplateLiteralToken(node *Node) bool {
	return IsTemplateLiteralKind(node.Kind)
}

func GetExternalModuleImportEqualsDeclarationExpression(node *Node) *Node {
	debug.Assert(IsExternalModuleImportEqualsDeclaration(node))
	return node.AsImportEqualsDeclaration().ModuleReference.AsExternalModuleReference().Expression
}

func CreateModifiersFromModifierFlags(flags ModifierFlags, createModifier func(kind Kind) *Node) []*Node {
	var result []*Node
	if flags&ModifierFlagsExport != 0 {
		result = append(result, createModifier(KindExportKeyword))
	}
	if flags&ModifierFlagsAmbient != 0 {
		result = append(result, createModifier(KindDeclareKeyword))
	}
	if flags&ModifierFlagsDefault != 0 {
		result = append(result, createModifier(KindDefaultKeyword))
	}
	if flags&ModifierFlagsConst != 0 {
		result = append(result, createModifier(KindConstKeyword))
	}
	if flags&ModifierFlagsPublic != 0 {
		result = append(result, createModifier(KindPublicKeyword))
	}
	if flags&ModifierFlagsPrivate != 0 {
		result = append(result, createModifier(KindPrivateKeyword))
	}
	if flags&ModifierFlagsProtected != 0 {
		result = append(result, createModifier(KindProtectedKeyword))
	}
	if flags&ModifierFlagsAbstract != 0 {
		result = append(result, createModifier(KindAbstractKeyword))
	}
	if flags&ModifierFlagsStatic != 0 {
		result = append(result, createModifier(KindStaticKeyword))
	}
	if flags&ModifierFlagsOverride != 0 {
		result = append(result, createModifier(KindOverrideKeyword))
	}
	if flags&ModifierFlagsReadonly != 0 {
		result = append(result, createModifier(KindReadonlyKeyword))
	}
	if flags&ModifierFlagsAccessor != 0 {
		result = append(result, createModifier(KindAccessorKeyword))
	}
	if flags&ModifierFlagsAsync != 0 {
		result = append(result, createModifier(KindAsyncKeyword))
	}
	if flags&ModifierFlagsIn != 0 {
		result = append(result, createModifier(KindInKeyword))
	}
	if flags&ModifierFlagsOut != 0 {
		result = append(result, createModifier(KindOutKeyword))
	}
	return result
}

func GetThisParameter(signature *Node) *Node {
	// callback tags do not currently support this parameters
	if len(signature.Parameters()) != 0 {
		thisParameter := signature.Parameters()[0]
		if IsThisParameter(thisParameter) {
			return thisParameter
		}
	}
	return nil
}

func ReplaceModifiers(factory *NodeFactory, node *Node, modifierArray *ModifierList) *Node {
	switch node.Kind {
	case KindTypeParameter:
		return factory.UpdateTypeParameterDeclaration(
			node.AsTypeParameter(),
			modifierArray,
			node.Name(),
			node.AsTypeParameter().Constraint,
			node.AsTypeParameter().DefaultType,
		)
	case KindParameter:
		return factory.UpdateParameterDeclaration(
			node.AsParameterDeclaration(),
			modifierArray,
			node.AsParameterDeclaration().DotDotDotToken,
			node.Name(),
			node.AsParameterDeclaration().QuestionToken,
			node.Type(),
			node.Initializer(),
		)
	case KindConstructorType:
		return factory.UpdateConstructorTypeNode(
			node.AsConstructorTypeNode(),
			modifierArray,
			node.TypeParameterList(),
			node.ParameterList(),
			node.Type(),
		)
	case KindPropertySignature:
		return factory.UpdatePropertySignatureDeclaration(
			node.AsPropertySignatureDeclaration(),
			modifierArray,
			node.Name(),
			node.AsPropertySignatureDeclaration().PostfixToken,
			node.Type(),
			node.Initializer(),
		)
	case KindPropertyDeclaration:
		return factory.UpdatePropertyDeclaration(
			node.AsPropertyDeclaration(),
			modifierArray,
			node.Name(),
			node.AsPropertyDeclaration().PostfixToken,
			node.Type(),
			node.Initializer(),
		)
	case KindMethodSignature:
		return factory.UpdateMethodSignatureDeclaration(
			node.AsMethodSignatureDeclaration(),
			modifierArray,
			node.Name(),
			node.AsMethodSignatureDeclaration().PostfixToken,
			node.TypeParameterList(),
			node.ParameterList(),
			node.Type(),
		)
	case KindMethodDeclaration:
		return factory.UpdateMethodDeclaration(
			node.AsMethodDeclaration(),
			modifierArray,
			node.AsMethodDeclaration().AsteriskToken,
			node.Name(),
			node.AsMethodDeclaration().PostfixToken,
			node.TypeParameterList(),
			node.ParameterList(),
			node.Type(),
			node.AsMethodDeclaration().FullSignature,
			node.Body(),
		)
	case KindConstructor:
		return factory.UpdateConstructorDeclaration(
			node.AsConstructorDeclaration(),
			modifierArray,
			node.TypeParameterList(),
			node.ParameterList(),
			node.Type(),
			node.AsConstructorDeclaration().FullSignature,
			node.Body(),
		)
	case KindGetAccessor:
		return factory.UpdateGetAccessorDeclaration(
			node.AsGetAccessorDeclaration(),
			modifierArray,
			node.Name(),
			node.TypeParameterList(),
			node.ParameterList(),
			node.Type(),
			node.AsGetAccessorDeclaration().FullSignature,
			node.Body(),
		)
	case KindSetAccessor:
		return factory.UpdateSetAccessorDeclaration(
			node.AsSetAccessorDeclaration(),
			modifierArray,
			node.Name(),
			node.TypeParameterList(),
			node.ParameterList(),
			node.Type(),
			node.AsSetAccessorDeclaration().FullSignature,
			node.Body(),
		)
	case KindIndexSignature:
		return factory.UpdateIndexSignatureDeclaration(
			node.AsIndexSignatureDeclaration(),
			modifierArray,
			node.ParameterList(),
			node.Type(),
		)
	case KindFunctionExpression:
		return factory.UpdateFunctionExpression(
			node.AsFunctionExpression(),
			modifierArray,
			node.AsFunctionExpression().AsteriskToken,
			node.Name(),
			node.TypeParameterList(),
			node.ParameterList(),
			node.Type(),
			node.AsFunctionExpression().FullSignature,
			node.Body(),
		)
	case KindArrowFunction:
		return factory.UpdateArrowFunction(
			node.AsArrowFunction(),
			modifierArray,
			node.TypeParameterList(),
			node.ParameterList(),
			node.Type(),
			node.AsArrowFunction().FullSignature,
			node.AsArrowFunction().EqualsGreaterThanToken,
			node.Body(),
		)
	case KindClassExpression:
		return factory.UpdateClassExpression(
			node.AsClassExpression(),
			modifierArray,
			node.Name(),
			node.TypeParameterList(),
			node.AsClassExpression().HeritageClauses,
			node.MemberList(),
		)
	case KindVariableStatement:
		return factory.UpdateVariableStatement(
			node.AsVariableStatement(),
			modifierArray,
			node.AsVariableStatement().DeclarationList,
		)
	case KindFunctionDeclaration:
		return factory.UpdateFunctionDeclaration(
			node.AsFunctionDeclaration(),
			modifierArray,
			node.AsFunctionDeclaration().AsteriskToken,
			node.Name(),
			node.TypeParameterList(),
			node.ParameterList(),
			node.Type(),
			node.AsFunctionDeclaration().FullSignature,
			node.Body(),
		)
	case KindClassDeclaration:
		return factory.UpdateClassDeclaration(
			node.AsClassDeclaration(),
			modifierArray,
			node.Name(),
			node.TypeParameterList(),
			node.AsClassDeclaration().HeritageClauses,
			node.MemberList(),
		)
	case KindInterfaceDeclaration:
		return factory.UpdateInterfaceDeclaration(
			node.AsInterfaceDeclaration(),
			modifierArray,
			node.Name(),
			node.TypeParameterList(),
			node.AsInterfaceDeclaration().HeritageClauses,
			node.MemberList(),
		)
	case KindTypeAliasDeclaration:
		return factory.UpdateTypeAliasDeclaration(
			node.AsTypeAliasDeclaration(),
			modifierArray,
			node.Name(),
			node.TypeParameterList(),
			node.Type(),
		)
	case KindEnumDeclaration:
		return factory.UpdateEnumDeclaration(
			node.AsEnumDeclaration(),
			modifierArray,
			node.Name(),
			node.MemberList(),
		)
	case KindModuleDeclaration:
		return factory.UpdateModuleDeclaration(
			node.AsModuleDeclaration(),
			modifierArray,
			node.AsModuleDeclaration().Keyword,
			node.Name(),
			node.Body(),
		)
	case KindImportEqualsDeclaration:
		return factory.UpdateImportEqualsDeclaration(
			node.AsImportEqualsDeclaration(),
			modifierArray,
			node.IsTypeOnly(),
			node.Name(),
			node.AsImportEqualsDeclaration().ModuleReference,
		)
	case KindImportDeclaration:
		return factory.UpdateImportDeclaration(
			node.AsImportDeclaration(),
			modifierArray,
			node.AsImportDeclaration().ImportClause,
			node.AsImportDeclaration().ModuleSpecifier,
			node.AsImportDeclaration().Attributes,
		)
	case KindExportAssignment:
		return factory.UpdateExportAssignment(
			node.AsExportAssignment(),
			modifierArray,
			node.Type(),
			node.Expression(),
		)
	case KindExportDeclaration:
		return factory.UpdateExportDeclaration(
			node.AsExportDeclaration(),
			modifierArray,
			node.IsTypeOnly(),
			node.AsExportDeclaration().ExportClause,
			node.AsExportDeclaration().ModuleSpecifier,
			node.AsExportDeclaration().Attributes,
		)
	}
	panic(fmt.Sprintf("Node that does not have modifiers tried to have modifier replaced: %d", node.Kind))
}

func IsLateVisibilityPaintedStatement(node *Node) bool {
	switch node.Kind {
	case KindImportDeclaration,
		KindJSImportDeclaration,
		KindImportEqualsDeclaration,
		KindVariableStatement,
		KindClassDeclaration,
		KindFunctionDeclaration,
		KindModuleDeclaration,
		KindTypeAliasDeclaration,
		KindJSTypeAliasDeclaration,
		KindInterfaceDeclaration,
		KindEnumDeclaration:
		return true
	default:
		return false
	}
}

func IsExternalModuleAugmentation(node *Node) bool {
	return IsAmbientModule(node) && IsModuleAugmentationExternal(node)
}

func GetSourceFileOfModule(module *Symbol) *SourceFile {
	declaration := module.ValueDeclaration
	if declaration == nil {
		declaration = getNonAugmentationDeclaration(module)
	}
	return GetSourceFileOfNode(declaration)
}

func getNonAugmentationDeclaration(symbol *Symbol) *Node {
	return core.Find(symbol.Declarations, func(d *Node) bool {
		return !IsExternalModuleAugmentation(d) && !IsGlobalScopeAugmentation(d)
	})
}

func IsTypeDeclaration(node *Node) bool {
	switch node.Kind {
	case KindTypeParameter, KindClassDeclaration, KindInterfaceDeclaration, KindTypeAliasDeclaration, KindJSTypeAliasDeclaration, KindEnumDeclaration:
		return true
	case KindImportClause:
		return node.AsImportClause().IsTypeOnly
	case KindImportSpecifier:
		return node.Parent.Parent.AsImportClause().IsTypeOnly
	case KindExportSpecifier:
		return node.Parent.Parent.AsExportDeclaration().IsTypeOnly
	default:
		return false
	}
}

func IsTypeDeclarationName(name *Node) bool {
	return name.Kind == KindIdentifier &&
		IsTypeDeclaration(name.Parent) &&
		GetNameOfDeclaration(name.Parent) == name
}

func IsRightSideOfQualifiedNameOrPropertyAccess(node *Node) bool {
	parent := node.Parent
	switch parent.Kind {
	case KindQualifiedName:
		return parent.AsQualifiedName().Right == node
	case KindPropertyAccessExpression:
		return parent.AsPropertyAccessExpression().Name() == node
	case KindMetaProperty:
		return parent.AsMetaProperty().Name() == node
	}
	return false
}

func ShouldTransformImportCall(fileName string, options *core.CompilerOptions, impliedNodeFormatForEmit core.ModuleKind) bool {
	moduleKind := options.GetEmitModuleKind()
	if core.ModuleKindNode16 <= moduleKind && moduleKind <= core.ModuleKindNodeNext || moduleKind == core.ModuleKindPreserve {
		return false
	}
	return impliedNodeFormatForEmit < core.ModuleKindES2015
}

func HasQuestionToken(node *Node) bool {
	switch node.Kind {
	case KindParameter:
		return node.AsParameterDeclaration().QuestionToken != nil
	case KindMethodDeclaration:
		return IsQuestionToken(node.AsMethodDeclaration().PostfixToken)
	case KindShorthandPropertyAssignment:
		return IsQuestionToken(node.AsShorthandPropertyAssignment().PostfixToken)
	case KindMethodSignature:
		return IsQuestionToken(node.AsMethodSignatureDeclaration().PostfixToken)
	case KindPropertySignature:
		return IsQuestionToken(node.AsPropertySignatureDeclaration().PostfixToken)
	case KindPropertyAssignment:
		return IsQuestionToken(node.AsPropertyAssignment().PostfixToken)
	case KindPropertyDeclaration:
		return IsQuestionToken(node.AsPropertyDeclaration().PostfixToken)
	}
	return false
}

func IsJsxOpeningLikeElement(node *Node) bool {
	return IsJsxOpeningElement(node) || IsJsxSelfClosingElement(node)
}

func GetInvokedExpression(node *Node) *Node {
	switch node.Kind {
	case KindTaggedTemplateExpression:
		return node.AsTaggedTemplateExpression().Tag
	case KindJsxOpeningElement, KindJsxSelfClosingElement:
		return node.TagName()
	case KindBinaryExpression:
		return node.AsBinaryExpression().Right
	case KindJsxOpeningFragment:
		return node
	default:
		return node.Expression()
	}
}

func IsCallOrNewExpression(node *Node) bool {
	return IsCallExpression(node) || IsNewExpression(node)
}

func IndexOfNode(nodes []*Node, node *Node) int {
	index, ok := slices.BinarySearchFunc(nodes, node, compareNodePositions)
	if ok {
		return index
	}
	return -1
}

func compareNodePositions(n1, n2 *Node) int {
	return n1.Pos() - n2.Pos()
}

func IsUnterminatedLiteral(node *Node) bool {
	return IsLiteralKind(node.Kind) && node.LiteralLikeData().TokenFlags&TokenFlagsUnterminated != 0 ||
		IsTemplateLiteralKind(node.Kind) && node.TemplateLiteralLikeData().TemplateFlags&TokenFlagsUnterminated != 0
}

// Gets a value indicating whether a class element is either a static or an instance property declaration with an initializer.
func IsInitializedProperty(member *ClassElement) bool {
	return member.Kind == KindPropertyDeclaration &&
		member.Initializer() != nil
}

func IsTrivia(token Kind) bool {
	return KindFirstTriviaToken <= token && token <= KindLastTriviaToken
}

func HasDecorators(node *Node) bool {
	return HasSyntacticModifier(node, ModifierFlagsDecorator)
}

type hasFileNameImpl struct {
	fileName string
	path     tspath.Path
}

func NewHasFileName(fileName string, path tspath.Path) HasFileName {
	return &hasFileNameImpl{
		fileName: fileName,
		path:     path,
	}
}

func (h *hasFileNameImpl) FileName() string {
	return h.fileName
}

func (h *hasFileNameImpl) Path() tspath.Path {
	return h.path
}

func GetSemanticJsxChildren(children []*JsxChild) []*JsxChild {
	return core.Filter(children, func(i *JsxChild) bool {
		switch i.Kind {
		case KindJsxExpression:
			return i.Expression() != nil
		case KindJsxText:
			return !i.AsJsxText().ContainsOnlyTriviaWhiteSpaces
		default:
			return true
		}
	})
}

// Returns true if the node kind has a comment property.
func hasComment(kind Kind) bool {
	switch kind {
	case KindJSDoc, KindJSDocTag, KindJSDocAugmentsTag, KindJSDocImplementsTag,
		KindJSDocDeprecatedTag, KindJSDocPublicTag, KindJSDocPrivateTag, KindJSDocProtectedTag,
		KindJSDocReadonlyTag, KindJSDocOverrideTag, KindJSDocCallbackTag, KindJSDocOverloadTag,
		KindJSDocParameterTag, KindJSDocPropertyTag, KindJSDocReturnTag, KindJSDocThisTag,
		KindJSDocTypeTag, KindJSDocTemplateTag, KindJSDocTypedefTag, KindJSDocSeeTag,
		KindJSDocSatisfiesTag, KindJSDocImportTag:
		return true
	default:
		return false
	}
}

func IsAssignmentPattern(node *Node) bool {
	return node.Kind == KindArrayLiteralExpression || node.Kind == KindObjectLiteralExpression
}

func GetElementsOfBindingOrAssignmentPattern(name *Node) []*Node {
	switch name.Kind {
	case KindObjectBindingPattern, KindArrayBindingPattern:
		// `a` in `{a}`
		// `a` in `[a]`
		return name.AsBindingPattern().Elements.Nodes
	case KindArrayLiteralExpression:
		// `a` in `[a]`
		return name.AsArrayLiteralExpression().Elements.Nodes
	case KindObjectLiteralExpression:
		// `a` in `{a}`
		return name.AsObjectLiteralExpression().Properties.Nodes
	}
	return nil
}

func IsDeclarationBindingElement(bindingElement *Node) bool {
	switch bindingElement.Kind {
	case KindVariableDeclaration, KindParameter, KindBindingElement:
		return true
	default:
		return false
	}
}

/**
 * Gets the name of an BindingOrAssignmentElement.
 */
func GetTargetOfBindingOrAssignmentElement(bindingElement *Node) *Node {
	if IsDeclarationBindingElement(bindingElement) {
		// `a` in `let { a } = ...`
		// `a` in `let { a = 1 } = ...`
		// `b` in `let { a: b } = ...`
		// `b` in `let { a: b = 1 } = ...`
		// `a` in `let { ...a } = ...`
		// `{b}` in `let { a: {b} } = ...`
		// `{b}` in `let { a: {b} = 1 } = ...`
		// `[b]` in `let { a: [b] } = ...`
		// `[b]` in `let { a: [b] = 1 } = ...`
		// `a` in `let [a] = ...`
		// `a` in `let [a = 1] = ...`
		// `a` in `let [...a] = ...`
		// `{a}` in `let [{a}] = ...`
		// `{a}` in `let [{a} = 1] = ...`
		// `[a]` in `let [[a]] = ...`
		// `[a]` in `let [[a] = 1] = ...`
		return bindingElement.Name()
	}

	if IsObjectLiteralElement(bindingElement) {
		switch bindingElement.Kind {
		case KindPropertyAssignment:
			// `b` in `({ a: b } = ...)`
			// `b` in `({ a: b = 1 } = ...)`
			// `{b}` in `({ a: {b} } = ...)`
			// `{b}` in `({ a: {b} = 1 } = ...)`
			// `[b]` in `({ a: [b] } = ...)`
			// `[b]` in `({ a: [b] = 1 } = ...)`
			// `b.c` in `({ a: b.c } = ...)`
			// `b.c` in `({ a: b.c = 1 } = ...)`
			// `b[0]` in `({ a: b[0] } = ...)`
			// `b[0]` in `({ a: b[0] = 1 } = ...)`
			return GetTargetOfBindingOrAssignmentElement(bindingElement.Initializer())
		case KindShorthandPropertyAssignment:
			// `a` in `({ a } = ...)`
			// `a` in `({ a = 1 } = ...)`
			return bindingElement.Name()
		case KindSpreadAssignment:
			// `a` in `({ ...a } = ...)`
			return GetTargetOfBindingOrAssignmentElement(bindingElement.AsSpreadAssignment().Expression)
		}

		// no target
		return nil
	}

	if IsAssignmentExpression(bindingElement /*excludeCompoundAssignment*/, true) {
		// `a` in `[a = 1] = ...`
		// `{a}` in `[{a} = 1] = ...`
		// `[a]` in `[[a] = 1] = ...`
		// `a.b` in `[a.b = 1] = ...`
		// `a[0]` in `[a[0] = 1] = ...`
		return GetTargetOfBindingOrAssignmentElement(bindingElement.AsBinaryExpression().Left)
	}

	if IsSpreadElement(bindingElement) {
		// `a` in `[...a] = ...`
		return GetTargetOfBindingOrAssignmentElement(bindingElement.AsSpreadElement().Expression)
	}

	// `a` in `[a] = ...`
	// `{a}` in `[{a}] = ...`
	// `[a]` in `[[a]] = ...`
	// `a.b` in `[a.b] = ...`
	// `a[0]` in `[a[0]] = ...`
	return bindingElement
}

func TryGetPropertyNameOfBindingOrAssignmentElement(bindingElement *Node) *Node {
	switch bindingElement.Kind {
	case KindBindingElement:
		// `a` in `let { a: b } = ...`
		// `[a]` in `let { [a]: b } = ...`
		// `"a"` in `let { "a": b } = ...`
		// `1` in `let { 1: b } = ...`
		if bindingElement.AsBindingElement().PropertyName != nil {
			propertyName := bindingElement.AsBindingElement().PropertyName
			// if ast.IsPrivateIdentifier(propertyName) {
			// 	return Debug.failBadSyntaxKind(propertyName) // !!!
			// }
			if IsComputedPropertyName(propertyName) && IsStringOrNumericLiteralLike(propertyName.AsComputedPropertyName().Expression) {
				return propertyName.AsComputedPropertyName().Expression
			}
			return propertyName
		}
	case KindPropertyAssignment:
		// `a` in `({ a: b } = ...)`
		// `[a]` in `({ [a]: b } = ...)`
		// `"a"` in `({ "a": b } = ...)`
		// `1` in `({ 1: b } = ...)`
		if bindingElement.Name() != nil {
			propertyName := bindingElement.Name()
			// if ast.IsPrivateIdentifier(propertyName) {
			// 	return Debug.failBadSyntaxKind(propertyName) // !!!
			// }
			if IsComputedPropertyName(propertyName) && IsStringOrNumericLiteralLike(propertyName.AsComputedPropertyName().Expression) {
				return propertyName.AsComputedPropertyName().Expression
			}
			return propertyName
		}
	case KindSpreadAssignment:
		// `a` in `({ ...a } = ...)`
		// if ast.IsPrivateIdentifier(bindingElement.Name()) {
		// 	return Debug.failBadSyntaxKind(bindingElement.Name()) // !!!
		// }
		return bindingElement.Name()
	}

	target := GetTargetOfBindingOrAssignmentElement(bindingElement)
	if target != nil && IsPropertyName(target) {
		return target
	}
	return nil
}

/**
 * Walk an AssignmentPattern to determine if it contains object rest (`...`) syntax. We cannot rely on
 * propagation of `TransformFlags.ContainsObjectRestOrSpread` since it isn't propagated by default in
 * ObjectLiteralExpression and ArrayLiteralExpression since we do not know whether they belong to an
 * AssignmentPattern at the time the nodes are parsed.
 */
func ContainsObjectRestOrSpread(node *Node) bool {
	if node.SubtreeFacts()&SubtreeContainsObjectRestOrSpread != 0 {
		return true
	}
	if node.SubtreeFacts()&SubtreeContainsESObjectRestOrSpread != 0 {
		// check for nested spread assignments, otherwise '{ x: { a, ...b } = foo } = c'
		// will not be correctly interpreted by the rest/spread transformer
		for _, element := range GetElementsOfBindingOrAssignmentPattern(node) {
			target := GetTargetOfBindingOrAssignmentElement(element)
			if target != nil && IsAssignmentPattern(target) {
				if target.SubtreeFacts()&SubtreeContainsObjectRestOrSpread != 0 {
					return true
				}
				if target.SubtreeFacts()&SubtreeContainsESObjectRestOrSpread != 0 {
					if ContainsObjectRestOrSpread(target) {
						return true
					}
				}
			}
		}
	}
	return false
}

func IsEmptyObjectLiteral(expression *Node) bool {
	return expression.Kind == KindObjectLiteralExpression && len(expression.AsObjectLiteralExpression().Properties.Nodes) == 0
}

func IsEmptyArrayLiteral(expression *Node) bool {
	return expression.Kind == KindArrayLiteralExpression && len(expression.AsArrayLiteralExpression().Elements.Nodes) == 0
}

func GetRestIndicatorOfBindingOrAssignmentElement(bindingElement *Node) *Node {
	switch bindingElement.Kind {
	case KindParameter:
		return bindingElement.AsParameterDeclaration().DotDotDotToken
	case KindBindingElement:
		return bindingElement.AsBindingElement().DotDotDotToken
	case KindSpreadElement, KindSpreadAssignment:
		return bindingElement
	}
	return nil
}
