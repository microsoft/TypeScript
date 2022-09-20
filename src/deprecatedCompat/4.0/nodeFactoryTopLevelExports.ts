// DEPRECATION: Node factory top-level exports
// DEPRECATION PLAN:
//     - soft: 4.0
//     - warn: 4.1
//     - error: 5.0
namespace ts {

    // NOTE: These exports are deprecated in favor of using a `NodeFactory` instance and exist here purely for backwards compatibility reasons.
    const factoryDeprecation: DeprecationOptions = { since: "4.0", warnAfter: "4.1", message: "Use the appropriate method on 'ts.factory' or the 'factory' supplied by your transformation context instead." };

    /** @deprecated Use `factory.createNodeArray` or the factory supplied by your transformation context instead. */
    export const createNodeArray = Debug.deprecate(factory.createNodeArray, factoryDeprecation);

    /** @deprecated Use `factory.createNumericLiteral` or the factory supplied by your transformation context instead. */
    export const createNumericLiteral = Debug.deprecate(factory.createNumericLiteral, factoryDeprecation);

    /** @deprecated Use `factory.createBigIntLiteral` or the factory supplied by your transformation context instead. */
    export const createBigIntLiteral = Debug.deprecate(factory.createBigIntLiteral, factoryDeprecation);

    /** @deprecated Use `factory.createStringLiteral` or the factory supplied by your transformation context instead. */
    export const createStringLiteral = Debug.deprecate(factory.createStringLiteral, factoryDeprecation);

    /** @deprecated Use `factory.createStringLiteralFromNode` or the factory supplied by your transformation context instead. */
    export const createStringLiteralFromNode = Debug.deprecate(factory.createStringLiteralFromNode, factoryDeprecation);

    /** @deprecated Use `factory.createRegularExpressionLiteral` or the factory supplied by your transformation context instead. */
    export const createRegularExpressionLiteral = Debug.deprecate(factory.createRegularExpressionLiteral, factoryDeprecation);

    /** @deprecated Use `factory.createLoopVariable` or the factory supplied by your transformation context instead. */
    export const createLoopVariable = Debug.deprecate(factory.createLoopVariable, factoryDeprecation);

    /** @deprecated Use `factory.createUniqueName` or the factory supplied by your transformation context instead. */
    export const createUniqueName: (text: string, flags?: GeneratedIdentifierFlags | undefined) => Identifier = Debug.deprecate(factory.createUniqueName, factoryDeprecation);

    /** @deprecated Use `factory.createPrivateIdentifier` or the factory supplied by your transformation context instead. */
    export const createPrivateIdentifier = Debug.deprecate(factory.createPrivateIdentifier, factoryDeprecation);

    /** @deprecated Use `factory.createSuper` or the factory supplied by your transformation context instead. */
    export const createSuper = Debug.deprecate(factory.createSuper, factoryDeprecation);

    /** @deprecated Use `factory.createThis` or the factory supplied by your transformation context instead. */
    export const createThis = Debug.deprecate(factory.createThis, factoryDeprecation);

    /** @deprecated Use `factory.createNull` or the factory supplied by your transformation context instead. */
    export const createNull = Debug.deprecate(factory.createNull, factoryDeprecation);

    /** @deprecated Use `factory.createTrue` or the factory supplied by your transformation context instead. */
    export const createTrue = Debug.deprecate(factory.createTrue, factoryDeprecation);

    /** @deprecated Use `factory.createFalse` or the factory supplied by your transformation context instead. */
    export const createFalse = Debug.deprecate(factory.createFalse, factoryDeprecation);

    /** @deprecated Use `factory.createModifier` or the factory supplied by your transformation context instead. */
    export const createModifier = Debug.deprecate(factory.createModifier, factoryDeprecation);

    /** @deprecated Use `factory.createModifiersFromModifierFlags` or the factory supplied by your transformation context instead. */
    export const createModifiersFromModifierFlags = Debug.deprecate(factory.createModifiersFromModifierFlags, factoryDeprecation);

    /** @deprecated Use `factory.createQualifiedName` or the factory supplied by your transformation context instead. */
    export const createQualifiedName = Debug.deprecate(factory.createQualifiedName, factoryDeprecation);

    /** @deprecated Use `factory.updateQualifiedName` or the factory supplied by your transformation context instead. */
    export const updateQualifiedName = Debug.deprecate(factory.updateQualifiedName, factoryDeprecation);

    /** @deprecated Use `factory.createComputedPropertyName` or the factory supplied by your transformation context instead. */
    export const createComputedPropertyName = Debug.deprecate(factory.createComputedPropertyName, factoryDeprecation);

    /** @deprecated Use `factory.updateComputedPropertyName` or the factory supplied by your transformation context instead. */
    export const updateComputedPropertyName = Debug.deprecate(factory.updateComputedPropertyName, factoryDeprecation);

    /** @deprecated Use `factory.createTypeParameterDeclaration` or the factory supplied by your transformation context instead. */
    export const createTypeParameterDeclaration = Debug.deprecate(factory.createTypeParameterDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.updateTypeParameterDeclaration` or the factory supplied by your transformation context instead. */
    export const updateTypeParameterDeclaration = Debug.deprecate(factory.updateTypeParameterDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.createParameterDeclaration` or the factory supplied by your transformation context instead. */
    export const createParameter = Debug.deprecate(factory.createParameterDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.updateParameterDeclaration` or the factory supplied by your transformation context instead. */
    export const updateParameter = Debug.deprecate(factory.updateParameterDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.createDecorator` or the factory supplied by your transformation context instead. */
    export const createDecorator = Debug.deprecate(factory.createDecorator, factoryDeprecation);

    /** @deprecated Use `factory.updateDecorator` or the factory supplied by your transformation context instead. */
    export const updateDecorator = Debug.deprecate(factory.updateDecorator, factoryDeprecation);

    /** @deprecated Use `factory.createPropertyDeclaration` or the factory supplied by your transformation context instead. */
    export const createProperty = Debug.deprecate(factory.createPropertyDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.updatePropertyDeclaration` or the factory supplied by your transformation context instead. */
    export const updateProperty = Debug.deprecate(factory.updatePropertyDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.createMethodDeclaration` or the factory supplied by your transformation context instead. */
    export const createMethod = Debug.deprecate(factory.createMethodDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.updateMethodDeclaration` or the factory supplied by your transformation context instead. */
    export const updateMethod = Debug.deprecate(factory.updateMethodDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.createConstructorDeclaration` or the factory supplied by your transformation context instead. */
    export const createConstructor = Debug.deprecate(factory.createConstructorDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.updateConstructorDeclaration` or the factory supplied by your transformation context instead. */
    export const updateConstructor = Debug.deprecate(factory.updateConstructorDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.createGetAccessorDeclaration` or the factory supplied by your transformation context instead. */
    export const createGetAccessor = Debug.deprecate(factory.createGetAccessorDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.updateGetAccessorDeclaration` or the factory supplied by your transformation context instead. */
    export const updateGetAccessor = Debug.deprecate(factory.updateGetAccessorDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.createSetAccessorDeclaration` or the factory supplied by your transformation context instead. */
    export const createSetAccessor = Debug.deprecate(factory.createSetAccessorDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.updateSetAccessorDeclaration` or the factory supplied by your transformation context instead. */
    export const updateSetAccessor = Debug.deprecate(factory.updateSetAccessorDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.createCallSignature` or the factory supplied by your transformation context instead. */
    export const createCallSignature = Debug.deprecate(factory.createCallSignature, factoryDeprecation);

    /** @deprecated Use `factory.updateCallSignature` or the factory supplied by your transformation context instead. */
    export const updateCallSignature = Debug.deprecate(factory.updateCallSignature, factoryDeprecation);

    /** @deprecated Use `factory.createConstructSignature` or the factory supplied by your transformation context instead. */
    export const createConstructSignature = Debug.deprecate(factory.createConstructSignature, factoryDeprecation);

    /** @deprecated Use `factory.updateConstructSignature` or the factory supplied by your transformation context instead. */
    export const updateConstructSignature = Debug.deprecate(factory.updateConstructSignature, factoryDeprecation);

    /** @deprecated Use `factory.updateIndexSignature` or the factory supplied by your transformation context instead. */
    export const updateIndexSignature = Debug.deprecate(factory.updateIndexSignature, factoryDeprecation);

    /** @deprecated Use `factory.createKeywordTypeNode` or the factory supplied by your transformation context instead. */
    export const createKeywordTypeNode = Debug.deprecate(factory.createKeywordTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.createTypePredicateNode` or the factory supplied by your transformation context instead. */
    export const createTypePredicateNodeWithModifier = Debug.deprecate(factory.createTypePredicateNode, factoryDeprecation);

    /** @deprecated Use `factory.updateTypePredicateNode` or the factory supplied by your transformation context instead. */
    export const updateTypePredicateNodeWithModifier = Debug.deprecate(factory.updateTypePredicateNode, factoryDeprecation);

    /** @deprecated Use `factory.createTypeReferenceNode` or the factory supplied by your transformation context instead. */
    export const createTypeReferenceNode = Debug.deprecate(factory.createTypeReferenceNode, factoryDeprecation);

    /** @deprecated Use `factory.updateTypeReferenceNode` or the factory supplied by your transformation context instead. */
    export const updateTypeReferenceNode = Debug.deprecate(factory.updateTypeReferenceNode, factoryDeprecation);

    /** @deprecated Use `factory.createFunctionTypeNode` or the factory supplied by your transformation context instead. */
    export const createFunctionTypeNode = Debug.deprecate(factory.createFunctionTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.updateFunctionTypeNode` or the factory supplied by your transformation context instead. */
    export const updateFunctionTypeNode = Debug.deprecate(factory.updateFunctionTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.createConstructorTypeNode` or the factory supplied by your transformation context instead. */
    export const createConstructorTypeNode = Debug.deprecate((
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode
    ) => {
        return factory.createConstructorTypeNode(/*modifiers*/ undefined, typeParameters, parameters, type);
    }, factoryDeprecation);

    /** @deprecated Use `factory.updateConstructorTypeNode` or the factory supplied by your transformation context instead. */
    export const updateConstructorTypeNode = Debug.deprecate((
        node: ConstructorTypeNode,
        typeParameters: NodeArray<TypeParameterDeclaration> | undefined,
        parameters: NodeArray<ParameterDeclaration>,
        type: TypeNode
    ) => {
        return factory.updateConstructorTypeNode(node, node.modifiers, typeParameters, parameters, type);
    }, factoryDeprecation);

    /** @deprecated Use `factory.createTypeQueryNode` or the factory supplied by your transformation context instead. */
    export const createTypeQueryNode = Debug.deprecate(factory.createTypeQueryNode, factoryDeprecation);

    /** @deprecated Use `factory.updateTypeQueryNode` or the factory supplied by your transformation context instead. */
    export const updateTypeQueryNode = Debug.deprecate(factory.updateTypeQueryNode, factoryDeprecation);

    /** @deprecated Use `factory.createTypeLiteralNode` or the factory supplied by your transformation context instead. */
    export const createTypeLiteralNode = Debug.deprecate(factory.createTypeLiteralNode, factoryDeprecation);

    /** @deprecated Use `factory.updateTypeLiteralNode` or the factory supplied by your transformation context instead. */
    export const updateTypeLiteralNode = Debug.deprecate(factory.updateTypeLiteralNode, factoryDeprecation);

    /** @deprecated Use `factory.createArrayTypeNode` or the factory supplied by your transformation context instead. */
    export const createArrayTypeNode = Debug.deprecate(factory.createArrayTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.updateArrayTypeNode` or the factory supplied by your transformation context instead. */
    export const updateArrayTypeNode = Debug.deprecate(factory.updateArrayTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.createTupleTypeNode` or the factory supplied by your transformation context instead. */
    export const createTupleTypeNode = Debug.deprecate(factory.createTupleTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.updateTupleTypeNode` or the factory supplied by your transformation context instead. */
    export const updateTupleTypeNode = Debug.deprecate(factory.updateTupleTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.createOptionalTypeNode` or the factory supplied by your transformation context instead. */
    export const createOptionalTypeNode = Debug.deprecate(factory.createOptionalTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.updateOptionalTypeNode` or the factory supplied by your transformation context instead. */
    export const updateOptionalTypeNode = Debug.deprecate(factory.updateOptionalTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.createRestTypeNode` or the factory supplied by your transformation context instead. */
    export const createRestTypeNode = Debug.deprecate(factory.createRestTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.updateRestTypeNode` or the factory supplied by your transformation context instead. */
    export const updateRestTypeNode = Debug.deprecate(factory.updateRestTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.createUnionTypeNode` or the factory supplied by your transformation context instead. */
    export const createUnionTypeNode = Debug.deprecate(factory.createUnionTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.updateUnionTypeNode` or the factory supplied by your transformation context instead. */
    export const updateUnionTypeNode = Debug.deprecate(factory.updateUnionTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.createIntersectionTypeNode` or the factory supplied by your transformation context instead. */
    export const createIntersectionTypeNode = Debug.deprecate(factory.createIntersectionTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.updateIntersectionTypeNode` or the factory supplied by your transformation context instead. */
    export const updateIntersectionTypeNode = Debug.deprecate(factory.updateIntersectionTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.createConditionalTypeNode` or the factory supplied by your transformation context instead. */
    export const createConditionalTypeNode = Debug.deprecate(factory.createConditionalTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.updateConditionalTypeNode` or the factory supplied by your transformation context instead. */
    export const updateConditionalTypeNode = Debug.deprecate(factory.updateConditionalTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.createInferTypeNode` or the factory supplied by your transformation context instead. */
    export const createInferTypeNode = Debug.deprecate(factory.createInferTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.updateInferTypeNode` or the factory supplied by your transformation context instead. */
    export const updateInferTypeNode = Debug.deprecate(factory.updateInferTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.createImportTypeNode` or the factory supplied by your transformation context instead. */
    export const createImportTypeNode = Debug.deprecate(factory.createImportTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.updateImportTypeNode` or the factory supplied by your transformation context instead. */
    export const updateImportTypeNode = Debug.deprecate(factory.updateImportTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.createParenthesizedType` or the factory supplied by your transformation context instead. */
    export const createParenthesizedType = Debug.deprecate(factory.createParenthesizedType, factoryDeprecation);

    /** @deprecated Use `factory.updateParenthesizedType` or the factory supplied by your transformation context instead. */
    export const updateParenthesizedType = Debug.deprecate(factory.updateParenthesizedType, factoryDeprecation);

    /** @deprecated Use `factory.createThisTypeNode` or the factory supplied by your transformation context instead. */
    export const createThisTypeNode = Debug.deprecate(factory.createThisTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.updateTypeOperatorNode` or the factory supplied by your transformation context instead. */
    export const updateTypeOperatorNode = Debug.deprecate(factory.updateTypeOperatorNode, factoryDeprecation);

    /** @deprecated Use `factory.createIndexedAccessTypeNode` or the factory supplied by your transformation context instead. */
    export const createIndexedAccessTypeNode = Debug.deprecate(factory.createIndexedAccessTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.updateIndexedAccessTypeNode` or the factory supplied by your transformation context instead. */
    export const updateIndexedAccessTypeNode = Debug.deprecate(factory.updateIndexedAccessTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.createMappedTypeNode` or the factory supplied by your transformation context instead. */
    export const createMappedTypeNode = Debug.deprecate(factory.createMappedTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.updateMappedTypeNode` or the factory supplied by your transformation context instead. */
    export const updateMappedTypeNode = Debug.deprecate(factory.updateMappedTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.createLiteralTypeNode` or the factory supplied by your transformation context instead. */
    export const createLiteralTypeNode = Debug.deprecate(factory.createLiteralTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.updateLiteralTypeNode` or the factory supplied by your transformation context instead. */
    export const updateLiteralTypeNode = Debug.deprecate(factory.updateLiteralTypeNode, factoryDeprecation);

    /** @deprecated Use `factory.createObjectBindingPattern` or the factory supplied by your transformation context instead. */
    export const createObjectBindingPattern = Debug.deprecate(factory.createObjectBindingPattern, factoryDeprecation);

    /** @deprecated Use `factory.updateObjectBindingPattern` or the factory supplied by your transformation context instead. */
    export const updateObjectBindingPattern = Debug.deprecate(factory.updateObjectBindingPattern, factoryDeprecation);

    /** @deprecated Use `factory.createArrayBindingPattern` or the factory supplied by your transformation context instead. */
    export const createArrayBindingPattern = Debug.deprecate(factory.createArrayBindingPattern, factoryDeprecation);

    /** @deprecated Use `factory.updateArrayBindingPattern` or the factory supplied by your transformation context instead. */
    export const updateArrayBindingPattern = Debug.deprecate(factory.updateArrayBindingPattern, factoryDeprecation);

    /** @deprecated Use `factory.createBindingElement` or the factory supplied by your transformation context instead. */
    export const createBindingElement = Debug.deprecate(factory.createBindingElement, factoryDeprecation);

    /** @deprecated Use `factory.updateBindingElement` or the factory supplied by your transformation context instead. */
    export const updateBindingElement = Debug.deprecate(factory.updateBindingElement, factoryDeprecation);

    /** @deprecated Use `factory.createArrayLiteralExpression` or the factory supplied by your transformation context instead. */
    export const createArrayLiteral = Debug.deprecate(factory.createArrayLiteralExpression, factoryDeprecation);

    /** @deprecated Use `factory.updateArrayLiteralExpression` or the factory supplied by your transformation context instead. */
    export const updateArrayLiteral = Debug.deprecate(factory.updateArrayLiteralExpression, factoryDeprecation);

    /** @deprecated Use `factory.createObjectLiteralExpression` or the factory supplied by your transformation context instead. */
    export const createObjectLiteral = Debug.deprecate(factory.createObjectLiteralExpression, factoryDeprecation);

    /** @deprecated Use `factory.updateObjectLiteralExpression` or the factory supplied by your transformation context instead. */
    export const updateObjectLiteral = Debug.deprecate(factory.updateObjectLiteralExpression, factoryDeprecation);

    /** @deprecated Use `factory.createPropertyAccessExpression` or the factory supplied by your transformation context instead. */
    export const createPropertyAccess = Debug.deprecate(factory.createPropertyAccessExpression, factoryDeprecation);

    /** @deprecated Use `factory.updatePropertyAccessExpression` or the factory supplied by your transformation context instead. */
    export const updatePropertyAccess = Debug.deprecate(factory.updatePropertyAccessExpression, factoryDeprecation);

    /** @deprecated Use `factory.createPropertyAccessChain` or the factory supplied by your transformation context instead. */
    export const createPropertyAccessChain = Debug.deprecate(factory.createPropertyAccessChain, factoryDeprecation);

    /** @deprecated Use `factory.updatePropertyAccessChain` or the factory supplied by your transformation context instead. */
    export const updatePropertyAccessChain = Debug.deprecate(factory.updatePropertyAccessChain, factoryDeprecation);

    /** @deprecated Use `factory.createElementAccessExpression` or the factory supplied by your transformation context instead. */
    export const createElementAccess = Debug.deprecate(factory.createElementAccessExpression, factoryDeprecation);

    /** @deprecated Use `factory.updateElementAccessExpression` or the factory supplied by your transformation context instead. */
    export const updateElementAccess = Debug.deprecate(factory.updateElementAccessExpression, factoryDeprecation);

    /** @deprecated Use `factory.createElementAccessChain` or the factory supplied by your transformation context instead. */
    export const createElementAccessChain = Debug.deprecate(factory.createElementAccessChain, factoryDeprecation);

    /** @deprecated Use `factory.updateElementAccessChain` or the factory supplied by your transformation context instead. */
    export const updateElementAccessChain = Debug.deprecate(factory.updateElementAccessChain, factoryDeprecation);

    /** @deprecated Use `factory.createCallExpression` or the factory supplied by your transformation context instead. */
    export const createCall = Debug.deprecate(factory.createCallExpression, factoryDeprecation);

    /** @deprecated Use `factory.updateCallExpression` or the factory supplied by your transformation context instead. */
    export const updateCall = Debug.deprecate(factory.updateCallExpression, factoryDeprecation);

    /** @deprecated Use `factory.createCallChain` or the factory supplied by your transformation context instead. */
    export const createCallChain = Debug.deprecate(factory.createCallChain, factoryDeprecation);

    /** @deprecated Use `factory.updateCallChain` or the factory supplied by your transformation context instead. */
    export const updateCallChain = Debug.deprecate(factory.updateCallChain, factoryDeprecation);

    /** @deprecated Use `factory.createNewExpression` or the factory supplied by your transformation context instead. */
    export const createNew = Debug.deprecate(factory.createNewExpression, factoryDeprecation);

    /** @deprecated Use `factory.updateNewExpression` or the factory supplied by your transformation context instead. */
    export const updateNew = Debug.deprecate(factory.updateNewExpression, factoryDeprecation);

    /** @deprecated Use `factory.createTypeAssertion` or the factory supplied by your transformation context instead. */
    export const createTypeAssertion = Debug.deprecate(factory.createTypeAssertion, factoryDeprecation);

    /** @deprecated Use `factory.updateTypeAssertion` or the factory supplied by your transformation context instead. */
    export const updateTypeAssertion = Debug.deprecate(factory.updateTypeAssertion, factoryDeprecation);

    /** @deprecated Use `factory.createParenthesizedExpression` or the factory supplied by your transformation context instead. */
    export const createParen = Debug.deprecate(factory.createParenthesizedExpression, factoryDeprecation);

    /** @deprecated Use `factory.updateParenthesizedExpression` or the factory supplied by your transformation context instead. */
    export const updateParen = Debug.deprecate(factory.updateParenthesizedExpression, factoryDeprecation);

    /** @deprecated Use `factory.createFunctionExpression` or the factory supplied by your transformation context instead. */
    export const createFunctionExpression = Debug.deprecate(factory.createFunctionExpression, factoryDeprecation);

    /** @deprecated Use `factory.updateFunctionExpression` or the factory supplied by your transformation context instead. */
    export const updateFunctionExpression = Debug.deprecate(factory.updateFunctionExpression, factoryDeprecation);

    /** @deprecated Use `factory.createDeleteExpression` or the factory supplied by your transformation context instead. */
    export const createDelete = Debug.deprecate(factory.createDeleteExpression, factoryDeprecation);

    /** @deprecated Use `factory.updateDeleteExpression` or the factory supplied by your transformation context instead. */
    export const updateDelete = Debug.deprecate(factory.updateDeleteExpression, factoryDeprecation);

    /** @deprecated Use `factory.createTypeOfExpression` or the factory supplied by your transformation context instead. */
    export const createTypeOf = Debug.deprecate(factory.createTypeOfExpression, factoryDeprecation);

    /** @deprecated Use `factory.updateTypeOfExpression` or the factory supplied by your transformation context instead. */
    export const updateTypeOf = Debug.deprecate(factory.updateTypeOfExpression, factoryDeprecation);

    /** @deprecated Use `factory.createVoidExpression` or the factory supplied by your transformation context instead. */
    export const createVoid = Debug.deprecate(factory.createVoidExpression, factoryDeprecation);

    /** @deprecated Use `factory.updateVoidExpression` or the factory supplied by your transformation context instead. */
    export const updateVoid = Debug.deprecate(factory.updateVoidExpression, factoryDeprecation);

    /** @deprecated Use `factory.createAwaitExpression` or the factory supplied by your transformation context instead. */
    export const createAwait = Debug.deprecate(factory.createAwaitExpression, factoryDeprecation);

    /** @deprecated Use `factory.updateAwaitExpression` or the factory supplied by your transformation context instead. */
    export const updateAwait = Debug.deprecate(factory.updateAwaitExpression, factoryDeprecation);

    /** @deprecated Use `factory.createPrefixExpression` or the factory supplied by your transformation context instead. */
    export const createPrefix = Debug.deprecate(factory.createPrefixUnaryExpression, factoryDeprecation);

    /** @deprecated Use `factory.updatePrefixExpression` or the factory supplied by your transformation context instead. */
    export const updatePrefix = Debug.deprecate(factory.updatePrefixUnaryExpression, factoryDeprecation);

    /** @deprecated Use `factory.createPostfixUnaryExpression` or the factory supplied by your transformation context instead. */
    export const createPostfix = Debug.deprecate(factory.createPostfixUnaryExpression, factoryDeprecation);

    /** @deprecated Use `factory.updatePostfixUnaryExpression` or the factory supplied by your transformation context instead. */
    export const updatePostfix = Debug.deprecate(factory.updatePostfixUnaryExpression, factoryDeprecation);

    /** @deprecated Use `factory.createBinaryExpression` or the factory supplied by your transformation context instead. */
    export const createBinary = Debug.deprecate(factory.createBinaryExpression, factoryDeprecation);

    /** @deprecated Use `factory.updateConditionalExpression` or the factory supplied by your transformation context instead. */
    export const updateConditional = Debug.deprecate(factory.updateConditionalExpression, factoryDeprecation);

    /** @deprecated Use `factory.createTemplateExpression` or the factory supplied by your transformation context instead. */
    export const createTemplateExpression = Debug.deprecate(factory.createTemplateExpression, factoryDeprecation);

    /** @deprecated Use `factory.updateTemplateExpression` or the factory supplied by your transformation context instead. */
    export const updateTemplateExpression = Debug.deprecate(factory.updateTemplateExpression, factoryDeprecation);

    /** @deprecated Use `factory.createTemplateHead` or the factory supplied by your transformation context instead. */
    export const createTemplateHead = Debug.deprecate(factory.createTemplateHead, factoryDeprecation);

    /** @deprecated Use `factory.createTemplateMiddle` or the factory supplied by your transformation context instead. */
    export const createTemplateMiddle = Debug.deprecate(factory.createTemplateMiddle, factoryDeprecation);

    /** @deprecated Use `factory.createTemplateTail` or the factory supplied by your transformation context instead. */
    export const createTemplateTail = Debug.deprecate(factory.createTemplateTail, factoryDeprecation);

    /** @deprecated Use `factory.createNoSubstitutionTemplateLiteral` or the factory supplied by your transformation context instead. */
    export const createNoSubstitutionTemplateLiteral = Debug.deprecate(factory.createNoSubstitutionTemplateLiteral, factoryDeprecation);

    /** @deprecated Use `factory.updateYieldExpression` or the factory supplied by your transformation context instead. */
    export const updateYield = Debug.deprecate(factory.updateYieldExpression, factoryDeprecation);

    /** @deprecated Use `factory.createSpreadExpression` or the factory supplied by your transformation context instead. */
    export const createSpread = Debug.deprecate(factory.createSpreadElement, factoryDeprecation);

    /** @deprecated Use `factory.updateSpreadExpression` or the factory supplied by your transformation context instead. */
    export const updateSpread = Debug.deprecate(factory.updateSpreadElement, factoryDeprecation);

    /** @deprecated Use `factory.createOmittedExpression` or the factory supplied by your transformation context instead. */
    export const createOmittedExpression = Debug.deprecate(factory.createOmittedExpression, factoryDeprecation);

    /** @deprecated Use `factory.createAsExpression` or the factory supplied by your transformation context instead. */
    export const createAsExpression = Debug.deprecate(factory.createAsExpression, factoryDeprecation);

    /** @deprecated Use `factory.updateAsExpression` or the factory supplied by your transformation context instead. */
    export const updateAsExpression = Debug.deprecate(factory.updateAsExpression, factoryDeprecation);

    /** @deprecated Use `factory.createNonNullExpression` or the factory supplied by your transformation context instead. */
    export const createNonNullExpression = Debug.deprecate(factory.createNonNullExpression, factoryDeprecation);

    /** @deprecated Use `factory.updateNonNullExpression` or the factory supplied by your transformation context instead. */
    export const updateNonNullExpression = Debug.deprecate(factory.updateNonNullExpression, factoryDeprecation);

    /** @deprecated Use `factory.createNonNullChain` or the factory supplied by your transformation context instead. */
    export const createNonNullChain = Debug.deprecate(factory.createNonNullChain, factoryDeprecation);

    /** @deprecated Use `factory.updateNonNullChain` or the factory supplied by your transformation context instead. */
    export const updateNonNullChain = Debug.deprecate(factory.updateNonNullChain, factoryDeprecation);

    /** @deprecated Use `factory.createMetaProperty` or the factory supplied by your transformation context instead. */
    export const createMetaProperty = Debug.deprecate(factory.createMetaProperty, factoryDeprecation);

    /** @deprecated Use `factory.updateMetaProperty` or the factory supplied by your transformation context instead. */
    export const updateMetaProperty = Debug.deprecate(factory.updateMetaProperty, factoryDeprecation);

    /** @deprecated Use `factory.createTemplateSpan` or the factory supplied by your transformation context instead. */
    export const createTemplateSpan = Debug.deprecate(factory.createTemplateSpan, factoryDeprecation);

    /** @deprecated Use `factory.updateTemplateSpan` or the factory supplied by your transformation context instead. */
    export const updateTemplateSpan = Debug.deprecate(factory.updateTemplateSpan, factoryDeprecation);

    /** @deprecated Use `factory.createSemicolonClassElement` or the factory supplied by your transformation context instead. */
    export const createSemicolonClassElement = Debug.deprecate(factory.createSemicolonClassElement, factoryDeprecation);

    /** @deprecated Use `factory.createBlock` or the factory supplied by your transformation context instead. */
    export const createBlock = Debug.deprecate(factory.createBlock, factoryDeprecation);

    /** @deprecated Use `factory.updateBlock` or the factory supplied by your transformation context instead. */
    export const updateBlock = Debug.deprecate(factory.updateBlock, factoryDeprecation);

    /** @deprecated Use `factory.createVariableStatement` or the factory supplied by your transformation context instead. */
    export const createVariableStatement = Debug.deprecate(factory.createVariableStatement, factoryDeprecation);

    /** @deprecated Use `factory.updateVariableStatement` or the factory supplied by your transformation context instead. */
    export const updateVariableStatement = Debug.deprecate(factory.updateVariableStatement, factoryDeprecation);

    /** @deprecated Use `factory.createEmptyStatement` or the factory supplied by your transformation context instead. */
    export const createEmptyStatement = Debug.deprecate(factory.createEmptyStatement, factoryDeprecation);

    /** @deprecated Use `factory.createExpressionStatement` or the factory supplied by your transformation context instead. */
    export const createExpressionStatement = Debug.deprecate(factory.createExpressionStatement, factoryDeprecation);

    /** @deprecated Use `factory.updateExpressionStatement` or the factory supplied by your transformation context instead. */
    export const updateExpressionStatement = Debug.deprecate(factory.updateExpressionStatement, factoryDeprecation);

    /** @deprecated Use `factory.createExpressionStatement` or the factory supplied by your transformation context instead. */
    export const createStatement = Debug.deprecate(factory.createExpressionStatement, factoryDeprecation);

    /** @deprecated Use `factory.updateExpressionStatement` or the factory supplied by your transformation context instead. */
    export const updateStatement = Debug.deprecate(factory.updateExpressionStatement, factoryDeprecation);

    /** @deprecated Use `factory.createIfStatement` or the factory supplied by your transformation context instead. */
    export const createIf = Debug.deprecate(factory.createIfStatement, factoryDeprecation);

    /** @deprecated Use `factory.updateIfStatement` or the factory supplied by your transformation context instead. */
    export const updateIf = Debug.deprecate(factory.updateIfStatement, factoryDeprecation);

    /** @deprecated Use `factory.createDoStatement` or the factory supplied by your transformation context instead. */
    export const createDo = Debug.deprecate(factory.createDoStatement, factoryDeprecation);

    /** @deprecated Use `factory.updateDoStatement` or the factory supplied by your transformation context instead. */
    export const updateDo = Debug.deprecate(factory.updateDoStatement, factoryDeprecation);

    /** @deprecated Use `factory.createWhileStatement` or the factory supplied by your transformation context instead. */
    export const createWhile = Debug.deprecate(factory.createWhileStatement, factoryDeprecation);

    /** @deprecated Use `factory.updateWhileStatement` or the factory supplied by your transformation context instead. */
    export const updateWhile = Debug.deprecate(factory.updateWhileStatement, factoryDeprecation);

    /** @deprecated Use `factory.createForStatement` or the factory supplied by your transformation context instead. */
    export const createFor = Debug.deprecate(factory.createForStatement, factoryDeprecation);

    /** @deprecated Use `factory.updateForStatement` or the factory supplied by your transformation context instead. */
    export const updateFor = Debug.deprecate(factory.updateForStatement, factoryDeprecation);

    /** @deprecated Use `factory.createForInStatement` or the factory supplied by your transformation context instead. */
    export const createForIn = Debug.deprecate(factory.createForInStatement, factoryDeprecation);

    /** @deprecated Use `factory.updateForInStatement` or the factory supplied by your transformation context instead. */
    export const updateForIn = Debug.deprecate(factory.updateForInStatement, factoryDeprecation);

    /** @deprecated Use `factory.createForOfStatement` or the factory supplied by your transformation context instead. */
    export const createForOf = Debug.deprecate(factory.createForOfStatement, factoryDeprecation);

    /** @deprecated Use `factory.updateForOfStatement` or the factory supplied by your transformation context instead. */
    export const updateForOf = Debug.deprecate(factory.updateForOfStatement, factoryDeprecation);

    /** @deprecated Use `factory.createContinueStatement` or the factory supplied by your transformation context instead. */
    export const createContinue = Debug.deprecate(factory.createContinueStatement, factoryDeprecation);

    /** @deprecated Use `factory.updateContinueStatement` or the factory supplied by your transformation context instead. */
    export const updateContinue = Debug.deprecate(factory.updateContinueStatement, factoryDeprecation);

    /** @deprecated Use `factory.createBreakStatement` or the factory supplied by your transformation context instead. */
    export const createBreak = Debug.deprecate(factory.createBreakStatement, factoryDeprecation);

    /** @deprecated Use `factory.updateBreakStatement` or the factory supplied by your transformation context instead. */
    export const updateBreak = Debug.deprecate(factory.updateBreakStatement, factoryDeprecation);

    /** @deprecated Use `factory.createReturnStatement` or the factory supplied by your transformation context instead. */
    export const createReturn = Debug.deprecate(factory.createReturnStatement, factoryDeprecation);

    /** @deprecated Use `factory.updateReturnStatement` or the factory supplied by your transformation context instead. */
    export const updateReturn = Debug.deprecate(factory.updateReturnStatement, factoryDeprecation);

    /** @deprecated Use `factory.createWithStatement` or the factory supplied by your transformation context instead. */
    export const createWith = Debug.deprecate(factory.createWithStatement, factoryDeprecation);

    /** @deprecated Use `factory.updateWithStatement` or the factory supplied by your transformation context instead. */
    export const updateWith = Debug.deprecate(factory.updateWithStatement, factoryDeprecation);

    /** @deprecated Use `factory.createSwitchStatement` or the factory supplied by your transformation context instead. */
    export const createSwitch = Debug.deprecate(factory.createSwitchStatement, factoryDeprecation);

    /** @deprecated Use `factory.updateSwitchStatement` or the factory supplied by your transformation context instead. */
    export const updateSwitch = Debug.deprecate(factory.updateSwitchStatement, factoryDeprecation);

    /** @deprecated Use `factory.createLabelStatement` or the factory supplied by your transformation context instead. */
    export const createLabel = Debug.deprecate(factory.createLabeledStatement, factoryDeprecation);

    /** @deprecated Use `factory.updateLabelStatement` or the factory supplied by your transformation context instead. */
    export const updateLabel = Debug.deprecate(factory.updateLabeledStatement, factoryDeprecation);

    /** @deprecated Use `factory.createThrowStatement` or the factory supplied by your transformation context instead. */
    export const createThrow = Debug.deprecate(factory.createThrowStatement, factoryDeprecation);

    /** @deprecated Use `factory.updateThrowStatement` or the factory supplied by your transformation context instead. */
    export const updateThrow = Debug.deprecate(factory.updateThrowStatement, factoryDeprecation);

    /** @deprecated Use `factory.createTryStatement` or the factory supplied by your transformation context instead. */
    export const createTry = Debug.deprecate(factory.createTryStatement, factoryDeprecation);

    /** @deprecated Use `factory.updateTryStatement` or the factory supplied by your transformation context instead. */
    export const updateTry = Debug.deprecate(factory.updateTryStatement, factoryDeprecation);

    /** @deprecated Use `factory.createDebuggerStatement` or the factory supplied by your transformation context instead. */
    export const createDebuggerStatement = Debug.deprecate(factory.createDebuggerStatement, factoryDeprecation);

    /** @deprecated Use `factory.createVariableDeclarationList` or the factory supplied by your transformation context instead. */
    export const createVariableDeclarationList = Debug.deprecate(factory.createVariableDeclarationList, factoryDeprecation);

    /** @deprecated Use `factory.updateVariableDeclarationList` or the factory supplied by your transformation context instead. */
    export const updateVariableDeclarationList = Debug.deprecate(factory.updateVariableDeclarationList, factoryDeprecation);

    /** @deprecated Use `factory.createFunctionDeclaration` or the factory supplied by your transformation context instead. */
    export const createFunctionDeclaration = Debug.deprecate(factory.createFunctionDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.updateFunctionDeclaration` or the factory supplied by your transformation context instead. */
    export const updateFunctionDeclaration = Debug.deprecate(factory.updateFunctionDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.createClassDeclaration` or the factory supplied by your transformation context instead. */
    export const createClassDeclaration = Debug.deprecate(factory.createClassDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.updateClassDeclaration` or the factory supplied by your transformation context instead. */
    export const updateClassDeclaration = Debug.deprecate(factory.updateClassDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.createInterfaceDeclaration` or the factory supplied by your transformation context instead. */
    export const createInterfaceDeclaration = Debug.deprecate(factory.createInterfaceDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.updateInterfaceDeclaration` or the factory supplied by your transformation context instead. */
    export const updateInterfaceDeclaration = Debug.deprecate(factory.updateInterfaceDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.createTypeAliasDeclaration` or the factory supplied by your transformation context instead. */
    export const createTypeAliasDeclaration = Debug.deprecate(factory.createTypeAliasDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.updateTypeAliasDeclaration` or the factory supplied by your transformation context instead. */
    export const updateTypeAliasDeclaration = Debug.deprecate(factory.updateTypeAliasDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.createEnumDeclaration` or the factory supplied by your transformation context instead. */
    export const createEnumDeclaration = Debug.deprecate(factory.createEnumDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.updateEnumDeclaration` or the factory supplied by your transformation context instead. */
    export const updateEnumDeclaration = Debug.deprecate(factory.updateEnumDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.createModuleDeclaration` or the factory supplied by your transformation context instead. */
    export const createModuleDeclaration = Debug.deprecate(factory.createModuleDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.updateModuleDeclaration` or the factory supplied by your transformation context instead. */
    export const updateModuleDeclaration = Debug.deprecate(factory.updateModuleDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.createModuleBlock` or the factory supplied by your transformation context instead. */
    export const createModuleBlock = Debug.deprecate(factory.createModuleBlock, factoryDeprecation);

    /** @deprecated Use `factory.updateModuleBlock` or the factory supplied by your transformation context instead. */
    export const updateModuleBlock = Debug.deprecate(factory.updateModuleBlock, factoryDeprecation);

    /** @deprecated Use `factory.createCaseBlock` or the factory supplied by your transformation context instead. */
    export const createCaseBlock = Debug.deprecate(factory.createCaseBlock, factoryDeprecation);

    /** @deprecated Use `factory.updateCaseBlock` or the factory supplied by your transformation context instead. */
    export const updateCaseBlock = Debug.deprecate(factory.updateCaseBlock, factoryDeprecation);

    /** @deprecated Use `factory.createNamespaceExportDeclaration` or the factory supplied by your transformation context instead. */
    export const createNamespaceExportDeclaration = Debug.deprecate(factory.createNamespaceExportDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.updateNamespaceExportDeclaration` or the factory supplied by your transformation context instead. */
    export const updateNamespaceExportDeclaration = Debug.deprecate(factory.updateNamespaceExportDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.createImportEqualsDeclaration` or the factory supplied by your transformation context instead. */
    export const createImportEqualsDeclaration = Debug.deprecate(factory.createImportEqualsDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.updateImportEqualsDeclaration` or the factory supplied by your transformation context instead. */
    export const updateImportEqualsDeclaration = Debug.deprecate(factory.updateImportEqualsDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.createImportDeclaration` or the factory supplied by your transformation context instead. */
    export const createImportDeclaration = Debug.deprecate(factory.createImportDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.updateImportDeclaration` or the factory supplied by your transformation context instead. */
    export const updateImportDeclaration = Debug.deprecate(factory.updateImportDeclaration, factoryDeprecation);

    /** @deprecated Use `factory.createNamespaceImport` or the factory supplied by your transformation context instead. */
    export const createNamespaceImport = Debug.deprecate(factory.createNamespaceImport, factoryDeprecation);

    /** @deprecated Use `factory.updateNamespaceImport` or the factory supplied by your transformation context instead. */
    export const updateNamespaceImport = Debug.deprecate(factory.updateNamespaceImport, factoryDeprecation);

    /** @deprecated Use `factory.createNamedImports` or the factory supplied by your transformation context instead. */
    export const createNamedImports = Debug.deprecate(factory.createNamedImports, factoryDeprecation);

    /** @deprecated Use `factory.updateNamedImports` or the factory supplied by your transformation context instead. */
    export const updateNamedImports = Debug.deprecate(factory.updateNamedImports, factoryDeprecation);

    /** @deprecated Use `factory.createImportSpecifier` or the factory supplied by your transformation context instead. */
    export const createImportSpecifier = Debug.deprecate(factory.createImportSpecifier, factoryDeprecation);

    /** @deprecated Use `factory.updateImportSpecifier` or the factory supplied by your transformation context instead. */
    export const updateImportSpecifier = Debug.deprecate(factory.updateImportSpecifier, factoryDeprecation);

    /** @deprecated Use `factory.createExportAssignment` or the factory supplied by your transformation context instead. */
    export const createExportAssignment = Debug.deprecate(factory.createExportAssignment, factoryDeprecation);

    /** @deprecated Use `factory.updateExportAssignment` or the factory supplied by your transformation context instead. */
    export const updateExportAssignment = Debug.deprecate(factory.updateExportAssignment, factoryDeprecation);

    /** @deprecated Use `factory.createNamedExports` or the factory supplied by your transformation context instead. */
    export const createNamedExports = Debug.deprecate(factory.createNamedExports, factoryDeprecation);

    /** @deprecated Use `factory.updateNamedExports` or the factory supplied by your transformation context instead. */
    export const updateNamedExports = Debug.deprecate(factory.updateNamedExports, factoryDeprecation);

    /** @deprecated Use `factory.createExportSpecifier` or the factory supplied by your transformation context instead. */
    export const createExportSpecifier = Debug.deprecate(factory.createExportSpecifier, factoryDeprecation);

    /** @deprecated Use `factory.updateExportSpecifier` or the factory supplied by your transformation context instead. */
    export const updateExportSpecifier = Debug.deprecate(factory.updateExportSpecifier, factoryDeprecation);

    /** @deprecated Use `factory.createExternalModuleReference` or the factory supplied by your transformation context instead. */
    export const createExternalModuleReference = Debug.deprecate(factory.createExternalModuleReference, factoryDeprecation);

    /** @deprecated Use `factory.updateExternalModuleReference` or the factory supplied by your transformation context instead. */
    export const updateExternalModuleReference = Debug.deprecate(factory.updateExternalModuleReference, factoryDeprecation);

    /** @deprecated Use `factory.createJSDocTypeExpression` or the factory supplied by your transformation context instead. */
    export const createJSDocTypeExpression = Debug.deprecate(factory.createJSDocTypeExpression, factoryDeprecation);

    /** @deprecated Use `factory.createJSDocTypeTag` or the factory supplied by your transformation context instead. */
    export const createJSDocTypeTag = Debug.deprecate(factory.createJSDocTypeTag, factoryDeprecation);

    /** @deprecated Use `factory.createJSDocReturnTag` or the factory supplied by your transformation context instead. */
    export const createJSDocReturnTag = Debug.deprecate(factory.createJSDocReturnTag, factoryDeprecation);

    /** @deprecated Use `factory.createJSDocThisTag` or the factory supplied by your transformation context instead. */
    export const createJSDocThisTag = Debug.deprecate(factory.createJSDocThisTag, factoryDeprecation);

    /** @deprecated Use `factory.createJSDocComment` or the factory supplied by your transformation context instead. */
    export const createJSDocComment = Debug.deprecate(factory.createJSDocComment, factoryDeprecation);

    /** @deprecated Use `factory.createJSDocParameterTag` or the factory supplied by your transformation context instead. */
    export const createJSDocParameterTag = Debug.deprecate(factory.createJSDocParameterTag, factoryDeprecation);

    /** @deprecated Use `factory.createJSDocClassTag` or the factory supplied by your transformation context instead. */
    export const createJSDocClassTag = Debug.deprecate(factory.createJSDocClassTag, factoryDeprecation);

    /** @deprecated Use `factory.createJSDocAugmentsTag` or the factory supplied by your transformation context instead. */
    export const createJSDocAugmentsTag = Debug.deprecate(factory.createJSDocAugmentsTag, factoryDeprecation);

    /** @deprecated Use `factory.createJSDocEnumTag` or the factory supplied by your transformation context instead. */
    export const createJSDocEnumTag = Debug.deprecate(factory.createJSDocEnumTag, factoryDeprecation);

    /** @deprecated Use `factory.createJSDocTemplateTag` or the factory supplied by your transformation context instead. */
    export const createJSDocTemplateTag = Debug.deprecate(factory.createJSDocTemplateTag, factoryDeprecation);

    /** @deprecated Use `factory.createJSDocTypedefTag` or the factory supplied by your transformation context instead. */
    export const createJSDocTypedefTag = Debug.deprecate(factory.createJSDocTypedefTag, factoryDeprecation);

    /** @deprecated Use `factory.createJSDocCallbackTag` or the factory supplied by your transformation context instead. */
    export const createJSDocCallbackTag = Debug.deprecate(factory.createJSDocCallbackTag, factoryDeprecation);

    /** @deprecated Use `factory.createJSDocSignature` or the factory supplied by your transformation context instead. */
    export const createJSDocSignature = Debug.deprecate(factory.createJSDocSignature, factoryDeprecation);

    /** @deprecated Use `factory.createJSDocPropertyTag` or the factory supplied by your transformation context instead. */
    export const createJSDocPropertyTag = Debug.deprecate(factory.createJSDocPropertyTag, factoryDeprecation);

    /** @deprecated Use `factory.createJSDocTypeLiteral` or the factory supplied by your transformation context instead. */
    export const createJSDocTypeLiteral = Debug.deprecate(factory.createJSDocTypeLiteral, factoryDeprecation);

    /** @deprecated Use `factory.createJSDocImplementsTag` or the factory supplied by your transformation context instead. */
    export const createJSDocImplementsTag = Debug.deprecate(factory.createJSDocImplementsTag, factoryDeprecation);

    /** @deprecated Use `factory.createJSDocAuthorTag` or the factory supplied by your transformation context instead. */
    export const createJSDocAuthorTag = Debug.deprecate(factory.createJSDocAuthorTag, factoryDeprecation);

    /** @deprecated Use `factory.createJSDocPublicTag` or the factory supplied by your transformation context instead. */
    export const createJSDocPublicTag = Debug.deprecate(factory.createJSDocPublicTag, factoryDeprecation);

    /** @deprecated Use `factory.createJSDocPrivateTag` or the factory supplied by your transformation context instead. */
    export const createJSDocPrivateTag = Debug.deprecate(factory.createJSDocPrivateTag, factoryDeprecation);

    /** @deprecated Use `factory.createJSDocProtectedTag` or the factory supplied by your transformation context instead. */
    export const createJSDocProtectedTag = Debug.deprecate(factory.createJSDocProtectedTag, factoryDeprecation);

    /** @deprecated Use `factory.createJSDocReadonlyTag` or the factory supplied by your transformation context instead. */
    export const createJSDocReadonlyTag = Debug.deprecate(factory.createJSDocReadonlyTag, factoryDeprecation);

    /** @deprecated Use `factory.createJSDocUnknownTag` or the factory supplied by your transformation context instead. */
    export const createJSDocTag = Debug.deprecate(factory.createJSDocUnknownTag, factoryDeprecation);

    /** @deprecated Use `factory.createJsxElement` or the factory supplied by your transformation context instead. */
    export const createJsxElement = Debug.deprecate(factory.createJsxElement, factoryDeprecation);

    /** @deprecated Use `factory.updateJsxElement` or the factory supplied by your transformation context instead. */
    export const updateJsxElement = Debug.deprecate(factory.updateJsxElement, factoryDeprecation);

    /** @deprecated Use `factory.createJsxSelfClosingElement` or the factory supplied by your transformation context instead. */
    export const createJsxSelfClosingElement = Debug.deprecate(factory.createJsxSelfClosingElement, factoryDeprecation);

    /** @deprecated Use `factory.updateJsxSelfClosingElement` or the factory supplied by your transformation context instead. */
    export const updateJsxSelfClosingElement = Debug.deprecate(factory.updateJsxSelfClosingElement, factoryDeprecation);

    /** @deprecated Use `factory.createJsxOpeningElement` or the factory supplied by your transformation context instead. */
    export const createJsxOpeningElement = Debug.deprecate(factory.createJsxOpeningElement, factoryDeprecation);

    /** @deprecated Use `factory.updateJsxOpeningElement` or the factory supplied by your transformation context instead. */
    export const updateJsxOpeningElement = Debug.deprecate(factory.updateJsxOpeningElement, factoryDeprecation);

    /** @deprecated Use `factory.createJsxClosingElement` or the factory supplied by your transformation context instead. */
    export const createJsxClosingElement = Debug.deprecate(factory.createJsxClosingElement, factoryDeprecation);

    /** @deprecated Use `factory.updateJsxClosingElement` or the factory supplied by your transformation context instead. */
    export const updateJsxClosingElement = Debug.deprecate(factory.updateJsxClosingElement, factoryDeprecation);

    /** @deprecated Use `factory.createJsxFragment` or the factory supplied by your transformation context instead. */
    export const createJsxFragment = Debug.deprecate(factory.createJsxFragment, factoryDeprecation);

    /** @deprecated Use `factory.createJsxText` or the factory supplied by your transformation context instead. */
    export const createJsxText = Debug.deprecate(factory.createJsxText, factoryDeprecation);

    /** @deprecated Use `factory.updateJsxText` or the factory supplied by your transformation context instead. */
    export const updateJsxText = Debug.deprecate(factory.updateJsxText, factoryDeprecation);

    /** @deprecated Use `factory.createJsxOpeningFragment` or the factory supplied by your transformation context instead. */
    export const createJsxOpeningFragment = Debug.deprecate(factory.createJsxOpeningFragment, factoryDeprecation);

    /** @deprecated Use `factory.createJsxJsxClosingFragment` or the factory supplied by your transformation context instead. */
    export const createJsxJsxClosingFragment = Debug.deprecate(factory.createJsxJsxClosingFragment, factoryDeprecation);

    /** @deprecated Use `factory.updateJsxFragment` or the factory supplied by your transformation context instead. */
    export const updateJsxFragment = Debug.deprecate(factory.updateJsxFragment, factoryDeprecation);

    /** @deprecated Use `factory.createJsxAttribute` or the factory supplied by your transformation context instead. */
    export const createJsxAttribute = Debug.deprecate(factory.createJsxAttribute, factoryDeprecation);

    /** @deprecated Use `factory.updateJsxAttribute` or the factory supplied by your transformation context instead. */
    export const updateJsxAttribute = Debug.deprecate(factory.updateJsxAttribute, factoryDeprecation);

    /** @deprecated Use `factory.createJsxAttributes` or the factory supplied by your transformation context instead. */
    export const createJsxAttributes = Debug.deprecate(factory.createJsxAttributes, factoryDeprecation);

    /** @deprecated Use `factory.updateJsxAttributes` or the factory supplied by your transformation context instead. */
    export const updateJsxAttributes = Debug.deprecate(factory.updateJsxAttributes, factoryDeprecation);

    /** @deprecated Use `factory.createJsxSpreadAttribute` or the factory supplied by your transformation context instead. */
    export const createJsxSpreadAttribute = Debug.deprecate(factory.createJsxSpreadAttribute, factoryDeprecation);

    /** @deprecated Use `factory.updateJsxSpreadAttribute` or the factory supplied by your transformation context instead. */
    export const updateJsxSpreadAttribute = Debug.deprecate(factory.updateJsxSpreadAttribute, factoryDeprecation);

    /** @deprecated Use `factory.createJsxExpression` or the factory supplied by your transformation context instead. */
    export const createJsxExpression = Debug.deprecate(factory.createJsxExpression, factoryDeprecation);

    /** @deprecated Use `factory.updateJsxExpression` or the factory supplied by your transformation context instead. */
    export const updateJsxExpression = Debug.deprecate(factory.updateJsxExpression, factoryDeprecation);

    /** @deprecated Use `factory.createCaseClause` or the factory supplied by your transformation context instead. */
    export const createCaseClause = Debug.deprecate(factory.createCaseClause, factoryDeprecation);

    /** @deprecated Use `factory.updateCaseClause` or the factory supplied by your transformation context instead. */
    export const updateCaseClause = Debug.deprecate(factory.updateCaseClause, factoryDeprecation);

    /** @deprecated Use `factory.createDefaultClause` or the factory supplied by your transformation context instead. */
    export const createDefaultClause = Debug.deprecate(factory.createDefaultClause, factoryDeprecation);

    /** @deprecated Use `factory.updateDefaultClause` or the factory supplied by your transformation context instead. */
    export const updateDefaultClause = Debug.deprecate(factory.updateDefaultClause, factoryDeprecation);

    /** @deprecated Use `factory.createHeritageClause` or the factory supplied by your transformation context instead. */
    export const createHeritageClause = Debug.deprecate(factory.createHeritageClause, factoryDeprecation);

    /** @deprecated Use `factory.updateHeritageClause` or the factory supplied by your transformation context instead. */
    export const updateHeritageClause = Debug.deprecate(factory.updateHeritageClause, factoryDeprecation);

    /** @deprecated Use `factory.createCatchClause` or the factory supplied by your transformation context instead. */
    export const createCatchClause = Debug.deprecate(factory.createCatchClause, factoryDeprecation);

    /** @deprecated Use `factory.updateCatchClause` or the factory supplied by your transformation context instead. */
    export const updateCatchClause = Debug.deprecate(factory.updateCatchClause, factoryDeprecation);

    /** @deprecated Use `factory.createPropertyAssignment` or the factory supplied by your transformation context instead. */
    export const createPropertyAssignment = Debug.deprecate(factory.createPropertyAssignment, factoryDeprecation);

    /** @deprecated Use `factory.updatePropertyAssignment` or the factory supplied by your transformation context instead. */
    export const updatePropertyAssignment = Debug.deprecate(factory.updatePropertyAssignment, factoryDeprecation);

    /** @deprecated Use `factory.createShorthandPropertyAssignment` or the factory supplied by your transformation context instead. */
    export const createShorthandPropertyAssignment = Debug.deprecate(factory.createShorthandPropertyAssignment, factoryDeprecation);

    /** @deprecated Use `factory.updateShorthandPropertyAssignment` or the factory supplied by your transformation context instead. */
    export const updateShorthandPropertyAssignment = Debug.deprecate(factory.updateShorthandPropertyAssignment, factoryDeprecation);

    /** @deprecated Use `factory.createSpreadAssignment` or the factory supplied by your transformation context instead. */
    export const createSpreadAssignment = Debug.deprecate(factory.createSpreadAssignment, factoryDeprecation);

    /** @deprecated Use `factory.updateSpreadAssignment` or the factory supplied by your transformation context instead. */
    export const updateSpreadAssignment = Debug.deprecate(factory.updateSpreadAssignment, factoryDeprecation);

    /** @deprecated Use `factory.createEnumMember` or the factory supplied by your transformation context instead. */
    export const createEnumMember = Debug.deprecate(factory.createEnumMember, factoryDeprecation);

    /** @deprecated Use `factory.updateEnumMember` or the factory supplied by your transformation context instead. */
    export const updateEnumMember = Debug.deprecate(factory.updateEnumMember, factoryDeprecation);

    /** @deprecated Use `factory.updateSourceFile` or the factory supplied by your transformation context instead. */
    export const updateSourceFileNode = Debug.deprecate(factory.updateSourceFile, factoryDeprecation);

    /** @deprecated Use `factory.createNotEmittedStatement` or the factory supplied by your transformation context instead. */
    export const createNotEmittedStatement = Debug.deprecate(factory.createNotEmittedStatement, factoryDeprecation);

    /** @deprecated Use `factory.createPartiallyEmittedExpression` or the factory supplied by your transformation context instead. */
    export const createPartiallyEmittedExpression = Debug.deprecate(factory.createPartiallyEmittedExpression, factoryDeprecation);

    /** @deprecated Use `factory.updatePartiallyEmittedExpression` or the factory supplied by your transformation context instead. */
    export const updatePartiallyEmittedExpression = Debug.deprecate(factory.updatePartiallyEmittedExpression, factoryDeprecation);

    /** @deprecated Use `factory.createCommaListExpression` or the factory supplied by your transformation context instead. */
    export const createCommaList = Debug.deprecate(factory.createCommaListExpression, factoryDeprecation);

    /** @deprecated Use `factory.updateCommaListExpression` or the factory supplied by your transformation context instead. */
    export const updateCommaList = Debug.deprecate(factory.updateCommaListExpression, factoryDeprecation);

    /** @deprecated Use `factory.createBundle` or the factory supplied by your transformation context instead. */
    export const createBundle = Debug.deprecate(factory.createBundle, factoryDeprecation);

    /** @deprecated Use `factory.updateBundle` or the factory supplied by your transformation context instead. */
    export const updateBundle = Debug.deprecate(factory.updateBundle, factoryDeprecation);

    /** @deprecated Use `factory.createImmediatelyInvokedFunctionExpression` or the factory supplied by your transformation context instead. */
    export const createImmediatelyInvokedFunctionExpression = Debug.deprecate(factory.createImmediatelyInvokedFunctionExpression, factoryDeprecation);

    /** @deprecated Use `factory.createImmediatelyInvokedArrowFunction` or the factory supplied by your transformation context instead. */
    export const createImmediatelyInvokedArrowFunction = Debug.deprecate(factory.createImmediatelyInvokedArrowFunction, factoryDeprecation);

    /** @deprecated Use `factory.createVoidZero` or the factory supplied by your transformation context instead. */
    export const createVoidZero = Debug.deprecate(factory.createVoidZero, factoryDeprecation);

    /** @deprecated Use `factory.createExportDefault` or the factory supplied by your transformation context instead. */
    export const createExportDefault = Debug.deprecate(factory.createExportDefault, factoryDeprecation);

    /** @deprecated Use `factory.createExternalModuleExport` or the factory supplied by your transformation context instead. */
    export const createExternalModuleExport = Debug.deprecate(factory.createExternalModuleExport, factoryDeprecation);

    /** @deprecated Use `factory.createNamespaceExport` or the factory supplied by your transformation context instead. */
    export const createNamespaceExport = Debug.deprecate(factory.createNamespaceExport, factoryDeprecation);

    /** @deprecated Use `factory.updateNamespaceExport` or the factory supplied by your transformation context instead. */
    export const updateNamespaceExport = Debug.deprecate(factory.updateNamespaceExport, factoryDeprecation);

    /** @deprecated Use `factory.createToken` or the factory supplied by your transformation context instead. */
    export const createToken = Debug.deprecate(function createToken<TKind extends SyntaxKind>(kind: TKind): Token<TKind> {
        return factory.createToken(kind);
    }, factoryDeprecation);

    /** @deprecated Use `factory.createIdentifier` or the factory supplied by your transformation context instead. */
    export const createIdentifier = Debug.deprecate(function createIdentifier(text: string) {
        return factory.createIdentifier(text, /*typeArguments*/ undefined, /*originalKeywordKind*/ undefined);
    }, factoryDeprecation);

    /** @deprecated Use `factory.createTempVariable` or the factory supplied by your transformation context instead. */
    export const createTempVariable = Debug.deprecate(function createTempVariable(recordTempVariable: ((node: Identifier) => void) | undefined): Identifier {
        return factory.createTempVariable(recordTempVariable, /*reserveInNestedScopes*/ undefined);
    }, factoryDeprecation);

    /** @deprecated Use `factory.getGeneratedNameForNode` or the factory supplied by your transformation context instead. */
    export const getGeneratedNameForNode = Debug.deprecate(function getGeneratedNameForNode(node: Node | undefined): Identifier {
        return factory.getGeneratedNameForNode(node, /*flags*/ undefined);
    }, factoryDeprecation);

    /** @deprecated Use `factory.createUniqueName(text, GeneratedIdentifierFlags.Optimistic)` or the factory supplied by your transformation context instead. */
    export const createOptimisticUniqueName = Debug.deprecate(function createOptimisticUniqueName(text: string): Identifier {
        return factory.createUniqueName(text, GeneratedIdentifierFlags.Optimistic);
    }, factoryDeprecation);

    /** @deprecated Use `factory.createUniqueName(text, GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel)` or the factory supplied by your transformation context instead. */
    export const createFileLevelUniqueName = Debug.deprecate(function createFileLevelUniqueName(text: string): Identifier {
        return factory.createUniqueName(text, GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel);
    }, factoryDeprecation);

    /** @deprecated Use `factory.createIndexSignature` or the factory supplied by your transformation context instead. */
    export const createIndexSignature = Debug.deprecate(function createIndexSignature(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration {
        return factory.createIndexSignature(decorators, modifiers, parameters, type);
    }, factoryDeprecation);

    /** @deprecated Use `factory.createTypePredicateNode` or the factory supplied by your transformation context instead. */
    export const createTypePredicateNode = Debug.deprecate(function createTypePredicateNode(parameterName: Identifier | ThisTypeNode | string, type: TypeNode): TypePredicateNode {
        return factory.createTypePredicateNode(/*assertsModifier*/ undefined, parameterName, type);
    }, factoryDeprecation);

    /** @deprecated Use `factory.updateTypePredicateNode` or the factory supplied by your transformation context instead. */
    export const updateTypePredicateNode = Debug.deprecate(function updateTypePredicateNode(node: TypePredicateNode, parameterName: Identifier | ThisTypeNode, type: TypeNode): TypePredicateNode {
        return factory.updateTypePredicateNode(node, /*assertsModifier*/ undefined, parameterName, type);
    }, factoryDeprecation);

    /** @deprecated Use `factory.createStringLiteral`, `factory.createStringLiteralFromNode`, `factory.createNumericLiteral`, `factory.createBigIntLiteral`, `factory.createTrue`, `factory.createFalse`, or the factory supplied by your transformation context instead. */
    export const createLiteral = Debug.deprecate(function createLiteral(value: string | number | PseudoBigInt | boolean | StringLiteral | NoSubstitutionTemplateLiteral | NumericLiteral | Identifier): PrimaryExpression {
        if (typeof value === "number") {
            return factory.createNumericLiteral(value);
        }
        // eslint-disable-next-line local/no-in-operator
        if (typeof value === "object" && "base10Value" in value) { // PseudoBigInt
            return factory.createBigIntLiteral(value);
        }
        if (typeof value === "boolean") {
            return value ? factory.createTrue() : factory.createFalse();
        }
        if (typeof value === "string") {
            return factory.createStringLiteral(value, /*isSingleQuote*/ undefined);
        }
        return factory.createStringLiteralFromNode(value);
    } as {
        (value: string | StringLiteral | NoSubstitutionTemplateLiteral | NumericLiteral | Identifier): StringLiteral;
        (value: number | PseudoBigInt): NumericLiteral;
        (value: boolean): BooleanLiteral;
        (value: string | number | PseudoBigInt | boolean): PrimaryExpression;
    }, { since: "4.0", warnAfter: "4.1", message: "Use `factory.createStringLiteral`, `factory.createStringLiteralFromNode`, `factory.createNumericLiteral`, `factory.createBigIntLiteral`, `factory.createTrue`, `factory.createFalse`, or the factory supplied by your transformation context instead." });

    /** @deprecated Use `factory.createMethodSignature` or the factory supplied by your transformation context instead. */
    export const createMethodSignature = Debug.deprecate(function createMethodSignature(
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
        name: string | PropertyName,
        questionToken: QuestionToken | undefined
    ) {
        return factory.createMethodSignature(/*modifiers*/ undefined, name, questionToken, typeParameters, parameters, type);
    }, factoryDeprecation);

    /** @deprecated Use `factory.updateMethodSignature` or the factory supplied by your transformation context instead. */
    export const updateMethodSignature = Debug.deprecate(function updateMethodSignature(
        node: MethodSignature,
        typeParameters: NodeArray<TypeParameterDeclaration> | undefined,
        parameters: NodeArray<ParameterDeclaration>,
        type: TypeNode | undefined,
        name: PropertyName,
        questionToken: QuestionToken | undefined
    ) {
        return factory.updateMethodSignature(node, node.modifiers, name, questionToken, typeParameters, parameters, type);
    }, factoryDeprecation);

    /** @deprecated Use `factory.createTypeOperatorNode` or the factory supplied by your transformation context instead. */
    export const createTypeOperatorNode = Debug.deprecate(function createTypeOperatorNode(operatorOrType: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword | TypeNode, type?: TypeNode) {
        let operator: TypeOperatorNode["operator"];
        if (type) {
            operator = operatorOrType as TypeOperatorNode["operator"];
        }
        else {
            type = operatorOrType as TypeNode;
            operator = SyntaxKind.KeyOfKeyword;
        }
        return factory.createTypeOperatorNode(operator, type);
    } as {
        (type: TypeNode): TypeOperatorNode;
        (operator: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword, type: TypeNode): TypeOperatorNode;
    }, factoryDeprecation);

    /** @deprecated Use `factory.createTaggedTemplate` or the factory supplied by your transformation context instead. */
    export const createTaggedTemplate = Debug.deprecate(function createTaggedTemplate(tag: Expression, typeArgumentsOrTemplate: readonly TypeNode[] | TemplateLiteral | undefined, template?: TemplateLiteral) {
        let typeArguments: readonly TypeNode[] | undefined;
        if (template) {
            typeArguments = typeArgumentsOrTemplate as readonly TypeNode[] | undefined;
        }
        else {
            template = typeArgumentsOrTemplate as TemplateLiteral;
        }
        return factory.createTaggedTemplateExpression(tag, typeArguments, template);
    } as {
        (tag: Expression, template: TemplateLiteral): TaggedTemplateExpression;
        (tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral): TaggedTemplateExpression;
    }, factoryDeprecation);

    /** @deprecated Use `factory.updateTaggedTemplate` or the factory supplied by your transformation context instead. */
    export const updateTaggedTemplate = Debug.deprecate(function updateTaggedTemplate(node: TaggedTemplateExpression, tag: Expression, typeArgumentsOrTemplate: readonly TypeNode[] | TemplateLiteral | undefined, template?: TemplateLiteral) {
        let typeArguments: readonly TypeNode[] | undefined;
        if (template) {
            typeArguments = typeArgumentsOrTemplate as readonly TypeNode[] | undefined;
        }
        else {
            template = typeArgumentsOrTemplate as TemplateLiteral;
        }
        return factory.updateTaggedTemplateExpression(node, tag, typeArguments, template);
    } as {
        (node: TaggedTemplateExpression, tag: Expression, template: TemplateLiteral): TaggedTemplateExpression;
        (node: TaggedTemplateExpression, tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral): TaggedTemplateExpression;
    }, factoryDeprecation);

    /** @deprecated Use `factory.updateBinary` or the factory supplied by your transformation context instead. */
    export const updateBinary = Debug.deprecate(function updateBinary(node: BinaryExpression, left: Expression, right: Expression, operator: BinaryOperator | BinaryOperatorToken = node.operatorToken) {
        if (typeof operator === "number") {
            operator = operator === node.operatorToken.kind ? node.operatorToken : factory.createToken(operator);
        }
        return factory.updateBinaryExpression(node, left, operator, right);
    }, factoryDeprecation);

    /** @deprecated Use `factory.createConditional` or the factory supplied by your transformation context instead. */
    export const createConditional = Debug.deprecate(function createConditional(condition: Expression, questionTokenOrWhenTrue: QuestionToken | Expression, whenTrueOrWhenFalse: Expression, colonToken?: ColonToken, whenFalse?: Expression) {
        return arguments.length === 5 ? factory.createConditionalExpression(condition, questionTokenOrWhenTrue as QuestionToken, whenTrueOrWhenFalse, colonToken, whenFalse!) :
            arguments.length === 3 ? factory.createConditionalExpression(condition, factory.createToken(SyntaxKind.QuestionToken), questionTokenOrWhenTrue as Expression, factory.createToken(SyntaxKind.ColonToken), whenTrueOrWhenFalse) :
            Debug.fail("Argument count mismatch");
    } as {
        (condition: Expression, whenTrue: Expression, whenFalse: Expression): ConditionalExpression;
        (condition: Expression, questionToken: QuestionToken, whenTrue: Expression, colonToken: ColonToken, whenFalse: Expression): ConditionalExpression;
    }, factoryDeprecation);

    /** @deprecated Use `factory.createYield` or the factory supplied by your transformation context instead. */
    export const createYield = Debug.deprecate(function createYield(asteriskTokenOrExpression?: AsteriskToken | Expression | undefined, expression?: Expression) {
        let asteriskToken: AsteriskToken | undefined;
        if (expression) {
            asteriskToken = asteriskTokenOrExpression as AsteriskToken;
        }
        else {
            expression = asteriskTokenOrExpression as Expression;
        }
        return factory.createYieldExpression(asteriskToken, expression);
    } as {
        (expression?: Expression | undefined): YieldExpression;
        (asteriskToken: AsteriskToken | undefined, expression: Expression): YieldExpression;
    }, factoryDeprecation);

    /** @deprecated Use `factory.createClassExpression` or the factory supplied by your transformation context instead. */
    export const createClassExpression = Debug.deprecate(function createClassExpression(
        modifiers: readonly Modifier[] | undefined,
        name: string | Identifier | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly HeritageClause[] | undefined,
        members: readonly ClassElement[]
    ) {
        return factory.createClassExpression(/*decorators*/ undefined, modifiers, name, typeParameters, heritageClauses, members);
    }, factoryDeprecation);

    /** @deprecated Use `factory.updateClassExpression` or the factory supplied by your transformation context instead. */
    export const updateClassExpression = Debug.deprecate(function updateClassExpression(
        node: ClassExpression,
        modifiers: readonly Modifier[] | undefined,
        name: Identifier | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly HeritageClause[] | undefined,
        members: readonly ClassElement[]
    ) {
        return factory.updateClassExpression(node, /*decorators*/ undefined, modifiers, name, typeParameters, heritageClauses, members);
    }, factoryDeprecation);

    /** @deprecated Use `factory.createPropertySignature` or the factory supplied by your transformation context instead. */
    export const createPropertySignature = Debug.deprecate(function createPropertySignature(
        modifiers: readonly Modifier[] | undefined,
        name: PropertyName | string,
        questionToken: QuestionToken | undefined,
        type: TypeNode | undefined,
        initializer?: Expression | undefined
    ): PropertySignature {
        const node = factory.createPropertySignature(modifiers, name, questionToken, type);
        (node as Mutable<PropertySignature>).initializer = initializer;
        return node;
    }, factoryDeprecation);

    /** @deprecated Use `factory.updatePropertySignature` or the factory supplied by your transformation context instead. */
    export const updatePropertySignature = Debug.deprecate(function updatePropertySignature(
        node: PropertySignature,
        modifiers: readonly Modifier[] | undefined,
        name: PropertyName,
        questionToken: QuestionToken | undefined,
        type: TypeNode | undefined,
        initializer: Expression | undefined
    ) {
        let updated = factory.updatePropertySignature(node, modifiers, name, questionToken, type);
        if (node.initializer !== initializer) {
            if (updated === node) {
                updated = factory.cloneNode(node);
            }
            (updated as Mutable<PropertySignature>).initializer = initializer;
        }
        return updated;
    }, factoryDeprecation);

    /** @deprecated Use `factory.createExpressionWithTypeArguments` or the factory supplied by your transformation context instead. */
    export const createExpressionWithTypeArguments = Debug.deprecate(function createExpressionWithTypeArguments(typeArguments: readonly TypeNode[] | undefined, expression: Expression) {
        return factory.createExpressionWithTypeArguments(expression, typeArguments);
    }, factoryDeprecation);

    /** @deprecated Use `factory.updateExpressionWithTypeArguments` or the factory supplied by your transformation context instead. */
    export const updateExpressionWithTypeArguments = Debug.deprecate(function updateExpressionWithTypeArguments(node: ExpressionWithTypeArguments, typeArguments: readonly TypeNode[] | undefined, expression: Expression) {
        return factory.updateExpressionWithTypeArguments(node, expression, typeArguments);
    }, factoryDeprecation);

    /** @deprecated Use `factory.createArrowFunction` or the factory supplied by your transformation context instead. */
    export const createArrowFunction = Debug.deprecate(function createArrowFunction(modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanTokenOrBody: ConciseBody | EqualsGreaterThanToken | undefined, body?: ConciseBody) {
        return arguments.length === 6 ? factory.createArrowFunction(modifiers, typeParameters, parameters, type, equalsGreaterThanTokenOrBody as EqualsGreaterThanToken | undefined, body!) :
            arguments.length === 5 ? factory.createArrowFunction(modifiers, typeParameters, parameters, type, /*equalsGreaterThanToken*/ undefined, equalsGreaterThanTokenOrBody as ConciseBody) :
            Debug.fail("Argument count mismatch");
    } as {
        (modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanToken: EqualsGreaterThanToken | undefined, body: ConciseBody): ArrowFunction;
        (modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: ConciseBody): ArrowFunction;
    }, factoryDeprecation);

    /** @deprecated Use `factory.updateArrowFunction` or the factory supplied by your transformation context instead. */
    export const updateArrowFunction = Debug.deprecate(function updateArrowFunction(node: ArrowFunction, modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanTokenOrBody: EqualsGreaterThanToken | ConciseBody, body?: ConciseBody) {
        return arguments.length === 7 ? factory.updateArrowFunction(node, modifiers, typeParameters, parameters, type, equalsGreaterThanTokenOrBody as EqualsGreaterThanToken, body!) :
            arguments.length === 6 ? factory.updateArrowFunction(node, modifiers, typeParameters, parameters, type, node.equalsGreaterThanToken, equalsGreaterThanTokenOrBody as ConciseBody) :
            Debug.fail("Argument count mismatch");
    } as {
        (node: ArrowFunction, modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanToken: EqualsGreaterThanToken, body: ConciseBody): ArrowFunction;
        (node: ArrowFunction, modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: ConciseBody): ArrowFunction;
    }, factoryDeprecation);

    /** @deprecated Use `factory.createVariableDeclaration` or the factory supplied by your transformation context instead. */
    export const createVariableDeclaration = Debug.deprecate(function createVariableDeclaration(name: string | BindingName, exclamationTokenOrType?: ExclamationToken | TypeNode, typeOrInitializer?: TypeNode | Expression, initializer?: Expression) {
        return arguments.length === 4 ? factory.createVariableDeclaration(name, exclamationTokenOrType as ExclamationToken | undefined, typeOrInitializer as TypeNode | undefined, initializer) :
            arguments.length >= 1 && arguments.length <= 3 ? factory.createVariableDeclaration(name, /*exclamationToken*/ undefined, exclamationTokenOrType as TypeNode | undefined, typeOrInitializer as Expression | undefined) :
            Debug.fail("Argument count mismatch");
    } as {
        (name: string | BindingName, type?: TypeNode | undefined, initializer?: Expression | undefined): VariableDeclaration;
        (name: string | BindingName, exclamationToken: ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration;
    }, factoryDeprecation);

    /** @deprecated Use `factory.updateVariableDeclaration` or the factory supplied by your transformation context instead. */
    export const updateVariableDeclaration = Debug.deprecate(function updateVariableDeclaration(node: VariableDeclaration, name: BindingName, exclamationTokenOrType: ExclamationToken | TypeNode | undefined, typeOrInitializer: TypeNode | Expression | undefined, initializer?: Expression | undefined) {
        return arguments.length === 5 ? factory.updateVariableDeclaration(node, name, exclamationTokenOrType as ExclamationToken | undefined, typeOrInitializer as TypeNode | undefined, initializer) :
            arguments.length === 4 ? factory.updateVariableDeclaration(node, name, node.exclamationToken, exclamationTokenOrType as TypeNode | undefined, typeOrInitializer as Expression | undefined) :
            Debug.fail("Argument count mismatch");
    } as {
        (node: VariableDeclaration, name: BindingName, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration;
        (node: VariableDeclaration, name: BindingName, exclamationToken: ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration;
    }, factoryDeprecation);

    /** @deprecated Use `factory.createImportClause` or the factory supplied by your transformation context instead. */
    export const createImportClause = Debug.deprecate(function createImportClause(name: Identifier | undefined, namedBindings: NamedImportBindings | undefined, isTypeOnly = false): ImportClause {
        return factory.createImportClause(isTypeOnly, name, namedBindings);
    }, factoryDeprecation);

    /** @deprecated Use `factory.updateImportClause` or the factory supplied by your transformation context instead. */
    export const updateImportClause = Debug.deprecate(function updateImportClause(node: ImportClause, name: Identifier | undefined, namedBindings: NamedImportBindings | undefined, isTypeOnly: boolean) {
        return factory.updateImportClause(node, isTypeOnly, name, namedBindings);
    }, factoryDeprecation);

    /** @deprecated Use `factory.createExportDeclaration` or the factory supplied by your transformation context instead. */
    export const createExportDeclaration = Debug.deprecate(function createExportDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, exportClause: NamedExportBindings | undefined, moduleSpecifier?: Expression | undefined, isTypeOnly = false) {
        return factory.createExportDeclaration(decorators, modifiers, isTypeOnly, exportClause, moduleSpecifier);
    }, factoryDeprecation);

    /** @deprecated Use `factory.updateExportDeclaration` or the factory supplied by your transformation context instead. */
    export const updateExportDeclaration = Debug.deprecate(function updateExportDeclaration(
        node: ExportDeclaration,
        decorators: readonly Decorator[] | undefined,
        modifiers: readonly Modifier[] | undefined,
        exportClause: NamedExportBindings | undefined,
        moduleSpecifier: Expression | undefined,
        isTypeOnly: boolean) {
        return factory.updateExportDeclaration(node, decorators, modifiers, isTypeOnly, exportClause, moduleSpecifier, node.assertClause);
    }, factoryDeprecation);

    /** @deprecated Use `factory.createJSDocParameterTag` or the factory supplied by your transformation context instead. */
    export const createJSDocParamTag = Debug.deprecate(function createJSDocParamTag(name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression | undefined, comment?: string | undefined): JSDocParameterTag {
        return factory.createJSDocParameterTag(/*tagName*/ undefined, name, isBracketed, typeExpression, /*isNameFirst*/ false, comment ? factory.createNodeArray([factory.createJSDocText(comment)]) : undefined);
    }, factoryDeprecation);

    /** @deprecated Use `factory.createComma` or the factory supplied by your transformation context instead. */
    export const createComma = Debug.deprecate(function createComma(left: Expression, right: Expression): Expression {
        return factory.createComma(left, right);
    }, factoryDeprecation);

    /** @deprecated Use `factory.createLessThan` or the factory supplied by your transformation context instead. */
    export const createLessThan = Debug.deprecate(function createLessThan(left: Expression, right: Expression): Expression {
        return factory.createLessThan(left, right);
    }, factoryDeprecation);

    /** @deprecated Use `factory.createAssignment` or the factory supplied by your transformation context instead. */
    export const createAssignment = Debug.deprecate(function createAssignment(left: Expression, right: Expression): BinaryExpression {
        return factory.createAssignment(left, right);
    }, factoryDeprecation);

    /** @deprecated Use `factory.createStrictEquality` or the factory supplied by your transformation context instead. */
    export const createStrictEquality = Debug.deprecate(function createStrictEquality(left: Expression, right: Expression): BinaryExpression {
        return factory.createStrictEquality(left, right);
    }, factoryDeprecation);

    /** @deprecated Use `factory.createStrictInequality` or the factory supplied by your transformation context instead. */
    export const createStrictInequality = Debug.deprecate(function createStrictInequality(left: Expression, right: Expression): BinaryExpression {
        return factory.createStrictInequality(left, right);
    }, factoryDeprecation);

    /** @deprecated Use `factory.createAdd` or the factory supplied by your transformation context instead. */
    export const createAdd = Debug.deprecate(function createAdd(left: Expression, right: Expression): BinaryExpression {
        return factory.createAdd(left, right);
    }, factoryDeprecation);

    /** @deprecated Use `factory.createSubtract` or the factory supplied by your transformation context instead. */
    export const createSubtract = Debug.deprecate(function createSubtract(left: Expression, right: Expression): BinaryExpression {
        return factory.createSubtract(left, right);
    }, factoryDeprecation);

    /** @deprecated Use `factory.createLogicalAnd` or the factory supplied by your transformation context instead. */
    export const createLogicalAnd = Debug.deprecate(function createLogicalAnd(left: Expression, right: Expression): BinaryExpression {
        return factory.createLogicalAnd(left, right);
    }, factoryDeprecation);

    /** @deprecated Use `factory.createLogicalOr` or the factory supplied by your transformation context instead. */
    export const createLogicalOr = Debug.deprecate(function createLogicalOr(left: Expression, right: Expression): BinaryExpression {
        return factory.createLogicalOr(left, right);
    }, factoryDeprecation);

    /** @deprecated Use `factory.createPostfixIncrement` or the factory supplied by your transformation context instead. */
    export const createPostfixIncrement = Debug.deprecate(function createPostfixIncrement(operand: Expression): PostfixUnaryExpression {
        return factory.createPostfixIncrement(operand);
    }, factoryDeprecation);

    /** @deprecated Use `factory.createLogicalNot` or the factory supplied by your transformation context instead. */
    export const createLogicalNot = Debug.deprecate(function createLogicalNot(operand: Expression): PrefixUnaryExpression {
        return factory.createLogicalNot(operand);
    }, factoryDeprecation);

    /** @deprecated Use an appropriate `factory` method instead. */
    export const createNode = Debug.deprecate(function createNode(kind: SyntaxKind, pos = 0, end = 0): Node {
        return setTextRangePosEnd(
            kind === SyntaxKind.SourceFile ? parseBaseNodeFactory.createBaseSourceFileNode(kind) :
            kind === SyntaxKind.Identifier ? parseBaseNodeFactory.createBaseIdentifierNode(kind) :
            kind === SyntaxKind.PrivateIdentifier ? parseBaseNodeFactory.createBasePrivateIdentifierNode(kind) :
            !isNodeKind(kind) ? parseBaseNodeFactory.createBaseTokenNode(kind) :
            parseBaseNodeFactory.createBaseNode(kind),
            pos,
            end
        );
    }, { since: "4.0", warnAfter: "4.1", message: "Use an appropriate `factory` method instead." });

    /**
     * Creates a shallow, memberwise clone of a node ~for mutation~ with its `pos`, `end`, and `parent` set.
     *
     * NOTE: It is unsafe to change any properties of a `Node` that relate to its AST children, as those changes won't be
     * captured with respect to transformations.
     *
     * @deprecated Use an appropriate `factory.update...` method instead, use `setCommentRange` or `setSourceMapRange`, and avoid setting `parent`.
     */
    export const getMutableClone = Debug.deprecate(function getMutableClone<T extends Node>(node: T): T {
        const clone = factory.cloneNode(node);
        setTextRange(clone, node);
        setParent(clone, node.parent);
        return clone;
    }, { since: "4.0", warnAfter: "4.1", message: "Use an appropriate `factory.update...` method instead, use `setCommentRange` or `setSourceMapRange`, and avoid setting `parent`." });
}
