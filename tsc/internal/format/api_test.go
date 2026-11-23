package format_test

import (
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/format"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"github.com/microsoft/TypeScript/tsc/internal/printer"
	"github.com/microsoft/TypeScript/tsc/internal/repo"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/parsetestutil"
	"gotest.tools/v3/assert"
)

func applyBulkEdits(text string, edits []core.TextChange) string {
	b := strings.Builder{}
	b.Grow(len(text))
	lastEnd := 0
	for _, e := range edits {
		start := e.TextRange.Pos()
		if start != lastEnd {
			b.WriteString(text[lastEnd:e.TextRange.Pos()])
		}
		b.WriteString(e.NewText)

		lastEnd = e.TextRange.End()
	}
	b.WriteString(text[lastEnd:])

	return b.String()
}

func TestFormat(t *testing.T) {
	t.Parallel()

	t.Run("format checker.ts", func(t *testing.T) {
		t.Parallel()
		ctx := format.WithFormatCodeSettings(t.Context(), lsutil.FormatCodeSettings{
			TabSize:                         4,
			IndentSize:                      4,
			BaseIndentSize:                  4,
			NewLineCharacter:                "\n",
			ConvertTabsToSpaces:             core.TSTrue,
			IndentStyle:                     lsutil.IndentStyleSmart,
			TrimTrailingWhitespace:          core.TSTrue,
			InsertSpaceBeforeTypeAnnotation: core.TSTrue,
		}, "\n")
		filePath := filepath.Join(repo.TestDataPath(), "fixtures/compiler/checker.ts")
		fileContent, err := os.ReadFile(filePath)
		assert.NilError(t, err)
		text := string(fileContent)
		sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
			FileName: "/checker.ts",
			PathKey:  "/checker.ts",
		}, text, core.ScriptKindTS)
		edits := format.FormatDocument(ctx, sourceFile)
		newText := applyBulkEdits(text, edits)
		assert.Assert(t, len(newText) > 0)
		assert.Assert(t, text != newText)
	})
}

func TestFormatPrintedFragment(t *testing.T) {
	t.Parallel()
	for _, tt := range []struct {
		name       string
		text       string
		kind       ast.Kind
		want       string
		semicolons lsutil.SemicolonPreference
	}{
		{"class member", "class C { method(x:number){return x;} }", ast.KindMethodDeclaration, "method(x: number) { return x; }", lsutil.SemicolonPreferenceIgnore},
		{"case clause", "switch (x) { case 1: break; }", ast.KindCaseClause, "case 1: break;", lsutil.SemicolonPreferenceIgnore},
		{"type", "type T = {x:number};", ast.KindTypeLiteral, "{\n    x: number;\n}", lsutil.SemicolonPreferenceIgnore},
		{"import specifier", `import {x as y} from "m";`, ast.KindImportSpecifier, "x as y", lsutil.SemicolonPreferenceIgnore},
		{"trailing line comment", `import { x } from "m"; // comment`, ast.KindImportDeclaration, `import { x } from "m" // comment`, lsutil.SemicolonPreferenceRemove},
		{"trailing block comment", `import { x } from "m"; /* comment */`, ast.KindImportDeclaration, `import { x } from "m" /* comment */`, lsutil.SemicolonPreferenceRemove},
		{
			"multiline else branches",
			"function f() {\nif (a)\none();\nelse if (b)\ntwo();\nelse // comment\nthree();\n}",
			ast.KindFunctionDeclaration,
			"function f() {\n    if (a) one();\n    else if (b) two();\n    else // comment\n        three();\n}",
			lsutil.SemicolonPreferenceIgnore,
		},
		{
			"else block trivia",
			"class C { method() {\nif (a) {\none();\n} else /* comment */ {\ntwo();\n}\n} }",
			ast.KindMethodDeclaration,
			"method() {\n    if (a) {\n        one();\n    } else /* comment */ {\n        two();\n    }\n}",
			lsutil.SemicolonPreferenceIgnore,
		},
	} {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			source := parsetestutil.ParseTypeScript(tt.text, false)
			parsetestutil.CheckDiagnostics(t, source)
			var fragment *ast.Node
			var visit ast.Visitor
			visit = func(node *ast.Node) bool {
				if node.Kind == tt.kind {
					fragment = node
					return true
				}
				return node.ForEachChild(visit)
			}
			source.AsNode().ForEachChild(visit)
			assert.Assert(t, fragment != nil)
			factory := ast.NewNodeFactory(ast.NodeFactoryHooks{})
			text, positioned := printer.PrintAndPositionNode(factory, fragment, source, "\n", 4, nil)
			file := printer.CreateSyntheticSourceFile(factory, text, source.ParseOptions())
			// A source-file context must remain a valid AST for ordinary consumers.
			file.AsNode().ForEachChild(func(child *ast.Node) bool {
				assert.Assert(t, ast.IsStatement(child) || child.Kind == ast.KindEndOfFile, "invalid source-file child: %v", child.Kind)
				return false
			})
			options := lsutil.GetDefaultFormatCodeSettings()
			options.Semicolons = tt.semicolons
			ctx := format.WithFormatCodeSettings(t.Context(), options, "\n")
			edits := format.FormatNodeGivenIndentation(ctx, positioned, file, core.LanguageVariantStandard, 0, 0)
			assert.Equal(t, applyBulkEdits(text, edits), tt.want)
		})
	}
}

func BenchmarkFormatPrintedFragmentBranches(b *testing.B) {
	for _, branches := range []int{16, 64, 256, 1024} {
		b.Run(strconv.Itoa(branches), func(b *testing.B) {
			source := parsetestutil.ParseTypeScript("function f() {\n"+strings.Repeat("if (x)\na();\nelse\nb();\n", branches)+"}", false)
			assert.Equal(b, len(source.Diagnostics()), 0)
			factory := ast.NewNodeFactory(ast.NodeFactoryHooks{})
			text, positioned := printer.PrintAndPositionNode(factory, source.Statements.Nodes[0], source, "\n", 4, nil)
			ctx := format.WithFormatCodeSettings(b.Context(), lsutil.GetDefaultFormatCodeSettings(), "\n")
			b.ReportAllocs()
			for b.Loop() {
				file := printer.CreateSyntheticSourceFile(factory, text, source.ParseOptions())
				format.FormatNodeGivenIndentation(ctx, positioned, file, core.LanguageVariantStandard, 0, 0)
			}
		})
	}
}

func BenchmarkFormat(b *testing.B) {
	ctx := format.WithFormatCodeSettings(b.Context(), lsutil.FormatCodeSettings{
		TabSize:                         4,
		IndentSize:                      4,
		BaseIndentSize:                  4,
		NewLineCharacter:                "\n",
		ConvertTabsToSpaces:             core.TSTrue,
		IndentStyle:                     lsutil.IndentStyleSmart,
		TrimTrailingWhitespace:          core.TSTrue,
		InsertSpaceBeforeTypeAnnotation: core.TSTrue,
	}, "\n")
	filePath := filepath.Join(repo.TestDataPath(), "fixtures/compiler/checker.ts")
	fileContent, err := os.ReadFile(filePath)
	assert.NilError(b, err)
	text := string(fileContent)
	sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: "/checker.ts",
		PathKey:  "/checker.ts",
	}, text, core.ScriptKindTS)

	b.Run("format checker.ts", func(b *testing.B) {
		for b.Loop() {
			edits := format.FormatDocument(ctx, sourceFile)
			newText := applyBulkEdits(text, edits)
			assert.Assert(b, len(newText) > 0)
		}
	})

	b.Run("format checker.ts (no edit application)", func(b *testing.B) { // for comparison (how long does applying many edits take?)
		for b.Loop() {
			edits := format.FormatDocument(ctx, sourceFile)
			assert.Assert(b, len(edits) > 0)
		}
	})

	p := printer.NewPrinter(printer.PrinterOptions{}, printer.PrintHandlers{}, printer.NewEmitContext())
	b.Run("pretty print checker.ts", func(b *testing.B) { // for comparison
		for b.Loop() {
			newText := p.EmitSourceFile(sourceFile)
			assert.Assert(b, len(newText) > 0)
		}
	})
}
