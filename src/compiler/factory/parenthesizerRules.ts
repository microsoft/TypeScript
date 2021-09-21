/* @internal */
namespace ts {
    export function createParenthesizerRules(factory: NodeFactory): ParenthesizerRules {
        interface BinaryPlusExpression extends BinaryExpression {
            cachedLiteralKind: SyntaxKind;
        }

        let binaryLeftOperandParenthesizerCache: ESMap<BinaryOperator, (node: Expression) => Expression> | undefined;
        let binaryRightOperandParenthesizerCache: ESMap<BinaryOperator, (node: Expression) => Expression> | undefined;

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
            parenthesizeMemberOfConditionalType,
            parenthesizeMemberOfElementType,
            parenthesizeElementTypeOfArrayType,
            parenthesizeConstituentTypesOfUnionOrIntersectionType,
            parenthesizeTypeArguments,
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
        function binaryOperandNeedsParentheses(binaryOperator: SyntaxKind, operand: Expression, isLeftSideOfBinary: boolean, leftOperand: Expression | undefined) {
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

            if (node.kind === SyntaxKind.BinaryExpression && (node as BinaryExpression).operatorToken.kind === SyntaxKind.PlusToken) {
                if ((node as BinaryPlusExpression).cachedLiteralKind !== undefined) {
                    return (node as BinaryPlusExpression).cachedLiteralKind;
                }

                const leftKind = getLiteralKindOfBinaryPlusOperand((node as BinaryExpression).left);
                const literalKind = isLiteralKind(leftKind)
                    && leftKind === getLiteralKindOfBinaryPlusOperand((node as BinaryExpression).right)
                        ? leftKind
                        : SyntaxKind.Unknown;

                (node as BinaryPlusExpression).cachedLiteralKind = literalKind;
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
        function parenthesizeBinaryOperand(binaryOperator: SyntaxKind, operand: Expression, isLeftSideOfBinary: boolean, leftOperand?: Expression) {
            const skipped = skipPartiallyEmittedExpressions(operand);

            // If the resulting expression is already parenthesized, we do not need to do any further processing.
            if (skipped.kind === SyntaxKind.ParenthesizedExpression) {
                return operand;
            }

            return binaryOperandNeedsParentheses(binaryOperator, operand, isLeftSideOfBinary, leftOperand)
                ? factory.createParenthesizedExpression(operand)
                : operand;
        }


        function parenthesizeLeftSideOfBinary(binaryOperator: SyntaxKind, leftSide: Expression): Expression {
            return parenthesizeBinaryOperand(binaryOperator, leftSide, /*isLeftSideOfBinary*/ true);
        }

        function parenthesizeRightSideOfBinary(binaryOperator: SyntaxKind, leftSide: Expression | undefined, rightSide: Expression): Expression {
            return parenthesizeBinaryOperand(binaryOperator, rightSide, /*isLeftSideOfBinary*/ false, leftSide);
        }

        function parenthesizeExpressionOfComputedPropertyName(expression: Expression): Expression {
            return isCommaSequence(expression) ? factory.createParenthesizedExpression(expression) : expression;
        }

        function parenthesizeConditionOfConditionalExpression(condition: Expression): Expression {
            const conditionalPrecedence = getOperatorPrecedence(SyntaxKind.ConditionalExpression, SyntaxKind.QuestionToken);
            const emittedCondition = skipPartiallyEmittedExpressions(condition);
            const conditionPrecedence = getExpressionPrecedence(emittedCondition);
            if (compareValues(conditionPrecedence, conditionalPrecedence) !== Comparison.GreaterThan) {
                return factory.createParenthesizedExpression(condition);
            }
            return condition;
        }

        function parenthesizeBranchOfConditionalExpression(branch: Expression): Expression {
            // per ES grammar both 'whenTrue' and 'whenFalse' parts of conditional expression are assignment expressions
            // so in case when comma expression is introduced as a part of previous transformations
            // if should be wrapped in parens since comma operator has the lowest precedence
            const emittedExpression = skipPartiallyEmittedExpressions(branch);
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
        function parenthesizeExpressionOfExportDefault(expression: Expression): Expression {
            const check = skipPartiallyEmittedExpressions(expression);
            let needsParens = isCommaSequence(check);
            if (!needsParens) {
                switch (getLeftmostExpression(check, /*stopAtCallExpression*/ false).kind) {
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
        function parenthesizeExpressionOfNew(expression: Expression): LeftHandSideExpression {
            const leftmostExpr = getLeftmostExpression(expression, /*stopAtCallExpressions*/ true);
            switch (leftmostExpr.kind) {
                case SyntaxKind.CallExpression:
                    return factory.createParenthesizedExpression(expression);

                case SyntaxKind.NewExpression:
                    return !(leftmostExpr as NewExpression).arguments
                        ? factory.createParenthesizedExpression(expression)
                        : expression as LeftHandSideExpression; // TODO(rbuckton): Verify this assertion holds
            }

            return parenthesizeLeftSideOfAccess(expression);
        }

        /**
         * Wraps an expression in parentheses if it is needed in order to use the expression for
         * property or element access.
         */
        function parenthesizeLeftSideOfAccess(expression: Expression): LeftHandSideExpression {
            // isLeftHandSideExpression is almost the correct criterion for when it is not necessary
            // to parenthesize the expression before a dot. The known exception is:
            //
            //    NewExpression:
            //       new C.x        -> not the same as (new C).x
            //
            const emittedExpression = skipPartiallyEmittedExpressions(expression);
            if (isLeftHandSideExpression(emittedExpression)
                && (emittedExpression.kind !== SyntaxKind.NewExpression || (emittedExpression as NewExpression).arguments)) {
                // TODO(rbuckton): Verify whether this assertion holds.
                return expression as LeftHandSideExpression;
            }

            // TODO(rbuckton): Verifiy whether `setTextRange` is needed.
            return setTextRange(factory.createParenthesizedExpression(expression), expression);
        }

        function parenthesizeOperandOfPostfixUnary(operand: Expression): LeftHandSideExpression {
            // TODO(rbuckton): Verifiy whether `setTextRange` is needed.
            return isLeftHandSideExpression(operand) ? operand : setTextRange(factory.createParenthesizedExpression(operand), operand);
        }

        function parenthesizeOperandOfPrefixUnary(operand: Expression): UnaryExpression {
            // TODO(rbuckton): Verifiy whether `setTextRange` is needed.
            return isUnaryExpression(operand) ? operand : setTextRange(factory.createParenthesizedExpression(operand), operand);
        }

        function parenthesizeExpressionsOfCommaDelimitedList(elements: NodeArray<Expression>): NodeArray<Expression> {
            const result = sameMap(elements, parenthesizeExpressionForDisallowedComma);
            return setTextRange(factory.createNodeArray(result, elements.hasTrailingComma), elements);
        }

        function parenthesizeExpressionForDisallowedComma(expression: Expression): Expression {
            const emittedExpression = skipPartiallyEmittedExpressions(expression);
            const expressionPrecedence = getExpressionPrecedence(emittedExpression);
            const commaPrecedence = getOperatorPrecedence(SyntaxKind.BinaryExpression, SyntaxKind.CommaToken);
            // TODO(rbuckton): Verifiy whether `setTextRange` is needed.
            return expressionPrecedence > commaPrecedence ? expression : setTextRange(factory.createParenthesizedExpression(expression), expression);
        }

        function parenthesizeExpressionOfExpressionStatement(expression: Expression): Expression {
            const emittedExpression = skipPartiallyEmittedExpressions(expression);
            if (isCallExpression(emittedExpression)) {
                const callee = emittedExpression.expression;
                const kind = skipPartiallyEmittedExpressions(callee).kind;
                if (kind === SyntaxKind.FunctionExpression || kind === SyntaxKind.ArrowFunction) {
                    // TODO(rbuckton): Verifiy whether `setTextRange` is needed.
                    const updated = factory.updateCallExpression(
                        emittedExpression,
                        setTextRange(factory.createParenthesizedExpression(callee), callee),
                        emittedExpression.typeArguments,
                        emittedExpression.arguments
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

        function parenthesizeConciseBodyOfArrowFunction(body: Expression): Expression;
        function parenthesizeConciseBodyOfArrowFunction(body: ConciseBody): ConciseBody;
        function parenthesizeConciseBodyOfArrowFunction(body: ConciseBody): ConciseBody {
            if (!isBlock(body) && (isCommaSequence(body) || getLeftmostExpression(body, /*stopAtCallExpressions*/ false).kind === SyntaxKind.ObjectLiteralExpression)) {
                // TODO(rbuckton): Verifiy whether `setTextRange` is needed.
                return setTextRange(factory.createParenthesizedExpression(body), body);
            }

            return body;
        }

        function parenthesizeMemberOfConditionalType(member: TypeNode): TypeNode {
            return member.kind === SyntaxKind.ConditionalType ? factory.createParenthesizedType(member) : member;
        }

        function parenthesizeMemberOfElementType(member: TypeNode): TypeNode {
            switch (member.kind) {
                case SyntaxKind.UnionType:
                case SyntaxKind.IntersectionType:
                case SyntaxKind.FunctionType:
                case SyntaxKind.ConstructorType:
                    return factory.createParenthesizedType(member);
            }
            return parenthesizeMemberOfConditionalType(member);
        }

        function parenthesizeElementTypeOfArrayType(member: TypeNode): TypeNode {
            switch (member.kind) {
                case SyntaxKind.TypeQuery:
                case SyntaxKind.TypeOperator:
                case SyntaxKind.InferType:
                    return factory.createParenthesizedType(member);
            }
            return parenthesizeMemberOfElementType(member);
        }

        function parenthesizeConstituentTypesOfUnionOrIntersectionType(members: readonly TypeNode[]): NodeArray<TypeNode> {
            return factory.createNodeArray(sameMap(members, parenthesizeMemberOfElementType));

        }

        function parenthesizeOrdinalTypeArgument(node: TypeNode, i: number) {
            return i === 0 && isFunctionOrConstructorTypeNode(node) && node.typeParameters ? factory.createParenthesizedType(node) : node;
        }

        function parenthesizeTypeArguments(typeArguments: NodeArray<TypeNode> | undefined): NodeArray<TypeNode> | undefined {
            if (some(typeArguments)) {
                return factory.createNodeArray(sameMap(typeArguments, parenthesizeOrdinalTypeArgument));
            }
        }
    }

    export const nullParenthesizerRules: ParenthesizerRules = {
        getParenthesizeLeftSideOfBinaryForOperator: _ => identity,
        getParenthesizeRightSideOfBinaryForOperator: _ => identity,
        parenthesizeLeftSideOfBinary: (_binaryOperator, leftSide) => leftSide,
        parenthesizeRightSideOfBinary: (_binaryOperator, _leftSide, rightSide) => rightSide,
        parenthesizeExpressionOfComputedPropertyName: identity,
        parenthesizeConditionOfConditionalExpression: identity,
        parenthesizeBranchOfConditionalExpression: identity,
        parenthesizeExpressionOfExportDefault: identity,
        parenthesizeExpressionOfNew: expression => cast(expression, isLeftHandSideExpression),
        parenthesizeLeftSideOfAccess: expression => cast(expression, isLeftHandSideExpression),
        parenthesizeOperandOfPostfixUnary: operand => cast(operand, isLeftHandSideExpression),
        parenthesizeOperandOfPrefixUnary: operand => cast(operand, isUnaryExpression),
        parenthesizeExpressionsOfCommaDelimitedList: nodes => cast(nodes, isNodeArray),
        parenthesizeExpressionForDisallowedComma: identity,
        parenthesizeExpressionOfExpressionStatement: identity,
        parenthesizeConciseBodyOfArrowFunction: identity,
        parenthesizeMemberOfConditionalType: identity,
        parenthesizeMemberOfElementType: identity,
        parenthesizeElementTypeOfArrayType: identity,
        parenthesizeConstituentTypesOfUnionOrIntersectionType: nodes => cast(nodes, isNodeArray),
        parenthesizeTypeArguments: nodes => nodes && cast(nodes, isNodeArray),
    };
}
