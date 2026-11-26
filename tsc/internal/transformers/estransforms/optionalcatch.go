package estransforms

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
)

func (ch *syntaxTransformer) visitCatchClause(node *ast.CatchClause) *ast.Node {
	if node.VariableDeclaration == nil {
		return ch.Factory().NewCatchClause(
			ch.Factory().NewVariableDeclaration(ch.Factory().NewTempVariable(), nil, nil, nil),
			ch.Visitor().Visit(node.Block),
		)
	}
	return ch.Visitor().VisitEachChild(node.AsNode())
}
