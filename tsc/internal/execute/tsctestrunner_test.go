package execute_test

import (
	"fmt"
	"path/filepath"
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/execute"
	"github.com/microsoft/typescript-go/internal/testutil/baseline"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type testTscEdit struct {
	caption         string
	commandLineArgs []string
	edit            func(*testSys)
	expectedDiff    string
}

var noChange = &testTscEdit{
	caption: "no change",
}

var noChangeOnlyEdit = []*testTscEdit{
	noChange,
}

type tscInput struct {
	subScenario     string
	commandLineArgs []string
	files           FileMap
	cwd             string
	edits           []*testTscEdit
}

func (test *tscInput) executeCommand(sys *testSys, baselineBuilder *strings.Builder, commandLineArgs []string) execute.CommandLineResult {
	fmt.Fprint(baselineBuilder, "tsgo ", strings.Join(commandLineArgs, " "), "\n")
	result := execute.CommandLine(sys, commandLineArgs, true)
	switch result.Status {
	case execute.ExitStatusSuccess:
		baselineBuilder.WriteString("ExitStatus:: Success")
	case execute.ExitStatusDiagnosticsPresent_OutputsSkipped:
		baselineBuilder.WriteString("ExitStatus:: DiagnosticsPresent_OutputsSkipped")
	case execute.ExitStatusDiagnosticsPresent_OutputsGenerated:
		baselineBuilder.WriteString("ExitStatus:: DiagnosticsPresent_OutputsGenerated")
	case execute.ExitStatusInvalidProject_OutputsSkipped:
		baselineBuilder.WriteString("ExitStatus:: InvalidProject_OutputsSkipped")
	case execute.ExitStatusProjectReferenceCycle_OutputsSkipped:
		baselineBuilder.WriteString("ExitStatus:: ProjectReferenceCycle_OutputsSkipped")
	case execute.ExitStatusNotImplemented:
		baselineBuilder.WriteString("ExitStatus:: NotImplemented")
	default:
		panic(fmt.Sprintf("UnknownExitStatus %d", result.Status))
	}
	return result
}

func (test *tscInput) run(t *testing.T, scenario string) {
	t.Helper()
	t.Run(test.subScenario+" tsc baseline", func(t *testing.T) {
		t.Parallel()
		// initial test tsc compile
		baselineBuilder := &strings.Builder{}
		sys := newTestSys(test.files, test.cwd)
		fmt.Fprint(
			baselineBuilder,
			"currentDirectory::",
			sys.GetCurrentDirectory(),
			"\nuseCaseSensitiveFileNames::",
			sys.FS().UseCaseSensitiveFileNames(),
			"\nInput::\n",
		)
		sys.baselineFSwithDiff(baselineBuilder)
		result := test.executeCommand(sys, baselineBuilder, test.commandLineArgs)
		sys.serializeState(baselineBuilder)
		sys.baselineProgram(baselineBuilder, result.IncrementalProgram, result.Watcher)

		for index, do := range test.edits {
			sys.clearOutput()
			wg := core.NewWorkGroup(false)
			var nonIncrementalSys *testSys
			commandLineArgs := core.IfElse(do.commandLineArgs == nil, test.commandLineArgs, do.commandLineArgs)
			wg.Queue(func() {
				baselineBuilder.WriteString(fmt.Sprintf("\n\nEdit [%d]:: %s\n", index, do.caption))
				if do.edit != nil {
					do.edit(sys)
				}
				sys.baselineFSwithDiff(baselineBuilder)

				var editResult execute.CommandLineResult
				if result.Watcher == nil {
					editResult = test.executeCommand(sys, baselineBuilder, commandLineArgs)
				} else {
					result.Watcher.DoCycle()
				}
				sys.serializeState(baselineBuilder)
				sys.baselineProgram(baselineBuilder, editResult.IncrementalProgram, result.Watcher)
			})
			wg.Queue(func() {
				// Compute build with all the edits
				nonIncrementalSys = newTestSys(test.files, test.cwd)
				for i := range index + 1 {
					if test.edits[i].edit != nil {
						test.edits[i].edit(nonIncrementalSys)
					}
				}
				execute.CommandLine(nonIncrementalSys, commandLineArgs, true)
			})
			wg.RunAndWait()

			diff := getDiffForIncremental(sys, nonIncrementalSys)
			if diff != "" {
				baselineBuilder.WriteString(fmt.Sprintf("\n\nDiff:: %s\n", core.IfElse(do.expectedDiff == "", "!!! Unexpected diff, please review and either fix or write explanation as expectedDiff !!!", do.expectedDiff)))
				baselineBuilder.WriteString(diff)
			} else if do.expectedDiff != "" {
				baselineBuilder.WriteString(fmt.Sprintf("\n\nDiff:: %s !!! Diff not found but explanation present, please review and remove the explanation !!!\n", do.expectedDiff))
			}
		}
		baseline.Run(t, strings.ReplaceAll(test.subScenario, " ", "-")+".js", baselineBuilder.String(), baseline.Options{Subfolder: filepath.Join(test.getBaselineSubFolder(), scenario)})
	})
}

func getDiffForIncremental(incrementalSys *testSys, nonIncrementalSys *testSys) string {
	var diffBuilder strings.Builder

	nonIncrementalOutputs := nonIncrementalSys.testFs().writtenFiles.ToSlice()
	slices.Sort(nonIncrementalOutputs)
	for _, nonIncrementalOutput := range nonIncrementalOutputs {
		if tspath.FileExtensionIs(nonIncrementalOutput, tspath.ExtensionTsBuildInfo) ||
			strings.HasSuffix(nonIncrementalOutput, ".readable.baseline.txt") {
			// Just check existence
			if !incrementalSys.fsFromFileMap().FileExists(nonIncrementalOutput) {
				diffBuilder.WriteString(baseline.DiffText("nonIncremental "+nonIncrementalOutput, "incremental "+nonIncrementalOutput, "Exists", ""))
				diffBuilder.WriteString("\n")
			}
		} else {
			nonIncrementalText, ok := nonIncrementalSys.fsFromFileMap().ReadFile(nonIncrementalOutput)
			if !ok {
				panic("Written file not found " + nonIncrementalOutput)
			}
			incrementalText, ok := incrementalSys.fsFromFileMap().ReadFile(nonIncrementalOutput)
			if !ok || incrementalText != nonIncrementalText {
				diffBuilder.WriteString(baseline.DiffText("nonIncremental "+nonIncrementalOutput, "incremental "+nonIncrementalOutput, nonIncrementalText, incrementalText))
				diffBuilder.WriteString("\n")
			}
		}
	}

	incrementalErrors := strings.Join(incrementalSys.output, "")
	nonIncrementalErrors := strings.Join(nonIncrementalSys.output, "")
	if incrementalErrors != nonIncrementalErrors {
		diffBuilder.WriteString(baseline.DiffText("nonIncremental errors.txt", "incremental errors.txt", nonIncrementalErrors, incrementalErrors))
	}
	return diffBuilder.String()
}

func (test *tscInput) getBaselineSubFolder() string {
	commandName := "tsc"
	if slices.ContainsFunc(test.commandLineArgs, func(arg string) bool {
		return arg == "--build" || arg == "-b"
	}) {
		commandName = "tsbuild"
	}
	w := ""
	if slices.ContainsFunc(test.commandLineArgs, func(arg string) bool {
		return arg == "--watch" || arg == "-w"
	}) {
		w = "Watch"
	}
	return commandName + w
}
