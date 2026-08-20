package tsbaseline

import (
	"fmt"
	"regexp"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/diagnosticwriter"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/baseline"
)

var ansiEscape = regexp.MustCompile("\x1b\\[[0-9;]*m")

var contentMapperFormatOpts = &diagnosticwriter.FormattingOptions{NewLine: "\n"}

// DoContentMapperBaseline writes a baseline for content-mapped files that shows the original source, the
// transformed source the compiler actually checks, and the file's diagnostics. Diagnostics are rendered
// with the standard diagnostic writer, which maps each one to the text it belongs to: mapper-produced
// diagnostics render against the original source, compiler diagnostics on mappable code render against the
// original source, and compiler diagnostics on synthesized code render against the transformed source. If
// the program has no content-mapped files, no baseline is written.
func DoContentMapperBaseline(
	t *testing.T,
	baselinePath string,
	program compiler.ProgramLike,
	diagnostics []*ast.Diagnostic,
	opts baseline.Options,
) {
	content := getContentMapperBaseline(program, diagnostics)
	if content == "" {
		return
	}
	baseline.Run(t, tsExtension.ReplaceAllString(baselinePath, ".contentmapper"), content, opts)
}

func getContentMapperBaseline(program compiler.ProgramLike, diagnostics []*ast.Diagnostic) string {
	prog := program.Program()
	mapped := make(map[string]*contentmapper.Mapper)
	var files []*ast.SourceFile
	for _, file := range program.GetSourceFiles() {
		if mapper := prog.GetContentMapper(file); mapper != nil {
			mapped[file.FileName()] = mapper
			files = append(files, file)
		}
	}
	if len(files) == 0 {
		return ""
	}

	var b strings.Builder
	for _, file := range files {
		mapper := mapped[file.FileName()]
		fmt.Fprintf(&b, "//// [%s] (ScriptKind: %s, ContentMapper: %v)\n", removeTestPathPrefixes(file.FileName(), false), file.ScriptKind, mapper.Definition.Extensions)
		b.WriteString("--- Original ---\n")
		b.WriteString(ensureTrailingNewline(file.OriginalText()))
		b.WriteString("--- Transformed ---\n")
		b.WriteString(ensureTrailingNewline(file.Text()))
		b.WriteString("\n")
	}

	var fileDiagnostics []*ast.Diagnostic
	for _, d := range diagnostics {
		if d.File() != nil && mapped[d.File().FileName()] != nil {
			fileDiagnostics = append(fileDiagnostics, d)
		}
	}

	b.WriteString("=== Diagnostics ===\n\n")
	if len(fileDiagnostics) == 0 {
		b.WriteString(baseline.NoContent + "\n")
		return b.String()
	}
	var rendered strings.Builder
	diagnosticwriter.FormatDiagnosticsWithColorAndContext(
		&rendered,
		diagnosticwriter.ToDiagnostics(diagnosticwriter.WrapASTDiagnostics(fileDiagnostics)),
		contentMapperFormatOpts,
	)
	b.WriteString(removeTestPathPrefixes(ansiEscape.ReplaceAllString(rendered.String(), ""), false))
	return b.String()
}

func ensureTrailingNewline(s string) string {
	if s == "" || strings.HasSuffix(s, "\n") {
		return s
	}
	return s + "\n"
}
