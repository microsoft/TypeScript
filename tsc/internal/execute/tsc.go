package execute

import (
	"context"
	"encoding/json"
	"fmt"
	"runtime"
	"strings"
	"time"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/format"
	"github.com/microsoft/typescript-go/internal/incremental"
	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/microsoft/typescript-go/internal/pprof"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type cbType = func(p any) any

func applyBulkEdits(text string, edits []core.TextChange) string {
	b := strings.Builder{}
	b.Grow(len(text))
	lastEnd := 0
	for _, e := range edits {
		start := e.TextRange.Pos()
		if start != lastEnd {
			b.WriteString(text[lastEnd:e.TextRange.Pos()])
		}
		b.WriteString(e.NewText)

		lastEnd = e.TextRange.End()
	}
	b.WriteString(text[lastEnd:])

	return b.String()
}

type CommandLineResult struct {
	Status             ExitStatus
	IncrementalProgram *incremental.Program
	Watcher            *Watcher
}

func CommandLine(sys System, commandLineArgs []string, testing bool) CommandLineResult {
	if len(commandLineArgs) > 0 {
		// !!! build mode
		switch strings.ToLower(commandLineArgs[0]) {
		case "-b", "--b", "-build", "--build":
			fmt.Fprintln(sys.Writer(), "Build mode is currently unsupported.")
			sys.EndWrite()
			return CommandLineResult{Status: ExitStatusNotImplemented}
			// case "-f":
			// 	return fmtMain(sys, commandLineArgs[1], commandLineArgs[1])
		}
	}

	return tscCompilation(sys, tsoptions.ParseCommandLine(commandLineArgs, sys), testing)
}

func fmtMain(sys System, input, output string) ExitStatus {
	ctx := format.WithFormatCodeSettings(context.Background(), format.GetDefaultFormatCodeSettings("\n"), "\n")
	input = string(tspath.ToPath(input, sys.GetCurrentDirectory(), sys.FS().UseCaseSensitiveFileNames()))
	output = string(tspath.ToPath(output, sys.GetCurrentDirectory(), sys.FS().UseCaseSensitiveFileNames()))
	fileContent, ok := sys.FS().ReadFile(input)
	if !ok {
		fmt.Fprintln(sys.Writer(), "File not found:", input)
		return ExitStatusNotImplemented
	}
	text := fileContent
	pathified := tspath.ToPath(input, sys.GetCurrentDirectory(), true)
	sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName:         string(pathified),
		Path:             pathified,
		JSDocParsingMode: ast.JSDocParsingModeParseAll,
	}, text, core.GetScriptKindFromFileName(string(pathified)))
	edits := format.FormatDocument(ctx, sourceFile)
	newText := applyBulkEdits(text, edits)

	if err := sys.FS().WriteFile(output, newText, false); err != nil {
		fmt.Fprintln(sys.Writer(), err.Error())
		return ExitStatusNotImplemented
	}
	return ExitStatusSuccess
}

func tscCompilation(sys System, commandLine *tsoptions.ParsedCommandLine, testing bool) CommandLineResult {
	configFileName := ""
	reportDiagnostic := createDiagnosticReporter(sys, commandLine.CompilerOptions())
	// if commandLine.Options().Locale != nil

	if len(commandLine.Errors) > 0 {
		for _, e := range commandLine.Errors {
			reportDiagnostic(e)
		}
		return CommandLineResult{Status: ExitStatusDiagnosticsPresent_OutputsSkipped}
	}

	if pprofDir := commandLine.CompilerOptions().PprofDir; pprofDir != "" {
		// !!! stderr?
		profileSession := pprof.BeginProfiling(pprofDir, sys.Writer())
		defer profileSession.Stop()
	}

	if commandLine.CompilerOptions().Init.IsTrue() {
		return CommandLineResult{Status: ExitStatusNotImplemented}
	}

	if commandLine.CompilerOptions().Version.IsTrue() {
		printVersion(sys)
		return CommandLineResult{Status: ExitStatusSuccess}
	}

	if commandLine.CompilerOptions().Help.IsTrue() || commandLine.CompilerOptions().All.IsTrue() {
		printHelp(sys, commandLine)
		return CommandLineResult{Status: ExitStatusSuccess}
	}

	if commandLine.CompilerOptions().Watch.IsTrue() && commandLine.CompilerOptions().ListFilesOnly.IsTrue() {
		reportDiagnostic(ast.NewCompilerDiagnostic(diagnostics.Options_0_and_1_cannot_be_combined, "watch", "listFilesOnly"))
		return CommandLineResult{Status: ExitStatusDiagnosticsPresent_OutputsSkipped}
	}

	if commandLine.CompilerOptions().Project != "" {
		if len(commandLine.FileNames()) != 0 {
			reportDiagnostic(ast.NewCompilerDiagnostic(diagnostics.Option_project_cannot_be_mixed_with_source_files_on_a_command_line))
			return CommandLineResult{Status: ExitStatusDiagnosticsPresent_OutputsSkipped}
		}

		fileOrDirectory := tspath.NormalizePath(commandLine.CompilerOptions().Project)
		if sys.FS().DirectoryExists(fileOrDirectory) {
			configFileName = tspath.CombinePaths(fileOrDirectory, "tsconfig.json")
			if !sys.FS().FileExists(configFileName) {
				reportDiagnostic(ast.NewCompilerDiagnostic(diagnostics.Cannot_find_a_tsconfig_json_file_at_the_current_directory_Colon_0, configFileName))
				return CommandLineResult{Status: ExitStatusDiagnosticsPresent_OutputsSkipped}
			}
		} else {
			configFileName = fileOrDirectory
			if !sys.FS().FileExists(configFileName) {
				reportDiagnostic(ast.NewCompilerDiagnostic(diagnostics.The_specified_path_does_not_exist_Colon_0, fileOrDirectory))
				return CommandLineResult{Status: ExitStatusDiagnosticsPresent_OutputsSkipped}
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
		return CommandLineResult{Status: ExitStatusDiagnosticsPresent_OutputsSkipped}
	}

	// !!! convert to options with absolute paths is usually done here, but for ease of implementation, it's done in `tsoptions.ParseCommandLine()`
	compilerOptionsFromCommandLine := commandLine.CompilerOptions()
	configForCompilation := commandLine
	var extendedConfigCache collections.SyncMap[tspath.Path, *tsoptions.ExtendedConfigCacheEntry]
	var configTime time.Duration
	if configFileName != "" {
		configStart := sys.Now()
		configParseResult, errors := tsoptions.GetParsedCommandLineOfConfigFile(configFileName, compilerOptionsFromCommandLine, sys, &extendedConfigCache)
		configTime = sys.Now().Sub(configStart)
		if len(errors) != 0 {
			// these are unrecoverable errors--exit to report them as diagnostics
			for _, e := range errors {
				reportDiagnostic(e)
			}
			return CommandLineResult{Status: ExitStatusDiagnosticsPresent_OutputsGenerated}
		}
		configForCompilation = configParseResult
		// Updater to reflect pretty
		reportDiagnostic = createDiagnosticReporter(sys, commandLine.CompilerOptions())
	}

	if compilerOptionsFromCommandLine.ShowConfig.IsTrue() {
		showConfig(sys, configForCompilation.CompilerOptions())
		return CommandLineResult{Status: ExitStatusSuccess}
	}
	if configForCompilation.CompilerOptions().Watch.IsTrue() {
		watcher := createWatcher(sys, configForCompilation, reportDiagnostic, testing)
		watcher.start()
		return CommandLineResult{Status: ExitStatusSuccess, Watcher: watcher}
	} else if configForCompilation.CompilerOptions().IsIncremental() {
		return performIncrementalCompilation(
			sys,
			configForCompilation,
			reportDiagnostic,
			&extendedConfigCache,
			configTime,
			testing,
		)
	}
	return performCompilation(
		sys,
		configForCompilation,
		reportDiagnostic,
		&extendedConfigCache,
		configTime,
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

func performIncrementalCompilation(
	sys System,
	config *tsoptions.ParsedCommandLine,
	reportDiagnostic diagnosticReporter,
	extendedConfigCache *collections.SyncMap[tspath.Path, *tsoptions.ExtendedConfigCacheEntry],
	configTime time.Duration,
	testing bool,
) CommandLineResult {
	host := compiler.NewCachedFSCompilerHost(sys.GetCurrentDirectory(), sys.FS(), sys.DefaultLibraryPath(), extendedConfigCache)
	oldProgram := incremental.ReadBuildInfoProgram(config, incremental.NewBuildInfoReader(host))
	// todo: cache, statistics, tracing
	parseStart := sys.Now()
	program := compiler.NewProgram(compiler.ProgramOptions{
		Config:           config,
		Host:             host,
		JSDocParsingMode: ast.JSDocParsingModeParseForTypeErrors,
	})
	parseTime := sys.Now().Sub(parseStart)
	incrementalProgram := incremental.NewProgram(program, oldProgram, testing)
	return CommandLineResult{
		Status: emitAndReportStatistics(
			sys,
			incrementalProgram,
			incrementalProgram.GetProgram(),
			config,
			reportDiagnostic,
			configTime,
			parseTime,
		),
		IncrementalProgram: incrementalProgram,
	}
}

func performCompilation(
	sys System,
	config *tsoptions.ParsedCommandLine,
	reportDiagnostic diagnosticReporter,
	extendedConfigCache *collections.SyncMap[tspath.Path, *tsoptions.ExtendedConfigCacheEntry],
	configTime time.Duration,
) CommandLineResult {
	host := compiler.NewCachedFSCompilerHost(sys.GetCurrentDirectory(), sys.FS(), sys.DefaultLibraryPath(), extendedConfigCache)
	// todo: cache, statistics, tracing
	parseStart := sys.Now()
	program := compiler.NewProgram(compiler.ProgramOptions{
		Config:           config,
		Host:             host,
		JSDocParsingMode: ast.JSDocParsingModeParseForTypeErrors,
	})
	parseTime := sys.Now().Sub(parseStart)
	return CommandLineResult{
		Status: emitAndReportStatistics(
			sys,
			program,
			program,
			config,
			reportDiagnostic,
			configTime,
			parseTime,
		),
	}
}

func emitAndReportStatistics(
	sys System,
	programLike compiler.ProgramLike,
	program *compiler.Program,
	config *tsoptions.ParsedCommandLine,
	reportDiagnostic diagnosticReporter,
	configTime time.Duration,
	parseTime time.Duration,
) ExitStatus {
	result := emitFilesAndReportErrors(sys, programLike, reportDiagnostic)
	if result.status != ExitStatusSuccess {
		// compile exited early
		return result.status
	}

	result.configTime = configTime
	result.parseTime = parseTime
	result.totalTime = sys.SinceStart()

	if config.CompilerOptions().Diagnostics.IsTrue() || config.CompilerOptions().ExtendedDiagnostics.IsTrue() {
		var memStats runtime.MemStats
		// GC must be called twice to allow things to settle.
		runtime.GC()
		runtime.GC()
		runtime.ReadMemStats(&memStats)

		reportStatistics(sys, program, result, &memStats)
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
	configTime  time.Duration
	parseTime   time.Duration
	bindTime    time.Duration
	checkTime   time.Duration
	totalTime   time.Duration
	emitTime    time.Duration
}

func emitFilesAndReportErrors(
	sys System,
	program compiler.ProgramLike,
	reportDiagnostic diagnosticReporter,
) (result compileAndEmitResult) {
	ctx := context.Background()

	allDiagnostics := compiler.GetDiagnosticsOfAnyProgram(
		ctx,
		program,
		nil,
		false,
		func(ctx context.Context, file *ast.SourceFile) []*ast.Diagnostic {
			// Options diagnostics include global diagnostics (even though we collect them separately),
			// and global diagnostics create checkers, which then bind all of the files. Do this binding
			// early so we can track the time.
			bindStart := sys.Now()
			diags := program.GetBindDiagnostics(ctx, file)
			result.bindTime = sys.Now().Sub(bindStart)
			return diags
		},
		func(ctx context.Context, file *ast.SourceFile) []*ast.Diagnostic {
			checkStart := sys.Now()
			diags := program.GetSemanticDiagnostics(ctx, file)
			result.checkTime = sys.Now().Sub(checkStart)
			return diags
		},
	)

	emitResult := &compiler.EmitResult{EmitSkipped: true, Diagnostics: []*ast.Diagnostic{}}
	if !program.Options().ListFilesOnly.IsTrue() {
		emitStart := sys.Now()
		emitResult = program.Emit(ctx, compiler.EmitOptions{})
		result.emitTime = sys.Now().Sub(emitStart)
	}
	if emitResult != nil {
		allDiagnostics = append(allDiagnostics, emitResult.Diagnostics...)
	}

	allDiagnostics = compiler.SortAndDeduplicateDiagnostics(allDiagnostics)
	for _, diagnostic := range allDiagnostics {
		reportDiagnostic(diagnostic)
	}

	if sys.Writer() != nil {
		for _, file := range emitResult.EmittedFiles {
			fmt.Fprintln(sys.Writer(), "TSFILE: ", tspath.GetNormalizedAbsolutePath(file, sys.GetCurrentDirectory()))
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

func showConfig(sys System, config *core.CompilerOptions) {
	// !!!
	enc := json.NewEncoder(sys.Writer())
	enc.SetIndent("", "    ")
	enc.Encode(config) //nolint:errcheck,errchkjson
}

func listFiles(sys System, program compiler.ProgramLike) {
	options := program.Options()
	// !!! explainFiles
	if options.ListFiles.IsTrue() || options.ListFilesOnly.IsTrue() {
		for _, file := range program.GetSourceFiles() {
			fmt.Fprintln(sys.Writer(), file.FileName())
		}
	}
}
