package tsbaseline

import (
	"fmt"
	"io"
	"regexp"
	"slices"
	"strings"
	"testing"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnosticwriter"
	"github.com/microsoft/typescript-go/internal/testutil/baseline"
	"github.com/microsoft/typescript-go/internal/testutil/harnessutil"
	"github.com/microsoft/typescript-go/internal/tspath"
	"gotest.tools/v3/assert"
	"gotest.tools/v3/assert/cmp"
)

// IO
const harnessNewLine = "\r\n"

var formatOpts = &diagnosticwriter.FormattingOptions{
	NewLine: harnessNewLine,
}

var (
	diagnosticsLocationPrefix  = regexp.MustCompile(`(?im)^(lib.*\.d\.ts)\(\d+,\d+\)`)
	diagnosticsLocationPattern = regexp.MustCompile(`(?i)(lib.*\.d\.ts):\d+:\d+`)
)

func DoErrorBaseline(t *testing.T, baselinePath string, inputFiles []*harnessutil.TestFile, errors []*ast.Diagnostic, pretty bool, opts baseline.Options) {
	baselinePath = tsExtension.ReplaceAllString(baselinePath, ".errors.txt")
	var errorBaseline string
	if len(errors) > 0 {
		errorBaseline = getErrorBaseline(t, inputFiles, errors, pretty)
	} else {
		errorBaseline = baseline.NoContent
	}
	baseline.Run(t, baselinePath, errorBaseline, opts)
}

func minimalDiagnosticsToString(diagnostics []*ast.Diagnostic, pretty bool) string {
	var output strings.Builder
	if pretty {
		diagnosticwriter.FormatDiagnosticsWithColorAndContext(&output, diagnostics, formatOpts)
	} else {
		diagnosticwriter.WriteFormatDiagnostics(&output, diagnostics, formatOpts)
	}
	return output.String()
}

func getErrorBaseline(t *testing.T, inputFiles []*harnessutil.TestFile, diagnostics []*ast.Diagnostic, pretty bool) string {
	t.Helper()
	outputLines := iterateErrorBaseline(t, inputFiles, diagnostics, pretty)

	if pretty {
		var summaryBuilder strings.Builder
		diagnosticwriter.WriteErrorSummaryText(
			&summaryBuilder,
			diagnostics,
			formatOpts)
		summary := removeTestPathPrefixes(summaryBuilder.String(), false)
		outputLines = append(outputLines, summary)
	}
	return strings.Join(outputLines, "")
}

func iterateErrorBaseline(t *testing.T, inputFiles []*harnessutil.TestFile, inputDiagnostics []*ast.Diagnostic, pretty bool) []string {
	t.Helper()
	diagnostics := slices.Clone(inputDiagnostics)
	slices.SortFunc(diagnostics, ast.CompareDiagnostics)

	var outputLines strings.Builder
	// Count up all errors that were found in files other than lib.d.ts so we don't miss any
	totalErrorsReportedInNonLibraryNonTsconfigFiles := 0
	errorsReported := 0

	firstLine := true

	newLine := func() string {
		if firstLine {
			firstLine = false
			return ""
		}
		return "\r\n"
	}

	var result []string

	outputErrorText := func(diag *ast.Diagnostic) {
		message := diagnosticwriter.FlattenDiagnosticMessage(diag, harnessNewLine)

		var errLines []string
		for _, line := range strings.Split(removeTestPathPrefixes(message, false), "\n") {
			line = strings.TrimSuffix(line, "\r")
			if len(line) < 0 {
				continue
			}
			out := fmt.Sprintf("!!! %s TS%d: %s", diag.Category().Name(), diag.Code(), line)
			errLines = append(errLines, out)
		}

		for _, info := range diag.RelatedInformation() {
			var location string
			if info.File() != nil {
				location = " " + formatLocation(info.File(), info.Loc().Pos(), formatOpts, func(output io.Writer, text string, formatStyle string) { fmt.Fprint(output, text) })
			}
			location = removeTestPathPrefixes(location, false)
			if len(location) > 0 && isDefaultLibraryFile(info.File().FileName()) {
				location = diagnosticsLocationPattern.ReplaceAllString(location, "$1:--:--")
			}
			errLines = append(errLines, fmt.Sprintf("!!! related TS%d%s: %s", info.Code(), location, diagnosticwriter.FlattenDiagnosticMessage(info, harnessNewLine)))
		}

		for _, e := range errLines {
			outputLines.WriteString(newLine())
			outputLines.WriteString(e)
		}

		errorsReported++

		// do not count errors from lib.d.ts here, they are computed separately as numLibraryDiagnostics
		// if lib.d.ts is explicitly included in input files and there are some errors in it (i.e. because of duplicate identifiers)
		// then they will be added twice thus triggering 'total errors' assertion with condition
		// Similarly for tsconfig, which may be in the input files and contain errors.
		// 'totalErrorsReportedInNonLibraryNonTsconfigFiles + numLibraryDiagnostics + numTsconfigDiagnostics, diagnostics.length

		if diag.File() == nil || !isDefaultLibraryFile(diag.File().FileName()) && !isTsConfigFile(diag.File().FileName()) {
			totalErrorsReportedInNonLibraryNonTsconfigFiles++
		}
	}

	topDiagnostics := minimalDiagnosticsToString(diagnostics, pretty)
	topDiagnostics = removeTestPathPrefixes(topDiagnostics, false)
	topDiagnostics = diagnosticsLocationPrefix.ReplaceAllString(topDiagnostics, "$1(--,--)")

	result = append(result, topDiagnostics+harnessNewLine+harnessNewLine)

	// Report global errors
	for _, error := range diagnostics {
		if error.File() == nil {
			outputErrorText(error)
		}
	}

	result = append(result, outputLines.String())
	outputLines.Reset()
	errorsReported = 0

	// 'merge' the lines of each input file with any errors associated with it
	dupeCase := map[string]int{}
	nonEmptyFiles := core.Filter(inputFiles, func(f *harnessutil.TestFile) bool { return len(f.Content) > 0 })
	for _, inputFile := range nonEmptyFiles {
		// Filter down to the errors in the file
		fileErrors := core.Filter(diagnostics, func(e *ast.Diagnostic) bool {
			return e.File() != nil &&
				tspath.ComparePaths(removeTestPathPrefixes(e.File().FileName(), false), removeTestPathPrefixes(inputFile.UnitName, false), tspath.ComparePathsOptions{}) == 0
		})

		// Header
		fmt.Fprintf(&outputLines,
			"%s==== %s (%d errors) ====",
			newLine(),
			removeTestPathPrefixes(inputFile.UnitName, false),
			len(fileErrors),
		)

		// Make sure we emit something for every error
		markedErrorCount := 0
		// For each line, emit the line followed by any error squiggles matching this line

		lineStarts := core.ComputeLineStarts(inputFile.Content)
		lines := lineDelimiter.Split(inputFile.Content, -1)

		for lineIndex, line := range lines {
			if len(line) > 0 && line[len(line)-1] == '\r' {
				line = line[:len(line)-1]
			}

			thisLineStart := int(lineStarts[lineIndex])
			var nextLineStart int
			// On the last line of the file, fake the next line start number so that we handle errors on the last character of the file correctly
			if lineIndex == len(lines)-1 {
				nextLineStart = len(inputFile.Content)
			} else {
				nextLineStart = int(lineStarts[lineIndex+1])
			}
			// Emit this line from the original file
			outputLines.WriteString(newLine())
			outputLines.WriteString("    ")
			outputLines.WriteString(line)
			for _, errDiagnostic := range fileErrors {
				// Does any error start or continue on to this line? Emit squiggles
				errStart := errDiagnostic.Loc().Pos()
				end := errDiagnostic.Loc().End()
				if end >= thisLineStart && (errStart < nextLineStart || lineIndex == len(lines)-1) {
					// How many characters from the start of this line the error starts at (could be positive or negative)
					relativeOffset := errStart - thisLineStart
					// How many characters of the error are on this line (might be longer than this line in reality)
					length := (end - errStart) - max(0, thisLineStart-errStart)
					// Calculate the start of the squiggle
					squiggleStart := max(0, relativeOffset)
					// TODO/REVIEW: this doesn't work quite right in the browser if a multi file test has files whose names are just the right length relative to one another
					outputLines.WriteString(newLine())
					outputLines.WriteString("    ")
					outputLines.WriteString(nonWhitespace.ReplaceAllString(line[:squiggleStart], " "))
					// This was `new Array(count).join("~")`; which maps 0 to "", 1 to "", 2 to "~", 3 to "~~", etc.
					squiggleEnd := max(squiggleStart, min(squiggleStart+length, len(line)))
					outputLines.WriteString(strings.Repeat("~", utf8.RuneCountInString(line[squiggleStart:squiggleEnd])))
					// If the error ended here, or we're at the end of the file, emit its message
					if lineIndex == len(lines)-1 || nextLineStart > end {
						outputErrorText(errDiagnostic)
						markedErrorCount++
					}
				}
			}
		}

		// Verify we didn't miss any errors in this file
		assert.Check(t, cmp.Equal(markedErrorCount, len(fileErrors)), "count of errors in "+inputFile.UnitName)
		_, isDupe := dupeCase[sanitizeTestFilePath(inputFile.UnitName)]
		result = append(result, outputLines.String())
		if isDupe {
			// Case-duplicated files on a case-insensitive build will have errors reported in both the dupe and the original
			// thanks to the canse-insensitive path comparison on the error file path - We only want to count those errors once
			// for the assert below, so we subtract them here.
			totalErrorsReportedInNonLibraryNonTsconfigFiles -= errorsReported
		}
		outputLines.Reset()
		errorsReported = 0
	}

	numLibraryDiagnostics := core.CountWhere(
		diagnostics,
		func(d *ast.Diagnostic) bool {
			return d.File() != nil && (isDefaultLibraryFile(d.File().FileName()) || isBuiltFile(d.File().FileName()))
		})
	numTsconfigDiagnostics := core.CountWhere(
		diagnostics,
		func(d *ast.Diagnostic) bool {
			return d.File() != nil && isTsConfigFile(d.File().FileName())
		})

	// Verify we didn't miss any errors in total
	assert.Check(t, cmp.Equal(totalErrorsReportedInNonLibraryNonTsconfigFiles+numLibraryDiagnostics+numTsconfigDiagnostics, len(diagnostics)), "total number of errors")
	return result
}

func formatLocation(file *ast.SourceFile, pos int, formatOpts *diagnosticwriter.FormattingOptions, writeWithStyleAndReset diagnosticwriter.FormattedWriter) string {
	var output strings.Builder
	diagnosticwriter.WriteLocation(&output, file, pos, formatOpts, writeWithStyleAndReset)
	return output.String()
}
