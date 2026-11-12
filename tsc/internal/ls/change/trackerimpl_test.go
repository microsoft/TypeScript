package change

import (
	"context"
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"strings"
	"testing"
)

func TestTextEditsConflictAtSameInsertionPointAcrossProjections(t *testing.T) {
	t.Parallel()

	position := lsproto.Position{Line: 1, Character: 2}
	a := &lsproto.TextEdit{Range: lsproto.Range{Start: position, End: position}, NewText: "a"}
	b := &lsproto.TextEdit{Range: lsproto.Range{Start: position, End: position}, NewText: "b"}

	if !textEditsConflict(a, b, true) {
		t.Fatal("different insertions at the same position across projections should conflict")
	}
	if textEditsConflict(a, b, false) {
		t.Fatal("insertions at the same position within one projection should retain their existing ordering")
	}
}
func TestInsertNodeInListAfterUnicodeLineSeparators(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name      string
		separator string
	}{
		{name: "U+2028", separator: "\u2028"},
		{name: "U+2029", separator: "\u2029"},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()

			text := "const values = [\n    1,\n    2  " + test.separator + "];"

			sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
				FileName: "/index.ts",
				PathKey:  "/index.ts",
			}, text, core.ScriptKindTS)

			declaration := sourceFile.Statements.Nodes[0].
				AsVariableStatement().
				DeclarationList.
				AsVariableDeclarationList().
				Declarations.Nodes[0]

			array := declaration.AsVariableDeclaration().Initializer
			elements := array.AsArrayLiteralExpression().Elements.Nodes
			after := elements[1]

			tracker := NewTracker(
				context.Background(),
				core.EmptyCompilerOptions,
				lsutil.GetDefaultFormatCodeSettings(),
				nil,
			)

			newNode := tracker.NewNumericLiteral("3", ast.TokenFlagsNone)

			tracker.InsertNodeInListAfter(
				sourceFile,
				after,
				newNode,
				array.AsArrayLiteralExpression().Elements,
			)

			expectedPosition := strings.Index(text, test.separator)
			found := false

			for _, edit := range tracker.changes.Get(sourceFile) {
				if edit.Node == newNode {
					found = true
					actualPosition := edit.TextRange.Pos()

					if actualPosition != expectedPosition {
						t.Fatalf(
							"insertion position = %d, want %d",
							actualPosition,
							expectedPosition,
						)
					}
					break
				}
			}

			if !found {
				t.Fatal("could not find the edit inserting the new node")
			}
		})
	}
}
