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
     *
     * @param node The node to clone.
     */
    export function getMutableNode<T extends Node>(node: T): T {
        return cloneNode<T>(node, node, node.flags, node.parent, node);
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

    export function createTempVariable(tempKind: TempVariableKind): Identifier {
        const name = <Identifier>createNode(SyntaxKind.Identifier);
        name.tempKind = tempKind;
        getNodeId(name);
        return name;
    }

    export function createLiteral(value: string): StringLiteral;
    export function createLiteral(value: number): LiteralExpression;
    export function createLiteral(value: string | number | boolean): PrimaryExpression;
    export function createLiteral(value: string | number | boolean): PrimaryExpression {
        if (typeof value === "number") {
            const node = <LiteralExpression>createNode(SyntaxKind.NumericLiteral);
            node.text = value.toString();
            return node;
        }
        else if (typeof value === "boolean") {
            return <PrimaryExpression>createNode(value ? SyntaxKind.TrueKeyword : SyntaxKind.FalseKeyword);
        }
        else {
            const node = <StringLiteral>createNode(SyntaxKind.StringLiteral);
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

    export function createPropertyAccess(expression: Expression, name: string | Identifier) {
        const node = <PropertyAccessExpression>createNode(SyntaxKind.PropertyAccessExpression);
        node.expression = parenthesizeForAccess(expression);
        node.dotToken = createSynthesizedNode(SyntaxKind.DotToken);
        node.name = typeof name === "string" ? createIdentifier(name) : name;
        return node;
    }

    export function createElementAccess(expression: Expression, index: number | Expression) {
        const node = <ElementAccessExpression>createNode(SyntaxKind.ElementAccessExpression);
        node.expression = parenthesizeForAccess(expression);
        node.argumentExpression = typeof index === "number" ? createLiteral(index) : index;
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
        node.left = parenthesizeBinaryOperand(operator, left, /*isLeftSideOfBinary*/ true);
        node.operatorToken = createSynthesizedNode(operator);
        node.right = parenthesizeBinaryOperand(operator, right, /*isLeftSideOfBinary*/ false);
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

    export function createCall(expression: Expression, argumentsArray: Expression[]) {
        const node = <CallExpression>createNode(SyntaxKind.CallExpression);
        node.expression = parenthesizeForAccess(expression);
        node.arguments = createNodeArray(argumentsArray);
        return node;
    }

    export function createArraySlice(array: Expression, start?: number | Expression) {
        const argumentsList: Expression[] = [];
        if (start !== undefined) {
            argumentsList.push(typeof start === "number" ? createLiteral(start) : start);
        }

        return createCall(createPropertyAccess(array, "slice"), argumentsList);
    }

    export function parenthesizeExpression(expression: Expression) {
        const node = <ParenthesizedExpression>createNode(SyntaxKind.ParenthesizedExpression);
        node.expression = expression;
        return node;
    }

    export function inlineExpressions(expressions: Expression[]) {
        return reduceLeft(expressions, createComma);
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
    function parenthesizeBinaryOperand(binaryOperator: SyntaxKind, operand: Expression, isLeftSideOfBinary: boolean) {
        // When diagnosing whether the expression needs parentheses, the decision should be based
        // on the innermost expression in a chain of nested type assertions.
        operand = skipAssertions(operand);

        // If the resulting expression is already parenthesized, we do not need to do any further processing.
        if (operand.kind === SyntaxKind.ParenthesizedExpression) {
            return operand;
        }

        return binaryOperandNeedsParentheses(binaryOperator, operand, isLeftSideOfBinary)
            ? parenthesizeExpression(operand)
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
    function parenthesizeForAccess(expr: Expression): LeftHandSideExpression {
        // When diagnosing whether the expression needs parentheses, the decision should be based
        // on the innermost expression in a chain of nested type assertions.
        expr = skipAssertions(expr);

        // isLeftHandSideExpression is almost the correct criterion for when it is not necessary
        // to parenthesize the expression before a dot. The known exceptions are:
        //
        //    NewExpression:
        //       new C.x        -> not the same as (new C).x
        //    NumericLiteral
        //       1.x            -> not the same as (1).x
        //
        if (isLeftHandSideExpression(expr) &&
            expr.kind !== SyntaxKind.NewExpression &&
            expr.kind !== SyntaxKind.NumericLiteral) {
            return expr;
        }

        return parenthesizeExpression(expr);
    }

    /**
     * Skips past any TypeAssertionExpression or AsExpression nodes to their inner expression.
     *
     * @param node The expression node.
     */
    function skipAssertions(node: Expression) {
        while (node.kind === SyntaxKind.TypeAssertionExpression || node.kind === SyntaxKind.AsExpression) {
            node = (<AssertionExpression>node).expression;
        }

        return node;
    }
}