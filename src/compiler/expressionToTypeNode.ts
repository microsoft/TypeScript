import {
    AccessorDeclaration,
    AllAccessorDeclarations,
    ArrayLiteralExpression,
    ArrowFunction,
    AsExpression,
    BinaryExpression,
    ClassExpression,
    CompilerOptions,
    ConditionalTypeNode,
    countWhere,
    Debug,
    Declaration,
    ElementAccessExpression,
    EmitFlags,
    Expression,
    factory,
    findAncestor,
    forEachReturnStatement,
    FunctionExpression,
    FunctionFlags,
    FunctionLikeDeclaration,
    GetAccessorDeclaration,
    getEffectiveReturnTypeNode,
    getEffectiveSetAccessorTypeAnnotationNode,
    getEffectiveTypeAnnotationNode,
    getEmitFlags,
    getEmitScriptTarget,
    getFunctionFlags,
    getJSDocType,
    getJSDocTypeAssertionType,
    getSourceFileOfNode,
    getStrictOptionValue,
    hasDynamicName,
    HasInferredType,
    Identifier,
    ImportTypeNode,
    IndexedAccessTypeNode,
    IntersectionTypeNode,
    IntroducesNewScopeNode,
    isAsExpression,
    isBlock,
    isCallExpression,
    isComputedPropertyName,
    isConditionalTypeNode,
    isConstTypeReference,
    isDeclaration,
    isDeclarationReadonly,
    isEntityName,
    isEntityNameExpression,
    isExpressionWithTypeArguments,
    isFunctionLike,
    isFunctionLikeDeclaration,
    isGetAccessor,
    isIdentifier,
    isIdentifierText,
    isImportAttributes,
    isImportTypeNode,
    isIndexedAccessTypeNode,
    isInJSFile,
    isJSDocAllType,
    isJSDocConstructSignature,
    isJSDocFunctionType,
    isJSDocIndexSignature,
    isJSDocNonNullableType,
    isJSDocNullableType,
    isJSDocOptionalType,
    isJSDocTypeAssertion,
    isJSDocTypeExpression,
    isJSDocTypeLiteral,
    isJSDocUnknownType,
    isJSDocVariadicType,
    isJsxElement,
    isJsxExpression,
    isKeyword,
    isLiteralImportTypeNode,
    isLiteralTypeNode,
    isMappedTypeNode,
    isModifier,
    isNamedDeclaration,
    isNewScopeNode,
    isOptionalDeclaration,
    isParameter,
    isPrimitiveLiteralValue,
    isPropertyDeclaration,
    isPropertySignature,
    isShorthandPropertyAssignment,
    isSpreadAssignment,
    isStringLiteral,
    isThisTypeNode,
    isTupleTypeNode,
    isTypeAssertionExpression,
    isTypeLiteralNode,
    isTypeNode,
    isTypeOperatorNode,
    isTypeParameterDeclaration,
    isTypePredicateNode,
    isTypeQueryNode,
    isTypeReferenceNode,
    isUnionTypeNode,
    isValueSignatureDeclaration,
    isVarConstLike,
    isVariableDeclaration,
    JSDocParameterTag,
    JSDocPropertyTag,
    JSDocSignature,
    JsxAttributeValue,
    KeywordTypeSyntaxKind,
    map,
    mapDefined,
    MethodDeclaration,
    Mutable,
    Node,
    NodeArray,
    NodeBuilderFlags,
    NodeFlags,
    nodeIsMissing,
    NoSubstitutionTemplateLiteral,
    ObjectLiteralExpression,
    ParameterDeclaration,
    ParenthesizedExpression,
    ParenthesizedTypeNode,
    PrefixUnaryExpression,
    PrimitiveLiteral,
    PropertyAccessExpression,
    PropertyAssignment,
    PropertyDeclaration,
    PropertyName,
    PropertySignature,
    SetAccessorDeclaration,
    setCommentRange,
    setEmitFlags,
    setOriginalNode,
    setTextRangePosEnd,
    ShorthandPropertyAssignment,
    SignatureDeclaration,
    skipTypeParentheses,
    StringLiteral,
    Symbol,
    SyntacticNodeBuilder,
    SyntacticTypeNodeBuilderContext,
    SyntacticTypeNodeBuilderResolver,
    SyntaxKind,
    TypeAssertion,
    TypeElement,
    TypeNode,
    TypeOperatorNode,
    TypeParameterDeclaration,
    TypeQueryNode,
    TypeReferenceNode,
    UnionTypeNode,
    VariableDeclaration,
    visitEachChild as visitEachChildWorker,
    visitNode,
    visitNodes,
    Visitor,
    walkUpParenthesizedExpressions,
} from "./_namespaces/ts.js";

type SyntacticResult =
    | { type: TypeNode; reportFallback: undefined; }
    | { type: undefined; reportFallback: true; }
    | { type: undefined; reportFallback: false; };
function syntacticResult(type: TypeNode | undefined): SyntacticResult;
function syntacticResult(type: undefined, reportFallback: boolean): SyntacticResult;
function syntacticResult(type: TypeNode | undefined, reportFallback: boolean = true) {
    return { type, reportFallback } as SyntacticResult;
}
const notImplemented: SyntacticResult = syntacticResult(/*type*/ undefined, /*reportFallback*/ false);
const alreadyReported: SyntacticResult = syntacticResult(/*type*/ undefined, /*reportFallback*/ false);
const failed: SyntacticResult = syntacticResult(/*type*/ undefined, /*reportFallback*/ true);

/** @internal */
export function createSyntacticTypeNodeBuilder(
    options: CompilerOptions,
    resolver: SyntacticTypeNodeBuilderResolver,
): SyntacticNodeBuilder {
    const strictNullChecks = getStrictOptionValue(options, "strictNullChecks");

    return {
        serializeTypeOfDeclaration,
        serializeReturnTypeForSignature,
        serializeTypeOfExpression,
        serializeTypeOfAccessor,
        tryReuseExistingTypeNode(context: SyntacticTypeNodeBuilderContext, existing: TypeNode): TypeNode | undefined {
            if (!resolver.canReuseTypeNode(context, existing)) {
                return undefined;
            }
            return tryReuseExistingTypeNode(context, existing);
        },
    };

    function reuseNode<T extends Node>(context: SyntacticTypeNodeBuilderContext, node: T, range?: Node): T;
    function reuseNode<T extends Node>(context: SyntacticTypeNodeBuilderContext, node: T | undefined, range?: Node): T | undefined;
    function reuseNode<T extends Node>(context: SyntacticTypeNodeBuilderContext, node: T | undefined, range: Node | undefined = node) {
        return node === undefined ? undefined : resolver.markNodeReuse(context, node.flags & NodeFlags.Synthesized ? node : factory.cloneNode(node), range ?? node);
    }
    function tryReuseExistingTypeNode(context: SyntacticTypeNodeBuilderContext, existing: TypeNode): TypeNode | undefined {
        const { finalizeBoundary, startRecoveryScope, hadError, markError } = resolver.createRecoveryBoundary(context);
        const transformed = visitNode(existing, visitExistingNodeTreeSymbols, isTypeNode);
        if (!finalizeBoundary()) {
            return undefined;
        }
        context.approximateLength += existing.end - existing.pos;
        return transformed;

        function visitExistingNodeTreeSymbols(node: Node): Node | undefined {
            // If there was an error in a sibling node bail early, the result will be discarded anyway
            if (hadError()) return node;
            const recover = startRecoveryScope();

            const onExitNewScope = isNewScopeNode(node) ? resolver.enterNewScope(context, node) : undefined;
            const result = visitExistingNodeTreeSymbolsWorker(node);
            onExitNewScope?.();

            // If there was an error, maybe we can recover by serializing the actual type of the node
            if (hadError()) {
                if (isTypeNode(node) && !isTypePredicateNode(node)) {
                    recover();
                    return resolver.serializeExistingTypeNode(context, node);
                }
                return node;
            }
            // We want to clone the subtree, so when we mark it up with __pos and __end in quickfixes,
            //  we don't get odd behavior because of reused nodes. We also need to clone to _remove_
            //  the position information if the node comes from a different file than the one the node builder
            //  is set to build for (even though we are reusing the node structure, the position information
            //  would make the printer print invalid spans for literals and identifiers, and the formatter would
            //  choke on the mismatched positonal spans between a parent and an injected child from another file).
            return result ? resolver.markNodeReuse(context, result, node) : undefined;
        }

        function tryVisitSimpleTypeNode(node: TypeNode): TypeNode | undefined {
            const innerNode = skipTypeParentheses(node);
            switch (innerNode.kind) {
                case SyntaxKind.TypeReference:
                    return tryVisitTypeReference(innerNode as TypeReferenceNode);
                case SyntaxKind.TypeQuery:
                    return tryVisitTypeQuery(innerNode as TypeQueryNode);
                case SyntaxKind.IndexedAccessType:
                    return tryVisitIndexedAccess(innerNode as IndexedAccessTypeNode);
                case SyntaxKind.TypeOperator:
                    const typeOperatorNode = innerNode as TypeOperatorNode;
                    if (typeOperatorNode.operator === SyntaxKind.KeyOfKeyword) {
                        return tryVisitKeyOf(typeOperatorNode);
                    }
            }
            return visitNode(node, visitExistingNodeTreeSymbols, isTypeNode);
        }

        function tryVisitIndexedAccess(node: IndexedAccessTypeNode): TypeNode | undefined {
            const resultObjectType = tryVisitSimpleTypeNode(node.objectType);
            if (resultObjectType === undefined) {
                return undefined;
            }
            return factory.updateIndexedAccessTypeNode(node, resultObjectType, visitNode(node.indexType, visitExistingNodeTreeSymbols, isTypeNode)!);
        }

        function tryVisitKeyOf(node: TypeOperatorNode): TypeNode | undefined {
            Debug.assertEqual(node.operator, SyntaxKind.KeyOfKeyword);
            const type = tryVisitSimpleTypeNode(node.type);
            if (type === undefined) {
                return undefined;
            }
            return factory.updateTypeOperatorNode(node, type);
        }

        function tryVisitTypeQuery(node: TypeQueryNode): TypeNode | undefined {
            const { introducesError, node: exprName } = resolver.trackExistingEntityName(context, node.exprName);
            if (!introducesError) {
                return factory.updateTypeQueryNode(
                    node,
                    exprName,
                    visitNodes(node.typeArguments, visitExistingNodeTreeSymbols, isTypeNode),
                );
            }

            const serializedName = resolver.serializeTypeName(context, node.exprName, /*isTypeOf*/ true);
            if (serializedName) {
                return resolver.markNodeReuse(context, serializedName, node.exprName);
            }
        }

        function tryVisitTypeReference(node: TypeReferenceNode): TypeNode | undefined {
            if (resolver.canReuseTypeNode(context, node)) {
                const { introducesError, node: newName } = resolver.trackExistingEntityName(context, node.typeName);
                const typeArguments = visitNodes(node.typeArguments, visitExistingNodeTreeSymbols, isTypeNode);

                if (!introducesError) {
                    const updated = factory.updateTypeReferenceNode(
                        node,
                        newName,
                        typeArguments,
                    );
                    return resolver.markNodeReuse(context, updated, node);
                }
                else {
                    const serializedName = resolver.serializeTypeName(context, node.typeName, /*isTypeOf*/ false, typeArguments);
                    if (serializedName) {
                        return resolver.markNodeReuse(context, serializedName, node.typeName);
                    }
                }
            }
        }

        function visitExistingNodeTreeSymbolsWorker(node: Node): Node | undefined {
            if (isJSDocTypeExpression(node)) {
                // Unwrap JSDocTypeExpressions
                return visitNode(node.type, visitExistingNodeTreeSymbols, isTypeNode);
            }
            // We don't _actually_ support jsdoc namepath types, emit `any` instead
            if (isJSDocAllType(node) || node.kind === SyntaxKind.JSDocNamepathType) {
                return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
            }
            if (isJSDocUnknownType(node)) {
                return factory.createKeywordTypeNode(SyntaxKind.UnknownKeyword);
            }
            if (isJSDocNullableType(node)) {
                return factory.createUnionTypeNode([visitNode(node.type, visitExistingNodeTreeSymbols, isTypeNode)!, factory.createLiteralTypeNode(factory.createNull())]);
            }
            if (isJSDocOptionalType(node)) {
                return factory.createUnionTypeNode([visitNode(node.type, visitExistingNodeTreeSymbols, isTypeNode)!, factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword)]);
            }
            if (isJSDocNonNullableType(node)) {
                return visitNode(node.type, visitExistingNodeTreeSymbols);
            }
            if (isJSDocVariadicType(node)) {
                return factory.createArrayTypeNode(visitNode(node.type, visitExistingNodeTreeSymbols, isTypeNode)!);
            }
            if (isJSDocTypeLiteral(node)) {
                return factory.createTypeLiteralNode(map(node.jsDocPropertyTags, t => {
                    const name = visitNode(isIdentifier(t.name) ? t.name : t.name.right, visitExistingNodeTreeSymbols, isIdentifier)!;
                    const overrideTypeNode = resolver.getJsDocPropertyOverride(context, node, t);

                    return factory.createPropertySignature(
                        /*modifiers*/ undefined,
                        name,
                        t.isBracketed || t.typeExpression && isJSDocOptionalType(t.typeExpression.type) ? factory.createToken(SyntaxKind.QuestionToken) : undefined,
                        overrideTypeNode || (t.typeExpression && visitNode(t.typeExpression.type, visitExistingNodeTreeSymbols, isTypeNode)) || factory.createKeywordTypeNode(SyntaxKind.AnyKeyword),
                    );
                }));
            }
            if (isTypeReferenceNode(node) && isIdentifier(node.typeName) && node.typeName.escapedText === "") {
                return setOriginalNode(factory.createKeywordTypeNode(SyntaxKind.AnyKeyword), node);
            }
            if ((isExpressionWithTypeArguments(node) || isTypeReferenceNode(node)) && isJSDocIndexSignature(node)) {
                return factory.createTypeLiteralNode([factory.createIndexSignature(
                    /*modifiers*/ undefined,
                    [factory.createParameterDeclaration(
                        /*modifiers*/ undefined,
                        /*dotDotDotToken*/ undefined,
                        "x",
                        /*questionToken*/ undefined,
                        visitNode(node.typeArguments![0], visitExistingNodeTreeSymbols, isTypeNode),
                    )],
                    visitNode(node.typeArguments![1], visitExistingNodeTreeSymbols, isTypeNode),
                )]);
            }
            if (isJSDocFunctionType(node)) {
                if (isJSDocConstructSignature(node)) {
                    let newTypeNode: TypeNode | undefined;
                    return factory.createConstructorTypeNode(
                        /*modifiers*/ undefined,
                        visitNodes(node.typeParameters, visitExistingNodeTreeSymbols, isTypeParameterDeclaration),
                        mapDefined(node.parameters, (p, i) =>
                            p.name && isIdentifier(p.name) && p.name.escapedText === "new" ? (newTypeNode = p.type, undefined) : factory.createParameterDeclaration(
                                /*modifiers*/ undefined,
                                getEffectiveDotDotDotForParameter(p),
                                resolver.markNodeReuse(context, factory.createIdentifier(getNameForJSDocFunctionParameter(p, i)), p),
                                factory.cloneNode(p.questionToken),
                                visitNode(p.type, visitExistingNodeTreeSymbols, isTypeNode),
                                /*initializer*/ undefined,
                            )),
                        visitNode(newTypeNode || node.type, visitExistingNodeTreeSymbols, isTypeNode) || factory.createKeywordTypeNode(SyntaxKind.AnyKeyword),
                    );
                }
                else {
                    return factory.createFunctionTypeNode(
                        visitNodes(node.typeParameters, visitExistingNodeTreeSymbols, isTypeParameterDeclaration),
                        map(node.parameters, (p, i) =>
                            factory.createParameterDeclaration(
                                /*modifiers*/ undefined,
                                getEffectiveDotDotDotForParameter(p),
                                resolver.markNodeReuse(context, factory.createIdentifier(getNameForJSDocFunctionParameter(p, i)), p),
                                factory.cloneNode(p.questionToken),
                                visitNode(p.type, visitExistingNodeTreeSymbols, isTypeNode),
                                /*initializer*/ undefined,
                            )),
                        visitNode(node.type, visitExistingNodeTreeSymbols, isTypeNode) || factory.createKeywordTypeNode(SyntaxKind.AnyKeyword),
                    );
                }
            }
            if (isThisTypeNode(node)) {
                if (resolver.canReuseTypeNode(context, node)) {
                    return node;
                }
                markError();
                return node;
            }
            if (isTypeParameterDeclaration(node)) {
                const { node: newName } = resolver.trackExistingEntityName(context, node.name);
                return factory.updateTypeParameterDeclaration(
                    node,
                    visitNodes(node.modifiers, visitExistingNodeTreeSymbols, isModifier),
                    // resolver.markNodeReuse(context, typeParameterToName(getDeclaredTypeOfSymbol(getSymbolOfDeclaration(node)), context), node),
                    newName,
                    visitNode(node.constraint, visitExistingNodeTreeSymbols, isTypeNode),
                    visitNode(node.default, visitExistingNodeTreeSymbols, isTypeNode),
                );
            }
            if (isIndexedAccessTypeNode(node)) {
                const result = tryVisitIndexedAccess(node);
                if (!result) {
                    markError();
                    return node;
                }
                return result;
            }

            if (isTypeReferenceNode(node)) {
                const result = tryVisitTypeReference(node);
                if (result) {
                    return result;
                }
                markError();
                return node;
            }
            if (isLiteralImportTypeNode(node)) {
                // assert keyword in imported attributes is deprecated, so we don't reuse types that contain it
                // Ex: import("pkg", { assert: {} }
                if (node.attributes?.token === SyntaxKind.AssertKeyword) {
                    markError();
                    return node;
                }
                if (!resolver.canReuseTypeNode(context, node)) {
                    return resolver.serializeExistingTypeNode(context, node);
                }
                const specifier = rewriteModuleSpecifier(node, node.argument.literal);
                const literal = specifier === node.argument.literal ? reuseNode(context, node.argument.literal) : specifier;
                return factory.updateImportTypeNode(
                    node,
                    literal === node.argument.literal ? reuseNode(context, node.argument) : factory.createLiteralTypeNode(literal),
                    visitNode(node.attributes, visitExistingNodeTreeSymbols, isImportAttributes),
                    visitNode(node.qualifier, visitExistingNodeTreeSymbols, isEntityName),
                    visitNodes(node.typeArguments, visitExistingNodeTreeSymbols, isTypeNode),
                    node.isTypeOf,
                );
            }
            if (isNamedDeclaration(node) && node.name.kind === SyntaxKind.ComputedPropertyName && !resolver.hasLateBindableName(node)) {
                if (!hasDynamicName(node)) {
                    return visitEachChild(node, visitExistingNodeTreeSymbols);
                }
                if (resolver.shouldRemoveDeclaration(context, node)) {
                    return undefined;
                }
            }
            if (
                (isFunctionLike(node) && !node.type)
                || (isPropertyDeclaration(node) && !node.type && !node.initializer)
                || (isPropertySignature(node) && !node.type && !node.initializer)
                || (isParameter(node) && !node.type && !node.initializer)
            ) {
                let visited = visitEachChild(node, visitExistingNodeTreeSymbols);
                if (visited === node) {
                    visited = resolver.markNodeReuse(context, factory.cloneNode(node), node);
                }
                (visited as Mutable<typeof visited>).type = factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
                if (isParameter(node)) {
                    (visited as Mutable<ParameterDeclaration>).modifiers = undefined;
                }
                return visited;
            }
            if (isTypeQueryNode(node)) {
                const result = tryVisitTypeQuery(node);
                if (!result) {
                    markError();
                    return node;
                }
                return result;
            }
            if (isComputedPropertyName(node) && isEntityNameExpression(node.expression)) {
                const { node: result, introducesError } = resolver.trackExistingEntityName(context, node.expression);
                if (!introducesError) {
                    return factory.updateComputedPropertyName(node, result);
                }
                else {
                    const computedPropertyNameType = resolver.serializeTypeOfExpression(context, node.expression);
                    let literal;
                    if (isLiteralTypeNode(computedPropertyNameType)) {
                        literal = computedPropertyNameType.literal;
                    }
                    else {
                        const evaluated = resolver.evaluateEntityNameExpression(node.expression);
                        const literalNode = typeof evaluated.value === "string" ? factory.createStringLiteral(evaluated.value, /*isSingleQuote*/ undefined) :
                            typeof evaluated.value === "number" ? factory.createNumericLiteral(evaluated.value, /*numericLiteralFlags*/ 0) :
                            undefined;
                        if (!literalNode) {
                            if (isImportTypeNode(computedPropertyNameType)) {
                                resolver.trackComputedName(context, node.expression);
                            }
                            return node;
                        }
                        literal = literalNode;
                    }
                    if (literal.kind === SyntaxKind.StringLiteral && isIdentifierText(literal.text, getEmitScriptTarget(options))) {
                        return factory.createIdentifier(literal.text);
                    }
                    if (literal.kind === SyntaxKind.NumericLiteral && !literal.text.startsWith("-")) {
                        return literal;
                    }
                    return factory.updateComputedPropertyName(node, literal);
                }
            }
            if (isTypePredicateNode(node)) {
                let parameterName;
                if (isIdentifier(node.parameterName)) {
                    const { node: result, introducesError } = resolver.trackExistingEntityName(context, node.parameterName);
                    // Should not usually happen the only case is when a type predicate comes from a JSDoc type annotation with it's own parameter symbol definition.
                    // /** @type {(v: unknown) => v is undefined} */
                    // const isUndef = v => v === undefined;
                    if (introducesError) markError();
                    parameterName = result;
                }
                else {
                    parameterName = factory.cloneNode(node.parameterName);
                }
                return factory.updateTypePredicateNode(node, factory.cloneNode(node.assertsModifier), parameterName, visitNode(node.type, visitExistingNodeTreeSymbols, isTypeNode));
            }

            if (isTupleTypeNode(node) || isTypeLiteralNode(node) || isMappedTypeNode(node)) {
                const visited = visitEachChild(node, visitExistingNodeTreeSymbols);
                const clone = resolver.markNodeReuse(context, visited === node ? factory.cloneNode(node) : visited, node);
                const flags = getEmitFlags(clone);
                setEmitFlags(clone, flags | (context.flags & NodeBuilderFlags.MultilineObjectLiterals && isTypeLiteralNode(node) ? 0 : EmitFlags.SingleLine));
                return clone;
            }
            if (isStringLiteral(node) && !!(context.flags & NodeBuilderFlags.UseSingleQuotesForStringLiteralType) && !node.singleQuote) {
                const clone = factory.cloneNode(node);
                (clone as Mutable<typeof clone>).singleQuote = true;
                return clone;
            }
            if (isConditionalTypeNode(node)) {
                const checkType = visitNode(node.checkType, visitExistingNodeTreeSymbols, isTypeNode)!;

                const disposeScope = resolver.enterNewScope(context, node);
                const extendType = visitNode(node.extendsType, visitExistingNodeTreeSymbols, isTypeNode)!;
                const trueType = visitNode(node.trueType, visitExistingNodeTreeSymbols, isTypeNode)!;
                disposeScope();
                const falseType = visitNode(node.falseType, visitExistingNodeTreeSymbols, isTypeNode)!;
                return factory.updateConditionalTypeNode(
                    node,
                    checkType,
                    extendType,
                    trueType,
                    falseType,
                );
            }

            if (isTypeOperatorNode(node)) {
                if (node.operator === SyntaxKind.UniqueKeyword && node.type.kind === SyntaxKind.SymbolKeyword) {
                    if (!resolver.canReuseTypeNode(context, node)) {
                        markError();
                        return node;
                    }
                }
                else if (node.operator === SyntaxKind.KeyOfKeyword) {
                    const result = tryVisitKeyOf(node);
                    if (!result) {
                        markError();
                        return node;
                    }
                    return result;
                }
            }

            return visitEachChild(node, visitExistingNodeTreeSymbols);

            function visitEachChild<T extends Node>(node: T, visitor: Visitor): T;
            function visitEachChild<T extends Node>(node: T | undefined, visitor: Visitor): T | undefined;
            function visitEachChild<T extends Node>(node: T | undefined, visitor: Visitor): T | undefined {
                const nonlocalNode = !context.enclosingFile || context.enclosingFile !== getSourceFileOfNode(node);
                return visitEachChildWorker(node, visitor, /*context*/ undefined, nonlocalNode ? visitNodesWithoutCopyingPositions : undefined);
            }

            function visitNodesWithoutCopyingPositions(
                nodes: NodeArray<Node> | undefined,
                visitor: Visitor,
                test?: (node: Node) => boolean,
                start?: number,
                count?: number,
            ): NodeArray<Node> | undefined {
                let result = visitNodes(nodes, visitor, test, start, count);
                if (result) {
                    if (result.pos !== -1 || result.end !== -1) {
                        if (result === nodes) {
                            result = factory.createNodeArray(nodes.slice(), nodes.hasTrailingComma);
                        }
                        setTextRangePosEnd(result, -1, -1);
                    }
                }
                return result;
            }

            function getEffectiveDotDotDotForParameter(p: ParameterDeclaration) {
                return p.dotDotDotToken || (p.type && isJSDocVariadicType(p.type) ? factory.createToken(SyntaxKind.DotDotDotToken) : undefined);
            }

            /** Note that `new:T` parameters are not handled, but should be before calling this function. */
            function getNameForJSDocFunctionParameter(p: ParameterDeclaration, index: number) {
                return p.name && isIdentifier(p.name) && p.name.escapedText === "this" ? "this"
                    : getEffectiveDotDotDotForParameter(p) ? `args`
                    : `arg${index}`;
            }

            function rewriteModuleSpecifier(parent: ImportTypeNode, lit: StringLiteral) {
                const newName = resolver.getModuleSpecifierOverride(context, parent, lit);
                return newName ? setOriginalNode(factory.createStringLiteral(newName), lit) : lit;
            }
        }
    }

    function serializeExistingTypeNode(typeNode: TypeNode, context: SyntacticTypeNodeBuilderContext, addUndefined?: boolean): TypeNode;
    function serializeExistingTypeNode(typeNode: TypeNode | undefined, context: SyntacticTypeNodeBuilderContext, addUndefined?: boolean): TypeNode | undefined;
    function serializeExistingTypeNode(typeNode: TypeNode | undefined, context: SyntacticTypeNodeBuilderContext, addUndefined?: boolean): TypeNode | undefined {
        if (!typeNode) return undefined;
        let result;
        if (
            (!addUndefined || canAddUndefined(typeNode)) && resolver.canReuseTypeNode(context, typeNode)
        ) {
            result = tryReuseExistingTypeNode(context, typeNode);
            if (result !== undefined) {
                result = addUndefinedIfNeeded(result, addUndefined, /*owner*/ undefined, context);
            }
        }
        return result;
    }
    function serializeTypeAnnotationOfDeclaration(declaredType: TypeNode | undefined, context: SyntacticTypeNodeBuilderContext, node: Declaration, symbol: Symbol | undefined, requiresAddingUndefined?: boolean, useFallback = requiresAddingUndefined !== undefined) {
        if (!declaredType) return undefined;
        if (!resolver.canReuseTypeNodeAnnotation(context, node, declaredType, symbol, requiresAddingUndefined)) {
            // If we need to add undefined, can add undefined, and the resolver says we can reuse the type, we reuse the type
            // If we don't know syntactically that we can add the undefined, we will report the fallback below.
            if (!requiresAddingUndefined || !resolver.canReuseTypeNodeAnnotation(context, node, declaredType, symbol, /*requiresAddingUndefined*/ false)) {
                return undefined;
            }
        }
        let result;
        if (!requiresAddingUndefined || canAddUndefined(declaredType)) {
            result = serializeExistingTypeNode(declaredType, context, requiresAddingUndefined);
        }
        if (result !== undefined || !useFallback) {
            return result;
        }
        context.tracker.reportInferenceFallback(node);
        return resolver.serializeExistingTypeNode(context, declaredType, requiresAddingUndefined) ?? factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
    }
    function serializeExistingTypeNodeWithFallback(typeNode: TypeNode | undefined, context: SyntacticTypeNodeBuilderContext, addUndefined?: boolean, targetNode?: Node) {
        if (!typeNode) return undefined;
        const result = serializeExistingTypeNode(typeNode, context, addUndefined);
        if (result !== undefined) {
            return result;
        }
        context.tracker.reportInferenceFallback(targetNode ?? typeNode);
        return resolver.serializeExistingTypeNode(context, typeNode, addUndefined) ?? factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
    }
    function serializeTypeOfAccessor(accessor: AccessorDeclaration, symbol: Symbol | undefined, context: SyntacticTypeNodeBuilderContext) {
        return typeFromAccessor(accessor, symbol, context) ?? inferAccessorType(accessor, resolver.getAllAccessorDeclarations(accessor), context, symbol);
    }

    function serializeTypeOfExpression(expr: Expression, context: SyntacticTypeNodeBuilderContext, addUndefined?: boolean, preserveLiterals?: boolean) {
        const result = typeFromExpression(expr, context, /*isConstContext*/ false, addUndefined, preserveLiterals);
        return result.type !== undefined ? result.type : inferExpressionType(expr, context, result.reportFallback);
    }
    function serializeTypeOfDeclaration(node: HasInferredType, symbol: Symbol, context: SyntacticTypeNodeBuilderContext) {
        switch (node.kind) {
            case SyntaxKind.Parameter:
            case SyntaxKind.JSDocParameterTag:
                return typeFromParameter(node, symbol, context);
            case SyntaxKind.VariableDeclaration:
                return typeFromVariable(node, symbol, context);
            case SyntaxKind.PropertySignature:
            case SyntaxKind.JSDocPropertyTag:
            case SyntaxKind.PropertyDeclaration:
                return typeFromProperty(node, symbol, context);
            case SyntaxKind.BindingElement:
                return inferTypeOfDeclaration(node, symbol, context);
            case SyntaxKind.ExportAssignment:
                return serializeTypeOfExpression(node.expression, context, /*addUndefined*/ undefined, /*preserveLiterals*/ true);
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.ElementAccessExpression:
            case SyntaxKind.BinaryExpression:
                return typeFromExpandoProperty(node, symbol, context);
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.ShorthandPropertyAssignment:
                return typeFromPropertyAssignment(node, symbol, context);
            default:
                Debug.assertNever(node, `Node needs to be an inferrable node, found ${Debug.formatSyntaxKind((node as Node).kind)}`);
        }
    }

    function typeFromPropertyAssignment(node: PropertyAssignment | ShorthandPropertyAssignment, symbol: Symbol, context: SyntacticTypeNodeBuilderContext) {
        const typeAnnotation = getEffectiveTypeAnnotationNode(node);
        let result;
        if (typeAnnotation && resolver.canReuseTypeNodeAnnotation(context, node, typeAnnotation, symbol)) {
            result = serializeExistingTypeNode(typeAnnotation, context);
        }
        if (!result && node.kind === SyntaxKind.PropertyAssignment) {
            const initializer = node.initializer;
            const assertionNode = isJSDocTypeAssertion(initializer) ? getJSDocTypeAssertionType(initializer) :
                initializer.kind === SyntaxKind.AsExpression || initializer.kind === SyntaxKind.TypeAssertionExpression ? (initializer as AsExpression | TypeAssertion).type :
                undefined;

            if (assertionNode && !isConstTypeReference(assertionNode) && resolver.canReuseTypeNodeAnnotation(context, node, assertionNode, symbol)) {
                result = serializeExistingTypeNode(assertionNode, context);
            }
        }
        return result ?? inferTypeOfDeclaration(node, symbol, context, /*reportFallback*/ false);
    }
    function serializeReturnTypeForSignature(node: SignatureDeclaration | JSDocSignature, symbol: Symbol, context: SyntacticTypeNodeBuilderContext) {
        switch (node.kind) {
            case SyntaxKind.GetAccessor:
                return serializeTypeOfAccessor(node, symbol, context);
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.CallSignature:
            case SyntaxKind.Constructor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.IndexSignature:
            case SyntaxKind.FunctionType:
            case SyntaxKind.ConstructorType:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.JSDocFunctionType:
            case SyntaxKind.JSDocSignature:
                return createReturnFromSignature(node, symbol, context);
            default:
                Debug.assertNever(node, `Node needs to be an inferrable node, found ${Debug.formatSyntaxKind((node as Node).kind)}`);
        }
    }
    function getTypeAnnotationFromAccessor(accessor: AccessorDeclaration): TypeNode | undefined {
        if (accessor) {
            return accessor.kind === SyntaxKind.GetAccessor
                ? (isInJSFile(accessor) && getJSDocType(accessor)) || getEffectiveReturnTypeNode(accessor)
                : getEffectiveSetAccessorTypeAnnotationNode(accessor);
        }
    }
    function getTypeAnnotationFromAllAccessorDeclarations(node: AccessorDeclaration, accessors: AllAccessorDeclarations) {
        let accessorType = getTypeAnnotationFromAccessor(node);
        if (!accessorType && node !== accessors.firstAccessor) {
            accessorType = getTypeAnnotationFromAccessor(accessors.firstAccessor);
        }
        if (!accessorType && accessors.secondAccessor && node !== accessors.secondAccessor) {
            accessorType = getTypeAnnotationFromAccessor(accessors.secondAccessor);
        }
        return accessorType;
    }

    function typeFromAccessor(node: AccessorDeclaration, symbol: Symbol | undefined, context: SyntacticTypeNodeBuilderContext): TypeNode | undefined {
        const accessorDeclarations = resolver.getAllAccessorDeclarations(node);
        const accessorType = getTypeAnnotationFromAllAccessorDeclarations(node, accessorDeclarations);
        if (accessorType && !isTypePredicateNode(accessorType)) {
            return withNewScope(context, node, () => serializeTypeAnnotationOfDeclaration(accessorType, context, node, symbol) ?? inferTypeOfDeclaration(node, symbol, context));
        }
        if (accessorDeclarations.getAccessor) {
            return withNewScope(context, accessorDeclarations.getAccessor, () => createReturnFromSignature(accessorDeclarations.getAccessor!, /*symbol*/ undefined, context));
        }
        return undefined;
    }
    function typeFromVariable(node: VariableDeclaration, symbol: Symbol, context: SyntacticTypeNodeBuilderContext): TypeNode | undefined {
        const declaredType = getEffectiveTypeAnnotationNode(node);
        let resultType = failed;
        if (declaredType) {
            resultType = syntacticResult(serializeTypeAnnotationOfDeclaration(declaredType, context, node, symbol));
        }
        else if (node.initializer && (symbol.declarations?.length === 1 || countWhere(symbol.declarations, isVariableDeclaration) === 1)) {
            if (!resolver.isExpandoFunctionDeclaration(node) && !isContextuallyTyped(node)) {
                resultType = typeFromExpression(node.initializer, context, /*isConstContext*/ undefined, /*requiresAddingUndefined*/ undefined, isVarConstLike(node));
            }
        }
        return resultType.type !== undefined ? resultType.type : inferTypeOfDeclaration(node, symbol, context, resultType.reportFallback);
    }
    function typeFromParameter(node: ParameterDeclaration | JSDocParameterTag, symbol: Symbol | undefined, context: SyntacticTypeNodeBuilderContext): TypeNode | undefined {
        const parent = node.parent;
        if (parent.kind === SyntaxKind.SetAccessor) {
            return serializeTypeOfAccessor(parent, /*symbol*/ undefined, context);
        }
        const declaredType = getEffectiveTypeAnnotationNode(node);
        const addUndefined = resolver.requiresAddingImplicitUndefined(node, symbol, context.enclosingDeclaration);
        let resultType = failed;
        if (declaredType) {
            resultType = syntacticResult(serializeTypeAnnotationOfDeclaration(declaredType, context, node, symbol, addUndefined));
        }
        else if (isParameter(node) && node.initializer && isIdentifier(node.name) && !isContextuallyTyped(node)) {
            resultType = typeFromExpression(node.initializer, context, /*isConstContext*/ undefined, addUndefined);
        }
        return resultType.type !== undefined ? resultType.type : inferTypeOfDeclaration(node, symbol, context, resultType.reportFallback);
    }
    /**
     * While expando poperies are errors in TSC, in JS we try to extract the type from the binary expression;
     */
    function typeFromExpandoProperty(node: PropertyAccessExpression | BinaryExpression | ElementAccessExpression, symbol: Symbol, context: SyntacticTypeNodeBuilderContext) {
        const declaredType = getEffectiveTypeAnnotationNode(node);
        let result;
        if (declaredType) {
            result = serializeTypeAnnotationOfDeclaration(declaredType, context, node, symbol);
        }
        const oldSuppressReportInferenceFallback = context.suppressReportInferenceFallback;
        context.suppressReportInferenceFallback = true;
        const resultType = result ?? inferTypeOfDeclaration(node, symbol, context, /*reportFallback*/ false);
        context.suppressReportInferenceFallback = oldSuppressReportInferenceFallback;
        return resultType;
    }
    function typeFromProperty(node: PropertyDeclaration | PropertySignature | JSDocPropertyTag, symbol: Symbol, context: SyntacticTypeNodeBuilderContext) {
        const declaredType = getEffectiveTypeAnnotationNode(node);
        const requiresAddingUndefined = resolver.requiresAddingImplicitUndefined(node, symbol, context.enclosingDeclaration);
        let resultType = failed;
        if (declaredType) {
            resultType = syntacticResult(serializeTypeAnnotationOfDeclaration(declaredType, context, node, symbol, requiresAddingUndefined));
        }
        else {
            const initializer = isPropertyDeclaration(node) ? node.initializer : undefined;
            if (initializer && !isContextuallyTyped(node)) {
                const isReadonly = isDeclarationReadonly(node);
                resultType = typeFromExpression(initializer, context, /*isConstContext*/ undefined, requiresAddingUndefined, isReadonly);
            }
        }
        return resultType.type !== undefined ? resultType.type : inferTypeOfDeclaration(node, symbol, context, resultType.reportFallback);
    }

    function inferTypeOfDeclaration(
        node: HasInferredType | GetAccessorDeclaration | SetAccessorDeclaration,
        symbol: Symbol | undefined,
        context: SyntacticTypeNodeBuilderContext,
        reportFallback = true,
    ) {
        if (reportFallback) {
            context.tracker.reportInferenceFallback(node);
        }
        if (context.noInferenceFallback === true) {
            return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
        }
        return resolver.serializeTypeOfDeclaration(context, node, symbol);
    }

    function inferExpressionType(node: Expression, context: SyntacticTypeNodeBuilderContext, reportFallback = true, requiresAddingUndefined?: boolean) {
        Debug.assert(!requiresAddingUndefined);
        if (reportFallback) {
            context.tracker.reportInferenceFallback(node);
        }
        if (context.noInferenceFallback === true) {
            return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
        }
        return resolver.serializeTypeOfExpression(context, node) ?? factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
    }

    function inferReturnTypeOfSignatureSignature(node: SignatureDeclaration | JSDocSignature, context: SyntacticTypeNodeBuilderContext, reportFallback: boolean) {
        if (reportFallback) {
            context.tracker.reportInferenceFallback(node);
        }
        if (context.noInferenceFallback === true) {
            return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
        }
        return resolver.serializeReturnTypeForSignature(context, node) ?? factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
    }

    function inferAccessorType(node: GetAccessorDeclaration | SetAccessorDeclaration, allAccessors: AllAccessorDeclarations, context: SyntacticTypeNodeBuilderContext, symbol: Symbol | undefined, reportFallback: boolean = true): TypeNode | undefined {
        if (node.kind === SyntaxKind.GetAccessor) {
            return createReturnFromSignature(node, symbol, context, reportFallback);
        }
        else {
            if (reportFallback) {
                context.tracker.reportInferenceFallback(node);
            }
            const result = allAccessors.getAccessor && createReturnFromSignature(allAccessors.getAccessor, symbol, context, reportFallback);
            return result ?? resolver.serializeTypeOfDeclaration(context, node, symbol) ?? factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
        }
    }

    function withNewScope<R>(context: SyntacticTypeNodeBuilderContext, node: IntroducesNewScopeNode | ConditionalTypeNode, fn: () => R) {
        const cleanup = resolver.enterNewScope(context, node);
        const result = fn();
        cleanup();
        return result;
    }
    function typeFromTypeAssertion(expression: Expression, type: TypeNode, context: SyntacticTypeNodeBuilderContext, requiresAddingUndefined: boolean): SyntacticResult {
        if (isConstTypeReference(type)) {
            return typeFromExpression(expression, context, /*isConstContext*/ true, requiresAddingUndefined);
        }
        return syntacticResult(serializeExistingTypeNodeWithFallback(type, context, requiresAddingUndefined));
    }
    function typeFromExpression(node: Expression | JsxAttributeValue, context: SyntacticTypeNodeBuilderContext, isConstContext = false, requiresAddingUndefined = false, preserveLiterals = false): SyntacticResult {
        switch (node.kind) {
            case SyntaxKind.ParenthesizedExpression:
                if (isJSDocTypeAssertion(node)) {
                    return typeFromTypeAssertion(node.expression, getJSDocTypeAssertionType(node), context, requiresAddingUndefined);
                }
                return typeFromExpression((node as ParenthesizedExpression).expression, context, isConstContext, requiresAddingUndefined);
            case SyntaxKind.Identifier:
                if (resolver.isUndefinedIdentifierExpression(node as Identifier)) {
                    return syntacticResult(createUndefinedTypeNode());
                }
                break;
            case SyntaxKind.NullKeyword:
                if (strictNullChecks) {
                    return syntacticResult(addUndefinedIfNeeded(factory.createLiteralTypeNode(factory.createNull()), requiresAddingUndefined, node, context));
                }
                else {
                    return syntacticResult(factory.createKeywordTypeNode(SyntaxKind.AnyKeyword));
                }
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.FunctionExpression:
                Debug.type<ArrowFunction | FunctionExpression>(node);
                return withNewScope(context, node, () => typeFromFunctionLikeExpression(node, context));
            case SyntaxKind.TypeAssertionExpression:
            case SyntaxKind.AsExpression:
                const asExpression = node as AsExpression | TypeAssertion;
                return typeFromTypeAssertion(asExpression.expression, asExpression.type, context, requiresAddingUndefined);
            case SyntaxKind.PrefixUnaryExpression:
                const unaryExpression = node as PrefixUnaryExpression;
                if (isPrimitiveLiteralValue(unaryExpression)) {
                    return typeFromPrimitiveLiteral(
                        unaryExpression.operator === SyntaxKind.PlusToken ? unaryExpression.operand : unaryExpression,
                        unaryExpression.operand.kind === SyntaxKind.BigIntLiteral ? SyntaxKind.BigIntKeyword : SyntaxKind.NumberKeyword,
                        context,
                        isConstContext || preserveLiterals,
                        requiresAddingUndefined,
                    );
                }
                break;
            case SyntaxKind.ArrayLiteralExpression:
                return typeFromArrayLiteral(node as ArrayLiteralExpression, context, isConstContext, requiresAddingUndefined);
            case SyntaxKind.ObjectLiteralExpression:
                return typeFromObjectLiteral(node as ObjectLiteralExpression, context, isConstContext, requiresAddingUndefined);
            case SyntaxKind.ClassExpression:
                return syntacticResult(inferExpressionType(node as ClassExpression, context, /*reportFallback*/ true, requiresAddingUndefined));
            case SyntaxKind.TemplateExpression:
                if (!isConstContext && !preserveLiterals) {
                    return syntacticResult(factory.createKeywordTypeNode(SyntaxKind.StringKeyword));
                }
                break;
            default:
                let typeKind: KeywordTypeSyntaxKind | undefined;
                let primitiveNode = node as PrimitiveLiteral;
                switch (node.kind) {
                    case SyntaxKind.NumericLiteral:
                        typeKind = SyntaxKind.NumberKeyword;
                        break;
                    case SyntaxKind.NoSubstitutionTemplateLiteral:
                        primitiveNode = factory.createStringLiteral((node as NoSubstitutionTemplateLiteral).text);
                        typeKind = SyntaxKind.StringKeyword;
                        break;
                    case SyntaxKind.StringLiteral:
                        typeKind = SyntaxKind.StringKeyword;
                        break;
                    case SyntaxKind.BigIntLiteral:
                        typeKind = SyntaxKind.BigIntKeyword;
                        break;
                    case SyntaxKind.TrueKeyword:
                    case SyntaxKind.FalseKeyword:
                        typeKind = SyntaxKind.BooleanKeyword;
                        break;
                }
                if (typeKind) {
                    return typeFromPrimitiveLiteral(primitiveNode, typeKind, context, isConstContext || preserveLiterals, requiresAddingUndefined);
                }
        }
        return failed;
    }
    function typeFromFunctionLikeExpression(fnNode: FunctionExpression | ArrowFunction, context: SyntacticTypeNodeBuilderContext) {
        const returnType = createReturnFromSignature(fnNode, /*symbol*/ undefined, context);
        const typeParameters = reuseTypeParameters(fnNode.typeParameters, context);
        const parameters = fnNode.parameters.map(p => ensureParameter(p, context));
        return syntacticResult(
            factory.createFunctionTypeNode(
                typeParameters,
                parameters,
                returnType,
            ),
        );
    }
    function canGetTypeFromArrayLiteral(arrayLiteral: ArrayLiteralExpression, context: SyntacticTypeNodeBuilderContext, isConstContext: boolean) {
        if (!isConstContext) {
            context.tracker.reportInferenceFallback(arrayLiteral);
            return false;
        }
        for (const element of arrayLiteral.elements) {
            if (element.kind === SyntaxKind.SpreadElement) {
                context.tracker.reportInferenceFallback(element);
                return false;
            }
        }
        return true;
    }
    function typeFromArrayLiteral(arrayLiteral: ArrayLiteralExpression, context: SyntacticTypeNodeBuilderContext, isConstContext: boolean, requiresAddingUndefined: boolean): SyntacticResult {
        if (!canGetTypeFromArrayLiteral(arrayLiteral, context, isConstContext)) {
            if (requiresAddingUndefined || isDeclaration(walkUpParenthesizedExpressions(arrayLiteral).parent)) {
                return alreadyReported;
            }
            return syntacticResult(inferExpressionType(arrayLiteral, context, /*reportFallback*/ false, requiresAddingUndefined));
        }
        // Disable any inference fallback since we won't actually use the resulting type and we don't want to generate errors
        const oldNoInferenceFallback = context.noInferenceFallback;
        context.noInferenceFallback = true;
        const elementTypesInfo: TypeNode[] = [];
        for (const element of arrayLiteral.elements) {
            Debug.assert(element.kind !== SyntaxKind.SpreadElement);
            if (element.kind === SyntaxKind.OmittedExpression) {
                elementTypesInfo.push(
                    createUndefinedTypeNode(),
                );
            }
            else {
                const expressionType = typeFromExpression(element, context, isConstContext);
                const elementType = expressionType.type !== undefined ? expressionType.type : inferExpressionType(element, context, expressionType.reportFallback);
                elementTypesInfo.push(elementType);
            }
        }
        const tupleType = factory.createTupleTypeNode(elementTypesInfo);
        tupleType.emitNode = { flags: 1, autoGenerate: undefined, internalFlags: 0 };
        context.noInferenceFallback = oldNoInferenceFallback;
        return notImplemented;
    }
    function canGetTypeFromObjectLiteral(objectLiteral: ObjectLiteralExpression, context: SyntacticTypeNodeBuilderContext) {
        let result = true;
        for (const prop of objectLiteral.properties) {
            if (prop.flags & NodeFlags.ThisNodeHasError) {
                result = false;
                break; // Bail if parse errors
            }
            if (prop.kind === SyntaxKind.ShorthandPropertyAssignment || prop.kind === SyntaxKind.SpreadAssignment) {
                context.tracker.reportInferenceFallback(prop);
                result = false;
            }
            else if (prop.name.flags & NodeFlags.ThisNodeHasError) {
                result = false;
                break; // Bail if parse errors
            }
            else if (prop.name.kind === SyntaxKind.PrivateIdentifier) {
                // Not valid in object literals but the compiler will complain about this, we just ignore it here.
                result = false;
            }
            else if (prop.name.kind === SyntaxKind.ComputedPropertyName) {
                const expression = prop.name.expression;
                if (!isPrimitiveLiteralValue(expression, /*includeBigInt*/ false) && !resolver.isDefinitelyReferenceToGlobalSymbolObject(expression)) {
                    context.tracker.reportInferenceFallback(prop.name);
                    result = false;
                }
            }
        }
        return result;
    }
    function typeFromObjectLiteral(objectLiteral: ObjectLiteralExpression, context: SyntacticTypeNodeBuilderContext, isConstContext: boolean, requiresAddingUndefined: boolean) {
        if (!canGetTypeFromObjectLiteral(objectLiteral, context)) {
            if (requiresAddingUndefined || isDeclaration(walkUpParenthesizedExpressions(objectLiteral).parent)) {
                return alreadyReported;
            }
            return syntacticResult(inferExpressionType(objectLiteral, context, /*reportFallback*/ false, requiresAddingUndefined));
        }
        // Disable any inference fallback since we won't actually use the resulting type and we don't want to generate errors
        const oldNoInferenceFallback = context.noInferenceFallback;
        context.noInferenceFallback = true;
        const properties: TypeElement[] = [];
        const oldFlags = context.flags;
        context.flags |= NodeBuilderFlags.InObjectTypeLiteral;
        for (const prop of objectLiteral.properties) {
            Debug.assert(!isShorthandPropertyAssignment(prop) && !isSpreadAssignment(prop));

            const name = prop.name;
            let newProp;
            switch (prop.kind) {
                case SyntaxKind.MethodDeclaration:
                    newProp = withNewScope(context, prop, () => typeFromObjectLiteralMethod(prop, name, context, isConstContext));
                    break;
                case SyntaxKind.PropertyAssignment:
                    newProp = typeFromObjectLiteralPropertyAssignment(prop, name, context, isConstContext);
                    break;
                case SyntaxKind.SetAccessor:
                case SyntaxKind.GetAccessor:
                    newProp = typeFromObjectLiteralAccessor(prop, name, context);
                    break;
            }
            if (newProp) {
                setCommentRange(newProp, prop);
                properties.push(newProp);
            }
        }

        context.flags = oldFlags;
        const typeNode = factory.createTypeLiteralNode(properties);
        if (!(context.flags & NodeBuilderFlags.MultilineObjectLiterals)) {
            setEmitFlags(typeNode, EmitFlags.SingleLine);
        }
        context.noInferenceFallback = oldNoInferenceFallback;
        return notImplemented;
    }

    function typeFromObjectLiteralPropertyAssignment(prop: PropertyAssignment, name: PropertyName, context: SyntacticTypeNodeBuilderContext, isConstContext: boolean) {
        const modifiers = isConstContext ?
            [factory.createModifier(SyntaxKind.ReadonlyKeyword)] :
            [];
        const expressionResult = typeFromExpression(prop.initializer, context, isConstContext);
        const typeNode = expressionResult.type !== undefined ? expressionResult.type : inferTypeOfDeclaration(prop, /*symbol*/ undefined, context, expressionResult.reportFallback);

        return factory.createPropertySignature(
            modifiers,
            reuseNode(context, name),
            /*questionToken*/ undefined,
            typeNode,
        );
    }

    function ensureParameter(p: ParameterDeclaration, context: SyntacticTypeNodeBuilderContext) {
        return factory.updateParameterDeclaration(
            p,
            [],
            reuseNode(context, p.dotDotDotToken),
            resolver.serializeNameOfParameter(context, p),
            resolver.isOptionalParameter(p) ? factory.createToken(SyntaxKind.QuestionToken) : undefined,
            typeFromParameter(p, /*symbol*/ undefined, context), // Ignore private param props, since this type is going straight back into a param
            /*initializer*/ undefined,
        );
    }
    function reuseTypeParameters(typeParameters: NodeArray<TypeParameterDeclaration> | undefined, context: SyntacticTypeNodeBuilderContext) {
        return typeParameters?.map(tp =>
            factory.updateTypeParameterDeclaration(
                tp,
                tp.modifiers?.map(m => reuseNode(context, m)),
                reuseNode(context, tp.name),
                serializeExistingTypeNodeWithFallback(tp.constraint, context),
                serializeExistingTypeNodeWithFallback(tp.default, context),
            )
        );
    }

    function typeFromObjectLiteralMethod(method: MethodDeclaration, name: PropertyName, context: SyntacticTypeNodeBuilderContext, isConstContext: boolean) {
        const returnType = createReturnFromSignature(method, /*symbol*/ undefined, context);
        const typeParameters = reuseTypeParameters(method.typeParameters, context);
        const parameters = method.parameters.map(p => ensureParameter(p, context));
        if (isConstContext) {
            return factory.createPropertySignature(
                [factory.createModifier(SyntaxKind.ReadonlyKeyword)],
                reuseNode(context, name),
                reuseNode(context, method.questionToken),
                factory.createFunctionTypeNode(
                    typeParameters,
                    parameters,
                    returnType,
                ),
            );
        }
        else {
            if (isIdentifier(name) && name.escapedText === "new") {
                name = factory.createStringLiteral("new");
            }
            return factory.createMethodSignature(
                [],
                reuseNode(context, name),
                reuseNode(context, method.questionToken),
                typeParameters,
                parameters,
                returnType,
            );
        }
    }
    function typeFromObjectLiteralAccessor(accessor: GetAccessorDeclaration | SetAccessorDeclaration, name: PropertyName, context: SyntacticTypeNodeBuilderContext) {
        const allAccessors = resolver.getAllAccessorDeclarations(accessor);
        const getAccessorType = allAccessors.getAccessor && getTypeAnnotationFromAccessor(allAccessors.getAccessor);
        const setAccessorType = allAccessors.setAccessor && getTypeAnnotationFromAccessor(allAccessors.setAccessor);
        // We have types for both accessors, we can't know if they are the same type so we keep both accessors
        if (getAccessorType !== undefined && setAccessorType !== undefined) {
            return withNewScope(context, accessor, () => {
                const parameters = accessor.parameters.map(p => ensureParameter(p, context));

                if (isGetAccessor(accessor)) {
                    return factory.updateGetAccessorDeclaration(
                        accessor,
                        [],
                        reuseNode(context, name),
                        parameters,
                        serializeExistingTypeNodeWithFallback(getAccessorType, context),
                        /*body*/ undefined,
                    );
                }
                else {
                    return factory.updateSetAccessorDeclaration(
                        accessor,
                        [],
                        reuseNode(context, name),
                        parameters,
                        /*body*/ undefined,
                    );
                }
            });
        }
        else if (allAccessors.firstAccessor === accessor) {
            const foundType = getAccessorType ? withNewScope(context, allAccessors.getAccessor!, () => serializeExistingTypeNodeWithFallback(getAccessorType, context)) :
                setAccessorType ? withNewScope(context, allAccessors.setAccessor!, () => serializeExistingTypeNodeWithFallback(setAccessorType, context)) :
                undefined;
            const propertyType = foundType ?? inferAccessorType(accessor, allAccessors, context, /*symbol*/ undefined);

            const propertySignature = factory.createPropertySignature(
                allAccessors.setAccessor === undefined ? [factory.createModifier(SyntaxKind.ReadonlyKeyword)] : [],
                reuseNode(context, name),
                /*questionToken*/ undefined,
                propertyType,
            );
            return propertySignature;
        }
    }
    function createUndefinedTypeNode() {
        if (strictNullChecks) {
            return factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword);
        }
        else {
            return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
        }
    }
    function typeFromPrimitiveLiteral(node: PrimitiveLiteral, baseType: KeywordTypeSyntaxKind, context: SyntacticTypeNodeBuilderContext, preserveLiterals: boolean, requiresAddingUndefined: boolean) {
        let result;
        if (preserveLiterals) {
            if (node.kind === SyntaxKind.PrefixUnaryExpression && node.operator === SyntaxKind.PlusToken) {
                result = factory.createLiteralTypeNode(reuseNode(context, node.operand));
            }
            result = factory.createLiteralTypeNode(reuseNode(context, node));
        }
        else {
            result = factory.createKeywordTypeNode(baseType);
        }
        return syntacticResult(addUndefinedIfNeeded(result, requiresAddingUndefined, node, context));
    }

    function addUndefinedIfNeeded(node: TypeNode, addUndefined: boolean | undefined, owner: Node | undefined, context: SyntacticTypeNodeBuilderContext) {
        const parentDeclaration = owner && walkUpParenthesizedExpressions(owner).parent;
        const optionalDeclaration = parentDeclaration && isDeclaration(parentDeclaration) && isOptionalDeclaration(parentDeclaration);
        if (!strictNullChecks || !(addUndefined || optionalDeclaration)) return node;
        if (!canAddUndefined(node)) {
            context.tracker.reportInferenceFallback(node);
        }
        if (isUnionTypeNode(node)) {
            return factory.createUnionTypeNode([...node.types, factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword)]);
        }
        return factory.createUnionTypeNode([node, factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword)]);
    }
    function canAddUndefined(node: TypeNode): boolean {
        if (!strictNullChecks) return true;
        if (
            isKeyword(node.kind)
            || node.kind === SyntaxKind.LiteralType
            || node.kind === SyntaxKind.FunctionType
            || node.kind === SyntaxKind.ConstructorType
            || node.kind === SyntaxKind.ArrayType
            || node.kind === SyntaxKind.TupleType
            || node.kind === SyntaxKind.TypeLiteral
            || node.kind === SyntaxKind.TemplateLiteralType
            || node.kind === SyntaxKind.ThisType
        ) {
            return true;
        }
        if (node.kind === SyntaxKind.ParenthesizedType) {
            return canAddUndefined((node as ParenthesizedTypeNode).type);
        }
        if (node.kind === SyntaxKind.UnionType || node.kind === SyntaxKind.IntersectionType) {
            return (node as UnionTypeNode | IntersectionTypeNode).types.every(canAddUndefined);
        }
        return false;
    }

    function createReturnFromSignature(fn: SignatureDeclaration | JSDocSignature, symbol: Symbol | undefined, context: SyntacticTypeNodeBuilderContext, reportFallback: boolean = true): TypeNode {
        let returnType = failed;
        const returnTypeNode = isJSDocConstructSignature(fn) ? getEffectiveTypeAnnotationNode(fn.parameters[0]) : getEffectiveReturnTypeNode(fn);
        if (returnTypeNode) {
            returnType = syntacticResult(serializeTypeAnnotationOfDeclaration(returnTypeNode, context, fn, symbol));
        }
        else if (isValueSignatureDeclaration(fn)) {
            returnType = typeFromSingleReturnExpression(fn, context);
        }
        return returnType.type !== undefined ? returnType.type : inferReturnTypeOfSignatureSignature(fn, context, reportFallback && returnType.reportFallback && !returnTypeNode);
    }

    function typeFromSingleReturnExpression(declaration: FunctionLikeDeclaration | undefined, context: SyntacticTypeNodeBuilderContext): SyntacticResult {
        let candidateExpr: Expression | undefined;
        if (declaration && !nodeIsMissing(declaration.body)) {
            const flags = getFunctionFlags(declaration);
            if (flags & FunctionFlags.AsyncGenerator) return failed;

            const body = declaration.body;
            if (body && isBlock(body)) {
                forEachReturnStatement(body, s => {
                    if (s.parent !== body) {
                        candidateExpr = undefined;
                        return true;
                    }
                    if (!candidateExpr) {
                        candidateExpr = s.expression;
                    }
                    else {
                        candidateExpr = undefined;
                        return true;
                    }
                });
            }
            else {
                candidateExpr = body;
            }
        }
        if (candidateExpr) {
            if (isContextuallyTyped(candidateExpr)) {
                const type = isJSDocTypeAssertion(candidateExpr) ? getJSDocTypeAssertionType(candidateExpr) :
                    isAsExpression(candidateExpr) || isTypeAssertionExpression(candidateExpr) ? candidateExpr.type :
                    undefined;
                if (type && !isConstTypeReference(type)) {
                    return syntacticResult(serializeExistingTypeNode(type, context));
                }
            }
            else {
                return typeFromExpression(candidateExpr, context);
            }
        }
        return failed;
    }

    function isContextuallyTyped(node: Node) {
        return findAncestor(node.parent, n => {
            // Functions calls or parent type annotations (but not the return type of a function expression) may impact the inferred type and local inference is unreliable
            return isCallExpression(n) || (!isFunctionLikeDeclaration(n) && !!getEffectiveTypeAnnotationNode(n)) || isJsxElement(n) || isJsxExpression(n);
        });
    }
}
