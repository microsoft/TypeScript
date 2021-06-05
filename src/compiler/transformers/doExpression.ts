/*@internal*/
namespace ts {
    export function transformDoExpression(context: TransformationContext, node: SourceFile) {
        const { factory } = context;
        const star = factory.createToken(SyntaxKind.AsteriskToken);
        interface ReturnContext {
            signal: Identifier
            operand: Identifier
        }
        interface BreakContinueContext {
            signal: Identifier
            operand: Identifier
            usedLabel: Set<string>
        }
        let currentReturnContext: ReturnContext | undefined;
        let currentBreakContext: BreakContinueContext | undefined;
        let currentContinueContext: BreakContinueContext | undefined;
        return transformSourceFile(node);

        function transformSourceFile(node: SourceFile) {
            if (node.isDeclarationFile) {
                return node;
            }

            return visitEachChild(node, visitor, context);
        }

        function visitor(node: Node): VisitResult<Node> {
            if (
                isFunctionExpression(node) ||
                isFunctionDeclaration(node) ||
                isConstructorDeclaration(node) ||
                isArrowFunction(node) ||
                isMethodOrAccessor(node)
            ) return transformFunction(node);
            switch (node.kind) {
                case SyntaxKind.DoExpression:
                    if ((node as DoExpression).async) {
                        return transformDoExpression(node as DoExpression);
                    }
                    return visitEachChild(node, visitor, context);
                case SyntaxKind.ReturnStatement:
                case SyntaxKind.BreakStatement:
                case SyntaxKind.ContinueStatement:
                    return transformControlFlow(node);
                default:
                    return visitEachChild(node, visitor, context);
            }
        }
        function transformFunction<T extends FunctionExpression | FunctionDeclaration | MethodDeclaration | ConstructorDeclaration | ArrowFunction | AccessorDeclaration>(node: T): Node {
            return startReturnBreakContinueBoundary(() => {
                return visitEachChild(node, child => {
                    if (child === node.body) return visitBody(node.body);
                    return visitor(child);
                }, context);
            });
            function visitBody(body: ConciseBody): ConciseBody {
                let nextBody = visitEachChild(body, visitor, context);
                if (currentReturnContext) {
                    nextBody = wrapBlockToHandleSignal(nextBody, [currentReturnContext], createSignalHandler);
                }
                return nextBody;
            }
            // if (signal === currentReturnContext.signal) return currentReturnContext.expr;
            function createSignalHandler(signal: Identifier): readonly Statement[] {
                if (!currentReturnContext) return [];
                return [
                    factory.createIfStatement(
                        factory.createEquality(signal, currentReturnContext.signal),
                        factory.createReturnStatement(currentReturnContext.operand),
                    )
                ];
            }
        }
        // function transformFor() {}
        // function transformWhile() {}
        // function transformDoWhile() {}
        // function transformSwitch() {}
        // function transformClass<T extends ClassExpression | ClassDeclaration>(node: T): T {
        //     return startReturnBreakContinueBoundary(() => visitEachChild(node, visitor, context));
        // }

        /**
         * { Block }
         * ==== transformed to ====
         * {
         *  var signal = {}, operand
         *  try { Block }
         *  catch(e) {
         *      if (e === signal) return operand
         *      throw e
         *  }
         * }
         */
        function wrapBlockToHandleSignal(node: ConciseBody, hoists: (ReturnContext | BreakContinueContext)[], f: (signal: Identifier) => readonly Statement[]) {
            const temp = factory.createTempVariable(() => {});
            return factory.createBlock([
                // var signal = {}, operand
                factory.createVariableStatement(/** modifiers */ undefined, factory.createVariableDeclarationList(
                    flatMap(hoists, x => [
                        factory.createVariableDeclaration(x.signal, /** ! */ undefined, /** type */ undefined, factory.createObjectLiteralExpression()),
                        factory.createVariableDeclaration(x.operand),
                    ])
                )),
                factory.createTryStatement(
                    factory.converters.convertToFunctionBlock(node),
                    factory.createCatchClause(factory.createVariableDeclaration(temp), factory.createBlock([
                        ...f(temp),
                        factory.createThrowStatement(temp),
                    ])),
                    /** finallyBlock */ undefined
                )
            ]);
        }
        function startReturnBreakContinueBoundary<T>(f: () => T) {
            const old = [currentReturnContext, currentBreakContext, currentContinueContext] as const;
            currentReturnContext = currentBreakContext = currentContinueContext = undefined;
            const result = f();
            [currentReturnContext, currentBreakContext, currentContinueContext] = old;
            return result;
        }

        function transformControlFlow(node: Node) {
            let shouldTransform = false;
            if (isReturnStatement(node)) {
                findAncestor(node, (parent): parent is SignatureDeclaration => {
                    if (isDoExpression(parent)) shouldTransform = true;
                    return isFunctionLike(parent);
                });
                if (!shouldTransform) return visitEachChild(node, visitor, context);
                if (!currentReturnContext) {
                    currentReturnContext = { signal: factory.createTempVariable(noop), operand: factory.createTempVariable(noop) };
                }
                const setOp = node.expression && factory.createBinaryExpression(currentReturnContext.operand, factory.createToken(SyntaxKind.EqualsToken), visitEachChild(node.expression, visitor, context));
                const _throw = factory.createImmediatelyInvokedFunctionExpression([
                    factory.createThrowStatement(currentReturnContext.signal),
                ]);
                return factory.createExpressionStatement(setOp ? factory.createCommaListExpression([setOp, _throw]): _throw);
            }
        }

        function transformDoExpression(expr: DoExpression): VisitResult<Node> {
            const hasAsync = Boolean(expr.transformFlags & TransformFlags.ContainsAwait);
            const hasYield = Boolean(expr.transformFlags & TransformFlags.ContainsYield);
            const temp = context.factory.createTempVariable(context.hoistVariableDeclaration);
            function do_visit<T extends Block | CaseBlock | CatchClause | Statement | Expression>(node: T): T;
            function do_visit(node: Node): Node {
                if (isFunctionLike(node) || isClassLike(node) || isNamespaceBody(node)) return node;
                if (isExpressionStatement(node)) {
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
                }
                else if (isSwitchStatement(node)) {
                    return factory.createSwitchStatement(
                        factory.createCommaListExpression([cleanPreviousCompletionValue, node.expression]),
                        do_visit(node.caseBlock)
                    );
                }
                else if (isTryStatement(node)) {
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
            if (expr.async) return createAsyncDoExpressionResult(block, temp);
            const f = functionOf(block, hasAsync, hasYield);
            const exec = createDoBlockExecutor(f, hasAsync, hasYield);
            return factory.createCommaListExpression([exec, temp]);
        }

        /**
         * Try to generate arrow function if possible.
         */
        function functionOf(block: ConciseBody, hasAsync: boolean, hasYield: boolean) {
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
                isBlock(block) ? block : factory.createBlock([factory.createReturnStatement(block)])
            );
        }
        function createDoBlockExecutor(f: ArrowFunction | FunctionExpression, hasAsync: boolean, hasYield: boolean) {
            // yield* expr.call(this)
            if (hasYield) return factory.createYieldExpression(star, call(factory.createPropertyAccessExpression(f, "call"), [factory.createThis()]));
            // await expr()
            if (hasAsync) return factory.createAwaitExpression(call(f, []));
            // expr()
            return call(f, []);
        }
        /**
         * For async do expression, we generate code like this:
         * (async () => { _block })().then(() => _completion_value_container_)
         */
        function createAsyncDoExpressionResult(block: Block, completionValueContainer: Identifier) {
            const f = functionOf(block, /** await */ true, /** yield */ false);
            const invoke = call(f, []);
            const then = factory.createPropertyAccessExpression(invoke, "then");
            const thenBody = functionOf(completionValueContainer, /** await */ false, /** yield */ false);
            return call(then, [thenBody]);
        }
        function call(expr: Expression, args: Expression[]) {
            return factory.createCallExpression(expr, /** generics */ undefined, args);
        }
    }
}
