/*@internal*/
namespace ts {
    export function transformESNext(context: TransformationContext) {
        const {
            hoistVariableDeclaration,
            factory
        } = context;
        return chainBundle(context, transformSourceFile);

        function transformSourceFile(node: SourceFile) {
            if (node.isDeclarationFile) {
                return node;
            }

            return visitEachChild(node, visitor, context);
        }

        function visitor(node: Node): VisitResult<Node> {
            if ((node.transformFlags & TransformFlags.ContainsESNext) === 0) {
                return node;
            }
            switch (node.kind) {
                case SyntaxKind.BinaryExpression:
                    const binaryExpression = <BinaryExpression>node;
                    if (isLogicalOrCoalescingAssignmentExpression(binaryExpression)) {
                        return transformLogicalAssignment(binaryExpression);
                    }
                    // falls through
                default:
                    return visitEachChild(node, visitor, context);
            }
        }

        function transformLogicalAssignment(binaryExpression: AssignmentExpression<Token<LogicalOrCoalescingAssignmentOperator>>): VisitResult<Node> {
            const operator = binaryExpression.operatorToken;
            const nonAssignmentOperator = getNonAssignmentOperatorForCompoundAssignment(operator.kind);
            let left = skipParentheses(visitNode(binaryExpression.left, visitor, isLeftHandSideExpression));
            let assignmentTarget = left;
            const right = skipParentheses(visitNode(binaryExpression.right, visitor, isExpression));
            if (isAccessExpression(left)) {
                const tempVariable = factory.createTempVariable(hoistVariableDeclaration);
                if (isPropertyAccessExpression(left)) {
                    assignmentTarget = factory.createPropertyAccessExpression(
                        tempVariable,
                        left.name
                    );
                    left = factory.createPropertyAccessExpression(
                        factory.createAssignment(
                            tempVariable,
                            left.expression
                        ),
                        left.name
                    );
                }
                else {
                    assignmentTarget = factory.createElementAccessExpression(
                        tempVariable,
                        left.argumentExpression
                    );
                    left = factory.createElementAccessExpression(
                        factory.createAssignment(
                            tempVariable,
                            left.expression
                        ),
                        left.argumentExpression
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
