package compiler

import (
	"fmt"
	"maps"
	"math"
	"path/filepath"
	"slices"
	"strconv"
	"strings"
	"sync/atomic"

	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/utils"
)

// TextPos

type TextPos int32

// TextRange

type TextRange struct {
	pos TextPos
	end TextPos
}

func NewTextRange(pos int, end int) TextRange {
	return TextRange{pos: TextPos(pos), end: TextPos(end)}
}

func (t TextRange) Pos() int {
	return int(t.pos)
}

func (t TextRange) End() int {
	return int(t.end)
}

func (t TextRange) Len() int {
	return int(t.end - t.pos)
}

func (t TextRange) ContainsInclusive(pos int) bool {
	return pos >= int(t.pos) && pos <= int(t.end)
}

// Pool allocator

type Pool[T any] struct {
	data []T
}

func (p *Pool[T]) New() *T {
	if len(p.data) == cap(p.data) {
		p.data = make([]T, 0, nextPoolSize(len(p.data)))
	}
	index := len(p.data)
	p.data = p.data[:index+1]
	return &p.data[index]
}

// Links store

type LinkStore[K comparable, V any] struct {
	entries map[K]*V
	pool    Pool[V]
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

func getNodeId(node *Node) NodeId {
	if node.id == 0 {
		node.id = NodeId(nextNodeId.Add(1))
	}
	return node.id
}

func getSymbolId(symbol *Symbol) SymbolId {
	if symbol.id == 0 {
		symbol.id = SymbolId(nextSymbolId.Add(1))
	}
	return symbol.id
}

func getMergeId(symbol *Symbol) MergeId {
	if symbol.mergeId == 0 {
		symbol.mergeId = MergeId(nextMergeId.Add(1))
	}
	return symbol.mergeId
}

// Diagnostic

type Diagnostic struct {
	file               *SourceFile
	loc                TextRange
	code               int32
	category           diagnostics.Category
	message            string
	messageChain       []*MessageChain
	relatedInformation []*Diagnostic
}

func (d *Diagnostic) File() *SourceFile                 { return d.file }
func (d *Diagnostic) Pos() int                          { return d.loc.Pos() }
func (d *Diagnostic) End() int                          { return d.loc.End() }
func (d *Diagnostic) Len() int                          { return d.loc.Len() }
func (d *Diagnostic) Loc() TextRange                    { return d.loc }
func (d *Diagnostic) Code() int32                       { return d.code }
func (d *Diagnostic) Category() diagnostics.Category    { return d.category }
func (d *Diagnostic) Message() string                   { return d.message }
func (d *Diagnostic) MessageChain() []*MessageChain     { return d.messageChain }
func (d *Diagnostic) RelatedInformation() []*Diagnostic { return d.relatedInformation }

func (d *Diagnostic) SetCategory(category diagnostics.Category) { d.category = category }

func NewDiagnostic(file *SourceFile, loc TextRange, message *diagnostics.Message, args ...any) *Diagnostic {
	text := message.Message()
	if len(args) != 0 {
		text = formatStringFromArgs(text, args)
	}
	return &Diagnostic{
		file:     file,
		loc:      loc,
		code:     message.Code(),
		category: message.Category(),
		message:  text,
	}
}

func NewDiagnosticForNode(node *Node, message *diagnostics.Message, args ...any) *Diagnostic {
	var file *SourceFile
	var loc TextRange
	if node != nil {
		file = getSourceFileOfNode(node)
		loc = getErrorRangeForNode(file, node)
	}
	return NewDiagnostic(file, loc, message, args...)
}

func NewDiagnosticFromMessageChain(file *SourceFile, loc TextRange, messageChain *MessageChain) *Diagnostic {
	return &Diagnostic{
		file:         file,
		loc:          loc,
		code:         messageChain.code,
		category:     messageChain.category,
		message:      messageChain.message,
		messageChain: messageChain.messageChain,
	}
}

func NewDiagnosticForNodeFromMessageChain(node *Node, messageChain *MessageChain) *Diagnostic {
	var file *SourceFile
	var loc TextRange
	if node != nil {
		file = getSourceFileOfNode(node)
		loc = getErrorRangeForNode(file, node)
	}
	return NewDiagnosticFromMessageChain(file, loc, messageChain)
}

func (d *Diagnostic) setMessageChain(messageChain []*MessageChain) *Diagnostic {
	d.messageChain = messageChain
	return d
}

func (d *Diagnostic) addMessageChain(messageChain *MessageChain) *Diagnostic {
	if messageChain != nil {
		d.messageChain = append(d.messageChain, messageChain)
	}
	return d
}

func (d *Diagnostic) setRelatedInfo(relatedInformation []*Diagnostic) *Diagnostic {
	d.relatedInformation = relatedInformation
	return d
}

func (d *Diagnostic) addRelatedInfo(relatedInformation *Diagnostic) *Diagnostic {
	if relatedInformation != nil {
		d.relatedInformation = append(d.relatedInformation, relatedInformation)
	}
	return d
}

// MessageChain

type MessageChain struct {
	code         int32
	category     diagnostics.Category
	message      string
	messageChain []*MessageChain
}

func NewMessageChain(message *diagnostics.Message, args ...any) *MessageChain {
	text := message.Message()
	if len(args) != 0 {
		text = formatStringFromArgs(text, args)
	}
	return &MessageChain{
		code:     message.Code(),
		category: message.Category(),
		message:  text,
	}
}

func (m *MessageChain) Code() int32                    { return m.code }
func (m *MessageChain) Category() diagnostics.Category { return m.category }
func (m *MessageChain) Message() string                { return m.message }
func (m *MessageChain) MessageChain() []*MessageChain  { return m.messageChain }

func (m *MessageChain) addMessageChain(messageChain *MessageChain) *MessageChain {
	if messageChain != nil {
		m.messageChain = append(m.messageChain, messageChain)
	}
	return m
}

func chainDiagnosticMessages(details *MessageChain, message *diagnostics.Message, args ...any) *MessageChain {
	return NewMessageChain(message, args...).addMessageChain(details)
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

func getOperatorPrecedence(nodeKind SyntaxKind, operatorKind SyntaxKind, hasArguments bool) OperatorPrecedence {
	switch nodeKind {
	case SyntaxKindCommaListExpression:
		return OperatorPrecedenceComma
	case SyntaxKindSpreadElement:
		return OperatorPrecedenceSpread
	case SyntaxKindYieldExpression:
		return OperatorPrecedenceYield
	case SyntaxKindConditionalExpression:
		return OperatorPrecedenceConditional
	case SyntaxKindBinaryExpression:
		switch operatorKind {
		case SyntaxKindCommaToken:
			return OperatorPrecedenceComma
		case SyntaxKindEqualsToken, SyntaxKindPlusEqualsToken, SyntaxKindMinusEqualsToken, SyntaxKindAsteriskAsteriskEqualsToken,
			SyntaxKindAsteriskEqualsToken, SyntaxKindSlashEqualsToken, SyntaxKindPercentEqualsToken, SyntaxKindLessThanLessThanEqualsToken,
			SyntaxKindGreaterThanGreaterThanEqualsToken, SyntaxKindGreaterThanGreaterThanGreaterThanEqualsToken, SyntaxKindAmpersandEqualsToken,
			SyntaxKindCaretEqualsToken, SyntaxKindBarEqualsToken, SyntaxKindBarBarEqualsToken, SyntaxKindAmpersandAmpersandEqualsToken,
			SyntaxKindQuestionQuestionEqualsToken:
			return OperatorPrecedenceAssignment
		}
		return getBinaryOperatorPrecedence(operatorKind)
	// TODO: Should prefix `++` and `--` be moved to the `Update` precedence?
	case SyntaxKindTypeAssertionExpression, SyntaxKindNonNullExpression, SyntaxKindPrefixUnaryExpression, SyntaxKindTypeOfExpression,
		SyntaxKindVoidExpression, SyntaxKindDeleteExpression, SyntaxKindAwaitExpression:
		return OperatorPrecedenceUnary
	case SyntaxKindPostfixUnaryExpression:
		return OperatorPrecedenceUpdate
	case SyntaxKindCallExpression:
		return OperatorPrecedenceLeftHandSide
	case SyntaxKindNewExpression:
		if hasArguments {
			return OperatorPrecedenceMember
		}
		return OperatorPrecedenceLeftHandSide
	case SyntaxKindTaggedTemplateExpression, SyntaxKindPropertyAccessExpression, SyntaxKindElementAccessExpression, SyntaxKindMetaProperty:
		return OperatorPrecedenceMember
	case SyntaxKindAsExpression, SyntaxKindSatisfiesExpression:
		return OperatorPrecedenceRelational
	case SyntaxKindThisKeyword, SyntaxKindSuperKeyword, SyntaxKindIdentifier, SyntaxKindPrivateIdentifier, SyntaxKindNullKeyword,
		SyntaxKindTrueKeyword, SyntaxKindFalseKeyword, SyntaxKindNumericLiteral, SyntaxKindBigIntLiteral, SyntaxKindStringLiteral,
		SyntaxKindArrayLiteralExpression, SyntaxKindObjectLiteralExpression, SyntaxKindFunctionExpression, SyntaxKindArrowFunction,
		SyntaxKindClassExpression, SyntaxKindRegularExpressionLiteral, SyntaxKindNoSubstitutionTemplateLiteral, SyntaxKindTemplateExpression,
		SyntaxKindParenthesizedExpression, SyntaxKindOmittedExpression, SyntaxKindJsxElement, SyntaxKindJsxSelfClosingElement, SyntaxKindJsxFragment:
		return OperatorPrecedencePrimary
	}
	return OperatorPrecedenceInvalid
}

func getBinaryOperatorPrecedence(kind SyntaxKind) OperatorPrecedence {
	switch kind {
	case SyntaxKindQuestionQuestionToken:
		return OperatorPrecedenceCoalesce
	case SyntaxKindBarBarToken:
		return OperatorPrecedenceLogicalOR
	case SyntaxKindAmpersandAmpersandToken:
		return OperatorPrecedenceLogicalAND
	case SyntaxKindBarToken:
		return OperatorPrecedenceBitwiseOR
	case SyntaxKindCaretToken:
		return OperatorPrecedenceBitwiseXOR
	case SyntaxKindAmpersandToken:
		return OperatorPrecedenceBitwiseAND
	case SyntaxKindEqualsEqualsToken, SyntaxKindExclamationEqualsToken, SyntaxKindEqualsEqualsEqualsToken, SyntaxKindExclamationEqualsEqualsToken:
		return OperatorPrecedenceEquality
	case SyntaxKindLessThanToken, SyntaxKindGreaterThanToken, SyntaxKindLessThanEqualsToken, SyntaxKindGreaterThanEqualsToken,
		SyntaxKindInstanceOfKeyword, SyntaxKindInKeyword, SyntaxKindAsKeyword, SyntaxKindSatisfiesKeyword:
		return OperatorPrecedenceRelational
	case SyntaxKindLessThanLessThanToken, SyntaxKindGreaterThanGreaterThanToken, SyntaxKindGreaterThanGreaterThanGreaterThanToken:
		return OperatorPrecedenceShift
	case SyntaxKindPlusToken, SyntaxKindMinusToken:
		return OperatorPrecedenceAdditive
	case SyntaxKindAsteriskToken, SyntaxKindSlashToken, SyntaxKindPercentToken:
		return OperatorPrecedenceMultiplicative
	case SyntaxKindAsteriskAsteriskToken:
		return OperatorPrecedenceExponentiation
	}
	// -1 is lower than all other precedences.  Returning it will cause binary expression
	// parsing to stop.
	return OperatorPrecedenceInvalid
}

func formatStringFromArgs(text string, args []any) string {
	return utils.MakeRegexp(`{(\d+)}`).ReplaceAllStringFunc(text, func(match string) string {
		index, err := strconv.ParseInt(match[1:len(match)-1], 10, 0)
		if err != nil || int(index) >= len(args) {
			panic("Invalid formatting placeholder")
		}
		return fmt.Sprintf("%v", args[int(index)])
	})
}

func formatMessage(message *diagnostics.Message, args ...any) string {
	text := message.Message()
	if len(args) != 0 {
		text = formatStringFromArgs(text, args)
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

func boolToTristate(b bool) Tristate {
	if b {
		return TSTrue
	}
	return TSFalse
}

func modifierToFlag(token SyntaxKind) ModifierFlags {
	switch token {
	case SyntaxKindStaticKeyword:
		return ModifierFlagsStatic
	case SyntaxKindPublicKeyword:
		return ModifierFlagsPublic
	case SyntaxKindProtectedKeyword:
		return ModifierFlagsProtected
	case SyntaxKindPrivateKeyword:
		return ModifierFlagsPrivate
	case SyntaxKindAbstractKeyword:
		return ModifierFlagsAbstract
	case SyntaxKindAccessorKeyword:
		return ModifierFlagsAccessor
	case SyntaxKindExportKeyword:
		return ModifierFlagsExport
	case SyntaxKindDeclareKeyword:
		return ModifierFlagsAmbient
	case SyntaxKindConstKeyword:
		return ModifierFlagsConst
	case SyntaxKindDefaultKeyword:
		return ModifierFlagsDefault
	case SyntaxKindAsyncKeyword:
		return ModifierFlagsAsync
	case SyntaxKindReadonlyKeyword:
		return ModifierFlagsReadonly
	case SyntaxKindOverrideKeyword:
		return ModifierFlagsOverride
	case SyntaxKindInKeyword:
		return ModifierFlagsIn
	case SyntaxKindOutKeyword:
		return ModifierFlagsOut
	case SyntaxKindImmediateKeyword:
		return ModifierFlagsImmediate
	case SyntaxKindDecorator:
		return ModifierFlagsDecorator
	}
	return ModifierFlagsNone
}

func modifiersToFlags(modifierList *Node) ModifierFlags {
	flags := ModifierFlagsNone
	if modifierList != nil {
		for _, modifier := range modifierList.AsModifierList().modifiers {
			flags |= modifierToFlag(modifier.kind)
		}
	}
	return flags
}

func nodeIsMissing(node *Node) bool {
	return node == nil || node.loc.pos == node.loc.end && node.loc.pos >= 0 && node.kind != SyntaxKindEndOfFile
}

func nodeIsPresent(node *Node) bool {
	return !nodeIsMissing(node)
}

func isLeftHandSideExpression(node *Node) bool {
	return isLeftHandSideExpressionKind(node.kind)
}

func isLeftHandSideExpressionKind(kind SyntaxKind) bool {
	switch kind {
	case SyntaxKindPropertyAccessExpression, SyntaxKindElementAccessExpression, SyntaxKindNewExpression, SyntaxKindCallExpression,
		SyntaxKindJsxElement, SyntaxKindJsxSelfClosingElement, SyntaxKindJsxFragment, SyntaxKindTaggedTemplateExpression, SyntaxKindArrayLiteralExpression,
		SyntaxKindParenthesizedExpression, SyntaxKindObjectLiteralExpression, SyntaxKindClassExpression, SyntaxKindFunctionExpression, SyntaxKindIdentifier,
		SyntaxKindPrivateIdentifier, SyntaxKindRegularExpressionLiteral, SyntaxKindNumericLiteral, SyntaxKindBigIntLiteral, SyntaxKindStringLiteral,
		SyntaxKindNoSubstitutionTemplateLiteral, SyntaxKindTemplateExpression, SyntaxKindFalseKeyword, SyntaxKindNullKeyword, SyntaxKindThisKeyword,
		SyntaxKindTrueKeyword, SyntaxKindSuperKeyword, SyntaxKindNonNullExpression, SyntaxKindExpressionWithTypeArguments, SyntaxKindMetaProperty,
		SyntaxKindImportKeyword, SyntaxKindMissingDeclaration:
		return true
	}
	return false
}

func isUnaryExpression(node *Node) bool {
	return isUnaryExpressionKind(node.kind)
}

func isUnaryExpressionKind(kind SyntaxKind) bool {
	switch kind {
	case SyntaxKindPrefixUnaryExpression, SyntaxKindPostfixUnaryExpression, SyntaxKindDeleteExpression, SyntaxKindTypeOfExpression,
		SyntaxKindVoidExpression, SyntaxKindAwaitExpression, SyntaxKindTypeAssertionExpression:
		return true
	}
	return isLeftHandSideExpressionKind(kind)
}

/**
 * Determines whether a node is an expression based only on its kind.
 */
func isExpression(node *Node) bool {
	return isExpressionKind(node.kind)
}

func isExpressionKind(kind SyntaxKind) bool {
	switch kind {
	case SyntaxKindConditionalExpression, SyntaxKindYieldExpression, SyntaxKindArrowFunction, SyntaxKindBinaryExpression,
		SyntaxKindSpreadElement, SyntaxKindAsExpression, SyntaxKindOmittedExpression, SyntaxKindCommaListExpression,
		SyntaxKindPartiallyEmittedExpression, SyntaxKindSatisfiesExpression:
		return true
	}
	return isUnaryExpressionKind(kind)
}

func isAssignmentOperator(token SyntaxKind) bool {
	return token >= SyntaxKindFirstAssignment && token <= SyntaxKindLastAssignment
}

func isExpressionWithTypeArguments(node *Node) bool {
	return node.kind == SyntaxKindExpressionWithTypeArguments
}

func isNonNullExpression(node *Node) bool {
	return node.kind == SyntaxKindNonNullExpression
}

func isStringLiteralLike(node *Node) bool {
	return node.kind == SyntaxKindStringLiteral || node.kind == SyntaxKindNoSubstitutionTemplateLiteral
}

func isNumericLiteral(node *Node) bool {
	return node.kind == SyntaxKindNumericLiteral
}

func isStringOrNumericLiteralLike(node *Node) bool {
	return isStringLiteralLike(node) || isNumericLiteral(node)
}

func isSignedNumericLiteral(node *Node) bool {
	if node.kind == SyntaxKindPrefixUnaryExpression {
		node := node.AsPrefixUnaryExpression()
		return (node.operator == SyntaxKindPlusToken || node.operator == SyntaxKindMinusToken) && isNumericLiteral(node.operand)
	}
	return false
}

func ifElse[T any](b bool, whenTrue T, whenFalse T) T {
	if b {
		return whenTrue
	}
	return whenFalse
}

func tokenIsIdentifierOrKeyword(token SyntaxKind) bool {
	return token >= SyntaxKindIdentifier
}

func tokenIsIdentifierOrKeywordOrGreaterThan(token SyntaxKind) bool {
	return token == SyntaxKindGreaterThanToken || tokenIsIdentifierOrKeyword(token)
}

func getTextOfNode(node *Node) string {
	return getSourceTextOfNodeFromSourceFile(getSourceFileOfNode(node), node)
}

func getSourceTextOfNodeFromSourceFile(sourceFile *SourceFile, node *Node) string {
	return getTextOfNodeFromSourceText(sourceFile.text, node)
}

func getTextOfNodeFromSourceText(sourceText string, node *Node) string {
	if nodeIsMissing(node) {
		return ""
	}
	text := sourceText[skipTrivia(sourceText, node.Pos()):node.End()]
	// if (isJSDocTypeExpressionOrChild(node)) {
	//     // strip space + asterisk at line start
	//     text = text.split(/\r\n|\n|\r/).map(line => line.replace(/^\s*\*/, "").trimStart()).join("\n");
	// }
	return text
}

func isAssignmentDeclaration(decl *Node) bool {
	return isBinaryExpression(decl) || isAccessExpression(decl) || isIdentifier(decl) || isCallExpression(decl)
}

func isBinaryExpression(node *Node) bool {
	return node.kind == SyntaxKindBinaryExpression
}

func isAccessExpression(node *Node) bool {
	return node.kind == SyntaxKindPropertyAccessExpression || node.kind == SyntaxKindElementAccessExpression
}

func isInJSFile(node *Node) bool {
	return node != nil && node.flags&NodeFlagsJavaScriptFile != 0
}

func isEffectiveModuleDeclaration(node *Node) bool {
	return isModuleDeclaration(node) || isIdentifier(node)
}

func isObjectLiteralOrClassExpressionMethodOrAccessor(node *Node) bool {
	kind := node.kind
	return (kind == SyntaxKindMethodDeclaration || kind == SyntaxKindGetAccessor || kind == SyntaxKindSetAccessor) &&
		(node.parent.kind == SyntaxKindObjectLiteralExpression || node.parent.kind == SyntaxKindClassExpression)
}

func isFunctionLike(node *Node) bool {
	return node != nil && isFunctionLikeKind(node.kind)
}

func isFunctionLikeKind(kind SyntaxKind) bool {
	switch kind {
	case SyntaxKindMethodSignature, SyntaxKindCallSignature, SyntaxKindJSDocSignature, SyntaxKindConstructSignature, SyntaxKindIndexSignature,
		SyntaxKindFunctionType, SyntaxKindJSDocFunctionType, SyntaxKindConstructorType:
		return true
	}
	return isFunctionLikeDeclarationKind(kind)
}

func isFunctionLikeDeclaration(node *Node) bool {
	return node != nil && isFunctionLikeDeclarationKind(node.kind)
}

func isFunctionLikeDeclarationKind(kind SyntaxKind) bool {
	switch kind {
	case SyntaxKindFunctionDeclaration, SyntaxKindMethodDeclaration, SyntaxKindConstructor, SyntaxKindGetAccessor, SyntaxKindSetAccessor,
		SyntaxKindFunctionExpression, SyntaxKindArrowFunction:
		return true
	}
	return false
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

func isOuterExpression(node *Node, kinds OuterExpressionKinds) bool {
	switch node.kind {
	case SyntaxKindParenthesizedExpression:
		return kinds&OEKParentheses != 0 && !(kinds&OEKExcludeJSDocTypeAssertion != 0 && isJSDocTypeAssertion(node))
	case SyntaxKindTypeAssertionExpression, SyntaxKindAsExpression, SyntaxKindSatisfiesExpression:
		return kinds&OEKTypeAssertions != 0
	case SyntaxKindExpressionWithTypeArguments:
		return kinds&OEKExpressionsWithTypeArguments != 0
	case SyntaxKindNonNullExpression:
		return kinds&OEKNonNullAssertions != 0
	}
	return false
}

func skipOuterExpressions(node *Node, kinds OuterExpressionKinds) *Node {
	for isOuterExpression(node, kinds) {
		node = node.Expression()
	}
	return node
}

func skipParentheses(node *Node) *Node {
	return skipOuterExpressions(node, OEKParentheses)
}

func walkUpParenthesizedTypes(node *Node) *Node {
	for node != nil && node.kind == SyntaxKindParenthesizedType {
		node = node.parent
	}
	return node
}

func walkUpParenthesizedExpressions(node *Node) *Node {
	for node != nil && node.kind == SyntaxKindParenthesizedExpression {
		node = node.parent
	}
	return node
}

func isJSDocTypeAssertion(node *Node) bool {
	return false // !!!
}

// Return true if the given identifier is classified as an IdentifierName
func isIdentifierName(node *Node) bool {
	parent := node.parent
	switch parent.kind {
	case SyntaxKindPropertyDeclaration, SyntaxKindPropertySignature, SyntaxKindMethodDeclaration, SyntaxKindMethodSignature, SyntaxKindGetAccessor,
		SyntaxKindSetAccessor, SyntaxKindEnumMember, SyntaxKindPropertyAssignment, SyntaxKindPropertyAccessExpression:
		return parent.Name() == node
	case SyntaxKindQualifiedName:
		return parent.AsQualifiedName().right == node
	case SyntaxKindBindingElement:
		return parent.AsBindingElement().propertyName == node
	case SyntaxKindImportSpecifier:
		return parent.AsImportSpecifier().propertyName == node
	case SyntaxKindExportSpecifier, SyntaxKindJsxAttribute, SyntaxKindJsxSelfClosingElement, SyntaxKindJsxOpeningElement, SyntaxKindJsxClosingElement:
		return true
	}
	return false
}

func getSourceFileOfNode(node *Node) *SourceFile {
	for {
		if node == nil {
			return nil
		}
		if node.kind == SyntaxKindSourceFile {
			return node.data.(*SourceFile)
		}
		node = node.parent
	}
}

/** @internal */
func getErrorRangeForNode(sourceFile *SourceFile, node *Node) TextRange {
	errorNode := node
	switch node.kind {
	case SyntaxKindSourceFile:
		pos := skipTrivia(sourceFile.text, 0)
		if pos == len(sourceFile.text) {
			return NewTextRange(0, 0)
		}
		return getRangeOfTokenAtPosition(sourceFile, pos)
	// This list is a work in progress. Add missing node kinds to improve their error spans
	case SyntaxKindVariableDeclaration, SyntaxKindBindingElement, SyntaxKindClassDeclaration, SyntaxKindClassExpression, SyntaxKindInterfaceDeclaration,
		SyntaxKindModuleDeclaration, SyntaxKindEnumDeclaration, SyntaxKindEnumMember, SyntaxKindFunctionDeclaration, SyntaxKindFunctionExpression,
		SyntaxKindMethodDeclaration, SyntaxKindGetAccessor, SyntaxKindSetAccessor, SyntaxKindTypeAliasDeclaration, SyntaxKindPropertyDeclaration,
		SyntaxKindPropertySignature, SyntaxKindNamespaceImport:
		errorNode = getNameOfDeclaration(node)
	case SyntaxKindArrowFunction:
		return getErrorRangeForArrowFunction(sourceFile, node)
	case SyntaxKindCaseClause:
	case SyntaxKindDefaultClause:
		start := skipTrivia(sourceFile.text, node.Pos())
		end := node.End()
		statements := node.data.(*CaseOrDefaultClause).statements
		if len(statements) != 0 {
			end = statements[0].Pos()
		}
		return NewTextRange(start, end)
	case SyntaxKindReturnStatement, SyntaxKindYieldExpression:
		pos := skipTrivia(sourceFile.text, node.Pos())
		return getRangeOfTokenAtPosition(sourceFile, pos)
	case SyntaxKindSatisfiesExpression:
		pos := skipTrivia(sourceFile.text, node.AsSatisfiesExpression().expression.End())
		return getRangeOfTokenAtPosition(sourceFile, pos)
	case SyntaxKindConstructor:
		scanner := getScannerForSourceFile(sourceFile, node.Pos())
		start := scanner.tokenStart
		for scanner.token != SyntaxKindConstructorKeyword && scanner.token != SyntaxKindStringLiteral && scanner.token != SyntaxKindEndOfFile {
			scanner.Scan()
		}
		return NewTextRange(start, scanner.pos)
		// !!!
		// case SyntaxKindJSDocSatisfiesTag:
		// 	pos := skipTrivia(sourceFile.text, node.tagName.pos)
		// 	return getRangeOfTokenAtPosition(sourceFile, pos)
	}
	if errorNode == nil {
		// If we don't have a better node, then just set the error on the first token of
		// construct.
		return getRangeOfTokenAtPosition(sourceFile, node.Pos())
	}
	pos := errorNode.Pos()
	if !nodeIsMissing(errorNode) {
		pos = skipTrivia(sourceFile.text, pos)
	}
	return NewTextRange(pos, errorNode.End())
}

func getErrorRangeForArrowFunction(sourceFile *SourceFile, node *Node) TextRange {
	pos := skipTrivia(sourceFile.text, node.Pos())
	body := node.AsArrowFunction().body
	if body != nil && body.kind == SyntaxKindBlock {
		startLine, _ := GetLineAndCharacterOfPosition(sourceFile, body.Pos())
		endLine, _ := GetLineAndCharacterOfPosition(sourceFile, body.End())
		if startLine < endLine {
			// The arrow function spans multiple lines,
			// make the error span be the first line, inclusive.
			return NewTextRange(pos, getEndLinePosition(sourceFile, startLine))
		}
	}
	return NewTextRange(pos, node.End())
}

func getContainingClass(node *Node) *Node {
	return findAncestor(node.parent, isClassLike)
}

func findAncestor(node *Node, callback func(*Node) bool) *Node {
	for node != nil {
		result := callback(node)
		if result {
			return node
		}
		node = node.parent
	}
	return nil
}

type FindAncestorResult int32

const (
	FindAncestorFalse FindAncestorResult = iota
	FindAncestorTrue
	FindAncestorQuit
)

func findAncestorOrQuit(node *Node, callback func(*Node) FindAncestorResult) *Node {
	for node != nil {
		switch callback(node) {
		case FindAncestorQuit:
			return nil
		case FindAncestorTrue:
			return node
		}
		node = node.parent
	}
	return nil
}

func isClassLike(node *Node) bool {
	return node != nil && (node.kind == SyntaxKindClassDeclaration || node.kind == SyntaxKindClassExpression)
}

func declarationNameToString(name *Node) string {
	if name == nil || name.Pos() == name.End() {
		return "(Missing)"
	}
	return getTextOfNode(name)
}

func isExternalModule(file *SourceFile) bool {
	return file.externalModuleIndicator != nil
}

func isInTopLevelContext(node *Node) bool {
	// The name of a class or function declaration is a BindingIdentifier in its surrounding scope.
	if isIdentifier(node) {
		parent := node.parent
		if (isClassDeclaration(parent) || isFunctionDeclaration(parent)) && parent.Name() == node {
			node = parent
		}
	}
	container := getThisContainer(node, true /*includeArrowFunctions*/, false /*includeClassComputedPropertyName*/)
	return isSourceFile(container)
}

func getThisContainer(node *Node, includeArrowFunctions bool, includeClassComputedPropertyName bool) *Node {
	for {
		node = node.parent
		if node == nil {
			panic("nil parent in getThisContainer")
		}
		switch node.kind {
		case SyntaxKindComputedPropertyName:
			if includeClassComputedPropertyName && isClassLike(node.parent.parent) {
				return node
			}
			node = node.parent.parent
		case SyntaxKindDecorator:
			if node.parent.kind == SyntaxKindParameter && isClassElement(node.parent.parent) {
				// If the decorator's parent is a Parameter, we resolve the this container from
				// the grandparent class declaration.
				node = node.parent.parent
			} else if isClassElement(node.parent) {
				// If the decorator's parent is a class element, we resolve the 'this' container
				// from the parent class declaration.
				node = node.parent
			}
		case SyntaxKindArrowFunction:
			if includeArrowFunctions {
				return node
			}
		case SyntaxKindFunctionDeclaration, SyntaxKindFunctionExpression, SyntaxKindModuleDeclaration, SyntaxKindClassStaticBlockDeclaration,
			SyntaxKindPropertyDeclaration, SyntaxKindPropertySignature, SyntaxKindMethodDeclaration, SyntaxKindMethodSignature, SyntaxKindConstructor,
			SyntaxKindGetAccessor, SyntaxKindSetAccessor, SyntaxKindCallSignature, SyntaxKindConstructSignature, SyntaxKindIndexSignature,
			SyntaxKindEnumDeclaration, SyntaxKindSourceFile:
			return node
		}
	}
}

func isClassElement(node *Node) bool {
	switch node.kind {
	case SyntaxKindConstructor, SyntaxKindPropertyDeclaration, SyntaxKindMethodDeclaration, SyntaxKindGetAccessor, SyntaxKindSetAccessor,
		SyntaxKindIndexSignature, SyntaxKindClassStaticBlockDeclaration, SyntaxKindSemicolonClassElement:
		return true
	}
	return false
}

func isPartOfTypeQuery(node *Node) bool {
	for node.kind == SyntaxKindQualifiedName || node.kind == SyntaxKindIdentifier {
		node = node.parent
	}
	return node.kind == SyntaxKindTypeQuery
}

func getModifierFlags(node *Node) ModifierFlags {
	modifiers := node.Modifiers()
	if modifiers != nil {
		return modifiers.AsModifierList().modifierFlags
	}
	return ModifierFlagsNone
}

func getNodeFlags(node *Node) NodeFlags {
	return node.flags
}

func hasSyntacticModifier(node *Node, flags ModifierFlags) bool {
	return getModifierFlags(node)&flags != 0
}

func hasAccessorModifier(node *Node) bool {
	return hasSyntacticModifier(node, ModifierFlagsAccessor)
}

func hasStaticModifier(node *Node) bool {
	return hasSyntacticModifier(node, ModifierFlagsStatic)
}

func getEffectiveModifierFlags(node *Node) ModifierFlags {
	return getModifierFlags(node) // !!! Handle JSDoc
}

func hasEffectiveModifier(node *Node, flags ModifierFlags) bool {
	return getEffectiveModifierFlags(node)&flags != 0
}

func hasEffectiveReadonlyModifier(node *Node) bool {
	return hasEffectiveModifier(node, ModifierFlagsReadonly)
}

func getImmediatelyInvokedFunctionExpression(fn *Node) *Node {
	if fn.kind == SyntaxKindFunctionExpression || fn.kind == SyntaxKindArrowFunction {
		prev := fn
		parent := fn.parent
		for parent.kind == SyntaxKindParenthesizedExpression {
			prev = parent
			parent = parent.parent
		}
		if parent.kind == SyntaxKindCallExpression && parent.AsCallExpression().expression == prev {
			return parent
		}
	}
	return nil
}

// Does not handle signed numeric names like `a[+0]` - handling those would require handling prefix unary expressions
// throughout late binding handling as well, which is awkward (but ultimately probably doable if there is demand)
func getElementOrPropertyAccessArgumentExpressionOrName(node *Node) *Node {
	switch node.kind {
	case SyntaxKindPropertyAccessExpression:
		return node.AsPropertyAccessExpression().name
	case SyntaxKindElementAccessExpression:
		arg := skipParentheses(node.AsElementAccessExpression().argumentExpression)
		if isStringOrNumericLiteralLike(arg) {
			return arg
		}
		return node
	}
	panic("Unhandled case in getElementOrPropertyAccessArgumentExpressionOrName")
}

func getQuestionDotToken(node *Node) *Node {
	switch node.kind {
	case SyntaxKindPropertyAccessExpression:
		return node.AsPropertyAccessExpression().questionDotToken
	case SyntaxKindElementAccessExpression:
		return node.AsElementAccessExpression().questionDotToken
	case SyntaxKindCallExpression:
		return node.AsCallExpression().questionDotToken
	}
	panic("Unhandled case in getQuestionDotToken")
}

/**
 * A declaration has a dynamic name if all of the following are true:
 *   1. The declaration has a computed property name.
 *   2. The computed name is *not* expressed as a StringLiteral.
 *   3. The computed name is *not* expressed as a NumericLiteral.
 *   4. The computed name is *not* expressed as a PlusToken or MinusToken
 *      immediately followed by a NumericLiteral.
 */
func hasDynamicName(declaration *Node) bool {
	name := getNameOfDeclaration(declaration)
	return name != nil && isDynamicName(name)
}

func isDynamicName(name *Node) bool {
	var expr *Node
	switch name.kind {
	case SyntaxKindComputedPropertyName:
		expr = name.AsComputedPropertyName().expression
	case SyntaxKindElementAccessExpression:
		expr = skipParentheses(name.AsElementAccessExpression().argumentExpression)
	default:
		return false
	}
	return !isStringOrNumericLiteralLike(expr) && !isSignedNumericLiteral(expr)
}

func getNameOfDeclaration(declaration *Node) *Node {
	if declaration == nil {
		return nil
	}
	nonAssignedName := getNonAssignedNameOfDeclaration(declaration)
	if nonAssignedName != nil {
		return nonAssignedName
	}
	if isFunctionExpression(declaration) || isArrowFunction(declaration) || isClassExpression(declaration) {
		return getAssignedName(declaration)
	}
	return nil
}

func getNonAssignedNameOfDeclaration(declaration *Node) *Node {
	switch declaration.kind {
	case SyntaxKindBinaryExpression:
		if isFunctionPropertyAssignment(declaration) {
			return getElementOrPropertyAccessArgumentExpressionOrName(declaration.AsBinaryExpression().left)
		}
		return nil
	case SyntaxKindExportAssignment:
		expr := declaration.AsExportAssignment().expression
		if isIdentifier(expr) {
			return expr
		}
		return nil
	}
	return declaration.Name()
}

func getAssignedName(node *Node) *Node {
	parent := node.parent
	if parent != nil {
		switch parent.kind {
		case SyntaxKindPropertyAssignment:
			return parent.AsPropertyAssignment().name
		case SyntaxKindBindingElement:
			return parent.AsBindingElement().name
		case SyntaxKindBinaryExpression:
			if node == parent.AsBinaryExpression().right {
				left := parent.AsBinaryExpression().left
				switch left.kind {
				case SyntaxKindIdentifier:
					return left
				case SyntaxKindPropertyAccessExpression:
					return left.AsPropertyAccessExpression().name
				case SyntaxKindElementAccessExpression:
					arg := skipParentheses(left.AsElementAccessExpression().argumentExpression)
					if isStringOrNumericLiteralLike(arg) {
						return arg
					}
				}
			}
		case SyntaxKindVariableDeclaration:
			name := parent.AsVariableDeclaration().name
			if isIdentifier(name) {
				return name
			}
		}
	}
	return nil
}

func isFunctionPropertyAssignment(node *Node) bool {
	if node.kind == SyntaxKindBinaryExpression {
		expr := node.AsBinaryExpression()
		if expr.operatorToken.kind == SyntaxKindEqualsToken {
			switch expr.left.kind {
			case SyntaxKindPropertyAccessExpression:
				// F.id = expr
				return isIdentifier(expr.left.AsPropertyAccessExpression().expression) && isIdentifier(expr.left.AsPropertyAccessExpression().name)
			case SyntaxKindElementAccessExpression:
				// F[xxx] = expr
				return isIdentifier(expr.left.AsElementAccessExpression().expression)
			}
		}
	}
	return false
}

func isAssignmentExpression(node *Node, excludeCompoundAssignment bool) bool {
	if node.kind == SyntaxKindBinaryExpression {
		expr := node.AsBinaryExpression()
		return (expr.operatorToken.kind == SyntaxKindEqualsToken || !excludeCompoundAssignment && isAssignmentOperator(expr.operatorToken.kind)) &&
			isLeftHandSideExpression(expr.left)
	}
	return false
}

func isBlockOrCatchScoped(declaration *Node) bool {
	return getCombinedNodeFlags(declaration)&NodeFlagsBlockScoped != 0 || isCatchClauseVariableDeclarationOrBindingElement(declaration)
}

func isCatchClauseVariableDeclarationOrBindingElement(declaration *Node) bool {
	node := getRootDeclaration(declaration)
	return node.kind == SyntaxKindVariableDeclaration && node.parent.kind == SyntaxKindCatchClause
}

func isAmbientModule(node *Node) bool {
	return isModuleDeclaration(node) && (node.AsModuleDeclaration().name.kind == SyntaxKindStringLiteral || isGlobalScopeAugmentation(node))
}

func isGlobalScopeAugmentation(node *Node) bool {
	return node.flags&NodeFlagsGlobalAugmentation != 0
}

func isPropertyNameLiteral(node *Node) bool {
	switch node.kind {
	case SyntaxKindIdentifier, SyntaxKindStringLiteral, SyntaxKindNoSubstitutionTemplateLiteral, SyntaxKindNumericLiteral:
		return true
	}
	return false
}

func isMemberName(node *Node) bool {
	return node.kind == SyntaxKindIdentifier || node.kind == SyntaxKindPrivateIdentifier
}

func setParent(child *Node, parent *Node) {
	if child != nil {
		child.parent = parent
	}
}

func setParentInChildren(node *Node) {
	node.ForEachChild(func(child *Node) bool {
		child.parent = node
		setParentInChildren(child)
		return false
	})
}

func getCombinedFlags[T ~uint32](node *Node, getFlags func(*Node) T) T {
	node = getRootDeclaration(node)
	flags := getFlags(node)
	if node.kind == SyntaxKindVariableDeclaration {
		node = node.parent
	}
	if node != nil && node.kind == SyntaxKindVariableDeclarationList {
		flags |= getFlags(node)
		node = node.parent
	}
	if node != nil && node.kind == SyntaxKindVariableStatement {
		flags |= getFlags(node)
	}
	return flags
}

func getCombinedModifierFlags(node *Node) ModifierFlags {
	return getCombinedFlags(node, getModifierFlags)
}

func getCombinedNodeFlags(node *Node) NodeFlags {
	return getCombinedFlags(node, getNodeFlags)
}

func isBindingPattern(node *Node) bool {
	return node != nil && (node.kind == SyntaxKindArrayBindingPattern || node.kind == SyntaxKindObjectBindingPattern)
}

func isParameterPropertyDeclaration(node *Node, parent *Node) bool {
	return isParameter(node) && hasSyntacticModifier(node, ModifierFlagsParameterPropertyModifier) && parent.kind == SyntaxKindConstructor
}

/**
 * Like {@link isVariableDeclarationInitializedToRequire} but allows things like `require("...").foo.bar` or `require("...")["baz"]`.
 */
func isVariableDeclarationInitializedToBareOrAccessedRequire(node *Node) bool {
	return isVariableDeclarationInitializedWithRequireHelper(node, true /*allowAccessedRequire*/)
}

func isVariableDeclarationInitializedWithRequireHelper(node *Node, allowAccessedRequire bool) bool {
	if node.kind == SyntaxKindVariableDeclaration && node.AsVariableDeclaration().initializer != nil {
		initializer := node.AsVariableDeclaration().initializer
		if allowAccessedRequire {
			initializer = getLeftmostAccessExpression(initializer)
		}
		return isRequireCall(initializer, true /*requireStringLiteralLikeArgument*/)
	}
	return false
}

func getLeftmostAccessExpression(expr *Node) *Node {
	for isAccessExpression(expr) {
		expr = expr.Expression()
	}
	return expr
}

func isRequireCall(node *Node, requireStringLiteralLikeArgument bool) bool {
	if isCallExpression(node) {
		callExpression := node.AsCallExpression()
		if len(callExpression.arguments) == 1 {
			if isIdentifier(callExpression.expression) && callExpression.expression.AsIdentifier().text == "require" {
				return !requireStringLiteralLikeArgument || isStringLiteralLike(callExpression.arguments[0])
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
func isPartOfParameterDeclaration(node *Node) bool {
	return getRootDeclaration(node).kind == SyntaxKindParameter
}

func getRootDeclaration(node *Node) *Node {
	for node.kind == SyntaxKindBindingElement {
		node = node.parent.parent
	}
	return node
}

func isExternalOrCommonJsModule(file *SourceFile) bool {
	return file.externalModuleIndicator != nil
}

func isAutoAccessorPropertyDeclaration(node *Node) bool {
	return isPropertyDeclaration(node) && hasAccessorModifier(node)
}

func isAsyncFunction(node *Node) bool {
	switch node.kind {
	case SyntaxKindFunctionDeclaration, SyntaxKindFunctionExpression, SyntaxKindArrowFunction, SyntaxKindMethodDeclaration:
		data := node.BodyData()
		return data.body != nil && data.asteriskToken == nil && hasSyntacticModifier(node, ModifierFlagsAsync)
	}
	return false
}

func isObjectLiteralMethod(node *Node) bool {
	return node != nil && node.kind == SyntaxKindMethodDeclaration && node.parent.kind == SyntaxKindObjectLiteralExpression
}

func symbolName(symbol *Symbol) string {
	if symbol.valueDeclaration != nil && isPrivateIdentifierClassElementDeclaration(symbol.valueDeclaration) {
		return symbol.valueDeclaration.Name().AsPrivateIdentifier().text
	}
	return symbol.name
}

func isStaticPrivateIdentifierProperty(s *Symbol) bool {
	return s.valueDeclaration != nil && isPrivateIdentifierClassElementDeclaration(s.valueDeclaration) && isStatic(s.valueDeclaration)
}

func isPrivateIdentifierClassElementDeclaration(node *Node) bool {
	return (isPropertyDeclaration(node) || isMethodOrAccessor(node)) && isPrivateIdentifier(node.Name())
}

func isMethodOrAccessor(node *Node) bool {
	switch node.kind {
	case SyntaxKindMethodDeclaration, SyntaxKindGetAccessor, SyntaxKindSetAccessor:
		return true
	}
	return false
}

func isFunctionLikeOrClassStaticBlockDeclaration(node *Node) bool {
	return node != nil && (isFunctionLikeKind(node.kind) || isClassStaticBlockDeclaration(node))
}

func isModuleAugmentationExternal(node *Node) bool {
	// external module augmentation is a ambient module declaration that is either:
	// - defined in the top level scope and source file is an external module
	// - defined inside ambient module declaration located in the top level scope and source file not an external module
	switch node.parent.kind {
	case SyntaxKindSourceFile:
		return isExternalModule(node.parent.AsSourceFile())
	case SyntaxKindModuleBlock:
		grandParent := node.parent.parent
		return isAmbientModule(grandParent) && isSourceFile(grandParent.parent) && !isExternalModule(grandParent.parent.AsSourceFile())
	}
	return false
}

type Pattern struct {
	text      string
	starIndex int // -1 for exact match
}

func isValidPattern(pattern Pattern) bool {
	return pattern.starIndex == -1 || pattern.starIndex < len(pattern.text)
}

func tryParsePattern(pattern string) Pattern {
	starIndex := strings.Index(pattern, "*")
	if starIndex == -1 || !strings.Contains(pattern[starIndex+1:], "*") {
		return Pattern{text: pattern, starIndex: starIndex}
	}
	return Pattern{}
}

func positionIsSynthesized(pos int) bool {
	return pos < 0
}
func isDeclarationStatementKind(kind SyntaxKind) bool {
	switch kind {
	case SyntaxKindFunctionDeclaration, SyntaxKindMissingDeclaration, SyntaxKindClassDeclaration, SyntaxKindInterfaceDeclaration,
		SyntaxKindTypeAliasDeclaration, SyntaxKindEnumDeclaration, SyntaxKindModuleDeclaration, SyntaxKindImportDeclaration,
		SyntaxKindImportEqualsDeclaration, SyntaxKindExportDeclaration, SyntaxKindExportAssignment, SyntaxKindNamespaceExportDeclaration:
		return true
	}
	return false
}

func isDeclarationStatement(node *Node) bool {
	return isDeclarationStatementKind(node.kind)
}

func isStatementKindButNotDeclarationKind(kind SyntaxKind) bool {
	switch kind {
	case SyntaxKindBreakStatement, SyntaxKindContinueStatement, SyntaxKindDebuggerStatement, SyntaxKindDoStatement, SyntaxKindExpressionStatement,
		SyntaxKindEmptyStatement, SyntaxKindForInStatement, SyntaxKindForOfStatement, SyntaxKindForStatement, SyntaxKindIfStatement,
		SyntaxKindLabeledStatement, SyntaxKindReturnStatement, SyntaxKindSwitchStatement, SyntaxKindThrowStatement, SyntaxKindTryStatement,
		SyntaxKindVariableStatement, SyntaxKindWhileStatement, SyntaxKindWithStatement, SyntaxKindNotEmittedStatement:
		return true
	}
	return false
}

func isStatementButNotDeclaration(node *Node) bool {
	return isStatementKindButNotDeclarationKind(node.kind)
}

func isStatement(node *Node) bool {
	kind := node.kind
	return isStatementKindButNotDeclarationKind(kind) || isDeclarationStatementKind(kind) || isBlockStatement(node)
}

func isBlockStatement(node *Node) bool {
	if node.kind != SyntaxKindBlock {
		return false
	}
	if node.parent != nil && (node.parent.kind == SyntaxKindTryStatement || node.parent.kind == SyntaxKindCatchClause) {
		return false
	}
	return !isFunctionBlock(node)
}

func isFunctionBlock(node *Node) bool {
	return node != nil && node.kind == SyntaxKindBlock && isFunctionLike(node.parent)
}

func shouldPreserveConstEnums(options *CompilerOptions) bool {
	return options.PreserveConstEnums == TSTrue || options.IsolatedModules == TSTrue
}

func exportAssignmentIsAlias(node *Node) bool {
	return isAliasableExpression(getExportAssignmentExpression(node))
}

func getExportAssignmentExpression(node *Node) *Node {
	switch node.kind {
	case SyntaxKindExportAssignment:
		return node.AsExportAssignment().expression
	case SyntaxKindBinaryExpression:
		return node.AsBinaryExpression().right
	}
	panic("Unhandled case in getExportAssignmentExpression")
}

func isAliasableExpression(e *Node) bool {
	return isEntityNameExpression(e) || isClassExpression(e)
}

func isEmptyObjectLiteral(expression *Node) bool {
	return expression.kind == SyntaxKindObjectLiteralExpression && len(expression.AsObjectLiteralExpression().properties) == 0
}

func isFunctionSymbol(symbol *Symbol) bool {
	d := symbol.valueDeclaration
	return d != nil && (isFunctionDeclaration(d) || isVariableDeclaration(d) && isFunctionLike(d.AsVariableDeclaration().initializer))
}

func isLogicalOrCoalescingAssignmentOperator(token SyntaxKind) bool {
	return token == SyntaxKindBarBarEqualsToken || token == SyntaxKindAmpersandAmpersandEqualsToken || token == SyntaxKindQuestionQuestionEqualsToken
}

func isLogicalOrCoalescingAssignmentExpression(expr *Node) bool {
	return isBinaryExpression(expr) && isLogicalOrCoalescingAssignmentOperator(expr.AsBinaryExpression().operatorToken.kind)
}

func isLogicalOrCoalescingBinaryOperator(token SyntaxKind) bool {
	return isBinaryLogicalOperator(token) || token == SyntaxKindQuestionQuestionToken
}

func isLogicalOrCoalescingBinaryExpression(expr *Node) bool {
	return isBinaryExpression(expr) && isLogicalOrCoalescingBinaryOperator(expr.AsBinaryExpression().operatorToken.kind)
}

func isBinaryLogicalOperator(token SyntaxKind) bool {
	return token == SyntaxKindBarBarToken || token == SyntaxKindAmpersandAmpersandToken
}

/**
 * Determines whether a node is the outermost `OptionalChain` in an ECMAScript `OptionalExpression`:
 *
 * 1. For `a?.b.c`, the outermost chain is `a?.b.c` (`c` is the end of the chain starting at `a?.`)
 * 2. For `a?.b!`, the outermost chain is `a?.b` (`b` is the end of the chain starting at `a?.`)
 * 3. For `(a?.b.c).d`, the outermost chain is `a?.b.c` (`c` is the end of the chain starting at `a?.` since parens end the chain)
 * 4. For `a?.b.c?.d`, both `a?.b.c` and `a?.b.c?.d` are outermost (`c` is the end of the chain starting at `a?.`, and `d` is
 *   the end of the chain starting at `c?.`)
 * 5. For `a?.(b?.c).d`, both `b?.c` and `a?.(b?.c)d` are outermost (`c` is the end of the chain starting at `b`, and `d` is
 *   the end of the chain starting at `a?.`)
 */
func isOutermostOptionalChain(node *Node) bool {
	parent := node.parent
	return !isOptionalChain(parent) || // cases 1, 2, and 3
		isOptionalChainRoot(parent) || // case 4
		node != parent.Expression() // case 5
}

func isNullishCoalesce(node *Node) bool {
	return node.kind == SyntaxKindBinaryExpression && node.AsBinaryExpression().operatorToken.kind == SyntaxKindQuestionQuestionToken
}

func isDottedName(node *Node) bool {
	switch node.kind {
	case SyntaxKindIdentifier, SyntaxKindThisKeyword, SyntaxKindSuperKeyword, SyntaxKindMetaProperty:
		return true
	case SyntaxKindPropertyAccessExpression, SyntaxKindParenthesizedExpression:
		return isDottedName(node.Expression())
	}
	return false
}

func unusedLabelIsError(options *CompilerOptions) bool {
	return options.AllowUnusedLabels == TSFalse
}

func unreachableCodeIsError(options *CompilerOptions) bool {
	return options.AllowUnreachableCode == TSFalse
}

func isDestructuringAssignment(node *Node) bool {
	if isAssignmentExpression(node, true /*excludeCompoundAssignment*/) {
		kind := node.AsBinaryExpression().left.kind
		return kind == SyntaxKindObjectLiteralExpression || kind == SyntaxKindArrayLiteralExpression
	}
	return false
}

func isTopLevelLogicalExpression(node *Node) bool {
	for isParenthesizedExpression(node.parent) || isPrefixUnaryExpression(node.parent) && node.parent.AsPrefixUnaryExpression().operator == SyntaxKindExclamationToken {
		node = node.parent
	}
	return !isStatementCondition(node) && !isLogicalExpression(node.parent) && !(isOptionalChain(node.parent) && node.parent.Expression() == node)
}

func isStatementCondition(node *Node) bool {
	switch node.parent.kind {
	case SyntaxKindIfStatement:
		return node.parent.AsIfStatement().expression == node
	case SyntaxKindWhileStatement:
		return node.parent.AsWhileStatement().expression == node
	case SyntaxKindDoStatement:
		return node.parent.AsDoStatement().expression == node
	case SyntaxKindForStatement:
		return node.parent.AsForStatement().condition == node
	case SyntaxKindConditionalExpression:
		return node.parent.AsConditionalExpression().condition == node
	}
	return false
}

type AssignmentKind int32

const (
	AssignmentKindNone AssignmentKind = iota
	AssignmentKindDefinite
	AssignmentKindCompound
)

type AssignmentTarget = Node // BinaryExpression | PrefixUnaryExpression | PostfixUnaryExpression | ForInOrOfStatement

func getAssignmentTargetKind(node *Node) AssignmentKind {
	target := getAssignmentTarget(node)
	if target == nil {
		return AssignmentKindNone
	}
	switch target.kind {
	case SyntaxKindBinaryExpression:
		binaryOperator := target.AsBinaryExpression().operatorToken.kind
		if binaryOperator == SyntaxKindEqualsToken || isLogicalOrCoalescingAssignmentOperator(binaryOperator) {
			return AssignmentKindDefinite
		}
		return AssignmentKindCompound
	case SyntaxKindPrefixUnaryExpression, SyntaxKindPostfixUnaryExpression:
		return AssignmentKindCompound
	case SyntaxKindForInStatement, SyntaxKindForOfStatement:
		return AssignmentKindDefinite
	}
	panic("Unhandled case in getAssignmentTargetKind")
}

// A node is an assignment target if it is on the left hand side of an '=' token, if it is parented by a property
// assignment in an object literal that is an assignment target, or if it is parented by an array literal that is
// an assignment target. Examples include 'a = xxx', '{ p: a } = xxx', '[{ a }] = xxx'.
// (Note that `p` is not a target in the above examples, only `a`.)
func isAssignmentTarget(node *Node) bool {
	return getAssignmentTarget(node) != nil
}

// Returns the BinaryExpression, PrefixUnaryExpression, PostfixUnaryExpression, or ForInOrOfStatement that references
// the given node as an assignment target
func getAssignmentTarget(node *Node) *Node {
	for {
		parent := node.parent
		switch parent.kind {
		case SyntaxKindBinaryExpression:
			if isAssignmentOperator(parent.AsBinaryExpression().operatorToken.kind) && parent.AsBinaryExpression().left == node {
				return parent
			}
			return nil
		case SyntaxKindPrefixUnaryExpression:
			if parent.AsPrefixUnaryExpression().operator == SyntaxKindPlusPlusToken || parent.AsPrefixUnaryExpression().operator == SyntaxKindMinusMinusToken {
				return parent
			}
			return nil
		case SyntaxKindPostfixUnaryExpression:
			if parent.AsPostfixUnaryExpression().operator == SyntaxKindPlusPlusToken || parent.AsPostfixUnaryExpression().operator == SyntaxKindMinusMinusToken {
				return parent
			}
			return nil
		case SyntaxKindForInStatement, SyntaxKindForOfStatement:
			if parent.AsForInOrOfStatement().initializer == node {
				return parent
			}
			return nil
		case SyntaxKindParenthesizedExpression, SyntaxKindArrayLiteralExpression, SyntaxKindSpreadElement, SyntaxKindNonNullExpression:
			node = parent
		case SyntaxKindSpreadAssignment:
			node = parent.parent
		case SyntaxKindShorthandPropertyAssignment:
			if parent.AsShorthandPropertyAssignment().name != node {
				return nil
			}
			node = parent.parent
		case SyntaxKindPropertyAssignment:
			if parent.AsPropertyAssignment().name == node {
				return nil
			}
			node = parent.parent
		default:
			return nil
		}
	}
}

func isDeleteTarget(node *Node) bool {
	if !isAccessExpression(node) {
		return false
	}
	node = walkUpParenthesizedExpressions(node.parent)
	return node != nil && node.kind == SyntaxKindDeleteExpression
}

func isInCompoundLikeAssignment(node *Node) bool {
	target := getAssignmentTarget(node)
	return target != nil && isAssignmentExpression(target /*excludeCompoundAssignment*/, true) && isCompoundLikeAssignment(target)
}

func isCompoundLikeAssignment(assignment *Node) bool {
	right := skipParentheses(assignment.AsBinaryExpression().right)
	return right.kind == SyntaxKindBinaryExpression && isShiftOperatorOrHigher(right.AsBinaryExpression().operatorToken.kind)
}

func isPushOrUnshiftIdentifier(node *Node) bool {
	text := node.AsIdentifier().text
	return text == "push" || text == "unshift"
}

func isBooleanLiteral(node *Node) bool {
	return node.kind == SyntaxKindTrueKeyword || node.kind == SyntaxKindFalseKeyword
}

func isOptionalChain(node *Node) bool {
	kind := node.kind
	return node.flags&NodeFlagsOptionalChain != 0 && (kind == SyntaxKindPropertyAccessExpression ||
		kind == SyntaxKindElementAccessExpression || kind == SyntaxKindCallExpression || kind == SyntaxKindNonNullExpression)
}

func isOptionalChainRoot(node *Node) bool {
	return isOptionalChain(node) && !isNonNullExpression(node) && getQuestionDotToken(node) != nil
}

/**
 * Determines whether a node is the expression preceding an optional chain (i.e. `a` in `a?.b`).
 */
func isExpressionOfOptionalChainRoot(node *Node) bool {
	return isOptionalChainRoot(node.parent) && node.parent.Expression() == node
}

func isEntityNameExpression(node *Node) bool {
	return node.kind == SyntaxKindIdentifier || isPropertyAccessEntityNameExpression(node)
}

func isPropertyAccessEntityNameExpression(node *Node) bool {
	if node.kind == SyntaxKindPropertyAccessExpression {
		expr := node.AsPropertyAccessExpression()
		return expr.name.kind == SyntaxKindIdentifier && isEntityNameExpression(expr.expression)
	}
	return false
}

func isPrologueDirective(node *Node) bool {
	return node.kind == SyntaxKindExpressionStatement && node.AsExpressionStatement().expression.kind == SyntaxKindStringLiteral
}

func nextPoolSize(size int) int {
	switch {
	case size < 16:
		return 16
	case size < 256:
		return size * 2
	}
	return size
}

func getStatementsOfBlock(block *Node) []*Statement {
	switch block.kind {
	case SyntaxKindBlock:
		return block.AsBlock().statements
	case SyntaxKindModuleBlock:
		return block.AsModuleBlock().statements
	case SyntaxKindSourceFile:
		return block.AsSourceFile().statements
	}
	panic("Unhandled case in getStatementsOfBlock")
}

func nodeHasName(statement *Node, id *Node) bool {
	name := statement.Name()
	if name != nil {
		return isIdentifier(name) && name.AsIdentifier().text == id.AsIdentifier().text
	}
	if isVariableStatement(statement) {
		declarations := statement.AsVariableStatement().declarationList.AsVariableDeclarationList().declarations
		return utils.Some(declarations, func(d *Node) bool { return nodeHasName(d, id) })
	}
	return false
}

func isImportMeta(node *Node) bool {
	if node.kind == SyntaxKindMetaProperty {
		return node.AsMetaProperty().keywordToken == SyntaxKindImportKeyword && node.AsMetaProperty().name.AsIdentifier().text == "meta"
	}
	return false
}

func lastElement[T any](slice []T) T {
	if len(slice) != 0 {
		return slice[len(slice)-1]
	}
	return *new(T)
}

func ensureScriptKind(fileName string, scriptKind ScriptKind) ScriptKind {
	// Using scriptKind as a condition handles both:
	// - 'scriptKind' is unspecified and thus it is `undefined`
	// - 'scriptKind' is set and it is `Unknown` (0)
	// If the 'scriptKind' is 'undefined' or 'Unknown' then we attempt
	// to get the ScriptKind from the file name. If it cannot be resolved
	// from the file name then the default 'TS' script kind is returned.
	if scriptKind == ScriptKindUnknown {
		scriptKind = getScriptKindFromFileName(fileName)
	}
	if scriptKind == ScriptKindUnknown {
		scriptKind = ScriptKindTS
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

func getScriptKindFromFileName(fileName string) ScriptKind {
	dotPos := strings.LastIndex(fileName, ".")
	if dotPos >= 0 {
		switch strings.ToLower(fileName[dotPos:]) {
		case ExtensionJs, ExtensionCjs, ExtensionMjs:
			return ScriptKindJS
		case ExtensionJsx:
			return ScriptKindJSX
		case ExtensionTs, ExtensionCts, ExtensionMts:
			return ScriptKindTS
		case ExtensionTsx:
			return ScriptKindTSX
		case ExtensionJson:
			return ScriptKindJSON
		}
	}
	return ScriptKindUnknown
}

func getLanguageVariant(scriptKind ScriptKind) LanguageVariant {
	switch scriptKind {
	case ScriptKindTSX, ScriptKindJSX, ScriptKindJS, ScriptKindJSON:
		// .tsx and .jsx files are treated as jsx language variant.
		return LanguageVariantJSX
	}
	return LanguageVariantStandard
}

func getEmitScriptTarget(options *CompilerOptions) ScriptTarget {
	if options.Target != ScriptTargetNone {
		return options.Target
	}
	return ScriptTargetES5
}

func getEmitModuleKind(options *CompilerOptions) ModuleKind {
	if options.ModuleKind != ModuleKindNone {
		return options.ModuleKind
	}
	if options.Target >= ScriptTargetES2015 {
		return ModuleKindES2015
	}
	return ModuleKindCommonJS
}

func getEmitModuleResolutionKind(options *CompilerOptions) ModuleResolutionKind {
	if options.ModuleResolution != ModuleResolutionKindUnknown {
		return options.ModuleResolution
	}
	switch getEmitModuleKind(options) {
	case ModuleKindCommonJS:
		return ModuleResolutionKindBundler
	case ModuleKindNode16:
		return ModuleResolutionKindNode16
	case ModuleKindNodeNext:
		return ModuleResolutionKindNodeNext
	case ModuleKindPreserve:
		return ModuleResolutionKindBundler
	default:
		panic("Unhandled case in getEmitModuleResolutionKind")
	}
}

func getESModuleInterop(options *CompilerOptions) bool {
	if options.ESModuleInterop != TSUnknown {
		return options.ESModuleInterop == TSTrue
	}
	switch getEmitModuleKind(options) {
	case ModuleKindNode16:
	case ModuleKindNodeNext:
	case ModuleKindPreserve:
		return true
	}
	return false

}
func getAllowSyntheticDefaultImports(options *CompilerOptions) bool {
	if options.AllowSyntheticDefaultImports != TSUnknown {
		return options.AllowSyntheticDefaultImports == TSTrue
	}
	return getESModuleInterop(options) ||
		getEmitModuleKind(options) == ModuleKindSystem ||
		getEmitModuleResolutionKind(options) == ModuleResolutionKindBundler
}

type DiagnosticsCollection struct {
	fileDiagnostics    map[string][]*Diagnostic
	nonFileDiagnostics []*Diagnostic
}

func (c *DiagnosticsCollection) add(diagnostic *Diagnostic) {
	if diagnostic.file != nil {
		fileName := diagnostic.file.fileName
		if c.fileDiagnostics == nil {
			c.fileDiagnostics = make(map[string][]*Diagnostic)
		}
		c.fileDiagnostics[fileName] = utils.InsertSorted(c.fileDiagnostics[fileName], diagnostic, compareDiagnostics)
	} else {
		c.nonFileDiagnostics = utils.InsertSorted(c.nonFileDiagnostics, diagnostic, compareDiagnostics)
	}
}

func (c *DiagnosticsCollection) lookup(diagnostic *Diagnostic) *Diagnostic {
	var diagnostics []*Diagnostic
	if diagnostic.file != nil {
		diagnostics = c.fileDiagnostics[diagnostic.file.fileName]
	} else {
		diagnostics = c.nonFileDiagnostics
	}
	if i, ok := slices.BinarySearchFunc(diagnostics, diagnostic, compareDiagnostics); ok {
		return diagnostics[i]
	}
	return nil
}

func (c *DiagnosticsCollection) GetGlobalDiagnostics() []*Diagnostic {
	return c.nonFileDiagnostics
}

func (c *DiagnosticsCollection) GetDiagnosticsForFile(fileName string) []*Diagnostic {
	return c.fileDiagnostics[fileName]
}

func (c *DiagnosticsCollection) GetDiagnostics() []*Diagnostic {
	fileNames := slices.Collect(maps.Keys(c.fileDiagnostics))
	slices.Sort(fileNames)
	diagnostics := c.nonFileDiagnostics
	for _, fileName := range fileNames {
		diagnostics = append(diagnostics, c.fileDiagnostics[fileName]...)
	}
	return diagnostics
}

func sortAndDeduplicateDiagnostics(diagnostics []*Diagnostic) []*Diagnostic {
	result := slices.Clone(diagnostics)
	slices.SortFunc(result, compareDiagnostics)
	return slices.CompactFunc(result, equalDiagnostics)
}

func equalDiagnostics(d1, d2 *Diagnostic) bool {
	return getDiagnosticPath(d1) == getDiagnosticPath(d2) &&
		d1.loc == d2.loc &&
		d1.code == d2.code &&
		d1.message == d2.message &&
		slices.EqualFunc(d1.messageChain, d2.messageChain, equalMessageChain) &&
		slices.EqualFunc(d1.relatedInformation, d2.relatedInformation, equalDiagnostics)
}

func equalMessageChain(c1, c2 *MessageChain) bool {
	return c1.code == c2.code &&
		c1.message == c2.message &&
		slices.EqualFunc(c1.messageChain, c2.messageChain, equalMessageChain)
}

func compareDiagnostics(d1, d2 *Diagnostic) int {
	c := strings.Compare(getDiagnosticPath(d1), getDiagnosticPath(d2))
	if c != 0 {
		return c
	}
	c = int(d1.loc.pos) - int(d2.loc.pos)
	if c != 0 {
		return c
	}
	c = int(d1.loc.end) - int(d2.loc.end)
	if c != 0 {
		return c
	}
	c = int(d1.code) - int(d2.code)
	if c != 0 {
		return c
	}
	c = strings.Compare(d1.message, d2.message)
	if c != 0 {
		return c
	}
	c = compareMessageChainSize(d1.messageChain, d2.messageChain)
	if c != 0 {
		return c
	}
	c = compareMessageChainContent(d1.messageChain, d2.messageChain)
	if c != 0 {
		return c
	}
	return compareRelatedInfo(d1.relatedInformation, d2.relatedInformation)
}

func compareMessageChainSize(c1, c2 []*MessageChain) int {
	c := len(c2) - len(c1)
	if c != 0 {
		return c
	}
	for i := range c1 {
		c = compareMessageChainSize(c1[i].messageChain, c2[i].messageChain)
		if c != 0 {
			return c
		}
	}
	return 0
}

func compareMessageChainContent(c1, c2 []*MessageChain) int {
	for i := range c1 {
		c := strings.Compare(c1[i].message, c2[i].message)
		if c != 0 {
			return c
		}
		if c1[i].messageChain != nil {
			c = compareMessageChainContent(c1[i].messageChain, c2[i].messageChain)
			if c != 0 {
				return c
			}
		}
	}
	return 0
}

func compareRelatedInfo(r1, r2 []*Diagnostic) int {
	c := len(r2) - len(r1)
	if c != 0 {
		return c
	}
	for i := range r1 {
		c = compareDiagnostics(r1[i], r2[i])
		if c != 0 {
			return c
		}
	}
	return 0
}

func getDiagnosticPath(d *Diagnostic) string {
	if d.file != nil {
		return d.file.path
	}
	return ""
}

func isConstAssertion(location *Node) bool {
	switch location.kind {
	case SyntaxKindAsExpression:
		return isConstTypeReference(location.AsAsExpression().typeNode)
	case SyntaxKindTypeAssertionExpression:
		return isConstTypeReference(location.AsTypeAssertion().typeNode)
	}
	return false
}

func isConstTypeReference(node *Node) bool {
	if node.kind == SyntaxKindTypeReference {
		ref := node.AsTypeReference()
		return ref.typeArguments == nil && isIdentifier(ref.typeName) && ref.typeName.AsIdentifier().text == "const"
	}
	return false
}

func isModuleOrEnumDeclaration(node *Node) bool {
	return node.kind == SyntaxKindModuleDeclaration || node.kind == SyntaxKindEnumDeclaration
}

func getLocalsOfNode(node *Node) SymbolTable {
	data := node.LocalsContainerData()
	if data != nil {
		return data.locals
	}
	return nil
}

func getBodyOfNode(node *Node) *Node {
	bodyData := node.BodyData()
	if bodyData != nil {
		return bodyData.body
	}
	return nil
}

func getFlowNodeOfNode(node *Node) *FlowNode {
	flowNodeData := node.FlowNodeData()
	if flowNodeData != nil {
		return flowNodeData.flowNode
	}
	return nil
}

func isGlobalSourceFile(node *Node) bool {
	return node.kind == SyntaxKindSourceFile && !isExternalOrCommonJsModule(node.AsSourceFile())
}

func isParameterLikeOrReturnTag(node *Node) bool {
	switch node.kind {
	case SyntaxKindParameter, SyntaxKindTypeParameter, SyntaxKindJSDocParameterTag, SyntaxKindJSDocReturnTag:
		return true
	}
	return false
}

func getEmitStandardClassFields(options *CompilerOptions) bool {
	return options.UseDefineForClassFields != TSFalse && getEmitScriptTarget(options) >= ScriptTargetES2022
}

func isTypeNodeKind(kind SyntaxKind) bool {
	switch kind {
	case SyntaxKindAnyKeyword, SyntaxKindUnknownKeyword, SyntaxKindNumberKeyword, SyntaxKindBigIntKeyword, SyntaxKindObjectKeyword,
		SyntaxKindBooleanKeyword, SyntaxKindStringKeyword, SyntaxKindSymbolKeyword, SyntaxKindVoidKeyword, SyntaxKindUndefinedKeyword,
		SyntaxKindNeverKeyword, SyntaxKindIntrinsicKeyword, SyntaxKindExpressionWithTypeArguments, SyntaxKindJSDocAllType, SyntaxKindJSDocUnknownType,
		SyntaxKindJSDocNullableType, SyntaxKindJSDocNonNullableType, SyntaxKindJSDocOptionalType, SyntaxKindJSDocFunctionType, SyntaxKindJSDocVariadicType:
		return true
	}
	return kind >= SyntaxKindFirstTypeNode && kind <= SyntaxKindLastTypeNode
}

func isTypeNode(node *Node) bool {
	return isTypeNodeKind(node.kind)
}

func getLocalSymbolForExportDefault(symbol *Symbol) *Symbol {
	if !isExportDefaultSymbol(symbol) || len(symbol.declarations) == 0 {
		return nil
	}
	for _, decl := range symbol.declarations {
		localSymbol := decl.LocalSymbol()
		if localSymbol != nil {
			return localSymbol
		}
	}
	return nil
}

func isExportDefaultSymbol(symbol *Symbol) bool {
	return symbol != nil && len(symbol.declarations) > 0 && hasSyntacticModifier(symbol.declarations[0], ModifierFlagsDefault)
}

func getDeclarationOfKind(symbol *Symbol, kind SyntaxKind) *Node {
	for _, declaration := range symbol.declarations {
		if declaration.kind == kind {
			return declaration
		}
	}
	return nil
}

func getIsolatedModules(options *CompilerOptions) bool {
	return options.IsolatedModules == TSTrue || options.VerbatimModuleSyntax == TSTrue
}

func findConstructorDeclaration(node *Node) *Node {
	for _, member := range node.ClassLikeData().members {
		if isConstructorDeclaration(member) && nodeIsPresent(member.AsConstructorDeclaration().body) {
			return member
		}
	}
	return nil
}

type NameResolver struct {
	compilerOptions                  *CompilerOptions
	getSymbolOfDeclaration           func(node *Node) *Symbol
	error                            func(location *Node, message *diagnostics.Message, args ...any) *Diagnostic
	globals                          SymbolTable
	argumentsSymbol                  *Symbol
	requireSymbol                    *Symbol
	lookup                           func(symbols SymbolTable, name string, meaning SymbolFlags) *Symbol
	setRequiresScopeChangeCache      func(node *Node, value Tristate)
	getRequiresScopeChangeCache      func(node *Node) Tristate
	onPropertyWithInvalidInitializer func(location *Node, name string, declaration *Node, result *Symbol) bool
	onFailedToResolveSymbol          func(location *Node, name string, meaning SymbolFlags, nameNotFoundMessage *diagnostics.Message)
	onSuccessfullyResolvedSymbol     func(location *Node, result *Symbol, meaning SymbolFlags, lastLocation *Node, associatedDeclarationForContainingInitializerOrBindingName *Node, withinDeferredContext bool)
}

func (r *NameResolver) resolve(location *Node, name string, meaning SymbolFlags, nameNotFoundMessage *diagnostics.Message, isUse bool, excludeGlobals bool) *Symbol {
	var result *Symbol
	var lastLocation *Node
	var lastSelfReferenceLocation *Node
	var propertyWithInvalidInitializer *Node
	var associatedDeclarationForContainingInitializerOrBindingName *Node
	var withinDeferredContext bool
	var grandparent *Node
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
			location = location.parent
		}
		locals := getLocalsOfNode(location)
		// Locals of a source file are not in scope (because they get merged into the global symbol table)
		if locals != nil && !isGlobalSourceFile(location) {
			result = r.lookup(locals, name, meaning)
			if result != nil {
				useResult := true
				if isFunctionLike(location) && lastLocation != nil && lastLocation != getBodyOfNode(location) {
					// symbol lookup restrictions for function-like declarations
					// - Type parameters of a function are in scope in the entire function declaration, including the parameter
					//   list and return type. However, local types are only in scope in the function body.
					// - parameters are only in the scope of function body
					// This restriction does not apply to JSDoc comment types because they are parented
					// at a higher level than type parameters would normally be
					if meaning&result.flags&SymbolFlagsType != 0 && lastLocation.kind != SyntaxKindJSDoc {
						useResult = result.flags&SymbolFlagsTypeParameter != 0 && (lastLocation.flags&NodeFlagsSynthesized != 0 ||
							lastLocation == location.ReturnType() ||
							isParameterLikeOrReturnTag(lastLocation))
					}
					if meaning&result.flags&SymbolFlagsVariable != 0 {
						// expression inside parameter will lookup as normal variable scope when targeting es2015+
						if r.useOuterVariableScopeInParameter(result, location, lastLocation) {
							useResult = false
						} else if result.flags&SymbolFlagsFunctionScopedVariable != 0 {
							// parameters are visible only inside function body, parameter list and return type
							// technically for parameter list case here we might mix parameters and variables declared in function,
							// however it is detected separately when checking initializers of parameters
							// to make sure that they reference no variables declared after them.
							useResult = lastLocation.kind == SyntaxKindParameter ||
								lastLocation.flags&NodeFlagsSynthesized != 0 ||
								lastLocation == location.ReturnType() && findAncestor(result.valueDeclaration, isParameter) != nil
						}
					}
				} else if location.kind == SyntaxKindConditionalType {
					// A type parameter declared using 'infer T' in a conditional type is visible only in
					// the true branch of the conditional type.
					useResult = lastLocation == location.AsConditionalTypeNode().trueType
				}
				if useResult {
					break loop
				}
				result = nil
			}
		}
		withinDeferredContext = withinDeferredContext || getIsDeferredContext(location, lastLocation)
		switch location.kind {
		case SyntaxKindSourceFile:
			if !isExternalOrCommonJsModule(location.AsSourceFile()) {
				break
			}
			fallthrough
		case SyntaxKindModuleDeclaration:
			moduleExports := r.getSymbolOfDeclaration(location).exports
			if isSourceFile(location) || (isModuleDeclaration(location) && location.flags&NodeFlagsAmbient != 0 && !isGlobalScopeAugmentation(location)) {
				// It's an external module. First see if the module has an export default and if the local
				// name of that export default matches.
				result = moduleExports[InternalSymbolNameDefault]
				if result != nil {
					localSymbol := getLocalSymbolForExportDefault(result)
					if localSymbol != nil && result.flags&meaning != 0 && localSymbol.name == name {
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
				if moduleExport != nil && moduleExport.flags == SymbolFlagsAlias && (getDeclarationOfKind(moduleExport, SyntaxKindExportSpecifier) != nil || getDeclarationOfKind(moduleExport, SyntaxKindNamespaceExport) != nil) {
					break
				}
			}
			if name != InternalSymbolNameDefault {
				result = r.lookup(moduleExports, name, meaning&SymbolFlagsModuleMember)
				if result != nil {
					break loop
				}
			}
		case SyntaxKindEnumDeclaration:
			result = r.lookup(r.getSymbolOfDeclaration(location).exports, name, meaning&SymbolFlagsEnumMember)
			if result != nil {
				if nameNotFoundMessage != nil && getIsolatedModules(r.compilerOptions) && location.flags&NodeFlagsAmbient == 0 && getSourceFileOfNode(location) != getSourceFileOfNode(result.valueDeclaration) {
					isolatedModulesLikeFlagName := ifElse(r.compilerOptions.VerbatimModuleSyntax == TSTrue, "verbatimModuleSyntax", "isolatedModules")
					r.error(originalLocation, diagnostics.Cannot_access_0_from_another_file_without_qualification_when_1_is_enabled_Use_2_instead,
						name, isolatedModulesLikeFlagName, r.getSymbolOfDeclaration(location).name+"."+name)
				}
				break loop
			}
		case SyntaxKindPropertyDeclaration:
			if !isStatic(location) {
				ctor := findConstructorDeclaration(location.parent)
				if ctor != nil && ctor.AsConstructorDeclaration().locals != nil {
					if r.lookup(ctor.AsConstructorDeclaration().locals, name, meaning&SymbolFlagsValue) != nil {
						// Remember the property node, it will be used later to report appropriate error
						propertyWithInvalidInitializer = location
					}
				}
			}
		case SyntaxKindClassDeclaration, SyntaxKindClassExpression, SyntaxKindInterfaceDeclaration:
			result = r.lookup(r.getSymbolOfDeclaration(location).members, name, meaning&SymbolFlagsType)
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
			if isClassExpression(location) && meaning&SymbolFlagsClass != 0 {
				className := location.AsClassExpression().name
				if className != nil && name == className.AsIdentifier().text {
					result = location.AsClassExpression().symbol
					break loop
				}
			}
		case SyntaxKindExpressionWithTypeArguments:
			if lastLocation == location.AsExpressionWithTypeArguments().expression && isHeritageClause(location.parent) && location.parent.AsHeritageClause().token == SyntaxKindExtendsKeyword {
				container := location.parent.parent
				if isClassLike(container) {
					result = r.lookup(r.getSymbolOfDeclaration(container).members, name, meaning&SymbolFlagsType)
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
		case SyntaxKindComputedPropertyName:
			grandparent = location.parent.parent
			if isClassLike(grandparent) || isInterfaceDeclaration(grandparent) {
				// A reference to this grandparent's type parameters would be an error
				result = r.lookup(r.getSymbolOfDeclaration(grandparent).members, name, meaning&SymbolFlagsType)
				if result != nil {
					if nameNotFoundMessage != nil {
						r.error(originalLocation, diagnostics.A_computed_property_name_cannot_reference_a_type_parameter_from_its_containing_type)
					}
					return nil
				}
			}
		case SyntaxKindArrowFunction:
			// when targeting ES6 or higher there is no 'arguments' in an arrow function
			// for lower compile targets the resolved symbol is used to emit an error
			if getEmitScriptTarget(r.compilerOptions) >= ScriptTargetES2015 {
				break
			}
			fallthrough
		case SyntaxKindMethodDeclaration, SyntaxKindConstructor, SyntaxKindGetAccessor, SyntaxKindSetAccessor, SyntaxKindFunctionDeclaration:
			if meaning&SymbolFlagsVariable != 0 && name == "arguments" {
				result = r.argumentsSymbol
				break loop
			}
		case SyntaxKindFunctionExpression:
			if meaning&SymbolFlagsVariable != 0 && name == "arguments" {
				result = r.argumentsSymbol
				break loop
			}
			if meaning&SymbolFlagsFunction != 0 {
				functionName := location.AsFunctionExpression().name
				if functionName != nil && name == functionName.AsIdentifier().text {
					result = location.AsFunctionExpression().symbol
					break loop
				}
			}
		case SyntaxKindDecorator:
			// Decorators are resolved at the class declaration. Resolving at the parameter
			// or member would result in looking up locals in the method.
			//
			//   function y() {}
			//   class C {
			//       method(@y x, y) {} // <-- decorator y should be resolved at the class declaration, not the parameter.
			//   }
			//
			if location.parent != nil && location.parent.kind == SyntaxKindParameter {
				location = location.parent
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
			if location.parent != nil && (isClassElement(location.parent) || location.parent.kind == SyntaxKindClassDeclaration) {
				location = location.parent
			}
		case SyntaxKindParameter:
			parameterDeclaration := location.AsParameterDeclaration()
			if lastLocation != nil && (lastLocation == parameterDeclaration.initializer ||
				lastLocation == parameterDeclaration.name && isBindingPattern(lastLocation)) {
				if associatedDeclarationForContainingInitializerOrBindingName == nil {
					associatedDeclarationForContainingInitializerOrBindingName = location
				}
			}
		case SyntaxKindBindingElement:
			bindingElement := location.AsBindingElement()
			if lastLocation != nil && (lastLocation == bindingElement.initializer ||
				lastLocation == bindingElement.name && isBindingPattern(lastLocation)) {
				if isPartOfParameterDeclaration(location) && associatedDeclarationForContainingInitializerOrBindingName == nil {
					associatedDeclarationForContainingInitializerOrBindingName = location
				}
			}
		case SyntaxKindInferType:
			if meaning&SymbolFlagsTypeParameter != 0 {
				parameterName := location.AsInferTypeNode().typeParameter.AsTypeParameter().name
				if parameterName != nil && name == parameterName.AsIdentifier().text {
					result = location.AsInferTypeNode().typeParameter.AsTypeParameter().symbol
					break loop
				}
			}
		case SyntaxKindExportSpecifier:
			exportSpecifier := location.AsExportSpecifier()
			if lastLocation != nil && lastLocation == exportSpecifier.propertyName && location.parent.parent.AsExportDeclaration().moduleSpecifier != nil {
				location = location.parent.parent.parent
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
			location = location.parent
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

func (r *NameResolver) useOuterVariableScopeInParameter(result *Symbol, location *Node, lastLocation *Node) bool {
	if isParameter(lastLocation) {
		body := getBodyOfNode(location)
		if body != nil && result.valueDeclaration != nil && result.valueDeclaration.Pos() >= body.Pos() && result.valueDeclaration.End() <= body.End() {
			// check for several cases where we introduce temporaries that require moving the name/initializer of the parameter to the body
			// - static field in a class expression
			// - optional chaining pre-es2020
			// - nullish coalesce pre-es2020
			// - spread assignment in binding pattern pre-es2017
			target := getEmitScriptTarget(r.compilerOptions)
			if target >= ScriptTargetES2015 {
				functionLocation := location
				declarationRequiresScopeChange := r.getRequiresScopeChangeCache(functionLocation)
				if declarationRequiresScopeChange == TSUnknown {
					declarationRequiresScopeChange = boolToTristate(utils.Some(functionLocation.Parameters(), r.requiresScopeChange))
					r.setRequiresScopeChangeCache(functionLocation, declarationRequiresScopeChange)
				}
				return declarationRequiresScopeChange == TSTrue
			}
		}
	}
	return false
}

func (r *NameResolver) requiresScopeChange(node *Node) bool {
	d := node.AsParameterDeclaration()
	return r.requiresScopeChangeWorker(d.name) || d.initializer != nil && r.requiresScopeChangeWorker(d.initializer)
}

func (r *NameResolver) requiresScopeChangeWorker(node *Node) bool {
	switch node.kind {
	case SyntaxKindArrowFunction, SyntaxKindFunctionExpression, SyntaxKindFunctionDeclaration, SyntaxKindConstructor:
		return false
	case SyntaxKindMethodDeclaration, SyntaxKindGetAccessor, SyntaxKindSetAccessor, SyntaxKindPropertyAssignment:
		return r.requiresScopeChangeWorker(node.Name())
	case SyntaxKindPropertyDeclaration:
		if hasStaticModifier(node) {
			return !getEmitStandardClassFields(r.compilerOptions)
		}
		return r.requiresScopeChangeWorker(node.AsPropertyDeclaration().name)
	default:
		if isNullishCoalesce(node) || isOptionalChain(node) {
			return getEmitScriptTarget(r.compilerOptions) < ScriptTargetES2020
		}
		if isBindingElement(node) && node.AsBindingElement().dotDotDotToken != nil && isObjectBindingPattern(node.parent) {
			return getEmitScriptTarget(r.compilerOptions) < ScriptTargetES2017
		}
		if isTypeNode(node) {
			return false
		}
		return node.ForEachChild(r.requiresScopeChangeWorker)
	}
}

func getIsDeferredContext(location *Node, lastLocation *Node) bool {
	if location.kind != SyntaxKindArrowFunction && location.kind != SyntaxKindFunctionExpression {
		// initializers in instance property declaration of class like entities are executed in constructor and thus deferred
		// A name is evaluated within the enclosing scope - so it shouldn't count as deferred
		return isTypeQueryNode(location) ||
			(isFunctionLikeDeclaration(location) || location.kind == SyntaxKindPropertyDeclaration && !isStatic(location)) &&
				(lastLocation == nil || lastLocation != location.Name())
	}
	if lastLocation != nil && lastLocation == location.Name() {
		return false
	}
	// generator functions and async functions are not inlined in control flow when immediately invoked
	if location.BodyData().asteriskToken != nil || hasSyntacticModifier(location, ModifierFlagsAsync) {
		return true
	}
	return getImmediatelyInvokedFunctionExpression(location) == nil
}

func isTypeParameterSymbolDeclaredInContainer(symbol *Symbol, container *Node) bool {
	for _, decl := range symbol.declarations {
		if decl.kind == SyntaxKindTypeParameter {
			parent := decl.parent.parent
			if parent == container {
				return true
			}
		}
	}
	return false
}

func isSelfReferenceLocation(node *Node, lastLocation *Node) bool {
	switch node.kind {
	case SyntaxKindParameter:
		return lastLocation != nil && lastLocation == node.AsParameterDeclaration().name
	case SyntaxKindFunctionDeclaration, SyntaxKindClassDeclaration, SyntaxKindInterfaceDeclaration, SyntaxKindEnumDeclaration,
		SyntaxKindTypeAliasDeclaration, SyntaxKindModuleDeclaration: // For `namespace N { N; }`
		return true
	}
	return false
}

func isTypeReferenceIdentifier(node *Node) bool {
	for node.parent.kind == SyntaxKindQualifiedName {
		node = node.parent
	}
	return isTypeReferenceNode(node.parent)
}

func isInTypeQuery(node *Node) bool {
	// TypeScript 1.0 spec (April 2014): 3.6.3
	// A type query consists of the keyword typeof followed by an expression.
	// The expression is restricted to a single identifier or a sequence of identifiers separated by periods
	return findAncestorOrQuit(node, func(n *Node) FindAncestorResult {
		switch n.kind {
		case SyntaxKindTypeQuery:
			return FindAncestorTrue
		case SyntaxKindIdentifier, SyntaxKindQualifiedName:
			return FindAncestorFalse
		}
		return FindAncestorQuit
	}) != nil
}

func nodeKindIs(node *Node, kinds ...SyntaxKind) bool {
	return slices.Contains(kinds, node.kind)
}

func isTypeOnlyImportDeclaration(node *Node) bool {
	switch node.kind {
	case SyntaxKindImportSpecifier:
		return node.AsImportSpecifier().isTypeOnly || node.parent.parent.AsImportClause().isTypeOnly
	case SyntaxKindNamespaceImport:
		return node.parent.AsImportClause().isTypeOnly
	case SyntaxKindImportClause:
		return node.AsImportClause().isTypeOnly
	case SyntaxKindImportEqualsDeclaration:
		return node.AsImportEqualsDeclaration().isTypeOnly
	}
	return false
}

func isTypeOnlyExportDeclaration(node *Node) bool {
	switch node.kind {
	case SyntaxKindExportSpecifier:
		return node.AsExportSpecifier().isTypeOnly || node.parent.parent.AsExportDeclaration().isTypeOnly
	case SyntaxKindExportDeclaration:
		d := node.AsExportDeclaration()
		return d.isTypeOnly && d.moduleSpecifier != nil && d.exportClause == nil
	case SyntaxKindNamespaceExport:
		return node.parent.AsExportDeclaration().isTypeOnly
	}
	return false
}

func isTypeOnlyImportOrExportDeclaration(node *Node) bool {
	return isTypeOnlyImportDeclaration(node) || isTypeOnlyExportDeclaration(node)
}

func getNameFromImportDeclaration(node *Node) *Node {
	switch node.kind {
	case SyntaxKindImportSpecifier:
		return node.AsImportSpecifier().name
	case SyntaxKindNamespaceImport:
		return node.AsNamespaceImport().name
	case SyntaxKindImportClause:
		return node.AsImportClause().name
	case SyntaxKindImportEqualsDeclaration:
		return node.AsImportEqualsDeclaration().name
	}
	return nil
}

func isValidTypeOnlyAliasUseSite(useSite *Node) bool {
	return useSite.flags&NodeFlagsAmbient != 0 ||
		isPartOfTypeQuery(useSite) ||
		isIdentifierInNonEmittingHeritageClause(useSite) ||
		isPartOfPossiblyValidTypeOrAbstractComputedPropertyName(useSite) ||
		!(isExpressionNode(useSite) || isShorthandPropertyNameUseSite(useSite))
}

func isIdentifierInNonEmittingHeritageClause(node *Node) bool {
	if node.kind != SyntaxKindIdentifier {
		return false
	}
	heritageClause := findAncestorOrQuit(node.parent, func(parent *Node) FindAncestorResult {
		switch parent.kind {
		case SyntaxKindHeritageClause:
			return FindAncestorTrue
		case SyntaxKindPropertyAccessExpression, SyntaxKindExpressionWithTypeArguments:
			return FindAncestorFalse
		default:
			return FindAncestorQuit
		}
	})
	if heritageClause != nil {
		return heritageClause.AsHeritageClause().token == SyntaxKindImmediateKeyword || heritageClause.parent.kind == SyntaxKindInterfaceDeclaration
	}
	return false
}

func isPartOfPossiblyValidTypeOrAbstractComputedPropertyName(node *Node) bool {
	for nodeKindIs(node, SyntaxKindIdentifier, SyntaxKindPropertyAccessExpression) {
		node = node.parent
	}
	if node.kind != SyntaxKindComputedPropertyName {
		return false
	}
	if hasSyntacticModifier(node.parent, ModifierFlagsAbstract) {
		return true
	}
	return nodeKindIs(node.parent.parent, SyntaxKindInterfaceDeclaration, SyntaxKindTypeLiteral)
}

func isExpressionNode(node *Node) bool {
	switch node.kind {
	case SyntaxKindSuperKeyword, SyntaxKindNullKeyword, SyntaxKindTrueKeyword, SyntaxKindFalseKeyword, SyntaxKindRegularExpressionLiteral,
		SyntaxKindArrayLiteralExpression, SyntaxKindObjectLiteralExpression, SyntaxKindPropertyAccessExpression, SyntaxKindElementAccessExpression,
		SyntaxKindCallExpression, SyntaxKindNewExpression, SyntaxKindTaggedTemplateExpression, SyntaxKindAsExpression, SyntaxKindTypeAssertionExpression,
		SyntaxKindSatisfiesExpression, SyntaxKindNonNullExpression, SyntaxKindParenthesizedExpression, SyntaxKindFunctionExpression,
		SyntaxKindClassExpression, SyntaxKindArrowFunction, SyntaxKindVoidExpression, SyntaxKindDeleteExpression, SyntaxKindTypeOfExpression,
		SyntaxKindPrefixUnaryExpression, SyntaxKindPostfixUnaryExpression, SyntaxKindBinaryExpression, SyntaxKindConditionalExpression,
		SyntaxKindSpreadElement, SyntaxKindTemplateExpression, SyntaxKindOmittedExpression, SyntaxKindJsxElement, SyntaxKindJsxSelfClosingElement,
		SyntaxKindJsxFragment, SyntaxKindYieldExpression, SyntaxKindAwaitExpression, SyntaxKindMetaProperty:
		return true
	case SyntaxKindExpressionWithTypeArguments:
		return !isHeritageClause(node.parent)
	case SyntaxKindQualifiedName:
		for node.parent.kind == SyntaxKindQualifiedName {
			node = node.parent
		}
		return isTypeQueryNode(node.parent) || isJSDocLinkLike(node.parent) || isJSXTagName(node)
	case SyntaxKindJSDocMemberName:
		return isTypeQueryNode(node.parent) || isJSDocLinkLike(node.parent) || isJSXTagName(node)
	case SyntaxKindPrivateIdentifier:
		return isBinaryExpression(node.parent) && node.parent.AsBinaryExpression().left == node && node.parent.AsBinaryExpression().operatorToken.kind == SyntaxKindInKeyword
	case SyntaxKindIdentifier:
		if isTypeQueryNode(node.parent) || isJSDocLinkLike(node.parent) || isJSXTagName(node) {
			return true
		}
		fallthrough
	case SyntaxKindNumericLiteral, SyntaxKindBigIntLiteral, SyntaxKindStringLiteral, SyntaxKindNoSubstitutionTemplateLiteral, SyntaxKindThisKeyword:
		return isInExpressionContext(node)
	default:
		return false
	}
}

func isInExpressionContext(node *Node) bool {
	parent := node.parent
	switch parent.kind {
	case SyntaxKindVariableDeclaration:
		return parent.AsVariableDeclaration().initializer == node
	case SyntaxKindParameter:
		return parent.AsParameterDeclaration().initializer == node
	case SyntaxKindPropertyDeclaration:
		return parent.AsPropertyDeclaration().initializer == node
	case SyntaxKindPropertySignature:
		return parent.AsPropertySignatureDeclaration().initializer == node
	case SyntaxKindEnumMember:
		return parent.AsEnumMember().initializer == node
	case SyntaxKindPropertyAssignment:
		return parent.AsPropertyAssignment().initializer == node
	case SyntaxKindBindingElement:
		return parent.AsBindingElement().initializer == node
	case SyntaxKindExpressionStatement:
		return parent.AsExpressionStatement().expression == node
	case SyntaxKindIfStatement:
		return parent.AsIfStatement().expression == node
	case SyntaxKindDoStatement:
		return parent.AsDoStatement().expression == node
	case SyntaxKindWhileStatement:
		return parent.AsWhileStatement().expression == node
	case SyntaxKindReturnStatement:
		return parent.AsReturnStatement().expression == node
	case SyntaxKindWithStatement:
		return parent.AsWithStatement().expression == node
	case SyntaxKindSwitchStatement:
		return parent.AsSwitchStatement().expression == node
	case SyntaxKindCaseClause, SyntaxKindDefaultClause:
		return parent.AsCaseOrDefaultClause().expression == node
	case SyntaxKindThrowStatement:
		return parent.AsThrowStatement().expression == node
	case SyntaxKindForStatement:
		s := parent.AsForStatement()
		return s.initializer == node && s.initializer.kind != SyntaxKindVariableDeclarationList || s.condition == node || s.incrementor == node
	case SyntaxKindForInStatement, SyntaxKindForOfStatement:
		s := parent.AsForInOrOfStatement()
		return s.initializer == node && s.initializer.kind != SyntaxKindVariableDeclarationList || s.expression == node
	case SyntaxKindTypeAssertionExpression:
		return parent.AsTypeAssertion().expression == node
	case SyntaxKindAsExpression:
		return parent.AsAsExpression().expression == node
	case SyntaxKindTemplateSpan:
		return parent.AsTemplateSpan().expression == node
	case SyntaxKindComputedPropertyName:
		return parent.AsComputedPropertyName().expression == node
	case SyntaxKindDecorator, SyntaxKindJsxExpression, SyntaxKindJsxSpreadAttribute, SyntaxKindSpreadAssignment:
		return true
	case SyntaxKindExpressionWithTypeArguments:
		return parent.AsExpressionWithTypeArguments().expression == node && !isPartOfTypeNode(parent)
	case SyntaxKindShorthandPropertyAssignment:
		return parent.AsShorthandPropertyAssignment().objectAssignmentInitializer == node
	case SyntaxKindSatisfiesExpression:
		return parent.AsSatisfiesExpression().expression == node
	default:
		return isExpressionNode(parent)
	}
}

func isPartOfTypeNode(node *Node) bool {
	kind := node.kind
	if kind >= SyntaxKindFirstTypeNode && kind <= SyntaxKindLastTypeNode {
		return true
	}
	switch node.kind {
	case SyntaxKindAnyKeyword, SyntaxKindUnknownKeyword, SyntaxKindNumberKeyword, SyntaxKindBigIntKeyword, SyntaxKindStringKeyword,
		SyntaxKindBooleanKeyword, SyntaxKindSymbolKeyword, SyntaxKindObjectKeyword, SyntaxKindUndefinedKeyword, SyntaxKindNullKeyword,
		SyntaxKindNeverKeyword:
		return true
	case SyntaxKindExpressionWithTypeArguments:
		return isPartOfTypeExpressionWithTypeArguments(node)
	case SyntaxKindTypeParameter:
		return node.parent.kind == SyntaxKindMappedType || node.parent.kind == SyntaxKindInferType
	case SyntaxKindIdentifier:
		parent := node.parent
		if isQualifiedName(parent) && parent.AsQualifiedName().right == node {
			return isPartOfTypeNodeInParent(parent)
		}
		if isPropertyAccessExpression(parent) && parent.AsPropertyAccessExpression().name == node {
			return isPartOfTypeNodeInParent(parent)
		}
		return isPartOfTypeNodeInParent(node)
	case SyntaxKindQualifiedName, SyntaxKindPropertyAccessExpression, SyntaxKindThisKeyword:
		return isPartOfTypeNodeInParent(node)
	}
	return false
}

func isPartOfTypeNodeInParent(node *Node) bool {
	parent := node.parent
	// Do not recursively call isPartOfTypeNode on the parent. In the example:
	//
	//     let a: A.B.C;
	//
	// Calling isPartOfTypeNode would consider the qualified name A.B a type node.
	// Only C and A.B.C are type nodes.
	if parent.kind >= SyntaxKindFirstTypeNode && parent.kind <= SyntaxKindLastTypeNode {
		return true
	}
	switch parent.kind {
	case SyntaxKindTypeQuery:
		return false
	case SyntaxKindImportType:
		return !parent.AsImportTypeNode().isTypeOf
	case SyntaxKindExpressionWithTypeArguments:
		return isPartOfTypeExpressionWithTypeArguments(parent)
	case SyntaxKindTypeParameter:
		return node == parent.AsTypeParameter().constraint
	case SyntaxKindPropertyDeclaration:
		return node == parent.AsPropertyDeclaration().typeNode
	case SyntaxKindPropertySignature:
		return node == parent.AsPropertySignatureDeclaration().typeNode
	case SyntaxKindParameter:
		return node == parent.AsParameterDeclaration().typeNode
	case SyntaxKindVariableDeclaration:
		return node == parent.AsVariableDeclaration().typeNode
	case SyntaxKindFunctionDeclaration, SyntaxKindFunctionExpression, SyntaxKindArrowFunction, SyntaxKindConstructor, SyntaxKindMethodDeclaration,
		SyntaxKindMethodSignature, SyntaxKindGetAccessor, SyntaxKindSetAccessor, SyntaxKindCallSignature, SyntaxKindConstructSignature,
		SyntaxKindIndexSignature:
		return node == parent.ReturnType()
	case SyntaxKindTypeAssertionExpression:
		return node == parent.AsTypeAssertion().typeNode
	case SyntaxKindCallExpression:
		return typeArgumentListContains(parent.AsCallExpression().typeArguments, node)
	case SyntaxKindNewExpression:
		return typeArgumentListContains(parent.AsNewExpression().typeArguments, node)
	case SyntaxKindTaggedTemplateExpression:
		return typeArgumentListContains(parent.AsTaggedTemplateExpression().typeArguments, node)
	}
	return false
}

func isPartOfTypeExpressionWithTypeArguments(node *Node) bool {
	parent := node.parent
	return isHeritageClause(parent) && (!isClassLike(parent.parent) || parent.AsHeritageClause().token == SyntaxKindImplementsKeyword)
}

func typeArgumentListContains(list *Node, node *Node) bool {
	if list != nil {
		return slices.Contains(list.AsTypeArgumentList().arguments, node)
	}
	return false
}

func isJSDocLinkLike(node *Node) bool {
	return nodeKindIs(node, SyntaxKindJSDocLink, SyntaxKindJSDocLinkCode, SyntaxKindJSDocLinkPlain)
}

func isJSXTagName(node *Node) bool {
	parent := node.parent
	switch parent.kind {
	case SyntaxKindJsxOpeningElement:
		return parent.AsJsxOpeningElement().tagName == node
	case SyntaxKindJsxSelfClosingElement:
		return parent.AsJsxSelfClosingElement().tagName == node
	case SyntaxKindJsxClosingElement:
		return parent.AsJsxClosingElement().tagName == node
	}
	return false
}

func isShorthandPropertyNameUseSite(useSite *Node) bool {
	return isIdentifier(useSite) && isShorthandPropertyAssignment(useSite.parent) && useSite.parent.AsShorthandPropertyAssignment().name == useSite
}

func isTypeDeclaration(node *Node) bool {
	switch node.kind {
	case SyntaxKindTypeParameter, SyntaxKindClassDeclaration, SyntaxKindInterfaceDeclaration, SyntaxKindTypeAliasDeclaration, SyntaxKindEnumDeclaration:
		return true
	case SyntaxKindImportClause:
		return node.AsImportClause().isTypeOnly
	case SyntaxKindImportSpecifier:
		return node.parent.parent.AsImportClause().isTypeOnly
	case SyntaxKindExportSpecifier:
		return node.parent.parent.AsExportDeclaration().isTypeOnly
	default:
		return false
	}
}

func canHaveSymbol(node *Node) bool {
	switch node.kind {
	case SyntaxKindArrowFunction, SyntaxKindBinaryExpression, SyntaxKindBindingElement, SyntaxKindCallExpression, SyntaxKindCallSignature,
		SyntaxKindClassDeclaration, SyntaxKindClassExpression, SyntaxKindClassStaticBlockDeclaration, SyntaxKindConstructor, SyntaxKindConstructorType,
		SyntaxKindConstructSignature, SyntaxKindElementAccessExpression, SyntaxKindEnumDeclaration, SyntaxKindEnumMember, SyntaxKindExportAssignment,
		SyntaxKindExportDeclaration, SyntaxKindExportSpecifier, SyntaxKindFunctionDeclaration, SyntaxKindFunctionExpression, SyntaxKindFunctionType,
		SyntaxKindGetAccessor, SyntaxKindIdentifier, SyntaxKindImportClause, SyntaxKindImportEqualsDeclaration, SyntaxKindImportSpecifier,
		SyntaxKindIndexSignature, SyntaxKindInterfaceDeclaration, SyntaxKindJSDocCallbackTag, SyntaxKindJSDocEnumTag, SyntaxKindJSDocFunctionType,
		SyntaxKindJSDocParameterTag, SyntaxKindJSDocPropertyTag, SyntaxKindJSDocSignature, SyntaxKindJSDocTypedefTag, SyntaxKindJSDocTypeLiteral,
		SyntaxKindJsxAttribute, SyntaxKindJsxAttributes, SyntaxKindJsxSpreadAttribute, SyntaxKindMappedType, SyntaxKindMethodDeclaration,
		SyntaxKindMethodSignature, SyntaxKindModuleDeclaration, SyntaxKindNamedTupleMember, SyntaxKindNamespaceExport, SyntaxKindNamespaceExportDeclaration,
		SyntaxKindNamespaceImport, SyntaxKindNewExpression, SyntaxKindNoSubstitutionTemplateLiteral, SyntaxKindNumericLiteral, SyntaxKindObjectLiteralExpression,
		SyntaxKindParameter, SyntaxKindPropertyAccessExpression, SyntaxKindPropertyAssignment, SyntaxKindPropertyDeclaration, SyntaxKindPropertySignature,
		SyntaxKindSetAccessor, SyntaxKindShorthandPropertyAssignment, SyntaxKindSourceFile, SyntaxKindSpreadAssignment, SyntaxKindStringLiteral,
		SyntaxKindTypeAliasDeclaration, SyntaxKindTypeLiteral, SyntaxKindTypeParameter, SyntaxKindVariableDeclaration:
		return true
	}
	return false
}

func canHaveLocals(node *Node) bool {
	switch node.kind {
	case SyntaxKindArrowFunction, SyntaxKindBlock, SyntaxKindCallSignature, SyntaxKindCaseBlock, SyntaxKindCatchClause,
		SyntaxKindClassStaticBlockDeclaration, SyntaxKindConditionalType, SyntaxKindConstructor, SyntaxKindConstructorType,
		SyntaxKindConstructSignature, SyntaxKindForStatement, SyntaxKindForInStatement, SyntaxKindForOfStatement, SyntaxKindFunctionDeclaration,
		SyntaxKindFunctionExpression, SyntaxKindFunctionType, SyntaxKindGetAccessor, SyntaxKindIndexSignature, SyntaxKindJSDocCallbackTag,
		SyntaxKindJSDocEnumTag, SyntaxKindJSDocFunctionType, SyntaxKindJSDocSignature, SyntaxKindJSDocTypedefTag, SyntaxKindMappedType,
		SyntaxKindMethodDeclaration, SyntaxKindMethodSignature, SyntaxKindModuleDeclaration, SyntaxKindSetAccessor, SyntaxKindSourceFile,
		SyntaxKindTypeAliasDeclaration:
		return true
	}
	return false
}

func isAnyImportOrReExport(node *Node) bool {
	return isAnyImportSyntax(node) || isExportDeclaration(node)
}

func isAnyImportSyntax(node *Node) bool {
	return nodeKindIs(node, SyntaxKindImportDeclaration, SyntaxKindImportEqualsDeclaration)
}

func getExternalModuleName(node *Node) *Node {
	switch node.kind {
	case SyntaxKindImportDeclaration:
		return node.AsImportDeclaration().moduleSpecifier
	case SyntaxKindExportDeclaration:
		return node.AsExportDeclaration().moduleSpecifier
	case SyntaxKindImportEqualsDeclaration:
		if node.AsImportEqualsDeclaration().moduleReference.kind == SyntaxKindExternalModuleReference {
			return node.AsImportEqualsDeclaration().moduleReference.AsExternalModuleReference().expression
		}
		return nil
	case SyntaxKindImportType:
		return getImportTypeNodeLiteral(node)
	case SyntaxKindCallExpression:
		return node.AsCallExpression().arguments[0]
	case SyntaxKindModuleDeclaration:
		if isStringLiteral(node.AsModuleDeclaration().name) {
			return node.AsModuleDeclaration().name
		}
		return nil
	}
	panic("Unhandled case in getExternalModuleName")
}

func getImportTypeNodeLiteral(node *Node) *Node {
	if isImportTypeNode(node) {
		importTypeNode := node.AsImportTypeNode()
		if isLiteralTypeNode(importTypeNode.argument) {
			literalTypeNode := importTypeNode.argument.AsLiteralTypeNode()
			if isStringLiteral(literalTypeNode.literal) {
				return literalTypeNode.literal
			}
		}
	}
	return nil
}

func isExternalModuleNameRelative(moduleName string) bool {
	// TypeScript 1.0 spec (April 2014): 11.2.1
	// An external module name is "relative" if the first term is "." or "..".
	// Update: We also consider a path like `C:\foo.ts` "relative" because we do not search for it in `node_modules` or treat it as an ambient module.
	return pathIsRelative(moduleName) || isRootedDiskPath(moduleName)
}

func pathIsRelative(path string) bool {
	return utils.MakeRegexp(`^\.\.?(?:$|[\\/])`).MatchString(path)
}

func extensionIsTs(ext string) bool {
	return ext == ExtensionTs || ext == ExtensionTsx || ext == ExtensionDts || ext == ExtensionMts || ext == ExtensionDmts || ext == ExtensionCts || ext == ExtensionDcts || len(ext) >= 7 && ext[:3] == ".d." && ext[len(ext)-3:] == ".ts"
}

func isShorthandAmbientModuleSymbol(moduleSymbol *Symbol) bool {
	return isShorthandAmbientModule(moduleSymbol.valueDeclaration)
}

func isShorthandAmbientModule(node *Node) bool {
	// The only kind of module that can be missing a body is a shorthand ambient module.
	return node != nil && node.kind == SyntaxKindModuleDeclaration && node.AsModuleDeclaration().body == nil
}

func isEntityName(node *Node) bool {
	return node.kind == SyntaxKindIdentifier || node.kind == SyntaxKindQualifiedName
}

func nodeIsSynthesized(node *Node) bool {
	return node.loc.pos < 0 || node.loc.end < 0
}

func getFirstIdentifier(node *Node) *Node {
	switch node.kind {
	case SyntaxKindIdentifier:
		return node
	case SyntaxKindQualifiedName:
		return getFirstIdentifier(node.AsQualifiedName().left)
	case SyntaxKindPropertyAccessExpression:
		return getFirstIdentifier(node.AsPropertyAccessExpression().expression)
	}
	panic("Unhandled case in getFirstIdentifier")
}

func getAliasDeclarationFromName(node *Node) *Node {
	switch node.kind {
	case SyntaxKindImportClause, SyntaxKindImportSpecifier, SyntaxKindNamespaceImport, SyntaxKindExportSpecifier, SyntaxKindExportAssignment,
		SyntaxKindImportEqualsDeclaration, SyntaxKindNamespaceExport:
		return node.parent
	case SyntaxKindQualifiedName:
		return getAliasDeclarationFromName(node.parent)
	}
	return nil
}

func entityNameToString(name *Node) string {
	switch name.kind {
	case SyntaxKindThisKeyword:
		return "this"
	case SyntaxKindIdentifier, SyntaxKindPrivateIdentifier:
		return getTextOfNode(name)
	case SyntaxKindQualifiedName:
		return entityNameToString(name.AsQualifiedName().left) + "." + entityNameToString(name.AsQualifiedName().right)
	case SyntaxKindPropertyAccessExpression:
		return entityNameToString(name.AsPropertyAccessExpression().expression) + "." + entityNameToString(name.AsPropertyAccessExpression().name)
	case SyntaxKindJsxNamespacedName:
		return entityNameToString(name.AsJsxNamespacedName().namespace) + ":" + entityNameToString(name.AsJsxNamespacedName().name)
	}
	panic("Unhandled case in entityNameToString")
}

func getContainingQualifiedNameNode(node *Node) *Node {
	for isQualifiedName(node.parent) {
		node = node.parent
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

func isSideEffectImport(node *Node) bool {
	ancestor := findAncestor(node, isImportDeclaration)
	return ancestor != nil && ancestor.AsImportDeclaration().importClause == nil
}

func getExternalModuleRequireArgument(node *Node) *Node {
	if isVariableDeclarationInitializedToBareOrAccessedRequire(node) {
		return getLeftmostAccessExpression(node.AsVariableDeclaration().initializer).AsCallExpression().arguments[0]
	}
	return nil
}

func getExternalModuleImportEqualsDeclarationExpression(node *Node) *Node {
	//Debug.assert(isExternalModuleImportEqualsDeclaration(node))
	return node.AsImportEqualsDeclaration().moduleReference.AsExternalModuleReference().expression
}

func isRightSideOfQualifiedNameOrPropertyAccess(node *Node) bool {
	parent := node.parent
	switch parent.kind {
	case SyntaxKindQualifiedName:
		return parent.AsQualifiedName().right == node
	case SyntaxKindPropertyAccessExpression:
		return parent.AsPropertyAccessExpression().name == node
	case SyntaxKindMetaProperty:
		return parent.AsMetaProperty().name == node
	}
	return false
}

func getNamespaceDeclarationNode(node *Node) *Node {
	switch node.kind {
	case SyntaxKindImportDeclaration:
		importClause := node.AsImportDeclaration().importClause
		if importClause != nil && isNamespaceImport(importClause.AsImportClause().namedBindings) {
			return importClause.AsImportClause().namedBindings
		}
	case SyntaxKindImportEqualsDeclaration:
		return node
	case SyntaxKindExportDeclaration:
		exportClause := node.AsExportDeclaration().exportClause
		if exportClause != nil && isNamespaceExport(exportClause) {
			return exportClause
		}
	default:
		panic("Unhandled case in getNamespaceDeclarationNode")
	}
	return nil
}

func isImportCall(node *Node) bool {
	return isCallExpression(node) && node.AsCallExpression().expression.kind == SyntaxKindImportKeyword
}

func getSourceFileOfModule(module *Symbol) *SourceFile {
	declaration := module.valueDeclaration
	if declaration == nil {
		declaration = getNonAugmentationDeclaration(module)
	}
	return getSourceFileOfNode(declaration)
}

func getNonAugmentationDeclaration(symbol *Symbol) *Node {
	return utils.Find(symbol.declarations, func(d *Node) bool {
		return !isExternalModuleAugmentation(d) && !(isModuleDeclaration(d) && isGlobalScopeAugmentation(d))
	})
}

func isExternalModuleAugmentation(node *Node) bool {
	return isAmbientModule(node) && isModuleAugmentationExternal(node)
}

func isJsonSourceFile(file *SourceFile) bool {
	return file.scriptKind == ScriptKindJSON
}

func isSyntacticDefault(node *Node) bool {
	return (isExportAssignment(node) && !node.AsExportAssignment().isExportEquals) ||
		hasSyntacticModifier(node, ModifierFlagsDefault) ||
		isExportSpecifier(node) ||
		isNamespaceExport(node)
}

func hasExportAssignmentSymbol(moduleSymbol *Symbol) bool {
	return moduleSymbol.exports[InternalSymbolNameExportEquals] != nil
}

func isImportOrExportSpecifier(node *Node) bool {
	return isImportSpecifier(node) || isExportSpecifier(node)
}

func parsePseudoBigInt(stringValue string) string {
	return stringValue // !!!
}

func isTypeAlias(node *Node) bool {
	return isTypeAliasDeclaration(node)
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

func getEffectiveTypeParameterDeclarations(node *Node) []*Node {
	// if isJSDocSignature(node) {
	// 	if isJSDocOverloadTag(node.parent) {
	// 		jsDoc := getJSDocRoot(node.parent)
	// 		if jsDoc && length(jsDoc.tags) {
	// 			return flatMap(jsDoc.tags, func(tag JSDocTag) *NodeArray[TypeParameterDeclaration] {
	// 				if isJSDocTemplateTag(tag) {
	// 					return tag.typeParameters
	// 				} else {
	// 					return nil
	// 				}
	// 			})
	// 		}
	// 	}
	// 	return emptyArray
	// }
	// if isJSDocTypeAlias(node) {
	// 	Debug.assert(node.parent.kind == SyntaxKindJSDoc)
	// 	return flatMap(node.parent.tags, func(tag JSDocTag) *NodeArray[TypeParameterDeclaration] {
	// 		if isJSDocTemplateTag(tag) {
	// 			return tag.typeParameters
	// 		} else {
	// 			return nil
	// 		}
	// 	})
	// }
	typeParameters := node.TypeParameters()
	if typeParameters != nil {
		return typeParameters.AsTypeParameterList().parameters
	}
	// if isInJSFile(node) {
	// 	decls := getJSDocTypeParameterDeclarations(node)
	// 	if decls.length {
	// 		return decls
	// 	}
	// 	typeTag := getJSDocType(node)
	// 	if typeTag && isFunctionTypeNode(typeTag) && typeTag.typeParameters {
	// 		return typeTag.typeParameters
	// 	}
	// }
	return nil
}

func getTypeParameterNodesFromNode(node *Node) []*Node {
	typeParameterList := node.TypeParameters()
	if typeParameterList != nil {
		return typeParameterList.AsTypeParameterList().parameters
	}
	return nil
}

func getTypeArgumentNodesFromNode(node *Node) []*Node {
	typeArgumentList := getTypeArgumentListFromNode(node)
	if typeArgumentList != nil {
		return typeArgumentList.AsTypeArgumentList().arguments
	}
	return nil
}

func getTypeArgumentListFromNode(node *Node) *Node {
	switch node.kind {
	case SyntaxKindCallExpression:
		return node.AsCallExpression().typeArguments
	case SyntaxKindNewExpression:
		return node.AsNewExpression().typeArguments
	case SyntaxKindTaggedTemplateExpression:
		return node.AsTaggedTemplateExpression().typeArguments
	case SyntaxKindTypeReference:
		return node.AsTypeReference().typeArguments
	case SyntaxKindExpressionWithTypeArguments:
		return node.AsExpressionWithTypeArguments().typeArguments
	case SyntaxKindImportType:
		return node.AsImportTypeNode().typeArguments
	case SyntaxKindTypeQuery:
		return node.AsTypeQueryNode().typeArguments
	}
	panic("Unhandled case in getTypeArgumentListFromNode")
}

func getInitializerFromNode(node *Node) *Node {
	switch node.kind {
	case SyntaxKindVariableDeclaration:
		return node.AsVariableDeclaration().initializer
	case SyntaxKindParameter:
		return node.AsParameterDeclaration().initializer
	case SyntaxKindBindingElement:
		return node.AsBindingElement().initializer
	case SyntaxKindPropertyDeclaration:
		return node.AsPropertyDeclaration().initializer
	case SyntaxKindPropertyAssignment:
		return node.AsPropertyAssignment().initializer
	case SyntaxKindEnumMember:
		return node.AsEnumMember().initializer
	case SyntaxKindForStatement:
		return node.AsForStatement().initializer
	case SyntaxKindForInStatement, SyntaxKindForOfStatement:
		return node.AsForInOrOfStatement().initializer
	case SyntaxKindJsxAttribute:
		return node.AsJsxAttribute().initializer
	}
	return nil
}

/**
 * Gets the effective type annotation of a variable, parameter, or property. If the node was
 * parsed in a JavaScript file, gets the type annotation from JSDoc.  Also gets the type of
 * functions only the JSDoc case.
 */
func getEffectiveTypeAnnotationNode(node *Node) *Node {
	switch node.kind {
	case SyntaxKindVariableDeclaration:
		return node.AsVariableDeclaration().typeNode
	case SyntaxKindParameter:
		return node.AsParameterDeclaration().typeNode
	case SyntaxKindPropertySignature:
		return node.AsPropertySignatureDeclaration().typeNode
	case SyntaxKindPropertyDeclaration:
		return node.AsPropertyDeclaration().typeNode
	case SyntaxKindTypePredicate:
		return node.AsTypePredicateNode().typeNode
	case SyntaxKindParenthesizedType:
		return node.AsParenthesizedTypeNode().typeNode
	case SyntaxKindTypeOperator:
		return node.AsTypeOperatorNode().typeNode
	case SyntaxKindMappedType:
		return node.AsMappedTypeNode().typeNode
	case SyntaxKindTypeAssertionExpression:
		return node.AsTypeAssertion().typeNode
	case SyntaxKindAsExpression:
		return node.AsAsExpression().typeNode
	default:
		if isFunctionLike(node) {
			return node.ReturnType()
		}
	}
	return nil
}

func isTypeAny(t *Type) bool {
	return t != nil && t.flags&TypeFlagsAny != 0
}

func isJSDocOptionalParameter(node *ParameterDeclaration) bool {
	return false // !!!
}

func isQuestionToken(node *Node) bool {
	return node != nil && node.kind == SyntaxKindQuestionToken
}

func isOptionalDeclaration(declaration *Node) bool {
	switch declaration.kind {
	case SyntaxKindParameter:
		return declaration.AsParameterDeclaration().questionToken != nil
	case SyntaxKindPropertyDeclaration:
		return isQuestionToken(declaration.AsPropertyDeclaration().postfixToken)
	case SyntaxKindPropertySignature:
		return isQuestionToken(declaration.AsPropertySignatureDeclaration().postfixToken)
	case SyntaxKindMethodDeclaration:
		return isQuestionToken(declaration.AsMethodDeclaration().postfixToken)
	case SyntaxKindMethodSignature:
		return isQuestionToken(declaration.AsMethodSignatureDeclaration().postfixToken)
	case SyntaxKindPropertyAssignment:
		return isQuestionToken(declaration.AsPropertyAssignment().postfixToken)
	case SyntaxKindShorthandPropertyAssignment:
		return isQuestionToken(declaration.AsShorthandPropertyAssignment().postfixToken)
	}
	return false
}

func isEmptyArrayLiteral(expression *Node) bool {
	return expression.kind == SyntaxKindArrayLiteralExpression && len(expression.AsArrayLiteralExpression().elements) == 0
}

func declarationBelongsToPrivateAmbientMember(declaration *Node) bool {
	root := getRootDeclaration(declaration)
	memberDeclaration := root
	if root.kind == SyntaxKindParameter {
		memberDeclaration = root.parent
	}
	return isPrivateWithinAmbient(memberDeclaration)
}

func isPrivateWithinAmbient(node *Node) bool {
	return (hasEffectiveModifier(node, ModifierFlagsPrivate) || isPrivateIdentifierClassElementDeclaration(node)) && node.flags&NodeFlagsAmbient != 0
}

func identifierToKeywordKind(node *Identifier) SyntaxKind {
	return textToKeyword[node.text]
}

func isAssertionExpression(node *Node) bool {
	kind := node.kind
	return kind == SyntaxKindTypeAssertionExpression || kind == SyntaxKindAsExpression
}

func createSymbolTable(symbols []*Symbol) SymbolTable {
	if len(symbols) == 0 {
		return nil
	}
	result := make(SymbolTable)
	for _, symbol := range symbols {
		result[symbol.name] = symbol
	}
	return result
}

func sortSymbols(symbols []*Symbol) {
	slices.SortFunc(symbols, compareSymbols)
}

func compareSymbols(s1, s2 *Symbol) int {
	if s1 == s2 {
		return 0
	}
	if s1.valueDeclaration != nil && s2.valueDeclaration != nil {
		if s1.parent != nil && s2.parent != nil {
			// Symbols with the same unmerged parent are always in the same file
			if s1.parent != s2.parent {
				f1 := getSourceFileOfNode(s1.valueDeclaration)
				f2 := getSourceFileOfNode(s2.valueDeclaration)
				if f1 != f2 {
					// In different files, first compare base filename
					r := strings.Compare(filepath.Base(f1.path), filepath.Base(f2.path))
					if r == 0 {
						// Same base filename, compare the full paths (no two files should have the same full path)
						r = strings.Compare(f1.path, f2.path)
					}
					return r
				}
			}
			// In the same file, compare source positions
			return s1.valueDeclaration.Pos() - s2.valueDeclaration.Pos()
		}
	}
	// Sort by name
	r := strings.Compare(s1.name, s2.name)
	if r == 0 {
		// Same name, sort by symbol id
		r = int(getSymbolId(s1)) - int(getSymbolId(s2))
	}
	return r
}

func getClassLikeDeclarationOfSymbol(symbol *Symbol) *Node {
	return utils.Find(symbol.declarations, isClassLike)
}

func isThisInTypeQuery(node *Node) bool {
	if !isThisIdentifier(node) {
		return false
	}
	for isQualifiedName(node.parent) && node.parent.AsQualifiedName().left == node {
		node = node.parent
	}
	return node.parent.kind == SyntaxKindTypeQuery
}

func isThisIdentifier(node *Node) bool {
	return node != nil && node.kind == SyntaxKindIdentifier && identifierIsThisKeyword(node)
}

func identifierIsThisKeyword(id *Node) bool {
	return id.AsIdentifier().text == "this"
}

func getDeclarationModifierFlagsFromSymbol(s *Symbol) ModifierFlags {
	return getDeclarationModifierFlagsFromSymbolEx(s, false /*isWrite*/)
}

func getDeclarationModifierFlagsFromSymbolEx(s *Symbol, isWrite bool) ModifierFlags {
	if s.valueDeclaration != nil {
		var declaration *Node
		if isWrite {
			declaration = utils.Find(s.declarations, isSetAccessorDeclaration)
		}
		if declaration == nil && s.flags&SymbolFlagsGetAccessor != 0 {
			declaration = utils.Find(s.declarations, isGetAccessorDeclaration)
		}
		if declaration == nil {
			declaration = s.valueDeclaration
		}
		flags := getCombinedModifierFlags(declaration)
		if s.parent != nil && s.parent.flags&SymbolFlagsClass != 0 {
			return flags
		}
		return flags & ^ModifierFlagsAccessibilityModifier
	}
	if s.checkFlags&CheckFlagsSynthetic != 0 {
		var accessModifier ModifierFlags
		switch {
		case s.checkFlags&CheckFlagsContainsPrivate != 0:
			accessModifier = ModifierFlagsPrivate
		case s.checkFlags&CheckFlagsContainsPublic != 0:
			accessModifier = ModifierFlagsPublic
		default:
			accessModifier = ModifierFlagsProtected
		}
		var staticModifier ModifierFlags
		if s.checkFlags&CheckFlagsContainsStatic != 0 {
			staticModifier = ModifierFlagsStatic
		}
		return accessModifier | staticModifier
	}
	if s.flags&SymbolFlagsPrototype != 0 {
		return ModifierFlagsPublic | ModifierFlagsStatic
	}
	return ModifierFlagsNone
}

func isExponentiationOperator(kind SyntaxKind) bool {
	return kind == SyntaxKindAsteriskAsteriskToken
}

func isMultiplicativeOperator(kind SyntaxKind) bool {
	return kind == SyntaxKindAsteriskToken || kind == SyntaxKindSlashToken || kind == SyntaxKindPercentToken
}

func isMultiplicativeOperatorOrHigher(kind SyntaxKind) bool {
	return isExponentiationOperator(kind) || isMultiplicativeOperator(kind)
}

func isAdditiveOperator(kind SyntaxKind) bool {
	return kind == SyntaxKindPlusToken || kind == SyntaxKindMinusToken
}

func isAdditiveOperatorOrHigher(kind SyntaxKind) bool {
	return isAdditiveOperator(kind) || isMultiplicativeOperatorOrHigher(kind)
}

func isShiftOperator(kind SyntaxKind) bool {
	return kind == SyntaxKindLessThanLessThanToken || kind == SyntaxKindGreaterThanGreaterThanToken ||
		kind == SyntaxKindGreaterThanGreaterThanGreaterThanToken
}

func isShiftOperatorOrHigher(kind SyntaxKind) bool {
	return isShiftOperator(kind) || isAdditiveOperatorOrHigher(kind)
}

func isRelationalOperator(kind SyntaxKind) bool {
	return kind == SyntaxKindLessThanToken || kind == SyntaxKindLessThanEqualsToken || kind == SyntaxKindGreaterThanToken ||
		kind == SyntaxKindGreaterThanEqualsToken || kind == SyntaxKindInstanceOfKeyword || kind == SyntaxKindInKeyword
}

func isRelationalOperatorOrHigher(kind SyntaxKind) bool {
	return isRelationalOperator(kind) || isShiftOperatorOrHigher(kind)
}

func isEqualityOperator(kind SyntaxKind) bool {
	return kind == SyntaxKindEqualsEqualsToken || kind == SyntaxKindEqualsEqualsEqualsToken ||
		kind == SyntaxKindExclamationEqualsToken || kind == SyntaxKindExclamationEqualsEqualsToken
}

func isEqualityOperatorOrHigher(kind SyntaxKind) bool {
	return isEqualityOperator(kind) || isRelationalOperatorOrHigher(kind)
}

func isBitwiseOperator(kind SyntaxKind) bool {
	return kind == SyntaxKindAmpersandToken || kind == SyntaxKindBarToken || kind == SyntaxKindCaretToken
}

func isBitwiseOperatorOrHigher(kind SyntaxKind) bool {
	return isBitwiseOperator(kind) || isEqualityOperatorOrHigher(kind)
}

// NOTE: The version in utilities includes ExclamationToken, which is not a binary operator.
func isLogicalOperator(kind SyntaxKind) bool {
	return kind == SyntaxKindAmpersandAmpersandToken || kind == SyntaxKindBarBarToken
}

func isLogicalOperatorOrHigher(kind SyntaxKind) bool {
	return isLogicalOperator(kind) || isBitwiseOperatorOrHigher(kind)
}

func isAssignmentOperatorOrHigher(kind SyntaxKind) bool {
	return kind == SyntaxKindQuestionQuestionToken || isLogicalOperatorOrHigher(kind) || isAssignmentOperator(kind)
}

func isBinaryOperator(kind SyntaxKind) bool {
	return isAssignmentOperatorOrHigher(kind) || kind == SyntaxKindCommaToken
}

func isObjectLiteralType(t *Type) bool {
	return t.objectFlags&ObjectFlagsObjectLiteral != 0
}

func isDeclarationReadonly(declaration *Node) bool {
	return getCombinedModifierFlags(declaration)&ModifierFlagsReadonly != 0 && !isParameterPropertyDeclaration(declaration, declaration.parent)
}

func getPostfixTokenFromNode(node *Node) *Node {
	switch node.kind {
	case SyntaxKindPropertyDeclaration:
		return node.AsPropertyDeclaration().postfixToken
	case SyntaxKindPropertySignature:
		return node.AsPropertySignatureDeclaration().postfixToken
	case SyntaxKindMethodDeclaration:
		return node.AsMethodDeclaration().postfixToken
	case SyntaxKindMethodSignature:
		return node.AsMethodSignatureDeclaration().postfixToken
	}
	panic("Unhandled case in getPostfixTokenFromNode")
}

func isStatic(node *Node) bool {
	// https://tc39.es/ecma262/#sec-static-semantics-isstatic
	return isClassElement(node) && hasStaticModifier(node) || isClassStaticBlockDeclaration(node)
}

func isLogicalExpression(node *Node) bool {
	for {
		if node.kind == SyntaxKindParenthesizedExpression {
			node = node.AsParenthesizedExpression().expression
		} else if node.kind == SyntaxKindPrefixUnaryExpression && node.AsPrefixUnaryExpression().operator == SyntaxKindExclamationToken {
			node = node.AsPrefixUnaryExpression().operand
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

type set[T comparable] struct {
	m map[T]struct{}
}

func (s *set[T]) has(key T) bool {
	_, ok := s.m[key]
	return ok
}

func (s *set[T]) add(key T) {
	if s.m == nil {
		s.m = make(map[T]struct{})
	}
	s.m[key] = struct{}{}
}

func (s *set[T]) delete(key T) {
	delete(s.m, key)
}

func (s *set[T]) len() int {
	return len(s.m)
}

func (s *set[T]) keys() map[T]struct{} {
	return s.m
}

func getContainingFunction(node *Node) *Node {
	return findAncestor(node.parent, isFunctionLike)
}

func isTypeReferenceType(node *Node) bool {
	return node.kind == SyntaxKindTypeReference || node.kind == SyntaxKindExpressionWithTypeArguments
}

func isNodeDescendantOf(node *Node, ancestor *Node) bool {
	for node != nil {
		if node == ancestor {
			return true
		}
		node = node.parent
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

func isPropertyName(node *Node) bool {
	switch node.kind {
	case SyntaxKindIdentifier, SyntaxKindPrivateIdentifier, SyntaxKindStringLiteral, SyntaxKindNumericLiteral, SyntaxKindComputedPropertyName:
		return true
	}
	return false
}

func getPropertyNameForPropertyNameNode(name *Node) string {
	switch name.kind {
	case SyntaxKindIdentifier, SyntaxKindPrivateIdentifier, SyntaxKindStringLiteral, SyntaxKindNoSubstitutionTemplateLiteral,
		SyntaxKindNumericLiteral, SyntaxKindBigIntLiteral, SyntaxKindJsxNamespacedName:
		return name.Text()
	case SyntaxKindComputedPropertyName:
		nameExpression := name.AsComputedPropertyName().expression
		if isStringOrNumericLiteralLike(nameExpression) {
			return nameExpression.Text()
		}
		if isSignedNumericLiteral(nameExpression) {
			text := nameExpression.AsPrefixUnaryExpression().operand.Text()
			if nameExpression.AsPrefixUnaryExpression().operator == SyntaxKindMinusToken {
				text = "-" + text
			}
			return text
		}
		return InternalSymbolNameMissing
	}
	panic("Unhandled case in getPropertyNameForPropertyNameNode")
}

func isThisProperty(node *Node) bool {
	return (isPropertyAccessExpression(node) || isElementAccessExpression(node)) && node.Expression().kind == SyntaxKindThisKeyword
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

func isValidESSymbolDeclaration(node *Node) bool {
	if isVariableDeclaration(node) {
		return isVarConst(node) && isIdentifier(node.AsVariableDeclaration().name) && isVariableDeclarationInVariableStatement(node)
	}
	if isPropertyDeclaration(node) {
		return hasEffectiveReadonlyModifier(node) && hasStaticModifier(node)
	}
	return isPropertySignatureDeclaration(node) && hasEffectiveReadonlyModifier(node)
}

func isVarConst(node *Node) bool {
	return getCombinedNodeFlags(node)&NodeFlagsBlockScoped == NodeFlagsConst
}

func isVariableDeclarationInVariableStatement(node *Node) bool {
	return isVariableDeclarationList(node.parent) && isVariableStatement(node.parent.parent)
}

func isKnownSymbol(symbol *Symbol) bool {
	return isLateBoundName(symbol.name)
}

func isLateBoundName(name string) bool {
	return len(name) >= 2 && name[0] == '\xfe' && name[1] == '@'
}

func getSymbolTable(data *SymbolTable) SymbolTable {
	if *data == nil {
		*data = make(SymbolTable)
	}
	return *data
}

func getMembers(symbol *Symbol) SymbolTable {
	return getSymbolTable(&symbol.members)
}

func getExports(symbol *Symbol) SymbolTable {
	return getSymbolTable(&symbol.exports)
}

func getLocals(container *Node) SymbolTable {
	return getSymbolTable(&container.LocalsContainerData().locals)
}

func getThisParameter(signature *Node) *Node {
	// callback tags do not currently support this parameters
	if len(signature.Parameters()) != 0 {
		thisParameter := signature.Parameters()[0]
		if parameterIsThisKeyword(thisParameter) {
			return thisParameter
		}
	}
	return nil
}

func parameterIsThisKeyword(parameter *Node) bool {
	return isThisIdentifier(parameter.Name())
}

func getInterfaceBaseTypeNodes(node *Node) []*Node {
	heritageClause := getHeritageClause(node.AsInterfaceDeclaration().heritageClauses, SyntaxKindExtendsKeyword)
	if heritageClause != nil {
		return heritageClause.AsHeritageClause().types
	}
	return nil
}

func getHeritageClause(clauses []*Node, kind SyntaxKind) *Node {
	for _, clause := range clauses {
		if clause.AsHeritageClause().token == kind {
			return clause
		}
	}
	return nil
}

func getClassExtendsHeritageElement(node *Node) *Node {
	heritageClause := getHeritageClause(node.ClassLikeData().heritageClauses, SyntaxKindExtendsKeyword)
	if heritageClause != nil && len(heritageClause.AsHeritageClause().types) > 0 {
		return heritageClause.AsHeritageClause().types[0]
	}
	return nil
}

func concatenateDiagnosticMessageChains(headChain *MessageChain, tailChain *MessageChain) {
	lastChain := headChain
	for len(lastChain.messageChain) != 0 {
		lastChain = lastChain.messageChain[0]
	}
	lastChain.messageChain = []*MessageChain{tailChain}
}

func isObjectOrArrayLiteralType(t *Type) bool {
	return t.objectFlags&(ObjectFlagsObjectLiteral|ObjectFlagsArrayLiteral) != 0
}

func getContainingClassExcludingClassDecorators(node *Node) *ClassLikeDeclaration {
	decorator := findAncestorOrQuit(node.parent, func(n *Node) FindAncestorResult {
		if isClassLike(n) {
			return FindAncestorQuit
		}
		if isDecorator(n) {
			return FindAncestorTrue
		}
		return FindAncestorFalse
	})
	if decorator != nil && isClassLike(decorator.parent) {
		return getContainingClass(decorator.parent)
	}
	if decorator != nil {
		return getContainingClass(decorator)
	}
	return getContainingClass(node)
}

func isThisTypeParameter(t *Type) bool {
	return t.flags&TypeFlagsTypeParameter != 0 && t.AsTypeParameter().isThisType
}

func isCallLikeExpression(node *Node) bool {
	switch node.kind {
	case SyntaxKindJsxOpeningElement, SyntaxKindJsxSelfClosingElement, SyntaxKindCallExpression, SyntaxKindNewExpression,
		SyntaxKindTaggedTemplateExpression, SyntaxKindDecorator:
		return true
	}
	return false
}

func isCallOrNewExpression(node *Node) bool {
	return isCallExpression(node) || isNewExpression(node)
}

func isClassInstanceProperty(node *Node) bool {
	return node.parent != nil && isClassLike(node.parent) && isPropertyDeclaration(node) && !hasAccessorModifier(node)
}

func isThisInitializedObjectBindingExpression(node *Node) bool {
	return node != nil && (isShorthandPropertyAssignment(node) || isPropertyAssignment(node)) && isBinaryExpression(node.parent.parent) &&
		node.parent.parent.AsBinaryExpression().operatorToken.kind == SyntaxKindEqualsToken &&
		node.parent.parent.AsBinaryExpression().right.kind == SyntaxKindThisKeyword
}

func isThisInitializedDeclaration(node *Node) bool {
	return node != nil && isVariableDeclaration(node) && node.AsVariableDeclaration().initializer != nil && node.AsVariableDeclaration().initializer.kind == SyntaxKindThisKeyword
}

func isWriteOnlyAccess(node *Node) bool {
	return accessKind(node) == AccessKindWrite
}

func isWriteAccess(node *Node) bool {
	return accessKind(node) != AccessKindRead
}

type AccessKind int32

const (
	AccessKindRead      AccessKind = iota // Only reads from a variable
	AccessKindWrite                       // Only writes to a variable without ever reading it. E.g.: `x=1;`.
	AccessKindReadWrite                   // Reads from and writes to a variable. E.g.: `f(x++);`, `x/=1`.
)

func accessKind(node *Node) AccessKind {
	parent := node.parent
	switch parent.kind {
	case SyntaxKindParenthesizedExpression:
		return accessKind(parent)
	case SyntaxKindPrefixUnaryExpression:
		operator := parent.AsPrefixUnaryExpression().operator
		if operator == SyntaxKindPlusPlusToken || operator == SyntaxKindMinusMinusToken {
			return AccessKindReadWrite
		}
		return AccessKindRead
	case SyntaxKindPostfixUnaryExpression:
		operator := parent.AsPostfixUnaryExpression().operator
		if operator == SyntaxKindPlusPlusToken || operator == SyntaxKindMinusMinusToken {
			return AccessKindReadWrite
		}
		return AccessKindRead
	case SyntaxKindBinaryExpression:
		if parent.AsBinaryExpression().left == node {
			operator := parent.AsBinaryExpression().operatorToken
			if isAssignmentOperator(operator.kind) {
				if operator.kind == SyntaxKindEqualsToken {
					return AccessKindWrite
				}
				return AccessKindReadWrite
			}
		}
		return AccessKindRead
	case SyntaxKindPropertyAccessExpression:
		if parent.AsPropertyAccessExpression().name != node {
			return AccessKindRead
		}
		return accessKind(parent)
	case SyntaxKindPropertyAssignment:
		parentAccess := accessKind(parent.parent)
		// In `({ x: varname }) = { x: 1 }`, the left `x` is a read, the right `x` is a write.
		if node == parent.AsPropertyAssignment().name {
			return reverseAccessKind(parentAccess)
		}
		return parentAccess
	case SyntaxKindShorthandPropertyAssignment:
		// Assume it's the local variable being accessed, since we don't check public properties for --noUnusedLocals.
		if node == parent.AsShorthandPropertyAssignment().objectAssignmentInitializer {
			return AccessKindRead
		}
		return accessKind(parent.parent)
	case SyntaxKindArrayLiteralExpression:
		return accessKind(parent)
	case SyntaxKindForInStatement, SyntaxKindForOfStatement:
		if node == parent.AsForInOrOfStatement().initializer {
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
