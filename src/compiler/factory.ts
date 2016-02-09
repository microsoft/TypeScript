/// <reference path="core.ts"/>
/// <reference path="utilities.ts"/>

/* @internal */
namespace ts {
    let NodeConstructor: new (kind: SyntaxKind, pos: number, end: number) => Node;
    let SourceFileConstructor: new (kind: SyntaxKind, pos: number, end: number) => Node;

    function createNode(kind: SyntaxKind, location?: TextRange): Node {
        const ConstructorForKind = kind === SyntaxKind.SourceFile
            ? (SourceFileConstructor || (SourceFileConstructor = objectAllocator.getSourceFileConstructor()))
            : (NodeConstructor || (NodeConstructor = objectAllocator.getNodeConstructor()));

        return location
            ? new ConstructorForKind(kind, location.pos, location.end)
            : new ConstructorForKind(kind, /*pos*/ -1, /*end*/ -1);
    }

    export function createNodeArray<T extends Node>(elements?: T[], pos?: number, end?: number): NodeArray<T> {
        const array = <NodeArray<T>>(elements || []);
        array.pos = pos;
        array.end = end;
        array.arrayKind = ArrayKind.NodeArray;
        return array;
    }

    export function createModifiersArray(elements?: Modifier[], pos?: number, end?: number): ModifiersArray {
        const array = <ModifiersArray>(elements || []);
        array.pos = pos;
        array.end = end;
        array.arrayKind = ArrayKind.ModifiersArray;
        array.flags = 0;
        return array;
    }

    export function createSynthesizedNode(kind: SyntaxKind, startsOnNewLine?: boolean): Node {
        const node = <SynthesizedNode>createNode(kind, /*location*/ undefined);
        node.startsOnNewLine = startsOnNewLine;
        return node;
    }

    export function createSynthesizedNodeArray<T extends Node>(elements?: T[]): NodeArray<T> {
        return createNodeArray(elements, /*pos*/ -1, /*end*/ -1);
    }

    export function createSynthesizedModifiersArray(elements?: Modifier[]): ModifiersArray {
        return createModifiersArray(elements, /*pos*/ -1, /*end*/ -1);
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

    export function createReturn(expression?: Expression): ReturnStatement {
        const node = <ReturnStatement>createSynthesizedNode(SyntaxKind.ReturnStatement);
        node.expression = expression;
        return node;
    }

    export function createStatement(expression: Expression): ExpressionStatement {
        const node = <ExpressionStatement>createSynthesizedNode(SyntaxKind.ExpressionStatement);
        node.expression = expression;
        return node;
    }

    export function createVariableStatement(declarationList: VariableDeclarationList): VariableStatement {
        const node = <VariableStatement>createSynthesizedNode(SyntaxKind.VariableStatement);
        node.declarationList = declarationList;
        return node;
    }

    export function createVariableDeclarationList(declarations: VariableDeclaration[]): VariableDeclarationList {
        const node = <VariableDeclarationList>createSynthesizedNode(SyntaxKind.VariableDeclarationList);
        node.declarations = createNodeArray(declarations);
        return node;
    }

    export function createBlock(statements: Statement[]): Block {
        const block = <Block>createSynthesizedNode(SyntaxKind.Block);
        block.statements = createNodeArray(statements);
        return block;
    }
    export function createVariableDeclaration(name: BindingPattern | Identifier, initializer?: Expression, location?: TextRange): VariableDeclaration {
        const node = <VariableDeclaration>createNode(SyntaxKind.VariableDeclaration, location);
        node.name = name;
        node.initializer = initializer;
        return node;
    }

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

    export function createVoid(expression: UnaryExpression) {
        const node = <VoidExpression>createNode(SyntaxKind.VoidExpression);
        node.expression = expression;
        return node;
    }

    export function createVoidZero() {
        return createVoid(createLiteral(0));
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

    export function createConditional(condition: Expression, whenTrue: Expression, whenFalse: Expression) {
        const node = <ConditionalExpression>createNode(SyntaxKind.ConditionalExpression);
        node.condition = condition;
        node.questionToken = createSynthesizedNode(SyntaxKind.QualifiedName);
        node.whenTrue = whenTrue;
        node.colonToken = createSynthesizedNode(SyntaxKind.ColonToken);
        node.whenFalse = whenFalse;
        return node;
    }

    export function createBinary(left: Expression, operator: SyntaxKind, right: Expression, location?: TextRange) {
        const node = <BinaryExpression>createNode(SyntaxKind.BinaryExpression, location);
        node.left = parenthesizeForBinary(left, operator, BinaryOperand.Left);
        node.operatorToken = createSynthesizedNode(operator);
        node.right = parenthesizeForBinary(right, operator, BinaryOperand.Right);
        return node;
    }

    export function createAssignment(left: Expression, right: Expression, location?: TextRange) {
        return createBinary(left, SyntaxKind.EqualsToken, right, location);
    }

    export function createStrictEquality(left: Expression, right: Expression) {
        return createBinary(left, SyntaxKind.EqualsEqualsEqualsToken, right);
    }

    export function createComma(left: Expression, right: Expression) {
        return <Expression>createBinary(left, SyntaxKind.CommaToken, right);
    }

    export function createCall(expression: Expression, argumentsArray: Expression[], location?: TextRange) {
        const node = <CallExpression>createNode(SyntaxKind.CallExpression, location);
        node.expression = parenthesizeForAccess(expression);
        node.arguments = createNodeArray(argumentsArray);
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

    export function parenthesizeExpression(expression: Expression) {
        const node = <ParenthesizedExpression>createNode(SyntaxKind.ParenthesizedExpression);
        node.expression = expression;
        return node;
    }

    export function inlineExpressions(expressions: Expression[]) {
        return reduceLeft(expressions, createComma);
    }

    function coerceIdentifier(value: string | Identifier) {
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
            ? parenthesizeExpression(operand)
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

        return parenthesizeExpression(expr);
    }
}