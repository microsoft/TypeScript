import {
    ArrayLiteralExpression,
    ArrowFunction,
    AsExpression,
    createDiagnosticForNode,
    createPropertyNameNodeForIdentifierOrLiteral,
    Debug,
    DiagnosticMessage,
    Diagnostics,
    EntityNameOrEntityNameExpression,
    ExportAssignment,
    FunctionExpression,
    GetAccessorDeclaration,
    getCommentRange,
    getEmitScriptTarget,
    getMemberKeyFromElement,
    getNameOfDeclaration,
    HasInferredType,
    hasSyntacticModifier,
    Identifier,
    isClassExpression,
    isComputedPropertyName,
    isConstTypeReference,
    isEntityNameExpression,
    isExportAssignment,
    isGetAccessor,
    isIdentifier,
    isInterfaceDeclaration,
    isLiteralTypeNode,
    isMethodDeclaration,
    isMethodOrAccessor,
    isNoSubstitutionTemplateLiteral,
    isNumericLiteral,
    isOmittedExpression,
    isOptionalDeclaration,
    isParameter,
    isPrefixUnaryExpression,
    isPrivateIdentifier,
    isPropertyAssignment,
    isPropertyDeclaration,
    isPropertyName,
    isShorthandPropertyAssignment,
    isSpreadAssignment,
    isSpreadElement,
    isStringDoubleQuoted,
    isStringLiteral,
    isStringLiteralLike,
    isThisIdentifier,
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
    PropertyName,
    SetAccessorDeclaration,
    setCommentRange,
    setTextRange,
    SourceFile,
    Symbol,
    SyntaxKind,
    TransformationContext,
    TypeAssertion,
    TypeElement,
    TypeNode,
    unescapeLeadingUnderscores,
    visitEachChild,
    visitNode,
    visitNodes,
    Visitor,
    VisitResult,
} from "../../_namespaces/ts";

enum NarrowBehavior {
    None = 0,
    AsConst = 1,
    KeepLiterals = 2,
    AsConstOrKeepLiterals = AsConst | KeepLiterals,
    NotKeepLiterals = ~KeepLiterals,
}

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
    context: TransformationContext;
}): { resolver: LocalInferenceResolver; isolatedDeclarations: true; } | { resolver: undefined; isolatedDeclarations: false; } {
    let currentSourceFile: SourceFile;
    const options = context.getCompilerOptions();
    const resolver = context.getEmitResolver();
    if (!options.isolatedDeclarations) {
        return { resolver: undefined, isolatedDeclarations: false };
    }
    const { factory } = context;
    let inferenceContext: { isInvalid: boolean; disableErrors: boolean; } = undefined!;
    const strictNullChecks = !!options.strict || !!options.strictNullChecks;

    return {
        resolver: {
            fromInitializer(node: HasInferredType | ExportAssignment, type: TypeNode | undefined, sourceFile: SourceFile) {
                const oldSourceFile = currentSourceFile;
                const hasExistingContext = inferenceContext !== undefined;
                if (!hasExistingContext) {
                    inferenceContext = { isInvalid: false, disableErrors: false };
                }
                currentSourceFile = sourceFile;
                try {
                    const typeNode = localInferenceFromInitializer(node, type);
                    if (typeNode !== undefined) {
                        return { isInvalid: inferenceContext.isInvalid, typeNode };
                    }
                    return { isInvalid: true, typeNode: invalid(node) };
                }
                finally {
                    currentSourceFile = oldSourceFile;
                    if (!hasExistingContext) {
                        inferenceContext = undefined!;
                    }
                }
            },
            makeInvalidType,
        },
        isolatedDeclarations: options.isolatedDeclarations,
    };
    function hasParseError(node: Node) {
        return !!(node.flags & NodeFlags.ThisNodeHasError);
    }
    function reportIsolatedDeclarationError(node: Node, diagMessage: DiagnosticMessage = Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit) {
        if (inferenceContext) {
            inferenceContext.isInvalid = true;
        }
        // Do not report errors on nodes with other errors.
        if (hasParseError(node) || inferenceContext.disableErrors) return;
        const message = createDiagnosticForNode(
            node,
            diagMessage,
        );
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
                    const returnType = visitTypeAndClone(fnNode.type, fnNode);
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

                    return visitTypeAndClone(type, asExpression);
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
                return invalid(node);
            case SyntaxKind.NoSubstitutionTemplateLiteral:
            case SyntaxKind.StringLiteral:
                return literal(node, SyntaxKind.StringKeyword, inferenceFlags);
            case SyntaxKind.BigIntLiteral:
                return literal(node, SyntaxKind.BigIntKeyword, inferenceFlags);
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.FalseKeyword:
                return literal(node, SyntaxKind.BooleanKeyword, inferenceFlags);
            case SyntaxKind.ArrayLiteralExpression:
                if (!(inferenceFlags & NarrowBehavior.AsConst)) {
                    return invalid(node);
                }
                const arrayLiteral = node as ArrayLiteralExpression;
                const elementTypesInfo: TypeNode[] = [];
                for (const element of arrayLiteral.elements) {
                    if (isSpreadElement(element)) {
                        return invalid(element);
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

        return invalid(node);
    }
    function invalid(sourceNode: Node, diagMessage = Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit): TypeNode {
        reportIsolatedDeclarationError(sourceNode, diagMessage);
        return makeInvalidType();
    }
    function getTypeForObjectLiteralExpression(objectLiteral: ObjectLiteralExpression, inferenceFlags: NarrowBehavior) {
        const properties: TypeElement[] = [];
        const members = new Map<Symbol, number>();
        for (let propIndex = 0, length = objectLiteral.properties.length; propIndex < length; propIndex++) {
            const prop = objectLiteral.properties[propIndex];
            if (isShorthandPropertyAssignment(prop)) {
                reportIsolatedDeclarationError(prop);
                continue;
            }
            else if (isSpreadAssignment(prop)) {
                reportIsolatedDeclarationError(prop);
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
                    reportIsolatedDeclarationError(prop.name);
                    continue;
                }
                if (isEntityNameExpression(prop.name.expression)) {
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
                newProp = handleAccessors(prop, name, nameKey);
            }

            if (newProp) {
                const commentRange = getCommentRange(prop);
                setCommentRange(newProp, {
                    pos: commentRange.pos,
                    end: newProp.name.end,
                });

                if (nameKey) {
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
            const returnType = visitTypeAndClone(method.type, method);
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

    function handleAccessors(accessor: GetAccessorDeclaration | SetAccessorDeclaration, name: PropertyName, nameKey: string | undefined) {
        if (!nameKey) {
            return;
        }

        const { getAccessor, setAccessor, firstAccessor } = resolver.getAllAccessorDeclarations(accessor);
        const accessorType = inferAccessorType(getAccessor, setAccessor);
        // We have types for both accessors, we can't know if they are the same type so we keep both accessors
        if (accessorType.getAccessorType !== undefined && accessorType.setAccessorType !== undefined) {
            const parameters = accessor.parameters.map(p => deepClone(ensureParameter(p)));

            if (isGetAccessor(accessor)) {
                return factory.createGetAccessorDeclaration(
                    [],
                    name,
                    parameters,
                    visitTypeAndClone(accessor.type, accessor),
                    /*body*/ undefined,
                );
            }
            else {
                return factory.createSetAccessorDeclaration(
                    [],
                    name,
                    parameters,
                    /*body*/ undefined,
                );
            }
        }
        else if (firstAccessor === accessor) {
            const type = accessorType.getAccessorType ?? accessorType.setAccessorType;
            return factory.createPropertySignature(
                setAccessor === undefined ? [factory.createModifier(SyntaxKind.ReadonlyKeyword)] : [],
                name,
                /*questionToken*/ undefined,
                visitTypeAndClone(type, accessor),
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

    function visitTypeAndClone(type: TypeNode | undefined, owner: Node) {
        const visitedType = visitNode(type, visitDeclarationSubtree, isTypeNode);
        if (!visitedType) return invalid(owner);
        return deepClone(visitedType);
    }

    function normalizePropertyName(symbol: Symbol, isMethod: boolean) {
        let nameText;
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

    // Copied similar function in checker. Maybe a reusable one should be created.
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
    function localInferenceFromInitializer(node: HasInferredType | ExportAssignment, type: TypeNode | undefined): TypeNode | undefined {
        let localType: TypeNode | undefined;
        if (isParameter(node)) {
            if (type) {
                localType = visitNode(type, visitDeclarationSubtree, isTypeNode)!;
            }
            // We do not support inferring to binding patterns
            // Binding patterns can add properties and default values in the pattern also complicate inference as we have two sources for the property type.
            else if (node.initializer && isIdentifier(node.name)) {
                localType = localInference(node.initializer);
            }
            else {
                localType = invalid(node);
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
        }
        else if (isExportAssignment(node)) {
            localType = localInference(node.expression, NarrowBehavior.KeepLiterals);
        }
        else if (isVariableDeclaration(node)) {
            const firstDeclaration = node.symbol.valueDeclaration;
            // Use first declaration of variable for the type
            if (node !== firstDeclaration && firstDeclaration && isVariableDeclaration(firstDeclaration)) {
                node = firstDeclaration;
                type = type ?? firstDeclaration.type;
            }
            if (type) {
                localType = visitNode(type, visitDeclarationSubtree, isTypeNode)!;
            }
            else if (node.initializer) {
                if (resolver.isExpandoFunction(node)) {
                    context.addDiagnostic(createDiagnosticForNode(
                        node,
                        Diagnostics.Assigning_properties_to_functions_without_declaring_them_is_not_supported_with_isolatedDeclarations_Add_an_explicit_declaration_for_the_properties_assigned_to_this_function,
                    ));
                    localType = invalid(node);
                }
                else if (isClassExpression(node.initializer)) {
                    localType = invalid(node.initializer, Diagnostics.Declaration_emit_for_class_expressions_are_not_supported_with_isolatedDeclarations);
                }
                else {
                    localType = localInference(node.initializer, node.parent.flags & NodeFlags.Const ? NarrowBehavior.KeepLiterals : NarrowBehavior.None);
                }
            }
        }
        else if (type) {
            return visitNode(type, visitDeclarationSubtree, isTypeNode);
        }
        else if (isPropertyDeclaration(node) && node.initializer) {
            localType = localInference(node.initializer);
            if (isOptionalDeclaration(node)) {
                localType = addUndefinedInUnion(localType);
            }
        }
        else if (isInterfaceDeclaration(node.parent) || isTypeLiteralNode(node.parent)) {
            return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
        }
        else {
            reportIsolatedDeclarationError(node);
        }
        return localType;
    }
}
