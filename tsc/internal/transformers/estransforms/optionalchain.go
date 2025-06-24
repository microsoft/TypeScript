package estransforms

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/transformers"
)

type optionalChainTransformer struct {
	transformers.Transformer
}

func (ch *optionalChainTransformer) visit(node *ast.Node) *ast.Node {
	return node // !!!
}

func newOptionalChainTransformer(emitContext *printer.EmitContext) *transformers.Transformer {
	tx := &optionalChainTransformer{}
	return tx.NewTransformer(tx.visit, emitContext)
}
