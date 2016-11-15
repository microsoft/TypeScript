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
        visitor?: (node: Node) => VisitResult<Node>,
        transformRest?: boolean): Expression {

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

        flattenDestructuring(context, node, value, location, emitAssignment, emitTempVariableAssignment, recordTempVariable, emitRestAssignment, transformRest, visitor);

        if (needsValue) {
            expressions.push(value);
        }

        const expression = inlineExpressions(expressions);
        aggregateTransformFlags(expression);
        return expression;

        function emitAssignment(name: Identifier | ObjectLiteralExpression, value: Expression, location: TextRange) {
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

        function emitRestAssignment(elements: ObjectLiteralElementLike[], value: Expression, location: TextRange) {
            emitAssignment(createObjectLiteral(elements), value, location);
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
        context: TransformationContext,
        node: ParameterDeclaration,
        value: Expression,
        visitor?: (node: Node) => VisitResult<Node>,
        transformRest?: boolean) {
        const declarations: VariableDeclaration[] = [];

        flattenDestructuring(context, node, value, node, emitAssignment, emitTempVariableAssignment, noop, emitRestAssignment, transformRest, visitor);

        return declarations;

        function emitAssignment(name: Identifier | BindingPattern, value: Expression, location: TextRange) {
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

        function emitRestAssignment(elements: BindingElement[], value: Expression, location: TextRange) {
            emitAssignment(createObjectBindingPattern(elements), value, location);
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
        context: TransformationContext,
        node: VariableDeclaration,
        value?: Expression,
        visitor?: (node: Node) => VisitResult<Node>,
        recordTempVariable?: (node: Identifier) => void,
        transformRest?: boolean) {
        const declarations: VariableDeclaration[] = [];

        let pendingAssignments: Expression[];
        flattenDestructuring(context, node, value, node, emitAssignment, emitTempVariableAssignment, recordTempVariable, emitRestAssignment, transformRest, visitor);

        return declarations;

        function emitAssignment(name: Identifier | BindingPattern, value: Expression, location: TextRange, original: Node) {
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

        function emitRestAssignment(elements: BindingElement[], value: Expression, location: TextRange, original: Node) {
            emitAssignment(createObjectBindingPattern(elements), value, location, original);
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
        context: TransformationContext,
        node: VariableDeclaration,
        recordTempVariable: (name: Identifier) => void,
        createAssignmentCallback?: (name: Identifier, value: Expression, location?: TextRange) => Expression,
        visitor?: (node: Node) => VisitResult<Node>) {

        const pendingAssignments: Expression[] = [];

        flattenDestructuring(context, node, /*value*/ undefined, node, emitAssignment, emitTempVariableAssignment, noop, emitRestAssignment, /*transformRest*/ false, visitor);

        const expression = inlineExpressions(pendingAssignments);
        aggregateTransformFlags(expression);
        return expression;

        function emitAssignment(name: Identifier | ObjectLiteralExpression, value: Expression, location: TextRange, original: Node) {
            const expression = createAssignmentCallback
                ? createAssignmentCallback(name.kind === SyntaxKind.Identifier ? name : emitTempVariableAssignment(name, location),
                                           value,
                                           location)
                : createAssignment(name, value, location);

            emitPendingAssignment(expression, original);
        }

        function emitTempVariableAssignment(value: Expression, location: TextRange) {
            const name = createTempVariable(recordTempVariable);
            emitPendingAssignment(createAssignment(name, value, location), /*original*/ undefined);
            return name;
        }

        function emitRestAssignment(elements: ObjectLiteralElementLike[], value: Expression, location: TextRange, original: Node) {
            emitAssignment(createObjectLiteral(elements), value, location, original);
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
        context: TransformationContext,
        root: VariableDeclaration | ParameterDeclaration | BindingElement | BinaryExpression,
        value: Expression,
        location: TextRange,
        emitAssignment: (name: Identifier, value: Expression, location: TextRange, original: Node) => void,
        emitTempVariableAssignment: (value: Expression, location: TextRange) => Identifier,
        recordTempVariable: (node: Identifier) => void,
        emitRestAssignment: (elements: (ObjectLiteralElementLike[] | BindingElement[]), value: Expression, location: TextRange, original: Node) => void,
        transformRest: boolean,
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
                // When doing so we want to highlight the passed in source map node since that's the one needing this temp assignment
                value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ true, location, emitTempVariableAssignment);
            }

            let bindingElements: ObjectLiteralElementLike[] = [];
            let computedTempVariables: Expression[];
            for (let i = 0; i < properties.length; i++) {
                const p = properties[i];
                if (p.kind === SyntaxKind.PropertyAssignment || p.kind === SyntaxKind.ShorthandPropertyAssignment) {
                    if (!transformRest ||
                        p.transformFlags & TransformFlags.ContainsSpreadExpression ||
                        (p.kind === SyntaxKind.PropertyAssignment && p.initializer.transformFlags & TransformFlags.ContainsSpreadExpression) ||
                        isComputedPropertyName(p.name)) {
                        if (bindingElements.length) {
                            emitRestAssignment(bindingElements, value, location, target);
                            bindingElements = [];
                        }
                        const propName = <Identifier | LiteralExpression>(<PropertyAssignment>p).name;
                        const bindingTarget = p.kind === SyntaxKind.ShorthandPropertyAssignment ? <ShorthandPropertyAssignment>p : (<PropertyAssignment>p).initializer || propName;
                        // Assignment for bindingTarget = value.propName should highlight whole property, hence use p as source map node
                        const propAccess = createDestructuringPropertyAccess(value, propName);
                        if (isComputedPropertyName(propName)) {
                            computedTempVariables = append(computedTempVariables, (propAccess as ElementAccessExpression).argumentExpression);
                        }
                        emitDestructuringAssignment(bindingTarget, propAccess, p);
                    }
                    else {
                        bindingElements.push(p);
                    }
                }
                else if (i === properties.length - 1 &&
                         p.kind === SyntaxKind.SpreadAssignment &&
                         p.expression.kind === SyntaxKind.Identifier) {
                    if (bindingElements.length) {
                        emitRestAssignment(bindingElements, value, location, target);
                        bindingElements = [];
                    }
                    const propName = (p as SpreadAssignment).expression as Identifier;
                    const restCall = createRestCall(context, value, target.properties, p => p.name, target, computedTempVariables);
                    emitDestructuringAssignment(propName, restCall, p);
                }
            }
            if (bindingElements.length) {
                emitRestAssignment(bindingElements, value, location, target);
                bindingElements = [];
            }
        }

        function emitArrayLiteralAssignment(target: ArrayLiteralExpression, value: Expression, location: TextRange) {
            if (transformRest) {
                emitESNextArrayLiteralAssignment(target, value, location);
            }
            else {
                emitES2015ArrayLiteralAssignment(target, value, location);
            }
        }

        function emitESNextArrayLiteralAssignment(target: ArrayLiteralExpression, value: Expression, location: TextRange) {
            const elements = target.elements;
            const numElements = elements.length;
            if (numElements !== 1) {
                // For anything but a single element destructuring we need to generate a temporary
                // to ensure value is evaluated exactly once.
                // When doing so we want to highlight the passed-in source map node since thats the one needing this temp assignment
                value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ true, location, emitTempVariableAssignment);
            }

            const expressions: Expression[] = [];
            const spreadContainingExpressions: [Expression, Identifier][] = [];
            for (let i = 0; i < numElements; i++) {
                const e = elements[i];
                if (e.kind === SyntaxKind.OmittedExpression) {
                    continue;
                }
                if (e.transformFlags & TransformFlags.ContainsSpreadExpression && i < numElements - 1) {
                    const tmp = createTempVariable(recordTempVariable);
                    spreadContainingExpressions.push([e, tmp]);
                    expressions.push(tmp);
                }
                else {
                    expressions.push(e);
                }
            }
            emitAssignment(updateArrayLiteral(target, expressions) as any as Identifier, value, undefined, undefined);
            for (const [e, tmp] of spreadContainingExpressions) {
                emitDestructuringAssignment(e, tmp, e);
            }
        }

        function emitES2015ArrayLiteralAssignment(target: ArrayLiteralExpression, value: Expression, location: TextRange) {
            const elements = target.elements;
            const numElements = elements.length;
            if (numElements !== 1) {
                // For anything but a single element destructuring we need to generate a temporary
                // to ensure value is evaluated exactly once.
                // When doing so we want to highlight the passed-in source map node since thats the one needing this temp assignment
                value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ true, location, emitTempVariableAssignment);
            }

            for (let i = 0; i < numElements; i++) {
                const e = elements[i];
                if (e.kind !== SyntaxKind.OmittedExpression) {
                    // Assignment for target = value.propName should highligh whole property, hence use e as source map node
                    if (e.kind !== SyntaxKind.SpreadElement) {
                        emitDestructuringAssignment(e, createElementAccess(value, createLiteral(i)), e);
                    }
                    else if (i === numElements - 1) {
                        emitDestructuringAssignment((<SpreadElement>e).expression, createArraySlice(value, i), e);
                    }
                }
            }
        }

        function emitBindingElement(target: VariableDeclaration | ParameterDeclaration | BindingElement, value: Expression) {
            // Any temporary assignments needed to emit target = value should point to target
            const initializer = visitor ? visitNode(target.initializer, visitor, isExpression) : target.initializer;
            if (transformRest) {
                value = value || initializer;
            }
            else if (initializer) {
                // Combine value and initializer
                value = value ? createDefaultValueCheck(value, initializer, target) : initializer;
            }
            else if (!value) {
                // Use 'void 0' in absence of value and initializer
                value = createVoidZero();
            }

            const name = target.name;
            if (!isBindingPattern(name)) {
                emitAssignment(name, value, target, target);
            }
            else {
                const numElements = name.elements.length;
                if (numElements !== 1) {
                    // For anything other than a single-element destructuring we need to generate a temporary
                    // to ensure value is evaluated exactly once. Additionally, if we have zero elements
                    // we need to emit *something* to ensure that in case a 'var' keyword was already emitted,
                    // so in that case, we'll intentionally create that temporary.
                    value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ numElements !== 0, target, emitTempVariableAssignment);
                }
                if (name.kind === SyntaxKind.ArrayBindingPattern) {
                    emitArrayBindingElement(name as ArrayBindingPattern, value);
                }
                else {
                    emitObjectBindingElement(target, value);
                }
            }
        }

        function emitArrayBindingElement(name: ArrayBindingPattern, value: Expression) {
            if (transformRest) {
                emitESNextArrayBindingElement(name, value);
            }
            else {
                emitES2015ArrayBindingElement(name, value);
            }
        }

        function emitES2015ArrayBindingElement(name: ArrayBindingPattern, value: Expression) {
            const elements = name.elements;
            const numElements = elements.length;
            for (let i = 0; i < numElements; i++) {
                const element = elements[i];
                if (isOmittedExpression(element)) {
                    continue;
                }
                if (!element.dotDotDotToken) {
                    // Rewrite element to a declaration that accesses array element at index i
                    emitBindingElement(element, createElementAccess(value, i));
                }
                else if (i === numElements - 1) {
                    emitBindingElement(element, createArraySlice(value, i));
                }
            }
        }

        function emitESNextArrayBindingElement(name: ArrayBindingPattern, value: Expression) {
            const elements = name.elements;
            const numElements = elements.length;
            const bindingElements: BindingElement[] = [];
            const spreadContainingElements: BindingElement[] = [];
            for (let i = 0; i < numElements; i++) {
                const element = elements[i];
                if (isOmittedExpression(element)) {
                    continue;
                }
                if (element.transformFlags & TransformFlags.ContainsSpreadExpression && i < numElements - 1) {
                    spreadContainingElements.push(element);
                    bindingElements.push(createBindingElement(undefined, undefined, getGeneratedNameForNode(element), undefined, value));
                }
                else {
                    bindingElements.push(element);
                }
            }
            emitAssignment(updateArrayBindingPattern(name, bindingElements) as any as Identifier, value, undefined, undefined);
            for (const element of spreadContainingElements) {
                emitBindingElement(element, getGeneratedNameForNode(element));
            }
        }

        function emitObjectBindingElement(target: VariableDeclaration | ParameterDeclaration | BindingElement, value: Expression) {
            const name = target.name as BindingPattern;
            const elements = name.elements;
            const numElements = elements.length;
            let bindingElements: BindingElement[] = [];
            let computedTempVariables: Expression[];
            for (let i = 0; i < numElements; i++) {
                const element = elements[i];
                if (isOmittedExpression(element)) {
                    continue;
                }
                if (i === numElements - 1 && element.dotDotDotToken) {
                    if (bindingElements.length) {
                        emitRestAssignment(bindingElements, value, target, target);
                        bindingElements = [];
                    }
                    const restCall = createRestCall(context,
                                                    value,
                                                    elements, // name.elements,
                                                    element => (element as BindingElement).propertyName || <Identifier>(element as BindingElement).name,
                                                    name,
                                                    computedTempVariables);
                    emitBindingElement(element, restCall);
                }
                else if (transformRest &&
                         !(element.transformFlags & TransformFlags.ContainsSpreadExpression) &&
                         !isComputedPropertyName(element.propertyName || element.name)) {
                    // do not emit until we have a complete bundle of ES2015 syntax
                    bindingElements.push(element);
                }
                else {
                    if (bindingElements.length) {
                        emitRestAssignment(bindingElements, value, target, target);
                        bindingElements = [];
                    }
                    // Rewrite element to a declaration with an initializer that fetches property
                    const propName = element.propertyName || <Identifier>element.name;
                    const propAccess = createDestructuringPropertyAccess(value, propName);
                    if (isComputedPropertyName(propName)) {
                        computedTempVariables = append(computedTempVariables, (propAccess as ElementAccessExpression).argumentExpression);
                    }
                    emitBindingElement(element, propAccess);
                }
            }
            if (bindingElements.length) {
                emitRestAssignment(bindingElements, value, target, target);
                bindingElements = [];
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

    const restHelper: EmitHelper = {
        name: "typescript:rest",
        scoped: false,
        text: `
            var __rest = (this && this.__rest) || function (s, e) {
                var t = {};
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                    t[p] = s[p];
                if (typeof Object.getOwnPropertySymbols === "function")
                    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
                        t[p[i]] = s[p[i]];
                return t;
            };`
    };

    /** Given value: o, propName: p, pattern: { a, b, ...p } from the original statement
     * `{ a, b, ...p } = o`, create `p = __rest(o, ["a", "b"]);`*/
    function createRestCall<T extends Node>(context: TransformationContext, value: Expression, elements: T[], getPropertyName: (element: T) => PropertyName, location: TextRange, computedTempVariables: Expression[]): Expression {
        context.requestEmitHelper(restHelper);
        const propertyNames: Expression[] = [];
        for (let i = 0; i < elements.length - 1; i++) {
            const element = elements[i];
            if (isOmittedExpression(element)) {
                continue;
            }
            if (isComputedPropertyName(getPropertyName(element))) {
                // get the temp name and put that in there instead, like `_tmp + ""`
                const temp = computedTempVariables.shift();
                propertyNames.push(createConditional(createBinary(createTypeOf(temp),
                                                                    SyntaxKind.EqualsEqualsEqualsToken,
                                                                    createLiteral("symbol")),
                                                        createToken(SyntaxKind.QuestionToken),
                                                        temp,
                                                        createToken(SyntaxKind.ColonToken),
                                                        createBinary(temp, SyntaxKind.PlusToken, createLiteral(""))));
            }
            else {
                const propName = getTextOfPropertyName(getPropertyName(element));
                propertyNames.push(createLiteral(propName, location));
            }
        }
        const args = createSynthesizedNodeArray([value, createArrayLiteral(propertyNames, location)]);
        return createCall(getHelperName("__rest"), /*typeArguments*/ undefined, args);
    }
}
