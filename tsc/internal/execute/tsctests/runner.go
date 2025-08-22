package tsctests

import (
	"fmt"
	"path/filepath"
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/execute"
	"github.com/microsoft/typescript-go/internal/execute/tsc"
	"github.com/microsoft/typescript-go/internal/testutil/baseline"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type tscEdit struct {
	caption         string
	commandLineArgs []string
	edit            func(*testSys)
	expectedDiff    string
}

var noChange = &tscEdit{
	caption: "no change",
}

var noChangeOnlyEdit = []*tscEdit{
	noChange,
}

type tscInput struct {
	subScenario      string
	commandLineArgs  []string
	files            FileMap
	cwd              string
	edits            []*tscEdit
	env              map[string]string
	ignoreCase       bool
	windowsStyleRoot string
}

func (test *tscInput) executeCommand(sys *testSys, baselineBuilder *strings.Builder, commandLineArgs []string) tsc.CommandLineResult {
	fmt.Fprint(baselineBuilder, "tsgo ", strings.Join(commandLineArgs, " "), "\n")
	result := execute.CommandLine(sys, commandLineArgs, sys)
	switch result.Status {
	case tsc.ExitStatusSuccess:
		baselineBuilder.WriteString("ExitStatus:: Success")
	case tsc.ExitStatusDiagnosticsPresent_OutputsSkipped:
		baselineBuilder.WriteString("ExitStatus:: DiagnosticsPresent_OutputsSkipped")
	case tsc.ExitStatusDiagnosticsPresent_OutputsGenerated:
		baselineBuilder.WriteString("ExitStatus:: DiagnosticsPresent_OutputsGenerated")
	case tsc.ExitStatusInvalidProject_OutputsSkipped:
		baselineBuilder.WriteString("ExitStatus:: InvalidProject_OutputsSkipped")
	case tsc.ExitStatusProjectReferenceCycle_OutputsSkipped:
		baselineBuilder.WriteString("ExitStatus:: ProjectReferenceCycle_OutputsSkipped")
	case tsc.ExitStatusNotImplemented:
		baselineBuilder.WriteString("ExitStatus:: NotImplemented")
	default:
		panic(fmt.Sprintf("UnknownExitStatus %d", result.Status))
	}
	return result
}

func (test *tscInput) run(t *testing.T, scenario string) {
	t.Helper()
	t.Run(test.getBaselineSubFolder()+"/"+test.subScenario, func(t *testing.T) {
		t.Parallel()
		// initial test tsc compile
		baselineBuilder := &strings.Builder{}
		sys := newTestSys(test, false)
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
		sys.baselinePrograms(baselineBuilder)
		var unexpectedDiff string

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

				if result.Watcher == nil {
					result = test.executeCommand(sys, baselineBuilder, commandLineArgs)
				} else {
					result.Watcher.DoCycle()
				}
				sys.serializeState(baselineBuilder)
				sys.baselinePrograms(baselineBuilder)
			})
			wg.Queue(func() {
				// Compute build with all the edits
				nonIncrementalSys = newTestSys(test, true)
				for i := range index + 1 {
					if test.edits[i].edit != nil {
						test.edits[i].edit(nonIncrementalSys)
					}
				}
				execute.CommandLine(nonIncrementalSys, commandLineArgs, nonIncrementalSys)
			})
			wg.RunAndWait()

			diff := getDiffForIncremental(sys, nonIncrementalSys)
			if diff != "" {
				baselineBuilder.WriteString(fmt.Sprintf("\n\nDiff:: %s\n", core.IfElse(do.expectedDiff == "", "!!! Unexpected diff, please review and either fix or write explanation as expectedDiff !!!", do.expectedDiff)))
				baselineBuilder.WriteString(diff)
				if do.expectedDiff == "" {
					unexpectedDiff += fmt.Sprintf("Edit [%d]:: %s\n!!! Unexpected diff, please review and either fix or write explanation as expectedDiff !!!\n%s\n", index, do.caption, diff)
				}
			} else if do.expectedDiff != "" {
				baselineBuilder.WriteString(fmt.Sprintf("\n\nDiff:: %s !!! Diff not found but explanation present, please review and remove the explanation !!!\n", do.expectedDiff))
				unexpectedDiff += fmt.Sprintf("Edit [%d]:: %s\n!!! Diff not found but explanation present, please review and remove the explanation !!!\n", index, do.caption)
			}
		}
		baseline.Run(t, strings.ReplaceAll(test.subScenario, " ", "-")+".js", baselineBuilder.String(), baseline.Options{Subfolder: filepath.Join(test.getBaselineSubFolder(), scenario)})
		if unexpectedDiff != "" {
			t.Errorf("Test %s has unexpected diff %s with incremental build, please review the baseline file", test.subScenario, unexpectedDiff)
		}
	})
}

func getDiffForIncremental(incrementalSys *testSys, nonIncrementalSys *testSys) string {
	var diffBuilder strings.Builder

	nonIncrementalOutputs := nonIncrementalSys.fs.writtenFiles.ToSlice()
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

	incrementalOutput := incrementalSys.getOutput(true)
	nonIncrementalOutput := nonIncrementalSys.getOutput(true)
	if incrementalOutput != nonIncrementalOutput {
		diffBuilder.WriteString(baseline.DiffText("nonIncremental.output.txt", "incremental.output.txt", nonIncrementalOutput, incrementalOutput))
	}
	return diffBuilder.String()
}

func (test *tscInput) getBaselineSubFolder() string {
	commandName := "tsc"
	if slices.ContainsFunc(test.commandLineArgs, func(arg string) bool {
		switch arg {
		case "-b", "--b", "-build", "--build":
			return true
		}
		return false
	}) {
		commandName = "tsbuild"
	}
	w := ""
	if slices.ContainsFunc(test.commandLineArgs, func(arg string) bool {
		switch arg {
		case "-w", "--w", "-watch", "--watch":
			return true
		}
		return false
	}) {
		w = "Watch"
	}
	return commandName + w
}
