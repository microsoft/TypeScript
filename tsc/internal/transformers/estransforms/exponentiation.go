package estransforms

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/transformers"
)

type exponentiationTransformer struct {
	transformers.Transformer
}

func (ch *exponentiationTransformer) visit(node *ast.Node) *ast.Node {
	return node // !!!
}

func newExponentiationTransformer(emitContext *printer.EmitContext) *transformers.Transformer {
	tx := &exponentiationTransformer{}
	return tx.NewTransformer(tx.visit, emitContext)
}
