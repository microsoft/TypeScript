/*@internal*/
namespace ts {
    interface FlattenContext {
        context: TransformationContext;
        level: FlattenLevel;
        downlevelIteration: boolean;
        hoistTempVariables: boolean;
        emitExpression: (value: Expression) => void;
        emitBindingOrAssignment: (target: BindingOrAssignmentElementTarget, value: Expression, location: TextRange, original: Node | undefined) => void;
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
     * @param node The node to flatten.
     * @param visitor An optional visitor used to visit initializers.
     * @param context The transformation context.
     * @param level Indicates the extent to which flattening should occur.
     * @param needsValue An optional value indicating whether the value from the right-hand-side of
     * the destructuring assignment is needed as part of a larger expression.
     * @param createAssignmentCallback An optional callback used to create the assignment expression.
     */
    export function flattenDestructuringAssignment(
        node: VariableDeclaration | DestructuringAssignment,
        visitor: ((node: Node) => VisitResult<Node>) | undefined,
        context: TransformationContext,
        level: FlattenLevel,
        needsValue?: boolean,
        createAssignmentCallback?: (name: Identifier, value: Expression, location?: TextRange) => Expression): Expression {
        let location: TextRange = node;
        let value: Expression | undefined;
        if (isDestructuringAssignment(node)) {
            value = node.right;
            while (isEmptyArrayLiteral(node.left) || isEmptyObjectLiteral(node.left)) {
                if (isDestructuringAssignment(value)) {
                    location = node = value;
                    value = node.right;
                }
                else {
                    return visitNode(value, visitor, isExpression);
                }
            }
        }

        let expressions: Expression[] | undefined;
        const flattenContext: FlattenContext = {
            context,
            level,
            downlevelIteration: !!context.getCompilerOptions().downlevelIteration,
            hoistTempVariables: true,
            emitExpression,
            emitBindingOrAssignment,
            createArrayBindingOrAssignmentPattern: makeArrayAssignmentPattern,
            createObjectBindingOrAssignmentPattern: makeObjectAssignmentPattern,
            createArrayBindingOrAssignmentElement: makeAssignmentElement,
            visitor
        };

        if (value) {
            value = visitNode(value, visitor, isExpression);

            if (isIdentifier(value) && bindingOrAssignmentElementAssignsToName(node, value.escapedText) ||
                bindingOrAssignmentElementContainsNonLiteralComputedName(node)) {
                // If the right-hand value of the assignment is also an assignment target then
                // we need to cache the right-hand value.
                value = ensureIdentifier(flattenContext, value, /*reuseIdentifierExpressions*/ false, location);
            }
            else if (needsValue) {
                // If the right-hand value of the destructuring assignment needs to be preserved (as
                // is the case when the destructuring assignment is part of a larger expression),
                // then we need to cache the right-hand value.
                //
                // The source map location for the assignment should point to the entire binary
                // expression.
                value = ensureIdentifier(flattenContext, value, /*reuseIdentifierExpressions*/ true, location);
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

        flattenBindingOrAssignmentElement(flattenContext, node, value, location, /*skipInitializer*/ isDestructuringAssignment(node));

        if (value && needsValue) {
            if (!some(expressions)) {
                return value;
            }

            expressions.push(value);
        }

        return aggregateTransformFlags(inlineExpressions(expressions!)) || createOmittedExpression();

        function emitExpression(expression: Expression) {
            aggregateTransformFlags(expression);
            expressions = append(expressions, expression);
        }

        function emitBindingOrAssignment(target: BindingOrAssignmentElementTarget, value: Expression, location: TextRange, original: Node) {
            Debug.assertNode(target, createAssignmentCallback ? isIdentifier : isExpression);
            const expression = createAssignmentCallback
                ? createAssignmentCallback(<Identifier>target, value, location)
                : setTextRange(
                    createAssignment(visitNode(<Expression>target, visitor, isExpression), value),
                    location
                );
            expression.original = original;
            emitExpression(expression);
        }
    }

    function bindingOrAssignmentElementAssignsToName(element: BindingOrAssignmentElement, escapedName: __String): boolean {
        const target = getTargetOfBindingOrAssignmentElement(element)!; // TODO: GH#18217
        if (isBindingOrAssignmentPattern(target)) {
            return bindingOrAssignmentPatternAssignsToName(target, escapedName);
        }
        else if (isIdentifier(target)) {
            return target.escapedText === escapedName;
        }
        return false;
    }

    function bindingOrAssignmentPatternAssignsToName(pattern: BindingOrAssignmentPattern, escapedName: __String): boolean {
        const elements = getElementsOfBindingOrAssignmentPattern(pattern);
        for (const element of elements) {
            if (bindingOrAssignmentElementAssignsToName(element, escapedName)) {
                return true;
            }
        }
        return false;
    }

    function bindingOrAssignmentElementContainsNonLiteralComputedName(element: BindingOrAssignmentElement): boolean {
        const propertyName = tryGetPropertyNameOfBindingOrAssignmentElement(element);
        if (propertyName && isComputedPropertyName(propertyName) && !isLiteralExpression(propertyName.expression)) {
            return true;
        }
        const target = getTargetOfBindingOrAssignmentElement(element);
        return !!target && isBindingOrAssignmentPattern(target) && bindingOrAssignmentPatternContainsNonLiteralComputedName(target);
    }

    function bindingOrAssignmentPatternContainsNonLiteralComputedName(pattern: BindingOrAssignmentPattern): boolean {
        return !!forEach(getElementsOfBindingOrAssignmentPattern(pattern), bindingOrAssignmentElementContainsNonLiteralComputedName);
    }

    /**
     * Flattens a VariableDeclaration or ParameterDeclaration to one or more variable declarations.
     *
     * @param node The node to flatten.
     * @param visitor An optional visitor used to visit initializers.
     * @param context The transformation context.
     * @param boundValue The value bound to the declaration.
     * @param skipInitializer A value indicating whether to ignore the initializer of `node`.
     * @param hoistTempVariables Indicates whether temporary variables should not be recorded in-line.
     * @param level Indicates the extent to which flattening should occur.
     */
    export function flattenDestructuringBinding(
        node: VariableDeclaration | ParameterDeclaration,
        visitor: (node: Node) => VisitResult<Node>,
        context: TransformationContext,
        level: FlattenLevel,
        rval?: Expression,
        hoistTempVariables = false,
        skipInitializer?: boolean): VariableDeclaration[] {
        let pendingExpressions: Expression[] | undefined;
        const pendingDeclarations: { pendingExpressions?: Expression[], name: BindingName, value: Expression, location?: TextRange, original?: Node; }[] = [];
        const declarations: VariableDeclaration[] = [];
        const flattenContext: FlattenContext = {
            context,
            level,
            downlevelIteration: !!context.getCompilerOptions().downlevelIteration,
            hoistTempVariables,
            emitExpression,
            emitBindingOrAssignment,
            createArrayBindingOrAssignmentPattern: makeArrayBindingPattern,
            createObjectBindingOrAssignmentPattern: makeObjectBindingPattern,
            createArrayBindingOrAssignmentElement: makeBindingElement,
            visitor
        };

        if (isVariableDeclaration(node)) {
            let initializer = getInitializerOfBindingOrAssignmentElement(node);
            if (initializer && (isIdentifier(initializer) && bindingOrAssignmentElementAssignsToName(node, initializer.escapedText) ||
                bindingOrAssignmentElementContainsNonLiteralComputedName(node))) {
                // If the right-hand value of the assignment is also an assignment target then
                // we need to cache the right-hand value.
                initializer = ensureIdentifier(flattenContext, initializer, /*reuseIdentifierExpressions*/ false, initializer);
                node = updateVariableDeclaration(node, node.name, node.type, initializer);
            }
        }

        flattenBindingOrAssignmentElement(flattenContext, node, rval, node, skipInitializer);
        if (pendingExpressions) {
            const temp = createTempVariable(/*recordTempVariable*/ undefined);
            if (hoistTempVariables) {
                const value = inlineExpressions(pendingExpressions);
                pendingExpressions = undefined;
                emitBindingOrAssignment(temp, value, /*location*/ undefined, /*original*/ undefined);
            }
            else {
                context.hoistVariableDeclaration(temp);
                const pendingDeclaration = last(pendingDeclarations);
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
                pendingExpressions ? inlineExpressions(append(pendingExpressions, value)) : value
            );
            variable.original = original;
            setTextRange(variable, location);
            aggregateTransformFlags(variable);
            declarations.push(variable);
        }
        return declarations;

        function emitExpression(value: Expression) {
            pendingExpressions = append(pendingExpressions, value);
        }

        function emitBindingOrAssignment(target: BindingOrAssignmentElementTarget, value: Expression, location: TextRange | undefined, original: Node | undefined) {
            Debug.assertNode(target, isBindingName);
            if (pendingExpressions) {
                value = inlineExpressions(append(pendingExpressions, value));
                pendingExpressions = undefined;
            }
            pendingDeclarations.push({ pendingExpressions, name: target, value, location, original });
        }
    }

    /**
     * Flattens a BindingOrAssignmentElement into zero or more bindings or assignments.
     *
     * @param flattenContext Options used to control flattening.
     * @param element The element to flatten.
     * @param value The current RHS value to assign to the element.
     * @param location The location to use for source maps and comments.
     * @param skipInitializer An optional value indicating whether to include the initializer
     * for the element.
     */
    function flattenBindingOrAssignmentElement(
        flattenContext: FlattenContext,
        element: BindingOrAssignmentElement,
        value: Expression | undefined,
        location: TextRange,
        skipInitializer?: boolean) {
        if (!skipInitializer) {
            const initializer = visitNode(getInitializerOfBindingOrAssignmentElement(element), flattenContext.visitor, isExpression);
            if (initializer) {
                // Combine value and initializer
                value = value ? createDefaultValueCheck(flattenContext, value, initializer, location) : initializer;
            }
            else if (!value) {
                // Use 'void 0' in absence of value and initializer
                value = createVoidZero();
            }
        }
        const bindingTarget = getTargetOfBindingOrAssignmentElement(element)!; // TODO: GH#18217
        if (isObjectBindingOrAssignmentPattern(bindingTarget)) {
            flattenObjectBindingOrAssignmentPattern(flattenContext, element, bindingTarget, value!, location);
        }
        else if (isArrayBindingOrAssignmentPattern(bindingTarget)) {
            flattenArrayBindingOrAssignmentPattern(flattenContext, element, bindingTarget, value!, location);
        }
        else {
            flattenContext.emitBindingOrAssignment(bindingTarget, value!, location, /*original*/ element); // TODO: GH#18217
        }
    }

    /**
     * Flattens an ObjectBindingOrAssignmentPattern into zero or more bindings or assignments.
     *
     * @param flattenContext Options used to control flattening.
     * @param parent The parent element of the pattern.
     * @param pattern The ObjectBindingOrAssignmentPattern to flatten.
     * @param value The current RHS value to assign to the element.
     * @param location The location to use for source maps and comments.
     */
    function flattenObjectBindingOrAssignmentPattern(flattenContext: FlattenContext, parent: BindingOrAssignmentElement, pattern: ObjectBindingOrAssignmentPattern, value: Expression, location: TextRange) {
        const elements = getElementsOfBindingOrAssignmentPattern(pattern);
        const numElements = elements.length;
        if (numElements !== 1) {
            // For anything other than a single-element destructuring we need to generate a temporary
            // to ensure value is evaluated exactly once. Additionally, if we have zero elements
            // we need to emit *something* to ensure that in case a 'var' keyword was already emitted,
            // so in that case, we'll intentionally create that temporary.
            const reuseIdentifierExpressions = !isDeclarationBindingElement(parent) || numElements !== 0;
            value = ensureIdentifier(flattenContext, value, reuseIdentifierExpressions, location);
        }
        let bindingElements: BindingOrAssignmentElement[] | undefined;
        let computedTempVariables: Expression[] | undefined;
        for (let i = 0; i < numElements; i++) {
            const element = elements[i];
            if (!getRestIndicatorOfBindingOrAssignmentElement(element)) {
                const propertyName = getPropertyNameOfBindingOrAssignmentElement(element)!;
                if (flattenContext.level >= FlattenLevel.ObjectRest
                    && !(element.transformFlags & (TransformFlags.ContainsRestOrSpread | TransformFlags.ContainsObjectRestOrSpread))
                    && !(getTargetOfBindingOrAssignmentElement(element)!.transformFlags & (TransformFlags.ContainsRestOrSpread | TransformFlags.ContainsObjectRestOrSpread))
                    && !isComputedPropertyName(propertyName)) {
                    bindingElements = append(bindingElements, visitNode(element, flattenContext.visitor));
                }
                else {
                    if (bindingElements) {
                        flattenContext.emitBindingOrAssignment(flattenContext.createObjectBindingOrAssignmentPattern(bindingElements), value, location, pattern);
                        bindingElements = undefined;
                    }
                    const rhsValue = createDestructuringPropertyAccess(flattenContext, value, propertyName);
                    if (isComputedPropertyName(propertyName)) {
                        computedTempVariables = append<Expression>(computedTempVariables, (rhsValue as ElementAccessExpression).argumentExpression);
                    }
                    flattenBindingOrAssignmentElement(flattenContext, element, rhsValue, /*location*/ element);
                }
            }
            else if (i === numElements - 1) {
                if (bindingElements) {
                    flattenContext.emitBindingOrAssignment(flattenContext.createObjectBindingOrAssignmentPattern(bindingElements), value, location, pattern);
                    bindingElements = undefined;
                }
                const rhsValue = createRestCall(flattenContext.context, value, elements, computedTempVariables!, pattern); // TODO: GH#18217
                flattenBindingOrAssignmentElement(flattenContext, element, rhsValue, element);
            }
        }
        if (bindingElements) {
            flattenContext.emitBindingOrAssignment(flattenContext.createObjectBindingOrAssignmentPattern(bindingElements), value, location, pattern);
        }
    }

    /**
     * Flattens an ArrayBindingOrAssignmentPattern into zero or more bindings or assignments.
     *
     * @param flattenContext Options used to control flattening.
     * @param parent The parent element of the pattern.
     * @param pattern The ArrayBindingOrAssignmentPattern to flatten.
     * @param value The current RHS value to assign to the element.
     * @param location The location to use for source maps and comments.
     */
    function flattenArrayBindingOrAssignmentPattern(flattenContext: FlattenContext, parent: BindingOrAssignmentElement, pattern: ArrayBindingOrAssignmentPattern, value: Expression, location: TextRange) {
        const elements = getElementsOfBindingOrAssignmentPattern(pattern);
        const numElements = elements.length;
        if (flattenContext.level < FlattenLevel.ObjectRest && flattenContext.downlevelIteration) {
            // Read the elements of the iterable into an array
            value = ensureIdentifier(
                flattenContext,
                createReadHelper(
                    flattenContext.context,
                    value,
                    numElements > 0 && getRestIndicatorOfBindingOrAssignmentElement(elements[numElements - 1])
                        ? undefined
                        : numElements,
                    location
                ),
                /*reuseIdentifierExpressions*/ false,
                location
            );
        }
        else if (numElements !== 1 && (flattenContext.level < FlattenLevel.ObjectRest || numElements === 0)
            || every(elements, isOmittedExpression)) {
            // For anything other than a single-element destructuring we need to generate a temporary
            // to ensure value is evaluated exactly once. Additionally, if we have zero elements
            // we need to emit *something* to ensure that in case a 'var' keyword was already emitted,
            // so in that case, we'll intentionally create that temporary.
            // Or all the elements of the binding pattern are omitted expression such as "var [,] = [1,2]",
            // then we will create temporary variable.
            const reuseIdentifierExpressions = !isDeclarationBindingElement(parent) || numElements !== 0;
            value = ensureIdentifier(flattenContext, value, reuseIdentifierExpressions, location);
        }
        let bindingElements: BindingOrAssignmentElement[] | undefined;
        let restContainingElements: [Identifier, BindingOrAssignmentElement][] | undefined;
        for (let i = 0; i < numElements; i++) {
            const element = elements[i];
            if (flattenContext.level >= FlattenLevel.ObjectRest) {
                // If an array pattern contains an ObjectRest, we must cache the result so that we
                // can perform the ObjectRest destructuring in a different declaration
                if (element.transformFlags & TransformFlags.ContainsObjectRestOrSpread) {
                    const temp = createTempVariable(/*recordTempVariable*/ undefined);
                    if (flattenContext.hoistTempVariables) {
                        flattenContext.context.hoistVariableDeclaration(temp);
                    }

                    restContainingElements = append(restContainingElements, <[Identifier, BindingOrAssignmentElement]>[temp, element]);
                    bindingElements = append(bindingElements, flattenContext.createArrayBindingOrAssignmentElement(temp));
                }
                else {
                    bindingElements = append(bindingElements, element);
                }
            }
            else if (isOmittedExpression(element)) {
                continue;
            }
            else if (!getRestIndicatorOfBindingOrAssignmentElement(element)) {
                const rhsValue = createElementAccess(value, i);
                flattenBindingOrAssignmentElement(flattenContext, element, rhsValue, /*location*/ element);
            }
            else if (i === numElements - 1) {
                const rhsValue = createArraySlice(value, i);
                flattenBindingOrAssignmentElement(flattenContext, element, rhsValue, /*location*/ element);
            }
        }
        if (bindingElements) {
            flattenContext.emitBindingOrAssignment(flattenContext.createArrayBindingOrAssignmentPattern(bindingElements), value, location, pattern);
        }
        if (restContainingElements) {
            for (const [id, element] of restContainingElements) {
                flattenBindingOrAssignmentElement(flattenContext, element, id, element);
            }
        }
    }

    /**
     * Creates an expression used to provide a default value if a value is `undefined` at runtime.
     *
     * @param flattenContext Options used to control flattening.
     * @param value The RHS value to test.
     * @param defaultValue The default value to use if `value` is `undefined` at runtime.
     * @param location The location to use for source maps and comments.
     */
    function createDefaultValueCheck(flattenContext: FlattenContext, value: Expression, defaultValue: Expression, location: TextRange): Expression {
        value = ensureIdentifier(flattenContext, value, /*reuseIdentifierExpressions*/ true, location);
        return createConditional(createTypeCheck(value, "undefined"), defaultValue, value);
    }

    /**
     * Creates either a PropertyAccessExpression or an ElementAccessExpression for the
     * right-hand side of a transformed destructuring assignment.
     *
     * @link https://tc39.github.io/ecma262/#sec-runtime-semantics-keyeddestructuringassignmentevaluation
     *
     * @param flattenContext Options used to control flattening.
     * @param value The RHS value that is the source of the property.
     * @param propertyName The destructuring property name.
     */
    function createDestructuringPropertyAccess(flattenContext: FlattenContext, value: Expression, propertyName: PropertyName): LeftHandSideExpression {
        if (isComputedPropertyName(propertyName)) {
            const argumentExpression = ensureIdentifier(flattenContext, visitNode(propertyName.expression, flattenContext.visitor), /*reuseIdentifierExpressions*/ false, /*location*/ propertyName);
            return createElementAccess(value, argumentExpression);
        }
        else if (isStringOrNumericLiteralLike(propertyName)) {
            const argumentExpression = getSynthesizedClone(propertyName);
            argumentExpression.text = argumentExpression.text;
            return createElementAccess(value, argumentExpression);
        }
        else {
            const name = createIdentifier(idText(propertyName));
            return createPropertyAccess(value, name);
        }
    }

    /**
     * Ensures that there exists a declared identifier whose value holds the given expression.
     * This function is useful to ensure that the expression's value can be read from in subsequent expressions.
     * Unless 'reuseIdentifierExpressions' is false, 'value' will be returned if it is just an identifier.
     *
     * @param flattenContext Options used to control flattening.
     * @param value the expression whose value needs to be bound.
     * @param reuseIdentifierExpressions true if identifier expressions can simply be returned;
     * false if it is necessary to always emit an identifier.
     * @param location The location to use for source maps and comments.
     */
    function ensureIdentifier(flattenContext: FlattenContext, value: Expression, reuseIdentifierExpressions: boolean, location: TextRange) {
        if (isIdentifier(value) && reuseIdentifierExpressions) {
            return value;
        }
        else {
            const temp = createTempVariable(/*recordTempVariable*/ undefined);
            if (flattenContext.hoistTempVariables) {
                flattenContext.context.hoistVariableDeclaration(temp);
                flattenContext.emitExpression(setTextRange(createAssignment(temp, value), location));
            }
            else {
                flattenContext.emitBindingOrAssignment(temp, value, location, /*original*/ undefined);
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
        return createBindingElement(/*dotDotDotToken*/ undefined, /*propertyName*/ undefined, name);
    }

    function makeAssignmentElement(name: Identifier) {
        return name;
    }

    export const restHelper: UnscopedEmitHelper = {
        name: "typescript:rest",
        importName: "__rest",
        scoped: false,
        text: `
            var __rest = (this && this.__rest) || function (s, e) {
                var t = {};
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                    t[p] = s[p];
                if (s != null && typeof Object.getOwnPropertySymbols === "function")
                    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                            t[p[i]] = s[p[i]];
                    }
                return t;
            };`
    };

    /** Given value: o, propName: p, pattern: { a, b, ...p } from the original statement
     * `{ a, b, ...p } = o`, create `p = __rest(o, ["a", "b"]);`
     */
    function createRestCall(context: TransformationContext, value: Expression, elements: readonly BindingOrAssignmentElement[], computedTempVariables: readonly Expression[], location: TextRange): Expression {
        context.requestEmitHelper(restHelper);
        const propertyNames: Expression[] = [];
        let computedTempVariableOffset = 0;
        for (let i = 0; i < elements.length - 1; i++) {
            const propertyName = getPropertyNameOfBindingOrAssignmentElement(elements[i]);
            if (propertyName) {
                if (isComputedPropertyName(propertyName)) {
                    const temp = computedTempVariables[computedTempVariableOffset];
                    computedTempVariableOffset++;
                    // typeof _tmp === "symbol" ? _tmp : _tmp + ""
                    propertyNames.push(
                        createConditional(
                            createTypeCheck(temp, "symbol"),
                            temp,
                            createAdd(temp, createLiteral(""))
                        )
                    );
                }
                else {
                    propertyNames.push(createLiteral(propertyName));
                }
            }
        }
        return createCall(
            getUnscopedHelperName("__rest"),
            /*typeArguments*/ undefined,
            [
                value,
                setTextRange(
                    createArrayLiteral(propertyNames),
                    location
                )
            ]);
    }
}
