package transformers

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/printer"
)

type Transformer struct {
	emitContext *printer.EmitContext
	factory     *printer.NodeFactory
	visitor     *ast.NodeVisitor
}

func (tx *Transformer) NewTransformer(visit func(node *ast.Node) *ast.Node, emitContext *printer.EmitContext) *Transformer {
	if tx.emitContext != nil {
		panic("Transformer already initialized")
	}
	if emitContext == nil {
		emitContext = printer.NewEmitContext()
	}
	tx.emitContext = emitContext
	tx.factory = emitContext.Factory
	tx.visitor = emitContext.NewNodeVisitor(visit)
	return tx
}

func (tx *Transformer) EmitContext() *printer.EmitContext {
	return tx.emitContext
}

func (tx *Transformer) Visitor() *ast.NodeVisitor {
	return tx.visitor
}

func (tx *Transformer) Factory() *printer.NodeFactory {
	return tx.factory
}

func (tx *Transformer) TransformSourceFile(file *ast.SourceFile) *ast.SourceFile {
	return tx.visitor.VisitSourceFile(file)
}
