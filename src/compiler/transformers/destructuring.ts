/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />

/*@internal*/
namespace ts {
    interface FlattenHost {
        context: TransformationContext;
        level: FlattenLevel;
        recordTempVariablesInLine: boolean;
        emitExpression: (value: Expression) => void;
        emitBindingOrAssignment: (target: BindingOrAssignmentElementTarget, value: Expression, location: TextRange, original: Node) => void;
        createArrayBindingOrAssignmentPattern: (elements: BindingOrAssignmentElement[]) => ArrayBindingOrAssignmentPattern;
        createObjectBindingOrAssignmentPattern: (elements: BindingOrAssignmentElement[]) => ObjectBindingOrAssignmentPattern;
        createArrayBindingOrAssignmentElement: (node: Identifier) => BindingOrAssignmentElement;
        visitor?: (node: Node) => VisitResult<Node>;
    }

    export const enum FlattenLevel {
        All,
        ObjectRest,
    }

    /**
     * Flattens a DestructuringAssignment or a VariableDeclaration to an expression.
     *
     * @param context The transformation context
     * @param node The node to flatten.
     * @param needsValue Indicates whether the value from the right-hand-side of the
     * destructuring assignment is needed as part of a larger expression.
     * @param level Indicates the extent to which flattening should occur.
     * @param createAssignmentCallback A callback used to create the assignment expression.
     * @param visitor A visitor used to visit initializers.
     */
    export function flattenDestructuringAssignment(
        context: TransformationContext,
        node: VariableDeclaration | DestructuringAssignment,
        needsValue: boolean,
        level: FlattenLevel,
        createAssignmentCallback: (name: Identifier, value: Expression, location?: TextRange) => Expression,
        visitor: (node: Node) => VisitResult<Node>): Expression {

        let location: TextRange = node;
        let value: Expression;
        if (isDestructuringAssignment(node)) {
            value = node.right;
            while (isEmptyObjectLiteralOrArrayLiteral(node.left)) {
                if (isDestructuringAssignment(value)) {
                    location = node = value;
                    value = node.right;
                }
                else {
                    return value;
                }
            }
        }

        const expressions: Expression[] = [];
        const host: FlattenHost = {
            context,
            level,
            recordTempVariablesInLine: false,
            emitExpression,
            emitBindingOrAssignment,
            createArrayBindingOrAssignmentPattern: makeArrayAssignmentPattern,
            createObjectBindingOrAssignmentPattern: makeObjectAssignmentPattern,
            createArrayBindingOrAssignmentElement: makeAssignmentElement,
            visitor
        };

        if (value) {
            value = visitNode(value, visitor, isExpression);
            if (needsValue) {
                // If the right-hand value of the destructuring assignment needs to be preserved (as
                // is the case when the destructuring assignment is part of a larger expression),
                // then we need to cache the right-hand value.
                //
                // The source map location for the assignment should point to the entire binary
                // expression.
                value = ensureIdentifier(host, value, /*reuseIdentifierExpressions*/ true, location);
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
        }

        flattenBindingOrAssignmentElement(host, node, value, location, /*skipInitializer*/ isDestructuringAssignment(node));

        if (value && needsValue) {
            expressions.push(value);
        }

        return aggregateTransformFlags(inlineExpressions(expressions));

        function emitExpression(expression: Expression) {
            // NOTE: this completely disables source maps, but aligns with the behavior of
            //       `emitAssignment` in the old emitter.
            setEmitFlags(expression, EmitFlags.NoNestedSourceMaps);
            aggregateTransformFlags(expression);
            expressions.push(expression);
        }

        function emitBindingOrAssignment(target: BindingOrAssignmentElementTarget, value: Expression, location: TextRange, original: Node) {
            Debug.assertNode(target, createAssignmentCallback ? isIdentifier : isExpression);
            const expression = createAssignmentCallback
                ? createAssignmentCallback(<Identifier>target, value, location)
                : createAssignment(visitNode(<Expression>target, visitor, isExpression), value, location);
            expression.original = original;
            emitExpression(expression);
        }
    }

    /**
     * Flattens a VariableDeclaration or ParameterDeclaration to one or more variable declarations.
     *
     * @param context The transformation context
     * @param node The node to flatten.
     * @param boundValue The value bound to the declaration.
     * @param recordTempVariablesInLine Indicates whether temporary variables should be recored in-line.
     * @param level Indicates the extent to which flattening should occur.
     */
    export function flattenDestructuringBinding(
        context: TransformationContext,
        node: VariableDeclaration | ParameterDeclaration,
        boundValue: Expression | undefined,
        skipInitializer: boolean,
        recordTempVariablesInLine: boolean,
        level: FlattenLevel,
        visitor: (node: Node) => VisitResult<Node>): VariableDeclaration[] {

        let pendingExpressions: Expression[];
        const pendingDeclarations: { pendingExpressions?: Expression[], name: BindingName, value: Expression, location?: TextRange, original?: Node; }[] = [];
        const declarations: VariableDeclaration[] = [];
        const host: FlattenHost = {
            context,
            level,
            recordTempVariablesInLine,
            emitExpression,
            emitBindingOrAssignment,
            createArrayBindingOrAssignmentPattern: makeArrayBindingPattern,
            createObjectBindingOrAssignmentPattern: makeObjectBindingPattern,
            createArrayBindingOrAssignmentElement: makeBindingElement,
            visitor
        };

        flattenBindingOrAssignmentElement(host, node, boundValue, node, skipInitializer);

        if (pendingExpressions) {
            const temp = createTempVariable(/*recordTempVariable*/ undefined);
            if (recordTempVariablesInLine) {
                const value = inlineExpressions(pendingExpressions);
                pendingExpressions = undefined;
                emitBindingOrAssignment(temp, value, /*location*/ undefined, /*original*/ undefined);
            }
            else {
                context.hoistVariableDeclaration(temp);
                const pendingDeclaration = lastOrUndefined(pendingDeclarations);
                pendingDeclaration.pendingExpressions = append(
                    pendingDeclaration.pendingExpressions,
                    createAssignment(temp, pendingDeclaration.value)
                );
                addRange(pendingDeclaration.pendingExpressions, pendingExpressions);
                pendingDeclaration.value = temp;
            }
        }

        for (const { pendingExpressions, name, value, location, original } of pendingDeclarations) {
            const variable = createVariableDeclaration(
                name,
                /*type*/ undefined,
                pendingExpressions ? inlineExpressions(append(pendingExpressions, value)) : value,
                location);
            variable.original = original;
            if (isIdentifier(name)) {
                setEmitFlags(variable, EmitFlags.NoNestedSourceMaps);
            }
            aggregateTransformFlags(variable);
            declarations.push(variable);
        }

        return declarations;

        function emitExpression(value: Expression) {
            pendingExpressions = append(pendingExpressions, value);
        }

        function emitBindingOrAssignment(target: BindingOrAssignmentElementTarget, value: Expression, location: TextRange, original: Node) {
            Debug.assertNode(target, isBindingName);
            if (pendingExpressions) {
                value = inlineExpressions(append(pendingExpressions, value));
                pendingExpressions = undefined;
            }
            pendingDeclarations.push({ pendingExpressions, name: <BindingName>target, value, location, original });
        }
    }

    function flattenBindingOrAssignmentElement(
        host: FlattenHost,
        bindingElement: BindingOrAssignmentElement,
        boundValue: Expression | undefined,
        location: TextRange,
        skipInitializer?: boolean) {
        if (!skipInitializer) {
            const initializer = visitNode(getInitializerOfBindingOrAssignmentElement(bindingElement), host.visitor, isExpression);
            if (initializer) {
                // Combine value and initializer
                boundValue = boundValue ? createDefaultValueCheck(host, boundValue, initializer, location) : initializer;
            }
            else if (!boundValue) {
                // Use 'void 0' in absence of value and initializer
                boundValue = createVoidZero();
            }
        }
        const bindingTarget = getTargetOfBindingOrAssignmentElement(bindingElement);
        if (isObjectBindingOrAssignmentPattern(bindingTarget)) {
            flattenObjectBindingOrAssignmentPattern(host, bindingElement, bindingTarget, boundValue, location);
        }
        else if (isArrayBindingOrAssignmentPattern(bindingTarget)) {
            flattenArrayBindingOrAssignmentPattern(host, bindingElement, bindingTarget, boundValue, location);
        }
        else {
            host.emitBindingOrAssignment(bindingTarget, boundValue, location, /*original*/ bindingElement);
        }
    }

    function flattenObjectBindingOrAssignmentPattern(host: FlattenHost, parentElement: BindingOrAssignmentElement, bindingTarget: ObjectBindingOrAssignmentPattern, boundValue: Expression, location: TextRange) {
        const elements = getElementsOfBindingOrAssignmentPattern(bindingTarget);
        const numElements = elements.length;
        if (numElements !== 1) {
            // For anything other than a single-element destructuring we need to generate a temporary
            // to ensure value is evaluated exactly once. Additionally, if we have zero elements
            // we need to emit *something* to ensure that in case a 'var' keyword was already emitted,
            // so in that case, we'll intentionally create that temporary.
            const reuseIdentifierExpressions = !isDeclarationBindingElement(parentElement) || numElements !== 0;
            boundValue = ensureIdentifier(host, boundValue, reuseIdentifierExpressions, location);
        }
        let bindingElements: BindingOrAssignmentElement[];
        let computedTempVariables: Expression[];
        for (let i = 0; i < numElements; i++) {
            const element = elements[i];
            if (!getRestIndicatorOfBindingOrAssignmentElement(element)) {
                const propertyName = getPropertyNameOfBindingOrAssignmentElement(element);
                if (host.level >= FlattenLevel.ObjectRest
                    && !(element.transformFlags & (TransformFlags.ContainsRest | TransformFlags.ContainsObjectRest))
                    && !(getTargetOfBindingOrAssignmentElement(element).transformFlags & (TransformFlags.ContainsRest | TransformFlags.ContainsObjectRest))
                    && !isComputedPropertyName(propertyName)) {
                    bindingElements = append(bindingElements, element);
                }
                else {
                    if (bindingElements) {
                        host.emitBindingOrAssignment(host.createObjectBindingOrAssignmentPattern(bindingElements), boundValue, location, bindingTarget);
                        bindingElements = undefined;
                    }
                    const value = createDestructuringPropertyAccess(host, boundValue, propertyName);
                    if (isComputedPropertyName(propertyName)) {
                        computedTempVariables = append(computedTempVariables, (value as ElementAccessExpression).argumentExpression);
                    }
                    flattenBindingOrAssignmentElement(host, element, value, /*location*/ element);
                }
            }
            else if (i === numElements - 1) {
                if (bindingElements) {
                    host.emitBindingOrAssignment(host.createObjectBindingOrAssignmentPattern(bindingElements), boundValue, location, bindingTarget);
                    bindingElements = undefined;
                }
                const value = createRestCall(boundValue, elements, computedTempVariables, bindingTarget);
                flattenBindingOrAssignmentElement(host, element, value, element);
            }
        }
        if (bindingElements) {
            host.emitBindingOrAssignment(host.createObjectBindingOrAssignmentPattern(bindingElements), boundValue, location, bindingTarget);
        }
    }

    function flattenArrayBindingOrAssignmentPattern(host: FlattenHost, parentElement: BindingOrAssignmentElement, bindingTarget: ArrayBindingOrAssignmentPattern, boundValue: Expression, location: TextRange) {
        const elements = getElementsOfBindingOrAssignmentPattern(bindingTarget);
        const numElements = elements.length;
        if (numElements !== 1 && (host.level < FlattenLevel.ObjectRest || numElements === 0)) {
            // For anything other than a single-element destructuring we need to generate a temporary
            // to ensure value is evaluated exactly once. Additionally, if we have zero elements
            // we need to emit *something* to ensure that in case a 'var' keyword was already emitted,
            // so in that case, we'll intentionally create that temporary.
            const reuseIdentifierExpressions = !isDeclarationBindingElement(parentElement) || numElements !== 0;
            boundValue = ensureIdentifier(host, boundValue, reuseIdentifierExpressions, location);
        }
        let bindingElements: BindingOrAssignmentElement[];
        let restContainingElements: [Identifier, BindingOrAssignmentElement][];
        for (let i = 0; i < numElements; i++) {
            const element = elements[i];
            if (host.level >= FlattenLevel.ObjectRest) {
                // If an array pattern contains an ObjectRest, we must cache the result so that we
                // can perform the ObjectRest destructuring in a different declaration
                if (element.transformFlags & TransformFlags.ContainsObjectRest) {
                    const temp = createTempVariable(/*recordTempVariable*/ undefined);
                    if (!host.recordTempVariablesInLine) {
                        host.context.hoistVariableDeclaration(temp);
                    }

                    restContainingElements = append(restContainingElements, <[Identifier, BindingOrAssignmentElement]>[temp, element]);
                    bindingElements = append(bindingElements, host.createArrayBindingOrAssignmentElement(temp));
                }
                else {
                    bindingElements = append(bindingElements, element);
                }
            }
            else if (isOmittedExpression(element)) {
                continue;
            }
            else if (!getRestIndicatorOfBindingOrAssignmentElement(element)) {
                const value = createElementAccess(boundValue, i);
                flattenBindingOrAssignmentElement(host, element, value, /*location*/ element);
            }
            else if (i === numElements - 1) {
                const value = createArraySlice(boundValue, i);
                flattenBindingOrAssignmentElement(host, element, value, /*location*/ element);
            }
        }
        if (bindingElements) {
            host.emitBindingOrAssignment(host.createArrayBindingOrAssignmentPattern(bindingElements), boundValue, location, bindingTarget);
        }
        if (restContainingElements) {
            for (const [id, element] of restContainingElements) {
                flattenBindingOrAssignmentElement(host, element, id, element);
            }
        }
    }

    /**
     * Creates an expression used to provide a default value if a value is `undefined` at runtime.
     */
    function createDefaultValueCheck(host: FlattenHost, value: Expression, defaultValue: Expression, location: TextRange): Expression {
        value = ensureIdentifier(host, value, /*reuseIdentifierExpressions*/ true, location);
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
     * @param emitTempVariableAssignment A callback used to emit a temporary variable.
     */
    function createDestructuringPropertyAccess(host: FlattenHost, expression: Expression, propertyName: PropertyName): LeftHandSideExpression {
        if (isComputedPropertyName(propertyName)) {
            const argumentExpression = ensureIdentifier(host, propertyName.expression, /*reuseIdentifierExpressions*/ false, /*location*/ propertyName);
            return createElementAccess(expression, argumentExpression);
        }
        else if (isLiteralExpression(propertyName)) {
            const argumentExpression = getSynthesizedClone(propertyName);
            argumentExpression.text = unescapeIdentifier(argumentExpression.text);
            return createElementAccess(expression, argumentExpression);
        }
        else if (isGeneratedIdentifier(propertyName)) {
            const name = getSynthesizedClone(propertyName);
            name.text = unescapeIdentifier(name.text);
            return createPropertyAccess(expression, name);
        }
        else {
            const name = createIdentifier(unescapeIdentifier(propertyName.text));
            return createPropertyAccess(expression, name);
        }
    }

    /**
     * Ensures that there exists a declared identifier whose value holds the given expression.
     * This function is useful to ensure that the expression's value can be read from in subsequent expressions.
     * Unless 'reuseIdentifierExpressions' is false, 'value' will be returned if it is just an identifier.
     *
     * @param value the expression whose value needs to be bound.
     * @param reuseIdentifierExpressions true if identifier expressions can simply be returned;
     * false if it is necessary to always emit an identifier.
     * @param emitTempVariableAssignment A callback used to emit a temporary variable.
     * @param location The location to use for source maps and comments.
     */
    function ensureIdentifier(
        host: FlattenHost,
        value: Expression,
        reuseIdentifierExpressions: boolean,
        location: TextRange) {

        if (isIdentifier(value) && reuseIdentifierExpressions) {
            return value;
        }
        else {
            const temp = createTempVariable(/*recordTempVariable*/ undefined);
            if (host.recordTempVariablesInLine) {
                host.emitBindingOrAssignment(temp, value, location, /*original*/ undefined);
            }
            else {
                host.context.hoistVariableDeclaration(temp);
                host.emitExpression(createAssignment(temp, value, location));
            }
            return temp;
        }
    }

    function makeArrayBindingPattern(elements: BindingOrAssignmentElement[]) {
        Debug.assertEachNode(elements, isArrayBindingElement);
        return createArrayBindingPattern(<ArrayBindingElement[]>elements);
    }

    function makeArrayAssignmentPattern(elements: BindingOrAssignmentElement[]) {
        return createArrayLiteral(map(elements, convertToArrayAssignmentElement));
    }

    function makeObjectBindingPattern(elements: BindingOrAssignmentElement[]) {
        Debug.assertEachNode(elements, isBindingElement);
        return createObjectBindingPattern(<BindingElement[]>elements);
    }

    function makeObjectAssignmentPattern(elements: BindingOrAssignmentElement[]) {
        return createObjectLiteral(map(elements, convertToObjectAssignmentElement));
    }

    function makeBindingElement(name: Identifier) {
        return createBindingElement(/*propertyName*/ undefined, /*dotDotDotToken*/ undefined, name);
    }

    function makeAssignmentElement(name: Identifier) {
        return name;
    }

    /** Given value: o, propName: p, pattern: { a, b, ...p } from the original statement
     * `{ a, b, ...p } = o`, create `p = __rest(o, ["a", "b"]);`*/
    function createRestCall(value: Expression, elements: BindingOrAssignmentElement[], computedTempVariables: Expression[], location: TextRange): Expression {
        const propertyNames: Expression[] = [];
        for (let i = 0; i < elements.length - 1; i++) {
            const propertyName = getPropertyNameOfBindingOrAssignmentElement(elements[i]);
            if (propertyName) {
                if (isComputedPropertyName(propertyName)) {
                    // get the temp name and put that in there instead, like `_tmp + ""`
                    const temp = computedTempVariables.shift();
                    propertyNames.push(
                        createConditional(
                            createStrictEquality(createTypeOf(temp), createLiteral("symbol")),
                            createToken(SyntaxKind.QuestionToken),
                            temp,
                            createToken(SyntaxKind.ColonToken),
                            createAdd(temp, createLiteral(""))
                        )
                    );
                }
                else {
                    propertyNames.push(createLiteral(propertyName));
                }
            }
        }
        const args = createSynthesizedNodeArray([value, createArrayLiteral(propertyNames, location)]);
        return createCall(createIdentifier("__rest"), undefined, args);
    }
}
