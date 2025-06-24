package estransforms

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/transformers"
)

type classFieldsTransformer struct {
	transformers.Transformer
}

func (ch *classFieldsTransformer) visit(node *ast.Node) *ast.Node {
	return node // !!!
}

func newClassFieldsTransformer(emitContext *printer.EmitContext) *transformers.Transformer {
	tx := &classFieldsTransformer{}
	return tx.NewTransformer(tx.visit, emitContext)
}
