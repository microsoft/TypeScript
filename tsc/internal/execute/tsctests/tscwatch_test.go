package tsctests

import (
	"strings"
	"testing"
)

func TestWatch(t *testing.T) {
	t.Parallel()
	testCases := []*tscInput{
		{
			subScenario: "watch with no tsconfig",
			files: FileMap{
				"/home/src/workspaces/project/index.ts": "",
			},
			commandLineArgs: []string{"index.ts", "--watch"},
		},
		{
			subScenario: "watch with tsconfig and incremental",
			files: FileMap{
				"/home/src/workspaces/project/index.ts":      "",
				"/home/src/workspaces/project/tsconfig.json": "{}",
			},
			commandLineArgs: []string{"--watch", "--incremental"},
		},
	}

	for _, test := range testCases {
		test.run(t, "commandLineWatch")
	}
}

func listToTsconfig(base string, tsconfigOpts ...string) (string, string) {
	optionString := strings.Join(tsconfigOpts, ",\n            ")
	tsconfigText := `{
	"compilerOptions": {
`
	after := "            "
	if base != "" {
		tsconfigText += "            " + base
		after = ",\n            "
	}
	if len(tsconfigOpts) != 0 {
		tsconfigText += after + optionString
	}
	tsconfigText += `
	}
}`
	return tsconfigText, optionString
}

func toTsconfig(base string, compilerOpts string) string {
	tsconfigText, _ := listToTsconfig(base, compilerOpts)
	return tsconfigText
}

func noEmitWatchTestInput(
	subScenario string,
	commandLineArgs []string,
	aText string,
	tsconfigOptions []string,
) *tscInput {
	noEmitOpt := `"noEmit": true`
	tsconfigText, optionString := listToTsconfig(noEmitOpt, tsconfigOptions...)
	return &tscInput{
		subScenario:     subScenario,
		commandLineArgs: commandLineArgs,
		files: FileMap{
			"/home/src/workspaces/project/a.ts":          aText,
			"/home/src/workspaces/project/tsconfig.json": tsconfigText,
		},
		edits: []*tscEdit{
			newTscEdit("fix error", func(sys *testSys) {
				sys.writeFileNoError("/home/src/workspaces/project/a.ts", `const a = "hello";`, false)
			}),
			newTscEdit("emit after fixing error", func(sys *testSys) {
				sys.writeFileNoError("/home/src/workspaces/project/tsconfig.json", toTsconfig("", optionString), false)
			}),
			newTscEdit("no emit run after fixing error", func(sys *testSys) {
				sys.writeFileNoError("/home/src/workspaces/project/tsconfig.json", toTsconfig(noEmitOpt, optionString), false)
			}),
			newTscEdit("introduce error", func(sys *testSys) {
				sys.writeFileNoError("/home/src/workspaces/project/a.ts", aText, false)
			}),
			newTscEdit("emit when error", func(sys *testSys) {
				sys.writeFileNoError("/home/src/workspaces/project/tsconfig.json", toTsconfig("", optionString), false)
			}),
			newTscEdit("no emit run when error", func(sys *testSys) {
				sys.writeFileNoError("/home/src/workspaces/project/tsconfig.json", toTsconfig(noEmitOpt, optionString), false)
			}),
		},
	}
}

func newTscEdit(name string, edit func(sys *testSys)) *tscEdit {
	return &tscEdit{name, []string{}, edit, ""}
}

func TestTscNoEmitWatch(t *testing.T) {
	t.Parallel()

	testCases := []*tscInput{
		noEmitWatchTestInput("syntax errors",
			[]string{"-w"},
			`const a = "hello`,
			nil,
		),
		noEmitWatchTestInput(
			"semantic errors",
			[]string{"-w"},
			`const a: number = "hello"`,
			nil,
		),
		noEmitWatchTestInput(
			"dts errors without dts enabled",
			[]string{"-w"},
			`const a = class { private p = 10; };`,
			nil,
		),
		noEmitWatchTestInput(
			"dts errors",
			[]string{"-w"},
			`const a = class { private p = 10; };`,
			[]string{`"declaration": true`},
		),
	}

	for _, test := range testCases {
		test.run(t, "noEmit")
	}
}
