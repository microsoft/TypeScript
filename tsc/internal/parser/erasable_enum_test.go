package parser_test

import (
	"slices"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"gotest.tools/v3/assert"
)

func TestErasableEnumUsesOrdinaryObjectSyntax(t *testing.T) {
	t.Parallel()
	for _, initializer := range []string{
		`{ A: 1, B: "b", C: A + 1, }`,
		`{ ...other, ["foo"]: 1, method() {}, get value() { return 1; }, A }`,
		`{ A: true, B: () => 1, C: f() }`,
		`({ A: 1 })`,
	} {
		t.Run(initializer, func(t *testing.T) {
			t.Parallel()
			var shapes [][]ast.Kind
			for _, annotation := range []string{"", ": enum"} {
				file := parser.ParseSourceFile(ast.SourceFileParseOptions{FileName: "/enum.ts"}, "const E"+annotation+" = "+initializer+";", core.ScriptKindTS)
				assert.Equal(t, len(file.Diagnostics()), 0)
				declaration := file.Statements.Nodes[0].AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes[0]
				object := ast.SkipParentheses(declaration.Initializer())
				assert.Equal(t, object.Kind, ast.KindObjectLiteralExpression)
				var kinds []ast.Kind
				var visit ast.Visitor
				visit = func(node *ast.Node) bool {
					kinds = append(kinds, node.Kind)
					return node.ForEachChild(visit)
				}
				visit(object)
				shapes = append(shapes, kinds)
			}
			assert.Assert(t, slices.Equal(shapes[0], shapes[1]))
		})
	}
}
