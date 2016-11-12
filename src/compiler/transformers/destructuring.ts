/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />

/*@internal*/
namespace ts {
    type EffectiveBindingElement = VariableDeclaration | ParameterDeclaration | BindingElement | ObjectLiteralElementLike | Expression;
    type EffectiveObjectBindingPattern = ObjectBindingPattern | ObjectLiteralExpression;
    type EffectiveArrayBindingPattern = ArrayBindingPattern | ArrayLiteralExpression;
    type EffectiveBindingPattern = EffectiveObjectBindingPattern | EffectiveArrayBindingPattern;
    type EffectiveBindingTarget = EffectiveBindingPattern | Expression;
    type EffectiveRestIndicator = DotDotDotToken | SpreadElement | SpreadAssignment;

    export const enum FlattenLevel {
        All,
        ObjectRestDestructuringOnly,
    }

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
            value = ensureIdentifierOld(value, /*reuseIdentifierExpressions*/ true, location, emitTempVariableAssignment, visitor);
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

        flattenDestructuringOld(node, value, location, emitAssignment, emitTempVariableAssignment, recordTempVariable, emitRestAssignment, transformRest, visitor);

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
        node: ParameterDeclaration,
        value: Expression,
        visitor?: (node: Node) => VisitResult<Node>,
        transformRest?: boolean) {
        const declarations: VariableDeclaration[] = [];

        flattenDestructuringOld(node, value, node, emitAssignment, emitTempVariableAssignment, noop, emitRestAssignment, transformRest, visitor);

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
        node: VariableDeclaration,
        value?: Expression,
        visitor?: (node: Node) => VisitResult<Node>,
        recordTempVariable?: (node: Identifier) => void,
        transformRest?: boolean) {
        const declarations: VariableDeclaration[] = [];

        let pendingAssignments: Expression[];
        flattenDestructuringOld(node, value, node, emitAssignment, emitTempVariableAssignment, recordTempVariable, emitRestAssignment, transformRest, visitor);

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
        node: VariableDeclaration,
        recordTempVariable: (name: Identifier) => void,
        createAssignmentCallback?: (name: Identifier, value: Expression, location?: TextRange) => Expression,
        visitor?: (node: Node) => VisitResult<Node>) {

        const pendingAssignments: Expression[] = [];

        flattenDestructuringOld(node, /*value*/ undefined, node, emitAssignment, emitTempVariableAssignment, noop, emitRestAssignment, /*transformRest*/ false, visitor);

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

    function flattenDestructuringOld(
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
                // When doing so we want to hightlight the passed in source map node since thats the one needing this temp assignment
                value = ensureIdentifierOld(value, /*reuseIdentifierExpressions*/ true, location, emitTempVariableAssignment);
            }

            let bindingElements: ObjectLiteralElementLike[] = [];
            for (let i = 0; i < properties.length; i++) {
                const p = properties[i];
                if (p.kind === SyntaxKind.PropertyAssignment || p.kind === SyntaxKind.ShorthandPropertyAssignment) {
                    if (!transformRest ||
                        p.transformFlags & TransformFlags.ContainsSpreadExpression ||
                        (p.kind === SyntaxKind.PropertyAssignment && p.initializer.transformFlags & TransformFlags.ContainsSpreadExpression)) {
                        if (bindingElements.length) {
                            emitRestAssignment(bindingElements, value, location, target);
                            bindingElements = [];
                        }
                        const propName = <Identifier | LiteralExpression>(<PropertyAssignment>p).name;
                        const bindingTarget = p.kind === SyntaxKind.ShorthandPropertyAssignment ? <ShorthandPropertyAssignment>p : (<PropertyAssignment>p).initializer || propName;
                        // Assignment for bindingTarget = value.propName should highlight whole property, hence use p as source map node
                        emitDestructuringAssignment(bindingTarget, createDestructuringPropertyAccess(value, propName), p);
                    }
                    else {
                        bindingElements.push(p);
                    }
                }
                else if (i === properties.length - 1 && p.kind === SyntaxKind.SpreadAssignment) {
                    Debug.assert((p as SpreadAssignment).expression.kind === SyntaxKind.Identifier);
                    if (bindingElements.length) {
                        emitRestAssignment(bindingElements, value, location, target);
                        bindingElements = [];
                    }
                    const propName = (p as SpreadAssignment).expression as Identifier;
                    const restCall = createRestCall(value, target.properties, p => p.name, target);
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
                value = ensureIdentifierOld(value, /*reuseIdentifierExpressions*/ true, location, emitTempVariableAssignment);
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
                value = ensureIdentifierOld(value, /*reuseIdentifierExpressions*/ true, location, emitTempVariableAssignment);
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

        /** Given value: o, propName: p, pattern: { a, b, ...p } from the original statement
         * `{ a, b, ...p } = o`, create `p = __rest(o, ["a", "b"]);`*/
        function createRestCall<T extends Node>(value: Expression, elements: T[], getPropertyName: (element: T) => PropertyName, location: TextRange): Expression {
            const propertyNames: LiteralExpression[] = [];
            for (let i = 0; i < elements.length - 1; i++) {
                if (isOmittedExpression(elements[i])) {
                    continue;
                }
                const str = <StringLiteral>createSynthesizedNode(SyntaxKind.StringLiteral);
                str.pos = location.pos;
                str.end = location.end;
                str.text = getTextOfPropertyName(getPropertyName(elements[i]));
                propertyNames.push(str);
            }
            const args = createSynthesizedNodeArray([value, createArrayLiteral(propertyNames, location)]);
            return createCall(createIdentifier("__rest"), undefined, args);
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
                    value = ensureIdentifierOld(value, /*reuseIdentifierExpressions*/ numElements !== 0, target, emitTempVariableAssignment);
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
                    const restCall = createRestCall(value,
                                                    name.elements,
                                                    element => (element as BindingElement).propertyName || <Identifier>(element as BindingElement).name,
                                                    name);
                    emitBindingElement(element, restCall);
                }
                else if (transformRest && !(element.transformFlags & TransformFlags.ContainsSpreadExpression)) {
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
                    emitBindingElement(element, createDestructuringPropertyAccess(value, propName));
                }
            }
            if (bindingElements.length) {
                emitRestAssignment(bindingElements, value, target, target);
                bindingElements = [];
            }
        }

        function createDefaultValueCheck(value: Expression, defaultValue: Expression, location: TextRange): Expression {
            value = ensureIdentifierOld(value, /*reuseIdentifierExpressions*/ true, location, emitTempVariableAssignment);
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
                    ensureIdentifierOld(propertyName.expression, /*reuseIdentifierExpressions*/ false, /*location*/ propertyName, emitTempVariableAssignment)
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
    function ensureIdentifierOld(
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

    interface FlattenHost {
        context: TransformationContext;
        level: FlattenLevel;
        recordTempVariablesInLine: boolean;
        emitAssignment: (target: EffectiveBindingTarget, value: Expression, location: TextRange, original: Node) => void;
        emitArrayAssignment: (elements: EffectiveBindingElement[], value: Expression, location: TextRange, original: Node) => void;
        emitObjectAssignment: (elements: EffectiveBindingElement[], value: Expression, location: TextRange, original: Node) => void;
        emitExpression: (value: Expression) => void;
    }

    export function flattenDestructuringToDeclarations(
        context: TransformationContext,
        node: VariableDeclaration | ParameterDeclaration,
        boundValue: Expression | undefined,
        recordTempVariablesInLine: boolean,
        level: FlattenLevel): VisitResult<VariableDeclaration> {

        const pendingDeclarations: { pendingExpressions?: Expression[], name: BindingName, value: Expression, location?: TextRange, original?: Node; }[] = [];
        let pendingExpressions: Expression[];
        let declaration: VariableDeclaration;
        let declarations: VariableDeclaration[];
        const host: FlattenHost = {
            context,
            level,
            recordTempVariablesInLine,
            emitExpression,
            emitAssignment,
            emitArrayAssignment,
            emitObjectAssignment
        };

        flattenEffectiveBindingElement(host, node, boundValue, node);

        if (pendingExpressions) {
            const temp = createTempVariable(/*recordTempVariable*/ undefined);
            if (recordTempVariablesInLine) {
                const value = inlineExpressions(pendingExpressions);
                pendingExpressions = undefined;
                emitAssignment(temp, value, /*location*/ undefined, /*original*/ undefined);
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
            if (!declaration) {
                declaration = variable;
            }
            else if (!declarations) {
                declarations = [declaration, variable];
            }
            else {
                declarations.push(variable);
            }
        }

        return declarations || declaration;

        function emitExpression(value: Expression) {
            pendingExpressions = append(pendingExpressions, value);
        }

        function emitAssignment(target: EffectiveBindingTarget, value: Expression, location: TextRange, original: Node) {
            Debug.assertNode(target, isBindingName);
            pendingDeclarations.push({ pendingExpressions, name: <BindingName>target, value, location, original });
            if (pendingExpressions) {
                value = inlineExpressions(append(pendingExpressions, value));
                pendingExpressions = undefined;
            }
        }

        function emitArrayAssignment(elements: EffectiveBindingElement[], value: Expression, location: TextRange, original: Node) {
            Debug.assertEachNode(elements, isArrayBindingElement);
            emitAssignment(createArrayBindingPattern(<ArrayBindingElement[]>elements), value, location, original);
        }

        function emitObjectAssignment(elements: EffectiveBindingElement[], value: Expression, location: TextRange, original: Node) {
            Debug.assertEachNode(elements, isBindingElement);
            emitAssignment(createObjectBindingPattern(<BindingElement[]>elements), value, location, original);
        }
    }

    function flattenEffectiveBindingElement(
        host: FlattenHost,
        bindingElement: EffectiveBindingElement,
        boundValue: Expression | undefined,
        location: TextRange,
        skipInitializer?: boolean) {
        if (!skipInitializer) {
            const initializer = getInitializerOfEffectiveBindingElement(bindingElement);
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
            host.emitAssignment(bindingTarget, boundValue, location, /*original*/ bindingElement);
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

    function flattenEffectiveObjectBindingElements(host: FlattenHost, bindingTarget: EffectiveObjectBindingPattern, elements: EffectiveBindingElement[], boundValue: Expression, location: TextRange) {
        let bindingElements: EffectiveBindingElement[];
        const numElements = elements.length;
        for (let i = 0; i < numElements; i++) {
            const element = elements[i];
            if (!getEffectiveRestIndicator(element)) {
                if (host.level >= FlattenLevel.ObjectRestDestructuringOnly && !(element.transformFlags & TransformFlags.ContainsSpreadExpression)) {
                    bindingElements = append(bindingElements, element);
                }
                else {
                    if (bindingElements) {
                        host.emitObjectAssignment(bindingElements, boundValue, location, bindingTarget);
                        bindingElements = undefined;
                    }
                    const propertyName = getEffectivePropertyNameOfEffectiveBindingElement(element);
                    const value = createDestructuringPropertyAccess(host, boundValue, propertyName);
                    flattenEffectiveBindingElement(host, element, value, /*location*/ element);
                }
            }
            else if (i === numElements - 1) {
                if (bindingElements) {
                    host.emitObjectAssignment(bindingElements, boundValue, location, bindingTarget);
                    bindingElements = undefined;
                }
                const value = createRestCall(boundValue, elements, bindingTarget);
                flattenEffectiveBindingElement(host, element, value, element);
            }
        }
        if (bindingElements) {
            host.emitObjectAssignment(bindingElements, boundValue, location, bindingTarget);
        }
    }

    function flattenEffectiveArrayBindingElements(host: FlattenHost, bindingTarget: EffectiveArrayBindingPattern, elements: EffectiveBindingElement[], boundValue: Expression, location: TextRange) {
        let bindingElements: EffectiveBindingElement[];
        let spreadContainingElements: EffectiveBindingElement[];
        let tempNames: Map<Identifier>;
        const numElements = elements.length;
        for (let i = 0; i < numElements; i++) {
            const element = elements[i];
            if (isOmittedExpression(element)) {
                continue;
            }
            else if (host.level >= FlattenLevel.ObjectRestDestructuringOnly) {
                if (element.transformFlags & TransformFlags.ContainsSpreadExpression) {
                    const temp = createTempVariable(/*recordTempVariable*/ undefined);
                    tempNames = appendProperty(tempNames, getNodeId(element), temp);
                    spreadContainingElements = append(spreadContainingElements, element);
                    bindingElements = append(bindingElements, temp);
                }
                else {
                    bindingElements = append(bindingElements, element);
                }
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
            host.emitArrayAssignment(bindingElements, boundValue, location, bindingTarget);
        }
        if (spreadContainingElements) {
            for (const element of spreadContainingElements) {
                flattenEffectiveBindingElement(host, element, tempNames[getNodeId(element)], element);
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
                host.emitAssignment(temp, value, location, /*original*/ undefined);
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
     * Gets the initializer of an EffectiveBindingElement.
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

        if (isSpreadExpression(bindingElement) || isPartiallyEmittedExpression(bindingElement)) {
            // Recovery consistent with existing emit.
            return getInitializerOfEffectiveBindingElement(bindingElement.expression);
        }
    }

    /**
     * Gets the name of an EffectiveBindingElement.
     */
    function getTargetOfEffectiveBindingElement(bindingElement: EffectiveBindingElement): EffectiveBindingTarget {
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
    function getEffectiveRestIndicator(bindingElement: EffectiveBindingElement): EffectiveRestIndicator {
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
            case SyntaxKind.ArrayLiteralExpression:
                // `a` in `{a}`
                // `a` in `[a]`
                return name.elements;

            case SyntaxKind.ObjectLiteralExpression:
                // `a` in `{a}`
                return name.properties;
        }
    }

    // function updateEffectiveBindingElement(bindingElement: EffectiveBindingElement, restIndicator: EffectiveRestIndicator, propertyName: PropertyName, target: EffectiveBindingTarget, initializer: Expression) {
    //     switch (bindingElement.kind) {
    //         case SyntaxKind.VariableDeclaration:
    //             Debug.assertNode(target, isBindingName);
    //             Debug.assertMissingNode(propertyName);
    //             return updateVariableDeclaration(
    //                 <VariableDeclaration>bindingElement,
    //                 <BindingName>target,
    //                 /*type*/ undefined,
    //                 initializer
    //             );

    //         case SyntaxKind.Parameter:
    //             Debug.assertOptionalToken(restIndicator, SyntaxKind.DotDotDotToken);
    //             Debug.assertMissingNode(propertyName);
    //             Debug.assertNode(target, isBindingName);
    //             return updateParameter(
    //                 <ParameterDeclaration>bindingElement,
    //                 /*decorators*/ undefined,
    //                 /*modifiers*/ undefined,
    //                 <DotDotDotToken>restIndicator,
    //                 <BindingName>target,
    //                 /*type*/ undefined,
    //                 initializer
    //             );

    //         case SyntaxKind.BindingElement:
    //             Debug.assertOptionalToken(restIndicator, SyntaxKind.DotDotDotToken);
    //             Debug.assertNode(target, isBindingName);
    //             return updateBindingElement(
    //                 <BindingElement>bindingElement,
    //                 <DotDotDotToken>restIndicator,
    //                 propertyName,
    //                 <BindingName>target,
    //                 initializer
    //             );

    //         case SyntaxKind.PropertyAssignment:
    //         case SyntaxKind.ShorthandPropertyAssignment:
    //         case SyntaxKind.SpreadAssignment:
    //             if (restIndicator) {
    //                 return convertToSpreadAssignment(<PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment>bindingElement, propertyName, target, initializer);
    //             }
    //             else if (propertyName) {
    //                 return convertToPropertyAssignment(<PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment>bindingElement, propertyName, target, initializer);
    //             }
    //             else {
    //                 return convertToShorthandPropertyAssignment(<PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment>bindingElement, target, initializer);
    //             }

    //         case SyntaxKind.ArrayLiteralExpression:
    //         case SyntaxKind.BinaryExpression:
    //         case SyntaxKind.SpreadElement:
    //         case SyntaxKind.PropertyAccessExpression:
    //         case SyntaxKind.ElementAccessExpression:
    //             Debug.assertMissingNode(propertyName);
    //             if (restIndicator) {
    //                 return convertToSpreadElement(<Expression>bindingElement, target, initializer);
    //             }
    //             else {

    //             }
    //     }
    // }

    // function convertToSpreadAssignment(node: PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment, propertyName: PropertyName, target: EffectiveBindingTarget, initializer: Expression) {
    //     Debug.assertMissingNode(propertyName);
    //     Debug.assertNode(target, isIdentifier);
    //     Debug.assertMissingNode(initializer);
    //     if (node.kind === SyntaxKind.SpreadAssignment) {
    //         return updateSpreadAssignment(node, <Identifier>target);
    //     }
    //     return setOriginalNode(
    //         createSpreadAssignment(
    //             <Identifier>target,
    //             node
    //         ),
    //         node
    //     );
    // }

    // function convertToPropertyAssignment(node: PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment, propertyName: PropertyName, target: EffectiveBindingTarget, initializer: Expression) {
    //     Debug.assertNode(target, isExpression);
    //     if (node.kind === SyntaxKind.PropertyAssignment) {
    //         return updatePropertyAssignment(
    //             node,
    //             propertyName,
    //             initializer ?
    //                 isAssignmentExpression(node.initializer, /*excludeCompoundAssignment*/ true)
    //                     ? updateBinary(node.initializer, <Expression>target, initializer)
    //                     : createAssignment(<Expression>target, initializer)
    //                 : <Expression>target
    //         );
    //     }
    //     return setOriginalNode(
    //         createPropertyAssignment(
    //             propertyName,
    //             initializer ?
    //                 createAssignment(<Expression>target, initializer)
    //                 : <Expression>target,
    //             node
    //         ),
    //         node
    //     );
    // }

    // function convertToShorthandPropertyAssignment(node: PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment, target: EffectiveBindingTarget, initializer: Expression) {
    //     Debug.assertNode(target, isIdentifier);
    //     if (node.kind === SyntaxKind.ShorthandPropertyAssignment) {
    //         return updateShorthandPropertyAssignment(
    //             node,
    //             <Identifier>target,
    //             initializer
    //         );
    //     }
    //     return setOriginalNode(
    //         createShorthandPropertyAssignment(
    //             <Identifier>target,
    //             initializer,
    //             node
    //         ),
    //         node
    //     );
    // }

    // function convertToSpreadElement(node: Expression, target: EffectiveBindingTarget, initializer: Expression) {
    //     Debug.assertNode(target, isExpression);
    //     Debug.assertMissingNode(initializer);
    //     if (node.kind === SyntaxKind.SpreadElement) {
    //         return updateSpread(
    //             <SpreadElement>node,
    //             <Expression>target);
    //     }
    //     return setOriginalNode(
    //         createSpread(
    //             <Expression>target,
    //             node
    //         ),
    //         node
    //     );
    // }

    // function convertToElement(node: Expression, target: EffectiveBindingTarget, initializer: Expression) {

    // }

    function createOrUpdateVariableDeclaration(node: Node, name: BindingName, initializer: Expression, location: TextRange) {
        if (node && node.kind === SyntaxKind.VariableDeclaration) {
            return updateVariableDeclaration(<VariableDeclaration>node, name, /*type*/ undefined, initializer);
        }
        const variable = createVariableDeclaration(name, /*type*/ undefined, initializer, location);
        return node ? setOriginalNode(variable, node) : variable;
    }

    function createOrUpdateArrayBindingPattern(node: Node, elements: ArrayBindingElement[], location: TextRange) {
        if (node && node.kind === SyntaxKind.ArrayBindingPattern) {
            return updateArrayBindingPattern(<ArrayBindingPattern>node, elements);
        }
        const pattern = createArrayBindingPattern(elements, location);
        return node ? setOriginalNode(pattern, node) : pattern;
    }

    function createOrUpdateObjectBindingPattern(node: Node, elements: BindingElement[], location: TextRange) {
        if (node && node.kind === SyntaxKind.ArrayBindingPattern) {
            return updateObjectBindingPattern(<ObjectBindingPattern>node, elements);
        }
        const pattern = createObjectBindingPattern(elements, location);
        return node ? setOriginalNode(pattern, node) : pattern;
    }

    /** Given value: o, propName: p, pattern: { a, b, ...p } from the original statement
     * `{ a, b, ...p } = o`, create `p = __rest(o, ["a", "b"]);`*/
    function createRestCall(value: Expression, elements: EffectiveBindingElement[], location: TextRange): Expression {
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
