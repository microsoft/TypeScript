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
                case SyntaxKind.DoExpression:
                    return transformDoExpression(<DoExpression>node);
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

        function transformDoExpression(expr: DoExpression): VisitResult<Node> {
            const hasAsync = expr.transformFlags & TransformFlags.ContainsAwait;
            const hasYield = expr.transformFlags & TransformFlags.ContainsYield;
            const temp = context.factory.createTempVariable(context.hoistVariableDeclaration);
            function do_visit(node: Node): VisitResult<Node> {
                const isFinallyBlock = isBlock(node) && isTryStatement(node.parent) && node === node.parent.finallyBlock;
                if (isFinallyBlock) return visitEachChild(node, visitor, context);
                if (isExpressionStatement(node) && !(isFunctionLike(node) || isClassLike(node) || isNamespaceBody(node))) {
                    return factory.createExpressionStatement(
                        factory.createAssignment(temp, visitEachChild(node.expression, visitor, context))
                    );
                }
                if (isTryStatement(node) || isSwitchStatement(node) || (isIfStatement(node) && !(isIfStatement(node.parent)))) {
                    return [factory.createAssignment(temp, factory.createVoidZero()), visitEachChild(node, do_visit, context)];
                }
                return visitEachChild(node, do_visit, context);
            }
            const block = visitEachChild(expr.block, do_visit, context);
            const star = factory.createToken(SyntaxKind.AsteriskToken);
            const f = factory.createFunctionExpression(
                hasAsync ? [factory.createModifier(SyntaxKind.AsyncKeyword)] : undefined,
                hasYield ? star : undefined,
                /* name */ undefined, /* typeParam */ undefined, /** param */[], /** type */ undefined,
                block
            );
            // f.call(this)
            const call = factory.createCallExpression(
                factory.createPropertyAccessExpression(f, "call"), /** typeArgs */ undefined, [factory.createThis()]
            );
            // yield* f.call(this)
            const executor = hasYield ? factory.createYieldExpression(star, call) : hasAsync ? factory.createAwaitExpression(call) : call;
            return factory.createCommaListExpression([executor, temp]);
        }
    }
}
