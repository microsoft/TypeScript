package compiler

import (
	"fmt"
	"maps"
	"slices"
	"strconv"
	"strings"
	"unicode"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type DiagnosticsFormattingOptions struct {
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

func FormatDiagnosticsWithColorAndContext(output *strings.Builder, diags []*ast.Diagnostic, formatOpts *DiagnosticsFormattingOptions) {
	if len(diags) == 0 {
		return
	}

	for i, diagnostic := range diags {
		if i > 0 {
			output.WriteString(formatOpts.NewLine)
		}

		if diagnostic.File() != nil {
			file := diagnostic.File()
			pos := diagnostic.Loc().Pos()
			WriteLocation(output, file, pos, formatOpts, writeWithStyleAndReset)
			output.WriteString(" - ")
		}

		writeWithStyleAndReset(output, diagnostic.Category().Name(), getCategoryFormat(diagnostic.Category()))
		fmt.Fprintf(output, "%s TS%d: %s", foregroundColorEscapeGrey, diagnostic.Code(), resetEscapeSequence)
		WriteFlattenedDiagnosticMessage(output, diagnostic, formatOpts.NewLine)

		if diagnostic.File() != nil && diagnostic.Code() != diagnostics.File_appears_to_be_binary.Code() {
			output.WriteString(formatOpts.NewLine)
			writeCodeSnippet(output, diagnostic.File(), diagnostic.Pos(), diagnostic.Len(), getCategoryFormat(diagnostic.Category()), formatOpts)
		}

		if (diagnostic.RelatedInformation() != nil) && (len(diagnostic.RelatedInformation()) > 0) {
			output.WriteString(formatOpts.NewLine)
			for _, relatedInformation := range diagnostic.RelatedInformation() {
				file := relatedInformation.File()
				if file != nil {
					output.WriteString(formatOpts.NewLine)
					pos := relatedInformation.Pos()
					WriteLocation(output, file, pos, formatOpts, writeWithStyleAndReset)
					writeCodeSnippet(output, file, pos, relatedInformation.Len(), foregroundColorEscapeCyan, formatOpts)
				}
				output.WriteString(formatOpts.NewLine)
				WriteFlattenedDiagnosticMessage(output, relatedInformation, formatOpts.NewLine)
			}
		}

		output.WriteString(formatOpts.NewLine)
	}
}

func writeCodeSnippet(writer *strings.Builder, sourceFile *ast.SourceFile, start int, length int, squiggleColor string, formatOpts *DiagnosticsFormattingOptions) {
	firstLine, firstLineChar := scanner.GetLineAndCharacterOfPosition(sourceFile, start)
	lastLine, lastLineChar := scanner.GetLineAndCharacterOfPosition(sourceFile, start+length)

	lastLineOfFile, _ := scanner.GetLineAndCharacterOfPosition(sourceFile, len(sourceFile.Text))

	hasMoreThanFiveLines := lastLine-firstLine >= 4
	gutterWidth := len(strconv.Itoa(lastLineOfFile + 1))

	for i := firstLine; i <= lastLine; i++ {
		writer.WriteString(formatOpts.NewLine)

		// If the error spans over 5 lines, we'll only show the first 2 and last 2 lines,
		// so we'll skip ahead to the second-to-last line.
		if hasMoreThanFiveLines && firstLine+1 < i && i < lastLine-1 {
			writer.WriteString(gutterStyleSequence)
			fmt.Fprintf(writer, "%*s", gutterWidth, ellipsis)
			writer.WriteString(resetEscapeSequence)
			writer.WriteString(gutterSeparator)
			writer.WriteString(formatOpts.NewLine)
			i = lastLine - 1
		}

		lineStart := scanner.GetPositionOfLineAndCharacter(sourceFile, i, 0)
		var lineEnd int
		if i < lastLineOfFile {
			lineEnd = scanner.GetPositionOfLineAndCharacter(sourceFile, i+1, 0)
		} else {
			lineEnd = sourceFile.Loc.End()
		}

		lineContent := strings.TrimRightFunc(sourceFile.Text[lineStart:lineEnd], unicode.IsSpace) // trim from end
		lineContent = strings.ReplaceAll(lineContent, "\t", " ")                                  // convert tabs to single spaces

		// Output the gutter and the actual contents of the line.
		writer.WriteString(gutterStyleSequence)
		fmt.Fprintf(writer, "%*d", gutterWidth, i+1)
		writer.WriteString(resetEscapeSequence)
		writer.WriteString(gutterSeparator)
		writer.WriteString(lineContent)
		writer.WriteString(formatOpts.NewLine)

		// Output the gutter and the error span for the line using tildes.
		writer.WriteString(gutterStyleSequence)
		fmt.Fprintf(writer, "%*s", gutterWidth, "")
		writer.WriteString(resetEscapeSequence)
		writer.WriteString(gutterSeparator)
		writer.WriteString(squiggleColor)
		if i == firstLine {
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
			writer.WriteString(strings.Repeat(" ", firstLineChar))
			writer.WriteString(strings.Repeat("~", lastCharForLine-firstLineChar))
		} else if i == lastLine {
			// Squiggle until the final character.
			writer.WriteString(strings.Repeat("~", lastLineChar))
		} else {
			// Squiggle the entire line.
			writer.WriteString(strings.Repeat("~", len(lineContent)))
		}

		writer.WriteString(resetEscapeSequence)
	}
}

func WriteFlattenedDiagnosticMessage(writer *strings.Builder, diagnostic *ast.Diagnostic, newline string) {
	writer.WriteString(diagnostic.Message())

	for _, chain := range diagnostic.MessageChain() {
		flattenDiagnosticMessageChain(writer, chain, newline, 1 /*level*/)
	}
}

func flattenDiagnosticMessageChain(writer *strings.Builder, chain *ast.MessageChain, newLine string, level int) {
	writer.WriteString(newLine)
	for range level {
		writer.WriteString("  ")
	}

	writer.WriteString(chain.Message())
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

type FormattedWriter func(output *strings.Builder, text string, formatStyle string)

func writeWithStyleAndReset(output *strings.Builder, text string, formatStyle string) {
	output.WriteString(formatStyle)
	output.WriteString(text)
	output.WriteString(resetEscapeSequence)
}

func WriteLocation(output *strings.Builder, file *ast.SourceFile, pos int, formatOpts *DiagnosticsFormattingOptions, writeWithStyleAndReset FormattedWriter) {
	firstLine, firstChar := scanner.GetLineAndCharacterOfPosition(file, pos)
	var relativeFileName string
	if formatOpts != nil {
		relativeFileName = tspath.ConvertToRelativePath(file.Path(), formatOpts.ComparePathsOptions)
	} else {
		relativeFileName = file.Path()
	}

	writeWithStyleAndReset(output, relativeFileName, foregroundColorEscapeCyan)
	output.WriteByte(':')
	writeWithStyleAndReset(output, strconv.Itoa(firstLine+1), foregroundColorEscapeYellow)
	output.WriteByte(':')
	writeWithStyleAndReset(output, strconv.Itoa(firstChar+1), foregroundColorEscapeYellow)
}

// Some of these lived in watch.ts, but they're not specific to the watch API.

type ErrorSummary struct {
	TotalErrorCount int
	GlobalErrors    []*ast.Diagnostic
	ErrorsByFiles   map[*ast.SourceFile][]*ast.Diagnostic
	SortedFileList  []*ast.SourceFile
}

func WriteErrorSummaryText(output *strings.Builder, allDiagnostics []*ast.Diagnostic, formatOpts *DiagnosticsFormattingOptions) {
	// Roughly corresponds to 'getErrorSummaryText' from watch.ts

	errorSummary := getErrorSummary(allDiagnostics)
	totalErrorCount := errorSummary.TotalErrorCount
	if totalErrorCount == 0 {
		return
	}

	firstFile := errorSummary.SortedFileList[0]
	firstFileName := prettyPathForFileError(firstFile, errorSummary.ErrorsByFiles[firstFile], formatOpts)
	numErroringFiles := len(errorSummary.ErrorsByFiles)

	var message string
	if totalErrorCount == 1 {
		// Special-case a single error.
		if len(errorSummary.GlobalErrors) > 0 {
			message = diagnostics.Found_1_error.Format()
		} else {
			message = diagnostics.Found_1_error_in_0.Format(firstFileName)
		}
	} else {
		if numErroringFiles == 0 {
			// No file-specific errors.
			message = diagnostics.Found_0_errors.Format(totalErrorCount)
		} else if numErroringFiles == 1 {
			// One file with errors.
			message = diagnostics.Found_0_errors_in_the_same_file_starting_at_Colon_1.Format(totalErrorCount, firstFileName)
		} else {
			// Multiple files with errors.
			message = diagnostics.Found_0_errors_in_1_files.Format(totalErrorCount, numErroringFiles)
		}
	}
	output.WriteString(formatOpts.NewLine)
	output.WriteString(message)
	output.WriteString(formatOpts.NewLine)
	output.WriteString(formatOpts.NewLine)
	if numErroringFiles > 1 {
		writeTabularErrorsDisplay(output, errorSummary, formatOpts)
		output.WriteString(formatOpts.NewLine)
	}
}

func getErrorSummary(diags []*ast.Diagnostic) *ErrorSummary {
	var totalErrorCount int
	var globalErrors []*ast.Diagnostic
	var errorsByFiles map[*ast.SourceFile][]*ast.Diagnostic

	for _, diagnostic := range diags {
		if diagnostic.Category() != diagnostics.CategoryError {
			continue
		}

		totalErrorCount++
		if diagnostic.File() == nil {
			globalErrors = append(globalErrors, diagnostic)
		} else {
			if errorsByFiles == nil {
				errorsByFiles = make(map[*ast.SourceFile][]*ast.Diagnostic)
			}
			errorsByFiles[diagnostic.File()] = append(errorsByFiles[diagnostic.File()], diagnostic)
		}
	}

	// !!!
	// Need an ordered map here, but sorting for consistency.
	sortedFileList := slices.SortedFunc(maps.Keys(errorsByFiles), func(a, b *ast.SourceFile) int {
		return strings.Compare(a.FileName(), b.FileName())
	})

	return &ErrorSummary{
		TotalErrorCount: totalErrorCount,
		GlobalErrors:    globalErrors,
		ErrorsByFiles:   errorsByFiles,
		SortedFileList:  sortedFileList,
	}
}

func writeTabularErrorsDisplay(output *strings.Builder, errorSummary *ErrorSummary, formatOpts *DiagnosticsFormattingOptions) {
	sortedFiles := errorSummary.SortedFileList

	maxErrors := 0
	for _, errorsForFile := range errorSummary.ErrorsByFiles {
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

	output.WriteString(strings.Repeat(" ", headerPadding))
	output.WriteString(headerRow)
	output.WriteString(formatOpts.NewLine)

	for _, file := range sortedFiles {
		fileErrors := errorSummary.ErrorsByFiles[file]
		errorCount := len(fileErrors)

		fmt.Fprintf(output, "%*d  ", leftPaddingGoal, errorCount)
		output.WriteString(prettyPathForFileError(file, fileErrors, formatOpts))
		output.WriteString(formatOpts.NewLine)
	}
}

func prettyPathForFileError(file *ast.SourceFile, fileErrors []*ast.Diagnostic, formatOpts *DiagnosticsFormattingOptions) string {
	line, _ := scanner.GetLineAndCharacterOfPosition(file, fileErrors[0].Loc().Pos())
	fileName := file.FileName()
	if tspath.PathIsAbsolute(fileName) && tspath.PathIsAbsolute(formatOpts.CurrentDirectory) {
		fileName = tspath.ConvertToRelativePath(file.Path(), formatOpts.ComparePathsOptions)
	}
	return fmt.Sprintf("%s%s:%d%s",
		fileName,
		foregroundColorEscapeGrey,
		line+1,
		resetEscapeSequence,
	)
}

func WriteFormatDiagnostics(output *strings.Builder, diagnostics []*ast.Diagnostic, formatOpts *DiagnosticsFormattingOptions) {
	for _, diagnostic := range diagnostics {
		WriteFormatDiagnostic(output, diagnostic, formatOpts)
	}
}

func WriteFormatDiagnostic(output *strings.Builder, diagnostic *ast.Diagnostic, formatOpts *DiagnosticsFormattingOptions) {
	if diagnostic.File() != nil {
		line, character := scanner.GetLineAndCharacterOfPosition(diagnostic.File(), diagnostic.Loc().Pos())
		fileName := diagnostic.File().FileName()
		relativeFileName := tspath.ConvertToRelativePath(fileName, formatOpts.ComparePathsOptions)
		fmt.Fprintf(output, "%s(%d,%d): ", relativeFileName, line+1, character+1)
	}

	fmt.Fprintf(output, "%s TS%d: ", diagnostic.Category().String(), diagnostic.Code())
	WriteFlattenedDiagnosticMessage(output, diagnostic, formatOpts.NewLine)
	output.WriteString(formatOpts.NewLine)
}
