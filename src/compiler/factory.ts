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

        array.arrayKind = ArrayKind.NodeArray;
        return array;
    }

    export function createModifiersArray(elements?: Modifier[], location?: TextRange): ModifiersArray {
        let flags: NodeFlags;
        if (elements) {
            if (isModifiersArray(elements)) {
                return elements;
            }

            flags = 0;
            for (const modifier of elements) {
                flags |= modifierToFlag(modifier.kind);
            }
        }
        else {
            elements = [];
            flags = 0;
        }

        const array = <ModifiersArray>elements;
        if (location) {
            array.pos = location.pos;
            array.end = location.end;
        }
        else {
            array.pos = -1;
            array.end = -1;
        }

        array.arrayKind = ArrayKind.ModifiersArray;
        array.flags = flags;
        return array;
    }

    export function setModifiers<T extends Node>(node: T, modifiers: Modifier[]) {
        if (modifiers) {
            const array = createModifiersArray(modifiers);
            node.modifiers = array;
            node.flags |= array.flags;
        }
        else {
            node.modifiers = undefined;
        }

        return node;
    }

    export function createSynthesizedNode(kind: SyntaxKind, startsOnNewLine?: boolean): Node {
        const node = createNode(kind, /*location*/ undefined);
        node.startsOnNewLine = startsOnNewLine;
        return node;
    }

    export function createSynthesizedNodeArray<T extends Node>(elements?: T[]): NodeArray<T> {
        return createNodeArray(elements, /*location*/ undefined);
    }

    export function createSynthesizedModifiersArray(elements?: Modifier[]): ModifiersArray {
        return createModifiersArray(elements, /*location*/ undefined);
    }

    /**
     * Creates a shallow, memberwise clone of a node. The "kind", "pos", "end", "flags", and "parent"
     * properties are excluded by default, and can be provided via the "location", "flags", and
     * "parent" parameters.
     *
     * @param node The node to clone.
     * @param location An optional TextRange to use to supply the new position.
     * @param flags The NodeFlags to use for the cloned node.
     * @param parent The parent for the new node.
     * @param original An optional pointer to the original source tree node.
     */
    export function cloneNode<T extends Node>(node: T, location?: TextRange, flags?: NodeFlags, parent?: Node, original?: Node): T {
        // We don't use "clone" from core.ts here, as we need to preserve the prototype chain of
        // the original node. We also need to exclude specific properties and only include own-
        // properties (to skip members already defined on the shared prototype).
        const clone = <T>createNode(node.kind, location);

        for (const key in node) {
            if (clone.hasOwnProperty(key) || !node.hasOwnProperty(key)) {
                continue;
            }

            (<any>clone)[key] = (<any>node)[key];
        }

        if (flags !== undefined) {
            clone.flags = flags;
        }

        if (parent !== undefined) {
            clone.parent = parent;
        }

        if (original !== undefined) {
            clone.original = original;
        }

        return clone;
    }

    /**
     * Creates a shallow, memberwise clone of a node for mutation.
     */
    export function getMutableNode<T extends Node>(node: T): T {
        return cloneNode<T>(node, node, node.flags, node.parent, node);
    }

    export function createNodeArrayNode<T extends Node>(elements: T[]): NodeArrayNode<T> {
        const node = <NodeArrayNode<T>>createSynthesizedNode(SyntaxKind.NodeArrayNode);
        node.nodes = createNodeArray(elements);
        return node;
    }

    // Literals

    export function createLiteral(value: string, location?: TextRange): StringLiteral;
    export function createLiteral(value: number, location?: TextRange): LiteralExpression;
    export function createLiteral(value: string | number | boolean, location?: TextRange): PrimaryExpression;
    export function createLiteral(value: string | number | boolean, location?: TextRange): PrimaryExpression {
        if (typeof value === "number") {
            const node = <LiteralExpression>createNode(SyntaxKind.NumericLiteral, location);
            node.text = value.toString();
            return node;
        }
        else if (typeof value === "boolean") {
            return <PrimaryExpression>createNode(value ? SyntaxKind.TrueKeyword : SyntaxKind.FalseKeyword, location);
        }
        else {
            const node = <StringLiteral>createNode(SyntaxKind.StringLiteral, location);
            node.text = String(value);
            return node;
        }
    }

    // Identifiers

    export function createIdentifier(text: string): Identifier {
        const node = <Identifier>createNode(SyntaxKind.Identifier);
        node.text = text;
        return node;
    }

    export function createTempVariable(): Identifier {
        const name = <Identifier>createNode(SyntaxKind.Identifier);
        name.text = undefined;
        name.tempKind = TempVariableKind.Auto;
        getNodeId(name);
        return name;
    }

    export function createLoopVariable(): Identifier {
        const name = <Identifier>createNode(SyntaxKind.Identifier);
        name.text = undefined;
        name.tempKind = TempVariableKind.Loop;
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
        setModifiers(node, modifiers);
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
        setModifiers(node, modifiers);
        node.name = typeof name === "string" ? createIdentifier(name) : name;
        node.typeParameters = undefined;
        node.parameters = createNodeArray<ParameterDeclaration>();
        node.body = body;
        return node;
    }

    export function createSetAccessor(modifiers: Modifier[], name: string | PropertyName, parameter: ParameterDeclaration, body: Block, location?: TextRange) {
        const node = <SetAccessorDeclaration>createNode(SyntaxKind.SetAccessor, location);
        node.decorators = undefined;
        setModifiers(node, modifiers);
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

    export function createArrayLiteral(elements?: Expression[]) {
        const node = <ArrayLiteralExpression>createNode(SyntaxKind.ArrayLiteralExpression);
        node.elements = parenthesizeListElements(createNodeArray(elements));
        return node;
    }

    export function createObjectLiteral(properties?: ObjectLiteralElement[], location?: TextRange) {
        const node = <ObjectLiteralExpression>createNode(SyntaxKind.ObjectLiteralExpression, location);
        node.properties = createNodeArray(properties);
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
        node.expression = parenthesizeForAccess(expression);
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

    export function createFunctionExpression(asteriskToken: Node, name: string | Identifier, parameters: ParameterDeclaration[], body: Block, location?: TextRange) {
        const node = <FunctionExpression>createNode(SyntaxKind.FunctionExpression, location);
        node.modifiers = undefined;
        node.asteriskToken = asteriskToken;
        node.name = typeof name === "string" ? createIdentifier(name) : name;
        node.typeParameters = undefined;
        node.parameters = createNodeArray(parameters);
        node.type = undefined;
        node.body = body;
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
        node.left = parenthesizeBinaryOperand(operator, left, /*isLeftSideOfBinary*/ true);
        node.operatorToken = createSynthesizedNode(operator);
        node.right = parenthesizeBinaryOperand(operator, right, /*isLeftSideOfBinary*/ false);
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

    export function createExpressionWithTypeArguments(expression: Expression, location?: TextRange) {
        const node = <ExpressionWithTypeArguments>createNode(SyntaxKind.ExpressionWithTypeArguments, location);
        node.typeArguments = undefined;
        node.expression = parenthesizeForAccess(expression);
        return node;
    }

    // Element

    export function createBlock(statements: Statement[], location?: TextRange): Block {
        const block = <Block>createNode(SyntaxKind.Block, location);
        block.statements = createNodeArray(statements);
        return block;
    }

    export function createVariableStatement(modifiers: Modifier[], declarationList: VariableDeclarationList, location?: TextRange): VariableStatement {
        const node = <VariableStatement>createNode(SyntaxKind.VariableStatement, location);
        node.decorators = undefined;
        setModifiers(node, modifiers);
        node.declarationList = declarationList;
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

    export function createIf(expression: Expression, thenStatement: Statement, elseStatement?: Statement, location?: TextRange) {
        const node = <IfStatement>createNode(SyntaxKind.IfStatement, location);
        node.expression = expression;
        node.thenStatement = thenStatement;
        node.elseStatement = elseStatement;
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

    export function createFunctionDeclaration(modifiers: Modifier[], asteriskToken: Node, name: string | Identifier, parameters: ParameterDeclaration[], body: Block, location?: TextRange) {
        const node = <FunctionDeclaration>createNode(SyntaxKind.FunctionDeclaration, location);
        node.decorators = undefined;
        setModifiers(node, modifiers);
        node.asteriskToken = asteriskToken;
        node.name = typeof name === "string" ? createIdentifier(name) : name;
        node.typeParameters = undefined;
        node.parameters = createNodeArray(parameters);
        node.type = undefined;
        node.body = body;
        return node;
    }

    export function createClassDeclaration(modifiers: Modifier[], name: Identifier, heritageClauses: HeritageClause[], members: ClassElement[], location?: TextRange) {
        const node = <ClassDeclaration>createNode(SyntaxKind.ClassDeclaration, location);
        node.decorators = undefined;
        setModifiers(node, modifiers);
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

    export function createMemberAccessForPropertyName(target: Expression, memberName: PropertyName, location?: TextRange): MemberExpression {
        return isIdentifier(memberName)
            ? createPropertyAccess(target, cloneNode(memberName), location)
            : createElementAccess(target, cloneNode(isComputedPropertyName(memberName) ? memberName.expression : memberName), location);
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

    export function createJsxSpread(reactNamespace: string, segments: Expression[]) {
        return createCall(
            createPropertyAccess(
                createIdentifier(reactNamespace || "React"),
                "__spread"
            ),
            segments
        );
    }

    export function createJsxCreateElement(reactNamespace: string, tagName: Expression, props: Expression, children: Expression[]): LeftHandSideExpression {
        const argumentsList = [tagName];
        if (props) {
            argumentsList.push(props);
        }

        if (children && children.length > 0) {
            if (!props) {
                argumentsList.push(createNull());
            }

            addRange(argumentsList, children);
        }

        return createCall(
            createPropertyAccess(
                createIdentifier(reactNamespace || "React"),
                "createElement"
            ),
            argumentsList
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

    export function createMetadataHelper(metadataKey: string, metadataValue: Expression, defer?: boolean) {
        return createCall(
            createIdentifier("__metadata"),
            [
                createLiteral(metadataKey),
                defer
                    ? createArrowFunction([], metadataValue)
                    : metadataValue
            ]
        );
    }

    export function createDecorateHelper(decoratorExpressions: Expression[], target: Expression, memberName?: Expression, descriptor?: Expression) {
        const argumentsArray: Expression[] = [];
        argumentsArray.push(createArrayLiteral(decoratorExpressions));
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

    function createPropertyDescriptor({ get, set, value, enumerable, configurable, writable }: PropertyDescriptorOptions, preferNewLine?: boolean, location?: TextRange) {
        const properties: ObjectLiteralElement[] = [];
        addPropertyAssignment(properties, "get", get, preferNewLine);
        addPropertyAssignment(properties, "set", set, preferNewLine);
        addPropertyAssignment(properties, "value", value, preferNewLine);
        addPropertyAssignment(properties, "enumerable", enumerable, preferNewLine);
        addPropertyAssignment(properties, "configurable", configurable, preferNewLine);
        addPropertyAssignment(properties, "writable", writable, preferNewLine);
        return createObjectLiteral(properties, location);
    }

    function addPropertyAssignment(properties: ObjectLiteralElement[], name: string, value: boolean | Expression, preferNewLine: boolean) {
        if (value !== undefined) {
            const property = createPropertyAssignment(
                name,
                typeof value === "boolean" ? createLiteral(value) : value
            );

            if (preferNewLine) {
                startOnNewLine(property);
            }

            properties.push(property);
        }
    }

    export interface PropertyDescriptorOptions {
        get?: Expression;
        set?: Expression;
        value?: Expression;
        enumerable?: boolean | Expression;
        configurable?: boolean | Expression;
        writable?: boolean | Expression;
    }

    export function createObjectDefineProperty(target: Expression, memberName: Expression, descriptor: PropertyDescriptorOptions, preferNewLine?: boolean, location?: TextRange) {
        return createCall(
            createPropertyAccess(
                createIdentifier("Object"),
                "defineProperty"
            ),
            [
                target,
                memberName,
                createPropertyDescriptor(descriptor, preferNewLine)
            ],
            location
        );
    }

    export function createHasOwnProperty(target: LeftHandSideExpression, propertyName: Expression) {
        return createCall(
            createPropertyAccess(target, "hasOwnProperty"),
            [propertyName]
        );
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

    export function inlineExpressions(expressions: Expression[]) {
        return reduceLeft(expressions, createComma);
    }

    export function createExpressionFromEntityName(node: EntityName | Expression): Expression {
        return isQualifiedName(node)
            ? createPropertyAccess(
                createExpressionFromEntityName(node.left),
                cloneNode(node.right)
            )
            : cloneNode(node);
    }

    export function createExpressionForPropertyName(memberName: PropertyName, location?: TextRange): Expression {
        return isIdentifier(memberName) ? createLiteral(memberName.text, location)
             : isComputedPropertyName(memberName) ? cloneNode(memberName.expression, location)
             : cloneNode(memberName, location);
    }

    // Utilities

    /**
     * Wraps the operand to a BinaryExpression in parentheses if they are needed to preserve the intended
     * order of operations.
     *
     * @param binaryOperator The operator for the BinaryExpression.
     * @param operand The operand for the BinaryExpression.
     * @param isLeftSideOfBinary A value indicating whether the operand is the left side of the
     *                           BinaryExpression.
     */
    export function parenthesizeBinaryOperand(binaryOperator: SyntaxKind, operand: Expression, isLeftSideOfBinary: boolean) {
        // If the resulting expression is already parenthesized, we do not need to do any further processing.
        if (operand.kind === SyntaxKind.ParenthesizedExpression) {
            return operand;
        }

        return binaryOperandNeedsParentheses(binaryOperator, operand, isLeftSideOfBinary)
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
    function binaryOperandNeedsParentheses(binaryOperator: SyntaxKind, operand: Expression, isLeftSideOfBinary: boolean) {
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
        const operandPrecedence = getExpressionPrecedence(operand);
        switch (compareValues(operandPrecedence, binaryOperatorPrecedence)) {
            case Comparison.LessThan:
                return true;

            case Comparison.GreaterThan:
                return false;

            case Comparison.EqualTo:
                if (isLeftSideOfBinary) {
                    // No need to parenthesize the left operand when the binary operator is
                    // left associative:
                    //  (a*b)/x    ->  a*b/x
                    //  (a**b)/x   ->  a**b/x

                    // Parentheses are needed for the left operand when the binary operator is
                    // right associative:
                    //  (a/b)**x   ->  (a/b)**x
                    //  (a**b)**x  ->  (a**b)**x
                    const binaryOperatorAssociativity = getOperatorAssociativity(SyntaxKind.BinaryExpression, binaryOperator);
                    return binaryOperatorAssociativity === Associativity.Right;
                }
                else {
                    // No need to parenthesize the right operand when the binary operator and
                    // operand are the same and one of the following:
                    //  x*(a*b)     => x*a*b
                    //  x|(a|b)     => x|a|b
                    //  x&(a&b)     => x&a&b
                    //  x^(a^b)     => x^a^b
                    if (isBinaryExpression(operand)
                        && operand.operatorToken.kind === binaryOperator
                        && isMathAssociativeOperator(binaryOperator)) {
                        return false;
                    }

                    // No need to parenthesize the right operand when the operand is right
                    // associative:
                    //  x/(a**b)    -> x/a**b
                    //  x**(a**b)   -> x**a**b

                    // Parentheses are needed for the right operand when the operand is left
                    // associative:
                    //  x/(a*b)     -> x/(a*b)
                    //  x**(a/b)    -> x**(a/b)
                    const operandAssociativity = getExpressionAssociativity(operand);
                    return operandAssociativity === Associativity.Left;
                }
        }
    }

    /**
     * Determines whether a binary operator is mathematically associative.
     *
     * @param binaryOperator The binary operator.
     */
    function isMathAssociativeOperator(binaryOperator: SyntaxKind) {
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
        if (isLeftHandSideExpression(expression) &&
            expression.kind !== SyntaxKind.NewExpression &&
            expression.kind !== SyntaxKind.NumericLiteral) {
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
        const expressionPrecedence = getExpressionPrecedence(expression);
        const commaPrecedence = getOperatorPrecedence(SyntaxKind.BinaryExpression, SyntaxKind.CommaToken);
        return expressionPrecedence > commaPrecedence
            ? expression
            : createParen(expression, /*location*/ expression);
    }

    export function parenthesizeExpressionForExpressionStatement(expression: Expression) {
        if (isCallExpression(expression)) {
            const callee = expression.expression;
            if (callee.kind === SyntaxKind.FunctionExpression
                || callee.kind === SyntaxKind.ArrowFunction) {
                const clone = cloneNode(expression, expression, expression.flags, expression.parent, expression);
                clone.expression = createParen(callee, /*location*/ callee);
                return clone;
            }
        }
        else if (getLeftmostExpression(expression).kind === SyntaxKind.ObjectLiteralExpression) {
            return createParen(expression, /*location*/ expression);
        }

        return expression;
    }

    export function parenthesizeConciseBody(body: ConciseBody): ConciseBody {
        if (body.kind === SyntaxKind.ObjectLiteralExpression) {
            return createParen(<Expression>body, /*location*/ body);
        }

        return body;
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
            }

            return node;
        }
    }

    export function skipParentheses(node: Expression): Expression {
        while (node.kind === SyntaxKind.ParenthesizedExpression
            || node.kind === SyntaxKind.TypeAssertionExpression
            || node.kind === SyntaxKind.AsExpression) {
            node = (<ParenthesizedExpression | AssertionExpression>node).expression;
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

    export function getSynthesizedNode<T extends Node>(node: T): T {
        return nodeIsSynthesized(node) ? node : cloneNode(node, /*location*/ undefined, node.flags, /*parent*/ undefined, /*original*/ node);
    }
}