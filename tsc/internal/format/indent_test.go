package format_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/format"
	"github.com/microsoft/typescript-go/internal/parser"
	"gotest.tools/v3/assert"
)

func TestGetContainingList_NamedImports(t *testing.T) {
	t.Parallel()

	text := `import type {
    AAA,
    BBB,
} from "./bar";`

	sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: "/test.ts",
		Path:     "/test.ts",
	}, text, core.ScriptKindTS)

	// Find ImportSpecifier nodes (AAA and BBB)
	var importSpecifiers []*ast.Node
	forEachDescendantOfKind(sourceFile.AsNode(), ast.KindImportSpecifier, func(node *ast.Node) {
		importSpecifiers = append(importSpecifiers, node)
	})

	assert.Assert(t, len(importSpecifiers) == 2, "Expected 2 import specifiers, got %d", len(importSpecifiers))

	// Test GetContainingList for each import specifier
	for _, specifier := range importSpecifiers {
		list := format.GetContainingList(specifier, sourceFile)
		assert.Assert(t, list != nil, "GetContainingList should return non-nil for import specifier")
		assert.Assert(t, len(list.Nodes) == 2, "Expected list with 2 elements, got %d", len(list.Nodes))
	}
}

func forEachDescendantOfKind(node *ast.Node, kind ast.Kind, action func(*ast.Node)) {
	node.ForEachChild(func(child *ast.Node) bool {
		if child.Kind == kind {
			action(child)
		}
		forEachDescendantOfKind(child, kind, action)
		return false
	})
}
