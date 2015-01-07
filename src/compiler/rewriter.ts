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
    interface CallBinding {
        target?: Identifier;
        thisArg?: Identifier;
    }

    /** rewrites an async or generator function or method declaration */
    export function rewriteFunction(node: FunctionLikeDeclaration, compilerOptions: CompilerOptions, resolver: EmitResolver, locals: LocalsBuilder): FunctionLikeDeclaration {
        var builder: FunctionGenerator;
        var nodeVisitor: Visitor;
        var isDownlevel = compilerOptions.target <= ScriptTarget.ES5;
        var isAsync = (node.flags & NodeFlags.Async) !== 0;
        var isGenerator = !!node.asteriskToken;
        var isDownlevelGenerator = isDownlevel && isGenerator;
        var isDownlevelAsync = isDownlevel && isAsync;
        var isUplevelAsync = !isDownlevel && isAsync;

        if (!isAsync && !isDownlevelGenerator) {
            return node;
        }

        nodeVisitor = Visitor.create({
            visitBinaryExpression,
            visitConditionalExpression,
            visitYieldExpression,
            visitSpreadElementExpression,
            visitAwaitExpression,
            visitArrayLiteralExpression,
            visitObjectLiteralExpression,
            visitElementAccessExpression,
            visitCallExpression,
            visitNewExpression,
            visitTaggedTemplateExpression,
            visitTemplateExpression,
            visitFunctionDeclaration,
            visitVariableStatement,
            visitVariableDeclarationListOrInitializer,
            visitExpressionStatement,
            visitIfStatement,
            visitDoStatement,
            visitWhileStatement,
            visitForStatement,
            visitForInStatement,
            visitContinueStatement,
            visitBreakStatement,
            visitReturnStatement,
            visitWithStatement,
            visitSwitchStatement,
            visitLabeledStatement,
            visitTryStatement,
            visitCatchClause,
        });

        var visitExpression = nodeVisitor.visitExpression;
        var visitUnaryExpression = nodeVisitor.visitUnaryExpression;
        var visitLeftHandSideExpression = nodeVisitor.visitLeftHandSideExpression;
        var visitObjectLiteralElement = nodeVisitor.visitObjectLiteralElement;
        var visitTemplateLiteralOrTemplateExpression = nodeVisitor.visitTemplateLiteralOrTemplateExpression;
        var visitStatement = nodeVisitor.visitStatement;
        var visitBlock = nodeVisitor.visitBlock;
        var visitTemplateSpan = nodeVisitor.visitTemplateSpan;

        return rewriteWorker();

        // visitors
        function visitBinaryExpression(node: BinaryExpression): Expression {
            if (isDownlevel && hasAwaitOrYield(node.right)) {
                if (isLogicalBinary(node)) {
                    return rewriteLogicalBinaryExpression(node);
                } else if (isAssignment(node)) {
                    return factory.updateBinaryExpression(node, rewriteLeftHandSideOfAssignmentExpression(node.left), visitExpression(node.right));
                } else {
                    return factory.updateBinaryExpression(node, cacheExpression(visitExpression(node.left)), visitExpression(node.right));
                }
            }

            return Visitor.visitBinaryExpression(node);
        }

        function visitConditionalExpression(node: ConditionalExpression): Expression {
            if (isDownlevel && (hasAwaitOrYield(node.whenTrue) || hasAwaitOrYield(node.whenFalse))) {
                return rewriteConditionalExpression(node);
            }

            return Visitor.visitConditionalExpression(node);
        }

        function visitYieldExpression(node: YieldExpression): Expression {
            if (isDownlevelGenerator) {
                return rewriteYieldExpression(node);
            }

            return Visitor.visitYieldExpression(node);
        }

        function visitSpreadElementExpression(node: SpreadElementExpression): Expression {
            return node;
        }

        function visitAwaitExpression(node: AwaitExpression): UnaryExpression {
            if (isDownlevel) {
                return rewriteAwaitExpressionDownlevel(node);
            }

            return rewriteAwaitExpressionUplevel(node);
        }

        function visitArrayLiteralExpression(node: ArrayLiteralExpression): LeftHandSideExpression {
            if (isDownlevel && hasAwaitOrYield(node)) {
                return factory.updateArrayLiteralExpression(
                    node,
                    Visitor.visitNodes(node.elements, visitExpression, hasAwaitOrYield, cacheExpression));
            }

            return Visitor.visitArrayLiteralExpression(node);
        }

        function visitObjectLiteralExpression(node: ObjectLiteralExpression): LeftHandSideExpression {
            if (isDownlevel && hasAwaitOrYield(node)) {
                return factory.updateObjectLiteralExpression(
                    node,
                    Visitor.visitNodes(node.properties, visitObjectLiteralElement, hasAwaitOrYield, cacheObjectLiteralElement));
            }

            return Visitor.visitObjectLiteralExpression(node);
        }

        function visitElementAccessExpression(node: ElementAccessExpression): LeftHandSideExpression {
            if (isDownlevel && hasAwaitOrYield(node.argumentExpression)) {
                var object = cacheExpression(visitExpression(node.expression));
                return factory.updateElementAccessExpression(node, object, visitExpression(node.argumentExpression));
            }

            return Visitor.visitElementAccessExpression(node);
        }

        function visitCallExpression(node: CallExpression): LeftHandSideExpression {
            if (isDownlevel && hasAwaitOrYield(node)) {
                var binding = rewriteLeftHandSideOfCallExpression(node.expression);
                var arguments = Visitor.visitNodes(node.arguments, visitExpression, hasAwaitOrYield, cacheExpression);
                var target = binding.target;
                var thisArg = binding.thisArg;
                if (thisArg) {
                    var callArguments: NodeArray<Expression> = factory.createNodeArray([<Expression>thisArg].concat(arguments), node.arguments);
                    var callProperty = factory.createPropertyAccessExpression(target, factory.createIdentifier("call"));
                    var callExpression = factory.createCallExpression(callProperty, callArguments, node);
                    return callExpression;
                } else {
                    var callExpression = factory.createCallExpression(target, arguments, node);
                    return callExpression;
                }
            }

            return Visitor.visitCallExpression(node);
        }

        function visitNewExpression(node: NewExpression): LeftHandSideExpression {
            if (isDownlevel && hasAwaitOrYield(node)) {
                return factory.updateNewExpression(
                    node,
                    cacheExpression(visitExpression(node.expression)),
                    Visitor.visitNodes(node.arguments, visitExpression, hasAwaitOrYield, cacheExpression));
            }

            return Visitor.visitNewExpression(node);
        }

        function visitTaggedTemplateExpression(node: TaggedTemplateExpression): LeftHandSideExpression {
            if (isDownlevel && hasAwaitOrYield(node.template)) {
                return factory.updateTaggedTemplateExpression(node, cacheExpression(visitLeftHandSideExpression(node.tag)), visitTemplateLiteralOrTemplateExpression(node.template));
            }

            return Visitor.visitTaggedTemplateExpression(node);
        }

        function visitTemplateExpression(node: TemplateExpression): TemplateExpression {
            if (isDownlevel && hasAwaitOrYield(node)) {
                return factory.updateTemplateExpression(
                    node,
                    node.head,
                    Visitor.visitNodes(node.templateSpans, visitTemplateSpan, hasAwaitOrYield, cacheTemplateSpan));
            }

            return Visitor.visitTemplateExpression(node);
        }

        function visitFunctionDeclaration(node: FunctionDeclaration): FunctionDeclaration {
            if (isDownlevel) {
                builder.addFunction(node);
                return;
            } 

            // do not call default visitor, we do not need to traverse this function.
            return node;
        }

        function visitVariableStatement(node: VariableStatement): Statement {
            if (isDownlevel) {
                var assignment = rewriteVariableDeclarationList(node.declarationList);
                if (assignment) {
                    return factory.createExpressionStatement(assignment);
                }
            }

            return Visitor.visitVariableStatement(node);
        }

        function visitVariableDeclarationListOrInitializer(node: VariableDeclarationList | Expression): VariableDeclarationList | Expression {
            if (isDownlevel && node.kind === SyntaxKind.VariableDeclarationList) {
                return rewriteVariableDeclarationList(<VariableDeclarationList>node);
            }

            return Visitor.visitVariableDeclarationListOrInitializer(node);
        }

        function visitExpressionStatement(node: ExpressionStatement): Statement {
            if (isDownlevel && isAwaitOrYield(node.expression)) {
                visitExpression(node.expression);
                return;
            }

            return Visitor.visitExpressionStatement(node);
        }

        function visitIfStatement(node: IfStatement): Statement {
            if (isDownlevel && (hasAwaitOrYield(node.thenStatement) || hasAwaitOrYield(node.elseStatement))) {
                rewriteIfStatement(node);
                return;
            }

            return Visitor.visitIfStatement(node);
        }

        function visitDoStatement(node: DoStatement): Statement {
            if (isDownlevel && hasAwaitOrYield(node)) {
                rewriteDoStatement(node);
                return;
            }

            return visitContinueBlockDefault(node, Visitor.visitDoStatement);
        }

        function visitWhileStatement(node: WhileStatement): WhileStatement {
            if (isDownlevel && hasAwaitOrYield(node)) {
                rewriteWhileStatement(node);
                return;
            }

            return visitContinueBlockDefault(node, Visitor.visitWhileStatement);
        }

        function visitForStatement(node: ForStatement): ForStatement {
            if (isDownlevel && (hasAwaitOrYield(node.condition) || hasAwaitOrYield(node.iterator) || hasAwaitOrYield(node.statement))) {
                rewriteForStatement(node);
                return;
            }

            return visitContinueBlockDefault(node, Visitor.visitForStatement);
        }

        function visitForInStatement(node: ForInStatement): ForInStatement {
            if (isDownlevel && hasAwaitOrYield(node.statement)) {
                rewriteForInStatement(node);
                return;
            }

            return visitContinueBlockDefault(node, Visitor.visitForInStatement);
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
            }

            return Visitor.visitReturnStatement(node);
        }

        function visitSwitchStatement(node: SwitchStatement): Statement {
            if (isDownlevel && forEach(node.clauses, hasAwaitOrYield)) {
                rewriteSwitchStatement(node);
                return;
            }

            return visitBreakBlockDefault(node, Visitor.visitSwitchStatement);
        }

        function visitWithStatement(node: WithStatement): Statement {
            return node;
        }

        function visitLabeledStatement(node: LabeledStatement): Statement {
            if (isDownlevel && hasAwaitOrYield(node.statement)) {
                rewriteLabeledStatement(node);
                return;
            }

            return visitBreakBlockDefault(node, Visitor.visitLabeledStatement);
        }

        function visitTryStatement(node: TryStatement): TryStatement {
            if (isDownlevel && hasAwaitOrYield(node)) {
                rewriteTryStatement(node);
                return;
            }

            return Visitor.visitTryStatement(node);
        }

        function visitCatchClause(node: CatchClause): CatchClause {
            if (!node) {
                return;
            }

            // we're not rewriting, so clear any generated name on the symbol
            if (node.symbol) {
                node.symbol.generatedName = undefined;
            }

            return factory.updateCatchClause(node, node.name, visitBlock(node.block));
        }

        function visitBreakBlockDefault<TNode extends Statement>(node: TNode, visitNode: (node: TNode) => TNode): TNode {
            if (isDownlevel) {
                builder.beginScriptBreakBlock(getTarget(node));
            }

            var result = visitNode(node);

            if (isDownlevel) {
                builder.endScriptBreakBlock();
            }

            return result;
        }

        function visitContinueBlockDefault<TNode extends IterationStatement>(node: TNode, visitNode: (node: TNode) => TNode): TNode {
            if (isDownlevel) {
                builder.beginScriptContinueBlock(getTarget(node));
            }

            var result = visitNode(node);

            if (isDownlevel) {
                builder.endScriptContinueBlock();
            }

            return result;
        }

        // expression caching
        function cacheExpression(node: Expression): Identifier {
            var local = builder.declareLocal();
            var assignExpression = factory.createBinaryExpression(SyntaxKind.EqualsToken, local, node);
            builder.emit(OpCode.Statement, factory.createExpressionStatement(assignExpression));
            return local;
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

        function cacheTemplateSpan(node: TemplateSpan): TemplateSpan {
            return factory.updateTemplateSpan(node, cacheExpression(node.expression), node.literal);
        }

        // rewriting
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

        function rewriteLeftHandSideOfCallExpression(node: Expression): CallBinding {
            switch (node.kind) {
                case SyntaxKind.PropertyAccessExpression:
                    return rewriteLeftHandSidePropertyAccessExpressionOfCallExpression(<PropertyAccessExpression>node);

                case SyntaxKind.ElementAccessExpression:
                    return rewriteLeftHandSideElementAccessExpressionOfCallExpression(<ElementAccessExpression>node);

                default:
                    return { target: cacheExpression(visitExpression(node)) };
            }
        }

        function rewriteLeftHandSideElementAccessExpressionOfCallExpression(node: ElementAccessExpression): CallBinding {
            var thisArg = cacheExpression(visitLeftHandSideExpression(node.expression));
            var target = builder.declareLocal();
            var index = visitExpression(node.argumentExpression);
            var indexedAccess = factory.createElementAccessExpression(thisArg, index, node);
            var assignExpression = factory.createBinaryExpression(SyntaxKind.EqualsToken, target, indexedAccess);
            builder.writeLocation(node);
            builder.emit(OpCode.Statement, factory.createExpressionStatement(assignExpression));
            return { target, thisArg };
        }

        function rewriteLeftHandSidePropertyAccessExpressionOfCallExpression(node: PropertyAccessExpression): CallBinding {
            var thisArg = cacheExpression(visitLeftHandSideExpression(node.expression));
            var target = builder.declareLocal();
            var property = factory.createIdentifier(node.name.text);
            var propertyAccess = factory.createPropertyAccessExpression(thisArg, property, node);
            var assignExpression = factory.createBinaryExpression(SyntaxKind.EqualsToken, target, propertyAccess);
            builder.writeLocation(node);
            builder.emit(OpCode.Statement, factory.createExpressionStatement(assignExpression));
            return { target, thisArg };
        }

        function rewriteVariableDeclarationList(node: VariableDeclarationList): Expression {
            var declarations = node.declarations;
            var assignments = map(declarations, rewriteVariableDeclaration);
            assignments = filter<BinaryExpression>(assignments, nodeIsPresent);
            var assignment = reduceRight(assignments, mergeAssignments);
            if (assignment) {
                if (node.parent.kind === SyntaxKind.ForInStatement) {
                    builder.emit(OpCode.Statement, factory.createExpressionStatement(assignment));

                }

                return assignment;
            }
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
            rewriteBlockOrStatement(node.thenStatement);
            if (node.elseStatement) {
                builder.emit(OpCode.Break, resumeLabel);
                builder.markLabel(elseLabel);
                rewriteBlockOrStatement(node.elseStatement);
            }
            builder.markLabel(resumeLabel);
        }

        function rewriteDoStatement(node: DoStatement): void {
            var bodyLabel = builder.defineLabel();
            var conditionLabel = builder.defineLabel();
            var endLabel = builder.beginContinueBlock(conditionLabel, getTarget(node));
            builder.markLabel(bodyLabel);
            rewriteBlockOrStatement(node.statement);
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
            rewriteBlockOrStatement(node.statement);
            builder.emit(OpCode.Break, conditionLabel);
            builder.endContinueBlock();
        }

        function rewriteForStatement(node: ForStatement): void {
            var conditionLabel = builder.defineLabel();
            var iteratorLabel = builder.defineLabel();
            var endLabel = builder.beginContinueBlock(iteratorLabel, getTarget(node));
            var initializer = <Expression>nodeVisitor.visitVariableDeclarationListOrInitializer(node.initializer);
            if (initializer) {
                builder.writeLocation(node.initializer);
                builder.emit(OpCode.Statement, factory.createExpressionStatement(initializer));
            }
            builder.markLabel(conditionLabel);
            if (node.condition) {
                builder.emit(OpCode.BrFalse, endLabel, visitExpression(node.condition));
            }
            rewriteBlockOrStatement(node.statement);
            builder.markLabel(iteratorLabel);
            if (node.iterator) {
                builder.emit(OpCode.Statement, factory.createExpressionStatement(visitExpression(node.iterator)));
            }
            builder.emit(OpCode.Break, conditionLabel);
            builder.endContinueBlock();
        }

        function rewriteForInStatement(node: ForInStatement): void {
            var variable = <Expression>nodeVisitor.visitVariableDeclarationListOrInitializer(node.initializer);
            while (variable.kind === SyntaxKind.BinaryExpression) {
                variable = (<BinaryExpression>variable).left;
            }

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
            var forTempInExpressionStatement = factory.createForInStatement(tempLocal, visitExpression(node.expression), assignKeyStatement);
            builder.emit(OpCode.Statement, forTempInExpressionStatement);
            var initializeTempExpression = factory.createBinaryExpression(SyntaxKind.EqualsToken, tempLocal, factory.createNumericLiteral(0));
            builder.emit(OpCode.Statement, factory.createExpressionStatement(initializeTempExpression));
            var conditionExpression = factory.createBinaryExpression(SyntaxKind.LessThanToken, tempLocal, keysLengthExpression);
            builder.markLabel(conditionLabel);
            builder.emit(OpCode.BrFalse, endLabel, conditionExpression);
            var readKeyExpression = factory.createElementAccessExpression(keysLocal, tempLocal);
            var assignVariableExpression = factory.createBinaryExpression(SyntaxKind.EqualsToken, variable, readKeyExpression);
            builder.writeLocation(node.initializer);
            builder.emit(OpCode.Statement, factory.createExpressionStatement(assignVariableExpression, variable));
            rewriteBlockOrStatement(node.statement);
            builder.markLabel(iteratorLabel);
            var incrementTempExpression = factory.createPostfixUnaryExpression(SyntaxKind.PlusPlusToken, tempLocal);
            builder.writeLocation(node.initializer);
            builder.emit(OpCode.Statement, factory.createExpressionStatement(incrementTempExpression, variable));
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
                if (lastClauseOffset < clauseIndex) {
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
            rewriteBlockOrStatement(node.statement);
            if (statementSupportsBreak) {
                builder.endBreakBlock();
            }
        }

        function rewriteTryStatement(node: TryStatement): void {
            var endLabel = builder.beginExceptionBlock();
            rewriteBlock(node.tryBlock);
            if (node.catchClause) {
                var variable = builder.declareLocal(/*name*/ undefined, /*globallyUnique*/ true);
                
                // rename the symbol for the catch clause
                if (node.catchClause.symbol) {
                    node.catchClause.symbol.generatedName = variable.text;
                }

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

        function rewriteStatements(statements: Statement[]): void {
            for (var i = 0; i < statements.length; i++) {
                var statement = statements[i];
                rewriteStatement(statement);
            }
        }

        function rewriteBlockOrStatement(node: Statement): void {
            if (!node) {
                return;
            }

            switch (node.kind) {
                case SyntaxKind.Block:
                    return rewriteBlock(<Block>node);

                default:
                    return rewriteStatement(node);
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

            var visited = visitStatement(node);
            if (visited) {
                builder.writeLocation(node);
                builder.emit(OpCode.Statement, visited);
            }
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
            generatorFunction.asteriskToken = factory.createTokenNode(SyntaxKind.AsteriskToken);
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
                builder = createAsyncFunctionGenerator(locals, promiseConstructor);
            }
            else {
                builder = createFunctionGenerator(locals);
            }

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

        function mergeAssignments(left: BinaryExpression, right: BinaryExpression): BinaryExpression {
            return factory.createBinaryExpression(SyntaxKind.CommaToken, left, right);
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
    }
}