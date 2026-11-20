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

func TestFormatBlankLines(t *testing.T) {
	zero, one, two, largest := 0, 1, 2, int(^uint(0)>>1)
	tests := []struct {
		name   string
		text   string
		want   string
		limit  *int
		remove bool
	}{
		{"defaults preserve", "interface Foo {\n    bar: boolean;\n\n}\n\n\nconst bar = 1;", "interface Foo {\n    bar: boolean;\n\n}\n\n\nconst bar = 1;", nil, false},
		{"issue closing brace", "interface Foo {\n    bar: boolean;\n\n}", "interface Foo {\n    bar: boolean;\n}", nil, true},
		{"issue upper bound", "const foo = \"foo\";\n\n\nconst bar = \"bar\";", "const foo = \"foo\";\n\nconst bar = \"bar\";", &one, false},
		{"zero", "const a = 1;\n\n\nconst b = 2;", "const a = 1;\nconst b = 2;", &zero, false},
		{"two", "const a = 1;\n\n\n\nconst b = 2;", "const a = 1;\n\n\nconst b = 2;", &two, false},
		{"largest limit", "const a = 1;\n\n\nconst b = 2;", "const a = 1;\n\n\nconst b = 2;", &largest, false},
		{"brace takes precedence", "interface Foo {\n    bar: boolean;\n\n\n}", "interface Foo {\n    bar: boolean;\n}", &two, true},
		{"independent brace option", "const a = 1;\n\n\nconst b = 2;", "const a = 1;\n\n\nconst b = 2;", nil, true},
		{"empty block", "function f() {\n\n\n}", "function f() {\n}", nil, true},
		{"nested blocks", "function f() {\n    if (true) {\n        f();\n\n    }\n\n}", "function f() {\n    if (true) {\n        f();\n    }\n}", &one, true},
		{"class and object", "class C {\n    x = {\n        a: 1\n\n    };\n\n}", "class C {\n    x = {\n        a: 1\n    };\n}", nil, true},
		{"type literal", "type T = {\n    x: number;\n\n};", "type T = {\n    x: number;\n};", nil, true},
		{"line comment", "function f() {\n    // comment\n\n\n}", "function f() {\n    // comment\n}", nil, true},
		{"before comment", "const a = 1;\n\n\n// comment\nconst b = 2;", "const a = 1;\n\n// comment\nconst b = 2;", &one, false},
		{"multiline comment end", "/* first\n\n\nlast */\n\n\nconst a = 1;", "/* first\n\n\nlast */\n\nconst a = 1;", &one, false},
		{"template contents", "const a = `first\n\n\nlast`;\n\n\nconst b = 2;", "const a = `first\n\n\nlast`;\nconst b = 2;", &zero, true},
		{"template interpolation", "const a = `${1\n\n}`;", "const a = `${1\n\n    }`;", nil, true},
		{"jsx contents", "const a = <div>first\n\n\nlast</div>;", "const a = <div>first\n\n\n    last</div>;", &zero, true},
		{"jsx expression", "const a = <div>{1\n\n}</div>;", "const a = <div>{1\n\n}</div>;", nil, true},
		{"automatic semicolon insertion", "function f() {\n    return\n\n\n    1;\n}", "function f() {\n    return\n    1;\n}", &zero, false},
		{"whitespace and indentation", "function f() {  \n \t\n\t\n    f();  \n \t\n \n}", "function f() {\n\n    f();\n}", &one, true},
		{"file boundaries", "\n\nconst a = 1;\n\n\n", "\n\nconst a = 1;\n\n\n", &zero, true},
	}
	for _, test := range tests {
		for _, newline := range []string{"\n", "\r\n"} {
			t.Run(test.name+"/"+strings.NewReplacer("\r", "CR", "\n", "LF").Replace(newline), func(t *testing.T) {
				options := lsutil.GetDefaultFormatCodeSettings()
				options.NewLineCharacter = newline
				options.MaxConsecutiveBlankLines = test.limit
				options.RemoveBlankLinesBeforeClosingBrace = core.BoolToTristate(test.remove)
				ctx := format.WithFormatCodeSettings(t.Context(), options, newline)
				text := strings.ReplaceAll(test.text, "\n", newline)
				want := strings.ReplaceAll(test.want, "\n", newline)
				for pass := range 2 {
					file := parser.ParseSourceFile(ast.SourceFileParseOptions{FileName: "/test.tsx", PathKey: "/test.tsx"}, text, core.ScriptKindTSX)
					edits := format.FormatDocument(ctx, file)
					end := 0
					for _, edit := range edits {
						assert.Assert(t, edit.Pos() >= end, "edits must be ordered and disjoint: %+v", edits)
						end = edit.End()
					}
					text = applyBulkEdits(text, edits)
					assert.Equal(t, text, want)
					if pass == 1 {
						assert.Equal(t, len(edits), 0, "formatting must be idempotent")
					}
				}
			})
		}
	}
}

func TestFormatBlankLinesSelectionAndOnType(t *testing.T) {
	text := "const a = 1;\n\n\nconst b = 2;\n\n\nconst c = 3;"
	file := parser.ParseSourceFile(ast.SourceFileParseOptions{FileName: "/test.js", PathKey: "/test.js"}, text, core.ScriptKindJS)
	zero := 0
	options := lsutil.GetDefaultFormatCodeSettings()
	options.MaxConsecutiveBlankLines = &zero
	ctx := format.WithFormatCodeSettings(t.Context(), options, "\n")
	end := strings.Index(text, "\n\n\nconst c")
	edits := format.FormatSelection(ctx, file, 0, end)
	for _, edit := range edits {
		assert.Assert(t, edit.Pos() >= 0 && edit.End() <= end)
	}
	assert.Equal(t, applyBulkEdits(text, edits), "const a = 1;\nconst b = 2;\n\n\nconst c = 3;")
	for _, kind := range []format.FormatRequestKind{
		format.FormatRequestKindFormatOnEnter,
		format.FormatRequestKindFormatOnSemicolon,
		format.FormatRequestKindFormatOnOpeningCurlyBrace,
		format.FormatRequestKindFormatOnClosingCurlyBrace,
	} {
		edits := format.FormatSpan(ctx, core.NewTextRange(0, len(text)), file, kind)
		assert.Equal(t, applyBulkEdits(text, edits), text)
	}
}

func TestFormatBlankLinesWithoutTrimmingSpaces(t *testing.T) {
	text := "const a = 1;  \n \t\n\t\nconst b = 2;"
	file := parser.ParseSourceFile(ast.SourceFileParseOptions{FileName: "/test.ts", PathKey: "/test.ts"}, text, core.ScriptKindTS)
	zero := 0
	options := lsutil.GetDefaultFormatCodeSettings()
	options.MaxConsecutiveBlankLines = &zero
	options.TrimTrailingWhitespace = core.TSFalse
	ctx := format.WithFormatCodeSettings(t.Context(), options, "\n")
	assert.Equal(t, applyBulkEdits(text, format.FormatDocument(ctx, file)), "const a = 1;  \nconst b = 2;")
}

func TestFormatBlankLinesNearSyntaxError(t *testing.T) {
	text := "function f() {\n    const a =\n\n\n}"
	file := parser.ParseSourceFile(ast.SourceFileParseOptions{FileName: "/test.ts", PathKey: "/test.ts"}, text, core.ScriptKindTS)
	assert.Assert(t, len(file.Diagnostics()) > 0)
	options := lsutil.GetDefaultFormatCodeSettings()
	ctx := format.WithFormatCodeSettings(t.Context(), options, "\n")
	want := applyBulkEdits(text, format.FormatDocument(ctx, file))
	zero := 0
	options.MaxConsecutiveBlankLines = &zero
	options.RemoveBlankLinesBeforeClosingBrace = core.TSTrue
	ctx = format.WithFormatCodeSettings(t.Context(), options, "\n")
	assert.Equal(t, applyBulkEdits(text, format.FormatDocument(ctx, file)), want)
}
