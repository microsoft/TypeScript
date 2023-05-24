import {
    __String,
    AnonymousFunctionDefinition,
    BinaryExpression,
    BindingElement,
    ClassExpression,
    ExportAssignment,
    Expression,
    getOriginalNode,
    hasSyntacticModifier,
    Identifier,
    isCallToHelper,
    isClassDeclaration,
    isClassExpression,
    isClassStaticBlockDeclaration,
    isExpressionStatement,
    isFunctionDeclaration,
    isIdentifier,
    isPrivateIdentifier,
    isPropertyNameLiteral,
    ModifierFlags,
    NamedEvaluation,
    NodeFactory,
    ParameterDeclaration,
    PropertyAssignment,
    PropertyDeclaration,
    PropertyName,
    setTextRange,
    ShorthandPropertyAssignment,
    skipOuterExpressions,
    StringLiteral,
    SyntaxKind,
    TransformationContext,
    VariableDeclaration,
    WrappedExpression
} from "../_namespaces/ts";

/**
 * Gets a string literal to use as the assigned name of an anonymous class or function declaration.
 * @internal
 */
export function getAssignedNameOfIdentifier(factory: NodeFactory, name: Identifier, expression: WrappedExpression<AnonymousFunctionDefinition>): StringLiteral {
    const original = getOriginalNode(skipOuterExpressions(expression));
    if ((isClassDeclaration(original) || isFunctionDeclaration(original)) &&
        !original.name && hasSyntacticModifier(original, ModifierFlags.Default)) {
        return factory.createStringLiteral("default");
    }
    return factory.createStringLiteralFromNode(name);
}

function getAssignedNameOfPropertyName(context: TransformationContext, name: PropertyName) {
    const { factory } = context;
    if (isPropertyNameLiteral(name) || isPrivateIdentifier(name)) {
        const assignedName = factory.createStringLiteralFromNode(name);
        return { assignedName, name };
    }

    if (isPropertyNameLiteral(name.expression) && !isIdentifier(name.expression)) {
        const assignedName = factory.createStringLiteralFromNode(name.expression);
        return { assignedName, name };
    }

    const assignedName = factory.getGeneratedNameForNode(name);
    context.hoistVariableDeclaration(assignedName);

    const key = context.getEmitHelperFactory().createPropKeyHelper(name.expression);
    const assignment = factory.createAssignment(assignedName, key);
    const updatedName = factory.updateComputedPropertyName(name, assignment);
    return { assignedName, name: updatedName };
}

/**
 * Gets whether a `ClassExpression` has a declared name or contains a `static {}` block that calls the `__setFunctionName` helper.
 * @internal
 */
export function classHasDeclaredOrExplicitlyAssignedName(node: ClassExpression): boolean {
    if (node.name) return true;
    for (const member of node.members) {
        if (!isClassStaticBlockDeclaration(member)) continue;
        for (const statement of member.body.statements) {
            if (!isExpressionStatement(statement)) continue;
            if (isCallToHelper(statement.expression, "__setFunctionName" as __String)) return true;
        }
    }
    return false;
}

function finishTransformNamedEvaluation(
    context: TransformationContext,
    expression: WrappedExpression<AnonymousFunctionDefinition>,
    assignedName: Expression,
): Expression {
    const { factory } = context;
    const innerExpression = skipOuterExpressions(expression);

    let updatedExpression: Expression;
    if (isClassExpression(innerExpression)) {
        const setNameExpression = context.getEmitHelperFactory().createSetFunctionNameHelper(factory.createThis(), assignedName);
        const setNameStatement = factory.createExpressionStatement(setNameExpression);
        const setNameBody = factory.createBlock([setNameStatement], /*multiLine*/ false);
        const setNameBlock = factory.createClassStaticBlockDeclaration(setNameBody);
        const members = factory.createNodeArray([setNameBlock, ...innerExpression.members]);
        setTextRange(members, innerExpression.members);
        updatedExpression = factory.updateClassExpression(
            innerExpression,
            innerExpression.modifiers,
            innerExpression.name,
            innerExpression.typeParameters,
            innerExpression.heritageClauses,
            members
        );
    }
    else {
        updatedExpression = context.getEmitHelperFactory().createSetFunctionNameHelper(innerExpression, assignedName);
    }

    return factory.restoreOuterExpressions(expression, updatedExpression);
}

function transformNamedEvaluationOfPropertyAssignment(context: TransformationContext, node: NamedEvaluation & PropertyAssignment) {
    // 13.2.5.5 RS: PropertyDefinitionEvaluation
    //   PropertyAssignment : PropertyName `:` AssignmentExpression
    //     ...
    //     5. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true* and _isProtoSetter_ is *false*, then
    //        a. Let _popValue_ be ? NamedEvaluation of |AssignmentExpression| with argument _propKey_.
    //     ...

    const { factory } = context;
    const { assignedName, name } = getAssignedNameOfPropertyName(context, node.name);
    const initializer = finishTransformNamedEvaluation(context, node.initializer, assignedName);
    return factory.updatePropertyAssignment(
        node,
        name,
        initializer);
}

function transformNamedEvaluationOfShorthandAssignmentProperty(context: TransformationContext, node: NamedEvaluation & ShorthandPropertyAssignment) {
    // 13.15.5.3 RS: PropertyDestructuringAssignmentEvaluation
    //   AssignmentProperty : IdentifierReference Initializer?
    //     ...
    //     4. If |Initializer?| is present and _v_ is *undefined*, then
    //        a. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
    //           i. Set _v_ to ? NamedEvaluation of |Initializer| with argument _P_.
    //     ...

    const { factory } = context;
    const assignedName = getAssignedNameOfIdentifier(factory, node.name, node.objectAssignmentInitializer);
    const objectAssignmentInitializer = finishTransformNamedEvaluation(context, node.objectAssignmentInitializer, assignedName);
    return factory.updateShorthandPropertyAssignment(
        node,
        node.name,
        objectAssignmentInitializer);
}

function transformNamedEvaluationOfVariableDeclaration(context: TransformationContext, node: NamedEvaluation & VariableDeclaration) {
    // 14.3.1.2 RS: Evaluation
    //   LexicalBinding : BindingIdentifier Initializer
    //     ...
    //     3. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
    //        a. Let _value_ be ? NamedEvaluation of |Initializer| with argument _bindingId_.
    //     ...
    //
    // 14.3.2.1 RS: Evaluation
    //   VariableDeclaration : BindingIdentifier Initializer
    //     ...
    //     3. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
    //        a. Let _value_ be ? NamedEvaluation of |Initializer| with argument _bindingId_.
    //     ...

    const { factory } = context;
    const assignedName = getAssignedNameOfIdentifier(factory, node.name, node.initializer);
    const initializer = finishTransformNamedEvaluation(context, node.initializer, assignedName);
    return factory.updateVariableDeclaration(
        node,
        node.name,
        node.exclamationToken,
        node.type,
        initializer);
}

function transformNamedEvaluationOfParameterDeclaration(context: TransformationContext, node: NamedEvaluation & ParameterDeclaration) {
    // 8.6.3 RS: IteratorBindingInitialization
    //   SingleNameBinding : BindingIdentifier Initializer?
    //     ...
    //     5. If |Initializer| is present and _v_ is *undefined*, then
    //        a. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
    //           i. Set _v_ to ? NamedEvaluation of |Initializer| with argument _bindingId_.
    //     ...
    //
    // 14.3.3.3 RS: KeyedBindingInitialization
    //   SingleNameBinding : BindingIdentifier Initializer?
    //     ...
    //     4. If |Initializer| is present and _v_ is *undefined*, then
    //        a. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
    //           i. Set _v_ to ? NamedEvaluation of |Initializer| with argument _bindingId_.
    //     ...

    const { factory } = context;
    const assignedName = getAssignedNameOfIdentifier(factory, node.name, node.initializer);
    const initializer = finishTransformNamedEvaluation(context, node.initializer, assignedName);
    return factory.updateParameterDeclaration(
        node,
        node.modifiers,
        node.dotDotDotToken,
        node.name,
        node.questionToken,
        node.type,
        initializer);
}

function transformNamedEvaluationOfBindingElement(context: TransformationContext, node: NamedEvaluation & BindingElement) {
    // 8.6.3 RS: IteratorBindingInitialization
    //   SingleNameBinding : BindingIdentifier Initializer?
    //     ...
    //     5. If |Initializer| is present and _v_ is *undefined*, then
    //        a. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
    //           i. Set _v_ to ? NamedEvaluation of |Initializer| with argument _bindingId_.
    //     ...
    //
    // 14.3.3.3 RS: KeyedBindingInitialization
    //   SingleNameBinding : BindingIdentifier Initializer?
    //     ...
    //     4. If |Initializer| is present and _v_ is *undefined*, then
    //        a. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
    //           i. Set _v_ to ? NamedEvaluation of |Initializer| with argument _bindingId_.
    //     ...

    const { factory } = context;
    const assignedName = getAssignedNameOfIdentifier(factory, node.name, node.initializer);
    const initializer = finishTransformNamedEvaluation(context, node.initializer, assignedName);
    return factory.updateBindingElement(
        node,
        node.dotDotDotToken,
        node.propertyName,
        node.name,
        initializer);
}

function transformNamedEvaluationOfPropertyDeclaration(context: TransformationContext, node: NamedEvaluation & PropertyDeclaration) {
    // 10.2.1.3 RS: EvaluateBody
    //   Initializer : `=` AssignmentExpression
    //     ...
    //     3. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true*, then
    //        a. Let _value_ be ? NamedEvaluation of |Initializer| with argument _functionObject_.[[ClassFieldInitializerName]].
    //     ...

    const { factory } = context;
    const { assignedName, name } = getAssignedNameOfPropertyName(context, node.name);
    const initializer = finishTransformNamedEvaluation(context, node.initializer, assignedName);
    return factory.updatePropertyDeclaration(
        node,
        node.modifiers,
        name,
        node.questionToken ?? node.exclamationToken,
        node.type,
        initializer);
}

function transformNamedEvaluationOfAssignmentExpression(context: TransformationContext, node: NamedEvaluation & BinaryExpression) {
    // 13.15.2 RS: Evaluation
    //   AssignmentExpression : LeftHandSideExpression `=` AssignmentExpression
    //     1. If |LeftHandSideExpression| is neither an |ObjectLiteral| nor an |ArrayLiteral|, then
    //        a. Let _lref_ be ? Evaluation of |LeftHandSideExpression|.
    //        b. If IsAnonymousFunctionDefinition(|AssignmentExpression|) and IsIdentifierRef of |LeftHandSideExpression| are both *true*, then
    //           i. Let _rval_ be ? NamedEvaluation of |AssignmentExpression| with argument _lref_.[[ReferencedName]].
    //     ...
    //
    //   AssignmentExpression : LeftHandSideExpression `&&=` AssignmentExpression
    //     ...
    //     5. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true* and IsIdentifierRef of |LeftHandSideExpression| is *true*, then
    //        a. Let _rval_ be ? NamedEvaluation of |AssignmentExpression| with argument _lref_.[[ReferencedName]].
    //     ...
    //
    //   AssignmentExpression : LeftHandSideExpression `||=` AssignmentExpression
    //     ...
    //     5. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true* and IsIdentifierRef of |LeftHandSideExpression| is *true*, then
    //        a. Let _rval_ be ? NamedEvaluation of |AssignmentExpression| with argument _lref_.[[ReferencedName]].
    //     ...
    //
    //   AssignmentExpression : LeftHandSideExpression `??=` AssignmentExpression
    //     ...
    //     4. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true* and IsIdentifierRef of |LeftHandSideExpression| is *true*, then
    //        a. Let _rval_ be ? NamedEvaluation of |AssignmentExpression| with argument _lref_.[[ReferencedName]].
    //     ...

    const { factory } = context;
    const assignedName = getAssignedNameOfIdentifier(factory, node.left, node.right);
    const right = finishTransformNamedEvaluation(context, node.right, assignedName);
    return factory.updateBinaryExpression(
        node,
        node.left,
        node.operatorToken,
        right);
}

function transformNamedEvaluationOfExportAssignment(context: TransformationContext, node: NamedEvaluation & ExportAssignment) {
    // 16.2.3.7 RS: Evaluation
    //   ExportDeclaration : `export` `default` AssignmentExpression `;`
    //     1. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true*, then
    //        a. Let _value_ be ? NamedEvaluation of |AssignmentExpression| with argument `"default"`.
    //     ...

    // NOTE: Since emit for `export =` translates to `module.exports = ...`, the assigned name of the class or function
    // is `""`.

    const { factory } = context;
    const assignedName = factory.createStringLiteral(node.isExportEquals ? "" : "default");
    const expression = finishTransformNamedEvaluation(context, node.expression, assignedName);
    return factory.updateExportAssignment(
        node,
        node.modifiers,
        expression);
}

/**
 * Performs a shallow transformation of a `NamedEvaluation` node, such that a valid name will be assigned.
 * @internal
 */
export function transformNamedEvaluation<T extends NamedEvaluation>(context: TransformationContext, node: T): NamedEvaluation & Pick<T, "kind">;
export function transformNamedEvaluation(context: TransformationContext, node: NamedEvaluation) {
    switch (node.kind) {
        case SyntaxKind.PropertyAssignment:
            return transformNamedEvaluationOfPropertyAssignment(context, node);
        case SyntaxKind.ShorthandPropertyAssignment:
            return transformNamedEvaluationOfShorthandAssignmentProperty(context, node);
        case SyntaxKind.VariableDeclaration:
            return transformNamedEvaluationOfVariableDeclaration(context, node);
        case SyntaxKind.Parameter:
            return transformNamedEvaluationOfParameterDeclaration(context, node);
        case SyntaxKind.BindingElement:
            return transformNamedEvaluationOfBindingElement(context, node);
        case SyntaxKind.PropertyDeclaration:
            return transformNamedEvaluationOfPropertyDeclaration(context, node);
        case SyntaxKind.BinaryExpression:
            return transformNamedEvaluationOfAssignmentExpression(context, node);
        case SyntaxKind.ExportAssignment:
            return transformNamedEvaluationOfExportAssignment(context, node);
    }
}
