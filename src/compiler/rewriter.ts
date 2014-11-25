/// <reference path="types.ts"/>
/// <reference path="core.ts"/>
/// <reference path="scanner.ts"/>
/// <reference path="parser.ts"/>
/// <reference path="factory.ts"/>
/// <reference path="generator.ts"/>
module ts {
    interface RewriterAnnotations {
        containsAwait?: boolean;
    }

    var annotations: RewriterAnnotations[] = [];
    var nextNodeId = -1;

    function getAnnotations(node: Node): RewriterAnnotations {
        // rewrite happens after emit, so ensure we have unique node ids for generated nodes.
        if (!node.id) node.id = nextNodeId--;
        return annotations[node.id] || (annotations[node.id] = {});
    }

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

    /** rewrites an async function or method declaration */
    export function rewriteAsyncFunction(node: FunctionLikeDeclaration, compilerOptions: CompilerOptions): FunctionLikeDeclaration {
        var builder: CodeGenerator;
        var renames: Map<Identifier>;

        return rewriteWorker();

        function visit(node: Node, emitNode?: (node: Node) => void): Node {
            // we need to recursively visit statements that could contain an `await` expression, a function declaration, or a variable declaration.
            // we only need to recursively visit expressions that contain an `await` expression.
            // skip undefined nodes or expressions with no `await`.
            if (!node) {
                return node;
            }

            builder.pushLocation(node);
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
                        node = visitWithStatement(<WithStatement>node);
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
                        node = visitThrowStatement(<ThrowStatement>node);
                        break;

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
            } finally {
                builder.popLocation();
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

        function visitList(elements: Node[], copy: (node: Node) => Node): Node[] {
            var result: Node[];
            var lastAwaitedElement = -1;

            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                if (isAwaited(element)) {
                    if (!result) {
                        result = [];
                    }

                    if (lastAwaitedElement > -1) {
                        result[lastAwaitedElement] = copy(result[lastAwaitedElement]);
                    }

                    for (var j = lastAwaitedElement + 1; j < i; j++) {
                        result[j] = copy(visit(elements[j]));
                    }

                    result[i] = visit(element);
                    lastAwaitedElement = i;
                }
            }

            if (lastAwaitedElement > -1) {
                if (lastAwaitedElement < elements.length) {
                    for (var i = lastAwaitedElement + 1; i < elements.length; i++) {
                        result[i] = elements[i];
                    }
                }

                return result;
            } else {
                return elements;
            }
        }

        // declarations

        function visitVariableDeclaration(node: VariableDeclaration): Node {
            if (compilerOptions.target <= ScriptTarget.ES5) {
                var local = builder.declareLocal(node.name.text);
                var initializer = visit(node.initializer);
                if (initializer) {
                    return factory.createBinaryExpression(SyntaxKind.EqualsToken, local, initializer, node);
                }
            } else {
                return factory.updateVariableDeclaration(node, node.name, visit(node.initializer));
            }
        }

        function visitFunctionDeclaration(node: FunctionDeclaration): Node {
            if (compilerOptions.target <= ScriptTarget.ES5) {
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
            if (compilerOptions.target <= ScriptTarget.ES5) {
                // TODO: may need to rename identifier if the renamed identifier is captured by a closure.
                return getRenamedIdentifier(node);
            } else {
                return node;
            }
        }

        function visitPrefixOperator(node: UnaryExpression): Node {
            if (node.operator === SyntaxKind.AwaitKeyword) {
                if (compilerOptions.target <= ScriptTarget.ES5) {
                    var operand = visit(node.operand);
                    var resumeLabel = builder.defineLabel();
                    builder.setLocation(node.operand);
                    builder.emit(OpCode.Yield, operand);
                    builder.markLabel(resumeLabel);
                    builder.setLocation(node);
                    return factory.createGeneratedNode(`__state.sent`, undefined, node);
                } else {
                    return factory.createGeneratedNode(`(yield \${operand})`, { operand: node.operand }, node);
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
            if (compilerOptions.target <= ScriptTarget.ES5 && isAwaited(node.right)) {
                if (isLogicalBinary(node)) {
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
                } else if (isAssignment(node)) {
                    return factory.updateBinaryExpression(node, visitAndCacheLeftHandOfAssignment(node.left), visit(node.right));
                } else {
                    return factory.updateBinaryExpression(node, builder.copy(visit(node.left)), visit(node.right));
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
                    return builder.copy(visit(node));
            }
        }

        function visitAndCacheIndexedAccess(node: IndexedAccess): Node {
            return factory.updateIndexedAccess(
                node,
                builder.copy(visit(node.object)),
                builder.copy(visit(node.index)));
        }

        function visitAndCachePropertyAccess(node: PropertyAccess): Node {
            return factory.updatePropertyAccess(
                node,
                builder.copy(visit(node.left)),
                node.right);
        }

        function visitConditionalExpression(node: ConditionalExpression): Node {
            if (compilerOptions.target <= ScriptTarget.ES5 && (isAwaited(node.whenTrue) || isAwaited(node.whenFalse))) {
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
            } else {
                return factory.updateConditionalExpression(node, visit(node.condition), visit(node.whenTrue), visit(node.whenFalse));
            }
        }

        function visitParenExpression(node: ParenExpression): Node {
            return factory.updateParenExpression(node, visit(node.expression));
        }

        function visitArrayLiteral(node: ArrayLiteral): Node {
            if (compilerOptions.target <= ScriptTarget.ES5 && isAwaited(node)) {
                return factory.updateArrayLiteral(node, visitList(node.elements, builder.copy));
            } else {
                return factory.updateArrayLiteral(node, visitNodes(node.elements));
            }
        }

        function copyProperty(node: Node): Node {
            switch (node.kind) {
                case SyntaxKind.PropertyAssignment:
                    var property = <PropertyDeclaration>node;
                    return factory.updatePropertyAssignment(property, property.name, builder.copy(property.initializer));
            }

            return node;
        }

        function visitObjectLiteral(node: ObjectLiteral): Node {
            if (compilerOptions.target <= ScriptTarget.ES5 && isAwaited(node)) {
                return factory.updateObjectLiteral(node, visitList(node.properties, copyProperty));
            } else {
                return factory.updateObjectLiteral(node, visitNodes(node.properties));
            }
        }

        function visitPropertyAccess(node: PropertyAccess): PropertyAccess {
            return factory.updatePropertyAccess(node, visit(node.left), node.right);
        }

        function visitIndexedAccess(node: IndexedAccess): IndexedAccess {
            if (compilerOptions.target <= ScriptTarget.ES5 && isAwaited(node.index)) {
                var object = builder.copy(visit(node.object));
                return factory.updateIndexedAccess(node, object, visit(node.index));
            } else {
                return factory.updateIndexedAccess(node, visit(node.object), visit(node.index));
            }
        }

        function visitCallExpression(node: CallExpression): Node {
            if (compilerOptions.target <= ScriptTarget.ES5) {
                return factory.updateCallExpression(node, visit(node.func), visitList(node.arguments, builder.copy));
            } else {
                return factory.updateCallExpression(node, visit(node.func), visitNodes(node.arguments));
            }
        }

        function visitNewExpression(node: NewExpression): Node {
            if (compilerOptions.target <= ScriptTarget.ES5) {
                return factory.updateNewExpression(node, visit(node.func), visitList(node.arguments, builder.copy));
            } else {
                return factory.updateNewExpression(node, visit(node.func), visitNodes(node.arguments));
            }
        }

        function visitTypeAssertion(node: TypeAssertion): Node {
            return factory.updateTypeAssertion(node, visit(node.operand));
        }

        function visitTaggedTemplateExpression(node: TaggedTemplateExpression): Node {
            if (compilerOptions.target <= ScriptTarget.ES5 && isAwaited(node.template)) {
                return factory.updateTaggedTemplateExpression(node, builder.copy(visit(node.tag)), <TemplateExpression>visit(node.template));
            } else {
                return factory.updateTaggedTemplateExpression(node, visit(node.tag), <LiteralExpression | TemplateExpression>visit(node.template));
            }
        }

        function copySpan(node: TemplateSpan): TemplateSpan {
            return factory.updateTemplateSpan(node, builder.copy(node.expression), node.literal);
        }

        function visitTemplateExpression(node: TemplateExpression): Node {
            if (compilerOptions.target <= ScriptTarget.ES5 && isAwaited(node)) {
                return factory.updateTemplateExpression(node, node.head, <TemplateSpan[]>visitList(node.templateSpans, copySpan));
            } else {
                return factory.updateTemplateExpression(node, node.head, visitNodes(node.templateSpans));
            }
        }

        function visitTemplateSpan(node: TemplateSpan): TemplateSpan {
            return factory.updateTemplateSpan(node, visit(node.expression), <LiteralExpression>visit(node.literal));
        }
        
        // statements

        function visitVariableStatement(node: VariableStatement): Node {
            if (compilerOptions.target <= ScriptTarget.ES5) {
                // visiting declarations will result in assignment expressions
                var assignment = visitVariableDeclarationListOrInitializer(node.declarations);
                if (assignment) {
                    return factory.createExpressionStatement(assignment, /*location*/ node);
                }
            } else {
                return factory.updateVariableStatement(node, visitNodes(node.declarations));
            }
        }

        function visitExpressionStatement(node: ExpressionStatement): Node {
            return factory.updateExpressionStatement(node, visit(node.expression));
        }

        function visitVariableDeclarationListOrInitializer(declarations: NodeArray<VariableDeclaration>, initializer?: Expression): Expression {
            // visiting declarations will result in assignment expressions
            var assignments = visitNodes<Node>(declarations);
            if (assignments && assignments.length) {
                var assignment = assignments[0];
                for (var i = 1; i < assignments.length; i++) {
                    assignment = factory.createBinaryExpression(SyntaxKind.CommaToken, assignment, assignments[i], { pos: assignment.pos, end: assignments[i].end });
                }

                if (assignments.length > 1) {
                    return factory.createParenExpression(assignment, assignment);
                }

                return assignment;
            } else {
                return visit(initializer);
            }
        }

        function visitVariableDeclarationOrVariable(declaration: VariableDeclaration, variable: Expression): { assignment?: Expression; identifier?: Identifier; variable: Expression } {
            var assignment: Expression;
            var identifier: Identifier;
            if (declaration) {
                assignment = visit(declaration);
                identifier = declaration.name;
            } else if (variable) {
                assignment = visit(variable);
                if (assignment.kind === SyntaxKind.Identifier) {
                    identifier = <Identifier>assignment;
                    assignment = undefined;
                } else if (assignment.kind === SyntaxKind.BinaryExpression) {
                    var left = assignment;
                    while (left && left.kind === SyntaxKind.BinaryExpression) {
                        left = (<BinaryExpression>left).left;
                    }

                    if (left && left.kind === SyntaxKind.Identifier) {
                        identifier = <Identifier>left;
                    }
                } else {
                    assignment = undefined;
                    identifier = undefined;
                }
            }

            return {
                assignment: assignment,
                identifier: identifier,
                variable: assignment || identifier
            };
        }

        function visitIfStatement(node: IfStatement): Node {
            if (compilerOptions.target <= ScriptTarget.ES5 && (isAwaited(node.thenStatement) || isAwaited(node.elseStatement))) {
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
                return;
            } else {
                return factory.updateIfStatement(
                    node,
                    visit(node.expression),
                    visit(node.thenStatement),
                    visit(node.elseStatement));
            }
        }

        function visitDoStatement(node: DoStatement): Node {
            if (compilerOptions.target <= ScriptTarget.ES5) {
                if (isAwaited(node)) {
                    var bodyLabel = builder.defineLabel();
                    var conditionLabel = builder.defineLabel();
                    var endLabel = builder.beginLoopBlock(conditionLabel, getTarget(node));
                    builder.markLabel(bodyLabel);
                    builder.setLocation(node.statement);
                    visit(node.statement, builder.emitNode);
                    builder.markLabel(conditionLabel);
                    builder.setLocation(node.expression);
                    builder.emit(OpCode.BrTrue, bodyLabel, visit(node.expression));
                    builder.endLoopBlock();
                    return;
                } else {
                    builder.beginScriptLoopBlock(getTarget(node));
                    var statement = visit(node.statement);
                    var expression = visit(node.expression);
                    builder.endScriptLoopBlock();
                    return factory.updateDoStatement(node, statement, expression);
                }
            } else {
                return factory.updateDoStatement(
                    node,
                    visit(node.statement),
                    visit(node.expression));
            }
        }

        function visitWhileStatement(node: WhileStatement): Node {
            if (compilerOptions.target <= ScriptTarget.ES5) {
                if (isAwaited(node)) {
                    var conditionLabel = builder.defineLabel();
                    var bodyLabel = builder.defineLabel();
                    var endLabel = builder.beginLoopBlock(conditionLabel, getTarget(node));
                    builder.setLocation(node.expression);
                    builder.markLabel(conditionLabel);
                    builder.emit(OpCode.BrFalse, endLabel, visit(node.expression));
                    builder.setLocation(node.statement);
                    visit(node.statement, builder.emitNode);
                    builder.emit(OpCode.Break, conditionLabel);
                    builder.endLoopBlock();
                    return;
                } else {
                    builder.beginScriptLoopBlock(getTarget(node));
                    var expression = visit(node.expression);
                    var statement = visit(node.statement);
                    builder.endScriptLoopBlock();
                    return factory.updateWhileStatement(node, expression, statement);
                }
            } else {
                return factory.updateWhileStatement(
                    node,
                    visit(node.expression),
                    visit(node.statement));
            }
        }

        function visitForStatement(node: ForStatement): Node {
            if (compilerOptions.target <= ScriptTarget.ES5) {
                if (isAwaited(node.condition) || isAwaited(node.iterator) || isAwaited(node.statement)) {
                    var conditionLabel = builder.defineLabel();
                    var iteratorLabel = builder.defineLabel();
                    var endLabel = builder.beginLoopBlock(iteratorLabel, getTarget(node));
                    var initializer = visitVariableDeclarationListOrInitializer(node.declarations, node.initializer);
                    builder.setLocation(initializer);
                    builder.emit(OpCode.Statement, initializer);
                    builder.markLabel(conditionLabel);
                    builder.setLocation(node.condition);
                    builder.emit(OpCode.BrFalse, endLabel, visit(node.condition));
                    builder.setLocation(node.statement);
                    visit(node.statement, builder.emitNode);
                    builder.markLabel(iteratorLabel);
                    builder.setLocation(node.iterator);
                    visit(node.iterator, builder.emitNode);
                    builder.emit(OpCode.Break, conditionLabel);
                    builder.endLoopBlock();
                    return;
                } else {
                    builder.beginScriptLoopBlock(getTarget(node));
                    var variable = visitVariableDeclarationListOrInitializer(node.declarations, node.initializer);
                    var condition = visit(node.condition);
                    var iterator = visit(node.iterator);
                    var statement = visit(node.statement);
                    builder.endScriptLoopBlock();
                    return factory.updateForStatement(node, undefined, variable, condition, iterator, statement);
                }
            } else {
                return factory.updateForStatement(
                    node,
                    visitNodes(node.declarations),
                    visit(node.initializer),
                    visit(node.condition),
                    visit(node.iterator),
                    visit(node.statement));
            }
        }

        function visitForInStatement(node: ForInStatement): Node {
            if (compilerOptions.target <= ScriptTarget.ES5) {
                //if (isAwaited(node.statement)) {
                //    var keysLocal = builder.declareLocal();
                //    var tempLocal = builder.declareLocal();
                //    var conditionLabel = builder.defineLabel();
                //    var iteratorLabel = builder.defineLabel();
                //    var endLabel = builder.beginLoopBlock(iteratorLabel, getTarget(node));
                //    var declarationOrVariable = visitVariableDeclarationListOrInitializer(node.declarations, node.variable);
                //    builder.setLocation(declarationOrVariable.assignment);
                //    builder.emit(OpCode.Statement, declarationOrVariable.assignment);
                //    builder.setLocation(node.expression);
                //    builder.emit(OpCode.Statement, `
                //    \${keysLocal} = [];
                //    for (\${tempLocal} in ${expression}) {
                //        \${keysLocal}[\${keysLocal}.length] = \${tempLocal};
                //    }
                //    \${tempLocal} = 0;`, {
                //            keysLocal,
                //            tempLocal,
                //            expression: visit(node.expression)
                //        });
                //    builder.markLabel(conditionLabel);
                //    builder.setLocation(declarationOrVariable.identifier);
                //    builder.emit(OpCode.BrTrue, endLabel, `\${tempLocal} >= \${keysLocal}.length`, {
                //        keysLocal,
                //        tempLocal
                //    });
                //    builder.emit(OpCode.Statement, `\${variable} = \${keysLocal}[\${tempLocal}];`, {
                //        variable: declarationOrVariable.variable,
                //        keysLocal,
                //        tempLocal
                //    });
                //    builder.setLocation(node.statement);
                //    visit(node.statement, builder.emitNode);
                //    builder.markLabel(iteratorLabel);
                //    builder.setLocation(node.expression);
                //    builder.emit(OpCode.Statement, `{tempLocal}++;`, { tempLocal });
                //    builder.emit(OpCode.Break, conditionLabel);
                //    builder.endLoopBlock();
                //    return;
                //} else {
                //    builder.beginScriptLoopBlock(getTarget(node));
                //    var variable = visitVariableDeclarationOrVariable(node.declaration, node.variable).variable;
                //    var expression = visit(node.expression);
                //    var statement = visit(node.statement);
                //    builder.endScriptLoopBlock();
                //    return factory.updateForInStatement(node, /*declaration*/ undefined, variable, expression, statement);
                //}
                throw TypeError("E_NOTIMPL");
            } else {
                return factory.updateForInStatement(
                    node,
                    visitNodes(node.declarations),
                    visit(node.variable),
                    visit(node.expression),
                    visit(node.statement));
            }
        }

        function visitBreakStatement(node: BreakOrContinueStatement): Node {
            if (compilerOptions.target <= ScriptTarget.ES5) {
                var label = builder.findBreakTarget(getTarget(node));
            }
            if (label > 0) {
                return builder.createBreak(label);
            } else {
                return node;
            }
        }

        function visitContinueStatement(node: BreakOrContinueStatement): Node {
            if (compilerOptions.target <= ScriptTarget.ES5) {
                var label = builder.findBreakTarget(getTarget(node));
            }
            if (label > 0) {
                return builder.createBreak(label);
            } else {
                return node;
            }
        }

        function visitReturnStatement(node: ReturnStatement): Node {
            if (compilerOptions.target <= ScriptTarget.ES5) {
                return builder.createReturn(visit(node.expression));
            } else {
                return factory.updateReturnStatement(node, visit(node.expression));
            }
        }

        function visitWithStatement(node: WithStatement): Node {
            if (compilerOptions.target <= ScriptTarget.ES5 && isAwaited(node.statement)) {
                var expression = builder.copy(visit(node.expression));
                builder.beginWithBlock(expression);
                visit(node.statement, builder.emitNode);
                builder.endWithBlock();
                return;
            } else {
                return factory.updateWithStatement(node, visit(node.expression), visit(node.statement));
            }
        }

        function visitSwitchStatement(node: SwitchStatement): Node {
            if (compilerOptions.target <= ScriptTarget.ES5) {
                if (forEach(node.clauses, isAwaited)) {
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

                    var expression = builder.copy(visit(node.expression));

                    // emit switch cases (but not statements)                
                    var lastAwaitedClause = -1;
                    for (var i = 0; i < node.clauses.length; i++) {
                        var clause = node.clauses[i];
                        if (isAwaited(clause.expression)) {
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
                    return;
                } else {
                    var expression = <Expression>visit(node.expression);
                    builder.beginScriptBreakBlock(getTarget(node));
                    var clauses = visitNodes(node.clauses);
                    builder.endScriptBreakBlock();
                    return factory.updateSwitchStatement(node, expression, clauses);
                }
            } else {
                return factory.updateSwitchStatement(node, visit(node.expression), visitNodes(node.clauses));
            }

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
                        builder.createBreak(clauseLabel)
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

        function visitCaseClause(node: CaseOrDefaultClause, emitNode?: (node: Node) => void): CaseOrDefaultClause {
            return factory.updateCaseClause(node, visit(node.expression), visitNodes(node.statements, emitNode));
        }

        function visitDefaultClause(node: CaseOrDefaultClause, emitNode?: (node: Node) => void): CaseOrDefaultClause {
            return factory.updateDefaultClause(node, visitNodes(node.statements, emitNode));
        }

        function visitLabeledStatement(node: LabeledStatement): Node {
            if (compilerOptions.target <= ScriptTarget.ES5) {
                if (isAwaited(node.statement)) {
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
                    return;
                } else {
                    builder.beginScriptBreakBlock(getTarget(node));
                    var statement = visit(node.statement);
                    builder.endScriptBreakBlock();
                    return factory.updateLabeledStatement(node, node.label, statement);
                }
            } else {
                return factory.updateLabeledStatement(node, node.label, visit(node.statement));
            }
        }

        function visitThrowStatement(node: ThrowStatement): Node {
            return factory.updateThrowStatement(node, visit(node.expression));
        }

        function visitTryStatement(node: TryStatement): Node {
            if (compilerOptions.target <= ScriptTarget.ES5 && isAwaited(node)) {
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
                return;
            } else {
                return factory.updateTryStatement(
                    node,
                    <Block>visit(node.tryBlock),
                    <CatchBlock>visit(node.catchBlock),
                    <Block>visit(node.finallyBlock));
            }
        }

        function visitBlock(node: Block, emitNode?: (node: Node) => void): Node {
            if (compilerOptions.target <= ScriptTarget.ES5 && isAwaited(node) && !emitNode) {
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
            return factory.updateCatchBlock(node, <Identifier>visit(node.variable), visitNodes(node.statements, emitNode));
        }

        function visitFinallyBlock(node: Block, emitNode?: (node: Node) => void): Block {
            return factory.updateFinallyBlock(node, visitNodes(node.statements, emitNode));
        }

        function isAwaited(node: Node): boolean {
            if (!node) {
                return false;
            }

            if (node.kind === SyntaxKind.PrefixOperator) {
                if ((<UnaryExpression>node).operator === SyntaxKind.AwaitKeyword) {
                    return true;
                }
            } else if (isAnyFunction(node)) {
                return false;
            } else {
                var annotations = getAnnotations(node);
                if ("containsAwait" in annotations) {
                    return annotations.containsAwait;
                } else {
                    return annotations.containsAwait = forEachChild(node, isAwaited);
                }
            }
        }

        function getTarget(node: Node): Symbol {
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
                return label.symbol;
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

        function rewriteAsGeneratorWorker(): FunctionLikeDeclaration {
            var promise = getPromiseConstructor(node);

            var statements: Statement[] = [];
            visit(func.body, node => statements.push(node));

            var body = factory.createGeneratedNode(`
                return new \${promise}(__resolve => {
                    __resolve(__awaiter(function *() {
                        @{statements}
                    }()));
                });
            `, { promise: promise, statements: statements }, node.body);

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
            builder.setLocation(node.body);
            visit(node.body, builder.emitNode);

            // TODO: verify this is the best way to do this.
            var typeName: EntityName;
            if (node.type.kind === SyntaxKind.TypeReference) {
                var typeReference = <TypeReferenceNode>node.type;
                typeName = typeReference.typeName;
            }
            else if (node.type.kind === SyntaxKind.TypeQuery) {
                var typeQuery = <TypeQueryNode>node.type;
                typeName = typeQuery.exprName;
            }

            var body = factory.createGeneratedNode(`
                return new \${promise}(function(__resolve) {
                    \${locals}
                    @{functions}
                    __resolve(__awaiter(function(__state) {
                        switch(__state.label) {
                            @{body}
                        }
                        return ["return"];
                    }))
                });`, {
                    promise: typeName,
                    locals: builder.getLocals(),
                    functions: builder.getFunctions(),
                    body: builder.getBody()
                }, node.body);

            var block = factory.createFunctionBlock([body], node.body);
            body.parent = body;

            var func = factory.updateFunctionLikeDeclaration(node, node.name, block, node.parameters);
            func.id = node.id;
            func.parent = node.parent;
            return func;
        }

        function rewriteWorker(): FunctionLikeDeclaration {
            if (compilerOptions.target <= ScriptTarget.ES5) {
                return rewriteDownlevelWorker();
            } else {
                return rewriteAsGeneratorWorker();
            }
        }
    }
}