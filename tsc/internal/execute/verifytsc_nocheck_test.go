package execute_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
)

type noCheckScenario struct {
	subscenario string
	aText       string
}

func TestNoCheck(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		// Without embedding, we'd need to read all of the lib files out from disk into the MapFS.
		// Just skip this for now.
		t.Skip("bundled files are not embedded")
	}
	cases := []noCheckScenario{
		{"syntax errors", `export const a = "hello`},
		{"semantic errors", `export const a: number = "hello";`},
		{"dts errors", `export const a = class { private p = 10; };`},
	}
	for _, c := range cases {
		(&tscInput{
			subScenario: "outFile/" + c.subscenario,
			sys: newTestSys(FileMap{
				"/home/src/workspaces/project/a.ts": c.aText,
				"/home/src/workspaces/project/b.ts": `export const b = 10;`,
				"/home/src/workspaces/project/tsconfig.json": `{
	"compilerOptions": {
		"declaration": true,
	}
}`,
				// incremental: undefined, true
				// ...options: {}, {module: amd, outfile: "outfile.js"}
			}, "/home/src/workspaces/project"),
			commandLineArgs: []string{"--noCheck", "--outFile", "built"},
		}).verify(t, "noCheck")
	}
}
