package execute_test

import (
	"encoding/json"
	"fmt"
	"path/filepath"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/execute"
	"github.com/microsoft/typescript-go/internal/testutil/baseline"
)

type testTscCompile struct {
	commandLineArgs       []string
	sys                   execute.System
	modifySystem          func(fs execute.System)
	computeDtsSignatures  bool
	getWrittenFiles       bool
	baselineSourceMap     bool
	baselineReadFileCalls bool
	baselinePrograms      bool
	baselineDependencies  bool
	compile               func(sys execute.System) // CommandLineCallbacks["getPrograms"] tscWatchSystem
}

type testTscEdit struct {
	edit            func(execute.System)
	caption         string
	commandLineArgs []string
	// todo explaination func
}

type tscInput struct {
	scenario        string
	subScenario     string
	commandLineArgs []string
	sys             *testSys
	// edits       []*testTscEdit
}

func (test *tscInput) verify(t *testing.T) {
	t.Helper()
	t.Run(test.getTestName(), func(t *testing.T) {
		t.Parallel()
		t.Run("baseline for the tsc compiles", func(t *testing.T) {
			t.Parallel()
			// initial test tsc compile
			baselineBuilder := test.startBaseline()
			// baseline push sys.GetExecutingFilepath
			fmt.Fprint(baselineBuilder, strings.Join(test.commandLineArgs, " ")+"\n")
			// if (input.baselineSourceMap) generateSourceMapBasleineFiles

			parsedCommandLine, exit := execute.CommandLineTest(test.sys, nil, test.commandLineArgs)
			baselineBuilder.WriteString("\n\nExitStatus:: " + fmt.Sprint(exit))

			compilerOptionsString, _ := json.MarshalIndent(parsedCommandLine.CompilerOptions(), "", "    ")
			baselineBuilder.WriteString("\n\nCompilerOptions::")
			baselineBuilder.Write(compilerOptionsString)

			test.sys.serializeState(baselineBuilder, serializeOutputOrderBefore)
			options, name := test.getBaselineName("")
			baseline.Run(t, name, baselineBuilder.String(), options)
		})
	})
	// skip edits for now
	// todo: refactor edits into a different function
	// if input.edits != nil && len(input.edits) > 0 {
	// t.Run("tsc invocation after edit and clean build correctness", func(t *testing.T) {
	// 	for i, edit := range input.edits {
	// 		t.Run(edit.caption, func(t *testing.T) {
	// 			// todo
	// 		})
	// 	}
	// })
	// }
}

func (test *tscInput) getTestName() string {
	return "tsc " + strings.Join(test.commandLineArgs, " ") + " " + test.scenario + ":: " + test.subScenario
}

func (test *tscInput) getBaselineName(suffix string) (baseline.Options, string) {
	commandName := "tsc"
	// todo build
	// if isBuildCommand(v.data.commandLineArgs) {
	// 	commandName = "tsbuild"
	// }
	watch := ""
	// todo watch
	// if isWatch(v.data.commandLineArgs) { watch = "Watch" }

	return baseline.Options{Subfolder: filepath.Join(commandName+watch, test.scenario)},
		strings.ReplaceAll(test.subScenario, " ", "-") + suffix + ".js"
}

func (test *tscInput) startBaseline() *strings.Builder {
	s := &strings.Builder{}
	fmt.Fprint(
		s,
		"\ncurrentDirectory::",
		test.sys.GetCurrentDirectory(),
		"\nuseCaseSensitiveFileNames::",
		test.sys.FS().UseCaseSensitiveFileNames(),
		"\nInput::",
	)
	return s
}
