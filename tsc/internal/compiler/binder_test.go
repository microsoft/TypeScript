package compiler

import (
	"runtime"
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/microsoft/typescript-go/internal/testutil/fixtures"
)

func BenchmarkBind(b *testing.B) {
	for _, f := range fixtures.BenchFixtures {
		b.Run(f.Name(), func(b *testing.B) {
			f.SkipIfNotExist(b)

			fileName := f.Path()
			sourceText := f.ReadFile(b)

			sourceFiles := make([]*ast.SourceFile, b.N)
			for i := 0; i < b.N; i++ {
				sourceFiles[i] = parser.ParseSourceFile(fileName, sourceText, core.ScriptTargetESNext)
			}

			compilerOptions := &core.CompilerOptions{Target: core.ScriptTargetESNext, ModuleKind: core.ModuleKindNodeNext}

			// The above parses do a lot of work; ensure GC is settled before we start collecting pefrormance data.
			runtime.GC()
			runtime.GC()

			b.ResetTimer()
			for i := 0; i < b.N; i++ {
				bindSourceFile(sourceFiles[i], compilerOptions)
			}
		})
	}
}
