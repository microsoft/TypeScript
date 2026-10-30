package api

import (
	"errors"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/printer"
	"gotest.tools/v3/assert"
)

func TestApplyPrintNodeComments(t *testing.T) {
	t.Parallel()

	f := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	nodes := []*ast.Node{nil, f.NewIdentifier("x")}

	t.Run("valid", func(t *testing.T) {
		t.Parallel()
		emitContext := printer.NewEmitContext()
		err := applyPrintNodeComments(emitContext, nodes, []PrintNodeComment{
			{Node: 1, Kind: int32(ast.KindMultiLineCommentTrivia), Text: " a "},
			{Node: 1, Trailing: true, Kind: int32(ast.KindSingleLineCommentTrivia), Text: " b"},
		})
		assert.NilError(t, err)
		assert.Equal(t, len(emitContext.GetSyntheticLeadingComments(nodes[1])), 1)
		assert.Equal(t, len(emitContext.GetSyntheticTrailingComments(nodes[1])), 1)
	})

	for name, comment := range map[string]PrintNodeComment{
		"nil node index":       {Node: 0, Kind: int32(ast.KindSingleLineCommentTrivia)},
		"out of range":         {Node: 5, Kind: int32(ast.KindSingleLineCommentTrivia)},
		"negative":             {Node: -1, Kind: int32(ast.KindSingleLineCommentTrivia)},
		"invalid comment kind": {Node: 1, Kind: int32(ast.KindIdentifier)},
	} {
		t.Run(name, func(t *testing.T) {
			t.Parallel()
			err := applyPrintNodeComments(printer.NewEmitContext(), nodes, []PrintNodeComment{comment})
			assert.Assert(t, errors.Is(err, ErrClientError))
		})
	}
}
