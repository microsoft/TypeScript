package tsc

import (
	"fmt"
	"io"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
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

type DiagnosticReporter = func(*ast.Diagnostic)

func QuietDiagnosticReporter(diagnostic *ast.Diagnostic) {}

func CreateDiagnosticReporter(sys System, w io.Writer, options *core.CompilerOptions) DiagnosticReporter {
	if options.Quiet.IsTrue() {
		return QuietDiagnosticReporter
	}
	formatOpts := getFormatOptsOfSys(sys)
	if shouldBePretty(sys, options) {
		return func(diagnostic *ast.Diagnostic) {
			diagnosticwriter.FormatDiagnosticWithColorAndContext(w, diagnostic, formatOpts)
			fmt.Fprint(w, formatOpts.NewLine)
		}
	}
	return func(diagnostic *ast.Diagnostic) {
		diagnosticwriter.WriteFormatDiagnostic(w, diagnostic, formatOpts)
	}
}

func defaultIsPretty(sys System) bool {
	return sys.WriteOutputIsTTY() && sys.GetEnvironmentVariable("NO_COLOR") == ""
}

func shouldBePretty(sys System, options *core.CompilerOptions) bool {
	if options == nil || options.Pretty.IsUnknown() {
		return defaultIsPretty(sys)
	}
	return options.Pretty.IsTrue()
}

type colors struct {
	showColors bool

	isWindows            bool
	isWindowsTerminal    bool
	isVSCode             bool
	supportsRicherColors bool
}

func createColors(sys System) *colors {
	if !defaultIsPretty(sys) {
		return &colors{showColors: false}
	}

	os := sys.GetEnvironmentVariable("OS")
	isWindows := strings.Contains(strings.ToLower(os), "windows")
	isWindowsTerminal := sys.GetEnvironmentVariable("WT_SESSION") != ""
	isVSCode := sys.GetEnvironmentVariable("TERM_PROGRAM") == "vscode"
	supportsRicherColors := sys.GetEnvironmentVariable("COLORTERM") == "truecolor" || sys.GetEnvironmentVariable("TERM") == "xterm-256color"

	return &colors{
		showColors:           true,
		isWindows:            isWindows,
		isWindowsTerminal:    isWindowsTerminal,
		isVSCode:             isVSCode,
		supportsRicherColors: supportsRicherColors,
	}
}

func (c *colors) bold(str string) string {
	if !c.showColors {
		return str
	}
	return "\x1b[1m" + str + "\x1b[22m"
}

func (c *colors) blue(str string) string {
	if !c.showColors {
		return str
	}

	// Effectively Powershell and Command prompt users use cyan instead
	// of blue because the default theme doesn't show blue with enough contrast.
	if c.isWindows && !c.isWindowsTerminal && !c.isVSCode {
		return c.brightWhite(str)
	}
	return "\x1b[94m" + str + "\x1b[39m"
}

func (c *colors) blueBackground(str string) string {
	if !c.showColors {
		return str
	}
	if c.supportsRicherColors {
		return "\x1B[48;5;68m" + str + "\x1B[39;49m"
	} else {
		return "\x1b[44m" + str + "\x1B[39;49m"
	}
}

func (c *colors) brightWhite(str string) string {
	if !c.showColors {
		return str
	}
	return "\x1b[97m" + str + "\x1b[39m"
}

type DiagnosticsReporter = func(diagnostics []*ast.Diagnostic)

func QuietDiagnosticsReporter(diagnostics []*ast.Diagnostic) {}

func CreateReportErrorSummary(sys System, options *core.CompilerOptions) DiagnosticsReporter {
	if shouldBePretty(sys, options) {
		formatOpts := getFormatOptsOfSys(sys)
		return func(diagnostics []*ast.Diagnostic) {
			diagnosticwriter.WriteErrorSummaryText(sys.Writer(), diagnostics, formatOpts)
		}
	}
	return QuietDiagnosticsReporter
}

func CreateBuilderStatusReporter(sys System, w io.Writer, options *core.CompilerOptions, testing CommandLineTesting) DiagnosticReporter {
	if options.Quiet.IsTrue() {
		return QuietDiagnosticReporter
	}

	formatOpts := getFormatOptsOfSys(sys)
	writeStatus := core.IfElse(shouldBePretty(sys, options), diagnosticwriter.FormatDiagnosticsStatusWithColorAndTime, diagnosticwriter.FormatDiagnosticsStatusAndTime)
	return func(diagnostic *ast.Diagnostic) {
		if testing != nil {
			testing.OnBuildStatusReportStart(w)
			defer testing.OnBuildStatusReportEnd(w)
		}
		writeStatus(w, sys.Now().Format("03:04:05 PM"), diagnostic, formatOpts)
		fmt.Fprint(w, formatOpts.NewLine, formatOpts.NewLine)
	}
}

func CreateWatchStatusReporter(sys System, options *core.CompilerOptions, testing CommandLineTesting) DiagnosticReporter {
	formatOpts := getFormatOptsOfSys(sys)
	writeStatus := core.IfElse(shouldBePretty(sys, options), diagnosticwriter.FormatDiagnosticsStatusWithColorAndTime, diagnosticwriter.FormatDiagnosticsStatusAndTime)
	return func(diagnostic *ast.Diagnostic) {
		writer := sys.Writer()
		if testing != nil {
			testing.OnWatchStatusReportStart()
			defer testing.OnWatchStatusReportEnd()
		}
		diagnosticwriter.TryClearScreen(writer, diagnostic, options)
		writeStatus(writer, sys.Now().Format("03:04:05 PM"), diagnostic, formatOpts)
		fmt.Fprint(writer, formatOpts.NewLine, formatOpts.NewLine)
	}
}
