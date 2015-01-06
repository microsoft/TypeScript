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

        export function createArrayBindingPattern(elements: BindingElement[], location?: TextRange, flags?: NodeFlags): BindingPattern {
            var node = beginNode<BindingPattern>(SyntaxKind.ArrayBindingPattern);
            node.elements = createNodeArray(elements);
            return finishNode(node, location, flags);
        }

        export function createBindingElement(name: Identifier | BindingPattern, propertyName?: Identifier, initializer?: Expression, location?: TextRange, flags?: NodeFlags) {
            var node = beginNode<BindingElement>(SyntaxKind.BindingElement);
            node.name = name;
            node.propertyName = propertyName;
            node.initializer = initializer;
            return finishNode(node, location, flags);
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

        export function updateCatchBlock(node: CatchClause, name: Identifier, block: Block): CatchClause {
            if (node.name !== name || node.block !== block) {
                return createCatchClause(name, block, node, node.flags);
            }
            return node;
        }

        export function createGeneratedLabel(label: Label, labelNumbers: number[], location?: TextRange): GeneratedLabel  {
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
}