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

func TestCommentFormatting(t *testing.T) {
	t.Parallel()

	t.Run("format comment issue reproduction", func(t *testing.T) {
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
			InsertSpaceBeforeTypeAnnotation: core.TSTrue,
		}, "\n")

		// Original code that causes the bug
		originalText := `class C {
    /**
     *
    */
    async x() {}
}`

		sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
			FileName: "/test.ts",
			Path:     "/test.ts",
		}, originalText, core.ScriptKindTS)

		// Apply formatting once
		edits := format.FormatDocument(ctx, sourceFile)
		firstFormatted := applyBulkEdits(originalText, edits)

		// Check that the asterisk is not corrupted
		assert.Check(t, !contains(firstFormatted, "*/\n   /"), "should not corrupt */ to /")
		assert.Check(t, contains(firstFormatted, "*/"), "should preserve */ token")
		assert.Check(t, contains(firstFormatted, "async"), "should preserve async keyword")

		// Apply formatting a second time to test stability
		sourceFile2 := parser.ParseSourceFile(ast.SourceFileParseOptions{
			FileName: "/test.ts",
			Path:     "/test.ts",
		}, firstFormatted, core.ScriptKindTS)

		edits2 := format.FormatDocument(ctx, sourceFile2)
		secondFormatted := applyBulkEdits(firstFormatted, edits2)

		// Check that second formatting doesn't introduce corruption
		assert.Check(t, !contains(secondFormatted, " sync x()"), "should not corrupt async to sync")
		assert.Check(t, contains(secondFormatted, "async"), "should preserve async keyword on second pass")
	})

	t.Run("format JSDoc with tab indentation", func(t *testing.T) {
		t.Parallel()
		ctx := format.WithFormatCodeSettings(t.Context(), &format.FormatCodeSettings{
			EditorSettings: format.EditorSettings{
				TabSize:                4,
				IndentSize:             4,
				BaseIndentSize:         0,
				NewLineCharacter:       "\n",
				ConvertTabsToSpaces:    false, // Use tabs
				IndentStyle:            format.IndentStyleSmart,
				TrimTrailingWhitespace: true,
			},
			InsertSpaceBeforeTypeAnnotation: core.TSTrue,
		}, "\n")

		// Original code with tab indentation (tabs represented as \t)
		originalText := "class Foo {\n\t/**\n\t * @param {string} argument - This is a param description.\n\t */\n\texample(argument) {\nconsole.log(argument);\n\t}\n}"

		sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
			FileName: "/test.ts",
			Path:     "/test.ts",
		}, originalText, core.ScriptKindTS)

		// Apply formatting
		edits := format.FormatDocument(ctx, sourceFile)
		formatted := applyBulkEdits(originalText, edits)

		// Check that tabs come before spaces (not spaces before tabs)
		// The comment lines should have format: tab followed by space and asterisk
		// NOT: space followed by tab and asterisk
		assert.Check(t, !contains(formatted, " \t*"), "should not have space before tab before asterisk")
		assert.Check(t, contains(formatted, "\t *"), "should have tab before space before asterisk")

		// Verify console.log is properly indented with tabs
		assert.Check(t, contains(formatted, "\t\tconsole.log"), "console.log should be indented with two tabs")
	})
}

func contains(s, substr string) bool {
	return len(substr) > 0 && strings.Contains(s, substr)
}
