package ls

import (
	"fmt"
	"slices"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestErasableEnumReferencesAcrossMeanings(t *testing.T) {
	t.Parallel()
	for _, prefix := range []string{"", "export "} {
		t.Run(prefix, func(t *testing.T) {
			t.Parallel()
			content := prefix + `const E: enum = { A: 1, B: 2 };
const value: E = E.A;
let member: E.A = E.A;`
			fs := bundled.WrapFS(vfstest.FromMap(map[string]string{
				"/repro.ts":      content,
				"/tsconfig.json": `{"compilerOptions":{"strict":true},"files":["repro.ts"]}`,
			}, tspath.CaseSensitive))
			config, errors := tsoptions.GetParsedCommandLineOfConfigFile("/tsconfig.json", &core.CompilerOptions{}, nil, tsoptions.NewDefaultParseConfigHost(fs), nil)
			assert.Equal(t, len(errors), 0)
			program := compiler.NewProgram(compiler.ProgramOptions{Config: config, Host: compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil)})
			file := program.GetSourceFile("/repro.ts")
			assert.Equal(t, len(program.GetSemanticDiagnostics(t.Context(), file)), 0)
			converters := lsconv.NewConverters(lsproto.PositionEncodingKindUTF8, func(_ tspath.RootedFilePath) *lsconv.LSPLineMap {
				return lsconv.ComputeLSPLineStarts(content)
			})
			service := &LanguageService{program: program, converters: converters}
			for _, name := range []rune{'E', 'A'} {
				var want []int
				for offset, character := range content {
					if character == name {
						want = append(want, offset)
					}
				}
				for _, offset := range want {
					t.Run(fmt.Sprintf("%c/%d", name, offset), func(t *testing.T) {
						position, _ := converters.ToLSPPosition(file, core.TextPos(offset))
						data, ok := service.provideSymbolsAndEntries(t.Context(), "file:///repro.ts", position, false /*isRename*/, false /*implementations*/)
						assert.Assert(t, ok)
						var got []int
						for _, symbol := range data.SymbolsAndEntries {
							for _, reference := range symbol.references {
								assert.Assert(t, reference.node != nil)
								got = append(got, reference.node.End()-1)
							}
						}
						slices.Sort(got)
						assert.DeepEqual(t, got, want)
					})
				}
			}
		})
	}
}
