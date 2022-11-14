import {
    ArrowFunction, AsteriskToken, BinaryExpression, BinaryOperator, BinaryOperatorToken, BindingName, BooleanLiteral,
    ClassElement, ClassExpression, ColonToken, ConciseBody, ConditionalExpression, ConstructorTypeNode, Debug,
    Decorator, DeprecationOptions, EntityName, EqualsGreaterThanToken, ExclamationToken, ExportDeclaration, Expression,
    ExpressionWithTypeArguments, factory, GeneratedIdentifierFlags, HeritageClause, Identifier, ImportClause,
    IndexSignatureDeclaration, isNodeKind, JSDocParameterTag, JSDocTypeExpression, MethodSignature, Modifier, Mutable,
    NamedExportBindings, NamedImportBindings, Node, NodeArray, NoSubstitutionTemplateLiteral, NumericLiteral,
    ParameterDeclaration, parseBaseNodeFactory, PostfixUnaryExpression, PrefixUnaryExpression, PrimaryExpression,
    PropertyName, PropertySignature, PseudoBigInt, QuestionToken, setParent, setTextRange, setTextRangePosEnd,
    StringLiteral, SyntaxKind, TaggedTemplateExpression, TemplateLiteral, ThisTypeNode, Token, TypeNode,
    TypeOperatorNode, TypeParameterDeclaration, TypePredicateNode, VariableDeclaration, YieldExpression,
} from "../_namespaces/ts";
import { deprecate } from "../deprecate";

// DEPRECATION: Node factory top-level exports
// DEPRECATION PLAN:
//     - soft: 4.0
//     - warn: 4.1
//     - error: 5.0
// NOTE: These exports are deprecated in favor of using a `NodeFactory` instance and exist here purely for backwards compatibility reasons.
const factoryDeprecation: DeprecationOptions = { since: "4.0", warnAfter: "4.1", message: "Use the appropriate method on 'ts.factory' or the 'factory' supplied by your transformation context instead." };

/** @deprecated Use `factory.createNodeArray` or the factory supplied by your transformation context instead. */
export const createNodeArray: typeof factory.createNodeArray = deprecate(factory.createNodeArray, factoryDeprecation);

/** @deprecated Use `factory.createNumericLiteral` or the factory supplied by your transformation context instead. */
export const createNumericLiteral: typeof factory.createNumericLiteral = deprecate(factory.createNumericLiteral, factoryDeprecation);

/** @deprecated Use `factory.createBigIntLiteral` or the factory supplied by your transformation context instead. */
export const createBigIntLiteral: typeof factory.createBigIntLiteral = deprecate(factory.createBigIntLiteral, factoryDeprecation);

/** @deprecated Use `factory.createStringLiteral` or the factory supplied by your transformation context instead. */
export const createStringLiteral: typeof factory.createStringLiteral = deprecate(factory.createStringLiteral, factoryDeprecation);

/** @deprecated Use `factory.createStringLiteralFromNode` or the factory supplied by your transformation context instead. */
export const createStringLiteralFromNode: typeof factory.createStringLiteralFromNode = deprecate(factory.createStringLiteralFromNode, factoryDeprecation);

/** @deprecated Use `factory.createRegularExpressionLiteral` or the factory supplied by your transformation context instead. */
export const createRegularExpressionLiteral: typeof factory.createRegularExpressionLiteral = deprecate(factory.createRegularExpressionLiteral, factoryDeprecation);

/** @deprecated Use `factory.createLoopVariable` or the factory supplied by your transformation context instead. */
export const createLoopVariable: typeof factory.createLoopVariable = deprecate(factory.createLoopVariable, factoryDeprecation);

/** @deprecated Use `factory.createUniqueName` or the factory supplied by your transformation context instead. */
export const createUniqueName: typeof factory.createUniqueName = deprecate(factory.createUniqueName, factoryDeprecation);

/** @deprecated Use `factory.createPrivateIdentifier` or the factory supplied by your transformation context instead. */
export const createPrivateIdentifier: typeof factory.createPrivateIdentifier = deprecate(factory.createPrivateIdentifier, factoryDeprecation);

/** @deprecated Use `factory.createSuper` or the factory supplied by your transformation context instead. */
export const createSuper: typeof factory.createSuper = deprecate(factory.createSuper, factoryDeprecation);

/** @deprecated Use `factory.createThis` or the factory supplied by your transformation context instead. */
export const createThis: typeof factory.createThis = deprecate(factory.createThis, factoryDeprecation);

/** @deprecated Use `factory.createNull` or the factory supplied by your transformation context instead. */
export const createNull: typeof factory.createNull = deprecate(factory.createNull, factoryDeprecation);

/** @deprecated Use `factory.createTrue` or the factory supplied by your transformation context instead. */
export const createTrue: typeof factory.createTrue = deprecate(factory.createTrue, factoryDeprecation);

/** @deprecated Use `factory.createFalse` or the factory supplied by your transformation context instead. */
export const createFalse: typeof factory.createFalse = deprecate(factory.createFalse, factoryDeprecation);

/** @deprecated Use `factory.createModifier` or the factory supplied by your transformation context instead. */
export const createModifier: typeof factory.createModifier = deprecate(factory.createModifier, factoryDeprecation);

/** @deprecated Use `factory.createModifiersFromModifierFlags` or the factory supplied by your transformation context instead. */
export const createModifiersFromModifierFlags: typeof factory.createModifiersFromModifierFlags = deprecate(factory.createModifiersFromModifierFlags, factoryDeprecation);

/** @deprecated Use `factory.createQualifiedName` or the factory supplied by your transformation context instead. */
export const createQualifiedName: typeof factory.createQualifiedName = deprecate(factory.createQualifiedName, factoryDeprecation);

/** @deprecated Use `factory.updateQualifiedName` or the factory supplied by your transformation context instead. */
export const updateQualifiedName: typeof factory.updateQualifiedName = deprecate(factory.updateQualifiedName, factoryDeprecation);

/** @deprecated Use `factory.createComputedPropertyName` or the factory supplied by your transformation context instead. */
export const createComputedPropertyName: typeof factory.createComputedPropertyName = deprecate(factory.createComputedPropertyName, factoryDeprecation);

/** @deprecated Use `factory.updateComputedPropertyName` or the factory supplied by your transformation context instead. */
export const updateComputedPropertyName: typeof factory.updateComputedPropertyName = deprecate(factory.updateComputedPropertyName, factoryDeprecation);

/** @deprecated Use `factory.createTypeParameterDeclaration` or the factory supplied by your transformation context instead. */
export const createTypeParameterDeclaration: typeof factory.createTypeParameterDeclaration = deprecate(factory.createTypeParameterDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateTypeParameterDeclaration` or the factory supplied by your transformation context instead. */
export const updateTypeParameterDeclaration: typeof factory.updateTypeParameterDeclaration = deprecate(factory.updateTypeParameterDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createParameterDeclaration` or the factory supplied by your transformation context instead. */
export const createParameter: typeof factory.createParameterDeclaration = deprecate(factory.createParameterDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateParameterDeclaration` or the factory supplied by your transformation context instead. */
export const updateParameter: typeof factory.updateParameterDeclaration = deprecate(factory.updateParameterDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createDecorator` or the factory supplied by your transformation context instead. */
export const createDecorator: typeof factory.createDecorator = deprecate(factory.createDecorator, factoryDeprecation);

/** @deprecated Use `factory.updateDecorator` or the factory supplied by your transformation context instead. */
export const updateDecorator: typeof factory.updateDecorator = deprecate(factory.updateDecorator, factoryDeprecation);

/** @deprecated Use `factory.createPropertyDeclaration` or the factory supplied by your transformation context instead. */
export const createProperty: typeof factory.createPropertyDeclaration = deprecate(factory.createPropertyDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updatePropertyDeclaration` or the factory supplied by your transformation context instead. */
export const updateProperty: typeof factory.updatePropertyDeclaration = deprecate(factory.updatePropertyDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createMethodDeclaration` or the factory supplied by your transformation context instead. */
export const createMethod: typeof factory.createMethodDeclaration = deprecate(factory.createMethodDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateMethodDeclaration` or the factory supplied by your transformation context instead. */
export const updateMethod: typeof factory.updateMethodDeclaration = deprecate(factory.updateMethodDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createConstructorDeclaration` or the factory supplied by your transformation context instead. */
export const createConstructor: typeof factory.createConstructorDeclaration = deprecate(factory.createConstructorDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateConstructorDeclaration` or the factory supplied by your transformation context instead. */
export const updateConstructor: typeof factory.updateConstructorDeclaration = deprecate(factory.updateConstructorDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createGetAccessorDeclaration` or the factory supplied by your transformation context instead. */
export const createGetAccessor: typeof factory.createGetAccessorDeclaration = deprecate(factory.createGetAccessorDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateGetAccessorDeclaration` or the factory supplied by your transformation context instead. */
export const updateGetAccessor: typeof factory.updateGetAccessorDeclaration = deprecate(factory.updateGetAccessorDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createSetAccessorDeclaration` or the factory supplied by your transformation context instead. */
export const createSetAccessor: typeof factory.createSetAccessorDeclaration = deprecate(factory.createSetAccessorDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateSetAccessorDeclaration` or the factory supplied by your transformation context instead. */
export const updateSetAccessor: typeof factory.updateSetAccessorDeclaration = deprecate(factory.updateSetAccessorDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createCallSignature` or the factory supplied by your transformation context instead. */
export const createCallSignature: typeof factory.createCallSignature = deprecate(factory.createCallSignature, factoryDeprecation);

/** @deprecated Use `factory.updateCallSignature` or the factory supplied by your transformation context instead. */
export const updateCallSignature: typeof factory.updateCallSignature = deprecate(factory.updateCallSignature, factoryDeprecation);

/** @deprecated Use `factory.createConstructSignature` or the factory supplied by your transformation context instead. */
export const createConstructSignature: typeof factory.createConstructSignature = deprecate(factory.createConstructSignature, factoryDeprecation);

/** @deprecated Use `factory.updateConstructSignature` or the factory supplied by your transformation context instead. */
export const updateConstructSignature: typeof factory.updateConstructSignature = deprecate(factory.updateConstructSignature, factoryDeprecation);

/** @deprecated Use `factory.updateIndexSignature` or the factory supplied by your transformation context instead. */
export const updateIndexSignature: typeof factory.updateIndexSignature = deprecate(factory.updateIndexSignature, factoryDeprecation);

/** @deprecated Use `factory.createKeywordTypeNode` or the factory supplied by your transformation context instead. */
export const createKeywordTypeNode: typeof factory.createKeywordTypeNode = deprecate(factory.createKeywordTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createTypePredicateNode` or the factory supplied by your transformation context instead. */
export const createTypePredicateNodeWithModifier: typeof factory.createTypePredicateNode = deprecate(factory.createTypePredicateNode, factoryDeprecation);

/** @deprecated Use `factory.updateTypePredicateNode` or the factory supplied by your transformation context instead. */
export const updateTypePredicateNodeWithModifier: typeof factory.updateTypePredicateNode = deprecate(factory.updateTypePredicateNode, factoryDeprecation);

/** @deprecated Use `factory.createTypeReferenceNode` or the factory supplied by your transformation context instead. */
export const createTypeReferenceNode: typeof factory.createTypeReferenceNode = deprecate(factory.createTypeReferenceNode, factoryDeprecation);

/** @deprecated Use `factory.updateTypeReferenceNode` or the factory supplied by your transformation context instead. */
export const updateTypeReferenceNode: typeof factory.updateTypeReferenceNode = deprecate(factory.updateTypeReferenceNode, factoryDeprecation);

/** @deprecated Use `factory.createFunctionTypeNode` or the factory supplied by your transformation context instead. */
export const createFunctionTypeNode: typeof factory.createFunctionTypeNode = deprecate(factory.createFunctionTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateFunctionTypeNode` or the factory supplied by your transformation context instead. */
export const updateFunctionTypeNode: typeof factory.updateFunctionTypeNode = deprecate(factory.updateFunctionTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createConstructorTypeNode` or the factory supplied by your transformation context instead. */
export const createConstructorTypeNode = deprecate((
    typeParameters: readonly TypeParameterDeclaration[] | undefined,
    parameters: readonly ParameterDeclaration[],
    type: TypeNode
) => {
    return factory.createConstructorTypeNode(/*modifiers*/ undefined, typeParameters, parameters, type);
}, factoryDeprecation);

/** @deprecated Use `factory.updateConstructorTypeNode` or the factory supplied by your transformation context instead. */
export const updateConstructorTypeNode = deprecate((
    node: ConstructorTypeNode,
    typeParameters: NodeArray<TypeParameterDeclaration> | undefined,
    parameters: NodeArray<ParameterDeclaration>,
    type: TypeNode
) => {
    return factory.updateConstructorTypeNode(node, node.modifiers, typeParameters, parameters, type);
}, factoryDeprecation);

/** @deprecated Use `factory.createTypeQueryNode` or the factory supplied by your transformation context instead. */
export const createTypeQueryNode: typeof factory.createTypeQueryNode = deprecate(factory.createTypeQueryNode, factoryDeprecation);

/** @deprecated Use `factory.updateTypeQueryNode` or the factory supplied by your transformation context instead. */
export const updateTypeQueryNode: typeof factory.updateTypeQueryNode = deprecate(factory.updateTypeQueryNode, factoryDeprecation);

/** @deprecated Use `factory.createTypeLiteralNode` or the factory supplied by your transformation context instead. */
export const createTypeLiteralNode: typeof factory.createTypeLiteralNode = deprecate(factory.createTypeLiteralNode, factoryDeprecation);

/** @deprecated Use `factory.updateTypeLiteralNode` or the factory supplied by your transformation context instead. */
export const updateTypeLiteralNode: typeof factory.updateTypeLiteralNode = deprecate(factory.updateTypeLiteralNode, factoryDeprecation);

/** @deprecated Use `factory.createArrayTypeNode` or the factory supplied by your transformation context instead. */
export const createArrayTypeNode: typeof factory.createArrayTypeNode = deprecate(factory.createArrayTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateArrayTypeNode` or the factory supplied by your transformation context instead. */
export const updateArrayTypeNode: typeof factory.updateArrayTypeNode = deprecate(factory.updateArrayTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createTupleTypeNode` or the factory supplied by your transformation context instead. */
export const createTupleTypeNode: typeof factory.createTupleTypeNode = deprecate(factory.createTupleTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateTupleTypeNode` or the factory supplied by your transformation context instead. */
export const updateTupleTypeNode: typeof factory.updateTupleTypeNode = deprecate(factory.updateTupleTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createOptionalTypeNode` or the factory supplied by your transformation context instead. */
export const createOptionalTypeNode: typeof factory.createOptionalTypeNode = deprecate(factory.createOptionalTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateOptionalTypeNode` or the factory supplied by your transformation context instead. */
export const updateOptionalTypeNode: typeof factory.updateOptionalTypeNode = deprecate(factory.updateOptionalTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createRestTypeNode` or the factory supplied by your transformation context instead. */
export const createRestTypeNode: typeof factory.createRestTypeNode = deprecate(factory.createRestTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateRestTypeNode` or the factory supplied by your transformation context instead. */
export const updateRestTypeNode: typeof factory.updateRestTypeNode = deprecate(factory.updateRestTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createUnionTypeNode` or the factory supplied by your transformation context instead. */
export const createUnionTypeNode: typeof factory.createUnionTypeNode = deprecate(factory.createUnionTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateUnionTypeNode` or the factory supplied by your transformation context instead. */
export const updateUnionTypeNode: typeof factory.updateUnionTypeNode = deprecate(factory.updateUnionTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createIntersectionTypeNode` or the factory supplied by your transformation context instead. */
export const createIntersectionTypeNode: typeof factory.createIntersectionTypeNode = deprecate(factory.createIntersectionTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateIntersectionTypeNode` or the factory supplied by your transformation context instead. */
export const updateIntersectionTypeNode: typeof factory.updateIntersectionTypeNode = deprecate(factory.updateIntersectionTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createConditionalTypeNode` or the factory supplied by your transformation context instead. */
export const createConditionalTypeNode: typeof factory.createConditionalTypeNode = deprecate(factory.createConditionalTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateConditionalTypeNode` or the factory supplied by your transformation context instead. */
export const updateConditionalTypeNode: typeof factory.updateConditionalTypeNode = deprecate(factory.updateConditionalTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createInferTypeNode` or the factory supplied by your transformation context instead. */
export const createInferTypeNode: typeof factory.createInferTypeNode = deprecate(factory.createInferTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateInferTypeNode` or the factory supplied by your transformation context instead. */
export const updateInferTypeNode: typeof factory.updateInferTypeNode = deprecate(factory.updateInferTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createImportTypeNode` or the factory supplied by your transformation context instead. */
export const createImportTypeNode: typeof factory.createImportTypeNode = deprecate(factory.createImportTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateImportTypeNode` or the factory supplied by your transformation context instead. */
export const updateImportTypeNode: typeof factory.updateImportTypeNode = deprecate(factory.updateImportTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createParenthesizedType` or the factory supplied by your transformation context instead. */
export const createParenthesizedType: typeof factory.createParenthesizedType = deprecate(factory.createParenthesizedType, factoryDeprecation);

/** @deprecated Use `factory.updateParenthesizedType` or the factory supplied by your transformation context instead. */
export const updateParenthesizedType: typeof factory.updateParenthesizedType = deprecate(factory.updateParenthesizedType, factoryDeprecation);

/** @deprecated Use `factory.createThisTypeNode` or the factory supplied by your transformation context instead. */
export const createThisTypeNode: typeof factory.createThisTypeNode = deprecate(factory.createThisTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateTypeOperatorNode` or the factory supplied by your transformation context instead. */
export const updateTypeOperatorNode: typeof factory.updateTypeOperatorNode = deprecate(factory.updateTypeOperatorNode, factoryDeprecation);

/** @deprecated Use `factory.createIndexedAccessTypeNode` or the factory supplied by your transformation context instead. */
export const createIndexedAccessTypeNode: typeof factory.createIndexedAccessTypeNode = deprecate(factory.createIndexedAccessTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateIndexedAccessTypeNode` or the factory supplied by your transformation context instead. */
export const updateIndexedAccessTypeNode: typeof factory.updateIndexedAccessTypeNode = deprecate(factory.updateIndexedAccessTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createMappedTypeNode` or the factory supplied by your transformation context instead. */
export const createMappedTypeNode: typeof factory.createMappedTypeNode = deprecate(factory.createMappedTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateMappedTypeNode` or the factory supplied by your transformation context instead. */
export const updateMappedTypeNode: typeof factory.updateMappedTypeNode = deprecate(factory.updateMappedTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createLiteralTypeNode` or the factory supplied by your transformation context instead. */
export const createLiteralTypeNode: typeof factory.createLiteralTypeNode = deprecate(factory.createLiteralTypeNode, factoryDeprecation);

/** @deprecated Use `factory.updateLiteralTypeNode` or the factory supplied by your transformation context instead. */
export const updateLiteralTypeNode: typeof factory.updateLiteralTypeNode = deprecate(factory.updateLiteralTypeNode, factoryDeprecation);

/** @deprecated Use `factory.createObjectBindingPattern` or the factory supplied by your transformation context instead. */
export const createObjectBindingPattern: typeof factory.createObjectBindingPattern = deprecate(factory.createObjectBindingPattern, factoryDeprecation);

/** @deprecated Use `factory.updateObjectBindingPattern` or the factory supplied by your transformation context instead. */
export const updateObjectBindingPattern: typeof factory.updateObjectBindingPattern = deprecate(factory.updateObjectBindingPattern, factoryDeprecation);

/** @deprecated Use `factory.createArrayBindingPattern` or the factory supplied by your transformation context instead. */
export const createArrayBindingPattern: typeof factory.createArrayBindingPattern = deprecate(factory.createArrayBindingPattern, factoryDeprecation);

/** @deprecated Use `factory.updateArrayBindingPattern` or the factory supplied by your transformation context instead. */
export const updateArrayBindingPattern: typeof factory.updateArrayBindingPattern = deprecate(factory.updateArrayBindingPattern, factoryDeprecation);

/** @deprecated Use `factory.createBindingElement` or the factory supplied by your transformation context instead. */
export const createBindingElement: typeof factory.createBindingElement = deprecate(factory.createBindingElement, factoryDeprecation);

/** @deprecated Use `factory.updateBindingElement` or the factory supplied by your transformation context instead. */
export const updateBindingElement: typeof factory.updateBindingElement = deprecate(factory.updateBindingElement, factoryDeprecation);

/** @deprecated Use `factory.createArrayLiteralExpression` or the factory supplied by your transformation context instead. */
export const createArrayLiteral: typeof factory.createArrayLiteralExpression = deprecate(factory.createArrayLiteralExpression, factoryDeprecation);

/** @deprecated Use `factory.updateArrayLiteralExpression` or the factory supplied by your transformation context instead. */
export const updateArrayLiteral: typeof factory.updateArrayLiteralExpression = deprecate(factory.updateArrayLiteralExpression, factoryDeprecation);

/** @deprecated Use `factory.createObjectLiteralExpression` or the factory supplied by your transformation context instead. */
export const createObjectLiteral: typeof factory.createObjectLiteralExpression = deprecate(factory.createObjectLiteralExpression, factoryDeprecation);

/** @deprecated Use `factory.updateObjectLiteralExpression` or the factory supplied by your transformation context instead. */
export const updateObjectLiteral: typeof factory.updateObjectLiteralExpression = deprecate(factory.updateObjectLiteralExpression, factoryDeprecation);

/** @deprecated Use `factory.createPropertyAccessExpression` or the factory supplied by your transformation context instead. */
export const createPropertyAccess: typeof factory.createPropertyAccessExpression = deprecate(factory.createPropertyAccessExpression, factoryDeprecation);

/** @deprecated Use `factory.updatePropertyAccessExpression` or the factory supplied by your transformation context instead. */
export const updatePropertyAccess: typeof factory.updatePropertyAccessExpression = deprecate(factory.updatePropertyAccessExpression, factoryDeprecation);

/** @deprecated Use `factory.createPropertyAccessChain` or the factory supplied by your transformation context instead. */
export const createPropertyAccessChain: typeof factory.createPropertyAccessChain = deprecate(factory.createPropertyAccessChain, factoryDeprecation);

/** @deprecated Use `factory.updatePropertyAccessChain` or the factory supplied by your transformation context instead. */
export const updatePropertyAccessChain: typeof factory.updatePropertyAccessChain = deprecate(factory.updatePropertyAccessChain, factoryDeprecation);

/** @deprecated Use `factory.createElementAccessExpression` or the factory supplied by your transformation context instead. */
export const createElementAccess: typeof factory.createElementAccessExpression = deprecate(factory.createElementAccessExpression, factoryDeprecation);

/** @deprecated Use `factory.updateElementAccessExpression` or the factory supplied by your transformation context instead. */
export const updateElementAccess: typeof factory.updateElementAccessExpression = deprecate(factory.updateElementAccessExpression, factoryDeprecation);

/** @deprecated Use `factory.createElementAccessChain` or the factory supplied by your transformation context instead. */
export const createElementAccessChain: typeof factory.createElementAccessChain = deprecate(factory.createElementAccessChain, factoryDeprecation);

/** @deprecated Use `factory.updateElementAccessChain` or the factory supplied by your transformation context instead. */
export const updateElementAccessChain: typeof factory.updateElementAccessChain = deprecate(factory.updateElementAccessChain, factoryDeprecation);

/** @deprecated Use `factory.createCallExpression` or the factory supplied by your transformation context instead. */
export const createCall: typeof factory.createCallExpression = deprecate(factory.createCallExpression, factoryDeprecation);

/** @deprecated Use `factory.updateCallExpression` or the factory supplied by your transformation context instead. */
export const updateCall: typeof factory.updateCallExpression = deprecate(factory.updateCallExpression, factoryDeprecation);

/** @deprecated Use `factory.createCallChain` or the factory supplied by your transformation context instead. */
export const createCallChain: typeof factory.createCallChain = deprecate(factory.createCallChain, factoryDeprecation);

/** @deprecated Use `factory.updateCallChain` or the factory supplied by your transformation context instead. */
export const updateCallChain: typeof factory.updateCallChain = deprecate(factory.updateCallChain, factoryDeprecation);

/** @deprecated Use `factory.createNewExpression` or the factory supplied by your transformation context instead. */
export const createNew: typeof factory.createNewExpression = deprecate(factory.createNewExpression, factoryDeprecation);

/** @deprecated Use `factory.updateNewExpression` or the factory supplied by your transformation context instead. */
export const updateNew: typeof factory.updateNewExpression = deprecate(factory.updateNewExpression, factoryDeprecation);

/** @deprecated Use `factory.createTypeAssertion` or the factory supplied by your transformation context instead. */
export const createTypeAssertion: typeof factory.createTypeAssertion = deprecate(factory.createTypeAssertion, factoryDeprecation);

/** @deprecated Use `factory.updateTypeAssertion` or the factory supplied by your transformation context instead. */
export const updateTypeAssertion: typeof factory.updateTypeAssertion = deprecate(factory.updateTypeAssertion, factoryDeprecation);

/** @deprecated Use `factory.createParenthesizedExpression` or the factory supplied by your transformation context instead. */
export const createParen: typeof factory.createParenthesizedExpression = deprecate(factory.createParenthesizedExpression, factoryDeprecation);

/** @deprecated Use `factory.updateParenthesizedExpression` or the factory supplied by your transformation context instead. */
export const updateParen: typeof factory.updateParenthesizedExpression = deprecate(factory.updateParenthesizedExpression, factoryDeprecation);

/** @deprecated Use `factory.createFunctionExpression` or the factory supplied by your transformation context instead. */
export const createFunctionExpression: typeof factory.createFunctionExpression = deprecate(factory.createFunctionExpression, factoryDeprecation);

/** @deprecated Use `factory.updateFunctionExpression` or the factory supplied by your transformation context instead. */
export const updateFunctionExpression: typeof factory.updateFunctionExpression = deprecate(factory.updateFunctionExpression, factoryDeprecation);

/** @deprecated Use `factory.createDeleteExpression` or the factory supplied by your transformation context instead. */
export const createDelete: typeof factory.createDeleteExpression = deprecate(factory.createDeleteExpression, factoryDeprecation);

/** @deprecated Use `factory.updateDeleteExpression` or the factory supplied by your transformation context instead. */
export const updateDelete: typeof factory.updateDeleteExpression = deprecate(factory.updateDeleteExpression, factoryDeprecation);

/** @deprecated Use `factory.createTypeOfExpression` or the factory supplied by your transformation context instead. */
export const createTypeOf: typeof factory.createTypeOfExpression = deprecate(factory.createTypeOfExpression, factoryDeprecation);

/** @deprecated Use `factory.updateTypeOfExpression` or the factory supplied by your transformation context instead. */
export const updateTypeOf: typeof factory.updateTypeOfExpression = deprecate(factory.updateTypeOfExpression, factoryDeprecation);

/** @deprecated Use `factory.createVoidExpression` or the factory supplied by your transformation context instead. */
export const createVoid: typeof factory.createVoidExpression = deprecate(factory.createVoidExpression, factoryDeprecation);

/** @deprecated Use `factory.updateVoidExpression` or the factory supplied by your transformation context instead. */
export const updateVoid: typeof factory.updateVoidExpression = deprecate(factory.updateVoidExpression, factoryDeprecation);

/** @deprecated Use `factory.createAwaitExpression` or the factory supplied by your transformation context instead. */
export const createAwait: typeof factory.createAwaitExpression = deprecate(factory.createAwaitExpression, factoryDeprecation);

/** @deprecated Use `factory.updateAwaitExpression` or the factory supplied by your transformation context instead. */
export const updateAwait: typeof factory.updateAwaitExpression = deprecate(factory.updateAwaitExpression, factoryDeprecation);

/** @deprecated Use `factory.createPrefixExpression` or the factory supplied by your transformation context instead. */
export const createPrefix: typeof factory.createPrefixUnaryExpression = deprecate(factory.createPrefixUnaryExpression, factoryDeprecation);

/** @deprecated Use `factory.updatePrefixExpression` or the factory supplied by your transformation context instead. */
export const updatePrefix: typeof factory.updatePrefixUnaryExpression = deprecate(factory.updatePrefixUnaryExpression, factoryDeprecation);

/** @deprecated Use `factory.createPostfixUnaryExpression` or the factory supplied by your transformation context instead. */
export const createPostfix: typeof factory.createPostfixUnaryExpression = deprecate(factory.createPostfixUnaryExpression, factoryDeprecation);

/** @deprecated Use `factory.updatePostfixUnaryExpression` or the factory supplied by your transformation context instead. */
export const updatePostfix: typeof factory.updatePostfixUnaryExpression = deprecate(factory.updatePostfixUnaryExpression, factoryDeprecation);

/** @deprecated Use `factory.createBinaryExpression` or the factory supplied by your transformation context instead. */
export const createBinary: typeof factory.createBinaryExpression = deprecate(factory.createBinaryExpression, factoryDeprecation);

/** @deprecated Use `factory.updateConditionalExpression` or the factory supplied by your transformation context instead. */
export const updateConditional: typeof factory.updateConditionalExpression = deprecate(factory.updateConditionalExpression, factoryDeprecation);

/** @deprecated Use `factory.createTemplateExpression` or the factory supplied by your transformation context instead. */
export const createTemplateExpression: typeof factory.createTemplateExpression = deprecate(factory.createTemplateExpression, factoryDeprecation);

/** @deprecated Use `factory.updateTemplateExpression` or the factory supplied by your transformation context instead. */
export const updateTemplateExpression: typeof factory.updateTemplateExpression = deprecate(factory.updateTemplateExpression, factoryDeprecation);

/** @deprecated Use `factory.createTemplateHead` or the factory supplied by your transformation context instead. */
export const createTemplateHead: typeof factory.createTemplateHead = deprecate(factory.createTemplateHead, factoryDeprecation);

/** @deprecated Use `factory.createTemplateMiddle` or the factory supplied by your transformation context instead. */
export const createTemplateMiddle: typeof factory.createTemplateMiddle = deprecate(factory.createTemplateMiddle, factoryDeprecation);

/** @deprecated Use `factory.createTemplateTail` or the factory supplied by your transformation context instead. */
export const createTemplateTail: typeof factory.createTemplateTail = deprecate(factory.createTemplateTail, factoryDeprecation);

/** @deprecated Use `factory.createNoSubstitutionTemplateLiteral` or the factory supplied by your transformation context instead. */
export const createNoSubstitutionTemplateLiteral: typeof factory.createNoSubstitutionTemplateLiteral = deprecate(factory.createNoSubstitutionTemplateLiteral, factoryDeprecation);

/** @deprecated Use `factory.updateYieldExpression` or the factory supplied by your transformation context instead. */
export const updateYield: typeof factory.updateYieldExpression = deprecate(factory.updateYieldExpression, factoryDeprecation);

/** @deprecated Use `factory.createSpreadExpression` or the factory supplied by your transformation context instead. */
export const createSpread: typeof factory.createSpreadElement = deprecate(factory.createSpreadElement, factoryDeprecation);

/** @deprecated Use `factory.updateSpreadExpression` or the factory supplied by your transformation context instead. */
export const updateSpread: typeof factory.updateSpreadElement = deprecate(factory.updateSpreadElement, factoryDeprecation);

/** @deprecated Use `factory.createOmittedExpression` or the factory supplied by your transformation context instead. */
export const createOmittedExpression: typeof factory.createOmittedExpression = deprecate(factory.createOmittedExpression, factoryDeprecation);

/** @deprecated Use `factory.createAsExpression` or the factory supplied by your transformation context instead. */
export const createAsExpression: typeof factory.createAsExpression = deprecate(factory.createAsExpression, factoryDeprecation);

/** @deprecated Use `factory.updateAsExpression` or the factory supplied by your transformation context instead. */
export const updateAsExpression: typeof factory.updateAsExpression = deprecate(factory.updateAsExpression, factoryDeprecation);

/** @deprecated Use `factory.createNonNullExpression` or the factory supplied by your transformation context instead. */
export const createNonNullExpression: typeof factory.createNonNullExpression = deprecate(factory.createNonNullExpression, factoryDeprecation);

/** @deprecated Use `factory.updateNonNullExpression` or the factory supplied by your transformation context instead. */
export const updateNonNullExpression: typeof factory.updateNonNullExpression = deprecate(factory.updateNonNullExpression, factoryDeprecation);

/** @deprecated Use `factory.createNonNullChain` or the factory supplied by your transformation context instead. */
export const createNonNullChain: typeof factory.createNonNullChain = deprecate(factory.createNonNullChain, factoryDeprecation);

/** @deprecated Use `factory.updateNonNullChain` or the factory supplied by your transformation context instead. */
export const updateNonNullChain: typeof factory.updateNonNullChain = deprecate(factory.updateNonNullChain, factoryDeprecation);

/** @deprecated Use `factory.createMetaProperty` or the factory supplied by your transformation context instead. */
export const createMetaProperty: typeof factory.createMetaProperty = deprecate(factory.createMetaProperty, factoryDeprecation);

/** @deprecated Use `factory.updateMetaProperty` or the factory supplied by your transformation context instead. */
export const updateMetaProperty: typeof factory.updateMetaProperty = deprecate(factory.updateMetaProperty, factoryDeprecation);

/** @deprecated Use `factory.createTemplateSpan` or the factory supplied by your transformation context instead. */
export const createTemplateSpan: typeof factory.createTemplateSpan = deprecate(factory.createTemplateSpan, factoryDeprecation);

/** @deprecated Use `factory.updateTemplateSpan` or the factory supplied by your transformation context instead. */
export const updateTemplateSpan: typeof factory.updateTemplateSpan = deprecate(factory.updateTemplateSpan, factoryDeprecation);

/** @deprecated Use `factory.createSemicolonClassElement` or the factory supplied by your transformation context instead. */
export const createSemicolonClassElement: typeof factory.createSemicolonClassElement = deprecate(factory.createSemicolonClassElement, factoryDeprecation);

/** @deprecated Use `factory.createBlock` or the factory supplied by your transformation context instead. */
export const createBlock: typeof factory.createBlock = deprecate(factory.createBlock, factoryDeprecation);

/** @deprecated Use `factory.updateBlock` or the factory supplied by your transformation context instead. */
export const updateBlock: typeof factory.updateBlock = deprecate(factory.updateBlock, factoryDeprecation);

/** @deprecated Use `factory.createVariableStatement` or the factory supplied by your transformation context instead. */
export const createVariableStatement: typeof factory.createVariableStatement = deprecate(factory.createVariableStatement, factoryDeprecation);

/** @deprecated Use `factory.updateVariableStatement` or the factory supplied by your transformation context instead. */
export const updateVariableStatement: typeof factory.updateVariableStatement = deprecate(factory.updateVariableStatement, factoryDeprecation);

/** @deprecated Use `factory.createEmptyStatement` or the factory supplied by your transformation context instead. */
export const createEmptyStatement: typeof factory.createEmptyStatement = deprecate(factory.createEmptyStatement, factoryDeprecation);

/** @deprecated Use `factory.createExpressionStatement` or the factory supplied by your transformation context instead. */
export const createExpressionStatement: typeof factory.createExpressionStatement = deprecate(factory.createExpressionStatement, factoryDeprecation);

/** @deprecated Use `factory.updateExpressionStatement` or the factory supplied by your transformation context instead. */
export const updateExpressionStatement: typeof factory.updateExpressionStatement = deprecate(factory.updateExpressionStatement, factoryDeprecation);

/** @deprecated Use `factory.createExpressionStatement` or the factory supplied by your transformation context instead. */
export const createStatement: typeof factory.createExpressionStatement = deprecate(factory.createExpressionStatement, factoryDeprecation);

/** @deprecated Use `factory.updateExpressionStatement` or the factory supplied by your transformation context instead. */
export const updateStatement: typeof factory.updateExpressionStatement = deprecate(factory.updateExpressionStatement, factoryDeprecation);

/** @deprecated Use `factory.createIfStatement` or the factory supplied by your transformation context instead. */
export const createIf: typeof factory.createIfStatement = deprecate(factory.createIfStatement, factoryDeprecation);

/** @deprecated Use `factory.updateIfStatement` or the factory supplied by your transformation context instead. */
export const updateIf: typeof factory.updateIfStatement = deprecate(factory.updateIfStatement, factoryDeprecation);

/** @deprecated Use `factory.createDoStatement` or the factory supplied by your transformation context instead. */
export const createDo: typeof factory.createDoStatement = deprecate(factory.createDoStatement, factoryDeprecation);

/** @deprecated Use `factory.updateDoStatement` or the factory supplied by your transformation context instead. */
export const updateDo: typeof factory.updateDoStatement = deprecate(factory.updateDoStatement, factoryDeprecation);

/** @deprecated Use `factory.createWhileStatement` or the factory supplied by your transformation context instead. */
export const createWhile: typeof factory.createWhileStatement = deprecate(factory.createWhileStatement, factoryDeprecation);

/** @deprecated Use `factory.updateWhileStatement` or the factory supplied by your transformation context instead. */
export const updateWhile: typeof factory.updateWhileStatement = deprecate(factory.updateWhileStatement, factoryDeprecation);

/** @deprecated Use `factory.createForStatement` or the factory supplied by your transformation context instead. */
export const createFor: typeof factory.createForStatement = deprecate(factory.createForStatement, factoryDeprecation);

/** @deprecated Use `factory.updateForStatement` or the factory supplied by your transformation context instead. */
export const updateFor: typeof factory.updateForStatement = deprecate(factory.updateForStatement, factoryDeprecation);

/** @deprecated Use `factory.createForInStatement` or the factory supplied by your transformation context instead. */
export const createForIn: typeof factory.createForInStatement = deprecate(factory.createForInStatement, factoryDeprecation);

/** @deprecated Use `factory.updateForInStatement` or the factory supplied by your transformation context instead. */
export const updateForIn: typeof factory.updateForInStatement = deprecate(factory.updateForInStatement, factoryDeprecation);

/** @deprecated Use `factory.createForOfStatement` or the factory supplied by your transformation context instead. */
export const createForOf: typeof factory.createForOfStatement = deprecate(factory.createForOfStatement, factoryDeprecation);

/** @deprecated Use `factory.updateForOfStatement` or the factory supplied by your transformation context instead. */
export const updateForOf: typeof factory.updateForOfStatement = deprecate(factory.updateForOfStatement, factoryDeprecation);

/** @deprecated Use `factory.createContinueStatement` or the factory supplied by your transformation context instead. */
export const createContinue: typeof factory.createContinueStatement = deprecate(factory.createContinueStatement, factoryDeprecation);

/** @deprecated Use `factory.updateContinueStatement` or the factory supplied by your transformation context instead. */
export const updateContinue: typeof factory.updateContinueStatement = deprecate(factory.updateContinueStatement, factoryDeprecation);

/** @deprecated Use `factory.createBreakStatement` or the factory supplied by your transformation context instead. */
export const createBreak: typeof factory.createBreakStatement = deprecate(factory.createBreakStatement, factoryDeprecation);

/** @deprecated Use `factory.updateBreakStatement` or the factory supplied by your transformation context instead. */
export const updateBreak: typeof factory.updateBreakStatement = deprecate(factory.updateBreakStatement, factoryDeprecation);

/** @deprecated Use `factory.createReturnStatement` or the factory supplied by your transformation context instead. */
export const createReturn: typeof factory.createReturnStatement = deprecate(factory.createReturnStatement, factoryDeprecation);

/** @deprecated Use `factory.updateReturnStatement` or the factory supplied by your transformation context instead. */
export const updateReturn: typeof factory.updateReturnStatement = deprecate(factory.updateReturnStatement, factoryDeprecation);

/** @deprecated Use `factory.createWithStatement` or the factory supplied by your transformation context instead. */
export const createWith: typeof factory.createWithStatement = deprecate(factory.createWithStatement, factoryDeprecation);

/** @deprecated Use `factory.updateWithStatement` or the factory supplied by your transformation context instead. */
export const updateWith: typeof factory.updateWithStatement = deprecate(factory.updateWithStatement, factoryDeprecation);

/** @deprecated Use `factory.createSwitchStatement` or the factory supplied by your transformation context instead. */
export const createSwitch: typeof factory.createSwitchStatement = deprecate(factory.createSwitchStatement, factoryDeprecation);

/** @deprecated Use `factory.updateSwitchStatement` or the factory supplied by your transformation context instead. */
export const updateSwitch: typeof factory.updateSwitchStatement = deprecate(factory.updateSwitchStatement, factoryDeprecation);

/** @deprecated Use `factory.createLabelStatement` or the factory supplied by your transformation context instead. */
export const createLabel: typeof factory.createLabeledStatement = deprecate(factory.createLabeledStatement, factoryDeprecation);

/** @deprecated Use `factory.updateLabelStatement` or the factory supplied by your transformation context instead. */
export const updateLabel: typeof factory.updateLabeledStatement = deprecate(factory.updateLabeledStatement, factoryDeprecation);

/** @deprecated Use `factory.createThrowStatement` or the factory supplied by your transformation context instead. */
export const createThrow: typeof factory.createThrowStatement = deprecate(factory.createThrowStatement, factoryDeprecation);

/** @deprecated Use `factory.updateThrowStatement` or the factory supplied by your transformation context instead. */
export const updateThrow: typeof factory.updateThrowStatement = deprecate(factory.updateThrowStatement, factoryDeprecation);

/** @deprecated Use `factory.createTryStatement` or the factory supplied by your transformation context instead. */
export const createTry: typeof factory.createTryStatement = deprecate(factory.createTryStatement, factoryDeprecation);

/** @deprecated Use `factory.updateTryStatement` or the factory supplied by your transformation context instead. */
export const updateTry: typeof factory.updateTryStatement = deprecate(factory.updateTryStatement, factoryDeprecation);

/** @deprecated Use `factory.createDebuggerStatement` or the factory supplied by your transformation context instead. */
export const createDebuggerStatement: typeof factory.createDebuggerStatement = deprecate(factory.createDebuggerStatement, factoryDeprecation);

/** @deprecated Use `factory.createVariableDeclarationList` or the factory supplied by your transformation context instead. */
export const createVariableDeclarationList: typeof factory.createVariableDeclarationList = deprecate(factory.createVariableDeclarationList, factoryDeprecation);

/** @deprecated Use `factory.updateVariableDeclarationList` or the factory supplied by your transformation context instead. */
export const updateVariableDeclarationList: typeof factory.updateVariableDeclarationList = deprecate(factory.updateVariableDeclarationList, factoryDeprecation);

/** @deprecated Use `factory.createFunctionDeclaration` or the factory supplied by your transformation context instead. */
export const createFunctionDeclaration: typeof factory.createFunctionDeclaration = deprecate(factory.createFunctionDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateFunctionDeclaration` or the factory supplied by your transformation context instead. */
export const updateFunctionDeclaration: typeof factory.updateFunctionDeclaration = deprecate(factory.updateFunctionDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createClassDeclaration` or the factory supplied by your transformation context instead. */
export const createClassDeclaration: typeof factory.createClassDeclaration = deprecate(factory.createClassDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateClassDeclaration` or the factory supplied by your transformation context instead. */
export const updateClassDeclaration: typeof factory.updateClassDeclaration = deprecate(factory.updateClassDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createInterfaceDeclaration` or the factory supplied by your transformation context instead. */
export const createInterfaceDeclaration: typeof factory.createInterfaceDeclaration = deprecate(factory.createInterfaceDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateInterfaceDeclaration` or the factory supplied by your transformation context instead. */
export const updateInterfaceDeclaration: typeof factory.updateInterfaceDeclaration = deprecate(factory.updateInterfaceDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createTypeAliasDeclaration` or the factory supplied by your transformation context instead. */
export const createTypeAliasDeclaration: typeof factory.createTypeAliasDeclaration = deprecate(factory.createTypeAliasDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateTypeAliasDeclaration` or the factory supplied by your transformation context instead. */
export const updateTypeAliasDeclaration: typeof factory.updateTypeAliasDeclaration = deprecate(factory.updateTypeAliasDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createEnumDeclaration` or the factory supplied by your transformation context instead. */
export const createEnumDeclaration: typeof factory.createEnumDeclaration = deprecate(factory.createEnumDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateEnumDeclaration` or the factory supplied by your transformation context instead. */
export const updateEnumDeclaration: typeof factory.updateEnumDeclaration = deprecate(factory.updateEnumDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createModuleDeclaration` or the factory supplied by your transformation context instead. */
export const createModuleDeclaration: typeof factory.createModuleDeclaration = deprecate(factory.createModuleDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateModuleDeclaration` or the factory supplied by your transformation context instead. */
export const updateModuleDeclaration: typeof factory.updateModuleDeclaration = deprecate(factory.updateModuleDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createModuleBlock` or the factory supplied by your transformation context instead. */
export const createModuleBlock: typeof factory.createModuleBlock = deprecate(factory.createModuleBlock, factoryDeprecation);

/** @deprecated Use `factory.updateModuleBlock` or the factory supplied by your transformation context instead. */
export const updateModuleBlock: typeof factory.updateModuleBlock = deprecate(factory.updateModuleBlock, factoryDeprecation);

/** @deprecated Use `factory.createCaseBlock` or the factory supplied by your transformation context instead. */
export const createCaseBlock: typeof factory.createCaseBlock = deprecate(factory.createCaseBlock, factoryDeprecation);

/** @deprecated Use `factory.updateCaseBlock` or the factory supplied by your transformation context instead. */
export const updateCaseBlock: typeof factory.updateCaseBlock = deprecate(factory.updateCaseBlock, factoryDeprecation);

/** @deprecated Use `factory.createNamespaceExportDeclaration` or the factory supplied by your transformation context instead. */
export const createNamespaceExportDeclaration: typeof factory.createNamespaceExportDeclaration = deprecate(factory.createNamespaceExportDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateNamespaceExportDeclaration` or the factory supplied by your transformation context instead. */
export const updateNamespaceExportDeclaration: typeof factory.updateNamespaceExportDeclaration = deprecate(factory.updateNamespaceExportDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createImportEqualsDeclaration` or the factory supplied by your transformation context instead. */
export const createImportEqualsDeclaration: typeof factory.createImportEqualsDeclaration = deprecate(factory.createImportEqualsDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateImportEqualsDeclaration` or the factory supplied by your transformation context instead. */
export const updateImportEqualsDeclaration: typeof factory.updateImportEqualsDeclaration = deprecate(factory.updateImportEqualsDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createImportDeclaration` or the factory supplied by your transformation context instead. */
export const createImportDeclaration: typeof factory.createImportDeclaration = deprecate(factory.createImportDeclaration, factoryDeprecation);

/** @deprecated Use `factory.updateImportDeclaration` or the factory supplied by your transformation context instead. */
export const updateImportDeclaration: typeof factory.updateImportDeclaration = deprecate(factory.updateImportDeclaration, factoryDeprecation);

/** @deprecated Use `factory.createNamespaceImport` or the factory supplied by your transformation context instead. */
export const createNamespaceImport: typeof factory.createNamespaceImport = deprecate(factory.createNamespaceImport, factoryDeprecation);

/** @deprecated Use `factory.updateNamespaceImport` or the factory supplied by your transformation context instead. */
export const updateNamespaceImport: typeof factory.updateNamespaceImport = deprecate(factory.updateNamespaceImport, factoryDeprecation);

/** @deprecated Use `factory.createNamedImports` or the factory supplied by your transformation context instead. */
export const createNamedImports: typeof factory.createNamedImports = deprecate(factory.createNamedImports, factoryDeprecation);

/** @deprecated Use `factory.updateNamedImports` or the factory supplied by your transformation context instead. */
export const updateNamedImports: typeof factory.updateNamedImports = deprecate(factory.updateNamedImports, factoryDeprecation);

/** @deprecated Use `factory.createImportSpecifier` or the factory supplied by your transformation context instead. */
export const createImportSpecifier: typeof factory.createImportSpecifier = deprecate(factory.createImportSpecifier, factoryDeprecation);

/** @deprecated Use `factory.updateImportSpecifier` or the factory supplied by your transformation context instead. */
export const updateImportSpecifier: typeof factory.updateImportSpecifier = deprecate(factory.updateImportSpecifier, factoryDeprecation);

/** @deprecated Use `factory.createExportAssignment` or the factory supplied by your transformation context instead. */
export const createExportAssignment: typeof factory.createExportAssignment = deprecate(factory.createExportAssignment, factoryDeprecation);

/** @deprecated Use `factory.updateExportAssignment` or the factory supplied by your transformation context instead. */
export const updateExportAssignment: typeof factory.updateExportAssignment = deprecate(factory.updateExportAssignment, factoryDeprecation);

/** @deprecated Use `factory.createNamedExports` or the factory supplied by your transformation context instead. */
export const createNamedExports: typeof factory.createNamedExports = deprecate(factory.createNamedExports, factoryDeprecation);

/** @deprecated Use `factory.updateNamedExports` or the factory supplied by your transformation context instead. */
export const updateNamedExports: typeof factory.updateNamedExports = deprecate(factory.updateNamedExports, factoryDeprecation);

/** @deprecated Use `factory.createExportSpecifier` or the factory supplied by your transformation context instead. */
export const createExportSpecifier: typeof factory.createExportSpecifier = deprecate(factory.createExportSpecifier, factoryDeprecation);

/** @deprecated Use `factory.updateExportSpecifier` or the factory supplied by your transformation context instead. */
export const updateExportSpecifier: typeof factory.updateExportSpecifier = deprecate(factory.updateExportSpecifier, factoryDeprecation);

/** @deprecated Use `factory.createExternalModuleReference` or the factory supplied by your transformation context instead. */
export const createExternalModuleReference: typeof factory.createExternalModuleReference = deprecate(factory.createExternalModuleReference, factoryDeprecation);

/** @deprecated Use `factory.updateExternalModuleReference` or the factory supplied by your transformation context instead. */
export const updateExternalModuleReference: typeof factory.updateExternalModuleReference = deprecate(factory.updateExternalModuleReference, factoryDeprecation);

/** @deprecated Use `factory.createJSDocTypeExpression` or the factory supplied by your transformation context instead. */
export const createJSDocTypeExpression: typeof factory.createJSDocTypeExpression = deprecate(factory.createJSDocTypeExpression, factoryDeprecation);

/** @deprecated Use `factory.createJSDocTypeTag` or the factory supplied by your transformation context instead. */
export const createJSDocTypeTag: typeof factory.createJSDocTypeTag = deprecate(factory.createJSDocTypeTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocReturnTag` or the factory supplied by your transformation context instead. */
export const createJSDocReturnTag: typeof factory.createJSDocReturnTag = deprecate(factory.createJSDocReturnTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocThisTag` or the factory supplied by your transformation context instead. */
export const createJSDocThisTag: typeof factory.createJSDocThisTag = deprecate(factory.createJSDocThisTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocComment` or the factory supplied by your transformation context instead. */
export const createJSDocComment: typeof factory.createJSDocComment = deprecate(factory.createJSDocComment, factoryDeprecation);

/** @deprecated Use `factory.createJSDocParameterTag` or the factory supplied by your transformation context instead. */
export const createJSDocParameterTag: typeof factory.createJSDocParameterTag = deprecate(factory.createJSDocParameterTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocClassTag` or the factory supplied by your transformation context instead. */
export const createJSDocClassTag: typeof factory.createJSDocClassTag = deprecate(factory.createJSDocClassTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocAugmentsTag` or the factory supplied by your transformation context instead. */
export const createJSDocAugmentsTag: typeof factory.createJSDocAugmentsTag = deprecate(factory.createJSDocAugmentsTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocEnumTag` or the factory supplied by your transformation context instead. */
export const createJSDocEnumTag: typeof factory.createJSDocEnumTag = deprecate(factory.createJSDocEnumTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocTemplateTag` or the factory supplied by your transformation context instead. */
export const createJSDocTemplateTag: typeof factory.createJSDocTemplateTag = deprecate(factory.createJSDocTemplateTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocTypedefTag` or the factory supplied by your transformation context instead. */
export const createJSDocTypedefTag: typeof factory.createJSDocTypedefTag = deprecate(factory.createJSDocTypedefTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocCallbackTag` or the factory supplied by your transformation context instead. */
export const createJSDocCallbackTag: typeof factory.createJSDocCallbackTag = deprecate(factory.createJSDocCallbackTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocSignature` or the factory supplied by your transformation context instead. */
export const createJSDocSignature: typeof factory.createJSDocSignature = deprecate(factory.createJSDocSignature, factoryDeprecation);

/** @deprecated Use `factory.createJSDocPropertyTag` or the factory supplied by your transformation context instead. */
export const createJSDocPropertyTag: typeof factory.createJSDocPropertyTag = deprecate(factory.createJSDocPropertyTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocTypeLiteral` or the factory supplied by your transformation context instead. */
export const createJSDocTypeLiteral: typeof factory.createJSDocTypeLiteral = deprecate(factory.createJSDocTypeLiteral, factoryDeprecation);

/** @deprecated Use `factory.createJSDocImplementsTag` or the factory supplied by your transformation context instead. */
export const createJSDocImplementsTag: typeof factory.createJSDocImplementsTag = deprecate(factory.createJSDocImplementsTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocAuthorTag` or the factory supplied by your transformation context instead. */
export const createJSDocAuthorTag: typeof factory.createJSDocAuthorTag = deprecate(factory.createJSDocAuthorTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocPublicTag` or the factory supplied by your transformation context instead. */
export const createJSDocPublicTag: typeof factory.createJSDocPublicTag = deprecate(factory.createJSDocPublicTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocPrivateTag` or the factory supplied by your transformation context instead. */
export const createJSDocPrivateTag: typeof factory.createJSDocPrivateTag = deprecate(factory.createJSDocPrivateTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocProtectedTag` or the factory supplied by your transformation context instead. */
export const createJSDocProtectedTag: typeof factory.createJSDocProtectedTag = deprecate(factory.createJSDocProtectedTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocReadonlyTag` or the factory supplied by your transformation context instead. */
export const createJSDocReadonlyTag: typeof factory.createJSDocReadonlyTag = deprecate(factory.createJSDocReadonlyTag, factoryDeprecation);

/** @deprecated Use `factory.createJSDocUnknownTag` or the factory supplied by your transformation context instead. */
export const createJSDocTag: typeof factory.createJSDocUnknownTag = deprecate(factory.createJSDocUnknownTag, factoryDeprecation);

/** @deprecated Use `factory.createJsxElement` or the factory supplied by your transformation context instead. */
export const createJsxElement: typeof factory.createJsxElement = deprecate(factory.createJsxElement, factoryDeprecation);

/** @deprecated Use `factory.updateJsxElement` or the factory supplied by your transformation context instead. */
export const updateJsxElement: typeof factory.updateJsxElement = deprecate(factory.updateJsxElement, factoryDeprecation);

/** @deprecated Use `factory.createJsxSelfClosingElement` or the factory supplied by your transformation context instead. */
export const createJsxSelfClosingElement: typeof factory.createJsxSelfClosingElement = deprecate(factory.createJsxSelfClosingElement, factoryDeprecation);

/** @deprecated Use `factory.updateJsxSelfClosingElement` or the factory supplied by your transformation context instead. */
export const updateJsxSelfClosingElement: typeof factory.updateJsxSelfClosingElement = deprecate(factory.updateJsxSelfClosingElement, factoryDeprecation);

/** @deprecated Use `factory.createJsxOpeningElement` or the factory supplied by your transformation context instead. */
export const createJsxOpeningElement: typeof factory.createJsxOpeningElement = deprecate(factory.createJsxOpeningElement, factoryDeprecation);

/** @deprecated Use `factory.updateJsxOpeningElement` or the factory supplied by your transformation context instead. */
export const updateJsxOpeningElement: typeof factory.updateJsxOpeningElement = deprecate(factory.updateJsxOpeningElement, factoryDeprecation);

/** @deprecated Use `factory.createJsxClosingElement` or the factory supplied by your transformation context instead. */
export const createJsxClosingElement: typeof factory.createJsxClosingElement = deprecate(factory.createJsxClosingElement, factoryDeprecation);

/** @deprecated Use `factory.updateJsxClosingElement` or the factory supplied by your transformation context instead. */
export const updateJsxClosingElement: typeof factory.updateJsxClosingElement = deprecate(factory.updateJsxClosingElement, factoryDeprecation);

/** @deprecated Use `factory.createJsxFragment` or the factory supplied by your transformation context instead. */
export const createJsxFragment: typeof factory.createJsxFragment = deprecate(factory.createJsxFragment, factoryDeprecation);

/** @deprecated Use `factory.createJsxText` or the factory supplied by your transformation context instead. */
export const createJsxText: typeof factory.createJsxText = deprecate(factory.createJsxText, factoryDeprecation);

/** @deprecated Use `factory.updateJsxText` or the factory supplied by your transformation context instead. */
export const updateJsxText: typeof factory.updateJsxText = deprecate(factory.updateJsxText, factoryDeprecation);

/** @deprecated Use `factory.createJsxOpeningFragment` or the factory supplied by your transformation context instead. */
export const createJsxOpeningFragment: typeof factory.createJsxOpeningFragment = deprecate(factory.createJsxOpeningFragment, factoryDeprecation);

/** @deprecated Use `factory.createJsxJsxClosingFragment` or the factory supplied by your transformation context instead. */
export const createJsxJsxClosingFragment: typeof factory.createJsxJsxClosingFragment = deprecate(factory.createJsxJsxClosingFragment, factoryDeprecation);

/** @deprecated Use `factory.updateJsxFragment` or the factory supplied by your transformation context instead. */
export const updateJsxFragment: typeof factory.updateJsxFragment = deprecate(factory.updateJsxFragment, factoryDeprecation);

/** @deprecated Use `factory.createJsxAttribute` or the factory supplied by your transformation context instead. */
export const createJsxAttribute: typeof factory.createJsxAttribute = deprecate(factory.createJsxAttribute, factoryDeprecation);

/** @deprecated Use `factory.updateJsxAttribute` or the factory supplied by your transformation context instead. */
export const updateJsxAttribute: typeof factory.updateJsxAttribute = deprecate(factory.updateJsxAttribute, factoryDeprecation);

/** @deprecated Use `factory.createJsxAttributes` or the factory supplied by your transformation context instead. */
export const createJsxAttributes: typeof factory.createJsxAttributes = deprecate(factory.createJsxAttributes, factoryDeprecation);

/** @deprecated Use `factory.updateJsxAttributes` or the factory supplied by your transformation context instead. */
export const updateJsxAttributes: typeof factory.updateJsxAttributes = deprecate(factory.updateJsxAttributes, factoryDeprecation);

/** @deprecated Use `factory.createJsxSpreadAttribute` or the factory supplied by your transformation context instead. */
export const createJsxSpreadAttribute: typeof factory.createJsxSpreadAttribute = deprecate(factory.createJsxSpreadAttribute, factoryDeprecation);

/** @deprecated Use `factory.updateJsxSpreadAttribute` or the factory supplied by your transformation context instead. */
export const updateJsxSpreadAttribute: typeof factory.updateJsxSpreadAttribute = deprecate(factory.updateJsxSpreadAttribute, factoryDeprecation);

/** @deprecated Use `factory.createJsxExpression` or the factory supplied by your transformation context instead. */
export const createJsxExpression: typeof factory.createJsxExpression = deprecate(factory.createJsxExpression, factoryDeprecation);

/** @deprecated Use `factory.updateJsxExpression` or the factory supplied by your transformation context instead. */
export const updateJsxExpression: typeof factory.updateJsxExpression = deprecate(factory.updateJsxExpression, factoryDeprecation);

/** @deprecated Use `factory.createCaseClause` or the factory supplied by your transformation context instead. */
export const createCaseClause: typeof factory.createCaseClause = deprecate(factory.createCaseClause, factoryDeprecation);

/** @deprecated Use `factory.updateCaseClause` or the factory supplied by your transformation context instead. */
export const updateCaseClause: typeof factory.updateCaseClause = deprecate(factory.updateCaseClause, factoryDeprecation);

/** @deprecated Use `factory.createDefaultClause` or the factory supplied by your transformation context instead. */
export const createDefaultClause: typeof factory.createDefaultClause = deprecate(factory.createDefaultClause, factoryDeprecation);

/** @deprecated Use `factory.updateDefaultClause` or the factory supplied by your transformation context instead. */
export const updateDefaultClause: typeof factory.updateDefaultClause = deprecate(factory.updateDefaultClause, factoryDeprecation);

/** @deprecated Use `factory.createHeritageClause` or the factory supplied by your transformation context instead. */
export const createHeritageClause: typeof factory.createHeritageClause = deprecate(factory.createHeritageClause, factoryDeprecation);

/** @deprecated Use `factory.updateHeritageClause` or the factory supplied by your transformation context instead. */
export const updateHeritageClause: typeof factory.updateHeritageClause = deprecate(factory.updateHeritageClause, factoryDeprecation);

/** @deprecated Use `factory.createCatchClause` or the factory supplied by your transformation context instead. */
export const createCatchClause: typeof factory.createCatchClause = deprecate(factory.createCatchClause, factoryDeprecation);

/** @deprecated Use `factory.updateCatchClause` or the factory supplied by your transformation context instead. */
export const updateCatchClause: typeof factory.updateCatchClause = deprecate(factory.updateCatchClause, factoryDeprecation);

/** @deprecated Use `factory.createPropertyAssignment` or the factory supplied by your transformation context instead. */
export const createPropertyAssignment: typeof factory.createPropertyAssignment = deprecate(factory.createPropertyAssignment, factoryDeprecation);

/** @deprecated Use `factory.updatePropertyAssignment` or the factory supplied by your transformation context instead. */
export const updatePropertyAssignment: typeof factory.updatePropertyAssignment = deprecate(factory.updatePropertyAssignment, factoryDeprecation);

/** @deprecated Use `factory.createShorthandPropertyAssignment` or the factory supplied by your transformation context instead. */
export const createShorthandPropertyAssignment: typeof factory.createShorthandPropertyAssignment = deprecate(factory.createShorthandPropertyAssignment, factoryDeprecation);

/** @deprecated Use `factory.updateShorthandPropertyAssignment` or the factory supplied by your transformation context instead. */
export const updateShorthandPropertyAssignment: typeof factory.updateShorthandPropertyAssignment = deprecate(factory.updateShorthandPropertyAssignment, factoryDeprecation);

/** @deprecated Use `factory.createSpreadAssignment` or the factory supplied by your transformation context instead. */
export const createSpreadAssignment: typeof factory.createSpreadAssignment = deprecate(factory.createSpreadAssignment, factoryDeprecation);

/** @deprecated Use `factory.updateSpreadAssignment` or the factory supplied by your transformation context instead. */
export const updateSpreadAssignment: typeof factory.updateSpreadAssignment = deprecate(factory.updateSpreadAssignment, factoryDeprecation);

/** @deprecated Use `factory.createEnumMember` or the factory supplied by your transformation context instead. */
export const createEnumMember: typeof factory.createEnumMember = deprecate(factory.createEnumMember, factoryDeprecation);

/** @deprecated Use `factory.updateEnumMember` or the factory supplied by your transformation context instead. */
export const updateEnumMember: typeof factory.updateEnumMember = deprecate(factory.updateEnumMember, factoryDeprecation);

/** @deprecated Use `factory.updateSourceFile` or the factory supplied by your transformation context instead. */
export const updateSourceFileNode: typeof factory.updateSourceFile = deprecate(factory.updateSourceFile, factoryDeprecation);

/** @deprecated Use `factory.createNotEmittedStatement` or the factory supplied by your transformation context instead. */
export const createNotEmittedStatement: typeof factory.createNotEmittedStatement = deprecate(factory.createNotEmittedStatement, factoryDeprecation);

/** @deprecated Use `factory.createPartiallyEmittedExpression` or the factory supplied by your transformation context instead. */
export const createPartiallyEmittedExpression: typeof factory.createPartiallyEmittedExpression = deprecate(factory.createPartiallyEmittedExpression, factoryDeprecation);

/** @deprecated Use `factory.updatePartiallyEmittedExpression` or the factory supplied by your transformation context instead. */
export const updatePartiallyEmittedExpression: typeof factory.updatePartiallyEmittedExpression = deprecate(factory.updatePartiallyEmittedExpression, factoryDeprecation);

/** @deprecated Use `factory.createCommaListExpression` or the factory supplied by your transformation context instead. */
export const createCommaList: typeof factory.createCommaListExpression = deprecate(factory.createCommaListExpression, factoryDeprecation);

/** @deprecated Use `factory.updateCommaListExpression` or the factory supplied by your transformation context instead. */
export const updateCommaList: typeof factory.updateCommaListExpression = deprecate(factory.updateCommaListExpression, factoryDeprecation);

/** @deprecated Use `factory.createBundle` or the factory supplied by your transformation context instead. */
export const createBundle: typeof factory.createBundle = deprecate(factory.createBundle, factoryDeprecation);

/** @deprecated Use `factory.updateBundle` or the factory supplied by your transformation context instead. */
export const updateBundle: typeof factory.updateBundle = deprecate(factory.updateBundle, factoryDeprecation);

/** @deprecated Use `factory.createImmediatelyInvokedFunctionExpression` or the factory supplied by your transformation context instead. */
export const createImmediatelyInvokedFunctionExpression: typeof factory.createImmediatelyInvokedFunctionExpression = deprecate(factory.createImmediatelyInvokedFunctionExpression, factoryDeprecation);

/** @deprecated Use `factory.createImmediatelyInvokedArrowFunction` or the factory supplied by your transformation context instead. */
export const createImmediatelyInvokedArrowFunction: typeof factory.createImmediatelyInvokedArrowFunction = deprecate(factory.createImmediatelyInvokedArrowFunction, factoryDeprecation);

/** @deprecated Use `factory.createVoidZero` or the factory supplied by your transformation context instead. */
export const createVoidZero: typeof factory.createVoidZero = deprecate(factory.createVoidZero, factoryDeprecation);

/** @deprecated Use `factory.createExportDefault` or the factory supplied by your transformation context instead. */
export const createExportDefault: typeof factory.createExportDefault = deprecate(factory.createExportDefault, factoryDeprecation);

/** @deprecated Use `factory.createExternalModuleExport` or the factory supplied by your transformation context instead. */
export const createExternalModuleExport: typeof factory.createExternalModuleExport = deprecate(factory.createExternalModuleExport, factoryDeprecation);

/** @deprecated Use `factory.createNamespaceExport` or the factory supplied by your transformation context instead. */
export const createNamespaceExport: typeof factory.createNamespaceExport = deprecate(factory.createNamespaceExport, factoryDeprecation);

/** @deprecated Use `factory.updateNamespaceExport` or the factory supplied by your transformation context instead. */
export const updateNamespaceExport: typeof factory.updateNamespaceExport = deprecate(factory.updateNamespaceExport, factoryDeprecation);

/** @deprecated Use `factory.createToken` or the factory supplied by your transformation context instead. */
export const createToken = deprecate(function createToken<TKind extends SyntaxKind>(kind: TKind): Token<TKind> {
    return factory.createToken(kind);
}, factoryDeprecation);

/** @deprecated Use `factory.createIdentifier` or the factory supplied by your transformation context instead. */
export const createIdentifier = deprecate(function createIdentifier(text: string) {
    return factory.createIdentifier(text, /*typeArguments*/ undefined, /*originalKeywordKind*/ undefined);
}, factoryDeprecation);

/** @deprecated Use `factory.createTempVariable` or the factory supplied by your transformation context instead. */
export const createTempVariable = deprecate(function createTempVariable(recordTempVariable: ((node: Identifier) => void) | undefined): Identifier {
    return factory.createTempVariable(recordTempVariable, /*reserveInNestedScopes*/ undefined);
}, factoryDeprecation);

/** @deprecated Use `factory.getGeneratedNameForNode` or the factory supplied by your transformation context instead. */
export const getGeneratedNameForNode = deprecate(function getGeneratedNameForNode(node: Node | undefined): Identifier {
    return factory.getGeneratedNameForNode(node, /*flags*/ undefined);
}, factoryDeprecation);

/** @deprecated Use `factory.createUniqueName(text, GeneratedIdentifierFlags.Optimistic)` or the factory supplied by your transformation context instead. */
export const createOptimisticUniqueName = deprecate(function createOptimisticUniqueName(text: string): Identifier {
    return factory.createUniqueName(text, GeneratedIdentifierFlags.Optimistic);
}, factoryDeprecation);

/** @deprecated Use `factory.createUniqueName(text, GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel)` or the factory supplied by your transformation context instead. */
export const createFileLevelUniqueName = deprecate(function createFileLevelUniqueName(text: string): Identifier {
    return factory.createUniqueName(text, GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel);
}, factoryDeprecation);

/** @deprecated Use `factory.createIndexSignature` or the factory supplied by your transformation context instead. */
export const createIndexSignature = deprecate(function createIndexSignature(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration {
    return factory.createIndexSignature(decorators, modifiers, parameters, type);
}, factoryDeprecation);

/** @deprecated Use `factory.createTypePredicateNode` or the factory supplied by your transformation context instead. */
export const createTypePredicateNode = deprecate(function createTypePredicateNode(parameterName: Identifier | ThisTypeNode | string, type: TypeNode): TypePredicateNode {
    return factory.createTypePredicateNode(/*assertsModifier*/ undefined, parameterName, type);
}, factoryDeprecation);

/** @deprecated Use `factory.updateTypePredicateNode` or the factory supplied by your transformation context instead. */
export const updateTypePredicateNode = deprecate(function updateTypePredicateNode(node: TypePredicateNode, parameterName: Identifier | ThisTypeNode, type: TypeNode): TypePredicateNode {
    return factory.updateTypePredicateNode(node, /*assertsModifier*/ undefined, parameterName, type);
}, factoryDeprecation);

/** @deprecated Use `factory.createStringLiteral`, `factory.createStringLiteralFromNode`, `factory.createNumericLiteral`, `factory.createBigIntLiteral`, `factory.createTrue`, `factory.createFalse`, or the factory supplied by your transformation context instead. */
export const createLiteral = deprecate(function createLiteral(value: string | number | PseudoBigInt | boolean | StringLiteral | NoSubstitutionTemplateLiteral | NumericLiteral | Identifier): PrimaryExpression {
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
export const createMethodSignature = deprecate(function createMethodSignature(
    typeParameters: readonly TypeParameterDeclaration[] | undefined,
    parameters: readonly ParameterDeclaration[],
    type: TypeNode | undefined,
    name: string | PropertyName,
    questionToken: QuestionToken | undefined
) {
    return factory.createMethodSignature(/*modifiers*/ undefined, name, questionToken, typeParameters, parameters, type);
}, factoryDeprecation);

/** @deprecated Use `factory.updateMethodSignature` or the factory supplied by your transformation context instead. */
export const updateMethodSignature = deprecate(function updateMethodSignature(
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
export const createTypeOperatorNode = deprecate(function createTypeOperatorNode(operatorOrType: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword | TypeNode, type?: TypeNode) {
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
export const createTaggedTemplate = deprecate(function createTaggedTemplate(tag: Expression, typeArgumentsOrTemplate: readonly TypeNode[] | TemplateLiteral | undefined, template?: TemplateLiteral) {
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
export const updateTaggedTemplate = deprecate(function updateTaggedTemplate(node: TaggedTemplateExpression, tag: Expression, typeArgumentsOrTemplate: readonly TypeNode[] | TemplateLiteral | undefined, template?: TemplateLiteral) {
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
export const updateBinary = deprecate(function updateBinary(node: BinaryExpression, left: Expression, right: Expression, operator: BinaryOperator | BinaryOperatorToken = node.operatorToken) {
    if (typeof operator === "number") {
        operator = operator === node.operatorToken.kind ? node.operatorToken : factory.createToken(operator);
    }
    return factory.updateBinaryExpression(node, left, operator, right);
}, factoryDeprecation);

/** @deprecated Use `factory.createConditional` or the factory supplied by your transformation context instead. */
export const createConditional = deprecate(function createConditional(condition: Expression, questionTokenOrWhenTrue: QuestionToken | Expression, whenTrueOrWhenFalse: Expression, colonToken?: ColonToken, whenFalse?: Expression) {
    return arguments.length === 5 ? factory.createConditionalExpression(condition, questionTokenOrWhenTrue as QuestionToken, whenTrueOrWhenFalse, colonToken, whenFalse!) :
        arguments.length === 3 ? factory.createConditionalExpression(condition, factory.createToken(SyntaxKind.QuestionToken), questionTokenOrWhenTrue as Expression, factory.createToken(SyntaxKind.ColonToken), whenTrueOrWhenFalse) :
        Debug.fail("Argument count mismatch");
} as {
    (condition: Expression, whenTrue: Expression, whenFalse: Expression): ConditionalExpression;
    (condition: Expression, questionToken: QuestionToken, whenTrue: Expression, colonToken: ColonToken, whenFalse: Expression): ConditionalExpression;
}, factoryDeprecation);

/** @deprecated Use `factory.createYield` or the factory supplied by your transformation context instead. */
export const createYield = deprecate(function createYield(asteriskTokenOrExpression?: AsteriskToken | Expression | undefined, expression?: Expression) {
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
export const createClassExpression = deprecate(function createClassExpression(
    modifiers: readonly Modifier[] | undefined,
    name: string | Identifier | undefined,
    typeParameters: readonly TypeParameterDeclaration[] | undefined,
    heritageClauses: readonly HeritageClause[] | undefined,
    members: readonly ClassElement[]
) {
    return factory.createClassExpression(/*decorators*/ undefined, modifiers, name, typeParameters, heritageClauses, members);
}, factoryDeprecation);

/** @deprecated Use `factory.updateClassExpression` or the factory supplied by your transformation context instead. */
export const updateClassExpression = deprecate(function updateClassExpression(
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
export const createPropertySignature = deprecate(function createPropertySignature(
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
export const updatePropertySignature = deprecate(function updatePropertySignature(
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
export const createExpressionWithTypeArguments = deprecate(function createExpressionWithTypeArguments(typeArguments: readonly TypeNode[] | undefined, expression: Expression) {
    return factory.createExpressionWithTypeArguments(expression, typeArguments);
}, factoryDeprecation);

/** @deprecated Use `factory.updateExpressionWithTypeArguments` or the factory supplied by your transformation context instead. */
export const updateExpressionWithTypeArguments = deprecate(function updateExpressionWithTypeArguments(node: ExpressionWithTypeArguments, typeArguments: readonly TypeNode[] | undefined, expression: Expression) {
    return factory.updateExpressionWithTypeArguments(node, expression, typeArguments);
}, factoryDeprecation);

/** @deprecated Use `factory.createArrowFunction` or the factory supplied by your transformation context instead. */
export const createArrowFunction = deprecate(function createArrowFunction(modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanTokenOrBody: ConciseBody | EqualsGreaterThanToken | undefined, body?: ConciseBody) {
    return arguments.length === 6 ? factory.createArrowFunction(modifiers, typeParameters, parameters, type, equalsGreaterThanTokenOrBody as EqualsGreaterThanToken | undefined, body!) :
        arguments.length === 5 ? factory.createArrowFunction(modifiers, typeParameters, parameters, type, /*equalsGreaterThanToken*/ undefined, equalsGreaterThanTokenOrBody as ConciseBody) :
        Debug.fail("Argument count mismatch");
} as {
    (modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanToken: EqualsGreaterThanToken | undefined, body: ConciseBody): ArrowFunction;
    (modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: ConciseBody): ArrowFunction;
}, factoryDeprecation);

/** @deprecated Use `factory.updateArrowFunction` or the factory supplied by your transformation context instead. */
export const updateArrowFunction = deprecate(function updateArrowFunction(node: ArrowFunction, modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanTokenOrBody: EqualsGreaterThanToken | ConciseBody, body?: ConciseBody) {
    return arguments.length === 7 ? factory.updateArrowFunction(node, modifiers, typeParameters, parameters, type, equalsGreaterThanTokenOrBody as EqualsGreaterThanToken, body!) :
        arguments.length === 6 ? factory.updateArrowFunction(node, modifiers, typeParameters, parameters, type, node.equalsGreaterThanToken, equalsGreaterThanTokenOrBody as ConciseBody) :
        Debug.fail("Argument count mismatch");
} as {
    (node: ArrowFunction, modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanToken: EqualsGreaterThanToken, body: ConciseBody): ArrowFunction;
    (node: ArrowFunction, modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: ConciseBody): ArrowFunction;
}, factoryDeprecation);

/** @deprecated Use `factory.createVariableDeclaration` or the factory supplied by your transformation context instead. */
export const createVariableDeclaration = deprecate(function createVariableDeclaration(name: string | BindingName, exclamationTokenOrType?: ExclamationToken | TypeNode, typeOrInitializer?: TypeNode | Expression, initializer?: Expression) {
    return arguments.length === 4 ? factory.createVariableDeclaration(name, exclamationTokenOrType as ExclamationToken | undefined, typeOrInitializer as TypeNode | undefined, initializer) :
        arguments.length >= 1 && arguments.length <= 3 ? factory.createVariableDeclaration(name, /*exclamationToken*/ undefined, exclamationTokenOrType as TypeNode | undefined, typeOrInitializer as Expression | undefined) :
        Debug.fail("Argument count mismatch");
} as {
    (name: string | BindingName, type?: TypeNode | undefined, initializer?: Expression | undefined): VariableDeclaration;
    (name: string | BindingName, exclamationToken: ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration;
}, factoryDeprecation);

/** @deprecated Use `factory.updateVariableDeclaration` or the factory supplied by your transformation context instead. */
export const updateVariableDeclaration = deprecate(function updateVariableDeclaration(node: VariableDeclaration, name: BindingName, exclamationTokenOrType: ExclamationToken | TypeNode | undefined, typeOrInitializer: TypeNode | Expression | undefined, initializer?: Expression | undefined) {
    return arguments.length === 5 ? factory.updateVariableDeclaration(node, name, exclamationTokenOrType as ExclamationToken | undefined, typeOrInitializer as TypeNode | undefined, initializer) :
        arguments.length === 4 ? factory.updateVariableDeclaration(node, name, node.exclamationToken, exclamationTokenOrType as TypeNode | undefined, typeOrInitializer as Expression | undefined) :
        Debug.fail("Argument count mismatch");
} as {
    (node: VariableDeclaration, name: BindingName, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration;
    (node: VariableDeclaration, name: BindingName, exclamationToken: ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration;
}, factoryDeprecation);

/** @deprecated Use `factory.createImportClause` or the factory supplied by your transformation context instead. */
export const createImportClause = deprecate(function createImportClause(name: Identifier | undefined, namedBindings: NamedImportBindings | undefined, isTypeOnly = false): ImportClause {
    return factory.createImportClause(isTypeOnly, name, namedBindings);
}, factoryDeprecation);

/** @deprecated Use `factory.updateImportClause` or the factory supplied by your transformation context instead. */
export const updateImportClause = deprecate(function updateImportClause(node: ImportClause, name: Identifier | undefined, namedBindings: NamedImportBindings | undefined, isTypeOnly: boolean) {
    return factory.updateImportClause(node, isTypeOnly, name, namedBindings);
}, factoryDeprecation);

/** @deprecated Use `factory.createExportDeclaration` or the factory supplied by your transformation context instead. */
export const createExportDeclaration = deprecate(function createExportDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, exportClause: NamedExportBindings | undefined, moduleSpecifier?: Expression | undefined, isTypeOnly = false) {
    return factory.createExportDeclaration(decorators, modifiers, isTypeOnly, exportClause, moduleSpecifier);
}, factoryDeprecation);

/** @deprecated Use `factory.updateExportDeclaration` or the factory supplied by your transformation context instead. */
export const updateExportDeclaration = deprecate(function updateExportDeclaration(
    node: ExportDeclaration,
    decorators: readonly Decorator[] | undefined,
    modifiers: readonly Modifier[] | undefined,
    exportClause: NamedExportBindings | undefined,
    moduleSpecifier: Expression | undefined,
    isTypeOnly: boolean) {
    return factory.updateExportDeclaration(node, decorators, modifiers, isTypeOnly, exportClause, moduleSpecifier, node.assertClause);
}, factoryDeprecation);

/** @deprecated Use `factory.createJSDocParameterTag` or the factory supplied by your transformation context instead. */
export const createJSDocParamTag = deprecate(function createJSDocParamTag(name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression | undefined, comment?: string | undefined): JSDocParameterTag {
    return factory.createJSDocParameterTag(/*tagName*/ undefined, name, isBracketed, typeExpression, /*isNameFirst*/ false, comment ? factory.createNodeArray([factory.createJSDocText(comment)]) : undefined);
}, factoryDeprecation);

/** @deprecated Use `factory.createComma` or the factory supplied by your transformation context instead. */
export const createComma = deprecate(function createComma(left: Expression, right: Expression): Expression {
    return factory.createComma(left, right);
}, factoryDeprecation);

/** @deprecated Use `factory.createLessThan` or the factory supplied by your transformation context instead. */
export const createLessThan = deprecate(function createLessThan(left: Expression, right: Expression): Expression {
    return factory.createLessThan(left, right);
}, factoryDeprecation);

/** @deprecated Use `factory.createAssignment` or the factory supplied by your transformation context instead. */
export const createAssignment = deprecate(function createAssignment(left: Expression, right: Expression): BinaryExpression {
    return factory.createAssignment(left, right);
}, factoryDeprecation);

/** @deprecated Use `factory.createStrictEquality` or the factory supplied by your transformation context instead. */
export const createStrictEquality = deprecate(function createStrictEquality(left: Expression, right: Expression): BinaryExpression {
    return factory.createStrictEquality(left, right);
}, factoryDeprecation);

/** @deprecated Use `factory.createStrictInequality` or the factory supplied by your transformation context instead. */
export const createStrictInequality = deprecate(function createStrictInequality(left: Expression, right: Expression): BinaryExpression {
    return factory.createStrictInequality(left, right);
}, factoryDeprecation);

/** @deprecated Use `factory.createAdd` or the factory supplied by your transformation context instead. */
export const createAdd = deprecate(function createAdd(left: Expression, right: Expression): BinaryExpression {
    return factory.createAdd(left, right);
}, factoryDeprecation);

/** @deprecated Use `factory.createSubtract` or the factory supplied by your transformation context instead. */
export const createSubtract = deprecate(function createSubtract(left: Expression, right: Expression): BinaryExpression {
    return factory.createSubtract(left, right);
}, factoryDeprecation);

/** @deprecated Use `factory.createLogicalAnd` or the factory supplied by your transformation context instead. */
export const createLogicalAnd = deprecate(function createLogicalAnd(left: Expression, right: Expression): BinaryExpression {
    return factory.createLogicalAnd(left, right);
}, factoryDeprecation);

/** @deprecated Use `factory.createLogicalOr` or the factory supplied by your transformation context instead. */
export const createLogicalOr = deprecate(function createLogicalOr(left: Expression, right: Expression): BinaryExpression {
    return factory.createLogicalOr(left, right);
}, factoryDeprecation);

/** @deprecated Use `factory.createPostfixIncrement` or the factory supplied by your transformation context instead. */
export const createPostfixIncrement = deprecate(function createPostfixIncrement(operand: Expression): PostfixUnaryExpression {
    return factory.createPostfixIncrement(operand);
}, factoryDeprecation);

/** @deprecated Use `factory.createLogicalNot` or the factory supplied by your transformation context instead. */
export const createLogicalNot = deprecate(function createLogicalNot(operand: Expression): PrefixUnaryExpression {
    return factory.createLogicalNot(operand);
}, factoryDeprecation);

/** @deprecated Use an appropriate `factory` method instead. */
export const createNode = deprecate(function createNode(kind: SyntaxKind, pos = 0, end = 0): Node {
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
export const getMutableClone = deprecate(function getMutableClone<T extends Node>(node: T): T {
    const clone = factory.cloneNode(node);
    setTextRange(clone, node);
    setParent(clone, node.parent);
    return clone;
}, { since: "4.0", warnAfter: "4.1", message: "Use an appropriate `factory.update...` method instead, use `setCommentRange` or `setSourceMapRange`, and avoid setting `parent`." });
