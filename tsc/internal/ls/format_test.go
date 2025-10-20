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
