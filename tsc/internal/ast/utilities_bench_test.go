package ast_test

import (
	"runtime"
	"runtime/metrics"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/fixtures"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/osvfs"
)

func BenchmarkASTArena(b *testing.B) {
	text := strings.Repeat("export function f(x: number) { return x + 1; }\n", 1024)
	opts := ast.SourceFileParseOptions{
		FileName: tspath.RootedFilePathFromNormalized("/arena.ts"),
		PathKey:  tspath.PathKeyFromCanonical("/arena.ts"),
	}
	b.Run("Parse", func(b *testing.B) {
		b.ReportAllocs()
		for b.Loop() {
			parser.ParseSourceFile(opts, text, core.ScriptKindTS)
		}
	})
	file := parser.ParseSourceFile(opts, text, core.ScriptKindTS)
	b.Run("Navigate", func(b *testing.B) {
		b.ReportAllocs()
		var visit ast.Visitor
		visit = func(node ast.Node) bool {
			_ = node.Kind()
			_ = node.Pos()
			node.ForEachChild(visit)
			return false
		}
		for b.Loop() {
			file.ForEachChild(visit)
		}
	})
}

func BenchmarkASTArenaRetained(b *testing.B) {
	const count = 128
	text := strings.Repeat("export function f(x: number) { return x + 1; }\n", 1024)
	opts := ast.SourceFileParseOptions{
		FileName: tspath.RootedFilePathFromNormalized("/arena.ts"),
		PathKey:  tspath.PathKeyFromCanonical("/arena.ts"),
	}
	samples := []metrics.Sample{
		{Name: "/gc/heap/live:bytes"},
		{Name: "/gc/scan/heap:bytes"},
	}
	runtime.GC()
	metrics.Read(samples)
	beforeLive := samples[0].Value.Uint64()
	beforeScan := samples[1].Value.Uint64()
	files := make([]*ast.SourceFile, count)
	for i := range files {
		files[i] = parser.ParseSourceFile(opts, text, core.ScriptKindTS)
	}
	runtime.GC()
	metrics.Read(samples)
	live := float64(int64(samples[0].Value.Uint64())-int64(beforeLive)) / count
	scan := float64(int64(samples[1].Value.Uint64())-int64(beforeScan)) / count
	b.ResetTimer()
	for b.Loop() {
		runtime.KeepAlive(files)
	}
	b.ReportMetric(live, "live-B/file")
	b.ReportMetric(scan, "scan-B/file")
}

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

			var decls []ast.Node
			var collect ast.Visitor
			collect = func(n ast.Node) bool {
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
