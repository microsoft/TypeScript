package tsctests

import (
	"io/fs"
	"testing"
	"testing/fstest"
)

func TestTscIncrementalFailedWrite(t *testing.T) {
	t.Parallel()
	test := &tscInput{
		subScenario: "declaration emit reports failed write without panicking",
		files: FileMap{
			"/home/src/workspaces/project/tsconfig.json": `{"compilerOptions":{"incremental":true,"declaration":true,"rootDir":"src","outDir":"dist"}}`,
			"/home/src/workspaces/project/src/a.ts":      `export const a = 1;`,
			// A directory where the JS output goes makes the write fail with TS5033.
			"/home/src/workspaces/project/dist/a.js": &fstest.MapFile{Mode: fs.ModeDir | 0o777},
		},
		commandLineArgs: []string{"-p", "."},
	}
	test.run(t, "incremental")
}
