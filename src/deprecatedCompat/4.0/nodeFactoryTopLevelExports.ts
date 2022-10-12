// DEPRECATION: Node factory top-level exports
// DEPRECATION PLAN:
//     - soft: 4.0
//     - warn: 4.1
//     - error: 5.0
namespace ts {

// NOTE: These exports are deprecated in favor of using a `NodeFactory` instance and exist here purely for backwards compatibility reasons.
const factoryDeprecation: ts.DeprecationOptions = { since: "4.0", warnAfter: "4.1", message: "Use the appropriate method on 'ts.factory' or the 'factory' supplied by your transformation context instead." };

/** @deprecated Use `factory.createNodeArray` or the factory supplied by your transformation context instead. */
export const createNodeArray = ts.Debug.deprecate(ts.factory.createNodeArray, factoryDeprecation);

/** @deprecated Use `factory.createNumericLiteral` or the factory supplied by your transformation context instead. */
export const createNumericLiteral = ts.Debug.deprecate(ts.factory.createNumericLiteral, factoryDeprecation);

/** @deprecated Use `factory.createBigIntLiteral` or the factory supplied by your transformation context instead. */
export const createBigIntLiteral = ts.Debug.deprecate(ts.factory.createBigIntLiteral, factoryDeprecation);

/** @deprecated Use `factory.createStringLiteral` or the factory supplied by your transformation context instead. */
export const createStringLiteral = ts.Debug.deprecate(ts.factory.createStringLiteral, factoryDeprecation);

/** @deprecated Use `factory.createStringLiteralFromNode` or the factory supplied by your transformation context instead. */
export const createStringLiteralFromNode = ts.Debug.deprecate(ts.factory.createStringLiteralFromNode, factoryDeprecation);

/** @deprecated Use `factory.createRegularExpressionLiteral` or the factory supplied by your transformation context instead. */
export const createRegularExpressionLiteral = ts.Debug.deprecate(ts.factory.createRegularExpressionLiteral, factoryDeprecation);

/** @deprecated Use `factory.createLoopVariable` or the factory supplied by your transformation context instead. */
export const createLoopVariable = ts.Debug.deprecate(ts.factory.createLoopVariable, factoryDeprecation);

/** @deprecated Use `factory.createUniqueName` or the factory supplied by your transformation context instead. */
export const createUniqueName: (text: string, flags?: ts.GeneratedIdentifierFlags | undefined) => ts.Identifier = ts.Debug.deprecate(ts.factory.createUniqueName, factoryDeprecation);

/** @deprecated Use `factory.createPrivateIdentifier` or the factory supplied by your transformation context instead. */
export const createPrivateIdentifier = ts.Debug.deprecate(ts.factory.createPrivateIdentifier, factoryDeprecation);

/** @deprecated Use `factory.createSuper` or the factory supplied by your transformation context instead. */
export const createSuper = ts.Debug.deprecate(ts.factory.createSuper, factoryDeprecation);

/** @deprecated Use `factory.createThis` or the factory supplied by your transformation context instead. */
export const createThis = ts.Debug.deprecate(ts.factory.createThis, factoryDeprecation);

/** @deprecated Use `factory.createNull` or the factory supplied by your transformation context instead. */
export const createNull = ts.Debug.deprecate(ts.factory.createNull, factoryDeprecation);

/** @deprecated Use `factory.createTrue` or the factory supplied by your transformation context instead. */
export const createTrue = ts.Debug.deprecate(ts.factory.createTrue, factoryDeprecation);

/** @deprecated Use `factory.createFalse` or the factory supplied by your transformation context instead. */
export const createFalse = ts.Debug.deprecate(ts.factory.createFalse, factoryDeprecation);

/** @deprecated Use `factory.createModifier` or the factory supplied by your transformation context instead. */
export const createModifier = ts.Debug.deprecate(ts.factory.createModifier, factoryDeprecation);

/** @deprecated Use `factory.createModifiersFromModifierFlags` or the factory supplied by your transformation context instead. */
export const createModifiersFromModifierFlags = ts.Debug.deprecate(ts.factory.createModifiersFromModifierFlags, factoryDeprecation);

/** @deprecated Use `factory.createQualifiedName` or the factory supplied by your transformation context instead. */
export const createQualifiedName = ts.Debug.deprecate(ts.factory.createQualifiedName, factoryDeprecation);

/** @deprecated Use `factory.updateQualifiedName` or the factory supplied by your transformation context instead. */
export const updateQualifiedName = ts.Debug.deprecate(ts.factory.updateQualifiedName, factoryDeprecation);

/** @deprecated Use `factory.createComputedPropertyName` or the factory supplied by your transformation context instead. */
export const createComputedPropertyName = ts.Debug.deprecate(ts.factory.createComputedPropertyName, factoryDeprecation);

/** @deprecated Use `factory.updateComputedPropertyName` or the factory supplied by your transformation context instead. */
export const updateComputedPropertyName = ts.Debug.deprecate(ts.factory.updateComputedPropertyName, factoryDeprecation);

/** @deprecated Use `factory.createTypeParameterDeclaration` or the factory supplied by your transformation context instead. */
export const createTypeParameterDeclaration = ts.Debug.deprecate(ts.factory.createTypeParameterDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateTypeParameterDeclaration` or the factory supplied by your transformation context instead. */
export const updateTypeParameterDeclaration = ts.Debug.deprecate(ts.factory.updateTypeParameterDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createParameterDeclaration` or the factory supplied by your transformation context instead. */
export const createParameter = ts.Debug.deprecate(ts.factory.createParameterDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateParameterDeclaration` or the factory supplied by your transformation context instead. */
export const updateParameter = ts.Debug.deprecate(ts.factory.updateParameterDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createDecorator` or the factory supplied by your transformation context instead. */
export const createDecorator = ts.Debug.deprecate(ts.factory.createDecorator, factoryDeprecation);

/** @deprecated Use `factory.updateDecorator` or the factory supplied by your transformation context instead. */
export const updateDecorator = ts.Debug.deprecate(ts.factory.updateDecorator, factoryDeprecation);

/** @deprecated Use `factory.createPropertyDeclaration` or the factory supplied by your transformation context instead. */
export const createProperty = ts.Debug.deprecate(ts.factory.createPropertyDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updatePropertyDeclaration` or the factory supplied by your transformation context instead. */
export const updateProperty = ts.Debug.deprecate(ts.factory.updatePropertyDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createMethodDeclaration` or the factory supplied by your transformation context instead. */
export const createMethod = ts.Debug.deprecate(ts.factory.createMethodDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateMethodDeclaration` or the factory supplied by your transformation context instead. */
export const updateMethod = ts.Debug.deprecate(ts.factory.updateMethodDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createConstructorDeclaration` or the factory supplied by your transformation context instead. */
export const createConstructor = ts.Debug.deprecate(ts.factory.createConstructorDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateConstructorDeclaration` or the factory supplied by your transformation context instead. */
export const updateConstructor = ts.Debug.deprecate(ts.factory.updateConstructorDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createGetAccessorDeclaration` or the factory supplied by your transformation context instead. */
export const createGetAccessor = ts.Debug.deprecate(ts.factory.createGetAccessorDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateGetAccessorDeclaration` or the factory supplied by your transformation context instead. */
export const updateGetAccessor = ts.Debug.deprecate(ts.factory.updateGetAccessorDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createSetAccessorDeclaration` or the factory supplied by your transformation context instead. */
export const createSetAccessor = ts.Debug.deprecate(ts.factory.createSetAccessorDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateSetAccessorDeclaration` or the factory supplied by your transformation context instead. */
export const updateSetAccessor = ts.Debug.deprecate(ts.factory.updateSetAccessorDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createCallSignature` or the factory supplied by your transformation context instead. */
export const createCallSignature = ts.Debug.deprecate(ts.factory.createCallSignature, factoryDeprecation);

/** @deprecated Use `factory.updateCallSignature` or the factory supplied by your transformation context instead. */
export const updateCallSignature = ts.Debug.deprecate(ts.factory.updateCallSignature, factoryDeprecation);

/** @deprecated Use `factory.createConstructSignature` or the factory supplied by your transformation context instead. */
export const createConstructSignature = ts.Debug.deprecate(ts.factory.createConstructSignature, factoryDeprecation);

/** @deprecated Use `factory.updateConstructSignature` or the factory supplied by your transformation context instead. */
export const updateConstructSignature = ts.Debug.deprecate(ts.factory.updateConstructSignature, factoryDeprecation);

/** @deprecated Use `factory.updateIndexSignature` or the factory supplied by your transformation context instead. */
export const updateIndexSignature = ts.Debug.deprecate(ts.factory.updateIndexSignature, factoryDeprecation);

/** @deprecated Use `factory.createKeywordTypeNode` or the factory supplied by your transformation context instead. */
export const createKeywordTypeNode = ts.Debug.deprecate(ts.factory.createKeywordTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createTypePredicateNode` or the factory supplied by your transformation context instead. */
export const createTypePredicateNodeWithModifier = ts.Debug.deprecate(ts.factory.createTypePredicateNode, factoryDeprecation);

/** @deprecated Use `factory.updateTypePredicateNode` or the factory supplied by your transformation context instead. */
export const updateTypePredicateNodeWithModifier = ts.Debug.deprecate(ts.factory.updateTypePredicateNode, factoryDeprecation);

/** @deprecated Use `factory.createTypeReferenceNode` or the factory supplied by your transformation context instead. */
export const createTypeReferenceNode = ts.Debug.deprecate(ts.factory.createTypeReferenceNode, factoryDeprecation);

/** @deprecated Use `factory.updateTypeReferenceNode` or the factory supplied by your transformation context instead. */
export const updateTypeReferenceNode = ts.Debug.deprecate(ts.factory.updateTypeReferenceNode, factoryDeprecation);

/** @deprecated Use `factory.createFunctionTypeNode` or the factory supplied by your transformation context instead. */
export const createFunctionTypeNode = ts.Debug.deprecate(ts.factory.createFunctionTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateFunctionTypeNode` or the factory supplied by your transformation context instead. */
export const updateFunctionTypeNode = ts.Debug.deprecate(ts.factory.updateFunctionTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createConstructorTypeNode` or the factory supplied by your transformation context instead. */
export const createConstructorTypeNode = ts.Debug.deprecate((
    typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
    parameters: readonly ts.ParameterDeclaration[],
    type: ts.TypeNode
) => {
    return ts.factory.createConstructorTypeNode(/*modifiers*/ undefined, typeParameters, parameters, type);
}, factoryDeprecation);

/** @deprecated Use `factory.updateConstructorTypeNode` or the factory supplied by your transformation context instead. */
export const updateConstructorTypeNode = ts.Debug.deprecate((
    node: ts.ConstructorTypeNode,
    typeParameters: ts.NodeArray<ts.TypeParameterDeclaration> | undefined,
    parameters: ts.NodeArray<ts.ParameterDeclaration>,
    type: ts.TypeNode
) => {
    return ts.factory.updateConstructorTypeNode(node, node.modifiers, typeParameters, parameters, type);
}, factoryDeprecation);

/** @deprecated Use `factory.createTypeQueryNode` or the factory supplied by your transformation context instead. */
export const createTypeQueryNode = ts.Debug.deprecate(ts.factory.createTypeQueryNode, factoryDeprecation);

/** @deprecated Use `factory.updateTypeQueryNode` or the factory supplied by your transformation context instead. */
export const updateTypeQueryNode = ts.Debug.deprecate(ts.factory.updateTypeQueryNode, factoryDeprecation);

/** @deprecated Use `factory.createTypeLiteralNode` or the factory supplied by your transformation context instead. */
export const createTypeLiteralNode = ts.Debug.deprecate(ts.factory.createTypeLiteralNode, factoryDeprecation);

/** @deprecated Use `factory.updateTypeLiteralNode` or the factory supplied by your transformation context instead. */
export const updateTypeLiteralNode = ts.Debug.deprecate(ts.factory.updateTypeLiteralNode, factoryDeprecation);

/** @deprecated Use `factory.createArrayTypeNode` or the factory supplied by your transformation context instead. */
export const createArrayTypeNode = ts.Debug.deprecate(ts.factory.createArrayTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateArrayTypeNode` or the factory supplied by your transformation context instead. */
export const updateArrayTypeNode = ts.Debug.deprecate(ts.factory.updateArrayTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createTupleTypeNode` or the factory supplied by your transformation context instead. */
export const createTupleTypeNode = ts.Debug.deprecate(ts.factory.createTupleTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateTupleTypeNode` or the factory supplied by your transformation context instead. */
export const updateTupleTypeNode = ts.Debug.deprecate(ts.factory.updateTupleTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createOptionalTypeNode` or the factory supplied by your transformation context instead. */
export const createOptionalTypeNode = ts.Debug.deprecate(ts.factory.createOptionalTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateOptionalTypeNode` or the factory supplied by your transformation context instead. */
export const updateOptionalTypeNode = ts.Debug.deprecate(ts.factory.updateOptionalTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createRestTypeNode` or the factory supplied by your transformation context instead. */
export const createRestTypeNode = ts.Debug.deprecate(ts.factory.createRestTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateRestTypeNode` or the factory supplied by your transformation context instead. */
export const updateRestTypeNode = ts.Debug.deprecate(ts.factory.updateRestTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createUnionTypeNode` or the factory supplied by your transformation context instead. */
export const createUnionTypeNode = ts.Debug.deprecate(ts.factory.createUnionTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateUnionTypeNode` or the factory supplied by your transformation context instead. */
export const updateUnionTypeNode = ts.Debug.deprecate(ts.factory.updateUnionTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createIntersectionTypeNode` or the factory supplied by your transformation context instead. */
export const createIntersectionTypeNode = ts.Debug.deprecate(ts.factory.createIntersectionTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateIntersectionTypeNode` or the factory supplied by your transformation context instead. */
export const updateIntersectionTypeNode = ts.Debug.deprecate(ts.factory.updateIntersectionTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createConditionalTypeNode` or the factory supplied by your transformation context instead. */
export const createConditionalTypeNode = ts.Debug.deprecate(ts.factory.createConditionalTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateConditionalTypeNode` or the factory supplied by your transformation context instead. */
export const updateConditionalTypeNode = ts.Debug.deprecate(ts.factory.updateConditionalTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createInferTypeNode` or the factory supplied by your transformation context instead. */
export const createInferTypeNode = ts.Debug.deprecate(ts.factory.createInferTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateInferTypeNode` or the factory supplied by your transformation context instead. */
export const updateInferTypeNode = ts.Debug.deprecate(ts.factory.updateInferTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createImportTypeNode` or the factory supplied by your transformation context instead. */
export const createImportTypeNode = ts.Debug.deprecate(ts.factory.createImportTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateImportTypeNode` or the factory supplied by your transformation context instead. */
export const updateImportTypeNode = ts.Debug.deprecate(ts.factory.updateImportTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createParenthesizedType` or the factory supplied by your transformation context instead. */
export const createParenthesizedType = ts.Debug.deprecate(ts.factory.createParenthesizedType, factoryDeprecation);

/** @deprecated Use `factory.updateParenthesizedType` or the factory supplied by your transformation context instead. */
export const updateParenthesizedType = ts.Debug.deprecate(ts.factory.updateParenthesizedType, factoryDeprecation);

/** @deprecated Use `factory.createThisTypeNode` or the factory supplied by your transformation context instead. */
export const createThisTypeNode = ts.Debug.deprecate(ts.factory.createThisTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateTypeOperatorNode` or the factory supplied by your transformation context instead. */
export const updateTypeOperatorNode = ts.Debug.deprecate(ts.factory.updateTypeOperatorNode, factoryDeprecation);

/** @deprecated Use `factory.createIndexedAccessTypeNode` or the factory supplied by your transformation context instead. */
export const createIndexedAccessTypeNode = ts.Debug.deprecate(ts.factory.createIndexedAccessTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateIndexedAccessTypeNode` or the factory supplied by your transformation context instead. */
export const updateIndexedAccessTypeNode = ts.Debug.deprecate(ts.factory.updateIndexedAccessTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createMappedTypeNode` or the factory supplied by your transformation context instead. */
export const createMappedTypeNode = ts.Debug.deprecate(ts.factory.createMappedTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateMappedTypeNode` or the factory supplied by your transformation context instead. */
export const updateMappedTypeNode = ts.Debug.deprecate(ts.factory.updateMappedTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createLiteralTypeNode` or the factory supplied by your transformation context instead. */
export const createLiteralTypeNode = ts.Debug.deprecate(ts.factory.createLiteralTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateLiteralTypeNode` or the factory supplied by your transformation context instead. */
export const updateLiteralTypeNode = ts.Debug.deprecate(ts.factory.updateLiteralTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createObjectBindingPattern` or the factory supplied by your transformation context instead. */
export const createObjectBindingPattern = ts.Debug.deprecate(ts.factory.createObjectBindingPattern, factoryDeprecation);

/** @deprecated Use `factory.updateObjectBindingPattern` or the factory supplied by your transformation context instead. */
export const updateObjectBindingPattern = ts.Debug.deprecate(ts.factory.updateObjectBindingPattern, factoryDeprecation);

/** @deprecated Use `factory.createArrayBindingPattern` or the factory supplied by your transformation context instead. */
export const createArrayBindingPattern = ts.Debug.deprecate(ts.factory.createArrayBindingPattern, factoryDeprecation);

/** @deprecated Use `factory.updateArrayBindingPattern` or the factory supplied by your transformation context instead. */
export const updateArrayBindingPattern = ts.Debug.deprecate(ts.factory.updateArrayBindingPattern, factoryDeprecation);

/** @deprecated Use `factory.createBindingElement` or the factory supplied by your transformation context instead. */
export const createBindingElement = ts.Debug.deprecate(ts.factory.createBindingElement, factoryDeprecation);

/** @deprecated Use `factory.updateBindingElement` or the factory supplied by your transformation context instead. */
export const updateBindingElement = ts.Debug.deprecate(ts.factory.updateBindingElement, factoryDeprecation);

/** @deprecated Use `factory.createArrayLiteralExpression` or the factory supplied by your transformation context instead. */
export const createArrayLiteral = ts.Debug.deprecate(ts.factory.createArrayLiteralExpression, factoryDeprecation);

/** @deprecated Use `factory.updateArrayLiteralExpression` or the factory supplied by your transformation context instead. */
export const updateArrayLiteral = ts.Debug.deprecate(ts.factory.updateArrayLiteralExpression, factoryDeprecation);

/** @deprecated Use `factory.createObjectLiteralExpression` or the factory supplied by your transformation context instead. */
export const createObjectLiteral = ts.Debug.deprecate(ts.factory.createObjectLiteralExpression, factoryDeprecation);

/** @deprecated Use `factory.updateObjectLiteralExpression` or the factory supplied by your transformation context instead. */
export const updateObjectLiteral = ts.Debug.deprecate(ts.factory.updateObjectLiteralExpression, factoryDeprecation);

/** @deprecated Use `factory.createPropertyAccessExpression` or the factory supplied by your transformation context instead. */
export const createPropertyAccess = ts.Debug.deprecate(ts.factory.createPropertyAccessExpression, factoryDeprecation);

/** @deprecated Use `factory.updatePropertyAccessExpression` or the factory supplied by your transformation context instead. */
export const updatePropertyAccess = ts.Debug.deprecate(ts.factory.updatePropertyAccessExpression, factoryDeprecation);

/** @deprecated Use `factory.createPropertyAccessChain` or the factory supplied by your transformation context instead. */
export const createPropertyAccessChain = ts.Debug.deprecate(ts.factory.createPropertyAccessChain, factoryDeprecation);

/** @deprecated Use `factory.updatePropertyAccessChain` or the factory supplied by your transformation context instead. */
export const updatePropertyAccessChain = ts.Debug.deprecate(ts.factory.updatePropertyAccessChain, factoryDeprecation);

/** @deprecated Use `factory.createElementAccessExpression` or the factory supplied by your transformation context instead. */
export const createElementAccess = ts.Debug.deprecate(ts.factory.createElementAccessExpression, factoryDeprecation);

/** @deprecated Use `factory.updateElementAccessExpression` or the factory supplied by your transformation context instead. */
export const updateElementAccess = ts.Debug.deprecate(ts.factory.updateElementAccessExpression, factoryDeprecation);

/** @deprecated Use `factory.createElementAccessChain` or the factory supplied by your transformation context instead. */
export const createElementAccessChain = ts.Debug.deprecate(ts.factory.createElementAccessChain, factoryDeprecation);

/** @deprecated Use `factory.updateElementAccessChain` or the factory supplied by your transformation context instead. */
export const updateElementAccessChain = ts.Debug.deprecate(ts.factory.updateElementAccessChain, factoryDeprecation);

/** @deprecated Use `factory.createCallExpression` or the factory supplied by your transformation context instead. */
export const createCall = ts.Debug.deprecate(ts.factory.createCallExpression, factoryDeprecation);

/** @deprecated Use `factory.updateCallExpression` or the factory supplied by your transformation context instead. */
export const updateCall = ts.Debug.deprecate(ts.factory.updateCallExpression, factoryDeprecation);

/** @deprecated Use `factory.createCallChain` or the factory supplied by your transformation context instead. */
export const createCallChain = ts.Debug.deprecate(ts.factory.createCallChain, factoryDeprecation);

/** @deprecated Use `factory.updateCallChain` or the factory supplied by your transformation context instead. */
export const updateCallChain = ts.Debug.deprecate(ts.factory.updateCallChain, factoryDeprecation);

/** @deprecated Use `factory.createNewExpression` or the factory supplied by your transformation context instead. */
export const createNew = ts.Debug.deprecate(ts.factory.createNewExpression, factoryDeprecation);

/** @deprecated Use `factory.updateNewExpression` or the factory supplied by your transformation context instead. */
export const updateNew = ts.Debug.deprecate(ts.factory.updateNewExpression, factoryDeprecation);

/** @deprecated Use `factory.createTypeAssertion` or the factory supplied by your transformation context instead. */
export const createTypeAssertion = ts.Debug.deprecate(ts.factory.createTypeAssertion, factoryDeprecation);

/** @deprecated Use `factory.updateTypeAssertion` or the factory supplied by your transformation context instead. */
export const updateTypeAssertion = ts.Debug.deprecate(ts.factory.updateTypeAssertion, factoryDeprecation);

/** @deprecated Use `factory.createParenthesizedExpression` or the factory supplied by your transformation context instead. */
export const createParen = ts.Debug.deprecate(ts.factory.createParenthesizedExpression, factoryDeprecation);

/** @deprecated Use `factory.updateParenthesizedExpression` or the factory supplied by your transformation context instead. */
export const updateParen = ts.Debug.deprecate(ts.factory.updateParenthesizedExpression, factoryDeprecation);

/** @deprecated Use `factory.createFunctionExpression` or the factory supplied by your transformation context instead. */
export const createFunctionExpression = ts.Debug.deprecate(ts.factory.createFunctionExpression, factoryDeprecation);

/** @deprecated Use `factory.updateFunctionExpression` or the factory supplied by your transformation context instead. */
export const updateFunctionExpression = ts.Debug.deprecate(ts.factory.updateFunctionExpression, factoryDeprecation);

/** @deprecated Use `factory.createDeleteExpression` or the factory supplied by your transformation context instead. */
export const createDelete = ts.Debug.deprecate(ts.factory.createDeleteExpression, factoryDeprecation);

/** @deprecated Use `factory.updateDeleteExpression` or the factory supplied by your transformation context instead. */
export const updateDelete = ts.Debug.deprecate(ts.factory.updateDeleteExpression, factoryDeprecation);

/** @deprecated Use `factory.createTypeOfExpression` or the factory supplied by your transformation context instead. */
export const createTypeOf = ts.Debug.deprecate(ts.factory.createTypeOfExpression, factoryDeprecation);

/** @deprecated Use `factory.updateTypeOfExpression` or the factory supplied by your transformation context instead. */
export const updateTypeOf = ts.Debug.deprecate(ts.factory.updateTypeOfExpression, factoryDeprecation);

/** @deprecated Use `factory.createVoidExpression` or the factory supplied by your transformation context instead. */
export const createVoid = ts.Debug.deprecate(ts.factory.createVoidExpression, factoryDeprecation);

/** @deprecated Use `factory.updateVoidExpression` or the factory supplied by your transformation context instead. */
export const updateVoid = ts.Debug.deprecate(ts.factory.updateVoidExpression, factoryDeprecation);

/** @deprecated Use `factory.createAwaitExpression` or the factory supplied by your transformation context instead. */
export const createAwait = ts.Debug.deprecate(ts.factory.createAwaitExpression, factoryDeprecation);

/** @deprecated Use `factory.updateAwaitExpression` or the factory supplied by your transformation context instead. */
export const updateAwait = ts.Debug.deprecate(ts.factory.updateAwaitExpression, factoryDeprecation);

/** @deprecated Use `factory.createPrefixExpression` or the factory supplied by your transformation context instead. */
export const createPrefix = ts.Debug.deprecate(ts.factory.createPrefixUnaryExpression, factoryDeprecation);

/** @deprecated Use `factory.updatePrefixExpression` or the factory supplied by your transformation context instead. */
export const updatePrefix = ts.Debug.deprecate(ts.factory.updatePrefixUnaryExpression, factoryDeprecation);

/** @deprecated Use `factory.createPostfixUnaryExpression` or the factory supplied by your transformation context instead. */
export const createPostfix = ts.Debug.deprecate(ts.factory.createPostfixUnaryExpression, factoryDeprecation);

/** @deprecated Use `factory.updatePostfixUnaryExpression` or the factory supplied by your transformation context instead. */
export const updatePostfix = ts.Debug.deprecate(ts.factory.updatePostfixUnaryExpression, factoryDeprecation);

/** @deprecated Use `factory.createBinaryExpression` or the factory supplied by your transformation context instead. */
export const createBinary = ts.Debug.deprecate(ts.factory.createBinaryExpression, factoryDeprecation);

/** @deprecated Use `factory.updateConditionalExpression` or the factory supplied by your transformation context instead. */
export const updateConditional = ts.Debug.deprecate(ts.factory.updateConditionalExpression, factoryDeprecation);

/** @deprecated Use `factory.createTemplateExpression` or the factory supplied by your transformation context instead. */
export const createTemplateExpression = ts.Debug.deprecate(ts.factory.createTemplateExpression, factoryDeprecation);

/** @deprecated Use `factory.updateTemplateExpression` or the factory supplied by your transformation context instead. */
export const updateTemplateExpression = ts.Debug.deprecate(ts.factory.updateTemplateExpression, factoryDeprecation);

/** @deprecated Use `factory.createTemplateHead` or the factory supplied by your transformation context instead. */
export const createTemplateHead = ts.Debug.deprecate(ts.factory.createTemplateHead, factoryDeprecation);

/** @deprecated Use `factory.createTemplateMiddle` or the factory supplied by your transformation context instead. */
export const createTemplateMiddle = ts.Debug.deprecate(ts.factory.createTemplateMiddle, factoryDeprecation);

/** @deprecated Use `factory.createTemplateTail` or the factory supplied by your transformation context instead. */
export const createTemplateTail = ts.Debug.deprecate(ts.factory.createTemplateTail, factoryDeprecation);

/** @deprecated Use `factory.createNoSubstitutionTemplateLiteral` or the factory supplied by your transformation context instead. */
export const createNoSubstitutionTemplateLiteral = ts.Debug.deprecate(ts.factory.createNoSubstitutionTemplateLiteral, factoryDeprecation);

/** @deprecated Use `factory.updateYieldExpression` or the factory supplied by your transformation context instead. */
export const updateYield = ts.Debug.deprecate(ts.factory.updateYieldExpression, factoryDeprecation);

/** @deprecated Use `factory.createSpreadExpression` or the factory supplied by your transformation context instead. */
export const createSpread = ts.Debug.deprecate(ts.factory.createSpreadElement, factoryDeprecation);

/** @deprecated Use `factory.updateSpreadExpression` or the factory supplied by your transformation context instead. */
export const updateSpread = ts.Debug.deprecate(ts.factory.updateSpreadElement, factoryDeprecation);

/** @deprecated Use `factory.createOmittedExpression` or the factory supplied by your transformation context instead. */
export const createOmittedExpression = ts.Debug.deprecate(ts.factory.createOmittedExpression, factoryDeprecation);

/** @deprecated Use `factory.createAsExpression` or the factory supplied by your transformation context instead. */
export const createAsExpression = ts.Debug.deprecate(ts.factory.createAsExpression, factoryDeprecation);

/** @deprecated Use `factory.updateAsExpression` or the factory supplied by your transformation context instead. */
export const updateAsExpression = ts.Debug.deprecate(ts.factory.updateAsExpression, factoryDeprecation);

/** @deprecated Use `factory.createNonNullExpression` or the factory supplied by your transformation context instead. */
export const createNonNullExpression = ts.Debug.deprecate(ts.factory.createNonNullExpression, factoryDeprecation);

/** @deprecated Use `factory.updateNonNullExpression` or the factory supplied by your transformation context instead. */
export const updateNonNullExpression = ts.Debug.deprecate(ts.factory.updateNonNullExpression, factoryDeprecation);

/** @deprecated Use `factory.createNonNullChain` or the factory supplied by your transformation context instead. */
export const createNonNullChain = ts.Debug.deprecate(ts.factory.createNonNullChain, factoryDeprecation);

/** @deprecated Use `factory.updateNonNullChain` or the factory supplied by your transformation context instead. */
export const updateNonNullChain = ts.Debug.deprecate(ts.factory.updateNonNullChain, factoryDeprecation);

/** @deprecated Use `factory.createMetaProperty` or the factory supplied by your transformation context instead. */
export const createMetaProperty = ts.Debug.deprecate(ts.factory.createMetaProperty, factoryDeprecation);

/** @deprecated Use `factory.updateMetaProperty` or the factory supplied by your transformation context instead. */
export const updateMetaProperty = ts.Debug.deprecate(ts.factory.updateMetaProperty, factoryDeprecation);

/** @deprecated Use `factory.createTemplateSpan` or the factory supplied by your transformation context instead. */
export const createTemplateSpan = ts.Debug.deprecate(ts.factory.createTemplateSpan, factoryDeprecation);

/** @deprecated Use `factory.updateTemplateSpan` or the factory supplied by your transformation context instead. */
export const updateTemplateSpan = ts.Debug.deprecate(ts.factory.updateTemplateSpan, factoryDeprecation);

/** @deprecated Use `factory.createSemicolonClassElement` or the factory supplied by your transformation context instead. */
export const createSemicolonClassElement = ts.Debug.deprecate(ts.factory.createSemicolonClassElement, factoryDeprecation);

/** @deprecated Use `factory.createBlock` or the factory supplied by your transformation context instead. */
export const createBlock = ts.Debug.deprecate(ts.factory.createBlock, factoryDeprecation);

/** @deprecated Use `factory.updateBlock` or the factory supplied by your transformation context instead. */
export const updateBlock = ts.Debug.deprecate(ts.factory.updateBlock, factoryDeprecation);

/** @deprecated Use `factory.createVariableStatement` or the factory supplied by your transformation context instead. */
export const createVariableStatement = ts.Debug.deprecate(ts.factory.createVariableStatement, factoryDeprecation);

/** @deprecated Use `factory.updateVariableStatement` or the factory supplied by your transformation context instead. */
export const updateVariableStatement = ts.Debug.deprecate(ts.factory.updateVariableStatement, factoryDeprecation);

/** @deprecated Use `factory.createEmptyStatement` or the factory supplied by your transformation context instead. */
export const createEmptyStatement = ts.Debug.deprecate(ts.factory.createEmptyStatement, factoryDeprecation);

/** @deprecated Use `factory.createExpressionStatement` or the factory supplied by your transformation context instead. */
export const createExpressionStatement = ts.Debug.deprecate(ts.factory.createExpressionStatement, factoryDeprecation);

/** @deprecated Use `factory.updateExpressionStatement` or the factory supplied by your transformation context instead. */
export const updateExpressionStatement = ts.Debug.deprecate(ts.factory.updateExpressionStatement, factoryDeprecation);

/** @deprecated Use `factory.createExpressionStatement` or the factory supplied by your transformation context instead. */
export const createStatement = ts.Debug.deprecate(ts.factory.createExpressionStatement, factoryDeprecation);

/** @deprecated Use `factory.updateExpressionStatement` or the factory supplied by your transformation context instead. */
export const updateStatement = ts.Debug.deprecate(ts.factory.updateExpressionStatement, factoryDeprecation);

/** @deprecated Use `factory.createIfStatement` or the factory supplied by your transformation context instead. */
export const createIf = ts.Debug.deprecate(ts.factory.createIfStatement, factoryDeprecation);

/** @deprecated Use `factory.updateIfStatement` or the factory supplied by your transformation context instead. */
export const updateIf = ts.Debug.deprecate(ts.factory.updateIfStatement, factoryDeprecation);

/** @deprecated Use `factory.createDoStatement` or the factory supplied by your transformation context instead. */
export const createDo = ts.Debug.deprecate(ts.factory.createDoStatement, factoryDeprecation);

/** @deprecated Use `factory.updateDoStatement` or the factory supplied by your transformation context instead. */
export const updateDo = ts.Debug.deprecate(ts.factory.updateDoStatement, factoryDeprecation);

/** @deprecated Use `factory.createWhileStatement` or the factory supplied by your transformation context instead. */
export const createWhile = ts.Debug.deprecate(ts.factory.createWhileStatement, factoryDeprecation);

/** @deprecated Use `factory.updateWhileStatement` or the factory supplied by your transformation context instead. */
export const updateWhile = ts.Debug.deprecate(ts.factory.updateWhileStatement, factoryDeprecation);

/** @deprecated Use `factory.createForStatement` or the factory supplied by your transformation context instead. */
export const createFor = ts.Debug.deprecate(ts.factory.createForStatement, factoryDeprecation);

/** @deprecated Use `factory.updateForStatement` or the factory supplied by your transformation context instead. */
export const updateFor = ts.Debug.deprecate(ts.factory.updateForStatement, factoryDeprecation);

/** @deprecated Use `factory.createForInStatement` or the factory supplied by your transformation context instead. */
export const createForIn = ts.Debug.deprecate(ts.factory.createForInStatement, factoryDeprecation);

/** @deprecated Use `factory.updateForInStatement` or the factory supplied by your transformation context instead. */
export const updateForIn = ts.Debug.deprecate(ts.factory.updateForInStatement, factoryDeprecation);

/** @deprecated Use `factory.createForOfStatement` or the factory supplied by your transformation context instead. */
export const createForOf = ts.Debug.deprecate(ts.factory.createForOfStatement, factoryDeprecation);

/** @deprecated Use `factory.updateForOfStatement` or the factory supplied by your transformation context instead. */
export const updateForOf = ts.Debug.deprecate(ts.factory.updateForOfStatement, factoryDeprecation);

/** @deprecated Use `factory.createContinueStatement` or the factory supplied by your transformation context instead. */
export const createContinue = ts.Debug.deprecate(ts.factory.createContinueStatement, factoryDeprecation);

/** @deprecated Use `factory.updateContinueStatement` or the factory supplied by your transformation context instead. */
export const updateContinue = ts.Debug.deprecate(ts.factory.updateContinueStatement, factoryDeprecation);

/** @deprecated Use `factory.createBreakStatement` or the factory supplied by your transformation context instead. */
export const createBreak = ts.Debug.deprecate(ts.factory.createBreakStatement, factoryDeprecation);

/** @deprecated Use `factory.updateBreakStatement` or the factory supplied by your transformation context instead. */
export const updateBreak = ts.Debug.deprecate(ts.factory.updateBreakStatement, factoryDeprecation);

/** @deprecated Use `factory.createReturnStatement` or the factory supplied by your transformation context instead. */
export const createReturn = ts.Debug.deprecate(ts.factory.createReturnStatement, factoryDeprecation);

/** @deprecated Use `factory.updateReturnStatement` or the factory supplied by your transformation context instead. */
export const updateReturn = ts.Debug.deprecate(ts.factory.updateReturnStatement, factoryDeprecation);

/** @deprecated Use `factory.createWithStatement` or the factory supplied by your transformation context instead. */
export const createWith = ts.Debug.deprecate(ts.factory.createWithStatement, factoryDeprecation);

/** @deprecated Use `factory.updateWithStatement` or the factory supplied by your transformation context instead. */
export const updateWith = ts.Debug.deprecate(ts.factory.updateWithStatement, factoryDeprecation);

/** @deprecated Use `factory.createSwitchStatement` or the factory supplied by your transformation context instead. */
export const createSwitch = ts.Debug.deprecate(ts.factory.createSwitchStatement, factoryDeprecation);

/** @deprecated Use `factory.updateSwitchStatement` or the factory supplied by your transformation context instead. */
export const updateSwitch = ts.Debug.deprecate(ts.factory.updateSwitchStatement, factoryDeprecation);

/** @deprecated Use `factory.createLabelStatement` or the factory supplied by your transformation context instead. */
export const createLabel = ts.Debug.deprecate(ts.factory.createLabeledStatement, factoryDeprecation);

/** @deprecated Use `factory.updateLabelStatement` or the factory supplied by your transformation context instead. */
export const updateLabel = ts.Debug.deprecate(ts.factory.updateLabeledStatement, factoryDeprecation);

/** @deprecated Use `factory.createThrowStatement` or the factory supplied by your transformation context instead. */
export const createThrow = ts.Debug.deprecate(ts.factory.createThrowStatement, factoryDeprecation);

/** @deprecated Use `factory.updateThrowStatement` or the factory supplied by your transformation context instead. */
export const updateThrow = ts.Debug.deprecate(ts.factory.updateThrowStatement, factoryDeprecation);

/** @deprecated Use `factory.createTryStatement` or the factory supplied by your transformation context instead. */
export const createTry = ts.Debug.deprecate(ts.factory.createTryStatement, factoryDeprecation);

/** @deprecated Use `factory.updateTryStatement` or the factory supplied by your transformation context instead. */
export const updateTry = ts.Debug.deprecate(ts.factory.updateTryStatement, factoryDeprecation);

/** @deprecated Use `factory.createDebuggerStatement` or the factory supplied by your transformation context instead. */
export const createDebuggerStatement = ts.Debug.deprecate(ts.factory.createDebuggerStatement, factoryDeprecation);

/** @deprecated Use `factory.createVariableDeclarationList` or the factory supplied by your transformation context instead. */
export const createVariableDeclarationList = ts.Debug.deprecate(ts.factory.createVariableDeclarationList, factoryDeprecation);

/** @deprecated Use `factory.updateVariableDeclarationList` or the factory supplied by your transformation context instead. */
export const updateVariableDeclarationList = ts.Debug.deprecate(ts.factory.updateVariableDeclarationList, factoryDeprecation);

/** @deprecated Use `factory.createFunctionDeclaration` or the factory supplied by your transformation context instead. */
export const createFunctionDeclaration = ts.Debug.deprecate(ts.factory.createFunctionDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateFunctionDeclaration` or the factory supplied by your transformation context instead. */
export const updateFunctionDeclaration = ts.Debug.deprecate(ts.factory.updateFunctionDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createClassDeclaration` or the factory supplied by your transformation context instead. */
export const createClassDeclaration = ts.Debug.deprecate(ts.factory.createClassDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateClassDeclaration` or the factory supplied by your transformation context instead. */
export const updateClassDeclaration = ts.Debug.deprecate(ts.factory.updateClassDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createInterfaceDeclaration` or the factory supplied by your transformation context instead. */
export const createInterfaceDeclaration = ts.Debug.deprecate(ts.factory.createInterfaceDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateInterfaceDeclaration` or the factory supplied by your transformation context instead. */
export const updateInterfaceDeclaration = ts.Debug.deprecate(ts.factory.updateInterfaceDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createTypeAliasDeclaration` or the factory supplied by your transformation context instead. */
export const createTypeAliasDeclaration = ts.Debug.deprecate(ts.factory.createTypeAliasDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateTypeAliasDeclaration` or the factory supplied by your transformation context instead. */
export const updateTypeAliasDeclaration = ts.Debug.deprecate(ts.factory.updateTypeAliasDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createEnumDeclaration` or the factory supplied by your transformation context instead. */
export const createEnumDeclaration = ts.Debug.deprecate(ts.factory.createEnumDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateEnumDeclaration` or the factory supplied by your transformation context instead. */
export const updateEnumDeclaration = ts.Debug.deprecate(ts.factory.updateEnumDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createModuleDeclaration` or the factory supplied by your transformation context instead. */
export const createModuleDeclaration = ts.Debug.deprecate(ts.factory.createModuleDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateModuleDeclaration` or the factory supplied by your transformation context instead. */
export const updateModuleDeclaration = ts.Debug.deprecate(ts.factory.updateModuleDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createModuleBlock` or the factory supplied by your transformation context instead. */
export const createModuleBlock = ts.Debug.deprecate(ts.factory.createModuleBlock, factoryDeprecation);

/** @deprecated Use `factory.updateModuleBlock` or the factory supplied by your transformation context instead. */
export const updateModuleBlock = ts.Debug.deprecate(ts.factory.updateModuleBlock, factoryDeprecation);

/** @deprecated Use `factory.createCaseBlock` or the factory supplied by your transformation context instead. */
export const createCaseBlock = ts.Debug.deprecate(ts.factory.createCaseBlock, factoryDeprecation);

/** @deprecated Use `factory.updateCaseBlock` or the factory supplied by your transformation context instead. */
export const updateCaseBlock = ts.Debug.deprecate(ts.factory.updateCaseBlock, factoryDeprecation);

/** @deprecated Use `factory.createNamespaceExportDeclaration` or the factory supplied by your transformation context instead. */
export const createNamespaceExportDeclaration = ts.Debug.deprecate(ts.factory.createNamespaceExportDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateNamespaceExportDeclaration` or the factory supplied by your transformation context instead. */
export const updateNamespaceExportDeclaration = ts.Debug.deprecate(ts.factory.updateNamespaceExportDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createImportEqualsDeclaration` or the factory supplied by your transformation context instead. */
export const createImportEqualsDeclaration = ts.Debug.deprecate(ts.factory.createImportEqualsDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateImportEqualsDeclaration` or the factory supplied by your transformation context instead. */
export const updateImportEqualsDeclaration = ts.Debug.deprecate(ts.factory.updateImportEqualsDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createImportDeclaration` or the factory supplied by your transformation context instead. */
export const createImportDeclaration = ts.Debug.deprecate(ts.factory.createImportDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateImportDeclaration` or the factory supplied by your transformation context instead. */
export const updateImportDeclaration = ts.Debug.deprecate(ts.factory.updateImportDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createNamespaceImport` or the factory supplied by your transformation context instead. */
export const createNamespaceImport = ts.Debug.deprecate(ts.factory.createNamespaceImport, factoryDeprecation);

/** @deprecated Use `factory.updateNamespaceImport` or the factory supplied by your transformation context instead. */
export const updateNamespaceImport = ts.Debug.deprecate(ts.factory.updateNamespaceImport, factoryDeprecation);

/** @deprecated Use `factory.createNamedImports` or the factory supplied by your transformation context instead. */
export const createNamedImports = ts.Debug.deprecate(ts.factory.createNamedImports, factoryDeprecation);

/** @deprecated Use `factory.updateNamedImports` or the factory supplied by your transformation context instead. */
export const updateNamedImports = ts.Debug.deprecate(ts.factory.updateNamedImports, factoryDeprecation);

/** @deprecated Use `factory.createImportSpecifier` or the factory supplied by your transformation context instead. */
export const createImportSpecifier = ts.Debug.deprecate(ts.factory.createImportSpecifier, factoryDeprecation);

/** @deprecated Use `factory.updateImportSpecifier` or the factory supplied by your transformation context instead. */
export const updateImportSpecifier = ts.Debug.deprecate(ts.factory.updateImportSpecifier, factoryDeprecation);

/** @deprecated Use `factory.createExportAssignment` or the factory supplied by your transformation context instead. */
export const createExportAssignment = ts.Debug.deprecate(ts.factory.createExportAssignment, factoryDeprecation);

/** @deprecated Use `factory.updateExportAssignment` or the factory supplied by your transformation context instead. */
export const updateExportAssignment = ts.Debug.deprecate(ts.factory.updateExportAssignment, factoryDeprecation);

/** @deprecated Use `factory.createNamedExports` or the factory supplied by your transformation context instead. */
export const createNamedExports = ts.Debug.deprecate(ts.factory.createNamedExports, factoryDeprecation);

/** @deprecated Use `factory.updateNamedExports` or the factory supplied by your transformation context instead. */
export const updateNamedExports = ts.Debug.deprecate(ts.factory.updateNamedExports, factoryDeprecation);

/** @deprecated Use `factory.createExportSpecifier` or the factory supplied by your transformation context instead. */
export const createExportSpecifier = ts.Debug.deprecate(ts.factory.createExportSpecifier, factoryDeprecation);

/** @deprecated Use `factory.updateExportSpecifier` or the factory supplied by your transformation context instead. */
export const updateExportSpecifier = ts.Debug.deprecate(ts.factory.updateExportSpecifier, factoryDeprecation);

/** @deprecated Use `factory.createExternalModuleReference` or the factory supplied by your transformation context instead. */
export const createExternalModuleReference = ts.Debug.deprecate(ts.factory.createExternalModuleReference, factoryDeprecation);

/** @deprecated Use `factory.updateExternalModuleReference` or the factory supplied by your transformation context instead. */
export const updateExternalModuleReference = ts.Debug.deprecate(ts.factory.updateExternalModuleReference, factoryDeprecation);

/** @deprecated Use `factory.createJSDocTypeExpression` or the factory supplied by your transformation context instead. */
export const createJSDocTypeExpression = ts.Debug.deprecate(ts.factory.createJSDocTypeExpression, factoryDeprecation);

/** @deprecated Use `factory.createJSDocTypeTag` or the factory supplied by your transformation context instead. */
export const createJSDocTypeTag = ts.Debug.deprecate(ts.factory.createJSDocTypeTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocReturnTag` or the factory supplied by your transformation context instead. */
export const createJSDocReturnTag = ts.Debug.deprecate(ts.factory.createJSDocReturnTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocThisTag` or the factory supplied by your transformation context instead. */
export const createJSDocThisTag = ts.Debug.deprecate(ts.factory.createJSDocThisTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocComment` or the factory supplied by your transformation context instead. */
export const createJSDocComment = ts.Debug.deprecate(ts.factory.createJSDocComment, factoryDeprecation);

/** @deprecated Use `factory.createJSDocParameterTag` or the factory supplied by your transformation context instead. */
export const createJSDocParameterTag = ts.Debug.deprecate(ts.factory.createJSDocParameterTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocClassTag` or the factory supplied by your transformation context instead. */
export const createJSDocClassTag = ts.Debug.deprecate(ts.factory.createJSDocClassTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocAugmentsTag` or the factory supplied by your transformation context instead. */
export const createJSDocAugmentsTag = ts.Debug.deprecate(ts.factory.createJSDocAugmentsTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocEnumTag` or the factory supplied by your transformation context instead. */
export const createJSDocEnumTag = ts.Debug.deprecate(ts.factory.createJSDocEnumTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocTemplateTag` or the factory supplied by your transformation context instead. */
export const createJSDocTemplateTag = ts.Debug.deprecate(ts.factory.createJSDocTemplateTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocTypedefTag` or the factory supplied by your transformation context instead. */
export const createJSDocTypedefTag = ts.Debug.deprecate(ts.factory.createJSDocTypedefTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocCallbackTag` or the factory supplied by your transformation context instead. */
export const createJSDocCallbackTag = ts.Debug.deprecate(ts.factory.createJSDocCallbackTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocSignature` or the factory supplied by your transformation context instead. */
export const createJSDocSignature = ts.Debug.deprecate(ts.factory.createJSDocSignature, factoryDeprecation);

/** @deprecated Use `factory.createJSDocPropertyTag` or the factory supplied by your transformation context instead. */
export const createJSDocPropertyTag = ts.Debug.deprecate(ts.factory.createJSDocPropertyTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocTypeLiteral` or the factory supplied by your transformation context instead. */
export const createJSDocTypeLiteral = ts.Debug.deprecate(ts.factory.createJSDocTypeLiteral, factoryDeprecation);

/** @deprecated Use `factory.createJSDocImplementsTag` or the factory supplied by your transformation context instead. */
export const createJSDocImplementsTag = ts.Debug.deprecate(ts.factory.createJSDocImplementsTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocAuthorTag` or the factory supplied by your transformation context instead. */
export const createJSDocAuthorTag = ts.Debug.deprecate(ts.factory.createJSDocAuthorTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocPublicTag` or the factory supplied by your transformation context instead. */
export const createJSDocPublicTag = ts.Debug.deprecate(ts.factory.createJSDocPublicTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocPrivateTag` or the factory supplied by your transformation context instead. */
export const createJSDocPrivateTag = ts.Debug.deprecate(ts.factory.createJSDocPrivateTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocProtectedTag` or the factory supplied by your transformation context instead. */
export const createJSDocProtectedTag = ts.Debug.deprecate(ts.factory.createJSDocProtectedTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocReadonlyTag` or the factory supplied by your transformation context instead. */
export const createJSDocReadonlyTag = ts.Debug.deprecate(ts.factory.createJSDocReadonlyTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocUnknownTag` or the factory supplied by your transformation context instead. */
export const createJSDocTag = ts.Debug.deprecate(ts.factory.createJSDocUnknownTag, factoryDeprecation);

/** @deprecated Use `factory.createJsxElement` or the factory supplied by your transformation context instead. */
export const createJsxElement = ts.Debug.deprecate(ts.factory.createJsxElement, factoryDeprecation);

/** @deprecated Use `factory.updateJsxElement` or the factory supplied by your transformation context instead. */
export const updateJsxElement = ts.Debug.deprecate(ts.factory.updateJsxElement, factoryDeprecation);

/** @deprecated Use `factory.createJsxSelfClosingElement` or the factory supplied by your transformation context instead. */
export const createJsxSelfClosingElement = ts.Debug.deprecate(ts.factory.createJsxSelfClosingElement, factoryDeprecation);

/** @deprecated Use `factory.updateJsxSelfClosingElement` or the factory supplied by your transformation context instead. */
export const updateJsxSelfClosingElement = ts.Debug.deprecate(ts.factory.updateJsxSelfClosingElement, factoryDeprecation);

/** @deprecated Use `factory.createJsxOpeningElement` or the factory supplied by your transformation context instead. */
export const createJsxOpeningElement = ts.Debug.deprecate(ts.factory.createJsxOpeningElement, factoryDeprecation);

/** @deprecated Use `factory.updateJsxOpeningElement` or the factory supplied by your transformation context instead. */
export const updateJsxOpeningElement = ts.Debug.deprecate(ts.factory.updateJsxOpeningElement, factoryDeprecation);

/** @deprecated Use `factory.createJsxClosingElement` or the factory supplied by your transformation context instead. */
export const createJsxClosingElement = ts.Debug.deprecate(ts.factory.createJsxClosingElement, factoryDeprecation);

/** @deprecated Use `factory.updateJsxClosingElement` or the factory supplied by your transformation context instead. */
export const updateJsxClosingElement = ts.Debug.deprecate(ts.factory.updateJsxClosingElement, factoryDeprecation);

/** @deprecated Use `factory.createJsxFragment` or the factory supplied by your transformation context instead. */
export const createJsxFragment = ts.Debug.deprecate(ts.factory.createJsxFragment, factoryDeprecation);

/** @deprecated Use `factory.createJsxText` or the factory supplied by your transformation context instead. */
export const createJsxText = ts.Debug.deprecate(ts.factory.createJsxText, factoryDeprecation);

/** @deprecated Use `factory.updateJsxText` or the factory supplied by your transformation context instead. */
export const updateJsxText = ts.Debug.deprecate(ts.factory.updateJsxText, factoryDeprecation);

/** @deprecated Use `factory.createJsxOpeningFragment` or the factory supplied by your transformation context instead. */
export const createJsxOpeningFragment = ts.Debug.deprecate(ts.factory.createJsxOpeningFragment, factoryDeprecation);

/** @deprecated Use `factory.createJsxJsxClosingFragment` or the factory supplied by your transformation context instead. */
export const createJsxJsxClosingFragment = ts.Debug.deprecate(ts.factory.createJsxJsxClosingFragment, factoryDeprecation);

/** @deprecated Use `factory.updateJsxFragment` or the factory supplied by your transformation context instead. */
export const updateJsxFragment = ts.Debug.deprecate(ts.factory.updateJsxFragment, factoryDeprecation);

/** @deprecated Use `factory.createJsxAttribute` or the factory supplied by your transformation context instead. */
export const createJsxAttribute = ts.Debug.deprecate(ts.factory.createJsxAttribute, factoryDeprecation);

/** @deprecated Use `factory.updateJsxAttribute` or the factory supplied by your transformation context instead. */
export const updateJsxAttribute = ts.Debug.deprecate(ts.factory.updateJsxAttribute, factoryDeprecation);

/** @deprecated Use `factory.createJsxAttributes` or the factory supplied by your transformation context instead. */
export const createJsxAttributes = ts.Debug.deprecate(ts.factory.createJsxAttributes, factoryDeprecation);

/** @deprecated Use `factory.updateJsxAttributes` or the factory supplied by your transformation context instead. */
export const updateJsxAttributes = ts.Debug.deprecate(ts.factory.updateJsxAttributes, factoryDeprecation);

/** @deprecated Use `factory.createJsxSpreadAttribute` or the factory supplied by your transformation context instead. */
export const createJsxSpreadAttribute = ts.Debug.deprecate(ts.factory.createJsxSpreadAttribute, factoryDeprecation);

/** @deprecated Use `factory.updateJsxSpreadAttribute` or the factory supplied by your transformation context instead. */
export const updateJsxSpreadAttribute = ts.Debug.deprecate(ts.factory.updateJsxSpreadAttribute, factoryDeprecation);

/** @deprecated Use `factory.createJsxExpression` or the factory supplied by your transformation context instead. */
export const createJsxExpression = ts.Debug.deprecate(ts.factory.createJsxExpression, factoryDeprecation);

/** @deprecated Use `factory.updateJsxExpression` or the factory supplied by your transformation context instead. */
export const updateJsxExpression = ts.Debug.deprecate(ts.factory.updateJsxExpression, factoryDeprecation);

/** @deprecated Use `factory.createCaseClause` or the factory supplied by your transformation context instead. */
export const createCaseClause = ts.Debug.deprecate(ts.factory.createCaseClause, factoryDeprecation);

/** @deprecated Use `factory.updateCaseClause` or the factory supplied by your transformation context instead. */
export const updateCaseClause = ts.Debug.deprecate(ts.factory.updateCaseClause, factoryDeprecation);

/** @deprecated Use `factory.createDefaultClause` or the factory supplied by your transformation context instead. */
export const createDefaultClause = ts.Debug.deprecate(ts.factory.createDefaultClause, factoryDeprecation);

/** @deprecated Use `factory.updateDefaultClause` or the factory supplied by your transformation context instead. */
export const updateDefaultClause = ts.Debug.deprecate(ts.factory.updateDefaultClause, factoryDeprecation);

/** @deprecated Use `factory.createHeritageClause` or the factory supplied by your transformation context instead. */
export const createHeritageClause = ts.Debug.deprecate(ts.factory.createHeritageClause, factoryDeprecation);

/** @deprecated Use `factory.updateHeritageClause` or the factory supplied by your transformation context instead. */
export const updateHeritageClause = ts.Debug.deprecate(ts.factory.updateHeritageClause, factoryDeprecation);

/** @deprecated Use `factory.createCatchClause` or the factory supplied by your transformation context instead. */
export const createCatchClause = ts.Debug.deprecate(ts.factory.createCatchClause, factoryDeprecation);

/** @deprecated Use `factory.updateCatchClause` or the factory supplied by your transformation context instead. */
export const updateCatchClause = ts.Debug.deprecate(ts.factory.updateCatchClause, factoryDeprecation);

/** @deprecated Use `factory.createPropertyAssignment` or the factory supplied by your transformation context instead. */
export const createPropertyAssignment = ts.Debug.deprecate(ts.factory.createPropertyAssignment, factoryDeprecation);

/** @deprecated Use `factory.updatePropertyAssignment` or the factory supplied by your transformation context instead. */
export const updatePropertyAssignment = ts.Debug.deprecate(ts.factory.updatePropertyAssignment, factoryDeprecation);

/** @deprecated Use `factory.createShorthandPropertyAssignment` or the factory supplied by your transformation context instead. */
export const createShorthandPropertyAssignment = ts.Debug.deprecate(ts.factory.createShorthandPropertyAssignment, factoryDeprecation);

/** @deprecated Use `factory.updateShorthandPropertyAssignment` or the factory supplied by your transformation context instead. */
export const updateShorthandPropertyAssignment = ts.Debug.deprecate(ts.factory.updateShorthandPropertyAssignment, factoryDeprecation);

/** @deprecated Use `factory.createSpreadAssignment` or the factory supplied by your transformation context instead. */
export const createSpreadAssignment = ts.Debug.deprecate(ts.factory.createSpreadAssignment, factoryDeprecation);

/** @deprecated Use `factory.updateSpreadAssignment` or the factory supplied by your transformation context instead. */
export const updateSpreadAssignment = ts.Debug.deprecate(ts.factory.updateSpreadAssignment, factoryDeprecation);

/** @deprecated Use `factory.createEnumMember` or the factory supplied by your transformation context instead. */
export const createEnumMember = ts.Debug.deprecate(ts.factory.createEnumMember, factoryDeprecation);

/** @deprecated Use `factory.updateEnumMember` or the factory supplied by your transformation context instead. */
export const updateEnumMember = ts.Debug.deprecate(ts.factory.updateEnumMember, factoryDeprecation);

/** @deprecated Use `factory.updateSourceFile` or the factory supplied by your transformation context instead. */
export const updateSourceFileNode = ts.Debug.deprecate(ts.factory.updateSourceFile, factoryDeprecation);

/** @deprecated Use `factory.createNotEmittedStatement` or the factory supplied by your transformation context instead. */
export const createNotEmittedStatement = ts.Debug.deprecate(ts.factory.createNotEmittedStatement, factoryDeprecation);

/** @deprecated Use `factory.createPartiallyEmittedExpression` or the factory supplied by your transformation context instead. */
export const createPartiallyEmittedExpression = ts.Debug.deprecate(ts.factory.createPartiallyEmittedExpression, factoryDeprecation);

/** @deprecated Use `factory.updatePartiallyEmittedExpression` or the factory supplied by your transformation context instead. */
export const updatePartiallyEmittedExpression = ts.Debug.deprecate(ts.factory.updatePartiallyEmittedExpression, factoryDeprecation);

/** @deprecated Use `factory.createCommaListExpression` or the factory supplied by your transformation context instead. */
export const createCommaList = ts.Debug.deprecate(ts.factory.createCommaListExpression, factoryDeprecation);

/** @deprecated Use `factory.updateCommaListExpression` or the factory supplied by your transformation context instead. */
export const updateCommaList = ts.Debug.deprecate(ts.factory.updateCommaListExpression, factoryDeprecation);

/** @deprecated Use `factory.createBundle` or the factory supplied by your transformation context instead. */
export const createBundle = ts.Debug.deprecate(ts.factory.createBundle, factoryDeprecation);

/** @deprecated Use `factory.updateBundle` or the factory supplied by your transformation context instead. */
export const updateBundle = ts.Debug.deprecate(ts.factory.updateBundle, factoryDeprecation);

/** @deprecated Use `factory.createImmediatelyInvokedFunctionExpression` or the factory supplied by your transformation context instead. */
export const createImmediatelyInvokedFunctionExpression = ts.Debug.deprecate(ts.factory.createImmediatelyInvokedFunctionExpression, factoryDeprecation);

/** @deprecated Use `factory.createImmediatelyInvokedArrowFunction` or the factory supplied by your transformation context instead. */
export const createImmediatelyInvokedArrowFunction = ts.Debug.deprecate(ts.factory.createImmediatelyInvokedArrowFunction, factoryDeprecation);

/** @deprecated Use `factory.createVoidZero` or the factory supplied by your transformation context instead. */
export const createVoidZero = ts.Debug.deprecate(ts.factory.createVoidZero, factoryDeprecation);

/** @deprecated Use `factory.createExportDefault` or the factory supplied by your transformation context instead. */
export const createExportDefault = ts.Debug.deprecate(ts.factory.createExportDefault, factoryDeprecation);

/** @deprecated Use `factory.createExternalModuleExport` or the factory supplied by your transformation context instead. */
export const createExternalModuleExport = ts.Debug.deprecate(ts.factory.createExternalModuleExport, factoryDeprecation);

/** @deprecated Use `factory.createNamespaceExport` or the factory supplied by your transformation context instead. */
export const createNamespaceExport = ts.Debug.deprecate(ts.factory.createNamespaceExport, factoryDeprecation);

/** @deprecated Use `factory.updateNamespaceExport` or the factory supplied by your transformation context instead. */
export const updateNamespaceExport = ts.Debug.deprecate(ts.factory.updateNamespaceExport, factoryDeprecation);

/** @deprecated Use `factory.createToken` or the factory supplied by your transformation context instead. */
export const createToken = ts.Debug.deprecate(function createToken<TKind extends ts.SyntaxKind>(kind: TKind): ts.Token<TKind> {
    return ts.factory.createToken(kind);
}, factoryDeprecation);

/** @deprecated Use `factory.createIdentifier` or the factory supplied by your transformation context instead. */
export const createIdentifier = ts.Debug.deprecate(function createIdentifier(text: string) {
    return ts.factory.createIdentifier(text, /*typeArguments*/ undefined, /*originalKeywordKind*/ undefined);
}, factoryDeprecation);

/** @deprecated Use `factory.createTempVariable` or the factory supplied by your transformation context instead. */
export const createTempVariable = ts.Debug.deprecate(function createTempVariable(recordTempVariable: ((node: ts.Identifier) => void) | undefined): ts.Identifier {
    return ts.factory.createTempVariable(recordTempVariable, /*reserveInNestedScopes*/ undefined);
}, factoryDeprecation);

/** @deprecated Use `factory.getGeneratedNameForNode` or the factory supplied by your transformation context instead. */
export const getGeneratedNameForNode = ts.Debug.deprecate(function getGeneratedNameForNode(node: ts.Node | undefined): ts.Identifier {
    return ts.factory.getGeneratedNameForNode(node, /*flags*/ undefined);
}, factoryDeprecation);

/** @deprecated Use `factory.createUniqueName(text, GeneratedIdentifierFlags.Optimistic)` or the factory supplied by your transformation context instead. */
export const createOptimisticUniqueName = ts.Debug.deprecate(function createOptimisticUniqueName(text: string): ts.Identifier {
    return ts.factory.createUniqueName(text, ts.GeneratedIdentifierFlags.Optimistic);
}, factoryDeprecation);

/** @deprecated Use `factory.createUniqueName(text, GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel)` or the factory supplied by your transformation context instead. */
export const createFileLevelUniqueName = ts.Debug.deprecate(function createFileLevelUniqueName(text: string): ts.Identifier {
    return ts.factory.createUniqueName(text, ts.GeneratedIdentifierFlags.Optimistic | ts.GeneratedIdentifierFlags.FileLevel);
}, factoryDeprecation);

/** @deprecated Use `factory.createIndexSignature` or the factory supplied by your transformation context instead. */
export const createIndexSignature = ts.Debug.deprecate(function createIndexSignature(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode): ts.IndexSignatureDeclaration {
    return ts.factory.createIndexSignature(decorators, modifiers, parameters, type);
}, factoryDeprecation);

/** @deprecated Use `factory.createTypePredicateNode` or the factory supplied by your transformation context instead. */
export const createTypePredicateNode = ts.Debug.deprecate(function createTypePredicateNode(parameterName: ts.Identifier | ts.ThisTypeNode | string, type: ts.TypeNode): ts.TypePredicateNode {
    return ts.factory.createTypePredicateNode(/*assertsModifier*/ undefined, parameterName, type);
}, factoryDeprecation);

/** @deprecated Use `factory.updateTypePredicateNode` or the factory supplied by your transformation context instead. */
export const updateTypePredicateNode = ts.Debug.deprecate(function updateTypePredicateNode(node: ts.TypePredicateNode, parameterName: ts.Identifier | ts.ThisTypeNode, type: ts.TypeNode): ts.TypePredicateNode {
    return ts.factory.updateTypePredicateNode(node, /*assertsModifier*/ undefined, parameterName, type);
}, factoryDeprecation);

/** @deprecated Use `factory.createStringLiteral`, `factory.createStringLiteralFromNode`, `factory.createNumericLiteral`, `factory.createBigIntLiteral`, `factory.createTrue`, `factory.createFalse`, or the factory supplied by your transformation context instead. */
export const createLiteral = ts.Debug.deprecate(function createLiteral(value: string | number | ts.PseudoBigInt | boolean | ts.StringLiteral | ts.NoSubstitutionTemplateLiteral | ts.NumericLiteral | ts.Identifier): ts.PrimaryExpression {
    if (typeof value === "number") {
        return ts.factory.createNumericLiteral(value);
    }
    // eslint-disable-next-line local/no-in-operator
    if (typeof value === "object" && "base10Value" in value) { // PseudoBigInt
        return ts.factory.createBigIntLiteral(value);
    }
    if (typeof value === "boolean") {
        return value ? ts.factory.createTrue() : ts.factory.createFalse();
    }
    if (typeof value === "string") {
        return ts.factory.createStringLiteral(value, /*isSingleQuote*/ undefined);
    }
    return ts.factory.createStringLiteralFromNode(value);
} as {
    (value: string | ts.StringLiteral | ts.NoSubstitutionTemplateLiteral | ts.NumericLiteral | ts.Identifier): ts.StringLiteral;
    (value: number | ts.PseudoBigInt): ts.NumericLiteral;
    (value: boolean): ts.BooleanLiteral;
    (value: string | number | ts.PseudoBigInt | boolean): ts.PrimaryExpression;
}, { since: "4.0", warnAfter: "4.1", message: "Use `factory.createStringLiteral`, `factory.createStringLiteralFromNode`, `factory.createNumericLiteral`, `factory.createBigIntLiteral`, `factory.createTrue`, `factory.createFalse`, or the factory supplied by your transformation context instead." });

/** @deprecated Use `factory.createMethodSignature` or the factory supplied by your transformation context instead. */
export const createMethodSignature = ts.Debug.deprecate(function createMethodSignature(
    typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
    parameters: readonly ts.ParameterDeclaration[],
    type: ts.TypeNode | undefined,
    name: string | ts.PropertyName,
    questionToken: ts.QuestionToken | undefined
) {
    return ts.factory.createMethodSignature(/*modifiers*/ undefined, name, questionToken, typeParameters, parameters, type);
}, factoryDeprecation);

/** @deprecated Use `factory.updateMethodSignature` or the factory supplied by your transformation context instead. */
export const updateMethodSignature = ts.Debug.deprecate(function updateMethodSignature(
    node: ts.MethodSignature,
    typeParameters: ts.NodeArray<ts.TypeParameterDeclaration> | undefined,
    parameters: ts.NodeArray<ts.ParameterDeclaration>,
    type: ts.TypeNode | undefined,
    name: ts.PropertyName,
    questionToken: ts.QuestionToken | undefined
) {
    return ts.factory.updateMethodSignature(node, node.modifiers, name, questionToken, typeParameters, parameters, type);
}, factoryDeprecation);

/** @deprecated Use `factory.createTypeOperatorNode` or the factory supplied by your transformation context instead. */
export const createTypeOperatorNode = ts.Debug.deprecate(function createTypeOperatorNode(operatorOrType: ts.SyntaxKind.KeyOfKeyword | ts.SyntaxKind.UniqueKeyword | ts.SyntaxKind.ReadonlyKeyword | ts.TypeNode, type?: ts.TypeNode) {
    let operator: ts.TypeOperatorNode["operator"];
    if (type) {
        operator = operatorOrType as ts.TypeOperatorNode["operator"];
    }
    else {
        type = operatorOrType as ts.TypeNode;
        operator = ts.SyntaxKind.KeyOfKeyword;
    }
    return ts.factory.createTypeOperatorNode(operator, type);
} as {
    (type: ts.TypeNode): ts.TypeOperatorNode;
    (operator: ts.SyntaxKind.KeyOfKeyword | ts.SyntaxKind.UniqueKeyword | ts.SyntaxKind.ReadonlyKeyword, type: ts.TypeNode): ts.TypeOperatorNode;
}, factoryDeprecation);

/** @deprecated Use `factory.createTaggedTemplate` or the factory supplied by your transformation context instead. */
export const createTaggedTemplate = ts.Debug.deprecate(function createTaggedTemplate(tag: ts.Expression, typeArgumentsOrTemplate: readonly ts.TypeNode[] | ts.TemplateLiteral | undefined, template?: ts.TemplateLiteral) {
    let typeArguments: readonly ts.TypeNode[] | undefined;
    if (template) {
        typeArguments = typeArgumentsOrTemplate as readonly ts.TypeNode[] | undefined;
    }
    else {
        template = typeArgumentsOrTemplate as ts.TemplateLiteral;
    }
    return ts.factory.createTaggedTemplateExpression(tag, typeArguments, template);
} as {
    (tag: ts.Expression, template: ts.TemplateLiteral): ts.TaggedTemplateExpression;
    (tag: ts.Expression, typeArguments: readonly ts.TypeNode[] | undefined, template: ts.TemplateLiteral): ts.TaggedTemplateExpression;
}, factoryDeprecation);

/** @deprecated Use `factory.updateTaggedTemplate` or the factory supplied by your transformation context instead. */
export const updateTaggedTemplate = ts.Debug.deprecate(function updateTaggedTemplate(node: ts.TaggedTemplateExpression, tag: ts.Expression, typeArgumentsOrTemplate: readonly ts.TypeNode[] | ts.TemplateLiteral | undefined, template?: ts.TemplateLiteral) {
    let typeArguments: readonly ts.TypeNode[] | undefined;
    if (template) {
        typeArguments = typeArgumentsOrTemplate as readonly ts.TypeNode[] | undefined;
    }
    else {
        template = typeArgumentsOrTemplate as ts.TemplateLiteral;
    }
    return ts.factory.updateTaggedTemplateExpression(node, tag, typeArguments, template);
} as {
    (node: ts.TaggedTemplateExpression, tag: ts.Expression, template: ts.TemplateLiteral): ts.TaggedTemplateExpression;
    (node: ts.TaggedTemplateExpression, tag: ts.Expression, typeArguments: readonly ts.TypeNode[] | undefined, template: ts.TemplateLiteral): ts.TaggedTemplateExpression;
}, factoryDeprecation);

/** @deprecated Use `factory.updateBinary` or the factory supplied by your transformation context instead. */
export const updateBinary = ts.Debug.deprecate(function updateBinary(node: ts.BinaryExpression, left: ts.Expression, right: ts.Expression, operator: ts.BinaryOperator | ts.BinaryOperatorToken = node.operatorToken) {
    if (typeof operator === "number") {
        operator = operator === node.operatorToken.kind ? node.operatorToken : ts.factory.createToken(operator);
    }
    return ts.factory.updateBinaryExpression(node, left, operator, right);
}, factoryDeprecation);

/** @deprecated Use `factory.createConditional` or the factory supplied by your transformation context instead. */
export const createConditional = ts.Debug.deprecate(function createConditional(condition: ts.Expression, questionTokenOrWhenTrue: ts.QuestionToken | ts.Expression, whenTrueOrWhenFalse: ts.Expression, colonToken?: ts.ColonToken, whenFalse?: ts.Expression) {
    return arguments.length === 5 ? ts.factory.createConditionalExpression(condition, questionTokenOrWhenTrue as ts.QuestionToken, whenTrueOrWhenFalse, colonToken, whenFalse!) :
        arguments.length === 3 ? ts.factory.createConditionalExpression(condition, ts.factory.createToken(ts.SyntaxKind.QuestionToken), questionTokenOrWhenTrue as ts.Expression, ts.factory.createToken(ts.SyntaxKind.ColonToken), whenTrueOrWhenFalse) :
        ts.Debug.fail("Argument count mismatch");
} as {
    (condition: ts.Expression, whenTrue: ts.Expression, whenFalse: ts.Expression): ts.ConditionalExpression;
    (condition: ts.Expression, questionToken: ts.QuestionToken, whenTrue: ts.Expression, colonToken: ts.ColonToken, whenFalse: ts.Expression): ts.ConditionalExpression;
}, factoryDeprecation);

/** @deprecated Use `factory.createYield` or the factory supplied by your transformation context instead. */
export const createYield = ts.Debug.deprecate(function createYield(asteriskTokenOrExpression?: ts.AsteriskToken | ts.Expression | undefined, expression?: ts.Expression) {
    let asteriskToken: ts.AsteriskToken | undefined;
    if (expression) {
        asteriskToken = asteriskTokenOrExpression as ts.AsteriskToken;
    }
    else {
        expression = asteriskTokenOrExpression as ts.Expression;
    }
    return ts.factory.createYieldExpression(asteriskToken, expression);
} as {
    (expression?: ts.Expression | undefined): ts.YieldExpression;
    (asteriskToken: ts.AsteriskToken | undefined, expression: ts.Expression): ts.YieldExpression;
}, factoryDeprecation);

/** @deprecated Use `factory.createClassExpression` or the factory supplied by your transformation context instead. */
export const createClassExpression = ts.Debug.deprecate(function createClassExpression(
    modifiers: readonly ts.Modifier[] | undefined,
    name: string | ts.Identifier | undefined,
    typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
    heritageClauses: readonly ts.HeritageClause[] | undefined,
    members: readonly ts.ClassElement[]
) {
    return ts.factory.createClassExpression(/*decorators*/ undefined, modifiers, name, typeParameters, heritageClauses, members);
}, factoryDeprecation);

/** @deprecated Use `factory.updateClassExpression` or the factory supplied by your transformation context instead. */
export const updateClassExpression = ts.Debug.deprecate(function updateClassExpression(
    node: ts.ClassExpression,
    modifiers: readonly ts.Modifier[] | undefined,
    name: ts.Identifier | undefined,
    typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
    heritageClauses: readonly ts.HeritageClause[] | undefined,
    members: readonly ts.ClassElement[]
) {
    return ts.factory.updateClassExpression(node, /*decorators*/ undefined, modifiers, name, typeParameters, heritageClauses, members);
}, factoryDeprecation);

/** @deprecated Use `factory.createPropertySignature` or the factory supplied by your transformation context instead. */
export const createPropertySignature = ts.Debug.deprecate(function createPropertySignature(
    modifiers: readonly ts.Modifier[] | undefined,
    name: ts.PropertyName | string,
    questionToken: ts.QuestionToken | undefined,
    type: ts.TypeNode | undefined,
    initializer?: ts.Expression | undefined
): ts.PropertySignature {
    const node = ts.factory.createPropertySignature(modifiers, name, questionToken, type);
    (node as ts.Mutable<ts.PropertySignature>).initializer = initializer;
    return node;
}, factoryDeprecation);

/** @deprecated Use `factory.updatePropertySignature` or the factory supplied by your transformation context instead. */
export const updatePropertySignature = ts.Debug.deprecate(function updatePropertySignature(
    node: ts.PropertySignature,
    modifiers: readonly ts.Modifier[] | undefined,
    name: ts.PropertyName,
    questionToken: ts.QuestionToken | undefined,
    type: ts.TypeNode | undefined,
    initializer: ts.Expression | undefined
) {
    let updated = ts.factory.updatePropertySignature(node, modifiers, name, questionToken, type);
    if (node.initializer !== initializer) {
        if (updated === node) {
            updated = ts.factory.cloneNode(node);
        }
        (updated as ts.Mutable<ts.PropertySignature>).initializer = initializer;
    }
    return updated;
}, factoryDeprecation);

/** @deprecated Use `factory.createExpressionWithTypeArguments` or the factory supplied by your transformation context instead. */
export const createExpressionWithTypeArguments = ts.Debug.deprecate(function createExpressionWithTypeArguments(typeArguments: readonly ts.TypeNode[] | undefined, expression: ts.Expression) {
    return ts.factory.createExpressionWithTypeArguments(expression, typeArguments);
}, factoryDeprecation);

/** @deprecated Use `factory.updateExpressionWithTypeArguments` or the factory supplied by your transformation context instead. */
export const updateExpressionWithTypeArguments = ts.Debug.deprecate(function updateExpressionWithTypeArguments(node: ts.ExpressionWithTypeArguments, typeArguments: readonly ts.TypeNode[] | undefined, expression: ts.Expression) {
    return ts.factory.updateExpressionWithTypeArguments(node, expression, typeArguments);
}, factoryDeprecation);

/** @deprecated Use `factory.createArrowFunction` or the factory supplied by your transformation context instead. */
export const createArrowFunction = ts.Debug.deprecate(function createArrowFunction(modifiers: readonly ts.Modifier[] | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined, equalsGreaterThanTokenOrBody: ts.ConciseBody | ts.EqualsGreaterThanToken | undefined, body?: ts.ConciseBody) {
    return arguments.length === 6 ? ts.factory.createArrowFunction(modifiers, typeParameters, parameters, type, equalsGreaterThanTokenOrBody as ts.EqualsGreaterThanToken | undefined, body!) :
        arguments.length === 5 ? ts.factory.createArrowFunction(modifiers, typeParameters, parameters, type, /*equalsGreaterThanToken*/ undefined, equalsGreaterThanTokenOrBody as ts.ConciseBody) :
        ts.Debug.fail("Argument count mismatch");
} as {
    (modifiers: readonly ts.Modifier[] | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined, equalsGreaterThanToken: ts.EqualsGreaterThanToken | undefined, body: ts.ConciseBody): ts.ArrowFunction;
    (modifiers: readonly ts.Modifier[] | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined, body: ts.ConciseBody): ts.ArrowFunction;
}, factoryDeprecation);

/** @deprecated Use `factory.updateArrowFunction` or the factory supplied by your transformation context instead. */
export const updateArrowFunction = ts.Debug.deprecate(function updateArrowFunction(node: ts.ArrowFunction, modifiers: readonly ts.Modifier[] | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined, equalsGreaterThanTokenOrBody: ts.EqualsGreaterThanToken | ts.ConciseBody, body?: ts.ConciseBody) {
    return arguments.length === 7 ? ts.factory.updateArrowFunction(node, modifiers, typeParameters, parameters, type, equalsGreaterThanTokenOrBody as ts.EqualsGreaterThanToken, body!) :
        arguments.length === 6 ? ts.factory.updateArrowFunction(node, modifiers, typeParameters, parameters, type, node.equalsGreaterThanToken, equalsGreaterThanTokenOrBody as ts.ConciseBody) :
        ts.Debug.fail("Argument count mismatch");
} as {
    (node: ts.ArrowFunction, modifiers: readonly ts.Modifier[] | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined, equalsGreaterThanToken: ts.EqualsGreaterThanToken, body: ts.ConciseBody): ts.ArrowFunction;
    (node: ts.ArrowFunction, modifiers: readonly ts.Modifier[] | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined, body: ts.ConciseBody): ts.ArrowFunction;
}, factoryDeprecation);

/** @deprecated Use `factory.createVariableDeclaration` or the factory supplied by your transformation context instead. */
export const createVariableDeclaration = ts.Debug.deprecate(function createVariableDeclaration(name: string | ts.BindingName, exclamationTokenOrType?: ts.ExclamationToken | ts.TypeNode, typeOrInitializer?: ts.TypeNode | ts.Expression, initializer?: ts.Expression) {
    return arguments.length === 4 ? ts.factory.createVariableDeclaration(name, exclamationTokenOrType as ts.ExclamationToken | undefined, typeOrInitializer as ts.TypeNode | undefined, initializer) :
        arguments.length >= 1 && arguments.length <= 3 ? ts.factory.createVariableDeclaration(name, /*exclamationToken*/ undefined, exclamationTokenOrType as ts.TypeNode | undefined, typeOrInitializer as ts.Expression | undefined) :
        ts.Debug.fail("Argument count mismatch");
} as {
    (name: string | ts.BindingName, type?: ts.TypeNode | undefined, initializer?: ts.Expression | undefined): ts.VariableDeclaration;
    (name: string | ts.BindingName, exclamationToken: ts.ExclamationToken | undefined, type: ts.TypeNode | undefined, initializer: ts.Expression | undefined): ts.VariableDeclaration;
}, factoryDeprecation);

/** @deprecated Use `factory.updateVariableDeclaration` or the factory supplied by your transformation context instead. */
export const updateVariableDeclaration = ts.Debug.deprecate(function updateVariableDeclaration(node: ts.VariableDeclaration, name: ts.BindingName, exclamationTokenOrType: ts.ExclamationToken | ts.TypeNode | undefined, typeOrInitializer: ts.TypeNode | ts.Expression | undefined, initializer?: ts.Expression | undefined) {
    return arguments.length === 5 ? ts.factory.updateVariableDeclaration(node, name, exclamationTokenOrType as ts.ExclamationToken | undefined, typeOrInitializer as ts.TypeNode | undefined, initializer) :
        arguments.length === 4 ? ts.factory.updateVariableDeclaration(node, name, node.exclamationToken, exclamationTokenOrType as ts.TypeNode | undefined, typeOrInitializer as ts.Expression | undefined) :
        ts.Debug.fail("Argument count mismatch");
} as {
    (node: ts.VariableDeclaration, name: ts.BindingName, type: ts.TypeNode | undefined, initializer: ts.Expression | undefined): ts.VariableDeclaration;
    (node: ts.VariableDeclaration, name: ts.BindingName, exclamationToken: ts.ExclamationToken | undefined, type: ts.TypeNode | undefined, initializer: ts.Expression | undefined): ts.VariableDeclaration;
}, factoryDeprecation);

/** @deprecated Use `factory.createImportClause` or the factory supplied by your transformation context instead. */
export const createImportClause = ts.Debug.deprecate(function createImportClause(name: ts.Identifier | undefined, namedBindings: ts.NamedImportBindings | undefined, isTypeOnly = false): ts.ImportClause {
    return ts.factory.createImportClause(isTypeOnly, name, namedBindings);
}, factoryDeprecation);

/** @deprecated Use `factory.updateImportClause` or the factory supplied by your transformation context instead. */
export const updateImportClause = ts.Debug.deprecate(function updateImportClause(node: ts.ImportClause, name: ts.Identifier | undefined, namedBindings: ts.NamedImportBindings | undefined, isTypeOnly: boolean) {
    return ts.factory.updateImportClause(node, isTypeOnly, name, namedBindings);
}, factoryDeprecation);

/** @deprecated Use `factory.createExportDeclaration` or the factory supplied by your transformation context instead. */
export const createExportDeclaration = ts.Debug.deprecate(function createExportDeclaration(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, exportClause: ts.NamedExportBindings | undefined, moduleSpecifier?: ts.Expression | undefined, isTypeOnly = false) {
    return ts.factory.createExportDeclaration(decorators, modifiers, isTypeOnly, exportClause, moduleSpecifier);
}, factoryDeprecation);

/** @deprecated Use `factory.updateExportDeclaration` or the factory supplied by your transformation context instead. */
export const updateExportDeclaration = ts.Debug.deprecate(function updateExportDeclaration(
    node: ts.ExportDeclaration,
    decorators: readonly ts.Decorator[] | undefined,
    modifiers: readonly ts.Modifier[] | undefined,
    exportClause: ts.NamedExportBindings | undefined,
    moduleSpecifier: ts.Expression | undefined,
    isTypeOnly: boolean) {
    return ts.factory.updateExportDeclaration(node, decorators, modifiers, isTypeOnly, exportClause, moduleSpecifier, node.assertClause);
}, factoryDeprecation);

/** @deprecated Use `factory.createJSDocParameterTag` or the factory supplied by your transformation context instead. */
export const createJSDocParamTag = ts.Debug.deprecate(function createJSDocParamTag(name: ts.EntityName, isBracketed: boolean, typeExpression?: ts.JSDocTypeExpression | undefined, comment?: string | undefined): ts.JSDocParameterTag {
    return ts.factory.createJSDocParameterTag(/*tagName*/ undefined, name, isBracketed, typeExpression, /*isNameFirst*/ false, comment ? ts.factory.createNodeArray([ts.factory.createJSDocText(comment)]) : undefined);
}, factoryDeprecation);

/** @deprecated Use `factory.createComma` or the factory supplied by your transformation context instead. */
export const createComma = ts.Debug.deprecate(function createComma(left: ts.Expression, right: ts.Expression): ts.Expression {
    return ts.factory.createComma(left, right);
}, factoryDeprecation);

/** @deprecated Use `factory.createLessThan` or the factory supplied by your transformation context instead. */
export const createLessThan = ts.Debug.deprecate(function createLessThan(left: ts.Expression, right: ts.Expression): ts.Expression {
    return ts.factory.createLessThan(left, right);
}, factoryDeprecation);

/** @deprecated Use `factory.createAssignment` or the factory supplied by your transformation context instead. */
export const createAssignment = ts.Debug.deprecate(function createAssignment(left: ts.Expression, right: ts.Expression): ts.BinaryExpression {
    return ts.factory.createAssignment(left, right);
}, factoryDeprecation);

/** @deprecated Use `factory.createStrictEquality` or the factory supplied by your transformation context instead. */
export const createStrictEquality = ts.Debug.deprecate(function createStrictEquality(left: ts.Expression, right: ts.Expression): ts.BinaryExpression {
    return ts.factory.createStrictEquality(left, right);
}, factoryDeprecation);

/** @deprecated Use `factory.createStrictInequality` or the factory supplied by your transformation context instead. */
export const createStrictInequality = ts.Debug.deprecate(function createStrictInequality(left: ts.Expression, right: ts.Expression): ts.BinaryExpression {
    return ts.factory.createStrictInequality(left, right);
}, factoryDeprecation);

/** @deprecated Use `factory.createAdd` or the factory supplied by your transformation context instead. */
export const createAdd = ts.Debug.deprecate(function createAdd(left: ts.Expression, right: ts.Expression): ts.BinaryExpression {
    return ts.factory.createAdd(left, right);
}, factoryDeprecation);

/** @deprecated Use `factory.createSubtract` or the factory supplied by your transformation context instead. */
export const createSubtract = ts.Debug.deprecate(function createSubtract(left: ts.Expression, right: ts.Expression): ts.BinaryExpression {
    return ts.factory.createSubtract(left, right);
}, factoryDeprecation);

/** @deprecated Use `factory.createLogicalAnd` or the factory supplied by your transformation context instead. */
export const createLogicalAnd = ts.Debug.deprecate(function createLogicalAnd(left: ts.Expression, right: ts.Expression): ts.BinaryExpression {
    return ts.factory.createLogicalAnd(left, right);
}, factoryDeprecation);

/** @deprecated Use `factory.createLogicalOr` or the factory supplied by your transformation context instead. */
export const createLogicalOr = ts.Debug.deprecate(function createLogicalOr(left: ts.Expression, right: ts.Expression): ts.BinaryExpression {
    return ts.factory.createLogicalOr(left, right);
}, factoryDeprecation);

/** @deprecated Use `factory.createPostfixIncrement` or the factory supplied by your transformation context instead. */
export const createPostfixIncrement = ts.Debug.deprecate(function createPostfixIncrement(operand: ts.Expression): ts.PostfixUnaryExpression {
    return ts.factory.createPostfixIncrement(operand);
}, factoryDeprecation);

/** @deprecated Use `factory.createLogicalNot` or the factory supplied by your transformation context instead. */
export const createLogicalNot = ts.Debug.deprecate(function createLogicalNot(operand: ts.Expression): ts.PrefixUnaryExpression {
    return ts.factory.createLogicalNot(operand);
}, factoryDeprecation);

/** @deprecated Use an appropriate `factory` method instead. */
export const createNode = ts.Debug.deprecate(function createNode(kind: ts.SyntaxKind, pos = 0, end = 0): ts.Node {
    return ts.setTextRangePosEnd(
        kind === ts.SyntaxKind.SourceFile ? ts.parseBaseNodeFactory.createBaseSourceFileNode(kind) :
        kind === ts.SyntaxKind.Identifier ? ts.parseBaseNodeFactory.createBaseIdentifierNode(kind) :
        kind === ts.SyntaxKind.PrivateIdentifier ? ts.parseBaseNodeFactory.createBasePrivateIdentifierNode(kind) :
        !ts.isNodeKind(kind) ? ts.parseBaseNodeFactory.createBaseTokenNode(kind) :
        ts.parseBaseNodeFactory.createBaseNode(kind),
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
export const getMutableClone = ts.Debug.deprecate(function getMutableClone<T extends ts.Node>(node: T): T {
    const clone = ts.factory.cloneNode(node);
    ts.setTextRange(clone, node);
    ts.setParent(clone, node.parent);
    return clone;
}, { since: "4.0", warnAfter: "4.1", message: "Use an appropriate `factory.update...` method instead, use `setCommentRange` or `setSourceMapRange`, and avoid setting `parent`." });
}
