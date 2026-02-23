package printer

import (
	"fmt"
	"slices"
	"strconv"
	"strings"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/sourcemap"
	"github.com/microsoft/typescript-go/internal/stringutil"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type getLiteralTextFlags int

const (
	getLiteralTextFlagsNone                          getLiteralTextFlags = 0
	getLiteralTextFlagsNeverAsciiEscape              getLiteralTextFlags = 1 << 0
	getLiteralTextFlagsJsxAttributeEscape            getLiteralTextFlags = 1 << 1
	getLiteralTextFlagsTerminateUnterminatedLiterals getLiteralTextFlags = 1 << 2
	getLiteralTextFlagsAllowNumericSeparator         getLiteralTextFlags = 1 << 3
)

type QuoteChar rune

const (
	QuoteCharSingleQuote QuoteChar = '\''
	QuoteCharDoubleQuote QuoteChar = '"'
	QuoteCharBacktick    QuoteChar = '`'
)

var jsxEscapedCharsMap = map[rune]string{
	'"':  "&quot;",
	'\'': "&apos;",
}

var escapedCharsMap = map[rune]string{
	'\t':     `\t`,
	'\v':     `\v`,
	'\f':     `\f`,
	'\b':     `\b`,
	'\r':     `\r`,
	'\n':     `\n`,
	'\\':     `\\`,
	'"':      `\"`,
	'\'':     `\'`,
	'`':      "\\`",
	'$':      `\$`,     // when quoteChar == '`'
	'\u2028': `\u2028`, // lineSeparator
	'\u2029': `\u2029`, // paragraphSeparator
	'\u0085': `\u0085`, // nextLine
}

func encodeJsxCharacterEntity(b *strings.Builder, charCode rune) {
	hexCharCode := strings.ToUpper(strconv.FormatUint(uint64(charCode), 16))
	b.WriteString("&#x")
	b.WriteString(hexCharCode)
	b.WriteByte(';')
}

func encodeUtf16EscapeSequence(b *strings.Builder, charCode rune) {
	hexCharCode := strings.ToUpper(strconv.FormatUint(uint64(charCode), 16))
	b.WriteString(`\u`)
	for i := len(hexCharCode); i < 4; i++ {
		b.WriteByte('0')
	}
	b.WriteString(hexCharCode)
}

// Based heavily on the abstract 'Quote'/'QuoteJSONString' operation from ECMA-262 (24.3.2.2),
// but augmented for a few select characters (e.g. lineSeparator, paragraphSeparator, nextLine)
// Note that this doesn't actually wrap the input in double quotes.
func escapeStringWorker(s string, quoteChar QuoteChar, flags getLiteralTextFlags, b *strings.Builder) {
	pos := 0
	i := 0
	for i < len(s) {
		ch, size := utf8.DecodeRuneInString(s[i:])

		escape := false

		// This consists of the first 19 unprintable ASCII characters, canonical escapes, lineSeparator,
		// paragraphSeparator, and nextLine. The latter three are just desirable to suppress new lines in
		// the language service. These characters should be escaped when printing, and if any characters are added,
		// `escapedCharsMap` and/or `jsxEscapedCharsMap` must be updated. Note that this *does not* include the 'delete'
		// character. There is no reason for this other than that JSON.stringify does not handle it either.
		switch ch {
		case '\\':
			if flags&getLiteralTextFlagsJsxAttributeEscape == 0 {
				escape = true
			}
		case '$':
			if quoteChar == QuoteCharBacktick && i+1 < len(s) && s[i+1] == '{' {
				escape = true
			}
		case rune(quoteChar), '\u2028', '\u2029', '\u0085', '\r':
			escape = true
		case '\n':
			if quoteChar != QuoteCharBacktick {
				// Template strings preserve simple LF newlines, still encode CRLF (or CR).
				escape = true
			}
		default:
			if ch <= '\u001f' || flags&getLiteralTextFlagsNeverAsciiEscape == 0 && ch > '\u007f' {
				escape = true
			}
		}

		if escape {
			if pos < i {
				// Write string up to this point
				b.WriteString(s[pos:i])
			}

			switch {
			case flags&getLiteralTextFlagsJsxAttributeEscape != 0:
				if ch == 0 {
					b.WriteString("&#0;")
				} else if match, ok := jsxEscapedCharsMap[ch]; ok {
					b.WriteString(match)
				} else {
					encodeJsxCharacterEntity(b, ch)
				}

			default:
				if ch == '\r' && quoteChar == QuoteCharBacktick && i+1 < len(s) && s[i+1] == '\n' {
					// Template strings preserve simple LF newlines, but still must escape CRLF. Left alone, the
					// above cases for `\r` and `\n` would inadvertently escape CRLF as two independent characters.
					size++
					b.WriteString(`\r\n`)
				} else if ch > 0xffff {
					// encode as surrogate pair
					ch -= 0x10000
					encodeUtf16EscapeSequence(b, (ch&0b11111111110000000000>>10)+0xD800)
					encodeUtf16EscapeSequence(b, (ch&0b00000000001111111111)+0xDC00)
				} else if ch == 0 {
					if i+1 < len(s) && stringutil.IsDigit(rune(s[i+1])) {
						// If the null character is followed by digits, print as a hex escape to prevent the result from
						// parsing as an octal (which is forbidden in strict mode)
						b.WriteString(`\x00`)
					} else {
						// Otherwise, keep printing a literal \0 for the null character
						b.WriteString(`\0`)
					}
				} else {
					if match, ok := escapedCharsMap[ch]; ok {
						b.WriteString(match)
					} else {
						encodeUtf16EscapeSequence(b, ch)
					}
				}
			}
			pos = i + size
		}

		i += size
	}

	if pos < i {
		b.WriteString(s[pos:])
	}
}

func EscapeString(s string, quoteChar QuoteChar) string {
	var b strings.Builder
	b.Grow(len(s) + 2)
	escapeStringWorker(s, quoteChar, getLiteralTextFlagsNeverAsciiEscape, &b)
	return b.String()
}

func escapeNonAsciiString(s string, quoteChar QuoteChar) string {
	var b strings.Builder
	b.Grow(len(s) + 2)
	escapeStringWorker(s, quoteChar, getLiteralTextFlagsNone, &b)
	return b.String()
}

func escapeJsxAttributeString(s string, quoteChar QuoteChar) string {
	var b strings.Builder
	b.Grow(len(s) + 2)
	escapeStringWorker(s, quoteChar, getLiteralTextFlagsJsxAttributeEscape|getLiteralTextFlagsNeverAsciiEscape, &b)
	return b.String()
}

func canUseOriginalText(node *ast.LiteralLikeNode, flags getLiteralTextFlags) bool {
	// A synthetic node has no original text, nor does a node without a parent as we would be unable to find the
	// containing SourceFile. We also cannot use the original text if the literal was unterminated and the caller has
	// requested proper termination of unterminated literals
	if ast.NodeIsSynthesized(node) || node.Parent == nil || flags&getLiteralTextFlagsTerminateUnterminatedLiterals != 0 && ast.IsUnterminatedLiteral(node) {
		return false
	}

	if node.Kind == ast.KindNumericLiteral {
		tokenFlags := node.AsNumericLiteral().TokenFlags
		// For a numeric literal, we cannot use the original text if the original text was an invalid literal
		if tokenFlags&ast.TokenFlagsIsInvalid != 0 {
			return false
		}
		// We also cannot use the original text if the literal contains numeric separators, but numeric separators
		// are not permitted
		if tokenFlags&ast.TokenFlagsContainsSeparator != 0 {
			return flags&getLiteralTextFlagsAllowNumericSeparator != 0
		}
	}

	// Finally, we do not use the original text of a BigInt literal
	// TODO(rbuckton): The reason as to why we do not use the original text for bigints is not mentioned in the
	// original compiler source. It could be that this is no longer necessary, in which case bigint literals should
	// use the same code path as numeric literals, above
	return node.Kind != ast.KindBigIntLiteral
}

func getLiteralText(node *ast.LiteralLikeNode, sourceFile *ast.SourceFile, flags getLiteralTextFlags) string {
	// If we don't need to downlevel and we can reach the original source text using
	// the node's parent reference, then simply get the text as it was originally written.
	if sourceFile != nil && canUseOriginalText(node, flags) {
		return scanner.GetSourceTextOfNodeFromSourceFile(sourceFile, node, false /*includeTrivia*/)
	}

	// If we can't reach the original source text, use the canonical form if it's a number,
	// or a (possibly escaped) quoted form of the original text if it's string-like.
	switch node.Kind {
	case ast.KindStringLiteral:
		var b strings.Builder
		var quoteChar QuoteChar
		if node.AsStringLiteral().TokenFlags&ast.TokenFlagsSingleQuote != 0 {
			quoteChar = QuoteCharSingleQuote
		} else {
			quoteChar = QuoteCharDoubleQuote
		}

		text := node.Text()

		// Write leading quote character
		b.Grow(len(text) + 2)
		b.WriteRune(rune(quoteChar))

		// Write text
		escapeStringWorker(text, quoteChar, flags, &b)

		// Write trailing quote character
		b.WriteRune(rune(quoteChar))
		return b.String()

	case ast.KindNoSubstitutionTemplateLiteral,
		ast.KindTemplateHead,
		ast.KindTemplateMiddle,
		ast.KindTemplateTail:

		// If a NoSubstitutionTemplateLiteral appears to have a substitution in it, the original text
		// had to include a backslash: `not \${a} substitution`.
		var b strings.Builder
		text := node.Text()
		rawText := node.TemplateLiteralLikeData().RawText
		raw := len(rawText) > 0 || len(text) == 0

		var textLen int
		if raw {
			textLen = len(rawText)
		} else {
			textLen = len(text)
		}

		// Write leading quote character
		switch node.Kind {
		case ast.KindNoSubstitutionTemplateLiteral:
			b.Grow(2 + textLen)
			b.WriteRune('`')
		case ast.KindTemplateHead:
			b.Grow(3 + textLen)
			b.WriteRune('`')
		case ast.KindTemplateMiddle:
			b.Grow(3 + textLen)
			b.WriteRune('}')
		case ast.KindTemplateTail:
			b.Grow(2 + textLen)
			b.WriteRune('}')
		}

		// Write text
		switch {
		case len(rawText) > 0 || len(text) == 0:
			// If rawText is set, it is expected to be valid.
			b.WriteString(rawText)
		default:
			escapeStringWorker(text, QuoteCharBacktick, flags, &b)
		}

		// Write trailing quote character
		switch node.Kind {
		case ast.KindNoSubstitutionTemplateLiteral:
			b.WriteRune('`')
		case ast.KindTemplateHead:
			b.WriteString("${")
		case ast.KindTemplateMiddle:
			b.WriteString("${")
		case ast.KindTemplateTail:
			b.WriteRune('`')
		}
		return b.String()

	case ast.KindNumericLiteral, ast.KindBigIntLiteral:
		return node.Text()

	case ast.KindRegularExpressionLiteral:
		if flags&getLiteralTextFlagsTerminateUnterminatedLiterals != 0 && ast.IsUnterminatedLiteral(node) {
			var b strings.Builder
			text := node.Text()
			if len(text) > 0 && text[len(text)-1] == '\\' {
				b.Grow(2 + len(text))
				b.WriteString(text)
				b.WriteString(" /")
			} else {
				b.Grow(1 + len(text))
				b.WriteString(text)
				b.WriteString("/")
			}
			return b.String()
		}
		return node.Text()

	default:
		panic("Unsupported LiteralLikeNode")
	}
}

func isNotPrologueDirective(node *ast.Node) bool {
	return !ast.IsPrologueDirective(node)
}

func RangeIsOnSingleLine(r core.TextRange, sourceFile *ast.SourceFile) bool {
	return rangeStartIsOnSameLineAsRangeEnd(r, r, sourceFile)
}

func rangeStartPositionsAreOnSameLine(range1 core.TextRange, range2 core.TextRange, sourceFile *ast.SourceFile) bool {
	return PositionsAreOnSameLine(
		getStartPositionOfRange(range1, sourceFile, false /*includeComments*/),
		getStartPositionOfRange(range2, sourceFile, false /*includeComments*/),
		sourceFile,
	)
}

func rangeEndPositionsAreOnSameLine(range1 core.TextRange, range2 core.TextRange, sourceFile *ast.SourceFile) bool {
	return PositionsAreOnSameLine(range1.End(), range2.End(), sourceFile)
}

func rangeStartIsOnSameLineAsRangeEnd(range1 core.TextRange, range2 core.TextRange, sourceFile *ast.SourceFile) bool {
	return PositionsAreOnSameLine(getStartPositionOfRange(range1, sourceFile, false /*includeComments*/), range2.End(), sourceFile)
}

func rangeEndIsOnSameLineAsRangeStart(range1 core.TextRange, range2 core.TextRange, sourceFile *ast.SourceFile) bool {
	return PositionsAreOnSameLine(range1.End(), getStartPositionOfRange(range2, sourceFile, false /*includeComments*/), sourceFile)
}

func getStartPositionOfRange(r core.TextRange, sourceFile *ast.SourceFile, includeComments bool) int {
	if ast.PositionIsSynthesized(r.Pos()) {
		return -1
	}
	return scanner.SkipTriviaEx(sourceFile.Text(), r.Pos(), &scanner.SkipTriviaOptions{StopAtComments: includeComments})
}

func PositionsAreOnSameLine(pos1 int, pos2 int, sourceFile *ast.SourceFile) bool {
	return GetLinesBetweenPositions(sourceFile, pos1, pos2) == 0
}

func GetLinesBetweenPositions(sourceFile *ast.SourceFile, pos1 int, pos2 int) int {
	if pos1 == pos2 {
		return 0
	}
	lineStarts := scanner.GetECMALineStarts(sourceFile)
	lower := core.IfElse(pos1 < pos2, pos1, pos2)
	isNegative := lower == pos2
	upper := core.IfElse(isNegative, pos1, pos2)
	lowerLine := scanner.ComputeLineOfPosition(lineStarts, lower)
	upperLine := lowerLine + scanner.ComputeLineOfPosition(lineStarts[lowerLine:], upper)
	if isNegative {
		return lowerLine - upperLine
	} else {
		return upperLine - lowerLine
	}
}

func getLinesBetweenRangeEndAndRangeStart(range1 core.TextRange, range2 core.TextRange, sourceFile *ast.SourceFile, includeSecondRangeComments bool) int {
	range2Start := getStartPositionOfRange(range2, sourceFile, includeSecondRangeComments)
	return GetLinesBetweenPositions(sourceFile, range1.End(), range2Start)
}

func getLinesBetweenPositionAndPrecedingNonWhitespaceCharacter(pos int, stopPos int, sourceFile *ast.SourceFile, includeComments bool) int {
	startPos := scanner.SkipTriviaEx(sourceFile.Text(), pos, &scanner.SkipTriviaOptions{StopAtComments: includeComments})
	prevPos := getPreviousNonWhitespacePosition(startPos, stopPos, sourceFile)
	return GetLinesBetweenPositions(sourceFile, core.IfElse(prevPos >= 0, prevPos, stopPos), startPos)
}

func getLinesBetweenPositionAndNextNonWhitespaceCharacter(pos int, stopPos int, sourceFile *ast.SourceFile, includeComments bool) int {
	nextPos := scanner.SkipTriviaEx(sourceFile.Text(), pos, &scanner.SkipTriviaOptions{StopAtComments: includeComments})
	return GetLinesBetweenPositions(sourceFile, pos, core.IfElse(stopPos < nextPos, stopPos, nextPos))
}

func getPreviousNonWhitespacePosition(pos int, stopPos int, sourceFile *ast.SourceFile) int {
	for ; pos >= stopPos; pos-- {
		if !stringutil.IsWhiteSpaceLike(rune(sourceFile.Text()[pos])) {
			return pos
		}
	}
	return -1
}

func getCommentRange(node *ast.Node) core.TextRange {
	// TODO(rbuckton)
	return node.Loc
}

func siblingNodePositionsAreComparable(previousNode *ast.Node, nextNode *ast.Node) bool {
	if nextNode.Pos() < previousNode.End() {
		return false
	}

	// TODO(rbuckton)
	// previousNode = getOriginalNode(previousNode);
	// nextNode = getOriginalNode(nextNode);
	parent := previousNode.Parent
	if parent == nil || parent != nextNode.Parent {
		return false
	}

	parentNodeArray := getContainingNodeArray(previousNode)
	if parentNodeArray != nil {
		prevNodeIndex := slices.Index(parentNodeArray.Nodes, previousNode)
		return prevNodeIndex >= 0 && slices.Index(parentNodeArray.Nodes, nextNode) == prevNodeIndex+1
	}

	return false
}

func getContainingNodeArray(node *ast.Node) *ast.NodeList {
	parent := node.Parent
	if parent == nil {
		return nil
	}

	switch node.Kind {
	case ast.KindTypeParameter:
		switch {
		case ast.IsFunctionLike(parent) || ast.IsClassLike(parent) || ast.IsInterfaceDeclaration(parent) || ast.IsTypeOrJSTypeAliasDeclaration(parent):
			return parent.TypeParameterList()
		case ast.IsInferTypeNode(parent):
			break
		default:
			panic(fmt.Sprintf("Unexpected TypeParameter parent: %#v", parent.Kind))
		}

	case ast.KindParameter:
		return node.Parent.FunctionLikeData().Parameters
	case ast.KindTemplateLiteralTypeSpan:
		return node.Parent.AsTemplateLiteralTypeNode().TemplateSpans
	case ast.KindTemplateSpan:
		return node.Parent.AsTemplateExpression().TemplateSpans
	case ast.KindDecorator:
		if canHaveDecorators(node.Parent) {
			if modifiers := node.Parent.Modifiers(); modifiers != nil {
				return &modifiers.NodeList
			}
		}
		return nil
	case ast.KindHeritageClause:
		if ast.IsClassLike(node.Parent) {
			return node.Parent.ClassLikeData().HeritageClauses
		} else {
			return node.Parent.AsInterfaceDeclaration().HeritageClauses
		}
	}

	// TODO(rbuckton)
	// if ast.IsJSDocTag(node) {
	//     if ast.IsJSDocTypeLiteral(node.parent) {
	// 		return nil
	// 	 }
	// 	 return node.parent.tags
	// }

	switch parent.Kind {
	case ast.KindTypeLiteral, ast.KindInterfaceDeclaration:
		if ast.IsTypeElement(node) {
			return parent.MemberList()
		}
	case ast.KindUnionType:
		return parent.AsUnionTypeNode().Types
	case ast.KindIntersectionType:
		return parent.AsIntersectionTypeNode().Types
	case ast.KindArrayLiteralExpression, ast.KindTupleType, ast.KindNamedImports, ast.KindNamedExports:
		return parent.ElementList()
	case ast.KindCommaListExpression:
		panic("not implemented")
	case ast.KindObjectLiteralExpression, ast.KindJsxAttributes:
		return parent.PropertyList()
	case ast.KindCallExpression:
		p := parent.AsCallExpression()
		switch {
		case ast.IsTypeNode(node):
			return p.TypeArguments
		case node != p.Expression:
			return p.Arguments
		}
	case ast.KindNewExpression:
		p := parent.AsNewExpression()
		switch {
		case ast.IsTypeNode(node):
			return p.TypeArguments
		case node != p.Expression:
			return p.Arguments
		}
	case ast.KindJsxElement, ast.KindJsxFragment:
		if ast.IsJsxChild(node) {
			return parent.Children()
		}
	case ast.KindJsxOpeningElement, ast.KindJsxSelfClosingElement:
		if ast.IsTypeNode(node) {
			return parent.TypeArgumentList()
		}
	case ast.KindBlock, ast.KindModuleBlock, ast.KindCaseClause, ast.KindDefaultClause:
		return parent.StatementList()
	case ast.KindCaseBlock:
		return parent.AsCaseBlock().Clauses
	case ast.KindClassDeclaration, ast.KindClassExpression:
		if ast.IsClassElement(node) {
			return parent.MemberList()
		}
	case ast.KindEnumDeclaration:
		if ast.IsEnumMember(node) {
			return parent.MemberList()
		}
	case ast.KindSourceFile:
		if ast.IsStatement(node) {
			return parent.StatementList()
		}
	}

	if ast.IsModifier(node) {
		if modifiers := parent.Modifiers(); modifiers != nil {
			return &modifiers.NodeList
		}
	}

	return nil
}

func canHaveDecorators(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindParameter,
		ast.KindPropertyDeclaration,
		ast.KindMethodDeclaration,
		ast.KindGetAccessor,
		ast.KindSetAccessor,
		ast.KindClassExpression,
		ast.KindClassDeclaration:
		return true
	}
	return false
}

func originalNodesHaveSameParent(nodeA *ast.Node, nodeB *ast.Node) bool {
	// TODO(rbuckton): nodeA = getOriginalNode(nodeA)
	if nodeA.Parent != nil {
		// For performance, do not call `getOriginalNode` for `nodeB` if `nodeA` doesn't even
		// have a parent node.
		// TODO(rbuckton): nodeB = getOriginalNode(nodeB)
		return nodeA.Parent == nodeB.Parent
	}
	return false
}

func tryGetEnd(node interface{ End() int }) (int, bool) {
	// avoid using reflect (via core.IsNil) for common cases
	switch v := node.(type) {
	case (*ast.Node):
		if v != nil {
			return v.End(), true
		}
	case (*ast.NodeList):
		if v != nil {
			return v.End(), true
		}
	case (*ast.ModifierList):
		if v != nil {
			return v.End(), true
		}
	case (*core.TextRange):
		if v != nil {
			return v.End(), true
		}
	case (core.TextRange):
		return v.End(), true
	default:
		panic(fmt.Sprintf("unhandled type: %T", node))
	}
	return 0, false
}

func greatestEnd(end int, nodes ...interface{ End() int }) int {
	for i := len(nodes) - 1; i >= 0; i-- {
		node := nodes[i]
		if nodeEnd, ok := tryGetEnd(node); ok && end < nodeEnd {
			end = nodeEnd
		}
	}
	return end
}

func skipSynthesizedParentheses(node *ast.Node) *ast.Node {
	for node.Kind == ast.KindParenthesizedExpression && ast.NodeIsSynthesized(node) {
		node = node.Expression()
	}
	return node
}

func isNewExpressionWithoutArguments(node *ast.Node) bool {
	return node.Kind == ast.KindNewExpression && node.ArgumentList() == nil
}

func isBinaryOperation(node *ast.Node, token ast.Kind) bool {
	node = ast.SkipPartiallyEmittedExpressions(node)
	return node.Kind == ast.KindBinaryExpression &&
		node.AsBinaryExpression().OperatorToken.Kind == token
}

func mixingBinaryOperatorsRequiresParentheses(a ast.Kind, b ast.Kind) bool {
	if a == ast.KindQuestionQuestionToken {
		return b == ast.KindAmpersandAmpersandToken || b == ast.KindBarBarToken
	}
	if b == ast.KindQuestionQuestionToken {
		return a == ast.KindAmpersandAmpersandToken || a == ast.KindBarBarToken
	}
	return false
}

func isImmediatelyInvokedFunctionExpressionOrArrowFunction(node *ast.Expression) bool {
	node = ast.SkipPartiallyEmittedExpressions(node)
	if !ast.IsCallExpression(node) {
		return false
	}
	node = ast.SkipPartiallyEmittedExpressions(node.Expression())
	return ast.IsFunctionExpression(node) || ast.IsArrowFunction(node)
}

func IsFileLevelUniqueName(sourceFile *ast.SourceFile, name string, hasGlobalName func(string) bool) bool {
	if hasGlobalName != nil && hasGlobalName(name) {
		return false
	}
	_, ok := sourceFile.Identifiers[name]
	return !ok
}

func hasLeadingHash(text string) bool {
	return len(text) > 0 && text[0] == '#'
}

func removeLeadingHash(text string) string {
	if hasLeadingHash(text) {
		return text[1:]
	} else {
		return text
	}
}

func ensureLeadingHash(text string) string {
	if hasLeadingHash(text) {
		return text
	} else {
		return "#" + text
	}
}

func FormatGeneratedName(privateName bool, prefix string, base string, suffix string) string {
	name := removeLeadingHash(prefix) + removeLeadingHash(base) + removeLeadingHash(suffix)
	if privateName {
		return ensureLeadingHash(name)
	}
	return name
}

func isASCIIWordCharacter(ch rune) bool {
	return stringutil.IsASCIILetter(ch) || stringutil.IsDigit(ch) || ch == '_'
}

func makeIdentifierFromModuleName(moduleName string) string {
	moduleName = tspath.GetBaseFileName(moduleName)
	var builder strings.Builder
	start := 0
	pos := 0
	for pos < len(moduleName) {
		ch := rune(moduleName[pos])
		if pos == 0 && stringutil.IsDigit(ch) {
			builder.WriteByte('_')
		} else if !isASCIIWordCharacter(ch) {
			if start < pos {
				builder.WriteString(moduleName[start:pos])
			}
			builder.WriteByte('_')
			start = pos + 1
		}
		pos++
	}
	if start < pos {
		builder.WriteString(moduleName[start:pos])
	}
	return builder.String()
}

func findSpanEndWithEmitContext[T any](c *EmitContext, array []T, test func(c *EmitContext, value T) bool, start int) int {
	i := start
	for i < len(array) && test(c, array[i]) {
		i++
	}
	return i
}

func findSpanEnd[T any](array []T, test func(value T) bool, start int) int {
	i := start
	for i < len(array) && test(array[i]) {
		i++
	}
	return i
}

func skipWhiteSpaceSingleLine(text string, pos *int) {
	for *pos < len(text) {
		ch, size := utf8.DecodeRuneInString(text[*pos:])
		if !stringutil.IsWhiteSpaceSingleLine(ch) {
			break
		}
		*pos += size
	}
}

func matchWhiteSpaceSingleLine(text string, pos *int) bool {
	startPos := *pos
	skipWhiteSpaceSingleLine(text, pos)
	return *pos != startPos
}

func matchRune(text string, pos *int, expected rune) bool {
	ch, size := utf8.DecodeRuneInString(text[*pos:])
	if ch == expected {
		*pos += size
		return true
	}
	return false
}

func matchString(text string, pos *int, expected string) bool {
	textPos := *pos
	expectedPos := 0
	for expectedPos < len(expected) {
		if textPos >= len(text) {
			return false
		}

		expectedRune, expectedSize := utf8.DecodeRuneInString(expected[expectedPos:])
		if !matchRune(text, &textPos, expectedRune) {
			return false
		}

		expectedPos += expectedSize
	}

	*pos = textPos
	return true
}

func matchQuotedString(text string, pos *int) bool {
	textPos := *pos
	var quoteChar rune
	switch {
	case matchRune(text, &textPos, '\''):
		quoteChar = '\''
	case matchRune(text, &textPos, '"'):
		quoteChar = '"'
	default:
		return false
	}
	for textPos < len(text) {
		ch, size := utf8.DecodeRuneInString(text[textPos:])
		textPos += size
		if ch == quoteChar {
			*pos = textPos
			return true
		}
	}
	return false
}

// /// <reference path="..." />
// /// <reference types="..." />
// /// <reference lib="..." />
// /// <reference no-default-lib="..." />
// /// <amd-dependency path="..." />
// /// <amd-module />
func IsRecognizedTripleSlashComment(text string, commentRange ast.CommentRange) bool {
	if commentRange.Kind == ast.KindSingleLineCommentTrivia &&
		commentRange.Len() > 2 &&
		text[commentRange.Pos()+1] == '/' &&
		text[commentRange.Pos()+2] == '/' {
		text = text[commentRange.Pos()+3 : commentRange.End()]
		pos := 0
		skipWhiteSpaceSingleLine(text, &pos)
		if !matchRune(text, &pos, '<') {
			return false
		}
		switch {
		case matchString(text, &pos, "reference"):
			if !matchWhiteSpaceSingleLine(text, &pos) {
				return false
			}
			if !matchString(text, &pos, "path") &&
				!matchString(text, &pos, "types") &&
				!matchString(text, &pos, "lib") &&
				!matchString(text, &pos, "no-default-lib") {
				return false
			}
			skipWhiteSpaceSingleLine(text, &pos)
			if !matchRune(text, &pos, '=') {
				return false
			}
			skipWhiteSpaceSingleLine(text, &pos)
			if !matchQuotedString(text, &pos) {
				return false
			}
		case matchString(text, &pos, "amd-dependency"):
			if !matchWhiteSpaceSingleLine(text, &pos) {
				return false
			}
			if !matchString(text, &pos, "path") {
				return false
			}
			skipWhiteSpaceSingleLine(text, &pos)
			if !matchRune(text, &pos, '=') {
				return false
			}
			skipWhiteSpaceSingleLine(text, &pos)
			if !matchQuotedString(text, &pos) {
				return false
			}
		case matchString(text, &pos, "amd-module"):
			skipWhiteSpaceSingleLine(text, &pos)
		default:
			return false
		}
		index := strings.Index(text[pos:], "/>")
		return index != -1
	}

	return false
}

func isJSDocLikeText(text string, comment ast.CommentRange) bool {
	return comment.Kind == ast.KindMultiLineCommentTrivia &&
		comment.Len() > 5 &&
		text[comment.Pos()+2] == '*' &&
		text[comment.Pos()+3] != '/'
}

func IsPinnedComment(text string, comment ast.CommentRange) bool {
	return comment.Kind == ast.KindMultiLineCommentTrivia &&
		comment.Len() > 5 &&
		text[comment.Pos()+2] == '!'
}

func calculateIndent(text string, pos int, end int) int {
	currentLineIndent := 0
	indentSize := GetDefaultIndentSize()
	for pos < end {
		ch, size := utf8.DecodeRuneInString(text[pos:])
		if !stringutil.IsWhiteSpaceSingleLine(ch) {
			break
		}
		if ch == '\t' {
			// Tabs = TabSize = indent size and go to next tabStop
			currentLineIndent += indentSize - (currentLineIndent % indentSize)
		} else {
			// Single space
			currentLineIndent++
		}
		pos += size
	}

	return currentLineIndent
}

// lineCharacterCache provides cached line/character lookups for a source file,
// optimized for monotonically increasing positions (e.g., during source map emit).
//
// When positions increase within the same line, only the delta between the last
// position and the new position needs to be scanned for rune counts, turning
// what would be O(n²) into O(n) for long lines.
type lineCharacterCache struct {
	lineMap    []core.TextPos
	text       string
	cachedLine int
	cachedPos  int
	cachedChar int
	hasCached  bool
}

func newLineCharacterCache(source sourcemap.Source) *lineCharacterCache {
	return &lineCharacterCache{
		lineMap: source.ECMALineMap(),
		text:    source.Text(),
	}
}

func (c *lineCharacterCache) getLineAndCharacter(pos int) (line int, character int) {
	line = scanner.ComputeLineOfPosition(c.lineMap, pos)
	if c.hasCached && line == c.cachedLine && pos >= c.cachedPos {
		// Incremental: only count runes from the last cached position.
		character = c.cachedChar + utf8.RuneCountInString(c.text[c.cachedPos:pos])
	} else {
		// Full computation from line start.
		// !!! TODO: this is suspect; these are rune counts, not UTF-8 _or_ UTF-16 offsets.
		character = utf8.RuneCountInString(c.text[c.lineMap[line]:pos])
	}
	c.cachedLine = line
	c.cachedPos = pos
	c.cachedChar = character
	c.hasCached = true
	return line, character
}
