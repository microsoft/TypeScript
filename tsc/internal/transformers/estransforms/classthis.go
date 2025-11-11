package estransforms

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/printer"
)

// Gets whether a node is a `static {}` block containing only a single assignment of the static `this` to the `_classThis`
// (or similar) variable stored in the `classthis` property of the block's `EmitNode`.
func isClassThisAssignmentBlock(emitContext *printer.EmitContext, node *ast.Node) bool {
	if ast.IsClassStaticBlockDeclaration(node) {
		n := node.AsClassStaticBlockDeclaration()
		body := n.Body.AsBlock()
		if len(body.Statements.Nodes) == 1 {
			statement := body.Statements.Nodes[0]
			if ast.IsExpressionStatement(statement) {
				expression := statement.Expression()
				if ast.IsAssignmentExpression(expression, true /*excludeCompoundAssignment*/) {
					binary := expression.AsBinaryExpression()
					return ast.IsIdentifier(binary.Left) &&
						emitContext.ClassThis(node) == binary.Left &&
						binary.Right.Kind == ast.KindThisKeyword
				}
			}
		}
	}
	return false
}
