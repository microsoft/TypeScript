package estransforms

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/transformers"
)

type forawaitTransformer struct {
	transformers.Transformer
}

func (ch *forawaitTransformer) visit(node *ast.Node) *ast.Node {
	return node // !!!
}

func newforawaitTransformer(emitContext *printer.EmitContext) *transformers.Transformer {
	tx := &forawaitTransformer{}
	return tx.NewTransformer(tx.visit, emitContext)
}
