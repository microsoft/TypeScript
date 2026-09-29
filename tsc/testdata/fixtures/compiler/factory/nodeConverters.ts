import {
    ArrayBindingOrAssignmentElement,
    ArrayBindingOrAssignmentPattern,
    AssignmentPattern,
    BindingOrAssignmentElementTarget,
    BindingOrAssignmentPattern,
    Block,
    cast,
    ClassDeclaration,
    ConciseBody,
    Debug,
    Expression,
    FunctionDeclaration,
    getModifiers,
    getStartsOnNewLine,
    isArrayBindingPattern,
    isArrayLiteralExpression,
    isBindingElement,
    isBindingPattern,
    isBlock,
    isDefaultModifier,
    isExportModifier,
    isExpression,
    isIdentifier,
    isObjectBindingPattern,
    isObjectLiteralElementLike,
    isObjectLiteralExpression,
    map,
    NodeConverters,
    NodeFactory,
    notImplemented,
    ObjectBindingOrAssignmentElement,
    ObjectBindingOrAssignmentPattern,
    setOriginalNode,
    setStartsOnNewLine,
    setTextRange,
    SyntaxKind,
} from "../_namespaces/ts.js";

/** @internal */
export function createNodeConverters(factory: NodeFactory): NodeConverters {
    return {
        convertToFunctionBlock,
        convertToFunctionExpression,
        convertToClassExpression,
        convertToArrayAssignmentElement,
        convertToObjectAssignmentElement,
        convertToAssignmentPattern,
        convertToObjectAssignmentPattern,
        convertToArrayAssignmentPattern,
        convertToAssignmentElementTarget,
    };

    function convertToFunctionBlock(node: ConciseBody, multiLine?: boolean): Block {
        if (isBlock(node)) return node;
        const returnStatement = factory.createReturnStatement(node);
        setTextRange(returnStatement, node);
        const body = factory.createBlock([returnStatement], multiLine);
        setTextRange(body, node);
        return body;
    }

    function convertToFunctionExpression(node: FunctionDeclaration) {
        if (!node.body) return Debug.fail(`Cannot convert a FunctionDeclaration without a body`);
        const updated = factory.createFunctionExpression(
            getModifiers(node)?.filter(modifier => !isExportModifier(modifier) && !isDefaultModifier(modifier)),
            node.asteriskToken,
            node.name,
            node.typeParameters,
            node.parameters,
            node.type,
            node.body,
        );
        setOriginalNode(updated, node);
        setTextRange(updated, node);
        if (getStartsOnNewLine(node)) {
            setStartsOnNewLine(updated, /*newLine*/ true);
        }
        return updated;
    }

    function convertToClassExpression(node: ClassDeclaration) {
        const updated = factory.createClassExpression(
            node.modifiers?.filter(modifier => !isExportModifier(modifier) && !isDefaultModifier(modifier)),
            node.name,
            node.typeParameters,
            node.heritageClauses,
            node.members,
        );
        setOriginalNode(updated, node);
        setTextRange(updated, node);
        if (getStartsOnNewLine(node)) {
            setStartsOnNewLine(updated, /*newLine*/ true);
        }
        return updated;
    }

    function convertToArrayAssignmentElement(element: ArrayBindingOrAssignmentElement) {
        if (isBindingElement(element)) {
            if (element.dotDotDotToken) {
                Debug.assertNode(element.name, isIdentifier);
                return setOriginalNode(setTextRange(factory.createSpreadElement(element.name), element), element);
            }
            const expression = convertToAssignmentElementTarget(element.name);
            return element.initializer
                ? setOriginalNode(
                    setTextRange(
                        factory.createAssignment(expression, element.initializer),
                        element,
                    ),
                    element,
                )
                : expression;
        }
        return cast(element, isExpression);
    }

    function convertToObjectAssignmentElement(element: ObjectBindingOrAssignmentElement) {
        if (isBindingElement(element)) {
            if (element.dotDotDotToken) {
                Debug.assertNode(element.name, isIdentifier);
                return setOriginalNode(setTextRange(factory.createSpreadAssignment(element.name), element), element);
            }
            if (element.propertyName) {
                const expression = convertToAssignmentElementTarget(element.name);
                return setOriginalNode(setTextRange(factory.createPropertyAssignment(element.propertyName, element.initializer ? factory.createAssignment(expression, element.initializer) : expression), element), element);
            }
            Debug.assertNode(element.name, isIdentifier);
            return setOriginalNode(setTextRange(factory.createShorthandPropertyAssignment(element.name, element.initializer), element), element);
        }

        return cast(element, isObjectLiteralElementLike);
    }

    function convertToAssignmentPattern(node: BindingOrAssignmentPattern): AssignmentPattern {
        switch (node.kind) {
            case SyntaxKind.ArrayBindingPattern:
            case SyntaxKind.ArrayLiteralExpression:
                return convertToArrayAssignmentPattern(node);

            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.ObjectLiteralExpression:
                return convertToObjectAssignmentPattern(node);
        }
    }

    function convertToObjectAssignmentPattern(node: ObjectBindingOrAssignmentPattern) {
        if (isObjectBindingPattern(node)) {
            return setOriginalNode(
                setTextRange(
                    factory.createObjectLiteralExpression(map(node.elements, convertToObjectAssignmentElement)),
                    node,
                ),
                node,
            );
        }
        return cast(node, isObjectLiteralExpression);
    }

    function convertToArrayAssignmentPattern(node: ArrayBindingOrAssignmentPattern) {
        if (isArrayBindingPattern(node)) {
            return setOriginalNode(
                setTextRange(
                    factory.createArrayLiteralExpression(map(node.elements, convertToArrayAssignmentElement)),
                    node,
                ),
                node,
            );
        }
        return cast(node, isArrayLiteralExpression);
    }

    function convertToAssignmentElementTarget(node: BindingOrAssignmentElementTarget): Expression {
        if (isBindingPattern(node)) {
            return convertToAssignmentPattern(node);
        }

        return cast(node, isExpression);
    }
}

/** @internal */
export const nullNodeConverters: NodeConverters = {
    convertToFunctionBlock: notImplemented,
    convertToFunctionExpression: notImplemented,
    convertToClassExpression: notImplemented,
    convertToArrayAssignmentElement: notImplemented,
    convertToObjectAssignmentElement: notImplemented,
    convertToAssignmentPattern: notImplemented,
    convertToObjectAssignmentPattern: notImplemented,
    convertToArrayAssignmentPattern: notImplemented,
    convertToAssignmentElementTarget: notImplemented,
};
