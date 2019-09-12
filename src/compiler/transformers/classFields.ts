/*@internal*/
namespace ts {
    const enum ClassPropertySubstitutionFlags {
        /**
         * Enables substitutions for class expressions with static fields
         * which have initializers that reference the class name.
         */
        ClassAliases = 1 << 0,
    }
    /**
     * Transforms ECMAScript Class Syntax.
     * TypeScript parameter property syntax is transformed in the TypeScript transformer.
     * For now, this transforms public field declarations using TypeScript class semantics
     * (where the declarations get elided and initializers are transformed as assignments in the constructor).
     * Eventually, this transform will change to the ECMAScript semantics (with Object.defineProperty).
     */
    export function transformClassFields(context: TransformationContext) {
        const {
            hoistVariableDeclaration,
            endLexicalEnvironment,
            resumeLexicalEnvironment
        } = context;
        const resolver = context.getEmitResolver();

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
            if (!(node.transformFlags & TransformFlags.ContainsClassFields)) return node;

            switch (node.kind) {
                case SyntaxKind.ClassExpression:
                    return visitClassExpression(node as ClassExpression);
                case SyntaxKind.ClassDeclaration:
                    return visitClassDeclaration(node as ClassDeclaration);
                case SyntaxKind.VariableStatement:
                    return visitVariableStatement(node as VariableStatement);
            }
            return visitEachChild(node, visitor, context);
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
                node = updateComputedPropertyName(
                    node,
                    inlineExpressions(expressions)
                );
            }
            return node;
        }

        function visitPropertyDeclaration(node: PropertyDeclaration) {
            Debug.assert(!some(node.decorators));
            // Create a temporary variable to store a computed property name (if necessary).
            // If it's not inlineable, then we emit an expression after the class which assigns
            // the property name to the temporary variable.
            const expr = getPropertyNameExpressionIfNeeded(node.name, !!node.initializer);
            if (expr && !isSimpleInlineableExpression(expr)) {
                (pendingExpressions || (pendingExpressions = [])).push(expr);
            }
            return undefined;
        }

        function visitClassDeclaration(node: ClassDeclaration) {
            if (!forEach(node.members, isPropertyDeclaration)) {
                return visitEachChild(node, visitor, context);
            }

            const savedPendingExpressions = pendingExpressions;
            pendingExpressions = undefined!;

            const extendsClauseElement = getEffectiveBaseTypeNode(node);
            const isDerivedClass = !!(extendsClauseElement && skipOuterExpressions(extendsClauseElement.expression).kind !== SyntaxKind.NullKeyword);

            const statements: Statement[] = [
                updateClassDeclaration(
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
                statements.push(createExpressionStatement(inlineExpressions(pendingExpressions)));
            }

            pendingExpressions = savedPendingExpressions;

            // Emit static property assignment. Because classDeclaration is lexically evaluated,
            // it is safe to emit static property assignment after classDeclaration
            // From ES6 specification:
            //      HasLexicalDeclaration (N) : Determines if the argument identifier has a binding in this environment record that was created using
            //                                  a lexical declaration such as a LexicalDeclaration or a ClassDeclaration.
            const staticProperties = getInitializedProperties(node, /*isStatic*/ true);
            if (some(staticProperties)) {
                addInitializedPropertyStatements(statements, staticProperties, getInternalName(node));
            }

            return statements;
        }

        function visitClassExpression(node: ClassExpression): Expression {
            if (!forEach(node.members, isPropertyDeclaration)) {
                return visitEachChild(node, visitor, context);
            }
            const savedPendingExpressions = pendingExpressions;
            pendingExpressions = undefined;

            // If this class expression is a transformation of a decorated class declaration,
            // then we want to output the pendingExpressions as statements, not as inlined
            // expressions with the class statement.
            //
            // In this case, we use pendingStatements to produce the same output as the
            // class declaration transformation. The VariableStatement visitor will insert
            // these statements after the class expression variable statement.
            const isDecoratedClassDeclaration = isClassDeclaration(getOriginalNode(node));

            const staticProperties = getInitializedProperties(node, /*isStatic*/ true);
            const extendsClauseElement = getEffectiveBaseTypeNode(node);
            const isDerivedClass = !!(extendsClauseElement && skipOuterExpressions(extendsClauseElement.expression).kind !== SyntaxKind.NullKeyword);

            const classExpression = updateClassExpression(
                node,
                node.modifiers,
                node.name,
                /*typeParameters*/ undefined,
                visitNodes(node.heritageClauses, visitor, isHeritageClause),
                transformClassMembers(node, isDerivedClass)
            );

            if (some(staticProperties) || some(pendingExpressions)) {
                if (isDecoratedClassDeclaration) {
                    Debug.assertDefined(pendingStatements, "Decorated classes transformed by TypeScript are expected to be within a variable declaration.");

                    // Write any pending expressions from elided or moved computed property names
                    if (pendingStatements && pendingExpressions && some(pendingExpressions)) {
                        pendingStatements.push(createExpressionStatement(inlineExpressions(pendingExpressions)));
                    }
                    pendingExpressions = savedPendingExpressions;

                    if (pendingStatements && some(staticProperties)) {
                        addInitializedPropertyStatements(pendingStatements, staticProperties, getInternalName(node));
                    }
                    return classExpression;
                }
                else {
                    const expressions: Expression[] = [];
                    const isClassWithConstructorReference = resolver.getNodeCheckFlags(node) & NodeCheckFlags.ClassWithConstructorReference;
                    const temp = createTempVariable(hoistVariableDeclaration, !!isClassWithConstructorReference);
                    if (isClassWithConstructorReference) {
                        // record an alias as the class name is not in scope for statics.
                        enableSubstitutionForClassAliases();
                        const alias = getSynthesizedClone(temp);
                        alias.autoGenerateFlags &= ~GeneratedIdentifierFlags.ReservedInNestedScopes;
                        classAliases[getOriginalNodeId(node)] = alias;
                    }

                    // To preserve the behavior of the old emitter, we explicitly indent
                    // the body of a class with static initializers.
                    setEmitFlags(classExpression, EmitFlags.Indented | getEmitFlags(classExpression));
                    expressions.push(startOnNewLine(createAssignment(temp, classExpression)));
                    // Add any pending expressions leftover from elided or relocated computed property names
                    addRange(expressions, map(pendingExpressions, startOnNewLine));
                    addRange(expressions, generateInitializedPropertyExpressions(staticProperties, temp));
                    expressions.push(startOnNewLine(temp));

                    pendingExpressions = savedPendingExpressions;
                    return inlineExpressions(expressions);
                }
            }

            pendingExpressions = savedPendingExpressions;
            return classExpression;
        }

        function transformClassMembers(node: ClassDeclaration | ClassExpression, isDerivedClass: boolean) {
            const members: ClassElement[] = [];
            const constructor = transformConstructor(node, isDerivedClass);
            if (constructor) {
                members.push(constructor);
            }
            addRange(members, visitNodes(node.members, classElementVisitor, isClassElement));
            return setTextRange(createNodeArray(members), /*location*/ node.members);
        }

        function transformConstructor(node: ClassDeclaration | ClassExpression, isDerivedClass: boolean) {
            const constructor = visitNode(getFirstConstructorWithBody(node), visitor, isConstructorDeclaration);
            const containsPropertyInitializer = forEach(node.members, isInitializedProperty);
            if (!containsPropertyInitializer) {
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
                        createConstructor(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            parameters,
                            body
                        ),
                        constructor || node
                    ),
                    constructor
                )
            );
        }

        function transformConstructorBody(node: ClassDeclaration | ClassExpression, constructor: ConstructorDeclaration | undefined, isDerivedClass: boolean) {
            const properties = getInitializedProperties(node, /*isStatic*/ false);

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
                    createExpressionStatement(
                        createCall(
                            createSuper(),
                            /*typeArguments*/ undefined,
                            [createSpread(createIdentifier("arguments"))]
                        )
                    )
                );
            }

            if (constructor) {
                indexOfFirstStatement = addPrologueDirectivesAndInitialSuperCall(constructor, statements, visitor);
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
            if (constructor && constructor.body) {
                let parameterPropertyDeclarationCount = 0;
                for (let i = indexOfFirstStatement; i < constructor.body.statements.length; i++) {
                    if (isParameterPropertyDeclaration(getOriginalNode(constructor.body.statements[i]))) {
                        parameterPropertyDeclarationCount++;
                    }
                    else {
                        break;
                    }
                }
                if (parameterPropertyDeclarationCount > 0) {
                    addRange(statements, visitNodes(constructor.body.statements, visitor, isStatement, indexOfFirstStatement, parameterPropertyDeclarationCount));
                    indexOfFirstStatement += parameterPropertyDeclarationCount;
                }
            }
            addInitializedPropertyStatements(statements, properties, createThis());

            // Add existing statements, skipping the initial super call.
            if (constructor) {
                addRange(statements, visitNodes(constructor.body!.statements, visitor, isStatement, indexOfFirstStatement));
            }

            statements = mergeLexicalEnvironment(statements, endLexicalEnvironment());

            return setTextRange(
                createBlock(
                    setTextRange(
                        createNodeArray(statements),
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
        function addInitializedPropertyStatements(statements: Statement[], properties: readonly PropertyDeclaration[], receiver: LeftHandSideExpression) {
            for (const property of properties) {
                const statement = createExpressionStatement(transformInitializedProperty(property, receiver));
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
                const expression = transformInitializedProperty(property, receiver);
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
        function transformInitializedProperty(property: PropertyDeclaration, receiver: LeftHandSideExpression) {
            // We generate a name here in order to reuse the value cached by the relocated computed name expression (which uses the same generated name)
            const propertyName = isComputedPropertyName(property.name) && !isSimpleInlineableExpression(property.name.expression)
                ? updateComputedPropertyName(property.name, getGeneratedNameForNode(property.name))
                : property.name;
            const initializer = visitNode(property.initializer, visitor, isExpression);
            const memberAccess = createMemberAccessForPropertyName(receiver, propertyName, /*location*/ propertyName);

            return createAssignment(memberAccess, initializer);
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
                            const clone = getSynthesizedClone(classAlias);
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
                    const generatedName = getGeneratedNameForNode(name);
                    hoistVariableDeclaration(generatedName);
                    return createAssignment(generatedName, expression);
                }
                return (inlinable || isIdentifier(innerExpression)) ? undefined : expression;
            }
        }
    }

}
