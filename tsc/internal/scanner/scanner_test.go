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

	var f ast.NodeFactory
	withFlags := func(node ast.Node, flags ast.NodeFlags, parent ast.Node) ast.Node {
		node.SetFlags(flags)
		node.SetParent(parent)
		return node
	}
	jsDocType := withFlags(f.NewTypeReferenceNode(f.NewIdentifier("T"), ast.TypeList{}), ast.NodeFlagsJSDoc, ast.Node{})
	jsDocTypeChild := withFlags(f.NewIdentifier("T"), ast.NodeFlagsJSDoc, jsDocType)
	reparsedType := withFlags(f.NewTypeLiteralNode(f.NewNodeList(nil)), ast.NodeFlagsReparsed, ast.Node{})
	reparsedTypeChild := withFlags(f.NewIdentifier("T"), ast.NodeFlagsReparsed, reparsedType)
	ordinaryType := f.NewTypeReferenceNode(f.NewIdentifier("T"), ast.TypeList{})
	jsDocTag := withFlags(f.NewJSDocTypeTag(f.NewIdentifier("type"), ast.Node{}, ast.NodeList{}), ast.NodeFlagsJSDoc, ast.Node{})
	jsDocTagChild := withFlags(f.NewIdentifier("T"), ast.NodeFlagsJSDoc, jsDocTag)

	tests := []struct {
		name     string
		node     ast.Node
		expected bool
	}{
		{name: "type expression", node: f.NewJSDocTypeExpression(ast.Node{}), expected: true},
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
	var f ast.NodeFactory
	node := f.NewJSDocAllType()
	node.SetFlags(ast.NodeFlagsJSDoc)
	node.SetLoc(core.NewTextRange(0, len(sourceText)))

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
