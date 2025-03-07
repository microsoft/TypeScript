package execute_test

import (
	"encoding/json"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/execute"
	"github.com/microsoft/typescript-go/internal/testutil/baseline"
)

func verifyWatch(t *testing.T, test *tscInput, scenario string, edits []*testTscEdit) {
	t.Helper()
	t.Run(test.getTestName(scenario), func(t *testing.T) {
		t.Parallel()
		t.Run("baseline for the tsc compiles", func(t *testing.T) {
			t.Parallel()
			baselineBuilder := test.startBaseline()

			parsedCommandLine, watcher := execute.CommandLineTestWatch(test.sys, nil, test.commandLineArgs)

			compilerOptionsString, _ := json.MarshalIndent(parsedCommandLine.CompilerOptions(), "", "    ")
			baselineBuilder.WriteString("\n\nCompilerOptions::")
			baselineBuilder.Write(compilerOptionsString)

			baselineBuilder.WriteString("\n\n")

			// build initial state
			execute.RunWatchCycle(watcher)
			test.sys.serializeState(baselineBuilder)

			for _, do := range edits {
				do.edit(test.sys)
				baselineBuilder.WriteString("\n\nEdit:: " + do.caption + "\n")

				execute.RunWatchCycle(watcher)
				test.sys.serializeState(baselineBuilder)
			}

			options, name := test.getBaselineName(scenario, true, "")
			baseline.Run(t, name, baselineBuilder.String(), options)
		})
	})
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
	sys := newTestSys(FileMap{
		"/home/src/workspaces/project/a.ts":          aText,
		"/home/src/workspaces/project/tsconfig.json": tsconfigText,
	}, "/home/src/workspaces/project")
	data := map[string]string{
		"baseOpt":      noEmitOpt,
		"originalOpts": optionString,
		"aText":        aText,
	}
	return &tscInput{
		subScenario,
		commandLineArgs,
		sys,
		data,
	}
}

func newTscEdit(name string, edit func(sys execute.System)) *testTscEdit {
	return &testTscEdit{name, []string{}, edit}
}

func TestTscNoEmitWatch(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		// Without embedding, we'd need to read all of the lib files out from disk into the MapFS.
		// Just skip this for now.
		t.Skip("bundled files are not embedded")
	}

	testCases := []*tscInput{
		noEmitWatchTestInput("syntax errors",
			[]string{"-w"},
			`const a = "hello`,
			[]string{`"outFile": "../outFile.js"`},
		),
		noEmitWatchTestInput(
			"semantic errors",
			[]string{"-w"},
			`const a: number = "hello"`,
			[]string{`"outFile": "../outFile.js"`},
		),
		noEmitWatchTestInput(
			"dts errors without dts enabled",
			[]string{"-w"},
			`const a = class { private p = 10; };`,
			[]string{`"outFile": "../outFile.js"`},
		),
		noEmitWatchTestInput(
			"dts errors",
			[]string{"-w"},
			`const a = class { private p = 10; };`,
			[]string{`"outFile": "../outFile.js"`, `"declaration": true`},
		),
	}

	for _, test := range testCases {
		//nolint:errcheck
		verifyWatch(t, test, "noEmit", []*testTscEdit{
			newTscEdit("fix syntax error", func(sys execute.System) {
				sys.FS().WriteFile("/home/src/workspaces/project/a.ts", `const a = "hello";`, false)
			}),
			newTscEdit("emit after fixing error", func(sys execute.System) {
				sys.FS().WriteFile("/home/src/workspaces/project/tsconfig.json", toTsconfig("", test.data["originalOpts"]), false)
			}),
			newTscEdit("no emit run after fixing error", func(sys execute.System) {
				sys.FS().WriteFile("/home/src/workspaces/project/tsconfig.json", toTsconfig(test.data["baseOpt"], test.data["originalOpts"]), false)
			}),
			newTscEdit("introduce error", func(sys execute.System) {
				sys.FS().WriteFile("/home/src/workspaces/project/a.ts", test.data["aText"], false)
			}),
			newTscEdit("emit when error", func(sys execute.System) {
				sys.FS().WriteFile("/home/src/workspaces/project/tsconfig.json", toTsconfig("", test.data["originalOpts"]), false)
			}),
			newTscEdit("no emit run when error", func(sys execute.System) {
				sys.FS().WriteFile("/home/src/workspaces/project/tsconfig.json", toTsconfig(test.data["baseOpt"], test.data["originalOpts"]), false)
			}),
		})
	}
}
