package transformers

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/printer"
)

type Transformer struct {
	emitContext *printer.EmitContext
	factory     *ast.NodeFactory
	visitor     ast.NodeVisitor
}

func (tx *Transformer) newTransformer(visit func(node *ast.Node) *ast.Node, emitContext *printer.EmitContext) *Transformer {
	if tx.emitContext != nil {
		panic("Transformer already initialized")
	}
	if emitContext == nil {
		emitContext = printer.NewEmitContext()
	}
	tx.emitContext = emitContext
	tx.factory = emitContext.Factory
	tx.visitor.Visit = visit
	tx.visitor.Factory = emitContext.Factory
	tx.visitor.Hooks.SetOriginal = emitContext.SetOriginal
	return tx
}

func (tx *Transformer) TransformSourceFile(file *ast.SourceFile) *ast.SourceFile {
	return tx.visitor.VisitSourceFile(file)
}
