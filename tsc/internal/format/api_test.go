package format_test

import (
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/format"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"github.com/microsoft/TypeScript/tsc/internal/printer"
	"github.com/microsoft/TypeScript/tsc/internal/repo"
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
			EditorSettings: lsutil.EditorSettings{
				TabSize:                4,
				IndentSize:             4,
				BaseIndentSize:         4,
				NewLineCharacter:       "\n",
				ConvertTabsToSpaces:    core.TSTrue,
				IndentStyle:            lsutil.IndentStyleSmart,
				TrimTrailingWhitespace: core.TSTrue,
			},
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

func BenchmarkFormat(b *testing.B) {
	ctx := format.WithFormatCodeSettings(b.Context(), lsutil.FormatCodeSettings{
		EditorSettings: lsutil.EditorSettings{
			TabSize:                4,
			IndentSize:             4,
			BaseIndentSize:         4,
			NewLineCharacter:       "\n",
			ConvertTabsToSpaces:    core.TSTrue,
			IndentStyle:            lsutil.IndentStyleSmart,
			TrimTrailingWhitespace: core.TSTrue,
		},
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
