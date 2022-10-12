/*@internal*/
namespace ts {
export function transformES2016(context: ts.TransformationContext) {
    const {
        factory,
        hoistVariableDeclaration
    } = context;

    return ts.chainBundle(context, transformSourceFile);

    function transformSourceFile(node: ts.SourceFile) {
        if (node.isDeclarationFile) {
            return node;
        }

        return ts.visitEachChild(node, visitor, context);
    }

    function visitor(node: ts.Node): ts.VisitResult<ts.Node> {
        if ((node.transformFlags & ts.TransformFlags.ContainsES2016) === 0) {
            return node;
        }
        switch (node.kind) {
            case ts.SyntaxKind.BinaryExpression:
                return visitBinaryExpression(node as ts.BinaryExpression);
            default:
                return ts.visitEachChild(node, visitor, context);
        }
    }

    function visitBinaryExpression(node: ts.BinaryExpression): ts.Expression {
        switch (node.operatorToken.kind) {
            case ts.SyntaxKind.AsteriskAsteriskEqualsToken:
                return visitExponentiationAssignmentExpression(node);
            case ts.SyntaxKind.AsteriskAsteriskToken:
                return visitExponentiationExpression(node);
            default:
                return ts.visitEachChild(node, visitor, context);
        }
    }

    function visitExponentiationAssignmentExpression(node: ts.BinaryExpression) {
        let target: ts.Expression;
        let value: ts.Expression;
        const left = ts.visitNode(node.left, visitor, ts.isExpression);
        const right = ts.visitNode(node.right, visitor, ts.isExpression);
        if (ts.isElementAccessExpression(left)) {
            // Transforms `a[x] **= b` into `(_a = a)[_x = x] = Math.pow(_a[_x], b)`
            const expressionTemp = factory.createTempVariable(hoistVariableDeclaration);
            const argumentExpressionTemp = factory.createTempVariable(hoistVariableDeclaration);
            target = ts.setTextRange(
                factory.createElementAccessExpression(
                    ts.setTextRange(factory.createAssignment(expressionTemp, left.expression), left.expression),
                    ts.setTextRange(factory.createAssignment(argumentExpressionTemp, left.argumentExpression), left.argumentExpression)
                ),
                left
            );
            value = ts.setTextRange(
                factory.createElementAccessExpression(
                    expressionTemp,
                    argumentExpressionTemp
                ),
                left
            );
        }
        else if (ts.isPropertyAccessExpression(left)) {
            // Transforms `a.x **= b` into `(_a = a).x = Math.pow(_a.x, b)`
            const expressionTemp = factory.createTempVariable(hoistVariableDeclaration);
            target = ts.setTextRange(
                factory.createPropertyAccessExpression(
                    ts.setTextRange(factory.createAssignment(expressionTemp, left.expression), left.expression),
                    left.name
                ),
                left
            );
            value = ts.setTextRange(
                factory.createPropertyAccessExpression(
                    expressionTemp,
                    left.name
                ),
                left
            );
        }
        else {
            // Transforms `a **= b` into `a = Math.pow(a, b)`
            target = left;
            value = left;
        }
        return ts.setTextRange(
            factory.createAssignment(
                target,
                ts.setTextRange(factory.createGlobalMethodCall("Math", "pow", [value, right]), node)
            ),
            node
        );
    }

    function visitExponentiationExpression(node: ts.BinaryExpression) {
        // Transforms `a ** b` into `Math.pow(a, b)`
        const left = ts.visitNode(node.left, visitor, ts.isExpression);
        const right = ts.visitNode(node.right, visitor, ts.isExpression);
        return ts.setTextRange(factory.createGlobalMethodCall("Math", "pow", [left, right]), node);
    }
}
}
