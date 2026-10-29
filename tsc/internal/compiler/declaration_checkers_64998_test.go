package compiler_test

import (
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

// Regression for microsoft/TypeScript#64998: declaration emit of a circular
// `Status = keyof StatusClass | ""` (StatusClass members typed as Status, plus a
// string index signature) must not collapse to `any` when status.ts and
// consumer.ts land on different checkers.
func TestDeclarationEmitCheckers64998(t *testing.T) {
	t.Parallel()

	files := map[string]string{
		"/types.ts": `export type Key = string;`,
		"/status.ts": `import type { Key } from "./types";
export class StatusClass {
  RUNNING: Status = "RUNNING";
  [key: string]: Status;
}
export type Status = keyof StatusClass | "";
export const statusFromAPI: { [key: Key]: Status } = {};
`,
		"/consumer.ts": `import { statusFromAPI } from "./status";
export const current = statusFromAPI["RUNNING"];
`,
		"/tsconfig.json": `{
			"compilerOptions": {
				"declaration": true,
				"emitDeclarationOnly": true,
				"outDir": "/out",
				"rootDir": "/",
				"strict": true
			},
			"files": ["types.ts", "status.ts", "consumer.ts"]
		}`,
	}

	for _, n := range []int{1, 2, 3, 4} {
		t.Run("checkers_"+string(rune('0'+n)), func(t *testing.T) {
			t.Parallel()
			fs := bundled.WrapFS(vfstest.FromMap(files, tspath.CaseInsensitive))
			host := compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil)
			checkers := n
			parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile(
				"/tsconfig.json",
				&core.CompilerOptions{Checkers: &checkers},
				nil,
				tsoptions.NewDefaultParseConfigHost(fs),
				nil,
			)
			assert.Equal(t, len(errors), 0)
			program := compiler.NewProgram(compiler.ProgramOptions{Config: parsed, Host: host})

			var emitted string
			result := program.Emit(t.Context(), compiler.EmitOptions{
				WriteFile: func(fileName tspath.RootedFilePath, text string, data *compiler.WriteFileData) error {
					if strings.HasSuffix(string(fileName), "consumer.d.ts") {
						emitted = text
					}
					return nil
				},
			})
			assert.Equal(t, len(result.Diagnostics), 0, "diags=%v", result.Diagnostics)
			assert.Assert(t, strings.Contains(emitted, "Status"), "emit=%q", emitted)
			assert.Assert(t, !strings.Contains(emitted, ": any"), "emit=%q", emitted)
		})
	}
}
