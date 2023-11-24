import {
    getCommentRange,
    setCommentRange,
} from "../../_namespaces/ts";
import {
    Diagnostics,
} from "../../diagnosticInformationMap.generated";
import {
    isClassExpression,
    isComputedPropertyName,
    isExportAssignment,
    isGetAccessorDeclaration,
    isIdentifier,
    isInterfaceDeclaration,
    isLiteralTypeNode,
    isMethodDeclaration,
    isNoSubstitutionTemplateLiteral,
    isNumericLiteral,
    isOmittedExpression,
    isParameter,
    isPrefixUnaryExpression,
    isPrivateIdentifier,
    isPropertyAccessExpression,
    isPropertyAssignment,
    isPropertyDeclaration,
    isSetAccessorDeclaration,
    isShorthandPropertyAssignment,
    isSpreadAssignment,
    isSpreadElement,
    isStringLiteral,
    isTypeLiteralNode,
    isTypeParameterDeclaration,
    isTypeReferenceNode,
    isUnionTypeNode,
    isVariableDeclaration,
} from "../../factory/nodeTests";
import {
    setTextRange,
} from "../../factory/utilitiesPublic";
import {
    isIdentifierText,
} from "../../scanner";
import {
    nullTransformationContext,
} from "../../transformer";
import {
    ArrayLiteralExpression,
    ArrowFunction,
    AsExpression,
    ClassExpression,
    DiagnosticMessage,
    EntityNameOrEntityNameExpression,
    ExportAssignment,
    Expression,
    FunctionExpression,
    GetAccessorDeclaration,
    HasInferredType,
    Identifier,
    KeywordTypeSyntaxKind,
    LanguageVariant,
    LiteralExpression,
    MethodDeclaration,
    MethodSignature,
    ModifierFlags,
    Node,
    NodeArray,
    NodeFlags,
    ObjectLiteralExpression,
    ParameterDeclaration,
    ParenthesizedExpression,
    PrefixUnaryExpression,
    PropertyAssignment,
    PropertyName,
    PropertySignature,
    SetAccessorDeclaration,
    SourceFile,
    SyntaxKind,
    TransformationContext,
    TypeAssertion,
    TypeElement,
    TypeNode,
    Visitor,
    VisitResult,
} from "../../types";
import {
    createDiagnosticForNode,
    hasSyntacticModifier,
    isEntityNameExpression,
    isOptionalDeclaration,
} from "../../utilities";
import {
    isConstTypeReference,
    isPropertyName,
    isTypeNode,
} from "../../utilitiesPublic";
import {
    visitEachChild,
    visitNode,
    visitNodes,
} from "../../visitorPublic";

enum NarrowBehavior {
    None = 0,
    AsConst = 1,
    KeepLiterals = 2,
    AsConstOrKeepLiterals = AsConst | KeepLiterals,
    NotKeepLiterals = ~KeepLiterals,
}

enum LocalTypeInfoFlags {
    None = 0,
    Invalid = 1 << 1,
}
/**
 * @internal
 */
export interface LocalInferenceResolver {
    makeInvalidType(): Node;
    fromInitializer(node: HasInferredType | ExportAssignment, type: TypeNode | undefined, sourceFile: SourceFile): TypeNode;
}
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
    const strictNullChecks = !!options.strict || !!options.strictNullChecks;

    return {
        resolver: {
            fromInitializer(node: HasInferredType, type: TypeNode | undefined, sourceFile: SourceFile) {
                const oldSourceFile = currentSourceFile;
                currentSourceFile = sourceFile;
                try {
                    const localType = localInferenceFromInitializer(node, type);
                    if (localType !== undefined) {
                        return localType;
                    }
                    if (type) {
                        return visitNode(type, visitDeclarationSubtree, isTypeNode)!;
                    }
                    return makeInvalidType();
                }
                finally {
                    currentSourceFile = oldSourceFile;
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
        // Do not report errors on nodes with other errors.
        if (hasParseError(node)) return;
        const message = createDiagnosticForNode(
            node,
            diagMessage,
        );
        context.addDiagnostic(message);
    }

    function makeInvalidType() {
        return factory.createTypeReferenceNode("invalid");
    }

    interface LocalTypeInfo {
        typeNode: TypeNode;
        sourceNode: Node;
        flags: LocalTypeInfoFlags;
    }

    function getAccessorInfo(parent: ClassExpression | ObjectLiteralExpression, knownAccessor: SetAccessorDeclaration | GetAccessorDeclaration) {
        const nameKey = getMemberKey(knownAccessor);
        const members = isClassExpression(parent) ? parent.members : parent.properties;
        let getAccessor, setAccessor;
        let otherAccessorIdx = -1, knownAccessorIdx = -1;
        for (let i = 0; i < members.length; ++i) {
            const member = members[i];
            if (isGetAccessorDeclaration(member) && getMemberKey(member) === nameKey) {
                getAccessor = member;
                if (knownAccessor !== member) {
                    otherAccessorIdx = i;
                }
                else {
                    knownAccessorIdx = i;
                }
            }
            else if (isSetAccessorDeclaration(member) && getMemberKey(member) === nameKey) {
                setAccessor = member;
                if (knownAccessor !== member) {
                    otherAccessorIdx = i;
                }
                else {
                    knownAccessorIdx = i;
                }
            }
        }

        return {
            getAccessor,
            setAccessor,
            otherAccessorIdx,
            knownAccessorIdx,
        };
    }
    function inferAccessorType(getAccessor?: GetAccessorDeclaration, setAccessor?: SetAccessorDeclaration): LocalTypeInfo {
        if (getAccessor?.type) {
            return visitTypeAndClone(getAccessor.type, getAccessor);
        }

        if (setAccessor && setAccessor.parameters[0]?.type) {
            const parameterType = setAccessor.parameters[0].type;
            return visitTypeAndClone(parameterType, setAccessor);
        }

        return invalid(getAccessor ?? setAccessor!);
    }
    function localInference(node: Node, inferenceFlags: NarrowBehavior = NarrowBehavior.None): LocalTypeInfo {
        switch (node.kind) {
            case SyntaxKind.ParenthesizedExpression:
                return localInference((node as ParenthesizedExpression).expression, inferenceFlags & NarrowBehavior.NotKeepLiterals);
            case SyntaxKind.Identifier: {
                if ((node as Identifier).escapedText === "undefined") {
                    return createUndefinedTypeNode(node);
                }
                break;
            }
            case SyntaxKind.NullKeyword:
                if (strictNullChecks) {
                    return regular(factory.createLiteralTypeNode(factory.createNull()), node);
                }
                else {
                    return regular(factory.createKeywordTypeNode(SyntaxKind.AnyKeyword), node);
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
                        returnType.typeNode,
                    );
                    return regular(fnTypeNode, node, LocalTypeInfoFlags.None | returnType.flags);
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
                        return regular(
                            factory.createLiteralTypeNode(
                                normalizeLiteralValue(type.literal),
                            ),
                            node,
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
                                        return regular(factory.createLiteralTypeNode(deepClone(prefixOp)), node);
                                    case SyntaxKind.PlusToken:
                                        return regular(factory.createLiteralTypeNode(deepClone(prefixOp.operand as LiteralExpression)), node);
                                }
                                break;
                            case SyntaxKind.BigIntLiteral:
                                if (prefixOp.operator === SyntaxKind.MinusToken) {
                                    return regular(factory.createLiteralTypeNode(deepClone(prefixOp)), node);
                                }
                        }
                    }

                    if (prefixOp.operator === SyntaxKind.PlusToken) {
                        return regular(factory.createKeywordTypeNode(SyntaxKind.NumberKeyword), prefixOp);
                    }
                    else if (prefixOp.operator === SyntaxKind.MinusToken) {
                        return prefixOp.operand.kind === SyntaxKind.BigIntLiteral ?
                            regular(factory.createKeywordTypeNode(SyntaxKind.BigIntKeyword), node) :
                            regular(factory.createKeywordTypeNode(SyntaxKind.NumberKeyword), node);
                    }
                }
                break;
            case SyntaxKind.NumericLiteral:
                return literal(node, SyntaxKind.NumberKeyword, inferenceFlags);
            case SyntaxKind.TemplateExpression:
                if (!(inferenceFlags & NarrowBehavior.AsConst)) {
                    return regular(factory.createKeywordTypeNode(SyntaxKind.StringKeyword), node);
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
                const elementTypesInfo: LocalTypeInfo[] = [];
                let inheritedArrayTypeFlags = LocalTypeInfoFlags.None;
                for (const element of arrayLiteral.elements) {
                    if (isSpreadElement(element)) {
                        return invalid(element);
                    }
                    else if (isOmittedExpression(element)) {
                        elementTypesInfo.push(
                            createUndefinedTypeNode(element),
                        );
                    }
                    else {
                        const elementType = localInference(element, inferenceFlags & NarrowBehavior.NotKeepLiterals);
                        inheritedArrayTypeFlags |= elementType.flags;
                        elementTypesInfo.push(elementType);
                    }
                }
                const tupleType = factory.createTupleTypeNode(
                    elementTypesInfo.map(lti => lti.typeNode),
                );
                tupleType.emitNode = { flags: 1, autoGenerate: undefined, internalFlags: 0 };
                return regular(factory.createTypeOperatorNode(SyntaxKind.ReadonlyKeyword, tupleType), node, inheritedArrayTypeFlags);
            case SyntaxKind.ObjectLiteralExpression:
                return getTypeForObjectLiteralExpression(node as ObjectLiteralExpression, inferenceFlags);
        }

        return invalid(node);
    }
    function invalid(sourceNode: Node, diagMessage = Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit): LocalTypeInfo {
        reportIsolatedDeclarationError(sourceNode, diagMessage);
        return { typeNode: makeInvalidType(), flags: LocalTypeInfoFlags.Invalid, sourceNode };
    }
    function regular(typeNode: TypeNode, sourceNode: Node, flags = LocalTypeInfoFlags.None): LocalTypeInfo {
        return { typeNode, flags, sourceNode };
    }
    function getTypeForObjectLiteralExpression(objectLiteral: ObjectLiteralExpression, inferenceFlags: NarrowBehavior) {
        const properties: TypeElement[] = [];
        let inheritedObjectTypeFlags = LocalTypeInfoFlags.None;
        const members = new Map<string, {
            name: PropertyName;
            location: number;
        }>();
        let replaceWithInvalid = false;
        for (let propIndex = 0, length = objectLiteral.properties.length; propIndex < length; propIndex++) {
            const prop = objectLiteral.properties[propIndex];
            if (hasParseError(prop)) continue;

            if (isShorthandPropertyAssignment(prop)) {
                reportIsolatedDeclarationError(prop);
                inheritedObjectTypeFlags |= LocalTypeInfoFlags.Invalid;
                continue;
            }
            else if (isSpreadAssignment(prop)) {
                reportIsolatedDeclarationError(prop);
                inheritedObjectTypeFlags |= LocalTypeInfoFlags.Invalid;
                continue;
            }

            if (hasParseError(prop.name)) continue;

            if (isPrivateIdentifier(prop.name)) {
                // Not valid in object literals but the compiler will complain about this, we just ignore it here.
                continue;
            }
            if (isComputedPropertyName(prop.name)) {
                if (!resolver.isLiteralComputedName(prop.name)) {
                    reportIsolatedDeclarationError(prop.name);
                    replaceWithInvalid = true;
                    continue;
                }
                if (isEntityNameExpression(prop.name.expression)) {
                    checkEntityNameVisibility(prop.name.expression, prop);
                }
            }

            const nameKey = getMemberKey(prop);
            const existingMember = nameKey ? members.get(nameKey) : undefined;
            const name = simplifyComputedPropertyName(prop.name, existingMember?.name) ??
                deepClone(visitNode(prop.name, visitDeclarationSubtree, isPropertyName)!);

            let newProp;
            if (isMethodDeclaration(prop)) {
                const { method, flags } = handleMethodDeclaration(prop, name, inferenceFlags);
                newProp = method;
                inheritedObjectTypeFlags |= flags;
            }
            else if (isPropertyAssignment(prop)) {
                const modifiers = inferenceFlags & NarrowBehavior.AsConst ?
                    [factory.createModifier(SyntaxKind.ReadonlyKeyword)] :
                    [];
                const { typeNode, flags: propTypeFlags } = localInference(prop.initializer, inferenceFlags & NarrowBehavior.NotKeepLiterals);
                inheritedObjectTypeFlags |= propTypeFlags;
                newProp = factory.createPropertySignature(
                    modifiers,
                    name,
                    /*questionToken*/ undefined,
                    typeNode,
                );
            }
            else {
                const accessorType = handleAccessors(prop, objectLiteral, name, nameKey);
                if (accessorType) {
                    inheritedObjectTypeFlags |= accessorType.flags;
                    newProp = accessorType.type;
                }
                else {
                    return invalid(prop);
                }
            }

            if (newProp) {
                const commentRange = getCommentRange(prop);
                setCommentRange(newProp, {
                    pos: commentRange.pos,
                    end: newProp.name.end,
                });

                if (nameKey) {
                    if (existingMember !== undefined && !isMethodDeclaration(prop)) {
                        properties[existingMember.location] = newProp;
                    }
                    else {
                        members.set(nameKey, {
                            location: properties.length,
                            name,
                        });
                        properties.push(newProp);
                    }
                }
                else {
                    properties.push(newProp);
                }
            }
        }

        const typeNode: TypeNode = replaceWithInvalid ? makeInvalidType() : factory.createTypeLiteralNode(properties);
        return regular(typeNode, objectLiteral, inheritedObjectTypeFlags);
    }

    function handleMethodDeclaration(method: MethodDeclaration, name: PropertyName, inferenceFlags: NarrowBehavior) {
        const oldEnclosingDeclaration = setEnclosingDeclarations(method);
        try {
            const returnType = visitTypeAndClone(method.type, method);
            const typeParameters = visitNodes(method.typeParameters, visitDeclarationSubtree, isTypeParameterDeclaration)?.map(deepClone);
            // TODO: We need to see about inheriting flags from parameters
            const parameters = method.parameters.map(p => deepClone(ensureParameter(p)));
            if (inferenceFlags & NarrowBehavior.AsConst) {
                return {
                    flags: returnType.flags,
                    method: factory.createPropertySignature(
                        [factory.createModifier(SyntaxKind.ReadonlyKeyword)],
                        name,
                        /*questionToken*/ undefined,
                        factory.createFunctionTypeNode(
                            typeParameters,
                            parameters,
                            returnType.typeNode,
                        ),
                    ),
                };
            }
            else {
                return {
                    flags: returnType.flags,
                    method: factory.createMethodSignature(
                        [],
                        name,
                        /*questionToken*/ undefined,
                        typeParameters,
                        parameters,
                        returnType.typeNode,
                    ),
                };
            }
        }
        finally {
            setEnclosingDeclarations(oldEnclosingDeclaration);
        }
    }

    function handleAccessors(accessor: GetAccessorDeclaration | SetAccessorDeclaration, parent: ObjectLiteralExpression | ClassExpression, name: PropertyName, nameKey: string | undefined) {
        if (!nameKey) {
            return;
        }

        const { getAccessor, setAccessor, knownAccessorIdx, otherAccessorIdx } = getAccessorInfo(parent, accessor);
        if (otherAccessorIdx === -1 || otherAccessorIdx > knownAccessorIdx) {
            const accessorType = inferAccessorType(getAccessor, setAccessor);
            return {
                flags: accessorType.flags,
                type: factory.createPropertySignature(
                    setAccessor === undefined ? [factory.createModifier(SyntaxKind.ReadonlyKeyword)] : [],
                    name,
                    /*questionToken*/ undefined,
                    accessorType.typeNode,
                ),
            };
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
    function createUndefinedTypeNode(node: Node, flags = LocalTypeInfoFlags.None) {
        if (strictNullChecks) {
            return regular(
                factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword),
                node,
                flags,
            );
        }
        else {
            return regular(factory.createKeywordTypeNode(SyntaxKind.AnyKeyword), node, flags);
        }
    }
    function literal(node: Node, baseType: string | KeywordTypeSyntaxKind, narrowBehavior: NarrowBehavior, flags: LocalTypeInfoFlags = 0) {
        if (narrowBehavior & NarrowBehavior.AsConstOrKeepLiterals) {
            return regular(
                factory.createLiteralTypeNode(
                    normalizeLiteralValue(node as LiteralExpression),
                ),
                node,
                flags,
            );
        }
        else {
            return regular(
                typeof baseType === "number" ? factory.createKeywordTypeNode(baseType) : factory.createTypeReferenceNode(baseType),
                node,
                flags,
            );
        }
    }

    function visitTypeAndClone(type: TypeNode | undefined, owner: Node) {
        const visitedType = visitNode(type, visitDeclarationSubtree, isTypeNode);
        if (!visitedType) return invalid(owner);
        return regular(deepClone(visitedType), owner);
    }

    function simplifyComputedPropertyName(name: PropertyName, existingName?: PropertyName) {
        let numericValue;
        function basicStringNumberLiterals(name: PropertyName | Expression) {
            if (isStringLiteral(name)) {
                if (isIdentifierText(name.text, options.target, LanguageVariant.Standard)) {
                    return factory.createIdentifier(name.text);
                }
                return existingName && isNumericLiteral(existingName) ? existingName : name;
            }
            else if (isNumericLiteral(name)) {
                numericValue = +name.text;
            }
        }
        const result = basicStringNumberLiterals(name);
        if (result) {
            return result;
        }
        else if (isComputedPropertyName(name)) {
            const expression = name.expression;
            const result = basicStringNumberLiterals(expression);
            if (result) {
                return result;
            }
            else if (
                isPrefixUnaryExpression(expression)
                && isNumericLiteral(expression.operand)
            ) {
                if (expression.operator === SyntaxKind.MinusToken) {
                    return name;
                }
                else if (expression.operator === SyntaxKind.PlusToken) {
                    numericValue = +expression.operand.text;
                }
            }
        }
        if (numericValue === undefined) {
            return undefined;
        }

        if (numericValue >= 0) {
            return factory.createNumericLiteral(numericValue);
        }
        else {
            return factory.createStringLiteral(numericValue.toString());
        }
    }
    function getMemberKey(member: PropertyAssignment | MethodDeclaration | MethodSignature | PropertySignature | GetAccessorDeclaration | SetAccessorDeclaration) {
        const name = member.name;
        if (isIdentifier(name)) {
            return "I:" + name.escapedText;
        }
        if (isStringLiteral(name)) {
            return "I:" + name.text;
        }
        if (isNumericLiteral(name)) {
            return "I:" + (+name.text);
        }
        if (isComputedPropertyName(name)) {
            let fullId = "C:";
            let computedName = name.expression;

            if (isStringLiteral(computedName)) {
                return ("I:" + computedName.text);
            }
            if (isNumericLiteral(computedName)) {
                return ("I:" + (+computedName.text));
            }
            if (
                isPrefixUnaryExpression(computedName)
                && isNumericLiteral(computedName.operand)
            ) {
                if (computedName.operator === SyntaxKind.MinusToken) {
                    return ("I:" + (-computedName.operand.text));
                }
                else if (computedName.operator === SyntaxKind.PlusToken) {
                    return ("I:" + (+computedName.operand.text));
                }
                else {
                    return undefined;
                }
            }

            // We only support dotted identifiers as property keys
            while (true) {
                if (isIdentifier(computedName)) {
                    fullId += computedName.escapedText;
                    break;
                }
                else if (isPropertyAccessExpression(computedName)) {
                    fullId += computedName.name.escapedText;
                    computedName = computedName.expression;
                }
                else {
                    // Can't compute a property key, bail
                    return undefined;
                }
            }
            return fullId;
        }
        return undefined;
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
        let localType: LocalTypeInfo | undefined;
        if (isParameter(node)) {
            if (type) {
                localType = regular(
                    visitNode(type, visitDeclarationSubtree, isTypeNode)!,
                    node,
                );
            }
            // We do not support inferring to binding patterns
            // Binding patterns can add properties and default values in the pattern also complicate inference as we have two sources for the property type.
            else if (node.initializer && isIdentifier(node.name)) {
                localType = localInference(node.initializer);
            }
            else {
                localType = invalid(node);
            }

            if (strictNullChecks && !(localType.flags & LocalTypeInfoFlags.Invalid)) {
                const isOptional = resolver.isOptionalParameter(node);
                /**
                 * If a parameter with a default value is not optional we need to add undefined
                 * function x(o = "", v: string)
                 */
                if (node.initializer && !isOptional) {
                    localType.typeNode = addUndefinedInUnion(localType.typeNode);
                }
                /**
                 * Constructor properties that are optional must have | undefined included to work well with exactOptionalPropertyTypes
                 * constructor(public x?: number) -> x?: number | undefined
                 */
                if (isOptional && !node.initializer && hasSyntacticModifier(node, ModifierFlags.ParameterPropertyModifier)) {
                    localType.typeNode = addUndefinedInUnion(localType.typeNode);
                }
            }
        }
        else if (type) {
            return visitNode(type, visitDeclarationSubtree, isTypeNode);
        }
        else if (isExportAssignment(node)) {
            localType = localInference(node.expression, NarrowBehavior.KeepLiterals);
        }
        else if (isVariableDeclaration(node) && node.initializer) {
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
        else if (isPropertyDeclaration(node) && node.initializer) {
            localType = localInference(node.initializer);
            if (isOptionalDeclaration(node)) {
                localType.typeNode = addUndefinedInUnion(localType.typeNode);
            }
        }
        else if (isInterfaceDeclaration(node.parent) || isTypeLiteralNode(node.parent)) {
            return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
        }
        else {
            reportIsolatedDeclarationError(node);
        }
        if (!localType || localType.flags & LocalTypeInfoFlags.Invalid) {
            return undefined;
        }
        return localType.typeNode;
    }
}
