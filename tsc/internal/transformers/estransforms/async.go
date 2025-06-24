package estransforms

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/transformers"
)

type asyncTransformer struct {
	transformers.Transformer
}

func (ch *asyncTransformer) visit(node *ast.Node) *ast.Node {
	return node // !!!
}

func newAsyncTransformer(emitContext *printer.EmitContext) *transformers.Transformer {
	tx := &asyncTransformer{}
	return tx.NewTransformer(tx.visit, emitContext)
}
