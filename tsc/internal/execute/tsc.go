package execute

import (
	"fmt"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type cbType = func(p any) any

func CommandLine(sys System, cb cbType, commandLineArgs []string) ExitStatus {
	parsedCommandLine := tsoptions.ParseCommandLine(commandLineArgs, sys)
	e, watcher := executeCommandLineWorker(sys, cb, parsedCommandLine)
	if watcher == nil {
		return e
	}
	return start(watcher)
}

func executeCommandLineWorker(sys System, cb cbType, commandLine *tsoptions.ParsedCommandLine) (ExitStatus, *watcher) {
	configFileName := ""
	reportDiagnostic := createDiagnosticReporter(sys, commandLine.CompilerOptions().Pretty)
	// if commandLine.Options().Locale != nil

	if len(commandLine.Errors) > 0 {
		for _, e := range commandLine.Errors {
			reportDiagnostic(e)
		}
		return ExitStatusDiagnosticsPresent_OutputsSkipped, nil
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
			return ExitStatusNotImplemented, nil
		}
		// updateReportDiagnostic
		if isWatchSet(configParseResult.CompilerOptions()) {
			return ExitStatusSuccess, createWatcher(sys, configParseResult, reportDiagnostic)
		} else if isIncrementalCompilation(configParseResult.CompilerOptions()) {
			return ExitStatusNotImplementedIncremental, nil
		}
		return performCompilation(
			sys,
			cb,
			configParseResult,
			reportDiagnostic,
		), nil
	} else {
		if compilerOptionsFromCommandLine.ShowConfig.IsTrue() {
			return ExitStatusNotImplemented, nil
		}
		// todo update reportDiagnostic
		if isWatchSet(compilerOptionsFromCommandLine) {
			// !!! reportWatchModeWithoutSysSupport
			return ExitStatusSuccess, createWatcher(sys, commandLine, reportDiagnostic)
		} else if isIncrementalCompilation(compilerOptionsFromCommandLine) {
			return ExitStatusNotImplementedIncremental, nil
		}
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
	program := compiler.NewProgramFromParsedCommandLine(config, host)

	diagnostics, emitResult, exitStatus := compileAndEmit(sys, program, reportDiagnostic)
	if exitStatus != ExitStatusSuccess {
		// compile exited early
		return exitStatus
	}

	reportStatistics(sys, program)
	if cb != nil {
		cb(program)
	}

	if emitResult.EmitSkipped && diagnostics != nil && len(diagnostics) > 0 {
		return ExitStatusDiagnosticsPresent_OutputsSkipped
	} else if len(diagnostics) > 0 {
		return ExitStatusDiagnosticsPresent_OutputsGenerated
	}
	return ExitStatusSuccess
}

func compileAndEmit(sys System, program *compiler.Program, reportDiagnostic diagnosticReporter) ([]*ast.Diagnostic, *compiler.EmitResult, ExitStatus) {
	// todo: check if third return needed after execute is fully implemented

	options := program.Options()
	allDiagnostics := program.GetConfigFileParsingDiagnostics()

	// todo: early exit logic and append diagnostics
	diagnostics := program.GetSyntacticDiagnostics(nil)
	if len(diagnostics) == 0 {
		diagnostics = append(diagnostics, program.GetOptionsDiagnostics()...)
		if options.ListFilesOnly.IsFalse() {
			// program.GetBindDiagnostics(nil)
			diagnostics = append(diagnostics, program.GetGlobalDiagnostics()...)
		}
	}
	if len(diagnostics) == 0 {
		diagnostics = append(diagnostics, program.GetSemanticDiagnostics(nil)...)
	}
	// TODO: declaration diagnostics
	if len(diagnostics) == 0 && options.NoEmit == core.TSTrue && (options.Declaration.IsTrue() && options.Composite.IsTrue()) {
		return nil, nil, ExitStatusNotImplemented
		// addRange(allDiagnostics, program.getDeclarationDiagnostics(/*sourceFile*/ undefined, cancellationToken));
	}

	emitResult := &compiler.EmitResult{EmitSkipped: true, Diagnostics: []*ast.Diagnostic{}}
	if !options.ListFilesOnly.IsTrue() {
		// !!! Emit is not yet fully implemented, will not emit unless `outfile` specified
		emitResult = program.Emit(compiler.EmitOptions{})
	}
	diagnostics = append(diagnostics, emitResult.Diagnostics...)

	allDiagnostics = append(allDiagnostics, diagnostics...)
	allDiagnostics = compiler.SortAndDeduplicateDiagnostics(allDiagnostics)
	for _, diagnostic := range allDiagnostics {
		reportDiagnostic(diagnostic)
	}

	// !!! if (write)
	if sys.Writer() != nil {
		for _, file := range emitResult.EmittedFiles {
			fmt.Fprint(sys.Writer(), "TSFILE: ", tspath.GetNormalizedAbsolutePath(file, sys.GetCurrentDirectory()))
		}
		// todo: listFiles(program, sys.Writer())
	}

	createReportErrorSummary(sys, program.Options())(allDiagnostics)
	return allDiagnostics, emitResult, ExitStatusSuccess
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
