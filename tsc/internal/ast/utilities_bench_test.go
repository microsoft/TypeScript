package ast_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/fixtures"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/osvfs"
)

func BenchmarkGetCombinedFlags(b *testing.B) {
	for _, f := range fixtures.BenchFixtures {
		b.Run(f.Name(), func(b *testing.B) {
			f.SkipIfNotExist(b)

			fileName := tspath.ToRootedFilePath(f.Path(), "/")
			path := osvfs.FS().CaseSensitivity().PathKey(tspath.RootedPath(fileName))
			sourceText := f.ReadFile(b)
			scriptKind := core.GetScriptKindFromFileName(fileName)

			sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
				FileName: fileName,
				PathKey:  path,
			}, sourceText, scriptKind)

			var decls []*ast.Node
			var collect ast.Visitor
			collect = func(n *ast.Node) bool {
				if ast.IsDeclaration(n) {
					decls = append(decls, n)
				}
				n.ForEachChild(collect)
				return false
			}
			sourceFile.AsNode().ForEachChild(collect)

			for b.Loop() {
				for _, n := range decls {
					_ = ast.GetCombinedNodeFlags(n)
					_ = ast.GetCombinedModifierFlags(n)
				}
			}
		})
	}
}
