/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />

/*@internal*/
namespace ts {
    type EffectiveBindingOrAssignmentElement = VariableDeclaration | ParameterDeclaration | BindingElement | ObjectLiteralElementLike | Expression;
    type EffectiveObjectBindingOrAssignmentPattern = ObjectBindingPattern | ObjectLiteralExpression;
    type EffectiveArrayBindingOrAssignmentPattern = ArrayBindingPattern | ArrayLiteralExpression;
    type EffectiveBindingOrAssignmentPattern = EffectiveObjectBindingOrAssignmentPattern | EffectiveArrayBindingOrAssignmentPattern;
    type EffectiveBindingOrAssignmentTarget = EffectiveBindingOrAssignmentPattern | Expression;
    type EffectiveBindingOrAssignmentRestIndicator = DotDotDotToken | SpreadElement | SpreadAssignment;

    interface FlattenHost {
        context: TransformationContext;
        level: FlattenLevel;
        recordTempVariablesInLine: boolean;
        emitExpression: (value: Expression) => void;
        emitBindingOrAssignment: (target: EffectiveBindingOrAssignmentTarget, value: Expression, location: TextRange, original: Node) => void;
        createArrayBindingOrAssignmentPattern: (elements: EffectiveBindingOrAssignmentElement[]) => EffectiveArrayBindingOrAssignmentPattern;
        createObjectBindingOrAssignmentPattern: (elements: EffectiveBindingOrAssignmentElement[]) => EffectiveObjectBindingOrAssignmentPattern;
        createArrayBindingOrAssignmentElement: (node: Identifier) => EffectiveBindingOrAssignmentElement;
        visitor?: (node: Node) => VisitResult<Node>;
    }

    export const enum FlattenLevel {
        ObjectRest,
        All,
    }

    export const enum FlattenOutput {
        Expression,
        Declarations
    }

    export const enum FlattenOptions {
        NeedsValue = 1 << 0,
        SkipInitializer = 1 << 1,
        RecordTempVariablesInLine = 1 << 2,
    }

    export function flattenDestructuring(
        output: FlattenOutput.Expression,
        level: FlattenLevel,
        node: VariableDeclaration | DestructuringAssignment,
        visitor: (node: Node) => VisitResult<Node>,
        context: TransformationContext,
        options: FlattenOptions,
        createAssignment?: (name: Identifier, value: Expression, location?: TextRange) => Expression): Expression;
    export function flattenDestructuring(
        output: FlattenOutput.Declarations,
        level: FlattenLevel,
        node: VariableDeclaration | ParameterDeclaration,
        visitor: (node: Node) => VisitResult<Node>,
        context: TransformationContext,
        options: FlattenOptions,
        boundValue?: Expression): VariableDeclaration[];
    export function flattenDestructuring(
        _output: FlattenOutput,
        _level: FlattenLevel,
        _node: VariableDeclaration | ParameterDeclaration | DestructuringAssignment,
        _visitor: (node: Node) => VisitResult<Node>,
        _context: TransformationContext,
        _options: FlattenOptions,
        _valueOrCallback?: Expression | ((name: Identifier, value: Expression, location?: TextRange) => Expression)): Expression | VariableDeclaration[] {
    //     const flattenMode = flags & FlattenFlags.FlattenMask;
    //     const outputMode = flags & FlattenFlags.OutputMask;
    //     const options = flags & FlattenFlags.OptionsMask;


    //     if (outputMode === FlattenFlags.OutputExpressions) {
    //         return flattenDestructuringToExpression(context, <VariableDeclaration | DestructuringAssignment>node, !(options & FlattenFlags.NeedsValue), flattenMode, createAssignmentCallback, visitor);
    //     }
    //     else {
    //         return flattenDestructuringToDeclarations(
    //             context,
    //             <VariableDeclaration | ParameterDeclaration>node,
    //             boundValue)
    //     }
        return;
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
    export function flattenDestructuringToExpression(
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
            createArrayBindingOrAssignmentPattern: createEffectiveArrayAssignmentPattern,
            createObjectBindingOrAssignmentPattern: createEffectiveObjectAssignmentPattern,
            createArrayBindingOrAssignmentElement: createEffectiveAssignmentElement,
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

        flattenEffectiveBindingElement(host, node, value, location, /*skipInitializer*/ isDestructuringAssignment(node));

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

        function emitBindingOrAssignment(target: EffectiveBindingOrAssignmentTarget, value: Expression, location: TextRange, original: Node) {
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
    export function flattenDestructuringToDeclarations(
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
            createArrayBindingOrAssignmentPattern: createEffectiveArrayBindingPattern,
            createObjectBindingOrAssignmentPattern: createEffectiveObjectBindingPattern,
            createArrayBindingOrAssignmentElement: createEffectiveBindingElement,
            visitor
        };

        flattenEffectiveBindingElement(host, node, boundValue, node, skipInitializer);

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

        function emitBindingOrAssignment(target: EffectiveBindingOrAssignmentTarget, value: Expression, location: TextRange, original: Node) {
            Debug.assertNode(target, isBindingName);
            if (pendingExpressions) {
                value = inlineExpressions(append(pendingExpressions, value));
                pendingExpressions = undefined;
            }
            pendingDeclarations.push({ pendingExpressions, name: <BindingName>target, value, location, original });
        }
    }

    function flattenEffectiveBindingElement(
        host: FlattenHost,
        bindingElement: EffectiveBindingOrAssignmentElement,
        boundValue: Expression | undefined,
        location: TextRange,
        skipInitializer?: boolean) {
        if (!skipInitializer) {
            const initializer = visitNode(getInitializerOfEffectiveBindingElement(bindingElement), host.visitor, isExpression);
            if (initializer) {
                // Combine value and initializer
                boundValue = boundValue ? createDefaultValueCheck(host, boundValue, initializer, location) : initializer;
            }
            else if (!boundValue) {
                // Use 'void 0' in absence of value and initializer
                boundValue = createVoidZero();
            }
        }
        const bindingTarget = getTargetOfEffectiveBindingElement(bindingElement);
        if (!isEffectiveBindingPattern(bindingTarget)) {
            host.emitBindingOrAssignment(bindingTarget, boundValue, location, /*original*/ bindingElement);
        }
        else {
            const elements = getElementsOfEffectiveBindingPattern(bindingTarget);
            const numElements = elements.length;
            if (numElements !== 1) {
                // For anything other than a single-element destructuring we need to generate a temporary
                // to ensure value is evaluated exactly once. Additionally, if we have zero elements
                // we need to emit *something* to ensure that in case a 'var' keyword was already emitted,
                // so in that case, we'll intentionally create that temporary.
                const reuseIdentifierExpressions = !isDeclarationBindingElement(bindingElement) || numElements !== 0;
                boundValue = ensureIdentifier(host, boundValue, reuseIdentifierExpressions, location);
            }
            if (isEffectiveObjectBindingPattern(bindingTarget)) {
                flattenEffectiveObjectBindingElements(host, bindingTarget, elements, boundValue, location);
            }
            else {
                flattenEffectiveArrayBindingElements(host, bindingTarget, elements, boundValue, location);
            }
        }
    }

    function flattenEffectiveObjectBindingElements(host: FlattenHost, bindingTarget: EffectiveObjectBindingOrAssignmentPattern, elements: EffectiveBindingOrAssignmentElement[], boundValue: Expression, location: TextRange) {
        let bindingElements: EffectiveBindingOrAssignmentElement[];
        const numElements = elements.length;
        for (let i = 0; i < numElements; i++) {
            const element = elements[i];
            if (!getEffectiveRestIndicator(element)) {
                if (host.level <= FlattenLevel.ObjectRest
                    && !(element.transformFlags & (TransformFlags.ContainsRest | TransformFlags.ContainsObjectRest))
                    && !(getTargetOfEffectiveBindingElement(element).transformFlags & (TransformFlags.ContainsRest | TransformFlags.ContainsObjectRest))) {
                    bindingElements = append(bindingElements, element);
                }
                else {
                    if (bindingElements) {
                        host.emitBindingOrAssignment(host.createObjectBindingOrAssignmentPattern(bindingElements), boundValue, location, bindingTarget);
                        bindingElements = undefined;
                    }
                    const propertyName = getEffectivePropertyNameOfEffectiveBindingElement(element);
                    const value = createDestructuringPropertyAccess(host, boundValue, propertyName);
                    flattenEffectiveBindingElement(host, element, value, /*location*/ element);
                }
            }
            else if (i === numElements - 1) {
                if (bindingElements) {
                    host.emitBindingOrAssignment(host.createObjectBindingOrAssignmentPattern(bindingElements), boundValue, location, bindingTarget);
                    bindingElements = undefined;
                }
                const value = createRestCall(boundValue, elements, bindingTarget);
                flattenEffectiveBindingElement(host, element, value, element);
            }
        }
        if (bindingElements) {
            host.emitBindingOrAssignment(host.createObjectBindingOrAssignmentPattern(bindingElements), boundValue, location, bindingTarget);
        }
    }

    function flattenEffectiveArrayBindingElements(host: FlattenHost, bindingTarget: EffectiveArrayBindingOrAssignmentPattern, elements: EffectiveBindingOrAssignmentElement[], boundValue: Expression, location: TextRange) {
        let bindingElements: EffectiveBindingOrAssignmentElement[];
        let spreadContainingElements: [Identifier, EffectiveBindingOrAssignmentElement][];
        const numElements = elements.length;
        for (let i = 0; i < numElements; i++) {
            const element = elements[i];
            if (host.level <= FlattenLevel.ObjectRest) {
                if (element.transformFlags & (TransformFlags.ContainsRest | TransformFlags.ContainsObjectRest) && i < numElements - 1) {
                    const temp = createTempVariable(/*recordTempVariable*/ undefined);
                    spreadContainingElements = append(spreadContainingElements, <[Identifier, EffectiveBindingOrAssignmentElement]>[temp, element]);
                    bindingElements = append(bindingElements, host.createArrayBindingOrAssignmentElement(temp));
                }
                else {
                    bindingElements = append(bindingElements, element);
                }
            }
            else if (isOmittedExpression(element)) {
                continue;
            }
            else if (!getEffectiveRestIndicator(element)) {
                const value = createElementAccess(boundValue, i);
                flattenEffectiveBindingElement(host, element, value, /*location*/ element);
            }
            else if (i === numElements - 1) {
                const value = createArraySlice(boundValue, i);
                flattenEffectiveBindingElement(host, element, value, /*location*/ element);
            }
        }
        if (bindingElements) {
            host.emitBindingOrAssignment(host.createArrayBindingOrAssignmentPattern(bindingElements), boundValue, location, bindingTarget);
        }
        if (spreadContainingElements) {
            for (const [id, element] of spreadContainingElements) {
                flattenEffectiveBindingElement(host, element, id, element);
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

    /**
     * Determines whether the EffectiveBindingElement is a declaration
     */
    function isDeclarationBindingElement(bindingElement: EffectiveBindingOrAssignmentElement): bindingElement is VariableDeclaration | ParameterDeclaration | BindingElement {
        switch (bindingElement.kind) {
            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.Parameter:
            case SyntaxKind.BindingElement:
                return true;
        }

        return false;
    }

    /**
     * Gets the initializer of an EffectiveBindingElement.
     */
    function getInitializerOfEffectiveBindingElement(bindingElement: EffectiveBindingOrAssignmentElement): Expression | undefined {
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

        if (isSpreadExpression(bindingElement) || isPartiallyEmittedExpression(bindingElement)) {
            // Recovery consistent with existing emit.
            return getInitializerOfEffectiveBindingElement(bindingElement.expression);
        }
    }

    /**
     * Gets the name of an EffectiveBindingElement.
     */
    function getTargetOfEffectiveBindingElement(bindingElement: EffectiveBindingOrAssignmentElement): EffectiveBindingOrAssignmentTarget {
        if (isDeclarationBindingElement(bindingElement)) {
            // `a` in `let { a } = ...`
            // `a` in `let { a = 1 } = ...`
            // `b` in `let { a: b } = ...`
            // `b` in `let { a: b = 1 } = ...`
            // `a` in `let { ...a } = ...`
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

                case SyntaxKind.SpreadAssignment:
                    // `a` in `({ ...a } = ...)`
                    return getTargetOfEffectiveBindingElement(bindingElement.expression);
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

        if (isSpreadExpression(bindingElement) || isPartiallyEmittedExpression(bindingElement)) {
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
     * Determines whether an EffectiveBindingElement is a rest element.
     */
    function getEffectiveRestIndicator(bindingElement: EffectiveBindingOrAssignmentElement): EffectiveBindingOrAssignmentRestIndicator {
        switch (bindingElement.kind) {
            case SyntaxKind.Parameter:
            case SyntaxKind.BindingElement:
                // `...` in `let [...a] = ...`
                return (<ParameterDeclaration | BindingElement>bindingElement).dotDotDotToken;

            case SyntaxKind.SpreadElement:
            case SyntaxKind.SpreadAssignment:
                // `...` in `[...a] = ...`
                return <SpreadElement | SpreadAssignment>bindingElement;
        }

        return undefined;
    }

    /**
     * Gets the property name of a BindingElement-like element
     */
    function getEffectivePropertyNameOfEffectiveBindingElement(bindingElement: EffectiveBindingOrAssignmentElement) {
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

            case SyntaxKind.SpreadAssignment:
                // `a` in `({ ...a } = ...)`
                return (<SpreadAssignment>bindingElement).name;
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
    function isEffectiveBindingPattern(node: EffectiveBindingOrAssignmentTarget): node is EffectiveBindingOrAssignmentPattern {
        return isEffectiveObjectBindingPattern(node)
            || isEffectiveArrayBindingPattern(node);
    }

    /**
     * Determines whether a node is ObjectBindingPattern-like
     */
    function isEffectiveObjectBindingPattern(node: EffectiveBindingOrAssignmentTarget): node is EffectiveObjectBindingOrAssignmentPattern {
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
    function isEffectiveArrayBindingPattern(node: EffectiveBindingOrAssignmentTarget): node is EffectiveArrayBindingOrAssignmentPattern {
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
    function getElementsOfEffectiveBindingPattern(name: EffectiveBindingOrAssignmentPattern): EffectiveBindingOrAssignmentElement[] {
        switch (name.kind) {
            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.ArrayBindingPattern:
            case SyntaxKind.ArrayLiteralExpression:
                // `a` in `{a}`
                // `a` in `[a]`
                return name.elements;

            case SyntaxKind.ObjectLiteralExpression:
                // `a` in `{a}`
                return name.properties;
        }
    }

    function createEffectiveArrayBindingPattern(elements: EffectiveBindingOrAssignmentElement[]) {
        Debug.assertEachNode(elements, isArrayBindingElement);
        return createArrayBindingPattern(<ArrayBindingElement[]>elements);
    }

    function createEffectiveArrayAssignmentPattern(elements: EffectiveBindingOrAssignmentElement[]) {
        return createArrayLiteral(map(elements, convertToArrayLiteralElement));
    }

    function createEffectiveObjectBindingPattern(elements: EffectiveBindingOrAssignmentElement[]) {
        Debug.assertEachNode(elements, isBindingElement);
        return createObjectBindingPattern(<BindingElement[]>elements);
    }

    function createEffectiveObjectAssignmentPattern(elements: EffectiveBindingOrAssignmentElement[]) {
        return createObjectLiteral(map(elements, convertToObjectLiteralElement));
    }

    function createEffectiveBindingElement(name: Identifier) {
        return createBindingElement(/*propertyName*/ undefined, /*dotDotDotToken*/ undefined, name);
    }

    function createEffectiveAssignmentElement(name: Identifier) {
        return name;
    }

    function convertToArrayLiteralElement(element: EffectiveBindingOrAssignmentElement) {
        if (isBindingElement(element)) {
            if (element.dotDotDotToken) {
                Debug.assertNode(element.name, isIdentifier);
                return setOriginalNode(createSpread(<Identifier>element.name, element), element);
            }
            const expression = convertToExpressionTarget(<ObjectBindingPattern | ArrayBindingPattern | Identifier>element.name);
            return element.initializer ? setOriginalNode(createAssignment(expression, element.initializer, element), element) : expression;
        }
        Debug.assertNode(element, isExpression);
        return <Expression>element;
    }

    function convertToObjectLiteralElement(element: EffectiveBindingOrAssignmentElement) {
        if (isBindingElement(element)) {
            if (element.dotDotDotToken) {
                Debug.assertNode(element.name, isIdentifier);
                return setOriginalNode(createSpreadAssignment(<Identifier>element.name, element), element);
            }
            if (element.propertyName) {
                const expression = convertToExpressionTarget(<ObjectBindingPattern | ArrayBindingPattern | Identifier>element.name);
                return setOriginalNode(createPropertyAssignment(element.propertyName, element.initializer ? createAssignment(expression, element.initializer) : expression, element), element);
            }
            Debug.assertNode(element.name, isIdentifier);
            return setOriginalNode(createShorthandPropertyAssignment(<Identifier>element.name, element.initializer, element), element);
        }
        Debug.assertNode(element, isObjectLiteralElementLike);
        return <ObjectLiteralElementLike>element;
    }

    function convertToExpressionTarget(target: EffectiveBindingOrAssignmentTarget): Expression {
        if (isBindingPattern(target)) {
            switch (target.kind) {
                case SyntaxKind.ArrayBindingPattern:
                    return setOriginalNode(createArrayLiteral(map(target.elements, convertToArrayLiteralElement), target), target);
                case SyntaxKind.ObjectBindingPattern:
                    return setOriginalNode(createObjectLiteral(map(target.elements, convertToObjectLiteralElement), target), target);
            }
            return;
        }
        Debug.assertNode(target, isExpression);
        return <Expression>target;
    }

    /** Given value: o, propName: p, pattern: { a, b, ...p } from the original statement
     * `{ a, b, ...p } = o`, create `p = __rest(o, ["a", "b"]);`*/
    function createRestCall(value: Expression, elements: EffectiveBindingOrAssignmentElement[], location: TextRange): Expression {
        const propertyNames: LiteralExpression[] = [];
        for (let i = 0; i < elements.length - 1; i++) {
            if (isOmittedExpression(elements[i])) {
                continue;
            }
            const str = <StringLiteral>createSynthesizedNode(SyntaxKind.StringLiteral);
            str.pos = location.pos;
            str.end = location.end;
            str.text = getTextOfPropertyName(getEffectivePropertyNameOfEffectiveBindingElement(elements[i]));
            propertyNames.push(str);
        }
        const args = createSynthesizedNodeArray([value, createArrayLiteral(propertyNames, location)]);
        return createCall(createIdentifier("__rest"), undefined, args);
    }
}
