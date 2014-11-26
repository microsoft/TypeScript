/// <reference path="types.ts"/>
/// <reference path="core.ts"/>
/// <reference path="scanner.ts"/>
/// <reference path="parser.ts"/>
/// <reference path="factory.ts"/>
/// <reference path="generator.ts"/>
module ts {
    // TODO: do we need to capture/rename `arguments` or disallow `arguments` in async/generator?
    var awaitOrYieldNodes: boolean[] = [];
    var nextNodeId = -1;

    function getPromiseConstructor(node: FunctionLikeDeclaration): EntityName {
        var typeName: EntityName;
        if (node.type.kind === SyntaxKind.TypeReference) {
            var typeReference = <TypeReferenceNode>node.type;
            typeName = typeReference.typeName;
        }
        else if (node.type.kind === SyntaxKind.TypeQuery) {
            var typeQuery = <TypeQueryNode>node.type;
            typeName = typeQuery.exprName;
        }

        return typeName;
    }

    /** rewrites an async or generator function or method declaration */
    export function rewriteFunction(node: FunctionLikeDeclaration, compilerOptions: CompilerOptions): FunctionLikeDeclaration {
        var builder: CodeGenerator;
        var renames: Map<Identifier>;
        var isDownlevel = compilerOptions.target <= ScriptTarget.ES5;
        var isAsync = (node.flags & NodeFlags.Async) !== 0;
        var isGenerator = !!node.asteriskToken;
        var isDownlevelGenerator = isDownlevel && isGenerator;
        var isDownlevelAsync = isDownlevel && isAsync;
        var isUplevelAsync = !isDownlevel && isAsync;

        if (!isAsync && !isDownlevelGenerator) {
            return node;
        }

        return rewriteWorker();

        function visit<TNode extends Node>(node: TNode, emitNode?: (node: Node) => void): TNode;
        function visit(node: Node, emitNode?: (node: Node) => void): Node;
        function visit(node: Node, emitNode?: (node: Node) => void): Node {
            if (!node) {
                return node;
            }

            if (isDownlevel) {
                builder.pushLocation(node);
            }

            try {
                switch (node.kind) {
                    case SyntaxKind.VariableDeclaration:
                        node = visitVariableDeclaration(<VariableDeclaration>node);
                        break;

                    case SyntaxKind.FunctionDeclaration:
                        node = visitFunctionDeclaration(<FunctionDeclaration>node);
                        break;

                    case SyntaxKind.PropertyAssignment:
                        node = visitPropertyAssignment(<PropertyDeclaration>node);
                        break;

                    case SyntaxKind.PrefixOperator:
                        node = visitPrefixOperator(<UnaryExpression>node);
                        break;

                    case SyntaxKind.PostfixOperator:
                        node = visitPostfixOperator(<UnaryExpression>node);
                        break;

                    case SyntaxKind.BinaryExpression:
                        node = visitBinaryExpression(<BinaryExpression>node);
                        break;

                    case SyntaxKind.ConditionalExpression:
                        node = visitConditionalExpression(<ConditionalExpression>node);
                        break;

                    case SyntaxKind.ParenExpression:
                        node = visitParenExpression(<ParenExpression>node);
                        break;

                    case SyntaxKind.ArrayLiteral:
                        node = visitArrayLiteral(<ArrayLiteral>node);
                        break;

                    case SyntaxKind.ObjectLiteral:
                        node = visitObjectLiteral(<ObjectLiteral>node);
                        break;

                    case SyntaxKind.PropertyAccess:
                        node = visitPropertyAccess(<PropertyAccess>node);
                        break;

                    case SyntaxKind.IndexedAccess:
                        node = visitIndexedAccess(<IndexedAccess>node);
                        break;

                    case SyntaxKind.CallExpression:
                        node = visitCallExpression(<CallExpression>node);
                        break;

                    case SyntaxKind.NewExpression:
                        node = visitNewExpression(<NewExpression>node);
                        break;

                    case SyntaxKind.YieldExpression:
                        if (!isDownlevelGenerator) {
                            Debug.fail("YieldExpression is not allowed in an async function");
                        } else {
                            node = visitYieldExpression(<YieldExpression>node);
                        }
                        break;

                    case SyntaxKind.VariableStatement:
                        node = visitVariableStatement(<VariableStatement>node);
                        break;

                    case SyntaxKind.ExpressionStatement:
                        node = visitExpressionStatement(<ExpressionStatement>node);
                        break;

                    case SyntaxKind.TypeAssertion:
                        node = visitTypeAssertion(<TypeAssertion>node);
                        break;

                    case SyntaxKind.TaggedTemplateExpression:
                        node = visitTaggedTemplateExpression(<TaggedTemplateExpression>node);
                        break;

                    case SyntaxKind.TemplateExpression:
                        node = visitTemplateExpression(<TemplateExpression>node);
                        break;

                    case SyntaxKind.TemplateSpan:
                        node = visitTemplateSpan(<TemplateSpan>node);
                        break;

                    case SyntaxKind.IfStatement:
                        node = visitIfStatement(<IfStatement>node);
                        break;

                    case SyntaxKind.DoStatement:
                        node = visitDoStatement(<DoStatement>node);
                        break;

                    case SyntaxKind.WhileStatement:
                        node = visitWhileStatement(<WhileStatement>node);
                        break;

                    case SyntaxKind.ForStatement:
                        node = visitForStatement(<ForStatement>node);
                        break;

                    case SyntaxKind.ForInStatement:
                        node = visitForInStatement(<ForInStatement>node);
                        break;

                    case SyntaxKind.BreakStatement:
                        return visitBreakStatement(<BreakOrContinueStatement>node, !!emitNode);
                        break;

                    case SyntaxKind.ContinueStatement:
                        return visitContinueStatement(<BreakOrContinueStatement>node, !!emitNode);
                        break;

                    case SyntaxKind.ReturnStatement:
                        return visitReturnStatement(<ReturnStatement>node, !!emitNode);

                    case SyntaxKind.WithStatement:
                        if (isAsync) {
                            Debug.fail("WithStatement is not allowed in an async function");
                        } else if (isGenerator) {
                            Debug.fail("WithStatement is not allowed in a generator function");
                        }
                        break;

                    case SyntaxKind.SwitchStatement:
                        node = visitSwitchStatement(<SwitchStatement>node);
                        break;

                    case SyntaxKind.CaseClause:
                        return visitCaseClause(<CaseOrDefaultClause>node, emitNode);

                    case SyntaxKind.DefaultClause:
                        return visitDefaultClause(<CaseOrDefaultClause>node, emitNode);

                    case SyntaxKind.LabeledStatement:
                        node = visitLabeledStatement(<LabeledStatement>node);
                        break;

                    case SyntaxKind.ThrowStatement:
                        return visitThrowStatement(<ThrowStatement>node, !!emitNode);

                    case SyntaxKind.TryStatement:
                        node = visitTryStatement(<TryStatement>node);
                        break;

                    case SyntaxKind.Block:
                        return visitBlock(<Block>node, emitNode);

                    case SyntaxKind.FunctionBlock:
                        return visitFunctionBlock(<Block>node, emitNode);

                    case SyntaxKind.TryBlock:
                        return visitTryBlock(<Block>node, emitNode);

                    case SyntaxKind.CatchBlock:
                        return visitCatchBlock(<CatchBlock>node, emitNode);

                    case SyntaxKind.FinallyBlock:
                        return visitFinallyBlock(<Block>node, emitNode);

                    case SyntaxKind.Identifier:
                        node = visitIdentifier(<Identifier>node);
                        break;
                }

                if (node && emitNode) {
                    emitNode(node);
                }

            } finally {
                if (isDownlevel) {
                    builder.popLocation();
                }
            }

            return node;
        }

        function visitNodes<TNode extends Node>(nodes: NodeArray<TNode>, emitNode?: (node: Node) => void): NodeArray<TNode> {
            if (!nodes) {
                return nodes;
            }

            var updatedNodes: NodeArray<TNode>;
            var offset: number = 0;
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                var updatedNode = visit(node, emitNode);
                if (updatedNodes) {
                    if (updatedNode) {
                        updatedNodes[i + offset] = <TNode>updatedNode;
                    } else {
                        offset--;
                    }
                }
                else if (updatedNode !== node) {
                    updatedNodes = <NodeArray<TNode>>nodes.slice(0, i);
                    if (updatedNode) {
                        updatedNodes[i + offset] = <TNode>updatedNode;
                        updatedNodes.pos = nodes.pos;
                        updatedNodes.end = nodes.end;
                    } else {
                        offset--;
                    }
                }
            }


            return updatedNodes || nodes;
        }

        function visitList<TNode extends Node>(elements: NodeArray<TNode>, copy: (node: TNode) => TNode): TNode[] {
            var result: TNode[];
            var lastRewrittenElement = -1;

            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                if (hasAwaitOrYield(element)) {
                    if (!result) {
                        result = [];
                    }

                    if (lastRewrittenElement > -1) {
                        result[lastRewrittenElement] = copy(result[lastRewrittenElement]);
                    }

                    for (var j = lastRewrittenElement + 1; j < i; j++) {
                        result[j] = copy(visit(elements[j]));
                    }

                    result[i] = visit(element);
                    lastRewrittenElement = i;
                }
            }

            if (lastRewrittenElement > -1) {
                if (lastRewrittenElement < elements.length) {
                    for (var i = lastRewrittenElement + 1; i < elements.length; i++) {
                        result[i] = visit(elements[i]);
                    }
                }

                return result;
            } else {
                return visitNodes(elements);
            }
        }

        // declarations

        function visitVariableDeclaration(node: VariableDeclaration): Node {
            if (isDownlevel) {
                return rewriteVariableDeclaration(node);
            } else {
                return factory.updateVariableDeclaration(node, node.name, visit(node.initializer));
            }
        }

        function visitFunctionDeclaration(node: FunctionDeclaration): Node {
            if (isDownlevel) {
                builder.addFunction(node);
                return;
            } else {
                return node;
            }
        }

        function visitPropertyAssignment(node: PropertyDeclaration): Node {
            return factory.updatePropertyAssignment(node, node.name, visit(node.initializer));
        }

        // expressions

        function visitIdentifier(node: Identifier): Identifier {
            if (isDownlevel) {
                // TODO: may need to support renaming an identifier in the emitter, if the renamed identifier is captured by a closure.
                return getRenamedIdentifier(node);
            } else {
                return node;
            }
        }

        function visitPrefixOperator(node: UnaryExpression): Node {
            if (isAsync && node.operator === SyntaxKind.AwaitKeyword) {
                if (isDownlevel) {
                    return rewriteAwaitExpressionDownlevel(node);
                } else {
                    return rewriteAwaitExpressionUplevel(node);
                }
            } else {
                return factory.updatePrefixOperator(node, visit(node.operand));
            }
        }

        function visitPostfixOperator(node: UnaryExpression): Node {
            return factory.updatePostfixOperator(node, visit(node.operand));
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

        function visitBinaryExpression(node: BinaryExpression): Node {
            if (isDownlevel && hasAwaitOrYield(node.right)) {
                if (isLogicalBinary(node)) {
                    return rewriteLogicalBinaryExpression(node);
                } else if (isAssignment(node)) {
                    return factory.updateBinaryExpression(node, visitAndCacheLeftHandOfAssignment(node.left), visit(node.right));
                } else {
                    return factory.updateBinaryExpression(node, builder.cacheExpression(visit(node.left)), visit(node.right));
                }
            } else {
                return factory.updateBinaryExpression(node, visit(node.left), visit(node.right));
            }
        }

        function visitAndCacheLeftHandOfAssignment(node: Node): Node {
            switch (node.kind) {
                case SyntaxKind.IndexedAccess:
                    return visitAndCacheIndexedAccess(<IndexedAccess>node);

                case SyntaxKind.PropertyAccess:
                    return visitAndCachePropertyAccess(<PropertyAccess>node);

                default:
                    return builder.cacheExpression(visit(node));
            }
        }

        function visitAndCacheIndexedAccess(node: IndexedAccess): Node {
            return factory.updateIndexedAccess(
                node,
                builder.cacheExpression(visit(node.object)),
                builder.cacheExpression(visit(node.index)));
        }

        function visitAndCachePropertyAccess(node: PropertyAccess): Node {
            return factory.updatePropertyAccess(
                node,
                builder.cacheExpression(visit(node.left)),
                node.right);
        }

        function visitConditionalExpression(node: ConditionalExpression): Node {
            if (isDownlevel && (hasAwaitOrYield(node.whenTrue) || hasAwaitOrYield(node.whenFalse))) {
                return rewriteConditionalExpression(node);
            } else {
                return factory.updateConditionalExpression(node, visit(node.condition), visit(node.whenTrue), visit(node.whenFalse));
            }
        }

        function visitParenExpression(node: ParenExpression): Node {
            return factory.updateParenExpression(node, visit(node.expression));
        }

        function visitArrayLiteral(node: ArrayLiteral): Node {
            if (isDownlevel && hasAwaitOrYield(node)) {
                return factory.updateArrayLiteral(node, visitList(node.elements, builder.cacheExpression));
            } else {
                return factory.updateArrayLiteral(node, visitNodes(node.elements));
            }
        }

        function copyProperty(node: Node): Node {
            switch (node.kind) {
                case SyntaxKind.PropertyAssignment:
                    var property = <PropertyDeclaration>node;
                    return factory.updatePropertyAssignment(property, property.name, builder.cacheExpression(property.initializer));
            }

            return node;
        }

        function visitObjectLiteral(node: ObjectLiteral): Node {
            if (isDownlevel && hasAwaitOrYield(node)) {
                return factory.updateObjectLiteral(node, visitList(node.properties, copyProperty));
            } else {
                return factory.updateObjectLiteral(node, visitNodes(node.properties));
            }
        }

        function visitPropertyAccess(node: PropertyAccess): PropertyAccess {
            return factory.updatePropertyAccess(node, visit(node.left), node.right);
        }

        function visitIndexedAccess(node: IndexedAccess): IndexedAccess {
            if (isDownlevel && hasAwaitOrYield(node.index)) {
                var object = builder.cacheExpression(visit(node.object));
                return factory.updateIndexedAccess(node, object, visit(node.index));
            } else {
                return factory.updateIndexedAccess(node, visit(node.object), visit(node.index));
            }
        }

        function visitCallExpression(node: CallExpression): Node {
            if (isDownlevel) {
                return factory.updateCallExpression(node, visit(node.func), visitList(node.arguments, builder.cacheExpression));
            } else {
                return factory.updateCallExpression(node, visit(node.func), visitNodes(node.arguments));
            }
        }

        function visitNewExpression(node: NewExpression): Node {
            if (isDownlevel) {
                return factory.updateNewExpression(node, visit(node.func), visitList(node.arguments, builder.cacheExpression));
            } else {
                return factory.updateNewExpression(node, visit(node.func), visitNodes(node.arguments));
            }
        }

        function visitYieldExpression(node: YieldExpression): Node {
            if (isDownlevelGenerator) {
                return rewriteYieldExpression(node);
            }

            return node;
        }

        function visitTypeAssertion(node: TypeAssertion): Node {
            return factory.updateTypeAssertion(node, visit(node.operand));
        }

        function visitTaggedTemplateExpression(node: TaggedTemplateExpression): Node {
            if (isDownlevel && hasAwaitOrYield(node.template)) {
                return factory.updateTaggedTemplateExpression(node, builder.cacheExpression(visit(node.tag)), <TemplateExpression>visit(node.template));
            } else {
                return factory.updateTaggedTemplateExpression(node, visit(node.tag), <LiteralExpression | TemplateExpression>visit(node.template));
            }
        }

        function copySpan(node: TemplateSpan): TemplateSpan {
            return factory.updateTemplateSpan(node, builder.cacheExpression(node.expression), node.literal);
        }

        function visitTemplateExpression(node: TemplateExpression): Node {
            if (isDownlevel && hasAwaitOrYield(node)) {
                return factory.updateTemplateExpression(node, node.head, visitList(node.templateSpans, copySpan));
            } else {
                return factory.updateTemplateExpression(node, node.head, visitNodes(node.templateSpans));
            }
        }

        function visitTemplateSpan(node: TemplateSpan): TemplateSpan {
            return factory.updateTemplateSpan(node, visit(node.expression), <LiteralExpression>visit(node.literal));
        }
        
        // statements

        function visitVariableStatement(node: VariableStatement): Node {
            if (isDownlevel) {
                // visiting declarations will result in assignment expressions
                var assignment = visitVariableDeclarationListOrInitializer(node.declarations).initializer;
                if (assignment) {
                    return factory.createExpressionStatement(assignment, /*location*/ node);
                }
            } else {
                return factory.updateVariableStatement(node, visitNodes(node.declarations));
            }
        }

        function visitExpressionStatement(node: ExpressionStatement): Node {
            if (isDownlevel && isAwaitOrYield(node.expression)) {
                visit(node.expression);
                return;
            } else {
                return factory.updateExpressionStatement(node, visit(node.expression));
            }
        }

        function visitVariableDeclarationListOrInitializer(declarations: NodeArray<VariableDeclaration>, initializer?: Expression): { declarations?: NodeArray<VariableDeclaration>; initializer?: Expression; } {
            if (isDownlevel) {
                // visiting declarations will result in assignment expressions
                var assignments = visitNodes<Node>(declarations);
                if (assignments && assignments.length) {
                    builder.setLocation(declarations);
                    var assignment = builder.createGeneratedNode(`\${assignments}`, { assignments });
                    return {
                        initializer: assignment
                    };
                } else {
                    return { initializer: visit(initializer) };
                }
            } else {
                return {
                    declarations: visitNodes(declarations),
                    initializer: <Expression>visit(initializer)
                };
            }
        }

        function visitIfStatement(node: IfStatement): Node {
            if (isDownlevel && (hasAwaitOrYield(node.thenStatement) || hasAwaitOrYield(node.elseStatement))) {
                rewriteIfStatement(node);
                return;
            } else {
                return factory.updateIfStatement(node, visit(node.expression), visit(node.thenStatement), visit(node.elseStatement));
            }
        }

        function visitDoStatement(node: DoStatement): Node {
            if (isDownlevel && hasAwaitOrYield(node)) {
                rewriteDoStatement(node);
                return;
            } else {
                if (isDownlevel) {
                    builder.beginScriptContinueBlock(getTarget(node));
                }

                var statement = visit(node.statement);
                var expression = visit(node.expression);
                if (isDownlevel) {
                    builder.endScriptContinueBlock();
                }

                return factory.updateDoStatement(node, statement, expression);
            }
        }

        function visitWhileStatement(node: WhileStatement): Node {
            if (isDownlevel && hasAwaitOrYield(node)) {
                rewriteWhileStatement(node);
                return;
            } else {
                pushScriptLoopBlock(node);
                node = factory.updateWhileStatement(node, visit(node.expression), visit(node.statement));
                popScriptLoopBlock();
                return node;
            }
        }

        function visitForOrForInStatementHead(declarations: NodeArray<VariableDeclaration>, initializer: Expression) {
            var variable = initializer;
            if (isDownlevel) {
                if (declarations) {
                    for (var i = 0; i < declarations.length; i++) {
                        var declaration = declarations[i];
                        var generated = rewriteVariableDeclaration(declaration);
                        if (generated) {
                            builder.setLocation(declaration);
                            builder.emit(OpCode.Statement, `\${generated};`, { generated });
                        }

                        variable = declaration.name;
                    }

                    declarations = undefined;
                } else if (initializer) {
                    initializer = visit(initializer);
                    variable = initializer;
                    while (variable.kind === SyntaxKind.BinaryExpression) {
                        variable = (<BinaryExpression>variable).left;
                    }
                }
            }

            return { declarations, initializer, variable };
        }

        function visitForStatement(node: ForStatement): Node {
            if (isDownlevel && (hasAwaitOrYield(node.condition) || hasAwaitOrYield(node.iterator) || hasAwaitOrYield(node.statement))) {
                rewriteForStatement(node);
                return;
            } else {
                pushScriptLoopBlock(node);
                var head = visitForOrForInStatementHead(node.declarations, node.initializer);
                node = factory.updateForStatement(node, head.declarations, head.initializer, visit(node.condition), visit(node.iterator), visit(node.statement));
                popScriptLoopBlock();
                return node;
            }
        }

        function visitForInStatement(node: ForInStatement): Node {
            if (isDownlevel && hasAwaitOrYield(node.statement)) {
                rewriteForInStatement(node);
                return;
            } else {
                pushScriptLoopBlock(node);
                var head = visitForOrForInStatementHead(node.declarations, node.variable);
                node = factory.updateForInStatement(node, head.declarations, head.variable, visit(node.expression), visit(node.statement));
                popScriptLoopBlock();
                return node;
            }
        }

        function visitBreakStatement(node: BreakOrContinueStatement, emitNode?: boolean): Node {
            if (isDownlevel) {
                var label = builder.findBreakTarget(getTarget(node));
                if (label > 0) {
                    if (emitNode) {
                        builder.emit(OpCode.Break, label);
                        return;
                    } else {
                        return builder.createInlineBreak(label);
                    }
                }
            }

            if (isDownlevel && emitNode) {
                builder.emit(OpCode.Statement, node);
            } else {
                return node;
            }
        }

        function visitContinueStatement(node: BreakOrContinueStatement, emitNode?: boolean): Node {
            if (isDownlevel) {
                var label = builder.findContinueTarget(getTarget(node));
                if (label > 0) {
                    if (emitNode) {
                        builder.emit(OpCode.Break, label);
                        return;
                    } else {
                        return builder.createInlineBreak(label);
                    }
                }
            }

            if (isDownlevel && emitNode) {
                builder.emit(OpCode.Statement, node);
            } else {
                return node;
            }
        }

        function visitReturnStatement(node: ReturnStatement, emitNode?: boolean): Node {
            if (isDownlevel) {
                if (emitNode) {
                    builder.emit(OpCode.Return, visit(node.expression));
                    return;
                } else {
                    return builder.createInlineReturn(visit(node.expression));
                }
            } else {
                return factory.updateReturnStatement(node, visit(node.expression));
            }
        }

        function visitSwitchStatement(node: SwitchStatement): Node {
            if (isDownlevel && forEach(node.clauses, hasAwaitOrYield)) {
                rewriteSwitchStatement(node);
                return;
            } else {
                pushScriptBreakBlock(node);
                node = factory.updateSwitchStatement(node, <Expression>visit(node.expression), visitNodes(node.clauses));
                popScriptBreakBlock();
                return node;
            }
        }

        function visitCaseClause(node: CaseOrDefaultClause, emitNode?: (node: Node) => void): CaseOrDefaultClause {
            return factory.updateCaseClause(node, visit(node.expression), visitNodes(node.statements, emitNode));
        }

        function visitDefaultClause(node: CaseOrDefaultClause, emitNode?: (node: Node) => void): CaseOrDefaultClause {
            return factory.updateDefaultClause(node, visitNodes(node.statements, emitNode));
        }

        function visitLabeledStatement(node: LabeledStatement): Node {
            if (isDownlevel && hasAwaitOrYield(node.statement)) {
                rewriteLabeledStatement(node);
                return;
            } else {
                pushScriptBreakBlock(node);
                node = factory.updateLabeledStatement(node, node.label, visit(node.statement));
                popScriptBreakBlock();
                return node;
            }
        }

        function visitThrowStatement(node: ThrowStatement, emitNode?: boolean): Node {
            if (isDownlevel && emitNode) {
                builder.emit(OpCode.Throw, visit(node.expression));
                return;
            } else {
                return factory.updateThrowStatement(node, visit(node.expression));
            }
        }

        function visitTryStatement(node: TryStatement): Node {
            if (isDownlevel && hasAwaitOrYield(node)) {
                rewriteTryStatement(node);
                return;
            } else {
                return factory.updateTryStatement(node, visit(node.tryBlock), visit(node.catchBlock), visit(node.finallyBlock));
            }
        }

        function visitBlock(node: Block, emitNode?: (node: Node) => void): Node {
            if (isDownlevel && hasAwaitOrYield(node) && !emitNode) {
                visitNodes(node.statements, builder.emitNode);
                return;
            } else {
                return factory.updateBlock(node, visitNodes(node.statements, emitNode));
            }
        }

        function visitFunctionBlock(node: Block, emitNode?: (node: Node) => void): Block {
            return factory.updateFunctionBlock(node, visitNodes(node.statements, emitNode));
        }

        function visitTryBlock(node: Block, emitNode?: (node: Node) => void): Block {
            return factory.updateTryBlock(node, visitNodes(node.statements, emitNode));
        }

        function visitCatchBlock(node: CatchBlock, emitNode?: (node: Node) => void): CatchBlock {
            return factory.updateCatchBlock(node, node.variable, visitNodes(node.statements, emitNode));
        }

        function visitFinallyBlock(node: Block, emitNode?: (node: Node) => void): Block {
            return factory.updateFinallyBlock(node, visitNodes(node.statements, emitNode));
        }

        function rewriteVariableDeclaration(node: VariableDeclaration): GeneratedNode {
            builder.setLocation(node);
            var local = builder.declareLocal(node.name.text);
            var initializer = visit(node.initializer);
            if (initializer) {
                return builder.createGeneratedNode(`\${left} = \${right}`, { left: local, right: initializer });
            }
        }

        function rewriteAwaitExpressionDownlevel(node: UnaryExpression): Expression {
            var operand = visit(node.operand);
            var resumeLabel = builder.defineLabel();
            builder.setLocation(node.operand);
            builder.emit(OpCode.Yield, operand);
            builder.markLabel(resumeLabel);
            builder.setLocation(node);
            return builder.createGeneratedNode(`__state.sent`);
        }

        function rewriteAwaitExpressionUplevel(node: UnaryExpression): Expression {
            return builder.createGeneratedNode(`(yield \${operand})`, { operand: node.operand });
        }

        function rewriteLogicalBinaryExpression(node: BinaryExpression): Expression {
            var resumeLabel = builder.defineLabel();
            var resultLocal = builder.declareLocal();
            var code = node.operator === SyntaxKind.AmpersandAmpersandToken ? OpCode.BrFalse : OpCode.BrTrue;
            builder.setLocation(node.left);
            builder.emit(OpCode.Assign, resultLocal, visit(node.left));
            builder.emit(code, resumeLabel, resultLocal);
            builder.setLocation(node.right);
            builder.emit(OpCode.Statement, resultLocal, visit(node.right));
            builder.setLocation(node);
            builder.markLabel(resumeLabel);
            return resultLocal;
        }

        function rewriteConditionalExpression(node: ConditionalExpression): Expression {
            var whenFalseLabel = builder.defineLabel();
            var resumeLabel = builder.defineLabel();
            var resultLocal = builder.declareLocal();
            builder.setLocation(node.condition);
            builder.emit(OpCode.BrFalse, whenFalseLabel, visit(node.condition));
            builder.setLocation(node.whenTrue);
            builder.emit(OpCode.Assign, resultLocal, visit(node.whenTrue));
            builder.emit(OpCode.Break, resumeLabel);
            builder.markLabel(whenFalseLabel);
            builder.setLocation(node.whenFalse);
            builder.emit(OpCode.Assign, resultLocal, visit(node.whenFalse));
            builder.markLabel(resumeLabel);
            return resultLocal;
        }

        function rewriteYieldExpression(node: YieldExpression): GeneratedNode {
            // TODO: only supported if we support a pseudo iterator symbol via a wrapper like `__values`
            ////if (node.asteriskToken) {
            ////    var iterator = builder.declareLocal();
            ////    var result = builder.declareLocal();
            ////    var expression = visit(node.expression);
            ////    builder.emit(OpCode.Statement, `\${iterator} = __values(\${expression});`, { iterator, expression });
            ////    var endLabel = builder.beginExceptionBlock();
            ////    builder.emit(OpCode.Statement, `\${result} = \${iterator}.next();`, { result, iterator });
            ////    var iteratorLabel = builder.defineLabel();
            ////    var resumeLabel = builder.defineLabel();
            ////    builder.markLabel(iteratorLabel);
            ////    builder.emit(OpCode.BrTrue, endLabel, `\${result}.done`, { result });
            ////    builder.emit(OpCode.Yield, `\${result}.value`, { result });
            ////    builder.markLabel(resumeLabel);
            ////    builder.emit(OpCode.Statement, `\${result} = \${iterator}.next(__state.sent);`, { result, iterator });
            ////    builder.emit(OpCode.Break, iteratorLabel);
            ////    builder.beginFinallyBlock();
            ////    builder.emit(OpCode.Statement, `
            ////        if (typeof \${iterator}["return"] === "function") {
            ////            \${iterator}["return"]();
            ////        }`, { iterator });
            ////    builder.endExceptionBlock();
            ////    return builder.createGeneratedNode(`\${result}.value`, { result });
            ////} 

            var operand = visit(node.expression);
            var resumeLabel = builder.defineLabel();
            builder.setLocation(node.expression);
            builder.emit(OpCode.Yield, operand);
            builder.markLabel(resumeLabel);
            builder.setLocation(node);
            return builder.createGeneratedNode(`__state.sent`);            
        }

        function rewriteIfStatement(node: IfStatement): void {
            var resumeLabel = builder.defineLabel();
            if (node.elseStatement) {
                var elseLabel = builder.defineLabel();
            }

            builder.setLocation(node.expression);
            builder.emit(OpCode.BrFalse, elseLabel || resumeLabel, node.expression);
            builder.setLocation(node.thenStatement);
            visit(node.thenStatement, builder.emitNode);
            if (node.elseStatement) {
                builder.emit(OpCode.Break, resumeLabel);
                builder.setLocation(node.elseStatement);
                builder.markLabel(elseLabel);
                visit(node.elseStatement, builder.emitNode);
            }
            builder.markLabel(resumeLabel);
        }

        function rewriteDoStatement(node: DoStatement): void {
            var bodyLabel = builder.defineLabel();
            var conditionLabel = builder.defineLabel();
            var endLabel = builder.beginContinueBlock(conditionLabel, getTarget(node));
            builder.markLabel(bodyLabel);
            builder.setLocation(node.statement);
            visit(node.statement, builder.emitNode);
            builder.markLabel(conditionLabel);
            builder.setLocation(node.expression);
            builder.emit(OpCode.BrTrue, bodyLabel, visit(node.expression));
            builder.endContinueBlock();
        }

        function rewriteWhileStatement(node: WhileStatement): void {
            var conditionLabel = builder.defineLabel();
            var bodyLabel = builder.defineLabel();
            var endLabel = builder.beginContinueBlock(conditionLabel, getTarget(node));
            builder.setLocation(node.expression);
            builder.markLabel(conditionLabel);
            builder.emit(OpCode.BrFalse, endLabel, visit(node.expression));
            builder.setLocation(node.statement);
            visit(node.statement, builder.emitNode);
            builder.emit(OpCode.Break, conditionLabel);
            builder.endContinueBlock();
        }

        function rewriteForStatement(node: ForStatement): void {
            var conditionLabel = builder.defineLabel();
            var iteratorLabel = builder.defineLabel();
            var endLabel = builder.beginContinueBlock(iteratorLabel, getTarget(node));
            var head = visitForOrForInStatementHead(node.declarations, node.initializer);
            builder.setLocation(node.declarations || node.initializer);
            builder.markLabel(conditionLabel);
            builder.setLocation(node.condition);
            builder.emit(OpCode.BrFalse, endLabel, visit(node.condition));
            builder.setLocation(node.statement);
            visit(node.statement, builder.emitNode);
            builder.markLabel(iteratorLabel);
            builder.setLocation(node.iterator);
            visit(node.iterator, builder.emitNode);
            builder.emit(OpCode.Break, conditionLabel);
            builder.endContinueBlock();
        }

        // TODO: rewrite for for..in if we support a pseudo-iterator symbol via __keys
        ////function rewriteForInStatement(node: ForInStatement): void {
        ////    var head = visitForOrForInStatementHead(node.declarations, node.variable);
        ////    var iterator = builder.declareLocal();
        ////    var result = builder.declareLocal();
        ////    var expression = visit(node.expression);
        ////    var iteratorLabel = builder.defineLabel();
        ////    builder.emit(OpCode.Statement, `\${iterator} = __keys(\${expression});`, { iterator, expression });
        ////    var endLabel = builder.beginContinueBlock(iteratorLabel, getTarget(node));
        ////    builder.markLabel(iteratorLabel);
        ////    builder.emit(OpCode.Statement, `\${result} = \${iterator}.next();`, { result, iterator });
        ////    builder.emit(OpCode.BrTrue, endLabel, `\${result}.done`, { result });
        ////    builder.emit(OpCode.Statement, `\${variable} = \${result}.value;`, { variable: head.variable, result });
        ////    builder.emit(OpCode.Break, iteratorLabel);
        ////    builder.endContinueBlock();
        ////}

        function rewriteForInStatement(node: ForInStatement): void {
            var head = visitForOrForInStatementHead(node.declarations, node.variable);
            var keysLocal = builder.declareLocal();
            var tempLocal = builder.declareLocal();
            var conditionLabel = builder.defineLabel();
            var iteratorLabel = builder.defineLabel();
            var endLabel = builder.beginContinueBlock(iteratorLabel, getTarget(node));

            builder.setLocation(node.declarations || node.variable);
            builder.setLocation(node.expression);
            builder.emit(OpCode.Statement, `
                \${keysLocal} = [];
                for (\${tempLocal} in \${expression}) {
                    \${keysLocal}[\${keysLocal}.length] = \${tempLocal};
                }
                \${tempLocal} = 0;`, {
                    keysLocal,
                    tempLocal,
                    expression: visit(node.expression)
                });
            builder.markLabel(conditionLabel);
            builder.setLocation(head.variable);
            builder.emit(OpCode.BrTrue, endLabel, `\${tempLocal} >= \${keysLocal}.length`, {
                keysLocal,
                tempLocal
            });
            builder.emit(OpCode.Statement, `\${variable} = \${keysLocal}[\${tempLocal}];`, {
                variable: head.variable,
                keysLocal,
                tempLocal
            });
            builder.setLocation(node.statement);
            visit(node.statement, builder.emitNode);
            builder.markLabel(iteratorLabel);
            builder.setLocation(node.expression);
            builder.emit(OpCode.Statement, `\${tempLocal}++;`, { tempLocal });
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
            for (var i = node.clauses.length - 1; i >= 0; i--) {
                var clause = node.clauses[i];
                if (clause.kind === SyntaxKind.DefaultClause) {
                    defaultClauseIndex = i;
                }

                clauseHasStatements[i] = !!(clause.statements && clause.statements.length);

                if (clauseHasStatements[i]) {
                    clauseLabelMap[i] = clauseLabels.length;
                    clauseLabels.push(builder.defineLabel());
                } else {
                    clauseLabelMap[i] = clauseLabels.length - 1;
                }
            }

            var expression = builder.cacheExpression(visit(node.expression));

            // emit switch cases (but not statements)                
            var lastAwaitedClause = -1;
            for (var i = 0; i < node.clauses.length; i++) {
                var clause = node.clauses[i];
                if (hasAwaitOrYield(clause.expression)) {
                    emitPartialSwitchStatement(lastAwaitedClause + 1, i - 1);

                    builder.setLocation(clause.expression);
                    var clauseLabel = clauseLabels[clauseLabelMap[i]];
                    builder.emit(OpCode.BrTrue, clauseLabel, "${expression} == ${test}", {
                        expression: expression,
                        test: visit(clause.expression)
                    });

                    lastAwaitedClause = i;
                }
            }

            emitPartialSwitchStatement(lastAwaitedClause + 1, node.clauses.length - 1);

            // emit default case (if any, but not statements)
            if (defaultClauseIndex > -1) {
                var defaultClauseLabel = clauseLabels[clauseLabelMap[defaultClauseIndex]];
                builder.setLocation(node.clauses[defaultClauseIndex]);
                builder.emit(OpCode.Break, defaultClauseLabel);
            } else {
                builder.emit(OpCode.Break, endLabel);
            }

            // emit switch states and statements
            for (var i = 0; i < node.clauses.length; i++) {
                if (!clauseHasStatements[i]) {
                    continue;
                }

                var clauseLabel = clauseLabels[clauseLabelMap[i]];
                builder.markLabel(clauseLabel);
                builder.setLocation(node.clauses[i].expression);
                visit(node.clauses[i], builder.emitNode);
            }

            builder.endBreakBlock();

            function emitPartialSwitchStatement(start: number, end: number): void {
                var clauses: CaseOrDefaultClause[] = [];
                for (var i = start; i <= end; i++) {
                    if (i === defaultClauseIndex) {
                        continue;
                    }

                    var clause = node.clauses[i];
                    var clauseLabel = clauseLabels[clauseLabelMap[i]];
                    builder.setLocation(clause.expression);
                    var caseClause = factory.createCaseClause(visit(clause.expression), [
                        builder.createInlineBreak(clauseLabel)
                    ], clause.expression);
                    clauses.push(caseClause);
                }

                if (clauses.length) {
                    var switchStatement = factory.createSwitchStatement(expression, clauses, node);
                    builder.setLocation(node);
                    builder.emit(OpCode.Statement, switchStatement);
                }
            }
        }

        function rewriteLabeledStatement(node: LabeledStatement): void {
            switch (node.statement.kind) {
                case SyntaxKind.DoStatement:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.SwitchStatement:
                    visit(node.statement, builder.emitNode);
                    return;
            }

            builder.beginBreakBlock(getTarget(node));
            visit(node.statement, builder.emitNode);
            builder.endBreakBlock();
        }

        function rewriteTryStatement(node: TryStatement): void {
            var endLabel = builder.beginExceptionBlock();
            visit(node.tryBlock, builder.emitNode);
            if (node.catchBlock) {
                builder.setLocation(node.catchBlock.variable);
                var variable = builder.declareLocal();
                var previousName = renameIdentifier(node.catchBlock.variable, variable);
                builder.beginCatchBlock(variable);
                visit(node.catchBlock, builder.emitNode);
                renameIdentifier(node.catchBlock.variable, previousName);
            }
            if (node.finallyBlock) {
                builder.beginFinallyBlock();
                visit(node.finallyBlock, builder.emitNode);
            }
            builder.endExceptionBlock();
        }

        function pushScriptLoopBlock(node: IterationStatement): void {
            if (isDownlevel) {
                builder.beginScriptContinueBlock(getTarget(node));
            }
        }

        function popScriptLoopBlock(): void {
            if (isDownlevel) {
                builder.endScriptContinueBlock();
            }
        }

        function pushScriptBreakBlock(node: Statement): void {
            if (isDownlevel) {
                builder.beginScriptBreakBlock(getTarget(node));
            }
        }

        function popScriptBreakBlock(): void {
            if (isDownlevel) {
                builder.endScriptBreakBlock();
            }
        }

        function isAwaitOrYield(node: Node): boolean {
            if (node) {
                if (node.kind === SyntaxKind.PrefixOperator && (<UnaryExpression>node).operator === SyntaxKind.AwaitKeyword) {
                    return true;
                }
                else if (node.kind === SyntaxKind.YieldExpression) {
                    return true;
                }
            }

            return false;
        }

        function hasAwaitOrYield(node: Node): boolean {
            if (!node) {
                return false;
            }

            if (isAwaitOrYield(node)) {
                return true;
            } else if (isAnyFunction(node)) {
                return false;
            } else {
                if (!node.id) node.id = nextNodeId--;
                return awaitOrYieldNodes[node.id] || (awaitOrYieldNodes[node.id] = forEachChild(node, hasAwaitOrYield));
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

        function renameIdentifier(from: Identifier, to: Identifier): Identifier {
            var previous = getProperty(renames, from.text);
            renames[from.text] = to;
            return previous;
        }

        function getRenamedIdentifier(node: Identifier): Identifier {
            return getProperty(renames, node.text) || node;
        }

        function rewriteAsyncAsGeneratorWorker(): FunctionLikeDeclaration {
            var promise = getPromiseConstructor(node);

            var statements: Statement[] = [];
            visit(func.body, node => statements.push(node));

            var body = factory.createGeneratedNode(`
                return new \${promise}(__resolve => {
                    __resolve(__awaiter(function *() {
                        @{statements}
                    }.call(this)));
                });
            `, { promise, statements }, node.body);

            var block = factory.createFunctionBlock([body], node.body);
            body.parent = block;

            var func = factory.updateFunctionLikeDeclaration(node, node.name, block, node.parameters);
            func.id = node.id;
            func.parent = node.parent;
            return func;
        }

        function rewriteDownlevelWorker(): FunctionLikeDeclaration {
            renames = {};

            builder = createCodeGenerator();
            if (node.parameters) {
                for (var i = 0; i < node.parameters.length; i++) {
                    var parameter = node.parameters[i];
                    builder.setLocation(parameter);
                    builder.addParameter(parameter.name, parameter.flags);
                    if (parameter.initializer) {
                        builder.emit(OpCode.Assign, builder.createGeneratedNode(parameter.name.text), visit(parameter.initializer));
                    }
                }
            }

            builder.setLocation(node.body);
            if (node.body.kind !== SyntaxKind.FunctionBlock) {
                builder.emit(OpCode.Return, visit(node.body));
            } else {
                visit(node.body, builder.emitNode);
            }

            if (node.flags & NodeFlags.Async) {
                var promise = getPromiseConstructor(node);
                var func = builder.buildAsyncFunction(
                    node.kind,
                    node.name,
                    promise,
                    node);
            } else {
                var func = builder.buildGeneratorFunction(
                    node.kind,
                    node.name,
                    node);
            }

            func.flags = node.flags;
            func.modifiers = node.modifiers;
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