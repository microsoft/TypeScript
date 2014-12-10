/// <reference path="types.ts"/>
/// <reference path="core.ts"/>
/// <reference path="scanner.ts"/>
/// <reference path="parser.ts"/>
/// <reference path="factory.ts"/>
/// <reference path="generator.ts"/>

// TODO(rbuckton): do we need to capture/rename `arguments` or disallow `arguments` in async/generator?
module ts {
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
    export function rewriteFunction(node: FunctionLikeDeclaration, compilerOptions: CompilerOptions, resolver: EmitResolver): FunctionLikeDeclaration {
        var locals = createLocalGenerator(resolver, node.body);
        var builder: CodeGenerator;
        var isDownlevel = compilerOptions.target <= ScriptTarget.ES5;
        var isAsync = (node.flags & NodeFlags.Async) !== 0;
        var isGenerator = !!node.asteriskToken;
        var isDownlevelGenerator = isDownlevel && isGenerator;
        var isDownlevelAsync = isDownlevel && isAsync;
        var isUplevelAsync = !isDownlevel && isAsync;
        var inRewrittenBlock = false;
        var generatedLocation: TextRange = { pos: -1, end: -1 };

        if (!isAsync && !isDownlevelGenerator) {
            return node;
        }

        return rewriteWorker();

        function visit(node: Node): Node {
            if (!node) {
                return node;
            }

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
                    node = visitBreakStatement(<BreakOrContinueStatement>node);
                    break;

                case SyntaxKind.ContinueStatement:
                    node = visitContinueStatement(<BreakOrContinueStatement>node);
                    break;

                case SyntaxKind.ReturnStatement:
                    node = visitReturnStatement(<ReturnStatement>node);
                    break;

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
                    node = visitCaseClause(<CaseOrDefaultClause>node);
                    break;

                case SyntaxKind.DefaultClause:
                    node = visitDefaultClause(<CaseOrDefaultClause>node);
                    break;

                case SyntaxKind.LabeledStatement:
                    node = visitLabeledStatement(<LabeledStatement>node);
                    break;

                case SyntaxKind.ThrowStatement:
                    node = visitThrowStatement(<ThrowStatement>node);
                    break;

                case SyntaxKind.TryStatement:
                    node = visitTryStatement(<TryStatement>node);
                    break;

                case SyntaxKind.Block:
                    node = visitBlock(<Block>node);
                    break;

                case SyntaxKind.FunctionBlock:
                    node = visitFunctionBlock(<Block>node);
                    break;

                case SyntaxKind.TryBlock:
                    node = visitTryBlock(<Block>node);
                    break;

                case SyntaxKind.CatchBlock:
                    node = visitCatchBlock(<CatchBlock>node);
                    break;

                case SyntaxKind.FinallyBlock:
                    node = visitFinallyBlock(<Block>node);
                    break;
            }

            return node;
        }

        function visitNodes<TNode extends Node>(nodes: NodeArray<TNode>): NodeArray<TNode> {
            if (!nodes) {
                return nodes;
            }

            var updatedNodes: NodeArray<TNode>;
            var offset: number = 0;
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                var updatedNode = visit(node);
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
                        result[j] = copy(<TNode>visit(elements[j]));
                    }

                    result[i] = <TNode>visit(element);
                    lastRewrittenElement = i;
                }
            }

            if (lastRewrittenElement > -1) {
                if (lastRewrittenElement < elements.length) {
                    for (var i = lastRewrittenElement + 1; i < elements.length; i++) {
                        result[i] = <TNode>visit(elements[i]);
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

        function visitBinaryExpression(node: BinaryExpression): Node {
            if (isDownlevel && hasAwaitOrYield(node.right)) {
                if (isLogicalBinary(node)) {
                    return rewriteLogicalBinaryExpression(node);
                } else if (isAssignment(node)) {
                    return factory.updateBinaryExpression(node, visitOperandForAssignment(node.left), visit(node.right));
                } else {
                    return factory.updateBinaryExpression(node, builder.cacheExpression(visit(node.left)), visit(node.right));
                }
            } else {
                return factory.updateBinaryExpression(node, visit(node.left), visit(node.right));
            }
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
                return factory.updateArrayLiteral(node, visitList<Node>(node.elements, builder.cacheExpression));
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
            if (isDownlevel && hasAwaitOrYield(node)) {
                var result = visitOperandForCall(node.func);
                var arguments = visitList<Node>(node.arguments, builder.cacheExpression);
                var target = result.target;
                var thisArg = result.thisArg;
                if (thisArg) {
                    var callArguments: NodeArray<Expression> = factory.createNodeArray([<Expression>thisArg].concat(arguments), node.arguments);
                    var callProperty = factory.createPropertyAccess(target, factory.createIdentifier("call"));
                    var callExpression = factory.createCallExpression(callProperty, callArguments, node);
                    return callExpression;
                } else {
                    var callExpression = factory.createCallExpression(target, arguments, node);
                    return callExpression;
                }
            } else {
                return factory.updateCallExpression(node, visit(node.func), visitNodes(node.arguments));
            }
        }

        function visitNewExpression(node: NewExpression): Node {
            if (isDownlevel && hasAwaitOrYield(node)) {
                return factory.updateNewExpression(node, builder.cacheExpression(visit(node.func)), visitList<Node>(node.arguments, builder.cacheExpression));
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
                            variable = factory.createIdentifier(declaration.name.text, declaration.name);
                        }
                    }
                    
                    initializer = undefined;
                    declarations = undefined;

                    if (assignments) {
                        if (node.kind === SyntaxKind.ForInStatement) {
                            builder.emit(OpCode.Statement, assignments);
                        } else {
                            initializer = assignments;
                        }
                    }
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

        function visitVariableStatement(node: VariableStatement): Node {
            if (isDownlevel) {
                var assignment = visitVariableDeclarationsOrInitializer(node.declarations, /*initializer*/ undefined, node).initializer;
                if (assignment) {
                    return factory.createExpressionStatement(assignment, node);
                }
            } else {
                return factory.updateVariableStatement(node, visitNodes(node.declarations));
            }
        }

        function visitExpressionStatement(node: ExpressionStatement): Node {
            if (isDownlevel && isAwaitOrYield(node.expression)) {
                visit(node.expression);
                return;
            }

            return factory.updateExpressionStatement(node, visit(node.expression));
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
                if (isDownlevel) builder.beginScriptContinueBlock(getTarget(node));
                node = factory.updateDoStatement(node, visit(node.statement), visit(node.expression));
                if (isDownlevel) builder.endScriptContinueBlock();
                return node;
            }
        }

        function visitWhileStatement(node: WhileStatement): Node {
            if (isDownlevel && hasAwaitOrYield(node)) {
                rewriteWhileStatement(node);
                return;
            } else {
                if (isDownlevel) builder.beginScriptContinueBlock(getTarget(node));
                node = factory.updateWhileStatement(node, visit(node.expression), visit(node.statement));
                if (isDownlevel) builder.endScriptContinueBlock();
                return node;
            }
        }

        function visitForStatement(node: ForStatement): Node {
            if (isDownlevel && (hasAwaitOrYield(node.condition) || hasAwaitOrYield(node.iterator) || hasAwaitOrYield(node.statement))) {
                rewriteForStatement(node);
                return;
            } else {
                if (isDownlevel) builder.beginScriptContinueBlock(getTarget(node));
                var head = visitVariableDeclarationsOrInitializer(node.declarations, node.initializer, node);
                node = factory.updateForStatement(node, head.declarations, head.initializer, visit(node.condition), visit(node.iterator), visit(node.statement));
                if (isDownlevel) builder.endScriptContinueBlock();
                return node;
            }
        }

        function visitForInStatement(node: ForInStatement): Node {
            if (isDownlevel && hasAwaitOrYield(node.statement)) {
                rewriteForInStatement(node);
                return;
            } else {
                if (isDownlevel) builder.beginScriptContinueBlock(getTarget(node));
                var head = visitVariableDeclarationsOrInitializer(node.declarations, node.variable, node);
                node = factory.updateForInStatement(node, head.declarations, head.variable, visit(node.expression), visit(node.statement));
                if (isDownlevel) builder.endScriptContinueBlock();
                return node;
            }
        }

        function visitBreakStatement(node: BreakOrContinueStatement): Node {
            if (isDownlevel) {
                var label = builder.findBreakTarget(getTarget(node));
                if (label > 0) {
                    builder.writeLocation(node);
                    return builder.createInlineBreak(label);
                }
            }

            return node;
        }

        function visitContinueStatement(node: BreakOrContinueStatement): Node {
            if (isDownlevel) {
                var label = builder.findContinueTarget(getTarget(node));
                if (label > 0) {
                    builder.writeLocation(node);
                    return builder.createInlineBreak(label);
                }
            }

            return node;
        }

        function visitReturnStatement(node: ReturnStatement): Node {
            if (isDownlevel) {
                var expression = visit(node.expression);
                builder.writeLocation(node);
                return builder.createInlineReturn(expression);
            } else {
                return factory.updateReturnStatement(node, visit(node.expression));
            }
        }

        function visitSwitchStatement(node: SwitchStatement): Node {
            if (isDownlevel && forEach(node.clauses, hasAwaitOrYield)) {
                rewriteSwitchStatement(node);
                return;
            } else {
                if (isDownlevel) builder.beginScriptBreakBlock(getTarget(node));
                node = factory.updateSwitchStatement(node, <Expression>visit(node.expression), visitNodes(node.clauses));
                if (isDownlevel) builder.endScriptBreakBlock();
                return node;
            }
        }

        function visitCaseClause(node: CaseOrDefaultClause): CaseOrDefaultClause {
            return factory.updateCaseClause(node, visit(node.expression), visitNodes(node.statements));
        }

        function visitDefaultClause(node: CaseOrDefaultClause): CaseOrDefaultClause {
            return factory.updateDefaultClause(node, visitNodes(node.statements));
        }

        function visitLabeledStatement(node: LabeledStatement): Node {
            if (isDownlevel && hasAwaitOrYield(node.statement)) {
                rewriteLabeledStatement(node);
                return;
            } else {
                if (isDownlevel) builder.beginScriptBreakBlock(getTarget(node));
                node = factory.updateLabeledStatement(node, node.label, visit(node.statement));
                if (isDownlevel) builder.endScriptBreakBlock();
                return node;
            }
        }

        function visitThrowStatement(node: ThrowStatement): Node {
            return factory.updateThrowStatement(node, visit(node.expression));
        }

        function visitTryStatement(node: TryStatement): Node {
            if (isDownlevel && hasAwaitOrYield(node)) {
                rewriteTryStatement(node);
                return;
            } else {
                return factory.updateTryStatement(node, <Block>visit(node.tryBlock), <CatchBlock>visit(node.catchBlock), <Block>visit(node.finallyBlock));
            }
        }

        function visitBlock(node: Block): Node {
            return factory.updateBlock(node, visitNodes(node.statements));
        }

        function visitFunctionBlock(node: Block): Block {
            return factory.updateFunctionBlock(node, visitNodes(node.statements));
        }

        function visitTryBlock(node: Block): Block {
            return factory.updateTryBlock(node, visitNodes(node.statements));
        }

        function visitCatchBlock(node: CatchBlock): CatchBlock {
            return factory.updateCatchBlock(node, node.variable, visitNodes(node.statements));
        }

        function visitFinallyBlock(node: Block): Block {
            return factory.updateFinallyBlock(node, visitNodes(node.statements));
        }

        function visitOperandForAssignment(node: Node): Node {
            switch (node.kind) {
                case SyntaxKind.IndexedAccess:
                    return visitIndexedAccessForAssignment(<IndexedAccess>node);

                case SyntaxKind.PropertyAccess:
                    return visitPropertyAccessForAssignment(<PropertyAccess>node);

                default:
                    return visit(node);
            }
        }

        function visitIndexedAccessForAssignment(node: IndexedAccess): Node {
            return factory.updateIndexedAccess(
                node,
                builder.cacheExpression(visit(node.object)),
                builder.cacheExpression(visit(node.index)));
        }

        function visitPropertyAccessForAssignment(node: PropertyAccess): Node {
            return factory.updatePropertyAccess(
                node,
                builder.cacheExpression(visit(node.left)),
                node.right);
        }

        function visitOperandForCall(node: Node): { target: GeneratedNode; thisArg?: GeneratedNode; } {
            switch (node.kind) {
                case SyntaxKind.IndexedAccess:
                    return visitIndexedAccessForCall(<IndexedAccess>node);

                case SyntaxKind.PropertyAccess:
                    return visitPropertyAccessForCall(<PropertyAccess>node);

                default:
                    return { target: builder.cacheExpression(visit(node)) };
            }
        }

        function visitIndexedAccessForCall(node: IndexedAccess): { target: GeneratedNode; thisArg?: GeneratedNode; } {
            var thisArg = builder.cacheExpression(visit(node.object));

            var target = builder.declareLocal();
            var index = visit(node.index);
            var indexedAccess = factory.createIndexedAccess(thisArg, index, node);
            var assignExpression = factory.createBinaryExpression(SyntaxKind.EqualsToken, target, indexedAccess);

            builder.writeLocation(node);
            builder.emit(OpCode.Statement, assignExpression);
            return { target, thisArg };
        }

        function visitPropertyAccessForCall(node: PropertyAccess): { target: GeneratedNode; thisArg?: GeneratedNode; } {
            var thisArg = builder.cacheExpression(visit(node.left));

            var target = builder.declareLocal();
            var property = factory.createIdentifier(node.right.text);

            var propertyAccess = factory.createPropertyAccess(thisArg, property, node);
            var assignExpression = factory.createBinaryExpression(SyntaxKind.EqualsToken, target, propertyAccess);
            
            builder.writeLocation(node);
            builder.emit(OpCode.Statement, assignExpression);
            return { target, thisArg };
        }

        function rewriteVariableDeclaration(node: VariableDeclaration): BinaryExpression {
            builder.addVariable(node.name);
            var initializer = visit(node.initializer);
            if (initializer) {
                return factory.createBinaryExpression(SyntaxKind.EqualsToken, node.name, initializer, node);
            }
        }

        function rewriteAwaitExpressionDownlevel(node: UnaryExpression): Expression {
            var operand = visit(node.operand);
            var resumeLabel = builder.defineLabel();
            builder.writeLocation(node);
            builder.emit(OpCode.Yield, operand);
            builder.markLabel(resumeLabel);
            return builder.createResume();
        }

        function rewriteAwaitExpressionUplevel(node: UnaryExpression): Expression {
            return factory.createGeneratedNode(`(yield \${operand})`, { operand: node.operand }, node);
        }

        function rewriteLogicalBinaryExpression(node: BinaryExpression): Expression {
            var resumeLabel = builder.defineLabel();
            var resultLocal = builder.declareLocal();
            var code = node.operator === SyntaxKind.AmpersandAmpersandToken ? OpCode.BrFalse : OpCode.BrTrue;
            builder.writeLocation(node.left);
            builder.emit(OpCode.Assign, resultLocal, visit(node.left));
            builder.emit(code, resumeLabel, resultLocal);
            builder.writeLocation(node.right);
            builder.emit(OpCode.Assign, resultLocal, visit(node.right));
            builder.markLabel(resumeLabel);
            return resultLocal;
        }

        function rewriteConditionalExpression(node: ConditionalExpression): Expression {
            var whenFalseLabel = builder.defineLabel();
            var resumeLabel = builder.defineLabel();
            var resultLocal = builder.declareLocal();
            builder.emit(OpCode.BrFalse, whenFalseLabel, visit(node.condition));
            builder.writeLocation(node.whenTrue);
            builder.emit(OpCode.Assign, resultLocal, visit(node.whenTrue));
            builder.emit(OpCode.Break, resumeLabel);
            builder.markLabel(whenFalseLabel);
            builder.writeLocation(node.whenFalse);
            builder.emit(OpCode.Assign, resultLocal, visit(node.whenFalse));
            builder.markLabel(resumeLabel);
            return resultLocal;
        }

        function rewriteYieldExpression(node: YieldExpression): Expression {
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
            ////    builder.emit(OpCode.Statement, `\${result} = \${iterator}.next(\${sent});`, { result, iterator, sent: builder.createResume() });
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
            builder.writeLocation(node);
            builder.emit(OpCode.Yield, operand);
            builder.markLabel(resumeLabel);
            return builder.createResume();
        }

        function rewriteIfStatement(node: IfStatement): void {
            var resumeLabel = builder.defineLabel();
            if (node.elseStatement) {
                var elseLabel = builder.defineLabel();
            }

            builder.emit(OpCode.BrFalse, elseLabel || resumeLabel, visit(node.expression));
            
            visitAndEmitNode(node.thenStatement);
            if (node.elseStatement) {
                builder.emit(OpCode.Break, resumeLabel);
                builder.markLabel(elseLabel);
                visitAndEmitNode(node.elseStatement);
            }

            builder.markLabel(resumeLabel);
        }

        function rewriteDoStatement(node: DoStatement): void {
            var bodyLabel = builder.defineLabel();
            var conditionLabel = builder.defineLabel();
            var endLabel = builder.beginContinueBlock(conditionLabel, getTarget(node));

            builder.markLabel(bodyLabel);
            visitAndEmitNode(node.statement);
            builder.markLabel(conditionLabel);
            builder.emit(OpCode.BrTrue, bodyLabel, visit(node.expression));
            builder.endContinueBlock();
        }

        function rewriteWhileStatement(node: WhileStatement): void {
            var conditionLabel = builder.defineLabel();
            var bodyLabel = builder.defineLabel();
            var endLabel = builder.beginContinueBlock(conditionLabel, getTarget(node));
            builder.markLabel(conditionLabel);            
            builder.emit(OpCode.BrFalse, endLabel, visit(node.expression));            
            visitAndEmitNode(node.statement);
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
                builder.emit(OpCode.Statement, head.initializer);
            }
            builder.markLabel(conditionLabel);
            if (node.condition) {
                builder.emit(OpCode.BrFalse, endLabel, visit(node.condition));
            }
            visitAndEmitNode(node.statement);
            builder.markLabel(iteratorLabel);
            if (node.iterator) {
                visitAndEmitNode(node.iterator);
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
            builder.emit(OpCode.BrTrue, endLabel, `\${tempLocal} >= \${keysLocal}.length`, {
                keysLocal,
                tempLocal
            });
            builder.writeLocation(head.variable);
            builder.emit(OpCode.Statement, `\${variable} = \${keysLocal}[\${tempLocal}];`, {
                variable: head.variable,
                keysLocal,
                tempLocal
            });
            visitAndEmitNode(node.statement);
            builder.markLabel(iteratorLabel);
            builder.writeLocation(head.variable);
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

                    var clauseExpression = visit(clause.expression);
                    var clauseLabel = clauseLabels[clauseLabelMap[i]];
                    builder.writeLocation(clause.expression);
                    builder.emit(OpCode.BrTrue, clauseLabel, `\${expression} === \${test}`, {
                        expression: expression,
                        test: clauseExpression
                    });

                    lastAwaitedClause = i;
                }
            }

            emitPartialSwitchStatement(lastAwaitedClause + 1, node.clauses.length - 1);

            // emit default case (if any, but not statements)
            if (defaultClauseIndex > -1) {
                var defaultClauseLabel = clauseLabels[clauseLabelMap[defaultClauseIndex]];
                builder.writeLocation(node.clauses[defaultClauseIndex]);
                builder.emit(OpCode.Break, defaultClauseLabel);
            } else {
                builder.emit(OpCode.Break, endLabel);
            }

            // emit switch states and statements
            for (var i = 0; i < node.clauses.length; i++) {
                if (!clauseHasStatements[i]) {
                    continue;
                }
                var clause = node.clauses[i];
                var clauseLabel = clauseLabels[clauseLabelMap[i]];
                builder.markLabel(clauseLabel);
                visitAndEmitBlockOrClause(clause);
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
                    builder.writeLocation(clause.expression);
                    var inlineBreak = builder.createInlineBreak(clauseLabel);
                    var caseClause = factory.createCaseClause(visit(clause.expression), [inlineBreak], clause.expression);
                    clauses.push(caseClause);
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
            visitAndEmitNode(node.statement);
            if (statementSupportsBreak) {
                builder.endBreakBlock();
            }
        }

        function rewriteTryStatement(node: TryStatement): void {
            var endLabel = builder.beginExceptionBlock();
            visitAndEmitBlockOrClause(node.tryBlock);
            if (node.catchBlock) {
                var variable = builder.declareLocal(node.catchBlock.variable.text);
                resolver.renameSymbol(node.catchBlock.symbol, variable.text);
                builder.beginCatchBlock(variable);
                visitAndEmitBlockOrClause(node.catchBlock);
            }
            if (node.finallyBlock) {
                builder.beginFinallyBlock();
                visitAndEmitBlockOrClause(node.finallyBlock);
            }
            builder.endExceptionBlock();
        }

        function rewriteReturnStatement(node: ReturnStatement): void {
            var expression = visit(node.expression);
            builder.writeLocation(node);
            builder.emit(OpCode.Return, expression);
        }

        function rewriteThrowStatement(node: ThrowStatement): void {
            var expression = visit(node.expression);
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
                case SyntaxKind.FunctionBlock:
                case SyntaxKind.Block:
                case SyntaxKind.TryBlock:
                case SyntaxKind.CatchBlock:
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

        function emitNode(node: Node): void {
            builder.writeLocation(node);
            builder.emit(OpCode.Statement, node);
        }

        function visitAndEmitBlockOrClause(node: Block | CaseOrDefaultClause): void {
            for (var i = 0; i < node.statements.length; i++) {
                var statement = node.statements[i];
                if (isAnyBlockOrClause(statement) && hasAwaitOrYield(statement)) {
                    visitAndEmitBlockOrClause(<Block | CaseOrDefaultClause>statement);
                } else {
                    visitAndEmitStatementOrExpression(statement);
                }
            }
        }

        function visitAndEmitStatementOrExpression(node: Statement | Expression): void {
            switch (node.kind) {
                case SyntaxKind.ThrowStatement:
                    return rewriteThrowStatement(<ThrowStatement>node);
                case SyntaxKind.ReturnStatement:
                    return rewriteReturnStatement(<ReturnStatement>node);
                case SyntaxKind.BreakStatement:
                    return rewriteBreakStatement(<BreakOrContinueStatement>node);
                case SyntaxKind.ContinueStatement:
                    return rewriteContinueStatement(<BreakOrContinueStatement>node);
            }

            emitNode(visit(node));
        }

        function visitAndEmitNode(node: Node): void {
            if (isAnyBlockOrClause(node)) {
                visitAndEmitBlockOrClause(<Block | CaseOrDefaultClause>node);
            } else {
                visitAndEmitStatementOrExpression(node);
            }
        }

        function rewriteAsyncAsGeneratorWorker(): FunctionLikeDeclaration {
            var promiseConstructor = getPromiseConstructor(node);

            if (node.body.kind === SyntaxKind.FunctionBlock) {
                var block = <Block>node.body;
                var statementsLocation: TextRange = block.statements;
                var statements = factory.createNodeArray(map(block.statements, visit), block.statements);
            } else {
                var statementsLocation: TextRange = node.body;
                var statements = factory.createNodeArray<Statement>([visit(node.body)], node.body);
            }

            var resolve = locals.createUniqueIdentifier("_resolve");
            var body = factory.createGeneratedNode(`
                return new \${promiseConstructor}(function (\${resolve}) {
                    \${resolve}(__awaiter(function* () {
                        @{statements}
                    }()));
                });
            `, { promiseConstructor, resolve, statements }, statements);

            var block = factory.createFunctionBlock([body], statements);
            body.parent = block;

            var func = factory.updateFunctionLikeDeclaration(node, node.name, block, node.parameters);
            func.id = node.id;
            func.parent = node.parent;
            return func;
        }

        function rewriteDownlevelWorker(): FunctionLikeDeclaration {
            if (node.flags & NodeFlags.Async) {
                var promiseConstructor = resolver.getPromiseConstructor(node);
                builder = createCodeGenerator(locals, resolver, node, { promiseConstructor });
            }
            else {
                builder = createCodeGenerator(locals, resolver, node);
            }

            builder.markLabel(builder.defineLabel());
            if (node.parameters) {
                for (var i = 0; i < node.parameters.length; i++) {
                    var parameter = node.parameters[i];
                    builder.writeLocation(parameter);
                    builder.addParameter(parameter.name, parameter.flags);
                    if (parameter.initializer) {
                        builder.emit(OpCode.Assign, factory.createIdentifier(parameter.name.text), visit(parameter.initializer));
                    }
                }
            }

            if (node.body.kind !== SyntaxKind.FunctionBlock) {
                builder.emit(OpCode.Return, visit(node.body));
            } else {
                visitAndEmitNode(node.body);
            }

            var func = builder.buildFunction(node.kind, node.name);
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