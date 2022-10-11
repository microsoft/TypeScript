import * as ts from "../_namespaces/ts";

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

/** @internal */
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
    brandCheckIdentifier: ts.Identifier;
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
    getterName?: ts.Identifier;
    /**
     * Identifier for a variable that will contain the private set accessor implementation, if any.
     */
    setterName?: ts.Identifier;
}

interface PrivateIdentifierMethodInfo extends PrivateIdentifierInfoBase {
    kind: PrivateIdentifierKind.Method;
    /**
     * Identifier for a variable that will contain the private method implementation.
     */
    methodName: ts.Identifier;
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
     * Contains the variable that will serve as the storage for the field.
     */
    variableName: ts.Identifier;
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
    className?: ts.Identifier;
    /**
     * Used for brand check on private methods.
     */
    weakSetName?: ts.Identifier;
    /**
     * A mapping of private names to information needed for transformation.
     */
    identifiers?: ts.UnderscoreEscapedMap<PrivateIdentifierInfo>;
    /**
     * A mapping of generated private names to information needed for transformation.
     */
    generatedIdentifiers?: ts.ESMap<ts.Node, PrivateIdentifierInfo>;
}

interface ClassLexicalEnvironment {
    facts: ClassFacts;
    /**
     * Used for brand checks on static members, and `this` references in static initializers
     */
    classConstructor: ts.Identifier | undefined;
    /**
     * Used for `super` references in static initializers.
     */
    superClassReference: ts.Identifier | undefined;
    privateIdentifierEnvironment: PrivateIdentifierEnvironment | undefined;
}

const enum ClassFacts {
    None = 0,
    ClassWasDecorated = 1 << 0,
    NeedsClassConstructorReference = 1 << 1,
    NeedsClassSuperReference = 1 << 2,
    NeedsSubstitutionForThisInClassStaticField = 1 << 3,
}

/** @internal */
/**
 * Transforms ECMAScript Class Syntax.
 * TypeScript parameter property syntax is transformed in the TypeScript transformer.
 * For now, this transforms public field declarations using TypeScript class semantics,
 * where declarations are elided and initializers are transformed as assignments in the constructor.
 * When --useDefineForClassFields is on, this transforms to ECMAScript semantics, with Object.defineProperty.
 */
export function transformClassFields(context: ts.TransformationContext) {
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
    const languageVersion = ts.getEmitScriptTarget(compilerOptions);
    const useDefineForClassFields = ts.getUseDefineForClassFields(compilerOptions);

    // Always transform field initializers using Set semantics when `useDefineForClassFields: false`.
    const shouldTransformInitializersUsingSet = !useDefineForClassFields;

    // Transform field initializers using Define semantics when `useDefineForClassFields: true` and target < ES2022.
    const shouldTransformInitializersUsingDefine = useDefineForClassFields && languageVersion < ts.ScriptTarget.ES2022;
    const shouldTransformInitializers = shouldTransformInitializersUsingSet || shouldTransformInitializersUsingDefine;

    // We need to transform private members and class static blocks when target < ES2022.
    const shouldTransformPrivateElementsOrClassStaticBlocks = languageVersion < ts.ScriptTarget.ES2022;

    // We need to transform `accessor` fields when target < ESNext
    const shouldTransformAutoAccessors = languageVersion < ts.ScriptTarget.ESNext;

    // We need to transform `this` in a static initializer into a reference to the class
    // when target < ES2022 since the assignment will be moved outside of the class body.
    const shouldTransformThisInStaticInitializers = languageVersion < ts.ScriptTarget.ES2022;

    // We don't need to transform `super` property access when target <= ES5 because
    // the es2015 transformation handles those.
    const shouldTransformSuperInStaticInitializers = shouldTransformThisInStaticInitializers && languageVersion >= ts.ScriptTarget.ES2015;

    const shouldTransformAnything =
        shouldTransformInitializers ||
        shouldTransformPrivateElementsOrClassStaticBlocks ||
        shouldTransformAutoAccessors;

    const previousOnSubstituteNode = context.onSubstituteNode;
    context.onSubstituteNode = onSubstituteNode;

    const previousOnEmitNode = context.onEmitNode;
    context.onEmitNode = onEmitNode;

    let enabledSubstitutions: ClassPropertySubstitutionFlags;

    let classAliases: ts.Identifier[];

    /**
     * Tracks what computed name expressions originating from elided names must be inlined
     * at the next execution site, in document order
     */
    let pendingExpressions: ts.Expression[] | undefined;

    /**
     * Tracks what computed name expression statements and static property initializers must be
     * emitted at the next execution site, in document order (for decorated classes).
     */
    let pendingStatements: ts.Statement[] | undefined;

    const classLexicalEnvironmentStack: (ClassLexicalEnvironment | undefined)[] = [];
    const classLexicalEnvironmentMap = new ts.Map<number, ClassLexicalEnvironment>();

    let currentClassLexicalEnvironment: ClassLexicalEnvironment | undefined;
    let currentClassContainer: ts.ClassLikeDeclaration | undefined;
    let currentComputedPropertyNameClassLexicalEnvironment: ClassLexicalEnvironment | undefined;
    let currentStaticPropertyDeclarationOrStaticBlock: ts.PropertyDeclaration | ts.ClassStaticBlockDeclaration | undefined;

    return ts.chainBundle(context, transformSourceFile);

    function transformSourceFile(node: ts.SourceFile) {
        if (node.isDeclarationFile || !shouldTransformAnything) {
            return node;
        }

        const visited = ts.visitEachChild(node, visitor, context);
        ts.addEmitHelpers(visited, context.readEmitHelpers());
        return visited;
    }

    function visitor(node: ts.Node): ts.VisitResult<ts.Node> {
        if (!(node.transformFlags & ts.TransformFlags.ContainsClassFields) &&
            !(node.transformFlags & ts.TransformFlags.ContainsLexicalThisOrSuper)) {
            return node;
        }

        switch (node.kind) {
            case ts.SyntaxKind.AccessorKeyword:
                return shouldTransformAutoAccessors ? undefined : node;
            case ts.SyntaxKind.ClassDeclaration:
                return visitClassDeclaration(node as ts.ClassDeclaration);
            case ts.SyntaxKind.ClassExpression:
                return visitClassExpression(node as ts.ClassExpression);
            case ts.SyntaxKind.ClassStaticBlockDeclaration:
                return visitClassStaticBlockDeclaration(node as ts.ClassStaticBlockDeclaration);
            case ts.SyntaxKind.PropertyDeclaration:
                return visitPropertyDeclaration(node as ts.PropertyDeclaration);
            case ts.SyntaxKind.VariableStatement:
                return visitVariableStatement(node as ts.VariableStatement);
            case ts.SyntaxKind.PrivateIdentifier:
                return visitPrivateIdentifier(node as ts.PrivateIdentifier);
            case ts.SyntaxKind.PropertyAccessExpression:
                return visitPropertyAccessExpression(node as ts.PropertyAccessExpression);
            case ts.SyntaxKind.ElementAccessExpression:
                return visitElementAccessExpression(node as ts.ElementAccessExpression);
            case ts.SyntaxKind.PrefixUnaryExpression:
            case ts.SyntaxKind.PostfixUnaryExpression:
                return visitPreOrPostfixUnaryExpression(node as ts.PrefixUnaryExpression | ts.PostfixUnaryExpression, /*valueIsDiscarded*/ false);
            case ts.SyntaxKind.BinaryExpression:
                return visitBinaryExpression(node as ts.BinaryExpression, /*valueIsDiscarded*/ false);
            case ts.SyntaxKind.CallExpression:
                return visitCallExpression(node as ts.CallExpression);
            case ts.SyntaxKind.ExpressionStatement:
                return visitExpressionStatement(node as ts.ExpressionStatement);
            case ts.SyntaxKind.TaggedTemplateExpression:
                return visitTaggedTemplateExpression(node as ts.TaggedTemplateExpression);
            case ts.SyntaxKind.ForStatement:
                return visitForStatement(node as ts.ForStatement);
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor: {
                // If we are descending into a new scope, clear the current static property or block
                return setCurrentStaticPropertyDeclarationOrStaticBlockAnd(
                    /*current*/ undefined,
                    fallbackVisitor,
                    node
                );
            }
            default:
                return fallbackVisitor(node);
        }
    }

    function fallbackVisitor(node: ts.Node) {
        return ts.visitEachChild(node, visitor, context);
    }

    /**
     * Visits a node in an expression whose result is discarded.
     */
    function discardedValueVisitor(node: ts.Node): ts.VisitResult<ts.Node> {
        switch (node.kind) {
            case ts.SyntaxKind.PrefixUnaryExpression:
            case ts.SyntaxKind.PostfixUnaryExpression:
                return visitPreOrPostfixUnaryExpression(node as ts.PrefixUnaryExpression | ts.PostfixUnaryExpression, /*valueIsDiscarded*/ true);
            case ts.SyntaxKind.BinaryExpression:
                return visitBinaryExpression(node as ts.BinaryExpression, /*valueIsDiscarded*/ true);
            default:
                return visitor(node);
        }
    }

    /**
     * Visits a node in a {@link HeritageClause}.
     */
    function heritageClauseVisitor(node: ts.Node): ts.VisitResult<ts.Node> {
        switch (node.kind) {
            case ts.SyntaxKind.HeritageClause:
                return ts.visitEachChild(node, heritageClauseVisitor, context);
            case ts.SyntaxKind.ExpressionWithTypeArguments:
                return visitExpressionWithTypeArgumentsInHeritageClause(node as ts.ExpressionWithTypeArguments);
            default:
                return visitor(node);
        }
    }

    /**
     * Visits the assignment target of a destructuring assignment.
     */
    function assignmentTargetVisitor(node: ts.Node): ts.VisitResult<ts.Node> {
        switch (node.kind) {
            case ts.SyntaxKind.ObjectLiteralExpression:
            case ts.SyntaxKind.ArrayLiteralExpression:
                return visitAssignmentPattern(node as ts.AssignmentPattern);
            default:
                return visitor(node);
        }
    }

    /**
     * Visits a member of a class.
     */
    function classElementVisitor(node: ts.Node): ts.VisitResult<ts.Node> {
        switch (node.kind) {
            case ts.SyntaxKind.Constructor:
                return visitConstructorDeclaration(node as ts.ConstructorDeclaration);
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
            case ts.SyntaxKind.MethodDeclaration:
                return setCurrentStaticPropertyDeclarationOrStaticBlockAnd(
                    /*current*/ undefined,
                    visitMethodOrAccessorDeclaration,
                    node as ts.MethodDeclaration | ts.AccessorDeclaration);
            case ts.SyntaxKind.PropertyDeclaration:
                return setCurrentStaticPropertyDeclarationOrStaticBlockAnd(
                    /*current*/ undefined,
                    visitPropertyDeclaration,
                    node as ts.PropertyDeclaration);
            case ts.SyntaxKind.ComputedPropertyName:
                return visitComputedPropertyName(node as ts.ComputedPropertyName);
            case ts.SyntaxKind.SemicolonClassElement:
                return node;
            default:
                return visitor(node);
        }
    }

    /**
     * Visits the results of an auto-accessor field transformation in a second pass.
     */
    function accessorFieldResultVisitor(node: ts.Node) {
        switch (node.kind) {
            case ts.SyntaxKind.PropertyDeclaration:
                return transformFieldInitializer(node as ts.PropertyDeclaration);
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
                return classElementVisitor(node);
            default:
                ts.Debug.assertMissingNode(node, "Expected node to either be a PropertyDeclaration, GetAccessorDeclaration, or SetAccessorDeclaration");
                break;
        }
    }

    /**
     * If we visit a private name, this means it is an undeclared private name.
     * Replace it with an empty identifier to indicate a problem with the code,
     * unless we are in a statement position - otherwise this will not trigger
     * a SyntaxError.
     */
    function visitPrivateIdentifier(node: ts.PrivateIdentifier) {
        if (!shouldTransformPrivateElementsOrClassStaticBlocks) {
            return node;
        }
        if (ts.isStatement(node.parent)) {
            return node;
        }
        return ts.setOriginalNode(factory.createIdentifier(""), node);
    }

    type PrivateIdentifierInExpression = ts.BinaryExpression & { readonly left: ts.PrivateIdentifier, readonly token: ts.InKeyword };

    function isPrivateIdentifierInExpression(node: ts.BinaryExpression): node is PrivateIdentifierInExpression {
        return ts.isPrivateIdentifier(node.left)
            && node.operatorToken.kind === ts.SyntaxKind.InKeyword;
    }

    /**
     * Visits `#id in expr`
     */
    function transformPrivateIdentifierInInExpression(node: PrivateIdentifierInExpression) {
        const info = accessPrivateIdentifier(node.left);
        if (info) {
            const receiver = ts.visitNode(node.right, visitor, ts.isExpression);

            return ts.setOriginalNode(
                context.getEmitHelperFactory().createClassPrivateFieldInHelper(info.brandCheckIdentifier, receiver),
                node
            );
        }

        // Private name has not been declared. Subsequent transformers will handle this error
        return ts.visitEachChild(node, visitor, context);
    }

    function visitVariableStatement(node: ts.VariableStatement) {
        const savedPendingStatements = pendingStatements;
        pendingStatements = [];

        const visitedNode = ts.visitEachChild(node, visitor, context);
        const statement = ts.some(pendingStatements) ?
            [visitedNode, ...pendingStatements] :
            visitedNode;

        pendingStatements = savedPendingStatements;
        return statement;
    }

    function visitComputedPropertyName(node: ts.ComputedPropertyName) {
        let expression = ts.visitNode(node.expression, visitor, ts.isExpression);
        if (ts.some(pendingExpressions)) {
            if (ts.isParenthesizedExpression(expression)) {
                expression = factory.updateParenthesizedExpression(expression, factory.inlineExpressions([...pendingExpressions, expression.expression]));
            }
            else {
                expression = factory.inlineExpressions([...pendingExpressions, expression]);
            }
            pendingExpressions = undefined;
        }
        return factory.updateComputedPropertyName(node, expression);
    }

    function visitConstructorDeclaration(node: ts.ConstructorDeclaration) {
        if (currentClassContainer) {
            return transformConstructor(node, currentClassContainer);
        }
        return fallbackVisitor(node);
    }

    function visitMethodOrAccessorDeclaration(node: ts.MethodDeclaration | ts.AccessorDeclaration) {
        ts.Debug.assert(!ts.hasDecorators(node));

        if (!shouldTransformPrivateElementsOrClassStaticBlocks || !ts.isPrivateIdentifier(node.name)) {
            return ts.visitEachChild(node, classElementVisitor, context);
        }

        // leave invalid code untransformed
        const info = accessPrivateIdentifier(node.name);
        ts.Debug.assert(info, "Undeclared private name for property declaration.");
        if (!info.isValid) {
            return node;
        }

        const functionName = getHoistedFunctionName(node);
        if (functionName) {
            getPendingExpressions().push(
                factory.createAssignment(
                    functionName,
                    factory.createFunctionExpression(
                        ts.filter(node.modifiers, (m): m is ts.Modifier => ts.isModifier(m) && !ts.isStaticModifier(m) && !ts.isAccessorModifier(m)),
                        node.asteriskToken,
                        functionName,
                        /* typeParameters */ undefined,
                        ts.visitParameterList(node.parameters, visitor, context),
                        /* type */ undefined,
                        ts.visitFunctionBody(node.body!, visitor, context)
                    )
                )
            );
        }

        // remove method declaration from class
        return undefined;
    }

    function setCurrentStaticPropertyDeclarationOrStaticBlockAnd<T, U>(
        current: ts.ClassStaticBlockDeclaration | ts.PropertyDeclaration | undefined,
        visitor: (arg: T) => U,
        arg: T,
    ) {
        const savedCurrentStaticPropertyDeclarationOrStaticBlock = currentStaticPropertyDeclarationOrStaticBlock;
        currentStaticPropertyDeclarationOrStaticBlock = current;
        const result = visitor(arg);
        currentStaticPropertyDeclarationOrStaticBlock = savedCurrentStaticPropertyDeclarationOrStaticBlock;
        return result;
    }

    function getHoistedFunctionName(node: ts.MethodDeclaration | ts.AccessorDeclaration) {
        ts.Debug.assert(ts.isPrivateIdentifier(node.name));
        const info = accessPrivateIdentifier(node.name);
        ts.Debug.assert(info, "Undeclared private name for property declaration.");

        if (info.kind === PrivateIdentifierKind.Method) {
            return info.methodName;
        }

        if (info.kind === PrivateIdentifierKind.Accessor) {
            if (ts.isGetAccessor(node)) {
                return info.getterName;
            }
            if (ts.isSetAccessor(node)) {
                return info.setterName;
            }
        }
    }

    function transformAutoAccessor(node: ts.AutoAccessorPropertyDeclaration): ts.VisitResult<ts.Node> {
        // transforms:
        //      accessor x = 1;
        // into:
        //      #x = 1;
        //      get x() { return this.#x; }
        //      set x(value) { this.#x = value; }

        ts.Debug.assertEachNode(node.modifiers, ts.isModifier);

        const commentRange = ts.getCommentRange(node);
        const sourceMapRange = ts.getSourceMapRange(node);

        // Since we're creating two declarations where there was previously one, cache
        // the expression for any computed property names.
        const name = node.name;
        let getterName = name;
        let setterName = name;
        if (ts.isComputedPropertyName(name) && !ts.isSimpleInlineableExpression(name.expression)) {
            const temp = factory.createTempVariable(hoistVariableDeclaration);
            ts.setSourceMapRange(temp, name.expression);
            const expression = ts.visitNode(name.expression, visitor, ts.isExpression);
            const assignment = factory.createAssignment(temp, expression);
            ts.setSourceMapRange(assignment, name.expression);
            getterName = factory.updateComputedPropertyName(name, factory.inlineExpressions([assignment, temp]));
            setterName = factory.updateComputedPropertyName(name, temp);
        }

        const backingField = ts.createAccessorPropertyBackingField(factory, node, node.modifiers, node.initializer);
        ts.setOriginalNode(backingField, node);
        ts.setEmitFlags(backingField, ts.EmitFlags.NoComments);
        ts.setSourceMapRange(backingField, sourceMapRange);

        const getter = ts.createAccessorPropertyGetRedirector(factory, node, node.modifiers, getterName);
        ts.setOriginalNode(getter, node);
        ts.setCommentRange(getter, commentRange);
        ts.setSourceMapRange(getter, sourceMapRange);

        const setter = ts.createAccessorPropertySetRedirector(factory, node, node.modifiers, setterName);
        ts.setOriginalNode(setter, node);
        ts.setEmitFlags(setter, ts.EmitFlags.NoComments);
        ts.setSourceMapRange(setter, sourceMapRange);

        return ts.visitArray([backingField, getter, setter], accessorFieldResultVisitor, ts.isClassElement);
    }

    function transformPrivateFieldInitializer(node: ts.PrivateIdentifierPropertyDeclaration) {
        if (shouldTransformPrivateElementsOrClassStaticBlocks) {
            // If we are transforming private elements into WeakMap/WeakSet, we should elide the node.
            const info = accessPrivateIdentifier(node.name);
            ts.Debug.assert(info, "Undeclared private name for property declaration.");

            // Leave invalid code untransformed; otherwise, elide the node as it is transformed elsewhere.
            return info.isValid ? undefined : node;
        }

        if (shouldTransformInitializersUsingSet && !ts.isStatic(node)) {
            // If we are transforming initializers using Set semantics we will elide the initializer as it will
            // be moved to the constructor to preserve evaluation order next to public instance fields. We don't
            // need to do this transformation for private static fields since public static fields can be
            // transformed into `static {}` blocks.
            return factory.updatePropertyDeclaration(
                node,
                ts.visitNodes(node.modifiers, visitor, ts.isModifierLike),
                node.name,
                /*questionOrExclamationToken*/ undefined,
                /*type*/ undefined,
                /*initializer*/ undefined
            );
        }

        return ts.visitEachChild(node, visitor, context);
    }

    function transformPublicFieldInitializer(node: ts.PropertyDeclaration) {
        if (shouldTransformInitializers) {
            // Create a temporary variable to store a computed property name (if necessary).
            // If it's not inlineable, then we emit an expression after the class which assigns
            // the property name to the temporary variable.

            const expr = getPropertyNameExpressionIfNeeded(node.name, /*shouldHoist*/ !!node.initializer || useDefineForClassFields);
            if (expr) {
                getPendingExpressions().push(expr);
            }

            if (ts.isStatic(node) && !shouldTransformPrivateElementsOrClassStaticBlocks) {
                const initializerStatement = transformPropertyOrClassStaticBlock(node, factory.createThis());
                if (initializerStatement) {
                    const staticBlock = factory.createClassStaticBlockDeclaration(
                        factory.createBlock([initializerStatement])
                    );

                    ts.setOriginalNode(staticBlock, node);
                    ts.setCommentRange(staticBlock, node);

                    // Set the comment range for the statement to an empty synthetic range
                    // and drop synthetic comments from the statement to avoid printing them twice.
                    ts.setCommentRange(initializerStatement, { pos: -1, end: -1 });
                    ts.setSyntheticLeadingComments(initializerStatement, undefined);
                    ts.setSyntheticTrailingComments(initializerStatement, undefined);
                    return staticBlock;
                }
            }

            return undefined;
        }

        return ts.visitEachChild(node, classElementVisitor, context);
    }

    function transformFieldInitializer(node: ts.PropertyDeclaration) {
        ts.Debug.assert(!ts.hasDecorators(node), "Decorators should already have been transformed and elided.");
        return ts.isPrivateIdentifierClassElementDeclaration(node) ?
            transformPrivateFieldInitializer(node) :
            transformPublicFieldInitializer(node);
    }

    function visitPropertyDeclaration(node: ts.PropertyDeclaration) {
        // If this is an auto-accessor, we defer to `transformAutoAccessor`. That function
        // will in turn call `transformFieldInitializer` as needed.
        if (shouldTransformAutoAccessors && ts.isAutoAccessorPropertyDeclaration(node)) {
            return transformAutoAccessor(node);
        }

        return transformFieldInitializer(node);
    }

    function createPrivateIdentifierAccess(info: PrivateIdentifierInfo, receiver: ts.Expression): ts.Expression {
        return createPrivateIdentifierAccessHelper(info, ts.visitNode(receiver, visitor, ts.isExpression));
    }

    function createPrivateIdentifierAccessHelper(info: PrivateIdentifierInfo, receiver: ts.Expression): ts.Expression {
        ts.setCommentRange(receiver, ts.moveRangePos(receiver, -1));

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
                ts.Debug.assertNever(info, "Unknown private element type");
        }
    }

    function visitPropertyAccessExpression(node: ts.PropertyAccessExpression) {
        if (shouldTransformPrivateElementsOrClassStaticBlocks && ts.isPrivateIdentifier(node.name)) {
            const privateIdentifierInfo = accessPrivateIdentifier(node.name);
            if (privateIdentifierInfo) {
                return ts.setTextRange(
                    ts.setOriginalNode(
                        createPrivateIdentifierAccess(privateIdentifierInfo, node.expression),
                        node
                    ),
                    node
                );
            }
        }
        if (shouldTransformSuperInStaticInitializers &&
            ts.isSuperProperty(node) &&
            ts.isIdentifier(node.name) &&
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
                ts.setOriginalNode(superProperty, node.expression);
                ts.setTextRange(superProperty, node.expression);
                return superProperty;
            }
        }
        return ts.visitEachChild(node, visitor, context);
    }

    function visitElementAccessExpression(node: ts.ElementAccessExpression) {
        if (shouldTransformSuperInStaticInitializers &&
            ts.isSuperProperty(node) &&
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
                    ts.visitNode(node.argumentExpression, visitor, ts.isExpression),
                    classConstructor
                );
                ts.setOriginalNode(superProperty, node.expression);
                ts.setTextRange(superProperty, node.expression);
                return superProperty;
            }
        }
        return ts.visitEachChild(node, visitor, context);
    }

    function visitPreOrPostfixUnaryExpression(node: ts.PrefixUnaryExpression | ts.PostfixUnaryExpression, valueIsDiscarded: boolean) {
        if (node.operator === ts.SyntaxKind.PlusPlusToken ||
            node.operator === ts.SyntaxKind.MinusMinusToken) {
            const operand = ts.skipParentheses(node.operand);
            if (shouldTransformPrivateElementsOrClassStaticBlocks &&
                ts.isPrivateIdentifierPropertyAccessExpression(operand)) {
                let info: PrivateIdentifierInfo | undefined;
                if (info = accessPrivateIdentifier(operand.name)) {
                    const receiver = ts.visitNode(operand.expression, visitor, ts.isExpression);
                    const { readExpression, initializeExpression } = createCopiableReceiverExpr(receiver);

                    let expression: ts.Expression = createPrivateIdentifierAccess(info, readExpression);
                    const temp = ts.isPrefixUnaryExpression(node) || valueIsDiscarded ? undefined : factory.createTempVariable(hoistVariableDeclaration);
                    expression = ts.expandPreOrPostfixIncrementOrDecrementExpression(factory, node, expression, hoistVariableDeclaration, temp);
                    expression = createPrivateIdentifierAssignment(
                        info,
                        initializeExpression || readExpression,
                        expression,
                        ts.SyntaxKind.EqualsToken
                    );
                    ts.setOriginalNode(expression, node);
                    ts.setTextRange(expression, node);
                    if (temp) {
                        expression = factory.createComma(expression, temp);
                        ts.setTextRange(expression, node);
                    }
                    return expression;
                }
            }
            else if (shouldTransformSuperInStaticInitializers &&
                ts.isSuperProperty(operand) &&
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
                    const expression = visitInvalidSuperProperty(operand);
                    return ts.isPrefixUnaryExpression(node) ?
                        factory.updatePrefixUnaryExpression(node, expression) :
                        factory.updatePostfixUnaryExpression(node, expression);
                }
                if (classConstructor && superClassReference) {
                    let setterName: ts.Expression | undefined;
                    let getterName: ts.Expression | undefined;
                    if (ts.isPropertyAccessExpression(operand)) {
                        if (ts.isIdentifier(operand.name)) {
                            getterName = setterName = factory.createStringLiteralFromNode(operand.name);
                        }
                    }
                    else {
                        if (ts.isSimpleInlineableExpression(operand.argumentExpression)) {
                            getterName = setterName = operand.argumentExpression;
                        }
                        else {
                            getterName = factory.createTempVariable(hoistVariableDeclaration);
                            setterName = factory.createAssignment(getterName, ts.visitNode(operand.argumentExpression, visitor, ts.isExpression));
                        }
                    }
                    if (setterName && getterName) {
                        let expression: ts.Expression = factory.createReflectGetCall(superClassReference, getterName, classConstructor);
                        ts.setTextRange(expression, operand);

                        const temp = valueIsDiscarded ? undefined : factory.createTempVariable(hoistVariableDeclaration);
                        expression = ts.expandPreOrPostfixIncrementOrDecrementExpression(factory, node, expression, hoistVariableDeclaration, temp);
                        expression = factory.createReflectSetCall(superClassReference, setterName, expression, classConstructor);
                        ts.setOriginalNode(expression, node);
                        ts.setTextRange(expression, node);
                        if (temp) {
                            expression = factory.createComma(expression, temp);
                            ts.setTextRange(expression, node);
                        }
                        return expression;
                    }
                }
            }
        }
        return ts.visitEachChild(node, visitor, context);
    }

    function visitForStatement(node: ts.ForStatement) {
        return factory.updateForStatement(
            node,
            ts.visitNode(node.initializer, discardedValueVisitor, ts.isForInitializer),
            ts.visitNode(node.condition, visitor, ts.isExpression),
            ts.visitNode(node.incrementor, discardedValueVisitor, ts.isExpression),
            ts.visitIterationBody(node.statement, visitor, context)
        );
    }

    function visitExpressionStatement(node: ts.ExpressionStatement) {
        return factory.updateExpressionStatement(
            node,
            ts.visitNode(node.expression, discardedValueVisitor, ts.isExpression)
        );
    }

    function createCopiableReceiverExpr(receiver: ts.Expression): { readExpression: ts.Expression; initializeExpression: ts.Expression | undefined } {
        const clone = ts.nodeIsSynthesized(receiver) ? receiver : factory.cloneNode(receiver);
        if (ts.isSimpleInlineableExpression(receiver)) {
            return { readExpression: clone, initializeExpression: undefined };
        }
        const readExpression = factory.createTempVariable(hoistVariableDeclaration);
        const initializeExpression = factory.createAssignment(readExpression, clone);
        return { readExpression, initializeExpression };
    }

    function visitCallExpression(node: ts.CallExpression) {
        if (shouldTransformPrivateElementsOrClassStaticBlocks &&
            ts.isPrivateIdentifierPropertyAccessExpression(node.expression)) {
            // obj.#x()

            // Transform call expressions of private names to properly bind the `this` parameter.
            const { thisArg, target } = factory.createCallBinding(node.expression, hoistVariableDeclaration, languageVersion);
            if (ts.isCallChain(node)) {
                return factory.updateCallChain(
                    node,
                    factory.createPropertyAccessChain(ts.visitNode(target, visitor), node.questionDotToken, "call"),
                    /*questionDotToken*/ undefined,
                    /*typeArguments*/ undefined,
                    [ts.visitNode(thisArg, visitor, ts.isExpression), ...ts.visitNodes(node.arguments, visitor, ts.isExpression)]
                );
            }
            return factory.updateCallExpression(
                node,
                factory.createPropertyAccessExpression(ts.visitNode(target, visitor), "call"),
                /*typeArguments*/ undefined,
                [ts.visitNode(thisArg, visitor, ts.isExpression), ...ts.visitNodes(node.arguments, visitor, ts.isExpression)]
            );
        }

        if (shouldTransformSuperInStaticInitializers &&
            ts.isSuperProperty(node.expression) &&
            currentStaticPropertyDeclarationOrStaticBlock &&
            currentClassLexicalEnvironment?.classConstructor) {
            // super.x()
            // super[x]()

            // converts `super.f(...)` into `Reflect.get(_baseTemp, "f", _classTemp).call(_classTemp, ...)`
            const invocation = factory.createFunctionCallCall(
                ts.visitNode(node.expression, visitor, ts.isExpression),
                currentClassLexicalEnvironment.classConstructor,
                ts.visitNodes(node.arguments, visitor, ts.isExpression)
            );
            ts.setOriginalNode(invocation, node);
            ts.setTextRange(invocation, node);
            return invocation;
        }

        return ts.visitEachChild(node, visitor, context);
    }

    function visitTaggedTemplateExpression(node: ts.TaggedTemplateExpression) {
        if (shouldTransformPrivateElementsOrClassStaticBlocks &&
            ts.isPrivateIdentifierPropertyAccessExpression(node.tag)) {
            // Bind the `this` correctly for tagged template literals when the tag is a private identifier property access.
            const { thisArg, target } = factory.createCallBinding(node.tag, hoistVariableDeclaration, languageVersion);
            return factory.updateTaggedTemplateExpression(
                node,
                factory.createCallExpression(
                    factory.createPropertyAccessExpression(ts.visitNode(target, visitor), "bind"),
                    /*typeArguments*/ undefined,
                    [ts.visitNode(thisArg, visitor, ts.isExpression)]
                ),
                /*typeArguments*/ undefined,
                ts.visitNode(node.template, visitor, ts.isTemplateLiteral)
            );
        }
        if (shouldTransformSuperInStaticInitializers &&
            ts.isSuperProperty(node.tag) &&
            currentStaticPropertyDeclarationOrStaticBlock &&
            currentClassLexicalEnvironment?.classConstructor) {

            // converts `` super.f`x` `` into `` Reflect.get(_baseTemp, "f", _classTemp).bind(_classTemp)`x` ``
            const invocation = factory.createFunctionBindCall(
                ts.visitNode(node.tag, visitor, ts.isExpression),
                currentClassLexicalEnvironment.classConstructor,
                []
            );
            ts.setOriginalNode(invocation, node);
            ts.setTextRange(invocation, node);
            return factory.updateTaggedTemplateExpression(
                node,
                invocation,
                /*typeArguments*/ undefined,
                ts.visitNode(node.template, visitor, ts.isTemplateLiteral)
            );
        }
        return ts.visitEachChild(node, visitor, context);
    }

    function transformClassStaticBlockDeclaration(node: ts.ClassStaticBlockDeclaration) {
        if (shouldTransformPrivateElementsOrClassStaticBlocks) {
            if (currentClassLexicalEnvironment) {
                classLexicalEnvironmentMap.set(ts.getOriginalNodeId(node), currentClassLexicalEnvironment);
            }

            startLexicalEnvironment();
            let statements = setCurrentStaticPropertyDeclarationOrStaticBlockAnd(
                node,
                statements => ts.visitNodes(statements, visitor, ts.isStatement),
                node.body.statements
            );
            statements = factory.mergeLexicalEnvironment(statements, endLexicalEnvironment());

            const iife = factory.createImmediatelyInvokedArrowFunction(statements);
            ts.setOriginalNode(iife, node);
            ts.setTextRange(iife, node);
            ts.addEmitFlags(iife, ts.EmitFlags.AdviseOnEmitNode);
            return iife;
        }
    }

    function visitBinaryExpression(node: ts.BinaryExpression, valueIsDiscarded: boolean) {
        if (ts.isDestructuringAssignment(node)) {
            // ({ x: obj.#x } = ...)
            // ({ x: super.x } = ...)
            // ({ x: super[x] } = ...)
            const savedPendingExpressions = pendingExpressions;
            pendingExpressions = undefined;
            node = factory.updateBinaryExpression(
                node,
                ts.visitNode(node.left, assignmentTargetVisitor),
                node.operatorToken,
                ts.visitNode(node.right, visitor)
            );
            const expr = ts.some(pendingExpressions) ?
                factory.inlineExpressions(ts.compact([...pendingExpressions, node])) :
                node;
            pendingExpressions = savedPendingExpressions;
            return expr;
        }
        if (ts.isAssignmentExpression(node)) {
            if (shouldTransformPrivateElementsOrClassStaticBlocks &&
                ts.isPrivateIdentifierPropertyAccessExpression(node.left)) {
                // obj.#x = ...
                const info = accessPrivateIdentifier(node.left.name);
                if (info) {
                    return ts.setTextRange(
                        ts.setOriginalNode(
                            createPrivateIdentifierAssignment(info, node.left.expression, node.right, node.operatorToken.kind),
                            node
                        ),
                        node
                    );
                }
            }
            else if (shouldTransformSuperInStaticInitializers &&
                ts.isSuperProperty(node.left) &&
                currentStaticPropertyDeclarationOrStaticBlock &&
                currentClassLexicalEnvironment) {
                // super.x = ...
                // super[x] = ...
                // super.x += ...
                // super.x -= ...
                const { classConstructor, superClassReference, facts } = currentClassLexicalEnvironment;
                if (facts & ClassFacts.ClassWasDecorated) {
                    return factory.updateBinaryExpression(
                        node,
                        visitInvalidSuperProperty(node.left),
                        node.operatorToken,
                        ts.visitNode(node.right, visitor, ts.isExpression));
                }
                if (classConstructor && superClassReference) {
                    let setterName =
                        ts.isElementAccessExpression(node.left) ? ts.visitNode(node.left.argumentExpression, visitor, ts.isExpression) :
                        ts.isIdentifier(node.left.name) ? factory.createStringLiteralFromNode(node.left.name) :
                        undefined;
                    if (setterName) {
                        // converts `super.x = 1` into `(Reflect.set(_baseTemp, "x", _a = 1, _classTemp), _a)`
                        // converts `super[f()] = 1` into `(Reflect.set(_baseTemp, f(), _a = 1, _classTemp), _a)`
                        // converts `super.x += 1` into `(Reflect.set(_baseTemp, "x", _a = Reflect.get(_baseTemp, "x", _classtemp) + 1, _classTemp), _a)`
                        // converts `super[f()] += 1` into `(Reflect.set(_baseTemp, _a = f(), _b = Reflect.get(_baseTemp, _a, _classtemp) + 1, _classTemp), _b)`

                        let expression = ts.visitNode(node.right, visitor, ts.isExpression);
                        if (ts.isCompoundAssignment(node.operatorToken.kind)) {
                            let getterName = setterName;
                            if (!ts.isSimpleInlineableExpression(setterName)) {
                                getterName = factory.createTempVariable(hoistVariableDeclaration);
                                setterName = factory.createAssignment(getterName, setterName);
                            }
                            const superPropertyGet = factory.createReflectGetCall(
                                superClassReference,
                                getterName,
                                classConstructor
                            );
                            ts.setOriginalNode(superPropertyGet, node.left);
                            ts.setTextRange(superPropertyGet, node.left);

                            expression = factory.createBinaryExpression(
                                superPropertyGet,
                                ts.getNonAssignmentOperatorForCompoundAssignment(node.operatorToken.kind),
                                expression
                            );
                            ts.setTextRange(expression, node);
                        }

                        const temp = valueIsDiscarded ? undefined : factory.createTempVariable(hoistVariableDeclaration);
                        if (temp) {
                            expression = factory.createAssignment(temp, expression);
                            ts.setTextRange(temp, node);
                        }

                        expression = factory.createReflectSetCall(
                            superClassReference,
                            setterName,
                            expression,
                            classConstructor
                        );
                        ts.setOriginalNode(expression, node);
                        ts.setTextRange(expression, node);

                        if (temp) {
                            expression = factory.createComma(expression, temp);
                            ts.setTextRange(expression, node);
                        }

                        return expression;
                    }
                }
            }
        }
        if (shouldTransformPrivateElementsOrClassStaticBlocks &&
            isPrivateIdentifierInExpression(node)) {
            // #x in obj
            return transformPrivateIdentifierInInExpression(node);
        }
        return ts.visitEachChild(node, visitor, context);
    }

    function createPrivateIdentifierAssignment(info: PrivateIdentifierInfo, receiver: ts.Expression, right: ts.Expression, operator: ts.AssignmentOperator): ts.Expression {
        receiver = ts.visitNode(receiver, visitor, ts.isExpression);
        right = ts.visitNode(right, visitor, ts.isExpression);

        if (ts.isCompoundAssignment(operator)) {
            const { readExpression, initializeExpression } = createCopiableReceiverExpr(receiver);
            receiver = initializeExpression || readExpression;
            right = factory.createBinaryExpression(
                createPrivateIdentifierAccessHelper(info, readExpression),
                ts.getNonAssignmentOperatorForCompoundAssignment(operator),
                right
            );
        }

        ts.setCommentRange(receiver, ts.moveRangePos(receiver, -1));

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
                ts.Debug.assertNever(info, "Unknown private element type");
        }
    }

    function getPrivateInstanceMethodsAndAccessors(node: ts.ClassLikeDeclaration) {
        return ts.filter(node.members, ts.isNonStaticMethodOrAccessorWithPrivateName);
    }

    function getClassFacts(node: ts.ClassLikeDeclaration) {
        let facts = ClassFacts.None;
        const original = ts.getOriginalNode(node);
        if (ts.isClassDeclaration(original) && ts.classOrConstructorParameterIsDecorated(original)) {
            facts |= ClassFacts.ClassWasDecorated;
        }
        for (const member of node.members) {
            if (!ts.isStatic(member)) continue;
            if (member.name && (ts.isPrivateIdentifier(member.name) || ts.isAutoAccessorPropertyDeclaration(member)) && shouldTransformPrivateElementsOrClassStaticBlocks) {
                facts |= ClassFacts.NeedsClassConstructorReference;
            }
            if (ts.isPropertyDeclaration(member) || ts.isClassStaticBlockDeclaration(member)) {
                if (shouldTransformThisInStaticInitializers && member.transformFlags & ts.TransformFlags.ContainsLexicalThis) {
                    facts |= ClassFacts.NeedsSubstitutionForThisInClassStaticField;
                    if (!(facts & ClassFacts.ClassWasDecorated)) {
                        facts |= ClassFacts.NeedsClassConstructorReference;
                    }
                }
                if (shouldTransformSuperInStaticInitializers && member.transformFlags & ts.TransformFlags.ContainsLexicalSuper) {
                    if (!(facts & ClassFacts.ClassWasDecorated)) {
                        facts |= ClassFacts.NeedsClassConstructorReference | ClassFacts.NeedsClassSuperReference;
                    }
                }
            }
        }
        return facts;
    }

    function visitExpressionWithTypeArgumentsInHeritageClause(node: ts.ExpressionWithTypeArguments) {
        const facts = currentClassLexicalEnvironment?.facts || ClassFacts.None;
        if (facts & ClassFacts.NeedsClassSuperReference) {
            const temp = factory.createTempVariable(hoistVariableDeclaration, /*reserveInNestedScopes*/ true);
            getClassLexicalEnvironment().superClassReference = temp;
            return factory.updateExpressionWithTypeArguments(
                node,
                factory.createAssignment(
                    temp,
                    ts.visitNode(node.expression, visitor, ts.isExpression)
                ),
                /*typeArguments*/ undefined
            );
        }
        return ts.visitEachChild(node, visitor, context);
    }

    function visitInNewClassLexicalEnvironment<T extends ts.ClassLikeDeclaration, U>(node: T, visitor: (node: T, facts: ClassFacts) => U) {
        const savedCurrentClassContainer = currentClassContainer;
        const savedPendingExpressions = pendingExpressions;
        currentClassContainer = node;
        pendingExpressions = undefined;
        startClassLexicalEnvironment();

        if (shouldTransformPrivateElementsOrClassStaticBlocks) {
            const name = ts.getNameOfDeclaration(node);
            if (name && ts.isIdentifier(name)) {
                getPrivateIdentifierEnvironment().className = name;
            }

            const privateInstanceMethodsAndAccessors = getPrivateInstanceMethodsAndAccessors(node);
            if (ts.some(privateInstanceMethodsAndAccessors)) {
                getPrivateIdentifierEnvironment().weakSetName = createHoistedVariableForClass(
                    "instances",
                    privateInstanceMethodsAndAccessors[0].name
                );
            }
        }

        const facts = getClassFacts(node);
        if (facts) {
            getClassLexicalEnvironment().facts = facts;
        }

        if (facts & ClassFacts.NeedsSubstitutionForThisInClassStaticField) {
            enableSubstitutionForClassStaticThisOrSuperReference();
        }

        const result = visitor(node, facts);
        endClassLexicalEnvironment();
        currentClassContainer = savedCurrentClassContainer;
        pendingExpressions = savedPendingExpressions;
        return result;

    }

    function visitClassDeclaration(node: ts.ClassDeclaration) {
        return visitInNewClassLexicalEnvironment(node, visitClassDeclarationInNewClassLexicalEnvironment);
    }

    function visitClassDeclarationInNewClassLexicalEnvironment(node: ts.ClassDeclaration, facts: ClassFacts) {
        // If a class has private static fields, or a static field has a `this` or `super` reference,
        // then we need to allocate a temp variable to hold on to that reference.
        let pendingClassReferenceAssignment: ts.BinaryExpression | undefined;
        if (facts & ClassFacts.NeedsClassConstructorReference) {
            const temp = factory.createTempVariable(hoistVariableDeclaration, /*reservedInNestedScopes*/ true);
            getClassLexicalEnvironment().classConstructor = factory.cloneNode(temp);
            pendingClassReferenceAssignment = factory.createAssignment(temp, factory.getInternalName(node));
        }

        const modifiers = ts.visitNodes(node.modifiers, visitor, ts.isModifierLike);
        const heritageClauses = ts.visitNodes(node.heritageClauses, heritageClauseVisitor, ts.isHeritageClause);
        const { members, prologue } = transformClassMembers(node);
        const classDecl = factory.updateClassDeclaration(
            node,
            modifiers,
            node.name,
            /*typeParameters*/ undefined,
            heritageClauses,
            members
        );

        const statements: ts.Statement[] = [];
        if (prologue) {
            statements.push(factory.createExpressionStatement(prologue));
        }

        statements.push(classDecl);

        if (pendingClassReferenceAssignment) {
            getPendingExpressions().unshift(pendingClassReferenceAssignment);
        }

        // Write any pending expressions from elided or moved computed property names
        if (ts.some(pendingExpressions)) {
            statements.push(factory.createExpressionStatement(factory.inlineExpressions(pendingExpressions)));
        }

        if (shouldTransformInitializersUsingSet || shouldTransformPrivateElementsOrClassStaticBlocks) {
            // Emit static property assignment. Because classDeclaration is lexically evaluated,
            // it is safe to emit static property assignment after classDeclaration
            // From ES6 specification:
            //      HasLexicalDeclaration (N) : Determines if the argument identifier has a binding in this environment record that was created using
            //                                  a lexical declaration such as a LexicalDeclaration or a ClassDeclaration.

            const staticProperties = ts.getStaticPropertiesAndClassStaticBlock(node);
            if (ts.some(staticProperties)) {
                addPropertyOrClassStaticBlockStatements(statements, staticProperties, factory.getInternalName(node));
            }
        }

        return statements;
    }

    function visitClassExpression(node: ts.ClassExpression): ts.Expression {
        return visitInNewClassLexicalEnvironment(node, visitClassExpressionInNewClassLexicalEnvironment);
    }

    function visitClassExpressionInNewClassLexicalEnvironment(node: ts.ClassExpression, facts: ClassFacts): ts.Expression {
        // If this class expression is a transformation of a decorated class declaration,
        // then we want to output the pendingExpressions as statements, not as inlined
        // expressions with the class statement.
        //
        // In this case, we use pendingStatements to produce the same output as the
        // class declaration transformation. The VariableStatement visitor will insert
        // these statements after the class expression variable statement.
        const isDecoratedClassDeclaration = !!(facts & ClassFacts.ClassWasDecorated);

        const staticPropertiesOrClassStaticBlocks = ts.getStaticPropertiesAndClassStaticBlock(node);

        const isClassWithConstructorReference = resolver.getNodeCheckFlags(node) & ts.NodeCheckFlags.ClassWithConstructorReference;
        let temp: ts.Identifier | undefined;
        function createClassTempVar() {
            const classCheckFlags = resolver.getNodeCheckFlags(node);
            const isClassWithConstructorReference = classCheckFlags & ts.NodeCheckFlags.ClassWithConstructorReference;
            const requiresBlockScopedVar = classCheckFlags & ts.NodeCheckFlags.BlockScopedBindingInLoop;
            return factory.createTempVariable(requiresBlockScopedVar ? addBlockScopedVariable : hoistVariableDeclaration, !!isClassWithConstructorReference);
        }

        if (facts & ClassFacts.NeedsClassConstructorReference) {
            temp = createClassTempVar();
            getClassLexicalEnvironment().classConstructor = factory.cloneNode(temp);
        }

        const modifiers = ts.visitNodes(node.modifiers, visitor, ts.isModifierLike);
        const heritageClauses = ts.visitNodes(node.heritageClauses, heritageClauseVisitor, ts.isHeritageClause);
        const { members, prologue } = transformClassMembers(node);
        const classExpression = factory.updateClassExpression(
            node,
            modifiers,
            node.name,
            /*typeParameters*/ undefined,
            heritageClauses,
            members
        );

        const expressions: ts.Expression[] = [];
        if (prologue) {
            expressions.push(prologue);
        }

        // Static initializers are transformed to `static {}` blocks when `useDefineForClassFields: false`
        // and not also transforming static blocks.
        const hasTransformableStatics =
            shouldTransformPrivateElementsOrClassStaticBlocks &&
            ts.some(staticPropertiesOrClassStaticBlocks, node =>
                ts.isClassStaticBlockDeclaration(node) ||
                ts.isPrivateIdentifierClassElementDeclaration(node) ||
                shouldTransformInitializers && ts.isInitializedProperty(node));

        if (hasTransformableStatics || ts.some(pendingExpressions)) {
            if (isDecoratedClassDeclaration) {
                ts.Debug.assertIsDefined(pendingStatements, "Decorated classes transformed by TypeScript are expected to be within a variable declaration.");

                // Write any pending expressions from elided or moved computed property names
                if (pendingStatements && pendingExpressions && ts.some(pendingExpressions)) {
                    pendingStatements.push(factory.createExpressionStatement(factory.inlineExpressions(pendingExpressions)));
                }

                if (pendingStatements && ts.some(staticPropertiesOrClassStaticBlocks)) {
                    addPropertyOrClassStaticBlockStatements(pendingStatements, staticPropertiesOrClassStaticBlocks, factory.getInternalName(node));
                }

                if (temp) {
                    expressions.push(
                        ts.startOnNewLine(factory.createAssignment(temp, classExpression)),
                        ts.startOnNewLine(temp));
                }
                else {
                    expressions.push(classExpression);
                    if (prologue) {
                        ts.startOnNewLine(classExpression);
                    }
                }
            }
            else {
                temp ||= createClassTempVar();
                if (isClassWithConstructorReference) {
                    // record an alias as the class name is not in scope for statics.
                    enableSubstitutionForClassAliases();
                    const alias = factory.cloneNode(temp) as ts.GeneratedIdentifier;
                    alias.autoGenerateFlags &= ~ts.GeneratedIdentifierFlags.ReservedInNestedScopes;
                    classAliases[ts.getOriginalNodeId(node)] = alias;
                }

                // To preserve the behavior of the old emitter, we explicitly indent
                // the body of a class with static initializers.
                ts.setEmitFlags(classExpression, ts.EmitFlags.Indented | ts.getEmitFlags(classExpression));
                expressions.push(ts.startOnNewLine(factory.createAssignment(temp, classExpression)));
                // Add any pending expressions leftover from elided or relocated computed property names
                ts.addRange(expressions, ts.map(pendingExpressions, ts.startOnNewLine));
                ts.addRange(expressions, generateInitializedPropertyExpressionsOrClassStaticBlock(staticPropertiesOrClassStaticBlocks, temp));
                expressions.push(ts.startOnNewLine(temp));
            }
        }
        else {
            expressions.push(classExpression);
            if (prologue) {
                ts.startOnNewLine(classExpression);
            }
        }

        return factory.inlineExpressions(expressions);
    }

    function visitClassStaticBlockDeclaration(node: ts.ClassStaticBlockDeclaration) {
        if (!shouldTransformPrivateElementsOrClassStaticBlocks) {
            return ts.visitEachChild(node, visitor, context);
        }
        // ClassStaticBlockDeclaration for classes are transformed in `visitClassDeclaration` or `visitClassExpression`.
        return undefined;
    }

    function transformClassMembers(node: ts.ClassDeclaration | ts.ClassExpression) {
        // Declare private names
        if (shouldTransformPrivateElementsOrClassStaticBlocks) {
            for (const member of node.members) {
                if (ts.isPrivateIdentifierClassElementDeclaration(member)) {
                    addPrivateIdentifierToEnvironment(member, member.name, addPrivateIdentifierClassElementToEnvironment);
                }
            }
            if (ts.some(getPrivateInstanceMethodsAndAccessors(node))) {
                createBrandCheckWeakSetForPrivateMethods();
            }
            if (shouldTransformAutoAccessors) {
                for (const member of node.members) {
                    if (ts.isAutoAccessorPropertyDeclaration(member)) {
                        const storageName = factory.getGeneratedPrivateNameForNode(member.name, /*prefix*/ undefined, "_accessor_storage");
                        addPrivateIdentifierToEnvironment(member, storageName, addPrivateIdentifierPropertyDeclarationToEnvironment);
                    }
                }
            }
        }

        let members = ts.visitNodes(node.members, classElementVisitor, ts.isClassElement);

        // Create a synthetic constructor if necessary
        let syntheticConstructor: ts.ConstructorDeclaration | undefined;
        if (!ts.some(members, ts.isConstructorDeclaration)) {
            syntheticConstructor = transformConstructor(/*constructor*/ undefined, node);
        }

        let prologue: ts.Expression | undefined;

        // If there are pending expressions create a class static block in which to evaluate them, but only if
        // class static blocks are not also being transformed. This block will be injected at the top of the class
        // to ensure that expressions from computed property names are evaluated before any other static
        // initializers.
        let syntheticStaticBlock: ts.ClassStaticBlockDeclaration | undefined;
        if (!shouldTransformPrivateElementsOrClassStaticBlocks && ts.some(pendingExpressions)) {
            let statement = factory.createExpressionStatement(factory.inlineExpressions(pendingExpressions));
            if (statement.transformFlags & ts.TransformFlags.ContainsLexicalThisOrSuper) {
                // If there are `this` or `super` references from computed property names, shift the expression
                // into an arrow function to be evaluated in the outer scope so that `this` and `super` are
                // properly captured.
                const temp = factory.createTempVariable(hoistVariableDeclaration);
                const arrow = factory.createArrowFunction(
                    /*modifiers*/ undefined,
                    /*typeParameters*/ undefined,
                    /*parameters*/ [],
                    /*type*/ undefined,
                    /*equalsGreaterThanToken*/ undefined,
                    factory.createBlock([statement]));
                prologue = factory.createAssignment(temp, arrow);
                statement = factory.createExpressionStatement(factory.createCallExpression(temp, /*typeArguments*/ undefined, []));
            }

            const block = factory.createBlock([statement]);
            syntheticStaticBlock = factory.createClassStaticBlockDeclaration(block);
            pendingExpressions = undefined;
        }

        // If we created a synthetic constructor or class static block, add them to the visited members
        // and return a new array.
        if (syntheticConstructor || syntheticStaticBlock) {
            let membersArray: ts.ClassElement[] | undefined;
            membersArray = ts.append(membersArray, syntheticConstructor);
            membersArray = ts.append(membersArray, syntheticStaticBlock);
            membersArray = ts.addRange(membersArray, members);
            members = ts.setTextRange(factory.createNodeArray(membersArray), /*location*/ node.members);
        }

        return { members, prologue };
    }

    function createBrandCheckWeakSetForPrivateMethods() {
        const { weakSetName } = getPrivateIdentifierEnvironment();
        ts.Debug.assert(weakSetName, "weakSetName should be set in private identifier environment");

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

    function isClassElementThatRequiresConstructorStatement(member: ts.ClassElement) {
        if (ts.isStatic(member) || ts.hasAbstractModifier(ts.getOriginalNode(member))) {
            return false;
        }

        return shouldTransformInitializersUsingDefine && ts.isPropertyDeclaration(member) ||
            shouldTransformInitializersUsingSet && ts.isInitializedProperty(member) ||
            shouldTransformPrivateElementsOrClassStaticBlocks && ts.isPrivateIdentifierClassElementDeclaration(member) ||
            shouldTransformPrivateElementsOrClassStaticBlocks && shouldTransformAutoAccessors && ts.isAutoAccessorPropertyDeclaration(member);
    }

    function transformConstructor(constructor: ts.ConstructorDeclaration | undefined, container: ts.ClassDeclaration | ts.ClassExpression) {
        constructor = ts.visitNode(constructor, visitor, ts.isConstructorDeclaration);
        if (!ts.some(container.members, isClassElementThatRequiresConstructorStatement)) {
            return constructor;
        }

        const extendsClauseElement = ts.getEffectiveBaseTypeNode(container);
        const isDerivedClass = !!(extendsClauseElement && ts.skipOuterExpressions(extendsClauseElement.expression).kind !== ts.SyntaxKind.NullKeyword);
        const parameters = ts.visitParameterList(constructor ? constructor.parameters : undefined, visitor, context);
        const body = transformConstructorBody(container, constructor, isDerivedClass);
        if (!body) {
            return constructor;
        }

        if (constructor) {
            ts.Debug.assert(parameters);
            return factory.updateConstructorDeclaration(constructor, /*modifiers*/ undefined, parameters, body);
        }

        return ts.startOnNewLine(
            ts.setOriginalNode(
                ts.setTextRange(
                    factory.createConstructorDeclaration(
                        /*modifiers*/ undefined,
                        parameters ?? [],
                        body
                    ),
                    constructor || container
                ),
                constructor
            )
        );
    }

    function transformConstructorBody(node: ts.ClassDeclaration | ts.ClassExpression, constructor: ts.ConstructorDeclaration | undefined, isDerivedClass: boolean) {
        let properties = ts.getProperties(node, /*requireInitializer*/ false, /*isStatic*/ false);
        if (!useDefineForClassFields) {
            properties = ts.filter(properties, property => !!property.initializer || ts.isPrivateIdentifier(property.name) || ts.hasAccessorModifier(property));
        }

        const privateMethodsAndAccessors = getPrivateInstanceMethodsAndAccessors(node);
        const needsConstructorBody = ts.some(properties) || ts.some(privateMethodsAndAccessors);

        // Only generate synthetic constructor when there are property initializers to move.
        if (!constructor && !needsConstructorBody) {
            return ts.visitFunctionBody(/*node*/ undefined, visitor, context);
        }

        resumeLexicalEnvironment();

        const needsSyntheticConstructor = !constructor && isDerivedClass;
        let indexOfFirstStatementAfterSuperAndPrologue = 0;
        let prologueStatementCount = 0;
        let superStatementIndex = -1;
        let statements: ts.Statement[] = [];

        if (constructor?.body?.statements) {
            prologueStatementCount = factory.copyPrologue(constructor.body.statements, statements, /*ensureUseStrict*/ false, visitor);
            superStatementIndex = ts.findSuperStatementIndex(constructor.body.statements, prologueStatementCount);

            // If there was a super call, visit existing statements up to and including it
            if (superStatementIndex >= 0) {
                indexOfFirstStatementAfterSuperAndPrologue = superStatementIndex + 1;
                statements = [
                    ...statements.slice(0, prologueStatementCount),
                    ...ts.visitNodes(constructor.body.statements, visitor, ts.isStatement, prologueStatementCount, indexOfFirstStatementAfterSuperAndPrologue - prologueStatementCount),
                    ...statements.slice(prologueStatementCount),
                ];
            }
            else if (prologueStatementCount >= 0) {
                indexOfFirstStatementAfterSuperAndPrologue = prologueStatementCount;
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
                statements = statements.filter(statement => !ts.isParameterPropertyDeclaration(ts.getOriginalNode(statement), constructor));
            }
            else {
                for (const statement of constructor.body.statements) {
                    if (ts.isParameterPropertyDeclaration(ts.getOriginalNode(statement), constructor)) {
                        parameterPropertyDeclarationCount++;
                    }
                }
                if (parameterPropertyDeclarationCount > 0) {
                    const parameterProperties = ts.visitNodes(constructor.body.statements, visitor, ts.isStatement, indexOfFirstStatementAfterSuperAndPrologue, parameterPropertyDeclarationCount);

                    // If there was a super() call found, add parameter properties immediately after it
                    if (superStatementIndex >= 0) {
                        ts.addRange(statements, parameterProperties);
                    }
                    else {
                        // Add add parameter properties to the top of the constructor after the prologue
                        let superAndPrologueStatementCount = prologueStatementCount;
                        // If a synthetic super() call was added, need to account for that
                        if (needsSyntheticConstructor) superAndPrologueStatementCount++;
                        statements = [
                            ...statements.slice(0, superAndPrologueStatementCount),
                            ...parameterProperties,
                            ...statements.slice(superAndPrologueStatementCount),
                        ];
                    }

                    indexOfFirstStatementAfterSuperAndPrologue += parameterPropertyDeclarationCount;
                }
            }
        }

        const receiver = factory.createThis();
        // private methods can be called in property initializers, they should execute first.
        addMethodStatements(statements, privateMethodsAndAccessors, receiver);
        addPropertyOrClassStaticBlockStatements(statements, properties, receiver);

        // Add existing statements after the initial prologues and super call
        if (constructor) {
            ts.addRange(statements, ts.visitNodes(constructor.body!.statements, visitBodyStatement, ts.isStatement, indexOfFirstStatementAfterSuperAndPrologue));
        }

        statements = factory.mergeLexicalEnvironment(statements, endLexicalEnvironment());

        if (statements.length === 0 && !constructor) {
            return undefined;
        }

        const multiLine = constructor?.body && constructor.body.statements.length >= statements.length ?
            constructor.body.multiLine ?? statements.length > 0 :
            statements.length > 0;

        return ts.setTextRange(
            factory.createBlock(
                ts.setTextRange(
                    factory.createNodeArray(statements),
                    /*location*/ constructor ? constructor.body!.statements : node.members
                ),
                multiLine
            ),
            /*location*/ constructor ? constructor.body : undefined
        );

        function visitBodyStatement(statement: ts.Node) {
            if (useDefineForClassFields && ts.isParameterPropertyDeclaration(ts.getOriginalNode(statement), constructor!)) {
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
    function addPropertyOrClassStaticBlockStatements(statements: ts.Statement[], properties: readonly (ts.PropertyDeclaration | ts.ClassStaticBlockDeclaration)[], receiver: ts.LeftHandSideExpression) {
        for (const property of properties) {
            if (ts.isStatic(property) && !shouldTransformPrivateElementsOrClassStaticBlocks && !useDefineForClassFields) {
                continue;
            }

            const statement = transformPropertyOrClassStaticBlock(property, receiver);
            if (!statement) {
                continue;
            }

            statements.push(statement);
        }
    }

    function transformPropertyOrClassStaticBlock(property: ts.PropertyDeclaration | ts.ClassStaticBlockDeclaration, receiver: ts.LeftHandSideExpression) {
        const expression = ts.isClassStaticBlockDeclaration(property) ?
            transformClassStaticBlockDeclaration(property) :
            transformProperty(property, receiver);
        if (!expression) {
            return undefined;
        }

        const statement = factory.createExpressionStatement(expression);
        ts.setOriginalNode(statement, property);
        ts.addEmitFlags(statement, ts.getEmitFlags(property) & ts.EmitFlags.NoComments);
        ts.setSourceMapRange(statement, ts.moveRangePastModifiers(property));
        ts.setCommentRange(statement, property);

        // `setOriginalNode` *copies* the `emitNode` from `property`, so now both
        // `statement` and `expression` have a copy of the synthesized comments.
        // Drop the comments from expression to avoid printing them twice.
        ts.setSyntheticLeadingComments(expression, undefined);
        ts.setSyntheticTrailingComments(expression, undefined);

        return statement;
    }

    /**
     * Generates assignment expressions for property initializers.
     *
     * @param propertiesOrClassStaticBlocks An array of property declarations to transform.
     * @param receiver The receiver on which each property should be assigned.
     */
    function generateInitializedPropertyExpressionsOrClassStaticBlock(propertiesOrClassStaticBlocks: readonly (ts.PropertyDeclaration | ts.ClassStaticBlockDeclaration)[], receiver: ts.LeftHandSideExpression) {
        const expressions: ts.Expression[] = [];
        for (const property of propertiesOrClassStaticBlocks) {
            const expression = ts.isClassStaticBlockDeclaration(property) ? transformClassStaticBlockDeclaration(property) : transformProperty(property, receiver);
            if (!expression) {
                continue;
            }
            ts.startOnNewLine(expression);
            ts.setOriginalNode(expression, property);
            ts.addEmitFlags(expression, ts.getEmitFlags(property) & ts.EmitFlags.NoComments);
            ts.setSourceMapRange(expression, ts.moveRangePastModifiers(property));
            ts.setCommentRange(expression, property);
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
    function transformProperty(property: ts.PropertyDeclaration, receiver: ts.LeftHandSideExpression) {
        const savedCurrentStaticPropertyDeclarationOrStaticBlock = currentStaticPropertyDeclarationOrStaticBlock;
        const transformed = transformPropertyWorker(property, receiver);
        if (transformed && ts.hasStaticModifier(property) && currentClassLexicalEnvironment?.facts) {
            // capture the lexical environment for the member
            ts.setOriginalNode(transformed, property);
            ts.addEmitFlags(transformed, ts.EmitFlags.AdviseOnEmitNode);
            classLexicalEnvironmentMap.set(ts.getOriginalNodeId(transformed), currentClassLexicalEnvironment);
        }
        currentStaticPropertyDeclarationOrStaticBlock = savedCurrentStaticPropertyDeclarationOrStaticBlock;
        return transformed;
    }

    function transformPropertyWorker(property: ts.PropertyDeclaration, receiver: ts.LeftHandSideExpression) {
        // We generate a name here in order to reuse the value cached by the relocated computed name expression (which uses the same generated name)
        const emitAssignment = !useDefineForClassFields;

        const propertyName =
            ts.hasAccessorModifier(property) ?
                factory.getGeneratedPrivateNameForNode(property.name) :
            ts.isComputedPropertyName(property.name) && !ts.isSimpleInlineableExpression(property.name.expression) ?
                factory.updateComputedPropertyName(property.name, factory.getGeneratedNameForNode(property.name)) :
                property.name;

        if (ts.hasStaticModifier(property)) {
            currentStaticPropertyDeclarationOrStaticBlock = property;
        }

        if (shouldTransformPrivateElementsOrClassStaticBlocks && ts.isPrivateIdentifier(propertyName)) {
            const privateIdentifierInfo = accessPrivateIdentifier(propertyName);
            if (privateIdentifierInfo) {
                if (privateIdentifierInfo.kind === PrivateIdentifierKind.Field) {
                    if (!privateIdentifierInfo.isStatic) {
                        return createPrivateInstanceFieldInitializer(
                            receiver,
                            ts.visitNode(property.initializer, visitor, ts.isExpression),
                            privateIdentifierInfo.brandCheckIdentifier
                        );
                    }
                    else {
                        return createPrivateStaticFieldInitializer(
                            privateIdentifierInfo.variableName,
                            ts.visitNode(property.initializer, visitor, ts.isExpression)
                        );
                    }
                }
                else {
                    return undefined;
                }
            }
            else {
                ts.Debug.fail("Undeclared private name for property declaration.");
            }
        }
        if ((ts.isPrivateIdentifier(propertyName) || ts.hasStaticModifier(property)) && !property.initializer) {
            return undefined;
        }

        const propertyOriginalNode = ts.getOriginalNode(property);
        if (ts.hasSyntacticModifier(propertyOriginalNode, ts.ModifierFlags.Abstract)) {
            return undefined;
        }

        const initializer = property.initializer || emitAssignment ? ts.visitNode(property.initializer, visitor, ts.isExpression) ?? factory.createVoidZero()
            : ts.isParameterPropertyDeclaration(propertyOriginalNode, propertyOriginalNode.parent) && ts.isIdentifier(propertyName) ? propertyName
            : factory.createVoidZero();

        if (emitAssignment || ts.isPrivateIdentifier(propertyName)) {
            const memberAccess = ts.createMemberAccessForPropertyName(factory, receiver, propertyName, /*location*/ propertyName);
            return factory.createAssignment(memberAccess, initializer);
        }
        else {
            const name = ts.isComputedPropertyName(propertyName) ? propertyName.expression
                : ts.isIdentifier(propertyName) ? factory.createStringLiteral(ts.unescapeLeadingUnderscores(propertyName.escapedText))
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
            context.enableSubstitution(ts.SyntaxKind.Identifier);

            // Keep track of class aliases.
            classAliases = [];
        }
    }

    function enableSubstitutionForClassStaticThisOrSuperReference() {
        if ((enabledSubstitutions & ClassPropertySubstitutionFlags.ClassStaticThisOrSuperReference) === 0) {
            enabledSubstitutions |= ClassPropertySubstitutionFlags.ClassStaticThisOrSuperReference;

            // substitute `this` in a static field initializer
            context.enableSubstitution(ts.SyntaxKind.ThisKeyword);

            // these push a new lexical environment that is not the class lexical environment
            context.enableEmitNotification(ts.SyntaxKind.FunctionDeclaration);
            context.enableEmitNotification(ts.SyntaxKind.FunctionExpression);
            context.enableEmitNotification(ts.SyntaxKind.Constructor);

            // these push a new lexical environment that is not the class lexical environment, except
            // when they have a computed property name
            context.enableEmitNotification(ts.SyntaxKind.GetAccessor);
            context.enableEmitNotification(ts.SyntaxKind.SetAccessor);
            context.enableEmitNotification(ts.SyntaxKind.MethodDeclaration);
            context.enableEmitNotification(ts.SyntaxKind.PropertyDeclaration);

            // class lexical environments are restored when entering a computed property name
            context.enableEmitNotification(ts.SyntaxKind.ComputedPropertyName);
        }
    }

    /**
     * Generates brand-check initializer for private methods.
     *
     * @param statements Statement list that should be used to append new statements.
     * @param methods An array of method declarations.
     * @param receiver The receiver on which each method should be assigned.
     */
    function addMethodStatements(statements: ts.Statement[], methods: readonly (ts.MethodDeclaration | ts.AccessorDeclaration | ts.AutoAccessorPropertyDeclaration)[], receiver: ts.LeftHandSideExpression) {
        if (!shouldTransformPrivateElementsOrClassStaticBlocks || !ts.some(methods)) {
            return;
        }

        const { weakSetName } = getPrivateIdentifierEnvironment();
        ts.Debug.assert(weakSetName, "weakSetName should be set in private identifier environment");
        statements.push(
            factory.createExpressionStatement(
                createPrivateInstanceMethodInitializer(receiver, weakSetName)
            )
        );
    }

    function visitInvalidSuperProperty(node: ts.SuperProperty) {
        return ts.isPropertyAccessExpression(node) ?
            factory.updatePropertyAccessExpression(
                node,
                factory.createVoidZero(),
                node.name) :
            factory.updateElementAccessExpression(
                node,
                factory.createVoidZero(),
                ts.visitNode(node.argumentExpression, visitor, ts.isExpression));
    }

    function onEmitNode(hint: ts.EmitHint, node: ts.Node, emitCallback: (hint: ts.EmitHint, node: ts.Node) => void) {
        const original = ts.getOriginalNode(node);
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
            case ts.SyntaxKind.FunctionExpression:
                if (ts.isArrowFunction(original) || ts.getEmitFlags(node) & ts.EmitFlags.AsyncFunctionBody) {
                    break;
                }

                // falls through
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.Constructor: {
                const savedClassLexicalEnvironment = currentClassLexicalEnvironment;
                const savedCurrentComputedPropertyNameClassLexicalEnvironment = currentComputedPropertyNameClassLexicalEnvironment;
                currentClassLexicalEnvironment = undefined;
                currentComputedPropertyNameClassLexicalEnvironment = undefined;
                previousOnEmitNode(hint, node, emitCallback);
                currentClassLexicalEnvironment = savedClassLexicalEnvironment;
                currentComputedPropertyNameClassLexicalEnvironment = savedCurrentComputedPropertyNameClassLexicalEnvironment;
                return;
            }

            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.PropertyDeclaration: {
                const savedClassLexicalEnvironment = currentClassLexicalEnvironment;
                const savedCurrentComputedPropertyNameClassLexicalEnvironment = currentComputedPropertyNameClassLexicalEnvironment;
                currentComputedPropertyNameClassLexicalEnvironment = currentClassLexicalEnvironment;
                currentClassLexicalEnvironment = undefined;
                previousOnEmitNode(hint, node, emitCallback);
                currentClassLexicalEnvironment = savedClassLexicalEnvironment;
                currentComputedPropertyNameClassLexicalEnvironment = savedCurrentComputedPropertyNameClassLexicalEnvironment;
                return;
            }
            case ts.SyntaxKind.ComputedPropertyName: {
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
    function onSubstituteNode(hint: ts.EmitHint, node: ts.Node) {
        node = previousOnSubstituteNode(hint, node);
        if (hint === ts.EmitHint.Expression) {
            return substituteExpression(node as ts.Expression);
        }
        return node;
    }

    function substituteExpression(node: ts.Expression) {
        switch (node.kind) {
            case ts.SyntaxKind.Identifier:
                return substituteExpressionIdentifier(node as ts.Identifier);
            case ts.SyntaxKind.ThisKeyword:
                return substituteThisExpression(node as ts.ThisExpression);
        }
        return node;
    }

    function substituteThisExpression(node: ts.ThisExpression) {
        if (enabledSubstitutions & ClassPropertySubstitutionFlags.ClassStaticThisOrSuperReference && currentClassLexicalEnvironment) {
            const { facts, classConstructor } = currentClassLexicalEnvironment;
            if (facts & ClassFacts.ClassWasDecorated) {
                return factory.createParenthesizedExpression(factory.createVoidZero());
            }
            if (classConstructor) {
                return ts.setTextRange(
                    ts.setOriginalNode(
                        factory.cloneNode(classConstructor),
                        node,
                    ),
                    node
                );
            }
        }
        return node;
    }

    function substituteExpressionIdentifier(node: ts.Identifier): ts.Expression {
        return trySubstituteClassAlias(node) || node;
    }

    function trySubstituteClassAlias(node: ts.Identifier): ts.Expression | undefined {
        if (enabledSubstitutions & ClassPropertySubstitutionFlags.ClassAliases) {
            if (resolver.getNodeCheckFlags(node) & ts.NodeCheckFlags.ConstructorReferenceInClass) {
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
                        ts.setSourceMapRange(clone, node);
                        ts.setCommentRange(clone, node);
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
    function getPropertyNameExpressionIfNeeded(name: ts.PropertyName, shouldHoist: boolean): ts.Expression | undefined {
        if (ts.isComputedPropertyName(name)) {
            const expression = ts.visitNode(name.expression, visitor, ts.isExpression);
            const innerExpression = ts.skipPartiallyEmittedExpressions(expression);
            const inlinable = ts.isSimpleInlineableExpression(innerExpression);
            const alreadyTransformed = ts.isAssignmentExpression(innerExpression) && ts.isGeneratedIdentifier(innerExpression.left);
            if (!alreadyTransformed && !inlinable && shouldHoist) {
                const generatedName = factory.getGeneratedNameForNode(name);
                if (resolver.getNodeCheckFlags(name) & ts.NodeCheckFlags.BlockScopedBindingInLoop) {
                    addBlockScopedVariable(generatedName);
                }
                else {
                    hoistVariableDeclaration(generatedName);
                }
                return factory.createAssignment(generatedName, expression);
            }
            return (inlinable || ts.isIdentifier(innerExpression)) ? undefined : expression;
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
            className: undefined,
            weakSetName: undefined,
            identifiers: undefined,
            generatedIdentifiers: undefined,
        };
        return lex.privateIdentifierEnvironment;
    }

    function getPendingExpressions() {
        return pendingExpressions ??= [];
    }

    function addPrivateIdentifierClassElementToEnvironment(
        node: ts.PropertyDeclaration | ts.MethodDeclaration | ts.GetAccessorDeclaration | ts.SetAccessorDeclaration,
        name: ts.PrivateIdentifier,
        lex: ClassLexicalEnvironment,
        privateEnv: PrivateIdentifierEnvironment,
        isStatic: boolean,
        isValid: boolean,
        previousInfo: PrivateIdentifierInfo | undefined
    ) {
        if (ts.isAutoAccessorPropertyDeclaration(node)) {
            addPrivateIdentifierAutoAccessorPropertyDeclarationToEnvironment(node, name, lex, privateEnv, isStatic, isValid, previousInfo);
        }
        else if (ts.isPropertyDeclaration(node)) {
            addPrivateIdentifierPropertyDeclarationToEnvironment(node, name, lex, privateEnv, isStatic, isValid, previousInfo);
        }
        else if (ts.isMethodDeclaration(node)) {
            addPrivateIdentifierMethodDeclarationToEnvironment(node, name, lex, privateEnv, isStatic, isValid, previousInfo);
        }
        else if (ts.isGetAccessorDeclaration(node)) {
            addPrivateIdentifierGetAccessorDeclarationToEnvironment(node, name, lex, privateEnv, isStatic, isValid, previousInfo);
        }
        else if (ts.isSetAccessorDeclaration(node)) {
            addPrivateIdentifierSetAccessorDeclarationToEnvironment(node, name, lex, privateEnv, isStatic, isValid, previousInfo);
        }
    }

    function addPrivateIdentifierPropertyDeclarationToEnvironment(
        _node: ts.PropertyDeclaration,
        name: ts.PrivateIdentifier,
        lex: ClassLexicalEnvironment,
        privateEnv: PrivateIdentifierEnvironment,
        isStatic: boolean,
        isValid: boolean,
        _previousInfo: PrivateIdentifierInfo | undefined
    ) {
        if (isStatic) {
            ts.Debug.assert(lex.classConstructor, "classConstructor should be set in private identifier environment");

            const variableName = createHoistedVariableForPrivateName(name);
            setPrivateIdentifier(privateEnv, name, {
                kind: PrivateIdentifierKind.Field,
                brandCheckIdentifier: lex.classConstructor,
                variableName,
                isStatic: true,
                isValid,
            });
        }
        else {
            const weakMapName = createHoistedVariableForPrivateName(name);

            setPrivateIdentifier(privateEnv, name, {
                kind: PrivateIdentifierKind.Field,
                brandCheckIdentifier: weakMapName,
                variableName: undefined,
                isStatic: false,
                isValid,
            });

            getPendingExpressions().push(factory.createAssignment(
                weakMapName,
                factory.createNewExpression(
                    factory.createIdentifier("WeakMap"),
                    /*typeArguments*/ undefined,
                    []
                )
            ));
        }
    }

    function addPrivateIdentifierMethodDeclarationToEnvironment(
        _node: ts.MethodDeclaration,
        name: ts.PrivateIdentifier,
        lex: ClassLexicalEnvironment,
        privateEnv: PrivateIdentifierEnvironment,
        isStatic: boolean,
        isValid: boolean,
        _previousInfo: PrivateIdentifierInfo | undefined
    ) {
        const methodName = createHoistedVariableForPrivateName(name);
        const brandCheckIdentifier = isStatic ?
            ts.Debug.checkDefined(lex.classConstructor, "classConstructor should be set in private identifier environment") :
            ts.Debug.checkDefined(privateEnv.weakSetName, "weakSetName should be set in private identifier environment");

        setPrivateIdentifier(privateEnv, name, {
            kind: PrivateIdentifierKind.Method,
            methodName,
            brandCheckIdentifier,
            isStatic,
            isValid,
        });
    }

    function addPrivateIdentifierGetAccessorDeclarationToEnvironment(
        _node: ts.GetAccessorDeclaration,
        name: ts.PrivateIdentifier,
        lex: ClassLexicalEnvironment,
        privateEnv: PrivateIdentifierEnvironment,
        isStatic: boolean,
        isValid: boolean,
        previousInfo: PrivateIdentifierInfo | undefined
    ) {
        const getterName = createHoistedVariableForPrivateName(name, "_get");
        const brandCheckIdentifier = isStatic ?
            ts.Debug.checkDefined(lex.classConstructor, "classConstructor should be set in private identifier environment") :
            ts.Debug.checkDefined(privateEnv.weakSetName, "weakSetName should be set in private identifier environment");

        if (previousInfo?.kind === PrivateIdentifierKind.Accessor && previousInfo.isStatic === isStatic && !previousInfo.getterName) {
            previousInfo.getterName = getterName;
        }
        else {
            setPrivateIdentifier(privateEnv, name, {
                kind: PrivateIdentifierKind.Accessor,
                getterName,
                setterName: undefined,
                brandCheckIdentifier,
                isStatic,
                isValid,
            });
        }
    }

    function addPrivateIdentifierSetAccessorDeclarationToEnvironment(
        _node: ts.SetAccessorDeclaration,
        name: ts.PrivateIdentifier,
        lex: ClassLexicalEnvironment,
        privateEnv: PrivateIdentifierEnvironment,
        isStatic: boolean,
        isValid: boolean,
        previousInfo: PrivateIdentifierInfo | undefined
    ) {
        const setterName = createHoistedVariableForPrivateName(name, "_set");
        const brandCheckIdentifier = isStatic ?
            ts.Debug.checkDefined(lex.classConstructor, "classConstructor should be set in private identifier environment") :
            ts.Debug.checkDefined(privateEnv.weakSetName, "weakSetName should be set in private identifier environment");

        if (previousInfo?.kind === PrivateIdentifierKind.Accessor && previousInfo.isStatic === isStatic && !previousInfo.setterName) {
            previousInfo.setterName = setterName;
        }
        else {
            setPrivateIdentifier(privateEnv, name, {
                kind: PrivateIdentifierKind.Accessor,
                getterName: undefined,
                setterName,
                brandCheckIdentifier,
                isStatic,
                isValid,
            });
        }
    }

    function addPrivateIdentifierAutoAccessorPropertyDeclarationToEnvironment(
        _node: ts.AutoAccessorPropertyDeclaration,
        name: ts.PrivateIdentifier,
        lex: ClassLexicalEnvironment,
        privateEnv: PrivateIdentifierEnvironment,
        isStatic: boolean,
        isValid: boolean,
        _previousInfo: PrivateIdentifierInfo | undefined
    ) {
        const getterName = createHoistedVariableForPrivateName(name, "_get");
        const setterName = createHoistedVariableForPrivateName(name, "_set");
        const brandCheckIdentifier = isStatic ?
            ts.Debug.checkDefined(lex.classConstructor, "classConstructor should be set in private identifier environment") :
            ts.Debug.checkDefined(privateEnv.weakSetName, "weakSetName should be set in private identifier environment");

        setPrivateIdentifier(privateEnv, name, {
            kind: PrivateIdentifierKind.Accessor,
            getterName,
            setterName,
            brandCheckIdentifier,
            isStatic,
            isValid,
        });
    }

    function addPrivateIdentifierToEnvironment<T extends ts.PropertyDeclaration | ts.MethodDeclaration | ts.GetAccessorDeclaration | ts.SetAccessorDeclaration>(
        node: T,
        name: ts.PrivateIdentifier,
        addDeclaration: (
            node: T,
            name: ts.PrivateIdentifier,
            lex: ClassLexicalEnvironment,
            privateEnv: PrivateIdentifierEnvironment,
            isStatic: boolean,
            isValid: boolean,
            previousInfo: PrivateIdentifierInfo | undefined
        ) => void
    ) {
        const lex = getClassLexicalEnvironment();
        const privateEnv = getPrivateIdentifierEnvironment();
        const previousInfo = getPrivateIdentifier(privateEnv, name);
        const isStatic = ts.hasStaticModifier(node);
        const isValid = !isReservedPrivateName(name) && previousInfo === undefined;
        addDeclaration(node, name, lex, privateEnv, isStatic, isValid, previousInfo);
    }

    function createHoistedVariableForClass(name: string | ts.PrivateIdentifier | undefined, node: ts.PrivateIdentifier | ts.ClassStaticBlockDeclaration, suffix?: string): ts.Identifier {
        const { className } = getPrivateIdentifierEnvironment();
        const prefix: ts.GeneratedNamePart | string = className ? { prefix: "_", node: className, suffix: "_" } : "_";
        const identifier =
            typeof name === "object" ? factory.getGeneratedNameForNode(name, ts.GeneratedIdentifierFlags.Optimistic | ts.GeneratedIdentifierFlags.ReservedInNestedScopes, prefix, suffix) :
            typeof name === "string" ? factory.createUniqueName(name, ts.GeneratedIdentifierFlags.Optimistic, prefix, suffix) :
            factory.createTempVariable(/*recordTempVariable*/ undefined, /*reserveInNestedScopes*/ true, prefix, suffix);

        if (resolver.getNodeCheckFlags(node) & ts.NodeCheckFlags.BlockScopedBindingInLoop) {
            addBlockScopedVariable(identifier);
        }
        else {
            hoistVariableDeclaration(identifier);
        }

        return identifier;
    }

    function createHoistedVariableForPrivateName(name: ts.PrivateIdentifier, suffix?: string): ts.Identifier {
        const text = ts.tryGetTextOfPropertyName(name) as string | undefined;
        return createHoistedVariableForClass(text?.substring(1) ?? name, name, suffix);
    }

    /**
     * Access an already defined {@link PrivateIdentifier} in the current {@link PrivateIdentifierEnvironment}.
     *
     * @seealso {@link addPrivateIdentifierToEnvironment}
     */
    function accessPrivateIdentifier(name: ts.PrivateIdentifier) {
        if (ts.isGeneratedPrivateIdentifier(name)) {
            return accessGeneratedPrivateIdentifier(name);
        }
        else {
            return accessPrivateIdentifierByText(name.escapedText);
        }
    }

    function accessPrivateIdentifierByText(text: ts.__String) {
        return accessPrivateIdentifierWorker(getPrivateIdentifierInfo, text);
    }

    function accessGeneratedPrivateIdentifier(name: ts.GeneratedPrivateIdentifier) {
        return accessPrivateIdentifierWorker(getGeneratedPrivateIdentifierInfo, ts.getNodeForGeneratedName(name));
    }

    function accessPrivateIdentifierWorker<K extends ts.__String | ts.Node>(
        getPrivateIdentifierInfo: (privateEnv: PrivateIdentifierEnvironment, key: K) => PrivateIdentifierInfo | undefined,
        privateIdentifierKey: K
    ) {
        if (currentClassLexicalEnvironment?.privateIdentifierEnvironment) {
            const info = getPrivateIdentifierInfo(currentClassLexicalEnvironment.privateIdentifierEnvironment, privateIdentifierKey);
            if (info) {
                return info;
            }
        }
        for (let i = classLexicalEnvironmentStack.length - 1; i >= 0; --i) {
            const env = classLexicalEnvironmentStack[i];
            if (!env) {
                continue;
            }
            if (env.privateIdentifierEnvironment) {
                const info = getPrivateIdentifierInfo(env.privateIdentifierEnvironment, privateIdentifierKey);
                if (info) {
                    return info;
                }
            }
        }
        return undefined;
    }

    function wrapPrivateIdentifierForDestructuringTarget(node: ts.PrivateIdentifierPropertyAccessExpression) {
        const parameter = factory.getGeneratedNameForNode(node);
        const info = accessPrivateIdentifier(node.name);
        if (!info) {
            return ts.visitEachChild(node, visitor, context);
        }
        let receiver = node.expression;
        // We cannot copy `this` or `super` into the function because they will be bound
        // differently inside the function.
        if (ts.isThisProperty(node) || ts.isSuperProperty(node) || !ts.isSimpleCopiableExpression(node.expression)) {
            receiver = factory.createTempVariable(hoistVariableDeclaration, /*reservedInNestedScopes*/ true);
            getPendingExpressions().push(factory.createBinaryExpression(receiver, ts.SyntaxKind.EqualsToken, ts.visitNode(node.expression, visitor, ts.isExpression)));
        }
        return factory.createAssignmentTargetWrapper(
            parameter,
            createPrivateIdentifierAssignment(
                info,
                receiver,
                parameter,
                ts.SyntaxKind.EqualsToken
            )
        );
    }

    function visitArrayAssignmentTarget(node: ts.BindingOrAssignmentElement) {
        const target = ts.getTargetOfBindingOrAssignmentElement(node);
        if (target) {
            let wrapped: ts.LeftHandSideExpression | undefined;
            if (ts.isPrivateIdentifierPropertyAccessExpression(target)) {
                wrapped = wrapPrivateIdentifierForDestructuringTarget(target);
            }
            else if (shouldTransformSuperInStaticInitializers &&
                ts.isSuperProperty(target) &&
                currentStaticPropertyDeclarationOrStaticBlock &&
                currentClassLexicalEnvironment) {
                const { classConstructor, superClassReference, facts } = currentClassLexicalEnvironment;
                if (facts & ClassFacts.ClassWasDecorated) {
                    wrapped = visitInvalidSuperProperty(target);
                }
                else if (classConstructor && superClassReference) {
                    const name =
                        ts.isElementAccessExpression(target) ? ts.visitNode(target.argumentExpression, visitor, ts.isExpression) :
                        ts.isIdentifier(target.name) ? factory.createStringLiteralFromNode(target.name) :
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
                if (ts.isAssignmentExpression(node)) {
                    return factory.updateBinaryExpression(
                        node,
                        wrapped,
                        node.operatorToken,
                        ts.visitNode(node.right, visitor, ts.isExpression)
                    );
                }
                else if (ts.isSpreadElement(node)) {
                    return factory.updateSpreadElement(node, wrapped);
                }
                else {
                    return wrapped;
                }
            }
        }
        return ts.visitNode(node, assignmentTargetVisitor);
    }

    function visitObjectAssignmentTarget(node: ts.ObjectLiteralElementLike) {
        if (ts.isObjectBindingOrAssignmentElement(node) && !ts.isShorthandPropertyAssignment(node)) {
            const target = ts.getTargetOfBindingOrAssignmentElement(node);
            let wrapped: ts.LeftHandSideExpression | undefined;
            if (target) {
                if (ts.isPrivateIdentifierPropertyAccessExpression(target)) {
                    wrapped = wrapPrivateIdentifierForDestructuringTarget(target);
                }
                else if (shouldTransformSuperInStaticInitializers &&
                    ts.isSuperProperty(target) &&
                    currentStaticPropertyDeclarationOrStaticBlock &&
                    currentClassLexicalEnvironment) {
                    const { classConstructor, superClassReference, facts } = currentClassLexicalEnvironment;
                    if (facts & ClassFacts.ClassWasDecorated) {
                        wrapped = visitInvalidSuperProperty(target);
                    }
                    else if (classConstructor && superClassReference) {
                        const name =
                            ts.isElementAccessExpression(target) ? ts.visitNode(target.argumentExpression, visitor, ts.isExpression) :
                            ts.isIdentifier(target.name) ? factory.createStringLiteralFromNode(target.name) :
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
            if (ts.isPropertyAssignment(node)) {
                const initializer = ts.getInitializerOfBindingOrAssignmentElement(node);
                return factory.updatePropertyAssignment(
                    node,
                    ts.visitNode(node.name, visitor, ts.isPropertyName),
                    wrapped ?
                        initializer ? factory.createAssignment(wrapped, ts.visitNode(initializer, visitor)) : wrapped :
                        ts.visitNode(node.initializer, assignmentTargetVisitor, ts.isExpression)
                );
            }
            if (ts.isSpreadAssignment(node)) {
                return factory.updateSpreadAssignment(
                    node,
                    wrapped || ts.visitNode(node.expression, assignmentTargetVisitor, ts.isExpression)
                );
            }
            ts.Debug.assert(wrapped === undefined, "Should not have generated a wrapped target");
        }
        return ts.visitNode(node, visitor);
    }

    function visitAssignmentPattern(node: ts.AssignmentPattern) {
        if (ts.isArrayLiteralExpression(node)) {
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
                ts.visitNodes(node.elements, visitArrayAssignmentTarget, ts.isExpression)
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
                ts.visitNodes(node.properties, visitObjectAssignmentTarget, ts.isObjectLiteralElementLike)
            );
        }
    }
}

function createPrivateStaticFieldInitializer(variableName: ts.Identifier, initializer: ts.Expression | undefined) {
    return ts.factory.createAssignment(
        variableName,
        ts.factory.createObjectLiteralExpression([
            ts.factory.createPropertyAssignment("value", initializer || ts.factory.createVoidZero())
        ])
    );
}

function createPrivateInstanceFieldInitializer(receiver: ts.LeftHandSideExpression, initializer: ts.Expression | undefined, weakMapName: ts.Identifier) {
    return ts.factory.createCallExpression(
        ts.factory.createPropertyAccessExpression(weakMapName, "set"),
        /*typeArguments*/ undefined,
        [receiver, initializer || ts.factory.createVoidZero()]
    );
}

function createPrivateInstanceMethodInitializer(receiver: ts.LeftHandSideExpression, weakSetName: ts.Identifier) {
    return ts.factory.createCallExpression(
        ts.factory.createPropertyAccessExpression(weakSetName, "add"),
        /*typeArguments*/ undefined,
        [receiver]
    );
}

function isReservedPrivateName(node: ts.PrivateIdentifier) {
    return !ts.isGeneratedPrivateIdentifier(node) && node.escapedText === "#constructor";
}

function getPrivateIdentifier(privateEnv: PrivateIdentifierEnvironment, name: ts.PrivateIdentifier) {
    return ts.isGeneratedPrivateIdentifier(name) ?
        getGeneratedPrivateIdentifierInfo(privateEnv, ts.getNodeForGeneratedName(name)) :
        getPrivateIdentifierInfo(privateEnv, name.escapedText);
}

function setPrivateIdentifier(privateEnv: PrivateIdentifierEnvironment, name: ts.PrivateIdentifier, info: PrivateIdentifierInfo) {
    if (ts.isGeneratedPrivateIdentifier(name)) {
        privateEnv.generatedIdentifiers ??= new ts.Map();
        privateEnv.generatedIdentifiers.set(ts.getNodeForGeneratedName(name), info);
    }
    else {
        privateEnv.identifiers ??= new ts.Map();
        privateEnv.identifiers.set(name.escapedText, info);
    }
}

function getPrivateIdentifierInfo(privateEnv: PrivateIdentifierEnvironment, key: ts.__String) {
    return privateEnv.identifiers?.get(key);
}

function getGeneratedPrivateIdentifierInfo(privateEnv: PrivateIdentifierEnvironment, key: ts.Node) {
    return privateEnv.generatedIdentifiers?.get(key);
}
