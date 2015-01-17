/// <reference path="parser.ts"/>
/// <reference path="factory.ts"/>

module ts {
    export interface VisitorHandler {
        visitComputedPropertyName? (node: ComputedPropertyName): DeclarationName;
        visitMethodDeclaration? (node: MethodDeclaration): ClassElement | ObjectLiteralElement;
        visitGetAccessor? (node: AccessorDeclaration): ClassElement | ObjectLiteralElement;
        visitSetAccessor? (node: AccessorDeclaration): ClassElement | ObjectLiteralElement;
        visitObjectBindingPattern? (node: BindingPattern): BindingPattern | Identifier;
        visitArrayBindingPattern? (node: BindingPattern): BindingPattern | Identifier;
        visitBindingElement? (node: BindingElement): BindingElement;
        visitArrayLiteralExpression? (node: ArrayLiteralExpression): LeftHandSideExpression;
        visitObjectLiteralExpression? (node: ObjectLiteralExpression): LeftHandSideExpression;
        visitPropertyAccessExpression? (node: PropertyAccessExpression): LeftHandSideExpression;
        visitElementAccessExpression? (node: ElementAccessExpression): LeftHandSideExpression;
        visitCallExpression? (node: CallExpression): LeftHandSideExpression;
        visitNewExpression? (node: NewExpression): LeftHandSideExpression;
        visitTaggedTemplateExpression? (node: TaggedTemplateExpression): LeftHandSideExpression;
        visitTypeAssertion? (node: TypeAssertion): UnaryExpression;
        visitParenthesizedExpression? (node: ParenthesizedExpression): LeftHandSideExpression;
        visitFunctionExpression? (node: FunctionExpression): LeftHandSideExpression;
        visitArrowFunction? (node: FunctionExpression): LeftHandSideExpression;
        visitDeleteExpression? (node: DeleteExpression): UnaryExpression;
        visitTypeOfExpression? (node: TypeOfExpression): UnaryExpression;
        visitVoidExpression? (node: VoidExpression): UnaryExpression;
        visitAwaitExpression? (node: AwaitExpression): UnaryExpression;
        visitPrefixUnaryExpression? (node: PrefixUnaryExpression): UnaryExpression;
        visitPostfixUnaryExpression? (node: PostfixUnaryExpression): UnaryExpression;
        visitBinaryExpression? (node: BinaryExpression): Expression;
        visitConditionalExpression? (node: ConditionalExpression): Expression;
        visitTemplateExpression? (node: TemplateExpression): LeftHandSideExpression | LiteralExpression | TemplateExpression;
        visitYieldExpression? (node: YieldExpression): Expression;
        visitSpreadElementExpression? (node: SpreadElementExpression): Expression;
        visitOmittedExpression? (node: Expression): Expression;
        visitTemplateSpan? (node: TemplateSpan): TemplateSpan;
        visitBlock? (node: Block): Block;
        visitVariableStatement? (node: VariableStatement): Statement;
        visitEmptyStatement? (node: Statement): Statement;
        visitExpressionStatement? (node: ExpressionStatement): Statement;
        visitIfStatement? (node: IfStatement): Statement;
        visitDoStatement? (node: DoStatement): Statement;
        visitWhileStatement? (node: WhileStatement): Statement;
        visitForStatement? (node: ForStatement): Statement;
        visitForInStatement? (node: ForInStatement): Statement;
        visitContinueStatement? (node: BreakOrContinueStatement): Statement;
        visitBreakStatement? (node: BreakOrContinueStatement): Statement;
        visitReturnStatement? (node: ReturnStatement): Statement;
        visitWithStatement? (node: WithStatement): Statement;
        visitSwitchStatement? (node: SwitchStatement): Statement;
        visitLabeledStatement? (node: LabeledStatement): Statement;
        visitThrowStatement? (node: ThrowStatement): Statement;
        visitTryStatement? (node: TryStatement): Statement;
        visitDebuggerStatement? (node: Statement): Statement;
        visitVariableDeclaration? (node: VariableDeclaration): VariableDeclaration;
        visitVariableDeclarationList? (node: VariableDeclarationList): VariableDeclarationList;
        visitVariableDeclarationListOrExpression? (node: Expression | VariableDeclarationList): Expression | VariableDeclarationList;
        visitFunctionDeclaration? (node: FunctionDeclaration): Statement;
        visitCaseClause? (node: CaseClause): CaseOrDefaultClause;
        visitDefaultClause? (node: DefaultClause): CaseOrDefaultClause;
        visitCatchClause? (node: CatchClause): CatchClause;
        visitPropertyAssignment? (node: PropertyAssignment): ObjectLiteralElement;
        visitShorthandPropertyAssignment? (node: ShorthandPropertyAssignment): ObjectLiteralElement;
    }

    export interface Visitor {
        visitDeclarationName(node: DeclarationName): DeclarationName;
        visitComputedPropertyName(node: ComputedPropertyName): DeclarationName;
        visitMethodDeclaration(node: MethodDeclaration): ClassElement | ObjectLiteralElement;
        visitGetAccessor(node: AccessorDeclaration): ClassElement | ObjectLiteralElement;
        visitSetAccessor(node: AccessorDeclaration): ClassElement | ObjectLiteralElement;
        visitIdentifierOrBindingPattern(node: BindingPattern | Identifier): BindingPattern | Identifier;
        visitObjectBindingPattern(node: BindingPattern): BindingPattern | Identifier;
        visitArrayBindingPattern(node: BindingPattern): BindingPattern | Identifier;
        visitBindingElement(node: BindingElement): BindingElement;
        visitExpression(node: Expression): Expression;
        visitUnaryExpression(node: UnaryExpression): UnaryExpression;
        visitLeftHandSideExpression(node: LeftHandSideExpression): LeftHandSideExpression;
        visitTemplateLiteralOrTemplateExpression(node: LiteralExpression | TemplateExpression): LiteralExpression | TemplateExpression;
        visitArrayLiteralExpression(node: ArrayLiteralExpression): LeftHandSideExpression;
        visitObjectLiteralExpression(node: ObjectLiteralExpression): LeftHandSideExpression;
        visitPropertyAccessExpression(node: PropertyAccessExpression): LeftHandSideExpression;
        visitElementAccessExpression(node: ElementAccessExpression): LeftHandSideExpression;
        visitCallExpression(node: CallExpression): LeftHandSideExpression;
        visitNewExpression(node: NewExpression): LeftHandSideExpression;
        visitTaggedTemplateExpression(node: TaggedTemplateExpression): LeftHandSideExpression;
        visitTypeAssertion(node: TypeAssertion): UnaryExpression;
        visitParenthesizedExpression(node: ParenthesizedExpression): LeftHandSideExpression;
        visitExpressionOrBlock(node: Block | Expression): Block | Expression;
        visitFunctionExpression(node: FunctionExpression): LeftHandSideExpression;
        visitArrowFunction(node: FunctionExpression): LeftHandSideExpression;
        visitDeleteExpression(node: DeleteExpression): UnaryExpression;
        visitTypeOfExpression(node: TypeOfExpression): UnaryExpression;
        visitVoidExpression(node: VoidExpression): UnaryExpression;
        visitAwaitExpression(node: AwaitExpression): UnaryExpression;
        visitPrefixUnaryExpression(node: PrefixUnaryExpression): UnaryExpression;
        visitPostfixUnaryExpression(node: PostfixUnaryExpression): UnaryExpression;
        visitBinaryExpression(node: BinaryExpression): Expression;
        visitConditionalExpression(node: ConditionalExpression): Expression;
        visitTemplateExpression(node: TemplateExpression): LeftHandSideExpression | LiteralExpression | TemplateExpression;
        visitYieldExpression(node: YieldExpression): Expression;
        visitSpreadElementExpression(node: SpreadElementExpression): Expression;
        visitOmittedExpression(node: Expression): Expression;
        visitTemplateSpan(node: TemplateSpan): TemplateSpan;
        visitStatement(node: Statement): Statement;
        visitBlock(node: Block): Block;
        visitVariableStatement(node: VariableStatement): Statement;
        visitEmptyStatement(node: Statement): Statement;
        visitExpressionStatement(node: ExpressionStatement): Statement;
        visitIfStatement(node: IfStatement): Statement;
        visitDoStatement(node: DoStatement): Statement;
        visitWhileStatement(node: WhileStatement): Statement;
        visitForStatement(node: ForStatement): Statement;
        visitForInStatement(node: ForInStatement): Statement;
        visitContinueStatement(node: BreakOrContinueStatement): Statement;
        visitBreakStatement(node: BreakOrContinueStatement): Statement;
        visitReturnStatement(node: ReturnStatement): Statement;
        visitWithStatement(node: WithStatement): Statement;
        visitSwitchStatement(node: SwitchStatement): Statement;
        visitLabeledStatement(node: LabeledStatement): Statement;
        visitThrowStatement(node: ThrowStatement): Statement;
        visitTryStatement(node: TryStatement): Statement;
        visitDebuggerStatement(node: Statement): Statement;
        visitVariableDeclaration(node: VariableDeclaration): VariableDeclaration;
        visitVariableDeclarationList(node: VariableDeclarationList): VariableDeclarationList;
        visitVariableDeclarationListOrExpression(node: Expression | VariableDeclarationList): Expression | VariableDeclarationList;
        visitFunctionDeclaration(node: FunctionDeclaration): Statement;
        visitCaseOrDefaultClause(node: CaseOrDefaultClause): CaseOrDefaultClause;
        visitCaseClause(node: CaseClause): CaseOrDefaultClause;
        visitDefaultClause(node: DefaultClause): CaseOrDefaultClause;
        visitCatchClause(node: CatchClause): CatchClause;
        visitObjectLiteralElement(node: ObjectLiteralElement): ObjectLiteralElement;
        visitPropertyAssignment(node: PropertyAssignment): ObjectLiteralElement;
        visitShorthandPropertyAssignment(node: ShorthandPropertyAssignment): ObjectLiteralElement;
    }

    export module Factory {
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

    export module Visitor {
        var activeVisitor: Visitor;

        export function create(handler: VisitorHandler): Visitor {
            var visitor: Visitor = {
                visitDeclarationName,
                visitComputedPropertyName,
                visitMethodDeclaration,
                visitGetAccessor,
                visitSetAccessor,
                visitIdentifierOrBindingPattern,
                visitObjectBindingPattern,
                visitArrayBindingPattern,
                visitBindingElement,
                visitExpression,
                visitUnaryExpression,
                visitLeftHandSideExpression,
                visitTemplateLiteralOrTemplateExpression,
                visitArrayLiteralExpression,
                visitObjectLiteralExpression,
                visitPropertyAccessExpression,
                visitElementAccessExpression,
                visitCallExpression,
                visitNewExpression,
                visitTaggedTemplateExpression,
                visitTypeAssertion,
                visitParenthesizedExpression,
                visitExpressionOrBlock,
                visitFunctionExpression,
                visitArrowFunction,
                visitDeleteExpression,
                visitTypeOfExpression,
                visitVoidExpression,
                visitAwaitExpression,
                visitPrefixUnaryExpression,
                visitPostfixUnaryExpression,
                visitBinaryExpression,
                visitConditionalExpression,
                visitTemplateExpression,
                visitYieldExpression,
                visitSpreadElementExpression,
                visitOmittedExpression,
                visitTemplateSpan,
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
                visitVariableDeclarationListOrExpression,
                visitFunctionDeclaration,
                visitCaseOrDefaultClause,
                visitCaseClause,
                visitDefaultClause,
                visitCatchClause,
                visitObjectLiteralElement,
                visitPropertyAssignment,
                visitShorthandPropertyAssignment,
            };

            return visitor;

            function visitDeclarationName(node: DeclarationName): DeclarationName {
                return visitNode(node, Visitor.visitDeclarationName);
            }

            function visitComputedPropertyName(node: ComputedPropertyName): DeclarationName {
                return visitNode(node, Visitor.visitComputedPropertyName, handler.visitComputedPropertyName);
            }

            function visitMethodDeclaration(node: MethodDeclaration): ClassElement | ObjectLiteralElement {
                return visitNode(node, Visitor.visitMethodDeclaration, handler.visitMethodDeclaration);
            }

            function visitGetAccessor(node: AccessorDeclaration): ClassElement | ObjectLiteralElement {
                return visitNode(node, Visitor.visitGetAccessor, handler.visitGetAccessor);
            }

            function visitSetAccessor(node: AccessorDeclaration): ClassElement | ObjectLiteralElement {
                return visitNode(node, Visitor.visitSetAccessor, handler.visitSetAccessor);
            }

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

            function visitExpression(node: Expression): Expression {
                return visitNode(node, Visitor.visitExpression);
            }

            function visitUnaryExpression(node: UnaryExpression): UnaryExpression {
                return visitNode(node, Visitor.visitUnaryExpression);
            }

            function visitLeftHandSideExpression(node: LeftHandSideExpression): LeftHandSideExpression {
                return visitNode(node, Visitor.visitLeftHandSideExpression);
            }

            function visitTemplateLiteralOrTemplateExpression(node: LiteralExpression | TemplateExpression): LiteralExpression | TemplateExpression {
                return visitNode(node, Visitor.visitTemplateLiteralOrTemplateExpression);
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

            function visitCallExpression(node: CallExpression): LeftHandSideExpression {
                return visitNode(node, Visitor.visitCallExpression, handler.visitCallExpression);
            }

            function visitNewExpression(node: NewExpression): LeftHandSideExpression {
                return visitNode(node, Visitor.visitNewExpression, handler.visitNewExpression);
            }

            function visitTaggedTemplateExpression(node: TaggedTemplateExpression): LeftHandSideExpression {
                return visitNode(node, Visitor.visitTaggedTemplateExpression, handler.visitTaggedTemplateExpression);
            }

            function visitTypeAssertion(node: TypeAssertion): UnaryExpression {
                return visitNode(node, Visitor.visitTypeAssertion, handler.visitTypeAssertion);
            }

            function visitParenthesizedExpression(node: ParenthesizedExpression): LeftHandSideExpression {
                return visitNode(node, Visitor.visitParenthesizedExpression, handler.visitParenthesizedExpression);
            }

            function visitExpressionOrBlock(node: Block | Expression): Block | Expression {
                return visitNode(node, Visitor.visitExpressionOrBlock);
            }

            function visitFunctionExpression(node: FunctionExpression): LeftHandSideExpression {
                return visitNode(node, Visitor.visitFunctionExpression, handler.visitFunctionExpression);
            }

            function visitArrowFunction(node: FunctionExpression): LeftHandSideExpression {
                return visitNode(node, Visitor.visitArrowFunction, handler.visitArrowFunction);
            }

            function visitDeleteExpression(node: DeleteExpression): UnaryExpression {
                return visitNode(node, Visitor.visitDeleteExpression, handler.visitDeleteExpression);
            }

            function visitTypeOfExpression(node: TypeOfExpression): UnaryExpression {
                return visitNode(node, Visitor.visitTypeOfExpression, handler.visitTypeOfExpression);
            }

            function visitVoidExpression(node: VoidExpression): UnaryExpression {
                return visitNode(node, Visitor.visitVoidExpression, handler.visitVoidExpression);
            }

            function visitAwaitExpression(node: AwaitExpression): UnaryExpression {
                return visitNode(node, Visitor.visitAwaitExpression, handler.visitAwaitExpression);
            }

            function visitPrefixUnaryExpression(node: PrefixUnaryExpression): UnaryExpression {
                return visitNode(node, Visitor.visitPrefixUnaryExpression, handler.visitPrefixUnaryExpression);
            }

            function visitPostfixUnaryExpression(node: PostfixUnaryExpression): UnaryExpression {
                return visitNode(node, Visitor.visitPostfixUnaryExpression, handler.visitPostfixUnaryExpression);
            }

            function visitBinaryExpression(node: BinaryExpression): Expression {
                return visitNode(node, Visitor.visitBinaryExpression, handler.visitBinaryExpression);
            }

            function visitConditionalExpression(node: ConditionalExpression): Expression {
                return visitNode(node, Visitor.visitConditionalExpression, handler.visitConditionalExpression);
            }

            function visitTemplateExpression(node: TemplateExpression): LeftHandSideExpression | LiteralExpression | TemplateExpression {
                return visitNode(node, Visitor.visitTemplateExpression, handler.visitTemplateExpression);
            }

            function visitYieldExpression(node: YieldExpression): Expression {
                return visitNode(node, Visitor.visitYieldExpression, handler.visitYieldExpression);
            }

            function visitSpreadElementExpression(node: SpreadElementExpression): Expression {
                return visitNode(node, Visitor.visitSpreadElementExpression, handler.visitSpreadElementExpression);
            }

            function visitOmittedExpression(node: Expression): Expression {
                return visitNode(node, Visitor.visitOmittedExpression, handler.visitOmittedExpression);
            }

            function visitTemplateSpan(node: TemplateSpan): TemplateSpan {
                return visitNode(node, Visitor.visitTemplateSpan, handler.visitTemplateSpan);
            }

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

            function visitVariableDeclarationListOrExpression(node: Expression | VariableDeclarationList): Expression | VariableDeclarationList {
                return visitNode(node, Visitor.visitVariableDeclarationListOrExpression, handler.visitVariableDeclarationListOrExpression);
            }

            function visitFunctionDeclaration(node: FunctionDeclaration): Statement {
                return visitNode(node, Visitor.visitFunctionDeclaration, handler.visitFunctionDeclaration);
            }

            function visitCaseOrDefaultClause(node: CaseOrDefaultClause): CaseOrDefaultClause {
                return visitNode(node, Visitor.visitCaseOrDefaultClause);
            }

            function visitCaseClause(node: CaseClause): CaseOrDefaultClause {
                return visitNode(node, Visitor.visitCaseClause, handler.visitCaseClause);
            }

            function visitDefaultClause(node: DefaultClause): CaseOrDefaultClause {
                return visitNode(node, Visitor.visitDefaultClause, handler.visitDefaultClause);
            }

            function visitCatchClause(node: CatchClause): CatchClause {
                return visitNode(node, Visitor.visitCatchClause, handler.visitCatchClause);
            }

            function visitObjectLiteralElement(node: ObjectLiteralElement): ObjectLiteralElement {
                return visitNode(node, Visitor.visitObjectLiteralElement);
            }

            function visitPropertyAssignment(node: PropertyAssignment): ObjectLiteralElement {
                return visitNode(node, Visitor.visitPropertyAssignment, handler.visitPropertyAssignment);
            }

            function visitShorthandPropertyAssignment(node: ShorthandPropertyAssignment): ObjectLiteralElement {
                return visitNode(node, Visitor.visitShorthandPropertyAssignment, handler.visitShorthandPropertyAssignment);
            }

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

        export function visitDeclarationName(node: DeclarationName): DeclarationName {
            if (!node || !activeVisitor) {
                return node;
            }
            switch (node.kind) {
                case SyntaxKind.ObjectBindingPattern:
                    return activeVisitor.visitObjectBindingPattern(<BindingPattern>node);
                case SyntaxKind.ArrayBindingPattern:
                    return activeVisitor.visitArrayBindingPattern(<BindingPattern>node);
                case SyntaxKind.ComputedPropertyName:
                    return activeVisitor.visitComputedPropertyName(<ComputedPropertyName>node);
                case SyntaxKind.Identifier:
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

        export function visitComputedPropertyName(node: ComputedPropertyName): ComputedPropertyName {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateComputedPropertyName(
                node,
                activeVisitor.visitExpression(node.expression))
        }

        export function visitMethodDeclaration(node: MethodDeclaration): MethodDeclaration {
            return node;
        }

        export function visitGetAccessor(node: AccessorDeclaration): AccessorDeclaration {
            return node;
        }

        export function visitSetAccessor(node: AccessorDeclaration): AccessorDeclaration {
            return node;
        }

        export function visitIdentifierOrBindingPattern(node: BindingPattern | Identifier): BindingPattern | Identifier {
            if (!node || !activeVisitor) {
                return node;
            }
            switch (node.kind) {
                case SyntaxKind.ObjectBindingPattern:
                    return activeVisitor.visitObjectBindingPattern(<BindingPattern>node);
                case SyntaxKind.ArrayBindingPattern:
                    return activeVisitor.visitArrayBindingPattern(<BindingPattern>node);
                case SyntaxKind.Identifier:
                    return node;
                default:
                    reportUnexpectedNode(node);
                    return node;
            }
        }

        export function visitObjectBindingPattern(node: BindingPattern): BindingPattern {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateObjectBindingPattern(
                node,
                visitNodes(node.elements, activeVisitor.visitBindingElement))
        }

        export function visitArrayBindingPattern(node: BindingPattern): BindingPattern {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateArrayBindingPattern(
                node,
                visitNodes(node.elements, activeVisitor.visitBindingElement))
        }

        export function visitBindingElement(node: BindingElement): BindingElement {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateBindingElement(
                node,
                activeVisitor.visitIdentifierOrBindingPattern(node.name),
                node.propertyName,
                activeVisitor.visitExpression(node.initializer))
        }

        export function visitExpression(node: Expression): Expression {
            if (!node || !activeVisitor) {
                return node;
            }
            switch (node.kind) {
                case SyntaxKind.BinaryExpression:
                    return activeVisitor.visitBinaryExpression(<BinaryExpression>node);
                case SyntaxKind.ConditionalExpression:
                    return activeVisitor.visitConditionalExpression(<ConditionalExpression>node);
                case SyntaxKind.YieldExpression:
                    return activeVisitor.visitYieldExpression(<YieldExpression>node);
                case SyntaxKind.SpreadElementExpression:
                    return activeVisitor.visitSpreadElementExpression(<SpreadElementExpression>node);
                case SyntaxKind.OmittedExpression:
                    return activeVisitor.visitOmittedExpression(<Expression>node);
                default:
                    return activeVisitor.visitUnaryExpression(<UnaryExpression>node);
            }
        }

        export function visitUnaryExpression(node: UnaryExpression): UnaryExpression {
            if (!node || !activeVisitor) {
                return node;
            }
            switch (node.kind) {
                case SyntaxKind.TypeAssertionExpression:
                    return activeVisitor.visitTypeAssertion(<TypeAssertion>node);
                case SyntaxKind.DeleteExpression:
                    return activeVisitor.visitDeleteExpression(<DeleteExpression>node);
                case SyntaxKind.TypeOfExpression:
                    return activeVisitor.visitTypeOfExpression(<TypeOfExpression>node);
                case SyntaxKind.VoidExpression:
                    return activeVisitor.visitVoidExpression(<VoidExpression>node);
                case SyntaxKind.AwaitExpression:
                    return activeVisitor.visitAwaitExpression(<AwaitExpression>node);
                case SyntaxKind.PrefixUnaryExpression:
                    return activeVisitor.visitPrefixUnaryExpression(<PrefixUnaryExpression>node);
                case SyntaxKind.PostfixUnaryExpression:
                    return activeVisitor.visitPostfixUnaryExpression(<PostfixUnaryExpression>node);
                default:
                    return activeVisitor.visitLeftHandSideExpression(<LeftHandSideExpression>node);
            }
        }

        export function visitLeftHandSideExpression(node: LeftHandSideExpression): LeftHandSideExpression {
            if (!node || !activeVisitor) {
                return node;
            }
            switch (node.kind) {
                case SyntaxKind.Identifier:
                    return node;
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
                case SyntaxKind.ParenthesizedExpression:
                    return activeVisitor.visitParenthesizedExpression(<ParenthesizedExpression>node);
                case SyntaxKind.FunctionExpression:
                    return activeVisitor.visitFunctionExpression(<FunctionExpression>node);
                case SyntaxKind.ArrowFunction:
                    return activeVisitor.visitArrowFunction(<FunctionExpression>node);
                case SyntaxKind.TemplateExpression:
                    return activeVisitor.visitTemplateExpression(<TemplateExpression>node);
                default:
                    return node;
            }
        }

        export function visitTemplateLiteralOrTemplateExpression(node: LiteralExpression | TemplateExpression): LiteralExpression | TemplateExpression {
            if (!node || !activeVisitor) {
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
                    var visited = activeVisitor.visitTemplateExpression(<TemplateExpression>node);
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

        export function visitArrayLiteralExpression(node: ArrayLiteralExpression): ArrayLiteralExpression {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateArrayLiteralExpression(
                node,
                visitNodes(node.elements, activeVisitor.visitExpression))
        }

        export function visitObjectLiteralExpression(node: ObjectLiteralExpression): ObjectLiteralExpression {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateObjectLiteralExpression(
                node,
                visitNodes(node.properties, activeVisitor.visitObjectLiteralElement))
        }

        export function visitPropertyAccessExpression(node: PropertyAccessExpression): PropertyAccessExpression {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updatePropertyAccessExpression(
                node,
                activeVisitor.visitLeftHandSideExpression(node.expression),
                node.name)
        }

        export function visitElementAccessExpression(node: ElementAccessExpression): ElementAccessExpression {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateElementAccessExpression(
                node,
                activeVisitor.visitLeftHandSideExpression(node.expression),
                activeVisitor.visitExpression(node.argumentExpression))
        }

        export function visitCallExpression(node: CallExpression): CallExpression {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateCallExpression(
                node,
                activeVisitor.visitLeftHandSideExpression(node.expression),
                visitNodes(node.arguments, activeVisitor.visitExpression))
        }

        export function visitNewExpression(node: NewExpression): NewExpression {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateNewExpression(
                node,
                activeVisitor.visitLeftHandSideExpression(node.expression),
                visitNodes(node.arguments, activeVisitor.visitExpression))
        }

        export function visitTaggedTemplateExpression(node: TaggedTemplateExpression): TaggedTemplateExpression {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateTaggedTemplateExpression(
                node,
                activeVisitor.visitLeftHandSideExpression(node.tag),
                activeVisitor.visitTemplateLiteralOrTemplateExpression(node.template))
        }

        export function visitTypeAssertion(node: TypeAssertion): TypeAssertion {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateTypeAssertion(
                node,
                activeVisitor.visitUnaryExpression(node.expression))
        }

        export function visitParenthesizedExpression(node: ParenthesizedExpression): ParenthesizedExpression {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateParenthesizedExpression(
                node,
                activeVisitor.visitExpression(node.expression))
        }

        export function visitExpressionOrBlock(node: Block | Expression): Block | Expression {
            if (!node || !activeVisitor) {
                return node;
            }
            if (isExpression(node)) {
                return activeVisitor.visitExpression(<Expression>node);
            }
            switch (node.kind) {
                case SyntaxKind.Block:
                    return activeVisitor.visitBlock(<Block>node);
                default:
                    reportUnexpectedNode(node);
                    return node;
            }
        }

        export function visitFunctionExpression(node: FunctionExpression): FunctionExpression {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateFunctionExpression(
                node,
                node.name,
                activeVisitor.visitExpressionOrBlock(node.body),
                node.parameters)
        }

        export function visitArrowFunction(node: FunctionExpression): FunctionExpression {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateArrowFunction(
                node,
                activeVisitor.visitExpressionOrBlock(node.body),
                node.parameters)
        }

        export function visitDeleteExpression(node: DeleteExpression): DeleteExpression {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateDeleteExpression(
                node,
                activeVisitor.visitUnaryExpression(node.expression))
        }

        export function visitTypeOfExpression(node: TypeOfExpression): TypeOfExpression {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateTypeOfExpression(
                node,
                activeVisitor.visitUnaryExpression(node.expression))
        }

        export function visitVoidExpression(node: VoidExpression): VoidExpression {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateVoidExpression(
                node,
                activeVisitor.visitUnaryExpression(node.expression))
        }

        export function visitAwaitExpression(node: AwaitExpression): AwaitExpression {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateAwaitExpression(
                node,
                activeVisitor.visitUnaryExpression(node.expression))
        }

        export function visitPrefixUnaryExpression(node: PrefixUnaryExpression): PrefixUnaryExpression {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updatePrefixUnaryExpression(
                node,
                activeVisitor.visitUnaryExpression(node.operand))
        }

        export function visitPostfixUnaryExpression(node: PostfixUnaryExpression): PostfixUnaryExpression {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updatePostfixUnaryExpression(
                node,
                activeVisitor.visitLeftHandSideExpression(node.operand))
        }

        export function visitBinaryExpression(node: BinaryExpression): BinaryExpression {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateBinaryExpression(
                node,
                activeVisitor.visitExpression(node.left),
                activeVisitor.visitExpression(node.right))
        }

        export function visitConditionalExpression(node: ConditionalExpression): ConditionalExpression {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateConditionalExpression(
                node,
                activeVisitor.visitExpression(node.condition),
                activeVisitor.visitExpression(node.whenTrue),
                activeVisitor.visitExpression(node.whenFalse))
        }

        export function visitTemplateExpression(node: TemplateExpression): TemplateExpression {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateTemplateExpression(
                node,
                node.head,
                visitNodes(node.templateSpans, activeVisitor.visitTemplateSpan))
        }

        export function visitYieldExpression(node: YieldExpression): YieldExpression {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateYieldExpression(
                node,
                activeVisitor.visitExpression(node.expression))
        }

        export function visitSpreadElementExpression(node: SpreadElementExpression): SpreadElementExpression {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateSpreadElementExpression(
                node,
                activeVisitor.visitExpression(node.expression))
        }

        export function visitOmittedExpression(node: Expression): Expression {
            return node;
        }

        export function visitTemplateSpan(node: TemplateSpan): TemplateSpan {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateTemplateSpan(
                node,
                activeVisitor.visitExpression(node.expression),
                node.literal)
        }

        export function visitStatement(node: Statement): Statement {
            if (!node || !activeVisitor) {
                return node;
            }
            switch (node.kind) {
                case SyntaxKind.Block:
                    return activeVisitor.visitBlock(<Block>node);
                case SyntaxKind.VariableStatement:
                    return activeVisitor.visitVariableStatement(<VariableStatement>node);
                case SyntaxKind.EmptyStatement:
                    return activeVisitor.visitEmptyStatement(<Statement>node);
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
                case SyntaxKind.ContinueStatement:
                    return activeVisitor.visitContinueStatement(<BreakOrContinueStatement>node);
                case SyntaxKind.BreakStatement:
                    return activeVisitor.visitBreakStatement(<BreakOrContinueStatement>node);
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
                    return activeVisitor.visitDebuggerStatement(<Statement>node);
                case SyntaxKind.FunctionDeclaration:
                    return activeVisitor.visitFunctionDeclaration(<FunctionDeclaration>node);
                default:
                    reportUnexpectedNode(node);
                    return node;
            }
        }

        export function visitBlock(node: Block): Block {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateBlock(
                node,
                visitNodes(node.statements, activeVisitor.visitStatement))
        }

        export function visitVariableStatement(node: VariableStatement): VariableStatement {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateVariableStatement(
                node,
                activeVisitor.visitVariableDeclarationList(node.declarationList))
        }

        export function visitEmptyStatement(node: Statement): Statement {
            return node;
        }

        export function visitExpressionStatement(node: ExpressionStatement): ExpressionStatement {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateExpressionStatement(
                node,
                activeVisitor.visitExpression(node.expression))
        }

        export function visitIfStatement(node: IfStatement): IfStatement {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateIfStatement(
                node,
                activeVisitor.visitExpression(node.expression),
                activeVisitor.visitStatement(node.thenStatement),
                activeVisitor.visitStatement(node.elseStatement))
        }

        export function visitDoStatement(node: DoStatement): DoStatement {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateDoStatement(
                node,
                activeVisitor.visitStatement(node.statement),
                activeVisitor.visitExpression(node.expression))
        }

        export function visitWhileStatement(node: WhileStatement): WhileStatement {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateWhileStatement(
                node,
                activeVisitor.visitExpression(node.expression),
                activeVisitor.visitStatement(node.statement))
        }

        export function visitForStatement(node: ForStatement): ForStatement {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateForStatement(
                node,
                activeVisitor.visitVariableDeclarationListOrExpression(node.initializer),
                activeVisitor.visitExpression(node.condition),
                activeVisitor.visitExpression(node.iterator),
                activeVisitor.visitStatement(node.statement))
        }

        export function visitForInStatement(node: ForInStatement): ForInStatement {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateForInStatement(
                node,
                activeVisitor.visitVariableDeclarationListOrExpression(node.initializer),
                activeVisitor.visitExpression(node.expression),
                activeVisitor.visitStatement(node.statement))
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
            return Factory.updateReturnStatement(
                node,
                activeVisitor.visitExpression(node.expression))
        }

        export function visitWithStatement(node: WithStatement): WithStatement {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateWithStatement(
                node,
                activeVisitor.visitExpression(node.expression),
                activeVisitor.visitStatement(node.statement))
        }

        export function visitSwitchStatement(node: SwitchStatement): SwitchStatement {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateSwitchStatement(
                node,
                activeVisitor.visitExpression(node.expression),
                visitNodes(node.clauses, activeVisitor.visitCaseOrDefaultClause))
        }

        export function visitLabeledStatement(node: LabeledStatement): LabeledStatement {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateLabeledStatement(
                node,
                node.label,
                activeVisitor.visitStatement(node.statement))
        }

        export function visitThrowStatement(node: ThrowStatement): ThrowStatement {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateThrowStatement(
                node,
                activeVisitor.visitExpression(node.expression))
        }

        export function visitTryStatement(node: TryStatement): TryStatement {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateTryStatement(
                node,
                activeVisitor.visitBlock(node.tryBlock),
                activeVisitor.visitCatchClause(node.catchClause),
                activeVisitor.visitBlock(node.finallyBlock))
        }

        export function visitDebuggerStatement(node: Statement): Statement {
            return node;
        }

        export function visitVariableDeclaration(node: VariableDeclaration): VariableDeclaration {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateVariableDeclaration(
                node,
                activeVisitor.visitIdentifierOrBindingPattern(node.name),
                activeVisitor.visitExpression(node.initializer))
        }

        export function visitVariableDeclarationList(node: VariableDeclarationList): VariableDeclarationList {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateVariableDeclarationList(
                node,
                visitNodes(node.declarations, activeVisitor.visitVariableDeclaration))
        }

        export function visitVariableDeclarationListOrExpression(node: Expression | VariableDeclarationList): Expression | VariableDeclarationList {
            if (!node || !activeVisitor) {
                return node;
            }
            if (isExpression(node)) {
                return activeVisitor.visitExpression(<Expression>node);
            }
            switch (node.kind) {
                case SyntaxKind.VariableDeclarationList:
                    return activeVisitor.visitVariableDeclarationList(<VariableDeclarationList>node);
                default:
                    reportUnexpectedNode(node);
                    return node;
            }
        }

        export function visitFunctionDeclaration(node: FunctionDeclaration): FunctionDeclaration {
            return node;
        }

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
            return Factory.updateCaseClause(
                node,
                activeVisitor.visitExpression(node.expression),
                visitNodes(node.statements, activeVisitor.visitStatement))
        }

        export function visitDefaultClause(node: DefaultClause): DefaultClause {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateDefaultClause(
                node,
                visitNodes(node.statements, activeVisitor.visitStatement))
        }

        export function visitCatchClause(node: CatchClause): CatchClause {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updateCatchClause(
                node,
                node.name,
                activeVisitor.visitBlock(node.block))
        }

        export function visitObjectLiteralElement(node: ObjectLiteralElement): ObjectLiteralElement {
            if (!node || !activeVisitor) {
                return node;
            }
            switch (node.kind) {
                case SyntaxKind.MethodDeclaration:
                    var visited = activeVisitor.visitMethodDeclaration(<MethodDeclaration>node);
                    if (visited && !isObjectLiteralElement(visited)) {
                        reportUnexpectedNodeAfterVisit(visited, node);
                        return node;
                    }
                    return <ObjectLiteralElement>visited;
                case SyntaxKind.GetAccessor:
                    var visited = activeVisitor.visitGetAccessor(<AccessorDeclaration>node);
                    if (visited && !isObjectLiteralElement(visited)) {
                        reportUnexpectedNodeAfterVisit(visited, node);
                        return node;
                    }
                    return <ObjectLiteralElement>visited;
                case SyntaxKind.SetAccessor:
                    var visited = activeVisitor.visitSetAccessor(<AccessorDeclaration>node);
                    if (visited && !isObjectLiteralElement(visited)) {
                        reportUnexpectedNodeAfterVisit(visited, node);
                        return node;
                    }
                    return <ObjectLiteralElement>visited;
                case SyntaxKind.PropertyAssignment:
                    return activeVisitor.visitPropertyAssignment(<PropertyAssignment>node);
                case SyntaxKind.ShorthandPropertyAssignment:
                    return activeVisitor.visitShorthandPropertyAssignment(<ShorthandPropertyAssignment>node);
                default:
                    reportUnexpectedNode(node);
                    return node;
            }
        }

        export function visitPropertyAssignment(node: PropertyAssignment): PropertyAssignment {
            if (!node || !activeVisitor) {
                return node;
            }
            return Factory.updatePropertyAssignment(
                node,
                activeVisitor.visitDeclarationName(node.name),
                activeVisitor.visitExpression(node.initializer))
        }

        export function visitShorthandPropertyAssignment(node: ShorthandPropertyAssignment): ShorthandPropertyAssignment {
            return node;
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
                return Factory.createNodeArray(updatedNodes, nodes);
            }

            return nodes;
        }
    }
}