package compiler

import (
	"fmt"
	"maps"
	"slices"
	"strconv"
	"strings"
	"unicode"

	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
)

type DiagnosticsFormattingOptions struct {
	CurrentDirectory     string
	NewLine              string
	GetCanonicalFileName func(fileName string) string
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

func FormatDiagnosticsWithColorAndContext(output *strings.Builder, diags []*Diagnostic, formatOpts *DiagnosticsFormattingOptions) {
	if len(diags) == 0 {
		return
	}

	for i, diagnostic := range diags {
		if i > 0 {
			output.WriteString(formatOpts.NewLine)
		}

		if diagnostic.file != nil {
			file := diagnostic.file
			pos := diagnostic.loc.Pos()
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

func writeCodeSnippet(writer *strings.Builder, sourceFile *SourceFile, start int, length int, squiggleColor string, formatOpts *DiagnosticsFormattingOptions) {
	firstLine, firstLineChar := GetLineAndCharacterOfPosition(sourceFile, start)
	lastLine, lastLineChar := GetLineAndCharacterOfPosition(sourceFile, start+length)

	lastLineOfFile, _ := GetLineAndCharacterOfPosition(sourceFile, len(sourceFile.text))

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

		lineStart := GetPositionOfLineAndCharacter(sourceFile, i, 0)
		var lineEnd TextPos
		if i < lastLineOfFile {
			lineEnd = GetPositionOfLineAndCharacter(sourceFile, i+1, 0)
		} else {
			lineEnd = sourceFile.loc.end
		}

		lineContent := strings.TrimRightFunc(sourceFile.text[lineStart:lineEnd], unicode.IsSpace) // trim from end
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

func WriteFlattenedDiagnosticMessage(writer *strings.Builder, diagnostic *Diagnostic, newline string) {
	writer.WriteString(diagnostic.Message())

	for _, chain := range diagnostic.messageChain {
		flattenDiagnosticMessageChain(writer, chain, newline, 1 /*level*/)
	}
}

func flattenDiagnosticMessageChain(writer *strings.Builder, chain *MessageChain, newLine string, level int) {
	writer.WriteString(newLine)
	for range level {
		writer.WriteString("  ")
	}

	writer.WriteString(chain.message)
	for _, child := range chain.messageChain {
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

func WriteLocation(output *strings.Builder, file *SourceFile, pos int, formatOpts *DiagnosticsFormattingOptions, writeWithStyleAndReset FormattedWriter) {
	firstLine, firstChar := GetLineAndCharacterOfPosition(file, pos)
	var relativeFileName string
	if formatOpts != nil {
		relativeFileName = ConvertToRelativePath(file.path, formatOpts.CurrentDirectory, formatOpts.GetCanonicalFileName)
	} else {
		relativeFileName = file.path
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
	GlobalErrors    []*Diagnostic
	ErrorsByFiles   map[*SourceFile][]*Diagnostic
	SortedFileList  []*SourceFile
}

func WriteErrorSummaryText(output *strings.Builder, allDiagnostics []*Diagnostic, formatOpts *DiagnosticsFormattingOptions) {
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
			message = formatMessage(diagnostics.Found_1_error)
		} else {
			message = formatMessage(diagnostics.Found_1_error_in_0, firstFileName)
		}
	} else {
		if numErroringFiles == 0 {
			// No file-specific errors.
			message = formatMessage(diagnostics.Found_0_errors, totalErrorCount)
		} else if numErroringFiles == 1 {
			// One file with errors.
			message = formatMessage(diagnostics.Found_0_errors_in_the_same_file_starting_at_Colon_1, totalErrorCount, firstFileName)
		} else {
			// Multiple files with errors.
			message = formatMessage(diagnostics.Found_0_errors_in_1_files, totalErrorCount, numErroringFiles)
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

func getErrorSummary(diags []*Diagnostic) *ErrorSummary {
	var totalErrorCount int
	var globalErrors []*Diagnostic
	var errorsByFiles map[*SourceFile][]*Diagnostic

	for _, diagnostic := range diags {
		if diagnostic.Category() != diagnostics.CategoryError {
			continue
		}

		totalErrorCount++
		if diagnostic.file == nil {
			globalErrors = append(globalErrors, diagnostic)
		} else {
			if errorsByFiles == nil {
				errorsByFiles = make(map[*SourceFile][]*Diagnostic)
			}
			errorsByFiles[diagnostic.file] = append(errorsByFiles[diagnostic.file], diagnostic)
		}
	}

	// !!!
	// Need an ordered map here, but sorting for consistency.
	sortedFileList := slices.SortedFunc(maps.Keys(errorsByFiles), func(a, b *SourceFile) int {
		return strings.Compare(a.fileName, b.fileName)
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

func prettyPathForFileError(file *SourceFile, fileErrors []*Diagnostic, formatOpts *DiagnosticsFormattingOptions) string {
	line, _ := GetLineAndCharacterOfPosition(file, fileErrors[0].loc.Pos())
	fileName := file.fileName
	if pathIsAbsolute(fileName) && pathIsAbsolute(formatOpts.CurrentDirectory) {
		fileName = ConvertToRelativePath(file.path, formatOpts.CurrentDirectory, formatOpts.GetCanonicalFileName)
	}
	return fmt.Sprintf("%s%s:%d%s",
		fileName,
		foregroundColorEscapeGrey,
		line+1,
		resetEscapeSequence,
	)
}
