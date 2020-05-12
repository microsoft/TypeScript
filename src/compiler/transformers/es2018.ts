/*@internal*/
namespace ts {
    const enum ESNextSubstitutionFlags {
        /** Enables substitutions for async methods with `super` calls. */
        AsyncMethodsWithSuper = 1 << 0
    }

    // Facts we track as we traverse the tree
    const enum HierarchyFacts {
        None = 0,

        //
        // Ancestor facts
        //

        HasLexicalThis = 1 << 0,
        IterationContainer = 1 << 1,
        // NOTE: do not add more ancestor flags without also updating AncestorFactsMask below.

        //
        // Ancestor masks
        //

        AncestorFactsMask = (IterationContainer << 1) - 1,

        SourceFileIncludes = HasLexicalThis,
        SourceFileExcludes = IterationContainer,
        StrictModeSourceFileIncludes = None,

        ClassOrFunctionIncludes = HasLexicalThis,
        ClassOrFunctionExcludes = IterationContainer,

        ArrowFunctionIncludes = None,
        ArrowFunctionExcludes = ClassOrFunctionExcludes,

        IterationStatementIncludes = IterationContainer,
        IterationStatementExcludes = None,
    }

    export function transformES2018(context: TransformationContext) {
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

        let exportedVariableStatement = false;
        let enabledSubstitutions: ESNextSubstitutionFlags;
        let enclosingFunctionFlags: FunctionFlags;
        let enclosingSuperContainerFlags: NodeCheckFlags = 0;
        let hierarchyFacts: HierarchyFacts = 0;

        let currentSourceFile: SourceFile;
        let taggedTemplateStringDeclarations: VariableDeclaration[];

        /** Keeps track of property names accessed on super (`super.x`) within async functions. */
        let capturedSuperProperties: UnderscoreEscapedMap<true>;
        /** Whether the async function contains an element access on super (`super[x]`). */
        let hasSuperElementAccess: boolean;
        /** A set of node IDs for generated super accessors. */
        const substitutedSuperAccessors: boolean[] = [];

        return chainBundle(transformSourceFile);

        function affectsSubtree(excludeFacts: HierarchyFacts, includeFacts: HierarchyFacts) {
            return hierarchyFacts !== (hierarchyFacts & ~excludeFacts | includeFacts);
        }

        /**
         * Sets the `HierarchyFacts` for this node prior to visiting this node's subtree, returning the facts set prior to modification.
         * @param excludeFacts The existing `HierarchyFacts` to reset before visiting the subtree.
         * @param includeFacts The new `HierarchyFacts` to set before visiting the subtree.
         */
        function enterSubtree(excludeFacts: HierarchyFacts, includeFacts: HierarchyFacts) {
            const ancestorFacts = hierarchyFacts;
            hierarchyFacts = (hierarchyFacts & ~excludeFacts | includeFacts) & HierarchyFacts.AncestorFactsMask;
            return ancestorFacts;
        }

        /**
         * Restores the `HierarchyFacts` for this node's ancestor after visiting this node's
         * subtree.
         * @param ancestorFacts The `HierarchyFacts` of the ancestor to restore after visiting the subtree.
         */
        function exitSubtree(ancestorFacts: HierarchyFacts) {
            hierarchyFacts = ancestorFacts;
        }

        function recordTaggedTemplateString(temp: Identifier) {
            taggedTemplateStringDeclarations = append(
                taggedTemplateStringDeclarations,
                createVariableDeclaration(temp));
        }

        function transformSourceFile(node: SourceFile) {
            if (node.isDeclarationFile) {
                return node;
            }

            currentSourceFile = node;
            const visited = visitSourceFile(node);
            addEmitHelpers(visited, context.readEmitHelpers());

            currentSourceFile = undefined!;
            taggedTemplateStringDeclarations = undefined!;
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

        function doWithHierarchyFacts<T, U>(cb: (value: T) => U, value: T, excludeFacts: HierarchyFacts, includeFacts: HierarchyFacts) {
            if (affectsSubtree(excludeFacts, includeFacts)) {
                const ancestorFacts = enterSubtree(excludeFacts, includeFacts);
                const result = cb(value);
                exitSubtree(ancestorFacts);
                return result;
            }
            return cb(value);
        }

        function visitDefault(node: Node): VisitResult<Node> {
            return visitEachChild(node, visitor, context);
        }

        function visitorWorker(node: Node, noDestructuringValue: boolean): VisitResult<Node> {
            if ((node.transformFlags & TransformFlags.ContainsES2018) === 0) {
                return node;
            }
            switch (node.kind) {
                case SyntaxKind.AwaitExpression:
                    return visitAwaitExpression(node as AwaitExpression);
                case SyntaxKind.YieldExpression:
                    return visitYieldExpression(node as YieldExpression);
                case SyntaxKind.ReturnStatement:
                    return visitReturnStatement(node as ReturnStatement);
                case SyntaxKind.LabeledStatement:
                    return visitLabeledStatement(node as LabeledStatement);
                case SyntaxKind.ObjectLiteralExpression:
                    return visitObjectLiteralExpression(node as ObjectLiteralExpression);
                case SyntaxKind.BinaryExpression:
                    return visitBinaryExpression(node as BinaryExpression, noDestructuringValue);
                case SyntaxKind.CatchClause:
                    return visitCatchClause(node as CatchClause);
                case SyntaxKind.VariableStatement:
                    return visitVariableStatement(node as VariableStatement);
                case SyntaxKind.VariableDeclaration:
                    return visitVariableDeclaration(node as VariableDeclaration);
                case SyntaxKind.DoStatement:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.ForInStatement:
                    return doWithHierarchyFacts(
                        visitDefault,
                        node,
                        HierarchyFacts.IterationStatementExcludes,
                        HierarchyFacts.IterationStatementIncludes);
                case SyntaxKind.ForOfStatement:
                    return visitForOfStatement(node as ForOfStatement, /*outermostLabeledStatement*/ undefined);
                case SyntaxKind.ForStatement:
                    return doWithHierarchyFacts(
                        visitForStatement,
                        node as ForStatement,
                        HierarchyFacts.IterationStatementExcludes,
                        HierarchyFacts.IterationStatementIncludes);
                case SyntaxKind.VoidExpression:
                    return visitVoidExpression(node as VoidExpression);
                case SyntaxKind.Constructor:
                    return doWithHierarchyFacts(
                        visitConstructorDeclaration,
                        node as ConstructorDeclaration,
                        HierarchyFacts.ClassOrFunctionExcludes,
                        HierarchyFacts.ClassOrFunctionIncludes);
                case SyntaxKind.MethodDeclaration:
                    return doWithHierarchyFacts(
                        visitMethodDeclaration,
                        node as MethodDeclaration,
                        HierarchyFacts.ClassOrFunctionExcludes,
                        HierarchyFacts.ClassOrFunctionIncludes);
                case SyntaxKind.GetAccessor:
                    return doWithHierarchyFacts(
                        visitGetAccessorDeclaration,
                        node as GetAccessorDeclaration,
                        HierarchyFacts.ClassOrFunctionExcludes,
                        HierarchyFacts.ClassOrFunctionIncludes);
                case SyntaxKind.SetAccessor:
                    return doWithHierarchyFacts(
                        visitSetAccessorDeclaration,
                        node as SetAccessorDeclaration,
                        HierarchyFacts.ClassOrFunctionExcludes,
                        HierarchyFacts.ClassOrFunctionIncludes);
                case SyntaxKind.FunctionDeclaration:
                    return doWithHierarchyFacts(
                        visitFunctionDeclaration,
                        node as FunctionDeclaration,
                        HierarchyFacts.ClassOrFunctionExcludes,
                        HierarchyFacts.ClassOrFunctionIncludes);
                case SyntaxKind.FunctionExpression:
                    return doWithHierarchyFacts(
                        visitFunctionExpression,
                        node as FunctionExpression,
                        HierarchyFacts.ClassOrFunctionExcludes,
                        HierarchyFacts.ClassOrFunctionIncludes);
                case SyntaxKind.ArrowFunction:
                    return doWithHierarchyFacts(
                        visitArrowFunction,
                        node as ArrowFunction,
                        HierarchyFacts.ArrowFunctionExcludes,
                        HierarchyFacts.ArrowFunctionIncludes);
                case SyntaxKind.Parameter:
                    return visitParameter(node as ParameterDeclaration);
                case SyntaxKind.ExpressionStatement:
                    return visitExpressionStatement(node as ExpressionStatement);
                case SyntaxKind.ParenthesizedExpression:
                    return visitParenthesizedExpression(node as ParenthesizedExpression, noDestructuringValue);
                case SyntaxKind.TaggedTemplateExpression:
                    return visitTaggedTemplateExpression(node as TaggedTemplateExpression);
                case SyntaxKind.PropertyAccessExpression:
                    if (capturedSuperProperties && isPropertyAccessExpression(node) && node.expression.kind === SyntaxKind.SuperKeyword) {
                        capturedSuperProperties.set(node.name.escapedText, true);
                    }
                    return visitEachChild(node, visitor, context);
                case SyntaxKind.ElementAccessExpression:
                    if (capturedSuperProperties && (<ElementAccessExpression>node).expression.kind === SyntaxKind.SuperKeyword) {
                        hasSuperElementAccess = true;
                    }
                    return visitEachChild(node, visitor, context);
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.ClassExpression:
                    return doWithHierarchyFacts(
                        visitDefault,
                        node,
                        HierarchyFacts.ClassOrFunctionExcludes,
                        HierarchyFacts.ClassOrFunctionIncludes);
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

        function visitReturnStatement(node: ReturnStatement) {
            if (enclosingFunctionFlags & FunctionFlags.Async && enclosingFunctionFlags & FunctionFlags.Generator) {
                return updateReturn(node, createDownlevelAwait(
                    node.expression ? visitNode(node.expression, visitor, isExpression) : createVoidZero()
                ));
            }

            return visitEachChild(node, visitor, context);
        }

        function visitLabeledStatement(node: LabeledStatement) {
            if (enclosingFunctionFlags & FunctionFlags.Async) {
                const statement = unwrapInnermostStatementOfLabel(node);
                if (statement.kind === SyntaxKind.ForOfStatement && (<ForOfStatement>statement).awaitModifier) {
                    return visitForOfStatement(<ForOfStatement>statement, node);
                }
                return restoreEnclosingLabel(visitNode(statement, visitor, isStatement, liftToBlock), node);
            }
            return visitEachChild(node, visitor, context);
        }

        function chunkObjectLiteralElements(elements: readonly ObjectLiteralElementLike[]): Expression[] {
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
            if (node.transformFlags & TransformFlags.ContainsObjectRestOrSpread) {
                // spread elements emit like so:
                // non-spread elements are chunked together into object literals, and then all are passed to __assign:
                //     { a, ...o, b } => __assign(__assign({a}, o), {b});
                // If the first element is a spread element, then the first argument to __assign is {}:
                //     { ...o, a, b, ...o2 } => __assign(__assign(__assign({}, o), {a, b}), o2)
                //
                // We cannot call __assign with more than two elements, since any element could cause side effects. For
                // example:
                //      var k = { a: 1, b: 2 };
                //      var o = { a: 3, ...k, b: k.a++ };
                //      // expected: { a: 1, b: 1 }
                // If we translate the above to `__assign({ a: 3 }, k, { b: k.a++ })`, the `k.a++` will evaluate before
                // `k` is spread and we end up with `{ a: 2, b: 1 }`.
                //
                // This also occurs for spread elements, not just property assignments:
                //      var k = { a: 1, get b() { l = { z: 9 }; return 2; } };
                //      var l = { c: 3 };
                //      var o = { ...k, ...l };
                //      // expected: { a: 1, b: 2, z: 9 }
                // If we translate the above to `__assign({}, k, l)`, the `l` will evaluate before `k` is spread and we
                // end up with `{ a: 1, b: 2, c: 3 }`
                const objects = chunkObjectLiteralElements(node.properties);
                if (objects.length && objects[0].kind !== SyntaxKind.ObjectLiteralExpression) {
                    objects.unshift(createObjectLiteral());
                }
                let expression: Expression = objects[0];
                if (objects.length > 1) {
                    for (let i = 1; i < objects.length; i++) {
                        expression = createAssignHelper(context, [expression, objects[i]]);
                    }
                    return expression;
                }
                else {
                    return createAssignHelper(context, objects);
                }
            }
            return visitEachChild(node, visitor, context);
        }

        function visitExpressionStatement(node: ExpressionStatement): ExpressionStatement {
            return visitEachChild(node, visitorNoDestructuringValue, context);
        }

        function visitParenthesizedExpression(node: ParenthesizedExpression, noDestructuringValue: boolean): ParenthesizedExpression {
            return visitEachChild(node, noDestructuringValue ? visitorNoDestructuringValue : visitor, context);
        }

        function visitSourceFile(node: SourceFile): SourceFile {
            const ancestorFacts = enterSubtree(
                HierarchyFacts.SourceFileExcludes,
                isEffectiveStrictModeSourceFile(node, compilerOptions) ?
                    HierarchyFacts.StrictModeSourceFileIncludes :
                    HierarchyFacts.SourceFileIncludes);
            exportedVariableStatement = false;
            const visited = visitEachChild(node, visitor, context);
            const statement = concatenate(visited.statements, taggedTemplateStringDeclarations && [
                createVariableStatement(/*modifiers*/ undefined,
                    createVariableDeclarationList(taggedTemplateStringDeclarations))
            ]);
            const result = updateSourceFileNode(visited, setTextRange(createNodeArray(statement), node.statements));
            exitSubtree(ancestorFacts);
            return result;
        }

        function visitTaggedTemplateExpression(node: TaggedTemplateExpression) {
            return processTaggedTemplateExpression(
                context,
                node,
                visitor,
                currentSourceFile,
                recordTaggedTemplateString,
                ProcessLevel.LiftRestriction
            );
        }

        /**
         * Visits a BinaryExpression that contains a destructuring assignment.
         *
         * @param node A BinaryExpression node.
         */
        function visitBinaryExpression(node: BinaryExpression, noDestructuringValue: boolean): Expression {
            if (isDestructuringAssignment(node) && node.left.transformFlags & TransformFlags.ContainsObjectRestOrSpread) {
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

        function visitCatchClause(node: CatchClause) {
            if (node.variableDeclaration &&
                isBindingPattern(node.variableDeclaration.name) &&
                node.variableDeclaration.name.transformFlags & TransformFlags.ContainsObjectRestOrSpread) {
                const name = getGeneratedNameForNode(node.variableDeclaration.name);
                const updatedDecl = updateVariableDeclaration(node.variableDeclaration, node.variableDeclaration.name, /*type*/ undefined, name);
                const visitedBindings = flattenDestructuringBinding(updatedDecl, visitor, context, FlattenLevel.ObjectRest);
                let block = visitNode(node.block, visitor, isBlock);
                if (some(visitedBindings)) {
                    block = updateBlock(block, [
                        createVariableStatement(/*modifiers*/ undefined, visitedBindings),
                        ...block.statements,
                    ]);
                }
                return updateCatchClause(
                    node,
                    updateVariableDeclaration(node.variableDeclaration, name, /*type*/ undefined, /*initializer*/ undefined),
                    block);
            }
            return visitEachChild(node, visitor, context);
        }

        function visitVariableStatement(node: VariableStatement): VisitResult<VariableStatement> {
            if (hasSyntacticModifier(node, ModifierFlags.Export)) {
                const savedExportedVariableStatement = exportedVariableStatement;
                exportedVariableStatement = true;
                const visited = visitEachChild(node, visitor, context);
                exportedVariableStatement = savedExportedVariableStatement;
                return visited;
            }
            return visitEachChild(node, visitor, context);
        }

        /**
         * Visits a VariableDeclaration node with a binding pattern.
         *
         * @param node A VariableDeclaration node.
         */
        function visitVariableDeclaration(node: VariableDeclaration): VisitResult<VariableDeclaration> {
            if (exportedVariableStatement) {
                const savedExportedVariableStatement = exportedVariableStatement;
                exportedVariableStatement = false;
                const visited = visitVariableDeclarationWorker(node, /*exportedVariableStatement*/ true);
                exportedVariableStatement = savedExportedVariableStatement;
                return visited;
            }
            return visitVariableDeclarationWorker(node, /*exportedVariableStatement*/ false);
        }

        function visitVariableDeclarationWorker(node: VariableDeclaration, exportedVariableStatement: boolean): VisitResult<VariableDeclaration> {
            // If we are here it is because the name contains a binding pattern with a rest somewhere in it.
            if (isBindingPattern(node.name) && node.name.transformFlags & TransformFlags.ContainsObjectRestOrSpread) {
                return flattenDestructuringBinding(
                    node,
                    visitor,
                    context,
                    FlattenLevel.ObjectRest,
                    /*rval*/ undefined,
                    exportedVariableStatement
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
        function visitForOfStatement(node: ForOfStatement, outermostLabeledStatement: LabeledStatement | undefined): VisitResult<Statement> {
            const ancestorFacts = enterSubtree(HierarchyFacts.IterationStatementExcludes, HierarchyFacts.IterationStatementIncludes);
            if (node.initializer.transformFlags & TransformFlags.ContainsObjectRestOrSpread) {
                node = transformForOfStatementWithObjectRest(node);
            }
            const result = node.awaitModifier ?
                transformForAwaitOfStatement(node, outermostLabeledStatement, ancestorFacts) :
                restoreEnclosingLabel(visitEachChild(node, visitor, context), outermostLabeledStatement);
            exitSubtree(ancestorFacts);
            return result;
        }

        function transformForOfStatementWithObjectRest(node: ForOfStatement) {
            const initializerWithoutParens = skipParentheses(node.initializer) as ForInitializer;
            if (isVariableDeclarationList(initializerWithoutParens) || isAssignmentPattern(initializerWithoutParens)) {
                let bodyLocation: TextRange | undefined;
                let statementsLocation: TextRange | undefined;
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

            let bodyLocation: TextRange | undefined;
            let statementsLocation: TextRange | undefined;
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

        function transformForAwaitOfStatement(node: ForOfStatement, outermostLabeledStatement: LabeledStatement | undefined, ancestorFacts: HierarchyFacts) {
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

            // if we are enclosed in an outer loop ensure we reset 'errorRecord' per each iteration
            const initializer = ancestorFacts & HierarchyFacts.IterationContainer ?
                inlineExpressions([createAssignment(errorRecord, createVoidZero()), callValues]) :
                callValues;

            const forStatement = setEmitFlags(
                setTextRange(
                    createFor(
                        /*initializer*/ setEmitFlags(
                            setTextRange(
                                createVariableDeclarationList([
                                    setTextRange(createVariableDeclaration(iterator, /*type*/ undefined, initializer), node.expression),
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
                        /*statement*/ convertForOfStatementHead(node, getValue)
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
                            createExpressionStatement(
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
                                    createExpressionStatement(createDownlevelAwait(callReturn))
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
            if (node.transformFlags & TransformFlags.ContainsObjectRestOrSpread) {
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
                visitNode<Token<SyntaxKind.QuestionToken>>(/*questionToken*/ undefined, visitor, isToken),
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
            const statementOffset = addPrologue(statements, node.body!.statements, /*ensureUseStrict*/ false, visitor);
            appendObjectRestAssignmentsIfNeeded(statements, node);

            const savedCapturedSuperProperties = capturedSuperProperties;
            const savedHasSuperElementAccess = hasSuperElementAccess;
            capturedSuperProperties = createUnderscoreEscapedMap<true>();
            hasSuperElementAccess = false;

            const returnStatement = createReturn(
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
                            node.body!,
                            visitLexicalEnvironment(node.body!.statements, visitor, context, statementOffset)
                        )
                    ),
                    !!(hierarchyFacts & HierarchyFacts.HasLexicalThis)
                )
            );

            // Minor optimization, emit `_super` helper to capture `super` access in an arrow.
            // This step isn't needed if we eventually transform this to ES5.
            const emitSuperHelpers = languageVersion >= ScriptTarget.ES2015 && resolver.getNodeCheckFlags(node) & (NodeCheckFlags.AsyncMethodWithSuperBinding | NodeCheckFlags.AsyncMethodWithSuper);

            if (emitSuperHelpers) {
                enableSubstitutionForAsyncMethodsWithSuper();
                const variableStatement = createSuperAccessVariableStatement(resolver, node, capturedSuperProperties);
                substitutedSuperAccessors[getNodeId(variableStatement)] = true;
                insertStatementsAfterStandardPrologue(statements, [variableStatement]);
            }

            statements.push(returnStatement);

            insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());
            const block = updateBlock(node.body!, statements);

            if (emitSuperHelpers && hasSuperElementAccess) {
                if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.AsyncMethodWithSuperBinding) {
                    addEmitHelper(block, advancedAsyncSuperHelper);
                }
                else if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.AsyncMethodWithSuper) {
                    addEmitHelper(block, asyncSuperHelper);
                }
            }

            capturedSuperProperties = savedCapturedSuperProperties;
            hasSuperElementAccess = savedHasSuperElementAccess;

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
                insertStatementsAfterStandardPrologue(statements, leadingStatements);
                addRange(statements, block.statements.slice(statementOffset));
                return updateBlock(block, setTextRange(createNodeArray(statements), block.statements));
            }
            return body;
        }

        function appendObjectRestAssignmentsIfNeeded(statements: Statement[] | undefined, node: FunctionLikeDeclaration): Statement[] | undefined {
            for (const parameter of node.parameters) {
                if (parameter.transformFlags & TransformFlags.ContainsObjectRestOrSpread) {
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
                // We need to be notified when entering the generated accessor arrow functions.
                context.enableEmitNotification(SyntaxKind.VariableStatement);
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
            // Disable substitution in the generated super accessor itself.
            else if (enabledSubstitutions && substitutedSuperAccessors[getNodeId(node)]) {
                const savedEnclosingSuperContainerFlags = enclosingSuperContainerFlags;
                enclosingSuperContainerFlags = 0 as NodeCheckFlags;
                previousOnEmitNode(hint, node, emitCallback);
                enclosingSuperContainerFlags = savedEnclosingSuperContainerFlags;
                return;
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
                return setTextRange(
                    createPropertyAccess(
                        createFileLevelUniqueName("_super"),
                        node.name),
                    node
                );
            }
            return node;
        }

        function substituteElementAccessExpression(node: ElementAccessExpression) {
            if (node.expression.kind === SyntaxKind.SuperKeyword) {
                return createSuperElementAccessInAsyncMethod(
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

        function createSuperElementAccessInAsyncMethod(argumentExpression: Expression, location: TextRange): LeftHandSideExpression {
            if (enclosingSuperContainerFlags & NodeCheckFlags.AsyncMethodWithSuperBinding) {
                return setTextRange(
                    createPropertyAccess(
                        createCall(
                            createIdentifier("_superIndex"),
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
                        createIdentifier("_superIndex"),
                        /*typeArguments*/ undefined,
                        [argumentExpression]
                    ),
                    location
                );
            }
        }
    }

    export const assignHelper: UnscopedEmitHelper = {
        name: "typescript:assign",
        importName: "__assign",
        scoped: false,
        priority: 1,
        text: `
            var __assign = (this && this.__assign) || function () {
                __assign = Object.assign || function(t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                        s = arguments[i];
                        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                            t[p] = s[p];
                    }
                    return t;
                };
                return __assign.apply(this, arguments);
            };`
    };

    export function createAssignHelper(context: TransformationContext, attributesSegments: Expression[]) {
        if (context.getCompilerOptions().target! >= ScriptTarget.ES2015) {
            return createCall(createPropertyAccess(createIdentifier("Object"), "assign"), /*typeArguments*/ undefined, attributesSegments);
        }
        context.requestEmitHelper(assignHelper);
        return createCall(
            getUnscopedHelperName("__assign"),
            /*typeArguments*/ undefined,
            attributesSegments
        );
    }

    export const awaitHelper: UnscopedEmitHelper = {
        name: "typescript:await",
        importName: "__await",
        scoped: false,
        text: `
            var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }`
    };

    function createAwaitHelper(context: TransformationContext, expression: Expression) {
        context.requestEmitHelper(awaitHelper);
        return createCall(getUnscopedHelperName("__await"), /*typeArguments*/ undefined, [expression]);
    }

    export const asyncGeneratorHelper: UnscopedEmitHelper = {
        name: "typescript:asyncGenerator",
        importName: "__asyncGenerator",
        scoped: false,
        dependencies: [awaitHelper],
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

    function createAsyncGeneratorHelper(context: TransformationContext, generatorFunc: FunctionExpression, hasLexicalThis: boolean) {
        context.requestEmitHelper(asyncGeneratorHelper);

        // Mark this node as originally an async function
        (generatorFunc.emitNode || (generatorFunc.emitNode = {} as EmitNode)).flags |= EmitFlags.AsyncFunctionBody | EmitFlags.ReuseTempVariableScope;

        return createCall(
            getUnscopedHelperName("__asyncGenerator"),
            /*typeArguments*/ undefined,
            [
                hasLexicalThis ? createThis() : createVoidZero(),
                createIdentifier("arguments"),
                generatorFunc
            ]
        );
    }

    export const asyncDelegator: UnscopedEmitHelper = {
        name: "typescript:asyncDelegator",
        importName: "__asyncDelegator",
        scoped: false,
        dependencies: [awaitHelper],
        text: `
            var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
                var i, p;
                return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
                function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
            };`
    };

    function createAsyncDelegatorHelper(context: TransformationContext, expression: Expression, location?: TextRange) {
        context.requestEmitHelper(asyncDelegator);
        return setTextRange(
            createCall(
                getUnscopedHelperName("__asyncDelegator"),
                /*typeArguments*/ undefined,
                [expression]
            ),
            location
        );
    }

    export const asyncValues: UnscopedEmitHelper = {
        name: "typescript:asyncValues",
        importName: "__asyncValues",
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
                getUnscopedHelperName("__asyncValues"),
                /*typeArguments*/ undefined,
                [expression]
            ),
            location
        );
    }
}
