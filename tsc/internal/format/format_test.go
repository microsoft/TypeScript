package format_test

import (
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/format"
	"github.com/microsoft/typescript-go/internal/parser"
	"gotest.tools/v3/assert"
)

func TestFormatNoTrailingNewline(t *testing.T) {
	t.Parallel()
	// Issue: Formatter adds extra space at end of line
	// When formatting a file that has content "1;" with no trailing newline,
	// an extra space should NOT be added at the end of the line

	testCases := []struct {
		name string
		text string
	}{
		{"simple statement without trailing newline", "1;"},
		{"function call without trailing newline", "console.log('hello');"},
		{"variable declaration without trailing newline", "const x = 1;"},
		{"multiple statements without trailing newline", "const x = 1;\nconst y = 2;"},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			ctx := format.WithFormatCodeSettings(t.Context(), &format.FormatCodeSettings{
				EditorSettings: format.EditorSettings{
					TabSize:                4,
					IndentSize:             4,
					BaseIndentSize:         4,
					NewLineCharacter:       "\n",
					ConvertTabsToSpaces:    true,
					IndentStyle:            format.IndentStyleSmart,
					TrimTrailingWhitespace: true,
				},
			}, "\n")
			sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
				FileName: "/test.ts",
				Path:     "/test.ts",
			}, tc.text, core.ScriptKindTS)
			edits := format.FormatDocument(ctx, sourceFile)
			newText := applyBulkEdits(tc.text, edits)

			// The formatted text should not add extra space at the end
			// It may add proper spacing within the code, but not after the last character
			assert.Assert(t, !strings.HasSuffix(newText, " "), "Formatter should not add trailing space")
			// Also check that no space was added at EOF position if text didn't end with newline
			if !strings.HasSuffix(tc.text, "\n") {
				assert.Assert(t, !strings.HasSuffix(newText, " "), "Formatter should not add space before EOF")
			}
		})
	}
}
