package execute

import (
	"fmt"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnosticwriter"
	"github.com/microsoft/typescript-go/internal/tspath"
)

func getFormatOptsOfSys(sys System) *diagnosticwriter.FormattingOptions {
	return &diagnosticwriter.FormattingOptions{
		NewLine: "\n",
		ComparePathsOptions: tspath.ComparePathsOptions{
			CurrentDirectory:          sys.GetCurrentDirectory(),
			UseCaseSensitiveFileNames: sys.FS().UseCaseSensitiveFileNames(),
		},
	}
}

type diagnosticReporter = func(*ast.Diagnostic)

func createDiagnosticReporter(sys System, pretty core.Tristate) diagnosticReporter {
	formatOpts := getFormatOptsOfSys(sys)
	if pretty.IsFalseOrUnknown() {
		return func(diagnostic *ast.Diagnostic) {
			diagnosticwriter.WriteFormatDiagnostic(sys.Writer(), diagnostic, formatOpts)
			sys.EndWrite()
		}
	}
	return func(diagnostic *ast.Diagnostic) {
		diagnosticwriter.FormatDiagnosticsWithColorAndContext(sys.Writer(), []*ast.Diagnostic{diagnostic}, formatOpts)
		sys.EndWrite()
	}
}

func shouldBePretty(sys System, options *core.CompilerOptions) bool {
	if options == nil || options.Pretty.IsTrueOrUnknown() {
		// todo: return defaultIsPretty(sys);
		return true
	}
	return options.Pretty.IsTrue()
}

func createReportErrorSummary(sys System, options *core.CompilerOptions) func(diagnostics []*ast.Diagnostic) {
	if shouldBePretty(sys, options) {
		formatOpts := getFormatOptsOfSys(sys)
		return func(diagnostics []*ast.Diagnostic) {
			diagnosticwriter.WriteErrorSummaryText(sys.Writer(), diagnostics, formatOpts)
			sys.EndWrite()
		}
	}
	return func(diagnostics []*ast.Diagnostic) {}
}

func reportStatistics(sys System, program *compiler.Program) {
	// todo
	stats := []statistic{
		newStatistic("Files", len(program.SourceFiles())),
		// newStatistic("Identifiers", program.IdentifierCount()),
		// newStatistic("Symbols", program.getSymbolCount()),
		newStatistic("Types", program.TypeCount()),
		// newStatistic("Instantiations", program.getInstantiationCount()),
	}

	for _, stat := range stats {
		fmt.Fprintf(sys.Writer(), "%s:"+strings.Repeat(" ", 20-len(stat.name))+"%v\n", stat.name, stat.value)
	}
}

type statistic struct {
	name  string
	value int
}

func newStatistic(name string, count int) statistic {
	return statistic{name, count}
}
