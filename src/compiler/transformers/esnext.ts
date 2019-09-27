/*@internal*/
namespace ts {
    export function transformESNext(context: TransformationContext) {
        const {
            hoistVariableDeclaration,
        } = context;

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

        function createNotNullCondition(node: Expression) {
            return createBinary(
                createBinary(
                    node,
                    createToken(SyntaxKind.ExclamationEqualsEqualsToken),
                    createNull()
                ),
                createToken(SyntaxKind.AmpersandAmpersandToken),
                createBinary(
                    node,
                    createToken(SyntaxKind.ExclamationEqualsEqualsToken),
                    createVoidZero()
                )
            );
        }

        function transformNullishCoalescingExpression(node: BinaryExpression) {
            const expressions: Expression[] = [];
            let left = visitNode(node.left, visitor, isExpression);
            if (!isIdentifier(left)) {
                const temp = createTempVariable(hoistVariableDeclaration);
                expressions.push(createAssignment(temp, left));
                left = temp;
            }
            expressions.push(
                createParen(
                    createConditional(
                        createNotNullCondition(left),
                        left,
                        visitNode(node.right, visitor, isExpression)))
                );
            return inlineExpressions(expressions);
        }
    }
}
