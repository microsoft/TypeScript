/*@internal*/
namespace ts {
    const enum ESNextSubstitutionFlags {
        /** Enables substitutions for async methods with `super` calls. */
        AsyncMethodsWithSuper = 1 << 0
    }

    export function transformESNext(context: TransformationContext) {
        const {
            resumeLexicalEnvironment,
            endLexicalEnvironment,
            hoistVariableDeclaration
        } = context;

        const resolver = context.getEmitResolver();
        const compilerOptions = context.getCompilerOptions();
        const languageVersion = getEmitScriptTarget(compilerOptions);

        const previousOnEmitNode = context.onEmitNode;
        context.onEmitNode = onEmitNode;

        const previousOnSubstituteNode = context.onSubstituteNode;
        context.onSubstituteNode = onSubstituteNode;

        let enabledSubstitutions: ESNextSubstitutionFlags;
        let enclosingFunctionFlags: FunctionFlags;
        let enclosingSuperContainerFlags: NodeCheckFlags = 0;

        return chainBundle(transformSourceFile);

        function transformSourceFile(node: SourceFile) {
            if (node.isDeclarationFile) {
                return node;
            }

            const visited = visitEachChild(node, visitor, context);
            addEmitHelpers(visited, context.readEmitHelpers());
            return visited;
        }

        function visitor(node: Node): VisitResult<Node> {
            return visitorWorker(node, /*noDestructuringValue*/ false);
        }

        function visitorNoDestructuringValue(node: Node): VisitResult<Node> {
            return visitorWorker(node, /*noDestructuringValue*/ true);
        }

        function visitorNoAsyncModifier(node: Node): VisitResult<Node> {
            if (node.kind === SyntaxKind.AsyncKeyword) {
                return undefined;
            }
            return node;
        }

        function visitorWorker(node: Node, noDestructuringValue: boolean): VisitResult<Node> {
            if ((node.transformFlags & TransformFlags.ContainsESNext) === 0) {
                return node;
            }

            switch (node.kind) {
                case SyntaxKind.AwaitExpression:
                    return visitAwaitExpression(node as AwaitExpression);
                case SyntaxKind.YieldExpression:
                    return visitYieldExpression(node as YieldExpression);
                case SyntaxKind.LabeledStatement:
                    return visitLabeledStatement(node as LabeledStatement);
                case SyntaxKind.ObjectLiteralExpression:
                    return visitObjectLiteralExpression(node as ObjectLiteralExpression);
                case SyntaxKind.BinaryExpression:
                    return visitBinaryExpression(node as BinaryExpression, noDestructuringValue);
                case SyntaxKind.VariableDeclaration:
                    return visitVariableDeclaration(node as VariableDeclaration);
                case SyntaxKind.ForOfStatement:
                    return visitForOfStatement(node as ForOfStatement, /*outermostLabeledStatement*/ undefined);
                case SyntaxKind.ForStatement:
                    return visitForStatement(node as ForStatement);
                case SyntaxKind.VoidExpression:
                    return visitVoidExpression(node as VoidExpression);
                case SyntaxKind.Constructor:
                    return visitConstructorDeclaration(node as ConstructorDeclaration);
                case SyntaxKind.MethodDeclaration:
                    return visitMethodDeclaration(node as MethodDeclaration);
                case SyntaxKind.GetAccessor:
                    return visitGetAccessorDeclaration(node as GetAccessorDeclaration);
                case SyntaxKind.SetAccessor:
                    return visitSetAccessorDeclaration(node as SetAccessorDeclaration);
                case SyntaxKind.FunctionDeclaration:
                    return visitFunctionDeclaration(node as FunctionDeclaration);
                case SyntaxKind.FunctionExpression:
                    return visitFunctionExpression(node as FunctionExpression);
                case SyntaxKind.ArrowFunction:
                    return visitArrowFunction(node as ArrowFunction);
                case SyntaxKind.Parameter:
                    return visitParameter(node as ParameterDeclaration);
                case SyntaxKind.ExpressionStatement:
                    return visitExpressionStatement(node as ExpressionStatement);
                case SyntaxKind.ParenthesizedExpression:
                    return visitParenthesizedExpression(node as ParenthesizedExpression, noDestructuringValue);
                case SyntaxKind.CatchClause:
                    return visitCatchClause(node as CatchClause);
                default:
                    return visitEachChild(node, visitor, context);
            }
        }

        function visitAwaitExpression(node: AwaitExpression): Expression {
            if (enclosingFunctionFlags & FunctionFlags.Async && enclosingFunctionFlags & FunctionFlags.Generator) {
                return setOriginalNode(
                    setTextRange(
                        createYield(createAwaitHelper(context, visitNode(node.expression, visitor, isExpression))),
                        /*location*/ node
                    ),
                    node
                );
            }
            return visitEachChild(node, visitor, context);
        }

        function visitYieldExpression(node: YieldExpression) {
            if (enclosingFunctionFlags & FunctionFlags.Async && enclosingFunctionFlags & FunctionFlags.Generator) {
                if (node.asteriskToken) {
                    const expression = visitNode(node.expression, visitor, isExpression);

                    return setOriginalNode(
                        setTextRange(
                            createYield(
                                createAwaitHelper(context,
                                    updateYield(
                                        node,
                                        node.asteriskToken,
                                        createAsyncDelegatorHelper(
                                            context,
                                            createAsyncValuesHelper(context, expression, expression),
                                            expression
                                        )
                                    )
                                )
                            ),
                            node
                        ),
                        node
                    );
                }

                return setOriginalNode(
                    setTextRange(
                        createYield(
                            createDownlevelAwait(
                                node.expression
                                    ? visitNode(node.expression, visitor, isExpression)
                                    : createVoidZero()
                            )
                        ),
                        node
                    ),
                    node
                );
            }

            return visitEachChild(node, visitor, context);
        }

        function visitLabeledStatement(node: LabeledStatement) {
            if (enclosingFunctionFlags & FunctionFlags.Async) {
                const statement = unwrapInnermostStatementOfLabel(node);
                if (statement.kind === SyntaxKind.ForOfStatement && (<ForOfStatement>statement).awaitModifier) {
                    return visitForOfStatement(<ForOfStatement>statement, node);
                }
                return restoreEnclosingLabel(visitEachChild(statement, visitor, context), node);
            }
            return visitEachChild(node, visitor, context);
        }

        function chunkObjectLiteralElements(elements: ReadonlyArray<ObjectLiteralElementLike>): Expression[] {
            let chunkObject: ObjectLiteralElementLike[] | undefined;
            const objects: Expression[] = [];
            for (const e of elements) {
                if (e.kind === SyntaxKind.SpreadAssignment) {
                    if (chunkObject) {
                        objects.push(createObjectLiteral(chunkObject));
                        chunkObject = undefined;
                    }
                    const target = e.expression;
                    objects.push(visitNode(target, visitor, isExpression));
                }
                else {
                    chunkObject = append(chunkObject, e.kind === SyntaxKind.PropertyAssignment
                        ? createPropertyAssignment(e.name, visitNode(e.initializer, visitor, isExpression))
                        : visitNode(e, visitor, isObjectLiteralElementLike));
                }
            }
            if (chunkObject) {
                objects.push(createObjectLiteral(chunkObject));
            }

            return objects;
        }

        function visitObjectLiteralExpression(node: ObjectLiteralExpression): Expression {
            if (node.transformFlags & TransformFlags.ContainsObjectSpread) {
                // spread elements emit like so:
                // non-spread elements are chunked together into object literals, and then all are passed to __assign:
                //     { a, ...o, b } => __assign({a}, o, {b});
                // If the first element is a spread element, then the first argument to __assign is {}:
                //     { ...o, a, b, ...o2 } => __assign({}, o, {a, b}, o2)
                const objects = chunkObjectLiteralElements(node.properties);
                if (objects.length && objects[0].kind !== SyntaxKind.ObjectLiteralExpression) {
                    objects.unshift(createObjectLiteral());
                }
                return createAssignHelper(context, objects);
            }
            return visitEachChild(node, visitor, context);
        }

        function visitExpressionStatement(node: ExpressionStatement): ExpressionStatement {
            return visitEachChild(node, visitorNoDestructuringValue, context);
        }

        function visitParenthesizedExpression(node: ParenthesizedExpression, noDestructuringValue: boolean): ParenthesizedExpression {
            return visitEachChild(node, noDestructuringValue ? visitorNoDestructuringValue : visitor, context);
        }

        function visitCatchClause(node: CatchClause): CatchClause {
            if (!node.variableDeclaration) {
                return updateCatchClause(
                    node,
                    createVariableDeclaration(createTempVariable(/*recordTempVariable*/ undefined)),
                    visitNode(node.block, visitor, isBlock)
                );
            }
            return visitEachChild(node, visitor, context);
        }

        /**
         * Visits a BinaryExpression that contains a destructuring assignment.
         *
         * @param node A BinaryExpression node.
         */
        function visitBinaryExpression(node: BinaryExpression, noDestructuringValue: boolean): Expression {
            if (isDestructuringAssignment(node) && node.left.transformFlags & TransformFlags.ContainsObjectRest) {
                return flattenDestructuringAssignment(
                    node,
                    visitor,
                    context,
                    FlattenLevel.ObjectRest,
                    !noDestructuringValue
                );
            }
            else if (node.operatorToken.kind === SyntaxKind.CommaToken) {
                return updateBinary(
                    node,
                    visitNode(node.left, visitorNoDestructuringValue, isExpression),
                    visitNode(node.right, noDestructuringValue ? visitorNoDestructuringValue : visitor, isExpression)
                );
            }
            return visitEachChild(node, visitor, context);
        }

        /**
         * Visits a VariableDeclaration node with a binding pattern.
         *
         * @param node A VariableDeclaration node.
         */
        function visitVariableDeclaration(node: VariableDeclaration): VisitResult<VariableDeclaration> {
            // If we are here it is because the name contains a binding pattern with a rest somewhere in it.
            if (isBindingPattern(node.name) && node.name.transformFlags & TransformFlags.ContainsObjectRest) {
                return flattenDestructuringBinding(
                    node,
                    visitor,
                    context,
                    FlattenLevel.ObjectRest
                );
            }
            return visitEachChild(node, visitor, context);
        }

        function visitForStatement(node: ForStatement): VisitResult<Statement> {
            return updateFor(
                node,
                visitNode(node.initializer, visitorNoDestructuringValue, isForInitializer),
                visitNode(node.condition, visitor, isExpression),
                visitNode(node.incrementor, visitor, isExpression),
                visitNode(node.statement, visitor, isStatement)
            );
        }

        function visitVoidExpression(node: VoidExpression) {
            return visitEachChild(node, visitorNoDestructuringValue, context);
        }

        /**
         * Visits a ForOfStatement and converts it into a ES2015-compatible ForOfStatement.
         *
         * @param node A ForOfStatement.
         */
        function visitForOfStatement(node: ForOfStatement, outermostLabeledStatement: LabeledStatement): VisitResult<Statement> {
            if (node.initializer.transformFlags & TransformFlags.ContainsObjectRest) {
                node = transformForOfStatementWithObjectRest(node);
            }
            if (node.awaitModifier) {
                return transformForAwaitOfStatement(node, outermostLabeledStatement);
            }
            else {
                return restoreEnclosingLabel(visitEachChild(node, visitor, context), outermostLabeledStatement);
            }
        }

        function transformForOfStatementWithObjectRest(node: ForOfStatement) {
            const initializerWithoutParens = skipParentheses(node.initializer) as ForInitializer;
            if (isVariableDeclarationList(initializerWithoutParens) || isAssignmentPattern(initializerWithoutParens)) {
                let bodyLocation: TextRange;
                let statementsLocation: TextRange;
                const temp = createTempVariable(/*recordTempVariable*/ undefined);
                const statements: Statement[] = [createForOfBindingStatement(initializerWithoutParens, temp)];
                if (isBlock(node.statement)) {
                    addRange(statements, node.statement.statements);
                    bodyLocation = node.statement;
                    statementsLocation = node.statement.statements;
                }
                else if (node.statement) {
                    append(statements, node.statement);
                    bodyLocation = node.statement;
                    statementsLocation = node.statement;
                }
                return updateForOf(
                    node,
                    node.awaitModifier,
                    setTextRange(
                        createVariableDeclarationList(
                            [
                                setTextRange(createVariableDeclaration(temp), node.initializer)
                            ],
                            NodeFlags.Let
                        ),
                        node.initializer
                    ),
                    node.expression,
                    setTextRange(
                        createBlock(
                            setTextRange(createNodeArray(statements), statementsLocation),
                            /*multiLine*/ true
                        ),
                        bodyLocation
                    )
                );
            }
            return node;
        }

        function convertForOfStatementHead(node: ForOfStatement, boundValue: Expression) {
            const binding = createForOfBindingStatement(node.initializer, boundValue);

            let bodyLocation: TextRange;
            let statementsLocation: TextRange;
            const statements: Statement[] = [visitNode(binding, visitor, isStatement)];
            const statement = visitNode(node.statement, visitor, isStatement);
            if (isBlock(statement)) {
                addRange(statements, statement.statements);
                bodyLocation = statement;
                statementsLocation = statement.statements;
            }
            else {
                statements.push(statement);
            }

            return setEmitFlags(
                setTextRange(
                    createBlock(
                        setTextRange(createNodeArray(statements), statementsLocation),
                        /*multiLine*/ true
                    ),
                    bodyLocation
                ),
                EmitFlags.NoSourceMap | EmitFlags.NoTokenSourceMaps
            );
        }

        function createDownlevelAwait(expression: Expression) {
            return enclosingFunctionFlags & FunctionFlags.Generator
                ? createYield(/*asteriskToken*/ undefined, createAwaitHelper(context, expression))
                : createAwait(expression);
        }

        function transformForAwaitOfStatement(node: ForOfStatement, outermostLabeledStatement: LabeledStatement) {
            const expression = visitNode(node.expression, visitor, isExpression);
            const iterator = isIdentifier(expression) ? getGeneratedNameForNode(expression) : createTempVariable(/*recordTempVariable*/ undefined);
            const result = isIdentifier(expression) ? getGeneratedNameForNode(iterator) : createTempVariable(/*recordTempVariable*/ undefined);
            const errorRecord = createUniqueName("e");
            const catchVariable = getGeneratedNameForNode(errorRecord);
            const returnMethod = createTempVariable(/*recordTempVariable*/ undefined);
            const callValues = createAsyncValuesHelper(context, expression, /*location*/ node.expression);
            const callNext = createCall(createPropertyAccess(iterator, "next"), /*typeArguments*/ undefined, []);
            const getDone = createPropertyAccess(result, "done");
            const getValue = createPropertyAccess(result, "value");
            const callReturn = createFunctionCall(returnMethod, iterator, []);

            hoistVariableDeclaration(errorRecord);
            hoistVariableDeclaration(returnMethod);

            const forStatement = setEmitFlags(
                setTextRange(
                    createFor(
                        /*initializer*/ setEmitFlags(
                            setTextRange(
                                createVariableDeclarationList([
                                    setTextRange(createVariableDeclaration(iterator, /*type*/ undefined, callValues), node.expression),
                                    createVariableDeclaration(result)
                                ]),
                                node.expression
                            ),
                            EmitFlags.NoHoisting
                        ),
                        /*condition*/ createComma(
                            createAssignment(result, createDownlevelAwait(callNext)),
                            createLogicalNot(getDone)
                        ),
                        /*incrementor*/ undefined,
                        /*statement*/ convertForOfStatementHead(node, createDownlevelAwait(getValue))
                    ),
                    /*location*/ node
                ),
                EmitFlags.NoTokenTrailingSourceMaps
            );

            return createTry(
                createBlock([
                    restoreEnclosingLabel(
                        forStatement,
                        outermostLabeledStatement
                    )
                ]),
                createCatchClause(
                    createVariableDeclaration(catchVariable),
                    setEmitFlags(
                        createBlock([
                            createStatement(
                                createAssignment(
                                    errorRecord,
                                    createObjectLiteral([
                                        createPropertyAssignment("error", catchVariable)
                                    ])
                                )
                            )
                        ]),
                        EmitFlags.SingleLine
                    )
                ),
                createBlock([
                    createTry(
                        /*tryBlock*/ createBlock([
                            setEmitFlags(
                                createIf(
                                    createLogicalAnd(
                                        createLogicalAnd(
                                            result,
                                            createLogicalNot(getDone)
                                        ),
                                        createAssignment(
                                            returnMethod,
                                            createPropertyAccess(iterator, "return")
                                        )
                                    ),
                                    createStatement(createDownlevelAwait(callReturn))
                                ),
                                EmitFlags.SingleLine
                            )
                        ]),
                        /*catchClause*/ undefined,
                        /*finallyBlock*/ setEmitFlags(
                            createBlock([
                                setEmitFlags(
                                    createIf(
                                        errorRecord,
                                        createThrow(
                                            createPropertyAccess(errorRecord, "error")
                                        )
                                    ),
                                    EmitFlags.SingleLine
                                )
                            ]),
                            EmitFlags.SingleLine
                        )
                    )
                ])
            );
        }

        function visitParameter(node: ParameterDeclaration): ParameterDeclaration {
            if (node.transformFlags & TransformFlags.ContainsObjectRest) {
                // Binding patterns are converted into a generated name and are
                // evaluated inside the function body.
                return updateParameter(
                    node,
                    /*decorators*/ undefined,
                    /*modifiers*/ undefined,
                    node.dotDotDotToken,
                    getGeneratedNameForNode(node),
                    /*questionToken*/ undefined,
                    /*type*/ undefined,
                    visitNode(node.initializer, visitor, isExpression)
                );
            }
            return visitEachChild(node, visitor, context);
        }

        function visitConstructorDeclaration(node: ConstructorDeclaration) {
            const savedEnclosingFunctionFlags = enclosingFunctionFlags;
            enclosingFunctionFlags = FunctionFlags.Normal;
            const updated = updateConstructor(
                node,
                /*decorators*/ undefined,
                node.modifiers,
                visitParameterList(node.parameters, visitor, context),
                transformFunctionBody(node)
            );
            enclosingFunctionFlags = savedEnclosingFunctionFlags;
            return updated;
        }

        function visitGetAccessorDeclaration(node: GetAccessorDeclaration) {
            const savedEnclosingFunctionFlags = enclosingFunctionFlags;
            enclosingFunctionFlags = FunctionFlags.Normal;
            const updated = updateGetAccessor(
                node,
                /*decorators*/ undefined,
                node.modifiers,
                visitNode(node.name, visitor, isPropertyName),
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                transformFunctionBody(node)
            );
            enclosingFunctionFlags = savedEnclosingFunctionFlags;
            return updated;
        }

        function visitSetAccessorDeclaration(node: SetAccessorDeclaration) {
            const savedEnclosingFunctionFlags = enclosingFunctionFlags;
            enclosingFunctionFlags = FunctionFlags.Normal;
            const updated = updateSetAccessor(
                node,
                /*decorators*/ undefined,
                node.modifiers,
                visitNode(node.name, visitor, isPropertyName),
                visitParameterList(node.parameters, visitor, context),
                transformFunctionBody(node)
            );
            enclosingFunctionFlags = savedEnclosingFunctionFlags;
            return updated;
        }

        function visitMethodDeclaration(node: MethodDeclaration) {
            const savedEnclosingFunctionFlags = enclosingFunctionFlags;
            enclosingFunctionFlags = getFunctionFlags(node);
            const updated = updateMethod(
                node,
                /*decorators*/ undefined,
                enclosingFunctionFlags & FunctionFlags.Generator
                    ? visitNodes(node.modifiers, visitorNoAsyncModifier, isModifier)
                    : node.modifiers,
                enclosingFunctionFlags & FunctionFlags.Async
                    ? undefined
                    : node.asteriskToken,
                visitNode(node.name, visitor, isPropertyName),
                visitNode(/*questionToken*/ undefined, visitor, isToken),
                /*typeParameters*/ undefined,
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                enclosingFunctionFlags & FunctionFlags.Async && enclosingFunctionFlags & FunctionFlags.Generator
                    ? transformAsyncGeneratorFunctionBody(node)
                    : transformFunctionBody(node)
            );
            enclosingFunctionFlags = savedEnclosingFunctionFlags;
            return updated;
        }

        function visitFunctionDeclaration(node: FunctionDeclaration) {
            const savedEnclosingFunctionFlags = enclosingFunctionFlags;
            enclosingFunctionFlags = getFunctionFlags(node);
            const updated = updateFunctionDeclaration(
                node,
                /*decorators*/ undefined,
                enclosingFunctionFlags & FunctionFlags.Generator
                    ? visitNodes(node.modifiers, visitorNoAsyncModifier, isModifier)
                    : node.modifiers,
                enclosingFunctionFlags & FunctionFlags.Async
                    ? undefined
                    : node.asteriskToken,
                node.name,
                /*typeParameters*/ undefined,
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                enclosingFunctionFlags & FunctionFlags.Async && enclosingFunctionFlags & FunctionFlags.Generator
                    ? transformAsyncGeneratorFunctionBody(node)
                    : transformFunctionBody(node)
            );
            enclosingFunctionFlags = savedEnclosingFunctionFlags;
            return updated;
        }

        function visitArrowFunction(node: ArrowFunction) {
            const savedEnclosingFunctionFlags = enclosingFunctionFlags;
            enclosingFunctionFlags = getFunctionFlags(node);
            const updated = updateArrowFunction(
                node,
                node.modifiers,
                /*typeParameters*/ undefined,
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                node.equalsGreaterThanToken,
                transformFunctionBody(node),
            );
            enclosingFunctionFlags = savedEnclosingFunctionFlags;
            return updated;
        }

        function visitFunctionExpression(node: FunctionExpression) {
            const savedEnclosingFunctionFlags = enclosingFunctionFlags;
            enclosingFunctionFlags = getFunctionFlags(node);
            const updated = updateFunctionExpression(
                node,
                enclosingFunctionFlags & FunctionFlags.Generator
                    ? visitNodes(node.modifiers, visitorNoAsyncModifier, isModifier)
                    : node.modifiers,
                enclosingFunctionFlags & FunctionFlags.Async
                    ? undefined
                    : node.asteriskToken,
                node.name,
                /*typeParameters*/ undefined,
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                enclosingFunctionFlags & FunctionFlags.Async && enclosingFunctionFlags & FunctionFlags.Generator
                    ? transformAsyncGeneratorFunctionBody(node)
                    : transformFunctionBody(node)
            );
            enclosingFunctionFlags = savedEnclosingFunctionFlags;
            return updated;
        }

        function transformAsyncGeneratorFunctionBody(node: MethodDeclaration | AccessorDeclaration | FunctionDeclaration | FunctionExpression): FunctionBody {
            resumeLexicalEnvironment();
            const statements: Statement[] = [];
            const statementOffset = addPrologue(statements, node.body.statements, /*ensureUseStrict*/ false, visitor);
            appendObjectRestAssignmentsIfNeeded(statements, node);

            statements.push(
                createReturn(
                    createAsyncGeneratorHelper(
                        context,
                        createFunctionExpression(
                            /*modifiers*/ undefined,
                            createToken(SyntaxKind.AsteriskToken),
                            node.name && getGeneratedNameForNode(node.name),
                            /*typeParameters*/ undefined,
                            /*parameters*/ [],
                            /*type*/ undefined,
                            updateBlock(
                                node.body,
                                visitLexicalEnvironment(node.body.statements, visitor, context, statementOffset)
                            )
                        )
                    )
                )
            );

            prependRange(statements, endLexicalEnvironment());
            const block = updateBlock(node.body, statements);

            // Minor optimization, emit `_super` helper to capture `super` access in an arrow.
            // This step isn't needed if we eventually transform this to ES5.
            if (languageVersion >= ScriptTarget.ES2015) {
                if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.AsyncMethodWithSuperBinding) {
                    enableSubstitutionForAsyncMethodsWithSuper();
                    addEmitHelper(block, advancedAsyncSuperHelper);
                }
                else if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.AsyncMethodWithSuper) {
                    enableSubstitutionForAsyncMethodsWithSuper();
                    addEmitHelper(block, asyncSuperHelper);
                }
            }
            return block;
        }

        function transformFunctionBody(node: FunctionDeclaration | FunctionExpression | ConstructorDeclaration | MethodDeclaration | AccessorDeclaration): FunctionBody;
        function transformFunctionBody(node: ArrowFunction): ConciseBody;
        function transformFunctionBody(node: FunctionLikeDeclaration): ConciseBody {
            resumeLexicalEnvironment();
            let statementOffset = 0;
            const statements: Statement[] = [];
            const body = visitNode(node.body, visitor, isConciseBody);
            if (isBlock(body)) {
                statementOffset = addPrologue(statements, body.statements, /*ensureUseStrict*/ false, visitor);
            }
            addRange(statements, appendObjectRestAssignmentsIfNeeded(/*statements*/ undefined, node));
            const leadingStatements = endLexicalEnvironment();
            if (statementOffset > 0 || some(statements) || some(leadingStatements)) {
                const block = convertToFunctionBody(body, /*multiLine*/ true);
                prependRange(statements, leadingStatements);
                addRange(statements, block.statements.slice(statementOffset));
                return updateBlock(block, setTextRange(createNodeArray(statements), block.statements));
            }
            return body;
        }

        function appendObjectRestAssignmentsIfNeeded(statements: Statement[], node: FunctionLikeDeclaration): Statement[] {
            for (const parameter of node.parameters) {
                if (parameter.transformFlags & TransformFlags.ContainsObjectRest) {
                    const temp = getGeneratedNameForNode(parameter);
                    const declarations = flattenDestructuringBinding(
                        parameter,
                        visitor,
                        context,
                        FlattenLevel.ObjectRest,
                        temp,
                        /*doNotRecordTempVariablesInLine*/ false,
                        /*skipInitializer*/ true,
                    );
                    if (some(declarations)) {
                        const statement = createVariableStatement(
                            /*modifiers*/ undefined,
                            createVariableDeclarationList(
                                declarations
                            )
                        );
                        setEmitFlags(statement, EmitFlags.CustomPrologue);
                        statements = append(statements, statement);
                    }
                }
            }
            return statements;
        }

        function enableSubstitutionForAsyncMethodsWithSuper() {
            if ((enabledSubstitutions & ESNextSubstitutionFlags.AsyncMethodsWithSuper) === 0) {
                enabledSubstitutions |= ESNextSubstitutionFlags.AsyncMethodsWithSuper;

                // We need to enable substitutions for call, property access, and element access
                // if we need to rewrite super calls.
                context.enableSubstitution(SyntaxKind.CallExpression);
                context.enableSubstitution(SyntaxKind.PropertyAccessExpression);
                context.enableSubstitution(SyntaxKind.ElementAccessExpression);

                // We need to be notified when entering and exiting declarations that bind super.
                context.enableEmitNotification(SyntaxKind.ClassDeclaration);
                context.enableEmitNotification(SyntaxKind.MethodDeclaration);
                context.enableEmitNotification(SyntaxKind.GetAccessor);
                context.enableEmitNotification(SyntaxKind.SetAccessor);
                context.enableEmitNotification(SyntaxKind.Constructor);
            }
        }

        /**
         * Called by the printer just before a node is printed.
         *
         * @param hint A hint as to the intended usage of the node.
         * @param node The node to be printed.
         * @param emitCallback The callback used to emit the node.
         */
        function onEmitNode(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void) {
            // If we need to support substitutions for `super` in an async method,
            // we should track it here.
            if (enabledSubstitutions & ESNextSubstitutionFlags.AsyncMethodsWithSuper && isSuperContainer(node)) {
                const superContainerFlags = resolver.getNodeCheckFlags(node) & (NodeCheckFlags.AsyncMethodWithSuper | NodeCheckFlags.AsyncMethodWithSuperBinding);
                if (superContainerFlags !== enclosingSuperContainerFlags) {
                    const savedEnclosingSuperContainerFlags = enclosingSuperContainerFlags;
                    enclosingSuperContainerFlags = superContainerFlags;
                    previousOnEmitNode(hint, node, emitCallback);
                    enclosingSuperContainerFlags = savedEnclosingSuperContainerFlags;
                    return;
                }
            }

            previousOnEmitNode(hint, node, emitCallback);
        }

        /**
         * Hooks node substitutions.
         *
         * @param hint The context for the emitter.
         * @param node The node to substitute.
         */
        function onSubstituteNode(hint: EmitHint, node: Node) {
            node = previousOnSubstituteNode(hint, node);
            if (hint === EmitHint.Expression && enclosingSuperContainerFlags) {
                return substituteExpression(<Expression>node);
            }
            return node;
        }

        function substituteExpression(node: Expression) {
            switch (node.kind) {
                case SyntaxKind.PropertyAccessExpression:
                    return substitutePropertyAccessExpression(<PropertyAccessExpression>node);
                case SyntaxKind.ElementAccessExpression:
                    return substituteElementAccessExpression(<ElementAccessExpression>node);
                case SyntaxKind.CallExpression:
                    return substituteCallExpression(<CallExpression>node);
            }
            return node;
        }

        function substitutePropertyAccessExpression(node: PropertyAccessExpression) {
            if (node.expression.kind === SyntaxKind.SuperKeyword) {
                return createSuperAccessInAsyncMethod(
                    createLiteral(idText(node.name)),
                    node
                );
            }
            return node;
        }

        function substituteElementAccessExpression(node: ElementAccessExpression) {
            if (node.expression.kind === SyntaxKind.SuperKeyword) {
                return createSuperAccessInAsyncMethod(
                    node.argumentExpression,
                    node
                );
            }
            return node;
        }

        function substituteCallExpression(node: CallExpression): Expression {
            const expression = node.expression;
            if (isSuperProperty(expression)) {
                const argumentExpression = isPropertyAccessExpression(expression)
                    ? substitutePropertyAccessExpression(expression)
                    : substituteElementAccessExpression(expression);
                return createCall(
                    createPropertyAccess(argumentExpression, "call"),
                    /*typeArguments*/ undefined,
                    [
                        createThis(),
                        ...node.arguments
                    ]
                );
            }
            return node;
        }

        function isSuperContainer(node: Node) {
            const kind = node.kind;
            return kind === SyntaxKind.ClassDeclaration
                || kind === SyntaxKind.Constructor
                || kind === SyntaxKind.MethodDeclaration
                || kind === SyntaxKind.GetAccessor
                || kind === SyntaxKind.SetAccessor;
        }

        function createSuperAccessInAsyncMethod(argumentExpression: Expression, location: TextRange): LeftHandSideExpression {
            if (enclosingSuperContainerFlags & NodeCheckFlags.AsyncMethodWithSuperBinding) {
                return setTextRange(
                    createPropertyAccess(
                        createCall(
                            createIdentifier("_super"),
                            /*typeArguments*/ undefined,
                            [argumentExpression]
                        ),
                        "value"
                    ),
                    location
                );
            }
            else {
                return setTextRange(
                    createCall(
                        createIdentifier("_super"),
                        /*typeArguments*/ undefined,
                        [argumentExpression]
                    ),
                    location
                );
            }
        }
    }

    const assignHelper: EmitHelper = {
        name: "typescript:assign",
        scoped: false,
        priority: 1,
        text: `
            var __assign = (this && this.__assign) || Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
                }
                return t;
            };`
    };

    export function createAssignHelper(context: TransformationContext, attributesSegments: Expression[]) {
        if (context.getCompilerOptions().target >= ScriptTarget.ES2015) {
            return createCall(createPropertyAccess(createIdentifier("Object"), "assign"),
                              /*typeArguments*/ undefined,
                              attributesSegments);
        }
        context.requestEmitHelper(assignHelper);
        return createCall(
            getHelperName("__assign"),
            /*typeArguments*/ undefined,
            attributesSegments
        );
    }

    const awaitHelper: EmitHelper = {
        name: "typescript:await",
        scoped: false,
        text: `
            var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }`
    };

    function createAwaitHelper(context: TransformationContext, expression: Expression) {
        context.requestEmitHelper(awaitHelper);
        return createCall(getHelperName("__await"), /*typeArguments*/ undefined, [expression]);
    }

    const asyncGeneratorHelper: EmitHelper = {
        name: "typescript:asyncGenerator",
        scoped: false,
        text: `
            var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
                if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                var g = generator.apply(thisArg, _arguments || []), i, q = [];
                return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
                function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
                function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
                function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
                function fulfill(value) { resume("next", value); }
                function reject(value) { resume("throw", value); }
                function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
            };`
    };

    function createAsyncGeneratorHelper(context: TransformationContext, generatorFunc: FunctionExpression) {
        context.requestEmitHelper(awaitHelper);
        context.requestEmitHelper(asyncGeneratorHelper);

        // Mark this node as originally an async function
        (generatorFunc.emitNode || (generatorFunc.emitNode = {})).flags |= EmitFlags.AsyncFunctionBody;

        return createCall(
            getHelperName("__asyncGenerator"),
            /*typeArguments*/ undefined,
            [
                createThis(),
                createIdentifier("arguments"),
                generatorFunc
            ]
        );
    }

    const asyncDelegator: EmitHelper = {
        name: "typescript:asyncDelegator",
        scoped: false,
        text: `
            var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
                var i, p;
                return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
                function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
            };`
    };

    function createAsyncDelegatorHelper(context: TransformationContext, expression: Expression, location?: TextRange) {
        context.requestEmitHelper(awaitHelper);
        context.requestEmitHelper(asyncDelegator);
        return setTextRange(
            createCall(
                getHelperName("__asyncDelegator"),
                /*typeArguments*/ undefined,
                [expression]
            ),
            location
        );
    }

    const asyncValues: EmitHelper = {
        name: "typescript:asyncValues",
        scoped: false,
        text: `
            var __asyncValues = (this && this.__asyncValues) || function (o) {
                if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                var m = o[Symbol.asyncIterator], i;
                return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
                function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
                function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
            };`
    };

    function createAsyncValuesHelper(context: TransformationContext, expression: Expression, location?: TextRange) {
        context.requestEmitHelper(asyncValues);
        return setTextRange(
            createCall(
                getHelperName("__asyncValues"),
                /*typeArguments*/ undefined,
                [expression]
            ),
            location
        );
    }
}
