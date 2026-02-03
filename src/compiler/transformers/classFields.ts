import {
    __String,
    AccessorDeclaration,
    accessPrivateIdentifier as accessPrivateIdentifierCommon,
    addEmitFlags,
    addEmitHelpers,
    addRange,
    AnonymousFunctionDefinition,
    append,
    ArrayAssignmentElement,
    AssignmentExpression,
    AssignmentOperator,
    AssignmentPattern,
    AutoAccessorPropertyDeclaration,
    BinaryExpression,
    BindingElement,
    Bundle,
    CallExpression,
    chainBundle,
    ClassDeclaration,
    ClassElement,
    ClassExpression,
    classHasClassThisAssignment,
    classHasExplicitlyAssignedName,
    ClassLikeDeclaration,
    classOrConstructorParameterIsDecorated,
    ClassStaticBlockDeclaration,
    CommaListExpression,
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
    EqualsToken,
    expandPreOrPostfixIncrementOrDecrementExpression,
    ExportAssignment,
    Expression,
    ExpressionStatement,
    ExpressionWithTypeArguments,
    filter,
    find,
    findComputedPropertyNameCacheAssignment,
    findSuperStatementIndexPath,
    flattenCommaList,
    ForStatement,
    GeneratedIdentifier,
    GeneratedIdentifierFlags,
    GeneratedNamePart,
    GetAccessorDeclaration,
    getCommentRange,
    getEffectiveBaseTypeNode,
    getEmitFlags,
    getEmitScriptTarget,
    getInternalEmitFlags,
    getNameOfDeclaration,
    getNonAssignmentOperatorForCompoundAssignment,
    getOriginalNode,
    getOriginalNodeId,
    getPrivateIdentifier,
    getProperties,
    getSourceMapRange,
    getStaticPropertiesAndClassStaticBlock,
    getUseDefineForClassFields,
    hasAbstractModifier,
    hasAccessorModifier,
    hasDecorators,
    hasStaticModifier,
    hasSyntacticModifier,
    Identifier,
    InKeyword,
    InternalEmitFlags,
    isAccessor,
    isAccessorModifier,
    isArrayBindingOrAssignmentElement,
    isArrayLiteralExpression,
    isArrowFunction,
    isAssignmentExpression,
    isAutoAccessorPropertyDeclaration,
    isBlock,
    isCallChain,
    isCallToHelper,
    isCatchClause,
    isClassElement,
    isClassExpression,
    isClassLike,
    isClassNamedEvaluationHelperBlock,
    isClassStaticBlockDeclaration,
    isClassThisAssignmentBlock,
    isCommaExpression,
    isCompoundAssignment,
    isComputedPropertyName,
    isConstructorDeclaration,
    isDestructuringAssignment,
    isElementAccessExpression,
    isExportOrDefaultModifier,
    isExpression,
    isForInitializer,
    isGeneratedIdentifier,
    isGeneratedPrivateIdentifier,
    isGetAccessor,
    isGetAccessorDeclaration,
    isHeritageClause,
    isIdentifier,
    isIdentifierText,
    isInitializedProperty,
    isLeftHandSideExpression,
    isMethodDeclaration,
    isModifier,
    isModifierLike,
    isNamedEvaluation,
    isNonStaticMethodOrAccessorWithPrivateName,
    isNumericLiteral,
    isObjectBindingOrAssignmentElement,
    isObjectLiteralElementLike,
    isObjectLiteralExpression,
    isOmittedExpression,
    isParameter,
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
    isStringLiteral,
    isSuperProperty,
    isTemplateLiteral,
    isThisProperty,
    isTryStatement,
    isVoidExpression,
    LeftHandSideExpression,
    LexicalEnvironment,
    map,
    MethodDeclaration,
    Modifier,
    ModifierFlags,
    ModifierLike,
    modifiersToFlags,
    moveRangePastModifiers,
    moveRangePos,
    newPrivateEnvironment,
    Node,
    NodeArray,
    NodeCheckFlags,
    NodeFactory,
    nodeIsSynthesized,
    ObjectLiteralElement,
    OmittedExpression,
    OuterExpressionKinds,
    ParameterDeclaration,
    ParenthesizedExpression,
    PostfixUnaryExpression,
    PrefixUnaryExpression,
    PrivateEnvironment,
    PrivateIdentifier,
    PrivateIdentifierAccessorDeclaration,
    PrivateIdentifierKind,
    PrivateIdentifierMethodDeclaration,
    PrivateIdentifierPropertyAccessExpression,
    PrivateIdentifierPropertyDeclaration,
    PropertyAccessExpression,
    PropertyAssignment,
    PropertyDeclaration,
    PropertyName,
    removeAllComments,
    ScriptTarget,
    SetAccessorDeclaration,
    setCommentRange,
    setEmitFlags,
    setOriginalNode,
    setPrivateIdentifier,
    setSourceMapRange,
    setSyntheticLeadingComments,
    setSyntheticTrailingComments,
    setTextRange,
    ShorthandPropertyAssignment,
    skipOuterExpressions,
    skipParentheses,
    skipPartiallyEmittedExpressions,
    some,
    SourceFile,
    SpreadAssignment,
    SpreadElement,
    startOnNewLine,
    Statement,
    SuperProperty,
    SyntaxKind,
    TaggedTemplateExpression,
    Ternary,
    ThisExpression,
    TransformationContext,
    TransformFlags,
    transformNamedEvaluation,
    tryCast,
    tryGetTextOfPropertyName,
    unescapeLeadingUnderscores,
    VariableDeclaration,
    VariableStatement,
    visitArray,
    visitCommaListElements,
    visitEachChild,
    visitFunctionBody,
    visitIterationBody,
    visitNode,
    visitNodes,
    Visitor,
    visitParameterList,
    VisitResult,
} from "../_namespaces/ts.js";

const enum ClassPropertySubstitutionFlags {
    None = 0,
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
}

interface PrivateIdentifierStaticFieldInfo extends PrivateIdentifierInfoBase {
    kind: PrivateIdentifierKind.Field;
    isStatic: true;
    /**
     * Contains the variable that will serve as the storage for the field.
     */
    variableName: Identifier;
}

interface PrivateEnvironmentData {
    /**
     * Used for prefixing generated variable names.
     */
    className?: Identifier;

    /**
     * Used for brand check on private methods.
     */
    weakSetName?: Identifier;
}

interface UntransformedPrivateIdentifierInfo {
    kind: "untransformed";
}

type PrivateIdentifierInfo =
    | PrivateIdentifierMethodInfo
    | PrivateIdentifierInstanceFieldInfo
    | PrivateIdentifierStaticFieldInfo
    | PrivateIdentifierAccessorInfo
    | UntransformedPrivateIdentifierInfo;

interface ClassLexicalEnvironment {
    facts: ClassFacts;
    /**
     * Used for brand checks on static members, and `this` references in static initializers
     */
    classConstructor: Identifier | undefined;
    classThis: Identifier | undefined;
    /**
     * Used for `super` references in static initializers.
     */
    superClassReference: Identifier | undefined;
}

const enum ClassFacts {
    None = 0,
    ClassWasDecorated = 1 << 0,
    NeedsClassConstructorReference = 1 << 1,
    NeedsClassSuperReference = 1 << 2,
    NeedsSubstitutionForThisInClassStaticField = 1 << 3,
    WillHoistInitializersToConstructor = 1 << 4,
}

type LexicalEnv = LexicalEnvironment<ClassLexicalEnvironment | undefined, PrivateEnvironmentData, PrivateIdentifierInfo>;
type PrivateEnv = PrivateEnvironment<PrivateEnvironmentData, PrivateIdentifierInfo>;

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
        getEmitHelperFactory: emitHelpers,
        hoistVariableDeclaration,
        endLexicalEnvironment,
        startLexicalEnvironment,
        resumeLexicalEnvironment,
        addBlockScopedVariable,
    } = context;
    const resolver = context.getEmitResolver();
    const compilerOptions = context.getCompilerOptions();
    const languageVersion = getEmitScriptTarget(compilerOptions);
    const useDefineForClassFields = getUseDefineForClassFields(compilerOptions);
    const legacyDecorators = !!compilerOptions.experimentalDecorators;

    // Always transform field initializers using Set semantics when `useDefineForClassFields: false`.
    const shouldTransformInitializersUsingSet = !useDefineForClassFields;

    // Transform field initializers using Define semantics when `useDefineForClassFields: true` and target < ES2022.
    const shouldTransformInitializersUsingDefine = useDefineForClassFields && languageVersion < ScriptTarget.ES2022;
    const shouldTransformInitializers = shouldTransformInitializersUsingSet || shouldTransformInitializersUsingDefine;

    // We need to transform private members and class static blocks when target < ES2022.
    const shouldTransformPrivateElementsOrClassStaticBlocks = languageVersion < ScriptTarget.ES2022;

    // We need to transform `accessor` fields when target < ESNext.
    // We may need to transform `accessor` fields when `useDefineForClassFields: false`
    const shouldTransformAutoAccessors = languageVersion < ScriptTarget.ESNext ? Ternary.True :
        !useDefineForClassFields ? Ternary.Maybe :
        Ternary.False;

    // We need to transform `this` in a static initializer into a reference to the class
    // when target < ES2022 since the assignment will be moved outside of the class body.
    const shouldTransformThisInStaticInitializers = languageVersion < ScriptTarget.ES2022;

    // We don't need to transform `super` property access when target <= ES5 because
    // the es2015 transformation handles those.
    const shouldTransformSuperInStaticInitializers = shouldTransformThisInStaticInitializers && languageVersion >= ScriptTarget.ES2015;

    const shouldTransformAnything = shouldTransformInitializers ||
        shouldTransformPrivateElementsOrClassStaticBlocks ||
        shouldTransformAutoAccessors === Ternary.True;

    const previousOnSubstituteNode = context.onSubstituteNode;
    context.onSubstituteNode = onSubstituteNode;

    const previousOnEmitNode = context.onEmitNode;
    context.onEmitNode = onEmitNode;

    let shouldTransformPrivateStaticElementsInFile = false;
    let enabledSubstitutions = ClassPropertySubstitutionFlags.None;

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

    let lexicalEnvironment: LexicalEnv | undefined;
    const lexicalEnvironmentMap = new Map<Node, LexicalEnv>();

    // Nodes that should not be replaced during emit substitution.
    const noSubstitution = new Set<Node>();

    let currentClassContainer: ClassLikeDeclaration | undefined;
    let currentClassElement: ClassElement | undefined;
    let shouldSubstituteThisWithClassThis = false;
    let previousShouldSubstituteThisWithClassThis = false;

    return chainBundle(context, transformSourceFile);

    function transformSourceFile(node: SourceFile) {
        if (node.isDeclarationFile) {
            return node;
        }

        lexicalEnvironment = undefined;
        shouldTransformPrivateStaticElementsInFile = !!(getInternalEmitFlags(node) & InternalEmitFlags.TransformPrivateStaticElements);
        if (!shouldTransformAnything && !shouldTransformPrivateStaticElementsInFile) {
            return node;
        }

        const visited = visitEachChild(node, visitor, context);
        addEmitHelpers(visited, context.readEmitHelpers());
        return visited;
    }

    function modifierVisitor(node: ModifierLike): VisitResult<Modifier | undefined> {
        switch (node.kind) {
            case SyntaxKind.AccessorKeyword:
                return shouldTransformAutoAccessorsInCurrentClass() ? undefined : node;
            default:
                return tryCast(node, isModifier);
        }
    }

    function visitor(node: Node): VisitResult<Node> {
        if (
            !(node.transformFlags & TransformFlags.ContainsClassFields) &&
            !(node.transformFlags & TransformFlags.ContainsLexicalThisOrSuper)
        ) {
            return node;
        }

        switch (node.kind) {
            case SyntaxKind.ClassDeclaration:
                return visitClassDeclaration(node as ClassDeclaration);
            case SyntaxKind.ClassExpression:
                return visitClassExpression(node as ClassExpression);
            case SyntaxKind.ClassStaticBlockDeclaration:
            case SyntaxKind.PropertyDeclaration:
                return Debug.fail("Use `classElementVisitor` instead.");
            case SyntaxKind.PropertyAssignment:
                return visitPropertyAssignment(node as PropertyAssignment);
            case SyntaxKind.VariableStatement:
                return visitVariableStatement(node as VariableStatement);
            case SyntaxKind.VariableDeclaration:
                return visitVariableDeclaration(node as VariableDeclaration);
            case SyntaxKind.Parameter:
                return visitParameterDeclaration(node as ParameterDeclaration);
            case SyntaxKind.BindingElement:
                return visitBindingElement(node as BindingElement);
            case SyntaxKind.ExportAssignment:
                return visitExportAssignment(node as ExportAssignment);
            case SyntaxKind.PrivateIdentifier:
                return visitPrivateIdentifier(node as PrivateIdentifier);
            case SyntaxKind.PropertyAccessExpression:
                return visitPropertyAccessExpression(node as PropertyAccessExpression);
            case SyntaxKind.ElementAccessExpression:
                return visitElementAccessExpression(node as ElementAccessExpression);
            case SyntaxKind.PrefixUnaryExpression:
            case SyntaxKind.PostfixUnaryExpression:
                return visitPreOrPostfixUnaryExpression(node as PrefixUnaryExpression | PostfixUnaryExpression, /*discarded*/ false);
            case SyntaxKind.BinaryExpression:
                return visitBinaryExpression(node as BinaryExpression, /*discarded*/ false);
            case SyntaxKind.ParenthesizedExpression:
                return visitParenthesizedExpression(node as ParenthesizedExpression, /*discarded*/ false);
            case SyntaxKind.CallExpression:
                return visitCallExpression(node as CallExpression);
            case SyntaxKind.ExpressionStatement:
                return visitExpressionStatement(node as ExpressionStatement);
            case SyntaxKind.TaggedTemplateExpression:
                return visitTaggedTemplateExpression(node as TaggedTemplateExpression);
            case SyntaxKind.ForStatement:
                return visitForStatement(node as ForStatement);
            case SyntaxKind.ThisKeyword:
                return visitThisExpression(node as ThisExpression);
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
                // If we are descending into a new scope, clear the current class element
                return setCurrentClassElementAnd(
                    /*classElement*/ undefined,
                    fallbackVisitor,
                    node,
                );
            case SyntaxKind.Constructor:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor: {
                // If we are descending into a class element, set the class element
                return setCurrentClassElementAnd(
                    node as ConstructorDeclaration | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration,
                    fallbackVisitor,
                    node,
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
                return visitPreOrPostfixUnaryExpression(node as PrefixUnaryExpression | PostfixUnaryExpression, /*discarded*/ true);
            case SyntaxKind.BinaryExpression:
                return visitBinaryExpression(node as BinaryExpression, /*discarded*/ true);
            case SyntaxKind.CommaListExpression:
                return visitCommaListExpression(node as CommaListExpression, /*discarded*/ true);
            case SyntaxKind.ParenthesizedExpression:
                return visitParenthesizedExpression(node as ParenthesizedExpression, /*discarded*/ true);
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
    function classElementVisitor(node: Node): VisitResult<Node | undefined> {
        switch (node.kind) {
            case SyntaxKind.Constructor:
                return setCurrentClassElementAnd(
                    node as ConstructorDeclaration,
                    visitConstructorDeclaration,
                    node as ConstructorDeclaration,
                );
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.MethodDeclaration:
                return setCurrentClassElementAnd(
                    node as MethodDeclaration | AccessorDeclaration,
                    visitMethodOrAccessorDeclaration,
                    node as MethodDeclaration | AccessorDeclaration,
                );
            case SyntaxKind.PropertyDeclaration:
                return setCurrentClassElementAnd(
                    node as PropertyDeclaration,
                    visitPropertyDeclaration,
                    node as PropertyDeclaration,
                );
            case SyntaxKind.ClassStaticBlockDeclaration:
                return setCurrentClassElementAnd(
                    node as ClassStaticBlockDeclaration,
                    visitClassStaticBlockDeclaration,
                    node as ClassStaticBlockDeclaration,
                );
            case SyntaxKind.ComputedPropertyName:
                return visitComputedPropertyName(node as ComputedPropertyName);
            case SyntaxKind.SemicolonClassElement:
                return node;
            default:
                return isModifierLike(node) ? modifierVisitor(node) : visitor(node);
        }
    }

    /**
     * Visits a property name of a class member.
     */
    function propertyNameVisitor(node: Node): VisitResult<Node> {
        switch (node.kind) {
            case SyntaxKind.ComputedPropertyName:
                return visitComputedPropertyName(node as ComputedPropertyName);
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

    /**
     * Visits `#id in expr`
     */
    function transformPrivateIdentifierInInExpression(node: PrivateIdentifierInExpression) {
        const info = accessPrivateIdentifier(node.left);
        if (info) {
            const receiver = visitNode(node.right, visitor, isExpression);
            return setOriginalNode(
                emitHelpers().createClassPrivateFieldInHelper(info.brandCheckIdentifier, receiver),
                node,
            );
        }

        // Private name has not been declared. Subsequent transformers will handle this error
        return visitEachChild(node, visitor, context);
    }

    function visitPropertyAssignment(node: PropertyAssignment) {
        // 13.2.5.5 RS: PropertyDefinitionEvaluation
        //   PropertyAssignment : PropertyName `:` AssignmentExpression
        //     ...
        //     5. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true* and _isProtoSetter_ is *false*, then
        //        a. Let _popValue_ be ? NamedEvaluation of |AssignmentExpression| with argument _propKey_.
        //     ...

        if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
            node = transformNamedEvaluation(context, node);
        }

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

    function visitVariableDeclaration(node: VariableDeclaration) {
        // 14.3.1.2 RS: Evaluation
        //   LexicalBinding : BindingIdentifier Initializer
        //     ...
        //     3. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
        //        a. Let _value_ be ? NamedEvaluation of |Initializer| with argument _bindingId_.
        //     ...
        //
        // 14.3.2.1 RS: Evaluation
        //   VariableDeclaration : BindingIdentifier Initializer
        //     ...
        //     3. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
        //        a. Let _value_ be ? NamedEvaluation of |Initializer| with argument _bindingId_.
        //     ...

        if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
            node = transformNamedEvaluation(context, node);
        }

        return visitEachChild(node, visitor, context);
    }

    function visitParameterDeclaration(node: ParameterDeclaration) {
        // 8.6.3 RS: IteratorBindingInitialization
        //   SingleNameBinding : BindingIdentifier Initializer?
        //     ...
        //     5. If |Initializer| is present and _v_ is *undefined*, then
        //        a. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
        //           i. Set _v_ to ? NamedEvaluation of |Initializer| with argument _bindingId_.
        //     ...
        //
        // 14.3.3.3 RS: KeyedBindingInitialization
        //   SingleNameBinding : BindingIdentifier Initializer?
        //     ...
        //     4. If |Initializer| is present and _v_ is *undefined*, then
        //        a. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
        //           i. Set _v_ to ? NamedEvaluation of |Initializer| with argument _bindingId_.
        //     ...

        if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
            node = transformNamedEvaluation(context, node);
        }

        return visitEachChild(node, visitor, context);
    }

    function visitBindingElement(node: BindingElement) {
        // 8.6.3 RS: IteratorBindingInitialization
        //   SingleNameBinding : BindingIdentifier Initializer?
        //     ...
        //     5. If |Initializer| is present and _v_ is *undefined*, then
        //        a. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
        //           i. Set _v_ to ? NamedEvaluation of |Initializer| with argument _bindingId_.
        //     ...
        //
        // 14.3.3.3 RS: KeyedBindingInitialization
        //   SingleNameBinding : BindingIdentifier Initializer?
        //     ...
        //     4. If |Initializer| is present and _v_ is *undefined*, then
        //        a. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
        //           i. Set _v_ to ? NamedEvaluation of |Initializer| with argument _bindingId_.
        //     ...

        if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
            node = transformNamedEvaluation(context, node);
        }

        return visitEachChild(node, visitor, context);
    }

    function visitExportAssignment(node: ExportAssignment) {
        // 16.2.3.7 RS: Evaluation
        //   ExportDeclaration : `export` `default` AssignmentExpression `;`
        //     1. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true*, then
        //        a. Let _value_ be ? NamedEvaluation of |AssignmentExpression| with argument `"default"`.
        //     ...

        // NOTE: Since emit for `export =` translates to `module.exports = ...`, the assigned nameof the class
        // is `""`.

        if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
            node = transformNamedEvaluation(context, node, /*ignoreEmptyStringLiteral*/ true, node.isExportEquals ? "" : "default");
        }

        return visitEachChild(node, visitor, context);
    }

    function injectPendingExpressions(expression: Expression) {
        if (some(pendingExpressions)) {
            if (isParenthesizedExpression(expression)) {
                pendingExpressions.push(expression.expression);
                expression = factory.updateParenthesizedExpression(expression, factory.inlineExpressions(pendingExpressions));
            }
            else {
                pendingExpressions.push(expression);
                expression = factory.inlineExpressions(pendingExpressions);
            }
            pendingExpressions = undefined;
        }
        return expression;
    }

    function visitComputedPropertyName(node: ComputedPropertyName) {
        const expression = visitNode(node.expression, visitor, isExpression);
        return factory.updateComputedPropertyName(node, injectPendingExpressions(expression));
    }

    function visitConstructorDeclaration(node: ConstructorDeclaration) {
        if (currentClassContainer) {
            return transformConstructor(node, currentClassContainer);
        }
        return fallbackVisitor(node);
    }

    function shouldTransformClassElementToWeakMap(node: PrivateIdentifierMethodDeclaration | PrivateIdentifierAccessorDeclaration | PrivateIdentifierPropertyDeclaration) {
        if (shouldTransformPrivateElementsOrClassStaticBlocks) return true;
        if (hasStaticModifier(node) && getInternalEmitFlags(node) & InternalEmitFlags.TransformPrivateStaticElements) return true;
        return false;
    }

    function visitMethodOrAccessorDeclaration(node: MethodDeclaration | AccessorDeclaration) {
        Debug.assert(!hasDecorators(node));

        if (!isPrivateIdentifierClassElementDeclaration(node) || !shouldTransformClassElementToWeakMap(node)) {
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
                        /*typeParameters*/ undefined,
                        visitParameterList(node.parameters, visitor, context),
                        /*type*/ undefined,
                        visitFunctionBody(node.body!, visitor, context),
                    ),
                ),
            );
        }

        // remove method declaration from class
        return undefined;
    }

    function setCurrentClassElementAnd<T, U>(
        classElement: ClassElement | undefined,
        visitor: (arg: T) => U,
        arg: T,
    ) {
        if (classElement !== currentClassElement) {
            const savedCurrentClassElement = currentClassElement;
            currentClassElement = classElement;
            const result = visitor(arg);
            currentClassElement = savedCurrentClassElement;
            return result;
        }
        return visitor(arg);
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

    function tryGetClassThis() {
        const lex = getClassLexicalEnvironment();
        return lex.classThis ?? lex.classConstructor ?? currentClassContainer?.name;
    }

    function transformAutoAccessor(node: AutoAccessorPropertyDeclaration): VisitResult<Node> {
        // transforms:
        //      accessor x = 1;
        // into:
        //      #x = 1;
        //      get x() { return this.#x; }
        //      set x(value) { this.#x = value; }

        const commentRange = getCommentRange(node);
        const sourceMapRange = getSourceMapRange(node);

        // Since we're creating two declarations where there was previously one, cache
        // the expression for any computed property names.
        const name = node.name;
        let getterName = name;
        let setterName = name;
        if (isComputedPropertyName(name) && !isSimpleInlineableExpression(name.expression)) {
            const cacheAssignment = findComputedPropertyNameCacheAssignment(name);
            if (cacheAssignment) {
                getterName = factory.updateComputedPropertyName(name, visitNode(name.expression, visitor, isExpression));
                setterName = factory.updateComputedPropertyName(name, cacheAssignment.left);
            }
            else {
                const temp = factory.createTempVariable(hoistVariableDeclaration);
                setSourceMapRange(temp, name.expression);
                const expression = visitNode(name.expression, visitor, isExpression);
                const assignment = factory.createAssignment(temp, expression);
                setSourceMapRange(assignment, name.expression);
                getterName = factory.updateComputedPropertyName(name, assignment);
                setterName = factory.updateComputedPropertyName(name, temp);
            }
        }

        const modifiers = visitNodes(node.modifiers, modifierVisitor, isModifier);
        const backingField = createAccessorPropertyBackingField(factory, node, modifiers, node.initializer);
        setOriginalNode(backingField, node);
        setEmitFlags(backingField, EmitFlags.NoComments);
        setSourceMapRange(backingField, sourceMapRange);

        const receiver = isStatic(node) ? tryGetClassThis() ?? factory.createThis() : factory.createThis();
        const getter = createAccessorPropertyGetRedirector(factory, node, modifiers, getterName, receiver);
        setOriginalNode(getter, node);
        setCommentRange(getter, commentRange);
        setSourceMapRange(getter, sourceMapRange);

        // create a fresh copy of the modifiers so that we don't duplicate comments
        const setterModifiers = factory.createModifiersFromModifierFlags(modifiersToFlags(modifiers));
        const setter = createAccessorPropertySetRedirector(factory, node, setterModifiers, setterName, receiver);
        setOriginalNode(setter, node);
        setEmitFlags(setter, EmitFlags.NoComments);
        setSourceMapRange(setter, sourceMapRange);

        return visitArray([backingField, getter, setter], accessorFieldResultVisitor, isClassElement);
    }

    function transformPrivateFieldInitializer(node: PrivateIdentifierPropertyDeclaration) {
        if (shouldTransformClassElementToWeakMap(node)) {
            // If we are transforming private elements into WeakMap/WeakSet, we should elide the node.
            const info = accessPrivateIdentifier(node.name);
            Debug.assert(info, "Undeclared private name for property declaration.");

            // Leave invalid code untransformed
            if (!info.isValid) {
                return node;
            }

            // If we encounter a valid private static field and we're not transforming
            // class static blocks, initialize it
            if (info.isStatic && !shouldTransformPrivateElementsOrClassStaticBlocks) {
                // TODO: fix
                const statement = transformPropertyOrClassStaticBlock(node, factory.createThis());
                if (statement) {
                    return factory.createClassStaticBlockDeclaration(factory.createBlock([statement], /*multiLine*/ true));
                }
            }

            return undefined;
        }

        if (shouldTransformInitializersUsingSet && !isStatic(node) && lexicalEnvironment?.data && lexicalEnvironment.data.facts & ClassFacts.WillHoistInitializersToConstructor) {
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
                /*initializer*/ undefined,
            );
        }

        if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
            node = transformNamedEvaluation(context, node);
        }

        return factory.updatePropertyDeclaration(
            node,
            visitNodes(node.modifiers, modifierVisitor, isModifier),
            visitNode(node.name, propertyNameVisitor, isPropertyName),
            /*questionOrExclamationToken*/ undefined,
            /*type*/ undefined,
            visitNode(node.initializer, visitor, isExpression),
        );
    }

    function transformPublicFieldInitializer(node: PropertyDeclaration) {
        if (shouldTransformInitializers && !isAutoAccessorPropertyDeclaration(node)) {
            // Create a temporary variable to store a computed property name (if necessary).
            // If it's not inlineable, then we emit an expression after the class which assigns
            // the property name to the temporary variable.

            const expr = getPropertyNameExpressionIfNeeded(
                node.name,
                /*shouldHoist*/ !!node.initializer || useDefineForClassFields,
            );
            if (expr) {
                getPendingExpressions().push(...flattenCommaList(expr));
            }

            if (isStatic(node) && !shouldTransformPrivateElementsOrClassStaticBlocks) {
                const initializerStatement = transformPropertyOrClassStaticBlock(node, factory.createThis());
                if (initializerStatement) {
                    const staticBlock = factory.createClassStaticBlockDeclaration(
                        factory.createBlock([initializerStatement]),
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

        return factory.updatePropertyDeclaration(
            node,
            visitNodes(node.modifiers, modifierVisitor, isModifier),
            visitNode(node.name, propertyNameVisitor, isPropertyName),
            /*questionOrExclamationToken*/ undefined,
            /*type*/ undefined,
            visitNode(node.initializer, visitor, isExpression),
        );
    }

    function transformFieldInitializer(node: PropertyDeclaration) {
        Debug.assert(!hasDecorators(node), "Decorators should already have been transformed and elided.");
        return isPrivateIdentifierClassElementDeclaration(node) ?
            transformPrivateFieldInitializer(node) :
            transformPublicFieldInitializer(node);
    }

    function shouldTransformAutoAccessorsInCurrentClass() {
        return shouldTransformAutoAccessors === Ternary.True ||
            shouldTransformAutoAccessors === Ternary.Maybe &&
                !!lexicalEnvironment?.data && !!(lexicalEnvironment.data.facts & ClassFacts.WillHoistInitializersToConstructor);
    }

    function visitPropertyDeclaration(node: PropertyDeclaration) {
        // If this is an auto-accessor, we defer to `transformAutoAccessor`. That function
        // will in turn call `transformFieldInitializer` as needed.
        if (
            isAutoAccessorPropertyDeclaration(node) && (shouldTransformAutoAccessorsInCurrentClass() ||
                hasStaticModifier(node) && getInternalEmitFlags(node) & InternalEmitFlags.TransformPrivateStaticElements)
        ) {
            return transformAutoAccessor(node);
        }

        return transformFieldInitializer(node);
    }

    function shouldForceDynamicThis() {
        return !!currentClassElement &&
            hasStaticModifier(currentClassElement) &&
            isAccessor(currentClassElement) &&
            isAutoAccessorPropertyDeclaration(getOriginalNode(currentClassElement));
    }

    /**
     * Prevent substitution of `this` to `_classThis` in static getters and setters that wrap `accessor` fields.
     */
    function ensureDynamicThisIfNeeded(node: Expression) {
        if (shouldForceDynamicThis()) {
            // do not substitute `this` with `_classThis` when `this`
            // should be bound dynamically.
            const innerExpression = skipOuterExpressions(node);
            if (innerExpression.kind === SyntaxKind.ThisKeyword) {
                noSubstitution.add(innerExpression);
            }
        }
    }

    function createPrivateIdentifierAccess(info: PrivateIdentifierInfo, receiver: Expression): Expression {
        receiver = visitNode(receiver, visitor, isExpression);
        ensureDynamicThisIfNeeded(receiver);
        return createPrivateIdentifierAccessHelper(info, receiver);
    }

    function createPrivateIdentifierAccessHelper(info: PrivateIdentifierInfo, receiver: Expression): Expression {
        setCommentRange(receiver, moveRangePos(receiver, -1));

        switch (info.kind) {
            case PrivateIdentifierKind.Accessor:
                return emitHelpers().createClassPrivateFieldGetHelper(
                    receiver,
                    info.brandCheckIdentifier,
                    info.kind,
                    info.getterName,
                );
            case PrivateIdentifierKind.Method:
                return emitHelpers().createClassPrivateFieldGetHelper(
                    receiver,
                    info.brandCheckIdentifier,
                    info.kind,
                    info.methodName,
                );
            case PrivateIdentifierKind.Field:
                return emitHelpers().createClassPrivateFieldGetHelper(
                    receiver,
                    info.brandCheckIdentifier,
                    info.kind,
                    info.isStatic ? info.variableName : undefined,
                );
            case "untransformed":
                return Debug.fail("Access helpers should not be created for untransformed private elements");

            default:
                Debug.assertNever(info, "Unknown private element type");
        }
    }

    function visitPropertyAccessExpression(node: PropertyAccessExpression) {
        if (isPrivateIdentifier(node.name)) {
            const privateIdentifierInfo = accessPrivateIdentifier(node.name);
            if (privateIdentifierInfo) {
                return setTextRange(
                    setOriginalNode(
                        createPrivateIdentifierAccess(privateIdentifierInfo, node.expression),
                        node,
                    ),
                    node,
                );
            }
        }
        if (
            shouldTransformSuperInStaticInitializers &&
            currentClassElement &&
            isSuperProperty(node) &&
            isIdentifier(node.name) &&
            isStaticPropertyDeclarationOrClassStaticBlock(currentClassElement) &&
            lexicalEnvironment?.data
        ) {
            const { classConstructor, superClassReference, facts } = lexicalEnvironment.data;
            if (facts & ClassFacts.ClassWasDecorated) {
                return visitInvalidSuperProperty(node);
            }
            if (classConstructor && superClassReference) {
                // converts `super.x` into `Reflect.get(_baseTemp, "x", _classTemp)`
                const superProperty = factory.createReflectGetCall(
                    superClassReference,
                    factory.createStringLiteralFromNode(node.name),
                    classConstructor,
                );
                setOriginalNode(superProperty, node.expression);
                setTextRange(superProperty, node.expression);
                return superProperty;
            }
        }
        return visitEachChild(node, visitor, context);
    }

    function visitElementAccessExpression(node: ElementAccessExpression) {
        if (
            shouldTransformSuperInStaticInitializers &&
            currentClassElement &&
            isSuperProperty(node) &&
            isStaticPropertyDeclarationOrClassStaticBlock(currentClassElement) &&
            lexicalEnvironment?.data
        ) {
            const { classConstructor, superClassReference, facts } = lexicalEnvironment.data;
            if (facts & ClassFacts.ClassWasDecorated) {
                return visitInvalidSuperProperty(node);
            }

            if (classConstructor && superClassReference) {
                // converts `super[x]` into `Reflect.get(_baseTemp, x, _classTemp)`
                const superProperty = factory.createReflectGetCall(
                    superClassReference,
                    visitNode(node.argumentExpression, visitor, isExpression),
                    classConstructor,
                );
                setOriginalNode(superProperty, node.expression);
                setTextRange(superProperty, node.expression);
                return superProperty;
            }
        }
        return visitEachChild(node, visitor, context);
    }

    function visitPreOrPostfixUnaryExpression(node: PrefixUnaryExpression | PostfixUnaryExpression, discarded: boolean) {
        if (
            node.operator === SyntaxKind.PlusPlusToken ||
            node.operator === SyntaxKind.MinusMinusToken
        ) {
            const operand = skipParentheses(node.operand);

            if (isPrivateIdentifierPropertyAccessExpression(operand)) {
                let info: PrivateIdentifierInfo | undefined;
                if (info = accessPrivateIdentifier(operand.name)) {
                    const receiver = visitNode(operand.expression, visitor, isExpression);
                    ensureDynamicThisIfNeeded(receiver);
                    const { readExpression, initializeExpression } = createCopiableReceiverExpr(receiver);

                    let expression: Expression = createPrivateIdentifierAccess(info, readExpression);
                    const temp = isPrefixUnaryExpression(node) || discarded ? undefined : factory.createTempVariable(hoistVariableDeclaration);
                    expression = expandPreOrPostfixIncrementOrDecrementExpression(factory, node, expression, hoistVariableDeclaration, temp);
                    expression = createPrivateIdentifierAssignment(
                        info,
                        initializeExpression || readExpression,
                        expression,
                        SyntaxKind.EqualsToken,
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
            else if (
                shouldTransformSuperInStaticInitializers &&
                currentClassElement &&
                isSuperProperty(operand) &&
                isStaticPropertyDeclarationOrClassStaticBlock(currentClassElement) &&
                lexicalEnvironment?.data
            ) {
                // converts `++super.a` into `(Reflect.set(_baseTemp, "a", (_a = Reflect.get(_baseTemp, "a", _classTemp), _b = ++_a), _classTemp), _b)`
                // converts `++super[f()]` into `(Reflect.set(_baseTemp, _a = f(), (_b = Reflect.get(_baseTemp, _a, _classTemp), _c = ++_b), _classTemp), _c)`
                // converts `--super.a` into `(Reflect.set(_baseTemp, "a", (_a = Reflect.get(_baseTemp, "a", _classTemp), _b = --_a), _classTemp), _b)`
                // converts `--super[f()]` into `(Reflect.set(_baseTemp, _a = f(), (_b = Reflect.get(_baseTemp, _a, _classTemp), _c = --_b), _classTemp), _c)`
                // converts `super.a++` into `(Reflect.set(_baseTemp, "a", (_a = Reflect.get(_baseTemp, "a", _classTemp), _b = _a++), _classTemp), _b)`
                // converts `super[f()]++` into `(Reflect.set(_baseTemp, _a = f(), (_b = Reflect.get(_baseTemp, _a, _classTemp), _c = _b++), _classTemp), _c)`
                // converts `super.a--` into `(Reflect.set(_baseTemp, "a", (_a = Reflect.get(_baseTemp, "a", _classTemp), _b = _a--), _classTemp), _b)`
                // converts `super[f()]--` into `(Reflect.set(_baseTemp, _a = f(), (_b = Reflect.get(_baseTemp, _a, _classTemp), _c = _b--), _classTemp), _c)`
                const { classConstructor, superClassReference, facts } = lexicalEnvironment.data;
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

                        const temp = discarded ? undefined : factory.createTempVariable(hoistVariableDeclaration);
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
            visitIterationBody(node.statement, visitor, context),
        );
    }

    function visitExpressionStatement(node: ExpressionStatement) {
        return factory.updateExpressionStatement(
            node,
            visitNode(node.expression, discardedValueVisitor, isExpression),
        );
    }

    function createCopiableReceiverExpr(receiver: Expression): { readExpression: Expression; initializeExpression: Expression | undefined; } {
        const clone = nodeIsSynthesized(receiver) ? receiver : factory.cloneNode(receiver);
        if (receiver.kind === SyntaxKind.ThisKeyword && noSubstitution.has(receiver)) {
            noSubstitution.add(clone);
        }
        if (isSimpleInlineableExpression(receiver)) {
            return { readExpression: clone, initializeExpression: undefined };
        }
        const readExpression = factory.createTempVariable(hoistVariableDeclaration);
        const initializeExpression = factory.createAssignment(readExpression, clone);
        return { readExpression, initializeExpression };
    }

    function visitCallExpression(node: CallExpression) {
        if (
            isPrivateIdentifierPropertyAccessExpression(node.expression) &&
            accessPrivateIdentifier(node.expression.name)
        ) {
            // obj.#x()

            // Transform call expressions of private names to properly bind the `this` parameter.
            const { thisArg, target } = factory.createCallBinding(node.expression, hoistVariableDeclaration, languageVersion);
            if (isCallChain(node)) {
                return factory.updateCallChain(
                    node,
                    factory.createPropertyAccessChain(visitNode(target, visitor, isExpression), node.questionDotToken, "call"),
                    /*questionDotToken*/ undefined,
                    /*typeArguments*/ undefined,
                    [visitNode(thisArg, visitor, isExpression), ...visitNodes(node.arguments, visitor, isExpression)],
                );
            }
            return factory.updateCallExpression(
                node,
                factory.createPropertyAccessExpression(visitNode(target, visitor, isExpression), "call"),
                /*typeArguments*/ undefined,
                [visitNode(thisArg, visitor, isExpression), ...visitNodes(node.arguments, visitor, isExpression)],
            );
        }

        if (
            shouldTransformSuperInStaticInitializers &&
            currentClassElement &&
            isSuperProperty(node.expression) &&
            isStaticPropertyDeclarationOrClassStaticBlock(currentClassElement) &&
            lexicalEnvironment?.data?.classConstructor
        ) {
            // super.x()
            // super[x]()

            // converts `super.f(...)` into `Reflect.get(_baseTemp, "f", _classTemp).call(_classTemp, ...)`
            const invocation = factory.createFunctionCallCall(
                visitNode(node.expression, visitor, isExpression),
                lexicalEnvironment.data.classConstructor,
                visitNodes(node.arguments, visitor, isExpression),
            );
            setOriginalNode(invocation, node);
            setTextRange(invocation, node);
            return invocation;
        }

        return visitEachChild(node, visitor, context);
    }

    function visitTaggedTemplateExpression(node: TaggedTemplateExpression) {
        if (
            isPrivateIdentifierPropertyAccessExpression(node.tag) &&
            accessPrivateIdentifier(node.tag.name)
        ) {
            // Bind the `this` correctly for tagged template literals when the tag is a private identifier property access.
            const { thisArg, target } = factory.createCallBinding(node.tag, hoistVariableDeclaration, languageVersion);
            return factory.updateTaggedTemplateExpression(
                node,
                factory.createCallExpression(
                    factory.createPropertyAccessExpression(visitNode(target, visitor, isExpression), "bind"),
                    /*typeArguments*/ undefined,
                    [visitNode(thisArg, visitor, isExpression)],
                ),
                /*typeArguments*/ undefined,
                visitNode(node.template, visitor, isTemplateLiteral),
            );
        }
        if (
            shouldTransformSuperInStaticInitializers &&
            currentClassElement &&
            isSuperProperty(node.tag) &&
            isStaticPropertyDeclarationOrClassStaticBlock(currentClassElement) &&
            lexicalEnvironment?.data?.classConstructor
        ) {
            // converts `` super.f`x` `` into `` Reflect.get(_baseTemp, "f", _classTemp).bind(_classTemp)`x` ``
            const invocation = factory.createFunctionBindCall(
                visitNode(node.tag, visitor, isExpression),
                lexicalEnvironment.data.classConstructor,
                [],
            );
            setOriginalNode(invocation, node);
            setTextRange(invocation, node);
            return factory.updateTaggedTemplateExpression(
                node,
                invocation,
                /*typeArguments*/ undefined,
                visitNode(node.template, visitor, isTemplateLiteral),
            );
        }
        return visitEachChild(node, visitor, context);
    }

    function transformClassStaticBlockDeclaration(node: ClassStaticBlockDeclaration) {
        if (lexicalEnvironment) {
            lexicalEnvironmentMap.set(getOriginalNode(node), lexicalEnvironment);
        }

        if (shouldTransformPrivateElementsOrClassStaticBlocks) {
            if (isClassThisAssignmentBlock(node)) {
                const result = visitNode(node.body.statements[0].expression, visitor, isExpression);
                // If the generated `_classThis` assignment is a noop (i.e., `_classThis = _classThis`), we can
                // eliminate the expression
                if (
                    isAssignmentExpression(result, /*excludeCompoundAssignment*/ true) &&
                    result.left === result.right
                ) {
                    return undefined;
                }
                return result;
            }

            if (isClassNamedEvaluationHelperBlock(node)) {
                return visitNode(node.body.statements[0].expression, visitor, isExpression);
            }

            startLexicalEnvironment();
            let statements = setCurrentClassElementAnd(
                node,
                statements => visitNodes(statements, visitor, isStatement),
                node.body.statements,
            );
            statements = factory.mergeLexicalEnvironment(statements, endLexicalEnvironment());

            const iife = factory.createImmediatelyInvokedArrowFunction(statements);
            setOriginalNode(skipParentheses(iife.expression), node);
            addEmitFlags(skipParentheses(iife.expression), EmitFlags.AdviseOnEmitNode);
            setOriginalNode(iife, node);
            setTextRange(iife, node);
            return iife;
        }
    }

    function isAnonymousClassNeedingAssignedName(node: AnonymousFunctionDefinition) {
        if (isClassExpression(node) && !node.name) {
            const staticPropertiesOrClassStaticBlocks = getStaticPropertiesAndClassStaticBlock(node);
            if (some(staticPropertiesOrClassStaticBlocks, isClassNamedEvaluationHelperBlock)) {
                return false;
            }

            const hasTransformableStatics = (shouldTransformPrivateElementsOrClassStaticBlocks ||
                !!(getInternalEmitFlags(node) && InternalEmitFlags.TransformPrivateStaticElements)) &&
                some(staticPropertiesOrClassStaticBlocks, node =>
                    isClassStaticBlockDeclaration(node) ||
                    isPrivateIdentifierClassElementDeclaration(node) ||
                    shouldTransformInitializers && isInitializedProperty(node));
            return hasTransformableStatics;
        }
        return false;
    }

    function visitBinaryExpression(node: BinaryExpression, discarded: boolean) {
        if (isDestructuringAssignment(node)) {
            // ({ x: obj.#x } = ...)
            // ({ x: super.x } = ...)
            // ({ x: super[x] } = ...)
            const savedPendingExpressions = pendingExpressions;
            pendingExpressions = undefined;
            node = factory.updateBinaryExpression(
                node,
                visitNode(node.left, assignmentTargetVisitor, isExpression),
                node.operatorToken,
                visitNode(node.right, visitor, isExpression),
            );
            const expr = some(pendingExpressions) ?
                factory.inlineExpressions(compact([...pendingExpressions, node])) :
                node;
            pendingExpressions = savedPendingExpressions;
            return expr;
        }
        if (isAssignmentExpression(node)) {
            // 13.15.2 RS: Evaluation
            //   AssignmentExpression : LeftHandSideExpression `=` AssignmentExpression
            //     1. If |LeftHandSideExpression| is neither an |ObjectLiteral| nor an |ArrayLiteral|, then
            //        a. Let _lref_ be ? Evaluation of |LeftHandSideExpression|.
            //        b. If IsAnonymousFunctionDefinition(|AssignmentExpression|) and IsIdentifierRef of |LeftHandSideExpression| are both *true*, then
            //           i. Let _rval_ be ? NamedEvaluation of |AssignmentExpression| with argument _lref_.[[ReferencedName]].
            //     ...
            //
            //   AssignmentExpression : LeftHandSideExpression `&&=` AssignmentExpression
            //     ...
            //     5. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true* and IsIdentifierRef of |LeftHandSideExpression| is *true*, then
            //        a. Let _rval_ be ? NamedEvaluation of |AssignmentExpression| with argument _lref_.[[ReferencedName]].
            //     ...
            //
            //   AssignmentExpression : LeftHandSideExpression `||=` AssignmentExpression
            //     ...
            //     5. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true* and IsIdentifierRef of |LeftHandSideExpression| is *true*, then
            //        a. Let _rval_ be ? NamedEvaluation of |AssignmentExpression| with argument _lref_.[[ReferencedName]].
            //     ...
            //
            //   AssignmentExpression : LeftHandSideExpression `??=` AssignmentExpression
            //     ...
            //     4. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true* and IsIdentifierRef of |LeftHandSideExpression| is *true*, then
            //        a. Let _rval_ be ? NamedEvaluation of |AssignmentExpression| with argument _lref_.[[ReferencedName]].
            //     ...

            if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
                node = transformNamedEvaluation(context, node);
                Debug.assertNode(node, isAssignmentExpression);
            }

            const left = skipOuterExpressions(node.left, OuterExpressionKinds.PartiallyEmittedExpressions | OuterExpressionKinds.Parentheses);
            if (isPrivateIdentifierPropertyAccessExpression(left)) {
                // obj.#x = ...
                const info = accessPrivateIdentifier(left.name);
                if (info) {
                    return setTextRange(
                        setOriginalNode(
                            createPrivateIdentifierAssignment(info, left.expression, node.right, node.operatorToken.kind),
                            node,
                        ),
                        node,
                    );
                }
            }
            else if (
                shouldTransformSuperInStaticInitializers &&
                currentClassElement &&
                isSuperProperty(node.left) &&
                isStaticPropertyDeclarationOrClassStaticBlock(currentClassElement) &&
                lexicalEnvironment?.data
            ) {
                // super.x = ...
                // super[x] = ...
                // super.x += ...
                // super.x -= ...
                const { classConstructor, superClassReference, facts } = lexicalEnvironment.data;
                if (facts & ClassFacts.ClassWasDecorated) {
                    return factory.updateBinaryExpression(
                        node,
                        visitInvalidSuperProperty(node.left),
                        node.operatorToken,
                        visitNode(node.right, visitor, isExpression),
                    );
                }
                if (classConstructor && superClassReference) {
                    let setterName = isElementAccessExpression(node.left) ? visitNode(node.left.argumentExpression, visitor, isExpression) :
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
                                classConstructor,
                            );
                            setOriginalNode(superPropertyGet, node.left);
                            setTextRange(superPropertyGet, node.left);
                            expression = factory.createBinaryExpression(
                                superPropertyGet,
                                getNonAssignmentOperatorForCompoundAssignment(node.operatorToken.kind),
                                expression,
                            );
                            setTextRange(expression, node);
                        }

                        const temp = discarded ? undefined : factory.createTempVariable(hoistVariableDeclaration);
                        if (temp) {
                            expression = factory.createAssignment(temp, expression);
                            setTextRange(temp, node);
                        }

                        expression = factory.createReflectSetCall(
                            superClassReference,
                            setterName,
                            expression,
                            classConstructor,
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
        if (isPrivateIdentifierInExpression(node)) {
            // #x in obj
            return transformPrivateIdentifierInInExpression(node);
        }
        return visitEachChild(node, visitor, context);
    }

    function visitCommaListExpression(node: CommaListExpression, discarded: boolean) {
        const elements = discarded ?
            visitCommaListElements(node.elements, discardedValueVisitor) :
            visitCommaListElements(node.elements, visitor, discardedValueVisitor);
        return factory.updateCommaListExpression(node, elements);
    }

    function visitParenthesizedExpression(node: ParenthesizedExpression, discarded: boolean) {
        // 8.4.5 RS: NamedEvaluation
        //   ParenthesizedExpression : `(` Expression `)`
        //     ...
        //     2. Return ? NamedEvaluation of |Expression| with argument _name_.

        const visitorFunc: Visitor<Node, Node> = discarded ? discardedValueVisitor :
            visitor;
        const expression = visitNode(node.expression, visitorFunc, isExpression);
        return factory.updateParenthesizedExpression(node, expression);
    }

    function createPrivateIdentifierAssignment(info: PrivateIdentifierInfo, receiver: Expression, right: Expression, operator: AssignmentOperator): Expression {
        receiver = visitNode(receiver, visitor, isExpression);
        right = visitNode(right, visitor, isExpression);
        ensureDynamicThisIfNeeded(receiver);

        if (isCompoundAssignment(operator)) {
            const { readExpression, initializeExpression } = createCopiableReceiverExpr(receiver);
            receiver = initializeExpression || readExpression;
            right = factory.createBinaryExpression(
                createPrivateIdentifierAccessHelper(info, readExpression),
                getNonAssignmentOperatorForCompoundAssignment(operator),
                right,
            );
        }

        setCommentRange(receiver, moveRangePos(receiver, -1));

        switch (info.kind) {
            case PrivateIdentifierKind.Accessor:
                return emitHelpers().createClassPrivateFieldSetHelper(
                    receiver,
                    info.brandCheckIdentifier,
                    right,
                    info.kind,
                    info.setterName,
                );
            case PrivateIdentifierKind.Method:
                return emitHelpers().createClassPrivateFieldSetHelper(
                    receiver,
                    info.brandCheckIdentifier,
                    right,
                    info.kind,
                    /*f*/ undefined,
                );
            case PrivateIdentifierKind.Field:
                return emitHelpers().createClassPrivateFieldSetHelper(
                    receiver,
                    info.brandCheckIdentifier,
                    right,
                    info.kind,
                    info.isStatic ? info.variableName : undefined,
                );
            case "untransformed":
                return Debug.fail("Access helpers should not be created for untransformed private elements");

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
        if (isClassLike(original) && classOrConstructorParameterIsDecorated(legacyDecorators, original)) {
            facts |= ClassFacts.ClassWasDecorated;
        }
        if (shouldTransformPrivateElementsOrClassStaticBlocks && (classHasClassThisAssignment(node) || classHasExplicitlyAssignedName(node))) {
            facts |= ClassFacts.NeedsClassConstructorReference;
        }
        let containsPublicInstanceFields = false;
        let containsInitializedPublicInstanceFields = false;
        let containsInstancePrivateElements = false;
        let containsInstanceAutoAccessors = false;
        for (const member of node.members) {
            if (isStatic(member)) {
                if (
                    member.name && (isPrivateIdentifier(member.name) || isAutoAccessorPropertyDeclaration(member)) &&
                    shouldTransformPrivateElementsOrClassStaticBlocks
                ) {
                    facts |= ClassFacts.NeedsClassConstructorReference;
                }
                else if (isAutoAccessorPropertyDeclaration(member) && shouldTransformAutoAccessors === Ternary.True && !node.name && !node.emitNode?.classThis) {
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
            else if (!hasAbstractModifier(getOriginalNode(member))) {
                if (isAutoAccessorPropertyDeclaration(member)) {
                    containsInstanceAutoAccessors = true;
                    containsInstancePrivateElements ||= isPrivateIdentifierClassElementDeclaration(member);
                }
                else if (isPrivateIdentifierClassElementDeclaration(member)) {
                    containsInstancePrivateElements = true;
                    if (resolver.hasNodeCheckFlag(member, NodeCheckFlags.ContainsConstructorReference)) {
                        facts |= ClassFacts.NeedsClassConstructorReference;
                    }
                }
                else if (isPropertyDeclaration(member)) {
                    containsPublicInstanceFields = true;
                    containsInitializedPublicInstanceFields ||= !!member.initializer;
                }
            }
        }

        const willHoistInitializersToConstructor = shouldTransformInitializersUsingDefine && containsPublicInstanceFields ||
            shouldTransformInitializersUsingSet && containsInitializedPublicInstanceFields ||
            shouldTransformPrivateElementsOrClassStaticBlocks && containsInstancePrivateElements ||
            shouldTransformPrivateElementsOrClassStaticBlocks && containsInstanceAutoAccessors && shouldTransformAutoAccessors === Ternary.True;

        if (willHoistInitializersToConstructor) {
            facts |= ClassFacts.WillHoistInitializersToConstructor;
        }

        return facts;
    }

    function visitExpressionWithTypeArgumentsInHeritageClause(node: ExpressionWithTypeArguments) {
        const facts = lexicalEnvironment?.data?.facts || ClassFacts.None;
        if (facts & ClassFacts.NeedsClassSuperReference) {
            const temp = factory.createTempVariable(hoistVariableDeclaration, /*reservedInNestedScopes*/ true);
            getClassLexicalEnvironment().superClassReference = temp;
            return factory.updateExpressionWithTypeArguments(
                node,
                factory.createAssignment(
                    temp,
                    visitNode(node.expression, visitor, isExpression),
                ),
                /*typeArguments*/ undefined,
            );
        }
        return visitEachChild(node, visitor, context);
    }

    function visitInNewClassLexicalEnvironment<T extends ClassLikeDeclaration, U>(node: T, visitor: (node: T, facts: ClassFacts) => U) {
        const savedCurrentClassContainer = currentClassContainer;
        const savedPendingExpressions = pendingExpressions;
        const savedLexicalEnvironment = lexicalEnvironment;
        currentClassContainer = node;
        pendingExpressions = undefined;
        startClassLexicalEnvironment();

        const shouldAlwaysTransformPrivateStaticElements = getInternalEmitFlags(node) & InternalEmitFlags.TransformPrivateStaticElements;
        if (shouldTransformPrivateElementsOrClassStaticBlocks || shouldAlwaysTransformPrivateStaticElements) {
            const name = getNameOfDeclaration(node);
            if (name && isIdentifier(name)) {
                getPrivateIdentifierEnvironment().data.className = name;
            }
            else if (node.emitNode?.assignedName) {
                if (isStringLiteral(node.emitNode.assignedName)) {
                    // If the class name was assigned from a string literal based on an Identifier, use the Identifier
                    // as the prefix.
                    if (
                        node.emitNode.assignedName.textSourceNode &&
                        isIdentifier(node.emitNode.assignedName.textSourceNode)
                    ) {
                        getPrivateIdentifierEnvironment().data.className = node.emitNode.assignedName.textSourceNode;
                    }
                    // If the class name was assigned from a string literal that is a valid identifier, create an
                    // identifier from it.
                    else if (isIdentifierText(node.emitNode.assignedName.text, languageVersion)) {
                        const prefixName = factory.createIdentifier(node.emitNode.assignedName.text);
                        getPrivateIdentifierEnvironment().data.className = prefixName;
                    }
                }
            }
        }

        if (shouldTransformPrivateElementsOrClassStaticBlocks) {
            const privateInstanceMethodsAndAccessors = getPrivateInstanceMethodsAndAccessors(node);
            if (some(privateInstanceMethodsAndAccessors)) {
                getPrivateIdentifierEnvironment().data.weakSetName = createHoistedVariableForClass(
                    "instances",
                    privateInstanceMethodsAndAccessors[0].name,
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
        Debug.assert(lexicalEnvironment === savedLexicalEnvironment);
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
            // If we aren't transforming class static blocks, then we can't reuse `_classThis` since in
            // `class C { ... static { _classThis = ... } }; _classThis = C` the outer assignment would occur *after*
            // class static blocks evaluate and would overwrite the replacement constructor produced by class
            // decorators.

            // If we are transforming class static blocks, then we can reuse `_classThis` since the assignment
            // will be evaluated *before* the transformed static blocks are evaluated and thus won't overwrite
            // the replacement constructor.

            if (shouldTransformPrivateElementsOrClassStaticBlocks && node.emitNode?.classThis) {
                getClassLexicalEnvironment().classConstructor = node.emitNode.classThis;
                pendingClassReferenceAssignment = factory.createAssignment(node.emitNode.classThis, factory.getInternalName(node));
            }
            else {
                const temp = factory.createTempVariable(hoistVariableDeclaration, /*reservedInNestedScopes*/ true);
                getClassLexicalEnvironment().classConstructor = factory.cloneNode(temp);
                pendingClassReferenceAssignment = factory.createAssignment(temp, factory.getInternalName(node));
            }
        }

        if (node.emitNode?.classThis) {
            getClassLexicalEnvironment().classThis = node.emitNode.classThis;
        }

        const isClassWithConstructorReference = resolver.hasNodeCheckFlag(node, NodeCheckFlags.ContainsConstructorReference);
        const isExport = hasSyntacticModifier(node, ModifierFlags.Export);
        const isDefault = hasSyntacticModifier(node, ModifierFlags.Default);
        let modifiers = visitNodes(node.modifiers, modifierVisitor, isModifier);
        const heritageClauses = visitNodes(node.heritageClauses, heritageClauseVisitor, isHeritageClause);
        const { members, prologue } = transformClassMembers(node);

        const statements: Statement[] = [];
        if (pendingClassReferenceAssignment) {
            getPendingExpressions().unshift(pendingClassReferenceAssignment);
        }

        // Write any pending expressions from elided or moved computed property names
        if (some(pendingExpressions)) {
            statements.push(factory.createExpressionStatement(factory.inlineExpressions(pendingExpressions)));
        }

        if (shouldTransformInitializersUsingSet || shouldTransformPrivateElementsOrClassStaticBlocks || getInternalEmitFlags(node) & InternalEmitFlags.TransformPrivateStaticElements) {
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

        if (statements.length > 0 && isExport && isDefault) {
            modifiers = visitNodes(modifiers, node => isExportOrDefaultModifier(node) ? undefined : node, isModifier);
            statements.push(factory.createExportAssignment(
                /*modifiers*/ undefined,
                /*isExportEquals*/ false,
                factory.getLocalName(node, /*allowComments*/ false, /*allowSourceMaps*/ true),
            ));
        }

        const alias = getClassLexicalEnvironment().classConstructor;
        if (isClassWithConstructorReference && alias) {
            enableSubstitutionForClassAliases();
            classAliases[getOriginalNodeId(node)] = alias;
        }

        const classDecl = factory.updateClassDeclaration(
            node,
            modifiers,
            node.name,
            /*typeParameters*/ undefined,
            heritageClauses,
            members,
        );
        statements.unshift(classDecl);

        if (prologue) {
            statements.unshift(factory.createExpressionStatement(prologue));
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
        const isClassWithConstructorReference = resolver.hasNodeCheckFlag(node, NodeCheckFlags.ContainsConstructorReference);
        const requiresBlockScopedVar = resolver.hasNodeCheckFlag(node, NodeCheckFlags.BlockScopedBindingInLoop);

        let temp: Identifier | undefined;
        function createClassTempVar() {
            // If we aren't transforming class static blocks, then we can't reuse `_classThis` since in
            // `_classThis = class { ... static { _classThis = ... } }` the outer assignment would occur *after*
            // class static blocks evaluate and would overwrite the replacement constructor produced by class
            // decorators.

            // If we are transforming class static blocks, then we can reuse `_classThis` since the assignment
            // will be evaluated *before* the transformed static blocks are evaluated and thus won't overwrite
            // the replacement constructor.

            if (shouldTransformPrivateElementsOrClassStaticBlocks && node.emitNode?.classThis) {
                return getClassLexicalEnvironment().classConstructor = node.emitNode.classThis;
            }

            const temp = factory.createTempVariable(requiresBlockScopedVar ? addBlockScopedVariable : hoistVariableDeclaration, /*reservedInNestedScopes*/ true);
            getClassLexicalEnvironment().classConstructor = factory.cloneNode(temp);
            return temp;
        }

        if (node.emitNode?.classThis) {
            getClassLexicalEnvironment().classThis = node.emitNode.classThis;
        }

        if (facts & ClassFacts.NeedsClassConstructorReference) {
            temp ??= createClassTempVar();
        }

        const modifiers = visitNodes(node.modifiers, modifierVisitor, isModifier);
        const heritageClauses = visitNodes(node.heritageClauses, heritageClauseVisitor, isHeritageClause);
        const { members, prologue } = transformClassMembers(node);
        const classExpression = factory.updateClassExpression(
            node,
            modifiers,
            node.name,
            /*typeParameters*/ undefined,
            heritageClauses,
            members,
        );

        const expressions: Expression[] = [];
        if (prologue) {
            expressions.push(prologue);
        }

        // Static initializers are transformed to `static {}` blocks when `useDefineForClassFields: false`
        // and not also transforming static blocks.
        const hasTransformableStatics = (shouldTransformPrivateElementsOrClassStaticBlocks || getInternalEmitFlags(node) & InternalEmitFlags.TransformPrivateStaticElements) &&
            some(staticPropertiesOrClassStaticBlocks, node =>
                isClassStaticBlockDeclaration(node) ||
                isPrivateIdentifierClassElementDeclaration(node) ||
                shouldTransformInitializers && isInitializedProperty(node));

        if (hasTransformableStatics || some(pendingExpressions)) {
            if (isDecoratedClassDeclaration) {
                Debug.assertIsDefined(pendingStatements, "Decorated classes transformed by TypeScript are expected to be within a variable declaration.");

                // Write any pending expressions from elided or moved computed property names
                if (some(pendingExpressions)) {
                    addRange(pendingStatements, map(pendingExpressions, factory.createExpressionStatement));
                }

                if (some(staticPropertiesOrClassStaticBlocks)) {
                    addPropertyOrClassStaticBlockStatements(pendingStatements, staticPropertiesOrClassStaticBlocks, node.emitNode?.classThis ?? factory.getInternalName(node));
                }

                if (temp) {
                    expressions.push(factory.createAssignment(temp, classExpression));
                }
                else if (shouldTransformPrivateElementsOrClassStaticBlocks && node.emitNode?.classThis) {
                    expressions.push(factory.createAssignment(node.emitNode.classThis, classExpression));
                }
                else {
                    expressions.push(classExpression);
                }
            }
            else {
                temp ??= createClassTempVar();
                if (isClassWithConstructorReference) {
                    // record an alias as the class name is not in scope for statics.
                    enableSubstitutionForClassAliases();
                    const alias = factory.cloneNode(temp) as GeneratedIdentifier;
                    alias.emitNode.autoGenerate.flags &= ~GeneratedIdentifierFlags.ReservedInNestedScopes;
                    classAliases[getOriginalNodeId(node)] = alias;
                }

                expressions.push(factory.createAssignment(temp, classExpression));

                // Add any pending expressions leftover from elided or relocated computed property names
                addRange(expressions, pendingExpressions);
                addRange(expressions, generateInitializedPropertyExpressionsOrClassStaticBlock(staticPropertiesOrClassStaticBlocks, temp));
                expressions.push(factory.cloneNode(temp));
            }
        }
        else {
            expressions.push(classExpression);
        }

        if (expressions.length > 1) {
            // To preserve the behavior of the old emitter, we explicitly indent
            // the body of a class with static initializers.
            addEmitFlags(classExpression, EmitFlags.Indented);
            expressions.forEach(startOnNewLine);
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

    function visitThisExpression(node: ThisExpression) {
        if (
            shouldTransformThisInStaticInitializers && currentClassElement &&
            isClassStaticBlockDeclaration(currentClassElement) &&
            lexicalEnvironment?.data
        ) {
            const { classThis, classConstructor } = lexicalEnvironment.data;
            return classThis ?? classConstructor ?? node;
        }

        return node;
    }

    function transformClassMembers(node: ClassDeclaration | ClassExpression) {
        const shouldTransformPrivateStaticElementsInClass = !!(getInternalEmitFlags(node) & InternalEmitFlags.TransformPrivateStaticElements);

        // Declare private names
        if (shouldTransformPrivateElementsOrClassStaticBlocks || shouldTransformPrivateStaticElementsInFile) {
            for (const member of node.members) {
                if (isPrivateIdentifierClassElementDeclaration(member)) {
                    if (shouldTransformClassElementToWeakMap(member)) {
                        addPrivateIdentifierToEnvironment(member, member.name, addPrivateIdentifierClassElementToEnvironment);
                    }
                    else {
                        const privateEnv = getPrivateIdentifierEnvironment();
                        setPrivateIdentifier(privateEnv, member.name, { kind: "untransformed" });
                    }
                }
            }

            if (shouldTransformPrivateElementsOrClassStaticBlocks) {
                if (some(getPrivateInstanceMethodsAndAccessors(node))) {
                    createBrandCheckWeakSetForPrivateMethods();
                }
            }

            if (shouldTransformAutoAccessorsInCurrentClass()) {
                for (const member of node.members) {
                    if (isAutoAccessorPropertyDeclaration(member)) {
                        const storageName = factory.getGeneratedPrivateNameForNode(member.name, /*prefix*/ undefined, "_accessor_storage");
                        if (
                            shouldTransformPrivateElementsOrClassStaticBlocks ||
                            shouldTransformPrivateStaticElementsInClass && hasStaticModifier(member)
                        ) {
                            addPrivateIdentifierToEnvironment(member, storageName, addPrivateIdentifierPropertyDeclarationToEnvironment);
                        }
                        else {
                            const privateEnv = getPrivateIdentifierEnvironment();
                            setPrivateIdentifier(privateEnv, storageName, { kind: "untransformed" });
                        }
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
                    factory.createBlock([statement]),
                );
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
            const classThisAssignmentBlock = find(members, isClassThisAssignmentBlock);
            const classNamedEvaluationHelperBlock = find(members, isClassNamedEvaluationHelperBlock);
            membersArray = append(membersArray, classThisAssignmentBlock);
            membersArray = append(membersArray, classNamedEvaluationHelperBlock);
            membersArray = append(membersArray, syntheticConstructor);
            membersArray = append(membersArray, syntheticStaticBlock);
            const remainingMembers = classThisAssignmentBlock || classNamedEvaluationHelperBlock ?
                filter(members, member => member !== classThisAssignmentBlock && member !== classNamedEvaluationHelperBlock) :
                members;
            membersArray = addRange(membersArray, remainingMembers);
            members = setTextRange(factory.createNodeArray(membersArray), /*location*/ node.members);
        }

        return { members, prologue };
    }

    function createBrandCheckWeakSetForPrivateMethods() {
        const { weakSetName } = getPrivateIdentifierEnvironment().data;
        Debug.assert(weakSetName, "weakSetName should be set in private identifier environment");

        getPendingExpressions().push(
            factory.createAssignment(
                weakSetName,
                factory.createNewExpression(
                    factory.createIdentifier("WeakSet"),
                    /*typeArguments*/ undefined,
                    [],
                ),
            ),
        );
    }

    function transformConstructor(constructor: ConstructorDeclaration | undefined, container: ClassDeclaration | ClassExpression) {
        constructor = visitNode(constructor, visitor, isConstructorDeclaration);
        if (!lexicalEnvironment?.data || !(lexicalEnvironment.data.facts & ClassFacts.WillHoistInitializersToConstructor)) {
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
                        body,
                    ),
                    constructor || container,
                ),
                constructor,
            ),
        );
    }

    function transformConstructorBodyWorker(statementsOut: Statement[], statementsIn: NodeArray<Statement>, statementOffset: number, superPath: readonly number[], superPathDepth: number, initializerStatements: readonly Statement[], constructor: ConstructorDeclaration) {
        const superStatementIndex = superPath[superPathDepth];
        const superStatement = statementsIn[superStatementIndex];
        addRange(statementsOut, visitNodes(statementsIn, visitor, isStatement, statementOffset, superStatementIndex - statementOffset));
        statementOffset = superStatementIndex + 1;
        if (isTryStatement(superStatement)) {
            const tryBlockStatements: Statement[] = [];

            transformConstructorBodyWorker(
                tryBlockStatements,
                superStatement.tryBlock.statements,
                /*statementOffset*/ 0,
                superPath,
                superPathDepth + 1,
                initializerStatements,
                constructor,
            );

            const tryBlockStatementsArray = factory.createNodeArray(tryBlockStatements);
            setTextRange(tryBlockStatementsArray, superStatement.tryBlock.statements);

            statementsOut.push(factory.updateTryStatement(
                superStatement,
                factory.updateBlock(superStatement.tryBlock, tryBlockStatements),
                visitNode(superStatement.catchClause, visitor, isCatchClause),
                visitNode(superStatement.finallyBlock, visitor, isBlock),
            ));
        }
        else {
            addRange(statementsOut, visitNodes(statementsIn, visitor, isStatement, superStatementIndex, 1));

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

            // parameter-property assignments should occur immediately after the prologue and `super()`,
            // so only count the statements that immediately follow.
            while (statementOffset < statementsIn.length) {
                const statement = statementsIn[statementOffset];
                if (isParameterPropertyDeclaration(getOriginalNode(statement), constructor)) {
                    statementOffset++;
                }
                else {
                    break;
                }
            }

            addRange(statementsOut, initializerStatements);
        }

        addRange(statementsOut, visitNodes(statementsIn, visitor, isStatement, statementOffset));
    }

    function transformConstructorBody(node: ClassDeclaration | ClassExpression, constructor: ConstructorDeclaration | undefined, isDerivedClass: boolean) {
        const instanceProperties = getProperties(node, /*requireInitializer*/ false, /*isStatic*/ false);
        let properties = instanceProperties;
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
        let statementOffset = 0;
        let statements: Statement[] = [];

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
        const initializerStatements: Statement[] = [];
        const receiver = factory.createThis();

        // private methods can be called in property initializers, they should execute first.
        addInstanceMethodStatements(initializerStatements, privateMethodsAndAccessors, receiver);
        if (constructor) {
            const parameterProperties = filter(instanceProperties, prop => isParameterPropertyDeclaration(getOriginalNode(prop), constructor));
            const nonParameterProperties = filter(properties, prop => !isParameterPropertyDeclaration(getOriginalNode(prop), constructor));
            addPropertyOrClassStaticBlockStatements(initializerStatements, parameterProperties, receiver);
            addPropertyOrClassStaticBlockStatements(initializerStatements, nonParameterProperties, receiver);
        }
        else {
            addPropertyOrClassStaticBlockStatements(initializerStatements, properties, receiver);
        }

        if (constructor?.body) {
            statementOffset = factory.copyPrologue(constructor.body.statements, statements, /*ensureUseStrict*/ false, visitor);
            const superStatementIndices = findSuperStatementIndexPath(constructor.body.statements, statementOffset);
            if (superStatementIndices.length) {
                transformConstructorBodyWorker(
                    statements,
                    constructor.body.statements,
                    statementOffset,
                    superStatementIndices,
                    /*superPathDepth*/ 0,
                    initializerStatements,
                    constructor,
                );
            }
            else {
                // parameter-property assignments should occur immediately after the prologue and `super()`,
                // so only count the statements that immediately follow.
                while (statementOffset < constructor.body.statements.length) {
                    const statement = constructor.body.statements[statementOffset];
                    if (isParameterPropertyDeclaration(getOriginalNode(statement), constructor)) {
                        statementOffset++;
                    }
                    else {
                        break;
                    }
                }
                addRange(statements, initializerStatements);
                addRange(statements, visitNodes(constructor.body.statements, visitor, isStatement, statementOffset));
            }
        }
        else {
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
                            [factory.createSpreadElement(factory.createIdentifier("arguments"))],
                        ),
                    ),
                );
            }
            addRange(statements, initializerStatements);
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
                    /*location*/ constructor?.body?.statements ?? node.members,
                ),
                multiLine,
            ),
            /*location*/ constructor?.body,
        );
    }

    /**
     * Generates assignment statements for property initializers.
     *
     * @param properties An array of property declarations to transform.
     * @param receiver The receiver on which each property should be assigned.
     */
    function addPropertyOrClassStaticBlockStatements(statements: Statement[], properties: readonly (PropertyDeclaration | ClassStaticBlockDeclaration)[], receiver: LeftHandSideExpression) {
        for (const property of properties) {
            if (isStatic(property) && !shouldTransformPrivateElementsOrClassStaticBlocks) {
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
            setCurrentClassElementAnd(property, transformClassStaticBlockDeclaration, property) :
            transformProperty(property, receiver);
        if (!expression) {
            return undefined;
        }

        const statement = factory.createExpressionStatement(expression);
        setOriginalNode(statement, property);
        addEmitFlags(statement, getEmitFlags(property) & EmitFlags.NoComments);
        setCommentRange(statement, property);

        const propertyOriginalNode = getOriginalNode(property);
        if (isParameter(propertyOriginalNode)) {
            // replicate comment and source map behavior from the ts transform for parameter properties.
            setSourceMapRange(statement, propertyOriginalNode);
            removeAllComments(statement);
        }
        else {
            setSourceMapRange(statement, moveRangePastModifiers(property));
        }

        // `setOriginalNode` *copies* the `emitNode` from `property`, so now both
        // `statement` and `expression` have a copy of the synthesized comments.
        // Drop the comments from expression to avoid printing them twice.
        setSyntheticLeadingComments(expression, undefined);
        setSyntheticTrailingComments(expression, undefined);

        // If the property was originally an auto-accessor, don't emit comments here since they will be attached to
        // the synthezized getter.
        if (hasAccessorModifier(propertyOriginalNode)) {
            addEmitFlags(statement, EmitFlags.NoComments);
        }

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
            const expression = isClassStaticBlockDeclaration(property) ?
                setCurrentClassElementAnd(property, transformClassStaticBlockDeclaration, property) :
                setCurrentClassElementAnd(property, () => transformProperty(property, receiver), /*arg*/ undefined);
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
        const savedCurrentClassElement = currentClassElement;
        const transformed = transformPropertyWorker(property, receiver);
        if (transformed && hasStaticModifier(property) && lexicalEnvironment?.data?.facts) {
            // capture the lexical environment for the member
            setOriginalNode(transformed, property);
            addEmitFlags(transformed, EmitFlags.AdviseOnEmitNode);
            setSourceMapRange(transformed, getSourceMapRange(property.name));
            lexicalEnvironmentMap.set(getOriginalNode(property), lexicalEnvironment);
        }
        currentClassElement = savedCurrentClassElement;
        return transformed;
    }

    function transformPropertyWorker(property: PropertyDeclaration, receiver: LeftHandSideExpression) {
        // We generate a name here in order to reuse the value cached by the relocated computed name expression (which uses the same generated name)
        const emitAssignment = !useDefineForClassFields;

        if (isNamedEvaluation(property, isAnonymousClassNeedingAssignedName)) {
            property = transformNamedEvaluation(context, property);
        }

        const propertyName = hasAccessorModifier(property) ?
            factory.getGeneratedPrivateNameForNode(property.name) :
            isComputedPropertyName(property.name) && !isSimpleInlineableExpression(property.name.expression) ?
            factory.updateComputedPropertyName(property.name, factory.getGeneratedNameForNode(property.name)) :
            property.name;

        if (hasStaticModifier(property)) {
            currentClassElement = property;
        }

        if (isPrivateIdentifier(propertyName) && shouldTransformClassElementToWeakMap(property as PrivateIdentifierPropertyDeclaration)) {
            const privateIdentifierInfo = accessPrivateIdentifier(propertyName);
            if (privateIdentifierInfo) {
                if (privateIdentifierInfo.kind === PrivateIdentifierKind.Field) {
                    if (!privateIdentifierInfo.isStatic) {
                        return createPrivateInstanceFieldInitializer(
                            factory,
                            receiver,
                            visitNode(property.initializer, visitor, isExpression),
                            privateIdentifierInfo.brandCheckIdentifier,
                        );
                    }
                    else {
                        return createPrivateStaticFieldInitializer(
                            factory,
                            privateIdentifierInfo.variableName,
                            visitNode(property.initializer, visitor, isExpression),
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

        let initializer = visitNode(property.initializer, visitor, isExpression);
        if (isParameterPropertyDeclaration(propertyOriginalNode, propertyOriginalNode.parent) && isIdentifier(propertyName)) {
            // A parameter-property declaration always overrides the initializer. The only time a parameter-property
            // declaration *should* have an initializer is when decorators have added initializers that need to run before
            // any other initializer
            const localName = factory.cloneNode(propertyName);
            if (initializer) {
                // unwrap `(__runInitializers(this, _instanceExtraInitializers), void 0)`
                if (
                    isParenthesizedExpression(initializer) &&
                    isCommaExpression(initializer.expression) &&
                    isCallToHelper(initializer.expression.left, "___runInitializers" as __String) &&
                    isVoidExpression(initializer.expression.right) &&
                    isNumericLiteral(initializer.expression.right.expression)
                ) {
                    initializer = initializer.expression.left;
                }
                initializer = factory.inlineExpressions([initializer, localName]);
            }
            else {
                initializer = localName;
            }
            setEmitFlags(propertyName, EmitFlags.NoComments | EmitFlags.NoSourceMap);
            setSourceMapRange(localName, propertyOriginalNode.name);
            setEmitFlags(localName, EmitFlags.NoComments);
        }
        else {
            initializer ??= factory.createVoidZero();
        }

        if (emitAssignment || isPrivateIdentifier(propertyName)) {
            const memberAccess = createMemberAccessForPropertyName(factory, receiver, propertyName, /*location*/ propertyName);
            addEmitFlags(memberAccess, EmitFlags.NoLeadingComments);
            const expression = factory.createAssignment(memberAccess, initializer);
            return expression;
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
            context.enableEmitNotification(SyntaxKind.FunctionDeclaration);
            context.enableEmitNotification(SyntaxKind.FunctionExpression);
            context.enableEmitNotification(SyntaxKind.Constructor);
            context.enableEmitNotification(SyntaxKind.GetAccessor);
            context.enableEmitNotification(SyntaxKind.SetAccessor);
            context.enableEmitNotification(SyntaxKind.MethodDeclaration);
            context.enableEmitNotification(SyntaxKind.PropertyDeclaration);
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
    function addInstanceMethodStatements(statements: Statement[], methods: readonly (MethodDeclaration | AccessorDeclaration | AutoAccessorPropertyDeclaration)[], receiver: LeftHandSideExpression) {
        if (!shouldTransformPrivateElementsOrClassStaticBlocks || !some(methods)) {
            return;
        }

        const { weakSetName } = getPrivateIdentifierEnvironment().data;
        Debug.assert(weakSetName, "weakSetName should be set in private identifier environment");
        statements.push(
            factory.createExpressionStatement(
                createPrivateInstanceMethodInitializer(factory, receiver, weakSetName),
            ),
        );
    }

    function visitInvalidSuperProperty(node: SuperProperty) {
        return isPropertyAccessExpression(node) ?
            factory.updatePropertyAccessExpression(
                node,
                factory.createVoidZero(),
                node.name,
            ) :
            factory.updateElementAccessExpression(
                node,
                factory.createVoidZero(),
                visitNode(node.argumentExpression, visitor, isExpression),
            );
    }

    /**
     * If the name is a computed property, this function transforms it, then either returns an expression which caches the
     * value of the result or the expression itself if the value is either unused or safe to inline into multiple locations
     * @param shouldHoist Does the expression need to be reused? (ie, for an initializer or a decorator)
     */
    function getPropertyNameExpressionIfNeeded(name: PropertyName, shouldHoist: boolean): Expression | undefined {
        if (isComputedPropertyName(name)) {
            const cacheAssignment = findComputedPropertyNameCacheAssignment(name);
            const expression = visitNode(name.expression, visitor, isExpression);
            const innerExpression = skipPartiallyEmittedExpressions(expression);
            const inlinable = isSimpleInlineableExpression(innerExpression);
            const alreadyTransformed = !!cacheAssignment || isAssignmentExpression(innerExpression) && isGeneratedIdentifier(innerExpression.left);
            if (!alreadyTransformed && !inlinable && shouldHoist) {
                const generatedName = factory.getGeneratedNameForNode(name);
                if (resolver.hasNodeCheckFlag(name, NodeCheckFlags.BlockScopedBindingInLoop)) {
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
        lexicalEnvironment = { previous: lexicalEnvironment, data: undefined };
    }

    function endClassLexicalEnvironment() {
        lexicalEnvironment = lexicalEnvironment?.previous;
    }

    function getClassLexicalEnvironment(): ClassLexicalEnvironment {
        Debug.assert(lexicalEnvironment);
        return lexicalEnvironment.data ??= {
            facts: ClassFacts.None,
            classConstructor: undefined,
            classThis: undefined,
            superClassReference: undefined,
            // privateIdentifierEnvironment: undefined,
        };
    }

    function getPrivateIdentifierEnvironment(): PrivateEnv {
        Debug.assert(lexicalEnvironment);
        return lexicalEnvironment.privateEnv ??= newPrivateEnvironment({
            className: undefined,
            weakSetName: undefined,
        });
    }

    function getPendingExpressions() {
        return pendingExpressions ??= [];
    }

    function addPrivateIdentifierClassElementToEnvironment(
        node: PropertyDeclaration | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration,
        name: PrivateIdentifier,
        lex: ClassLexicalEnvironment,
        privateEnv: PrivateEnv,
        isStatic: boolean,
        isValid: boolean,
        previousInfo: PrivateIdentifierInfo | undefined,
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
        privateEnv: PrivateEnv,
        isStatic: boolean,
        isValid: boolean,
        _previousInfo: PrivateIdentifierInfo | undefined,
    ) {
        if (isStatic) {
            const brandCheckIdentifier = Debug.checkDefined(lex.classThis ?? lex.classConstructor, "classConstructor should be set in private identifier environment");

            const variableName = createHoistedVariableForPrivateName(name);
            setPrivateIdentifier(privateEnv, name, {
                kind: PrivateIdentifierKind.Field,
                isStatic: true,
                brandCheckIdentifier,
                variableName,
                isValid,
            });
        }
        else {
            const weakMapName = createHoistedVariableForPrivateName(name);

            setPrivateIdentifier(privateEnv, name, {
                kind: PrivateIdentifierKind.Field,
                isStatic: false,
                brandCheckIdentifier: weakMapName,
                isValid,
            });

            getPendingExpressions().push(factory.createAssignment(
                weakMapName,
                factory.createNewExpression(
                    factory.createIdentifier("WeakMap"),
                    /*typeArguments*/ undefined,
                    [],
                ),
            ));
        }
    }

    function addPrivateIdentifierMethodDeclarationToEnvironment(
        _node: MethodDeclaration,
        name: PrivateIdentifier,
        lex: ClassLexicalEnvironment,
        privateEnv: PrivateEnv,
        isStatic: boolean,
        isValid: boolean,
        _previousInfo: PrivateIdentifierInfo | undefined,
    ) {
        const methodName = createHoistedVariableForPrivateName(name);
        const brandCheckIdentifier = isStatic ?
            Debug.checkDefined(lex.classThis ?? lex.classConstructor, "classConstructor should be set in private identifier environment") :
            Debug.checkDefined(privateEnv.data.weakSetName, "weakSetName should be set in private identifier environment");

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
        privateEnv: PrivateEnv,
        isStatic: boolean,
        isValid: boolean,
        previousInfo: PrivateIdentifierInfo | undefined,
    ) {
        const getterName = createHoistedVariableForPrivateName(name, "_get");
        const brandCheckIdentifier = isStatic ?
            Debug.checkDefined(lex.classThis ?? lex.classConstructor, "classConstructor should be set in private identifier environment") :
            Debug.checkDefined(privateEnv.data.weakSetName, "weakSetName should be set in private identifier environment");

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
        privateEnv: PrivateEnv,
        isStatic: boolean,
        isValid: boolean,
        previousInfo: PrivateIdentifierInfo | undefined,
    ) {
        const setterName = createHoistedVariableForPrivateName(name, "_set");
        const brandCheckIdentifier = isStatic ?
            Debug.checkDefined(lex.classThis ?? lex.classConstructor, "classConstructor should be set in private identifier environment") :
            Debug.checkDefined(privateEnv.data.weakSetName, "weakSetName should be set in private identifier environment");

        if (
            previousInfo?.kind === PrivateIdentifierKind.Accessor &&
            previousInfo.isStatic === isStatic && !previousInfo.setterName
        ) {
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
        privateEnv: PrivateEnv,
        isStatic: boolean,
        isValid: boolean,
        _previousInfo: PrivateIdentifierInfo | undefined,
    ) {
        const getterName = createHoistedVariableForPrivateName(name, "_get");
        const setterName = createHoistedVariableForPrivateName(name, "_set");
        const brandCheckIdentifier = isStatic ?
            Debug.checkDefined(lex.classThis ?? lex.classConstructor, "classConstructor should be set in private identifier environment") :
            Debug.checkDefined(privateEnv.data.weakSetName, "weakSetName should be set in private identifier environment");

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
            privateEnv: PrivateEnv,
            isStatic: boolean,
            isValid: boolean,
            previousInfo: PrivateIdentifierInfo | undefined,
        ) => void,
    ) {
        const lex = getClassLexicalEnvironment();
        const privateEnv = getPrivateIdentifierEnvironment();
        const previousInfo = getPrivateIdentifier(privateEnv, name);
        const isStatic = hasStaticModifier(node);
        const isValid = !isReservedPrivateName(name) && previousInfo === undefined;
        addDeclaration(node, name, lex, privateEnv, isStatic, isValid, previousInfo);
    }

    function createHoistedVariableForClass(name: string | PrivateIdentifier | undefined, node: PrivateIdentifier | ClassStaticBlockDeclaration, suffix?: string): Identifier {
        const { className } = getPrivateIdentifierEnvironment().data;
        const prefix: GeneratedNamePart | string = className ? { prefix: "_", node: className, suffix: "_" } : "_";
        const identifier = typeof name === "object" ? factory.getGeneratedNameForNode(name, GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.ReservedInNestedScopes, prefix, suffix) :
            typeof name === "string" ? factory.createUniqueName(name, GeneratedIdentifierFlags.Optimistic, prefix, suffix) :
            factory.createTempVariable(/*recordTempVariable*/ undefined, /*reservedInNestedScopes*/ true, prefix, suffix);

        if (resolver.hasNodeCheckFlag(node, NodeCheckFlags.BlockScopedBindingInLoop)) {
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
        const info = accessPrivateIdentifierCommon(lexicalEnvironment, name);
        return info?.kind === "untransformed" ? undefined : info;
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
                SyntaxKind.EqualsToken,
            ),
        );
    }

    function visitDestructuringAssignmentTarget(node: LeftHandSideExpression): LeftHandSideExpression {
        if (isObjectLiteralExpression(node) || isArrayLiteralExpression(node)) {
            return visitAssignmentPattern(node);
        }

        if (isPrivateIdentifierPropertyAccessExpression(node)) {
            return wrapPrivateIdentifierForDestructuringTarget(node);
        }
        else if (
            shouldTransformSuperInStaticInitializers &&
            currentClassElement &&
            isSuperProperty(node) &&
            isStaticPropertyDeclarationOrClassStaticBlock(currentClassElement) &&
            lexicalEnvironment?.data
        ) {
            const { classConstructor, superClassReference, facts } = lexicalEnvironment.data;
            if (facts & ClassFacts.ClassWasDecorated) {
                return visitInvalidSuperProperty(node);
            }
            else if (classConstructor && superClassReference) {
                const name = isElementAccessExpression(node) ? visitNode(node.argumentExpression, visitor, isExpression) :
                    isIdentifier(node.name) ? factory.createStringLiteralFromNode(node.name) :
                    undefined;
                if (name) {
                    const temp = factory.createTempVariable(/*recordTempVariable*/ undefined);
                    return factory.createAssignmentTargetWrapper(
                        temp,
                        factory.createReflectSetCall(
                            superClassReference,
                            name,
                            temp,
                            classConstructor,
                        ),
                    );
                }
            }
        }
        return visitEachChild(node, visitor, context);
    }

    function visitAssignmentElement(node: Exclude<ArrayAssignmentElement, SpreadElement | OmittedExpression>): ArrayAssignmentElement {
        // 13.15.5.5 RS: IteratorDestructuringAssignmentEvaluation
        //   AssignmentElement : DestructuringAssignmentTarget Initializer?
        //     ...
        //     4. If |Initializer| is present and _value_ is *undefined*, then
        //        a. If IsAnonymousFunctionDefinition(|Initializer|) and IsIdentifierRef of |DestructuringAssignmentTarget| are both *true*, then
        //           i. Let _v_ be ? NamedEvaluation of |Initializer| with argument _lref_.[[ReferencedName]].
        //     ...

        if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
            node = transformNamedEvaluation(context, node);
        }
        if (isAssignmentExpression(node, /*excludeCompoundAssignment*/ true)) {
            const left = visitDestructuringAssignmentTarget(node.left);
            const right = visitNode(node.right, visitor, isExpression);
            return factory.updateBinaryExpression(node, left, node.operatorToken, right) as AssignmentExpression<EqualsToken>;
        }
        return visitDestructuringAssignmentTarget(node) as ArrayAssignmentElement;
    }

    function visitAssignmentRestElement(node: SpreadElement) {
        if (isLeftHandSideExpression(node.expression)) {
            const expression = visitDestructuringAssignmentTarget(node.expression);
            return factory.updateSpreadElement(node, expression);
        }

        return visitEachChild(node, visitor, context);
    }

    function visitArrayAssignmentElement(node: Expression): Expression {
        if (isArrayBindingOrAssignmentElement(node)) {
            if (isSpreadElement(node)) return visitAssignmentRestElement(node);
            if (!isOmittedExpression(node)) return visitAssignmentElement(node);
        }
        return visitEachChild(node, visitor, context);
    }

    function visitAssignmentProperty(node: PropertyAssignment) {
        // AssignmentProperty : PropertyName `:` AssignmentElement
        // AssignmentElement : DestructuringAssignmentTarget Initializer?

        // 13.15.5.6 RS: KeyedDestructuringAssignmentEvaluation
        //   AssignmentElement : DestructuringAssignmentTarget Initializer?
        //     ...
        //     3. If |Initializer| is present and _v_ is *undefined*, then
        //        a. If IsAnonymousfunctionDefinition(|Initializer|) and IsIdentifierRef of |DestructuringAssignmentTarget| are both *true*, then
        //           i. Let _rhsValue_ be ? NamedEvaluation of |Initializer| with argument _lref_.[[ReferencedName]].
        //     ...

        const name = visitNode(node.name, visitor, isPropertyName);
        if (isAssignmentExpression(node.initializer, /*excludeCompoundAssignment*/ true)) {
            const assignmentElement = visitAssignmentElement(node.initializer);
            return factory.updatePropertyAssignment(node, name, assignmentElement);
        }

        if (isLeftHandSideExpression(node.initializer)) {
            const assignmentElement = visitDestructuringAssignmentTarget(node.initializer);
            return factory.updatePropertyAssignment(node, name, assignmentElement);
        }

        return visitEachChild(node, visitor, context);
    }

    function visitShorthandAssignmentProperty(node: ShorthandPropertyAssignment) {
        // AssignmentProperty : IdentifierReference Initializer?

        // 13.15.5.3 RS: PropertyDestructuringAssignmentEvaluation
        //   AssignmentProperty : IdentifierReference Initializer?
        //     ...
        //     4. If |Initializer?| is present and _v_ is *undefined*, then
        //        a. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
        //           i. Set _v_ to ? NamedEvaluation of |Initializer| with argument _P_.
        //     ...

        if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
            node = transformNamedEvaluation(context, node);
        }

        return visitEachChild(node, visitor, context);
    }

    function visitAssignmentRestProperty(node: SpreadAssignment) {
        if (isLeftHandSideExpression(node.expression)) {
            const expression = visitDestructuringAssignmentTarget(node.expression);
            return factory.updateSpreadAssignment(node, expression);
        }

        return visitEachChild(node, visitor, context);
    }

    function visitObjectAssignmentElement(node: ObjectLiteralElement) {
        Debug.assertNode(node, isObjectBindingOrAssignmentElement);
        if (isSpreadAssignment(node)) return visitAssignmentRestProperty(node);
        if (isShorthandPropertyAssignment(node)) return visitShorthandAssignmentProperty(node);
        if (isPropertyAssignment(node)) return visitAssignmentProperty(node);
        return visitEachChild(node, visitor, context);
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
                visitNodes(node.elements, visitArrayAssignmentElement, isExpression),
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
                visitNodes(node.properties, visitObjectAssignmentElement, isObjectLiteralElementLike),
            );
        }
    }

    function onEmitNode(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void) {
        const original = getOriginalNode(node);
        const lex = lexicalEnvironmentMap.get(original);
        if (lex) {
            // If we've associated a lexical environment with the original node for this node, use it explicitly.
            const savedLexicalEnvironment = lexicalEnvironment;
            const savedPreviousShouldSubstituteThisWithClassThis = previousShouldSubstituteThisWithClassThis;
            lexicalEnvironment = lex;
            previousShouldSubstituteThisWithClassThis = shouldSubstituteThisWithClassThis;
            shouldSubstituteThisWithClassThis = !isClassStaticBlockDeclaration(original) || !(getInternalEmitFlags(original) & InternalEmitFlags.TransformPrivateStaticElements);
            previousOnEmitNode(hint, node, emitCallback);
            shouldSubstituteThisWithClassThis = previousShouldSubstituteThisWithClassThis;
            previousShouldSubstituteThisWithClassThis = savedPreviousShouldSubstituteThisWithClassThis;
            lexicalEnvironment = savedLexicalEnvironment;
            return;
        }

        switch (node.kind) {
            case SyntaxKind.FunctionExpression:
                if (isArrowFunction(original) || getEmitFlags(node) & EmitFlags.AsyncFunctionBody) {
                    // Arrow functions and functions that serve as the transformed body of an async function should
                    // preserve the outer lexical environment.
                    break;
                }
                // falls through

            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.Constructor:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.PropertyDeclaration: {
                // Other function bodies and property declarations should clear the lexical environment.
                // Note that this won't happen if a lexical environment was bound to the original node as that
                // was handled above.
                const savedLexicalEnvironment = lexicalEnvironment;
                const savedPreviousShouldSubstituteThisWithClassThis = previousShouldSubstituteThisWithClassThis;
                lexicalEnvironment = undefined;
                previousShouldSubstituteThisWithClassThis = shouldSubstituteThisWithClassThis;
                shouldSubstituteThisWithClassThis = false;
                previousOnEmitNode(hint, node, emitCallback);
                shouldSubstituteThisWithClassThis = previousShouldSubstituteThisWithClassThis;
                previousShouldSubstituteThisWithClassThis = savedPreviousShouldSubstituteThisWithClassThis;
                lexicalEnvironment = savedLexicalEnvironment;
                return;
            }

            case SyntaxKind.ComputedPropertyName: {
                // Computed property names should use the outer lexical environment.
                const savedLexicalEnvironment = lexicalEnvironment;
                const savedShouldSubstituteThisWithClassThis = shouldSubstituteThisWithClassThis;
                lexicalEnvironment = lexicalEnvironment?.previous;
                shouldSubstituteThisWithClassThis = previousShouldSubstituteThisWithClassThis;
                previousOnEmitNode(hint, node, emitCallback);
                shouldSubstituteThisWithClassThis = savedShouldSubstituteThisWithClassThis;
                lexicalEnvironment = savedLexicalEnvironment;
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
        if (
            enabledSubstitutions & ClassPropertySubstitutionFlags.ClassStaticThisOrSuperReference &&
            lexicalEnvironment?.data &&
            !noSubstitution.has(node)
        ) {
            const { facts, classConstructor, classThis } = lexicalEnvironment.data;
            const substituteThis = shouldSubstituteThisWithClassThis ? classThis ?? classConstructor : classConstructor;
            if (substituteThis) {
                return setTextRange(
                    setOriginalNode(
                        factory.cloneNode(substituteThis),
                        node,
                    ),
                    node,
                );
            }
            if (facts & ClassFacts.ClassWasDecorated && legacyDecorators) {
                return factory.createParenthesizedExpression(factory.createVoidZero());
            }
        }
        return node;
    }

    function substituteExpressionIdentifier(node: Identifier): Expression {
        return trySubstituteClassAlias(node) || node;
    }

    function trySubstituteClassAlias(node: Identifier): Expression | undefined {
        if (enabledSubstitutions & ClassPropertySubstitutionFlags.ClassAliases) {
            if (resolver.hasNodeCheckFlag(node, NodeCheckFlags.ConstructorReference)) {
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
}

function createPrivateStaticFieldInitializer(factory: NodeFactory, variableName: Identifier, initializer: Expression | undefined) {
    return factory.createAssignment(
        variableName,
        factory.createObjectLiteralExpression([
            factory.createPropertyAssignment("value", initializer || factory.createVoidZero()),
        ]),
    );
}

function createPrivateInstanceFieldInitializer(factory: NodeFactory, receiver: LeftHandSideExpression, initializer: Expression | undefined, weakMapName: Identifier) {
    return factory.createCallExpression(
        factory.createPropertyAccessExpression(weakMapName, "set"),
        /*typeArguments*/ undefined,
        [receiver, initializer || factory.createVoidZero()],
    );
}

function createPrivateInstanceMethodInitializer(factory: NodeFactory, receiver: LeftHandSideExpression, weakSetName: Identifier) {
    return factory.createCallExpression(
        factory.createPropertyAccessExpression(weakSetName, "add"),
        /*typeArguments*/ undefined,
        [receiver],
    );
}

function isReservedPrivateName(node: PrivateIdentifier) {
    return !isGeneratedPrivateIdentifier(node) && node.escapedText === "#constructor";
}

type PrivateIdentifierInExpression = BinaryExpression & { readonly left: PrivateIdentifier; readonly token: InKeyword; };

function isPrivateIdentifierInExpression(node: BinaryExpression): node is PrivateIdentifierInExpression {
    return isPrivateIdentifier(node.left)
        && node.operatorToken.kind === SyntaxKind.InKeyword;
}

function isStaticPropertyDeclaration(node: Node): node is PropertyDeclaration {
    return isPropertyDeclaration(node) && hasStaticModifier(node);
}

function isStaticPropertyDeclarationOrClassStaticBlock(node: Node): node is ClassStaticBlockDeclaration | PropertyDeclaration {
    return isClassStaticBlockDeclaration(node) || isStaticPropertyDeclaration(node);
}
