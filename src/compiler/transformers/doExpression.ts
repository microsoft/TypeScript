/*@internal*/
namespace ts {
    export function transformDoExpression(context: TransformationContext, node: SourceFile) {
        const { factory } = context;
        const star = factory.createToken(SyntaxKind.AsteriskToken);
        //#region ControlFlow
        const enum ControlFlow {
            Return, Break, Continue,
        }
        interface ReturnContext {
            type: ControlFlow.Return
            signal: Identifier
            value: Identifier
        }
        type Label = Identifier | undefined;
        interface BreakContinueContext {
            type: ControlFlow.Break | ControlFlow.Continue
            signal?: Identifier
            label: Label
            // For IterationStatement and Switch, it's true; For LabelledStatement, it's false;
            allowAmbientBreak: boolean
            parent: BreakContinueContext | undefined
        }
        let currentReturnContext: ReturnContext | undefined;
        let currentBreakContext: BreakContinueContext | undefined;
        let currentContinueContext: BreakContinueContext | undefined;
        function startControlFlowContext<T>(f: () => T) {
            const old = [currentReturnContext, currentBreakContext, currentContinueContext] as const;
            currentReturnContext = currentBreakContext = currentContinueContext = undefined;
            const result = f();
            [currentReturnContext, currentBreakContext, currentContinueContext] = old;
            return result;
        }
        function startBreakContext<T>(label: Label, allowAmbientBreak: boolean, f: () => T) {
            const parent = currentBreakContext;
            currentBreakContext = { type: ControlFlow.Break, allowAmbientBreak, label, parent, signal: undefined };
            const result = f();
            currentBreakContext = parent;
            return result;
        }
        function startContinueContext<T>(label: Label, f: () => T) {
            const parent = currentContinueContext;
            currentContinueContext = { type: ControlFlow.Continue, allowAmbientBreak: true, label, parent, signal: undefined };
            const result = f();
            currentContinueContext = parent;
            return result;
        }
        function startIterationContext<T>(label: Label, f: () => T) {
            return startBreakContext(label, /* allowAmbientBreak */ true, () => startContinueContext(label, f));
        }
        //#endregion
        return transformSourceFile(node);

        function transformSourceFile(node: SourceFile) {
            if (node.isDeclarationFile) return node;
            return visitEachChild(node, visitor, context);
        }

        function visitor(node: Node): VisitResult<Node> {
            if (isFunctionLikeDeclaration(node)) return transformFunctionLikeDeclaration(node);
            if (isIterationStatement(node, false)) return transformIterationStatement(node);
            if (isClassLike(node)) return transformClassLike(node);

            switch (node.kind) {
                case SyntaxKind.DoExpression:
                    if ((node as DoExpression).async) {
                        return transformDoExpression(node as DoExpression);
                    }
                    return visitEachChild(node, visitor, context);
                case SyntaxKind.LabeledStatement:
                    return transformLabelledStatement(node as LabeledStatement);
                case SyntaxKind.ReturnStatement:
                case SyntaxKind.BreakStatement:
                case SyntaxKind.ContinueStatement:
                    return transformControlFlow(node as ReturnStatement | BreakStatement | ContinueStatement);
                default:
                    return visitEachChild(node, visitor, context);
            }
        }
        function transformFunctionLikeDeclaration<T extends FunctionLikeDeclaration>(node: T): Node {
            return startControlFlowContext(() => {
                return visitEachChild(node, child => {
                    if (child === node.body) {
                        return visitBody(node.body);
                    }
                    return visitor(child);
                }, context);
            });
            function visitBody(child: ConciseBody): ConciseBody {
                let nextBody = visitEachChild(child, visitor, context);
                if (currentReturnContext) {
                    // if (signal == currentReturnContext.signal) return operand
                    nextBody = wrapBlockToHandleSignal(nextBody, [currentReturnContext], (signal) => [
                        factory.createIfStatement(
                            factory.createEquality(signal, currentReturnContext!.signal),
                            factory.createReturnStatement(currentReturnContext!.value),
                        )
                    ]);
                }
                return nextBody;
            }
        }
        function transformIterationStatement<T extends IterationStatement>(node: T): Node {
            const label = isLabeledStatement(node.parent) ? node.parent.label : undefined;
            return startIterationContext(label, () => {
                return visitEachChild(node, child => {
                    if (child === node.statement) return visitStatement(node.statement);
                    return visitor(child);
                }, context);
            });
            function visitStatement(node: Statement) {
                let nextNode = visitEachChild(node, visitor, context);
                const controlFlow = [currentBreakContext, currentContinueContext].filter(nonNullable).filter(x => x.signal);
                if (controlFlow.length){
                    nextNode = wrapBlockToHandleSignal(isBlock(nextNode) ? nextNode : factory.createBlock([nextNode]), controlFlow, createSignalHandler);
                }
                return nextNode;
            }
            // if (signal === currentContinueContext.signal) continue currentContinueContext.label;
            function createSignalHandler(signal: Identifier): readonly Statement[] {
                const result: Statement[] = [];
                if (currentBreakContext?.signal) {
                    result.push(factory.createIfStatement(
                        factory.createEquality(signal, currentBreakContext.signal),
                        factory.createBreakStatement(),
                    ));
                }
                if (currentContinueContext?.signal) {
                    result.push(factory.createIfStatement(
                        factory.createEquality(signal, currentContinueContext.signal),
                        factory.createContinueStatement(),
                    ));
                }
                return result;
            }
        }
        function transformClassLike<T extends ClassExpression | ClassDeclaration>(node: T): T {
            return startControlFlowContext(() => visitEachChild(node, visitor, context));
        }
        function transformLabelledStatement(node: LabeledStatement): Node {
            if (isIterationStatement(node.statement, false)) return visitEachChild(node, visitor, context);
            return startBreakContext(node.label, /** allowAmbientBreak */ false, () => visitEachChild(node, child => {
                if (child === node.statement) {
                    let nextChild = visitEachChild(child, visitor, context);
                    const signal = currentBreakContext?.signal;
                    if (signal) {
                        if (!isStatement(nextChild)) Debug.fail();
                        nextChild = wrapBlockToHandleSignal(isBlock(nextChild) ? nextChild : factory.createBlock([nextChild]), [currentBreakContext!], signal => [
                            factory.createIfStatement(
                                factory.createEquality(signal, signal),
                                factory.createBreakStatement(currentBreakContext!.label),
                            )
                        ]);
                    }
                    return nextChild;
                }
                return child;
            }, context));
        }
        // function transformSwitch() {}

        function transformControlFlow(node: ReturnStatement | ContinueStatement | BreakStatement) {
            if (isReturnStatement(node)) {
                let shouldTransform = false;
                {
                    let current = node.parent;
                    while (current) {
                        if (current.kind === SyntaxKind.DoExpression) shouldTransform = true;
                        if (isClassLike(current)) {
                            shouldTransform = false;
                            break;
                        }
                        if (isFunctionLike(current)) break;
                        current = current.parent;
                    }
                }
                if (!shouldTransform) return visitEachChild(node, visitor, context);
                if (!currentReturnContext) {
                    currentReturnContext = { type: ControlFlow.Return, signal: factory.createTempVariable(noop), value: factory.createTempVariable(noop) };
                }
                const setReturnValue = node.expression && factory.createBinaryExpression(currentReturnContext.value, factory.createToken(SyntaxKind.EqualsToken), visitEachChild(node.expression, visitor, context));
                return factory.createThrowStatement(
                    setReturnValue ? factory.createCommaListExpression([setReturnValue, currentReturnContext.signal]) : currentReturnContext.signal
                );
            }
            else {
                let shouldTransform = false;
                check: {
                    if (node.kind === SyntaxKind.BreakStatement && !currentBreakContext) break check;
                    if (node.kind === SyntaxKind.ContinueStatement && !currentContinueContext) break check;

                    let current = node.parent;
                    while (current) {
                        if (current.kind === SyntaxKind.DoExpression) {
                            shouldTransform = true;
                            break;
                        }
                        current = current.parent;
                    }
                }
                if (!shouldTransform) return visitEachChild(node, visitor, context);
                const findJumpContext = (label: Identifier | undefined, context: BreakContinueContext | undefined) => {
                    while (context) {
                        if (!label && context.allowAmbientBreak && node.kind === SyntaxKind.BreakStatement) return context;
                        if (label?.escapedText === context.label?.escapedText) return context;
                        context = context.parent;
                    }
                    return undefined;
                };
                const jump = findJumpContext(node.label, node.kind === SyntaxKind.BreakStatement ? currentBreakContext : currentContinueContext);
                if (!jump) return visitEachChild(node, visitor, context);
                return factory.createThrowStatement(jump.signal ??= factory.createTempVariable(noop))
            }
        }

        /**
         * ```js
         * { Block }
         * ```
         *
         * ==== transformed to ====
         *
         * ```js
         * {
         *  var signal = {}, operand
         *  try { Block }
         *  catch(e) {
         *      if (e === signal) return operand
         *      throw e
         *  }
         * }
         * ```
         */
        function wrapBlockToHandleSignal(node: ConciseBody, hoists: (ReturnContext | BreakContinueContext)[], handler: (signal: Identifier) => readonly Statement[]) {
            const catch_e = factory.createTempVariable(() => {});
            return factory.createBlock([
                // var signal = {}, operand
                factory.createVariableStatement(/** modifiers */ undefined, factory.createVariableDeclarationList(
                    flatMap(hoists, x => {
                        if (!x.signal) Debug.fail();
                        const signal = factory.createVariableDeclaration(x.signal, /** ! */ undefined, /** type */ undefined, factory.createObjectLiteralExpression());
                        if (x.type === ControlFlow.Return) {
                            return [signal, factory.createVariableDeclaration(x.value)];
                        }
                        else {
                            return [signal];
                        }
                    })
                )),
                factory.createTryStatement(
                    factory.converters.convertToFunctionBlock(node),
                    factory.createCatchClause(factory.createVariableDeclaration(catch_e), factory.createBlock([
                        ...handler(catch_e),
                        factory.createThrowStatement(catch_e),
                    ])),
                    /** finallyBlock */ undefined
                )
            ]);
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
