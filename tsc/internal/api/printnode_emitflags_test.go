package api

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/api/encoder"
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/printer"
	"gotest.tools/v3/assert"
)

// Nodes built by the node builder carry EFSingleLine in an emit context. That must survive an encode/decode round
// trip so that printNode matches in-process printing.
func TestPrintNodeRestoresEmitFlags(t *testing.T) {
	t.Parallel()

	build := func(ec *printer.EmitContext, singleLine bool) *ast.Node {
		f := ec.Factory.AsNodeFactory()
		str := func() *ast.Node { return f.NewKeywordTypeNode(ast.KindStringKeyword) }
		member := f.NewPropertySignatureDeclaration(nil, f.NewIdentifier("a"), nil, str(), nil)
		lit := f.NewTypeLiteralNode(f.NewNodeList([]*ast.Node{member}))
		tuple := f.NewTupleTypeNode(f.NewNodeList([]*ast.Node{f.NewTypeReferenceNode(f.NewIdentifier("Date"), nil), str(), lit}))
		if singleLine {
			ec.SetEmitFlags(lit, printer.EFSingleLine)
			ec.SetEmitFlags(tuple, printer.EFSingleLine)
		}
		return tuple
	}

	roundTrip := func(singleLine bool) string {
		ec := printer.NewEmitContext()
		node := build(ec, singleLine)
		data, _, err := encoder.EncodeNodeWithEmitContext(node, nil, ec)
		assert.NilError(t, err)
		decoded, err := encoder.DecodeNodes(data)
		assert.NilError(t, err)
		return newPrinter(&PrintNodeParams{}, decoded).Emit(decoded, nil)
	}

	assert.Equal(t, roundTrip(true), "[Date, string, { a: string; }]")
	assert.Assert(t, roundTrip(false) != "[Date, string, { a: string; }]") // no hint, default multi-line layout
}
