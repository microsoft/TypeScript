/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />

/*@internal*/
namespace ts {
    type SuperContainer = ClassDeclaration | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | ConstructorDeclaration;

    export function transformES2017(context: TransformationContext) {

        const enum ES2017SubstitutionFlags {
            /** Enables substitutions for async methods with `super` calls. */
            AsyncMethodsWithSuper = 1 << 0
        }

        const {
            startLexicalEnvironment,
            endLexicalEnvironment,
        } = context;

        const resolver = context.getEmitResolver();
        const compilerOptions = context.getCompilerOptions();
        const languageVersion = getEmitScriptTarget(compilerOptions);

        // These variables contain state that changes as we descend into the tree.
        let currentSourceFileExternalHelpersModuleName: Identifier;
        /**
         * Keeps track of whether expression substitution has been enabled for specific edge cases.
         * They are persisted between each SourceFile transformation and should not be reset.
         */
        let enabledSubstitutions: ES2017SubstitutionFlags;

        /**
         * Keeps track of whether  we are within any containing namespaces when performing
         * just-in-time substitution while printing an expression identifier.
         */
        let applicableSubstitutions: ES2017SubstitutionFlags;

        /**
         * This keeps track of containers where `super` is valid, for use with
         * just-in-time substitution for `super` expressions inside of async methods.
         */
        let currentSuperContainer: SuperContainer;

        // Save the previous transformation hooks.
        const previousOnEmitNode = context.onEmitNode;
        const previousOnSubstituteNode = context.onSubstituteNode;

        // Set new transformation hooks.
        context.onEmitNode = onEmitNode;
        context.onSubstituteNode = onSubstituteNode;

        let currentScope: SourceFile | Block | ModuleBlock | CaseBlock;

        return transformSourceFile;

        function transformSourceFile(node: SourceFile) {
            if (isDeclarationFile(node)) {
                return node;
            }

            currentSourceFileExternalHelpersModuleName = node.externalHelpersModuleName;

            return visitEachChild(node, visitor, context);
        }

        function visitor(node: Node): VisitResult<Node> {
            if (node.transformFlags & TransformFlags.ES2017) {
                return visitorWorker(node);
            }
            else if (node.transformFlags & TransformFlags.ContainsES2017) {
                return visitEachChild(node, visitor, context);
            }

            return node;
        }

        function visitorWorker(node: Node): VisitResult<Node> {
            switch (node.kind) {
                case SyntaxKind.AsyncKeyword:
                    // ES2017 async modifier should be elided for targets < ES2017
                    return undefined;

                case SyntaxKind.AwaitExpression:
                    // ES2017 'await' expressions must be transformed for targets < ES2017.
                    return visitAwaitExpression(<AwaitExpression>node);

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

                default:
                    Debug.failBadSyntaxKind(node);
                    return node;
            }
        }

        /**
         * Visits an await expression.
         *
         * This function will be called any time a ES2017 await expression is encountered.
         *
         * @param node The await expression node.
         */
        function visitAwaitExpression(node: AwaitExpression): Expression {
            return setOriginalNode(
                createYield(
                    /*asteriskToken*/ undefined,
                    visitNode(node.expression, visitor, isExpression),
                    /*location*/ node
                ),
                node
            );
        }

        /**
         * Visits a method declaration of a class.
         *
         * This function will be called when one of the following conditions are met:
         * - The node is marked as async
         *
         * @param node The method node.
         */
        function visitMethodDeclaration(node: MethodDeclaration) {
            if (!isAsyncFunctionLike(node)) {
                return node;
            }
            const method = createMethod(
                /*decorators*/ undefined,
                visitNodes(node.modifiers, visitor, isModifier),
                node.asteriskToken,
                node.name,
                /*typeParameters*/ undefined,
                visitNodes(node.parameters, visitor, isParameter),
                /*type*/ undefined,
                transformFunctionBody(node),
                /*location*/ node
            );

            // While we emit the source map for the node after skipping decorators and modifiers,
            // we need to emit the comments for the original range.
            setCommentRange(method, node);
            setSourceMapRange(method, moveRangePastDecorators(node));
            setOriginalNode(method, node);

            return method;
        }

        /**
         * Visits a function declaration.
         *
         * This function will be called when one of the following conditions are met:
         * - The node is marked async
         *
         * @param node The function node.
         */
        function visitFunctionDeclaration(node: FunctionDeclaration): VisitResult<Statement> {
            if (!isAsyncFunctionLike(node)) {
                return node;
            }
            const func = createFunctionDeclaration(
                /*decorators*/ undefined,
                visitNodes(node.modifiers, visitor, isModifier),
                node.asteriskToken,
                node.name,
                /*typeParameters*/ undefined,
                visitNodes(node.parameters, visitor, isParameter),
                /*type*/ undefined,
                transformFunctionBody(node),
                /*location*/ node
            );
            setOriginalNode(func, node);

            return func;
        }

        /**
         * Visits a function expression node.
         *
         * This function will be called when one of the following conditions are met:
         * - The node is marked async
         *
         * @param node The function expression node.
         */
        function visitFunctionExpression(node: FunctionExpression): Expression {
            if (!isAsyncFunctionLike(node)) {
                return node;
            }
            if (nodeIsMissing(node.body)) {
                return createOmittedExpression();
            }

            const func = createFunctionExpression(
                /*modifiers*/ undefined,
                node.asteriskToken,
                node.name,
                /*typeParameters*/ undefined,
                visitNodes(node.parameters, visitor, isParameter),
                /*type*/ undefined,
                transformFunctionBody(node),
                /*location*/ node
            );

            setOriginalNode(func, node);

            return func;
        }

        /**
         * @remarks
         * This function will be called when one of the following conditions are met:
         * - The node is marked async
         */
        function visitArrowFunction(node: ArrowFunction) {
            if (!isAsyncFunctionLike(node)) {
                return node;
            }
            const func = createArrowFunction(
                visitNodes(node.modifiers, visitor, isModifier),
                /*typeParameters*/ undefined,
                visitNodes(node.parameters, visitor, isParameter),
                /*type*/ undefined,
                node.equalsGreaterThanToken,
                transformConciseBody(node),
                /*location*/ node
            );

            setOriginalNode(func, node);

            return func;
        }

        function transformFunctionBody(node: MethodDeclaration | AccessorDeclaration | FunctionDeclaration | FunctionExpression): FunctionBody {
            return <FunctionBody>transformAsyncFunctionBody(node);
        }

        function transformConciseBody(node: ArrowFunction): ConciseBody {
            return transformAsyncFunctionBody(node);
        }

        function transformFunctionBodyWorker(body: Block, start = 0) {
            const savedCurrentScope = currentScope;
            currentScope = body;
            startLexicalEnvironment();

            const statements = visitNodes(body.statements, visitor, isStatement, start);
            const visited = updateBlock(body, statements);
            const declarations = endLexicalEnvironment();
            currentScope = savedCurrentScope;
            return mergeFunctionBodyLexicalEnvironment(visited, declarations);
        }

        function transformAsyncFunctionBody(node: FunctionLikeDeclaration): ConciseBody | FunctionBody {
            const nodeType = node.original ? (<FunctionLikeDeclaration>node.original).type : node.type;
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
                            currentSourceFileExternalHelpersModuleName,
                            hasLexicalArguments,
                            promiseConstructor,
                            transformFunctionBodyWorker(<Block>node.body, statementOffset)
                        )
                    )
                );

                const block = createBlock(statements, /*location*/ node.body, /*multiLine*/ true);

                // Minor optimization, emit `_super` helper to capture `super` access in an arrow.
                // This step isn't needed if we eventually transform this to ES5.
                if (languageVersion >= ScriptTarget.ES2015) {
                    if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.AsyncMethodWithSuperBinding) {
                        enableSubstitutionForAsyncMethodsWithSuper();
                        setEmitFlags(block, EmitFlags.EmitAdvancedSuperHelper);
                    }
                    else if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.AsyncMethodWithSuper) {
                        enableSubstitutionForAsyncMethodsWithSuper();
                        setEmitFlags(block, EmitFlags.EmitSuperHelper);
                    }
                }

                return block;
            }
            else {
                return createAwaiterHelper(
                    currentSourceFileExternalHelpersModuleName,
                    hasLexicalArguments,
                    promiseConstructor,
                    <Block>transformConciseBodyWorker(node.body, /*forceBlockFunctionBody*/ true)
                );
            }
        }

        function transformConciseBodyWorker(body: Block | Expression, forceBlockFunctionBody: boolean) {
            if (isBlock(body)) {
                return transformFunctionBodyWorker(body);
            }
            else {
                startLexicalEnvironment();
                const visited: Expression | Block = visitNode(body, visitor, isConciseBody);
                const declarations = endLexicalEnvironment();
                const merged = mergeFunctionBodyLexicalEnvironment(visited, declarations);
                if (forceBlockFunctionBody && !isBlock(merged)) {
                    return createBlock([
                        createReturn(<Expression>merged)
                    ]);
                }
                else {
                    return merged;
                }
            }
        }

        function getPromiseConstructor(type: TypeNode) {
            const typeName = getEntityNameFromTypeNode(type);
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
            const savedApplicableSubstitutions = applicableSubstitutions;
            const savedCurrentSuperContainer = currentSuperContainer;
            // If we need to support substitutions for `super` in an async method,
            // we should track it here.
            if (enabledSubstitutions & ES2017SubstitutionFlags.AsyncMethodsWithSuper && isSuperContainer(node)) {
                currentSuperContainer = node;
            }

            previousOnEmitNode(emitContext, node, emitCallback);

            applicableSubstitutions = savedApplicableSubstitutions;
            currentSuperContainer = savedCurrentSuperContainer;
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
}
