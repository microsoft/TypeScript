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
	if node.SubtreeFacts()&ast.SubtreeContainsMissingCatchClauseVariable == 0 {
		return node
	}
	switch node.Kind {
	case ast.KindCatchClause:
		return ch.visitCatchClause(node.AsCatchClause())
	default:
		return ch.Visitor().VisitEachChild(node)
	}
}

func (ch *optionalCatchTransformer) visitCatchClause(node *ast.CatchClause) *ast.Node {
	if node.VariableDeclaration == nil {
		return ch.Factory().NewCatchClause(
			ch.Factory().NewVariableDeclaration(ch.Factory().NewTempVariable(), nil, nil, nil),
			ch.Visitor().Visit(node.Block),
		)
	}
	return ch.Visitor().VisitEachChild(node.AsNode())
}

func newOptionalCatchTransformer(emitContext *printer.EmitContext) *transformers.Transformer {
	tx := &optionalCatchTransformer{}
	return tx.NewTransformer(tx.visit, emitContext)
}
