/*@internal*/
namespace ts {
    export function transformESNext(context: TransformationContext) {
        const {
            hoistVariableDeclaration,
            factory
        } = context;
        const star = factory.createToken(SyntaxKind.AsteriskToken);
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
            const hasAsync = Boolean(expr.transformFlags & TransformFlags.ContainsAwait);
            const hasYield = Boolean(expr.transformFlags & TransformFlags.ContainsYield);
            const temp = context.factory.createTempVariable(context.hoistVariableDeclaration);
            function do_visit<T extends Block | CaseBlock | CatchClause | Statement | Expression>(node: T): T
            function do_visit(node: Node): Node {
                if (isExpressionStatement(node) && !(isFunctionLike(node) || isClassLike(node) || isNamespaceBody(node))) {
                    return factory.createExpressionStatement(
                        factory.createAssignment(temp, visitEachChild(node.expression, visitor, context))
                    );
                }
                const cleanPreviousCompletionValue = factory.createAssignment(temp, factory.createVoidZero());
                if (isIfStatement(node) && !isIfStatement(node.parent)) {
                    return factory.createIfStatement(
                        factory.createCommaListExpression([cleanPreviousCompletionValue, do_visit(node.expression)]),
                        do_visit(node.thenStatement),
                        node.elseStatement && do_visit(node.elseStatement)
                    );
                } else if (isSwitchStatement(node)) {
                    return factory.createSwitchStatement(
                        factory.createCommaListExpression([cleanPreviousCompletionValue, node.expression]),
                        do_visit(node.caseBlock)
                    );
                } else if (isTryStatement(node)) {
                    return factory.createTryStatement(
                        factory.createBlock([
                            factory.createExpressionStatement(cleanPreviousCompletionValue),
                            ...do_visit(node.tryBlock).statements,
                        ], node.tryBlock.multiLine),
                        node.catchClause && do_visit(node.catchClause),
                        // completion value of finally is ignored
                        visitEachChild(node.finallyBlock, visitor, context),
                    );
                }
                return visitEachChild(visitEachChild(node, do_visit, context), visitor, context);
            }
            const block = visitEachChild(expr.block, do_visit, context);
            const f = createDoBlockFunction(block, hasAsync, hasYield);
            const exec = createDoBlockExecutor(f, hasAsync, hasYield);
            return factory.createCommaListExpression([exec, temp]);
        }

        function createDoBlockFunction(block: Block, hasAsync: boolean, hasYield: boolean) {
            const modifiers = hasAsync ? [factory.createModifier(SyntaxKind.AsyncKeyword)] : undefined;
            if (!hasYield) {
                return factory.createArrowFunction(
                    modifiers,
                    /** generics */ undefined, [],
                    /** type */ undefined,
                    factory.createToken(SyntaxKind.EqualsGreaterThanToken),
                    block
                );
            }
            return factory.createFunctionExpression(
                modifiers,
                hasYield ? star : undefined,
                /* name */ undefined, /* typeParam */ undefined, /** param */[], /** type */ undefined,
                block
            );
        }
        function createDoBlockExecutor(f: ArrowFunction | FunctionExpression, hasAsync: boolean, hasYield: boolean) {
            // yield* expr.call(this)
            if (hasYield) return factory.createYieldExpression(star, call(factory.createPropertyAccessExpression(f, "call"), [factory.createThis()]));
            // await expr()
            if (hasAsync) return factory.createAwaitExpression(call(f, []));
            // expr()
            return call(f, [])
        }
        function call(expr: Expression, args: Expression[]) {
            return factory.createCallExpression(expr, /** generics */ undefined, args);
        }
    }
}
