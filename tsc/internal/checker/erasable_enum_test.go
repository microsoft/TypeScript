package checker_test

import (
	"strconv"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
)

func TestErasableEnumCannotMergeAcrossFiles(t *testing.T) {
	t.Parallel()
	for _, other := range []string{
		`var E: enum = { B: 2 };`,
		`enum E { B = 2 }`,
		`namespace E { export const B = 2; }`,
	} {
		for _, reverse := range []bool{false, true} {
			t.Run(other+strconv.FormatBool(reverse), func(t *testing.T) {
				t.Parallel()
				first, second := `var E: enum = { A: 1 };`, other
				if reverse {
					first, second = second, first
				}
				fs := vfstest.FromMap(map[string]string{
					"/first.ts":      first,
					"/second.ts":     second,
					"/tsconfig.json": `{"compilerOptions":{"noLib":true},"files":["first.ts","second.ts"]}`,
				}, tspath.CaseSensitive)
				parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile("/tsconfig.json", &core.CompilerOptions{}, nil, tsoptions.NewDefaultParseConfigHost(fs), nil)
				if len(errors) != 0 {
					t.Fatal(errors)
				}
				p := compiler.NewProgram(compiler.ProgramOptions{Config: parsed, Host: compiler.NewCompilerHost(fs, "/", nil, nil, nil)})
				for _, filename := range []string{"/first.ts", "/second.ts"} {
					diagnostics := p.GetSemanticDiagnostics(t.Context(), p.GetSourceFile(tspath.RootedFilePathFromNormalized(filename)))
					found := false
					for _, diagnostic := range diagnostics {
						if diagnostic.Code() == 2300 {
							found = true
						}
					}
					if !found {
						t.Fatalf("expected duplicate declaration in %s; got %v", filename, diagnostics)
					}
				}
			})
		}
	}
}
