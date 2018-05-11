/*@internal*/
namespace ts {
    type SuperContainer = ClassDeclaration | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | ConstructorDeclaration;

    const enum ES2017SubstitutionFlags {
        /** Enables substitutions for async methods with `super` calls. */
        AsyncMethodsWithSuper = 1 << 0
    }

    export function transformES2017(context: TransformationContext) {
        const {
            resumeLexicalEnvironment,
            endLexicalEnvironment,
            hoistVariableDeclaration
        } = context;

        const resolver = context.getEmitResolver();
        const compilerOptions = context.getCompilerOptions();
        const languageVersion = getEmitScriptTarget(compilerOptions);

        /**
         * Keeps track of whether expression substitution has been enabled for specific edge cases.
         * They are persisted between each SourceFile transformation and should not be reset.
         */
        let enabledSubstitutions: ES2017SubstitutionFlags;

        /**
         * This keeps track of containers where `super` is valid, for use with
         * just-in-time substitution for `super` expressions inside of async methods.
         */
        let enclosingSuperContainerFlags: NodeCheckFlags = 0;

        let enclosingFunctionParameterNames: UnderscoreEscapedMap<true>;

        // Save the previous transformation hooks.
        const previousOnEmitNode = context.onEmitNode;
        const previousOnSubstituteNode = context.onSubstituteNode;

        // Set new transformation hooks.
        context.onEmitNode = onEmitNode;
        context.onSubstituteNode = onSubstituteNode;

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
            if ((node.transformFlags & TransformFlags.ContainsES2017) === 0) {
                return node;
            }

            switch (node.kind) {
                case SyntaxKind.AsyncKeyword:
                    // ES2017 async modifier should be elided for targets < ES2017
                    return undefined;

                case SyntaxKind.AwaitExpression:
                    return visitAwaitExpression(<AwaitExpression>node);

                case SyntaxKind.MethodDeclaration:
                    return visitMethodDeclaration(<MethodDeclaration>node);

                case SyntaxKind.FunctionDeclaration:
                    return visitFunctionDeclaration(<FunctionDeclaration>node);

                case SyntaxKind.FunctionExpression:
                    return visitFunctionExpression(<FunctionExpression>node);

                case SyntaxKind.ArrowFunction:
                    return visitArrowFunction(<ArrowFunction>node);

                default:
                    return visitEachChild(node, visitor, context);
            }
        }

        function asyncBodyVisitor(node: Node): VisitResult<Node> {
            if (isNodeWithPossibleHoistedDeclaration(node)) {
                switch (node.kind) {
                    case SyntaxKind.VariableStatement:
                        return visitVariableStatementInAsyncBody(node);
                    case SyntaxKind.ForStatement:
                        return visitForStatementInAsyncBody(node);
                    case SyntaxKind.ForInStatement:
                        return visitForInStatementInAsyncBody(node);
                    case SyntaxKind.ForOfStatement:
                        return visitForOfStatementInAsyncBody(node);
                    case SyntaxKind.CatchClause:
                        return visitCatchClauseInAsyncBody(node);
                    case SyntaxKind.Block:
                    case SyntaxKind.SwitchStatement:
                    case SyntaxKind.CaseBlock:
                    case SyntaxKind.CaseClause:
                    case SyntaxKind.DefaultClause:
                    case SyntaxKind.TryStatement:
                    case SyntaxKind.DoStatement:
                    case SyntaxKind.WhileStatement:
                    case SyntaxKind.IfStatement:
                    case SyntaxKind.WithStatement:
                    case SyntaxKind.LabeledStatement:
                        return visitEachChild(node, asyncBodyVisitor, context);
                    default:
                        return Debug.assertNever(node, "Unhandled node.");
                }
            }
            return visitor(node);
        }

        function visitCatchClauseInAsyncBody(node: CatchClause) {
            const catchClauseNames = createUnderscoreEscapedMap<true>();
            recordDeclarationName(node.variableDeclaration, catchClauseNames);

            // names declared in a catch variable are block scoped
            let catchClauseUnshadowedNames: UnderscoreEscapedMap<true>;
            catchClauseNames.forEach((_, escapedName) => {
                if (enclosingFunctionParameterNames.has(escapedName)) {
                    if (!catchClauseUnshadowedNames) {
                        catchClauseUnshadowedNames = cloneMap(enclosingFunctionParameterNames);
                    }
                    catchClauseUnshadowedNames.delete(escapedName);
                }
            });

            if (catchClauseUnshadowedNames) {
                const savedEnclosingFunctionParameterNames = enclosingFunctionParameterNames;
                enclosingFunctionParameterNames = catchClauseUnshadowedNames;
                const result = visitEachChild(node, asyncBodyVisitor, context);
                enclosingFunctionParameterNames = savedEnclosingFunctionParameterNames;
                return result;
            }
            else {
                return visitEachChild(node, asyncBodyVisitor, context);
            }
        }

        function visitVariableStatementInAsyncBody(node: VariableStatement) {
            if (isVariableDeclarationListWithCollidingName(node.declarationList)) {
                const expression = visitVariableDeclarationListWithCollidingNames(node.declarationList, /*hasReceiver*/ false);
                return expression ? createStatement(expression) : undefined;
            }
            return visitEachChild(node, visitor, context);
        }

        function visitForInStatementInAsyncBody(node: ForInStatement) {
            return updateForIn(
                node,
                isVariableDeclarationListWithCollidingName(node.initializer)
                    ? visitVariableDeclarationListWithCollidingNames(node.initializer, /*hasReceiver*/ true)
                    : visitNode(node.initializer, visitor, isForInitializer),
                visitNode(node.expression, visitor, isExpression),
                visitNode(node.statement, asyncBodyVisitor, isStatement, liftToBlock)
            );
        }

        function visitForOfStatementInAsyncBody(node: ForOfStatement) {
            return updateForOf(
                node,
                visitNode(node.awaitModifier, visitor, isToken),
                isVariableDeclarationListWithCollidingName(node.initializer)
                    ? visitVariableDeclarationListWithCollidingNames(node.initializer, /*hasReceiver*/ true)
                    : visitNode(node.initializer, visitor, isForInitializer),
                visitNode(node.expression, visitor, isExpression),
                visitNode(node.statement, asyncBodyVisitor, isStatement, liftToBlock)
            );
        }

        function visitForStatementInAsyncBody(node: ForStatement) {
            return updateFor(
                node,
                isVariableDeclarationListWithCollidingName(node.initializer)
                    ? visitVariableDeclarationListWithCollidingNames(node.initializer, /*hasReceiver*/ false)
                    : visitNode(node.initializer, visitor, isForInitializer),
                visitNode(node.condition, visitor, isExpression),
                visitNode(node.incrementor, visitor, isExpression),
                visitNode(node.statement, asyncBodyVisitor, isStatement, liftToBlock)
            );
        }

        /**
         * Visits an AwaitExpression node.
         *
         * This function will be called any time a ES2017 await expression is encountered.
         *
         * @param node The node to visit.
         */
        function visitAwaitExpression(node: AwaitExpression): Expression {
            return setOriginalNode(
                setTextRange(
                    createYield(
                        /*asteriskToken*/ undefined,
                        visitNode(node.expression, visitor, isExpression)
                    ),
                    node
                ),
                node
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
            return updateMethod(
                node,
                /*decorators*/ undefined,
                visitNodes(node.modifiers, visitor, isModifier),
                node.asteriskToken,
                node.name,
                /*questionToken*/ undefined,
                /*typeParameters*/ undefined,
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                getFunctionFlags(node) & FunctionFlags.Async
                    ? transformAsyncFunctionBody(node)
                    : visitFunctionBody(node.body, visitor, context)
            );
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
            return updateFunctionDeclaration(
                node,
                /*decorators*/ undefined,
                visitNodes(node.modifiers, visitor, isModifier),
                node.asteriskToken,
                node.name,
                /*typeParameters*/ undefined,
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                getFunctionFlags(node) & FunctionFlags.Async
                    ? transformAsyncFunctionBody(node)
                    : visitFunctionBody(node.body, visitor, context)
            );
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
            return updateFunctionExpression(
                node,
                visitNodes(node.modifiers, visitor, isModifier),
                node.asteriskToken,
                node.name,
                /*typeParameters*/ undefined,
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                getFunctionFlags(node) & FunctionFlags.Async
                    ? transformAsyncFunctionBody(node)
                    : visitFunctionBody(node.body, visitor, context)
            );
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
            return updateArrowFunction(
                node,
                visitNodes(node.modifiers, visitor, isModifier),
                /*typeParameters*/ undefined,
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                node.equalsGreaterThanToken,
                getFunctionFlags(node) & FunctionFlags.Async
                    ? transformAsyncFunctionBody(node)
                    : visitFunctionBody(node.body, visitor, context),
            );
        }

        function recordDeclarationName({ name }: ParameterDeclaration | VariableDeclaration | BindingElement, names: UnderscoreEscapedMap<true>) {
            if (isIdentifier(name)) {
                names.set(name.escapedText, true);
            }
            else {
                for (const element of name.elements) {
                    if (!isOmittedExpression(element)) {
                        recordDeclarationName(element, names);
                    }
                }
            }
        }

        function isVariableDeclarationListWithCollidingName(node: ForInitializer): node is VariableDeclarationList {
            return node
                && isVariableDeclarationList(node)
                && !(node.flags & NodeFlags.BlockScoped)
                && forEach(node.declarations, collidesWithParameterName);
        }

        function visitVariableDeclarationListWithCollidingNames(node: VariableDeclarationList, hasReceiver: boolean) {
            hoistVariableDeclarationList(node);

            const variables = getInitializedVariables(node);
            if (variables.length === 0) {
                if (hasReceiver) {
                    return visitNode(convertToAssignmentElementTarget(node.declarations[0].name), visitor, isExpression);
                }
                return undefined;
            }

            return inlineExpressions(map(variables, transformInitializedVariable));
        }

        function hoistVariableDeclarationList(node: VariableDeclarationList) {
            forEach(node.declarations, hoistVariable);
        }

        function hoistVariable({ name }: VariableDeclaration | BindingElement) {
            if (isIdentifier(name)) {
                hoistVariableDeclaration(name);
            }
            else {
                for (const element of name.elements) {
                    if (!isOmittedExpression(element)) {
                        hoistVariable(element);
                    }
                }
            }
        }

        function transformInitializedVariable(node: VariableDeclaration) {
            const converted = setSourceMapRange(
                createAssignment(
                    convertToAssignmentElementTarget(node.name),
                    node.initializer
                ),
                node
            );
            return visitNode(converted, visitor, isExpression);
        }

        function collidesWithParameterName({ name }: VariableDeclaration | BindingElement): boolean {
            if (isIdentifier(name)) {
                return enclosingFunctionParameterNames.has(name.escapedText);
            }
            else {
                for (const element of name.elements) {
                    if (!isOmittedExpression(element) && collidesWithParameterName(element)) {
                        return true;
                    }
                }
            }
            return false;
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

            const savedEnclosingFunctionParameterNames = enclosingFunctionParameterNames;
            enclosingFunctionParameterNames = createUnderscoreEscapedMap<true>();
            for (const parameter of node.parameters) {
                recordDeclarationName(parameter, enclosingFunctionParameterNames);
            }

            let result: ConciseBody;
            if (!isArrowFunction) {
                const statements: Statement[] = [];
                const statementOffset = addPrologue(statements, (<Block>node.body).statements, /*ensureUseStrict*/ false, visitor);
                statements.push(
                    createReturn(
                        createAwaiterHelper(
                            context,
                            hasLexicalArguments,
                            promiseConstructor,
                            transformAsyncFunctionBodyWorker(<Block>node.body, statementOffset)
                        )
                    )
                );

                prependRange(statements, endLexicalEnvironment());

                const block = createBlock(statements, /*multiLine*/ true);
                setTextRange(block, node.body);

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

                result = block;
            }
            else {
                const expression = createAwaiterHelper(
                    context,
                    hasLexicalArguments,
                    promiseConstructor,
                    transformAsyncFunctionBodyWorker(node.body)
                );

                const declarations = endLexicalEnvironment();
                if (some(declarations)) {
                    const block = convertToFunctionBody(expression);
                    result = updateBlock(block, setTextRange(createNodeArray(concatenate(declarations, block.statements)), block.statements));
                }
                else {
                    result = expression;
                }
            }

            enclosingFunctionParameterNames = savedEnclosingFunctionParameterNames;
            return result;
        }

        function transformAsyncFunctionBodyWorker(body: ConciseBody, start?: number) {
            if (isBlock(body)) {
                return updateBlock(body, visitNodes(body.statements, asyncBodyVisitor, isStatement, start));
            }
            else {
                return convertToFunctionBody(visitNode(body, asyncBodyVisitor, isConciseBody));
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

        /**
         * Hook for node emit.
         *
         * @param hint A hint as to the intended usage of the node.
         * @param node The node to emit.
         * @param emit A callback used to emit the node in the printer.
         */
        function onEmitNode(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void): void {
            // If we need to support substitutions for `super` in an async method,
            // we should track it here.
            if (enabledSubstitutions & ES2017SubstitutionFlags.AsyncMethodsWithSuper && isSuperContainer(node)) {
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
         * @param hint A hint as to the intended usage of the node.
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

        function isSuperContainer(node: Node): node is SuperContainer {
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
                            createFileLevelUniqueName("_super"),
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
                        createFileLevelUniqueName("_super"),
                        /*typeArguments*/ undefined,
                        [argumentExpression]
                    ),
                    location
                );
            }
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
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
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
        (generatorFunc.emitNode || (generatorFunc.emitNode = {})).flags |= EmitFlags.AsyncFunctionBody | EmitFlags.ReuseTempVariableScope;

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

    export const asyncSuperHelper: EmitHelper = {
        name: "typescript:async-super",
        scoped: true,
        text: helperString`
            const ${"_super"} = name => super[name];`
    };

    export const advancedAsyncSuperHelper: EmitHelper = {
        name: "typescript:advanced-async-super",
        scoped: true,
        text: helperString`
            const ${"_super"} = (function (geti, seti) {
                const cache = Object.create(null);
                return name => cache[name] || (cache[name] = { get value() { return geti(name); }, set value(v) { seti(name, v); } });
            })(name => super[name], (name, value) => super[name] = value);`
    };
}
