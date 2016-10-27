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

        node.flags = flags | NodeFlags.Synthesized;

        return node;
    }

    export function updateNode<T extends Node>(updated: T, original: T): T {
        if (updated !== original) {
            setOriginalNode(updated, original);
            if (original.startsOnNewLine) {
                updated.startsOnNewLine = true;
            }
            aggregateTransformFlags(updated);
        }
        return updated;
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
        const clone = <T>createNode(node.kind, /*location*/ undefined, node.flags);
        setOriginalNode(clone, node);

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

    // Literals

    export function createLiteral(textSource: StringLiteral | Identifier, location?: TextRange): StringLiteral;
    export function createLiteral(value: string, location?: TextRange): StringLiteral;
    export function createLiteral(value: number, location?: TextRange): NumericLiteral;
    export function createLiteral(value: boolean, location?: TextRange): BooleanLiteral;
    export function createLiteral(value: string | number | boolean, location?: TextRange): PrimaryExpression;
    export function createLiteral(value: string | number | boolean | StringLiteral | Identifier, location?: TextRange): PrimaryExpression {
        if (typeof value === "number") {
            const node = <NumericLiteral>createNode(SyntaxKind.NumericLiteral, location, /*flags*/ undefined);
            node.text = value.toString();
            return node;
        }
        else if (typeof value === "boolean") {
            return <BooleanLiteral>createNode(value ? SyntaxKind.TrueKeyword : SyntaxKind.FalseKeyword, location, /*flags*/ undefined);
        }
        else if (typeof value === "string") {
            const node = <StringLiteral>createNode(SyntaxKind.StringLiteral, location, /*flags*/ undefined);
            node.text = value;
            return node;
        }
        else if (value) {
            const node = <StringLiteral>createNode(SyntaxKind.StringLiteral, location, /*flags*/ undefined);
            node.textSourceNode = value;
            node.text = value.text;
            return node;
        }
    }

    // Identifiers

    let nextAutoGenerateId = 0;

    export function createIdentifier(text: string, location?: TextRange): Identifier {
        const node = <Identifier>createNode(SyntaxKind.Identifier, location);
        node.text = escapeIdentifier(text);
        node.originalKeywordKind = stringToToken(text);
        node.autoGenerateKind = GeneratedIdentifierKind.None;
        node.autoGenerateId = 0;
        return node;
    }

    export function createTempVariable(recordTempVariable: ((node: Identifier) => void) | undefined, location?: TextRange): Identifier {
        const name = <Identifier>createNode(SyntaxKind.Identifier, location);
        name.text = "";
        name.originalKeywordKind = SyntaxKind.Unknown;
        name.autoGenerateKind = GeneratedIdentifierKind.Auto;
        name.autoGenerateId = nextAutoGenerateId;
        nextAutoGenerateId++;
        if (recordTempVariable) {
            recordTempVariable(name);
        }
        return name;
    }

    export function createLoopVariable(location?: TextRange): Identifier {
        const name = <Identifier>createNode(SyntaxKind.Identifier, location);
        name.text = "";
        name.originalKeywordKind = SyntaxKind.Unknown;
        name.autoGenerateKind = GeneratedIdentifierKind.Loop;
        name.autoGenerateId = nextAutoGenerateId;
        nextAutoGenerateId++;
        return name;
    }

    export function createUniqueName(text: string, location?: TextRange): Identifier {
        const name = <Identifier>createNode(SyntaxKind.Identifier, location);
        name.text = text;
        name.originalKeywordKind = SyntaxKind.Unknown;
        name.autoGenerateKind = GeneratedIdentifierKind.Unique;
        name.autoGenerateId = nextAutoGenerateId;
        nextAutoGenerateId++;
        return name;
    }

    export function getGeneratedNameForNode(node: Node, location?: TextRange): Identifier {
        const name = <Identifier>createNode(SyntaxKind.Identifier, location);
        name.original = node;
        name.text = "";
        name.originalKeywordKind = SyntaxKind.Unknown;
        name.autoGenerateKind = GeneratedIdentifierKind.Node;
        name.autoGenerateId = nextAutoGenerateId;
        nextAutoGenerateId++;
        return name;
    }

    // Punctuation

    export function createToken<TKind extends SyntaxKind>(token: TKind) {
        return <Token<TKind>>createNode(token);
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

    export function updateComputedPropertyName(node: ComputedPropertyName, expression: Expression) {
        if (node.expression !== expression) {
            return updateNode(createComputedPropertyName(expression, node), node);
        }
        return node;
    }

    // Signature elements

    export function createParameter(decorators: Decorator[], modifiers: Modifier[], dotDotDotToken: DotDotDotToken, name: string | Identifier | BindingPattern, questionToken?: QuestionToken, type?: TypeNode, initializer?: Expression, location?: TextRange, flags?: NodeFlags) {
        const node = <ParameterDeclaration>createNode(SyntaxKind.Parameter, location, flags);
        node.decorators = decorators ? createNodeArray(decorators) : undefined;
        node.modifiers = modifiers ? createNodeArray(modifiers) : undefined;
        node.dotDotDotToken = dotDotDotToken;
        node.name = typeof name === "string" ? createIdentifier(name) : name;
        node.questionToken = questionToken;
        node.type = type;
        node.initializer = initializer ? parenthesizeExpressionForList(initializer) : undefined;
        return node;
    }

    export function updateParameter(node: ParameterDeclaration, decorators: Decorator[], modifiers: Modifier[], name: BindingName, type: TypeNode, initializer: Expression) {
        if (node.decorators !== decorators || node.modifiers !== modifiers || node.name !== name || node.type !== type || node.initializer !== initializer) {
            return updateNode(createParameter(decorators, modifiers, node.dotDotDotToken, name, node.questionToken, type, initializer, /*location*/ node, /*flags*/ node.flags), node);
        }

        return node;
    }

    // Type members

    export function createProperty(decorators: Decorator[], modifiers: Modifier[], name: string | PropertyName, questionToken: QuestionToken, type: TypeNode, initializer: Expression, location?: TextRange) {
        const node = <PropertyDeclaration>createNode(SyntaxKind.PropertyDeclaration, location);
        node.decorators = decorators ? createNodeArray(decorators) : undefined;
        node.modifiers = modifiers ? createNodeArray(modifiers) : undefined;
        node.name = typeof name === "string" ? createIdentifier(name) : name;
        node.questionToken = questionToken;
        node.type = type;
        node.initializer = initializer;
        return node;
    }

    export function updateProperty(node: PropertyDeclaration, decorators: Decorator[], modifiers: Modifier[], name: PropertyName, type: TypeNode, initializer: Expression) {
        if (node.decorators !== decorators || node.modifiers !== modifiers || node.name !== name || node.type !== type || node.initializer !== initializer) {
            return updateNode(createProperty(decorators, modifiers, name, node.questionToken, type, initializer, node), node);
        }
        return node;
    }

    export function createMethod(decorators: Decorator[], modifiers: Modifier[], asteriskToken: AsteriskToken, name: string | PropertyName, typeParameters: TypeParameterDeclaration[], parameters: ParameterDeclaration[], type: TypeNode, body: Block, location?: TextRange, flags?: NodeFlags) {
        const node = <MethodDeclaration>createNode(SyntaxKind.MethodDeclaration, location, flags);
        node.decorators = decorators ? createNodeArray(decorators) : undefined;
        node.modifiers = modifiers ? createNodeArray(modifiers) : undefined;
        node.asteriskToken = asteriskToken;
        node.name = typeof name === "string" ? createIdentifier(name) : name;
        node.typeParameters = typeParameters ? createNodeArray(typeParameters) : undefined;
        node.parameters = createNodeArray(parameters);
        node.type = type;
        node.body = body;
        return node;
    }

    export function updateMethod(node: MethodDeclaration, decorators: Decorator[], modifiers: Modifier[], name: PropertyName, typeParameters: TypeParameterDeclaration[], parameters: ParameterDeclaration[], type: TypeNode, body: Block) {
        if (node.decorators !== decorators || node.modifiers !== modifiers || node.name !== name || node.typeParameters !== typeParameters || node.parameters !== parameters || node.type !== type || node.body !== body) {
            return updateNode(createMethod(decorators, modifiers, node.asteriskToken, name, typeParameters, parameters, type, body, /*location*/ node, node.flags), node);
        }
        return node;
    }

    export function createConstructor(decorators: Decorator[], modifiers: Modifier[], parameters: ParameterDeclaration[], body: Block, location?: TextRange, flags?: NodeFlags) {
        const node = <ConstructorDeclaration>createNode(SyntaxKind.Constructor, location, flags);
        node.decorators = decorators ? createNodeArray(decorators) : undefined;
        node.modifiers = modifiers ? createNodeArray(modifiers) : undefined;
        node.typeParameters = undefined;
        node.parameters = createNodeArray(parameters);
        node.type = undefined;
        node.body = body;
        return node;
    }

    export function updateConstructor(node: ConstructorDeclaration, decorators: Decorator[], modifiers: Modifier[], parameters: ParameterDeclaration[], body: Block) {
        if (node.decorators !== decorators || node.modifiers !== modifiers || node.parameters !== parameters || node.body !== body) {
            return updateNode(createConstructor(decorators, modifiers, parameters, body, /*location*/ node, node.flags), node);
        }
        return node;
    }

    export function createGetAccessor(decorators: Decorator[], modifiers: Modifier[], name: string | PropertyName, parameters: ParameterDeclaration[], type: TypeNode, body: Block, location?: TextRange, flags?: NodeFlags) {
        const node = <GetAccessorDeclaration>createNode(SyntaxKind.GetAccessor, location, flags);
        node.decorators = decorators ? createNodeArray(decorators) : undefined;
        node.modifiers = modifiers ? createNodeArray(modifiers) : undefined;
        node.name = typeof name === "string" ? createIdentifier(name) : name;
        node.typeParameters = undefined;
        node.parameters = createNodeArray(parameters);
        node.type = type;
        node.body = body;
        return node;
    }

    export function updateGetAccessor(node: GetAccessorDeclaration, decorators: Decorator[], modifiers: Modifier[], name: PropertyName, parameters: ParameterDeclaration[], type: TypeNode, body: Block) {
        if (node.decorators !== decorators || node.modifiers !== modifiers || node.name !== name || node.parameters !== parameters || node.type !== type || node.body !== body) {
            return updateNode(createGetAccessor(decorators, modifiers, name, parameters, type, body, /*location*/ node, node.flags), node);
        }
        return node;
    }

    export function createSetAccessor(decorators: Decorator[], modifiers: Modifier[], name: string | PropertyName, parameters: ParameterDeclaration[], body: Block, location?: TextRange, flags?: NodeFlags) {
        const node = <SetAccessorDeclaration>createNode(SyntaxKind.SetAccessor, location, flags);
        node.decorators = decorators ? createNodeArray(decorators) : undefined;
        node.modifiers = modifiers ? createNodeArray(modifiers) : undefined;
        node.name = typeof name === "string" ? createIdentifier(name) : name;
        node.typeParameters = undefined;
        node.parameters = createNodeArray(parameters);
        node.body = body;
        return node;
    }

    export function updateSetAccessor(node: SetAccessorDeclaration, decorators: Decorator[], modifiers: Modifier[], name: PropertyName, parameters: ParameterDeclaration[], body: Block) {
        if (node.decorators !== decorators || node.modifiers !== modifiers || node.name !== name || node.parameters !== parameters || node.body !== body) {
            return updateNode(createSetAccessor(decorators, modifiers, name, parameters, body, /*location*/ node, node.flags), node);
        }
        return node;
    }

    // Binding Patterns

    export function createObjectBindingPattern(elements: BindingElement[], location?: TextRange) {
        const node = <ObjectBindingPattern>createNode(SyntaxKind.ObjectBindingPattern, location);
        node.elements = createNodeArray(elements);
        return node;
    }

    export function updateObjectBindingPattern(node: ObjectBindingPattern, elements: BindingElement[]) {
        if (node.elements !== elements) {
            return updateNode(createObjectBindingPattern(elements, node), node);
        }
        return node;
    }

    export function createArrayBindingPattern(elements: ArrayBindingElement[], location?: TextRange) {
        const node = <ArrayBindingPattern>createNode(SyntaxKind.ArrayBindingPattern, location);
        node.elements = createNodeArray(elements);
        return node;
    }

    export function updateArrayBindingPattern(node: ArrayBindingPattern, elements: ArrayBindingElement[]) {
        if (node.elements !== elements) {
            return updateNode(createArrayBindingPattern(elements, node), node);
        }
        return node;
    }

    export function createBindingElement(propertyName: string | PropertyName, dotDotDotToken: DotDotDotToken, name: string | BindingName, initializer?: Expression, location?: TextRange) {
        const node = <BindingElement>createNode(SyntaxKind.BindingElement, location);
        node.propertyName = typeof propertyName === "string" ? createIdentifier(propertyName) : propertyName;
        node.dotDotDotToken = dotDotDotToken;
        node.name = typeof name === "string" ? createIdentifier(name) : name;
        node.initializer = initializer;
        return node;
    }

    export function updateBindingElement(node: BindingElement, propertyName: PropertyName, name: BindingName, initializer: Expression) {
        if (node.propertyName !== propertyName || node.name !== name || node.initializer !== initializer) {
            return updateNode(createBindingElement(propertyName, node.dotDotDotToken, name, initializer, node), node);
        }
        return node;
    }

    // Expression

    export function createArrayLiteral(elements?: Expression[], location?: TextRange, multiLine?: boolean) {
        const node = <ArrayLiteralExpression>createNode(SyntaxKind.ArrayLiteralExpression, location);
        node.elements = parenthesizeListElements(createNodeArray(elements));
        if (multiLine) {
            node.multiLine = true;
        }

        return node;
    }

    export function updateArrayLiteral(node: ArrayLiteralExpression, elements: Expression[]) {
        if (node.elements !== elements) {
            return updateNode(createArrayLiteral(elements, node, node.multiLine), node);
        }
        return node;
    }

    export function createObjectLiteral(properties?: ObjectLiteralElementLike[], location?: TextRange, multiLine?: boolean) {
        const node = <ObjectLiteralExpression>createNode(SyntaxKind.ObjectLiteralExpression, location);
        node.properties = createNodeArray(properties);
        if (multiLine) {
            node.multiLine = true;
        }
        return node;
    }

    export function updateObjectLiteral(node: ObjectLiteralExpression, properties: ObjectLiteralElementLike[]) {
        if (node.properties !== properties) {
            return updateNode(createObjectLiteral(properties, node, node.multiLine), node);
        }
        return node;
    }

    export function createPropertyAccess(expression: Expression, name: string | Identifier, location?: TextRange, flags?: NodeFlags) {
        const node = <PropertyAccessExpression>createNode(SyntaxKind.PropertyAccessExpression, location, flags);
        node.expression = parenthesizeForAccess(expression);
        (node.emitNode || (node.emitNode = {})).flags |= EmitFlags.NoIndentation;
        node.name = typeof name === "string" ? createIdentifier(name) : name;
        return node;
    }

    export function updatePropertyAccess(node: PropertyAccessExpression, expression: Expression, name: Identifier) {
        if (node.expression !== expression || node.name !== name) {
            const propertyAccess = createPropertyAccess(expression, name, /*location*/ node, node.flags);
            // Because we are updating existed propertyAccess we want to inherit its emitFlags instead of using default from createPropertyAccess
            (propertyAccess.emitNode || (propertyAccess.emitNode = {})).flags = getEmitFlags(node);
            return updateNode(propertyAccess, node);
        }
        return node;
    }

    export function createElementAccess(expression: Expression, index: number | Expression, location?: TextRange) {
        const node = <ElementAccessExpression>createNode(SyntaxKind.ElementAccessExpression, location);
        node.expression = parenthesizeForAccess(expression);
        node.argumentExpression = typeof index === "number" ? createLiteral(index) : index;
        return node;
    }

    export function updateElementAccess(node: ElementAccessExpression, expression: Expression, argumentExpression: Expression) {
        if (node.expression !== expression || node.argumentExpression !== argumentExpression) {
            return updateNode(createElementAccess(expression, argumentExpression, node), node);
        }
        return node;
    }

    export function createCall(expression: Expression, typeArguments: TypeNode[], argumentsArray: Expression[], location?: TextRange, flags?: NodeFlags) {
        const node = <CallExpression>createNode(SyntaxKind.CallExpression, location, flags);
        node.expression = parenthesizeForAccess(expression);
        if (typeArguments) {
            node.typeArguments = createNodeArray(typeArguments);
        }

        node.arguments = parenthesizeListElements(createNodeArray(argumentsArray));
        return node;
    }

    export function updateCall(node: CallExpression, expression: Expression, typeArguments: TypeNode[], argumentsArray: Expression[]) {
        if (expression !== node.expression || typeArguments !== node.typeArguments || argumentsArray !== node.arguments) {
            return updateNode(createCall(expression, typeArguments, argumentsArray, /*location*/ node, node.flags), node);
        }
        return node;
    }

    export function createNew(expression: Expression, typeArguments: TypeNode[], argumentsArray: Expression[], location?: TextRange, flags?: NodeFlags) {
        const node = <NewExpression>createNode(SyntaxKind.NewExpression, location, flags);
        node.expression = parenthesizeForNew(expression);
        node.typeArguments = typeArguments ? createNodeArray(typeArguments) : undefined;
        node.arguments = argumentsArray ? parenthesizeListElements(createNodeArray(argumentsArray)) : undefined;
        return node;
    }

    export function updateNew(node: NewExpression, expression: Expression, typeArguments: TypeNode[], argumentsArray: Expression[]) {
        if (node.expression !== expression || node.typeArguments !== typeArguments || node.arguments !== argumentsArray) {
            return updateNode(createNew(expression, typeArguments, argumentsArray, /*location*/ node, node.flags), node);
        }
        return node;
    }

    export function createTaggedTemplate(tag: Expression, template: TemplateLiteral, location?: TextRange) {
        const node = <TaggedTemplateExpression>createNode(SyntaxKind.TaggedTemplateExpression, location);
        node.tag = parenthesizeForAccess(tag);
        node.template = template;
        return node;
    }

    export function updateTaggedTemplate(node: TaggedTemplateExpression, tag: Expression, template: TemplateLiteral) {
        if (node.tag !== tag || node.template !== template) {
            return updateNode(createTaggedTemplate(tag, template, node), node);
        }
        return node;
    }

    export function createParen(expression: Expression, location?: TextRange) {
        const node = <ParenthesizedExpression>createNode(SyntaxKind.ParenthesizedExpression, location);
        node.expression = expression;
        return node;
    }

    export function updateParen(node: ParenthesizedExpression, expression: Expression) {
        if (node.expression !== expression) {
            return updateNode(createParen(expression, node), node);
        }
        return node;
    }

    export function createFunctionExpression(modifiers: Modifier[], asteriskToken: AsteriskToken, name: string | Identifier, typeParameters: TypeParameterDeclaration[], parameters: ParameterDeclaration[], type: TypeNode, body: Block, location?: TextRange, flags?: NodeFlags) {
        const node = <FunctionExpression>createNode(SyntaxKind.FunctionExpression, location, flags);
        node.modifiers = modifiers ? createNodeArray(modifiers) : undefined;
        node.asteriskToken = asteriskToken;
        node.name = typeof name === "string" ? createIdentifier(name) : name;
        node.typeParameters = typeParameters ? createNodeArray(typeParameters) : undefined;
        node.parameters = createNodeArray(parameters);
        node.type = type;
        node.body = body;
        return node;
    }

    export function updateFunctionExpression(node: FunctionExpression, modifiers: Modifier[], name: Identifier, typeParameters: TypeParameterDeclaration[], parameters: ParameterDeclaration[], type: TypeNode, body: Block) {
        if (node.name !== name || node.modifiers !== modifiers || node.typeParameters !== typeParameters || node.parameters !== parameters || node.type !== type || node.body !== body) {
            return updateNode(createFunctionExpression(modifiers, node.asteriskToken, name, typeParameters, parameters, type, body, /*location*/ node, node.flags), node);
        }
        return node;
    }

    export function createArrowFunction(modifiers: Modifier[], typeParameters: TypeParameterDeclaration[], parameters: ParameterDeclaration[], type: TypeNode, equalsGreaterThanToken: EqualsGreaterThanToken, body: ConciseBody, location?: TextRange, flags?: NodeFlags) {
        const node = <ArrowFunction>createNode(SyntaxKind.ArrowFunction, location, flags);
        node.modifiers = modifiers ? createNodeArray(modifiers) : undefined;
        node.typeParameters = typeParameters ? createNodeArray(typeParameters) : undefined;
        node.parameters = createNodeArray(parameters);
        node.type = type;
        node.equalsGreaterThanToken = equalsGreaterThanToken || createToken(SyntaxKind.EqualsGreaterThanToken);
        node.body = parenthesizeConciseBody(body);
        return node;
    }

    export function updateArrowFunction(node: ArrowFunction, modifiers: Modifier[], typeParameters: TypeParameterDeclaration[], parameters: ParameterDeclaration[], type: TypeNode, body: ConciseBody) {
        if (node.modifiers !== modifiers || node.typeParameters !== typeParameters || node.parameters !== parameters || node.type !== type || node.body !== body) {
            return updateNode(createArrowFunction(modifiers, typeParameters, parameters, type, node.equalsGreaterThanToken, body, /*location*/ node, node.flags), node);
        }
        return node;
    }

    export function createDelete(expression: Expression, location?: TextRange) {
        const node = <DeleteExpression>createNode(SyntaxKind.DeleteExpression, location);
        node.expression = parenthesizePrefixOperand(expression);
        return node;
    }

    export function updateDelete(node: DeleteExpression, expression: Expression) {
        if (node.expression !== expression) {
            return updateNode(createDelete(expression, node), expression);
        }
        return node;
    }

    export function createTypeOf(expression: Expression, location?: TextRange) {
        const node = <TypeOfExpression>createNode(SyntaxKind.TypeOfExpression, location);
        node.expression = parenthesizePrefixOperand(expression);
        return node;
    }

    export function updateTypeOf(node: TypeOfExpression, expression: Expression) {
        if (node.expression !== expression) {
            return updateNode(createTypeOf(expression, node), expression);
        }
        return node;
    }

    export function createVoid(expression: Expression, location?: TextRange) {
        const node = <VoidExpression>createNode(SyntaxKind.VoidExpression, location);
        node.expression = parenthesizePrefixOperand(expression);
        return node;
    }

    export function updateVoid(node: VoidExpression, expression: Expression) {
        if (node.expression !== expression) {
            return updateNode(createVoid(expression, node), node);
        }
        return node;
    }

    export function createAwait(expression: Expression, location?: TextRange) {
        const node = <AwaitExpression>createNode(SyntaxKind.AwaitExpression, location);
        node.expression = parenthesizePrefixOperand(expression);
        return node;
    }

    export function updateAwait(node: AwaitExpression, expression: Expression) {
        if (node.expression !== expression) {
            return updateNode(createAwait(expression, node), node);
        }
        return node;
    }

    export function createPrefix(operator: PrefixUnaryOperator, operand: Expression, location?: TextRange) {
        const node = <PrefixUnaryExpression>createNode(SyntaxKind.PrefixUnaryExpression, location);
        node.operator = operator;
        node.operand = parenthesizePrefixOperand(operand);
        return node;
    }

    export function updatePrefix(node: PrefixUnaryExpression, operand: Expression) {
        if (node.operand !== operand) {
            return updateNode(createPrefix(node.operator, operand, node), node);
        }
        return node;
    }

    export function createPostfix(operand: Expression, operator: PostfixUnaryOperator, location?: TextRange) {
        const node = <PostfixUnaryExpression>createNode(SyntaxKind.PostfixUnaryExpression, location);
        node.operand = parenthesizePostfixOperand(operand);
        node.operator = operator;
        return node;
    }

    export function updatePostfix(node: PostfixUnaryExpression, operand: Expression) {
        if (node.operand !== operand) {
            return updateNode(createPostfix(operand, node.operator, node), node);
        }
        return node;
    }

    export function createBinary(left: Expression, operator: BinaryOperator | BinaryOperatorToken, right: Expression, location?: TextRange) {
        const operatorToken = typeof operator === "number" ? createToken(operator) : operator;
        const operatorKind = operatorToken.kind;
        const node = <BinaryExpression>createNode(SyntaxKind.BinaryExpression, location);
        node.left = parenthesizeBinaryOperand(operatorKind, left, /*isLeftSideOfBinary*/ true, /*leftOperand*/ undefined);
        node.operatorToken = operatorToken;
        node.right = parenthesizeBinaryOperand(operatorKind, right, /*isLeftSideOfBinary*/ false, node.left);
        return node;
    }

    export function updateBinary(node: BinaryExpression, left: Expression, right: Expression) {
        if (node.left !== left || node.right !== right) {
            return updateNode(createBinary(left, node.operatorToken, right, /*location*/ node), node);
        }
        return node;
    }

    export function createConditional(condition: Expression, questionToken: QuestionToken, whenTrue: Expression, colonToken: ColonToken, whenFalse: Expression, location?: TextRange) {
        const node = <ConditionalExpression>createNode(SyntaxKind.ConditionalExpression, location);
        node.condition = condition;
        node.questionToken = questionToken;
        node.whenTrue = whenTrue;
        node.colonToken = colonToken;
        node.whenFalse = whenFalse;
        return node;
    }

    export function updateConditional(node: ConditionalExpression, condition: Expression, whenTrue: Expression, whenFalse: Expression) {
        if (node.condition !== condition || node.whenTrue !== whenTrue || node.whenFalse !== whenFalse) {
            return updateNode(createConditional(condition, node.questionToken, whenTrue, node.colonToken, whenFalse, node), node);
        }
        return node;
    }

    export function createTemplateExpression(head: TemplateHead, templateSpans: TemplateSpan[], location?: TextRange) {
        const node = <TemplateExpression>createNode(SyntaxKind.TemplateExpression, location);
        node.head = head;
        node.templateSpans = createNodeArray(templateSpans);
        return node;
    }

    export function updateTemplateExpression(node: TemplateExpression, head: TemplateHead, templateSpans: TemplateSpan[]) {
        if (node.head !== head || node.templateSpans !== templateSpans) {
            return updateNode(createTemplateExpression(head, templateSpans, node), node);
        }
        return node;
    }

    export function createYield(asteriskToken: AsteriskToken, expression: Expression, location?: TextRange) {
        const node = <YieldExpression>createNode(SyntaxKind.YieldExpression, location);
        node.asteriskToken = asteriskToken;
        node.expression = expression;
        return node;
    }

    export function updateYield(node: YieldExpression, expression: Expression) {
        if (node.expression !== expression) {
            return updateNode(createYield(node.asteriskToken, expression, node), node);
        }
        return node;
    }

    export function createSpread(expression: Expression, location?: TextRange) {
        const node = <SpreadElementExpression>createNode(SyntaxKind.SpreadElementExpression, location);
        node.expression = parenthesizeExpressionForList(expression);
        return node;
    }

    export function updateSpread(node: SpreadElementExpression, expression: Expression) {
        if (node.expression !== expression) {
            return updateNode(createSpread(expression, node), node);
        }
        return node;
    }

    export function createClassExpression(modifiers: Modifier[], name: Identifier, typeParameters: TypeParameterDeclaration[], heritageClauses: HeritageClause[], members: ClassElement[], location?: TextRange) {
        const node = <ClassExpression>createNode(SyntaxKind.ClassExpression, location);
        node.decorators = undefined;
        node.modifiers = modifiers ? createNodeArray(modifiers) : undefined;
        node.name = name;
        node.typeParameters = typeParameters ? createNodeArray(typeParameters) : undefined;
        node.heritageClauses = createNodeArray(heritageClauses);
        node.members = createNodeArray(members);
        return node;
    }

    export function updateClassExpression(node: ClassExpression, modifiers: Modifier[], name: Identifier, typeParameters: TypeParameterDeclaration[], heritageClauses: HeritageClause[], members: ClassElement[]) {
        if (node.modifiers !== modifiers || node.name !== name || node.typeParameters !== typeParameters || node.heritageClauses !== heritageClauses || node.members !== members) {
            return updateNode(createClassExpression(modifiers, name, typeParameters, heritageClauses, members, node), node);
        }
        return node;
    }

    export function createOmittedExpression(location?: TextRange) {
        const node = <OmittedExpression>createNode(SyntaxKind.OmittedExpression, location);
        return node;
    }

    export function createExpressionWithTypeArguments(typeArguments: TypeNode[], expression: Expression, location?: TextRange) {
        const node = <ExpressionWithTypeArguments>createNode(SyntaxKind.ExpressionWithTypeArguments, location);
        node.typeArguments = typeArguments ? createNodeArray(typeArguments) : undefined;
        node.expression = parenthesizeForAccess(expression);
        return node;
    }

    export function updateExpressionWithTypeArguments(node: ExpressionWithTypeArguments, typeArguments: TypeNode[], expression: Expression) {
        if (node.typeArguments !== typeArguments || node.expression !== expression) {
            return updateNode(createExpressionWithTypeArguments(typeArguments, expression, node), node);
        }
        return node;
    }


    // Misc

    export function createTemplateSpan(expression: Expression, literal: TemplateMiddle | TemplateTail, location?: TextRange) {
        const node = <TemplateSpan>createNode(SyntaxKind.TemplateSpan, location);
        node.expression = expression;
        node.literal = literal;
        return node;
    }

    export function updateTemplateSpan(node: TemplateSpan, expression: Expression, literal: TemplateMiddle | TemplateTail) {
        if (node.expression !== expression || node.literal !== literal) {
            return updateNode(createTemplateSpan(expression, literal, node), node);
        }
        return node;
    }

    // Element

    export function createBlock(statements: Statement[], location?: TextRange, multiLine?: boolean, flags?: NodeFlags): Block {
        const block = <Block>createNode(SyntaxKind.Block, location, flags);
        block.statements = createNodeArray(statements);
        if (multiLine) {
            block.multiLine = true;
        }
        return block;
    }

    export function updateBlock(node: Block, statements: Statement[]) {
        if (statements !== node.statements) {
            return updateNode(createBlock(statements, /*location*/ node, node.multiLine, node.flags), node);
        }

        return node;
    }

    export function createVariableStatement(modifiers: Modifier[], declarationList: VariableDeclarationList | VariableDeclaration[], location?: TextRange, flags?: NodeFlags): VariableStatement {
        const node = <VariableStatement>createNode(SyntaxKind.VariableStatement, location, flags);
        node.decorators = undefined;
        node.modifiers = modifiers ? createNodeArray(modifiers) : undefined;
        node.declarationList = isArray(declarationList) ? createVariableDeclarationList(declarationList) : declarationList;
        return node;
    }

    export function updateVariableStatement(node: VariableStatement, modifiers: Modifier[], declarationList: VariableDeclarationList): VariableStatement {
        if (node.modifiers !== modifiers || node.declarationList !== declarationList) {
            return updateNode(createVariableStatement(modifiers, declarationList, /*location*/ node, node.flags), node);
        }
        return node;
    }

    export function createVariableDeclarationList(declarations: VariableDeclaration[], location?: TextRange, flags?: NodeFlags): VariableDeclarationList {
        const node = <VariableDeclarationList>createNode(SyntaxKind.VariableDeclarationList, location, flags);
        node.declarations = createNodeArray(declarations);
        return node;
    }

    export function updateVariableDeclarationList(node: VariableDeclarationList, declarations: VariableDeclaration[]) {
        if (node.declarations !== declarations) {
            return updateNode(createVariableDeclarationList(declarations, /*location*/ node, node.flags), node);
        }
        return node;
    }

    export function createVariableDeclaration(name: string | BindingPattern | Identifier, type?: TypeNode, initializer?: Expression, location?: TextRange, flags?: NodeFlags): VariableDeclaration {
        const node = <VariableDeclaration>createNode(SyntaxKind.VariableDeclaration, location, flags);
        node.name = typeof name === "string" ? createIdentifier(name) : name;
        node.type = type;
        node.initializer = initializer !== undefined ? parenthesizeExpressionForList(initializer) : undefined;
        return node;
    }

    export function updateVariableDeclaration(node: VariableDeclaration, name: BindingName, type: TypeNode, initializer: Expression) {
        if (node.name !== name || node.type !== type || node.initializer !== initializer) {
            return updateNode(createVariableDeclaration(name, type, initializer, /*location*/ node, node.flags), node);
        }
        return node;
    }

    export function createEmptyStatement(location: TextRange) {
        return <EmptyStatement>createNode(SyntaxKind.EmptyStatement, location);
    }

    export function createStatement(expression: Expression, location?: TextRange, flags?: NodeFlags): ExpressionStatement {
        const node = <ExpressionStatement>createNode(SyntaxKind.ExpressionStatement, location, flags);
        node.expression = parenthesizeExpressionForExpressionStatement(expression);
        return node;
    }

    export function updateStatement(node: ExpressionStatement, expression: Expression) {
        if (node.expression !== expression) {
            return updateNode(createStatement(expression, /*location*/ node, node.flags), node);
        }

        return node;
    }

    export function createIf(expression: Expression, thenStatement: Statement, elseStatement?: Statement, location?: TextRange) {
        const node = <IfStatement>createNode(SyntaxKind.IfStatement, location);
        node.expression = expression;
        node.thenStatement = thenStatement;
        node.elseStatement = elseStatement;
        return node;
    }

    export function updateIf(node: IfStatement, expression: Expression, thenStatement: Statement, elseStatement: Statement) {
        if (node.expression !== expression || node.thenStatement !== thenStatement || node.elseStatement !== elseStatement) {
            return updateNode(createIf(expression, thenStatement, elseStatement, /*location*/ node), node);
        }
        return node;
    }

    export function createDo(statement: Statement, expression: Expression, location?: TextRange) {
        const node = <DoStatement>createNode(SyntaxKind.DoStatement, location);
        node.statement = statement;
        node.expression = expression;
        return node;
    }

    export function updateDo(node: DoStatement, statement: Statement, expression: Expression) {
        if (node.statement !== statement || node.expression !== expression) {
            return updateNode(createDo(statement, expression, node), node);
        }
        return node;
    }

    export function createWhile(expression: Expression, statement: Statement, location?: TextRange) {
        const node = <WhileStatement>createNode(SyntaxKind.WhileStatement, location);
        node.expression = expression;
        node.statement = statement;
        return node;
    }

    export function updateWhile(node: WhileStatement, expression: Expression, statement: Statement) {
        if (node.expression !== expression || node.statement !== statement) {
            return updateNode(createWhile(expression, statement, node), node);
        }
        return node;
    }

    export function createFor(initializer: ForInitializer, condition: Expression, incrementor: Expression, statement: Statement, location?: TextRange) {
        const node = <ForStatement>createNode(SyntaxKind.ForStatement, location, /*flags*/ undefined);
        node.initializer = initializer;
        node.condition = condition;
        node.incrementor = incrementor;
        node.statement = statement;
        return node;
    }

    export function updateFor(node: ForStatement, initializer: ForInitializer, condition: Expression, incrementor: Expression, statement: Statement) {
        if (node.initializer !== initializer || node.condition !== condition || node.incrementor !== incrementor || node.statement !== statement) {
            return updateNode(createFor(initializer, condition, incrementor, statement, node), node);
        }
        return node;
    }

    export function createForIn(initializer: ForInitializer, expression: Expression, statement: Statement, location?: TextRange) {
        const node = <ForInStatement>createNode(SyntaxKind.ForInStatement, location);
        node.initializer = initializer;
        node.expression = expression;
        node.statement = statement;
        return node;
    }

    export function updateForIn(node: ForInStatement, initializer: ForInitializer, expression: Expression, statement: Statement) {
        if (node.initializer !== initializer || node.expression !== expression || node.statement !== statement) {
            return updateNode(createForIn(initializer, expression, statement, node), node);
        }
        return node;
    }

    export function createForOf(initializer: ForInitializer, expression: Expression, statement: Statement, location?: TextRange) {
        const node = <ForOfStatement>createNode(SyntaxKind.ForOfStatement, location);
        node.initializer = initializer;
        node.expression = expression;
        node.statement = statement;
        return node;
    }

    export function updateForOf(node: ForOfStatement, initializer: ForInitializer, expression: Expression, statement: Statement) {
        if (node.initializer !== initializer || node.expression !== expression || node.statement !== statement) {
            return updateNode(createForOf(initializer, expression, statement, node), node);
        }
        return node;
    }

    export function createContinue(label?: Identifier, location?: TextRange): ContinueStatement {
        const node = <ContinueStatement>createNode(SyntaxKind.ContinueStatement, location);
        if (label) {
            node.label = label;
        }
        return node;
    }

    export function updateContinue(node: ContinueStatement, label: Identifier) {
        if (node.label !== label) {
            return updateNode(createContinue(label, node), node);
        }
        return node;
    }

    export function createBreak(label?: Identifier, location?: TextRange): BreakStatement {
        const node = <BreakStatement>createNode(SyntaxKind.BreakStatement, location);
        if (label) {
            node.label = label;
        }
        return node;
    }

    export function updateBreak(node: BreakStatement, label: Identifier) {
        if (node.label !== label) {
            return updateNode(createBreak(label, node), node);
        }
        return node;
    }

    export function createReturn(expression?: Expression, location?: TextRange): ReturnStatement {
        const node = <ReturnStatement>createNode(SyntaxKind.ReturnStatement, location);
        node.expression = expression;
        return node;
    }

    export function updateReturn(node: ReturnStatement, expression: Expression) {
        if (node.expression !== expression) {
            return updateNode(createReturn(expression, /*location*/ node), node);
        }
        return node;
    }

    export function createWith(expression: Expression, statement: Statement, location?: TextRange) {
        const node = <WithStatement>createNode(SyntaxKind.WithStatement, location);
        node.expression = expression;
        node.statement = statement;
        return node;
    }

    export function updateWith(node: WithStatement, expression: Expression, statement: Statement) {
        if (node.expression !== expression || node.statement !== statement) {
            return updateNode(createWith(expression, statement, node), node);
        }
        return node;
    }

    export function createSwitch(expression: Expression, caseBlock: CaseBlock, location?: TextRange): SwitchStatement {
        const node = <SwitchStatement>createNode(SyntaxKind.SwitchStatement, location);
        node.expression = parenthesizeExpressionForList(expression);
        node.caseBlock = caseBlock;
        return node;
    }

    export function updateSwitch(node: SwitchStatement, expression: Expression, caseBlock: CaseBlock) {
        if (node.expression !== expression || node.caseBlock !== caseBlock) {
            return updateNode(createSwitch(expression, caseBlock, node), node);
        }
        return node;
    }

    export function createLabel(label: string | Identifier, statement: Statement, location?: TextRange) {
        const node = <LabeledStatement>createNode(SyntaxKind.LabeledStatement, location);
        node.label = typeof label === "string" ? createIdentifier(label) : label;
        node.statement = statement;
        return node;
    }

    export function updateLabel(node: LabeledStatement, label: Identifier, statement: Statement) {
        if (node.label !== label || node.statement !== statement) {
            return updateNode(createLabel(label, statement, node), node);
        }
        return node;
    }

    export function createThrow(expression: Expression, location?: TextRange) {
        const node = <ThrowStatement>createNode(SyntaxKind.ThrowStatement, location);
        node.expression = expression;
        return node;
    }

    export function updateThrow(node: ThrowStatement, expression: Expression) {
        if (node.expression !== expression) {
            return updateNode(createThrow(expression, node), node);
        }
        return node;
    }

    export function createTry(tryBlock: Block, catchClause: CatchClause, finallyBlock: Block, location?: TextRange) {
        const node = <TryStatement>createNode(SyntaxKind.TryStatement, location);
        node.tryBlock = tryBlock;
        node.catchClause = catchClause;
        node.finallyBlock = finallyBlock;
        return node;
    }

    export function updateTry(node: TryStatement, tryBlock: Block, catchClause: CatchClause, finallyBlock: Block) {
        if (node.tryBlock !== tryBlock || node.catchClause !== catchClause || node.finallyBlock !== finallyBlock) {
            return updateNode(createTry(tryBlock, catchClause, finallyBlock, node), node);
        }
        return node;
    }

    export function createCaseBlock(clauses: CaseOrDefaultClause[], location?: TextRange): CaseBlock {
        const node = <CaseBlock>createNode(SyntaxKind.CaseBlock, location);
        node.clauses = createNodeArray(clauses);
        return node;
    }

    export function updateCaseBlock(node: CaseBlock, clauses: CaseOrDefaultClause[]) {
        if (node.clauses !== clauses) {
            return updateNode(createCaseBlock(clauses, node), node);
        }
        return node;
    }

    export function createFunctionDeclaration(decorators: Decorator[], modifiers: Modifier[], asteriskToken: AsteriskToken, name: string | Identifier, typeParameters: TypeParameterDeclaration[], parameters: ParameterDeclaration[], type: TypeNode, body: Block, location?: TextRange, flags?: NodeFlags) {
        const node = <FunctionDeclaration>createNode(SyntaxKind.FunctionDeclaration, location, flags);
        node.decorators = decorators ? createNodeArray(decorators) : undefined;
        node.modifiers = modifiers ? createNodeArray(modifiers) : undefined;
        node.asteriskToken = asteriskToken;
        node.name = typeof name === "string" ? createIdentifier(name) : name;
        node.typeParameters = typeParameters ? createNodeArray(typeParameters) : undefined;
        node.parameters = createNodeArray(parameters);
        node.type = type;
        node.body = body;
        return node;
    }

    export function updateFunctionDeclaration(node: FunctionDeclaration, decorators: Decorator[], modifiers: Modifier[], name: Identifier, typeParameters: TypeParameterDeclaration[], parameters: ParameterDeclaration[], type: TypeNode, body: Block) {
        if (node.decorators !== decorators || node.modifiers !== modifiers || node.name !== name || node.typeParameters !== typeParameters || node.parameters !== parameters || node.type !== type || node.body !== body) {
            return updateNode(createFunctionDeclaration(decorators, modifiers, node.asteriskToken, name, typeParameters, parameters, type, body, /*location*/ node, node.flags), node);
        }
        return node;
    }

    export function createClassDeclaration(decorators: Decorator[], modifiers: Modifier[], name: Identifier, typeParameters: TypeParameterDeclaration[], heritageClauses: HeritageClause[], members: ClassElement[], location?: TextRange) {
        const node = <ClassDeclaration>createNode(SyntaxKind.ClassDeclaration, location);
        node.decorators = decorators ? createNodeArray(decorators) : undefined;
        node.modifiers = modifiers ? createNodeArray(modifiers) : undefined;
        node.name = name;
        node.typeParameters = typeParameters ? createNodeArray(typeParameters) : undefined;
        node.heritageClauses = createNodeArray(heritageClauses);
        node.members = createNodeArray(members);
        return node;
    }

    export function updateClassDeclaration(node: ClassDeclaration, decorators: Decorator[], modifiers: Modifier[], name: Identifier, typeParameters: TypeParameterDeclaration[], heritageClauses: HeritageClause[], members: ClassElement[]) {
        if (node.decorators !== decorators || node.modifiers !== modifiers || node.name !== name || node.typeParameters !== typeParameters || node.heritageClauses !== heritageClauses || node.members !== members) {
            return updateNode(createClassDeclaration(decorators, modifiers, name, typeParameters, heritageClauses, members, node), node);
        }
        return node;
    }

    export function createImportDeclaration(decorators: Decorator[], modifiers: Modifier[], importClause: ImportClause, moduleSpecifier?: Expression, location?: TextRange): ImportDeclaration {
        const node = <ImportDeclaration>createNode(SyntaxKind.ImportDeclaration, location);
        node.decorators = decorators ? createNodeArray(decorators) : undefined;
        node.modifiers = modifiers ? createNodeArray(modifiers) : undefined;
        node.importClause = importClause;
        node.moduleSpecifier = moduleSpecifier;
        return node;
    }

    export function updateImportDeclaration(node: ImportDeclaration, decorators: Decorator[], modifiers: Modifier[], importClause: ImportClause, moduleSpecifier: Expression) {
        if (node.decorators !== decorators || node.modifiers !== modifiers || node.importClause !== importClause || node.moduleSpecifier !== moduleSpecifier) {
            return updateNode(createImportDeclaration(decorators, modifiers, importClause, moduleSpecifier, node), node);
        }
        return node;
    }

    export function createImportClause(name: Identifier, namedBindings: NamedImportBindings, location?: TextRange): ImportClause {
        const node = <ImportClause>createNode(SyntaxKind.ImportClause, location);
        node.name = name;
        node.namedBindings = namedBindings;
        return node;
    }

    export function updateImportClause(node: ImportClause, name: Identifier, namedBindings: NamedImportBindings) {
        if (node.name !== name || node.namedBindings !== namedBindings) {
            return updateNode(createImportClause(name, namedBindings, node), node);
        }
        return node;
    }

    export function createNamespaceImport(name: Identifier, location?: TextRange): NamespaceImport {
        const node = <NamespaceImport>createNode(SyntaxKind.NamespaceImport, location);
        node.name = name;
        return node;
    }

    export function updateNamespaceImport(node: NamespaceImport, name: Identifier) {
        if (node.name !== name) {
            return updateNode(createNamespaceImport(name, node), node);
        }
        return node;
    }

    export function createNamedImports(elements: ImportSpecifier[], location?: TextRange): NamedImports {
        const node = <NamedImports>createNode(SyntaxKind.NamedImports, location);
        node.elements = createNodeArray(elements);
        return node;
    }

    export function updateNamedImports(node: NamedImports, elements: ImportSpecifier[]) {
        if (node.elements !== elements) {
            return updateNode(createNamedImports(elements, node), node);
        }
        return node;
    }

    export function createImportSpecifier(propertyName: Identifier, name: Identifier, location?: TextRange) {
        const node = <ImportSpecifier>createNode(SyntaxKind.ImportSpecifier, location);
        node.propertyName = propertyName;
        node.name = name;
        return node;
    }

    export function updateImportSpecifier(node: ImportSpecifier, propertyName: Identifier, name: Identifier) {
        if (node.propertyName !== propertyName || node.name !== name) {
            return updateNode(createImportSpecifier(propertyName, name, node), node);
        }
        return node;
    }

    export function createExportAssignment(decorators: Decorator[], modifiers: Modifier[], isExportEquals: boolean, expression: Expression, location?: TextRange) {
        const node = <ExportAssignment>createNode(SyntaxKind.ExportAssignment, location);
        node.decorators = decorators ? createNodeArray(decorators) : undefined;
        node.modifiers = modifiers ? createNodeArray(modifiers) : undefined;
        node.isExportEquals = isExportEquals;
        node.expression = expression;
        return node;
    }

    export function updateExportAssignment(node: ExportAssignment, decorators: Decorator[], modifiers: Modifier[], expression: Expression) {
        if (node.decorators !== decorators || node.modifiers !== modifiers || node.expression !== expression) {
            return updateNode(createExportAssignment(decorators, modifiers, node.isExportEquals, expression, node), node);
        }
        return node;
    }

    export function createExportDeclaration(decorators: Decorator[], modifiers: Modifier[], exportClause: NamedExports, moduleSpecifier?: Expression, location?: TextRange) {
        const node = <ExportDeclaration>createNode(SyntaxKind.ExportDeclaration, location);
        node.decorators = decorators ? createNodeArray(decorators) : undefined;
        node.modifiers = modifiers ? createNodeArray(modifiers) : undefined;
        node.exportClause = exportClause;
        node.moduleSpecifier = moduleSpecifier;
        return node;
    }

    export function updateExportDeclaration(node: ExportDeclaration, decorators: Decorator[], modifiers: Modifier[], exportClause: NamedExports, moduleSpecifier: Expression) {
        if (node.decorators !== decorators || node.modifiers !== modifiers || node.exportClause !== exportClause || node.moduleSpecifier !== moduleSpecifier) {
            return updateNode(createExportDeclaration(decorators, modifiers, exportClause, moduleSpecifier, node), node);
        }
        return node;
    }

    export function createNamedExports(elements: ExportSpecifier[], location?: TextRange) {
        const node = <NamedExports>createNode(SyntaxKind.NamedExports, location);
        node.elements = createNodeArray(elements);
        return node;
    }

    export function updateNamedExports(node: NamedExports, elements: ExportSpecifier[]) {
        if (node.elements !== elements) {
            return updateNode(createNamedExports(elements, node), node);
        }
        return node;
    }

    export function createExportSpecifier(name: string | Identifier, propertyName?: string | Identifier, location?: TextRange) {
        const node = <ExportSpecifier>createNode(SyntaxKind.ExportSpecifier, location);
        node.name = typeof name === "string" ? createIdentifier(name) : name;
        node.propertyName = typeof propertyName === "string" ? createIdentifier(propertyName) : propertyName;
        return node;
    }

    export function updateExportSpecifier(node: ExportSpecifier, name: Identifier, propertyName: Identifier) {
        if (node.name !== name || node.propertyName !== propertyName) {
            return updateNode(createExportSpecifier(name, propertyName, node), node);
        }
        return node;
    }

    // JSX

    export function createJsxElement(openingElement: JsxOpeningElement, children: JsxChild[], closingElement: JsxClosingElement, location?: TextRange) {
        const node = <JsxElement>createNode(SyntaxKind.JsxElement, location);
        node.openingElement = openingElement;
        node.children = createNodeArray(children);
        node.closingElement = closingElement;
        return node;
    }

    export function updateJsxElement(node: JsxElement, openingElement: JsxOpeningElement, children: JsxChild[], closingElement: JsxClosingElement) {
        if (node.openingElement !== openingElement || node.children !== children || node.closingElement !== closingElement) {
            return updateNode(createJsxElement(openingElement, children, closingElement, node), node);
        }
        return node;
    }

    export function createJsxSelfClosingElement(tagName: JsxTagNameExpression, attributes: JsxAttributeLike[], location?: TextRange) {
        const node = <JsxSelfClosingElement>createNode(SyntaxKind.JsxSelfClosingElement, location);
        node.tagName = tagName;
        node.attributes = createNodeArray(attributes);
        return node;
    }

    export function updateJsxSelfClosingElement(node: JsxSelfClosingElement, tagName: JsxTagNameExpression, attributes: JsxAttributeLike[]) {
        if (node.tagName !== tagName || node.attributes !== attributes) {
            return updateNode(createJsxSelfClosingElement(tagName, attributes, node), node);
        }
        return node;
    }

    export function createJsxOpeningElement(tagName: JsxTagNameExpression, attributes: JsxAttributeLike[], location?: TextRange) {
        const node = <JsxOpeningElement>createNode(SyntaxKind.JsxOpeningElement, location);
        node.tagName = tagName;
        node.attributes = createNodeArray(attributes);
        return node;
    }

    export function updateJsxOpeningElement(node: JsxOpeningElement, tagName: JsxTagNameExpression, attributes: JsxAttributeLike[]) {
        if (node.tagName !== tagName || node.attributes !== attributes) {
            return updateNode(createJsxOpeningElement(tagName, attributes, node), node);
        }
        return node;
    }

    export function createJsxClosingElement(tagName: JsxTagNameExpression, location?: TextRange) {
        const node = <JsxClosingElement>createNode(SyntaxKind.JsxClosingElement, location);
        node.tagName = tagName;
        return node;
    }

    export function updateJsxClosingElement(node: JsxClosingElement, tagName: JsxTagNameExpression) {
        if (node.tagName !== tagName) {
            return updateNode(createJsxClosingElement(tagName, node), node);
        }
        return node;
    }

    export function createJsxAttribute(name: Identifier, initializer: StringLiteral | JsxExpression, location?: TextRange) {
        const node = <JsxAttribute>createNode(SyntaxKind.JsxAttribute, location);
        node.name = name;
        node.initializer = initializer;
        return node;
    }

    export function updateJsxAttribute(node: JsxAttribute, name: Identifier, initializer: StringLiteral | JsxExpression) {
        if (node.name !== name || node.initializer !== initializer) {
            return updateNode(createJsxAttribute(name, initializer, node), node);
        }
        return node;
    }

    export function createJsxSpreadAttribute(expression: Expression, location?: TextRange) {
        const node = <JsxSpreadAttribute>createNode(SyntaxKind.JsxSpreadAttribute, location);
        node.expression = expression;
        return node;
    }

    export function updateJsxSpreadAttribute(node: JsxSpreadAttribute, expression: Expression) {
        if (node.expression !== expression) {
            return updateNode(createJsxSpreadAttribute(expression, node), node);
        }
        return node;
    }

    export function createJsxExpression(expression: Expression, location?: TextRange) {
        const node = <JsxExpression>createNode(SyntaxKind.JsxExpression, location);
        node.expression = expression;
        return node;
    }

    export function updateJsxExpression(node: JsxExpression, expression: Expression) {
        if (node.expression !== expression) {
            return updateNode(createJsxExpression(expression, node), node);
        }
        return node;
    }

    // Clauses

    export function createHeritageClause(token: SyntaxKind, types: ExpressionWithTypeArguments[], location?: TextRange) {
        const node = <HeritageClause>createNode(SyntaxKind.HeritageClause, location);
        node.token = token;
        node.types = createNodeArray(types);
        return node;
    }

    export function updateHeritageClause(node: HeritageClause, types: ExpressionWithTypeArguments[]) {
        if (node.types !== types) {
            return updateNode(createHeritageClause(node.token, types, node), node);
        }
        return node;
    }

    export function createCaseClause(expression: Expression, statements: Statement[], location?: TextRange) {
        const node = <CaseClause>createNode(SyntaxKind.CaseClause, location);
        node.expression = parenthesizeExpressionForList(expression);
        node.statements = createNodeArray(statements);
        return node;
    }

    export function updateCaseClause(node: CaseClause, expression: Expression, statements: Statement[]) {
        if (node.expression !== expression || node.statements !== statements) {
            return updateNode(createCaseClause(expression, statements, node), node);
        }
        return node;
    }

    export function createDefaultClause(statements: Statement[], location?: TextRange) {
        const node = <DefaultClause>createNode(SyntaxKind.DefaultClause, location);
        node.statements = createNodeArray(statements);
        return node;
    }

    export function updateDefaultClause(node: DefaultClause, statements: Statement[]) {
        if (node.statements !== statements) {
            return updateNode(createDefaultClause(statements, node), node);
        }
        return node;
    }

    export function createCatchClause(variableDeclaration: string | VariableDeclaration, block: Block, location?: TextRange) {
        const node = <CatchClause>createNode(SyntaxKind.CatchClause, location);
        node.variableDeclaration = typeof variableDeclaration === "string" ? createVariableDeclaration(variableDeclaration) : variableDeclaration;
        node.block = block;
        return node;
    }

    export function updateCatchClause(node: CatchClause, variableDeclaration: VariableDeclaration, block: Block) {
        if (node.variableDeclaration !== variableDeclaration || node.block !== block) {
            return updateNode(createCatchClause(variableDeclaration, block, node), node);
        }
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

    export function updatePropertyAssignment(node: PropertyAssignment, name: PropertyName, initializer: Expression) {
        if (node.name !== name || node.initializer !== initializer) {
            return updateNode(createPropertyAssignment(name, initializer, node), node);
        }
        return node;
    }

    export function createShorthandPropertyAssignment(name: string | Identifier, objectAssignmentInitializer: Expression, location?: TextRange) {
        const node = <ShorthandPropertyAssignment>createNode(SyntaxKind.ShorthandPropertyAssignment, location);
        node.name = typeof name === "string" ? createIdentifier(name) : name;
        node.objectAssignmentInitializer = objectAssignmentInitializer !== undefined ? parenthesizeExpressionForList(objectAssignmentInitializer) : undefined;
        return node;
    }

    export function updateShorthandPropertyAssignment(node: ShorthandPropertyAssignment, name: Identifier, objectAssignmentInitializer: Expression) {
        if (node.name !== name || node.objectAssignmentInitializer !== objectAssignmentInitializer) {
            return updateNode(createShorthandPropertyAssignment(name, objectAssignmentInitializer, node), node);
        }
        return node;
    }

    // Top-level nodes

    export function updateSourceFileNode(node: SourceFile, statements: Statement[]) {
        if (node.statements !== statements) {
            const updated = <SourceFile>createNode(SyntaxKind.SourceFile, /*location*/ node, node.flags);
            updated.statements = createNodeArray(statements);
            updated.endOfFileToken = node.endOfFileToken;
            updated.fileName = node.fileName;
            updated.path = node.path;
            updated.text = node.text;
            if (node.amdDependencies !== undefined) updated.amdDependencies = node.amdDependencies;
            if (node.moduleName !== undefined) updated.moduleName = node.moduleName;
            if (node.referencedFiles !== undefined) updated.referencedFiles = node.referencedFiles;
            if (node.typeReferenceDirectives !== undefined) updated.typeReferenceDirectives = node.typeReferenceDirectives;
            if (node.languageVariant !== undefined) updated.languageVariant = node.languageVariant;
            if (node.isDeclarationFile !== undefined) updated.isDeclarationFile = node.isDeclarationFile;
            if (node.renamedDependencies !== undefined) updated.renamedDependencies = node.renamedDependencies;
            if (node.hasNoDefaultLib !== undefined) updated.hasNoDefaultLib = node.hasNoDefaultLib;
            if (node.languageVersion !== undefined) updated.languageVersion = node.languageVersion;
            if (node.scriptKind !== undefined) updated.scriptKind = node.scriptKind;
            if (node.externalModuleIndicator !== undefined) updated.externalModuleIndicator = node.externalModuleIndicator;
            if (node.commonJsModuleIndicator !== undefined) updated.commonJsModuleIndicator = node.commonJsModuleIndicator;
            if (node.identifiers !== undefined) updated.identifiers = node.identifiers;
            if (node.nodeCount !== undefined) updated.nodeCount = node.nodeCount;
            if (node.identifierCount !== undefined) updated.identifierCount = node.identifierCount;
            if (node.symbolCount !== undefined) updated.symbolCount = node.symbolCount;
            if (node.parseDiagnostics !== undefined) updated.parseDiagnostics = node.parseDiagnostics;
            if (node.bindDiagnostics !== undefined) updated.bindDiagnostics = node.bindDiagnostics;
            if (node.lineMap !== undefined) updated.lineMap = node.lineMap;
            if (node.classifiableNames !== undefined) updated.classifiableNames = node.classifiableNames;
            if (node.resolvedModules !== undefined) updated.resolvedModules = node.resolvedModules;
            if (node.resolvedTypeReferenceDirectiveNames !== undefined) updated.resolvedTypeReferenceDirectiveNames = node.resolvedTypeReferenceDirectiveNames;
            if (node.imports !== undefined) updated.imports = node.imports;
            if (node.moduleAugmentations !== undefined) updated.moduleAugmentations = node.moduleAugmentations;
            if (node.externalHelpersModuleName !== undefined) updated.externalHelpersModuleName = node.externalHelpersModuleName;
            return updateNode(updated, node);
        }

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
     * Creates a synthetic element to act as a placeholder for the end of an emitted declaration in
     * order to properly emit exports.
     */
    export function createEndOfDeclarationMarker(original: Node) {
        const node = <EndOfDeclarationMarker>createNode(SyntaxKind.EndOfDeclarationMarker);
        node.emitNode = {};
        node.original = original;
        return node;
    }

    /**
     * Creates a synthetic element to act as a placeholder for the beginning of a merged declaration in
     * order to properly emit exports.
     */
    export function createMergeDeclarationMarker(original: Node) {
        const node = <MergeDeclarationMarker>createNode(SyntaxKind.MergeDeclarationMarker);
        node.emitNode = {};
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

    export function updatePartiallyEmittedExpression(node: PartiallyEmittedExpression, expression: Expression) {
        if (node.expression !== expression) {
            return updateNode(createPartiallyEmittedExpression(expression, node.original, node), node);
        }
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
        if (isComputedPropertyName(memberName)) {
             return createElementAccess(target, memberName.expression, location);
        }
        else {
            const expression = isIdentifier(memberName) ? createPropertyAccess(target, memberName, location) : createElementAccess(target, memberName, location);
            (expression.emitNode || (expression.emitNode = {})).flags |= EmitFlags.NoNestedSourceMaps;
            return expression;
        }
    }

    export function createFunctionCall(func: Expression, thisArg: Expression, argumentsList: Expression[], location?: TextRange) {
        return createCall(
            createPropertyAccess(func, "call"),
            /*typeArguments*/ undefined,
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
            /*typeArguments*/ undefined,
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

        return createCall(createPropertyAccess(array, "slice"), /*typeArguments*/ undefined, argumentsList);
    }

    export function createArrayConcat(array: Expression, values: Expression[]) {
        return createCall(
            createPropertyAccess(array, "concat"),
            /*typeArguments*/ undefined,
            values
        );
    }

    export function createMathPow(left: Expression, right: Expression, location?: TextRange) {
        return createCall(
            createPropertyAccess(createIdentifier("Math"), "pow"),
            /*typeArguments*/ undefined,
            [left, right],
            location
        );
    }

    function createReactNamespace(reactNamespace: string, parent: JsxOpeningLikeElement) {
        // To ensure the emit resolver can properly resolve the namespace, we need to
        // treat this identifier as if it were a source tree node by clearing the `Synthesized`
        // flag and setting a parent node.
        const react = createIdentifier(reactNamespace || "React");
        react.flags &= ~NodeFlags.Synthesized;
        // Set the parent that is in parse tree 
        // this makes sure that parent chain is intact for checker to traverse complete scope tree
        react.parent = getParseTreeNode(parent);
        return react;
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

            if (children.length > 1) {
                for (const child of children) {
                    child.startsOnNewLine = true;
                    argumentsList.push(child);
                }
            }
            else {
                argumentsList.push(children[0]);
            }
        }

        return createCall(
            createPropertyAccess(
                createReactNamespace(reactNamespace, parentElement),
                "createElement"
            ),
            /*typeArguments*/ undefined,
            argumentsList,
            location
        );
    }

    export function createExportDefault(expression: Expression) {
        return createExportAssignment(/*decorators*/ undefined, /*modifiers*/ undefined, /*isExportEquals*/ false, expression);
    }

    export function createExternalModuleExport(exportName: Identifier) {
        return createExportDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, createNamedExports([createExportSpecifier(exportName)]));
    }

    export function createLetStatement(name: Identifier, initializer: Expression, location?: TextRange) {
        return createVariableStatement(/*modifiers*/ undefined, createLetDeclarationList([createVariableDeclaration(name, /*type*/ undefined, initializer)]), location);
    }

    export function createLetDeclarationList(declarations: VariableDeclaration[], location?: TextRange) {
        return createVariableDeclarationList(declarations, location, NodeFlags.Let);
    }

    export function createConstDeclarationList(declarations: VariableDeclaration[], location?: TextRange) {
        return createVariableDeclarationList(declarations, location, NodeFlags.Const);
    }

    // Helpers

    export function createHelperName(externalHelpersModuleName: Identifier | undefined, name: string) {
        return externalHelpersModuleName
            ? createPropertyAccess(externalHelpersModuleName, name)
            : createIdentifier(name);
    }

    export function createExtendsHelper(externalHelpersModuleName: Identifier | undefined, name: Identifier) {
        return createCall(
            createHelperName(externalHelpersModuleName, "__extends"),
            /*typeArguments*/ undefined,
            [
                name,
                createIdentifier("_super")
            ]
        );
    }

    export function createAssignHelper(externalHelpersModuleName: Identifier | undefined, attributesSegments: Expression[]) {
        return createCall(
            createHelperName(externalHelpersModuleName, "__assign"),
            /*typeArguments*/ undefined,
            attributesSegments
        );
    }

    export function createParamHelper(externalHelpersModuleName: Identifier | undefined, expression: Expression, parameterOffset: number, location?: TextRange) {
        return createCall(
            createHelperName(externalHelpersModuleName, "__param"),
            /*typeArguments*/ undefined,
            [
                createLiteral(parameterOffset),
                expression
            ],
            location
        );
    }

    export function createMetadataHelper(externalHelpersModuleName: Identifier | undefined, metadataKey: string, metadataValue: Expression) {
        return createCall(
            createHelperName(externalHelpersModuleName, "__metadata"),
            /*typeArguments*/ undefined,
            [
                createLiteral(metadataKey),
                metadataValue
            ]
        );
    }

    export function createDecorateHelper(externalHelpersModuleName: Identifier | undefined, decoratorExpressions: Expression[], target: Expression, memberName?: Expression, descriptor?: Expression, location?: TextRange) {
        const argumentsArray: Expression[] = [];
        argumentsArray.push(createArrayLiteral(decoratorExpressions, /*location*/ undefined, /*multiLine*/ true));
        argumentsArray.push(target);
        if (memberName) {
            argumentsArray.push(memberName);
            if (descriptor) {
                argumentsArray.push(descriptor);
            }
        }

        return createCall(createHelperName(externalHelpersModuleName, "__decorate"), /*typeArguments*/ undefined, argumentsArray, location);
    }

    export function createAwaiterHelper(externalHelpersModuleName: Identifier | undefined, hasLexicalArguments: boolean, promiseConstructor: EntityName | Expression, body: Block) {
        const generatorFunc = createFunctionExpression(
            /*modifiers*/ undefined,
            createToken(SyntaxKind.AsteriskToken),
            /*name*/ undefined,
            /*typeParameters*/ undefined,
            /*parameters*/ [],
            /*type*/ undefined,
            body
        );

        // Mark this node as originally an async function
        (generatorFunc.emitNode || (generatorFunc.emitNode = {})).flags |= EmitFlags.AsyncFunctionBody;

        return createCall(
            createHelperName(externalHelpersModuleName, "__awaiter"),
            /*typeArguments*/ undefined,
            [
                createThis(),
                hasLexicalArguments ? createIdentifier("arguments") : createVoidZero(),
                promiseConstructor ? createExpressionFromEntityName(promiseConstructor) : createVoidZero(),
                generatorFunc
            ]
        );
    }

    export function createHasOwnProperty(target: LeftHandSideExpression, propertyName: Expression) {
        return createCall(
            createPropertyAccess(target, "hasOwnProperty"),
            /*typeArguments*/ undefined,
            [propertyName]
        );
    }

    function createObjectCreate(prototype: Expression) {
        return createCall(
            createPropertyAccess(createIdentifier("Object"), "create"),
            /*typeArguments*/ undefined,
            [prototype]
        );
    }

    function createGeti(target: LeftHandSideExpression) {
        // name => super[name]
        return createArrowFunction(
            /*modifiers*/ undefined,
            /*typeParameters*/ undefined,
            [createParameter(/*decorators*/ undefined, /*modifiers*/ undefined, /*dotDotDotToken*/ undefined, "name")],
            /*type*/ undefined,
            createToken(SyntaxKind.EqualsGreaterThanToken),
            createElementAccess(target, createIdentifier("name"))
        );
    }

    function createSeti(target: LeftHandSideExpression) {
        // (name, value) => super[name] = value
        return createArrowFunction(
            /*modifiers*/ undefined,
            /*typeParameters*/ undefined,
            [
                createParameter(/*decorators*/ undefined, /*modifiers*/ undefined, /*dotDotDotToken*/ undefined, "name"),
                createParameter(/*decorators*/ undefined, /*modifiers*/ undefined, /*dotDotDotToken*/ undefined, "value")
            ],
            /*type*/ undefined,
            createToken(SyntaxKind.EqualsGreaterThanToken),
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
                    /*type*/ undefined,
                    createObjectCreate(createNull())
                )
            ])
        );

        // get value() { return geti(name); }
        const getter = createGetAccessor(
            /*decorators*/ undefined,
            /*modifiers*/ undefined,
            "value",
            /*parameters*/ [],
            /*type*/ undefined,
            createBlock([
                createReturn(
                    createCall(
                        createIdentifier("geti"),
                        /*typeArguments*/ undefined,
                        [createIdentifier("name")]
                    )
                )
            ])
        );

        // set value(v) { seti(name, v); }
        const setter = createSetAccessor(
            /*decorators*/ undefined,
            /*modifiers*/ undefined,
            "value",
            [createParameter(/*decorators*/ undefined, /*modifiers*/ undefined, /*dotDotDotToken*/ undefined, "v")],
            createBlock([
                createStatement(
                    createCall(
                        createIdentifier("seti"),
                        /*typeArguments*/ undefined,
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
                /*modifiers*/ undefined,
                /*typeParameters*/ undefined,
                [createParameter(/*decorators*/ undefined, /*modifiers*/ undefined, /*dotDotDotToken*/ undefined, "name")],
                /*type*/ undefined,
                createToken(SyntaxKind.EqualsGreaterThanToken),
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
                    /*type*/ undefined,
                    createCall(
                        createParen(
                            createFunctionExpression(
                                /*modifiers*/ undefined,
                                /*asteriskToken*/ undefined,
                                /*name*/ undefined,
                                /*typeParameters*/ undefined,
                                [
                                    createParameter(/*decorators*/ undefined, /*modifiers*/ undefined, /*dotDotDotToken*/ undefined, "geti"),
                                    createParameter(/*decorators*/ undefined, /*modifiers*/ undefined, /*dotDotDotToken*/ undefined, "seti")
                                ],
                                /*type*/ undefined,
                                createBlock([
                                    createCache,
                                    getOrCreateAccessorsForName
                                ])
                            )
                        ),
                        /*typeArguments*/ undefined,
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
                    /*type*/ undefined,
                    createGeti(createSuper())
                )
            ])
        );
    }

    export interface CallBinding {
        target: LeftHandSideExpression;
        thisArg: Expression;
    }

    function shouldBeCapturedInTempVariable(node: Expression, cacheIdentifiers: boolean): boolean {
        const target = skipParentheses(node);
        switch (target.kind) {
            case SyntaxKind.Identifier:
                return cacheIdentifiers;
            case SyntaxKind.ThisKeyword:
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.StringLiteral:
                return false;
            case SyntaxKind.ArrayLiteralExpression:
                const elements = (<ArrayLiteralExpression>target).elements;
                if (elements.length === 0) {
                    return false;
                }
                return true;
            case SyntaxKind.ObjectLiteralExpression:
                return (<ObjectLiteralExpression>target).properties.length > 0;
            default:
                return true;
        }
    }

    export function createCallBinding(expression: Expression, recordTempVariable: (temp: Identifier) => void, languageVersion?: ScriptTarget, cacheIdentifiers?: boolean): CallBinding {
        const callee = skipOuterExpressions(expression, OuterExpressionKinds.All);
        let thisArg: Expression;
        let target: LeftHandSideExpression;
        if (isSuperProperty(callee)) {
            thisArg = createThis();
            target = callee;
        }
        else if (callee.kind === SyntaxKind.SuperKeyword) {
            thisArg = createThis();
            target = languageVersion < ScriptTarget.ES2015 ? createIdentifier("_super", /*location*/ callee) : <PrimaryExpression>callee;
        }
        else {
            switch (callee.kind) {
                case SyntaxKind.PropertyAccessExpression: {
                    if (shouldBeCapturedInTempVariable((<PropertyAccessExpression>callee).expression, cacheIdentifiers)) {
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
                    if (shouldBeCapturedInTempVariable((<ElementAccessExpression>callee).expression, cacheIdentifiers)) {
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
        if (isQualifiedName(node)) {
            const left = createExpressionFromEntityName(node.left);
            const right = getMutableClone(node.right);
            return createPropertyAccess(left, right, /*location*/ node);
        }
        else {
            return getMutableClone(node);
        }
    }

    export function createExpressionForPropertyName(memberName: PropertyName): Expression {
        if (isIdentifier(memberName)) {
            return createLiteral(memberName, /*location*/ undefined);
        }
        else if (isComputedPropertyName(memberName)) {
            return getMutableClone(memberName.expression);
        }
        else {
            return getMutableClone(memberName);
        }
    }

    export function createExpressionForObjectLiteralElementLike(node: ObjectLiteralExpression, property: ObjectLiteralElementLike, receiver: Expression): Expression {
        switch (property.kind) {
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
                return createExpressionForAccessorDeclaration(node.properties, <AccessorDeclaration>property, receiver, node.multiLine);
            case SyntaxKind.PropertyAssignment:
                return createExpressionForPropertyAssignment(<PropertyAssignment>property, receiver);
            case SyntaxKind.ShorthandPropertyAssignment:
                return createExpressionForShorthandPropertyAssignment(<ShorthandPropertyAssignment>property, receiver);
            case SyntaxKind.MethodDeclaration:
                return createExpressionForMethodDeclaration(<MethodDeclaration>property, receiver);
        }
    }

    function createExpressionForAccessorDeclaration(properties: NodeArray<Declaration>, property: AccessorDeclaration, receiver: Expression, multiLine: boolean) {
        const { firstAccessor, getAccessor, setAccessor } = getAllAccessorDeclarations(properties, property);
        if (property === firstAccessor) {
            const properties: ObjectLiteralElementLike[] = [];
            if (getAccessor) {
                const getterFunction = createFunctionExpression(
                    getAccessor.modifiers,
                    /*asteriskToken*/ undefined,
                    /*name*/ undefined,
                    /*typeParameters*/ undefined,
                    getAccessor.parameters,
                    /*type*/ undefined,
                    getAccessor.body,
                    /*location*/ getAccessor
                );
                setOriginalNode(getterFunction, getAccessor);
                const getter = createPropertyAssignment("get", getterFunction);
                properties.push(getter);
            }

            if (setAccessor) {
                const setterFunction = createFunctionExpression(
                    setAccessor.modifiers,
                    /*asteriskToken*/ undefined,
                    /*name*/ undefined,
                    /*typeParameters*/ undefined,
                    setAccessor.parameters,
                    /*type*/ undefined,
                    setAccessor.body,
                    /*location*/ setAccessor
                );
                setOriginalNode(setterFunction, setAccessor);
                const setter = createPropertyAssignment("set", setterFunction);
                properties.push(setter);
            }

            properties.push(createPropertyAssignment("enumerable", createLiteral(true)));
            properties.push(createPropertyAssignment("configurable", createLiteral(true)));

            const expression = createCall(
                createPropertyAccess(createIdentifier("Object"), "defineProperty"),
                /*typeArguments*/ undefined,
                [
                    receiver,
                    createExpressionForPropertyName(property.name),
                    createObjectLiteral(properties, /*location*/ undefined, multiLine)
                ],
                /*location*/ firstAccessor
            );

            return aggregateTransformFlags(expression);
        }

        return undefined;
    }

    function createExpressionForPropertyAssignment(property: PropertyAssignment, receiver: Expression) {
        return aggregateTransformFlags(
            setOriginalNode(
                createAssignment(
                    createMemberAccessForPropertyName(receiver, property.name, /*location*/ property.name),
                    property.initializer,
                    /*location*/ property
                ),
                /*original*/ property
            )
        );
    }

    function createExpressionForShorthandPropertyAssignment(property: ShorthandPropertyAssignment, receiver: Expression) {
        return aggregateTransformFlags(
            setOriginalNode(
                createAssignment(
                    createMemberAccessForPropertyName(receiver, property.name, /*location*/ property.name),
                    getSynthesizedClone(property.name),
                    /*location*/ property
                ),
                /*original*/ property
            )
        );
    }

    function createExpressionForMethodDeclaration(method: MethodDeclaration, receiver: Expression) {
        return aggregateTransformFlags(
            setOriginalNode(
                createAssignment(
                    createMemberAccessForPropertyName(receiver, method.name, /*location*/ method.name),
                    setOriginalNode(
                        createFunctionExpression(
                            method.modifiers,
                            method.asteriskToken,
                            /*name*/ undefined,
                            /*typeParameters*/ undefined,
                            method.parameters,
                            /*type*/ undefined,
                            method.body,
                            /*location*/ method
                        ),
                        /*original*/ method
                    ),
                    /*location*/ method
                ),
                /*original*/ method
            )
        );
    }

    /**
     * Gets the local name of a declaration. This is primarily used for declarations that can be
     * referred to by name in the declaration's immediate scope (classes, enums, namespaces). A
     * local name will *never* be prefixed with an module or namespace export modifier like
     * "exports." when emitted as an expression.
     *
     * @param node The declaration.
     * @param allowComments A value indicating whether comments may be emitted for the name.
     * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
     */
    export function getLocalName(node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean) {
        return getName(node, allowComments, allowSourceMaps, EmitFlags.LocalName);
    }

    /**
     * Gets whether an identifier should only be referred to by its local name.
     */
    export function isLocalName(node: Identifier) {
        return (getEmitFlags(node) & EmitFlags.LocalName) !== 0;
    }

    /**
     * Gets the export name of a declaration. This is primarily used for declarations that can be
     * referred to by name in the declaration's immediate scope (classes, enums, namespaces). An
     * export name will *always* be prefixed with an module or namespace export modifier like
     * `"exports."` when emitted as an expression if the name points to an exported symbol.
     *
     * @param node The declaration.
     * @param allowComments A value indicating whether comments may be emitted for the name.
     * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
     */
    export function getExportName(node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean): Identifier {
        return getName(node, allowComments, allowSourceMaps, EmitFlags.ExportName);
    }

    /**
     * Gets whether an identifier should only be referred to by its export representation if the
     * name points to an exported symbol.
     */
    export function isExportName(node: Identifier) {
        return (getEmitFlags(node) & EmitFlags.ExportName) !== 0;
    }

    /**
     * Gets the name of a declaration for use in declarations.
     *
     * @param node The declaration.
     * @param allowComments A value indicating whether comments may be emitted for the name.
     * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
     */
    export function getDeclarationName(node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean) {
        return getName(node, allowComments, allowSourceMaps);
    }

    function getName(node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean, emitFlags?: EmitFlags) {
        if (node.name && isIdentifier(node.name) && !isGeneratedIdentifier(node.name)) {
            const name = getMutableClone(node.name);
            emitFlags |= getEmitFlags(node.name);
            if (!allowSourceMaps) emitFlags |= EmitFlags.NoSourceMap;
            if (!allowComments) emitFlags |= EmitFlags.NoComments;
            if (emitFlags) setEmitFlags(name, emitFlags);
            return name;
        }
        return getGeneratedNameForNode(node);
    }

    /**
     * Gets the exported name of a declaration for use in expressions.
     *
     * An exported name will *always* be prefixed with an module or namespace export modifier like
     * "exports." if the name points to an exported symbol.
     *
     * @param ns The namespace identifier.
     * @param node The declaration.
     * @param allowComments A value indicating whether comments may be emitted for the name.
     * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
     */
    export function getExternalModuleOrNamespaceExportName(ns: Identifier | undefined, node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean): Identifier | PropertyAccessExpression {
        if (ns && hasModifier(node, ModifierFlags.Export)) {
            return getNamespaceMemberName(ns, getName(node), allowComments, allowSourceMaps);
        }
        return getExportName(node, allowComments, allowSourceMaps);
    }

    /**
     * Gets a namespace-qualified name for use in expressions.
     *
     * @param ns The namespace identifier.
     * @param name The name.
     * @param allowComments A value indicating whether comments may be emitted for the name.
     * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
     */
    export function getNamespaceMemberName(ns: Identifier, name: Identifier, allowComments?: boolean, allowSourceMaps?: boolean): PropertyAccessExpression {
        const qualifiedName = createPropertyAccess(ns, nodeIsSynthesized(name) ? name : getSynthesizedClone(name), /*location*/ name);
        let emitFlags: EmitFlags;
        if (!allowSourceMaps) emitFlags |= EmitFlags.NoSourceMap;
        if (!allowComments) emitFlags |= EmitFlags.NoComments;
        if (emitFlags) setEmitFlags(qualifiedName, emitFlags);
        return qualifiedName;
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
     * @param visitor: Optional callback used to visit any custom prologue directives.
     */
    export function addPrologueDirectives(target: Statement[], source: Statement[], ensureUseStrict?: boolean, visitor?: (node: Node) => VisitResult<Node>): number {
        Debug.assert(target.length === 0, "Prologue directives should be at the first statement in the target statements array");
        let foundUseStrict = false;
        let statementOffset = 0;
        const numStatements = source.length;
        while (statementOffset < numStatements) {
            const statement = source[statementOffset];
            if (isPrologueDirective(statement)) {
                if (isUseStrictPrologue(statement as ExpressionStatement)) {
                    foundUseStrict = true;
                }
                target.push(statement);
            }
            else {
                break;
            }
            statementOffset++;
        }
        if (ensureUseStrict && !foundUseStrict) {
            target.push(startOnNewLine(createStatement(createLiteral("use strict"))));
        }
        while (statementOffset < numStatements) {
            const statement = source[statementOffset];
            if (getEmitFlags(statement) & EmitFlags.CustomPrologue) {
                target.push(visitor ? visitNode(statement, visitor, isStatement) : statement);
            }
            else {
                break;
            }
            statementOffset++;
        }
        return statementOffset;
    }

    /**
     * Ensures "use strict" directive is added
     *
     * @param node source file
     */
    export function ensureUseStrict(node: SourceFile): SourceFile {
        let foundUseStrict = false;
        for (const statement of node.statements) {
            if (isPrologueDirective(statement)) {
                if (isUseStrictPrologue(statement as ExpressionStatement)) {
                    foundUseStrict = true;
                    break;
                }
            }
            else {
                break;
            }
        }
        if (!foundUseStrict) {
            const statements: Statement[] = [];
            statements.push(startOnNewLine(createStatement(createLiteral("use strict"))));
            // add "use strict" as the first statement
            return updateSourceFileNode(node, statements.concat(node.statements));
        }
        return node;
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
        if (original) {
            const emitNode = original.emitNode;
            if (emitNode) node.emitNode = mergeEmitNode(emitNode, node.emitNode);
        }
        return node;
    }

    function mergeEmitNode(sourceEmitNode: EmitNode, destEmitNode: EmitNode) {
        const { flags, commentRange, sourceMapRange, tokenSourceMapRanges } = sourceEmitNode;
        if (!destEmitNode && (flags || commentRange || sourceMapRange || tokenSourceMapRanges)) destEmitNode = {};
        if (flags) destEmitNode.flags = flags;
        if (commentRange) destEmitNode.commentRange = commentRange;
        if (sourceMapRange) destEmitNode.sourceMapRange = sourceMapRange;
        if (tokenSourceMapRanges) destEmitNode.tokenSourceMapRanges = mergeTokenSourceMapRanges(tokenSourceMapRanges, destEmitNode.tokenSourceMapRanges);
        return destEmitNode;
    }

    function mergeTokenSourceMapRanges(sourceRanges: Map<TextRange>, destRanges: Map<TextRange>) {
        if (!destRanges) destRanges = createMap<TextRange>();
        copyProperties(sourceRanges, destRanges);
        return destRanges;
    }

    /**
     * Clears any EmitNode entries from parse-tree nodes.
     * @param sourceFile A source file.
     */
    export function disposeEmitNodes(sourceFile: SourceFile) {
        // During transformation we may need to annotate a parse tree node with transient
        // transformation properties. As parse tree nodes live longer than transformation
        // nodes, we need to make sure we reclaim any memory allocated for custom ranges
        // from these nodes to ensure we do not hold onto entire subtrees just for position
        // information. We also need to reset these nodes to a pre-transformation state
        // for incremental parsing scenarios so that we do not impact later emit.
        sourceFile = getSourceFileOfNode(getParseTreeNode(sourceFile));
        const emitNode = sourceFile && sourceFile.emitNode;
        const annotatedNodes = emitNode && emitNode.annotatedNodes;
        if (annotatedNodes) {
            for (const node of annotatedNodes) {
                node.emitNode = undefined;
            }
        }
    }

    /**
     * Associates a node with the current transformation, initializing
     * various transient transformation properties.
     *
     * @param node The node.
     */
    function getOrCreateEmitNode(node: Node) {
        if (!node.emitNode) {
            if (isParseTreeNode(node)) {
                // To avoid holding onto transformation artifacts, we keep track of any
                // parse tree node we are annotating. This allows us to clean them up after
                // all transformations have completed.
                if (node.kind === SyntaxKind.SourceFile) {
                    return node.emitNode = { annotatedNodes: [node] };
                }

                const sourceFile = getSourceFileOfNode(node);
                getOrCreateEmitNode(sourceFile).annotatedNodes.push(node);
            }

            node.emitNode = {};
        }

        return node.emitNode;
    }

    /**
     * Gets flags that control emit behavior of a node.
     *
     * @param node The node.
     */
    export function getEmitFlags(node: Node) {
        const emitNode = node.emitNode;
        return emitNode && emitNode.flags;
    }

    /**
     * Sets flags that control emit behavior of a node.
     *
     * @param node The node.
     * @param emitFlags The NodeEmitFlags for the node.
     */
    export function setEmitFlags<T extends Node>(node: T, emitFlags: EmitFlags) {
        getOrCreateEmitNode(node).flags = emitFlags;
        return node;
    }

    /**
     * Sets a custom text range to use when emitting source maps.
     *
     * @param node The node.
     * @param range The text range.
     */
    export function setSourceMapRange<T extends Node>(node: T, range: TextRange) {
        getOrCreateEmitNode(node).sourceMapRange = range;
        return node;
    }

    /**
     * Sets the TextRange to use for source maps for a token of a node.
     *
     * @param node The node.
     * @param token The token.
     * @param range The text range.
     */
    export function setTokenSourceMapRange<T extends Node>(node: T, token: SyntaxKind, range: TextRange) {
        const emitNode = getOrCreateEmitNode(node);
        const tokenSourceMapRanges = emitNode.tokenSourceMapRanges || (emitNode.tokenSourceMapRanges = createMap<TextRange>());
        tokenSourceMapRanges[token] = range;
        return node;
    }

    /**
     * Sets a custom text range to use when emitting comments.
     */
    export function setCommentRange<T extends Node>(node: T, range: TextRange) {
        getOrCreateEmitNode(node).commentRange = range;
        return node;
    }

    /**
     * Gets a custom text range to use when emitting comments.
     *
     * @param node The node.
     */
    export function getCommentRange(node: Node) {
        const emitNode = node.emitNode;
        return (emitNode && emitNode.commentRange) || node;
    }

    /**
     * Gets a custom text range to use when emitting source maps.
     *
     * @param node The node.
     */
    export function getSourceMapRange(node: Node) {
        const emitNode = node.emitNode;
        return (emitNode && emitNode.sourceMapRange) || node;
    }

    /**
     * Gets the TextRange to use for source maps for a token of a node.
     *
     * @param node The node.
     * @param token The token.
     */
    export function getTokenSourceMapRange(node: Node, token: SyntaxKind) {
        const emitNode = node.emitNode;
        const tokenSourceMapRanges = emitNode && emitNode.tokenSourceMapRanges;
        return tokenSourceMapRanges && tokenSourceMapRanges[token];
    }

    /**
     * Gets the constant value to emit for an expression.
     */
    export function getConstantValue(node: PropertyAccessExpression | ElementAccessExpression) {
        const emitNode = node.emitNode;
        return emitNode && emitNode.constantValue;
    }

    /**
     * Sets the constant value to emit for an expression.
     */
    export function setConstantValue(node: PropertyAccessExpression | ElementAccessExpression, value: number) {
        const emitNode = getOrCreateEmitNode(node);
        emitNode.constantValue = value;
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
            const name = namespaceDeclaration.name;
            return isGeneratedIdentifier(name) ? name : createIdentifier(getSourceTextOfNodeFromSourceFile(sourceFile, namespaceDeclaration.name));
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
