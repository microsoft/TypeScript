import * as ts from "../_namespaces/ts";

/** @internal */
export function createParenthesizerRules(factory: ts.NodeFactory): ts.ParenthesizerRules {
    interface BinaryPlusExpression extends ts.BinaryExpression {
        cachedLiteralKind: ts.SyntaxKind;
    }

    let binaryLeftOperandParenthesizerCache: ts.ESMap<ts.BinaryOperator, (node: ts.Expression) => ts.Expression> | undefined;
    let binaryRightOperandParenthesizerCache: ts.ESMap<ts.BinaryOperator, (node: ts.Expression) => ts.Expression> | undefined;

    return {
        getParenthesizeLeftSideOfBinaryForOperator,
        getParenthesizeRightSideOfBinaryForOperator,
        parenthesizeLeftSideOfBinary,
        parenthesizeRightSideOfBinary,
        parenthesizeExpressionOfComputedPropertyName,
        parenthesizeConditionOfConditionalExpression,
        parenthesizeBranchOfConditionalExpression,
        parenthesizeExpressionOfExportDefault,
        parenthesizeExpressionOfNew,
        parenthesizeLeftSideOfAccess,
        parenthesizeOperandOfPostfixUnary,
        parenthesizeOperandOfPrefixUnary,
        parenthesizeExpressionsOfCommaDelimitedList,
        parenthesizeExpressionForDisallowedComma,
        parenthesizeExpressionOfExpressionStatement,
        parenthesizeConciseBodyOfArrowFunction,
        parenthesizeCheckTypeOfConditionalType,
        parenthesizeExtendsTypeOfConditionalType,
        parenthesizeConstituentTypesOfUnionType,
        parenthesizeConstituentTypeOfUnionType,
        parenthesizeConstituentTypesOfIntersectionType,
        parenthesizeConstituentTypeOfIntersectionType,
        parenthesizeOperandOfTypeOperator,
        parenthesizeOperandOfReadonlyTypeOperator,
        parenthesizeNonArrayTypeOfPostfixType,
        parenthesizeElementTypesOfTupleType,
        parenthesizeElementTypeOfTupleType,
        parenthesizeTypeOfOptionalType,
        parenthesizeTypeArguments,
        parenthesizeLeadingTypeArgument,
    };

    function getParenthesizeLeftSideOfBinaryForOperator(operatorKind: ts.BinaryOperator) {
        binaryLeftOperandParenthesizerCache ||= new ts.Map();
        let parenthesizerRule = binaryLeftOperandParenthesizerCache.get(operatorKind);
        if (!parenthesizerRule) {
            parenthesizerRule = node => parenthesizeLeftSideOfBinary(operatorKind, node);
            binaryLeftOperandParenthesizerCache.set(operatorKind, parenthesizerRule);
        }
        return parenthesizerRule;
    }

    function getParenthesizeRightSideOfBinaryForOperator(operatorKind: ts.BinaryOperator) {
        binaryRightOperandParenthesizerCache ||= new ts.Map();
        let parenthesizerRule = binaryRightOperandParenthesizerCache.get(operatorKind);
        if (!parenthesizerRule) {
            parenthesizerRule = node => parenthesizeRightSideOfBinary(operatorKind, /*leftSide*/ undefined, node);
            binaryRightOperandParenthesizerCache.set(operatorKind, parenthesizerRule);
        }
        return parenthesizerRule;
    }

    /**
     * Determines whether the operand to a BinaryExpression needs to be parenthesized.
     *
     * @param binaryOperator The operator for the BinaryExpression.
     * @param operand The operand for the BinaryExpression.
     * @param isLeftSideOfBinary A value indicating whether the operand is the left side of the
     *                           BinaryExpression.
     */
    function binaryOperandNeedsParentheses(binaryOperator: ts.SyntaxKind, operand: ts.Expression, isLeftSideOfBinary: boolean, leftOperand: ts.Expression | undefined) {
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
        const binaryOperatorPrecedence = ts.getOperatorPrecedence(ts.SyntaxKind.BinaryExpression, binaryOperator);
        const binaryOperatorAssociativity = ts.getOperatorAssociativity(ts.SyntaxKind.BinaryExpression, binaryOperator);
        const emittedOperand = ts.skipPartiallyEmittedExpressions(operand);
        if (!isLeftSideOfBinary && operand.kind === ts.SyntaxKind.ArrowFunction && binaryOperatorPrecedence > ts.OperatorPrecedence.Assignment) {
            // We need to parenthesize arrow functions on the right side to avoid it being
            // parsed as parenthesized expression: `a && (() => {})`
            return true;
        }
        const operandPrecedence = ts.getExpressionPrecedence(emittedOperand);
        switch (ts.compareValues(operandPrecedence, binaryOperatorPrecedence)) {
            case ts.Comparison.LessThan:
                // If the operand is the right side of a right-associative binary operation
                // and is a yield expression, then we do not need parentheses.
                if (!isLeftSideOfBinary
                    && binaryOperatorAssociativity === ts.Associativity.Right
                    && operand.kind === ts.SyntaxKind.YieldExpression) {
                    return false;
                }

                return true;

            case ts.Comparison.GreaterThan:
                return false;

            case ts.Comparison.EqualTo:
                if (isLeftSideOfBinary) {
                    // No need to parenthesize the left operand when the binary operator is
                    // left associative:
                    //  (a*b)/x    -> a*b/x
                    //  (a**b)/x   -> a**b/x
                    //
                    // Parentheses are needed for the left operand when the binary operator is
                    // right associative:
                    //  (a/b)**x   -> (a/b)**x
                    //  (a**b)**x  -> (a**b)**x
                    return binaryOperatorAssociativity === ts.Associativity.Right;
                }
                else {
                    if (ts.isBinaryExpression(emittedOperand)
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
                        if (binaryOperator === ts.SyntaxKind.PlusToken) {
                            const leftKind = leftOperand ? getLiteralKindOfBinaryPlusOperand(leftOperand) : ts.SyntaxKind.Unknown;
                            if (ts.isLiteralKind(leftKind) && leftKind === getLiteralKindOfBinaryPlusOperand(emittedOperand)) {
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
                    const operandAssociativity = ts.getExpressionAssociativity(emittedOperand);
                    return operandAssociativity === ts.Associativity.Left;
                }
        }
    }

    /**
     * Determines whether a binary operator is mathematically associative.
     *
     * @param binaryOperator The binary operator.
     */
    function operatorHasAssociativeProperty(binaryOperator: ts.SyntaxKind) {
        // The following operators are associative in JavaScript:
        //  (a*b)*c     -> a*(b*c)  -> a*b*c
        //  (a|b)|c     -> a|(b|c)  -> a|b|c
        //  (a&b)&c     -> a&(b&c)  -> a&b&c
        //  (a^b)^c     -> a^(b^c)  -> a^b^c
        //  (a,b),c     -> a,(b,c)  -> a,b,c
        //
        // While addition is associative in mathematics, JavaScript's `+` is not
        // guaranteed to be associative as it is overloaded with string concatenation.
        return binaryOperator === ts.SyntaxKind.AsteriskToken
            || binaryOperator === ts.SyntaxKind.BarToken
            || binaryOperator === ts.SyntaxKind.AmpersandToken
            || binaryOperator === ts.SyntaxKind.CaretToken
            || binaryOperator === ts.SyntaxKind.CommaToken;
    }

    /**
     * This function determines whether an expression consists of a homogeneous set of
     * literal expressions or binary plus expressions that all share the same literal kind.
     * It is used to determine whether the right-hand operand of a binary plus expression can be
     * emitted without parentheses.
     */
    function getLiteralKindOfBinaryPlusOperand(node: ts.Expression): ts.SyntaxKind {
        node = ts.skipPartiallyEmittedExpressions(node);

        if (ts.isLiteralKind(node.kind)) {
            return node.kind;
        }

        if (node.kind === ts.SyntaxKind.BinaryExpression && (node as ts.BinaryExpression).operatorToken.kind === ts.SyntaxKind.PlusToken) {
            if ((node as BinaryPlusExpression).cachedLiteralKind !== undefined) {
                return (node as BinaryPlusExpression).cachedLiteralKind;
            }

            const leftKind = getLiteralKindOfBinaryPlusOperand((node as ts.BinaryExpression).left);
            const literalKind = ts.isLiteralKind(leftKind)
                && leftKind === getLiteralKindOfBinaryPlusOperand((node as ts.BinaryExpression).right)
                    ? leftKind
                    : ts.SyntaxKind.Unknown;

            (node as BinaryPlusExpression).cachedLiteralKind = literalKind;
            return literalKind;
        }

        return ts.SyntaxKind.Unknown;
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
    function parenthesizeBinaryOperand(binaryOperator: ts.SyntaxKind, operand: ts.Expression, isLeftSideOfBinary: boolean, leftOperand?: ts.Expression) {
        const skipped = ts.skipPartiallyEmittedExpressions(operand);

        // If the resulting expression is already parenthesized, we do not need to do any further processing.
        if (skipped.kind === ts.SyntaxKind.ParenthesizedExpression) {
            return operand;
        }

        return binaryOperandNeedsParentheses(binaryOperator, operand, isLeftSideOfBinary, leftOperand)
            ? factory.createParenthesizedExpression(operand)
            : operand;
    }


    function parenthesizeLeftSideOfBinary(binaryOperator: ts.SyntaxKind, leftSide: ts.Expression): ts.Expression {
        return parenthesizeBinaryOperand(binaryOperator, leftSide, /*isLeftSideOfBinary*/ true);
    }

    function parenthesizeRightSideOfBinary(binaryOperator: ts.SyntaxKind, leftSide: ts.Expression | undefined, rightSide: ts.Expression): ts.Expression {
        return parenthesizeBinaryOperand(binaryOperator, rightSide, /*isLeftSideOfBinary*/ false, leftSide);
    }

    function parenthesizeExpressionOfComputedPropertyName(expression: ts.Expression): ts.Expression {
        return ts.isCommaSequence(expression) ? factory.createParenthesizedExpression(expression) : expression;
    }

    function parenthesizeConditionOfConditionalExpression(condition: ts.Expression): ts.Expression {
        const conditionalPrecedence = ts.getOperatorPrecedence(ts.SyntaxKind.ConditionalExpression, ts.SyntaxKind.QuestionToken);
        const emittedCondition = ts.skipPartiallyEmittedExpressions(condition);
        const conditionPrecedence = ts.getExpressionPrecedence(emittedCondition);
        if (ts.compareValues(conditionPrecedence, conditionalPrecedence) !== ts.Comparison.GreaterThan) {
            return factory.createParenthesizedExpression(condition);
        }
        return condition;
    }

    function parenthesizeBranchOfConditionalExpression(branch: ts.Expression): ts.Expression {
        // per ES grammar both 'whenTrue' and 'whenFalse' parts of conditional expression are assignment expressions
        // so in case when comma expression is introduced as a part of previous transformations
        // if should be wrapped in parens since comma operator has the lowest precedence
        const emittedExpression = ts.skipPartiallyEmittedExpressions(branch);
        return ts.isCommaSequence(emittedExpression)
            ? factory.createParenthesizedExpression(branch)
            : branch;
    }

    /**
     *  [Per the spec](https://tc39.github.io/ecma262/#prod-ExportDeclaration), `export default` accepts _AssigmentExpression_ but
     *  has a lookahead restriction for `function`, `async function`, and `class`.
     *
     * Basically, that means we need to parenthesize in the following cases:
     *
     * - BinaryExpression of CommaToken
     * - CommaList (synthetic list of multiple comma expressions)
     * - FunctionExpression
     * - ClassExpression
     */
    function parenthesizeExpressionOfExportDefault(expression: ts.Expression): ts.Expression {
        const check = ts.skipPartiallyEmittedExpressions(expression);
        let needsParens = ts.isCommaSequence(check);
        if (!needsParens) {
            switch (ts.getLeftmostExpression(check, /*stopAtCallExpression*/ false).kind) {
                case ts.SyntaxKind.ClassExpression:
                case ts.SyntaxKind.FunctionExpression:
                    needsParens = true;
            }
        }
        return needsParens ? factory.createParenthesizedExpression(expression) : expression;
    }

    /**
     * Wraps an expression in parentheses if it is needed in order to use the expression
     * as the expression of a `NewExpression` node.
     */
    function parenthesizeExpressionOfNew(expression: ts.Expression): ts.LeftHandSideExpression {
        const leftmostExpr = ts.getLeftmostExpression(expression, /*stopAtCallExpressions*/ true);
        switch (leftmostExpr.kind) {
            case ts.SyntaxKind.CallExpression:
                return factory.createParenthesizedExpression(expression);

            case ts.SyntaxKind.NewExpression:
                return !(leftmostExpr as ts.NewExpression).arguments
                    ? factory.createParenthesizedExpression(expression)
                    : expression as ts.LeftHandSideExpression; // TODO(rbuckton): Verify this assertion holds
        }

        return parenthesizeLeftSideOfAccess(expression);
    }

    /**
     * Wraps an expression in parentheses if it is needed in order to use the expression for
     * property or element access.
     */
    function parenthesizeLeftSideOfAccess(expression: ts.Expression, optionalChain?: boolean): ts.LeftHandSideExpression {
        // isLeftHandSideExpression is almost the correct criterion for when it is not necessary
        // to parenthesize the expression before a dot. The known exception is:
        //
        //    NewExpression:
        //       new C.x        -> not the same as (new C).x
        //
        const emittedExpression = ts.skipPartiallyEmittedExpressions(expression);
        if (ts.isLeftHandSideExpression(emittedExpression)
            && (emittedExpression.kind !== ts.SyntaxKind.NewExpression || (emittedExpression as ts.NewExpression).arguments)
            && (optionalChain || !ts.isOptionalChain(emittedExpression))) {
            // TODO(rbuckton): Verify whether this assertion holds.
            return expression as ts.LeftHandSideExpression;
        }

        // TODO(rbuckton): Verifiy whether `setTextRange` is needed.
        return ts.setTextRange(factory.createParenthesizedExpression(expression), expression);
    }

    function parenthesizeOperandOfPostfixUnary(operand: ts.Expression): ts.LeftHandSideExpression {
        // TODO(rbuckton): Verifiy whether `setTextRange` is needed.
        return ts.isLeftHandSideExpression(operand) ? operand : ts.setTextRange(factory.createParenthesizedExpression(operand), operand);
    }

    function parenthesizeOperandOfPrefixUnary(operand: ts.Expression): ts.UnaryExpression {
        // TODO(rbuckton): Verifiy whether `setTextRange` is needed.
        return ts.isUnaryExpression(operand) ? operand : ts.setTextRange(factory.createParenthesizedExpression(operand), operand);
    }

    function parenthesizeExpressionsOfCommaDelimitedList(elements: ts.NodeArray<ts.Expression>): ts.NodeArray<ts.Expression> {
        const result = ts.sameMap(elements, parenthesizeExpressionForDisallowedComma);
        return ts.setTextRange(factory.createNodeArray(result, elements.hasTrailingComma), elements);
    }

    function parenthesizeExpressionForDisallowedComma(expression: ts.Expression): ts.Expression {
        const emittedExpression = ts.skipPartiallyEmittedExpressions(expression);
        const expressionPrecedence = ts.getExpressionPrecedence(emittedExpression);
        const commaPrecedence = ts.getOperatorPrecedence(ts.SyntaxKind.BinaryExpression, ts.SyntaxKind.CommaToken);
        // TODO(rbuckton): Verifiy whether `setTextRange` is needed.
        return expressionPrecedence > commaPrecedence ? expression : ts.setTextRange(factory.createParenthesizedExpression(expression), expression);
    }

    function parenthesizeExpressionOfExpressionStatement(expression: ts.Expression): ts.Expression {
        const emittedExpression = ts.skipPartiallyEmittedExpressions(expression);
        if (ts.isCallExpression(emittedExpression)) {
            const callee = emittedExpression.expression;
            const kind = ts.skipPartiallyEmittedExpressions(callee).kind;
            if (kind === ts.SyntaxKind.FunctionExpression || kind === ts.SyntaxKind.ArrowFunction) {
                // TODO(rbuckton): Verifiy whether `setTextRange` is needed.
                const updated = factory.updateCallExpression(
                    emittedExpression,
                    ts.setTextRange(factory.createParenthesizedExpression(callee), callee),
                    emittedExpression.typeArguments,
                    emittedExpression.arguments
                );
                return factory.restoreOuterExpressions(expression, updated, ts.OuterExpressionKinds.PartiallyEmittedExpressions);
            }
        }

        const leftmostExpressionKind = ts.getLeftmostExpression(emittedExpression, /*stopAtCallExpressions*/ false).kind;
        if (leftmostExpressionKind === ts.SyntaxKind.ObjectLiteralExpression || leftmostExpressionKind === ts.SyntaxKind.FunctionExpression) {
            // TODO(rbuckton): Verifiy whether `setTextRange` is needed.
            return ts.setTextRange(factory.createParenthesizedExpression(expression), expression);
        }

        return expression;
    }

    function parenthesizeConciseBodyOfArrowFunction(body: ts.Expression): ts.Expression;
    function parenthesizeConciseBodyOfArrowFunction(body: ts.ConciseBody): ts.ConciseBody;
    function parenthesizeConciseBodyOfArrowFunction(body: ts.ConciseBody): ts.ConciseBody {
        if (!ts.isBlock(body) && (ts.isCommaSequence(body) || ts.getLeftmostExpression(body, /*stopAtCallExpressions*/ false).kind === ts.SyntaxKind.ObjectLiteralExpression)) {
            // TODO(rbuckton): Verifiy whether `setTextRange` is needed.
            return ts.setTextRange(factory.createParenthesizedExpression(body), body);
        }

        return body;
    }

    // Type[Extends] :
    //     FunctionOrConstructorType
    //     ConditionalType[?Extends]

    // ConditionalType[Extends] :
    //     UnionType[?Extends]
    //     [~Extends] UnionType[~Extends] `extends` Type[+Extends] `?` Type[~Extends] `:` Type[~Extends]
    //
    // - The check type (the `UnionType`, above) does not allow function, constructor, or conditional types (they must be parenthesized)
    // - The extends type (the first `Type`, above) does not allow conditional types (they must be parenthesized). Function and constructor types are fine.
    // - The true and false branch types (the second and third `Type` non-terminals, above) allow any type
    function parenthesizeCheckTypeOfConditionalType(checkType: ts.TypeNode): ts.TypeNode {
        switch (checkType.kind) {
            case ts.SyntaxKind.FunctionType:
            case ts.SyntaxKind.ConstructorType:
            case ts.SyntaxKind.ConditionalType:
                return factory.createParenthesizedType(checkType);
        }
        return checkType;
    }

    function parenthesizeExtendsTypeOfConditionalType(extendsType: ts.TypeNode): ts.TypeNode {
        switch (extendsType.kind) {
            case ts.SyntaxKind.ConditionalType:
                return factory.createParenthesizedType(extendsType);
        }
        return extendsType;
    }

    // UnionType[Extends] :
    //     `|`? IntersectionType[?Extends]
    //     UnionType[?Extends] `|` IntersectionType[?Extends]
    //
    // - A union type constituent has the same precedence as the check type of a conditional type
    function parenthesizeConstituentTypeOfUnionType(type: ts.TypeNode) {
        switch (type.kind) {
            case ts.SyntaxKind.UnionType: // Not strictly necessary, but a union containing a union should have been flattened
            case ts.SyntaxKind.IntersectionType: // Not strictly necessary, but makes generated output more readable and avoids breaks in DT tests
                return factory.createParenthesizedType(type);
        }
        return parenthesizeCheckTypeOfConditionalType(type);
    }

    function parenthesizeConstituentTypesOfUnionType(members: readonly ts.TypeNode[]): ts.NodeArray<ts.TypeNode> {
        return factory.createNodeArray(ts.sameMap(members, parenthesizeConstituentTypeOfUnionType));
    }

    // IntersectionType[Extends] :
    //     `&`? TypeOperator[?Extends]
    //     IntersectionType[?Extends] `&` TypeOperator[?Extends]
    //
    // - An intersection type constituent does not allow function, constructor, conditional, or union types (they must be parenthesized)
    function parenthesizeConstituentTypeOfIntersectionType(type: ts.TypeNode) {
        switch (type.kind) {
            case ts.SyntaxKind.UnionType:
            case ts.SyntaxKind.IntersectionType: // Not strictly necessary, but an intersection containing an intersection should have been flattened
                return factory.createParenthesizedType(type);
        }
        return parenthesizeConstituentTypeOfUnionType(type);
    }

    function parenthesizeConstituentTypesOfIntersectionType(members: readonly ts.TypeNode[]): ts.NodeArray<ts.TypeNode> {
        return factory.createNodeArray(ts.sameMap(members, parenthesizeConstituentTypeOfIntersectionType));
    }

    // TypeOperator[Extends] :
    //     PostfixType
    //     InferType[?Extends]
    //     `keyof` TypeOperator[?Extends]
    //     `unique` TypeOperator[?Extends]
    //     `readonly` TypeOperator[?Extends]
    //
    function parenthesizeOperandOfTypeOperator(type: ts.TypeNode) {
        switch (type.kind) {
            case ts.SyntaxKind.IntersectionType:
                return factory.createParenthesizedType(type);
        }
        return parenthesizeConstituentTypeOfIntersectionType(type);
    }

    function parenthesizeOperandOfReadonlyTypeOperator(type: ts.TypeNode) {
        switch (type.kind) {
            case ts.SyntaxKind.TypeOperator:
                return factory.createParenthesizedType(type);
        }
        return parenthesizeOperandOfTypeOperator(type);
    }

    // PostfixType :
    //     NonArrayType
    //     NonArrayType [no LineTerminator here] `!` // JSDoc
    //     NonArrayType [no LineTerminator here] `?` // JSDoc
    //     IndexedAccessType
    //     ArrayType
    //
    // IndexedAccessType :
    //     NonArrayType `[` Type[~Extends] `]`
    //
    // ArrayType :
    //     NonArrayType `[` `]`
    //
    function parenthesizeNonArrayTypeOfPostfixType(type: ts.TypeNode) {
        switch (type.kind) {
            case ts.SyntaxKind.InferType:
            case ts.SyntaxKind.TypeOperator:
            case ts.SyntaxKind.TypeQuery: // Not strictly necessary, but makes generated output more readable and avoids breaks in DT tests
                return factory.createParenthesizedType(type);
        }
        return parenthesizeOperandOfTypeOperator(type);
    }

    // TupleType :
    //     `[` Elision? `]`
    //     `[` NamedTupleElementTypes `]`
    //     `[` NamedTupleElementTypes `,` Elision? `]`
    //     `[` TupleElementTypes `]`
    //     `[` TupleElementTypes `,` Elision? `]`
    //
    // NamedTupleElementTypes :
    //     Elision? NamedTupleMember
    //     NamedTupleElementTypes `,` Elision? NamedTupleMember
    //
    // NamedTupleMember :
    //     Identifier `?`? `:` Type[~Extends]
    //     `...` Identifier `:` Type[~Extends]
    //
    // TupleElementTypes :
    //     Elision? TupleElementType
    //     TupleElementTypes `,` Elision? TupleElementType
    //
    // TupleElementType :
    //     Type[~Extends] // NOTE: Needs cover grammar to disallow JSDoc postfix-optional
    //     OptionalType
    //     RestType
    //
    // OptionalType :
    //     Type[~Extends] `?` // NOTE: Needs cover grammar to disallow JSDoc postfix-optional
    //
    // RestType :
    //     `...` Type[~Extends]
    //
    function parenthesizeElementTypesOfTupleType(types: readonly (ts.TypeNode | ts.NamedTupleMember)[]): ts.NodeArray<ts.TypeNode> {
        return factory.createNodeArray(ts.sameMap(types, parenthesizeElementTypeOfTupleType));
    }

    function parenthesizeElementTypeOfTupleType(type: ts.TypeNode | ts.NamedTupleMember): ts.TypeNode {
        if (hasJSDocPostfixQuestion(type)) return factory.createParenthesizedType(type);
        return type;
    }

    function hasJSDocPostfixQuestion(type: ts.TypeNode | ts.NamedTupleMember): boolean {
        if (ts.isJSDocNullableType(type)) return type.postfix;
        if (ts.isNamedTupleMember(type)) return hasJSDocPostfixQuestion(type.type);
        if (ts.isFunctionTypeNode(type) || ts.isConstructorTypeNode(type) || ts.isTypeOperatorNode(type)) return hasJSDocPostfixQuestion(type.type);
        if (ts.isConditionalTypeNode(type)) return hasJSDocPostfixQuestion(type.falseType);
        if (ts.isUnionTypeNode(type)) return hasJSDocPostfixQuestion(ts.last(type.types));
        if (ts.isIntersectionTypeNode(type)) return hasJSDocPostfixQuestion(ts.last(type.types));
        if (ts.isInferTypeNode(type)) return !!type.typeParameter.constraint && hasJSDocPostfixQuestion(type.typeParameter.constraint);
        return false;
    }

    function parenthesizeTypeOfOptionalType(type: ts.TypeNode): ts.TypeNode {
        if (hasJSDocPostfixQuestion(type)) return factory.createParenthesizedType(type);
        return parenthesizeNonArrayTypeOfPostfixType(type);
    }

    // function parenthesizeMemberOfElementType(member: TypeNode): TypeNode {
    //     switch (member.kind) {
    //         case SyntaxKind.UnionType:
    //         case SyntaxKind.IntersectionType:
    //         case SyntaxKind.FunctionType:
    //         case SyntaxKind.ConstructorType:
    //             return factory.createParenthesizedType(member);
    //     }
    //     return parenthesizeMemberOfConditionalType(member);
    // }

    // function parenthesizeElementTypeOfArrayType(member: TypeNode): TypeNode {
    //     switch (member.kind) {
    //         case SyntaxKind.TypeQuery:
    //         case SyntaxKind.TypeOperator:
    //         case SyntaxKind.InferType:
    //             return factory.createParenthesizedType(member);
    //     }
    //     return parenthesizeMemberOfElementType(member);
    // }

    function parenthesizeLeadingTypeArgument(node: ts.TypeNode) {
        return ts.isFunctionOrConstructorTypeNode(node) && node.typeParameters ? factory.createParenthesizedType(node) : node;
    }

    function parenthesizeOrdinalTypeArgument(node: ts.TypeNode, i: number) {
        return i === 0 ? parenthesizeLeadingTypeArgument(node) : node;
    }

    function parenthesizeTypeArguments(typeArguments: ts.NodeArray<ts.TypeNode> | undefined): ts.NodeArray<ts.TypeNode> | undefined {
        if (ts.some(typeArguments)) {
            return factory.createNodeArray(ts.sameMap(typeArguments, parenthesizeOrdinalTypeArgument));
        }
    }
}

/** @internal */
export const nullParenthesizerRules: ts.ParenthesizerRules = {
    getParenthesizeLeftSideOfBinaryForOperator: _ => ts.identity,
    getParenthesizeRightSideOfBinaryForOperator: _ => ts.identity,
    parenthesizeLeftSideOfBinary: (_binaryOperator, leftSide) => leftSide,
    parenthesizeRightSideOfBinary: (_binaryOperator, _leftSide, rightSide) => rightSide,
    parenthesizeExpressionOfComputedPropertyName: ts.identity,
    parenthesizeConditionOfConditionalExpression: ts.identity,
    parenthesizeBranchOfConditionalExpression: ts.identity,
    parenthesizeExpressionOfExportDefault: ts.identity,
    parenthesizeExpressionOfNew: expression => ts.cast(expression, ts.isLeftHandSideExpression),
    parenthesizeLeftSideOfAccess: expression => ts.cast(expression, ts.isLeftHandSideExpression),
    parenthesizeOperandOfPostfixUnary: operand => ts.cast(operand, ts.isLeftHandSideExpression),
    parenthesizeOperandOfPrefixUnary: operand => ts.cast(operand, ts.isUnaryExpression),
    parenthesizeExpressionsOfCommaDelimitedList: nodes => ts.cast(nodes, ts.isNodeArray),
    parenthesizeExpressionForDisallowedComma: ts.identity,
    parenthesizeExpressionOfExpressionStatement: ts.identity,
    parenthesizeConciseBodyOfArrowFunction: ts.identity,
    parenthesizeCheckTypeOfConditionalType: ts.identity,
    parenthesizeExtendsTypeOfConditionalType: ts.identity,
    parenthesizeConstituentTypesOfUnionType: nodes => ts.cast(nodes, ts.isNodeArray),
    parenthesizeConstituentTypeOfUnionType: ts.identity,
    parenthesizeConstituentTypesOfIntersectionType: nodes => ts.cast(nodes, ts.isNodeArray),
    parenthesizeConstituentTypeOfIntersectionType: ts.identity,
    parenthesizeOperandOfTypeOperator: ts.identity,
    parenthesizeOperandOfReadonlyTypeOperator: ts.identity,
    parenthesizeNonArrayTypeOfPostfixType: ts.identity,
    parenthesizeElementTypesOfTupleType: nodes => ts.cast(nodes, ts.isNodeArray),
    parenthesizeElementTypeOfTupleType: ts.identity,
    parenthesizeTypeOfOptionalType: ts.identity,
    parenthesizeTypeArguments: nodes => nodes && ts.cast(nodes, ts.isNodeArray),
    parenthesizeLeadingTypeArgument: ts.identity,
};
