import * as ts from "../_namespaces/ts";

const enum ESNextSubstitutionFlags {
    /** Enables substitutions for async methods with `super` calls. */
    AsyncMethodsWithSuper = 1 << 0
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
export function transformES2018(context: ts.TransformationContext) {
    const {
        factory,
        getEmitHelperFactory: emitHelpers,
        resumeLexicalEnvironment,
        endLexicalEnvironment,
        hoistVariableDeclaration
    } = context;

    const resolver = context.getEmitResolver();
    const compilerOptions = context.getCompilerOptions();
    const languageVersion = ts.getEmitScriptTarget(compilerOptions);

    const previousOnEmitNode = context.onEmitNode;
    context.onEmitNode = onEmitNode;

    const previousOnSubstituteNode = context.onSubstituteNode;
    context.onSubstituteNode = onSubstituteNode;

    let exportedVariableStatement = false;
    let enabledSubstitutions: ESNextSubstitutionFlags;
    let enclosingFunctionFlags: ts.FunctionFlags;
    let parametersWithPrecedingObjectRestOrSpread: ts.Set<ts.ParameterDeclaration> | undefined;
    let enclosingSuperContainerFlags: ts.NodeCheckFlags = 0;
    let hierarchyFacts: HierarchyFacts = 0;

    let currentSourceFile: ts.SourceFile;
    let taggedTemplateStringDeclarations: ts.VariableDeclaration[];

    /** Keeps track of property names accessed on super (`super.x`) within async functions. */
    let capturedSuperProperties: ts.Set<ts.__String>;
    /** Whether the async function contains an element access on super (`super[x]`). */
    let hasSuperElementAccess: boolean;
    /** A set of node IDs for generated super accessors. */
    const substitutedSuperAccessors: boolean[] = [];

    return ts.chainBundle(context, transformSourceFile);

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

    function recordTaggedTemplateString(temp: ts.Identifier) {
        taggedTemplateStringDeclarations = ts.append(
            taggedTemplateStringDeclarations,
            factory.createVariableDeclaration(temp));
    }

    function transformSourceFile(node: ts.SourceFile) {
        if (node.isDeclarationFile) {
            return node;
        }

        currentSourceFile = node;
        const visited = visitSourceFile(node);
        ts.addEmitHelpers(visited, context.readEmitHelpers());

        currentSourceFile = undefined!;
        taggedTemplateStringDeclarations = undefined!;
        return visited;
    }

    function visitor(node: ts.Node): ts.VisitResult<ts.Node> {
        return visitorWorker(node, /*expressionResultIsUnused*/ false);
    }

    function visitorWithUnusedExpressionResult(node: ts.Node): ts.VisitResult<ts.Node> {
        return visitorWorker(node, /*expressionResultIsUnused*/ true);
    }

    function visitorNoAsyncModifier(node: ts.Node): ts.VisitResult<ts.Node> {
        if (node.kind === ts.SyntaxKind.AsyncKeyword) {
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

    function visitDefault(node: ts.Node): ts.VisitResult<ts.Node> {
        return ts.visitEachChild(node, visitor, context);
    }

    /**
     * @param expressionResultIsUnused Indicates the result of an expression is unused by the parent node (i.e., the left side of a comma or the
     * expression of an `ExpressionStatement`).
     */
    function visitorWorker(node: ts.Node, expressionResultIsUnused: boolean): ts.VisitResult<ts.Node> {
        if ((node.transformFlags & ts.TransformFlags.ContainsES2018) === 0) {
            return node;
        }
        switch (node.kind) {
            case ts.SyntaxKind.AwaitExpression:
                return visitAwaitExpression(node as ts.AwaitExpression);
            case ts.SyntaxKind.YieldExpression:
                return visitYieldExpression(node as ts.YieldExpression);
            case ts.SyntaxKind.ReturnStatement:
                return visitReturnStatement(node as ts.ReturnStatement);
            case ts.SyntaxKind.LabeledStatement:
                return visitLabeledStatement(node as ts.LabeledStatement);
            case ts.SyntaxKind.ObjectLiteralExpression:
                return visitObjectLiteralExpression(node as ts.ObjectLiteralExpression);
            case ts.SyntaxKind.BinaryExpression:
                return visitBinaryExpression(node as ts.BinaryExpression, expressionResultIsUnused);
            case ts.SyntaxKind.CommaListExpression:
                return visitCommaListExpression(node as ts.CommaListExpression, expressionResultIsUnused);
            case ts.SyntaxKind.CatchClause:
                return visitCatchClause(node as ts.CatchClause);
            case ts.SyntaxKind.VariableStatement:
                return visitVariableStatement(node as ts.VariableStatement);
            case ts.SyntaxKind.VariableDeclaration:
                return visitVariableDeclaration(node as ts.VariableDeclaration);
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.WhileStatement:
            case ts.SyntaxKind.ForInStatement:
                return doWithHierarchyFacts(
                    visitDefault,
                    node,
                    HierarchyFacts.IterationStatementExcludes,
                    HierarchyFacts.IterationStatementIncludes);
            case ts.SyntaxKind.ForOfStatement:
                return visitForOfStatement(node as ts.ForOfStatement, /*outermostLabeledStatement*/ undefined);
            case ts.SyntaxKind.ForStatement:
                return doWithHierarchyFacts(
                    visitForStatement,
                    node as ts.ForStatement,
                    HierarchyFacts.IterationStatementExcludes,
                    HierarchyFacts.IterationStatementIncludes);
            case ts.SyntaxKind.VoidExpression:
                return visitVoidExpression(node as ts.VoidExpression);
            case ts.SyntaxKind.Constructor:
                return doWithHierarchyFacts(
                    visitConstructorDeclaration,
                    node as ts.ConstructorDeclaration,
                    HierarchyFacts.ClassOrFunctionExcludes,
                    HierarchyFacts.ClassOrFunctionIncludes);
            case ts.SyntaxKind.MethodDeclaration:
                return doWithHierarchyFacts(
                    visitMethodDeclaration,
                    node as ts.MethodDeclaration,
                    HierarchyFacts.ClassOrFunctionExcludes,
                    HierarchyFacts.ClassOrFunctionIncludes);
            case ts.SyntaxKind.GetAccessor:
                return doWithHierarchyFacts(
                    visitGetAccessorDeclaration,
                    node as ts.GetAccessorDeclaration,
                    HierarchyFacts.ClassOrFunctionExcludes,
                    HierarchyFacts.ClassOrFunctionIncludes);
            case ts.SyntaxKind.SetAccessor:
                return doWithHierarchyFacts(
                    visitSetAccessorDeclaration,
                    node as ts.SetAccessorDeclaration,
                    HierarchyFacts.ClassOrFunctionExcludes,
                    HierarchyFacts.ClassOrFunctionIncludes);
            case ts.SyntaxKind.FunctionDeclaration:
                return doWithHierarchyFacts(
                    visitFunctionDeclaration,
                    node as ts.FunctionDeclaration,
                    HierarchyFacts.ClassOrFunctionExcludes,
                    HierarchyFacts.ClassOrFunctionIncludes);
            case ts.SyntaxKind.FunctionExpression:
                return doWithHierarchyFacts(
                    visitFunctionExpression,
                    node as ts.FunctionExpression,
                    HierarchyFacts.ClassOrFunctionExcludes,
                    HierarchyFacts.ClassOrFunctionIncludes);
            case ts.SyntaxKind.ArrowFunction:
                return doWithHierarchyFacts(
                    visitArrowFunction,
                    node as ts.ArrowFunction,
                    HierarchyFacts.ArrowFunctionExcludes,
                    HierarchyFacts.ArrowFunctionIncludes);
            case ts.SyntaxKind.Parameter:
                return visitParameter(node as ts.ParameterDeclaration);
            case ts.SyntaxKind.ExpressionStatement:
                return visitExpressionStatement(node as ts.ExpressionStatement);
            case ts.SyntaxKind.ParenthesizedExpression:
                return visitParenthesizedExpression(node as ts.ParenthesizedExpression, expressionResultIsUnused);
            case ts.SyntaxKind.TaggedTemplateExpression:
                return visitTaggedTemplateExpression(node as ts.TaggedTemplateExpression);
            case ts.SyntaxKind.PropertyAccessExpression:
                if (capturedSuperProperties && ts.isPropertyAccessExpression(node) && node.expression.kind === ts.SyntaxKind.SuperKeyword) {
                    capturedSuperProperties.add(node.name.escapedText);
                }
                return ts.visitEachChild(node, visitor, context);
            case ts.SyntaxKind.ElementAccessExpression:
                if (capturedSuperProperties && (node as ts.ElementAccessExpression).expression.kind === ts.SyntaxKind.SuperKeyword) {
                    hasSuperElementAccess = true;
                }
                return ts.visitEachChild(node, visitor, context);
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.ClassExpression:
                return doWithHierarchyFacts(
                    visitDefault,
                    node,
                    HierarchyFacts.ClassOrFunctionExcludes,
                    HierarchyFacts.ClassOrFunctionIncludes);
            default:
                return ts.visitEachChild(node, visitor, context);
        }
    }

    function visitAwaitExpression(node: ts.AwaitExpression): ts.Expression {
        if (enclosingFunctionFlags & ts.FunctionFlags.Async && enclosingFunctionFlags & ts.FunctionFlags.Generator) {
            return ts.setOriginalNode(
                ts.setTextRange(
                    factory.createYieldExpression(/*asteriskToken*/ undefined, emitHelpers().createAwaitHelper(ts.visitNode(node.expression, visitor, ts.isExpression))),
                    /*location*/ node
                ),
                node
            );
        }
        return ts.visitEachChild(node, visitor, context);
    }

    function visitYieldExpression(node: ts.YieldExpression) {
        if (enclosingFunctionFlags & ts.FunctionFlags.Async && enclosingFunctionFlags & ts.FunctionFlags.Generator) {
            if (node.asteriskToken) {
                const expression = ts.visitNode(ts.Debug.checkDefined(node.expression), visitor, ts.isExpression);

                return ts.setOriginalNode(
                    ts.setTextRange(
                        factory.createYieldExpression(
                            /*asteriskToken*/ undefined,
                            emitHelpers().createAwaitHelper(
                                factory.updateYieldExpression(
                                    node,
                                    node.asteriskToken,
                                    ts.setTextRange(
                                        emitHelpers().createAsyncDelegatorHelper(
                                            ts.setTextRange(
                                                emitHelpers().createAsyncValuesHelper(expression),
                                                expression
                                            )
                                        ),
                                        expression
                                    )
                                )
                            )
                        ),
                        node
                    ),
                    node
                );
            }

            return ts.setOriginalNode(
                ts.setTextRange(
                    factory.createYieldExpression(
                        /*asteriskToken*/ undefined,
                        createDownlevelAwait(
                            node.expression
                                ? ts.visitNode(node.expression, visitor, ts.isExpression)
                                : factory.createVoidZero()
                        )
                    ),
                    node
                ),
                node
            );
        }

        return ts.visitEachChild(node, visitor, context);
    }

    function visitReturnStatement(node: ts.ReturnStatement) {
        if (enclosingFunctionFlags & ts.FunctionFlags.Async && enclosingFunctionFlags & ts.FunctionFlags.Generator) {
            return factory.updateReturnStatement(node, createDownlevelAwait(
                node.expression ? ts.visitNode(node.expression, visitor, ts.isExpression) : factory.createVoidZero()
            ));
        }

        return ts.visitEachChild(node, visitor, context);
    }

    function visitLabeledStatement(node: ts.LabeledStatement) {
        if (enclosingFunctionFlags & ts.FunctionFlags.Async) {
            const statement = ts.unwrapInnermostStatementOfLabel(node);
            if (statement.kind === ts.SyntaxKind.ForOfStatement && (statement as ts.ForOfStatement).awaitModifier) {
                return visitForOfStatement(statement as ts.ForOfStatement, node);
            }
            return factory.restoreEnclosingLabel(ts.visitNode(statement, visitor, ts.isStatement, factory.liftToBlock), node);
        }
        return ts.visitEachChild(node, visitor, context);
    }

    function chunkObjectLiteralElements(elements: readonly ts.ObjectLiteralElementLike[]): ts.Expression[] {
        let chunkObject: ts.ObjectLiteralElementLike[] | undefined;
        const objects: ts.Expression[] = [];
        for (const e of elements) {
            if (e.kind === ts.SyntaxKind.SpreadAssignment) {
                if (chunkObject) {
                    objects.push(factory.createObjectLiteralExpression(chunkObject));
                    chunkObject = undefined;
                }
                const target = e.expression;
                objects.push(ts.visitNode(target, visitor, ts.isExpression));
            }
            else {
                chunkObject = ts.append(chunkObject, e.kind === ts.SyntaxKind.PropertyAssignment
                    ? factory.createPropertyAssignment(e.name, ts.visitNode(e.initializer, visitor, ts.isExpression))
                    : ts.visitNode(e, visitor, ts.isObjectLiteralElementLike));
            }
        }
        if (chunkObject) {
            objects.push(factory.createObjectLiteralExpression(chunkObject));
        }

        return objects;
    }

    function visitObjectLiteralExpression(node: ts.ObjectLiteralExpression): ts.Expression {
        if (node.transformFlags & ts.TransformFlags.ContainsObjectRestOrSpread) {
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
            if (objects.length && objects[0].kind !== ts.SyntaxKind.ObjectLiteralExpression) {
                objects.unshift(factory.createObjectLiteralExpression());
            }
            let expression: ts.Expression = objects[0];
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
        return ts.visitEachChild(node, visitor, context);
    }

    function visitExpressionStatement(node: ts.ExpressionStatement): ts.ExpressionStatement {
        return ts.visitEachChild(node, visitorWithUnusedExpressionResult, context);
    }

    /**
     * @param expressionResultIsUnused Indicates the result of an expression is unused by the parent node (i.e., the left side of a comma or the
     * expression of an `ExpressionStatement`).
     */
    function visitParenthesizedExpression(node: ts.ParenthesizedExpression, expressionResultIsUnused: boolean): ts.ParenthesizedExpression {
        return ts.visitEachChild(node, expressionResultIsUnused ? visitorWithUnusedExpressionResult : visitor, context);
    }

    function visitSourceFile(node: ts.SourceFile): ts.SourceFile {
        const ancestorFacts = enterSubtree(
            HierarchyFacts.SourceFileExcludes,
            ts.isEffectiveStrictModeSourceFile(node, compilerOptions) ?
                HierarchyFacts.StrictModeSourceFileIncludes :
                HierarchyFacts.SourceFileIncludes);
        exportedVariableStatement = false;
        const visited = ts.visitEachChild(node, visitor, context);
        const statement = ts.concatenate(visited.statements, taggedTemplateStringDeclarations && [
            factory.createVariableStatement(/*modifiers*/ undefined,
                factory.createVariableDeclarationList(taggedTemplateStringDeclarations))
        ]);
        const result = factory.updateSourceFile(visited, ts.setTextRange(factory.createNodeArray(statement), node.statements));
        exitSubtree(ancestorFacts);
        return result;
    }

    function visitTaggedTemplateExpression(node: ts.TaggedTemplateExpression) {
        return ts.processTaggedTemplateExpression(
            context,
            node,
            visitor,
            currentSourceFile,
            recordTaggedTemplateString,
            ts.ProcessLevel.LiftRestriction
        );
    }

    /**
     * Visits a BinaryExpression that contains a destructuring assignment.
     *
     * @param node A BinaryExpression node.
     * @param expressionResultIsUnused Indicates the result of an expression is unused by the parent node (i.e., the left side of a comma or the
     * expression of an `ExpressionStatement`).
     */
    function visitBinaryExpression(node: ts.BinaryExpression, expressionResultIsUnused: boolean): ts.Expression {
        if (ts.isDestructuringAssignment(node) && node.left.transformFlags & ts.TransformFlags.ContainsObjectRestOrSpread) {
            return ts.flattenDestructuringAssignment(
                node,
                visitor,
                context,
                ts.FlattenLevel.ObjectRest,
                !expressionResultIsUnused
            );
        }
        if (node.operatorToken.kind === ts.SyntaxKind.CommaToken) {
            return factory.updateBinaryExpression(
                node,
                ts.visitNode(node.left, visitorWithUnusedExpressionResult, ts.isExpression),
                node.operatorToken,
                ts.visitNode(node.right, expressionResultIsUnused ? visitorWithUnusedExpressionResult : visitor, ts.isExpression)
            );
        }
        return ts.visitEachChild(node, visitor, context);
    }

    /**
     * @param expressionResultIsUnused Indicates the result of an expression is unused by the parent node (i.e., the left side of a comma or the
     * expression of an `ExpressionStatement`).
     */
    function visitCommaListExpression(node: ts.CommaListExpression, expressionResultIsUnused: boolean): ts.Expression {
        if (expressionResultIsUnused) {
            return ts.visitEachChild(node, visitorWithUnusedExpressionResult, context);
        }
        let result: ts.Expression[] | undefined;
        for (let i = 0; i < node.elements.length; i++) {
            const element = node.elements[i];
            const visited = ts.visitNode(element, i < node.elements.length - 1 ? visitorWithUnusedExpressionResult : visitor, ts.isExpression);
            if (result || visited !== element) {
                result ||= node.elements.slice(0, i);
                result.push(visited);
            }
        }
        const elements = result ? ts.setTextRange(factory.createNodeArray(result), node.elements) : node.elements;
        return factory.updateCommaListExpression(node, elements);
    }

    function visitCatchClause(node: ts.CatchClause) {
        if (node.variableDeclaration &&
            ts.isBindingPattern(node.variableDeclaration.name) &&
            node.variableDeclaration.name.transformFlags & ts.TransformFlags.ContainsObjectRestOrSpread) {
            const name = factory.getGeneratedNameForNode(node.variableDeclaration.name);
            const updatedDecl = factory.updateVariableDeclaration(node.variableDeclaration, node.variableDeclaration.name, /*exclamationToken*/ undefined, /*type*/ undefined, name);
            const visitedBindings = ts.flattenDestructuringBinding(updatedDecl, visitor, context, ts.FlattenLevel.ObjectRest);
            let block = ts.visitNode(node.block, visitor, ts.isBlock);
            if (ts.some(visitedBindings)) {
                block = factory.updateBlock(block, [
                    factory.createVariableStatement(/*modifiers*/ undefined, visitedBindings),
                    ...block.statements,
                ]);
            }
            return factory.updateCatchClause(
                node,
                factory.updateVariableDeclaration(node.variableDeclaration, name, /*exclamationToken*/ undefined, /*type*/ undefined, /*initializer*/ undefined),
                block);
        }
        return ts.visitEachChild(node, visitor, context);
    }

    function visitVariableStatement(node: ts.VariableStatement): ts.VisitResult<ts.VariableStatement> {
        if (ts.hasSyntacticModifier(node, ts.ModifierFlags.Export)) {
            const savedExportedVariableStatement = exportedVariableStatement;
            exportedVariableStatement = true;
            const visited = ts.visitEachChild(node, visitor, context);
            exportedVariableStatement = savedExportedVariableStatement;
            return visited;
        }
        return ts.visitEachChild(node, visitor, context);
    }

    /**
     * Visits a VariableDeclaration node with a binding pattern.
     *
     * @param node A VariableDeclaration node.
     */
    function visitVariableDeclaration(node: ts.VariableDeclaration): ts.VisitResult<ts.VariableDeclaration> {
        if (exportedVariableStatement) {
            const savedExportedVariableStatement = exportedVariableStatement;
            exportedVariableStatement = false;
            const visited = visitVariableDeclarationWorker(node, /*exportedVariableStatement*/ true);
            exportedVariableStatement = savedExportedVariableStatement;
            return visited;
        }
        return visitVariableDeclarationWorker(node, /*exportedVariableStatement*/ false);
    }

    function visitVariableDeclarationWorker(node: ts.VariableDeclaration, exportedVariableStatement: boolean): ts.VisitResult<ts.VariableDeclaration> {
        // If we are here it is because the name contains a binding pattern with a rest somewhere in it.
        if (ts.isBindingPattern(node.name) && node.name.transformFlags & ts.TransformFlags.ContainsObjectRestOrSpread) {
            return ts.flattenDestructuringBinding(
                node,
                visitor,
                context,
                ts.FlattenLevel.ObjectRest,
                /*rval*/ undefined,
                exportedVariableStatement
            );
        }
        return ts.visitEachChild(node, visitor, context);
    }

    function visitForStatement(node: ts.ForStatement): ts.VisitResult<ts.Statement> {
        return factory.updateForStatement(
            node,
            ts.visitNode(node.initializer, visitorWithUnusedExpressionResult, ts.isForInitializer),
            ts.visitNode(node.condition, visitor, ts.isExpression),
            ts.visitNode(node.incrementor, visitorWithUnusedExpressionResult, ts.isExpression),
            ts.visitIterationBody(node.statement, visitor, context)
        );
    }

    function visitVoidExpression(node: ts.VoidExpression) {
        return ts.visitEachChild(node, visitorWithUnusedExpressionResult, context);
    }

    /**
     * Visits a ForOfStatement and converts it into a ES2015-compatible ForOfStatement.
     *
     * @param node A ForOfStatement.
     */
    function visitForOfStatement(node: ts.ForOfStatement, outermostLabeledStatement: ts.LabeledStatement | undefined): ts.VisitResult<ts.Statement> {
        const ancestorFacts = enterSubtree(HierarchyFacts.IterationStatementExcludes, HierarchyFacts.IterationStatementIncludes);
        if (node.initializer.transformFlags & ts.TransformFlags.ContainsObjectRestOrSpread) {
            node = transformForOfStatementWithObjectRest(node);
        }
        const result = node.awaitModifier ?
            transformForAwaitOfStatement(node, outermostLabeledStatement, ancestorFacts) :
            factory.restoreEnclosingLabel(ts.visitEachChild(node, visitor, context), outermostLabeledStatement);
        exitSubtree(ancestorFacts);
        return result;
    }

    function transformForOfStatementWithObjectRest(node: ts.ForOfStatement) {
        const initializerWithoutParens = ts.skipParentheses(node.initializer) as ts.ForInitializer;
        if (ts.isVariableDeclarationList(initializerWithoutParens) || ts.isAssignmentPattern(initializerWithoutParens)) {
            let bodyLocation: ts.TextRange | undefined;
            let statementsLocation: ts.TextRange | undefined;
            const temp = factory.createTempVariable(/*recordTempVariable*/ undefined);
            const statements: ts.Statement[] = [ts.createForOfBindingStatement(factory, initializerWithoutParens, temp)];
            if (ts.isBlock(node.statement)) {
                ts.addRange(statements, node.statement.statements);
                bodyLocation = node.statement;
                statementsLocation = node.statement.statements;
            }
            else if (node.statement) {
                ts.append(statements, node.statement);
                bodyLocation = node.statement;
                statementsLocation = node.statement;
            }
            return factory.updateForOfStatement(
                node,
                node.awaitModifier,
                ts.setTextRange(
                    factory.createVariableDeclarationList(
                        [
                            ts.setTextRange(factory.createVariableDeclaration(temp), node.initializer)
                        ],
                        ts.NodeFlags.Let
                    ),
                    node.initializer
                ),
                node.expression,
                ts.setTextRange(
                    factory.createBlock(
                        ts.setTextRange(factory.createNodeArray(statements), statementsLocation),
                        /*multiLine*/ true
                    ),
                    bodyLocation
                )
            );
        }
        return node;
    }

    function convertForOfStatementHead(node: ts.ForOfStatement, boundValue: ts.Expression, nonUserCode: ts.Identifier) {
        const value = factory.createTempVariable(hoistVariableDeclaration);
        const iteratorValueExpression = factory.createAssignment(value, boundValue);
        const iteratorValueStatement = factory.createExpressionStatement(iteratorValueExpression);
        ts.setSourceMapRange(iteratorValueStatement, node.expression);

        const exitNonUserCodeExpression = factory.createAssignment(nonUserCode, factory.createFalse());
        const exitNonUserCodeStatement = factory.createExpressionStatement(exitNonUserCodeExpression);
        ts.setSourceMapRange(exitNonUserCodeStatement, node.expression);

        const enterNonUserCodeExpression = factory.createAssignment(nonUserCode, factory.createTrue());
        const enterNonUserCodeStatement = factory.createExpressionStatement(enterNonUserCodeExpression);
        ts.setSourceMapRange(exitNonUserCodeStatement, node.expression);

        const statements: ts.Statement[] = [];
        const binding = ts.createForOfBindingStatement(factory, node.initializer, value);
        statements.push(ts.visitNode(binding, visitor, ts.isStatement));

        let bodyLocation: ts.TextRange | undefined;
        let statementsLocation: ts.TextRange | undefined;
        const statement = ts.visitIterationBody(node.statement, visitor, context);
        if (ts.isBlock(statement)) {
            ts.addRange(statements, statement.statements);
            bodyLocation = statement;
            statementsLocation = statement.statements;
        }
        else {
            statements.push(statement);
        }

        const body = ts.setEmitFlags(
            ts.setTextRange(
                factory.createBlock(
                    ts.setTextRange(factory.createNodeArray(statements), statementsLocation),
                    /*multiLine*/ true
                ),
                bodyLocation
            ),
            ts.EmitFlags.NoSourceMap | ts.EmitFlags.NoTokenSourceMaps
        );

        return factory.createBlock([
            iteratorValueStatement,
            exitNonUserCodeStatement,
            factory.createTryStatement(
                body,
                /*catchClause*/ undefined,
                factory.createBlock([
                    enterNonUserCodeStatement
                ])
            )
        ]);
    }

    function createDownlevelAwait(expression: ts.Expression) {
        return enclosingFunctionFlags & ts.FunctionFlags.Generator
            ? factory.createYieldExpression(/*asteriskToken*/ undefined, emitHelpers().createAwaitHelper(expression))
            : factory.createAwaitExpression(expression);
    }

    function transformForAwaitOfStatement(node: ts.ForOfStatement, outermostLabeledStatement: ts.LabeledStatement | undefined, ancestorFacts: HierarchyFacts) {
        const expression = ts.visitNode(node.expression, visitor, ts.isExpression);
        const iterator = ts.isIdentifier(expression) ? factory.getGeneratedNameForNode(expression) : factory.createTempVariable(/*recordTempVariable*/ undefined);
        const result = ts.isIdentifier(expression) ? factory.getGeneratedNameForNode(iterator) : factory.createTempVariable(/*recordTempVariable*/ undefined);
        const nonUserCode = factory.createTempVariable(/*recordTempVariable*/ undefined);
        const done = factory.createTempVariable(hoistVariableDeclaration);
        const errorRecord = factory.createUniqueName("e");
        const catchVariable = factory.getGeneratedNameForNode(errorRecord);
        const returnMethod = factory.createTempVariable(/*recordTempVariable*/ undefined);
        const callValues = ts.setTextRange(emitHelpers().createAsyncValuesHelper(expression), node.expression);
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

        const forStatement = ts.setEmitFlags(
            ts.setTextRange(
                factory.createForStatement(
                    /*initializer*/ ts.setEmitFlags(
                        ts.setTextRange(
                            factory.createVariableDeclarationList([
                                factory.createVariableDeclaration(nonUserCode, /*exclamationToken*/ undefined, /*type*/ undefined, factory.createTrue()),
                                ts.setTextRange(factory.createVariableDeclaration(iterator, /*exclamationToken*/ undefined, /*type*/ undefined, initializer), node.expression),
                                factory.createVariableDeclaration(result)
                            ]),
                            node.expression
                        ),
                        ts.EmitFlags.NoHoisting
                    ),
                    /*condition*/ factory.inlineExpressions([
                        factory.createAssignment(result, createDownlevelAwait(callNext)),
                        factory.createAssignment(done, getDone),
                        factory.createLogicalNot(done)
                    ]),
                    /*incrementor*/ undefined,
                    /*statement*/ convertForOfStatementHead(node, getValue, nonUserCode)
                ),
                /*location*/ node
            ),
            ts.EmitFlags.NoTokenTrailingSourceMaps
        );
        ts.setOriginalNode(forStatement, node);

        return factory.createTryStatement(
            factory.createBlock([
                factory.restoreEnclosingLabel(
                    forStatement,
                    outermostLabeledStatement
                )
            ]),
            factory.createCatchClause(
                factory.createVariableDeclaration(catchVariable),
                ts.setEmitFlags(
                    factory.createBlock([
                        factory.createExpressionStatement(
                            factory.createAssignment(
                                errorRecord,
                                factory.createObjectLiteralExpression([
                                    factory.createPropertyAssignment("error", catchVariable)
                                ])
                            )
                        )
                    ]),
                    ts.EmitFlags.SingleLine
                )
            ),
            factory.createBlock([
                factory.createTryStatement(
                    /*tryBlock*/ factory.createBlock([
                        ts.setEmitFlags(
                            factory.createIfStatement(
                                factory.createLogicalAnd(
                                    factory.createLogicalAnd(
                                        factory.createLogicalNot(nonUserCode),
                                        factory.createLogicalNot(done),
                                    ),
                                    factory.createAssignment(
                                        returnMethod,
                                        factory.createPropertyAccessExpression(iterator, "return")
                                    )
                                ),
                                factory.createExpressionStatement(createDownlevelAwait(callReturn))
                            ),
                            ts.EmitFlags.SingleLine
                        )
                    ]),
                    /*catchClause*/ undefined,
                    /*finallyBlock*/ ts.setEmitFlags(
                        factory.createBlock([
                            ts.setEmitFlags(
                                factory.createIfStatement(
                                    errorRecord,
                                    factory.createThrowStatement(
                                        factory.createPropertyAccessExpression(errorRecord, "error")
                                    )
                                ),
                                ts.EmitFlags.SingleLine
                            )
                        ]),
                        ts.EmitFlags.SingleLine
                    )
                )
            ])
        );
    }

    function parameterVisitor(node: ts.Node) {
        ts.Debug.assertNode(node, ts.isParameter);
        return visitParameter(node);
    }

    function visitParameter(node: ts.ParameterDeclaration): ts.ParameterDeclaration {
        if (parametersWithPrecedingObjectRestOrSpread?.has(node)) {
            return factory.updateParameterDeclaration(
                node,
                /*modifiers*/ undefined,
                node.dotDotDotToken,
                ts.isBindingPattern(node.name) ? factory.getGeneratedNameForNode(node) : node.name,
                /*questionToken*/ undefined,
                /*type*/ undefined,
                /*initializer*/ undefined
            );
        }
        if (node.transformFlags & ts.TransformFlags.ContainsObjectRestOrSpread) {
            // Binding patterns are converted into a generated name and are
            // evaluated inside the function body.
            return factory.updateParameterDeclaration(
                node,
                /*modifiers*/ undefined,
                node.dotDotDotToken,
                factory.getGeneratedNameForNode(node),
                /*questionToken*/ undefined,
                /*type*/ undefined,
                ts.visitNode(node.initializer, visitor, ts.isExpression)
            );
        }
        return ts.visitEachChild(node, visitor, context);
    }

    function collectParametersWithPrecedingObjectRestOrSpread(node: ts.SignatureDeclaration) {
        let parameters: ts.Set<ts.ParameterDeclaration> | undefined;
        for (const parameter of node.parameters) {
            if (parameters) {
                parameters.add(parameter);
            }
            else if (parameter.transformFlags & ts.TransformFlags.ContainsObjectRestOrSpread) {
                parameters = new ts.Set();
            }
        }
        return parameters;
    }

    function visitConstructorDeclaration(node: ts.ConstructorDeclaration) {
        const savedEnclosingFunctionFlags = enclosingFunctionFlags;
        const savedParametersWithPrecedingObjectRestOrSpread = parametersWithPrecedingObjectRestOrSpread;
        enclosingFunctionFlags = ts.getFunctionFlags(node);
        parametersWithPrecedingObjectRestOrSpread = collectParametersWithPrecedingObjectRestOrSpread(node);
        const updated = factory.updateConstructorDeclaration(
            node,
            node.modifiers,
            ts.visitParameterList(node.parameters, parameterVisitor, context),
            transformFunctionBody(node)
        );
        enclosingFunctionFlags = savedEnclosingFunctionFlags;
        parametersWithPrecedingObjectRestOrSpread = savedParametersWithPrecedingObjectRestOrSpread;
        return updated;
    }

    function visitGetAccessorDeclaration(node: ts.GetAccessorDeclaration) {
        const savedEnclosingFunctionFlags = enclosingFunctionFlags;
        const savedParametersWithPrecedingObjectRestOrSpread = parametersWithPrecedingObjectRestOrSpread;
        enclosingFunctionFlags = ts.getFunctionFlags(node);
        parametersWithPrecedingObjectRestOrSpread = collectParametersWithPrecedingObjectRestOrSpread(node);
        const updated = factory.updateGetAccessorDeclaration(
            node,
            node.modifiers,
            ts.visitNode(node.name, visitor, ts.isPropertyName),
            ts.visitParameterList(node.parameters, parameterVisitor, context),
            /*type*/ undefined,
            transformFunctionBody(node)
        );
        enclosingFunctionFlags = savedEnclosingFunctionFlags;
        parametersWithPrecedingObjectRestOrSpread = savedParametersWithPrecedingObjectRestOrSpread;
        return updated;
    }

    function visitSetAccessorDeclaration(node: ts.SetAccessorDeclaration) {
        const savedEnclosingFunctionFlags = enclosingFunctionFlags;
        const savedParametersWithPrecedingObjectRestOrSpread = parametersWithPrecedingObjectRestOrSpread;
        enclosingFunctionFlags = ts.getFunctionFlags(node);
        parametersWithPrecedingObjectRestOrSpread = collectParametersWithPrecedingObjectRestOrSpread(node);
        const updated = factory.updateSetAccessorDeclaration(
            node,
            node.modifiers,
            ts.visitNode(node.name, visitor, ts.isPropertyName),
            ts.visitParameterList(node.parameters, parameterVisitor, context),
            transformFunctionBody(node)
        );
        enclosingFunctionFlags = savedEnclosingFunctionFlags;
        parametersWithPrecedingObjectRestOrSpread = savedParametersWithPrecedingObjectRestOrSpread;
        return updated;
    }

    function visitMethodDeclaration(node: ts.MethodDeclaration) {
        const savedEnclosingFunctionFlags = enclosingFunctionFlags;
        const savedParametersWithPrecedingObjectRestOrSpread = parametersWithPrecedingObjectRestOrSpread;
        enclosingFunctionFlags = ts.getFunctionFlags(node);
        parametersWithPrecedingObjectRestOrSpread = collectParametersWithPrecedingObjectRestOrSpread(node);
        const updated = factory.updateMethodDeclaration(
            node,
            enclosingFunctionFlags & ts.FunctionFlags.Generator
                ? ts.visitNodes(node.modifiers, visitorNoAsyncModifier, ts.isModifierLike)
                : node.modifiers,
            enclosingFunctionFlags & ts.FunctionFlags.Async
                ? undefined
                : node.asteriskToken,
            ts.visitNode(node.name, visitor, ts.isPropertyName),
            ts.visitNode<ts.Token<ts.SyntaxKind.QuestionToken>>(/*questionToken*/ undefined, visitor, ts.isToken),
            /*typeParameters*/ undefined,
            ts.visitParameterList(node.parameters, parameterVisitor, context),
            /*type*/ undefined,
            enclosingFunctionFlags & ts.FunctionFlags.Async && enclosingFunctionFlags & ts.FunctionFlags.Generator
                ? transformAsyncGeneratorFunctionBody(node)
                : transformFunctionBody(node)
        );
        enclosingFunctionFlags = savedEnclosingFunctionFlags;
        parametersWithPrecedingObjectRestOrSpread = savedParametersWithPrecedingObjectRestOrSpread;
        return updated;
    }

    function visitFunctionDeclaration(node: ts.FunctionDeclaration) {
        const savedEnclosingFunctionFlags = enclosingFunctionFlags;
        const savedParametersWithPrecedingObjectRestOrSpread = parametersWithPrecedingObjectRestOrSpread;
        enclosingFunctionFlags = ts.getFunctionFlags(node);
        parametersWithPrecedingObjectRestOrSpread = collectParametersWithPrecedingObjectRestOrSpread(node);
        const updated = factory.updateFunctionDeclaration(
            node,
            enclosingFunctionFlags & ts.FunctionFlags.Generator
                ? ts.visitNodes(node.modifiers, visitorNoAsyncModifier, ts.isModifier)
                : node.modifiers,
            enclosingFunctionFlags & ts.FunctionFlags.Async
                ? undefined
                : node.asteriskToken,
            node.name,
            /*typeParameters*/ undefined,
            ts.visitParameterList(node.parameters, parameterVisitor, context),
            /*type*/ undefined,
            enclosingFunctionFlags & ts.FunctionFlags.Async && enclosingFunctionFlags & ts.FunctionFlags.Generator
                ? transformAsyncGeneratorFunctionBody(node)
                : transformFunctionBody(node)
        );
        enclosingFunctionFlags = savedEnclosingFunctionFlags;
        parametersWithPrecedingObjectRestOrSpread = savedParametersWithPrecedingObjectRestOrSpread;
        return updated;
    }

    function visitArrowFunction(node: ts.ArrowFunction) {
        const savedEnclosingFunctionFlags = enclosingFunctionFlags;
        const savedParametersWithPrecedingObjectRestOrSpread = parametersWithPrecedingObjectRestOrSpread;
        enclosingFunctionFlags = ts.getFunctionFlags(node);
        parametersWithPrecedingObjectRestOrSpread = collectParametersWithPrecedingObjectRestOrSpread(node);
        const updated = factory.updateArrowFunction(
            node,
            node.modifiers,
            /*typeParameters*/ undefined,
            ts.visitParameterList(node.parameters, parameterVisitor, context),
            /*type*/ undefined,
            node.equalsGreaterThanToken,
            transformFunctionBody(node),
        );
        enclosingFunctionFlags = savedEnclosingFunctionFlags;
        parametersWithPrecedingObjectRestOrSpread = savedParametersWithPrecedingObjectRestOrSpread;
        return updated;
    }

    function visitFunctionExpression(node: ts.FunctionExpression) {
        const savedEnclosingFunctionFlags = enclosingFunctionFlags;
        const savedParametersWithPrecedingObjectRestOrSpread = parametersWithPrecedingObjectRestOrSpread;
        enclosingFunctionFlags = ts.getFunctionFlags(node);
        parametersWithPrecedingObjectRestOrSpread = collectParametersWithPrecedingObjectRestOrSpread(node);
        const updated = factory.updateFunctionExpression(
            node,
            enclosingFunctionFlags & ts.FunctionFlags.Generator
                ? ts.visitNodes(node.modifiers, visitorNoAsyncModifier, ts.isModifier)
                : node.modifiers,
            enclosingFunctionFlags & ts.FunctionFlags.Async
                ? undefined
                : node.asteriskToken,
            node.name,
            /*typeParameters*/ undefined,
            ts.visitParameterList(node.parameters, parameterVisitor, context),
            /*type*/ undefined,
            enclosingFunctionFlags & ts.FunctionFlags.Async && enclosingFunctionFlags & ts.FunctionFlags.Generator
                ? transformAsyncGeneratorFunctionBody(node)
                : transformFunctionBody(node)
        );
        enclosingFunctionFlags = savedEnclosingFunctionFlags;
        parametersWithPrecedingObjectRestOrSpread = savedParametersWithPrecedingObjectRestOrSpread;
        return updated;
    }

    function transformAsyncGeneratorFunctionBody(node: ts.MethodDeclaration | ts.AccessorDeclaration | ts.FunctionDeclaration | ts.FunctionExpression): ts.FunctionBody {
        resumeLexicalEnvironment();
        const statements: ts.Statement[] = [];
        const statementOffset = factory.copyPrologue(node.body!.statements, statements, /*ensureUseStrict*/ false, visitor);
        appendObjectRestAssignmentsIfNeeded(statements, node);

        const savedCapturedSuperProperties = capturedSuperProperties;
        const savedHasSuperElementAccess = hasSuperElementAccess;
        capturedSuperProperties = new ts.Set();
        hasSuperElementAccess = false;

        const returnStatement = factory.createReturnStatement(
            emitHelpers().createAsyncGeneratorHelper(
                factory.createFunctionExpression(
                    /*modifiers*/ undefined,
                    factory.createToken(ts.SyntaxKind.AsteriskToken),
                    node.name && factory.getGeneratedNameForNode(node.name),
                    /*typeParameters*/ undefined,
                    /*parameters*/ [],
                    /*type*/ undefined,
                    factory.updateBlock(
                        node.body!,
                        ts.visitLexicalEnvironment(node.body!.statements, visitor, context, statementOffset)
                    )
                ),
                !!(hierarchyFacts & HierarchyFacts.HasLexicalThis)
            )
        );

        // Minor optimization, emit `_super` helper to capture `super` access in an arrow.
        // This step isn't needed if we eventually transform this to ES5.
        const emitSuperHelpers = languageVersion >= ts.ScriptTarget.ES2015 && resolver.getNodeCheckFlags(node) & (ts.NodeCheckFlags.MethodWithSuperPropertyAssignmentInAsync | ts.NodeCheckFlags.MethodWithSuperPropertyAccessInAsync);

        if (emitSuperHelpers) {
            enableSubstitutionForAsyncMethodsWithSuper();
            const variableStatement = ts.createSuperAccessVariableStatement(factory, resolver, node, capturedSuperProperties);
            substitutedSuperAccessors[ts.getNodeId(variableStatement)] = true;
            ts.insertStatementsAfterStandardPrologue(statements, [variableStatement]);
        }

        statements.push(returnStatement);

        ts.insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());
        const block = factory.updateBlock(node.body!, statements);

        if (emitSuperHelpers && hasSuperElementAccess) {
            if (resolver.getNodeCheckFlags(node) & ts.NodeCheckFlags.MethodWithSuperPropertyAssignmentInAsync) {
                ts.addEmitHelper(block, ts.advancedAsyncSuperHelper);
            }
            else if (resolver.getNodeCheckFlags(node) & ts.NodeCheckFlags.MethodWithSuperPropertyAccessInAsync) {
                ts.addEmitHelper(block, ts.asyncSuperHelper);
            }
        }

        capturedSuperProperties = savedCapturedSuperProperties;
        hasSuperElementAccess = savedHasSuperElementAccess;

        return block;
    }

    function transformFunctionBody(node: ts.FunctionDeclaration | ts.FunctionExpression | ts.ConstructorDeclaration | ts.MethodDeclaration | ts.AccessorDeclaration): ts.FunctionBody;
    function transformFunctionBody(node: ts.ArrowFunction): ts.ConciseBody;
    function transformFunctionBody(node: ts.FunctionLikeDeclaration): ts.ConciseBody {
        resumeLexicalEnvironment();
        let statementOffset = 0;
        const statements: ts.Statement[] = [];
        const body = ts.visitNode(node.body, visitor, ts.isConciseBody) ?? factory.createBlock([]);
        if (ts.isBlock(body)) {
            statementOffset = factory.copyPrologue(body.statements, statements, /*ensureUseStrict*/ false, visitor);
        }
        ts.addRange(statements, appendObjectRestAssignmentsIfNeeded(/*statements*/ undefined, node));

        const leadingStatements = endLexicalEnvironment();
        if (statementOffset > 0 || ts.some(statements) || ts.some(leadingStatements)) {
            const block = factory.converters.convertToFunctionBlock(body, /*multiLine*/ true);
            ts.insertStatementsAfterStandardPrologue(statements, leadingStatements);
            ts.addRange(statements, block.statements.slice(statementOffset));
            return factory.updateBlock(block, ts.setTextRange(factory.createNodeArray(statements), block.statements));
        }
        return body;
    }

    function appendObjectRestAssignmentsIfNeeded(statements: ts.Statement[] | undefined, node: ts.FunctionLikeDeclaration): ts.Statement[] | undefined {
        let containsPrecedingObjectRestOrSpread = false;
        for (const parameter of node.parameters) {
            if (containsPrecedingObjectRestOrSpread) {
                if (ts.isBindingPattern(parameter.name)) {
                    // In cases where a binding pattern is simply '[]' or '{}',
                    // we usually don't want to emit a var declaration; however, in the presence
                    // of an initializer, we must emit that expression to preserve side effects.
                    //
                    // NOTE: see `insertDefaultValueAssignmentForBindingPattern` in es2015.ts
                    if (parameter.name.elements.length > 0) {
                        const declarations = ts.flattenDestructuringBinding(
                            parameter,
                            visitor,
                            context,
                            ts.FlattenLevel.All,
                            factory.getGeneratedNameForNode(parameter));
                        if (ts.some(declarations)) {
                            const declarationList = factory.createVariableDeclarationList(declarations);
                            const statement = factory.createVariableStatement(/*modifiers*/ undefined, declarationList);
                            ts.setEmitFlags(statement, ts.EmitFlags.CustomPrologue);
                            statements = ts.append(statements, statement);
                        }
                    }
                    else if (parameter.initializer) {
                        const name = factory.getGeneratedNameForNode(parameter);
                        const initializer = ts.visitNode(parameter.initializer, visitor, ts.isExpression);
                        const assignment = factory.createAssignment(name, initializer);
                        const statement = factory.createExpressionStatement(assignment);
                        ts.setEmitFlags(statement, ts.EmitFlags.CustomPrologue);
                        statements = ts.append(statements, statement);
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
                    ts.setTextRange(name, parameter.name);
                    ts.setEmitFlags(name, ts.EmitFlags.NoSourceMap);

                    const initializer = ts.visitNode(parameter.initializer, visitor, ts.isExpression);
                    ts.addEmitFlags(initializer, ts.EmitFlags.NoSourceMap | ts.EmitFlags.NoComments);

                    const assignment = factory.createAssignment(name, initializer);
                    ts.setTextRange(assignment, parameter);
                    ts.setEmitFlags(assignment, ts.EmitFlags.NoComments);

                    const block = factory.createBlock([factory.createExpressionStatement(assignment)]);
                    ts.setTextRange(block, parameter);
                    ts.setEmitFlags(block, ts.EmitFlags.SingleLine | ts.EmitFlags.NoTrailingSourceMap | ts.EmitFlags.NoTokenSourceMaps | ts.EmitFlags.NoComments);

                    const typeCheck = factory.createTypeCheck(factory.cloneNode(parameter.name), "undefined");
                    const statement = factory.createIfStatement(typeCheck, block);
                    ts.startOnNewLine(statement);
                    ts.setTextRange(statement, parameter);
                    ts.setEmitFlags(statement, ts.EmitFlags.NoTokenSourceMaps | ts.EmitFlags.NoTrailingSourceMap | ts.EmitFlags.CustomPrologue | ts.EmitFlags.NoComments);
                    statements = ts.append(statements, statement);
                }
            }
            else if (parameter.transformFlags & ts.TransformFlags.ContainsObjectRestOrSpread) {
                containsPrecedingObjectRestOrSpread = true;
                const declarations = ts.flattenDestructuringBinding(
                    parameter,
                    visitor,
                    context,
                    ts.FlattenLevel.ObjectRest,
                    factory.getGeneratedNameForNode(parameter),
                    /*doNotRecordTempVariablesInLine*/ false,
                    /*skipInitializer*/ true,
                );
                if (ts.some(declarations)) {
                    const declarationList = factory.createVariableDeclarationList(declarations);
                    const statement = factory.createVariableStatement(/*modifiers*/ undefined, declarationList);
                    ts.setEmitFlags(statement, ts.EmitFlags.CustomPrologue);
                    statements = ts.append(statements, statement);
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
            context.enableSubstitution(ts.SyntaxKind.CallExpression);
            context.enableSubstitution(ts.SyntaxKind.PropertyAccessExpression);
            context.enableSubstitution(ts.SyntaxKind.ElementAccessExpression);

            // We need to be notified when entering and exiting declarations that bind super.
            context.enableEmitNotification(ts.SyntaxKind.ClassDeclaration);
            context.enableEmitNotification(ts.SyntaxKind.MethodDeclaration);
            context.enableEmitNotification(ts.SyntaxKind.GetAccessor);
            context.enableEmitNotification(ts.SyntaxKind.SetAccessor);
            context.enableEmitNotification(ts.SyntaxKind.Constructor);
            // We need to be notified when entering the generated accessor arrow functions.
            context.enableEmitNotification(ts.SyntaxKind.VariableStatement);
        }
    }

    /**
     * Called by the printer just before a node is printed.
     *
     * @param hint A hint as to the intended usage of the node.
     * @param node The node to be printed.
     * @param emitCallback The callback used to emit the node.
     */
    function onEmitNode(hint: ts.EmitHint, node: ts.Node, emitCallback: (hint: ts.EmitHint, node: ts.Node) => void) {
        // If we need to support substitutions for `super` in an async method,
        // we should track it here.
        if (enabledSubstitutions & ESNextSubstitutionFlags.AsyncMethodsWithSuper && isSuperContainer(node)) {
            const superContainerFlags = resolver.getNodeCheckFlags(node) & (ts.NodeCheckFlags.MethodWithSuperPropertyAccessInAsync | ts.NodeCheckFlags.MethodWithSuperPropertyAssignmentInAsync);
            if (superContainerFlags !== enclosingSuperContainerFlags) {
                const savedEnclosingSuperContainerFlags = enclosingSuperContainerFlags;
                enclosingSuperContainerFlags = superContainerFlags;
                previousOnEmitNode(hint, node, emitCallback);
                enclosingSuperContainerFlags = savedEnclosingSuperContainerFlags;
                return;
            }
        }
        // Disable substitution in the generated super accessor itself.
        else if (enabledSubstitutions && substitutedSuperAccessors[ts.getNodeId(node)]) {
            const savedEnclosingSuperContainerFlags = enclosingSuperContainerFlags;
            enclosingSuperContainerFlags = 0 as ts.NodeCheckFlags;
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
    function onSubstituteNode(hint: ts.EmitHint, node: ts.Node) {
        node = previousOnSubstituteNode(hint, node);
        if (hint === ts.EmitHint.Expression && enclosingSuperContainerFlags) {
            return substituteExpression(node as ts.Expression);
        }
        return node;
    }

    function substituteExpression(node: ts.Expression) {
        switch (node.kind) {
            case ts.SyntaxKind.PropertyAccessExpression:
                return substitutePropertyAccessExpression(node as ts.PropertyAccessExpression);
            case ts.SyntaxKind.ElementAccessExpression:
                return substituteElementAccessExpression(node as ts.ElementAccessExpression);
            case ts.SyntaxKind.CallExpression:
                return substituteCallExpression(node as ts.CallExpression);
        }
        return node;
    }

    function substitutePropertyAccessExpression(node: ts.PropertyAccessExpression) {
        if (node.expression.kind === ts.SyntaxKind.SuperKeyword) {
            return ts.setTextRange(
                factory.createPropertyAccessExpression(
                    factory.createUniqueName("_super", ts.GeneratedIdentifierFlags.Optimistic | ts.GeneratedIdentifierFlags.FileLevel),
                    node.name),
                node
            );
        }
        return node;
    }

    function substituteElementAccessExpression(node: ts.ElementAccessExpression) {
        if (node.expression.kind === ts.SyntaxKind.SuperKeyword) {
            return createSuperElementAccessInAsyncMethod(
                node.argumentExpression,
                node
            );
        }
        return node;
    }

    function substituteCallExpression(node: ts.CallExpression): ts.Expression {
        const expression = node.expression;
        if (ts.isSuperProperty(expression)) {
            const argumentExpression = ts.isPropertyAccessExpression(expression)
                ? substitutePropertyAccessExpression(expression)
                : substituteElementAccessExpression(expression);
            return factory.createCallExpression(
                factory.createPropertyAccessExpression(argumentExpression, "call"),
                /*typeArguments*/ undefined,
                [
                    factory.createThis(),
                    ...node.arguments
                ]
            );
        }
        return node;
    }

    function isSuperContainer(node: ts.Node) {
        const kind = node.kind;
        return kind === ts.SyntaxKind.ClassDeclaration
            || kind === ts.SyntaxKind.Constructor
            || kind === ts.SyntaxKind.MethodDeclaration
            || kind === ts.SyntaxKind.GetAccessor
            || kind === ts.SyntaxKind.SetAccessor;
    }

    function createSuperElementAccessInAsyncMethod(argumentExpression: ts.Expression, location: ts.TextRange): ts.LeftHandSideExpression {
        if (enclosingSuperContainerFlags & ts.NodeCheckFlags.MethodWithSuperPropertyAssignmentInAsync) {
            return ts.setTextRange(
                factory.createPropertyAccessExpression(
                    factory.createCallExpression(
                        factory.createIdentifier("_superIndex"),
                        /*typeArguments*/ undefined,
                        [argumentExpression]
                    ),
                    "value"
                ),
                location
            );
        }
        else {
            return ts.setTextRange(
                factory.createCallExpression(
                    factory.createIdentifier("_superIndex"),
                    /*typeArguments*/ undefined,
                    [argumentExpression]
                ),
                location
            );
        }
    }
}
