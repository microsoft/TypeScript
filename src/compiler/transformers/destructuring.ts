/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />

/*@internal*/
namespace ts {
    /**
     * Flattens a destructuring assignment expression.
     *
     * @param root The destructuring assignment expression.
     * @param needsValue Indicates whether the value from the right-hand-side of the
     *                   destructuring assignment is needed as part of a larger expression.
     * @param recordTempVariable A callback used to record new temporary variables.
     * @param visitor An optional visitor to use to visit expressions.
     */
    export function flattenDestructuringAssignment(
        context: TransformationContext,
        node: BinaryExpression,
        needsValue: boolean,
        recordTempVariable: (node: Identifier) => void,
        visitor?: (node: Node) => VisitResult<Node>): Expression {

        if (isEmptyObjectLiteralOrArrayLiteral(node.left)) {
            const right = node.right;
            if (isDestructuringAssignment(right)) {
                return flattenDestructuringAssignment(context, right, needsValue, recordTempVariable, visitor);
            }
            else {
                return node.right;
            }
        }

        let location: TextRange = node;
        let value = node.right;
        const expressions: Expression[] = [];
        if (needsValue) {
            // If the right-hand value of the destructuring assignment needs to be preserved (as
            // is the case when the destructuring assignmen) is part of a larger expression),
            // then we need to cache the right-hand value.
            //
            // The source map location for the assignment should point to the entire binary
            // expression.
            value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ true, location, emitTempVariableAssignment, visitor);
        }
        else if (nodeIsSynthesized(node)) {
            // Generally, the source map location for a destructuring assignment is the root
            // expression.
            //
            // However, if the root expression is synthesized (as in the case
            // of the initializer when transforming a ForOfStatement), then the source map
            // location should point to the right-hand value of the expression.
            location = value;
        }

        flattenDestructuring(node, value, location, emitAssignment, emitTempVariableAssignment, visitor);

        if (needsValue) {
            expressions.push(value);
        }

        const expression = inlineExpressions(expressions);
        aggregateTransformFlags(expression);
        return expression;

        function emitAssignment(name: Identifier, value: Expression, location: TextRange) {
            const expression = createAssignment(name, value, location);

            // NOTE: this completely disables source maps, but aligns with the behavior of
            //       `emitAssignment` in the old emitter.
            setEmitFlags(expression, EmitFlags.NoNestedSourceMaps);

            aggregateTransformFlags(expression);
            expressions.push(expression);
        }

        function emitTempVariableAssignment(value: Expression, location: TextRange) {
            const name = createTempVariable(recordTempVariable);
            emitAssignment(name, value, location);
            return name;
        }
    }

    /**
     * Flattens binding patterns in a parameter declaration.
     *
     * @param node The ParameterDeclaration to flatten.
     * @param value The rhs value for the binding pattern.
     * @param visitor An optional visitor to use to visit expressions.
     */
    export function flattenParameterDestructuring(
        node: ParameterDeclaration,
        value: Expression,
        visitor?: (node: Node) => VisitResult<Node>) {
        const declarations: VariableDeclaration[] = [];

        flattenDestructuring(node, value, node, emitAssignment, emitTempVariableAssignment, visitor);

        return declarations;

        function emitAssignment(name: Identifier, value: Expression, location: TextRange) {
            const declaration = createVariableDeclaration(name, /*type*/ undefined, value, location);

            // NOTE: this completely disables source maps, but aligns with the behavior of
            //       `emitAssignment` in the old emitter.
            setEmitFlags(declaration, EmitFlags.NoNestedSourceMaps);

            aggregateTransformFlags(declaration);
            declarations.push(declaration);
        }

        function emitTempVariableAssignment(value: Expression, location: TextRange) {
            const name = createTempVariable(/*recordTempVariable*/ undefined);
            emitAssignment(name, value, location);
            return name;
        }
    }

    /**
     * Flattens binding patterns in a variable declaration.
     *
     * @param node The VariableDeclaration to flatten.
     * @param value An optional rhs value for the binding pattern.
     * @param visitor An optional visitor to use to visit expressions.
     */
    export function flattenVariableDestructuring(
        node: VariableDeclaration,
        value?: Expression,
        visitor?: (node: Node) => VisitResult<Node>,
        recordTempVariable?: (node: Identifier) => void) {
        const declarations: VariableDeclaration[] = [];

        let pendingAssignments: Expression[];
        flattenDestructuring(node, value, node, emitAssignment, emitTempVariableAssignment, visitor);

        return declarations;

        function emitAssignment(name: Identifier, value: Expression, location: TextRange, original: Node) {
            if (pendingAssignments) {
                pendingAssignments.push(value);
                value = inlineExpressions(pendingAssignments);
                pendingAssignments = undefined;
            }

            const declaration = createVariableDeclaration(name, /*type*/ undefined, value, location);
            declaration.original = original;

            // NOTE: this completely disables source maps, but aligns with the behavior of
            //       `emitAssignment` in the old emitter.
            setEmitFlags(declaration, EmitFlags.NoNestedSourceMaps);

            declarations.push(declaration);
            aggregateTransformFlags(declaration);
        }

        function emitTempVariableAssignment(value: Expression, location: TextRange) {
            const name = createTempVariable(recordTempVariable);
            if (recordTempVariable) {
                const assignment = createAssignment(name, value, location);
                if (pendingAssignments) {
                    pendingAssignments.push(assignment);
                }
                else {
                    pendingAssignments = [assignment];
                }
            }
            else {
                emitAssignment(name, value, location, /*original*/ undefined);
            }
            return name;
        }
    }

    /**
     * Flattens binding patterns in a variable declaration and transforms them into an expression.
     *
     * @param node The VariableDeclaration to flatten.
     * @param recordTempVariable A callback used to record new temporary variables.
     * @param createAssignmentCallback An optional callback used to create assignment expressions
     * for non-temporary variables.
     * @param visitor An optional visitor to use to visit expressions.
     */
    export function flattenVariableDestructuringToExpression(
        node: VariableDeclaration,
        recordTempVariable: (name: Identifier) => void,
        createAssignmentCallback?: (name: Identifier, value: Expression, location?: TextRange) => Expression,
        visitor?: (node: Node) => VisitResult<Node>) {

        const pendingAssignments: Expression[] = [];

        flattenDestructuring(node, /*value*/ undefined, node, emitAssignment, emitTempVariableAssignment, visitor);

        const expression = inlineExpressions(pendingAssignments);
        aggregateTransformFlags(expression);
        return expression;

        function emitAssignment(name: Identifier, value: Expression, location: TextRange, original: Node) {
            const expression = createAssignmentCallback
                ? createAssignmentCallback(name, value, location)
                : createAssignment(name, value, location);

            emitPendingAssignment(expression, original);
        }

        function emitTempVariableAssignment(value: Expression, location: TextRange) {
            const name = createTempVariable(recordTempVariable);
            emitPendingAssignment(createAssignment(name, value, location), /*original*/ undefined);
            return name;
        }

        function emitPendingAssignment(expression: Expression, original: Node) {
            expression.original = original;

            // NOTE: this completely disables source maps, but aligns with the behavior of
            //       `emitAssignment` in the old emitter.
            setEmitFlags(expression, EmitFlags.NoNestedSourceMaps);

            pendingAssignments.push(expression);
        }
    }

    function flattenDestructuring(
        root: VariableDeclaration | ParameterDeclaration | BindingElement | BinaryExpression,
        value: Expression,
        location: TextRange,
        emitAssignment: (name: Identifier, value: Expression, location: TextRange, original: Node) => void,
        emitTempVariableAssignment: (value: Expression, location: TextRange) => Identifier,
        visitor?: (node: Node) => VisitResult<Node>) {
        if (value && visitor) {
            value = visitNode(value, visitor, isExpression);
        }

        if (isBinaryExpression(root)) {
            emitDestructuringAssignment(root.left, value, location);
        }
        else {
            emitBindingElement(root, value);
        }

        function emitDestructuringAssignment(bindingTarget: Expression | ShorthandPropertyAssignment, value: Expression, location: TextRange) {
            // When emitting target = value use source map node to highlight, including any temporary assignments needed for this
            let target: Expression;
            if (isShorthandPropertyAssignment(bindingTarget)) {
                const initializer = visitor
                    ? visitNode(bindingTarget.objectAssignmentInitializer, visitor, isExpression)
                    : bindingTarget.objectAssignmentInitializer;

                if (initializer) {
                    value = createDefaultValueCheck(value, initializer, location);
                }

                target = bindingTarget.name;
            }
            else if (isBinaryExpression(bindingTarget) && bindingTarget.operatorToken.kind === SyntaxKind.EqualsToken) {
                const initializer = visitor
                    ? visitNode(bindingTarget.right, visitor, isExpression)
                    : bindingTarget.right;

                value = createDefaultValueCheck(value, initializer, location);
                target = bindingTarget.left;
            }
            else {
                target = bindingTarget;
            }

            if (target.kind === SyntaxKind.ObjectLiteralExpression) {
                emitObjectLiteralAssignment(<ObjectLiteralExpression>target, value, location);
            }
            else if (target.kind === SyntaxKind.ArrayLiteralExpression) {
                emitArrayLiteralAssignment(<ArrayLiteralExpression>target, value, location);
            }
            else {
                const name = getMutableClone(<Identifier>target);
                setSourceMapRange(name, target);
                setCommentRange(name, target);
                emitAssignment(name, value, location, /*original*/ undefined);
            }
        }

        function emitObjectLiteralAssignment(target: ObjectLiteralExpression, value: Expression, location: TextRange) {
            const properties = target.properties;
            if (properties.length !== 1) {
                // For anything but a single element destructuring we need to generate a temporary
                // to ensure value is evaluated exactly once.
                // When doing so we want to hightlight the passed in source map node since thats the one needing this temp assignment
                value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ true, location, emitTempVariableAssignment);
            }

            for (const p of properties) {
                if (p.kind === SyntaxKind.PropertyAssignment || p.kind === SyntaxKind.ShorthandPropertyAssignment) {
                    const propName = <Identifier | LiteralExpression>(<PropertyAssignment>p).name;
                    const target = p.kind === SyntaxKind.ShorthandPropertyAssignment ? <ShorthandPropertyAssignment>p : (<PropertyAssignment>p).initializer || propName;
                    // Assignment for target = value.propName should highligh whole property, hence use p as source map node
                    emitDestructuringAssignment(target, createDestructuringPropertyAccess(value, propName), p);
                }
            }
        }

        function emitArrayLiteralAssignment(target: ArrayLiteralExpression, value: Expression, location: TextRange) {
            const elements = target.elements;
            const numElements = elements.length;
            if (numElements !== 1) {
                // For anything but a single element destructuring we need to generate a temporary
                // to ensure value is evaluated exactly once.
                // When doing so we want to hightlight the passed in source map node since thats the one needing this temp assignment
                value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ true, location, emitTempVariableAssignment);
            }

            for (let i = 0; i < numElements; i++) {
                const e = elements[i];
                if (e.kind !== SyntaxKind.OmittedExpression) {
                    // Assignment for target = value.propName should highligh whole property, hence use e as source map node
                    if (e.kind !== SyntaxKind.SpreadElementExpression) {
                        emitDestructuringAssignment(e, createElementAccess(value, createLiteral(i)), e);
                    }
                    else if (i === numElements - 1) {
                        emitDestructuringAssignment((<SpreadElementExpression>e).expression, createArraySlice(value, i), e);
                    }
                }
            }
        }

        function emitBindingElement(target: VariableDeclaration | ParameterDeclaration | BindingElement, value: Expression) {
            // Any temporary assignments needed to emit target = value should point to target
            const initializer = visitor ? visitNode(target.initializer, visitor, isExpression) : target.initializer;
            if (initializer) {
                // Combine value and initializer
                value = value ? createDefaultValueCheck(value, initializer, target) : initializer;
            }
            else if (!value) {
                // Use 'void 0' in absence of value and initializer
                value = createVoidZero();
            }

            const name = target.name;
            if (isBindingPattern(name)) {
                const elements = name.elements;
                const numElements = elements.length;
                if (numElements !== 1) {
                    // For anything other than a single-element destructuring we need to generate a temporary
                    // to ensure value is evaluated exactly once. Additionally, if we have zero elements
                    // we need to emit *something* to ensure that in case a 'var' keyword was already emitted,
                    // so in that case, we'll intentionally create that temporary.
                    value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ numElements !== 0, target, emitTempVariableAssignment);
                }
                for (let i = 0; i < numElements; i++) {
                    const element = elements[i];
                    if (isOmittedExpression(element)) {
                        continue;
                    }
                    else if (name.kind === SyntaxKind.ObjectBindingPattern) {
                        // Rewrite element to a declaration with an initializer that fetches property
                        const propName = element.propertyName || <Identifier>element.name;
                        emitBindingElement(element, createDestructuringPropertyAccess(value, propName));
                    }
                    else {
                        if (!element.dotDotDotToken) {
                            // Rewrite element to a declaration that accesses array element at index i
                            emitBindingElement(element, createElementAccess(value, i));
                        }
                        else if (i === numElements - 1) {
                            emitBindingElement(element, createArraySlice(value, i));
                        }
                    }
                }
            }
            else {
                emitAssignment(name, value, target, target);
            }
        }

        function createDefaultValueCheck(value: Expression, defaultValue: Expression, location: TextRange): Expression {
            value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ true, location, emitTempVariableAssignment);
            return createConditional(
                createStrictEquality(value, createVoidZero()),
                createToken(SyntaxKind.QuestionToken),
                defaultValue,
                createToken(SyntaxKind.ColonToken),
                value
            );
        }

        /**
         * Creates either a PropertyAccessExpression or an ElementAccessExpression for the
         * right-hand side of a transformed destructuring assignment.
         *
         * @param expression The right-hand expression that is the source of the property.
         * @param propertyName The destructuring property name.
         */
        function createDestructuringPropertyAccess(expression: Expression, propertyName: PropertyName): LeftHandSideExpression {
            if (isComputedPropertyName(propertyName)) {
                return createElementAccess(
                    expression,
                    ensureIdentifier(propertyName.expression, /*reuseIdentifierExpressions*/ false, /*location*/ propertyName, emitTempVariableAssignment)
                );
            }
            else if (isLiteralExpression(propertyName)) {
                const clone = getSynthesizedClone(propertyName);
                clone.text = unescapeIdentifier(clone.text);
                return createElementAccess(expression, clone);
            }
            else {
                if (isGeneratedIdentifier(propertyName)) {
                    const clone = getSynthesizedClone(propertyName);
                    clone.text = unescapeIdentifier(clone.text);
                    return createPropertyAccess(expression, clone);
                }
                else {
                    return createPropertyAccess(expression, createIdentifier(unescapeIdentifier(propertyName.text)));
                }
            }
        }
    }

    /**
     * Ensures that there exists a declared identifier whose value holds the given expression.
     * This function is useful to ensure that the expression's value can be read from in subsequent expressions.
     * Unless 'reuseIdentifierExpressions' is false, 'value' will be returned if it is just an identifier.
     *
     * @param value the expression whose value needs to be bound.
     * @param reuseIdentifierExpressions true if identifier expressions can simply be returned;
     *                                   false if it is necessary to always emit an identifier.
     * @param location The location to use for source maps and comments.
     * @param emitTempVariableAssignment A callback used to emit a temporary variable.
     * @param visitor An optional callback used to visit the value.
     */
    function ensureIdentifier(
        value: Expression,
        reuseIdentifierExpressions: boolean,
        location: TextRange,
        emitTempVariableAssignment: (value: Expression, location: TextRange) => Identifier,
        visitor?: (node: Node) => VisitResult<Node>) {

        if (isIdentifier(value) && reuseIdentifierExpressions) {
            return value;
        }
        else {
            if (visitor) {
                value = visitNode(value, visitor, isExpression);
            }

            return emitTempVariableAssignment(value, location);
        }
    }
}
