package estransforms

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/transformers"
)

type nullishCoalescingTransformer struct {
	transformers.Transformer
}

func (ch *nullishCoalescingTransformer) visit(node *ast.Node) *ast.Node {
	return node // !!!
}

func newNullishCoalescingTransformer(emitContext *printer.EmitContext) *transformers.Transformer {
	tx := &nullishCoalescingTransformer{}
	return tx.NewTransformer(tx.visit, emitContext)
}
