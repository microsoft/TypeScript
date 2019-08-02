/*@internal*/
namespace ts {
    export function transformESNext(context: TransformationContext) {
        return chainBundle(transformSourceFile);

        function transformSourceFile(node: SourceFile) {
            if (node.isDeclarationFile) {
                return node;
            }

            return visitEachChild(node, visitor, context);
        }

        function visitor(node: Node): VisitResult<Node> {
            if ((node.transformFlags & TransformFlags.ContainsESNext) === 0) {
                return node;
            }
            switch (node.kind) {
                case SyntaxKind.BinaryExpression:
                    if ((<BinaryExpression>node).operatorToken.kind === SyntaxKind.QuestionQuestionToken) {
                        return transformNullishCoalescingExpression(<BinaryExpression>node);
                    }
                // falls through
                default:
                    return visitEachChild(node, visitor, context);
            }
        }

        function createNotUndefinedCondition(node: Expression) {
            return isIdentifier(node) && !isGeneratedIdentifier(node)
                ? createStrictInequality(createTypeOf(node), createLiteral("undefined"))
                : createStrictInequality(node, createVoidZero());
        }

        function createNotNullCondition(node: Expression) {
            return createStrictInequality(node, createNull());
        }

        function transformNullishCoalescingExpression(node: BinaryExpression) {
            const expressions: Expression[] = [];
            let left = visitNode(node.left, visitor, isExpression);
            if (!isIdentifier(left)) {
                const temp = createTempVariable(/*recordTempVariable*/ undefined);
                expressions.push(createAssignment(temp, left));
                left = temp;
            }
            expressions.push(
                createConditional(
                    createLogicalAnd(
                        createNotUndefinedCondition(left),
                        createNotNullCondition(left)),
                    left,
                    visitNode(node.right, visitor, isExpression)));
            return inlineExpressions(expressions);
        }
    }
}
