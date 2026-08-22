package scanner

import (
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
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

	jsDocType := &ast.Node{}
	jsDocType.Kind, jsDocType.Flags = ast.KindTypeReference, ast.NodeFlagsJSDoc
	jsDocTypeChild := &ast.Node{}
	jsDocTypeChild.Kind, jsDocTypeChild.Flags, jsDocTypeChild.Parent = ast.KindIdentifier, ast.NodeFlagsJSDoc, jsDocType
	reparsedType := &ast.Node{}
	reparsedType.Kind, reparsedType.Flags = ast.KindTypeLiteral, ast.NodeFlagsReparsed
	reparsedTypeChild := &ast.Node{}
	reparsedTypeChild.Kind, reparsedTypeChild.Flags, reparsedTypeChild.Parent = ast.KindIdentifier, ast.NodeFlagsReparsed, reparsedType
	ordinaryType := &ast.Node{}
	ordinaryType.Kind = ast.KindTypeReference
	jsDocTag := &ast.Node{}
	jsDocTag.Kind, jsDocTag.Flags = ast.KindJSDocParameterTag, ast.NodeFlagsJSDoc
	jsDocTagChild := &ast.Node{}
	jsDocTagChild.Kind, jsDocTagChild.Flags, jsDocTagChild.Parent = ast.KindIdentifier, ast.NodeFlagsJSDoc, jsDocTag
	jsDocTypeExpression := &ast.Node{}
	jsDocTypeExpression.Kind = ast.KindJSDocTypeExpression

	tests := []struct {
		name     string
		node     *ast.Node
		expected bool
	}{
		{name: "type expression", node: jsDocTypeExpression, expected: true},
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
	node := &ast.Node{}
	node.Kind = ast.KindJSDocAllType
	node.Flags = ast.NodeFlagsJSDoc
	node.Loc = core.NewTextRange(0, len(sourceText))

	assert.Equal(t, GetTextOfNodeFromSourceText(sourceText, node, false /*includeTrivia*/), "*")
}
