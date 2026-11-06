package estransforms

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/transformers"
)

func (ch *syntaxTransformer) lowerNullishCoalescing(left *ast.Node, fallback *ast.Node) *ast.Node {
	value := left
	if !transformers.IsSimpleCopiableExpression(left) {
		value = ch.Factory().NewTempVariable()
		ch.EmitContext().AddVariableDeclaration(value)
		left = ch.Factory().NewAssignmentExpression(value, left)
	}
	return ch.Factory().NewConditionalExpression(
		createNotNullCondition(ch.EmitContext(), left, value, false),
		ch.Factory().NewToken(ast.KindQuestionToken),
		value,
		ch.Factory().NewToken(ast.KindColonToken),
		fallback,
	)
}
