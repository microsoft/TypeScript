package tsc

import (
	"context"
	"fmt"
	"io"
	"runtime"

	"github.com/microsoft/typescript-go/internal/ast"
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

func EmitAndReportStatistics(
	sys System,
	programLike compiler.ProgramLike,
	program *compiler.Program,
	config *tsoptions.ParsedCommandLine,
	reportDiagnostic DiagnosticReporter,
	reportErrorSummary DiagnosticsReporter,
	w io.Writer,
	compileTimes *CompileTimes,
	testing CommandLineTesting,
) (CompileAndEmitResult, *Statistics) {
	var statistics *Statistics
	result := EmitFilesAndReportErrors(sys, programLike, program, reportDiagnostic, reportErrorSummary, w, compileTimes, testing)
	if result.Status != ExitStatusSuccess {
		// compile exited early
		return result, nil
	}
	result.times.totalTime = sys.SinceStart()

	if config.CompilerOptions().Diagnostics.IsTrue() || config.CompilerOptions().ExtendedDiagnostics.IsTrue() {
		var memStats runtime.MemStats
		// GC must be called twice to allow things to settle.
		runtime.GC()
		runtime.GC()
		runtime.ReadMemStats(&memStats)

		statistics = statisticsFromProgram(program, compileTimes, &memStats)
		statistics.Report(w, testing)
	}

	if result.EmitResult.EmitSkipped && len(result.Diagnostics) > 0 {
		result.Status = ExitStatusDiagnosticsPresent_OutputsSkipped
	} else if len(result.Diagnostics) > 0 {
		result.Status = ExitStatusDiagnosticsPresent_OutputsGenerated
	}
	return result, statistics
}

func EmitFilesAndReportErrors(
	sys System,
	programLike compiler.ProgramLike,
	program *compiler.Program,
	reportDiagnostic DiagnosticReporter,
	reportErrorSummary DiagnosticsReporter,
	w io.Writer,
	compileTimes *CompileTimes,
	testing CommandLineTesting,
) (result CompileAndEmitResult) {
	result.times = compileTimes
	ctx := context.Background()

	allDiagnostics := compiler.GetDiagnosticsOfAnyProgram(
		ctx,
		programLike,
		nil,
		false,
		func(ctx context.Context, file *ast.SourceFile) []*ast.Diagnostic {
			// Options diagnostics include global diagnostics (even though we collect them separately),
			// and global diagnostics create checkers, which then bind all of the files. Do this binding
			// early so we can track the time.
			bindStart := sys.Now()
			diags := programLike.GetBindDiagnostics(ctx, file)
			result.times.bindTime = sys.Now().Sub(bindStart)
			return diags
		},
		func(ctx context.Context, file *ast.SourceFile) []*ast.Diagnostic {
			checkStart := sys.Now()
			diags := programLike.GetSemanticDiagnostics(ctx, file)
			result.times.checkTime = sys.Now().Sub(checkStart)
			return diags
		},
	)

	emitResult := &compiler.EmitResult{EmitSkipped: true, Diagnostics: []*ast.Diagnostic{}}
	if !programLike.Options().ListFilesOnly.IsTrue() {
		emitStart := sys.Now()
		emitResult = programLike.Emit(ctx, compiler.EmitOptions{})
		result.times.emitTime = sys.Now().Sub(emitStart)
	}
	if emitResult != nil {
		allDiagnostics = append(allDiagnostics, emitResult.Diagnostics...)
	}
	if testing != nil {
		testing.OnEmittedFiles(emitResult)
	}

	allDiagnostics = compiler.SortAndDeduplicateDiagnostics(allDiagnostics)
	for _, diagnostic := range allDiagnostics {
		reportDiagnostic(diagnostic)
	}

	listFiles(w, program, emitResult, testing)

	reportErrorSummary(allDiagnostics)
	result.Diagnostics = allDiagnostics
	result.EmitResult = emitResult
	result.Status = ExitStatusSuccess
	return result
}

func listFiles(w io.Writer, program *compiler.Program, emitResult *compiler.EmitResult, testing CommandLineTesting) {
	if testing != nil {
		testing.OnListFilesStart(w)
		defer testing.OnListFilesEnd(w)
	}
	options := program.Options()
	if options.ListEmittedFiles.IsTrue() {
		for _, file := range emitResult.EmittedFiles {
			fmt.Fprintln(w, "TSFILE: ", tspath.GetNormalizedAbsolutePath(file, program.GetCurrentDirectory()))
		}
	}
	if options.ExplainFiles.IsTrue() {
		program.ExplainFiles(w)
	} else if options.ListFiles.IsTrue() || options.ListFilesOnly.IsTrue() {
		for _, file := range program.GetSourceFiles() {
			fmt.Fprintln(w, file.FileName())
		}
	}
}
