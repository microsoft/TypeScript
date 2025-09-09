package execute

import (
	"context"
	"fmt"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/execute/build"
	"github.com/microsoft/typescript-go/internal/execute/incremental"
	"github.com/microsoft/typescript-go/internal/execute/tsc"
	"github.com/microsoft/typescript-go/internal/format"
	"github.com/microsoft/typescript-go/internal/jsonutil"
	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/microsoft/typescript-go/internal/pprof"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

func CommandLine(sys tsc.System, commandLineArgs []string, testing tsc.CommandLineTesting) tsc.CommandLineResult {
	if len(commandLineArgs) > 0 {
		// !!! build mode
		switch strings.ToLower(commandLineArgs[0]) {
		case "-b", "--b", "-build", "--build":
			return tscBuildCompilation(sys, tsoptions.ParseBuildCommandLine(commandLineArgs, sys), testing)
			// case "-f":
			// 	return fmtMain(sys, commandLineArgs[1], commandLineArgs[1])
		}
	}

	return tscCompilation(sys, tsoptions.ParseCommandLine(commandLineArgs, sys), testing)
}

func fmtMain(sys tsc.System, input, output string) tsc.ExitStatus {
	ctx := format.WithFormatCodeSettings(context.Background(), format.GetDefaultFormatCodeSettings("\n"), "\n")
	input = string(tspath.ToPath(input, sys.GetCurrentDirectory(), sys.FS().UseCaseSensitiveFileNames()))
	output = string(tspath.ToPath(output, sys.GetCurrentDirectory(), sys.FS().UseCaseSensitiveFileNames()))
	fileContent, ok := sys.FS().ReadFile(input)
	if !ok {
		fmt.Fprintln(sys.Writer(), "File not found:", input)
		return tsc.ExitStatusNotImplemented
	}
	text := fileContent
	pathified := tspath.ToPath(input, sys.GetCurrentDirectory(), true)
	sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName:         string(pathified),
		Path:             pathified,
		JSDocParsingMode: ast.JSDocParsingModeParseAll,
	}, text, core.GetScriptKindFromFileName(string(pathified)))
	edits := format.FormatDocument(ctx, sourceFile)
	newText := core.ApplyBulkEdits(text, edits)

	if err := sys.FS().WriteFile(output, newText, false); err != nil {
		fmt.Fprintln(sys.Writer(), err.Error())
		return tsc.ExitStatusNotImplemented
	}
	return tsc.ExitStatusSuccess
}

func tscBuildCompilation(sys tsc.System, buildCommand *tsoptions.ParsedBuildCommandLine, testing tsc.CommandLineTesting) tsc.CommandLineResult {
	reportDiagnostic := tsc.CreateDiagnosticReporter(sys, sys.Writer(), buildCommand.CompilerOptions)

	// if (buildOptions.locale) {
	//     validateLocaleAndSetLanguage(buildOptions.locale, sys, errors);
	// }

	if len(buildCommand.Errors) > 0 {
		for _, err := range buildCommand.Errors {
			reportDiagnostic(err)
		}
		return tsc.CommandLineResult{Status: tsc.ExitStatusDiagnosticsPresent_OutputsSkipped}
	}

	if pprofDir := buildCommand.CompilerOptions.PprofDir; pprofDir != "" {
		// !!! stderr?
		profileSession := pprof.BeginProfiling(pprofDir, sys.Writer())
		defer profileSession.Stop()
	}

	if buildCommand.CompilerOptions.Help.IsTrue() {
		tsc.PrintVersion(sys)
		tsc.PrintBuildHelp(sys, tsoptions.BuildOpts)
		return tsc.CommandLineResult{Status: tsc.ExitStatusSuccess}
	}

	orchestrator := build.NewOrchestrator(build.Options{
		Sys:     sys,
		Command: buildCommand,
		Testing: testing,
	})
	return orchestrator.Start()
}

func tscCompilation(sys tsc.System, commandLine *tsoptions.ParsedCommandLine, testing tsc.CommandLineTesting) tsc.CommandLineResult {
	configFileName := ""
	reportDiagnostic := tsc.CreateDiagnosticReporter(sys, sys.Writer(), commandLine.CompilerOptions())
	// if commandLine.Options().Locale != nil

	if len(commandLine.Errors) > 0 {
		for _, e := range commandLine.Errors {
			reportDiagnostic(e)
		}
		return tsc.CommandLineResult{Status: tsc.ExitStatusDiagnosticsPresent_OutputsSkipped}
	}

	if pprofDir := commandLine.CompilerOptions().PprofDir; pprofDir != "" {
		// !!! stderr?
		profileSession := pprof.BeginProfiling(pprofDir, sys.Writer())
		defer profileSession.Stop()
	}

	if commandLine.CompilerOptions().Init.IsTrue() {
		return tsc.CommandLineResult{Status: tsc.ExitStatusNotImplemented}
	}

	if commandLine.CompilerOptions().Version.IsTrue() {
		tsc.PrintVersion(sys)
		return tsc.CommandLineResult{Status: tsc.ExitStatusSuccess}
	}

	if commandLine.CompilerOptions().Help.IsTrue() || commandLine.CompilerOptions().All.IsTrue() {
		tsc.PrintHelp(sys, commandLine)
		return tsc.CommandLineResult{Status: tsc.ExitStatusSuccess}
	}

	if commandLine.CompilerOptions().Watch.IsTrue() && commandLine.CompilerOptions().ListFilesOnly.IsTrue() {
		reportDiagnostic(ast.NewCompilerDiagnostic(diagnostics.Options_0_and_1_cannot_be_combined, "watch", "listFilesOnly"))
		return tsc.CommandLineResult{Status: tsc.ExitStatusDiagnosticsPresent_OutputsSkipped}
	}

	if commandLine.CompilerOptions().Project != "" {
		if len(commandLine.FileNames()) != 0 {
			reportDiagnostic(ast.NewCompilerDiagnostic(diagnostics.Option_project_cannot_be_mixed_with_source_files_on_a_command_line))
			return tsc.CommandLineResult{Status: tsc.ExitStatusDiagnosticsPresent_OutputsSkipped}
		}

		fileOrDirectory := tspath.NormalizePath(commandLine.CompilerOptions().Project)
		if sys.FS().DirectoryExists(fileOrDirectory) {
			configFileName = tspath.CombinePaths(fileOrDirectory, "tsconfig.json")
			if !sys.FS().FileExists(configFileName) {
				reportDiagnostic(ast.NewCompilerDiagnostic(diagnostics.Cannot_find_a_tsconfig_json_file_at_the_current_directory_Colon_0, configFileName))
				return tsc.CommandLineResult{Status: tsc.ExitStatusDiagnosticsPresent_OutputsSkipped}
			}
		} else {
			configFileName = fileOrDirectory
			if !sys.FS().FileExists(configFileName) {
				reportDiagnostic(ast.NewCompilerDiagnostic(diagnostics.The_specified_path_does_not_exist_Colon_0, fileOrDirectory))
				return tsc.CommandLineResult{Status: tsc.ExitStatusDiagnosticsPresent_OutputsSkipped}
			}
		}
	} else if len(commandLine.FileNames()) == 0 {
		searchPath := tspath.NormalizePath(sys.GetCurrentDirectory())
		configFileName = findConfigFile(searchPath, sys.FS().FileExists, "tsconfig.json")
	}

	if configFileName == "" && len(commandLine.FileNames()) == 0 {
		if commandLine.CompilerOptions().ShowConfig.IsTrue() {
			reportDiagnostic(ast.NewCompilerDiagnostic(diagnostics.Cannot_find_a_tsconfig_json_file_at_the_current_directory_Colon_0, tspath.NormalizePath(sys.GetCurrentDirectory())))
		} else {
			tsc.PrintVersion(sys)
			tsc.PrintHelp(sys, commandLine)
		}
		return tsc.CommandLineResult{Status: tsc.ExitStatusDiagnosticsPresent_OutputsSkipped}
	}

	// !!! convert to options with absolute paths is usually done here, but for ease of implementation, it's done in `tsoptions.ParseCommandLine()`
	compilerOptionsFromCommandLine := commandLine.CompilerOptions()
	configForCompilation := commandLine
	extendedConfigCache := &tsc.ExtendedConfigCache{}
	var compileTimes tsc.CompileTimes
	if configFileName != "" {
		configStart := sys.Now()
		configParseResult, errors := tsoptions.GetParsedCommandLineOfConfigFile(configFileName, compilerOptionsFromCommandLine, sys, extendedConfigCache)
		compileTimes.ConfigTime = sys.Now().Sub(configStart)
		if len(errors) != 0 {
			// these are unrecoverable errors--exit to report them as diagnostics
			for _, e := range errors {
				reportDiagnostic(e)
			}
			return tsc.CommandLineResult{Status: tsc.ExitStatusDiagnosticsPresent_OutputsGenerated}
		}
		configForCompilation = configParseResult
		// Updater to reflect pretty
		reportDiagnostic = tsc.CreateDiagnosticReporter(sys, sys.Writer(), commandLine.CompilerOptions())
	}

	reportErrorSummary := tsc.CreateReportErrorSummary(sys, configForCompilation.CompilerOptions())
	if compilerOptionsFromCommandLine.ShowConfig.IsTrue() {
		showConfig(sys, configForCompilation.CompilerOptions())
		return tsc.CommandLineResult{Status: tsc.ExitStatusSuccess}
	}
	if configForCompilation.CompilerOptions().Watch.IsTrue() {
		watcher := createWatcher(sys, configForCompilation, reportDiagnostic, reportErrorSummary, testing)
		watcher.start()
		return tsc.CommandLineResult{Status: tsc.ExitStatusSuccess, Watcher: watcher}
	} else if configForCompilation.CompilerOptions().IsIncremental() {
		return performIncrementalCompilation(
			sys,
			configForCompilation,
			reportDiagnostic,
			reportErrorSummary,
			extendedConfigCache,
			&compileTimes,
			testing,
		)
	}
	return performCompilation(
		sys,
		configForCompilation,
		reportDiagnostic,
		reportErrorSummary,
		extendedConfigCache,
		&compileTimes,
		testing,
	)
}

func findConfigFile(searchPath string, fileExists func(string) bool, configName string) string {
	result, ok := tspath.ForEachAncestorDirectory(searchPath, func(ancestor string) (string, bool) {
		fullConfigName := tspath.CombinePaths(ancestor, configName)
		if fileExists(fullConfigName) {
			return fullConfigName, true
		}
		return fullConfigName, false
	})
	if !ok {
		return ""
	}
	return result
}

func getTraceFromSys(sys tsc.System, testing tsc.CommandLineTesting) func(msg string) {
	return tsc.GetTraceWithWriterFromSys(sys.Writer(), testing)
}

func performIncrementalCompilation(
	sys tsc.System,
	config *tsoptions.ParsedCommandLine,
	reportDiagnostic tsc.DiagnosticReporter,
	reportErrorSummary tsc.DiagnosticsReporter,
	extendedConfigCache tsoptions.ExtendedConfigCache,
	compileTimes *tsc.CompileTimes,
	testing tsc.CommandLineTesting,
) tsc.CommandLineResult {
	host := compiler.NewCachedFSCompilerHost(sys.GetCurrentDirectory(), sys.FS(), sys.DefaultLibraryPath(), extendedConfigCache, getTraceFromSys(sys, testing))
	buildInfoReadStart := sys.Now()
	oldProgram := incremental.ReadBuildInfoProgram(config, incremental.NewBuildInfoReader(host), host)
	compileTimes.BuildInfoReadTime = sys.Now().Sub(buildInfoReadStart)
	// todo: cache, statistics, tracing
	parseStart := sys.Now()
	program := compiler.NewProgram(compiler.ProgramOptions{
		Config:           config,
		Host:             host,
		JSDocParsingMode: ast.JSDocParsingModeParseForTypeErrors,
	})
	compileTimes.ParseTime = sys.Now().Sub(parseStart)
	changesComputeStart := sys.Now()
	incrementalProgram := incremental.NewProgram(program, oldProgram, incremental.CreateHost(host), testing != nil)
	compileTimes.ChangesComputeTime = sys.Now().Sub(changesComputeStart)
	result, _ := tsc.EmitAndReportStatistics(tsc.EmitInput{
		Sys:                sys,
		ProgramLike:        incrementalProgram,
		Program:            incrementalProgram.GetProgram(),
		Config:             config,
		ReportDiagnostic:   reportDiagnostic,
		ReportErrorSummary: reportErrorSummary,
		Writer:             sys.Writer(),
		CompileTimes:       compileTimes,
		Testing:            testing,
	})
	if testing != nil {
		testing.OnProgram(incrementalProgram)
	}
	return tsc.CommandLineResult{
		Status: result.Status,
	}
}

func performCompilation(
	sys tsc.System,
	config *tsoptions.ParsedCommandLine,
	reportDiagnostic tsc.DiagnosticReporter,
	reportErrorSummary tsc.DiagnosticsReporter,
	extendedConfigCache tsoptions.ExtendedConfigCache,
	compileTimes *tsc.CompileTimes,
	testing tsc.CommandLineTesting,
) tsc.CommandLineResult {
	host := compiler.NewCachedFSCompilerHost(sys.GetCurrentDirectory(), sys.FS(), sys.DefaultLibraryPath(), extendedConfigCache, getTraceFromSys(sys, testing))
	// todo: cache, statistics, tracing
	parseStart := sys.Now()
	program := compiler.NewProgram(compiler.ProgramOptions{
		Config:           config,
		Host:             host,
		JSDocParsingMode: ast.JSDocParsingModeParseForTypeErrors,
	})
	compileTimes.ParseTime = sys.Now().Sub(parseStart)
	result, _ := tsc.EmitAndReportStatistics(tsc.EmitInput{
		Sys:                sys,
		ProgramLike:        program,
		Program:            program,
		Config:             config,
		ReportDiagnostic:   reportDiagnostic,
		ReportErrorSummary: reportErrorSummary,
		Writer:             sys.Writer(),
		CompileTimes:       compileTimes,
		Testing:            testing,
	})
	return tsc.CommandLineResult{
		Status: result.Status,
	}
}

func showConfig(sys tsc.System, config *core.CompilerOptions) {
	// !!!
	_ = jsonutil.MarshalIndentWrite(sys.Writer(), config, "", "    ")
}
