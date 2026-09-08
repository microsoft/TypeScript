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

var (
	accessorName        *ast.Node
	accessorModifiers   *ast.ModifierList
	accessorDeclaration *ast.DeclarationBase
	accessorLocals      *ast.LocalsContainerBase
)

func BenchmarkNodeAccessors(b *testing.B) {
	for _, f := range fixtures.BenchFixtures {
		b.Run(f.Name(), func(b *testing.B) {
			f.SkipIfNotExist(b)
			fileName := tspath.GetNormalizedAbsolutePath(f.Path(), "/")
			path := tspath.ToPath(fileName, "/", osvfs.FS().UseCaseSensitiveFileNames())
			sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
				FileName: fileName,
				Path:     path,
			}, f.ReadFile(b), core.GetScriptKindFromFileName(fileName))
			benchmarkNodeAccessors(b, sourceFile.AsNode())
		})
	}
}

func benchmarkNodeAccessors(b *testing.B, root *ast.Node) {
	var nodes, named, declarations, containers []*ast.Node
	var visit ast.Visitor
	visit = func(node *ast.Node) bool {
		nodes = append(nodes, node)
		if node.Name() != nil {
			named = append(named, node)
		}
		if node.DeclarationData() != nil {
			declarations = append(declarations, node)
		}
		if node.LocalsContainerData() != nil {
			containers = append(containers, node)
		}
		node.ForEachChild(visit)
		return false
	}
	visit(root)

	b.Run("Name", func(b *testing.B) {
		for b.Loop() {
			for _, node := range nodes {
				accessorName = node.Name()
			}
		}
		b.ReportMetric(float64(b.Elapsed().Nanoseconds())/float64(b.N*len(nodes)), "ns/node")
	})
	b.Run("Modifiers", func(b *testing.B) {
		for b.Loop() {
			for _, node := range nodes {
				accessorModifiers = node.Modifiers()
			}
		}
		b.ReportMetric(float64(b.Elapsed().Nanoseconds())/float64(b.N*len(nodes)), "ns/node")
	})
	b.Run("DeclarationData", func(b *testing.B) {
		for b.Loop() {
			for _, node := range nodes {
				accessorDeclaration = node.DeclarationData()
			}
		}
		b.ReportMetric(float64(b.Elapsed().Nanoseconds())/float64(b.N*len(nodes)), "ns/node")
	})
	b.Run("LocalsContainerData", func(b *testing.B) {
		for b.Loop() {
			for _, node := range nodes {
				accessorLocals = node.LocalsContainerData()
			}
		}
		b.ReportMetric(float64(b.Elapsed().Nanoseconds())/float64(b.N*len(nodes)), "ns/node")
	})
	b.Run("NamePresent", func(b *testing.B) {
		if len(named) == 0 {
			b.Skip("fixture has no named nodes")
		}
		for b.Loop() {
			for _, node := range named {
				accessorName = node.Name()
			}
		}
		b.ReportMetric(float64(b.Elapsed().Nanoseconds())/float64(b.N*len(named)), "ns/node")
	})
	b.Run("DeclarationDataPresent", func(b *testing.B) {
		if len(declarations) == 0 {
			b.Skip("fixture has no declaration data")
		}
		for b.Loop() {
			for _, node := range declarations {
				accessorDeclaration = node.DeclarationData()
			}
		}
		b.ReportMetric(float64(b.Elapsed().Nanoseconds())/float64(b.N*len(declarations)), "ns/node")
	})
	b.Run("LocalsContainerDataPresent", func(b *testing.B) {
		if len(containers) == 0 {
			b.Skip("fixture has no locals containers")
		}
		for b.Loop() {
			for _, node := range containers {
				accessorLocals = node.LocalsContainerData()
			}
		}
		b.ReportMetric(float64(b.Elapsed().Nanoseconds())/float64(b.N*len(containers)), "ns/node")
	})
}
