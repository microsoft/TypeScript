package format_test

import (
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/format"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"gotest.tools/v3/assert"
)

func TestFormatNoTrailingSpace(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		name string
		text string
	}{
		{"simple statement without trailing newline", "1;"},
		{"function call without trailing newline", "console.log('hello');"},
		{"if block on single line", "if (true) { }"},
		{"class declaration", "class A {\n    // Class Contents Go Here\n}"},
		{"class declaration with trailing newline", "class A {\n    // Class Contents Go Here\n}\n"},
		{"empty block", "if (true) {}"},
		{"module declaration", "module M { }"},
		{"enum declaration", "enum E { A, B }"},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			ctx := format.WithFormatCodeSettings(t.Context(), lsutil.FormatCodeSettings{
				TabSize:                4,
				IndentSize:             4,
				NewLineCharacter:       "\n",
				ConvertTabsToSpaces:    core.TSTrue,
				IndentStyle:            lsutil.IndentStyleSmart,
				TrimTrailingWhitespace: core.TSTrue,
			}, "\n")
			sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
				FileName: "/test.ts",
				PathKey:  "/test.ts",
			}, tc.text, core.ScriptKindTS)
			edits := format.FormatDocument(ctx, sourceFile)
			newText := applyBulkEdits(tc.text, edits)
			// Formatting should not add trailing whitespace at end of file
			for i, line := range strings.Split(newText, "\n") {
				trimmed := strings.TrimRight(line, " \t")
				assert.Equal(t, line, trimmed, "Formatter should not add trailing whitespace on line %d", i+1)
			}
		})
	}
}

func TestFormatBulkTrivia(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name    string
		body    string
		newLine string
	}{
		{"long indentation", strings.Repeat(" ", 129) + "return 1;" + strings.Repeat(" ", 129), "\n"},
		{"mixed indentation", strings.Repeat(" \t", 33) + "return 1;", "\r\n"},
		{"Unicode indentation", strings.Repeat(" ", 32) + "\u00a0\u2003return 1;", "\n"},
		{"long comment", "/* " + strings.Repeat("comment ", 64) + "*/" + "\nreturn 1;", "\n"},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			options := lsutil.GetDefaultFormatCodeSettings()
			options.NewLineCharacter = test.newLine
			options.TrimTrailingWhitespace = core.TSTrue
			ctx := format.WithFormatCodeSettings(t.Context(), options, test.newLine)
			text := "function f(){" + test.newLine + test.body + test.newLine + "}" + test.newLine
			expectedBody := "    return 1;"
			if test.name == "long comment" {
				expectedBody = "    /* " + strings.Repeat("comment ", 64) + "*/\n    return 1;"
			}
			expected := "function f() {" + test.newLine + expectedBody + test.newLine + "}" + test.newLine
			parse := func(text string) *ast.SourceFile {
				return parser.ParseSourceFile(ast.SourceFileParseOptions{FileName: "/test.ts", PathKey: "/test.ts"}, text, core.ScriptKindTS)
			}
			formatted := applyBulkEdits(text, format.FormatDocument(ctx, parse(text)))
			assert.Equal(t, formatted, expected)
			assert.Equal(t, len(format.FormatDocument(ctx, parse(formatted))), 0)
		})
	}
}
