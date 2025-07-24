package execute_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/testutil/stringtestutil"
)

type noCheckScenario struct {
	subscenario string
	aText       string
}

func TestNoCheck(t *testing.T) {
	t.Parallel()
	cases := []noCheckScenario{
		{"syntax errors", `export const a = "hello`},
		{"semantic errors", `export const a: number = "hello";`},
		{"dts errors", `export const a = class { private p = 10; };`},
	}
	for _, c := range cases {
		(&tscInput{
			subScenario: c.subscenario,
			files: FileMap{
				"/home/src/workspaces/project/a.ts": c.aText,
				"/home/src/workspaces/project/b.ts": `export const b = 10;`,
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"declaration": true,
					}
				}`),
				// incremental: undefined, true
			},
			commandLineArgs: []string{"--noCheck"},
		}).run(t, "noCheck")
	}
}
