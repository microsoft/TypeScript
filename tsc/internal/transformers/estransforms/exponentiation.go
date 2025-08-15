package estransforms

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/transformers"
)

type exponentiationTransformer struct {
	transformers.Transformer
}

func (ch *exponentiationTransformer) visit(node *ast.Node) *ast.Node {
	if node.SubtreeFacts()&ast.SubtreeContainsExponentiationOperator == 0 {
		return node
	}
	switch node.Kind {
	case ast.KindBinaryExpression:
		return ch.visitBinaryExpression(node.AsBinaryExpression())
	default:
		return ch.Visitor().VisitEachChild(node)
	}
}

func (ch *exponentiationTransformer) visitBinaryExpression(node *ast.BinaryExpression) *ast.Node {
	switch node.OperatorToken.Kind {
	case ast.KindAsteriskAsteriskEqualsToken:
		return ch.visitExponentiationAssignmentExpression(node)
	case ast.KindAsteriskAsteriskToken:
		return ch.visitExponentiationExpression(node)
	}
	return ch.Visitor().VisitEachChild(node.AsNode())
}

func (ch *exponentiationTransformer) visitExponentiationAssignmentExpression(node *ast.BinaryExpression) *ast.Node {
	var target *ast.Node
	var value *ast.Node
	left := ch.Visitor().VisitNode(node.Left)
	right := ch.Visitor().VisitNode(node.Right)
	if ast.IsElementAccessExpression(left) {
		// Transforms `a[x] **= b` into `(_a = a)[_x = x] = Math.pow(_a[_x], b)`
		expressionTemp := ch.Factory().NewTempVariable()
		ch.EmitContext().AddVariableDeclaration(expressionTemp)
		argumentExpressionTemp := ch.Factory().NewTempVariable()
		ch.EmitContext().AddVariableDeclaration(argumentExpressionTemp)

		objExpr := ch.Factory().NewAssignmentExpression(expressionTemp, left.AsElementAccessExpression().Expression)
		objExpr.Loc = left.AsElementAccessExpression().Expression.Loc
		accessExpr := ch.Factory().NewAssignmentExpression(argumentExpressionTemp, left.AsElementAccessExpression().ArgumentExpression)
		accessExpr.Loc = left.AsElementAccessExpression().ArgumentExpression.Loc

		target = ch.Factory().NewElementAccessExpression(objExpr, nil, accessExpr, ast.NodeFlagsNone)

		value = ch.Factory().NewElementAccessExpression(expressionTemp, nil, argumentExpressionTemp, ast.NodeFlagsNone)
		value.Loc = left.Loc
	} else if ast.IsPropertyAccessExpression(left) {
		// Transforms `a.x **= b` into `(_a = a).x = Math.pow(_a.x, b)`
		expressionTemp := ch.Factory().NewTempVariable()
		ch.EmitContext().AddVariableDeclaration(expressionTemp)
		assignment := ch.Factory().NewAssignmentExpression(expressionTemp, left.Expression())
		assignment.Loc = left.Expression().Loc
		target = ch.Factory().NewPropertyAccessExpression(assignment, nil, left.Name(), ast.NodeFlagsNone)
		target.Loc = left.Loc

		value = ch.Factory().NewPropertyAccessExpression(expressionTemp, nil, left.Name(), ast.NodeFlagsNone)
		value.Loc = left.Loc
	} else {
		// Transforms `a **= b` into `a = Math.pow(a, b)`
		target = left
		value = left
	}

	rhs := ch.Factory().NewGlobalMethodCall("Math", "pow", []*ast.Node{value, right})
	rhs.Loc = node.Loc
	result := ch.Factory().NewAssignmentExpression(target, rhs)
	result.Loc = node.Loc
	return result
}

func (ch *exponentiationTransformer) visitExponentiationExpression(node *ast.BinaryExpression) *ast.Node {
	left := ch.Visitor().VisitNode(node.Left)
	right := ch.Visitor().VisitNode(node.Right)
	result := ch.Factory().NewGlobalMethodCall("Math", "pow", []*ast.Node{left, right})
	result.Loc = node.Loc
	return result
}

func newExponentiationTransformer(opts *transformers.TransformOptions) *transformers.Transformer {
	tx := &exponentiationTransformer{}
	return tx.NewTransformer(tx.visit, opts.Context)
}
