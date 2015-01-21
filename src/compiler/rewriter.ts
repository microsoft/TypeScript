/// <reference path="types.ts"/>
/// <reference path="core.ts"/>
/// <reference path="scanner.ts"/>
/// <reference path="parser.ts"/>
/// <reference path="factory.ts"/>
/// <reference path="generator.ts"/>

// TODO(rbuckton): do we need to rewrite around `arguments` or disallow `arguments` in async/generator?
// TODO(rbuckton): do we need to rewrite around computed properties?
module ts {
    interface CallBinding {
        target?: Identifier;
        thisArg?: Identifier;
    }

    export function rewriteBindingElement(root: BindingElement, locals: LocalsBuilder, value?: Expression): VariableDeclaration[] {
        var variableDeclarations: VariableDeclaration[];
        var isDeclaration = root.kind === SyntaxKind.VariableDeclaration && !(getCombinedNodeFlags(root) & NodeFlags.Export) || root.kind === SyntaxKind.Parameter;
        rewriteBindingElementCore(root, value);
        return variableDeclarations;

        function rewriteBindingElementCore(node: BindingElement, value: Expression): void {
            if (node.initializer) {
                // Combine value and initializer
                value = value ? locals.getValueOrDefault(value, node.initializer, writeDeclaration) : node.initializer;
            }
            else if (!value) {
                // Use 'void 0' in absence of value and initializer
                value = Factory.createVoidZero();
            }

            if (isBindingPattern(node.name)) {
                var pattern = <BindingPattern>node.name;
                var elements = pattern.elements;
                if (elements.length !== 1) {
                    // For anything but a single element destructuring we need to generate a temporary
                    // to ensure value is evaluated exactly once.
                    value = locals.ensureIdentifier(value, writeDeclaration);
                }
                for (var i = 0; i < elements.length; i++) {
                    var element = elements[i];
                    if (pattern.kind === SyntaxKind.ObjectBindingPattern) {
                        // Rewrite element to a declaration with an initializer that fetches property
                        var propName = element.propertyName || <Identifier>element.name;
                        rewriteBindingElementCore(element, Factory.createPropertyOrElementAccessExpression(Factory.makeLeftHandSideExpression(value), propName));
                    }
                    else if (element.kind !== SyntaxKind.OmittedExpression) {
                        if (!element.dotDotDotToken) {
                            // Rewrite element to a declaration that accesses array element at index i
                            rewriteBindingElementCore(element, Factory.createElementAccessExpression(Factory.makeLeftHandSideExpression(value), Factory.createNumericLiteral(i)));
                        }
                        else if (i === elements.length - 1) {
                            value = locals.ensureIdentifier(value, writeDeclaration);
                            var name = <Identifier>element.name;
                            var sliceExpression = Factory.createPropertyAccessExpression(Factory.makeLeftHandSideExpression(value), Factory.createIdentifier("slice"));
                            var callExpression = Factory.createCallExpression(sliceExpression, [Factory.createNumericLiteral(i)]);
                            writeAssignment(name, callExpression);
                        }
                    }
                }
            }
            else {
                var name = <Identifier>node.name;
                writeAssignment(name, value);
            }
        }

        function writeDeclaration(left: Identifier, right: Expression): void {
            if (!isDeclaration) {
                locals.recordVariable(left);
            }
            writeAssignment(left, right);
        }

        function writeAssignment(left: Identifier, right: Expression): void {
            if (!variableDeclarations) {
                variableDeclarations = [];
            }

            var variableDeclaration = Factory.createVariableDeclaration(left, right);
            if (root.kind === SyntaxKind.VariableDeclaration &&
                left.parent &&
                (left.parent.kind === SyntaxKind.VariableDeclaration || left.parent.kind === SyntaxKind.BindingElement)) {
                if (getCombinedNodeFlags(left.parent) & NodeFlags.Export) {
                    variableDeclaration.parent = (<VariableDeclaration>root).parent;
                    variableDeclaration.flags |= NodeFlags.Export;
                }
            }
            variableDeclarations.push(variableDeclaration);
        }
    }

    export function rewriteDestructuring(root: BinaryExpression, locals: LocalsBuilder): BinaryExpression {
        var mergedAssignments: BinaryExpression;
        return rewriteWorker();

        function writeDeclaration(left: Identifier, right: Expression): void {
            locals.recordVariable(left);
            writeAssignment(left, right);
        }

        function writeAssignment(left: Identifier, right: Expression): void {
            var assignmentExpression = Factory.createBinaryExpression(SyntaxKind.EqualsToken, left, right);
            if (mergedAssignments) {
                mergedAssignments = Factory.createBinaryExpression(
                    SyntaxKind.CommaToken,
                    mergedAssignments,
                    assignmentExpression);
            }
            else {
                mergedAssignments = assignmentExpression;
            }
        }

        function getLeftHandSideOfDestructuringAssignment(node: BinaryExpression): Expression {
            if (node.operator === SyntaxKind.EqualsToken) {
                var left = node.left;
                while (left.kind === SyntaxKind.ParenthesizedExpression) {
                    left = (<ParenthesizedExpression>left).expression;
                }
                switch (left.kind) {
                    case SyntaxKind.ObjectLiteralExpression:
                    case SyntaxKind.ArrayLiteralExpression:
                        return left;
                }
            }
        }

        function rewriteDestructuringAssignment(target: Expression, value: Expression): void {
            if (target.kind === SyntaxKind.BinaryExpression && (<BinaryExpression>target).operator === SyntaxKind.EqualsToken) {
                value = locals.getValueOrDefault(value, (<BinaryExpression>target).right, writeDeclaration);
                target = (<BinaryExpression>target).left;
            }
            if (target.kind === SyntaxKind.ObjectLiteralExpression) {
                rewriteObjectLiteralAssignment(<ObjectLiteralExpression>target, value);
            }
            else if (target.kind === SyntaxKind.ArrayLiteralExpression) {
                rewriteArrayLiteralAssignment(<ArrayLiteralExpression>target, value);
            }
            else {
                writeAssignment(<Identifier>target, value);
            }
        }

        function rewriteObjectLiteralAssignment(target: ObjectLiteralExpression, value: Expression): void {
            var properties = target.properties;
            if (properties.length !== 1) {
                // For anything but a single element destructuring we need to generate a temporary
                // to ensure value is evaluated exactly once.
                value = locals.ensureIdentifier(value, writeDeclaration);
            }
            for (var i = 0; i < properties.length; i++) {
                var p = properties[i];
                if (p.kind === SyntaxKind.PropertyAssignment || p.kind === SyntaxKind.ShorthandPropertyAssignment) {
                    // TODO(andersh): Computed property support
                    var propName = <Identifier>((<PropertyAssignment>p).name);
                    rewriteDestructuringAssignment((<PropertyAssignment>p).initializer || propName, Factory.createPropertyOrElementAccessExpression(Factory.makeLeftHandSideExpression(value), propName));
                }
            }
        }

        function rewriteArrayLiteralAssignment(target: ArrayLiteralExpression, value: Expression): void {
            var elements = target.elements;
            if (elements.length !== 1) {
                // For anything but a single element destructuring we need to generate a temporary
                // to ensure value is evaluated exactly once.
                value = locals.ensureIdentifier(value, writeDeclaration);
            }
            for (var i = 0; i < elements.length; i++) {
                var e = elements[i];
                if (e.kind !== SyntaxKind.OmittedExpression) {
                    if (e.kind !== SyntaxKind.SpreadElementExpression) {
                        rewriteDestructuringAssignment(e, Factory.createElementAccessExpression(Factory.makeLeftHandSideExpression(value), Factory.createNumericLiteral(i)));
                    }
                    else {
                        if (i === elements.length - 1) {
                            value = locals.ensureIdentifier(value, writeDeclaration);
                            var sliceExpression = Factory.createPropertyAccessExpression(Factory.makeLeftHandSideExpression(value), Factory.createIdentifier("slice"));
                            var callExpression = Factory.createCallExpression(sliceExpression, [Factory.createNumericLiteral(i)]);
                            writeAssignment(<Identifier>(<SpreadElementExpression>e).expression, callExpression);
                        }
                    }
                }
            }
        }

        function rewriteWorker(): BinaryExpression {
            var target = getLeftHandSideOfDestructuringAssignment(root);
            var value = root.right;
            if (root.parent.kind === SyntaxKind.ExpressionStatement) {
                rewriteDestructuringAssignment(target, value);
            }
            else {
                value = locals.ensureIdentifier(value, writeDeclaration);
                rewriteDestructuringAssignment(target, value);
                mergedAssignments = Factory.createBinaryExpression(
                    SyntaxKind.CommaToken,
                    mergedAssignments,
                    value);
            }
            return mergedAssignments;
        }
    }

    export function rewriteSpreadElementInArrayLiteral(node: ArrayLiteralExpression): LeftHandSideExpression {
        var segments: Expression[];
        var elements = node.elements;
        var length = elements.length;
        var start = 0;
        for (var i = 0; i < length; i++) {
            var element = elements[i];
            if (element.kind === SyntaxKind.SpreadElementExpression) {
                if (!segments) {
                    segments = [];
                }
                if (i > start) {
                    segments.push(Factory.createArrayLiteralExpression(elements.slice(start, i)));
                }
                segments.push((<SpreadElementExpression>element).expression);
                start = i + 1;
            }
        }
        if (!segments) {
            return node;
        }
        if (start < length) {
            segments.push(Factory.createArrayLiteralExpression(elements.slice(start, length)));
        }

        // Rewrite using the pattern <segment0>.concat(<segment1>, <segment2>, ...)
        if (segments.length === 1) {
            return Factory.makeLeftHandSideExpression(segments[0]);
        }

        var head = Factory.makeLeftHandSideExpression(segments.shift());
        var concatExpression = Factory.createPropertyAccessExpression(head, Factory.createIdentifier("concat"));
        var callExpression = Factory.createCallExpression(concatExpression, segments, node);
        return callExpression;
    }

    export function rewriteAsyncFunctionUplevel(node: FunctionLikeDeclaration, resolver: EmitResolver, locals: LocalsBuilder): FunctionLikeDeclaration {
        var nodeVisitor = Visitor.create({
            visitAwaitExpression,
            visitArrowFunction: Visitor.ignore,
            visitFunctionExpression: Visitor.ignore,
            visitFunctionDeclaration: Visitor.ignore,
            visitGetAccessor: Visitor.ignore,
            visitSetAccessor: Visitor.ignore,
            visitMethodDeclaration: Visitor.ignore
        });

        return rewriteWorker();

        function visitExpressionStatement(node: ExpressionStatement): Statement {
            var expression = Visitor.visitExpression(node.expression);
            if (nodeIsGenerated(expression) && expression.kind === SyntaxKind.ParenthesizedExpression) {
                expression = (<ParenthesizedExpression>expression).expression;
            }
            return Factory.updateExpressionStatement(node, expression);
        }

        function visitAwaitExpression(node: AwaitExpression): UnaryExpression {
            var yieldExpression = Factory.createYieldExpression(node.expression, node);
            return Factory.makeLeftHandSideExpression(yieldExpression);
        }

        function rewriteWorker(): FunctionLikeDeclaration {
            var promiseConstructor = resolver.getPromiseConstructor(node);
            if (node.body.kind === SyntaxKind.Block) {
                var block = <Block>node.body;
                var statements = Factory.createNodeArray(map(block.statements, nodeVisitor.visitStatement), block.statements);
            } else {
                var expression = nodeVisitor.visitExpression(<Expression>node.body);
                var returnStatement = Factory.createReturnStatement(expression, node.body);
                var statements = Factory.createNodeArray<Statement>([returnStatement]);
            }

            var resolve = locals.createUniqueIdentifier("_resolve");
            var generatorFunctionBody = Factory.createBlock(statements);
            var generatorFunction = Factory.createFunctionExpression(/*name*/ undefined, generatorFunctionBody, []);
            generatorFunction.asteriskToken = Factory.createTokenNode(SyntaxKind.AsteriskToken);
            var callGeneratorFunction = Factory.createCallExpression(generatorFunction, []);
            var awaiterCallExpression = Factory.createCallExpression(Factory.createIdentifier("__awaiter"), [callGeneratorFunction]);
            var resolveCallExpression = Factory.createCallExpression(resolve, [awaiterCallExpression]);
            var resolveCallStatement = Factory.createExpressionStatement(resolveCallExpression);
            var initFunctionBody = Factory.createBlock([resolveCallStatement]);
            var initFunctionExpression = Factory.createFunctionExpression(/*name*/ undefined, initFunctionBody, [Factory.createParameterDeclaration(resolve)]);
            var newPromiseExpression = Factory.createNewExpression(Factory.getExpressionForEntityName(promiseConstructor), [initFunctionExpression]);
            var returnStatement = Factory.createReturnStatement(newPromiseExpression);
            var block = Factory.createBlock([returnStatement], statements);
            var func = Factory.updateFunctionLikeDeclaration(node, node.name, block, node.parameters);
            func.id = node.id;
            func.parent = node.parent;
            return func;
        }
    }

    export function rewriteAsyncFunctionDownlevel(node: FunctionLikeDeclaration, resolver: EmitResolver, locals: LocalsBuilder): FunctionLikeDeclaration {
        var builder = createAsyncFunctionGenerator(locals, resolver.getPromiseConstructor(node));
        return rewriteAsyncOrGeneratorFunctionDownlevel(node, resolver, locals, builder);
    }

    export function rewriteGeneratorFunctionDownlevel(node: FunctionLikeDeclaration, resolver: EmitResolver, locals: LocalsBuilder): FunctionLikeDeclaration {
        var builder = createGeneratorFunctionGenerator(locals);
        return rewriteAsyncOrGeneratorFunctionDownlevel(node, resolver, locals, builder);
    }

    function rewriteAsyncOrGeneratorFunctionDownlevel(node: FunctionLikeDeclaration, resolver: EmitResolver, locals: LocalsBuilder, builder: FunctionGenerator): FunctionLikeDeclaration {
        var builder: FunctionGenerator;
        var nodeVisitor: Visitor;
        var isAsync = (node.flags & NodeFlags.Async) !== 0;
        var isGenerator = !!node.asteriskToken;

        if (!isAsync && !isGenerator) {
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
            visitParenthesizedExpression,
            visitFunctionDeclaration,
            visitVariableStatement,
            visitVariableDeclarationListOrExpression,
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
            visitFunctionExpression: Visitor.ignore,
            visitArrowFunction: Visitor.ignore,
            visitGetAccessor: Visitor.ignore,
            visitSetAccessor: Visitor.ignore,
            visitMethodDeclaration: Visitor.ignore
        });

        return rewriteWorker();

        // visitors
        function visitBinaryExpression(node: BinaryExpression): Expression {
            if (hasAwaitOrYield(node)) {
                return rewriteBinaryExpression(node);
            }

            return Visitor.visitBinaryExpression(node);
        }

        function visitConditionalExpression(node: ConditionalExpression): Expression {
            if (hasAwaitOrYield(node.whenTrue) || hasAwaitOrYield(node.whenFalse)) {
                return rewriteConditionalExpression(node);
            }

            return Visitor.visitConditionalExpression(node);
        }

        function visitYieldExpression(node: YieldExpression): Expression {
            if (isGenerator) {
                return rewriteYieldExpression(node);
            }

            return Visitor.visitYieldExpression(node);
        }

        function visitSpreadElementExpression(node: SpreadElementExpression): Expression {
            return node;
        }

        function visitAwaitExpression(node: AwaitExpression): UnaryExpression {
            return rewriteAwaitExpression(node);
        }

        function visitArrayLiteralExpression(node: ArrayLiteralExpression): LeftHandSideExpression {
            if (hasAwaitOrYield(node)) {
                var rewritten = rewriteSpreadElementInArrayLiteral(node);
                if (rewritten !== node) {
                    return nodeVisitor.visitLeftHandSideExpression(rewritten);
                }

                return Factory.updateArrayLiteralExpression(
                    node,
                    Visitor.visitNodes(node.elements, nodeVisitor.visitExpression, hasAwaitOrYield, cacheExpression));
            }

            return Visitor.visitArrayLiteralExpression(node);
        }

        function visitObjectLiteralExpression(node: ObjectLiteralExpression): LeftHandSideExpression {
            if (hasAwaitOrYield(node)) {
                return Factory.updateObjectLiteralExpression(
                    node,
                    Visitor.visitNodes(node.properties, nodeVisitor.visitObjectLiteralElement, hasAwaitOrYield, cacheObjectLiteralElement));
            }

            return Visitor.visitObjectLiteralExpression(node);
        }

        function visitElementAccessExpression(node: ElementAccessExpression): LeftHandSideExpression {
            if (hasAwaitOrYield(node.argumentExpression)) {
                var object = cacheExpression(nodeVisitor.visitExpression(node.expression));
                return Factory.updateElementAccessExpression(node, object, nodeVisitor.visitExpression(node.argumentExpression));
            }

            return Visitor.visitElementAccessExpression(node);
        }

        function visitCallExpression(node: CallExpression): LeftHandSideExpression {
            if (hasAwaitOrYield(node)) {
                var binding = rewriteLeftHandSideOfCallExpression(node.expression);
                var arguments = Visitor.visitNodes(node.arguments, nodeVisitor.visitExpression, hasAwaitOrYield, cacheExpression);
                var target = binding.target;
                var thisArg = binding.thisArg;
                if (thisArg) {
                    var callArguments: NodeArray<Expression> = Factory.createNodeArray([<Expression>thisArg].concat(arguments), node.arguments);
                    var callProperty = Factory.createPropertyAccessExpression(target, Factory.createIdentifier("call"));
                    var callExpression = Factory.createCallExpression(callProperty, callArguments, node);
                    return callExpression;
                } else {
                    var callExpression = Factory.createCallExpression(target, arguments, node);
                    return callExpression;
                }
            }

            return Visitor.visitCallExpression(node);
        }

        function visitNewExpression(node: NewExpression): LeftHandSideExpression {
            if (hasAwaitOrYield(node)) {
                return Factory.updateNewExpression(
                    node,
                    cacheExpression(nodeVisitor.visitExpression(node.expression)),
                    Visitor.visitNodes(node.arguments, nodeVisitor.visitExpression, hasAwaitOrYield, cacheExpression));
            }

            return Visitor.visitNewExpression(node);
        }

        function visitTaggedTemplateExpression(node: TaggedTemplateExpression): LeftHandSideExpression {
            if (hasAwaitOrYield(node.template)) {
                return Factory.updateTaggedTemplateExpression(node, cacheExpression(nodeVisitor.visitLeftHandSideExpression(node.tag)), nodeVisitor.visitTemplateLiteralOrTemplateExpression(node.template));
            }

            return Visitor.visitTaggedTemplateExpression(node);
        }

        function visitTemplateExpression(node: TemplateExpression): TemplateExpression {
            if (hasAwaitOrYield(node)) {
                return Factory.updateTemplateExpression(
                    node,
                    node.head,
                    Visitor.visitNodes(node.templateSpans, nodeVisitor.visitTemplateSpan, hasAwaitOrYield, cacheTemplateSpan));
            }

            return Visitor.visitTemplateExpression(node);
        }

        function visitParenthesizedExpression(node: ParenthesizedExpression): LeftHandSideExpression {
            if (hasAwaitOrYield(node)) {
                return rewriteParenthesizedExpression(node);
            }
            return Visitor.visitParenthesizedExpression(node);
        }

        function visitFunctionDeclaration(node: FunctionDeclaration): FunctionDeclaration {
            builder.addFunction(node);
            return;
        }

        function visitVariableStatement(node: VariableStatement): Statement {
            var assignment = rewriteVariableDeclarationList(node.declarationList);
            if (assignment) {
                return Factory.createExpressionStatement(assignment);
            }
            return;
        }

        function visitVariableDeclarationListOrExpression(node: VariableDeclarationList | Expression): VariableDeclarationList | Expression {
            if (node.kind === SyntaxKind.VariableDeclarationList) {
                return rewriteVariableDeclarationList(<VariableDeclarationList>node);
            }

            return Visitor.visitVariableDeclarationListOrExpression(node);
        }

        function visitExpressionStatement(node: ExpressionStatement): Statement {
            if (hasAwaitOrYield(node.expression)) {                
                rewriteExpressionStatement(node);
                return;
            }

            return Visitor.visitExpressionStatement(node);
        }

        function visitIfStatement(node: IfStatement): Statement {
            if (hasAwaitOrYield(node.thenStatement) || hasAwaitOrYield(node.elseStatement)) {
                rewriteIfStatement(node);
                return;
            }

            return Visitor.visitIfStatement(node);
        }

        function visitDoStatement(node: DoStatement): Statement {
            if (hasAwaitOrYield(node)) {
                rewriteDoStatement(node);
                return;
            }

            return defaultVisitContinueBlock(node, Visitor.visitDoStatement);
        }

        function visitWhileStatement(node: WhileStatement): WhileStatement {
            if (hasAwaitOrYield(node)) {
                rewriteWhileStatement(node);
                return;
            }

            return defaultVisitContinueBlock(node, Visitor.visitWhileStatement);
        }

        function visitForStatement(node: ForStatement): ForStatement {
            if (hasAwaitOrYield(node.condition) || hasAwaitOrYield(node.iterator) || hasAwaitOrYield(node.statement)) {
                rewriteForStatement(node);
                return;
            }

            return defaultVisitContinueBlock(node, Visitor.visitForStatement);
        }

        function visitForInStatement(node: ForInStatement): ForInStatement {
            if (hasAwaitOrYield(node.statement)) {
                rewriteForInStatement(node);
                return;
            }

            return defaultVisitContinueBlock(node, Visitor.visitForInStatement);
        }

        function visitBreakStatement(node: BreakOrContinueStatement): Statement {
            var label = builder.findBreakTarget(getTarget(node));
            if (label > 0) {
                builder.writeLocation(node);
                return builder.createInlineBreak(label);
            }
            return Visitor.visitBreakStatement(node);
        }

        function visitContinueStatement(node: BreakOrContinueStatement): Statement {
            var label = builder.findContinueTarget(getTarget(node));
            if (label > 0) {
                builder.writeLocation(node);
                return builder.createInlineBreak(label);
            }
            return Visitor.visitContinueStatement(node);
        }

        function visitReturnStatement(node: ReturnStatement): Statement {
            var expression = nodeVisitor.visitExpression(node.expression);
            builder.writeLocation(node);
            return builder.createInlineReturn(expression);
        }

        function visitSwitchStatement(node: SwitchStatement): Statement {
            if (forEach(node.clauses, hasAwaitOrYield)) {
                rewriteSwitchStatement(node);
                return;
            }

            return defaultVisitBreakBlock(node, Visitor.visitSwitchStatement, /*requireLabel*/ false);
        }

        function visitWithStatement(node: WithStatement): Statement {
            if (hasAwaitOrYield(node.statement)) {
                Debug.fail("with statements cannot contain 'await' or 'yield' expressions.");
                return;
            }

            return Visitor.visitWithStatement(node);
        }

        function visitLabeledStatement(node: LabeledStatement): Statement {
            if (hasAwaitOrYield(node.statement)) {
                rewriteLabeledStatement(node);
                return;
            }

            return defaultVisitBreakBlock(node, Visitor.visitLabeledStatement, /*requireLabel*/ true);
        }

        function visitTryStatement(node: TryStatement): TryStatement {
            if (hasAwaitOrYield(node)) {
                rewriteTryStatement(node);
                return;
            }

            return Visitor.visitTryStatement(node);
        }

        function visitCatchClause(node: CatchClause): CatchClause {
            // we're not rewriting, so clear any generated name on the symbol
            if (node.symbol) {
                node.symbol.generatedName = undefined;
            }

            return Visitor.visitCatchClause(node);
        }

        function defaultVisitBreakBlock<TNode extends Statement>(node: TNode, visitNode: (node: TNode) => TNode, requireLabel: boolean): TNode {
            builder.beginScriptBreakBlock(getTarget(node), requireLabel);
            var result = visitNode(node);
            builder.endScriptBreakBlock();
            return result;
        }

        function defaultVisitContinueBlock<TNode extends IterationStatement>(node: TNode, visitNode: (node: TNode) => TNode): TNode {
            builder.beginScriptContinueBlock(getTarget(node));
            var result = visitNode(node);
            builder.endScriptContinueBlock();
            return result;
        }

        // expression caching
        function cacheExpression(node: Expression): Identifier {
            var local = builder.declareLocal();
            var assignExpression = Factory.createBinaryExpression(SyntaxKind.EqualsToken, local, node);
            builder.emit(OpCode.Statement, Factory.createExpressionStatement(assignExpression));
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
            return Factory.updatePropertyAssignment(node, node.name, cacheExpression(node.initializer));
        }

        function cacheShorthandPropertyAssignment(node: ShorthandPropertyAssignment): ObjectLiteralElement {
            return Factory.createPropertyAssignment(Factory.createIdentifier(node.name.text), cacheExpression(node.name));
        }

        function cacheTemplateSpan(node: TemplateSpan): TemplateSpan {
            return Factory.updateTemplateSpan(node, cacheExpression(node.expression), node.literal);
        }

        // rewriting
        function rewriteBinaryExpression(node: BinaryExpression): Expression {
            if (isLogicalBinary(node)) {
                if (hasAwaitOrYield(node.right)) {
                    return rewriteLogicalBinaryExpression(node);
                }
            }
            else if (isDestructuringAssignment(node)) {
                return rewriteDestructuringAssignment(node);
            }
            else if (isAssignment(node)) {
                if (hasAwaitOrYield(node.right)) {
                    return rewriteAssignmentExpression(node);
                }
            }
            else if (node.operator === SyntaxKind.CommaToken) {
                return rewriteCommaExpression(node);
            }
            else if (hasAwaitOrYield(node.right)) {
                return Factory.updateBinaryExpression(node, cacheExpression(nodeVisitor.visitExpression(node.left)), nodeVisitor.visitExpression(node.right));
            }

            return Visitor.visitBinaryExpression(node);
        }

        function rewriteLogicalBinaryExpression(node: BinaryExpression): Expression {
            var resumeLabel = builder.defineLabel();
            var resultLocal = builder.declareLocal();
            var code = node.operator === SyntaxKind.AmpersandAmpersandToken ? OpCode.BrFalse : OpCode.BrTrue;
            builder.writeLocation(node.left);
            builder.emit(OpCode.Assign, resultLocal, nodeVisitor.visitExpression(node.left));
            builder.emit(code, resumeLabel, resultLocal);
            builder.writeLocation(node.right);
            builder.emit(OpCode.Assign, resultLocal, nodeVisitor.visitExpression(node.right));
            builder.markLabel(resumeLabel);
            return resultLocal;
        }

        function rewriteCommaExpression(node: BinaryExpression): Expression {
            var expressions = flattenCommaExpression(node);
            var merged: Expression;
            for (var i = 0; i < expressions.length; i++) {
                var expression = expressions[i];
                if (hasAwaitOrYield(expression) && merged) {
                    builder.emit(OpCode.Statement, Factory.createExpressionStatement(merged));
                    merged = undefined;
                }
                var visited = nodeVisitor.visitExpression(expression);
                if (merged) {
                    merged = Factory.createBinaryExpression(
                        SyntaxKind.CommaToken,
                        merged,
                        visited);
                }
                else {
                    merged = visited;
                }
            }
            return merged;
        }

        function rewriteDestructuringAssignment(node: BinaryExpression): Expression {
            var destructured = rewriteDestructuring(node, locals);
            var rewritten = nodeVisitor.visitBinaryExpression(destructured);
            if (needsParenthesis(node)) {
                return Factory.makeLeftHandSideExpression(rewritten);
            }
            return rewritten;
        }

        function rewriteAssignmentExpression(node: BinaryExpression): Expression {
            return Factory.updateBinaryExpression(node, rewriteLeftHandSideOfAssignmentExpression(node.left), nodeVisitor.visitExpression(node.right));
        }

        function rewriteLeftHandSideOfAssignmentExpression(node: Expression): Expression {
            switch (node.kind) {
                case SyntaxKind.ElementAccessExpression:
                    return rewriteLeftHandSideElementAccessExpressionOfAssignmentExpression(<ElementAccessExpression>node);

                case SyntaxKind.PropertyAccessExpression:
                    return rewriteLeftHandSidePropertyAccessExpressionOfAssignmentExpression(<PropertyAccessExpression>node);

                default:
                    return nodeVisitor.visitExpression(node);
            }
        }

        function rewriteLeftHandSideElementAccessExpressionOfAssignmentExpression(node: ElementAccessExpression): ElementAccessExpression {
            return Factory.updateElementAccessExpression(
                node,
                cacheExpression(nodeVisitor.visitLeftHandSideExpression(node.expression)),
                cacheExpression(nodeVisitor.visitExpression(node.argumentExpression)));
        }

        function rewriteLeftHandSidePropertyAccessExpressionOfAssignmentExpression(node: PropertyAccessExpression): PropertyAccessExpression {
            return Factory.updatePropertyAccessExpression(
                node,
                cacheExpression(nodeVisitor.visitLeftHandSideExpression(node.expression)),
                node.name);
        }

        function rewriteLeftHandSideOfCallExpression(node: Expression): CallBinding {
            switch (node.kind) {
                case SyntaxKind.PropertyAccessExpression:
                    return rewriteLeftHandSidePropertyAccessExpressionOfCallExpression(<PropertyAccessExpression>node);

                case SyntaxKind.ElementAccessExpression:
                    return rewriteLeftHandSideElementAccessExpressionOfCallExpression(<ElementAccessExpression>node);

                default:
                    return { target: cacheExpression(nodeVisitor.visitExpression(node)) };
            }
        }

        function rewriteLeftHandSideElementAccessExpressionOfCallExpression(node: ElementAccessExpression): CallBinding {
            var thisArg = cacheExpression(nodeVisitor.visitLeftHandSideExpression(node.expression));
            var target = builder.declareLocal();
            var index = nodeVisitor.visitExpression(node.argumentExpression);
            var indexedAccess = Factory.createElementAccessExpression(thisArg, index, node);
            var assignExpression = Factory.createBinaryExpression(SyntaxKind.EqualsToken, target, indexedAccess);
            builder.writeLocation(node);
            builder.emit(OpCode.Statement, Factory.createExpressionStatement(assignExpression));
            return { target, thisArg };
        }

        function rewriteLeftHandSidePropertyAccessExpressionOfCallExpression(node: PropertyAccessExpression): CallBinding {
            var thisArg = cacheExpression(nodeVisitor.visitLeftHandSideExpression(node.expression));
            var target = builder.declareLocal();
            var property = Factory.createIdentifier(node.name.text);
            var propertyAccess = Factory.createPropertyAccessExpression(thisArg, property, node);
            var assignExpression = Factory.createBinaryExpression(SyntaxKind.EqualsToken, target, propertyAccess);
            builder.writeLocation(node);
            builder.emit(OpCode.Statement, Factory.createExpressionStatement(assignExpression));
            return { target, thisArg };
        }

        function rewriteVariableDeclarationList(node: VariableDeclarationList): Expression {
            var declarations = node.declarations;
            return rewriteVariableDeclarations(node, declarations);
        }

        function rewriteVariableDeclarations(parent: Node, declarations: VariableDeclaration[]): Expression {
            var mergedAssignment: Expression;
            for (var i = 0; i < declarations.length; i++) {
                var node = declarations[i];
                if (hasAwaitOrYield(node)) {
                    if (mergedAssignment) {
                        builder.emit(OpCode.Statement, Factory.createExpressionStatement(mergedAssignment));
                        mergedAssignment = undefined;
                    }
                }
                var rewritten = rewriteVariableDeclaration(node);
                if (rewritten) {
                    if (mergedAssignment) {
                        mergedAssignment = Factory.createBinaryExpression(
                            SyntaxKind.CommaToken,
                            mergedAssignment,
                            rewritten);
                    }
                    else {
                        mergedAssignment = rewritten;
                    }
                }
            }

            if (parent.kind === SyntaxKind.VariableDeclarationList && parent.parent.kind === SyntaxKind.ForInStatement) {
                if (mergedAssignment) {
                    builder.emit(OpCode.Statement, Factory.createExpressionStatement(mergedAssignment));
                    mergedAssignment = undefined;
                }

                var declaration = declarations[0];
                return <Identifier>declaration.name;
            }

            return mergedAssignment;
        }

        function rewriteVariableDeclaration(node: VariableDeclaration): BinaryExpression {
            if (isBindingPattern(node.name)) {
                var declarations = rewriteBindingElement(<BindingElement>node, locals);
                var result = rewriteVariableDeclarations(node, declarations);
                rewriteExpression(result);
                return;
            }

            builder.addVariable(<Identifier>node.name);
            var initializer = nodeVisitor.visitExpression(node.initializer);
            if (initializer) {
                return Factory.createBinaryExpression(SyntaxKind.EqualsToken, <Identifier>node.name, initializer, node);
            }
        }

        function rewriteAwaitExpression(node: AwaitExpression): UnaryExpression {
            var operand = nodeVisitor.visitUnaryExpression(node.expression);
            var resumeLabel = builder.defineLabel();
            builder.writeLocation(node);
            builder.emit(OpCode.Yield, operand);
            builder.markLabel(resumeLabel);
            return builder.createResume();
        }

        function rewriteAwaitExpressionUplevel(node: AwaitExpression): UnaryExpression {
            var yieldExpression = Factory.createYieldExpression(node.expression, node);
            return Factory.createParenthesizedExpression(yieldExpression);
        }

        function rewriteConditionalExpression(node: ConditionalExpression): Expression {
            var whenFalseLabel = builder.defineLabel();
            var resumeLabel = builder.defineLabel();
            var resultLocal = builder.declareLocal();
            builder.emit(OpCode.BrFalse, whenFalseLabel, nodeVisitor.visitExpression(node.condition));
            builder.writeLocation(node.whenTrue);
            builder.emit(OpCode.Assign, resultLocal, nodeVisitor.visitExpression(node.whenTrue));
            builder.emit(OpCode.Break, resumeLabel);
            builder.markLabel(whenFalseLabel);
            builder.writeLocation(node.whenFalse);
            builder.emit(OpCode.Assign, resultLocal, nodeVisitor.visitExpression(node.whenFalse));
            builder.markLabel(resumeLabel);
            return resultLocal;
        }

        function rewriteYieldExpression(node: YieldExpression): Expression {
            var expression = nodeVisitor.visitExpression(node.expression);
            var resumeLabel = builder.defineLabel();
            builder.writeLocation(node);
            builder.emit(node.asteriskToken ? OpCode.YieldStar : OpCode.Yield, expression);
            builder.markLabel(resumeLabel);
            return builder.createResume();
        }

        function rewriteParenthesizedExpression(node: ParenthesizedExpression): LeftHandSideExpression {
            var expression = nodeVisitor.visitExpression(node.expression);
            return Factory.makeLeftHandSideExpression(expression);
        }

        function rewriteExpressionStatement(node: ExpressionStatement): void {
            var expression = nodeVisitor.visitExpression(node.expression);
            if (!isAwaitOrYield(node.expression)) {
                builder.writeLocation(node);
                builder.emit(OpCode.Statement, expression);
            }
        }

        function rewriteIfStatement(node: IfStatement): void {
            var resumeLabel = builder.defineLabel();
            if (node.elseStatement) {
                var elseLabel = builder.defineLabel();
            }
            builder.emit(OpCode.BrFalse, elseLabel || resumeLabel, nodeVisitor.visitExpression(node.expression));
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
            builder.emit(OpCode.BrTrue, bodyLabel, nodeVisitor.visitExpression(node.expression));
            builder.endContinueBlock();
        }

        function rewriteWhileStatement(node: WhileStatement): void {
            var conditionLabel = builder.defineLabel();
            var bodyLabel = builder.defineLabel();
            var endLabel = builder.beginContinueBlock(conditionLabel, getTarget(node));
            builder.markLabel(conditionLabel);
            builder.emit(OpCode.BrFalse, endLabel, nodeVisitor.visitExpression(node.expression));
            rewriteBlockOrStatement(node.statement);
            builder.emit(OpCode.Break, conditionLabel);
            builder.endContinueBlock();
        }

        function rewriteForStatement(node: ForStatement): void {
            var conditionLabel = builder.defineLabel();
            var iteratorLabel = builder.defineLabel();
            var endLabel = builder.beginContinueBlock(iteratorLabel, getTarget(node));
            var initializer = <Expression>nodeVisitor.visitVariableDeclarationListOrExpression(node.initializer);
            if (initializer) {
                builder.writeLocation(node.initializer);
                builder.emit(OpCode.Statement, Factory.createExpressionStatement(initializer));
            }
            builder.markLabel(conditionLabel);
            if (node.condition) {
                builder.emit(OpCode.BrFalse, endLabel, nodeVisitor.visitExpression(node.condition));
            }
            rewriteBlockOrStatement(node.statement);
            builder.markLabel(iteratorLabel);
            if (node.iterator) {
                builder.emit(OpCode.Statement, Factory.createExpressionStatement(nodeVisitor.visitExpression(node.iterator)));
            }
            builder.emit(OpCode.Break, conditionLabel);
            builder.endContinueBlock();
        }

        function rewriteForInStatement(node: ForInStatement): void {
            var variable = <Expression>nodeVisitor.visitVariableDeclarationListOrExpression(node.initializer);
            while (variable.kind === SyntaxKind.BinaryExpression) {
                variable = (<BinaryExpression>variable).left;
            }

            var keysLocal = builder.declareLocal();
            var tempLocal = builder.declareLocal();
            var conditionLabel = builder.defineLabel();
            var iteratorLabel = builder.defineLabel();
            var endLabel = builder.beginContinueBlock(iteratorLabel, getTarget(node));
            var initializeKeysExpression = Factory.createBinaryExpression(SyntaxKind.EqualsToken, keysLocal, Factory.createArrayLiteralExpression([]));
            builder.emit(OpCode.Statement, Factory.createExpressionStatement(initializeKeysExpression));
            var keysLengthExpression = Factory.createPropertyAccessExpression(keysLocal, Factory.createIdentifier("length"));
            var keysPushExpression = Factory.createElementAccessExpression(keysLocal, keysLengthExpression);
            var assignKeyExpression = Factory.createBinaryExpression(SyntaxKind.EqualsToken, keysPushExpression, tempLocal);
            var assignKeyStatement = Factory.createExpressionStatement(assignKeyExpression);
            var expression = cacheExpression(Factory.makeLeftHandSideExpression(nodeVisitor.visitExpression(node.expression)));
            var forTempInExpressionStatement = Factory.createForInStatement(tempLocal, expression, assignKeyStatement);
            builder.emit(OpCode.Statement, forTempInExpressionStatement);
            var initializeTempExpression = Factory.createBinaryExpression(SyntaxKind.EqualsToken, tempLocal, Factory.createNumericLiteral(0));
            builder.emit(OpCode.Statement, Factory.createExpressionStatement(initializeTempExpression));
            var conditionExpression = Factory.createBinaryExpression(SyntaxKind.LessThanToken, tempLocal, keysLengthExpression);
            builder.markLabel(conditionLabel);
            builder.emit(OpCode.BrFalse, endLabel, conditionExpression);
            var readKeyExpression = Factory.createElementAccessExpression(keysLocal, tempLocal);
            var hasKeyExpression = Factory.createBinaryExpression(SyntaxKind.InKeyword, readKeyExpression, expression);
            builder.emit(OpCode.BrFalse, iteratorLabel, hasKeyExpression);
            var assignVariableExpression = Factory.createBinaryExpression(SyntaxKind.EqualsToken, variable, readKeyExpression);
            builder.writeLocation(node.initializer);
            builder.emit(OpCode.Statement, Factory.createExpressionStatement(assignVariableExpression, variable));
            rewriteBlockOrStatement(node.statement);
            builder.markLabel(iteratorLabel);
            var incrementTempExpression = Factory.createPostfixUnaryExpression(SyntaxKind.PlusPlusToken, tempLocal);
            builder.writeLocation(node.initializer);
            builder.emit(OpCode.Statement, Factory.createExpressionStatement(incrementTempExpression, variable));
            builder.emit(OpCode.Break, conditionLabel);
            builder.endContinueBlock();
        }

        function rewriteSwitchStatement(node: SwitchStatement): void {
            var defaultClauseIndex: number = -1;
            var endLabel = builder.beginBreakBlock(getTarget(node), /*requireLabel*/ false);

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

            var expression = cacheExpression(nodeVisitor.visitExpression(node.expression));

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
                            var clauseExpression = nodeVisitor.visitExpression(caseClause.expression);
                            var clauseLabel = clauseLabels[clauseLabelMap[lastClauseOffset]];
                            builder.writeLocation(caseClause.expression);
                            var breakStatement = builder.createInlineBreak(clauseLabel);
                            clauses.push(Factory.createCaseClause(clauseExpression, [breakStatement]));
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
                        clauses.push(Factory.createCaseClause(nodeVisitor.visitExpression(caseClause.expression), [inlineBreak]));
                    }
                    lastClauseOffset++;
                }

                if (clauses.length) {
                    var switchStatement = Factory.createSwitchStatement(expression, clauses, node);
                    builder.emit(OpCode.Statement, switchStatement);
                }
            }
        }

        function rewriteLabeledStatement(node: LabeledStatement): void {
            builder.beginBreakBlock(getTarget(node), /*requireLabel*/ true);
            rewriteBlockOrStatement(node.statement);
            builder.endBreakBlock();
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
            var expression = nodeVisitor.visitExpression(node.expression);
            builder.writeLocation(node);
            builder.emit(OpCode.Return, expression);
        }

        function rewriteThrowStatement(node: ThrowStatement): void {
            var expression = nodeVisitor.visitExpression(node.expression);
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

            var visited = nodeVisitor.visitStatement(node);
            if (visited) {
                builder.writeLocation(node);
                builder.emit(OpCode.Statement, visited);
            }
        }

        function rewriteExpression(node: Expression): void {
            if (!node) {
                return;
            }

            var visited = nodeVisitor.visitExpression(node);
            if (visited) {
                builder.writeLocation(node);
                builder.emit(OpCode.Statement, visited);
            }
        }

        function rewriteParameterDeclaration(node: ParameterDeclaration): void {
            var parameterName: Identifier;
            builder.writeLocation(node);
            if (isBindingPattern(node.name)) {
                parameterName = locals.createUniqueIdentifier();
            }
            else {
                parameterName = <Identifier>node.name;
            }

            builder.writeLocation(node);
            builder.addParameter(parameterName, node.flags);

            if (isBindingPattern(node.name)) {
                var declarations = rewriteBindingElement(<BindingElement>node, locals, parameterName);
                var expression = rewriteVariableDeclarations(node, declarations);
                if (expression) {
                    builder.emit(OpCode.Statement, expression);
                }
            }
            else if (node.initializer) {
                var equalityExpression = Factory.createBinaryExpression(SyntaxKind.EqualsEqualsEqualsToken, parameterName, Factory.createVoidZero());
                var assignmentExpression = Factory.createBinaryExpression(SyntaxKind.EqualsToken, parameterName, node.initializer);
                var expressionStatement = Factory.createExpressionStatement(assignmentExpression);
                var ifStatement = Factory.createIfStatement(equalityExpression, expressionStatement);
                rewriteStatement(ifStatement);
            }
        }

        function rewriteWorker(): FunctionLikeDeclaration {
            if (node.parameters) {
                for (var i = 0; i < node.parameters.length; i++) {
                    var parameter = node.parameters[i];
                    rewriteParameterDeclaration(parameter);
                }
            }

            if (node.body.kind === SyntaxKind.Block) {
                rewriteBlock(<Block>node.body);
            } else {
                builder.emit(OpCode.Return, nodeVisitor.visitExpression(<Expression>node.body));
            }

            var func = builder.buildFunction(node.kind, node.name, node, node.flags, node.modifiers);
            func.id = node.id;
            func.parent = node.parent;
            return func;
        }

        function flattenCommaExpression(node: BinaryExpression): Expression[] {
            var expressions: Expression[] = [];
            function visitExpression(node: Expression): void {
                if (node.kind === SyntaxKind.BinaryExpression && (<BinaryExpression>node).operator === SyntaxKind.CommaToken) {
                    visitExpression((<BinaryExpression>node).left);
                    visitExpression((<BinaryExpression>node).right);
                }
                else {
                    expressions.push(node);
                }
            }
            visitExpression(node);
            return expressions;
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