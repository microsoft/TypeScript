/// <reference path="parser.ts"/>
/// <reference path="generator.ts"/>

module ts {
    export module BindingElementRewriter {
        interface RewriterState {
            isDeclaration: boolean;
            root: BindingElement;
            locals: Locals;
            value?: Expression;
            variableDeclarations?: VariableDeclaration[];
        }

        export function rewrite(root: BindingElement, locals: Locals, value?: Expression): VariableDeclaration[] {
            var isDeclaration = root.kind === SyntaxKind.VariableDeclaration && !(getCombinedNodeFlags(root) & NodeFlags.Export) || root.kind === SyntaxKind.Parameter;
            var state: RewriterState = {
                isDeclaration,
                root,
                locals,
                value
            };
            Visitor.visit(root, visitNode, state);
            return state.variableDeclarations;
        }

        function visitNode(node: Node, state: RewriterState): Node {
            switch (node.kind) {
                case SyntaxKind.Parameter:
                case SyntaxKind.VariableDeclaration:
                case SyntaxKind.BindingElement:
                    return visitBindingElement(<BindingElement>node, state);
                case SyntaxKind.ObjectBindingPattern:
                    return visitObjectBindingPattern(<BindingPattern>node, state);
                case SyntaxKind.ArrayBindingPattern:
                    return visitArrayBindingPattern(<BindingPattern>node, state);
                case SyntaxKind.Identifier:
                    return visitIdentifier(<Identifier>node, state);
                default:
                    return node;
            }
        }

        function visitBindingElement(node: BindingElement, state: RewriterState): BindingElement {
            var { value, locals } = state, saveValue = value;

            if (node.initializer) {
                // Combine value and initializer
                value = value ? Locals.getValueOrDefault(locals, value, node.initializer, writeDeclaration, state) : node.initializer;
            }
            else if (!value) {
                // Use 'void 0' in absence of value and initializer
                value = Factory.createVoidZero();
            }

            state.value = value;
            Visitor.visit(node.name, visitNode, state);
            state.value = saveValue;
            return node;
        }        

        function visitObjectBindingPattern(node: BindingPattern, state: RewriterState): BindingPattern {
            var { value, locals } = state, saveValue = value;

            var elements = node.elements;
            if (elements.length !== 1) {
                // For anything but a single element destructuring we need to generate a temporary
                // to ensure value is evaluated exactly once.
                value = Locals.ensureIdentifier(locals, value, writeDeclaration, state);
            }

            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                var propName = element.propertyName || <Identifier>element.name;

                // Rewrite element to a declaration with an initializer that fetches property
                state.value = Factory.createPropertyOrElementAccessExpression(Factory.makeLeftHandSideExpression(value), propName);
                Visitor.visit(element, visitNode, state);
            }

            state.value = saveValue;
            return node;
        }

        function visitArrayBindingPattern(node: BindingPattern, state: RewriterState): BindingPattern {
            var { value, locals } = state, saveValue = value;

            var elements = node.elements;
            if (elements.length !== 1) {
                // For anything but a single element destructuring we need to generate a temporary
                // to ensure value is evaluated exactly once.
                value = Locals.ensureIdentifier(locals, value, writeDeclaration, state);
            }

            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                if (element.kind !== SyntaxKind.OmittedExpression) {
                    if (!element.dotDotDotToken) {
                        // Rewrite element to a declaration that accesses array element at index i
                        state.value = Factory.createElementAccessExpression(Factory.makeLeftHandSideExpression(value), Factory.createNumericLiteral(i));
                        Visitor.visit(element, visitNode, state);
                    }
                    else if (i === elements.length - 1) {
                        value = Locals.ensureIdentifier(locals, value, writeDeclaration, state);
                        var name = <Identifier>element.name;
                        var sliceExpression = Factory.createPropertyAccessExpression(Factory.makeLeftHandSideExpression(value), Factory.createIdentifier("slice"));
                        var callExpression = Factory.createCallExpression(sliceExpression, [Factory.createNumericLiteral(i)]);
                        writeAssignment(name, callExpression, state);
                    }
                }
            }

            state.value = saveValue;
            return node;
        }

        function visitIdentifier(node: Identifier, state: RewriterState): Identifier {
            var { value } = state;
            writeAssignment(node, value, state);
            return node;
        }

        function writeDeclaration(left: Identifier, right: Expression, state: RewriterState): void {
            var { isDeclaration, locals } = state;
            if (!isDeclaration) {
                Locals.recordVariable(locals, left);
            }
            writeAssignment(left, right, state);
        }

        function writeAssignment(left: Identifier, right: Expression, state: RewriterState): void {
            var { variableDeclarations = [], root } = state;
            var variableDeclaration = Factory.createVariableDeclaration(left, right);
            if (root.kind === SyntaxKind.VariableDeclaration && left.parent &&
                (left.parent.kind === SyntaxKind.VariableDeclaration || left.parent.kind === SyntaxKind.BindingElement)) {
                if (getCombinedNodeFlags(left.parent) & NodeFlags.Export) {
                    variableDeclaration.parent = (<VariableDeclaration>state.root).parent;
                    variableDeclaration.flags |= NodeFlags.Export;
                }
            }

            variableDeclarations.push(variableDeclaration);
            state.variableDeclarations = variableDeclarations;
        }
    }

    export module DestructuringAssignmentRewriter {
        interface RewriterState {
            root: BinaryExpression;
            locals: Locals;
            value?: Expression;
            mergedAssignments?: BinaryExpression;
        }

        export function rewrite(root: BinaryExpression, locals: Locals): BinaryExpression {
            var value = root.right;
            var state: RewriterState = {
                root,
                locals,
                value
            };

            var target = getLeftHandSideOfDestructuringAssignment(root);
            if (root.parent.kind !== SyntaxKind.ExpressionStatement) {
                value = Locals.ensureIdentifier(locals, value, writeDeclaration, state);
            }

            state.value = value;
            Visitor.visit(target, visitNode, state);

            var { mergedAssignments } = state;
            if (root.parent.kind !== SyntaxKind.ExpressionStatement) {
                mergedAssignments = Factory.createBinaryExpression(
                    SyntaxKind.CommaToken,
                    mergedAssignments,
                    value);
            }

            return mergedAssignments;
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

        function visitNode(node: Node, state: RewriterState): Node {
            switch (node.kind) {
                case SyntaxKind.BinaryExpression:
                    return visitBinaryExpression(<BinaryExpression>node, state);

                case SyntaxKind.ObjectLiteralExpression:
                    return visitObjectLiteralExpression(<ObjectLiteralExpression>node, state);

                case SyntaxKind.ArrayLiteralExpression:
                    return visitArrayLiteralExpression(<ArrayLiteralExpression>node, state);
            }

            var { value } = state;
            writeAssignment(<Expression>node, value, state);
            return node;
        }

        function visitClassElement(node: Node, state: RewriterState): Node {
            switch (node.kind) {
                case SyntaxKind.PropertyAssignment:
                case SyntaxKind.ShorthandPropertyAssignment:
                    return visitPropertyAssignment(<PropertyAssignment>node, state);

                default:
                    // TODO(andersh): Computed property support
                    return node;
            }
        }

        function visitBinaryExpression(node: BinaryExpression, state: RewriterState): Node {
            var { value, locals } = state, saveValue = value;

            if (node.operator === SyntaxKind.EqualsToken) {
                value = Locals.getValueOrDefault(locals, value, node.right, writeDeclaration, state);
                state.value = value;
                Visitor.visit(node.left, visitNode, state);
            }

            state.value = saveValue;
            return node;
        }

        function visitObjectLiteralExpression(node: ObjectLiteralExpression, state: RewriterState): Node {
            var { value, locals } = state, saveValue = value;

            var properties = node.properties;
            if (properties.length !== 1) {
                // For anything but a single element destructuring we need to generate a temporary
                // to ensure value is evaluated exactly once.
                value = Locals.ensureIdentifier(locals, value, writeDeclaration, state);
            }

            state.value = value;
            Visitor.visitNodes(properties, visitClassElement, state);
            state.value = saveValue;
            return node;
        }

        function visitPropertyAssignment(node: PropertyAssignment, state: RewriterState): Node {
            var { value } = state, saveValue = value;
            var propName = <Identifier>node.name;

            state.value = Factory.createPropertyOrElementAccessExpression(Factory.makeLeftHandSideExpression(value), propName);
            Visitor.visit(node.initializer || propName, visitNode, state);
            state.value = saveValue;
            return node;
        }

        function visitArrayLiteralExpression(node: ArrayLiteralExpression, state: RewriterState): Node {
            var { value, locals } = state, saveValue = value;

            var elements = node.elements;
            if (elements.length !== 1) {
                // For anything but a single element destructuring we need to generate a temporary
                // to ensure value is evaluated exactly once.
                value = Locals.ensureIdentifier(state.locals, value, writeDeclaration, state);
            }

            for (var i = 0; i < elements.length; i++) {
                var e = elements[i];
                if (e.kind !== SyntaxKind.OmittedExpression) {
                    if (e.kind !== SyntaxKind.SpreadElementExpression) {
                        state.value = Factory.createElementAccessExpression(Factory.makeLeftHandSideExpression(value), Factory.createNumericLiteral(i));
                        Visitor.visit(e, visitNode, state);
                    }
                    else if (i === elements.length - 1) {
                        value = Locals.ensureIdentifier(state.locals, value, writeDeclaration, state);
                        var sliceExpression = Factory.createPropertyAccessExpression(Factory.makeLeftHandSideExpression(value), Factory.createIdentifier("slice"));
                        var callExpression = Factory.createCallExpression(sliceExpression, [Factory.createNumericLiteral(i)]);
                        writeAssignment(<Identifier>(<SpreadElementExpression>e).expression, callExpression, state);
                    }                   
                }
            }

            state.value = saveValue;
            return node;
        }

        function visitIdentifier(node: Identifier, state: RewriterState): Node {
            var { value } = state;
            writeAssignment(node, value, state);
            return node;
        }

        function writeDeclaration(left: Identifier, right: Expression, state: RewriterState): void {
            var { locals } = state;
            Locals.recordVariable(locals, left);
            writeAssignment(left, right, state);
        }

        function writeAssignment(left: Expression, right: Expression, state: RewriterState): void {
            var { mergedAssignments } = state;
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

            state.mergedAssignments = mergedAssignments;
        }
    }

    export module SpreadElementRewriter {
        export function rewrite(node: ArrayLiteralExpression): LeftHandSideExpression {
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
    }

    export module AsyncFunctionRewriter {
        export function rewrite<TNode extends FunctionLikeDeclaration>(node: TNode, promiseConstructor: EntityName, locals: Locals, compilerOptions: CompilerOptions): TNode {
            var resolve = Locals.createUniqueIdentifier(locals, "_resolve");
            var generatorFunctionBody = Factory.createBlock(rewriteBody(node.body));
            var generatorFunction = Factory.createFunctionExpression(/*name*/ undefined, [], generatorFunctionBody);
            generatorFunction.asteriskToken = Factory.createTokenNode(SyntaxKind.AsteriskToken);

            var bodyStatements: Statement[] = [];
            var generator = createGenerator(generatorFunctionBody, bodyStatements, locals, compilerOptions);
            var awaiterCallExpression = Factory.createCallExpression(Factory.createIdentifier("__awaiter"), [generator]);
            var resolveCallExpression = Factory.createCallExpression(resolve, [awaiterCallExpression]);
            var resolveCallStatement = Factory.createExpressionStatement(resolveCallExpression);
            var initFunctionBody = Factory.createBlock([resolveCallStatement]);
            var initFunctionExpression = Factory.createFunctionExpression(/*name*/ undefined, [Factory.createParameterDeclaration(resolve)], initFunctionBody);
            var newPromiseExpression = Factory.createNewExpression(Factory.getExpressionForEntityName(promiseConstructor), [initFunctionExpression]);
            var bodyReturnStatement = Factory.createReturnStatement(newPromiseExpression);
            bodyStatements.push(bodyReturnStatement);

            var block = Factory.createBlock(bodyStatements);
            var func = <TNode>Factory.updateFunctionLikeDeclaration(node, node.name, block, node.parameters);
            func.id = node.id;
            func.parent = node.parent;
            return func;
        }

        function rewriteBody(body: Block | Expression): NodeArray<Statement> {
            if (body.kind === SyntaxKind.Block) {
                return Visitor.visitNodes((<Block>body).statements, visitNode);
            } else {
                return Factory.createNodeArray<Statement>([
                    Factory.createReturnStatement(Visitor.visit(<Expression>body, visitNode))
                ]);
            }
        }

        function createGenerator(body: Block, statements: Statement[], locals: Locals, compilerOptions: CompilerOptions): Expression {
            var generatorFunction = Factory.createFunctionExpression(/*name*/ undefined, [], body);
            generatorFunction.asteriskToken = Factory.createTokenNode(SyntaxKind.AsteriskToken);

            if (compilerOptions.target < ScriptTarget.ES6) {
                generatorFunction = GeneratorFunctionRewriter.rewrite(generatorFunction, locals);
                body = <Block>generatorFunction.body;
                
                var generator: Expression;
                for (var i = 0; i < body.statements.length; i++) {
                    var statement = body.statements[i];
                    if (statement.kind === SyntaxKind.FunctionDeclaration ||
                        statement.kind === SyntaxKind.VariableStatement) {
                        statements.push(statement);
                    }
                    else if (statement.kind === SyntaxKind.ReturnStatement) {
                        generator = (<ReturnStatement>statement).expression;
                    }
                }

                return generator;
            }
            else {
                return Factory.createCallExpression(generatorFunction, []);
            }
        }

        function visitNode(node: Node): Node {
            switch (node.kind) {
                case SyntaxKind.AwaitExpression:
                    return visitAwaitExpression(<AwaitExpression>node);

                case SyntaxKind.ExpressionStatement:
                    return visitExpressionStatement(<ExpressionStatement>node);

                case SyntaxKind.ArrowFunction:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.MethodDeclaration:
                    return node;

                default:
                    return Visitor.fallback(node, visitNode);
            }
        }

        function visitAwaitExpression(node: AwaitExpression): UnaryExpression {
            var expression = Visitor.visit(node.expression, visitNode);
            var yieldExpression = Factory.createYieldExpression(expression, /*asteriskToken*/ undefined, node);
            return Factory.makeLeftHandSideExpression(yieldExpression);
        }

        function visitExpressionStatement(node: ExpressionStatement): Statement {
            var expression = Visitor.visit(node.expression, visitNode);
            if (nodeIsGenerated(expression) && expression.kind === SyntaxKind.ParenthesizedExpression) {
                expression = (<ParenthesizedExpression>expression).expression;
            }
            return Factory.updateExpressionStatement(node, expression);
        }        
    }

    export module GeneratorFunctionRewriter {
        interface RewriterState {
            locals: Locals;
            builder: GeneratorFunctionBuilder;
        }

        interface CallBinding {
            target?: Identifier;
            thisArg?: Identifier;
        }

        export function rewrite<TNode extends FunctionLikeDeclaration>(node: TNode, locals: Locals): TNode {
            var builder = GeneratorFunctionBuilder.create(locals);
            var state: RewriterState = {
                locals,
                builder
            };

            if (node.parameters) {
                for (var i = 0; i < node.parameters.length; i++) {
                    var parameter = node.parameters[i];
                    rewriteParameterDeclaration(parameter, state);
                }
            }

            if (node.body.kind === SyntaxKind.Block) {
                rewriteBlock(<Block>node.body, state);
            } else {
                GeneratorFunctionBuilder.emit(builder, OpCode.Return, Visitor.visit(<Expression>node.body, visitNode, state));
            }

            var func = <TNode>GeneratorFunctionBuilder.buildFunction(builder, node.kind, node.name, node, node.flags, node.modifiers);
            func.id = node.id;
            func.parent = node.parent;
            return func;
        }

        function visitNode(node: Node, state: RewriterState): Node {
            switch (node.kind) {
                case SyntaxKind.BinaryExpression: return visitBinaryExpression(<BinaryExpression>node, state);
                case SyntaxKind.ConditionalExpression: return visitConditionalExpression(<ConditionalExpression>node, state);
                case SyntaxKind.YieldExpression: return visitYieldExpression(<YieldExpression>node, state);
                case SyntaxKind.ArrayLiteralExpression: return visitArrayLiteralExpression(<ArrayLiteralExpression>node, state);
                case SyntaxKind.ObjectLiteralExpression: return visitObjectLiteralExpression(<ObjectLiteralExpression>node, state);
                case SyntaxKind.ElementAccessExpression: return visitElementAccessExpression(<ElementAccessExpression>node, state);
                case SyntaxKind.CallExpression: return visitCallExpression(<CallExpression>node, state);
                case SyntaxKind.NewExpression: return visitNewExpression(<NewExpression>node, state);
                case SyntaxKind.TaggedTemplateExpression: return visitTaggedTemplateExpression(<TaggedTemplateExpression>node, state);
                case SyntaxKind.TemplateExpression: return visitTemplateExpression(<TemplateExpression>node, state);
                case SyntaxKind.ParenthesizedExpression: return visitParenthesizedExpression(<ParenthesizedExpression>node, state);
                case SyntaxKind.FunctionDeclaration: return visitFunctionDeclaration(<FunctionDeclaration>node, state);
                case SyntaxKind.VariableStatement: return visitVariableStatement(<VariableStatement>node, state);
                case SyntaxKind.ExpressionStatement: return visitExpressionStatement(<ExpressionStatement>node, state);
                case SyntaxKind.IfStatement: return visitIfStatement(<IfStatement>node, state);
                case SyntaxKind.DoStatement: return visitDoStatement(<DoStatement>node, state);
                case SyntaxKind.WhileStatement: return visitWhileStatement(<WhileStatement>node, state);
                case SyntaxKind.ForStatement: return visitForStatement(<ForStatement>node, state);
                case SyntaxKind.ForInStatement: return visitForInStatement(<ForInStatement>node, state);
                case SyntaxKind.ContinueStatement: return visitContinueStatement(<BreakOrContinueStatement>node, state);
                case SyntaxKind.BreakStatement: return visitBreakStatement(<BreakOrContinueStatement>node, state);
                case SyntaxKind.ReturnStatement: return visitReturnStatement(<ReturnStatement>node, state);
                case SyntaxKind.WithStatement: return visitWithStatement(<WithStatement>node, state);
                case SyntaxKind.SwitchStatement: return visitSwitchStatement(<SwitchStatement>node, state);
                case SyntaxKind.LabeledStatement: return visitLabeledStatement(<LabeledStatement>node, state);
                case SyntaxKind.TryStatement: return visitTryStatement(<TryStatement>node, state);
                case SyntaxKind.CatchClause: return visitCatchClause(<CatchClause>node, state);
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.MethodDeclaration:
                    return node;

                default:
                    return Visitor.fallback(node, visitNode, state);
            }
        }

        // visitors
        function visitBinaryExpression(node: BinaryExpression, state: RewriterState): Expression {
            if (hasAwaitOrYield(node)) {
                return rewriteBinaryExpression(node, state);
            }
            return Visitor.fallback(node, visitNode, state);
        }

        function visitConditionalExpression(node: ConditionalExpression, state: RewriterState): Expression {
            if (hasAwaitOrYield(node.whenTrue) || hasAwaitOrYield(node.whenFalse)) {
                return rewriteConditionalExpression(node, state);
            }
            return Visitor.fallback(node, visitNode, state);
        }

        function visitYieldExpression(node: YieldExpression, state: RewriterState): Expression {
            return rewriteYieldExpression(node, state);
        }

        function visitArrayLiteralExpression(node: ArrayLiteralExpression, state: RewriterState): LeftHandSideExpression {
            if (hasAwaitOrYield(node)) {
                var rewritten = SpreadElementRewriter.rewrite(node);
                if (rewritten !== node) {
                    return Visitor.fallback(rewritten, visitNode, state);
                }
                return Factory.updateArrayLiteralExpression(node, Visitor.visitNodes(node.elements, visitNode, state, hasAwaitOrYield, cacheExpression));
            }
            return Visitor.fallback(node, visitNode, state);
        }

        function visitObjectLiteralExpression(node: ObjectLiteralExpression, state: RewriterState): LeftHandSideExpression {
            if (hasAwaitOrYield(node)) {
                return Factory.updateObjectLiteralExpression(node, Visitor.visitNodes(node.properties, visitNode, state, hasAwaitOrYield, cacheObjectLiteralElement));
            }
            return Visitor.fallback(node, visitNode, state);
        }

        function visitElementAccessExpression(node: ElementAccessExpression, state: RewriterState): LeftHandSideExpression {
            if (hasAwaitOrYield(node.argumentExpression)) {
                var object = cacheExpression(Visitor.visit(node.expression, visitNode, state), state);
                return Factory.updateElementAccessExpression(node, object, Visitor.visit(node.argumentExpression, visitNode, state));
            }
            return Visitor.fallback(node, visitNode, state);
        }

        function visitCallExpression(node: CallExpression, state: RewriterState): LeftHandSideExpression {
            if (hasAwaitOrYield(node)) {
                var binding = rewriteLeftHandSideOfCallExpression(node.expression, state);
                var arguments = Visitor.visitNodes(node.arguments, visitNode, state, hasAwaitOrYield, cacheExpression);
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
            return Visitor.fallback(node, visitNode, state);
        }

        function visitNewExpression(node: NewExpression, state: RewriterState): LeftHandSideExpression {
            if (hasAwaitOrYield(node)) {
                return Factory.updateNewExpression(
                    node,
                    cacheExpression(Visitor.visit(node.expression, visitNode, state), state),
                    Visitor.visitNodes(node.arguments, visitNode, state, hasAwaitOrYield, cacheExpression));
            }
            return Visitor.fallback(node, visitNode, state);
        }

        function visitTaggedTemplateExpression(node: TaggedTemplateExpression, state: RewriterState): LeftHandSideExpression {
            if (hasAwaitOrYield(node.template)) {
                return Factory.updateTaggedTemplateExpression(
                    node,
                    cacheExpression(Visitor.visit(node.tag, visitNode, state), state),
                    Visitor.visit(node.template, visitNode, state));
            }
            return Visitor.fallback(node, visitNode, state);
        }

        function visitTemplateExpression(node: TemplateExpression, state: RewriterState): TemplateExpression {
            if (hasAwaitOrYield(node)) {
                return Factory.updateTemplateExpression(
                    node,
                    node.head,
                    Visitor.visitNodes(node.templateSpans, visitNode, state, hasAwaitOrYield, cacheTemplateSpan));
            }
            return Visitor.fallback(node, visitNode, state);
        }

        function visitParenthesizedExpression(node: ParenthesizedExpression, state: RewriterState): LeftHandSideExpression {
            if (hasAwaitOrYield(node)) {
                return rewriteParenthesizedExpression(node, state);
            }
            return Visitor.fallback(node, visitNode, state);
        }

        function visitFunctionDeclaration(node: FunctionDeclaration, state: RewriterState): FunctionDeclaration {
            GeneratorFunctionBuilder.addFunction(state.builder, node);
            return;
        }

        function visitVariableStatement(node: VariableStatement, state: RewriterState): Statement {
            var assignment = rewriteVariableDeclarationList(node.declarationList, state);
            if (assignment) {
                return Factory.createExpressionStatement(assignment);
            }
            return;
        }

        function visitVariableDeclarationListOrExpression(node: VariableDeclarationList | Expression, state: RewriterState): VariableDeclarationList | Expression {
            if (node.kind === SyntaxKind.VariableDeclarationList) {
                return rewriteVariableDeclarationList(<VariableDeclarationList>node, state);
            }
            return Visitor.fallback(node, visitNode, state);
        }

        function visitExpressionStatement(node: ExpressionStatement, state: RewriterState): Statement {
            if (hasAwaitOrYield(node.expression)) {
                rewriteExpressionStatement(node, state);
                return;
            }
            return Visitor.fallback(node, visitNode, state);
        }

        function visitIfStatement(node: IfStatement, state: RewriterState): Statement {
            if (hasAwaitOrYield(node.thenStatement) || hasAwaitOrYield(node.elseStatement)) {
                rewriteIfStatement(node, state);
                return;
            }
            return Visitor.fallback(node, visitNode, state);
        }

        function visitDoStatement(node: DoStatement, state: RewriterState): Statement {
            if (hasAwaitOrYield(node)) {
                rewriteDoStatement(node, state);
                return;
            }

            var { builder } = state;
            GeneratorFunctionBuilder.beginScriptContinueBlock(state.builder, getLabelNames(node));
            node = Visitor.fallback(node, visitNode, state);
            
            GeneratorFunctionBuilder.endScriptContinueBlock(builder);
            return node;
        }

        function visitWhileStatement(node: WhileStatement, state: RewriterState): WhileStatement {
            if (hasAwaitOrYield(node)) {
                rewriteWhileStatement(node, state);
                return;
            }

            var { builder } = state;
            GeneratorFunctionBuilder.beginScriptContinueBlock(builder, getLabelNames(node));
            node = Visitor.fallback(node, visitNode, state);
            GeneratorFunctionBuilder.endScriptContinueBlock(builder);
            return node;
        }

        function visitForStatement(node: ForStatement, state: RewriterState): ForStatement {
            if (hasAwaitOrYield(node.condition) || hasAwaitOrYield(node.iterator) || hasAwaitOrYield(node.statement)) {
                rewriteForStatement(node, state);
                return;
            }

            var { builder } = state;
            GeneratorFunctionBuilder.beginScriptContinueBlock(builder, getLabelNames(node));
            node = Factory.updateForStatement(
                node,
                Visitor.visit(node.initializer, visitVariableDeclarationListOrExpression, state),
                Visitor.visit(node.condition, visitNode, state),
                Visitor.visit(node.iterator, visitNode, state),
                Visitor.visit(node.statement, visitNode, state));
            GeneratorFunctionBuilder.endScriptContinueBlock(builder);
            return node;
        }

        function visitForInStatement(node: ForInStatement, state: RewriterState): ForInStatement {
            if (hasAwaitOrYield(node.statement)) {
                rewriteForInStatement(node, state);
                return;
            }

            var { builder } = state;
            GeneratorFunctionBuilder.beginScriptContinueBlock(builder, getLabelNames(node));
            node = Factory.updateForInStatement(
                node,
                Visitor.visit(node.initializer, visitVariableDeclarationListOrExpression, state),
                Visitor.visit(node.expression, visitNode, state),
                Visitor.visit(node.statement, visitNode, state));
            GeneratorFunctionBuilder.endScriptContinueBlock(builder);
            return node;
        }

        function visitBreakStatement(node: BreakOrContinueStatement, state: RewriterState): Statement {
            var label = GeneratorFunctionBuilder.findBreakTarget(state.builder, node.label && node.label.text);
            if (label > 0) {
                GeneratorFunctionBuilder.writeLocation(state.builder, node);
                return GeneratorFunctionBuilder.createInlineBreak(state.builder, label);
            }
            return Visitor.fallback(node, visitNode, state);
        }

        function visitContinueStatement(node: BreakOrContinueStatement, state: RewriterState): Statement {
            var label = GeneratorFunctionBuilder.findContinueTarget(state.builder, node.label && node.label.text);
            if (label > 0) {
                GeneratorFunctionBuilder.writeLocation(state.builder, node);
                return GeneratorFunctionBuilder.createInlineBreak(state.builder, label);
            }
            return Visitor.fallback(node, visitNode, state);
        }

        function visitReturnStatement(node: ReturnStatement, state: RewriterState): Statement {
            var expression = Visitor.visit(node.expression, visitNode, state);
            GeneratorFunctionBuilder.writeLocation(state.builder, node);
            return GeneratorFunctionBuilder.createInlineReturn(state.builder, expression);
        }

        function visitSwitchStatement(node: SwitchStatement, state: RewriterState): Statement {
            if (forEach(node.clauses, hasAwaitOrYield)) {
                rewriteSwitchStatement(node, state);
                return;
            }

            var { builder } = state;
            GeneratorFunctionBuilder.beginScriptBreakBlock(builder, getLabelNames(node), /*requireLabel*/ false);
            node = Visitor.fallback(node, visitNode, state);
            GeneratorFunctionBuilder.endScriptBreakBlock(builder);
            return node;
        }

        function visitWithStatement(node: WithStatement, state: RewriterState): Statement {
            if (hasAwaitOrYield(node.statement)) {
                rewriteWithStatement(node, state);
                return;
            }
            return Visitor.fallback(node, visitNode, state);
        }

        function visitLabeledStatement(node: LabeledStatement, state: RewriterState): Statement {
            if (hasAwaitOrYield(node.statement)) {
                rewriteLabeledStatement(node, state);
                return;
            }

            var { builder } = state;
            GeneratorFunctionBuilder.beginScriptBreakBlock(builder, getLabelNames(node), /*requireLabel*/ true);
            node = Visitor.fallback(node, visitNode, state);
            GeneratorFunctionBuilder.endScriptBreakBlock(builder);
            return node;
        }

        function visitTryStatement(node: TryStatement, state: RewriterState): TryStatement {
            if (hasAwaitOrYield(node)) {
                rewriteTryStatement(node, state);
                return;
            }
            return Visitor.fallback(node, visitNode, state);
        }

        function visitCatchClause(node: CatchClause, state: RewriterState): CatchClause {
            // we're not rewriting, so clear any generated name on the symbol
            if (node.symbol) {
                node.symbol.generatedName = undefined;
            }
            return Visitor.fallback(node, visitNode, state);
        }        

        // expression caching
        function cacheExpression(node: Expression, state: RewriterState): Identifier {
            var local = GeneratorFunctionBuilder.declareLocal(state.builder);
            var assignExpression = Factory.createBinaryExpression(SyntaxKind.EqualsToken, local, node);
            GeneratorFunctionBuilder.emit(state.builder, OpCode.Statement, Factory.createExpressionStatement(assignExpression));
            return local;
        }

        function cacheObjectLiteralElement(node: ObjectLiteralElement, state: RewriterState): ObjectLiteralElement {
            switch (node.kind) {
                case SyntaxKind.PropertyAssignment:
                    return cachePropertyAssignment(<PropertyAssignment>node, state);

                case SyntaxKind.ShorthandPropertyAssignment:
                    return cacheShorthandPropertyAssignment(<ShorthandPropertyAssignment>node, state);

                default:
                    return node;
            }
        }

        function cachePropertyAssignment(node: PropertyAssignment, state: RewriterState): ObjectLiteralElement {
            return Factory.updatePropertyAssignment(node, node.name, cacheExpression(node.initializer, state));
        }

        function cacheShorthandPropertyAssignment(node: ShorthandPropertyAssignment, state: RewriterState): ObjectLiteralElement {
            return Factory.createPropertyAssignment(Factory.createIdentifier(node.name.text), cacheExpression(node.name, state));
        }

        function cacheTemplateSpan(node: TemplateSpan, state: RewriterState): TemplateSpan {
            return Factory.updateTemplateSpan(node, cacheExpression(node.expression, state), node.literal);
        }

        // rewriting
        function rewriteBinaryExpression(node: BinaryExpression, state: RewriterState): Expression {
            if (isLogicalBinary(node)) {
                if (hasAwaitOrYield(node.right)) {
                    return rewriteLogicalBinaryExpression(node, state);
                }
            }
            else if (isDestructuringAssignment(node)) {
                return rewriteDestructuringAssignment(node, state);
            }
            else if (isAssignment(node)) {
                if (hasAwaitOrYield(node.right)) {
                    return rewriteAssignmentExpression(node, state);
                }
            }
            else if (node.operator === SyntaxKind.CommaToken) {
                return rewriteCommaExpression(node, state);
            }
            else if (hasAwaitOrYield(node.right)) {
                return Factory.updateBinaryExpression(
                    node,
                    cacheExpression(Visitor.visit(node.left, visitNode, state), state),
                    Visitor.visit(node.right, visitNode, state));
            }
            return Visitor.fallback(node, visitNode, state);
        }

        function rewriteLogicalBinaryExpression(node: BinaryExpression, state: RewriterState): Expression {
            var builder = state.builder;
            var resumeLabel = GeneratorFunctionBuilder.defineLabel(builder);
            var resultLocal = GeneratorFunctionBuilder.declareLocal(builder);
            var code = node.operator === SyntaxKind.AmpersandAmpersandToken ? OpCode.BrFalse : OpCode.BrTrue;
            GeneratorFunctionBuilder.writeLocation(builder, node.left);
            GeneratorFunctionBuilder.emit(builder, OpCode.Assign, resultLocal, Visitor.visit(node.left, visitNode, state));
            GeneratorFunctionBuilder.emit(builder, code, resumeLabel, resultLocal);
            GeneratorFunctionBuilder.writeLocation(builder, node.right);
            GeneratorFunctionBuilder.emit(builder, OpCode.Assign, resultLocal, Visitor.visit(node.right, visitNode, state));
            GeneratorFunctionBuilder.markLabel(builder, resumeLabel);
            return resultLocal;
        }

        function rewriteCommaExpression(node: BinaryExpression, state: RewriterState): Expression {
            var builder = state.builder;
            var expressions = flattenCommaExpression(node);
            var merged: Expression;
            for (var i = 0; i < expressions.length; i++) {
                var expression = expressions[i];
                if (hasAwaitOrYield(expression) && merged) {
                    GeneratorFunctionBuilder.emit(builder, OpCode.Statement, Factory.createExpressionStatement(merged));
                    merged = undefined;
                }
                var visited = Visitor.visit(expression, visitNode, state);
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

        function rewriteDestructuringAssignment(node: BinaryExpression, state: RewriterState): Expression {
            var destructured = DestructuringAssignmentRewriter.rewrite(node, state.locals);
            var rewritten = visitBinaryExpression(destructured, state);
            if (needsParenthesis(node)) {
                return Factory.makeLeftHandSideExpression(rewritten);
            }
            return rewritten;
        }

        function rewriteAssignmentExpression(node: BinaryExpression, state: RewriterState): Expression {
            return Factory.updateBinaryExpression(
                node,
                rewriteLeftHandSideOfAssignmentExpression(node.left, state),
                Visitor.visit(node.right, visitNode, state));
        }

        function rewriteLeftHandSideOfAssignmentExpression(node: Expression, state: RewriterState): Expression {
            switch (node.kind) {
                case SyntaxKind.ElementAccessExpression:
                    return rewriteLeftHandSideElementAccessExpressionOfAssignmentExpression(<ElementAccessExpression>node, state);

                case SyntaxKind.PropertyAccessExpression:
                    return rewriteLeftHandSidePropertyAccessExpressionOfAssignmentExpression(<PropertyAccessExpression>node, state);

                default:
                    return Visitor.fallback(node, visitNode, state);
            }
        }

        function rewriteLeftHandSideElementAccessExpressionOfAssignmentExpression(node: ElementAccessExpression, state: RewriterState): ElementAccessExpression {
            return Factory.updateElementAccessExpression(
                node,
                cacheExpression(Visitor.visit(node.expression, visitNode, state), state),
                cacheExpression(Visitor.visit(node.argumentExpression, visitNode, state), state));
        }

        function rewriteLeftHandSidePropertyAccessExpressionOfAssignmentExpression(node: PropertyAccessExpression, state: RewriterState): PropertyAccessExpression {
            return Factory.updatePropertyAccessExpression(
                node,
                cacheExpression(Visitor.visit(node.expression, visitNode, state), state),
                node.name);
        }

        function rewriteLeftHandSideOfCallExpression(node: Expression, state: RewriterState): CallBinding {
            switch (node.kind) {
                case SyntaxKind.PropertyAccessExpression:
                    return rewriteLeftHandSidePropertyAccessExpressionOfCallExpression(<PropertyAccessExpression>node, state);

                case SyntaxKind.ElementAccessExpression:
                    return rewriteLeftHandSideElementAccessExpressionOfCallExpression(<ElementAccessExpression>node, state);

                default:
                    return { target: cacheExpression(Visitor.visit(node, visitNode, state), state) };
            }
        }

        function rewriteLeftHandSideElementAccessExpressionOfCallExpression(node: ElementAccessExpression, state: RewriterState): CallBinding {
            var builder = state.builder;
            var thisArg = cacheExpression(Visitor.visit(node.expression, visitNode, state), state);
            var target = GeneratorFunctionBuilder.declareLocal(builder);
            var index = Visitor.visit(node.argumentExpression, visitNode, state);
            var indexedAccess = Factory.createElementAccessExpression(thisArg, index, node);
            var assignExpression = Factory.createBinaryExpression(SyntaxKind.EqualsToken, target, indexedAccess);
            GeneratorFunctionBuilder.writeLocation(builder, node);
            GeneratorFunctionBuilder.emit(builder, OpCode.Statement, Factory.createExpressionStatement(assignExpression));
            return { target, thisArg };
        }

        function rewriteLeftHandSidePropertyAccessExpressionOfCallExpression(node: PropertyAccessExpression, state: RewriterState): CallBinding {
            var builder = state.builder;
            var thisArg = cacheExpression(Visitor.visit(node.expression, visitNode, state), state);
            var target = GeneratorFunctionBuilder.declareLocal(builder);
            var property = Factory.createIdentifier(node.name.text);
            var propertyAccess = Factory.createPropertyAccessExpression(thisArg, property, node);
            var assignExpression = Factory.createBinaryExpression(SyntaxKind.EqualsToken, target, propertyAccess);
            GeneratorFunctionBuilder.writeLocation(builder, node);
            GeneratorFunctionBuilder.emit(builder, OpCode.Statement, Factory.createExpressionStatement(assignExpression));
            return { target, thisArg };
        }

        function rewriteVariableDeclarationList(node: VariableDeclarationList, state: RewriterState): Expression {
            var declarations = node.declarations;
            return rewriteVariableDeclarations(node, declarations, state);
        }

        function rewriteVariableDeclarations(parent: Node, declarations: VariableDeclaration[], state: RewriterState): Expression {
            var builder = state.builder;
            var mergedAssignment: Expression;
            for (var i = 0; i < declarations.length; i++) {
                var node = declarations[i];
                if (hasAwaitOrYield(node)) {
                    if (mergedAssignment) {
                        GeneratorFunctionBuilder.emit(builder, OpCode.Statement, Factory.createExpressionStatement(mergedAssignment));
                        mergedAssignment = undefined;
                    }
                }
                var rewritten = rewriteVariableDeclaration(node, state);
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
                    GeneratorFunctionBuilder.emit(builder, OpCode.Statement, Factory.createExpressionStatement(mergedAssignment));
                    mergedAssignment = undefined;
                }

                var declaration = declarations[0];
                return <Identifier>declaration.name;
            }
            return mergedAssignment;
        }

        function rewriteVariableDeclaration(node: VariableDeclaration, state: RewriterState): BinaryExpression {
            var builder = state.builder;
            if (isBindingPattern(node.name)) {
                var declarations = BindingElementRewriter.rewrite(<BindingElement>node, state.locals);
                var result = rewriteVariableDeclarations(node, declarations, state);
                rewriteExpression(result, state);
                return;
            }
            GeneratorFunctionBuilder.addVariable(builder, <Identifier>node.name);
            var initializer = Visitor.visit(node.initializer, visitNode, state);
            if (initializer) {
                return Factory.createBinaryExpression(SyntaxKind.EqualsToken, <Identifier>node.name, initializer, node);
            }
        }

        function rewriteConditionalExpression(node: ConditionalExpression, state: RewriterState): Expression {
            var builder = state.builder;
            var whenFalseLabel = GeneratorFunctionBuilder.defineLabel(builder);
            var resumeLabel = GeneratorFunctionBuilder.defineLabel(builder);
            var resultLocal = GeneratorFunctionBuilder.declareLocal(builder);
            GeneratorFunctionBuilder.emit(builder, OpCode.BrFalse, whenFalseLabel, Visitor.visit(node.condition, visitNode, state));
            GeneratorFunctionBuilder.writeLocation(builder, node.whenTrue);
            GeneratorFunctionBuilder.emit(builder, OpCode.Assign, resultLocal, Visitor.visit(node.whenTrue, visitNode, state));
            GeneratorFunctionBuilder.emit(builder, OpCode.Break, resumeLabel);
            GeneratorFunctionBuilder.markLabel(builder, whenFalseLabel);
            GeneratorFunctionBuilder.writeLocation(builder, node.whenFalse);
            GeneratorFunctionBuilder.emit(builder, OpCode.Assign, resultLocal, Visitor.visit(node.whenFalse, visitNode, state));
            GeneratorFunctionBuilder.markLabel(builder, resumeLabel);
            return resultLocal;
        }

        function rewriteYieldExpression(node: YieldExpression, state: RewriterState): Expression {
            var builder = state.builder;
            var expression = Visitor.visit(node.expression, visitNode, state);
            var resumeLabel = GeneratorFunctionBuilder.defineLabel(builder);
            GeneratorFunctionBuilder.writeLocation(builder, node);
            GeneratorFunctionBuilder.emit(builder, node.asteriskToken ? OpCode.YieldStar : OpCode.Yield, expression);
            GeneratorFunctionBuilder.markLabel(builder, resumeLabel);
            return GeneratorFunctionBuilder.createResume(builder);
        }

        function rewriteParenthesizedExpression(node: ParenthesizedExpression, state: RewriterState): LeftHandSideExpression {
            var expression = Visitor.visit(node.expression, visitNode, state);
            return Factory.makeLeftHandSideExpression(expression);
        }

        function rewriteExpressionStatement(node: ExpressionStatement, state: RewriterState): void {
            var builder = state.builder;
            var expression = Visitor.visit(node.expression, visitNode, state);
            if (!isAwaitOrYield(node.expression)) {
                GeneratorFunctionBuilder.writeLocation(builder, node);
                GeneratorFunctionBuilder.emit(builder, OpCode.Statement, expression);
            }
        }

        function rewriteIfStatement(node: IfStatement, state: RewriterState): void {
            var builder = state.builder;
            var resumeLabel = GeneratorFunctionBuilder.defineLabel(builder);
            if (node.elseStatement) {
                var elseLabel = GeneratorFunctionBuilder.defineLabel(builder);
            }
            GeneratorFunctionBuilder.emit(builder, OpCode.BrFalse, elseLabel || resumeLabel, Visitor.visit(node.expression, visitNode, state));
            rewriteBlockOrStatement(node.thenStatement, state);
            if (node.elseStatement) {
                GeneratorFunctionBuilder.emit(builder, OpCode.Break, resumeLabel);
                GeneratorFunctionBuilder.markLabel(builder, elseLabel);
                rewriteBlockOrStatement(node.elseStatement, state);
            }
            GeneratorFunctionBuilder.markLabel(builder, resumeLabel);
        }

        function rewriteDoStatement(node: DoStatement, state: RewriterState): void {
            var builder = state.builder;
            var bodyLabel = GeneratorFunctionBuilder.defineLabel(builder);
            var conditionLabel = GeneratorFunctionBuilder.defineLabel(builder);
            var endLabel = GeneratorFunctionBuilder.beginContinueBlock(builder, conditionLabel, getLabelNames(node));
            GeneratorFunctionBuilder.markLabel(builder, bodyLabel);
            rewriteBlockOrStatement(node.statement, state);
            GeneratorFunctionBuilder.markLabel(builder, conditionLabel);
            GeneratorFunctionBuilder.emit(builder, OpCode.BrTrue, bodyLabel, Visitor.visit(node.expression, visitNode, state));
            GeneratorFunctionBuilder.endContinueBlock(builder);
        }

        function rewriteWhileStatement(node: WhileStatement, state: RewriterState): void {
            var builder = state.builder;
            var conditionLabel = GeneratorFunctionBuilder.defineLabel(builder);
            var bodyLabel = GeneratorFunctionBuilder.defineLabel(builder);
            var endLabel = GeneratorFunctionBuilder.beginContinueBlock(builder, conditionLabel, getLabelNames(node));
            GeneratorFunctionBuilder.markLabel(builder, conditionLabel);
            GeneratorFunctionBuilder.emit(builder, OpCode.BrFalse, endLabel, Visitor.visit(node.expression, visitNode, state));
            rewriteBlockOrStatement(node.statement, state);
            GeneratorFunctionBuilder.emit(builder, OpCode.Break, conditionLabel);
            GeneratorFunctionBuilder.endContinueBlock(builder);
        }

        function rewriteForStatement(node: ForStatement, state: RewriterState): void {
            var builder = state.builder;
            var conditionLabel = GeneratorFunctionBuilder.defineLabel(builder);
            var iteratorLabel = GeneratorFunctionBuilder.defineLabel(builder);
            var endLabel = GeneratorFunctionBuilder.beginContinueBlock(builder, iteratorLabel, getLabelNames(node));
            if (node.initializer) {
                var initializer = <Expression>visitVariableDeclarationListOrExpression(node.initializer, state);
                GeneratorFunctionBuilder.writeLocation(builder, node.initializer);
                GeneratorFunctionBuilder.emit(builder, OpCode.Statement, Factory.createExpressionStatement(initializer));
            }
            GeneratorFunctionBuilder.markLabel(builder, conditionLabel);
            if (node.condition) {
                GeneratorFunctionBuilder.emit(builder, OpCode.BrFalse, endLabel, Visitor.visit(node.condition, visitNode, state));
            }
            rewriteBlockOrStatement(node.statement, state);
            GeneratorFunctionBuilder.markLabel(builder, iteratorLabel);
            if (node.iterator) {
                GeneratorFunctionBuilder.emit(builder, OpCode.Statement, Factory.createExpressionStatement(Visitor.visit(node.iterator, visitNode, state)));
            }
            GeneratorFunctionBuilder.emit(builder, OpCode.Break, conditionLabel);
            GeneratorFunctionBuilder.endContinueBlock(builder);
        }

        function rewriteForInStatement(node: ForInStatement, state: RewriterState): void {
            var builder = state.builder;
            var variable = <Expression>visitVariableDeclarationListOrExpression(node.initializer, state);
            while (variable.kind === SyntaxKind.BinaryExpression) {
                variable = (<BinaryExpression>variable).left;
            }
            var keysLocal = GeneratorFunctionBuilder.declareLocal(builder);
            var tempLocal = GeneratorFunctionBuilder.declareLocal(builder);
            var conditionLabel = GeneratorFunctionBuilder.defineLabel(builder);
            var iteratorLabel = GeneratorFunctionBuilder.defineLabel(builder);
            var endLabel = GeneratorFunctionBuilder.beginContinueBlock(builder, iteratorLabel, getLabelNames(node));
            var initializeKeysExpression = Factory.createBinaryExpression(SyntaxKind.EqualsToken, keysLocal, Factory.createArrayLiteralExpression([]));
            GeneratorFunctionBuilder.emit(builder, OpCode.Statement, Factory.createExpressionStatement(initializeKeysExpression));
            var keysLengthExpression = Factory.createPropertyAccessExpression(keysLocal, Factory.createIdentifier("length"));
            var keysPushExpression = Factory.createElementAccessExpression(keysLocal, keysLengthExpression);
            var assignKeyExpression = Factory.createBinaryExpression(SyntaxKind.EqualsToken, keysPushExpression, tempLocal);
            var assignKeyStatement = Factory.createExpressionStatement(assignKeyExpression);
            var expression = cacheExpression(Factory.makeLeftHandSideExpression(Visitor.visit(node.expression, visitNode, state)), state);
            var forTempInExpressionStatement = Factory.createForInStatement(tempLocal, expression, assignKeyStatement);
            GeneratorFunctionBuilder.emit(builder, OpCode.Statement, forTempInExpressionStatement);
            var initializeTempExpression = Factory.createBinaryExpression(SyntaxKind.EqualsToken, tempLocal, Factory.createNumericLiteral(0));
            GeneratorFunctionBuilder.emit(builder, OpCode.Statement, Factory.createExpressionStatement(initializeTempExpression));
            var conditionExpression = Factory.createBinaryExpression(SyntaxKind.LessThanToken, tempLocal, keysLengthExpression);
            GeneratorFunctionBuilder.markLabel(builder, conditionLabel);
            GeneratorFunctionBuilder.emit(builder, OpCode.BrFalse, endLabel, conditionExpression);
            var readKeyExpression = Factory.createElementAccessExpression(keysLocal, tempLocal);
            var hasKeyExpression = Factory.createBinaryExpression(SyntaxKind.InKeyword, readKeyExpression, expression);
            GeneratorFunctionBuilder.emit(builder, OpCode.BrFalse, iteratorLabel, hasKeyExpression);
            var assignVariableExpression = Factory.createBinaryExpression(SyntaxKind.EqualsToken, variable, readKeyExpression);
            GeneratorFunctionBuilder.writeLocation(builder, node.initializer);
            GeneratorFunctionBuilder.emit(builder, OpCode.Statement, Factory.createExpressionStatement(assignVariableExpression, variable));
            rewriteBlockOrStatement(node.statement, state);
            GeneratorFunctionBuilder.markLabel(builder, iteratorLabel);
            var incrementTempExpression = Factory.createPostfixUnaryExpression(SyntaxKind.PlusPlusToken, tempLocal);
            GeneratorFunctionBuilder.writeLocation(builder, node.initializer);
            GeneratorFunctionBuilder.emit(builder, OpCode.Statement, Factory.createExpressionStatement(incrementTempExpression, variable));
            GeneratorFunctionBuilder.emit(builder, OpCode.Break, conditionLabel);
            GeneratorFunctionBuilder.endContinueBlock(builder);
        }

        function rewriteSwitchStatement(node: SwitchStatement, state: RewriterState): void {
            var builder = state.builder;
            var defaultClauseIndex: number = -1;
            var endLabel = GeneratorFunctionBuilder.beginBreakBlock(builder, getLabelNames(node), /*requireLabel*/ false);

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
                    clauseLabels.push(GeneratorFunctionBuilder.defineLabel(builder));
                } else {
                    clauseLabelMap[clauseIndex] = clauseLabels.length - 1;
                }
            }

            var expression = cacheExpression(Visitor.visit(node.expression, visitNode, state), state);

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
                GeneratorFunctionBuilder.writeLocation(builder, node.clauses[defaultClauseIndex]);
                GeneratorFunctionBuilder.emit(builder, OpCode.Break, defaultClauseLabel);
            } else {
                GeneratorFunctionBuilder.emit(builder, OpCode.Break, endLabel);
            }

            // emit switch states and statements
            for (var clauseIndex = 0; clauseIndex < node.clauses.length; clauseIndex++) {
                if (!clauseHasStatements[clauseIndex]) {
                    continue;
                }
                var clause = node.clauses[clauseIndex];
                var clauseLabel = clauseLabels[clauseLabelMap[clauseIndex]];
                GeneratorFunctionBuilder.markLabel(builder, clauseLabel);
                rewriteStatements(clause.statements, state);
            }

            GeneratorFunctionBuilder.endBreakBlock(builder);

            function emitPartialSwitchStatement(): void {
                var clauses: CaseOrDefaultClause[] = [];
                if (lastClauseOffset < clauseIndex) {
                    var clause = node.clauses[lastClauseOffset];
                    if (clause.kind === SyntaxKind.CaseClause) {
                        var caseClause = <CaseClause>clause;
                        if (hasAwaitOrYield(caseClause.expression)) {
                            var clauseExpression = Visitor.visit(caseClause.expression, visitNode, state);
                            var clauseLabel = clauseLabels[clauseLabelMap[lastClauseOffset]];
                            GeneratorFunctionBuilder.writeLocation(builder, caseClause.expression);
                            var breakStatement = GeneratorFunctionBuilder.createInlineBreak(builder, clauseLabel);
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
                        GeneratorFunctionBuilder.writeLocation(builder, caseClause.expression);
                        var inlineBreak = GeneratorFunctionBuilder.createInlineBreak(builder, clauseLabel);
                        clauses.push(Factory.createCaseClause(Visitor.visit(caseClause.expression, visitNode, state), [inlineBreak]));
                    }
                    lastClauseOffset++;
                }

                if (clauses.length) {
                    var switchStatement = Factory.createSwitchStatement(expression, clauses, node);
                    GeneratorFunctionBuilder.emit(builder, OpCode.Statement, switchStatement);
                }
            }
        }

        function rewriteWithStatement(node: WithStatement, state: RewriterState): void {
            var builder = state.builder;
            GeneratorFunctionBuilder.beginWithBlock(builder, cacheExpression(Visitor.visit(node.expression, visitNode, state), state));
            rewriteBlockOrStatement(node.statement, state);
            GeneratorFunctionBuilder.endWithBlock(builder);
        }

        function rewriteLabeledStatement(node: LabeledStatement, state: RewriterState): void {
            var builder = state.builder;
            if (!isLabeledOrIterationOrSwitchStatement(node.statement)) {
                GeneratorFunctionBuilder.beginBreakBlock(builder, getLabelNames(node), /*requireLabel*/ true);
            }
            rewriteBlockOrStatement(node.statement, state);
            if (!isLabeledOrIterationOrSwitchStatement(node.statement)) {
                GeneratorFunctionBuilder.endBreakBlock(builder);
            }
        }

        function rewriteTryStatement(node: TryStatement, state: RewriterState): void {
            var builder = state.builder;
            var endLabel = GeneratorFunctionBuilder.beginExceptionBlock(builder);
            rewriteBlock(node.tryBlock, state);
            if (node.catchClause) {
                var variable = GeneratorFunctionBuilder.declareLocal(builder, /*name*/ undefined, /*globallyUnique*/ true);
                
                // rename the symbol for the catch clause
                if (node.catchClause.symbol) {
                    node.catchClause.symbol.generatedName = variable.text;
                }

                GeneratorFunctionBuilder.beginCatchBlock(builder, variable);
                rewriteBlock(node.catchClause.block, state);
            }
            if (node.finallyBlock) {
                GeneratorFunctionBuilder.beginFinallyBlock(builder);
                rewriteBlock(node.finallyBlock, state);
            }
            GeneratorFunctionBuilder.endExceptionBlock(builder);
        }

        function rewriteReturnStatement(node: ReturnStatement, state: RewriterState): void {
            var builder = state.builder;
            var expression = Visitor.visit(node.expression, visitNode, state);
            GeneratorFunctionBuilder.writeLocation(builder, node);
            GeneratorFunctionBuilder.emit(builder, OpCode.Return, expression);
        }

        function rewriteThrowStatement(node: ThrowStatement, state: RewriterState): void {
            var builder = state.builder;
            var expression = Visitor.visit(node.expression, visitNode, state);
            GeneratorFunctionBuilder.writeLocation(builder, node);
            GeneratorFunctionBuilder.emit(builder, OpCode.Throw, expression);
        }

        function rewriteBreakStatement(node: BreakOrContinueStatement, state: RewriterState): void {
            var builder = state.builder;
            var label = GeneratorFunctionBuilder.findBreakTarget(builder, node.label && node.label.text);
            Debug.assert(label > 0, "Expected break statement to point to a label.");
            GeneratorFunctionBuilder.writeLocation(builder, node);
            GeneratorFunctionBuilder.emit(builder, OpCode.Break, label);
        }

        function rewriteContinueStatement(node: BreakOrContinueStatement, state: RewriterState): void {
            var builder = state.builder;
            var label = GeneratorFunctionBuilder.findContinueTarget(builder, node.label && node.label.text);
            Debug.assert(label > 0, "Expected continue statement to point to a label.");
            GeneratorFunctionBuilder.writeLocation(builder, node);
            GeneratorFunctionBuilder.emit(builder, OpCode.Break, label);
        }

        function rewriteStatements(statements: Statement[], state: RewriterState): void {
            for (var i = 0; i < statements.length; i++) {
                var statement = statements[i];
                rewriteStatement(statement, state);
            }
        }

        function rewriteBlockOrStatement(node: Statement, state: RewriterState): void {
            if (!node) {
                return;
            }

            switch (node.kind) {
                case SyntaxKind.Block:
                    return rewriteBlock(<Block>node, state);

                default:
                    return rewriteStatement(node, state);
            }
        }

        function rewriteBlock(node: Block, state: RewriterState): void {
            if (!node) {
                return;
            }

            rewriteStatements(node.statements, state);
        }

        function rewriteStatement(node: Statement, state: RewriterState): void {
            var builder = state.builder;
            if (!node) {
                return;
            }

            switch (node.kind) {
                case SyntaxKind.Block:
                    if (!hasAwaitOrYield(node)) {
                        break;
                    }

                    return rewriteBlock(<Block>node, state);

                case SyntaxKind.ThrowStatement:
                    return rewriteThrowStatement(<ThrowStatement>node, state);

                case SyntaxKind.ReturnStatement:
                    return rewriteReturnStatement(<ReturnStatement>node, state);

                case SyntaxKind.BreakStatement:
                    return rewriteBreakStatement(<BreakOrContinueStatement>node, state);

                case SyntaxKind.ContinueStatement:
                    return rewriteContinueStatement(<BreakOrContinueStatement>node, state);
            }

            var visited = Visitor.visit(node, visitNode, state);
            if (visited) {
                GeneratorFunctionBuilder.writeLocation(builder, node);
                GeneratorFunctionBuilder.emit(builder, OpCode.Statement, visited);
            }
        }

        function rewriteExpression(node: Expression, state: RewriterState): void {
            var builder = state.builder;
            if (!node) {
                return;
            }

            var visited = Visitor.visit(node, visitNode, state);
            if (visited) {
                GeneratorFunctionBuilder.writeLocation(builder, node);
                GeneratorFunctionBuilder.emit(builder, OpCode.Statement, visited);
            }
        }

        function rewriteParameterDeclaration(node: ParameterDeclaration, state: RewriterState): void {
            var builder = state.builder;
            var parameterName: Identifier;
            GeneratorFunctionBuilder.writeLocation(builder, node);
            if (isBindingPattern(node.name)) {
                parameterName = Locals.createUniqueIdentifier(state.locals);
            }
            else {
                parameterName = <Identifier>node.name;
            }

            GeneratorFunctionBuilder.writeLocation(builder, node);
            GeneratorFunctionBuilder.addParameter(builder, parameterName, node.flags);

            if (isBindingPattern(node.name)) {
                var declarations = BindingElementRewriter.rewrite(<BindingElement>node, state.locals, parameterName);
                var expression = rewriteVariableDeclarations(node, declarations, state);
                if (expression) {
                    GeneratorFunctionBuilder.emit(builder, OpCode.Statement, expression);
                }
            }
            else if (node.initializer) {
                var equalityExpression = Factory.createBinaryExpression(SyntaxKind.EqualsEqualsEqualsToken, parameterName, Factory.createVoidZero());
                var assignmentExpression = Factory.createBinaryExpression(SyntaxKind.EqualsToken, parameterName, node.initializer);
                var expressionStatement = Factory.createExpressionStatement(assignmentExpression);
                var ifStatement = Factory.createIfStatement(equalityExpression, expressionStatement);
                rewriteStatement(ifStatement, state);
            }
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

        function getLabelNames(node: Node): string[] {
            var labeledStatement: LabeledStatement;
            switch (node.kind) {
                case SyntaxKind.LabeledStatement:
                    labeledStatement = <LabeledStatement>node;
                    break;

                case SyntaxKind.SwitchStatement:
                case SyntaxKind.DoStatement:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                    if (node.parent.kind === SyntaxKind.LabeledStatement) {
                        labeledStatement = <LabeledStatement>node.parent;
                        break;
                    }

                default:
                    return;
            }

            var labels: string[] = [];
            while (true) {
                labels.push(labeledStatement.label.text);
                if (labeledStatement.parent.kind === SyntaxKind.LabeledStatement) {
                    labeledStatement = <LabeledStatement>labeledStatement.parent;
                }
                else {
                    break;
                }
            }

            return labels;
        }
    }
}