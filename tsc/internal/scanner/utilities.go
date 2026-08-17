package scanner

import (
	"strings"
	"unicode"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/stringutil"
)

func tokenIsIdentifierOrKeyword(token ast.Kind) bool {
	return token >= ast.KindIdentifier
}

func IdentifierToKeywordKind(node *ast.Identifier) ast.Kind {
	return textToKeyword[node.Text]
}

func GetSourceTextOfNodeFromSourceFile(sourceFile *ast.SourceFile, node *ast.Node, includeTrivia bool) string {
	return GetTextOfNodeFromSourceText(sourceFile.Text(), node, includeTrivia)
}

func isJSDocTypeExpressionOrChild(node *ast.Node) bool {
	if ast.IsJSDocTypeExpression(node) {
		return true
	}
	if node.Flags&(ast.NodeFlagsJSDoc|ast.NodeFlagsReparsed) == 0 {
		return false
	}
	for current := node; current != nil; current = current.Parent {
		if ast.IsTypeNode(current) {
			return true
		}
	}
	return false
}

func normalizeJSDocTypeSourceText(text string) string {
	lineStarts := core.ComputeECMALineStarts(text)
	if len(lineStarts) == 1 {
		return stripLeadingJSDocComment(text)
	}

	var result strings.Builder
	result.Grow(len(text))
	newLine := core.NewLineKindLF.GetNewLineCharacter()
	for i, lineStart := range lineStarts {
		if i > 0 {
			result.WriteString(newLine)
		}
		lineEnd := len(text)
		if i+1 < len(lineStarts) {
			lineEnd = int(lineStarts[i+1])
		}
		line := strings.TrimRightFunc(text[lineStart:lineEnd], stringutil.IsLineBreak)
		result.WriteString(stripLeadingJSDocComment(line))
	}
	return result.String()
}

func stripLeadingJSDocComment(line string) string {
	line = strings.TrimLeftFunc(line, stringutil.IsWhiteSpaceLike)
	if len(line) > 0 && line[0] == '*' {
		line = line[1:]
	}
	return strings.TrimLeftFunc(line, stringutil.IsWhiteSpaceLike)
}

func GetTextOfNodeFromSourceText(sourceText string, node *ast.Node, includeTrivia bool) string {
	if ast.NodeIsMissing(node) {
		return ""
	}
	pos := node.Pos()
	if !includeTrivia {
		pos = SkipTrivia(sourceText, pos)
	}
	text := sourceText[pos:node.End()]
	if isJSDocTypeExpressionOrChild(node) {
		text = normalizeJSDocTypeSourceText(text)
	}
	if node.Flags&ast.NodeFlagsReparserTransformedLiteral != 0 {
		// This is similar to `getLiteralTextOfNode` in the printer, but without the context of an `emitContext` to provide overrides
		if ast.IsStringLiteral(node) {
			if node.AsStringLiteral().TokenFlags&ast.TokenFlagsSingleQuote != 0 {
				return "'" + text + "'"
			}
			return "\"" + text + "\""
		} else if ast.IsIdentifier(node) {
			return node.Text()
		}
		// Only the above node kinds are currently transformed into one another by the reparser, requiring the textual remapping.
		// (Any reamppings done by emit transforms are handled by `getLiteralTextOfNode` in the printer)
		// Fail on any other kinds.
		debug.FailBadSyntaxKind(node, "Unexpected reparser-transformed node kind")
	}
	return text
}

func GetTextOfNode(node *ast.Node) string {
	return GetSourceTextOfNodeFromSourceFile(ast.GetSourceFileOfNode(node), node, false /*includeTrivia*/)
}

func GetTextOfJSDocComment(comment *ast.NodeList) string {
	if comment == nil {
		return ""
	}
	var b strings.Builder
	for _, n := range comment.Nodes {
		switch n.Kind {
		case ast.KindJSDocText:
			b.WriteString(n.Text())
		case ast.KindJSDocLink, ast.KindJSDocLinkCode, ast.KindJSDocLinkPlain:
			b.WriteString(GetTextOfNode(n))
		}
	}
	return strings.TrimRightFunc(b.String(), unicode.IsSpace)
}

func DeclarationNameToString(name *ast.Node) string {
	if name == nil || name.Pos() == name.End() {
		return "(Missing)"
	}
	return GetTextOfNode(name)
}

func IsIdentifierText(name string, languageVariant core.LanguageVariant) bool {
	ch, size := utf8.DecodeRuneInString(name)
	if !IsIdentifierStart(ch) {
		return false
	}
	for i := size; i < len(name); {
		ch, size = utf8.DecodeRuneInString(name[i:])
		if !IsIdentifierPartEx(ch, languageVariant) {
			return false
		}
		i += size
	}
	return true
}

func IsIntrinsicJsxName(name string) bool {
	return len(name) != 0 && (name[0] >= 'a' && name[0] <= 'z' || strings.ContainsRune(name, '-'))
}
