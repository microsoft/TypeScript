package scanner

import (
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/stringutil"
	"gotest.tools/v3/assert"
)

func TestScanStringPreservesLoneSurrogates(t *testing.T) {
	t.Parallel()
	s := NewScanner()
	s.SetText(`"🦀\ud7ff\ud800\ud801\uD83E\uDD80"`)
	assert.Equal(t, s.Scan(), ast.KindStringLiteral)
	assert.Equal(t, s.TokenValue(), "🦀"+
		stringutil.EncodeJSStringRune(0xD7FF)+
		stringutil.EncodeJSStringRune(0xD800)+
		stringutil.EncodeJSStringRune(0xD801)+
		"🦀")
}

func TestNormalizeJSDocTypeSourceText(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name          string
		text          string
		expectedLines []string
	}{
		{name: "single line", text: " \t* \tFoo", expectedLines: []string{"Foo"}},
		{name: "ECMAScript line breaks", text: "Foo\r\n * Bar\r\t* Baz\u2028 * Qux\u2029* Quux", expectedLines: []string{"Foo", "Bar", "Baz", "Qux", "Quux"}},
		{name: "blank and trailing lines", text: "Foo\r\n *\r\n", expectedLines: []string{"Foo", "", ""}},
		{name: "line without marker", text: "Foo\n  Bar", expectedLines: []string{"Foo", "Bar"}},
		{name: "only leading marker", text: "**Foo", expectedLines: []string{"*Foo"}},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			expected := strings.Join(test.expectedLines, core.NewLineKindLF.GetNewLineCharacter())
			assert.Equal(t, normalizeJSDocTypeSourceText(test.text), expected)
		})
	}
}

func TestIsJSDocTypeExpressionOrChild(t *testing.T) {
	t.Parallel()

	jsDocType := &ast.Node{Kind: ast.KindTypeReference, Flags: ast.NodeFlagsJSDoc}
	jsDocTypeChild := &ast.Node{Kind: ast.KindIdentifier, Flags: ast.NodeFlagsJSDoc, Parent: jsDocType}
	reparsedType := &ast.Node{Kind: ast.KindTypeLiteral, Flags: ast.NodeFlagsReparsed}
	reparsedTypeChild := &ast.Node{Kind: ast.KindIdentifier, Flags: ast.NodeFlagsReparsed, Parent: reparsedType}
	ordinaryType := &ast.Node{Kind: ast.KindTypeReference}
	jsDocTag := &ast.Node{Kind: ast.KindJSDocParameterTag, Flags: ast.NodeFlagsJSDoc}
	jsDocTagChild := &ast.Node{Kind: ast.KindIdentifier, Flags: ast.NodeFlagsJSDoc, Parent: jsDocTag}

	tests := []struct {
		name     string
		node     *ast.Node
		expected bool
	}{
		{name: "type expression", node: &ast.Node{Kind: ast.KindJSDocTypeExpression}, expected: true},
		{name: "JSDoc type", node: jsDocType, expected: true},
		{name: "JSDoc type child", node: jsDocTypeChild, expected: true},
		{name: "reparsed type", node: reparsedType, expected: true},
		{name: "reparsed type child", node: reparsedTypeChild, expected: true},
		{name: "ordinary type", node: ordinaryType, expected: false},
		{name: "other JSDoc child", node: jsDocTagChild, expected: false},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			assert.Equal(t, isJSDocTypeExpressionOrChild(test.node), test.expected)
		})
	}
}

func TestGetTextOfNodeFromJSDocTypePreservesAsteriskType(t *testing.T) {
	t.Parallel()

	sourceText := strings.Join([]string{"", " * *"}, core.NewLineKindLF.GetNewLineCharacter())
	node := &ast.Node{
		Kind:  ast.KindJSDocAllType,
		Flags: ast.NodeFlagsJSDoc,
		Loc:   core.NewTextRange(0, len(sourceText)),
	}

	assert.Equal(t, GetTextOfNodeFromSourceText(sourceText, node, false /*includeTrivia*/), "*")
}

func TestScanSourceKeyword(t *testing.T) {
	t.Parallel()
	s := NewScanner()
	s.SetText("source sourceValue")

	assert.Equal(t, s.Scan(), ast.KindSourceKeyword)
	assert.Equal(t, TokenToString(ast.KindSourceKeyword), "source")
	assert.Equal(t, StringToToken("source"), ast.KindSourceKeyword)
	assert.Equal(t, s.Scan(), ast.KindIdentifier)
	assert.Equal(t, s.TokenValue(), "sourceValue")
}

func TestScanMultiLineCommentTail(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name           string
		comment        string
		directiveStart int // -1 when no directive is expected
		unterminated   bool
	}{
		{"LF", "/*a\n * b\n @ts-ignore */", len("/*a\n * b\n"), false},
		{"CRLF", "/*a\r\n @ts-expect-error */", len("/*a\r\n"), false},
		{"CR", "/*a\r @ts-ignore */", len("/*a\r"), false},
		{"LineSeparator", "/*a\u2028 @ts-ignore */", len("/*a\u2028"), false},
		{"LineSeparatorAfterFirstLine", "/*a\n\u2028 @ts-ignore */", len("/*a\n\u2028"), false},
		{"ParagraphSeparator", "/*a\n\u2029 @ts-ignore */", len("/*a\n\u2029"), false},
		{"OtherNonASCII", "/*a\n @ts-ignore \u00e9\u2027 */", len("/*a\n"), false},
		{"StarsBeforeClose", "/*a\n * b **/", -1, false},
		{"DirectiveNotOnLastLine", "/*\n@ts-ignore\n*/", -1, false},
		{"Unterminated", "/*a\n @ts-ignore", len("/*a\n"), true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			s := NewScanner()
			text := tt.comment
			if !tt.unterminated {
				text += "x"
			}
			s.SetText(text)
			s.SetSkipTrivia(false)
			s.SetOnError(func(*diagnostics.Message, int, int, ...any) {})
			assert.Equal(t, s.Scan(), ast.KindMultiLineCommentTrivia)
			assert.Equal(t, s.TokenEnd(), len(tt.comment))
			assert.Assert(t, s.TokenFlags()&ast.TokenFlagsPrecedingLineBreak != 0)
			assert.Equal(t, s.TokenFlags()&ast.TokenFlagsUnterminated != 0, tt.unterminated)
			directives := s.CommentDirectives()
			if tt.directiveStart < 0 {
				assert.Equal(t, len(directives), 0)
			} else {
				assert.Equal(t, len(directives), 1)
				assert.Equal(t, directives[0].Loc, core.NewTextRange(tt.directiveStart, len(tt.comment)))
			}
		})
	}
}
