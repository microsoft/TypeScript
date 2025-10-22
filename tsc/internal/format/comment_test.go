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
		assert.Check(t, !strings.Contains(firstFormatted, "*/\n   /"), "should not corrupt */ to /")
		assert.Check(t, strings.Contains(firstFormatted, "*/"), "should preserve */ token")
		assert.Check(t, strings.Contains(firstFormatted, "async"), "should preserve async keyword")

		// Apply formatting a second time to test stability
		sourceFile2 := parser.ParseSourceFile(ast.SourceFileParseOptions{
			FileName: "/test.ts",
			Path:     "/test.ts",
		}, firstFormatted, core.ScriptKindTS)

		edits2 := format.FormatDocument(ctx, sourceFile2)
		secondFormatted := applyBulkEdits(firstFormatted, edits2)

		// Check that second formatting doesn't introduce corruption
		assert.Check(t, !strings.Contains(secondFormatted, " sync x()"), "should not corrupt async to sync")
		assert.Check(t, strings.Contains(secondFormatted, "async"), "should preserve async keyword on second pass")
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
		assert.Check(t, !strings.Contains(formatted, " \t*"), "should not have space before tab before asterisk")
		assert.Check(t, strings.Contains(formatted, "\t *"), "should have tab before space before asterisk")

		// Verify console.log is properly indented with tabs
		assert.Check(t, strings.Contains(formatted, "\t\tconsole.log"), "console.log should be indented with two tabs")
	})

	t.Run("format comment inside multi-line argument list", func(t *testing.T) {
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

		// Original code with proper indentation
		originalText := "console.log(\n\t\"a\",\n\t// the second arg\n\t\"b\"\n);"

		sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
			FileName: "/test.ts",
			Path:     "/test.ts",
		}, originalText, core.ScriptKindTS)

		// Apply formatting
		edits := format.FormatDocument(ctx, sourceFile)
		formatted := applyBulkEdits(originalText, edits)

		// The comment should remain indented with a tab
		assert.Check(t, strings.Contains(formatted, "\t// the second arg"), "comment should be indented with tab")
		// The comment should not lose its indentation
		assert.Check(t, !strings.Contains(formatted, "\n// the second arg"), "comment should not lose indentation")
	})

	t.Run("format comment in chained method calls", func(t *testing.T) {
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

		// Original code with proper indentation
		originalText := "foo\n\t.bar()\n\t// A second call\n\t.baz();"

		sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
			FileName: "/test.ts",
			Path:     "/test.ts",
		}, originalText, core.ScriptKindTS)

		// Apply formatting
		edits := format.FormatDocument(ctx, sourceFile)
		formatted := applyBulkEdits(originalText, edits)

		// The comment should remain indented
		assert.Check(t, strings.Contains(formatted, "\t// A second call") || strings.Contains(formatted, "   // A second call"), "comment should be indented")
		// The comment should not lose its indentation
		assert.Check(t, !strings.Contains(formatted, "\n// A second call"), "comment should not lose indentation")
	})

	// Regression test for issue #1928 - panic when formatting chained method call with comment
	t.Run("format chained method call with comment (issue #1928)", func(t *testing.T) {
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

		// This code previously caused a panic with "strings: negative Repeat count"
		// because tokenIndentation was -1 and was being used directly for indentation
		originalText := "foo\n\t.bar()\n\t// A second call\n\t.baz();"

		sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
			FileName: "/test.ts",
			Path:     "/test.ts",
		}, originalText, core.ScriptKindTS)

		// Apply formatting - should not panic
		edits := format.FormatDocument(ctx, sourceFile)
		formatted := applyBulkEdits(originalText, edits)

		// Verify the comment maintains proper indentation and doesn't lose it
		assert.Check(t, strings.Contains(formatted, "\t// A second call") || strings.Contains(formatted, "   // A second call"), "comment should be indented")
		assert.Check(t, !strings.Contains(formatted, "\n// A second call"), "comment should not be at column 0")
	})
}

func TestSliceBoundsPanic(t *testing.T) {
	t.Parallel()

	t.Run("format code with trailing semicolon should not panic", func(t *testing.T) {
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

		// Code from the issue that causes slice bounds panic
		originalText := `const _enableDisposeWithListenerWarning = false
	// || Boolean("TRUE") // causes a linter warning so that it cannot be pushed
	;
`

		sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
			FileName: "/test.ts",
			Path:     "/test.ts",
		}, originalText, core.ScriptKindTS)

		// This should not panic
		edits := format.FormatDocument(ctx, sourceFile)
		formatted := applyBulkEdits(originalText, edits)

		// Basic sanity checks
		assert.Check(t, len(formatted) > 0, "formatted text should not be empty")
		assert.Check(t, strings.Contains(formatted, "_enableDisposeWithListenerWarning"), "should preserve variable name")
	})
}
