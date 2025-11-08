package ls

import (
	"context"
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/format"
	"github.com/microsoft/typescript-go/internal/parser"
)

// Test for issue: Panic Handling textDocument/onTypeFormatting
// This reproduces the panic when pressing enter in an empty file
func TestGetFormattingEditsAfterKeystroke_EmptyFile(t *testing.T) {
	t.Parallel()
	// Create an empty file
	text := ""
	sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: "/index.ts",
		Path:     "/index.ts",
	}, text, core.ScriptKindTS)

	// Create language service with nil program (we're only testing the formatting function)
	langService := &LanguageService{}

	// Test formatting after keystroke with newline character at position 0
	ctx := context.Background()
	options := format.GetDefaultFormatCodeSettings("\n")

	// This should not panic
	edits := langService.getFormattingEditsAfterKeystroke(
		ctx,
		sourceFile,
		options,
		0, // position
		"\n",
	)

	// Should return nil or empty edits, not panic
	_ = edits
}

// Test with a simple statement
func TestGetFormattingEditsAfterKeystroke_SimpleStatement(t *testing.T) {
	t.Parallel()
	// Create a file with a simple statement
	text := "const x = 1"
	sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: "/index.ts",
		Path:     "/index.ts",
	}, text, core.ScriptKindTS)

	// Create language service with nil program
	langService := &LanguageService{}

	// Test formatting after keystroke with newline character at end of statement
	ctx := context.Background()
	options := format.GetDefaultFormatCodeSettings("\n")

	// This should not panic
	edits := langService.getFormattingEditsAfterKeystroke(
		ctx,
		sourceFile,
		options,
		len(text), // position at end of file
		"\n",
	)

	// Should return nil or empty edits, not panic
	_ = edits
}

// Test for issue: Crash in range formatting when requested on a line that is different from the containing function
// This reproduces the panic when formatting a range inside a function body
func TestGetFormattingEditsForRange_FunctionBody(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		name     string
		text     string
		startPos int
		endPos   int
	}{
		{
			name:     "return statement in function",
			text:     "function foo() {\n    return (1  + 2);\n}",
			startPos: 21, // Start of "return"
			endPos:   38, // End of ");"
		},
		{
			name:     "function with newline after keyword",
			text:     "function\nf() {\n}",
			startPos: 9,  // After "function\n"
			endPos:   13, // Inside or after function
		},
		{
			name:     "empty function body",
			text:     "function f() {\n  \n}",
			startPos: 15, // Inside body
			endPos:   17, // Inside body
		},
		{
			name:     "after function closing brace",
			text:     "function f() {\n}",
			startPos: 15, // After closing brace
			endPos:   15,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
				FileName: "/test.ts",
				Path:     "/test.ts",
			}, tc.text, core.ScriptKindTS)

			langService := &LanguageService{}
			ctx := context.Background()
			options := format.GetDefaultFormatCodeSettings("\n")

			// This should not panic
			edits := langService.getFormattingEditsForRange(
				ctx,
				sourceFile,
				options,
				core.NewTextRange(tc.startPos, tc.endPos),
			)

			// Should not panic
			_ = edits // Just ensuring no panic
		})
	}
}
