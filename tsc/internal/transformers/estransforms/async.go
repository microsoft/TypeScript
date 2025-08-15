package estransforms

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/transformers"
)

type asyncTransformer struct {
	transformers.Transformer
}

func (ch *asyncTransformer) visit(node *ast.Node) *ast.Node {
	return node // !!!
}

func newAsyncTransformer(opts *transformers.TransformOptions) *transformers.Transformer {
	tx := &asyncTransformer{}
	return tx.NewTransformer(tx.visit, opts.Context)
}
