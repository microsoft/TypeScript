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
	sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: "/test.ts",
		PathKey:  tspath.PathKey("/test.ts"),
	}, "type T = { a: string; b: number };", core.ScriptKindTS)
	data, _, err := encoder.EncodeNode(sourceFile.Statements.Nodes[0], sourceFile)
	assert.NilError(t, err)
	return base64.StdEncoding.EncodeToString(data)
}

func TestDecodePrintNodeAppliesEmitNodes(t *testing.T) {
	t.Parallel()

	// The encoded root node is at index 1.
	node, emitContext, err := decodePrintNode(encodePrintNodeForTest(t), map[int]*PrintEmitNode{
		1: {EmitFlags: uint32(printer.EFSingleLine)},
	})
	assert.NilError(t, err)
	assert.Equal(t, node.Kind, ast.KindTypeAliasDeclaration)
	assert.Equal(t, emitContext.EmitFlags(node), printer.EFSingleLine)
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
