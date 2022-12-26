import {
    __String,
    AccessorDeclaration,
    addEmitFlags,
    addEmitHelpers,
    addRange,
    append,
    AssignmentOperator,
    AssignmentPattern,
    AutoAccessorPropertyDeclaration,
    BinaryExpression,
    BindingOrAssignmentElement,
    Bundle,
    CallExpression,
    chainBundle,
    ClassDeclaration,
    ClassElement,
    ClassExpression,
    ClassLikeDeclaration,
    classOrConstructorParameterIsDecorated,
    ClassStaticBlockDeclaration,
    compact,
    ComputedPropertyName,
    ConstructorDeclaration,
    createAccessorPropertyBackingField,
    createAccessorPropertyGetRedirector,
    createAccessorPropertySetRedirector,
    createMemberAccessForPropertyName,
    Debug,
    ElementAccessExpression,
    EmitFlags,
    EmitHint,
    expandPreOrPostfixIncrementOrDecrementExpression,
    Expression,
    ExpressionStatement,
    ExpressionWithTypeArguments,
    factory,
    filter,
    findSuperStatementIndex,
    ForStatement,
    GeneratedIdentifier,
    GeneratedIdentifierFlags,
    GeneratedNamePart,
    GeneratedPrivateIdentifier,
    GetAccessorDeclaration,
    getCommentRange,
    getEffectiveBaseTypeNode,
    getEmitFlags,
    getEmitScriptTarget,
    getInitializerOfBindingOrAssignmentElement,
    getNameOfDeclaration,
    getNodeForGeneratedName,
    getNonAssignmentOperatorForCompoundAssignment,
    getOriginalNode,
    getOriginalNodeId,
    getProperties,
    getSourceMapRange,
    getStaticPropertiesAndClassStaticBlock,
    getTargetOfBindingOrAssignmentElement,
    getUseDefineForClassFields,
    hasAbstractModifier,
    hasAccessorModifier,
    hasDecorators,
    hasStaticModifier,
    hasSyntacticModifier,
    Identifier,
    InKeyword,
    isAccessorModifier,
    isArrayLiteralExpression,
    isArrowFunction,
    isAssignmentExpression,
    isAutoAccessorPropertyDeclaration,
    isCallChain,
    isClassDeclaration,
    isClassElement,
    isClassStaticBlockDeclaration,
    isCompoundAssignment,
    isComputedPropertyName,
    isConstructorDeclaration,
    isDestructuringAssignment,
    isElementAccessExpression,
    isExpression,
    isForInitializer,
    isGeneratedIdentifier,
    isGeneratedPrivateIdentifier,
    isGetAccessor,
    isGetAccessorDeclaration,
    isHeritageClause,
    isIdentifier,
    isInitializedProperty,
    isMethodDeclaration,
    isModifier,
    isModifierLike,
    isNonStaticMethodOrAccessorWithPrivateName,
    isObjectBindingOrAssignmentElement,
    isObjectLiteralElementLike,
    isParameterPropertyDeclaration,
    isParenthesizedExpression,
    isPrefixUnaryExpression,
    isPrivateIdentifier,
    isPrivateIdentifierClassElementDeclaration,
    isPrivateIdentifierPropertyAccessExpression,
    isPropertyAccessExpression,
    isPropertyAssignment,
    isPropertyDeclaration,
    isPropertyName,
    isSetAccessor,
    isSetAccessorDeclaration,
    isShorthandPropertyAssignment,
    isSimpleCopiableExpression,
    isSimpleInlineableExpression,
    isSpreadAssignment,
    isSpreadElement,
    isStatement,
    isStatic,
    isStaticModifier,
    isSuperProperty,
    isTemplateLiteral,
    isThisProperty,
    LeftHandSideExpression,
    map,
    MethodDeclaration,
    Modifier,
    ModifierFlags,
    moveRangePastModifiers,
    moveRangePos,
    Node,
    NodeCheckFlags,
    nodeIsSynthesized,
    ObjectLiteralElementLike,
    PostfixUnaryExpression,
    PrefixUnaryExpression,
    PrivateIdentifier,
    PrivateIdentifierPropertyAccessExpression,
    PrivateIdentifierPropertyDeclaration,
    PropertyAccessExpression,
    PropertyDeclaration,
    PropertyName,
    ScriptTarget,
    SetAccessorDeclaration,
    setCommentRange,
    setEmitFlags,
    setOriginalNode,
    setSourceMapRange,
    setSyntheticLeadingComments,
    setSyntheticTrailingComments,
    setTextRange,
    skipOuterExpressions,
    skipParentheses,
    skipPartiallyEmittedExpressions,
    some,
    SourceFile,
    startOnNewLine,
    Statement,
    SuperProperty,
    SyntaxKind,
    TaggedTemplateExpression,
    ThisExpression,
    TransformationContext,
    TransformFlags,
    tryGetTextOfPropertyName,
    UnderscoreEscapedMap,
    unescapeLeadingUnderscores,
    VariableStatement,
    visitArray,
    visitEachChild,
    visitFunctionBody,
    visitIterationBody,
    visitNode,
    visitNodes,
    visitParameterList,
    VisitResult,
} from "../_namespaces/ts";

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
     * Contains the variable that will serve as the storage for the field.
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
    className?: Identifier;
    /**
     * Used for brand check on private methods.
     */
    weakSetName?: Identifier;
    /**
     * A mapping of private names to information needed for transformation.
     */
    identifiers?: UnderscoreEscapedMap<PrivateIdentifierInfo>;
    /**
     * A mapping of generated private names to information needed for transformation.
     */
    generatedIdentifiers?: Map<Node, PrivateIdentifierInfo>;
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
 *
 * @internal
 */
export function transformClassFields(context: TransformationContext): (x: SourceFile | Bundle) => SourceFile | Bundle {
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

    // Always transform field initializers using Set semantics when `useDefineForClassFields: false`.
    const shouldTransformInitializersUsingSet = !useDefineForClassFields;

    // Transform field initializers using Define semantics when `useDefineForClassFields: true` and target < ES2022.
    const shouldTransformInitializersUsingDefine = useDefineForClassFields && languageVersion < ScriptTarget.ES2022;
    const shouldTransformInitializers = shouldTransformInitializersUsingSet || shouldTransformInitializersUsingDefine;

    // We need to transform private members and class static blocks when target < ES2022.
    const shouldTransformPrivateElementsOrClassStaticBlocks = languageVersion < ScriptTarget.ES2022;

    // We need to transform `accessor` fields when target < ESNext
    const shouldTransformAutoAccessors = languageVersion < ScriptTarget.ESNext;

    // We need to transform `this` in a static initializer into a reference to the class
    // when target < ES2022 since the assignment will be moved outside of the class body.
    const shouldTransformThisInStaticInitializers = languageVersion < ScriptTarget.ES2022;

    // We don't need to transform `super` property access when target <= ES5 because
    // the es2015 transformation handles those.
    const shouldTransformSuperInStaticInitializers = shouldTransformThisInStaticInitializers && languageVersion >= ScriptTarget.ES2015;

    const shouldTransformAnything =
        shouldTransformInitializers ||
        shouldTransformPrivateElementsOrClassStaticBlocks ||
        shouldTransformAutoAccessors;

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
    let currentClassContainer: ClassLikeDeclaration | undefined;
    let currentComputedPropertyNameClassLexicalEnvironment: ClassLexicalEnvironment | undefined;
    let currentStaticPropertyDeclarationOrStaticBlock: PropertyDeclaration | ClassStaticBlockDeclaration | undefined;

    return chainBundle(context, transformSourceFile);

    function transformSourceFile(node: SourceFile) {
        if (node.isDeclarationFile || !shouldTransformAnything) {
            return node;
        }

        const visited = visitEachChild(node, visitor, context);
        addEmitHelpers(visited, context.readEmitHelpers());
        return visited;
    }

    function visitor(node: Node): VisitResult<Node> {
        if (!(node.transformFlags & TransformFlags.ContainsClassFields) &&
            !(node.transformFlags & TransformFlags.ContainsLexicalThisOrSuper)) {
            return node;
        }

        switch (node.kind) {
            case SyntaxKind.AccessorKeyword:
                return shouldTransformAutoAccessors ? undefined : node;
            case SyntaxKind.ClassDeclaration:
                return visitClassDeclaration(node as ClassDeclaration);
            case SyntaxKind.ClassExpression:
                return visitClassExpression(node as ClassExpression);
            case SyntaxKind.ClassStaticBlockDeclaration:
                return visitClassStaticBlockDeclaration(node as ClassStaticBlockDeclaration);
            case SyntaxKind.PropertyDeclaration:
                return visitPropertyDeclaration(node as PropertyDeclaration);
            case SyntaxKind.VariableStatement:
                return visitVariableStatement(node as VariableStatement);
            case SyntaxKind.PrivateIdentifier:
                return visitPrivateIdentifier(node as PrivateIdentifier);
            case SyntaxKind.PropertyAccessExpression:
                return visitPropertyAccessExpression(node as PropertyAccessExpression);
            case SyntaxKind.ElementAccessExpression:
                return visitElementAccessExpression(node as ElementAccessExpression);
            case SyntaxKind.PrefixUnaryExpression:
            case SyntaxKind.PostfixUnaryExpression:
                return visitPreOrPostfixUnaryExpression(node as PrefixUnaryExpression | PostfixUnaryExpression, /*valueIsDiscarded*/ false);
            case SyntaxKind.BinaryExpression:
                return visitBinaryExpression(node as BinaryExpression, /*valueIsDiscarded*/ false);
            case SyntaxKind.CallExpression:
                return visitCallExpression(node as CallExpression);
            case SyntaxKind.ExpressionStatement:
                return visitExpressionStatement(node as ExpressionStatement);
            case SyntaxKind.TaggedTemplateExpression:
                return visitTaggedTemplateExpression(node as TaggedTemplateExpression);
            case SyntaxKind.ForStatement:
                return visitForStatement(node as ForStatement);
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.Constructor:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor: {
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

    function fallbackVisitor(node: Node) {
        return visitEachChild(node, visitor, context);
    }

    /**
     * Visits a node in an expression whose result is discarded.
     */
    function discardedValueVisitor(node: Node): VisitResult<Node> {
        switch (node.kind) {
            case SyntaxKind.PrefixUnaryExpression:
            case SyntaxKind.PostfixUnaryExpression:
                return visitPreOrPostfixUnaryExpression(node as PrefixUnaryExpression | PostfixUnaryExpression, /*valueIsDiscarded*/ true);
            case SyntaxKind.BinaryExpression:
                return visitBinaryExpression(node as BinaryExpression, /*valueIsDiscarded*/ true);
            default:
                return visitor(node);
        }
    }

    /**
     * Visits a node in a {@link HeritageClause}.
     */
    function heritageClauseVisitor(node: Node): VisitResult<Node> {
        switch (node.kind) {
            case SyntaxKind.HeritageClause:
                return visitEachChild(node, heritageClauseVisitor, context);
            case SyntaxKind.ExpressionWithTypeArguments:
                return visitExpressionWithTypeArgumentsInHeritageClause(node as ExpressionWithTypeArguments);
            default:
                return visitor(node);
        }
    }

    /**
     * Visits the assignment target of a destructuring assignment.
     */
    function assignmentTargetVisitor(node: Node): VisitResult<Node> {
        switch (node.kind) {
            case SyntaxKind.ObjectLiteralExpression:
            case SyntaxKind.ArrayLiteralExpression:
                return visitAssignmentPattern(node as AssignmentPattern);
            default:
                return visitor(node);
        }
    }

    /**
     * Visits a member of a class.
     */
    function classElementVisitor(node: Node): VisitResult<Node> {
        switch (node.kind) {
            case SyntaxKind.Constructor:
                return visitConstructorDeclaration(node as ConstructorDeclaration);
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.MethodDeclaration:
                return setCurrentStaticPropertyDeclarationOrStaticBlockAnd(
                    /*current*/ undefined,
                    visitMethodOrAccessorDeclaration,
                    node as MethodDeclaration | AccessorDeclaration);
            case SyntaxKind.PropertyDeclaration:
                return setCurrentStaticPropertyDeclarationOrStaticBlockAnd(
                    /*current*/ undefined,
                    visitPropertyDeclaration,
                    node as PropertyDeclaration);
            case SyntaxKind.ComputedPropertyName:
                return visitComputedPropertyName(node as ComputedPropertyName);
            case SyntaxKind.SemicolonClassElement:
                return node;
            default:
                return visitor(node);
        }
    }

    /**
     * Visits the results of an auto-accessor field transformation in a second pass.
     */
    function accessorFieldResultVisitor(node: Node) {
        switch (node.kind) {
            case SyntaxKind.PropertyDeclaration:
                return transformFieldInitializer(node as PropertyDeclaration);
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
                return classElementVisitor(node);
            default:
                Debug.assertMissingNode(node, "Expected node to either be a PropertyDeclaration, GetAccessorDeclaration, or SetAccessorDeclaration");
                break;
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

    type PrivateIdentifierInExpression = BinaryExpression & { readonly left: PrivateIdentifier, readonly token: InKeyword };

    function isPrivateIdentifierInExpression(node: BinaryExpression): node is PrivateIdentifierInExpression {
        return isPrivateIdentifier(node.left)
            && node.operatorToken.kind === SyntaxKind.InKeyword;
    }

    /**
     * Visits `#id in expr`
     */
    function transformPrivateIdentifierInInExpression(node: PrivateIdentifierInExpression) {
        const info = accessPrivateIdentifier(node.left);
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

    function visitComputedPropertyName(node: ComputedPropertyName) {
        let expression = visitNode(node.expression, visitor, isExpression);
        if (some(pendingExpressions)) {
            if (isParenthesizedExpression(expression)) {
                expression = factory.updateParenthesizedExpression(expression, factory.inlineExpressions([...pendingExpressions, expression.expression]));
            }
            else {
                expression = factory.inlineExpressions([...pendingExpressions, expression]);
            }
            pendingExpressions = undefined;
        }
        return factory.updateComputedPropertyName(node, expression);
    }

    function visitConstructorDeclaration(node: ConstructorDeclaration) {
        if (currentClassContainer) {
            return transformConstructor(node, currentClassContainer);
        }
        return fallbackVisitor(node);
    }

    function visitMethodOrAccessorDeclaration(node: MethodDeclaration | AccessorDeclaration) {
        Debug.assert(!hasDecorators(node));

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
                        filter(node.modifiers, (m): m is Modifier => isModifier(m) && !isStaticModifier(m) && !isAccessorModifier(m)),
                        node.asteriskToken,
                        functionName,
                        /* typeParameters */ undefined,
                        visitParameterList(node.parameters, visitor, context),
                        /* type */ undefined,
                        visitFunctionBody(node.body!, visitor, context)
                    )
                )
            );
        }

        // remove method declaration from class
        return undefined;
    }

    function setCurrentStaticPropertyDeclarationOrStaticBlockAnd<T, U>(
        current: ClassStaticBlockDeclaration | PropertyDeclaration | undefined,
        visitor: (arg: T) => U,
        arg: T,
    ) {
        const savedCurrentStaticPropertyDeclarationOrStaticBlock = currentStaticPropertyDeclarationOrStaticBlock;
        currentStaticPropertyDeclarationOrStaticBlock = current;
        const result = visitor(arg);
        currentStaticPropertyDeclarationOrStaticBlock = savedCurrentStaticPropertyDeclarationOrStaticBlock;
        return result;
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

    function transformAutoAccessor(node: AutoAccessorPropertyDeclaration): VisitResult<Node> {
        // transforms:
        //      accessor x = 1;
        // into:
        //      #x = 1;
        //      get x() { return this.#x; }
        //      set x(value) { this.#x = value; }

        Debug.assertEachNode(node.modifiers, isModifier);

        const commentRange = getCommentRange(node);
        const sourceMapRange = getSourceMapRange(node);

        // Since we're creating two declarations where there was previously one, cache
        // the expression for any computed property names.
        const name = node.name;
        let getterName = name;
        let setterName = name;
        if (isComputedPropertyName(name) && !isSimpleInlineableExpression(name.expression)) {
            const temp = factory.createTempVariable(hoistVariableDeclaration);
            setSourceMapRange(temp, name.expression);
            const expression = visitNode(name.expression, visitor, isExpression);
            const assignment = factory.createAssignment(temp, expression);
            setSourceMapRange(assignment, name.expression);
            getterName = factory.updateComputedPropertyName(name, factory.inlineExpressions([assignment, temp]));
            setterName = factory.updateComputedPropertyName(name, temp);
        }

        const backingField = createAccessorPropertyBackingField(factory, node, node.modifiers, node.initializer);
        setOriginalNode(backingField, node);
        setEmitFlags(backingField, EmitFlags.NoComments);
        setSourceMapRange(backingField, sourceMapRange);

        const getter = createAccessorPropertyGetRedirector(factory, node, node.modifiers, getterName);
        setOriginalNode(getter, node);
        setCommentRange(getter, commentRange);
        setSourceMapRange(getter, sourceMapRange);

        const setter = createAccessorPropertySetRedirector(factory, node, node.modifiers, setterName);
        setOriginalNode(setter, node);
        setEmitFlags(setter, EmitFlags.NoComments);
        setSourceMapRange(setter, sourceMapRange);

        return visitArray([backingField, getter, setter], accessorFieldResultVisitor, isClassElement);
    }

    function transformPrivateFieldInitializer(node: PrivateIdentifierPropertyDeclaration) {
        if (shouldTransformPrivateElementsOrClassStaticBlocks) {
            // If we are transforming private elements into WeakMap/WeakSet, we should elide the node.
            const info = accessPrivateIdentifier(node.name);
            Debug.assert(info, "Undeclared private name for property declaration.");

            // Leave invalid code untransformed; otherwise, elide the node as it is transformed elsewhere.
            return info.isValid ? undefined : node;
        }

        if (shouldTransformInitializersUsingSet && !isStatic(node)) {
            // If we are transforming initializers using Set semantics we will elide the initializer as it will
            // be moved to the constructor to preserve evaluation order next to public instance fields. We don't
            // need to do this transformation for private static fields since public static fields can be
            // transformed into `static {}` blocks.
            return factory.updatePropertyDeclaration(
                node,
                visitNodes(node.modifiers, visitor, isModifierLike),
                node.name,
                /*questionOrExclamationToken*/ undefined,
                /*type*/ undefined,
                /*initializer*/ undefined
            );
        }

        return visitEachChild(node, visitor, context);
    }

    function transformPublicFieldInitializer(node: PropertyDeclaration) {
        if (shouldTransformInitializers) {
            // Create a temporary variable to store a computed property name (if necessary).
            // If it's not inlineable, then we emit an expression after the class which assigns
            // the property name to the temporary variable.

            const expr = getPropertyNameExpressionIfNeeded(node.name, /*shouldHoist*/ !!node.initializer || useDefineForClassFields);
            if (expr) {
                getPendingExpressions().push(expr);
            }

            if (isStatic(node) && !shouldTransformPrivateElementsOrClassStaticBlocks) {
                const initializerStatement = transformPropertyOrClassStaticBlock(node, factory.createThis());
                if (initializerStatement) {
                    const staticBlock = factory.createClassStaticBlockDeclaration(
                        factory.createBlock([initializerStatement])
                    );

                    setOriginalNode(staticBlock, node);
                    setCommentRange(staticBlock, node);

                    // Set the comment range for the statement to an empty synthetic range
                    // and drop synthetic comments from the statement to avoid printing them twice.
                    setCommentRange(initializerStatement, { pos: -1, end: -1 });
                    setSyntheticLeadingComments(initializerStatement, undefined);
                    setSyntheticTrailingComments(initializerStatement, undefined);
                    return staticBlock;
                }
            }

            return undefined;
        }

        return visitEachChild(node, classElementVisitor, context);
    }

    function transformFieldInitializer(node: PropertyDeclaration) {
        Debug.assert(!hasDecorators(node), "Decorators should already have been transformed and elided.");
        return isPrivateIdentifierClassElementDeclaration(node) ?
            transformPrivateFieldInitializer(node) :
            transformPublicFieldInitializer(node);
    }

    function visitPropertyDeclaration(node: PropertyDeclaration) {
        // If this is an auto-accessor, we defer to `transformAutoAccessor`. That function
        // will in turn call `transformFieldInitializer` as needed.
        if (shouldTransformAutoAccessors && isAutoAccessorPropertyDeclaration(node)) {
            return transformAutoAccessor(node);
        }

        return transformFieldInitializer(node);
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
        if (node.operator === SyntaxKind.PlusPlusToken ||
            node.operator === SyntaxKind.MinusMinusToken) {
            const operand = skipParentheses(node.operand);
            if (shouldTransformPrivateElementsOrClassStaticBlocks &&
                isPrivateIdentifierPropertyAccessExpression(operand)) {
                let info: PrivateIdentifierInfo | undefined;
                if (info = accessPrivateIdentifier(operand.name)) {
                    const receiver = visitNode(operand.expression, visitor, isExpression);
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
                isSuperProperty(operand) &&
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
                    return isPrefixUnaryExpression(node) ?
                        factory.updatePrefixUnaryExpression(node, expression) :
                        factory.updatePostfixUnaryExpression(node, expression);
                }
                if (classConstructor && superClassReference) {
                    let setterName: Expression | undefined;
                    let getterName: Expression | undefined;
                    if (isPropertyAccessExpression(operand)) {
                        if (isIdentifier(operand.name)) {
                            getterName = setterName = factory.createStringLiteralFromNode(operand.name);
                        }
                    }
                    else {
                        if (isSimpleInlineableExpression(operand.argumentExpression)) {
                            getterName = setterName = operand.argumentExpression;
                        }
                        else {
                            getterName = factory.createTempVariable(hoistVariableDeclaration);
                            setterName = factory.createAssignment(getterName, visitNode(operand.argumentExpression, visitor, isExpression));
                        }
                    }
                    if (setterName && getterName) {
                        let expression: Expression = factory.createReflectGetCall(superClassReference, getterName, classConstructor);
                        setTextRange(expression, operand);

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
        if (shouldTransformPrivateElementsOrClassStaticBlocks &&
            isPrivateIdentifierPropertyAccessExpression(node.expression)) {
            // obj.#x()

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
            // super.x()
            // super[x]()

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
        if (shouldTransformPrivateElementsOrClassStaticBlocks &&
            isPrivateIdentifierPropertyAccessExpression(node.tag)) {
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
            let statements = setCurrentStaticPropertyDeclarationOrStaticBlockAnd(
                node,
                statements => visitNodes(statements, visitor, isStatement),
                node.body.statements
            );
            statements = factory.mergeLexicalEnvironment(statements, endLexicalEnvironment());

            const iife = factory.createImmediatelyInvokedArrowFunction(statements);
            setOriginalNode(iife, node);
            setTextRange(iife, node);
            addEmitFlags(iife, EmitFlags.AdviseOnEmitNode);
            return iife;
        }
    }

    function visitBinaryExpression(node: BinaryExpression, valueIsDiscarded: boolean) {
        if (isDestructuringAssignment(node)) {
            // ({ x: obj.#x } = ...)
            // ({ x: super.x } = ...)
            // ({ x: super[x] } = ...)
            const savedPendingExpressions = pendingExpressions;
            pendingExpressions = undefined;
            node = factory.updateBinaryExpression(
                node,
                visitNode(node.left, assignmentTargetVisitor),
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
            if (shouldTransformPrivateElementsOrClassStaticBlocks &&
                isPrivateIdentifierPropertyAccessExpression(node.left)) {
                // obj.#x = ...
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
        if (shouldTransformPrivateElementsOrClassStaticBlocks &&
            isPrivateIdentifierInExpression(node)) {
            // #x in obj
            return transformPrivateIdentifierInInExpression(node);
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
            if (member.name && (isPrivateIdentifier(member.name) || isAutoAccessorPropertyDeclaration(member)) && shouldTransformPrivateElementsOrClassStaticBlocks) {
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

    function visitExpressionWithTypeArgumentsInHeritageClause(node: ExpressionWithTypeArguments) {
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

    function visitInNewClassLexicalEnvironment<T extends ClassLikeDeclaration, U>(node: T, visitor: (node: T, facts: ClassFacts) => U) {
        const savedCurrentClassContainer = currentClassContainer;
        const savedPendingExpressions = pendingExpressions;
        currentClassContainer = node;
        pendingExpressions = undefined;
        startClassLexicalEnvironment();

        if (shouldTransformPrivateElementsOrClassStaticBlocks) {
            const name = getNameOfDeclaration(node);
            if (name && isIdentifier(name)) {
                getPrivateIdentifierEnvironment().className = name;
            }

            const privateInstanceMethodsAndAccessors = getPrivateInstanceMethodsAndAccessors(node);
            if (some(privateInstanceMethodsAndAccessors)) {
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

    function visitClassDeclaration(node: ClassDeclaration) {
        return visitInNewClassLexicalEnvironment(node, visitClassDeclarationInNewClassLexicalEnvironment);
    }

    function visitClassDeclarationInNewClassLexicalEnvironment(node: ClassDeclaration, facts: ClassFacts) {
        // If a class has private static fields, or a static field has a `this` or `super` reference,
        // then we need to allocate a temp variable to hold on to that reference.
        let pendingClassReferenceAssignment: BinaryExpression | undefined;
        if (facts & ClassFacts.NeedsClassConstructorReference) {
            const temp = factory.createTempVariable(hoistVariableDeclaration, /*reservedInNestedScopes*/ true);
            getClassLexicalEnvironment().classConstructor = factory.cloneNode(temp);
            pendingClassReferenceAssignment = factory.createAssignment(temp, factory.getInternalName(node));
        }

        const modifiers = visitNodes(node.modifiers, visitor, isModifierLike);
        const heritageClauses = visitNodes(node.heritageClauses, heritageClauseVisitor, isHeritageClause);
        const { members, prologue } = transformClassMembers(node);
        const classDecl = factory.updateClassDeclaration(
            node,
            modifiers,
            node.name,
            /*typeParameters*/ undefined,
            heritageClauses,
            members
        );

        const statements: Statement[] = [];
        if (prologue) {
            statements.push(factory.createExpressionStatement(prologue));
        }

        statements.push(classDecl);

        if (pendingClassReferenceAssignment) {
            getPendingExpressions().unshift(pendingClassReferenceAssignment);
        }

        // Write any pending expressions from elided or moved computed property names
        if (some(pendingExpressions)) {
            statements.push(factory.createExpressionStatement(factory.inlineExpressions(pendingExpressions)));
        }

        if (shouldTransformInitializersUsingSet || shouldTransformPrivateElementsOrClassStaticBlocks) {
            // Emit static property assignment. Because classDeclaration is lexically evaluated,
            // it is safe to emit static property assignment after classDeclaration
            // From ES6 specification:
            //      HasLexicalDeclaration (N) : Determines if the argument identifier has a binding in this environment record that was created using
            //                                  a lexical declaration such as a LexicalDeclaration or a ClassDeclaration.

            const staticProperties = getStaticPropertiesAndClassStaticBlock(node);
            if (some(staticProperties)) {
                addPropertyOrClassStaticBlockStatements(statements, staticProperties, factory.getInternalName(node));
            }
        }

        return statements;
    }

    function visitClassExpression(node: ClassExpression): Expression {
        return visitInNewClassLexicalEnvironment(node, visitClassExpressionInNewClassLexicalEnvironment);
    }

    function visitClassExpressionInNewClassLexicalEnvironment(node: ClassExpression, facts: ClassFacts): Expression {
        // If this class expression is a transformation of a decorated class declaration,
        // then we want to output the pendingExpressions as statements, not as inlined
        // expressions with the class statement.
        //
        // In this case, we use pendingStatements to produce the same output as the
        // class declaration transformation. The VariableStatement visitor will insert
        // these statements after the class expression variable statement.
        const isDecoratedClassDeclaration = !!(facts & ClassFacts.ClassWasDecorated);

        const staticPropertiesOrClassStaticBlocks = getStaticPropertiesAndClassStaticBlock(node);

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

        const modifiers = visitNodes(node.modifiers, visitor, isModifierLike);
        const heritageClauses = visitNodes(node.heritageClauses, heritageClauseVisitor, isHeritageClause);
        const { members, prologue } = transformClassMembers(node);
        const classExpression = factory.updateClassExpression(
            node,
            modifiers,
            node.name,
            /*typeParameters*/ undefined,
            heritageClauses,
            members
        );

        const expressions: Expression[] = [];
        if (prologue) {
            expressions.push(prologue);
        }

        // Static initializers are transformed to `static {}` blocks when `useDefineForClassFields: false`
        // and not also transforming static blocks.
        const hasTransformableStatics =
            shouldTransformPrivateElementsOrClassStaticBlocks &&
            some(staticPropertiesOrClassStaticBlocks, node =>
                isClassStaticBlockDeclaration(node) ||
                isPrivateIdentifierClassElementDeclaration(node) ||
                shouldTransformInitializers && isInitializedProperty(node));

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
                    expressions.push(
                        startOnNewLine(factory.createAssignment(temp, classExpression)),
                        startOnNewLine(temp));
                }
                else {
                    expressions.push(classExpression);
                    if (prologue) {
                        startOnNewLine(classExpression);
                    }
                }
            }
            else {
                temp ||= createClassTempVar();
                if (isClassWithConstructorReference) {
                    // record an alias as the class name is not in scope for statics.
                    enableSubstitutionForClassAliases();
                    const alias = factory.cloneNode(temp) as GeneratedIdentifier;
                    alias.autoGenerate.flags &= ~GeneratedIdentifierFlags.ReservedInNestedScopes;
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
            }
        }
        else {
            expressions.push(classExpression);
            if (prologue) {
                startOnNewLine(classExpression);
            }
        }

        return factory.inlineExpressions(expressions);
    }

    function visitClassStaticBlockDeclaration(node: ClassStaticBlockDeclaration) {
        if (!shouldTransformPrivateElementsOrClassStaticBlocks) {
            return visitEachChild(node, visitor, context);
        }
        // ClassStaticBlockDeclaration for classes are transformed in `visitClassDeclaration` or `visitClassExpression`.
        return undefined;
    }

    function transformClassMembers(node: ClassDeclaration | ClassExpression) {
        // Declare private names
        if (shouldTransformPrivateElementsOrClassStaticBlocks) {
            for (const member of node.members) {
                if (isPrivateIdentifierClassElementDeclaration(member)) {
                    addPrivateIdentifierToEnvironment(member, member.name, addPrivateIdentifierClassElementToEnvironment);
                }
            }
            if (some(getPrivateInstanceMethodsAndAccessors(node))) {
                createBrandCheckWeakSetForPrivateMethods();
            }
            if (shouldTransformAutoAccessors) {
                for (const member of node.members) {
                    if (isAutoAccessorPropertyDeclaration(member)) {
                        const storageName = factory.getGeneratedPrivateNameForNode(member.name, /*prefix*/ undefined, "_accessor_storage");
                        addPrivateIdentifierToEnvironment(member, storageName, addPrivateIdentifierPropertyDeclarationToEnvironment);
                    }
                }
            }
        }

        let members = visitNodes(node.members, classElementVisitor, isClassElement);

        // Create a synthetic constructor if necessary
        let syntheticConstructor: ConstructorDeclaration | undefined;
        if (!some(members, isConstructorDeclaration)) {
            syntheticConstructor = transformConstructor(/*constructor*/ undefined, node);
        }

        let prologue: Expression | undefined;

        // If there are pending expressions create a class static block in which to evaluate them, but only if
        // class static blocks are not also being transformed. This block will be injected at the top of the class
        // to ensure that expressions from computed property names are evaluated before any other static
        // initializers.
        let syntheticStaticBlock: ClassStaticBlockDeclaration | undefined;
        if (!shouldTransformPrivateElementsOrClassStaticBlocks && some(pendingExpressions)) {
            let statement = factory.createExpressionStatement(factory.inlineExpressions(pendingExpressions));
            if (statement.transformFlags & TransformFlags.ContainsLexicalThisOrSuper) {
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
            let membersArray: ClassElement[] | undefined;
            membersArray = append(membersArray, syntheticConstructor);
            membersArray = append(membersArray, syntheticStaticBlock);
            membersArray = addRange(membersArray, members);
            members = setTextRange(factory.createNodeArray(membersArray), /*location*/ node.members);
        }

        return { members, prologue };
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
        if (isStatic(member) || hasAbstractModifier(getOriginalNode(member))) {
            return false;
        }

        return shouldTransformInitializersUsingDefine && isPropertyDeclaration(member) ||
            shouldTransformInitializersUsingSet && isInitializedProperty(member) ||
            shouldTransformPrivateElementsOrClassStaticBlocks && isPrivateIdentifierClassElementDeclaration(member) ||
            shouldTransformPrivateElementsOrClassStaticBlocks && shouldTransformAutoAccessors && isAutoAccessorPropertyDeclaration(member);
    }

    function transformConstructor(constructor: ConstructorDeclaration | undefined, container: ClassDeclaration | ClassExpression) {
        constructor = visitNode(constructor, visitor, isConstructorDeclaration);
        if (!some(container.members, isClassElementThatRequiresConstructorStatement)) {
            return constructor;
        }

        const extendsClauseElement = getEffectiveBaseTypeNode(container);
        const isDerivedClass = !!(extendsClauseElement && skipOuterExpressions(extendsClauseElement.expression).kind !== SyntaxKind.NullKeyword);
        const parameters = visitParameterList(constructor ? constructor.parameters : undefined, visitor, context);
        const body = transformConstructorBody(container, constructor, isDerivedClass);
        if (!body) {
            return constructor;
        }

        if (constructor) {
            Debug.assert(parameters);
            return factory.updateConstructorDeclaration(constructor, /*modifiers*/ undefined, parameters, body);
        }

        return startOnNewLine(
            setOriginalNode(
                setTextRange(
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

    function transformConstructorBody(node: ClassDeclaration | ClassExpression, constructor: ConstructorDeclaration | undefined, isDerivedClass: boolean) {
        let properties = getProperties(node, /*requireInitializer*/ false, /*isStatic*/ false);
        if (!useDefineForClassFields) {
            properties = filter(properties, property => !!property.initializer || isPrivateIdentifier(property.name) || hasAccessorModifier(property));
        }

        const privateMethodsAndAccessors = getPrivateInstanceMethodsAndAccessors(node);
        const needsConstructorBody = some(properties) || some(privateMethodsAndAccessors);

        // Only generate synthetic constructor when there are property initializers to move.
        if (!constructor && !needsConstructorBody) {
            return visitFunctionBody(/*node*/ undefined, visitor, context);
        }

        resumeLexicalEnvironment();

        const needsSyntheticConstructor = !constructor && isDerivedClass;
        let indexOfFirstStatementAfterSuperAndPrologue = 0;
        let prologueStatementCount = 0;
        let superStatementIndex = -1;
        let statements: Statement[] = [];

        if (constructor?.body?.statements) {
            prologueStatementCount = factory.copyPrologue(constructor.body.statements, statements, /*ensureUseStrict*/ false, visitor);
            superStatementIndex = findSuperStatementIndex(constructor.body.statements, prologueStatementCount);

            // If there was a super call, visit existing statements up to and including it
            if (superStatementIndex >= 0) {
                indexOfFirstStatementAfterSuperAndPrologue = superStatementIndex + 1;
                statements = [
                    ...statements.slice(0, prologueStatementCount),
                    ...visitNodes(constructor.body.statements, visitor, isStatement, prologueStatementCount, indexOfFirstStatementAfterSuperAndPrologue - prologueStatementCount),
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
                statements = statements.filter(statement => !isParameterPropertyDeclaration(getOriginalNode(statement), constructor));
            }
            else {
                for (const statement of constructor.body.statements) {
                    if (isParameterPropertyDeclaration(getOriginalNode(statement), constructor)) {
                        parameterPropertyDeclarationCount++;
                    }
                }
                if (parameterPropertyDeclarationCount > 0) {
                    const parameterProperties = visitNodes(constructor.body.statements, visitor, isStatement, indexOfFirstStatementAfterSuperAndPrologue, parameterPropertyDeclarationCount);

                    // If there was a super() call found, add parameter properties immediately after it
                    if (superStatementIndex >= 0) {
                        addRange(statements, parameterProperties);
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
            addRange(statements, visitNodes(constructor.body!.statements, visitBodyStatement, isStatement, indexOfFirstStatementAfterSuperAndPrologue));
        }

        statements = factory.mergeLexicalEnvironment(statements, endLexicalEnvironment());

        if (statements.length === 0 && !constructor) {
            return undefined;
        }

        const multiLine = constructor?.body && constructor.body.statements.length >= statements.length ?
            constructor.body.multiLine ?? statements.length > 0 :
            statements.length > 0;

        return setTextRange(
            factory.createBlock(
                setTextRange(
                    factory.createNodeArray(statements),
                    /*location*/ constructor ? constructor.body!.statements : node.members
                ),
                multiLine
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
            if (isStatic(property) && !shouldTransformPrivateElementsOrClassStaticBlocks && !useDefineForClassFields) {
                continue;
            }

            const statement = transformPropertyOrClassStaticBlock(property, receiver);
            if (!statement) {
                continue;
            }

            statements.push(statement);
        }
    }

    function transformPropertyOrClassStaticBlock(property: PropertyDeclaration | ClassStaticBlockDeclaration, receiver: LeftHandSideExpression) {
        const expression = isClassStaticBlockDeclaration(property) ?
            transformClassStaticBlockDeclaration(property) :
            transformProperty(property, receiver);
        if (!expression) {
            return undefined;
        }

        const statement = factory.createExpressionStatement(expression);
        setOriginalNode(statement, property);
        addEmitFlags(statement, getEmitFlags(property) & EmitFlags.NoComments);
        setSourceMapRange(statement, moveRangePastModifiers(property));
        setCommentRange(statement, property);

        // `setOriginalNode` *copies* the `emitNode` from `property`, so now both
        // `statement` and `expression` have a copy of the synthesized comments.
        // Drop the comments from expression to avoid printing them twice.
        setSyntheticLeadingComments(expression, undefined);
        setSyntheticTrailingComments(expression, undefined);

        return statement;
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
            setOriginalNode(expression, property);
            addEmitFlags(expression, getEmitFlags(property) & EmitFlags.NoComments);
            setSourceMapRange(expression, moveRangePastModifiers(property));
            setCommentRange(expression, property);
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

        const propertyName =
            hasAccessorModifier(property) ?
                factory.getGeneratedPrivateNameForNode(property.name) :
            isComputedPropertyName(property.name) && !isSimpleInlineableExpression(property.name.expression) ?
                factory.updateComputedPropertyName(property.name, factory.getGeneratedNameForNode(property.name)) :
                property.name;

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
    function addMethodStatements(statements: Statement[], methods: readonly (MethodDeclaration | AccessorDeclaration | AutoAccessorPropertyDeclaration)[], receiver: LeftHandSideExpression) {
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
        node: PropertyDeclaration | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration,
        name: PrivateIdentifier,
        lex: ClassLexicalEnvironment,
        privateEnv: PrivateIdentifierEnvironment,
        isStatic: boolean,
        isValid: boolean,
        previousInfo: PrivateIdentifierInfo | undefined
    ) {
        if (isAutoAccessorPropertyDeclaration(node)) {
            addPrivateIdentifierAutoAccessorPropertyDeclarationToEnvironment(node, name, lex, privateEnv, isStatic, isValid, previousInfo);
        }
        else if (isPropertyDeclaration(node)) {
            addPrivateIdentifierPropertyDeclarationToEnvironment(node, name, lex, privateEnv, isStatic, isValid, previousInfo);
        }
        else if (isMethodDeclaration(node)) {
            addPrivateIdentifierMethodDeclarationToEnvironment(node, name, lex, privateEnv, isStatic, isValid, previousInfo);
        }
        else if (isGetAccessorDeclaration(node)) {
            addPrivateIdentifierGetAccessorDeclarationToEnvironment(node, name, lex, privateEnv, isStatic, isValid, previousInfo);
        }
        else if (isSetAccessorDeclaration(node)) {
            addPrivateIdentifierSetAccessorDeclarationToEnvironment(node, name, lex, privateEnv, isStatic, isValid, previousInfo);
        }
    }

    function addPrivateIdentifierPropertyDeclarationToEnvironment(
        _node: PropertyDeclaration,
        name: PrivateIdentifier,
        lex: ClassLexicalEnvironment,
        privateEnv: PrivateIdentifierEnvironment,
        isStatic: boolean,
        isValid: boolean,
        _previousInfo: PrivateIdentifierInfo | undefined
    ) {
        if (isStatic) {
            Debug.assert(lex.classConstructor, "classConstructor should be set in private identifier environment");

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
        _node: MethodDeclaration,
        name: PrivateIdentifier,
        lex: ClassLexicalEnvironment,
        privateEnv: PrivateIdentifierEnvironment,
        isStatic: boolean,
        isValid: boolean,
        _previousInfo: PrivateIdentifierInfo | undefined
    ) {
        const methodName = createHoistedVariableForPrivateName(name);
        const brandCheckIdentifier = isStatic ?
            Debug.checkDefined(lex.classConstructor, "classConstructor should be set in private identifier environment") :
            Debug.checkDefined(privateEnv.weakSetName, "weakSetName should be set in private identifier environment");

        setPrivateIdentifier(privateEnv, name, {
            kind: PrivateIdentifierKind.Method,
            methodName,
            brandCheckIdentifier,
            isStatic,
            isValid,
        });
    }

    function addPrivateIdentifierGetAccessorDeclarationToEnvironment(
        _node: GetAccessorDeclaration,
        name: PrivateIdentifier,
        lex: ClassLexicalEnvironment,
        privateEnv: PrivateIdentifierEnvironment,
        isStatic: boolean,
        isValid: boolean,
        previousInfo: PrivateIdentifierInfo | undefined
    ) {
        const getterName = createHoistedVariableForPrivateName(name, "_get");
        const brandCheckIdentifier = isStatic ?
            Debug.checkDefined(lex.classConstructor, "classConstructor should be set in private identifier environment") :
            Debug.checkDefined(privateEnv.weakSetName, "weakSetName should be set in private identifier environment");

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
        _node: SetAccessorDeclaration,
        name: PrivateIdentifier,
        lex: ClassLexicalEnvironment,
        privateEnv: PrivateIdentifierEnvironment,
        isStatic: boolean,
        isValid: boolean,
        previousInfo: PrivateIdentifierInfo | undefined
    ) {
        const setterName = createHoistedVariableForPrivateName(name, "_set");
        const brandCheckIdentifier = isStatic ?
            Debug.checkDefined(lex.classConstructor, "classConstructor should be set in private identifier environment") :
            Debug.checkDefined(privateEnv.weakSetName, "weakSetName should be set in private identifier environment");

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
        _node: AutoAccessorPropertyDeclaration,
        name: PrivateIdentifier,
        lex: ClassLexicalEnvironment,
        privateEnv: PrivateIdentifierEnvironment,
        isStatic: boolean,
        isValid: boolean,
        _previousInfo: PrivateIdentifierInfo | undefined
    ) {
        const getterName = createHoistedVariableForPrivateName(name, "_get");
        const setterName = createHoistedVariableForPrivateName(name, "_set");
        const brandCheckIdentifier = isStatic ?
            Debug.checkDefined(lex.classConstructor, "classConstructor should be set in private identifier environment") :
            Debug.checkDefined(privateEnv.weakSetName, "weakSetName should be set in private identifier environment");

        setPrivateIdentifier(privateEnv, name, {
            kind: PrivateIdentifierKind.Accessor,
            getterName,
            setterName,
            brandCheckIdentifier,
            isStatic,
            isValid,
        });
    }

    function addPrivateIdentifierToEnvironment<T extends PropertyDeclaration | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration>(
        node: T,
        name: PrivateIdentifier,
        addDeclaration: (
            node: T,
            name: PrivateIdentifier,
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
        const isStatic = hasStaticModifier(node);
        const isValid = !isReservedPrivateName(name) && previousInfo === undefined;
        addDeclaration(node, name, lex, privateEnv, isStatic, isValid, previousInfo);
    }

    function createHoistedVariableForClass(name: string | PrivateIdentifier | undefined, node: PrivateIdentifier | ClassStaticBlockDeclaration, suffix?: string): Identifier {
        const { className } = getPrivateIdentifierEnvironment();
        const prefix: GeneratedNamePart | string = className ? { prefix: "_", node: className, suffix: "_" } : "_";
        const identifier =
            typeof name === "object" ? factory.getGeneratedNameForNode(name, GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.ReservedInNestedScopes, prefix, suffix) :
            typeof name === "string" ? factory.createUniqueName(name, GeneratedIdentifierFlags.Optimistic, prefix, suffix) :
            factory.createTempVariable(/*recordTempVariable*/ undefined, /*reserveInNestedScopes*/ true, prefix, suffix);

        if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.BlockScopedBindingInLoop) {
            addBlockScopedVariable(identifier);
        }
        else {
            hoistVariableDeclaration(identifier);
        }

        return identifier;
    }

    function createHoistedVariableForPrivateName(name: PrivateIdentifier, suffix?: string): Identifier {
        const text = tryGetTextOfPropertyName(name) as string | undefined;
        return createHoistedVariableForClass(text?.substring(1) ?? name, name, suffix);
    }

    /**
     * Access an already defined {@link PrivateIdentifier} in the current {@link PrivateIdentifierEnvironment}.
     *
     * @seealso {@link addPrivateIdentifierToEnvironment}
     */
    function accessPrivateIdentifier(name: PrivateIdentifier) {
        if (isGeneratedPrivateIdentifier(name)) {
            return accessGeneratedPrivateIdentifier(name);
        }
        else {
            return accessPrivateIdentifierByText(name.escapedText);
        }
    }

    function accessPrivateIdentifierByText(text: __String) {
        return accessPrivateIdentifierWorker(getPrivateIdentifierInfo, text);
    }

    function accessGeneratedPrivateIdentifier(name: GeneratedPrivateIdentifier) {
        return accessPrivateIdentifierWorker(getGeneratedPrivateIdentifierInfo, getNodeForGeneratedName(name));
    }

    function accessPrivateIdentifierWorker<K extends __String | Node>(
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
        return visitNode(node, assignmentTargetVisitor);
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
                        visitNode(node.initializer, assignmentTargetVisitor, isExpression)
                );
            }
            if (isSpreadAssignment(node)) {
                return factory.updateSpreadAssignment(
                    node,
                    wrapped || visitNode(node.expression, assignmentTargetVisitor, isExpression)
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
    return !isGeneratedPrivateIdentifier(node) && node.escapedText === "#constructor";
}

function getPrivateIdentifier(privateEnv: PrivateIdentifierEnvironment, name: PrivateIdentifier) {
    return isGeneratedPrivateIdentifier(name) ?
        getGeneratedPrivateIdentifierInfo(privateEnv, getNodeForGeneratedName(name)) :
        getPrivateIdentifierInfo(privateEnv, name.escapedText);
}

function setPrivateIdentifier(privateEnv: PrivateIdentifierEnvironment, name: PrivateIdentifier, info: PrivateIdentifierInfo) {
    if (isGeneratedPrivateIdentifier(name)) {
        privateEnv.generatedIdentifiers ??= new Map();
        privateEnv.generatedIdentifiers.set(getNodeForGeneratedName(name), info);
    }
    else {
        privateEnv.identifiers ??= new Map();
        privateEnv.identifiers.set(name.escapedText, info);
    }
}

function getPrivateIdentifierInfo(privateEnv: PrivateIdentifierEnvironment, key: __String) {
    return privateEnv.identifiers?.get(key);
}

function getGeneratedPrivateIdentifierInfo(privateEnv: PrivateIdentifierEnvironment, key: Node) {
    return privateEnv.generatedIdentifiers?.get(key);
}
