package baseline

import (
	"fmt"
	"regexp"
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/compiler/stringutil"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tspath"
	"gotest.tools/v3/assert"
	"gotest.tools/v3/assert/cmp"
)

// IO
const harnessNewLine = "\r\n"

var (
	lineDelimiter = regexp.MustCompile("\r?\n")
	nonWhitespace = regexp.MustCompile(`\S`)
	tsExtension   = regexp.MustCompile(`\.tsx?$`)
)

var formatOpts = &compiler.DiagnosticsFormattingOptions{
	NewLine: harnessNewLine,
}

type TestFile struct {
	unitName    string
	content     string
	fileOptions map[string]string
}

var diagnosticsLocationPrefix = regexp.MustCompile(`(?im)^(lib.*\.d\.ts)\(\d+,\d+\)`)
var diagnosticsLocationPattern = regexp.MustCompile(`(?i)(lib.*\.d\.ts):\d+:\d+`)

func DoErrorBaseline(t testing.TB, baselinePath string, inputFiles []*TestFile, errors []*compiler.Diagnostic, pretty bool) {
	baselinePath = tsExtension.ReplaceAllString(baselinePath, ".errors.txt")
	var errorBaseline string
	if len(errors) > 0 {
		errorBaseline = getErrorBaseline(t, inputFiles, errors, pretty)
	} else {
		errorBaseline = NoContent
	}
	Run(t, baselinePath, errorBaseline, Options{})
}

func minimalDiagnosticsToString(diagnostics []*compiler.Diagnostic, pretty bool) string {
	var output strings.Builder
	if pretty {
		compiler.FormatDiagnosticsWithColorAndContext(&output, diagnostics, formatOpts)
	} else {
		compiler.WriteFormatDiagnostics(&output, diagnostics, formatOpts)
	}
	return output.String()
}

func getErrorBaseline(t testing.TB, inputFiles []*TestFile, diagnostics []*compiler.Diagnostic, pretty bool) string {
	t.Helper()
	outputLines := iterateErrorBaseline(t, inputFiles, diagnostics, pretty)

	if pretty {
		var summaryBuilder strings.Builder
		compiler.WriteErrorSummaryText(
			&summaryBuilder,
			diagnostics,
			formatOpts)
		summary := removeTestPathPrefixes(summaryBuilder.String(), false)
		outputLines = append(outputLines, summary)
	}
	return strings.Join(outputLines, "")
}

func iterateErrorBaseline(t testing.TB, inputFiles []*TestFile, inputDiagnostics []*compiler.Diagnostic, pretty bool) []string {
	t.Helper()
	diagnostics := slices.Clone(inputDiagnostics)
	slices.SortFunc(diagnostics, compiler.CompareDiagnostics)

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

	outputErrorText := func(diag *compiler.Diagnostic) {
		message := flattenDiagnosticMessage(diag, harnessNewLine)

		var errLines []string
		for _, line := range strings.Split(removeTestPathPrefixes(message, false), "\n") {
			line = strings.TrimSuffix(line, "\r")
			if len(line) < 0 {
				continue
			}
			out := fmt.Sprintf("!!! %s TS%d: %s", diag.Category().String(), diag.Code(), line)
			errLines = append(errLines, out)
		}

		for _, info := range diag.RelatedInformation() {
			var location string
			if info.File() != nil {
				location = " " + formatLocation(info.File(), info.Loc().Pos(), formatOpts, func(output *strings.Builder, text string, formatStyle string) { output.WriteString(text) })
			}
			location = removeTestPathPrefixes(location, false)
			if len(location) > 0 && isDefaultLibraryFile(info.File().FileName()) {
				location = diagnosticsLocationPattern.ReplaceAllString(location, "$1:--:--")
			}
			errLines = append(errLines, fmt.Sprintf("!!! related TS%d%s: %s", info.Code(), location, flattenDiagnosticMessage(info, harnessNewLine)))
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
	nonEmptyFiles := core.Filter(inputFiles, func(f *TestFile) bool { return len(f.content) > 0 })
	for _, inputFile := range nonEmptyFiles {
		// Filter down to the errors in the file
		fileErrors := core.Filter(diagnostics, func(e *compiler.Diagnostic) bool {
			return e.File() != nil &&
				tspath.ComparePaths(removeTestPathPrefixes(e.File().FileName(), false), removeTestPathPrefixes(inputFile.unitName, false), tspath.ComparePathsOptions{}) == core.ComparisonEqual
		})

		// Header
		fmt.Fprintf(&outputLines,
			"%s==== %s (%d errors) ====",
			newLine(),
			removeTestPathPrefixes(inputFile.unitName, false),
			len(fileErrors),
		)

		// Make sure we emit something for every error
		markedErrorCount := 0
		// For each line, emit the line followed by any error squiggles matching this line

		lineStarts := stringutil.ComputeLineStarts(inputFile.content)
		lines := lineDelimiter.Split(inputFile.content, -1)

		for lineIndex, line := range lines {
			thisLineStart := int(lineStarts[lineIndex])
			var nextLineStart int
			// On the last line of the file, fake the next line start number so that we handle errors on the last character of the file correctly
			if lineIndex == len(lines)-1 {
				nextLineStart = len(inputFile.content)
			} else {
				nextLineStart = int(lineStarts[lineIndex+1])
			}
			// Emit this line from the original file
			outputLines.WriteString(newLine())
			outputLines.WriteString("    ")
			outputLines.WriteString(line)
			for _, errDiagnostic := range fileErrors {
				// Does any error start or continue on to this line? Emit squiggles
				end := errDiagnostic.Loc().End()
				if end >= thisLineStart && (errDiagnostic.Loc().Pos() < nextLineStart || lineIndex == len(lines)-1) {
					// How many characters from the start of this line the error starts at (could be positive or negative)
					relativeOffset := errDiagnostic.Loc().Pos() - thisLineStart
					// How many characters of the error are on this line (might be longer than this line in reality)
					length := (end - errDiagnostic.Loc().Pos()) - max(0, -relativeOffset)
					// Calculate the start of the squiggle
					squiggleStart := max(0, relativeOffset)
					// TODO/REVIEW: this doesn't work quite right in the browser if a multi file test has files whose names are just the right length relative to one another
					outputLines.WriteString(newLine())
					outputLines.WriteString("    ")
					outputLines.WriteString(nonWhitespace.ReplaceAllString(line[:squiggleStart], " "))
					outputLines.WriteString(strings.Repeat("~", min(length, len(line)-squiggleStart)))

					// If the error ended here, or we're at the end of the file, emit its message
					if lineIndex == len(lines)-1 || nextLineStart > end {
						outputErrorText(errDiagnostic)
						markedErrorCount++
					}
				}
			}
		}

		// Verify we didn't miss any errors in this file
		assert.Check(t, cmp.Equal(markedErrorCount, len(fileErrors)), "count of errors in "+inputFile.unitName)
		_, isDupe := dupeCase[sanitizeTestFilePath(inputFile.unitName)]
		checkDuplicatedFileName(inputFile.unitName, dupeCase)
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
		func(d *compiler.Diagnostic) bool {
			return d.File() != nil && (isDefaultLibraryFile(d.File().FileName()) || isBuiltFile(d.File().FileName()))
		})
	numTsconfigDiagnostics := core.CountWhere(
		diagnostics,
		func(d *compiler.Diagnostic) bool {
			return d.File() != nil && isTsConfigFile(d.File().FileName())
		})

	// Verify we didn't miss any errors in total
	assert.Check(t, cmp.Equal(totalErrorsReportedInNonLibraryNonTsconfigFiles+numLibraryDiagnostics+numTsconfigDiagnostics, len(diagnostics)), "total number of errors")
	return result
}

func checkDuplicatedFileName(resultName string, dupeCase map[string]int) string {
	resultName = sanitizeTestFilePath(resultName)
	if _, ok := dupeCase[resultName]; ok {
		// A different baseline filename should be manufactured if the names differ only in case, for windows compat
		count := 1 + dupeCase[resultName]
		dupeCase[resultName] = count
		resultName = fmt.Sprintf("%s.dupe%d", resultName, count)
	} else {
		dupeCase[resultName] = 0
	}
	return resultName
}

func flattenDiagnosticMessage(d *compiler.Diagnostic, newLine string) string {
	var output strings.Builder
	compiler.WriteFlattenedDiagnosticMessage(&output, d, newLine)
	return output.String()
}

func formatLocation(file *compiler.SourceFile, pos int, formatOpts *compiler.DiagnosticsFormattingOptions, writeWithStyleAndReset compiler.FormattedWriter) string {
	var output strings.Builder
	compiler.WriteLocation(&output, file, pos, formatOpts, writeWithStyleAndReset)
	return output.String()
}
