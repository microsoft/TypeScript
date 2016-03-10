/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />

/*@internal*/
namespace ts {

    const enum ES6SubstitutionFlags {
        /** Enables substitutions for captured `this` */
        CapturedThis = 1 << 0,
        /** Enables substitutions for block-scoped bindings. */
        BlockScopedBindings = 1 << 1,
    }

    export function transformES6(context: TransformationContext) {
        const {
            startLexicalEnvironment,
            endLexicalEnvironment,
            hoistVariableDeclaration,
            getNodeEmitFlags,
            setNodeEmitFlags,
        } = context;

        const resolver = context.getEmitResolver();
        const previousIdentifierSubstitution = context.identifierSubstitution;
        const previousExpressionSubstitution = context.expressionSubstitution;
        const previousOnEmitNode = context.onEmitNode;
        context.onEmitNode = onEmitNode;
        context.identifierSubstitution = substituteIdentifier;
        context.expressionSubstitution = substituteExpression;

        let currentSourceFile: SourceFile;
        let currentParent: Node;
        let currentNode: Node;
        let enclosingBlockScopeContainer: Node;
        let enclosingBlockScopeContainerParent: Node;
        let containingNonArrowFunction: FunctionLikeDeclaration;

        /**
         * Keeps track of whether substitutions have been enabled for specific cases.
         * They are persisted between each SourceFile transformation and should not
         * be reset.
         */
        let enabledSubstitutions: ES6SubstitutionFlags;

        /**
         * This is used to determine whether we need to emit `_this` instead of `this`.
         */
        let useCapturedThis: boolean;

        return transformSourceFile;

        function transformSourceFile(node: SourceFile) {
            currentSourceFile = node;
            enclosingBlockScopeContainer = node;
            return visitEachChild(node, visitor, context);
        }

        function visitor(node: Node): VisitResult<Node> {
            const savedContainingNonArrowFunction = containingNonArrowFunction;
            const savedCurrentParent = currentParent;
            const savedCurrentNode = currentNode;
            const savedEnclosingBlockScopeContainer = enclosingBlockScopeContainer;
            const savedEnclosingBlockScopeContainerParent = enclosingBlockScopeContainerParent;

            onBeforeVisitNode(node);

            const visited = visitorWorker(node);

            containingNonArrowFunction = savedContainingNonArrowFunction;
            currentParent = savedCurrentParent;
            currentNode = savedCurrentNode;
            enclosingBlockScopeContainer = savedEnclosingBlockScopeContainer;
            enclosingBlockScopeContainerParent = savedEnclosingBlockScopeContainerParent;
            return visited;
        }

        function visitorWorker(node: Node): VisitResult<Node> {
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

        function visitJavaScript(node: Node): VisitResult<Node> {
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

                case SyntaxKind.ExpressionStatement:
                    return visitExpressionStatement(<ExpressionStatement>node);

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

                case SyntaxKind.ParenthesizedExpression:
                    return visitParenthesizedExpression(<ParenthesizedExpression>node, /*needsDestructuringValue*/ true);

                case SyntaxKind.BinaryExpression:
                    return visitBinaryExpression(<BinaryExpression>node, /*needsDestructuringValue*/ true);

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

                default:
                    Debug.failBadSyntaxKind(node);
                    return visitEachChild(node, visitor, context);
            }

        }

        function onBeforeVisitNode(node: Node) {
            const currentGrandparent = currentParent;
            currentParent = currentNode;
            currentNode = node;

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
                        break;
                }
            }
        }

        /**
         * Visits a ClassDeclaration and transforms it into a variable statement.
         *
         * @parma node A ClassDeclaration node.
         */
        function visitClassDeclaration(node: ClassDeclaration): Statement {
            // [source]
            //      class C { }
            //
            // [output]
            //      var C = (function () {
            //          function C() {
            //          }
            //          return C;
            //      }());

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

        /**
         * Visits a ClassExpression and transforms it into an expression.
         *
         * @param node A ClassExpression node.
         */
        function visitClassExpression(node: ClassExpression): Expression {
            // [source]
            //      C = class { }
            //
            // [output]
            //      C = (function () {
            //          function class_1() {
            //          }
            //          return class_1;
            //      }())

            return transformClassLikeDeclarationToExpression(node);
        }

        /**
         * Transforms a ClassExpression or ClassDeclaration into an expression.
         *
         * @param node A ClassExpression or ClassDeclaration node.
         */
        function transformClassLikeDeclarationToExpression(node: ClassExpression | ClassDeclaration): Expression {
            // [source]
            //      class C extends D {
            //          constructor() {}
            //          method() {}
            //          get prop() {}
            //          set prop(v) {}
            //      }
            //
            // [output]
            //      (function (_super) {
            //          __extends(C, _super);
            //          function C() {
            //          }
            //          C.prototype.method = function () {}
            //          Object.defineProperty(C.prototype, "prop", {
            //              get: function() {},
            //              set: function() {},
            //              enumerable: true,
            //              configurable: true
            //          });
            //          return C;
            //      }(D))

            const baseTypeNode = getClassExtendsHeritageClauseElement(node);
            return createParen(
                createCall(
                    createFunctionExpression(
                        /*asteriskToken*/ undefined,
                        /*name*/ undefined,
                        baseTypeNode ? [createParameter("_super")] : [],
                        transformClassBody(node, baseTypeNode !== undefined)
                    ),
                    baseTypeNode
                        ? [visitNode(baseTypeNode.expression, visitor, isExpression)]
                        : []
                )
            );
        }

        /**
         * Transforms a ClassExpression or ClassDeclaration into a function body.
         *
         * @param node A ClassExpression or ClassDeclaration node.
         * @param hasExtendsClause A value indicating whether the class has an `extends` clause.
         */
        function transformClassBody(node: ClassExpression | ClassDeclaration, hasExtendsClause: boolean): Block {
            const statements: Statement[] = [];
            startLexicalEnvironment();
            addExtendsHelperIfNeeded(statements, node, hasExtendsClause);
            addConstructor(statements, node, hasExtendsClause);
            addClassMembers(statements, node);
            statements.push(createReturn(getDeclarationName(node)));
            addRange(statements, endLexicalEnvironment());
            return createBlock(statements, /*location*/ undefined, /*multiLine*/ true);
        }

        /**
         * Adds a call to the `__extends` helper if needed for a class.
         *
         * @param statements The statements of the class body function.
         * @param node The ClassExpression or ClassDeclaration node.
         * @param hasExtendsClause A value indicating whether the class has an `extends` clause.
         */
        function addExtendsHelperIfNeeded(statements: Statement[], node: ClassExpression | ClassDeclaration, hasExtendsClause: boolean): void {
            if (hasExtendsClause) {
                statements.push(
                    createStatement(
                        createExtendsHelper(getDeclarationName(node))
                    )
                );
            }
        }

        /**
         * Adds the constructor of the class to a class body function.
         *
         * @param statements The statements of the class body function.
         * @param node The ClassExpression or ClassDeclaration node.
         * @param hasExtendsClause A value indicating whether the class has an `extends` clause.
         */
        function addConstructor(statements: Statement[], node: ClassExpression | ClassDeclaration, hasExtendsClause: boolean): void {
            const constructor = getFirstConstructorWithBody(node);
            const hasSynthesizedSuper = hasSynthesizedDefaultSuperCall(constructor, hasExtendsClause);
            statements.push(
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

        /**
         * Transforms the parameters of the constructor declaration of a class.
         *
         * @param constructor The constructor for the class.
         * @param hasSynthesizedSuper A value indicating whether the constructor starts with a
         *                            synthesized `super` call.
         */
        function transformConstructorParameters(constructor: ConstructorDeclaration, hasSynthesizedSuper: boolean): ParameterDeclaration[] {
            // If the TypeScript transformer needed to synthesize a constructor for property
            // initializers, it would have also added a synthetic `...args` parameter and
            // `super` call.
            // If this is the case, we do not include the synthetic `...args` parameter and
            // will instead use the `arguments` object in ES5/3.
            if (constructor && !hasSynthesizedSuper) {
                return visitNodes(constructor.parameters, visitor, isParameter);
            }

            return [];
        }

        /**
         * Transforms the body of a constructor declaration of a class.
         *
         * @param constructor The constructor for the class.
         * @param hasExtendsClause A value indicating whether the class has an `extends` clause.
         * @param hasSynthesizedSuper A value indicating whether the constructor starts with a
         *                            synthesized `super` call.
         */
        function transformConstructorBody(constructor: ConstructorDeclaration, hasExtendsClause: boolean, hasSynthesizedSuper: boolean) {
            const statements: Statement[] = [];
            startLexicalEnvironment();
            if (constructor) {
                addCaptureThisForNodeIfNeeded(statements, constructor);
                addDefaultValueAssignmentsIfNeeded(statements, constructor);
                addRestParameterIfNeeded(statements, constructor, hasSynthesizedSuper);
            }

            addDefaultSuperCallIfNeeded(statements, constructor, hasExtendsClause, hasSynthesizedSuper);

            if (constructor) {
                addRange(statements, visitNodes(constructor.body.statements, visitor, isStatement, hasSynthesizedSuper ? 1 : 0));
            }

            addRange(statements, endLexicalEnvironment());
            return createBlock(statements, /*location*/ constructor && constructor.body, /*multiLine*/ true);
        }

        /**
         * Adds a synthesized call to `_super` if it is needed.
         *
         * @param statements The statements for the new constructor body.
         * @param constructor The constructor for the class.
         * @param hasExtendsClause A value indicating whether the class has an `extends` clause.
         * @param hasSynthesizedSuper A value indicating whether the constructor starts with a
         *                            synthesized `super` call.
         */
        function addDefaultSuperCallIfNeeded(statements: Statement[], constructor: ConstructorDeclaration, hasExtendsClause: boolean, hasSynthesizedSuper: boolean) {
            // If the TypeScript transformer needed to synthesize a constructor for property
            // initializers, it would have also added a synthetic `...args` parameter and
            // `super` call.
            // If this is the case, or if the class has an `extends` clause but no
            // constructor, we emit a synthesized call to `_super`.
            if (constructor ? hasSynthesizedSuper : hasExtendsClause) {
                statements.push(
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

        /**
         * Visits a parameter declaration.
         *
         * @param node A ParameterDeclaration node.
         */
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

        /**
         * Gets a value indicating whether we need to add default value assignments for a
         * function-like node.
         *
         * @param node A function-like node.
         */
        function shouldAddDefaultValueAssignments(node: FunctionLikeDeclaration): boolean {
            return (node.transformFlags & TransformFlags.ContainsDefaultValueAssignments) !== 0;
        }

        /**
         * Adds statements to the body of a function-like node if it contains parameters with
         * binding patterns or initializers.
         *
         * @param statements The statements for the new function body.
         * @param node A function-like node.
         */
        function addDefaultValueAssignmentsIfNeeded(statements: Statement[], node: FunctionLikeDeclaration): void {
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

        /**
         * Adds statements to the body of a function-like node for parameters with binding patterns
         *
         * @param statements The statements for the new function body.
         * @param parameter The parameter for the function.
         * @param name The name of the parameter.
         * @param initializer The initializer for the parameter.
         */
        function addDefaultValueAssignmentForBindingPattern(statements: Statement[], parameter: ParameterDeclaration, name: BindingPattern, initializer: Expression): void {
            const temp = getGeneratedNameForNode(parameter);

            // In cases where a binding pattern is simply '[]' or '{}',
            // we usually don't want to emit a var declaration; however, in the presence
            // of an initializer, we must emit that expression to preserve side effects.
            if (name.elements.length > 0) {
                statements.push(
                    createVariableStatement(
                        /*modifiers*/ undefined,
                        createVariableDeclarationList(
                            flattenParameterDestructuring(parameter, temp, visitor)
                        )
                    )
                );
            }
            else if (initializer) {
                statements.push(
                    createStatement(
                        createAssignment(
                            temp,
                            visitNode(initializer, visitor, isExpression)
                        )
                    )
                );
            }
        }

        /**
         * Adds statements to the body of a function-like node for parameters with initializers.
         *
         * @param statements The statements for the new function body.
         * @param parameter The parameter for the function.
         * @param name The name of the parameter.
         * @param initializer The initializer for the parameter.
         */
        function addDefaultValueAssignmentForInitializer(statements: Statement[], parameter: ParameterDeclaration, name: Identifier, initializer: Expression): void {
            statements.push(
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

        /**
         * Gets a value indicating whether we need to add statements to handle a rest parameter.
         *
         * @param node A ParameterDeclaration node.
         * @param inConstructorWithSynthesizedSuper A value indicating whether the parameter is
         *                                          part of a constructor declaration with a
         *                                          synthesized call to `super`
         */
        function shouldAddRestParameter(node: ParameterDeclaration, inConstructorWithSynthesizedSuper: boolean) {
            return node && node.dotDotDotToken && !inConstructorWithSynthesizedSuper;
        }

        /**
         * Adds statements to the body of a function-like node if it contains a rest parameter.
         *
         * @param statements The statements for the new function body.
         * @param node A function-like node.
         * @param inConstructorWithSynthesizedSuper A value indicating whether the parameter is
         *                                          part of a constructor declaration with a
         *                                          synthesized call to `super`
         */
        function addRestParameterIfNeeded(statements: Statement[], node: FunctionLikeDeclaration, inConstructorWithSynthesizedSuper: boolean): void {
            const parameter = lastOrUndefined(node.parameters);
            if (!shouldAddRestParameter(parameter, inConstructorWithSynthesizedSuper)) {
                return;
            }

            const name = getSynthesizedClone(<Identifier>parameter.name);
            const restIndex = node.parameters.length - 1;
            const temp = createLoopVariable();

            // var param = [];
            statements.push(
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
            statements.push(
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
                                        createSubtract(temp, createLiteral(restIndex))
                                    ),
                                    createElementAccess(createIdentifier("arguments"), temp)
                                )
                            )
                        )
                    ])
                )
            );
        }

        /**
         * Adds a statement to capture the `this` of a function declaration if it is needed.
         *
         * @param statements The statements for the new function body.
         * @param node A node.
         */
        function addCaptureThisForNodeIfNeeded(statements: Statement[], node: Node): void {
            if (node.transformFlags & TransformFlags.ContainsCapturedLexicalThis && node.kind !== SyntaxKind.ArrowFunction) {
                enableSubstitutionsForCapturedThis();
                statements.push(
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

        /**
         * Adds statements to the class body function for a class to define the members of the
         * class.
         *
         * @param statements The statements for the class body function.
         * @param node The ClassExpression or ClassDeclaration node.
         */
        function addClassMembers(statements: Statement[], node: ClassExpression | ClassDeclaration): void {
            for (const member of node.members) {
                switch (member.kind) {
                    case SyntaxKind.SemicolonClassElement:
                        statements.push(transformSemicolonClassElementToStatement(<SemicolonClassElement>member));
                        break;

                    case SyntaxKind.MethodDeclaration:
                        statements.push(transformClassMethodDeclarationToStatement(getClassMemberPrefix(node, member), <MethodDeclaration>member));
                        break;

                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                        const accessors = getAllAccessorDeclarations(node.members, <AccessorDeclaration>member);
                        if (member === accessors.firstAccessor) {
                            statements.push(transformAccessorsToStatement(getClassMemberPrefix(node, member), accessors));
                        }

                        break;

                    case SyntaxKind.Constructor:
                        // Constructors are handled in visitClassExpression/visitClassDeclaration
                        break;

                    default:
                        Debug.failBadSyntaxKind(node);
                        break;
                }
            }
        }

        /**
         * Transforms a SemicolonClassElement into a statement for a class body function.
         *
         * @param member The SemicolonClassElement node.
         */
        function transformSemicolonClassElementToStatement(member: SemicolonClassElement) {
            return createEmptyStatement(/*location*/ member);
        }

        /**
         * Transforms a MethodDeclaration into a statement for a class body function.
         *
         * @param receiver The receiver for the member.
         * @param member The MethodDeclaration node.
         */
        function transformClassMethodDeclarationToStatement(receiver: LeftHandSideExpression, member: MethodDeclaration) {
            return createStatement(
                createAssignment(
                    createMemberAccessForPropertyName(
                        receiver,
                        visitNode(member.name, visitor, isPropertyName)
                    ),
                    transformFunctionLikeToExpression(member, /*location*/ undefined, /*name*/ undefined)
                ),
                /*location*/ member
            );
        }

        /**
         * Transforms a set of related of get/set accessors into a statement for a class body function.
         *
         * @param receiver The receiver for the member.
         * @param accessors The set of related get/set accessors.
         */
        function transformAccessorsToStatement(receiver: LeftHandSideExpression, accessors: AllAccessorDeclarations): Statement {
            return createStatement(
                transformAccessorsToExpression(receiver, accessors)
            );
        }

        /**
         * Transforms a set of related get/set accessors into an expression for either a class
         * body function or an ObjectLiteralExpression with computed properties.
         *
         * @param receiver The receiver for the member.
         */
        function transformAccessorsToExpression(receiver: LeftHandSideExpression, { firstAccessor, getAccessor, setAccessor }: AllAccessorDeclarations): Expression {
            return createObjectDefineProperty(
                receiver,
                createExpressionForPropertyName(
                    visitNode(firstAccessor.name, visitor, isPropertyName),
                    /*location*/ firstAccessor.name
                ),
                {
                    get: getAccessor && transformFunctionLikeToExpression(getAccessor, /*location*/ getAccessor, /*name*/ undefined),
                    set: setAccessor && transformFunctionLikeToExpression(setAccessor, /*location*/ setAccessor, /*name*/ undefined),
                    enumerable: true,
                    configurable: true
                },
                /*preferNewLine*/ true,
                /*location*/ firstAccessor
            );
        }

        /**
         * Visits an ArrowFunction and transforms it into a FunctionExpression.
         *
         * @param node An ArrowFunction node.
         */
        function visitArrowFunction(node: ArrowFunction) {
            if (node.transformFlags & TransformFlags.ContainsLexicalThis) {
                enableSubstitutionsForCapturedThis();
            }

            const func = transformFunctionLikeToExpression(node, /*location*/ node, /*name*/ undefined);
            setNodeEmitFlags(func, NodeEmitFlags.CapturesThis);
            return func;
        }

        /**
         * Visits a FunctionExpression node.
         *
         * @param node a FunctionExpression node.
         */
        function visitFunctionExpression(node: FunctionExpression): Expression {
            return transformFunctionLikeToExpression(node, /*location*/ node, node.name);
        }

        /**
         * Visits a FunctionDeclaration node.
         *
         * @param node a FunctionDeclaration node.
         */
        function visitFunctionDeclaration(node: FunctionDeclaration): FunctionDeclaration {
            return createFunctionDeclaration(
                /*modifiers*/ undefined,
                node.asteriskToken,
                node.name,
                visitNodes(node.parameters, visitor, isParameter),
                transformFunctionBody(node),
                /*location*/ node,
                /*original*/ node
            );
        }

        /**
         * Transforms a function-like node into a FunctionExpression.
         *
         * @param node The function-like node to transform.
         * @param location The source-map location for the new FunctionExpression.
         * @param name The name of the new FunctionExpression.
         */
        function transformFunctionLikeToExpression(node: FunctionLikeDeclaration, location: TextRange, name: Identifier): FunctionExpression {
            const savedContainingNonArrowFunction = containingNonArrowFunction;
            if (node.kind !== SyntaxKind.ArrowFunction) {
                containingNonArrowFunction = node;
            }

            const expression = createFunctionExpression(
                /*asteriskToken*/ undefined,
                name,
                visitNodes(node.parameters, visitor, isParameter),
                transformFunctionBody(node),
                location,
                /*original*/ node
            );

            containingNonArrowFunction = savedContainingNonArrowFunction;
            return expression;
        }

        /**
         * Transforms the body of a function-like node.
         *
         * @param node A function-like node.
         */
        function transformFunctionBody(node: FunctionLikeDeclaration) {
            const statements: Statement[] = [];
            startLexicalEnvironment();
            addCaptureThisForNodeIfNeeded(statements, node);
            addDefaultValueAssignmentsIfNeeded(statements, node);
            addRestParameterIfNeeded(statements, node, /*inConstructorWithSynthesizedSuper*/ false);

            const body = node.body;
            if (isBlock(body)) {
                addRange(statements, visitNodes(body.statements, visitor, isStatement));
            }
            else {
                const expression = visitNode(body, visitor, isExpression);
                if (expression) {
                    statements.push(createReturn(expression, /*location*/ body));
                }
            }

            addRange(statements, endLexicalEnvironment());
            return createBlock(statements, node.body);
        }

        /**
         * Visits an ExpressionStatement that contains a destructuring assignment.
         *
         * @param node An ExpressionStatement node.
         */
        function visitExpressionStatement(node: ExpressionStatement): ExpressionStatement {
            // If we are here it is most likely because our expression is a destructuring assignment.
            switch (node.expression.kind) {
                case SyntaxKind.ParenthesizedExpression:
                    return createStatement(
                        visitParenthesizedExpression(<ParenthesizedExpression>node.expression, /*needsDestructuringValue*/ false),
                        /*location*/ node
                    );

                case SyntaxKind.BinaryExpression:
                    return createStatement(
                        visitBinaryExpression(<BinaryExpression>node.expression, /*needsDestructuringValue*/ false),
                        /*location*/ node
                    );
            }

            return visitEachChild(node, visitor, context);
        }

        /**
         * Visits a ParenthesizedExpression that may contain a destructuring assignment.
         *
         * @param node A ParenthesizedExpression node.
         * @param needsDestructuringValue A value indicating whether we need to hold onto the rhs
         *                                of a destructuring assignment.
         */
        function visitParenthesizedExpression(node: ParenthesizedExpression, needsDestructuringValue: boolean): ParenthesizedExpression {
            // If we are here it is most likely because our expression is a destructuring assignment.
            if (needsDestructuringValue) {
                switch (node.expression.kind) {
                    case SyntaxKind.ParenthesizedExpression:
                        return createParen(
                            visitParenthesizedExpression(<ParenthesizedExpression>node.expression, /*needsDestructuringValue*/ true),
                            /*location*/ node
                        );

                    case SyntaxKind.BinaryExpression:
                        return createParen(
                            visitBinaryExpression(<BinaryExpression>node.expression, /*needsDestructuringValue*/ true),
                            /*location*/ node
                        );
                }
            }

            return visitEachChild(node, visitor, context);
        }

        /**
         * Visits a BinaryExpression that contains a destructuring assignment.
         *
         * @param node A BinaryExpression node.
         * @param needsDestructuringValue A value indicating whether we need to hold onto the rhs
         *                                of a destructuring assignment.
         */
        function visitBinaryExpression(node: BinaryExpression, needsDestructuringValue: boolean): Expression {
            // If we are here it is because this is a destructuring assignment.
            Debug.assert(isDestructuringAssignment(node));
            return flattenDestructuringAssignment(node, needsDestructuringValue, hoistVariableDeclaration, visitor);
        }

        /**
         * Visits a VariableDeclarationList that is block scoped (e.g. `let` or `const`).
         *
         * @param node A VariableDeclarationList node.
         */
        function visitVariableDeclarationList(node: VariableDeclarationList): VariableDeclarationList {
            // If we are here it is because the list is defined as `let` or `const`.
            Debug.assert((node.flags & NodeFlags.BlockScoped) !== 0);

            enableSubstitutionsForBlockScopedBindings();
            return setOriginalNode(
                createVariableDeclarationList(
                    flatten(map(node.declarations, visitVariableDeclarationInLetDeclarationList)),
                    /*location*/ node
                ),
                node
            );
        }

        /**
         * Gets a value indicating whether we should emit an explicit initializer for a variable
         * declaration in a `let` declaration list.
         *
         * @param node A VariableDeclaration node.
         */
        function shouldEmitExplicitInitializerForLetDeclaration(node: VariableDeclaration) {
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

            const original = getOriginalNode(node);
            Debug.assert(isVariableDeclaration(original));

            const flags = resolver.getNodeCheckFlags(original);
            const isCapturedInFunction = flags & NodeCheckFlags.CapturedBlockScopedBinding;
            const isDeclaredInLoop = flags & NodeCheckFlags.BlockScopedBindingInLoop;
            const emittedAsTopLevel =
                isBlockScopedContainerTopLevel(enclosingBlockScopeContainer)
                || (isCapturedInFunction
                    && isDeclaredInLoop
                    && isBlock(enclosingBlockScopeContainer)
                    && isIterationStatement(enclosingBlockScopeContainerParent, /*lookInLabeledStatements*/ false));

            const emitExplicitInitializer =
                !emittedAsTopLevel
                && enclosingBlockScopeContainer.kind !== SyntaxKind.ForInStatement
                && enclosingBlockScopeContainer.kind !== SyntaxKind.ForOfStatement
                && (!resolver.isDeclarationWithCollidingName(<Declaration>original)
                    || (isDeclaredInLoop
                        && !isCapturedInFunction
                        && !isIterationStatement(enclosingBlockScopeContainer, /*lookInLabeledStatements*/ false)));

            return emitExplicitInitializer;
        }

        /**
         * Visits a VariableDeclaration in a `let` declaration list.
         *
         * @param node A VariableDeclaration node.
         */
        function visitVariableDeclarationInLetDeclarationList(node: VariableDeclaration) {
            // For binding pattern names that lack initializers there is no point to emit
            // explicit initializer since downlevel codegen for destructuring will fail
            // in the absence of initializer so all binding elements will say uninitialized
            const name = node.name;
            if (isBindingPattern(name)) {
                return visitVariableDeclaration(node);
            }

            if (!node.initializer && shouldEmitExplicitInitializerForLetDeclaration(node)) {
                const clone = getMutableClone(node);
                clone.initializer = createVoidZero();
                return clone;
            }

            return visitEachChild(node, visitor, context);
        }

        /**
         * Visits a VariableDeclaration node with a binding pattern.
         *
         * @param node A VariableDeclaration node.
         */
        function visitVariableDeclaration(node: VariableDeclaration): VisitResult<VariableDeclaration> {
            // If we are here it is because the name contains a binding pattern.
            Debug.assert(isBindingPattern(node.name));

            return flattenVariableDestructuring(node, /*value*/ undefined, visitor);
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

        /**
         * Visits a ForOfStatement and converts it into a compatible ForStatement.
         *
         * @param node A ForOfStatement.
         */
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
            const statements: Statement[] = [];

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
                    statements.push(
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
                    statements.push(
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
                    statements.push(
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
                    statements.push(createStatement(assignment, /*location*/ node.initializer));
                }
            }

            const statement = visitNode(node.statement, visitor, isStatement);
            if (isBlock(statement)) {
                addRange(statements, statement.statements);
            }
            else {
                statements.push(statement);
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
                    statements
                ),
                /*location*/ node
            );
        }

        /**
         * Visits an ObjectLiteralExpression with computed propety names.
         *
         * @param node An ObjectLiteralExpression node.
         */
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
                    createObjectLiteral(
                        visitNodes(properties, visitor, isObjectLiteralElement, 0, numInitialNonComputedProperties),
                        /*location*/ undefined,
                        node.multiLine
                    )
                ),
                node.multiLine
            );

            addObjectLiteralMembers(expressions, node, temp, numInitialNonComputedProperties);

            // We need to clone the temporary identifier so that we can write it on a
            // new line
            addNode(expressions, getMutableClone(temp), node.multiLine);
            return createParen(inlineExpressions(expressions));
        }

        /**
         * Adds the members of an object literal to an array of expressions.
         *
         * @param expressions An array of expressions.
         * @param node An ObjectLiteralExpression node.
         * @param receiver The receiver for members of the ObjectLiteralExpression.
         * @param numInitialNonComputedProperties The number of initial properties without
         *                                        computed property names.
         */
        function addObjectLiteralMembers(expressions: Expression[], node: ObjectLiteralExpression, receiver: Identifier, numInitialNonComputedProperties: number) {
            const properties = node.properties;
            const numProperties = properties.length;
            for (let i = numInitialNonComputedProperties; i < numProperties; i++) {
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
                        Debug.failBadSyntaxKind(node);
                        break;
                }
            }
        }

        /**
         * Transforms a PropertyAssignment node into an expression.
         *
         * @param node The ObjectLiteralExpression that contains the PropertyAssignment.
         * @param property The PropertyAssignment node.
         * @param receiver The receiver for the assignment.
         */
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

        /**
         * Transforms a ShorthandPropertyAssignment node into an expression.
         *
         * @param node The ObjectLiteralExpression that contains the ShorthandPropertyAssignment.
         * @param property The ShorthandPropertyAssignment node.
         * @param receiver The receiver for the assignment.
         */
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

        /**
         * Transforms a MethodDeclaration of an ObjectLiteralExpression into an expression.
         *
         * @param node The ObjectLiteralExpression that contains the MethodDeclaration.
         * @param method The MethodDeclaration node.
         * @param receiver The receiver for the assignment.
         */
        function transformObjectLiteralMethodDeclarationToExpression(node: ObjectLiteralExpression, method: MethodDeclaration, receiver: Expression) {
            return createAssignment(
                createMemberAccessForPropertyName(
                    receiver,
                    visitNode(method.name, visitor, isPropertyName)
                ),
                transformFunctionLikeToExpression(method, /*location*/ method, /*name*/ undefined),
                /*location*/ method
            );
        }

        /**
         * Visits a MethodDeclaration of an ObjectLiteralExpression and transforms it into a
         * PropertyAssignment.
         *
         * @param node A MethodDeclaration node.
         */
        function visitMethodDeclaration(node: MethodDeclaration): ObjectLiteralElement {
            // We should only get here for methods on an object literal with regular identifier names.
            // Methods on classes are handled in visitClassDeclaration/visitClassExpression.
            // Methods with computed property names are handled in visitObjectLiteralExpression.
            Debug.assert(!isComputedPropertyName(node.name));
            return createPropertyAssignment(
                node.name,
                transformFunctionLikeToExpression(node, /*location*/ node, /*name*/ undefined),
                /*location*/ node
            );
        }

        /**
         * Visits a ShorthandPropertyAssignment and transforms it into a PropertyAssignment.
         *
         * @param node A ShorthandPropertyAssignment node.
         */
        function visitShorthandPropertyAssignment(node: ShorthandPropertyAssignment): ObjectLiteralElement {
            return createPropertyAssignment(
                node.name,
                getSynthesizedClone(node.name),
                /*location*/ node
            );
        }

        /**
         * Visits an ArrayLiteralExpression that contains a spread element.
         *
         * @param node An ArrayLiteralExpression node.
         */
        function visitArrayLiteralExpression(node: ArrayLiteralExpression): Expression {
            // We are here because we contain a SpreadElementExpression.
            return transformAndSpreadElements(node.elements, /*needsUniqueCopy*/ true, node.multiLine);
        }

        /**
         * Visits a CallExpression that contains either a spread element or `super`.
         *
         * @param node a CallExpression.
         */
        function visitCallExpression(node: CallExpression): LeftHandSideExpression {
            // We are here either because SuperKeyword was used somewhere in the expression, or
            // because we contain a SpreadElementExpression.

            const { target, thisArg } = createCallBinding(node.expression);
            if (node.transformFlags & TransformFlags.ContainsSpreadElementExpression) {
                // [source]
                //      f(...a, b)
                //      x.m(...a, b)
                //      super(...a, b)
                //      super.m(...a, b) // in static
                //      super.m(...a, b) // in instance
                //
                // [output]
                //      f.apply(void 0, a.concat([b]))
                //      (_a = x).m.apply(_a, a.concat([b]))
                //      _super.apply(this, a.concat([b]))
                //      _super.m.apply(this, a.concat([b]))
                //      _super.prototype.m.apply(this, a.concat([b]))

                return createFunctionApply(
                    visitNode(target, visitor, isExpression),
                    visitNode(thisArg, visitor, isExpression),
                    transformAndSpreadElements(node.arguments, /*needsUniqueCopy*/ false, /*multiLine*/ false)
                );
            }
            else {
                // [source]
                //      super(a)
                //      super.m(a) // in static
                //      super.m(a) // in instance
                //
                // [output]
                //      _super.call(this, a)
                //      _super.m.call(this, a)
                //      _super.prototype.m.call(this, a)

                return createFunctionCall(
                    visitNode(target, visitor, isExpression),
                    visitNode(thisArg, visitor, isExpression),
                    visitNodes(node.arguments, visitor, isExpression),
                    /*location*/ node
                );
            }
        }

        /**
         * Visits a NewExpression that contains a spread element.
         *
         * @param node A NewExpression node.
         */
        function visitNewExpression(node: NewExpression): LeftHandSideExpression {
            // We are here because we contain a SpreadElementExpression.
            Debug.assert((node.transformFlags & TransformFlags.ContainsSpreadElementExpression) !== 0);

            // [source]
            //      new C(...a)
            //
            // [output]
            //      new ((_a = C).bind.apply(_a, [void 0].concat(a)))()

            const { target, thisArg } = createCallBinding(createPropertyAccess(node.expression, "bind"));
            return createNew(
                createFunctionApply(
                    visitNode(target, visitor, isExpression),
                    thisArg,
                    transformAndSpreadElements(createNodeArray([createVoidZero(), ...node.arguments]), /*needsUniqueCopy*/ false, /*multiLine*/ false)
                ),
                []
            );
        }

        /**
         * Transforms an array of Expression nodes that contains a SpreadElementExpression.
         *
         * @param elements The array of Expression nodes.
         * @param needsUniqueCopy A value indicating whether to ensure that the result is a fresh array.
         * @param multiLine A value indicating whether the result should be emitted on multiple lines.
         */
        function transformAndSpreadElements(elements: NodeArray<Expression>, needsUniqueCopy: boolean, multiLine: boolean): Expression {
            // [source]
            //      [a, ...b, c]
            //
            // [output]
            //      [a].concat(b, [c])

            // Map spans of spread expressions into their expressions and spans of other
            // expressions into an array literal.
            const segments = flatten(
                spanMap(elements, isSpreadElementExpression, (chunk: Expression[], isSpread: boolean) => isSpread
                    ? map(chunk, visitExpressionOfSpreadElement)
                    : createArrayLiteral(visitNodes(createNodeArray(chunk), visitor, isExpression), /*location*/ undefined, multiLine)));

            if (segments.length === 1) {
                return needsUniqueCopy && isSpreadElementExpression(elements[0])
                    ? createArraySlice(segments[0])
                    : segments[0];
            }

            // Rewrite using the pattern <segment0>.concat(<segment1>, <segment2>, ...)
            return createArrayConcat(segments.shift(), segments);
        }

        /**
         * Transforms the expression of a SpreadElementExpression node.
         *
         * @param node A SpreadElementExpression node.
         */
        function visitExpressionOfSpreadElement(node: SpreadElementExpression) {
            return visitNode(node.expression, visitor, isExpression);
        }

        /**
         * Visits a template literal.
         *
         * @param node A template literal.
         */
        function visitTemplateLiteral(node: LiteralExpression): LeftHandSideExpression {
            return createLiteral(node.text, /*location*/ node);
        }

        /**
         * Visits a TaggedTemplateExpression node.
         *
         * @param node A TaggedTemplateExpression node.
         */
        function visitTaggedTemplateExpression(node: TaggedTemplateExpression) {
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
                cookedStrings.push(createLiteral(template.text));
                rawStrings.push(getRawLiteral(template));
            }
            else {
                cookedStrings.push(createLiteral(template.head.text));
                rawStrings.push(getRawLiteral(template.head));
                for (const templateSpan of template.templateSpans) {
                    cookedStrings.push(createLiteral(templateSpan.literal.text));
                    rawStrings.push(getRawLiteral(templateSpan.literal));
                    templateArguments.push(visitNode(templateSpan.expression, visitor, isExpression));
                }
            }

            return inlineExpressions([
                createAssignment(temp, createArrayLiteral(cookedStrings)),
                createAssignment(createPropertyAccess(temp, "raw"), createArrayLiteral(rawStrings)),
                createCall(tag, templateArguments)
            ]);
        }

        /**
         * Creates an ES5 compatible literal from an ES6 template literal.
         *
         * @param node The ES6 template literal.
         */
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
            return createLiteral(text, /*location*/ node);
        }

        /**
         * Visits a TemplateExpression node.
         *
         * @param node A TemplateExpression node.
         */
        function visitTemplateExpression(node: TemplateExpression): Expression {
            const expressions: Expression[] = [];
            addTemplateHead(expressions, node);
            addTemplateSpans(expressions, node);

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

        /**
         * Gets a value indicating whether we need to include the head of a TemplateExpression.
         *
         * @param node A TemplateExpression node.
         */
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

        /**
         * Adds the head of a TemplateExpression to an array of expressions.
         *
         * @param expressions An array of expressions.
         * @param node A TemplateExpression node.
         */
        function addTemplateHead(expressions: Expression[], node: TemplateExpression): void {
            if (!shouldAddTemplateHead(node)) {
                return;
            }

            expressions.push(createLiteral(node.head.text));
        }

        /**
         * Visits and adds the template spans of a TemplateExpression to an array of expressions.
         *
         * @param expressions An array of expressions.
         * @param node A TemplateExpression node.
         */
        function addTemplateSpans(expressions: Expression[], node: TemplateExpression): void {
            for (const span of node.templateSpans) {
                expressions.push(visitNode(span.expression, visitor, isExpression));

                // Only emit if the literal is non-empty.
                // The binary '+' operator is left-associative, so the first string concatenation
                // with the head will force the result up to this point to be a string.
                // Emitting a '+ ""' has no semantic effect for middles and tails.
                if (span.literal.text.length !== 0) {
                    expressions.push(createLiteral(span.literal.text));
                }
            }
        }

        /**
         * Visits the `super` keyword
         */
        function visitSuperKeyword(node: PrimaryExpression): LeftHandSideExpression {
            return containingNonArrowFunction
                && isClassElement(containingNonArrowFunction)
                && !hasModifier(containingNonArrowFunction, ModifierFlags.Static)
                    ? createPropertyAccess(createIdentifier("_super"), "prototype")
                    : createIdentifier("_super");
        }

        function visitSourceFileNode(node: SourceFile): SourceFile {
            const [prologue, remaining] = span(node.statements, isPrologueDirective);
            const statements: Statement[] = [];
            startLexicalEnvironment();
            addRange(statements, prologue);
            addCaptureThisForNodeIfNeeded(statements, node);
            addRange(statements, visitNodes(createNodeArray(remaining), visitor, isStatement));
            addRange(statements, endLexicalEnvironment());
            const clone = getMutableClone(node);
            clone.statements = createNodeArray(statements, /*location*/ node.statements);
            return clone;
        }

        /**
         * Called by the printer just before a node is printed.
         *
         * @param node The node to be printed.
         */
        function onEmitNode(node: Node, emit: (node: Node) => void) {
            const savedUseCapturedThis = useCapturedThis;

            if (enabledSubstitutions & ES6SubstitutionFlags.CapturedThis && isFunctionLike(node)) {
                // If we are tracking a captured `this`, push a bit that indicates whether the
                // containing function is an arrow function.
                useCapturedThis = (getNodeEmitFlags(node) & NodeEmitFlags.CapturesThis) !== 0;
            }

            previousOnEmitNode(node, emit);

            useCapturedThis = savedUseCapturedThis;
        }

        /**
         * Enables a more costly code path for substitutions when we determine a source file
         * contains block-scoped bindings (e.g. `let` or `const`).
         */
        function enableSubstitutionsForBlockScopedBindings() {
            if ((enabledSubstitutions & ES6SubstitutionFlags.BlockScopedBindings) === 0) {
                enabledSubstitutions |= ES6SubstitutionFlags.BlockScopedBindings;
                context.enableExpressionSubstitution(SyntaxKind.Identifier);
            }
        }

        /**
         * Enables a more costly code path for substitutions when we determine a source file
         * contains a captured `this`.
         */
        function enableSubstitutionsForCapturedThis() {
            if ((enabledSubstitutions & ES6SubstitutionFlags.CapturedThis) === 0) {
                enabledSubstitutions |= ES6SubstitutionFlags.CapturedThis;
                context.enableExpressionSubstitution(SyntaxKind.ThisKeyword);
                context.enableEmitNotification(SyntaxKind.Constructor);
                context.enableEmitNotification(SyntaxKind.MethodDeclaration);
                context.enableEmitNotification(SyntaxKind.GetAccessor);
                context.enableEmitNotification(SyntaxKind.SetAccessor);
                context.enableEmitNotification(SyntaxKind.ArrowFunction);
                context.enableEmitNotification(SyntaxKind.FunctionExpression);
                context.enableEmitNotification(SyntaxKind.FunctionDeclaration);
            }
        }

        /**
         * Hooks substitutions for non-expression identifiers.
         */
        function substituteIdentifier(node: Identifier) {
            node = previousIdentifierSubstitution(node);

            // Only substitute the identifier if we have enabled substitutions for block-scoped
            // bindings.
            if (enabledSubstitutions & ES6SubstitutionFlags.BlockScopedBindings) {
                const original = getOriginalNode(node);
                if (isIdentifier(original) && !nodeIsSynthesized(original) && original.parent && isNameOfDeclarationWithCollidingName(original)) {
                    return getGeneratedNameForNode(original);
                }
            }

            return node;
        }

        /**
         * Determines whether a name is the name of a declaration with a colliding name.
         * NOTE: This function expects to be called with an original source tree node.
         *
         * @param node An original source tree node.
         */
        function isNameOfDeclarationWithCollidingName(node: Identifier) {
            const parent = node.parent;
            switch (parent.kind) {
                case SyntaxKind.BindingElement:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.VariableDeclaration:
                    return (<Declaration>parent).name === node
                        && resolver.isDeclarationWithCollidingName(<Declaration>parent);
            }

            return false;
        }

        /**
         * Substitutes an expression.
         *
         * @param node An Expression node.
         */
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

        /**
         * Substitutes an expression identifier.
         *
         * @param node An Identifier node.
         */
        function substituteExpressionIdentifier(node: Identifier): Identifier {
            if (enabledSubstitutions & ES6SubstitutionFlags.BlockScopedBindings) {
                const original = getOriginalNode(node);
                if (isIdentifier(original)) {
                    const declaration = resolver.getReferencedDeclarationWithCollidingName(original);
                    if (declaration) {
                        return getGeneratedNameForNode(declaration.name);
                    }
                }
            }

            return node;
        }

        /**
         * Substitutes `this` when contained within an arrow function.
         *
         * @param node The ThisKeyword node.
         */
        function substituteThisKeyword(node: PrimaryExpression): PrimaryExpression {
            if (enabledSubstitutions & ES6SubstitutionFlags.CapturedThis && useCapturedThis) {
                return createIdentifier("_this", /*location*/ node);
            }

            return node;
        }

        function getDeclarationName(node: ClassExpression | ClassDeclaration | FunctionDeclaration) {
            return node.name ? getSynthesizedClone(node.name) : getGeneratedNameForNode(node);
        }

        function getClassMemberPrefix(node: ClassExpression | ClassDeclaration, member: ClassElement) {
            const expression = getDeclarationName(node);
            return hasModifier(member, ModifierFlags.Static) ? expression : createPropertyAccess(expression, "prototype");
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