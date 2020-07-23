/*@internal*/
namespace ts {
    const enum ClassPropertySubstitutionFlags {
        /**
         * Enables substitutions for class expressions with static fields
         * which have initializers that reference the class name.
         */
        ClassAliases = 1 << 0,
    }

    const enum PrivateIdentifierPlacement {
        InstanceField
    }

    type PrivateIdentifierInfo = PrivateIdentifierInstanceField;

    interface PrivateIdentifierInstanceField {
        placement: PrivateIdentifierPlacement.InstanceField;
        weakMapName: Identifier;
    }

    /**
     * A mapping of private names to information needed for transformation.
     */
    type PrivateIdentifierEnvironment = UnderscoreEscapedMap<PrivateIdentifierInfo>;

    /**
     * Transforms ECMAScript Class Syntax.
     * TypeScript parameter property syntax is transformed in the TypeScript transformer.
     * For now, this transforms public field declarations using TypeScript class semantics,
     * where declarations are elided and initializers are transformed as assignments in the constructor.
     * When --useDefineForClassFields is on, this transforms to ECMAScript semantics, with Object.defineProperty.
     */
    export function transformClassFields(context: TransformationContext) {
        const {
            factory,
            hoistVariableDeclaration,
            endLexicalEnvironment,
            resumeLexicalEnvironment
        } = context;
        const resolver = context.getEmitResolver();
        const compilerOptions = context.getCompilerOptions();
        const languageVersion = getEmitScriptTarget(compilerOptions);

        const shouldTransformPrivateFields = languageVersion < ScriptTarget.ESNext;

        const previousOnSubstituteNode = context.onSubstituteNode;
        context.onSubstituteNode = onSubstituteNode;

        let enabledSubstitutions: ClassPropertySubstitutionFlags;

        let classAliases: Identifier[];

        /**
         * Tracks what computed name expressions originating from elided names must be inlined
         * at the next execution site, in document order
         */
        let pendingExpressions: Expression[] | undefined;

        /**
         * Tracks what computed name expression statements and static property initializers must be
         * emitted at the next execution site, in document order (for decorated classes).
         */
        let pendingStatements: Statement[] | undefined;

        const privateIdentifierEnvironmentStack: (PrivateIdentifierEnvironment | undefined)[] = [];
        let currentPrivateIdentifierEnvironment: PrivateIdentifierEnvironment | undefined;

        return chainBundle(context, transformSourceFile);

        function transformSourceFile(node: SourceFile) {
            const options = context.getCompilerOptions();
            if (node.isDeclarationFile
                || options.useDefineForClassFields && options.target === ScriptTarget.ESNext) {
                return node;
            }
            const visited = visitEachChild(node, visitor, context);
            addEmitHelpers(visited, context.readEmitHelpers());
            return visited;
        }

        function visitor(node: Node): VisitResult<Node> {
            if (!(node.transformFlags & TransformFlags.ContainsClassFields)) return node;

            switch (node.kind) {
                case SyntaxKind.ClassExpression:
                case SyntaxKind.ClassDeclaration:
                    return visitClassLike(node as ClassLikeDeclaration);
                case SyntaxKind.PropertyDeclaration:
                    return visitPropertyDeclaration(node as PropertyDeclaration);
                case SyntaxKind.VariableStatement:
                    return visitVariableStatement(node as VariableStatement);
                case SyntaxKind.ComputedPropertyName:
                    return visitComputedPropertyName(node as ComputedPropertyName);
                case SyntaxKind.PropertyAccessExpression:
                    return visitPropertyAccessExpression(node as PropertyAccessExpression);
                case SyntaxKind.PrefixUnaryExpression:
                    return visitPrefixUnaryExpression(node as PrefixUnaryExpression);
                case SyntaxKind.PostfixUnaryExpression:
                    return visitPostfixUnaryExpression(node as PostfixUnaryExpression, /*valueIsDiscarded*/ false);
                case SyntaxKind.CallExpression:
                    return visitCallExpression(node as CallExpression);
                case SyntaxKind.BinaryExpression:
                    return visitBinaryExpression(node as BinaryExpression);
                case SyntaxKind.PrivateIdentifier:
                    return visitPrivateIdentifier(node as PrivateIdentifier);
                case SyntaxKind.ExpressionStatement:
                    return visitExpressionStatement(node as ExpressionStatement);
                case SyntaxKind.ForStatement:
                    return visitForStatement(node as ForStatement);
                case SyntaxKind.TaggedTemplateExpression:
                    return visitTaggedTemplateExpression(node as TaggedTemplateExpression);
            }
            return visitEachChild(node, visitor, context);
        }

        function visitorDestructuringTarget(node: Node): VisitResult<Node> {
            switch (node.kind) {
                case SyntaxKind.ObjectLiteralExpression:
                case SyntaxKind.ArrayLiteralExpression:
                    return visitAssignmentPattern(node as AssignmentPattern);
                default:
                    return visitor(node);
            }
        }

        /**
         * If we visit a private name, this means it is an undeclared private name.
         * Replace it with an empty identifier to indicate a problem with the code.
         */
        function visitPrivateIdentifier(node: PrivateIdentifier) {
            if (!shouldTransformPrivateFields) {
                return node;
            }
            return setOriginalNode(factory.createIdentifier(""), node);
        }

        /**
         * Visits the members of a class that has fields.
         *
         * @param node The node to visit.
         */
        function classElementVisitor(node: Node): VisitResult<Node> {
            switch (node.kind) {
                case SyntaxKind.Constructor:
                    // Constructors for classes using class fields are transformed in
                    // `visitClassDeclaration` or `visitClassExpression`.
                    return undefined;

                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.MethodDeclaration:
                    // Visit the name of the member (if it's a computed property name).
                    return visitEachChild(node, classElementVisitor, context);

                case SyntaxKind.PropertyDeclaration:
                    return visitPropertyDeclaration(node as PropertyDeclaration);

                case SyntaxKind.ComputedPropertyName:
                    return visitComputedPropertyName(node as ComputedPropertyName);

                case SyntaxKind.SemicolonClassElement:
                    return node;

                default:
                    return visitor(node);
            }
        }

        function visitVariableStatement(node: VariableStatement) {
            const savedPendingStatements = pendingStatements;
            pendingStatements = [];

            const visitedNode = visitEachChild(node, visitor, context);
            const statement = some(pendingStatements) ?
                [visitedNode, ...pendingStatements] :
                visitedNode;

            pendingStatements = savedPendingStatements;
            return statement;
        }

        function visitComputedPropertyName(name: ComputedPropertyName) {
            let node = visitEachChild(name, visitor, context);
            if (some(pendingExpressions)) {
                const expressions = pendingExpressions;
                expressions.push(name.expression);
                pendingExpressions = [];
                node = factory.updateComputedPropertyName(
                    node,
                    factory.inlineExpressions(expressions)
                );
            }
            return node;
        }

        function visitPropertyDeclaration(node: PropertyDeclaration) {
            Debug.assert(!some(node.decorators));
            if (!shouldTransformPrivateFields && isPrivateIdentifier(node.name)) {
                // Initializer is elided as the field is initialized in transformConstructor.
                return factory.updatePropertyDeclaration(
                    node,
                    /*decorators*/ undefined,
                    visitNodes(node.modifiers, visitor, isModifier),
                    node.name,
                    /*questionOrExclamationToken*/ undefined,
                    /*type*/ undefined,
                    /*initializer*/ undefined
                );
            }
            // Create a temporary variable to store a computed property name (if necessary).
            // If it's not inlineable, then we emit an expression after the class which assigns
            // the property name to the temporary variable.
            const expr = getPropertyNameExpressionIfNeeded(node.name, !!node.initializer || !!context.getCompilerOptions().useDefineForClassFields);
            if (expr && !isSimpleInlineableExpression(expr)) {
                getPendingExpressions().push(expr);
            }
            return undefined;
        }

        function createPrivateIdentifierAccess(info: PrivateIdentifierInfo, receiver: Expression): Expression {
            receiver = visitNode(receiver, visitor, isExpression);
            switch (info.placement) {
                case PrivateIdentifierPlacement.InstanceField:
                    return context.getEmitHelperFactory().createClassPrivateFieldGetHelper(
                        nodeIsSynthesized(receiver) ? receiver : factory.cloneNode(receiver),
                        info.weakMapName
                    );
                default: return Debug.fail("Unexpected private identifier placement");
            }
        }

        function visitPropertyAccessExpression(node: PropertyAccessExpression) {
            if (shouldTransformPrivateFields && isPrivateIdentifier(node.name)) {
                const privateIdentifierInfo = accessPrivateIdentifier(node.name);
                if (privateIdentifierInfo) {
                    return setOriginalNode(
                        createPrivateIdentifierAccess(privateIdentifierInfo, node.expression),
                        node
                    );
                }
            }
            return visitEachChild(node, visitor, context);
        }

        function visitPrefixUnaryExpression(node: PrefixUnaryExpression) {
            if (shouldTransformPrivateFields && isPrivateIdentifierPropertyAccessExpression(node.operand)) {
                const operator = node.operator === SyntaxKind.PlusPlusToken ?
                    SyntaxKind.PlusToken : node.operator === SyntaxKind.MinusMinusToken ?
                        SyntaxKind.MinusToken : undefined;
                let info: PrivateIdentifierInfo | undefined;
                if (operator && (info = accessPrivateIdentifier(node.operand.name))) {
                    const receiver = visitNode(node.operand.expression, visitor, isExpression);
                    const { readExpression, initializeExpression } = createCopiableReceiverExpr(receiver);

                    const existingValue = factory.createPrefixUnaryExpression(SyntaxKind.PlusToken, createPrivateIdentifierAccess(info, readExpression));

                    return setOriginalNode(
                        createPrivateIdentifierAssignment(
                            info,
                            initializeExpression || readExpression,
                            factory.createBinaryExpression(existingValue, operator, factory.createNumericLiteral(1)),
                            SyntaxKind.EqualsToken
                        ),
                        node
                    );
                }
            }
            return visitEachChild(node, visitor, context);
        }

        function visitPostfixUnaryExpression(node: PostfixUnaryExpression, valueIsDiscarded: boolean) {
            if (shouldTransformPrivateFields && isPrivateIdentifierPropertyAccessExpression(node.operand)) {
                const operator = node.operator === SyntaxKind.PlusPlusToken ?
                    SyntaxKind.PlusToken : node.operator === SyntaxKind.MinusMinusToken ?
                        SyntaxKind.MinusToken : undefined;
                let info: PrivateIdentifierInfo | undefined;
                if (operator && (info = accessPrivateIdentifier(node.operand.name))) {
                    const receiver = visitNode(node.operand.expression, visitor, isExpression);
                    const { readExpression, initializeExpression } = createCopiableReceiverExpr(receiver);

                    const existingValue = factory.createPrefixUnaryExpression(SyntaxKind.PlusToken, createPrivateIdentifierAccess(info, readExpression));

                    // Create a temporary variable to store the value returned by the expression.
                    const returnValue = valueIsDiscarded ? undefined : factory.createTempVariable(hoistVariableDeclaration);

                    return setOriginalNode(
                        factory.inlineExpressions(compact<Expression>([
                            createPrivateIdentifierAssignment(
                                info,
                                initializeExpression || readExpression,
                                factory.createBinaryExpression(
                                    returnValue ? factory.createAssignment(returnValue, existingValue) : existingValue,
                                    operator,
                                    factory.createNumericLiteral(1)
                                ),
                                SyntaxKind.EqualsToken
                            ),
                            returnValue
                        ])),
                        node
                    );
                }
            }
            return visitEachChild(node, visitor, context);
        }

        function visitForStatement(node: ForStatement) {
            if (node.incrementor && isPostfixUnaryExpression(node.incrementor)) {
                return factory.updateForStatement(
                    node,
                    visitNode(node.initializer, visitor, isForInitializer),
                    visitNode(node.condition, visitor, isExpression),
                    visitPostfixUnaryExpression(node.incrementor, /*valueIsDiscarded*/ true),
                    visitNode(node.statement, visitor, isStatement)
                );
            }
            return visitEachChild(node, visitor, context);
        }

        function visitExpressionStatement(node: ExpressionStatement) {
            if (isPostfixUnaryExpression(node.expression)) {
                return factory.updateExpressionStatement(node, visitPostfixUnaryExpression(node.expression, /*valueIsDiscarded*/ true));
            }
            return visitEachChild(node, visitor, context);
        }

        function createCopiableReceiverExpr(receiver: Expression): { readExpression: Expression; initializeExpression: Expression | undefined } {
            const clone = nodeIsSynthesized(receiver) ? receiver : factory.cloneNode(receiver);
            if (isSimpleInlineableExpression(receiver)) {
                return { readExpression: clone, initializeExpression: undefined };
            }
            const readExpression = factory.createTempVariable(hoistVariableDeclaration);
            const initializeExpression = factory.createAssignment(readExpression, clone);
            return { readExpression, initializeExpression };
        }

        function visitCallExpression(node: CallExpression) {
            if (shouldTransformPrivateFields && isPrivateIdentifierPropertyAccessExpression(node.expression)) {
                // Transform call expressions of private names to properly bind the `this` parameter.
                const { thisArg, target } = factory.createCallBinding(node.expression, hoistVariableDeclaration, languageVersion);
                return factory.updateCallExpression(
                    node,
                    factory.createPropertyAccessExpression(visitNode(target, visitor), "call"),
                    /*typeArguments*/ undefined,
                    [visitNode(thisArg, visitor, isExpression), ...visitNodes(node.arguments, visitor, isExpression)]
                );
            }
            return visitEachChild(node, visitor, context);
        }

        function visitTaggedTemplateExpression(node: TaggedTemplateExpression) {
            if (shouldTransformPrivateFields && isPrivateIdentifierPropertyAccessExpression(node.tag)) {
                // Bind the `this` correctly for tagged template literals when the tag is a private identifier property access.
                const { thisArg, target } = factory.createCallBinding(node.tag, hoistVariableDeclaration, languageVersion);
                return factory.updateTaggedTemplateExpression(
                    node,
                    factory.createCallExpression(
                        factory.createPropertyAccessExpression(visitNode(target, visitor), "bind"),
                        /*typeArguments*/ undefined,
                        [visitNode(thisArg, visitor, isExpression)]
                    ),
                    /*typeArguments*/ undefined,
                    visitNode(node.template, visitor, isTemplateLiteral)
                );
            }
            return visitEachChild(node, visitor, context);
        }

        function visitBinaryExpression(node: BinaryExpression) {
            if (shouldTransformPrivateFields) {
                if (isDestructuringAssignment(node)) {
                    const savedPendingExpressions = pendingExpressions;
                    pendingExpressions = undefined!;
                    node = factory.updateBinaryExpression(
                        node,
                        visitNode(node.left, visitorDestructuringTarget),
                        node.operatorToken,
                        visitNode(node.right, visitor)
                    );
                    const expr = some(pendingExpressions) ?
                        factory.inlineExpressions(compact([...pendingExpressions!, node])) :
                        node;
                    pendingExpressions = savedPendingExpressions;
                    return expr;
                }
                if (isAssignmentExpression(node) && isPrivateIdentifierPropertyAccessExpression(node.left)) {
                    const info = accessPrivateIdentifier(node.left.name);
                    if (info) {
                        return setOriginalNode(
                            createPrivateIdentifierAssignment(info, node.left.expression, node.right, node.operatorToken.kind),
                            node
                        );
                    }
                }
            }
            return visitEachChild(node, visitor, context);
        }

        function createPrivateIdentifierAssignment(info: PrivateIdentifierInfo, receiver: Expression, right: Expression, operator: AssignmentOperator) {
            switch (info.placement) {
                case PrivateIdentifierPlacement.InstanceField: {
                    return createPrivateIdentifierInstanceFieldAssignment(info, receiver, right, operator);
                }
                default: return Debug.fail("Unexpected private identifier placement");
            }
        }

        function createPrivateIdentifierInstanceFieldAssignment(info: PrivateIdentifierInstanceField, receiver: Expression, right: Expression, operator: AssignmentOperator) {
            receiver = visitNode(receiver, visitor, isExpression);
            right = visitNode(right, visitor, isExpression);
            if (isCompoundAssignment(operator)) {
                const { readExpression, initializeExpression } = createCopiableReceiverExpr(receiver);
                return context.getEmitHelperFactory().createClassPrivateFieldSetHelper(
                    initializeExpression || readExpression,
                    info.weakMapName,
                    factory.createBinaryExpression(
                        context.getEmitHelperFactory().createClassPrivateFieldGetHelper(readExpression, info.weakMapName),
                        getNonAssignmentOperatorForCompoundAssignment(operator),
                        right
                    )
                );
            }
            else {
                return context.getEmitHelperFactory().createClassPrivateFieldSetHelper(receiver, info.weakMapName, right);
            }
        }

        /**
         * Set up the environment for a class.
         */
        function visitClassLike(node: ClassLikeDeclaration) {
            const savedPendingExpressions = pendingExpressions;
            pendingExpressions = undefined;
            if (shouldTransformPrivateFields) {
                startPrivateIdentifierEnvironment();
            }

            const result = isClassDeclaration(node) ?
                visitClassDeclaration(node) :
                visitClassExpression(node);

            if (shouldTransformPrivateFields) {
                endPrivateIdentifierEnvironment();
            }
            pendingExpressions = savedPendingExpressions;
            return result;
        }

        function doesClassElementNeedTransform(node: ClassElement) {
            return isPropertyDeclaration(node) || (shouldTransformPrivateFields && node.name && isPrivateIdentifier(node.name));
        }

        function visitClassDeclaration(node: ClassDeclaration) {
            if (!forEach(node.members, doesClassElementNeedTransform)) {
                return visitEachChild(node, visitor, context);
            }

            const extendsClauseElement = getEffectiveBaseTypeNode(node);
            const isDerivedClass = !!(extendsClauseElement && skipOuterExpressions(extendsClauseElement.expression).kind !== SyntaxKind.NullKeyword);

            const statements: Statement[] = [
                factory.updateClassDeclaration(
                    node,
                    /*decorators*/ undefined,
                    node.modifiers,
                    node.name,
                    /*typeParameters*/ undefined,
                    visitNodes(node.heritageClauses, visitor, isHeritageClause),
                    transformClassMembers(node, isDerivedClass)
                )
            ];

            // Write any pending expressions from elided or moved computed property names
            if (some(pendingExpressions)) {
                statements.push(factory.createExpressionStatement(factory.inlineExpressions(pendingExpressions)));
            }

            // Emit static property assignment. Because classDeclaration is lexically evaluated,
            // it is safe to emit static property assignment after classDeclaration
            // From ES6 specification:
            //      HasLexicalDeclaration (N) : Determines if the argument identifier has a binding in this environment record that was created using
            //                                  a lexical declaration such as a LexicalDeclaration or a ClassDeclaration.
            const staticProperties = getProperties(node, /*requireInitializer*/ true, /*isStatic*/ true);
            if (some(staticProperties)) {
                addPropertyStatements(statements, staticProperties, factory.getInternalName(node));
            }

            return statements;
        }

        function visitClassExpression(node: ClassExpression): Expression {
            if (!forEach(node.members, doesClassElementNeedTransform)) {
                return visitEachChild(node, visitor, context);
            }

            // If this class expression is a transformation of a decorated class declaration,
            // then we want to output the pendingExpressions as statements, not as inlined
            // expressions with the class statement.
            //
            // In this case, we use pendingStatements to produce the same output as the
            // class declaration transformation. The VariableStatement visitor will insert
            // these statements after the class expression variable statement.
            const isDecoratedClassDeclaration = isClassDeclaration(getOriginalNode(node));

            const staticProperties = getProperties(node, /*requireInitializer*/ true, /*isStatic*/ true);
            const extendsClauseElement = getEffectiveBaseTypeNode(node);
            const isDerivedClass = !!(extendsClauseElement && skipOuterExpressions(extendsClauseElement.expression).kind !== SyntaxKind.NullKeyword);

            const classExpression = factory.updateClassExpression(
                node,
                visitNodes(node.decorators, visitor, isDecorator),
                node.modifiers,
                node.name,
                /*typeParameters*/ undefined,
                visitNodes(node.heritageClauses, visitor, isHeritageClause),
                transformClassMembers(node, isDerivedClass)
            );

            if (some(staticProperties) || some(pendingExpressions)) {
                if (isDecoratedClassDeclaration) {
                    Debug.assertIsDefined(pendingStatements, "Decorated classes transformed by TypeScript are expected to be within a variable declaration.");

                    // Write any pending expressions from elided or moved computed property names
                    if (pendingStatements && pendingExpressions && some(pendingExpressions)) {
                        pendingStatements.push(factory.createExpressionStatement(factory.inlineExpressions(pendingExpressions)));
                    }

                    if (pendingStatements && some(staticProperties)) {
                        addPropertyStatements(pendingStatements, staticProperties, factory.getInternalName(node));
                    }
                    return classExpression;
                }
                else {
                    const expressions: Expression[] = [];
                    const isClassWithConstructorReference = resolver.getNodeCheckFlags(node) & NodeCheckFlags.ClassWithConstructorReference;
                    const temp = factory.createTempVariable(hoistVariableDeclaration, !!isClassWithConstructorReference);
                    if (isClassWithConstructorReference) {
                        // record an alias as the class name is not in scope for statics.
                        enableSubstitutionForClassAliases();
                        const alias = factory.cloneNode(temp) as GeneratedIdentifier;
                        alias.autoGenerateFlags &= ~GeneratedIdentifierFlags.ReservedInNestedScopes;
                        classAliases[getOriginalNodeId(node)] = alias;
                    }

                    // To preserve the behavior of the old emitter, we explicitly indent
                    // the body of a class with static initializers.
                    setEmitFlags(classExpression, EmitFlags.Indented | getEmitFlags(classExpression));
                    expressions.push(startOnNewLine(factory.createAssignment(temp, classExpression)));
                    // Add any pending expressions leftover from elided or relocated computed property names
                    addRange(expressions, map(pendingExpressions, startOnNewLine));
                    addRange(expressions, generateInitializedPropertyExpressions(staticProperties, temp));
                    expressions.push(startOnNewLine(temp));

                    return factory.inlineExpressions(expressions);
                }
            }

            return classExpression;
        }

        function transformClassMembers(node: ClassDeclaration | ClassExpression, isDerivedClass: boolean) {
            if (shouldTransformPrivateFields) {
                // Declare private names.
                for (const member of node.members) {
                    if (isPrivateIdentifierPropertyDeclaration(member)) {
                        addPrivateIdentifierToEnvironment(member.name);
                    }
                }
            }

            const members: ClassElement[] = [];
            const constructor = transformConstructor(node, isDerivedClass);
            if (constructor) {
                members.push(constructor);
            }
            addRange(members, visitNodes(node.members, classElementVisitor, isClassElement));
            return setTextRange(factory.createNodeArray(members), /*location*/ node.members);
        }

        function isPropertyDeclarationThatRequiresConstructorStatement(member: ClassElement): member is PropertyDeclaration {
            if (!isPropertyDeclaration(member) || hasStaticModifier(member)) {
                return false;
            }
            if (context.getCompilerOptions().useDefineForClassFields) {
                // If we are using define semantics and targeting ESNext or higher,
                // then we don't need to transform any class properties.
                return languageVersion < ScriptTarget.ESNext;
            }
            return isInitializedProperty(member) || shouldTransformPrivateFields && isPrivateIdentifierPropertyDeclaration(member);
        }

        function transformConstructor(node: ClassDeclaration | ClassExpression, isDerivedClass: boolean) {
            const constructor = visitNode(getFirstConstructorWithBody(node), visitor, isConstructorDeclaration);
            const properties = node.members.filter(isPropertyDeclarationThatRequiresConstructorStatement);
            if (!some(properties)) {
                return constructor;
            }
            const parameters = visitParameterList(constructor ? constructor.parameters : undefined, visitor, context);
            const body = transformConstructorBody(node, constructor, isDerivedClass);
            if (!body) {
                return undefined;
            }
            return startOnNewLine(
                setOriginalNode(
                    setTextRange(
                        factory.createConstructorDeclaration(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            parameters ?? [],
                            body
                        ),
                        constructor || node
                    ),
                    constructor
                )
            );
        }

        function transformConstructorBody(node: ClassDeclaration | ClassExpression, constructor: ConstructorDeclaration | undefined, isDerivedClass: boolean) {
            const useDefineForClassFields = context.getCompilerOptions().useDefineForClassFields;
            let properties = getProperties(node, /*requireInitializer*/ false, /*isStatic*/ false);
            if (!useDefineForClassFields) {
                properties = filter(properties, property => !!property.initializer || isPrivateIdentifier(property.name));
            }


            // Only generate synthetic constructor when there are property initializers to move.
            if (!constructor && !some(properties)) {
                return visitFunctionBody(/*node*/ undefined, visitor, context);
            }

            resumeLexicalEnvironment();

            let indexOfFirstStatement = 0;
            let statements: Statement[] = [];

            if (!constructor && isDerivedClass) {
                // Add a synthetic `super` call:
                //
                //  super(...arguments);
                //
                statements.push(
                    factory.createExpressionStatement(
                        factory.createCallExpression(
                            factory.createSuper(),
                            /*typeArguments*/ undefined,
                            [factory.createSpreadElement(factory.createIdentifier("arguments"))]
                        )
                    )
                );
            }

            if (constructor) {
                indexOfFirstStatement = addPrologueDirectivesAndInitialSuperCall(factory, constructor, statements, visitor);
            }
            // Add the property initializers. Transforms this:
            //
            //  public x = 1;
            //
            // Into this:
            //
            //  constructor() {
            //      this.x = 1;
            //  }
            //
            if (constructor?.body) {
                let afterParameterProperties = findIndex(constructor.body.statements, s => !isParameterPropertyDeclaration(getOriginalNode(s), constructor), indexOfFirstStatement);
                if (afterParameterProperties === -1) {
                    afterParameterProperties = constructor.body.statements.length;
                }
                if (afterParameterProperties > indexOfFirstStatement) {
                    if (!useDefineForClassFields) {
                        addRange(statements, visitNodes(constructor.body.statements, visitor, isStatement, indexOfFirstStatement, afterParameterProperties - indexOfFirstStatement));
                    }
                    indexOfFirstStatement = afterParameterProperties;
                }
            }
            addPropertyStatements(statements, properties, factory.createThis());

            // Add existing statements, skipping the initial super call.
            if (constructor) {
                addRange(statements, visitNodes(constructor.body!.statements, visitor, isStatement, indexOfFirstStatement));
            }

            statements = factory.mergeLexicalEnvironment(statements, endLexicalEnvironment());

            return setTextRange(
                factory.createBlock(
                    setTextRange(
                        factory.createNodeArray(statements),
                        /*location*/ constructor ? constructor.body!.statements : node.members
                    ),
                    /*multiLine*/ true
                ),
                /*location*/ constructor ? constructor.body : undefined
            );
        }

        /**
         * Generates assignment statements for property initializers.
         *
         * @param properties An array of property declarations to transform.
         * @param receiver The receiver on which each property should be assigned.
         */
        function addPropertyStatements(statements: Statement[], properties: readonly PropertyDeclaration[], receiver: LeftHandSideExpression) {
            for (const property of properties) {
                const expression = transformProperty(property, receiver);
                if (!expression) {
                    continue;
                }
                const statement = factory.createExpressionStatement(expression);
                setSourceMapRange(statement, moveRangePastModifiers(property));
                setCommentRange(statement, property);
                setOriginalNode(statement, property);
                statements.push(statement);
            }
        }

        /**
         * Generates assignment expressions for property initializers.
         *
         * @param properties An array of property declarations to transform.
         * @param receiver The receiver on which each property should be assigned.
         */
        function generateInitializedPropertyExpressions(properties: readonly PropertyDeclaration[], receiver: LeftHandSideExpression) {
            const expressions: Expression[] = [];
            for (const property of properties) {
                const expression = transformProperty(property, receiver);
                if (!expression) {
                    continue;
                }
                startOnNewLine(expression);
                setSourceMapRange(expression, moveRangePastModifiers(property));
                setCommentRange(expression, property);
                setOriginalNode(expression, property);
                expressions.push(expression);
            }

            return expressions;
        }

        /**
         * Transforms a property initializer into an assignment statement.
         *
         * @param property The property declaration.
         * @param receiver The object receiving the property assignment.
         */
        function transformProperty(property: PropertyDeclaration, receiver: LeftHandSideExpression) {
            // We generate a name here in order to reuse the value cached by the relocated computed name expression (which uses the same generated name)
            const emitAssignment = !context.getCompilerOptions().useDefineForClassFields;
            const propertyName = isComputedPropertyName(property.name) && !isSimpleInlineableExpression(property.name.expression)
                ? factory.updateComputedPropertyName(property.name, factory.getGeneratedNameForNode(property.name))
                : property.name;

            if (shouldTransformPrivateFields && isPrivateIdentifier(propertyName)) {
                const privateIdentifierInfo = accessPrivateIdentifier(propertyName);
                if (privateIdentifierInfo) {
                    switch (privateIdentifierInfo.placement) {
                        case PrivateIdentifierPlacement.InstanceField: {
                            return createPrivateInstanceFieldInitializer(
                                receiver,
                                visitNode(property.initializer, visitor, isExpression),
                                privateIdentifierInfo.weakMapName
                            );
                        }
                    }
                }
                else {
                    Debug.fail("Undeclared private name for property declaration.");
                }
            }
            if (isPrivateIdentifier(propertyName) && !property.initializer) {
                return undefined;
            }

            if (isPrivateIdentifier(propertyName) && !property.initializer) {
                return undefined;
            }

            const propertyOriginalNode = getOriginalNode(property);
            const initializer = property.initializer || emitAssignment ? visitNode(property.initializer, visitor, isExpression) ?? factory.createVoidZero()
                : isParameterPropertyDeclaration(propertyOriginalNode, propertyOriginalNode.parent) && isIdentifier(propertyName) ? propertyName
                : factory.createVoidZero();

            if (emitAssignment || isPrivateIdentifier(propertyName)) {
                const memberAccess = createMemberAccessForPropertyName(factory, receiver, propertyName, /*location*/ propertyName);
                return factory.createAssignment(memberAccess, initializer);
            }
            else {
                const name = isComputedPropertyName(propertyName) ? propertyName.expression
                    : isIdentifier(propertyName) ? factory.createStringLiteral(unescapeLeadingUnderscores(propertyName.escapedText))
                    : propertyName;
                const descriptor = factory.createPropertyDescriptor({ value: initializer, configurable: true, writable: true, enumerable: true });
                return factory.createObjectDefinePropertyCall(receiver, name, descriptor);
            }
        }

        function enableSubstitutionForClassAliases() {
            if ((enabledSubstitutions & ClassPropertySubstitutionFlags.ClassAliases) === 0) {
                enabledSubstitutions |= ClassPropertySubstitutionFlags.ClassAliases;

                // We need to enable substitutions for identifiers. This allows us to
                // substitute class names inside of a class declaration.
                context.enableSubstitution(SyntaxKind.Identifier);

                // Keep track of class aliases.
                classAliases = [];
            }
        }

        /**
         * Hooks node substitutions.
         *
         * @param hint The context for the emitter.
         * @param node The node to substitute.
         */
        function onSubstituteNode(hint: EmitHint, node: Node) {
            node = previousOnSubstituteNode(hint, node);
            if (hint === EmitHint.Expression) {
                return substituteExpression(node as Expression);
            }
            return node;
        }

        function substituteExpression(node: Expression) {
            switch (node.kind) {
                case SyntaxKind.Identifier:
                    return substituteExpressionIdentifier(node as Identifier);
            }
            return node;
        }

        function substituteExpressionIdentifier(node: Identifier): Expression {
            return trySubstituteClassAlias(node) || node;
        }

        function trySubstituteClassAlias(node: Identifier): Expression | undefined {
            if (enabledSubstitutions & ClassPropertySubstitutionFlags.ClassAliases) {
                if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.ConstructorReferenceInClass) {
                    // Due to the emit for class decorators, any reference to the class from inside of the class body
                    // must instead be rewritten to point to a temporary variable to avoid issues with the double-bind
                    // behavior of class names in ES6.
                    // Also, when emitting statics for class expressions, we must substitute a class alias for
                    // constructor references in static property initializers.
                    const declaration = resolver.getReferencedValueDeclaration(node);
                    if (declaration) {
                        const classAlias = classAliases[declaration.id!]; // TODO: GH#18217
                        if (classAlias) {
                            const clone = factory.cloneNode(classAlias);
                            setSourceMapRange(clone, node);
                            setCommentRange(clone, node);
                            return clone;
                        }
                    }
                }
            }

            return undefined;
        }


        /**
         * If the name is a computed property, this function transforms it, then either returns an expression which caches the
         * value of the result or the expression itself if the value is either unused or safe to inline into multiple locations
         * @param shouldHoist Does the expression need to be reused? (ie, for an initializer or a decorator)
         */
        function getPropertyNameExpressionIfNeeded(name: PropertyName, shouldHoist: boolean): Expression | undefined {
            if (isComputedPropertyName(name)) {
                const expression = visitNode(name.expression, visitor, isExpression);
                const innerExpression = skipPartiallyEmittedExpressions(expression);
                const inlinable = isSimpleInlineableExpression(innerExpression);
                const alreadyTransformed = isAssignmentExpression(innerExpression) && isGeneratedIdentifier(innerExpression.left);
                if (!alreadyTransformed && !inlinable && shouldHoist) {
                    const generatedName = factory.getGeneratedNameForNode(name);
                    hoistVariableDeclaration(generatedName);
                    return factory.createAssignment(generatedName, expression);
                }
                return (inlinable || isIdentifier(innerExpression)) ? undefined : expression;
            }
        }

        function startPrivateIdentifierEnvironment() {
            privateIdentifierEnvironmentStack.push(currentPrivateIdentifierEnvironment);
            currentPrivateIdentifierEnvironment = undefined;
        }

        function endPrivateIdentifierEnvironment() {
            currentPrivateIdentifierEnvironment = privateIdentifierEnvironmentStack.pop();
        }

        function getPrivateIdentifierEnvironment() {
            return currentPrivateIdentifierEnvironment || (currentPrivateIdentifierEnvironment = new Map());
        }

        function getPendingExpressions() {
            return pendingExpressions || (pendingExpressions = []);
        }

        function addPrivateIdentifierToEnvironment(name: PrivateIdentifier) {
            const text = getTextOfPropertyName(name) as string;
            const weakMapName = factory.createUniqueName("_" + text.substring(1), GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.ReservedInNestedScopes);
            hoistVariableDeclaration(weakMapName);
            getPrivateIdentifierEnvironment().set(name.escapedText, { placement: PrivateIdentifierPlacement.InstanceField, weakMapName });
            getPendingExpressions().push(
                factory.createAssignment(
                    weakMapName,
                    factory.createNewExpression(
                        factory.createIdentifier("WeakMap"),
                        /*typeArguments*/ undefined,
                        []
                    )
                )
            );
        }

        function accessPrivateIdentifier(name: PrivateIdentifier) {
            if (currentPrivateIdentifierEnvironment) {
                const info = currentPrivateIdentifierEnvironment.get(name.escapedText);
                if (info) {
                    return info;
                }
            }
            for (let i = privateIdentifierEnvironmentStack.length - 1; i >= 0; --i) {
                const env = privateIdentifierEnvironmentStack[i];
                if (!env) {
                    continue;
                }
                const info = env.get(name.escapedText);
                if (info) {
                    return info;
                }
            }
            return undefined;
        }


        function wrapPrivateIdentifierForDestructuringTarget(node: PrivateIdentifierPropertyAccessExpression) {
            const parameter = factory.getGeneratedNameForNode(node);
            const info = accessPrivateIdentifier(node.name);
            if (!info) {
                return visitEachChild(node, visitor, context);
            }
            let receiver = node.expression;
            // We cannot copy `this` or `super` into the function because they will be bound
            // differently inside the function.
            if (isThisProperty(node) || isSuperProperty(node) || !isSimpleCopiableExpression(node.expression)) {
                receiver = factory.createTempVariable(hoistVariableDeclaration, /*reservedInNestedScopes*/ true);
                getPendingExpressions().push(factory.createBinaryExpression(receiver, SyntaxKind.EqualsToken, node.expression));
            }
            return factory.createPropertyAccessExpression(
                // Explicit parens required because of v8 regression (https://bugs.chromium.org/p/v8/issues/detail?id=9560)
                factory.createParenthesizedExpression(
                    factory.createObjectLiteralExpression([
                        factory.createSetAccessorDeclaration(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            "value",
                            [factory.createParameterDeclaration(
                                /*decorators*/ undefined,
                                /*modifiers*/ undefined,
                                /*dotDotDotToken*/ undefined,
                                parameter,
                                /*questionToken*/ undefined,
                                /*type*/ undefined,
                                /*initializer*/ undefined
                            )],
                            factory.createBlock(
                                [factory.createExpressionStatement(
                                    createPrivateIdentifierAssignment(
                                        info,
                                        receiver,
                                        parameter,
                                        SyntaxKind.EqualsToken
                                    )
                                )]
                            )
                        )
                    ])
                ),
                "value"
            );
        }

        function visitArrayAssignmentTarget(node: BindingOrAssignmentElement) {
            const target = getTargetOfBindingOrAssignmentElement(node);
            if (target && isPrivateIdentifierPropertyAccessExpression(target)) {
                const wrapped = wrapPrivateIdentifierForDestructuringTarget(target);
                if (isAssignmentExpression(node)) {
                    return factory.updateBinaryExpression(
                        node,
                        wrapped,
                        node.operatorToken,
                        visitNode(node.right, visitor, isExpression)
                    );
                }
                else if (isSpreadElement(node)) {
                    return factory.updateSpreadElement(node, wrapped);
                }
                else {
                    return wrapped;
                }
            }
            return visitNode(node, visitorDestructuringTarget);
        }

        function visitObjectAssignmentTarget(node: ObjectLiteralElementLike) {
            if (isPropertyAssignment(node)) {
                const target = getTargetOfBindingOrAssignmentElement(node);
                if (target && isPrivateIdentifierPropertyAccessExpression(target)) {
                    const initializer = getInitializerOfBindingOrAssignmentElement(node);
                    const wrapped = wrapPrivateIdentifierForDestructuringTarget(target);
                    return factory.updatePropertyAssignment(
                        node,
                        visitNode(node.name, visitor),
                        initializer ? factory.createAssignment(wrapped, visitNode(initializer, visitor)) : wrapped,
                    );
                }
                return factory.updatePropertyAssignment(
                    node,
                    visitNode(node.name, visitor),
                    visitNode(node.initializer, visitorDestructuringTarget)
                );
            }
            return visitNode(node, visitor);
        }


        function visitAssignmentPattern(node: AssignmentPattern) {
            if (isArrayLiteralExpression(node)) {
                // Transforms private names in destructuring assignment array bindings.
                //
                // Source:
                // ([ this.#myProp ] = [ "hello" ]);
                //
                // Transformation:
                // [ { set value(x) { this.#myProp = x; } }.value ] = [ "hello" ];
                return factory.updateArrayLiteralExpression(
                    node,
                    visitNodes(node.elements, visitArrayAssignmentTarget, isExpression)
                );
            }
            else {
                // Transforms private names in destructuring assignment object bindings.
                //
                // Source:
                // ({ stringProperty: this.#myProp } = { stringProperty: "hello" });
                //
                // Transformation:
                // ({ stringProperty: { set value(x) { this.#myProp = x; } }.value }) = { stringProperty: "hello" };
                return factory.updateObjectLiteralExpression(
                    node,
                    visitNodes(node.properties, visitObjectAssignmentTarget, isObjectLiteralElementLike)
                );
            }
        }
    }

    function createPrivateInstanceFieldInitializer(receiver: LeftHandSideExpression, initializer: Expression | undefined, weakMapName: Identifier) {
        return factory.createCallExpression(
            factory.createPropertyAccessExpression(weakMapName, "set"),
            /*typeArguments*/ undefined,
            [receiver, initializer || factory.createVoidZero()]
        );
    }
}
