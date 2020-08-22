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
                    return visitEachChild(node, visitor, context);
                case SyntaxKind.BindExpression:
                    const bindExpression = <BindExpression>node;
                    return transformBindExpression(bindExpression);
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
                const propertyAccessTargetSimpleCopiable = isSimpleCopiableExpression(left.expression);
                const propertyAccessTarget = propertyAccessTargetSimpleCopiable ? left.expression :
                    factory.createTempVariable(hoistVariableDeclaration);
                const propertyAccessTargetAssignment = propertyAccessTargetSimpleCopiable ? left.expression : factory.createAssignment(
                    propertyAccessTarget,
                    left.expression
                );

                if (isPropertyAccessExpression(left)) {
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
                    const elementAccessArgumentSimpleCopiable = isSimpleCopiableExpression(left.argumentExpression);
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

        function transformBindExpression(bindExpression: BindExpression): VisitResult<Node> {
            const left = bindExpression.left && skipParentheses(visitNode(bindExpression.left, visitor, isLeftHandSideExpression));
            const right = skipParentheses(visitNode(bindExpression.right, visitor));
            if (left) {
                // left::right
                // => right.bind(left)
                // but left should be evaluated earlier than right
                const base = factory.createTempVariable(hoistVariableDeclaration);
                const bound = factory.createCallExpression(
                    factory.createPropertyAccessExpression(right, "bind"),
                    /* typeArguments */ undefined,
                    [base]
                );
                const res = factory.createCommaListExpression([
                    factory.createAssignment(base, left),
                    bound
                ]);
                return res;
            }
            else {
                if (isAccessExpression(right) && right.expression.kind === SyntaxKind.SuperKeyword) {
                    // ::super.bar
                    // => super.bar.bind(this)
                    // ::super["bar"]
                    // => super["bar"].bind(this)
                    return factory.createCallExpression(
                        factory.createPropertyAccessExpression(
                            right,
                            "bind"
                        ),
                        /* typeArguments */ undefined,
                        [factory.createThis()]
                    );
                }
                if (isPropertyAccessExpression(right)) {
                    // ::foo.bar
                    // => foo.bar.bind(foo)
                    // but foo should be evaluated only once

                    const base = factory.createTempVariable(hoistVariableDeclaration);
                    const bound = factory.createCallExpression(
                        factory.createPropertyAccessExpression(
                            factory.createPropertyAccessExpression(
                                factory.createAssignment(base, right.expression),
                                right.name
                            ),
                            "bind"
                        ),
                        /* typeArguments */ undefined,
                        [base]
                    );
                    return bound;
                }
                else if (isElementAccessExpression(right)) {
                    // ::foo["bar"]
                    // => foo["bar"].bind(foo)
                    // but foo should be evaluated only once

                    const base = factory.createTempVariable(hoistVariableDeclaration);
                    const bound = factory.createCallExpression(
                        factory.createPropertyAccessExpression(
                            factory.createElementAccessExpression(
                                factory.createAssignment(base, right.expression),
                                right.argumentExpression
                            ),
                            "bind"
                        ),
                        /* typeArguments */ undefined,
                        [base]
                    );
                    return bound;
                }
                else {
                    // this should not happen, fallback emission
                    // ::expr
                    // => expr.bind(void 0)
                    return factory.createCallExpression(
                        factory.createPropertyAccessExpression(
                            right,
                            "bind"
                        ),
                        /* typeArguments */ undefined,
                        [factory.createVoidZero()]
                    );
                }
            }
        }
    }
}
