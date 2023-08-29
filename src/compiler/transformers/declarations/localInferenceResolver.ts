import { Debug } from "../../debug";
import { Diagnostics } from "../../diagnosticInformationMap.generated";
import { isCallSignatureDeclaration, isComputedPropertyName, isConstructSignatureDeclaration, isExportAssignment, isGetAccessorDeclaration, isIdentifier, isLiteralTypeNode, isMethodDeclaration, isMethodSignature, isNoSubstitutionTemplateLiteral, isNumericLiteral, isOmittedExpression, isParameter, isPrivateIdentifier, isPropertyAccessExpression, isPropertyAssignment, isPropertyDeclaration, isPropertySignature, isSetAccessorDeclaration, isShorthandPropertyAssignment, isSpreadAssignment, isSpreadElement, isStringLiteral, isTypeParameterDeclaration, isTypeReferenceNode, isUnionTypeNode, isVariableDeclaration } from "../../factory/nodeTests";
import { setTextRange } from "../../factory/utilitiesPublic";
import { nullTransformationContext } from "../../transformer";
import { ArrayLiteralExpression, ArrowFunction, AsExpression, EntityNameOrEntityNameExpression, ExportAssignment, FunctionExpression, GetAccessorDeclaration, HasInferredType, Identifier, KeywordTypeSyntaxKind, LiteralExpression, MethodSignature, Modifier, Node, NodeArray, NodeFlags, ObjectLiteralElementLike, ObjectLiteralExpression, ParameterDeclaration, ParenthesizedExpression, PrefixUnaryExpression, PropertySignature, SetAccessorDeclaration, SourceFile, SyntaxKind, TransformationContext,TypeAssertion, TypeElement, TypeNode, Visitor, VisitResult } from "../../types";
import { createDiagnosticForNode,isEntityNameExpression } from "../../utilities";
import { isConstTypeReference, isPropertyName, isRestParameter, isTypeNode } from "../../utilitiesPublic";
import { visitEachChild,visitNode, visitNodes } from "../../visitorPublic";

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

interface LocalInferenceResolver {
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
    visitDeclarationSubtree(input: Node): VisitResult<Node | undefined>
    checkEntityNameVisibility(name: EntityNameOrEntityNameExpression, container?: Node): void;
    ensureParameter(p: ParameterDeclaration): ParameterDeclaration;
    context: TransformationContext
}): LocalInferenceResolver | undefined {
    let currentSourceFile: SourceFile | undefined;
    const options = context.getCompilerOptions();
    const resolver = context.getEmitResolver();
    if (!options.isolatedDeclarations) {
        return undefined;
    }
    const { factory } = context;
    const strictNullChecks = !!options.strict || !!options.strictNullChecks;

    return {
        fromInitializer(node: HasInferredType, type: TypeNode | undefined, sourceFile: SourceFile) {
            const oldSourceFile = currentSourceFile;
            currentSourceFile = sourceFile;
            try {
                const localType = localInferenceFromInitializer(node, type);
                if (localType !== undefined) {
                    return localType;
                }
                if(type) {
                    return visitNode(type, visitDeclarationSubtree, isTypeNode)!;
                }
                return makeInvalidType();
            }
            finally {
                currentSourceFile = oldSourceFile;
            }
        },
        makeInvalidType,
    };
    function reportIsolatedDeclarationError(node: Node) {
        const message = createDiagnosticForNode(
            node,
            Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit
        );
        context.addDiagnostic(message);
    }

    function makeInvalidType() {
        return factory.createTypeReferenceNode("invalid");
    }

    interface LocalTypeInfo { typeNode: TypeNode, sourceNode: Node, flags: LocalTypeInfoFlags }

    function mergeFlags(existing: LocalTypeInfoFlags, newFlags: LocalTypeInfoFlags): LocalTypeInfoFlags {
        return existing | newFlags;
    }
    function getAccessorInfo(properties: NodeArray<ObjectLiteralElementLike>, knownAccessor: SetAccessorDeclaration | GetAccessorDeclaration) {
        const nameKey = getMemberKey(knownAccessor);
        const knownIsGetAccessor = isGetAccessorDeclaration(knownAccessor);
        const otherAccessorTest = knownIsGetAccessor ? isSetAccessorDeclaration : isGetAccessorDeclaration;
        const otherAccessorIndex = properties.findIndex(n => otherAccessorTest(n) && getMemberKey(n) === nameKey);
        const otherAccessor = properties[otherAccessorIndex] as SetAccessorDeclaration | GetAccessorDeclaration | undefined;


        const getAccessor = knownIsGetAccessor ? knownAccessor :
            otherAccessor && isGetAccessorDeclaration(otherAccessor) ? otherAccessor :
                undefined;
        const setAccessor = !knownIsGetAccessor ? knownAccessor :
            otherAccessor && isSetAccessorDeclaration(otherAccessor) ? otherAccessor :
                undefined;

        return {
            otherAccessorIndex,
            otherAccessor,
            getAccessor,
            setAccessor,
        };
    }
    function inferAccessorType(getAccessor?: GetAccessorDeclaration, setAccessor?: SetAccessorDeclaration): LocalTypeInfo {

        if(getAccessor?.type){
            return visitTypeAndClone(getAccessor.type, getAccessor);
        }

        if (setAccessor && setAccessor.parameters[0]?.type) {
            const parameterType = setAccessor.parameters[0].type;
            return visitTypeAndClone(parameterType, setAccessor);
        }

        return invalid(getAccessor ?? setAccessor!);
    }
    function localInference(node: Node, inferenceFlags: NarrowBehavior = NarrowBehavior.None): LocalTypeInfo {
        const nextInferenceFlags = inferenceFlags & NarrowBehavior.NotKeepLiterals;
        switch (node.kind) {
            case SyntaxKind.ParenthesizedExpression:
                return localInference((node as ParenthesizedExpression).expression, nextInferenceFlags);
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
                    const flags = mergeFlags(LocalTypeInfoFlags.None, returnType.flags);
                    return regular(fnTypeNode, node, flags);
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
                    const type = asExpression.type
                    if (isLiteralTypeNode(type) &&
                        (isNoSubstitutionTemplateLiteral(type.literal) || isStringLiteral(type.literal))) {
                        return regular(
                            factory.createLiteralTypeNode(
                                normalizeLiteralValue(type.literal)
                            ),
                            node
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

                    if(prefixOp.operator === SyntaxKind.PlusToken) {
                        return regular(factory.createKeywordTypeNode(SyntaxKind.NumberKeyword), prefixOp);
                    }
                    else if(prefixOp.operator === SyntaxKind.MinusToken) {
                        return prefixOp.operand.kind === SyntaxKind.BigIntLiteral?
                            regular(factory.createKeywordTypeNode(SyntaxKind.BigIntKeyword), node):
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
                            createUndefinedTypeNode(element)
                        );
                    }
                    else {
                        const elementType = localInference(element, nextInferenceFlags);
                        inheritedArrayTypeFlags = mergeFlags(inheritedArrayTypeFlags, elementType.flags);
                        elementTypesInfo.push(elementType);
                    }
                }
                const tupleType = factory.createTupleTypeNode(
                    elementTypesInfo.map(lti => lti.typeNode)
                );
                tupleType.emitNode = { flags: 1, autoGenerate: undefined, internalFlags: 0 };
                return regular(factory.createTypeOperatorNode(SyntaxKind.ReadonlyKeyword, tupleType), node, inheritedArrayTypeFlags);

            case SyntaxKind.ObjectLiteralExpression: {
                const objectLiteral = node as ObjectLiteralExpression;
                const properties: TypeElement[] = [];
                let inheritedObjectTypeFlags = LocalTypeInfoFlags.None;

                for (let propIndex = 0, length = objectLiteral.properties.length; propIndex < length; propIndex++) {
                    const prop = objectLiteral.properties[propIndex];
                    
                    if (isShorthandPropertyAssignment(prop)) {
                        return invalid(prop);
                    }
                    else if (isSpreadAssignment(prop)) {
                        return invalid(prop);
                    }

                    if(isPrivateIdentifier(prop.name)) {
                        // Not valid in object literals but the compiler will complain about this, we just ignore it here.
                        continue;
                    }
                    if (isComputedPropertyName(prop.name)) {
                        if (!resolver.isLiteralComputedName(prop.name)) {
                            reportIsolatedDeclarationError(node);
                            continue;
                        }

                        if(isEntityNameExpression(prop.name.expression)) {
                            checkEntityNameVisibility(prop.name.expression, prop);
                        }
                    }

                    const name = deepClone(visitNode(prop.name, visitDeclarationSubtree, isPropertyName)!);
                    let newProp;
                    if (isMethodDeclaration(prop)) {
                        const oldEnclosingDeclaration = setEnclosingDeclarations(prop);
                        try {
                            const returnType = visitTypeAndClone(prop.type, prop);

                            const typeParameters = visitNodes(prop.typeParameters, visitDeclarationSubtree, isTypeParameterDeclaration)?.map(deepClone);
                            // TODO: We need to see about inheriting flags from parameters
                            const parameters = prop.parameters.map(p => deepClone(ensureParameter(p)));
                            inheritedObjectTypeFlags = mergeFlags(inheritedObjectTypeFlags, returnType.flags);
                            if (inferenceFlags & NarrowBehavior.AsConst) {
                                newProp = factory.createPropertySignature(
                                    [factory.createModifier(SyntaxKind.ReadonlyKeyword)],
                                    name,
                                    /*questionToken*/ undefined,
                                    factory.createFunctionTypeNode(
                                        typeParameters,
                                        parameters,
                                        returnType.typeNode,
                                    )
                                );
                            }
                            else {
                                newProp = factory.createMethodSignature(
                                    [],
                                    name,
                                    /*questionToken*/ undefined,
                                    typeParameters,
                                    parameters,
                                    returnType.typeNode,
                                );
                            }
                        }
                        finally {
                            setEnclosingDeclarations(oldEnclosingDeclaration);
                        }
                    }
                    else if (isPropertyAssignment(prop)) {
                        const modifiers = inferenceFlags & NarrowBehavior.AsConst ?
                            [factory.createModifier(SyntaxKind.ReadonlyKeyword)] :
                            [];
                        const { typeNode, flags: propTypeFlags } = localInference(prop.initializer, nextInferenceFlags);
                        inheritedObjectTypeFlags = mergeFlags(inheritedObjectTypeFlags, propTypeFlags);
                        newProp = factory.createPropertySignature(
                            modifiers,
                            name,
                            /*questionToken*/ undefined,
                            typeNode
                        );
                    }
                    else {
                        if (!isGetAccessorDeclaration(prop) && !isSetAccessorDeclaration(prop)) {
                            Debug.assertNever(prop);
                        }
                        const nameKey = getMemberKey(prop);
                        if (!nameKey) {
                            return invalid(prop)
                        }
                        const { getAccessor, setAccessor, otherAccessorIndex } = getAccessorInfo(objectLiteral.properties, prop);
                        if (otherAccessorIndex === -1 || otherAccessorIndex > propIndex) {
                            const accessorType = inferAccessorType(getAccessor, setAccessor);
                            const modifiers: Modifier[] = [];
                            if (!setAccessor) {
                                modifiers.push(factory.createModifier(SyntaxKind.ReadonlyKeyword));
                            }
                            inheritedObjectTypeFlags = mergeFlags(inheritedObjectTypeFlags, accessorType.flags);
                            newProp = factory.createPropertySignature(
                                modifiers,
                                name,
                                /*questionToken*/ undefined,
                                accessorType.typeNode,
                            );
                        }
                    } 

                    if (newProp) {
                        properties.push(newProp);
                    }
                }

                const typeNode: TypeNode = factory.createTypeLiteralNode(properties);
                return regular(typeNode, objectLiteral, inheritedObjectTypeFlags);
            }
        }

        return invalid(node);
    }
    function invalid(sourceNode: Node): LocalTypeInfo {
        return { typeNode: makeInvalidTypeAndReport(sourceNode), flags: LocalTypeInfoFlags.Invalid, sourceNode };
    }
    function regular(typeNode: TypeNode, sourceNode: Node, flags = LocalTypeInfoFlags.None): LocalTypeInfo {
        return { typeNode, flags, sourceNode };
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
                factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword)
                , node, flags);
        }
        else {
            return regular(factory.createKeywordTypeNode(SyntaxKind.AnyKeyword), node, flags);
        }
    }
    function literal(node: Node, baseType: string | KeywordTypeSyntaxKind, narrowBehavior: NarrowBehavior, flags: LocalTypeInfoFlags = 0) {
        if (narrowBehavior & NarrowBehavior.AsConstOrKeepLiterals) {
            return regular(factory.createLiteralTypeNode(
                normalizeLiteralValue(node as LiteralExpression)
            ), node, flags);
        }
        else {
            return regular(
                typeof baseType === "number" ? factory.createKeywordTypeNode(baseType) : factory.createTypeReferenceNode(baseType),
                node,
                flags
            );
        }
    }
    function makeInvalidTypeAndReport(node: Node) {
        reportIsolatedDeclarationError(node);
        return makeInvalidType() ;
    }
    function visitTypeAndClone(type: TypeNode | undefined, owner: Node) {
        const visitedType = visitNode(type, visitDeclarationSubtree, isTypeNode);
        if(!visitedType) return  invalid(owner);
        return regular(deepClone(visitedType), owner)
    }

    function getMemberKey(member: MethodSignature | PropertySignature | GetAccessorDeclaration | SetAccessorDeclaration) {
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
            let computedName = isComputedPropertyName(name)? name.expression: name;
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
        if(isUnionTypeNode(type)) {
            const hasUndefined = type.types.some(p => p.kind === SyntaxKind.UndefinedKeyword);
            if(hasUndefined) return type;

            return factory.createUnionTypeNode([
                ...type.types,
                factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword)
            ])
        }
        return factory.createUnionTypeNode([
            type,
            factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword)
        ])
    }
    function localInferenceFromInitializer(node: HasInferredType | ExportAssignment, type: TypeNode | undefined): TypeNode | undefined {
        let localType: LocalTypeInfo | undefined;
        if (isParameter(node)) {
            if(type) {
                localType = regular(
                    visitNode(type, visitDeclarationSubtree, isTypeNode)!,
                    node,
                )
            }
            else if(node.initializer) {
                localType = localInference(node.initializer);
            }

            if(node.initializer && localType && strictNullChecks && !resolver.isOptionalParameter(node)) {
                localType.typeNode = addUndefinedInUnion(localType.typeNode);
            }

            if(!localType) {
                if(isRestParameter(node)) {
                    localType = regular(
                        factory.createArrayTypeNode(
                            factory.createKeywordTypeNode(SyntaxKind.AnyKeyword)
                        ),
                        node,
                    )
                }
                else {
                    localType = regular(
                        factory.createKeywordTypeNode(SyntaxKind.AnyKeyword),
                        node,
                    )
                }
            }
        }
        else if(type) {
            return visitNode(type, visitDeclarationSubtree, isTypeNode);
        }
        else if (isExportAssignment(node) && node.expression) {
            localType = localInference(node.expression, NarrowBehavior.KeepLiterals);
        }
        else if (isVariableDeclaration(node) && node.initializer) {
            if(isVariableDeclaration(node) && resolver.isExpandoFunction(node)) {
                localType = invalid(node);
            } else {
                localType = localInference(node.initializer, node.parent.flags & NodeFlags.Const ? NarrowBehavior.KeepLiterals : NarrowBehavior.None);
            }
        }
        else if (isPropertyDeclaration(node) && node.initializer) {
            localType = localInference(node.initializer);
        }
        else if(isMethodSignature(node) 
            || isConstructSignatureDeclaration(node)
            || isCallSignatureDeclaration(node)
            || isPropertySignature(node)) {
            return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
        }
        else {
            reportIsolatedDeclarationError(node);
        }
        if(!localType || localType.flags & LocalTypeInfoFlags.Invalid) {
            return undefined;
        }
        return localType.typeNode;
    }
}
