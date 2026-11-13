package api

import (
	"encoding/base64"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/api/encoder"
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"github.com/microsoft/TypeScript/tsc/internal/printer"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func encodePrintNodeForTest(t *testing.T) string {
	t.Helper()
	return encodeStatementForTest(t, "type T = { a: string; b: number };")
}

func encodeStatementForTest(t *testing.T, text string) string {
	t.Helper()
	sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: "/test.ts",
		PathKey:  tspath.PathKey("/test.ts"),
	}, text, core.ScriptKindTS)
	data, _, err := encoder.EncodeNode(sourceFile.Statements.Nodes[0], sourceFile)
	assert.NilError(t, err)
	return base64.StdEncoding.EncodeToString(data)
}

func TestDecodePrintNodeAppliesEmitNodes(t *testing.T) {
	t.Parallel()

	// The encoded root node is at index 1.
	comments := []PrintSynthesizedComment{
		{Kind: int32(ast.KindSingleLineCommentTrivia), Text: " single line"},
		{Kind: int32(ast.KindMultiLineCommentTrivia), Text: " block "},
	}
	node, emitContext, err := decodePrintNode(encodePrintNodeForTest(t), map[int]*PrintEmitNode{
		1: {EmitFlags: uint32(printer.EFSingleLine), LeadingComments: comments, TrailingComments: comments},
	})
	assert.NilError(t, err)
	assert.Equal(t, node.Kind, ast.KindTypeAliasDeclaration)
	assert.Equal(t, emitContext.EmitFlags(node), printer.EFSingleLine)
	assert.Equal(t, len(emitContext.GetSyntheticLeadingComments(node)), len(comments))
	assert.Equal(t, len(emitContext.GetSyntheticTrailingComments(node)), len(comments))
}

func TestDecodePrintNodeRejectsNullEmitNode(t *testing.T) {
	t.Parallel()

	_, _, err := decodePrintNode(encodePrintNodeForTest(t), map[int]*PrintEmitNode{1: nil})
	assert.ErrorIs(t, err, ErrClientError)
}

func TestDecodePrintNodeRejectsUnknownEmitNodeIndex(t *testing.T) {
	t.Parallel()

	_, _, err := decodePrintNode(encodePrintNodeForTest(t), map[int]*PrintEmitNode{1 << 20: {}})
	assert.ErrorIs(t, err, ErrClientError)
}

func TestDecodePrintNodeRejectsInvalidCommentKind(t *testing.T) {
	t.Parallel()

	for _, test := range []struct {
		name string
		kind int32
	}{
		{name: "unknown", kind: 0},
		{name: "identifier", kind: int32(ast.KindIdentifier)},
		{name: "negative", kind: -1},
		{name: "out of range", kind: 1<<16 | int32(ast.KindSingleLineCommentTrivia)},
	} {
		for _, position := range []string{"leading", "trailing"} {
			t.Run(test.name+"/"+position, func(t *testing.T) {
				t.Parallel()
				emitNode := &PrintEmitNode{}
				comments := []PrintSynthesizedComment{{Kind: test.kind, Text: " comment"}}
				if position == "leading" {
					emitNode.LeadingComments = comments
				} else {
					emitNode.TrailingComments = comments
				}
				_, _, err := decodePrintNode(encodePrintNodeForTest(t), map[int]*PrintEmitNode{1: emitNode})
				assert.ErrorIs(t, err, ErrClientError)
			})
		}
	}
}

// printStatementWithComments decodes a statement the way handlePrintNode does, lets the caller
// attach synthetic comments to one of its nodes, and prints it without a source file.
func printStatementWithComments(t *testing.T, text string, attach func(statement *ast.Node, emitContext *printer.EmitContext)) string {
	t.Helper()
	node, emitContext, err := decodePrintNode(encodeStatementForTest(t, text), nil)
	assert.NilError(t, err)
	attach(node, emitContext)
	return newPrinter(&PrintNodeParams{}, emitContext).Emit(node, nil)
}

func singleLineComment(text string) []printer.SynthesizedComment {
	return []printer.SynthesizedComment{{Kind: ast.KindSingleLineCommentTrivia, Loc: core.NewTextRange(-1, -1), Text: text}}
}

func TestPrintNodeTrailingSingleLineCommentInSingleLineObject(t *testing.T) {
	t.Parallel()

	output := printStatementWithComments(t, "const o = { a: 1, b: 2 };", func(statement *ast.Node, emitContext *printer.EmitContext) {
		object := statement.AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes[0].Initializer()
		emitContext.SetSyntheticTrailingComments(object.AsObjectLiteralExpression().Properties.Nodes[0], singleLineComment(" note"))
	})
	assert.Equal(t, output, "const o = { a: 1 // note\n    , b: 2 };")
}

func TestPrintNodeLeadingSingleLineCommentOnReturnOperand(t *testing.T) {
	t.Parallel()

	output := printStatementWithComments(t, "function f() { return 1; }", func(statement *ast.Node, emitContext *printer.EmitContext) {
		returnStatement := statement.Body().AsBlock().Statements.Nodes[0]
		emitContext.SetSyntheticLeadingComments(returnStatement.Expression(), singleLineComment(" comment"))
	})
	assert.Equal(t, output, "function f() { return (\n// comment\n1); }")
}

func TestPrintNodeLeadingSingleLineCommentOnThrowOperand(t *testing.T) {
	t.Parallel()

	output := printStatementWithComments(t, "function f() { throw e; }", func(statement *ast.Node, emitContext *printer.EmitContext) {
		throwStatement := statement.Body().AsBlock().Statements.Nodes[0]
		emitContext.SetSyntheticLeadingComments(throwStatement.Expression(), singleLineComment(" comment"))
	})
	assert.Equal(t, output, "function f() { throw (\n// comment\ne); }")
}

func TestPrintNodeLeadingSingleLineCommentOnReturnLeftmostOperand(t *testing.T) {
	t.Parallel()

	output := printStatementWithComments(t, "function f() { return a.b; }", func(statement *ast.Node, emitContext *printer.EmitContext) {
		returnStatement := statement.Body().AsBlock().Statements.Nodes[0]
		emitContext.SetSyntheticLeadingComments(returnStatement.Expression().Expression(), singleLineComment(" comment"))
	})
	assert.Equal(t, output, "function f() { return (\n// comment\na).b; }")
}
