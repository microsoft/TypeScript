/// <reference path="core.ts"/>
/// <reference path="factory.generated.ts" />
namespace ts {
    let nodeConstructors = new Array<new () => Node>(SyntaxKind.Count);

    export function getNodeConstructor(kind: SyntaxKind): new () => Node {
        return nodeConstructors[kind] || (nodeConstructors[kind] = objectAllocator.getNodeConstructor(kind));
    }

    export function setNodeFlags<T extends Node>(node: T, flags: NodeFlags): T {
        if (!node || flags === undefined) {
            return node;
        }

        node.flags = flags;
        return node;
    }

    export function setTextRange<T extends TextRange>(node: T, range: TextRange): T {
        if (!node || !range) {
            return node;
        }

        node.pos = range.pos;
        node.end = range.end;
        return node;
    }

    export function setModifiers<T extends Node>(node: T, modifiers: Node[]): T {
        if (modifiers) {
            node.modifiers = createModifiersArray(modifiers);
            node.flags |= node.modifiers.flags;
        }

        return node;
    }

    export function setOriginalNode<T extends Node>(node: T, original: Node): T {
        node.original = node;
        return node;
    }

    export function attachCommentRanges<T extends Node>(node: T, leadingCommentRanges: CommentRange[], trailingCommentRanges?: CommentRange[]): T {
        (<SynthesizedNode>node).leadingCommentRanges = leadingCommentRanges;
        (<SynthesizedNode>node).trailingCommentRanges = trailingCommentRanges;
        return node;
    }

    export function startOnNewLine<T extends Node>(node: T): T {
        (<SynthesizedNode>node).startsOnNewLine = true;
        return node;
    }

    export function updateFrom<T extends Node>(oldNode: T, newNode: T): T {
        let flags = oldNode.flags;
        if (oldNode.modifiers) {
            flags &= ~oldNode.modifiers.flags;
        }

        if (newNode.modifiers) {
            flags |= newNode.modifiers.flags;
        }

        newNode.flags = flags;
        newNode.original = oldNode;
        newNode.pos = oldNode.pos;
        newNode.end = oldNode.end;
        newNode.id = oldNode.id;

        //mergeCommentRanges(oldNode, newNode);
        return newNode;
    }

    function mergeCommentRanges(oldNode: Node, newNode: Node) {
        if ((<SynthesizedNode>oldNode).leadingCommentRanges && !(<SynthesizedNode>newNode).leadingCommentRanges) {
            (<SynthesizedNode>newNode).leadingCommentRanges = (<SynthesizedNode>oldNode).leadingCommentRanges;
        }
        if ((<SynthesizedNode>oldNode).trailingCommentRanges && !(<SynthesizedNode>newNode).trailingCommentRanges) {
            (<SynthesizedNode>newNode).trailingCommentRanges = (<SynthesizedNode>oldNode).trailingCommentRanges;
        }
    }

    export function cloneNodeArray<T extends Node>(array: NodeArray<T>): NodeArray<T> {
        return array ? createNodeArray(array.slice(0), /*location*/ array) : undefined;
    }

    export function createSynthesizedNode<T extends Node>(kind: SyntaxKind, startsOnNewLine?: boolean): T {
        let node = createNode<T>(kind);
        if (startsOnNewLine) {
            startOnNewLine(node);
        }
        return node;
    }

    export function createNode<T extends Node>(kind: SyntaxKind, location?: TextRange, flags?: NodeFlags): T {
        let node = <T>new (getNodeConstructor(kind))();
        if (location) {
            node.pos = location.pos;
            node.end = location.end;
        }
        if (flags) {
            node.flags = flags;
        }
        return node;
    }

    export function createSynthesizedNodeArray<T extends Node>(elements?: T[]) {
        return createNodeArray<T>(elements);
    }

    export function createNodeArray<T extends Node>(elements?: T[], location?: TextRange) {
        let nodes = <NodeArray<T>>(elements || []);
        if (location) {
            nodes.pos = location.pos;
            nodes.end = location.end;
        }
        if (nodes.pos === undefined || nodes.end === undefined) {
            nodes.pos = -1;
            nodes.end = -1;
        }

        return nodes;
    }

    export function createModifiersArray(elements?: Node[], location?: TextRange) {
        let modifiers = <ModifiersArray>createNodeArray(elements || [], location);
        if (modifiers.flags === undefined) {
            let flags = 0;
            for (let modifier of modifiers) {
                flags |= modifierToFlag(modifier.kind);
            }

            modifiers.flags = flags;
        }

        return modifiers;
    }
    
    export function createNumericLiteral2(value: number, location?: TextRange, flags?: NodeFlags): LiteralExpression {
        let node = createNumericLiteral(String(value), location, flags);
        return node;
    }

    export function createPropertyAccessExpression2(expression: Expression, name: Identifier, location?: TextRange, flags?: NodeFlags) {
        return createPropertyAccessExpression(parenthesizeForAccess(expression), createNode(SyntaxKind.DotToken), name, location, flags);
    }

    export function createPropertyAccessExpression3(expression: Expression, name: string, location?: TextRange, flags?: NodeFlags) {
        return createPropertyAccessExpression(parenthesizeForAccess(expression), createNode(SyntaxKind.DotToken), createIdentifier(name), location, flags);
    }

    export function makeSynthesized<TNode extends Node>(node: TNode): TNode {
        return nodeIsSynthesized(node) ? node : cloneNode(node);
    }

    const enum BinaryOperandSide {
        Left,
        Right
    }

    function parenthesizeForBinary(operand: Expression, operator: SyntaxKind, side: BinaryOperandSide) {
        // When diagnosing whether the expression needs parentheses, the decision should be based
        // on the innermost expression in a chain of nested type assertions.
        while (operand.kind === SyntaxKind.TypeAssertionExpression || operand.kind === SyntaxKind.AsExpression) {
            operand = (<AssertionExpression>operand).expression;
        }

        // If the resulting expression is already parenthesized, we do not need to do any further processing.
        if (isParenthesizedExpression(operand)) {
            return operand;
        }

        return needsParenthesesForBinary(operand, operator, side)
            ? createParenthesizedExpression(operand)
            : operand;
    }

    function needsParenthesesForBinary(operand: Expression, operator: SyntaxKind, side: BinaryOperandSide) {
        let operandPrecedence = getExpressionPrecedence(operand);
        let operatorPrecedence = getBinaryOperatorPrecedence(operator);
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

    function isRightAssociativeOperandOnLeftHandSide(operand: Expression, side: BinaryOperandSide) {
        return side === BinaryOperandSide.Left
            && getExpressionAssociativity(operand) === Associativity.Right;
    }

    function isModuloOperandOnRightHandSide(operand: Expression, operator: SyntaxKind, side: BinaryOperandSide) {
        return side === BinaryOperandSide.Right
            && operator !== SyntaxKind.PercentToken
            && isBinaryExpression(operand)
            && operand.operatorToken.kind === SyntaxKind.PercentToken;
    }

    export function parenthesizeForAccess(expr: Expression): LeftHandSideExpression {
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

        return createParenthesizedExpression(expr);
    }

    export function createCallExpression2(expression: Expression, _arguments?: Expression[], location?: TextRange, flags?: NodeFlags) {
        return createCallExpression(parenthesizeForAccess(expression), undefined, _arguments, location, flags);
    }

    export function createPropertyAssignment2(name: string, initializer: Expression) {
        return createPropertyAssignment(createIdentifier(name), initializer);
    }

    export function createAssignmentExpression(left: Expression, right: Expression) {
        return createBinaryExpression2(left, SyntaxKind.EqualsToken, right);
    }

    export function createStrictEqualityExpression(left: Expression, right: Expression) {
        return createBinaryExpression2(left, SyntaxKind.EqualsEqualsEqualsToken, right);
    }

    export function createStrictInequalityExpression(left: Expression, right: Expression) {
        return createBinaryExpression2(left, SyntaxKind.ExclamationEqualsEqualsToken, right);
    }

    export function createLogicalAndExpression(left: Expression, right: Expression) {
        return createBinaryExpression2(left, SyntaxKind.AmpersandAmpersandToken, right);
    }

    export function createLogicalOrExpression(left: Expression, right: Expression) {
        return createBinaryExpression2(left, SyntaxKind.BarBarToken, right);
    }

    export function createLessThanExpression(left: Expression, right: Expression, location?: TextRange) {
        return createBinaryExpression2(left, SyntaxKind.LessThanToken, right, location);
    }

    export function createAddExpression(left: Expression, right: Expression) {
        return createBinaryExpression2(left, SyntaxKind.PlusToken, right);
    }

    export function createSubtractExpression(left: Expression, right: Expression) {
        return createBinaryExpression2(left, SyntaxKind.MinusToken, right);
    }

    export function createCommaExpression(left: Expression, right: Expression) {
        return createBinaryExpression2(left, SyntaxKind.CommaToken, right);
    }

    export function createBinaryExpression2(left: Expression, operator: SyntaxKind, right: Expression, location?: TextRange) {
        return createBinaryExpression(parenthesizeForBinary(left, operator, BinaryOperandSide.Left), createNode(operator), parenthesizeForBinary(right, operator, BinaryOperandSide.Right), location);
    }

    export function createConditionalExpression2(condition: Expression, whenTrue: Expression, whenFalse: Expression, location?: TextRange, flags?: NodeFlags) {
        return createConditionalExpression(condition, createNode(SyntaxKind.QuestionToken), whenTrue, createNode(SyntaxKind.ColonToken), whenFalse, location, flags);
    }

    export function createParameter2(name: BindingPattern | Identifier, initializer?: Expression, location?: TextRange, flags?: NodeFlags) {
        return createParameter(undefined, undefined, undefined, name, undefined, undefined, initializer, location, flags);
    }

    export function createParameter3(name: string) {
        return createParameter2(createIdentifier(name));
    }

    export function createRestParameter(name: Identifier, location?: TextRange, flags?: NodeFlags) {
        return createParameter(undefined, undefined, createNode(SyntaxKind.DotDotDotToken), name, undefined, undefined, undefined, location, flags);
    }

    export function createVariableDeclarationList2(name: Identifier | BindingPattern, initializer?: Expression) {
        return createVariableDeclarationList([createVariableDeclaration2(name, initializer)]);
    }

    export function createVariableDeclaration2(name: Identifier | BindingPattern, initializer?: Expression, location?: TextRange, flags?: NodeFlags) {
        return createVariableDeclaration(name, undefined, initializer, location, flags);
    }

    export function createVariableStatement2(declarationList: VariableDeclarationList, location?: TextRange, flags?: NodeFlags) {
        return createVariableStatement(undefined, undefined, declarationList, location, flags);
    }

    export function createVariableStatement3(name: Identifier | BindingPattern, initializer?: Expression, location?: TextRange, flags?: NodeFlags) {
        let varDecl = createVariableDeclaration2(name, initializer);
        let varDeclList = createVariableDeclarationList([varDecl], undefined, flags & (NodeFlags.Let | NodeFlags.Const));
        return createVariableStatement2(varDeclList, location, flags & ~(NodeFlags.Let | NodeFlags.Const));
    }

    export function createLetStatement(name: Identifier, initializer: Expression, location?: TextRange, exported?: boolean) {
        return createVariableStatement3(name, initializer, location, exported ? NodeFlags.Let | NodeFlags.Export : NodeFlags.Let);
    }

    export function createExportDefaultStatement(expression: Expression): ExportAssignment {
        return createExportAssignment(undefined, undefined, expression);
    }

    function createClassHeritageClauses(baseTypeNode: ExpressionWithTypeArguments) {
        return baseTypeNode ? [createHeritageClause(SyntaxKind.ExtendsKeyword, [baseTypeNode])] : undefined;
    }

    export function createClassDeclaration2(name: Identifier, baseTypeNode: ExpressionWithTypeArguments, members: ClassElement[], location?: TextRange, flags?: NodeFlags): ClassDeclaration {
        return createClassDeclaration(undefined, undefined, name, undefined, createClassHeritageClauses(baseTypeNode), members, location, flags);
    }

    export function createClassExpression2(name: Identifier, baseTypeNode: ExpressionWithTypeArguments, members: ClassElement[]): ClassExpression {
        return createClassExpression(undefined, undefined, name, undefined, createClassHeritageClauses(baseTypeNode), members);
    }

    export function createClassExpression3(baseTypeNode: ExpressionWithTypeArguments, members: ClassElement[]): ClassExpression {
        return createClassExpression2(undefined, baseTypeNode, members);
    }

    export function createConstructor2(parameters: Array<ParameterDeclaration>, body: Block, location?: TextRange, flags?: NodeFlags): ConstructorDeclaration {
        return createConstructor(undefined, undefined, parameters, undefined, body, location, flags);
    }

    export function createMethodDeclaration2(name: PropertyName, parameters: Array<ParameterDeclaration>, body: Block, location?: TextRange, flags?: NodeFlags): MethodDeclaration {
        return createMethodDeclaration(undefined, undefined, undefined, name, undefined, parameters, undefined, body, location, flags);
    }

    export function createGetAccessor2(name: PropertyName, parameters: Array<ParameterDeclaration>, body: Block, location?: TextRange, flags?: NodeFlags): GetAccessorDeclaration {
        return createGetAccessor(undefined, undefined, name, parameters, undefined, body, location, flags);
    }

    export function createSetAccessor2(name: PropertyName, parameters: Array<ParameterDeclaration>, body: Block, location?: TextRange, flags?: NodeFlags): SetAccessorDeclaration {
        return createSetAccessor(undefined, undefined, name, parameters, undefined, body, location, flags);
    }

    export function createFunctionDeclaration2(name: Identifier, parameters: ParameterDeclaration[], body: Block, location?: TextRange, flags?: NodeFlags) {
        return createFunctionDeclaration(undefined, undefined, undefined, name, undefined, parameters, undefined, body, location, flags);
    }

    export function createFunctionDeclaration3(asteriskToken: Node, name: Identifier, parameters: ParameterDeclaration[], body: Block, location?: TextRange, flags?: NodeFlags) {
        return createFunctionDeclaration(undefined, undefined, asteriskToken, name, undefined, parameters, undefined, body, location, flags);
    }

    export function createFunctionExpression2(name: Identifier, parameters: ParameterDeclaration[], body: Block, location?: TextRange, flags?: NodeFlags) {
        return createFunctionExpression(undefined, undefined, undefined, name, undefined, parameters, undefined, body, location, flags);
    }

    export function createFunctionExpression3(parameters: ParameterDeclaration[], body: Block, location?: TextRange, flags?: NodeFlags) {
        return createFunctionExpression(undefined, undefined, undefined, undefined, undefined, parameters, undefined, body, location, flags);
    }

    export function createFunctionExpression4(asteriskToken: Node, name: Identifier, parameters: ParameterDeclaration[], body: Block, location?: TextRange, flags?: NodeFlags) {
        return createFunctionExpression(undefined, undefined, asteriskToken, name, undefined, parameters, undefined, body, location, flags);
    }

    export function createArrowFunction2(parameters: ParameterDeclaration[], body: Block | Expression, location?: TextRange, flags?: NodeFlags) {
        return createArrowFunction(undefined, undefined, undefined, parameters, undefined, createNode(SyntaxKind.EqualsGreaterThanToken), body, location, flags);
    }

    export function createGeneratorFunctionExpression(parameters: ParameterDeclaration[], body: Block, location?: TextRange, flags?: NodeFlags) {
        return createFunctionExpression(undefined, undefined, createNode(SyntaxKind.AsteriskToken), undefined, undefined, parameters, undefined, body, location, flags);
    }

    export function createVoidZeroExpression(location?: TextRange, flags?: NodeFlags): VoidExpression {
        return createVoidExpression(createNumericLiteral2(0), location, flags);
    }

    export function createPropertyOrElementAccessExpression(expression: Expression, propName: Identifier | LiteralExpression, location?: TextRange, flags?: NodeFlags): LeftHandSideExpression {
        return isIdentifier(propName)
            ? createPropertyAccessExpression2(expression, makeSynthesized(propName), location, flags)
            : createElementAccessExpression2(expression, makeSynthesized(propName), location, flags);
    }

    export function createElementAccessExpression2(expression: Expression, argumentExpression: Expression, location?: TextRange, flags?: NodeFlags): ElementAccessExpression {
        return createElementAccessExpression(parenthesizeForAccess(expression), argumentExpression, location, flags);
    }

    export function createElementAccessExpression3(expression: Expression, index: number, location?: TextRange, flags?: NodeFlags): ElementAccessExpression {
        return createElementAccessExpression2(expression, createNumericLiteral2(index), location, flags);
    }

    export function createConcatCall(value: Expression, _arguments: Expression[]) {
        return createCallExpression2(createPropertyAccessExpression3(value, "concat"), _arguments);
    }

    export function createSliceCall(value: Expression, sliceIndex?: number, location?: TextRange, flags?: NodeFlags): CallExpression {
        let sliceArguments: Expression[] = typeof sliceIndex === "number" ? [createNumericLiteral2(sliceIndex)] : [];
        return createCallExpression2(createPropertyAccessExpression3(value, "slice"), sliceArguments, location, flags);
    }

    export function createCallCall(target: Expression, thisArg: Expression, _arguments: Expression[], location?: TextRange, flags?: NodeFlags) {
        return createCallExpression2(createPropertyAccessExpression3(target, "call"), [thisArg, ..._arguments], location, flags);
    }

    export function createApplyCall(target: Expression, thisArg: Expression, _arguments: Expression, location?: TextRange, flags?: NodeFlags) {
        return createCallExpression2(createPropertyAccessExpression3(target, "apply"), [thisArg, _arguments], location, flags);
    }

    export function createExtendsHelperCall(name: Identifier) {
        return createCallExpression2(createIdentifier("__extends"), [name, createIdentifier("_super")]);
    }

    export function createAwaiterHelperCall(hasLexicalArguments: boolean, promiseConstructor: EntityName | Expression, body: Block) {
        let argumentsExpr = hasLexicalArguments ? createIdentifier("arguments") : createVoidZeroExpression();
        let promiseExpr = promiseConstructor ? convertEntityNameToExpression(promiseConstructor) : createIdentifier("Promise");
        return createCallExpression2(createIdentifier("__awaiter"), [createThisKeyword(), argumentsExpr, promiseExpr, createGeneratorFunctionExpression([], body)]);
    }

    export function convertEntityNameToExpression(node: EntityName | Expression): Expression {
        return isQualifiedName(node) ? createPropertyAccessExpression2(convertEntityNameToExpression(node.left), cloneNode(node.right)) : cloneNode(node);
    }

    export function createDecorateHelperCall(decoratorExpressions: Expression[], target: Expression, memberName?: Expression, descriptor?: Expression) {
        return createCallExpression2(createIdentifier("__decorate"), append([createArrayLiteralExpression(decoratorExpressions), target], memberName, descriptor));
    }

    export function createParamHelperCall(parameterIndex: number, decoratorExpression: Expression) {
        return createCallExpression2(createIdentifier("__param"), [createNumericLiteral2(parameterIndex), decoratorExpression]);
    }

    export function createMetadataHelperCall(metadataKey: string, metadataValue: Expression) {
        return createCallExpression2(createIdentifier("__metadata"), [createStringLiteral(metadataKey), metadataValue]);
    }

    export function createDefinePropertyCall(target: Expression, memberName: Expression, descriptor: Expression, location?: TextRange) {
        return createCallExpression2(createPropertyAccessExpression3(createIdentifier("Object"), "defineProperty"), [target, memberName, descriptor], location);
    }

    export function createDefinePropertyCall2(target: Expression, memberName: Expression, getter: Expression, setter: Expression, location?: TextRange) {
        let properties: ObjectLiteralElement[] = [];
        if (getter) {
            let get = createPropertyAssignment2("get", getter);
            properties.push(get);
            startOnNewLine(get);
        }
        if (setter) {
            let set = createPropertyAssignment2("set", setter)
            startOnNewLine(set);
            properties.push(set);
        }

        let enumerable = createPropertyAssignment2("enumerable", createTrueKeyword());
        startOnNewLine(enumerable);
        properties.push(enumerable);

        let configurable = createPropertyAssignment2("configurable", createTrueKeyword());
        startOnNewLine(configurable);
        properties.push(configurable);

        let descriptor = createObjectLiteralExpression(properties);
        return createDefinePropertyCall(target, memberName, descriptor, location);
    }

    export function createGetOwnPropertyDescriptorCall(target: Expression, memberName: Expression) {
        return createCallExpression2(createPropertyAccessExpression3(createIdentifier("Object"), "getOwnPropertyDescriptor"), [target, memberName]);
    }

    export function createReactCreateElementCall(tagName: Expression, props: Expression, children: Expression[]): LeftHandSideExpression {
        let args: Expression[] = [tagName];
        if (props) {
            args.push(props)
        }
        if (children && children.length > 0) {
            if (!props) {
                args.push(<Expression>createNode(SyntaxKind.NullKeyword));
            }

            args.push(...children);
        }
        return createCallExpression2(createPropertyAccessExpression3(createIdentifier("React"), "createElement"), args);
    }

    export function createReactSpreadCall(segments: Expression[]): LeftHandSideExpression {
        return createCallExpression2(createPropertyAccessExpression3(createIdentifier("React"), "__spread"), segments);
    }

    export function createDefaultValueCheck(value: Expression, defaultValue: Expression, ensureIdentifier: (value: Expression, reuseIdentifierExpressions: boolean) => Expression, location?: TextRange, flags?: NodeFlags): Expression {
        // The value expression will be evaluated twice, so for anything but a simple identifier
        // we need to generate a temporary variable
        value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ true);

        // <value> === void 0 ? <defaultValue> : <value>
        return createConditionalExpression2(createStrictEqualityExpression(value, createVoidZeroExpression()), defaultValue, value, location, flags);
    }

    export function createMemberAccessForPropertyName(target: Expression, memberName: PropertyName, location?: TextRange, flags?: NodeFlags): MemberExpression {
        return isIdentifier(memberName) ? createPropertyAccessExpression2(target, cloneNode(memberName), location, flags)
             : isComputedPropertyName(memberName) ? createElementAccessExpression2(target, cloneNode(memberName.expression), location, flags)
             : createElementAccessExpression2(target, cloneNode(memberName), location, flags);
    }

    export function createExpressionForPropertyName(memberName: PropertyName, location?: TextRange): Expression {
        return isIdentifier(memberName) ? createStringLiteral(memberName.text, location)
             : isComputedPropertyName(memberName) ? cloneNode(memberName.expression, location)
             : cloneNode(memberName, location);
    }

    export function makeFunctionBody(body: ConciseBody): FunctionBody {
        return isBlock(body) ? body : createBlock([createReturnStatement(body)]);
    }

    export function inlineExpressions(expressions: Expression[]) {
        return reduceLeft(expressions, createCommaExpression);
    }

    export function isDeclarationStatement(node: Node): node is DeclarationStatement {
        if (node) {
            switch (node.kind) {
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.MissingDeclaration:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.TypeAliasDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.ImportEqualsDeclaration:
                case SyntaxKind.ExportDeclaration:
                case SyntaxKind.ExportAssignment:
                    return true;
            }
        }
        return false;
    }
}