import {
    addEmitHelpers,
    addInternalEmitFlags,
    addRange,
    AllDecorators,
    AnonymousFunctionDefinition,
    append,
    ArrayAssignmentElement,
    AssignmentPattern,
    AsteriskToken,
    BinaryExpression,
    BindingElement,
    Block,
    Bundle,
    CallExpression,
    chainBundle,
    childIsDecorated,
    ClassDeclaration,
    ClassElement,
    ClassExpression,
    classHasDeclaredOrExplicitlyAssignedName,
    ClassLikeDeclaration,
    classOrConstructorParameterIsDecorated,
    ClassStaticBlockDeclaration,
    CommaListExpression,
    ComputedPropertyName,
    ConstructorDeclaration,
    createAccessorPropertyBackingField,
    Debug,
    Decorator,
    ElementAccessExpression,
    EmitFlags,
    ESDecorateClassElementContext,
    ESDecorateName,
    expandPreOrPostfixIncrementOrDecrementExpression,
    ExportAssignment,
    Expression,
    ExpressionStatement,
    findComputedPropertyNameCacheAssignment,
    findSuperStatementIndexPath,
    firstOrUndefined,
    forEachEntry,
    ForStatement,
    GeneratedIdentifierFlags,
    GetAccessorDeclaration,
    getAllDecoratorsOfClass,
    getAllDecoratorsOfClassElement,
    getCommentRange,
    getEffectiveBaseTypeNode,
    getEmitScriptTarget,
    getFirstConstructorWithBody,
    getHeritageClause,
    getNonAssignmentOperatorForCompoundAssignment,
    getOriginalNode,
    getSourceMapRange,
    hasAccessorModifier,
    hasDecorators,
    hasStaticModifier,
    hasSyntacticModifier,
    HeritageClause,
    Identifier,
    idText,
    injectClassNamedEvaluationHelperBlockIfMissing,
    injectClassThisAssignmentIfMissing,
    InternalEmitFlags,
    isAccessExpression,
    isAmbientPropertyDeclaration,
    isArrayBindingOrAssignmentElement,
    isArrayLiteralExpression,
    isArrowFunction,
    isAssignmentExpression,
    isAsyncModifier,
    isAutoAccessorPropertyDeclaration,
    isBindingName,
    isBlock,
    isCatchClause,
    isClassElement,
    isClassExpression,
    isClassLike,
    isClassNamedEvaluationHelperBlock,
    isClassStaticBlockDeclaration,
    isClassThisAssignmentBlock,
    isCompoundAssignment,
    isComputedPropertyName,
    isConstructorDeclaration,
    isDestructuringAssignment,
    isElementAccessExpression,
    isExportModifier,
    isExpression,
    isForInitializer,
    isFunctionExpression,
    isGeneratedIdentifier,
    isGetAccessor,
    isGetAccessorDeclaration,
    isHeritageClause,
    isIdentifier,
    isIdentifierText,
    isLeftHandSideExpression,
    isMethodDeclaration,
    isMethodOrAccessor,
    isModifier,
    isNamedEvaluation,
    isObjectBindingOrAssignmentElement,
    isObjectLiteralElementLike,
    isObjectLiteralExpression,
    isOmittedExpression,
    isParameter,
    isParenthesizedExpression,
    isPrivateIdentifier,
    isPrivateIdentifierClassElementDeclaration,
    isPropertyAssignment,
    isPropertyDeclaration,
    isPropertyName,
    isPropertyNameLiteral,
    isSetAccessor,
    isSetAccessorDeclaration,
    isShorthandPropertyAssignment,
    isSimpleInlineableExpression,
    isSpreadAssignment,
    isSpreadElement,
    isStatement,
    isStatic,
    isStaticModifier,
    isStringLiteral,
    isSuperProperty,
    isTemplateLiteral,
    isTryStatement,
    LeftHandSideExpression,
    map,
    MethodDeclaration,
    Modifier,
    ModifierFlags,
    ModifierLike,
    ModifiersArray,
    moveRangePastDecorators,
    moveRangePastModifiers,
    Node,
    NodeArray,
    NodeFlags,
    nodeIsDecorated,
    nodeOrChildIsDecorated,
    ObjectLiteralElement,
    OmittedExpression,
    ParameterDeclaration,
    ParenthesizedExpression,
    PartiallyEmittedExpression,
    PostfixUnaryExpression,
    PrefixUnaryExpression,
    PrivateIdentifier,
    PrivateIdentifierGetAccessorDeclaration,
    PrivateIdentifierMethodDeclaration,
    PrivateIdentifierPropertyDeclaration,
    PrivateIdentifierSetAccessorDeclaration,
    PropertyAccessExpression,
    PropertyAssignment,
    PropertyDeclaration,
    PropertyName,
    ScriptTarget,
    SetAccessorDeclaration,
    setCommentRange,
    setEmitFlags,
    setInternalEmitFlags,
    setOriginalNode,
    setSourceMapRange,
    setTextRange,
    ShorthandPropertyAssignment,
    singleOrMany,
    skipOuterExpressions,
    skipParentheses,
    some,
    SourceFile,
    SpreadAssignment,
    SpreadElement,
    Statement,
    SyntaxKind,
    TaggedTemplateExpression,
    ThisExpression,
    TransformationContext,
    TransformFlags,
    transformNamedEvaluation,
    tryCast,
    VariableDeclaration,
    visitCommaListElements,
    visitEachChild,
    visitIterationBody,
    visitNode,
    visitNodes,
    Visitor,
    VisitResult,
    WrappedExpression,
} from "../_namespaces/ts.js";

// Class/Decorator evaluation order, as it pertains to this transformer:
//
// 1. Class decorators are evaluated outside of the private name scope of the class.
//    - 15.8.20 RS: BindingClassDeclarationEvaluation
//    - 15.8.21 RS: Evaluation
//    - 8.3.5 RS: NamedEvaluation
// 2. ClassHeritage clause is evaluated outside of the private name scope of the class.
//    - 15.8.19 RS: ClassDefinitionEvaluation, Step 8.c.
// 3. The name of the class is assigned.
// 4. For each member:
//    a. Member Decorators are evaluated.
//       - 15.8.19 RS: ClassDefinitionEvaluation, Step 23.
//       - Probably 15.7.13 RS: ClassElementEvaluation, but it's missing from spec text.
//    b. Computed Property name is evaluated
//       - 15.8.19 RS: ClassDefinitionEvaluation, Step 23.
//       - 15.8.15 RS: ClassFieldDefinitionEvaluation, Step 1.
//       - 15.4.5 RS: MethodDefinitionEvaluation, Step 1.
// 5. Static non-field (method/getter/setter/auto-accessor) element decorators are applied
// 6. Non-static non-field (method/getter/setter/auto-accessor) element decorators are applied
// 7. Static field (excl. auto-accessor) element decorators are applied
// 8. Non-static field (excl. auto-accessor) element decorators are applied
// 9. Class decorators are applied
// 10. Class binding is initialized
// 11. Static method extra initializers are evaluated
// 12. Static fields are initialized (incl. extra initializers) and static blocks are evaluated
// 13. Class extra initializers are evaluated
//
// Class constructor evaluation order, as it pertains to this transformer:
//
// 1. Instance method extra initializers are evaluated
// 2. For each instance field/auto-accessor:
//    a. The field is initialized and defined on the instance.
//    b. Extra initializers for the field are evaluated.

interface MemberInfo {
    memberDecoratorsName: Identifier; // used in class definition step 4.a
    memberInitializersName?: Identifier; // used in class definition step 12 and constructor evaluation step 2.a
    memberExtraInitializersName?: Identifier; // used in class definition step 12 and constructor evaluation step 2.b
    memberDescriptorName?: Identifier;
}

interface ClassInfo {
    class: ClassLikeDeclaration;

    classDecoratorsName?: Identifier; // used in class definition step 2
    classDescriptorName?: Identifier; // used in class definition step 10
    classExtraInitializersName?: Identifier; // used in class definition step 13
    classThis?: Identifier; // `_classThis`, if needed.
    classSuper?: Identifier; // `_classSuper`, if needed.
    metadataReference: Identifier;

    memberInfos?: Map<ClassElement, MemberInfo>; // used in class definition step 4.a, 12, and constructor evaluation

    instanceMethodExtraInitializersName?: Identifier | undefined; // used in constructor evaluation step 1
    staticMethodExtraInitializersName?: Identifier | undefined; // used in class definition step 11

    staticNonFieldDecorationStatements?: Statement[];
    nonStaticNonFieldDecorationStatements?: Statement[];
    staticFieldDecorationStatements?: Statement[];
    nonStaticFieldDecorationStatements?: Statement[];

    hasStaticInitializers: boolean;
    hasNonAmbientInstanceFields: boolean;
    hasStaticPrivateClassElements: boolean;

    pendingStaticInitializers?: Expression[];
    pendingInstanceInitializers?: Expression[];
}

interface ClassLexicalEnvironmentStackEntry {
    kind: "class";
    next: LexicalEnvironmentStackEntry | undefined;
    classInfo: ClassInfo | undefined;
    savedPendingExpressions?: Expression[];
}

interface ClassElementLexicalEnvironmentStackEntry {
    kind: "class-element";
    next: ClassLexicalEnvironmentStackEntry;
    classThis?: Identifier;
    classSuper?: Identifier;
}

interface PropertyNameLexicalEnvironmentStackEntry {
    kind: "name";
    next: ClassElementLexicalEnvironmentStackEntry;
}

interface OtherLexicalEnvironmentStackEntry {
    kind: "other";
    next: LexicalEnvironmentStackEntry | undefined;
    depth: number;
    savedPendingExpressions?: Expression[];
}

type LexicalEnvironmentStackEntry =
    | ClassLexicalEnvironmentStackEntry
    | ClassElementLexicalEnvironmentStackEntry
    | OtherLexicalEnvironmentStackEntry
    | PropertyNameLexicalEnvironmentStackEntry;

/** @internal */
export function transformESDecorators(context: TransformationContext): (x: SourceFile | Bundle) => SourceFile | Bundle {
    const {
        factory,
        getEmitHelperFactory: emitHelpers,
        startLexicalEnvironment,
        endLexicalEnvironment,
        hoistVariableDeclaration,
    } = context;

    const languageVersion = getEmitScriptTarget(context.getCompilerOptions());
    let top: LexicalEnvironmentStackEntry | undefined;
    let classInfo: ClassInfo | undefined;
    let classThis: Identifier | undefined;
    let classSuper: Identifier | undefined;
    let pendingExpressions: Expression[] | undefined;
    let shouldTransformPrivateStaticElementsInFile: boolean;

    return chainBundle(context, transformSourceFile);

    function transformSourceFile(node: SourceFile) {
        top = undefined;
        shouldTransformPrivateStaticElementsInFile = false;
        const visited = visitEachChild(node, visitor, context);
        addEmitHelpers(visited, context.readEmitHelpers());
        if (shouldTransformPrivateStaticElementsInFile) {
            addInternalEmitFlags(visited, InternalEmitFlags.TransformPrivateStaticElements);
            shouldTransformPrivateStaticElementsInFile = false;
        }
        return visited;
    }

    function updateState() {
        classInfo = undefined;
        classThis = undefined;
        classSuper = undefined;
        switch (top?.kind) {
            case "class":
                classInfo = top.classInfo;
                break;
            case "class-element":
                classInfo = top.next.classInfo;
                classThis = top.classThis;
                classSuper = top.classSuper;
                break;
            case "name":
                const grandparent = top.next.next.next;
                if (grandparent?.kind === "class-element") {
                    classInfo = grandparent.next.classInfo;
                    classThis = grandparent.classThis;
                    classSuper = grandparent.classSuper;
                }
                break;
        }
    }

    function enterClass(classInfo: ClassInfo | undefined) {
        top = { kind: "class", next: top, classInfo, savedPendingExpressions: pendingExpressions };
        pendingExpressions = undefined;
        updateState();
    }

    function exitClass() {
        Debug.assert(top?.kind === "class", "Incorrect value for top.kind.", () => `Expected top.kind to be 'class' but got '${top?.kind}' instead.`);
        pendingExpressions = top.savedPendingExpressions;
        top = top.next;
        updateState();
    }

    function enterClassElement(node: ClassElement) {
        Debug.assert(top?.kind === "class", "Incorrect value for top.kind.", () => `Expected top.kind to be 'class' but got '${top?.kind}' instead.`);
        top = { kind: "class-element", next: top };
        if (isClassStaticBlockDeclaration(node) || isPropertyDeclaration(node) && hasStaticModifier(node)) {
            top.classThis = top.next.classInfo?.classThis;
            top.classSuper = top.next.classInfo?.classSuper;
        }
        updateState();
    }

    function exitClassElement() {
        Debug.assert(top?.kind === "class-element", "Incorrect value for top.kind.", () => `Expected top.kind to be 'class-element' but got '${top?.kind}' instead.`);
        Debug.assert(top.next?.kind === "class", "Incorrect value for top.next.kind.", () => `Expected top.next.kind to be 'class' but got '${top!.next?.kind}' instead.`);
        top = top.next;
        updateState();
    }

    function enterName() {
        Debug.assert(top?.kind === "class-element", "Incorrect value for top.kind.", () => `Expected top.kind to be 'class-element' but got '${top?.kind}' instead.`);
        top = { kind: "name", next: top };
        updateState();
    }

    function exitName() {
        Debug.assert(top?.kind === "name", "Incorrect value for top.kind.", () => `Expected top.kind to be 'name' but got '${top?.kind}' instead.`);
        top = top.next;
        updateState();
    }

    function enterOther() {
        if (top?.kind === "other") {
            Debug.assert(!pendingExpressions);
            top.depth++;
        }
        else {
            top = { kind: "other", next: top, depth: 0, savedPendingExpressions: pendingExpressions };
            pendingExpressions = undefined;
            updateState();
        }
    }

    function exitOther() {
        Debug.assert(top?.kind === "other", "Incorrect value for top.kind.", () => `Expected top.kind to be 'other' but got '${top?.kind}' instead.`);
        if (top.depth > 0) {
            Debug.assert(!pendingExpressions);
            top.depth--;
        }
        else {
            pendingExpressions = top.savedPendingExpressions;
            top = top.next;
            updateState();
        }
    }

    function shouldVisitNode(node: Node) {
        return !!(node.transformFlags & TransformFlags.ContainsDecorators)
            || !!classThis && !!(node.transformFlags & TransformFlags.ContainsLexicalThis)
            || !!classThis && !!classSuper && !!(node.transformFlags & TransformFlags.ContainsLexicalSuper);
    }

    function visitor(node: Node): VisitResult<Node> {
        if (!shouldVisitNode(node)) {
            return node;
        }

        switch (node.kind) {
            case SyntaxKind.Decorator: // elided, will be emitted as part of `visitClassDeclaration`
                return Debug.fail("Use `modifierVisitor` instead.");
            case SyntaxKind.ClassDeclaration:
                return visitClassDeclaration(node as ClassDeclaration);
            case SyntaxKind.ClassExpression:
                return visitClassExpression(node as ClassExpression);
            case SyntaxKind.Constructor:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.ClassStaticBlockDeclaration:
                return Debug.fail("Not supported outside of a class. Use 'classElementVisitor' instead.");
            case SyntaxKind.Parameter:
                return visitParameterDeclaration(node as ParameterDeclaration);

            // Support NamedEvaluation to ensure the correct class name for class expressions.
            case SyntaxKind.BinaryExpression:
                return visitBinaryExpression(node as BinaryExpression, /*discarded*/ false);
            case SyntaxKind.PropertyAssignment:
                return visitPropertyAssignment(node as PropertyAssignment);
            case SyntaxKind.VariableDeclaration:
                return visitVariableDeclaration(node as VariableDeclaration);
            case SyntaxKind.BindingElement:
                return visitBindingElement(node as BindingElement);
            case SyntaxKind.ExportAssignment:
                return visitExportAssignment(node as ExportAssignment);
            case SyntaxKind.ThisKeyword:
                return visitThisExpression(node as ThisExpression);
            case SyntaxKind.ForStatement:
                return visitForStatement(node as ForStatement);
            case SyntaxKind.ExpressionStatement:
                return visitExpressionStatement(node as ExpressionStatement);
            case SyntaxKind.CommaListExpression:
                return visitCommaListExpression(node as CommaListExpression, /*discarded*/ false);
            case SyntaxKind.ParenthesizedExpression:
                return visitParenthesizedExpression(node as ParenthesizedExpression, /*discarded*/ false);
            case SyntaxKind.PartiallyEmittedExpression:
                return visitPartiallyEmittedExpression(node as PartiallyEmittedExpression, /*discarded*/ false);
            case SyntaxKind.CallExpression:
                return visitCallExpression(node as CallExpression);
            case SyntaxKind.TaggedTemplateExpression:
                return visitTaggedTemplateExpression(node as TaggedTemplateExpression);
            case SyntaxKind.PrefixUnaryExpression:
            case SyntaxKind.PostfixUnaryExpression:
                return visitPreOrPostfixUnaryExpression(node as PrefixUnaryExpression | PostfixUnaryExpression, /*discarded*/ false);
            case SyntaxKind.PropertyAccessExpression:
                return visitPropertyAccessExpression(node as PropertyAccessExpression);
            case SyntaxKind.ElementAccessExpression:
                return visitElementAccessExpression(node as ElementAccessExpression);
            case SyntaxKind.ComputedPropertyName:
                return visitComputedPropertyName(node as ComputedPropertyName);

            case SyntaxKind.MethodDeclaration: // object literal methods and accessors
            case SyntaxKind.SetAccessor:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.FunctionDeclaration: {
                enterOther();
                const result = visitEachChild(node, fallbackVisitor, context);
                exitOther();
                return result;
            }

            default:
                return visitEachChild(node, fallbackVisitor, context);
        }
    }

    function fallbackVisitor(node: Node): VisitResult<Node | undefined> {
        switch (node.kind) {
            case SyntaxKind.Decorator:
                return undefined;
            default:
                return visitor(node);
        }
    }

    function modifierVisitor(node: ModifierLike): VisitResult<Modifier | undefined> {
        switch (node.kind) {
            case SyntaxKind.Decorator: // elided, will be emitted as part of `visitClassDeclaration`
                return undefined;
            default:
                return node;
        }
    }

    function classElementVisitor(node: Node) {
        switch (node.kind) {
            case SyntaxKind.Constructor:
                return visitConstructorDeclaration(node as ConstructorDeclaration);
            case SyntaxKind.MethodDeclaration:
                return visitMethodDeclaration(node as MethodDeclaration);
            case SyntaxKind.GetAccessor:
                return visitGetAccessorDeclaration(node as GetAccessorDeclaration);
            case SyntaxKind.SetAccessor:
                return visitSetAccessorDeclaration(node as SetAccessorDeclaration);
            case SyntaxKind.PropertyDeclaration:
                return visitPropertyDeclaration(node as PropertyDeclaration);
            case SyntaxKind.ClassStaticBlockDeclaration:
                return visitClassStaticBlockDeclaration(node as ClassStaticBlockDeclaration);
            default:
                return visitor(node);
        }
    }

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

    function getHelperVariableName(node: ClassLikeDeclaration | ClassElement) {
        let declarationName = node.name && isIdentifier(node.name) && !isGeneratedIdentifier(node.name) ? idText(node.name) :
            node.name && isPrivateIdentifier(node.name) && !isGeneratedIdentifier(node.name) ? idText(node.name).slice(1) :
            node.name && isStringLiteral(node.name) && isIdentifierText(node.name.text, ScriptTarget.ESNext) ? node.name.text :
            isClassLike(node) ? "class" : "member";
        if (isGetAccessor(node)) declarationName = `get_${declarationName}`;
        if (isSetAccessor(node)) declarationName = `set_${declarationName}`;
        if (node.name && isPrivateIdentifier(node.name)) declarationName = `private_${declarationName}`;
        if (isStatic(node)) declarationName = `static_${declarationName}`;
        return "_" + declarationName;
    }

    function createHelperVariable(node: ClassLikeDeclaration | ClassElement, suffix: string) {
        return factory.createUniqueName(`${getHelperVariableName(node)}_${suffix}`, GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.ReservedInNestedScopes);
    }

    function createLet(name: Identifier, initializer?: Expression) {
        return factory.createVariableStatement(
            /*modifiers*/ undefined,
            factory.createVariableDeclarationList([
                factory.createVariableDeclaration(
                    name,
                    /*exclamationToken*/ undefined,
                    /*type*/ undefined,
                    initializer,
                ),
            ], NodeFlags.Let),
        );
    }

    function createClassInfo(node: ClassLikeDeclaration): ClassInfo {
        const metadataReference = factory.createUniqueName("_metadata", GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel);
        let instanceMethodExtraInitializersName: Identifier | undefined;
        let staticMethodExtraInitializersName: Identifier | undefined;
        let hasStaticInitializers = false;
        let hasNonAmbientInstanceFields = false;
        let hasStaticPrivateClassElements = false;
        let classThis: Identifier | undefined;
        let pendingStaticInitializers: Expression[] | undefined;
        let pendingInstanceInitializers: Expression[] | undefined;

        // Before visiting we perform a first pass to collect information we'll need
        // as we descend.

        if (nodeIsDecorated(/*useLegacyDecorators*/ false, node)) {
            // We do not mark _classThis as FileLevel if it may be reused by class private fields, which requires the
            // ability access the captured `_classThis` of outer scopes.
            const needsUniqueClassThis = some(node.members, member => (isPrivateIdentifierClassElementDeclaration(member) || isAutoAccessorPropertyDeclaration(member)) && hasStaticModifier(member));
            classThis = factory.createUniqueName(
                "_classThis",
                needsUniqueClassThis ?
                    GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.ReservedInNestedScopes :
                    GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel,
            );
        }

        for (const member of node.members) {
            if (isMethodOrAccessor(member) && nodeOrChildIsDecorated(/*useLegacyDecorators*/ false, member, node)) {
                if (hasStaticModifier(member)) {
                    if (!staticMethodExtraInitializersName) {
                        staticMethodExtraInitializersName = factory.createUniqueName("_staticExtraInitializers", GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel);
                        const initializer = emitHelpers().createRunInitializersHelper(classThis ?? factory.createThis(), staticMethodExtraInitializersName);
                        setSourceMapRange(initializer, node.name ?? moveRangePastDecorators(node));
                        pendingStaticInitializers ??= [];
                        pendingStaticInitializers.push(initializer);
                    }
                }
                else {
                    if (!instanceMethodExtraInitializersName) {
                        instanceMethodExtraInitializersName = factory.createUniqueName("_instanceExtraInitializers", GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel);
                        const initializer = emitHelpers().createRunInitializersHelper(factory.createThis(), instanceMethodExtraInitializersName);
                        setSourceMapRange(initializer, node.name ?? moveRangePastDecorators(node));
                        pendingInstanceInitializers ??= [];
                        pendingInstanceInitializers.push(initializer);
                    }
                    instanceMethodExtraInitializersName ??= factory.createUniqueName("_instanceExtraInitializers", GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel);
                }
            }
            if (isClassStaticBlockDeclaration(member)) {
                if (!isClassNamedEvaluationHelperBlock(member)) {
                    hasStaticInitializers = true;
                }
            }
            else if (isPropertyDeclaration(member)) {
                if (hasStaticModifier(member)) {
                    hasStaticInitializers ||= !!member.initializer || hasDecorators(member);
                }
                else {
                    hasNonAmbientInstanceFields ||= !isAmbientPropertyDeclaration(member);
                }
            }

            if ((isPrivateIdentifierClassElementDeclaration(member) || isAutoAccessorPropertyDeclaration(member)) && hasStaticModifier(member)) {
                hasStaticPrivateClassElements = true;
            }

            // exit early if possible
            if (
                staticMethodExtraInitializersName &&
                instanceMethodExtraInitializersName &&
                hasStaticInitializers &&
                hasNonAmbientInstanceFields &&
                hasStaticPrivateClassElements
            ) {
                break;
            }
        }

        return {
            class: node,
            classThis,
            metadataReference,
            instanceMethodExtraInitializersName,
            staticMethodExtraInitializersName,
            hasStaticInitializers,
            hasNonAmbientInstanceFields,
            hasStaticPrivateClassElements,
            pendingStaticInitializers,
            pendingInstanceInitializers,
        };
    }

    function transformClassLike(node: ClassLikeDeclaration) {
        startLexicalEnvironment();

        // When a class has class decorators we end up transforming it into a statement that would otherwise give it an
        // assigned name. If the class doesn't have an assigned name, we'll give it an assigned name of `""`)
        if (!classHasDeclaredOrExplicitlyAssignedName(node) && classOrConstructorParameterIsDecorated(/*useLegacyDecorators*/ false, node)) {
            node = injectClassNamedEvaluationHelperBlockIfMissing(context, node, factory.createStringLiteral(""));
        }

        const classReference = factory.getLocalName(node, /*allowComments*/ false, /*allowSourceMaps*/ false, /*ignoreAssignedName*/ true);
        const classInfo = createClassInfo(node);
        const classDefinitionStatements: Statement[] = [];
        let leadingBlockStatements: Statement[] | undefined;
        let trailingBlockStatements: Statement[] | undefined;
        let syntheticConstructor: ConstructorDeclaration | undefined;
        let heritageClauses: NodeArray<HeritageClause> | undefined;
        let shouldTransformPrivateStaticElementsInClass = false;

        // 1. Class decorators are evaluated outside of the private name scope of the class.
        const classDecorators = transformAllDecoratorsOfDeclaration(getAllDecoratorsOfClass(node, /*useLegacyDecorators*/ false));
        if (classDecorators) {
            // - Since class decorators don't have privileged access to private names defined inside the class,
            //   they must be evaluated outside of the class body.
            // - Since a class decorator can replace the class constructor, we must define a variable to keep track
            //   of the mutated class.
            // - Since a class decorator can add extra initializers, we must define a variable to keep track of
            //   extra initializers.
            classInfo.classDecoratorsName = factory.createUniqueName("_classDecorators", GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel);
            classInfo.classDescriptorName = factory.createUniqueName("_classDescriptor", GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel);
            classInfo.classExtraInitializersName = factory.createUniqueName("_classExtraInitializers", GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel);
            Debug.assertIsDefined(classInfo.classThis);
            classDefinitionStatements.push(
                createLet(classInfo.classDecoratorsName, factory.createArrayLiteralExpression(classDecorators)),
                createLet(classInfo.classDescriptorName),
                createLet(classInfo.classExtraInitializersName, factory.createArrayLiteralExpression()),
                createLet(classInfo.classThis),
            );

            if (classInfo.hasStaticPrivateClassElements) {
                shouldTransformPrivateStaticElementsInClass = true;
                shouldTransformPrivateStaticElementsInFile = true;
            }
        }

        // Rewrite `super` in static initializers so that we can use the correct `this`.
        const extendsClause = getHeritageClause(node.heritageClauses, SyntaxKind.ExtendsKeyword);
        const extendsElement = extendsClause && firstOrUndefined(extendsClause.types);
        const extendsExpression = extendsElement && visitNode(extendsElement.expression, visitor, isExpression);
        if (extendsExpression) {
            classInfo.classSuper = factory.createUniqueName("_classSuper", GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel);

            // Ensure we do not give the class or function an assigned name due to the variable by prefixing it
            // with `0, `.
            const unwrapped = skipOuterExpressions(extendsExpression);
            const safeExtendsExpression = isClassExpression(unwrapped) && !unwrapped.name ||
                    isFunctionExpression(unwrapped) && !unwrapped.name ||
                    isArrowFunction(unwrapped) ?
                factory.createComma(factory.createNumericLiteral(0), extendsExpression) :
                extendsExpression;
            classDefinitionStatements.push(createLet(classInfo.classSuper, safeExtendsExpression));
            const updatedExtendsElement = factory.updateExpressionWithTypeArguments(extendsElement, classInfo.classSuper, /*typeArguments*/ undefined);
            const updatedExtendsClause = factory.updateHeritageClause(extendsClause, [updatedExtendsElement]);
            heritageClauses = factory.createNodeArray([updatedExtendsClause]);
        }

        const renamedClassThis = classInfo.classThis ?? factory.createThis();

        // 3. The name of the class is assigned.
        //
        // If the class did not have a name, the caller should have performed injectClassNamedEvaluationHelperBlockIfMissing
        // prior to calling this function if a name was needed.

        // 4. For each member:
        //    a. Member Decorators are evaluated
        //    b. Computed Property Name is evaluated, if present

        // We visit members in two passes:
        // - The first pass visits methods, accessors, and fields to collect decorators and computed property names.
        // - The second pass visits the constructor to add instance initializers.
        //
        // NOTE: If there are no constructors, but there are instance initializers, a synthetic constructor is added.
        enterClass(classInfo);

        leadingBlockStatements = append(leadingBlockStatements, createMetadata(classInfo.metadataReference, classInfo.classSuper));

        // Since the constructor can appear anywhere in the class body and its transform depends on other class elements,
        // we must first visit all non-constructor members, then visit the constructor, all while maintaining document order.
        let members = node.members;
        members = visitNodes(members, node => isConstructorDeclaration(node) ? node : classElementVisitor(node), isClassElement);
        members = visitNodes(members, node => isConstructorDeclaration(node) ? classElementVisitor(node) : node, isClassElement);
        if (pendingExpressions) {
            let outerThis: Identifier | undefined;
            for (let expression of pendingExpressions) {
                // If a pending expression contains a lexical `this`, we'll need to capture the lexical `this` of the
                // container and transform it in the expression. This ensures we use the correct `this` in the resulting
                // class `static` block. We don't use substitution here because the size of the tree we are visiting
                // is likely to be small and doesn't justify the complexity of introducing substitution.
                expression = visitNode(expression, function thisVisitor(node: Node): Node {
                    if (!(node.transformFlags & TransformFlags.ContainsLexicalThis)) {
                        return node;
                    }

                    switch (node.kind) {
                        case SyntaxKind.ThisKeyword:
                            if (!outerThis) {
                                outerThis = factory.createUniqueName("_outerThis", GeneratedIdentifierFlags.Optimistic);
                                classDefinitionStatements.unshift(createLet(outerThis, factory.createThis()));
                            }
                            return outerThis;

                        default:
                            return visitEachChild(node, thisVisitor, context);
                    }
                }, isExpression);

                const statement = factory.createExpressionStatement(expression);
                leadingBlockStatements = append(leadingBlockStatements, statement);
            }
            pendingExpressions = undefined;
        }
        exitClass();

        if (some(classInfo.pendingInstanceInitializers) && !getFirstConstructorWithBody(node)) {
            const initializerStatements = prepareConstructor(node, classInfo);
            if (initializerStatements) {
                const extendsClauseElement = getEffectiveBaseTypeNode(node);
                const isDerivedClass = !!(extendsClauseElement && skipOuterExpressions(extendsClauseElement.expression).kind !== SyntaxKind.NullKeyword);
                const constructorStatements: Statement[] = [];
                if (isDerivedClass) {
                    const spreadArguments = factory.createSpreadElement(factory.createIdentifier("arguments"));
                    const superCall = factory.createCallExpression(factory.createSuper(), /*typeArguments*/ undefined, [spreadArguments]);
                    constructorStatements.push(factory.createExpressionStatement(superCall));
                }

                addRange(constructorStatements, initializerStatements);

                const constructorBody = factory.createBlock(constructorStatements, /*multiLine*/ true);
                syntheticConstructor = factory.createConstructorDeclaration(/*modifiers*/ undefined, [], constructorBody);
            }
        }

        // Used in class definition steps 5, 7, and 11
        if (classInfo.staticMethodExtraInitializersName) {
            classDefinitionStatements.push(
                createLet(classInfo.staticMethodExtraInitializersName, factory.createArrayLiteralExpression()),
            );
        }

        // Used in class definition steps 6, 8, and during construction
        if (classInfo.instanceMethodExtraInitializersName) {
            classDefinitionStatements.push(
                createLet(classInfo.instanceMethodExtraInitializersName, factory.createArrayLiteralExpression()),
            );
        }

        // Used in class definition steps 7, 8, 12, and construction
        if (classInfo.memberInfos) {
            forEachEntry(classInfo.memberInfos, (memberInfo, member) => {
                if (isStatic(member)) {
                    classDefinitionStatements.push(createLet(memberInfo.memberDecoratorsName));
                    if (memberInfo.memberInitializersName) {
                        classDefinitionStatements.push(createLet(memberInfo.memberInitializersName, factory.createArrayLiteralExpression()));
                    }
                    if (memberInfo.memberExtraInitializersName) {
                        classDefinitionStatements.push(createLet(memberInfo.memberExtraInitializersName, factory.createArrayLiteralExpression()));
                    }
                    if (memberInfo.memberDescriptorName) {
                        classDefinitionStatements.push(createLet(memberInfo.memberDescriptorName));
                    }
                }
            });
        }

        // Used in class definition steps 7, 8, 12, and construction
        if (classInfo.memberInfos) {
            forEachEntry(classInfo.memberInfos, (memberInfo, member) => {
                if (!isStatic(member)) {
                    classDefinitionStatements.push(createLet(memberInfo.memberDecoratorsName));
                    if (memberInfo.memberInitializersName) {
                        classDefinitionStatements.push(createLet(memberInfo.memberInitializersName, factory.createArrayLiteralExpression()));
                    }
                    if (memberInfo.memberExtraInitializersName) {
                        classDefinitionStatements.push(createLet(memberInfo.memberExtraInitializersName, factory.createArrayLiteralExpression()));
                    }
                    if (memberInfo.memberDescriptorName) {
                        classDefinitionStatements.push(createLet(memberInfo.memberDescriptorName));
                    }
                }
            });
        }

        // 5. Static non-field element decorators are applied
        leadingBlockStatements = addRange(leadingBlockStatements, classInfo.staticNonFieldDecorationStatements);

        // 6. Non-static non-field element decorators are applied
        leadingBlockStatements = addRange(leadingBlockStatements, classInfo.nonStaticNonFieldDecorationStatements);

        // 7. Static field element decorators are applied
        leadingBlockStatements = addRange(leadingBlockStatements, classInfo.staticFieldDecorationStatements);

        // 8. Non-static field element decorators are applied
        leadingBlockStatements = addRange(leadingBlockStatements, classInfo.nonStaticFieldDecorationStatements);

        // 9. Class decorators are applied
        // 10. Class binding is initialized
        if (classInfo.classDescriptorName && classInfo.classDecoratorsName && classInfo.classExtraInitializersName && classInfo.classThis) {
            leadingBlockStatements ??= [];

            // produces:
            //  __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name, metadata }, _classExtraInitializers);
            const valueProperty = factory.createPropertyAssignment("value", renamedClassThis);
            const classDescriptor = factory.createObjectLiteralExpression([valueProperty]);
            const classDescriptorAssignment = factory.createAssignment(classInfo.classDescriptorName, classDescriptor);
            const classNameReference = factory.createPropertyAccessExpression(renamedClassThis, "name");
            const esDecorateHelper = emitHelpers().createESDecorateHelper(
                factory.createNull(),
                classDescriptorAssignment,
                classInfo.classDecoratorsName,
                { kind: "class", name: classNameReference, metadata: classInfo.metadataReference },
                factory.createNull(),
                classInfo.classExtraInitializersName,
            );
            const esDecorateStatement = factory.createExpressionStatement(esDecorateHelper);
            setSourceMapRange(esDecorateStatement, moveRangePastDecorators(node));
            leadingBlockStatements.push(esDecorateStatement);

            // produces:
            //  C = _classThis = _classDescriptor.value;
            const classDescriptorValueReference = factory.createPropertyAccessExpression(classInfo.classDescriptorName, "value");
            const classThisAssignment = factory.createAssignment(classInfo.classThis, classDescriptorValueReference);
            const classReferenceAssignment = factory.createAssignment(classReference, classThisAssignment);
            leadingBlockStatements.push(factory.createExpressionStatement(classReferenceAssignment));
        }

        // produces:
        //  if (metadata) Object.defineProperty(C, Symbol.metadata, { configurable: true, writable: true, value: metadata });
        leadingBlockStatements.push(createSymbolMetadata(renamedClassThis, classInfo.metadataReference));

        // 11. Static extra initializers are evaluated
        // 12. Static fields are initialized (incl. extra initializers) and static blocks are evaluated
        if (some(classInfo.pendingStaticInitializers)) {
            for (const initializer of classInfo.pendingStaticInitializers) {
                const initializerStatement = factory.createExpressionStatement(initializer);
                setSourceMapRange(initializerStatement, getSourceMapRange(initializer));
                trailingBlockStatements = append(trailingBlockStatements, initializerStatement);
            }
            classInfo.pendingStaticInitializers = undefined;
        }

        // 13. Class extra initializers are evaluated
        if (classInfo.classExtraInitializersName) {
            const runClassInitializersHelper = emitHelpers().createRunInitializersHelper(renamedClassThis, classInfo.classExtraInitializersName);
            const runClassInitializersStatement = factory.createExpressionStatement(runClassInitializersHelper);
            setSourceMapRange(runClassInitializersStatement, node.name ?? moveRangePastDecorators(node));
            trailingBlockStatements = append(trailingBlockStatements, runClassInitializersStatement);
        }

        // If there are no other static initializers to run, combine the leading and trailing block statements
        if (leadingBlockStatements && trailingBlockStatements && !classInfo.hasStaticInitializers) {
            addRange(leadingBlockStatements, trailingBlockStatements);
            trailingBlockStatements = undefined;
        }

        // prepare a leading `static {}` block, if necessary
        //
        // produces:
        //  class C {
        //      static { ... }
        //      ...
        //  }
        const leadingStaticBlock = leadingBlockStatements &&
            factory.createClassStaticBlockDeclaration(factory.createBlock(leadingBlockStatements, /*multiLine*/ true));

        if (leadingStaticBlock && shouldTransformPrivateStaticElementsInClass) {
            // We use `InternalEmitFlags.TransformPrivateStaticElements` as a marker on a class static block
            // to inform the classFields transform that it shouldn't rename `this` to `_classThis` in the
            // transformed class static block.
            setInternalEmitFlags(leadingStaticBlock, InternalEmitFlags.TransformPrivateStaticElements);
        }

        // prepare a trailing `static {}` block, if necessary
        //
        // produces:
        //  class C {
        //      ...
        //      static { ... }
        //  }
        const trailingStaticBlock = trailingBlockStatements &&
            factory.createClassStaticBlockDeclaration(factory.createBlock(trailingBlockStatements, /*multiLine*/ true));

        if (leadingStaticBlock || syntheticConstructor || trailingStaticBlock) {
            const newMembers: ClassElement[] = [];

            // add the NamedEvaluation helper block, if needed
            const existingNamedEvaluationHelperBlockIndex = members.findIndex(isClassNamedEvaluationHelperBlock);

            // add the leading `static {}` block
            if (leadingStaticBlock) {
                // add the `static {}` block after any existing NamedEvaluation helper block, if one exists.
                addRange(newMembers, members, 0, existingNamedEvaluationHelperBlockIndex + 1);
                newMembers.push(leadingStaticBlock);
                addRange(newMembers, members, existingNamedEvaluationHelperBlockIndex + 1);
            }
            else {
                addRange(newMembers, members);
            }

            // append the synthetic constructor, if necessary
            if (syntheticConstructor) {
                newMembers.push(syntheticConstructor);
            }

            // append a trailing `static {}` block, if necessary
            if (trailingStaticBlock) {
                newMembers.push(trailingStaticBlock);
            }

            members = setTextRange(factory.createNodeArray(newMembers), members);
        }

        const lexicalEnvironment = endLexicalEnvironment();
        let classExpression: ClassExpression;
        if (classDecorators) {
            // We use `var` instead of `let` so we can leverage NamedEvaluation to define the class name
            // and still be able to ensure it is initialized prior to any use in `static {}`.

            // produces:
            //  (() => {
            //      let _classDecorators = [...];
            //      let _classDescriptor;
            //      let _classExtraInitializers = [];
            //      let _classThis;
            //      ...
            //      var C = class {
            //          static {
            //              __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, ...);
            //              // `C` is initialized here
            //              C = _classThis = _classDescriptor.value;
            //          }
            //          static x = 1;
            //          static y = C.x; // `C` will already be defined here.
            //          static { ... }
            //      };
            //      return C;
            //  })();

            classExpression = factory.createClassExpression(/*modifiers*/ undefined, /*name*/ undefined, /*typeParameters*/ undefined, heritageClauses, members);
            if (classInfo.classThis) {
                classExpression = injectClassThisAssignmentIfMissing(factory, classExpression, classInfo.classThis);
            }

            const classReferenceDeclaration = factory.createVariableDeclaration(classReference, /*exclamationToken*/ undefined, /*type*/ undefined, classExpression);
            const classReferenceVarDeclList = factory.createVariableDeclarationList([classReferenceDeclaration]);
            const returnExpr = classInfo.classThis ? factory.createAssignment(classReference, classInfo.classThis) : classReference;
            classDefinitionStatements.push(
                factory.createVariableStatement(/*modifiers*/ undefined, classReferenceVarDeclList),
                factory.createReturnStatement(returnExpr),
            );
        }
        else {
            // produces:
            //  return <classExpression>;
            classExpression = factory.createClassExpression(/*modifiers*/ undefined, node.name, /*typeParameters*/ undefined, heritageClauses, members);
            classDefinitionStatements.push(factory.createReturnStatement(classExpression));
        }

        if (shouldTransformPrivateStaticElementsInClass) {
            addInternalEmitFlags(classExpression, InternalEmitFlags.TransformPrivateStaticElements);
            for (const member of classExpression.members) {
                if ((isPrivateIdentifierClassElementDeclaration(member) || isAutoAccessorPropertyDeclaration(member)) && hasStaticModifier(member)) {
                    addInternalEmitFlags(member, InternalEmitFlags.TransformPrivateStaticElements);
                }
            }
        }

        setOriginalNode(classExpression, node);
        return factory.createImmediatelyInvokedArrowFunction(factory.mergeLexicalEnvironment(classDefinitionStatements, lexicalEnvironment));
    }

    function isDecoratedClassLike(node: ClassLikeDeclaration) {
        return classOrConstructorParameterIsDecorated(/*useLegacyDecorators*/ false, node) ||
            childIsDecorated(/*useLegacyDecorators*/ false, node);
    }

    function visitClassDeclaration(node: ClassDeclaration): VisitResult<Statement> {
        if (isDecoratedClassLike(node)) {
            const statements: Statement[] = [];
            const originalClass = getOriginalNode(node, isClassLike) ?? node;
            const className = originalClass.name ? factory.createStringLiteralFromNode(originalClass.name) : factory.createStringLiteral("default");
            const isExport = hasSyntacticModifier(node, ModifierFlags.Export);
            const isDefault = hasSyntacticModifier(node, ModifierFlags.Default);
            if (!node.name) {
                node = injectClassNamedEvaluationHelperBlockIfMissing(context, node, className);
            }
            if (isExport && isDefault) {
                const iife = transformClassLike(node);
                if (node.name) {
                    //  let C = (() => { ... })();
                    //  export default C;
                    const varDecl = factory.createVariableDeclaration(factory.getLocalName(node), /*exclamationToken*/ undefined, /*type*/ undefined, iife);
                    setOriginalNode(varDecl, node);

                    const varDecls = factory.createVariableDeclarationList([varDecl], NodeFlags.Let);
                    const varStatement = factory.createVariableStatement(/*modifiers*/ undefined, varDecls);
                    statements.push(varStatement);

                    const exportStatement = factory.createExportDefault(factory.getDeclarationName(node));
                    setOriginalNode(exportStatement, node);
                    setCommentRange(exportStatement, getCommentRange(node));
                    setSourceMapRange(exportStatement, moveRangePastDecorators(node));
                    statements.push(exportStatement);
                }
                else {
                    //  export default (() => { ... })();
                    const exportStatement = factory.createExportDefault(iife);
                    setOriginalNode(exportStatement, node);
                    setCommentRange(exportStatement, getCommentRange(node));
                    setSourceMapRange(exportStatement, moveRangePastDecorators(node));
                    statements.push(exportStatement);
                }
            }
            else {
                //  let C = (() => { ... })();
                Debug.assertIsDefined(node.name, "A class declaration that is not a default export must have a name.");
                const iife = transformClassLike(node);
                const modifierVisitorNoExport = isExport ? ((node: ModifierLike) => isExportModifier(node) ? undefined : modifierVisitor(node)) : modifierVisitor;
                const modifiers = visitNodes(node.modifiers, modifierVisitorNoExport, isModifier);
                const declName = factory.getLocalName(node, /*allowComments*/ false, /*allowSourceMaps*/ true);
                const varDecl = factory.createVariableDeclaration(declName, /*exclamationToken*/ undefined, /*type*/ undefined, iife);
                setOriginalNode(varDecl, node);

                const varDecls = factory.createVariableDeclarationList([varDecl], NodeFlags.Let);
                const varStatement = factory.createVariableStatement(modifiers, varDecls);
                setOriginalNode(varStatement, node);
                setCommentRange(varStatement, getCommentRange(node));
                statements.push(varStatement);
                if (isExport) {
                    //  export { C };
                    const exportStatement = factory.createExternalModuleExport(declName);
                    setOriginalNode(exportStatement, node);
                    statements.push(exportStatement);
                }
            }
            return singleOrMany(statements);
        }
        else {
            const modifiers = visitNodes(node.modifiers, modifierVisitor, isModifier);
            const heritageClauses = visitNodes(node.heritageClauses, visitor, isHeritageClause);
            enterClass(/*classInfo*/ undefined);
            const members = visitNodes(node.members, classElementVisitor, isClassElement);
            exitClass();
            return factory.updateClassDeclaration(node, modifiers, node.name, /*typeParameters*/ undefined, heritageClauses, members);
        }
    }

    function visitClassExpression(node: ClassExpression) {
        if (isDecoratedClassLike(node)) {
            const iife = transformClassLike(node);
            setOriginalNode(iife, node);
            return iife;
        }
        else {
            const modifiers = visitNodes(node.modifiers, modifierVisitor, isModifier);
            const heritageClauses = visitNodes(node.heritageClauses, visitor, isHeritageClause);
            enterClass(/*classInfo*/ undefined);
            const members = visitNodes(node.members, classElementVisitor, isClassElement);
            exitClass();
            return factory.updateClassExpression(node, modifiers, node.name, /*typeParameters*/ undefined, heritageClauses, members);
        }
    }

    function prepareConstructor(_parent: ClassLikeDeclaration, classInfo: ClassInfo) {
        // Decorated instance members can add "extra" initializers to the instance. If a class contains any instance
        // fields, we'll inject the `__runInitializers()` call for these extra initializers into the initializer of
        // the first class member that will be initialized. However, if the class does not contain any fields that
        // we can piggyback on, we need to synthesize a `__runInitializers()` call in the constructor instead.
        if (some(classInfo.pendingInstanceInitializers)) {
            // If there are instance extra initializers we need to add them to the body along with any
            // field initializers
            const statements: Statement[] = [];

            statements.push(
                factory.createExpressionStatement(
                    factory.inlineExpressions(classInfo.pendingInstanceInitializers),
                ),
            );

            classInfo.pendingInstanceInitializers = undefined;
            return statements;
        }
    }

    function transformConstructorBodyWorker(statementsOut: Statement[], statementsIn: NodeArray<Statement>, statementOffset: number, superPath: readonly number[], superPathDepth: number, initializerStatements: readonly Statement[]) {
        const superStatementIndex = superPath[superPathDepth];
        const superStatement = statementsIn[superStatementIndex];
        addRange(statementsOut, visitNodes(statementsIn, visitor, isStatement, statementOffset, superStatementIndex - statementOffset));
        if (isTryStatement(superStatement)) {
            const tryBlockStatements: Statement[] = [];

            transformConstructorBodyWorker(
                tryBlockStatements,
                superStatement.tryBlock.statements,
                /*statementOffset*/ 0,
                superPath,
                superPathDepth + 1,
                initializerStatements,
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
            addRange(statementsOut, initializerStatements);
        }
        addRange(statementsOut, visitNodes(statementsIn, visitor, isStatement, superStatementIndex + 1));
    }

    function visitConstructorDeclaration(node: ConstructorDeclaration) {
        enterClassElement(node);
        const modifiers = visitNodes(node.modifiers, modifierVisitor, isModifier);
        const parameters = visitNodes(node.parameters, visitor, isParameter);
        let body: Block | undefined;
        if (node.body && classInfo) {
            // If there are instance extra initializers we need to add them to the body along with any
            // field initializers
            const initializerStatements = prepareConstructor(classInfo.class, classInfo);
            if (initializerStatements) {
                const statements: Statement[] = [];
                const nonPrologueStart = factory.copyPrologue(node.body.statements, statements, /*ensureUseStrict*/ false, visitor);
                const superStatementIndices = findSuperStatementIndexPath(node.body.statements, nonPrologueStart);
                if (superStatementIndices.length > 0) {
                    transformConstructorBodyWorker(statements, node.body.statements, nonPrologueStart, superStatementIndices, 0, initializerStatements);
                }
                else {
                    addRange(statements, initializerStatements);
                    addRange(statements, visitNodes(node.body.statements, visitor, isStatement));
                }
                body = factory.createBlock(statements, /*multiLine*/ true);
                setOriginalNode(body, node.body);
                setTextRange(body, node.body);
            }
        }

        body ??= visitNode(node.body, visitor, isBlock);
        exitClassElement();
        return factory.updateConstructorDeclaration(node, modifiers, parameters, body);
    }

    function finishClassElement(updated: ClassElement, original: ClassElement) {
        if (updated !== original) {
            // While we emit the source map for the node after skipping decorators and modifiers,
            // we need to emit the comments for the original range.
            setCommentRange(updated, original);
            setSourceMapRange(updated, moveRangePastDecorators(original));
        }
        return updated;
    }

    function partialTransformClassElement<
        TNode extends MethodDeclaration | PropertyDeclaration | GetAccessorDeclaration | SetAccessorDeclaration,
    >(
        member: TNode,
        classInfo: ClassInfo | undefined,
        createDescriptor?: (node: TNode & { readonly name: PrivateIdentifier; }, modifiers: ModifiersArray | undefined) => Expression,
    ) {
        let referencedName: Expression | undefined;
        let name: PropertyName | undefined;
        let initializersName: Identifier | undefined;
        let extraInitializersName: Identifier | undefined;
        let thisArg: Identifier | undefined;
        let descriptorName: Identifier | undefined;
        if (!classInfo) {
            const modifiers = visitNodes(member.modifiers, modifierVisitor, isModifier);
            enterName();
            name = visitPropertyName(member.name);
            exitName();
            return { modifiers, referencedName, name, initializersName, descriptorName, thisArg };
        }

        // Member decorators require privileged access to private names. However, computed property
        // evaluation occurs interspersed with decorator evaluation. This means that if we encounter
        // a computed property name we must inline decorator evaluation.
        const memberDecorators = transformAllDecoratorsOfDeclaration(getAllDecoratorsOfClassElement(member, classInfo.class, /*useLegacyDecorators*/ false));
        const modifiers = visitNodes(member.modifiers, modifierVisitor, isModifier);

        if (memberDecorators) {
            const memberDecoratorsName = createHelperVariable(member, "decorators");
            const memberDecoratorsArray = factory.createArrayLiteralExpression(memberDecorators);
            const memberDecoratorsAssignment = factory.createAssignment(memberDecoratorsName, memberDecoratorsArray);
            const memberInfo: MemberInfo = { memberDecoratorsName };
            classInfo.memberInfos ??= new Map();
            classInfo.memberInfos.set(member, memberInfo);
            pendingExpressions ??= [];
            pendingExpressions.push(memberDecoratorsAssignment);

            // 5. Static non-field (method/getter/setter/auto-accessor) element decorators are applied
            // 6. Non-static non-field (method/getter/setter/auto-accessor) element decorators are applied
            // 7. Static field (excl. auto-accessor) element decorators are applied
            // 8. Non-static field (excl. auto-accessor) element decorators are applied
            const statements = isMethodOrAccessor(member) || isAutoAccessorPropertyDeclaration(member) ?
                isStatic(member) ?
                    classInfo.staticNonFieldDecorationStatements ??= [] :
                    classInfo.nonStaticNonFieldDecorationStatements ??= [] :
                isPropertyDeclaration(member) && !isAutoAccessorPropertyDeclaration(member) ?
                isStatic(member) ?
                    classInfo.staticFieldDecorationStatements ??= [] :
                    classInfo.nonStaticFieldDecorationStatements ??= [] :
                Debug.fail();

            const kind = isGetAccessorDeclaration(member) ? "getter" :
                isSetAccessorDeclaration(member) ? "setter" :
                isMethodDeclaration(member) ? "method" :
                isAutoAccessorPropertyDeclaration(member) ? "accessor" :
                isPropertyDeclaration(member) ? "field" :
                Debug.fail();

            let propertyName: ESDecorateName;
            if (isIdentifier(member.name) || isPrivateIdentifier(member.name)) {
                propertyName = { computed: false, name: member.name };
            }
            else if (isPropertyNameLiteral(member.name)) {
                propertyName = { computed: true, name: factory.createStringLiteralFromNode(member.name) };
            }
            else {
                const expression = member.name.expression;
                if (isPropertyNameLiteral(expression) && !isIdentifier(expression)) {
                    propertyName = { computed: true, name: factory.createStringLiteralFromNode(expression) };
                }
                else {
                    enterName();
                    ({ referencedName, name } = visitReferencedPropertyName(member.name));
                    propertyName = { computed: true, name: referencedName };
                    exitName();
                }
            }

            const context: ESDecorateClassElementContext = {
                kind,
                name: propertyName,
                static: isStatic(member),
                private: isPrivateIdentifier(member.name),
                access: {
                    // 15.7.3 CreateDecoratorAccessObject (kind, name)
                    // 2. If _kind_ is ~field~, ~method~, ~accessor~, or ~getter~, then ...
                    get: isPropertyDeclaration(member) || isGetAccessorDeclaration(member) || isMethodDeclaration(member),
                    // 3. If _kind_ is ~field~, ~accessor~, or ~setter~, then ...
                    set: isPropertyDeclaration(member) || isSetAccessorDeclaration(member),
                },
                metadata: classInfo.metadataReference,
            };

            if (isMethodOrAccessor(member)) {
                // produces (public elements):
                //  __esDecorate(this, null, _static_member_decorators, { kind: "method", name: "...", static: true, private: false, access: { ... } }, _staticExtraInitializers);
                //  __esDecorate(this, null, _member_decorators, { kind: "method", name: "...", static: false, private: false, access: { ... } }, _instanceExtraInitializers);
                //  __esDecorate(this, null, _static_member_decorators, { kind: "getter", name: "...", static: true, private: false, access: { ... } }, _staticExtraInitializers);
                //  __esDecorate(this, null, _member_decorators, { kind: "getter", name: "...", static: false, private: false, access: { ... } }, _instanceExtraInitializers);
                //  __esDecorate(this, null, _static_member_decorators, { kind: "setter", name: "...", static: true, private: false, access: { ... } }, _staticExtraInitializers);
                //  __esDecorate(this, null, _member_decorators, { kind: "setter", name: "...", static: false, private: false, access: { ... } }, _instanceExtraInitializers);

                // produces (private elements):
                //  __esDecorate(this, _static_member_descriptor = { value() { ... } }, _static_member_decorators, { kind: "method", name: "...", static: true, private: true, access: { ... } }, _staticExtraInitializers);
                //  __esDecorate(this, _member_descriptor = { value() { ... } }, _member_decorators, { kind: "method", name: "...", static: false, private: true, access: { ... } }, _instanceExtraInitializers);
                //  __esDecorate(this, _static_member_descriptor = { get() { ... } }, _static_member_decorators, { kind: "getter", name: "...", static: true, private: true, access: { ... } }, _staticExtraInitializers);
                //  __esDecorate(this, _member_descriptor = { get() { ... } }, _member_decorators, { kind: "getter", name: "...", static: false, private: true, access: { ... } }, _instanceExtraInitializers);
                //  __esDecorate(this, _static_member_descriptor = { set() { ... } }, _static_member_decorators, { kind: "setter", name: "...", static: true, private: true, access: { ... } }, _staticExtraInitializers);
                //  __esDecorate(this, _member_descriptor = { set() { ... } }, _member_decorators, { kind: "setter", name: "...", static: false, private: true, access: { ... } }, _instanceExtraInitializers);

                const methodExtraInitializersName = isStatic(member) ? classInfo.staticMethodExtraInitializersName : classInfo.instanceMethodExtraInitializersName;
                Debug.assertIsDefined(methodExtraInitializersName);

                let descriptor: Expression | undefined;
                if (isPrivateIdentifierClassElementDeclaration(member) && createDescriptor) {
                    descriptor = createDescriptor(member, visitNodes(modifiers, node => tryCast(node, isAsyncModifier), isModifier));
                    memberInfo.memberDescriptorName = descriptorName = createHelperVariable(member, "descriptor");
                    descriptor = factory.createAssignment(descriptorName, descriptor);
                }

                const esDecorateExpression = emitHelpers().createESDecorateHelper(factory.createThis(), descriptor ?? factory.createNull(), memberDecoratorsName, context, factory.createNull(), methodExtraInitializersName);
                const esDecorateStatement = factory.createExpressionStatement(esDecorateExpression);
                setSourceMapRange(esDecorateStatement, moveRangePastDecorators(member));
                statements.push(esDecorateStatement);
            }
            else if (isPropertyDeclaration(member)) {
                initializersName = memberInfo.memberInitializersName ??= createHelperVariable(member, "initializers");
                extraInitializersName = memberInfo.memberExtraInitializersName ??= createHelperVariable(member, "extraInitializers");

                if (isStatic(member)) {
                    thisArg = classInfo.classThis;
                }

                let descriptor: Expression | undefined;
                if (isPrivateIdentifierClassElementDeclaration(member) && hasAccessorModifier(member) && createDescriptor) {
                    descriptor = createDescriptor(member, /*modifiers*/ undefined);
                    memberInfo.memberDescriptorName = descriptorName = createHelperVariable(member, "descriptor");
                    descriptor = factory.createAssignment(descriptorName, descriptor);
                }

                // produces:
                //  _static_field_initializers = __esDecorate(null, null, _static_member_decorators, { kind: "field", name: "...", static: true, private: ..., access: { ... } }, _staticExtraInitializers);
                //  _field_initializers = __esDecorate(null, null, _member_decorators, { kind: "field", name: "...", static: false, private: ..., access: { ... } }, _instanceExtraInitializers);
                const esDecorateExpression = emitHelpers().createESDecorateHelper(
                    isAutoAccessorPropertyDeclaration(member) ?
                        factory.createThis() :
                        factory.createNull(),
                    descriptor ?? factory.createNull(),
                    memberDecoratorsName,
                    context,
                    initializersName,
                    extraInitializersName,
                );
                const esDecorateStatement = factory.createExpressionStatement(esDecorateExpression);
                setSourceMapRange(esDecorateStatement, moveRangePastDecorators(member));
                statements.push(esDecorateStatement);
            }
        }

        if (name === undefined) {
            enterName();
            name = visitPropertyName(member.name);
            exitName();
        }

        if (!some(modifiers) && (isMethodDeclaration(member) || isPropertyDeclaration(member))) {
            // Don't emit leading comments on the name for methods and properties without modifiers, otherwise we
            // will end up printing duplicate comments.
            setEmitFlags(name, EmitFlags.NoLeadingComments);
        }

        return { modifiers, referencedName, name, initializersName, extraInitializersName, descriptorName, thisArg };
    }

    function visitMethodDeclaration(node: MethodDeclaration) {
        enterClassElement(node);
        const { modifiers, name, descriptorName } = partialTransformClassElement(node, classInfo, createMethodDescriptorObject);
        if (descriptorName) {
            exitClassElement();
            return finishClassElement(createMethodDescriptorForwarder(modifiers, name, descriptorName), node);
        }
        else {
            const parameters = visitNodes(node.parameters, visitor, isParameter);
            const body = visitNode(node.body, visitor, isBlock);
            exitClassElement();
            return finishClassElement(factory.updateMethodDeclaration(node, modifiers, node.asteriskToken, name, /*questionToken*/ undefined, /*typeParameters*/ undefined, parameters, /*type*/ undefined, body), node);
        }
    }

    function visitGetAccessorDeclaration(node: GetAccessorDeclaration) {
        enterClassElement(node);
        const { modifiers, name, descriptorName } = partialTransformClassElement(node, classInfo, createGetAccessorDescriptorObject);
        if (descriptorName) {
            exitClassElement();
            return finishClassElement(createGetAccessorDescriptorForwarder(modifiers, name, descriptorName), node);
        }
        else {
            const parameters = visitNodes(node.parameters, visitor, isParameter);
            const body = visitNode(node.body, visitor, isBlock);
            exitClassElement();
            return finishClassElement(factory.updateGetAccessorDeclaration(node, modifiers, name, parameters, /*type*/ undefined, body), node);
        }
    }

    function visitSetAccessorDeclaration(node: SetAccessorDeclaration) {
        enterClassElement(node);
        const { modifiers, name, descriptorName } = partialTransformClassElement(node, classInfo, createSetAccessorDescriptorObject);
        if (descriptorName) {
            exitClassElement();
            return finishClassElement(createSetAccessorDescriptorForwarder(modifiers, name, descriptorName), node);
        }
        else {
            const parameters = visitNodes(node.parameters, visitor, isParameter);
            const body = visitNode(node.body, visitor, isBlock);
            exitClassElement();
            return finishClassElement(factory.updateSetAccessorDeclaration(node, modifiers, name, parameters, body), node);
        }
    }

    function visitClassStaticBlockDeclaration(node: ClassStaticBlockDeclaration): VisitResult<ClassStaticBlockDeclaration> {
        enterClassElement(node);

        let result: VisitResult<ClassStaticBlockDeclaration>;
        if (isClassNamedEvaluationHelperBlock(node)) {
            result = visitEachChild(node, visitor, context);
        }
        else if (isClassThisAssignmentBlock(node)) {
            const savedClassThis = classThis;
            classThis = undefined;
            result = visitEachChild(node, visitor, context);
            classThis = savedClassThis;
        }
        else {
            node = visitEachChild(node, visitor, context);
            result = node;
            if (classInfo) {
                classInfo.hasStaticInitializers = true;
                if (some(classInfo.pendingStaticInitializers)) {
                    // If we tried to inject the pending initializers into the current block, we might run into
                    // variable name collisions due to sharing this blocks scope. To avoid this, we inject a new
                    // static block that contains the pending initializers that precedes this block.
                    const statements: Statement[] = [];
                    for (const initializer of classInfo.pendingStaticInitializers) {
                        const initializerStatement = factory.createExpressionStatement(initializer);
                        setSourceMapRange(initializerStatement, getSourceMapRange(initializer));
                        statements.push(initializerStatement);
                    }
                    const body = factory.createBlock(statements, /*multiLine*/ true);
                    const staticBlock = factory.createClassStaticBlockDeclaration(body);
                    result = [staticBlock, result];
                    classInfo.pendingStaticInitializers = undefined;
                }
            }
        }

        exitClassElement();
        return result;
    }

    function visitPropertyDeclaration(node: PropertyDeclaration) {
        if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
            node = transformNamedEvaluation(context, node, canIgnoreEmptyStringLiteralInAssignedName(node.initializer));
        }

        enterClassElement(node);

        // TODO(rbuckton): We support decorating `declare x` fields with legacyDecorators, but we currently don't
        //                 support them with esDecorators. We need to consider whether we will support them in the
        //                 future, and how. For now, these should be elided by the `ts` transform.
        Debug.assert(!isAmbientPropertyDeclaration(node), "Not yet implemented.");

        // 10.2.1.3 RS: EvaluateBody
        //   Initializer : `=` AssignmentExpression
        //     ...
        //     3. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true*, then
        //        a. Let _value_ be ? NamedEvaluation of |Initializer| with argument _functionObject_.[[ClassFieldInitializerName]].
        //     ...

        const { modifiers, name, initializersName, extraInitializersName, descriptorName, thisArg } = partialTransformClassElement(node, classInfo, hasAccessorModifier(node) ? createAccessorPropertyDescriptorObject : undefined);

        startLexicalEnvironment();

        let initializer = visitNode(node.initializer, visitor, isExpression);
        if (initializersName) {
            initializer = emitHelpers().createRunInitializersHelper(
                thisArg ?? factory.createThis(),
                initializersName,
                initializer ?? factory.createVoidZero(),
            );
        }

        if (isStatic(node) && classInfo && initializer) {
            classInfo.hasStaticInitializers = true;
        }

        const declarations = endLexicalEnvironment();
        if (some(declarations)) {
            initializer = factory.createImmediatelyInvokedArrowFunction([
                ...declarations,
                factory.createReturnStatement(initializer),
            ]);
        }

        if (classInfo) {
            if (isStatic(node)) {
                initializer = injectPendingInitializers(classInfo, /*isStatic*/ true, initializer);
                if (extraInitializersName) {
                    classInfo.pendingStaticInitializers ??= [];
                    classInfo.pendingStaticInitializers.push(
                        emitHelpers().createRunInitializersHelper(
                            classInfo.classThis ?? factory.createThis(),
                            extraInitializersName,
                        ),
                    );
                }
            }
            else {
                initializer = injectPendingInitializers(classInfo, /*isStatic*/ false, initializer);
                if (extraInitializersName) {
                    classInfo.pendingInstanceInitializers ??= [];
                    classInfo.pendingInstanceInitializers.push(
                        emitHelpers().createRunInitializersHelper(
                            factory.createThis(),
                            extraInitializersName,
                        ),
                    );
                }
            }
        }

        exitClassElement();

        if (hasAccessorModifier(node) && descriptorName) {
            // given:
            //  accessor #x = 1;
            //
            // emits:
            //  static {
            //      _esDecorate(null, _private_x_descriptor = { get() { return this.#x_1; }, set(value) { this.#x_1 = value; } }, ...)
            //  }
            //  ...
            //  #x_1 = 1;
            //  get #x() { return _private_x_descriptor.get.call(this); }
            //  set #x(value) { _private_x_descriptor.set.call(this, value); }

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

            const modifiersWithoutAccessor = visitNodes(modifiers, node => node.kind !== SyntaxKind.AccessorKeyword ? node : undefined, isModifier);

            const backingField = createAccessorPropertyBackingField(factory, node, modifiersWithoutAccessor, initializer);
            setOriginalNode(backingField, node);
            setEmitFlags(backingField, EmitFlags.NoComments);
            setSourceMapRange(backingField, sourceMapRange);
            setSourceMapRange(backingField.name, node.name);

            const getter = createGetAccessorDescriptorForwarder(modifiersWithoutAccessor, getterName, descriptorName);
            setOriginalNode(getter, node);
            setCommentRange(getter, commentRange);
            setSourceMapRange(getter, sourceMapRange);

            const setter = createSetAccessorDescriptorForwarder(modifiersWithoutAccessor, setterName, descriptorName);
            setOriginalNode(setter, node);
            setEmitFlags(setter, EmitFlags.NoComments);
            setSourceMapRange(setter, sourceMapRange);

            return [backingField, getter, setter];
        }

        return finishClassElement(factory.updatePropertyDeclaration(node, modifiers, name, /*questionOrExclamationToken*/ undefined, /*type*/ undefined, initializer), node);
    }

    function visitThisExpression(node: ThisExpression) {
        return classThis ?? node;
    }

    function visitCallExpression(node: CallExpression) {
        if (isSuperProperty(node.expression) && classThis) {
            const expression = visitNode(node.expression, visitor, isExpression);
            const argumentsList = visitNodes(node.arguments, visitor, isExpression);
            const invocation = factory.createFunctionCallCall(expression, classThis, argumentsList);
            setOriginalNode(invocation, node);
            setTextRange(invocation, node);
            return invocation;
        }

        return visitEachChild(node, visitor, context);
    }

    function visitTaggedTemplateExpression(node: TaggedTemplateExpression) {
        if (isSuperProperty(node.tag) && classThis) {
            const tag = visitNode(node.tag, visitor, isExpression);
            const boundTag = factory.createFunctionBindCall(tag, classThis, []);
            setOriginalNode(boundTag, node);
            setTextRange(boundTag, node);
            const template = visitNode(node.template, visitor, isTemplateLiteral);
            return factory.updateTaggedTemplateExpression(node, boundTag, /*typeArguments*/ undefined, template);
        }

        return visitEachChild(node, visitor, context);
    }

    function visitPropertyAccessExpression(node: PropertyAccessExpression) {
        if (isSuperProperty(node) && isIdentifier(node.name) && classThis && classSuper) {
            const propertyName = factory.createStringLiteralFromNode(node.name);
            const superProperty = factory.createReflectGetCall(classSuper, propertyName, classThis);
            setOriginalNode(superProperty, node.expression);
            setTextRange(superProperty, node.expression);
            return superProperty;
        }

        return visitEachChild(node, visitor, context);
    }

    function visitElementAccessExpression(node: ElementAccessExpression) {
        if (isSuperProperty(node) && classThis && classSuper) {
            const propertyName = visitNode(node.argumentExpression, visitor, isExpression);
            const superProperty = factory.createReflectGetCall(classSuper, propertyName, classThis);
            setOriginalNode(superProperty, node.expression);
            setTextRange(superProperty, node.expression);
            return superProperty;
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
            node = transformNamedEvaluation(context, node, canIgnoreEmptyStringLiteralInAssignedName(node.initializer));
        }

        const updated = factory.updateParameterDeclaration(
            node,
            /*modifiers*/ undefined,
            node.dotDotDotToken,
            visitNode(node.name, visitor, isBindingName),
            /*questionToken*/ undefined,
            /*type*/ undefined,
            visitNode(node.initializer, visitor, isExpression),
        );

        if (updated !== node) {
            // While we emit the source map for the node after skipping decorators and modifiers,
            // we need to emit the comments for the original range.
            setCommentRange(updated, node);
            setTextRange(updated, moveRangePastModifiers(node));
            setSourceMapRange(updated, moveRangePastModifiers(node));
            setEmitFlags(updated.name, EmitFlags.NoTrailingSourceMap);
        }
        return updated;
    }

    function isAnonymousClassNeedingAssignedName(node: AnonymousFunctionDefinition) {
        return isClassExpression(node) && !node.name && isDecoratedClassLike(node);
    }

    function canIgnoreEmptyStringLiteralInAssignedName(node: WrappedExpression<AnonymousFunctionDefinition>) {
        // The IIFE produced for `(@dec class {})` will result in an assigned name of the form
        // `var class_1 = class { };`, and thus the empty string cannot be ignored. However, The IIFE
        // produced for `(class { @dec x; })` will not result in an assigned name since it
        // transforms to `return class { };`, and thus the empty string *can* be ignored.

        const innerExpression = skipOuterExpressions(node);
        return isClassExpression(innerExpression) && !innerExpression.name && !classOrConstructorParameterIsDecorated(/*useLegacyDecorators*/ false, innerExpression);
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
        return visitEachChild(node, discardedValueVisitor, context);
    }

    function visitBinaryExpression(node: BinaryExpression, discarded: boolean) {
        if (isDestructuringAssignment(node)) {
            const left = visitAssignmentPattern(node.left);
            const right = visitNode(node.right, visitor, isExpression);
            return factory.updateBinaryExpression(node, left, node.operatorToken, right);
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
                node = transformNamedEvaluation(context, node, canIgnoreEmptyStringLiteralInAssignedName(node.right));
                return visitEachChild(node, visitor, context);
            }

            if (isSuperProperty(node.left) && classThis && classSuper) {
                let setterName = isElementAccessExpression(node.left) ? visitNode(node.left.argumentExpression, visitor, isExpression) :
                    isIdentifier(node.left.name) ? factory.createStringLiteralFromNode(node.left.name) :
                    undefined;
                if (setterName) {
                    // super.x = ...
                    // super.x += ...
                    // super[x] = ...
                    // super[x] += ...
                    let expression = visitNode(node.right, visitor, isExpression);
                    if (isCompoundAssignment(node.operatorToken.kind)) {
                        let getterName = setterName;
                        if (!isSimpleInlineableExpression(setterName)) {
                            getterName = factory.createTempVariable(hoistVariableDeclaration);
                            setterName = factory.createAssignment(getterName, setterName);
                        }

                        const superPropertyGet = factory.createReflectGetCall(
                            classSuper,
                            getterName,
                            classThis,
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
                        classSuper,
                        setterName,
                        expression,
                        classThis,
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

        if (node.operatorToken.kind === SyntaxKind.CommaToken) {
            const left = visitNode(node.left, discardedValueVisitor, isExpression);
            const right = visitNode(node.right, discarded ? discardedValueVisitor : visitor, isExpression);
            return factory.updateBinaryExpression(node, left, node.operatorToken, right);
        }

        return visitEachChild(node, visitor, context);
    }

    function visitPreOrPostfixUnaryExpression(node: PrefixUnaryExpression | PostfixUnaryExpression, discarded: boolean) {
        if (
            node.operator === SyntaxKind.PlusPlusToken ||
            node.operator === SyntaxKind.MinusMinusToken
        ) {
            const operand = skipParentheses(node.operand);
            if (isSuperProperty(operand) && classThis && classSuper) {
                let setterName = isElementAccessExpression(operand) ? visitNode(operand.argumentExpression, visitor, isExpression) :
                    isIdentifier(operand.name) ? factory.createStringLiteralFromNode(operand.name) :
                    undefined;
                if (setterName) {
                    let getterName = setterName;
                    if (!isSimpleInlineableExpression(setterName)) {
                        getterName = factory.createTempVariable(hoistVariableDeclaration);
                        setterName = factory.createAssignment(getterName, setterName);
                    }

                    let expression: Expression = factory.createReflectGetCall(classSuper, getterName, classThis);
                    setOriginalNode(expression, node);
                    setTextRange(expression, node);

                    // If the result of this expression is discarded (i.e., it's in a position where the result
                    // will be otherwise unused, such as in an expression statement or the left side of a comma), we
                    // don't need to create an extra temp variable to hold the result:
                    //
                    //  source (discarded):
                    //    super.x++;
                    //  generated:
                    //    _a = Reflect.get(_super, "x"), _a++, Reflect.set(_super, "x", _a);
                    //
                    // Above, the temp variable `_a` is used to perform the correct coercion (i.e., number or
                    // bigint). Since the result of the postfix unary is discarded, we don't need to capture the
                    // result of the expression.
                    //
                    //  source (not discarded):
                    //    y = super.x++;
                    //  generated:
                    //    y = (_a = Reflect.get(_super, "x"), _b = _a++, Reflect.set(_super, "x", _a), _b);
                    //
                    // When the result isn't discarded, we introduce a new temp variable (`_b`) to capture the
                    // result of the operation so that we can provide it to `y` when the assignment is complete.

                    const temp = discarded ? undefined : factory.createTempVariable(hoistVariableDeclaration);
                    expression = expandPreOrPostfixIncrementOrDecrementExpression(factory, node, expression, hoistVariableDeclaration, temp);
                    expression = factory.createReflectSetCall(classSuper, setterName, expression, classThis);
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

        return visitEachChild(node, visitor, context);
    }

    function visitCommaListExpression(node: CommaListExpression, discarded: boolean) {
        const elements = discarded ?
            visitCommaListElements(node.elements, discardedValueVisitor) :
            visitCommaListElements(node.elements, visitor, discardedValueVisitor);
        return factory.updateCommaListExpression(node, elements);
    }

    function visitReferencedPropertyName(node: PropertyName) {
        if (isPropertyNameLiteral(node) || isPrivateIdentifier(node)) {
            const referencedName = factory.createStringLiteralFromNode(node);
            const name = visitNode(node, visitor, isPropertyName);
            return { referencedName, name };
        }

        if (isPropertyNameLiteral(node.expression) && !isIdentifier(node.expression)) {
            const referencedName = factory.createStringLiteralFromNode(node.expression);
            const name = visitNode(node, visitor, isPropertyName);
            return { referencedName, name };
        }

        const referencedName = factory.getGeneratedNameForNode(node);
        hoistVariableDeclaration(referencedName);

        const key = emitHelpers().createPropKeyHelper(visitNode(node.expression, visitor, isExpression));
        const assignment = factory.createAssignment(referencedName, key);
        const name = factory.updateComputedPropertyName(node, injectPendingExpressions(assignment));
        return { referencedName, name };
    }

    function visitPropertyName(node: PropertyName) {
        if (isComputedPropertyName(node)) {
            return visitComputedPropertyName(node);
        }
        return visitNode(node, visitor, isPropertyName);
    }

    function visitComputedPropertyName(node: ComputedPropertyName) {
        let expression = visitNode(node.expression, visitor, isExpression);
        if (!isSimpleInlineableExpression(expression)) {
            expression = injectPendingExpressions(expression);
        }
        return factory.updateComputedPropertyName(node, expression);
    }

    function visitPropertyAssignment(node: PropertyAssignment) {
        // 13.2.5.5 RS: PropertyDefinitionEvaluation
        //   PropertyAssignment : PropertyName `:` AssignmentExpression
        //     ...
        //     5. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true* and _isProtoSetter_ is *false*, then
        //        a. Let _popValue_ be ? NamedEvaluation of |AssignmentExpression| with argument _propKey_.
        //     ...

        if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
            node = transformNamedEvaluation(context, node, canIgnoreEmptyStringLiteralInAssignedName(node.initializer));
        }

        return visitEachChild(node, visitor, context);
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
            node = transformNamedEvaluation(context, node, canIgnoreEmptyStringLiteralInAssignedName(node.initializer));
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
            node = transformNamedEvaluation(context, node, canIgnoreEmptyStringLiteralInAssignedName(node.initializer));
        }

        return visitEachChild(node, visitor, context);
    }

    function visitDestructuringAssignmentTarget(node: LeftHandSideExpression): Expression {
        if (isObjectLiteralExpression(node) || isArrayLiteralExpression(node)) {
            return visitAssignmentPattern(node);
        }

        if (isSuperProperty(node) && classThis && classSuper) {
            const propertyName = isElementAccessExpression(node) ? visitNode(node.argumentExpression, visitor, isExpression) :
                isIdentifier(node.name) ? factory.createStringLiteralFromNode(node.name) :
                undefined;
            if (propertyName) {
                const paramName = factory.createTempVariable(/*recordTempVariable*/ undefined);
                const expression = factory.createAssignmentTargetWrapper(
                    paramName,
                    factory.createReflectSetCall(
                        classSuper,
                        propertyName,
                        paramName,
                        classThis,
                    ),
                );
                setOriginalNode(expression, node);
                setTextRange(expression, node);
                return expression;
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

        if (isAssignmentExpression(node, /*excludeCompoundAssignment*/ true)) {
            if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
                node = transformNamedEvaluation(context, node, canIgnoreEmptyStringLiteralInAssignedName(node.right));
            }

            const assignmentTarget = visitDestructuringAssignmentTarget(node.left);
            const initializer = visitNode(node.right, visitor, isExpression);
            return factory.updateBinaryExpression(node, assignmentTarget, node.operatorToken, initializer) as ArrayAssignmentElement;
        }
        else {
            return visitDestructuringAssignmentTarget(node) as ArrayAssignmentElement;
        }
    }

    function visitAssignmentRestElement(node: SpreadElement) {
        if (isLeftHandSideExpression(node.expression)) {
            const expression = visitDestructuringAssignmentTarget(node.expression);
            return factory.updateSpreadElement(node, expression);
        }

        return visitEachChild(node, visitor, context);
    }

    function visitArrayAssignmentElement(node: Expression): Expression {
        Debug.assertNode(node, isArrayBindingOrAssignmentElement);
        if (isSpreadElement(node)) return visitAssignmentRestElement(node);
        if (!isOmittedExpression(node)) return visitAssignmentElement(node);
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
            node = transformNamedEvaluation(context, node, canIgnoreEmptyStringLiteralInAssignedName(node.objectAssignmentInitializer));
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
            const elements = visitNodes(node.elements, visitArrayAssignmentElement, isExpression);
            return factory.updateArrayLiteralExpression(node, elements);
        }
        else {
            const properties = visitNodes(node.properties, visitObjectAssignmentElement, isObjectLiteralElementLike);
            return factory.updateObjectLiteralExpression(node, properties);
        }
    }

    function visitExportAssignment(node: ExportAssignment) {
        // 16.2.3.7 RS: Evaluation
        //   ExportDeclaration : `export` `default` AssignmentExpression `;`
        //     1. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true*, then
        //        a. Let _value_ be ? NamedEvaluation of |AssignmentExpression| with argument `"default"`.
        //     ...

        if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
            node = transformNamedEvaluation(context, node, canIgnoreEmptyStringLiteralInAssignedName(node.expression));
        }

        return visitEachChild(node, visitor, context);
    }

    function visitParenthesizedExpression(node: ParenthesizedExpression, discarded: boolean) {
        // 8.4.5 RS: NamedEvaluation
        //   ParenthesizedExpression : `(` Expression `)`
        //     ...
        //     2. Return ? NamedEvaluation of |Expression| with argument _name_.

        const visitorFunc: Visitor<Node, Node> = discarded ? discardedValueVisitor : visitor;
        const expression = visitNode(node.expression, visitorFunc, isExpression);
        return factory.updateParenthesizedExpression(node, expression);
    }

    function visitPartiallyEmittedExpression(node: PartiallyEmittedExpression, discarded: boolean) {
        // Emulates 8.4.5 RS: NamedEvaluation

        const visitorFunc: Visitor<Node, Node> = discarded ? discardedValueVisitor : visitor;
        const expression = visitNode(node.expression, visitorFunc, isExpression);
        return factory.updatePartiallyEmittedExpression(node, expression);
    }

    function injectPendingExpressionsCommon(pendingExpressions: Expression[] | undefined, expression: Expression | undefined) {
        if (some(pendingExpressions)) {
            if (expression) {
                if (isParenthesizedExpression(expression)) {
                    pendingExpressions.push(expression.expression);
                    expression = factory.updateParenthesizedExpression(expression, factory.inlineExpressions(pendingExpressions));
                }
                else {
                    pendingExpressions.push(expression);
                    expression = factory.inlineExpressions(pendingExpressions);
                }
            }
            else {
                expression = factory.inlineExpressions(pendingExpressions);
            }
        }
        return expression;
    }

    function injectPendingExpressions(expression: Expression) {
        const result = injectPendingExpressionsCommon(pendingExpressions, expression);
        Debug.assertIsDefined(result);
        if (result !== expression) {
            pendingExpressions = undefined;
        }
        return result;
    }

    function injectPendingInitializers(classInfo: ClassInfo, isStatic: boolean, expression: Expression | undefined) {
        const result = injectPendingExpressionsCommon(isStatic ? classInfo.pendingStaticInitializers : classInfo.pendingInstanceInitializers, expression);
        if (result !== expression) {
            if (isStatic) {
                classInfo.pendingStaticInitializers = undefined;
            }
            else {
                classInfo.pendingInstanceInitializers = undefined;
            }
        }
        return result;
    }

    /**
     * Transforms all of the decorators for a declaration into an array of expressions.
     *
     * @param allDecorators An object containing all of the decorators for the declaration.
     */
    function transformAllDecoratorsOfDeclaration(allDecorators: AllDecorators | undefined) {
        if (!allDecorators) {
            return undefined;
        }

        const decoratorExpressions: Expression[] = [];
        addRange(decoratorExpressions, map(allDecorators.decorators, transformDecorator));
        return decoratorExpressions;
    }

    /**
     * Transforms a decorator into an expression.
     *
     * @param decorator The decorator node.
     */
    function transformDecorator(decorator: Decorator) {
        const expression = visitNode(decorator.expression, visitor, isExpression);
        setEmitFlags(expression, EmitFlags.NoComments);

        // preserve the 'this' binding for an access expression
        const innerExpression = skipOuterExpressions(expression);
        if (isAccessExpression(innerExpression)) {
            const { target, thisArg } = factory.createCallBinding(expression, hoistVariableDeclaration, languageVersion, /*cacheIdentifiers*/ true);
            return factory.restoreOuterExpressions(expression, factory.createFunctionBindCall(target, thisArg, []));
        }
        return expression;
    }

    /**
     * Creates a `value`, `get`, or `set` method for a pseudo-{@link PropertyDescriptor} object created for a private element.
     */
    function createDescriptorMethod(original: Node, name: PrivateIdentifier, modifiers: ModifiersArray | undefined, asteriskToken: AsteriskToken | undefined, kind: "value" | "get" | "set", parameters: readonly ParameterDeclaration[], body: Block | undefined) {
        const func = factory.createFunctionExpression(
            modifiers,
            asteriskToken,
            /*name*/ undefined,
            /*typeParameters*/ undefined,
            parameters,
            /*type*/ undefined,
            body ?? factory.createBlock([]),
        );
        setOriginalNode(func, original);
        setSourceMapRange(func, moveRangePastDecorators(original));
        setEmitFlags(func, EmitFlags.NoComments);

        const prefix = kind === "get" || kind === "set" ? kind : undefined;
        const functionName = factory.createStringLiteralFromNode(name, /*isSingleQuote*/ undefined);
        const namedFunction = emitHelpers().createSetFunctionNameHelper(func, functionName, prefix);
        const method = factory.createPropertyAssignment(factory.createIdentifier(kind), namedFunction);
        setOriginalNode(method, original);
        setSourceMapRange(method, moveRangePastDecorators(original));
        setEmitFlags(method, EmitFlags.NoComments);
        return method;
    }

    /**
     * Creates a pseudo-{@link PropertyDescriptor} object used when decorating a private {@link MethodDeclaration}.
     */
    function createMethodDescriptorObject(node: PrivateIdentifierMethodDeclaration, modifiers: ModifiersArray | undefined) {
        return factory.createObjectLiteralExpression([
            createDescriptorMethod(
                node,
                node.name,
                modifiers,
                node.asteriskToken,
                "value",
                visitNodes(node.parameters, visitor, isParameter),
                visitNode(node.body, visitor, isBlock),
            ),
        ]);
    }

    /**
     * Creates a pseudo-{@link PropertyDescriptor} object used when decorating a private {@link GetAccessorDeclaration}.
     */
    function createGetAccessorDescriptorObject(node: PrivateIdentifierGetAccessorDeclaration, modifiers: ModifiersArray | undefined) {
        return factory.createObjectLiteralExpression([
            createDescriptorMethod(
                node,
                node.name,
                modifiers,
                /*asteriskToken*/ undefined,
                "get",
                [],
                visitNode(node.body, visitor, isBlock),
            ),
        ]);
    }

    /**
     * Creates a pseudo-{@link PropertyDescriptor} object used when decorating a private {@link SetAccessorDeclaration}.
     */
    function createSetAccessorDescriptorObject(node: PrivateIdentifierSetAccessorDeclaration, modifiers: ModifiersArray | undefined) {
        return factory.createObjectLiteralExpression([
            createDescriptorMethod(
                node,
                node.name,
                modifiers,
                /*asteriskToken*/ undefined,
                "set",
                visitNodes(node.parameters, visitor, isParameter),
                visitNode(node.body, visitor, isBlock),
            ),
        ]);
    }

    /**
     * Creates a pseudo-{@link PropertyDescriptor} object used when decorating an `accessor` {@link PropertyDeclaration} with a private name.
     */
    function createAccessorPropertyDescriptorObject(node: PrivateIdentifierPropertyDeclaration, modifiers: ModifiersArray | undefined) {
        //  {
        //      get() { return this.${privateName}; },
        //      set(value) { this.${privateName} = value; },
        //  }

        return factory.createObjectLiteralExpression([
            createDescriptorMethod(
                node,
                node.name,
                modifiers,
                /*asteriskToken*/ undefined,
                "get",
                [],
                factory.createBlock([
                    factory.createReturnStatement(
                        factory.createPropertyAccessExpression(
                            factory.createThis(),
                            factory.getGeneratedPrivateNameForNode(node.name),
                        ),
                    ),
                ]),
            ),
            createDescriptorMethod(
                node,
                node.name,
                modifiers,
                /*asteriskToken*/ undefined,
                "set",
                [factory.createParameterDeclaration(
                    /*modifiers*/ undefined,
                    /*dotDotDotToken*/ undefined,
                    "value",
                )],
                factory.createBlock([
                    factory.createExpressionStatement(
                        factory.createAssignment(
                            factory.createPropertyAccessExpression(
                                factory.createThis(),
                                factory.getGeneratedPrivateNameForNode(node.name),
                            ),
                            factory.createIdentifier("value"),
                        ),
                    ),
                ]),
            ),
        ]);
    }

    /**
     * Creates a {@link MethodDeclaration} that forwards its invocation to a {@link PropertyDescriptor} object.
     * @param modifiers The modifiers for the resulting declaration.
     * @param name The name for the resulting declaration.
     * @param descriptorName The name of the descriptor variable.
     */
    function createMethodDescriptorForwarder(modifiers: ModifiersArray | undefined, name: PropertyName, descriptorName: Identifier) {
        // strip off all but the `static` modifier
        modifiers = visitNodes(modifiers, node => isStaticModifier(node) ? node : undefined, isModifier);
        return factory.createGetAccessorDeclaration(
            modifiers,
            name,
            [],
            /*type*/ undefined,
            factory.createBlock([
                factory.createReturnStatement(
                    factory.createPropertyAccessExpression(
                        descriptorName,
                        factory.createIdentifier("value"),
                    ),
                ),
            ]),
        );
    }

    /**
     * Creates a {@link GetAccessorDeclaration} that forwards its invocation to a {@link PropertyDescriptor} object.
     * @param modifiers The modifiers for the resulting declaration.
     * @param name The name for the resulting declaration.
     * @param descriptorName The name of the descriptor variable.
     */
    function createGetAccessorDescriptorForwarder(modifiers: ModifiersArray | undefined, name: PropertyName, descriptorName: Identifier) {
        // strip off all but the `static` modifier
        modifiers = visitNodes(modifiers, node => isStaticModifier(node) ? node : undefined, isModifier);
        return factory.createGetAccessorDeclaration(
            modifiers,
            name,
            [],
            /*type*/ undefined,
            factory.createBlock([
                factory.createReturnStatement(
                    factory.createFunctionCallCall(
                        factory.createPropertyAccessExpression(
                            descriptorName,
                            factory.createIdentifier("get"),
                        ),
                        factory.createThis(),
                        [],
                    ),
                ),
            ]),
        );
    }

    /**
     * Creates a {@link SetAccessorDeclaration} that forwards its invocation to a {@link PropertyDescriptor} object.
     * @param modifiers The modifiers for the resulting declaration.
     * @param name The name for the resulting declaration.
     * @param descriptorName The name of the descriptor variable.
     */
    function createSetAccessorDescriptorForwarder(modifiers: ModifiersArray | undefined, name: PropertyName, descriptorName: Identifier) {
        // strip off all but the `static` modifier
        modifiers = visitNodes(modifiers, node => isStaticModifier(node) ? node : undefined, isModifier);
        return factory.createSetAccessorDeclaration(
            modifiers,
            name,
            [factory.createParameterDeclaration(
                /*modifiers*/ undefined,
                /*dotDotDotToken*/ undefined,
                "value",
            )],
            factory.createBlock([
                factory.createReturnStatement(
                    factory.createFunctionCallCall(
                        factory.createPropertyAccessExpression(
                            descriptorName,
                            factory.createIdentifier("set"),
                        ),
                        factory.createThis(),
                        [factory.createIdentifier("value")],
                    ),
                ),
            ]),
        );
    }
    function createMetadata(name: Identifier, classSuper: Identifier | undefined) {
        const varDecl = factory.createVariableDeclaration(
            name,
            /*exclamationToken*/ undefined,
            /*type*/ undefined,
            factory.createConditionalExpression(
                factory.createLogicalAnd(
                    factory.createTypeCheck(factory.createIdentifier("Symbol"), "function"),
                    factory.createPropertyAccessExpression(factory.createIdentifier("Symbol"), "metadata"),
                ),
                factory.createToken(SyntaxKind.QuestionToken),
                factory.createCallExpression(
                    factory.createPropertyAccessExpression(factory.createIdentifier("Object"), "create"),
                    /*typeArguments*/ undefined,
                    [classSuper ? createSymbolMetadataReference(classSuper) : factory.createNull()],
                ),
                factory.createToken(SyntaxKind.ColonToken),
                factory.createVoidZero(),
            ),
        );
        return factory.createVariableStatement(/*modifiers*/ undefined, factory.createVariableDeclarationList([varDecl], NodeFlags.Const));
    }

    function createSymbolMetadata(target: Identifier | ThisExpression, value: Identifier) {
        const defineProperty = factory.createObjectDefinePropertyCall(
            target,
            factory.createPropertyAccessExpression(factory.createIdentifier("Symbol"), "metadata"),
            factory.createPropertyDescriptor({ configurable: true, writable: true, enumerable: true, value }, /*singleLine*/ true),
        );
        return setEmitFlags(
            factory.createIfStatement(value, factory.createExpressionStatement(defineProperty)),
            EmitFlags.SingleLine,
        );
    }

    function createSymbolMetadataReference(classSuper: Identifier) {
        return factory.createBinaryExpression(
            factory.createElementAccessExpression(
                classSuper,
                factory.createPropertyAccessExpression(factory.createIdentifier("Symbol"), "metadata"),
            ),
            SyntaxKind.QuestionQuestionToken,
            factory.createNull(),
        );
    }
}
