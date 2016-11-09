/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />

/*@internal*/
namespace ts {
    type EffectiveBindingElement
        = VariableDeclaration
        | ParameterDeclaration
        | BindingElement
        | ObjectLiteralElementLike
        | Expression
        ;

    type EffectiveObjectBindingPattern
        = ObjectBindingPattern
        | ObjectLiteralExpression
        ;

    type EffectiveArrayBindingPattern
        = ArrayBindingPattern
        | ArrayLiteralExpression
        ;

    type EffectiveBindingPattern
        = EffectiveObjectBindingPattern
        | EffectiveArrayBindingPattern
        ;

    type EffectiveBindingTarget
        = EffectiveBindingPattern
        | Expression
        ;

    /**
     * Flattens a DestructuringAssignment or a VariableDeclaration to an expression.
     *
     * @param node The node to flatten.
     * @param needsValue Indicates whether the value from the right-hand-side of the
     * destructuring assignment is needed as part of a larger expression.
     * @param createAssignmentCallback A callback used to create an assignment expression.
     * @param recordTempVariable A callback used to record new temporary variables.
     * @param visitor An optional visitor used to visit default value initializers of binding patterns.
     */
    export function flattenDestructuringToExpression(
        context: TransformationContext,
        node: VariableDeclaration | DestructuringAssignment,
        needsValue: boolean,
        createAssignmentCallback: (target: Expression, value: Expression, location?: TextRange) => Expression,
        visitor?: (node: Node) => VisitResult<Node>): Expression {

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

        if (value) {
            value = visitNode(value, visitor, isExpression);
            if (needsValue) {
                // If the right-hand value of the destructuring assignment needs to be preserved (as
                // is the case when the destructuring assignment is part of a larger expression),
                // then we need to cache the right-hand value.
                //
                // The source map location for the assignment should point to the entire binary
                // expression.
                value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ true, emitTempVariableAssignment, location);
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

        flattenEffectiveBindingElement(
            context,
            node,
            value,
            isDestructuringAssignment(node),
            emitAssignment,
            emitTempVariableAssignment,
            emitExpression,
            visitor,
            location);

        if (value && needsValue) {
            expressions.push(value);
        }

        return aggregateTransformFlags(inlineExpressions(expressions));

        function emitAssignment(target: Expression, value: Expression, location: TextRange, original: Node) {
            const expression = createAssignmentCallback(target, value, location);
            expression.original = original;
            emitExpression(expression);
        }

        function emitTempVariableAssignment(value: Expression, location: TextRange) {
            const name = createTempVariable(context.hoistVariableDeclaration);
            emitExpression(createAssignment(name, value, location));
            return name;
        }

        function emitExpression(expression: Expression) {
            // NOTE: this completely disables source maps, but aligns with the behavior of
            //       `emitAssignment` in the old emitter.
            setEmitFlags(expression, EmitFlags.NoNestedSourceMaps);
            aggregateTransformFlags(expression);
            expressions.push(expression);
        }
    }

    /**
     * Flattens binding patterns in a VariableDeclaration or a ParameterDeclaration to a VariableDeclaration list.
     *
     * @param node The node to flatten.
     * @param boundValue An optional rhs value for the binding pattern. This value is *not* visited during flattening.
     * @param visitor An optional visitor to use to visit expressions.
     * @param recordTempVariable An optional callback used to hoist temporary variables rather than
     * declaring them inline.
     */
    export function flattenDestructuring(
        context: TransformationContext,
        node: VariableDeclaration | ParameterDeclaration,
        boundValue: Expression | undefined,
        recordTempVariablesInLine: boolean,
        visitor?: (node: Node) => VisitResult<Node>) {

        let pendingExpressions: Expression[];
        const pendingDeclarations: { pendingExpressions?: Expression[], name: Identifier, value: Expression, location?: TextRange, original?: Node }[] = [];
        const declarations: VariableDeclaration[] = [];

        flattenEffectiveBindingElement(
            context,
            node,
            boundValue,
            /*skipInitializer*/ false,
            emitAssignment,
            emitTempVariableAssignment,
            emitExpression,
            visitor,
            /*location*/ node);

        if (pendingExpressions) {
            const name = createTempVariable(/*recordTempVariable*/ undefined);
            if (recordTempVariablesInLine) {
                pendingDeclarations.push({ name, value: inlineExpressions(pendingExpressions) });
            }
            else {
                context.hoistVariableDeclaration(name);
                const pendingDeclaration = lastOrUndefined(pendingDeclarations);
                pendingDeclaration.pendingExpressions = append(
                    pendingDeclaration.pendingExpressions,
                    createAssignment(name, pendingDeclaration.value)
                );
                addRange(pendingDeclaration.pendingExpressions, pendingExpressions);
                pendingDeclaration.value = name;
            }
        }

        for (const { pendingExpressions, name, value, location, original} of pendingDeclarations) {
            const declaration = createVariableDeclaration(
                name,
                /*type*/ undefined,
                // pendingExpressions
                //     ? inlineExpressions(append(pendingExpressions, value))
                //     : value,
                inlineExpressions(append(pendingExpressions, value)),
                location
            );

            declaration.original = original;

            // NOTE: this completely disables source maps, but aligns with the behavior of
            //       `emitAssignment` in the old emitter.
            declarations.push(aggregateTransformFlags(setEmitFlags(declaration, EmitFlags.NoNestedSourceMaps)));
        }

        return declarations;

        function emitAssignment(name: Expression, value: Expression, location: TextRange, original: Node) {
            if (!isIdentifier(name)) {
                Debug.failBadSyntaxKind(name, "Identifier expected.");
                return;
            }

            pendingDeclarations.push({ pendingExpressions, name, value, location, original });
            pendingExpressions = undefined;
        }

        function emitTempVariableAssignment(value: Expression, location: TextRange) {
            const name = createTempVariable(/*recordTempVariable*/ undefined);
            if (recordTempVariablesInLine) {
                emitAssignment(name, value, location, /*original*/ undefined);
            }
            else {
                context.hoistVariableDeclaration(name);
                emitExpression(createAssignment(name, value, location));
            }
            return name;
        }

        function emitExpression(expression: Expression) {
            pendingExpressions = append(pendingExpressions, expression);
        }
    }

    function flattenEffectiveBindingElement(
        context: TransformationContext,
        bindingElement: EffectiveBindingElement,
        boundValue: Expression | undefined,
        skipInitializer: boolean,
        emitAssignment: (target: Expression, value: Expression, location: TextRange, original: Node) => void,
        emitTempVariableAssignment: (value: Expression, location: TextRange) => Identifier,
        emitExpression: (value: Expression) => void,
        visitor: ((node: Node) => VisitResult<Node>) | undefined,
        location: TextRange) {

        if (!skipInitializer) {
            const initializer = visitNode(getInitializerOfEffectiveBindingElement(bindingElement), visitor, isExpression);
            if (initializer) {
                // Combine value and initializer
                boundValue = boundValue ? createDefaultValueCheck(boundValue, initializer, location, emitTempVariableAssignment) : initializer;
            }
            else if (!boundValue) {
                // Use 'void 0' in absence of value and initializer
                boundValue = createVoidZero();
            }
        }

        const bindingTarget = getTargetOfEffectiveBindingElement(bindingElement);
        if (isEffectiveBindingPattern(bindingTarget)) {
            const elements = getElementsOfEffectiveBindingPattern(bindingTarget);
            const numElements = elements.length;
            if (isEffectiveArrayBindingPattern(bindingTarget) && !isArrayLiteralExpression(boundValue)) {
                // Read the elements of the iterable into an array
                boundValue = emitTempVariableAssignment(
                    createReadHelper(
                        context,
                        boundValue,
                        isEffectiveBindingElementWithRest(elements[numElements - 1])
                            ? undefined
                            : numElements,
                        location
                    ),
                    location
                );
            }
            else if (numElements !== 1) {
                // For anything other than a single-element destructuring we need to generate a temporary
                // to ensure value is evaluated exactly once. Additionally, if we have zero elements
                // we need to emit *something* to ensure that in case a 'var' keyword was already emitted,
                // so in that case, we'll intentionally create that temporary.
                const reuseIdentifierExpressions = !isDeclarationBindingElement(bindingElement) || numElements !== 0;
                boundValue = ensureIdentifier(boundValue, reuseIdentifierExpressions, emitTempVariableAssignment, location);
            }

            if (isEffectiveObjectBindingPattern(bindingTarget)) {
                for (const element of elements) {
                    // Rewrite element to a declaration with an initializer that fetches property
                    flattenEffectiveBindingElement(
                        context,
                        element,
                        createDestructuringPropertyAccess(
                            boundValue,
                            getEffectivePropertyNameOfEffectiveBindingElement(element),
                            emitTempVariableAssignment),
                        /*skipInitializer*/ false,
                        emitAssignment,
                        emitTempVariableAssignment,
                        emitExpression,
                        visitor,
                        /*location*/ element);
                }
            }
            else {
                for (let i = 0; i < numElements; i++) {
                    const element = elements[i];
                    if (isOmittedExpression(element)) {
                        continue;
                    }
                    else if (!isEffectiveBindingElementWithRest(element)) {
                        flattenEffectiveBindingElement(
                            context,
                            element,
                            createElementAccess(boundValue, i),
                            /*skipInitializer*/ false,
                            emitAssignment,
                            emitTempVariableAssignment,
                            emitExpression,
                            visitor,
                            /*location*/ element);
                    }
                    else if (i === numElements - 1) {
                        flattenEffectiveBindingElement(
                            context,
                            element,
                            createArraySlice(boundValue, i),
                            /*skipInitializer*/ false,
                            emitAssignment,
                            emitTempVariableAssignment,
                            emitExpression,
                            visitor,
                            /*location*/ element);
                    }
                }
            }
        }
        else {
            emitAssignment(bindingTarget, boundValue, location, /*original*/ bindingElement);
        }
    }

    /**
     * Determines whether the BindingElement-like is a declaration
     */
    function isDeclarationBindingElement(bindingElement: EffectiveBindingElement): bindingElement is VariableDeclaration | ParameterDeclaration | BindingElement {
        switch (bindingElement.kind) {
            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.Parameter:
            case SyntaxKind.BindingElement:
                return true;
        }

        return false;
    }

    /**
     * Gets the initializer of a BindingElement-like element
     */
    function getInitializerOfEffectiveBindingElement(bindingElement: EffectiveBindingElement): Expression | undefined {
        if (isDeclarationBindingElement(bindingElement)) {
            // `1` in `let { a = 1 } = ...`
            // `1` in `let { a: b = 1 } = ...`
            // `1` in `let { a: {b} = 1 } = ...`
            // `1` in `let { a: [b] = 1 } = ...`
            // `1` in `let [a = 1] = ...`
            // `1` in `let [{a} = 1] = ...`
            // `1` in `let [[a] = 1] = ...`
            return bindingElement.initializer;
        }

        if (isPropertyAssignment(bindingElement)) {
            // `1` in `({ a: b = 1 } = ...)`
            // `1` in `({ a: {b} = 1 } = ...)`
            // `1` in `({ a: [b] = 1 } = ...)`
            return isAssignmentExpression(bindingElement.initializer, /*excludeCompoundAssignment*/ true)
                ? bindingElement.initializer.right
                : undefined;
        }

        if (isShorthandPropertyAssignment(bindingElement)) {
            // `1` in `({ a = 1 } = ...)`
            return bindingElement.objectAssignmentInitializer;
        }

        if (isAssignmentExpression(bindingElement, /*excludeCompoundAssignment*/ true)) {
            // `1` in `[a = 1] = ...`
            // `1` in `[{a} = 1] = ...`
            // `1` in `[[a] = 1] = ...`
            return bindingElement.right;
        }

        if (isSpreadElementExpression(bindingElement) || isPartiallyEmittedExpression(bindingElement)) {
            // Recovery consistent with existing emit.
            return getInitializerOfEffectiveBindingElement(bindingElement.expression);
        }
    }

    /**
     * Gets the name of a BindingElement-like element
     */
    function getTargetOfEffectiveBindingElement(bindingElement: EffectiveBindingElement): EffectiveBindingTarget {
        if (isDeclarationBindingElement(bindingElement)) {
            // `a` in `let { a } = ...`
            // `a` in `let { a = 1 } = ...`
            // `b` in `let { a: b } = ...`
            // `b` in `let { a: b = 1 } = ...`
            // `{b}` in `let { a: {b} } = ...`
            // `{b}` in `let { a: {b} = 1 } = ...`
            // `[b]` in `let { a: [b] } = ...`
            // `[b]` in `let { a: [b] = 1 } = ...`
            // `a` in `let [a] = ...`
            // `a` in `let [a = 1] = ...`
            // `a` in `let [...a] = ...`
            // `{a}` in `let [{a}] = ...`
            // `{a}` in `let [{a} = 1] = ...`
            // `[a]` in `let [[a]] = ...`
            // `[a]` in `let [[a] = 1] = ...`
            return <ObjectBindingPattern | ArrayBindingPattern | Identifier>bindingElement.name;
        }

        if (isObjectLiteralElementLike(bindingElement)) {
            switch (bindingElement.kind) {
                case SyntaxKind.PropertyAssignment:
                    // `b` in `({ a: b } = ...)`
                    // `b` in `({ a: b = 1 } = ...)`
                    // `{b}` in `({ a: {b} } = ...)`
                    // `{b}` in `({ a: {b} = 1 } = ...)`
                    // `[b]` in `({ a: [b] } = ...)`
                    // `[b]` in `({ a: [b] = 1 } = ...)`
                    // `b.c` in `({ a: b.c } = ...)`
                    // `b.c` in `({ a: b.c = 1 } = ...)`
                    // `b[0]` in `({ a: b[0] } = ...)`
                    // `b[0]` in `({ a: b[0] = 1 } = ...)`
                    return getTargetOfEffectiveBindingElement(bindingElement.initializer);

                case SyntaxKind.ShorthandPropertyAssignment:
                    // `a` in `({ a } = ...)`
                    // `a` in `({ a = 1 } = ...)`
                    return bindingElement.name;
            }

            // no target
            return undefined;
        }

        if (isAssignmentExpression(bindingElement, /*excludeCompoundAssignment*/ true)) {
            // `a` in `[a = 1] = ...`
            // `{a}` in `[{a} = 1] = ...`
            // `[a]` in `[[a] = 1] = ...`
            // `a.b` in `[a.b = 1] = ...`
            // `a[0]` in `[a[0] = 1] = ...`
            return getTargetOfEffectiveBindingElement(bindingElement.left);
        }

        if (isSpreadElementExpression(bindingElement) || isPartiallyEmittedExpression(bindingElement)) {
            // `a` in `[...a] = ...`
            return getTargetOfEffectiveBindingElement(bindingElement.expression);
        }

        // `a` in `[a] = ...`
        // `{a}` in `[{a}] = ...`
        // `[a]` in `[[a]] = ...`
        // `a.b` in `[a.b] = ...`
        // `a[0]` in `[a[0]] = ...`
        return bindingElement;
    }

    /**
     * Determines whether a BindingElement-like element is a rest element.
     */
    function isEffectiveBindingElementWithRest(bindingElement: EffectiveBindingElement) {
        switch (bindingElement.kind) {
            case SyntaxKind.Parameter:
            case SyntaxKind.BindingElement:
                // `...` in `let [...a] = ...`
                return (<ParameterDeclaration | BindingElement>bindingElement).dotDotDotToken !== undefined;

            case SyntaxKind.SpreadElementExpression:
                // `...` in `[...a] = ...`
                return true;
        }

        return false;
    }

    /**
     * Gets the property name of a BindingElement-like element
     */
    function getEffectivePropertyNameOfEffectiveBindingElement(bindingElement: EffectiveBindingElement) {
        switch (bindingElement.kind) {
            case SyntaxKind.BindingElement:
                // `a` in `let { a: b } = ...`
                // `[a]` in `let { [a]: b } = ...`
                // `"a"` in `let { "a": b } = ...`
                // `1` in `let { 1: b } = ...`
                if ((<BindingElement>bindingElement).propertyName) {
                    return (<BindingElement>bindingElement).propertyName;
                }

                break;

            case SyntaxKind.PropertyAssignment:
                // `a` in `({ a: b } = ...)`
                // `[a]` in `({ [a]: b } = ...)`
                // `"a"` in `({ "a": b } = ...)`
                // `1` in `({ 1: b } = ...)`
                if ((<PropertyAssignment>bindingElement).name) {
                    return (<PropertyAssignment>bindingElement).name;
                }

                break;
        }

        const target = getTargetOfEffectiveBindingElement(bindingElement);
        if (target && isPropertyName(target)) {
            return target;
        }

        Debug.fail("Invalid property name for binding element.");
    }

    /**
     * Determines whether a node is BindingPattern-like
     */
    function isEffectiveBindingPattern(node: EffectiveBindingTarget): node is EffectiveBindingPattern {
        return isEffectiveObjectBindingPattern(node)
            || isEffectiveArrayBindingPattern(node);
    }

    /**
     * Determines whether a node is ObjectBindingPattern-like
     */
    function isEffectiveObjectBindingPattern(node: EffectiveBindingTarget): node is EffectiveObjectBindingPattern {
        switch (node.kind) {
            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.ObjectLiteralExpression:
                return true;
        }

        return false;
    }

    /**
     * Determines whether a node is ArrayBindingPattern-like
     */
    function isEffectiveArrayBindingPattern(node: EffectiveBindingTarget): node is EffectiveArrayBindingPattern {
        switch (node.kind) {
            case SyntaxKind.ArrayBindingPattern:
            case SyntaxKind.ArrayLiteralExpression:
                return true;
        }

        return false;
    }

    /**
     * Gets the elements of a BindingPattern-like name
     */
    function getElementsOfEffectiveBindingPattern(name: EffectiveBindingPattern): EffectiveBindingElement[] {
        switch (name.kind) {
            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.ArrayBindingPattern:
                // `a` in `{a}`
                // `a` in `[a]`
                return name.elements;

            case SyntaxKind.ObjectLiteralExpression:
                // `a` in `{a}`
                return name.properties;

            case SyntaxKind.ArrayLiteralExpression:
                // `a` in `[a]`
                return name.elements;
        }
    }

    /**
     * Creates an expression used to provide a default value if a value is `undefined` at runtime.
     */
    function createDefaultValueCheck(value: Expression, defaultValue: Expression, location: TextRange, emitTempVariableAssignment: (value: Expression, location: TextRange) => Identifier): Expression {
        value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ true, emitTempVariableAssignment, location);
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
    function createDestructuringPropertyAccess(expression: Expression, propertyName: PropertyName, emitTempVariableAssignment: (value: Expression, location: TextRange) => Identifier): LeftHandSideExpression {
        if (isComputedPropertyName(propertyName)) {
            const argumentExpression = ensureIdentifier(propertyName.expression, /*reuseIdentifierExpressions*/ false, emitTempVariableAssignment, /*location*/ propertyName);
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
        value: Expression,
        reuseIdentifierExpressions: boolean,
        emitTempVariableAssignment: (value: Expression, location: TextRange) => Identifier,
        location: TextRange) {

        if (isIdentifier(value) && reuseIdentifierExpressions) {
            return value;
        }
        else {
            return emitTempVariableAssignment(value, location);
        }
    }
}
