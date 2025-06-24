package jsxtransforms

import "github.com/microsoft/typescript-go/internal/ast"

func createExpressionFromEntityName(factory ast.NodeFactoryCoercible, node *ast.Node) *ast.Expression {
	if ast.IsQualifiedName(node) {
		left := createExpressionFromEntityName(factory, node.AsQualifiedName().Left)
		// TODO(rbuckton): Does this need to be parented?
		right := node.AsQualifiedName().Right.Clone(factory.AsNodeFactory())
		right.Loc = node.AsQualifiedName().Right.Loc
		right.Parent = node.AsQualifiedName().Right.Parent
		return factory.AsNodeFactory().NewPropertyAccessExpression(left, nil, right, ast.NodeFlagsNone)
	} else {
		// TODO(rbuckton): Does this need to be parented?
		res := node.Clone(factory.AsNodeFactory())
		res.Loc = node.Loc
		res.Parent = node.Parent
		return res
	}
}
