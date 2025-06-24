package estransforms

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/transformers"
)

type logicalAssignmentTransformer struct {
	transformers.Transformer
}

func (ch *logicalAssignmentTransformer) visit(node *ast.Node) *ast.Node {
	return node // !!!
}

func newLogicalAssignmentTransformer(emitContext *printer.EmitContext) *transformers.Transformer {
	tx := &logicalAssignmentTransformer{}
	return tx.NewTransformer(tx.visit, emitContext)
}
