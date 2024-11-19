package compiler

import (
	"maps"
	"math"
	"path/filepath"
	"slices"
	"strconv"
	"strings"
	"sync/atomic"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tspath"
)

// Links store

type LinkStore[K comparable, V any] struct {
	entries map[K]*V
	pool    core.Pool[V]
}

func (s *LinkStore[K, V]) get(key K) *V {
	value := s.entries[key]
	if value != nil {
		return value
	}
	if s.entries == nil {
		s.entries = make(map[K]*V)
	}
	value = s.pool.New()
	s.entries[key] = value
	return value
}

// Atomic ids

var nextNodeId atomic.Uint32
var nextSymbolId atomic.Uint32
var nextMergeId atomic.Uint32

func getNodeId(node *ast.Node) ast.NodeId {
	if node.Id == 0 {
		node.Id = ast.NodeId(nextNodeId.Add(1))
	}
	return node.Id
}

func getSymbolId(symbol *ast.Symbol) ast.SymbolId {
	if symbol.Id == 0 {
		symbol.Id = ast.SymbolId(nextSymbolId.Add(1))
	}
	return symbol.Id
}

func getMergeId(symbol *ast.Symbol) ast.MergeId {
	if symbol.MergeId == 0 {
		symbol.MergeId = ast.MergeId(nextMergeId.Add(1))
	}
	return symbol.MergeId
}

func NewDiagnosticForNode(node *ast.Node, message *diagnostics.Message, args ...any) *ast.Diagnostic {
	var file *ast.SourceFile
	var loc core.TextRange
	if node != nil {
		file = ast.GetSourceFileOfNode(node)
		loc = getErrorRangeForNode(file, node)
	}
	return ast.NewDiagnostic(file, loc, message, args...)
}

func NewDiagnosticForNodeFromMessageChain(node *ast.Node, messageChain *ast.MessageChain) *ast.Diagnostic {
	var file *ast.SourceFile
	var loc core.TextRange
	if node != nil {
		file = ast.GetSourceFileOfNode(node)
		loc = getErrorRangeForNode(file, node)
	}
	return ast.NewDiagnosticFromMessageChain(file, loc, messageChain)
}

func chainDiagnosticMessages(details *ast.MessageChain, message *diagnostics.Message, args ...any) *ast.MessageChain {
	return ast.NewMessageChain(message, args...).AddMessageChain(details)
}

type OperatorPrecedence int

const (
	// Expression:
	//     AssignmentExpression
	//     Expression `,` AssignmentExpression
	OperatorPrecedenceComma OperatorPrecedence = iota
	// NOTE: `Spread` is higher than `Comma` due to how it is parsed in |ElementList|
	// SpreadElement:
	//     `...` AssignmentExpression
	OperatorPrecedenceSpread
	// AssignmentExpression:
	//     ConditionalExpression
	//     YieldExpression
	//     ArrowFunction
	//     AsyncArrowFunction
	//     LeftHandSideExpression `=` AssignmentExpression
	//     LeftHandSideExpression AssignmentOperator AssignmentExpression
	//
	// NOTE: AssignmentExpression is broken down into several precedences due to the requirements
	//       of the parenthesizer rules.
	// AssignmentExpression: YieldExpression
	// YieldExpression:
	//     `yield`
	//     `yield` AssignmentExpression
	//     `yield` `*` AssignmentExpression
	OperatorPrecedenceYield
	// AssignmentExpression: LeftHandSideExpression `=` AssignmentExpression
	// AssignmentExpression: LeftHandSideExpression AssignmentOperator AssignmentExpression
	// AssignmentOperator: one of
	//     `*=` `/=` `%=` `+=` `-=` `<<=` `>>=` `>>>=` `&=` `^=` `|=` `**=`
	OperatorPrecedenceAssignment
	// NOTE: `Conditional` is considered higher than `Assignment` here, but in reality they have
	//       the same precedence.
	// AssignmentExpression: ConditionalExpression
	// ConditionalExpression:
	//     ShortCircuitExpression
	//     ShortCircuitExpression `?` AssignmentExpression `:` AssignmentExpression
	// ShortCircuitExpression:
	//     LogicalORExpression
	//     CoalesceExpression
	OperatorPrecedenceConditional
	// LogicalORExpression:
	//     LogicalANDExpression
	//     LogicalORExpression `||` LogicalANDExpression
	OperatorPrecedenceLogicalOR
	// LogicalANDExpression:
	//     BitwiseORExpression
	//     LogicalANDExprerssion `&&` BitwiseORExpression
	OperatorPrecedenceLogicalAND
	// BitwiseORExpression:
	//     BitwiseXORExpression
	//     BitwiseORExpression `^` BitwiseXORExpression
	OperatorPrecedenceBitwiseOR
	// BitwiseXORExpression:
	//     BitwiseANDExpression
	//     BitwiseXORExpression `^` BitwiseANDExpression
	OperatorPrecedenceBitwiseXOR
	// BitwiseANDExpression:
	//     EqualityExpression
	//     BitwiseANDExpression `^` EqualityExpression
	OperatorPrecedenceBitwiseAND
	// EqualityExpression:
	//     RelationalExpression
	//     EqualityExpression `==` RelationalExpression
	//     EqualityExpression `!=` RelationalExpression
	//     EqualityExpression `===` RelationalExpression
	//     EqualityExpression `!==` RelationalExpression
	OperatorPrecedenceEquality
	// RelationalExpression:
	//     ShiftExpression
	//     RelationalExpression `<` ShiftExpression
	//     RelationalExpression `>` ShiftExpression
	//     RelationalExpression `<=` ShiftExpression
	//     RelationalExpression `>=` ShiftExpression
	//     RelationalExpression `instanceof` ShiftExpression
	//     RelationalExpression `in` ShiftExpression
	//     [+TypeScript] RelationalExpression `as` Type
	OperatorPrecedenceRelational
	// ShiftExpression:
	//     AdditiveExpression
	//     ShiftExpression `<<` AdditiveExpression
	//     ShiftExpression `>>` AdditiveExpression
	//     ShiftExpression `>>>` AdditiveExpression
	OperatorPrecedenceShift
	// AdditiveExpression:
	//     MultiplicativeExpression
	//     AdditiveExpression `+` MultiplicativeExpression
	//     AdditiveExpression `-` MultiplicativeExpression
	OperatorPrecedenceAdditive
	// MultiplicativeExpression:
	//     ExponentiationExpression
	//     MultiplicativeExpression MultiplicativeOperator ExponentiationExpression
	// MultiplicativeOperator: one of `*`, `/`, `%`
	OperatorPrecedenceMultiplicative
	// ExponentiationExpression:
	//     UnaryExpression
	//     UpdateExpression `**` ExponentiationExpression
	OperatorPrecedenceExponentiation
	// UnaryExpression:
	//     UpdateExpression
	//     `delete` UnaryExpression
	//     `void` UnaryExpression
	//     `typeof` UnaryExpression
	//     `+` UnaryExpression
	//     `-` UnaryExpression
	//     `~` UnaryExpression
	//     `!` UnaryExpression
	//     AwaitExpression
	// UpdateExpression:            // TODO: Do we need to investigate the precedence here?
	//     `++` UnaryExpression
	//     `--` UnaryExpression
	OperatorPrecedenceUnary
	// UpdateExpression:
	//     LeftHandSideExpression
	//     LeftHandSideExpression `++`
	//     LeftHandSideExpression `--`
	OperatorPrecedenceUpdate
	// LeftHandSideExpression:
	//     NewExpression
	//     CallExpression
	// NewExpression:
	//     MemberExpression
	//     `new` NewExpression
	OperatorPrecedenceLeftHandSide
	// CallExpression:
	//     CoverCallExpressionAndAsyncArrowHead
	//     SuperCall
	//     ImportCall
	//     CallExpression Arguments
	//     CallExpression `[` Expression `]`
	//     CallExpression `.` IdentifierName
	//     CallExpression TemplateLiteral
	// MemberExpression:
	//     PrimaryExpression
	//     MemberExpression `[` Expression `]`
	//     MemberExpression `.` IdentifierName
	//     MemberExpression TemplateLiteral
	//     SuperProperty
	//     MetaProperty
	//     `new` MemberExpression Arguments
	OperatorPrecedenceMember
	// TODO: JSXElement?
	// PrimaryExpression:
	//     `this`
	//     IdentifierReference
	//     Literal
	//     ArrayLiteral
	//     ObjectLiteral
	//     FunctionExpression
	//     ClassExpression
	//     GeneratorExpression
	//     AsyncFunctionExpression
	//     AsyncGeneratorExpression
	//     RegularExpressionLiteral
	//     TemplateLiteral
	//     CoverParenthesizedExpressionAndArrowParameterList
	OperatorPrecedencePrimary
	// CoalesceExpression:
	//     CoalesceExpressionHead `??` BitwiseORExpression
	// CoalesceExpressionHead:
	//     CoalesceExpression
	//     BitwiseORExpression
	OperatorPrecedenceCoalesce = OperatorPrecedenceConditional // NOTE: This is wrong
	OperatorPrecedenceLowest   = OperatorPrecedenceComma
	OperatorPrecedenceHighest  = OperatorPrecedencePrimary
	// -1 is lower than all other precedences. Returning it will cause binary expression
	// parsing to stop.
	OperatorPrecedenceInvalid OperatorPrecedence = -1
)

func getOperatorPrecedence(nodeKind ast.Kind, operatorKind ast.Kind, hasArguments bool) OperatorPrecedence {
	switch nodeKind {
	case ast.KindCommaListExpression:
		return OperatorPrecedenceComma
	case ast.KindSpreadElement:
		return OperatorPrecedenceSpread
	case ast.KindYieldExpression:
		return OperatorPrecedenceYield
	case ast.KindConditionalExpression:
		return OperatorPrecedenceConditional
	case ast.KindBinaryExpression:
		switch operatorKind {
		case ast.KindCommaToken:
			return OperatorPrecedenceComma
		case ast.KindEqualsToken, ast.KindPlusEqualsToken, ast.KindMinusEqualsToken, ast.KindAsteriskAsteriskEqualsToken,
			ast.KindAsteriskEqualsToken, ast.KindSlashEqualsToken, ast.KindPercentEqualsToken, ast.KindLessThanLessThanEqualsToken,
			ast.KindGreaterThanGreaterThanEqualsToken, ast.KindGreaterThanGreaterThanGreaterThanEqualsToken, ast.KindAmpersandEqualsToken,
			ast.KindCaretEqualsToken, ast.KindBarEqualsToken, ast.KindBarBarEqualsToken, ast.KindAmpersandAmpersandEqualsToken,
			ast.KindQuestionQuestionEqualsToken:
			return OperatorPrecedenceAssignment
		}
		return getBinaryOperatorPrecedence(operatorKind)
	// TODO: Should prefix `++` and `--` be moved to the `Update` precedence?
	case ast.KindTypeAssertionExpression, ast.KindNonNullExpression, ast.KindPrefixUnaryExpression, ast.KindTypeOfExpression,
		ast.KindVoidExpression, ast.KindDeleteExpression, ast.KindAwaitExpression:
		return OperatorPrecedenceUnary
	case ast.KindPostfixUnaryExpression:
		return OperatorPrecedenceUpdate
	case ast.KindCallExpression:
		return OperatorPrecedenceLeftHandSide
	case ast.KindNewExpression:
		if hasArguments {
			return OperatorPrecedenceMember
		}
		return OperatorPrecedenceLeftHandSide
	case ast.KindTaggedTemplateExpression, ast.KindPropertyAccessExpression, ast.KindElementAccessExpression, ast.KindMetaProperty:
		return OperatorPrecedenceMember
	case ast.KindAsExpression, ast.KindSatisfiesExpression:
		return OperatorPrecedenceRelational
	case ast.KindThisKeyword, ast.KindSuperKeyword, ast.KindIdentifier, ast.KindPrivateIdentifier, ast.KindNullKeyword,
		ast.KindTrueKeyword, ast.KindFalseKeyword, ast.KindNumericLiteral, ast.KindBigIntLiteral, ast.KindStringLiteral,
		ast.KindArrayLiteralExpression, ast.KindObjectLiteralExpression, ast.KindFunctionExpression, ast.KindArrowFunction,
		ast.KindClassExpression, ast.KindRegularExpressionLiteral, ast.KindNoSubstitutionTemplateLiteral, ast.KindTemplateExpression,
		ast.KindParenthesizedExpression, ast.KindOmittedExpression, ast.KindJsxElement, ast.KindJsxSelfClosingElement, ast.KindJsxFragment:
		return OperatorPrecedencePrimary
	}
	return OperatorPrecedenceInvalid
}

func getBinaryOperatorPrecedence(kind ast.Kind) OperatorPrecedence {
	switch kind {
	case ast.KindQuestionQuestionToken:
		return OperatorPrecedenceCoalesce
	case ast.KindBarBarToken:
		return OperatorPrecedenceLogicalOR
	case ast.KindAmpersandAmpersandToken:
		return OperatorPrecedenceLogicalAND
	case ast.KindBarToken:
		return OperatorPrecedenceBitwiseOR
	case ast.KindCaretToken:
		return OperatorPrecedenceBitwiseXOR
	case ast.KindAmpersandToken:
		return OperatorPrecedenceBitwiseAND
	case ast.KindEqualsEqualsToken, ast.KindExclamationEqualsToken, ast.KindEqualsEqualsEqualsToken, ast.KindExclamationEqualsEqualsToken:
		return OperatorPrecedenceEquality
	case ast.KindLessThanToken, ast.KindGreaterThanToken, ast.KindLessThanEqualsToken, ast.KindGreaterThanEqualsToken,
		ast.KindInstanceOfKeyword, ast.KindInKeyword, ast.KindAsKeyword, ast.KindSatisfiesKeyword:
		return OperatorPrecedenceRelational
	case ast.KindLessThanLessThanToken, ast.KindGreaterThanGreaterThanToken, ast.KindGreaterThanGreaterThanGreaterThanToken:
		return OperatorPrecedenceShift
	case ast.KindPlusToken, ast.KindMinusToken:
		return OperatorPrecedenceAdditive
	case ast.KindAsteriskToken, ast.KindSlashToken, ast.KindPercentToken:
		return OperatorPrecedenceMultiplicative
	case ast.KindAsteriskAsteriskToken:
		return OperatorPrecedenceExponentiation
	}
	// -1 is lower than all other precedences.  Returning it will cause binary expression
	// parsing to stop.
	return OperatorPrecedenceInvalid
}

func formatMessage(message *diagnostics.Message, args ...any) string {
	text := message.Message()
	if len(args) != 0 {
		text = core.FormatStringFromArgs(text, args)
	}
	return text
}

func findInMap[K comparable, V any](m map[K]V, predicate func(V) bool) V {
	for _, value := range m {
		if predicate(value) {
			return value
		}
	}
	return *new(V)
}

func boolToTristate(b bool) core.Tristate {
	if b {
		return core.TSTrue
	}
	return core.TSFalse
}

func isAssignmentOperator(token ast.Kind) bool {
	return token >= ast.KindFirstAssignment && token <= ast.KindLastAssignment
}

func isStringLiteralLike(node *ast.Node) bool {
	return node.Kind == ast.KindStringLiteral || node.Kind == ast.KindNoSubstitutionTemplateLiteral
}

func isStringOrNumericLiteralLike(node *ast.Node) bool {
	return isStringLiteralLike(node) || ast.IsNumericLiteral(node)
}

func isSignedNumericLiteral(node *ast.Node) bool {
	if node.Kind == ast.KindPrefixUnaryExpression {
		node := node.AsPrefixUnaryExpression()
		return (node.Operator == ast.KindPlusToken || node.Operator == ast.KindMinusToken) && ast.IsNumericLiteral(node.Operand)
	}
	return false
}

func ifElse[T any](b bool, whenTrue T, whenFalse T) T {
	if b {
		return whenTrue
	}
	return whenFalse
}

func tokenIsIdentifierOrKeyword(token ast.Kind) bool {
	return token >= ast.KindIdentifier
}

func tokenIsIdentifierOrKeywordOrGreaterThan(token ast.Kind) bool {
	return token == ast.KindGreaterThanToken || tokenIsIdentifierOrKeyword(token)
}

func getTextOfNode(node *ast.Node) string {
	return getSourceTextOfNodeFromSourceFile(ast.GetSourceFileOfNode(node), node)
}

func getSourceTextOfNodeFromSourceFile(sourceFile *ast.SourceFile, node *ast.Node) string {
	return getTextOfNodeFromSourceText(sourceFile.Text, node)
}

func getTextOfNodeFromSourceText(sourceText string, node *ast.Node) string {
	if ast.NodeIsMissing(node) {
		return ""
	}
	text := sourceText[SkipTrivia(sourceText, node.Pos()):node.End()]
	// if (isJSDocTypeExpressionOrChild(node)) {
	//     // strip space + asterisk at line start
	//     text = text.split(/\r\n|\n|\r/).map(line => line.replace(/^\s*\*/, "").trimStart()).join("\n");
	// }
	return text
}

func isAssignmentDeclaration(decl *ast.Node) bool {
	return ast.IsBinaryExpression(decl) || ast.IsAccessExpression(decl) || ast.IsIdentifier(decl) || ast.IsCallExpression(decl)
}

func isInJSFile(node *ast.Node) bool {
	return node != nil && node.Flags&ast.NodeFlagsJavaScriptFile != 0
}

func isEffectiveModuleDeclaration(node *ast.Node) bool {
	return ast.IsModuleDeclaration(node) || ast.IsIdentifier(node)
}

func isObjectLiteralOrClassExpressionMethodOrAccessor(node *ast.Node) bool {
	kind := node.Kind
	return (kind == ast.KindMethodDeclaration || kind == ast.KindGetAccessor || kind == ast.KindSetAccessor) &&
		(node.Parent.Kind == ast.KindObjectLiteralExpression || node.Parent.Kind == ast.KindClassExpression)
}

// Return true if the given identifier is classified as an IdentifierName
func isIdentifierName(node *ast.Node) bool {
	parent := node.Parent
	switch parent.Kind {
	case ast.KindPropertyDeclaration, ast.KindPropertySignature, ast.KindMethodDeclaration, ast.KindMethodSignature, ast.KindGetAccessor,
		ast.KindSetAccessor, ast.KindEnumMember, ast.KindPropertyAssignment, ast.KindPropertyAccessExpression:
		return parent.Name() == node
	case ast.KindQualifiedName:
		return parent.AsQualifiedName().Right == node
	case ast.KindBindingElement:
		return parent.AsBindingElement().PropertyName == node
	case ast.KindImportSpecifier:
		return parent.AsImportSpecifier().PropertyName == node
	case ast.KindExportSpecifier, ast.KindJsxAttribute, ast.KindJsxSelfClosingElement, ast.KindJsxOpeningElement, ast.KindJsxClosingElement:
		return true
	}
	return false
}

/** @internal */
func getErrorRangeForNode(sourceFile *ast.SourceFile, node *ast.Node) core.TextRange {
	errorNode := node
	switch node.Kind {
	case ast.KindSourceFile:
		pos := SkipTrivia(sourceFile.Text, 0)
		if pos == len(sourceFile.Text) {
			return core.NewTextRange(0, 0)
		}
		return getRangeOfTokenAtPosition(sourceFile, pos)
	// This list is a work in progress. Add missing node kinds to improve their error spans
	case ast.KindVariableDeclaration, ast.KindBindingElement, ast.KindClassDeclaration, ast.KindClassExpression, ast.KindInterfaceDeclaration,
		ast.KindModuleDeclaration, ast.KindEnumDeclaration, ast.KindEnumMember, ast.KindFunctionDeclaration, ast.KindFunctionExpression,
		ast.KindMethodDeclaration, ast.KindGetAccessor, ast.KindSetAccessor, ast.KindTypeAliasDeclaration, ast.KindPropertyDeclaration,
		ast.KindPropertySignature, ast.KindNamespaceImport:
		errorNode = getNameOfDeclaration(node)
	case ast.KindArrowFunction:
		return getErrorRangeForArrowFunction(sourceFile, node)
	case ast.KindCaseClause:
	case ast.KindDefaultClause:
		start := SkipTrivia(sourceFile.Text, node.Pos())
		end := node.End()
		statements := node.AsCaseOrDefaultClause().Statements.Nodes
		if len(statements) != 0 {
			end = statements[0].Pos()
		}
		return core.NewTextRange(start, end)
	case ast.KindReturnStatement, ast.KindYieldExpression:
		pos := SkipTrivia(sourceFile.Text, node.Pos())
		return getRangeOfTokenAtPosition(sourceFile, pos)
	case ast.KindSatisfiesExpression:
		pos := SkipTrivia(sourceFile.Text, node.AsSatisfiesExpression().Expression.End())
		return getRangeOfTokenAtPosition(sourceFile, pos)
	case ast.KindConstructor:
		scanner := getScannerForSourceFile(sourceFile, node.Pos())
		start := scanner.tokenStart
		for scanner.token != ast.KindConstructorKeyword && scanner.token != ast.KindStringLiteral && scanner.token != ast.KindEndOfFile {
			scanner.Scan()
		}
		return core.NewTextRange(start, scanner.pos)
		// !!!
		// case KindJSDocSatisfiesTag:
		// 	pos := SkipTrivia(sourceFile.text, node.tagName.pos)
		// 	return getRangeOfTokenAtPosition(sourceFile, pos)
	}
	if errorNode == nil {
		// If we don't have a better node, then just set the error on the first token of
		// construct.
		return getRangeOfTokenAtPosition(sourceFile, node.Pos())
	}
	pos := errorNode.Pos()
	if !ast.NodeIsMissing(errorNode) {
		pos = SkipTrivia(sourceFile.Text, pos)
	}
	return core.NewTextRange(pos, errorNode.End())
}

func getErrorRangeForArrowFunction(sourceFile *ast.SourceFile, node *ast.Node) core.TextRange {
	pos := SkipTrivia(sourceFile.Text, node.Pos())
	body := node.AsArrowFunction().Body
	if body != nil && body.Kind == ast.KindBlock {
		startLine, _ := GetLineAndCharacterOfPosition(sourceFile, body.Pos())
		endLine, _ := GetLineAndCharacterOfPosition(sourceFile, body.End())
		if startLine < endLine {
			// The arrow function spans multiple lines,
			// make the error span be the first line, inclusive.
			return core.NewTextRange(pos, getEndLinePosition(sourceFile, startLine))
		}
	}
	return core.NewTextRange(pos, node.End())
}

func getContainingClass(node *ast.Node) *ast.Node {
	return ast.FindAncestor(node.Parent, ast.IsClassLike)
}

func declarationNameToString(name *ast.Node) string {
	if name == nil || name.Pos() == name.End() {
		return "(Missing)"
	}
	return getTextOfNode(name)
}

func isExternalModule(file *ast.SourceFile) bool {
	return file.ExternalModuleIndicator != nil
}

func isInTopLevelContext(node *ast.Node) bool {
	// The name of a class or function declaration is a BindingIdentifier in its surrounding scope.
	if ast.IsIdentifier(node) {
		parent := node.Parent
		if (ast.IsClassDeclaration(parent) || ast.IsFunctionDeclaration(parent)) && parent.Name() == node {
			node = parent
		}
	}
	container := getThisContainer(node, true /*includeArrowFunctions*/, false /*includeClassComputedPropertyName*/)
	return ast.IsSourceFile(container)
}

func getThisContainer(node *ast.Node, includeArrowFunctions bool, includeClassComputedPropertyName bool) *ast.Node {
	for {
		node = node.Parent
		if node == nil {
			panic("nil parent in getThisContainer")
		}
		switch node.Kind {
		case ast.KindComputedPropertyName:
			if includeClassComputedPropertyName && ast.IsClassLike(node.Parent.Parent) {
				return node
			}
			node = node.Parent.Parent
		case ast.KindDecorator:
			if node.Parent.Kind == ast.KindParameter && ast.IsClassElement(node.Parent.Parent) {
				// If the decorator's parent is a Parameter, we resolve the this container from
				// the grandparent class declaration.
				node = node.Parent.Parent
			} else if ast.IsClassElement(node.Parent) {
				// If the decorator's parent is a class element, we resolve the 'this' container
				// from the parent class declaration.
				node = node.Parent
			}
		case ast.KindArrowFunction:
			if includeArrowFunctions {
				return node
			}
		case ast.KindFunctionDeclaration, ast.KindFunctionExpression, ast.KindModuleDeclaration, ast.KindClassStaticBlockDeclaration,
			ast.KindPropertyDeclaration, ast.KindPropertySignature, ast.KindMethodDeclaration, ast.KindMethodSignature, ast.KindConstructor,
			ast.KindGetAccessor, ast.KindSetAccessor, ast.KindCallSignature, ast.KindConstructSignature, ast.KindIndexSignature,
			ast.KindEnumDeclaration, ast.KindSourceFile:
			return node
		}
	}
}

func isPartOfTypeQuery(node *ast.Node) bool {
	for node.Kind == ast.KindQualifiedName || node.Kind == ast.KindIdentifier {
		node = node.Parent
	}
	return node.Kind == ast.KindTypeQuery
}

func hasSyntacticModifier(node *ast.Node, flags ast.ModifierFlags) bool {
	return node.ModifierFlags()&flags != 0
}

func hasAccessorModifier(node *ast.Node) bool {
	return hasSyntacticModifier(node, ast.ModifierFlagsAccessor)
}

func hasStaticModifier(node *ast.Node) bool {
	return hasSyntacticModifier(node, ast.ModifierFlagsStatic)
}

func getEffectiveModifierFlags(node *ast.Node) ast.ModifierFlags {
	return node.ModifierFlags() // !!! Handle JSDoc
}

func hasEffectiveModifier(node *ast.Node, flags ast.ModifierFlags) bool {
	return getEffectiveModifierFlags(node)&flags != 0
}

func hasEffectiveReadonlyModifier(node *ast.Node) bool {
	return hasEffectiveModifier(node, ast.ModifierFlagsReadonly)
}

func getImmediatelyInvokedFunctionExpression(fn *ast.Node) *ast.Node {
	if fn.Kind == ast.KindFunctionExpression || fn.Kind == ast.KindArrowFunction {
		prev := fn
		parent := fn.Parent
		for parent.Kind == ast.KindParenthesizedExpression {
			prev = parent
			parent = parent.Parent
		}
		if parent.Kind == ast.KindCallExpression && parent.AsCallExpression().Expression == prev {
			return parent
		}
	}
	return nil
}

// Does not handle signed numeric names like `a[+0]` - handling those would require handling prefix unary expressions
// throughout late binding handling as well, which is awkward (but ultimately probably doable if there is demand)
func getElementOrPropertyAccessArgumentExpressionOrName(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindPropertyAccessExpression:
		return node.AsPropertyAccessExpression().Name()
	case ast.KindElementAccessExpression:
		arg := ast.SkipParentheses(node.AsElementAccessExpression().ArgumentExpression)
		if isStringOrNumericLiteralLike(arg) {
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
func hasDynamicName(declaration *ast.Node) bool {
	name := getNameOfDeclaration(declaration)
	return name != nil && isDynamicName(name)
}

func isDynamicName(name *ast.Node) bool {
	var expr *ast.Node
	switch name.Kind {
	case ast.KindComputedPropertyName:
		expr = name.AsComputedPropertyName().Expression
	case ast.KindElementAccessExpression:
		expr = ast.SkipParentheses(name.AsElementAccessExpression().ArgumentExpression)
	default:
		return false
	}
	return !isStringOrNumericLiteralLike(expr) && !isSignedNumericLiteral(expr)
}

func getNameOfDeclaration(declaration *ast.Node) *ast.Node {
	if declaration == nil {
		return nil
	}
	nonAssignedName := getNonAssignedNameOfDeclaration(declaration)
	if nonAssignedName != nil {
		return nonAssignedName
	}
	if ast.IsFunctionExpression(declaration) || ast.IsArrowFunction(declaration) || ast.IsClassExpression(declaration) {
		return getAssignedName(declaration)
	}
	return nil
}

func getNonAssignedNameOfDeclaration(declaration *ast.Node) *ast.Node {
	switch declaration.Kind {
	case ast.KindBinaryExpression:
		if isFunctionPropertyAssignment(declaration) {
			return getElementOrPropertyAccessArgumentExpressionOrName(declaration.AsBinaryExpression().Left)
		}
		return nil
	case ast.KindExportAssignment:
		expr := declaration.AsExportAssignment().Expression
		if ast.IsIdentifier(expr) {
			return expr
		}
		return nil
	}
	return declaration.Name()
}

func getAssignedName(node *ast.Node) *ast.Node {
	parent := node.Parent
	if parent != nil {
		switch parent.Kind {
		case ast.KindPropertyAssignment:
			return parent.AsPropertyAssignment().Name()
		case ast.KindBindingElement:
			return parent.AsBindingElement().Name()
		case ast.KindBinaryExpression:
			if node == parent.AsBinaryExpression().Right {
				left := parent.AsBinaryExpression().Left
				switch left.Kind {
				case ast.KindIdentifier:
					return left
				case ast.KindPropertyAccessExpression:
					return left.AsPropertyAccessExpression().Name()
				case ast.KindElementAccessExpression:
					arg := ast.SkipParentheses(left.AsElementAccessExpression().ArgumentExpression)
					if isStringOrNumericLiteralLike(arg) {
						return arg
					}
				}
			}
		case ast.KindVariableDeclaration:
			name := parent.AsVariableDeclaration().Name()
			if ast.IsIdentifier(name) {
				return name
			}
		}
	}
	return nil
}

func isFunctionPropertyAssignment(node *ast.Node) bool {
	if node.Kind == ast.KindBinaryExpression {
		expr := node.AsBinaryExpression()
		if expr.OperatorToken.Kind == ast.KindEqualsToken {
			switch expr.Left.Kind {
			case ast.KindPropertyAccessExpression:
				// F.id = expr
				return ast.IsIdentifier(expr.Left.AsPropertyAccessExpression().Expression) && ast.IsIdentifier(expr.Left.AsPropertyAccessExpression().Name())
			case ast.KindElementAccessExpression:
				// F[xxx] = expr
				return ast.IsIdentifier(expr.Left.AsElementAccessExpression().Expression)
			}
		}
	}
	return false
}

func isAssignmentExpression(node *ast.Node, excludeCompoundAssignment bool) bool {
	if node.Kind == ast.KindBinaryExpression {
		expr := node.AsBinaryExpression()
		return (expr.OperatorToken.Kind == ast.KindEqualsToken || !excludeCompoundAssignment && isAssignmentOperator(expr.OperatorToken.Kind)) &&
			ast.IsLeftHandSideExpression(expr.Left)
	}
	return false
}

func isBlockOrCatchScoped(declaration *ast.Node) bool {
	return getCombinedNodeFlags(declaration)&ast.NodeFlagsBlockScoped != 0 || isCatchClauseVariableDeclarationOrBindingElement(declaration)
}

func isCatchClauseVariableDeclarationOrBindingElement(declaration *ast.Node) bool {
	node := getRootDeclaration(declaration)
	return node.Kind == ast.KindVariableDeclaration && node.Parent.Kind == ast.KindCatchClause
}

func isAmbientModule(node *ast.Node) bool {
	return ast.IsModuleDeclaration(node) && (node.AsModuleDeclaration().Name().Kind == ast.KindStringLiteral || isGlobalScopeAugmentation(node))
}

func isGlobalScopeAugmentation(node *ast.Node) bool {
	return node.Flags&ast.NodeFlagsGlobalAugmentation != 0
}

func setParent(child *ast.Node, parent *ast.Node) {
	if child != nil {
		child.Parent = parent
	}
}

func setParentInChildren(node *ast.Node) {
	node.ForEachChild(func(child *ast.Node) bool {
		child.Parent = node
		setParentInChildren(child)
		return false
	})
}

func getCombinedFlags[T ~uint32](node *ast.Node, getFlags func(*ast.Node) T) T {
	node = getRootDeclaration(node)
	flags := getFlags(node)
	if node.Kind == ast.KindVariableDeclaration {
		node = node.Parent
	}
	if node != nil && node.Kind == ast.KindVariableDeclarationList {
		flags |= getFlags(node)
		node = node.Parent
	}
	if node != nil && node.Kind == ast.KindVariableStatement {
		flags |= getFlags(node)
	}
	return flags
}

func getCombinedModifierFlags(node *ast.Node) ast.ModifierFlags {
	return getCombinedFlags(node, (*ast.Node).ModifierFlags)
}

func getCombinedNodeFlags(node *ast.Node) ast.NodeFlags {
	return getCombinedFlags(node, getNodeFlags)
}

func getNodeFlags(node *ast.Node) ast.NodeFlags {
	return node.Flags
}

func isParameterPropertyDeclaration(node *ast.Node, parent *ast.Node) bool {
	return ast.IsParameter(node) && hasSyntacticModifier(node, ast.ModifierFlagsParameterPropertyModifier) && parent.Kind == ast.KindConstructor
}

/**
 * Like {@link isVariableDeclarationInitializedToRequire} but allows things like `require("...").foo.bar` or `require("...")["baz"]`.
 */
func isVariableDeclarationInitializedToBareOrAccessedRequire(node *ast.Node) bool {
	return isVariableDeclarationInitializedWithRequireHelper(node, true /*allowAccessedRequire*/)
}

func isVariableDeclarationInitializedWithRequireHelper(node *ast.Node, allowAccessedRequire bool) bool {
	if node.Kind == ast.KindVariableDeclaration && node.AsVariableDeclaration().Initializer != nil {
		initializer := node.AsVariableDeclaration().Initializer
		if allowAccessedRequire {
			initializer = getLeftmostAccessExpression(initializer)
		}
		return isRequireCall(initializer, true /*requireStringLiteralLikeArgument*/)
	}
	return false
}

func getLeftmostAccessExpression(expr *ast.Node) *ast.Node {
	for ast.IsAccessExpression(expr) {
		expr = expr.Expression()
	}
	return expr
}

func isRequireCall(node *ast.Node, requireStringLiteralLikeArgument bool) bool {
	if ast.IsCallExpression(node) {
		callExpression := node.AsCallExpression()
		if len(callExpression.Arguments.Nodes) == 1 {
			if ast.IsIdentifier(callExpression.Expression) && callExpression.Expression.AsIdentifier().Text == "require" {
				return !requireStringLiteralLikeArgument || isStringLiteralLike(callExpression.Arguments.Nodes[0])
			}
		}
	}
	return false
}

/**
 * This function returns true if the this node's root declaration is a parameter.
 * For example, passing a `ParameterDeclaration` will return true, as will passing a
 * binding element that is a child of a `ParameterDeclaration`.
 *
 * If you are looking to test that a `Node` is a `ParameterDeclaration`, use `isParameter`.
 */
func isPartOfParameterDeclaration(node *ast.Node) bool {
	return getRootDeclaration(node).Kind == ast.KindParameter
}

func getRootDeclaration(node *ast.Node) *ast.Node {
	for node.Kind == ast.KindBindingElement {
		node = node.Parent.Parent
	}
	return node
}

func isExternalOrCommonJsModule(file *ast.SourceFile) bool {
	return file.ExternalModuleIndicator != nil
}

func isAutoAccessorPropertyDeclaration(node *ast.Node) bool {
	return ast.IsPropertyDeclaration(node) && hasAccessorModifier(node)
}

func isAsyncFunction(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindFunctionDeclaration, ast.KindFunctionExpression, ast.KindArrowFunction, ast.KindMethodDeclaration:
		data := node.BodyData()
		return data.Body != nil && data.AsteriskToken == nil && hasSyntacticModifier(node, ast.ModifierFlagsAsync)
	}
	return false
}

func isObjectLiteralMethod(node *ast.Node) bool {
	return node != nil && node.Kind == ast.KindMethodDeclaration && node.Parent.Kind == ast.KindObjectLiteralExpression
}

func symbolName(symbol *ast.Symbol) string {
	if symbol.ValueDeclaration != nil && isPrivateIdentifierClassElementDeclaration(symbol.ValueDeclaration) {
		return symbol.ValueDeclaration.Name().AsPrivateIdentifier().Text
	}
	return symbol.Name
}

func isStaticPrivateIdentifierProperty(s *ast.Symbol) bool {
	return s.ValueDeclaration != nil && isPrivateIdentifierClassElementDeclaration(s.ValueDeclaration) && isStatic(s.ValueDeclaration)
}

func isPrivateIdentifierClassElementDeclaration(node *ast.Node) bool {
	return (ast.IsPropertyDeclaration(node) || isMethodOrAccessor(node)) && ast.IsPrivateIdentifier(node.Name())
}

func isMethodOrAccessor(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindMethodDeclaration, ast.KindGetAccessor, ast.KindSetAccessor:
		return true
	}
	return false
}

func isFunctionLikeOrClassStaticBlockDeclaration(node *ast.Node) bool {
	return node != nil && (ast.IsFunctionLike(node) || ast.IsClassStaticBlockDeclaration(node))
}

func isModuleAugmentationExternal(node *ast.Node) bool {
	// external module augmentation is a ambient module declaration that is either:
	// - defined in the top level scope and source file is an external module
	// - defined inside ambient module declaration located in the top level scope and source file not an external module
	switch node.Parent.Kind {
	case ast.KindSourceFile:
		return isExternalModule(node.Parent.AsSourceFile())
	case ast.KindModuleBlock:
		grandParent := node.Parent.Parent
		return isAmbientModule(grandParent) && ast.IsSourceFile(grandParent.Parent) && !isExternalModule(grandParent.Parent.AsSourceFile())
	}
	return false
}

func isValidPattern(pattern ast.Pattern) bool {
	return pattern.StarIndex == -1 || pattern.StarIndex < len(pattern.Text)
}

func tryParsePattern(pattern string) ast.Pattern {
	starIndex := strings.Index(pattern, "*")
	if starIndex == -1 || !strings.Contains(pattern[starIndex+1:], "*") {
		return ast.Pattern{Text: pattern, StarIndex: starIndex}
	}
	return ast.Pattern{}
}

func findBestPatternMatch(patterns []ast.Pattern, candidate string) ast.Pattern {
	var bestPattern ast.Pattern
	longestMatchPrefixLength := -1
	for _, pattern := range patterns {
		if (pattern.StarIndex == -1 || pattern.StarIndex > longestMatchPrefixLength) && isPatternMatch(pattern, candidate) {
			bestPattern = pattern
			longestMatchPrefixLength = pattern.StarIndex
		}
	}
	return bestPattern
}

func isPatternMatch(pattern ast.Pattern, candidate string) bool {
	if pattern.StarIndex == -1 {
		return pattern.Text == candidate
	}
	return len(candidate) >= pattern.StarIndex &&
		strings.HasPrefix(candidate, pattern.Text[:pattern.StarIndex]) &&
		strings.HasSuffix(candidate, pattern.Text[pattern.StarIndex+1:])
}

func matchedText(pattern ast.Pattern, candidate string) string {
	if !isPatternMatch(pattern, candidate) {
		panic("candidate does not match pattern")
	}
	if pattern.StarIndex == -1 {
		return ""
	}
	return candidate[pattern.StarIndex : len(candidate)-len(pattern.Text)+pattern.StarIndex+1]
}

func positionIsSynthesized(pos int) bool {
	return pos < 0
}

func shouldPreserveConstEnums(options *core.CompilerOptions) bool {
	return options.PreserveConstEnums == core.TSTrue || options.IsolatedModules == core.TSTrue
}

func exportAssignmentIsAlias(node *ast.Node) bool {
	return isAliasableExpression(getExportAssignmentExpression(node))
}

func getExportAssignmentExpression(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindExportAssignment:
		return node.AsExportAssignment().Expression
	case ast.KindBinaryExpression:
		return node.AsBinaryExpression().Right
	}
	panic("Unhandled case in getExportAssignmentExpression")
}

func isAliasableExpression(e *ast.Node) bool {
	return isEntityNameExpression(e) || ast.IsClassExpression(e)
}

func isEmptyObjectLiteral(expression *ast.Node) bool {
	return expression.Kind == ast.KindObjectLiteralExpression && len(expression.AsObjectLiteralExpression().Properties.Nodes) == 0
}

func isFunctionSymbol(symbol *ast.Symbol) bool {
	d := symbol.ValueDeclaration
	if d != nil {
		if ast.IsFunctionDeclaration(d) {
			return true
		}
		if ast.IsVariableDeclaration(d) {
			varDecl := d.AsVariableDeclaration()
			if varDecl.Initializer != nil {
				return ast.IsFunctionLike(varDecl.Initializer)
			}
		}
	}
	return false
}

func isLogicalOrCoalescingAssignmentOperator(token ast.Kind) bool {
	return token == ast.KindBarBarEqualsToken || token == ast.KindAmpersandAmpersandEqualsToken || token == ast.KindQuestionQuestionEqualsToken
}

func isLogicalOrCoalescingAssignmentExpression(expr *ast.Node) bool {
	return ast.IsBinaryExpression(expr) && isLogicalOrCoalescingAssignmentOperator(expr.AsBinaryExpression().OperatorToken.Kind)
}

func isLogicalOrCoalescingBinaryOperator(token ast.Kind) bool {
	return isBinaryLogicalOperator(token) || token == ast.KindQuestionQuestionToken
}

func isLogicalOrCoalescingBinaryExpression(expr *ast.Node) bool {
	return ast.IsBinaryExpression(expr) && isLogicalOrCoalescingBinaryOperator(expr.AsBinaryExpression().OperatorToken.Kind)
}

func isBinaryLogicalOperator(token ast.Kind) bool {
	return token == ast.KindBarBarToken || token == ast.KindAmpersandAmpersandToken
}

func isNullishCoalesce(node *ast.Node) bool {
	return node.Kind == ast.KindBinaryExpression && node.AsBinaryExpression().OperatorToken.Kind == ast.KindQuestionQuestionToken
}

func isDottedName(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindIdentifier, ast.KindThisKeyword, ast.KindSuperKeyword, ast.KindMetaProperty:
		return true
	case ast.KindPropertyAccessExpression, ast.KindParenthesizedExpression:
		return isDottedName(node.Expression())
	}
	return false
}

func unusedLabelIsError(options *core.CompilerOptions) bool {
	return options.AllowUnusedLabels == core.TSFalse
}

func unreachableCodeIsError(options *core.CompilerOptions) bool {
	return options.AllowUnreachableCode == core.TSFalse
}

func isDestructuringAssignment(node *ast.Node) bool {
	if isAssignmentExpression(node, true /*excludeCompoundAssignment*/) {
		kind := node.AsBinaryExpression().Left.Kind
		return kind == ast.KindObjectLiteralExpression || kind == ast.KindArrayLiteralExpression
	}
	return false
}

func isTopLevelLogicalExpression(node *ast.Node) bool {
	for ast.IsParenthesizedExpression(node.Parent) || ast.IsPrefixUnaryExpression(node.Parent) && node.Parent.AsPrefixUnaryExpression().Operator == ast.KindExclamationToken {
		node = node.Parent
	}
	return !isStatementCondition(node) && !isLogicalExpression(node.Parent) && !(ast.IsOptionalChain(node.Parent) && node.Parent.Expression() == node)
}

func isStatementCondition(node *ast.Node) bool {
	switch node.Parent.Kind {
	case ast.KindIfStatement:
		return node.Parent.AsIfStatement().Expression == node
	case ast.KindWhileStatement:
		return node.Parent.AsWhileStatement().Expression == node
	case ast.KindDoStatement:
		return node.Parent.AsDoStatement().Expression == node
	case ast.KindForStatement:
		return node.Parent.AsForStatement().Condition == node
	case ast.KindConditionalExpression:
		return node.Parent.AsConditionalExpression().Condition == node
	}
	return false
}

type AssignmentKind int32

const (
	AssignmentKindNone AssignmentKind = iota
	AssignmentKindDefinite
	AssignmentKindCompound
)

type AssignmentTarget = ast.Node // BinaryExpression | PrefixUnaryExpression | PostfixUnaryExpression | ForInOrOfStatement

func getAssignmentTargetKind(node *ast.Node) AssignmentKind {
	target := getAssignmentTarget(node)
	if target == nil {
		return AssignmentKindNone
	}
	switch target.Kind {
	case ast.KindBinaryExpression:
		binaryOperator := target.AsBinaryExpression().OperatorToken.Kind
		if binaryOperator == ast.KindEqualsToken || isLogicalOrCoalescingAssignmentOperator(binaryOperator) {
			return AssignmentKindDefinite
		}
		return AssignmentKindCompound
	case ast.KindPrefixUnaryExpression, ast.KindPostfixUnaryExpression:
		return AssignmentKindCompound
	case ast.KindForInStatement, ast.KindForOfStatement:
		return AssignmentKindDefinite
	}
	panic("Unhandled case in getAssignmentTargetKind")
}

// A node is an assignment target if it is on the left hand side of an '=' token, if it is parented by a property
// assignment in an object literal that is an assignment target, or if it is parented by an array literal that is
// an assignment target. Examples include 'a = xxx', '{ p: a } = xxx', '[{ a }] = xxx'.
// (Note that `p` is not a target in the above examples, only `a`.)
func isAssignmentTarget(node *ast.Node) bool {
	return getAssignmentTarget(node) != nil
}

// Returns the BinaryExpression, PrefixUnaryExpression, PostfixUnaryExpression, or ForInOrOfStatement that references
// the given node as an assignment target
func getAssignmentTarget(node *ast.Node) *ast.Node {
	for {
		parent := node.Parent
		switch parent.Kind {
		case ast.KindBinaryExpression:
			if isAssignmentOperator(parent.AsBinaryExpression().OperatorToken.Kind) && parent.AsBinaryExpression().Left == node {
				return parent
			}
			return nil
		case ast.KindPrefixUnaryExpression:
			if parent.AsPrefixUnaryExpression().Operator == ast.KindPlusPlusToken || parent.AsPrefixUnaryExpression().Operator == ast.KindMinusMinusToken {
				return parent
			}
			return nil
		case ast.KindPostfixUnaryExpression:
			if parent.AsPostfixUnaryExpression().Operator == ast.KindPlusPlusToken || parent.AsPostfixUnaryExpression().Operator == ast.KindMinusMinusToken {
				return parent
			}
			return nil
		case ast.KindForInStatement, ast.KindForOfStatement:
			if parent.AsForInOrOfStatement().Initializer == node {
				return parent
			}
			return nil
		case ast.KindParenthesizedExpression, ast.KindArrayLiteralExpression, ast.KindSpreadElement, ast.KindNonNullExpression:
			node = parent
		case ast.KindSpreadAssignment:
			node = parent.Parent
		case ast.KindShorthandPropertyAssignment:
			if parent.AsShorthandPropertyAssignment().Name() != node {
				return nil
			}
			node = parent.Parent
		case ast.KindPropertyAssignment:
			if parent.AsPropertyAssignment().Name() == node {
				return nil
			}
			node = parent.Parent
		default:
			return nil
		}
	}
}

func isDeleteTarget(node *ast.Node) bool {
	if !ast.IsAccessExpression(node) {
		return false
	}
	node = ast.WalkUpParenthesizedExpressions(node.Parent)
	return node != nil && node.Kind == ast.KindDeleteExpression
}

func isInCompoundLikeAssignment(node *ast.Node) bool {
	target := getAssignmentTarget(node)
	return target != nil && isAssignmentExpression(target /*excludeCompoundAssignment*/, true) && isCompoundLikeAssignment(target)
}

func isCompoundLikeAssignment(assignment *ast.Node) bool {
	right := ast.SkipParentheses(assignment.AsBinaryExpression().Right)
	return right.Kind == ast.KindBinaryExpression && isShiftOperatorOrHigher(right.AsBinaryExpression().OperatorToken.Kind)
}

func isPushOrUnshiftIdentifier(node *ast.Node) bool {
	text := node.AsIdentifier().Text
	return text == "push" || text == "unshift"
}

func isEntityNameExpression(node *ast.Node) bool {
	return node.Kind == ast.KindIdentifier || isPropertyAccessEntityNameExpression(node)
}

func isPropertyAccessEntityNameExpression(node *ast.Node) bool {
	if node.Kind == ast.KindPropertyAccessExpression {
		expr := node.AsPropertyAccessExpression()
		return expr.Name().Kind == ast.KindIdentifier && isEntityNameExpression(expr.Expression)
	}
	return false
}

func isPrologueDirective(node *ast.Node) bool {
	return node.Kind == ast.KindExpressionStatement && node.AsExpressionStatement().Expression.Kind == ast.KindStringLiteral
}

func getStatementsOfBlock(block *ast.Node) []*ast.Statement {
	switch block.Kind {
	case ast.KindBlock:
		return block.AsBlock().Statements.Nodes
	case ast.KindModuleBlock:
		return block.AsModuleBlock().Statements.Nodes
	case ast.KindSourceFile:
		return block.AsSourceFile().Statements.Nodes
	}
	panic("Unhandled case in getStatementsOfBlock")
}

func nodeHasName(statement *ast.Node, id *ast.Node) bool {
	name := statement.Name()
	if name != nil {
		return ast.IsIdentifier(name) && name.AsIdentifier().Text == id.AsIdentifier().Text
	}
	if ast.IsVariableStatement(statement) {
		declarations := statement.AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes
		return core.Some(declarations, func(d *ast.Node) bool { return nodeHasName(d, id) })
	}
	return false
}

func isImportMeta(node *ast.Node) bool {
	if node.Kind == ast.KindMetaProperty {
		return node.AsMetaProperty().KeywordToken == ast.KindImportKeyword && node.AsMetaProperty().Name().AsIdentifier().Text == "meta"
	}
	return false
}

func ensureScriptKind(fileName string, scriptKind core.ScriptKind) core.ScriptKind {
	// Using scriptKind as a condition handles both:
	// - 'scriptKind' is unspecified and thus it is `undefined`
	// - 'scriptKind' is set and it is `Unknown` (0)
	// If the 'scriptKind' is 'undefined' or 'Unknown' then we attempt
	// to get the ScriptKind from the file name. If it cannot be resolved
	// from the file name then the default 'TS' script kind is returned.
	if scriptKind == core.ScriptKindUnknown {
		scriptKind = getScriptKindFromFileName(fileName)
	}
	if scriptKind == core.ScriptKindUnknown {
		scriptKind = core.ScriptKindTS
	}
	return scriptKind
}

const (
	ExtensionTs          = ".ts"
	ExtensionTsx         = ".tsx"
	ExtensionDts         = ".d.ts"
	ExtensionJs          = ".js"
	ExtensionJsx         = ".jsx"
	ExtensionJson        = ".json"
	ExtensionTsBuildInfo = ".tsbuildinfo"
	ExtensionMjs         = ".mjs"
	ExtensionMts         = ".mts"
	ExtensionDmts        = ".d.mts"
	ExtensionCjs         = ".cjs"
	ExtensionCts         = ".cts"
	ExtensionDcts        = ".d.cts"
)

var supportedDeclarationExtensions = []string{ExtensionDts, ExtensionDcts, ExtensionDmts}
var supportedTSImplementationExtensions = []string{ExtensionTs, ExtensionTsx, ExtensionMts, ExtensionCts}
var supportedTSExtensionsForExtractExtension = []string{ExtensionDts, ExtensionDcts, ExtensionDmts, ExtensionTs, ExtensionTsx, ExtensionMts, ExtensionCts}

func getScriptKindFromFileName(fileName string) core.ScriptKind {
	dotPos := strings.LastIndex(fileName, ".")
	if dotPos >= 0 {
		switch strings.ToLower(fileName[dotPos:]) {
		case ExtensionJs, ExtensionCjs, ExtensionMjs:
			return core.ScriptKindJS
		case ExtensionJsx:
			return core.ScriptKindJSX
		case ExtensionTs, ExtensionCts, ExtensionMts:
			return core.ScriptKindTS
		case ExtensionTsx:
			return core.ScriptKindTSX
		case ExtensionJson:
			return core.ScriptKindJSON
		}
	}
	return core.ScriptKindUnknown
}

func getLanguageVariant(scriptKind core.ScriptKind) core.LanguageVariant {
	switch scriptKind {
	case core.ScriptKindTSX, core.ScriptKindJSX, core.ScriptKindJS, core.ScriptKindJSON:
		// .tsx and .jsx files are treated as jsx language variant.
		return core.LanguageVariantJSX
	}
	return core.LanguageVariantStandard
}

func getEmitScriptTarget(options *core.CompilerOptions) core.ScriptTarget {
	if options.Target != core.ScriptTargetNone {
		return options.Target
	}
	return core.ScriptTargetES5
}

func getEmitModuleKind(options *core.CompilerOptions) core.ModuleKind {
	if options.ModuleKind != core.ModuleKindNone {
		return options.ModuleKind
	}
	if options.Target >= core.ScriptTargetES2015 {
		return core.ModuleKindES2015
	}
	return core.ModuleKindCommonJS
}

func getEmitModuleResolutionKind(options *core.CompilerOptions) core.ModuleResolutionKind {
	if options.ModuleResolution != core.ModuleResolutionKindUnknown {
		return options.ModuleResolution
	}
	switch getEmitModuleKind(options) {
	case core.ModuleKindCommonJS:
		return core.ModuleResolutionKindBundler
	case core.ModuleKindNode16:
		return core.ModuleResolutionKindNode16
	case core.ModuleKindNodeNext:
		return core.ModuleResolutionKindNodeNext
	case core.ModuleKindPreserve:
		return core.ModuleResolutionKindBundler
	default:
		panic("Unhandled case in getEmitModuleResolutionKind")
	}
}

func getESModuleInterop(options *core.CompilerOptions) bool {
	if options.ESModuleInterop != core.TSUnknown {
		return options.ESModuleInterop == core.TSTrue
	}
	switch getEmitModuleKind(options) {
	case core.ModuleKindNode16:
	case core.ModuleKindNodeNext:
	case core.ModuleKindPreserve:
		return true
	}
	return false
}
func getAllowSyntheticDefaultImports(options *core.CompilerOptions) bool {
	if options.AllowSyntheticDefaultImports != core.TSUnknown {
		return options.AllowSyntheticDefaultImports == core.TSTrue
	}
	return getESModuleInterop(options) ||
		getEmitModuleKind(options) == core.ModuleKindSystem ||
		getEmitModuleResolutionKind(options) == core.ModuleResolutionKindBundler
}

func getResolveJsonModule(options *core.CompilerOptions) bool {
	if options.ResolveJsonModule != core.TSUnknown {
		return options.ResolveJsonModule == core.TSTrue
	}
	return getEmitModuleResolutionKind(options) == core.ModuleResolutionKindBundler
}

func getAllowJs(options *core.CompilerOptions) bool {
	if options.AllowJs != core.TSUnknown {
		return options.AllowJs == core.TSTrue
	}
	return options.CheckJs == core.TSTrue
}

type DiagnosticsCollection struct {
	fileDiagnostics    map[string][]*ast.Diagnostic
	nonFileDiagnostics []*ast.Diagnostic
}

func (c *DiagnosticsCollection) add(diagnostic *ast.Diagnostic) {
	if diagnostic.File() != nil {
		fileName := diagnostic.File().FileName()
		if c.fileDiagnostics == nil {
			c.fileDiagnostics = make(map[string][]*ast.Diagnostic)
		}
		c.fileDiagnostics[fileName] = core.InsertSorted(c.fileDiagnostics[fileName], diagnostic, CompareDiagnostics)
	} else {
		c.nonFileDiagnostics = core.InsertSorted(c.nonFileDiagnostics, diagnostic, CompareDiagnostics)
	}
}

func (c *DiagnosticsCollection) lookup(diagnostic *ast.Diagnostic) *ast.Diagnostic {
	var diagnostics []*ast.Diagnostic
	if diagnostic.File() != nil {
		diagnostics = c.fileDiagnostics[diagnostic.File().FileName()]
	} else {
		diagnostics = c.nonFileDiagnostics
	}
	if i, ok := slices.BinarySearchFunc(diagnostics, diagnostic, CompareDiagnostics); ok {
		return diagnostics[i]
	}
	return nil
}

func (c *DiagnosticsCollection) GetGlobalDiagnostics() []*ast.Diagnostic {
	return c.nonFileDiagnostics
}

func (c *DiagnosticsCollection) GetDiagnosticsForFile(fileName string) []*ast.Diagnostic {
	return c.fileDiagnostics[fileName]
}

func (c *DiagnosticsCollection) GetDiagnostics() []*ast.Diagnostic {
	fileNames := slices.Collect(maps.Keys(c.fileDiagnostics))
	slices.Sort(fileNames)
	diagnostics := c.nonFileDiagnostics
	for _, fileName := range fileNames {
		diagnostics = append(diagnostics, c.fileDiagnostics[fileName]...)
	}
	return diagnostics
}

func sortAndDeduplicateDiagnostics(diagnostics []*ast.Diagnostic) []*ast.Diagnostic {
	result := slices.Clone(diagnostics)
	slices.SortFunc(result, CompareDiagnostics)
	return slices.CompactFunc(result, equalDiagnostics)
}

func equalDiagnostics(d1, d2 *ast.Diagnostic) bool {
	return getDiagnosticPath(d1) == getDiagnosticPath(d2) &&
		d1.Loc() == d2.Loc() &&
		d1.Code() == d2.Code() &&
		d1.Message() == d2.Message() &&
		slices.EqualFunc(d1.MessageChain(), d2.MessageChain(), equalMessageChain) &&
		slices.EqualFunc(d1.RelatedInformation(), d2.RelatedInformation(), equalDiagnostics)
}

func equalMessageChain(c1, c2 *ast.MessageChain) bool {
	return c1.Code() == c2.Code() &&
		c1.Message() == c2.Message() &&
		slices.EqualFunc(c1.MessageChain(), c2.MessageChain(), equalMessageChain)
}

func CompareDiagnostics(d1, d2 *ast.Diagnostic) int {
	c := strings.Compare(getDiagnosticPath(d1), getDiagnosticPath(d2))
	if c != 0 {
		return c
	}
	c = d1.Loc().Pos() - d2.Loc().Pos()
	if c != 0 {
		return c
	}
	c = d1.Loc().End() - d2.Loc().End()
	if c != 0 {
		return c
	}
	c = int(d1.Code()) - int(d2.Code())
	if c != 0 {
		return c
	}
	c = strings.Compare(d1.Message(), d2.Message())
	if c != 0 {
		return c
	}
	c = compareMessageChainSize(d1.MessageChain(), d2.MessageChain())
	if c != 0 {
		return c
	}
	c = compareMessageChainContent(d1.MessageChain(), d2.MessageChain())
	if c != 0 {
		return c
	}
	return compareRelatedInfo(d1.RelatedInformation(), d2.RelatedInformation())
}

func compareMessageChainSize(c1, c2 []*ast.MessageChain) int {
	c := len(c2) - len(c1)
	if c != 0 {
		return c
	}
	for i := range c1 {
		c = compareMessageChainSize(c1[i].MessageChain(), c2[i].MessageChain())
		if c != 0 {
			return c
		}
	}
	return 0
}

func compareMessageChainContent(c1, c2 []*ast.MessageChain) int {
	for i := range c1 {
		c := strings.Compare(c1[i].Message(), c2[i].Message())
		if c != 0 {
			return c
		}
		if c1[i].MessageChain() != nil {
			c = compareMessageChainContent(c1[i].MessageChain(), c2[i].MessageChain())
			if c != 0 {
				return c
			}
		}
	}
	return 0
}

func compareRelatedInfo(r1, r2 []*ast.Diagnostic) int {
	c := len(r2) - len(r1)
	if c != 0 {
		return c
	}
	for i := range r1 {
		c = CompareDiagnostics(r1[i], r2[i])
		if c != 0 {
			return c
		}
	}
	return 0
}

func getDiagnosticPath(d *ast.Diagnostic) string {
	if d.File() != nil {
		return d.File().Path()
	}
	return ""
}

func isConstAssertion(location *ast.Node) bool {
	switch location.Kind {
	case ast.KindAsExpression:
		return isConstTypeReference(location.AsAsExpression().TypeNode)
	case ast.KindTypeAssertionExpression:
		return isConstTypeReference(location.AsTypeAssertion().TypeNode)
	}
	return false
}

func isConstTypeReference(node *ast.Node) bool {
	if node.Kind == ast.KindTypeReference {
		ref := node.AsTypeReference()
		return ref.TypeArguments != nil && ast.IsIdentifier(ref.TypeName) && ref.TypeName.AsIdentifier().Text == "const"
	}
	return false
}

func isModuleOrEnumDeclaration(node *ast.Node) bool {
	return node.Kind == ast.KindModuleDeclaration || node.Kind == ast.KindEnumDeclaration
}

func getLocalsOfNode(node *ast.Node) ast.SymbolTable {
	data := node.LocalsContainerData()
	if data != nil {
		return data.Locals
	}
	return nil
}

func getBodyOfNode(node *ast.Node) *ast.Node {
	bodyData := node.BodyData()
	if bodyData != nil {
		return bodyData.Body
	}
	return nil
}

func getFlowNodeOfNode(node *ast.Node) *ast.FlowNode {
	flowNodeData := node.FlowNodeData()
	if flowNodeData != nil {
		return flowNodeData.FlowNode
	}
	return nil
}

func isGlobalSourceFile(node *ast.Node) bool {
	return node.Kind == ast.KindSourceFile && !isExternalOrCommonJsModule(node.AsSourceFile())
}

func isParameterLikeOrReturnTag(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindParameter, ast.KindTypeParameter, ast.KindJSDocParameterTag, ast.KindJSDocReturnTag:
		return true
	}
	return false
}

func getEmitStandardClassFields(options *core.CompilerOptions) bool {
	return options.UseDefineForClassFields != core.TSFalse && getEmitScriptTarget(options) >= core.ScriptTargetES2022
}

func getLocalSymbolForExportDefault(symbol *ast.Symbol) *ast.Symbol {
	if !isExportDefaultSymbol(symbol) || len(symbol.Declarations) == 0 {
		return nil
	}
	for _, decl := range symbol.Declarations {
		localSymbol := decl.LocalSymbol()
		if localSymbol != nil {
			return localSymbol
		}
	}
	return nil
}

func isExportDefaultSymbol(symbol *ast.Symbol) bool {
	return symbol != nil && len(symbol.Declarations) > 0 && hasSyntacticModifier(symbol.Declarations[0], ast.ModifierFlagsDefault)
}

func getDeclarationOfKind(symbol *ast.Symbol, kind ast.Kind) *ast.Node {
	for _, declaration := range symbol.Declarations {
		if declaration.Kind == kind {
			return declaration
		}
	}
	return nil
}

func getIsolatedModules(options *core.CompilerOptions) bool {
	return options.IsolatedModules == core.TSTrue || options.VerbatimModuleSyntax == core.TSTrue
}

func findConstructorDeclaration(node *ast.Node) *ast.Node {
	for _, member := range node.ClassLikeData().Members.Nodes {
		if ast.IsConstructorDeclaration(member) && ast.NodeIsPresent(member.AsConstructorDeclaration().Body) {
			return member
		}
	}
	return nil
}

type NameResolver struct {
	compilerOptions                  *core.CompilerOptions
	getSymbolOfDeclaration           func(node *ast.Node) *ast.Symbol
	error                            func(location *ast.Node, message *diagnostics.Message, args ...any) *ast.Diagnostic
	globals                          ast.SymbolTable
	argumentsSymbol                  *ast.Symbol
	requireSymbol                    *ast.Symbol
	lookup                           func(symbols ast.SymbolTable, name string, meaning ast.SymbolFlags) *ast.Symbol
	setRequiresScopeChangeCache      func(node *ast.Node, value core.Tristate)
	getRequiresScopeChangeCache      func(node *ast.Node) core.Tristate
	onPropertyWithInvalidInitializer func(location *ast.Node, name string, declaration *ast.Node, result *ast.Symbol) bool
	onFailedToResolveSymbol          func(location *ast.Node, name string, meaning ast.SymbolFlags, nameNotFoundMessage *diagnostics.Message)
	onSuccessfullyResolvedSymbol     func(location *ast.Node, result *ast.Symbol, meaning ast.SymbolFlags, lastLocation *ast.Node, associatedDeclarationForContainingInitializerOrBindingName *ast.Node, withinDeferredContext bool)
}

func (r *NameResolver) resolve(location *ast.Node, name string, meaning ast.SymbolFlags, nameNotFoundMessage *diagnostics.Message, isUse bool, excludeGlobals bool) *ast.Symbol {
	var result *ast.Symbol
	var lastLocation *ast.Node
	var lastSelfReferenceLocation *ast.Node
	var propertyWithInvalidInitializer *ast.Node
	var associatedDeclarationForContainingInitializerOrBindingName *ast.Node
	var withinDeferredContext bool
	var grandparent *ast.Node
	originalLocation := location // needed for did-you-mean error reporting, which gathers candidates starting from the original location
	nameIsConst := name == "const"
loop:
	for location != nil {
		if nameIsConst && isConstAssertion(location) {
			// `const` in an `as const` has no symbol, but issues no error because there is no *actual* lookup of the type
			// (it refers to the constant type of the expression instead)
			return nil
		}
		if isModuleOrEnumDeclaration(location) && lastLocation != nil && location.Name() == lastLocation {
			// If lastLocation is the name of a namespace or enum, skip the parent since it will have is own locals that could
			// conflict.
			lastLocation = location
			location = location.Parent
		}
		locals := getLocalsOfNode(location)
		// Locals of a source file are not in scope (because they get merged into the global symbol table)
		if locals != nil && !isGlobalSourceFile(location) {
			result = r.lookup(locals, name, meaning)
			if result != nil {
				useResult := true
				if ast.IsFunctionLike(location) && lastLocation != nil && lastLocation != getBodyOfNode(location) {
					// symbol lookup restrictions for function-like declarations
					// - Type parameters of a function are in scope in the entire function declaration, including the parameter
					//   list and return type. However, local types are only in scope in the function body.
					// - parameters are only in the scope of function body
					// This restriction does not apply to JSDoc comment types because they are parented
					// at a higher level than type parameters would normally be
					if meaning&result.Flags&ast.SymbolFlagsType != 0 && lastLocation.Kind != ast.KindJSDoc {
						useResult = result.Flags&ast.SymbolFlagsTypeParameter != 0 && (lastLocation.Flags&ast.NodeFlagsSynthesized != 0 ||
							lastLocation == location.ReturnType() ||
							isParameterLikeOrReturnTag(lastLocation))
					}
					if meaning&result.Flags&ast.SymbolFlagsVariable != 0 {
						// expression inside parameter will lookup as normal variable scope when targeting es2015+
						if r.useOuterVariableScopeInParameter(result, location, lastLocation) {
							useResult = false
						} else if result.Flags&ast.SymbolFlagsFunctionScopedVariable != 0 {
							// parameters are visible only inside function body, parameter list and return type
							// technically for parameter list case here we might mix parameters and variables declared in function,
							// however it is detected separately when checking initializers of parameters
							// to make sure that they reference no variables declared after them.
							useResult = lastLocation.Kind == ast.KindParameter ||
								lastLocation.Flags&ast.NodeFlagsSynthesized != 0 ||
								lastLocation == location.ReturnType() && ast.FindAncestor(result.ValueDeclaration, ast.IsParameter) != nil
						}
					}
				} else if location.Kind == ast.KindConditionalType {
					// A type parameter declared using 'infer T' in a conditional type is visible only in
					// the true branch of the conditional type.
					useResult = lastLocation == location.AsConditionalTypeNode().TrueType
				}
				if useResult {
					break loop
				}
				result = nil
			}
		}
		withinDeferredContext = withinDeferredContext || getIsDeferredContext(location, lastLocation)
		switch location.Kind {
		case ast.KindSourceFile:
			if !isExternalOrCommonJsModule(location.AsSourceFile()) {
				break
			}
			fallthrough
		case ast.KindModuleDeclaration:
			moduleExports := r.getSymbolOfDeclaration(location).Exports
			if ast.IsSourceFile(location) || (ast.IsModuleDeclaration(location) && location.Flags&ast.NodeFlagsAmbient != 0 && !isGlobalScopeAugmentation(location)) {
				// It's an external module. First see if the module has an export default and if the local
				// name of that export default matches.
				result = moduleExports[InternalSymbolNameDefault]
				if result != nil {
					localSymbol := getLocalSymbolForExportDefault(result)
					if localSymbol != nil && result.Flags&meaning != 0 && localSymbol.Name == name {
						break loop
					}
					result = nil
				}
				// Because of module/namespace merging, a module's exports are in scope,
				// yet we never want to treat an export specifier as putting a member in scope.
				// Therefore, if the name we find is purely an export specifier, it is not actually considered in scope.
				// Two things to note about this:
				//     1. We have to check this without calling getSymbol. The problem with calling getSymbol
				//        on an export specifier is that it might find the export specifier itself, and try to
				//        resolve it as an alias. This will cause the checker to consider the export specifier
				//        a circular alias reference when it might not be.
				//     2. We check === SymbolFlags.Alias in order to check that the symbol is *purely*
				//        an alias. If we used &, we'd be throwing out symbols that have non alias aspects,
				//        which is not the desired behavior.
				moduleExport := moduleExports[name]
				if moduleExport != nil && moduleExport.Flags == ast.SymbolFlagsAlias && (getDeclarationOfKind(moduleExport, ast.KindExportSpecifier) != nil || getDeclarationOfKind(moduleExport, ast.KindNamespaceExport) != nil) {
					break
				}
			}
			if name != InternalSymbolNameDefault {
				result = r.lookup(moduleExports, name, meaning&ast.SymbolFlagsModuleMember)
				if result != nil {
					break loop
				}
			}
		case ast.KindEnumDeclaration:
			result = r.lookup(r.getSymbolOfDeclaration(location).Exports, name, meaning&ast.SymbolFlagsEnumMember)
			if result != nil {
				if nameNotFoundMessage != nil && getIsolatedModules(r.compilerOptions) && location.Flags&ast.NodeFlagsAmbient == 0 && ast.GetSourceFileOfNode(location) != ast.GetSourceFileOfNode(result.ValueDeclaration) {
					isolatedModulesLikeFlagName := ifElse(r.compilerOptions.VerbatimModuleSyntax == core.TSTrue, "verbatimModuleSyntax", "isolatedModules")
					r.error(originalLocation, diagnostics.Cannot_access_0_from_another_file_without_qualification_when_1_is_enabled_Use_2_instead,
						name, isolatedModulesLikeFlagName, r.getSymbolOfDeclaration(location).Name+"."+name)
				}
				break loop
			}
		case ast.KindPropertyDeclaration:
			if !isStatic(location) {
				ctor := findConstructorDeclaration(location.Parent)
				if ctor != nil && ctor.Locals() != nil {
					if r.lookup(ctor.Locals(), name, meaning&ast.SymbolFlagsValue) != nil {
						// Remember the property node, it will be used later to report appropriate error
						propertyWithInvalidInitializer = location
					}
				}
			}
		case ast.KindClassDeclaration, ast.KindClassExpression, ast.KindInterfaceDeclaration:
			result = r.lookup(r.getSymbolOfDeclaration(location).Members, name, meaning&ast.SymbolFlagsType)
			if result != nil {
				if !isTypeParameterSymbolDeclaredInContainer(result, location) {
					// ignore type parameters not declared in this container
					result = nil
					break
				}
				if lastLocation != nil && isStatic(lastLocation) {
					// TypeScript 1.0 spec (April 2014): 3.4.1
					// The scope of a type parameter extends over the entire declaration with which the type
					// parameter list is associated, with the exception of static member declarations in classes.
					if nameNotFoundMessage != nil {
						r.error(originalLocation, diagnostics.Static_members_cannot_reference_class_type_parameters)
					}
					return nil
				}
				break loop
			}
			if ast.IsClassExpression(location) && meaning&ast.SymbolFlagsClass != 0 {
				className := location.AsClassExpression().Name()
				if className != nil && name == className.AsIdentifier().Text {
					result = location.AsClassExpression().Symbol
					break loop
				}
			}
		case ast.KindExpressionWithTypeArguments:
			if lastLocation == location.AsExpressionWithTypeArguments().Expression && ast.IsHeritageClause(location.Parent) && location.Parent.AsHeritageClause().Token == ast.KindExtendsKeyword {
				container := location.Parent.Parent
				if ast.IsClassLike(container) {
					result = r.lookup(r.getSymbolOfDeclaration(container).Members, name, meaning&ast.SymbolFlagsType)
					if result != nil {
						if nameNotFoundMessage != nil {
							r.error(originalLocation, diagnostics.Base_class_expressions_cannot_reference_class_type_parameters)
						}
						return nil
					}
				}
			}
		// It is not legal to reference a class's own type parameters from a computed property name that
		// belongs to the class. For example:
		//
		//   function foo<T>() { return '' }
		//   class C<T> { // <-- Class's own type parameter T
		//       [foo<T>()]() { } // <-- Reference to T from class's own computed property
		//   }
		case ast.KindComputedPropertyName:
			grandparent = location.Parent.Parent
			if ast.IsClassLike(grandparent) || ast.IsInterfaceDeclaration(grandparent) {
				// A reference to this grandparent's type parameters would be an error
				result = r.lookup(r.getSymbolOfDeclaration(grandparent).Members, name, meaning&ast.SymbolFlagsType)
				if result != nil {
					if nameNotFoundMessage != nil {
						r.error(originalLocation, diagnostics.A_computed_property_name_cannot_reference_a_type_parameter_from_its_containing_type)
					}
					return nil
				}
			}
		case ast.KindArrowFunction:
			// when targeting ES6 or higher there is no 'arguments' in an arrow function
			// for lower compile targets the resolved symbol is used to emit an error
			if getEmitScriptTarget(r.compilerOptions) >= core.ScriptTargetES2015 {
				break
			}
			fallthrough
		case ast.KindMethodDeclaration, ast.KindConstructor, ast.KindGetAccessor, ast.KindSetAccessor, ast.KindFunctionDeclaration:
			if meaning&ast.SymbolFlagsVariable != 0 && name == "arguments" {
				result = r.argumentsSymbol
				break loop
			}
		case ast.KindFunctionExpression:
			if meaning&ast.SymbolFlagsVariable != 0 && name == "arguments" {
				result = r.argumentsSymbol
				break loop
			}
			if meaning&ast.SymbolFlagsFunction != 0 {
				functionName := location.AsFunctionExpression().Name()
				if functionName != nil && name == functionName.AsIdentifier().Text {
					result = location.AsFunctionExpression().Symbol
					break loop
				}
			}
		case ast.KindDecorator:
			// Decorators are resolved at the class declaration. Resolving at the parameter
			// or member would result in looking up locals in the method.
			//
			//   function y() {}
			//   class C {
			//       method(@y x, y) {} // <-- decorator y should be resolved at the class declaration, not the parameter.
			//   }
			//
			if location.Parent != nil && location.Parent.Kind == ast.KindParameter {
				location = location.Parent
			}
			//   function y() {}
			//   class C {
			//       @y method(x, y) {} // <-- decorator y should be resolved at the class declaration, not the method.
			//   }
			//
			// class Decorators are resolved outside of the class to avoid referencing type parameters of that class.
			//
			//   type T = number;
			//   declare function y(x: T): any;
			//   @param(1 as T) // <-- T should resolve to the type alias outside of class C
			//   class C<T> {}
			if location.Parent != nil && (ast.IsClassElement(location.Parent) || location.Parent.Kind == ast.KindClassDeclaration) {
				location = location.Parent
			}
		case ast.KindParameter:
			parameterDeclaration := location.AsParameterDeclaration()
			if lastLocation != nil && (lastLocation == parameterDeclaration.Initializer ||
				lastLocation == parameterDeclaration.Name() && ast.IsBindingPattern(lastLocation)) {
				if associatedDeclarationForContainingInitializerOrBindingName == nil {
					associatedDeclarationForContainingInitializerOrBindingName = location
				}
			}
		case ast.KindBindingElement:
			bindingElement := location.AsBindingElement()
			if lastLocation != nil && (lastLocation == bindingElement.Initializer ||
				lastLocation == bindingElement.Name() && ast.IsBindingPattern(lastLocation)) {
				if isPartOfParameterDeclaration(location) && associatedDeclarationForContainingInitializerOrBindingName == nil {
					associatedDeclarationForContainingInitializerOrBindingName = location
				}
			}
		case ast.KindInferType:
			if meaning&ast.SymbolFlagsTypeParameter != 0 {
				parameterName := location.AsInferTypeNode().TypeParameter.AsTypeParameter().Name()
				if parameterName != nil && name == parameterName.AsIdentifier().Text {
					result = location.AsInferTypeNode().TypeParameter.AsTypeParameter().Symbol
					break loop
				}
			}
		case ast.KindExportSpecifier:
			exportSpecifier := location.AsExportSpecifier()
			if lastLocation != nil && lastLocation == exportSpecifier.PropertyName && location.Parent.Parent.AsExportDeclaration().ModuleSpecifier != nil {
				location = location.Parent.Parent.Parent
			}
		}
		if isSelfReferenceLocation(location, lastLocation) {
			lastSelfReferenceLocation = location
		}
		lastLocation = location
		switch {
		// case isJSDocTemplateTag(location):
		// 	location = getEffectiveContainerForJSDocTemplateTag(location.(*JSDocTemplateTag))
		// 	if location == nil {
		// 		location = location.parent
		// 	}
		// case isJSDocParameterTag(location) || isJSDocReturnTag(location):
		// 	location = getHostSignatureFromJSDoc(location)
		// 	if location == nil {
		// 		location = location.parent
		// 	}
		default:
			location = location.Parent
		}
	}
	// We just climbed up parents looking for the name, meaning that we started in a descendant node of `lastLocation`.
	// If `result === lastSelfReferenceLocation.symbol`, that means that we are somewhere inside `lastSelfReferenceLocation` looking up a name, and resolving to `lastLocation` itself.
	// That means that this is a self-reference of `lastLocation`, and shouldn't count this when considering whether `lastLocation` is used.
	if isUse && result != nil && (lastSelfReferenceLocation == nil || result != lastSelfReferenceLocation.Symbol()) {
		// !!! result.isReferenced |= meaning
	}
	if result == nil {
		if !excludeGlobals {
			result = r.lookup(r.globals, name, meaning)
		}
	}
	if nameNotFoundMessage != nil {
		if propertyWithInvalidInitializer != nil && r.onPropertyWithInvalidInitializer(originalLocation, name, propertyWithInvalidInitializer, result) {
			return nil
		}
		if result == nil {
			r.onFailedToResolveSymbol(originalLocation, name, meaning, nameNotFoundMessage)
		} else {
			r.onSuccessfullyResolvedSymbol(originalLocation, result, meaning, lastLocation, associatedDeclarationForContainingInitializerOrBindingName, withinDeferredContext)
		}
	}
	return result
}

func (r *NameResolver) useOuterVariableScopeInParameter(result *ast.Symbol, location *ast.Node, lastLocation *ast.Node) bool {
	if ast.IsParameter(lastLocation) {
		body := getBodyOfNode(location)
		if body != nil && result.ValueDeclaration != nil && result.ValueDeclaration.Pos() >= body.Pos() && result.ValueDeclaration.End() <= body.End() {
			// check for several cases where we introduce temporaries that require moving the name/initializer of the parameter to the body
			// - static field in a class expression
			// - optional chaining pre-es2020
			// - nullish coalesce pre-es2020
			// - spread assignment in binding pattern pre-es2017
			target := getEmitScriptTarget(r.compilerOptions)
			if target >= core.ScriptTargetES2015 {
				functionLocation := location
				declarationRequiresScopeChange := r.getRequiresScopeChangeCache(functionLocation)
				if declarationRequiresScopeChange == core.TSUnknown {
					declarationRequiresScopeChange = boolToTristate(core.Some(functionLocation.Parameters(), r.requiresScopeChange))
					r.setRequiresScopeChangeCache(functionLocation, declarationRequiresScopeChange)
				}
				return declarationRequiresScopeChange == core.TSTrue
			}
		}
	}
	return false
}

func (r *NameResolver) requiresScopeChange(node *ast.Node) bool {
	d := node.AsParameterDeclaration()
	return r.requiresScopeChangeWorker(d.Name()) || d.Initializer != nil && r.requiresScopeChangeWorker(d.Initializer)
}

func (r *NameResolver) requiresScopeChangeWorker(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindArrowFunction, ast.KindFunctionExpression, ast.KindFunctionDeclaration, ast.KindConstructor:
		return false
	case ast.KindMethodDeclaration, ast.KindGetAccessor, ast.KindSetAccessor, ast.KindPropertyAssignment:
		return r.requiresScopeChangeWorker(node.Name())
	case ast.KindPropertyDeclaration:
		if hasStaticModifier(node) {
			return !getEmitStandardClassFields(r.compilerOptions)
		}
		return r.requiresScopeChangeWorker(node.AsPropertyDeclaration().Name())
	default:
		if isNullishCoalesce(node) || ast.IsOptionalChain(node) {
			return getEmitScriptTarget(r.compilerOptions) < core.ScriptTargetES2020
		}
		if ast.IsBindingElement(node) && node.AsBindingElement().DotDotDotToken != nil && ast.IsObjectBindingPattern(node.Parent) {
			return getEmitScriptTarget(r.compilerOptions) < core.ScriptTargetES2017
		}
		if ast.IsTypeNode(node) {
			return false
		}
		return node.ForEachChild(r.requiresScopeChangeWorker)
	}
}

func getIsDeferredContext(location *ast.Node, lastLocation *ast.Node) bool {
	if location.Kind != ast.KindArrowFunction && location.Kind != ast.KindFunctionExpression {
		// initializers in instance property declaration of class like entities are executed in constructor and thus deferred
		// A name is evaluated within the enclosing scope - so it shouldn't count as deferred
		return ast.IsTypeQueryNode(location) ||
			(ast.IsFunctionLikeDeclaration(location) || location.Kind == ast.KindPropertyDeclaration && !isStatic(location)) &&
				(lastLocation == nil || lastLocation != location.Name())
	}
	if lastLocation != nil && lastLocation == location.Name() {
		return false
	}
	// generator functions and async functions are not inlined in control flow when immediately invoked
	if location.BodyData().AsteriskToken != nil || hasSyntacticModifier(location, ast.ModifierFlagsAsync) {
		return true
	}
	return getImmediatelyInvokedFunctionExpression(location) == nil
}

func isTypeParameterSymbolDeclaredInContainer(symbol *ast.Symbol, container *ast.Node) bool {
	for _, decl := range symbol.Declarations {
		if decl.Kind == ast.KindTypeParameter {
			parent := decl.Parent.Parent
			if parent == container {
				return true
			}
		}
	}
	return false
}

func isSelfReferenceLocation(node *ast.Node, lastLocation *ast.Node) bool {
	switch node.Kind {
	case ast.KindParameter:
		return lastLocation != nil && lastLocation == node.AsParameterDeclaration().Name()
	case ast.KindFunctionDeclaration, ast.KindClassDeclaration, ast.KindInterfaceDeclaration, ast.KindEnumDeclaration,
		ast.KindTypeAliasDeclaration, ast.KindModuleDeclaration: // For `namespace N { N; }`
		return true
	}
	return false
}

func isTypeReferenceIdentifier(node *ast.Node) bool {
	for node.Parent.Kind == ast.KindQualifiedName {
		node = node.Parent
	}
	return ast.IsTypeReferenceNode(node.Parent)
}

func isInTypeQuery(node *ast.Node) bool {
	// TypeScript 1.0 spec (April 2014): 3.6.3
	// A type query consists of the keyword typeof followed by an expression.
	// The expression is restricted to a single identifier or a sequence of identifiers separated by periods
	return ast.FindAncestorOrQuit(node, func(n *ast.Node) ast.FindAncestorResult {
		switch n.Kind {
		case ast.KindTypeQuery:
			return ast.FindAncestorTrue
		case ast.KindIdentifier, ast.KindQualifiedName:
			return ast.FindAncestorFalse
		}
		return ast.FindAncestorQuit
	}) != nil
}

func isTypeOnlyImportDeclaration(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindImportSpecifier:
		return node.AsImportSpecifier().IsTypeOnly || node.Parent.Parent.AsImportClause().IsTypeOnly
	case ast.KindNamespaceImport:
		return node.Parent.AsImportClause().IsTypeOnly
	case ast.KindImportClause:
		return node.AsImportClause().IsTypeOnly
	case ast.KindImportEqualsDeclaration:
		return node.AsImportEqualsDeclaration().IsTypeOnly
	}
	return false
}

func isTypeOnlyExportDeclaration(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindExportSpecifier:
		return node.AsExportSpecifier().IsTypeOnly || node.Parent.Parent.AsExportDeclaration().IsTypeOnly
	case ast.KindExportDeclaration:
		d := node.AsExportDeclaration()
		return d.IsTypeOnly && d.ModuleSpecifier != nil && d.ExportClause == nil
	case ast.KindNamespaceExport:
		return node.Parent.AsExportDeclaration().IsTypeOnly
	}
	return false
}

func isTypeOnlyImportOrExportDeclaration(node *ast.Node) bool {
	return isTypeOnlyImportDeclaration(node) || isTypeOnlyExportDeclaration(node)
}

func getNameFromImportDeclaration(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindImportSpecifier:
		return node.AsImportSpecifier().Name()
	case ast.KindNamespaceImport:
		return node.AsNamespaceImport().Name()
	case ast.KindImportClause:
		return node.AsImportClause().Name()
	case ast.KindImportEqualsDeclaration:
		return node.AsImportEqualsDeclaration().Name()
	}
	return nil
}

func isValidTypeOnlyAliasUseSite(useSite *ast.Node) bool {
	return useSite.Flags&ast.NodeFlagsAmbient != 0 ||
		isPartOfTypeQuery(useSite) ||
		isIdentifierInNonEmittingHeritageClause(useSite) ||
		isPartOfPossiblyValidTypeOrAbstractComputedPropertyName(useSite) ||
		!(isExpressionNode(useSite) || isShorthandPropertyNameUseSite(useSite))
}

func isIdentifierInNonEmittingHeritageClause(node *ast.Node) bool {
	if node.Kind != ast.KindIdentifier {
		return false
	}
	heritageClause := ast.FindAncestorOrQuit(node.Parent, func(parent *ast.Node) ast.FindAncestorResult {
		switch parent.Kind {
		case ast.KindHeritageClause:
			return ast.FindAncestorTrue
		case ast.KindPropertyAccessExpression, ast.KindExpressionWithTypeArguments:
			return ast.FindAncestorFalse
		default:
			return ast.FindAncestorQuit
		}
	})
	if heritageClause != nil {
		return heritageClause.AsHeritageClause().Token == ast.KindImmediateKeyword || heritageClause.Parent.Kind == ast.KindInterfaceDeclaration
	}
	return false
}

func isPartOfPossiblyValidTypeOrAbstractComputedPropertyName(node *ast.Node) bool {
	for ast.NodeKindIs(node, ast.KindIdentifier, ast.KindPropertyAccessExpression) {
		node = node.Parent
	}
	if node.Kind != ast.KindComputedPropertyName {
		return false
	}
	if hasSyntacticModifier(node.Parent, ast.ModifierFlagsAbstract) {
		return true
	}
	return ast.NodeKindIs(node.Parent.Parent, ast.KindInterfaceDeclaration, ast.KindTypeLiteral)
}

func isExpressionNode(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindSuperKeyword, ast.KindNullKeyword, ast.KindTrueKeyword, ast.KindFalseKeyword, ast.KindRegularExpressionLiteral,
		ast.KindArrayLiteralExpression, ast.KindObjectLiteralExpression, ast.KindPropertyAccessExpression, ast.KindElementAccessExpression,
		ast.KindCallExpression, ast.KindNewExpression, ast.KindTaggedTemplateExpression, ast.KindAsExpression, ast.KindTypeAssertionExpression,
		ast.KindSatisfiesExpression, ast.KindNonNullExpression, ast.KindParenthesizedExpression, ast.KindFunctionExpression,
		ast.KindClassExpression, ast.KindArrowFunction, ast.KindVoidExpression, ast.KindDeleteExpression, ast.KindTypeOfExpression,
		ast.KindPrefixUnaryExpression, ast.KindPostfixUnaryExpression, ast.KindBinaryExpression, ast.KindConditionalExpression,
		ast.KindSpreadElement, ast.KindTemplateExpression, ast.KindOmittedExpression, ast.KindJsxElement, ast.KindJsxSelfClosingElement,
		ast.KindJsxFragment, ast.KindYieldExpression, ast.KindAwaitExpression, ast.KindMetaProperty:
		return true
	case ast.KindExpressionWithTypeArguments:
		return !ast.IsHeritageClause(node.Parent)
	case ast.KindQualifiedName:
		for node.Parent.Kind == ast.KindQualifiedName {
			node = node.Parent
		}
		return ast.IsTypeQueryNode(node.Parent) || isJSDocLinkLike(node.Parent) || isJSXTagName(node)
	case ast.KindJSDocMemberName:
		return ast.IsTypeQueryNode(node.Parent) || isJSDocLinkLike(node.Parent) || isJSXTagName(node)
	case ast.KindPrivateIdentifier:
		return ast.IsBinaryExpression(node.Parent) && node.Parent.AsBinaryExpression().Left == node && node.Parent.AsBinaryExpression().OperatorToken.Kind == ast.KindInKeyword
	case ast.KindIdentifier:
		if ast.IsTypeQueryNode(node.Parent) || isJSDocLinkLike(node.Parent) || isJSXTagName(node) {
			return true
		}
		fallthrough
	case ast.KindNumericLiteral, ast.KindBigIntLiteral, ast.KindStringLiteral, ast.KindNoSubstitutionTemplateLiteral, ast.KindThisKeyword:
		return isInExpressionContext(node)
	default:
		return false
	}
}

func isInExpressionContext(node *ast.Node) bool {
	parent := node.Parent
	switch parent.Kind {
	case ast.KindVariableDeclaration:
		return parent.AsVariableDeclaration().Initializer == node
	case ast.KindParameter:
		return parent.AsParameterDeclaration().Initializer == node
	case ast.KindPropertyDeclaration:
		return parent.AsPropertyDeclaration().Initializer == node
	case ast.KindPropertySignature:
		return parent.AsPropertySignatureDeclaration().Initializer == node
	case ast.KindEnumMember:
		return parent.AsEnumMember().Initializer == node
	case ast.KindPropertyAssignment:
		return parent.AsPropertyAssignment().Initializer == node
	case ast.KindBindingElement:
		return parent.AsBindingElement().Initializer == node
	case ast.KindExpressionStatement:
		return parent.AsExpressionStatement().Expression == node
	case ast.KindIfStatement:
		return parent.AsIfStatement().Expression == node
	case ast.KindDoStatement:
		return parent.AsDoStatement().Expression == node
	case ast.KindWhileStatement:
		return parent.AsWhileStatement().Expression == node
	case ast.KindReturnStatement:
		return parent.AsReturnStatement().Expression == node
	case ast.KindWithStatement:
		return parent.AsWithStatement().Expression == node
	case ast.KindSwitchStatement:
		return parent.AsSwitchStatement().Expression == node
	case ast.KindCaseClause, ast.KindDefaultClause:
		return parent.AsCaseOrDefaultClause().Expression == node
	case ast.KindThrowStatement:
		return parent.AsThrowStatement().Expression == node
	case ast.KindForStatement:
		s := parent.AsForStatement()
		return s.Initializer == node && s.Initializer.Kind != ast.KindVariableDeclarationList || s.Condition == node || s.Incrementor == node
	case ast.KindForInStatement, ast.KindForOfStatement:
		s := parent.AsForInOrOfStatement()
		return s.Initializer == node && s.Initializer.Kind != ast.KindVariableDeclarationList || s.Expression == node
	case ast.KindTypeAssertionExpression:
		return parent.AsTypeAssertion().Expression == node
	case ast.KindAsExpression:
		return parent.AsAsExpression().Expression == node
	case ast.KindTemplateSpan:
		return parent.AsTemplateSpan().Expression == node
	case ast.KindComputedPropertyName:
		return parent.AsComputedPropertyName().Expression == node
	case ast.KindDecorator, ast.KindJsxExpression, ast.KindJsxSpreadAttribute, ast.KindSpreadAssignment:
		return true
	case ast.KindExpressionWithTypeArguments:
		return parent.AsExpressionWithTypeArguments().Expression == node && !isPartOfTypeNode(parent)
	case ast.KindShorthandPropertyAssignment:
		return parent.AsShorthandPropertyAssignment().ObjectAssignmentInitializer == node
	case ast.KindSatisfiesExpression:
		return parent.AsSatisfiesExpression().Expression == node
	default:
		return isExpressionNode(parent)
	}
}

func isPartOfTypeNode(node *ast.Node) bool {
	kind := node.Kind
	if kind >= ast.KindFirstTypeNode && kind <= ast.KindLastTypeNode {
		return true
	}
	switch node.Kind {
	case ast.KindAnyKeyword, ast.KindUnknownKeyword, ast.KindNumberKeyword, ast.KindBigIntKeyword, ast.KindStringKeyword,
		ast.KindBooleanKeyword, ast.KindSymbolKeyword, ast.KindObjectKeyword, ast.KindUndefinedKeyword, ast.KindNullKeyword,
		ast.KindNeverKeyword:
		return true
	case ast.KindExpressionWithTypeArguments:
		return isPartOfTypeExpressionWithTypeArguments(node)
	case ast.KindTypeParameter:
		return node.Parent.Kind == ast.KindMappedType || node.Parent.Kind == ast.KindInferType
	case ast.KindIdentifier:
		parent := node.Parent
		if ast.IsQualifiedName(parent) && parent.AsQualifiedName().Right == node {
			return isPartOfTypeNodeInParent(parent)
		}
		if ast.IsPropertyAccessExpression(parent) && parent.AsPropertyAccessExpression().Name() == node {
			return isPartOfTypeNodeInParent(parent)
		}
		return isPartOfTypeNodeInParent(node)
	case ast.KindQualifiedName, ast.KindPropertyAccessExpression, ast.KindThisKeyword:
		return isPartOfTypeNodeInParent(node)
	}
	return false
}

func isPartOfTypeNodeInParent(node *ast.Node) bool {
	parent := node.Parent
	// Do not recursively call isPartOfTypeNode on the parent. In the example:
	//
	//     let a: A.B.C;
	//
	// Calling isPartOfTypeNode would consider the qualified name A.B a type node.
	// Only C and A.B.C are type nodes.
	if parent.Kind >= ast.KindFirstTypeNode && parent.Kind <= ast.KindLastTypeNode {
		return true
	}
	switch parent.Kind {
	case ast.KindTypeQuery:
		return false
	case ast.KindImportType:
		return !parent.AsImportTypeNode().IsTypeOf
	case ast.KindExpressionWithTypeArguments:
		return isPartOfTypeExpressionWithTypeArguments(parent)
	case ast.KindTypeParameter:
		return node == parent.AsTypeParameter().Constraint
	case ast.KindPropertyDeclaration:
		return node == parent.AsPropertyDeclaration().TypeNode
	case ast.KindPropertySignature:
		return node == parent.AsPropertySignatureDeclaration().TypeNode
	case ast.KindParameter:
		return node == parent.AsParameterDeclaration().TypeNode
	case ast.KindVariableDeclaration:
		return node == parent.AsVariableDeclaration().TypeNode
	case ast.KindFunctionDeclaration, ast.KindFunctionExpression, ast.KindArrowFunction, ast.KindConstructor, ast.KindMethodDeclaration,
		ast.KindMethodSignature, ast.KindGetAccessor, ast.KindSetAccessor, ast.KindCallSignature, ast.KindConstructSignature,
		ast.KindIndexSignature:
		return node == parent.ReturnType()
	case ast.KindTypeAssertionExpression:
		return node == parent.AsTypeAssertion().TypeNode
	case ast.KindCallExpression, ast.KindNewExpression, ast.KindTaggedTemplateExpression:
		return slices.Contains(getTypeArgumentNodesFromNode(parent), node)
	}
	return false
}

func isPartOfTypeExpressionWithTypeArguments(node *ast.Node) bool {
	parent := node.Parent
	return ast.IsHeritageClause(parent) && (!ast.IsClassLike(parent.Parent) || parent.AsHeritageClause().Token == ast.KindImplementsKeyword)
}

func isJSDocLinkLike(node *ast.Node) bool {
	return ast.NodeKindIs(node, ast.KindJSDocLink, ast.KindJSDocLinkCode, ast.KindJSDocLinkPlain)
}

func isJSXTagName(node *ast.Node) bool {
	parent := node.Parent
	switch parent.Kind {
	case ast.KindJsxOpeningElement:
		return parent.AsJsxOpeningElement().TagName == node
	case ast.KindJsxSelfClosingElement:
		return parent.AsJsxSelfClosingElement().TagName == node
	case ast.KindJsxClosingElement:
		return parent.AsJsxClosingElement().TagName == node
	}
	return false
}

func isShorthandPropertyNameUseSite(useSite *ast.Node) bool {
	return ast.IsIdentifier(useSite) && ast.IsShorthandPropertyAssignment(useSite.Parent) && useSite.Parent.AsShorthandPropertyAssignment().Name() == useSite
}

func isTypeDeclaration(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindTypeParameter, ast.KindClassDeclaration, ast.KindInterfaceDeclaration, ast.KindTypeAliasDeclaration, ast.KindEnumDeclaration:
		return true
	case ast.KindImportClause:
		return node.AsImportClause().IsTypeOnly
	case ast.KindImportSpecifier:
		return node.Parent.Parent.AsImportClause().IsTypeOnly
	case ast.KindExportSpecifier:
		return node.Parent.Parent.AsExportDeclaration().IsTypeOnly
	default:
		return false
	}
}

func canHaveSymbol(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindArrowFunction, ast.KindBinaryExpression, ast.KindBindingElement, ast.KindCallExpression, ast.KindCallSignature,
		ast.KindClassDeclaration, ast.KindClassExpression, ast.KindClassStaticBlockDeclaration, ast.KindConstructor, ast.KindConstructorType,
		ast.KindConstructSignature, ast.KindElementAccessExpression, ast.KindEnumDeclaration, ast.KindEnumMember, ast.KindExportAssignment,
		ast.KindExportDeclaration, ast.KindExportSpecifier, ast.KindFunctionDeclaration, ast.KindFunctionExpression, ast.KindFunctionType,
		ast.KindGetAccessor, ast.KindIdentifier, ast.KindImportClause, ast.KindImportEqualsDeclaration, ast.KindImportSpecifier,
		ast.KindIndexSignature, ast.KindInterfaceDeclaration, ast.KindJSDocCallbackTag, ast.KindJSDocEnumTag, ast.KindJSDocFunctionType,
		ast.KindJSDocParameterTag, ast.KindJSDocPropertyTag, ast.KindJSDocSignature, ast.KindJSDocTypedefTag, ast.KindJSDocTypeLiteral,
		ast.KindJsxAttribute, ast.KindJsxAttributes, ast.KindJsxSpreadAttribute, ast.KindMappedType, ast.KindMethodDeclaration,
		ast.KindMethodSignature, ast.KindModuleDeclaration, ast.KindNamedTupleMember, ast.KindNamespaceExport, ast.KindNamespaceExportDeclaration,
		ast.KindNamespaceImport, ast.KindNewExpression, ast.KindNoSubstitutionTemplateLiteral, ast.KindNumericLiteral, ast.KindObjectLiteralExpression,
		ast.KindParameter, ast.KindPropertyAccessExpression, ast.KindPropertyAssignment, ast.KindPropertyDeclaration, ast.KindPropertySignature,
		ast.KindSetAccessor, ast.KindShorthandPropertyAssignment, ast.KindSourceFile, ast.KindSpreadAssignment, ast.KindStringLiteral,
		ast.KindTypeAliasDeclaration, ast.KindTypeLiteral, ast.KindTypeParameter, ast.KindVariableDeclaration:
		return true
	}
	return false
}

func canHaveLocals(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindArrowFunction, ast.KindBlock, ast.KindCallSignature, ast.KindCaseBlock, ast.KindCatchClause,
		ast.KindClassStaticBlockDeclaration, ast.KindConditionalType, ast.KindConstructor, ast.KindConstructorType,
		ast.KindConstructSignature, ast.KindForStatement, ast.KindForInStatement, ast.KindForOfStatement, ast.KindFunctionDeclaration,
		ast.KindFunctionExpression, ast.KindFunctionType, ast.KindGetAccessor, ast.KindIndexSignature, ast.KindJSDocCallbackTag,
		ast.KindJSDocEnumTag, ast.KindJSDocFunctionType, ast.KindJSDocSignature, ast.KindJSDocTypedefTag, ast.KindMappedType,
		ast.KindMethodDeclaration, ast.KindMethodSignature, ast.KindModuleDeclaration, ast.KindSetAccessor, ast.KindSourceFile,
		ast.KindTypeAliasDeclaration:
		return true
	}
	return false
}

func isAnyImportOrReExport(node *ast.Node) bool {
	return isAnyImportSyntax(node) || ast.IsExportDeclaration(node)
}

func isAnyImportSyntax(node *ast.Node) bool {
	return ast.NodeKindIs(node, ast.KindImportDeclaration, ast.KindImportEqualsDeclaration)
}

func getExternalModuleName(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindImportDeclaration:
		return node.AsImportDeclaration().ModuleSpecifier
	case ast.KindExportDeclaration:
		return node.AsExportDeclaration().ModuleSpecifier
	case ast.KindImportEqualsDeclaration:
		if node.AsImportEqualsDeclaration().ModuleReference.Kind == ast.KindExternalModuleReference {
			return node.AsImportEqualsDeclaration().ModuleReference.AsExternalModuleReference().Expression_
		}
		return nil
	case ast.KindImportType:
		return getImportTypeNodeLiteral(node)
	case ast.KindCallExpression:
		return node.AsCallExpression().Arguments.Nodes[0]
	case ast.KindModuleDeclaration:
		if ast.IsStringLiteral(node.AsModuleDeclaration().Name()) {
			return node.AsModuleDeclaration().Name()
		}
		return nil
	}
	panic("Unhandled case in getExternalModuleName")
}

func getImportTypeNodeLiteral(node *ast.Node) *ast.Node {
	if ast.IsImportTypeNode(node) {
		importTypeNode := node.AsImportTypeNode()
		if ast.IsLiteralTypeNode(importTypeNode.Argument) {
			literalTypeNode := importTypeNode.Argument.AsLiteralTypeNode()
			if ast.IsStringLiteral(literalTypeNode.Literal) {
				return literalTypeNode.Literal
			}
		}
	}
	return nil
}

func isExternalModuleNameRelative(moduleName string) bool {
	// TypeScript 1.0 spec (April 2014): 11.2.1
	// An external module name is "relative" if the first term is "." or "..".
	// Update: We also consider a path like `C:\foo.ts` "relative" because we do not search for it in `node_modules` or treat it as an ambient module.
	return tspath.PathIsRelative(moduleName) || tspath.IsRootedDiskPath(moduleName)
}

func extensionIsTs(ext string) bool {
	return ext == ExtensionTs || ext == ExtensionTsx || ext == ExtensionDts || ext == ExtensionMts || ext == ExtensionDmts || ext == ExtensionCts || ext == ExtensionDcts || len(ext) >= 7 && ext[:3] == ".d." && ext[len(ext)-3:] == ".ts"
}

func isShorthandAmbientModuleSymbol(moduleSymbol *ast.Symbol) bool {
	return isShorthandAmbientModule(moduleSymbol.ValueDeclaration)
}

func isShorthandAmbientModule(node *ast.Node) bool {
	// The only kind of module that can be missing a body is a shorthand ambient module.
	return node != nil && node.Kind == ast.KindModuleDeclaration && node.AsModuleDeclaration().Body == nil
}

func getFirstIdentifier(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindIdentifier:
		return node
	case ast.KindQualifiedName:
		return getFirstIdentifier(node.AsQualifiedName().Left)
	case ast.KindPropertyAccessExpression:
		return getFirstIdentifier(node.AsPropertyAccessExpression().Expression)
	}
	panic("Unhandled case in getFirstIdentifier")
}

func getAliasDeclarationFromName(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindImportClause, ast.KindImportSpecifier, ast.KindNamespaceImport, ast.KindExportSpecifier, ast.KindExportAssignment,
		ast.KindImportEqualsDeclaration, ast.KindNamespaceExport:
		return node.Parent
	case ast.KindQualifiedName:
		return getAliasDeclarationFromName(node.Parent)
	}
	return nil
}

func entityNameToString(name *ast.Node) string {
	switch name.Kind {
	case ast.KindThisKeyword:
		return "this"
	case ast.KindIdentifier, ast.KindPrivateIdentifier:
		return getTextOfNode(name)
	case ast.KindQualifiedName:
		return entityNameToString(name.AsQualifiedName().Left) + "." + entityNameToString(name.AsQualifiedName().Right)
	case ast.KindPropertyAccessExpression:
		return entityNameToString(name.AsPropertyAccessExpression().Expression) + "." + entityNameToString(name.AsPropertyAccessExpression().Name())
	case ast.KindJsxNamespacedName:
		return entityNameToString(name.AsJsxNamespacedName().Namespace) + ":" + entityNameToString(name.AsJsxNamespacedName().Name())
	}
	panic("Unhandled case in entityNameToString")
}

func getContainingQualifiedNameNode(node *ast.Node) *ast.Node {
	for ast.IsQualifiedName(node.Parent) {
		node = node.Parent
	}
	return node
}

var extensionsToRemove = []string{ExtensionDts, ExtensionDmts, ExtensionDcts, ExtensionMjs, ExtensionMts, ExtensionCjs, ExtensionCts, ExtensionTs, ExtensionJs, ExtensionTsx, ExtensionJsx, ExtensionJson}

func removeFileExtension(path string) string {
	// Remove any known extension even if it has more than one dot
	for _, ext := range extensionsToRemove {
		if strings.HasSuffix(path, ext) {
			return path[:len(path)-len(ext)]
		}
	}
	// Otherwise just remove single dot extension, if any
	return path[:len(path)-len(filepath.Ext(path))]
}

func tryGetExtensionFromPath(p string) string {
	for _, ext := range extensionsToRemove {
		if tspath.FileExtensionIs(p, ext) {
			return ext
		}
	}
	return ""
}

func removeExtension(path string, extension string) string {
	return path[:len(path)-len(extension)]
}

func fileExtensionIsOneOf(path string, extensions []string) bool {
	for _, ext := range extensions {
		if tspath.FileExtensionIs(path, ext) {
			return true
		}
	}
	return false
}

func tryExtractTSExtension(fileName string) string {
	for _, ext := range supportedTSExtensionsForExtractExtension {
		if tspath.FileExtensionIs(fileName, ext) {
			return ext
		}
	}
	return ""
}

func hasImplementationTSFileExtension(path string) bool {
	return fileExtensionIsOneOf(path, supportedTSImplementationExtensions) && !IsDeclarationFileName(path)
}

func isSideEffectImport(node *ast.Node) bool {
	ancestor := ast.FindAncestor(node, ast.IsImportDeclaration)
	return ancestor != nil && ancestor.AsImportDeclaration().ImportClause == nil
}

func getExternalModuleRequireArgument(node *ast.Node) *ast.Node {
	if isVariableDeclarationInitializedToBareOrAccessedRequire(node) {
		return getLeftmostAccessExpression(node.AsVariableDeclaration().Initializer).AsCallExpression().Arguments.Nodes[0]
	}
	return nil
}

func getExternalModuleImportEqualsDeclarationExpression(node *ast.Node) *ast.Node {
	//Debug.assert(isExternalModuleImportEqualsDeclaration(node))
	return node.AsImportEqualsDeclaration().ModuleReference.AsExternalModuleReference().Expression_
}

func isRightSideOfQualifiedNameOrPropertyAccess(node *ast.Node) bool {
	parent := node.Parent
	switch parent.Kind {
	case ast.KindQualifiedName:
		return parent.AsQualifiedName().Right == node
	case ast.KindPropertyAccessExpression:
		return parent.AsPropertyAccessExpression().Name() == node
	case ast.KindMetaProperty:
		return parent.AsMetaProperty().Name() == node
	}
	return false
}

func getNamespaceDeclarationNode(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindImportDeclaration:
		importClause := node.AsImportDeclaration().ImportClause
		if importClause != nil && ast.IsNamespaceImport(importClause.AsImportClause().NamedBindings) {
			return importClause.AsImportClause().NamedBindings
		}
	case ast.KindImportEqualsDeclaration:
		return node
	case ast.KindExportDeclaration:
		exportClause := node.AsExportDeclaration().ExportClause
		if exportClause != nil && ast.IsNamespaceExport(exportClause) {
			return exportClause
		}
	default:
		panic("Unhandled case in getNamespaceDeclarationNode")
	}
	return nil
}

func isImportCall(node *ast.Node) bool {
	return ast.IsCallExpression(node) && node.AsCallExpression().Expression.Kind == ast.KindImportKeyword
}

func getSourceFileOfModule(module *ast.Symbol) *ast.SourceFile {
	declaration := module.ValueDeclaration
	if declaration == nil {
		declaration = getNonAugmentationDeclaration(module)
	}
	return ast.GetSourceFileOfNode(declaration)
}

func getNonAugmentationDeclaration(symbol *ast.Symbol) *ast.Node {
	return core.Find(symbol.Declarations, func(d *ast.Node) bool {
		return !isExternalModuleAugmentation(d) && !(ast.IsModuleDeclaration(d) && isGlobalScopeAugmentation(d))
	})
}

func isExternalModuleAugmentation(node *ast.Node) bool {
	return isAmbientModule(node) && isModuleAugmentationExternal(node)
}

func isJsonSourceFile(file *ast.SourceFile) bool {
	return file.ScriptKind == core.ScriptKindJSON
}

func isSyntacticDefault(node *ast.Node) bool {
	return (ast.IsExportAssignment(node) && !node.AsExportAssignment().IsExportEquals) ||
		hasSyntacticModifier(node, ast.ModifierFlagsDefault) ||
		ast.IsExportSpecifier(node) ||
		ast.IsNamespaceExport(node)
}

func hasExportAssignmentSymbol(moduleSymbol *ast.Symbol) bool {
	return moduleSymbol.Exports[InternalSymbolNameExportEquals] != nil
}

func isImportOrExportSpecifier(node *ast.Node) bool {
	return ast.IsImportSpecifier(node) || ast.IsExportSpecifier(node)
}

func parsePseudoBigInt(stringValue string) string {
	return stringValue // !!!
}

func isTypeAlias(node *ast.Node) bool {
	return ast.IsTypeAliasDeclaration(node)
}

/**
 * Gets the effective type parameters. If the node was parsed in a
 * JavaScript file, gets the type parameters from the `@template` tag from JSDoc.
 *
 * This does *not* return type parameters from a jsdoc reference to a generic type, eg
 *
 * type Id = <T>(x: T) => T
 * /** @type {Id} /
 * function id(x) { return x }
 */

func getEffectiveTypeParameterDeclarations(node *ast.Node) []*ast.Node {
	return getTypeParameterNodesFromNode(node)
}

func getTypeParameterNodesFromNode(node *ast.Node) []*ast.Node {
	typeParameterList := getTypeParameterListFromNode(node)
	if typeParameterList != nil {
		return typeParameterList.Nodes
	}
	return nil
}

func getTypeParameterListFromNode(node *ast.Node) *ast.NodeList {
	switch node.Kind {
	case ast.KindClassDeclaration:
		return node.AsClassDeclaration().TypeParameters
	case ast.KindClassExpression:
		return node.AsClassExpression().TypeParameters
	case ast.KindInterfaceDeclaration:
		return node.AsInterfaceDeclaration().TypeParameters
	case ast.KindTypeAliasDeclaration:
		return node.AsTypeAliasDeclaration().TypeParameters
	default:
		return node.FunctionLikeData().TypeParameters
	}
}

func getTypeArgumentNodesFromNode(node *ast.Node) []*ast.Node {
	typeArgumentList := getTypeArgumentListFromNode(node)
	if typeArgumentList != nil {
		return typeArgumentList.Nodes
	}
	return nil
}

func getTypeArgumentListFromNode(node *ast.Node) *ast.NodeList {
	switch node.Kind {
	case ast.KindCallExpression:
		return node.AsCallExpression().TypeArguments
	case ast.KindNewExpression:
		return node.AsNewExpression().TypeArguments
	case ast.KindTaggedTemplateExpression:
		return node.AsTaggedTemplateExpression().TypeArguments
	case ast.KindTypeReference:
		return node.AsTypeReference().TypeArguments
	case ast.KindExpressionWithTypeArguments:
		return node.AsExpressionWithTypeArguments().TypeArguments
	case ast.KindImportType:
		return node.AsImportTypeNode().TypeArguments
	case ast.KindTypeQuery:
		return node.AsTypeQueryNode().TypeArguments
	}
	panic("Unhandled case in getTypeArgumentListFromNode")
}

func getInitializerFromNode(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindVariableDeclaration:
		return node.AsVariableDeclaration().Initializer
	case ast.KindParameter:
		return node.AsParameterDeclaration().Initializer
	case ast.KindBindingElement:
		return node.AsBindingElement().Initializer
	case ast.KindPropertyDeclaration:
		return node.AsPropertyDeclaration().Initializer
	case ast.KindPropertyAssignment:
		return node.AsPropertyAssignment().Initializer
	case ast.KindEnumMember:
		return node.AsEnumMember().Initializer
	case ast.KindForStatement:
		return node.AsForStatement().Initializer
	case ast.KindForInStatement, ast.KindForOfStatement:
		return node.AsForInOrOfStatement().Initializer
	case ast.KindJsxAttribute:
		return node.AsJsxAttribute().Initializer
	}
	return nil
}

/**
 * Gets the effective type annotation of a variable, parameter, or property. If the node was
 * parsed in a JavaScript file, gets the type annotation from JSDoc.  Also gets the type of
 * functions only the JSDoc case.
 */
func getEffectiveTypeAnnotationNode(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindVariableDeclaration:
		return node.AsVariableDeclaration().TypeNode
	case ast.KindParameter:
		return node.AsParameterDeclaration().TypeNode
	case ast.KindPropertySignature:
		return node.AsPropertySignatureDeclaration().TypeNode
	case ast.KindPropertyDeclaration:
		return node.AsPropertyDeclaration().TypeNode
	case ast.KindTypePredicate:
		return node.AsTypePredicateNode().TypeNode
	case ast.KindParenthesizedType:
		return node.AsParenthesizedTypeNode().TypeNode
	case ast.KindTypeOperator:
		return node.AsTypeOperatorNode().TypeNode
	case ast.KindMappedType:
		return node.AsMappedTypeNode().TypeNode
	case ast.KindTypeAssertionExpression:
		return node.AsTypeAssertion().TypeNode
	case ast.KindAsExpression:
		return node.AsAsExpression().TypeNode
	default:
		if ast.IsFunctionLike(node) {
			return node.ReturnType()
		}
	}
	return nil
}

func isTypeAny(t *Type) bool {
	return t != nil && t.flags&TypeFlagsAny != 0
}

func isJSDocOptionalParameter(node *ast.ParameterDeclaration) bool {
	return false // !!!
}

func isQuestionToken(node *ast.Node) bool {
	return node != nil && node.Kind == ast.KindQuestionToken
}

func isOptionalDeclaration(declaration *ast.Node) bool {
	switch declaration.Kind {
	case ast.KindParameter:
		return declaration.AsParameterDeclaration().QuestionToken != nil
	case ast.KindPropertyDeclaration:
		return isQuestionToken(declaration.AsPropertyDeclaration().PostfixToken)
	case ast.KindPropertySignature:
		return isQuestionToken(declaration.AsPropertySignatureDeclaration().PostfixToken)
	case ast.KindMethodDeclaration:
		return isQuestionToken(declaration.AsMethodDeclaration().PostfixToken)
	case ast.KindMethodSignature:
		return isQuestionToken(declaration.AsMethodSignatureDeclaration().PostfixToken)
	case ast.KindPropertyAssignment:
		return isQuestionToken(declaration.AsPropertyAssignment().PostfixToken)
	case ast.KindShorthandPropertyAssignment:
		return isQuestionToken(declaration.AsShorthandPropertyAssignment().PostfixToken)
	}
	return false
}

func isEmptyArrayLiteral(expression *ast.Node) bool {
	return expression.Kind == ast.KindArrayLiteralExpression && len(expression.AsArrayLiteralExpression().Elements.Nodes) == 0
}

func declarationBelongsToPrivateAmbientMember(declaration *ast.Node) bool {
	root := getRootDeclaration(declaration)
	memberDeclaration := root
	if root.Kind == ast.KindParameter {
		memberDeclaration = root.Parent
	}
	return isPrivateWithinAmbient(memberDeclaration)
}

func isPrivateWithinAmbient(node *ast.Node) bool {
	return (hasEffectiveModifier(node, ast.ModifierFlagsPrivate) || isPrivateIdentifierClassElementDeclaration(node)) && node.Flags&ast.NodeFlagsAmbient != 0
}

func identifierToKeywordKind(node *ast.Identifier) ast.Kind {
	return textToKeyword[node.Text]
}

func isTypeAssertion(node *ast.Node) bool {
	return ast.IsAssertionExpression(ast.SkipParentheses(node))
}

func createSymbolTable(symbols []*ast.Symbol) ast.SymbolTable {
	if len(symbols) == 0 {
		return nil
	}
	result := make(ast.SymbolTable)
	for _, symbol := range symbols {
		result[symbol.Name] = symbol
	}
	return result
}

func sortSymbols(symbols []*ast.Symbol) {
	slices.SortFunc(symbols, compareSymbols)
}

func compareSymbols(s1, s2 *ast.Symbol) int {
	if s1 == s2 {
		return 0
	}
	if s1.ValueDeclaration != nil && s2.ValueDeclaration != nil {
		if s1.Parent != nil && s2.Parent != nil {
			// Symbols with the same unmerged parent are always in the same file
			if s1.Parent != s2.Parent {
				f1 := ast.GetSourceFileOfNode(s1.ValueDeclaration)
				f2 := ast.GetSourceFileOfNode(s2.ValueDeclaration)
				if f1 != f2 {
					// In different files, first compare base filename
					r := strings.Compare(filepath.Base(f1.Path()), filepath.Base(f2.Path()))
					if r == 0 {
						// Same base filename, compare the full paths (no two files should have the same full path)
						r = strings.Compare(f1.Path(), f2.Path())
					}
					return r
				}
			}
			// In the same file, compare source positions
			return s1.ValueDeclaration.Pos() - s2.ValueDeclaration.Pos()
		}
	}
	// Sort by name
	r := strings.Compare(s1.Name, s2.Name)
	if r == 0 {
		// Same name, sort by symbol id
		r = int(getSymbolId(s1)) - int(getSymbolId(s2))
	}
	return r
}

func getClassLikeDeclarationOfSymbol(symbol *ast.Symbol) *ast.Node {
	return core.Find(symbol.Declarations, ast.IsClassLike)
}

func isThisInTypeQuery(node *ast.Node) bool {
	if !isThisIdentifier(node) {
		return false
	}
	for ast.IsQualifiedName(node.Parent) && node.Parent.AsQualifiedName().Left == node {
		node = node.Parent
	}
	return node.Parent.Kind == ast.KindTypeQuery
}

func isThisIdentifier(node *ast.Node) bool {
	return node != nil && node.Kind == ast.KindIdentifier && identifierIsThisKeyword(node)
}

func identifierIsThisKeyword(id *ast.Node) bool {
	return id.AsIdentifier().Text == "this"
}

func getDeclarationModifierFlagsFromSymbol(s *ast.Symbol) ast.ModifierFlags {
	return getDeclarationModifierFlagsFromSymbolEx(s, false /*isWrite*/)
}

func getDeclarationModifierFlagsFromSymbolEx(s *ast.Symbol, isWrite bool) ast.ModifierFlags {
	if s.ValueDeclaration != nil {
		var declaration *ast.Node
		if isWrite {
			declaration = core.Find(s.Declarations, ast.IsSetAccessorDeclaration)
		}
		if declaration == nil && s.Flags&ast.SymbolFlagsGetAccessor != 0 {
			declaration = core.Find(s.Declarations, ast.IsGetAccessorDeclaration)
		}
		if declaration == nil {
			declaration = s.ValueDeclaration
		}
		flags := getCombinedModifierFlags(declaration)
		if s.Parent != nil && s.Parent.Flags&ast.SymbolFlagsClass != 0 {
			return flags
		}
		return flags & ^ast.ModifierFlagsAccessibilityModifier
	}
	if s.CheckFlags&ast.CheckFlagsSynthetic != 0 {
		var accessModifier ast.ModifierFlags
		switch {
		case s.CheckFlags&ast.CheckFlagsContainsPrivate != 0:
			accessModifier = ast.ModifierFlagsPrivate
		case s.CheckFlags&ast.CheckFlagsContainsPublic != 0:
			accessModifier = ast.ModifierFlagsPublic
		default:
			accessModifier = ast.ModifierFlagsProtected
		}
		var staticModifier ast.ModifierFlags
		if s.CheckFlags&ast.CheckFlagsContainsStatic != 0 {
			staticModifier = ast.ModifierFlagsStatic
		}
		return accessModifier | staticModifier
	}
	if s.Flags&ast.SymbolFlagsPrototype != 0 {
		return ast.ModifierFlagsPublic | ast.ModifierFlagsStatic
	}
	return ast.ModifierFlagsNone
}

func isExponentiationOperator(kind ast.Kind) bool {
	return kind == ast.KindAsteriskAsteriskToken
}

func isMultiplicativeOperator(kind ast.Kind) bool {
	return kind == ast.KindAsteriskToken || kind == ast.KindSlashToken || kind == ast.KindPercentToken
}

func isMultiplicativeOperatorOrHigher(kind ast.Kind) bool {
	return isExponentiationOperator(kind) || isMultiplicativeOperator(kind)
}

func isAdditiveOperator(kind ast.Kind) bool {
	return kind == ast.KindPlusToken || kind == ast.KindMinusToken
}

func isAdditiveOperatorOrHigher(kind ast.Kind) bool {
	return isAdditiveOperator(kind) || isMultiplicativeOperatorOrHigher(kind)
}

func isShiftOperator(kind ast.Kind) bool {
	return kind == ast.KindLessThanLessThanToken || kind == ast.KindGreaterThanGreaterThanToken ||
		kind == ast.KindGreaterThanGreaterThanGreaterThanToken
}

func isShiftOperatorOrHigher(kind ast.Kind) bool {
	return isShiftOperator(kind) || isAdditiveOperatorOrHigher(kind)
}

func isRelationalOperator(kind ast.Kind) bool {
	return kind == ast.KindLessThanToken || kind == ast.KindLessThanEqualsToken || kind == ast.KindGreaterThanToken ||
		kind == ast.KindGreaterThanEqualsToken || kind == ast.KindInstanceOfKeyword || kind == ast.KindInKeyword
}

func isRelationalOperatorOrHigher(kind ast.Kind) bool {
	return isRelationalOperator(kind) || isShiftOperatorOrHigher(kind)
}

func isEqualityOperator(kind ast.Kind) bool {
	return kind == ast.KindEqualsEqualsToken || kind == ast.KindEqualsEqualsEqualsToken ||
		kind == ast.KindExclamationEqualsToken || kind == ast.KindExclamationEqualsEqualsToken
}

func isEqualityOperatorOrHigher(kind ast.Kind) bool {
	return isEqualityOperator(kind) || isRelationalOperatorOrHigher(kind)
}

func isBitwiseOperator(kind ast.Kind) bool {
	return kind == ast.KindAmpersandToken || kind == ast.KindBarToken || kind == ast.KindCaretToken
}

func isBitwiseOperatorOrHigher(kind ast.Kind) bool {
	return isBitwiseOperator(kind) || isEqualityOperatorOrHigher(kind)
}

// NOTE: The version in utilities includes ExclamationToken, which is not a binary operator.
func isLogicalOperator(kind ast.Kind) bool {
	return kind == ast.KindAmpersandAmpersandToken || kind == ast.KindBarBarToken
}

func isLogicalOperatorOrHigher(kind ast.Kind) bool {
	return isLogicalOperator(kind) || isBitwiseOperatorOrHigher(kind)
}

func isAssignmentOperatorOrHigher(kind ast.Kind) bool {
	return kind == ast.KindQuestionQuestionToken || isLogicalOperatorOrHigher(kind) || isAssignmentOperator(kind)
}

func isBinaryOperator(kind ast.Kind) bool {
	return isAssignmentOperatorOrHigher(kind) || kind == ast.KindCommaToken
}

func isObjectLiteralType(t *Type) bool {
	return t.objectFlags&ObjectFlagsObjectLiteral != 0
}

func isDeclarationReadonly(declaration *ast.Node) bool {
	return getCombinedModifierFlags(declaration)&ast.ModifierFlagsReadonly != 0 && !isParameterPropertyDeclaration(declaration, declaration.Parent)
}

func getPostfixTokenFromNode(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindPropertyDeclaration:
		return node.AsPropertyDeclaration().PostfixToken
	case ast.KindPropertySignature:
		return node.AsPropertySignatureDeclaration().PostfixToken
	case ast.KindMethodDeclaration:
		return node.AsMethodDeclaration().PostfixToken
	case ast.KindMethodSignature:
		return node.AsMethodSignatureDeclaration().PostfixToken
	}
	panic("Unhandled case in getPostfixTokenFromNode")
}

func isStatic(node *ast.Node) bool {
	// https://tc39.es/ecma262/#sec-static-semantics-isstatic
	return ast.IsClassElement(node) && hasStaticModifier(node) || ast.IsClassStaticBlockDeclaration(node)
}

func isLogicalExpression(node *ast.Node) bool {
	for {
		if node.Kind == ast.KindParenthesizedExpression {
			node = node.AsParenthesizedExpression().Expression
		} else if node.Kind == ast.KindPrefixUnaryExpression && node.AsPrefixUnaryExpression().Operator == ast.KindExclamationToken {
			node = node.AsPrefixUnaryExpression().Operand
		} else {
			return isLogicalOrCoalescingBinaryExpression(node)
		}
	}
}

type orderedMap[K comparable, V any] struct {
	valuesByKey map[K]V
	values      []V
}

func (m *orderedMap[K, V]) contains(key K) bool {
	_, ok := m.valuesByKey[key]
	return ok
}

func (m *orderedMap[K, V]) add(key K, value V) {
	if m.valuesByKey == nil {
		m.valuesByKey = make(map[K]V)
	}
	m.valuesByKey[key] = value
	m.values = append(m.values, value)
}

func getContainingFunction(node *ast.Node) *ast.Node {
	return ast.FindAncestor(node.Parent, ast.IsFunctionLike)
}

func isTypeReferenceType(node *ast.Node) bool {
	return node.Kind == ast.KindTypeReference || node.Kind == ast.KindExpressionWithTypeArguments
}

func isNodeDescendantOf(node *ast.Node, ancestor *ast.Node) bool {
	for node != nil {
		if node == ancestor {
			return true
		}
		node = node.Parent
	}
	return false
}

func isTypeUsableAsPropertyName(t *Type) bool {
	return t.flags&TypeFlagsStringOrNumberLiteralOrUnique != 0
}

/**
 * Gets the symbolic name for a member from its type.
 */
func getPropertyNameFromType(t *Type) string {
	switch {
	case t.flags&TypeFlagsStringLiteral != 0:
		return t.AsLiteralType().value.(string)
	case t.flags&TypeFlagsNumberLiteral != 0:
		return numberToString(t.AsLiteralType().value.(float64))
	case t.flags&TypeFlagsUniqueESSymbol != 0:
		return t.AsUniqueESSymbolType().name
	}
	panic("Unhandled case in getPropertyNameFromType")
}

func isNumericLiteralName(name string) bool {
	// The intent of numeric names is that
	//     - they are names with text in a numeric form, and that
	//     - setting properties/indexing with them is always equivalent to doing so with the numeric literal 'numLit',
	//         acquired by applying the abstract 'ToNumber' operation on the name's text.
	//
	// The subtlety is in the latter portion, as we cannot reliably say that anything that looks like a numeric literal is a numeric name.
	// In fact, it is the case that the text of the name must be equal to 'ToString(numLit)' for this to hold.
	//
	// Consider the property name '"0xF00D"'. When one indexes with '0xF00D', they are actually indexing with the value of 'ToString(0xF00D)'
	// according to the ECMAScript specification, so it is actually as if the user indexed with the string '"61453"'.
	// Thus, the text of all numeric literals equivalent to '61543' such as '0xF00D', '0xf00D', '0170015', etc. are not valid numeric names
	// because their 'ToString' representation is not equal to their original text.
	// This is motivated by ECMA-262 sections 9.3.1, 9.8.1, 11.1.5, and 11.2.1.
	//
	// Here, we test whether 'ToString(ToNumber(name))' is exactly equal to 'name'.
	// The '+' prefix operator is equivalent here to applying the abstract ToNumber operation.
	// Applying the 'toString()' method on a number gives us the abstract ToString operation on a number.
	//
	// Note that this accepts the values 'Infinity', '-Infinity', and 'NaN', and that this is intentional.
	// This is desired behavior, because when indexing with them as numeric entities, you are indexing
	// with the strings '"Infinity"', '"-Infinity"', and '"NaN"' respectively.
	return numberToString(stringToNumber(name)) == name
}

func getPropertyNameForPropertyNameNode(name *ast.Node) string {
	switch name.Kind {
	case ast.KindIdentifier, ast.KindPrivateIdentifier, ast.KindStringLiteral, ast.KindNoSubstitutionTemplateLiteral,
		ast.KindNumericLiteral, ast.KindBigIntLiteral, ast.KindJsxNamespacedName:
		return name.Text()
	case ast.KindComputedPropertyName:
		nameExpression := name.AsComputedPropertyName().Expression
		if isStringOrNumericLiteralLike(nameExpression) {
			return nameExpression.Text()
		}
		if isSignedNumericLiteral(nameExpression) {
			text := nameExpression.AsPrefixUnaryExpression().Operand.Text()
			if nameExpression.AsPrefixUnaryExpression().Operator == ast.KindMinusToken {
				text = "-" + text
			}
			return text
		}
		return InternalSymbolNameMissing
	}
	panic("Unhandled case in getPropertyNameForPropertyNameNode")
}

func isThisProperty(node *ast.Node) bool {
	return (ast.IsPropertyAccessExpression(node) || ast.IsElementAccessExpression(node)) && node.Expression().Kind == ast.KindThisKeyword
}

func anyToString(v any) string {
	// !!! This function should behave identically to the expression `"" + v` in JS
	switch v := v.(type) {
	case string:
		return v
	case float64:
		return numberToString(v)
	case bool:
		return ifElse(v, "true", "false")
	case PseudoBigInt:
		return "(BigInt)" // !!!
	}
	panic("Unhandled case in anyToString")
}

func numberToString(f float64) string {
	// !!! This function should behave identically to the expression `"" + f` in JS
	return strconv.FormatFloat(f, 'g', -1, 64)
}

func stringToNumber(s string) float64 {
	// !!! This function should behave identically to the expression `+s` in JS
	// This includes parsing binary, octal, and hex numeric strings
	value, err := strconv.ParseFloat(s, 64)
	if err != nil {
		return math.NaN()
	}
	return value
}

func isValidESSymbolDeclaration(node *ast.Node) bool {
	if ast.IsVariableDeclaration(node) {
		return isVarConst(node) && ast.IsIdentifier(node.AsVariableDeclaration().Name()) && isVariableDeclarationInVariableStatement(node)
	}
	if ast.IsPropertyDeclaration(node) {
		return hasEffectiveReadonlyModifier(node) && hasStaticModifier(node)
	}
	return ast.IsPropertySignatureDeclaration(node) && hasEffectiveReadonlyModifier(node)
}

func isVarConst(node *ast.Node) bool {
	return getCombinedNodeFlags(node)&ast.NodeFlagsBlockScoped == ast.NodeFlagsConst
}

func isVariableDeclarationInVariableStatement(node *ast.Node) bool {
	return ast.IsVariableDeclarationList(node.Parent) && ast.IsVariableStatement(node.Parent.Parent)
}

func isKnownSymbol(symbol *ast.Symbol) bool {
	return isLateBoundName(symbol.Name)
}

func isLateBoundName(name string) bool {
	return len(name) >= 2 && name[0] == '\xfe' && name[1] == '@'
}

func getSymbolTable(data *ast.SymbolTable) ast.SymbolTable {
	if *data == nil {
		*data = make(ast.SymbolTable)
	}
	return *data
}

func getMembers(symbol *ast.Symbol) ast.SymbolTable {
	return getSymbolTable(&symbol.Members)
}

func getExports(symbol *ast.Symbol) ast.SymbolTable {
	return getSymbolTable(&symbol.Exports)
}

func getLocals(container *ast.Node) ast.SymbolTable {
	data := container.LocalsContainerData()
	if data.Locals == nil {
		data.Locals = make(ast.SymbolTable)
	}
	return data.Locals
}

func getThisParameter(signature *ast.Node) *ast.Node {
	// callback tags do not currently support this parameters
	if len(signature.Parameters()) != 0 {
		thisParameter := signature.Parameters()[0]
		if parameterIsThisKeyword(thisParameter) {
			return thisParameter
		}
	}
	return nil
}

func parameterIsThisKeyword(parameter *ast.Node) bool {
	return isThisIdentifier(parameter.Name())
}

func getInterfaceBaseTypeNodes(node *ast.Node) []*ast.Node {
	heritageClause := getHeritageClause(node.AsInterfaceDeclaration().HeritageClauses, ast.KindExtendsKeyword)
	if heritageClause != nil {
		return heritageClause.AsHeritageClause().Types.Nodes
	}
	return nil
}

func getHeritageClause(clauses *ast.NodeList, kind ast.Kind) *ast.Node {
	if clauses != nil {
		for _, clause := range clauses.Nodes {
			if clause.AsHeritageClause().Token == kind {
				return clause
			}
		}
	}
	return nil
}

func getClassExtendsHeritageElement(node *ast.Node) *ast.Node {
	heritageClause := getHeritageClause(node.ClassLikeData().HeritageClauses, ast.KindExtendsKeyword)
	if heritageClause != nil && len(heritageClause.AsHeritageClause().Types.Nodes) > 0 {
		return heritageClause.AsHeritageClause().Types.Nodes[0]
	}
	return nil
}

func concatenateDiagnosticMessageChains(headChain *ast.MessageChain, tailChain *ast.MessageChain) {
	lastChain := headChain
	for len(lastChain.MessageChain()) != 0 {
		lastChain = lastChain.MessageChain()[0]
	}
	lastChain.SetMessageChain([]*ast.MessageChain{tailChain})
}

func isObjectOrArrayLiteralType(t *Type) bool {
	return t.objectFlags&(ObjectFlagsObjectLiteral|ObjectFlagsArrayLiteral) != 0
}

func getContainingClassExcludingClassDecorators(node *ast.Node) *ast.ClassLikeDeclaration {
	decorator := ast.FindAncestorOrQuit(node.Parent, func(n *ast.Node) ast.FindAncestorResult {
		if ast.IsClassLike(n) {
			return ast.FindAncestorQuit
		}
		if ast.IsDecorator(n) {
			return ast.FindAncestorTrue
		}
		return ast.FindAncestorFalse
	})
	if decorator != nil && ast.IsClassLike(decorator.Parent) {
		return getContainingClass(decorator.Parent)
	}
	if decorator != nil {
		return getContainingClass(decorator)
	}
	return getContainingClass(node)
}

func isThisTypeParameter(t *Type) bool {
	return t.flags&TypeFlagsTypeParameter != 0 && t.AsTypeParameter().isThisType
}

func isCallLikeExpression(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindJsxOpeningElement, ast.KindJsxSelfClosingElement, ast.KindCallExpression, ast.KindNewExpression,
		ast.KindTaggedTemplateExpression, ast.KindDecorator:
		return true
	}
	return false
}

func isCallOrNewExpression(node *ast.Node) bool {
	return ast.IsCallExpression(node) || ast.IsNewExpression(node)
}

func isClassInstanceProperty(node *ast.Node) bool {
	return node.Parent != nil && ast.IsClassLike(node.Parent) && ast.IsPropertyDeclaration(node) && !hasAccessorModifier(node)
}

func isThisInitializedObjectBindingExpression(node *ast.Node) bool {
	return node != nil && (ast.IsShorthandPropertyAssignment(node) || ast.IsPropertyAssignment(node)) && ast.IsBinaryExpression(node.Parent.Parent) &&
		node.Parent.Parent.AsBinaryExpression().OperatorToken.Kind == ast.KindEqualsToken &&
		node.Parent.Parent.AsBinaryExpression().Right.Kind == ast.KindThisKeyword
}

func isThisInitializedDeclaration(node *ast.Node) bool {
	return node != nil && ast.IsVariableDeclaration(node) && node.AsVariableDeclaration().Initializer != nil && node.AsVariableDeclaration().Initializer.Kind == ast.KindThisKeyword
}

func isWriteOnlyAccess(node *ast.Node) bool {
	return accessKind(node) == AccessKindWrite
}

func isWriteAccess(node *ast.Node) bool {
	return accessKind(node) != AccessKindRead
}

type AccessKind int32

const (
	AccessKindRead      AccessKind = iota // Only reads from a variable
	AccessKindWrite                       // Only writes to a variable without ever reading it. E.g.: `x=1;`.
	AccessKindReadWrite                   // Reads from and writes to a variable. E.g.: `f(x++);`, `x/=1`.
)

func accessKind(node *ast.Node) AccessKind {
	parent := node.Parent
	switch parent.Kind {
	case ast.KindParenthesizedExpression:
		return accessKind(parent)
	case ast.KindPrefixUnaryExpression:
		operator := parent.AsPrefixUnaryExpression().Operator
		if operator == ast.KindPlusPlusToken || operator == ast.KindMinusMinusToken {
			return AccessKindReadWrite
		}
		return AccessKindRead
	case ast.KindPostfixUnaryExpression:
		operator := parent.AsPostfixUnaryExpression().Operator
		if operator == ast.KindPlusPlusToken || operator == ast.KindMinusMinusToken {
			return AccessKindReadWrite
		}
		return AccessKindRead
	case ast.KindBinaryExpression:
		if parent.AsBinaryExpression().Left == node {
			operator := parent.AsBinaryExpression().OperatorToken
			if isAssignmentOperator(operator.Kind) {
				if operator.Kind == ast.KindEqualsToken {
					return AccessKindWrite
				}
				return AccessKindReadWrite
			}
		}
		return AccessKindRead
	case ast.KindPropertyAccessExpression:
		if parent.AsPropertyAccessExpression().Name() != node {
			return AccessKindRead
		}
		return accessKind(parent)
	case ast.KindPropertyAssignment:
		parentAccess := accessKind(parent.Parent)
		// In `({ x: varname }) = { x: 1 }`, the left `x` is a read, the right `x` is a write.
		if node == parent.AsPropertyAssignment().Name() {
			return reverseAccessKind(parentAccess)
		}
		return parentAccess
	case ast.KindShorthandPropertyAssignment:
		// Assume it's the local variable being accessed, since we don't check public properties for --noUnusedLocals.
		if node == parent.AsShorthandPropertyAssignment().ObjectAssignmentInitializer {
			return AccessKindRead
		}
		return accessKind(parent.Parent)
	case ast.KindArrayLiteralExpression:
		return accessKind(parent)
	case ast.KindForInStatement, ast.KindForOfStatement:
		if node == parent.AsForInOrOfStatement().Initializer {
			return AccessKindWrite
		}
		return AccessKindRead
	}
	return AccessKindRead
}

func reverseAccessKind(a AccessKind) AccessKind {
	switch a {
	case AccessKindRead:
		return AccessKindWrite
	case AccessKindWrite:
		return AccessKindRead
	case AccessKindReadWrite:
		return AccessKindReadWrite
	}
	panic("Unhandled case in reverseAccessKind")
}

func isJsxOpeningLikeElement(node *ast.Node) bool {
	return ast.IsJsxOpeningElement(node) || ast.IsJsxSelfClosingElement(node)
}

// Deprecated in favor of `ast.IsObjectLiteralElement`
func isObjectLiteralElementLike(node *ast.Node) bool {
	return ast.IsObjectLiteralElement(node)
}

type EvaluatorResult struct {
	value                 any
	isSyntacticallyString bool
	resolvedOtherFiles    bool
	hasExternalReferences bool
}

func evaluatorResult(value any, isSyntacticallyString bool, resolvedOtherFiles bool, hasExternalReferences bool) EvaluatorResult {
	return EvaluatorResult{value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences}
}

type Evaluator func(expr *ast.Node, location *ast.Node) EvaluatorResult

func createEvaluator(evaluateEntity Evaluator) Evaluator {
	var evaluate Evaluator
	evaluateTemplateExpression := func(expr *ast.Node, location *ast.Node) EvaluatorResult {
		var sb strings.Builder
		sb.WriteString(expr.AsTemplateExpression().Head.Text())
		resolvedOtherFiles := false
		hasExternalReferences := false
		for _, span := range expr.AsTemplateExpression().TemplateSpans.Nodes {
			spanResult := evaluate(span.Expression(), location)
			if spanResult.value == nil {
				return evaluatorResult(nil, true /*isSyntacticallyString*/, false, false)
			}
			sb.WriteString(anyToString(spanResult.value))
			sb.WriteString(span.AsTemplateSpan().Literal.Text())
			resolvedOtherFiles = resolvedOtherFiles || spanResult.resolvedOtherFiles
			hasExternalReferences = hasExternalReferences || spanResult.hasExternalReferences
		}
		return evaluatorResult(sb.String(), true, resolvedOtherFiles, hasExternalReferences)
	}
	evaluate = func(expr *ast.Node, location *ast.Node) EvaluatorResult {
		isSyntacticallyString := false
		resolvedOtherFiles := false
		hasExternalReferences := false
		// It's unclear when/whether we should consider skipping other kinds of outer expressions.
		// Type assertions intentionally break evaluation when evaluating literal types, such as:
		//     type T = `one ${"two" as any} three`; // string
		// But it's less clear whether such an assertion should break enum member evaluation:
		//     enum E {
		//       A = "one" as any
		//     }
		// SatisfiesExpressions and non-null assertions seem to have even less reason to break
		// emitting enum members as literals. However, these expressions also break Babel's
		// evaluation (but not esbuild's), and the isolatedModules errors we give depend on
		// our evaluation results, so we're currently being conservative so as to issue errors
		// on code that might break Babel.
		expr = ast.SkipParentheses(expr)
		switch expr.Kind {
		case ast.KindPrefixUnaryExpression:
			result := evaluate(expr.AsPrefixUnaryExpression().Operand, location)
			resolvedOtherFiles = result.resolvedOtherFiles
			hasExternalReferences = result.hasExternalReferences
			if value, ok := result.value.(float64); ok {
				switch expr.AsPrefixUnaryExpression().Operator {
				case ast.KindPlusToken:
					return evaluatorResult(value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				case ast.KindMinusToken:
					return evaluatorResult(-value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				case ast.KindTildeToken:
					return evaluatorResult(float64(^int32(value)), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				}
			}
		case ast.KindBinaryExpression:
			left := evaluate(expr.AsBinaryExpression().Left, location)
			right := evaluate(expr.AsBinaryExpression().Right, location)
			operator := expr.AsBinaryExpression().OperatorToken.Kind
			isSyntacticallyString = (left.isSyntacticallyString || right.isSyntacticallyString) && expr.AsBinaryExpression().OperatorToken.Kind == ast.KindPlusToken
			resolvedOtherFiles = left.resolvedOtherFiles || right.resolvedOtherFiles
			hasExternalReferences = left.hasExternalReferences || right.hasExternalReferences
			leftNum, leftIsNum := left.value.(float64)
			rightNum, rightIsNum := right.value.(float64)
			if leftIsNum && rightIsNum {
				switch operator {
				case ast.KindBarToken:
					return evaluatorResult(float64(int32(leftNum)|int32(rightNum)), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				case ast.KindAmpersandToken:
					return evaluatorResult(float64(int32(leftNum)&int32(rightNum)), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				case ast.KindGreaterThanGreaterThanToken:
					return evaluatorResult(float64(int32(leftNum)>>int32(rightNum)), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				case ast.KindGreaterThanGreaterThanGreaterThanToken:
					return evaluatorResult(float64(uint32(leftNum)>>uint32(rightNum)), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				case ast.KindLessThanLessThanToken:
					return evaluatorResult(float64(int32(leftNum)<<int32(rightNum)), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				case ast.KindCaretToken:
					return evaluatorResult(float64(int32(leftNum)^int32(rightNum)), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				case ast.KindAsteriskToken:
					return evaluatorResult(leftNum*rightNum, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				case ast.KindSlashToken:
					return evaluatorResult(leftNum/rightNum, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				case ast.KindPlusToken:
					return evaluatorResult(leftNum+rightNum, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				case ast.KindMinusToken:
					return evaluatorResult(leftNum-rightNum, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				case ast.KindPercentToken:
					return evaluatorResult(leftNum-rightNum*math.Floor(leftNum/rightNum), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				case ast.KindAsteriskAsteriskToken:
					return evaluatorResult(math.Pow(leftNum, rightNum), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				}
			}
			leftStr, leftIsStr := left.value.(string)
			rightStr, rightIsStr := right.value.(string)
			if (leftIsStr || leftIsNum) && (rightIsStr || rightIsNum) && operator == ast.KindPlusToken {
				if leftIsNum {
					leftStr = numberToString(leftNum)
				}
				if rightIsNum {
					rightStr = numberToString(rightNum)
				}
				return evaluatorResult(leftStr+rightStr, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
			}
		case ast.KindStringLiteral, ast.KindNoSubstitutionTemplateLiteral:
			return evaluatorResult(expr.Text(), true /*isSyntacticallyString*/, false, false)
		case ast.KindTemplateExpression:
			return evaluateTemplateExpression(expr, location)
		case ast.KindNumericLiteral:
			return evaluatorResult(stringToNumber(expr.Text()), false, false, false)
		case ast.KindIdentifier, ast.KindElementAccessExpression:
			return evaluateEntity(expr, location)
		case ast.KindPropertyAccessExpression:
			if isEntityNameExpression(expr) {
				return evaluateEntity(expr, location)
			}
		}
		return evaluatorResult(nil, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
	}
	return evaluate
}

func isComputedNonLiteralName(name *ast.Node) bool {
	return ast.IsComputedPropertyName(name) && !isStringOrNumericLiteralLike(name.Expression())
}

func isInfinityOrNaNString(name string) bool {
	return name == "Infinity" || name == "-Infinity" || name == "NaN"
}

func (c *Checker) isConstantVariable(symbol *ast.Symbol) bool {
	return symbol.Flags&ast.SymbolFlagsVariable != 0 && (c.getDeclarationNodeFlagsFromSymbol(symbol)&ast.NodeFlagsConstant) != 0
}
