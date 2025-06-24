package estransforms

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/transformers"
)

type optionalCatchTransformer struct {
	transformers.Transformer
}

func (ch *optionalCatchTransformer) visit(node *ast.Node) *ast.Node {
	return node // !!!
}

func newOptionalCatchTransformer(emitContext *printer.EmitContext) *transformers.Transformer {
	tx := &optionalCatchTransformer{}
	return tx.NewTransformer(tx.visit, emitContext)
}
