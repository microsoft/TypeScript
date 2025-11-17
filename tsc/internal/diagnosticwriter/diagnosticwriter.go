package diagnosticwriter

import (
	"fmt"
	"io"
	"maps"
	"slices"
	"strconv"
	"strings"
	"unicode"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type FileLike interface {
	FileName() string
	Text() string
	ECMALineMap() []core.TextPos
}

// Diagnostic interface abstracts over ast.Diagnostic and LSP diagnostics
type Diagnostic interface {
	File() FileLike
	Pos() int
	End() int
	Len() int
	Code() int32
	Category() diagnostics.Category
	Message() string
	MessageChain() []Diagnostic
	RelatedInformation() []Diagnostic
}

// ASTDiagnostic wraps ast.Diagnostic to implement the Diagnostic interface
type ASTDiagnostic struct {
	*ast.Diagnostic
}

func (d *ASTDiagnostic) RelatedInformation() []Diagnostic {
	related := d.Diagnostic.RelatedInformation()
	result := make([]Diagnostic, len(related))
	for i, r := range related {
		result[i] = &ASTDiagnostic{r}
	}
	return result
}

func (d *ASTDiagnostic) File() FileLike {
	if file := d.Diagnostic.File(); file != nil {
		return file
	}
	return nil
}

func (d *ASTDiagnostic) MessageChain() []Diagnostic {
	chain := d.Diagnostic.MessageChain()
	result := make([]Diagnostic, len(chain))
	for i, c := range chain {
		result[i] = &ASTDiagnostic{c}
	}
	return result
}

func WrapASTDiagnostic(d *ast.Diagnostic) *ASTDiagnostic {
	return &ASTDiagnostic{d}
}

func WrapASTDiagnostics(diags []*ast.Diagnostic) []*ASTDiagnostic {
	result := make([]*ASTDiagnostic, len(diags))
	for i, d := range diags {
		result[i] = WrapASTDiagnostic(d)
	}
	return result
}

func FromASTDiagnostics(diags []*ast.Diagnostic) []Diagnostic {
	result := make([]Diagnostic, len(diags))
	for i, d := range diags {
		result[i] = WrapASTDiagnostic(d)
	}
	return result
}

func ToDiagnostics[T Diagnostic](diags []T) []Diagnostic {
	result := make([]Diagnostic, len(diags))
	for i, d := range diags {
		result[i] = d
	}
	return result
}

func CompareASTDiagnostics(a, b *ASTDiagnostic) int {
	return ast.CompareDiagnostics(a.Diagnostic, b.Diagnostic)
}

type FormattingOptions struct {
	tspath.ComparePathsOptions
	NewLine string
}

const (
	foregroundColorEscapeGrey   = "\u001b[90m"
	foregroundColorEscapeRed    = "\u001b[91m"
	foregroundColorEscapeYellow = "\u001b[93m"
	foregroundColorEscapeBlue   = "\u001b[94m"
	foregroundColorEscapeCyan   = "\u001b[96m"
)

const (
	gutterStyleSequence = "\u001b[7m"
	gutterSeparator     = " "
	resetEscapeSequence = "\u001b[0m"
	ellipsis            = "..."
)

func FormatDiagnosticsWithColorAndContext(output io.Writer, diags []Diagnostic, formatOpts *FormattingOptions) {
	if len(diags) == 0 {
		return
	}
	for i, diagnostic := range diags {
		if i > 0 {
			fmt.Fprint(output, formatOpts.NewLine)
		}
		FormatDiagnosticWithColorAndContext(output, diagnostic, formatOpts)
	}
}

func FormatDiagnosticWithColorAndContext(output io.Writer, diagnostic Diagnostic, formatOpts *FormattingOptions) {
	if diagnostic.File() != nil {
		file := diagnostic.File()
		pos := diagnostic.Pos()
		WriteLocation(output, file, pos, formatOpts, writeWithStyleAndReset)
		fmt.Fprint(output, " - ")
	}

	writeWithStyleAndReset(output, diagnostic.Category().Name(), getCategoryFormat(diagnostic.Category()))
	fmt.Fprintf(output, "%s TS%d: %s", foregroundColorEscapeGrey, diagnostic.Code(), resetEscapeSequence)
	WriteFlattenedDiagnosticMessage(output, diagnostic, formatOpts.NewLine)

	if diagnostic.File() != nil && diagnostic.Code() != diagnostics.File_appears_to_be_binary.Code() {
		fmt.Fprint(output, formatOpts.NewLine)
		writeCodeSnippet(output, diagnostic.File(), diagnostic.Pos(), diagnostic.Len(), getCategoryFormat(diagnostic.Category()), "", formatOpts)
		fmt.Fprint(output, formatOpts.NewLine)
	}

	if (diagnostic.RelatedInformation() != nil) && (len(diagnostic.RelatedInformation()) > 0) {
		for _, relatedInformation := range diagnostic.RelatedInformation() {
			file := relatedInformation.File()
			if file != nil {
				fmt.Fprint(output, formatOpts.NewLine)
				fmt.Fprint(output, "  ")
				pos := relatedInformation.Pos()
				WriteLocation(output, file, pos, formatOpts, writeWithStyleAndReset)
				fmt.Fprint(output, " - ")
				WriteFlattenedDiagnosticMessage(output, relatedInformation, formatOpts.NewLine)
				writeCodeSnippet(output, file, pos, relatedInformation.Len(), foregroundColorEscapeCyan, "    ", formatOpts)
			}
			fmt.Fprint(output, formatOpts.NewLine)
		}
	}
}

func writeCodeSnippet(writer io.Writer, sourceFile FileLike, start int, length int, squiggleColor string, indent string, formatOpts *FormattingOptions) {
	firstLine, firstLineChar := scanner.GetECMALineAndCharacterOfPosition(sourceFile, start)
	lastLine, lastLineChar := scanner.GetECMALineAndCharacterOfPosition(sourceFile, start+length)
	if length == 0 {
		lastLineChar++ // When length is zero, squiggle the character right after the start position.
	}

	lastLineOfFile := scanner.GetECMALineOfPosition(sourceFile, len(sourceFile.Text()))

	hasMoreThanFiveLines := lastLine-firstLine >= 4
	gutterWidth := len(strconv.Itoa(lastLine + 1))
	if hasMoreThanFiveLines {
		gutterWidth = max(len(ellipsis), gutterWidth)
	}

	for i := firstLine; i <= lastLine; i++ {
		fmt.Fprint(writer, formatOpts.NewLine)

		// If the error spans over 5 lines, we'll only show the first 2 and last 2 lines,
		// so we'll skip ahead to the second-to-last line.
		if hasMoreThanFiveLines && firstLine+1 < i && i < lastLine-1 {
			fmt.Fprint(writer, indent)
			fmt.Fprint(writer, gutterStyleSequence)
			fmt.Fprintf(writer, "%*s", gutterWidth, ellipsis)
			fmt.Fprint(writer, resetEscapeSequence)
			fmt.Fprint(writer, gutterSeparator)
			fmt.Fprint(writer, formatOpts.NewLine)
			i = lastLine - 1
		}

		lineStart := scanner.GetECMAPositionOfLineAndCharacter(sourceFile, i, 0)
		var lineEnd int
		if i < lastLineOfFile {
			lineEnd = scanner.GetECMAPositionOfLineAndCharacter(sourceFile, i+1, 0)
		} else {
			lineEnd = len(sourceFile.Text())
		}

		lineContent := strings.TrimRightFunc(sourceFile.Text()[lineStart:lineEnd], unicode.IsSpace) // trim from end
		lineContent = strings.ReplaceAll(lineContent, "\t", " ")                                    // convert tabs to single spaces

		// Output the gutter and the actual contents of the line.
		fmt.Fprint(writer, indent)
		fmt.Fprint(writer, gutterStyleSequence)
		fmt.Fprintf(writer, "%*d", gutterWidth, i+1)
		fmt.Fprint(writer, resetEscapeSequence)
		fmt.Fprint(writer, gutterSeparator)
		fmt.Fprint(writer, lineContent)
		fmt.Fprint(writer, formatOpts.NewLine)

		// Output the gutter and the error span for the line using tildes.
		fmt.Fprint(writer, indent)
		fmt.Fprint(writer, gutterStyleSequence)
		fmt.Fprintf(writer, "%*s", gutterWidth, "")
		fmt.Fprint(writer, resetEscapeSequence)
		fmt.Fprint(writer, gutterSeparator)
		fmt.Fprint(writer, squiggleColor)
		switch i {
		case firstLine:
			// If we're on the last line, then limit it to the last character of the last line.
			// Otherwise, we'll just squiggle the rest of the line, giving 'slice' no end position.
			var lastCharForLine int
			if i == lastLine {
				lastCharForLine = lastLineChar
			} else {
				lastCharForLine = len(lineContent)
			}

			// Fill with spaces until the first character,
			// then squiggle the remainder of the line.
			fmt.Fprint(writer, strings.Repeat(" ", firstLineChar))
			fmt.Fprint(writer, strings.Repeat("~", lastCharForLine-firstLineChar))
		case lastLine:
			// Squiggle until the final character.
			fmt.Fprint(writer, strings.Repeat("~", lastLineChar))
		default:
			// Squiggle the entire line.
			fmt.Fprint(writer, strings.Repeat("~", len(lineContent)))
		}

		fmt.Fprint(writer, resetEscapeSequence)
	}
}

func FlattenDiagnosticMessage(d Diagnostic, newLine string) string {
	var output strings.Builder
	WriteFlattenedDiagnosticMessage(&output, d, newLine)
	return output.String()
}

func WriteFlattenedASTDiagnosticMessage(writer io.Writer, diagnostic *ast.Diagnostic, newline string) {
	WriteFlattenedDiagnosticMessage(writer, WrapASTDiagnostic(diagnostic), newline)
}

func WriteFlattenedDiagnosticMessage(writer io.Writer, diagnostic Diagnostic, newline string) {
	fmt.Fprint(writer, diagnostic.Message())

	for _, chain := range diagnostic.MessageChain() {
		flattenDiagnosticMessageChain(writer, chain, newline, 1 /*level*/)
	}
}

func flattenDiagnosticMessageChain(writer io.Writer, chain Diagnostic, newLine string, level int) {
	fmt.Fprint(writer, newLine)
	for range level {
		fmt.Fprint(writer, "  ")
	}

	fmt.Fprint(writer, chain.Message())
	for _, child := range chain.MessageChain() {
		flattenDiagnosticMessageChain(writer, child, newLine, level+1)
	}
}

func getCategoryFormat(category diagnostics.Category) string {
	switch category {
	case diagnostics.CategoryError:
		return foregroundColorEscapeRed
	case diagnostics.CategoryWarning:
		return foregroundColorEscapeYellow
	case diagnostics.CategorySuggestion:
		return foregroundColorEscapeGrey
	case diagnostics.CategoryMessage:
		return foregroundColorEscapeBlue
	}
	panic("Unhandled diagnostic category")
}

type FormattedWriter func(output io.Writer, text string, formatStyle string)

func writeWithStyleAndReset(output io.Writer, text string, formatStyle string) {
	fmt.Fprint(output, formatStyle)
	fmt.Fprint(output, text)
	fmt.Fprint(output, resetEscapeSequence)
}

func WriteLocation(output io.Writer, file FileLike, pos int, formatOpts *FormattingOptions, writeWithStyleAndReset FormattedWriter) {
	firstLine, firstChar := scanner.GetECMALineAndCharacterOfPosition(file, pos)
	var relativeFileName string
	if formatOpts != nil {
		relativeFileName = tspath.ConvertToRelativePath(file.FileName(), formatOpts.ComparePathsOptions)
	} else {
		relativeFileName = file.FileName()
	}

	writeWithStyleAndReset(output, relativeFileName, foregroundColorEscapeCyan)
	fmt.Fprint(output, ":")
	writeWithStyleAndReset(output, strconv.Itoa(firstLine+1), foregroundColorEscapeYellow)
	fmt.Fprint(output, ":")
	writeWithStyleAndReset(output, strconv.Itoa(firstChar+1), foregroundColorEscapeYellow)
}

// Some of these lived in watch.ts, but they're not specific to the watch API.

type ErrorSummary struct {
	TotalErrorCount int
	GlobalErrors    []Diagnostic
	ErrorsByFile    map[FileLike][]Diagnostic
	SortedFiles     []FileLike
}

func WriteErrorSummaryText(output io.Writer, allDiagnostics []Diagnostic, formatOpts *FormattingOptions) {
	// Roughly corresponds to 'getErrorSummaryText' from watch.ts

	errorSummary := getErrorSummary(allDiagnostics)
	totalErrorCount := errorSummary.TotalErrorCount
	if totalErrorCount == 0 {
		return
	}

	var firstFile FileLike
	if len(errorSummary.SortedFiles) > 0 {
		firstFile = errorSummary.SortedFiles[0]
	}
	firstFileName := prettyPathForFileError(firstFile, errorSummary.ErrorsByFile[firstFile], formatOpts)
	numErroringFiles := len(errorSummary.ErrorsByFile)

	var message string
	if totalErrorCount == 1 {
		// Special-case a single error.
		if len(errorSummary.GlobalErrors) > 0 || firstFileName == "" {
			message = diagnostics.Found_1_error.Format()
		} else {
			message = diagnostics.Found_1_error_in_0.Format(firstFileName)
		}
	} else {
		switch numErroringFiles {
		case 0:
			// No file-specific errors.
			message = diagnostics.Found_0_errors.Format(totalErrorCount)
		case 1:
			// One file with errors.
			message = diagnostics.Found_0_errors_in_the_same_file_starting_at_Colon_1.Format(totalErrorCount, firstFileName)
		default:
			// Multiple files with errors.
			message = diagnostics.Found_0_errors_in_1_files.Format(totalErrorCount, numErroringFiles)
		}
	}
	fmt.Fprint(output, formatOpts.NewLine)
	fmt.Fprint(output, message)
	fmt.Fprint(output, formatOpts.NewLine)
	fmt.Fprint(output, formatOpts.NewLine)
	if numErroringFiles > 1 {
		writeTabularErrorsDisplay(output, errorSummary, formatOpts)
		fmt.Fprint(output, formatOpts.NewLine)
	}
}

func getErrorSummary(diags []Diagnostic) *ErrorSummary {
	var totalErrorCount int
	var globalErrors []Diagnostic
	var errorsByFile map[FileLike][]Diagnostic

	for _, diagnostic := range diags {
		if diagnostic.Category() != diagnostics.CategoryError {
			continue
		}

		totalErrorCount++
		if diagnostic.File() == nil {
			globalErrors = append(globalErrors, diagnostic)
		} else {
			if errorsByFile == nil {
				errorsByFile = make(map[FileLike][]Diagnostic)
			}
			errorsByFile[diagnostic.File()] = append(errorsByFile[diagnostic.File()], diagnostic)
		}
	}

	// !!!
	// Need an ordered map here, but sorting for consistency.
	sortedFiles := slices.SortedFunc(maps.Keys(errorsByFile), func(a, b FileLike) int {
		return strings.Compare(a.FileName(), b.FileName())
	})

	return &ErrorSummary{
		TotalErrorCount: totalErrorCount,
		GlobalErrors:    globalErrors,
		ErrorsByFile:    errorsByFile,
		SortedFiles:     sortedFiles,
	}
}

func writeTabularErrorsDisplay(output io.Writer, errorSummary *ErrorSummary, formatOpts *FormattingOptions) {
	sortedFiles := errorSummary.SortedFiles

	maxErrors := 0
	for _, errorsForFile := range errorSummary.ErrorsByFile {
		maxErrors = max(maxErrors, len(errorsForFile))
	}

	// !!!
	// TODO (drosen): This was never localized.
	// Should make this better.
	headerRow := diagnostics.Errors_Files.Message()
	leftColumnHeadingLength := len(strings.Split(headerRow, " ")[0])
	lengthOfBiggestErrorCount := len(strconv.Itoa(maxErrors))
	leftPaddingGoal := max(leftColumnHeadingLength, lengthOfBiggestErrorCount)
	headerPadding := max(lengthOfBiggestErrorCount-leftColumnHeadingLength, 0)

	fmt.Fprint(output, strings.Repeat(" ", headerPadding))
	fmt.Fprint(output, headerRow)
	fmt.Fprint(output, formatOpts.NewLine)

	for _, file := range sortedFiles {
		fileErrors := errorSummary.ErrorsByFile[file]
		errorCount := len(fileErrors)

		fmt.Fprintf(output, "%*d  ", leftPaddingGoal, errorCount)
		fmt.Fprint(output, prettyPathForFileError(file, fileErrors, formatOpts))
		fmt.Fprint(output, formatOpts.NewLine)
	}
}

func prettyPathForFileError(file FileLike, fileErrors []Diagnostic, formatOpts *FormattingOptions) string {
	if file == nil || len(fileErrors) == 0 {
		return ""
	}
	line := scanner.GetECMALineOfPosition(file, fileErrors[0].Pos())
	fileName := file.FileName()
	if tspath.PathIsAbsolute(fileName) && tspath.PathIsAbsolute(formatOpts.CurrentDirectory) {
		fileName = tspath.ConvertToRelativePath(file.FileName(), formatOpts.ComparePathsOptions)
	}
	return fmt.Sprintf("%s%s:%d%s",
		fileName,
		foregroundColorEscapeGrey,
		line+1,
		resetEscapeSequence,
	)
}

func WriteFormatDiagnostics(output io.Writer, diagnostics []Diagnostic, formatOpts *FormattingOptions) {
	for _, diagnostic := range diagnostics {
		WriteFormatDiagnostic(output, diagnostic, formatOpts)
	}
}

func WriteFormatDiagnostic(output io.Writer, diagnostic Diagnostic, formatOpts *FormattingOptions) {
	if diagnostic.File() != nil {
		line, character := scanner.GetECMALineAndCharacterOfPosition(diagnostic.File(), diagnostic.Pos())
		fileName := diagnostic.File().FileName()
		relativeFileName := tspath.ConvertToRelativePath(fileName, formatOpts.ComparePathsOptions)
		fmt.Fprintf(output, "%s(%d,%d): ", relativeFileName, line+1, character+1)
	}

	fmt.Fprintf(output, "%s TS%d: ", diagnostic.Category().Name(), diagnostic.Code())
	WriteFlattenedDiagnosticMessage(output, diagnostic, formatOpts.NewLine)
	fmt.Fprint(output, formatOpts.NewLine)
}

func FormatDiagnosticsStatusWithColorAndTime(output io.Writer, time string, diag Diagnostic, formatOpts *FormattingOptions) {
	fmt.Fprint(output, "[")
	writeWithStyleAndReset(output, time, foregroundColorEscapeGrey)
	fmt.Fprint(output, "] ")
	WriteFlattenedDiagnosticMessage(output, diag, formatOpts.NewLine)
}

func FormatDiagnosticsStatusAndTime(output io.Writer, time string, diag Diagnostic, formatOpts *FormattingOptions) {
	fmt.Fprint(output, time, " - ")
	WriteFlattenedDiagnosticMessage(output, diag, formatOpts.NewLine)
}

var ScreenStartingCodes = []int32{
	diagnostics.Starting_compilation_in_watch_mode.Code(),
	diagnostics.File_change_detected_Starting_incremental_compilation.Code(),
}

func TryClearScreen(output io.Writer, diag Diagnostic, options *core.CompilerOptions) bool {
	if !options.PreserveWatchOutput.IsTrue() &&
		!options.ExtendedDiagnostics.IsTrue() &&
		!options.Diagnostics.IsTrue() &&
		slices.Contains(ScreenStartingCodes, diag.Code()) {
		fmt.Fprint(output, "\x1B[2J\x1B[3J\x1B[H") // Clear screen and move cursor to home position
		return true
	}
	return false
}
