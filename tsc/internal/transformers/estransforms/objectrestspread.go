package estransforms

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/transformers"
)

type objectRestSpreadTransformer struct {
	transformers.Transformer
}

func (ch *objectRestSpreadTransformer) visit(node *ast.Node) *ast.Node {
	return node // !!!
}

func newObjectRestSpreadTransformer(emitContext *printer.EmitContext) *transformers.Transformer {
	tx := &objectRestSpreadTransformer{}
	return tx.NewTransformer(tx.visit, emitContext)
}
