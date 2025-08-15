package estransforms

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/transformers"
)

type esDecoratorTransformer struct {
	transformers.Transformer
}

func (ch *esDecoratorTransformer) visit(node *ast.Node) *ast.Node {
	return node // !!!
}

func newESDecoratorTransformer(opts *transformers.TransformOptions) *transformers.Transformer {
	tx := &esDecoratorTransformer{}
	return tx.NewTransformer(tx.visit, opts.Context)
}
