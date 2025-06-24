package transformers

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/printer"
)

type chainedTransformer struct {
	Transformer
	components []*Transformer
}

func (ch *chainedTransformer) visit(node *ast.Node) *ast.Node {
	if node.Kind != ast.KindSourceFile {
		panic("Chained transform passed non-sourcefile initial node")
	}
	result := node.AsSourceFile()
	for _, t := range ch.components {
		result = t.TransformSourceFile(result)
	}
	return result.AsNode()
}

type TransformerFactory = func(emitContext *printer.EmitContext) *Transformer

// Chains transforms in left-to-right order, running them one at a time in order (as opposed to interleaved at each node)
// - the resulting combined transform only operates on SourceFile nodes
func Chain(transforms ...TransformerFactory) TransformerFactory {
	if len(transforms) < 2 {
		if len(transforms) == 0 {
			panic("Expected some number of transforms to chain, but got none")
		}
		return transforms[0]
	}
	return func(emitContext *printer.EmitContext) *Transformer {
		constructed := make([]*Transformer, 0, len(transforms))
		for _, t := range transforms {
			// TODO: flatten nested chains?
			constructed = append(constructed, t(emitContext))
		}
		ch := &chainedTransformer{components: constructed}
		return ch.NewTransformer(ch.visit, emitContext)
	}
}
