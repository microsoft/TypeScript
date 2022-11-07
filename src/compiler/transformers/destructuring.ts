import * as ts from "../_namespaces/ts";

interface FlattenContext {
    context: ts.TransformationContext;
    level: FlattenLevel;
    downlevelIteration: boolean;
    hoistTempVariables: boolean;
    hasTransformedPriorElement?: boolean; // indicates whether we've transformed a prior declaration
    emitExpression: (value: ts.Expression) => void;
    emitBindingOrAssignment: (target: ts.BindingOrAssignmentElementTarget, value: ts.Expression, location: ts.TextRange, original: ts.Node | undefined) => void;
    createArrayBindingOrAssignmentPattern: (elements: ts.BindingOrAssignmentElement[]) => ts.ArrayBindingOrAssignmentPattern;
    createObjectBindingOrAssignmentPattern: (elements: ts.BindingOrAssignmentElement[]) => ts.ObjectBindingOrAssignmentPattern;
    createArrayBindingOrAssignmentElement: (node: ts.Identifier) => ts.BindingOrAssignmentElement;
    visitor?: (node: ts.Node) => ts.VisitResult<ts.Node>;
}

/** @internal */
export const enum FlattenLevel {
    All,
    ObjectRest,
}

/** @internal */
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
    node: ts.VariableDeclaration | ts.DestructuringAssignment,
    visitor: ((node: ts.Node) => ts.VisitResult<ts.Node>) | undefined,
    context: ts.TransformationContext,
    level: FlattenLevel,
    needsValue?: boolean,
    createAssignmentCallback?: (name: ts.Identifier, value: ts.Expression, location?: ts.TextRange) => ts.Expression): ts.Expression {
    let location: ts.TextRange = node;
    let value: ts.Expression | undefined;
    if (ts.isDestructuringAssignment(node)) {
        value = node.right;
        while (ts.isEmptyArrayLiteral(node.left) || ts.isEmptyObjectLiteral(node.left)) {
            if (ts.isDestructuringAssignment(value)) {
                location = node = value;
                value = node.right;
            }
            else {
                return ts.visitNode(value, visitor, ts.isExpression);
            }
        }
    }

    let expressions: ts.Expression[] | undefined;
    const flattenContext: FlattenContext = {
        context,
        level,
        downlevelIteration: !!context.getCompilerOptions().downlevelIteration,
        hoistTempVariables: true,
        emitExpression,
        emitBindingOrAssignment,
        createArrayBindingOrAssignmentPattern: elements => makeArrayAssignmentPattern(context.factory, elements),
        createObjectBindingOrAssignmentPattern: elements => makeObjectAssignmentPattern(context.factory, elements),
        createArrayBindingOrAssignmentElement: makeAssignmentElement,
        visitor
    };

    if (value) {
        value = ts.visitNode(value, visitor, ts.isExpression);

        if (ts.isIdentifier(value) && bindingOrAssignmentElementAssignsToName(node, value.escapedText) ||
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
        else if (ts.nodeIsSynthesized(node)) {
            // Generally, the source map location for a destructuring assignment is the root
            // expression.
            //
            // However, if the root expression is synthesized (as in the case
            // of the initializer when transforming a ForOfStatement), then the source map
            // location should point to the right-hand value of the expression.
            location = value;
        }
    }

    flattenBindingOrAssignmentElement(flattenContext, node, value, location, /*skipInitializer*/ ts.isDestructuringAssignment(node));

    if (value && needsValue) {
        if (!ts.some(expressions)) {
            return value;
        }

        expressions.push(value);
    }

    return context.factory.inlineExpressions(expressions!) || context.factory.createOmittedExpression();

    function emitExpression(expression: ts.Expression) {
        expressions = ts.append(expressions, expression);
    }

    function emitBindingOrAssignment(target: ts.BindingOrAssignmentElementTarget, value: ts.Expression, location: ts.TextRange, original: ts.Node) {
        ts.Debug.assertNode(target, createAssignmentCallback ? ts.isIdentifier : ts.isExpression);
        const expression = createAssignmentCallback
            ? createAssignmentCallback(target as ts.Identifier, value, location)
            : ts.setTextRange(
                context.factory.createAssignment(ts.visitNode(target as ts.Expression, visitor, ts.isExpression), value),
                location
            );
        expression.original = original;
        emitExpression(expression);
    }
}

function bindingOrAssignmentElementAssignsToName(element: ts.BindingOrAssignmentElement, escapedName: ts.__String): boolean {
    const target = ts.getTargetOfBindingOrAssignmentElement(element)!; // TODO: GH#18217
    if (ts.isBindingOrAssignmentPattern(target)) {
        return bindingOrAssignmentPatternAssignsToName(target, escapedName);
    }
    else if (ts.isIdentifier(target)) {
        return target.escapedText === escapedName;
    }
    return false;
}

function bindingOrAssignmentPatternAssignsToName(pattern: ts.BindingOrAssignmentPattern, escapedName: ts.__String): boolean {
    const elements = ts.getElementsOfBindingOrAssignmentPattern(pattern);
    for (const element of elements) {
        if (bindingOrAssignmentElementAssignsToName(element, escapedName)) {
            return true;
        }
    }
    return false;
}

function bindingOrAssignmentElementContainsNonLiteralComputedName(element: ts.BindingOrAssignmentElement): boolean {
    const propertyName = ts.tryGetPropertyNameOfBindingOrAssignmentElement(element);
    if (propertyName && ts.isComputedPropertyName(propertyName) && !ts.isLiteralExpression(propertyName.expression)) {
        return true;
    }
    const target = ts.getTargetOfBindingOrAssignmentElement(element);
    return !!target && ts.isBindingOrAssignmentPattern(target) && bindingOrAssignmentPatternContainsNonLiteralComputedName(target);
}

function bindingOrAssignmentPatternContainsNonLiteralComputedName(pattern: ts.BindingOrAssignmentPattern): boolean {
    return !!ts.forEach(ts.getElementsOfBindingOrAssignmentPattern(pattern), bindingOrAssignmentElementContainsNonLiteralComputedName);
}

/** @internal */
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
    node: ts.VariableDeclaration | ts.ParameterDeclaration,
    visitor: (node: ts.Node) => ts.VisitResult<ts.Node>,
    context: ts.TransformationContext,
    level: FlattenLevel,
    rval?: ts.Expression,
    hoistTempVariables = false,
    skipInitializer?: boolean): ts.VariableDeclaration[] {
    let pendingExpressions: ts.Expression[] | undefined;
    const pendingDeclarations: { pendingExpressions?: ts.Expression[], name: ts.BindingName, value: ts.Expression, location?: ts.TextRange, original?: ts.Node; }[] = [];
    const declarations: ts.VariableDeclaration[] = [];
    const flattenContext: FlattenContext = {
        context,
        level,
        downlevelIteration: !!context.getCompilerOptions().downlevelIteration,
        hoistTempVariables,
        emitExpression,
        emitBindingOrAssignment,
        createArrayBindingOrAssignmentPattern: elements => makeArrayBindingPattern(context.factory, elements),
        createObjectBindingOrAssignmentPattern: elements => makeObjectBindingPattern(context.factory, elements),
        createArrayBindingOrAssignmentElement: name => makeBindingElement(context.factory, name),
        visitor
    };

    if (ts.isVariableDeclaration(node)) {
        let initializer = ts.getInitializerOfBindingOrAssignmentElement(node);
        if (initializer && (ts.isIdentifier(initializer) && bindingOrAssignmentElementAssignsToName(node, initializer.escapedText) ||
            bindingOrAssignmentElementContainsNonLiteralComputedName(node))) {
            // If the right-hand value of the assignment is also an assignment target then
            // we need to cache the right-hand value.
            initializer = ensureIdentifier(flattenContext, ts.visitNode(initializer, flattenContext.visitor), /*reuseIdentifierExpressions*/ false, initializer);
            node = context.factory.updateVariableDeclaration(node, node.name, /*exclamationToken*/ undefined, /*type*/ undefined, initializer);
        }
    }

    flattenBindingOrAssignmentElement(flattenContext, node, rval, node, skipInitializer);
    if (pendingExpressions) {
        const temp = context.factory.createTempVariable(/*recordTempVariable*/ undefined);
        if (hoistTempVariables) {
            const value = context.factory.inlineExpressions(pendingExpressions);
            pendingExpressions = undefined;
            emitBindingOrAssignment(temp, value, /*location*/ undefined, /*original*/ undefined);
        }
        else {
            context.hoistVariableDeclaration(temp);
            const pendingDeclaration = ts.last(pendingDeclarations);
            pendingDeclaration.pendingExpressions = ts.append(
                pendingDeclaration.pendingExpressions,
                context.factory.createAssignment(temp, pendingDeclaration.value)
            );
            ts.addRange(pendingDeclaration.pendingExpressions, pendingExpressions);
            pendingDeclaration.value = temp;
        }
    }
    for (const { pendingExpressions, name, value, location, original } of pendingDeclarations) {
        const variable = context.factory.createVariableDeclaration(
            name,
            /*exclamationToken*/ undefined,
            /*type*/ undefined,
            pendingExpressions ? context.factory.inlineExpressions(ts.append(pendingExpressions, value)) : value
        );
        variable.original = original;
        ts.setTextRange(variable, location);
        declarations.push(variable);
    }
    return declarations;

    function emitExpression(value: ts.Expression) {
        pendingExpressions = ts.append(pendingExpressions, value);
    }

    function emitBindingOrAssignment(target: ts.BindingOrAssignmentElementTarget, value: ts.Expression, location: ts.TextRange | undefined, original: ts.Node | undefined) {
        ts.Debug.assertNode(target, ts.isBindingName);
        if (pendingExpressions) {
            value = context.factory.inlineExpressions(ts.append(pendingExpressions, value));
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
    element: ts.BindingOrAssignmentElement,
    value: ts.Expression | undefined,
    location: ts.TextRange,
    skipInitializer?: boolean) {
    const bindingTarget = ts.getTargetOfBindingOrAssignmentElement(element)!; // TODO: GH#18217
    if (!skipInitializer) {
        const initializer = ts.visitNode(ts.getInitializerOfBindingOrAssignmentElement(element), flattenContext.visitor, ts.isExpression);
        if (initializer) {
            // Combine value and initializer
            if (value) {
                value = createDefaultValueCheck(flattenContext, value, initializer, location);
                // If 'value' is not a simple expression, it could contain side-effecting code that should evaluate before an object or array binding pattern.
                if (!ts.isSimpleInlineableExpression(initializer) && ts.isBindingOrAssignmentPattern(bindingTarget)) {
                    value = ensureIdentifier(flattenContext, value, /*reuseIdentifierExpressions*/ true, location);
                }
            }
            else {
                value = initializer;
            }
        }
        else if (!value) {
            // Use 'void 0' in absence of value and initializer
            value = flattenContext.context.factory.createVoidZero();
        }
    }
    if (ts.isObjectBindingOrAssignmentPattern(bindingTarget)) {
        flattenObjectBindingOrAssignmentPattern(flattenContext, element, bindingTarget, value!, location);
    }
    else if (ts.isArrayBindingOrAssignmentPattern(bindingTarget)) {
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
function flattenObjectBindingOrAssignmentPattern(flattenContext: FlattenContext, parent: ts.BindingOrAssignmentElement, pattern: ts.ObjectBindingOrAssignmentPattern, value: ts.Expression, location: ts.TextRange) {
    const elements = ts.getElementsOfBindingOrAssignmentPattern(pattern);
    const numElements = elements.length;
    if (numElements !== 1) {
        // For anything other than a single-element destructuring we need to generate a temporary
        // to ensure value is evaluated exactly once. Additionally, if we have zero elements
        // we need to emit *something* to ensure that in case a 'var' keyword was already emitted,
        // so in that case, we'll intentionally create that temporary.
        const reuseIdentifierExpressions = !ts.isDeclarationBindingElement(parent) || numElements !== 0;
        value = ensureIdentifier(flattenContext, value, reuseIdentifierExpressions, location);
    }
    let bindingElements: ts.BindingOrAssignmentElement[] | undefined;
    let computedTempVariables: ts.Expression[] | undefined;
    for (let i = 0; i < numElements; i++) {
        const element = elements[i];
        if (!ts.getRestIndicatorOfBindingOrAssignmentElement(element)) {
            const propertyName = ts.getPropertyNameOfBindingOrAssignmentElement(element)!;
            if (flattenContext.level >= FlattenLevel.ObjectRest
                && !(element.transformFlags & (ts.TransformFlags.ContainsRestOrSpread | ts.TransformFlags.ContainsObjectRestOrSpread))
                && !(ts.getTargetOfBindingOrAssignmentElement(element)!.transformFlags & (ts.TransformFlags.ContainsRestOrSpread | ts.TransformFlags.ContainsObjectRestOrSpread))
                && !ts.isComputedPropertyName(propertyName)) {
                bindingElements = ts.append(bindingElements, ts.visitNode(element, flattenContext.visitor));
            }
            else {
                if (bindingElements) {
                    flattenContext.emitBindingOrAssignment(flattenContext.createObjectBindingOrAssignmentPattern(bindingElements), value, location, pattern);
                    bindingElements = undefined;
                }
                const rhsValue = createDestructuringPropertyAccess(flattenContext, value, propertyName);
                if (ts.isComputedPropertyName(propertyName)) {
                    computedTempVariables = ts.append<ts.Expression>(computedTempVariables, (rhsValue as ts.ElementAccessExpression).argumentExpression);
                }
                flattenBindingOrAssignmentElement(flattenContext, element, rhsValue, /*location*/ element);
            }
        }
        else if (i === numElements - 1) {
            if (bindingElements) {
                flattenContext.emitBindingOrAssignment(flattenContext.createObjectBindingOrAssignmentPattern(bindingElements), value, location, pattern);
                bindingElements = undefined;
            }
            const rhsValue = flattenContext.context.getEmitHelperFactory().createRestHelper(value, elements, computedTempVariables, pattern);
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
function flattenArrayBindingOrAssignmentPattern(flattenContext: FlattenContext, parent: ts.BindingOrAssignmentElement, pattern: ts.ArrayBindingOrAssignmentPattern, value: ts.Expression, location: ts.TextRange) {
    const elements = ts.getElementsOfBindingOrAssignmentPattern(pattern);
    const numElements = elements.length;
    if (flattenContext.level < FlattenLevel.ObjectRest && flattenContext.downlevelIteration) {
        // Read the elements of the iterable into an array
        value = ensureIdentifier(
            flattenContext,
            ts.setTextRange(
                flattenContext.context.getEmitHelperFactory().createReadHelper(
                    value,
                    numElements > 0 && ts.getRestIndicatorOfBindingOrAssignmentElement(elements[numElements - 1])
                        ? undefined
                        : numElements
                ),
                location
            ),
            /*reuseIdentifierExpressions*/ false,
            location
        );
    }
    else if (numElements !== 1 && (flattenContext.level < FlattenLevel.ObjectRest || numElements === 0)
        || ts.every(elements, ts.isOmittedExpression)) {
        // For anything other than a single-element destructuring we need to generate a temporary
        // to ensure value is evaluated exactly once. Additionally, if we have zero elements
        // we need to emit *something* to ensure that in case a 'var' keyword was already emitted,
        // so in that case, we'll intentionally create that temporary.
        // Or all the elements of the binding pattern are omitted expression such as "var [,] = [1,2]",
        // then we will create temporary variable.
        const reuseIdentifierExpressions = !ts.isDeclarationBindingElement(parent) || numElements !== 0;
        value = ensureIdentifier(flattenContext, value, reuseIdentifierExpressions, location);
    }
    let bindingElements: ts.BindingOrAssignmentElement[] | undefined;
    let restContainingElements: [ts.Identifier, ts.BindingOrAssignmentElement][] | undefined;
    for (let i = 0; i < numElements; i++) {
        const element = elements[i];
        if (flattenContext.level >= FlattenLevel.ObjectRest) {
            // If an array pattern contains an ObjectRest, we must cache the result so that we
            // can perform the ObjectRest destructuring in a different declaration
            if (element.transformFlags & ts.TransformFlags.ContainsObjectRestOrSpread || flattenContext.hasTransformedPriorElement && !isSimpleBindingOrAssignmentElement(element)) {
                flattenContext.hasTransformedPriorElement = true;
                const temp = flattenContext.context.factory.createTempVariable(/*recordTempVariable*/ undefined);
                if (flattenContext.hoistTempVariables) {
                    flattenContext.context.hoistVariableDeclaration(temp);
                }

                restContainingElements = ts.append(restContainingElements, [temp, element] as [ts.Identifier, ts.BindingOrAssignmentElement]);
                bindingElements = ts.append(bindingElements, flattenContext.createArrayBindingOrAssignmentElement(temp));
            }
            else {
                bindingElements = ts.append(bindingElements, element);
            }
        }
        else if (ts.isOmittedExpression(element)) {
            continue;
        }
        else if (!ts.getRestIndicatorOfBindingOrAssignmentElement(element)) {
            const rhsValue = flattenContext.context.factory.createElementAccessExpression(value, i);
            flattenBindingOrAssignmentElement(flattenContext, element, rhsValue, /*location*/ element);
        }
        else if (i === numElements - 1) {
            const rhsValue = flattenContext.context.factory.createArraySliceCall(value, i);
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

function isSimpleBindingOrAssignmentElement(element: ts.BindingOrAssignmentElement): boolean {
    const target = ts.getTargetOfBindingOrAssignmentElement(element);
    if (!target || ts.isOmittedExpression(target)) return true;
    const propertyName = ts.tryGetPropertyNameOfBindingOrAssignmentElement(element);
    if (propertyName && !ts.isPropertyNameLiteral(propertyName)) return false;
    const initializer = ts.getInitializerOfBindingOrAssignmentElement(element);
    if (initializer && !ts.isSimpleInlineableExpression(initializer)) return false;
    if (ts.isBindingOrAssignmentPattern(target)) return ts.every(ts.getElementsOfBindingOrAssignmentPattern(target), isSimpleBindingOrAssignmentElement);
    return ts.isIdentifier(target);
}

/**
 * Creates an expression used to provide a default value if a value is `undefined` at runtime.
 *
 * @param flattenContext Options used to control flattening.
 * @param value The RHS value to test.
 * @param defaultValue The default value to use if `value` is `undefined` at runtime.
 * @param location The location to use for source maps and comments.
 */
function createDefaultValueCheck(flattenContext: FlattenContext, value: ts.Expression, defaultValue: ts.Expression, location: ts.TextRange): ts.Expression {
    value = ensureIdentifier(flattenContext, value, /*reuseIdentifierExpressions*/ true, location);
    return flattenContext.context.factory.createConditionalExpression(flattenContext.context.factory.createTypeCheck(value, "undefined"), /*questionToken*/ undefined, defaultValue, /*colonToken*/ undefined, value);
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
function createDestructuringPropertyAccess(flattenContext: FlattenContext, value: ts.Expression, propertyName: ts.PropertyName): ts.LeftHandSideExpression {
    if (ts.isComputedPropertyName(propertyName)) {
        const argumentExpression = ensureIdentifier(flattenContext, ts.visitNode(propertyName.expression, flattenContext.visitor), /*reuseIdentifierExpressions*/ false, /*location*/ propertyName);
        return flattenContext.context.factory.createElementAccessExpression(value, argumentExpression);
    }
    else if (ts.isStringOrNumericLiteralLike(propertyName)) {
        const argumentExpression = ts.factory.cloneNode(propertyName);
        return flattenContext.context.factory.createElementAccessExpression(value, argumentExpression);
    }
    else {
        const name = flattenContext.context.factory.createIdentifier(ts.idText(propertyName));
        return flattenContext.context.factory.createPropertyAccessExpression(value, name);
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
function ensureIdentifier(flattenContext: FlattenContext, value: ts.Expression, reuseIdentifierExpressions: boolean, location: ts.TextRange) {
    if (ts.isIdentifier(value) && reuseIdentifierExpressions) {
        return value;
    }
    else {
        const temp = flattenContext.context.factory.createTempVariable(/*recordTempVariable*/ undefined);
        if (flattenContext.hoistTempVariables) {
            flattenContext.context.hoistVariableDeclaration(temp);
            flattenContext.emitExpression(ts.setTextRange(flattenContext.context.factory.createAssignment(temp, value), location));
        }
        else {
            flattenContext.emitBindingOrAssignment(temp, value, location, /*original*/ undefined);
        }
        return temp;
    }
}

function makeArrayBindingPattern(factory: ts.NodeFactory, elements: ts.BindingOrAssignmentElement[]) {
    ts.Debug.assertEachNode(elements, ts.isArrayBindingElement);
    return factory.createArrayBindingPattern(elements as ts.ArrayBindingElement[]);
}

function makeArrayAssignmentPattern(factory: ts.NodeFactory, elements: ts.BindingOrAssignmentElement[]) {
    return factory.createArrayLiteralExpression(ts.map(elements, factory.converters.convertToArrayAssignmentElement));
}

function makeObjectBindingPattern(factory: ts.NodeFactory, elements: ts.BindingOrAssignmentElement[]) {
    ts.Debug.assertEachNode(elements, ts.isBindingElement);
    return factory.createObjectBindingPattern(elements as ts.BindingElement[]);
}

function makeObjectAssignmentPattern(factory: ts.NodeFactory, elements: ts.BindingOrAssignmentElement[]) {
    return factory.createObjectLiteralExpression(ts.map(elements, factory.converters.convertToObjectAssignmentElement));
}

function makeBindingElement(factory: ts.NodeFactory, name: ts.Identifier) {
    return factory.createBindingElement(/*dotDotDotToken*/ undefined, /*propertyName*/ undefined, name);
}

function makeAssignmentElement(name: ts.Identifier) {
    return name;
}
