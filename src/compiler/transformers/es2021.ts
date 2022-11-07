/*@internal*/
namespace ts {
export function transformES2021(context: ts.TransformationContext) {
    const {
        hoistVariableDeclaration,
        factory
    } = context;
    return ts.chainBundle(context, transformSourceFile);

    function transformSourceFile(node: ts.SourceFile) {
        if (node.isDeclarationFile) {
            return node;
        }

        return ts.visitEachChild(node, visitor, context);
    }

    function visitor(node: ts.Node): ts.VisitResult<ts.Node> {
        if ((node.transformFlags & ts.TransformFlags.ContainsES2021) === 0) {
            return node;
        }
        switch (node.kind) {
            case ts.SyntaxKind.BinaryExpression:
                const binaryExpression = node as ts.BinaryExpression;
                if (ts.isLogicalOrCoalescingAssignmentExpression(binaryExpression)) {
                    return transformLogicalAssignment(binaryExpression);
                }
            // falls through
            default:
                return ts.visitEachChild(node, visitor, context);
        }
    }

    function transformLogicalAssignment(binaryExpression: ts.AssignmentExpression<ts.Token<ts.LogicalOrCoalescingAssignmentOperator>>): ts.VisitResult<ts.Node> {
        const operator = binaryExpression.operatorToken;
        const nonAssignmentOperator = ts.getNonAssignmentOperatorForCompoundAssignment(operator.kind);
        let left = ts.skipParentheses(ts.visitNode(binaryExpression.left, visitor, ts.isLeftHandSideExpression));
        let assignmentTarget = left;
        const right = ts.skipParentheses(ts.visitNode(binaryExpression.right, visitor, ts.isExpression));

        if (ts.isAccessExpression(left)) {
            const propertyAccessTargetSimpleCopiable = ts.isSimpleCopiableExpression(left.expression);
            const propertyAccessTarget = propertyAccessTargetSimpleCopiable ? left.expression :
                factory.createTempVariable(hoistVariableDeclaration);
            const propertyAccessTargetAssignment = propertyAccessTargetSimpleCopiable ? left.expression : factory.createAssignment(
                propertyAccessTarget,
                left.expression
            );

            if (ts.isPropertyAccessExpression(left)) {
                assignmentTarget = factory.createPropertyAccessExpression(
                    propertyAccessTarget,
                    left.name
                );
                left = factory.createPropertyAccessExpression(
                    propertyAccessTargetAssignment,
                    left.name
                );
            }
            else {
                const elementAccessArgumentSimpleCopiable = ts.isSimpleCopiableExpression(left.argumentExpression);
                const elementAccessArgument = elementAccessArgumentSimpleCopiable ? left.argumentExpression :
                    factory.createTempVariable(hoistVariableDeclaration);

                assignmentTarget = factory.createElementAccessExpression(
                    propertyAccessTarget,
                    elementAccessArgument
                );
                left = factory.createElementAccessExpression(
                    propertyAccessTargetAssignment,
                    elementAccessArgumentSimpleCopiable ? left.argumentExpression : factory.createAssignment(
                        elementAccessArgument,
                        left.argumentExpression
                    )
                );
            }
        }

        return factory.createBinaryExpression(
            left,
            nonAssignmentOperator,
            factory.createParenthesizedExpression(
                factory.createAssignment(
                    assignmentTarget,
                    right
                )
            )
        );
    }
}
}
