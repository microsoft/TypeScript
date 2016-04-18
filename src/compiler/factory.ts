/// <reference path="core.ts"/>
/// <reference path="utilities.ts"/>

/* @internal */
namespace ts {
    let NodeConstructor: new (kind: SyntaxKind, pos: number, end: number) => Node;
    let SourceFileConstructor: new (kind: SyntaxKind, pos: number, end: number) => Node;

    function createNode(kind: SyntaxKind, location?: TextRange, flags?: NodeFlags): Node {
        const ConstructorForKind = kind === SyntaxKind.SourceFile
            ? (SourceFileConstructor || (SourceFileConstructor = objectAllocator.getSourceFileConstructor()))
            : (NodeConstructor || (NodeConstructor = objectAllocator.getNodeConstructor()));

        const node = location
            ? new ConstructorForKind(kind, location.pos, location.end)
            : new ConstructorForKind(kind, /*pos*/ -1, /*end*/ -1);

        if (flags) {
            node.flags = flags;
        }

        return node;
    }

    export function createNodeArray<T extends Node>(elements?: T[], location?: TextRange, hasTrailingComma?: boolean): NodeArray<T> {
        if (elements) {
            if (isNodeArray(elements)) {
                return elements;
            }
        }
        else {
            elements = [];
        }

        const array = <NodeArray<T>>elements;
        if (location) {
            array.pos = location.pos;
            array.end = location.end;
        }
        else {
            array.pos = -1;
            array.end = -1;
        }

        if (hasTrailingComma) {
            array.hasTrailingComma = true;
        }

        return array;
    }

    export function createSynthesizedNode(kind: SyntaxKind, startsOnNewLine?: boolean): Node {
        const node = createNode(kind, /*location*/ undefined);
        node.startsOnNewLine = startsOnNewLine;
        return node;
    }

    export function createSynthesizedNodeArray<T extends Node>(elements?: T[]): NodeArray<T> {
        return createNodeArray(elements, /*location*/ undefined);
    }

    /**
     * Creates a shallow, memberwise clone of a node with no source map location.
     */
    export function getSynthesizedClone<T extends Node>(node: T): T {
        // We don't use "clone" from core.ts here, as we need to preserve the prototype chain of
        // the original node. We also need to exclude specific properties and only include own-
        // properties (to skip members already defined on the shared prototype).
        const clone = <T>createNode(node.kind, /*location*/ undefined);
        clone.flags = node.flags;
        clone.original = node;

        for (const key in node) {
            if (clone.hasOwnProperty(key) || !node.hasOwnProperty(key)) {
                continue;
            }

            (<any>clone)[key] = (<any>node)[key];
        }

        return clone;
    }

    /**
     * Creates a shallow, memberwise clone of a node for mutation.
     */
    export function getMutableClone<T extends Node>(node: T): T {
        const clone = getSynthesizedClone(node);
        clone.pos = node.pos;
        clone.end = node.end;
        clone.parent = node.parent;
        return clone;
    }

    /**
     * Creates a shallow, memberwise clone of a node at the specified source map location.
     */
    export function getRelocatedClone<T extends Node>(node: T, location: TextRange): T {
        const clone = getSynthesizedClone(node);
        clone.pos = location.pos;
        clone.end = location.end;
        return clone;
    }

    /**
     * Gets a clone of a node with a unique node ID.
     */
    export function getUniqueClone<T extends Node>(node: T): T {
        const clone = getMutableClone(node);
        clone.id = undefined;
        getNodeId(clone);
        return clone;
    }

    // Literals

    export function createLiteral(textSource: StringLiteral | Identifier, location?: TextRange): StringLiteral;
    export function createLiteral(value: string, location?: TextRange): StringLiteral;
    export function createLiteral(value: number, location?: TextRange): LiteralExpression;
    export function createLiteral(value: string | number | boolean, location?: TextRange): PrimaryExpression;
    export function createLiteral(value: string | number | boolean | StringLiteral | Identifier, location?: TextRange): PrimaryExpression {
        if (typeof value === "number") {
            const node = <LiteralExpression>createNode(SyntaxKind.NumericLiteral, location);
            node.text = value.toString();
            return node;
        }
        else if (typeof value === "boolean") {
            return <PrimaryExpression>createNode(value ? SyntaxKind.TrueKeyword : SyntaxKind.FalseKeyword, location);
        }
        else if (typeof value === "string") {
            const node = <StringLiteral>createNode(SyntaxKind.StringLiteral, location);
            node.text = value;
            return node;
        }
        else {
            const node = <StringLiteral>createNode(SyntaxKind.StringLiteral, location);
            node.textSourceNode = value;
            node.text = value.text;
            return node;
        }
    }

    // Identifiers

    export function createIdentifier(text: string, location?: TextRange): Identifier {
        const node = <Identifier>createNode(SyntaxKind.Identifier, location);
        node.text = escapeIdentifier(text);
        node.originalKeywordKind = stringToToken(text);
        return node;
    }

    export function createTempVariable(recordTempVariable: (node: Identifier) => void, location?: TextRange): Identifier {
        const name = <Identifier>createNode(SyntaxKind.Identifier, location);
        name.autoGenerateKind = GeneratedIdentifierKind.Auto;
        getNodeId(name);
        if (recordTempVariable) {
            recordTempVariable(name);
        }
        return name;
    }

    export function createLoopVariable(location?: TextRange): Identifier {
        const name = <Identifier>createNode(SyntaxKind.Identifier, location);
        name.autoGenerateKind = GeneratedIdentifierKind.Loop;
        getNodeId(name);
        return name;
    }

    export function createUniqueName(text: string, location?: TextRange): Identifier {
        const name = <Identifier>createNode(SyntaxKind.Identifier, location);
        name.text = text;
        name.autoGenerateKind = GeneratedIdentifierKind.Unique;
        getNodeId(name);
        return name;
    }

    export function getGeneratedNameForNode(node: Node, location?: TextRange): Identifier {
        const name = <Identifier>createNode(SyntaxKind.Identifier, location);
        name.autoGenerateKind = GeneratedIdentifierKind.Node;
        name.original = node;
        getNodeId(name);
        return name;
    }

    // Reserved words

    export function createSuper() {
        const node = <PrimaryExpression>createNode(SyntaxKind.SuperKeyword);
        return node;
    }

    export function createThis(location?: TextRange) {
        const node = <PrimaryExpression>createNode(SyntaxKind.ThisKeyword, location);
        return node;
    }

    export function createNull() {
        const node = <PrimaryExpression>createNode(SyntaxKind.NullKeyword);
        return node;
    }

    // Names

    export function createComputedPropertyName(expression: Expression, location?: TextRange) {
        const node = <ComputedPropertyName>createNode(SyntaxKind.ComputedPropertyName, location);
        node.expression = expression;
        return node;
    }

    // Type members

    export function createMethod(modifiers: Modifier[], name: string | PropertyName, parameters: ParameterDeclaration[], body: Block, location?: TextRange) {
        const node = <MethodDeclaration>createNode(SyntaxKind.MethodDeclaration, location);
        node.decorators = undefined;
        node.modifiers = modifiers ? createNodeArray(modifiers) : undefined;
        node.name = typeof name === "string" ? createIdentifier(name) : name;
        node.typeParameters = undefined;
        node.parameters = createNodeArray(parameters);
        node.body = body;
        return node;
    }

    export function createConstructor(parameters: ParameterDeclaration[], body: Block, location?: TextRange) {
        const node = <ConstructorDeclaration>createNode(SyntaxKind.Constructor, location);
        node.decorators = undefined;
        node.modifiers = undefined;
        node.typeParameters = undefined;
        node.parameters = createNodeArray(parameters);
        node.type = undefined;
        node.body = body;
        return node;
    }

    export function createGetAccessor(modifiers: Modifier[], name: string | PropertyName, body: Block, location?: TextRange) {
        const node = <GetAccessorDeclaration>createNode(SyntaxKind.GetAccessor, location);
        node.decorators = undefined;
        node.modifiers = modifiers ? createNodeArray(modifiers) : undefined;
        node.name = typeof name === "string" ? createIdentifier(name) : name;
        node.typeParameters = undefined;
        node.parameters = createNodeArray<ParameterDeclaration>();
        node.body = body;
        return node;
    }

    export function createSetAccessor(modifiers: Modifier[], name: string | PropertyName, parameter: ParameterDeclaration, body: Block, location?: TextRange) {
        const node = <SetAccessorDeclaration>createNode(SyntaxKind.SetAccessor, location);
        node.decorators = undefined;
        node.modifiers = modifiers ? createNodeArray(modifiers) : undefined;
        node.name = typeof name === "string" ? createIdentifier(name) : name;
        node.typeParameters = undefined;
        node.parameters = createNodeArray([parameter]);
        node.body = body;
        return node;
    }

    export function createParameter(name: string | Identifier | BindingPattern, initializer?: Expression, location?: TextRange) {
        const node = <ParameterDeclaration>createNode(SyntaxKind.Parameter, location);
        node.decorators = undefined;
        node.modifiers = undefined;
        node.dotDotDotToken = undefined;
        node.name = typeof name === "string" ? createIdentifier(name) : name;
        node.questionToken = undefined;
        node.type = undefined;
        node.initializer = initializer ? parenthesizeExpressionForList(initializer) : undefined;
        return node;
    }

    // Expression

    export function createArrayLiteral(elements?: Expression[], location?: TextRange, multiLine?: boolean) {
        const node = <ArrayLiteralExpression>createNode(SyntaxKind.ArrayLiteralExpression, location);
        node.elements = parenthesizeListElements(createNodeArray(elements));
        if (multiLine) {
            node.multiLine = multiLine;
        }
        return node;
    }

    export function createObjectLiteral(properties?: ObjectLiteralElement[], location?: TextRange, multiLine?: boolean) {
        const node = <ObjectLiteralExpression>createNode(SyntaxKind.ObjectLiteralExpression, location);
        node.properties = createNodeArray(properties);
        if (multiLine) {
            node.multiLine = multiLine;
        }
        return node;
    }

    export function createPropertyAccess(expression: Expression, name: string | Identifier, location?: TextRange) {
        const node = <PropertyAccessExpression>createNode(SyntaxKind.PropertyAccessExpression, location);
        node.expression = parenthesizeForAccess(expression);
        node.dotToken = createSynthesizedNode(SyntaxKind.DotToken);
        node.name = typeof name === "string" ? createIdentifier(name) : name;
        return node;
    }

    export function createElementAccess(expression: Expression, index: number | Expression, location?: TextRange) {
        const node = <ElementAccessExpression>createNode(SyntaxKind.ElementAccessExpression, location);
        node.expression = parenthesizeForAccess(expression);
        node.argumentExpression = typeof index === "number" ? createLiteral(index) : index;
        return node;
    }

    export function createCall(expression: Expression, argumentsArray: Expression[], location?: TextRange) {
        const node = <CallExpression>createNode(SyntaxKind.CallExpression, location);
        node.expression = parenthesizeForAccess(expression);
        node.arguments = parenthesizeListElements(createNodeArray(argumentsArray));
        return node;
    }

    export function createNew(expression: Expression, argumentsArray: Expression[], location?: TextRange) {
        const node = <NewExpression>createNode(SyntaxKind.NewExpression, location);
        node.expression = parenthesizeForNew(expression);
        node.arguments = argumentsArray
            ? parenthesizeListElements(createNodeArray(argumentsArray))
            : undefined;
        return node;
    }

    export function createParen(expression: Expression, location?: TextRange) {
        const node = <ParenthesizedExpression>createNode(SyntaxKind.ParenthesizedExpression, location);
        node.expression = expression;
        return node;
    }

    export function createFunctionExpression(asteriskToken: Node, name: string | Identifier, parameters: ParameterDeclaration[], body: Block, location?: TextRange, original?: Node) {
        const node = <FunctionExpression>createNode(SyntaxKind.FunctionExpression, location);
        node.modifiers = undefined;
        node.asteriskToken = asteriskToken;
        node.name = typeof name === "string" ? createIdentifier(name) : name;
        node.typeParameters = undefined;
        node.parameters = createNodeArray(parameters);
        node.type = undefined;
        node.body = body;
        if (original) {
            node.original = original;
        }

        return node;
    }

    export function createArrowFunction(parameters: ParameterDeclaration[], body: Expression | Block, location?: TextRange) {
        const node = <ArrowFunction>createNode(SyntaxKind.ArrowFunction, location);
        node.modifiers = undefined;
        node.typeParameters = undefined;
        node.parameters = createNodeArray(parameters);
        node.type = undefined;
        node.equalsGreaterThanToken = createNode(SyntaxKind.EqualsGreaterThanToken);
        node.body = parenthesizeConciseBody(body);
        return node;
    }

    export function createTypeOf(expression: Expression) {
        const node = <TypeOfExpression>createNode(SyntaxKind.TypeOfExpression);
        node.expression = parenthesizePrefixOperand(expression);
        return node;
    }

    export function createVoid(expression: Expression) {
        const node = <VoidExpression>createNode(SyntaxKind.VoidExpression);
        node.expression = parenthesizePrefixOperand(expression);
        return node;
    }

    export function createPrefix(operator: SyntaxKind, operand: Expression, location?: TextRange) {
        const node = <PrefixUnaryExpression>createNode(SyntaxKind.PrefixUnaryExpression, location);
        node.operator = operator;
        node.operand = parenthesizePrefixOperand(operand);
        return node;
    }

    export function createPostfix(operand: Expression, operator: SyntaxKind, location?: TextRange) {
        const node = <PostfixUnaryExpression>createNode(SyntaxKind.PostfixUnaryExpression, location);
        node.operand = parenthesizePostfixOperand(operand);
        node.operator = operator;
        return node;
    }

    export function createBinary(left: Expression, operator: SyntaxKind, right: Expression, location?: TextRange) {
        const node = <BinaryExpression>createNode(SyntaxKind.BinaryExpression, location);
        node.left = parenthesizeBinaryOperand(operator, left, /*isLeftSideOfBinary*/ true, /*leftOperand*/ undefined);
        node.operatorToken = createSynthesizedNode(operator);
        node.right = parenthesizeBinaryOperand(operator, right, /*isLeftSideOfBinary*/ false, node.left);
        return node;
    }

    export function createConditional(condition: Expression, whenTrue: Expression, whenFalse: Expression) {
        const node = <ConditionalExpression>createNode(SyntaxKind.ConditionalExpression);
        node.condition = condition;
        node.questionToken = createSynthesizedNode(SyntaxKind.QualifiedName);
        node.whenTrue = whenTrue;
        node.colonToken = createSynthesizedNode(SyntaxKind.ColonToken);
        node.whenFalse = whenFalse;
        return node;
    }

    export function createYield(expression: Expression, location?: TextRange) {
        const node = <YieldExpression>createNode(SyntaxKind.YieldExpression, location);
        node.expression = expression;
        return node;
    }

    export function createSpread(expression: Expression) {
        const node = <SpreadElementExpression>createNode(SyntaxKind.SpreadElementExpression);
        node.expression = parenthesizeExpressionForList(expression);
        return node;
    }

    export function createClassExpression(name: Identifier, heritageClauses: HeritageClause[], members: ClassElement[], location?: TextRange) {
        const node = <ClassExpression>createNode(SyntaxKind.ClassExpression, location);
        node.decorators = undefined;
        node.modifiers = undefined;
        node.name = name;
        node.typeParameters = undefined;
        node.heritageClauses = createNodeArray(heritageClauses);
        node.members = createNodeArray(members);
        return node;
    }

    export function createOmittedExpression(location?: TextRange) {
        const node = <OmittedExpression>createNode(SyntaxKind.OmittedExpression, location);
        return node;
    }

    export function createExpressionWithTypeArguments(expression: Expression, location?: TextRange) {
        const node = <ExpressionWithTypeArguments>createNode(SyntaxKind.ExpressionWithTypeArguments, location);
        node.typeArguments = undefined;
        node.expression = parenthesizeForAccess(expression);
        return node;
    }

    // Element

    export function createBlock(statements: Statement[], location?: TextRange, multiLine?: boolean): Block {
        const block = <Block>createNode(SyntaxKind.Block, location);
        block.statements = createNodeArray(statements);
        if (multiLine) {
            block.multiLine = true;
        }
        return block;
    }

    export function createVariableStatement(modifiers: Modifier[], declarationList: VariableDeclarationList | VariableDeclaration[], location?: TextRange): VariableStatement {
        const node = <VariableStatement>createNode(SyntaxKind.VariableStatement, location);
        node.decorators = undefined;
        node.modifiers = modifiers ? createNodeArray(modifiers) : undefined;
        node.declarationList = isArray(declarationList) ? createVariableDeclarationList(declarationList) : declarationList;
        return node;
    }

    export function createVariableDeclarationList(declarations: VariableDeclaration[], location?: TextRange, flags?: NodeFlags): VariableDeclarationList {
        const node = <VariableDeclarationList>createNode(SyntaxKind.VariableDeclarationList, location, flags);
        node.declarations = createNodeArray(declarations);
        return node;
    }

    export function createLetDeclarationList(declarations: VariableDeclaration[], location?: TextRange) {
        return createVariableDeclarationList(declarations, location, NodeFlags.Let);
    }

    export function createConstDeclarationList(declarations: VariableDeclaration[], location?: TextRange) {
        return createVariableDeclarationList(declarations, location, NodeFlags.Const);
    }

    export function createVariableDeclaration(name: string | BindingPattern | Identifier, initializer?: Expression, location?: TextRange): VariableDeclaration {
        const node = <VariableDeclaration>createNode(SyntaxKind.VariableDeclaration, location);
        node.name = typeof name === "string" ? createIdentifier(name) : name;
        node.initializer = initializer !== undefined ? parenthesizeExpressionForList(initializer) : undefined;
        return node;
    }

    export function createEmptyStatement(location: TextRange) {
        return <EmptyStatement>createNode(SyntaxKind.EmptyStatement, location);
    }

    export function createStatement(expression: Expression, location?: TextRange): ExpressionStatement {
        const node = <ExpressionStatement>createNode(SyntaxKind.ExpressionStatement, location);
        node.expression = parenthesizeExpressionForExpressionStatement(expression);
        return node;
    }

    export function createIf(expression: Expression, thenStatement: Statement, elseStatement?: Statement, location?: TextRange, options?: { startOnNewLine?: boolean; }) {
        const node = <IfStatement>createNode(SyntaxKind.IfStatement, location);
        node.expression = expression;
        node.thenStatement = thenStatement;
        node.elseStatement = elseStatement;
        if (options && options.startOnNewLine) {
            node.startsOnNewLine = true;
        }

        return node;
    }

    export function createSwitch(expression: Expression, caseBlock: CaseBlock, location?: TextRange): SwitchStatement {
        const node = <SwitchStatement>createNode(SyntaxKind.SwitchStatement, location);
        node.expression = parenthesizeExpressionForList(expression);
        node.caseBlock = caseBlock;
        return node;
    }

    export function createCaseBlock(clauses: CaseClause[], location?: TextRange): CaseBlock {
        const node = <CaseBlock>createNode(SyntaxKind.CaseBlock, location);
        node.clauses = createNodeArray(clauses);
        return node;
    }

    export function createFor(initializer: ForInitializer, condition: Expression, incrementor: Expression, statement: Statement, location?: TextRange) {
        const node = <ForStatement>createNode(SyntaxKind.ForStatement, location);
        node.initializer = initializer;
        node.condition = condition;
        node.incrementor = incrementor;
        node.statement = statement;
        return node;
    }

    export function createLabel(label: string | Identifier, statement: Statement, location?: TextRange) {
        const node = <LabeledStatement>createNode(SyntaxKind.LabeledStatement, location);
        node.label = typeof label === "string" ? createIdentifier(label) : label;
        node.statement = statement;
        return node;
    }

    export function createDo(expression: Expression, statement: Statement, location?: TextRange) {
        const node = <DoStatement>createNode(SyntaxKind.DoStatement, location);
        node.expression = expression;
        node.statement = statement;
        return node;
    }

    export function createWhile(statement: Statement, expression: Expression, location?: TextRange) {
        const node = <WhileStatement>createNode(SyntaxKind.WhileStatement, location);
        node.statement = statement;
        node.expression = expression;
        return node;
    }

    export function createForIn(initializer: ForInitializer, expression: Expression, statement: Statement, location?: TextRange) {
        const node = <ForInStatement>createNode(SyntaxKind.ForInStatement, location);
        node.initializer = initializer;
        node.expression = expression;
        node.statement = statement;
        return node;
    }

    export function createForOf(initializer: ForInitializer, expression: Expression, statement: Statement, location?: TextRange) {
        const node = <ForOfStatement>createNode(SyntaxKind.ForOfStatement, location);
        node.initializer = initializer;
        node.expression = expression;
        node.statement = statement;
        return node;
    }

    export function createReturn(expression?: Expression, location?: TextRange): ReturnStatement {
        const node = <ReturnStatement>createNode(SyntaxKind.ReturnStatement, location);
        node.expression = expression;
        return node;
    }

    export function createFunctionDeclaration(modifiers: Modifier[], asteriskToken: Node, name: string | Identifier, parameters: ParameterDeclaration[], body: Block, location?: TextRange, original?: Node) {
        const node = <FunctionDeclaration>createNode(SyntaxKind.FunctionDeclaration, location);
        node.decorators = undefined;
        node.modifiers = modifiers ? createNodeArray(modifiers) : undefined;
        node.asteriskToken = asteriskToken;
        node.name = typeof name === "string" ? createIdentifier(name) : name;
        node.typeParameters = undefined;
        node.parameters = createNodeArray(parameters);
        node.type = undefined;
        node.body = body;
        if (original) {
            node.original = original;
        }
        return node;
    }

    export function createClassDeclaration(modifiers: Modifier[], name: Identifier, heritageClauses: HeritageClause[], members: ClassElement[], location?: TextRange) {
        const node = <ClassDeclaration>createNode(SyntaxKind.ClassDeclaration, location);
        node.decorators = undefined;
        node.modifiers = modifiers ? createNodeArray(modifiers) : undefined;
        node.name = name;
        node.typeParameters = undefined;
        node.heritageClauses = createNodeArray(heritageClauses);
        node.members = createNodeArray(members);
        return node;
    }

    export function createExportDefault(expression: Expression) {
        const node = <ExportAssignment>createNode(SyntaxKind.ExportAssignment);
        node.isExportEquals = false;
        node.expression = expression;
        return node;
    }

    export function createExportDeclaration(exportClause: NamedExports, moduleSpecifier?: Expression) {
        const node = <ExportDeclaration>createNode(SyntaxKind.ExportDeclaration);
        node.exportClause = exportClause;
        node.moduleSpecifier = moduleSpecifier;
        return node;
    }

    export function createNamedExports(elements: ExportSpecifier[]) {
        const node = <NamedExports>createNode(SyntaxKind.NamedExports);
        node.elements = createNodeArray(elements);
        return node;
    }

    export function createExportSpecifier(name: string | Identifier, propertyName?: string | Identifier) {
        const node = <ExportSpecifier>createNode(SyntaxKind.ExportSpecifier);
        node.name = typeof name === "string" ? createIdentifier(name) : name;
        node.propertyName = typeof propertyName === "string" ? createIdentifier(propertyName) : propertyName;
        return node;
    }

    // Clauses

    export function createHeritageClause(token: SyntaxKind, types: ExpressionWithTypeArguments[], location?: TextRange) {
        const node = <HeritageClause>createNode(SyntaxKind.HeritageClause, location);
        node.token = token;
        node.types = createNodeArray(types);
        return node;
    }

    export function createCaseClause(expression: Expression, statements: Statement[], location?: TextRange) {
        const node = <CaseClause>createNode(SyntaxKind.CaseClause, location);
        node.expression = parenthesizeExpressionForList(expression);
        node.statements = createNodeArray(statements);
        return node;
    }

    // Property assignments

    export function createPropertyAssignment(name: string | PropertyName, initializer: Expression, location?: TextRange) {
        const node = <PropertyAssignment>createNode(SyntaxKind.PropertyAssignment, location);
        node.name = typeof name === "string" ? createIdentifier(name) : name;
        node.questionToken = undefined;
        node.initializer = initializer !== undefined ? parenthesizeExpressionForList(initializer) : undefined;
        return node;
    }

    // Transformation nodes

    /**
     * Creates a synthetic statement to act as a placeholder for a not-emitted statement in
     * order to preserve comments.
     *
     * @param original The original statement.
     */
    export function createNotEmittedStatement(original: Node) {
        const node = <NotEmittedStatement>createNode(SyntaxKind.NotEmittedStatement, /*location*/ original);
        node.original = original;
        return node;
    }

    /**
     * Creates a synthetic expression to act as a placeholder for a not-emitted expression in
     * order to preserve comments or sourcemap positions.
     *
     * @param expression The inner expression to emit.
     * @param original The original outer expression.
     * @param location The location for the expression. Defaults to the positions from "original" if provided.
     */
    export function createPartiallyEmittedExpression(expression: Expression, original?: Node, location?: TextRange) {
        const node = <PartiallyEmittedExpression>createNode(SyntaxKind.PartiallyEmittedExpression, /*location*/ location || original);
        node.expression = expression;
        node.original = original;
        return node;
    }

    // Compound nodes

    export function createComma(left: Expression, right: Expression) {
        return <Expression>createBinary(left, SyntaxKind.CommaToken, right);
    }

    export function createLessThan(left: Expression, right: Expression, location?: TextRange) {
        return <Expression>createBinary(left, SyntaxKind.LessThanToken, right, location);
    }

    export function createAssignment(left: Expression, right: Expression, location?: TextRange) {
        return createBinary(left, SyntaxKind.EqualsToken, right, location);
    }

    export function createStrictEquality(left: Expression, right: Expression) {
        return createBinary(left, SyntaxKind.EqualsEqualsEqualsToken, right);
    }

    export function createStrictInequality(left: Expression, right: Expression) {
        return createBinary(left, SyntaxKind.ExclamationEqualsEqualsToken, right);
    }

    export function createAdd(left: Expression, right: Expression) {
        return createBinary(left, SyntaxKind.PlusToken, right);
    }

    export function createSubtract(left: Expression, right: Expression) {
        return createBinary(left, SyntaxKind.MinusToken, right);
    }

    export function createPostfixIncrement(operand: Expression, location?: TextRange) {
        return createPostfix(operand, SyntaxKind.PlusPlusToken, location);
    }

    export function createLogicalAnd(left: Expression, right: Expression) {
        return createBinary(left, SyntaxKind.AmpersandAmpersandToken, right);
    }

    export function createLogicalOr(left: Expression, right: Expression) {
        return createBinary(left, SyntaxKind.BarBarToken, right);
    }

    export function createLogicalNot(operand: Expression) {
        return createPrefix(SyntaxKind.ExclamationToken, operand);
    }

    export function createVoidZero() {
        return createVoid(createLiteral(0));
    }

    export function createImportDeclaration(importClause: ImportClause, moduleSpecifier?: Expression, location?: TextRange): ImportDeclaration {
        const node = <ImportDeclaration>createNode(SyntaxKind.ImportDeclaration, location);
        node.importClause = importClause;
        node.moduleSpecifier = moduleSpecifier;
        return node;
    }

    export function createImportClause(name: Identifier, namedBindings: NamedImportBindings, location?: TextRange): ImportClause {
        const node = <ImportClause>createNode(SyntaxKind.ImportClause, location);
        node.name = name;
        node.namedBindings = namedBindings;
        return node;
    }

    export function createNamedImports(elements: NodeArray<ImportSpecifier>, location?: TextRange): NamedImports {
        const node = <NamedImports>createNode(SyntaxKind.NamedImports, location);
        node.elements = elements;
        return node;
    }

    export function createMemberAccessForPropertyName(target: Expression, memberName: PropertyName, location?: TextRange): MemberExpression {
        if (isIdentifier(memberName)) {
            return createPropertyAccess(target, getSynthesizedClone(memberName), location);
        }
        else if (isComputedPropertyName(memberName)) {
            return createElementAccess(target, memberName.expression, location);
        }
        else {
            return createElementAccess(target, memberName, location);
        }
    }

    export function createRestParameter(name: string | Identifier) {
        const node = createParameter(name, /*initializer*/ undefined);
        node.dotDotDotToken = createSynthesizedNode(SyntaxKind.DotDotDotToken);
        return node;
    }

    export function createFunctionCall(func: Expression, thisArg: Expression, argumentsList: Expression[], location?: TextRange) {
        return createCall(
            createPropertyAccess(func, "call"),
            [
                thisArg,
                ...argumentsList
            ],
            location
        );
    }

    export function createBreak(label?: Identifier, location?: TextRange): BreakStatement {
        const node = <BreakStatement>createNode(SyntaxKind.BreakStatement, location);
        if (label) {
            node.label = label;
        }
        return node;
    }

    export function createContinue(label?: Identifier, location?: TextRange): BreakStatement {
        const node = <ContinueStatement>createNode(SyntaxKind.ContinueStatement, location);
        if (label) {
            node.label = label;
        }
        return node;
    }

    export function createFunctionApply(func: Expression, thisArg: Expression, argumentsExpression: Expression, location?: TextRange) {
        return createCall(
            createPropertyAccess(func, "apply"),
            [
                thisArg,
                argumentsExpression
            ],
            location
        );
    }

    export function createArraySlice(array: Expression, start?: number | Expression) {
        const argumentsList: Expression[] = [];
        if (start !== undefined) {
            argumentsList.push(typeof start === "number" ? createLiteral(start) : start);
        }

        return createCall(createPropertyAccess(array, "slice"), argumentsList);
    }

    export function createArrayConcat(array: Expression, values: Expression[]) {
        return createCall(
            createPropertyAccess(array, "concat"),
            values
        );
    }

    export function createMathPow(left: Expression, right: Expression, location?: TextRange) {
        return createCall(
            createPropertyAccess(createIdentifier("Math"), "pow"),
            [left, right],
            location
        );
    }

    function createReactNamespace(reactNamespace: string, parent: JsxOpeningLikeElement) {
        // Create an identifier and give it a parent. This allows us to resolve the react
        // namespace during emit.
        const react = createIdentifier(reactNamespace || "React");
        react.parent = parent;
        return react;
    }

    export function createReactSpread(reactNamespace: string, segments: Expression[], parentElement: JsxOpeningLikeElement) {
        return createCall(
            createPropertyAccess(
                createReactNamespace(reactNamespace, parentElement),
                "__spread"
            ),
            segments
        );
    }

    export function createReactCreateElement(reactNamespace: string, tagName: Expression, props: Expression, children: Expression[], parentElement: JsxOpeningLikeElement, location: TextRange): LeftHandSideExpression {
        const argumentsList = [tagName];
        if (props) {
            argumentsList.push(props);
        }

        if (children && children.length > 0) {
            if (!props) {
                argumentsList.push(createNull());
            }

            addNodes(argumentsList, children, /*startOnNewLine*/ children.length > 1);
        }

        return createCall(
            createPropertyAccess(
                createReactNamespace(reactNamespace, parentElement),
                "createElement"
            ),
            argumentsList,
            location
        );
    }

    // Helpers

    export function createExtendsHelper(name: Identifier) {
        return createCall(
            createIdentifier("__extends"),
            [
                name,
                createIdentifier("_super")
            ]
        );
    }

    export function createParamHelper(expression: Expression, parameterOffset: number) {
        return createCall(
            createIdentifier("__param"),
            [
                createLiteral(parameterOffset),
                expression
            ]
        );
    }

    export function createMetadataHelper(metadataKey: string, metadataValue: Expression) {
        return createCall(
            createIdentifier("__metadata"),
            [
                createLiteral(metadataKey),
                metadataValue
            ]
        );
    }

    export function createDecorateHelper(decoratorExpressions: Expression[], target: Expression, memberName?: Expression, descriptor?: Expression) {
        const argumentsArray: Expression[] = [];
        argumentsArray.push(createArrayLiteral(decoratorExpressions, /*location*/ undefined, /*multiLine*/ true));
        argumentsArray.push(target);
        if (memberName) {
            argumentsArray.push(memberName);
            if (descriptor) {
                argumentsArray.push(descriptor);
            }
        }

        return createCall(createIdentifier("__decorate"), argumentsArray);
    }

    export function createAwaiterHelper(hasLexicalArguments: boolean, promiseConstructor: EntityName | Expression, body: Block) {
        return createCall(
            createIdentifier("__awaiter"),
            [
                createThis(),
                hasLexicalArguments ? createIdentifier("arguments") : createVoidZero(),
                promiseConstructor ? createExpressionFromEntityName(promiseConstructor) : createVoidZero(),
                createFunctionExpression(
                    createNode(SyntaxKind.AsteriskToken),
                    /*name*/ undefined,
                    [],
                    body
                )
            ]
        );
    }

    export function createHasOwnProperty(target: LeftHandSideExpression, propertyName: Expression) {
        return createCall(
            createPropertyAccess(target, "hasOwnProperty"),
            [propertyName]
        );
    }

    export interface PropertyDescriptorOptions {
        [key: string]: boolean | Expression;
        get?: Expression;
        set?: Expression;
        value?: Expression;
        enumerable?: boolean | Expression;
        configurable?: boolean | Expression;
        writable?: boolean | Expression;
    }

    export interface PropertyDescriptorExtendedOptions {
        [key: string]: PropertyDescriptorExtendedOption;
        get?: PropertyDescriptorExtendedOption;
        set?: PropertyDescriptorExtendedOption;
        value?: PropertyDescriptorExtendedOption;
        enumerable?: PropertyDescriptorExtendedOption;
        configurable?: PropertyDescriptorExtendedOption;
        writable?: PropertyDescriptorExtendedOption;
    }

    export interface PropertyDescriptorExtendedOption {
        location?: TextRange;
        emitFlags?: NodeEmitFlags;
        newLine?: boolean;
    }

    export function createObjectDefineProperty(target: Expression, memberName: Expression, descriptor: PropertyDescriptorOptions, preferNewLine?: boolean, location?: TextRange, descriptorOptions?: PropertyDescriptorExtendedOptions, context?: TransformationContext) {
        return createCall(
            createPropertyAccess(
                createIdentifier("Object"),
                "defineProperty"
            ),
            [
                target,
                memberName,
                createObjectLiteral(
                    createPropertyDescriptorProperties(descriptor, descriptorOptions, preferNewLine, context),
                    /*location*/ undefined,
                    /*multiLine*/ preferNewLine
                )
            ],
            location
        );
    }

    function createPropertyDescriptorProperties(descriptor: PropertyDescriptorOptions, descriptorExtendedOptions: PropertyDescriptorExtendedOptions, preferNewLine: boolean, context: TransformationContext) {
        const properties: ObjectLiteralElement[] = [];
        addPropertyDescriptorPropertyAssignmentIfNeeded(properties, "get", descriptor, descriptorExtendedOptions, preferNewLine, context);
        addPropertyDescriptorPropertyAssignmentIfNeeded(properties, "set", descriptor, descriptorExtendedOptions, preferNewLine, context);
        addPropertyDescriptorPropertyAssignmentIfNeeded(properties, "value", descriptor, descriptorExtendedOptions, preferNewLine, context);
        addPropertyDescriptorPropertyAssignmentIfNeeded(properties, "enumerable", descriptor, descriptorExtendedOptions, preferNewLine, context);
        addPropertyDescriptorPropertyAssignmentIfNeeded(properties, "configurable", descriptor, descriptorExtendedOptions, preferNewLine, context);
        addPropertyDescriptorPropertyAssignmentIfNeeded(properties, "writable", descriptor, descriptorExtendedOptions, preferNewLine, context);
        return properties;
    }

    function addPropertyDescriptorPropertyAssignmentIfNeeded(properties: ObjectLiteralElement[], name: string, descriptor: PropertyDescriptorOptions, descriptorExtendedOptions: PropertyDescriptorExtendedOptions, preferNewLine: boolean, context: TransformationContext) {
        const value = getProperty(descriptor, name);
        if (value !== undefined) {
            const options = getProperty(descriptorExtendedOptions, name);
            let location: TextRange;
            let emitFlags: NodeEmitFlags;
            if (isDefined(options)) {
                location = options.location;
                emitFlags = options.emitFlags;
                if (isDefined(options.newLine)) {
                    preferNewLine = options.newLine;
                }
            }

            const property = createPropertyAssignment(
                name,
                typeof value === "boolean" ? createLiteral(value) : value,
                location
            );

            if (isDefined(emitFlags)) {
                Debug.assert(isDefined(context), "TransformationContext must be supplied when emitFlags are provided.");
                context.setNodeEmitFlags(property, emitFlags);
            }

            if (preferNewLine) {
                startOnNewLine(property);
            }

            properties.push(property);
        }
    }

    function createObjectCreate(prototype: Expression) {
        return createCall(
            createPropertyAccess(createIdentifier("Object"), "create"),
            [prototype]
        );
    }

    function createGeti(target: LeftHandSideExpression) {
        // name => super[name]
        return createArrowFunction(
            [createParameter("name")],
            createElementAccess(
                target,
                createIdentifier("name")
            )
        );
    }

    function createSeti(target: LeftHandSideExpression) {
        // (name, value) => super[name] = value
        return createArrowFunction(
            [
                createParameter("name"),
                createParameter("value")
            ],
            createAssignment(
                createElementAccess(
                    target,
                    createIdentifier("name")
                ),
                createIdentifier("value")
            )
        );
    }

    export function createAdvancedAsyncSuperHelper() {
        //  const _super = (function (geti, seti) {
        //      const cache = Object.create(null);
        //      return name => cache[name] || (cache[name] = { get value() { return geti(name); }, set value(v) { seti(name, v); } });
        //  })(name => super[name], (name, value) => super[name] = value);

        // const cache = Object.create(null);
        const createCache = createVariableStatement(
            /*modifiers*/ undefined,
            createConstDeclarationList([
                createVariableDeclaration(
                    "cache",
                    createObjectCreate(createNull())
                )
            ])
        );

        // get value() { return geti(name); }
        const getter = createGetAccessor(
            /*modifiers*/ undefined,
            "value",
            createBlock([
                createReturn(
                    createCall(
                        createIdentifier("geti"),
                        [createIdentifier("name")]
                    )
                )
            ])
        );

        // set value(v) { seti(name, v); }
        const setter = createSetAccessor(
            /*modifiers*/ undefined,
            "value",
            createParameter("v"),
            createBlock([
                createStatement(
                    createCall(
                        createIdentifier("seti"),
                        [
                            createIdentifier("name"),
                            createIdentifier("v")
                        ]
                    )
                )
            ])
        );

        // return name => cache[name] || ...
        const getOrCreateAccessorsForName = createReturn(
            createArrowFunction(
                [createParameter("name")],
                createLogicalOr(
                    createElementAccess(
                        createIdentifier("cache"),
                        createIdentifier("name")
                    ),
                    createParen(
                        createAssignment(
                            createElementAccess(
                                createIdentifier("cache"),
                                createIdentifier("name")
                            ),
                            createObjectLiteral([
                                getter,
                                setter
                            ])
                        )
                    )
                )
            )
        );

        //  const _super = (function (geti, seti) {
        //      const cache = Object.create(null);
        //      return name => cache[name] || (cache[name] = { get value() { return geti(name); }, set value(v) { seti(name, v); } });
        //  })(name => super[name], (name, value) => super[name] = value);
        return createVariableStatement(
            /*modifiers*/ undefined,
            createConstDeclarationList([
                createVariableDeclaration(
                    "_super",
                    createCall(
                        createParen(
                            createFunctionExpression(
                                /*asteriskToken*/ undefined,
                                /*name*/ undefined,
                                [
                                    createParameter("geti"),
                                    createParameter("seti")
                                ],
                                createBlock([
                                    createCache,
                                    getOrCreateAccessorsForName
                                ])
                            )
                        ),
                        [
                            createGeti(createSuper()),
                            createSeti(createSuper())
                        ]
                    )
                )
            ])
        );
    }

    export function createSimpleAsyncSuperHelper() {
        return createVariableStatement(
            /*modifiers*/ undefined,
            createConstDeclarationList([
                createVariableDeclaration(
                    "_super",
                    createGeti(createSuper())
                )
            ])
        );
    }

    export interface CallBinding {
        target: LeftHandSideExpression;
        thisArg: Expression;
    }

    function shouldBeCapturedInTempVariable(node: Expression): boolean {
        switch (skipParentheses(node).kind) {
            case SyntaxKind.Identifier:
            case SyntaxKind.ThisKeyword:
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.StringLiteral:
                return false;
            default:
                return true;
        }
    }

    export function createCallBinding(expression: Expression, recordTempVariable: (temp: Identifier) => void, languageVersion?: ScriptTarget): CallBinding {
        const callee = skipOuterExpressions(expression, OuterExpressionKinds.All);
        let thisArg: Expression;
        let target: LeftHandSideExpression;
        if (isSuperProperty(callee)) {
            thisArg = createThis();
            target = callee;
        }
        else if (callee.kind === SyntaxKind.SuperKeyword) {
            thisArg = createThis();
            target = languageVersion < ScriptTarget.ES6 ? createIdentifier("_super", /*location*/ callee) : <PrimaryExpression>callee;
        }
        else {
            switch (callee.kind) {
                case SyntaxKind.PropertyAccessExpression: {
                    if (shouldBeCapturedInTempVariable((<PropertyAccessExpression>callee).expression)) {
                        // for `a.b()` target is `(_a = a).b` and thisArg is `_a`
                        thisArg = createTempVariable(recordTempVariable);
                        target = createPropertyAccess(
                            createAssignment(
                                thisArg,
                                (<PropertyAccessExpression>callee).expression,
                                /*location*/ (<PropertyAccessExpression>callee).expression
                            ),
                            (<PropertyAccessExpression>callee).name,
                            /*location*/ callee
                        );
                    }
                    else {
                        thisArg = (<PropertyAccessExpression>callee).expression;
                        target = <PropertyAccessExpression>callee;
                    }
                    break;
                }

                case SyntaxKind.ElementAccessExpression: {
                    if (shouldBeCapturedInTempVariable((<ElementAccessExpression>callee).expression)) {
                        // for `a[b]()` target is `(_a = a)[b]` and thisArg is `_a`
                        thisArg = createTempVariable(recordTempVariable);
                        target = createElementAccess(
                            createAssignment(
                                thisArg,
                                (<ElementAccessExpression>callee).expression,
                                /*location*/ (<ElementAccessExpression>callee).expression
                            ),
                            (<ElementAccessExpression>callee).argumentExpression,
                            /*location*/ callee
                        );
                    }
                    else {
                        thisArg = (<ElementAccessExpression>callee).expression;
                        target = <ElementAccessExpression>callee;
                    }

                    break;
                }

                default: {
                    // for `a()` target is `a` and thisArg is `void 0`
                    thisArg = createVoidZero();
                    target = parenthesizeForAccess(expression);
                    break;
                }
            }
        }

        return { target, thisArg };
    }

    export function inlineExpressions(expressions: Expression[]) {
        return reduceLeft(expressions, createComma);
    }

    export function createExpressionFromEntityName(node: EntityName | Expression): Expression {
        return isQualifiedName(node)
            ? createPropertyAccess(
                createExpressionFromEntityName(node.left),
                getSynthesizedClone(node.right)
            )
            : getSynthesizedClone(node);
    }

    export function createExpressionForPropertyName(memberName: PropertyName, location?: TextRange): Expression {
        return isIdentifier(memberName) ? createLiteral(memberName.text, location)
             : isComputedPropertyName(memberName) ? getRelocatedClone(memberName.expression, location)
             : getRelocatedClone(memberName, location);
    }

    // Utilities

    function isUseStrictPrologue(node: ExpressionStatement): boolean {
        return (node.expression as StringLiteral).text === "use strict";
    }

    /**
     * Add any necessary prologue-directives into target statement-array.
     * The function needs to be called during each transformation step.
     * This function needs to be called whenever we transform the statement
     * list of a source file, namespace, or function-like body.
     *
     * @param target: result statements array
     * @param source: origin statements array
     * @param ensureUseStrict: boolean determining whether the function need to add prologue-directives
     */
    export function addPrologueDirectives(target: Statement[], source: Statement[], ensureUseStrict?: boolean): number {
        Debug.assert(target.length === 0, "PrologueDirectives should be at the first statement in the target statements array");
        let foundUseStrict = false;
        for (let i = 0; i < source.length; i++) {
            if (isPrologueDirective(source[i])) {
                if (isUseStrictPrologue(source[i] as ExpressionStatement)) {
                    foundUseStrict = true;
                }

                target.push(source[i]);
            }
            else {
                if (ensureUseStrict && !foundUseStrict) {
                    target.push(startOnNewLine(createStatement(createLiteral("use strict"))));
                }

                return i;
            }
        }

        return source.length;
    }

    /**
     * Wraps the operand to a BinaryExpression in parentheses if they are needed to preserve the intended
     * order of operations.
     *
     * @param binaryOperator The operator for the BinaryExpression.
     * @param operand The operand for the BinaryExpression.
     * @param isLeftSideOfBinary A value indicating whether the operand is the left side of the
     *                           BinaryExpression.
     */
    export function parenthesizeBinaryOperand(binaryOperator: SyntaxKind, operand: Expression, isLeftSideOfBinary: boolean, leftOperand?: Expression) {
        const skipped = skipPartiallyEmittedExpressions(operand);

        // If the resulting expression is already parenthesized, we do not need to do any further processing.
        if (skipped.kind === SyntaxKind.ParenthesizedExpression) {
            return operand;
        }

        return binaryOperandNeedsParentheses(binaryOperator, operand, isLeftSideOfBinary, leftOperand)
            ? createParen(operand)
            : operand;
    }

    /**
     * Determines whether the operand to a BinaryExpression needs to be parenthesized.
     *
     * @param binaryOperator The operator for the BinaryExpression.
     * @param operand The operand for the BinaryExpression.
     * @param isLeftSideOfBinary A value indicating whether the operand is the left side of the
     *                           BinaryExpression.
     */
    function binaryOperandNeedsParentheses(binaryOperator: SyntaxKind, operand: Expression, isLeftSideOfBinary: boolean, leftOperand: Expression) {
        // If the operand has lower precedence, then it needs to be parenthesized to preserve the
        // intent of the expression. For example, if the operand is `a + b` and the operator is
        // `*`, then we need to parenthesize the operand to preserve the intended order of
        // operations: `(a + b) * x`.
        //
        // If the operand has higher precedence, then it does not need to be parenthesized. For
        // example, if the operand is `a * b` and the operator is `+`, then we do not need to
        // parenthesize to preserve the intended order of operations: `a * b + x`.
        //
        // If the operand has the same precedence, then we need to check the associativity of
        // the operator based on whether this is the left or right operand of the expression.
        //
        // For example, if `a / d` is on the right of operator `*`, we need to parenthesize
        // to preserve the intended order of operations: `x * (a / d)`
        //
        // If `a ** d` is on the left of operator `**`, we need to parenthesize to preserve
        // the intended order of operations: `(a ** b) ** c`
        const binaryOperatorPrecedence = getOperatorPrecedence(SyntaxKind.BinaryExpression, binaryOperator);
        const binaryOperatorAssociativity = getOperatorAssociativity(SyntaxKind.BinaryExpression, binaryOperator);
        const emittedOperand = skipPartiallyEmittedExpressions(operand);
        const operandPrecedence = getExpressionPrecedence(emittedOperand);
        switch (compareValues(operandPrecedence, binaryOperatorPrecedence)) {
            case Comparison.LessThan:
                // If the operand is the right side of a right-associative binary operation
                // and is a yield expression, then we do not need parentheses.
                if (!isLeftSideOfBinary
                    && binaryOperatorAssociativity === Associativity.Right
                    && operand.kind === SyntaxKind.YieldExpression) {
                    return false;
                }

                return true;

            case Comparison.GreaterThan:
                return false;

            case Comparison.EqualTo:
                if (isLeftSideOfBinary) {
                    // No need to parenthesize the left operand when the binary operator is
                    // left associative:
                    //  (a*b)/x    ->  a*b/x
                    //  (a**b)/x   ->  a**b/x
                    //
                    // Parentheses are needed for the left operand when the binary operator is
                    // right associative:
                    //  (a/b)**x   ->  (a/b)**x
                    //  (a**b)**x  ->  (a**b)**x
                    return binaryOperatorAssociativity === Associativity.Right;
                }
                else {
                    if (isBinaryExpression(emittedOperand)
                        && emittedOperand.operatorToken.kind === binaryOperator) {
                        // No need to parenthesize the right operand when the binary operator and
                        // operand are the same and one of the following:
                        //  x*(a*b)     => x*a*b
                        //  x|(a|b)     => x|a|b
                        //  x&(a&b)     => x&a&b
                        //  x^(a^b)     => x^a^b
                        if (operatorHasAssociativeProperty(binaryOperator)) {
                            return false;
                        }

                        // No need to parenthesize the right operand when the binary operator
                        // is plus (+) if both the left and right operands consist solely of either
                        // literals of the same kind or binary plus (+) expressions for literals of
                        // the same kind (recursively).
                        //  "a"+(1+2)       => "a"+(1+2)
                        //  "a"+("b"+"c")   => "a"+"b"+"c"
                        if (binaryOperator === SyntaxKind.PlusToken) {
                            const leftKind = leftOperand ? getLiteralKindOfBinaryPlusOperand(leftOperand) : SyntaxKind.Unknown;
                            if (isLiteralKind(leftKind) && leftKind === getLiteralKindOfBinaryPlusOperand(emittedOperand)) {
                                return false;
                            }
                        }
                    }

                    // No need to parenthesize the right operand when the operand is right
                    // associative:
                    //  x/(a**b)    -> x/a**b
                    //  x**(a**b)   -> x**a**b
                    //
                    // Parentheses are needed for the right operand when the operand is left
                    // associative:
                    //  x/(a*b)     -> x/(a*b)
                    //  x**(a/b)    -> x**(a/b)
                    const operandAssociativity = getExpressionAssociativity(emittedOperand);
                    return operandAssociativity === Associativity.Left;
                }
        }
    }

    /**
     * Determines whether a binary operator is mathematically associative.
     *
     * @param binaryOperator The binary operator.
     */
    function operatorHasAssociativeProperty(binaryOperator: SyntaxKind) {
        // The following operators are associative in JavaScript:
        //  (a*b)*c     -> a*(b*c)  -> a*b*c
        //  (a|b)|c     -> a|(b|c)  -> a|b|c
        //  (a&b)&c     -> a&(b&c)  -> a&b&c
        //  (a^b)^c     -> a^(b^c)  -> a^b^c
        //
        // While addition is associative in mathematics, JavaScript's `+` is not
        // guaranteed to be associative as it is overloaded with string concatenation.
        return binaryOperator === SyntaxKind.AsteriskToken
            || binaryOperator === SyntaxKind.BarToken
            || binaryOperator === SyntaxKind.AmpersandToken
            || binaryOperator === SyntaxKind.CaretToken;
    }

    interface BinaryPlusExpression extends BinaryExpression {
        cachedLiteralKind: SyntaxKind;
    }

    /**
     * This function determines whether an expression consists of a homogeneous set of
     * literal expressions or binary plus expressions that all share the same literal kind.
     * It is used to determine whether the right-hand operand of a binary plus expression can be
     * emitted without parentheses.
     */
    function getLiteralKindOfBinaryPlusOperand(node: Expression): SyntaxKind {
        node = skipPartiallyEmittedExpressions(node);

        if (isLiteralKind(node.kind)) {
            return node.kind;
        }

        if (node.kind === SyntaxKind.BinaryExpression && (<BinaryExpression>node).operatorToken.kind === SyntaxKind.PlusToken) {
            if ((<BinaryPlusExpression>node).cachedLiteralKind !== undefined) {
                return (<BinaryPlusExpression>node).cachedLiteralKind;
            }

            const leftKind = getLiteralKindOfBinaryPlusOperand((<BinaryExpression>node).left);
            const literalKind = isLiteralKind(leftKind)
                && leftKind === getLiteralKindOfBinaryPlusOperand((<BinaryExpression>node).right)
                    ? leftKind
                    : SyntaxKind.Unknown;

            (<BinaryPlusExpression>node).cachedLiteralKind = literalKind;
            return literalKind;
        }

        return SyntaxKind.Unknown;
    }

    /**
     * Wraps an expression in parentheses if it is needed in order to use the expression
     * as the expression of a NewExpression node.
     *
     * @param expression The Expression node.
     */
    export function parenthesizeForNew(expression: Expression): LeftHandSideExpression {
        const emittedExpression = skipPartiallyEmittedExpressions(expression);
        switch (emittedExpression.kind) {
            case SyntaxKind.CallExpression:
                return createParen(expression);

            case SyntaxKind.NewExpression:
                return (<NewExpression>emittedExpression).arguments
                    ? <LeftHandSideExpression>expression
                    : createParen(expression);
        }

        return parenthesizeForAccess(expression);
    }

    /**
     * Wraps an expression in parentheses if it is needed in order to use the expression for
     * property or element access.
     *
     * @param expr The expression node.
     */
    export function parenthesizeForAccess(expression: Expression): LeftHandSideExpression {
        // isLeftHandSideExpression is almost the correct criterion for when it is not necessary
        // to parenthesize the expression before a dot. The known exceptions are:
        //
        //    NewExpression:
        //       new C.x        -> not the same as (new C).x
        //    NumericLiteral
        //       1.x            -> not the same as (1).x
        //
        const emittedExpression = skipPartiallyEmittedExpressions(expression);
        if (isLeftHandSideExpression(emittedExpression)
            && (emittedExpression.kind !== SyntaxKind.NewExpression || (<NewExpression>emittedExpression).arguments)
            && emittedExpression.kind !== SyntaxKind.NumericLiteral) {
            return <LeftHandSideExpression>expression;
        }

        return createParen(expression, /*location*/ expression);
    }

    export function parenthesizePostfixOperand(operand: Expression) {
        return isLeftHandSideExpression(operand)
            ? <LeftHandSideExpression>operand
            : createParen(operand, /*location*/ operand);
    }

    export function parenthesizePrefixOperand(operand: Expression) {
        return isUnaryExpression(operand)
            ? <UnaryExpression>operand
            : createParen(operand, /*location*/ operand);
    }

    function parenthesizeListElements(elements: NodeArray<Expression>) {
        let result: Expression[];
        for (let i = 0; i < elements.length; i++) {
            const element = parenthesizeExpressionForList(elements[i]);
            if (result !== undefined || element !== elements[i]) {
                if (result === undefined) {
                    result = elements.slice(0, i);
                }

                result.push(element);
            }
        }

        if (result !== undefined) {
            return createNodeArray(result, elements, elements.hasTrailingComma);
        }

        return elements;
    }

    export function parenthesizeExpressionForList(expression: Expression) {
        const emittedExpression = skipPartiallyEmittedExpressions(expression);
        const expressionPrecedence = getExpressionPrecedence(emittedExpression);
        const commaPrecedence = getOperatorPrecedence(SyntaxKind.BinaryExpression, SyntaxKind.CommaToken);
        return expressionPrecedence > commaPrecedence
            ? expression
            : createParen(expression, /*location*/ expression);
    }

    export function parenthesizeExpressionForExpressionStatement(expression: Expression) {
        const emittedExpression = skipPartiallyEmittedExpressions(expression);
        if (isCallExpression(emittedExpression)) {
            const callee = emittedExpression.expression;
            const kind = skipPartiallyEmittedExpressions(callee).kind;
            if (kind === SyntaxKind.FunctionExpression || kind === SyntaxKind.ArrowFunction) {
                const mutableCall = getMutableClone(emittedExpression);
                mutableCall.expression = createParen(callee, /*location*/ callee);
                return recreatePartiallyEmittedExpressions(expression, mutableCall);
            }
        }
        else {
            const leftmostExpressionKind = getLeftmostExpression(emittedExpression).kind;
            if (leftmostExpressionKind === SyntaxKind.ObjectLiteralExpression || leftmostExpressionKind === SyntaxKind.FunctionExpression) {
                return createParen(expression, /*location*/ expression);
            }
        }

        return expression;
    }

    /**
     * Clones a series of not-emitted expressions with a new inner expression.
     *
     * @param originalOuterExpression The original outer expression.
     * @param newInnerExpression The new inner expression.
     */
    function recreatePartiallyEmittedExpressions(originalOuterExpression: Expression, newInnerExpression: Expression) {
        if (isPartiallyEmittedExpression(originalOuterExpression)) {
            const clone = getMutableClone(originalOuterExpression);
            clone.expression = recreatePartiallyEmittedExpressions(clone.expression, newInnerExpression);
            return clone;
        }

        return newInnerExpression;
    }

    function getLeftmostExpression(node: Expression): Expression {
        while (true) {
            switch (node.kind) {
                case SyntaxKind.PostfixUnaryExpression:
                    node = (<PostfixUnaryExpression>node).operand;
                    continue;

                case SyntaxKind.BinaryExpression:
                    node = (<BinaryExpression>node).left;
                    continue;

                case SyntaxKind.ConditionalExpression:
                    node = (<ConditionalExpression>node).condition;
                    continue;

                case SyntaxKind.CallExpression:
                case SyntaxKind.ElementAccessExpression:
                case SyntaxKind.PropertyAccessExpression:
                    node = (<CallExpression | PropertyAccessExpression | ElementAccessExpression>node).expression;
                    continue;

                case SyntaxKind.PartiallyEmittedExpression:
                    node = (<PartiallyEmittedExpression>node).expression;
                    continue;
            }

            return node;
        }
    }

    export function parenthesizeConciseBody(body: ConciseBody): ConciseBody {
        const emittedBody = skipPartiallyEmittedExpressions(body);
        if (emittedBody.kind === SyntaxKind.ObjectLiteralExpression) {
            return createParen(<Expression>body, /*location*/ body);
        }

        return body;
    }

    export const enum OuterExpressionKinds {
        Parentheses = 1 << 0,
        Assertions = 1 << 1,
        PartiallyEmittedExpressions = 1 << 2,

        All = Parentheses | Assertions | PartiallyEmittedExpressions
    }

    export function skipOuterExpressions(node: Expression, kinds?: OuterExpressionKinds): Expression;
    export function skipOuterExpressions(node: Node, kinds?: OuterExpressionKinds): Node;
    export function skipOuterExpressions(node: Node, kinds = OuterExpressionKinds.All) {
        let previousNode: Node;
        do {
            previousNode = node;
            if (kinds & OuterExpressionKinds.Parentheses) {
                node = skipParentheses(node);
            }

            if (kinds & OuterExpressionKinds.Assertions) {
                node = skipAssertions(node);
            }

            if (kinds & OuterExpressionKinds.PartiallyEmittedExpressions) {
                node = skipPartiallyEmittedExpressions(node);
            }
        }
        while (previousNode !== node);

        return node;
    }

    export function skipParentheses(node: Expression): Expression;
    export function skipParentheses(node: Node): Node;
    export function skipParentheses(node: Node): Node {
        while (node.kind === SyntaxKind.ParenthesizedExpression) {
            node = (<ParenthesizedExpression>node).expression;
        }

        return node;
    }

    export function skipAssertions(node: Expression): Expression;
    export function skipAssertions(node: Node): Node;
    export function skipAssertions(node: Node): Node {
        while (isAssertionExpression(node)) {
            node = (<AssertionExpression>node).expression;
        }

        return node;
    }

    export function skipPartiallyEmittedExpressions(node: Expression): Expression;
    export function skipPartiallyEmittedExpressions(node: Node): Node;
    export function skipPartiallyEmittedExpressions(node: Node) {
        while (node.kind === SyntaxKind.PartiallyEmittedExpression) {
            node = (<PartiallyEmittedExpression>node).expression;
        }

        return node;
    }

    export function startOnNewLine<T extends Node>(node: T): T {
        node.startsOnNewLine = true;
        return node;
    }

    export function setOriginalNode<T extends Node>(node: T, original: Node): T {
        node.original = original;
        return node;
    }

    export function setTextRange<T extends TextRange>(node: T, location: TextRange): T {
        if (location) {
            node.pos = location.pos;
            node.end = location.end;
        }
        return node;
    }

    export function setNodeFlags<T extends Node>(node: T, flags: NodeFlags): T {
        node.flags = flags;
        return node;
    }

    export function setMultiLine<T extends ObjectLiteralExpression | ArrayLiteralExpression | Block>(node: T, multiLine: boolean): T {
        node.multiLine = multiLine;
        return node;
    }

    export function setHasTrailingComma<T extends Node>(nodes: NodeArray<T>, hasTrailingComma: boolean): NodeArray<T> {
        nodes.hasTrailingComma = hasTrailingComma;
        return nodes;
    }

    /**
     * Get the name of that target module from an import or export declaration
     */
    export function getLocalNameForExternalImport(node: ImportDeclaration | ExportDeclaration | ImportEqualsDeclaration, sourceFile: SourceFile): Identifier {
        const namespaceDeclaration = getNamespaceDeclarationNode(node);
        if (namespaceDeclaration && !isDefaultImport(node)) {
            return createIdentifier(getSourceTextOfNodeFromSourceFile(sourceFile, namespaceDeclaration.name));
        }
        if (node.kind === SyntaxKind.ImportDeclaration && (<ImportDeclaration>node).importClause) {
            return getGeneratedNameForNode(node);
        }
        if (node.kind === SyntaxKind.ExportDeclaration && (<ExportDeclaration>node).moduleSpecifier) {
            return getGeneratedNameForNode(node);
        }
        return undefined;
    }

   /**
     * Get the name of a target module from an import/export declaration as should be written in the emitted output.
     * The emitted output name can be different from the input if:
     *  1. The module has a /// <amd-module name="<new name>" />
     *  2. --out or --outFile is used, making the name relative to the rootDir
     *  3- The containing SourceFile has an entry in renamedDependencies for the import as requested by some module loaders (e.g. System).
     * Otherwise, a new StringLiteral node representing the module name will be returned.
     */
    export function getExternalModuleNameLiteral(importNode: ImportDeclaration | ExportDeclaration | ImportEqualsDeclaration, sourceFile: SourceFile, host: EmitHost, resolver: EmitResolver, compilerOptions: CompilerOptions) {
        const moduleName = getExternalModuleName(importNode);
        if (moduleName.kind === SyntaxKind.StringLiteral) {
            return tryGetModuleNameFromDeclaration(importNode, host, resolver, compilerOptions)
                || tryRenameExternalModule(<StringLiteral>moduleName, sourceFile)
                || getSynthesizedClone(<StringLiteral>moduleName);
        }

        return undefined;
    }

    /**
     * Some bundlers (SystemJS builder) sometimes want to rename dependencies.
     * Here we check if alternative name was provided for a given moduleName and return it if possible.
     */
    function tryRenameExternalModule(moduleName: LiteralExpression, sourceFile: SourceFile) {
        if (sourceFile.renamedDependencies && hasProperty(sourceFile.renamedDependencies, moduleName.text)) {
            return createLiteral(sourceFile.renamedDependencies[moduleName.text]);
        }
        return undefined;
    }

    /**
     * Get the name of a module as should be written in the emitted output.
     * The emitted output name can be different from the input if:
     *  1. The module has a /// <amd-module name="<new name>" />
     *  2. --out or --outFile is used, making the name relative to the rootDir
     * Otherwise, a new StringLiteral node representing the module name will be returned.
     */
    export function tryGetModuleNameFromFile(file: SourceFile, host: EmitHost, options: CompilerOptions): StringLiteral {
        if (!file) {
            return undefined;
        }
        if (file.moduleName) {
            return createLiteral(file.moduleName);
        }
        if (!isDeclarationFile(file) && (options.out || options.outFile)) {
            return createLiteral(getExternalModuleNameFromPath(host, file.fileName));
        }
        return undefined;
    }

    function tryGetModuleNameFromDeclaration(declaration: ImportEqualsDeclaration | ImportDeclaration | ExportDeclaration, host: EmitHost, resolver: EmitResolver, compilerOptions: CompilerOptions) {
        return tryGetModuleNameFromFile(resolver.getExternalModuleFileFromDeclaration(declaration), host, compilerOptions);
    }
}