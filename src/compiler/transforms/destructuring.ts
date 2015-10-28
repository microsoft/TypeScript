/// <reference path="../checker.ts" />
/*@internal*/
namespace ts {
    /**
     * Flattens binding patterns in a variable declaration.
     * @param transformer The transformer context to use during destructuring.
     * @param node The variable declaration to flatten.
     * @param write The callback to execute to write variable declarations.
     * @param visitor An optional visitor used to visit the initializers of a binding pattern.
     */
    export function flattenVariableDestructuring(transformer: Transformer, node: VariableDeclaration, write: (node: VariableDeclaration) => void, visitor?: (node: Node, write: (node: Node) => void) => void): void {
        transformDestructuring(transformer, node, /*writeExpression*/ undefined, write, visitor);
    }

    /**
     * Flattens binding patterns in a parameter declaration.
     * @param transformer The transformer context to use during destructuring.
     * @param node The parameter declaration to flatten.
     * @param write The callback to execute to write variable declarations.
     * @param visitor An optional visitor used to visit the initializers of a binding pattern.
     */
    export function flattenParameterDestructuring(transformer: Transformer, node: ParameterDeclaration, write: (node: VariableDeclaration) => void, visitor?: (node: Node, write: (node: Node) => void) => void): void {
        transformDestructuring(transformer, node, /*writeExpression*/ undefined, write, visitor, transformer.getGeneratedNameForNode(node));
    }

    /**
     * Flattens a destructuring assignment.
     * @param transformer The transformer context to use during destructuring.
     * @param node The assignment expression to flatten.
     * @param write The callback to execute to write the resulting expression.
     * @param visitor An optional visitor used to visit the initializers and right-hand side of the destructuring assignment.
     */
    export function flattenDestructuringAssignment(transformer: Transformer, node: BinaryExpression, write: (node: Expression) => void, visitor?: (node: Node, write: (node: Node) => void) => void): void {
        transformDestructuring(transformer, node, write, /*writeDeclaration*/ undefined, visitor);
    }

    /**
     * Flattens binding patterns in a variable declaration and transforms them into an expression.
     * @param transformer The transformer context to use during destructuring.
     * @param node The variable declaration to flatten.
     * @param write The callback to execute to write the resulting expression.
     * @param visitor An optional visitor used to visit the initializers of a binding pattern.
     */
    export function flattenVariableDestructuringAsExpression(transformer: Transformer, node: VariableDeclaration, write: (node: Expression) => void, visitor?: (node: Node, write: (node: Node) => void) => void): void {
        transformDestructuring(transformer, node, write, /*writeDeclaration*/ undefined, visitor);
    }

    function transformDestructuring(
        transformer: Transformer,
        root: BinaryExpression | VariableDeclaration | ParameterDeclaration,
        writeExpression: (node: Expression) => void,
        writeDeclaration: (node: VariableDeclaration) => void,
        visitor?: (node: Node, write: (node: Node) => void) => void,
        value?: Expression) {
        let {
            createTempVariable,
            hoistVariableDeclaration,
            mapNode,
            flattenNode,
            visitNode,
        } = transformer;

        let parentNode = transformer.getParentNode();
        let isVariableDeclarationList = writeDeclaration !== undefined;

        if (isBinaryExpression(root)) {
            return emitAssignmentExpression(root, writeExpression);
        }
        else {
            return emitBindingElement(<BindingElement>root, value, writeExpression || writeDeclaration);
        }

        function emitAssignmentExpression(root: BinaryExpression, write: (node: Expression) => void) {
            if (isEmptyObjectLiteralOrArrayLiteral(root.left)) {
                return write(root.right);
            }
            else {
                let expressions = flattenNode(root, emitDestructuringExpressions);
                let expression = inlineExpressions(expressions);
                if (!isExpressionStatement(parentNode) && !isParenthesizedExpression(parentNode)) {
                    expression = createParenthesizedExpression(expression);
                }

                return write(expression);
            }
        }

        function emitBindingElement(target: BindingElement, value: Expression, write: (node: Expression | VariableDeclaration) => void): void {
            if (target.initializer) {
                // Combine value and initializer
                let initializer = visitNode(target.initializer, visitor, isExpressionNode);
                value = value ? createDefaultValueCheck(value, initializer, write) : initializer;
            }
            else if (!value) {
                // Use 'void 0' in absence of value and initializer
                value = createVoidZeroExpression();
            }

            let name = target.name;
            if (isBindingPattern(name)) {
                const elements = name.elements;
                const numElements = elements.length;
                if (numElements !== 1) {
                    // For anything other than a single-element destructuring we need to generate a temporary
                    // to ensure value is evaluated exactly once. Additionally, if we have zero elements
                    // we need to emit *something* to ensure that in case a 'var' keyword was already emitted,
                    // so in that case, we'll intentionally create that temporary.
                    value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ numElements !== 0, write);
                }
                for (let i = 0; i < elements.length; i++) {
                    let element = elements[i];
                    if (name.kind === SyntaxKind.ObjectBindingPattern) {
                        // Rewrite element to a declaration with an initializer that fetches property
                        let propName = element.propertyName || <Identifier>element.name;
                        emitBindingElement(element, createPropertyOrElementAccessExpression(value, propName), write);
                    }
                    else if (element.kind !== SyntaxKind.OmittedExpression) {
                        if (!element.dotDotDotToken) {
                            // Rewrite element to a declaration that accesses array element at index i
                            emitBindingElement(element, createElementAccessExpression3(value, i), write);
                        }
                        else if (i === elements.length - 1) {
                            emitBindingElement(element, createSliceCall(value, i), write);
                        }
                    }
                }
            }
            else {
                emitAssignment(name, value, /*isTempVariable*/ false, /*originalNode*/ target, write);
            }
        }

        function emitDestructuringExpressions(node: BinaryExpression, write: (node: Expression) => void): void {
            let target = node.left;
            let value = node.right;
            if (isExpressionStatement(parentNode)) {
                emitDestructuringAssignment(target, value, write);
            }
            else {
                value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ true, write);
                emitDestructuringAssignment(target, value, write);
                write(value);
            }
        }

        function emitDestructuringAssignment(target: Expression, value: Expression, write: (node: Expression) => void) {
            if (isBinaryExpression(target) && target.operatorToken.kind === SyntaxKind.EqualsToken) {
                let right = visitNode((<BinaryExpression>target).right, visitor, isExpressionNode);
                value = createDefaultValueCheck(value, right, write);
                target = (<BinaryExpression>target).left;
            }
            if (isObjectLiteralExpression(target)) {
                emitObjectLiteralAssignment(target, value, write);
            }
            else if (isArrayLiteralExpression(target)) {
                emitArrayLiteralAssignment(target, value, write);
            }
            else if (isIdentifier(target)) {
                emitAssignment(target, value, /*isTempVariable*/ false, /*originalNode*/ undefined, write);
            }
            else {
                Debug.fail();
            }
        }

        function emitObjectLiteralAssignment(target: ObjectLiteralExpression, value: Expression, write: (node: Expression) => void): void {
            let properties = target.properties;
            if (properties.length !== 1) {
                // For anything but a single element destructuring we need to generate a temporary
                // to ensure value is evaluated exactly once.
                value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ true, write);
            }

            for (let p of properties) {
                if (isPropertyAssignment(p) || isShorthandPropertyAssignment(p)) {
                    let propName = <Identifier | LiteralExpression>(<PropertyAssignment>p).name;
                    let expr = createPropertyOrElementAccessExpression(value, propName);
                    emitDestructuringAssignment((<PropertyAssignment>p).initializer || propName, expr, write);
                }
            }
        }

        function emitArrayLiteralAssignment(target: ArrayLiteralExpression, value: Expression, write: (node: Expression) => void): void {
            let elements = target.elements;
            if (elements.length !== 1) {
                // For anything but a single element destructuring we need to generate a temporary
                // to ensure value is evaluated exactly once.
                value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ true, write);
            }

            for (let i = 0; i < elements.length; i++) {
                let e = elements[i];
                if (e.kind !== SyntaxKind.OmittedExpression) {
                    if (e.kind !== SyntaxKind.SpreadElementExpression) {
                        emitDestructuringAssignment(e, createElementAccessExpression3(value, i), write);
                    }
                    else if (i === elements.length - 1) {
                        emitDestructuringAssignment((<SpreadElementExpression>e).expression, createSliceCall(value, i), write);
                    }
                }
            }
        }

        function emitAssignment(left: Identifier, right: Expression, isTempVariable: boolean, originalNode: Node, write: (node: Expression | VariableDeclaration) => void): void {
            let node: VariableDeclaration | Expression;
            if (isVariableDeclarationList) {
                node = createVariableDeclaration2(left, right);
            }
            else {
                node = createAssignmentExpression(left, right);
            }

            if (originalNode) {
                node.original = originalNode;
            }
            
            write(node);
        }

        function ensureIdentifier(value: Expression, reuseIdentifierExpressions: boolean, write: (node: Expression | VariableDeclaration) => void) {
            if (isIdentifier(value) && reuseIdentifierExpressions) {
                return value;
            }
            else {
                let temp = createTempVariable(TempFlags.Auto);
                if (!isVariableDeclarationList) {
                    hoistVariableDeclaration(temp);
                }

                emitAssignment(temp, value, /*isTempVariable*/ true, /*originalNode*/ undefined, write);
                return temp;
            }
        }

        function createDefaultValueCheck(value: Expression, defaultValue: Expression, write: (node: Expression | VariableDeclaration) => void): Expression {
            value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ true, write);
            let equalityExpr = createStrictEqualityExpression(value, createVoidZeroExpression());
            return createConditionalExpression2(equalityExpr, defaultValue, value);
        }
    }

    export function convertBindingPatternToExpression(node: BindingPattern): Expression {
        switch (node.kind) {
            case SyntaxKind.ObjectBindingPattern:
                return convertObjectBindingPatternToExpression(<ObjectBindingPattern>node);

            case SyntaxKind.ArrayBindingPattern:
                return convertArrayBindingPatternToExpression(<ObjectBindingPattern>node);
        }
    }

    function convertBindingElementToExpression(node: BindingElement): Expression {
        let name = node.name;
        let expression = isIdentifier(name) ? name : convertBindingPatternToExpression(name);
        if (node.initializer) {
            expression = createAssignmentExpression(expression, node.initializer, node);
        }
        else if (node.dotDotDotToken) {
            expression = createSpreadElementExpression(expression, node);
        }

        return expression;
    }

    function convertObjectBindingPatternToExpression(node: ObjectBindingPattern): Expression {
        let properties = map(node.elements, convertBindingElementToObjectLiteralElement);
        return createObjectLiteralExpression(properties);
    }

    function convertArrayBindingPatternToExpression(node: ArrayBindingPattern): Expression {
        let elements = map(node.elements, convertBindingElementToExpression);
        return createArrayLiteralExpression(elements);
    }

    function convertBindingElementToObjectLiteralElement(node: BindingElement): ObjectLiteralElement {
        let name = node.name;
        if (!node.propertyName && isIdentifier(name) && !node.initializer) {
            return createShorthandPropertyAssignment(name, node);
        }

        let propertyName = node.propertyName || <Identifier>name;
        let expr = convertBindingElementToExpression(node);
        return createPropertyAssignment(propertyName, expr);
    }
}