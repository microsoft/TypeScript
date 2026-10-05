package compiler

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestExternalLibraryDepthLoweredByLaterArrival(t *testing.T) {
	t.Parallel()
	for name, roots := range map[string][]tspath.RootedFilePath{
		"rootsAThenB": {"/src/a.ts", "/src/b.ts"},
		"rootsBThenA": {"/src/b.ts", "/src/a.ts"},
	} {
		t.Run(name, func(t *testing.T) {
			t.Parallel()
			fs := vfstest.FromMap(map[string]any{
				"/src/a.ts":             `import { util } from "./lib/index"; export const a = util;`,
				"/src/b.ts":             `import { util } from "lib"; export const b = util;`,
				"/src/node_modules/lib": vfstest.Symlink("/src/lib"),
				"/src/lib/package.json": `{"name":"lib","types":"index.ts"}`,
				"/src/lib/index.ts":     `export { util } from "./util";`,
				"/src/lib/util.ts":      `export const util = 1;`,
			}, tspath.CaseSensitive)
			opts := &core.CompilerOptions{NoLib: core.TSTrue, Types: []string{}}
			program := NewProgram(ProgramOptions{
				Config:         tsoptions.NewParsedCommandLine(opts, roots, nil, "/src", fs.CaseSensitivity()),
				Host:           NewCompilerHost(fs, "/", nil, nil, nil),
				SingleThreaded: core.TSTrue,
			})
			for _, fileName := range []tspath.RootedFilePath{"/src/lib/index.ts", "/src/lib/util.ts"} {
				file := program.GetSourceFile(fileName)
				assert.Assert(t, file != nil, "%s is not in the program", fileName)
				assert.Assert(t, !program.IsSourceFileFromExternalLibrary(file), "%s is reachable from a root file without node_modules", fileName)
			}
		})
	}
}
