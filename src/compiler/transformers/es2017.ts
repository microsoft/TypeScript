/*@internal*/
namespace ts {
    type SuperContainer = ClassDeclaration | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | ConstructorDeclaration;

    const enum ES2017SubstitutionFlags {
        /** Enables substitutions for async methods with `super` calls. */
        AsyncMethodsWithSuper = 1 << 0
    }

    const enum ContextFlags {
        NonTopLevel = 1 << 0,
        HasLexicalThis = 1 << 1
    }

    export function transformES2017(context: TransformationContext) {
        const {
            factory,
            getEmitHelperFactory: emitHelpers,
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

        let enclosingFunctionParameterNames: Set<__String>;

        /**
         * Keeps track of property names accessed on super (`super.x`) within async functions.
         */
        let capturedSuperProperties: Set<__String>;
        /** Whether the async function contains an element access on super (`super[x]`). */
        let hasSuperElementAccess: boolean;
        /** A set of node IDs for generated super accessors (variable statements). */
        const substitutedSuperAccessors: boolean[] = [];

        let contextFlags: ContextFlags = 0;

        // Save the previous transformation hooks.
        const previousOnEmitNode = context.onEmitNode;
        const previousOnSubstituteNode = context.onSubstituteNode;

        // Set new transformation hooks.
        context.onEmitNode = onEmitNode;
        context.onSubstituteNode = onSubstituteNode;

        return chainBundle(context, transformSourceFile);

        function transformSourceFile(node: SourceFile) {
            if (node.isDeclarationFile) {
                return node;
            }

            setContextFlag(ContextFlags.NonTopLevel, false);
            setContextFlag(ContextFlags.HasLexicalThis, !isEffectiveStrictModeSourceFile(node, compilerOptions));
            const visited = visitEachChild(node, visitor, context);
            addEmitHelpers(visited, context.readEmitHelpers());
            return visited;
        }

        function setContextFlag(flag: ContextFlags, val: boolean) {
            contextFlags = val ? contextFlags | flag : contextFlags & ~flag;
        }

        function inContext(flags: ContextFlags) {
            return (contextFlags & flags) !== 0;
        }

        function inTopLevelContext() {
            return !inContext(ContextFlags.NonTopLevel);
        }

        function inHasLexicalThisContext() {
            return inContext(ContextFlags.HasLexicalThis);
        }

        function doWithContext<T, U>(flags: ContextFlags, cb: (value: T) => U, value: T) {
            const contextFlagsToSet = flags & ~contextFlags;
            if (contextFlagsToSet) {
                setContextFlag(contextFlagsToSet, /*val*/ true);
                const result = cb(value);
                setContextFlag(contextFlagsToSet, /*val*/ false);
                return result;
            }
            return cb(value);
        }

        function visitDefault(node: Node): VisitResult<Node> {
            return visitEachChild(node, visitor, context);
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
                    return doWithContext(ContextFlags.NonTopLevel | ContextFlags.HasLexicalThis, visitMethodDeclaration, <MethodDeclaration>node);

                case SyntaxKind.FunctionDeclaration:
                    return doWithContext(ContextFlags.NonTopLevel | ContextFlags.HasLexicalThis, visitFunctionDeclaration, <FunctionDeclaration>node);

                case SyntaxKind.FunctionExpression:
                    return doWithContext(ContextFlags.NonTopLevel | ContextFlags.HasLexicalThis, visitFunctionExpression, <FunctionExpression>node);

                case SyntaxKind.ArrowFunction:
                    return doWithContext(ContextFlags.NonTopLevel, visitArrowFunction, <ArrowFunction>node);

                case SyntaxKind.PropertyAccessExpression:
                    if (capturedSuperProperties && isPropertyAccessExpression(node) && node.expression.kind === SyntaxKind.SuperKeyword) {
                        capturedSuperProperties.add(node.name.escapedText);
                    }
                    return visitEachChild(node, visitor, context);

                case SyntaxKind.ElementAccessExpression:
                    if (capturedSuperProperties && (<ElementAccessExpression>node).expression.kind === SyntaxKind.SuperKeyword) {
                        hasSuperElementAccess = true;
                    }
                    return visitEachChild(node, visitor, context);

                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.Constructor:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.ClassExpression:
                    return doWithContext(ContextFlags.NonTopLevel | ContextFlags.HasLexicalThis, visitDefault, node);

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
            const catchClauseNames = new Set<__String>();
            recordDeclarationName(node.variableDeclaration!, catchClauseNames); // TODO: GH#18217

            // names declared in a catch variable are block scoped
            let catchClauseUnshadowedNames: Set<__String> | undefined;
            catchClauseNames.forEach((_, escapedName) => {
                if (enclosingFunctionParameterNames.has(escapedName)) {
                    if (!catchClauseUnshadowedNames) {
                        catchClauseUnshadowedNames = new Set(enclosingFunctionParameterNames);
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
                return expression ? factory.createExpressionStatement(expression) : undefined;
            }
            return visitEachChild(node, visitor, context);
        }

        function visitForInStatementInAsyncBody(node: ForInStatement) {
            return factory.updateForInStatement(
                node,
                isVariableDeclarationListWithCollidingName(node.initializer)
                    ? visitVariableDeclarationListWithCollidingNames(node.initializer, /*hasReceiver*/ true)!
                    : visitNode(node.initializer, visitor, isForInitializer),
                visitNode(node.expression, visitor, isExpression),
                visitNode(node.statement, asyncBodyVisitor, isStatement, factory.liftToBlock)
            );
        }

        function visitForOfStatementInAsyncBody(node: ForOfStatement) {
            return factory.updateForOfStatement(
                node,
                visitNode(node.awaitModifier, visitor, isToken),
                isVariableDeclarationListWithCollidingName(node.initializer)
                    ? visitVariableDeclarationListWithCollidingNames(node.initializer, /*hasReceiver*/ true)!
                    : visitNode(node.initializer, visitor, isForInitializer),
                visitNode(node.expression, visitor, isExpression),
                visitNode(node.statement, asyncBodyVisitor, isStatement, factory.liftToBlock)
            );
        }

        function visitForStatementInAsyncBody(node: ForStatement) {
            const initializer = node.initializer!; // TODO: GH#18217
            return factory.updateForStatement(
                node,
                isVariableDeclarationListWithCollidingName(initializer)
                    ? visitVariableDeclarationListWithCollidingNames(initializer, /*hasReceiver*/ false)
                    : visitNode(node.initializer, visitor, isForInitializer),
                visitNode(node.condition, visitor, isExpression),
                visitNode(node.incrementor, visitor, isExpression),
                visitNode(node.statement, asyncBodyVisitor, isStatement, factory.liftToBlock)
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
            // do not downlevel a top-level await as it is module syntax...
            if (inTopLevelContext()) {
                return visitEachChild(node, visitor, context);
            }
            return setOriginalNode(
                setTextRange(
                    factory.createYieldExpression(
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
            return factory.updateMethodDeclaration(
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
            return factory.updateFunctionDeclaration(
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
            return factory.updateFunctionExpression(
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
            return factory.updateArrowFunction(
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

        function recordDeclarationName({ name }: ParameterDeclaration | VariableDeclaration | BindingElement, names: Set<__String>) {
            if (isIdentifier(name)) {
                names.add(name.escapedText);
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
            return !!node
                && isVariableDeclarationList(node)
                && !(node.flags & NodeFlags.BlockScoped)
                && node.declarations.some(collidesWithParameterName);
        }

        function visitVariableDeclarationListWithCollidingNames(node: VariableDeclarationList, hasReceiver: boolean) {
            hoistVariableDeclarationList(node);

            const variables = getInitializedVariables(node);
            if (variables.length === 0) {
                if (hasReceiver) {
                    return visitNode(factory.converters.convertToAssignmentElementTarget(node.declarations[0].name), visitor, isExpression);
                }
                return undefined;
            }

            return factory.inlineExpressions(map(variables, transformInitializedVariable));
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
                factory.createAssignment(
                    factory.converters.convertToAssignmentElementTarget(node.name),
                    node.initializer!
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
            enclosingFunctionParameterNames = new Set();
            for (const parameter of node.parameters) {
                recordDeclarationName(parameter, enclosingFunctionParameterNames);
            }

            const savedCapturedSuperProperties = capturedSuperProperties;
            const savedHasSuperElementAccess = hasSuperElementAccess;
            if (!isArrowFunction) {
                capturedSuperProperties = new Set();
                hasSuperElementAccess = false;
            }

            let result: ConciseBody;
            if (!isArrowFunction) {
                const statements: Statement[] = [];
                const statementOffset = factory.copyPrologue((<Block>node.body).statements, statements, /*ensureUseStrict*/ false, visitor);
                statements.push(
                    factory.createReturnStatement(
                        emitHelpers().createAwaiterHelper(
                            inHasLexicalThisContext(),
                            hasLexicalArguments,
                            promiseConstructor,
                            transformAsyncFunctionBodyWorker(<Block>node.body, statementOffset)
                        )
                    )
                );

                insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());

                // Minor optimization, emit `_super` helper to capture `super` access in an arrow.
                // This step isn't needed if we eventually transform this to ES5.
                const emitSuperHelpers = languageVersion >= ScriptTarget.ES2015 && resolver.getNodeCheckFlags(node) & (NodeCheckFlags.AsyncMethodWithSuperBinding | NodeCheckFlags.AsyncMethodWithSuper);

                if (emitSuperHelpers) {
                    enableSubstitutionForAsyncMethodsWithSuper();
                    if (capturedSuperProperties.size) {
                        const variableStatement = createSuperAccessVariableStatement(factory, resolver, node, capturedSuperProperties);
                        substitutedSuperAccessors[getNodeId(variableStatement)] = true;
                        insertStatementsAfterStandardPrologue(statements, [variableStatement]);
                    }
                }

                const block = factory.createBlock(statements, /*multiLine*/ true);
                setTextRange(block, node.body);

                if (emitSuperHelpers && hasSuperElementAccess) {
                    // Emit helpers for super element access expressions (`super[x]`).
                    if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.AsyncMethodWithSuperBinding) {
                        addEmitHelper(block, advancedAsyncSuperHelper);
                    }
                    else if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.AsyncMethodWithSuper) {
                        addEmitHelper(block, asyncSuperHelper);
                    }
                }

                result = block;
            }
            else {
                const expression = emitHelpers().createAwaiterHelper(
                    inHasLexicalThisContext(),
                    hasLexicalArguments,
                    promiseConstructor,
                    transformAsyncFunctionBodyWorker(node.body!)
                );

                const declarations = endLexicalEnvironment();
                if (some(declarations)) {
                    const block = factory.converters.convertToFunctionBlock(expression);
                    result = factory.updateBlock(block, setTextRange(factory.createNodeArray(concatenate(declarations, block.statements)), block.statements));
                }
                else {
                    result = expression;
                }
            }

            enclosingFunctionParameterNames = savedEnclosingFunctionParameterNames;
            if (!isArrowFunction) {
                capturedSuperProperties = savedCapturedSuperProperties;
                hasSuperElementAccess = savedHasSuperElementAccess;
            }
            return result;
        }

        function transformAsyncFunctionBodyWorker(body: ConciseBody, start?: number) {
            if (isBlock(body)) {
                return factory.updateBlock(body, visitNodes(body.statements, asyncBodyVisitor, isStatement, start));
            }
            else {
                return factory.converters.convertToFunctionBlock(visitNode(body, asyncBodyVisitor, isConciseBody));
            }
        }

        function getPromiseConstructor(type: TypeNode | undefined) {
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
                // We need to be notified when entering the generated accessor arrow functions.
                context.enableEmitNotification(SyntaxKind.VariableStatement);
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
            // Disable substitution in the generated super accessor itself.
            else if (enabledSubstitutions && substitutedSuperAccessors[getNodeId(node)]) {
                const savedEnclosingSuperContainerFlags = enclosingSuperContainerFlags;
                enclosingSuperContainerFlags = 0;
                previousOnEmitNode(hint, node, emitCallback);
                enclosingSuperContainerFlags = savedEnclosingSuperContainerFlags;
                return;
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
                return setTextRange(
                    factory.createPropertyAccessExpression(
                        factory.createUniqueName("_super", GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel),
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
                return factory.createCallExpression(
                    factory.createPropertyAccessExpression(argumentExpression, "call"),
                    /*typeArguments*/ undefined,
                    [
                        factory.createThis(),
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

        function createSuperElementAccessInAsyncMethod(argumentExpression: Expression, location: TextRange): LeftHandSideExpression {
            if (enclosingSuperContainerFlags & NodeCheckFlags.AsyncMethodWithSuperBinding) {
                return setTextRange(
                    factory.createPropertyAccessExpression(
                        factory.createCallExpression(
                            factory.createUniqueName("_superIndex", GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel),
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
                    factory.createCallExpression(
                        factory.createUniqueName("_superIndex", GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel),
                        /*typeArguments*/ undefined,
                        [argumentExpression]
                    ),
                    location
                );
            }
        }
    }

    /** Creates a variable named `_super` with accessor properties for the given property names. */
    export function createSuperAccessVariableStatement(factory: NodeFactory, resolver: EmitResolver, node: FunctionLikeDeclaration, names: Set<__String>) {
        // Create a variable declaration with a getter/setter (if binding) definition for each name:
        //   const _super = Object.create(null, { x: { get: () => super.x, set: (v) => super.x = v }, ... });
        const hasBinding = (resolver.getNodeCheckFlags(node) & NodeCheckFlags.AsyncMethodWithSuperBinding) !== 0;
        const accessors: PropertyAssignment[] = [];
        names.forEach((_, key) => {
            const name = unescapeLeadingUnderscores(key);
            const getterAndSetter: PropertyAssignment[] = [];
            getterAndSetter.push(factory.createPropertyAssignment(
                "get",
                factory.createArrowFunction(
                    /* modifiers */ undefined,
                    /* typeParameters */ undefined,
                    /* parameters */ [],
                    /* type */ undefined,
                    /* equalsGreaterThanToken */ undefined,
                    setEmitFlags(
                        factory.createPropertyAccessExpression(
                            setEmitFlags(
                                factory.createSuper(),
                                EmitFlags.NoSubstitution
                            ),
                            name
                        ),
                        EmitFlags.NoSubstitution
                    )
                )
            ));
            if (hasBinding) {
                getterAndSetter.push(
                    factory.createPropertyAssignment(
                        "set",
                        factory.createArrowFunction(
                            /* modifiers */ undefined,
                            /* typeParameters */ undefined,
                            /* parameters */ [
                                factory.createParameterDeclaration(
                                    /* decorators */ undefined,
                                    /* modifiers */ undefined,
                                    /* dotDotDotToken */ undefined,
                                    "v",
                                    /* questionToken */ undefined,
                                    /* type */ undefined,
                                    /* initializer */ undefined
                                )
                            ],
                            /* type */ undefined,
                            /* equalsGreaterThanToken */ undefined,
                            factory.createAssignment(
                                setEmitFlags(
                                    factory.createPropertyAccessExpression(
                                        setEmitFlags(
                                            factory.createSuper(),
                                            EmitFlags.NoSubstitution
                                        ),
                                        name
                                    ),
                                    EmitFlags.NoSubstitution
                                ),
                                factory.createIdentifier("v")
                            )
                        )
                    )
                );
            }
            accessors.push(
                factory.createPropertyAssignment(
                    name,
                    factory.createObjectLiteralExpression(getterAndSetter),
                )
            );
        });
        return factory.createVariableStatement(
            /* modifiers */ undefined,
            factory.createVariableDeclarationList(
                [
                    factory.createVariableDeclaration(
                        factory.createUniqueName("_super", GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel),
                        /*exclamationToken*/ undefined,
                        /* type */ undefined,
                        factory.createCallExpression(
                            factory.createPropertyAccessExpression(
                                factory.createIdentifier("Object"),
                                "create"
                            ),
                            /* typeArguments */ undefined,
                            [
                                factory.createNull(),
                                factory.createObjectLiteralExpression(accessors, /* multiline */ true)
                            ]
                        )
                    )
                ],
                NodeFlags.Const));
    }
}
