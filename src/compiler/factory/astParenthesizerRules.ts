import {
    AstAsExpression,
    AstBinaryExpression,
    AstCallExpression,
    AstConciseBody,
    AstConditionalExpression,
    AstElementAccessExpression,
    AstExpression,
    AstLeftHandSideExpression,
    AstNamedTupleMember,
    AstNewExpression,
    AstNode,
    AstNodeArray,
    AstNodeArrayLike,
    AstNodeFactory,
    AstNonNullExpression,
    AstPartiallyEmittedExpression,
    AstPostfixUnaryExpression,
    AstPropertyAccessExpression,
    AstSatisfiesExpression,
    AstTaggedTemplateExpression,
    AstTypeNode,
    AstUnaryExpression,
    astIsBinaryExpression,
    astIsBlock,
    astIsCallExpression,
    astIsCommaListExpression,
    astIsConditionalTypeNode,
    astIsConstructorTypeNode,
    astIsFunctionTypeNode,
    astIsInferTypeNode,
    astIsIntersectionTypeNode,
    astIsJSDocNullableType,
    astIsNamedTupleMember,
    astIsOptionalChain,
    astIsTypeOperatorNode,
    astIsUnionTypeNode,
    Associativity,
    BinaryOperator,
    compareValues,
    Comparison,
    Debug,
    getExpressionAssociativity,
    getExpressionPrecedence,
    getOperatorAssociativity,
    getOperatorPrecedence,
    identity,
    isLeftHandSideExpressionKind,
    isLiteralKind,
    isUnaryExpressionKind,
    last,
    OperatorPrecedence,
    OuterExpressionKinds,
    sameMap,
    setTextRange,
    SyntaxKind,
    TextRange,
    astSkipOuterExpressions,
} from "../_namespaces/ts.js";

/** @internal */
export interface AstParenthesizerRules {
    getParenthesizeLeftSideOfBinaryForOperator(binaryOperator: SyntaxKind): (leftSide: AstExpression) => AstExpression;
    getParenthesizeRightSideOfBinaryForOperator(binaryOperator: SyntaxKind): (rightSide: AstExpression) => AstExpression;
    parenthesizeLeftSideOfBinary(binaryOperator: SyntaxKind, leftSide: AstExpression): AstExpression;
    parenthesizeRightSideOfBinary(binaryOperator: SyntaxKind, leftSide: AstExpression | undefined, rightSide: AstExpression): AstExpression;
    parenthesizeExpressionOfComputedPropertyName(expression: AstExpression): AstExpression;
    parenthesizeConditionOfConditionalExpression(condition: AstExpression): AstExpression;
    parenthesizeBranchOfConditionalExpression(branch: AstExpression): AstExpression;
    parenthesizeExpressionOfExportDefault(expression: AstExpression): AstExpression;
    parenthesizeExpressionOfNew(expression: AstExpression): AstLeftHandSideExpression;
    parenthesizeLeftSideOfAccess(expression: AstExpression, optionalChain?: boolean): AstLeftHandSideExpression;
    parenthesizeOperandOfPostfixUnary(operand: AstExpression): AstLeftHandSideExpression;
    parenthesizeOperandOfPrefixUnary(operand: AstExpression): AstUnaryExpression;
    parenthesizeExpressionsOfCommaDelimitedList(elements: AstNodeArrayLike<AstExpression>): AstNodeArray<AstExpression>;
    parenthesizeExpressionForDisallowedComma(expression: AstExpression): AstExpression;
    parenthesizeExpressionOfExpressionStatement(expression: AstExpression): AstExpression;
    parenthesizeConciseBodyOfArrowFunction(body: AstExpression): AstExpression;
    parenthesizeConciseBodyOfArrowFunction(body: AstConciseBody): AstConciseBody;
    parenthesizeCheckTypeOfConditionalType(type: AstTypeNode): AstTypeNode;
    parenthesizeExtendsTypeOfConditionalType(type: AstTypeNode): AstTypeNode;
    parenthesizeOperandOfTypeOperator(type: AstTypeNode): AstTypeNode;
    parenthesizeOperandOfReadonlyTypeOperator(type: AstTypeNode): AstTypeNode;
    parenthesizeNonArrayTypeOfPostfixType(type: AstTypeNode): AstTypeNode;
    parenthesizeElementTypesOfTupleType(types: AstNodeArrayLike<AstTypeNode | AstNamedTupleMember>): AstNodeArray<AstTypeNode>;
    parenthesizeElementTypeOfTupleType(type: AstTypeNode | AstNamedTupleMember): AstTypeNode | AstNamedTupleMember;
    parenthesizeTypeOfOptionalType(type: AstTypeNode): AstTypeNode;
    parenthesizeConstituentTypeOfUnionType(type: AstTypeNode): AstTypeNode;
    parenthesizeConstituentTypesOfUnionType(constituents: AstNodeArrayLike<AstTypeNode>): AstNodeArray<AstTypeNode>;
    parenthesizeConstituentTypeOfIntersectionType(type: AstTypeNode): AstTypeNode;
    parenthesizeConstituentTypesOfIntersectionType(constituents: AstNodeArrayLike<AstTypeNode>): AstNodeArray<AstTypeNode>;
    parenthesizeLeadingTypeArgument(typeNode: AstTypeNode): AstTypeNode;
    parenthesizeTypeArguments(typeParameters: AstNodeArrayLike<AstTypeNode> | undefined): AstNodeArray<AstTypeNode> | undefined;
}

/** @internal */
export function createAstParenthesizerRules(factory: AstNodeFactory): AstParenthesizerRules {
    let binaryLeftOperandParenthesizerCache: Map<BinaryOperator, (node: AstExpression) => AstExpression> | undefined;
    let binaryRightOperandParenthesizerCache: Map<BinaryOperator, (node: AstExpression) => AstExpression> | undefined;

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

    function getParenthesizeLeftSideOfBinaryForOperator(operatorKind: BinaryOperator) {
        binaryLeftOperandParenthesizerCache ||= new Map();
        let parenthesizerRule = binaryLeftOperandParenthesizerCache.get(operatorKind);
        if (!parenthesizerRule) {
            parenthesizerRule = node => parenthesizeLeftSideOfBinary(operatorKind, node);
            binaryLeftOperandParenthesizerCache.set(operatorKind, parenthesizerRule);
        }
        return parenthesizerRule;
    }

    function getParenthesizeRightSideOfBinaryForOperator(operatorKind: BinaryOperator) {
        binaryRightOperandParenthesizerCache ||= new Map();
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
    function binaryOperandNeedsParentheses(binaryOperator: SyntaxKind, operand: AstExpression, isLeftSideOfBinary: boolean, leftOperand: AstExpression | undefined) {
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
        const emittedOperand = astSkipOuterExpressions(operand, OuterExpressionKinds.PartiallyEmittedExpressions);
        if (!isLeftSideOfBinary && operand.kind === SyntaxKind.ArrowFunction && binaryOperatorPrecedence > OperatorPrecedence.Assignment) {
            // We need to parenthesize arrow functions on the right side to avoid it being
            // parsed as parenthesized expression: `a && (() => {})`
            return true;
        }
        const operandPrecedence = getExpressionPrecedence(emittedOperand);
        switch (compareValues(operandPrecedence, binaryOperatorPrecedence)) {
            case Comparison.LessThan:
                // If the operand is the right side of a right-associative binary operation
                // and is a yield expression, then we do not need parentheses.
                if (
                    !isLeftSideOfBinary
                    && binaryOperatorAssociativity === Associativity.Right
                    && operand.kind === SyntaxKind.YieldExpression
                ) {
                    return false;
                }

                return true;

            case Comparison.GreaterThan:
                return false;

            case Comparison.EqualTo:
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
                    return binaryOperatorAssociativity === Associativity.Right;
                }
                else {
                    if (
                        astIsBinaryExpression(emittedOperand)
                        && emittedOperand.data.operatorToken.kind === binaryOperator
                    ) {
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
        //  (a,b),c     -> a,(b,c)  -> a,b,c
        //
        // While addition is associative in mathematics, JavaScript's `+` is not
        // guaranteed to be associative as it is overloaded with string concatenation.
        return binaryOperator === SyntaxKind.AsteriskToken
            || binaryOperator === SyntaxKind.BarToken
            || binaryOperator === SyntaxKind.AmpersandToken
            || binaryOperator === SyntaxKind.CaretToken
            || binaryOperator === SyntaxKind.CommaToken;
    }

    /**
     * This function determines whether an expression consists of a homogeneous set of
     * literal expressions or binary plus expressions that all share the same literal kind.
     * It is used to determine whether the right-hand operand of a binary plus expression can be
     * emitted without parentheses.
     */
    function getLiteralKindOfBinaryPlusOperand(node: AstExpression): SyntaxKind {
        node = astSkipOuterExpressions(node, OuterExpressionKinds.PartiallyEmittedExpressions);

        if (isLiteralKind(node.kind)) {
            return node.kind;
        }

        if (astIsBinaryExpression(node) && (node as AstBinaryExpression).data.operatorToken.kind === SyntaxKind.PlusToken) {
            if (node.data.cachedLiteralKind !== undefined) {
                return node.data.cachedLiteralKind;
            }

            const leftKind = getLiteralKindOfBinaryPlusOperand((node as AstBinaryExpression).data.left);
            const literalKind = isLiteralKind(leftKind)
                    && leftKind === getLiteralKindOfBinaryPlusOperand((node as AstBinaryExpression).data.right)
                ? leftKind
                : SyntaxKind.Unknown;

            node.data.cachedLiteralKind = literalKind;
            return literalKind;
        }

        return SyntaxKind.Unknown;
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
    function parenthesizeBinaryOperand(binaryOperator: SyntaxKind, operand: AstExpression, isLeftSideOfBinary: boolean, leftOperand?: AstExpression) {
        const skipped = astSkipOuterExpressions(operand, OuterExpressionKinds.PartiallyEmittedExpressions);

        // If the resulting expression is already parenthesized, we do not need to do any further processing.
        if (skipped.kind === SyntaxKind.ParenthesizedExpression) {
            return operand;
        }

        return binaryOperandNeedsParentheses(binaryOperator, operand, isLeftSideOfBinary, leftOperand)
            ? factory.createParenthesizedExpression(operand)
            : operand;
    }

    function parenthesizeLeftSideOfBinary(binaryOperator: SyntaxKind, leftSide: AstExpression): AstExpression {
        return parenthesizeBinaryOperand(binaryOperator, leftSide, /*isLeftSideOfBinary*/ true);
    }

    function parenthesizeRightSideOfBinary(binaryOperator: SyntaxKind, leftSide: AstExpression | undefined, rightSide: AstExpression): AstExpression {
        return parenthesizeBinaryOperand(binaryOperator, rightSide, /*isLeftSideOfBinary*/ false, leftSide);
    }

    function parenthesizeExpressionOfComputedPropertyName(expression: AstExpression): AstExpression {
        return isCommaSequence(expression) ? factory.createParenthesizedExpression(expression) : expression;
    }

    function parenthesizeConditionOfConditionalExpression(condition: AstExpression): AstExpression {
        const conditionalPrecedence = getOperatorPrecedence(SyntaxKind.ConditionalExpression, SyntaxKind.QuestionToken);
        const emittedCondition = astSkipOuterExpressions(condition, OuterExpressionKinds.PartiallyEmittedExpressions);
        const conditionPrecedence = getExpressionPrecedence(emittedCondition);
        if (compareValues(conditionPrecedence, conditionalPrecedence) !== Comparison.GreaterThan) {
            return factory.createParenthesizedExpression(condition);
        }
        return condition;
    }

    function isCommaSequence(expression: AstExpression): boolean {
        return astIsCommaListExpression(expression) || astIsBinaryExpression(expression) && expression.node.data.operatorToken.kind === SyntaxKind.CommaToken;
    }

    function parenthesizeBranchOfConditionalExpression(branch: AstExpression): AstExpression {
        // per ES grammar both 'whenTrue' and 'whenFalse' parts of conditional expression are assignment expressions
        // so in case when comma expression is introduced as a part of previous transformations
        // if should be wrapped in parens since comma operator has the lowest precedence
        const emittedExpression = astSkipOuterExpressions(branch, OuterExpressionKinds.PartiallyEmittedExpressions);
        return isCommaSequence(emittedExpression)
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
    function parenthesizeExpressionOfExportDefault(expression: AstExpression): AstExpression {
        const check = astSkipOuterExpressions(expression, OuterExpressionKinds.PartiallyEmittedExpressions);
        let needsParens = isCommaSequence(check);
        if (!needsParens) {
            switch (getLeftmostExpression(check, /*stopAtCallExpressions*/ false).kind) {
                case SyntaxKind.ClassExpression:
                case SyntaxKind.FunctionExpression:
                    needsParens = true;
            }
        }
        return needsParens ? factory.createParenthesizedExpression(expression) : expression;
    }

    /**
     * Wraps an expression in parentheses if it is needed in order to use the expression
     * as the expression of a `NewExpression` node.
     */
    function parenthesizeExpressionOfNew(expression: AstExpression): AstLeftHandSideExpression {
        const leftmostExpr = getLeftmostExpression(expression, /*stopAtCallExpressions*/ true);
        switch (leftmostExpr.kind) {
            case SyntaxKind.CallExpression:
                return factory.createParenthesizedExpression(expression);

            case SyntaxKind.NewExpression:
                return !(leftmostExpr as AstNewExpression).data.arguments
                    ? factory.createParenthesizedExpression(expression)
                    : expression as AstLeftHandSideExpression; // TODO(rbuckton): Verify this assertion holds
        }

        return parenthesizeLeftSideOfAccess(expression);
    }

    /**
     * Wraps an expression in parentheses if it is needed in order to use the expression for
     * property or element access.
     */
    function parenthesizeLeftSideOfAccess(expression: AstExpression, optionalChain?: boolean): AstLeftHandSideExpression {
        // isLeftHandSideExpression is almost the correct criterion for when it is not necessary
        // to parenthesize the expression before a dot. The known exception is:
        //
        //    NewExpression:
        //       new C.x        -> not the same as (new C).x
        //
        const emittedExpression = astSkipOuterExpressions(expression, OuterExpressionKinds.PartiallyEmittedExpressions);
        if (
            isLeftHandSideExpressionKind(astSkipOuterExpressions(emittedExpression, OuterExpressionKinds.PartiallyEmittedExpressions).kind)
            && (emittedExpression.kind !== SyntaxKind.NewExpression || (emittedExpression as AstNewExpression).data.arguments)
            && (optionalChain || !astIsOptionalChain(emittedExpression))
        ) {
            // TODO(rbuckton): Verify whether this assertion holds.
            return expression as AstLeftHandSideExpression;
        }

        // TODO(rbuckton): Verifiy whether `setTextRange` is needed.
        return setTextRange(factory.createParenthesizedExpression(expression), expression);
    }

    function parenthesizeOperandOfPostfixUnary(operand: AstExpression): AstLeftHandSideExpression {
        // TODO(rbuckton): Verifiy whether `setTextRange` is needed.
        return isLeftHandSideExpressionKind(astSkipOuterExpressions(operand, OuterExpressionKinds.PartiallyEmittedExpressions).kind) ? operand as AstLeftHandSideExpression : setTextRange(factory.createParenthesizedExpression(operand), operand);
    }

    function parenthesizeOperandOfPrefixUnary(operand: AstExpression): AstUnaryExpression {
        // TODO(rbuckton): Verifiy whether `setTextRange` is needed.
        return isUnaryExpressionKind(astSkipOuterExpressions(operand, OuterExpressionKinds.PartiallyEmittedExpressions).kind) ? operand as AstUnaryExpression : setTextRange(factory.createParenthesizedExpression(operand), operand);
    }

    function parenthesizeExpressionsOfCommaDelimitedList(elements: AstNodeArrayLike<AstExpression>): AstNodeArray<AstExpression> {
        let hasTrailingComma = false;
        let range: TextRange | undefined;
        let items: readonly AstExpression[];
        if (elements instanceof AstNodeArray) {
            hasTrailingComma = elements.hasTrailingComma;
            items = elements.items;
            range = elements;
        }
        else {
            items = elements;
        }
        const result = sameMap(items, parenthesizeExpressionForDisallowedComma);
        return setTextRange(factory.createNodeArray(result, hasTrailingComma), range);
    }

    function parenthesizeExpressionForDisallowedComma(expression: AstExpression): AstExpression {
        const emittedExpression = astSkipOuterExpressions(expression, OuterExpressionKinds.PartiallyEmittedExpressions);
        const expressionPrecedence = getExpressionPrecedence(emittedExpression);
        const commaPrecedence = getOperatorPrecedence(SyntaxKind.BinaryExpression, SyntaxKind.CommaToken);
        // TODO(rbuckton): Verifiy whether `setTextRange` is needed.
        return expressionPrecedence > commaPrecedence ? expression : setTextRange(factory.createParenthesizedExpression(expression), expression);
    }

    function parenthesizeExpressionOfExpressionStatement(expression: AstExpression): AstExpression {
        const emittedExpression = astSkipOuterExpressions(expression, OuterExpressionKinds.PartiallyEmittedExpressions);
        if (astIsCallExpression(emittedExpression)) {
            const callee = emittedExpression.data.expression;
            const kind = astSkipOuterExpressions(callee, OuterExpressionKinds.PartiallyEmittedExpressions).kind;
            if (kind === SyntaxKind.FunctionExpression || kind === SyntaxKind.ArrowFunction) {
                // TODO(rbuckton): Verifiy whether `setTextRange` is needed.
                const updated = factory.updateCallExpression(
                    emittedExpression,
                    setTextRange(factory.createParenthesizedExpression(callee), callee),
                    emittedExpression.data.typeArguments,
                    emittedExpression.data.arguments,
                );
                return factory.restoreOuterExpressions(expression, updated, OuterExpressionKinds.PartiallyEmittedExpressions);
            }
        }

        const leftmostExpressionKind = getLeftmostExpression(emittedExpression, /*stopAtCallExpressions*/ false).kind;
        if (leftmostExpressionKind === SyntaxKind.ObjectLiteralExpression || leftmostExpressionKind === SyntaxKind.FunctionExpression) {
            // TODO(rbuckton): Verifiy whether `setTextRange` is needed.
            return setTextRange(factory.createParenthesizedExpression(expression), expression);
        }

        return expression;
    }

    function parenthesizeConciseBodyOfArrowFunction(body: AstExpression): AstExpression;
    function parenthesizeConciseBodyOfArrowFunction(body: AstConciseBody): AstConciseBody;
    function parenthesizeConciseBodyOfArrowFunction(body: AstConciseBody): AstConciseBody {
        if (!astIsBlock(body) && (isCommaSequence(body) || getLeftmostExpression(body, /*stopAtCallExpressions*/ false).kind === SyntaxKind.ObjectLiteralExpression)) {
            // TODO(rbuckton): Verifiy whether `setTextRange` is needed.
            return setTextRange(factory.createParenthesizedExpression(body), body);
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
    function parenthesizeCheckTypeOfConditionalType(checkType: AstTypeNode): AstTypeNode {
        switch (checkType.kind) {
            case SyntaxKind.FunctionType:
            case SyntaxKind.ConstructorType:
            case SyntaxKind.ConditionalType:
                return factory.createParenthesizedType(checkType);
        }
        return checkType;
    }

    function parenthesizeExtendsTypeOfConditionalType(extendsType: AstTypeNode): AstTypeNode {
        switch (extendsType.kind) {
            case SyntaxKind.ConditionalType:
                return factory.createParenthesizedType(extendsType);
        }
        return extendsType;
    }

    // UnionType[Extends] :
    //     `|`? IntersectionType[?Extends]
    //     UnionType[?Extends] `|` IntersectionType[?Extends]
    //
    // - A union type constituent has the same precedence as the check type of a conditional type
    function parenthesizeConstituentTypeOfUnionType(type: AstTypeNode) {
        switch (type.kind) {
            case SyntaxKind.UnionType: // Not strictly necessary, but a union containing a union should have been flattened
            case SyntaxKind.IntersectionType: // Not strictly necessary, but makes generated output more readable and avoids breaks in DT tests
                return factory.createParenthesizedType(type);
        }
        return parenthesizeCheckTypeOfConditionalType(type);
    }

    function parenthesizeConstituentTypesOfUnionType(members: AstNodeArrayLike<AstTypeNode>): AstNodeArray<AstTypeNode> {
        return factory.createNodeArray(sameMap(items(members), parenthesizeConstituentTypeOfUnionType));
    }

    // IntersectionType[Extends] :
    //     `&`? TypeOperator[?Extends]
    //     IntersectionType[?Extends] `&` TypeOperator[?Extends]
    //
    // - An intersection type constituent does not allow function, constructor, conditional, or union types (they must be parenthesized)
    function parenthesizeConstituentTypeOfIntersectionType(type: AstTypeNode) {
        switch (type.kind) {
            case SyntaxKind.UnionType:
            case SyntaxKind.IntersectionType: // Not strictly necessary, but an intersection containing an intersection should have been flattened
                return factory.createParenthesizedType(type);
        }
        return parenthesizeConstituentTypeOfUnionType(type);
    }

    function parenthesizeConstituentTypesOfIntersectionType(members: AstNodeArrayLike<AstTypeNode>): AstNodeArray<AstTypeNode> {
        return factory.createNodeArray(sameMap(items(members), parenthesizeConstituentTypeOfIntersectionType));
    }

    // TypeOperator[Extends] :
    //     PostfixType
    //     InferType[?Extends]
    //     `keyof` TypeOperator[?Extends]
    //     `unique` TypeOperator[?Extends]
    //     `readonly` TypeOperator[?Extends]
    //
    function parenthesizeOperandOfTypeOperator(type: AstTypeNode) {
        switch (type.kind) {
            case SyntaxKind.IntersectionType:
                return factory.createParenthesizedType(type);
        }
        return parenthesizeConstituentTypeOfIntersectionType(type);
    }

    function parenthesizeOperandOfReadonlyTypeOperator(type: AstTypeNode) {
        switch (type.kind) {
            case SyntaxKind.TypeOperator:
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
    function parenthesizeNonArrayTypeOfPostfixType(type: AstTypeNode) {
        switch (type.kind) {
            case SyntaxKind.InferType:
            case SyntaxKind.TypeOperator:
            case SyntaxKind.TypeQuery: // Not strictly necessary, but makes generated output more readable and avoids breaks in DT tests
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
    function parenthesizeElementTypesOfTupleType(types: AstNodeArrayLike<AstTypeNode | AstNamedTupleMember>): AstNodeArray<AstTypeNode> {
        return factory.createNodeArray(sameMap(items(types), parenthesizeElementTypeOfTupleType));
    }

    function parenthesizeElementTypeOfTupleType(type: AstTypeNode | AstNamedTupleMember): AstTypeNode {
        if (hasJSDocPostfixQuestion(type)) return factory.createParenthesizedType(type);
        return type;
    }

    function hasJSDocPostfixQuestion(type: AstTypeNode | AstNamedTupleMember): boolean {
        if (astIsJSDocNullableType(type)) return type.data.postfix;
        if (astIsNamedTupleMember(type)) return hasJSDocPostfixQuestion(type.data.type);
        if (astIsFunctionTypeNode(type) || astIsConstructorTypeNode(type) || astIsTypeOperatorNode(type)) return hasJSDocPostfixQuestion(type.data.type);
        if (astIsConditionalTypeNode(type)) return hasJSDocPostfixQuestion(type.data.falseType);
        if (astIsUnionTypeNode(type)) return hasJSDocPostfixQuestion(last(type.data.types.items));
        if (astIsIntersectionTypeNode(type)) return hasJSDocPostfixQuestion(last(type.data.types.items));
        if (astIsInferTypeNode(type)) return !!type.data.typeParameter.data.constraint && hasJSDocPostfixQuestion(type.data.typeParameter.data.constraint);
        return false;
    }

    function parenthesizeTypeOfOptionalType(type: AstTypeNode): AstTypeNode {
        if (hasJSDocPostfixQuestion(type)) return factory.createParenthesizedType(type);
        return parenthesizeNonArrayTypeOfPostfixType(type);
    }

    // function parenthesizeMemberOfElementType(member: AstTypeNode): AstTypeNode {
    //     switch (member.kind) {
    //         case SyntaxKind.UnionType:
    //         case SyntaxKind.IntersectionType:
    //         case SyntaxKind.FunctionType:
    //         case SyntaxKind.ConstructorType:
    //             return factory.createParenthesizedType(member);
    //     }
    //     return parenthesizeMemberOfConditionalType(member);
    // }

    // function parenthesizeElementTypeOfArrayType(member: AstTypeNode): AstTypeNode {
    //     switch (member.kind) {
    //         case SyntaxKind.TypeQuery:
    //         case SyntaxKind.TypeOperator:
    //         case SyntaxKind.InferType:
    //             return factory.createParenthesizedType(member);
    //     }
    //     return parenthesizeMemberOfElementType(member);
    // }

    function parenthesizeLeadingTypeArgument(node: AstTypeNode) {
        return (astIsFunctionTypeNode(node) || astIsConstructorTypeNode(node)) && node.data.typeParameters ? factory.createParenthesizedType(node) : node;
    }

    function parenthesizeOrdinalTypeArgument(node: AstTypeNode, i: number) {
        return i === 0 ? parenthesizeLeadingTypeArgument(node) : node;
    }

    function parenthesizeTypeArguments(typeArguments: AstNodeArrayLike<AstTypeNode> | undefined): AstNodeArray<AstTypeNode> | undefined {
        if (items(typeArguments)?.length) {
            return factory.createNodeArray(sameMap(items(typeArguments), parenthesizeOrdinalTypeArgument));
        }
    }
}

/** @internal */
export const nullAstParenthesizerRules: AstParenthesizerRules = {
    getParenthesizeLeftSideOfBinaryForOperator: _ => identity,
    getParenthesizeRightSideOfBinaryForOperator: _ => identity,
    parenthesizeLeftSideOfBinary: (_binaryOperator, leftSide) => leftSide,
    parenthesizeRightSideOfBinary: (_binaryOperator, _leftSide, rightSide) => rightSide,
    parenthesizeExpressionOfComputedPropertyName: identity,
    parenthesizeConditionOfConditionalExpression: identity,
    parenthesizeBranchOfConditionalExpression: identity,
    parenthesizeExpressionOfExportDefault: identity,
    parenthesizeExpressionOfNew: expression => {
        Debug.assert(isLeftHandSideExpressionKind(expression.kind));
        return expression as AstLeftHandSideExpression;
    },
    parenthesizeLeftSideOfAccess: expression => {
        Debug.assert(isLeftHandSideExpressionKind(expression.kind));
        return expression as AstLeftHandSideExpression;
    },
    parenthesizeOperandOfPostfixUnary: operand => {
        Debug.assert(isLeftHandSideExpressionKind(operand.kind));
        return operand as AstLeftHandSideExpression;
    },
    parenthesizeOperandOfPrefixUnary: operand => {
        Debug.assert(isUnaryExpressionKind(operand.kind));
        return operand as AstUnaryExpression;
    },
    parenthesizeExpressionsOfCommaDelimitedList: nodes => {
        Debug.assert(nodes instanceof AstNodeArray);
        return nodes;
    },
    parenthesizeExpressionForDisallowedComma: identity,
    parenthesizeExpressionOfExpressionStatement: identity,
    parenthesizeConciseBodyOfArrowFunction: identity,
    parenthesizeCheckTypeOfConditionalType: identity,
    parenthesizeExtendsTypeOfConditionalType: identity,
    parenthesizeConstituentTypesOfUnionType: nodes => {
        Debug.assert(nodes instanceof AstNodeArray);
        return nodes;
    },
    parenthesizeConstituentTypeOfUnionType: identity,
    parenthesizeConstituentTypesOfIntersectionType: nodes => {
        Debug.assert(nodes instanceof AstNodeArray);
        return nodes;
    },
    parenthesizeConstituentTypeOfIntersectionType: identity,
    parenthesizeOperandOfTypeOperator: identity,
    parenthesizeOperandOfReadonlyTypeOperator: identity,
    parenthesizeNonArrayTypeOfPostfixType: identity,
    parenthesizeElementTypesOfTupleType: nodes => {
        Debug.assert(nodes instanceof AstNodeArray);
        return nodes;
    },
    parenthesizeElementTypeOfTupleType: identity,
    parenthesizeTypeOfOptionalType: identity,
    parenthesizeTypeArguments: nodes => {
        Debug.assert(!nodes || nodes instanceof AstNodeArray);
        return nodes;
    },
    parenthesizeLeadingTypeArgument: identity,
};

function getLeftmostExpression(node: AstExpression, stopAtCallExpressions: boolean) {
    while (true) {
        switch (node.kind) {
            case SyntaxKind.PostfixUnaryExpression:
                node = (node as AstPostfixUnaryExpression).data.operand;
                continue;

            case SyntaxKind.BinaryExpression:
                node = (node as AstBinaryExpression).data.left;
                continue;

            case SyntaxKind.ConditionalExpression:
                node = (node as AstConditionalExpression).data.condition;
                continue;

            case SyntaxKind.TaggedTemplateExpression:
                node = (node as AstTaggedTemplateExpression).data.tag;
                continue;

            case SyntaxKind.CallExpression:
                if (stopAtCallExpressions) {
                    return node;
                }
                // falls through
            case SyntaxKind.AsExpression:
            case SyntaxKind.ElementAccessExpression:
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.NonNullExpression:
            case SyntaxKind.PartiallyEmittedExpression:
            case SyntaxKind.SatisfiesExpression:
                node = (node as AstCallExpression | AstPropertyAccessExpression | AstElementAccessExpression | AstAsExpression | AstNonNullExpression | AstPartiallyEmittedExpression | AstSatisfiesExpression).data.expression;
                continue;
        }

        return node;
    }
}

function items<T extends AstNode>(nodes: AstNodeArrayLike<T>): readonly T[];
function items<T extends AstNode>(nodes: AstNodeArrayLike<T> | undefined): readonly T[] | undefined;
function items<T extends AstNode>(nodes: AstNodeArrayLike<T> | undefined): readonly T[] | undefined {
    return nodes instanceof AstNodeArray ? nodes.items : nodes;
}
