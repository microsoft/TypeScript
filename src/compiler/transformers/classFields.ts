/*@internal*/
namespace ts {
    const enum ClassPropertySubstitutionFlags {
        /**
         * Enables substitutions for class expressions with static fields
         * which have initializers that reference the class name.
         */
        ClassAliases = 1 << 0,
        /**
         * Enables substitutions for class expressions with static fields
         * which have initializers that reference the 'this' or 'super'.
         */
        ClassStaticThisOrSuperReference = 1 << 1,
    }
    export const enum PrivateIdentifierKind {
        Field = "f",
        Method = "m",
        Accessor = "a"
    }
    interface PrivateIdentifierInfoBase {
        /**
         * brandCheckIdentifier can contain:
         *  - For instance field: The WeakMap that will be the storage for the field.
         *  - For instance methods or accessors: The WeakSet that will be used for brand checking.
         *  - For static members: The constructor that will be used for brand checking.
         */
        brandCheckIdentifier: Identifier;
        /**
         * Stores if the identifier is static or not
         */
        isStatic: boolean;
        /**
         * Stores if the identifier declaration is valid or not. Reserved names (e.g. #constructor)
         * or duplicate identifiers are considered invalid.
         */
        isValid: boolean;
    }
    interface PrivateIdentifierAccessorInfo extends PrivateIdentifierInfoBase {
        kind: PrivateIdentifierKind.Accessor;
        /**
         * Identifier for a variable that will contain the private get accessor implementation, if any.
         */
        getterName?: Identifier;
        /**
         * Identifier for a variable that will contain the private set accessor implementation, if any.
         */
        setterName?: Identifier;
    }
    interface PrivateIdentifierMethodInfo extends PrivateIdentifierInfoBase {
        kind: PrivateIdentifierKind.Method;
        /**
         * Identifier for a variable that will contain the private method implementation.
         */
        methodName: Identifier;
    }
    interface PrivateIdentifierInstanceFieldInfo extends PrivateIdentifierInfoBase {
        kind: PrivateIdentifierKind.Field;
        isStatic: false;
        /**
         * Defined for ease of access when in a union with PrivateIdentifierStaticFieldInfo.
         */
        variableName: undefined;
    }
    interface PrivateIdentifierStaticFieldInfo extends PrivateIdentifierInfoBase {
        kind: PrivateIdentifierKind.Field;
        isStatic: true;
        /**
         * Contains the variable that will server as the storage for the field.
         */
        variableName: Identifier;
    }

    type PrivateIdentifierInfo =
        | PrivateIdentifierMethodInfo
        | PrivateIdentifierInstanceFieldInfo
        | PrivateIdentifierStaticFieldInfo
        | PrivateIdentifierAccessorInfo;

    interface PrivateIdentifierEnvironment {
        /**
         * Used for prefixing generated variable names.
         */
        className: string;
        /**
         * Used for brand check on private methods.
         */
        weakSetName?: Identifier;
        /**
         * A mapping of private names to information needed for transformation.
         */
        identifiers: UnderscoreEscapedMap<PrivateIdentifierInfo>
    }

    interface ClassLexicalEnvironment {
        facts: ClassFacts;
        /**
         * Used for brand checks on static members, and `this` references in static initializers
         */
        classConstructor: Identifier | undefined;
        /**
         * Used for `super` references in static initializers.
         */
        superClassReference: Identifier | undefined;
        privateIdentifierEnvironment: PrivateIdentifierEnvironment | undefined;
    }

    const enum ClassFacts {
        None = 0,
        ClassWasDecorated = 1 << 0,
        NeedsClassConstructorReference = 1 << 1,
        NeedsClassSuperReference = 1 << 2,
        NeedsSubstitutionForThisInClassStaticField = 1 << 3,
    }

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
            startLexicalEnvironment,
            resumeLexicalEnvironment,
            addBlockScopedVariable
        } = context;
        const resolver = context.getEmitResolver();
        const compilerOptions = context.getCompilerOptions();
        const languageVersion = getEmitScriptTarget(compilerOptions);
        const useDefineForClassFields = getUseDefineForClassFields(compilerOptions);

        const shouldTransformPrivateElementsOrClassStaticBlocks = languageVersion < ScriptTarget.ES2022;

        // We don't need to transform `super` property access when targeting ES5, ES3 because
        // the es2015 transformation handles those.
        const shouldTransformSuperInStaticInitializers = (languageVersion <= ScriptTarget.ES2021 || !useDefineForClassFields) && languageVersion >= ScriptTarget.ES2015;
        const shouldTransformThisInStaticInitializers = languageVersion <= ScriptTarget.ES2021 || !useDefineForClassFields;

        const previousOnSubstituteNode = context.onSubstituteNode;
        context.onSubstituteNode = onSubstituteNode;
        const previousOnEmitNode = context.onEmitNode;
        context.onEmitNode = onEmitNode;

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

        const classLexicalEnvironmentStack: (ClassLexicalEnvironment | undefined)[] = [];
        const classLexicalEnvironmentMap = new Map<number, ClassLexicalEnvironment>();
        let currentClassLexicalEnvironment: ClassLexicalEnvironment | undefined;
        let currentComputedPropertyNameClassLexicalEnvironment: ClassLexicalEnvironment | undefined;
        let currentStaticPropertyDeclarationOrStaticBlock: PropertyDeclaration | ClassStaticBlockDeclaration | undefined;

        return chainBundle(context, transformSourceFile);

        function transformSourceFile(node: SourceFile) {
            const options = context.getCompilerOptions();
            if (node.isDeclarationFile
                || useDefineForClassFields && getEmitScriptTarget(options) >= ScriptTarget.ES2022) {
                return node;
            }
            const visited = visitEachChild(node, visitor, context);
            addEmitHelpers(visited, context.readEmitHelpers());
            return visited;
        }

        function visitorWorker(node: Node, valueIsDiscarded: boolean): VisitResult<Node> {
            if (node.transformFlags & TransformFlags.ContainsClassFields) {
                switch (node.kind) {
                    case SyntaxKind.ClassExpression:
                    case SyntaxKind.ClassDeclaration:
                        return visitClassLike(node as ClassLikeDeclaration);
                    case SyntaxKind.PropertyDeclaration:
                        return visitPropertyDeclaration(node as PropertyDeclaration);
                    case SyntaxKind.VariableStatement:
                        return visitVariableStatement(node as VariableStatement);
                    case SyntaxKind.PrivateIdentifier:
                        return visitPrivateIdentifier(node as PrivateIdentifier);
                    case SyntaxKind.ClassStaticBlockDeclaration:
                        return visitClassStaticBlockDeclaration(node as ClassStaticBlockDeclaration);
                }
            }
            if (node.transformFlags & TransformFlags.ContainsClassFields ||
                node.transformFlags & TransformFlags.ContainsLexicalSuper &&
                    shouldTransformSuperInStaticInitializers &&
                    currentStaticPropertyDeclarationOrStaticBlock &&
                    currentClassLexicalEnvironment) {
                switch (node.kind) {
                    case SyntaxKind.PrefixUnaryExpression:
                    case SyntaxKind.PostfixUnaryExpression:
                        return visitPreOrPostfixUnaryExpression(node as PrefixUnaryExpression | PostfixUnaryExpression, valueIsDiscarded);
                    case SyntaxKind.BinaryExpression:
                        return visitBinaryExpression(node as BinaryExpression, valueIsDiscarded);
                    case SyntaxKind.CallExpression:
                        return visitCallExpression(node as CallExpression);
                    case SyntaxKind.TaggedTemplateExpression:
                        return visitTaggedTemplateExpression(node as TaggedTemplateExpression);
                    case SyntaxKind.PropertyAccessExpression:
                        return visitPropertyAccessExpression(node as PropertyAccessExpression);
                    case SyntaxKind.ElementAccessExpression:
                        return visitElementAccessExpression(node as ElementAccessExpression);
                    case SyntaxKind.ExpressionStatement:
                        return visitExpressionStatement(node as ExpressionStatement);
                    case SyntaxKind.ForStatement:
                        return visitForStatement(node as ForStatement);
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.Constructor:
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor: {
                        const savedCurrentStaticPropertyDeclarationOrStaticBlock = currentStaticPropertyDeclarationOrStaticBlock;
                        currentStaticPropertyDeclarationOrStaticBlock = undefined;
                        const result = visitEachChild(node, visitor, context);
                        currentStaticPropertyDeclarationOrStaticBlock = savedCurrentStaticPropertyDeclarationOrStaticBlock;
                        return result;
                    }
                }
            }
            return visitEachChild(node, visitor, context);
        }

        function discardedValueVisitor(node: Node): VisitResult<Node> {
            return visitorWorker(node, /*valueIsDiscarded*/ true);
        }

        function visitor(node: Node): VisitResult<Node> {
            return visitorWorker(node, /*valueIsDiscarded*/ false);
        }

        function heritageClauseVisitor(node: Node): VisitResult<Node> {
            switch (node.kind) {
                case SyntaxKind.HeritageClause:
                    return visitEachChild(node, heritageClauseVisitor, context);
                case SyntaxKind.ExpressionWithTypeArguments:
                    return visitExpressionWithTypeArguments(node as ExpressionWithTypeArguments);
            }
            return visitor(node);
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
         * Replace it with an empty identifier to indicate a problem with the code,
         * unless we are in a statement position - otherwise this will not trigger
         * a SyntaxError.
         */
        function visitPrivateIdentifier(node: PrivateIdentifier) {
            if (!shouldTransformPrivateElementsOrClassStaticBlocks) {
                return node;
            }
            if (isStatement(node.parent)) {
                return node;
            }
            return setOriginalNode(factory.createIdentifier(""), node);
        }

        /**
         * Visits `#id in expr`
         */
        function visitPrivateIdentifierInInExpression(node: BinaryExpression) {
            if (!shouldTransformPrivateElementsOrClassStaticBlocks) {
                return node;
            }
            const privId = node.left;
            Debug.assertNode(privId, isPrivateIdentifier);
            Debug.assert(node.operatorToken.kind === SyntaxKind.InKeyword);
            const info = accessPrivateIdentifier(privId);
            if (info) {
                const receiver = visitNode(node.right, visitor, isExpression);

                return setOriginalNode(
                    context.getEmitHelperFactory().createClassPrivateFieldInHelper(info.brandCheckIdentifier, receiver),
                    node
                );
            }

            // Private name has not been declared. Subsequent transformers will handle this error
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
                    return visitMethodOrAccessorDeclaration(node as MethodDeclaration | AccessorDeclaration);

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
                expressions.push(node.expression);
                pendingExpressions = [];
                node = factory.updateComputedPropertyName(
                    node,
                    factory.inlineExpressions(expressions)
                );
            }
            return node;
        }

        function visitMethodOrAccessorDeclaration(node: MethodDeclaration | AccessorDeclaration) {
            Debug.assert(!some(node.decorators));

            if (!shouldTransformPrivateElementsOrClassStaticBlocks || !isPrivateIdentifier(node.name)) {
                return visitEachChild(node, classElementVisitor, context);
            }

            // leave invalid code untransformed
            const info = accessPrivateIdentifier(node.name);
            Debug.assert(info, "Undeclared private name for property declaration.");
            if (!info.isValid) {
                return node;
            }

            const functionName = getHoistedFunctionName(node);
            if (functionName) {
                getPendingExpressions().push(
                    factory.createAssignment(
                        functionName,
                        factory.createFunctionExpression(
                            filter(node.modifiers, m => !isStaticModifier(m)),
                            node.asteriskToken,
                            functionName,
                            /* typeParameters */ undefined,
                            visitParameterList(node.parameters, classElementVisitor, context),
                            /* type */ undefined,
                            visitFunctionBody(node.body!, classElementVisitor, context)
                        )
                    )
                );
            }

            // remove method declaration from class
            return undefined;
        }

        function getHoistedFunctionName(node: MethodDeclaration | AccessorDeclaration) {
            Debug.assert(isPrivateIdentifier(node.name));
            const info = accessPrivateIdentifier(node.name);
            Debug.assert(info, "Undeclared private name for property declaration.");

            if (info.kind === PrivateIdentifierKind.Method) {
                return info.methodName;
            }

            if (info.kind === PrivateIdentifierKind.Accessor) {
                if (isGetAccessor(node)) {
                    return info.getterName;
                }
                if (isSetAccessor(node)) {
                    return info.setterName;
                }
            }
        }

        function visitPropertyDeclaration(node: PropertyDeclaration) {
            Debug.assert(!some(node.decorators));

            if (isPrivateIdentifier(node.name)) {
                if (!shouldTransformPrivateElementsOrClassStaticBlocks) {
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

                // leave invalid code untransformed
                const info = accessPrivateIdentifier(node.name);
                Debug.assert(info, "Undeclared private name for property declaration.");
                if (!info.isValid) {
                    return node;
                }
            }
            // Create a temporary variable to store a computed property name (if necessary).
            // If it's not inlineable, then we emit an expression after the class which assigns
            // the property name to the temporary variable.
            const expr = getPropertyNameExpressionIfNeeded(node.name, !!node.initializer || useDefineForClassFields);
            if (expr && !isSimpleInlineableExpression(expr)) {
                getPendingExpressions().push(expr);
            }
            return undefined;
        }

        function createPrivateIdentifierAccess(info: PrivateIdentifierInfo, receiver: Expression): Expression {
            return createPrivateIdentifierAccessHelper(info, visitNode(receiver, visitor, isExpression));
        }

        function createPrivateIdentifierAccessHelper(info: PrivateIdentifierInfo, receiver: Expression): Expression {
            setCommentRange(receiver, moveRangePos(receiver, -1));

            switch(info.kind) {
                case PrivateIdentifierKind.Accessor:
                    return context.getEmitHelperFactory().createClassPrivateFieldGetHelper(
                        receiver,
                        info.brandCheckIdentifier,
                        info.kind,
                        info.getterName
                    );
                case PrivateIdentifierKind.Method:
                    return context.getEmitHelperFactory().createClassPrivateFieldGetHelper(
                        receiver,
                        info.brandCheckIdentifier,
                        info.kind,
                        info.methodName
                    );
                case PrivateIdentifierKind.Field:
                    return context.getEmitHelperFactory().createClassPrivateFieldGetHelper(
                        receiver,
                        info.brandCheckIdentifier,
                        info.kind,
                        info.variableName
                    );
                default:
                    Debug.assertNever(info, "Unknown private element type");
            }
        }

        function visitPropertyAccessExpression(node: PropertyAccessExpression) {
            if (shouldTransformPrivateElementsOrClassStaticBlocks && isPrivateIdentifier(node.name)) {
                const privateIdentifierInfo = accessPrivateIdentifier(node.name);
                if (privateIdentifierInfo) {
                    return setTextRange(
                        setOriginalNode(
                            createPrivateIdentifierAccess(privateIdentifierInfo, node.expression),
                            node
                        ),
                        node
                    );
                }
            }
            if (shouldTransformSuperInStaticInitializers &&
                isSuperProperty(node) &&
                isIdentifier(node.name) &&
                currentStaticPropertyDeclarationOrStaticBlock &&
                currentClassLexicalEnvironment) {
                const { classConstructor, superClassReference, facts } = currentClassLexicalEnvironment;
                if (facts & ClassFacts.ClassWasDecorated) {
                    return visitInvalidSuperProperty(node);
                }
                if (classConstructor && superClassReference) {
                    // converts `super.x` into `Reflect.get(_baseTemp, "x", _classTemp)`
                    const superProperty = factory.createReflectGetCall(
                        superClassReference,
                        factory.createStringLiteralFromNode(node.name),
                        classConstructor
                    );
                    setOriginalNode(superProperty, node.expression);
                    setTextRange(superProperty, node.expression);
                    return superProperty;
                }
            }
            return visitEachChild(node, visitor, context);
        }

        function visitElementAccessExpression(node: ElementAccessExpression) {
            if (shouldTransformSuperInStaticInitializers &&
                isSuperProperty(node) &&
                currentStaticPropertyDeclarationOrStaticBlock &&
                currentClassLexicalEnvironment) {
                const { classConstructor, superClassReference, facts } = currentClassLexicalEnvironment;
                if (facts & ClassFacts.ClassWasDecorated) {
                    return visitInvalidSuperProperty(node);
                }

                if (classConstructor && superClassReference) {
                    // converts `super[x]` into `Reflect.get(_baseTemp, x, _classTemp)`
                    const superProperty = factory.createReflectGetCall(
                        superClassReference,
                        visitNode(node.argumentExpression, visitor, isExpression),
                        classConstructor
                    );
                    setOriginalNode(superProperty, node.expression);
                    setTextRange(superProperty, node.expression);
                    return superProperty;
                }
            }
            return visitEachChild(node, visitor, context);
        }

        function visitPreOrPostfixUnaryExpression(node: PrefixUnaryExpression | PostfixUnaryExpression, valueIsDiscarded: boolean) {
            if (node.operator === SyntaxKind.PlusPlusToken || node.operator === SyntaxKind.MinusMinusToken) {
                if (shouldTransformPrivateElementsOrClassStaticBlocks && isPrivateIdentifierPropertyAccessExpression(node.operand)) {
                    let info: PrivateIdentifierInfo | undefined;
                    if (info = accessPrivateIdentifier(node.operand.name)) {
                        const receiver = visitNode(node.operand.expression, visitor, isExpression);
                        const { readExpression, initializeExpression } = createCopiableReceiverExpr(receiver);

                        let expression: Expression = createPrivateIdentifierAccess(info, readExpression);
                        const temp = isPrefixUnaryExpression(node) || valueIsDiscarded ? undefined : factory.createTempVariable(hoistVariableDeclaration);
                        expression = expandPreOrPostfixIncrementOrDecrementExpression(factory, node, expression, hoistVariableDeclaration, temp);
                        expression = createPrivateIdentifierAssignment(
                            info,
                            initializeExpression || readExpression,
                            expression,
                            SyntaxKind.EqualsToken
                        );
                        setOriginalNode(expression, node);
                        setTextRange(expression, node);
                        if (temp) {
                            expression = factory.createComma(expression, temp);
                            setTextRange(expression, node);
                        }
                        return expression;
                    }
                }
                else if (shouldTransformSuperInStaticInitializers &&
                    isSuperProperty(node.operand) &&
                    currentStaticPropertyDeclarationOrStaticBlock &&
                    currentClassLexicalEnvironment) {
                    // converts `++super.a` into `(Reflect.set(_baseTemp, "a", (_a = Reflect.get(_baseTemp, "a", _classTemp), _b = ++_a), _classTemp), _b)`
                    // converts `++super[f()]` into `(Reflect.set(_baseTemp, _a = f(), (_b = Reflect.get(_baseTemp, _a, _classTemp), _c = ++_b), _classTemp), _c)`
                    // converts `--super.a` into `(Reflect.set(_baseTemp, "a", (_a = Reflect.get(_baseTemp, "a", _classTemp), _b = --_a), _classTemp), _b)`
                    // converts `--super[f()]` into `(Reflect.set(_baseTemp, _a = f(), (_b = Reflect.get(_baseTemp, _a, _classTemp), _c = --_b), _classTemp), _c)`
                    // converts `super.a++` into `(Reflect.set(_baseTemp, "a", (_a = Reflect.get(_baseTemp, "a", _classTemp), _b = _a++), _classTemp), _b)`
                    // converts `super[f()]++` into `(Reflect.set(_baseTemp, _a = f(), (_b = Reflect.get(_baseTemp, _a, _classTemp), _c = _b++), _classTemp), _c)`
                    // converts `super.a--` into `(Reflect.set(_baseTemp, "a", (_a = Reflect.get(_baseTemp, "a", _classTemp), _b = _a--), _classTemp), _b)`
                    // converts `super[f()]--` into `(Reflect.set(_baseTemp, _a = f(), (_b = Reflect.get(_baseTemp, _a, _classTemp), _c = _b--), _classTemp), _c)`
                    const { classConstructor, superClassReference, facts } = currentClassLexicalEnvironment;
                    if (facts & ClassFacts.ClassWasDecorated) {
                        const operand = visitInvalidSuperProperty(node.operand);
                        return isPrefixUnaryExpression(node) ?
                            factory.updatePrefixUnaryExpression(node, operand) :
                            factory.updatePostfixUnaryExpression(node, operand);
                    }
                    if (classConstructor && superClassReference) {
                        let setterName: Expression | undefined;
                        let getterName: Expression | undefined;
                        if (isPropertyAccessExpression(node.operand)) {
                            if (isIdentifier(node.operand.name)) {
                                getterName = setterName = factory.createStringLiteralFromNode(node.operand.name);
                            }
                        }
                        else {
                            if (isSimpleInlineableExpression(node.operand.argumentExpression)) {
                                getterName = setterName = node.operand.argumentExpression;
                            }
                            else {
                                getterName = factory.createTempVariable(hoistVariableDeclaration);
                                setterName = factory.createAssignment(getterName, visitNode(node.operand.argumentExpression, visitor, isExpression));
                            }
                        }
                        if (setterName && getterName) {
                            let expression: Expression = factory.createReflectGetCall(superClassReference, getterName, classConstructor);
                            setTextRange(expression, node.operand);

                            const temp = valueIsDiscarded ? undefined : factory.createTempVariable(hoistVariableDeclaration);
                            expression = expandPreOrPostfixIncrementOrDecrementExpression(factory, node, expression, hoistVariableDeclaration, temp);
                            expression = factory.createReflectSetCall(superClassReference, setterName, expression, classConstructor);
                            setOriginalNode(expression, node);
                            setTextRange(expression, node);
                            if (temp) {
                                expression = factory.createComma(expression, temp);
                                setTextRange(expression, node);
                            }
                            return expression;
                        }
                    }
                }
            }
            return visitEachChild(node, visitor, context);
        }

        function visitForStatement(node: ForStatement) {
            return factory.updateForStatement(
                node,
                visitNode(node.initializer, discardedValueVisitor, isForInitializer),
                visitNode(node.condition, visitor, isExpression),
                visitNode(node.incrementor, discardedValueVisitor, isExpression),
                visitIterationBody(node.statement, visitor, context)
            );
        }

        function visitExpressionStatement(node: ExpressionStatement) {
            return factory.updateExpressionStatement(
                node,
                visitNode(node.expression, discardedValueVisitor, isExpression)
            );
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
            if (shouldTransformPrivateElementsOrClassStaticBlocks && isPrivateIdentifierPropertyAccessExpression(node.expression)) {
                // Transform call expressions of private names to properly bind the `this` parameter.
                const { thisArg, target } = factory.createCallBinding(node.expression, hoistVariableDeclaration, languageVersion);
                if (isCallChain(node)) {
                    return factory.updateCallChain(
                        node,
                        factory.createPropertyAccessChain(visitNode(target, visitor), node.questionDotToken, "call"),
                        /*questionDotToken*/ undefined,
                        /*typeArguments*/ undefined,
                        [visitNode(thisArg, visitor, isExpression), ...visitNodes(node.arguments, visitor, isExpression)]
                    );
                }
                return factory.updateCallExpression(
                    node,
                    factory.createPropertyAccessExpression(visitNode(target, visitor), "call"),
                    /*typeArguments*/ undefined,
                    [visitNode(thisArg, visitor, isExpression), ...visitNodes(node.arguments, visitor, isExpression)]
                );
            }

            if (shouldTransformSuperInStaticInitializers &&
                isSuperProperty(node.expression) &&
                currentStaticPropertyDeclarationOrStaticBlock &&
                currentClassLexicalEnvironment?.classConstructor) {

                // converts `super.f(...)` into `Reflect.get(_baseTemp, "f", _classTemp).call(_classTemp, ...)`
                const invocation = factory.createFunctionCallCall(
                    visitNode(node.expression, visitor, isExpression),
                    currentClassLexicalEnvironment.classConstructor,
                    visitNodes(node.arguments, visitor, isExpression)
                );
                setOriginalNode(invocation, node);
                setTextRange(invocation, node);
                return invocation;
            }

            return visitEachChild(node, visitor, context);
        }

        function visitTaggedTemplateExpression(node: TaggedTemplateExpression) {
            if (shouldTransformPrivateElementsOrClassStaticBlocks && isPrivateIdentifierPropertyAccessExpression(node.tag)) {
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
            if (shouldTransformSuperInStaticInitializers &&
                isSuperProperty(node.tag) &&
                currentStaticPropertyDeclarationOrStaticBlock &&
                currentClassLexicalEnvironment?.classConstructor) {

                // converts `` super.f`x` `` into `` Reflect.get(_baseTemp, "f", _classTemp).bind(_classTemp)`x` ``
                const invocation = factory.createFunctionBindCall(
                    visitNode(node.tag, visitor, isExpression),
                    currentClassLexicalEnvironment.classConstructor,
                    []
                );
                setOriginalNode(invocation, node);
                setTextRange(invocation, node);
                return factory.updateTaggedTemplateExpression(
                    node,
                    invocation,
                    /*typeArguments*/ undefined,
                    visitNode(node.template, visitor, isTemplateLiteral)
                );
            }
            return visitEachChild(node, visitor, context);
        }

        function transformClassStaticBlockDeclaration(node: ClassStaticBlockDeclaration) {
            if (shouldTransformPrivateElementsOrClassStaticBlocks) {
                if (currentClassLexicalEnvironment) {
                    classLexicalEnvironmentMap.set(getOriginalNodeId(node), currentClassLexicalEnvironment);
                }

                startLexicalEnvironment();
                const savedCurrentStaticPropertyDeclarationOrStaticBlock = currentStaticPropertyDeclarationOrStaticBlock;
                currentStaticPropertyDeclarationOrStaticBlock = node;
                let statements = visitNodes(node.body.statements, visitor, isStatement);
                statements = factory.mergeLexicalEnvironment(statements, endLexicalEnvironment());
                currentStaticPropertyDeclarationOrStaticBlock = savedCurrentStaticPropertyDeclarationOrStaticBlock;

                const iife = factory.createImmediatelyInvokedArrowFunction(statements);
                setOriginalNode(iife, node);
                setTextRange(iife, node);
                addEmitFlags(iife, EmitFlags.AdviseOnEmitNode);
                return iife;
            }
        }

        function visitBinaryExpression(node: BinaryExpression, valueIsDiscarded: boolean) {
            if (isDestructuringAssignment(node)) {
                const savedPendingExpressions = pendingExpressions;
                pendingExpressions = undefined;
                node = factory.updateBinaryExpression(
                    node,
                    visitNode(node.left, visitorDestructuringTarget),
                    node.operatorToken,
                    visitNode(node.right, visitor)
                );
                const expr = some(pendingExpressions) ?
                    factory.inlineExpressions(compact([...pendingExpressions, node])) :
                    node;
                pendingExpressions = savedPendingExpressions;
                return expr;
            }
            if (isAssignmentExpression(node)) {
                if (shouldTransformPrivateElementsOrClassStaticBlocks && isPrivateIdentifierPropertyAccessExpression(node.left)) {
                    const info = accessPrivateIdentifier(node.left.name);
                    if (info) {
                        return setTextRange(
                            setOriginalNode(
                                createPrivateIdentifierAssignment(info, node.left.expression, node.right, node.operatorToken.kind),
                                node
                            ),
                            node
                        );
                    }
                }
                else if (shouldTransformSuperInStaticInitializers &&
                    isSuperProperty(node.left) &&
                    currentStaticPropertyDeclarationOrStaticBlock &&
                    currentClassLexicalEnvironment) {
                    const { classConstructor, superClassReference, facts } = currentClassLexicalEnvironment;
                    if (facts & ClassFacts.ClassWasDecorated) {
                        return factory.updateBinaryExpression(
                            node,
                            visitInvalidSuperProperty(node.left),
                            node.operatorToken,
                            visitNode(node.right, visitor, isExpression));
                    }
                    if (classConstructor && superClassReference) {
                        let setterName =
                            isElementAccessExpression(node.left) ? visitNode(node.left.argumentExpression, visitor, isExpression) :
                            isIdentifier(node.left.name) ? factory.createStringLiteralFromNode(node.left.name) :
                            undefined;
                        if (setterName) {
                            // converts `super.x = 1` into `(Reflect.set(_baseTemp, "x", _a = 1, _classTemp), _a)`
                            // converts `super[f()] = 1` into `(Reflect.set(_baseTemp, f(), _a = 1, _classTemp), _a)`
                            // converts `super.x += 1` into `(Reflect.set(_baseTemp, "x", _a = Reflect.get(_baseTemp, "x", _classtemp) + 1, _classTemp), _a)`
                            // converts `super[f()] += 1` into `(Reflect.set(_baseTemp, _a = f(), _b = Reflect.get(_baseTemp, _a, _classtemp) + 1, _classTemp), _b)`

                            let expression = visitNode(node.right, visitor, isExpression);
                            if (isCompoundAssignment(node.operatorToken.kind)) {
                                let getterName = setterName;
                                if (!isSimpleInlineableExpression(setterName)) {
                                    getterName = factory.createTempVariable(hoistVariableDeclaration);
                                    setterName = factory.createAssignment(getterName, setterName);
                                }
                                const superPropertyGet = factory.createReflectGetCall(
                                    superClassReference,
                                    getterName,
                                    classConstructor
                                );
                                setOriginalNode(superPropertyGet, node.left);
                                setTextRange(superPropertyGet, node.left);

                                expression = factory.createBinaryExpression(
                                    superPropertyGet,
                                    getNonAssignmentOperatorForCompoundAssignment(node.operatorToken.kind),
                                    expression
                                );
                                setTextRange(expression, node);
                            }

                            const temp = valueIsDiscarded ? undefined : factory.createTempVariable(hoistVariableDeclaration);
                            if (temp) {
                                expression = factory.createAssignment(temp, expression);
                                setTextRange(temp, node);
                            }

                            expression = factory.createReflectSetCall(
                                superClassReference,
                                setterName,
                                expression,
                                classConstructor
                            );
                            setOriginalNode(expression, node);
                            setTextRange(expression, node);

                            if (temp) {
                                expression = factory.createComma(expression, temp);
                                setTextRange(expression, node);
                            }

                            return expression;
                        }
                    }
                }
            }
            if (node.operatorToken.kind === SyntaxKind.InKeyword && isPrivateIdentifier(node.left)) {
                return visitPrivateIdentifierInInExpression(node);
            }
            return visitEachChild(node, visitor, context);
        }

        function createPrivateIdentifierAssignment(info: PrivateIdentifierInfo, receiver: Expression, right: Expression, operator: AssignmentOperator): Expression {
            receiver = visitNode(receiver, visitor, isExpression);
            right = visitNode(right, visitor, isExpression);

            if (isCompoundAssignment(operator)) {
                const { readExpression, initializeExpression } = createCopiableReceiverExpr(receiver);
                receiver = initializeExpression || readExpression;
                right = factory.createBinaryExpression(
                    createPrivateIdentifierAccessHelper(info, readExpression),
                    getNonAssignmentOperatorForCompoundAssignment(operator),
                    right
                );
            }

            setCommentRange(receiver, moveRangePos(receiver, -1));

            switch(info.kind) {
                case PrivateIdentifierKind.Accessor:
                    return context.getEmitHelperFactory().createClassPrivateFieldSetHelper(
                        receiver,
                        info.brandCheckIdentifier,
                        right,
                        info.kind,
                        info.setterName
                    );
                case PrivateIdentifierKind.Method:
                    return context.getEmitHelperFactory().createClassPrivateFieldSetHelper(
                        receiver,
                        info.brandCheckIdentifier,
                        right,
                        info.kind,
                        /* f */ undefined
                    );
                case PrivateIdentifierKind.Field:
                    return context.getEmitHelperFactory().createClassPrivateFieldSetHelper(
                        receiver,
                        info.brandCheckIdentifier,
                        right,
                        info.kind,
                        info.variableName
                    );
                default:
                    Debug.assertNever(info, "Unknown private element type");
            }
        }

        /**
         * Set up the environment for a class.
         */
        function visitClassLike(node: ClassLikeDeclaration) {
            if (!forEach(node.members, doesClassElementNeedTransform)) {
                return visitEachChild(node, visitor, context);
            }

            const savedPendingExpressions = pendingExpressions;
            pendingExpressions = undefined;
            startClassLexicalEnvironment();

            if (shouldTransformPrivateElementsOrClassStaticBlocks) {
                const name = getNameOfDeclaration(node);
                if (name && isIdentifier(name)) {
                    getPrivateIdentifierEnvironment().className = idText(name);
                }

                const privateInstanceMethodsAndAccessors = getPrivateInstanceMethodsAndAccessors(node);
                if (some(privateInstanceMethodsAndAccessors)) {
                    getPrivateIdentifierEnvironment().weakSetName = createHoistedVariableForClass(
                        "instances",
                        privateInstanceMethodsAndAccessors[0].name
                    );
                }
            }

            const result = isClassDeclaration(node) ?
                visitClassDeclaration(node) :
                visitClassExpression(node);

            endClassLexicalEnvironment();
            pendingExpressions = savedPendingExpressions;
            return result;
        }

        function doesClassElementNeedTransform(node: ClassElement) {
            return isPropertyDeclaration(node) || isClassStaticBlockDeclaration(node) || (shouldTransformPrivateElementsOrClassStaticBlocks && node.name && isPrivateIdentifier(node.name));
        }

        function getPrivateInstanceMethodsAndAccessors(node: ClassLikeDeclaration) {
            return filter(node.members, isNonStaticMethodOrAccessorWithPrivateName);
        }

        function getClassFacts(node: ClassLikeDeclaration) {
            let facts = ClassFacts.None;
            const original = getOriginalNode(node);
            if (isClassDeclaration(original) && classOrConstructorParameterIsDecorated(original)) {
                facts |= ClassFacts.ClassWasDecorated;
            }
            for (const member of node.members) {
                if (!isStatic(member)) continue;
                if (member.name && isPrivateIdentifier(member.name) && shouldTransformPrivateElementsOrClassStaticBlocks) {
                    facts |= ClassFacts.NeedsClassConstructorReference;
                }
                if (isPropertyDeclaration(member) || isClassStaticBlockDeclaration(member)) {
                    if (shouldTransformThisInStaticInitializers && member.transformFlags & TransformFlags.ContainsLexicalThis) {
                        facts |= ClassFacts.NeedsSubstitutionForThisInClassStaticField;
                        if (!(facts & ClassFacts.ClassWasDecorated)) {
                            facts |= ClassFacts.NeedsClassConstructorReference;
                        }
                    }
                    if (shouldTransformSuperInStaticInitializers && member.transformFlags & TransformFlags.ContainsLexicalSuper) {
                        if (!(facts & ClassFacts.ClassWasDecorated)) {
                            facts |= ClassFacts.NeedsClassConstructorReference | ClassFacts.NeedsClassSuperReference;
                        }
                    }
                }
            }
            return facts;
        }

        function visitExpressionWithTypeArguments(node: ExpressionWithTypeArguments) {
            const facts = currentClassLexicalEnvironment?.facts || ClassFacts.None;
            if (facts & ClassFacts.NeedsClassSuperReference) {
                const temp = factory.createTempVariable(hoistVariableDeclaration, /*reserveInNestedScopes*/ true);
                getClassLexicalEnvironment().superClassReference = temp;
                return factory.updateExpressionWithTypeArguments(
                    node,
                    factory.createAssignment(
                        temp,
                        visitNode(node.expression, visitor, isExpression)
                    ),
                    /*typeArguments*/ undefined
                );
            }
            return visitEachChild(node, visitor, context);
        }

        function visitClassDeclaration(node: ClassDeclaration) {
            const facts = getClassFacts(node);
            if (facts) {
                getClassLexicalEnvironment().facts = facts;
            }
            if (facts & ClassFacts.NeedsSubstitutionForThisInClassStaticField) {
                enableSubstitutionForClassStaticThisOrSuperReference();
            }

            const staticProperties = getStaticPropertiesAndClassStaticBlock(node);

            // If a class has private static fields, or a static field has a `this` or `super` reference,
            // then we need to allocate a temp variable to hold on to that reference.
            let pendingClassReferenceAssignment: BinaryExpression | undefined;
            if (facts & ClassFacts.NeedsClassConstructorReference) {
                const temp = factory.createTempVariable(hoistVariableDeclaration, /*reservedInNestedScopes*/ true);
                getClassLexicalEnvironment().classConstructor = factory.cloneNode(temp);
                pendingClassReferenceAssignment = factory.createAssignment(temp, factory.getInternalName(node));
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
                    visitNodes(node.heritageClauses, heritageClauseVisitor, isHeritageClause),
                    transformClassMembers(node, isDerivedClass)
                )
            ];

            if (pendingClassReferenceAssignment) {
                getPendingExpressions().unshift(pendingClassReferenceAssignment);
            }

            // Write any pending expressions from elided or moved computed property names
            if (some(pendingExpressions)) {
                statements.push(factory.createExpressionStatement(factory.inlineExpressions(pendingExpressions)));
            }

            // Emit static property assignment. Because classDeclaration is lexically evaluated,
            // it is safe to emit static property assignment after classDeclaration
            // From ES6 specification:
            //      HasLexicalDeclaration (N) : Determines if the argument identifier has a binding in this environment record that was created using
            //                                  a lexical declaration such as a LexicalDeclaration or a ClassDeclaration.

            if (some(staticProperties)) {
                addPropertyOrClassStaticBlockStatements(statements, staticProperties, factory.getInternalName(node));
            }

            return statements;
        }

        function visitClassExpression(node: ClassExpression): Expression {
            const facts = getClassFacts(node);
            if (facts) {
                getClassLexicalEnvironment().facts = facts;
            }

            if (facts & ClassFacts.NeedsSubstitutionForThisInClassStaticField) {
                enableSubstitutionForClassStaticThisOrSuperReference();
            }

            // If this class expression is a transformation of a decorated class declaration,
            // then we want to output the pendingExpressions as statements, not as inlined
            // expressions with the class statement.
            //
            // In this case, we use pendingStatements to produce the same output as the
            // class declaration transformation. The VariableStatement visitor will insert
            // these statements after the class expression variable statement.
            const isDecoratedClassDeclaration = !!(facts & ClassFacts.ClassWasDecorated);

            const staticPropertiesOrClassStaticBlocks = getStaticPropertiesAndClassStaticBlock(node);

            const extendsClauseElement = getEffectiveBaseTypeNode(node);
            const isDerivedClass = !!(extendsClauseElement && skipOuterExpressions(extendsClauseElement.expression).kind !== SyntaxKind.NullKeyword);

            const isClassWithConstructorReference = resolver.getNodeCheckFlags(node) & NodeCheckFlags.ClassWithConstructorReference;
            let temp: Identifier | undefined;
            function createClassTempVar() {
                const classCheckFlags = resolver.getNodeCheckFlags(node);
                const isClassWithConstructorReference = classCheckFlags & NodeCheckFlags.ClassWithConstructorReference;
                const requiresBlockScopedVar = classCheckFlags & NodeCheckFlags.BlockScopedBindingInLoop;
                return factory.createTempVariable(requiresBlockScopedVar ? addBlockScopedVariable : hoistVariableDeclaration, !!isClassWithConstructorReference);
            }

            if (facts & ClassFacts.NeedsClassConstructorReference) {
                temp = createClassTempVar();
                getClassLexicalEnvironment().classConstructor = factory.cloneNode(temp);
            }

            const classExpression = factory.updateClassExpression(
                node,
                visitNodes(node.decorators, visitor, isDecorator),
                node.modifiers,
                node.name,
                /*typeParameters*/ undefined,
                visitNodes(node.heritageClauses, heritageClauseVisitor, isHeritageClause),
                transformClassMembers(node, isDerivedClass)
            );

            const hasTransformableStatics = some(staticPropertiesOrClassStaticBlocks, p => isClassStaticBlockDeclaration(p) || !!p.initializer || (shouldTransformPrivateElementsOrClassStaticBlocks && isPrivateIdentifier(p.name)));
            if (hasTransformableStatics || some(pendingExpressions)) {
                if (isDecoratedClassDeclaration) {
                    Debug.assertIsDefined(pendingStatements, "Decorated classes transformed by TypeScript are expected to be within a variable declaration.");

                    // Write any pending expressions from elided or moved computed property names
                    if (pendingStatements && pendingExpressions && some(pendingExpressions)) {
                        pendingStatements.push(factory.createExpressionStatement(factory.inlineExpressions(pendingExpressions)));
                    }

                    if (pendingStatements && some(staticPropertiesOrClassStaticBlocks)) {
                        addPropertyOrClassStaticBlockStatements(pendingStatements, staticPropertiesOrClassStaticBlocks, factory.getInternalName(node));
                    }
                    if (temp) {
                        return factory.inlineExpressions([factory.createAssignment(temp, classExpression), temp]);
                    }
                    return classExpression;
                }
                else {
                    const expressions: Expression[] = [];
                    temp ||= createClassTempVar();
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
                    addRange(expressions, generateInitializedPropertyExpressionsOrClassStaticBlock(staticPropertiesOrClassStaticBlocks, temp));
                    expressions.push(startOnNewLine(temp));

                    return factory.inlineExpressions(expressions);
                }
            }

            return classExpression;
        }

        function visitClassStaticBlockDeclaration(node: ClassStaticBlockDeclaration) {
            if (!shouldTransformPrivateElementsOrClassStaticBlocks) {
                return visitEachChild(node, classElementVisitor, context);
            }
            // ClassStaticBlockDeclaration for classes are transformed in `visitClassDeclaration` or `visitClassExpression`.
            return undefined;
        }

        function transformClassMembers(node: ClassDeclaration | ClassExpression, isDerivedClass: boolean) {
            if (shouldTransformPrivateElementsOrClassStaticBlocks) {
                // Declare private names.
                for (const member of node.members) {
                    if (isPrivateIdentifierClassElementDeclaration(member)) {
                        addPrivateIdentifierToEnvironment(member);
                    }
                }

                if (some(getPrivateInstanceMethodsAndAccessors(node))) {
                    createBrandCheckWeakSetForPrivateMethods();
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

        function createBrandCheckWeakSetForPrivateMethods() {
            const { weakSetName } = getPrivateIdentifierEnvironment();
            Debug.assert(weakSetName, "weakSetName should be set in private identifier environment");

            getPendingExpressions().push(
                factory.createAssignment(
                    weakSetName,
                    factory.createNewExpression(
                        factory.createIdentifier("WeakSet"),
                        /*typeArguments*/ undefined,
                        []
                    )
                )
            );
        }

        function isClassElementThatRequiresConstructorStatement(member: ClassElement) {
            if (isStatic(member) || hasSyntacticModifier(getOriginalNode(member), ModifierFlags.Abstract)) {
                return false;
            }
            if (useDefineForClassFields) {
                // If we are using define semantics and targeting ESNext or higher,
                // then we don't need to transform any class properties.
                return languageVersion < ScriptTarget.ES2022;
            }
            return isInitializedProperty(member) || shouldTransformPrivateElementsOrClassStaticBlocks && isPrivateIdentifierClassElementDeclaration(member);
        }

        function transformConstructor(node: ClassDeclaration | ClassExpression, isDerivedClass: boolean) {
            const constructor = visitNode(getFirstConstructorWithBody(node), visitor, isConstructorDeclaration);
            const elements = node.members.filter(isClassElementThatRequiresConstructorStatement);
            if (!some(elements)) {
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
            let properties = getProperties(node, /*requireInitializer*/ false, /*isStatic*/ false);
            if (!useDefineForClassFields) {
                properties = filter(properties, property => !!property.initializer || isPrivateIdentifier(property.name));
            }

            const privateMethodsAndAccessors = getPrivateInstanceMethodsAndAccessors(node);
            const needsConstructorBody = some(properties) || some(privateMethodsAndAccessors);

            // Only generate synthetic constructor when there are property initializers to move.
            if (!constructor && !needsConstructorBody) {
                return visitFunctionBody(/*node*/ undefined, visitor, context);
            }

            resumeLexicalEnvironment();

            const needsSyntheticConstructor = !constructor && isDerivedClass;
            let indexOfFirstStatementAfterSuper = 0;
            let prologueStatementCount = 0;
            let superStatementIndex = -1;
            let statements: Statement[] = [];

            if (constructor?.body?.statements) {
                prologueStatementCount = factory.copyPrologue(constructor.body.statements, statements, /*ensureUseStrict*/ false, visitor);
                superStatementIndex = findSuperStatementIndex(constructor.body.statements, prologueStatementCount);

                // If there was a super call, visit existing statements up to and including it
                if (superStatementIndex >= 0) {
                    indexOfFirstStatementAfterSuper = superStatementIndex + 1;
                    statements = [
                        ...statements.slice(0, prologueStatementCount),
                        ...visitNodes(constructor.body.statements, visitor, isStatement, prologueStatementCount, indexOfFirstStatementAfterSuper - prologueStatementCount),
                        ...statements.slice(prologueStatementCount),
                    ];
                }
            }

            if (needsSyntheticConstructor) {
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
            // If we do useDefineForClassFields, they'll be converted elsewhere.
            // We instead *remove* them from the transformed output at this stage.
            let parameterPropertyDeclarationCount = 0;
            if (constructor?.body) {
                if (useDefineForClassFields) {
                    statements = statements.filter(statement => !isParameterPropertyDeclaration(getOriginalNode(statement), constructor));
                }
                else {
                    for (const statement of constructor.body.statements) {
                        if (isParameterPropertyDeclaration(getOriginalNode(statement), constructor)) {
                            parameterPropertyDeclarationCount++;
                        }
                    }
                    if (parameterPropertyDeclarationCount > 0) {
                        const parameterProperties = visitNodes(constructor.body.statements, visitor, isStatement, indexOfFirstStatementAfterSuper, parameterPropertyDeclarationCount);

                        // If there was a super() call found, add parameter properties immediately after it
                        if (superStatementIndex >= 0) {
                            addRange(statements, parameterProperties);
                        }
                        // If a synthetic super() call was added, add them just after it
                        else if (needsSyntheticConstructor) {
                            statements = [
                                statements[0],
                                ...parameterProperties,
                                ...statements.slice(1),
                            ];
                        }
                        // Since there wasn't a super() call, add them to the top of the constructor
                        else {
                            statements = [...parameterProperties, ...statements];
                        }

                        indexOfFirstStatementAfterSuper += parameterPropertyDeclarationCount;
                    }
                }
            }

            const receiver = factory.createThis();
            // private methods can be called in property initializers, they should execute first.
            addMethodStatements(statements, privateMethodsAndAccessors, receiver);
            addPropertyOrClassStaticBlockStatements(statements, properties, receiver);

            // Add existing statements after the initial prologues and super call
            if (constructor) {
                addRange(statements, visitNodes(constructor.body!.statements, visitBodyStatement, isStatement, indexOfFirstStatementAfterSuper + prologueStatementCount));
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

            function visitBodyStatement(statement: Node) {
                if (useDefineForClassFields && isParameterPropertyDeclaration(getOriginalNode(statement), constructor!)) {
                    return undefined;
                }

                return visitor(statement);
            }
        }

        /**
         * Generates assignment statements for property initializers.
         *
         * @param properties An array of property declarations to transform.
         * @param receiver The receiver on which each property should be assigned.
         */
        function addPropertyOrClassStaticBlockStatements(statements: Statement[], properties: readonly (PropertyDeclaration | ClassStaticBlockDeclaration)[], receiver: LeftHandSideExpression) {
            for (const property of properties) {
                const expression = isClassStaticBlockDeclaration(property) ?
                    transformClassStaticBlockDeclaration(property) :
                    transformProperty(property, receiver);
                if (!expression) {
                    continue;
                }
                const statement = factory.createExpressionStatement(expression);
                setSourceMapRange(statement, moveRangePastModifiers(property));
                setCommentRange(statement, property);
                setOriginalNode(statement, property);

                // `setOriginalNode` *copies* the `emitNode` from `property`, so now both
                // `statement` and `expression` have a copy of the synthesized comments.
                // Drop the comments from expression to avoid printing them twice.
                setSyntheticLeadingComments(expression, undefined);
                setSyntheticTrailingComments(expression, undefined);

                statements.push(statement);
            }
        }

        /**
         * Generates assignment expressions for property initializers.
         *
         * @param propertiesOrClassStaticBlocks An array of property declarations to transform.
         * @param receiver The receiver on which each property should be assigned.
         */
        function generateInitializedPropertyExpressionsOrClassStaticBlock(propertiesOrClassStaticBlocks: readonly (PropertyDeclaration | ClassStaticBlockDeclaration)[], receiver: LeftHandSideExpression) {
            const expressions: Expression[] = [];
            for (const property of propertiesOrClassStaticBlocks) {
                const expression = isClassStaticBlockDeclaration(property) ? transformClassStaticBlockDeclaration(property) : transformProperty(property, receiver);
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
            const savedCurrentStaticPropertyDeclarationOrStaticBlock = currentStaticPropertyDeclarationOrStaticBlock;
            const transformed = transformPropertyWorker(property, receiver);
            if (transformed && hasStaticModifier(property) && currentClassLexicalEnvironment?.facts) {
                // capture the lexical environment for the member
                setOriginalNode(transformed, property);
                addEmitFlags(transformed, EmitFlags.AdviseOnEmitNode);
                classLexicalEnvironmentMap.set(getOriginalNodeId(transformed), currentClassLexicalEnvironment);
            }
            currentStaticPropertyDeclarationOrStaticBlock = savedCurrentStaticPropertyDeclarationOrStaticBlock;
            return transformed;
        }

        function transformPropertyWorker(property: PropertyDeclaration, receiver: LeftHandSideExpression) {
            // We generate a name here in order to reuse the value cached by the relocated computed name expression (which uses the same generated name)
            const emitAssignment = !useDefineForClassFields;
            const propertyName = isComputedPropertyName(property.name) && !isSimpleInlineableExpression(property.name.expression)
                ? factory.updateComputedPropertyName(property.name, factory.getGeneratedNameForNode(property.name))
                : property.name;

            if (hasStaticModifier(property)) {
                currentStaticPropertyDeclarationOrStaticBlock = property;
            }

            if (shouldTransformPrivateElementsOrClassStaticBlocks && isPrivateIdentifier(propertyName)) {
                const privateIdentifierInfo = accessPrivateIdentifier(propertyName);
                if (privateIdentifierInfo) {
                    if (privateIdentifierInfo.kind === PrivateIdentifierKind.Field) {
                        if (!privateIdentifierInfo.isStatic) {
                            return createPrivateInstanceFieldInitializer(
                                receiver,
                                visitNode(property.initializer, visitor, isExpression),
                                privateIdentifierInfo.brandCheckIdentifier
                            );
                        }
                        else {
                            return createPrivateStaticFieldInitializer(
                                privateIdentifierInfo.variableName,
                                visitNode(property.initializer, visitor, isExpression)
                            );
                        }
                    }
                    else {
                        return undefined;
                    }
                }
                else {
                    Debug.fail("Undeclared private name for property declaration.");
                }
            }
            if ((isPrivateIdentifier(propertyName) || hasStaticModifier(property)) && !property.initializer) {
                return undefined;
            }

            const propertyOriginalNode = getOriginalNode(property);
            if (hasSyntacticModifier(propertyOriginalNode, ModifierFlags.Abstract)) {
                return undefined;
            }

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

        function enableSubstitutionForClassStaticThisOrSuperReference() {
            if ((enabledSubstitutions & ClassPropertySubstitutionFlags.ClassStaticThisOrSuperReference) === 0) {
                enabledSubstitutions |= ClassPropertySubstitutionFlags.ClassStaticThisOrSuperReference;

                // substitute `this` in a static field initializer
                context.enableSubstitution(SyntaxKind.ThisKeyword);

                // these push a new lexical environment that is not the class lexical environment
                context.enableEmitNotification(SyntaxKind.FunctionDeclaration);
                context.enableEmitNotification(SyntaxKind.FunctionExpression);
                context.enableEmitNotification(SyntaxKind.Constructor);

                // these push a new lexical environment that is not the class lexical environment, except
                // when they have a computed property name
                context.enableEmitNotification(SyntaxKind.GetAccessor);
                context.enableEmitNotification(SyntaxKind.SetAccessor);
                context.enableEmitNotification(SyntaxKind.MethodDeclaration);
                context.enableEmitNotification(SyntaxKind.PropertyDeclaration);

                // class lexical environments are restored when entering a computed property name
                context.enableEmitNotification(SyntaxKind.ComputedPropertyName);
            }
        }

        /**
         * Generates brand-check initializer for private methods.
         *
         * @param statements Statement list that should be used to append new statements.
         * @param methods An array of method declarations.
         * @param receiver The receiver on which each method should be assigned.
         */
        function addMethodStatements(statements: Statement[], methods: readonly (MethodDeclaration | AccessorDeclaration)[], receiver: LeftHandSideExpression) {
            if (!shouldTransformPrivateElementsOrClassStaticBlocks || !some(methods)) {
                return;
            }

            const { weakSetName } = getPrivateIdentifierEnvironment();
            Debug.assert(weakSetName, "weakSetName should be set in private identifier environment");
            statements.push(
                factory.createExpressionStatement(
                    createPrivateInstanceMethodInitializer(receiver, weakSetName)
                )
            );
        }

        function visitInvalidSuperProperty(node: SuperProperty) {
            return isPropertyAccessExpression(node) ?
                factory.updatePropertyAccessExpression(
                    node,
                    factory.createVoidZero(),
                    node.name) :
                factory.updateElementAccessExpression(
                    node,
                    factory.createVoidZero(),
                    visitNode(node.argumentExpression, visitor, isExpression));
        }

        function onEmitNode(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void) {
            const original = getOriginalNode(node);
            if (original.id) {
                const classLexicalEnvironment = classLexicalEnvironmentMap.get(original.id);
                if (classLexicalEnvironment) {
                    const savedClassLexicalEnvironment = currentClassLexicalEnvironment;
                    const savedCurrentComputedPropertyNameClassLexicalEnvironment = currentComputedPropertyNameClassLexicalEnvironment;
                    currentClassLexicalEnvironment = classLexicalEnvironment;
                    currentComputedPropertyNameClassLexicalEnvironment = classLexicalEnvironment;
                    previousOnEmitNode(hint, node, emitCallback);
                    currentClassLexicalEnvironment = savedClassLexicalEnvironment;
                    currentComputedPropertyNameClassLexicalEnvironment = savedCurrentComputedPropertyNameClassLexicalEnvironment;
                    return;
                }
            }

            switch (node.kind) {
                case SyntaxKind.FunctionExpression:
                    if (isArrowFunction(original) || getEmitFlags(node) & EmitFlags.AsyncFunctionBody) {
                        break;
                    }

                    // falls through
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.Constructor: {
                    const savedClassLexicalEnvironment = currentClassLexicalEnvironment;
                    const savedCurrentComputedPropertyNameClassLexicalEnvironment = currentComputedPropertyNameClassLexicalEnvironment;
                    currentClassLexicalEnvironment = undefined;
                    currentComputedPropertyNameClassLexicalEnvironment = undefined;
                    previousOnEmitNode(hint, node, emitCallback);
                    currentClassLexicalEnvironment = savedClassLexicalEnvironment;
                    currentComputedPropertyNameClassLexicalEnvironment = savedCurrentComputedPropertyNameClassLexicalEnvironment;
                    return;
                }

                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.PropertyDeclaration: {
                    const savedClassLexicalEnvironment = currentClassLexicalEnvironment;
                    const savedCurrentComputedPropertyNameClassLexicalEnvironment = currentComputedPropertyNameClassLexicalEnvironment;
                    currentComputedPropertyNameClassLexicalEnvironment = currentClassLexicalEnvironment;
                    currentClassLexicalEnvironment = undefined;
                    previousOnEmitNode(hint, node, emitCallback);
                    currentClassLexicalEnvironment = savedClassLexicalEnvironment;
                    currentComputedPropertyNameClassLexicalEnvironment = savedCurrentComputedPropertyNameClassLexicalEnvironment;
                    return;
                }
                case SyntaxKind.ComputedPropertyName: {
                    const savedClassLexicalEnvironment = currentClassLexicalEnvironment;
                    const savedCurrentComputedPropertyNameClassLexicalEnvironment = currentComputedPropertyNameClassLexicalEnvironment;
                    currentClassLexicalEnvironment = currentComputedPropertyNameClassLexicalEnvironment;
                    currentComputedPropertyNameClassLexicalEnvironment = undefined;
                    previousOnEmitNode(hint, node, emitCallback);
                    currentClassLexicalEnvironment = savedClassLexicalEnvironment;
                    currentComputedPropertyNameClassLexicalEnvironment = savedCurrentComputedPropertyNameClassLexicalEnvironment;
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
            if (hint === EmitHint.Expression) {
                return substituteExpression(node as Expression);
            }
            return node;
        }

        function substituteExpression(node: Expression) {
            switch (node.kind) {
                case SyntaxKind.Identifier:
                    return substituteExpressionIdentifier(node as Identifier);
                case SyntaxKind.ThisKeyword:
                    return substituteThisExpression(node as ThisExpression);
            }
            return node;
        }

        function substituteThisExpression(node: ThisExpression) {
            if (enabledSubstitutions & ClassPropertySubstitutionFlags.ClassStaticThisOrSuperReference && currentClassLexicalEnvironment) {
                const { facts, classConstructor } = currentClassLexicalEnvironment;
                if (facts & ClassFacts.ClassWasDecorated) {
                    return factory.createParenthesizedExpression(factory.createVoidZero());
                }
                if (classConstructor) {
                    return setTextRange(
                        setOriginalNode(
                            factory.cloneNode(classConstructor),
                            node,
                        ),
                        node
                    );
                }
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
                    if (resolver.getNodeCheckFlags(name) & NodeCheckFlags.BlockScopedBindingInLoop) {
                        addBlockScopedVariable(generatedName);
                    }
                    else {
                        hoistVariableDeclaration(generatedName);
                    }
                    return factory.createAssignment(generatedName, expression);
                }
                return (inlinable || isIdentifier(innerExpression)) ? undefined : expression;
            }
        }

        function startClassLexicalEnvironment() {
            classLexicalEnvironmentStack.push(currentClassLexicalEnvironment);
            currentClassLexicalEnvironment = undefined;
        }

        function endClassLexicalEnvironment() {
            currentClassLexicalEnvironment = classLexicalEnvironmentStack.pop();
        }

        function getClassLexicalEnvironment() {
            return currentClassLexicalEnvironment ||= {
                facts: ClassFacts.None,
                classConstructor: undefined,
                superClassReference: undefined,
                privateIdentifierEnvironment: undefined,
            };
        }

        function getPrivateIdentifierEnvironment() {
            const lex = getClassLexicalEnvironment();
            lex.privateIdentifierEnvironment ||= {
                className: "",
                identifiers: new Map()
            };
            return lex.privateIdentifierEnvironment;
        }

        function getPendingExpressions() {
            return pendingExpressions || (pendingExpressions = []);
        }

        function addPrivateIdentifierToEnvironment(node: PrivateClassElementDeclaration) {
            const text = getTextOfPropertyName(node.name) as string;
            const lex = getClassLexicalEnvironment();
            const { classConstructor } = lex;

            const privateEnv = getPrivateIdentifierEnvironment();
            const { weakSetName } = privateEnv;

            const assignmentExpressions: Expression[] = [];

            const privateName = node.name.escapedText;
            const previousInfo = privateEnv.identifiers.get(privateName);
            const isValid = !isReservedPrivateName(node.name) && previousInfo === undefined;

            if (hasStaticModifier(node)) {
                Debug.assert(classConstructor, "weakSetName should be set in private identifier environment");
                if (isPropertyDeclaration(node)) {
                    const variableName = createHoistedVariableForPrivateName(text, node);
                    privateEnv.identifiers.set(privateName, {
                        kind: PrivateIdentifierKind.Field,
                        variableName,
                        brandCheckIdentifier: classConstructor,
                        isStatic: true,
                        isValid,
                    });
                }
                else if (isMethodDeclaration(node)) {
                    const functionName = createHoistedVariableForPrivateName(text, node);
                    privateEnv.identifiers.set(privateName, {
                        kind: PrivateIdentifierKind.Method,
                        methodName: functionName,
                        brandCheckIdentifier: classConstructor,
                        isStatic: true,
                        isValid,
                    });
                }
                else if (isGetAccessorDeclaration(node)) {
                    const getterName = createHoistedVariableForPrivateName(text + "_get", node);
                    if (previousInfo?.kind === PrivateIdentifierKind.Accessor && previousInfo.isStatic && !previousInfo.getterName) {
                        previousInfo.getterName = getterName;
                    }
                    else {
                        privateEnv.identifiers.set(privateName, {
                            kind: PrivateIdentifierKind.Accessor,
                            getterName,
                            setterName: undefined,
                            brandCheckIdentifier: classConstructor,
                            isStatic: true,
                            isValid,
                        });
                    }
                }
                else if (isSetAccessorDeclaration(node)) {
                    const setterName = createHoistedVariableForPrivateName(text + "_set", node);
                    if (previousInfo?.kind === PrivateIdentifierKind.Accessor && previousInfo.isStatic && !previousInfo.setterName) {
                        previousInfo.setterName = setterName;
                    }
                    else {
                        privateEnv.identifiers.set(privateName, {
                            kind: PrivateIdentifierKind.Accessor,
                            getterName: undefined,
                            setterName,
                            brandCheckIdentifier: classConstructor,
                            isStatic: true,
                            isValid,
                        });
                    }
                }
                else {
                    Debug.assertNever(node, "Unknown class element type.");
                }
            }
            else if (isPropertyDeclaration(node)) {
                const weakMapName = createHoistedVariableForPrivateName(text, node);
                privateEnv.identifiers.set(privateName, {
                    kind: PrivateIdentifierKind.Field,
                    brandCheckIdentifier: weakMapName,
                    isStatic: false,
                    variableName: undefined,
                    isValid,
                });

                assignmentExpressions.push(factory.createAssignment(
                    weakMapName,
                    factory.createNewExpression(
                        factory.createIdentifier("WeakMap"),
                        /*typeArguments*/ undefined,
                        []
                    )
                ));
            }
            else if (isMethodDeclaration(node)) {
                Debug.assert(weakSetName, "weakSetName should be set in private identifier environment");

                privateEnv.identifiers.set(privateName, {
                    kind: PrivateIdentifierKind.Method,
                    methodName: createHoistedVariableForPrivateName(text, node),
                    brandCheckIdentifier: weakSetName,
                    isStatic: false,
                    isValid,
                });
            }
            else if (isAccessor(node)) {
                Debug.assert(weakSetName, "weakSetName should be set in private identifier environment");

                if (isGetAccessor(node)) {
                    const getterName = createHoistedVariableForPrivateName(text + "_get", node);

                    if (previousInfo?.kind === PrivateIdentifierKind.Accessor && !previousInfo.isStatic && !previousInfo.getterName) {
                        previousInfo.getterName = getterName;
                    }
                    else {
                        privateEnv.identifiers.set(privateName, {
                            kind: PrivateIdentifierKind.Accessor,
                            getterName,
                            setterName: undefined,
                            brandCheckIdentifier: weakSetName,
                            isStatic: false,
                            isValid,
                        });
                    }
                }
                else {
                    const setterName = createHoistedVariableForPrivateName(text + "_set", node);

                    if (previousInfo?.kind === PrivateIdentifierKind.Accessor && !previousInfo.isStatic && !previousInfo.setterName) {
                        previousInfo.setterName = setterName;
                    }
                    else {
                        privateEnv.identifiers.set(privateName, {
                            kind: PrivateIdentifierKind.Accessor,
                            getterName: undefined,
                            setterName,
                            brandCheckIdentifier: weakSetName,
                            isStatic: false,
                            isValid,
                        });
                    }
                }
            }
            else {
                Debug.assertNever(node, "Unknown class element type.");
            }

            getPendingExpressions().push(...assignmentExpressions);
        }

        function createHoistedVariableForClass(name: string, node: PrivateIdentifier | ClassStaticBlockDeclaration): Identifier {
            const { className } = getPrivateIdentifierEnvironment();
            const prefix = className ? `_${className}` : "";
            const identifier = factory.createUniqueName(`${prefix}_${name}`, GeneratedIdentifierFlags.Optimistic);

            if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.BlockScopedBindingInLoop) {
                addBlockScopedVariable(identifier);
            }
            else {
                hoistVariableDeclaration(identifier);
            }

            return identifier;
        }

        function createHoistedVariableForPrivateName(privateName: string, node: PrivateClassElementDeclaration): Identifier {
            return createHoistedVariableForClass(privateName.substring(1), node.name);
        }

        function accessPrivateIdentifier(name: PrivateIdentifier) {
            if (currentClassLexicalEnvironment?.privateIdentifierEnvironment) {
                const info = currentClassLexicalEnvironment.privateIdentifierEnvironment.identifiers.get(name.escapedText);
                if (info) {
                    return info;
                }
            }
            for (let i = classLexicalEnvironmentStack.length - 1; i >= 0; --i) {
                const env = classLexicalEnvironmentStack[i];
                if (!env) {
                    continue;
                }
                const info = env.privateIdentifierEnvironment?.identifiers.get(name.escapedText);
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
                getPendingExpressions().push(factory.createBinaryExpression(receiver, SyntaxKind.EqualsToken, visitNode(node.expression, visitor, isExpression)));
            }
            return factory.createAssignmentTargetWrapper(
                parameter,
                createPrivateIdentifierAssignment(
                    info,
                    receiver,
                    parameter,
                    SyntaxKind.EqualsToken
                )
            );
        }

        function visitArrayAssignmentTarget(node: BindingOrAssignmentElement) {
            const target = getTargetOfBindingOrAssignmentElement(node);
            if (target) {
                let wrapped: LeftHandSideExpression | undefined;
                if (isPrivateIdentifierPropertyAccessExpression(target)) {
                    wrapped = wrapPrivateIdentifierForDestructuringTarget(target);
                }
                else if (shouldTransformSuperInStaticInitializers &&
                    isSuperProperty(target) &&
                    currentStaticPropertyDeclarationOrStaticBlock &&
                    currentClassLexicalEnvironment) {
                    const { classConstructor, superClassReference, facts } = currentClassLexicalEnvironment;
                    if (facts & ClassFacts.ClassWasDecorated) {
                        wrapped = visitInvalidSuperProperty(target);
                    }
                    else if (classConstructor && superClassReference) {
                        const name =
                            isElementAccessExpression(target) ? visitNode(target.argumentExpression, visitor, isExpression) :
                            isIdentifier(target.name) ? factory.createStringLiteralFromNode(target.name) :
                            undefined;
                        if (name) {
                            const temp = factory.createTempVariable(/*recordTempVariable*/ undefined);
                            wrapped = factory.createAssignmentTargetWrapper(
                                temp,
                                factory.createReflectSetCall(
                                    superClassReference,
                                    name,
                                    temp,
                                    classConstructor,
                                )
                            );
                        }
                    }
                }
                if (wrapped) {
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
            }
            return visitNode(node, visitorDestructuringTarget);
        }

        function visitObjectAssignmentTarget(node: ObjectLiteralElementLike) {
            if (isObjectBindingOrAssignmentElement(node) && !isShorthandPropertyAssignment(node)) {
                const target = getTargetOfBindingOrAssignmentElement(node);
                let wrapped: LeftHandSideExpression | undefined;
                if (target) {
                    if (isPrivateIdentifierPropertyAccessExpression(target)) {
                        wrapped = wrapPrivateIdentifierForDestructuringTarget(target);
                    }
                    else if (shouldTransformSuperInStaticInitializers &&
                        isSuperProperty(target) &&
                        currentStaticPropertyDeclarationOrStaticBlock &&
                        currentClassLexicalEnvironment) {
                        const { classConstructor, superClassReference, facts } = currentClassLexicalEnvironment;
                        if (facts & ClassFacts.ClassWasDecorated) {
                            wrapped = visitInvalidSuperProperty(target);
                        }
                        else if (classConstructor && superClassReference) {
                            const name =
                                isElementAccessExpression(target) ? visitNode(target.argumentExpression, visitor, isExpression) :
                                isIdentifier(target.name) ? factory.createStringLiteralFromNode(target.name) :
                                undefined;
                            if (name) {
                                const temp = factory.createTempVariable(/*recordTempVariable*/ undefined);
                                wrapped = factory.createAssignmentTargetWrapper(
                                    temp,
                                    factory.createReflectSetCall(
                                        superClassReference,
                                        name,
                                        temp,
                                        classConstructor,
                                    )
                                );
                            }
                        }
                    }
                }
                if (isPropertyAssignment(node)) {
                    const initializer = getInitializerOfBindingOrAssignmentElement(node);
                    return factory.updatePropertyAssignment(
                        node,
                        visitNode(node.name, visitor, isPropertyName),
                        wrapped ?
                            initializer ? factory.createAssignment(wrapped, visitNode(initializer, visitor)) : wrapped :
                            visitNode(node.initializer, visitorDestructuringTarget, isExpression)
                    );
                }
                if (isSpreadAssignment(node)) {
                    return factory.updateSpreadAssignment(
                        node,
                        wrapped || visitNode(node.expression, visitorDestructuringTarget, isExpression)
                    );
                }
                Debug.assert(wrapped === undefined, "Should not have generated a wrapped target");
            }
            return visitNode(node, visitor);
        }

        function visitAssignmentPattern(node: AssignmentPattern) {
            if (isArrayLiteralExpression(node)) {
                // Transforms private names in destructuring assignment array bindings.
                // Transforms SuperProperty assignments in destructuring assignment array bindings in static initializers.
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
                // Transforms SuperProperty assignments in destructuring assignment object bindings in static initializers.
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

    function createPrivateStaticFieldInitializer(variableName: Identifier, initializer: Expression | undefined) {
        return factory.createAssignment(
            variableName,
            factory.createObjectLiteralExpression([
                factory.createPropertyAssignment("value", initializer || factory.createVoidZero())
            ])
        );
    }

    function createPrivateInstanceFieldInitializer(receiver: LeftHandSideExpression, initializer: Expression | undefined, weakMapName: Identifier) {
        return factory.createCallExpression(
            factory.createPropertyAccessExpression(weakMapName, "set"),
            /*typeArguments*/ undefined,
            [receiver, initializer || factory.createVoidZero()]
        );
    }

    function createPrivateInstanceMethodInitializer(receiver: LeftHandSideExpression, weakSetName: Identifier) {
        return factory.createCallExpression(
            factory.createPropertyAccessExpression(weakSetName, "add"),
            /*typeArguments*/ undefined,
            [receiver]
        );
    }

    function isReservedPrivateName(node: PrivateIdentifier) {
        return node.escapedText === "#constructor";
    }
}
