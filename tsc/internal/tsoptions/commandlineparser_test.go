package tsoptions

import (
	"encoding/json"
	"path/filepath"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnosticwriter"
	"github.com/microsoft/typescript-go/internal/repo"
	"github.com/microsoft/typescript-go/internal/testutil/baseline"
	"github.com/microsoft/typescript-go/internal/testutil/filefixture"
	"github.com/microsoft/typescript-go/internal/vfs"
	"gotest.tools/v3/assert"
)

func TestCommandLineParseResult(t *testing.T) {
	t.Parallel()
	repo.SkipIfNoTypeScriptSubmodule(t)

	parseCommandLineSubScenarios := []*subScenarioInput{
		// --lib es6 0.ts
		{"Parse single option of library flag", []string{"--lib", "es6", "0.ts"}},
		{"Handles may only be used with --build flags", []string{"--build", "--clean", "--dry", "--force", "--verbose"}},
		// --declarations --allowTS
		{"Handles did you mean for misspelt flags", []string{"--declarations", "--allowTS"}},
		// --lib es5,es2015.symbol.wellknown 0.ts
		{"Parse multiple options of library flags", []string{"--lib", "es5,es2015.symbol.wellknown", "0.ts"}},
		// --lib es5,invalidOption 0.ts
		{"Parse invalid option of library flags", []string{"--lib", "es5,invalidOption", "0.ts"}},
		// 0.ts --jsx
		{"Parse empty options of --jsx", []string{"0.ts", "--jsx"}},
		// 0.ts --
		{"Parse empty options of --module", []string{"0.ts", "--module"}},
		// 0.ts --newLine
		{"Parse empty options of --newLine", []string{"0.ts", "--newLine"}},
		// 0.ts --target
		{"Parse empty options of --target", []string{"0.ts", "--target"}},
		// 0.ts --moduleResolution
		{"Parse empty options of --moduleResolution", []string{"0.ts", "--moduleResolution"}},
		// 0.ts --lib
		{"Parse empty options of --lib", []string{"0.ts", "--lib"}},
		// 0.ts --lib
		// This test is an error because the empty string is falsey
		{"Parse empty string of --lib", []string{"0.ts", "--lib", ""}},
		// 0.ts --lib
		{"Parse immediately following command line argument of --lib", []string{"0.ts", "--lib", "--sourcemap"}},
		// --lib es5, es7 0.ts
		{"Parse --lib option with extra comma", []string{"--lib", "es5,", "es7", "0.ts"}},
		// --lib es5, es7 0.ts
		{"Parse --lib option with trailing white-space", []string{"--lib", "es5, ", "es7", "0.ts"}},
		// --lib es5,es2015.symbol.wellknown --target es5 0.ts
		{"Parse multiple compiler flags with input files at the end", []string{"--lib", "es5,es2015.symbol.wellknown", "--target", "es5", "0.ts"}},
		// --module commonjs --target es5 0.ts --lib es5,es2015.symbol.wellknown
		{"Parse multiple compiler flags with input files in the middle", []string{"--module", "commonjs", "--target", "es5", "0.ts", "--lib", "es5,es2015.symbol.wellknown"}},
		// --module commonjs --target es5 --lib es5 0.ts --library es2015.array,es2015.symbol.wellknown
		{"Parse multiple library compiler flags ", []string{"--module", "commonjs", "--target", "es5", "--lib", "es5", "0.ts", "--lib", "es2015.core, es2015.symbol.wellknown "}},
		{"Parse explicit boolean flag value", []string{"--strictNullChecks", "false", "0.ts"}},
		{"Parse non boolean argument after boolean flag", []string{"--noImplicitAny", "t", "0.ts"}},
		{"Parse implicit boolean flag value", []string{"--strictNullChecks"}},
		{"parse --incremental", []string{"--incremental", "0.ts"}},
		{"parse --tsBuildInfoFile", []string{"--tsBuildInfoFile", "build.tsbuildinfo", "0.ts"}},
		{"allows tsconfig only option to be set to null", []string{"--composite", "null", "-tsBuildInfoFile", "null", "0.ts"}},

		// ****** Watch Options ******
		// assertParseResult("parse --watchFile", ["--watchFile", "UseFsEvents", "0.ts"]);
		// assertParseResult("parse --watchDirectory", ["--watchDirectory", "FixedPollingInterval", "0.ts"]);
		// assertParseResult("parse --fallbackPolling", ["--fallbackPolling", "PriorityInterval", "0.ts"]);
		// assertParseResult("parse --synchronousWatchDirectory", ["--synchronousWatchDirectory", "0.ts"]);
		// assertParseResult("errors on missing argument to --fallbackPolling", ["0.ts", "--fallbackPolling"]);
		// assertParseResult("parse --excludeDirectories", ["--excludeDirectories", "**/temp", "0.ts"]);
		// assertParseResult("errors on invalid excludeDirectories", ["--excludeDirectories", "**/../*", "0.ts"]);
		// assertParseResult("parse --excludeFiles", ["--excludeFiles", "**/temp/*.ts", "0.ts"]);
		// assertParseResult("errors on invalid excludeFiles", ["--excludeFiles", "**/../*", "0.ts"]);
	}

	for _, testCase := range parseCommandLineSubScenarios {
		testCase.createSubScenario().assertParseResult(t)
	}
}

func TestParseCommandLineVerifyNull(t *testing.T) {
	t.Parallel()
	repo.SkipIfNoTypeScriptSubmodule(t)

	// run test for boolean
	subScenarioInput{"allows setting option type boolean to false", []string{"--composite", "false", "0.ts"}}.createSubScenario().assertParseResult(t)

	verifyNullSubScenarios := []verifyNull{
		{
			subScenario:  "option of type boolean",
			optionName:   "composite",
			nonNullValue: "true",
		},
		{
			subScenario: "option of type object",
			optionName:  "paths",
		},
		{
			subScenario:  "option of type list",
			optionName:   "rootDirs",
			nonNullValue: "abc,xyz",
		},
		createVerifyNullForNonNullIncluded("option of type string", CommandLineOptionTypeString, "hello"),
		createVerifyNullForNonNullIncluded("option of type number", CommandLineOptionTypeNumber, "10"),
		// todo: make the following work for tests -- currently it is difficult to do extra options of enum type
		// createVerifyNullForNonNullIncluded("option of type custom map", CommandLineOptionTypeEnum, "node"),
	}

	for _, verifyNullCase := range verifyNullSubScenarios {
		createSubScenario(
			verifyNullCase.subScenario+" allows setting it to null",
			[]string{"--" + verifyNullCase.optionName, "null", "0.ts"},
			verifyNullCase.workerDiagnostic,
		).assertParseResult(t)

		if verifyNullCase.nonNullValue != "" {
			createSubScenario(
				verifyNullCase.subScenario+" errors if non null value is passed",
				[]string{"--" + verifyNullCase.optionName, verifyNullCase.nonNullValue, "0.ts"},
				verifyNullCase.workerDiagnostic,
			).assertParseResult(t)
		}

		createSubScenario(
			verifyNullCase.subScenario+" errors if its followed by another option",
			[]string{"0.ts", "--strictNullChecks", "--" + verifyNullCase.optionName},
			verifyNullCase.workerDiagnostic,
		).assertParseResult(t)

		createSubScenario(
			verifyNullCase.subScenario+" errors if its last option",
			[]string{"0.ts", "--" + verifyNullCase.optionName},
			verifyNullCase.workerDiagnostic,
		).assertParseResult(t)
	}
}

func createVerifyNullForNonNullIncluded(subScenario string, kind CommandLineOptionKind, nonNullValue string) verifyNull {
	workerDiagnostics := getParseCommandLineWorkerDiagnostics(append(optionsDeclarations, &CommandLineOption{
		Name:                    "optionName",
		Kind:                    kind,
		isTSConfigOnly:          true,
		category:                diagnostics.Backwards_Compatibility,
		description:             diagnostics.Enable_project_compilation,
		defaultValueDescription: nil,
	}))

	return verifyNull{
		subScenario:      subScenario,
		optionName:       "optionName",
		nonNullValue:     nonNullValue,
		workerDiagnostic: workerDiagnostics,
	}
}

func (f commandLineSubScenario) assertParseResult(t *testing.T) {
	t.Helper()
	t.Run(f.testName, func(t *testing.T) {
		t.Parallel()
		originalBaseline := f.baseline.ReadFile(t)
		tsBaseline := parseExistingCompilerBaseline(t, originalBaseline)

		// f.workerDiagnostic is either defined or set to default pointer in `createSubScenario`
		parsed := parseCommandLineWorker(f.workerDiagnostic, f.commandLine, vfs.FromOS())

		newBaselineFileNames := strings.Join(parsed.fileNames, ",")
		assert.Equal(t, tsBaseline.fileNames, newBaselineFileNames)

		o, _ := json.Marshal(parsed.options)
		newParsedCompilerOptions := core.CompilerOptions{}
		e := json.Unmarshal(o, &newParsedCompilerOptions)
		assert.NilError(t, e)
		assert.DeepEqual(t, tsBaseline.options, newParsedCompilerOptions)

		var formattedErrors strings.Builder
		diagnosticwriter.WriteFormatDiagnostics(&formattedErrors, parsed.errors, &diagnosticwriter.FormattingOptions{NewLine: "\n"})
		newBaselineErrors := formattedErrors.String()

		// !!!
		// useful for debugging--compares the new errors with the old errors. currently will NOT pass because of unimplemented options, not completely identical enum options, etc
		// assert.Equal(t, tsBaseline.errors, newBaseline)

		baseline.Run(t, f.testName+".js", formatNewBaseline(f.commandLine, o, newBaselineFileNames, newBaselineErrors), baseline.Options{Subfolder: "tsoptions/commandLineParsing"})
	})
}

func (f *commandLineSubScenario) getBaselineName() (baseline.Options, string) {
	return baseline.Options{Subfolder: "tsoptions/commandLineParsing"}, f.testName
}

func parseExistingCompilerBaseline(t *testing.T, baseline string) *TestCommandLineParser {
	_, rest, _ := strings.Cut(baseline, "CompilerOptions::\n")
	compilerOptions, rest, _ := strings.Cut(rest, "\nWatchOptions::\n")
	_, rest, _ = strings.Cut(rest, "\nFileNames::\n")
	fileNames, errors, _ := strings.Cut(rest, "\nErrors::\n")

	baselineOptions := &core.CompilerOptions{}
	e := json.Unmarshal([]byte(compilerOptions), &baselineOptions)
	assert.NilError(t, e)

	parser := TestCommandLineParser{
		options:   *baselineOptions,
		fileNames: fileNames,
		errors:    errors,
	}
	return &parser
}

// todo: used in baseline writing
func formatNewBaseline(
	commandLine []string,
	opts []byte,
	fileNames string,
	errors string,
) string {
	var formatted strings.Builder
	formatted.WriteString("Args::\n")
	formatted.WriteString("[\"" + strings.Join(commandLine, "\", \"") + "\"]")
	formatted.WriteString("\n\nCompilerOptions::\n")
	formatted.Write(opts)
	// todo: watch options not implemented
	// formatted.WriteString("WatchOptions::\n")
	formatted.WriteString("\n\nFileNames::\n")
	formatted.WriteString(fileNames)
	formatted.WriteString("\n\nErrors::\n")
	formatted.WriteString(errors)
	return formatted.String()
}

// todo: --build not implemented
// func parseExistingBuildBaseline(baseline string) *TestCommandLineParser {
// 	_, rest, _ := strings.Cut(baseline, "BuildOptions::\n")
// 	buildOptions, rest, _ := strings.Cut(rest, "\nWatchOptions::\n")
// 	_, rest, _ = strings.Cut(rest, "\nProjects::\n")
// 	fileNames, errors, _ := strings.Cut(rest, "\nErrors::\n")

// 	// todo: change CompilerOptions to buildoptions
// 	baselineOptions := &core.CompilerOptions{}
// 	json.Unmarshal([]byte(buildOptions), &baselineOptions)

// 	var parser = TestCommandLineParser{
// 		options:   *baselineOptions,
// 		fileNames: fileNames,
// 		errors:    errors,
// 	}
// 	return &parser
// }

func createSubScenario(subScenarioName string, commandline []string, d ...*ParseCommandLineWorkerDiagnostics) *commandLineSubScenario {
	baselineFileName := "tests/baselines/reference/config/commandLineParsing/parseCommandLine/" + subScenarioName + ".js"
	var workerDiagnostic *ParseCommandLineWorkerDiagnostics

	// d is used for optional workerDiagnostic
	if d == nil || d[0] == nil {
		workerDiagnostic = CompilerOptionsDidYouMeanDiagnostics
	} else {
		workerDiagnostic = d[0]
	}

	return &commandLineSubScenario{
		filefixture.FromFile(subScenarioName, filepath.Join(repo.TypeScriptSubmodulePath, baselineFileName)),
		subScenarioName,
		commandline,
		workerDiagnostic,
	}
}

type subScenarioInput struct {
	name            string
	commandLineArgs []string
}

func (f subScenarioInput) createSubScenario() *commandLineSubScenario {
	return createSubScenario(f.name, f.commandLineArgs)
}

type commandLineSubScenario struct {
	baseline         filefixture.Fixture
	testName         string
	commandLine      []string
	workerDiagnostic *ParseCommandLineWorkerDiagnostics
}

type verifyNull struct {
	subScenario      string
	optionName       string
	nonNullValue     string
	workerDiagnostic *ParseCommandLineWorkerDiagnostics
}

type TestCommandLineParser struct {
	options           core.CompilerOptions
	fileNames, errors string
}

func TestAffectsBuildInfo(t *testing.T) {
	t.Parallel()
	t.Run("should have affectsBuildInfo true for every option with affectsSemanticDiagnostics", func(t *testing.T) {
		t.Parallel()
		for _, option := range optionsDeclarations {
			if option.affectsSemanticDiagnostics {
				// semantic diagnostics affect the build info, so ensure they're included
				assert.Assert(t, option.affectsBuildInfo)
			}
		}
	})
}
