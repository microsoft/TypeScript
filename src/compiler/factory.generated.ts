/// <reference path="parser.ts"/>
/// <reference path="factory.ts"/>

module ts {
    export module Factory {
        export function createStringLiteral(text: string, location?: TextRange, flags?: NodeFlags): StringLiteralExpression {
            var node = beginNode<StringLiteralExpression>(SyntaxKind.StringLiteral);
            node.text = text;
            return finishNode(node, location, flags);
        }

        export function createNumericLiteral(value: number | string, location?: TextRange, flags?: NodeFlags): LiteralExpression {
            var node = beginNode<LiteralExpression>(SyntaxKind.NumericLiteral);
            node.text = String(value);
            return finishNode(node, location, flags);
        }

        export function createIdentifier(text: string, location?: TextRange, flags?: NodeFlags): Identifier {
            var node = beginNode<Identifier>(SyntaxKind.Identifier);
            node.text = text;
            return finishNode(node, location, flags);
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

        export function createParameterDeclaration(name: BindingPattern | Identifier, initializer?: Expression, location?: TextRange, flags?: NodeFlags): ParameterDeclaration {
            var node = beginNode<ParameterDeclaration>(SyntaxKind.Parameter);
            node.name = name;
            node.initializer = initializer;
            return finishNode(node, location, flags);
        }

        export function updateParameterDeclaration(node: ParameterDeclaration, name: BindingPattern | Identifier, initializer: Expression): ParameterDeclaration {
            if (node.name !== name || node.initializer !== initializer) {
                return createParameterDeclaration(name, initializer, node, node.flags);
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

        export function createSetAccessor(name: DeclarationName, body: Block, parameters: ParameterDeclaration[], location?: TextRange, flags?: NodeFlags, modifiers?: Node[]): AccessorDeclaration {
            var node = beginNode<AccessorDeclaration>(SyntaxKind.SetAccessor);
            node.name = name;
            node.body = body;
            node.parameters = createNodeArray(parameters);
            return finishNode(node, location, flags, modifiers);
        }

        export function updateSetAccessor(node: AccessorDeclaration, name: DeclarationName, body: Block, parameters: ParameterDeclaration[]): AccessorDeclaration {
            if (node.name !== name || node.body !== body || node.parameters !== parameters) {
                return createSetAccessor(name, body, parameters, node, node.flags, node.modifiers);
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

        export function createBindingElement(name: BindingPattern | Identifier, propertyName?: Identifier, initializer?: Expression, location?: TextRange, flags?: NodeFlags): BindingElement {
            var node = beginNode<BindingElement>(SyntaxKind.BindingElement);
            node.name = name;
            node.propertyName = propertyName;
            node.initializer = initializer;
            return finishNode(node, location, flags);
        }

        export function updateBindingElement(node: BindingElement, name: BindingPattern | Identifier, propertyName: Identifier, initializer: Expression): BindingElement {
            if (node.name !== name || node.propertyName !== propertyName || node.initializer !== initializer) {
                return createBindingElement(name, propertyName, initializer, node, node.flags);
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

        export function createFunctionExpression(name: Identifier, body: Block | Expression, parameters: ParameterDeclaration[], location?: TextRange, flags?: NodeFlags, modifiers?: Node[]): FunctionExpression {
            var node = beginNode<FunctionExpression>(SyntaxKind.FunctionExpression);
            node.name = name;
            node.body = body;
            node.parameters = createNodeArray(parameters);
            return finishNode(node, location, flags, modifiers);
        }

        export function updateFunctionExpression(node: FunctionExpression, name: Identifier, body: Block | Expression, parameters: ParameterDeclaration[]): FunctionExpression {
            if (node.name !== name || node.body !== body || node.parameters !== parameters) {
                return createFunctionExpression(name, body, parameters, node, node.flags, node.modifiers);
            }
            return node;
        }

        export function createArrowFunction(body: Block | Expression, parameters: ParameterDeclaration[], location?: TextRange, flags?: NodeFlags, modifiers?: Node[]): FunctionExpression {
            var node = beginNode<FunctionExpression>(SyntaxKind.ArrowFunction);
            node.body = body;
            node.parameters = createNodeArray(parameters);
            return finishNode(node, location, flags, modifiers);
        }

        export function updateArrowFunction(node: FunctionExpression, body: Block | Expression, parameters: ParameterDeclaration[]): FunctionExpression {
            if (node.body !== body || node.parameters !== parameters) {
                return createArrowFunction(body, parameters, node, node.flags, node.modifiers);
            }
            return node;
        }

        export function createDeleteExpression(expression: UnaryExpression, location?: TextRange, flags?: NodeFlags): DeleteExpression {
            var node = beginNode<DeleteExpression>(SyntaxKind.DeleteExpression);
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateDeleteExpression(node: DeleteExpression, expression: UnaryExpression): DeleteExpression {
            if (node.expression !== expression) {
                return createDeleteExpression(expression, node, node.flags);
            }
            return node;
        }

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

        export function updateAwaitExpression(node: AwaitExpression, expression: UnaryExpression): AwaitExpression {
            if (node.expression !== expression) {
                return createAwaitExpression(expression, node, node.flags);
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

        export function createGeneratedLabel(label: Label, labelNumbers: number[], location?: TextRange, flags?: NodeFlags): GeneratedLabel {
            var node = beginNode<GeneratedLabel>(SyntaxKind.GeneratedLabel);
            node.label = label;
            node.labelNumbers = labelNumbers;
            return finishNode(node, location, flags);
        }

        export function createSpreadElementExpression(expression: Expression, location?: TextRange, flags?: NodeFlags): SpreadElementExpression {
            var node = beginNode<SpreadElementExpression>(SyntaxKind.SpreadElementExpression);
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateSpreadElementExpression(node: SpreadElementExpression, expression: Expression): SpreadElementExpression {
            if (node.expression !== expression) {
                return createSpreadElementExpression(expression, node, node.flags);
            }
            return node;
        }

        export function createOmittedExpression(location?: TextRange, flags?: NodeFlags): Expression {
            var node = beginNode<Expression>(SyntaxKind.OmittedExpression);
            return finishNode(node, location, flags);
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
            if (node.statement !== statement || node.expression !== expression) {
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

        export function createForStatement(initializer: Expression | VariableDeclarationList, condition: Expression, iterator: Expression, statement: Statement, location?: TextRange, flags?: NodeFlags): ForStatement {
            var node = beginNode<ForStatement>(SyntaxKind.ForStatement);
            node.initializer = initializer;
            node.condition = condition;
            node.iterator = iterator;
            node.statement = statement;
            return finishNode(node, location, flags);
        }

        export function updateForStatement(node: ForStatement, initializer: Expression | VariableDeclarationList, condition: Expression, iterator: Expression, statement: Statement): ForStatement {
            if (node.initializer !== initializer || node.condition !== condition || node.iterator !== iterator || node.statement !== statement) {
                return createForStatement(initializer, condition, iterator, statement, node, node.flags);
            }
            return node;
        }

        export function createForInStatement(initializer: Expression | VariableDeclarationList, expression: Expression, statement: Statement, location?: TextRange, flags?: NodeFlags): ForInStatement {
            var node = beginNode<ForInStatement>(SyntaxKind.ForInStatement);
            node.initializer = initializer;
            node.expression = expression;
            node.statement = statement;
            return finishNode(node, location, flags);
        }

        export function updateForInStatement(node: ForInStatement, initializer: Expression | VariableDeclarationList, expression: Expression, statement: Statement): ForInStatement {
            if (node.initializer !== initializer || node.expression !== expression || node.statement !== statement) {
                return createForInStatement(initializer, expression, statement, node, node.flags);
            }
            return node;
        }

        export function createContinueStatement(label: Identifier, location?: TextRange, flags?: NodeFlags): BreakOrContinueStatement {
            var node = beginNode<BreakOrContinueStatement>(SyntaxKind.ContinueStatement);
            node.label = label;
            return finishNode(node, location, flags);
        }

        export function createBreakStatement(label: Identifier, location?: TextRange, flags?: NodeFlags): BreakOrContinueStatement {
            var node = beginNode<BreakOrContinueStatement>(SyntaxKind.BreakStatement);
            node.label = label;
            return finishNode(node, location, flags);
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
            return node;
        }

        export function createTryStatement(tryBlock: Block, catchClause: CatchClause, finallyBlock: Block, location?: TextRange, flags?: NodeFlags): TryStatement {
            var node = beginNode<TryStatement>(SyntaxKind.TryStatement);
            node.tryBlock = tryBlock;
            node.catchClause = catchClause;
            node.finallyBlock = finallyBlock;
            return finishNode(node, location, flags);
        }

        export function updateTryStatement(node: TryStatement, tryBlock: Block, catchClause: CatchClause, finallyBlock: Block): TryStatement {
            if (node.tryBlock !== tryBlock || node.catchClause !== catchClause || node.finallyBlock !== finallyBlock) {
                return createTryStatement(tryBlock, catchClause, finallyBlock, node, node.flags);
            }
            return node;
        }

        export function createDebuggerStatement(location?: TextRange, flags?: NodeFlags): Statement {
            var node = beginNode<Statement>(SyntaxKind.DebuggerStatement);
            return finishNode(node, location, flags);
        }

        export function createVariableDeclaration(name: BindingPattern | Identifier, initializer?: Expression, location?: TextRange, flags?: NodeFlags): VariableDeclaration {
            var node = beginNode<VariableDeclaration>(SyntaxKind.VariableDeclaration);
            node.name = name;
            node.initializer = initializer;
            return finishNode(node, location, flags);
        }

        export function updateVariableDeclaration(node: VariableDeclaration, name: BindingPattern | Identifier, initializer: Expression): VariableDeclaration {
            if (node.name !== name || node.initializer !== initializer) {
                return createVariableDeclaration(name, initializer, node, node.flags);
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

        export function createShorthandPropertyAssignment(name: Identifier, location?: TextRange, flags?: NodeFlags): ShorthandPropertyAssignment {
            var node = beginNode<ShorthandPropertyAssignment>(SyntaxKind.ShorthandPropertyAssignment);
            node.name = name;
            return finishNode(node, location, flags);
        }
    }

    export interface VisitorHandlers {
        visitIdentifier? (handlers: VisitorHandlers, node: Identifier): Identifier;
        visitComputedPropertyName? (handlers: VisitorHandlers, node: ComputedPropertyName): DeclarationName;
        visitMethodDeclaration? (handlers: VisitorHandlers, node: MethodDeclaration): ClassElement | ObjectLiteralElement;
        visitGetAccessor? (handlers: VisitorHandlers, node: AccessorDeclaration): ClassElement | ObjectLiteralElement;
        visitSetAccessor? (handlers: VisitorHandlers, node: AccessorDeclaration): ClassElement | ObjectLiteralElement;
        visitObjectBindingPattern? (handlers: VisitorHandlers, node: BindingPattern): BindingPattern | Identifier;
        visitArrayBindingPattern? (handlers: VisitorHandlers, node: BindingPattern): BindingPattern | Identifier;
        visitBindingElement? (handlers: VisitorHandlers, node: BindingElement): BindingElement;
        visitArrayLiteralExpression? (handlers: VisitorHandlers, node: ArrayLiteralExpression): LeftHandSideExpression;
        visitObjectLiteralExpression? (handlers: VisitorHandlers, node: ObjectLiteralExpression): LeftHandSideExpression;
        visitPropertyAccessExpression? (handlers: VisitorHandlers, node: PropertyAccessExpression): LeftHandSideExpression;
        visitElementAccessExpression? (handlers: VisitorHandlers, node: ElementAccessExpression): LeftHandSideExpression;
        visitCallExpression? (handlers: VisitorHandlers, node: CallExpression): LeftHandSideExpression;
        visitNewExpression? (handlers: VisitorHandlers, node: NewExpression): LeftHandSideExpression;
        visitTaggedTemplateExpression? (handlers: VisitorHandlers, node: TaggedTemplateExpression): LeftHandSideExpression;
        visitTypeAssertion? (handlers: VisitorHandlers, node: TypeAssertion): UnaryExpression;
        visitParenthesizedExpression? (handlers: VisitorHandlers, node: ParenthesizedExpression): LeftHandSideExpression;
        visitFunctionExpression? (handlers: VisitorHandlers, node: FunctionExpression): LeftHandSideExpression;
        visitArrowFunction? (handlers: VisitorHandlers, node: FunctionExpression): LeftHandSideExpression;
        visitDeleteExpression? (handlers: VisitorHandlers, node: DeleteExpression): UnaryExpression;
        visitTypeOfExpression? (handlers: VisitorHandlers, node: TypeOfExpression): UnaryExpression;
        visitVoidExpression? (handlers: VisitorHandlers, node: VoidExpression): UnaryExpression;
        visitAwaitExpression? (handlers: VisitorHandlers, node: AwaitExpression): UnaryExpression;
        visitPrefixUnaryExpression? (handlers: VisitorHandlers, node: PrefixUnaryExpression): UnaryExpression;
        visitPostfixUnaryExpression? (handlers: VisitorHandlers, node: PostfixUnaryExpression): UnaryExpression;
        visitBinaryExpression? (handlers: VisitorHandlers, node: BinaryExpression): Expression;
        visitConditionalExpression? (handlers: VisitorHandlers, node: ConditionalExpression): Expression;
        visitTemplateExpression? (handlers: VisitorHandlers, node: TemplateExpression): LeftHandSideExpression | LiteralExpression | TemplateExpression;
        visitYieldExpression? (handlers: VisitorHandlers, node: YieldExpression): Expression;
        visitSpreadElementExpression? (handlers: VisitorHandlers, node: SpreadElementExpression): Expression;
        visitOmittedExpression? (handlers: VisitorHandlers, node: Expression): Expression;
        visitTemplateSpan? (handlers: VisitorHandlers, node: TemplateSpan): TemplateSpan;
        visitBlock? (handlers: VisitorHandlers, node: Block): Block;
        visitVariableStatement? (handlers: VisitorHandlers, node: VariableStatement): Statement;
        visitEmptyStatement? (handlers: VisitorHandlers, node: Statement): Statement;
        visitExpressionStatement? (handlers: VisitorHandlers, node: ExpressionStatement): Statement;
        visitIfStatement? (handlers: VisitorHandlers, node: IfStatement): Statement;
        visitDoStatement? (handlers: VisitorHandlers, node: DoStatement): Statement;
        visitWhileStatement? (handlers: VisitorHandlers, node: WhileStatement): Statement;
        visitForStatement? (handlers: VisitorHandlers, node: ForStatement): Statement;
        visitForInStatement? (handlers: VisitorHandlers, node: ForInStatement): Statement;
        visitContinueStatement? (handlers: VisitorHandlers, node: BreakOrContinueStatement): Statement;
        visitBreakStatement? (handlers: VisitorHandlers, node: BreakOrContinueStatement): Statement;
        visitReturnStatement? (handlers: VisitorHandlers, node: ReturnStatement): Statement;
        visitWithStatement? (handlers: VisitorHandlers, node: WithStatement): Statement;
        visitSwitchStatement? (handlers: VisitorHandlers, node: SwitchStatement): Statement;
        visitLabeledStatement? (handlers: VisitorHandlers, node: LabeledStatement): Statement;
        visitThrowStatement? (handlers: VisitorHandlers, node: ThrowStatement): Statement;
        visitTryStatement? (handlers: VisitorHandlers, node: TryStatement): Statement;
        visitDebuggerStatement? (handlers: VisitorHandlers, node: Statement): Statement;
        visitVariableDeclaration? (handlers: VisitorHandlers, node: VariableDeclaration): VariableDeclaration;
        visitVariableDeclarationList? (handlers: VisitorHandlers, node: VariableDeclarationList): VariableDeclarationList;
        visitVariableDeclarationListOrExpression? (handlers: VisitorHandlers, node: Expression | VariableDeclarationList): Expression | VariableDeclarationList;
        visitFunctionDeclaration? (handlers: VisitorHandlers, node: FunctionDeclaration): Statement;
        visitCaseClause? (handlers: VisitorHandlers, node: CaseClause): CaseOrDefaultClause;
        visitDefaultClause? (handlers: VisitorHandlers, node: DefaultClause): CaseOrDefaultClause;
        visitCatchClause? (handlers: VisitorHandlers, node: CatchClause): CatchClause;
        visitPropertyAssignment? (handlers: VisitorHandlers, node: PropertyAssignment): ObjectLiteralElement;
        visitShorthandPropertyAssignment? (handlers: VisitorHandlers, node: ShorthandPropertyAssignment): ObjectLiteralElement;
    }

    export module Visitor {
        export function visitIdentifier(handlers: VisitorHandlers, node: Identifier): Identifier {
            return node;
        }

        export function visitDeclarationName(handlers: VisitorHandlers, node: DeclarationName): DeclarationName {
            if (!node || !handlers) {
                return node;
            }
            switch (node.kind) {
                case SyntaxKind.ObjectBindingPattern:
                    return visitNode(handlers, <BindingPattern>node, handlers.visitObjectBindingPattern || visitObjectBindingPattern);
                case SyntaxKind.ArrayBindingPattern:
                    return visitNode(handlers, <BindingPattern>node, handlers.visitArrayBindingPattern || visitArrayBindingPattern);
                case SyntaxKind.ComputedPropertyName:
                    return visitNode(handlers, <ComputedPropertyName>node, handlers.visitComputedPropertyName || visitComputedPropertyName);
                case SyntaxKind.Identifier:
                    return visitNode(handlers, <Identifier>node, handlers.visitIdentifier || visitIdentifier);
                case SyntaxKind.StringLiteral:
                case SyntaxKind.NumericLiteral:
                case SyntaxKind.RegularExpressionLiteral:
                case SyntaxKind.NoSubstitutionTemplateLiteral:
                case SyntaxKind.TemplateHead:
                case SyntaxKind.TemplateMiddle:
                case SyntaxKind.TemplateTail:
                    return node;
                default:
                    reportUnexpectedNode(node);
                    return node;
            }
        }

        export function visitComputedPropertyName(handlers: VisitorHandlers, node: ComputedPropertyName): ComputedPropertyName {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateComputedPropertyName(
                node,
                visitNode(handlers, <Expression>node.expression, visitExpression))
        }

        export function visitMethodDeclaration(handlers: VisitorHandlers, node: MethodDeclaration): MethodDeclaration {
            return node;
        }

        export function visitGetAccessor(handlers: VisitorHandlers, node: AccessorDeclaration): AccessorDeclaration {
            return node;
        }

        export function visitSetAccessor(handlers: VisitorHandlers, node: AccessorDeclaration): AccessorDeclaration {
            return node;
        }

        export function visitIdentifierOrBindingPattern(handlers: VisitorHandlers, node: BindingPattern | Identifier): BindingPattern | Identifier {
            if (!node || !handlers) {
                return node;
            }
            switch (node.kind) {
                case SyntaxKind.ObjectBindingPattern:
                    return visitNode(handlers, <BindingPattern>node, handlers.visitObjectBindingPattern || visitObjectBindingPattern);
                case SyntaxKind.ArrayBindingPattern:
                    return visitNode(handlers, <BindingPattern>node, handlers.visitArrayBindingPattern || visitArrayBindingPattern);
                case SyntaxKind.Identifier:
                    return visitNode(handlers, <Identifier>node, handlers.visitIdentifier || visitIdentifier);
                default:
                    reportUnexpectedNode(node);
                    return node;
            }
        }

        export function visitObjectBindingPattern(handlers: VisitorHandlers, node: BindingPattern): BindingPattern {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateObjectBindingPattern(
                node,
                visitNodes(handlers, node.elements, (handlers.visitBindingElement || visitBindingElement)))
        }

        export function visitArrayBindingPattern(handlers: VisitorHandlers, node: BindingPattern): BindingPattern {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateArrayBindingPattern(
                node,
                visitNodes(handlers, node.elements, (handlers.visitBindingElement || visitBindingElement)))
        }

        export function visitBindingElement(handlers: VisitorHandlers, node: BindingElement): BindingElement {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateBindingElement(
                node,
                visitNode(handlers, <BindingPattern | Identifier>node.name, visitIdentifierOrBindingPattern),
                visitNode(handlers, <Identifier>node.propertyName, handlers.visitIdentifier || visitIdentifier),
                visitNode(handlers, <Expression>node.initializer, visitExpression))
        }

        export function visitExpression(handlers: VisitorHandlers, node: Expression): Expression {
            if (!node || !handlers) {
                return node;
            }
            switch (node.kind) {
                case SyntaxKind.BinaryExpression:
                    return visitNode(handlers, <BinaryExpression>node, handlers.visitBinaryExpression || visitBinaryExpression);
                case SyntaxKind.ConditionalExpression:
                    return visitNode(handlers, <ConditionalExpression>node, handlers.visitConditionalExpression || visitConditionalExpression);
                case SyntaxKind.YieldExpression:
                    return visitNode(handlers, <YieldExpression>node, handlers.visitYieldExpression || visitYieldExpression);
                case SyntaxKind.SpreadElementExpression:
                    return visitNode(handlers, <SpreadElementExpression>node, handlers.visitSpreadElementExpression || visitSpreadElementExpression);
                case SyntaxKind.OmittedExpression:
                    return visitNode(handlers, <Expression>node, handlers.visitOmittedExpression || visitOmittedExpression);
                default:
                    return visitNode(handlers, <UnaryExpression>node, visitUnaryExpression);
            }
        }

        export function visitUnaryExpression(handlers: VisitorHandlers, node: UnaryExpression): UnaryExpression {
            if (!node || !handlers) {
                return node;
            }
            switch (node.kind) {
                case SyntaxKind.TypeAssertionExpression:
                    return visitNode(handlers, <TypeAssertion>node, handlers.visitTypeAssertion || visitTypeAssertion);
                case SyntaxKind.DeleteExpression:
                    return visitNode(handlers, <DeleteExpression>node, handlers.visitDeleteExpression || visitDeleteExpression);
                case SyntaxKind.TypeOfExpression:
                    return visitNode(handlers, <TypeOfExpression>node, handlers.visitTypeOfExpression || visitTypeOfExpression);
                case SyntaxKind.VoidExpression:
                    return visitNode(handlers, <VoidExpression>node, handlers.visitVoidExpression || visitVoidExpression);
                case SyntaxKind.AwaitExpression:
                    return visitNode(handlers, <AwaitExpression>node, handlers.visitAwaitExpression || visitAwaitExpression);
                case SyntaxKind.PrefixUnaryExpression:
                    return visitNode(handlers, <PrefixUnaryExpression>node, handlers.visitPrefixUnaryExpression || visitPrefixUnaryExpression);
                case SyntaxKind.PostfixUnaryExpression:
                    return visitNode(handlers, <PostfixUnaryExpression>node, handlers.visitPostfixUnaryExpression || visitPostfixUnaryExpression);
                default:
                    return visitNode(handlers, <LeftHandSideExpression>node, visitLeftHandSideExpression);
            }
        }

        export function visitLeftHandSideExpression(handlers: VisitorHandlers, node: LeftHandSideExpression): LeftHandSideExpression {
            if (!node || !handlers) {
                return node;
            }
            switch (node.kind) {
                case SyntaxKind.Identifier:
                    return visitNode(handlers, <Identifier>node, handlers.visitIdentifier || visitIdentifier);
                case SyntaxKind.ThisKeyword:
                    return node;
                case SyntaxKind.SuperKeyword:
                    return node;
                case SyntaxKind.NullKeyword:
                    return node;
                case SyntaxKind.TrueKeyword:
                    return node;
                case SyntaxKind.FalseKeyword:
                    return node;
                case SyntaxKind.ArrayLiteralExpression:
                    return visitNode(handlers, <ArrayLiteralExpression>node, handlers.visitArrayLiteralExpression || visitArrayLiteralExpression);
                case SyntaxKind.ObjectLiteralExpression:
                    return visitNode(handlers, <ObjectLiteralExpression>node, handlers.visitObjectLiteralExpression || visitObjectLiteralExpression);
                case SyntaxKind.PropertyAccessExpression:
                    return visitNode(handlers, <PropertyAccessExpression>node, handlers.visitPropertyAccessExpression || visitPropertyAccessExpression);
                case SyntaxKind.ElementAccessExpression:
                    return visitNode(handlers, <ElementAccessExpression>node, handlers.visitElementAccessExpression || visitElementAccessExpression);
                case SyntaxKind.CallExpression:
                    return visitNode(handlers, <CallExpression>node, handlers.visitCallExpression || visitCallExpression);
                case SyntaxKind.NewExpression:
                    return visitNode(handlers, <NewExpression>node, handlers.visitNewExpression || visitNewExpression);
                case SyntaxKind.TaggedTemplateExpression:
                    return visitNode(handlers, <TaggedTemplateExpression>node, handlers.visitTaggedTemplateExpression || visitTaggedTemplateExpression);
                case SyntaxKind.ParenthesizedExpression:
                    return visitNode(handlers, <ParenthesizedExpression>node, handlers.visitParenthesizedExpression || visitParenthesizedExpression);
                case SyntaxKind.FunctionExpression:
                    return visitNode(handlers, <FunctionExpression>node, handlers.visitFunctionExpression || visitFunctionExpression);
                case SyntaxKind.ArrowFunction:
                    return visitNode(handlers, <FunctionExpression>node, handlers.visitArrowFunction || visitArrowFunction);
                case SyntaxKind.TemplateExpression:
                    return visitNode(handlers, <TemplateExpression>node, handlers.visitTemplateExpression || visitTemplateExpression);
                default:
                    return node;
            }
        }

        export function visitTemplateLiteralOrTemplateExpression(handlers: VisitorHandlers, node: LiteralExpression | TemplateExpression): LiteralExpression | TemplateExpression {
            if (!node || !handlers) {
                return node;
            }
            switch (node.kind) {
                case SyntaxKind.StringLiteral:
                case SyntaxKind.NumericLiteral:
                case SyntaxKind.RegularExpressionLiteral:
                case SyntaxKind.NoSubstitutionTemplateLiteral:
                case SyntaxKind.TemplateHead:
                case SyntaxKind.TemplateMiddle:
                case SyntaxKind.TemplateTail:
                    return node;
                case SyntaxKind.TemplateExpression:
                    var visited = visitNode(handlers, <TemplateExpression>node, handlers.visitTemplateExpression || visitTemplateExpression);
                    if (visited && !isTemplateLiteralOrTemplateExpression(visited)) {
                        reportUnexpectedNodeAfterVisit(visited, node);
                        return node;
                    }
                    return <LiteralExpression | TemplateExpression>visited;
                default:
                    reportUnexpectedNode(node);
                    return node;
            }
        }

        export function visitArrayLiteralExpression(handlers: VisitorHandlers, node: ArrayLiteralExpression): ArrayLiteralExpression {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateArrayLiteralExpression(
                node,
                visitNodes(handlers, node.elements, visitExpression))
        }

        export function visitObjectLiteralExpression(handlers: VisitorHandlers, node: ObjectLiteralExpression): ObjectLiteralExpression {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateObjectLiteralExpression(
                node,
                visitNodes(handlers, node.properties, visitObjectLiteralElement))
        }

        export function visitPropertyAccessExpression(handlers: VisitorHandlers, node: PropertyAccessExpression): PropertyAccessExpression {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updatePropertyAccessExpression(
                node,
                visitNode(handlers, <LeftHandSideExpression>node.expression, visitLeftHandSideExpression),
                visitNode(handlers, <Identifier>node.name, handlers.visitIdentifier || visitIdentifier))
        }

        export function visitElementAccessExpression(handlers: VisitorHandlers, node: ElementAccessExpression): ElementAccessExpression {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateElementAccessExpression(
                node,
                visitNode(handlers, <LeftHandSideExpression>node.expression, visitLeftHandSideExpression),
                visitNode(handlers, <Expression>node.argumentExpression, visitExpression))
        }

        export function visitCallExpression(handlers: VisitorHandlers, node: CallExpression): CallExpression {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateCallExpression(
                node,
                visitNode(handlers, <LeftHandSideExpression>node.expression, visitLeftHandSideExpression),
                visitNodes(handlers, node.arguments, visitExpression))
        }

        export function visitNewExpression(handlers: VisitorHandlers, node: NewExpression): NewExpression {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateNewExpression(
                node,
                visitNode(handlers, <LeftHandSideExpression>node.expression, visitLeftHandSideExpression),
                visitNodes(handlers, node.arguments, visitExpression))
        }

        export function visitTaggedTemplateExpression(handlers: VisitorHandlers, node: TaggedTemplateExpression): TaggedTemplateExpression {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateTaggedTemplateExpression(
                node,
                visitNode(handlers, <LeftHandSideExpression>node.tag, visitLeftHandSideExpression),
                visitNode(handlers, <LiteralExpression | TemplateExpression>node.template, visitTemplateLiteralOrTemplateExpression))
        }

        export function visitTypeAssertion(handlers: VisitorHandlers, node: TypeAssertion): TypeAssertion {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateTypeAssertion(
                node,
                visitNode(handlers, <UnaryExpression>node.expression, visitUnaryExpression))
        }

        export function visitParenthesizedExpression(handlers: VisitorHandlers, node: ParenthesizedExpression): ParenthesizedExpression {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateParenthesizedExpression(
                node,
                visitNode(handlers, <Expression>node.expression, visitExpression))
        }

        export function visitExpressionOrBlock(handlers: VisitorHandlers, node: Block | Expression): Block | Expression {
            if (!node || !handlers) {
                return node;
            }
            if (isExpression(node)) {
                return visitNode(handlers, <Expression>node, visitExpression);
            }
            switch (node.kind) {
                case SyntaxKind.Block:
                    return visitNode(handlers, <Block>node, handlers.visitBlock || visitBlock);
                default:
                    reportUnexpectedNode(node);
                    return node;
            }
        }

        export function visitFunctionExpression(handlers: VisitorHandlers, node: FunctionExpression): FunctionExpression {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateFunctionExpression(
                node,
                visitNode(handlers, <Identifier>node.name, handlers.visitIdentifier || visitIdentifier),
                visitNode(handlers, <Block | Expression>node.body, visitExpressionOrBlock),
                node.parameters)
        }

        export function visitArrowFunction(handlers: VisitorHandlers, node: FunctionExpression): FunctionExpression {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateArrowFunction(
                node,
                visitNode(handlers, <Block | Expression>node.body, visitExpressionOrBlock),
                node.parameters)
        }

        export function visitDeleteExpression(handlers: VisitorHandlers, node: DeleteExpression): DeleteExpression {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateDeleteExpression(
                node,
                visitNode(handlers, <UnaryExpression>node.expression, visitUnaryExpression))
        }

        export function visitTypeOfExpression(handlers: VisitorHandlers, node: TypeOfExpression): TypeOfExpression {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateTypeOfExpression(
                node,
                visitNode(handlers, <UnaryExpression>node.expression, visitUnaryExpression))
        }

        export function visitVoidExpression(handlers: VisitorHandlers, node: VoidExpression): VoidExpression {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateVoidExpression(
                node,
                visitNode(handlers, <UnaryExpression>node.expression, visitUnaryExpression))
        }

        export function visitAwaitExpression(handlers: VisitorHandlers, node: AwaitExpression): AwaitExpression {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateAwaitExpression(
                node,
                visitNode(handlers, <UnaryExpression>node.expression, visitUnaryExpression))
        }

        export function visitPrefixUnaryExpression(handlers: VisitorHandlers, node: PrefixUnaryExpression): PrefixUnaryExpression {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updatePrefixUnaryExpression(
                node,
                visitNode(handlers, <UnaryExpression>node.operand, visitUnaryExpression))
        }

        export function visitPostfixUnaryExpression(handlers: VisitorHandlers, node: PostfixUnaryExpression): PostfixUnaryExpression {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updatePostfixUnaryExpression(
                node,
                visitNode(handlers, <LeftHandSideExpression>node.operand, visitLeftHandSideExpression))
        }

        export function visitBinaryExpression(handlers: VisitorHandlers, node: BinaryExpression): BinaryExpression {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateBinaryExpression(
                node,
                visitNode(handlers, <Expression>node.left, visitExpression),
                visitNode(handlers, <Expression>node.right, visitExpression))
        }

        export function visitConditionalExpression(handlers: VisitorHandlers, node: ConditionalExpression): ConditionalExpression {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateConditionalExpression(
                node,
                visitNode(handlers, <Expression>node.condition, visitExpression),
                visitNode(handlers, <Expression>node.whenTrue, visitExpression),
                visitNode(handlers, <Expression>node.whenFalse, visitExpression))
        }

        export function visitTemplateExpression(handlers: VisitorHandlers, node: TemplateExpression): TemplateExpression {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateTemplateExpression(
                node,
                node.head,
                visitNodes(handlers, node.templateSpans, (handlers.visitTemplateSpan || visitTemplateSpan)))
        }

        export function visitYieldExpression(handlers: VisitorHandlers, node: YieldExpression): YieldExpression {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateYieldExpression(
                node,
                visitNode(handlers, <Expression>node.expression, visitExpression))
        }

        export function visitSpreadElementExpression(handlers: VisitorHandlers, node: SpreadElementExpression): SpreadElementExpression {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateSpreadElementExpression(
                node,
                visitNode(handlers, <Expression>node.expression, visitExpression))
        }

        export function visitOmittedExpression(handlers: VisitorHandlers, node: Expression): Expression {
            return node;
        }

        export function visitTemplateSpan(handlers: VisitorHandlers, node: TemplateSpan): TemplateSpan {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateTemplateSpan(
                node,
                visitNode(handlers, <Expression>node.expression, visitExpression),
                node.literal)
        }

        export function visitStatement(handlers: VisitorHandlers, node: Statement): Statement {
            if (!node || !handlers) {
                return node;
            }
            switch (node.kind) {
                case SyntaxKind.Block:
                    return visitNode(handlers, <Block>node, handlers.visitBlock || visitBlock);
                case SyntaxKind.VariableStatement:
                    return visitNode(handlers, <VariableStatement>node, handlers.visitVariableStatement || visitVariableStatement);
                case SyntaxKind.EmptyStatement:
                    return visitNode(handlers, <Statement>node, handlers.visitEmptyStatement || visitEmptyStatement);
                case SyntaxKind.ExpressionStatement:
                    return visitNode(handlers, <ExpressionStatement>node, handlers.visitExpressionStatement || visitExpressionStatement);
                case SyntaxKind.IfStatement:
                    return visitNode(handlers, <IfStatement>node, handlers.visitIfStatement || visitIfStatement);
                case SyntaxKind.DoStatement:
                    return visitNode(handlers, <DoStatement>node, handlers.visitDoStatement || visitDoStatement);
                case SyntaxKind.WhileStatement:
                    return visitNode(handlers, <WhileStatement>node, handlers.visitWhileStatement || visitWhileStatement);
                case SyntaxKind.ForStatement:
                    return visitNode(handlers, <ForStatement>node, handlers.visitForStatement || visitForStatement);
                case SyntaxKind.ForInStatement:
                    return visitNode(handlers, <ForInStatement>node, handlers.visitForInStatement || visitForInStatement);
                case SyntaxKind.ContinueStatement:
                    return visitNode(handlers, <BreakOrContinueStatement>node, handlers.visitContinueStatement || visitContinueStatement);
                case SyntaxKind.BreakStatement:
                    return visitNode(handlers, <BreakOrContinueStatement>node, handlers.visitBreakStatement || visitBreakStatement);
                case SyntaxKind.ReturnStatement:
                    return visitNode(handlers, <ReturnStatement>node, handlers.visitReturnStatement || visitReturnStatement);
                case SyntaxKind.WithStatement:
                    return visitNode(handlers, <WithStatement>node, handlers.visitWithStatement || visitWithStatement);
                case SyntaxKind.SwitchStatement:
                    return visitNode(handlers, <SwitchStatement>node, handlers.visitSwitchStatement || visitSwitchStatement);
                case SyntaxKind.LabeledStatement:
                    return visitNode(handlers, <LabeledStatement>node, handlers.visitLabeledStatement || visitLabeledStatement);
                case SyntaxKind.ThrowStatement:
                    return visitNode(handlers, <ThrowStatement>node, handlers.visitThrowStatement || visitThrowStatement);
                case SyntaxKind.TryStatement:
                    return visitNode(handlers, <TryStatement>node, handlers.visitTryStatement || visitTryStatement);
                case SyntaxKind.DebuggerStatement:
                    return visitNode(handlers, <Statement>node, handlers.visitDebuggerStatement || visitDebuggerStatement);
                case SyntaxKind.FunctionDeclaration:
                    return visitNode(handlers, <FunctionDeclaration>node, handlers.visitFunctionDeclaration || visitFunctionDeclaration);
                default:
                    reportUnexpectedNode(node);
                    return node;
            }
        }

        export function visitBlock(handlers: VisitorHandlers, node: Block): Block {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateBlock(
                node,
                visitNodes(handlers, node.statements, visitStatement))
        }

        export function visitVariableStatement(handlers: VisitorHandlers, node: VariableStatement): VariableStatement {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateVariableStatement(
                node,
                visitNode(handlers, <VariableDeclarationList>node.declarationList, handlers.visitVariableDeclarationList || visitVariableDeclarationList))
        }

        export function visitEmptyStatement(handlers: VisitorHandlers, node: Statement): Statement {
            return node;
        }

        export function visitExpressionStatement(handlers: VisitorHandlers, node: ExpressionStatement): ExpressionStatement {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateExpressionStatement(
                node,
                visitNode(handlers, <Expression>node.expression, visitExpression))
        }

        export function visitIfStatement(handlers: VisitorHandlers, node: IfStatement): IfStatement {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateIfStatement(
                node,
                visitNode(handlers, <Expression>node.expression, visitExpression),
                visitNode(handlers, <Statement>node.thenStatement, visitStatement),
                visitNode(handlers, <Statement>node.elseStatement, visitStatement))
        }

        export function visitDoStatement(handlers: VisitorHandlers, node: DoStatement): DoStatement {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateDoStatement(
                node,
                visitNode(handlers, <Statement>node.statement, visitStatement),
                visitNode(handlers, <Expression>node.expression, visitExpression))
        }

        export function visitWhileStatement(handlers: VisitorHandlers, node: WhileStatement): WhileStatement {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateWhileStatement(
                node,
                visitNode(handlers, <Expression>node.expression, visitExpression),
                visitNode(handlers, <Statement>node.statement, visitStatement))
        }

        export function visitForStatement(handlers: VisitorHandlers, node: ForStatement): ForStatement {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateForStatement(
                node,
                visitNode(handlers, <Expression | VariableDeclarationList>node.initializer, handlers.visitVariableDeclarationListOrExpression || visitVariableDeclarationListOrExpression),
                visitNode(handlers, <Expression>node.condition, visitExpression),
                visitNode(handlers, <Expression>node.iterator, visitExpression),
                visitNode(handlers, <Statement>node.statement, visitStatement))
        }

        export function visitForInStatement(handlers: VisitorHandlers, node: ForInStatement): ForInStatement {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateForInStatement(
                node,
                visitNode(handlers, <Expression | VariableDeclarationList>node.initializer, handlers.visitVariableDeclarationListOrExpression || visitVariableDeclarationListOrExpression),
                visitNode(handlers, <Expression>node.expression, visitExpression),
                visitNode(handlers, <Statement>node.statement, visitStatement))
        }

        export function visitContinueStatement(handlers: VisitorHandlers, node: BreakOrContinueStatement): BreakOrContinueStatement {
            return node;
        }

        export function visitBreakStatement(handlers: VisitorHandlers, node: BreakOrContinueStatement): BreakOrContinueStatement {
            return node;
        }

        export function visitReturnStatement(handlers: VisitorHandlers, node: ReturnStatement): ReturnStatement {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateReturnStatement(
                node,
                visitNode(handlers, <Expression>node.expression, visitExpression))
        }

        export function visitWithStatement(handlers: VisitorHandlers, node: WithStatement): WithStatement {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateWithStatement(
                node,
                visitNode(handlers, <Expression>node.expression, visitExpression),
                visitNode(handlers, <Statement>node.statement, visitStatement))
        }

        export function visitSwitchStatement(handlers: VisitorHandlers, node: SwitchStatement): SwitchStatement {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateSwitchStatement(
                node,
                visitNode(handlers, <Expression>node.expression, visitExpression),
                visitNodes(handlers, node.clauses, visitCaseOrDefaultClause))
        }

        export function visitLabeledStatement(handlers: VisitorHandlers, node: LabeledStatement): LabeledStatement {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateLabeledStatement(
                node,
                visitNode(handlers, <Identifier>node.label, handlers.visitIdentifier || visitIdentifier),
                visitNode(handlers, <Statement>node.statement, visitStatement))
        }

        export function visitThrowStatement(handlers: VisitorHandlers, node: ThrowStatement): ThrowStatement {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateThrowStatement(
                node,
                visitNode(handlers, <Expression>node.expression, visitExpression))
        }

        export function visitTryStatement(handlers: VisitorHandlers, node: TryStatement): TryStatement {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateTryStatement(
                node,
                visitNode(handlers, <Block>node.tryBlock, handlers.visitBlock || visitBlock),
                visitNode(handlers, <CatchClause>node.catchClause, handlers.visitCatchClause || visitCatchClause),
                visitNode(handlers, <Block>node.finallyBlock, handlers.visitBlock || visitBlock))
        }

        export function visitDebuggerStatement(handlers: VisitorHandlers, node: Statement): Statement {
            return node;
        }

        export function visitVariableDeclaration(handlers: VisitorHandlers, node: VariableDeclaration): VariableDeclaration {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateVariableDeclaration(
                node,
                visitNode(handlers, <BindingPattern | Identifier>node.name, visitIdentifierOrBindingPattern),
                visitNode(handlers, <Expression>node.initializer, visitExpression))
        }

        export function visitVariableDeclarationList(handlers: VisitorHandlers, node: VariableDeclarationList): VariableDeclarationList {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateVariableDeclarationList(
                node,
                visitNodes(handlers, node.declarations, (handlers.visitVariableDeclaration || visitVariableDeclaration)))
        }

        export function visitVariableDeclarationListOrExpression(handlers: VisitorHandlers, node: Expression | VariableDeclarationList): Expression | VariableDeclarationList {
            if (!node || !handlers) {
                return node;
            }
            if (isExpression(node)) {
                return visitNode(handlers, <Expression>node, visitExpression);
            }
            switch (node.kind) {
                case SyntaxKind.VariableDeclarationList:
                    return visitNode(handlers, <VariableDeclarationList>node, handlers.visitVariableDeclarationList || visitVariableDeclarationList);
                default:
                    reportUnexpectedNode(node);
                    return node;
            }
        }

        export function visitFunctionDeclaration(handlers: VisitorHandlers, node: FunctionDeclaration): FunctionDeclaration {
            return node;
        }

        export function visitCaseOrDefaultClause(handlers: VisitorHandlers, node: CaseOrDefaultClause): CaseOrDefaultClause {
            if (!node || !handlers) {
                return node;
            }
            switch (node.kind) {
                case SyntaxKind.CaseClause:
                    return visitNode(handlers, <CaseClause>node, handlers.visitCaseClause || visitCaseClause);
                case SyntaxKind.DefaultClause:
                    return visitNode(handlers, <DefaultClause>node, handlers.visitDefaultClause || visitDefaultClause);
                default:
                    reportUnexpectedNode(node);
                    return node;
            }
        }

        export function visitCaseClause(handlers: VisitorHandlers, node: CaseClause): CaseClause {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateCaseClause(
                node,
                visitNode(handlers, <Expression>node.expression, visitExpression),
                visitNodes(handlers, node.statements, visitStatement))
        }

        export function visitDefaultClause(handlers: VisitorHandlers, node: DefaultClause): DefaultClause {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateDefaultClause(
                node,
                visitNodes(handlers, node.statements, visitStatement))
        }

        export function visitCatchClause(handlers: VisitorHandlers, node: CatchClause): CatchClause {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updateCatchClause(
                node,
                visitNode(handlers, <Identifier>node.name, handlers.visitIdentifier || visitIdentifier),
                visitNode(handlers, <Block>node.block, handlers.visitBlock || visitBlock))
        }

        export function visitObjectLiteralElement(handlers: VisitorHandlers, node: ObjectLiteralElement): ObjectLiteralElement {
            if (!node || !handlers) {
                return node;
            }
            switch (node.kind) {
                case SyntaxKind.MethodDeclaration:
                    var visited = visitNode(handlers, <MethodDeclaration>node, handlers.visitMethodDeclaration || visitMethodDeclaration);
                    if (visited && !isObjectLiteralElement(visited)) {
                        reportUnexpectedNodeAfterVisit(visited, node);
                        return node;
                    }
                    return <ObjectLiteralElement>visited;
                case SyntaxKind.GetAccessor:
                    var visited = visitNode(handlers, <AccessorDeclaration>node, handlers.visitGetAccessor || visitGetAccessor);
                    if (visited && !isObjectLiteralElement(visited)) {
                        reportUnexpectedNodeAfterVisit(visited, node);
                        return node;
                    }
                    return <ObjectLiteralElement>visited;
                case SyntaxKind.SetAccessor:
                    var visited = visitNode(handlers, <AccessorDeclaration>node, handlers.visitSetAccessor || visitSetAccessor);
                    if (visited && !isObjectLiteralElement(visited)) {
                        reportUnexpectedNodeAfterVisit(visited, node);
                        return node;
                    }
                    return <ObjectLiteralElement>visited;
                case SyntaxKind.PropertyAssignment:
                    return visitNode(handlers, <PropertyAssignment>node, handlers.visitPropertyAssignment || visitPropertyAssignment);
                case SyntaxKind.ShorthandPropertyAssignment:
                    return visitNode(handlers, <ShorthandPropertyAssignment>node, handlers.visitShorthandPropertyAssignment || visitShorthandPropertyAssignment);
                default:
                    reportUnexpectedNode(node);
                    return node;
            }
        }

        export function visitPropertyAssignment(handlers: VisitorHandlers, node: PropertyAssignment): PropertyAssignment {
            if (!node || !handlers) {
                return node;
            }
            return Factory.updatePropertyAssignment(
                node,
                visitNode(handlers, <DeclarationName>node.name, visitDeclarationName),
                visitNode(handlers, <Expression>node.initializer, visitExpression))
        }

        export function visitShorthandPropertyAssignment(handlers: VisitorHandlers, node: ShorthandPropertyAssignment): ShorthandPropertyAssignment {
            return node;
        }

        function visitNode<TNode extends Node>(handlers: VisitorHandlers, node: TNode, visitNode: (handlers: VisitorHandlers, node: TNode) => TNode): TNode {
            if (!node || !handlers) {
                return node;
            }
            return visitNode(handlers, node);
        }

        export function visitNodes<TNode extends Node>(handlers: VisitorHandlers, nodes: NodeArray<TNode>, visitNode: (handlers: VisitorHandlers, node: TNode) => TNode, shouldCacheNode?: (node: Node) => boolean, cacheNode?: (node: TNode) => TNode, removeMissingNodes?: boolean): NodeArray<TNode> {
            if (!nodes || !handlers) {
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
                var updatedNode = visitNode(handlers, node);
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
                return Factory.createNodeArray(updatedNodes, nodes);
            }
            return nodes;
        }
    }
}