package transpile

import (
	"reflect"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
)

func TestGeneratedTranspileOptions(t *testing.T) {
	t.Parallel()
	for _, populated := range []bool{false, true} {
		for _, declaration := range []bool{false, true} {
			for _, verbatim := range []core.Tristate{core.TSUnknown, core.TSFalse, core.TSTrue} {
				for _, isolated := range []core.Tristate{core.TSUnknown, core.TSFalse, core.TSTrue} {
					actual := &core.CompilerOptions{}
					if populated {
						value := reflect.ValueOf(actual).Elem()
						for field := range value.Type().Fields() {
							if !field.IsExported() {
								continue
							}
							v := value.FieldByIndex(field.Index)
							switch v.Kind() {
							case reflect.String:
								v.SetString("value")
							case reflect.Int32:
								v.SetInt(1)
							case reflect.Uint8:
								v.SetUint(uint64(core.TSTrue))
							case reflect.Slice:
								v.Set(reflect.MakeSlice(v.Type(), 1, 1))
							case reflect.Pointer:
								v.Set(reflect.New(v.Type().Elem()))
							default:
								t.Fatalf("Unhandled field %s", field.Name)
							}
						}
					}
					actual.VerbatimModuleSyntax = verbatim
					actual.IsolatedModules = isolated
					expected := actual.Clone()
					expected.AllowImportingTsExtensions = core.TSUnknown
					expected.Composite = core.TSUnknown
					expected.EmitDeclarationOnly = core.TSUnknown
					expected.Declaration = core.TSUnknown
					expected.DeclarationDir = ""
					expected.Incremental = core.TSUnknown
					expected.Lib = nil
					expected.NoEmit = core.TSUnknown
					expected.NoEmitOnError = core.TSUnknown
					expected.Paths = nil
					expected.RootDirs = nil
					expected.TsBuildInfoFile = ""
					expected.Types = nil
					expected.OutFile = ""
					if !verbatim.IsTrue() {
						expected.IsolatedModules = core.TSTrue
					}
					expected.NoCheck = core.TSTrue
					expected.NoResolve = core.TSTrue
					expected.SuppressOutputPathCheck = core.TSTrue
					expected.AllowNonTsExtensions = core.TSTrue
					if declaration {
						expected.Declaration = core.TSTrue
						expected.EmitDeclarationOnly = core.TSTrue
						expected.IsolatedDeclarations = core.TSTrue
						expected.NoLib = core.TSFalse
					} else {
						expected.Declaration = core.TSFalse
						expected.DeclarationMap = core.TSFalse
						expected.IsolatedDeclarations = core.TSFalse
						expected.NoLib = core.TSTrue
					}
					setOptionsForTranspile(actual, declaration)
					if !reflect.DeepEqual(actual, expected) {
						t.Fatalf("Generated transpile options differ: populated=%v declaration=%v verbatim=%v isolated=%v", populated, declaration, verbatim, isolated)
					}
				}
			}
		}
	}
}

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
