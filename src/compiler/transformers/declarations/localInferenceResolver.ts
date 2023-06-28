import { getNodeId } from "../../checker";
import { findIndex } from "../../core";
import { Debug } from "../../debug";
import { Diagnostics } from "../../diagnosticInformationMap.generated";
import { setCommentRange } from "../../factory/emitNode";
import { isIdentifier, isPropertyAccessExpression, isQualifiedName, isGetAccessorDeclaration, isSetAccessorDeclaration, isTypeParameterDeclaration, isTypeReferenceNode, isLiteralTypeNode, isNoSubstitutionTemplateLiteral, isStringLiteral, isSpreadElement, isOmittedExpression, isComputedPropertyName, isMethodDeclaration, isPropertyAssignment, isShorthandPropertyAssignment, isSpreadAssignment, isNumericLiteral, isMethodSignature, isPropertySignature, isArrayTypeNode, isTypeLiteralNode, isFunctionTypeNode, isConstructorTypeNode, isTypeQueryNode, isBlock, isReturnStatement, isYieldExpression, isExpressionStatement, isBinaryExpression, isExportAssignment, isParameter, isVariableDeclaration, isVariableStatement, isSourceFile, isPropertyDeclaration, isFunctionDeclaration, isElementAccessExpression } from "../../factory/nodeTests";
import { setTextRange } from "../../factory/utilitiesPublic";
import { forEachChildRecursively, forEachChild } from "../../parser";
import { nullTransformationContext } from "../../transformer";
import { TypeNode, Node, EntityName, EntityNameOrEntityNameExpression, NodeFlags, NodeArray, ObjectLiteralElementLike, SetAccessorDeclaration, GetAccessorDeclaration, SyntaxKind, ParenthesizedExpression, QualifiedName, Identifier, CallExpression, NewExpression, FunctionExpression, ArrowFunction, SatisfiesExpression, AsExpression, TypeAssertion, PrefixUnaryExpression, TemplateExpression, TemplateLiteralTypeSpan, ArrayLiteralExpression, ObjectLiteralExpression, TypeElement, Modifier, ConditionalExpression, LiteralExpression, KeywordTypeSyntaxKind, TypeReferenceNode, MethodSignature, PropertySignature, LiteralTypeNode, TypeLiteralNode, SignatureDeclaration, ParameterDeclaration, NodeWithTypeArguments, PropertyName, ModifierFlags, FunctionLikeDeclaration, ReturnStatement, YieldExpression, Statement, Visitor, ExportAssignment, DiagnosticWithLocation, VisitResult, SourceFile, HasInferredType, TransformationContext } from "../../types";
import { setParent, isEntityNameExpression, getTokenPosOfNode, getSyntacticModifierFlags, getEffectiveModifierFlags, createDiagnosticForNode } from "../../utilities";
import { isTypeNode, isPropertyName, isClassLike, isFunctionLike, isExpression } from "../../utilitiesPublic";
import { visitNode, visitNodes, visitEachChild } from "../../visitorPublic";

const NO_LOCAL_INFERENCE = !!process.env.NO_LOCAL_INFERENCE;
enum NarrowBehavior {
    None = 0,
    AsConst = 1,
    KeepLiterals = 2,
    AsConstOrKeepLiterals = AsConst | KeepLiterals,
    NotKeepLiterals = ~KeepLiterals,
}

enum LocalTypeInfoFlags {
    None = 0,
    Fresh = 1 << 0,
    ImplicitAny = 1 << 1,
    Invalid = 1 << 2,
    Optimistic = 1 << 3,
}

interface LocalInferenceResolver {
    makeInvalidType(): Node;
    fromInitializer(node: HasInferredType | ExportAssignment, sourceFile: SourceFile): TypeNode;
}
export function createLocalInferenceResolver({
    setLocalInferenceTargetNode,
    setEnclosingDeclarations,
    visitDeclarationSubtree,
    checkEntityNameVisibility,
    ensureParameter,
    context,
}: {
    setLocalInferenceTargetNode(node: Node | undefined): Node | undefined;
    setEnclosingDeclarations(node: Node): Node;
    visitDeclarationSubtree(input: Node): VisitResult<Node | undefined>
    checkEntityNameVisibility(name: EntityNameOrEntityNameExpression, container?: Node): void;
    ensureParameter(p: ParameterDeclaration): ParameterDeclaration;

    context: TransformationContext
}): LocalInferenceResolver | undefined {
    let currentSourceFile: SourceFile | undefined;
    const options = context.getCompilerOptions();
    if (!options.isolatedDeclarations) {
        return undefined;
    }
    const resolver = context.getEmitResolver();
    const { factory } = context;
    const strictNullChecks = !!options.strict || !!options.strictNullChecks;

    return {
        fromInitializer(node: HasInferredType, sourceFile: SourceFile) {
            const oldSourceFile = currentSourceFile;
            currentSourceFile = sourceFile;
            try {
                const localType = localInferenceFromInitializer(node);
                if (localType !== undefined) {
                    return localType;
                }
                reportIsolatedDeclarationError(node);
                return makeInvalidType();
            } finally {
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
    // We need to see about getting the JSX element type.
    function getJSXElementType(_node: Node): EntityName {
        return factory.createQualifiedName(
            factory.createQualifiedName(
                factory.createIdentifier("React"),
                factory.createIdentifier("JSX"),
            ),
            factory.createIdentifier("Element"),
        );
    }
    function entityNameExpressionToQualifiedName(node: EntityNameOrEntityNameExpression): EntityName {
        if (isIdentifier(node)) {
            return setTextRange(factory.cloneNode(node), node);
        }
        else if (isPropertyAccessExpression(node)) {
            return setTextRange(factory.createQualifiedName(
                entityNameExpressionToQualifiedName(node.expression),
                factory.cloneNode(node.name)
            ), node);
        }
        else if (isQualifiedName(node)) {
            return setTextRange(factory.createQualifiedName(
                entityNameExpressionToQualifiedName(node),
                factory.cloneNode(node.right)
            ), node);
        }
        throw Error("Should not happen");
    }

    function isSyntheticTypeNode(node: Node): node is TypeNode {
        return isTypeNode(node) && !!(node.flags & NodeFlags.Synthesized);
    }
    function finalizeSyntheticTypeNode<T extends Node | undefined>(typeNode: T, parent: Node): T {
        if (typeNode && typeNode.parent !== parent) {
            setParent(typeNode, parent);
            // Ensure no non synthetic nodes make it in here
            Debug.assert(typeNode.flags & NodeFlags.Synthesized)
            forEachChildRecursively(typeNode, (child, parent) => {
                Debug.assert(typeNode.flags & NodeFlags.Synthesized);
                if (child.parent === parent) {
                    return "skip";
                }
                setParent(child, parent);
            });
        }
        return typeNode as T & { isSynthetic: true };
    }
    function visitSyntheticType(typeNode: TypeNode, node: Node) {
        const previousLocalInferenceTargetNode = setLocalInferenceTargetNode(node);
        try {
            let visitedNode = visitNode(finalizeSyntheticTypeNode(typeNode, node), visitDeclarationSubtree, isSyntheticTypeNode);
            Debug.assert(visitedNode);
            return visitedNode;
        } finally {
            setLocalInferenceTargetNode(previousLocalInferenceTargetNode);
        }
    }

    function mergeFlags(existing: LocalTypeInfoFlags, newFlags: LocalTypeInfoFlags): LocalTypeInfoFlags {
        return existing | (newFlags | LocalTypeInfoFlags.Optimistic);
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
        }
    }
    function inferAccessorType(getAccessor?: GetAccessorDeclaration, setAccessor?: SetAccessorDeclaration): LocalTypeInfo {

        if(getAccessor?.type){
            return regular(
                deepClone(visitType(getAccessor.type, getAccessor)), 
                getAccessor
            );
        };

        if (setAccessor && setAccessor.parameters[0]?.type) {
            const parameterType = setAccessor.parameters[0].type;
            return regular(
                deepClone(visitType(parameterType, setAccessor)), 
                setAccessor
            );
        }

        if (getAccessor) {
            const localPropType = inferReturnType(getAccessor)
            return localPropType;
        }

        return invalid(getAccessor ?? setAccessor!);
    }
    function localInference(node: Node, inferenceFlags: NarrowBehavior = NarrowBehavior.None): LocalTypeInfo {
        const nextInferenceFlags = inferenceFlags & NarrowBehavior.NotKeepLiterals;
        switch (node.kind) {
            case SyntaxKind.ParenthesizedExpression:
                return localInference((node as ParenthesizedExpression).expression, inferenceFlags);
            case SyntaxKind.QualifiedName:
                const typeNode = visitSyntheticType(factory.createTypeQueryNode(
                    entityNameExpressionToQualifiedName(node as QualifiedName)
                ), node);

                return regular(
                    typeNode,
                    node,
                    LocalTypeInfoFlags.Optimistic
                )
            case SyntaxKind.PropertyAccessExpression:
                if (isEntityNameExpression(node)) {
                    const typeNode = visitSyntheticType(factory.createTypeQueryNode(
                        entityNameExpressionToQualifiedName(node)
                    ), node);
                    return regular(
                        typeNode,
                        node,
                        LocalTypeInfoFlags.Optimistic
                    )
                }
                break;
            case SyntaxKind.Identifier: {
                if ((node as Identifier).escapedText === "undefined") {
                    return createUndefinedTypeNode(node);
                }
                const typeNode = visitSyntheticType(factory.createTypeQueryNode(
                    deepClone(node as Identifier)
                ), node)

                return regular(typeNode, node, LocalTypeInfoFlags.Optimistic)
            }
            case SyntaxKind.NullKeyword:
                if (strictNullChecks) {
                    return regular(factory.createLiteralTypeNode(factory.createNull()), node);
                }
                else {
                    return regular(factory.createKeywordTypeNode(SyntaxKind.AnyKeyword), node, LocalTypeInfoFlags.ImplicitAny);
                }
            case SyntaxKind.CallExpression:
                const callExpression = node as CallExpression;
                if (isIdentifier(callExpression.expression) && callExpression.expression.escapedText === "Symbol") {
                    if (inferenceFlags & NarrowBehavior.KeepLiterals) {
                        return regular(
                            factory.createTypeOperatorNode(
                                SyntaxKind.UniqueKeyword,
                                factory.createKeywordTypeNode(SyntaxKind.SymbolKeyword)
                            ),
                            node
                        )
                    } else {
                        return regular(
                            factory.createKeywordTypeNode(SyntaxKind.SymbolKeyword),
                            node
                        )
                    }
                }
            case SyntaxKind.NewExpression:
                const newExpr = node as NewExpression;
                if (isEntityNameExpression(newExpr.expression)) {
                    const typeNode = visitSyntheticType(factory.createTypeReferenceNode(
                        entityNameExpressionToQualifiedName(newExpr.expression),
                        visitNodes(newExpr.typeArguments, deepClone, isTypeNode)!
                    ), node);
                    // Optimistic since the constructor might not have the same name as the type
                    return regular(typeNode, node, LocalTypeInfoFlags.Optimistic);
                }
                return invalid(node);
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.FunctionExpression:
                const fnNode = node as FunctionExpression | ArrowFunction;
                const oldEnclosingDeclaration = setEnclosingDeclarations(node);
                try {
                    const returnType = inferReturnType(fnNode);
                    const fnTypeNode = factory.createFunctionTypeNode(
                        visitNodes(fnNode.typeParameters, visitDeclarationSubtree, isTypeParameterDeclaration)?.map(deepClone),
                        fnNode.parameters.map(p => deepClone(ensureParameter(p))),
                        returnType.typeNode,
                    );
                    // If the return type is optimistic, teh whole function type is optimistic
                    const flags = mergeFlags(LocalTypeInfoFlags.None, returnType.flags)
                    return regular(fnTypeNode, node, flags);
                }
                finally {
                    setEnclosingDeclarations(oldEnclosingDeclaration);
                }
            case SyntaxKind.SatisfiesExpression: {
                const typeNode = localInference((node as SatisfiesExpression).expression);
                return { ...typeNode, flags: typeNode.flags | LocalTypeInfoFlags.Optimistic }
            }
            case SyntaxKind.TypeAssertionExpression:
            case SyntaxKind.AsExpression:
                const asExpression = node as AsExpression | TypeAssertion;
                if (isTypeReferenceNode(asExpression.type) && isConst(asExpression.type)) {
                    return localInference(asExpression.expression, NarrowBehavior.AsConst);
                }
                else {
                    const type = visitType(asExpression.type, asExpression);
                    if (isLiteralTypeNode(type) &&
                        (isNoSubstitutionTemplateLiteral(type.literal) || isStringLiteral(type.literal))) {
                        return regular(
                            factory.createLiteralTypeNode(
                                normalizeLiteralValue(type.literal)
                            ),
                            node
                        );
                    }
                    return regular(deepClone(type), node);
                }
            case SyntaxKind.PrefixUnaryExpression:
                const prefixOp = node as PrefixUnaryExpression;
                if (prefixOp.operator === SyntaxKind.MinusToken || prefixOp.operator === SyntaxKind.PlusToken) {
                    if (NarrowBehavior.AsConstOrKeepLiterals & inferenceFlags) {
                        switch (prefixOp.operand.kind) {
                            case SyntaxKind.NumericLiteral:
                                switch (prefixOp.operator) {
                                    case SyntaxKind.MinusToken:
                                        return fresh(factory.createLiteralTypeNode(deepClone(prefixOp)), node);
                                    case SyntaxKind.PlusToken:
                                        return fresh(factory.createLiteralTypeNode(deepClone(prefixOp)), node);;
                                }
                            case SyntaxKind.BigIntLiteral:
                                if (prefixOp.operator === SyntaxKind.MinusToken) {
                                    return fresh(factory.createLiteralTypeNode(deepClone(prefixOp)), node);;
                                }
                        }
                    }
                    
                    if(prefixOp.operator === SyntaxKind.PlusToken) {
                        return fresh(factory.createKeywordTypeNode(SyntaxKind.NumberKeyword), node)
                    }
                    else if(prefixOp.operator === SyntaxKind.MinusToken) {
                        return prefixOp.operand.kind === SyntaxKind.BigIntLiteral?
                            fresh(factory.createKeywordTypeNode(SyntaxKind.BigIntKeyword), node):
                            fresh(factory.createKeywordTypeNode(SyntaxKind.NumberKeyword), node)
                    }
                }
                break;
            case SyntaxKind.NumericLiteral:
                return literal(node, SyntaxKind.NumberKeyword, inferenceFlags);
            case SyntaxKind.TemplateExpression:
                if (!(inferenceFlags & NarrowBehavior.AsConst)) {
                    return fresh(factory.createKeywordTypeNode(SyntaxKind.StringKeyword), node);
                }
                const templateExpression = node as TemplateExpression;
                const templateSpans: TemplateLiteralTypeSpan[] = [];
                let flags = LocalTypeInfoFlags.None;
                for (const span of templateExpression.templateSpans) {
                    const { typeNode, flags: typeFlags } = localInference(span.expression, nextInferenceFlags);
                    const literalSpan = factory.createTemplateLiteralTypeSpan(
                        typeNode,
                        span.literal
                    );
                    flags = mergeFlags(flags, typeFlags)
                    templateSpans.push(literalSpan);
                }
                return regular(
                    factory.createTemplateLiteralType(deepClone(templateExpression.head), templateSpans),
                    node,
                    flags
                );
            case SyntaxKind.NoSubstitutionTemplateLiteral:
            case SyntaxKind.StringLiteral:
                return literal(node, SyntaxKind.StringKeyword, inferenceFlags);
            case SyntaxKind.BigIntLiteral:
                return literal(node, SyntaxKind.BigIntKeyword, inferenceFlags);
            case SyntaxKind.RegularExpressionLiteral:
                return literal(node, "RegExp", inferenceFlags, LocalTypeInfoFlags.Optimistic);
            case SyntaxKind.JsxSelfClosingElement:
            case SyntaxKind.JsxElement:
                const typeReference = finalizeSyntheticTypeNode(factory.createTypeReferenceNode(getJSXElementType(node)), node.parent);
                checkEntityNameVisibility(typeReference.typeName);
                return fresh(typeReference, node);
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.FalseKeyword:
                return literal(node, SyntaxKind.BooleanKeyword, inferenceFlags);
            case SyntaxKind.ArrayLiteralExpression:
                const arrayLiteral = node as ArrayLiteralExpression;
                const elementTypesInfo: LocalTypeInfo[] = [];
                let inheritedArrayTypeFlags = LocalTypeInfoFlags.None;
                for (const element of arrayLiteral.elements) {
                    if (isSpreadElement(element)) {
                        const spreadType = localInference(element.expression, nextInferenceFlags)
                        const elementTypeNode = inferenceFlags & NarrowBehavior.AsConst ?
                            factory.createRestTypeNode(spreadType.typeNode) :
                            factory.createIndexedAccessTypeNode(spreadType.typeNode, factory.createKeywordTypeNode(SyntaxKind.NumberKeyword));
                        inheritedArrayTypeFlags = mergeFlags(inheritedArrayTypeFlags, spreadType.flags);
                        elementTypesInfo.push(
                            { ...spreadType, typeNode: elementTypeNode }
                        );
                    }
                    else if (isOmittedExpression(element)) {
                        elementTypesInfo.push(
                            createUndefinedTypeNode(element)
                        );
                    } else {
                        const elementType = localInference(element, nextInferenceFlags)
                        inheritedArrayTypeFlags = mergeFlags(inheritedArrayTypeFlags, elementType.flags);
                        elementTypesInfo.push(elementType);
                    }
                }
                if (inferenceFlags & NarrowBehavior.AsConst) {
                    const tupleType = factory.createTupleTypeNode(
                        elementTypesInfo.map(lti => lti.typeNode)
                    );
                    tupleType.emitNode = { flags: 1, autoGenerate: undefined, internalFlags: 0 };
                    return regular(factory.createTypeOperatorNode(SyntaxKind.ReadonlyKeyword, tupleType), node, inheritedArrayTypeFlags);
                }
                else {
                    let itemType;
                    if (elementTypesInfo.length === 0) {
                        itemType = (strictNullChecks ? factory.createKeywordTypeNode(SyntaxKind.NeverKeyword) : factory.createKeywordTypeNode(SyntaxKind.AnyKeyword));
                    }
                    else {
                        itemType = makeUnionFromTypes(node, elementTypesInfo, /*widenSingle*/ false).typeNode;
                    }

                    return regular(factory.createArrayTypeNode(itemType), node, inheritedArrayTypeFlags | LocalTypeInfoFlags.Optimistic);
                }
            case SyntaxKind.ObjectLiteralExpression: {
                const objectLiteral = node as ObjectLiteralExpression;
                const properties: TypeElement[] = [];
                let addedIntersections: TypeNode[] | undefined;

                for (let propIndex = 0, length = objectLiteral.properties.length; propIndex < length; propIndex++) {
                    const prop = objectLiteral.properties[propIndex]
                    if (prop.name && isComputedPropertyName(prop.name) && isEntityNameExpression(prop.name.expression)) {
                        checkEntityNameVisibility(prop.name.expression, prop);
                    }
                    const name = prop.name && deepClone(visitNode(prop.name, visitDeclarationSubtree, isPropertyName)!);
                    let inheritedObjectTypeFlags = LocalTypeInfoFlags.None;
                    let newProp;
                    if (isMethodDeclaration(prop) && name) {
                        const oldEnclosingDeclaration = setEnclosingDeclarations(prop);
                        try {
                            const returnType = inferReturnType(prop);
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
                        } finally {
                            setEnclosingDeclarations(oldEnclosingDeclaration);
                        }
                    }
                    else if (isPropertyAssignment(prop) && name) {
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
                    else if (isShorthandPropertyAssignment(prop) && name) {
                        const modifiers = inferenceFlags & NarrowBehavior.AsConst ?
                            [factory.createModifier(SyntaxKind.ReadonlyKeyword)] :
                            [];
                        const { typeNode, flags: propTypeFlags } = localInference(prop.name, nextInferenceFlags);
                        inheritedObjectTypeFlags = mergeFlags(inheritedObjectTypeFlags, propTypeFlags);

                        newProp = factory.createPropertySignature(
                            modifiers,
                            name,
                            /*questionToken*/ undefined,
                            typeNode
                        );
                    }
                    else if (isSpreadAssignment(prop)) {
                        addedIntersections ??= [];
                        const { typeNode, flags: spreadTypeFlags } = localInference(prop.expression, nextInferenceFlags);
                        // Spread types are always optimistic
                        inheritedObjectTypeFlags = mergeFlags(inheritedObjectTypeFlags, spreadTypeFlags) | LocalTypeInfoFlags.Optimistic;
                        addedIntersections.push(typeNode)
                    }
                    else {
                        if (isGetAccessorDeclaration(prop) || isSetAccessorDeclaration(prop)) {
                            const nameKey = getMemberKey(prop);
                            if (nameKey && name) {
                                const { getAccessor, setAccessor, otherAccessorIndex } = getAccessorInfo(objectLiteral.properties, prop);
                                if (otherAccessorIndex === -1 || otherAccessorIndex > propIndex) {
                                    const accessorType = inferAccessorType(getAccessor, setAccessor);
                                    const modifiers: Modifier[] = []
                                    if (!setAccessor) {
                                        modifiers.push(factory.createModifier(SyntaxKind.ReadonlyKeyword))
                                    }
                                    inheritedObjectTypeFlags = mergeFlags(inheritedObjectTypeFlags, accessorType.flags);
                                    newProp = factory.createPropertySignature(
                                        modifiers,
                                        name,
                                        /*questionToken*/ undefined,
                                        accessorType.typeNode,
                                    );
                                }
                            } else {
                                return invalid(prop);
                            }
                        } else {
                            return invalid(prop);
                        }
                    }

                    if (newProp) {
                        const prevPos = newProp.name.pos;
                        const newPos = getTokenPosOfNode(newProp.name, currentSourceFile);

                        setTextRange(newProp.name, {
                            pos: newPos,
                            end: newProp.name.end
                        });
                        setTextRange(newProp, {
                            pos: prevPos,
                            end: newProp.name.end,
                        })
                        setCommentRange(newProp, {
                            pos: prevPos,
                            end: newProp.name.pos
                        })

                        properties.push(newProp)
                    }
                }

                let typeNode: TypeNode = factory.createTypeLiteralNode(properties);
                if (addedIntersections) {
                    if (properties.length !== 0) {
                        addedIntersections.push(typeNode);
                    }
                    typeNode = factory.createIntersectionTypeNode(addedIntersections);
                }
                return regular(typeNode, objectLiteral);
            }
            case SyntaxKind.ConditionalExpression:
                const conditionalExpression = node as ConditionalExpression;
                const types = [
                    localInference(conditionalExpression.whenTrue, inferenceFlags & ~NarrowBehavior.AsConst),
                    localInference(conditionalExpression.whenFalse, inferenceFlags & ~NarrowBehavior.AsConst),
                ]
                return makeUnionFromTypes(node, types, /*widenSingle*/ false);
        }

        return invalid(node);
    }
    function invalid(node: Node): LocalTypeInfo {
        return { typeNode: makeInvalidTypeAndReport(node), flags: LocalTypeInfoFlags.Invalid, sourceNode: node };
    }
    function fresh(typeNode: TypeNode, sourceNode: Node, flags = LocalTypeInfoFlags.None): LocalTypeInfo {
        return { typeNode: finalizeSyntheticTypeNode(typeNode, sourceNode.parent), flags: flags | LocalTypeInfoFlags.Fresh, sourceNode };
    }
    function regular(typeNode: TypeNode, sourceNode: Node, flags = LocalTypeInfoFlags.None): LocalTypeInfo {
        return { typeNode: finalizeSyntheticTypeNode(typeNode, sourceNode.parent), flags, sourceNode };
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
            return regular(factory.createKeywordTypeNode(SyntaxKind.AnyKeyword), node, LocalTypeInfoFlags.ImplicitAny | flags);
        }
    }
    function literal(node: Node, baseType: string | KeywordTypeSyntaxKind, narrowBehavior: NarrowBehavior, flags: LocalTypeInfoFlags = 0) {
        if (narrowBehavior & NarrowBehavior.AsConstOrKeepLiterals) {
            return fresh(factory.createLiteralTypeNode(
                normalizeLiteralValue(node as LiteralExpression)
            ), node, flags);
        }
        else {
            return fresh(
                typeof baseType === "number" ? factory.createKeywordTypeNode(baseType) : factory.createTypeReferenceNode(baseType),
                node, 
                flags
            );
        }
    }
    function isConst(typeReference: TypeReferenceNode) {
        return isIdentifier(typeReference.typeName) && typeReference.typeName.escapedText === "const";
    }
    function makeInvalidTypeAndReport(node: Node) {
        reportIsolatedDeclarationError(node);
        return makeInvalidType() as TypeReferenceNode;
    }
    function visitType(type: TypeNode | undefined, owner: Node) {
        const visitedType = visitNode(type, visitDeclarationSubtree, isTypeNode);
        return visitedType ?? makeInvalidTypeAndReport(owner);
    }

    function getMemberNameKey(name: PropertyName) {
        if (isIdentifier(name)) {
            return "I:" + name.escapedText;
        }
        if (isStringLiteral(name)) {
            return "S:" + name.text
        }
        if (isNumericLiteral(name)) {
            return "N:" + (+name.text)
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
    function getMemberKey(member: MethodSignature | PropertySignature | GetAccessorDeclaration | SetAccessorDeclaration) {
        return getMemberNameKey(member.name)
    }

    function getWidenedType(localTypeInfo: LocalTypeInfo) {
        if ((localTypeInfo.flags & LocalTypeInfoFlags.Fresh) && isLiteralTypeNode(localTypeInfo.typeNode)) {
            const literal = localTypeInfo.typeNode.literal;
            return (
                literal.kind === SyntaxKind.StringLiteral ? factory.createKeywordTypeNode(SyntaxKind.StringKeyword) :
                literal.kind === SyntaxKind.NumericLiteral ? factory.createKeywordTypeNode(SyntaxKind.NumberKeyword) :
                literal.kind === SyntaxKind.PrefixUnaryExpression && (literal as PrefixUnaryExpression).operand.kind === SyntaxKind.NumericLiteral ? factory.createKeywordTypeNode(SyntaxKind.NumberKeyword) :
                literal.kind === SyntaxKind.BigIntLiteral ? factory.createKeywordTypeNode(SyntaxKind.BigIntKeyword) :
                literal.kind === SyntaxKind.TrueKeyword || literal.kind === SyntaxKind.FalseKeyword ? factory.createKeywordTypeNode(SyntaxKind.BooleanKeyword) :
                localTypeInfo.typeNode
            );
        }

        return localTypeInfo.typeNode;
    }
    function makeUnionFromTypes(sourceNode: Node, types: LocalTypeInfo[], widenSingle: boolean) {
        let [unionConstituents, flags] = deduplicateUnion(types);
        if (unionConstituents.length === 1) {
            const localType = unionConstituents[0];
           
            return widenSingle ? { ...localType, typeNode: getWidenedType(localType) } : localType;
        }
        const unionConstituentsTypes = collapseLiteralTypesIntoBaseTypes(unionConstituents);

        normalizeObjectUnion(unionConstituentsTypes);
        return regular(
            unionConstituentsTypes.length === 1 ? unionConstituentsTypes[0] : factory.createUnionTypeNode(unionConstituentsTypes),
            sourceNode,
            LocalTypeInfoFlags.Optimistic | flags
        );

        function collapseLiteralTypesIntoBaseTypes(nodes: LocalTypeInfo[]) {
            enum CollapsibleTypes {
                None = 0,
                String = 1 << 1,
                Number = 1 << 2,
                True = 1 << 3,
                False = 1 << 4,
                Boolean = True | False,
                BigInt = 1 << 5,
                Any = 1 << 7,
                ImplicitAny = 1 << 8
            }
            let baseTypes = CollapsibleTypes.None;
            let literalTypes = CollapsibleTypes.None;
            for (const type of nodes) {
                switch (type.typeNode.kind) {
                    case SyntaxKind.TemplateLiteralType:
                        literalTypes |= CollapsibleTypes.String;
                        break;
                    case SyntaxKind.AnyKeyword:
                        if (type.flags & LocalTypeInfoFlags.ImplicitAny) {
                            literalTypes |= CollapsibleTypes.ImplicitAny;
                        }
                        else {
                            baseTypes |= CollapsibleTypes.Any;
                        }
                        break;
                    case SyntaxKind.BooleanKeyword:
                        baseTypes |= CollapsibleTypes.Boolean;
                        break;
                    case SyntaxKind.StringKeyword:
                        baseTypes |= CollapsibleTypes.String;
                        break;
                    case SyntaxKind.NumberKeyword:
                        baseTypes |= CollapsibleTypes.Number;
                        break;
                    case SyntaxKind.BigIntKeyword:
                        baseTypes |= CollapsibleTypes.BigInt;
                        break;
                    case SyntaxKind.LiteralType:
                        const literalType = type.typeNode as LiteralTypeNode;
                        switch (literalType.literal.kind) {
                            case SyntaxKind.TrueKeyword:
                                literalTypes |= CollapsibleTypes.True;
                                break;
                            case SyntaxKind.FalseKeyword:
                                literalTypes |= CollapsibleTypes.False;
                                break;
                            case SyntaxKind.NumericLiteral:
                                literalTypes |= CollapsibleTypes.Number;
                                break;
                            case SyntaxKind.PrefixUnaryExpression:
                                if ((literalType.literal as PrefixUnaryExpression).operand.kind === SyntaxKind.NumericLiteral) {
                                    literalTypes |= CollapsibleTypes.Number;
                                }
                                break;
                            case SyntaxKind.StringLiteral:
                            case SyntaxKind.NoSubstitutionTemplateLiteral:
                            case SyntaxKind.TemplateExpression:
                                literalTypes |= CollapsibleTypes.String;
                                break;
                            case SyntaxKind.BigIntLiteral:
                                literalTypes |= CollapsibleTypes.BigInt;
                                break;
                        }
                }
            }
            // If true and false are both present, act as if we found boolean itself
            if ((literalTypes & CollapsibleTypes.Boolean) === CollapsibleTypes.Boolean) {
                baseTypes |= CollapsibleTypes.Boolean;
            }
            const typesToCollapse = baseTypes & literalTypes;

            if (baseTypes & CollapsibleTypes.Any) {
                return [factory.createKeywordTypeNode(SyntaxKind.AnyKeyword)];
            }
            // Nothing to collapse or reorder
            if (baseTypes === CollapsibleTypes.None) return nodes.map(n => n.typeNode);
            const result: TypeNode[] = [];

            // We do a best effort to preserve TS union order for primitives
            if (baseTypes & CollapsibleTypes.String) {
                result.push(factory.createKeywordTypeNode(SyntaxKind.StringKeyword));
            }
            if (baseTypes & CollapsibleTypes.Number) {
                result.push(factory.createKeywordTypeNode(SyntaxKind.NumberKeyword));
            }
            if (baseTypes & CollapsibleTypes.Boolean) {
                result.push(factory.createKeywordTypeNode(SyntaxKind.BooleanKeyword));
            }
            if (baseTypes & CollapsibleTypes.BigInt) {
                result.push(factory.createKeywordTypeNode(SyntaxKind.BigIntKeyword));
            }
            if (!(baseTypes & CollapsibleTypes.Boolean) && literalTypes & CollapsibleTypes.True) {
                result.push(factory.createLiteralTypeNode(factory.createTrue()));
            }
            if (!(baseTypes & CollapsibleTypes.Boolean) && literalTypes & CollapsibleTypes.False) {
                result.push(factory.createLiteralTypeNode(factory.createFalse()));
            }

            for (const type of nodes) {
                let typeofNode = CollapsibleTypes.None;

                switch (type.typeNode.kind) {
                    case SyntaxKind.BooleanKeyword:
                    case SyntaxKind.StringKeyword:
                    case SyntaxKind.NumberKeyword:
                    case SyntaxKind.BigIntKeyword:
                    case SyntaxKind.AnyKeyword:
                        // They were already added
                        continue;
                    case SyntaxKind.TemplateLiteralType:
                        typeofNode = CollapsibleTypes.String;
                        break;
                    case SyntaxKind.LiteralType:
                        const literalType = type.typeNode as LiteralTypeNode;
                        switch (literalType.literal.kind) {
                            case SyntaxKind.TrueKeyword:
                                continue;
                            case SyntaxKind.FalseKeyword:
                                continue;
                            case SyntaxKind.NumericLiteral:
                                typeofNode = CollapsibleTypes.Number;
                                break;
                            case SyntaxKind.PrefixUnaryExpression:
                                if ((literalType.literal as PrefixUnaryExpression).operand.kind === SyntaxKind.NumericLiteral) {
                                    typeofNode = CollapsibleTypes.Number;
                                }
                                break;
                            case SyntaxKind.StringLiteral:
                            case SyntaxKind.NoSubstitutionTemplateLiteral:
                            case SyntaxKind.TemplateExpression:
                                typeofNode = CollapsibleTypes.String;
                                break;
                            case SyntaxKind.BigIntLiteral:
                                typeofNode = CollapsibleTypes.BigInt;
                                break;
                        }
                }
                // Not a node of interest, do not change
                if ((typeofNode & typesToCollapse) === 0) {
                    result.push(type.typeNode);
                }
            }
            return result;
        }
        function deduplicateUnion(nodes: LocalTypeInfo[]) {
            const typeInfoCache = new Map<number, {
                node: TypeLiteralNode,
                members: Map<string, TypeElement>
            }>();
            const union: LocalTypeInfo[] = [];
            let implicitAnyNode: LocalTypeInfo | undefined;
            let mergedUnionFlags = LocalTypeInfoFlags.None;
            for (const node of nodes) {
                mergedUnionFlags = mergeFlags(mergedUnionFlags, node.flags)
                // Do not add implicit any unless it's the only type in the array
                if (!strictNullChecks && node.flags & LocalTypeInfoFlags.ImplicitAny) {
                    implicitAnyNode = node;
                    continue;
                }
                const existing = union.find(u => typesEqual(node.typeNode, node.sourceNode, u.typeNode, u.sourceNode));
                if (existing === undefined) {
                    union.push(node);
                }
                else {
                    existing.flags &= node.flags;
                }
            }
            if (union.length === 0 && implicitAnyNode) {
                union.push(implicitAnyNode);
            }
            return [union, mergedUnionFlags] as const;

            function getTypeInfo(type: TypeLiteralNode, errorTarget: Node | undefined) {
                const typeNodeId = getNodeId(type);
                let typeInfo = typeInfoCache.get(typeNodeId);
                if (typeInfo) return typeInfo;

                typeInfo = {
                    node: type,
                    members: new Map()
                };
                for (const member of type.members) {
                    const isMethod = isMethodSignature(member);
                    const isProp = isPropertySignature(member);
                    if (isMethod || isProp) {
                        const memberKey = getMemberKey(member);
                        if (memberKey === undefined) {
                            makeInvalidTypeAndReport(errorTarget ?? member);
                            break;
                        }
                        typeInfo.members.set(memberKey, member);
                    }
                    else {
                        makeInvalidTypeAndReport(errorTarget ?? member);
                    }
                }
                typeInfoCache.set(typeNodeId, typeInfo);
                return typeInfo;
            }
            function entityNameEqual(aTypeName: EntityName, bTypeName: EntityName) {
                while (true) {
                    if (aTypeName.kind === SyntaxKind.QualifiedName && bTypeName.kind === SyntaxKind.QualifiedName) {
                        if (aTypeName.right.escapedText !== bTypeName.right.escapedText) return false;
                        aTypeName = aTypeName.left;
                        bTypeName = bTypeName.left;
                    }
                    else if (aTypeName.kind === SyntaxKind.Identifier && bTypeName.kind === SyntaxKind.Identifier) {
                        return aTypeName.escapedText === bTypeName.escapedText;
                    }
                    else {
                        return false;
                    }
                }
            }
            function signatureEqual(a: SignatureDeclaration, aErrorTarget: Node | undefined, b: SignatureDeclaration, bErrorTarget: Node | undefined) {
                if (!typesEqual(a.type, aErrorTarget, b.type, bErrorTarget)) {
                    return false;
                }
                if (a.parameters.length !== b.parameters.length) {
                    return false;
                }

                return a.parameters.every((aParam, index) => isParameterEqual(aParam, b.parameters[index]));

                // Isolated declarations finish equality 
                function isParameterEqual(a: ParameterDeclaration, b: ParameterDeclaration) {
                    if (!!a.questionToken !== !!b.questionToken) {
                        return false;
                    }
                    return typesEqual(a.type, aErrorTarget, b.type, bErrorTarget);
                }
            }
            function nodeTypeArgumentsEqual(a: NodeWithTypeArguments, aErrorTarget: Node | undefined, b: NodeWithTypeArguments, bErrorTarget: Node | undefined) {
                if (a.typeArguments === undefined && b.typeArguments === undefined) {
                    return true;
                }
                if (a.typeArguments?.length !== b.typeArguments?.length) {
                    return false;
                }

                return !!a.typeArguments?.every((aArg, index) => typesEqual(aArg, aErrorTarget, b.typeArguments?.[index], bErrorTarget))
            }
            function typesEqual(a: TypeNode | undefined, aErrorTarget: Node | undefined, b: TypeNode | undefined, bErrorTarget: Node | undefined): boolean {
                if (a === undefined || b === undefined) return a === b;
                if (a.kind !== b.kind) return false;
                switch (a.kind) {
                    case SyntaxKind.AnyKeyword:
                    case SyntaxKind.UnknownKeyword:
                    case SyntaxKind.NumberKeyword:
                    case SyntaxKind.BigIntKeyword:
                    case SyntaxKind.ObjectKeyword:
                    case SyntaxKind.BooleanKeyword:
                    case SyntaxKind.StringKeyword:
                    case SyntaxKind.SymbolKeyword:
                    case SyntaxKind.VoidKeyword:
                    case SyntaxKind.UndefinedKeyword:
                    case SyntaxKind.NeverKeyword:
                        return true;
                }
                if (isLiteralTypeNode(a) && isLiteralTypeNode(b)) {
                    let aLiteral = a.literal;
                    let bLiteral = b.literal;
                    while (true) {
                        switch (aLiteral.kind) {
                            case SyntaxKind.NullKeyword:
                            case SyntaxKind.TrueKeyword:
                            case SyntaxKind.FalseKeyword:
                                return aLiteral.kind === bLiteral.kind;
                            case SyntaxKind.NumericLiteral:
                                return aLiteral.kind === bLiteral.kind && +aLiteral.text === +(bLiteral).text;
                            case SyntaxKind.StringLiteral:
                            case SyntaxKind.NoSubstitutionTemplateLiteral:
                                return (bLiteral.kind === SyntaxKind.StringLiteral || bLiteral.kind === SyntaxKind.NoSubstitutionTemplateLiteral)
                                    && aLiteral.text === (bLiteral).text;
                            case SyntaxKind.PrefixUnaryExpression:
                                const aUnary = (aLiteral as PrefixUnaryExpression);
                                const bUnary = (bLiteral as PrefixUnaryExpression);
                                if (aUnary.operator !== bUnary.operator) return false;

                                aLiteral = aUnary.operand as LiteralExpression;
                                bLiteral = bUnary.operand as LiteralExpression;
                                return +aLiteral.text === +bLiteral.text;
                            default:
                                return false;
                        }
                    }
                }
                else if (isArrayTypeNode(a) && isArrayTypeNode(b)) {
                    return typesEqual(a.elementType, aErrorTarget, b.elementType, bErrorTarget);
                }
                else if (isTypeReferenceNode(a) && isTypeReferenceNode(b)) {
                    if (!entityNameEqual(a.typeName, b.typeName)) {
                        return false;
                    }
                    return nodeTypeArgumentsEqual(a, aErrorTarget, b, bErrorTarget);
                }
                else if (isTypeLiteralNode(a) && isTypeLiteralNode(b)) {
                    if (a.members.length !== b.members.length) return false;
                    const aTypeInfo = getTypeInfo(a, aErrorTarget);
                    if (!aTypeInfo) return false;

                    for (const bMember of b.members) {
                        const bIsMethod = isMethodSignature(bMember);
                        const bIsProp = isPropertySignature(bMember);
                        if (bIsMethod || bIsProp) {
                            const memberKey = getMemberKey(bMember);
                            if (memberKey === undefined) {
                                makeInvalidTypeAndReport(bErrorTarget ?? bMember);
                                break;
                            }
                            const aMember = aTypeInfo.members.get(memberKey);
                            if (!aMember) return false;
                            if ((aMember.questionToken !== undefined) !== (bMember.questionToken !== undefined)) return false;
                            if (getSyntacticModifierFlags(aMember) !== getSyntacticModifierFlags(bMember)) return false;
                            if (bIsProp && isPropertySignature(aMember)) {
                                if (!typesEqual(aMember.type, aErrorTarget, bMember.type, bErrorTarget)) {
                                    return false;
                                }
                            }
                            else if (bIsMethod && isMethodSignature(aMember)) {
                                return signatureEqual(aMember, aErrorTarget, bMember, bErrorTarget)
                            }
                        }
                        else {
                            makeInvalidTypeAndReport(bErrorTarget ?? bMember);
                        }
                    }
                    return true;
                }
                else if (isFunctionTypeNode(a) && isFunctionTypeNode(b)) {
                    return signatureEqual(a, aErrorTarget, b, bErrorTarget);
                }
                else if (isConstructorTypeNode(a) && isConstructorTypeNode(b)) {
                    return signatureEqual(a, aErrorTarget, b, bErrorTarget);
                }
                else if (isTypeQueryNode(a) && isTypeQueryNode(b)) {
                    if (!entityNameEqual(a.exprName, b.exprName)) {
                        return false;
                    }
                    return nodeTypeArgumentsEqual(a, aErrorTarget, b, bErrorTarget);
                }
                else {
                    return false;
                }
            }
        }
        function normalizeObjectUnion(nodes: (TypeNode | undefined)[]) {
            const allProps = new Map<string, {
                name: PropertyName,
                isReadonly: boolean,
                types: (TypeNode | undefined)[]
            }>();
            const allTypeLookup = new Array<Map<string, TypeNode> | undefined>();
            let hasChanged = false;
            for (let i = 0; i < nodes.length; i++) {
                const type = nodes[i];
                const typeLookup = new Map<string, TypeNode>();
                allTypeLookup.push(typeLookup);

                if (!type || !isTypeLiteralNode(type)) continue;
                for (const member of type.members) {
                    const isMethod = isMethodSignature(member);
                    const isProp = isPropertySignature(member);
                    if (isMethod || isProp) {
                        const memberKey = getMemberKey(member);
                        if (memberKey === undefined) {
                            nodes[i] = makeInvalidTypeAndReport(member.name);
                            allTypeLookup[i] = undefined;
                            hasChanged = true;
                            break;
                        }
                        let type;
                        if (isProp) {
                            type = member.type ?? makeInvalidTypeAndReport(member);
                        }
                        else {
                            type = factory.createFunctionTypeNode(
                                member.typeParameters,
                                member.parameters,
                                member.type!,
                            );
                        }
                        let propInfo = allProps.get(memberKey);
                        if (!propInfo) {
                            propInfo = {
                                types: new Array(nodes.length),
                                name: member.name,
                                isReadonly: false,
                            };
                            allProps.set(memberKey, propInfo);
                        }
                        propInfo.types[i] = type;
                        propInfo.isReadonly ||= !!(getSyntacticModifierFlags(member) & ModifierFlags.Readonly)
                        typeLookup.set(memberKey, type);
                    }
                    else {
                        nodes[i] = makeInvalidTypeAndReport(member);
                        allTypeLookup[i] = undefined;
                        hasChanged = true;
                        break;
                    }
                }
            }
            for (const [, propTypes] of allProps) {
                normalizeObjectUnion(propTypes.types);
            }
            for (let typeIndex = 0; typeIndex < nodes.length; typeIndex++) {
                const type = nodes[typeIndex];
                const props = allTypeLookup[typeIndex];
                if (!type || !isTypeLiteralNode(type) || !props) continue;

                let newMembers: TypeElement[] | undefined;
                for (const [commonProp, propInfo] of allProps) {
                    const propType = props.get(commonProp);
                    if (propType) {
                        if (propType !== propInfo.types[typeIndex]) {
                            const indexOfProp = findIndex(type.members, e => isPropertySignature(e) && getMemberKey(e) === commonProp);
                            if (indexOfProp !== -1) {
                                if (newMembers === undefined) {
                                    newMembers = [...type.members];
                                }
                                const existingMember = type.members[indexOfProp] as PropertySignature;
                                newMembers[indexOfProp] = factory.createPropertySignature(
                                    existingMember.modifiers,
                                    existingMember.name,
                                    existingMember.questionToken,
                                    propInfo.types[typeIndex]
                                );
                            }
                        }
                    }
                    else {
                        if (newMembers === undefined) {
                            newMembers = [...type.members];
                        }
                        newMembers.push(factory.createPropertySignature(
                            propInfo.isReadonly ? [factory.createToken(SyntaxKind.ReadonlyKeyword)] : undefined,
                            deepClone(propInfo.name),
                            factory.createToken(SyntaxKind.QuestionToken),
                            factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword),
                        ));
                    }
                }
                if (newMembers) {
                    hasChanged = true;
                    nodes[typeIndex] = factory.createTypeLiteralNode(newMembers);
                }
            }
            return hasChanged;
        }
    }
    function inferReturnType(node: FunctionLikeDeclaration) {
        if (node.type) {
            return regular(deepClone(visitType(node.type, node)), node);
        }
        if (!node.body) {
            return regular(makeInvalidTypeAndReport(node), node);
        }

        const returnStatements: ReturnStatement[] = [];
        const yieldExpressions: YieldExpression[] = [];

        let returnType;
        if (!isBlock(node.body)) {
            returnType = makeUnionFromTypes(node, [
                localInference(node.body, NarrowBehavior.KeepLiterals)
            ], true);
        }
        else {
            collectReturnAndYield(node.body, returnStatements, yieldExpressions);
            if (returnStatements.length === 0) {
                returnType = regular(factory.createKeywordTypeNode(SyntaxKind.VoidKeyword), node);
            }
            else {
                returnType = inferFromOutputs(node, returnStatements, node.asteriskToken ? SyntaxKind.NeverKeyword : SyntaxKind.VoidKeyword);
            }
        }
        let yieldType: LocalTypeInfo | undefined;
        if (node.asteriskToken) {
            if (yieldExpressions.length === 0) {
                yieldType = regular(
                    factory.createKeywordTypeNode(SyntaxKind.NeverKeyword),
                    node
                );
            }
            else {
                yieldType = inferFromOutputs(node, yieldExpressions, strictNullChecks ? SyntaxKind.UndefinedKeyword : SyntaxKind.AnyKeyword);
            }
        }
        return makeFinalReturnType(node, returnType, yieldType);

        function inferFromOutputs(node: Node, statements: (YieldExpression | ReturnStatement)[], emptyType: KeywordTypeSyntaxKind) {
            const returnStatementInference: LocalTypeInfo[] = [];
            let hasOnlyEmpty = true;
            for (let r of statements) {
                if (r.expression) {
                    returnStatementInference.push(localInference(r.expression, NarrowBehavior.KeepLiterals));
                    hasOnlyEmpty = false;
                } else {
                    returnStatementInference.push(
                        createUndefinedTypeNode(r, LocalTypeInfoFlags.Fresh)
                    );
                }
            };
            if (hasOnlyEmpty) {
                return fresh(factory.createKeywordTypeNode(emptyType), node);
            } else {
                return makeUnionFromTypes(node, returnStatementInference, /*widenSingle*/ true);
            }
        }
        function makeFinalReturnType(node: FunctionLikeDeclaration, returnType: LocalTypeInfo, yieldType: LocalTypeInfo | undefined) {
            const modifiers = getEffectiveModifierFlags(node);
            if (node.asteriskToken) {
                const yieldTypeNode = yieldType?.typeNode ?? factory.createKeywordTypeNode(SyntaxKind.VoidKeyword);
                return regular(
                    factory.createTypeReferenceNode(
                        factory.createIdentifier(modifiers & ModifierFlags.Async ? "AsyncGenerator" : "Generator"),
                        [yieldTypeNode, returnType.typeNode, factory.createKeywordTypeNode(SyntaxKind.UnknownKeyword)],
                    ),
                    returnType.sourceNode,
                    returnType.flags
                );
            }
            else if (modifiers & ModifierFlags.Async) {
                return regular(
                    factory.createTypeReferenceNode(
                        factory.createIdentifier("Promise"),
                        [returnType.typeNode],
                    ),
                    returnType.sourceNode,
                    returnType.flags
                );
            }
            return returnType;
        }
        function collectReturnAndYield(node: Node, result: ReturnStatement[], yieldExpressions: YieldExpression[]) {
            forEachChild(node, child => {
                if (isReturnStatement(child)) {
                    result.push(child);
                }
                if (isYieldExpression(child)) {
                    yieldExpressions.push(child);
                }
                if (isClassLike(child) || isFunctionLike(child)) {
                    return;
                }
                // TODO: Do not walk all children if not generator function
                collectReturnAndYield(child, result, yieldExpressions);
            });
        }
    }
    function inferFunctionMembers(scope: { statements: NodeArray<Statement> }, functionName: Identifier, localType: LocalTypeInfo): LocalTypeInfo {
        if (!isFunctionTypeNode(localType.typeNode)) return localType;
        let mergedFlags = LocalTypeInfoFlags.None;
        let members = new Map<string, {
            name: PropertyName,
            type: LocalTypeInfo[]
        }>();
        for (let i = 0; i < scope.statements.length; i++) {
            const statement = scope.statements[i];
            // Looking for name functionName.member = init;
            if (!isExpressionStatement(statement)) continue;
            if(!isBinaryExpression(statement.expression)) continue;
            const assignment = statement.expression;
            if(assignment.operatorToken.kind !== SyntaxKind.EqualsToken) continue;
            
            const isPropertyAccess = isPropertyAccessExpression(assignment.left);
            if(isPropertyAccess || isElementAccessExpression(assignment.left)
                && isIdentifier(assignment.left.expression)
                && assignment.left.expression.escapedText === functionName.escapedText) {
                
                let name;
                if(isPropertyAccess) {
                    name = deepClone(assignment.left.name);
                } else {
                    const argumentExpression = visitNode(assignment.left.argumentExpression, visitDeclarationSubtree, isExpression)!;
                    name = factory.createComputedPropertyName(deepClone(argumentExpression));
                }
                const key = getMemberNameKey(name);
                if(!key) {
                    continue;
                }

                const propType = localInference(assignment.right);
                let memberInfo = members.get(key);
                if(!memberInfo) {
                    members.set(key, memberInfo = {
                        name,
                        type: []
                    })
                }
                memberInfo.type.push(propType);
            }
        }
        if (members.size) {
            const inferredMembers = [
                factory.createCallSignature(
                    localType.typeNode.typeParameters,
                    localType.typeNode.parameters,
                    localType.typeNode.type
                )
            ];
            for(const member of members.values()) {
                const propType = makeUnionFromTypes(member.name, member.type, false);
                mergedFlags = mergeFlags(mergedFlags, propType.flags);
                
                factory.createPropertySignature(
                    [],
                    member.name,
                    undefined,
                    propType.typeNode
                )
            }
            return {
                sourceNode: localType.sourceNode,
                flags: mergeFlags(localType.flags, mergedFlags) ,
                typeNode: factory.createTypeLiteralNode(
                    inferredMembers
                ),
            }
        }
        return localType;
    }

    // Copied similar function in checker. Maybe a reusable one should be created.
    function deepClone<T extends Node>(node: T): T {
        const clonedNode = visitEachChild(node, deepClone, nullTransformationContext, deepCloneNodes);
        // If node has children visitEachChild will already return a new node
        if (clonedNode !== node) {
            return clonedNode!;
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


    function localInferenceFromInitializer(node: HasInferredType | ExportAssignment): TypeNode | undefined {
        if (NO_LOCAL_INFERENCE) {
            return undefined;
        }
        let localType;
        let actualTypeNode: Node = node;
        if (isExportAssignment(node) && node.expression) {
            localType = localInference(node.expression);
            actualTypeNode = node.expression;
        }
        else if (isParameter(node) && node.initializer) {
            localType = localInference(node.initializer);
        }
        else if (isVariableDeclaration(node) && node.initializer) {

            localType = localInference(node.initializer, node.parent.flags & NodeFlags.Const ? NarrowBehavior.KeepLiterals : NarrowBehavior.None);
            if (isVariableStatement(node.parent.parent) &&
                node.parent.flags & NodeFlags.Const &&
                isIdentifier(node.name) &&
                (isBlock(node.parent.parent.parent) || isSourceFile(node.parent.parent.parent))) {
                localType = inferFunctionMembers(node.parent.parent.parent, node.name, localType);
            }
        }
        else if (isPropertyDeclaration(node) && node.initializer) {
            localType = localInference(node.initializer);
        }
        else if (isFunctionDeclaration(node)) {
            localType = inferReturnType(node);
        }
        else if (isMethodDeclaration(node)) {
            localType = inferReturnType(node);
        }
        else if (isGetAccessorDeclaration(node)) {
            localType = inferReturnType(node);
        }

        if(!localType || localType.flags & LocalTypeInfoFlags.Invalid) {
            return undefined;
        }

        const typeNode = localType.typeNode;
        setParent(typeNode, node);
        const result = resolver.isSyntheticTypeEquivalent(actualTypeNode, typeNode, Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit);
        if (result !== true) {
            result.forEach(r => context.addDiagnostic(r as DiagnosticWithLocation));
            return makeInvalidType();
        }

        return typeNode;
    }
}