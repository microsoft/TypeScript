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

    export function createNodeArray<T extends Node>(elements?: T[], location?: TextRange): NodeArray<T> {
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

    function setModifiers(node: Node, modifiers: Modifier[]) {
        if (modifiers) {
            node.modifiers = createSynthesizedModifiersArray(modifiers);
            node.flags |= node.modifiers.flags;
        }
        else {
            node.modifiers = undefined;
        }
    }

    export function createSynthesizedNode(kind: SyntaxKind, startsOnNewLine?: boolean): Node {
        const node = <SynthesizedNode>createNode(kind, /*location*/ undefined);
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

    export function createNodeArrayNode<T extends Node>(elements: T[]): NodeArrayNode<T> {
        const node = <NodeArrayNode<T>>createSynthesizedNode(SyntaxKind.NodeArrayNode);
        node.nodes = createNodeArray(elements);
        return node;
    }

    // Literals

    export function createLiteral(value: string): StringLiteral;
    export function createLiteral(value: number): LiteralExpression;
    export function createLiteral(value: string | number | boolean): PrimaryExpression;
    export function createLiteral<T extends PrimaryExpression>(value: string | number | boolean): T {
        if (typeof value === "number") {
            const node = <T & LiteralExpression>createNode(SyntaxKind.NumericLiteral);
            node.text = value.toString();
            return node;
        }
        else if (typeof value === "boolean") {
            return <T>createNode(value ? SyntaxKind.TrueKeyword : SyntaxKind.FalseKeyword);
        }
        else {
            const node = <T & StringLiteral>createNode(SyntaxKind.StringLiteral);
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

    export function createThis() {
        const node = <PrimaryExpression>createNode(SyntaxKind.ThisKeyword);
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
        node.name = coercePropertyName(name);
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
        node.parameters = createSynthesizedNodeArray(parameters);
        node.type = undefined;
        node.body = body;
        return node;
    }

    export function createGetAccessor(modifiers: Modifier[], name: string | PropertyName, body: Block, location?: TextRange) {
        const node = <GetAccessorDeclaration>createNode(SyntaxKind.GetAccessor, location);
        node.decorators = undefined;
        setModifiers(node, modifiers);
        node.name = coercePropertyName(name);
        node.typeParameters = undefined;
        node.parameters = createNodeArray<ParameterDeclaration>();
        node.body = body;
        return node;
    }

    export function createSetAccessor(modifiers: Modifier[], name: string | PropertyName, parameter: ParameterDeclaration, body: Block, location?: TextRange) {
        const node = <SetAccessorDeclaration>createNode(SyntaxKind.SetAccessor, location);
        node.decorators = undefined;
        setModifiers(node, modifiers);
        node.name = coercePropertyName(name);
        node.typeParameters = undefined;
        node.parameters = createNodeArray([parameter]);
        node.body = body;
        return node;
    }

    export function createParameter(name: string | Identifier | BindingPattern, initializer?: Expression) {
        const node = <ParameterDeclaration>createNode(SyntaxKind.Parameter);
        node.decorators = undefined;
        node.modifiers = undefined;
        node.dotDotDotToken = undefined;
        node.name = coerceBindingName(name);
        node.questionToken = undefined;
        node.type = undefined;
        node.initializer = initializer;
        return node;
    }


    // Expression

    export function createArrayLiteral(elements?: Expression[]) {
        const node = <ArrayLiteralExpression>createNode(SyntaxKind.ArrayLiteralExpression);
        node.elements = createNodeArray(elements);
        return node;
    }

    export function createObjectLiteral(properties?: ObjectLiteralElement[]) {
        const node = <ObjectLiteralExpression>createNode(SyntaxKind.ObjectLiteralExpression);
        node.properties = createNodeArray(properties);
        return node;
    }

    export function createPropertyAccess(expression: Expression, name: string | Identifier, location?: TextRange) {
        const node = <PropertyAccessExpression>createNode(SyntaxKind.PropertyAccessExpression, location);
        node.expression = parenthesizeForAccess(expression);
        node.dotToken = createSynthesizedNode(SyntaxKind.DotToken);
        node.name = coerceIdentifier(name);
        return node;
    }

    export function createElementAccess(expression: Expression, index: string | number | Expression, location?: TextRange) {
        const node = <ElementAccessExpression>createNode(SyntaxKind.ElementAccessExpression, location);
        node.expression = parenthesizeForAccess(expression);
        node.argumentExpression = coerceExpression(index);
        return node;
    }

    export function createCall(expression: Expression, argumentsArray: Expression[], location?: TextRange) {
        const node = <CallExpression>createNode(SyntaxKind.CallExpression, location);
        node.expression = parenthesizeForAccess(expression);
        node.arguments = createNodeArray(argumentsArray);
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
        node.name = coerceIdentifier(name);
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
        node.body = body;
        return node;
    }

    export function createTypeOf(expression: Expression) {
        const node = <TypeOfExpression>createNode(SyntaxKind.TypeOfExpression);
        node.expression = parenthesizeForUnary(expression);
        return node;
    }

    export function createVoid(expression: Expression) {
        const node = <VoidExpression>createNode(SyntaxKind.VoidExpression);
        node.expression = parenthesizeForUnary(expression);
        return node;
    }

    export function createBinary(left: Expression, operator: SyntaxKind, right: Expression, location?: TextRange) {
        const node = <BinaryExpression>createNode(SyntaxKind.BinaryExpression, location);
        node.left = parenthesizeForBinary(left, operator, BinaryOperand.Left);
        node.operatorToken = createSynthesizedNode(operator);
        node.right = parenthesizeForBinary(right, operator, BinaryOperand.Right);
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
        node.expression = expression;
        return node;
    }

    export function createClassExpression(name: Identifier, heritageClauses: HeritageClause[], members: ClassElement[], location?: TextRange) {
        const node = <ClassExpression>createNode(SyntaxKind.ClassExpression, location);
        node.decorators = undefined;
        node.modifiers = undefined;
        node.name = name;
        node.typeParameters = undefined;
        node.heritageClauses = createSynthesizedNodeArray(heritageClauses);
        node.members = createSynthesizedNodeArray(members);
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
        node.name = coerceBindingName(name);
        node.initializer = initializer;
        return node;
    }

    export function createStatement(expression: Expression, location?: TextRange): ExpressionStatement {
        const node = <ExpressionStatement>createNode(SyntaxKind.ExpressionStatement, location);
        node.expression = expression;
        return node;
    }

    export function createReturn(expression?: Expression): ReturnStatement {
        const node = <ReturnStatement>createSynthesizedNode(SyntaxKind.ReturnStatement);
        node.expression = expression;
        return node;
    }

    export function createFunctionDeclaration(modifiers: Modifier[], asteriskToken: Node, name: string | Identifier, parameters: ParameterDeclaration[], body: Block, location?: TextRange) {
        const node = <FunctionDeclaration>createNode(SyntaxKind.FunctionDeclaration, location);
        node.decorators = undefined;
        setModifiers(node, modifiers);
        node.asteriskToken = asteriskToken;
        node.name = coerceIdentifier(name);
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
        node.heritageClauses = createSynthesizedNodeArray(heritageClauses);
        node.members = createSynthesizedNodeArray(members);
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
        node.name = coerceIdentifier(name);
        node.propertyName = coerceIdentifier(propertyName);
        return node;
    }

    // Clauses

    export function createHeritageClause(token: SyntaxKind, types: ExpressionWithTypeArguments[], location?: TextRange) {
        const node = <HeritageClause>createNode(SyntaxKind.HeritageClause, location);
        node.token = token;
        node.types = createSynthesizedNodeArray(types);
        return node;
    }

    // Compound nodes

    export function createAssignment(left: Expression, right: Expression, location?: TextRange) {
        return createBinary(left, SyntaxKind.EqualsToken, right, location);
    }

    export function createLogicalAnd(left: Expression, right: Expression) {
        return createBinary(left, SyntaxKind.AmpersandAmpersandToken, right);
    }

    export function createLogicalOr(left: Expression, right: Expression) {
        return createBinary(left, SyntaxKind.BarBarToken, right);
    }

    export function createStrictEquality(left: Expression, right: Expression) {
        return createBinary(left, SyntaxKind.EqualsEqualsEqualsToken, right);
    }

    export function createStrictInequality(left: Expression, right: Expression) {
        return createBinary(left, SyntaxKind.ExclamationEqualsEqualsToken, right);
    }

    export function createComma(left: Expression, right: Expression) {
        return <Expression>createBinary(left, SyntaxKind.CommaToken, right);
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

    export function createArraySlice(array: Expression, start?: number | Expression) {
        const argumentsList: Expression[] = start !== undefined ? [coerceExpression(start)] : [];
        return createCall(createPropertyAccess(array, "slice"), argumentsList);
    }

    export function createMathPow(left: Expression, right: Expression, location?: TextRange) {
        return createCall(
            createPropertyAccess(createIdentifier("Math"), "pow"),
            [left, right],
            location
        );
    }

    // Helpers

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
        )
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


    // Utilities

    function coerceIdentifier(value: string | Identifier) {
        if (typeof value === "string") {
            return createIdentifier(value);
        }
        else {
            return value;
        }
    }

    function coerceBindingName(value: string | BindingName) {
        if (typeof value === "string") {
            return createIdentifier(value);
        }
        else {
            return value;
        }
    }

    function coercePropertyName(value: string | PropertyName) {
        if (typeof value === "string") {
            return createIdentifier(value);
        }
        else {
            return value;
        }
    }

    function coerceExpression(value: string | number | boolean | Expression): Expression {
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            return createLiteral(value);
        }
        else {
            return value;
        }
    }

    const enum BinaryOperand {
        Left,
        Right
    }

    function parenthesizeForBinary(operand: Expression, operator: SyntaxKind, side: BinaryOperand) {
        // When diagnosing whether the expression needs parentheses, the decision should be based
        // on the innermost expression in a chain of nested type assertions.
        while (operand.kind === SyntaxKind.TypeAssertionExpression || operand.kind === SyntaxKind.AsExpression) {
            operand = (<AssertionExpression>operand).expression;
        }

        // If the resulting expression is already parenthesized, we do not need to do any further processing.
        if (operand.kind === SyntaxKind.ParenthesizedExpression) {
            return operand;
        }

        return needsParenthesesForBinary(operand, operator, side)
            ? createParen(operand)
            : operand;
    }

    function needsParenthesesForBinary(operand: Expression, operator: SyntaxKind, side: BinaryOperand) {
        const operandPrecedence = getExpressionPrecedence(operand);
        const operatorPrecedence = getOperatorPrecedence(SyntaxKind.BinaryExpression, operator);
        switch (compareValues(operandPrecedence, operatorPrecedence)) {
            case Comparison.LessThan:
                return true;
            case Comparison.EqualTo:
                return isRightAssociativeOperandOnLeftHandSide(operand, side)
                    || isModuloOperandOnRightHandSide(operand, operator, side);
            case Comparison.GreaterThan:
                return false;
        }
    }

    function isRightAssociativeOperandOnLeftHandSide(operand: Expression, side: BinaryOperand) {
        return side === BinaryOperand.Left
            && getExpressionAssociativity(operand) === Associativity.Right;
    }

    function isModuloOperandOnRightHandSide(operand: Expression, operator: SyntaxKind, side: BinaryOperand) {
        return side === BinaryOperand.Right
            && operator !== SyntaxKind.PercentToken
            && operand.kind === SyntaxKind.BinaryExpression
            && (<BinaryExpression>operand).operatorToken.kind === SyntaxKind.PercentToken;
    }

    function parenthesizeForAccess(expr: Expression): LeftHandSideExpression {
        // When diagnosing whether the expression needs parentheses, the decision should be based
        // on the innermost expression in a chain of nested type assertions.
        while (expr.kind === SyntaxKind.TypeAssertionExpression || expr.kind === SyntaxKind.AsExpression) {
            expr = (<AssertionExpression>expr).expression;
        }

        // isLeftHandSideExpression is almost the correct criterion for when it is not necessary
        // to parenthesize the expression before a dot. The known exceptions are:
        //
        //    NewExpression:
        //       new C.x        -> not the same as (new C).x
        //    NumberLiteral
        //       1.x            -> not the same as (1).x
        //
        if (isLeftHandSideExpression(expr) &&
            expr.kind !== SyntaxKind.NewExpression &&
            expr.kind !== SyntaxKind.NumericLiteral) {

            return <LeftHandSideExpression>expr;
        }

        return createParen(expr);
    }

    function parenthesizeForUnary(operand: Expression) {
        if (isUnaryExpression(operand)) {
            return operand;
        }

        return createParen(operand);
    }


    export function startOnNewLine<T extends Node>(node: T): T {
        (<SynthesizedNode>node).startsOnNewLine = true;
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

    export function getSynthesizedNode<T extends Node>(node: T): T {
        return nodeIsSynthesized(node) ? node : cloneNode(node, /*location*/ undefined, node.flags, /*parent*/ undefined, /*original*/ node);
    }
}