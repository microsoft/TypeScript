package execute

import (
	"context"
	"encoding/json"
	"fmt"
	"runtime"
	"slices"
	"strings"
	"time"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/pprof"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type cbType = func(p any) any

func CommandLine(sys System, cb cbType, commandLineArgs []string) ExitStatus {
	if len(commandLineArgs) > 0 {
		// !!! build mode
		switch strings.ToLower(commandLineArgs[0]) {
		case "-b", "--b", "-build", "--build":
			fmt.Fprint(sys.Writer(), "Build mode is currently unsupported."+sys.NewLine())
			sys.EndWrite()
			return ExitStatusNotImplemented
		}
	}

	parsedCommandLine := tsoptions.ParseCommandLine(commandLineArgs, sys)
	e, watcher := executeCommandLineWorker(sys, cb, parsedCommandLine)
	if watcher == nil {
		return e
	}
	return start(watcher)
}

func executeCommandLineWorker(sys System, cb cbType, commandLine *tsoptions.ParsedCommandLine) (ExitStatus, *watcher) {
	configFileName := ""
	reportDiagnostic := createDiagnosticReporter(sys, commandLine.CompilerOptions())
	// if commandLine.Options().Locale != nil

	if len(commandLine.Errors) > 0 {
		for _, e := range commandLine.Errors {
			reportDiagnostic(e)
		}
		return ExitStatusDiagnosticsPresent_OutputsSkipped, nil
	}

	if pprofDir := commandLine.CompilerOptions().PprofDir; pprofDir != "" {
		// !!! stderr?
		profileSession := pprof.BeginProfiling(pprofDir, sys.Writer())
		defer profileSession.Stop()
	}

	if commandLine.CompilerOptions().Init.IsTrue() {
		return ExitStatusNotImplemented, nil
	}

	if commandLine.CompilerOptions().Version.IsTrue() {
		printVersion(sys)
		return ExitStatusSuccess, nil
	}

	if commandLine.CompilerOptions().Help.IsTrue() || commandLine.CompilerOptions().All.IsTrue() {
		printHelp(sys, commandLine)
		return ExitStatusSuccess, nil
	}

	if commandLine.CompilerOptions().Watch.IsTrue() && commandLine.CompilerOptions().ListFilesOnly.IsTrue() {
		return ExitStatusNotImplemented, nil
	}

	if commandLine.CompilerOptions().Project != "" {
		if len(commandLine.FileNames()) != 0 {
			reportDiagnostic(ast.NewCompilerDiagnostic(diagnostics.Option_project_cannot_be_mixed_with_source_files_on_a_command_line))
			return ExitStatusDiagnosticsPresent_OutputsSkipped, nil
		}

		fileOrDirectory := tspath.NormalizePath(commandLine.CompilerOptions().Project)
		if sys.FS().DirectoryExists(fileOrDirectory) {
			configFileName = tspath.CombinePaths(fileOrDirectory, "tsconfig.json")
			if !sys.FS().FileExists(configFileName) {
				reportDiagnostic(ast.NewCompilerDiagnostic(diagnostics.Cannot_find_a_tsconfig_json_file_at_the_current_directory_Colon_0, configFileName))
				return ExitStatusDiagnosticsPresent_OutputsSkipped, nil
			}
		} else {
			configFileName = fileOrDirectory
			if !sys.FS().FileExists(configFileName) {
				reportDiagnostic(ast.NewCompilerDiagnostic(diagnostics.The_specified_path_does_not_exist_Colon_0, fileOrDirectory))
				return ExitStatusDiagnosticsPresent_OutputsSkipped, nil
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
			printVersion(sys)
			printHelp(sys, commandLine)
		}
		return ExitStatusDiagnosticsPresent_OutputsSkipped, nil
	}

	// !!! convert to options with absolute paths is usually done here, but for ease of implementation, it's done in `tsoptions.ParseCommandLine()`
	compilerOptionsFromCommandLine := commandLine.CompilerOptions()

	if configFileName != "" {
		extendedConfigCache := map[tspath.Path]*tsoptions.ExtendedConfigCacheEntry{}
		configParseResult, errors := getParsedCommandLineOfConfigFile(configFileName, compilerOptionsFromCommandLine, sys, extendedConfigCache)
		if len(errors) != 0 {
			// these are unrecoverable errors--exit to report them as diagnostics
			for _, e := range errors {
				reportDiagnostic(e)
			}
			return ExitStatusDiagnosticsPresent_OutputsGenerated, nil
		}
		if compilerOptionsFromCommandLine.ShowConfig.IsTrue() {
			showConfig(sys, configParseResult.CompilerOptions())
			return ExitStatusSuccess, nil
		}
		// updateReportDiagnostic
		if isWatchSet(configParseResult.CompilerOptions()) {
			return ExitStatusSuccess, createWatcher(sys, configParseResult, reportDiagnostic)
		}
		// !!! incremental
		return performCompilation(
			sys,
			cb,
			configParseResult,
			reportDiagnostic,
		), nil
	} else {
		if compilerOptionsFromCommandLine.ShowConfig.IsTrue() {
			showConfig(sys, compilerOptionsFromCommandLine)
			return ExitStatusSuccess, nil
		}
		// todo update reportDiagnostic
		if isWatchSet(compilerOptionsFromCommandLine) {
			// !!! reportWatchModeWithoutSysSupport
			return ExitStatusSuccess, createWatcher(sys, commandLine, reportDiagnostic)
		}
		// !!! incremental
	}
	return performCompilation(
		sys,
		cb,
		commandLine,
		reportDiagnostic,
	), nil
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

// Reads the config file and reports errors. Exits if the config file cannot be found
func getParsedCommandLineOfConfigFile(configFileName string, options *core.CompilerOptions, sys System, extendedConfigCache map[tspath.Path]*tsoptions.ExtendedConfigCacheEntry) (*tsoptions.ParsedCommandLine, []*ast.Diagnostic) {
	errors := []*ast.Diagnostic{}
	configFileText, errors := tsoptions.TryReadFile(configFileName, sys.FS().ReadFile, errors)
	if len(errors) > 0 {
		// these are unrecoverable errors--exit to report them as diagnostics
		return nil, errors
	}

	cwd := sys.GetCurrentDirectory()
	tsConfigSourceFile := tsoptions.NewTsconfigSourceFileFromFilePath(configFileName, tspath.ToPath(configFileName, cwd, sys.FS().UseCaseSensitiveFileNames()), configFileText)
	// tsConfigSourceFile.resolvedPath = tsConfigSourceFile.FileName()
	// tsConfigSourceFile.originalFileName = tsConfigSourceFile.FileName()
	return tsoptions.ParseJsonSourceFileConfigFileContent(
		tsConfigSourceFile,
		sys,
		tspath.GetNormalizedAbsolutePath(tspath.GetDirectoryPath(configFileName), cwd),
		options,
		tspath.GetNormalizedAbsolutePath(configFileName, cwd),
		nil,
		nil,
		extendedConfigCache,
	), nil
}

func performCompilation(sys System, cb cbType, config *tsoptions.ParsedCommandLine, reportDiagnostic diagnosticReporter) ExitStatus {
	host := compiler.NewCachedFSCompilerHost(config.CompilerOptions(), sys.GetCurrentDirectory(), sys.FS(), sys.DefaultLibraryPath())
	// todo: cache, statistics, tracing
	parseStart := time.Now()
	program := compiler.NewProgramFromParsedCommandLine(config, host)
	parseTime := time.Since(parseStart)

	result := emitFilesAndReportErrors(sys, program, reportDiagnostic)
	if result.status != ExitStatusSuccess {
		// compile exited early
		return result.status
	}

	result.parseTime = parseTime
	result.totalTime = time.Since(parseStart)

	if config.CompilerOptions().Diagnostics.IsTrue() || config.CompilerOptions().ExtendedDiagnostics.IsTrue() {
		var memStats runtime.MemStats
		// GC must be called twice to allow things to settle.
		runtime.GC()
		runtime.GC()
		runtime.ReadMemStats(&memStats)

		reportStatistics(sys, program, result, &memStats)
	}

	if cb != nil {
		cb(program)
	}

	if result.emitResult.EmitSkipped && len(result.diagnostics) > 0 {
		return ExitStatusDiagnosticsPresent_OutputsSkipped
	} else if len(result.diagnostics) > 0 {
		return ExitStatusDiagnosticsPresent_OutputsGenerated
	}
	return ExitStatusSuccess
}

type compileAndEmitResult struct {
	diagnostics []*ast.Diagnostic
	emitResult  *compiler.EmitResult
	status      ExitStatus
	parseTime   time.Duration
	bindTime    time.Duration
	checkTime   time.Duration
	emitTime    time.Duration
	totalTime   time.Duration
}

func emitFilesAndReportErrors(sys System, program *compiler.Program, reportDiagnostic diagnosticReporter) (result compileAndEmitResult) {
	ctx := context.Background()
	options := program.Options()
	allDiagnostics := slices.Clip(program.GetConfigFileParsingDiagnostics())
	configFileParsingDiagnosticsLength := len(allDiagnostics)

	allDiagnostics = append(allDiagnostics, program.GetSyntacticDiagnostics(ctx, nil)...)

	if len(allDiagnostics) == configFileParsingDiagnosticsLength {
		// Options diagnostics include global diagnostics (even though we collect them separately),
		// and global diagnostics create checkers, which then bind all of the files. Do this binding
		// early so we can track the time.
		bindStart := time.Now()
		_ = program.GetBindDiagnostics(ctx, nil)
		result.bindTime = time.Since(bindStart)

		allDiagnostics = append(allDiagnostics, program.GetOptionsDiagnostics(ctx)...)

		if options.ListFilesOnly.IsFalseOrUnknown() {
			allDiagnostics = append(allDiagnostics, program.GetGlobalDiagnostics(ctx)...)

			if len(allDiagnostics) == configFileParsingDiagnosticsLength {
				checkStart := time.Now()
				allDiagnostics = append(allDiagnostics, program.GetSemanticDiagnostics(ctx, nil)...)
				result.checkTime = time.Since(checkStart)
			}

			if options.NoEmit.IsTrue() && options.GetEmitDeclarations() && len(allDiagnostics) == configFileParsingDiagnosticsLength {
				allDiagnostics = append(allDiagnostics, program.GetDeclarationDiagnostics(ctx, nil)...)
			}
		}
	}

	emitResult := &compiler.EmitResult{EmitSkipped: true, Diagnostics: []*ast.Diagnostic{}}
	if !options.ListFilesOnly.IsTrue() {
		emitStart := time.Now()
		emitResult = program.Emit(compiler.EmitOptions{})
		result.emitTime = time.Since(emitStart)
	}
	allDiagnostics = append(allDiagnostics, emitResult.Diagnostics...)

	allDiagnostics = compiler.SortAndDeduplicateDiagnostics(allDiagnostics)
	for _, diagnostic := range allDiagnostics {
		reportDiagnostic(diagnostic)
	}

	if sys.Writer() != nil {
		for _, file := range emitResult.EmittedFiles {
			fmt.Fprint(sys.Writer(), "TSFILE: ", tspath.GetNormalizedAbsolutePath(file, sys.GetCurrentDirectory()))
		}
		listFiles(sys, program)
	}

	createReportErrorSummary(sys, program.Options())(allDiagnostics)
	result.diagnostics = allDiagnostics
	result.emitResult = emitResult
	result.status = ExitStatusSuccess
	return result
}

// func isBuildCommand(args []string) bool {
// 	return len(args) > 0 && args[0] == "build"
// }

func isWatchSet(options *core.CompilerOptions) bool {
	return options.Watch.IsTrue()
}

func isIncrementalCompilation(options *core.CompilerOptions) bool {
	return options.Incremental.IsTrue()
}

func showConfig(sys System, config *core.CompilerOptions) {
	// !!!
	enc := json.NewEncoder(sys.Writer())
	enc.SetIndent("", "    ")
	enc.Encode(config) //nolint:errcheck,errchkjson
}

func listFiles(sys System, program *compiler.Program) {
	options := program.Options()
	// !!! explainFiles
	if options.ListFiles.IsTrue() || options.ListFilesOnly.IsTrue() {
		for _, file := range program.GetSourceFiles() {
			fmt.Fprintf(sys.Writer(), "%s%s", file.FileName(), sys.NewLine())
		}
	}
}
