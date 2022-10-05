import * as ts from "../_namespaces/ts";

/** @internal */
export function createNodeConverters(factory: ts.NodeFactory): ts.NodeConverters {
    return {
        convertToFunctionBlock,
        convertToFunctionExpression,
        convertToArrayAssignmentElement,
        convertToObjectAssignmentElement,
        convertToAssignmentPattern,
        convertToObjectAssignmentPattern,
        convertToArrayAssignmentPattern,
        convertToAssignmentElementTarget,
    };

    function convertToFunctionBlock(node: ts.ConciseBody, multiLine?: boolean): ts.Block {
        if (ts.isBlock(node)) return node;
        const returnStatement = factory.createReturnStatement(node);
        ts.setTextRange(returnStatement, node);
        const body = factory.createBlock([returnStatement], multiLine);
        ts.setTextRange(body, node);
        return body;
    }

    function convertToFunctionExpression(node: ts.FunctionDeclaration) {
        if (!node.body) return ts.Debug.fail(`Cannot convert a FunctionDeclaration without a body`);
        const updated = factory.createFunctionExpression(
            node.modifiers,
            node.asteriskToken,
            node.name,
            node.typeParameters,
            node.parameters,
            node.type,
            node.body
        );
        ts.setOriginalNode(updated, node);
        ts.setTextRange(updated, node);
        if (ts.getStartsOnNewLine(node)) {
            ts.setStartsOnNewLine(updated, /*newLine*/ true);
        }
        return updated;
    }

    function convertToArrayAssignmentElement(element: ts.ArrayBindingOrAssignmentElement) {
        if (ts.isBindingElement(element)) {
            if (element.dotDotDotToken) {
                ts.Debug.assertNode(element.name, ts.isIdentifier);
                return ts.setOriginalNode(ts.setTextRange(factory.createSpreadElement(element.name), element), element);
            }
            const expression = convertToAssignmentElementTarget(element.name);
            return element.initializer
                ? ts.setOriginalNode(
                    ts.setTextRange(
                        factory.createAssignment(expression, element.initializer),
                        element
                    ),
                    element
                )
                : expression;
        }
        return ts.cast(element, ts.isExpression);
    }

    function convertToObjectAssignmentElement(element: ts.ObjectBindingOrAssignmentElement) {
        if (ts.isBindingElement(element)) {
            if (element.dotDotDotToken) {
                ts.Debug.assertNode(element.name, ts.isIdentifier);
                return ts.setOriginalNode(ts.setTextRange(factory.createSpreadAssignment(element.name), element), element);
            }
            if (element.propertyName) {
                const expression = convertToAssignmentElementTarget(element.name);
                return ts.setOriginalNode(ts.setTextRange(factory.createPropertyAssignment(element.propertyName, element.initializer ? factory.createAssignment(expression, element.initializer) : expression), element), element);
            }
            ts.Debug.assertNode(element.name, ts.isIdentifier);
            return ts.setOriginalNode(ts.setTextRange(factory.createShorthandPropertyAssignment(element.name, element.initializer), element), element);
        }

        return ts.cast(element, ts.isObjectLiteralElementLike);
    }

    function convertToAssignmentPattern(node: ts.BindingOrAssignmentPattern): ts.AssignmentPattern {
        switch (node.kind) {
            case ts.SyntaxKind.ArrayBindingPattern:
            case ts.SyntaxKind.ArrayLiteralExpression:
                return convertToArrayAssignmentPattern(node);

            case ts.SyntaxKind.ObjectBindingPattern:
            case ts.SyntaxKind.ObjectLiteralExpression:
                return convertToObjectAssignmentPattern(node);
        }
    }

    function convertToObjectAssignmentPattern(node: ts.ObjectBindingOrAssignmentPattern) {
        if (ts.isObjectBindingPattern(node)) {
            return ts.setOriginalNode(
                ts.setTextRange(
                    factory.createObjectLiteralExpression(ts.map(node.elements, convertToObjectAssignmentElement)),
                    node
                ),
                node
            );
        }
        return ts.cast(node, ts.isObjectLiteralExpression);
    }

    function convertToArrayAssignmentPattern(node: ts.ArrayBindingOrAssignmentPattern) {
        if (ts.isArrayBindingPattern(node)) {
            return ts.setOriginalNode(
                ts.setTextRange(
                    factory.createArrayLiteralExpression(ts.map(node.elements, convertToArrayAssignmentElement)),
                    node
                ),
                node
            );
        }
        return ts.cast(node, ts.isArrayLiteralExpression);
    }

    function convertToAssignmentElementTarget(node: ts.BindingOrAssignmentElementTarget): ts.Expression {
        if (ts.isBindingPattern(node)) {
            return convertToAssignmentPattern(node);
        }

        return ts.cast(node, ts.isExpression);
    }
}

/** @internal */
export const nullNodeConverters: ts.NodeConverters = {
    convertToFunctionBlock: ts.notImplemented,
    convertToFunctionExpression: ts.notImplemented,
    convertToArrayAssignmentElement: ts.notImplemented,
    convertToObjectAssignmentElement: ts.notImplemented,
    convertToAssignmentPattern: ts.notImplemented,
    convertToObjectAssignmentPattern: ts.notImplemented,
    convertToArrayAssignmentPattern: ts.notImplemented,
    convertToAssignmentElementTarget: ts.notImplemented,
};