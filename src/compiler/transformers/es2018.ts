import {
    __String,
    AccessorDeclaration,
    addEmitFlags,
    addEmitHelper,
    addEmitHelpers,
    addRange,
    advancedAsyncSuperHelper,
    append,
    ArrowFunction,
    asyncSuperHelper,
    AwaitExpression,
    BinaryExpression,
    Bundle,
    CallExpression,
    CatchClause,
    chainBundle,
    CommaListExpression,
    concatenate,
    ConciseBody,
    ConstructorDeclaration,
    containsObjectRestOrSpread,
    createForOfBindingStatement,
    createSuperAccessVariableStatement,
    Debug,
    ElementAccessExpression,
    EmitFlags,
    EmitHint,
    Expression,
    ExpressionStatement,
    flattenDestructuringAssignment,
    flattenDestructuringBinding,
    FlattenLevel,
    ForInitializer,
    ForOfStatement,
    ForStatement,
    FunctionBody,
    FunctionDeclaration,
    FunctionExpression,
    FunctionFlags,
    FunctionLikeDeclaration,
    GeneratedIdentifierFlags,
    GetAccessorDeclaration,
    getEmitScriptTarget,
    getFunctionFlags,
    getNodeId,
    hasSyntacticModifier,
    Identifier,
    insertStatementsAfterStandardPrologue,
    isAssignmentPattern,
    isBindingPattern,
    isBlock,
    isConciseBody,
    isDestructuringAssignment,
    isEffectiveStrictModeSourceFile,
    isExpression,
    isForInitializer,
    isIdentifier,
    isModifier,
    isModifierLike,
    isObjectLiteralElementLike,
    isParameter,
    isPropertyAccessExpression,
    isPropertyName,
    isQuestionToken,
    isSimpleParameterList,
    isStatement,
    isSuperProperty,
    isVariableDeclarationList,
    LabeledStatement,
    LeftHandSideExpression,
    MethodDeclaration,
    ModifierFlags,
    Node,
    NodeCheckFlags,
    NodeFlags,
    ObjectLiteralElementLike,
    ObjectLiteralExpression,
    ParameterDeclaration,
    ParenthesizedExpression,
    ProcessLevel,
    processTaggedTemplateExpression,
    PropertyAccessExpression,
    ReturnStatement,
    ScriptTarget,
    SetAccessorDeclaration,
    setEmitFlags,
    setOriginalNode,
    setSourceMapRange,
    setTextRange,
    SignatureDeclaration,
    skipParentheses,
    some,
    SourceFile,
    startOnNewLine,
    Statement,
    SyntaxKind,
    TaggedTemplateExpression,
    TextRange,
    TransformationContext,
    TransformFlags,
    unwrapInnermostStatementOfLabel,
    VariableDeclaration,
    VariableStatement,
    visitEachChild,
    visitIterationBody,
    visitNode,
    visitNodes,
    visitParameterList,
    VisitResult,
    VoidExpression,
    YieldExpression,
} from "../_namespaces/ts.js";

const enum ESNextSubstitutionFlags {
    None = 0,
    /** Enables substitutions for async methods with `super` calls. */
    AsyncMethodsWithSuper = 1 << 0,
}

// Facts we track as we traverse the tree
const enum HierarchyFacts {
    None = 0,

    //
    // Ancestor facts
    //

    HasLexicalThis = 1 << 0,
    IterationContainer = 1 << 1,
    // NOTE: do not add more ancestor flags without also updating AncestorFactsMask below.

    //
    // Ancestor masks
    //

    AncestorFactsMask = (IterationContainer << 1) - 1,

    SourceFileIncludes = HasLexicalThis,
    SourceFileExcludes = IterationContainer,
    StrictModeSourceFileIncludes = None,

    ClassOrFunctionIncludes = HasLexicalThis,
    ClassOrFunctionExcludes = IterationContainer,

    ArrowFunctionIncludes = None,
    ArrowFunctionExcludes = ClassOrFunctionExcludes,

    IterationStatementIncludes = IterationContainer,
    IterationStatementExcludes = None,
}

/** @internal */
export function transformES2018(context: TransformationContext): (x: SourceFile | Bundle) => SourceFile | Bundle {
    const {
        factory,
        getEmitHelperFactory: emitHelpers,
        resumeLexicalEnvironment,
        endLexicalEnvironment,
        hoistVariableDeclaration,
    } = context;

    const resolver = context.getEmitResolver();
    const compilerOptions = context.getCompilerOptions();
    const languageVersion = getEmitScriptTarget(compilerOptions);

    const previousOnEmitNode = context.onEmitNode;
    context.onEmitNode = onEmitNode;

    const previousOnSubstituteNode = context.onSubstituteNode;
    context.onSubstituteNode = onSubstituteNode;

    let exportedVariableStatement = false;
    let enabledSubstitutions = ESNextSubstitutionFlags.None;
    let enclosingFunctionFlags: FunctionFlags;
    let parametersWithPrecedingObjectRestOrSpread: Set<ParameterDeclaration> | undefined;
    let enclosingSuperContainerFlags: NodeCheckFlags = 0;
    let hierarchyFacts: HierarchyFacts = 0;

    let currentSourceFile: SourceFile;
    let taggedTemplateStringDeclarations: VariableDeclaration[];

    /** Keeps track of property names accessed on super (`super.x`) within async functions. */
    let capturedSuperProperties: Set<__String>;
    /** Whether the async function contains an element access on super (`super[x]`). */
    let hasSuperElementAccess: boolean;
    /** A set of node IDs for generated super accessors. */
    const substitutedSuperAccessors: boolean[] = [];

    return chainBundle(context, transformSourceFile);

    function affectsSubtree(excludeFacts: HierarchyFacts, includeFacts: HierarchyFacts) {
        return hierarchyFacts !== (hierarchyFacts & ~excludeFacts | includeFacts);
    }

    /**
     * Sets the `HierarchyFacts` for this node prior to visiting this node's subtree, returning the facts set prior to modification.
     * @param excludeFacts The existing `HierarchyFacts` to reset before visiting the subtree.
     * @param includeFacts The new `HierarchyFacts` to set before visiting the subtree.
     */
    function enterSubtree(excludeFacts: HierarchyFacts, includeFacts: HierarchyFacts) {
        const ancestorFacts = hierarchyFacts;
        hierarchyFacts = (hierarchyFacts & ~excludeFacts | includeFacts) & HierarchyFacts.AncestorFactsMask;
        return ancestorFacts;
    }

    /**
     * Restores the `HierarchyFacts` for this node's ancestor after visiting this node's
     * subtree.
     * @param ancestorFacts The `HierarchyFacts` of the ancestor to restore after visiting the subtree.
     */
    function exitSubtree(ancestorFacts: HierarchyFacts) {
        hierarchyFacts = ancestorFacts;
    }

    function recordTaggedTemplateString(temp: Identifier) {
        taggedTemplateStringDeclarations = append(
            taggedTemplateStringDeclarations,
            factory.createVariableDeclaration(temp),
        );
    }

    function transformSourceFile(node: SourceFile) {
        if (node.isDeclarationFile) {
            return node;
        }

        currentSourceFile = node;
        const visited = visitSourceFile(node);
        addEmitHelpers(visited, context.readEmitHelpers());

        currentSourceFile = undefined!;
        taggedTemplateStringDeclarations = undefined!;
        return visited;
    }

    function visitor(node: Node): VisitResult<Node> {
        return visitorWorker(node, /*expressionResultIsUnused*/ false);
    }

    function visitorWithUnusedExpressionResult(node: Node): VisitResult<Node> {
        return visitorWorker(node, /*expressionResultIsUnused*/ true);
    }

    function visitorNoAsyncModifier(node: Node): VisitResult<Node | undefined> {
        if (node.kind === SyntaxKind.AsyncKeyword) {
            return undefined;
        }
        return node;
    }

    function doWithHierarchyFacts<T, U>(cb: (value: T) => U, value: T, excludeFacts: HierarchyFacts, includeFacts: HierarchyFacts) {
        if (affectsSubtree(excludeFacts, includeFacts)) {
            const ancestorFacts = enterSubtree(excludeFacts, includeFacts);
            const result = cb(value);
            exitSubtree(ancestorFacts);
            return result;
        }
        return cb(value);
    }

    function visitDefault(node: Node): VisitResult<Node> {
        return visitEachChild(node, visitor, context);
    }

    /**
     * @param expressionResultIsUnused Indicates the result of an expression is unused by the parent node (i.e., the left side of a comma or the
     * expression of an `ExpressionStatement`).
     */
    function visitorWorker(node: Node, expressionResultIsUnused: boolean): VisitResult<Node> {
        if ((node.transformFlags & TransformFlags.ContainsES2018) === 0) {
            return node;
        }
        switch (node.kind) {
            case SyntaxKind.AwaitExpression:
                return visitAwaitExpression(node as AwaitExpression);
            case SyntaxKind.YieldExpression:
                return visitYieldExpression(node as YieldExpression);
            case SyntaxKind.ReturnStatement:
                return visitReturnStatement(node as ReturnStatement);
            case SyntaxKind.LabeledStatement:
                return visitLabeledStatement(node as LabeledStatement);
            case SyntaxKind.ObjectLiteralExpression:
                return visitObjectLiteralExpression(node as ObjectLiteralExpression);
            case SyntaxKind.BinaryExpression:
                return visitBinaryExpression(node as BinaryExpression, expressionResultIsUnused);
            case SyntaxKind.CommaListExpression:
                return visitCommaListExpression(node as CommaListExpression, expressionResultIsUnused);
            case SyntaxKind.CatchClause:
                return visitCatchClause(node as CatchClause);
            case SyntaxKind.VariableStatement:
                return visitVariableStatement(node as VariableStatement);
            case SyntaxKind.VariableDeclaration:
                return visitVariableDeclaration(node as VariableDeclaration);
            case SyntaxKind.DoStatement:
            case SyntaxKind.WhileStatement:
            case SyntaxKind.ForInStatement:
                return doWithHierarchyFacts(
                    visitDefault,
                    node,
                    HierarchyFacts.IterationStatementExcludes,
                    HierarchyFacts.IterationStatementIncludes,
                );
            case SyntaxKind.ForOfStatement:
                return visitForOfStatement(node as ForOfStatement, /*outermostLabeledStatement*/ undefined);
            case SyntaxKind.ForStatement:
                return doWithHierarchyFacts(
                    visitForStatement,
                    node as ForStatement,
                    HierarchyFacts.IterationStatementExcludes,
                    HierarchyFacts.IterationStatementIncludes,
                );
            case SyntaxKind.VoidExpression:
                return visitVoidExpression(node as VoidExpression);
            case SyntaxKind.Constructor:
                return doWithHierarchyFacts(
                    visitConstructorDeclaration,
                    node as ConstructorDeclaration,
                    HierarchyFacts.ClassOrFunctionExcludes,
                    HierarchyFacts.ClassOrFunctionIncludes,
                );
            case SyntaxKind.MethodDeclaration:
                return doWithHierarchyFacts(
                    visitMethodDeclaration,
                    node as MethodDeclaration,
                    HierarchyFacts.ClassOrFunctionExcludes,
                    HierarchyFacts.ClassOrFunctionIncludes,
                );
            case SyntaxKind.GetAccessor:
                return doWithHierarchyFacts(
                    visitGetAccessorDeclaration,
                    node as GetAccessorDeclaration,
                    HierarchyFacts.ClassOrFunctionExcludes,
                    HierarchyFacts.ClassOrFunctionIncludes,
                );
            case SyntaxKind.SetAccessor:
                return doWithHierarchyFacts(
                    visitSetAccessorDeclaration,
                    node as SetAccessorDeclaration,
                    HierarchyFacts.ClassOrFunctionExcludes,
                    HierarchyFacts.ClassOrFunctionIncludes,
                );
            case SyntaxKind.FunctionDeclaration:
                return doWithHierarchyFacts(
                    visitFunctionDeclaration,
                    node as FunctionDeclaration,
                    HierarchyFacts.ClassOrFunctionExcludes,
                    HierarchyFacts.ClassOrFunctionIncludes,
                );
            case SyntaxKind.FunctionExpression:
                return doWithHierarchyFacts(
                    visitFunctionExpression,
                    node as FunctionExpression,
                    HierarchyFacts.ClassOrFunctionExcludes,
                    HierarchyFacts.ClassOrFunctionIncludes,
                );
            case SyntaxKind.ArrowFunction:
                return doWithHierarchyFacts(
                    visitArrowFunction,
                    node as ArrowFunction,
                    HierarchyFacts.ArrowFunctionExcludes,
                    HierarchyFacts.ArrowFunctionIncludes,
                );
            case SyntaxKind.Parameter:
                return visitParameter(node as ParameterDeclaration);
            case SyntaxKind.ExpressionStatement:
                return visitExpressionStatement(node as ExpressionStatement);
            case SyntaxKind.ParenthesizedExpression:
                return visitParenthesizedExpression(node as ParenthesizedExpression, expressionResultIsUnused);
            case SyntaxKind.TaggedTemplateExpression:
                return visitTaggedTemplateExpression(node as TaggedTemplateExpression);
            case SyntaxKind.PropertyAccessExpression:
                if (capturedSuperProperties && isPropertyAccessExpression(node) && node.expression.kind === SyntaxKind.SuperKeyword) {
                    capturedSuperProperties.add(node.name.escapedText);
                }
                return visitEachChild(node, visitor, context);
            case SyntaxKind.ElementAccessExpression:
                if (capturedSuperProperties && (node as ElementAccessExpression).expression.kind === SyntaxKind.SuperKeyword) {
                    hasSuperElementAccess = true;
                }
                return visitEachChild(node, visitor, context);
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ClassExpression:
                return doWithHierarchyFacts(
                    visitDefault,
                    node,
                    HierarchyFacts.ClassOrFunctionExcludes,
                    HierarchyFacts.ClassOrFunctionIncludes,
                );
            default:
                return visitEachChild(node, visitor, context);
        }
    }

    function visitAwaitExpression(node: AwaitExpression): Expression {
        if (enclosingFunctionFlags & FunctionFlags.Async && enclosingFunctionFlags & FunctionFlags.Generator) {
            return setOriginalNode(
                setTextRange(
                    factory.createYieldExpression(/*asteriskToken*/ undefined, emitHelpers().createAwaitHelper(visitNode(node.expression, visitor, isExpression))),
                    /*location*/ node,
                ),
                node,
            );
        }
        return visitEachChild(node, visitor, context);
    }

    function visitYieldExpression(node: YieldExpression) {
        if (enclosingFunctionFlags & FunctionFlags.Async && enclosingFunctionFlags & FunctionFlags.Generator) {
            if (node.asteriskToken) {
                const expression = visitNode(Debug.checkDefined(node.expression), visitor, isExpression);

                return setOriginalNode(
                    setTextRange(
                        factory.createYieldExpression(
                            /*asteriskToken*/ undefined,
                            emitHelpers().createAwaitHelper(
                                factory.updateYieldExpression(
                                    node,
                                    node.asteriskToken,
                                    setTextRange(
                                        emitHelpers().createAsyncDelegatorHelper(
                                            setTextRange(
                                                emitHelpers().createAsyncValuesHelper(expression),
                                                expression,
                                            ),
                                        ),
                                        expression,
                                    ),
                                ),
                            ),
                        ),
                        node,
                    ),
                    node,
                );
            }

            return setOriginalNode(
                setTextRange(
                    factory.createYieldExpression(
                        /*asteriskToken*/ undefined,
                        createDownlevelAwait(
                            node.expression
                                ? visitNode(node.expression, visitor, isExpression)
                                : factory.createVoidZero(),
                        ),
                    ),
                    node,
                ),
                node,
            );
        }

        return visitEachChild(node, visitor, context);
    }

    function visitReturnStatement(node: ReturnStatement) {
        if (enclosingFunctionFlags & FunctionFlags.Async && enclosingFunctionFlags & FunctionFlags.Generator) {
            return factory.updateReturnStatement(
                node,
                createDownlevelAwait(
                    node.expression ? visitNode(node.expression, visitor, isExpression) : factory.createVoidZero(),
                ),
            );
        }

        return visitEachChild(node, visitor, context);
    }

    function visitLabeledStatement(node: LabeledStatement) {
        if (enclosingFunctionFlags & FunctionFlags.Async) {
            const statement = unwrapInnermostStatementOfLabel(node);
            if (statement.kind === SyntaxKind.ForOfStatement && (statement as ForOfStatement).awaitModifier) {
                return visitForOfStatement(statement as ForOfStatement, node);
            }
            return factory.restoreEnclosingLabel(visitNode(statement, visitor, isStatement, factory.liftToBlock), node);
        }
        return visitEachChild(node, visitor, context);
    }

    function chunkObjectLiteralElements(elements: readonly ObjectLiteralElementLike[]): Expression[] {
        let chunkObject: ObjectLiteralElementLike[] | undefined;
        const objects: Expression[] = [];
        for (const e of elements) {
            if (e.kind === SyntaxKind.SpreadAssignment) {
                if (chunkObject) {
                    objects.push(factory.createObjectLiteralExpression(chunkObject));
                    chunkObject = undefined;
                }
                const target = e.expression;
                objects.push(visitNode(target, visitor, isExpression));
            }
            else {
                chunkObject = append(
                    chunkObject,
                    e.kind === SyntaxKind.PropertyAssignment
                        ? factory.createPropertyAssignment(e.name, visitNode(e.initializer, visitor, isExpression))
                        : visitNode(e, visitor, isObjectLiteralElementLike),
                );
            }
        }
        if (chunkObject) {
            objects.push(factory.createObjectLiteralExpression(chunkObject));
        }

        return objects;
    }

    function visitObjectLiteralExpression(node: ObjectLiteralExpression): Expression {
        if (node.transformFlags & TransformFlags.ContainsObjectRestOrSpread) {
            // spread elements emit like so:
            // non-spread elements are chunked together into object literals, and then all are passed to __assign:
            //     { a, ...o, b } => __assign(__assign({a}, o), {b});
            // If the first element is a spread element, then the first argument to __assign is {}:
            //     { ...o, a, b, ...o2 } => __assign(__assign(__assign({}, o), {a, b}), o2)
            //
            // We cannot call __assign with more than two elements, since any element could cause side effects. For
            // example:
            //      var k = { a: 1, b: 2 };
            //      var o = { a: 3, ...k, b: k.a++ };
            //      // expected: { a: 1, b: 1 }
            // If we translate the above to `__assign({ a: 3 }, k, { b: k.a++ })`, the `k.a++` will evaluate before
            // `k` is spread and we end up with `{ a: 2, b: 1 }`.
            //
            // This also occurs for spread elements, not just property assignments:
            //      var k = { a: 1, get b() { l = { z: 9 }; return 2; } };
            //      var l = { c: 3 };
            //      var o = { ...k, ...l };
            //      // expected: { a: 1, b: 2, z: 9 }
            // If we translate the above to `__assign({}, k, l)`, the `l` will evaluate before `k` is spread and we
            // end up with `{ a: 1, b: 2, c: 3 }`
            const objects = chunkObjectLiteralElements(node.properties);
            if (objects.length && objects[0].kind !== SyntaxKind.ObjectLiteralExpression) {
                objects.unshift(factory.createObjectLiteralExpression());
            }
            let expression: Expression = objects[0];
            if (objects.length > 1) {
                for (let i = 1; i < objects.length; i++) {
                    expression = emitHelpers().createAssignHelper([expression, objects[i]]);
                }
                return expression;
            }
            else {
                return emitHelpers().createAssignHelper(objects);
            }
        }
        return visitEachChild(node, visitor, context);
    }

    function visitExpressionStatement(node: ExpressionStatement): ExpressionStatement {
        return visitEachChild(node, visitorWithUnusedExpressionResult, context);
    }

    /**
     * @param expressionResultIsUnused Indicates the result of an expression is unused by the parent node (i.e., the left side of a comma or the
     * expression of an `ExpressionStatement`).
     */
    function visitParenthesizedExpression(node: ParenthesizedExpression, expressionResultIsUnused: boolean): ParenthesizedExpression {
        return visitEachChild(node, expressionResultIsUnused ? visitorWithUnusedExpressionResult : visitor, context);
    }

    function visitSourceFile(node: SourceFile): SourceFile {
        const ancestorFacts = enterSubtree(
            HierarchyFacts.SourceFileExcludes,
            isEffectiveStrictModeSourceFile(node, compilerOptions) ?
                HierarchyFacts.StrictModeSourceFileIncludes :
                HierarchyFacts.SourceFileIncludes,
        );
        exportedVariableStatement = false;
        const visited = visitEachChild(node, visitor, context);
        const statement = concatenate(
            visited.statements,
            taggedTemplateStringDeclarations && [
                factory.createVariableStatement(/*modifiers*/ undefined, factory.createVariableDeclarationList(taggedTemplateStringDeclarations)),
            ],
        );
        const result = factory.updateSourceFile(visited, setTextRange(factory.createNodeArray(statement), node.statements));
        exitSubtree(ancestorFacts);
        return result;
    }

    function visitTaggedTemplateExpression(node: TaggedTemplateExpression) {
        return processTaggedTemplateExpression(
            context,
            node,
            visitor,
            currentSourceFile,
            recordTaggedTemplateString,
            ProcessLevel.LiftRestriction,
        );
    }

    /**
     * Visits a BinaryExpression that contains a destructuring assignment.
     *
     * @param node A BinaryExpression node.
     * @param expressionResultIsUnused Indicates the result of an expression is unused by the parent node (i.e., the left side of a comma or the
     * expression of an `ExpressionStatement`).
     */
    function visitBinaryExpression(node: BinaryExpression, expressionResultIsUnused: boolean): Expression {
        if (isDestructuringAssignment(node) && containsObjectRestOrSpread(node.left)) {
            return flattenDestructuringAssignment(
                node,
                visitor,
                context,
                FlattenLevel.ObjectRest,
                !expressionResultIsUnused,
            );
        }
        if (node.operatorToken.kind === SyntaxKind.CommaToken) {
            return factory.updateBinaryExpression(
                node,
                visitNode(node.left, visitorWithUnusedExpressionResult, isExpression),
                node.operatorToken,
                visitNode(node.right, expressionResultIsUnused ? visitorWithUnusedExpressionResult : visitor, isExpression),
            );
        }
        return visitEachChild(node, visitor, context);
    }

    /**
     * @param expressionResultIsUnused Indicates the result of an expression is unused by the parent node (i.e., the left side of a comma or the
     * expression of an `ExpressionStatement`).
     */
    function visitCommaListExpression(node: CommaListExpression, expressionResultIsUnused: boolean): Expression {
        if (expressionResultIsUnused) {
            return visitEachChild(node, visitorWithUnusedExpressionResult, context);
        }
        let result: Expression[] | undefined;
        for (let i = 0; i < node.elements.length; i++) {
            const element = node.elements[i];
            const visited = visitNode(element, i < node.elements.length - 1 ? visitorWithUnusedExpressionResult : visitor, isExpression);
            if (result || visited !== element) {
                result ||= node.elements.slice(0, i);
                result.push(visited);
            }
        }
        const elements = result ? setTextRange(factory.createNodeArray(result), node.elements) : node.elements;
        return factory.updateCommaListExpression(node, elements);
    }

    function visitCatchClause(node: CatchClause) {
        if (
            node.variableDeclaration &&
            isBindingPattern(node.variableDeclaration.name) &&
            node.variableDeclaration.name.transformFlags & TransformFlags.ContainsObjectRestOrSpread
        ) {
            const name = factory.getGeneratedNameForNode(node.variableDeclaration.name);
            const updatedDecl = factory.updateVariableDeclaration(node.variableDeclaration, node.variableDeclaration.name, /*exclamationToken*/ undefined, /*type*/ undefined, name);
            const visitedBindings = flattenDestructuringBinding(updatedDecl, visitor, context, FlattenLevel.ObjectRest);
            let block = visitNode(node.block, visitor, isBlock);
            if (some(visitedBindings)) {
                block = factory.updateBlock(block, [
                    factory.createVariableStatement(/*modifiers*/ undefined, visitedBindings),
                    ...block.statements,
                ]);
            }
            return factory.updateCatchClause(
                node,
                factory.updateVariableDeclaration(node.variableDeclaration, name, /*exclamationToken*/ undefined, /*type*/ undefined, /*initializer*/ undefined),
                block,
            );
        }
        return visitEachChild(node, visitor, context);
    }

    function visitVariableStatement(node: VariableStatement): VisitResult<VariableStatement> {
        if (hasSyntacticModifier(node, ModifierFlags.Export)) {
            const savedExportedVariableStatement = exportedVariableStatement;
            exportedVariableStatement = true;
            const visited = visitEachChild(node, visitor, context);
            exportedVariableStatement = savedExportedVariableStatement;
            return visited;
        }
        return visitEachChild(node, visitor, context);
    }

    /**
     * Visits a VariableDeclaration node with a binding pattern.
     *
     * @param node A VariableDeclaration node.
     */
    function visitVariableDeclaration(node: VariableDeclaration): VisitResult<VariableDeclaration> {
        if (exportedVariableStatement) {
            const savedExportedVariableStatement = exportedVariableStatement;
            exportedVariableStatement = false;
            const visited = visitVariableDeclarationWorker(node, /*exportedVariableStatement*/ true);
            exportedVariableStatement = savedExportedVariableStatement;
            return visited;
        }
        return visitVariableDeclarationWorker(node, /*exportedVariableStatement*/ false);
    }

    function visitVariableDeclarationWorker(node: VariableDeclaration, exportedVariableStatement: boolean): VisitResult<VariableDeclaration> {
        // If we are here it is because the name contains a binding pattern with a rest somewhere in it.
        if (isBindingPattern(node.name) && node.name.transformFlags & TransformFlags.ContainsObjectRestOrSpread) {
            return flattenDestructuringBinding(
                node,
                visitor,
                context,
                FlattenLevel.ObjectRest,
                /*rval*/ undefined,
                exportedVariableStatement,
            );
        }
        return visitEachChild(node, visitor, context);
    }

    function visitForStatement(node: ForStatement): VisitResult<Statement> {
        return factory.updateForStatement(
            node,
            visitNode(node.initializer, visitorWithUnusedExpressionResult, isForInitializer),
            visitNode(node.condition, visitor, isExpression),
            visitNode(node.incrementor, visitorWithUnusedExpressionResult, isExpression),
            visitIterationBody(node.statement, visitor, context),
        );
    }

    function visitVoidExpression(node: VoidExpression) {
        return visitEachChild(node, visitorWithUnusedExpressionResult, context);
    }

    /**
     * Visits a ForOfStatement and converts it into a ES2015-compatible ForOfStatement.
     *
     * @param node A ForOfStatement.
     */
    function visitForOfStatement(node: ForOfStatement, outermostLabeledStatement: LabeledStatement | undefined): VisitResult<Statement> {
        const ancestorFacts = enterSubtree(HierarchyFacts.IterationStatementExcludes, HierarchyFacts.IterationStatementIncludes);
        if (
            node.initializer.transformFlags & TransformFlags.ContainsObjectRestOrSpread ||
            isAssignmentPattern(node.initializer) && containsObjectRestOrSpread(node.initializer)
        ) {
            node = transformForOfStatementWithObjectRest(node);
        }
        const result = node.awaitModifier ?
            transformForAwaitOfStatement(node, outermostLabeledStatement, ancestorFacts) :
            factory.restoreEnclosingLabel(visitEachChild(node, visitor, context), outermostLabeledStatement);
        exitSubtree(ancestorFacts);
        return result;
    }

    function transformForOfStatementWithObjectRest(node: ForOfStatement) {
        const initializerWithoutParens = skipParentheses(node.initializer) as ForInitializer;
        if (isVariableDeclarationList(initializerWithoutParens) || isAssignmentPattern(initializerWithoutParens)) {
            let bodyLocation: TextRange | undefined;
            let statementsLocation: TextRange | undefined;
            const temp = factory.createTempVariable(/*recordTempVariable*/ undefined);
            const statements: Statement[] = [createForOfBindingStatement(factory, initializerWithoutParens, temp)];
            if (isBlock(node.statement)) {
                addRange(statements, node.statement.statements);
                bodyLocation = node.statement;
                statementsLocation = node.statement.statements;
            }
            else if (node.statement) {
                append(statements, node.statement);
                bodyLocation = node.statement;
                statementsLocation = node.statement;
            }
            return factory.updateForOfStatement(
                node,
                node.awaitModifier,
                setTextRange(
                    factory.createVariableDeclarationList(
                        [
                            setTextRange(factory.createVariableDeclaration(temp), node.initializer),
                        ],
                        NodeFlags.Let,
                    ),
                    node.initializer,
                ),
                node.expression,
                setTextRange(
                    factory.createBlock(
                        setTextRange(factory.createNodeArray(statements), statementsLocation),
                        /*multiLine*/ true,
                    ),
                    bodyLocation,
                ),
            );
        }
        return node;
    }

    function convertForOfStatementHead(node: ForOfStatement, boundValue: Expression, nonUserCode: Identifier) {
        const value = factory.createTempVariable(hoistVariableDeclaration);
        const iteratorValueExpression = factory.createAssignment(value, boundValue);
        const iteratorValueStatement = factory.createExpressionStatement(iteratorValueExpression);
        setSourceMapRange(iteratorValueStatement, node.expression);

        const exitNonUserCodeExpression = factory.createAssignment(nonUserCode, factory.createFalse());
        const exitNonUserCodeStatement = factory.createExpressionStatement(exitNonUserCodeExpression);
        setSourceMapRange(exitNonUserCodeStatement, node.expression);

        const statements: Statement[] = [iteratorValueStatement, exitNonUserCodeStatement];
        const binding = createForOfBindingStatement(factory, node.initializer, value);
        statements.push(visitNode(binding, visitor, isStatement));

        let bodyLocation: TextRange | undefined;
        let statementsLocation: TextRange | undefined;
        const statement = visitIterationBody(node.statement, visitor, context);
        if (isBlock(statement)) {
            addRange(statements, statement.statements);
            bodyLocation = statement;
            statementsLocation = statement.statements;
        }
        else {
            statements.push(statement);
        }

        return setTextRange(
            factory.createBlock(
                setTextRange(factory.createNodeArray(statements), statementsLocation),
                /*multiLine*/ true,
            ),
            bodyLocation,
        );
    }

    function createDownlevelAwait(expression: Expression) {
        return enclosingFunctionFlags & FunctionFlags.Generator
            ? factory.createYieldExpression(/*asteriskToken*/ undefined, emitHelpers().createAwaitHelper(expression))
            : factory.createAwaitExpression(expression);
    }

    function transformForAwaitOfStatement(node: ForOfStatement, outermostLabeledStatement: LabeledStatement | undefined, ancestorFacts: HierarchyFacts) {
        const expression = visitNode(node.expression, visitor, isExpression);
        const iterator = isIdentifier(expression) ? factory.getGeneratedNameForNode(expression) : factory.createTempVariable(/*recordTempVariable*/ undefined);
        const result = isIdentifier(expression) ? factory.getGeneratedNameForNode(iterator) : factory.createTempVariable(/*recordTempVariable*/ undefined);
        const nonUserCode = factory.createTempVariable(/*recordTempVariable*/ undefined);
        const done = factory.createTempVariable(hoistVariableDeclaration);
        const errorRecord = factory.createUniqueName("e");
        const catchVariable = factory.getGeneratedNameForNode(errorRecord);
        const returnMethod = factory.createTempVariable(/*recordTempVariable*/ undefined);
        const callValues = setTextRange(emitHelpers().createAsyncValuesHelper(expression), node.expression);
        const callNext = factory.createCallExpression(factory.createPropertyAccessExpression(iterator, "next"), /*typeArguments*/ undefined, []);
        const getDone = factory.createPropertyAccessExpression(result, "done");
        const getValue = factory.createPropertyAccessExpression(result, "value");
        const callReturn = factory.createFunctionCallCall(returnMethod, iterator, []);

        hoistVariableDeclaration(errorRecord);
        hoistVariableDeclaration(returnMethod);

        // if we are enclosed in an outer loop ensure we reset 'errorRecord' per each iteration
        const initializer = ancestorFacts & HierarchyFacts.IterationContainer ?
            factory.inlineExpressions([factory.createAssignment(errorRecord, factory.createVoidZero()), callValues]) :
            callValues;

        const forStatement = setEmitFlags(
            setTextRange(
                factory.createForStatement(
                    /*initializer*/ setEmitFlags(
                        setTextRange(
                            factory.createVariableDeclarationList([
                                factory.createVariableDeclaration(nonUserCode, /*exclamationToken*/ undefined, /*type*/ undefined, factory.createTrue()),
                                setTextRange(factory.createVariableDeclaration(iterator, /*exclamationToken*/ undefined, /*type*/ undefined, initializer), node.expression),
                                factory.createVariableDeclaration(result),
                            ]),
                            node.expression,
                        ),
                        EmitFlags.NoHoisting,
                    ),
                    /*condition*/ factory.inlineExpressions([
                        factory.createAssignment(result, createDownlevelAwait(callNext)),
                        factory.createAssignment(done, getDone),
                        factory.createLogicalNot(done),
                    ]),
                    /*incrementor*/ factory.createAssignment(nonUserCode, factory.createTrue()),
                    /*statement*/ convertForOfStatementHead(node, getValue, nonUserCode),
                ),
                /*location*/ node,
            ),
            EmitFlags.NoTokenTrailingSourceMaps,
        );
        setOriginalNode(forStatement, node);

        return factory.createTryStatement(
            factory.createBlock([
                factory.restoreEnclosingLabel(
                    forStatement,
                    outermostLabeledStatement,
                ),
            ]),
            factory.createCatchClause(
                factory.createVariableDeclaration(catchVariable),
                setEmitFlags(
                    factory.createBlock([
                        factory.createExpressionStatement(
                            factory.createAssignment(
                                errorRecord,
                                factory.createObjectLiteralExpression([
                                    factory.createPropertyAssignment("error", catchVariable),
                                ]),
                            ),
                        ),
                    ]),
                    EmitFlags.SingleLine,
                ),
            ),
            factory.createBlock([
                factory.createTryStatement(
                    /*tryBlock*/ factory.createBlock([
                        setEmitFlags(
                            factory.createIfStatement(
                                factory.createLogicalAnd(
                                    factory.createLogicalAnd(
                                        factory.createLogicalNot(nonUserCode),
                                        factory.createLogicalNot(done),
                                    ),
                                    factory.createAssignment(
                                        returnMethod,
                                        factory.createPropertyAccessExpression(iterator, "return"),
                                    ),
                                ),
                                factory.createExpressionStatement(createDownlevelAwait(callReturn)),
                            ),
                            EmitFlags.SingleLine,
                        ),
                    ]),
                    /*catchClause*/ undefined,
                    /*finallyBlock*/ setEmitFlags(
                        factory.createBlock([
                            setEmitFlags(
                                factory.createIfStatement(
                                    errorRecord,
                                    factory.createThrowStatement(
                                        factory.createPropertyAccessExpression(errorRecord, "error"),
                                    ),
                                ),
                                EmitFlags.SingleLine,
                            ),
                        ]),
                        EmitFlags.SingleLine,
                    ),
                ),
            ]),
        );
    }

    function parameterVisitor(node: Node) {
        Debug.assertNode(node, isParameter);
        return visitParameter(node);
    }

    function visitParameter(node: ParameterDeclaration): ParameterDeclaration {
        if (parametersWithPrecedingObjectRestOrSpread?.has(node)) {
            return factory.updateParameterDeclaration(
                node,
                /*modifiers*/ undefined,
                node.dotDotDotToken,
                isBindingPattern(node.name) ? factory.getGeneratedNameForNode(node) : node.name,
                /*questionToken*/ undefined,
                /*type*/ undefined,
                /*initializer*/ undefined,
            );
        }
        if (node.transformFlags & TransformFlags.ContainsObjectRestOrSpread) {
            // Binding patterns are converted into a generated name and are
            // evaluated inside the function body.
            return factory.updateParameterDeclaration(
                node,
                /*modifiers*/ undefined,
                node.dotDotDotToken,
                factory.getGeneratedNameForNode(node),
                /*questionToken*/ undefined,
                /*type*/ undefined,
                visitNode(node.initializer, visitor, isExpression),
            );
        }
        return visitEachChild(node, visitor, context);
    }

    function collectParametersWithPrecedingObjectRestOrSpread(node: SignatureDeclaration) {
        let parameters: Set<ParameterDeclaration> | undefined;
        for (const parameter of node.parameters) {
            if (parameters) {
                parameters.add(parameter);
            }
            else if (parameter.transformFlags & TransformFlags.ContainsObjectRestOrSpread) {
                parameters = new Set();
            }
        }
        return parameters;
    }

    function visitConstructorDeclaration(node: ConstructorDeclaration) {
        const savedEnclosingFunctionFlags = enclosingFunctionFlags;
        const savedParametersWithPrecedingObjectRestOrSpread = parametersWithPrecedingObjectRestOrSpread;
        enclosingFunctionFlags = getFunctionFlags(node);
        parametersWithPrecedingObjectRestOrSpread = collectParametersWithPrecedingObjectRestOrSpread(node);
        const updated = factory.updateConstructorDeclaration(
            node,
            node.modifiers,
            visitParameterList(node.parameters, parameterVisitor, context),
            transformFunctionBody(node),
        );
        enclosingFunctionFlags = savedEnclosingFunctionFlags;
        parametersWithPrecedingObjectRestOrSpread = savedParametersWithPrecedingObjectRestOrSpread;
        return updated;
    }

    function visitGetAccessorDeclaration(node: GetAccessorDeclaration) {
        const savedEnclosingFunctionFlags = enclosingFunctionFlags;
        const savedParametersWithPrecedingObjectRestOrSpread = parametersWithPrecedingObjectRestOrSpread;
        enclosingFunctionFlags = getFunctionFlags(node);
        parametersWithPrecedingObjectRestOrSpread = collectParametersWithPrecedingObjectRestOrSpread(node);
        const updated = factory.updateGetAccessorDeclaration(
            node,
            node.modifiers,
            visitNode(node.name, visitor, isPropertyName),
            visitParameterList(node.parameters, parameterVisitor, context),
            /*type*/ undefined,
            transformFunctionBody(node),
        );
        enclosingFunctionFlags = savedEnclosingFunctionFlags;
        parametersWithPrecedingObjectRestOrSpread = savedParametersWithPrecedingObjectRestOrSpread;
        return updated;
    }

    function visitSetAccessorDeclaration(node: SetAccessorDeclaration) {
        const savedEnclosingFunctionFlags = enclosingFunctionFlags;
        const savedParametersWithPrecedingObjectRestOrSpread = parametersWithPrecedingObjectRestOrSpread;
        enclosingFunctionFlags = getFunctionFlags(node);
        parametersWithPrecedingObjectRestOrSpread = collectParametersWithPrecedingObjectRestOrSpread(node);
        const updated = factory.updateSetAccessorDeclaration(
            node,
            node.modifiers,
            visitNode(node.name, visitor, isPropertyName),
            visitParameterList(node.parameters, parameterVisitor, context),
            transformFunctionBody(node),
        );
        enclosingFunctionFlags = savedEnclosingFunctionFlags;
        parametersWithPrecedingObjectRestOrSpread = savedParametersWithPrecedingObjectRestOrSpread;
        return updated;
    }

    function visitMethodDeclaration(node: MethodDeclaration) {
        const savedEnclosingFunctionFlags = enclosingFunctionFlags;
        const savedParametersWithPrecedingObjectRestOrSpread = parametersWithPrecedingObjectRestOrSpread;
        enclosingFunctionFlags = getFunctionFlags(node);
        parametersWithPrecedingObjectRestOrSpread = collectParametersWithPrecedingObjectRestOrSpread(node);
        const updated = factory.updateMethodDeclaration(
            node,
            enclosingFunctionFlags & FunctionFlags.Generator
                ? visitNodes(node.modifiers, visitorNoAsyncModifier, isModifierLike)
                : node.modifiers,
            enclosingFunctionFlags & FunctionFlags.Async
                ? undefined
                : node.asteriskToken,
            visitNode(node.name, visitor, isPropertyName),
            visitNode(/*node*/ undefined, visitor, isQuestionToken),
            /*typeParameters*/ undefined,
            enclosingFunctionFlags & FunctionFlags.Async && enclosingFunctionFlags & FunctionFlags.Generator ?
                transformAsyncGeneratorFunctionParameterList(node) :
                visitParameterList(node.parameters, parameterVisitor, context),
            /*type*/ undefined,
            enclosingFunctionFlags & FunctionFlags.Async && enclosingFunctionFlags & FunctionFlags.Generator ?
                transformAsyncGeneratorFunctionBody(node) :
                transformFunctionBody(node),
        );
        enclosingFunctionFlags = savedEnclosingFunctionFlags;
        parametersWithPrecedingObjectRestOrSpread = savedParametersWithPrecedingObjectRestOrSpread;
        return updated;
    }

    function visitFunctionDeclaration(node: FunctionDeclaration) {
        const savedEnclosingFunctionFlags = enclosingFunctionFlags;
        const savedParametersWithPrecedingObjectRestOrSpread = parametersWithPrecedingObjectRestOrSpread;
        enclosingFunctionFlags = getFunctionFlags(node);
        parametersWithPrecedingObjectRestOrSpread = collectParametersWithPrecedingObjectRestOrSpread(node);
        const updated = factory.updateFunctionDeclaration(
            node,
            enclosingFunctionFlags & FunctionFlags.Generator
                ? visitNodes(node.modifiers, visitorNoAsyncModifier, isModifier)
                : node.modifiers,
            enclosingFunctionFlags & FunctionFlags.Async
                ? undefined
                : node.asteriskToken,
            node.name,
            /*typeParameters*/ undefined,
            enclosingFunctionFlags & FunctionFlags.Async && enclosingFunctionFlags & FunctionFlags.Generator ?
                transformAsyncGeneratorFunctionParameterList(node) :
                visitParameterList(node.parameters, parameterVisitor, context),
            /*type*/ undefined,
            enclosingFunctionFlags & FunctionFlags.Async && enclosingFunctionFlags & FunctionFlags.Generator ?
                transformAsyncGeneratorFunctionBody(node) :
                transformFunctionBody(node),
        );
        enclosingFunctionFlags = savedEnclosingFunctionFlags;
        parametersWithPrecedingObjectRestOrSpread = savedParametersWithPrecedingObjectRestOrSpread;
        return updated;
    }

    function visitArrowFunction(node: ArrowFunction) {
        const savedEnclosingFunctionFlags = enclosingFunctionFlags;
        const savedParametersWithPrecedingObjectRestOrSpread = parametersWithPrecedingObjectRestOrSpread;
        enclosingFunctionFlags = getFunctionFlags(node);
        parametersWithPrecedingObjectRestOrSpread = collectParametersWithPrecedingObjectRestOrSpread(node);
        const updated = factory.updateArrowFunction(
            node,
            node.modifiers,
            /*typeParameters*/ undefined,
            visitParameterList(node.parameters, parameterVisitor, context),
            /*type*/ undefined,
            node.equalsGreaterThanToken,
            transformFunctionBody(node),
        );
        enclosingFunctionFlags = savedEnclosingFunctionFlags;
        parametersWithPrecedingObjectRestOrSpread = savedParametersWithPrecedingObjectRestOrSpread;
        return updated;
    }

    function visitFunctionExpression(node: FunctionExpression) {
        const savedEnclosingFunctionFlags = enclosingFunctionFlags;
        const savedParametersWithPrecedingObjectRestOrSpread = parametersWithPrecedingObjectRestOrSpread;
        enclosingFunctionFlags = getFunctionFlags(node);
        parametersWithPrecedingObjectRestOrSpread = collectParametersWithPrecedingObjectRestOrSpread(node);
        const updated = factory.updateFunctionExpression(
            node,
            enclosingFunctionFlags & FunctionFlags.Generator
                ? visitNodes(node.modifiers, visitorNoAsyncModifier, isModifier)
                : node.modifiers,
            enclosingFunctionFlags & FunctionFlags.Async
                ? undefined
                : node.asteriskToken,
            node.name,
            /*typeParameters*/ undefined,
            enclosingFunctionFlags & FunctionFlags.Async && enclosingFunctionFlags & FunctionFlags.Generator ?
                transformAsyncGeneratorFunctionParameterList(node) :
                visitParameterList(node.parameters, parameterVisitor, context),
            /*type*/ undefined,
            enclosingFunctionFlags & FunctionFlags.Async && enclosingFunctionFlags & FunctionFlags.Generator ?
                transformAsyncGeneratorFunctionBody(node) :
                transformFunctionBody(node),
        );
        enclosingFunctionFlags = savedEnclosingFunctionFlags;
        parametersWithPrecedingObjectRestOrSpread = savedParametersWithPrecedingObjectRestOrSpread;
        return updated;
    }

    function transformAsyncGeneratorFunctionParameterList(node: MethodDeclaration | AccessorDeclaration | FunctionDeclaration | FunctionExpression) {
        if (isSimpleParameterList(node.parameters)) {
            return visitParameterList(node.parameters, visitor, context);
        }
        // Add fixed parameters to preserve the function's `length` property.
        const newParameters: ParameterDeclaration[] = [];
        for (const parameter of node.parameters) {
            if (parameter.initializer || parameter.dotDotDotToken) {
                break;
            }
            const newParameter = factory.createParameterDeclaration(
                /*modifiers*/ undefined,
                /*dotDotDotToken*/ undefined,
                factory.getGeneratedNameForNode(parameter.name, GeneratedIdentifierFlags.ReservedInNestedScopes),
            );
            newParameters.push(newParameter);
        }
        const newParametersArray = factory.createNodeArray(newParameters);
        setTextRange(newParametersArray, node.parameters);
        return newParametersArray;
    }

    function transformAsyncGeneratorFunctionBody(node: MethodDeclaration | AccessorDeclaration | FunctionDeclaration | FunctionExpression): FunctionBody {
        const innerParameters = !isSimpleParameterList(node.parameters) ? visitParameterList(node.parameters, visitor, context) : undefined;
        resumeLexicalEnvironment();

        const savedCapturedSuperProperties = capturedSuperProperties;
        const savedHasSuperElementAccess = hasSuperElementAccess;
        capturedSuperProperties = new Set();
        hasSuperElementAccess = false;

        const outerStatements: Statement[] = [];
        let asyncBody = factory.updateBlock(node.body!, visitNodes(node.body!.statements, visitor, isStatement));
        asyncBody = factory.updateBlock(asyncBody, factory.mergeLexicalEnvironment(asyncBody.statements, appendObjectRestAssignmentsIfNeeded(endLexicalEnvironment(), node)));

        const returnStatement = factory.createReturnStatement(
            emitHelpers().createAsyncGeneratorHelper(
                factory.createFunctionExpression(
                    /*modifiers*/ undefined,
                    factory.createToken(SyntaxKind.AsteriskToken),
                    node.name && factory.getGeneratedNameForNode(node.name),
                    /*typeParameters*/ undefined,
                    innerParameters ?? [],
                    /*type*/ undefined,
                    asyncBody,
                ),
                !!(hierarchyFacts & HierarchyFacts.HasLexicalThis),
            ),
        );

        // Minor optimization, emit `_super` helper to capture `super` access in an arrow.
        // This step isn't needed if we eventually transform this to ES5.
        const emitSuperHelpers = languageVersion >= ScriptTarget.ES2015 && (resolver.hasNodeCheckFlag(node, NodeCheckFlags.MethodWithSuperPropertyAssignmentInAsync) || resolver.hasNodeCheckFlag(node, NodeCheckFlags.MethodWithSuperPropertyAccessInAsync));
        if (emitSuperHelpers) {
            enableSubstitutionForAsyncMethodsWithSuper();
            const variableStatement = createSuperAccessVariableStatement(factory, resolver, node, capturedSuperProperties);
            substitutedSuperAccessors[getNodeId(variableStatement)] = true;
            insertStatementsAfterStandardPrologue(outerStatements, [variableStatement]);
        }

        outerStatements.push(returnStatement);

        const block = factory.updateBlock(node.body!, outerStatements);
        if (emitSuperHelpers && hasSuperElementAccess) {
            if (resolver.hasNodeCheckFlag(node, NodeCheckFlags.MethodWithSuperPropertyAssignmentInAsync)) {
                addEmitHelper(block, advancedAsyncSuperHelper);
            }
            else if (resolver.hasNodeCheckFlag(node, NodeCheckFlags.MethodWithSuperPropertyAccessInAsync)) {
                addEmitHelper(block, asyncSuperHelper);
            }
        }

        capturedSuperProperties = savedCapturedSuperProperties;
        hasSuperElementAccess = savedHasSuperElementAccess;

        return block;
    }

    function transformFunctionBody(node: FunctionDeclaration | FunctionExpression | ConstructorDeclaration | MethodDeclaration | AccessorDeclaration): FunctionBody;
    function transformFunctionBody(node: ArrowFunction): ConciseBody;
    function transformFunctionBody(node: FunctionLikeDeclaration): ConciseBody {
        resumeLexicalEnvironment();
        let statementOffset = 0;
        const statements: Statement[] = [];
        const body = visitNode(node.body, visitor, isConciseBody) ?? factory.createBlock([]);
        if (isBlock(body)) {
            statementOffset = factory.copyPrologue(body.statements, statements, /*ensureUseStrict*/ false, visitor);
        }
        addRange(statements, appendObjectRestAssignmentsIfNeeded(/*statements*/ undefined, node));

        const leadingStatements = endLexicalEnvironment();
        if (statementOffset > 0 || some(statements) || some(leadingStatements)) {
            const block = factory.converters.convertToFunctionBlock(body, /*multiLine*/ true);
            insertStatementsAfterStandardPrologue(statements, leadingStatements);
            addRange(statements, block.statements.slice(statementOffset));
            return factory.updateBlock(block, setTextRange(factory.createNodeArray(statements), block.statements));
        }
        return body;
    }

    function appendObjectRestAssignmentsIfNeeded(statements: Statement[] | undefined, node: FunctionLikeDeclaration): Statement[] | undefined {
        let containsPrecedingObjectRestOrSpread = false;
        for (const parameter of node.parameters) {
            if (containsPrecedingObjectRestOrSpread) {
                if (isBindingPattern(parameter.name)) {
                    // In cases where a binding pattern is simply '[]' or '{}',
                    // we usually don't want to emit a var declaration; however, in the presence
                    // of an initializer, we must emit that expression to preserve side effects.
                    //
                    // NOTE: see `insertDefaultValueAssignmentForBindingPattern` in es2015.ts
                    if (parameter.name.elements.length > 0) {
                        const declarations = flattenDestructuringBinding(
                            parameter,
                            visitor,
                            context,
                            FlattenLevel.All,
                            factory.getGeneratedNameForNode(parameter),
                        );
                        if (some(declarations)) {
                            const declarationList = factory.createVariableDeclarationList(declarations);
                            const statement = factory.createVariableStatement(/*modifiers*/ undefined, declarationList);
                            setEmitFlags(statement, EmitFlags.CustomPrologue);
                            statements = append(statements, statement);
                        }
                    }
                    else if (parameter.initializer) {
                        const name = factory.getGeneratedNameForNode(parameter);
                        const initializer = visitNode(parameter.initializer, visitor, isExpression);
                        const assignment = factory.createAssignment(name, initializer);
                        const statement = factory.createExpressionStatement(assignment);
                        setEmitFlags(statement, EmitFlags.CustomPrologue);
                        statements = append(statements, statement);
                    }
                }
                else if (parameter.initializer) {
                    // Converts a parameter initializer into a function body statement, i.e.:
                    //
                    //  function f(x = 1) { }
                    //
                    // becomes
                    //
                    //  function f(x) {
                    //    if (typeof x === "undefined") { x = 1; }
                    //  }

                    const name = factory.cloneNode(parameter.name);
                    setTextRange(name, parameter.name);
                    setEmitFlags(name, EmitFlags.NoSourceMap);

                    const initializer = visitNode(parameter.initializer, visitor, isExpression);
                    addEmitFlags(initializer, EmitFlags.NoSourceMap | EmitFlags.NoComments);

                    const assignment = factory.createAssignment(name, initializer);
                    setTextRange(assignment, parameter);
                    setEmitFlags(assignment, EmitFlags.NoComments);

                    const block = factory.createBlock([factory.createExpressionStatement(assignment)]);
                    setTextRange(block, parameter);
                    setEmitFlags(block, EmitFlags.SingleLine | EmitFlags.NoTrailingSourceMap | EmitFlags.NoTokenSourceMaps | EmitFlags.NoComments);

                    const typeCheck = factory.createTypeCheck(factory.cloneNode(parameter.name), "undefined");
                    const statement = factory.createIfStatement(typeCheck, block);
                    startOnNewLine(statement);
                    setTextRange(statement, parameter);
                    setEmitFlags(statement, EmitFlags.NoTokenSourceMaps | EmitFlags.NoTrailingSourceMap | EmitFlags.CustomPrologue | EmitFlags.NoComments);
                    statements = append(statements, statement);
                }
            }
            else if (parameter.transformFlags & TransformFlags.ContainsObjectRestOrSpread) {
                containsPrecedingObjectRestOrSpread = true;
                const declarations = flattenDestructuringBinding(
                    parameter,
                    visitor,
                    context,
                    FlattenLevel.ObjectRest,
                    factory.getGeneratedNameForNode(parameter),
                    /*hoistTempVariables*/ false,
                    /*skipInitializer*/ true,
                );
                if (some(declarations)) {
                    const declarationList = factory.createVariableDeclarationList(declarations);
                    const statement = factory.createVariableStatement(/*modifiers*/ undefined, declarationList);
                    setEmitFlags(statement, EmitFlags.CustomPrologue);
                    statements = append(statements, statement);
                }
            }
        }
        return statements;
    }

    function enableSubstitutionForAsyncMethodsWithSuper() {
        if ((enabledSubstitutions & ESNextSubstitutionFlags.AsyncMethodsWithSuper) === 0) {
            enabledSubstitutions |= ESNextSubstitutionFlags.AsyncMethodsWithSuper;

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
     * Called by the printer just before a node is printed.
     *
     * @param hint A hint as to the intended usage of the node.
     * @param node The node to be printed.
     * @param emitCallback The callback used to emit the node.
     */
    function onEmitNode(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void) {
        // If we need to support substitutions for `super` in an async method,
        // we should track it here.
        if (enabledSubstitutions & ESNextSubstitutionFlags.AsyncMethodsWithSuper && isSuperContainer(node)) {
            const superContainerFlags = (resolver.hasNodeCheckFlag(node, NodeCheckFlags.MethodWithSuperPropertyAccessInAsync) ? NodeCheckFlags.MethodWithSuperPropertyAccessInAsync : 0) | (resolver.hasNodeCheckFlag(node, NodeCheckFlags.MethodWithSuperPropertyAssignmentInAsync) ? NodeCheckFlags.MethodWithSuperPropertyAssignmentInAsync : 0);
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
            enclosingSuperContainerFlags = 0 as NodeCheckFlags;
            previousOnEmitNode(hint, node, emitCallback);
            enclosingSuperContainerFlags = savedEnclosingSuperContainerFlags;
            return;
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
        if (hint === EmitHint.Expression && enclosingSuperContainerFlags) {
            return substituteExpression(node as Expression);
        }
        return node;
    }

    function substituteExpression(node: Expression) {
        switch (node.kind) {
            case SyntaxKind.PropertyAccessExpression:
                return substitutePropertyAccessExpression(node as PropertyAccessExpression);
            case SyntaxKind.ElementAccessExpression:
                return substituteElementAccessExpression(node as ElementAccessExpression);
            case SyntaxKind.CallExpression:
                return substituteCallExpression(node as CallExpression);
        }
        return node;
    }

    function substitutePropertyAccessExpression(node: PropertyAccessExpression) {
        if (node.expression.kind === SyntaxKind.SuperKeyword) {
            return setTextRange(
                factory.createPropertyAccessExpression(
                    factory.createUniqueName("_super", GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel),
                    node.name,
                ),
                node,
            );
        }
        return node;
    }

    function substituteElementAccessExpression(node: ElementAccessExpression) {
        if (node.expression.kind === SyntaxKind.SuperKeyword) {
            return createSuperElementAccessInAsyncMethod(
                node.argumentExpression,
                node,
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
                    ...node.arguments,
                ],
            );
        }
        return node;
    }

    function isSuperContainer(node: Node) {
        const kind = node.kind;
        return kind === SyntaxKind.ClassDeclaration
            || kind === SyntaxKind.Constructor
            || kind === SyntaxKind.MethodDeclaration
            || kind === SyntaxKind.GetAccessor
            || kind === SyntaxKind.SetAccessor;
    }

    function createSuperElementAccessInAsyncMethod(argumentExpression: Expression, location: TextRange): LeftHandSideExpression {
        if (enclosingSuperContainerFlags & NodeCheckFlags.MethodWithSuperPropertyAssignmentInAsync) {
            return setTextRange(
                factory.createPropertyAccessExpression(
                    factory.createCallExpression(
                        factory.createIdentifier("_superIndex"),
                        /*typeArguments*/ undefined,
                        [argumentExpression],
                    ),
                    "value",
                ),
                location,
            );
        }
        else {
            return setTextRange(
                factory.createCallExpression(
                    factory.createIdentifier("_superIndex"),
                    /*typeArguments*/ undefined,
                    [argumentExpression],
                ),
                location,
            );
        }
    }
}
