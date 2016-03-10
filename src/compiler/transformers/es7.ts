/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />

/*@internal*/
namespace ts {
    export function transformES7(context: TransformationContext) {
        const { hoistVariableDeclaration } = context;

        return transformSourceFile;

        function transformSourceFile(node: SourceFile) {
            return visitEachChild(node, visitor, context);
        }

        function visitor(node: Node): OneOrMany<Node> {
            if (node.transformFlags & TransformFlags.ES7) {
                return visitorWorker(node);
            }
            else if (node.transformFlags & TransformFlags.ContainsES7) {
                return visitEachChild(node, visitor, context);
            }
            else {
                return node;
            }
        }

        function visitorWorker(node: Node): OneOrMany<Node> {
            switch (node.kind) {
                case SyntaxKind.BinaryExpression:
                    return visitBinaryExpression(<BinaryExpression>node);
            }

            Debug.fail(`Unexpected node kind: ${formatSyntaxKind(node.kind)}.`);
        }

        function visitBinaryExpression(node: BinaryExpression): Expression {
            // We are here because ES7 adds support for the exponentiation operator.
            const left = visitNode(node.left, visitor, isExpression);
            const right = visitNode(node.right, visitor, isExpression);
            if (node.operatorToken.kind === SyntaxKind.AsteriskAsteriskEqualsToken) {
                let target: Expression;
                let value: Expression;
                if (isElementAccessExpression(left)) {
                    // Transforms `a[x] **= b` into `(_a = a)[_x = x] = Math.pow(_a[_x], b)`
                    const expressionTemp = createTempVariable();
                    hoistVariableDeclaration(expressionTemp);

                    const argumentExpressionTemp = createTempVariable();
                    hoistVariableDeclaration(argumentExpressionTemp);

                    target = createElementAccess(
                        createAssignment(expressionTemp, left.expression, /*location*/ left.expression),
                        createAssignment(argumentExpressionTemp, left.argumentExpression, /*location*/ left.argumentExpression),
                        /*location*/ left
                    );

                    value = createElementAccess(
                        expressionTemp,
                        argumentExpressionTemp,
                        /*location*/ left
                    );
                }
                else if (isPropertyAccessExpression(left)) {
                    // Transforms `a.x **= b` into `(_a = a).x = Math.pow(_a.x, b)`
                    const expressionTemp = createTempVariable();
                    hoistVariableDeclaration(expressionTemp);

                    target = createPropertyAccess(
                        createAssignment(expressionTemp, left.expression, /*location*/ left.expression),
                        left.name,
                        /*location*/ left
                    );

                    value = createPropertyAccess(
                        expressionTemp,
                        left.name,
                        /*location*/ left
                    );
                }
                else {
                    // Transforms `a **= b` into `a = Math.pow(a, b)`
                    target = left;
                    value = left;
                }

                return createAssignment(target, createMathPow(value, right, /*location*/ node), /*location*/ node);
            }
            else if (node.operatorToken.kind === SyntaxKind.AsteriskAsteriskToken) {
                // Transforms `a ** b` into `Math.pow(a, b)`
                return createMathPow(left, right, /*location*/ node);
            }
            else {
                Debug.fail(`Unexpected operator kind: ${formatSyntaxKind(node.operatorToken.kind)}.`);
            }
        }
    }
}