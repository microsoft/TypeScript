package tsc

import (
	"context"
	"fmt"
	"io"
	"runtime"
	"time"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

func GetTraceWithWriterFromSys(w io.Writer, testing CommandLineTesting) func(msg string) {
	if testing == nil {
		return func(msg string) {
			fmt.Fprintln(w, msg)
		}
	} else {
		return testing.GetTrace(w)
	}
}

type EmitInput struct {
	Sys                System
	ProgramLike        compiler.ProgramLike
	Program            *compiler.Program
	Config             *tsoptions.ParsedCommandLine
	ReportDiagnostic   DiagnosticReporter
	ReportErrorSummary DiagnosticsReporter
	Writer             io.Writer
	WriteFile          compiler.WriteFile
	CompileTimes       *CompileTimes
	Testing            CommandLineTesting
	TestingMTimesCache *collections.SyncMap[tspath.Path, time.Time]
}

func EmitAndReportStatistics(input EmitInput) (CompileAndEmitResult, *Statistics) {
	var statistics *Statistics
	result := EmitFilesAndReportErrors(input)
	if result.Status != ExitStatusSuccess {
		// compile exited early
		return result, nil
	}
	result.times.totalTime = input.Sys.SinceStart()

	if input.Config.CompilerOptions().Diagnostics.IsTrue() || input.Config.CompilerOptions().ExtendedDiagnostics.IsTrue() {
		var memStats runtime.MemStats
		// GC must be called twice to allow things to settle.
		runtime.GC()
		runtime.GC()
		runtime.ReadMemStats(&memStats)

		statistics = statisticsFromProgram(input, &memStats)
		statistics.Report(input.Writer, input.Testing)
	}

	if result.EmitResult.EmitSkipped && len(result.Diagnostics) > 0 {
		result.Status = ExitStatusDiagnosticsPresent_OutputsSkipped
	} else if len(result.Diagnostics) > 0 {
		result.Status = ExitStatusDiagnosticsPresent_OutputsGenerated
	}
	return result, statistics
}

func EmitFilesAndReportErrors(input EmitInput) (result CompileAndEmitResult) {
	result.times = input.CompileTimes
	ctx := context.Background()

	allDiagnostics := compiler.GetDiagnosticsOfAnyProgram(
		ctx,
		input.ProgramLike,
		nil,
		false,
		func(ctx context.Context, file *ast.SourceFile) []*ast.Diagnostic {
			// Options diagnostics include global diagnostics (even though we collect them separately),
			// and global diagnostics create checkers, which then bind all of the files. Do this binding
			// early so we can track the time.
			bindStart := input.Sys.Now()
			diags := input.ProgramLike.GetBindDiagnostics(ctx, file)
			result.times.bindTime = input.Sys.Now().Sub(bindStart)
			return diags
		},
		func(ctx context.Context, file *ast.SourceFile) []*ast.Diagnostic {
			checkStart := input.Sys.Now()
			diags := input.ProgramLike.GetSemanticDiagnostics(ctx, file)
			result.times.checkTime = input.Sys.Now().Sub(checkStart)
			return diags
		},
	)

	emitResult := &compiler.EmitResult{EmitSkipped: true, Diagnostics: []*ast.Diagnostic{}}
	if !input.ProgramLike.Options().ListFilesOnly.IsTrue() {
		emitStart := input.Sys.Now()
		emitResult = input.ProgramLike.Emit(ctx, compiler.EmitOptions{
			WriteFile: input.WriteFile,
		})
		result.times.emitTime = input.Sys.Now().Sub(emitStart)
	}
	if emitResult != nil {
		allDiagnostics = append(allDiagnostics, emitResult.Diagnostics...)
	}
	if input.Testing != nil {
		input.Testing.OnEmittedFiles(emitResult, input.TestingMTimesCache)
	}

	allDiagnostics = compiler.SortAndDeduplicateDiagnostics(allDiagnostics)
	for _, diagnostic := range allDiagnostics {
		input.ReportDiagnostic(diagnostic)
	}

	listFiles(input, emitResult)

	input.ReportErrorSummary(allDiagnostics)
	result.Diagnostics = allDiagnostics
	result.EmitResult = emitResult
	result.Status = ExitStatusSuccess
	return result
}

func listFiles(input EmitInput, emitResult *compiler.EmitResult) {
	if input.Testing != nil {
		input.Testing.OnListFilesStart(input.Writer)
		defer input.Testing.OnListFilesEnd(input.Writer)
	}
	options := input.Program.Options()
	if options.ListEmittedFiles.IsTrue() {
		for _, file := range emitResult.EmittedFiles {
			fmt.Fprintln(input.Writer, "TSFILE: ", tspath.GetNormalizedAbsolutePath(file, input.Program.GetCurrentDirectory()))
		}
	}
	if options.ExplainFiles.IsTrue() {
		input.Program.ExplainFiles(input.Writer)
	} else if options.ListFiles.IsTrue() || options.ListFilesOnly.IsTrue() {
		for _, file := range input.Program.GetSourceFiles() {
			fmt.Fprintln(input.Writer, file.FileName())
		}
	}
}
