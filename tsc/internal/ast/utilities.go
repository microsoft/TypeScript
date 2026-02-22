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
	for IsAssignmentExpression(node, false /*excludeCompoundAssignment*/) {
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
			if parent.Initializer() == node {
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
			node = node.Expression()
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
		return parent.PropertyName() == node
	case KindImportSpecifier:
		return parent.PropertyName() == node
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
	return node.QuestionDotToken()
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
		return lookInLabeledStatements && IsIterationStatement(node.Statement(), lookInLabeledStatements)
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

func IsClassOrInterfaceLike(node *Node) bool {
	return node.Kind == KindClassDeclaration || node.Kind == KindClassExpression || node.Kind == KindInterfaceDeclaration
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

func IsMethodOrAccessor(node *Node) bool {
	switch node.Kind {
	case KindMethodDeclaration, KindGetAccessor, KindSetAccessor:
		return true
	}
	return false
}

func IsPrivateIdentifierClassElementDeclaration(node *Node) bool {
	return (IsPropertyDeclaration(node) || IsMethodOrAccessor(node)) && IsPrivateIdentifier(node.Name())
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
		node.Expression().Kind == KindStringLiteral
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
		node = node.Type()
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

// GetJSDocDeprecatedTag returns the first @deprecated JSDoc tag for the given node, or nil if none exists.
func GetJSDocDeprecatedTag(node *Node) *Node {
	for _, jsdoc := range node.JSDoc(nil) {
		tags := jsdoc.AsJSDoc().Tags
		if tags != nil {
			for _, tag := range tags.Nodes {
				if IsJSDocDeprecatedTag(tag) {
					return tag
				}
			}
		}
	}
	return nil
}

// IsDeprecatedDeclaration reports whether the given declaration is marked as @deprecated.
// It checks NodeFlagsPossiblyContainsDeprecatedTag on combined node flags, then confirms
// by walking up to find the node with the flag and performing a JSDoc lookup.
func IsDeprecatedDeclaration(declaration *Node) bool {
	return IsDeprecatedDeclarationWithCachedFlags(declaration, GetCombinedNodeFlags(declaration))
}

// IsDeprecatedDeclarationWithCachedFlags is the core logic for IsDeprecatedDeclaration,
// parameterized on pre-computed combined flags so the checker can supply cached flags.
func IsDeprecatedDeclarationWithCachedFlags(declaration *Node, combinedFlags NodeFlags) bool {
	if combinedFlags&NodeFlagsPossiblyContainsDeprecatedTag == 0 {
		return false
	}
	// Walk up to find the node that directly has the flag, since JSDoc is
	// attached to that node (e.g. VariableStatement, not VariableDeclaration).
	for n := declaration; n != nil; n = n.Parent {
		if n.Flags&NodeFlagsPossiblyContainsDeprecatedTag != 0 {
			return GetJSDocDeprecatedTag(n) != nil
		}
	}
	return false
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
		return node.AsMetaProperty().KeywordToken == KindImportKeyword && node.AsMetaProperty().Name().Text() == "meta"
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

func IsVoidZero(node *Node) bool {
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
			IsBindableStaticAccessExpression(node.Expression(), true /*excludeThisKeyword*/))
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
		return GetAssignedName(declaration)
	}
	return nil
}

func GetNonAssignedNameOfDeclaration(declaration *Node) *Node {
	// !!!
	switch declaration.Kind {
	case KindBinaryExpression, KindCallExpression:
		switch GetAssignmentDeclarationKind(declaration) {
		case JSDeclarationKindProperty, JSDeclarationKindThisProperty, JSDeclarationKindExportsProperty:
			left := declaration.AsBinaryExpression().Left
			if name := GetElementOrPropertyAccessName(left); name != nil {
				return name
			}
			return left
		case JSDeclarationKindObjectDefinePropertyValue, JSDeclarationKindObjectDefinePropertyExports:
			return declaration.Arguments()[1]
		}
		return nil
	case KindExportAssignment, KindJSExportAssignment:
		expr := declaration.Expression()
		if IsIdentifier(expr) {
			return expr
		}
		return nil
	}
	return declaration.Name()
}

func GetAssignedName(node *Node) *Node {
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
	// module.exports = expr
	JSDeclarationKindModuleExports
	// exports.name = expr
	// module.exports.name = expr
	JSDeclarationKindExportsProperty
	// this.name = expr
	JSDeclarationKindThisProperty
	// F.name = expr, F[name] = expr, in JS or TS file
	JSDeclarationKindProperty
	// Object.defineProperty(x, 'name', { value: any, writable?: boolean (false by default) });
	// Object.defineProperty(x, 'name', { get: Function, set: Function });
	// Object.defineProperty(x, 'name', { get: Function });
	// Object.defineProperty(x, 'name', { set: Function });
	JSDeclarationKindObjectDefinePropertyValue
	// Object.defineProperty(exports || module.exports, 'name', ...);
	JSDeclarationKindObjectDefinePropertyExports
)

func GetAssignmentDeclarationKind(node *Node) JSDeclarationKind {
	switch node.Kind {
	case KindBinaryExpression:
		bin := node.AsBinaryExpression()
		if bin.OperatorToken.Kind == KindEqualsToken && IsAccessExpression(bin.Left) {
			if IsInJSFile(bin.Left) {
				if IsModuleExportsAccessExpression(bin.Left) {
					return JSDeclarationKindModuleExports
				}
				if (IsModuleExportsAccessExpression(bin.Left.Expression()) || IsExportsIdentifier(bin.Left.Expression())) &&
					GetElementOrPropertyAccessName(bin.Left) != nil {
					return JSDeclarationKindExportsProperty
				}
				if bin.Left.Expression().Kind == KindThisKeyword {
					return JSDeclarationKindThisProperty
				}
			}
			if bin.Left.Kind == KindPropertyAccessExpression && IsEntityNameExpressionEx(bin.Left.Expression(), IsInJSFile(bin.Left)) && IsIdentifier(bin.Left.Name()) ||
				bin.Left.Kind == KindElementAccessExpression && IsEntityNameExpressionEx(bin.Left.Expression(), IsInJSFile(bin.Left)) {
				return JSDeclarationKindProperty
			}
		}
	case KindCallExpression:
		if IsInJSFile(node) && IsBindableObjectDefinePropertyCall(node) {
			entityName := node.Arguments()[0]
			if IsExportsIdentifier(entityName) || IsModuleExportsAccessExpression(entityName) {
				return JSDeclarationKindObjectDefinePropertyExports
			}
			return JSDeclarationKindObjectDefinePropertyValue
		}
	}
	return JSDeclarationKindNone
}

func IsBindableObjectDefinePropertyCall(node *Node) bool {
	if args := node.Arguments(); len(args) == 3 {
		if expr := node.Expression(); IsPropertyAccessExpression(expr) &&
			IsIdentifier(expr.Expression()) && expr.Expression().Text() == "Object" &&
			expr.Name().Text() == "defineProperty" &&
			IsStringOrNumericLiteralLike(args[1]) &&
			IsBindableStaticNameExpression(args[0] /*excludeThisKeyword*/, true) {
			return true
		}
	}
	return false
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
		expr = name.Expression()
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
	return IsIdentifier(node) ||
		IsPropertyAccessEntityNameExpression(node, allowJS) ||
		allowJS && (node.Kind == KindThisKeyword || isElementAccessEntityNameExpression(node, allowJS))
}

func IsPropertyAccessEntityNameExpression(node *Node, allowJS bool) bool {
	return IsPropertyAccessExpression(node) && node.Name().Kind == KindIdentifier && IsEntityNameExpressionEx(node.Expression(), allowJS)
}

func isElementAccessEntityNameExpression(node *Node, allowJS bool) bool {
	return IsElementAccessExpression(node) && IsStringOrNumericLiteralLike(node.AsElementAccessExpression().ArgumentExpression) && IsEntityNameExpressionEx(node.Expression(), allowJS)
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
			HasSamePropertyAccessName(node1.Expression(), node2.Expression())
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
		if IsCallExpression(parent) && parent.Expression() == prev {
			return parent
		}
	}
	return nil
}

func IsEnumConst(node *Node) bool {
	return GetCombinedModifierFlags(node)&ModifierFlagsConst != 0
}

func ExportAssignmentIsAlias(node *Node) bool {
	e := node.Expression()
	return IsEntityNameExpression(e) || IsClassExpression(e)
}

func IsInstanceOfExpression(node *Node) bool {
	return IsBinaryExpression(node) && node.AsBinaryExpression().OperatorToken.Kind == KindInstanceOfKeyword
}

func IsAnyImportOrReExport(node *Node) bool {
	return IsImportNode(node) || IsExportDeclaration(node)
}

func IsImportNode(node *Node) bool {
	return IsAnyImportSyntax(node) || NodeKindIs(node, KindJSImportDeclaration)
}

// Checks if the node is a genuine import declation. In particular the re-parsed KindJSImportDeclaration
// is explicitly excluded because the callers of this function are typically not prepared to handle it properly.
// For more permissive check, use IsImportNode.
func IsAnyImportSyntax(node *Node) bool {
	return NodeKindIs(node, KindImportDeclaration, KindImportEqualsDeclaration)
}

func IsJsonSourceFile(file *SourceFile) bool {
	return file.ScriptKind == core.ScriptKindJSON
}

func IsInJsonFile(node *Node) bool {
	return node.Flags&NodeFlagsJsonFile != 0
}

func GetExternalModuleName(node *Node) *Expression {
	switch node.Kind {
	case KindImportDeclaration, KindJSImportDeclaration, KindExportDeclaration:
		return node.ModuleSpecifier()
	case KindImportEqualsDeclaration:
		if node.AsImportEqualsDeclaration().ModuleReference.Kind == KindExternalModuleReference {
			return node.AsImportEqualsDeclaration().ModuleReference.Expression()
		}
		return nil
	case KindImportType:
		return getImportTypeNodeLiteral(node)
	case KindCallExpression:
		return core.FirstOrNil(node.Arguments())
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
		KindJsxFragment, KindYieldExpression, KindAwaitExpression:
		return true
	case KindMetaProperty:
		// `import.defer` in `import.defer(...)` is not an expression
		return !IsImportCall(node.Parent) || node.Parent.Expression() != node
	case KindExpressionWithTypeArguments:
		return !IsHeritageClause(node.Parent)
	case KindQualifiedName:
		for node.Parent.Kind == KindQualifiedName {
			node = node.Parent
		}
		return IsTypeQueryNode(node.Parent) || IsJSDocLinkLike(node.Parent) || IsJSDocNameReference(node.Parent) || IsJsxTagName(node)
	case KindPrivateIdentifier:
		return IsBinaryExpression(node.Parent) && node.Parent.AsBinaryExpression().Left == node && node.Parent.AsBinaryExpression().OperatorToken.Kind == KindInKeyword
	case KindIdentifier:
		if IsTypeQueryNode(node.Parent) || IsJSDocLinkLike(node.Parent) || IsJSDocNameReference(node.Parent) || IsJsxTagName(node) {
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
	case KindVariableDeclaration, KindParameter, KindPropertyDeclaration, KindPropertySignature, KindEnumMember, KindPropertyAssignment, KindBindingElement:
		return parent.Initializer() == node
	case KindExpressionStatement, KindIfStatement, KindDoStatement, KindWhileStatement, KindReturnStatement, KindWithStatement, KindSwitchStatement,
		KindCaseClause, KindDefaultClause, KindThrowStatement, KindTypeAssertionExpression, KindAsExpression, KindTemplateSpan, KindComputedPropertyName,
		KindSatisfiesExpression:
		return parent.Expression() == node
	case KindForStatement:
		s := parent.AsForStatement()
		return s.Initializer == node && s.Initializer.Kind != KindVariableDeclarationList || s.Condition == node || s.Incrementor == node
	case KindForInStatement, KindForOfStatement:
		s := parent.AsForInOrOfStatement()
		return s.Initializer == node && s.Initializer.Kind != KindVariableDeclarationList || s.Expression == node
	case KindDecorator, KindJsxExpression, KindJsxSpreadAttribute, KindSpreadAssignment:
		return true
	case KindExpressionWithTypeArguments:
		return parent.Expression() == node && !IsPartOfTypeNode(parent)
	case KindShorthandPropertyAssignment:
		return parent.AsShorthandPropertyAssignment().ObjectAssignmentInitializer == node
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
	return IsHeritageClause(parent) && (!IsClassLike(parent.Parent) || parent.AsHeritageClause().Token == KindImplementsKeyword) ||
		IsJSDocImplementsTag(parent) ||
		IsJSDocAugmentsTag(parent)
}

func IsJSDocLinkLike(node *Node) bool {
	return NodeKindIs(node, KindJSDocLink, KindJSDocLinkCode, KindJSDocLinkPlain)
}

func IsJSDocTag(node *Node) bool {
	return node.Kind >= KindFirstJSDocTagNode && node.Kind <= KindLastJSDocTagNode
}

func IsSuperCall(node *Node) bool {
	return IsCallExpression(node) && node.Expression().Kind == KindSuperKeyword
}

func IsImportCall(node *Node) bool {
	if !IsCallExpression(node) {
		return false
	}
	e := node.Expression()
	return e.Kind == KindImportKeyword || IsMetaProperty(e) && e.AsMetaProperty().KeywordToken == KindImportKeyword && e.Text() == "defer"
}

func IsComputedNonLiteralName(name *Node) bool {
	return IsComputedPropertyName(name) && !IsStringOrNumericLiteralLike(name.Expression())
}

func IsQuestionToken(node *Node) bool {
	return node != nil && node.Kind == KindQuestionToken
}

func EntityNameToString(name *Node, getTextOfNode func(*Node) string) string {
	switch name.Kind {
	case KindThisKeyword:
		return "this"
	case KindIdentifier, KindPrivateIdentifier:
		if NodeIsSynthesized(name) || getTextOfNode == nil {
			return name.Text()
		}
		return getTextOfNode(name)
	case KindQualifiedName:
		return EntityNameToString(name.AsQualifiedName().Left, getTextOfNode) + "." + EntityNameToString(name.AsQualifiedName().Right, getTextOfNode)
	case KindPropertyAccessExpression:
		return EntityNameToString(name.Expression(), getTextOfNode) + "." + EntityNameToString(name.AsPropertyAccessExpression().Name(), getTextOfNode)
	case KindJsxNamespacedName:
		return EntityNameToString(name.AsJsxNamespacedName().Namespace, getTextOfNode) + ":" + EntityNameToString(name.AsJsxNamespacedName().Name(), getTextOfNode)
	}
	panic("Unhandled case in EntityNameToString")
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
			for _, specifier := range decl.ExportClause.Elements() {
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
	name := node.PropertyNameOrName()
	if name.Kind != KindIdentifier {
		// Skip for invalid syntax like this: export { "x" }
		return ModuleInstanceStateInstantiated
	}
	for ancestors, p := popAncestor(ancestors, node); p != nil; ancestors, p = popAncestor(ancestors, p) {
		if IsBlock(p) || IsModuleBlock(p) || IsSourceFile(p) {
			found := ModuleInstanceStateUnknown
			statementsAncestors := pushAncestor(ancestors, p)
			for _, statement := range p.Statements() {
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

func IsInstantiatedModule(node *Node, preserveConstEnums bool) bool {
	moduleState := GetModuleInstanceState(node)
	return moduleState == ModuleInstanceStateInstantiated ||
		(preserveConstEnums && moduleState == ModuleInstanceStateConstEnumOnly)
}

func NodeHasName(statement *Node, id *Node) bool {
	name := statement.Name()
	if name != nil {
		return IsIdentifier(name) && name.Text() == id.Text()
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

func IsConstAssertion(node *Node) bool {
	switch node.Kind {
	case KindAsExpression, KindTypeAssertionExpression:
		return IsConstTypeReference(node.Type())
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
	for _, member := range node.Members() {
		if IsConstructorDeclaration(member) && NodeIsPresent(member.Body()) {
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
		importClause := node.ImportClause()
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
		importClause := node.ImportClause()
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

// Returns a token if position is in [start-of-leading-trivia, end), includes JSDoc only if requested
func GetNodeAtPosition(file *SourceFile, position int, includeJSDoc bool) *Node {
	current := file.AsNode()
	for {
		var child *Node
		if includeJSDoc {
			for _, jsdoc := range current.JSDoc(file) {
				if nodeContainsPosition(jsdoc, position) {
					child = jsdoc
					break
				}
			}
		}
		if child == nil {
			current.ForEachChild(func(node *Node) bool {
				if nodeContainsPosition(node, position) && node.Kind != KindJSExportAssignment && node.Kind != KindCommonJSExport {
					child = node
					return true
				}
				return false
			})
		}
		if child == nil || IsMetaProperty(child) {
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
			return index, size
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
		node.Initializer() != nil &&
		node.Type() == nil &&
		IsRequireCall(node.Initializer(), true /*requireStringLiteralLikeArgument*/)
}

func IsModuleExportsAccessExpression(node *Node) bool {
	if IsAccessExpression(node) && IsModuleIdentifier(node.Expression()) {
		if name := GetElementOrPropertyAccessName(node); name != nil {
			return name.Text() == "exports"
		}
	}
	return false
}

func IsModuleExportsQualifiedName(node *Node) bool {
	return IsQualifiedName(node) && IsModuleIdentifier(node.AsQualifiedName().Left) && node.AsQualifiedName().Right.Text() == "exports"
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
		return node.IsTypeOnly() || node.Parent.Parent.IsTypeOnly()
	case KindNamespaceImport:
		return node.Parent.IsTypeOnly()
	case KindImportClause, KindImportEqualsDeclaration:
		return node.IsTypeOnly()
	}
	return false
}

func isTypeOnlyExportDeclaration(node *Node) bool {
	switch node.Kind {
	case KindExportSpecifier:
		return node.IsTypeOnly() || node.Parent.Parent.IsTypeOnly()
	case KindExportDeclaration:
		d := node.AsExportDeclaration()
		return d.IsTypeOnly && d.ModuleSpecifier != nil && d.ExportClause == nil
	case KindNamespaceExport:
		return node.Parent.IsTypeOnly()
	}
	return false
}

func IsTypeOnlyImportOrExportDeclaration(node *Node) bool {
	return IsTypeOnlyImportDeclaration(node) || isTypeOnlyExportDeclaration(node)
}

func IsExclusivelyTypeOnlyImportOrExport(node *Node) bool {
	switch node.Kind {
	case KindExportDeclaration:
		return node.IsTypeOnly()
	case KindImportDeclaration, KindJSImportDeclaration:
		if importClause := node.ImportClause(); importClause != nil {
			return importClause.AsImportClause().IsTypeOnly()
		}
	case KindJSDocImportTag:
		if importClause := node.ImportClause(); importClause != nil {
			return importClause.AsImportClause().IsTypeOnly()
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
	if visitNodes(v, node.JSDoc(sourceFile)) {
		return true
	}
	return node.ForEachChild(v)
}

func HasTypeArguments(node *Node) bool {
	switch node.Kind {
	case KindCallExpression, KindNewExpression, KindTaggedTemplateExpression,
		KindTypeReference, KindExpressionWithTypeArguments, KindImportType,
		KindTypeQuery, KindJsxOpeningElement, KindJsxSelfClosingElement:
		return true
	}
	return false
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
		nameExpression := name.Expression()
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
		return node.ImportClause() != nil && !node.ImportClause().IsTypeOnly()
	case KindExportDeclaration, KindImportEqualsDeclaration:
		return !node.IsTypeOnly()
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
	return node.AsImportEqualsDeclaration().ModuleReference.Expression()
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
			node.QuestionToken(),
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
			node.PostfixToken(),
			node.Type(),
			node.Initializer(),
		)
	case KindPropertyDeclaration:
		return factory.UpdatePropertyDeclaration(
			node.AsPropertyDeclaration(),
			modifierArray,
			node.Name(),
			node.PostfixToken(),
			node.Type(),
			node.Initializer(),
		)
	case KindMethodSignature:
		return factory.UpdateMethodSignatureDeclaration(
			node.AsMethodSignatureDeclaration(),
			modifierArray,
			node.Name(),
			node.PostfixToken(),
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
			node.PostfixToken(),
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
			node.ImportClause(),
			node.ModuleSpecifier(),
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
			node.ModuleSpecifier(),
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
		declaration = GetNonAugmentationDeclaration(module)
	}
	return GetSourceFileOfNode(declaration)
}

func GetNonAugmentationDeclaration(symbol *Symbol) *Node {
	return core.Find(symbol.Declarations, func(d *Node) bool {
		return !IsExternalModuleAugmentation(d) && !IsGlobalScopeAugmentation(d)
	})
}

func IsTypeDeclaration(node *Node) bool {
	switch node.Kind {
	case KindTypeParameter, KindClassDeclaration, KindInterfaceDeclaration, KindTypeAliasDeclaration, KindJSTypeAliasDeclaration, KindEnumDeclaration:
		return true
	case KindImportClause:
		return node.IsTypeOnly()
	case KindImportSpecifier, KindExportSpecifier:
		return node.Parent.Parent.IsTypeOnly()
	default:
		return false
	}
}

func IsTypeDeclarationName(name *Node) bool {
	return name.Kind == KindIdentifier &&
		IsTypeDeclaration(name.Parent) &&
		GetNameOfDeclaration(name.Parent) == name
}

func IsRightSideOfPropertyAccess(node *Node) bool {
	return node.Parent.Kind == KindPropertyAccessExpression && node.Parent.Name() == node
}

func IsArgumentExpressionOfElementAccess(node *Node) bool {
	return node.Parent != nil && node.Parent.Kind == KindElementAccessExpression && node.Parent.AsElementAccessExpression().ArgumentExpression == node
}

func ClimbPastPropertyAccess(node *Node) *Node {
	if IsRightSideOfPropertyAccess(node) {
		return node.Parent
	}
	return node
}

func climbPastPropertyOrElementAccess(node *Node) *Node {
	if IsRightSideOfPropertyAccess(node) || IsArgumentExpressionOfElementAccess(node) {
		return node.Parent
	}
	return node
}

func selectExpressionOfCallOrNewExpressionOrDecorator(node *Node) *Node {
	if IsCallExpression(node) || IsNewExpression(node) || IsDecorator(node) {
		return node.Expression()
	}
	return nil
}

func selectTagOfTaggedTemplateExpression(node *Node) *Node {
	if IsTaggedTemplateExpression(node) {
		return node.AsTaggedTemplateExpression().Tag
	}
	return nil
}

func selectTagNameOfJsxOpeningLikeElement(node *Node) *Node {
	if IsJsxOpeningElement(node) || IsJsxSelfClosingElement(node) {
		return node.TagName()
	}
	return nil
}

func IsCallExpressionTarget(node *Node, includeElementAccess bool, skipPastOuterExpressions bool) bool {
	return isCalleeWorker(node, IsCallExpression, selectExpressionOfCallOrNewExpressionOrDecorator, includeElementAccess, skipPastOuterExpressions)
}

func IsNewExpressionTarget(node *Node, includeElementAccess bool, skipPastOuterExpressions bool) bool {
	return isCalleeWorker(node, IsNewExpression, selectExpressionOfCallOrNewExpressionOrDecorator, includeElementAccess, skipPastOuterExpressions)
}

func IsCallOrNewExpressionTarget(node *Node, includeElementAccess bool, skipPastOuterExpressions bool) bool {
	return isCalleeWorker(node, IsCallOrNewExpression, selectExpressionOfCallOrNewExpressionOrDecorator, includeElementAccess, skipPastOuterExpressions)
}

func IsTaggedTemplateTag(node *Node, includeElementAccess bool, skipPastOuterExpressions bool) bool {
	return isCalleeWorker(node, IsTaggedTemplateExpression, selectTagOfTaggedTemplateExpression, includeElementAccess, skipPastOuterExpressions)
}

func IsDecoratorTarget(node *Node, includeElementAccess bool, skipPastOuterExpressions bool) bool {
	return isCalleeWorker(node, IsDecorator, selectExpressionOfCallOrNewExpressionOrDecorator, includeElementAccess, skipPastOuterExpressions)
}

func IsJsxOpeningLikeElementTagName(node *Node, includeElementAccess bool, skipPastOuterExpressions bool) bool {
	return isCalleeWorker(node, IsJsxOpeningLikeElement, selectTagNameOfJsxOpeningLikeElement, includeElementAccess, skipPastOuterExpressions)
}

func isCalleeWorker(
	node *Node,
	pred func(*Node) bool,
	calleeSelector func(*Node) *Node,
	includeElementAccess bool,
	skipPastOuterExpressions bool,
) bool {
	var target *Node
	if includeElementAccess {
		target = climbPastPropertyOrElementAccess(node)
	} else {
		target = ClimbPastPropertyAccess(node)
	}
	if skipPastOuterExpressions {
		// Only skip outer expressions if the target is actually an expression node
		if IsExpression(target) {
			target = SkipOuterExpressions(target, OEKAll)
		}
	}
	return target != nil && target.Parent != nil && pred(target.Parent) && calleeSelector(target.Parent) == target
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
	return IsQuestionToken(node.QuestionToken())
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
	index, ok := slices.BinarySearchFunc(nodes, node, CompareNodePositions)
	if ok {
		return index
	}
	return -1
}

func CompareNodePositions(n1, n2 *Node) int {
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
	case KindObjectBindingPattern, KindArrayBindingPattern, KindArrayLiteralExpression:
		// `a` in `{a}`
		// `a` in `[a]`
		return name.Elements()
	case KindObjectLiteralExpression:
		// `a` in `{a}`
		return name.Properties()
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
			return GetTargetOfBindingOrAssignmentElement(bindingElement.Expression())
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
		return GetTargetOfBindingOrAssignmentElement(bindingElement.Expression())
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
		if bindingElement.PropertyName() != nil {
			propertyName := bindingElement.PropertyName()
			// if ast.IsPrivateIdentifier(propertyName) {
			// 	return Debug.failBadSyntaxKind(propertyName) // !!!
			// }
			if IsComputedPropertyName(propertyName) && IsStringOrNumericLiteralLike(propertyName.Expression()) {
				return propertyName.Expression()
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
			if IsComputedPropertyName(propertyName) && IsStringOrNumericLiteralLike(propertyName.Expression()) {
				return propertyName.Expression()
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
	return IsObjectLiteralExpression(expression) && len(expression.Properties()) == 0
}

func IsEmptyArrayLiteral(expression *Node) bool {
	return IsArrayLiteralExpression(expression) && len(expression.Elements()) == 0
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

func IsJSDocNameReferenceContext(node *Node) bool {
	return node.Flags&NodeFlagsJSDoc != 0 && FindAncestor(node, func(node *Node) bool {
		return IsJSDocNameReference(node) || IsJSDocLinkLike(node)
	}) != nil
}

func IsImportOrImportEqualsDeclaration(node *Node) bool {
	return IsImportDeclaration(node) || IsImportEqualsDeclaration(node)
}

func IsKeyword(token Kind) bool {
	return KindFirstKeyword <= token && token <= KindLastKeyword
}

func IsNonContextualKeyword(token Kind) bool {
	return IsKeyword(token) && !IsContextualKeyword(token)
}

func HasModifier(node *Node, flags ModifierFlags) bool {
	return node.ModifierFlags()&flags != 0
}

func IsExpandoInitializer(initializer *Node) bool {
	if initializer == nil {
		return false
	}
	if IsFunctionExpressionOrArrowFunction(initializer) {
		return true
	}
	if IsInJSFile(initializer) {
		return IsClassExpression(initializer) || (IsObjectLiteralExpression(initializer) && len(initializer.Properties()) == 0)
	}
	return false
}

func GetContainingFunction(node *Node) *Node {
	return FindAncestor(node.Parent, IsFunctionLike)
}

func ImportFromModuleSpecifier(node *Node) *Node {
	if result := TryGetImportFromModuleSpecifier(node); result != nil {
		return result
	}
	debug.FailBadSyntaxKind(node.Parent)
	return nil
}

func TryGetImportFromModuleSpecifier(node *StringLiteralLike) *Node {
	switch node.Parent.Kind {
	case KindImportDeclaration, KindJSImportDeclaration, KindExportDeclaration:
		return node.Parent
	case KindExternalModuleReference:
		return node.Parent.Parent
	case KindCallExpression:
		if IsImportCall(node.Parent) || IsRequireCall(node.Parent, false /*requireStringLiteralLikeArgument*/) {
			return node.Parent
		}
		return nil
	case KindLiteralType:
		if !IsStringLiteral(node) {
			return nil
		}
		if IsImportTypeNode(node.Parent.Parent) {
			return node.Parent.Parent
		}
		return nil
	}
	return nil
}

func IsImplicitlyExportedJSTypeAlias(node *Node) bool {
	return IsJSTypeAliasDeclaration(node) && IsSourceFile(node.Parent) && IsExternalOrCommonJSModule(node.Parent.AsSourceFile())
}

func HasContextSensitiveParameters(node *Node) bool {
	// Functions with type parameters are not context sensitive.
	if node.TypeParameters() == nil {
		// Functions with any parameters that lack type annotations are context sensitive.
		if core.Some(node.Parameters(), func(p *Node) bool { return p.Type() == nil }) {
			return true
		}
		if !IsArrowFunction(node) {
			// If the first parameter is not an explicit 'this' parameter, then the function has
			// an implicit 'this' parameter which is subject to contextual typing.
			parameter := core.FirstOrNil(node.Parameters())
			if parameter == nil || !IsThisParameter(parameter) {
				return node.Flags&NodeFlagsContainsThis != 0
			}
		}
	}
	return false
}

func IsInfinityOrNaNString(name string) bool {
	return name == "Infinity" || name == "-Infinity" || name == "NaN"
}

func GetFirstConstructorWithBody(node *Node) *Node {
	for _, member := range node.Members() {
		if IsConstructorDeclaration(member) && NodeIsPresent(member.Body()) {
			return member
		}
	}
	return nil
}

// Returns true for nodes that are considered executable for the purposes of unreachable code detection.
func IsPotentiallyExecutableNode(node *Node) bool {
	if KindFirstStatement <= node.Kind && node.Kind <= KindLastStatement {
		if IsVariableStatement(node) {
			declarationList := node.AsVariableStatement().DeclarationList
			if GetCombinedNodeFlags(declarationList)&NodeFlagsBlockScoped != 0 {
				return true
			}
			declarations := declarationList.AsVariableDeclarationList().Declarations.Nodes
			return core.Some(declarations, func(d *Node) bool {
				return d.Initializer() != nil
			})
		}
		return true
	}
	return IsClassDeclaration(node) || IsEnumDeclaration(node) || IsModuleDeclaration(node)
}

func HasAbstractModifier(node *Node) bool {
	return HasSyntacticModifier(node, ModifierFlagsAbstract)
}

func HasAmbientModifier(node *Node) bool {
	return HasSyntacticModifier(node, ModifierFlagsAmbient)
}

func NodeCanBeDecorated(useLegacyDecorators bool, node *Node, parent *Node, grandparent *Node) bool {
	// private names cannot be used with decorators yet
	if useLegacyDecorators && node.Name() != nil && IsPrivateIdentifier(node.Name()) {
		return false
	}
	switch node.Kind {
	case KindClassDeclaration:
		// class declarations are valid targets
		return true
	case KindClassExpression:
		// class expressions are valid targets for native decorators
		return !useLegacyDecorators
	case KindPropertyDeclaration:
		// property declarations are valid if their parent is a class declaration.
		return parent != nil && (useLegacyDecorators && IsClassDeclaration(parent) ||
			!useLegacyDecorators && IsClassLike(parent) && !HasAbstractModifier(node) && !HasAmbientModifier(node))
	case KindGetAccessor, KindSetAccessor, KindMethodDeclaration:
		// if this method has a body and its parent is a class declaration, this is a valid target.
		return parent != nil && node.Body() != nil && (useLegacyDecorators && IsClassDeclaration(parent) ||
			!useLegacyDecorators && IsClassLike(parent))
	case KindParameter:
		// TODO(rbuckton): Parameter decorator support for ES decorators must wait until it is standardized
		if !useLegacyDecorators {
			return false
		}
		// if the parameter's parent has a body and its grandparent is a class declaration, this is a valid target.
		return parent != nil && parent.Body() != nil &&
			(parent.Kind == KindConstructor || parent.Kind == KindMethodDeclaration || parent.Kind == KindSetAccessor) &&
			GetThisParameter(parent) != node && grandparent != nil && grandparent.Kind == KindClassDeclaration
	}

	return false
}

func ClassOrConstructorParameterIsDecorated(useLegacyDecorators bool, node *Node) bool {
	if nodeIsDecorated(useLegacyDecorators, node, nil, nil) {
		return true
	}
	constructor := GetFirstConstructorWithBody(node)
	return constructor != nil && ChildIsDecorated(useLegacyDecorators, constructor, node)
}

func ClassElementOrClassElementParameterIsDecorated(useLegacyDecorators bool, node *Node, parent *Node) bool {
	var parameters *NodeList
	if IsAccessor(node) {
		decls := GetAllAccessorDeclarations(parent.Members(), node)
		var firstAccessorWithDecorators *Node
		if HasDecorators(decls.FirstAccessor) {
			firstAccessorWithDecorators = decls.FirstAccessor
		} else if HasDecorators(decls.SecondAccessor) {
			firstAccessorWithDecorators = decls.SecondAccessor
		}
		if firstAccessorWithDecorators == nil || node != firstAccessorWithDecorators {
			return false
		}
		if decls.SetAccessor != nil {
			parameters = decls.SetAccessor.Parameters
		}
	} else if IsMethodDeclaration(node) {
		parameters = node.ParameterList()
	}
	if nodeIsDecorated(useLegacyDecorators, node, parent, nil) {
		return true
	}
	if parameters != nil && len(parameters.Nodes) > 0 {
		for _, parameter := range parameters.Nodes {
			if IsThisParameter(parameter) {
				continue
			}
			if nodeIsDecorated(useLegacyDecorators, parameter, node, parent) {
				return true
			}
		}
	}
	return false
}

func nodeIsDecorated(useLegacyDecorators bool, node *Node, parent *Node, grandparent *Node) bool {
	return HasDecorators(node) && NodeCanBeDecorated(useLegacyDecorators, node, parent, grandparent)
}

func NodeOrChildIsDecorated(useLegacyDecorators bool, node *Node, parent *Node, grandparent *Node) bool {
	return nodeIsDecorated(useLegacyDecorators, node, parent, grandparent) || ChildIsDecorated(useLegacyDecorators, node, parent)
}

func ChildIsDecorated(useLegacyDecorators bool, node *Node, parent *Node) bool {
	switch node.Kind {
	case KindClassDeclaration, KindClassExpression:
		return core.Some(node.Members(), func(m *Node) bool {
			return NodeOrChildIsDecorated(useLegacyDecorators, m, node, parent)
		})
	case KindMethodDeclaration,
		KindSetAccessor,
		KindConstructor:
		return core.Some(node.Parameters(), func(p *Node) bool {
			return nodeIsDecorated(useLegacyDecorators, p, node, parent)
		})
	default:
		return false
	}
}

type AllAccessorDeclarations struct {
	FirstAccessor  *AccessorDeclaration
	SecondAccessor *AccessorDeclaration
	SetAccessor    *SetAccessorDeclaration
	GetAccessor    *GetAccessorDeclaration
}

func GetAllAccessorDeclarationsForDeclaration(accessor *AccessorDeclaration, declarationsOfSymbol []*Node) AllAccessorDeclarations {
	var otherKind Kind
	if accessor.Kind == KindSetAccessor {
		otherKind = KindGetAccessor
	} else if accessor.Kind == KindGetAccessor {
		otherKind = KindSetAccessor
	} else {
		panic(fmt.Sprintf("Unexpected node kind %q", accessor.Kind))
	}
	// otherAccessor := ast.GetDeclarationOfKind(c.getSymbolOfDeclaration(accessor), otherKind)
	var otherAccessor *AccessorDeclaration
	for _, d := range declarationsOfSymbol {
		if d.Kind == otherKind {
			otherAccessor = d
			break
		}
	}

	var firstAccessor *AccessorDeclaration
	var secondAccessor *AccessorDeclaration
	if otherAccessor != nil && (otherAccessor.Pos() < accessor.Pos()) {
		firstAccessor = otherAccessor
		secondAccessor = accessor
	} else {
		firstAccessor = accessor
		secondAccessor = otherAccessor
	}

	var setAccessor *SetAccessorDeclaration
	var getAccessor *GetAccessorDeclaration
	if accessor.Kind == KindSetAccessor {
		setAccessor = accessor.AsSetAccessorDeclaration()
		if otherAccessor != nil {
			getAccessor = otherAccessor.AsGetAccessorDeclaration()
		}
	} else {
		getAccessor = accessor.AsGetAccessorDeclaration()
		if otherAccessor != nil {
			setAccessor = otherAccessor.AsSetAccessorDeclaration()
		}
	}

	return AllAccessorDeclarations{
		FirstAccessor:  firstAccessor,
		SecondAccessor: secondAccessor,
		SetAccessor:    setAccessor,
		GetAccessor:    getAccessor,
	}
}

func GetAllAccessorDeclarations(parentDeclarations []*Node, accessor *AccessorDeclaration) AllAccessorDeclarations {
	if HasDynamicName(accessor) {
		// dynamic names can only be match up via checker symbol lookup, just return an object with just this accessor
		return GetAllAccessorDeclarationsForDeclaration(accessor, []*Node{accessor})
	}

	accessorName := GetPropertyNameForPropertyNameNode(accessor.Name())
	accessorStatic := IsStatic(accessor)
	var matches []*Node
	for _, member := range parentDeclarations {
		if !IsAccessor(member) || IsStatic(member) != accessorStatic {
			continue
		}
		memberName := GetPropertyNameForPropertyNameNode(member.Name())
		if memberName == accessorName {
			matches = append(matches, member)
		}
	}
	return GetAllAccessorDeclarationsForDeclaration(accessor, matches)
}

func IsAsyncFunction(node *Node) bool {
	switch node.Kind {
	case KindFunctionDeclaration, KindFunctionExpression, KindArrowFunction, KindMethodDeclaration:
		data := node.BodyData()
		return data.Body != nil && data.AsteriskToken == nil && HasSyntacticModifier(node, ModifierFlagsAsync)
	}
	return false
}

/**
 * Gets the most likely element type for a TypeNode. This is not an exhaustive test
 * as it assumes a rest argument can only be an array type (either T[], or Array<T>).
 *
 * @param node The type node.
 *
 * @internal
 */
func GetRestParameterElementType(node *ParameterDeclarationNode) *Node {
	if node == nil {
		return node
	}
	if node.Kind == KindArrayType {
		return node.AsArrayTypeNode().ElementType
	}
	if node.Kind == KindTypeReference && node.AsTypeReferenceNode().TypeArguments != nil {
		return core.FirstOrNil(node.AsTypeReferenceNode().TypeArguments.Nodes)
	}
	return nil
}

func TagNamesAreEquivalent(lhs *Expression, rhs *Expression) bool {
	if lhs.Kind != rhs.Kind {
		return false
	}
	switch lhs.Kind {
	case KindIdentifier:
		return lhs.Text() == rhs.Text()
	case KindThisKeyword:
		return true
	case KindJsxNamespacedName:
		return lhs.AsJsxNamespacedName().Namespace.Text() == rhs.AsJsxNamespacedName().Namespace.Text() &&
			lhs.AsJsxNamespacedName().Name().Text() == rhs.AsJsxNamespacedName().Name().Text()
	case KindPropertyAccessExpression:
		return lhs.AsPropertyAccessExpression().Name().Text() == rhs.AsPropertyAccessExpression().Name().Text() &&
			TagNamesAreEquivalent(lhs.Expression(), rhs.Expression())
	}
	panic("Unhandled case in TagNamesAreEquivalent")
}

func isTagName(node *Node) bool {
	return node.Parent != nil && IsJSDocTag(node.Parent) && node.Parent.TagName() == node
}

// We want to store any numbers/strings if they were a name that could be
// related to a declaration.  So, if we have 'import x = require("something")'
// then we want 'something' to be in the name table.  Similarly, if we have
// "a['propname']" then we want to store "propname" in the name table.
func literalIsName(node *Node) bool {
	return IsDeclarationName(node) ||
		node.Parent.Kind == KindExternalModuleReference ||
		isArgumentOfElementAccessExpression(node) ||
		IsLiteralComputedPropertyDeclarationName(node)
}

func isArgumentOfElementAccessExpression(node *Node) bool {
	return node != nil && node.Parent != nil &&
		node.Parent.Kind == KindElementAccessExpression &&
		node.Parent.AsElementAccessExpression().ArgumentExpression == node
}

// If the given node is part of a subtree of JSDoc nodes that have been cloned into a reparsed construct,
// return the corresponding reparsed clone in the subtree. Otherwise, just return the node.
func GetReparsedNodeForNode(node *Node) *Node {
	if node != nil && node.Flags&NodeFlagsJSDoc != 0 && node.Flags&NodeFlagsReparsed == 0 {
		if file := GetSourceFileOfNode(node); file != nil && len(file.ReparsedClones) != 0 {
			pos, found := slices.BinarySearchFunc(file.ReparsedClones, node, CompareNodePositions)
			if !found && pos > 0 {
				pos--
			}
			candidate := file.ReparsedClones[pos]
			if node.Loc.ContainedBy(candidate.Loc) {
				if reparsed := findCloneInNode(candidate, node); reparsed != nil {
					return reparsed
				}
			}
		}
	}
	return node
}

func findCloneInNode(node *Node, original *Node) *Node {
	for {
		if node.Kind == original.Kind && node.Loc == original.Loc {
			return node
		}
		foundContainingChild := node.ForEachChild(func(n *Node) bool {
			if original.Loc.ContainedBy(n.Loc) {
				node = n
				return true
			}
			return false
		})
		if !foundContainingChild {
			return nil
		}
	}
}
