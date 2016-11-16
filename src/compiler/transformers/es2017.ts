/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />

/*@internal*/
namespace ts {
    type SuperContainer = ClassDeclaration | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | ConstructorDeclaration;

    const enum ES2017SubstitutionFlags {
        /** Enables substitutions for async methods with `super` calls. */
        AsyncMethodsWithSuper = 1 << 0
    }

    export function transformES2017(context: TransformationContext) {
        const {
            startLexicalEnvironment,
            resumeLexicalEnvironment,
            endLexicalEnvironment,
            hoistVariableDeclaration
        } = context;

        const resolver = context.getEmitResolver();
        const compilerOptions = context.getCompilerOptions();
        const languageVersion = getEmitScriptTarget(compilerOptions);

        // These variables contain state that changes as we descend into the tree.
        let currentSourceFile: SourceFile;

        /**
         * Keeps track of whether expression substitution has been enabled for specific edge cases.
         * They are persisted between each SourceFile transformation and should not be reset.
         */
        let enabledSubstitutions: ES2017SubstitutionFlags;

        /**
         * This keeps track of containers where `super` is valid, for use with
         * just-in-time substitution for `super` expressions inside of async methods.
         */
        let currentSuperContainer: SuperContainer;
        let enclosingFunctionFlags: FunctionFlags;

        // Save the previous transformation hooks.
        const previousOnEmitNode = context.onEmitNode;
        const previousOnSubstituteNode = context.onSubstituteNode;

        // Set new transformation hooks.
        context.onEmitNode = onEmitNode;
        context.onSubstituteNode = onSubstituteNode;

        return transformSourceFile;

        function transformSourceFile(node: SourceFile) {
            if (isDeclarationFile(node)) {
                return node;
            }

            currentSourceFile = node;

            const visited = visitEachChild(node, visitor, context);
            addEmitHelpers(visited, context.readEmitHelpers());

            currentSourceFile = undefined;
            return visited;
        }

        function visitor(node: Node): VisitResult<Node> {
            if ((node.transformFlags & TransformFlags.ContainsES2017) === 0) {
                return node;
            }

            switch (node.kind) {
                case SyntaxKind.AsyncKeyword:
                    // ES2017 async modifier should be elided for targets < ES2017
                    return undefined;

                case SyntaxKind.AwaitExpression:
                    // ES2017 'await' expressions must be transformed for targets < ES2017.
                    return visitAwaitExpression(<AwaitExpression>node);
                case SyntaxKind.YieldExpression:
                    // ES2017 'yield' expressions in an async generator must be transformed
                    // for targets < ES2017.
                    return visitYieldExpression(<YieldExpression>node);

                case SyntaxKind.LabeledStatement:
                    return visitLabeledStatement(<LabeledStatement>node);

                case SyntaxKind.ForOfStatement:
                    // ES2017 'for-await-of' statements must be transformed for targets <
                    // ES2017.
                    return visitForOfStatement(<ForOfStatement>node, /*enclosingLabeledStatements*/ undefined);

                case SyntaxKind.MethodDeclaration:
                    // ES2017 method declarations may be 'async'
                    return visitMethodDeclaration(<MethodDeclaration>node);

                case SyntaxKind.FunctionDeclaration:
                    // ES2017 function declarations may be 'async'
                    return visitFunctionDeclaration(<FunctionDeclaration>node);

                case SyntaxKind.FunctionExpression:
                    // ES2017 function expressions may be 'async'
                    return visitFunctionExpression(<FunctionExpression>node);

                case SyntaxKind.ArrowFunction:
                    // ES2017 arrow functions may be 'async'
                    return visitArrowFunction(<ArrowFunction>node);

                case SyntaxKind.Constructor:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetKeyword:
                    const savedEnclosingFunctionFlags = enclosingFunctionFlags;
                    enclosingFunctionFlags = getFunctionFlags(<FunctionLikeDeclaration>node);
                    const visited = visitEachChild(node, visitor, context);
                    enclosingFunctionFlags = savedEnclosingFunctionFlags;
                    return visited;

                default:
                    return visitEachChild(node, visitor, context);
            }
        }

        /**
         * Visits an AwaitExpression node.
         *
         * This function will be called any time a ES2017 await expression is encountered.
         *
         * @param node The node to visit.
         */
        function visitAwaitExpression(node: AwaitExpression): Expression {
            const expression = visitNode(node.expression, visitor, isExpression);
            return setOriginalNode(
                createYield(
                    /*asteriskToken*/ undefined,
                    enclosingFunctionFlags & FunctionFlags.Generator ?
                        createArrayLiteral([createLiteral("await"), expression]) :
                        expression,
                    /*location*/ node
                ),
                node
            );
        }

        function visitYieldExpression(node: YieldExpression): Expression {
            const expression = visitNode(node.expression, visitor, isExpression);
            return updateYield(
                node,
                enclosingFunctionFlags & FunctionFlags.Async ?
                    node.asteriskToken ?
                        createAsyncDelegatorHelper(context, expression, expression) :
                        createArrayLiteral([createLiteral("yield"), expression]) :
                    expression
            );
        }

        function visitLabeledStatement(node: LabeledStatement): VisitResult<Statement> {
            const enclosedStatement = getEnclosedStatement(node);
            if (enclosedStatement.statement.kind === SyntaxKind.ForOfStatement &&
                (<ForOfStatement>enclosedStatement.statement).awaitKeyword) {
                return visitForOfStatement(<ForOfStatement>node.statement, enclosedStatement.enclosingLabeledStatements);
            }

            return restoreEnclosingLabels(visitEachChild(node, visitor, context), enclosedStatement.enclosingLabeledStatements);
        }

        function visitForOfStatement(node: ForOfStatement, enclosingLabeledStatements: LabeledStatement[]): VisitResult<Statement> {
            if (!node.awaitKeyword) return visitEachChild(node, visitor, context);

            let bodyLocation: TextRange;
            let statementsLocation: TextRange;
            const iteratorRecord = isIdentifier(node.expression)
                ? getGeneratedNameForNode(node.expression)
                : createUniqueName("iterator");

            const expression = visitNode(node.expression, visitor, isExpression);
            const statements: Statement[] = [];
            const binding = createForOfBindingStatement(
                node.initializer,
                createPropertyAccess(
                    createPropertyAccess(iteratorRecord, "result"),
                    "value"
                )
            );
            statements.push(visitNode(binding, visitor, isStatement));
            const statement = visitNode(node.statement, visitor, isStatement);
            if (isBlock(statement)) {
                addRange(statements, statement.statements);
                bodyLocation = statement;
                statementsLocation = statement.statements;
            }
            else {
                statements.push(statement);
            }

            const step = createAsyncStepHelper(
                context,
                iteratorRecord,
                node.initializer
            );

            let outerStatement: Statement = setEmitFlags(
                createFor(
                    createVariableDeclarationList(
                        [
                            createVariableDeclaration(
                                iteratorRecord,
                                /*type*/ undefined,
                                createObjectLiteral(
                                    [
                                        createPropertyAssignment(
                                            "iterator",
                                            createAsyncValuesHelper(
                                                context,
                                                expression,
                                                node.expression
                                            ),
                                            node.expression
                                        )
                                    ],
                                    node.expression
                                ),
                                node.expression
                            )
                        ],
                        node.expression
                    ),
                    /*condition*/ createYield(
                        /*asteriskToken*/ undefined,
                        enclosingFunctionFlags & FunctionFlags.Generator ?
                            createArrayLiteral([createLiteral("await"), step]) :
                            step,
                        node.initializer
                    ),
                    /*incrementor*/ undefined,
                    setEmitFlags(
                        createBlock(
                            createNodeArray(statements, statementsLocation),
                            bodyLocation,
                            /*multiLine*/ true
                        ),
                        EmitFlags.NoSourceMap | EmitFlags.NoTokenSourceMaps
                    ),
                    /*location*/ node
                ),
                EmitFlags.NoTokenTrailingSourceMaps
            );

            outerStatement = restoreEnclosingLabels(outerStatement, enclosingLabeledStatements);
            return closeAsyncIterator(outerStatement, iteratorRecord);
        }

        function closeAsyncIterator(statement: Statement, iteratorRecord: Expression) {
            const errorRecord = createUniqueName("e");
            hoistVariableDeclaration(errorRecord);
            const catchVariable = getGeneratedNameForNode(errorRecord);
            const close = createCloseHelper(
                context,
                iteratorRecord
            );
            return createTry(
                createBlock([
                    statement
                ]),
                createCatchClause(catchVariable,
                    setEmitFlags(
                        createBlock([
                            createStatement(
                                createAssignment(
                                    errorRecord,
                                    createObjectLiteral([
                                        createPropertyAssignment(
                                            "error",
                                            catchVariable
                                        )
                                    ])
                                )
                            )
                        ]),
                        EmitFlags.SingleLine
                    )
                ),
                createBlock([
                    setEmitFlags(
                        createTry(
                            setEmitFlags(
                                createBlock([
                                    createStatement(
                                        createYield(
                                            /*asteriskToken*/ undefined,
                                            enclosingFunctionFlags & FunctionFlags.Generator ?
                                                createArrayLiteral([createLiteral("await"), close]) :
                                                close
                                        )
                                    )
                                ]),
                                EmitFlags.SingleLine
                            ),
                            undefined,
                            setEmitFlags(
                                createBlock([
                                    setEmitFlags(
                                        createIf(
                                            errorRecord,
                                            createThrow(
                                                createPropertyAccess(
                                                    errorRecord,
                                                    "error"
                                                )
                                            )
                                        ),
                                        EmitFlags.SingleLine
                                    )
                                ]),
                                EmitFlags.SingleLine
                            )
                        ),
                        EmitFlags.SingleLine
                    )
                ])
            );
        }

        /**
         * Visits a MethodDeclaration node.
         *
         * This function will be called when one of the following conditions are met:
         * - The node is marked as async
         *
         * @param node The node to visit.
         */
        function visitMethodDeclaration(node: MethodDeclaration) {
            const savedEnclosingFunctionFlags = enclosingFunctionFlags;
            enclosingFunctionFlags = getFunctionFlags(node);
            const updated = updateMethod(
                node,
                /*decorators*/ undefined,
                visitNodes(node.modifiers, visitor, isModifier),
                enclosingFunctionFlags & FunctionFlags.Async ? undefined : node.asteriskToken,
                node.name,
                /*typeParameters*/ undefined,
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                enclosingFunctionFlags & FunctionFlags.Async ?
                    enclosingFunctionFlags & FunctionFlags.Generator ?
                        transformAsyncGeneratorFunctionBody(node) :
                        transformAsyncFunctionBody(node) :
                    visitFunctionBody(node.body, visitor, context)
            );
            enclosingFunctionFlags = savedEnclosingFunctionFlags;
            return updated;
        }

        /**
         * Visits a FunctionDeclaration node.
         *
         * This function will be called when one of the following conditions are met:
         * - The node is marked async
         *
         * @param node The node to visit.
         */
        function visitFunctionDeclaration(node: FunctionDeclaration): VisitResult<Statement> {
            const savedEnclosingFunctionFlags = enclosingFunctionFlags;
            enclosingFunctionFlags = getFunctionFlags(node);
            const updated = updateFunctionDeclaration(
                node,
                /*decorators*/ undefined,
                visitNodes(node.modifiers, visitor, isModifier),
                enclosingFunctionFlags & FunctionFlags.Async ? undefined : node.asteriskToken,
                node.name,
                /*typeParameters*/ undefined,
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                enclosingFunctionFlags & FunctionFlags.Async ?
                    enclosingFunctionFlags & FunctionFlags.Generator ?
                        transformAsyncGeneratorFunctionBody(node) :
                        transformAsyncFunctionBody(node) :
                    visitFunctionBody(node.body, visitor, context)
            );
            enclosingFunctionFlags = savedEnclosingFunctionFlags;
            return updated;
        }

        /**
         * Visits a FunctionExpression node.
         *
         * This function will be called when one of the following conditions are met:
         * - The node is marked async
         *
         * @param node The node to visit.
         */
        function visitFunctionExpression(node: FunctionExpression): Expression {
            const savedEnclosingFunctionFlags = enclosingFunctionFlags;
            enclosingFunctionFlags = getFunctionFlags(node);
            const updated = updateFunctionExpression(
                node,
                visitNodes(node.modifiers, visitor, isModifier),
                enclosingFunctionFlags & FunctionFlags.Async ? undefined : node.asteriskToken,
                node.name,
                /*typeParameters*/ undefined,
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                enclosingFunctionFlags & FunctionFlags.Async ?
                    enclosingFunctionFlags & FunctionFlags.Generator ?
                        transformAsyncGeneratorFunctionBody(node) :
                        transformAsyncFunctionBody(node) :
                    visitFunctionBody(node.body, visitor, context)
            );
            enclosingFunctionFlags = savedEnclosingFunctionFlags;
            return updated;
        }

        /**
         * Visits an ArrowFunction.
         *
         * This function will be called when one of the following conditions are met:
         * - The node is marked async
         *
         * @param node The node to visit.
         */
        function visitArrowFunction(node: ArrowFunction) {
            const savedEnclosingFunctionFlags = enclosingFunctionFlags;
            enclosingFunctionFlags = getFunctionFlags(node);
            const updated = updateArrowFunction(
                node,
                visitNodes(node.modifiers, visitor, isModifier),
                /*typeParameters*/ undefined,
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                enclosingFunctionFlags & FunctionFlags.Async ?
                    transformAsyncFunctionBody(node) :
                    visitFunctionBody(node.body, visitor, context)
            );
            enclosingFunctionFlags = savedEnclosingFunctionFlags;
            return updated;
        }

        function transformAsyncGeneratorFunctionBody(node: MethodDeclaration | AccessorDeclaration | FunctionDeclaration | FunctionExpression): FunctionBody {
            resumeLexicalEnvironment();
            const statements: Statement[] = [];
            const statementOffset = addPrologueDirectives(statements, node.body.statements, /*ensureUseStrict*/ false, visitor);
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

            addRange(statements, endLexicalEnvironment());
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

        function transformAsyncFunctionBody(node: MethodDeclaration | AccessorDeclaration | FunctionDeclaration | FunctionExpression): FunctionBody;
        function transformAsyncFunctionBody(node: ArrowFunction): ConciseBody;
        function transformAsyncFunctionBody(node: FunctionLikeDeclaration): ConciseBody {
            resumeLexicalEnvironment();

            const original = getOriginalNode(node, isFunctionLike);
            const nodeType = original.type;
            const promiseConstructor = languageVersion < ScriptTarget.ES2015 ? getPromiseConstructor(nodeType) : undefined;
            const isArrowFunction = node.kind === SyntaxKind.ArrowFunction;
            const hasLexicalArguments = (resolver.getNodeCheckFlags(node) & NodeCheckFlags.CaptureArguments) !== 0;

            // An async function is emit as an outer function that calls an inner
            // generator function. To preserve lexical bindings, we pass the current
            // `this` and `arguments` objects to `__awaiter`. The generator function
            // passed to `__awaiter` is executed inside of the callback to the
            // promise constructor.

            if (!isArrowFunction) {
                const statements: Statement[] = [];
                const statementOffset = addPrologueDirectives(statements, (<Block>node.body).statements, /*ensureUseStrict*/ false, visitor);
                statements.push(
                    createReturn(
                        createAwaiterHelper(
                            context,
                            hasLexicalArguments,
                            promiseConstructor,
                            transformFunctionBodyWorker(<Block>node.body, statementOffset)
                        )
                    )
                );

                addRange(statements, endLexicalEnvironment());

                const block = createBlock(statements, /*location*/ node.body, /*multiLine*/ true);

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
            else {
                const expression = createAwaiterHelper(
                    context,
                    hasLexicalArguments,
                    promiseConstructor,
                    transformFunctionBodyWorker(node.body)
                );

                const declarations = endLexicalEnvironment();
                if (some(declarations)) {
                    const block = convertToFunctionBody(expression);
                    return updateBlock(block, createNodeArray(concatenate(block.statements, declarations), block.statements));
                }

                return expression;
            }
        }

        function transformFunctionBodyWorker(body: ConciseBody, start?: number) {
            if (isBlock(body)) {
                return updateBlock(body, visitLexicalEnvironment(body.statements, visitor, context, start));
            }
            else {
                startLexicalEnvironment();
                const visited = convertToFunctionBody(visitNode(body, visitor, isConciseBody));
                const declarations = endLexicalEnvironment();
                return updateBlock(visited, createNodeArray(concatenate(visited.statements, declarations), visited.statements));
            }
        }

        function getPromiseConstructor(type: TypeNode) {
            const typeName = type && getEntityNameFromTypeNode(type);
            if (typeName && isEntityName(typeName)) {
                const serializationKind = resolver.getTypeReferenceSerializationKind(typeName);
                if (serializationKind === TypeReferenceSerializationKind.TypeWithConstructSignatureAndValue
                    || serializationKind === TypeReferenceSerializationKind.Unknown) {
                    return typeName;
                }
            }

            return undefined;
        }

        function enableSubstitutionForAsyncMethodsWithSuper() {
            if ((enabledSubstitutions & ES2017SubstitutionFlags.AsyncMethodsWithSuper) === 0) {
                enabledSubstitutions |= ES2017SubstitutionFlags.AsyncMethodsWithSuper;

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

        function substituteExpression(node: Expression) {
            switch (node.kind) {
                case SyntaxKind.PropertyAccessExpression:
                    return substitutePropertyAccessExpression(<PropertyAccessExpression>node);
                case SyntaxKind.ElementAccessExpression:
                    return substituteElementAccessExpression(<ElementAccessExpression>node);
                case SyntaxKind.CallExpression:
                    if (enabledSubstitutions & ES2017SubstitutionFlags.AsyncMethodsWithSuper) {
                        return substituteCallExpression(<CallExpression>node);
                    }
                    break;
            }

            return node;
        }

        function substitutePropertyAccessExpression(node: PropertyAccessExpression) {
            if (enabledSubstitutions & ES2017SubstitutionFlags.AsyncMethodsWithSuper && node.expression.kind === SyntaxKind.SuperKeyword) {
                const flags = getSuperContainerAsyncMethodFlags();
                if (flags) {
                    return createSuperAccessInAsyncMethod(
                        createLiteral(node.name.text),
                        flags,
                        node
                    );
                }
            }

            return node;
        }

        function substituteElementAccessExpression(node: ElementAccessExpression) {
            if (enabledSubstitutions & ES2017SubstitutionFlags.AsyncMethodsWithSuper && node.expression.kind === SyntaxKind.SuperKeyword) {
                const flags = getSuperContainerAsyncMethodFlags();
                if (flags) {
                    return createSuperAccessInAsyncMethod(
                        node.argumentExpression,
                        flags,
                        node
                    );
                }
            }

            return node;
        }

        function substituteCallExpression(node: CallExpression): Expression {
            const expression = node.expression;
            if (isSuperProperty(expression)) {
                const flags = getSuperContainerAsyncMethodFlags();
                if (flags) {
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
            }
            return node;
        }

        function isSuperContainer(node: Node): node is SuperContainer {
            const kind = node.kind;
            return kind === SyntaxKind.ClassDeclaration
                || kind === SyntaxKind.Constructor
                || kind === SyntaxKind.MethodDeclaration
                || kind === SyntaxKind.GetAccessor
                || kind === SyntaxKind.SetAccessor;
        }

        /**
         * Hook for node emit.
         *
         * @param node The node to emit.
         * @param emit A callback used to emit the node in the printer.
         */
        function onEmitNode(emitContext: EmitContext, node: Node, emitCallback: (emitContext: EmitContext, node: Node) => void): void {
            // If we need to support substitutions for `super` in an async method,
            // we should track it here.
            if (enabledSubstitutions & ES2017SubstitutionFlags.AsyncMethodsWithSuper && isSuperContainer(node)) {
                const savedCurrentSuperContainer = currentSuperContainer;
                currentSuperContainer = node;
                previousOnEmitNode(emitContext, node, emitCallback);
                currentSuperContainer = savedCurrentSuperContainer;
            }
            else {
                previousOnEmitNode(emitContext, node, emitCallback);
            }
        }

        /**
         * Hooks node substitutions.
         *
         * @param node The node to substitute.
         * @param isExpression A value indicating whether the node is to be used in an expression
         *                     position.
         */
        function onSubstituteNode(emitContext: EmitContext, node: Node) {
            node = previousOnSubstituteNode(emitContext, node);
            if (emitContext === EmitContext.Expression) {
                return substituteExpression(<Expression>node);
            }

            return node;
        }

        function createSuperAccessInAsyncMethod(argumentExpression: Expression, flags: NodeCheckFlags, location: TextRange): LeftHandSideExpression {
            if (flags & NodeCheckFlags.AsyncMethodWithSuperBinding) {
                return createPropertyAccess(
                    createCall(
                        createIdentifier("_super"),
                        /*typeArguments*/ undefined,
                        [argumentExpression]
                    ),
                    "value",
                    location
                );
            }
            else {
                return createCall(
                    createIdentifier("_super"),
                    /*typeArguments*/ undefined,
                    [argumentExpression],
                    location
                );
            }
        }

        function getSuperContainerAsyncMethodFlags() {
            return currentSuperContainer !== undefined
                && resolver.getNodeCheckFlags(currentSuperContainer) & (NodeCheckFlags.AsyncMethodWithSuper | NodeCheckFlags.AsyncMethodWithSuperBinding);
        }
    }

    const awaiterHelper: EmitHelper = {
        name: "typescript:awaiter",
        scoped: false,
        priority: 5,
        text: `
            var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
                    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
                    function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };`
    };

    function createAwaiterHelper(context: TransformationContext, hasLexicalArguments: boolean, promiseConstructor: EntityName | Expression, body: Block) {
        context.requestEmitHelper(awaiterHelper);

        const generatorFunc = createFunctionExpression(
            /*modifiers*/ undefined,
            createToken(SyntaxKind.AsteriskToken),
            /*name*/ undefined,
            /*typeParameters*/ undefined,
            /*parameters*/ [],
            /*type*/ undefined,
            body
        );

        // Mark this node as originally an async function
        (generatorFunc.emitNode || (generatorFunc.emitNode = {})).flags |= EmitFlags.AsyncFunctionBody;

        return createCall(
            getHelperName("__awaiter"),
            /*typeArguments*/ undefined,
            [
                createThis(),
                hasLexicalArguments ? createIdentifier("arguments") : createVoidZero(),
                promiseConstructor ? createExpressionFromEntityName(promiseConstructor) : createVoidZero(),
                generatorFunc
            ]
        );
    }

    const asyncGeneratorHelper: EmitHelper = {
        name: "typescript:asyncGenerator",
        scoped: false,
        text: `
            var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
                var g = generator.apply(thisArg, _arguments || []), q = [], c;
                return { next: verb("next"), "throw": verb("throw"), "return": verb("return"), __asyncIterator__: function () { return this; } };
                function verb(n) { return function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]), next(); }); }; }
                function next() { if (!c && q.length) resume((c = q.shift())[0], c[1]); }
                function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(c[3], e); } }
                function step(r) { r.done ? settle(c[2], r) : r.value[0] === "yield" ? settle(c[2], { value: r.value[1], done: false }) : Promise.resolve(r.value[1]).then(r.value[0] === "delegate" ? delegate : fulfill, reject); }
                function delegate(r) { step(r.done ? r : { value: ["yield", r.value], done: false }); }
                function fulfill(value) { resume("next", value); }
                function reject(value) { resume("throw", value); }
                function settle(f, v) { c = void 0, f(v), next(); }
            };`
    };

    function createAsyncGeneratorHelper(context: TransformationContext, generatorFunc: FunctionExpression) {
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

    const asyncValues: EmitHelper = {
        name: "typescript:asyncValues",
        scoped: false,
        text: `
            var __asyncValues = (this && this.__asyncIterator) || function (o, iterator) {
                var m;
                return (m = o.__asyncIterator__) ? m.call(o) : typeof __values === "function" ? __values(o) : o[iterator || Symbol.iterator]();
            };`
    };

    function createAsyncValuesHelper(context: TransformationContext, expression: Expression, location?: TextRange) {
        context.requestEmitHelper(asyncValues);
        const compilerOptions = context.getCompilerOptions();
        const languageVersion = getEmitScriptTarget(compilerOptions);
        return createCall(
            getHelperName("__asyncValues"),
            /*typeArguments*/ undefined,
            languageVersion < ScriptTarget.ES2015
                ? [expression, createLiteral("__iterator__")]
                : [expression],
            location
        );
    }

    const asyncDelegator: EmitHelper = {
        name: "typescript:asyncDelegator",
        scoped: false,
        text: `
            var __asyncDelegator = (this && this.__asyncDelegator) || function (o, iterator) {
                var i = { next: verb("next"), "throw": verb("throw", function (e) { throw e; }), "return": verb("return", function (v) { return { value: v, done: true }; }) };
                return o = __asyncValues(o, iterator), i[iterator || Symbol.iterator] = function () { return this; }, i;
                function verb(n, f) { return function (v) { return { value: ["delegate", (o[n] || f).call(o, v)], done: false }; }; }
            };`
    };

    function createAsyncDelegatorHelper(context: TransformationContext, expression: Expression, location?: TextRange) {
        context.requestEmitHelper(asyncDelegator);
        const compilerOptions = context.getCompilerOptions();
        const languageVersion = getEmitScriptTarget(compilerOptions);
        return createCall(
            getHelperName("__asyncDelegator"),
            /*typeArguments*/ undefined,
            languageVersion < ScriptTarget.ES2015
                ? [expression, createLiteral("__iterator__")]
                : [expression],
            location
        );
    }

    const asyncStep: EmitHelper = {
        name: "typescript:asyncStep",
        scoped: false,
        text: `
            var __asyncStep = (this && this.__asyncStep) || function (r) {
                return !r.done && Promise.resolve(r.iterator.next()).then(function (_) { return !(r.done = (r.result = _).done); });
            };`
    };

    function createAsyncStepHelper(context: TransformationContext, iteratorRecord: Expression, location?: TextRange) {
        context.requestEmitHelper(asyncStep);
        return createCall(
            getHelperName("__asyncStep"),
            /*typeArguments*/ undefined,
            [iteratorRecord],
            location
        );
    }

    const asyncSuperHelper: EmitHelper = {
        name: "typescript:async-super",
        scoped: true,
        text: `
            const _super = name => super[name];`
    };

    const advancedAsyncSuperHelper: EmitHelper = {
        name: "typescript:advanced-async-super",
        scoped: true,
        text: `
            const _super = (function (geti, seti) {
                const cache = Object.create(null);
                return name => cache[name] || (cache[name] = { get value() { return geti(name); }, set value(v) { seti(name, v); } });
            })(name => super[name], (name, value) => super[name] = value);`
    };
}
