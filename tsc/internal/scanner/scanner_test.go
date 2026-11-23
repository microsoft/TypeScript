package scanner

import (
	"strings"
	"testing"
	"unicode/utf8"

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

	factory := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	node := func(n *ast.Node, flags ast.NodeFlags, parent *ast.Node) *ast.Node {
		n.Flags = flags
		n.Parent = parent
		return n
	}
	jsDocType := node(factory.NewTypeReferenceNode(factory.NewIdentifier("T"), nil), ast.NodeFlagsJSDoc, nil)
	jsDocTypeChild := node(factory.NewIdentifier("T"), ast.NodeFlagsJSDoc, jsDocType)
	reparsedType := node(factory.NewTypeLiteralNode(nil), ast.NodeFlagsReparsed, nil)
	reparsedTypeChild := node(factory.NewIdentifier("T"), ast.NodeFlagsReparsed, reparsedType)
	ordinaryType := factory.NewTypeReferenceNode(factory.NewIdentifier("T"), nil)
	jsDocTag := node(factory.NewJSDocParameterOrPropertyTag(ast.KindJSDocParameterTag, factory.NewIdentifier("param"), factory.NewIdentifier("p"), false, nil, false, nil), ast.NodeFlagsJSDoc, nil)
	jsDocTagChild := node(factory.NewIdentifier("T"), ast.NodeFlagsJSDoc, jsDocTag)

	tests := []struct {
		name     string
		node     *ast.Node
		expected bool
	}{
		{name: "type expression", node: factory.NewJSDocTypeExpression(ordinaryType), expected: true},
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
	node := ast.NewNodeFactory(ast.NodeFactoryHooks{}).NewJSDocAllType()
	node.Flags = ast.NodeFlagsJSDoc
	node.Loc = core.NewTextRange(0, len(sourceText))

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

func TestLookupKeywordMatchesKeywordMap(t *testing.T) {
	t.Parallel()
	for text, kind := range textToKeyword {
		assert.Equal(t, lookupKeyword(text), kind, text)
		assert.Equal(t, GetIdentifierToken(text), kind, text)
		for _, other := range []string{text + "s", text[:len(text)-1], strings.ToUpper(text[:1]) + text[1:], "x" + text[1:], "_" + text} {
			if _, ok := textToKeyword[other]; !ok {
				assert.Equal(t, lookupKeyword(other), ast.KindUnknown, other)
				assert.Equal(t, GetIdentifierToken(other), ast.KindIdentifier, other)
			}
		}
	}
	for _, text := range []string{"", "a", "\x00\x00", "élse"} {
		assert.Equal(t, lookupKeyword(text), ast.KindUnknown, text)
		assert.Equal(t, GetIdentifierToken(text), ast.KindIdentifier, text)
	}
}

// https://github.com/microsoft/TypeScript/issues/65076
// A literal U+FFFD in a regex character-class range must not be mistaken for
// utf8.RuneError (which is the same code point, but only signals invalid UTF-8
// when DecodeRune returns size 1).
func TestRegExpLiteralReplacementCharacterInClassRange(t *testing.T) {
	t.Parallel()

	fffd := string(utf8.RuneError) // U+FFFD, encoded as the 3-byte UTF-8 sequence
	assert.Equal(t, len(fffd), 3)

	tests := []struct {
		name string
		text string
	}{
		{name: "range ending in literal U+FFFD", text: `export const r = /[\uFFF9-` + fffd + `]/;`},
		{name: "range ending in literal U+FFFD with u flag", text: `export const r = /[\uFFF9-` + fffd + `]/u;`},
		{name: "escaped U+FFFD range end", text: `export const r = /[\uFFF9-\uFFFD]/;`},
		{name: "lone literal U+FFFD", text: `export const r = /` + fffd + `/;`},
		{name: "range starting with literal U+FFFD", text: `export const r = /[` + fffd + `-\uFFFF]/;`},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			s := NewScanner()
			var codes []int32
			s.SetOnError(func(d *diagnostics.Message, start, length int, args ...any) {
				codes = append(codes, d.Code())
			})
			s.SetText(test.text)
			for {
				tok := s.Scan()
				if tok == ast.KindSlashToken || tok == ast.KindSlashEqualsToken {
					tok = s.ReScanSlashToken(true)
				}
				if tok == ast.KindEndOfFile {
					break
				}
			}
			for _, code := range codes {
				assert.Assert(t, code != 1516 && code != 1517, "unexpected regex character-class diagnostic %d for %q (got %v)", code, test.text, codes)
			}
		})
	}
}
