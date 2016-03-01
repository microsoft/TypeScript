/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />

/*@internal*/
namespace ts {
    export function transformES6(context: TransformationContext) {
        const {
            startLexicalEnvironment,
            endLexicalEnvironment,
            hoistVariableDeclaration,
            setNodeEmitFlags,
            enableExpressionSubstitution,
            enableEmitNotification,
        } = context;

        const resolver = context.getEmitResolver();
        const previousIdentifierSubstitution = context.identifierSubstitution;
        const previousExpressionSubstitution = context.expressionSubstitution;
        const previousOnBeforeEmitNode = context.onBeforeEmitNode;
        const previousOnAfterEmitNode = context.onAfterEmitNode;
        context.enableExpressionSubstitution(SyntaxKind.Identifier);
        context.identifierSubstitution = substituteIdentifier;
        context.expressionSubstitution = substituteExpression;
        context.onBeforeEmitNode = onBeforeEmitNode;
        context.onAfterEmitNode = onAfterEmitNode;

        let currentSourceFile: SourceFile;
        let currentParent: Node;
        let currentNode: Node;
        let enclosingBlockScopeContainer: Node;
        let enclosingBlockScopeContainerParent: Node;
        let containingFunction: FunctionLikeDeclaration;
        let containingNonArrowFunction: FunctionLikeDeclaration;
        let combinedNodeFlags: NodeFlags;

        // This stack is is used to support substitutions when printing nodes.
        let hasEnabledExpressionSubstitutionForCapturedThis = false;
        let containingFunctionStack: FunctionLikeDeclaration[];

        return transformSourceFile;

        function transformSourceFile(node: SourceFile) {
            currentSourceFile = node;
            return visitEachChild(node, visitor, context);
        }

        function visitor(node: Node): Node {
            const savedContainingFunction = containingFunction;
            const savedContainingNonArrowFunction = containingNonArrowFunction;
            const savedCurrentParent = currentParent;
            const savedCurrentNode = currentNode;
            const savedEnclosingBlockScopeContainer = enclosingBlockScopeContainer;
            const savedEnclosingBlockScopeContainerParent = enclosingBlockScopeContainerParent;
            const savedCombinedNodeFlags = combinedNodeFlags;

            onBeforeVisitNode(node);
            node = visitorWorker(node);

            containingFunction = savedContainingFunction;
            containingNonArrowFunction = savedContainingNonArrowFunction;
            currentParent = savedCurrentParent;
            currentNode = savedCurrentNode;
            enclosingBlockScopeContainer = savedEnclosingBlockScopeContainer;
            enclosingBlockScopeContainerParent = savedEnclosingBlockScopeContainerParent;
            combinedNodeFlags = savedCombinedNodeFlags;
            return node;
        }

        function visitorWorker(node: Node): Node {
            if (node.transformFlags & TransformFlags.ES6) {
                return visitJavaScript(node);
            }
            else if (node.transformFlags & TransformFlags.ContainsES6) {
                return visitEachChild(node, visitor, context);
            }
            else {
                return node;
            }
        }

        function visitJavaScript(node: Node): Node {
            switch (node.kind) {
                case SyntaxKind.ClassDeclaration:
                    return visitClassDeclaration(<ClassDeclaration>node);

                case SyntaxKind.ClassExpression:
                    return visitClassExpression(<ClassExpression>node);

                case SyntaxKind.Parameter:
                    return visitParameter(<ParameterDeclaration>node);

                case SyntaxKind.FunctionDeclaration:
                    return visitFunctionDeclaration(<FunctionDeclaration>node);

                case SyntaxKind.ArrowFunction:
                    return visitArrowFunction(<ArrowFunction>node);

                case SyntaxKind.FunctionExpression:
                    return visitFunctionExpression(<FunctionExpression>node);

                case SyntaxKind.VariableDeclaration:
                    return visitVariableDeclaration(<VariableDeclaration>node);

                case SyntaxKind.VariableDeclarationList:
                    return visitVariableDeclarationList(<VariableDeclarationList>node);

                case SyntaxKind.LabeledStatement:
                    return visitLabeledStatement(<LabeledStatement>node);

                case SyntaxKind.DoStatement:
                    return visitDoStatement(<DoStatement>node);

                case SyntaxKind.WhileStatement:
                    return visitWhileStatement(<WhileStatement>node);

                case SyntaxKind.ForStatement:
                    return visitForStatement(<ForStatement>node);

                case SyntaxKind.ForInStatement:
                    return visitForInStatement(<ForInStatement>node);

                case SyntaxKind.ForOfStatement:
                    return visitForOfStatement(<ForOfStatement>node);

                case SyntaxKind.ObjectLiteralExpression:
                    return visitObjectLiteralExpression(<ObjectLiteralExpression>node);

                case SyntaxKind.ShorthandPropertyAssignment:
                    return visitShorthandPropertyAssignment(<ShorthandPropertyAssignment>node);

                case SyntaxKind.ArrayLiteralExpression:
                    return visitArrayLiteralExpression(<ArrayLiteralExpression>node);

                case SyntaxKind.CallExpression:
                    return visitCallExpression(<CallExpression>node);

                case SyntaxKind.NewExpression:
                    return visitNewExpression(<NewExpression>node);

                case SyntaxKind.BinaryExpression:
                    return visitBinaryExpression(<BinaryExpression>node);

                case SyntaxKind.NoSubstitutionTemplateLiteral:
                case SyntaxKind.TemplateHead:
                case SyntaxKind.TemplateMiddle:
                case SyntaxKind.TemplateTail:
                    return visitTemplateLiteral(<LiteralExpression>node);

                case SyntaxKind.TaggedTemplateExpression:
                    return visitTaggedTemplateExpression(<TaggedTemplateExpression>node);

                case SyntaxKind.TemplateExpression:
                    return visitTemplateExpression(<TemplateExpression>node);

                case SyntaxKind.SuperKeyword:
                    return visitSuperKeyword(<PrimaryExpression>node);

                case SyntaxKind.MethodDeclaration:
                    return visitMethodDeclaration(<MethodDeclaration>node);

                case SyntaxKind.SourceFile:
                    return visitSourceFileNode(<SourceFile>node);
            }

            Debug.fail(`Unexpected node kind: ${formatSyntaxKind(node.kind)}.`);
        }

        function onBeforeVisitNode(node: Node) {
            const currentGrandparent = currentParent;
            currentParent = currentNode;
            currentNode = node;

            combinedNodeFlags = combineNodeFlags(currentNode, currentParent, combinedNodeFlags);

            if (currentParent) {
                if (isBlockScope(currentParent, currentGrandparent)) {
                    enclosingBlockScopeContainer = currentParent;
                    enclosingBlockScopeContainerParent = currentGrandparent;
                }

                switch (currentParent.kind) {
                    case SyntaxKind.Constructor:
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.FunctionExpression:
                        containingNonArrowFunction = <FunctionLikeDeclaration>currentParent;
                        containingFunction = <FunctionLikeDeclaration>currentParent;
                        break;

                    case SyntaxKind.ArrowFunction:
                        containingFunction = <FunctionLikeDeclaration>currentParent;
                        break;
                }
            }
        }

        function visitClassDeclaration(node: ClassDeclaration): Statement {
            return startOnNewLine(
                createVariableStatement(
                    /*modifiers*/ undefined,
                    createVariableDeclarationList([
                        createVariableDeclaration(
                            getDeclarationName(node),
                            transformClassLikeDeclarationToExpression(node)
                        )
                    ]),
                    node
                )
            );
        }

        function visitClassExpression(node: ClassExpression): Expression {
            return transformClassLikeDeclarationToExpression(node);
        }

        function transformClassLikeDeclarationToExpression(node: ClassExpression | ClassDeclaration): Expression {
            const baseTypeNode = getClassExtendsHeritageClauseElement(node);
            return createParen(
                createCall(
                    createFunctionExpression(
                        /*asteriskToken*/ undefined,
                        /*name*/ undefined,
                        baseTypeNode ? [createParameter("_super")] : [],
                        transformClassBody(node, baseTypeNode !== undefined)
                    ),
                    baseTypeNode ? [visitNode(baseTypeNode.expression, visitor, isExpression)] : []
                )
            );
        }

        function transformClassBody(node: ClassExpression | ClassDeclaration, hasExtendsClause: boolean): Block {
            const statements: Statement[] = [];
            startLexicalEnvironment();
            addExtendsHelperIfNeeded(statements, node, hasExtendsClause);
            addConstructor(statements, node, hasExtendsClause);
            addClassMembers(statements, node);
            addNode(statements, createReturn(getDeclarationName(node)));
            addNodes(statements, endLexicalEnvironment());
            return setMultiLine(createBlock(statements), /*multiLine*/ true);
        }

        function addExtendsHelperIfNeeded(classStatements: Statement[], node: ClassExpression | ClassDeclaration, hasExtendsClause: boolean): void {
            if (hasExtendsClause) {
                addNode(classStatements,
                    createStatement(
                        createExtendsHelper(getDeclarationName(node))
                    )
                );
            }
        }

        function addConstructor(classStatements: Statement[], node: ClassExpression | ClassDeclaration, hasExtendsClause: boolean): void {
            const constructor = getFirstConstructorWithBody(node);
            const hasSynthesizedSuper = hasSynthesizedDefaultSuperCall(constructor, hasExtendsClause);
            addNode(classStatements,
                createFunctionDeclaration(
                    /*modifiers*/ undefined,
                    /*asteriskToken*/ undefined,
                    getDeclarationName(node),
                    transformConstructorParameters(constructor, hasSynthesizedSuper),
                    transformConstructorBody(constructor, hasExtendsClause, hasSynthesizedSuper),
                    /*location*/ constructor
                )
            );
        }

        function transformConstructorParameters(constructor: ConstructorDeclaration, hasSynthesizedSuper: boolean): ParameterDeclaration[] {
            if (constructor && !hasSynthesizedSuper) {
                return visitNodes(constructor.parameters, visitor, isParameter);
            }

            return [];
        }

        function transformConstructorBody(constructor: ConstructorDeclaration, hasExtendsClause: boolean, hasSynthesizedSuper: boolean) {
            const statements: Statement[] = [];
            startLexicalEnvironment();
            if (constructor) {
                addCaptureThisForNodeIfNeeded(statements, constructor);
                addDefaultValueAssignments(statements, constructor);
                addRestParameter(statements, constructor, hasSynthesizedSuper);
            }

            addDefaultSuperCall(statements, constructor, hasExtendsClause, hasSynthesizedSuper);

            if (constructor) {
                addNodes(statements, visitNodes(constructor.body.statements, visitor, isStatement, hasSynthesizedSuper ? 1 : 0));
            }

            addNodes(statements, endLexicalEnvironment());
            return setMultiLine(createBlock(statements, /*location*/ constructor && constructor.body), /*multiLine*/ true);
        }

        function addDefaultSuperCall(statements: Statement[], constructor: ConstructorDeclaration, hasExtendsClause: boolean, hasSynthesizedSuper: boolean) {
            if (constructor ? hasSynthesizedSuper : hasExtendsClause) {
                addNode(statements,
                    createStatement(
                        createFunctionApply(
                            createIdentifier("_super"),
                            createThis(),
                            createIdentifier("arguments")
                        )
                    )
                );
            }
        }

        function visitParameter(node: ParameterDeclaration): ParameterDeclaration {
            if (isBindingPattern(node.name)) {
                // Binding patterns are converted into a generated name and are
                // evaluated inside the function body.
                return createParameter(
                    getGeneratedNameForNode(node),
                    /*initializer*/ undefined,
                    /*location*/ node
                );
            }
            else if (node.initializer) {
                // Initializers are elided
                return createParameter(
                    node.name,
                    /*initializer*/ undefined,
                    /*location*/ node
                );
            }
            else if (node.dotDotDotToken) {
                // rest parameters are elided
                return undefined;
            }
            else {
                return node;
            }
        }

        function shouldAddDefaultValueAssignments(node: FunctionLikeDeclaration): boolean {
            return (node.transformFlags & TransformFlags.ContainsDefaultValueAssignments) !== 0;
        }

        function addDefaultValueAssignments(statements: Statement[], node: FunctionLikeDeclaration): void {
            if (!shouldAddDefaultValueAssignments(node)) {
                return;
            }

            for (const parameter of node.parameters) {
                const { name, initializer, dotDotDotToken } = parameter;

                // A rest parameter cannot have a binding pattern or an initializer,
                // so let's just ignore it.
                if (dotDotDotToken) {
                    continue;
                }

                if (isBindingPattern(name)) {
                    addDefaultValueAssignmentForBindingPattern(statements, parameter, name, initializer);
                }
                else if (initializer) {
                    addDefaultValueAssignmentForInitializer(statements, parameter, name, initializer);
                }
            }
        }

        function addDefaultValueAssignmentForBindingPattern(statements: Statement[], parameter: ParameterDeclaration, name: BindingPattern, initializer: Expression): void {
            const temp = getGeneratedNameForNode(parameter);

            // In cases where a binding pattern is simply '[]' or '{}',
            // we usually don't want to emit a var declaration; however, in the presence
            // of an initializer, we must emit that expression to preserve side effects.
            if (name.elements.length > 0) {
                addNode(statements,
                    createVariableStatement(
                        /*modifiers*/ undefined,
                        createVariableDeclarationList(
                            transformParameterBindingElements(parameter, temp)
                        )
                    )
                );
            }
            else if (initializer) {
                addNode(statements,
                    createStatement(
                        createAssignment(
                            temp,
                            visitNode(initializer, visitor, isExpression)
                        )
                    )
                );
            }
        }

        function transformParameterBindingElements(parameter: ParameterDeclaration, name: Identifier) {
            return flattenParameterDestructuring(parameter, name, visitor);
        }

        function addDefaultValueAssignmentForInitializer(statements: Statement[], parameter: ParameterDeclaration, name: Identifier, initializer: Expression): void {
            addNode(statements,
                createIf(
                    createStrictEquality(
                        getSynthesizedClone(name),
                        createVoidZero()
                    ),
                    setNodeEmitFlags(
                        createBlock([
                            createStatement(
                                createAssignment(
                                    getSynthesizedClone(name),
                                    visitNode(initializer, visitor, isExpression)
                                )
                            )
                        ]),
                        NodeEmitFlags.SingleLine
                    )
                )
            );
        }

        function shouldAddRestParameter(node: ParameterDeclaration) {
            return node && node.dotDotDotToken;
        }

        function addRestParameter(statements: Statement[], node: FunctionLikeDeclaration, inConstructorWithSynthesizedSuper?: boolean): void {
            if (inConstructorWithSynthesizedSuper) {
                return;
            }

            const parameter = lastOrUndefined(node.parameters);
            if (!shouldAddRestParameter(parameter)) {
                return;
            }

            const name = getSynthesizedClone(<Identifier>parameter.name);
            const restIndex = node.parameters.length - 1;
            const temp = createLoopVariable();

            // var param = [];
            addNode(statements,
                createVariableStatement(
                    /*modifiers*/ undefined,
                    createVariableDeclarationList([
                        createVariableDeclaration(
                            name,
                            createArrayLiteral([])
                        )
                    ])
                )
            );

            // for (var _i = restIndex; _i < arguments.length; _i++) {
            //   param[_i - restIndex] = arguments[_i];
            // }
            addNode(statements,
                createFor(
                    createVariableDeclarationList([
                        createVariableDeclaration(temp, createLiteral(restIndex))
                    ]),
                    createLessThan(
                        temp,
                        createPropertyAccess(createIdentifier("arguments"), "length")
                    ),
                    createPostfixIncrement(temp),
                    createBlock([
                        startOnNewLine(
                            createStatement(
                                createAssignment(
                                    createElementAccess(
                                        name,
                                        restIndex === 0 ? temp : createSubtract(temp, createLiteral(restIndex))
                                    ),
                                    createElementAccess(createIdentifier("arguments"), temp)
                                )
                            )
                        )
                    ])
                )
            );
        }

        function addCaptureThisForNodeIfNeeded(statements: Statement[], node: Node): void {
            if (node.transformFlags & TransformFlags.ContainsCapturedLexicalThis && node.kind !== SyntaxKind.ArrowFunction) {
                enableExpressionSubstitutionForCapturedThis();

                addNode(statements,
                    createVariableStatement(
                        /*modifiers*/ undefined,
                        createVariableDeclarationList([
                            createVariableDeclaration(
                                "_this",
                                createThis()
                            )
                        ])
                    )
                );
            }
        }

        function addClassMembers(classStatements: Statement[], node: ClassExpression | ClassDeclaration): void {
            for (const member of node.members) {
                switch (member.kind) {
                    case SyntaxKind.SemicolonClassElement:
                        addNode(classStatements, transformSemicolonClassElementToStatement(<SemicolonClassElement>member));
                        break;

                    case SyntaxKind.MethodDeclaration:
                        addNode(classStatements, transformClassMethodDeclarationToStatement(node, <MethodDeclaration>member));
                        break;

                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                        const accessors = getAllAccessorDeclarations(node.members, <AccessorDeclaration>member);
                        if (member === accessors.firstAccessor) {
                            const receiver = getClassMemberPrefix(node, member);
                            addNode(classStatements, transformAccessorsToStatement(receiver, accessors));
                        }

                        break;

                    case SyntaxKind.Constructor:
                        // Constructors are handled in visitClassExpression/visitClassDeclaration
                        break;

                    default:
                        Debug.fail(`Unexpected node kind: ${formatSyntaxKind(node.kind)}.`);
                        break;
                }
            }
        }

        function transformSemicolonClassElementToStatement(member: SemicolonClassElement) {
            return createEmptyStatement(member);
        }

        function transformClassMethodDeclarationToStatement(node: ClassExpression | ClassDeclaration, member: MethodDeclaration) {
            const savedContainingFunction = containingFunction;
            const savedContainingNonArrowFunction = containingNonArrowFunction;
            containingFunction = containingNonArrowFunction = member;
            const statement = createStatement(
                createAssignment(
                    createMemberAccessForPropertyName(
                        getClassMemberPrefix(node, member),
                        visitNode(member.name, visitor, isPropertyName)
                    ),
                    transformFunctionLikeToExpression(member)
                ),
                /*location*/ member
            );

            containingFunction = savedContainingFunction;
            containingNonArrowFunction = savedContainingNonArrowFunction;
            return statement;
        }

        function transformAccessorsToStatement(receiver: LeftHandSideExpression, accessors: AllAccessorDeclarations): Statement {
            const savedContainingFunction = containingFunction;
            const savedContainingNonArrowFunction = containingNonArrowFunction;
            containingFunction = containingNonArrowFunction = accessors.firstAccessor;
            const statement = createStatement(
                transformAccessorsToExpression(receiver, accessors)
            );
            containingFunction = savedContainingFunction;
            containingNonArrowFunction = savedContainingNonArrowFunction;
            return statement;
        }

        function transformAccessorsToExpression(receiver: LeftHandSideExpression, { firstAccessor, getAccessor, setAccessor }: AllAccessorDeclarations): Expression {
            return createObjectDefineProperty(
                receiver,
                createExpressionForPropertyName(
                    visitNode(firstAccessor.name, visitor, isPropertyName),
                    /*location*/ firstAccessor.name
                ),
                {
                    get: getAccessor && transformFunctionLikeToExpression(getAccessor, /*location*/ getAccessor),
                    set: setAccessor && transformFunctionLikeToExpression(setAccessor, /*location*/ setAccessor),
                    enumerable: true,
                    configurable: true
                },
                /*preferNewLine*/ true,
                /*location*/ firstAccessor
            );
        }

        function transformFunctionLikeToExpression(node: FunctionLikeDeclaration, location?: TextRange, name?: Identifier): FunctionExpression {
            return setOriginalNode(
                createFunctionExpression(
                    /*asteriskToken*/ undefined,
                    name,
                    visitNodes(node.parameters, visitor, isParameter),
                    transformFunctionBody(node),
                    location
                ),
                node
            );
        }

        function visitArrowFunction(node: ArrowFunction) {
            if (node.transformFlags & TransformFlags.ContainsLexicalThis) {
                enableExpressionSubstitutionForCapturedThis();
            }

            return transformFunctionLikeToExpression(node, /*location*/ node, /*name*/ undefined);
        }

        function visitFunctionExpression(node: FunctionExpression): Expression {
            return transformFunctionLikeToExpression(node, /*location*/ node, node.name);
        }

        function visitFunctionDeclaration(node: FunctionDeclaration): FunctionDeclaration {
            return setOriginalNode(
                createFunctionDeclaration(
                    /*modifiers*/ undefined,
                    node.asteriskToken, // TODO(rbuckton): downlevel support for generators
                    node.name,
                    visitNodes(node.parameters, visitor, isParameter),
                    transformFunctionBody(node),
                    /*location*/ node
                ),
                node
            );
        }

        function transformFunctionBody(node: FunctionLikeDeclaration) {
            const statements: Statement[] = [];
            startLexicalEnvironment();
            addCaptureThisForNodeIfNeeded(statements, node);
            addDefaultValueAssignments(statements, node);
            addRestParameter(statements, node);

            const body = node.body;
            if (isBlock(body)) {
                addNodes(statements, visitNodes(body.statements, visitor, isStatement));
            }
            else {
                const expression = visitNode(body, visitor, isExpression);
                if (expression) {
                    addNode(statements, createReturn(expression, /*location*/ body));
                }
            }

            addNodes(statements, endLexicalEnvironment());
            return createBlock(statements, node.body);
        }

        function visitBinaryExpression(node: BinaryExpression): Expression {
            // If we are here it is because this is a destructuring assignment.
            // TODO(rbuckton): Determine whether we need to save the value.
            return flattenDestructuringAssignment(node, /*needsValue*/ true, hoistVariableDeclaration, visitor);
        }

        function visitVariableDeclarationList(node: VariableDeclarationList): VariableDeclarationList {
            return setOriginalNode(
                createVariableDeclarationList(
                    flattenNodes(map(node.declarations, visitVariableDeclaration)),
                    /*location*/ node
                ),
                node
            );
        }

        function visitVariableDeclaration(node: VariableDeclaration): OneOrMany<VariableDeclaration> {
            const name = node.name;
            if (isBindingPattern(name)) {
                return createNodeArrayNode(
                    flattenVariableDestructuring(node, /*value*/ undefined, visitor)
                );
            }
            else {
                let initializer = node.initializer;
                // For binding pattern names that lack initializer there is no point to emit
                // explicit initializer since downlevel codegen for destructuring will fail
                // in the absence of initializer so all binding elements will say uninitialized
                if (!initializer) {
                    const original = getOriginalNode(node);
                    if (isVariableDeclaration(original)) {
                        // Nested let bindings might need to be initialized explicitly to preserve
                        // ES6 semantic:
                        //
                        //  { let x = 1; }
                        //  { let x; } // x here should be undefined. not 1
                        //
                        // Top level bindings never collide with anything and thus don't require
                        // explicit initialization. As for nested let bindings there are two cases:
                        //
                        // - Nested let bindings that were not renamed definitely should be
                        //   initialized explicitly:
                        //
                        //    { let x = 1; }
                        //    { let x; if (some-condition) { x = 1}; if (x) { /*1*/ } }
                        //
                        //   Without explicit initialization code in /*1*/ can be executed even if
                        //   some-condition is evaluated to false.
                        //
                        // - Renaming introduces fresh name that should not collide with any
                        //   existing names, however renamed bindings sometimes also should be
                        //   explicitly initialized. One particular case: non-captured binding
                        //   declared inside loop body (but not in loop initializer):
                        //
                        //    let x;
                        //    for (;;) {
                        //        let x;
                        //    }
                        //
                        //   In downlevel codegen inner 'x' will be renamed so it won't collide
                        //   with outer 'x' however it will should be reset on every iteration as
                        //   if it was declared anew.
                        //
                        //   * Why non-captured binding?
                        //     - Because if loop contains block scoped binding captured in some
                        //       function then loop body will be rewritten to have a fresh scope
                        //       on every iteration so everything will just work.
                        //
                        //   * Why loop initializer is excluded?
                        //     - Since we've introduced a fresh name it already will be undefined.

                        const flags = resolver.getNodeCheckFlags(original);
                        const isCapturedInFunction = flags & NodeCheckFlags.CapturedBlockScopedBinding;
                        const isDeclaredInLoop = flags & NodeCheckFlags.BlockScopedBindingInLoop;

                        const emittedAsTopLevel =
                            isBlockScopedContainerTopLevel(enclosingBlockScopeContainer)
                            || (isCapturedInFunction
                                && isDeclaredInLoop
                                && isBlock(enclosingBlockScopeContainer)
                                && isIterationStatement(enclosingBlockScopeContainerParent, /*lookInLabeledStatements*/ false));

                        const emittedAsNestedLetDeclaration = combinedNodeFlags & NodeFlags.Let && !emittedAsTopLevel;

                        const emitExplicitInitializer =
                            emittedAsNestedLetDeclaration
                            && enclosingBlockScopeContainer.kind !== SyntaxKind.ForInStatement
                            && enclosingBlockScopeContainer.kind !== SyntaxKind.ForOfStatement
                            && (!resolver.isDeclarationWithCollidingName(original)
                                || (isDeclaredInLoop
                                    && !isCapturedInFunction
                                    && !isIterationStatement(enclosingBlockScopeContainer, /*lookInLabeledStatements*/ false)));

                        if (emitExplicitInitializer) {
                            initializer = createVoidZero();
                        }
                    }
                }

                return setOriginalNode(
                    createVariableDeclaration(
                        name,
                        visitNode(initializer, visitor, isExpression, /*optional*/ true),
                        /*location*/ node
                    ),
                    node
                );
            }
        }

        function visitLabeledStatement(node: LabeledStatement) {
            // TODO: Convert loop body for block scoped bindings.
            return visitEachChild(node, visitor, context);
        }

        function visitDoStatement(node: DoStatement) {
            // TODO: Convert loop body for block scoped bindings.
            return visitEachChild(node, visitor, context);
        }

        function visitWhileStatement(node: WhileStatement) {
            // TODO: Convert loop body for block scoped bindings.
            return visitEachChild(node, visitor, context);
        }

        function visitForStatement(node: ForStatement) {
            // TODO: Convert loop body for block scoped bindings.
            return visitEachChild(node, visitor, context);
        }


        function visitForInStatement(node: ForInStatement) {
            // TODO: Convert loop body for block scoped bindings.
            return visitEachChild(node, visitor, context);
        }

        function visitForOfStatement(node: ForOfStatement): Statement {
            // TODO: Convert loop body for block scoped bindings.

            // The following ES6 code:
            //
            //    for (let v of expr) { }
            //
            // should be emitted as
            //
            //    for (var _i = 0, _a = expr; _i < _a.length; _i++) {
            //        var v = _a[_i];
            //    }
            //
            // where _a and _i are temps emitted to capture the RHS and the counter,
            // respectively.
            // When the left hand side is an expression instead of a let declaration,
            // the "let v" is not emitted.
            // When the left hand side is a let/const, the v is renamed if there is
            // another v in scope.
            // Note that all assignments to the LHS are emitted in the body, including
            // all destructuring.
            // Note also that because an extra statement is needed to assign to the LHS,
            // for-of bodies are always emitted as blocks.

            const expression = visitNode(node.expression, visitor, isExpression);
            const initializer = node.initializer;
            const loopBodyStatements: Statement[] = [];

            // In the case where the user wrote an identifier as the RHS, like this:
            //
            //     for (let v of arr) { }
            //
            // we don't want to emit a temporary variable for the RHS, just use it directly.
            const counter = createLoopVariable();
            const rhsReference = expression.kind === SyntaxKind.Identifier
                ? createUniqueName((<Identifier>expression).text)
                : createTempVariable();

            // Initialize LHS
            // var v = _a[_i];
            if (isVariableDeclarationList(initializer)) {
                const firstDeclaration = firstOrUndefined(initializer.declarations);
                if (firstDeclaration && isBindingPattern(firstDeclaration.name)) {
                    // This works whether the declaration is a var, let, or const.
                    // It will use rhsIterationValue _a[_i] as the initializer.
                    addNode(loopBodyStatements,
                        createVariableStatement(
                            /*modifiers*/ undefined,
                            createVariableDeclarationList(
                                flattenVariableDestructuring(
                                    firstDeclaration,
                                    createElementAccess(rhsReference, counter),
                                    visitor
                                )
                            ),
                            /*location*/ initializer
                        )
                    );
                }
                else {
                    // The following call does not include the initializer, so we have
                    // to emit it separately.
                    addNode(loopBodyStatements,
                        createVariableStatement(
                            /*modifiers*/ undefined,
                            createVariableDeclarationList([
                                createVariableDeclaration(
                                    firstDeclaration ? firstDeclaration.name : createTempVariable(),
                                    createElementAccess(rhsReference, counter)
                                )
                            ]),
                            /*location*/ initializer
                        )
                    );
                }
            }
            else {
                // Initializer is an expression. Emit the expression in the body, so that it's
                // evaluated on every iteration.
                const assignment = createAssignment(initializer, createElementAccess(rhsReference, counter));
                if (isDestructuringAssignment(assignment)) {
                    // This is a destructuring pattern, so we flatten the destructuring instead.
                    addNode(loopBodyStatements,
                        createStatement(
                            flattenDestructuringAssignment(
                                assignment,
                                /*needsValue*/ false,
                                hoistVariableDeclaration,
                                visitor
                            )
                        )
                    );
                }
                else {
                    addNode(loopBodyStatements, createStatement(assignment, /*location*/ node.initializer));
                }
            }

            const statement = visitNode(node.statement, visitor, isStatement);
            if (isBlock(statement)) {
                addNodes(loopBodyStatements, statement.statements);
            }
            else {
                addNode(loopBodyStatements, statement);
            }

            return createFor(
                createVariableDeclarationList(
                    [
                        createVariableDeclaration(counter, createLiteral(0), /*location*/ node.expression),
                        createVariableDeclaration(rhsReference, expression, /*location*/ node.expression)
                    ],
                    /*location*/ node.expression
                ),
                createLessThan(
                    counter,
                    createPropertyAccess(rhsReference, "length"),
                    /*location*/ initializer
                ),
                createPostfixIncrement(counter, /*location*/ initializer),
                createBlock(
                    loopBodyStatements
                ),
                /*location*/ node
            );
        }

        function visitObjectLiteralExpression(node: ObjectLiteralExpression): LeftHandSideExpression {
            // We are here because a ComputedPropertyName was used somewhere in the expression.
            const properties = node.properties;
            const numProperties = properties.length;

            // Find the first computed property.
            // Everything until that point can be emitted as part of the initial object literal.
            let numInitialNonComputedProperties = numProperties;
            for (let i = 0, n = properties.length; i < n; i++) {
                if (properties[i].name.kind === SyntaxKind.ComputedPropertyName) {
                    numInitialNonComputedProperties = i;
                    break;
                }
            }

            Debug.assert(numInitialNonComputedProperties !== numProperties);

            // For computed properties, we need to create a unique handle to the object
            // literal so we can modify it without risking internal assignments tainting the object.
            const temp = createTempVariable();
            hoistVariableDeclaration(temp);

            // Write out the first non-computed properties, then emit the rest through indexing on the temp variable.
            const expressions: Expression[] = [];
            addNode(expressions,
                createAssignment(
                    temp,
                    setMultiLine(
                        createObjectLiteral(
                            visitNodes(properties, visitor, isObjectLiteralElement, 0, numInitialNonComputedProperties)
                        ),
                        node.multiLine
                    )
                ),
                node.multiLine
            );

            addObjectLiteralMembers(expressions, node, temp, numInitialNonComputedProperties);

            // We need to clone the temporary identifier so that we can write it on a
            // new line
            addNode(expressions, cloneNode(temp), node.multiLine);
            return createParen(inlineExpressions(expressions));
        }

        function addObjectLiteralMembers(expressions: Expression[], node: ObjectLiteralExpression, receiver: Identifier, numInitialNonComputedProperties: number) {
            const properties = node.properties;
            for (let i = numInitialNonComputedProperties, len = properties.length; i < len; i++) {
                const property = properties[i];
                switch (property.kind) {
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                        const accessors = getAllAccessorDeclarations(node.properties, <AccessorDeclaration>property);
                        if (property === accessors.firstAccessor) {
                            addNode(expressions, transformAccessorsToExpression(receiver, accessors), node.multiLine);
                        }

                        break;

                    case SyntaxKind.PropertyAssignment:
                        addNode(expressions, transformPropertyAssignmentToExpression(node, <PropertyAssignment>property, receiver), node.multiLine);
                        break;

                    case SyntaxKind.ShorthandPropertyAssignment:
                        addNode(expressions, transformShorthandPropertyAssignmentToExpression(node, <ShorthandPropertyAssignment>property, receiver), node.multiLine);
                        break;

                    case SyntaxKind.MethodDeclaration:
                        addNode(expressions, transformObjectLiteralMethodDeclarationToExpression(node, <MethodDeclaration>property, receiver), node.multiLine);
                        break;

                    default:
                        Debug.fail(`Unexpected node kind: ${formatSyntaxKind(node.kind)}.`);
                        break;
                }
            }
        }

        function transformPropertyAssignmentToExpression(node: ObjectLiteralExpression, property: PropertyAssignment, receiver: Expression) {
            return createAssignment(
                createMemberAccessForPropertyName(
                    receiver,
                    visitNode(property.name, visitor, isPropertyName)
                ),
                visitNode(property.initializer, visitor, isExpression),
                /*location*/ property
            );
        }

        function transformShorthandPropertyAssignmentToExpression(node: ObjectLiteralExpression, property: ShorthandPropertyAssignment, receiver: Expression) {
            return createAssignment(
                createMemberAccessForPropertyName(
                    receiver,
                    visitNode(property.name, visitor, isPropertyName)
                ),
                getSynthesizedClone(property.name),
                /*location*/ property
            );
        }

        function transformObjectLiteralMethodDeclarationToExpression(node: ObjectLiteralExpression, method: MethodDeclaration, receiver: Expression) {
            return createAssignment(
                createMemberAccessForPropertyName(
                    receiver,
                    visitNode(method.name, visitor, isPropertyName)
                ),
                transformFunctionLikeToExpression(method, /*location*/ method),
                /*location*/ method
            );
        }

        function visitMethodDeclaration(node: MethodDeclaration): ObjectLiteralElement {
            // We should only get here for methods on an object literal with regular identifier names.
            // Methods on classes are handled in visitClassDeclaration/visitClassExpression.
            // Methods with computed property names are handled in visitObjectLiteralExpression.
            Debug.assert(isIdentifier(node.name), `Unexpected node kind: ${formatSyntaxKind(node.name.kind)}.`);
            return createPropertyAssignment(
                node.name,
                transformFunctionLikeToExpression(node, /*location*/ node),
                /*location*/ node
            );
        }

        function visitShorthandPropertyAssignment(node: ShorthandPropertyAssignment): ObjectLiteralElement {
            return createPropertyAssignment(
                node.name,
                getSynthesizedClone(node.name),
                /*location*/ node
            );
        }

        function visitArrayLiteralExpression(node: ArrayLiteralExpression): Expression {
            // We are here either because SuperKeyword was used somewhere in the expression, or
            // because we contain a SpreadElementExpression.
            if (node.transformFlags & TransformFlags.ContainsSpreadElementExpression) {
                return transformAndSpreadElements(node.elements, /*needsUniqueCopy*/ true, node.multiLine);
            }
            else {
                // We don't handle SuperKeyword here, so fall back.
                return visitEachChild(node, visitor, context);
            }
        }

        function visitCallExpression(node: CallExpression): LeftHandSideExpression {
            // We are here either because SuperKeyword was used somewhere in the expression, or
            // because we contain a SpreadElementExpression.
            const { target, thisArg } = transformCallTarget(node.expression);
            if (node.transformFlags & TransformFlags.ContainsSpreadElementExpression) {
                return createFunctionApply(
                    target,
                    thisArg,
                    transformAndSpreadElements(node.arguments, /*needsUniqueCopy*/ false, /*multiLine*/ false)
                );
            }
            else {
                Debug.assert(isSuperCall(node));
                return createFunctionCall(
                    target,
                    thisArg,
                    visitNodes(node.arguments, visitor, isExpression),
                    /*location*/ node
                );
            }
        }

        function visitNewExpression(node: NewExpression): LeftHandSideExpression {
            // We are here either because we contain a SpreadElementExpression.
            Debug.assert((node.transformFlags & TransformFlags.ContainsSpreadElementExpression) !== 0);

            // Transforms `new C(...a)` into `new ((_a = C).bind.apply(_a, [void 0].concat(a)))()`.
            // Transforms `new x.C(...a)` into `new ((_a = x.C).bind.apply(_a, [void 0].concat(a)))()`.
            const { target, thisArg } = transformCallTarget(createPropertyAccess(node.expression, "bind"));
            return createNew(
                createParen(
                    createFunctionApply(
                        target,
                        thisArg,
                        transformAndSpreadElements(node.arguments, /*needsUniqueCopy*/ false, /*multiLine*/ false, createVoidZero())
                    )
                ),
                []
            );
        }

        interface CallTarget {
            target: Expression;
            thisArg: Expression;
        }

        function transformCallTarget(expression: Expression): CallTarget {
            const callee = skipParentheses(expression);
            switch (callee.kind) {
                case SyntaxKind.PropertyAccessExpression:
                    return transformPropertyAccessCallTarget(<PropertyAccessExpression>callee);

                case SyntaxKind.ElementAccessExpression:
                    return transformElementAccessCallTarget(<ElementAccessExpression>callee);

                case SyntaxKind.SuperKeyword:
                    return transformSuperCallTarget(<PrimaryExpression>callee);

                default:
                    const thisArg = createVoidZero();
                    const target = visitNode(expression, visitor, isExpression);
                    return { target, thisArg };
            }
        }

        function transformPropertyAccessCallTarget(node: PropertyAccessExpression): CallTarget {
            if (node.expression.kind === SyntaxKind.SuperKeyword) {
                // For `super.b()`, target is either `_super.b` (for static members) or
                // `_super.prototype.b` (for instance members), and thisArg is `this`.
                const thisArg = createThis(/*location*/ node.expression);
                const target = createPropertyAccess(
                    visitSuperKeyword(<PrimaryExpression>node.expression),
                    node.name
                );

                return { target, thisArg };
            }
            else {
                // For `a.b()`, target is `(_a = a).b` and thisArg is `_a`.
                const thisArg = createTempVariable();
                const target = createPropertyAccess(
                    createAssignment(
                        thisArg,
                        visitNode(node.expression, visitor, isExpression)
                    ),
                    node.name
                );

                return { target, thisArg };
            }
        }

        function transformElementAccessCallTarget(node: ElementAccessExpression): CallTarget {
            if (node.expression.kind === SyntaxKind.SuperKeyword) {
                // For `super[b]()`, target is either `_super[b]` (for static members) or
                // `_super.prototype[b]` (for instance members), and thisArg is `this`.
                const thisArg = createThis(/*location*/ node.expression);
                const target = createElementAccess(
                    visitSuperKeyword(<PrimaryExpression>node.expression),
                    visitNode(node.argumentExpression, visitor, isExpression)
                );

                return { target, thisArg };
            }
            else {
                // For `a[b]()`, expression is `(_a = a)[b]` and thisArg is `_a`.
                const thisArg = createTempVariable();
                const target = createElementAccess(
                    createAssignment(
                        thisArg,
                        visitNode(node.expression, visitor, isExpression)
                    ),
                    visitNode(node.argumentExpression, visitor, isExpression)
                );

                return { target, thisArg };
            }
        }

        function transformSuperCallTarget(node: PrimaryExpression): CallTarget {
            // For `super()`, expression is `_super` and thisArg is `this`.
            const thisArg = createThis(/*location*/ node);
            const target = createIdentifier("_super");
            return { target, thisArg };
        }

        function transformAndSpreadElements(elements: NodeArray<Expression>, needsUniqueCopy: boolean, multiLine: boolean, leadingExpression?: Expression): Expression {
            const segments: Expression[] = [];
            addNode(segments, leadingExpression);

            const length = elements.length;
            let start = 0;
            for (let i = 0; i < length; i++) {
                const element = elements[i];
                if (isSpreadElementExpression(element)) {
                    if (i > start) {
                        addNode(segments,
                            setMultiLine(
                                createArrayLiteral(
                                    visitNodes(elements, visitor, isExpression, start, i)
                                ),
                                multiLine
                            )
                        );
                    }

                    addNode(segments, visitNode(element.expression, visitor, isExpression));
                    start = i + 1;
                }
            }

            if (start < length) {
                addNode(segments,
                    setMultiLine(
                        createArrayLiteral(
                            visitNodes(elements, visitor, isExpression, start, length)
                        ),
                        multiLine
                    )
                );
            }

            if (segments.length === 1) {
                if (!leadingExpression && needsUniqueCopy && isSpreadElementExpression(elements[0])) {
                    return createArraySlice(segments[0]);
                }

                return segments[0];
            }

            // Rewrite using the pattern <segment0>.concat(<segment1>, <segment2>, ...)
            return createArrayConcat(segments.shift(), segments);
        }

        function visitTemplateLiteral(node: LiteralExpression): LeftHandSideExpression {
            return createLiteral(node.text);
        }

        function visitTaggedTemplateExpression(node: TaggedTemplateExpression): LeftHandSideExpression {
            // Visit the tag expression
            const tag = visitNode(node.tag, visitor, isExpression);

            // Allocate storage for the template site object
            const temp = createTempVariable();
            hoistVariableDeclaration(temp);

            // Build up the template arguments and the raw and cooked strings for the template.
            const templateArguments: Expression[] = [temp];
            const cookedStrings: Expression[] = [];
            const rawStrings: Expression[] = [];
            const template = node.template;
            if (isNoSubstitutionTemplateLiteral(template)) {
                addNode(cookedStrings, createLiteral(template.text));
                addNode(rawStrings, getRawLiteral(template));
            }
            else {
                addNode(cookedStrings, createLiteral(template.head.text));
                addNode(rawStrings, getRawLiteral(template.head));
                for (const templateSpan of template.templateSpans) {
                    addNode(cookedStrings, createLiteral(templateSpan.literal.text));
                    addNode(rawStrings, getRawLiteral(templateSpan.literal));
                    addNode(templateArguments, visitNode(templateSpan.expression, visitor, isExpression));
                }
            }

            return createParen(
                inlineExpressions([
                    createAssignment(temp, createArrayLiteral(cookedStrings)),
                    createAssignment(createPropertyAccess(temp, "raw"), createArrayLiteral(rawStrings)),
                    createCall(
                        tag,
                        templateArguments
                    )
                ])
            );
        }

        function getRawLiteral(node: LiteralLikeNode) {
            // Find original source text, since we need to emit the raw strings of the tagged template.
            // The raw strings contain the (escaped) strings of what the user wrote.
            // Examples: `\n` is converted to "\\n", a template string with a newline to "\n".
            let text = getSourceTextOfNodeFromSourceFile(currentSourceFile, node);

            // text contains the original source, it will also contain quotes ("`"), dolar signs and braces ("${" and "}"),
            // thus we need to remove those characters.
            // First template piece starts with "`", others with "}"
            // Last template piece ends with "`", others with "${"
            const isLast = node.kind === SyntaxKind.NoSubstitutionTemplateLiteral || node.kind === SyntaxKind.TemplateTail;
            text = text.substring(1, text.length - (isLast ? 1 : 2));

            // Newline normalization:
            // ES6 Spec 11.8.6.1 - Static Semantics of TV's and TRV's
            // <CR><LF> and <CR> LineTerminatorSequences are normalized to <LF> for both TV and TRV.
            text = text.replace(/\r\n?/g, "\n");
            text = escapeString(text);
            return createLiteral(text);
        }

        function visitTemplateExpression(node: TemplateExpression): Expression {
            const expressions: Expression[] = [];
            addTemplateHead(expressions, node);
            addTemplateSpans(expressions, node.templateSpans);

            // createAdd will check if each expression binds less closely than binary '+'.
            // If it does, it wraps the expression in parentheses. Otherwise, something like
            //    `abc${ 1 << 2 }`
            // becomes
            //    "abc" + 1 << 2 + ""
            // which is really
            //    ("abc" + 1) << (2 + "")
            // rather than
            //    "abc" + (1 << 2) + ""
            const expression = reduceLeft(expressions, createAdd);
            if (nodeIsSynthesized(expression)) {
                setTextRange(expression, node);
            }

            return expression;
        }

        function shouldAddTemplateHead(node: TemplateExpression) {
            // If this expression has an empty head literal and the first template span has a non-empty
            // literal, then emitting the empty head literal is not necessary.
            //     `${ foo } and ${ bar }`
            // can be emitted as
            //     foo + " and " + bar
            // This is because it is only required that one of the first two operands in the emit
            // output must be a string literal, so that the other operand and all following operands
            // are forced into strings.
            //
            // If the first template span has an empty literal, then the head must still be emitted.
            //     `${ foo }${ bar }`
            // must still be emitted as
            //     "" + foo + bar

            // There is always atleast one templateSpan in this code path, since
            // NoSubstitutionTemplateLiterals are directly emitted via emitLiteral()
            Debug.assert(node.templateSpans.length !== 0);

            return node.head.text.length !== 0 || node.templateSpans[0].literal.text.length === 0;
        }

        function addTemplateHead(expressions: Expression[], node: TemplateExpression): void {
            if (!shouldAddTemplateHead(node)) {
                return;
            }

            addNode(expressions, createLiteral(node.head.text));
        }

        function addTemplateSpans(expressions: Expression[], nodes: TemplateSpan[]): void {
            for (const node of nodes) {
                addNode(expressions, visitNode(node.expression, visitor, isExpression));

                // Only emit if the literal is non-empty.
                // The binary '+' operator is left-associative, so the first string concatenation
                // with the head will force the result up to this point to be a string.
                // Emitting a '+ ""' has no semantic effect for middles and tails.
                if (node.literal.text.length !== 0) {
                    addNode(expressions, createLiteral(node.literal.text));
                }
            }
        }

        function visitSuperKeyword(node: PrimaryExpression): LeftHandSideExpression {
            return containingNonArrowFunction
                && isClassElement(containingNonArrowFunction)
                && (containingNonArrowFunction.flags & NodeFlags.Static) === 0
                    ? createPropertyAccess(createIdentifier("_super"), "prototype")
                    : createIdentifier("_super");
        }

        function visitSourceFileNode(node: SourceFile): SourceFile {
            const clone = cloneNode(node, node, node.flags, /*parent*/ undefined, node);
            const statements: Statement[] = [];
            startLexicalEnvironment();
            const statementOffset = addPrologueDirectives(statements, node.statements);
            addCaptureThisForNodeIfNeeded(statements, node);
            addNodes(statements, visitNodes(node.statements, visitor, isStatement, statementOffset));
            addNodes(statements, endLexicalEnvironment());
            clone.statements = createNodeArray(statements, node.statements);
            return clone;
        }

        function addPrologueDirectives(to: Statement[], from: NodeArray<Statement>): number {
            for (let i = 0; i < from.length; i++) {
                if (isPrologueDirective(from[i])) {
                    addNode(to, from[i]);
                }
                else {
                    return i;
                }
            }

            return from.length;
        }

        function onBeforeEmitNode(node: Node) {
            previousOnBeforeEmitNode(node);

            if (containingFunctionStack && isFunctionLike(node)) {
                containingFunctionStack.push(node);
            }
        }

        function onAfterEmitNode(node: Node) {
            previousOnAfterEmitNode(node);

            if (containingFunctionStack && isFunctionLike(node)) {
                containingFunctionStack.pop();
            }
        }

        function enableExpressionSubstitutionForCapturedThis() {
            if (!hasEnabledExpressionSubstitutionForCapturedThis) {
                hasEnabledExpressionSubstitutionForCapturedThis = true;
                enableExpressionSubstitution(SyntaxKind.ThisKeyword);
                enableEmitNotification(SyntaxKind.Constructor);
                enableEmitNotification(SyntaxKind.MethodDeclaration);
                enableEmitNotification(SyntaxKind.GetAccessor);
                enableEmitNotification(SyntaxKind.SetAccessor);
                enableEmitNotification(SyntaxKind.ArrowFunction);
                enableEmitNotification(SyntaxKind.FunctionExpression);
                enableEmitNotification(SyntaxKind.FunctionDeclaration);
                containingFunctionStack = [];
            }
        }

        function substituteIdentifier(node: Identifier) {
            node = previousIdentifierSubstitution(node);

            const original = getOriginalNode(node);
            if (isIdentifier(original) && isNameOfDeclarationWithCollidingName(original)) {
                return getGeneratedNameForNode(original);
            }

            return node;
        }

        function isNameOfDeclarationWithCollidingName(node: Identifier) {
            const parent = node.parent;
            if (parent) {
                switch (parent.kind) {
                    case SyntaxKind.BindingElement:
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.VariableDeclaration:
                        return (<Declaration>parent).name === node
                            && resolver.isDeclarationWithCollidingName(<Declaration>parent);
                }
            }

            return false;
        }


        function substituteExpression(node: Expression): Expression {
            node = previousExpressionSubstitution(node);
            switch (node.kind) {
                case SyntaxKind.Identifier:
                    return substituteExpressionIdentifier(<Identifier>node);

                case SyntaxKind.ThisKeyword:
                    return substituteThisKeyword(<PrimaryExpression>node);
            }

            return node;
        }

        function substituteExpressionIdentifier(node: Identifier): Identifier {
            const original = getOriginalNode(node);
            if (isIdentifier(original)) {
                const declaration = resolver.getReferencedDeclarationWithCollidingName(original);
                if (declaration) {
                    return getGeneratedNameForNode(declaration.name);
                }
            }

            return node;
        }

        function substituteThisKeyword(node: PrimaryExpression): PrimaryExpression {
            if (containingFunctionStack) {
                const containingFunction = lastOrUndefined(containingFunctionStack);
                if (containingFunction && getOriginalNode(containingFunction).kind === SyntaxKind.ArrowFunction) {
                    return createIdentifier("_this");
                }
            }

            return node;
        }

        function getDeclarationName(node: ClassExpression | ClassDeclaration | FunctionDeclaration) {
            return node.name ? getSynthesizedClone(node.name) : getGeneratedNameForNode(node);
        }

        function getClassMemberPrefix(node: ClassExpression | ClassDeclaration, member: ClassElement) {
            const expression = getDeclarationName(node);
            return member.flags & NodeFlags.Static ? expression : createPropertyAccess(expression, "prototype");
        }

        function hasSynthesizedDefaultSuperCall(constructor: ConstructorDeclaration, hasExtendsClause: boolean) {
            if (!constructor || !hasExtendsClause) {
                return false;
            }

            const parameter = singleOrUndefined(constructor.parameters);
            if (!parameter || !nodeIsSynthesized(parameter) || !parameter.dotDotDotToken) {
                return false;
            }

            const statement = firstOrUndefined(constructor.body.statements);
            if (!statement || !nodeIsSynthesized(statement) || statement.kind !== SyntaxKind.ExpressionStatement) {
                return false;
            }

            const statementExpression = (<ExpressionStatement>statement).expression;
            if (!nodeIsSynthesized(statementExpression) || statementExpression.kind !== SyntaxKind.CallExpression) {
                return false;
            }

            const callTarget = (<CallExpression>statementExpression).expression;
            if (!nodeIsSynthesized(callTarget) || callTarget.kind !== SyntaxKind.SuperKeyword) {
                return false;
            }

            const callArgument = singleOrUndefined((<CallExpression>statementExpression).arguments);
            if (!callArgument || !nodeIsSynthesized(callArgument) || callArgument.kind !== SyntaxKind.SpreadElementExpression) {
                return false;
            }

            const expression = (<SpreadElementExpression>callArgument).expression;
            return isIdentifier(expression) && expression === parameter.name;
        }
    }
}