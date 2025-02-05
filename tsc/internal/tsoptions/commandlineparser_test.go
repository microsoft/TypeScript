package tsoptions_test

import (
	"encoding/json"
	"path/filepath"
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnosticwriter"
	"github.com/microsoft/typescript-go/internal/repo"
	"github.com/microsoft/typescript-go/internal/testutil/baseline"
	"github.com/microsoft/typescript-go/internal/testutil/filefixture"
	"github.com/microsoft/typescript-go/internal/tsoptions"
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
		{"parse --watchFile", []string{"--watchFile", "UseFsEvents", "0.ts"}},
		{"parse --watchDirectory", []string{"--watchDirectory", "FixedPollingInterval", "0.ts"}},
		{"parse --fallbackPolling", []string{"--fallbackPolling", "PriorityInterval", "0.ts"}},
		{"parse --synchronousWatchDirectory", []string{"--synchronousWatchDirectory", "0.ts"}},
		{"errors on missing argument to --fallbackPolling", []string{"0.ts", "--fallbackPolling"}},
		{"parse --excludeDirectories", []string{"--excludeDirectories", "**/temp", "0.ts"}},
		{"errors on invalid excludeDirectories", []string{"--excludeDirectories", "**/../*", "0.ts"}},
		{"parse --excludeFiles", []string{"--excludeFiles", "**/temp/*.ts", "0.ts"}},
		{"errors on invalid excludeFiles", []string{"--excludeFiles", "**/../*", "0.ts"}},
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
		createVerifyNullForNonNullIncluded("option of type string", tsoptions.CommandLineOptionTypeString, "hello"),
		createVerifyNullForNonNullIncluded("option of type number", tsoptions.CommandLineOptionTypeNumber, "10"),
		// todo: make the following work for tests -- currently it is difficult to do extra options of enum type
		// createVerifyNullForNonNullIncluded("option of type custom map", CommandLineOptionTypeEnum, "node"),
	}

	for _, verifyNullCase := range verifyNullSubScenarios {
		createSubScenario(
			verifyNullCase.subScenario+" allows setting it to null",
			[]string{"--" + verifyNullCase.optionName, "null", "0.ts"},
			verifyNullCase.optDecls,
		).assertParseResult(t)

		if verifyNullCase.nonNullValue != "" {
			createSubScenario(
				verifyNullCase.subScenario+" errors if non null value is passed",
				[]string{"--" + verifyNullCase.optionName, verifyNullCase.nonNullValue, "0.ts"},
				verifyNullCase.optDecls,
			).assertParseResult(t)
		}

		createSubScenario(
			verifyNullCase.subScenario+" errors if its followed by another option",
			[]string{"0.ts", "--strictNullChecks", "--" + verifyNullCase.optionName},
			verifyNullCase.optDecls,
		).assertParseResult(t)

		createSubScenario(
			verifyNullCase.subScenario+" errors if its last option",
			[]string{"0.ts", "--" + verifyNullCase.optionName},
			verifyNullCase.optDecls,
		).assertParseResult(t)
	}
}

func createVerifyNullForNonNullIncluded(subScenario string, kind tsoptions.CommandLineOptionKind, nonNullValue string) verifyNull {
	return verifyNull{
		subScenario:  subScenario,
		optionName:   "optionName",
		nonNullValue: nonNullValue,
		optDecls: slices.Concat(tsoptions.OptionsDeclarations, []*tsoptions.CommandLineOption{{
			Name:                    "optionName",
			Kind:                    kind,
			IsTSConfigOnly:          true,
			Category:                diagnostics.Backwards_Compatibility,
			Description:             diagnostics.Enable_project_compilation,
			DefaultValueDescription: nil,
		}}),
	}
}

func (f commandLineSubScenario) assertParseResult(t *testing.T) {
	t.Helper()
	t.Run(f.testName, func(t *testing.T) {
		t.Parallel()
		originalBaseline := f.baseline.ReadFile(t)
		tsBaseline := parseExistingCompilerBaseline(t, originalBaseline)

		// f.workerDiagnostic is either defined or set to default pointer in `createSubScenario`
		parsed := tsoptions.ParseCommandLineTestWorker(f.optDecls, f.commandLine, vfs.FromOS())

		newBaselineFileNames := strings.Join(parsed.FileNames, ",")
		assert.Equal(t, tsBaseline.fileNames, newBaselineFileNames)

		o, _ := json.Marshal(parsed.Options)
		newParsedCompilerOptions := core.CompilerOptions{}
		e := json.Unmarshal(o, &newParsedCompilerOptions)
		assert.NilError(t, e)
		assert.DeepEqual(t, tsBaseline.options, newParsedCompilerOptions)

		newParsedWatchOptions := core.WatchOptions{}
		e = json.Unmarshal(o, &newParsedWatchOptions)
		assert.NilError(t, e)

		// !!! useful for debugging but will not pass due to `none` as enum options
		// assert.DeepEqual(t, tsBaseline.watchoptions, newParsedWatchOptions)

		var formattedErrors strings.Builder
		diagnosticwriter.WriteFormatDiagnostics(&formattedErrors, parsed.Errors, &diagnosticwriter.FormattingOptions{NewLine: "\n"})
		newBaselineErrors := formattedErrors.String()

		// !!!
		// useful for debugging--compares the new errors with the old errors. currently will NOT pass because of unimplemented options, not completely identical enum options, etc
		// assert.Equal(t, tsBaseline.errors, newBaselineErrors)

		baseline.Run(t, f.testName+".js", formatNewBaseline(f.commandLine, o, newBaselineFileNames, newBaselineErrors), baseline.Options{Subfolder: "tsoptions/commandLineParsing"})
	})
}

func (f *commandLineSubScenario) getBaselineName() (baseline.Options, string) {
	return baseline.Options{Subfolder: "tsoptions/commandLineParsing"}, f.testName
}

func parseExistingCompilerBaseline(t *testing.T, baseline string) *TestCommandLineParser {
	_, rest, _ := strings.Cut(baseline, "CompilerOptions::\n")
	compilerOptions, rest, watchFound := strings.Cut(rest, "\nWatchOptions::\n")
	watchOptions, rest, _ := strings.Cut(rest, "\nFileNames::\n")
	fileNames, errors, _ := strings.Cut(rest, "\nErrors::\n")

	baselineCompilerOptions := &core.CompilerOptions{}
	e := json.Unmarshal([]byte(compilerOptions), &baselineCompilerOptions)
	assert.NilError(t, e)

	baselineWatchOptions := &core.WatchOptions{}
	if watchFound && watchOptions != "" {
		e2 := json.Unmarshal([]byte(watchOptions), &baselineWatchOptions)
		assert.NilError(t, e2)
	}

	return &TestCommandLineParser{
		options:      *baselineCompilerOptions,
		watchoptions: *baselineWatchOptions,
		fileNames:    fileNames,
		errors:       errors,
	}
}

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

func createSubScenario(subScenarioName string, commandline []string, opts ...[]*tsoptions.CommandLineOption) *commandLineSubScenario {
	baselineFileName := "tests/baselines/reference/config/commandLineParsing/parseCommandLine/" + subScenarioName + ".js"

	result := &commandLineSubScenario{
		filefixture.FromFile(subScenarioName, filepath.Join(repo.TypeScriptSubmodulePath, baselineFileName)),
		subScenarioName,
		commandline,
		nil,
	}
	if len(opts) > 0 {
		result.optDecls = opts[0]
	}
	return result
}

type subScenarioInput struct {
	name            string
	commandLineArgs []string
}

func (f subScenarioInput) createSubScenario() *commandLineSubScenario {
	return createSubScenario(f.name, f.commandLineArgs)
}

type commandLineSubScenario struct {
	baseline    filefixture.Fixture
	testName    string
	commandLine []string
	optDecls    []*tsoptions.CommandLineOption
}

type verifyNull struct {
	subScenario  string
	optionName   string
	nonNullValue string
	optDecls     []*tsoptions.CommandLineOption
}

type TestCommandLineParser struct {
	options           core.CompilerOptions
	watchoptions      core.WatchOptions
	fileNames, errors string
}

func TestAffectsBuildInfo(t *testing.T) {
	t.Parallel()
	t.Run("should have affectsBuildInfo true for every option with affectsSemanticDiagnostics", func(t *testing.T) {
		t.Parallel()
		for _, option := range tsoptions.OptionsDeclarations {
			if option.AffectsSemanticDiagnostics {
				// semantic diagnostics affect the build info, so ensure they're included
				assert.Assert(t, option.AffectsBuildInfo)
			}
		}
	})
}
