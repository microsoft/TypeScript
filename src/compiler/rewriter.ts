/// <reference path="types.ts"/>
/// <reference path="core.ts"/>
/// <reference path="scanner.ts"/>
/// <reference path="parser.ts"/>
/// <reference path="factory.ts"/>
/// <reference path="generator.ts"/>

// TODO(rbuckton): do we need to rewrite around `arguments` or disallow `arguments` in async/generator?
// TODO(rbuckton): do we need to rewrite around computed properties?
// TODO(rbuckton): rewrite async destructuring, destructuring parameters?
// TODO(rbuckton): pass in a LocalGenerator from emitter, and use it for local generation instead.
module ts {
    /** rewrites an async or generator function or method declaration */
    export function rewriteFunction(node: FunctionLikeDeclaration, compilerOptions: CompilerOptions, resolver: EmitResolver): FunctionLikeDeclaration {
        var locals = createLocalGenerator(resolver, node.body);
        var builder: CodeGenerator;
        var isDownlevel = compilerOptions.target <= ScriptTarget.ES5;
        var isAsync = (node.flags & NodeFlags.Async) !== 0;
        var isGenerator = !!node.asteriskToken;
        var isDownlevelGenerator = isDownlevel && isGenerator;
        var isDownlevelAsync = isDownlevel && isAsync;
        var isUplevelAsync = !isDownlevel && isAsync;
        var generatedLocation: TextRange = { pos: -1, end: -1 };

        if (!isAsync && !isDownlevelGenerator) {
            return node;
        }

        return rewriteWorker();

        function visitNodes<TNode extends Node>(nodes: NodeArray<TNode>, visitNode: (node: TNode) => TNode, cacheNode?: (node: TNode) => TNode, removeMissingNodes?: boolean): NodeArray<TNode> {
            if (!nodes) {
                return nodes;
            }

            var rewrittenNodes: TNode[];
            var updatedNodes: TNode[];
            var updatedOffset = 0;
            var cacheOffset = 0;

            for (var i = 0; i < nodes.length; i++) {
                var updatedIndex = i - updatedOffset;
                var node = nodes[i];
                if (hasAwaitOrYield(node)) {
                    if (!updatedNodes) {
                        updatedNodes = nodes.slice(0, i);
                    }
                    if (cacheNode) {
                        while (cacheOffset < updatedIndex) {
                            updatedNodes[cacheOffset] = cacheNode(updatedNodes[cacheOffset]);
                            cacheOffset++;
                        }
                    }
                    cacheOffset = updatedIndex;
                }
                var updatedNode = visitNode(node);
                if ((updatedNodes || updatedNode !== node || (!updatedNode && removeMissingNodes))) {
                    if (!updatedNodes) {
                        updatedNodes = nodes.slice(0, i);
                    }
                    if (!updatedNode && removeMissingNodes) {
                        updatedOffset++;
                    }
                    else {
                        updatedNodes[i - updatedOffset] = updatedNode;
                    }
                }
            }
            if (updatedNodes) {
                return factory.createNodeArray(updatedNodes, nodes);
            }
            return nodes;
        }

        // expressions
        function cacheExpression(node: Expression): Identifier {
            var local = builder.declareLocal();
            var assignExpression = factory.createBinaryExpression(SyntaxKind.EqualsToken, local, node);
            builder.emit(OpCode.Statement, factory.createExpressionStatement(assignExpression));
            return local;
        }

        function visitExpression(node: Expression): Expression {
            if (!node) {
                return node;
            }

            switch (node.kind) {
                case SyntaxKind.BinaryExpression:
                    return visitBinaryExpression(<BinaryExpression>node);

                case SyntaxKind.ConditionalExpression:
                    return visitConditionalExpression(<ConditionalExpression>node);

                case SyntaxKind.TypeAssertionExpression:
                    return visitTypeAssertionExpression(<TypeAssertion>node);

                case SyntaxKind.TaggedTemplateExpression:
                    return visitTaggedTemplateExpression(<TaggedTemplateExpression>node);

                case SyntaxKind.TemplateExpression:
                    return visitTemplateExpression(<TemplateExpression>node);

                case SyntaxKind.YieldExpression:
                    return visitYieldExpression(<YieldExpression>node);

                default:
                    return visitUnaryExpression(<UnaryExpression>node);
            }

            return node;
        }

        function visitUnaryExpression(node: UnaryExpression): UnaryExpression {
            if (!node) {
                return node;
            }

            switch (node.kind) {
                case SyntaxKind.PrefixUnaryExpression:
                    return visitPrefixUnaryExpression(<PrefixUnaryExpression>node);

                case SyntaxKind.PostfixUnaryExpression:
                    return visitPostfixUnaryExpression(<PostfixUnaryExpression>node);

                case SyntaxKind.AwaitExpression:
                    return visitAwaitExpression(<AwaitExpression>node);

                case SyntaxKind.TypeOfExpression:
                    return visitTypeOfExpression(<TypeOfExpression>node);

                case SyntaxKind.DeleteExpression:
                    return visitDeleteExpression(<DeleteExpression>node);

                case SyntaxKind.TypeAssertionExpression:
                    return visitTypeAssertionExpression(<TypeAssertion>node);

                default:
                    return visitLeftHandSideExpression(<LeftHandSideExpression>node);
            }

            return node;
        }

        function visitLeftHandSideExpression(node: LeftHandSideExpression): LeftHandSideExpression {
            if (!node) {
                return node;
            }

            switch (node.kind) {
                case SyntaxKind.ParenthesizedExpression:
                    return visitParenthesizedExpression(<ParenthesizedExpression>node);

                case SyntaxKind.ArrayLiteralExpression:
                    return visitArrayLiteralExpression(<ArrayLiteralExpression>node);

                case SyntaxKind.ObjectLiteralExpression:
                    return visitObjectLiteralExpression(<ObjectLiteralExpression>node);

                case SyntaxKind.PropertyAccessExpression:
                    return visitPropertyAccessExpression(<PropertyAccessExpression>node);

                case SyntaxKind.ElementAccessExpression:
                    return visitElementAccessExpression(<ElementAccessExpression>node);

                case SyntaxKind.CallExpression:
                    return visitCallExpression(<CallExpression>node);

                case SyntaxKind.NewExpression:
                    return visitNewExpression(<NewExpression>node);

                case SyntaxKind.TaggedTemplateExpression:
                    return visitTaggedTemplateExpression(<TaggedTemplateExpression>node);

                case SyntaxKind.TemplateExpression:
                    return visitTemplateExpression(<TemplateExpression>node);

                case SyntaxKind.ThisKeyword:
                case SyntaxKind.SuperKeyword:
                case SyntaxKind.NullKeyword:
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.FalseKeyword:
                case SyntaxKind.StringLiteral:
                case SyntaxKind.NumericLiteral:
                case SyntaxKind.Identifier:
                case SyntaxKind.RegularExpressionLiteral:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                case SyntaxKind.NoSubstitutionTemplateLiteral:
                case SyntaxKind.OmittedExpression:
                    return node;

                default:
                    reportUnexpectedNode(node);
                    return node;
            }
        }

        function visitTemplateLiteralOrTemplateExpression(node: LiteralExpression | TemplateExpression): LiteralExpression | TemplateExpression {
            if (!node) {
                return node;
            }

            switch (node.kind) {
                case SyntaxKind.NoSubstitutionTemplateLiteral:
                    return node;

                case SyntaxKind.TemplateExpression:
                    return visitTemplateExpression(<TemplateExpression>node);

                default:
                    reportUnexpectedNode(node);
                    return node;
            }
        }

        function visitObjectLiteralElement(node: ObjectLiteralElement): ObjectLiteralElement {
            if (!node) {
                return node;
            }

            switch (node.kind) {
                case SyntaxKind.PropertyAssignment:
                    return visitPropertyAssignment(<PropertyAssignment>node);

                case SyntaxKind.ShorthandPropertyAssignment:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    // no need to visit these
                    return node;
                default:
                    reportUnexpectedNode(node);
                    return node;
            }
        }

        function visitPropertyAssignment(node: PropertyAssignment): ObjectLiteralElement {
            return factory.updatePropertyAssignment(node, node.name, visitExpression(node.initializer));
        }

        function visitPrefixUnaryExpression(node: PrefixUnaryExpression): UnaryExpression {
            return factory.updatePrefixUnaryExpression(node, visitUnaryExpression(node.operand));
        }

        function visitPostfixUnaryExpression(node: PostfixUnaryExpression): UnaryExpression {
            return factory.updatePostfixUnaryExpression(node, visitLeftHandSideExpression(node.operand));
        }

        function visitAwaitExpression(node: AwaitExpression): UnaryExpression {
            if (isDownlevel) {
                return rewriteAwaitExpressionDownlevel(node);
            } else {
                return rewriteAwaitExpressionUplevel(node);
            }
        }

        function visitTypeOfExpression(node: TypeOfExpression): UnaryExpression {
            return factory.updateTypeOfExpression(node, visitUnaryExpression(node.expression));
        }

        function visitDeleteExpression(node: DeleteExpression): UnaryExpression {
            return factory.updateDeleteExpression(node, visitUnaryExpression(node.expression));
        }

        function visitTypeAssertionExpression(node: TypeAssertion): UnaryExpression {
            return factory.updateTypeAssertion(node, visitUnaryExpression(node.expression));
        }

        function visitYieldExpression(node: YieldExpression): Expression {
            if (isDownlevelGenerator) {
                return rewriteYieldExpression(node);
            }

            return node;
        }

        function visitBinaryExpression(node: BinaryExpression): Expression {
            if (isDownlevel && hasAwaitOrYield(node.right)) {
                if (isLogicalBinary(node)) {
                    return rewriteLogicalBinaryExpression(node);
                } else if (isAssignment(node)) {
                    return factory.updateBinaryExpression(node, rewriteLeftHandSideOfAssignmentExpression(node.left), visitExpression(node.right));
                } else {
                    return factory.updateBinaryExpression(node, cacheExpression(visitExpression(node.left)), visitExpression(node.right));
                }
            } else {
                return factory.updateBinaryExpression(node, visitExpression(node.left), visitExpression(node.right));
            }
        }

        function visitConditionalExpression(node: ConditionalExpression): Expression {
            if (isDownlevel && (hasAwaitOrYield(node.whenTrue) || hasAwaitOrYield(node.whenFalse))) {
                return rewriteConditionalExpression(node);
            } else {
                return factory.updateConditionalExpression(node, visitExpression(node.condition), visitExpression(node.whenTrue), visitExpression(node.whenFalse));
            }
        }

        function visitParenthesizedExpression(node: ParenthesizedExpression): LeftHandSideExpression {
            return factory.updateParenthesizedExpression(node, visitExpression(node.expression));
        }

        function visitArrayLiteralExpression(node: ArrayLiteralExpression): LeftHandSideExpression {
            if (isDownlevel && hasAwaitOrYield(node)) {
                return factory.updateArrayLiteralExpression(node, visitNodes(node.elements, visitExpression, cacheExpression));
            } else {
                return factory.updateArrayLiteralExpression(node, visitNodes(node.elements, visitExpression));
            }
        }

        function cacheObjectLiteralElement(node: ObjectLiteralElement): ObjectLiteralElement {
            switch (node.kind) {
                case SyntaxKind.PropertyAssignment:
                    return cachePropertyAssignment(<PropertyAssignment>node);
                case SyntaxKind.ShorthandPropertyAssignment:
                    return cacheShorthandPropertyAssignment(<ShorthandPropertyAssignment>node);
                default:
                    return node;
            }
        }

        function cachePropertyAssignment(node: PropertyAssignment): ObjectLiteralElement {
            return factory.updatePropertyAssignment(node, node.name, cacheExpression(node.initializer));
        }

        function cacheShorthandPropertyAssignment(node: ShorthandPropertyAssignment): ObjectLiteralElement {
            return factory.createPropertyAssignment(factory.createIdentifier(node.name.text), cacheExpression(node.name));
        }

        function visitObjectLiteralExpression(node: ObjectLiteralExpression): LeftHandSideExpression {
            if (isDownlevel && hasAwaitOrYield(node)) {
                return factory.updateObjectLiteralExpression(node, visitNodes(node.properties, visitObjectLiteralElement, cacheObjectLiteralElement));
            } else {
                return factory.updateObjectLiteralExpression(node, visitNodes(node.properties, visitObjectLiteralElement));
            }
        }

        function visitPropertyAccessExpression(node: PropertyAccessExpression): LeftHandSideExpression {
            return factory.updatePropertyAccessExpression(node, visitLeftHandSideExpression(node.expression), node.name);
        }

        function visitElementAccessExpression(node: ElementAccessExpression): LeftHandSideExpression {
            if (isDownlevel && hasAwaitOrYield(node.argumentExpression)) {
                var object = cacheExpression(visitExpression(node.expression));
                return factory.updateElementAccessExpression(node, object, visitExpression(node.argumentExpression));
            } else {
                return factory.updateElementAccessExpression(node, visitLeftHandSideExpression(node.expression), visitExpression(node.argumentExpression));
            }
        }

        function visitCallExpression(node: CallExpression): LeftHandSideExpression {
            if (isDownlevel && hasAwaitOrYield(node)) {
                var result = rewriteLeftHandSideOfCallExpression(node.expression);
                var arguments = visitNodes(node.arguments, visitExpression, cacheExpression);
                var target = result.target;
                var thisArg = result.thisArg;
                if (thisArg) {
                    var callArguments: NodeArray<Expression> = factory.createNodeArray([<Expression>thisArg].concat(arguments), node.arguments);
                    var callProperty = factory.createPropertyAccessExpression(target, factory.createIdentifier("call"));
                    var callExpression = factory.createCallExpression(callProperty, callArguments, node);
                    return callExpression;
                } else {
                    var callExpression = factory.createCallExpression(target, arguments, node);
                    return callExpression;
                }
            } else {
                return factory.updateCallExpression(node, visitLeftHandSideExpression(node.expression), visitNodes(node.arguments, visitExpression));
            }
        }

        function visitNewExpression(node: NewExpression): LeftHandSideExpression {
            if (isDownlevel && hasAwaitOrYield(node)) {
                return factory.updateNewExpression(node, cacheExpression(visitExpression(node.expression)), visitNodes(node.arguments, visitExpression, cacheExpression));
            } else {
                return factory.updateNewExpression(node, visitLeftHandSideExpression(node.expression), visitNodes(node.arguments, visitExpression));
            }
        }

        function visitTaggedTemplateExpression(node: TaggedTemplateExpression): LeftHandSideExpression {
            if (isDownlevel && hasAwaitOrYield(node.template)) {
                return factory.updateTaggedTemplateExpression(node, cacheExpression(visitLeftHandSideExpression(node.tag)), visitTemplateLiteralOrTemplateExpression(node.template));
            } else {
                return factory.updateTaggedTemplateExpression(node, visitLeftHandSideExpression(node.tag), visitTemplateLiteralOrTemplateExpression(node.template));
            }
        }

        function visitTemplateExpression(node: TemplateExpression): TemplateExpression {
            if (!node) {
                return node;
            }

            if (isDownlevel && hasAwaitOrYield(node)) {
                return factory.updateTemplateExpression(node, node.head, visitNodes(node.templateSpans, visitTemplateSpan, cacheTemplateSpan));
            } else {
                return factory.updateTemplateExpression(node, node.head, visitNodes(node.templateSpans, visitTemplateSpan));
            }
        }

        function cacheTemplateSpan(node: TemplateSpan): TemplateSpan {
            return factory.updateTemplateSpan(node, cacheExpression(node.expression), node.literal);
        }

        function visitTemplateSpan(node: TemplateSpan): TemplateSpan {
            if (!node) {
                return node;
            }

            return factory.updateTemplateSpan(node, visitExpression(node.expression), node.literal);
        }
        
        // statements
        function visitStatement(node: Statement): Statement {
            if (!node) {
                return node;
            }

            switch (node.kind) {
                case SyntaxKind.FunctionDeclaration:
                    return visitFunctionDeclaration(<FunctionDeclaration>node);

                case SyntaxKind.VariableStatement:
                    return visitVariableStatement(<VariableStatement>node);

                case SyntaxKind.ExpressionStatement:
                    return visitExpressionStatement(<ExpressionStatement>node);

                case SyntaxKind.IfStatement:
                    return visitIfStatement(<IfStatement>node);

                case SyntaxKind.DoStatement:
                    return visitDoStatement(<DoStatement>node);

                case SyntaxKind.WhileStatement:
                    return visitWhileStatement(<WhileStatement>node);

                case SyntaxKind.ForStatement:
                    return visitForStatement(<ForStatement>node);

                case SyntaxKind.ForInStatement:
                    return visitForInStatement(<ForInStatement>node);

                case SyntaxKind.BreakStatement:
                    return visitBreakStatement(<BreakOrContinueStatement>node);

                case SyntaxKind.ContinueStatement:
                    return visitContinueStatement(<BreakOrContinueStatement>node);

                case SyntaxKind.ReturnStatement:
                    return visitReturnStatement(<ReturnStatement>node);

                case SyntaxKind.WithStatement:
                    Debug.fail("WithStatement is not allowed in an async or generator function.");
                    break;

                case SyntaxKind.SwitchStatement:
                    return visitSwitchStatement(<SwitchStatement>node);

                case SyntaxKind.LabeledStatement:
                    return visitLabeledStatement(<LabeledStatement>node);

                case SyntaxKind.ThrowStatement:
                    return visitThrowStatement(<ThrowStatement>node);

                case SyntaxKind.TryStatement:
                    return visitTryStatement(<TryStatement>node);

                case SyntaxKind.Block:
                    return visitBlock(<Block>node);

                default:
                    reportUnexpectedNode(node);
                    return node;
            }
        }

        function visitVariableDeclarationsOrInitializer(declarations: NodeArray<VariableDeclaration>, initializer: Expression, node: Node) {
            var variable = initializer;
            if (isDownlevel) {
                if (declarations) {
                    var assignments: BinaryExpression;
                    for (var i = 0; i < declarations.length; i++) {
                        var declaration = declarations[i];
                        var generated = rewriteVariableDeclaration(declaration);
                        if (generated) {
                            if (assignments) {
                                assignments = factory.createBinaryExpression(SyntaxKind.CommaToken, assignments, generated);
                            }
                            else {
                                assignments = generated;
                            }
                        }
                        if (node.kind === SyntaxKind.ForInStatement && !variable) {
                            Debug.assert(declaration.name.kind === SyntaxKind.Identifier, "destructuring not yet supported here.");
                            variable = factory.createIdentifier((<Identifier>declaration.name).text, declaration.name);
                        }
                    }

                    initializer = undefined;
                    declarations = undefined;

                    if (assignments) {
                        if (node.kind === SyntaxKind.ForInStatement) {
                            builder.emit(OpCode.Statement, factory.createExpressionStatement(assignments));
                        } else {
                            initializer = assignments;
                        }
                    }
                } else if (initializer) {
                    initializer = visitExpression(initializer);
                    variable = initializer;
                    while (variable.kind === SyntaxKind.BinaryExpression) {
                        variable = (<BinaryExpression>variable).left;
                    }
                }
            }

            return { declarations, initializer, variable };
        }

        function visitVariableStatement(node: VariableStatement): Statement {
            if (isDownlevel) {
                var assignment = visitVariableDeclarationsOrInitializer(node.declarations, /*initializer*/ undefined, node).initializer;
                if (assignment) {
                    return factory.createExpressionStatement(assignment, node);
                }
            } else {
                return factory.updateVariableStatement(node, visitNodes(node.declarations, visitVariableDeclaration));
            }
        }

        function visitVariableDeclaration(node: VariableDeclaration): VariableDeclaration {
            Debug.assert(!!isDownlevel, "downlevel rewrite shouldn't call visitVariableDeclaration");
            return factory.updateVariableDeclaration(node, node.name, visitExpression(node.initializer));
        }

        function visitFunctionDeclaration(node: FunctionDeclaration): FunctionDeclaration {
            if (isDownlevel) {
                builder.addFunction(node);
                return;
            } else {
                return node;
            }
        }

        function visitExpressionStatement(node: ExpressionStatement): Statement {
            if (isDownlevel && isAwaitOrYield(node.expression)) {
                visitExpression(node.expression);
                return;
            }

            return factory.updateExpressionStatement(node, visitExpression(node.expression));
        }

        function visitIfStatement(node: IfStatement): Statement {
            if (isDownlevel && (hasAwaitOrYield(node.thenStatement) || hasAwaitOrYield(node.elseStatement))) {
                rewriteIfStatement(node);
                return;
            } else {
                return factory.updateIfStatement(node, visitExpression(node.expression), visitStatement(node.thenStatement), visitStatement(node.elseStatement));
            }
        }

        function visitDoStatement(node: DoStatement): Statement {
            if (isDownlevel && hasAwaitOrYield(node)) {
                rewriteDoStatement(node);
                return;
            } else {
                if (isDownlevel) builder.beginScriptContinueBlock(getTarget(node));
                node = factory.updateDoStatement(node, visitStatement(node.statement), visitExpression(node.expression));
                if (isDownlevel) builder.endScriptContinueBlock();
                return node;
            }
        }

        function visitWhileStatement(node: WhileStatement): WhileStatement {
            if (isDownlevel && hasAwaitOrYield(node)) {
                rewriteWhileStatement(node);
                return;
            } else {
                if (isDownlevel) builder.beginScriptContinueBlock(getTarget(node));
                node = factory.updateWhileStatement(node, visitExpression(node.expression), visitStatement(node.statement));
                if (isDownlevel) builder.endScriptContinueBlock();
                return node;
            }
        }

        function visitForStatement(node: ForStatement): ForStatement {
            if (isDownlevel && (hasAwaitOrYield(node.condition) || hasAwaitOrYield(node.iterator) || hasAwaitOrYield(node.statement))) {
                rewriteForStatement(node);
                return;
            } else {
                if (isDownlevel) builder.beginScriptContinueBlock(getTarget(node));
                var head = visitVariableDeclarationsOrInitializer(node.declarations, node.initializer, node);
                node = factory.updateForStatement(node, head.declarations, head.initializer, visitExpression(node.condition), visitExpression(node.iterator), visitStatement(node.statement));
                if (isDownlevel) builder.endScriptContinueBlock();
                return node;
            }
        }

        function visitForInStatement(node: ForInStatement): ForInStatement {
            if (isDownlevel && hasAwaitOrYield(node.statement)) {
                rewriteForInStatement(node);
                return;
            } else {
                if (isDownlevel) builder.beginScriptContinueBlock(getTarget(node));
                var head = visitVariableDeclarationsOrInitializer(node.declarations, node.variable, node);
                node = factory.updateForInStatement(node, head.declarations, head.variable, visitExpression(node.expression), visitStatement(node.statement));
                if (isDownlevel) builder.endScriptContinueBlock();
                return node;
            }
        }

        function visitBreakStatement(node: BreakOrContinueStatement): Statement {
            if (isDownlevel) {
                var label = builder.findBreakTarget(getTarget(node));
                if (label > 0) {
                    builder.writeLocation(node);
                    return builder.createInlineBreak(label);
                }
            }

            return node;
        }

        function visitContinueStatement(node: BreakOrContinueStatement): Statement {
            if (isDownlevel) {
                var label = builder.findContinueTarget(getTarget(node));
                if (label > 0) {
                    builder.writeLocation(node);
                    return builder.createInlineBreak(label);
                }
            }

            return node;
        }

        function visitReturnStatement(node: ReturnStatement): Statement {
            if (isDownlevel) {
                var expression = visitExpression(node.expression);
                builder.writeLocation(node);
                return builder.createInlineReturn(expression);
            } else {
                return factory.updateReturnStatement(node, visitExpression(node.expression));
            }
        }

        function visitSwitchStatement(node: SwitchStatement): SwitchStatement {
            if (isDownlevel && forEach(node.clauses, hasAwaitOrYield)) {
                rewriteSwitchStatement(node);
                return;
            } else {
                if (isDownlevel) builder.beginScriptBreakBlock(getTarget(node));
                node = factory.updateSwitchStatement(node, visitExpression(node.expression), visitNodes(node.clauses, visitCaseOrDefaultClause));
                if (isDownlevel) builder.endScriptBreakBlock();
                return node;
            }
        }

        function visitCaseOrDefaultClause(node: CaseOrDefaultClause): CaseOrDefaultClause {
            if (!node) {
                return node;
            }

            switch (node.kind) {
                case SyntaxKind.CaseClause:
                    return visitCaseClause(<CaseClause>node);
                case SyntaxKind.DefaultClause:
                    return visitDefaultClause(<DefaultClause>node);
                default:
                    reportUnexpectedNode(node);
                    return node;
            }
        }

        function visitCaseClause(node: CaseClause): CaseClause {
            return factory.updateCaseClause(node, visitExpression(node.expression), visitNodes(node.statements, visitStatement));
        }

        function visitDefaultClause(node: DefaultClause): DefaultClause {
            return factory.updateDefaultClause(node, visitNodes(node.statements, visitStatement));
        }

        function visitLabeledStatement(node: LabeledStatement): LabeledStatement {
            if (isDownlevel && hasAwaitOrYield(node.statement)) {
                rewriteLabeledStatement(node);
                return;
            } else {
                if (isDownlevel) builder.beginScriptBreakBlock(getTarget(node));
                node = factory.updateLabeledStatement(node, node.label, visitStatement(node.statement));
                if (isDownlevel) builder.endScriptBreakBlock();
                return node;
            }
        }

        function visitThrowStatement(node: ThrowStatement): ThrowStatement {
            return factory.updateThrowStatement(node, visitExpression(node.expression));
        }

        function visitTryStatement(node: TryStatement): TryStatement {
            if (isDownlevel && hasAwaitOrYield(node)) {
                rewriteTryStatement(node);
                return;
            } else {
                return factory.updateTryStatement(node, visitTryBlock(node.tryBlock), visitCatchClause(node.catchClause), visitFinallyBlock(node.finallyBlock));
            }
        }

        function visitBlock(node: Block): Block {
            return factory.updateBlock(node, visitNodes(node.statements, visitStatement));
        }

        function visitTryBlock(node: Block): Block {
            if (!node) {
                return;
            }

            return factory.updateTryBlock(node, visitNodes(node.statements, visitStatement));
        }

        function visitCatchClause(node: CatchClause): CatchClause {
            if (!node) {
                return;
            }

            return factory.updateCatchBlock(node, node.name, visitBlock(node.block));
        }

        function visitFinallyBlock(node: Block): Block {
            if (!node) {
                return;
            }

            return factory.updateFinallyBlock(node, visitNodes(node.statements, visitStatement));
        }

        function rewriteLeftHandSideOfAssignmentExpression(node: Expression): Expression {
            switch (node.kind) {
                case SyntaxKind.ElementAccessExpression:
                    return rewriteLeftHandSideElementAccessExpressionOfAssignmentExpression(<ElementAccessExpression>node);

                case SyntaxKind.PropertyAccessExpression:
                    return rewriteLeftHandSidePropertyAccessExpressionOfAssignmentExpression(<PropertyAccessExpression>node);

                default:
                    return visitExpression(node);
            }
        }

        function rewriteLeftHandSideElementAccessExpressionOfAssignmentExpression(node: ElementAccessExpression): ElementAccessExpression {
            return factory.updateElementAccessExpression(
                node,
                cacheExpression(visitLeftHandSideExpression(node.expression)),
                cacheExpression(visitExpression(node.argumentExpression)));
        }

        function rewriteLeftHandSidePropertyAccessExpressionOfAssignmentExpression(node: PropertyAccessExpression): PropertyAccessExpression {
            return factory.updatePropertyAccessExpression(
                node,
                cacheExpression(visitLeftHandSideExpression(node.expression)),
                node.name);
        }

        function rewriteLeftHandSideOfCallExpression(node: Expression): { target: Identifier; thisArg?: Identifier; } {
            switch (node.kind) {
                case SyntaxKind.PropertyAccessExpression:
                    return rewriteLeftHandSidePropertyAccessExpressionOfCallExpression(<PropertyAccessExpression>node);

                case SyntaxKind.ElementAccessExpression:
                    return rewriteLeftHandSideElementAccessExpressionOfCallExpression(<ElementAccessExpression>node);

                default:
                    return { target: cacheExpression(visitExpression(node)) };
            }
        }

        function rewriteLeftHandSideElementAccessExpressionOfCallExpression(node: ElementAccessExpression): { target: Identifier; thisArg?: Identifier; } {
            var thisArg = cacheExpression(visitLeftHandSideExpression(node.expression));
            var target = builder.declareLocal();
            var index = visitExpression(node.argumentExpression);
            var indexedAccess = factory.createElementAccessExpression(thisArg, index, node);
            var assignExpression = factory.createBinaryExpression(SyntaxKind.EqualsToken, target, indexedAccess);
            builder.writeLocation(node);
            builder.emit(OpCode.Statement, factory.createExpressionStatement(assignExpression));
            return { target, thisArg };
        }

        function rewriteLeftHandSidePropertyAccessExpressionOfCallExpression(node: PropertyAccessExpression): { target: Identifier; thisArg?: Identifier; } {
            var thisArg = cacheExpression(visitLeftHandSideExpression(node.expression));
            var target = builder.declareLocal();
            var property = factory.createIdentifier(node.name.text);
            var propertyAccess = factory.createPropertyAccessExpression(thisArg, property, node);
            var assignExpression = factory.createBinaryExpression(SyntaxKind.EqualsToken, target, propertyAccess);
            builder.writeLocation(node);
            builder.emit(OpCode.Statement, factory.createExpressionStatement(assignExpression));
            return { target, thisArg };
        }

        function rewriteVariableDeclaration(node: VariableDeclaration): BinaryExpression {
            Debug.assert(node.name.kind === SyntaxKind.Identifier, "Destructuring not yet supported here.");
            builder.addVariable(<Identifier>node.name);
            var initializer = visitExpression(node.initializer);
            if (initializer) {
                return factory.createBinaryExpression(SyntaxKind.EqualsToken, <Identifier>node.name, initializer, node);
            }
        }

        function rewriteAwaitExpressionDownlevel(node: AwaitExpression): UnaryExpression {
            var operand = visitUnaryExpression(node.expression);
            var resumeLabel = builder.defineLabel();
            builder.writeLocation(node);
            builder.emit(OpCode.Yield, operand);
            builder.markLabel(resumeLabel);
            return builder.createResume();
        }

        function rewriteAwaitExpressionUplevel(node: AwaitExpression): UnaryExpression {
            var yieldExpression = factory.createYieldExpression(node.expression, node);
            return factory.createParenthesizedExpression(yieldExpression);
        }

        function rewriteLogicalBinaryExpression(node: BinaryExpression): Expression {
            var resumeLabel = builder.defineLabel();
            var resultLocal = builder.declareLocal();
            var code = node.operator === SyntaxKind.AmpersandAmpersandToken ? OpCode.BrFalse : OpCode.BrTrue;
            builder.writeLocation(node.left);
            builder.emit(OpCode.Assign, resultLocal, visitExpression(node.left));
            builder.emit(code, resumeLabel, resultLocal);
            builder.writeLocation(node.right);
            builder.emit(OpCode.Assign, resultLocal, visitExpression(node.right));
            builder.markLabel(resumeLabel);
            return resultLocal;
        }

        function rewriteConditionalExpression(node: ConditionalExpression): Expression {
            var whenFalseLabel = builder.defineLabel();
            var resumeLabel = builder.defineLabel();
            var resultLocal = builder.declareLocal();
            builder.emit(OpCode.BrFalse, whenFalseLabel, visitExpression(node.condition));
            builder.writeLocation(node.whenTrue);
            builder.emit(OpCode.Assign, resultLocal, visitExpression(node.whenTrue));
            builder.emit(OpCode.Break, resumeLabel);
            builder.markLabel(whenFalseLabel);
            builder.writeLocation(node.whenFalse);
            builder.emit(OpCode.Assign, resultLocal, visitExpression(node.whenFalse));
            builder.markLabel(resumeLabel);
            return resultLocal;
        }

        function rewriteYieldExpression(node: YieldExpression): Expression {
            var expression = visitExpression(node.expression);
            var resumeLabel = builder.defineLabel();
            builder.writeLocation(node);
            builder.emit(node.asteriskToken ? OpCode.YieldStar : OpCode.Yield, factory.createExpressionStatement(expression));
            builder.markLabel(resumeLabel);
            return builder.createResume();
        }

        function rewriteIfStatement(node: IfStatement): void {
            var resumeLabel = builder.defineLabel();
            if (node.elseStatement) {
                var elseLabel = builder.defineLabel();
            }
            builder.emit(OpCode.BrFalse, elseLabel || resumeLabel, visitExpression(node.expression));
            rewriteStatement(node.thenStatement);
            if (node.elseStatement) {
                builder.emit(OpCode.Break, resumeLabel);
                builder.markLabel(elseLabel);
                rewriteStatement(node.elseStatement);
            }
            builder.markLabel(resumeLabel);
        }

        function rewriteDoStatement(node: DoStatement): void {
            var bodyLabel = builder.defineLabel();
            var conditionLabel = builder.defineLabel();
            var endLabel = builder.beginContinueBlock(conditionLabel, getTarget(node));
            builder.markLabel(bodyLabel);
            rewriteStatement(node.statement);
            builder.markLabel(conditionLabel);
            builder.emit(OpCode.BrTrue, bodyLabel, visitExpression(node.expression));
            builder.endContinueBlock();
        }

        function rewriteWhileStatement(node: WhileStatement): void {
            var conditionLabel = builder.defineLabel();
            var bodyLabel = builder.defineLabel();
            var endLabel = builder.beginContinueBlock(conditionLabel, getTarget(node));
            builder.markLabel(conditionLabel);
            builder.emit(OpCode.BrFalse, endLabel, visitExpression(node.expression));
            rewriteStatement(node.statement);
            builder.emit(OpCode.Break, conditionLabel);
            builder.endContinueBlock();
        }

        function rewriteForStatement(node: ForStatement): void {
            var conditionLabel = builder.defineLabel();
            var iteratorLabel = builder.defineLabel();
            var endLabel = builder.beginContinueBlock(iteratorLabel, getTarget(node));
            var head = visitVariableDeclarationsOrInitializer(node.declarations, node.initializer, node);
            if (head.initializer) {
                builder.writeLocation(node.declarations || node.initializer);
                builder.emit(OpCode.Statement, factory.createExpressionStatement(head.initializer));
            }
            builder.markLabel(conditionLabel);
            if (node.condition) {
                builder.emit(OpCode.BrFalse, endLabel, visitExpression(node.condition));
            }
            rewriteStatement(node.statement);
            builder.markLabel(iteratorLabel);
            if (node.iterator) {
                builder.emit(OpCode.Statement, factory.createExpressionStatement(visitExpression(node.iterator)));
            }
            builder.emit(OpCode.Break, conditionLabel);
            builder.endContinueBlock();
        }

        function rewriteForInStatement(node: ForInStatement): void {
            var head = visitVariableDeclarationsOrInitializer(node.declarations, node.variable, node);
            var keysLocal = builder.declareLocal();
            var tempLocal = builder.declareLocal();
            var conditionLabel = builder.defineLabel();
            var iteratorLabel = builder.defineLabel();
            var endLabel = builder.beginContinueBlock(iteratorLabel, getTarget(node));
            var initializeKeysExpression = factory.createBinaryExpression(SyntaxKind.EqualsToken, keysLocal, factory.createArrayLiteralExpression([]));
            builder.emit(OpCode.Statement, factory.createExpressionStatement(initializeKeysExpression));
            var keysLengthExpression = factory.createPropertyAccessExpression(keysLocal, factory.createIdentifier("length"));
            var keysPushExpression = factory.createElementAccessExpression(keysLocal, keysLengthExpression);
            var assignKeyExpression = factory.createBinaryExpression(SyntaxKind.EqualsToken, keysPushExpression, tempLocal);
            var assignKeyStatement = factory.createExpressionStatement(assignKeyExpression);
            var forTempInExpressionStatement = factory.createForInStatement(/*declarations*/ undefined, tempLocal, visitExpression(node.expression), assignKeyStatement);
            builder.emit(OpCode.Statement, forTempInExpressionStatement);
            var initializeTempExpression = factory.createBinaryExpression(SyntaxKind.EqualsToken, tempLocal, factory.createNumericLiteral(0));
            builder.emit(OpCode.Statement, factory.createExpressionStatement(initializeTempExpression));
            var conditionExpression = factory.createBinaryExpression(SyntaxKind.LessThanToken, tempLocal, keysLengthExpression);
            builder.markLabel(conditionLabel);
            builder.emit(OpCode.BrFalse, endLabel, conditionExpression);
            var readKeyExpression = factory.createElementAccessExpression(keysLocal, tempLocal);
            var assignVariableExpression = factory.createBinaryExpression(SyntaxKind.EqualsToken, head.variable, readKeyExpression);
            builder.writeLocation(head.variable);
            builder.emit(OpCode.Statement, factory.createExpressionStatement(assignVariableExpression, head.variable));
            rewriteStatement(node.statement);
            builder.markLabel(iteratorLabel);
            var incrementTempExpression = factory.createPostfixUnaryExpression(SyntaxKind.PlusPlusToken, tempLocal);
            builder.writeLocation(head.variable);
            builder.emit(OpCode.Statement, factory.createExpressionStatement(incrementTempExpression, head.variable));
            builder.emit(OpCode.Break, conditionLabel);
            builder.endContinueBlock();
        }

        function rewriteSwitchStatement(node: SwitchStatement): void {
            var defaultClauseIndex: number = -1;
            var endLabel = builder.beginBreakBlock(getTarget(node));

            // map clauses to labels
            var clauseHasStatements: boolean[] = [];
            var clauseLabelMap: number[] = [];
            var clauseLabels: Label[] = [endLabel];
            for (var clauseIndex = node.clauses.length - 1; clauseIndex >= 0; clauseIndex--) {
                var clause = node.clauses[clauseIndex];
                if (clause.kind === SyntaxKind.DefaultClause) {
                    if (defaultClauseIndex === -1) {
                        defaultClauseIndex = clauseIndex;
                    }
                }
                clauseHasStatements[clauseIndex] = !!(clause.statements && clause.statements.length);
                if (clauseHasStatements[clauseIndex]) {
                    clauseLabelMap[clauseIndex] = clauseLabels.length;
                    clauseLabels.push(builder.defineLabel());
                } else {
                    clauseLabelMap[clauseIndex] = clauseLabels.length - 1;
                }
            }

            var expression = cacheExpression(visitExpression(node.expression));

            // emit switch cases (but not statements)                
            var lastClauseOffset = 0;
            for (var clauseIndex = 0; clauseIndex < node.clauses.length; clauseIndex++) {
                var clause = node.clauses[clauseIndex];
                if (clause.kind === SyntaxKind.CaseClause) {
                    var caseClause = <CaseClause>clause;
                    if (hasAwaitOrYield(caseClause.expression)) {
                        emitPartialSwitchStatement();
                        lastClauseOffset = clauseIndex;
                    }
                }
            }

            emitPartialSwitchStatement();

            // emit default case (if any, but not statements)
            if (defaultClauseIndex > -1) {
                var defaultClauseLabel = clauseLabels[clauseLabelMap[defaultClauseIndex]];
                builder.writeLocation(node.clauses[defaultClauseIndex]);
                builder.emit(OpCode.Break, defaultClauseLabel);
            } else {
                builder.emit(OpCode.Break, endLabel);
            }

            // emit switch states and statements
            for (var clauseIndex = 0; clauseIndex < node.clauses.length; clauseIndex++) {
                if (!clauseHasStatements[clauseIndex]) {
                    continue;
                }
                var clause = node.clauses[clauseIndex];
                var clauseLabel = clauseLabels[clauseLabelMap[clauseIndex]];
                builder.markLabel(clauseLabel);
                rewriteStatements(clause.statements);
            }

            builder.endBreakBlock();

            function emitPartialSwitchStatement(): void {
                var clauses: CaseOrDefaultClause[] = [];
                if (lastClauseOffset < node.clauses.length) {
                    var clause = node.clauses[lastClauseOffset];
                    if (clause.kind === SyntaxKind.CaseClause) {
                        var caseClause = <CaseClause>clause;
                        if (hasAwaitOrYield(caseClause.expression)) {
                            var clauseExpression = visitExpression(caseClause.expression);
                            var clauseLabel = clauseLabels[clauseLabelMap[lastClauseOffset]];
                            builder.writeLocation(caseClause.expression);
                            var breakStatement = builder.createInlineBreak(clauseLabel);
                            clauses.push(factory.createCaseClause(clauseExpression, [breakStatement]));
                            lastClauseOffset++;
                        }
                    }
                }

                while (lastClauseOffset < clauseIndex) {
                    var clause = node.clauses[lastClauseOffset];
                    var clauseLabel = clauseLabels[clauseLabelMap[lastClauseOffset]];
                    if (clause.kind === SyntaxKind.CaseClause) {
                        var caseClause = <CaseClause>clause;
                        builder.writeLocation(caseClause.expression);
                        var inlineBreak = builder.createInlineBreak(clauseLabel);
                        clauses.push(factory.createCaseClause(visitExpression(caseClause.expression), [inlineBreak]));
                    }
                    lastClauseOffset++;
                }

                if (clauses.length) {
                    var switchStatement = factory.createSwitchStatement(expression, clauses, node);
                    builder.emit(OpCode.Statement, switchStatement);
                }
            }
        }

        function rewriteLabeledStatement(node: LabeledStatement): void {
            var statementSupportsBreak = isLabeledOrIterationOrSwitchStatement(node.statement);
            if (statementSupportsBreak) {
                builder.beginBreakBlock(getTarget(node));
            }
            rewriteStatement(node.statement);
            if (statementSupportsBreak) {
                builder.endBreakBlock();
            }
        }

        function rewriteTryStatement(node: TryStatement): void {
            var endLabel = builder.beginExceptionBlock();
            rewriteBlock(node.tryBlock);
            if (node.catchClause) {
                var variable = builder.declareLocal(node.catchClause.name.text);
                resolver.renameSymbol(node.catchClause.symbol, variable.text);
                builder.beginCatchBlock(variable);
                rewriteBlock(node.catchClause.block);
            }
            if (node.finallyBlock) {
                builder.beginFinallyBlock();
                rewriteBlock(node.finallyBlock);
            }
            builder.endExceptionBlock();
        }

        function rewriteReturnStatement(node: ReturnStatement): void {
            var expression = visitExpression(node.expression);
            builder.writeLocation(node);
            builder.emit(OpCode.Return, expression);
        }

        function rewriteThrowStatement(node: ThrowStatement): void {
            var expression = visitExpression(node.expression);
            builder.writeLocation(node);
            builder.emit(OpCode.Throw, expression);
        }

        function rewriteBreakStatement(node: BreakOrContinueStatement): void {
            var label = builder.findBreakTarget(getTarget(node));
            Debug.assert(label > 0, "Expected break statement to point to a label.");
            builder.writeLocation(node);
            builder.emit(OpCode.Break, label);
        }

        function rewriteContinueStatement(node: BreakOrContinueStatement): void {
            var label = builder.findContinueTarget(getTarget(node));
            Debug.assert(label > 0, "Expected continue statement to point to a label.");
            builder.writeLocation(node);
            builder.emit(OpCode.Break, label);
        }

        function isAwaitOrYield(node: Node): boolean {
            return node && (node.kind === SyntaxKind.AwaitExpression || node.kind === SyntaxKind.YieldExpression);
        }

        function hasAwaitOrYield(node: Node): boolean {
            if (!node) {
                return false;
            }

            return (resolver.getNodeCheckFlags(node) & NodeCheckFlags.HasAwaitOrYield) !== 0;
        }

        function isLabeledOrIterationOrSwitchStatement(node: Node): boolean {
            switch (node.kind) {
                case SyntaxKind.DoStatement:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.SwitchStatement:
                case SyntaxKind.LabeledStatement:
                    return true;
            }
            return false;
        }

        function isLogicalBinary(node: BinaryExpression): boolean {
            switch (node.operator) {
                case SyntaxKind.AmpersandAmpersandToken:
                case SyntaxKind.BarBarToken:
                    return true;
            }

            return false;
        }

        function isAssignment(node: BinaryExpression): boolean {
            switch (node.operator) {
                case SyntaxKind.EqualsToken:
                case SyntaxKind.PlusEqualsToken:
                case SyntaxKind.MinusEqualsToken:
                case SyntaxKind.AsteriskEqualsToken:
                case SyntaxKind.SlashEqualsToken:
                case SyntaxKind.PercentEqualsToken:
                case SyntaxKind.LessThanLessThanEqualsToken:
                case SyntaxKind.GreaterThanGreaterThanEqualsToken:
                case SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
                case SyntaxKind.AmpersandEqualsToken:
                case SyntaxKind.BarEqualsToken:
                case SyntaxKind.CaretEqualsToken:
                    return true;
            }

            return false;
        }

        function isAnyBlockOrClause(node: Node): boolean {
            switch (node.kind) {
                case SyntaxKind.Block:
                case SyntaxKind.TryBlock:
                case SyntaxKind.CatchClause:
                case SyntaxKind.FinallyBlock:
                case SyntaxKind.CaseClause:
                case SyntaxKind.DefaultClause:
                    return true;

                default:
                    return false;
            }
        }

        function getTarget(node: Node): string {
            var label: Identifier;
            switch (node.kind) {
                case SyntaxKind.LabeledStatement:
                    label = (<LabeledStatement>node).label;
                    break;

                case SyntaxKind.BreakStatement:
                case SyntaxKind.ContinueStatement:
                    label = (<BreakOrContinueStatement>node).label;
                    break;

                case SyntaxKind.DoStatement:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                    if (node.parent.kind === SyntaxKind.LabeledStatement) {
                        label = (<LabeledStatement>node.parent).label;
                    }
                    break;
            }

            if (label) {
                return label.text;
            }
        }

        function reportUnexpectedNode(node: Node): void {
            var nodeKind: string;
            if (typeof (<any>ts).SyntaxKind === "object") {
                nodeKind = (<any>ts).SyntaxKind[node.kind];
            }
            else {
                nodeKind = String(node.kind);
            }

            Debug.fail("Unexpected node: " + nodeKind);
        }

        function emitStatement(node: Statement): void {
            builder.writeLocation(node);
            builder.emit(OpCode.Statement, node);
        }

        function rewriteStatements(statements: Statement[]): void {
            for (var i = 0; i < statements.length; i++) {
                var statement = statements[i];
                rewriteStatement(statement);
            }
        }

        function rewriteBlock(node: Block): void {
            if (!node) {
                return;
            }
            rewriteStatements(node.statements);
        }

        function rewriteStatement(node: Statement): void {
            if (!node) {
                return;
            }
            switch (node.kind) {
                case SyntaxKind.Block:
                    if (!hasAwaitOrYield(node)) {
                        break;
                    }
                    return rewriteBlock(<Block>node);
                case SyntaxKind.ThrowStatement:
                    return rewriteThrowStatement(<ThrowStatement>node);
                case SyntaxKind.ReturnStatement:
                    return rewriteReturnStatement(<ReturnStatement>node);
                case SyntaxKind.BreakStatement:
                    return rewriteBreakStatement(<BreakOrContinueStatement>node);
                case SyntaxKind.ContinueStatement:
                    return rewriteContinueStatement(<BreakOrContinueStatement>node);
            }

            emitStatement(visitStatement(node));
        }
        
        function rewriteAsyncAsGeneratorWorker(): FunctionLikeDeclaration {
            var promiseConstructor = resolver.getPromiseConstructor(node);
            if (node.body.kind === SyntaxKind.Block) {
                var block = <Block>node.body;
                var statements = factory.createNodeArray(map(block.statements, visitStatement), block.statements);
            } else {
                var expression = visitExpression(<Expression>node.body);
                var returnStatement = factory.createReturnStatement(expression, node.body);
                var statements = factory.createNodeArray<Statement>([returnStatement]);
            }

            var resolve = locals.createUniqueIdentifier("_resolve");
            var generatorFunctionBody = factory.createBlock(statements);
            var generatorFunction = factory.createFunctionExpression(/*name*/ undefined, generatorFunctionBody, []);
            var callGeneratorFunction = factory.createCallExpression(generatorFunction, []);
            var awaiterCallExpression = factory.createCallExpression(factory.createIdentifier("__awaiter"), [callGeneratorFunction]);
            var resolveCallExpression = factory.createCallExpression(resolve, [awaiterCallExpression]);
            var resolveCallStatement = factory.createExpressionStatement(resolveCallExpression);
            var initFunctionBody = factory.createBlock([resolveCallStatement]);
            var initFunctionExpression = factory.createFunctionExpression(/*name*/ undefined, initFunctionBody, [factory.createParameterDeclaration(resolve)]);
            var newPromiseExpression = factory.createNewExpression(factory.getExpressionForEntityName(promiseConstructor), [initFunctionExpression]);
            var returnStatement = factory.createReturnStatement(newPromiseExpression);
            var block = factory.createBlock([returnStatement], statements);
            var func = factory.updateFunctionLikeDeclaration(node, node.name, block, node.parameters);
            func.id = node.id;
            func.parent = node.parent;
            return func;
        }

        function rewriteDownlevelWorker(): FunctionLikeDeclaration {
            if (node.flags & NodeFlags.Async) {
                var promiseConstructor = resolver.getPromiseConstructor(node);
                builder = createCodeGenerator(locals, resolver, { promiseConstructor });
            }
            else {
                builder = createCodeGenerator(locals, resolver);
            }

            builder.markLabel(builder.defineLabel());
            if (node.parameters) {
                for (var i = 0; i < node.parameters.length; i++) {
                    var parameter = node.parameters[i];
                    Debug.assert(parameter.name.kind === SyntaxKind.Identifier, "Destructuring is not yet supported here");
                    builder.writeLocation(parameter);
                    builder.addParameter(<Identifier>parameter.name, parameter.flags);
                    if (parameter.initializer) {
                        builder.emit(OpCode.Assign, factory.createIdentifier((<Identifier>parameter.name).text), visitExpression(parameter.initializer));
                    }
                }
            }

            if (node.body.kind === SyntaxKind.Block) {
                rewriteBlock(<Block>node.body);
            } else {
                builder.emit(OpCode.Return, visitExpression(<Expression>node.body));
            }

            var func = builder.buildFunction(node.kind, node.name, node, node.flags, node.modifiers);
            func.id = node.id;
            func.parent = node.parent;
            return func;
        }

        function rewriteWorker(): FunctionLikeDeclaration {
            if (isDownlevel) {
                return rewriteDownlevelWorker();
            } else {
                return rewriteAsyncAsGeneratorWorker();
            }
        }
    }
}