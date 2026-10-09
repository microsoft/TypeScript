package estransforms

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/transformers"
)

func (ch *syntaxTransformer) visitLogicalAssignment(node *ast.BinaryExpression) *ast.Node {
	var nonAssignmentOperator ast.Kind
	switch node.OperatorToken.Kind {
	case ast.KindBarBarEqualsToken:
		nonAssignmentOperator = ast.KindBarBarToken
	case ast.KindAmpersandAmpersandEqualsToken:
		nonAssignmentOperator = ast.KindAmpersandAmpersandToken
	case ast.KindQuestionQuestionEqualsToken:
		nonAssignmentOperator = ast.KindQuestionQuestionToken
	default:
		panic("Expected a logical assignment")
	}

	left := ast.SkipParentheses(ch.Visitor().VisitNode(node.Left))
	assignmentTarget := left
	right := ast.SkipParentheses(ch.Visitor().VisitNode(node.Right))

	if ast.IsAccessExpression(left) {
		propertyAccessTargetSimpleCopiable := transformers.IsSimpleCopiableExpression(left.Expression())
		propertyAccessTarget := left.Expression()
		propertyAccessTargetAssignment := left.Expression()
		if !propertyAccessTargetSimpleCopiable {
			propertyAccessTarget = ch.Factory().NewTempVariable()
			ch.EmitContext().AddVariableDeclaration(propertyAccessTarget)
			propertyAccessTargetAssignment = ch.Factory().NewAssignmentExpression(
				propertyAccessTarget,
				left.Expression(),
			)
		}

		if ast.IsPropertyAccessExpression(left) {
			assignmentTarget = ch.Factory().NewPropertyAccessExpression(
				propertyAccessTarget,
				nil,
				left.Name(),
				ast.NodeFlagsNone,
			)
			left = ch.Factory().NewPropertyAccessExpression(
				propertyAccessTargetAssignment,
				nil,
				left.Name(),
				ast.NodeFlagsNone,
			)
		} else {
			elementAccessArgumentSimpleCopiable := transformers.IsSimpleCopiableExpression(left.AsElementAccessExpression().ArgumentExpression)
			elementAccessArgument := left.AsElementAccessExpression().ArgumentExpression
			argumentExpr := elementAccessArgument
			if !elementAccessArgumentSimpleCopiable {
				elementAccessArgument = ch.Factory().NewTempVariable()
				ch.EmitContext().AddVariableDeclaration(elementAccessArgument)
				argumentExpr = ch.Factory().NewAssignmentExpression(
					elementAccessArgument,
					left.AsElementAccessExpression().ArgumentExpression,
				)
			}

			assignmentTarget = ch.Factory().NewElementAccessExpression(
				propertyAccessTarget,
				nil,
				elementAccessArgument,
				ast.NodeFlagsNone,
			)
			left = ch.Factory().NewElementAccessExpression(
				propertyAccessTargetAssignment,
				nil,
				argumentExpr,
				ast.NodeFlagsNone,
			)
		}

	}

	return ch.Factory().NewBinaryExpression(
		nil,
		left,
		nil,
		ch.Factory().NewToken(nonAssignmentOperator),
		ch.Factory().NewParenthesizedExpression(
			ch.Factory().NewAssignmentExpression(
				assignmentTarget,
				right,
			),
		),
	)
}
