package estransforms

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/transformers"
)

type classStaticBlockTransformer struct {
	transformers.Transformer
}

func (ch *classStaticBlockTransformer) visit(node *ast.Node) *ast.Node {
	return node // !!!
}

func newClassStaticBlockTransformer(emitContext *printer.EmitContext) *transformers.Transformer {
	tx := &classStaticBlockTransformer{}
	return tx.NewTransformer(tx.visit, emitContext)
}
