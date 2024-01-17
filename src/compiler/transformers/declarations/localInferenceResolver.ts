import {
    addRelatedInfo,
    ArrayLiteralExpression,
    ArrowFunction,
    AsExpression,
    BindingElement,
    ComputedPropertyName,
    createDiagnosticForNode,
    createPropertyNameNodeForIdentifierOrLiteral,
    Debug,
    DiagnosticMessage,
    Diagnostics,
    DiagnosticWithLocation,
    EntityNameOrEntityNameExpression,
    ExportAssignment,
    findAncestor,
    FunctionDeclaration,
    FunctionExpression,
    GetAccessorDeclaration,
    getCommentRange,
    getEmitScriptTarget,
    getMemberKeyFromElement,
    getNameOfDeclaration,
    getTextOfNode,
    HasInferredType,
    hasSyntacticModifier,
    Identifier,
    isAccessor,
    isAsExpression,
    isBinaryExpression,
    isClassExpression,
    isComputedPropertyName,
    isConstTypeReference,
    isEntityNameExpression,
    isExpandoPropertyDeclaration,
    isExportAssignment,
    isGetAccessor,
    isIdentifier,
    isInterfaceDeclaration,
    isLiteralTypeNode,
    isMethodDeclaration,
    isMethodOrAccessor,
    isNoSubstitutionTemplateLiteral,
    isNumericLiteral,
    IsolatedTransformationContext,
    isOmittedExpression,
    isOptionalDeclaration,
    isParameter,
    isParenthesizedExpression,
    isPrefixUnaryExpression,
    isPrivateIdentifier,
    isPropertyAssignment,
    isPropertyDeclaration,
    isPropertyName,
    isPropertySignature,
    isSetAccessor,
    isShorthandPropertyAssignment,
    isSpreadAssignment,
    isSpreadElement,
    isStatement,
    isStringDoubleQuoted,
    isStringLiteral,
    isStringLiteralLike,
    isThisIdentifier,
    isTypeAssertionExpression,
    isTypeLiteralNode,
    isTypeNode,
    isTypeParameterDeclaration,
    isTypeReferenceNode,
    isUnionTypeNode,
    isVariableDeclaration,
    KeywordTypeSyntaxKind,
    length,
    LiteralExpression,
    MethodDeclaration,
    ModifierFlags,
    Node,
    NodeArray,
    NodeFlags,
    nullTransformationContext,
    ObjectLiteralExpression,
    ParameterDeclaration,
    ParenthesizedExpression,
    PrefixUnaryExpression,
    PropertyDeclaration,
    PropertyName,
    PropertySignature,
    SetAccessorDeclaration,
    setCommentRange,
    setTextRange,
    ShorthandPropertyAssignment,
    SourceFile,
    SpreadAssignment,
    SpreadElement,
    Symbol,
    SyntaxKind,
    TransformationContext,
    TypeAssertion,
    TypeElement,
    TypeNode,
    unescapeLeadingUnderscores,
    VariableDeclaration,
    visitEachChild,
    visitNode,
    visitNodes,
    Visitor,
    VisitResult,
} from "../../_namespaces/ts";

const enum NarrowBehavior {
    None = 0,
    AsConst = 1,
    KeepLiterals = 2,
    AsConstOrKeepLiterals = AsConst | KeepLiterals,
    NotKeepLiterals = ~KeepLiterals,
}

const relatedSuggestionByDeclarationKind = {
    [SyntaxKind.ArrowFunction]: Diagnostics.Add_a_return_type_to_the_function_expression,
    [SyntaxKind.FunctionExpression]: Diagnostics.Add_a_return_type_to_the_function_expression,
    [SyntaxKind.MethodDeclaration]: Diagnostics.Add_a_return_type_to_the_method,
    [SyntaxKind.GetAccessor]: Diagnostics.Add_a_return_type_to_the_get_accessor_declaration,
    [SyntaxKind.SetAccessor]: Diagnostics.Add_a_type_to_parameter_of_the_set_accessor_declaration,
    [SyntaxKind.FunctionDeclaration]: Diagnostics.Add_a_return_type_to_the_function_declaration,
    [SyntaxKind.Parameter]: Diagnostics.Add_a_type_annotation_to_the_parameter_0,
    [SyntaxKind.VariableDeclaration]: Diagnostics.Add_a_type_annotation_to_the_variable_0,
    [SyntaxKind.PropertyDeclaration]: Diagnostics.Add_a_type_annotation_to_the_property_0,
    [SyntaxKind.PropertySignature]: Diagnostics.Add_a_type_annotation_to_the_property_0,
    [SyntaxKind.ExportAssignment]: Diagnostics.Move_the_expression_in_default_export_to_a_variable_and_add_a_type_annotation_to_it,
} satisfies Partial<Record<SyntaxKind, DiagnosticMessage>>;

const errorByDeclarationKind = {
    [SyntaxKind.FunctionExpression]: Diagnostics.Function_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations,
    [SyntaxKind.FunctionDeclaration]: Diagnostics.Function_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations,
    [SyntaxKind.ArrowFunction]: Diagnostics.Function_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations,
    [SyntaxKind.MethodDeclaration]: Diagnostics.Method_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations,
    [SyntaxKind.GetAccessor]: Diagnostics.At_least_one_accessor_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations,
    [SyntaxKind.SetAccessor]: Diagnostics.At_least_one_accessor_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations,
    [SyntaxKind.Parameter]: Diagnostics.Parameter_must_have_an_explicit_type_annotation_with_isolatedDeclarations,
    [SyntaxKind.VariableDeclaration]: Diagnostics.Variable_must_have_an_explicit_type_annotation_with_isolatedDeclarations,
    [SyntaxKind.PropertyDeclaration]: Diagnostics.Property_must_have_an_explicit_type_annotation_with_isolatedDeclarations,
    [SyntaxKind.PropertySignature]: Diagnostics.Property_must_have_an_explicit_type_annotation_with_isolatedDeclarations,
    [SyntaxKind.ComputedPropertyName]: Diagnostics.Computed_properties_must_be_number_or_string_literals_variables_or_dotted_expressions_with_isolatedDeclarations,
    [SyntaxKind.SpreadAssignment]: Diagnostics.Objects_that_contain_spread_assignments_can_t_be_inferred_with_isolatedDeclarations,
    [SyntaxKind.ShorthandPropertyAssignment]: Diagnostics.Objects_that_contain_shorthand_properties_can_t_be_inferred_with_isolatedDeclarations,
    [SyntaxKind.ArrayLiteralExpression]: Diagnostics.Only_const_arrays_can_be_inferred_with_isolatedDeclarations,
    [SyntaxKind.ExportAssignment]: Diagnostics.Default_exports_can_t_be_inferred_with_isolatedDeclarations,
    [SyntaxKind.SpreadElement]: Diagnostics.Arrays_with_spread_elements_can_t_inferred_with_isolatedDeclarations,
} satisfies Partial<Record<SyntaxKind, DiagnosticMessage>>;

/**
 * @internal
 */
export interface LocalType {
    typeNode: TypeNode;
    isInvalid: boolean;
}
/**
 * @internal
 */
export interface LocalInferenceResolver {
    makeInvalidType(): Node;
    fromInitializer(node: HasInferredType | ExportAssignment, type: TypeNode | undefined, sourceFile: SourceFile): LocalType;
}
/**
 * @internal
 */
export function createLocalInferenceResolver({
    setEnclosingDeclarations,
    visitDeclarationSubtree,
    checkEntityNameVisibility,
    ensureParameter,
    context,
}: {
    setEnclosingDeclarations(node: Node): Node;
    visitDeclarationSubtree(input: Node): VisitResult<Node | undefined>;
    checkEntityNameVisibility(name: EntityNameOrEntityNameExpression, container?: Node): void;
    ensureParameter(p: ParameterDeclaration): ParameterDeclaration;
    context: IsolatedTransformationContext | TransformationContext;
}): LocalInferenceResolver {
    let currentSourceFile: SourceFile;
    const options = context.getCompilerOptions();
    const resolver = context.getEmitResolver();
    Debug.assert(options.isolatedDeclarations, "createLocalInferenceResolver can only be called when isolatedDeclarations is true");
    const { factory } = context;
    let inferenceContext: { isInvalid: boolean; disableErrors: boolean; } = undefined!;
    const strictNullChecks = !!options.strict || !!options.strictNullChecks;

    return {
        fromInitializer(node: HasInferredType | ExportAssignment, type: TypeNode | undefined, sourceFile: SourceFile) {
            const oldSourceFile = currentSourceFile;
            const hasExistingContext = inferenceContext !== undefined;
            if (!hasExistingContext) {
                inferenceContext = { isInvalid: false, disableErrors: false };
            }
            currentSourceFile = sourceFile;
            try {
                const typeNode = localInferenceFromInitializer(node, type);
                return { isInvalid: inferenceContext.isInvalid, typeNode };
            }
            finally {
                currentSourceFile = oldSourceFile;
                if (!hasExistingContext) {
                    inferenceContext = undefined!;
                }
            }
        },
        makeInvalidType,
    };
    function hasParseError(node: Node) {
        return !!(node.flags & NodeFlags.ThisNodeHasError);
    }
    function reportError(node: Node, message: DiagnosticWithLocation) {
        if (inferenceContext) {
            inferenceContext.isInvalid = true;
        }
        // Do not report errors on nodes with other errors.
        if (hasParseError(node) || inferenceContext.disableErrors) return;

        context.addDiagnostic(message);
    }

    function makeInvalidType() {
        return factory.createTypeReferenceNode("invalid");
    }

    function inferAccessorType(getAccessor?: GetAccessorDeclaration, setAccessor?: SetAccessorDeclaration) {
        let getAccessorType;
        if (getAccessor?.type) {
            getAccessorType = getAccessor.type;
        }

        let setAccessorType;
        if (setAccessor) {
            const param = setAccessor.parameters.find(p => !isThisIdentifier(p.name));
            if (param?.type) {
                const parameterType = param.type;
                setAccessorType = parameterType;
            }
        }

        return { getAccessorType, setAccessorType };
    }

    function findNearestDeclaration(node: Node) {
        const result = findAncestor(node, n => isExportAssignment(n) || (isStatement(n) ? "quit" : isVariableDeclaration(n) || isPropertyDeclaration(n) || isParameter(n)));
        return result as VariableDeclaration | PropertyDeclaration | ParameterDeclaration | ExportAssignment | undefined;
    }

    function createAccessorTypeError(getAccessor: GetAccessorDeclaration | undefined, setAccessor: SetAccessorDeclaration | undefined) {
        const node = (getAccessor ?? setAccessor)!;

        const targetNode = (isSetAccessor(node) ? node.parameters[0] : node) ?? node;
        const diag = createDiagnosticForNode(targetNode, errorByDeclarationKind[node.kind]);

        if (setAccessor) {
            addRelatedInfo(diag, createDiagnosticForNode(setAccessor, relatedSuggestionByDeclarationKind[setAccessor.kind]));
        }
        if (getAccessor) {
            addRelatedInfo(diag, createDiagnosticForNode(getAccessor, relatedSuggestionByDeclarationKind[getAccessor.kind]));
        }
        return diag;
    }
    function createObjectLiteralError(node: ShorthandPropertyAssignment | SpreadAssignment | ComputedPropertyName) {
        const diag = createDiagnosticForNode(node, errorByDeclarationKind[node.kind]);
        const parentDeclaration = findNearestDeclaration(node);
        if (parentDeclaration) {
            const targetStr = isExportAssignment(parentDeclaration) ? "" : getTextOfNode(parentDeclaration.name, /*includeTrivia*/ false);
            addRelatedInfo(diag, createDiagnosticForNode(parentDeclaration, relatedSuggestionByDeclarationKind[parentDeclaration.kind], targetStr));
        }
        return diag;
    }
    function createArrayLiteralError(node: ArrayLiteralExpression | SpreadElement) {
        const diag = createDiagnosticForNode(node, errorByDeclarationKind[node.kind]);
        const parentDeclaration = findNearestDeclaration(node);
        if (parentDeclaration) {
            const targetStr = isExportAssignment(parentDeclaration) ? "" : getTextOfNode(parentDeclaration.name, /*includeTrivia*/ false);
            addRelatedInfo(diag, createDiagnosticForNode(parentDeclaration, relatedSuggestionByDeclarationKind[parentDeclaration.kind], targetStr));
        }
        return diag;
    }
    function createReturnTypeError(node: FunctionDeclaration | FunctionExpression | ArrowFunction | MethodDeclaration) {
        const diag = createDiagnosticForNode(node, errorByDeclarationKind[node.kind]);
        const parentDeclaration = findNearestDeclaration(node);
        if (parentDeclaration) {
            const targetStr = isExportAssignment(parentDeclaration) ? "" : getTextOfNode(parentDeclaration.name, /*includeTrivia*/ false);
            addRelatedInfo(diag, createDiagnosticForNode(parentDeclaration, relatedSuggestionByDeclarationKind[parentDeclaration.kind], targetStr));
        }
        addRelatedInfo(diag, createDiagnosticForNode(node, relatedSuggestionByDeclarationKind[node.kind]));
        return diag;
    }
    function createBindingElementError(node: BindingElement) {
        return createDiagnosticForNode(node, Diagnostics.Binding_elements_can_t_be_exported_directly_with_isolatedDeclarations);
    }
    function createVariableOrPropertyError(node: VariableDeclaration | PropertyDeclaration | PropertySignature) {
        const diag = createDiagnosticForNode(node, errorByDeclarationKind[node.kind]);
        const targetStr = getTextOfNode(node.name, /*includeTrivia*/ false);
        addRelatedInfo(diag, createDiagnosticForNode(node, relatedSuggestionByDeclarationKind[node.kind], targetStr));
        return diag;
    }
    function createParameterError(node: ParameterDeclaration) {
        if (isSetAccessor(node.parent)) {
            const { getAccessor, setAccessor } = resolver.getAllAccessorDeclarations(node.parent);
            return createAccessorTypeError(getAccessor, setAccessor);
        }
        const diag = createDiagnosticForNode(node, errorByDeclarationKind[node.kind]);
        const targetStr = getTextOfNode(node.name, /*includeTrivia*/ false);
        addRelatedInfo(diag, createDiagnosticForNode(node, relatedSuggestionByDeclarationKind[node.kind], targetStr));
        return diag;
    }
    function createExpressionError(node: Node) {
        const parentDeclaration = findNearestDeclaration(node);
        let diag: DiagnosticWithLocation;
        if (parentDeclaration) {
            const targetStr = isExportAssignment(parentDeclaration) ? "" : getTextOfNode(parentDeclaration.name, /*includeTrivia*/ false);
            const parent = findAncestor(node.parent, n => isExportAssignment(n) || (isStatement(n) ? "quit" : !isParenthesizedExpression(n) && !isTypeAssertionExpression(n) && !isAsExpression(n)));
            if (parentDeclaration === parent) {
                diag = createDiagnosticForNode(node, errorByDeclarationKind[parentDeclaration.kind]);
                addRelatedInfo(diag, createDiagnosticForNode(parentDeclaration, relatedSuggestionByDeclarationKind[parentDeclaration.kind], targetStr));
            }
            else {
                diag = createDiagnosticForNode(node, Diagnostics.Expression_type_can_t_be_inferred_with_isolatedDeclarations);
                addRelatedInfo(diag, createDiagnosticForNode(parentDeclaration, relatedSuggestionByDeclarationKind[parentDeclaration.kind], targetStr));
                addRelatedInfo(diag, createDiagnosticForNode(node, Diagnostics.Add_a_type_assertion_to_this_expression_to_make_type_type_explicit));
            }
        }
        else {
            diag = createDiagnosticForNode(node, Diagnostics.Expression_type_can_t_be_inferred_with_isolatedDeclarations);
        }
        return diag;
    }
    function localInference(node: Node, inferenceFlags: NarrowBehavior = NarrowBehavior.None): TypeNode {
        switch (node.kind) {
            case SyntaxKind.ParenthesizedExpression:
                return localInference((node as ParenthesizedExpression).expression, inferenceFlags & NarrowBehavior.NotKeepLiterals);
            case SyntaxKind.Identifier: {
                if ((node as Identifier).escapedText === "undefined") {
                    return createUndefinedTypeNode();
                }
                break;
            }
            case SyntaxKind.NullKeyword:
                if (strictNullChecks) {
                    return factory.createLiteralTypeNode(factory.createNull());
                }
                else {
                    return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
                }
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.FunctionExpression:
                const fnNode = node as FunctionExpression | ArrowFunction;
                const oldEnclosingDeclaration = setEnclosingDeclarations(node);
                try {
                    const returnType = !fnNode.type ? invalid(fnNode, createReturnTypeError(fnNode)) :
                        visitTypeAndClone(fnNode.type);
                    const fnTypeNode = factory.createFunctionTypeNode(
                        visitNodes(fnNode.typeParameters, visitDeclarationSubtree, isTypeParameterDeclaration)?.map(deepClone),
                        fnNode.parameters.map(p => deepClone(ensureParameter(p))),
                        returnType,
                    );
                    return fnTypeNode;
                }
                finally {
                    setEnclosingDeclarations(oldEnclosingDeclaration);
                }
            case SyntaxKind.TypeAssertionExpression:
            case SyntaxKind.AsExpression:
                const asExpression = node as AsExpression | TypeAssertion;
                if (isTypeReferenceNode(asExpression.type) && isConstTypeReference(asExpression.type)) {
                    return localInference(asExpression.expression, NarrowBehavior.AsConst);
                }
                else {
                    const type = asExpression.type;
                    if (
                        isLiteralTypeNode(type) &&
                        (isNoSubstitutionTemplateLiteral(type.literal) || isStringLiteral(type.literal))
                    ) {
                        return factory.createLiteralTypeNode(
                            normalizeLiteralValue(type.literal),
                        );
                    }

                    return visitTypeAndClone(type);
                }
            case SyntaxKind.PrefixUnaryExpression:
                const prefixOp = node as PrefixUnaryExpression;
                if (prefixOp.operator === SyntaxKind.MinusToken || prefixOp.operator === SyntaxKind.PlusToken) {
                    if (NarrowBehavior.AsConstOrKeepLiterals & inferenceFlags) {
                        switch (prefixOp.operand.kind) {
                            case SyntaxKind.NumericLiteral:
                                switch (prefixOp.operator) {
                                    case SyntaxKind.MinusToken:
                                        return factory.createLiteralTypeNode(deepClone(prefixOp));
                                    case SyntaxKind.PlusToken:
                                        return factory.createLiteralTypeNode(deepClone(prefixOp.operand as LiteralExpression));
                                }
                                break;
                            case SyntaxKind.BigIntLiteral:
                                if (prefixOp.operator === SyntaxKind.MinusToken) {
                                    return factory.createLiteralTypeNode(deepClone(prefixOp));
                                }
                        }
                    }

                    if (prefixOp.operator === SyntaxKind.PlusToken) {
                        return factory.createKeywordTypeNode(SyntaxKind.NumberKeyword);
                    }
                    else if (prefixOp.operator === SyntaxKind.MinusToken) {
                        return prefixOp.operand.kind === SyntaxKind.BigIntLiteral ?
                            factory.createKeywordTypeNode(SyntaxKind.BigIntKeyword) :
                            factory.createKeywordTypeNode(SyntaxKind.NumberKeyword);
                    }
                }
                break;
            case SyntaxKind.NumericLiteral:
                return literal(node, SyntaxKind.NumberKeyword, inferenceFlags);
            case SyntaxKind.TemplateExpression:
                if (!(inferenceFlags & NarrowBehavior.AsConst)) {
                    return factory.createKeywordTypeNode(SyntaxKind.StringKeyword);
                }
                break;
            case SyntaxKind.NoSubstitutionTemplateLiteral:
            case SyntaxKind.StringLiteral:
                return literal(node, SyntaxKind.StringKeyword, inferenceFlags);
            case SyntaxKind.BigIntLiteral:
                return literal(node, SyntaxKind.BigIntKeyword, inferenceFlags);
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.FalseKeyword:
                return literal(node, SyntaxKind.BooleanKeyword, inferenceFlags);
            case SyntaxKind.ArrayLiteralExpression:
                const arrayLiteral = node as ArrayLiteralExpression;

                if (!(inferenceFlags & NarrowBehavior.AsConst)) {
                    return invalid(node, createArrayLiteralError(arrayLiteral));
                }
                const elementTypesInfo: TypeNode[] = [];
                for (const element of arrayLiteral.elements) {
                    if (isSpreadElement(element)) {
                        return invalid(element, createArrayLiteralError(element));
                    }
                    else if (isOmittedExpression(element)) {
                        elementTypesInfo.push(
                            createUndefinedTypeNode(),
                        );
                    }
                    else {
                        const elementType = localInference(element, inferenceFlags & NarrowBehavior.NotKeepLiterals);
                        elementTypesInfo.push(elementType);
                    }
                }
                const tupleType = factory.createTupleTypeNode(elementTypesInfo);
                tupleType.emitNode = { flags: 1, autoGenerate: undefined, internalFlags: 0 };
                return factory.createTypeOperatorNode(SyntaxKind.ReadonlyKeyword, tupleType);
            case SyntaxKind.ObjectLiteralExpression:
                try {
                    return getTypeForObjectLiteralExpression(node as ObjectLiteralExpression, inferenceFlags);
                }
                finally {
                    inferenceContext.disableErrors = false;
                }
        }

        return invalid(node, createExpressionError(node));
    }
    function invalid(sourceNode: Node, diagMessage: DiagnosticWithLocation): TypeNode {
        reportError(sourceNode, diagMessage);
        return makeInvalidType();
    }
    function getTypeForObjectLiteralExpression(objectLiteral: ObjectLiteralExpression, inferenceFlags: NarrowBehavior) {
        const properties: TypeElement[] = [];
        const members = new Map<Symbol, number>();
        for (let propIndex = 0, length = objectLiteral.properties.length; propIndex < length; propIndex++) {
            const prop = objectLiteral.properties[propIndex];
            if (isShorthandPropertyAssignment(prop)) {
                reportError(prop, createObjectLiteralError(prop));
                continue;
            }
            else if (isSpreadAssignment(prop)) {
                reportError(prop, createObjectLiteralError(prop));
                continue;
            }
            inferenceContext.disableErrors = hasParseError(prop.name) || hasParseError(prop);
            if (inferenceContext.disableErrors) {
                inferenceContext.isInvalid = true;
            }

            if (isPrivateIdentifier(prop.name)) {
                inferenceContext.isInvalid = true;
                // Not valid in object literals but the compiler will complain about this, we just ignore it here.
                continue;
            }
            if (isComputedPropertyName(prop.name)) {
                if (!resolver.isLiteralComputedName(prop.name)) {
                    reportError(prop.name, createObjectLiteralError(prop.name));
                }
                else if (isEntityNameExpression(prop.name.expression)) {
                    checkEntityNameVisibility(prop.name.expression, prop);
                }
            }

            const nameKey = getMemberKeyFromElement(prop);
            const name = normalizePropertyName(prop.symbol, isMethodDeclaration(prop)) ??
                deepClone(visitNode(prop.name, visitDeclarationSubtree, isPropertyName)!);

            let newProp;
            if (isMethodDeclaration(prop)) {
                newProp = handleMethodDeclaration(prop, name, inferenceFlags);
            }
            else if (isPropertyAssignment(prop)) {
                const modifiers = inferenceFlags & NarrowBehavior.AsConst ?
                    [factory.createModifier(SyntaxKind.ReadonlyKeyword)] :
                    [];
                const typeNode = localInference(prop.initializer, inferenceFlags & NarrowBehavior.NotKeepLiterals);
                newProp = factory.createPropertySignature(
                    modifiers,
                    name,
                    /*questionToken*/ undefined,
                    typeNode,
                );
            }
            else {
                newProp = handleAccessors(prop);
            }

            if (newProp) {
                const commentRange = getCommentRange(prop);
                setCommentRange(newProp, {
                    pos: commentRange.pos,
                    end: newProp.name.end,
                });

                if (nameKey) {
                    Debug.assertSymbolValid(prop.symbol);
                    const exitingIndex = members.get(prop.symbol);
                    if (exitingIndex !== undefined && !isMethodOrAccessor(prop)) {
                        properties[exitingIndex] = newProp;
                    }
                    else {
                        members.set(prop.symbol, properties.length);
                        properties.push(newProp);
                    }
                }
                else {
                    properties.push(newProp);
                }
            }
        }

        return inferenceContext.isInvalid ? makeInvalidType() : factory.createTypeLiteralNode(properties);
    }

    function handleMethodDeclaration(method: MethodDeclaration, name: PropertyName, inferenceFlags: NarrowBehavior) {
        const oldEnclosingDeclaration = setEnclosingDeclarations(method);
        try {
            const returnType = method.type === undefined ?
                invalid(method, createReturnTypeError(method)) :
                visitTypeAndClone(method.type);
            const typeParameters = visitNodes(method.typeParameters, visitDeclarationSubtree, isTypeParameterDeclaration)?.map(deepClone);
            const parameters = method.parameters.map(p => deepClone(ensureParameter(p)));
            if (inferenceFlags & NarrowBehavior.AsConst) {
                return factory.createPropertySignature(
                    [factory.createModifier(SyntaxKind.ReadonlyKeyword)],
                    name,
                    /*questionToken*/ undefined,
                    factory.createFunctionTypeNode(
                        typeParameters,
                        parameters,
                        returnType,
                    ),
                );
            }
            else {
                return factory.createMethodSignature(
                    [],
                    name,
                    /*questionToken*/ undefined,
                    typeParameters,
                    parameters,
                    returnType,
                );
            }
        }
        finally {
            setEnclosingDeclarations(oldEnclosingDeclaration);
        }
    }

    function handleAccessors(accessor: GetAccessorDeclaration | SetAccessorDeclaration) {
        const { getAccessor, setAccessor, firstAccessor } = resolver.getAllAccessorDeclarations(accessor);
        const accessorType = inferAccessorType(getAccessor, setAccessor);
        // We have types for both accessors, we can't know if they are the same type so we keep both accessors
        if (accessorType.getAccessorType !== undefined && accessorType.setAccessorType !== undefined) {
            const parameters = accessor.parameters.map(p => deepClone(ensureParameter(p)));

            if (isGetAccessor(accessor)) {
                return factory.createGetAccessorDeclaration(
                    [],
                    accessor.name,
                    parameters,
                    visitTypeAndClone(accessorType.getAccessorType),
                    /*body*/ undefined,
                );
            }
            else {
                return factory.createSetAccessorDeclaration(
                    [],
                    accessor.name,
                    parameters,
                    /*body*/ undefined,
                );
            }
        }
        else if (firstAccessor === accessor) {
            const foundType = accessorType.getAccessorType ?? accessorType.setAccessorType;
            const propertyType = foundType === undefined ?
                invalid(accessor, createAccessorTypeError(getAccessor, setAccessor)) :
                visitTypeAndClone(foundType);
            return factory.createPropertySignature(
                setAccessor === undefined ? [factory.createModifier(SyntaxKind.ReadonlyKeyword)] : [],
                accessor.name,
                /*questionToken*/ undefined,
                propertyType,
            );
        }
    }

    function normalizeLiteralValue(literal: LiteralExpression) {
        switch (literal.kind) {
            case SyntaxKind.BigIntLiteral:
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.FalseKeyword:
                return deepClone(literal);
            case SyntaxKind.NoSubstitutionTemplateLiteral:
            case SyntaxKind.StringLiteral:
                return factory.createStringLiteral(literal.text);
            case SyntaxKind.NumericLiteral:
                return factory.createNumericLiteral(+literal.text);
        }
        throw new Error("Not supported");
    }
    function createUndefinedTypeNode() {
        if (strictNullChecks) {
            return factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword);
        }
        else {
            return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
        }
    }
    function literal(node: Node, baseType: string | KeywordTypeSyntaxKind, narrowBehavior: NarrowBehavior) {
        if (narrowBehavior & NarrowBehavior.AsConstOrKeepLiterals) {
            return factory.createLiteralTypeNode(
                normalizeLiteralValue(node as LiteralExpression),
            );
        }
        else {
            return typeof baseType === "number" ? factory.createKeywordTypeNode(baseType) : factory.createTypeReferenceNode(baseType);
        }
    }

    function visitTypeAndClone(type: TypeNode) {
        const visitedType = visitNode(type, visitDeclarationSubtree, isTypeNode)!;
        return deepClone(visitedType);
    }

    function normalizePropertyName(symbol: Symbol, isMethod: boolean) {
        let nameText;
        Debug.assertSymbolValid(symbol);
        Debug.assert(symbol.declarations !== undefined, "Symbol has no declarations");
        let stringNamed = !!length(symbol.declarations);
        let singleQuote = stringNamed;
        for (const declaration of symbol.declarations) {
            const name = getNameOfDeclaration(declaration);
            if (!name) {
                stringNamed = false;
                continue;
            }
            const actualName = isComputedPropertyName(name) ? name.expression : name;
            if (isStringLiteralLike(actualName)) {
                nameText = actualName.text;
                singleQuote &&= !isStringDoubleQuoted(actualName, currentSourceFile);
                continue;
            }
            stringNamed = false;
            singleQuote = false;
            if (isIdentifier(actualName)) {
                if (actualName !== name) return undefined;
                nameText = unescapeLeadingUnderscores(actualName.escapedText);
            }
            else if (isNumericLiteral(actualName)) {
                nameText = actualName.text;
            }
            else if (
                isPrefixUnaryExpression(actualName)
                && isNumericLiteral(actualName.operand)
            ) {
                if (actualName.operator === SyntaxKind.PlusToken) {
                    nameText = actualName.operand.text;
                }
            }
        }

        if (nameText === undefined) {
            return undefined;
        }

        return createPropertyNameNodeForIdentifierOrLiteral(
            nameText,
            getEmitScriptTarget(options),
            singleQuote,
            stringNamed,
            isMethod,
        );
    }

    function deepClone<T extends Node>(node: T): T {
        const clonedNode = visitEachChild(node, deepClone, nullTransformationContext, deepCloneNodes);
        // If node has children visitEachChild will already return a new node
        if (clonedNode !== node) {
            return clonedNode;
        }
        return setTextRange(factory.cloneNode(node), node);

        function deepCloneNodes(
            nodes: NodeArray<Node> | undefined,
            visitor: Visitor,
            test?: (node: Node) => boolean,
            start?: number,
            count?: number,
        ): NodeArray<Node> | undefined {
            if (nodes && nodes.length === 0) {
                // Ensure we explicitly make a copy of an empty array; visitNodes will not do this unless the array has elements,
                // which can lead to us reusing the same empty NodeArray more than once within the same AST during type noding.
                return setTextRange(factory.createNodeArray(/*elements*/ undefined, nodes.hasTrailingComma), nodes);
            }
            return visitNodes(nodes, visitor, test, start, count);
        }
    }

    function addUndefinedInUnion(type: TypeNode) {
        if (isUnionTypeNode(type)) {
            const hasUndefined = type.types.some(p => p.kind === SyntaxKind.UndefinedKeyword);
            if (hasUndefined) return type;

            return factory.createUnionTypeNode([
                ...type.types,
                factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword),
            ]);
        }
        return factory.createUnionTypeNode([
            type,
            factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword),
        ]);
    }
    function localInferenceFromInitializer(node: HasInferredType | ExportAssignment, type: TypeNode | undefined): TypeNode {
        if (isParameter(node)) {
            let localType: TypeNode;

            if (type) {
                localType = visitNode(type, visitDeclarationSubtree, isTypeNode)!;
            }
            // We do not support inferring to binding patterns
            // Binding patterns can add properties and default values in the pattern also complicate inference as we have two sources for the property type.
            else if (node.initializer && isIdentifier(node.name)) {
                localType = localInference(node.initializer);
            }
            else {
                localType = invalid(node, createParameterError(node));
            }

            if (strictNullChecks && !inferenceContext.isInvalid) {
                const isOptional = resolver.isOptionalParameter(node);
                /**
                 * If a parameter with a default value is not optional we need to add undefined
                 * function x(o = "", v: string)
                 */
                if (node.initializer && !isOptional) {
                    localType = addUndefinedInUnion(localType);
                }
                /**
                 * Constructor properties that are optional must have | undefined included to work well with exactOptionalPropertyTypes
                 * constructor(public x?: number) -> x?: number | undefined
                 */
                if (isOptional && !node.initializer && hasSyntacticModifier(node, ModifierFlags.ParameterPropertyModifier)) {
                    localType = addUndefinedInUnion(localType);
                }
            }
            return localType;
        }
        else if (isExportAssignment(node)) {
            return localInference(node.expression, NarrowBehavior.KeepLiterals);
        }
        else if (isVariableDeclaration(node)) {
            Debug.assertSymbolValid(node.symbol);
            const firstDeclaration = node.symbol.valueDeclaration;
            // Use first declaration of variable for the type
            if (node !== firstDeclaration && firstDeclaration && isVariableDeclaration(firstDeclaration)) {
                node = firstDeclaration;
                type = type ?? firstDeclaration.type;
            }
            if (type) {
                return visitNode(type, visitDeclarationSubtree, isTypeNode)!;
            }
            else if (node.initializer) {
                if (isClassExpression(node.initializer)) {
                    return invalid(node.initializer, createDiagnosticForNode(node.initializer, Diagnostics.Inference_from_class_expressions_is_not_supported_with_isolatedDeclarations));
                }
                else {
                    if (resolver.isExpandoFunction(node)) {
                        resolver.getPropertiesOfContainerFunction(node)
                            .forEach(p => {
                                if (isExpandoPropertyDeclaration(p.valueDeclaration)) {
                                    const errorTarget = isBinaryExpression(p.valueDeclaration) ?
                                        p.valueDeclaration.left :
                                        p.valueDeclaration;

                                    reportError(
                                        errorTarget,
                                        createDiagnosticForNode(
                                            errorTarget,
                                            Diagnostics.Assigning_properties_to_functions_without_declaring_them_is_not_supported_with_isolatedDeclarations_Add_an_explicit_declaration_for_the_properties_assigned_to_this_function,
                                        ),
                                    );
                                }
                            });
                    }
                    return localInference(node.initializer, node.parent.flags & NodeFlags.Const ? NarrowBehavior.KeepLiterals : NarrowBehavior.None);
                }
            }
            else {
                return invalid(node, createVariableOrPropertyError(node));
            }
        }
        else if (type) {
            return visitNode(type, visitDeclarationSubtree, isTypeNode)!;
        }
        else if (isPropertyDeclaration(node) || isPropertySignature(node)) {
            if (node.initializer) {
                let localType = localInference(node.initializer);
                if (isOptionalDeclaration(node)) {
                    localType = addUndefinedInUnion(localType);
                }
                return localType;
            }
            else if (isInterfaceDeclaration(node.parent) || isTypeLiteralNode(node.parent)) {
                return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
            }
            else {
                return invalid(node, createVariableOrPropertyError(node));
            }
        }
        else if (isAccessor(node)) {
            const { getAccessor, setAccessor } = resolver.getAllAccessorDeclarations(node);
            const accessorType = inferAccessorType(getAccessor, setAccessor);
            const type = accessorType.getAccessorType ?? accessorType.setAccessorType;
            return type ?? invalid(node, createAccessorTypeError(getAccessor, setAccessor));
        }
        else {
            if (isInterfaceDeclaration(node.parent) || isTypeLiteralNode(node.parent)) {
                return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
            }
            switch (node.kind) {
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.FunctionDeclaration:
                    return invalid(node, createReturnTypeError(node));

                case SyntaxKind.BindingElement:
                    const parentDeclaration = findNearestDeclaration(node);
                    if (parentDeclaration && isVariableDeclaration(parentDeclaration)) {
                        return invalid(node, createBindingElementError(node));
                    }
                    else {
                        // Syntactically invalid. We don't report errors, just mark it as invalid.
                        inferenceContext.isInvalid = true;
                        return makeInvalidType();
                    }
                default:
                    return invalid(node, createDiagnosticForNode(node, Diagnostics.Expression_type_can_t_be_inferred_with_isolatedDeclarations));
            }
        }
    }
}
