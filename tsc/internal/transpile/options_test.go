package transpile

import (
	"reflect"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
)

func TestTranspileClearsInapplicableOptions(t *testing.T) {
	t.Parallel()

	for _, declaration := range []bool{false, true} {
		name := "module"
		transpile := TranspileModule
		if declaration {
			name = "declaration"
			transpile = TranspileDeclaration
		}
		t.Run(name, func(t *testing.T) {
			t.Parallel()

			options := &core.CompilerOptions{
				Incremental:                core.TSTrue,
				Declaration:                core.TSTrue,
				EmitDeclarationOnly:        core.TSTrue,
				NoEmit:                     core.TSTrue,
				Lib:                        []string{"missing.d.ts"},
				OutFile:                    "/other/output.js",
				Composite:                  core.TSTrue,
				TsBuildInfoFile:            "/other/buildinfo",
				Paths:                      collections.NewOrderedMapFromList([]collections.MapEntry[string, []string]{{Key: "*", Value: []string{"/missing/*"}}}),
				RootDirs:                   []string{"/missing"},
				Types:                      []string{"missing"},
				AllowImportingTsExtensions: core.TSTrue,
				NoEmitOnError:              core.TSTrue,
				DeclarationDir:             "/other/declarations",
			}
			before := options.Clone()
			const source = "export const value: number = 1;"
			expected := transpile(t.Context(), source, Options{ReportDiagnostics: true})
			actual := transpile(t.Context(), source, Options{CompilerOptions: options, ReportDiagnostics: true})
			if expected == nil || actual == nil {
				t.Fatal("Transpilation was unexpectedly canceled")
			}
			if expected.OutputText == "" || actual.OutputText != expected.OutputText || actual.SourceMapText != expected.SourceMapText {
				t.Fatalf("Inapplicable options changed the output: got %#v, want %#v", actual, expected)
			}
			if len(expected.Diagnostics) != 0 || len(actual.Diagnostics) != 0 {
				t.Fatalf("Unexpected diagnostics: got %v, want %v", actual.Diagnostics, expected.Diagnostics)
			}
			if !reflect.DeepEqual(options, before) {
				t.Fatal("Transpilation modified the caller's options")
			}
		})
	}
}
