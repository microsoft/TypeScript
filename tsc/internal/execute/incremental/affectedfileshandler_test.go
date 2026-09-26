package incremental_test

import (
	"fmt"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/execute/incremental"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func BenchmarkFirstIncrementalRebuild(b *testing.B) {
	for _, leaves := range []int{200, 1000} {
		b.Run(fmt.Sprintf("leaves=%d", leaves), func(b *testing.B) {
			files := map[string]string{
				"/src/hub.ts":    `export const prefix = "hub";`,
				"/tsconfig.json": `{"compilerOptions":{"strict":true,"noEmit":true,"incremental":true,"skipLibCheck":true,"module":"esnext","moduleResolution":"bundler"}}`,
			}
			var factories, exports strings.Builder
			for i := range leaves / 2 {
				files[fmt.Sprintf("/src/types/t%d.ts", i)] = fmt.Sprintf(`export interface Model%d { id: string; value%d: number; } export function make%d(id: string): Model%d { return { id, value%d: %d }; }`, i, i, i, i, i, i)
				fmt.Fprintf(&factories, "export { make%d } from './t%d';\n", i, i)
			}
			files["/src/types/index.ts"] = factories.String()
			for i := range leaves {
				a, other := i%(leaves/2), (i*7+3)%(leaves/2)
				files[fmt.Sprintf("/src/leaves/l%d.ts", i)] = fmt.Sprintf(`import { prefix } from "../hub"; import { make%d, make%d } from "../types"; export const leaf%d = { first: make%d(prefix), second: make%d("%d") };`, a, other, i, a, other, i)
				fmt.Fprintf(&exports, "export * from './leaves/l%d';\n", i)
			}
			files["/src/index.ts"] = exports.String()
			fs := bundled.WrapFS(vfstest.FromMap(files, true))
			newHost := func() compiler.CompilerHost {
				return compiler.NewCompilerHost("/", fs, bundled.LibPath(), nil, nil, nil)
			}
			host := newHost()
			config, diagnostics := tsoptions.GetParsedCommandLineOfConfigFile("/tsconfig.json", &core.CompilerOptions{}, nil, host, nil)
			assert.Equal(b, len(diagnostics), 0)
			program := incremental.NewProgram(compiler.NewProgram(compiler.ProgramOptions{Config: config, Host: host}), nil, incremental.CreateHost(host), nil, false)
			assert.Equal(b, len(program.GetSemanticDiagnostics(b.Context(), nil)), 0)
			assert.Equal(b, len(program.Emit(b.Context(), compiler.EmitOptions{}).Diagnostics), 0)
			assert.NilError(b, fs.AppendFile("/src/hub.ts", "\n// comment only edit\n"))
			b.ReportAllocs()
			for b.Loop() {
				host := newHost()
				oldProgram := incremental.ReadBuildInfoProgram(config, incremental.NewBuildInfoReader(host), host)
				assert.Assert(b, oldProgram != nil)
				program := incremental.NewProgram(compiler.NewProgram(compiler.ProgramOptions{Config: config, Host: host}), oldProgram, incremental.CreateHost(host), nil, false)
				assert.Equal(b, len(program.GetSemanticDiagnostics(b.Context(), nil)), 0)
			}
		})
	}
}
