/*@internal*/
namespace ts {
    export function transformESNext(context: TransformationContext) {
        return chainBundle(transformSourceFile);

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
                    if (isLogicalAssignmentOperator(binaryExpression.operatorToken.kind)) {
                        return transformLogicalAssignmentOperators(binaryExpression);
                    }
                    // falls through
                default:
                    return visitEachChild(node, visitor, context);
            }
        }

        function transformLogicalAssignmentOperators(binaryExpression: BinaryExpression): VisitResult<Node> {
            const operator = binaryExpression.operatorToken;
            if (isCompoundAssignment(operator.kind) && isLogicalAssignmentOperator(operator.kind)) {
                const nonAssignmentOperator = getNonAssignmentOperatorForCompoundAssignment(operator.kind);
                const left = visitNode(binaryExpression.left, visitor, isExpression);
                const right = visitNode(binaryExpression.right, visitor, isExpression);

                return createBinary(
                    left,
                    nonAssignmentOperator,
                    createParen(
                        createAssignment(
                            left,
                            right
                        )
                    )
                );

            }
            Debug.fail("unexpected operator: " + operator.kind);
        }
    }
}
