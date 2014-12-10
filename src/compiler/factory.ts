/// <reference path="types.ts"/>
/// <reference path="core.ts"/>
/// <reference path="scanner.ts"/>
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

        // declarations
        export function createVariableDeclaration(name: Identifier, initializer?: Expression, location?: TextRange, flags?: NodeFlags): VariableDeclaration {
            var node = beginNode<VariableDeclaration>(SyntaxKind.VariableDeclaration);
            node.name = name;
            node.initializer = initializer;
            return finishNode(node, location, flags);
        }

        export function updateVariableDeclaration(node: VariableDeclaration, name: Identifier, initializer: Expression): VariableDeclaration {
            if (node.name !== name || node.initializer !== initializer) {
                return createVariableDeclaration(name, initializer, node, node.flags);
            }
            return node;
        }

        export function createParameterDeclaration(name: Identifier, initializer: Expression, location?: TextRange, flags?: NodeFlags): ParameterDeclaration {
            return createVariableDeclaration(name, initializer, location, flags);
        }

        export function updateParameterDeclaration(node: ParameterDeclaration, name: Identifier, initializer: Expression): ParameterDeclaration {
            return updateVariableDeclaration(node, name, initializer);
        }

        export function updateFunctionLikeDeclaration(node: FunctionLikeDeclaration, name: DeclarationName, body: Expression | Block, parameters: ParameterDeclaration[]): FunctionLikeDeclaration {
            if (node.name !== name || node.body !== body || node.parameters !== parameters) {
                switch (node.kind) {
                    case SyntaxKind.FunctionDeclaration:
                        return createFunctionDeclaration(<Identifier>name, <Block>body, parameters, node, node.flags, node.modifiers);
                    case SyntaxKind.Method:
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
            var node = beginNode<MethodDeclaration>(SyntaxKind.Method);
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
        export function createPrefixOperator(operator: SyntaxKind, operand: Expression, location?: TextRange, flags?: NodeFlags): UnaryExpression {
            var ctor = getNodeConstructor(SyntaxKind.PrefixOperator);
            var node = <UnaryExpression>(new ctor());
            var node = beginNode<UnaryExpression>(SyntaxKind.PrefixOperator);
            node.operator = operator;
            node.operand = operand;
            return finishNode(node, location, flags);
        }

        export function updatePrefixOperator(node: UnaryExpression, operand: Expression): UnaryExpression {
            if (node.operand !== operand) {
                return createPrefixOperator(node.operator, operand, node, node.flags);
            }
            return node;
        }

        export function createPostfixOperator(operator: SyntaxKind, operand: Expression, location?: TextRange, flags?: NodeFlags): UnaryExpression {
            var node = beginNode<UnaryExpression>(SyntaxKind.PostfixOperator);
            node.operator = operator;
            node.operand = operand;
            return finishNode(node, location, flags);
        }

        export function updatePostfixOperator(node: UnaryExpression, operand: Expression): UnaryExpression {
            if (node.operand !== operand) {
                return createPostfixOperator(node.operator, operand, node, node.flags);
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

        export function createParenExpression(expression: Expression, location?: TextRange, flags?: NodeFlags): ParenExpression {
            var node = beginNode<ParenExpression>(SyntaxKind.ParenExpression);
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateParenExpression(node: ParenExpression, expression: Expression): ParenExpression {
            if (node.expression !== expression) {
                return createParenExpression(expression, node, node.flags);
            }
            return node;
        }

        export function createArrayLiteral(elements: Expression[], location?: TextRange, flags?: NodeFlags): ArrayLiteral {
            var node = beginNode<ArrayLiteral>(SyntaxKind.ArrayLiteral);
            node.elements = createNodeArray(elements);
            return finishNode(node, location, flags);
        }

        export function updateArrayLiteral(node: ArrayLiteral, elements: Expression[]): ArrayLiteral {
            if (node.elements !== elements) {
                return createArrayLiteral(elements, node, node.flags);
            }
            return node;
        }

        export function createObjectLiteral(properties: Node[], location?: TextRange, flags?: NodeFlags): ObjectLiteral {
            var node = beginNode<ObjectLiteral>(SyntaxKind.ObjectLiteral);
            node.properties = createNodeArray(properties);
            return finishNode(node, location, flags);
        }

        export function updateObjectLiteral(node: ObjectLiteral, properties: Node[]): ObjectLiteral {
            if (node.properties !== properties) {
                return createObjectLiteral(properties, node, node.flags);
            }
            return node;
        }

        export function createPropertyAssignment(name: DeclarationName, initializer: Expression, location?: TextRange, flags?: NodeFlags): PropertyDeclaration {
            var node = beginNode<PropertyDeclaration>(SyntaxKind.PropertyAssignment);
            node.name = name;
            node.initializer = initializer;
            return finishNode(node, location, flags);
        }

        export function updatePropertyAssignment(node: PropertyDeclaration, name: DeclarationName, initializer: Expression): PropertyDeclaration {
            if (node.name !== name || node.initializer !== initializer) {
                return createPropertyAssignment(name, initializer, node, node.flags);
            }
            return node;
        }

        export function createPropertyAccess(left: Expression, right: Identifier, location?: TextRange, flags?: NodeFlags): PropertyAccess {
            var node = beginNode<PropertyAccess>(SyntaxKind.PropertyAccess);
            node.left = left;
            node.right = right;
            return finishNode(node, location, flags);
        }

        export function updatePropertyAccess(node: PropertyAccess, left: Expression, right: Identifier): PropertyAccess {
            if (node.left !== left || node.right !== right) {
                return createPropertyAccess(left, right, node, node.flags);
            }
            return node;
        }

        export function createIndexedAccess(object: Expression, index: Expression, location?: TextRange, flags?: NodeFlags): IndexedAccess {
            var node = beginNode<IndexedAccess>(SyntaxKind.IndexedAccess);
            node.object = object;
            node.index = index;
            return finishNode(node, location, flags);
        }

        export function updateIndexedAccess(node: IndexedAccess, object: Expression, index: Expression): IndexedAccess {
            if (node.object !== object || node.index !== index) {
                return createIndexedAccess(object, index, node, node.flags);
            }
            return node;
        }

        export function createCallExpression(func: Expression, arguments: Expression[], location?: TextRange, flags?: NodeFlags): CallExpression {
            var node = beginNode<CallExpression>(SyntaxKind.CallExpression);
            node.func = func;
            node.arguments = createNodeArray(arguments);
            return finishNode(node, location, flags);
        }

        export function updateCallExpression(node: CallExpression, func: Expression, arguments: Expression[]): CallExpression {
            if (node.func !== func || node.arguments !== arguments) {
                return createCallExpression(func, arguments, node, node.flags);
            }
            return node;
        }

        export function createNewExpression(func: Expression, arguments: Expression[], location?: TextRange, flags?: NodeFlags): NewExpression {
            var node = beginNode<CallExpression>(SyntaxKind.NewExpression);
            node.func = func;
            node.arguments = createNodeArray(arguments);
            return finishNode(node, location, flags);
        }

        export function updateNewExpression(node: NewExpression, func: Expression, arguments: Expression[]): NewExpression {
            if (node.func !== func || node.arguments !== arguments) {
                return createNewExpression(func, arguments, node, node.flags);
            }
            return node;
        }

        export function createShorthandPropertyAssignment(name: Identifier, location?: TextRange, flags?: NodeFlags): ShortHandPropertyDeclaration {
            var node = beginNode<ShortHandPropertyDeclaration>(SyntaxKind.ShorthandPropertyAssignment);
            node.name = name;
            return finishNode(node, location, flags);
        }

        export function updateShorthandPropertyAssignment(node: ShortHandPropertyDeclaration, name: Identifier): ShortHandPropertyDeclaration {
            if (node.name !== name) {
                return createShorthandPropertyAssignment(name, node, node.flags);
            }
            return node;
        }

        export function createTypeAssertion(type: TypeNode, operand: Expression, location?: TextRange, flags?: NodeFlags): TypeAssertion {
            var node = beginNode<TypeAssertion>(SyntaxKind.TypeAssertion);
            node.type = type;
            node.operand = operand;
            return finishNode(node, location, flags);
        }

        export function updateTypeAssertion(node: TypeAssertion, operand: Expression): TypeAssertion {
            if (node.operand !== operand) {
                return createTypeAssertion(node.type, operand, node, node.flags);
            }
            return node;
        }

        export function createTaggedTemplateExpression(tag: Expression, template: LiteralExpression | TemplateExpression, location?: TextRange, flags?: NodeFlags): TaggedTemplateExpression {
            var node = beginNode<TaggedTemplateExpression>(SyntaxKind.TaggedTemplateExpression);
            node.tag = tag;
            node.template = template;
            return finishNode(node, location, flags);
        }

        export function updateTaggedTemplateExpression(node: TaggedTemplateExpression, tag: Expression, template: LiteralExpression | TemplateExpression): TaggedTemplateExpression {
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

        export function createStringLiteral(text: string, location?: TextRange, flags?: NodeFlags): LiteralExpression {
            var node = beginNode<LiteralExpression>(SyntaxKind.StringLiteral);
            node.text = text;
            return finishNode(node, location, flags);
        }

        export function createNumericLiteral(value: number, location?: TextRange, flags?: NodeFlags): LiteralExpression {
            var node = beginNode<LiteralExpression>(SyntaxKind.NumericLiteral);
            node.text = String(value);
            return finishNode(node, location, flags);
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

        export function createFunctionBlock(statements: Statement[], location?: TextRange, flags?: NodeFlags): Block {
            var node = beginNode<Block>(SyntaxKind.FunctionBlock);
            node.statements = createNodeArray(statements);
            return finishNode(node, location, flags);
        }

        export function updateFunctionBlock(node: Block, statements: Statement[]): Block {
            if (node.statements !== statements) {
                return createFunctionBlock(statements, node, node.flags);
            }
            return node;
        }

        export function createVariableStatement(declarations: VariableDeclaration[], location?: TextRange, flags?: NodeFlags): VariableStatement {
            var node = beginNode<VariableStatement>(SyntaxKind.VariableStatement);
            node.declarations = createNodeArray(declarations);
            return finishNode(node, location, flags);
        }

        export function updateVariableStatement(node: VariableStatement, declarations: VariableDeclaration[]): VariableStatement {
            if (node.declarations !== declarations) {
                return createVariableStatement(declarations, node, node.flags);
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

        export function createForStatement(declarations: VariableDeclaration[], initializer: Expression, condition: Expression, iterator: Expression, statement: Statement, location?: TextRange, flags?: NodeFlags): ForStatement {
            var node = beginNode<ForStatement>(SyntaxKind.ForStatement);
            node.declarations = declarations && createNodeArray(declarations);
            node.initializer = initializer;
            node.condition = condition;
            node.iterator = iterator;
            node.statement = statement;
            return finishNode(node, location, flags);
        }

        export function updateForStatement(node: ForStatement, declarations: VariableDeclaration[], initializer: Expression, condition: Expression, iterator: Expression, statement: Statement): ForStatement {
            if (node.declarations !== declarations || node.initializer !== initializer || node.condition !== condition || node.iterator !== iterator || node.statement !== statement) {
                return createForStatement(declarations, initializer, condition, iterator, statement, node, node.flags);
            }
            return node;
        }

        export function createForInStatement(declarations: VariableDeclaration[], variable: Expression, expression: Expression, statement: Statement, location?: TextRange, flags?: NodeFlags): ForInStatement {
            var node = beginNode<ForInStatement>(SyntaxKind.ForInStatement);
            node.declarations = declarations && createNodeArray(declarations);
            node.variable = variable;
            node.expression = expression;
            node.statement = statement;
            return finishNode(node, location, flags);
        }

        export function updateForInStatement(node: ForInStatement, declarations: VariableDeclaration[], variable: Expression, expression: Expression, statement: Statement): ForInStatement {
            if (node.declarations !== declarations || node.variable !== variable || node.expression !== expression || node.statement !== statement) {
                return createForInStatement(declarations, variable, expression, statement, node, node.flags);
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

        export function createCaseClause(expression: Expression, statements: Statement[], location?: TextRange, flags?: NodeFlags): CaseOrDefaultClause {
            var node = beginNode<CaseOrDefaultClause>(SyntaxKind.CaseClause);
            node.expression = expression;
            node.statements = createNodeArray(statements);
            return finishNode(node, location, flags);
        }

        export function updateCaseClause(node: CaseOrDefaultClause, expression: Expression, statements: Statement[]): CaseOrDefaultClause {
            if (node.expression !== expression || node.statements !== statements) {
                return createCaseClause(expression, statements, node, node.flags);
            }
            return node;
        }

        export function createDefaultClause(statements: Statement[], location?: TextRange, flags?: NodeFlags): CaseOrDefaultClause {
            var node = beginNode<CaseOrDefaultClause>(SyntaxKind.DefaultClause);
            node.statements = createNodeArray(statements);
            return finishNode(node, location, flags);
        }

        export function updateDefaultClause(node: CaseOrDefaultClause, statements: Statement[]): CaseOrDefaultClause {
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

        export function createTryStatement(tryBlock: Block, catchBlock: CatchBlock, finallyBlock: Block, location?: TextRange, flags?: NodeFlags): TryStatement {
            var node = beginNode<TryStatement>(SyntaxKind.TryStatement);
            node.tryBlock = tryBlock;
            node.catchBlock = catchBlock;
            node.finallyBlock = finallyBlock;
            return finishNode(node, location, flags);
        }

        export function updateTryStatement(node: TryStatement, tryBlock: Block, catchBlock: CatchBlock, finallyBlock: Block): TryStatement {
            if (node.tryBlock !== tryBlock || node.catchBlock !== catchBlock || node.finallyBlock !== finallyBlock) {
                return createTryStatement(tryBlock, catchBlock, finallyBlock, node, node.flags);
            }
            return node;
        }

        export function createTryBlock(statements: Statement[], location?: TextRange, flags?: NodeFlags): Block {
            var node = beginNode<Block>(SyntaxKind.TryBlock);
            node.statements = createNodeArray(statements);
            return finishNode(node, location, flags);
        }

        export function updateTryBlock(node: Block, statements: Statement[]): Block {
            if (node.statements !== statements) {
                return createTryBlock(statements, node, node.flags);
            }
            return node;
        }

        export function createCatchBlock(variable: Identifier, statements: Statement[], location?: TextRange, flags?: NodeFlags): CatchBlock {
            var node = beginNode<CatchBlock>(SyntaxKind.CatchBlock);
            node.variable = variable;
            node.statements = createNodeArray(statements);
            return finishNode(node, location, flags);
        }

        export function updateCatchBlock(node: CatchBlock, variable: Identifier, statements: Statement[]): CatchBlock {
            if (node.variable !== variable || node.statements !== statements) {
                return createCatchBlock(variable, statements, node, node.flags);
            }
            return node;
        }

        export function createFinallyBlock(statements: Statement[], location?: TextRange, flags?: NodeFlags): Block {
            var node = beginNode<Block>(SyntaxKind.FinallyBlock);
            node.statements = createNodeArray(statements);
            return finishNode(node, location, flags);
        }

        export function updateFinallyBlock(node: Block, statements: Statement[]): Block {
            if (node.statements !== statements) {
                return createFinallyBlock(statements, node, node.flags);
            }
            return node;
        }

        export function createGeneratedNode(text: string, content?: Map<Node|Node[]>, location?: TextRange, leadingComments?: CommentRange[], trailingComments?: CommentRange[]): GeneratedNode {
            var node = beginNode<GeneratedNode>(SyntaxKind.GeneratedNode);
            node.text = text;
            node.content = content;
            node.leadingComments = leadingComments;
            node.trailingComments = trailingComments;
            return finishNode(node, location);
        }

        export function createGeneratedLabel(label: Label, labelNumbers: number[], location?: TextRange): GeneratedLabel  {
            var node = beginNode<GeneratedLabel>(SyntaxKind.GeneratedLabel);
            node.label = label;
            node.labelNumbers = labelNumbers;
            return finishNode(node, location);
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

        function finishNode<TNode extends Node>(node: TNode, location: TextRange, flags?: NodeFlags, modifiers?: Node[]): TNode {
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