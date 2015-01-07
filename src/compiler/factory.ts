/// <reference path="parser.ts"/>

module ts {
    export module factory {
        export function createNodeArray<TNode extends Node>(elements: TNode[] = [], location?: TextRange): NodeArray<TNode> {
            var nodeArray = <NodeArray<TNode>>elements;
            if (location) {
                nodeArray.pos = location.pos;
                nodeArray.end = location.end;
            } else if (!("pos" in nodeArray && "end" in nodeArray)) {
                nodeArray.pos = -1;
                nodeArray.end = -1;
            }

            return nodeArray;
        }

        export function createTokenNode(token: SyntaxKind, location?: TextRange, flags?: NodeFlags): Node {
            return finishNode(beginNode(token), location, flags);
        }

        // entity names
        export function createIdentifier(text: string, location?: TextRange, flags?: NodeFlags): Identifier {
            var node = beginNode<Identifier>(SyntaxKind.Identifier);
            node.text = text;
            return finishNode(node, location, NodeFlags.Synthetic);
        }

        export function createQualifiedName(left: EntityName, right: Identifier, location?: TextRange, flags?: NodeFlags): QualifiedName {
            var node = beginNode<QualifiedName>(SyntaxKind.QualifiedName);
            node.left = left;
            node.right = right;
            return finishNode(node, location, flags);
        }

        export function createComputedPropertyName(expression: Expression, location?: TextRange, flags?: NodeFlags): ComputedPropertyName {
            var node = beginNode<ComputedPropertyName>(SyntaxKind.ComputedPropertyName);
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateComputedPropertyName(node: ComputedPropertyName, expression: Expression): ComputedPropertyName {
            if (node.expression !== expression) {
                return createComputedPropertyName(expression, node, node.flags);
            }
            return node;
        }

        export function createObjectBindingPattern(elements: BindingElement[], location?: TextRange, flags?: NodeFlags): BindingPattern {
            var node = beginNode<BindingPattern>(SyntaxKind.ObjectBindingPattern);
            node.elements = createNodeArray(elements);
            return finishNode(node, location, flags);
        }

        export function updateObjectBindingPattern(node: BindingPattern, elements: BindingElement[]): BindingPattern {
            if (node.elements !== elements) {
                return createObjectBindingPattern(elements, node, node.flags);
            }
            return node;
        }

        export function createArrayBindingPattern(elements: BindingElement[], location?: TextRange, flags?: NodeFlags): BindingPattern {
            var node = beginNode<BindingPattern>(SyntaxKind.ArrayBindingPattern);
            node.elements = createNodeArray(elements);
            return finishNode(node, location, flags);
        }

        export function updateArrayBindingPattern(node: BindingPattern, elements: BindingElement[]): BindingPattern {
            if (node.elements !== elements) {
                return createArrayBindingPattern(elements, node, node.flags);
            }
            return node;
        }

        export function createBindingElement(name: Identifier | BindingPattern, propertyName?: Identifier, initializer?: Expression, location?: TextRange, flags?: NodeFlags): BindingElement {
            var node = beginNode<BindingElement>(SyntaxKind.BindingElement);
            node.name = name;
            node.propertyName = propertyName;
            node.initializer = initializer;
            return finishNode(node, location, flags);
        }

        export function updateBindingElement(node: BindingElement, name: Identifier | BindingPattern, propertyName: Identifier, initializer: Expression): BindingElement {
            if (node.name !== name || node.propertyName !== propertyName || node.initializer !== initializer) {
                return createBindingElement(name, propertyName, initializer, node, node.flags);
            }

            return node;
        }

        // declarations
        export function createVariableDeclaration(name: Identifier | BindingPattern, initializer?: Expression, location?: TextRange, flags?: NodeFlags): VariableDeclaration {
            var node = beginNode<VariableDeclaration>(SyntaxKind.VariableDeclaration);
            node.name = name;
            node.initializer = initializer;
            return finishNode(node, location, flags);
        }

        export function updateVariableDeclaration(node: VariableDeclaration, name: Identifier | BindingPattern, initializer: Expression): VariableDeclaration {
            if (node.name !== name || node.initializer !== initializer) {
                return createVariableDeclaration(name, initializer, node, node.flags);
            }
            return node;
        }

        export function createParameterDeclaration(name: Identifier | BindingPattern, initializer?: Expression, location?: TextRange, flags?: NodeFlags): ParameterDeclaration {
            var node = beginNode<ParameterDeclaration>(SyntaxKind.Parameter);
            node.name = name;
            node.initializer = initializer;
            return finishNode(node, location, flags);
        }

        export function updateParameterDeclaration(node: ParameterDeclaration, name: Identifier | BindingPattern, initializer: Expression): ParameterDeclaration {
            return updateParameterDeclaration(node, name, initializer);
        }

        export function updateFunctionLikeDeclaration(node: FunctionLikeDeclaration, name: DeclarationName, body: Expression | Block, parameters: ParameterDeclaration[]): FunctionLikeDeclaration {
            if (node.name !== name || node.body !== body || node.parameters !== parameters) {
                switch (node.kind) {
                    case SyntaxKind.FunctionDeclaration:
                        return createFunctionDeclaration(<Identifier>name, <Block>body, parameters, node, node.flags, node.modifiers);
                    case SyntaxKind.MethodDeclaration:
                        return createMethodDeclaration(name, <Block>body, parameters, node, node.flags, node.modifiers);
                    case SyntaxKind.GetAccessor:
                        return createGetAccessor(name, <Block>body, parameters, node, node.flags, node.modifiers);
                    case SyntaxKind.FunctionExpression:
                        return createFunctionExpression(<Identifier>name, body, parameters, node, node.flags, node.modifiers);
                    case SyntaxKind.ArrowFunction:
                        return createArrowFunction(body, parameters, node, node.flags, node.modifiers);
                }
            }
            return node;
        }

        export function createFunctionDeclaration(name: Identifier, body: Block, parameters: ParameterDeclaration[], location?: TextRange, flags?: NodeFlags, modifiers?: Node[]): FunctionDeclaration {
            var node = beginNode<FunctionDeclaration>(SyntaxKind.FunctionDeclaration);
            node.name = name;
            node.body = body;
            node.parameters = createNodeArray(parameters);
            return finishNode(node, location, flags, modifiers);
        }

        export function updateFunctionDeclaration(node: FunctionDeclaration, name: Identifier, body: Block, parameters: ParameterDeclaration[]): FunctionDeclaration {
            if (node.name !== name || node.body !== body || node.parameters !== parameters) {
                return createFunctionDeclaration(name, body, parameters, node, node.flags, node.modifiers);
            }
            return node;
        }

        export function createMethodDeclaration(name: DeclarationName, body: Block, parameters: ParameterDeclaration[], location?: TextRange, flags?: NodeFlags, modifiers?: Node[]): MethodDeclaration {
            var node = beginNode<MethodDeclaration>(SyntaxKind.MethodDeclaration);
            node.name = name;
            node.body = body;
            node.parameters = createNodeArray(parameters);
            return finishNode(node, location, flags, modifiers);
        }

        export function updateMethodDeclaration(node: MethodDeclaration, name: DeclarationName, body: Block, parameters: ParameterDeclaration[]): MethodDeclaration {
            if (node.name !== name || node.body !== body || node.parameters !== parameters) {
                return createMethodDeclaration(name, body, parameters, node, node.flags, node.modifiers);
            }
            return node;
        }

        export function createGetAccessor(name: DeclarationName, body: Block, parameters: ParameterDeclaration[], location?: TextRange, flags?: NodeFlags, modifiers?: Node[]): AccessorDeclaration {
            var node = beginNode<AccessorDeclaration>(SyntaxKind.GetAccessor);
            node.name = name;
            node.body = body;
            node.parameters = createNodeArray(parameters);
            return finishNode(node, location, flags, modifiers);
        }

        export function updateGetAccessor(node: AccessorDeclaration, name: DeclarationName, body: Block, parameters: ParameterDeclaration[]): AccessorDeclaration {
            if (node.name !== name || node.body !== body || node.parameters !== parameters) {
                return createGetAccessor(name, body, parameters, node, node.flags, node.modifiers);
            }
            return node;
        }

        // expressions
        export function createTypeOfExpression(expression: UnaryExpression, location?: TextRange, flags?: NodeFlags): TypeOfExpression {
            var node = beginNode<TypeOfExpression>(SyntaxKind.TypeOfExpression);
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateTypeOfExpression(node: TypeOfExpression, expression: UnaryExpression): TypeOfExpression {
            if (node.expression !== expression) {
                return createTypeOfExpression(expression, node, node.flags);
            }
            return node;
        }

        export function createDeleteExpression(expression: UnaryExpression, location?: TextRange, flags?: NodeFlags): DeleteExpression {
            var node = beginNode<DeleteExpression>(SyntaxKind.DeleteExpression);
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateDeleteExpression(node: TypeOfExpression, expression: UnaryExpression): DeleteExpression {
            if (node.expression !== expression) {
                return createDeleteExpression(expression, node, node.flags);
            }
            return node;
        }

        export function createVoidExpression(expression: UnaryExpression, location?: TextRange, flags?: NodeFlags): VoidExpression {
            var node = beginNode<VoidExpression>(SyntaxKind.VoidExpression);
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateVoidExpression(node: VoidExpression, expression: UnaryExpression): VoidExpression {
            if (node.expression !== expression) {
                return createVoidExpression(expression, node, node.flags);
            }
            return node;
        }

        export function createAwaitExpression(expression: UnaryExpression, location?: TextRange, flags?: NodeFlags): AwaitExpression {
            var node = beginNode<AwaitExpression>(SyntaxKind.AwaitExpression);
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateAwaitExpression(node: VoidExpression, expression: UnaryExpression): AwaitExpression {
            if (node.expression !== expression) {
                return createAwaitExpression(expression, node, node.flags);
            }
            return node;
        }

        export function createYieldExpression(expression: Expression, asteriskToken?: Node, location?: TextRange, flags?: NodeFlags): YieldExpression {
            var node = beginNode<YieldExpression>(SyntaxKind.YieldExpression);
            node.expression = expression;
            node.asteriskToken = asteriskToken;
            return finishNode(node, location, flags);
        }

        export function updateYieldExpression(node: YieldExpression, expression: Expression): YieldExpression {
            if (node.expression !== expression) {
                return createYieldExpression(expression, node.asteriskToken, node, node.flags);
            }
            return node;
        }

        export function createPrefixUnaryExpression(operator: SyntaxKind, operand: UnaryExpression, location?: TextRange, flags?: NodeFlags): PrefixUnaryExpression {
            var node = beginNode<PrefixUnaryExpression>(SyntaxKind.PrefixUnaryExpression);
            node.operator = operator;
            node.operand = operand;
            return finishNode(node, location, flags);
        }

        export function updatePrefixUnaryExpression(node: PrefixUnaryExpression, operand: UnaryExpression): PrefixUnaryExpression {
            if (node.operand !== operand) {
                return createPrefixUnaryExpression(node.operator, operand, node, node.flags);
            }
            return node;
        }

        export function createPostfixUnaryExpression(operator: SyntaxKind, operand: LeftHandSideExpression, location?: TextRange, flags?: NodeFlags): PostfixUnaryExpression {
            var node = beginNode<PostfixUnaryExpression>(SyntaxKind.PostfixUnaryExpression);
            node.operator = operator;
            node.operand = operand;
            return finishNode(node, location, flags);
        }

        export function updatePostfixUnaryExpression(node: PostfixUnaryExpression, operand: LeftHandSideExpression): PostfixUnaryExpression {
            if (node.operand !== operand) {
                return createPostfixUnaryExpression(node.operator, operand, node, node.flags);
            }
            return node;
        }

        export function createBinaryExpression(operator: SyntaxKind, left: Expression, right: Expression, location?: TextRange, flags?: NodeFlags): BinaryExpression {
            var node = beginNode<BinaryExpression>(SyntaxKind.BinaryExpression);
            node.operator = operator;
            node.left = left;
            node.right = right;
            return finishNode(node, location, flags);
        }

        export function updateBinaryExpression(node: BinaryExpression, left: Expression, right: Expression): BinaryExpression {
            if (node.left !== left || node.right !== right) {
                return createBinaryExpression(node.operator, left, right, node, node.flags);
            }
            return node;
        }

        export function createConditionalExpression(condition: Expression, whenTrue: Expression, whenFalse: Expression, location?: TextRange, flags?: NodeFlags): ConditionalExpression {
            var node = beginNode<ConditionalExpression>(SyntaxKind.ConditionalExpression);
            node.condition = condition;
            node.whenTrue = whenTrue;
            node.whenFalse = whenFalse;
            return finishNode(node, location, flags);
        }

        export function updateConditionalExpression(node: ConditionalExpression, condition: Expression, whenTrue: Expression, whenFalse: Expression): ConditionalExpression {
            if (node.condition !== condition || node.whenTrue !== whenTrue || node.whenFalse !== whenFalse) {
                return createConditionalExpression(condition, whenTrue, whenFalse, node, node.flags);
            }
            return node;
        }

        export function createFunctionExpression(name: Identifier, body: Expression | Block, parameters: ParameterDeclaration[], location?: TextRange, flags?: NodeFlags, modifiers?: Node[]): FunctionExpression {
            var node = beginNode<FunctionExpression>(SyntaxKind.FunctionExpression);
            node.name = name;
            node.body = body;
            node.parameters = createNodeArray(parameters);
            return finishNode(node, location, flags, modifiers);
        }

        export function updateFunctionExpression(node: FunctionExpression, name: Identifier, body: Expression | Block, parameters: ParameterDeclaration[]): FunctionExpression {
            if (node.name !== name || node.body !== body || node.parameters !== parameters) {
                return createFunctionExpression(name, body, parameters, node, node.flags, node.modifiers);
            }
            return node;
        }

        export function createArrowFunction(body: Expression | Block, parameters: ParameterDeclaration[], location?: TextRange, flags?: NodeFlags, modifiers?: Node[]): FunctionExpression {
            var node = beginNode<FunctionExpression>(SyntaxKind.ArrowFunction);
            node.body = body;
            node.parameters = createNodeArray(parameters);
            return finishNode(node, location, flags, modifiers);
        }

        export function updateArrowExpression(node: FunctionExpression, body: Expression | Block, parameters: ParameterDeclaration[]): FunctionExpression {
            if (node.body !== body || node.parameters !== parameters) {
                return createArrowFunction(body, parameters, node, node.flags);
            }
            return node;
        }

        export function createParenthesizedExpression(expression: Expression, location?: TextRange, flags?: NodeFlags): ParenthesizedExpression {
            var node = beginNode<ParenthesizedExpression>(SyntaxKind.ParenthesizedExpression);
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateParenthesizedExpression(node: ParenthesizedExpression, expression: Expression): ParenthesizedExpression {
            if (node.expression !== expression) {
                return createParenthesizedExpression(expression, node, node.flags);
            }
            return node;
        }

        export function createArrayLiteralExpression(elements: Expression[], location?: TextRange, flags?: NodeFlags): ArrayLiteralExpression {
            var node = beginNode<ArrayLiteralExpression>(SyntaxKind.ArrayLiteralExpression);
            node.elements = createNodeArray(elements);
            return finishNode(node, location, flags);
        }

        export function updateArrayLiteralExpression(node: ArrayLiteralExpression, elements: Expression[]): ArrayLiteralExpression {
            if (node.elements !== elements) {
                return createArrayLiteralExpression(elements, node, node.flags);
            }
            return node;
        }

        export function createObjectLiteralExpression(properties: ObjectLiteralElement[], location?: TextRange, flags?: NodeFlags): ObjectLiteralExpression {
            var node = beginNode<ObjectLiteralExpression>(SyntaxKind.ObjectLiteralExpression);
            node.properties = createNodeArray(properties);
            return finishNode(node, location, flags);
        }

        export function updateObjectLiteralExpression(node: ObjectLiteralExpression, properties: ObjectLiteralElement[]): ObjectLiteralExpression {
            if (node.properties !== properties) {
                return createObjectLiteralExpression(properties, node, node.flags);
            }
            return node;
        }

        export function createPropertyAssignment(name: DeclarationName, initializer: Expression, location?: TextRange, flags?: NodeFlags): PropertyAssignment {
            var node = beginNode<PropertyAssignment>(SyntaxKind.PropertyAssignment);
            node.name = name;
            node.initializer = initializer;
            return finishNode(node, location, flags);
        }

        export function updatePropertyAssignment(node: PropertyAssignment, name: DeclarationName, initializer: Expression): PropertyAssignment {
            if (node.name !== name || node.initializer !== initializer) {
                return createPropertyAssignment(name, initializer, node, node.flags);
            }
            return node;
        }

        export function createPropertyAccessExpression(expression: LeftHandSideExpression, name: Identifier, location?: TextRange, flags?: NodeFlags): PropertyAccessExpression {
            var node = beginNode<PropertyAccessExpression>(SyntaxKind.PropertyAccessExpression);
            node.expression = expression;
            node.name = name;
            return finishNode(node, location, flags);
        }

        export function updatePropertyAccessExpression(node: PropertyAccessExpression, expression: LeftHandSideExpression, name: Identifier): PropertyAccessExpression {
            if (node.expression !== expression || node.name !== name) {
                return createPropertyAccessExpression(expression, name, node, node.flags);
            }
            return node;
        }

        export function createElementAccessExpression(expression: LeftHandSideExpression, argumentExpression: Expression, location?: TextRange, flags?: NodeFlags): ElementAccessExpression {
            var node = beginNode<ElementAccessExpression>(SyntaxKind.ElementAccessExpression);
            node.expression = expression;
            node.argumentExpression = argumentExpression;
            return finishNode(node, location, flags);
        }

        export function updateElementAccessExpression(node: ElementAccessExpression, expression: LeftHandSideExpression, argumentExpression: Expression): ElementAccessExpression {
            if (node.expression !== expression || node.argumentExpression !== argumentExpression) {
                return createElementAccessExpression(expression, argumentExpression, node, node.flags);
            }
            return node;
        }

        export function createCallExpression(expression: LeftHandSideExpression, arguments: Expression[], location?: TextRange, flags?: NodeFlags): CallExpression {
            var node = beginNode<CallExpression>(SyntaxKind.CallExpression);
            node.expression = expression;
            node.arguments = createNodeArray(arguments);
            return finishNode(node, location, flags);
        }

        export function updateCallExpression(node: CallExpression, expression: LeftHandSideExpression, arguments: Expression[]): CallExpression {
            if (node.expression !== expression || node.arguments !== arguments) {
                return createCallExpression(expression, arguments, node, node.flags);
            }
            return node;
        }

        export function createNewExpression(expression: LeftHandSideExpression, arguments: Expression[], location?: TextRange, flags?: NodeFlags): NewExpression {
            var node = beginNode<NewExpression>(SyntaxKind.NewExpression);
            node.expression = expression;
            node.arguments = createNodeArray(arguments);
            return finishNode(node, location, flags);
        }

        export function updateNewExpression(node: NewExpression, expression: LeftHandSideExpression, arguments: Expression[]): NewExpression {
            if (node.expression !== expression || node.arguments !== arguments) {
                return createNewExpression(expression, arguments, node, node.flags);
            }
            return node;
        }

        export function createShorthandPropertyAssignment(name: Identifier, location?: TextRange, flags?: NodeFlags): ShorthandPropertyAssignment {
            var node = beginNode<ShorthandPropertyAssignment>(SyntaxKind.ShorthandPropertyAssignment);
            node.name = name;
            return finishNode(node, location, flags);
        }

        export function updateShorthandPropertyAssignment(node: ShorthandPropertyAssignment, name: Identifier): ShorthandPropertyAssignment {
            if (node.name !== name) {
                return createShorthandPropertyAssignment(name, node, node.flags);
            }
            return node;
        }

        export function createTypeAssertion(type: TypeNode, expression: UnaryExpression, location?: TextRange, flags?: NodeFlags): TypeAssertion {
            var node = beginNode<TypeAssertion>(SyntaxKind.TypeAssertionExpression);
            node.type = type;
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateTypeAssertion(node: TypeAssertion, expression: UnaryExpression): TypeAssertion {
            if (node.expression !== expression) {
                return createTypeAssertion(node.type, expression, node, node.flags);
            }
            return node;
        }

        export function createTaggedTemplateExpression(tag: LeftHandSideExpression, template: LiteralExpression | TemplateExpression, location?: TextRange, flags?: NodeFlags): TaggedTemplateExpression {
            var node = beginNode<TaggedTemplateExpression>(SyntaxKind.TaggedTemplateExpression);
            node.tag = tag;
            node.template = template;
            return finishNode(node, location, flags);
        }

        export function updateTaggedTemplateExpression(node: TaggedTemplateExpression, tag: LeftHandSideExpression, template: LiteralExpression | TemplateExpression): TaggedTemplateExpression {
            if (node.tag !== tag || node.template !== template) {
                return createTaggedTemplateExpression(tag, template, node, node.flags);
            }
            return node;
        }

        export function createTemplateExpression(head: LiteralExpression, templateSpans: TemplateSpan[], location?: TextRange, flags?: NodeFlags): TemplateExpression {
            var node = beginNode<TemplateExpression>(SyntaxKind.TemplateExpression);
            node.head = head;
            node.templateSpans = createNodeArray(templateSpans);
            return finishNode(node, location, flags);
        }

        export function updateTemplateExpression(node: TemplateExpression, head: LiteralExpression, templateSpans: TemplateSpan[]): TemplateExpression {
            if (node.head !== head || node.templateSpans !== templateSpans) {
                return createTemplateExpression(head, templateSpans, node, node.flags);
            }
            return node;
        }

        export function createOmittedExpression(location?: TextRange, flags?: NodeFlags): Expression {
            return finishNode(beginNode<Expression>(SyntaxKind.OmittedExpression), location, flags);
        }

        export function createTemplateSpan(expression: Expression, literal: LiteralExpression, location?: TextRange, flags?: NodeFlags): TemplateSpan {
            var node = beginNode<TemplateSpan>(SyntaxKind.TemplateSpan);
            node.expression = expression;
            node.literal = literal;
            return finishNode(node, location, flags);
        }

        export function updateTemplateSpan(node: TemplateSpan, expression: Expression, literal: LiteralExpression): TemplateSpan {
            if (node.expression !== expression || node.literal !== literal) {
                return createTemplateSpan(expression, literal, node, node.flags);
            }
            return node;
        }

        export function createStringLiteral(text: string, location?: TextRange, flags?: NodeFlags): StringLiteralExpression {
            var node = beginNode<StringLiteralExpression>(SyntaxKind.StringLiteral);
            node.text = text;
            return finishNode(node, location, flags);
        }

        export function createNumericLiteral(value: number, location?: TextRange, flags?: NodeFlags): LiteralExpression {
            var node = beginNode<LiteralExpression>(SyntaxKind.NumericLiteral);
            node.text = String(value);
            return finishNode(node, location, flags);
        }

        export function createSpreadElementExpression(expression: Expression, location?: TextRange, flags?: NodeFlags): SpreadElementExpression {
            var node = beginNode<SpreadElementExpression>(SyntaxKind.SpreadElementExpression);
            return finishNode(node, location, flags);
        }

        export function updateSpreadElementExpression(node: SpreadElementExpression, expression: Expression): SpreadElementExpression {
            if (node.expression !== expression) {
                return createSpreadElementExpression(expression, node, node.flags);
            }
            return node;
        }

        // statements
        export function createBlock(statements: Statement[], location?: TextRange, flags?: NodeFlags): Block {
            var node = beginNode<Block>(SyntaxKind.Block);
            node.statements = createNodeArray(statements);
            return finishNode(node, location, flags);
        }

        export function updateBlock(node: Block, statements: Statement[]): Block {
            if (node.statements !== statements) {
                return createBlock(statements, node, node.flags);
            }
            return node;
        }

        export function createVariableDeclarationList(declarations: VariableDeclaration[], location?: TextRange, flags?: NodeFlags): VariableDeclarationList {
            var node = beginNode<VariableDeclarationList>(SyntaxKind.VariableDeclarationList);
            node.declarations = createNodeArray(declarations);
            return finishNode(node, location, flags);
        }

        export function updateVariableDeclarationList(node: VariableDeclarationList, declarations: VariableDeclaration[]): VariableDeclarationList {
            if (node.declarations !== declarations) {
                return createVariableDeclarationList(declarations, node, node.flags);
            }
            return node;
        }

        export function createVariableStatement(declarationList: VariableDeclarationList, location?: TextRange, flags?: NodeFlags): VariableStatement {
            var node = beginNode<VariableStatement>(SyntaxKind.VariableStatement);
            node.declarationList = declarationList;
            return finishNode(node, location, flags);
        }

        export function updateVariableStatement(node: VariableStatement, declarationList: VariableDeclarationList): VariableStatement {
            if (node.declarationList !== declarationList) {
                return createVariableStatement(declarationList, node, node.flags);
            }
            return node;
        }

        export function createEmptyStatement(location?: TextRange, flags?: NodeFlags): Statement {
            var node = beginNode<Statement>(SyntaxKind.EmptyStatement);
            return finishNode(node, location, flags);
        }

        export function createExpressionStatement(expression: Expression, location?: TextRange, flags?: NodeFlags): ExpressionStatement {
            var node = beginNode<ExpressionStatement>(SyntaxKind.ExpressionStatement);
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateExpressionStatement(node: ExpressionStatement, expression: Expression): ExpressionStatement {
            if (node.expression !== expression) {
                return createExpressionStatement(expression, node, node.flags);
            }
            return node;
        }

        export function createIfStatement(expression: Expression, thenStatement: Statement, elseStatement?: Statement, location?: TextRange, flags?: NodeFlags): IfStatement {
            var node = beginNode<IfStatement>(SyntaxKind.IfStatement);
            node.expression = expression;
            node.thenStatement = thenStatement;
            node.elseStatement = elseStatement;
            return finishNode(node, location, flags);
        }

        export function updateIfStatement(node: IfStatement, expression: Expression, thenStatement: Statement, elseStatement: Statement): IfStatement {
            if (node.expression !== expression || node.thenStatement !== thenStatement || node.elseStatement !== elseStatement) {
                return createIfStatement(expression, thenStatement, elseStatement, node, node.flags);
            }
            return node;
        }

        export function createDoStatement(statement: Statement, expression: Expression, location?: TextRange, flags?: NodeFlags): DoStatement {
            var node = beginNode<DoStatement>(SyntaxKind.DoStatement);
            node.statement = statement;
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateDoStatement(node: DoStatement, statement: Statement, expression: Expression): DoStatement {
            if (node.expression !== expression || node.statement !== statement) {
                return createDoStatement(statement, expression, node, node.flags);
            }
            return node;
        }

        export function createWhileStatement(expression: Expression, statement: Statement, location?: TextRange, flags?: NodeFlags): WhileStatement {
            var node = beginNode<WhileStatement>(SyntaxKind.WhileStatement);
            node.expression = expression;
            node.statement = statement;
            return finishNode(node, location, flags);
        }

        export function updateWhileStatement(node: WhileStatement, expression: Expression, statement: Statement): WhileStatement {
            if (node.expression !== expression || node.statement !== statement) {
                return createWhileStatement(expression, statement, node, node.flags);
            }
            return node;
        }

        export function createForStatement(initializer: VariableDeclarationList | Expression, condition: Expression, iterator: Expression, statement: Statement, location?: TextRange, flags?: NodeFlags): ForStatement {
            var node = beginNode<ForStatement>(SyntaxKind.ForStatement);
            node.initializer = initializer;
            node.condition = condition;
            node.iterator = iterator;
            node.statement = statement;
            return finishNode(node, location, flags);
        }

        export function updateForStatement(node: ForStatement, initializer: VariableDeclarationList | Expression, condition: Expression, iterator: Expression, statement: Statement): ForStatement {
            if (node.initializer !== initializer || node.condition !== condition || node.iterator !== iterator || node.statement !== statement) {
                return createForStatement(initializer, condition, iterator, statement, node, node.flags);
            }
            return node;
        }

        export function createForInStatement(initializer: VariableDeclarationList | Expression, expression: Expression, statement: Statement, location?: TextRange, flags?: NodeFlags): ForInStatement {
            var node = beginNode<ForInStatement>(SyntaxKind.ForInStatement);
            node.initializer = initializer;
            node.expression = expression;
            node.statement = statement;
            return finishNode(node, location, flags);
        }

        export function updateForInStatement(node: ForInStatement, initializer: VariableDeclarationList | Expression, expression: Expression, statement: Statement): ForInStatement {
            if (node.initializer !== initializer || node.expression !== expression || node.statement !== statement) {
                return createForInStatement(initializer, expression, statement, node, node.flags);
            }
            return node;
        }

        export function createBreakStatement(label: Identifier, location?: TextRange, flags?: NodeFlags): BreakOrContinueStatement {
            var node = beginNode<BreakOrContinueStatement>(SyntaxKind.BreakStatement);
            node.label = label;
            return finishNode(node, location, flags);
        }

        export function updateBreakStatement(node: BreakOrContinueStatement, label: Identifier): BreakOrContinueStatement {
            if (node.label !== label) {
                return createBreakStatement(label, node, node.flags);
            }
            return node;
        }

        export function createContinueStatement(label: Identifier, location?: TextRange, flags?: NodeFlags): BreakOrContinueStatement {
            var node = beginNode<BreakOrContinueStatement>(SyntaxKind.ContinueStatement);
            node.label = label;
            return finishNode(node, location, flags);
        }

        export function updateContinueStatement(node: BreakOrContinueStatement, label: Identifier): BreakOrContinueStatement {
            if (node.label !== label) {
                return createContinueStatement(label, node, node.flags);
            }
            return node;
        }

        export function createReturnStatement(expression: Expression, location?: TextRange, flags?: NodeFlags): ReturnStatement {
            var node = beginNode<ReturnStatement>(SyntaxKind.ReturnStatement);
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateReturnStatement(node: ReturnStatement, expression: Expression): ReturnStatement {
            if (node.expression !== expression) {
                return createReturnStatement(expression, node, node.flags);
            }
            return node;
        }

        export function createWithStatement(expression: Expression, statement: Statement, location?: TextRange, flags?: NodeFlags): WithStatement {
            var node = beginNode<WithStatement>(SyntaxKind.WithStatement);
            node.expression = expression;
            node.statement = statement;
            return finishNode(node, location, flags);
        }

        export function updateWithStatement(node: WithStatement, expression: Expression, statement: Statement): WithStatement {
            if (node.expression !== expression || node.statement !== statement) {
                return createWithStatement(expression, statement, node, node.flags);
            }
            return node;
        }

        export function createSwitchStatement(expression: Expression, clauses: CaseOrDefaultClause[], location?: TextRange, flags?: NodeFlags): SwitchStatement {
            var node = beginNode<SwitchStatement>(SyntaxKind.SwitchStatement);
            node.expression = expression;
            node.clauses = createNodeArray(clauses);
            return finishNode(node, location, flags);
        }

        export function updateSwitchStatement(node: SwitchStatement, expression: Expression, clauses: CaseOrDefaultClause[]): SwitchStatement {
            if (node.expression !== expression || node.clauses !== clauses) {
                return createSwitchStatement(expression, clauses, node, node.flags);
            }
            return node;
        }

        export function createCaseClause(expression: Expression, statements: Statement[], location?: TextRange, flags?: NodeFlags): CaseClause {
            var node = beginNode<CaseClause>(SyntaxKind.CaseClause);
            node.expression = expression;
            node.statements = createNodeArray(statements);
            return finishNode(node, location, flags);
        }

        export function updateCaseClause(node: CaseClause, expression: Expression, statements: Statement[]): CaseClause {
            if (node.expression !== expression || node.statements !== statements) {
                return createCaseClause(expression, statements, node, node.flags);
            }
            return node;
        }

        export function createDefaultClause(statements: Statement[], location?: TextRange, flags?: NodeFlags): DefaultClause {
            var node = beginNode<DefaultClause>(SyntaxKind.DefaultClause);
            node.statements = createNodeArray(statements);
            return finishNode(node, location, flags);
        }

        export function updateDefaultClause(node: DefaultClause, statements: Statement[]): DefaultClause {
            if (node.statements !== statements) {
                return createDefaultClause(statements, node, node.flags);
            }
            return node;
        }

        export function createLabeledStatement(label: Identifier, statement: Statement, location?: TextRange, flags?: NodeFlags): LabeledStatement {
            var node = beginNode<LabeledStatement>(SyntaxKind.LabeledStatement);
            node.label = label;
            node.statement = statement;
            return finishNode(node, location, flags);
        }

        export function updateLabeledStatement(node: LabeledStatement, label: Identifier, statement: Statement): LabeledStatement {
            if (node.label !== label || node.statement !== statement) {
                return createLabeledStatement(label, statement, node, node.flags);
            }
            return node;
        }

        export function createThrowStatement(expression: Expression, location?: TextRange, flags?: NodeFlags): ThrowStatement {
            var node = beginNode<ThrowStatement>(SyntaxKind.ThrowStatement);
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateThrowStatement(node: ThrowStatement, expression: Expression): ThrowStatement {
            if (node.expression !== expression) {
                return createThrowStatement(expression, node, node.flags);
            }
        }

        export function createTryStatement(tryBlock: Block, catchBlock: CatchClause, finallyBlock: Block, location?: TextRange, flags?: NodeFlags): TryStatement {
            var node = beginNode<TryStatement>(SyntaxKind.TryStatement);
            node.tryBlock = tryBlock;
            node.catchClause = catchBlock;
            node.finallyBlock = finallyBlock;
            return finishNode(node, location, flags);
        }

        export function updateTryStatement(node: TryStatement, tryBlock: Block, catchBlock: CatchClause, finallyBlock: Block): TryStatement {
            if (node.tryBlock !== tryBlock || node.catchClause !== catchBlock || node.finallyBlock !== finallyBlock) {
                return createTryStatement(tryBlock, catchBlock, finallyBlock, node, node.flags);
            }
            return node;
        }

        export function createCatchClause(name: Identifier, block: Block, location?: TextRange, flags?: NodeFlags): CatchClause {
            var node = beginNode<CatchClause>(SyntaxKind.CatchClause);
            node.name = name;
            node.block = block;
            return finishNode(node, location, flags);
        }

        export function updateCatchClause(node: CatchClause, name: Identifier, block: Block): CatchClause {
            if (node.name !== name || node.block !== block) {
                return createCatchClause(name, block, node, node.flags);
            }
            return node;
        }

        export function createGeneratedLabel(label: Label, labelNumbers: number[], location?: TextRange): GeneratedLabel {
            var node = beginNode<GeneratedLabel>(SyntaxKind.GeneratedLabel);
            node.label = label;
            node.labelNumbers = labelNumbers;
            return finishNode(node, location);
        }

        export function getExpressionForEntityName(name: EntityName): LeftHandSideExpression {
            if (!name) {
                return finishNode(beginNode<LeftHandSideExpression>(SyntaxKind.NullKeyword));
            }

            if (name.kind === SyntaxKind.Identifier) {
                return createIdentifier((<Identifier>name).text);
            }
            else {
                return createPropertyAccessExpression(getExpressionForEntityName((<QualifiedName>name).left), createIdentifier((<QualifiedName>name).right.text));
            }
        }

        function childAdded(parent: Node, child: Node): void {
            if (child && !child.parent) {
                child.parent = parent;
            }
        }

        function beginNode<TNode extends Node>(kind: SyntaxKind): TNode {
            var ctor = getNodeConstructor(kind);
            var node = <TNode>(new ctor());
            return node;
        }

        function finishNode<TNode extends Node>(node: TNode, location?: TextRange, flags?: NodeFlags, modifiers?: Node[]): TNode {
            if (location) {
                node.pos = location.pos;
                node.end = location.end;
            }
            else {
                node.pos = -1;
                node.end = -1;
            }

            if (flags) {
                node.flags = flags;
            }

            if (modifiers) {
                node.modifiers = <ModifiersArray>modifiers;
                node.flags |= node.modifiers.flags;
            }

            forEachChild(node, child => childAdded(node, child));
            return node;
        }
    }

    export module Visitor {
        var activeVisitor: Visitor;

        export function create(handler: Handler): Visitor {
            var visitor: Visitor = {
                // Identifiers
                //// visitIdentifier,

                // Names
                visitDeclarationName,
                //// visitQualifiedName,
                visitComputedPropertyName,

                // Signature elements
                //// visitTypeParamter,
                //// visitParameter,

                // Type members
                //// visitClassElement,
                //// visitPropertySignature,
                //// visitPropertyDeclaration,
                //// visitMethodSignature,
                visitMethodDeclaration,
                //// visitConstructor,
                visitGetAccessor,
                visitSetAccessor,
                //// visitCallSignature,
                //// visitConstructSignature,
                //// visitIndexSignature,

                // Type
                //// visitTypeReference,
                //// visitFunctionType,
                //// visitConstructorType,
                //// visitTypeQuery,
                //// visitTypeLiteral,
                //// visitArrayType,
                //// visitTupleType,
                //// visitUnionType,
                //// visitParenthesizedType,
                //// visitStringLiteralType,
                
                // Binding pattern
                visitIdentifierOrBindingPattern,
                visitObjectBindingPattern,
                visitArrayBindingPattern,
                visitBindingElement,
                
                // Expression
                visitExpression,
                visitBinaryExpression,
                visitConditionalExpression,
                visitYieldExpression,
                visitSpreadElementExpression,
                visitUnaryExpression,
                visitPrefixUnaryExpression,
                visitPostfixUnaryExpression,
                visitAwaitExpression,
                visitTypeOfExpression,
                visitDeleteExpression,
                visitVoidExpression,
                visitTypeAssertion,
                visitLeftHandSideExpression,
                visitParenthesizedExpression,
                visitArrayLiteralExpression,
                visitObjectLiteralExpression,
                visitPropertyAccessExpression,
                visitElementAccessExpression,
                visitFunctionExpression,
                visitArrowFunction,
                visitCallExpression,
                visitNewExpression,
                visitTaggedTemplateExpression,
                visitTemplateLiteralOrTemplateExpression,
                visitTemplateExpression,
                visitTemplateLiteral,
                visitOmittedExpression,
                
                // Misc
                visitTemplateSpan,
                
                // Element
                //// visitModuleElement,
                visitStatement,
                visitBlock,
                visitVariableStatement,
                visitEmptyStatement,
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
                visitThrowStatement,
                visitTryStatement,
                visitDebuggerStatement,
                visitVariableDeclaration,
                visitVariableDeclarationList,
                visitVariableDeclarationListOrInitializer,
                visitFunctionDeclaration,
                
                // Module references
                //// visitExternalModuleReference,
                
                // Clauses
                visitCaseOrDefaultClause,
                visitCaseClause,
                visitDefaultClause,
                //// visitHeritageClause,
                visitCatchClause,
                
                // Property assignments
                visitObjectLiteralElement,
                visitPropertyAssignment,
                visitShorthandPropertyAssignment,
                
                // Enum
                //// visitEnumMember,
                
                // Top-level nodes
                //// visitSourceFile,
            };

            return visitor;

            // Identifiers
            //// function visitIdentifier(node: Identifier): Identifier;

            // Names
            function visitDeclarationName(node: DeclarationName): DeclarationName {
                return visitNode(node, Visitor.visitDeclarationName);
            }

            //// function visitQualifiedName(node: QualifiedName): QualifiedName;

            function visitComputedPropertyName(node: ComputedPropertyName): DeclarationName {
                return visitNode(node, Visitor.visitComputedPropertyName, handler.visitComputedPropertyName);
            }

            // Signature elements
            //// function visitTypeParamter(node: TypeParamterDeclaration): TypeParamterDeclaration;
            //// function visitParameter(node: ParameterDeclaration): ParameterDeclaration;

            // Type members
            //// function visitClassElement(node: ClassElement): ClassElement;
            //// function visitPropertySignature(node: PropertyDeclaration): ClassElement;
            //// function visitPropertyDeclaration(node: PropertyDeclaration): ClassElement;
            //// function visitMethodSignature(node: MethodDeclaration): ClassElement;

            function visitMethodDeclaration(node: MethodDeclaration): ObjectLiteralElement | ClassElement {
                return visitNode(node, Visitor.visitMethodDeclaration, handler.visitMethodDeclaration);
            }

            //// function visitConstructor(node: ConstructorDeclaration): ClassElement;

            function visitGetAccessor(node: AccessorDeclaration): ObjectLiteralElement | ClassElement {
                return visitNode(node, Visitor.visitGetAccessor, handler.visitGetAccessor);
            }

            function visitSetAccessor(node: AccessorDeclaration): ObjectLiteralElement | ClassElement {
                return visitNode(node, Visitor.visitSetAccessor, handler.visitSetAccessor);
            }

            //// function visitCallSignature(node: SignatureDeclaration): ClassElement;
            //// function visitConstructSignature(node: SignatureDeclaration): ClassElement;
            //// function visitIndexSignature(node: SignatureDeclaration): ClassElement;

            // Type
            //// function visitTypeReference(node: TypeReferenceNode): TypeNode;
            //// function visitFunctionType(node: FunctionOrConstructorTypeNode): TypeNode;
            //// function visitConstructorType(node: FunctionOrConstructorTypeNode): TypeNode;
            //// function visitTypeQuery(node: TypeQueryNode): TypeNode;
            //// function visitTypeLiteral(node: TypeLiteralNode): TypeNode;
            //// function visitArrayType(node: ArrayTypeNode): TypeNode;
            //// function visitTupleType(node: TupleTypeNode): TypeNode;
            //// function visitUnionType(node: UnionTypeNode): TypeNode;
            //// function visitParenthesizedType(node: ParenthesizedTypeNode): TypeNode;
            //// function visitStringLiteralType(node: StringLiteralTypeNode): TypeNode;

            // Binding pattern
            function visitIdentifierOrBindingPattern(node: BindingPattern | Identifier): BindingPattern | Identifier {
                return visitNode(node, Visitor.visitIdentifierOrBindingPattern);
            }

            function visitObjectBindingPattern(node: BindingPattern): BindingPattern | Identifier {
                return visitNode(node, Visitor.visitObjectBindingPattern, handler.visitObjectBindingPattern);
            }

            function visitArrayBindingPattern(node: BindingPattern): BindingPattern | Identifier {
                return visitNode(node, Visitor.visitArrayBindingPattern, handler.visitArrayBindingPattern);
            }

            function visitBindingElement(node: BindingElement): BindingElement {
                return visitNode(node, Visitor.visitBindingElement, handler.visitBindingElement);
            }

            // Expression
            function visitExpression(node: Expression): Expression {
                return visitNode(node, Visitor.visitExpression);
            }

            function visitUnaryExpression(node: UnaryExpression): UnaryExpression {
                return visitNode(node, Visitor.visitUnaryExpression);
            }

            function visitLeftHandSideExpression(node: LeftHandSideExpression): LeftHandSideExpression {
                return visitNode(node, Visitor.visitLeftHandSideExpression);
            }

            function visitBinaryExpression(node: BinaryExpression): Expression {
                return visitNode(node, Visitor.visitBinaryExpression, handler.visitBinaryExpression);
            }

            function visitConditionalExpression(node: ConditionalExpression): Expression {
                return visitNode(node, Visitor.visitConditionalExpression, handler.visitConditionalExpression);
            }

            function visitYieldExpression(node: YieldExpression): Expression {
                return visitNode(node, Visitor.visitYieldExpression, handler.visitYieldExpression);
            }

            function visitSpreadElementExpression(node: SpreadElementExpression): Expression {
                return visitNode(node, Visitor.visitSpreadElementExpression, handler.visitSpreadElementExpression);
            }

            function visitPrefixUnaryExpression(node: PrefixUnaryExpression): UnaryExpression {
                return visitNode(node, Visitor.visitPrefixUnaryExpression, handler.visitPrefixUnaryExpression);
            }

            function visitPostfixUnaryExpression(node: PostfixUnaryExpression): UnaryExpression {
                return visitNode(node, Visitor.visitPostfixUnaryExpression, handler.visitPostfixUnaryExpression);
            }

            function visitAwaitExpression(node: AwaitExpression): UnaryExpression {
                return visitNode(node, Visitor.visitAwaitExpression, handler.visitAwaitExpression);
            }

            function visitTypeOfExpression(node: TypeOfExpression): UnaryExpression {
                return visitNode(node, Visitor.visitTypeOfExpression, handler.visitTypeOfExpression);
            }

            function visitDeleteExpression(node: DeleteExpression): UnaryExpression {
                return visitNode(node, Visitor.visitDeleteExpression, handler.visitDeleteExpression);
            }

            function visitVoidExpression(node: VoidExpression): UnaryExpression {
                return visitNode(node, Visitor.visitVoidExpression, handler.visitVoidExpression);
            }

            function visitTypeAssertion(node: TypeAssertion): UnaryExpression {
                return visitNode(node, Visitor.visitTypeAssertion, handler.visitTypeAssertion);
            }

            function visitParenthesizedExpression(node: ParenthesizedExpression): LeftHandSideExpression {
                return visitNode(node, Visitor.visitParenthesizedExpression, handler.visitParenthesizedExpression);
            }

            function visitArrayLiteralExpression(node: ArrayLiteralExpression): LeftHandSideExpression {
                return visitNode(node, Visitor.visitArrayLiteralExpression, handler.visitArrayLiteralExpression);
            }

            function visitObjectLiteralExpression(node: ObjectLiteralExpression): LeftHandSideExpression {
                return visitNode(node, Visitor.visitObjectLiteralExpression, handler.visitObjectLiteralExpression);
            }

            function visitPropertyAccessExpression(node: PropertyAccessExpression): LeftHandSideExpression {
                return visitNode(node, Visitor.visitPropertyAccessExpression, handler.visitPropertyAccessExpression);
            }

            function visitElementAccessExpression(node: ElementAccessExpression): LeftHandSideExpression {
                return visitNode(node, Visitor.visitElementAccessExpression, handler.visitElementAccessExpression);
            }

            function visitFunctionExpression(node: FunctionExpression): LeftHandSideExpression {
                return visitNode(node, Visitor.visitFunctionExpression, handler.visitFunctionExpression);
            }

            function visitArrowFunction(node: FunctionExpression): LeftHandSideExpression {
                return visitNode(node, Visitor.visitArrowFunction, handler.visitArrowFunction);
            }

            function visitCallExpression(node: CallExpression): LeftHandSideExpression {
                return visitNode(node, Visitor.visitCallExpression, handler.visitCallExpression);
            }

            function visitNewExpression(node: NewExpression): LeftHandSideExpression {
                return visitNode(node, Visitor.visitNewExpression, handler.visitNewExpression);
            }

            function visitTaggedTemplateExpression(node: TaggedTemplateExpression): LeftHandSideExpression {
                return visitNode(node, Visitor.visitTaggedTemplateExpression, handler.visitTaggedTemplateExpression);
            }

            function visitTemplateLiteralOrTemplateExpression(node: LiteralExpression | TemplateExpression): LiteralExpression | TemplateExpression {
                return visitNode(node, Visitor.visitTemplateLiteralOrTemplateExpression);
            }

            function visitTemplateLiteral(node: LiteralExpression): LiteralExpression | TemplateExpression {
                return visitNode(node, Visitor.visitTemplateLiteral, handler.visitTemplateLiteral);
            }

            function visitTemplateExpression(node: TemplateExpression): LeftHandSideExpression | LiteralExpression | TemplateExpression {
                return visitNode(node, Visitor.visitTemplateExpression, handler.visitTemplateExpression);
            }

            function visitOmittedExpression(node: Expression): Expression {
                return visitNode(node, Visitor.visitOmittedExpression, handler.visitOmittedExpression);
            }

            // Misc
            function visitTemplateSpan(node: TemplateSpan): TemplateSpan {
                return visitNode(node, Visitor.visitTemplateSpan, handler.visitTemplateSpan);
            }

            // Element
            //// function visitModuleElement(node: ModuleElement): ModuleElement;

            function visitStatement(node: Statement): Statement {
                return visitNode(node, Visitor.visitStatement);
            }

            function visitBlock(node: Block): Block {
                return visitNode(node, Visitor.visitBlock, handler.visitBlock);
            }

            function visitVariableStatement(node: VariableStatement): Statement {
                return visitNode(node, Visitor.visitVariableStatement, handler.visitVariableStatement);
            }

            function visitEmptyStatement(node: Statement): Statement {
                return visitNode(node, Visitor.visitEmptyStatement, handler.visitEmptyStatement);
            }

            function visitExpressionStatement(node: ExpressionStatement): Statement {
                return visitNode(node, Visitor.visitExpressionStatement, handler.visitExpressionStatement);
            }

            function visitIfStatement(node: IfStatement): Statement {
                return visitNode(node, Visitor.visitIfStatement, handler.visitIfStatement);
            }

            function visitDoStatement(node: DoStatement): Statement {
                return visitNode(node, Visitor.visitDoStatement, handler.visitDoStatement);
            }

            function visitWhileStatement(node: WhileStatement): Statement {
                return visitNode(node, Visitor.visitWhileStatement, handler.visitWhileStatement);
            }

            function visitForStatement(node: ForStatement): Statement {
                return visitNode(node, Visitor.visitForStatement, handler.visitForStatement);
            }

            function visitForInStatement(node: ForInStatement): Statement {
                return visitNode(node, Visitor.visitForInStatement, handler.visitForInStatement);
            }

            function visitContinueStatement(node: BreakOrContinueStatement): Statement {
                return visitNode(node, Visitor.visitContinueStatement, handler.visitContinueStatement);
            }

            function visitBreakStatement(node: BreakOrContinueStatement): Statement {
                return visitNode(node, Visitor.visitBreakStatement, handler.visitBreakStatement);
            }

            function visitReturnStatement(node: ReturnStatement): Statement {
                return visitNode(node, Visitor.visitReturnStatement, handler.visitReturnStatement);
            }

            function visitWithStatement(node: WithStatement): Statement {
                return visitNode(node, Visitor.visitWithStatement, handler.visitWithStatement);
            }

            function visitSwitchStatement(node: SwitchStatement): Statement {
                return visitNode(node, Visitor.visitSwitchStatement, handler.visitSwitchStatement);
            }

            function visitLabeledStatement(node: LabeledStatement): Statement {
                return visitNode(node, Visitor.visitLabeledStatement, handler.visitLabeledStatement);
            }

            function visitThrowStatement(node: ThrowStatement): Statement {
                return visitNode(node, Visitor.visitThrowStatement, handler.visitThrowStatement);
            }

            function visitTryStatement(node: TryStatement): Statement {
                return visitNode(node, Visitor.visitTryStatement, handler.visitTryStatement);
            }

            function visitDebuggerStatement(node: Statement): Statement {
                return visitNode(node, Visitor.visitDebuggerStatement, handler.visitDebuggerStatement);
            }

            function visitVariableDeclaration(node: VariableDeclaration): VariableDeclaration {
                return visitNode(node, Visitor.visitVariableDeclaration, handler.visitVariableDeclaration);
            }

            function visitVariableDeclarationList(node: VariableDeclarationList): VariableDeclarationList {
                return visitNode(node, Visitor.visitVariableDeclarationList, handler.visitVariableDeclarationList);
            }

            function visitVariableDeclarationListOrInitializer(node: VariableDeclarationList | Expression): VariableDeclarationList | Expression {
                return visitNode(node, Visitor.visitVariableDeclarationListOrInitializer);
            }

            function visitFunctionDeclaration(node: FunctionDeclaration): Statement {
                return visitNode(node, Visitor.visitFunctionDeclaration, handler.visitFunctionDeclaration);
            }

            //// function visitClassDeclaration(node: ClassDeclaration): ModuleElement;
            //// function visitInterfaceDeclaration(node: InterfaceDeclaration): ModuleElement;
            //// function visitTypeAliasDeclaration(node: TypeAliasDeclaration): ModuleElement;
            //// function visitEnumDeclaration(node: EnumDeclaration): ModuleElement;
            //// function visitModuleDeclaration(node: ModuleDeclaration): ModuleElement;
            //// function visitModuleBlock(node: ModuleBlock): ModuleBlock;
            //// function visitImportDeclaration(node: ImportDeclaration): ModuleElement;
            //// function visitExportAssignment(node: ExportAssignment): ModuleElement;

            // Module references
            //// function visitExternalModuleReference(node: ExternalModuleReference): ExternalModuleReference;

            // Clauses
            function visitCaseOrDefaultClause(node: CaseOrDefaultClause): CaseOrDefaultClause {
                return visitNode(node, Visitor.visitCaseOrDefaultClause);
            }

            function visitCaseClause(node: CaseClause): CaseOrDefaultClause {
                return visitNode(node, Visitor.visitCaseClause, handler.visitCaseClause);
            }

            function visitDefaultClause(node: DefaultClause): CaseOrDefaultClause {
                return visitNode(node, Visitor.visitDefaultClause, handler.visitDefaultClause);
            }

            //// function visitHeritageClause(node: HeritageClause): HeritageClause;

            function visitCatchClause(node: CatchClause): CatchClause {
                return visitNode(node, Visitor.visitCatchClause, handler.visitCatchClause);
            }

            // Property assignments
            function visitObjectLiteralElement(node: ObjectLiteralElement): ObjectLiteralElement {
                return visitNode(node, Visitor.visitObjectLiteralElement);
            }

            function visitPropertyAssignment(node: PropertyAssignment): ObjectLiteralElement {
                return visitNode(node, Visitor.visitPropertyAssignment, handler.visitPropertyAssignment);
            }

            function visitShorthandPropertyAssignment(node: ShorthandPropertyAssignment): ObjectLiteralElement {
                return visitNode(node, Visitor.visitShorthandPropertyAssignment, handler.visitShorthandPropertyAssignment);
            }

            // Enum
            //// function visitEnumMember(node: EnumMember): EnumMember;

            // Top-level nodes
            //// function visitSourceFile(node: SourceFile): SourceFile;

            function visitNode<TNode extends Node, TResult extends Node>(node: TNode, coreVisitor: (node: TNode) => TResult, handlerVisitor?: (node: TNode) => TResult): TResult {
                if (!node) {
                    return <TResult><Node>node;
                }

                var savedVisitor = activeVisitor;
                activeVisitor = visitor;
                var result = handlerVisitor ? handlerVisitor(node) : coreVisitor(node);
                activeVisitor = savedVisitor;
                return result;
            }
        }

        export function visitNodes<TNode extends Node>(nodes: NodeArray<TNode>, visitNode: (node: TNode) => TNode, shouldCacheNode?: (node: Node) => boolean, cacheNode?: (node: TNode) => TNode, removeMissingNodes?: boolean): NodeArray<TNode> {
            if (!nodes || !activeVisitor) {
                return nodes;
            }

            var updatedNodes: TNode[];
            var updatedOffset = 0;
            var cacheOffset = 0;

            for (var i = 0; i < nodes.length; i++) {
                var updatedIndex = i - updatedOffset;
                var node = nodes[i];
                if (shouldCacheNode && shouldCacheNode(node)) {
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

        // Identifiers
        //// export function visitIdentifier(node: Identifier): Identifier;

        // Names
        export function visitDeclarationName(node: DeclarationName): DeclarationName {
            if (!node || !activeVisitor) {
                return node;
            }

            switch (node.kind) {
                case SyntaxKind.Identifier:
                case SyntaxKind.StringLiteral:
                case SyntaxKind.NumericLiteral:
                case SyntaxKind.NoSubstitutionTemplateLiteral:
                    return node;

                case SyntaxKind.ComputedPropertyName:
                    return activeVisitor.visitComputedPropertyName(<ComputedPropertyName>node);

                case SyntaxKind.ArrayBindingPattern:
                    return activeVisitor.visitArrayBindingPattern(<BindingPattern>node);

                case SyntaxKind.ObjectBindingPattern:
                    return activeVisitor.visitObjectBindingPattern(<BindingPattern>node);

                default:
                    reportUnexpectedNode(node);
                    return node;
            }
        }

        //// export function visitQualifiedName(node: QualifiedName): QualifiedName;

        export function visitComputedPropertyName(node: ComputedPropertyName): ComputedPropertyName {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateComputedPropertyName(
                node,
                activeVisitor.visitExpression(node.expression));
        }

        // Signature elements
        //// export function visitTypeParamter(node: TypeParamterDeclaration): TypeParamterDeclaration;
        //// export function visitParameter(node: ParameterDeclaration): ParameterDeclaration;

        // Type members
        //// export function visitClassElement(node: ClassElement): ClassElement;
        //// export function visitPropertySignature(node: PropertyDeclaration): PropertyDeclaration;
        //// export function visitPropertyDeclaration(node: PropertyDeclaration): PropertyDeclaration;
        //// export function visitMethodSignature(node: MethodDeclaration): MethodDeclaration;

        export function visitMethodDeclaration(node: MethodDeclaration): MethodDeclaration {
            return node;
        }

        //// export function visitConstructor(node: ConstructorDeclaration): ConstructorDeclaration;

        export function visitGetAccessor(node: AccessorDeclaration): AccessorDeclaration {
            return node;
        }

        export function visitSetAccessor(node: AccessorDeclaration): AccessorDeclaration {
            return node;
        }

        //// export function visitCallSignature(node: SignatureDeclaration): SignatureDeclaration;
        //// export function visitConstructSignature(node: SignatureDeclaration): SignatureDeclaration;
        //// export function visitIndexSignature(node: SignatureDeclaration): SignatureDeclaration;

        // Type
        //// export function visitTypeReference(node: TypeReferenceNode): TypeReferenceNode;
        //// export function visitFunctionType(node: FunctionOrConstructorTypeNode): FunctionOrConstructorTypeNode;
        //// export function visitConstructorType(node: FunctionOrConstructorTypeNode): FunctionOrConstructorTypeNode;
        //// export function visitTypeQuery(node: TypeQueryNode): TypeQueryNode;
        //// export function visitTypeLiteral(node: TypeLiteralNode): TypeLiteralNode;
        //// export function visitArrayType(node: ArrayTypeNode): ArrayTypeNode;
        //// export function visitTupleType(node: TupleTypeNode): TupleTypeNode;
        //// export function visitUnionType(node: UnionTypeNode): UnionTypeNode;
        //// export function visitParenthesizedType(node: ParenthesizedTypeNode): ParenthesizedTypeNode;
        //// export function visitStringLiteralType(node: StringLiteralTypeNode): StringLiteralTypeNode;

        // Binding pattern
        export function visitIdentifierOrBindingPattern(node: Identifier | BindingPattern): Identifier | BindingPattern {
            if (!node || !activeVisitor) {
                return node;
            }

            switch (node.kind) {
                case SyntaxKind.Identifier:
                    return node;

                case SyntaxKind.ObjectBindingPattern:
                    return activeVisitor.visitObjectBindingPattern(<BindingPattern>node);

                case SyntaxKind.ArrayBindingPattern:
                    return activeVisitor.visitArrayBindingPattern(<BindingPattern>node);

                default:
                    reportUnexpectedNode(node);
                    return node;
            }
        }

        export function visitObjectBindingPattern(node: BindingPattern): BindingPattern {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateObjectBindingPattern(
                node,
                visitNodes(node.elements, activeVisitor.visitBindingElement));
        }

        export function visitArrayBindingPattern(node: BindingPattern): BindingPattern {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateArrayBindingPattern(
                node,
                visitNodes(node.elements, activeVisitor.visitBindingElement));
        }

        export function visitBindingElement(node: BindingElement): BindingElement {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateBindingElement(
                node,
                activeVisitor.visitIdentifierOrBindingPattern(node.name),
                node.propertyName,
                activeVisitor.visitExpression(node.initializer));
        }

        // Expression
        export function visitExpression(node: Expression): Expression {
            if (!node || !activeVisitor) {
                return node;
            }

            switch (node.kind) {
                case SyntaxKind.BinaryExpression:
                    return activeVisitor.visitBinaryExpression(<BinaryExpression>node);

                case SyntaxKind.ConditionalExpression:
                    return activeVisitor.visitConditionalExpression(<ConditionalExpression>node);

                case SyntaxKind.TaggedTemplateExpression:
                    return activeVisitor.visitTaggedTemplateExpression(<TaggedTemplateExpression>node);

                case SyntaxKind.TemplateExpression:
                    return activeVisitor.visitTemplateExpression(<TemplateExpression>node);

                case SyntaxKind.YieldExpression:
                    return activeVisitor.visitYieldExpression(<YieldExpression>node);

                case SyntaxKind.SpreadElementExpression:
                    return activeVisitor.visitSpreadElementExpression(<SpreadElementExpression>node);

                default:
                    return activeVisitor.visitUnaryExpression(<UnaryExpression>node);
            }

            return node;
        }

        export function visitBinaryExpression(node: BinaryExpression): BinaryExpression {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateBinaryExpression(
                node,
                activeVisitor.visitExpression(node.left),
                activeVisitor.visitExpression(node.right));
        }

        export function visitConditionalExpression(node: ConditionalExpression): ConditionalExpression {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateConditionalExpression(
                node,
                activeVisitor.visitExpression(node.condition),
                activeVisitor.visitExpression(node.whenTrue),
                activeVisitor.visitExpression(node.whenFalse));
        }

        export function visitYieldExpression(node: YieldExpression): YieldExpression {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateYieldExpression(
                node,
                activeVisitor.visitExpression(node.expression));
        }

        export function visitUnaryExpression(node: UnaryExpression): UnaryExpression {
            if (!node || !activeVisitor) {
                return node;
            }

            switch (node.kind) {
                case SyntaxKind.PrefixUnaryExpression:
                    return activeVisitor.visitPrefixUnaryExpression(<PrefixUnaryExpression>node);

                case SyntaxKind.PostfixUnaryExpression:
                    return activeVisitor.visitPostfixUnaryExpression(<PostfixUnaryExpression>node);

                case SyntaxKind.AwaitExpression:
                    return activeVisitor.visitAwaitExpression(<AwaitExpression>node);

                case SyntaxKind.TypeOfExpression:
                    return activeVisitor.visitTypeOfExpression(<TypeOfExpression>node);

                case SyntaxKind.DeleteExpression:
                    return activeVisitor.visitDeleteExpression(<DeleteExpression>node);

                case SyntaxKind.VoidExpression:
                    return activeVisitor.visitVoidExpression(<VoidExpression>node);

                case SyntaxKind.TypeAssertionExpression:
                    return activeVisitor.visitTypeAssertion(<TypeAssertion>node);

                default:
                    return activeVisitor.visitLeftHandSideExpression(<LeftHandSideExpression>node);
            }

            return node;
        }

        export function visitPrefixUnaryExpression(node: PrefixUnaryExpression): PrefixUnaryExpression {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updatePrefixUnaryExpression(
                node,
                activeVisitor.visitUnaryExpression(node.operand));
        }

        export function visitPostfixUnaryExpression(node: PostfixUnaryExpression): PostfixUnaryExpression {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updatePostfixUnaryExpression(
                node,
                activeVisitor.visitLeftHandSideExpression(node.operand));
        }

        export function visitAwaitExpression(node: AwaitExpression): AwaitExpression {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateAwaitExpression(
                node,
                activeVisitor.visitUnaryExpression(node.expression));
        }

        export function visitTypeOfExpression(node: TypeOfExpression): TypeOfExpression {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateTypeOfExpression(
                node,
                activeVisitor.visitUnaryExpression(node.expression));
        }

        export function visitDeleteExpression(node: DeleteExpression): DeleteExpression {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateDeleteExpression(
                node,
                activeVisitor.visitUnaryExpression(node.expression));
        }

        export function visitVoidExpression(node: VoidExpression): VoidExpression {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateVoidExpression(
                node,
                activeVisitor.visitUnaryExpression(node.expression));
        }

        export function visitTypeAssertion(node: TypeAssertion): TypeAssertion {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateTypeAssertion(
                node,
                activeVisitor.visitUnaryExpression(node.expression));
        }

        export function visitLeftHandSideExpression(node: LeftHandSideExpression): LeftHandSideExpression {
            if (!node || !activeVisitor) {
                return node;
            }

            switch (node.kind) {
                case SyntaxKind.ParenthesizedExpression:
                    return activeVisitor.visitParenthesizedExpression(<ParenthesizedExpression>node);

                case SyntaxKind.ArrayLiteralExpression:
                    return activeVisitor.visitArrayLiteralExpression(<ArrayLiteralExpression>node);

                case SyntaxKind.ObjectLiteralExpression:
                    return activeVisitor.visitObjectLiteralExpression(<ObjectLiteralExpression>node);

                case SyntaxKind.PropertyAccessExpression:
                    return activeVisitor.visitPropertyAccessExpression(<PropertyAccessExpression>node);

                case SyntaxKind.ElementAccessExpression:
                    return activeVisitor.visitElementAccessExpression(<ElementAccessExpression>node);

                case SyntaxKind.CallExpression:
                    return activeVisitor.visitCallExpression(<CallExpression>node);

                case SyntaxKind.NewExpression:
                    return activeVisitor.visitNewExpression(<NewExpression>node);

                case SyntaxKind.TaggedTemplateExpression:
                    return activeVisitor.visitTaggedTemplateExpression(<TaggedTemplateExpression>node);

                case SyntaxKind.TemplateExpression:
                    return activeVisitor.visitTemplateExpression(<TemplateExpression>node);

                case SyntaxKind.FunctionExpression:
                    return activeVisitor.visitFunctionExpression(<FunctionExpression>node);

                case SyntaxKind.ArrowFunction:
                    return activeVisitor.visitArrowFunction(<FunctionExpression>node);

                case SyntaxKind.NoSubstitutionTemplateLiteral:
                    return activeVisitor.visitTemplateLiteral(<LiteralExpression>node);

                case SyntaxKind.OmittedExpression:
                    return <LeftHandSideExpression>activeVisitor.visitOmittedExpression(node);

                case SyntaxKind.ThisKeyword:
                case SyntaxKind.SuperKeyword:
                case SyntaxKind.NullKeyword:
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.FalseKeyword:
                case SyntaxKind.StringLiteral:
                case SyntaxKind.NumericLiteral:
                case SyntaxKind.RegularExpressionLiteral:
                case SyntaxKind.Identifier:
                    return node;

                default:
                    reportUnexpectedNode(node);
                    return node;
            }
        }

        export function visitParenthesizedExpression(node: ParenthesizedExpression): ParenthesizedExpression {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateParenthesizedExpression(
                node,
                activeVisitor.visitExpression(node.expression));
        }

        export function visitArrayLiteralExpression(node: ArrayLiteralExpression): ArrayLiteralExpression {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateArrayLiteralExpression(
                node,
                visitNodes(node.elements, activeVisitor.visitExpression));
        }

        export function visitObjectLiteralExpression(node: ObjectLiteralExpression): ObjectLiteralExpression {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateObjectLiteralExpression(
                node,
                visitNodes(node.properties, activeVisitor.visitObjectLiteralElement));
        }

        export function visitPropertyAccessExpression(node: PropertyAccessExpression): PropertyAccessExpression {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updatePropertyAccessExpression(
                node,
                activeVisitor.visitLeftHandSideExpression(node.expression),
                node.name);
        }

        export function visitElementAccessExpression(node: ElementAccessExpression): ElementAccessExpression {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateElementAccessExpression(
                node,
                activeVisitor.visitLeftHandSideExpression(node.expression),
                activeVisitor.visitExpression(node.argumentExpression));
        }

        export function visitFunctionExpression(node: FunctionExpression): FunctionExpression {
            return node;
        }

        export function visitArrowFunction(node: FunctionExpression): FunctionExpression {
            return node;
        }

        export function visitCallExpression(node: CallExpression): CallExpression {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateCallExpression(
                node,
                activeVisitor.visitLeftHandSideExpression(node.expression),
                visitNodes(node.arguments, activeVisitor.visitExpression));
        }

        export function visitNewExpression(node: NewExpression): NewExpression {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateNewExpression(
                node,
                activeVisitor.visitLeftHandSideExpression(node.expression),
                visitNodes(node.arguments, activeVisitor.visitExpression));
        }

        export function visitTaggedTemplateExpression(node: TaggedTemplateExpression): TaggedTemplateExpression {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateTaggedTemplateExpression(
                node,
                activeVisitor.visitLeftHandSideExpression(node.tag),
                activeVisitor.visitTemplateLiteralOrTemplateExpression(node.template));
        }

        export function visitTemplateLiteralOrTemplateExpression(node: LiteralExpression | TemplateExpression): LiteralExpression | TemplateExpression {
            if (!node || !activeVisitor) {
                return node;
            }

            if (isTemplateLiteralKind(node.kind)) {
                return node;
            }
            else if (node.kind === SyntaxKind.TemplateExpression) {
                var visited = activeVisitor.visitTemplateExpression(<TemplateExpression>node);
                if (visited && !isTemplateLiteralOrTemplateExpression(visited)) {
                    reportUnexpectedNodeAfterVisit(visited, node);
                    return node;
                }

                return <LiteralExpression | TemplateExpression>visited;
            }
            else {
                reportUnexpectedNode(node);
                return node;
            }
        }

        export function visitTemplateLiteral(node: LiteralExpression): LiteralExpression {
            return node;
        }

        export function visitTemplateExpression(node: TemplateExpression): TemplateExpression {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateTemplateExpression(
                node,
                node.head,
                visitNodes(node.templateSpans, activeVisitor.visitTemplateSpan));
        }

        export function visitSpreadElementExpression(node: SpreadElementExpression): SpreadElementExpression {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateSpreadElementExpression(
                node,
                activeVisitor.visitExpression(node.expression));
        }

        export function visitOmittedExpression(node: Expression): Expression {
            return node;
        }

        // Misc
        export function visitTemplateSpan(node: TemplateSpan): TemplateSpan {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateTemplateSpan(
                node,
                activeVisitor.visitExpression(node.expression),
                node.literal);
        }

        // Element

        //// export function visitModuleElement(node: ModuleElement): ModuleElement;

        export function visitStatement(node: Statement): Statement {
            if (!node || !activeVisitor) {
                return node;
            }

            switch (node.kind) {
                case SyntaxKind.FunctionDeclaration:
                    return activeVisitor.visitFunctionDeclaration(<FunctionDeclaration>node);

                case SyntaxKind.VariableStatement:
                    return activeVisitor.visitVariableStatement(<VariableStatement>node);

                case SyntaxKind.ExpressionStatement:
                    return activeVisitor.visitExpressionStatement(<ExpressionStatement>node);

                case SyntaxKind.IfStatement:
                    return activeVisitor.visitIfStatement(<IfStatement>node);

                case SyntaxKind.DoStatement:
                    return activeVisitor.visitDoStatement(<DoStatement>node);

                case SyntaxKind.WhileStatement:
                    return activeVisitor.visitWhileStatement(<WhileStatement>node);

                case SyntaxKind.ForStatement:
                    return activeVisitor.visitForStatement(<ForStatement>node);

                case SyntaxKind.ForInStatement:
                    return activeVisitor.visitForInStatement(<ForInStatement>node);

                case SyntaxKind.BreakStatement:
                    return activeVisitor.visitBreakStatement(<BreakOrContinueStatement>node);

                case SyntaxKind.ContinueStatement:
                    return activeVisitor.visitContinueStatement(<BreakOrContinueStatement>node);

                case SyntaxKind.ReturnStatement:
                    return activeVisitor.visitReturnStatement(<ReturnStatement>node);

                case SyntaxKind.WithStatement:
                    return activeVisitor.visitWithStatement(<WithStatement>node);

                case SyntaxKind.SwitchStatement:
                    return activeVisitor.visitSwitchStatement(<SwitchStatement>node);

                case SyntaxKind.LabeledStatement:
                    return activeVisitor.visitLabeledStatement(<LabeledStatement>node);

                case SyntaxKind.ThrowStatement:
                    return activeVisitor.visitThrowStatement(<ThrowStatement>node);

                case SyntaxKind.TryStatement:
                    return activeVisitor.visitTryStatement(<TryStatement>node);

                case SyntaxKind.DebuggerStatement:
                    return activeVisitor.visitDebuggerStatement(node);

                case SyntaxKind.EmptyStatement:
                    return activeVisitor.visitEmptyStatement(node);

                case SyntaxKind.Block:
                    return activeVisitor.visitBlock(<Block>node);

                default:
                    reportUnexpectedNode(node);
                    return node;
            }
        }

        export function visitBlock(node: Block): Block {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateBlock(
                node,
                visitNodes(node.statements, activeVisitor.visitStatement));
        }

        export function visitVariableStatement(node: VariableStatement): VariableStatement {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateVariableStatement(
                node,
                activeVisitor.visitVariableDeclarationList(node.declarationList));
        }

        export function visitEmptyStatement(node: Statement): Statement {
            return node;
        }

        export function visitExpressionStatement(node: ExpressionStatement): ExpressionStatement {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateExpressionStatement(
                node,
                activeVisitor.visitExpression(node.expression));
        }

        export function visitIfStatement(node: IfStatement): IfStatement {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateIfStatement(
                node,
                activeVisitor.visitExpression(node.expression),
                activeVisitor.visitStatement(node.thenStatement),
                activeVisitor.visitStatement(node.elseStatement));
        }

        export function visitDoStatement(node: DoStatement): DoStatement {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateDoStatement(
                node,
                activeVisitor.visitStatement(node.statement),
                activeVisitor.visitExpression(node.expression));
        }

        export function visitWhileStatement(node: WhileStatement): WhileStatement {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateWhileStatement(
                node,
                activeVisitor.visitExpression(node.expression),
                activeVisitor.visitStatement(node.statement));
        }

        export function visitForStatement(node: ForStatement): ForStatement {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateForStatement(
                node,
                activeVisitor.visitVariableDeclarationListOrInitializer(node.initializer),
                activeVisitor.visitExpression(node.condition),
                activeVisitor.visitExpression(node.iterator),
                activeVisitor.visitStatement(node.statement));
        }

        export function visitForInStatement(node: ForInStatement): ForInStatement {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateForInStatement(
                node,
                activeVisitor.visitVariableDeclarationListOrInitializer(node.initializer),
                activeVisitor.visitExpression(node.expression),
                activeVisitor.visitStatement(node.statement));
        }

        export function visitContinueStatement(node: BreakOrContinueStatement): BreakOrContinueStatement {
            return node;
        }

        export function visitBreakStatement(node: BreakOrContinueStatement): BreakOrContinueStatement {
            return node;
        }

        export function visitReturnStatement(node: ReturnStatement): ReturnStatement {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateReturnStatement(
                node,
                activeVisitor.visitExpression(node.expression));
        }

        export function visitWithStatement(node: WithStatement): WithStatement {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateWithStatement(
                node,
                activeVisitor.visitExpression(node.expression),
                activeVisitor.visitStatement(node.statement));
        }

        export function visitSwitchStatement(node: SwitchStatement): SwitchStatement {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateSwitchStatement(
                node,
                activeVisitor.visitExpression(node.expression),
                visitNodes(node.clauses, activeVisitor.visitCaseOrDefaultClause));
        }

        export function visitLabeledStatement(node: LabeledStatement): LabeledStatement {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateLabeledStatement(
                node,
                node.label,
                activeVisitor.visitStatement(node.statement));
        }

        export function visitThrowStatement(node: ThrowStatement): ThrowStatement {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateThrowStatement(
                node,
                activeVisitor.visitExpression(node.expression));
        }

        export function visitTryStatement(node: TryStatement): TryStatement {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateTryStatement(
                node,
                activeVisitor.visitBlock(node.tryBlock),
                activeVisitor.visitCatchClause(node.catchClause),
                activeVisitor.visitBlock(node.finallyBlock));
        }

        export function visitDebuggerStatement(node: Statement): Statement {
            return node;
        }

        export function visitVariableDeclaration(node: VariableDeclaration): VariableDeclaration {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateVariableDeclaration(
                node,
                activeVisitor.visitIdentifierOrBindingPattern(node.name),
                activeVisitor.visitExpression(node.initializer));
        }

        export function visitVariableDeclarationList(node: VariableDeclarationList): VariableDeclarationList {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateVariableDeclarationList(
                node,
                visitNodes(node.declarations, activeVisitor.visitVariableDeclaration));
        }

        export function visitVariableDeclarationListOrInitializer(node: VariableDeclarationList | Expression): VariableDeclarationList | Expression {
            if (!node || !activeVisitor) {
                return node;
            }

            if (isExpression(node)) {
                return activeVisitor.visitExpression(<Expression>node);
            }
            else if (node.kind === SyntaxKind.VariableDeclarationList) {
                return activeVisitor.visitVariableDeclarationList(<VariableDeclarationList>node);
            }
            else {
                reportUnexpectedNode(node);
                return node;
            }
        }

        export function visitFunctionDeclaration(node: FunctionDeclaration): FunctionDeclaration {
            return node;
        }

        //// export function visitClassDeclaration(node: ClassDeclaration): ClassDeclaration;
        //// export function visitInterfaceDeclaration(node: InterfaceDeclaration): InterfaceDeclaration;
        //// export function visitTypeAliasDeclaration(node: TypeAliasDeclaration): TypeAliasDeclaration;
        //// export function visitEnumDeclaration(node: EnumDeclaration): EnumDeclaration;
        //// export function visitModuleDeclaration(node: ModuleDeclaration): ModuleDeclaration;
        //// export function visitModuleBlock(node: ModuleBlock): ModuleBlock;
        //// export function visitImportDeclaration(node: ImportDeclaration): ImportDeclaration;
        //// export function visitExportAssignment(node: ExportAssignment): ExportAssignment;

        // Module references
        //// export function visitExternalModuleReference(node: ExternalModuleReference): ExternalModuleReference;

        // Clauses
        export function visitCaseOrDefaultClause(node: CaseOrDefaultClause): CaseOrDefaultClause {
            if (!node || !activeVisitor) {
                return node;
            }

            switch (node.kind) {
                case SyntaxKind.CaseClause:
                    return activeVisitor.visitCaseClause(<CaseClause>node);

                case SyntaxKind.DefaultClause:
                    return activeVisitor.visitDefaultClause(<DefaultClause>node);

                default:
                    reportUnexpectedNode(node);
                    return node;
            }
        }

        export function visitCaseClause(node: CaseClause): CaseClause {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateCaseClause(
                node,
                activeVisitor.visitExpression(node.expression),
                visitNodes(node.statements, activeVisitor.visitStatement));
        }

        export function visitDefaultClause(node: DefaultClause): DefaultClause {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateDefaultClause(
                node,
                visitNodes(node.statements, activeVisitor.visitStatement));
        }

        //// export function visitHeritageClause(node: HeritageClause): HeritageClause;

        export function visitCatchClause(node: CatchClause): CatchClause {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updateCatchClause(
                node,
                node.name,
                activeVisitor.visitBlock(node.block));
        }

        // Property assignments
        export function visitObjectLiteralElement(node: ObjectLiteralElement): ObjectLiteralElement {
            if (!node || !activeVisitor) {
                return node;
            }

            var visited: ObjectLiteralElement | ClassElement;
            switch (node.kind) {
                case SyntaxKind.PropertyAssignment:
                    return activeVisitor.visitPropertyAssignment(<PropertyAssignment>node);

                case SyntaxKind.ShorthandPropertyAssignment:
                    return activeVisitor.visitShorthandPropertyAssignment(<ShorthandPropertyAssignment>node);

                case SyntaxKind.MethodDeclaration:
                    visited = activeVisitor.visitMethodDeclaration(<MethodDeclaration>node);
                    break;

                case SyntaxKind.GetAccessor:
                    visited = activeVisitor.visitGetAccessor(<AccessorDeclaration>node);
                    break;

                case SyntaxKind.SetAccessor:
                    visited = activeVisitor.visitSetAccessor(<AccessorDeclaration>node);
                    break;

                default:
                    reportUnexpectedNode(node);
                    return node;
            }

            if (visited && !isObjectLiteralElement(visited)) {
                reportUnexpectedNodeAfterVisit(visited, node);
                return node;
            }

            return <ObjectLiteralElement>visited;
        }

        export function visitPropertyAssignment(node: PropertyAssignment): PropertyAssignment {
            if (!node || !activeVisitor) {
                return node;
            }

            return factory.updatePropertyAssignment(
                node,
                activeVisitor.visitDeclarationName(node.name),
                activeVisitor.visitExpression(node.initializer));
        }

        export function visitShorthandPropertyAssignment(node: ShorthandPropertyAssignment): ShorthandPropertyAssignment {
            return node;
        }

        // Enum
        //// export function visitEnumMember(node: EnumMember): EnumMember;

        // Top-level nodes
        //// export function visitSourceFile(node: SourceFile): SourceFile;
    }
}